"""Bot Telegram di GoatLink. Unica fonte: data.js, come il sito e i contenuti.

    python bot_telegram.py            # giro normale (lo lancia GitHub Actions)
    python bot_telegram.py --prova    # simula tutto senza toccare Telegram
    python bot_telegram.py --prova --data 2026-11-02

Cosa fa a ogni giro:
  - gruppo con i topic: crea i topic fissi (Regole e info, Come funziona,
    Bonus ricevuti), apre un topic per ogni promo attiva, lo chiude quando la
    promo finisce e lo riapre se torna (la cronologia resta)
  - canale: post per ogni promo nuova o tornata, avviso per le promo che
    scadono tra 3 giorni o domani, fine maggiorazione, promo finite con le
    alternative, riepilogo ogni lunedi'
  - stato in telegram/stato.json (cosa e' gia' stato fatto e i numeri dei topic)

Il token sta SOLO nel secret TELEGRAM_BOT_TOKEN di GitHub. Canale e gruppo li
trova da solo la prima volta (il bot deve essere admin in entrambi e nel gruppo
deve esserci almeno un messaggio recente); in alternativa si scrivono in
telegram/config.json: {"canale": "@nomecanale", "gruppo": "@nomegruppo"}.

Regole, le stesse del sito: il codice amico non compare mai, l'importo e'
quello dichiarato dal programma, ogni post pubblico dice che chi condivide il
codice puo' ricevere un premio.
"""
import argparse
import datetime
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

import genera_contenuti as C
import genera_sito as G

ROOT = Path(__file__).resolve().parent
CARTELLA = ROOT / "telegram"
STATO = CARTELLA / "stato.json"
CONFIG = CARTELLA / "config.json"
SITO = G.SITO

GIORNI_DOPO = 60   # quanto resta aperto il topic di una promo finita, per chi l'aveva gia' aperta

FISSI = [
    ("regole", "📌 Regole e info"),
    ("come", "❓ Come funziona"),
    ("ricevuti", "💸 Bonus ricevuti"),
]


# ---------------------------------------------------------------- Telegram
class Telegram:
    def __init__(self, token):
        self.base = f"https://api.telegram.org/bot{token}/"

    def __call__(self, metodo, **par):
        dati = urllib.parse.urlencode(
            {k: (json.dumps(v) if isinstance(v, (dict, list, bool)) else v)
             for k, v in par.items() if v is not None}).encode()
        for tentativo in range(5):
            try:
                with urllib.request.urlopen(self.base + metodo, dati, timeout=30) as r:
                    risp = json.load(r)
            except urllib.error.HTTPError as e:
                risp = json.load(e)
            if risp.get("ok"):
                time.sleep(1.2)   # Telegram limita i messaggi a raffica nello stesso gruppo
                return risp["result"]
            attesa = (risp.get("parameters") or {}).get("retry_after")
            if attesa:
                time.sleep(attesa + 1)
                continue
            raise RuntimeError(f"{metodo}: {risp.get('description')}")
        raise RuntimeError(f"{metodo}: troppi tentativi")


class Prova:
    """Finta API: stampa cosa farebbe il bot."""
    def __init__(self):
        self.n = 100

    def __call__(self, metodo, **par):
        self.n += 1
        dove = par.get("chat_id", "")
        if par.get("message_thread_id"):
            dove = f"{dove} topic {par['message_thread_id']}"
        print(f"\n── {metodo} → {dove}")
        if "text" in par:
            print(par["text"])
        elif "name" in par:
            print(f"   nome: {par['name']}")
        if metodo == "getUpdates":
            return []
        if metodo == "getChat":
            nome = str(par["chat_id"]).lstrip("@")
            return {"id": -1001234567890, "type": "supergroup", "is_forum": True,
                    "username": nome if nome != "gruppo" else None, "invite_link": "https://t.me/+PROVA"}
        if metodo == "createForumTopic":
            return {"message_thread_id": self.n, "name": par["name"]}
        if metodo == "sendMessage":
            return {"message_id": self.n}
        return True


# ---------------------------------------------------------------- testi
def h(t):
    return html.escape(str(t), quote=False)


def formatta(t):
    """Testo in stile WhatsApp (*grassetto*, _corsivo_ su riga intera) → HTML Telegram."""
    t = h(t)
    t = re.sub(r"\*([^*\n]+)\*", r"<b>\1</b>", t)
    return re.sub(r"(?m)^_(.+)_$", r"<i>\1</i>", t)


def link(b, campagna):
    return f"{SITO}/{b['slug']}.html?utm_source=telegram&utm_campaign={campagna}"


def nome_topic(b):
    return f"{b.get('emoji') or '🎁'} {b['name']}"[:128]


def post_promo(b, oggi, domande, tornata=False):
    testa = "🔄 *È tornata!*\n" if tornata else "🆕 *Nuova promo*\n"
    boost = ""
    if C.boost_attivo(b, oggi):
        boost = f"🔥 Maggiorato a {b['boost']['amountLabel']} fino al {C.data_breve(b['boost']['until'])}\n"
    return f"""{testa}
*{b['name']} — {b['amountLabel']}*
{boost}⏱ {b['minutes']} minuti · {b['difficulty']}
📋 {b['deposit']}
💸 {b['payout']}
📅 {C.scadenza_frase(b).capitalize()}

{b['why']}

📖 Guida passo passo 👉 {link(b, b['slug'] + '-' + oggi[:7].replace('-', ''))}
💬 Domande su {b['name']}? 👉 {domande}
🔑 Per il codice amico scrivici in privato.

_{C.TRASPARENZA_BREVE}_"""


def post_scadenza(b, n, domande):
    quando = "domani" if n == 1 else f"tra {n} giorni"
    return f"""⏳ *{b['name']} — {b['amountLabel']}: scade {quando}* ({C.data_breve(b['expires'])})

Se vuoi il bonus, apri il conto entro la scadenza.
📋 {b['deposit']}

📖 Guida 👉 {link(b, 'scadenza-' + b['slug'])}
💬 Dubbi? 👉 {domande}

_{C.TRASPARENZA_BREVE}_"""


def post_fine_boost(b, domande):
    return f"""🔥 *Ultimo giorno di {b['name']} a {b['boost']['amountLabel']}*

Da domani il bonus torna a {b['amountLabel_base']}.
📖 Guida 👉 {link(b, 'boost-' + b['slug'])}
💬 Dubbi? 👉 {domande}

_{C.TRASPARENZA_BREVE}_"""


def post_finita(nome, attive, oggi):
    alt = sorted(attive, key=lambda x: C.giorni_pagamento(x, oggi))[:2]
    righe = "\n".join(f"• *{x['name']}* — {x['amountLabel']} 👉 {link(x, 'alternativa-' + x['slug'])}" for x in alt)
    return f"""🛑 *La promo {nome} è terminata*

Le alternative più veloci oggi:
{righe}

Tutte le promo attive 👉 {SITO}/?utm_source=telegram&utm_campaign=finita"""


def post_riepilogo(attive, oggi, gruppo, inizio=False):
    righe = "\n".join(f"• *{b['name']}* — {b['amountLabel']} · {C.minuscola(b['deposit'])}"
                      for b in sorted(attive, key=lambda x: C.giorni_pagamento(x, oggi)))
    totale = sum(b["amount"] for b in attive if b.get("countInTotal"))
    testa = ("🐐 *Il gruppo di GoatLink è aperto!*\nC'è un topic per ogni promo: chiedi lì, rispondo io 👉 "
             f"{gruppo}\n\n*Le promo attive adesso*" if inizio else "*Le promo attive questa settimana* 🐐")
    return f"""{testa}
{righe}

Senza muovere capitale ne puoi prendere fino a {totale}€ in tutto.
Tutte le guide 👉 {SITO}/?utm_source=telegram&utm_campaign=riepilogo-{oggi.replace('-', '')}
💬 Domande 👉 {gruppo}

_{C.TRASPARENZA_BREVE}_"""


def testo_regole(canale):
    return f"""🐐 *Benvenuto nel gruppo di GoatLink!*

Qui c'è un topic per ogni promo attiva: entra in quello dell'app che ti interessa e chiedi lì come funziona, cosa fare, se il bonus è arrivato. Rispondo io.

📌 *Regole*
1. Niente link o codici referral di altri: vengono cancellati
2. Niente spam o pubblicità
3. Rispetto per tutti

📣 Offerte e scadenze: {canale}
📖 Guide complete: {SITO}/?utm_source=telegram&utm_campaign=regole
🔑 Il codice amico non si pubblica: scrivici in privato.

Quando una promo finisce, il suo topic resta aperto ancora un po' per chi l'ha già aperta, poi si chiude; se la promo torna, si riapre con tutte le risposte già dentro.

_{C.TRASPARENZA_BREVE}_"""


TESTO_COME = f"""❓ *Come funzionano le promo di GoatLink*

Sono i programmi ufficiali "invita un amico" di banche e app: il bonus lo paga direttamente l'azienda, che lo usa per trovare nuovi clienti. Tu apri un conto vero a tuo nome e GoatLink non tocca mai i tuoi soldi.

⏱ *Quando arriva il bonus?* Non subito: di solito da qualche giorno a qualche settimana dopo aver completato tutti i requisiti (conto aperto, verifica identità, spesa o deposito richiesti). I tempi di ogni promo sono nella sua guida.

📋 Prima di iniziare leggi sempre i requisiti nella scheda: se una promo chiede un deposito o una spesa con la carta, è scritto lì.

Domande generali qui, domande su una promo precisa nel suo topic.
👉 {SITO}/?utm_source=telegram&utm_campaign=come-funziona"""

TESTO_RICEVUTI = """💸 *Bonus ricevuti*

Ti è arrivato un bonus? Posta qui lo screenshot e scrivi quale promo e quanto ci ha messo ad arrivare.

⚠️ Prima di postare copri nome, IBAN, saldo e ogni dato personale."""


def primo_messaggio(b, oggi):
    return f"""{nome_topic(b)} *— {b['amountLabel']}*

Qui tutte le domande su {b['name']}.

📋 Cosa chiede: {b['deposit']}
💸 Quando paga: {b['payout']}
📅 Scadenza: {C.scadenza_frase(b)}

📖 Prima di chiedere dai un'occhiata alla guida, spesso la risposta è lì 👉 {link(b, 'topic-' + b['slug'])}
🔑 Per il codice amico scrivici in privato."""


# ---------------------------------------------------------------- chat
def config():
    c = json.loads(CONFIG.read_text(encoding="utf-8")) if CONFIG.exists() else {}
    for k in ("canale", "gruppo"):
        if os.environ.get(f"TELEGRAM_{k.upper()}"):
            c[k] = os.environ[f"TELEGRAM_{k.upper()}"]
    return c


def trova_chat(tg, stato, cfg):
    """Canale e gruppo: dal config, altrimenti dagli ultimi aggiornamenti del bot."""
    cand = {"channel": None, "supergroup": None}
    if not (cfg.get("canale") and cfg.get("gruppo")) and not (stato.get("canale") and stato.get("gruppo")):
        for u in tg("getUpdates", limit=100):
            for k in ("my_chat_member", "message", "channel_post"):
                chat = (u.get(k) or {}).get("chat")
                if chat and chat["type"] in cand:
                    cand[chat["type"]] = chat["id"]   # vince il piu' recente
    for chiave, tipo in (("canale", "channel"), ("gruppo", "supergroup")):
        rif = cfg.get(chiave) or (stato.get(chiave) or {}).get("id") or cand[tipo]
        if not rif:
            return False
        info = tg("getChat", chat_id=rif)
        voce = {"id": info["id"], "username": info.get("username")}
        if chiave == "gruppo":
            if not info.get("is_forum"):
                raise SystemExit("Il gruppo non ha i topic attivi: Modifica gruppo → Argomenti.")
            voce["invito"] = info.get("invite_link")
            if not voce["username"] and not voce["invito"]:
                try:
                    voce["invito"] = tg("exportChatInviteLink", chat_id=info["id"])
                except RuntimeError:
                    voce["invito"] = None
        stato[chiave] = voce
    return True


def link_chat(voce):
    if voce.get("username"):
        return f"https://t.me/{voce['username']}"
    return voce.get("invito") or ""


def link_topic(stato, tid):
    g = stato["gruppo"]
    if g.get("username") and tid:
        return f"https://t.me/{g['username']}/{tid}"
    return link_chat(g)   # gruppo privato: i link ai topic funzionano solo per chi e' gia' dentro


# ---------------------------------------------------------------- giro
def giro(tg, stato, bonus, oggi):
    tutte = []
    for b in bonus:
        x = G.stato(b, oggi)
        x["amountLabel_base"] = b["amountLabel"]
        tutte.append(x)
    attive = sorted([b for b in tutte if b["attiva"]], key=lambda x: (C.giorni_pagamento(x, oggi), -x["amount"]))
    for b in tutte:
        if b.get("code"):
            raise SystemExit(f"{b['slug']}: c'e' un codice in data.js, il bot non pubblica")

    gid, cid = stato["gruppo"]["id"], stato["canale"]["id"]
    canale_link = link_chat(stato["canale"])
    gruppo_link = link_chat(stato["gruppo"])
    inviati = set(stato.setdefault("inviati", []))
    primo_giro = not stato.get("avviato")
    fatto = []

    def manda(chat, testo, tid=None, chiave=None):
        if chiave and chiave in inviati:
            return None
        m = tg("sendMessage", chat_id=chat, message_thread_id=tid, text=formatta(testo),
               parse_mode="HTML", link_preview_options={"is_disabled": True})
        if chiave:
            inviati.add(chiave)
            stato["inviati"] = sorted(inviati)
            salva(stato)
        return m

    def fissa(m):
        if not m:
            return
        try:
            tg("pinChatMessage", chat_id=gid, message_id=m["message_id"], disable_notification=True)
        except RuntimeError as e:
            print(f"fissare un messaggio: {e}")

    def rinomina(t, nome):
        nome = nome[:128]
        if t.get("nome") != nome:
            tg("editForumTopic", chat_id=gid, message_thread_id=t["id"], name=nome)
            t["nome"] = nome
            salva(stato)

    # topic fissi
    fissi = stato.setdefault("fissi", {})
    for chiave, nome in FISSI:
        if chiave in fissi:
            continue
        tid = tg("createForumTopic", chat_id=gid, name=nome)["message_thread_id"]
        fissi[chiave] = tid
        salva(stato)
        testo = {"regole": testo_regole(canale_link), "come": TESTO_COME, "ricevuti": TESTO_RICEVUTI}[chiave]
        fissa(manda(gid, testo, tid))
        if chiave == "regole":   # topic chiuso: scrive solo l'admin
            tg("closeForumTopic", chat_id=gid, message_thread_id=tid)
        fatto.append(f"topic fisso {nome}")

    # topic delle promo
    topic = stato.setdefault("topic", {})
    per_slug = {b["slug"]: b for b in tutte}
    nuove, tornate = [], []
    for b in attive:
        t = topic.get(b["slug"])
        if not t and b.get("expires") == oggi:
            continue   # finisce oggi: non vale la pena aprire un topic
        if not t:
            tid = tg("createForumTopic", chat_id=gid, name=nome_topic(b))["message_thread_id"]
            topic[b["slug"]] = {"id": tid, "stato": "attiva", "nome": nome_topic(b)}
            salva(stato)
            fissa(manda(gid, primo_messaggio(b, oggi), tid))
            nuove.append(b)
            fatto.append(f"topic aperto: {b['name']}")
            continue
        if t["stato"] == "chiuso":
            tg("reopenForumTopic", chat_id=gid, message_thread_id=t["id"])
        if t["stato"] != "attiva":
            t["stato"], t["scaduta"] = "attiva", None
            salva(stato)
            fissa(manda(gid, f"🔄 *{b['name']} è tornata* — {b['amountLabel']}, {C.scadenza_frase(b)}.\n"
                             f"📖 Guida aggiornata 👉 {link(b, 'topic-' + b['slug'])}", t["id"]))
            tornate.append(b)
            fatto.append(f"topic riattivato: {b['name']}")
        rinomina(t, nome_topic(b))

    # promo finite: il topic resta aperto per chi l'ha gia' aperta, poi si chiude
    finite = []
    attive_slug = {b["slug"] for b in attive}
    d = datetime.date.fromisoformat(oggi)
    for slug, t in topic.items():
        if slug in attive_slug:
            continue
        b = per_slug.get(slug)
        nome = b["name"] if b else slug
        if t["stato"] == "attiva":
            fine = (b or {}).get("expires") or oggi
            chiusura = (datetime.date.fromisoformat(fine) + datetime.timedelta(days=GIORNI_DOPO)).isoformat()
            t["stato"], t["scaduta"] = "scaduta", fine
            salva(stato)
            fissa(manda(gid, f"🛑 *Promo {nome} chiusa ai nuovi iscritti.*\n\nSe l'hai già aperta, questo topic resta "
                             f"aperto fino al {C.data_breve(chiusura)}: chiedi qui per requisiti e bonus in arrivo.\n"
                             "Se la promo torna, lo annunciamo qui e sul canale.", t["id"]))
            finite.append(nome)
            fatto.append(f"topic {nome}: chiuso ai nuovi")
        if t["stato"] == "scaduta":
            rinomina(t, f"{nome_topic(b) if b else nome} · chiusa ai nuovi")
            fine = datetime.date.fromisoformat(t["scaduta"])
            if (d - fine).days >= GIORNI_DOPO:
                manda(gid, f"🔒 *Topic chiuso.* Sono passati {GIORNI_DOPO} giorni dalla fine della promo {nome}. "
                           "Le risposte restano qui; per altri dubbi scrivi in ❓ Come funziona.", t["id"])
                tg("closeForumTopic", chat_id=gid, message_thread_id=t["id"])
                t["stato"] = "chiuso"
                rinomina(t, nome_topic(b) if b else nome)
                salva(stato)
                fatto.append(f"topic chiuso: {nome}")

    # canale
    if primo_giro:
        manda(cid, post_riepilogo([b for b in attive if b["slug"] in topic], oggi, gruppo_link, inizio=True), chiave=f"avvio:{oggi}")
        stato["avviato"] = oggi
        fatto.append("canale: annuncio di apertura con riepilogo")
    else:
        for b in nuove:
            manda(cid, post_promo(b, oggi, link_topic(stato, topic[b["slug"]]["id"])), chiave=f"nuova:{b['slug']}:{oggi}")
            fatto.append(f"canale: nuova promo {b['name']}")
        for b in tornate:
            manda(cid, post_promo(b, oggi, link_topic(stato, topic[b["slug"]]["id"]), tornata=True),
                  chiave=f"tornata:{b['slug']}:{oggi}")
            fatto.append(f"canale: promo tornata {b['name']}")
        for nome in finite:
            manda(cid, post_finita(nome, attive, oggi), chiave=f"finita:{nome}:{oggi}")
            fatto.append(f"canale: promo finita {nome}")
        if datetime.date.fromisoformat(oggi).weekday() == 0:
            manda(cid, post_riepilogo(attive, oggi, gruppo_link), chiave=f"riepilogo:{oggi}")
            fatto.append("canale: riepilogo del lunedì")

    for b in attive:
        if b["slug"] not in topic:
            continue
        domande = link_topic(stato, topic[b["slug"]]["id"])
        if b.get("expires"):
            n = (datetime.date.fromisoformat(b["expires"]) - d).days
            if n in (1, 3) and manda(cid, post_scadenza(b, n, domande), chiave=f"scade:{b['slug']}:{b['expires']}:{n}"):
                fatto.append(f"canale: {b['name']} scade {'domani' if n == 1 else f'tra {n} giorni'}")
        if C.boost_attivo(b, oggi) and b["boost"]["until"] == oggi:
            if manda(cid, post_fine_boost(b, domande), chiave=f"boost:{b['slug']}:{oggi}"):
                fatto.append(f"canale: ultimo giorno di maggiorazione {b['name']}")

    stato["ultimo_giro"] = oggi
    # tiene solo gli ultimi 120 giorni di post gia' fatti
    limite = (d - datetime.timedelta(days=120)).isoformat()
    stato["inviati"] = sorted(k for k in inviati if not re.search(r"\d{4}-\d\d-\d\d", k)
                              or max(re.findall(r"\d{4}-\d\d-\d\d", k)) >= limite)
    return fatto


def salva(stato):
    if salva.attivo:
        CARTELLA.mkdir(exist_ok=True)
        STATO.write_text(json.dumps(stato, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


salva.attivo = True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prova", action="store_true", help="simula senza toccare Telegram ne' telegram/stato.json")
    ap.add_argument("--data", help="data AAAA-MM-GG da usare come oggi (prove)")
    a = ap.parse_args()
    oggi = a.data or datetime.date.today().isoformat()

    stato = json.loads(STATO.read_text(encoding="utf-8")) if STATO.exists() else {}
    cfg = config()
    if a.prova:
        salva.attivo = False
        tg = Prova()
        cfg.setdefault("canale", "@goatlink")
        cfg.setdefault("gruppo", "@goatlinkdomande")
    else:
        token = os.environ.get("TELEGRAM_BOT_TOKEN")
        if not token:
            print("TELEGRAM_BOT_TOKEN non impostato: il bot salta questo giro.")
            return
        tg = Telegram(token)

    if not trova_chat(tg, stato, cfg):
        sys.exit("Non trovo canale e/o gruppo. Il bot deve essere admin in entrambi e nel gruppo serve un "
                 "messaggio recente; oppure scrivili in telegram/config.json.")
    salva(stato)
    fatto = giro(tg, stato, G.leggi_dati()[0], oggi)
    salva(stato)
    print("\n" + ("\n".join(f"- {f}" for f in fatto) if fatto else "Niente da fare oggi."))


if __name__ == "__main__":
    main()

"""Contenuti social e WhatsApp generati da data.js. Unica fonte: data.js.

    python genera_contenuti.py                 # contenuti per oggi
    python genera_contenuti.py --data 2026-11-13   # come se oggi fosse quella data (prove)

Cosa produce, nella cartella contenuti/ (non pubblicata sul sito):
  - oggi.md                 cosa pubblicare oggi, con i testi pronti da copiare
  - calendario.md           i prossimi 14 giorni
  - promo/<slug>.md         kit completo per ogni promo attiva: 2 copioni reel,
                            caption Instagram, 3 storie, post per il canale,
                            risposta WhatsApp con i passaggi, messaggi di sollecito
  - whatsapp-business.md    benvenuto, assenza e risposte rapide da caricare
                            una volta nell'app WhatsApp Business
  - stato.json              promo attive all'ultimo giro (serve a riconoscere
                            le promo nuove e quelle appena finite)

Regole, le stesse del sito:
  - l'importo mostrato e' sempre quello dichiarato dal programma (con la
    maggiorazione finche' dura)
  - il codice amico non compare MAI: nei testi WhatsApp c'e' il segnaposto
    [CODICE], che si completa solo dentro l'app
  - niente "soldi facili": si dice cosa chiede la promo, quanto tempo serve,
    quando paga e se bisogna muovere soldi
  - ogni testo pubblico dice che chi condivide il codice puo' ricevere un premio
"""
import argparse
import datetime
import html
import json
import re
from pathlib import Path

import genera_sito as G

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "contenuti"
SITO = G.SITO
BIO = f"{SITO}/?utm_source=ig&utm_campaign=bio"
REPO = "https://github.com/francescobarca002-cpu/goatlink/blob/main/contenuti"


def kit_link(slug):
    """Link cliccabile al kit della promo (funziona anche nella issue e da telefono)."""
    return f"[kit {slug}]({REPO}/promo/{slug}.md)"
TRASPARENZA = ("Trasparenza: il codice che ti passiamo è un codice amico. Il tuo bonus non cambia, "
               "e chi lo condivide può ricevere il premio previsto per chi invita.")
TRASPARENZA_BREVE = "Codice amico: chi lo condivide può ricevere un premio. Il tuo bonus non cambia."
HASHTAG = "#bonusconto #contocorrente #risparmio #finanzapersonale #goatlink"
GIORNI = ["lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato", "domenica"]


# ---------------------------------------------------------------- utilità
def testo(h):
    return G.testo(h)


def gg(d):
    return datetime.date.fromisoformat(d)


def data_breve(iso):
    a, m, g = map(int, iso.split("-"))
    return f"{g} {G.MESI[m - 1]}"


def link(b, fonte, campagna=None, oggi=None):
    camp = campagna or f"{b['slug']}-{oggi[:7].replace('-', '')}"
    return f"{SITO}/{b['slug']}.html?utm_source={fonte}&utm_campaign={camp}"


def giorni_pagamento(b, oggi):
    """Stima grezza di quanto ci mette ad arrivare il premio: serve solo a
    mettere prima le promo che pagano in fretta (metodo: prima le veloci)."""
    p = b["payout"].lower()
    m = re.search(r"(\d{1,2})/(\d{1,2})/(\d{4})", p)
    if m:
        return (datetime.date(int(m[3]), int(m[2]), int(m[1])) - gg(oggi)).days
    if re.search(r"nel 20\d\d", p):
        return 200
    if "pochi giorni" in p:
        return 4
    numeri = [int(n) for n in re.findall(r"\d+", p)]
    if numeri:
        n = max(numeri)
        if "settiman" in p:
            n *= 7
        return n
    return 60


def capitale_frase(b):
    if b["capitale"] == 0:
        return "Non devi lasciare soldi fermi"
    return f"Ti chiede di muovere {b['capitale']}€, che restano tuoi"


def scadenza_frase(b):
    if b.get("expires"):
        return f"entro il {data_breve(b['expires'])}"
    return "finché la promo resta attiva"


def passi(b):
    return [testo(s) for s in b["steps"]]


def minuscola(t):
    return t[:1].lower() + t[1:]


def breve(t, n=80):
    """Prima frase di un passaggio, per il testo a video."""
    t = re.split(r"(?<=[.!?])\s", t)[0].rstrip(".")
    testa = t.split(": ")[0]
    if len(testa) >= 25:
        t = testa
    return t if len(t) <= n else t[:n - 1].rsplit(" ", 1)[0] + "…"


def boost_attivo(b, oggi):
    bo = b.get("boost")
    return bool(bo and bo.get("until") and bo["until"] >= oggi)


# ---------------------------------------------------------------- kit per promo
def reel_tutorial(b, oggi):
    p = passi(b)
    p = [x for x in p if not x.lower().startswith("facoltativo")]
    corpo = "\n".join(f"  {i + 1}. {breve(x)}" for i, x in enumerate(p[:5]))
    extra = f"\n  (gli altri {len(p) - 5} passaggi sono nella guida)" if len(p) > 5 else ""
    return f"""**Formato:** registrazione schermo dell'app + testo a video. 30–45 secondi.

- **Gancio (0–3 s), testo a video:** "{b['name']}: {b['amountLabel']} in {b['minutes']} minuti. Ti faccio vedere come."
- **Contesto (3–8 s):** "{b['why']}"
- **Passaggi (8–35 s)**, uno per schermata:
{corpo}{extra}
- **Attenzione (35–40 s):** "{capitale_frase(b)}. Il premio: {minuscola(b["payout"])}."
- **Chiusura (40–45 s):** "Guida completa e codice amico: link in bio, oppure scrivici su WhatsApp."
- **Testo fisso in basso:** "{TRASPARENZA_BREVE}\""""


def reel_verita(b, oggi):
    pro = b.get("pros") or []
    contro = []
    if b["capitale"]:
        contro.append(f"devi muovere {b['capitale']}€ (restano tuoi)")
    if giorni_pagamento(b, oggi) > 30:
        contro.append(f"per il premio serve pazienza ({b['payout']})")
    if b["difficulty"] != "Facile":
        contro.append(f"difficoltà: {b['difficulty'].lower()}")
    if b.get("expires"):
        contro.append(f"scade il {data_breve(b['expires'])}")
    pro_txt = "\n".join(f"  - ✅ {x}" for x in pro[:3]) or "  - ✅ procedura breve"
    contro_txt = "\n".join(f"  - ⚠️ {x}" for x in contro[:3]) or "  - ⚠️ leggi bene i passaggi: un errore e il premio salta"
    return f"""**Formato:** faccia in camera oppure testo su sfondo, tono da amico che ti avvisa. 25–35 secondi.

- **Gancio (0–3 s):** "Il bonus {b['name']} da {b['amountLabel']} conviene davvero? Te lo dico in 30 secondi."
- **Cosa chiede (3–10 s):** "{b['deposit']}. Ci metti circa {b['minutes']} minuti."
- **Pro (10–20 s):**
{pro_txt}
- **Contro (20–28 s):**
{contro_txt}
- **Verdetto (28–33 s):** "{b['why']}"
- **Chiusura:** "Tutti i passaggi e il codice amico: link in bio."
- **Testo fisso in basso:** "{TRASPARENZA_BREVE}\""""


def caption(b, oggi):
    boost = ""
    if boost_attivo(b, oggi):
        boost = f"\n🔥 Fino al {data_breve(b['boost']['until'])} vale {b['boost']['amountLabel']} invece di {b['amountLabel_base']}.\n"
    return f"""{b['name']}: {b['amountLabel']} di bonus, {b['minutes']} minuti da telefono.
{boost}
Cosa chiede: {b['deposit']}.
Quando paga: {b['payout']}.
{capitale_frase(b)}.
Tempo: {scadenza_frase(b)}.

{b['why']}

👉 Guida passo-passo e codice amico: link in bio (o scrivici su WhatsApp).

{TRASPARENZA}
I prodotti finanziari comportano rischi: questa non è consulenza.

{HASHTAG} #{re.sub(r'[^a-z0-9]', '', b['slug'])}"""


def storie(b, oggi):
    return f"""1. **Sondaggio:** "Conosci il bonus {b['name']}?" → Sì / No
2. **Numeri:** "{b['amountLabel']} · {b['minutes']} minuti · {b['deposit']} · {b['payout']}"
3. **Link sticker:** "Guida + codice amico 👇" → `{link(b, 'ig', f"storia-{b['slug']}", oggi)}`
   Testo piccolo: "{TRASPARENZA_BREVE}\""""


def post_canale(b, oggi):
    boost = ""
    if boost_attivo(b, oggi):
        boost = f"🔥 Maggiorato a {b['boost']['amountLabel']} fino al {data_breve(b['boost']['until'])}\n"
    return f"""*{b['name']} — {b['amountLabel']}*
{boost}⏱ {b['minutes']} minuti · {b['difficulty']}
📋 {b['deposit']}
💸 {b['payout']}
📅 {scadenza_frase(b).capitalize()}

{b['why']}

Guida completa 👉 {link(b, 'canale', None, oggi)}
Per il codice amico scrivici in privato.

_{TRASPARENZA_BREVE}_"""


def invito(b):
    """(etichetta, segnaposto): alcune promo passano da un link di invito, altre da un codice."""
    primo = testo(b["steps"][0]).lower() if b["steps"] else ""
    if b.get("codice_box") is False or "link" in primo:
        return "Link di invito", "[LINK]"
    return (b.get("codice_etichetta") or "Codice amico").split(" / ")[0], "[CODICE]"


def risposta_whatsapp(b, oggi):
    etichetta, segnaposto = invito(b)
    p = passi(b)
    elenco = "\n".join(f"{i + 1}. {s}" for i, s in enumerate(p))
    return f"""Ciao! 🐐 Ecco come ottenere il bonus *{b['name']}* ({b['amountLabel']}):

{elenco}

👉 {etichetta}: {segnaposto}

{capitale_frase(b)}. Il premio: {minuscola(b["payout"])}.
Se ti blocchi su un passaggio scrivimi qui, ti seguo fino all'accredito.
Guida con le domande frequenti: {SITO}/{b['slug']}.html"""


def solleciti(b, prossime):
    succ = ""
    if prossime:
        x = prossime[0]
        succ = (f"Ciao! Il bonus {b['name']} è arrivato? 🎉 Se ti è piaciuto, il prossimo che ti consiglio è "
                f"*{x['name']}* ({x['amountLabel']}): {x['deposit'].lower()}, circa {x['minutes']} minuti. "
                f"Ti mando i passaggi?")
    tempo = f" Ricorda che la promo scade il {data_breve(b['expires'])}." if b.get("expires") else ""
    return f"""- **A metà strada:** "Ciao! Come va con {b['name']}? Per sbloccare il bonus serve: {b['deposit'].lower()}.{tempo} Se ti blocchi su un passaggio scrivimi, lo vediamo insieme."
- **In attesa del premio:** "Tutto fatto con {b['name']} 👌 Ora si aspetta l'accredito ({b['payout']}). Non chiudere il conto e non svuotarlo prima dell'accredito."
- **Bonus successivo:** "{succ}\""""


def kit(b, tutte, oggi):
    prossime = [x for x in tutte if x["slug"] != b["slug"]]
    boost = ""
    if boost_attivo(b, oggi):
        boost = f"> 🔥 Maggiorazione attiva: {b['boost']['amountLabel']} fino al {data_breve(b['boost']['until'])}, poi torna a {b['amountLabel_base']}.\n"
    scad = f"Scade il {data_breve(b['expires'])}" if b.get("expires") else "Senza scadenza dichiarata"
    return f"""# {b['name']} — {b['amountLabel']}

> Generato da data.js il {G.data_it(oggi)}: non modificare a mano, si rigenera ogni mattina.
> {scad} · {b['category']} · {b['deposit']} · paga: {b['payout']}
{boost}
Link da usare (contano i clienti per canale):
- Bio Instagram: `{BIO}`
- Storie: `{link(b, 'ig', f"storia-{b['slug']}", oggi)}`
- TikTok: `{link(b, 'tiktok', None, oggi)}`
- Canale WhatsApp: `{link(b, 'canale', None, oggi)}`

## Reel 1 — Tutorial

{reel_tutorial(b, oggi)}

## Reel 2 — Conviene davvero?

{reel_verita(b, oggi)}

## Caption Instagram / TikTok

```
{caption(b, oggi)}
```

## Storie (3 schermate)

{storie(b, oggi)}

## Post per il Canale WhatsApp

```
{post_canale(b, oggi)}
```

## Risposta WhatsApp con i passaggi

Da salvare come risposta rapida `/{b['slug']}`. Sostituisci {invito(b)[1]} con il tuo {invito(b)[0].lower()} **solo dentro l'app**: qui non va mai scritto.

```
{risposta_whatsapp(b, oggi)}
```

## Messaggi di sollecito

{solleciti(b, prossime)}
"""


# ---------------------------------------------------------------- WhatsApp Business
def whatsapp_business(attive, oggi):
    menu = "\n".join(f"• {b['name']} — {b['amountLabel']}" for b in attive)
    rapide = "\n\n".join(
        f"### `/{b['slug']}` — {b['name']} {b['amountLabel']}\n\n"
        f"Sostituisci {invito(b)[1]} con il tuo {invito(b)[0].lower()} solo dentro l'app.\n\n"
        f"```\n{risposta_whatsapp(b, oggi)}\n```" for b in attive)
    return f"""# Kit WhatsApp Business

> Generato da data.js il {G.data_it(oggi)}. Si carica **una volta** nell'app
> (Impostazioni → Strumenti per l'azienda) e si aggiorna quando cambia il catalogo:
> il piano del giorno avvisa quando una risposta rapida va aggiunta, cambiata o tolta.
> Codici e link di invito non vanno MAI scritti qui: si incollano solo nell'app.

## Messaggio di benvenuto

Strumenti per l'azienda → Messaggio di benvenuto → Invia a: *Nuove chat*.

```
Ciao! 🐐 Sei su GoatLink.
Dimmi quale bonus ti interessa e ti mando subito passaggi e codice amico, gratis.
Se arrivi dal sito il nome del bonus è già nel messaggio: ti rispondo a breve.

Promo attive oggi: {SITO}
```

## Messaggio di assenza

Strumenti per l'azienda → Messaggio di assenza → Orari personalizzati (es. 23:00–08:00 e durante le lezioni).

```
Ciao! Ora non riesco a rispondere, lo faccio appena posso 🐐
Intanto trovi tutti i passaggi nella guida del bonus su {SITO}
Il codice amico te lo mando io qui in chat.
```

## Etichette

Nuovo contatto · Passaggi inviati · Attende accredito · Completato · Da riproporre

## Risposte rapide generali

### `/menu` — elenco promo

```
Ecco le promo attive oggi 👇
{menu}

Dimmi quale ti interessa e ti mando i passaggi.
Le prime della lista sono quelle che pagano prima.
```

### `/attesa` — tempi di accredito

```
Tutto fatto 👌 Ora tocca alla banca: i tempi di accredito sono quelli scritti nella guida del bonus.
Due cose da non fare finché non arriva: chiudere il conto e portarlo a zero.
Se passa la data e non vedi niente, scrivimi e controlliamo insieme.
```

### `/grazie` — dopo l'accredito

```
Grande, bonus arrivato! 🎉
Se conosci qualcuno a cui può servire, giragli {SITO}: lo seguo io come ho fatto con te.
```

## Risposte rapide per promo

{rapide}
"""


# ---------------------------------------------------------------- piano del giorno
def eventi_giorno(attive, tutte, oggi, nuove, finite):
    """Lista di (priorita, titolo, slug o None, cosa fare)."""
    d = gg(oggi)
    ev = []
    for b in attive:
        if b.get("expires"):
            n = (gg(b["expires"]) - d).days
            if n == 0:
                ev.append((0, f"⏰ Ultimo giorno per {b['name']}", b["slug"],
                           f"Storia + post canale: \"Oggi è l'ultimo giorno per il bonus {b['name']} da {b['amountLabel']}.\""))
            elif n in (1, 3, 7, 14):
                ev.append((1 if n <= 3 else 2, f"⏳ {b['name']} scade {'domani' if n == 1 else f'tra {n} giorni'} ({data_breve(b['expires'])})", b["slug"],
                           "Reel 2 (Conviene davvero?) + post canale" if n in (7, 14) else "Storia con countdown + post canale"))
        if b.get("boost") and b["boost"].get("until"):
            n = (gg(b["boost"]["until"]) - d).days
            if n == 0:
                ev.append((0, f"🔥 Ultimo giorno di {b['name']} a {b['boost']['amountLabel']}", b["slug"],
                           f"Storia + post canale: da domani torna a {b['amountLabel_base']}."))
            elif n in (1, 3, 7):
                ev.append((1, f"🔥 {b['name']} a {b['boost']['amountLabel']} {'solo fino a domani' if n == 1 else f'ancora per {n} giorni'}", b["slug"],
                           "Reel 1 (Tutorial) con il gancio sulla maggiorazione + post canale"))
            elif n == -1:
                ev.append((1, f"↩️ {b['name']} è tornato a {b['amountLabel_base']}", b["slug"],
                           f"Aggiorna la risposta rapida /{b['slug']} in WhatsApp Business."))
    for b in attive:
        if b["slug"] in nuove:
            ev.append((0, f"🆕 Nuova promo: {b['name']} {b['amountLabel']}", b["slug"],
                       f"Reel 1 (Tutorial) + post canale + aggiungi la risposta rapida /{b['slug']} in WhatsApp Business."))
    per_slug = {b["slug"]: b for b in tutte}
    for s in finite:
        b = per_slug.get(s)
        nome = b["name"] if b else s
        alt = sorted(attive, key=lambda x: giorni_pagamento(x, oggi))[:2]
        alt_txt = " e ".join(f"{x['name']} ({x['amountLabel']})" for x in alt)
        ev.append((0, f"🛑 {nome} è terminata", None,
                   f"Post canale: \"La promo {nome} è finita. Le alternative più veloci oggi: {alt_txt}.\" "
                   f"Togli la risposta rapida /{s} da WhatsApp Business."))
    return sorted(ev, key=lambda x: x[0])


def promo_del_giorno(attive, oggi, escluse=()):
    """Rotazione: ogni giorno la promo successiva (in ordine alfabetico, cosi'
    il giro non salta quando cambia il catalogo), saltando quelle che oggi
    hanno gia' un evento."""
    if not attive:
        return None, None
    ordine = sorted(attive, key=lambda x: x["slug"])
    n = gg(oggi).toordinal()
    for k in range(len(ordine)):
        b = ordine[(n + k) % len(ordine)]
        if b["slug"] not in escluse:
            break
    formato = "Reel 1 — Tutorial" if (n // len(ordine)) % 2 == 0 else "Reel 2 — Conviene davvero?"
    return b, formato


def riepilogo_settimana(attive, oggi):
    righe = "\n".join(f"• *{b['name']}* — {b['amountLabel']} · {b['deposit'].lower()}"
                      for b in sorted(attive, key=lambda x: giorni_pagamento(x, oggi)))
    totale = sum(b["amount"] for b in attive if b.get("countInTotal"))
    return f"""*Le promo attive questa settimana* 🐐
{righe}

Senza muovere capitale ne puoi prendere fino a {totale}€ in tutto.
Tutte le guide 👉 {SITO}/?utm_source=canale&utm_campaign=riepilogo-{oggi.replace('-', '')}

_{TRASPARENZA_BREVE}_"""


def piano(attive, tutte, oggi, nuove, finite, completo=True, ieri=None):
    d = gg(oggi)
    per_slug = {b["slug"]: b for b in attive}
    ev = eventi_giorno(attive, tutte, oggi, nuove, finite)
    righe = [f"## {GIORNI[d.weekday()].capitalize()} {G.data_it(oggi)}"]
    usate = set()
    for _, titolo, slug, cosa in ev:
        righe.append(f"- **{titolo}** — {cosa}" + (f" → {kit_link(slug)}" if slug else ""))
        if slug:
            usate.add(slug)
    b, formato = promo_del_giorno(attive, oggi, usate | ({ieri} if ieri else set()))
    if b:
        orario = "19:00–20:30 (fascia migliore)" if d.weekday() in (1, 3) else "19:00"
        righe.append(f"- **🎬 Contenuto del giorno: {b['name']}** — {formato}, pubblica alle {orario} → {kit_link(b['slug'])}")
    if d.weekday() == 0:
        righe.append("- **📣 Lunedì: riepilogo settimanale sul canale** (testo sotto)")
    piano.scelta = b["slug"] if b else None
    if not completo:
        return "\n".join(righe)

    # testi pronti per oggi
    blocchi = []
    if b:
        blocchi.append(f"### {b['name']} — {formato}\n\n" +
                       (reel_tutorial(b, oggi) if formato.startswith("Reel 1") else reel_verita(b, oggi)) +
                       f"\n\n**Caption**\n\n```\n{caption(b, oggi)}\n```")
    for slug in sorted(usate):
        x = per_slug[slug]
        blocchi.append(f"### {x['name']} — post per il canale\n\n```\n{post_canale(x, oggi)}\n```")
    if d.weekday() == 0:
        blocchi.append(f"### Riepilogo settimanale\n\n```\n{riepilogo_settimana(attive, oggi)}\n```")
    return "\n".join(righe) + "\n\n---\n\n" + "\n\n".join(blocchi)


# ---------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", help="data AAAA-MM-GG da usare come oggi (prove)")
    oggi = ap.parse_args().data or datetime.date.today().isoformat()

    bonus, _ = G.leggi_dati()
    tutte = []
    for b in bonus:
        x = G.stato(b, oggi)
        x["amountLabel_base"] = b["amountLabel"]
        tutte.append(x)
    attive = [b for b in tutte if b["attiva"]]
    attive_ord = sorted(attive, key=lambda x: (giorni_pagamento(x, oggi), -x["amount"]))

    for b in tutte:
        if b.get("code"):
            raise SystemExit(f"{b['slug']}: c'e' un codice in data.js, i contenuti non si generano")

    stato_file = OUT / "stato.json"
    prima = json.loads(stato_file.read_text(encoding="utf-8")) if stato_file.exists() else None
    ora = sorted(b["slug"] for b in attive)
    nuove, finite = set(), set()
    if prima:
        nuove = set(ora) - set(prima["attive"])
        finite = set(prima["attive"]) - set(ora)
        if prima.get("data") == oggi:   # rilanciato in giornata: tiene quelle gia' trovate
            nuove = (nuove | set(prima.get("nuove", []))) & set(ora)
            finite = (finite | set(prima.get("finite", []))) - set(ora)

    (OUT / "promo").mkdir(parents=True, exist_ok=True)
    for f in (OUT / "promo").glob("*.md"):
        if f.stem not in ora:
            f.unlink()
    for b in attive_ord:
        (OUT / "promo" / f"{b['slug']}.md").write_text(kit(b, attive_ord, oggi), encoding="utf-8")
    (OUT / "whatsapp-business.md").write_text(whatsapp_business(attive_ord, oggi), encoding="utf-8")

    ieri = (gg(oggi) - datetime.timedelta(days=1)).isoformat()
    scelta_ieri = prima.get("scelta") if prima and prima.get("data") == ieri else None
    if prima and prima.get("data") == oggi:
        scelta_ieri = prima.get("scelta_ieri")
    (OUT / "oggi.md").write_text(
        f"# Cosa pubblicare oggi\n\n> Generato da data.js. [Calendario 14 giorni]({REPO}/calendario.md) · [Kit WhatsApp Business]({REPO}/whatsapp-business.md)\n\n"
        + piano(attive_ord, tutte, oggi, nuove, finite, ieri=scelta_ieri) + "\n", encoding="utf-8")
    scelta_oggi = piano.scelta

    giorni, prec = [], scelta_ieri
    for i in range(14):
        g = (gg(oggi) + datetime.timedelta(days=i)).isoformat()
        tg = [G.stato(b, g) | {"amountLabel_base": b["amountLabel"]} for b in bonus]
        at = sorted([b for b in tg if b["attiva"]], key=lambda x: (giorni_pagamento(x, g), -x["amount"]))
        nu = nuove if i == 0 else set()
        fi = finite if i == 0 else {b["slug"] for b in tg if b.get("expires") and
                                     (gg(b["expires"]) + datetime.timedelta(days=1)).isoformat() == g}
        giorni.append(piano(at, tg, g, nu, fi, completo=False, ieri=prec))
        prec = piano.scelta
    (OUT / "calendario.md").write_text(
        "# Calendario dei prossimi 14 giorni\n\n> Generato da data.js: se cambia una promo, cambia anche qui.\n\n"
        + "\n\n".join(giorni) + "\n", encoding="utf-8")

    stato_file.write_text(json.dumps({"data": oggi, "attive": ora, "nuove": sorted(nuove), "finite": sorted(finite),
                                      "scelta": scelta_oggi, "scelta_ieri": scelta_ieri},
                                     ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"contenuti per {len(attive)} promo attive · nuove: {sorted(nuove) or '-'} · finite: {sorted(finite) or '-'}")


if __name__ == "__main__":
    main()

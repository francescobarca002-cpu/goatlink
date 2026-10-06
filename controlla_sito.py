"""Controllo del sito prima della pubblicazione.

    python controlla_sito.py              # controlla il sito com'e' oggi
    python controlla_sito.py --data 2026-11-17

Esce con codice 1 se trova ERRORI (il sito non va pubblicato), 0 altrimenti.
Gli AVVISI non bloccano: sono cose da guardare (es. promo che scadono a breve).

Cosa controlla:
  1. data.js: leggibile, campi obbligatori, date valide, nessun codice pubblicato
  2. le guide, la sitemap e i valori della home sono esattamente quelli che
     genera_sito.py produce da data.js (nessuna modifica a mano, nulla di vecchio)
  3. link interni, immagini, script e fogli di stile esistono davvero
  4. dati strutturati (JSON-LD) validi, meta description, anteprima, canonical
  5. nei testi delle promo attive nessuna scadenza gia' passata
     ("entro il 4 ottobre" quando il 4 ottobre e' passato)
  6. un solo numero WhatsApp in tutto il sito (quello di genera_sito.py)
     e nessun codice amico nei contenuti social (contenuti/)
Non controlla che le promo siano ancora vere presso le banche: quello si
verifica sulle fonti ufficiali (vedi la colonna "source" in data.js).
"""
import argparse
import datetime
import json
import re
import sys
from pathlib import Path

import genera_sito as G

ROOT = Path(__file__).resolve().parent
OBBLIGATORI = ["slug", "name", "category", "amount", "amountLabel", "minutes", "difficulty",
               "payout", "deposit", "updated", "summary", "steps", "countInTotal", "capitale"]
DIFFICOLTA = {"Facile", "Medio", "Impegnativo"}
SCADENZA_TESTO = re.compile(
    r"(?:fino al|entro il|entro l'|entro|scade il|scade|valida fino al|chiude il)\s*(?:<[^>]+>)*\s*"
    r"(\d{1,2})(?:\s+(" + "|".join(G.MESI) + r")(?:\s+(\d{4}))?|/(\d{1,2})/(\d{4}))", re.I)

errori, avvisi = [], []


def err(dove, msg):
    errori.append(f"{dove}: {msg}")


def avv(dove, msg):
    avvisi.append(f"{dove}: {msg}")


def data_valida(x):
    try:
        datetime.date.fromisoformat(x)
        return True
    except (TypeError, ValueError):
        return False


def controlla_dati(bonus, catalogo, oggi):
    visti = set()
    for b in bonus:
        dove = f"data.js [{b.get('slug', '?')}]"
        for k in OBBLIGATORI:
            if b.get(k) in (None, "", []) and k not in ("countInTotal", "capitale"):
                err(dove, f"campo obbligatorio mancante: {k}")
        if b.get("slug") in visti:
            err(dove, "slug duplicato")
        visti.add(b.get("slug"))
        if b.get("code"):
            err(dove, "codice amico pubblicato (code deve essere null)")
        if b.get("difficulty") not in DIFFICOLTA:
            err(dove, f"difficulty '{b.get('difficulty')}' non valida")
        for k in ("updated", "expires"):
            if b.get(k) is not None and not data_valida(b[k]):
                err(dove, f"{k} non e' una data AAAA-MM-GG: {b[k]}")
        if data_valida(b.get("updated")) and b["updated"] > oggi:
            err(dove, f"updated nel futuro ({b['updated']})")
        boost = b.get("boost")
        if boost and not data_valida(boost.get("until")):
            err(dove, "boost.until non valido")
        if b.get("logo") and not (ROOT / b["logo"]).exists():
            err(dove, f"logo inesistente: {b['logo']}")
        if b.get("expires") and data_valida(b["expires"]) and oggi <= b["expires"]:
            giorni = (datetime.date.fromisoformat(b["expires"]) - datetime.date.fromisoformat(oggi)).days
            if giorni <= 7:
                avv(dove, f"la promo scade tra {giorni} giorni ({b['expires']}): verificare proroghe sulla fonte ufficiale")
        if boost and data_valida(boost.get("until")) and oggi <= boost["until"]:
            giorni = (datetime.date.fromisoformat(boost["until"]) - datetime.date.fromisoformat(oggi)).days
            if giorni <= 7:
                avv(dove, f"la maggiorazione finisce tra {giorni} giorni: dopo vanno riscritti i testi che la citano")
        if b.get("updated") and data_valida(b["updated"]) and attiva(b, oggi):
            vecchia = (datetime.date.fromisoformat(oggi) - datetime.date.fromisoformat(b["updated"])).days
            if vecchia > 45:
                avv(dove, f"ultima verifica {vecchia} giorni fa ({b['updated']})")
    if catalogo and not data_valida(catalogo):
        err("data.js", "CATALOGO_VERIFICATO non valido")


def attiva(b, oggi):
    return G.attiva(b.get("expires"), oggi)


def controlla_scadenze_nei_testi(bonus, oggi):
    anno_oggi = int(oggi[:4])
    for b in bonus:
        if not attiva(b, oggi):
            continue
        boost = b.get("boost")
        boost_finito = boost and not G.attiva(boost.get("until"), oggi)
        testi = [b.get("summary", ""), b.get("why", "")] + b.get("steps", []) + b.get("rules_ok", []) + \
                b.get("rules_ko", []) + b.get("pros", []) + [f["q"] + " " + f["a"] for f in b.get("faq", [])]
        for t in testi:
            for m in SCADENZA_TESTO.finditer(t or ""):
                g = int(m.group(1))
                if m.group(2):
                    mese = G.MESI.index(m.group(2).lower()) + 1
                    anno = int(m.group(3)) if m.group(3) else anno_oggi
                    if not m.group(3):
                        # senza anno: "entro il 31 gennaio" scritto in autunno vuol dire l'anno dopo.
                        # Si considera passata solo se e' passata da meno di 30 giorni.
                        try:
                            if (datetime.date.fromisoformat(oggi) - datetime.date(anno, mese, g)).days > 30:
                                anno += 1
                        except ValueError:
                            continue
                else:
                    mese, anno = int(m.group(4)), int(m.group(5))
                try:
                    d = datetime.date(anno, mese, g).isoformat()
                except ValueError:
                    continue
                if d < oggi:
                    contesto = G.testo(t)[max(0, G.testo(t).find(G.testo(m.group(0))) - 40):][:140]
                    err(f"data.js [{b['slug']}]", f"testo con scadenza gia' passata ({d}): «{contesto}»")
        if boost_finito and any(boost["amountLabel"] in (t or "") for t in testi):
            avv(f"data.js [{b['slug']}]", f"la maggiorazione a {boost['amountLabel']} e' finita ma i testi la citano ancora")


def controlla_generati(bonus, catalogo, oggi):
    tutte = [G.stato(b, oggi) for b in bonus]
    for b in tutte:
        p = ROOT / f"{b['slug']}.html"
        if not p.exists():
            err(p.name, "guida mancante: lanciare python genera_sito.py")
        elif p.read_text(encoding="utf-8") != G.guida(b, tutte, oggi):
            err(p.name, "la guida non corrisponde a data.js (modificata a mano o non rigenerata): lanciare python genera_sito.py")
    attive = [b for b in tutte if b["attiva"]]
    date = sorted([b["updated"] for b in attive] + ([catalogo] if catalogo else []))
    home = (ROOT / "index.html").read_text(encoding="utf-8")
    totale = sum(b["amount"] for b in attive if b.get("countInTotal"))
    a, m, g = map(int, date[-1].split("-"))
    attesi = {"stat-count": str(len(attive)), "footer-agg": f"{g} {G.MESI[m - 1]} {a}", "badge-mese": f"{G.MESI[m - 1]} {a}"}
    for id_, val in attesi.items():
        trovato = re.search(rf'id="{id_}">([^<]*)<', home)
        if not trovato or trovato.group(1) != val:
            err("index.html", f"#{id_} vale '{trovato.group(1) if trovato else None}', dovrebbe essere '{val}': lanciare python genera_sito.py")
    odo = re.search(r'<div class="odo" id="odo"[^>]*>([^<]*)<', home)
    if not odo or odo.group(1) != f"{totale}€":
        err("index.html", f"totale in home '{odo.group(1) if odo else None}', dovrebbe essere '{totale}€'")
    sm = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for b in tutte:
        if f"<loc>{G.SITO}/{b['slug']}.html</loc><lastmod>{b['updated']}</lastmod>" not in sm:
            err("sitemap.xml", f"{b['slug']} mancante o con data diversa: lanciare python genera_sito.py")


def controlla_pagine(bonus):
    pagine = sorted(p for p in ROOT.glob("*.html") if not p.name.startswith("google"))
    slugs = {b["slug"] for b in bonus}
    vj = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
    redirect = {r["source"].lstrip("/") for r in vj.get("redirects", [])}
    for p in pagine:
        s = p.read_text(encoding="utf-8")
        nome = p.name
        if nome[:-5] not in slugs and nome not in ("index.html", *G.PAGINE_FISSE):
            err(nome, "pagina che non corrisponde a nessuna scheda di data.js (guida orfana)")
        for attr_, url in re.findall(r'(href|src)="([^"#]+)', s):
            if url.startswith(("http", "mailto:", "tel:", "data:", "//")) or "${" in url:
                continue
            f = url.split("?")[0]
            if f and not (ROOT / f).exists() and f not in redirect:
                err(nome, f"{attr_} rotto: {url}")
            elif f in redirect:
                err(nome, f"link a una pagina rimossa (redirect): {url}")
        for j in re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
            try:
                json.loads(j)
            except json.JSONDecodeError as e:
                err(nome, f"JSON-LD non valido: {e}")
        for need in ("<title>", 'name="description"', 'rel="canonical"', 'property="og:image"', 'property="og:title"'):
            if need not in s:
                err(nome, f"manca {need}")
        can = re.search(r'rel="canonical" href="([^"]+)"', s)
        atteso = f"{G.SITO}/" if nome == "index.html" else f"{G.SITO}/{nome}"
        if can and can.group(1) != atteso:
            err(nome, f"canonical {can.group(1)} invece di {atteso}")
        if re.search(r'"code"\s*:\s*"[A-Z0-9]{6,}"', s):
            err(nome, "sembra contenere un codice amico")
        for num in set(re.findall(r"wa\.me/(\d+)", s)) - {G.WA}:
            err(nome, f"numero WhatsApp {num} diverso da quello di genera_sito.py ({G.WA}): lanciare python genera_sito.py")


def controlla_contenuti(bonus, oggi):
    """I contenuti social non devono mai contenere un codice amico."""
    cartella = ROOT / "contenuti"
    if not cartella.exists():
        return
    for f in cartella.rglob("*.md"):
        s = f.read_text(encoding="utf-8")
        for b in bonus:
            if b.get("code") and b["code"] in s:
                err(f"contenuti/{f.relative_to(cartella)}", f"contiene il codice di {b['slug']}")
        if re.search(r"(?i:codice(?: amico| promo)?)\s*:\s*(?!\[CODICE\])[A-Z0-9]{5,}\b", s):
            err(f"contenuti/{f.relative_to(cartella)}", "sembra contenere un codice amico al posto di [CODICE]")
        if re.search(r"(?i)link di invito\s*:\s*(?!\[LINK\])\S*(https?://|www\.)", s):
            err(f"contenuti/{f.relative_to(cartella)}", "sembra contenere un link di invito al posto di [LINK]")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", help="data AAAA-MM-GG da usare come oggi")
    oggi = ap.parse_args().data or datetime.date.today().isoformat()
    bonus, catalogo = G.leggi_dati()
    controlla_dati(bonus, catalogo, oggi)
    controlla_scadenze_nei_testi(bonus, oggi)
    controlla_generati(bonus, catalogo, oggi)
    controlla_pagine(bonus)
    controlla_contenuti(bonus, oggi)
    for a in avvisi:
        print("AVVISO ", a)
    for e in errori:
        print("ERRORE ", e)
    print(f"\n{len(errori)} errori, {len(avvisi)} avvisi — controllo del {oggi}")
    sys.exit(1 if errori else 0)


if __name__ == "__main__":
    main()

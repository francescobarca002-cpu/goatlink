"""Scrive nell'HTML statico di index.html i valori che la home calcola da data.js.

Il JavaScript della home aggiorna questi numeri quando la pagina si carica,
ma anteprime dei link, motori di ricerca e controlli delle inserzioni leggono
spesso l'HTML grezzo. Senza questo passaggio vedrebbero "0 promo attive" e
una data vecchia.

Uso: dopo ogni modifica a data.js lancia
    python aggiorna_home.py
Usa le stesse regole di data.js: promo attiva se non ha scadenza o se la
scadenza non e' passata, maggiorazione valida fino a boost.until, totale solo
con countInTotal, data = la piu' recente tra le verifiche delle promo attive
e CATALOGO_VERIFICATO.
"""
import datetime
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio",
        "agosto", "settembre", "ottobre", "novembre", "dicembre"]


def leggi_catalogo():
    src = (ROOT / "data.js").read_text(encoding="utf-8")
    catalogo = re.search(r'const CATALOGO_VERIFICATO\s*=\s*"([0-9-]+)"', src)
    blocco = re.search(r"const BONUSES\s*=\s*(\[.*?\n\]);", src, re.S)
    if not blocco:
        sys.exit("BONUSES non trovato in data.js")
    testo = re.sub(r",(\s*[\]}])", r"\1", blocco.group(1))  # virgole finali
    return json.loads(testo), (catalogo.group(1) if catalogo else None)


def attiva(scadenza, oggi):
    return not scadenza or scadenza >= oggi


def main():
    oggi = datetime.date.today().isoformat()
    bonus, catalogo = leggi_catalogo()
    attive = [b for b in bonus if attiva(b.get("expires"), oggi)]
    for b in attive:
        boost = b.get("boost")
        if boost and attiva(boost.get("until"), oggi):
            b["amount"] = boost["amount"]
    totale = sum(b["amount"] for b in attive if b.get("countInTotal"))
    date = sorted([b["updated"] for b in attive if b.get("updated")] + ([catalogo] if catalogo else []))
    a, m, g = map(int, date[-1].split("-"))

    pagina = ROOT / "index.html"
    html = pagina.read_text(encoding="utf-8")
    sostituzioni = [
        (r'(<b id="stat-count">)[^<]*(</b>)', rf"\g<1>{len(attive)}\g<2>"),
        (r'(<span id="footer-agg">)[^<]*(</span>)', rf"\g<1>{g} {MESI[m - 1]} {a}\g<2>"),
        (r'(<span id="badge-mese">)[^<]*(</span>)', rf"\g<1>{MESI[m - 1]} {a}\g<2>"),
        (r'(<div class="odo" id="odo"[^>]*>)[^<]*(</div>)', rf"\g<1>{totale}€\g<2>"),
    ]
    for schema, nuovo in sostituzioni:
        html, n = re.subn(schema, nuovo, html, count=1)
        if n != 1:
            sys.exit(f"Elemento non trovato in index.html: {schema}")
    pagina.write_text(html, encoding="utf-8")
    print(f"{len(attive)} promo attive, totale {totale}€, aggiornato {g} {MESI[m - 1]} {a}")


if __name__ == "__main__":
    main()

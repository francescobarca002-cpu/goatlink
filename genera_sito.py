"""Genera le parti del sito che dipendono dai dati. Unica fonte: data.js.

    python genera_sito.py            # rigenera guide, sitemap e valori statici della home
    python genera_sito.py --data 2026-11-17   # come sarebbe il sito in quella data (per prove)

Cosa produce:
  - <slug>.html per ogni scheda di data.js (le guide NON si modificano a mano:
    ogni modifica va fatta in data.js e poi si rilancia questo script)
  - sitemap.xml
  - in index.html: contatore promo attive, totale, data di aggiornamento
    (gli stessi valori che la pagina calcola in JavaScript, scritti anche
    nell'HTML per anteprime dei link e motori di ricerca)

Regole, le stesse di data.js:
  - promo attiva se non ha "expires" o se la data non e' passata
  - "boost" vale fino a boost.until compreso, poi torna l'importo base
  - totale = somma delle attive con countInTotal
  - data mostrata = la piu' recente tra gli "updated" delle attive e CATALOGO_VERIFICATO
"""
import argparse
import datetime
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SITO = "https://www.goatlink.it"
WA = "393793719306"   # numero WhatsApp di GoatLink (prefisso 39, senza +): si cambia SOLO qui,
                      # genera_sito.py lo riporta in tutte le pagine e in wa-message.js
CANALE = "https://whatsapp.com/channel/0029Vb8bdwD72WTyKrvBWZ1W"
MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio",
        "agosto", "settembre", "ottobre", "novembre", "dicembre"]
PAGINE_FISSE = ["chi-siamo.html", "privacy.html", "termini.html"]
FILE_CON_NUMERO = ["index.html", *PAGINE_FISSE, "wa-message.js"]


# ---------------------------------------------------------------- dati
def leggi_dati():
    src = (ROOT / "data.js").read_text(encoding="utf-8")
    blocco = re.search(r"const BONUSES\s*=\s*(\[.*?\n\]);", src, re.S)
    if not blocco:
        sys.exit("data.js: array BONUSES non trovato")
    try:
        bonus = json.loads(re.sub(r",(\s*[\]}])", r"\1", blocco.group(1)))
    except json.JSONDecodeError as e:
        sys.exit(f"data.js non e' JSON valido nell'array BONUSES: {e}")
    cat = re.search(r'const CATALOGO_VERIFICATO\s*=\s*"([0-9-]+)"', src)
    return bonus, (cat.group(1) if cat else None)


def data_it(iso):
    a, m, g = map(int, iso.split("-"))
    return f"{g} {MESI[m - 1]} {a}"


def attiva(scadenza, oggi):
    return not scadenza or scadenza >= oggi


def stato(b, oggi):
    """Copia della scheda con importo, etichetta e badge validi alla data 'oggi'."""
    x = dict(b)
    x["attiva"] = attiva(b.get("expires"), oggi)
    boost = b.get("boost")
    if boost and attiva(boost.get("until"), oggi):
        x["amount"] = boost["amount"]
        x["amountLabel"] = boost["amountLabel"]
        if boost.get("badge"):
            x["badge"] = boost["badge"]
    elif boost and x.get("seo_title"):
        # maggiorazione finita: il titolo torna all'importo base
        x["seo_title"] = x["seo_title"].replace(boost["amountLabel"], b["amountLabel"])
    return x


def testo(h):
    """Testo semplice da HTML (per meta description e dati strutturati)."""
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", h or ""))).strip()


def attr(t):
    return html.escape(t, quote=True)


# ---------------------------------------------------------------- guida
def li(voci):
    return "".join(f"<li>{v}</li>" for v in voci)


def correlati(b, tutte):
    attive = [x for x in tutte if x["attiva"] and x["slug"] != b["slug"]]
    stessa = sorted([x for x in attive if x["category"] == b["category"]], key=lambda x: -x["amount"])
    altre = sorted([x for x in attive if x["category"] != b["category"]], key=lambda x: -x["amount"])
    scelte = (stessa + altre)[:3]
    titolo = f"Altri bonus {b['category']}" if scelte and all(x["category"] == b["category"] for x in scelte) else "Altri bonus da provare"
    righe = "\n".join(
        f'      <a class="g-rel" href="{x["slug"]}.html">\n'
        f'        <span class="g-rel-nm">{x["name"]}</span>\n'
        f'        <span class="g-rel-amt">{x["amountLabel"]}</span>\n'
        f'      </a>' for x in scelte)
    return titolo, righe


def guida(b, tutte, oggi):
    nome, slug, lab = b["name"], b["slug"], b["amountLabel"]
    titolo = b.get("seo_title") or f"Bonus {nome} {lab} — guida 2026 | GoatLink"
    descr = testo(b["summary"])
    url = f"{SITO}/{slug}.html"

    ld_bread = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITO}/"},
        {"@type": "ListItem", "position": 2, "name": "Bonus", "item": f"{SITO}/#bonus"},
        {"@type": "ListItem", "position": 3, "name": nome, "item": url}]}
    ld_howto = {"@context": "https://schema.org", "@type": "HowTo", "name": f"Come ottenere il bonus {nome} da {lab}",
                "description": descr, "totalTime": f"PT{b['minutes']}M",
                "estimatedCost": {"@type": "MonetaryAmount", "currency": "EUR", "value": "0"},
                "step": [{"@type": "HowToStep", "position": i + 1, "text": testo(s)} for i, s in enumerate(b["steps"])]}
    ld = [ld_bread, ld_howto]
    if b.get("faq"):
        ld.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": testo(f["q"]), "acceptedAnswer": {"@type": "Answer", "text": testo(f["a"])}}
            for f in b["faq"]]})
    ld_html = "\n".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in ld)

    scaduta = not b["attiva"]
    if b.get("expires"):
        etichetta = (f"Promo terminata il {data_it(b['expires'])}" if scaduta else f"Valida fino al {data_it(b['expires'])}")
    else:
        etichetta = b.get("scadenza_etichetta")
    meta = [f"<span>⏱ {b['minutes']} minuti</span>",
            f'<span class="d-{b["difficulty"]}">● {b["difficulty"]}</span>',
            f"<span>{b['deposit']}</span>"]
    if etichetta:
        meta.append(f'<span class="exp">{etichetta}</span>')

    if b.get("logo"):
        icona = (f'<img src="{b["logo"]}" alt="Logo {attr(nome)}" width="62" height="62" loading="lazy" decoding="async" '
                 f'onerror="this.parentNode.textContent=\'{b.get("emoji") or "🏦"}\'">')
        ic = f'<div class="g-ic">{icona}</div>'
    else:
        ic = f'<div class="g-ic" role="img" aria-label="{attr(nome)}">{b.get("emoji") or "🏦"}</div>'

    def sezioni(lista):
        return "".join(f'\n    <section class="g-section">\n      <h2>{s["titolo"]}</h2>\n      {s["html"]}\n    </section>\n' for s in lista or [])

    codice = ""
    if b.get("codice_box", True):
        msg = f"Ciao! Vorrei il codice amico per il bonus {nome}"
        codice = (f'\n      <div class="g-code-block"><span class="g-code-label">{b.get("codice_etichetta") or "Codice amico"}</span>'
                  f'<code id="code">Te lo diamo noi, gratis</code><a class="g-copy" style="text-decoration:none;display:inline-block" '
                  f'href="https://wa.me/{WA}?text={attr(msg.replace(" ", "%20"))}">Richiedi su WhatsApp</a></div>')

    regole = ""
    if b.get("rules_ok"):
        regole += f'\n    <div class="g-rules ok"><h3>✅ Buono a sapersi</h3><ul>{li(b["rules_ok"])}</ul></div>\n'
    if b.get("rules_ko"):
        regole += f'\n    <div class="g-rules ko"><h3>⚠️ Dove si perde il bonus</h3><ul>{li(b["rules_ko"])}</ul></div>\n'
    t = b.get("trick")
    if t:
        regole += (f'\n    <div class="g-rules warn">\n      <h3>💡 {t["titolo"]}</h3>\n      <p class="g-trick-txt">{t["testo"]}</p>\n'
                   + (f'      <p class="g-trick-risk">{t["rischio"]}</p>\n' if t.get("rischio") else "") + "    </div>\n")

    verdetto = ""
    if b.get("why") or b.get("pros") or b.get("cons"):
        verdetto = f'\n    <section class="g-section g-verdict">\n      <h2>Perché {nome}</h2>\n'
        if b.get("why"):
            verdetto += f'      <p class="g-verdict-txt">{b["why"]}</p>\n'
        if b.get("pros"):
            verdetto += f'      <div class="g-rules ok"><h3>👍 Pregi</h3><ul>{li(b["pros"])}</ul></div>\n'
        if b.get("cons"):
            verdetto += f'      <div class="g-rules ko"><h3>👎 Contro</h3><ul>{li(b["cons"])}</ul></div>\n'
        verdetto += "    </section>\n"

    faq = ""
    if b.get("faq"):
        voci = "".join(f'\n      <details class="g-faq-item">\n        <summary>{f["q"]}</summary>\n        <div>{f["a"]}</div>\n      </details>' for f in b["faq"])
        faq = f'\n    <section class="g-section g-faq">\n      <h2>Domande frequenti sul bonus {nome}</h2>{voci}\n    </section>\n'

    cta = b.get("cta") or "Ricevi il link ufficiale su WhatsApp →"
    nota = b.get("cta_nota") or f"Il bonus è erogato direttamente da {nome}. GoatLink non chiede alcun pagamento."
    rel_titolo, rel = correlati(b, tutte)
    avviso = ('\n  <div class="g-expired">⏰ Questa promo è terminata. Scrivici su WhatsApp per essere avvisato se torna.</div>\n'
              if scaduta else "")
    body_attr = f' data-bonus="{attr(nome)}"' + (f' data-expires="{b["expires"]}"' if b.get("expires") else "")

    return f"""<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="tracking.js"></script>
<!-- Pagina generata da genera_sito.py a partire da data.js: non modificarla a mano. -->
<title>{titolo}</title>
<meta name="description" content="{attr(descr)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="article">
<meta property="og:title" content="{attr(titolo)}">
<meta property="og:description" content="{attr(descr)}">
<meta property="og:url" content="{url}">
<meta property="og:site_name" content="GoatLink">
<meta property="og:image" content="{SITO}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="GoatLink — Bonus reali. Spiegati bene.">
<meta property="og:locale" content="it_IT">
<meta name="twitter:image" content="{SITO}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&family=Chakra+Petch:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="guide.css">
{ld_html}
</head>
<body{body_attr}>
<div class="g-grid-floor"></div>

<header><div class="g-wrap g-nav">
  <a class="g-logo" href="index.html">GOAT<span>LINK</span></a>
  <a class="g-back" href="index.html#bonus">← Tutti i bonus</a>
</div></header>

<nav class="g-bread g-wrap" aria-label="breadcrumb">
  <a href="index.html">Home</a> <span>/</span> <a href="index.html#bonus">Bonus</a> <span>/</span> <span class="cur">{nome}</span>
</nav>

<main class="g-wrap">{avviso}
  <article>
    <div class="g-hero">
      <div class="g-brand">{ic}<div><div class="g-cat">{b.get("categoria_etichetta") or b["category"]}</div><h1>Bonus {nome} {lab}</h1></div></div>
      <div class="g-amount">{lab}<small>{b["payout"]}</small></div>
    </div>

    <div class="g-meta">
      {chr(10).join("      " + x if i else x for i, x in enumerate(meta))}
    </div>

    <p class="g-summary">{b["summary"]}</p>
{sezioni(b.get("sezioni_prima"))}
    <section class="g-section">
      <h2>Come ottenere il bonus {nome}: procedura passo-passo</h2>
      <ol class="g-steps">{li(b["steps"])}</ol>{codice}
    </section>
{regole}{sezioni(b.get("sezioni_dopo"))}{verdetto}
    <div class="g-cta-wrap"><a class="g-cta" href="https://wa.me/{WA}?text={attr(nome.replace(" ", "%20"))}">{cta}</a><p class="g-disc">{nota}</p></div>
{faq}
    <p class="g-updated">Ultimo aggiornamento: <time datetime="{b["updated"]}">{data_it(b["updated"])}</time></p>
  </article>

  <section class="g-related">
    <h2>{rel_titolo}</h2>
    <div class="g-rel-grid">
{rel}</div>
  </section>
</main>

<div class="g-tg"><div class="g-tg-txt"><b>📣 Non perderti la prossima promo</b><span>Sul Canale WhatsApp ti avvisiamo quando un bonus sta per scadere e quando ne arriva uno nuovo verificato. Niente spam.</span></div><a class="g-tg-btn" href="{CANALE}">Entra nel canale →</a></div>
<footer class="g-footer"><div class="g-wrap">
  <p>I bonus sono pagati direttamente da banche e piattaforme, dentro i loro programmi «Invita un amico». GoatLink non ha accordi commerciali con i marchi citati: i codici che ti passiamo sono codici amico, e chi li condivide può ricevere il premio che il regolamento prevede per chi invita. Per te nessun costo aggiuntivo e il tuo bonus non cambia. GoatLink non è sponsorizzato né approvato dai marchi citati e non è un intermediario finanziario. I prodotti finanziari e crypto comportano rischi; nessuna informazione qui è consulenza finanziaria o fiscale.</p>
  <p style="margin-top:14px"><a href="chi-siamo.html">Chi siamo</a> &nbsp;·&nbsp; <a href="termini.html">Termini e Condizioni</a> &nbsp;·&nbsp; <a href="privacy.html">Privacy &amp; Cookie</a> &nbsp;·&nbsp; <a href="https://wa.me/{WA}">Assistenza WhatsApp</a> &nbsp;·&nbsp; <a href="{CANALE}">Canale WhatsApp</a></p>
  <a href="index.html">© 2026 GoatLink</a>
</div></footer>

<script src="wa-message.js"></script>
</body></html>
"""


# ---------------------------------------------------------------- home e sitemap
def aggiorna_home(attive, data_home):
    pagina = ROOT / "index.html"
    s = pagina.read_text(encoding="utf-8")
    totale = sum(b["amount"] for b in attive if b.get("countInTotal"))
    a, m, g = map(int, data_home.split("-"))
    for schema, nuovo in [
        (r'(<b id="stat-count">)[^<]*(</b>)', rf"\g<1>{len(attive)}\g<2>"),
        (r'(<span id="footer-agg">)[^<]*(</span>)', rf"\g<1>{g} {MESI[m - 1]} {a}\g<2>"),
        (r'(<span id="badge-mese">)[^<]*(</span>)', rf"\g<1>{MESI[m - 1]} {a}\g<2>"),
        (r'(<div class="odo" id="odo"[^>]*>)[^<]*(</div>)', rf"\g<1>{totale}€\g<2>"),
    ]:
        s, n = re.subn(schema, nuovo, s, count=1)
        if n != 1:
            sys.exit(f"index.html: elemento non trovato ({schema})")
    pagina.write_text(s, encoding="utf-8")
    return totale


def allinea_numero():
    """Porta il numero WhatsApp di WA nelle pagine scritte a mano e in wa-message.js."""
    for nome in FILE_CON_NUMERO:
        f = ROOT / nome
        s = f.read_text(encoding="utf-8")
        nuovo = re.sub(r"wa\.me/\d+", f"wa.me/{WA}", s)
        nuovo = re.sub(r'var WA = "\d+"', f'var WA = "{WA}"', nuovo)
        if nuovo != s:
            f.write_text(nuovo, encoding="utf-8")


def sitemap(tutte, data_home):
    righe = [f"  <url><loc>{SITO}/</loc><lastmod>{data_home}</lastmod><priority>1.0</priority></url>"]
    for b in sorted(tutte, key=lambda x: x["slug"]):
        righe.append(f"  <url><loc>{SITO}/{b['slug']}.html</loc><lastmod>{b['updated']}</lastmod><priority>{'0.8' if b['attiva'] else '0.4'}</priority></url>")
    for p in PAGINE_FISSE:
        if 'noindex' not in (ROOT / p).read_text(encoding="utf-8"):
            righe.append(f"  <url><loc>{SITO}/{p}</loc><priority>0.4</priority></url>")
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(righe) + "\n</urlset>\n"
    (ROOT / "sitemap.xml").write_text(xml, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", help="data AAAA-MM-GG da usare come oggi (prove)")
    oggi = ap.parse_args().data or datetime.date.today().isoformat()
    bonus, catalogo = leggi_dati()
    allinea_numero()
    tutte = [stato(b, oggi) for b in bonus]
    for b in tutte:
        (ROOT / f"{b['slug']}.html").write_text(guida(b, tutte, oggi), encoding="utf-8")
    attive = [b for b in tutte if b["attiva"]]
    date = sorted([b["updated"] for b in attive if b.get("updated")] + ([catalogo] if catalogo else []))
    totale = aggiorna_home(attive, date[-1])
    sitemap(tutte, date[-1])
    print(f"{len(tutte)} guide generate · {len(attive)} promo attive · totale {totale}€ · aggiornato {data_it(date[-1])}")


if __name__ == "__main__":
    main()

// ============================================================
// GoatLink — SORGENTE UNICA DI VERITÀ
//
// Tutto il contenuto dei bonus sta qui. Da questo file:
//   - la home (index.html) legge le schede quando si carica;
//   - genera_sito.py produce le guide <slug>.html, la sitemap e i
//     valori statici della home.
// Le guide NON si modificano a mano: si cambia questo file e si
// lancia  python genera_sito.py . Il controllo automatico
// (controlla_sito.py, lanciato da GitHub a ogni modifica) blocca
// le guide che non corrispondono a questo file.
//
// Campi che contano:
//   countInTotal  entra nel totale garantito mostrato in home.
//                 true solo per i bonus che non chiedono di
//                 immobilizzare capitale.
//   capitale      euro da muovere (0 = nessuno). Governa il filtro
//                 "Nascondi quelli che chiedono di muovere soldi".
//   expires       oltre questa data la promo passa da sola in
//                 "Tornano presto" e la guida mostra l'avviso.
//                 Lasciare null se non scade.
//   updated       data dell'ultima verifica sulla fonte ufficiale:
//                 la piu' recente alimenta la data mostrata in home.
//   boost         maggiorazione a tempo {amount, amountLabel, until,
//                 badge}: dopo "until" torna l'importo base.
//   code          SEMPRE null: il codice amico non si pubblica online.
//
// Campi solo per la guida (facoltativi): seo_title, faq, trick,
//   sezioni_prima / sezioni_dopo [{titolo, html}], cons,
//   codice_box (false = niente riquadro codice), codice_etichetta,
//   cta, cta_nota, categoria_etichetta, scadenza_etichetta.
//
// CATALOGO_VERIFICATO  data dell'ultima revisione del catalogo nel
//                 suo insieme. Va aggiornata A MANO solo quando la
//                 revisione c'e' stata davvero.
// ============================================================

const CATALOGO_VERIFICATO = "2026-10-04"; // tolti Bybit e Bitstack; Tinaba scaduta; buddy prorogata

const TODAY = new Date(); // usato per calcolare automaticamente lo stato "scaduto"

const BONUSES = [
  {
    "slug": "bitpanda",
    "capitale": 50,
    "name": "Bitpanda",
    "category": "Crypto",
    "logo": "logos/bitpanda.png",
    "emoji": "🐼",
    "amount": 15,
    "currency": "€",
    "amountLabel": "15€",
    "minutes": 15,
    "difficulty": "Medio",
    "badge": "Promo flash",
    "payout": "Accredito entro 30 giorni",
    "deposit": "Deposito + acquisto 50€",
    "expires": "2026-06-25",
    "updated": "2026-06-21",
    "featured": false,
    "countInTotal": false,
    "source": null,
    "summary": "Registrati dall'invito, completa il KYC, deposita 50€ e fai un acquisto idoneo da almeno 50€ tramite Bitpanda Broker. Completati i requisiti ricevi 15€. Anche chi invita riceve 15€ per ogni amico valido. L'asset acquistato è rivendibile subito.",
    "code": null,
    "steps": [
      "Apri Bitpanda dall'invito e crea un nuovo account (devi essere nuovo utente).",
      "Completa la registrazione.",
      "Completa la verifica identità (KYC).",
      "Deposita almeno 50€.",
      "Fai un acquisto idoneo da almeno 50€ tramite Bitpanda Broker (l'asset è rivendibile subito).",
      "Completati i requisiti, ricevi 15€ di bonus entro massimo 30 giorni."
    ],
    "rules_ok": [
      "L'acquisto deve passare dal Bitpanda Broker ed essere di almeno 50€: validi crypto, azioni, ETF, ETC, M-Token / metalli.",
      "L'asset acquistato è rivendibile subito: non stai spendendo i 50€.",
      "Controlla sempre il riepilogo prima di confermare: Bitpanda mostra prezzo finale e commissioni prima dell'ordine.",
      "Inviti: 15€ a te e 15€ all'amico per ogni amico valido."
    ],
    "faq": [
      {
        "q": "Quanto vale il bonus di Bitpanda?",
        "a": "15€ per chi si iscrive dall'invito e completa i requisiti. Chi invita riceve a sua volta 15€ per ogni amico valido. L'accredito avviene entro massimo 30 giorni."
      },
      {
        "q": "Cosa devo comprare per ottenere il bonus Bitpanda?",
        "a": "Un acquisto idoneo da almeno 50€ tramite Bitpanda Broker. Asset validi: crypto, azioni, ETF, ETC, M-Token / metalli. Non valgono swap tra asset, Bitpanda Fusion, Leverage, Margin Trading e Cash Plus."
      },
      {
        "q": "Quanto devo depositare per il bonus Bitpanda?",
        "a": "Almeno 50€ di deposito, oltre all'acquisto idoneo da almeno 50€ dal Broker. L'asset acquistato è rivendibile subito, quindi non lo stai spendendo."
      },
      {
        "q": "Quanto posso guadagnare con gli inviti?",
        "a": "15€ per ogni amico valido, e 15€ anche all'amico. Il regolamento non indica un numero massimo preciso di inviti. Servono registrazioni reali, account verificati e acquisto idoneo completato nel periodo promo."
      },
      {
        "q": "Entro quando devo completare tutto?",
        "a": "La promo termina il 25/06/2026 alle 23:59. Registrazione, verifica identità e acquisto idoneo da almeno 50€ vanno completati entro la scadenza. Il KYC può richiedere tempo, quindi non ridurti all'ultimo."
      }
    ],
    "rules_ko": [
      "Operazioni che non contano: swap tra asset, Bitpanda Fusion, Leverage, Margin Trading, Cash Plus",
      "Non essere un nuovo utente Bitpanda",
      "Account doppi o registrazioni anomale",
      "Ridursi all'ultimo: il KYC può richiedere tempo e la promo scade il 25/06/2026 alle 23:59"
    ],
    "why": "15€ di bonus per aver aperto un conto, depositato 50€ e fatto un acquisto idoneo da 50€ dal Broker. L'asset comprato è rivendibile subito, quindi il costo reale è solo commissioni e spread (sotto i 2€ sugli asset più leggeri). Il sistema di inviti aggiunge 15€ per ogni amico valido, sia all'amico sia a chi invita. Da tenere a mente: KYC, deposito e acquisto vanno completati entro la scadenza e l'accredito può arrivare fino a 30 giorni dopo.",
    "pros": [
      "Bonus chiaro da 15€ con requisiti definiti",
      "Asset rivendibile subito: costo reale = solo commissioni",
      "Inviti remunerativi: 15€ a te e 15€ all'amico per ogni amico valido",
      "Ampia scelta di asset idonei (crypto, azioni, ETF, ETC, metalli)"
    ],
    "cons": [
      "Serve sia il deposito da 50€ sia un acquisto idoneo da 50€",
      "Accredito bonus fino a 30 giorni",
      "Operazioni non valide escluse (swap, Fusion, Leverage, Margin, Cash Plus)",
      "Promo a tempo: termina il 25 giugno 2026"
    ],
    "sezioni_dopo": [
      {
        "titolo": "Commissioni su 50€: esempi pratici",
        "html": "<p class=\"g-verdict-txt\">Comprando e rivendendo subito vanno considerati commissioni e spread (oltre ai movimenti di prezzo). Stime indicative su 50€, senza considerare oscillazioni. Il saldo teorico include il bonus da 15€. L'opzione più leggera risulta oro / M-Token Gold, seguita da Bitcoin.</p>\n      <div style=\"overflow-x:auto\">\n      <table style=\"width:100%;border-collapse:collapse;font-size:.92rem;background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden;backdrop-filter:blur(6px)\">\n        <thead><tr style=\"background:rgba(95,213,224,.08)\">\n          <th style=\"text-align:left;padding:12px 16px;font-family:'Orbitron';font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-faint);border-bottom:1px solid var(--line)\">Asset</th>\n          <th style=\"text-align:left;padding:12px 16px;font-family:'Orbitron';font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-faint);border-bottom:1px solid var(--line)\">Costo stimato</th>\n          <th style=\"text-align:left;padding:12px 16px;font-family:'Orbitron';font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-faint);border-bottom:1px solid var(--line)\">Saldo teorico</th>\n        </tr></thead>\n        <tbody>\n          <tr><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink);font-weight:600\">Oro / M-Token Gold</td><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink-dim)\">~0,75€</td><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--lime);font-weight:600\">~64,25€</td></tr>\n          <tr><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink);font-weight:600\">Bitcoin</td><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink-dim)\">~0,99€</td><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink-dim)\">~64,00€</td></tr>\n          <tr><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink);font-weight:600\">Azioni / ETF / ETC</td><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink-dim)\">~2,00€</td><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink-dim)\">~63,00€</td></tr>\n          <tr><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink);font-weight:600\">Palladio</td><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink-dim)\">~1,98€</td><td style=\"padding:12px 16px;border-bottom:1px solid var(--line);color:var(--ink-dim)\">~63,00€</td></tr>\n          <tr><td style=\"padding:12px 16px;color:var(--ink);font-weight:600\">Argento / Platino</td><td style=\"padding:12px 16px;color:var(--ink-dim)\">~2,23€</td><td style=\"padding:12px 16px;color:var(--ink-dim)\">~62,77€</td></tr>\n        </tbody>\n      </table>\n      </div>"
      }
    ],
    "codice_box": false,
    "categoria_etichetta": "Fintech · Crypto",
    "seo_title": "Bonus Bitpanda 15€ + 15€ all'amico (con invito) — guida 2026 | GoatLink"
  },
  {
    "slug": "creditagricole",
    "capitale": 0,
    "name": "Crédit Agricole",
    "category": "Banca",
    "logo": "logos/creditagricole.png",
    "emoji": "🏦",
    "amount": 50,
    "currency": "€",
    "amountLabel": "50€",
    "minutes": 15,
    "difficulty": "Facile",
    "badge": "Prorogata",
    "payout": "Buono Regalo Amazon.it",
    "deposit": "1 transazione + carta Visa",
    "expires": "2026-11-02",
    "updated": "2026-09-01",
    "featured": true,
    "countInTotal": true,
    "source": "https://www.credit-agricole.it/privati/conti/promozioni",
    "summary": "Apri il Conto Online con la carta di debito Visa entro il 02/11/2026 e ricevi 50€ in Buono Regalo Amazon.it. Ci sono scaglioni aggiuntivi legati allo stipendio e all'uso della carta.",
    "code": null,
    "steps": [
      "Apri il <strong>Conto Online Crédit Agricole</strong> dall'invito. Serve essere <strong>nuovo correntista</strong> del Gruppo Crédit Agricole Italia.",
      "Inserisci il codice promozionale <strong>nel form di apertura</strong>: se apri senza, il bonus può non essere riconosciuto e non si recupera dopo.",
      "Nella stessa richiesta sottoscrivi la <strong>Carta Visa Debit</strong>: senza carta la promo non parte. Tutto entro il <strong>02/11/2026</strong>.",
      "Attiva transazioni online e 3D Secure (servono le credenziali che arrivano per posta).",
      "Fai almeno <strong>1 transazione</strong> con la carta, di qualsiasi importo. <strong>I prelievi non contano</strong>, e nemmeno le spese stornate o annullate.",
      "Ricevi <strong>50€ in Buono Regalo Amazon.it</strong>."
    ],
    "rules_ok": [
      "L'operazione a premi «Invita un amico in Crédit Agricole – Agosto 2026» è valida dal 31/07/2026 al 03/01/2027, e la finestra per chiedere l'apertura del conto si chiude il <strong>02/11/2026</strong>.",
      "La Carta Visa Debit è obbligatoria: sceglila in fase di apertura.",
      "Esistono scaglioni aggiuntivi: +100€ con accredito stipendio o pensione e fino a +100€ in base all'utilizzo della carta. Importi e tempistiche nel regolamento ufficiale dell'edizione di agosto.",
      "Se accrediti lo stipendio, il bonifico deve avere <strong>causale ABI 27, SALA o PENS</strong>: con una causale generica la banca non lo riconosce."
    ],
    "why": "Basta una transazione con la carta Visa, di qualsiasi importo, e il buono arriva senza fare altro.",
    "pros": [
      "Una sola spesa, importo libero",
      "Scaglioni extra con stipendio",
      "Conto online a zero spese"
    ],
    "faq": [
      {
        "q": "Quanto si guadagna con Crédit Agricole?",
        "a": "50€ in Buono Regalo Amazon.it aprendo il Conto Online con la Carta Visa Debit. Ci sono scaglioni aggiuntivi: +100€ con accredito stipendio o pensione e fino a +100€ in base all'utilizzo della carta, con importi e tempistiche indicati nel regolamento dell'edizione di agosto."
      },
      {
        "q": "Entro quando devo aprire il conto?",
        "a": "La finestra per chiedere l'apertura si chiude il <strong>02/11/2026</strong>. L'operazione a premi «Invita un amico in Crédit Agricole – Agosto 2026» resta valida fino al 03/01/2027, ma senza richiesta entro il 02/11/2026 non si partecipa."
      },
      {
        "q": "Quale carta devo scegliere?",
        "a": "La <strong>Carta Visa Debit</strong>, obbligatoria per il bonus. Va selezionata in fase di apertura: senza carta la promozione non parte."
      },
      {
        "q": "Cosa conta come transazione valida?",
        "a": "Una sola transazione con la carta, di qualsiasi importo. Non contano i prelievi, né le spese stornate o annullate."
      },
      {
        "q": "Cosa serve per l'extra stipendio?",
        "a": "Un accredito con causale <strong>ABI 27, SALA o PENS</strong>. Con una causale generica, anche se il bonifico riporta la parola «stipendio», la banca non lo riconosce."
      },
      {
        "q": "Chi è escluso dalla promozione?",
        "a": "Chi è già correntista del Gruppo Crédit Agricole Italia. La promozione è riservata ai nuovi correntisti."
      }
    ],
    "codice_etichetta": "Codice invito",
    "seo_title": "Bonus Crédit Agricole 50€ in Buoni Amazon (codice invito) — guida 2026 | GoatLink"
  },
  {
    "slug": "ing",
    "capitale": 0,
    "name": "ING",
    "category": "Banca",
    "logo": null,
    "emoji": "🦁",
    "amount": 75,
    "currency": "€",
    "amountLabel": "75€",
    "minutes": 15,
    "difficulty": "Facile",
    "badge": "Bonus più alto",
    "payout": "Cashback entro il 31/01/2027",
    "deposit": "Conto + carta, spesa 250€",
    "expires": "2026-11-02",
    "updated": "2026-09-14",
    "featured": true,
    "countInTotal": true,
    "source": "https://www.ing.it/conto-corrente-arancio/conto-corrente-online.html",
    "summary": "Nuova campagna: apri il Conto Corrente Arancio Più con il codice amico entro il 02/11, chiedi la carta e spendi 250€ entro il 31/12. 75€ di cashback entro il 31 gennaio, senza lasciare fermo un euro.",
    "code": null,
    "steps": [
      "Apri il <strong>Conto Corrente Arancio Più</strong> su ing.it entro il <strong>02/11/2026</strong>. L’<strong>Arancio Light</strong> non dà diritto al bonus da nuovo cliente: è l’errore più frequente di questa promo.",
      "Prima di confermare, verifica che il <strong>codice amico risulti già inserito</strong> nel riepilogo. Si mette solo in fase di apertura: dopo non è più aggiungibile e il bonus non si recupera.",
      "Nella stessa richiesta chiedi la <strong>Carta di Debito Mastercard</strong> (oppure la Carta di Credito Mastercard Gold). Senza carta la promo non parte.",
      "Completa la verifica identità: servono <strong>documento e tessera sanitaria</strong>, con eventuale conferma tramite SPID. Tieni entrambi a portata di mano prima di iniziare.",
      "<strong>Facoltativo:</strong> durante la richiesta puoi aprire anche il <strong>Conto Arancio</strong>, il conto deposito. Serve solo se ti interessa la promo separata sul 4% (vedi sotto): per i 75€ non è richiesto.",
      "Attiva il conto e portaci sopra la somma che ti serve per la spesa, con un bonifico da un altro conto tuo.",
      "Spendi almeno <strong>250€</strong> con la carta entro il <strong>31/12/2026</strong>. Vale la somma di più transazioni e puoi sommare carta di debito e carta di credito Gold.",
      "Ricevi <strong>75€ di cashback</strong> sul Conto Corrente Arancio <strong>entro il 31/01/2027</strong>."
    ],
    "rules_ok": [
      "L’iniziativa è «Invita i tuoi amici in ING – 2026 Edizione V», valida dall’08/09/2026 al 31/12/2026. La finestra per aprire il conto con il codice si chiude il <strong>02/11/2026</strong>: è quella la data che conta.",
      "I 250€ si raggiungono <strong>in più transazioni</strong>, anche piccole, e sommando le due carte se le hai richieste entrambe.",
      "La carta di debito arriva subito in versione <strong>digitale</strong>: la carichi su Apple Pay o Google Pay e inizi a spendere mentre aspetti quella fisica.",
      "Canone 5€ al mese, azzerato con accredito dello stipendio o con entrate da almeno 1.000€ al mese. <strong>Fino ai 30 anni il conto è gratuito</strong> senza altre condizioni.",
      "Bonifici SEPA anche istantanei, F24, MAV, RAV, CBILL e pagoPA a costo zero.",
      "Dopo l’apertura diventi presentatore a tua volta: <strong>75€ per ogni amico</strong> fino a 50 amici, più un Superbonus di 250€ ogni 10 amici che completano i requisiti.",
      "I depositi sono garantiti fino a 100.000€ dal sistema olandese di garanzia, non dal FITD italiano: stessa copertura, fondo diverso."
    ],
    "rules_ko": [
      "<strong>L’Arancio Light non vale</strong> per il bonus da nuovo cliente. Puoi comunque partecipare come presentatore, ma i 75€ da nuovo cliente richiedono l’Arancio Più.",
      "Esiste anche il codice <strong>UNDER30</strong>, che dà 100€ invece di 75€ ma <strong>non fa guadagnare nulla a chi ti invita</strong>. Si può inserire un solo codice: se hai meno di 30 anni e l’iniziativa è attiva quando apri, valutala: 25€ in più sono 25€ in più.",
      "Il <strong>4% sul Conto Arancio non è automatico</strong> e non c’entra con questo bonus: è un’iniziativa separata, valida fino al 31/01/2027, che chiede il Conto Arancio e l’accredito mensile. Chi salta un mese perde il tasso e non lo recupera.",
      "La banca effettua <strong>controlli periodici</strong> sul rispetto dei requisiti prima di accreditare il bonus.",
      "Il conto va aperto <strong>dal sito ing.it</strong>: aprendolo da altri canali il codice amico può non essere agganciato."
    ],
    "trick": {
      "titolo": "Arrivare a 250€ senza spendere davvero",
      "testo": "La spesa richiesta è alta e non tutti hanno 250€ di acquisti da fare entro dicembre. La strada che gira è comprare con la carta ING dei <strong>voucher Aircash ABON o MuchBetter</strong> — in tabaccheria, al supermercato, nei negozi di elettronica o online — caricarli sul wallet e poi riportarsi i soldi sul proprio conto. L’acquisto del voucher è una transazione con carta a tutti gli effetti. Su MuchBetter la commissione è <strong>fissa, 4€ per ricarica</strong>, con tagli da 30€, 50€ e 100€. Su Aircash la ricarica è <strong>gratuita</strong> (tagli da 10€ a 50€) e riporti i soldi sul tuo conto con un bonifico all’1% — su 50€ sono 50 centesimi.",
      "rischio": "Da sapere prima di partire: il regolamento dell’Edizione V chiede di «spendere con la carta» e non pubblica un elenco di operazioni escluse, a differenza di altre promo dove gift card e ricariche sono escluse nero su bianco. Non è quindi vietato, ma resta una zona grigia, e ING fa controlli prima di pagare. Se hai comunque 250€ di spese normali da fare entro dicembre, quella resta la strada senza discussioni."
    },
    "seo_title": "Bonus ING 75€ Conto Corrente Arancio Più (codice amico) — guida 2026 | GoatLink",
    "faq": [
      {
        "q": "Quanto vale il bonus ING oggi?",
        "a": "75€ di cashback per chi apre il Conto Corrente Arancio Più con un codice amico. È la nuova campagna, l'Edizione V: la precedente da 100€ con il codice WELCOME si è chiusa il 7 settembre 2026."
      },
      {
        "q": "Entro quando devo aprire il conto?",
        "a": "Entro il <strong>2 novembre 2026</strong>. L'iniziativa resta valida fino al 31/12/2026, ma la richiesta di apertura con il codice amico va fatta entro il 2 novembre: dopo quella data non si partecipa più."
      },
      {
        "q": "Quanto devo spendere e con quale carta?",
        "a": "Almeno 250€ entro il 31/12/2026, con la Carta di Debito Mastercard e/o la Carta di Credito Mastercard Gold. Vale la somma di più transazioni e le due carte si sommano fra loro."
      },
      {
        "q": "Quando arrivano i 75€?",
        "a": "Sul Conto Corrente Arancio entro il <strong>31 gennaio 2027</strong>. Nella pratica spesso arrivano prima, ma quella è la data che la banca si impegna a rispettare."
      },
      {
        "q": "Va bene il Conto Corrente Arancio Light?",
        "a": "No. Il bonus da nuovo cliente richiede l'<strong>Arancio Più</strong>. Con il Light puoi partecipare solo come presentatore, cioè invitando altri con il tuo codice."
      },
      {
        "q": "Conviene di più il codice amico o il codice UNDER30?",
        "a": "Dipende da te. Il codice amico dà 75€ a te e 75€ a chi ti ha invitato. Il codice UNDER30, se hai meno di 30 anni, dà 100€ a te e niente all'altro. Se ne inserisce uno solo. Noi te lo diciamo lo stesso: 25€ in più in tasca tua sono 25€ in più, e la scelta è tua."
      },
      {
        "q": "Il 4% sul Conto Arancio è compreso nel bonus?",
        "a": "No, sono due cose diverse. Il 4% è un'iniziativa separata valida fino al 31/01/2027, che chiede di aprire anche il Conto Arancio e di mantenere un accredito mensile: se salti un mese il tasso promozionale si perde e non si recupera. Per i 75€ il Conto Arancio non serve."
      },
      {
        "q": "Posso arrivare ai 250€ senza spendere davvero?",
        "a": "Si può, comprando con la carta ING dei voucher Aircash o MuchBetter e riportandosi poi i soldi sul proprio conto. Il regolamento di questa edizione non pubblica un elenco di operazioni escluse, quindi non è vietato, ma resta una zona grigia e la banca fa controlli prima di pagare. Se hai comunque 250€ di spese normali da fare entro dicembre, quella è la strada senza discussioni."
      },
      {
        "q": "Il conto ha un canone?",
        "a": "5€ al mese, azzerati con l'accredito dello stipendio o con entrate da almeno 1.000€ al mese. Fino ai 30 anni il primo Conto Corrente Arancio Più è gratuito senza altre condizioni."
      },
      {
        "q": "I soldi sul conto sono garantiti?",
        "a": "Sì, fino a 100.000€, ma dal sistema di garanzia olandese e non dal FITD italiano: stessa copertura prevista in tutta l'UE, fondo diverso."
      }
    ],
    "why": "È il bonus più alto del sito e non chiede di lasciare fermo un euro: i 250€ di spesa restano tuoi, cambia solo la carta con cui li paghi.",
    "pros": [
      "75€, il più alto in catalogo",
      "Zero capitale immobilizzato",
      "Gratis fino ai 30 anni",
      "Carta digitale attiva subito",
      "Quasi 4 mesi per fare la spesa"
    ]
  },
  {
    "slug": "fineco",
    "capitale": 0,
    "name": "Fineco",
    "category": "Banca",
    "logo": "logos/fineco.png",
    "emoji": "🏦",
    "amount": 50,
    "currency": "€",
    "amountLabel": "50€",
    "minutes": 15,
    "difficulty": "Medio",
    "badge": "Nuova edizione",
    "payout": "Accredito in conto nel 2027",
    "deposit": "Stipendio, 2.500€ di carta o 5 ordini",
    "expires": "2026-10-15",
    "updated": "2026-09-17",
    "featured": false,
    "countInTotal": false,
    "source": "https://it.finecobank.com/invita-un-amico/",
    "summary": "È tornata: apri il conto Fineco con il codice di un amico entro il <strong>15 ottobre</strong> e sblocchi 50€ scegliendo una condizione su quattro. Hai tempo fino al 4 gennaio 2027 per completarla.",
    "code": null,
    "steps": [
      "Procurati il <strong>Codice Amico</strong>. Lo può dare solo chi ha già un conto Fineco: se non conosci nessuno, scrivici su WhatsApp e te lo passiamo in privato.",
      "Apri il conto su finecobank.com o dall’app e inserisci il codice <strong>nel campo dedicato durante la procedura</strong>. È l’unico momento in cui si può mettere: dopo non è più aggiungibile e il bonus non si recupera.",
      "Completa la richiesta di apertura entro il <strong>15/10/2026</strong> e attiva i codici di accesso. Conta la data della richiesta, ma il conto deve arrivare ad aprirsi davvero.",
      "Scegli <strong>una sola</strong> delle quattro strade e completala entro il <strong>04/01/2027</strong>: accredito di stipendio o pensione; almeno 5 ordini trading in acquisto o in vendita; carta di debito o credito richiesta e 2.500€ di pagamenti.",
      "La quarta strada, se hai liquidità ferma: trasferimento di almeno <strong>20.000€ entro il 30/11/2026</strong>, mantenuti sul conto fino al 04/01/2027.",
      "Quando la banca la mette a disposizione in area riservata o in app, <strong>firma l’integrazione contrattuale</strong>. Senza quella firma il bonus non viene pagato, ed è la finestra in cui si perde più spesso.",
      "Ricevi i <strong>50€</strong> sul conto corrente, accreditati al netto della ritenuta del 26%."
    ],
    "rules_ok": [
      "L’iniziativa è «Invita un amico», valida dal <strong>15/09/2026 al 15/10/2026</strong>. Quella che conta è la data della richiesta di apertura del conto.",
      "Basta <strong>una</strong> delle quattro condizioni e hai tempo fino al <strong>4 gennaio 2027</strong>: è la finestra più larga che Fineco abbia mai dato su questa promo. Le edizioni precedenti chiudevano in sei settimane.",
      "Anche chi ti passa il codice prende 50€. Te lo diciamo perché è giusto tu lo sappia: non cambia un centesimo di quello che prendi tu.",
      "Fino al compimento dei 30 anni: <strong>carta di debito a canone zero</strong>, azioni ed ETF Italia e Germania a 2,95€ per ordine, mercati USA a 3,95$, PAC in ETP senza costi applicati da Fineco e imposta di bollo gratuita sotto i 5.000€ di giacenza media.",
      "Fineco è una banca italiana: i depositi sono garantiti fino a 100.000€ dal <strong>FITD</strong>, il fondo interbancario italiano.",
      "Il regime fiscale è amministrato: sul trading la banca calcola, dichiara e versa le imposte al posto tuo."
    ],
    "rules_ko": [
      "<strong>Codice non inserito, bonus perso.</strong> Va messo in fase di apertura e non è recuperabile dopo, nemmeno chiamando l’assistenza.",
      "Il campo del codice è <strong>uno solo</strong>: se ci metti un codice promozionale trading, di quelli che regalano ordini gratuiti, il codice amico non ci sta. Scegli prima quale dei due ti conviene.",
      "Il bonus <strong>non è promesso né garantito</strong>: il regolamento lo definisce un riconoscimento discrezionale della banca dopo le sue verifiche. È scritto nero su bianco sulla pagina ufficiale.",
      "Nelle tre edizioni precedenti erano esclusi i già intestatari o cointestatari di un conto Fineco e chi aveva chiuso un conto nei due anni prima. Il regolamento completo di questa edizione non è ancora online: appena esce lo verifichiamo e aggiorniamo questa riga.",
      "Sempre nelle edizioni precedenti, per i 2.500€ di carta non contavano i <strong>prelievi di contante</strong> né le operazioni poi stornate.",
      "La firma dell’integrazione contrattuale ha una finestra chiusa, di solito un mese: chi la salta perde tutto. Per questa edizione la data non è ancora pubblicata, quindi tieni il conto attivo e l’app sotto controllo."
    ],
    "seo_title": "Bonus Fineco 50€ Invita un amico (codice amico) — guida 2026 | GoatLink",
    "faq": [
      {
        "q": "Quanto vale il bonus Fineco oggi?",
        "a": "50€ sul conto corrente per chi apre con un Codice Amico, più altri 50€ a chi il codice te lo ha passato. È l’iniziativa «Invita un amico», riaperta il 15 settembre 2026 dopo la chiusura dell’edizione di luglio."
      },
      {
        "q": "Entro quando devo aprire il conto?",
        "a": "Entro il <strong>15 ottobre 2026</strong>. La finestra dura un mese esatto e non è stata prorogata al momento in cui scriviamo: le edizioni passate qualche volta lo sono state, ma non è una cosa su cui contare."
      },
      {
        "q": "Cosa devo fare per sbloccare i 50€?",
        "a": "Una cosa sola a scelta fra quattro, entro il <strong>4 gennaio 2027</strong>: accreditare stipendio o pensione, fare almeno 5 ordini trading in acquisto o vendita, oppure chiedere una carta di debito o credito e arrivare a 2.500€ di pagamenti. La quarta è trasferire almeno 20.000€ entro il 30/11/2026 e lasciarli lì fino al 4 gennaio."
      },
      {
        "q": "Qual è la strada più economica se non ho lo stipendio?",
        "a": "I 5 ordini. Fino ai 30 anni un ordine su azioni ed ETF Italia costa 2,95€: cinque ordini sono circa 15€ contro 50€ di bonus, e valgono anche le vendite, quindi puoi chiudere la posizione contando gli ordini di uscita. Stai però comprando strumenti veri: il rischio di mercato è tuo. La strada della carta chiede oltre 700€ al mese di spesa, quindi conviene solo se quella spesa la facevi comunque."
      },
      {
        "q": "Quanto arriva davvero in conto?",
        "a": "Il programma dice 50€ ed è quello che pubblichiamo. Sul bonus la banca applica la ritenuta del 26% prevista dall’art. 26 c. 2 del DPR 600/73, come ha fatto in tutte e tre le edizioni del 2026: l’accredito arriva al netto. Il regolamento di questa edizione non è ancora online; appena esce lo verifichiamo."
      },
      {
        "q": "Quando arrivano i soldi?",
        "a": "Nel 2027, e non in automatico. Dopo che hai completato la condizione, la banca mette a disposizione in area riservata un’integrazione contrattuale da firmare: solo dopo quella firma accredita il bonus. La finestra per firmare è chiusa e chi la salta perde tutto. Per questa edizione la data non è ancora pubblicata."
      },
      {
        "q": "Dove trovo un Codice Amico?",
        "a": "Te lo dà una persona che ha già il conto Fineco, dalla sua area riservata. Sul sito non ne pubblichiamo nessuno: scrivici su WhatsApp e te lo passiamo in privato."
      },
      {
        "q": "Posso usare il codice amico insieme a un codice promozionale trading?",
        "a": "No. Il campo del codice promozione è uno solo. Se ci metti uno di quei codici che regalano ordini gratuiti per qualche mese, il codice amico non ci sta e i 50€ non arrivano. Se fai molti ordini può convenirti l’altro: fatti il conto prima, perché dopo non si cambia."
      },
      {
        "q": "Il conto ha un canone?",
        "a": "Dipende dal profilo che scegli fra One, Classic e Max, e le condizioni complete stanno nei fogli informativi Fineco. Quello che vale per tutti sotto i 30 anni è la carta di debito a canone zero, il bollo gratis sotto i 5.000€ di giacenza media e le commissioni di trading ridotte."
      },
      {
        "q": "I soldi sul conto sono garantiti?",
        "a": "Sì, fino a 100.000€ dal Fondo Interbancario di Tutela dei Depositi. Fineco è una banca italiana vigilata direttamente dalla BCE, quindi qui la garanzia è quella italiana e non un fondo estero."
      }
    ],
    "why": "È l’unica promo del catalogo che ti lascia scegliere come sbloccarla, e ti dà quasi quattro mesi per farlo invece delle solite sei settimane. In cambio chiede pazienza: l’accredito arriva nel 2027 e va confermato con una firma.",
    "pros": [
      "Quattro strade, ne basta una",
      "Tempo fino al 4 gennaio 2027",
      "Zero capitale immobilizzato",
      "Banca italiana, garanzia FITD",
      "Under 30: carta e bollo gratis"
    ]
  },
  {
    "slug": "buddybank",
    "capitale": 11,
    "name": "Buddybank",
    "category": "Banca",
    "logo": "logos/buddybank.png",
    "emoji": "🏦",
    "amount": 50,
    "currency": "€",
    "amountLabel": "50€",
    "boost": {
      "amount": 80,
      "amountLabel": "80€",
      "until": "2026-11-16",
      "badge": "Bonus maggiorato"
    },
    "minutes": 10,
    "difficulty": "Facile",
    "badge": null,
    "payout": "Entro 90 giorni, prelevabile",
    "deposit": "Ricarica 11€ + spesa da 10€",
    "expires": "2027-01-20",
    "updated": "2026-10-04",
    "featured": true,
    "countInTotal": true,
    "source": "https://www.buddy.unicredit.it/tutti-prodotti/conto-genius-buddy/",
    "seo_title": "Bonus Buddybank 80€ conto Genius buddy (codice amico) — guida 2026 | GoatLink",
    "summary": "Apri il conto Genius buddy con il codice amico, carica 11€ e fai un pagamento da almeno 10€ con la carta MyOne. Fino al 16 novembre il bonus è maggiorato a 80€, poi torna a 50€. Soldi cash sul conto, prelevabili.",
    "code": null,
    "steps": [
      "Apri l'app <strong>buddy</strong> (o il sito) e tocca <strong>Apri conto</strong>. Registrati con la <strong>procedura classica, con scansione dei documenti</strong>: con SPID o CIEid la registrazione si blocca a metà e tocca ricominciare.",
      "Nella <strong>prima schermata</strong> ti viene chiesto il codice promo: inseriscilo lì. A conto aperto non si può più aggiungere e il bonus non si recupera.",
      "Scegli la <strong>carta di debito MyOne in versione solo digitale</strong>: è gratuita, mentre la fisica ha un costo. Per il bonus la virtuale basta.",
      "Completa l'apertura con documento e selfie, poi aspetta l'email di conferma. <strong>La carta virtuale si attiva dopo 48 ore</strong> dall'apertura: prima di allora numero, scadenza e CVV non sono visibili.",
      "Quando il conto è attivo, caricalo con un bonifico da <strong>11€</strong> da un altro conto tuo. Ne bastano 10 per la spesa, il centesimo in più serve a non finire a saldo zero.",
      "Entro <strong>30 giorni</strong> dall'apertura fai <strong>un pagamento da almeno 10€</strong> con la MyOne: POS fisico, acquisto online, oppure la carta caricata su Apple Pay, Google Pay o Samsung Pay.",
      "Non ridurti all'ultimo giorno: per i controlli fa fede la <strong>data valuta</strong>, non quella dell'acquisto.",
      "Tieni il <strong>saldo disponibile pari o superiore a zero</strong> fino all'accredito: se svuoti il conto mentre aspetti, il premio salta.",
      "Ricevi il bonus <strong>entro 90 giorni</strong> dalla transazione valida, direttamente sul conto e prelevabile."
    ],
    "rules_ok": [
      "Fino al <strong>16 novembre 2026</strong> il bonus di benvenuto è maggiorato a <strong>80€</strong> (prorogato dal 4 ottobre). Dal 17 novembre torna a 50€: la promozione resta aperta fino al 20/01/2027, cambia solo l'importo.",
      "Il conto corrente è <strong>gratuito</strong>, e la carta MyOne virtuale è gratuita: per prendere il bonus non spendi nulla in canoni.",
      "Sono valide le transazioni su <strong>POS fisico</strong> (contactless o chip e PIN), su <strong>POS virtuale</strong> per gli acquisti online e i pagamenti tramite <strong>Apple Pay, Google Pay e Samsung Pay</strong>.",
      "I soldi arrivano <strong>cash sul conto</strong> e sono prelevabili: non è un buono né un cashback vincolato.",
      "Dopo l'apertura inviti a tua volta: <strong>50€ per ogni amico valido</strong>, fino a 100 amici.",
      "Documenti accettati per la verifica: carta d'identità elettronica o cartacea, patente, passaporto."
    ],
    "rules_ko": [
      "<strong>Non contano</strong> bonifici e giroconti verso altri conti correnti, bonifici e ricariche verso carte prepagate con IBAN e ricariche verso carte prepagate. Deve essere un pagamento vero a un esercente.",
      "La <strong>carta virtuale serve per pagare, non per ricaricare</strong>: le operazioni di ricarica verso altre carte restano escluse anche facendole dal wallet, quindi qui la scorciatoia dei voucher non funziona. Con 10€ di soglia non serve comunque.",
      "Sono esclusi i <strong>vecchi clienti buddybank</strong> e i dipendenti del Gruppo UniCredit.",
      "È escluso chi, alla data del <strong>16 settembre 2024</strong>, era già cliente UniCredit o buddy con un conto corrente, una prepagata o una carta ricaricabile con IBAN Genius Pay.",
      "È escluso anche chi ha <strong>chiuso</strong> un conto buddybank, Genius buddy o una Genius Pay prima o durante il periodo della promozione, <strong>anche se poi lo ha riaperto</strong>.",
      "Registrandoti con <strong>SPID o CIEid</strong> la procedura si inceppa: usa la registrazione classica."
    ],
    "faq": [
      {
        "q": "Quanto vale davvero il bonus Buddybank adesso?",
        "a": "80€ per chi apre entro il <strong>16 novembre 2026</strong>, poi 50€. La promozione resta comunque aperta fino al 20 gennaio 2027: cambia solo l'importo, non i requisiti."
      },
      {
        "q": "Quanto devo spendere per prenderlo?",
        "a": "Un solo pagamento da almeno 10€ con la carta MyOne, entro 30 giorni dall'apertura del conto. Il regolamento accetta anche più transazioni che sommate facciano 10€, ma un pagamento unico è la strada più pulita."
      },
      {
        "q": "Devo lasciare dei soldi fermi?",
        "a": "No, ma il saldo disponibile deve restare pari o superiore a zero dall'apertura del conto fino a quando arriva il premio. In pratica carichi 11€, ne spendi 10 e il resto lo lasci lì: non svuotare il conto mentre aspetti."
      },
      {
        "q": "Posso pagare con la carta virtuale prima che arrivi quella fisica?",
        "a": "Sì, l'acquisto si può fare con la MyOne virtuale caricata su Apple Pay, Google Pay o Samsung Pay. Quello che non puoi fare, né con la virtuale né con la fisica, è una ricarica verso un'altra carta: quelle operazioni sono escluse dal regolamento."
      },
      {
        "q": "Quando arriva il bonus?",
        "a": "Entro 90 giorni lavorativi dalla transazione valida. Arriva cash sul conto ed è prelevabile."
      },
      {
        "q": "Chi è escluso dalla promozione?",
        "a": "I vecchi clienti buddybank, i dipendenti del Gruppo UniCredit e chi al 16 settembre 2024 era già cliente UniCredit o buddy con conto corrente, prepagata o carta ricaricabile con IBAN Genius Pay. È escluso anche chi ha chiuso uno di questi rapporti prima o durante il periodo, anche se poi lo ha riaperto."
      },
      {
        "q": "Perché non devo usare SPID per registrarmi?",
        "a": "Perché la registrazione con SPID o CIEid si blocca durante la procedura e costringe a ricominciare. Con la registrazione classica e la scansione dei documenti il percorso fila."
      },
      {
        "q": "Il conto ha dei costi?",
        "a": "No. Il conto Genius buddy è gratuito e la carta MyOne in versione digitale è gratuita. La versione fisica ha un costo, ma per il bonus non serve."
      }
    ],
    "why": "Il bonus più alto rispetto allo sforzo richiesto: un pagamento da 10€ e hai finito, e fino al 16 novembre vale 80€ invece di 50€.",
    "pros": [
      "80€ fino al 16 novembre",
      "Un pagamento da 10€ e basta",
      "Soldi cash, prelevabili",
      "Conto e carta virtuale gratuiti"
    ]
  },
  {
    "slug": "kast",
    "capitale": 105,
    "name": "KAST",
    "category": "Crypto",
    "logo": "logos/kast.png",
    "emoji": "💳",
    "amount": 20,
    "currency": "$",
    "amountLabel": "20$–250$",
    "minutes": 20,
    "difficulty": "Medio",
    "badge": null,
    "payout": "Prelevabile dopo 14 giorni",
    "deposit": "Deposito min. 105€",
    "expires": "2026-09-30",
    "updated": "2026-10-08",
    "featured": false,
    "countInTotal": false,
    "source": "https://www.kast.xyz/blog/refer-friends-earn-cash-how-kast-referral-rewards-work",
    "seo_title": "Bonus KAST da 20$ a 250$ in USDC (codice referral) — guida 2026 | GoatLink",
    "summary": "Carta Visa che spende stablecoin. Il bonus cresce con quanto spendi: 20$ su 100$, 50$ su 600$, 100$ su 1.600$, 250$ su 6.600$, pagati in USDC. Serve un deposito da almeno 105€ e la spesa base va fatta entro 7 giorni dalla registrazione.",
    "code": null,
    "steps": [
      "Registrati dal link dedicato. <strong>Disattiva prima adblock ed eventuali antivirus e accetta i cookie</strong>: se il tracciamento non passa, l'invito non viene agganciato e il bonus non viene riconosciuto.",
      "Inserisci l'email, poi <strong>scarica l'app e accedi con la stessa email</strong>. Non rifare la registrazione dall'app: creeresti un secondo account senza invito.",
      "Completa la verifica identità (KYC) con scansione del documento e selfie. Vanno bene carta d'identità, passaporto o patente.",
      "Deposita almeno <strong>105€</strong>. In crypto è immediato. Per il bonifico in euro devi prima attivare il conto e compilare un breve questionario.",
      "Genera la <strong>carta virtuale gratuita</strong>.",
      "Se paghi con bonifico, KAST ti dà un IBAN con <strong>nazione Malta</strong> e beneficiario il <strong>tuo nome e cognome</strong>: va impostato come bonifico a persona e non ad azienda, partendo da un conto intestato a te.",
      "Con la carta fai acquisti per almeno <strong>100$</strong> entro <strong>7 giorni dalla registrazione</strong>: è la soglia del bonus base da 20$, ed è la scadenza più stretta di tutta la promo.",
      "Il bonus ti viene <strong>notificato subito</strong>, ma diventa disponibile e prelevabile <strong>dopo 14 giorni</strong>. Se spendi di più, sali di scaglione: 50$ su 600$ spesi, 100$ su 1.600$, 250$ su 6.600$."
    ],
    "rules_ok": [
      "Valgono gli <strong>acquisti reali</strong>, nei negozi fisici e online: supermercato, bar, ristorante, benzina, farmacia, e-commerce.",
      "La carta virtuale è gratuita e si aggancia ad Apple Pay e Google Pay.",
      "Sul piano gratuito c'è un <strong>cashback dell'1,5%</strong> sugli acquisti, fino a 2.000 dollari di spesa al mese.",
      "Gli <strong>inviti sono illimitati</strong> e seguono la stessa scala del bonus di benvenuto.",
      "Il deposito resta tuo: non lo stai spendendo, lo stai caricando sulla carta."
    ],
    "rules_ko": [
      "<strong>KAST non è una banca.</strong> È una fintech con sede a Singapore che si definisce società tecnologica appoggiata a istituti autorizzati, e non risulta pubblicamente un'autorizzazione europea propria — a differenza, per esempio, di Coinbase, che ha la licenza MiCA rilasciata in Lussemburgo dalla CSSF. Lo scriviamo perché è la differenza che conta quando scegli dove mettere i soldi.",
      "La carta è <strong>custodial</strong>: i soldi che depositi stanno in mano a KAST, non su un wallet tuo. Non tenerci più di quello che ti serve per spendere.",
      "Il <strong>bonifico verso Malta intestato a te stesso</strong> è una configurazione che può far scattare i controlli antiriciclaggio della banca da cui parte. Se la tua banca ti chiede chiarimenti, è normale: mettilo in conto o usa il deposito in crypto.",
      "<strong>Non contano</strong> ricariche tra conti, ricariche PayPal, ricariche di altri wallet e giri di denaro: KAST le considera operazioni costruite per simulare una spesa e può negare il bonus o bloccare la ricompensa.",
      "I <strong>7 giorni</strong> per la spesa base partono dalla registrazione, non dal deposito. Registrati quando sei pronto a usare la carta, non prima."
    ],
    "trick": {
      "titolo": "Qui la scorciatoia dei voucher non conviene",
      "testo": "Su altre promo, tipo ING, si arriva alla soglia di spesa comprando voucher Aircash o MuchBetter e riportandosi poi i soldi sul conto. Su KAST l'operazione è tecnicamente possibile ma il quadro è diverso: il regolamento nomina esplicitamente ricariche di wallet e giri di denaro fra le operazioni che possono far saltare il bonus, mentre l'acquisto di gift card resta una via di mezzo che potrebbe passare.",
      "rischio": "Qui non è zona grigia per silenzio del regolamento, è zona grigia contro un divieto scritto. Con 100$ di soglia e sette giorni di tempo, spendere davvero al supermercato o online costa meno del rischio di perdere il bonus o di vedersi bloccare la ricompensa."
    },
    "faq": [
      {
        "q": "Quanto vale il bonus KAST?",
        "a": "Dipende da quanto spendi con la carta: 20$ su 100$ di spesa, 50$ su 600$, 100$ su 1.600$ e 250$ su 6.600$. Il bonus è pagato in USDC."
      },
      {
        "q": "Quanto devo depositare?",
        "a": "Almeno 105€, in crypto oppure con bonifico. Il deposito non è una spesa: quei soldi restano sulla carta e li spendi tu."
      },
      {
        "q": "Entro quando devo fare la spesa?",
        "a": "Entro 7 giorni dalla registrazione per il bonus base da 20$. È la scadenza più stretta della promo: conviene registrarsi solo quando si è pronti a usare la carta."
      },
      {
        "q": "Quando posso prelevare il bonus?",
        "a": "La notifica arriva subito, ma il bonus diventa disponibile e prelevabile dopo 14 giorni."
      },
      {
        "q": "KAST è regolamentata in Europa?",
        "a": "KAST è una fintech di Singapore e si descrive come società tecnologica che si appoggia a istituti autorizzati, non come banca. Non risulta pubblicamente una sua autorizzazione europea, e dal 1° luglio 2026 il periodo transitorio del regolamento MiCA è chiuso. Se per te la posizione regolamentare è il criterio principale, Coinbase ha una licenza MiCA verificabile e la trovi in catalogo."
      },
      {
        "q": "I miei soldi dove stanno?",
        "a": "In custodia di KAST: la carta è custodial, quindi i fondi depositati sono nelle sue mani e non su un wallet controllato da te. È il motivo per cui conviene tenerci solo la somma che serve a spendere."
      },
      {
        "q": "Perché il bonifico va fatto a una persona e non a un'azienda?",
        "a": "Perché l'IBAN che KAST fornisce per i depositi in euro è intestato al tuo stesso nome, con nazione Malta. È una configurazione lecita ma insolita, e la banca di partenza può chiedere chiarimenti sull'operazione. Se preferisci evitare la trafila, il deposito in crypto non ha questo passaggio."
      },
      {
        "q": "Che cashback ha la carta?",
        "a": "1,5% sugli acquisti nel piano gratuito, fino a 2.000 dollari di spesa al mese. I piani a pagamento salgono, ma per il bonus non servono."
      }
    ],
    "why": "È l'unico modo semplice per spendere stablecoin nei negozi di tutti i giorni, e il bonus sale insieme alla spesa invece di fermarsi a una cifra fissa.",
    "pros": [
      "Il bonus cresce con la spesa, fino a 250$",
      "Carta virtuale gratuita su Apple e Google Pay",
      "1,5% di cashback sul piano gratuito",
      "Inviti illimitati"
    ],
    "scadenza_etichetta": "Senza scadenza"
  },
  {
    "slug": "coinbase",
    "capitale": 21,
    "name": "Coinbase",
    "category": "Crypto",
    "logo": "logos/coinbase.png",
    "amount": 20,
    "currency": "€",
    "amountLabel": "20€",
    "minutes": 15,
    "difficulty": "Medio",
    "badge": null,
    "payout": "Pagato in 15–30 giorni",
    "deposit": "Deposito + trade min. 21€",
    "expires": null,
    "updated": "2026-10-04",
    "featured": false,
    "countInTotal": true,
    "source": null,
    "summary": "Nuovo utente: iscriviti, completa il KYC, deposita almeno 21€ e fai un acquisto da almeno 21€ entro 60 giorni dalla verifica. Bonus 20€ in Bitcoin.",
    "code": null,
    "steps": [
      "Iscriviti come <strong>nuovo utente</strong> tramite il link ufficiale. Un solo account: Coinbase incrocia i dati e blocca i bonus sui doppioni.",
      "Completa la verifica identità (KYC).",
      "Deposita almeno 21€ — metti <strong>22–23€</strong>, così le commissioni di deposito (circa 1–1,50€) non ti fanno scendere sotto la soglia.",
      "Fai un acquisto da almeno <strong>21€</strong> entro <strong>60 giorni</strong> dalla verifica dell'identità, <strong>solo su Coinbase base</strong>, pagando con bonifico o carta: le operazioni su Advanced e Prime non valgono.",
      "Ricevi il bonus entro 15–30 giorni. Arriva <strong>in Bitcoin</strong>: il controvalore in euro si muove finché non lo vendi."
    ],
    "rules_ok": [
      "Esempio valido: deposita 22€, compra 21€ di BTC, poi rivendili.",
      "Coinbase One è gratis la prima settimana e azzera le commissioni (ricordati di disdire entro 7 giorni).",
      "L'Italia è tra i paesi idonei sia per chi invita sia per chi viene invitato."
    ],
    "why": "L'ingresso più pulito al mondo crypto: depositi 21€, compri, e quei 21€ restano tuoi.",
    "pros": [
      "Importo fermo da mesi",
      "Verifica identità in pochi minuti",
      "Prima settimana senza commissioni"
    ],
    "faq": [
      {
        "q": "Come si ottiene il bonus Coinbase da 20€?",
        "a": "Da nuovo utente: iscriviti col link, completa la verifica, deposita almeno 21€ e fai un acquisto da almeno 21€ entro 60 giorni dalla verifica, solo su Coinbase base."
      },
      {
        "q": "Quanto costa fare il trade su Coinbase?",
        "a": "Ci sono commissioni, ma attivando la prova gratuita di Coinbase One per la prima settimana le commissioni si azzerano. Ricordati di disdire entro 7 giorni."
      },
      {
        "q": "Quando arriva il bonus Coinbase?",
        "a": "Generalmente entro 15–30 giorni dal trade qualificante."
      }
    ],
    "codice_box": false,
    "seo_title": "Bonus Coinbase 20€ (codice referral) — guida 2026 | GoatLink",
    "scadenza_etichetta": "A tempo indeterminato"
  },
  {
    "slug": "revolut",
    "capitale": 0,
    "name": "Revolut",
    "category": "Fintech",
    "logo": "logos/revolut.png",
    "emoji": "💳",
    "amount": 15,
    "currency": "€",
    "amountLabel": "15€",
    "minutes": 10,
    "difficulty": "Facile",
    "badge": null,
    "payout": "Pagato in 2 giorni",
    "deposit": "3 spese da 5€",
    "expires": null,
    "updated": "2026-05-28",
    "featured": false,
    "countInTotal": false,
    "source": "https://www.revolut.com/it-IT/legal/referrals-terms/",
    "summary": "Apri il conto, ordina la carta Standard gratuita e fai 3 spese da 5€ ciascuna entro 30 giorni. 15€ accreditati in 2 giorni.",
    "code": null,
    "steps": [
      "Registrati tramite il link referral (obbligatorio). Prima di partire <strong>controlla l'offerta sulla pagina che si apre</strong>: Revolut ruota le campagne ogni poche settimane e gli importi cambiano.",
      "Inserisci il numero di telefono nella prima schermata.",
      "Completa la verifica identità (documento + selfie).",
      "Ordina la carta <strong>Standard gratuita</strong> e attivala all'arrivo.",
      "Fai almeno <strong>3 spese da 5€</strong> ciascuna entro 30 giorni. <strong>Non contano</strong> gioco e scommesse, gift card e buoni, trasferimenti, cambio valuta e prelievi ATM.",
      "Non annullare gli acquisti dopo averli fatti: Revolut può stornare il bonus.",
      "Ricevi <strong>15€</strong> entro 2 giorni lavorativi."
    ],
    "rules_ok": [
      "Va bene sia la carta fisica che quella virtuale, anche acquisti online",
      "Esempi: 3 caffè al bar, piccola spesa, acquisti su Amazon in giorni diversi"
    ],
    "why": "Tre spese da 5€ e hai finito. Controlla l'offerta sulla pagina che si apre: Revolut cambia campagna spesso.",
    "pros": [
      "Tre spese piccole in 30 giorni",
      "Accredito in 2 giorni",
      "Carta virtuale immediata"
    ],
    "faq": [
      {
        "q": "Quante spese servono per il bonus Revolut?",
        "a": "Almeno 3 spese da 5€ ciascuna entro 30 giorni dall'apertura del conto. Vanno bene acquisti reali, anche online."
      },
      {
        "q": "La carta Revolut ha costi?",
        "a": "La carta Standard è gratuita, spedizione inclusa. Puoi usare anche la carta virtuale per le spese."
      },
      {
        "q": "Quando arriva il bonus Revolut?",
        "a": "Entro circa 2 giorni lavorativi dopo aver completato le 3 spese richieste."
      }
    ],
    "codice_box": false,
    "seo_title": "Bonus Revolut 15€ (codice referral) — guida 2026 | GoatLink",
    "scadenza_etichetta": "A tempo indeterminato"
  },
  {
    "slug": "bbva",
    "capitale": 0,
    "name": "BBVA",
    "category": "Banca",
    "logo": "logos/bbva.png",
    "amount": 10,
    "currency": "€",
    "amountLabel": "10€",
    "minutes": 10,
    "difficulty": "Facile",
    "badge": "Consigliato per iniziare",
    "payout": "Pagato in pochi giorni",
    "deposit": "1 spesa di qualsiasi importo",
    "expires": null,
    "updated": "2026-10-04",
    "featured": false,
    "countInTotal": true,
    "source": "https://www.bbva.it/persone/promozioni.html",
    "summary": "Scarica l'app, inserisci il codice promo Passaparola e fai una spesa di qualsiasi importo. 10€ in genere entro pochi giorni lavorativi.",
    "code": null,
    "steps": [
      "Scarica l'app BBVA.",
      "Al quarto passaggio inserisci il codice promo.",
      "Accetta i termini della promo <strong>Passaparola</strong>.",
      "Ricarica il conto e fai una spesa di qualsiasi importo. <strong>Non valgono</strong> conti gioco e scommesse, ricariche e buoni regalo.",
      "Se Apple Pay non si attiva subito, usa la carta manualmente la prima volta.",
      "Ricevi <strong>10€</strong>, in genere entro pochi giorni lavorativi."
    ],
    "rules_ok": [
      "Cumulabile con il <strong>cashback 4%</strong>: fino a 50€ complessivi, calcolato sui primi 210€ di acquisti di ogni mese per i primi 6 mesi dal primo acquisto. Il conto va sottoscritto entro l'<strong>11/12/2026</strong>.",
      "Il conto è remunerato al <strong>4% lordo per i primi 6 mesi</strong> fino a 200.000€ (2,10% oltre), se lo sottoscrivi entro l'11/12/2026. Dopo, il tasso diventa variabile ogni trimestre ed è agganciato a quello BCE.",
      "Bonifici e operazioni gratuiti, PagoPA, CBILL, F24, bollo auto",
      "Se Apple Pay non si attiva subito, usa la carta manualmente la prima volta"
    ],
    "why": "La più facile del sito: una spesa qualsiasi, senza soglie, e il bonus arriva in pochi giorni.",
    "pros": [
      "Nessun importo minimo di spesa",
      "Cumulabile con il cashback 4%",
      "Bonifici e F24 gratuiti"
    ],
    "faq": [
      {
        "q": "Come funziona il bonus BBVA da 10€?",
        "a": "Scarica l'app, inserisci il codice promo Passaparola al quarto passaggio, accetta i termini e fai una spesa di qualsiasi importo. Ricevi 10€, in genere entro pochi giorni lavorativi."
      },
      {
        "q": "Quali spese non valgono per il bonus BBVA?",
        "a": "Conti gioco, scommesse, ricariche e buoni regalo non sono considerate spese valide."
      },
      {
        "q": "Il conto BBVA è gratuito?",
        "a": "Sì, con numerose operazioni gratuite incluse come bonifici, PagoPA, CBILL, F24 e bollo auto."
      }
    ],
    "codice_etichetta": "Codice amico / promo",
    "scadenza_etichetta": "A tempo indeterminato"
  },
  {
    "slug": "tinaba",
    "capitale": 20,
    "name": "Tinaba",
    "category": "Fintech",
    "logo": "logos/tinaba.png",
    "amount": 10,
    "currency": "€",
    "amountLabel": "10€",
    "minutes": 10,
    "difficulty": "Facile",
    "badge": null,
    "payout": "Bonus in 30 giorni",
    "deposit": "Ricarica min. 20€",
    "expires": "2026-09-15",
    "updated": "2026-10-04",
    "featured": false,
    "countInTotal": true,
    "source": null,
    "summary": "Registrati come nuovo utente, inserisci il codice referral e ricarica almeno 20€ entro 30 giorni. Bonus 10€ cumulabile con gli inviti.",
    "code": null,
    "steps": [
      "Scarica l'app Tinaba e registrati come <strong>nuovo utente</strong>: con un account già esistente la promo non parte.",
      "Inserisci il codice referral <strong>durante la registrazione</strong>: dopo non è più inseribile.",
      "Attiva il conto.",
      "Ricarica almeno <strong>20€</strong> entro 30 giorni dall'iscrizione. Non aspettare l'ultimo momento: le iniziative Tinaba hanno un montepremi e possono chiudere in anticipo una volta esaurito.",
      "Ricevi <strong>10€</strong> di bonus."
    ],
    "rules_ok": [
      "Bonus cumulabile: 20€ a te per ogni amico che inviti con il tuo codice"
    ],
    "why": "Dieci minuti dal divano, senza spendere niente: registrazione, codice, ricarica da 20€.",
    "pros": [
      "Nessuna spesa da fare",
      "Solo una ricarica da 20€",
      "Cumulabile con gli inviti"
    ],
    "faq": [
      {
        "q": "Come si ottiene il bonus Tinaba?",
        "a": "Registrati come nuovo utente, inserisci il codice referral durante la registrazione e ricarica almeno 20€ entro 30 giorni. Ricevi 10€."
      },
      {
        "q": "Il bonus Tinaba è cumulabile?",
        "a": "Sì. Oltre ai 10€ iniziali, guadagni altri 10€ per ogni amico che si iscrive con il tuo codice."
      }
    ],
    "rules_ko": [
      "Account già esistente (serve essere nuovo utente)",
      "Codice non inserito durante la registrazione"
    ],
    "cons": [
      "Importo base contenuto (10€)",
      "Il codice va inserito durante la registrazione",
      "Accredito fino a 30 giorni"
    ],
    "codice_etichetta": "Codice amico / promo"
  },
  {
    "slug": "isybank",
    "capitale": 0,
    "name": "Isybank",
    "category": "Banca",
    "logo": "logos/isybank.png",
    "amount": 30,
    "currency": "€",
    "amountLabel": "30€",
    "minutes": 10,
    "difficulty": "Facile",
    "badge": "Prorogata",
    "payout": "Gift card 30€ a scelta",
    "deposit": "Senza deposito",
    "expires": "2026-09-30",
    "updated": "2026-09-17",
    "featured": false,
    "countInTotal": true,
    "source": "https://www.isybank.com/it/landing/porta-un-amico.html",
    "summary": "Apri un nuovo Piano isybank col codice amico e aderisci a isyToken Collection. Ricevi 7.600 isyToken, pari a una gift card da 30€ a scelta (Amazon, Tezenis, Q8 e altre). Scadenza prorogata: il Piano va aperto entro il 30/09, il codice va inserito entro il 15/10.",
    "code": null,
    "steps": [
      "Scarica l'app isybank e apri un <strong>nuovo Piano valido</strong>: isyLight, isySmart o isyPrime. Il solo conto base, il Piano isyONe e la sola carta prepagata <strong>non valgono</strong>.",
      "Completa la richiesta di apertura entro il <strong>30/09/2026</strong>, scadenza prorogata rispetto al 15/09. L'iniziativa è per chi apre un nuovo Piano dal 15/06/2026: chi aveva già un Piano isybank prima di quella data è escluso.",
      "Entra nella sezione <strong>isyReward</strong> e aderisci a <strong>isyToken Collection</strong>.",
      "Inserisci il <strong>codice amico</strong> entro 15 giorni dall'apertura del Piano e comunque entro il <strong>15/10/2026</strong>. Sono due scadenze diverse: vale quella che scade prima.",
      "Ricevi <strong>7.600 isyToken</strong> e riscattali dal catalogo isyReward in una gift card da 30€ a scelta (Amazon, Tezenis, Q8, Calzedonia, UCI Cinemas e altre)."
    ],
    "rules_ok": [
      "Per ottenere i 7.600 isyToken bastano apertura del Piano + adesione a isyToken Collection + inserimento del codice: nessuna spesa minima né accredito stipendio richiesti.",
      "isyLight è gratuito ed è sufficiente per la promo.",
      "La richiesta di apertura va fatta entro il <strong>30/09</strong>, ma la conferma della banca che il Piano è attivo può arrivare dopo, purché entro il <strong>15/10</strong>: non ridurti all'ultimo giorno, perché quel passaggio non dipende da te.",
      "Fino ai 35 anni isyPrime è a canone zero con imposta di bollo pagata dalla banca.",
      "Anche chi invita riceve 7.600 isyToken per ogni amico valido, fino a 100 amici.",
      "Il codice amico te lo diamo su WhatsApp: scrivici e te lo passiamo."
    ],
    "why": "Non chiede né deposito né spesa minima: apri il Piano, metti il codice, prendi i token.",
    "pros": [
      "Nessuna spesa richiesta",
      "isyLight è gratuito e basta",
      "Struttura Intesa Sanpaolo"
    ],
    "faq": [
      {
        "q": "Come si ottengono i 30€ con Isybank?",
        "a": "Apri un nuovo Piano isybank valido (isyLight, isySmart o isyPrime), aderisci a isyToken Collection nella sezione isyReward e inserisci il codice amico entro 15 giorni dall'apertura e comunque entro il 15/10/2026. Ricevi 7.600 isyToken, riscattabili in una gift card da 30€ a scelta."
      },
      {
        "q": "Ricevo 30€ in contanti?",
        "a": "No. isybank è un'operazione a premi: si ricevono 7.600 isyToken (punti), che dal catalogo isyReward valgono una gift card da 30€ a scelta tra Amazon, Tezenis, Q8, Calzedonia, UCI Cinemas e altre. Non è denaro contante. I premi sono soggetti a disponibilità."
      },
      {
        "q": "Serve un deposito o l'accredito dello stipendio?",
        "a": "No. Per ottenere i 7.600 isyToken bastano l'apertura del Piano, l'adesione a isyToken Collection e l'inserimento del codice amico: nessuna spesa minima né accredito stipendio richiesti per questa parte."
      },
      {
        "q": "Chi è escluso dalla promo Isybank?",
        "a": "Chi è già titolare di un Piano isybank aperto prima del 15/06/2026 e chi apre solo il conto base o il Piano isyONe, che non sono validi per l'iniziativa."
      }
    ],
    "sezioni_prima": [
      {
        "titolo": "Come funzionano gli isyToken",
        "html": "<p class=\"g-verdict-txt\">isybank, la banca digitale del gruppo Intesa Sanpaolo, premia i nuovi clienti tramite <strong>isyToken Collection</strong>: un'operazione a premi in cui accumuli punti (gli <strong>isyToken</strong>) da riscattare a catalogo. Aprendo un nuovo Piano col codice amico ottieni <strong>7.600 isyToken</strong>. Dal catalogo ufficiale isyReward, 7.600 isyToken valgono una <strong>gift card da 30€ a scelta</strong>: Amazon, Tezenis, Q8 carburante, Calzedonia, Intimissimi, UCI Cinemas e altre. Non si tratta quindi di 30€ in contanti, ma di un premio del valore di 30€ che scegli tu dal catalogo. Anche tu, una volta dentro, puoi invitare altri e ricevere 7.600 isyToken per ogni amico valido, fino a 100 amici.</p>"
      }
    ],
    "cta": "Ricevi il codice amico su WhatsApp →",
    "cta_nota": "Il premio è erogato direttamente da isybank tramite isyToken Collection. GoatLink non chiede alcun pagamento."
  },
  {
    "slug": "trading212",
    "capitale": 10,
    "name": "Trading 212",
    "category": "Trading",
    "logo": "logos/trading212.png",
    "emoji": "📊",
    "amount": 8,
    "currency": "€",
    "amountLabel": "8€–100€",
    "minutes": 15,
    "difficulty": "Facile",
    "badge": "Nuova edizione",
    "payout": "Azione entro 3 giorni lavorativi",
    "deposit": "Deposito min. 10€",
    "expires": "2026-11-03",
    "updated": "2026-09-23",
    "featured": false,
    "countInTotal": false,
    "source": "https://helpcentre.trading212.com/hc/en-us/articles/360007291258-Invite-Your-Friends-Get-Free-Fractional-Shares",
    "summary": "È tornata: apri un conto Invest dal link di un amico entro il <strong>3 novembre</strong>, verifica l'identità e deposita entro 10 giorni. Ricevi un'azione scelta a caso che vale da 8€ a 100€.",
    "code": null,
    "steps": [
      "Procurati il <strong>link di invito</strong>. Lo può dare solo chi ha già un conto Trading 212 Invest: scrivici su WhatsApp e te lo passiamo in privato.",
      "Registrati dal link e apri il <strong>conto Invest</strong>: è l'<strong>unico conto valido</strong> per il bonus. Con il conto CFD o altri tipi di conto l'azione non arriva.",
      "Completa la <strong>verifica dell'identità</strong>.",
      "Deposita almeno <strong>10€ entro 10 giorni</strong> dalla creazione del conto.",
      "Entro <strong>3 giorni lavorativi</strong> ricevi l'azione premio, scelta a caso con un valore fra 8€ e 100€.",
      "Puoi venderla subito. Il contante che ne ricavi si preleva dopo <strong>30 giorni</strong> dall'accredito."
    ],
    "rules_ok": [
      "La campagna «Invita un amico» è attiva dal <strong>21/09/2026 al 03/11/2026</strong>. Il conto va aperto dentro queste date.",
      "L'azione è gratis: il suo valore può salire o scendere, ma riscattarla non ti fa perdere niente.",
      "Il deposito resta tuo. Il blocco di 30 giorni riguarda solo il valore dell'azione premio.",
      "Se ti sei registrato senza passare dal link, puoi ancora partecipare inserendo l'ID di invito dal menu dei codici promozionali, subito dopo l'apertura del conto.",
      "Anche chi ti invita riceve un'azione, fino a 5 per campagna. Te lo diciamo perché è giusto tu lo sappia: non cambia niente di quello che prendi tu."
    ],
    "rules_ko": [
      "<strong>Solo nuovi clienti.</strong> Se hai già avuto un conto Invest su Trading 212 non partecipi.",
      "<strong>Solo conto Invest.</strong> È l'unico conto da aprire per il bonus: CFD e altri tipi di conto non danno diritto all'azione.",
      "<strong>10 giorni e basta.</strong> Verifica e deposito vanno chiusi entro 10 giorni dalla creazione del conto: se sfori, l'azione non arriva.",
      "Il deposito minimo lo fissa Trading 212 paese per paese. Prima di depositare controlla la cifra nella sezione delle azioni gratuite del menu ☰.",
      "I 100€ sono il tetto, non quello che ti aspetta. Il valore è estratto a caso: ragiona sugli 8€ e considera il resto fortuna.",
      "Vendere l'azione non accorcia il blocco: il contante resta fermo 30 giorni dall'accredito in ogni caso.",
      "Il regolamento lascia a te ogni implicazione fiscale del premio."
    ],
    "seo_title": "Bonus Trading 212: azione gratis da 8€ a 100€ (Invita un amico) — guida 2026 | GoatLink",
    "faq": [
      {
        "q": "Quanto vale il bonus Trading 212?",
        "a": "Un'azione frazionata gratuita scelta a caso, con un valore fra 8€ e 100€. La ricevi tu che apri il conto e ne riceve una anche chi ti ha invitato."
      },
      {
        "q": "Entro quando devo aprire il conto?",
        "a": "La campagna in corso va dal <strong>21 settembre al 3 novembre 2026</strong>. Da quando crei il conto hai poi 10 giorni per completare verifica e deposito."
      },
      {
        "q": "Quanto devo depositare?",
        "a": "Il minimo lo decide Trading 212 per ogni paese e lo trovi in app, nella sezione delle azioni gratuite: controllalo prima di depositare. Il deposito resta tuo e lo puoi usare come vuoi."
      },
      {
        "q": "Quando arriva l'azione e quando posso prelevarla?",
        "a": "Entro 3 giorni lavorativi da quando hai verificato il conto e fatto il deposito. Puoi venderla subito, ma il contante si preleva solo dopo 30 giorni dall'accredito, anche se vendi prima."
      },
      {
        "q": "Posso perdere soldi?",
        "a": "Con l'azione premio no: è gratis, e anche se il suo valore scende non ci rimetti. Se invece usi il deposito per comprare altro, quello è un investimento vero e il rischio di mercato è tuo."
      },
      {
        "q": "Mi sono registrato senza il link, ho perso il bonus?",
        "a": "Non per forza. Subito dopo l'apertura del conto puoi inserire l'ID di invito dal menu dei codici promozionali. È la stessa strada che Trading 212 indica quando il link non ha funzionato."
      },
      {
        "q": "Dove trovo un link di invito?",
        "a": "Te lo dà una persona che ha già un conto Trading 212 Invest. Sul sito non ne pubblichiamo nessuno: scrivici su WhatsApp e te lo passiamo in privato."
      },
      {
        "q": "Perché la promo a volte sparisce?",
        "a": "Trading 212 lavora a campagne con date di inizio e fine. Fra una campagna e l'altra i link di invito non danno nessun premio, poi la promo riparte con regole e date nuove."
      }
    ],
    "why": "Chiede solo un piccolo deposito, che resta tuo, e pochi minuti da telefono. In cambio il premio è un'estrazione fra 8€ e 100€ e il contante resta fermo 30 giorni.",
    "pros": [
      "Deposito minimo, e resta tuo",
      "Azione in 3 giorni lavorativi",
      "Vendibile subito",
      "Nessuna spesa con carta",
      "Pochi minuti da telefono"
    ]
  },
  {
    "slug": "myfin",
    "capitale": 11,
    "name": "MyFin",
    "category": "Fintech",
    "logo": null,
    "emoji": "💳",
    "amount": 10,
    "currency": "€",
    "amountLabel": "10€",
    "minutes": 15,
    "difficulty": "Facile",
    "badge": "Ultimi giorni",
    "payout": "Sul conto entro 72 ore",
    "deposit": "Spesa con carta oltre 10€",
    "expires": "2026-09-30",
    "updated": "2026-09-25",
    "featured": false,
    "countInTotal": true,
    "source": "https://www.myfin.bg/docs/en/referral.pdf",
    "seo_title": "Bonus MyFin 10€ (codice amico) — guida 2026 | GoatLink",
    "summary": "Registrati su MyFin con il codice di un amico entro il <strong>30 settembre</strong>, verifica l'identità e paga con la carta virtuale un acquisto sopra i 10€. Ricevi 10€ sul conto entro 72 ore.",
    "code": null,
    "steps": [
      "Procurati il <strong>codice invito</strong>. Lo può dare solo chi ha già un conto MyFin: scrivici su WhatsApp e te lo passiamo in privato.",
      "Scarica l'app MyFin e registrati inserendo il <strong>codice</strong>. Il piano Standard è gratuito e per il bonus basta.",
      "Completa la <strong>verifica dell'identità</strong> con un documento. Può richiedere qualche ora e non arriva sempre una notifica: se riesci a caricare il conto, la verifica è passata.",
      "Crea la <strong>carta virtuale</strong>, gratuita, e carica sul conto almeno <strong>11€</strong> da un altro conto tuo.",
      "Paga con la carta MyFin un <strong>acquisto sopra i 10€</strong> da un negozio, online o in fisico. Per esempio un buono regalo da 11€.",
      "Ricevi <strong>10€</strong> sul conto MyFin entro <strong>72 ore</strong> dal completamento dei passaggi."
    ],
    "rules_ok": [
      "La campagna «Invite a Friend» è attiva dal <strong>01/09/2026 al 30/09/2026</strong>. Registrazione, verifica e acquisto vanno chiusi dentro queste date.",
      "L'acquisto non è una spesa persa: compri una cosa che ti serve o un buono che userai.",
      "I 10€ arrivano sul conto a tuo nome: li puoi spendere con la carta o trasferire su un altro conto.",
      "Anche chi ti invita riceve 10€. Te lo diciamo perché è giusto tu lo sappia: non cambia niente di quello che prendi tu."
    ],
    "rules_ko": [
      "<strong>Solo il primo profilo.</strong> Il bonus spetta una volta sola, sul primo profilo registrato e verificato.",
      "<strong>Ricariche e depositi non valgono.</strong> Ricaricare un altro conto o un wallet con la carta MyFin (Trading 212, Revolut, PayPal e simili) non conta come acquisto. Lo stesso per money transfer, prelievi e siti di scommesse.",
      "<strong>Serve un acquisto vero.</strong> Conta solo il pagamento di beni o servizi a un esercente. In caso di contestazione MyFin può chiederti la fattura o la ricevuta: conservala.",
      "<strong>Sopra i 10€, non 10€.</strong> Il regolamento chiede un importo maggiore di 10€: con 10€ esatti rischi di restare fuori.",
      "Sul piano Standard un bonifico SEPA in uscita costa 0,28€: tienine conto se vuoi spostare i 10€ altrove."
    ],
    "faq": [
      {
        "q": "Quanto vale il bonus MyFin?",
        "a": "10€ sul conto MyFin, a te che ti registri con il codice. Ne riceve 10 anche chi ti ha invitato."
      },
      {
        "q": "Entro quando devo fare tutto?",
        "a": "La campagna in corso va dal <strong>1° al 30 settembre 2026</strong>. Registrazione, verifica e acquisto vanno chiusi entro il 30."
      },
      {
        "q": "Posso usare il deposito su Trading 212 come spesa?",
        "a": "No. Il regolamento esclude le ricariche di altri conti e wallet fatte con la carta MyFin, compresi i depositi su broker e app di pagamento. Serve un acquisto di beni o servizi da un negozio."
      },
      {
        "q": "Che acquisto posso fare?",
        "a": "Qualsiasi pagamento sopra i 10€ a un esercente, online o in negozio: una spesa che dovevi comunque fare o un buono regalo. Tieni la ricevuta."
      },
      {
        "q": "Quanto costa MyFin?",
        "a": "Il piano Standard è gratuito e comprende una carta virtuale. Paghi solo alcune operazioni, per esempio 0,28€ per un bonifico SEPA in uscita."
      },
      {
        "q": "Dove trovo un codice invito?",
        "a": "Te lo dà una persona che ha già un conto MyFin. Sul sito non ne pubblichiamo nessuno: scrivici su WhatsApp e te lo passiamo in privato."
      },
      {
        "q": "Perché la promo a volte sparisce?",
        "a": "MyFin lavora a campagne mensili con date di inizio e fine. Fra una campagna e l'altra il codice non dà nessun premio, poi la promo riparte con regole e date nuove."
      }
    ],
    "why": "Conto gratuito con carta virtuale, e il bonus arriva in 72 ore. Ti chiede solo un acquisto sopra i 10€ che puoi comunque usare.",
    "pros": [
      "Piano Standard gratuito",
      "Carta virtuale inclusa",
      "Bonus in 72 ore",
      "Nessun deposito da immobilizzare"
    ],
    "cta": "Ricevi il codice ufficiale su WhatsApp →"
  }
];

function bonusStatus(b){
  if(!b.expires) return "active";
  return new Date(b.expires + "T23:59:59") >= TODAY ? "active" : "expired";
}

// Maggiorazioni a tempo: finche' la data non e' passata vale l'importo
// maggiorato, dopo il catalogo torna da solo a quello base. Nessuno deve
// ricordarsi di cambiarlo a mano.
BONUSES.forEach(function(b){
  if (b.boost && bonusStatus({ expires: b.boost.until }) === "active") {
    b.amount = b.boost.amount;
    b.amountLabel = b.boost.amountLabel;
    if (b.boost.badge) b.badge = b.boost.badge;
  }
});

// Promo che un nuovo cliente puo' ancora ottenere.
function activeBonuses(){
  return BONUSES.filter(b => bonusStatus(b) === "active");
}

function activeCount(){
  return activeBonuses().length;
}

// Totale onesto: esclude importi variabili e promo che chiedono di immobilizzare
// capitale. Il flag countInTotal e' l'unica regola: la home non ne applica altre.
function countedBonuses(){
  return activeBonuses().filter(b => b.countInTotal);
}

function totalGuaranteed(){
  return countedBonuses().reduce((s,b) => s + b.amount, 0);
}

if (typeof window !== "undefined") {
  window.BONUSES = BONUSES;
  window.bonusStatus = bonusStatus;
  window.activeBonuses = activeBonuses;
  window.activeCount = activeCount;
  window.countedBonuses = countedBonuses;
  window.totalGuaranteed = totalGuaranteed;
}

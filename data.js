// ============================================================
// GoatLink — dati bonus
// Aggiornato il 5 agosto 2026.
//
// ATTENZIONE: index.html contiene una PROPRIA copia di questo array,
// incorporata nel tag <script> in fondo alla pagina. Le due copie
// erano andate fuori sincrono. Se modifichi qui, modifica anche lì
// — oppure, meglio, cancella l'array da index.html e aggiungi
// <script src="data.js"></script> prima dello script della pagina.
// ============================================================

const TODAY = new Date();

const BONUSES = [
  {
    "slug": "bitpanda",
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
    "summary": "Registrati dall'invito, completa il KYC, deposita 50€ e fai un acquisto idoneo da almeno 50€ dal Broker. Ricevi 15€. Anche chi invita riceve 15€ per ogni amico valido.",
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
      "Inviti: 15€ a te e 15€ all'amico per ogni amico valido."
    ],
    "rules_ko": [
      "Operazioni non valide: swap tra asset, Bitpanda Fusion, Leverage, Margin Trading, Cash Plus",
      "Non essere un nuovo utente Bitpanda",
      "Account doppi o registrazioni anomale",
      "Promozione terminata il 25/06/2026"
    ]
  },
  {
    "slug": "creditagricole",
    "name": "Crédit Agricole",
    "category": "Banca",
    "logo": "logos/creditagricole.png",
    "emoji": "🏦",
    "amount": 50,
    "currency": "€",
    "amountLabel": "50€",
    "minutes": 15,
    "difficulty": "Facile",
    "badge": "In scadenza",
    "payout": "Buono Regalo Amazon.it",
    "deposit": "1 transazione + carta Visa",
    "expires": "2026-08-31",
    "updated": "2026-08-05",
    "featured": true,
    "countInTotal": true,
    "source": "https://www.credit-agricole.it/privati/conti/promozioni",
    "summary": "Nuova edizione lanciata il 31/07/2026. Apri il Conto Online con la carta di debito Visa entro il 31/08 e ricevi 50€ in Buono Regalo Amazon.it. Ci sono scaglioni aggiuntivi legati allo stipendio e all'uso della carta.",
    "code": null,
    "steps": [
      "Apri il <strong>Conto Online Crédit Agricole</strong> dall'invito e inserisci il codice promozionale nel form di apertura.",
      "Completa la <strong>richiesta di apertura</strong> del conto e della <strong>Carta Visa Debit</strong> entro il <strong>31/08/2026</strong>.",
      "Attiva transazioni online e 3D Secure (servono le credenziali che arrivano per posta).",
      "Fai almeno <strong>1 transazione</strong> di qualsiasi importo con la carta.",
      "Ricevi <strong>50€ in Buono Regalo Amazon.it</strong>."
    ],
    "rules_ok": [
      "L'operazione a premi «Invita un amico in Crédit Agricole – Agosto 2026» è valida dal 31/07 al 31/10/2026, ma la finestra per chiedere l'apertura del conto si chiude il <strong>31/08</strong>.",
      "La Carta Visa Debit è obbligatoria: sceglila in fase di apertura.",
      "Esistono scaglioni aggiuntivi: +100€ con accredito stipendio o pensione e fino a +100€ in base all'utilizzo della carta. Importi e tempistiche nel regolamento ufficiale dell'edizione di agosto.",
      "Se accrediti lo stipendio, il bonifico deve avere <strong>causale ABI 27, SALA o PENS</strong>: con una causale generica la banca non lo riconosce."
    ],
    "rules_ko": [
      "Aprire senza inserire il codice nel form (il bonus potrebbe non essere riconosciuto)",
      "Aprire il conto senza sottoscrivere la carta di debito Visa",
      "Completare la richiesta dopo il 31/08/2026",
      "Contare prelievi o spese stornate/annullate come transazione valida",
      "Non essere un nuovo correntista del Gruppo Crédit Agricole Italia"
    ]
  },
  {
    "slug": "ing",
    "name": "ING",
    "category": "Banca",
    "logo": "logos/ing.png",
    "emoji": "🦁",
    "amount": 100,
    "currency": "€",
    "amountLabel": "100€",
    "minutes": 15,
    "difficulty": "Facile",
    "badge": "Bonus più alto",
    "payout": "Cashback entro il 30/11/2026",
    "deposit": "Conto + carta, spesa 300€",
    "expires": "2026-09-07",
    "updated": "2026-08-05",
    "featured": true,
    "countInTotal": true,
    "source": "https://www.ing.it/conto-corrente-arancio/conto-corrente-online.html",
    "summary": "Apri il Conto Corrente Arancio Più entro il 07/09 con il codice WELCOME, richiedi una carta e spendi 300€ entro il 30/11. 100€ di cashback, nessun deposito da lasciare fermo.",
    "code": "WELCOME",
    "steps": [
      "Apri il <strong>Conto Corrente Arancio Più</strong> dal sito ing.it entro il <strong>07/09/2026</strong>.",
      "Dopo i dati personali compare il campo «codice promozionale»: inserisci <strong>WELCOME</strong>. Non si può aggiungere dopo.",
      "Richiedi la <strong>carta di debito o di credito</strong> entro il 07/09, durante l'apertura oppure dopo dall'Area Riservata.",
      "Spendi almeno <strong>300€</strong> con la carta entro il <strong>30/11/2026</strong>, in una o più volte, anche con Apple Pay o Google Pay.",
      "Ricevi <strong>100€ di cashback</strong> sul conto."
    ],
    "rules_ok": [
      "Vale anche se sei già cliente ING, purché tu non abbia mai avuto un Conto Corrente Arancio.",
      "Se hai chiesto entrambe le carte, i 300€ si raggiungono anche a metà tra debito e credito.",
      "Canone 5€/mese azzerato con stipendio, entrate da 1.000€/mese o under 30. I primi 3 mesi sono gratis comunque.",
      "Carte Mastercard a canone zero, bonifici SEPA anche istantanei, F24, MAV, RAV, CBILL, pagoPA e prelievi a 0€.",
      "La carta di debito arriva subito in versione digitale: la usi mentre aspetti quella fisica."
    ],
    "rules_ko": [
      "Aprire il <strong>Conto Corrente Arancio Light</strong>: non è valido per la promo, serve il Più",
      "Dimenticare il codice WELCOME durante l'apertura (non è recuperabile dopo)",
      "Richiedere la carta dopo il 07/09/2026",
      "Fermarsi sotto i 300€ di spesa entro il 30/11/2026",
      "I depositi sono garantiti dal sistema olandese, non dal FITD italiano: stessa copertura di 100.000€, fondo diverso"
    ]
  },
  {
    "slug": "fineco",
    "name": "Fineco",
    "category": "Banca",
    "logo": "logos/fineco.png",
    "emoji": "🏦",
    "amount": 50,
    "currency": "€",
    "amountLabel": "50€",
    "minutes": 15,
    "difficulty": "Impegnativo",
    "badge": null,
    "payout": "Conferma da novembre",
    "deposit": "5 operazioni di trading",
    "expires": "2026-07-14",
    "updated": "2026-07-01",
    "featured": false,
    "countInTotal": false,
    "source": null,
    "summary": "Apri un nuovo conto Fineco col codice amico e fai 5 operazioni di trading entro il 31/08. 50€ di bonus. Promozione chiusa il 14/07/2026.",
    "code": null,
    "steps": [
      "Apri un nuovo conto Fineco e inserisci il codice amico durante l'iscrizione.",
      "Completa l'apertura del conto entro il <strong>14/07/2026</strong>.",
      "Entra nella sezione trading una volta attivato il conto.",
      "Fai <strong>5 operazioni di trading</strong> entro il <strong>31/08/2026</strong>.",
      "Da <strong>02/11/2026</strong> conferma il bonus nell'area riservata, entro il 30/11/2026.",
      "Ricevi 50€ al netto della ritenuta del 26%."
    ],
    "rules_ok": [
      "Oltre ai 5 trade, il regolamento ammette anche altre 3 strade (basta una sola): accredito stipendio/pensione entro il 31/08, versamento di 20.000€ mantenuto fino al 30/09, oppure spesa con carta per 2.500€ entro il 31/08.",
      "Le operazioni vanno fatte a mercato aperto, in giorni lavorativi, su titoli quotati sui mercati ammessi (Italia, USA, Canada, Germania, Francia).",
      "Dopo l'apertura puoi invitare altri: 50€ per amico valido, fino a 20 inviti l'anno (max 1.000€ annui)."
    ],
    "rules_ko": [
      "Aprire il conto senza il codice amico corretto (il bonus potrebbe non essere riconosciuto)",
      "Provare le operazioni a mercato chiuso o su strumenti esclusi come CFD",
      "Dimenticare di confermare il bonus entro il 30/11/2026",
      "Promozione chiusa: la finestra di apertura si è chiusa il 14/07/2026"
    ]
  },
  {
    "slug": "buddybank",
    "name": "Buddybank",
    "category": "Banca",
    "logo": "logos/buddybank.png",
    "amount": 50,
    "currency": "€",
    "amountLabel": "50€",
    "minutes": 10,
    "difficulty": "Facile",
    "badge": "Prorogata",
    "payout": "Entro 90 giorni lavorativi",
    "deposit": "Pagamento da 10€",
    "expires": "2027-01-20",
    "updated": "2026-08-05",
    "featured": true,
    "countInTotal": true,
    "source": "https://www.buddy.unicredit.it/tutti-prodotti/conto-genius-buddy/",
    "summary": "Apri il conto Genius buddy o la carta Genius Pay, inserisci il codice amico e spendi almeno 10€ con la carta. 50€ entro 90 giorni lavorativi. Non è scaduta a luglio: è prorogata al 20/01/2027.",
    "code": null,
    "steps": [
      "Richiedi la carta di debito <strong>MyOne</strong> e seleziona <strong>solo digitale</strong>.",
      "Inserisci <strong>subito</strong> il codice amico (non potrai inserirlo dopo).",
      "Completa l'apertura del conto.",
      "Entro 30 giorni spendi almeno <strong>10€</strong> con la carta MyOne o la Genius Pay.",
      "Ricevi 50€ entro 90 giorni lavorativi dalla transazione valida."
    ],
    "rules_ok": [
      "La promo vale sia sul conto <strong>Genius buddy</strong> sia sulla carta ricaricabile <strong>Genius Pay</strong>.",
      "Online: scegli «carta di debito/credito» e inserisci i dati della carta. Deve comparire «Mastercard + ultime 4 cifre».",
      "Il regolamento accetta una o più transazioni per un totale di almeno 10€, ma un pagamento unico da 10€ è la strada più sicura.",
      "Al momento dell'accredito il saldo disponibile deve essere ≥ 0: non svuotare il conto mentre aspetti il bonus.",
      "In più c'è la promo <strong>«Remunerazione conto buddy 4%»</strong>: 4% lordo sulla giacenza media fino a 50.000€ fino al 31/12/2026, ma il conto va aperto entro il <strong>31/08/2026</strong>."
    ],
    "rules_ko": [
      "Pagamenti con IBAN, bonifici o giroconti",
      "Ricariche verso altre carte o ricariche telefoniche da app",
      "Siti di scommesse o gioco",
      "Fare la spesa all'ultimo giorno utile: per i controlli fa fede la data valuta",
      "Il 4% è riservato a chi al <strong>31/05/2026</strong> non era già titolare di alcun rapporto con la Banca"
    ]
  },
  {
    "slug": "bybit",
    "name": "Bybit",
    "category": "Crypto",
    "logo": "logos/bybit.png",
    "amount": 45,
    "currency": "€",
    "amountLabel": "fino a 45€",
    "minutes": 15,
    "difficulty": "Medio",
    "badge": null,
    "payout": "Pagato in 2–7 giorni",
    "deposit": "Deposito min. 100€",
    "expires": null,
    "updated": "2026-08-05",
    "featured": false,
    "countInTotal": false,
    "source": null,
    "summary": "Registrati, completa il KYC e deposita almeno 100€ sul conto Spot. Bonus fino a 45€ accreditato nel Rewards Hub entro 2–7 giorni.",
    "code": null,
    "steps": [
      "Registrati tramite il link dedicato (usa l'email che userai sempre).",
      "Completa la verifica identità (KYC): documento + selfie, 5–10 minuti.",
      "Deposita almeno <strong>100€ sul conto Spot</strong> entro 7 giorni (bonifico SEPA gratuito o carta).",
      "Non spostare i fondi tra sotto-conti e non prelevare durante l'attesa.",
      "Ricevi il bonus entro 2–7 giorni nel <strong>Rewards Hub</strong> (icona regalo)."
    ],
    "rules_ok": [
      "L'entità con cui apri il conto è <strong>Bybit EU</strong>, autorizzata MiCA dall'autorità austriaca (FMA) e operativa in Italia in passaporto europeo: è un soggetto diverso da Bybit globale.",
      "Dopo aver ricevuto il bonus puoi prelevare liberamente"
    ],
    "rules_ko": [
      "Depositare su Derivatives o Earn invece che su Spot",
      "Trasferire fondi tra sotto-conti (invalida il bonus)",
      "Prelevare il deposito prima di ricevere il bonus",
      "Le cripto-attività non hanno un fondo di garanzia tipo FITD: il rischio di mercato sui 100€ resta tuo"
    ]
  },
  {
    "slug": "coinbase",
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
    "updated": "2026-08-05",
    "featured": false,
    "countInTotal": true,
    "source": null,
    "summary": "Nuovo utente: iscriviti, completa il KYC, deposita almeno 21€ e fai un trade da almeno 21€ entro 90 giorni. Bonus 20€ in Bitcoin.",
    "code": null,
    "steps": [
      "Iscriviti come <strong>nuovo utente</strong> tramite il link ufficiale.",
      "Completa la verifica identità (KYC).",
      "Deposita almeno 21€ (consigliati 22–23€ per coprire le commissioni).",
      "Fai un trade da almeno 21€ entro 90 giorni — <strong>solo su Coinbase base</strong>, non Advanced né Prime.",
      "Bonus in arrivo entro 15–30 giorni."
    ],
    "rules_ok": [
      "Esempio valido: deposita 22€, compra 21€ di BTC, poi rivendili.",
      "Coinbase One è gratis la prima settimana e azzera le commissioni (ricordati di disdire entro 7 giorni).",
      "L'Italia è tra i paesi idonei sia per chi invita sia per chi viene invitato."
    ],
    "rules_ko": [
      "Account multipli — Coinbase verifica tutto e blocca i bonus",
      "Operazioni su Advanced o Prime (non valide)",
      "Il bonus arriva <strong>in Bitcoin</strong>: il valore oscilla finché non lo vendi, e le commissioni di deposito (circa 1–1,50€) riducono il netto",
      "Le offerte «gira la ruota» e i bonus fino a 200$ che trovi in giro sono riservati agli Stati Uniti e non sono cumulabili con il programma di invito"
    ]
  },
  {
    "slug": "revolut",
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
      "Registrati tramite il link referral (obbligatorio).",
      "Inserisci il numero di telefono nella prima schermata.",
      "Completa la verifica identità (documento + selfie).",
      "Ordina la carta <strong>Standard gratuita</strong> e attivala all'arrivo.",
      "Fai almeno <strong>3 spese da 5€</strong> ciascuna entro 30 giorni.",
      "Ricevi 15€ entro 2 giorni lavorativi."
    ],
    "rules_ok": [
      "Va bene sia la carta fisica che quella virtuale, anche acquisti online",
      "Esempi: 3 caffè al bar, piccola spesa, acquisti su Amazon in giorni diversi"
    ],
    "rules_ko": [
      "Gioco d'azzardo e scommesse",
      "Acquisto di gift card o buoni",
      "Trasferimenti, cambio valuta, prelievi ATM",
      "Annullare gli acquisti dopo averli fatti (Revolut può stornare il bonus)",
      "Revolut ruota le campagne ogni poche settimane e gli importi cambiano: verifica sempre l'offerta sulla pagina che si apre dal link prima di iniziare"
    ]
  },
  {
    "slug": "bbva",
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
    "updated": "2026-08-05",
    "featured": false,
    "countInTotal": true,
    "source": "https://www.bbva.it/persone/promozioni.html",
    "summary": "Scarica l'app, inserisci il codice promo Passaparola e fai una spesa di qualsiasi importo. 10€ in genere entro pochi giorni lavorativi.",
    "code": null,
    "steps": [
      "Scarica l'app BBVA.",
      "Al quarto passaggio inserisci il codice promo.",
      "Accetta i termini della promo <strong>Passaparola</strong>.",
      "Ricarica il conto e fai una spesa di qualsiasi importo.",
      "Ricevi 10€, in genere entro pochi giorni lavorativi."
    ],
    "rules_ok": [
      "Cumulabile con il <strong>cashback 3%</strong>: fino a 50€ complessivi, calcolato sui primi 280€ di acquisti di ogni mese per i primi 6 mesi. Il conto va sottoscritto entro il <strong>30/09/2026</strong>.",
      "Il conto è remunerato al <strong>3% lordo per i primi 6 mesi</strong> fino a 200.000€. Dopo, il tasso è agganciato alla BCE: nel trimestre in corso è garantito lo 0,60%, con maggiorazioni se accrediti lo stipendio o superi certe soglie di saldo.",
      "Bonifici e operazioni gratuiti, PagoPA, CBILL, F24, bollo auto",
      "Se Apple Pay non si attiva subito, usa la carta manualmente la prima volta"
    ],
    "rules_ko": [
      "Conti gioco, scommesse, ricariche o buoni regalo",
      "Pensare che il 3% sia il tasso del conto: dura sei mesi, poi scende"
    ]
  },
  {
    "slug": "tinaba",
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
    "expires": null,
    "updated": "2026-08-05",
    "featured": false,
    "countInTotal": true,
    "source": null,
    "summary": "Registrati come nuovo utente, inserisci il codice referral e ricarica almeno 20€ entro 30 giorni. Bonus 10€ cumulabile con gli inviti.",
    "code": null,
    "steps": [
      "Scarica l'app Tinaba e registrati come nuovo utente.",
      "Inserisci il codice referral durante la registrazione.",
      "Attiva il conto.",
      "Ricarica almeno 20€ entro 30 giorni dall'iscrizione.",
      "Ricevi 10€ di bonus."
    ],
    "rules_ok": [
      "Bonus cumulabile: 20€ a te per ogni amico che inviti con il tuo codice"
    ],
    "rules_ko": [
      "Account già esistente (serve essere nuovo utente)",
      "Codice non inserito durante la registrazione",
      "Le iniziative Tinaba hanno un montepremi: possono chiudersi in anticipo rispetto alla data annunciata, una volta esaurito"
    ]
  },
  {
    "slug": "bitstack",
    "name": "Bitstack",
    "category": "Crypto",
    "logo": "logos/bitstack.png",
    "emoji": "₿",
    "amount": 5,
    "currency": "€",
    "amountLabel": "5€ in BTC",
    "minutes": 10,
    "difficulty": "Medio",
    "badge": null,
    "payout": "Accredito app in 7 giorni",
    "deposit": "Acquisto min. 100€",
    "expires": null,
    "updated": "2026-08-05",
    "featured": false,
    "countInTotal": false,
    "source": "https://bitstack-app.com/it/",
    "summary": "Iscriviti col link referral e acquista almeno 100€ di BTC entro 180 giorni. 5€ in Bitcoin accreditati dall'app entro 7 giorni lavorativi.",
    "code": null,
    "steps": [
      "Scarica l'app Bitstack (iOS / Android).",
      "Registrati tramite il link dedicato (obbligatorio).",
      "Completa la verifica identità (KYC): documento + selfie.",
      "Acquista almeno <strong>100€ di BTC</strong> entro 180 giorni (anche con piccoli acquisti ricorrenti).",
      "Ricevi 5€ in BTC dall'app entro 7 giorni lavorativi."
    ],
    "rules_ok": [
      "Società francese con licenza MiCA rilasciata dall'AMF il 30/06/2025: è tra i pochi operatori crypto con posizione regolamentare piena e verificabile.",
      "Puoi trasferire i BTC su un wallet esterno se preferisci la self-custody."
    ],
    "rules_ko": [
      "Registrarsi senza il link referral (perdi il bonus)",
      "Account duplicati o dati condivisi",
      "Fare il conto solo sul bonus: su 100€ di acquisto le commissioni (0,49–1,49%) valgono circa 1,50€, quindi il netto reale è intorno ai 3,50€",
      "Stai comprando un asset volatile: il rischio di mercato sui 100€ è interamente tuo e non c'è alcun fondo di garanzia"
    ]
  },
  {
    "slug": "isybank",
    "name": "Isybank",
    "category": "Banca",
    "logo": "logos/isybank.png",
    "amount": 30,
    "currency": "€",
    "amountLabel": "30€",
    "minutes": 10,
    "difficulty": "Facile",
    "badge": null,
    "payout": "Gift card 30€ a scelta",
    "deposit": "Senza deposito",
    "expires": "2026-09-15",
    "updated": "2026-08-05",
    "featured": false,
    "countInTotal": true,
    "source": "https://www.isybank.com/it/landing/porta-un-amico.html",
    "summary": "Apri un nuovo Piano isybank col codice amico e aderisci a isyToken Collection. Ricevi 7.600 isyToken, pari a una gift card da 30€ a scelta (Amazon, Tezenis, Q8 e altre). Anche chi invita riceve 7.600 isyToken per ogni amico valido.",
    "code": null,
    "steps": [
      "Scarica l'app isybank e apri un <strong>nuovo Piano valido</strong> (isyLight, isySmart o isyPrime — non il conto base né isyONe).",
      "Completa l'apertura del Piano entro il <strong>15/09/2026</strong>.",
      "Entra nella sezione <strong>isyReward</strong> e aderisci a <strong>isyToken Collection</strong>.",
      "Inserisci il <strong>codice amico</strong> entro 15 giorni dall'apertura del Piano e comunque entro il <strong>30/09/2026</strong>.",
      "Ricevi <strong>7.600 isyToken</strong>, riscattabili dal catalogo isyReward in una gift card da 30€ a scelta (Amazon, Tezenis, Q8, Calzedonia, UCI Cinemas e altre)."
    ],
    "rules_ok": [
      "Per ottenere i 7.600 isyToken bastano apertura del Piano + adesione a isyToken Collection + inserimento del codice: nessuna spesa minima né accredito stipendio richiesti.",
      "isyLight è gratuito ed è sufficiente per la promo.",
      "Se hai 35 anni o più e apri isySmart entro il 15/09/2026, il canone è azzerato fino al 31/10/2026. Fino ai 35 anni isyPrime è a canone zero con imposta di bollo pagata dalla banca.",
      "Anche chi invita riceve 7.600 isyToken per ogni amico valido, fino a 100 amici.",
      "Il codice amico te lo diamo su WhatsApp: scrivici e te lo passiamo."
    ],
    "rules_ko": [
      "Essere già clienti isybank: l'iniziativa è per chi apre un nuovo Piano dal 15/06/2026",
      "Aprire solo il conto base o il Piano isyONe, o avere la sola carta prepagata (non validi per l'iniziativa)",
      "Confondere le due date: il Piano va aperto entro il <strong>15/09</strong>, il codice entro 15 giorni dall'apertura e comunque entro il <strong>30/09</strong>",
      "È un'operazione a premi: si ricevono isyToken da riscattare a catalogo, non denaro contante. Premi soggetti a disponibilità."
    ]
  }
];

function bonusStatus(b){
  if(!b.expires) return "active";
  return new Date(b.expires + "T23:59:59") >= TODAY ? "active" : "expired";
}

// Totale onesto: esclude importi variabili e promo che richiedono capitale immobilizzato.
function totalGuaranteed(){
  return BONUSES.filter(b => b.countInTotal && bonusStatus(b) === "active")
                .reduce((s,b) => s + b.amount, 0);
}

function activeCount(){
  return BONUSES.filter(b => bonusStatus(b) === "active").length;
}

if (typeof window !== "undefined") {
  window.BONUSES = BONUSES;
  window.bonusStatus = bonusStatus;
  window.totalGuaranteed = totalGuaranteed;
  window.activeCount = activeCount;
}

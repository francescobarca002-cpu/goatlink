// ============================================================
// GoatLink — SORGENTE UNICA DI VERITÀ
//
// Questo file lo carica index.html: modificarlo qui aggiorna la
// home. Non esistono altre copie dell'array.
//
// Le pagine guida (ing.html, bbva.html, ...) restano scritte a mano:
// se cambi un importo o una scadenza qui, controlla anche la guida
// corrispondente.
//
// Campi che contano:
//   countInTotal  entra nel totale garantito mostrato in home.
//                 true solo per i bonus che non chiedono di
//                 immobilizzare capitale.
//   capitale      euro da muovere (0 = nessuno). Governa il filtro
//                 "Nascondi quelli che chiedono di muovere soldi".
//   expires       oltre questa data la promo passa da sola in
//                 "Tornano presto". Lasciare null se non scade.
//   updated       data dell'ultima verifica: la piu' recente di
//                 queste alimenta la data mostrata in home.
// ============================================================

const TODAY = new Date(); // usato per calcolare automaticamente lo stato "scaduto"

const BONUSES = [
  {
    "slug": "bitpanda", "capitale": 50,
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
    ]
  },
  {
    "slug": "creditagricole", "capitale": 0,
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
      "Apri il <strong>Conto Online Crédit Agricole</strong> dall'invito. Serve essere <strong>nuovo correntista</strong> del Gruppo Crédit Agricole Italia.",
      "Inserisci il codice promozionale <strong>nel form di apertura</strong>: se apri senza, il bonus può non essere riconosciuto e non si recupera dopo.",
      "Nella stessa richiesta sottoscrivi la <strong>Carta Visa Debit</strong>: senza carta la promo non parte. Tutto entro il <strong>31/08/2026</strong>.",
      "Attiva transazioni online e 3D Secure (servono le credenziali che arrivano per posta).",
      "Fai almeno <strong>1 transazione</strong> con la carta, di qualsiasi importo. <strong>I prelievi non contano</strong>, e nemmeno le spese stornate o annullate.",
      "Ricevi <strong>50€ in Buono Regalo Amazon.it</strong>."
    ],
    "rules_ok": [
      "L'operazione a premi «Invita un amico in Crédit Agricole – Agosto 2026» è valida dal 31/07 al 31/10/2026, ma la finestra per chiedere l'apertura del conto si chiude il <strong>31/08</strong>.",
      "La Carta Visa Debit è obbligatoria: sceglila in fase di apertura.",
      "Esistono scaglioni aggiuntivi: +100€ con accredito stipendio o pensione e fino a +100€ in base all'utilizzo della carta. Importi e tempistiche nel regolamento ufficiale dell'edizione di agosto.",
      "Se accrediti lo stipendio, il bonifico deve avere <strong>causale ABI 27, SALA o PENS</strong>: con una causale generica la banca non lo riconosce."
    ],
    "why": "Basta una transazione con la carta Visa, di qualsiasi importo, e il buono arriva senza fare altro.",
    "pros": [
      "Una sola spesa, importo libero",
      "Scaglioni extra con stipendio",
      "Conto online a zero spese"
    ]
  },
  {
    "slug": "ing", "capitale": 0,
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
      "Apri il <strong>Conto Corrente Arancio Più</strong> dal sito ing.it entro il <strong>07/09/2026</strong>. Attenzione a non aprire l'<strong>Arancio Light</strong>: non è valido per la promo.",
      "Dopo i dati personali compare il campo «codice promozionale»: inserisci <strong>WELCOME</strong>. Se lo salti non è più aggiungibile dopo.",
      "Richiedi la carta di debito o di credito <strong>entro il 07/09/2026</strong>, durante l'apertura oppure dall'Area Riservata. Oltre quella data non vale.",
      "Spendi almeno <strong>300€</strong> con la carta entro il <strong>30/11/2026</strong>, in una o più volte, anche con Apple Pay o Google Pay. Sotto i 300€ il cashback non scatta.",
      "Ricevi <strong>100€ di cashback</strong> sul conto."
    ],
    "rules_ok": [
      "Vale anche se sei già cliente ING, purché tu non abbia mai avuto un Conto Corrente Arancio.",
      "Se hai chiesto entrambe le carte, i 300€ si raggiungono anche a metà tra debito e credito.",
      "Canone 5€/mese azzerato con stipendio, entrate da 1.000€/mese o under 30. I primi 3 mesi sono gratis comunque.",
      "Carte Mastercard a canone zero, bonifici SEPA anche istantanei, F24, MAV, RAV, CBILL, pagoPA e prelievi a 0€.",
      "La carta di debito arriva subito in versione digitale: la usi mentre aspetti quella fisica."
    ],
    "why": "È il bonus più alto in circolazione e non chiede di lasciare fermo un euro: i 300€ di spesa sono quelli che faresti comunque.",
    "pros": [
      "100€, nessuno paga di più",
      "Zero capitale immobilizzato",
      "Canone azzerabile con stipendio o under 30",
      "Carta digitale attiva subito"
    ]
  },
  {
    "slug": "fineco", "capitale": 20000,
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
    ]
  },
  {
    "slug": "buddybank", "capitale": 0,
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
      "Inserisci <strong>subito</strong> il codice amico: a conto aperto non si può più.",
      "Completa l'apertura del conto.",
      "Entro 30 giorni spendi almeno <strong>10€</strong> con la carta MyOne o la Genius Pay. Deve essere un pagamento con carta: <strong>bonifici, giroconti e pagamenti via IBAN non contano</strong>, come non contano ricariche verso altre carte, ricariche telefoniche da app e siti di gioco o scommesse.",
      "Non ridurti all'ultimo giorno utile: per i controlli fa fede la <strong>data valuta</strong>, non quella dell'acquisto.",
      "Tieni il saldo disponibile ≥ 0 fino all'accredito: non svuotare il conto mentre aspetti.",
      "Ricevi <strong>50€</strong> entro 90 giorni lavorativi dalla transazione valida."
    ],
    "rules_ok": [
      "La promo vale sia sul conto <strong>Genius buddy</strong> sia sulla carta ricaricabile <strong>Genius Pay</strong>.",
      "Online: scegli «carta di debito/credito» e inserisci i dati della carta. Deve comparire «Mastercard + ultime 4 cifre».",
      "Il regolamento accetta una o più transazioni per un totale di almeno 10€, ma un pagamento unico da 10€ è la strada più sicura.",
      "Al momento dell'accredito il saldo disponibile deve essere ≥ 0: non svuotare il conto mentre aspetti il bonus.",
      "In più c'è la promo <strong>«Remunerazione conto buddy 4%»</strong>: 4% lordo sulla giacenza media fino a 50.000€ fino al 31/12/2026, ma il conto va aperto entro il <strong>31/08/2026</strong>."
    ],
    "why": "Tutto il settore la dava per scaduta a luglio: è prorogata al 20 gennaio 2027, quindi non devi correre.",
    "pros": [
      "Un pagamento da 10€ e finisce lì",
      "Aperta fino a gennaio 2027",
      "In più 4% sulla giacenza"
    ]
  },
  {
    "slug": "bybit", "capitale": 100,
    "name": "Bybit",
    "category": "Crypto",
    "logo": "logos/bybit.png",
    "amount": 50,
    "currency": "€",
    "amountLabel": "50€ + 10€ con la carta",
    "minutes": 20,
    "difficulty": "Medio",
    "badge": "Bonus raddoppiato",
    "payout": "Pagato in 2–7 giorni",
    "deposit": "Deposito min. 100€",
    "expires": null,
    "updated": "2026-08-15",
    "featured": false,
    "countInTotal": false,
    "source": null,
    "summary": "Bybit ha raddoppiato il bonus invito: <strong>50€</strong> all'invitato depositando 100€ sul conto Spot, più <strong>10€ extra</strong> ordinando la Bybit Card e ricaricandola con 100 USDC. Bybit indica in app un numero limitato di posti (circa 1.000): verificato in app il 15/08/2026, può chiudersi senza preavviso.",
    "code": null,
    "steps": [
      "Registrati tramite il link dedicato all'entità <strong>Bybit EU</strong> (usa l'email che userai sempre).",
      "Completa la verifica identità (KYC): documento + selfie, 5–10 minuti.",
      "Deposita almeno <strong>100€ sul conto Spot</strong> entro 7 giorni (bonifico SEPA gratuito o carta). Su <strong>Derivatives o Earn il deposito non conta</strong>.",
      "<strong>Aspetta l'accredito dei 50€</strong> nel <strong>Rewards Hub</strong> (icona regalo), 2–7 giorni. Fino a quel momento non spostare fondi tra sotto-conti e non prelevare il deposito: entrambe le cose invalidano il bonus.",
      "<strong>Solo dopo aver ricevuto i 50€</strong>: ordina la Bybit Card <strong>virtuale</strong> (gratuita, la fisica costa 5€) e ricaricala con almeno <strong>100 USDC</strong> per sbloccare i <strong>10€</strong> di Card bonus."
    ],
    "rules_ok": [
      "L'entità con cui apri il conto è <strong>Bybit EU</strong>, autorizzata MiCA dall'autorità austriaca (FMA) e operativa in Italia in passaporto europeo: è un soggetto diverso da Bybit globale.",
      "Dopo aver ricevuto il bonus puoi prelevare liberamente.",
      "La Bybit Card non ha canone annuale né costi di inattività, e la versione virtuale è gratuita: per i 10€ è sufficiente quella.",
      "I 100 USDC della ricarica carta restano tuoi: il Card bonus è aggiuntivo, non è uno sconto sulla spesa.",
      "Pagando con la carta si converte crypto in euro con una commissione dello <strong>0,9%</strong>, e la conversione è fiscalmente una cessione: va dichiarata come le altre operazioni crypto."
    ],
    "why": "Bybit ha raddoppiato il bonus invito, da 25€ a 50€, ma i posti sono circa 1.000: è la promo del sito con la finestra più stretta.",
    "pros": [
      "50€ invece di 25: bonus raddoppiato",
      "Entità Bybit EU autorizzata MiCA",
      "10€ extra con la carta virtuale gratuita"
    ]
  },
  {
    "slug": "coinbase", "capitale": 21,
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
      "Iscriviti come <strong>nuovo utente</strong> tramite il link ufficiale. Un solo account: Coinbase incrocia i dati e blocca i bonus sui doppioni.",
      "Completa la verifica identità (KYC).",
      "Deposita almeno 21€ — metti <strong>22–23€</strong>, così le commissioni di deposito (circa 1–1,50€) non ti fanno scendere sotto la soglia.",
      "Fai un trade da almeno <strong>21€</strong> entro 90 giorni, <strong>solo su Coinbase base</strong>: le operazioni su Advanced e Prime non valgono.",
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
    ]
  },
  {
    "slug": "revolut", "capitale": 0,
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
    ]
  },
  {
    "slug": "bbva", "capitale": 0,
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
      "Ricarica il conto e fai una spesa di qualsiasi importo. <strong>Non valgono</strong> conti gioco e scommesse, ricariche e buoni regalo.",
      "Se Apple Pay non si attiva subito, usa la carta manualmente la prima volta.",
      "Ricevi <strong>10€</strong>, in genere entro pochi giorni lavorativi."
    ],
    "rules_ok": [
      "Cumulabile con il <strong>cashback 3%</strong>: fino a 50€ complessivi, calcolato sui primi 280€ di acquisti di ogni mese per i primi 6 mesi. Il conto va sottoscritto entro il <strong>30/09/2026</strong>.",
      "Il conto è remunerato al <strong>3% lordo per i primi 6 mesi</strong> fino a 200.000€. Dopo, il tasso è agganciato alla BCE: nel trimestre in corso è garantito lo 0,60%, con maggiorazioni se accrediti lo stipendio o superi certe soglie di saldo.",
      "Bonifici e operazioni gratuiti, PagoPA, CBILL, F24, bollo auto",
      "Se Apple Pay non si attiva subito, usa la carta manualmente la prima volta"
    ],
    "why": "La più facile del sito: una spesa qualsiasi, senza soglie, e il bonus arriva in pochi giorni.",
    "pros": [
      "Nessun importo minimo di spesa",
      "Cumulabile con il cashback 3%",
      "Bonifici e F24 gratuiti"
    ]
  },
  {
    "slug": "tinaba", "capitale": 20,
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
    ]
  },
  {
    "slug": "bitstack", "capitale": 100,
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
      "Registrati <strong>tramite il link dedicato</strong>: senza, il bonus non viene assegnato. Un solo account, niente dati condivisi.",
      "Completa la verifica identità (KYC): documento + selfie.",
      "Acquista almeno <strong>100€ di BTC</strong> entro 180 giorni, anche con piccoli acquisti ricorrenti. Sui 100€ le commissioni (0,49–1,49%) valgono circa 1,50€.",
      "Ricevi <strong>5€ in BTC</strong> dall'app entro 7 giorni lavorativi."
    ],
    "rules_ok": [
      "Società francese con licenza MiCA rilasciata dall'AMF il 30/06/2025: è tra i pochi operatori crypto con posizione regolamentare piena e verificabile.",
      "Puoi trasferire i BTC su un wallet esterno se preferisci la self-custody."
    ],
    "why": "Il modo meno brusco per comprare il primo bitcoin: accumula sugli arrotondamenti invece che in un colpo solo.",
    "pros": [
      "Licenza MiCA rilasciata dall'AMF",
      "BTC trasferibili su wallet tuo",
      "Acquisti ricorrenti anche piccoli"
    ]
  },
  {
    "slug": "isybank", "capitale": 0,
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
      "Scarica l'app isybank e apri un <strong>nuovo Piano valido</strong>: isyLight, isySmart o isyPrime. Il solo conto base, il Piano isyONe e la sola carta prepagata <strong>non valgono</strong>.",
      "Completa l'apertura entro il <strong>15/09/2026</strong>. L'iniziativa è per chi apre un nuovo Piano dal 15/06/2026: chi era già cliente prima è escluso.",
      "Entra nella sezione <strong>isyReward</strong> e aderisci a <strong>isyToken Collection</strong>.",
      "Inserisci il <strong>codice amico</strong> entro 15 giorni dall'apertura del Piano e comunque entro il <strong>30/09/2026</strong>. Sono due scadenze diverse: vale quella che scade prima.",
      "Ricevi <strong>7.600 isyToken</strong> e riscattali dal catalogo isyReward in una gift card da 30€ a scelta (Amazon, Tezenis, Q8, Calzedonia, UCI Cinemas e altre)."
    ],
    "rules_ok": [
      "Per ottenere i 7.600 isyToken bastano apertura del Piano + adesione a isyToken Collection + inserimento del codice: nessuna spesa minima né accredito stipendio richiesti.",
      "isyLight è gratuito ed è sufficiente per la promo.",
      "Se hai 35 anni o più e apri isySmart entro il 15/09/2026, il canone è azzerato fino al 31/10/2026. Fino ai 35 anni isyPrime è a canone zero con imposta di bollo pagata dalla banca.",
      "Anche chi invita riceve 7.600 isyToken per ogni amico valido, fino a 100 amici.",
      "Il codice amico te lo diamo su WhatsApp: scrivici e te lo passiamo."
    ],
    "why": "Non chiede né deposito né spesa minima: apri il Piano, metti il codice, prendi i token.",
    "pros": [
      "Nessuna spesa richiesta",
      "isyLight è gratuito e basta",
      "Struttura Intesa Sanpaolo"
    ]
  },
  {
    "slug": "traderepublic", "capitale": 100,
    "name": "Trade Republic",
    "category": "Trading",
    "logo": "logos/traderepublic.png",
    "emoji": "📈",
    "amount": 10,
    "currency": "€",
    "amountLabel": "10€ in azioni",
    "minutes": 12,
    "difficulty": "Medio",
    "badge": "Nuovo",
    "payout": "Azione entro pochi giorni",
    "deposit": "100€ + 2 investimenti",
    "expires": null,
    "updated": "2026-08-09",
    "featured": false,
    "countInTotal": false,
    "source": null,
    "summary": "Apri il conto dal link invito, deposita 100€ e fai due investimenti entro 21 giorni. Ricevi un'azione da 10€. Attenzione: Trade Republic personalizza le condizioni dentro l'app e in alcune campagne dà il 3% sulla liquidità per tre mesi al posto dei 10€.",
    "code": null,
    "steps": [
      "Apri Trade Republic dal link invito: il <strong>numero di telefono</strong> inserito nella pagina di invito deve essere lo stesso con cui apri il conto, altrimenti l'invito non si aggancia.",
      "Completa la verifica identità (documento + selfie).",
      "<strong>Leggi le condizioni che l'app mostra a te</strong>: sono personalizzate e possono chiedere 2 o 3 investimenti, oppure dare il 3% sulla liquidità al posto dei 10€.",
      "Deposita almeno <strong>100€</strong> entro <strong>21 giorni</strong> dalla registrazione.",
      "Fai gli investimenti richiesti entro gli stessi 21 giorni: bastano importi minimi, la commissione è 1€ a operazione.",
      "Ricevi l'azione da <strong>10€</strong>. Il deposito resta tuo e lo puoi riprelevare."
    ],
    "rules_ok": [
      "Trade Republic è una banca tedesca vigilata da BaFin e Bundesbank, con CONSOB come autorità dello Stato ospitante in Italia.",
      "La liquidità non investita è coperta dalla garanzia dei depositi fino a 100.000€.",
      "L'azione ricevuta si può vendere subito; il prelievo del controvalore può avere un periodo di attesa."
    ],
    "why": "Banca tedesca vigilata da BaFin, con CONSOB in Italia: è il modo più solido per iniziare a investire poco.",
    "pros": [
      "Depositi garantiti fino a 100.000€",
      "Azioni frazionate da pochi euro",
      "Piani di accumulo senza commissioni"
    ]
  },
  {
    "slug": "trading212", "capitale": 10,
    "name": "Trading 212",
    "category": "Trading",
    "logo": "logos/trading212.png",
    "emoji": "📊",
    "amount": 0,
    "currency": "€",
    "amountLabel": "8€–100€",
    "minutes": 15,
    "difficulty": "Facile",
    "badge": null,
    "payout": "Azione entro 72 ore",
    "deposit": "Deposito min. 10€",
    "expires": "2026-07-09",
    "updated": "2026-08-09",
    "featured": false,
    "countInTotal": false,
    "source": null,
    "summary": "Un'azione omaggio da 8€ a 100€ con deposito minimo di 10€. L'ultima campagna si è chiusa il 09/07/2026: Trading 212 lavora a finestre, quindi la promo torna ma con date e regolamento nuovi ogni volta.",
    "code": null,
    "steps": [],
    "rules_ok": []
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

// ============================================================
// GoatLink — SORGENTE UNICA DI VERITÀ
// Modifica SOLO questo file per aggiornare l'intero sito.
// Le card in home e le pagine guida leggono tutte da qui.
// ============================================================

const TODAY = new Date(); // usato per calcolare automaticamente lo stato "scaduto"

const BONUSES = [
  {
    slug: "buddybank",
    name: "Buddybank",
    category: "Banca",
    logo: "logos/buddybank.png",
    amount: 50,
    currency: "€",
    amountLabel: "50€",
    minutes: 10,
    difficulty: "Facile",
    badge: "Bonus più alto",
    payout: "Pagato in 7–14 giorni",
    deposit: "Pagamento singolo da 10€",
    expires: null,                 // null = a tempo indeterminato
    updated: "2026-05-28",
    featured: true,
    summary: "Apri il conto Buddybank, inserisci il codice amico e fai un pagamento da almeno 10€ con la carta MyOne. 50€ accreditati entro 7–14 giorni.",
    code: "B2601MD29S8CUL",
    steps: [
      "Richiedi la carta di debito <strong>MyOne</strong> e seleziona <strong>solo digitale</strong>.",
      "Inserisci <strong>subito</strong> il codice amico (non potrai inserirlo dopo).",
      "Completa l'apertura del conto.",
      "Entro 30 giorni fai <strong>un singolo pagamento da almeno 10€</strong> con la carta MyOne.",
      "Ricevi 50€."
    ],
    rules_ok: [
      "Online: scegli «carta di debito/credito» e inserisci i dati della carta. Deve comparire «Mastercard + ultime 4 cifre»."
    ],
    rules_ko: [
      "Pagamenti con IBAN, bonifici o giroconti",
      "Ricariche verso altre carte o ricariche telefoniche da app",
      "Siti di scommesse o gioco",
      "Più pagamenti per arrivare a 10€ — fai un singolo pagamento da 10€"
    ]
  },
  {
    slug: "bybit",
    name: "Bybit",
    category: "Crypto",
    logo: "logos/bybit.png",
    amount: 45,
    currency: "€",
    amountLabel: "fino a 45€",
    minutes: 15,
    difficulty: "Facile",
    badge: null,
    payout: "Pagato in 2–7 giorni",
    deposit: "Deposito min. 100€",
    expires: null,
    updated: "2026-05-27",
    featured: false,
    summary: "Registrati, completa il KYC e deposita almeno 100€ sul conto Spot. Bonus fino a 45€ accreditato nel Rewards Hub entro 2–7 giorni.",
    code: null,
    steps: [
      "Registrati tramite il link dedicato (usa l'email che userai sempre).",
      "Completa la verifica identità (KYC): documento + selfie, 5–10 minuti.",
      "Deposita almeno <strong>100€ sul conto Spot</strong> entro 7 giorni (bonifico SEPA gratuito o carta).",
      "Non spostare i fondi tra sotto-conti e non prelevare durante l'attesa.",
      "Ricevi il bonus entro 2–7 giorni nel <strong>Rewards Hub</strong> (icona regalo)."
    ],
    rules_ok: [
      "Piattaforma Bybit EU, regolamentata",
      "Dopo aver ricevuto il bonus puoi prelevare liberamente"
    ],
    rules_ko: [
      "Depositare su Derivatives o Earn invece che su Spot",
      "Trasferire fondi tra sotto-conti (invalida il bonus)",
      "Prelevare il deposito prima di ricevere il bonus"
    ]
  },
  {
    slug: "coinbase",
    name: "Coinbase",
    category: "Crypto",
    logo: "logos/coinbase.png",
    amount: 20,
    currency: "€",
    amountLabel: "20€",
    minutes: 15,
    difficulty: "Medio",
    badge: null,
    payout: "Pagato in 15–30 giorni",
    deposit: "Deposito + trade min. 21€",
    expires: null,
    updated: "2026-05-26",
    featured: false,
    summary: "Nuovo utente: iscriviti, completa il KYC, deposita almeno 21€ e fai un trade da almeno 21€ entro 90 giorni. Bonus 20€.",
    code: null,
    steps: [
      "Iscriviti come <strong>nuovo utente</strong> tramite il link ufficiale.",
      "Completa la verifica identità (KYC).",
      "Deposita almeno 21€ (consigliati 22–23€ per coprire le commissioni).",
      "Fai un trade da almeno 21€ entro 90 giorni — <strong>solo su Coinbase base</strong>, non Advanced né Prime.",
      "Bonus in arrivo entro 15–30 giorni."
    ],
    rules_ok: [
      "Esempio valido: deposita 22€, compra 21€ di BTC, poi rivendili.",
      "Coinbase One è gratis la prima settimana e azzera le commissioni (ricordati di disdire entro 7 giorni)."
    ],
    rules_ko: [
      "Account multipli — Coinbase verifica tutto e blocca i bonus",
      "Operazioni su Advanced o Prime (non valide)"
    ]
  },
  {
    slug: "revolut",
    name: "Revolut",
    category: "Fintech",
    logo: null,
    emoji: "💳",
    amount: 15,
    currency: "€",
    amountLabel: "15€",
    minutes: 10,
    difficulty: "Facile",
    badge: null,
    payout: "Pagato in 2 giorni",
    deposit: "3 spese da 5€",
    expires: null,
    updated: "2026-05-28",
    featured: false,
    summary: "Apri il conto, ordina la carta Standard gratuita e fai 3 spese da 5€ ciascuna entro 30 giorni. 15€ accreditati in 2 giorni.",
    code: null,
    steps: [
      "Registrati tramite il link referral (obbligatorio).",
      "Inserisci il numero di telefono nella prima schermata.",
      "Completa la verifica identità (documento + selfie).",
      "Ordina la carta <strong>Standard gratuita</strong> e attivala all'arrivo.",
      "Fai almeno <strong>3 spese da 5€</strong> ciascuna entro 30 giorni.",
      "Ricevi 15€ entro 2 giorni lavorativi."
    ],
    rules_ok: [
      "Va bene sia la carta fisica che quella virtuale, anche acquisti online",
      "Esempi: 3 caffè al bar, piccola spesa, acquisti su Amazon in giorni diversi"
    ],
    rules_ko: [
      "Gioco d'azzardo e scommesse",
      "Acquisto di gift card o buoni",
      "Trasferimenti, cambio valuta, prelievi ATM",
      "Annullare gli acquisti dopo averli fatti (Revolut può stornare il bonus)"
    ]
  },
  {
    slug: "bbva",
    name: "BBVA",
    category: "Banca",
    logo: "logos/bbva.png",
    amount: 10,
    currency: "€",
    amountLabel: "10€",
    minutes: 10,
    difficulty: "Facile",
    badge: "Consigliato per iniziare",
    payout: "Pagato in 2 giorni",
    deposit: "1 spesa di qualsiasi importo",
    expires: null,
    updated: "2026-05-28",
    featured: false,
    summary: "Scarica l'app, inserisci il codice promo Passaparola e fai una spesa di qualsiasi importo. 10€ entro 2 giorni lavorativi.",
    code: "1E550060F05890",
    steps: [
      "Scarica l'app BBVA.",
      "Al quarto passaggio inserisci il codice promo.",
      "Accetta i termini della promo <strong>Passaparola</strong>.",
      "Ricarica il conto e fai una spesa di qualsiasi importo.",
      "Ricevi 10€ entro 2 giorni lavorativi."
    ],
    rules_ok: [
      "Bonifici e operazioni gratuiti, PagoPA, CBILL, F24, bollo auto",
      "Se Apple Pay non si attiva subito, usa la carta manualmente la prima volta"
    ],
    rules_ko: [
      "Conti gioco, scommesse, ricariche o buoni regalo"
    ]
  },
  {
    slug: "tinaba",
    name: "Tinaba",
    category: "Fintech",
    logo: "logos/tinaba.png",
    amount: 10,
    currency: "€",
    amountLabel: "10€",
    minutes: 10,
    difficulty: "Facile",
    badge: null,
    payout: "Bonus in 30 giorni",
    deposit: "Ricarica min. 20€",
    expires: null,
    updated: "2026-05-25",
    featured: false,
    summary: "Registrati come nuovo utente, inserisci il codice referral e ricarica almeno 20€ entro 30 giorni. Bonus 10€ cumulabile con gli inviti.",
    code: "QJSX3Q",
    steps: [
      "Scarica l'app Tinaba e registrati come nuovo utente.",
      "Inserisci il codice referral durante la registrazione.",
      "Attiva il conto.",
      "Ricarica almeno 20€ entro 30 giorni dall'iscrizione.",
      "Ricevi 10€ di bonus."
    ],
    rules_ok: [
      "Bonus cumulabile: altri 10€ per ogni amico che inviti con il tuo codice"
    ],
    rules_ko: [
      "Account già esistente (serve essere nuovo utente)",
      "Codice non inserito durante la registrazione"
    ]
  },
  {
    slug: "bitstack",
    name: "Bitstack",
    category: "Crypto",
    logo: null,
    emoji: "₿",
    amount: 10,
    currency: "€",
    amountLabel: "10€ in BTC",
    minutes: 10,
    difficulty: "Facile",
    badge: null,
    payout: "Accredito app in 7 giorni",
    deposit: "Acquisto min. 100€",
    expires: null,
    updated: "2026-05-24",
    featured: false,
    summary: "Iscriviti col link referral e acquista almeno 100€ di BTC entro 180 giorni. 5€ dall'app + 5€ da GoatLink via screenshot = 10€ in Bitcoin.",
    code: null,
    steps: [
      "Scarica l'app Bitstack (iOS / Android).",
      "Registrati tramite il link dedicato (obbligatorio).",
      "Completa la verifica identità (KYC): documento + selfie.",
      "Acquista almeno <strong>100€ di BTC</strong> entro 180 giorni (anche con piccoli acquisti ricorrenti).",
      "Ricevi 5€ in BTC dall'app entro 7 giorni lavorativi.",
      "Manda lo screenshot su WhatsApp e ricevi altri 5€ extra da GoatLink."
    ],
    rules_ok: [
      "Piattaforma regolamentata in Europa, ideale per principianti"
    ],
    rules_ko: [
      "Registrarsi senza il link referral (perdi il bonus)",
      "Account duplicati o dati condivisi"
    ]
  },
  {
    slug: "binance",
    name: "Binance",
    category: "Crypto",
    logo: null,
    emoji: "🟡",
    amount: 10,
    currency: " USDC",
    amountLabel: "10 USDC",
    minutes: 15,
    difficulty: "Medio",
    badge: "Promo flash",
    payout: "Voucher entro 48h",
    deposit: "Deposito + trading min. 50€",
    expires: "2026-06-15",   // data realistica futura per il prototipo
    updated: "2026-05-29",
    featured: false,
    summary: "Promo a tempo: deposita e fai trading per almeno 50€, poi clicca «Partecipa alla campagna». 10 USDC via voucher entro 48h.",
    code: null,
    steps: [
      "Registrati su Binance tramite il link GoatLink.",
      "Completa la verifica identità (KYC).",
      "Deposita almeno 50€ equivalenti (USDT, BTC, ETH o fiat).",
      "Fai trading per almeno 50€ equivalenti.",
      "Clicca di nuovo sul link e seleziona <strong>«Partecipa alla campagna»</strong> (fondamentale).",
      "Apri la Reward Box nel Centro Ricompense: il voucher arriva entro 48h."
    ],
    rules_ok: [
      "Accedi sempre dalla pagina promo tramite il link GoatLink"
    ],
    rules_ko: [
      "Non cliccare «Partecipa alla campagna»: il bonus non si attiva anche se hai i requisiti",
      "Aspettare troppo: il voucher scade entro 21 giorni dalla distribuzione"
    ]
  },
  // ---- Scaduti: restano nei dati ma con expires nel passato ----
  {
    slug: "isybank",
    name: "Isybank",
    category: "Banca",
    logo: "logos/isybank.png",
    amount: 30,
    currency: "€",
    amountLabel: "30€ Amazon",
    minutes: 10,
    difficulty: "Facile",
    badge: null,
    payout: "Buono Amazon",
    deposit: "Senza deposito",
    expires: "2026-05-15",
    updated: "2026-05-15",
    featured: false,
    summary: "30€ in Buono Amazon, senza deposito. Promo terminata.",
    code: "L7I1TUWQOI",
    steps: [],
    rules_ok: [],
    rules_ko: []
  }
];

// Calcola lo stato in automatico in base alla data di scadenza
function bonusStatus(b) {
  if (!b.expires) return "active";
  const exp = new Date(b.expires + "T23:59:59");
  return exp >= TODAY ? "active" : "expired";
}

if (typeof window !== "undefined") {
  window.BONUSES = BONUSES;
  window.bonusStatus = bonusStatus;
}

// ============================================================
// Contenuti editoriali per pagina bonus: FAQ + Pro/Contro + verdetto.
// Servono per il long-tail SEO e per i rich results (FAQPage schema).
// Modifica qui i testi; build.js li unisce ai dati di data.js per slug.
// ============================================================

const CONTENT = {
  fineco: {
    verdict: "50€ con una banca italiana solida e conosciuta. Il metodo consigliato (5 operazioni di trading) è furbo perché non richiede accredito stipendio né di tenere grossi importi sul conto: bastano piccole operazioni a mercato aperto. Da tenere d'occhio le scadenze, che sono più articolate del solito, e la conferma del bonus a novembre da non dimenticare.",
    pros: ["50€ con una banca italiana affidabile", "Il metodo dei 5 trade non richiede stipendio né grossi importi", "Inviti molto remunerativi: fino a 1.000€ l'anno con 20 amici"],
    cons: ["Più scadenze da rispettare (apertura, trade, conferma)", "Le operazioni vanno fatte solo a mercato aperto", "Va ricordata la conferma del bonus tra il 2 e il 30 novembre 2026"],
    faq: [
      {q: "Come si ottengono i 50€ di Fineco?", a: "Apri un nuovo conto col codice amico entro il 30/06/2026, poi fai 5 operazioni di trading entro il 31/08/2026. Il bonus va confermato nell'area riservata a partire dal 02/11/2026."},
      {q: "Devo accreditare lo stipendio per il bonus Fineco?", a: "No. Il metodo consigliato è quello delle 5 operazioni di trading, che non richiede accredito stipendio o pensione né di mantenere grossi importi sul conto."},
      {q: "Quando devo confermare il bonus Fineco?", a: "Fineco rende disponibile la conferma nell'area riservata dal 02/11/2026, e va confermata entro il 30/11/2026. Se non confermi entro quella data il bonus potrebbe non essere riconosciuto."},
      {q: "Quanti amici posso invitare con Fineco?", a: "50€ per ogni amico valido, fino a un massimo di 20 inviti all'anno: quindi fino a 1.000€ annui. Attenzione: i 20 inviti sono il totale annuo, non per singola promo."}
    ]
  },
  skrill: {
    verdict: "Attenzione a cosa è davvero: qui i 15€ non sono denaro netto in tasca, ma uno sconto sulle commissioni di un trasferimento internazionale che devi comunque voler fare. Mandi 150€ all'estero e ne paghi circa 135 — il vantaggio reale è quel risparmio. Ha senso se hai già un motivo per trasferire denaro cross-border; la parte interessante sono gli inviti, che possono valere fino a 750€.",
    pros: ["Sconto immediato di 15€ sul primo trasferimento", "Inviti molto remunerativi: 15€ per amico, fino a 750€", "Nessuna scadenza nota: promo attiva finché disponibile"],
    cons: ["Non è denaro netto: è uno sconto su un trasferimento da almeno 150€", "Devi avere un reale motivo per fare un trasferimento internazionale", "Va fatto da web (non dall'app) e con un conto di ricezione compatibile"],
    faq: [
      {q: "Il bonus Skrill sono 15€ gratis?", a: "Non esattamente: sono 15€ di sconto sul primo trasferimento internazionale da almeno 150€. Trasferisci 150€ pagandone circa 135, quindi il vantaggio reale è il risparmio di 15€."},
      {q: "Dove si inserisce il codice promo Skrill?", a: "Durante il trasferimento, nel campo «Codice promozionale» — non in fase di creazione dell'account. Verifica che lo sconto sia applicato prima di confermare."},
      {q: "Quali conti posso usare con Skrill Money Transfer?", a: "In partenza Revolut o qualsiasi conto bancario; in ricezione un conto bancario reale supportato da Skrill. Non vanno bene IBAN lituani né exchange con IBAN proprio."},
      {q: "Quanto posso guadagnare con gli inviti Skrill?", a: "15€ per ogni amico valido, fino a un massimo di 50 amici: quindi potenzialmente fino a 750€ da usare su trasferimenti successivi."}
    ]
  },
  trading212: {
    verdict: "Azione gratis dal valore variabile (8€–100€) per aver aperto un conto Invest e depositato appena 10€. Trading 212 è una piattaforma nota per investire in azioni ed ETF. Il bello è il sistema di inviti: fino a 5 amici validi possono portarti a 500€. L'unico limite è che il premio non è fisso e il valore ha un blocco di 30 giorni.",
    pros: ["Deposito minimo bassissimo (10€)", "Procedura semplice e veloce, adatta ai principianti", "Inviti molto remunerativi: fino a 500€ con 5 amici"],
    cons: ["Premio non fisso: le azioni di valore alto sono più rare", "Il valore del premio è bloccato 30 giorni prima del prelievo", "Promo a tempo: termina il 9 luglio 2026"],
    faq: [
      {q: "Quanto vale il premio di Trading 212?", a: "Un'azione gratis dal valore variabile tra 8€ e 100€. Non è fisso: le azioni di valore più alto sono meno frequenti."},
      {q: "Quale conto devo aprire su Trading 212?", a: "Un conto Invest. I conti CFD e Cash ISA non sono validi per questa promo."},
      {q: "Quanto devo depositare per il bonus Trading 212?", a: "Almeno 10€ entro 10 giorni dalla registrazione. Completati i requisiti, ricevi l'azione premio entro circa 3 giorni lavorativi."},
      {q: "Quanto posso guadagnare con gli inviti?", a: "Un'azione da 8€ a 100€ per ogni amico valido, fino a un massimo di 5 amici premiati: quindi potenzialmente fino a 500€."},
      {q: "Posso prelevare subito il premio?", a: "Puoi ricevere e anche vendere l'azione, ma il valore economico collegato ha un blocco prelievo di 30 giorni."}
    ]
  },
  kast: {
    verdict: "Bonus fintech crypto da 20$ di benvenuto, con un sistema di inviti e reward extra che cresce con la spesa. KAST è una piattaforma con carta legata a stablecoin e account globali. Adatto a chi vuole un bonus scalabile, ma valuta sempre le commissioni e il fatto che i premi restano bloccati 14 giorni.",
    pros: ["20$ di benvenuto completando la soglia base da 100$", "20$ per ogni amico valido che inviti", "Reward extra cumulativi fino a 250$ alle soglie di spesa più alte"],
    cons: ["I premi restano Locked per 14 giorni prima di essere riscattabili", "Soglia di spesa da raggiungere entro 45 giorni dal KYC", "Prodotto legato a stablecoin: valuta natura dello strumento e commissioni"],
    faq: [
      {q: "Quanto si guadagna con KAST?", a: "20$ di benvenuto completando la soglia base da 100$ di spesa. In più, 20$ per ogni amico valido che inviti, e reward extra crescenti alle soglie di spesa più alte."},
      {q: "Quanto tempo ho per completare la promo KAST?", a: "Entro 45 giorni dal completamento del KYC. I premi, una volta ottenuti, restano bloccati (Locked) per 14 giorni, poi diventano riscattabili (Redeemable)."},
      {q: "Come funzionano i reward extra di KAST?", a: "Sono cumulativi in base alla spesa totale: fino a 20$ a 100$, fino a 50$ a 600$, fino a 100$ a 1.600$, fino a 250$ a 6.600$. Sulle soglie alte attenzione alle commissioni."},
      {q: "Come funzionano gli inviti KAST?", a: "Dopo aver completato la tua promo puoi invitare altri dal tuo link. Per ogni amico valido che raggiunge la soglia base da 100$, ricevi 20$."}
    ]
  },
  buddybank: {
    verdict: "Il bonus più alto della lista (50€) per uno sforzo minimo: un solo pagamento da 10€. Buddybank è la banca digitale di Unicredit, quindi solida. Il punto delicato è inserire il codice amico al momento giusto e fare il pagamento nel modo corretto (carta, non IBAN).",
    pros: ["Importo alto (50€) per pochi minuti di lavoro", "Un solo pagamento da 10€, nessun deposito vincolato", "Banca del gruppo Unicredit, conto a canone zero il primo anno"],
    cons: ["Il codice amico va inserito subito, non si può aggiungere dopo", "Il pagamento deve risultare come carta Mastercard, non come addebito su conto"],
    faq: [
      {q: "Quanto si guadagna con il bonus Buddybank?", a: "50€, accreditati entro 7–14 giorni dopo aver fatto un pagamento singolo da almeno 10€ con la carta MyOne."},
      {q: "Dove si inserisce il codice amico Buddybank?", a: "Durante l'apertura del conto, prima di completarla. Non è possibile inserirlo dopo aver aperto il conto, quindi è il passaggio da non saltare."},
      {q: "Il conto Buddybank ha costi?", a: "Il piano base è a canone zero. Per il bonus non è richiesto alcun deposito vincolato: serve solo un pagamento da 10€ con la carta."},
      {q: "Quanto tempo serve per ricevere il bonus Buddybank?", a: "In genere tra 7 e 14 giorni dopo il pagamento qualificante con la carta MyOne."}
    ]
  },
  bybit: {
    verdict: "Bonus crypto tra i più alti (fino a 45€), ma richiede un deposito di 100€ sul conto Spot. Adatto a chi è già a suo agio con un exchange. La regola d'oro: deposita su Spot e non muovere nulla finché il bonus non arriva.",
    pros: ["Importo elevato fino a 45€", "Bybit EU è regolamentata", "Accredito relativamente rapido (2–7 giorni)"],
    cons: ["Richiede 100€ di deposito (recuperabili dopo)", "Spostare i fondi tra sotto-conti invalida il bonus", "Prodotto crypto: il valore degli asset può variare"],
    faq: [
      {q: "Quanto serve depositare per il bonus Bybit?", a: "Almeno 100€ sul conto Spot entro 7 giorni dalla registrazione. Il deposito è tuo e potrai prelevarlo dopo aver ricevuto il bonus."},
      {q: "Dove arriva il bonus Bybit?", a: "Nel Rewards Hub dell'app (icona regalo in alto a destra), entro 2–7 giorni. Se compare un voucher, va riscattato."},
      {q: "Posso perdere il bonus Bybit?", a: "Sì, se depositi sul conto sbagliato (Derivatives o Earn invece di Spot), se sposti fondi tra sotto-conti o se prelevi prima di ricevere il bonus."}
    ]
  },
  coinbase: {
    verdict: "Bonus da 20€ su una delle piattaforme crypto più note e semplici da usare. Richiede un piccolo deposito e un trade, entrambi da 21€. È più macchinoso di un bonus bancario, ma Coinbase è molto guidata e adatta ai principianti.",
    pros: ["Piattaforma molto semplice per chi inizia con le crypto", "Deposito basso (21€)", "Trucco Coinbase One per azzerare le commissioni"],
    cons: ["Il trade deve essere su Coinbase base, non Advanced o Prime", "Accredito lento (15–30 giorni)", "Prodotto crypto: il valore può variare"],
    faq: [
      {q: "Come si ottiene il bonus Coinbase da 20€?", a: "Da nuovo utente: iscriviti col link, completa la verifica, deposita almeno 21€ e fai un trade da almeno 21€ entro 90 giorni, solo su Coinbase base."},
      {q: "Quanto costa fare il trade su Coinbase?", a: "Ci sono commissioni, ma attivando la prova gratuita di Coinbase One per la prima settimana le commissioni si azzerano. Ricordati di disdire entro 7 giorni."},
      {q: "Quando arriva il bonus Coinbase?", a: "Generalmente entro 15–30 giorni dal trade qualificante."}
    ]
  },
  revolut: {
    verdict: "Bonus da 15€ con una delle fintech più diffuse in Europa. Niente deposito: bastano 3 spese da 5€ con la carta entro 30 giorni. Comodo perché le spese possono essere acquisti reali che faresti comunque.",
    pros: ["Nessun deposito, solo 3 piccole spese reali", "Carta Standard gratuita, anche virtuale", "Accredito veloce (2 giorni)"],
    cons: ["Servono 3 spese separate da 5€ ciascuna", "Annullare un acquisto può bloccare o stornare il bonus", "Niente scommesse, gift card o cambio valuta come spese valide"],
    faq: [
      {q: "Quante spese servono per il bonus Revolut?", a: "Almeno 3 spese da 5€ ciascuna entro 30 giorni dall'apertura del conto. Vanno bene acquisti reali, anche online."},
      {q: "La carta Revolut ha costi?", a: "La carta Standard è gratuita, spedizione inclusa. Puoi usare anche la carta virtuale per le spese."},
      {q: "Quando arriva il bonus Revolut?", a: "Entro circa 2 giorni lavorativi dopo aver completato le 3 spese richieste."}
    ]
  },
  bbva: {
    verdict: "Il bonus più semplice per iniziare: 10€ con una sola spesa di qualsiasi importo. BBVA è una grande banca internazionale e il conto offre molte funzioni gratuite. Ideale come primo bonus per prendere confidenza.",
    pros: ["Una sola spesa di qualsiasi importo", "Accredito veloce (2 giorni)", "Conto ricco di funzioni gratuite (bonifici, F24, PagoPA)"],
    cons: ["Importo contenuto (10€)", "Apple Pay a volte non si attiva subito"],
    faq: [
      {q: "Come funziona il bonus BBVA da 10€?", a: "Scarica l'app, inserisci il codice promo Passaparola al quarto passaggio, accetta i termini e fai una spesa di qualsiasi importo. Ricevi 10€ entro 2 giorni."},
      {q: "Quali spese non valgono per il bonus BBVA?", a: "Conti gioco, scommesse, ricariche e buoni regalo non sono considerate spese valide."},
      {q: "Il conto BBVA è gratuito?", a: "Sì, con numerose operazioni gratuite incluse come bonifici, PagoPA, CBILL, F24 e bollo auto."}
    ]
  },
  tinaba: {
    verdict: "Bonus da 10€ con una fintech italiana legata a Banca Profilo. Richiede una ricarica di 20€, ma il bonus è cumulabile con gli inviti: ogni amico che porti vale altri 10€. Buono se vuoi anche fare passaparola.",
    pros: ["Bonus cumulabile: 10€ per ogni amico invitato", "Fintech italiana collegata a Banca Profilo", "Solo 20€ di ricarica, recuperabili"],
    cons: ["Importo base contenuto (10€)", "Il codice va inserito durante la registrazione", "Accredito fino a 30 giorni"],
    faq: [
      {q: "Come si ottiene il bonus Tinaba?", a: "Registrati come nuovo utente, inserisci il codice referral durante la registrazione e ricarica almeno 20€ entro 30 giorni. Ricevi 10€."},
      {q: "Il bonus Tinaba è cumulabile?", a: "Sì. Oltre ai 10€ iniziali, guadagni altri 10€ per ogni amico che si iscrive con il tuo codice."}
    ]
  },
  bitstack: {
    verdict: "10€ in Bitcoin (5€ dall'app + 5€ extra da GoatLink) acquistando 100€ di BTC, anche in più volte. Bitstack è pensata per accumulare Bitcoin in automatico ed è adatta ai principianti. Ricorda: l'acquisto è in BTC, il cui valore oscilla.",
    pros: ["10€ totali in Bitcoin (5€ app + 5€ GoatLink)", "I 100€ possono essere acquisti piccoli e ricorrenti", "Piattaforma regolamentata in Europa, semplice per chi inizia"],
    cons: ["Devi acquistare 100€ in BTC, il cui valore può variare", "Obbligatorio usare il link referral", "L'extra GoatLink richiede di inviare lo screenshot su WhatsApp"],
    faq: [
      {q: "Come si arriva a 10€ con Bitstack?", a: "Ricevi 5€ in BTC dall'app dopo aver acquistato 100€ di Bitcoin, più 5€ extra da GoatLink inviando lo screenshot del bonus su WhatsApp."},
      {q: "Devo comprare 100€ in una volta sola su Bitstack?", a: "No. Puoi raggiungere i 100€ anche con piccoli acquisti ricorrenti entro 180 giorni."}
    ]
  },
  binance: {
    verdict: "Promo flash a tempo: 10 USDC con deposito e trading da 50€. Il passaggio cruciale, spesso dimenticato, è cliccare «Partecipa alla campagna» dal link: senza quello il bonus non parte anche se hai fatto tutto il resto.",
    pros: ["Exchange crypto più grande al mondo", "Bonus rapido (voucher entro 48h)", "Requisiti relativamente bassi (50€)"],
    cons: ["Promo a tempo, fino a esaurimento pool", "Va cliccato «Partecipa alla campagna», altrimenti niente bonus", "Il voucher scade entro 21 giorni; prodotto crypto volatile"],
    faq: [
      {q: "Perché non ho ricevuto il bonus Binance?", a: "Quasi sempre perché non è stato cliccato «Partecipa alla campagna» dal link dopo aver soddisfatto i requisiti. È il passaggio che attiva il bonus."},
      {q: "Quando scade la promo Binance?", a: "È una promo flash valida fino alla data indicata sulla pagina o fino a esaurimento del pool ricompense. Conviene non aspettare."}
    ]
  },
  isybank: {
    verdict: "Promo terminata. Era un buono Amazon da 30€ senza deposito, offerto da Isybank (gruppo Intesa Sanpaolo). Iscriviti su WhatsApp per essere avvisato se torna.",
    pros: [],
    cons: [],
    faq: []
  }
};

if (typeof module !== "undefined") module.exports = { CONTENT };

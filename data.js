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
    ]
  },
  {
    "slug": "ing", "capitale": 0,
    "name": "ING",
    "category": "Banca",
    "logo": "logos/ing.png",
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
      {"q": "Quanto vale il bonus ING oggi?",
       "a": "75€ di cashback per chi apre il Conto Corrente Arancio Più con un codice amico. È la nuova campagna, l'Edizione V: la precedente da 100€ con il codice WELCOME si è chiusa il 7 settembre 2026."},
      {"q": "Entro quando devo aprire il conto?",
       "a": "Entro il <strong>2 novembre 2026</strong>. L'iniziativa resta valida fino al 31/12/2026, ma la richiesta di apertura con il codice amico va fatta entro il 2 novembre: dopo quella data non si partecipa più."},
      {"q": "Quanto devo spendere e con quale carta?",
       "a": "Almeno 250€ entro il 31/12/2026, con la Carta di Debito Mastercard e/o la Carta di Credito Mastercard Gold. Vale la somma di più transazioni e le due carte si sommano fra loro."},
      {"q": "Quando arrivano i 75€?",
       "a": "Sul Conto Corrente Arancio entro il <strong>31 gennaio 2027</strong>. Nella pratica spesso arrivano prima, ma quella è la data che la banca si impegna a rispettare."},
      {"q": "Va bene il Conto Corrente Arancio Light?",
       "a": "No. Il bonus da nuovo cliente richiede l'<strong>Arancio Più</strong>. Con il Light puoi partecipare solo come presentatore, cioè invitando altri con il tuo codice."},
      {"q": "Conviene di più il codice amico o il codice UNDER30?",
       "a": "Dipende da te. Il codice amico dà 75€ a te e 75€ a chi ti ha invitato. Il codice UNDER30, se hai meno di 30 anni, dà 100€ a te e niente all'altro. Se ne inserisce uno solo. Noi te lo diciamo lo stesso: 25€ in più in tasca tua sono 25€ in più, e la scelta è tua."},
      {"q": "Il 4% sul Conto Arancio è compreso nel bonus?",
       "a": "No, sono due cose diverse. Il 4% è un'iniziativa separata valida fino al 31/01/2027, che chiede di aprire anche il Conto Arancio e di mantenere un accredito mensile: se salti un mese il tasso promozionale si perde e non si recupera. Per i 75€ il Conto Arancio non serve."},
      {"q": "Posso arrivare ai 250€ senza spendere davvero?",
       "a": "Si può, comprando con la carta ING dei voucher Aircash o MuchBetter e riportandosi poi i soldi sul proprio conto. Il regolamento di questa edizione non pubblica un elenco di operazioni escluse, quindi non è vietato, ma resta una zona grigia e la banca fa controlli prima di pagare. Se hai comunque 250€ di spese normali da fare entro dicembre, quella è la strada senza discussioni."},
      {"q": "Il conto ha un canone?",
       "a": "5€ al mese, azzerati con l'accredito dello stipendio o con entrate da almeno 1.000€ al mese. Fino ai 30 anni il primo Conto Corrente Arancio Più è gratuito senza altre condizioni."},
      {"q": "I soldi sul conto sono garantiti?",
       "a": "Sì, fino a 100.000€, ma dal sistema di garanzia olandese e non dal FITD italiano: stessa copertura prevista in tutta l'UE, fondo diverso."}
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
    "slug": "fineco", "capitale": 0,
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
      {"q": "Quanto vale il bonus Fineco oggi?",
       "a": "50€ sul conto corrente per chi apre con un Codice Amico, più altri 50€ a chi il codice te lo ha passato. È l’iniziativa «Invita un amico», riaperta il 15 settembre 2026 dopo la chiusura dell’edizione di luglio."},
      {"q": "Entro quando devo aprire il conto?",
       "a": "Entro il <strong>15 ottobre 2026</strong>. La finestra dura un mese esatto e non è stata prorogata al momento in cui scriviamo: le edizioni passate qualche volta lo sono state, ma non è una cosa su cui contare."},
      {"q": "Cosa devo fare per sbloccare i 50€?",
       "a": "Una cosa sola a scelta fra quattro, entro il <strong>4 gennaio 2027</strong>: accreditare stipendio o pensione, fare almeno 5 ordini trading in acquisto o vendita, oppure chiedere una carta di debito o credito e arrivare a 2.500€ di pagamenti. La quarta è trasferire almeno 20.000€ entro il 30/11/2026 e lasciarli lì fino al 4 gennaio."},
      {"q": "Qual è la strada più economica se non ho lo stipendio?",
       "a": "I 5 ordini. Fino ai 30 anni un ordine su azioni ed ETF Italia costa 2,95€: cinque ordini sono circa 15€ contro 50€ di bonus, e valgono anche le vendite, quindi puoi chiudere la posizione contando gli ordini di uscita. Stai però comprando strumenti veri: il rischio di mercato è tuo. La strada della carta chiede oltre 700€ al mese di spesa, quindi conviene solo se quella spesa la facevi comunque."},
      {"q": "Quanto arriva davvero in conto?",
       "a": "Il programma dice 50€ ed è quello che pubblichiamo. Sul bonus la banca applica la ritenuta del 26% prevista dall’art. 26 c. 2 del DPR 600/73, come ha fatto in tutte e tre le edizioni del 2026: l’accredito arriva al netto. Il regolamento di questa edizione non è ancora online; appena esce lo verifichiamo."},
      {"q": "Quando arrivano i soldi?",
       "a": "Nel 2027, e non in automatico. Dopo che hai completato la condizione, la banca mette a disposizione in area riservata un’integrazione contrattuale da firmare: solo dopo quella firma accredita il bonus. La finestra per firmare è chiusa e chi la salta perde tutto. Per questa edizione la data non è ancora pubblicata."},
      {"q": "Dove trovo un Codice Amico?",
       "a": "Te lo dà una persona che ha già il conto Fineco, dalla sua area riservata. Sul sito non ne pubblichiamo nessuno: scrivici su WhatsApp e te lo passiamo in privato."},
      {"q": "Posso usare il codice amico insieme a un codice promozionale trading?",
       "a": "No. Il campo del codice promozione è uno solo. Se ci metti uno di quei codici che regalano ordini gratuiti per qualche mese, il codice amico non ci sta e i 50€ non arrivano. Se fai molti ordini può convenirti l’altro: fatti il conto prima, perché dopo non si cambia."},
      {"q": "Il conto ha un canone?",
       "a": "Dipende dal profilo che scegli fra One, Classic e Max, e le condizioni complete stanno nei fogli informativi Fineco. Quello che vale per tutti sotto i 30 anni è la carta di debito a canone zero, il bollo gratis sotto i 5.000€ di giacenza media e le commissioni di trading ridotte."},
      {"q": "I soldi sul conto sono garantiti?",
       "a": "Sì, fino a 100.000€ dal Fondo Interbancario di Tutela dei Depositi. Fineco è una banca italiana vigilata direttamente dalla BCE, quindi qui la garanzia è quella italiana e non un fondo estero."}
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
    "slug": "buddybank", "capitale": 11,
    "name": "Buddybank",
    "category": "Banca",
    "logo": "logos/buddybank.png",
    "emoji": "🏦",
    "amount": 50,
    "currency": "€",
    "amountLabel": "50€",
    "boost": { "amount": 80, "amountLabel": "80€", "until": "2026-10-04" },
    "minutes": 10,
    "difficulty": "Facile",
    "badge": "Bonus maggiorato",
    "payout": "Entro 90 giorni, prelevabile",
    "deposit": "Ricarica 11€ + spesa da 10€",
    "expires": "2027-01-20",
    "updated": "2026-09-14",
    "featured": true,
    "countInTotal": true,
    "source": "https://www.buddy.unicredit.it/tutti-prodotti/conto-genius-buddy/",
    "seo_title": "Bonus Buddybank 80€ conto Genius buddy (codice amico) — guida 2026 | GoatLink",
    "summary": "Apri il conto Genius buddy con il codice amico, carica 11€ e fai un pagamento da almeno 10€ con la carta MyOne. Fino al 4 ottobre il bonus è maggiorato a 80€, poi torna a 50€. Soldi cash sul conto, prelevabili.",
    "code": "B2601MYZ1IMOBB",
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
      "Fino al <strong>4 ottobre 2026</strong> il bonus di benvenuto è maggiorato a <strong>80€</strong>. Dal 5 ottobre torna a 50€: la promozione resta aperta fino al 20/01/2027, cambia solo l'importo.",
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
      {"q": "Quanto vale davvero il bonus Buddybank adesso?",
       "a": "80€ per chi apre entro il <strong>4 ottobre 2026</strong>, poi 50€. La promozione resta comunque aperta fino al 20 gennaio 2027: cambia solo l'importo, non i requisiti."},
      {"q": "Quanto devo spendere per prenderlo?",
       "a": "Un solo pagamento da almeno 10€ con la carta MyOne, entro 30 giorni dall'apertura del conto. Il regolamento accetta anche più transazioni che sommate facciano 10€, ma un pagamento unico è la strada più pulita."},
      {"q": "Devo lasciare dei soldi fermi?",
       "a": "No, ma il saldo disponibile deve restare pari o superiore a zero dall'apertura del conto fino a quando arriva il premio. In pratica carichi 11€, ne spendi 10 e il resto lo lasci lì: non svuotare il conto mentre aspetti."},
      {"q": "Posso pagare con la carta virtuale prima che arrivi quella fisica?",
       "a": "Sì, l'acquisto si può fare con la MyOne virtuale caricata su Apple Pay, Google Pay o Samsung Pay. Quello che non puoi fare, né con la virtuale né con la fisica, è una ricarica verso un'altra carta: quelle operazioni sono escluse dal regolamento."},
      {"q": "Quando arriva il bonus?",
       "a": "Entro 90 giorni lavorativi dalla transazione valida. Arriva cash sul conto ed è prelevabile."},
      {"q": "Chi è escluso dalla promozione?",
       "a": "I vecchi clienti buddybank, i dipendenti del Gruppo UniCredit e chi al 16 settembre 2024 era già cliente UniCredit o buddy con conto corrente, prepagata o carta ricaricabile con IBAN Genius Pay. È escluso anche chi ha chiuso uno di questi rapporti prima o durante il periodo, anche se poi lo ha riaperto."},
      {"q": "Perché non devo usare SPID per registrarmi?",
       "a": "Perché la registrazione con SPID o CIEid si blocca durante la procedura e costringe a ricominciare. Con la registrazione classica e la scansione dei documenti il percorso fila."},
      {"q": "Il conto ha dei costi?",
       "a": "No. Il conto Genius buddy è gratuito e la carta MyOne in versione digitale è gratuita. La versione fisica ha un costo, ma per il bonus non serve."}
    ],
    "why": "Il bonus più alto rispetto allo sforzo richiesto: un pagamento da 10€ e hai finito, e fino al 4 ottobre vale 80€ invece di 50€.",
    "pros": [
      "80€ fino al 4 ottobre",
      "Un pagamento da 10€ e basta",
      "Soldi cash, prelevabili",
      "Conto e carta virtuale gratuiti"
    ]
  },
  {
    "slug": "bybit", "capitale": 100,
    "name": "Bybit",
    "category": "Crypto",
    "logo": "logos/bybit.png",
    "amount": 30,
    "currency": "€",
    "amountLabel": "30€ + 10€ con la carta",
    "minutes": 20,
    "difficulty": "Medio",
    "badge": "Due campagne attive",
    "payout": "BTC dopo 7 giorni, USDC dopo 14",
    "deposit": "100€ fermi per 14 giorni",
    "expires": "2026-11-02",
    "updated": "2026-09-17",
    "featured": false,
    "countInTotal": false,
    "source": null,
    "summary": "Su Bybit EU girano due campagne insieme e <strong>gli stessi 100€ valgono per entrambe</strong>: 30€ in Bitcoin come nuovo cliente, più fino a 100 USDC tenendo il saldo in USDC per 14 giorni. Con il minimo si chiude a circa 42€. Back On Track scade il 15/10, Road to VIP il 02/11.",
    "code": null,
    "steps": [
      "Registrati su <strong>Bybit EU</strong> dal link della campagna <strong>Road to VIP</strong>, usando l’email che terrai per sempre. Il link te lo passiamo su WhatsApp.",
      "Completa la verifica identità (KYC): documento + selfie, 5–10 minuti.",
      "Dalla pagina task di Bybit, aderisci a <strong>Road to VIP</strong>.",
      "Deposita almeno <strong>100€ sul conto Spot</strong> (bonifico SEPA gratuito o carta) e <strong>convertili in USDC</strong>. Su Derivatives o Earn il deposito non conta.",
      "Tieni i 100€ su Bybit per <strong>7 giorni</strong>: è la condizione del bonus di benvenuto da <strong>30€ in Bitcoin</strong>, che compare nel <strong>Rewards Hub</strong> (icona regalo). Fino ad allora non spostare fondi tra sotto-conti e non prelevare: entrambe le cose invalidano il bonus.",
      "<strong>Solo quando gli USDC sono già sul conto</strong>, apri il link <strong>Back On Track</strong> e premi Registrati ora. Da quel momento partono i 14 giorni: aprirlo prima significa bruciarne una parte con il saldo ancora vuoto.",
      "Mantieni per <strong>14 giorni</strong> il saldo medio della fascia che hai scelto: <strong>100 USDC → 12 USDC</strong>, 500 → 30, 1.000 → 50, 5.000 → 100. Bybit fotografa il saldo ogni sera alle <strong>23:59:59 UTC</strong> e fa la media dei 14 giorni.",
      "Con il minimo chiudi con <strong>30€ in Bitcoin + 12 USDC</strong>, cioè circa <strong>42€</strong>.",
      "<strong>Solo dopo aver ricevuto il bonus di benvenuto</strong>: ordina la Bybit Card <strong>virtuale</strong> (gratuita, la fisica costa 5€) e ricaricala con almeno <strong>100 USDC</strong> per sbloccare i <strong>10€</strong> di Card bonus."
    ],
    "rules_ok": [
      "L’entità con cui apri il conto è <strong>Bybit EU</strong>, autorizzata MiCA dall’autorità austriaca (FMA) e operativa in Italia in passaporto europeo: è un soggetto diverso da Bybit globale.",
      "Le due campagne <strong>convivono</strong>: gli stessi 100€ contano sia per il bonus di benvenuto sia per il saldo di Back On Track. Non devi depositare due volte.",
      "Il deposito resta tuo: lo stai parcheggiando, non spendendo. Dopo aver ricevuto i premi puoi prelevare liberamente.",
      "<strong>Inviti:</strong> 25€ in Bitcoin a te e 25€ all’amico, fino a <strong>20 amici ogni 30 giorni</strong>, cioè fino a 500€ al mese. L’amico deve registrarsi dal tuo referral, completare il KYC e depositare almeno 100€ entro 7 giorni.",
      "La Bybit Card non ha canone annuale né costi di inattività, e la versione virtuale è gratuita: per i 10€ è sufficiente quella.",
      "I 100 USDC della ricarica carta restano tuoi: il Card bonus è aggiuntivo, non è uno sconto sulla spesa.",
      "Pagando con la carta si converte crypto in euro con una commissione dello <strong>0,9%</strong>, e la conversione è fiscalmente una cessione: va dichiarata come le altre operazioni crypto."
    ],
    "rules_ko": [
      "<strong>L’ordine conta più di tutto.</strong> Se apri Back On Track prima di avere gli USDC sul conto, i 14 giorni partono lo stesso e i primi giorni entrano nella media con il saldo a zero: la fascia salta.",
      "Il requisito è un <strong>saldo medio</strong>, non un minimo. Bybit rileva il saldo ogni sera alle 23:59:59 UTC: un solo giorno sotto soglia abbassa la media e può farti scendere di fascia.",
      "<strong>Le fasce non si sommano.</strong> Vale quella il cui saldo medio hai effettivamente rispettato, non la somma dei premi sottostanti.",
      "Il pool da 120.000 USDC sul saldo viene distribuito <strong>in ordine di completamento dei 14 giorni, fino a esaurimento</strong>: chi parte tardi può restare fuori pur avendo fatto tutto correttamente.",
      "<strong>Back On Track sul trading non ha un premio fisso.</strong> È una quota di un pool da 30.000 USDC: 1 punto ogni 10$ di volume Spot, minimo 50 punti (500$ di volume), e il premio è i tuoi punti diviso i punti di tutti, moltiplicato per il pool. Più partecipanti ci sono, meno vale il punto: non è una cifra su cui fare conti.",
      "<strong>Road to VIP premia il volume di trading</strong>, da 5 a 800 USDC a fasce, con soglie indicate nella pagina task. Non è una casella da spuntare: è fare trading, con il rischio che comporta. I 30€ e i 12 USDC si prendono senza toccare questa parte.",
      "Non contano le operazioni a <strong>commissioni zero</strong>, annullate, invalidate o stornate.",
      "Per gli inviti, il deposito dell’amico è calcolato <strong>al netto dei prelievi</strong> fatti durante il periodo del task.",
      "Due scadenze diverse: <strong>Back On Track chiude il 15/10/2026</strong>, <strong>Road to VIP il 02/11/2026</strong>. I 14 giorni di saldo devono stare dentro la prima."
    ],
    "seo_title": "Bonus Bybit EU 30€ in Bitcoin + fino a 100 USDC — guida 2026 | GoatLink",
    "faq": [
      {"q": "Quanto prendo davvero con il minimo?",
       "a": "30€ in Bitcoin come bonus di benvenuto più 12 USDC dalla fascia base di Back On Track: circa 42€, con 100€ depositati che restano tuoi. Tutto il resto della promo (Road to VIP e il pool sul trading) dipende dal volume di trading che fai, quindi non è una cifra garantita."},
      {"q": "Devo per forza fare trading?",
       "a": "No. I 30€ in Bitcoin chiedono solo deposito e KYC, i 12 USDC chiedono solo di tenere il saldo fermo 14 giorni. Road to VIP e la parte trading di Back On Track sono in più e premiano il volume: se non fai già trading, puoi ignorarle e prendere comunque i 42€."},
      {"q": "300% APR vuol dire che i miei 100 USDC diventano 400?",
       "a": "No. L'APR è un rendimento espresso su base annuale, ma la promo dura 14 giorni: il premio è proporzionato alla durata ed è quello indicato in tabella, cioè 12 USDC sulla fascia da 100. La percentuale fa colpo, la cifra in euro è quella che conta."},
      {"q": "Perché non devo aprire subito il link di Back On Track?",
       "a": "Perché i 14 giorni partono nel momento in cui premi Registrati ora, non da quando arrivano i soldi. Se lo apri prima di aver convertito in USDC, i primi giorni entrano nella media con il saldo a zero e la media finale scende sotto la soglia della fascia."},
      {"q": "Cosa succede se un giorno scendo sotto la soglia?",
       "a": "Il requisito è la media dei 14 rilevamenti, fatti ogni sera alle 23:59:59 UTC. Un giorno sotto non ti esclude in automatico, ma abbassa la media: se la media finale sta sotto la soglia della fascia, scendi alla fascia inferiore o resti fuori. Tenere un piccolo margine sopra la soglia costa poco e toglie il problema."},
      {"q": "Posso sommare più fasce?",
       "a": "No, le fasce non si cumulano. Con un saldo medio da 1.000 USDC prendi i 50 USDC di quella fascia, non 12 + 30 + 50."},
      {"q": "Il premio sul trading di Back On Track quanto vale?",
       "a": "Non è determinabile in anticipo. Si accumula 1 punto ogni 10$ di volume Spot, servono almeno 50 punti (500$ di volume) per entrare, e poi il premio è la tua quota del pool da 30.000 USDC: i tuoi punti divisi per quelli di tutti i partecipanti. Se partecipa molta gente, la quota si assottiglia."},
      {"q": "Quanto valgono gli inviti?",
       "a": "25€ in Bitcoin a te e 25€ all'amico per ogni amico qualificato, fino a 20 amici ogni 30 giorni: al massimo 500€ al mese. L'amico deve registrarsi dal referral, fare il KYC e depositare almeno 100€ entro 7 giorni, e il deposito viene contato al netto dei prelievi fatti nel periodo."},
      {"q": "Entro quando devo muovermi?",
       "a": "Back On Track chiude il 15 ottobre 2026 e Road to VIP il 2 novembre 2026. Dato che i 14 giorni di saldo devono chiudersi dentro la prima scadenza, l'ultimo momento utile per partire con la parte USDC è l'inizio di ottobre."},
      {"q": "Bybit EU è regolamentata?",
       "a": "Sì. Bybit EU è autorizzata MiCA dall'autorità austriaca FMA e opera in Italia in passaporto europeo. È un soggetto giuridico diverso da Bybit globale: il conto che apri con questa promo è quello europeo."}
    ],
    "why": "Due campagne che girano insieme sugli stessi 100€: il bonus di benvenuto non chiede nulla oltre al deposito, e il saldo fermo 14 giorni aggiunge il resto senza che tu debba fare trading.",
    "pros": [
      "Stessi 100€ per due premi",
      "Circa 42€ senza fare trading",
      "Il deposito resta tuo",
      "Bybit EU autorizzata MiCA",
      "25€ per amico, fino a 20 al mese"
    ]
  },
  {
    "slug": "kast", "capitale": 105,
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
    "expires": null,
    "updated": "2026-09-14",
    "featured": false,
    "countInTotal": false,
    "source": null,
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
      "<strong>KAST non è una banca.</strong> È una fintech con sede a Singapore che si definisce società tecnologica appoggiata a istituti autorizzati, e non risulta pubblicamente un'autorizzazione europea propria — a differenza di Bitstack, che ha la licenza MiCA dell'AMF, o di Bybit EU, autorizzata dalla FMA austriaca. Lo scriviamo perché è la differenza che conta quando scegli dove mettere i soldi.",
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
      {"q": "Quanto vale il bonus KAST?",
       "a": "Dipende da quanto spendi con la carta: 20$ su 100$ di spesa, 50$ su 600$, 100$ su 1.600$ e 250$ su 6.600$. Il bonus è pagato in USDC."},
      {"q": "Quanto devo depositare?",
       "a": "Almeno 105€, in crypto oppure con bonifico. Il deposito non è una spesa: quei soldi restano sulla carta e li spendi tu."},
      {"q": "Entro quando devo fare la spesa?",
       "a": "Entro 7 giorni dalla registrazione per il bonus base da 20$. È la scadenza più stretta della promo: conviene registrarsi solo quando si è pronti a usare la carta."},
      {"q": "Quando posso prelevare il bonus?",
       "a": "La notifica arriva subito, ma il bonus diventa disponibile e prelevabile dopo 14 giorni."},
      {"q": "KAST è regolamentata in Europa?",
       "a": "KAST è una fintech di Singapore e si descrive come società tecnologica che si appoggia a istituti autorizzati, non come banca. Non risulta pubblicamente una sua autorizzazione europea, e dal 1° luglio 2026 il periodo transitorio del regolamento MiCA è chiuso. Se per te la posizione regolamentare è il criterio principale, Bitstack e Bybit EU hanno licenze verificabili e le trovi in catalogo."},
      {"q": "I miei soldi dove stanno?",
       "a": "In custodia di KAST: la carta è custodial, quindi i fondi depositati sono nelle sue mani e non su un wallet controllato da te. È il motivo per cui conviene tenerci solo la somma che serve a spendere."},
      {"q": "Perché il bonifico va fatto a una persona e non a un'azienda?",
       "a": "Perché l'IBAN che KAST fornisce per i depositi in euro è intestato al tuo stesso nome, con nazione Malta. È una configurazione lecita ma insolita, e la banca di partenza può chiedere chiarimenti sull'operazione. Se preferisci evitare la trafila, il deposito in crypto non ha questo passaggio."},
      {"q": "Che cashback ha la carta?",
       "a": "1,5% sugli acquisti nel piano gratuito, fino a 2.000 dollari di spesa al mese. I piani a pagamento salgono, ma per il bonus non servono."}
    ],
    "why": "È l'unico modo semplice per spendere stablecoin nei negozi di tutti i giorni, e il bonus sale insieme alla spesa invece di fermarsi a una cifra fissa.",
    "pros": [
      "Il bonus cresce con la spesa, fino a 250$",
      "Carta virtuale gratuita su Apple e Google Pay",
      "1,5% di cashback sul piano gratuito",
      "Inviti illimitati"
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

// Maggiorazioni a tempo: finche' la data non e' passata vale l'importo
// maggiorato, dopo il catalogo torna da solo a quello base. Nessuno deve
// ricordarsi di cambiarlo a mano.
BONUSES.forEach(function(b){
  if (b.boost && bonusStatus({ expires: b.boost.until }) === "active") {
    b.amount = b.boost.amount;
    b.amountLabel = b.boost.amountLabel;
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

# Contenuti GoatLink

Tutto quello che c'è in questa cartella è **generato da `data.js`** ogni mattina
(GitHub Action "Controlli sito", 06:17): non si modifica a mano, si cambia
`data.js` e i testi si aggiornano da soli.

| File | A cosa serve |
|---|---|
| `oggi.md` | Cosa pubblicare oggi, con i testi pronti. Arriva anche come commento nella issue **📅 Cosa pubblicare oggi** (notifica su app GitHub e mail). |
| `calendario.md` | I prossimi 14 giorni: scadenze, maggiorazioni, promo nuove o finite, contenuto del giorno. |
| `promo/<promo>.md` | Kit completo per ogni promo attiva: 2 copioni reel, caption, 3 storie, post per il canale, risposta WhatsApp, messaggi di sollecito, link con UTM. |
| `whatsapp-business.md` | Benvenuto, assenza, etichette e risposte rapide da caricare nell'app WhatsApp Business. |
| `stato.json` | Promo attive all'ultimo giro: serve a riconoscere quelle nuove e quelle appena finite. |

Regole fisse:
- codici e link di invito non compaiono mai qui: ci sono i segnaposto `[CODICE]` e `[LINK]`,
  che si completano solo dentro WhatsApp (il controllo automatico blocca il resto);
- l'importo è sempre quello dichiarato dal programma, maggiorazione compresa finché dura;
- ogni testo pubblico dice che chi condivide il codice può ricevere un premio;
- i link con `utm_source` fanno arrivare il messaggio WhatsApp con la fonte in coda
  (es. `[ig-buddybank-202610]`), così si contano i clienti per canale.

Rigenerare a mano: `python genera_contenuti.py` (prove su un'altra data: `--data 2026-11-16`).

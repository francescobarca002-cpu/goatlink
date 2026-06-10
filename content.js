GOATLINK — VERSIONE A PROVA DI ERRORE
======================================
Tutti i file stanno nello STESSO livello (nessuna sottocartella).
Cosi' il caricamento non puo' rompere la struttura: e' impossibile sbagliare.

SU GITHUB (repo collegato a Vercel)
-----------------------------------
1. Apri il tuo repo su github.com.
2. Cancella i file vecchi:
   - Per la cartella "bonus": aprila, elimina i file dentro, cosi' sparisce.
   - In alternativa lascia stare: i nuovi file la ignorano comunque.
   Il file importante e' che la HOME e le guide siano in radice.
3. "Add file" -> "Upload files".
4. Trascina TUTTI i file di questa cartella (NON la cartella, i file dentro).
5. "Commit changes".

Vercel ricostruisce da solo in 1-2 minuti.

VERIFICA
--------
Apri goatlink.it con CTRL+F5.
- La home mostra i bonus.
- Clicchi una card -> si apre la guida (es. goatlink.it/buddybank.html).

Se una guida non si apre, controlla che il file (es. buddybank.html)
sia presente in radice nel repo.

AGGIORNAMENTO 10/06/2026 (fix GoatLink)
---------------------------------------
Nuovi file da caricare insieme agli altri:
- termini.html, privacy.html, chi-siamo.html  (compila i campi [TRA PARENTESI]!)
Fix applicati a tutti i file esistenti:
- canonical/og/breadcrumb corretti (da /bonus/... a radice)
- percorsi loghi corretti (logos/ invece di ../logos/)
- sitemap completo (mancavano kast, trading212, skrill, fineco)
- footer con disclosure affiliazione corretta + link legali
- contatori della home precompilati (visibili anche senza JS)
NOTA: serve la cartella "logos/" nel repo con i png dei brand,
altrimenti restano le emoji di fallback (il sito funziona comunque).

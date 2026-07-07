/* GoatLink — messaggio WhatsApp automatico per pagina.
   Legge il nome del bonus dall'<h1> e precompila i link wa.me.
   Include una sola volta prima di </body>:  <script src="wa-message.js"></script>
   Override manuale opzionale:  <body data-bonus="Buddybank">  */
(function () {
  var WA = "393793719306";
  var override = document.body.getAttribute("data-bonus");
  var h1 = document.querySelector("h1");
  var nome = override
    ? override.trim()
    : (h1 ? h1.textContent.replace(/^Bonus\s+/i, "").replace(/\s+\d+([.,]\d+)?\s*€.*$/, "").trim() : "");
  var testo = nome
    ? "Ciao! Vorrei una mano con " + nome
    : "Ciao! Vorrei una mano con un bonus";
  var encoded = "?text=" + encodeURIComponent(testo);

  document.querySelectorAll('a[href*="wa.me/' + WA + '"]').forEach(function (a) {
    var href = a.getAttribute("href");
    var q = href.indexOf("?text=");
    if (q === -1) {
      a.setAttribute("href", href + encoded);            // nessun testo -> aggiungi
    } else if (/\?text=[A-Za-z]+$/.test(href)) {
      a.setAttribute("href", href.slice(0, q) + encoded); // testo "grezzo" (es. ?text=Buddybank) -> sostituisci
    }
    // se il link ha già un messaggio parlato (es. box codice), lo lascia intatto
  });
})();

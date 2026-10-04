/* GoatLink — scadenza automatica delle guide.
   Ogni guida porta la scadenza della promo in <body data-expires="AAAA-MM-GG">
   (scritta da genera_sito.py prendendola da data.js). Passata quella data,
   la guida mostra da sola l'avviso "promo terminata", come fa la home, senza
   che qualcuno debba ricordarsi di modificarla. */
(function () {
  var exp = document.body.getAttribute("data-expires");
  if (!exp || document.querySelector(".g-expired")) return;
  if (new Date(exp + "T23:59:59") >= new Date()) return;
  var main = document.querySelector("main.g-wrap");
  if (!main) return;
  var box = document.createElement("div");
  box.className = "g-expired";
  box.textContent = "⏰ Questa promo è terminata. Scrivici su WhatsApp per essere avvisato se torna.";
  main.insertBefore(box, main.firstChild);
  var tag = document.querySelector(".g-meta .exp");
  if (tag) {
    var p = exp.split("-");
    var mesi = ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
    tag.textContent = "Promo terminata il " + Number(p[2]) + " " + mesi[Number(p[1]) - 1] + " " + p[0];
  }
})();

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

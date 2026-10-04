// ============================================================
// GOATLINK — TRACKING UNICO v2 (banner open source + GA4 + pixel Meta)
// Banner: CookieConsent v3 (orestbida) — gratuito, senza limiti.
// ISTRUZIONI: sostituisci i DUE valori qui sotto, carica questo
// file nella radice del repo e aggiungi in ogni pagina HTML,
// subito dopo <meta name="viewport" ...>:
//   <script src="tracking.js"></script>
// Finché un ID resta "SOSTITUISCIMI" quel servizio non parte:
// il sito funziona comunque (e il banner appare lo stesso).
// ============================================================

var GL_TRACKING = {
  GA4_ID: "G-LGW6QKVWMW",     // da analytics.google.com (inizia con G-)
  META_PIXEL_ID: "SOSTITUISCIMI" // da Gestione Eventi Meta (solo numeri) — opzionale
};

(function () {
  function ok(v) { return v && v.indexOf("SOSTITUISCIMI") === -1; }

  // --- 1. Google Consent Mode v2: tutto NEGATO di default ---
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied",
    ad_personalization: "denied", analytics_storage: "denied",
    wait_for_update: 500
  });

  // --- 2. GA4: parte consent-aware (senza cookie finché non c'è ok) ---
  if (ok(GL_TRACKING.GA4_ID)) {
    var g = document.createElement("script");
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + GL_TRACKING.GA4_ID;
    g.async = true; document.head.appendChild(g);
    gtag("js", new Date());
    gtag("config", GL_TRACKING.GA4_ID, { anonymize_ip: true });
  }

  // --- 3. Pixel Meta: solo dopo consenso "marketing" ---
  function loadPixel() {
    if (!ok(GL_TRACKING.META_PIXEL_ID) || window._glPixelLoaded) return;
    window._glPixelLoaded = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", GL_TRACKING.META_PIXEL_ID);
    fbq("track", "PageView");
  }

  // --- 4. Banner CookieConsent v3 (open source) ---
  var css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css";
  document.head.appendChild(css);

  var cc = document.createElement("script");
  cc.src = "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js";
  cc.onload = function () {
    function applyConsent() {
      var an = CookieConsent.acceptedCategory("analytics");
      var mk = CookieConsent.acceptedCategory("marketing");
      gtag("consent", "update", {
        analytics_storage: an ? "granted" : "denied",
        ad_storage: mk ? "granted" : "denied",
        ad_user_data: mk ? "granted" : "denied",
        ad_personalization: mk ? "granted" : "denied"
      });
      if (mk) loadPixel();
    }
    CookieConsent.run({
      guiOptions: {
        consentModal: { layout: "box", position: "bottom right", equalWeightButtons: true },
        preferencesModal: { layout: "box" }
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
        marketing: {}
      },
      onConsent: applyConsent,
      onChange: applyConsent,
      language: {
        default: "it",
        translations: {
          it: {
            consentModal: {
              title: "Rispettiamo i tuoi dati 🐐",
              description: "Usiamo cookie tecnici per far funzionare il sito e, solo con il tuo consenso, cookie statistici e di marketing per capire cosa migliorare. Dettagli nella <a href=\"privacy.html\">Privacy & Cookie Policy</a>.",
              acceptAllBtn: "Accetta tutti",
              acceptNecessaryBtn: "Solo necessari",
              showPreferencesBtn: "Gestisci preferenze"
            },
            preferencesModal: {
              title: "Preferenze cookie",
              acceptAllBtn: "Accetta tutti",
              acceptNecessaryBtn: "Solo necessari",
              savePreferencesBtn: "Salva preferenze",
              closeIconLabel: "Chiudi",
              sections: [
                { title: "Cookie necessari", description: "Indispensabili per il funzionamento del sito. Sempre attivi.", linkedCategory: "necessary" },
                { title: "Statistiche (Google Analytics)", description: "Ci aiutano a capire quali guide vengono lette e cosa migliorare. Dati aggregati.", linkedCategory: "analytics" },
                { title: "Marketing (pixel Meta)", description: "Servono a misurare le nostre campagne pubblicitarie. Nessun dato bancario, mai.", linkedCategory: "marketing" },
                { title: "Maggiori informazioni", description: "Per qualsiasi domanda: <a href=\"privacy.html\">Privacy & Cookie Policy</a>." }
              ]
            }
          }
        }
      }
    });

    // Link "Preferenze cookie" aggiunto automaticamente nel footer
    var ft = document.querySelector("footer");
    if (ft) {
      var p = document.createElement("p");
      p.style.marginTop = "10px";
      var a = document.createElement("a");
      a.href = "#";
      a.textContent = "Preferenze cookie";
      a.addEventListener("click", function (e) { e.preventDefault(); CookieConsent.showPreferences(); });
      p.appendChild(a);
      ft.appendChild(p);
    }
  };
  document.head.appendChild(cc);
})();

// ============================================================
// FONTE DEI CONTATTI WHATSAPP
// Le campagne usano link con ?utm_source=...&utm_campaign=...
// La fonte resta in memoria per la visita (sessionStorage, nessun
// dato personale) e viene aggiunta in coda al messaggio WhatsApp
// precompilato, es. "Ciao! Vorrei il codice per il bonus BBVA [ig-ottobre]".
// Cosi' ogni contatto arriva gia' etichettato e i clienti portati dalle
// campagne si contano senza mescolarli con gli altri.
// In piu' ogni click su WhatsApp diventa un evento GA4
// ("contatto_whatsapp" / "canale_whatsapp"), inviato secondo il consenso.
// ============================================================
(function () {
  var KEY = "gl_fonte";
  var fonte = null;
  try {
    var q = new URLSearchParams(location.search);
    var s = q.get("utm_source"), c = q.get("utm_campaign");
    if (s) {
      fonte = (s + (c ? "-" + c : "")).toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
      sessionStorage.setItem(KEY, fonte);
    } else {
      fonte = sessionStorage.getItem(KEY);
    }
  } catch (e) { /* storage non disponibile: nessuna etichetta */ }

  function nomeBonus() {
    var o = document.body && document.body.getAttribute("data-bonus");
    if (o) return o.trim();
    var h1 = document.querySelector(".g-hero h1");
    return h1 ? h1.textContent.replace(/^Bonus\s+/i, "").replace(/\s+\d.*$/, "").trim() : "home";
  }

  function etichetta(a) {
    if (!fonte) return;
    var href = a.getAttribute("href") || "";
    var tag = " [" + fonte + "]";
    var i = href.indexOf("?text=");
    if (i === -1) {
      a.setAttribute("href", href + "?text=" + encodeURIComponent("Ciao! Vorrei una mano con un bonus" + tag));
      return;
    }
    var testo = decodeURIComponent(href.slice(i + 6).replace(/\+/g, " "));
    if (testo.indexOf(tag) !== -1) return;
    a.setAttribute("href", href.slice(0, i) + "?text=" + encodeURIComponent(testo + tag));
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me/"], a[href*="whatsapp.com/channel"]') : null;
    if (!a) return;
    var canale = a.href.indexOf("whatsapp.com/channel") !== -1;
    if (!canale) etichetta(a);
    if (typeof window.gtag === "function") {
      gtag("event", canale ? "canale_whatsapp" : "contatto_whatsapp", {
        bonus: nomeBonus(),
        fonte: fonte || "diretto",
        pagina: location.pathname
      });
    }
  }, true);
})();

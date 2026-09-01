/* ============================================================
   GoatLink — stato del percorso
   Unico posto in cui vive lo stato: lo usa index.html.

   Come funziona:
   - lo stato sta SOLO in localStorage, su questo dispositivo
   - nessun account, nessun server, nessuna dipendenza esterna
   - per passare da un dispositivo all'altro c'e' il codice di
     trasferimento (esporta/importa)

   Niente di quello che l'utente segna qui lascia il browser.
   Mai riconciliare con le conversioni affiliate: quella e' un'altra cosa.
   ============================================================ */
window.GL = (function () {
  'use strict';

  var KEY = 'gl_percorso_v2';
  var KEY_V1 = 'gl_percorso_v1';          // formato precedente, migrato al volo
  var STATI = { aperto: 1, fatto: 1, cliente: 1 };

  var stato = {};
  var ascoltatori = [];

  function oggi() { return new Date().toISOString().slice(0, 10); }

  /* ---------- normalizzazione e persistenza locale ---------- */

  // Accetta sia il formato vecchio ("ing":"fatto") sia il nuovo
  // ("ing":{s:"fatto",d:"2026-08-18"}) e butta via tutto il resto.
  function normalizza(o) {
    var out = {};
    if (!o || typeof o !== 'object' || Array.isArray(o)) return out;
    Object.keys(o).forEach(function (k) {
      var v = o[k];
      if (typeof v === 'string') {
        if (STATI[v]) out[k] = { s: v, d: null };
      } else if (v && typeof v === 'object' && STATI[v.s]) {
        out[k] = { s: v.s, d: typeof v.d === 'string' ? v.d : null };
        // a = data in cui il conto e' stato aperto. Sopravvive al passaggio
        // ad altri stati: serve al conto alla rovescia e a sapere quanto ci
        // ha messo davvero il bonus ad arrivare.
        if (typeof v.a === 'string') out[k].a = v.a;
      }
    });
    return out;
  }

  function leggiLocale() {
    try {
      var v2 = localStorage.getItem(KEY);
      if (v2) return normalizza(JSON.parse(v2));
      var v1 = localStorage.getItem(KEY_V1);
      if (v1) return normalizza(JSON.parse(v1));
    } catch (e) {}
    return {};
  }

  function salvaLocale() {
    try { localStorage.setItem(KEY, JSON.stringify(stato)); } catch (e) {}
  }

  /* ---------- eventi ---------- */
  function avvisa() {
    ascoltatori.forEach(function (f) { try { f(); } catch (e) {} });
  }

  /* ---------- API ---------- */

  function st(slug) {
    var v = stato[slug];
    return v && STATI[v.s] ? v.s : 'todo';
  }

  function quando(slug) {
    var v = stato[slug];
    return v && v.d ? v.d : null;
  }

  // Data in cui l'utente ha dichiarato di aver aperto il conto, se c'e'.
  function apertoIl(slug) {
    var v = stato[slug];
    if (!v) return null;
    return v.a || (v.s === 'aperto' ? v.d : null);
  }

  // Calcolo puro, senza effetti.
  // prom = blocco `promemoria` della promo, dal = data di apertura (YYYY-MM-DD).
  // Torna null se non c'e' una scadenza calcolabile.
  function scadenza(prom, dal) {
    if (!prom) return null;
    var date = [];
    if (prom.entro) date.push(prom.entro);
    if (prom.giorni && dal) {
      var t = new Date(dal + 'T00:00:00Z');
      if (!isNaN(t)) {
        t.setUTCDate(t.getUTCDate() + prom.giorni);
        date.push(t.toISOString().slice(0, 10));
      }
    }
    if (!date.length) return null;
    date.sort();
    var limite = date[0];                       // vince la scadenza piu' vicina
    var ms = new Date(limite + 'T23:59:59Z') - new Date(oggi() + 'T00:00:00Z');
    return {
      data: limite,
      giorni: Math.floor(ms / 86400000),        // negativo = gia' scaduta
      scaduta: ms < 0,
      incerta: !!prom.daVerificare
    };
  }

  function set(slug, s) {
    var prec = stato[slug];
    if (s === 'todo') delete stato[slug];
    else if (STATI[s]) {
      var nuovo = { s: s, d: oggi() };
      // Se il conto risultava gia' aperto, quella data resta: senza,
      // segnare "Preso" cancellerebbe l'unico dato che dice quanto
      // ci ha messo il bonus ad arrivare.
      var ap = (prec && (prec.a || (prec.s === 'aperto' ? prec.d : null))) ||
               (s === 'aperto' ? nuovo.d : null);
      if (ap) nuovo.a = ap;
      stato[slug] = nuovo;
    }
    else return;
    salvaLocale();
    avvisa();
  }

  function azzera() {
    stato = {};
    salvaLocale();
    avvisa();
  }

  function tutto() { return JSON.parse(JSON.stringify(stato)); }

  /* ---------- codice di trasferimento ----------
     Senza account, questo e' l'unico modo di passare il percorso
     da un dispositivo all'altro. Non e' un ripiego: e' la funzione. */
  function esporta() {
    return btoa(unescape(encodeURIComponent(JSON.stringify(stato))));
  }
  function importa(codice) {
    var o = JSON.parse(decodeURIComponent(escape(atob(String(codice).trim()))));
    var n = normalizza(o);
    if (!Object.keys(n).length) throw new Error('vuoto');
    stato = n;
    salvaLocale();
    avvisa();
  }

  /* ---------- avvio ---------- */

  stato = leggiLocale();

  return {
    st: st,
    quando: quando,
    apertoIl: apertoIl,
    scadenza: scadenza,
    set: set,
    azzera: azzera,
    tutto: tutto,
    esporta: esporta,
    importa: importa,
    onChange: function (f) { ascoltatori.push(f); },

    /* ---- compatibilita' ----
       L'area riservata non esiste piu'. Queste restano solo perche'
       altre pagine del sito potrebbero ancora chiamarle: rispondono
       sempre "nessun account" invece di far esplodere la pagina.
       Si possono togliere quando tutte le pagine sono state ripulite. */
    utente: function () { return null; },
    email:  function () { return null; },
    sync:   function () { return 'locale'; },
    attivo: function () { return false; },
    pronto: function () { return false; }
  };
})();

/* ============================================================
   GoatLink — stato del percorso
   Unico posto in cui vive lo stato: lo usano index.html e area.html.

   Come funziona:
   - lo stato sta SEMPRE in localStorage (funziona anche senza account)
   - se l'utente è loggato, viene anche sincronizzato su Supabase
   - senza chiavi configurate qui sotto, il file funziona lo stesso:
     salvataggio solo locale, area riservata disattivata

   Sul server finisce solo quello che l'utente dichiara.
   Mai riconciliare con le conversioni affiliate: quella è un'altra cosa.
   ============================================================ */
window.GL = (function () {
  'use strict';

  /* ---- CONFIGURAZIONE ----
     ambiente: 'dev' oppure 'prod'.
     Le chiavi qui sotto sono di goatlink-dev. Se questo file finisce
     su goatlink.it con ambiente 'dev', il login si spegne da solo:
     meglio l'area riservata disattivata che il sito pubblico che
     scrive nel database di prova. */
  var CFG = {
    ambiente: 'dev',
    url:  'https://roimjwbnnmlmhzxpxpgi.supabase.co',
    anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvaW1qd2Jubm1sbWh6eHB4cGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNDk0ODksImV4cCI6MjEwMjYyNTQ4OX0.W72eAlYOSYD9Wxs3LFoYaWoV4suwPGdziatjgmkPkOo'
                // chiave anon/public: sta in chiaro nel sorgente ed è
                // corretto così, a proteggere i dati è la RLS.
                // La service_role non deve MAI finire qui.
  };
  /* --------------------------------------------------------- */

  var KEY = 'gl_percorso_v2';
  var KEY_V1 = 'gl_percorso_v1';          // formato precedente, migrato al volo
  var STATI = { fatto: 1, cliente: 1 };

  var stato = {};
  var utente = null;
  var sb = null;
  var ascoltatori = [];
  var timerPush = null;
  var avvisato = false;
  var statoSync = 'locale';               // locale | attesa | sincronizzato | errore

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

  /* ---------- fusione locale + remoto ----------
     Serve al primo login: chi ha già segnato dei bonus da anonimo
     non deve perderli. A parità, vince il remoto. */
  function fondi(locale, remoto) {
    var out = {}, viste = {};
    [locale, remoto].forEach(function (src) {
      Object.keys(src).forEach(function (k) { viste[k] = 1; });
    });
    Object.keys(viste).forEach(function (k) {
      var a = locale[k], b = remoto[k];
      if (!a) { out[k] = b; return; }
      if (!b) { out[k] = a; return; }
      if (a.s === b.s) {
        // stesso stato: tengo la data più vecchia, è quella vera
        var date = [a.d, b.d].filter(Boolean).sort();
        out[k] = { s: a.s, d: date[0] || null };
        return;
      }
      // stati in conflitto: vince il segno più recente, a parità il remoto
      out[k] = (a.d || '') > (b.d || '') ? a : b;
    });
    return out;
  }

  /* ---------- Supabase ---------- */

  function configurato() {
    if (!(CFG.url && CFG.anon)) return false;
    // Salvagente: chiavi di prova su dominio pubblico = login spento.
    if (CFG.ambiente !== 'prod' && /(^|\.)goatlink\.it$/i.test(location.hostname)) {
      if (!avvisato) {
        avvisato = true;
        console.error('GoatLink: chiavi "' + CFG.ambiente + '" su dominio pubblico. ' +
          'Area riservata disattivata per non scrivere nel database di prova. ' +
          'Metti le chiavi di goatlink-prod e ambiente: "prod" in percorso.js.');
      }
      return false;
    }
    return true;
  }
  function disponibile() { return configurato() && !!window.supabase; }

  function client() {
    if (sb) return sb;
    if (!disponibile()) return null;
    sb = window.supabase.createClient(CFG.url, CFG.anon, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    return sb;
  }

  function pull() {
    var c = client();
    if (!c || !utente) return Promise.resolve(null);
    return c.from('percorsi').select('stato').eq('user_id', utente.id).maybeSingle()
      .then(function (r) {
        if (r.error) throw r.error;
        return r.data ? normalizza(r.data.stato) : {};
      });
  }

  function push() {
    var c = client();
    if (!c || !utente) return Promise.resolve();
    statoSync = 'attesa'; avvisa();
    return c.from('percorsi').upsert(
      { user_id: utente.id, stato: stato }, { onConflict: 'user_id' }
    ).then(function (r) {
      statoSync = r.error ? 'errore' : 'sincronizzato';
      avvisa();
    }, function () { statoSync = 'errore'; avvisa(); });
  }

  // Il salvataggio locale è immediato; quello remoto aspetta un attimo,
  // così chi spunta cinque bonus di fila fa una scrittura sola.
  function pushRitardato() {
    if (!utente) return;
    clearTimeout(timerPush);
    statoSync = 'attesa'; 
    timerPush = setTimeout(push, 900);
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

  function set(slug, s) {
    if (s === 'todo') delete stato[slug];
    else if (STATI[s]) stato[slug] = { s: s, d: oggi() };
    else return;
    salvaLocale();
    pushRitardato();
    avvisa();
  }

  function azzera() {
    stato = {};
    salvaLocale();
    pushRitardato();
    avvisa();
  }

  function tutto() { return JSON.parse(JSON.stringify(stato)); }

  /* codice di trasferimento: resta utile a chi non vuole l'account */
  function esporta() {
    return btoa(unescape(encodeURIComponent(JSON.stringify(stato))));
  }
  function importa(codice) {
    var o = JSON.parse(decodeURIComponent(escape(atob(String(codice).trim()))));
    var n = normalizza(o);
    if (!Object.keys(n).length) throw new Error('vuoto');
    stato = n;
    salvaLocale();
    pushRitardato();
    avvisa();
  }

  /* ---------- autenticazione ---------- */

  function login(email) {
    var c = client();
    if (!c) return Promise.reject(new Error('non configurato'));
    return c.auth.signInWithOtp({
      email: String(email).trim(),
      options: { emailRedirectTo: location.origin + '/area.html' }
    }).then(function (r) {
      if (r.error) throw r.error;
      return true;
    });
  }

  function logout() {
    var c = client();
    if (!c) return Promise.resolve();
    return c.auth.signOut().then(function () {
      utente = null;
      statoSync = 'locale';
      avvisa();
    });
  }

  // Cancella l'account sul server. Lo stato locale lo lasciamo:
  // l'utente ha chiesto di sparire dal server, non di perdere il
  // promemoria sul proprio telefono. Per quello c'è azzera().
  function cancellaAccount() {
    var c = client();
    if (!c || !utente) return Promise.reject(new Error('non loggato'));
    return c.rpc('cancella_account').then(function (r) {
      if (r.error) throw r.error;
      return c.auth.signOut();
    }).then(function () {
      utente = null;
      statoSync = 'locale';
      avvisa();
    });
  }

  /* ---------- avvio ---------- */

  stato = leggiLocale();

  function agganciaSessione(sessione) {
    var nuovo = sessione && sessione.user ? sessione.user : null;
    var eraLoggato = !!utente;
    utente = nuovo;

    if (!utente) {
      statoSync = 'locale';
      avvisa();
      return;
    }
    if (eraLoggato) { avvisa(); return; }

    // primo aggancio della sessione: fondo il locale con il remoto
    statoSync = 'attesa'; avvisa();
    pull().then(function (remoto) {
      stato = fondi(stato, remoto || {});
      salvaLocale();
      avvisa();
      return push();
    }).catch(function () { statoSync = 'errore'; avvisa(); });
  }

  if (disponibile()) {
    var c = client();
    c.auth.getSession().then(function (r) {
      agganciaSessione(r && r.data ? r.data.session : null);
    });
    c.auth.onAuthStateChange(function (_evento, sessione) {
      agganciaSessione(sessione);
    });
  }

  return {
    st: st,
    quando: quando,
    set: set,
    azzera: azzera,
    tutto: tutto,
    esporta: esporta,
    importa: importa,
    login: login,
    logout: logout,
    cancellaAccount: cancellaAccount,
    utente: function () { return utente; },
    email: function () { return utente ? utente.email : null; },
    sync: function () { return statoSync; },
    attivo: configurato,       // login previsto dalla configurazione
    pronto: disponibile,       // libreria caricata e chiavi presenti
    onChange: function (f) { ascoltatori.push(f); }
  };
})();

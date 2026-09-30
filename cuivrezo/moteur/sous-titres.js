/* =====================================================================
   sous-titres.js — le texte de la voix, dans une bulle discrète
   ---------------------------------------------------------------------
   Pendant que le professeur parle, la phrase en cours s'affiche dans une
   petite bulle, posée dans le coin bas qui cache le moins d'images :
   l'élève lit ce qu'il entend. La bulle
   se déplace au doigt ou à la souris, se replie en un bouton « Texte »,
   et ces deux choix sont retenus. Elle disparaît quand la voix se tait.

   Source : les événements pilotevoix:debut / fin / annulation de voix.js.
   Un lecteur qui n'y passe pas peut appeler PiloteSousTitres.montrer().
   ===================================================================== */
(function () {
  "use strict";

  if (window.PiloteSousTitres) return;

  var CLE = "inerweb-sous-titres";
  var CARACTERES_PAR_SECONDE = 14; /* voix du navigateur, débit 1 : estimation */

  var reglages = lire();
  var bulle = null;
  var zone = null;
  var bouton = null;
  var phrases = [];
  var bornes = [];
  var audio = null;
  var debut = 0;
  var debit = 1;
  var minuterie = null;
  var extinction = null;
  var courante = -1;

  function lire() {
    try { return JSON.parse(localStorage.getItem(CLE)) || {}; } catch (_) { return {}; }
  }

  function ecrire() {
    try { localStorage.setItem(CLE, JSON.stringify(reglages)); } catch (_) { /* navigation privée */ }
  }

  /* une phrase par bulle ; une phrase trop longue se coupe à ses « ; » et « : » */
  function decouper(texte) {
    var phrasesEntieres = String(texte).match(/[^.!?…]+(?:[.!?…]+[»")\]]*|$)/g) || [texte];
    var morceaux = [];
    phrasesEntieres.forEach(function (p) {
      if (p.length <= 160) { morceaux.push(p); return; }
      morceaux.push.apply(morceaux, p.match(/[^;:]+(?:[;:]+|$)/g) || [p]);
    });
    return morceaux.map(function (m) { return m.trim(); }).filter(Boolean);
  }

  function styler() {
    var style = document.createElement("style");
    style.textContent =
      ".pst{position:fixed;left:16px;bottom:16px;z-index:2147483000;max-width:min(380px,calc(100vw - 96px));" +
      "background:rgba(255,255,255,.96);color:#1d2a38;border-left:4px solid #1B3A63;border-radius:12px;" +
      "box-shadow:0 4px 18px rgba(27,58,99,.22);font:500 17px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;" +
      "box-sizing:border-box;padding:10px 34px 10px 14px;touch-action:none;cursor:grab;transition:opacity .35s}" +
      ".pst[hidden]{display:none}.pst.pst-eteinte{opacity:0}" +
      ".pst-texte{margin:0}" +
      ".pst-fermer{position:absolute;top:4px;right:4px;width:26px;height:26px;border:0;border-radius:50%;" +
      "background:transparent;color:#5a6b7d;font:600 16px/1 system-ui,sans-serif;cursor:pointer}" +
      ".pst-fermer:hover,.pst-fermer:focus-visible{background:#eef2f6;color:#1B3A63}" +
      ".pst-ouvrir{position:fixed;left:16px;bottom:16px;z-index:2147483000;border:1px solid #d6dee7;border-radius:999px;" +
      "background:#fff;color:#1B3A63;font:600 14px/1 system-ui,sans-serif;padding:8px 12px;cursor:pointer;" +
      "box-shadow:0 2px 10px rgba(27,58,99,.15)}.pst-ouvrir[hidden]{display:none}" +
      "@media (max-width:600px){.pst{max-width:calc(100vw - 48px);font-size:16px}}" +
      "@media print{.pst,.pst-ouvrir{display:none!important}}";
    document.head.appendChild(style);
  }

  function construire() {
    if (bulle) return;
    styler();
    bulle = document.createElement("div");
    bulle.className = "pst";
    bulle.hidden = true;
    bulle.setAttribute("role", "region");
    bulle.setAttribute("aria-label", "Texte de la voix");
    bulle.title = "Glissez pour déplacer";
    zone = document.createElement("p");
    zone.className = "pst-texte";
    var fermer = document.createElement("button");
    fermer.type = "button";
    fermer.className = "pst-fermer";
    fermer.setAttribute("aria-label", "Masquer le texte");
    fermer.textContent = "×";
    fermer.addEventListener("click", function () { replier(true); });
    bulle.appendChild(zone);
    bulle.appendChild(fermer);

    bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "pst-ouvrir";
    bouton.hidden = true;
    bouton.textContent = "Texte";
    bouton.setAttribute("aria-label", "Afficher le texte de la voix");
    bouton.addEventListener("click", function () { replier(false); });

    document.body.appendChild(bulle);
    document.body.appendChild(bouton);
    placer();
    deplacable();
  }

  function placer() {
    if (!reglages.x && reglages.x !== 0) return;
    var x = Math.max(0, Math.min(reglages.x, 1)) * window.innerWidth;
    var y = Math.max(0, Math.min(reglages.y, 1)) * window.innerHeight;
    [bulle, bouton].forEach(function (el) {
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.bottom = "auto";
      el.style.right = "";
    });
    borner();
  }

  /* sans position choisie par l'élève : le coin bas qui recouvre le moins d'images et de
     boutons ; si une barre de boutons occupe le bas, la bulle remonte au-dessus */
  function choisirCoin() {
    if (reglages.x || reglages.x === 0 || bulle.hidden) return;
    var telephone = window.innerWidth <= 600; /* pleine largeur, à gauche seulement */
    var l = bulle.offsetWidth, h = bulle.offsetHeight;
    var coins = telephone ? [16] : [16, window.innerWidth - 88 - l]; /* à droite, la place du bouton « Aa » */
    var meilleur = { x: 16, bas: 16 }, moindre = Infinity;
    bulle.style.visibility = "hidden";
    [16, 76, 136, 196].forEach(function (bas) {
      var y = window.innerHeight - bas - h;
      coins.forEach(function (x) {
        var recouvert = 0;
        for (var i = 0; i < 5; i += 1) {
          for (var j = 0; j < 3; j += 1) {
            var el = document.elementFromPoint(x + l * (i + 0.5) / 5, y + h * (j + 0.5) / 3);
            if (el && el.closest("img,svg,canvas,video,iframe,picture,button,input,select,a")) recouvert += 1;
          }
        }
        if (recouvert < moindre) { moindre = recouvert; meilleur = { x: x, bas: bas }; }
      });
    });
    bulle.style.visibility = "";
    var gauche = meilleur.x === 16;
    bulle.style.left = meilleur.x + "px";
    bouton.style.left = gauche ? "16px" : "auto";
    bouton.style.right = gauche ? "" : "88px";
    [bulle, bouton].forEach(function (el) { el.style.top = ""; el.style.bottom = meilleur.bas + "px"; });
  }

  function borner() {
    if (bulle.hidden || !bulle.style.top) return;
    var r = bulle.getBoundingClientRect();
    var x = Math.max(4, Math.min(r.left, window.innerWidth - r.width - 4));
    var y = Math.max(4, Math.min(r.top, window.innerHeight - r.height - 4));
    bulle.style.left = x + "px";
    bulle.style.top = y + "px";
  }

  function deplacable() {
    var depart = null;
    bulle.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".pst-fermer")) return;
      var r = bulle.getBoundingClientRect();
      depart = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      bulle.setPointerCapture(e.pointerId);
      bulle.style.cursor = "grabbing";
    });
    bulle.addEventListener("pointermove", function (e) {
      if (!depart) return;
      var x = Math.max(4, Math.min(e.clientX - depart.dx, window.innerWidth - bulle.offsetWidth - 4));
      var y = Math.max(4, Math.min(e.clientY - depart.dy, window.innerHeight - bulle.offsetHeight - 4));
      [bulle, bouton].forEach(function (el) {
        el.style.left = x + "px";
        el.style.top = y + "px";
        el.style.bottom = "auto";
        el.style.right = "";
      });
    });
    bulle.addEventListener("pointerup", function () {
      if (!depart) return;
      depart = null;
      bulle.style.cursor = "";
      var r = bulle.getBoundingClientRect();
      reglages.x = r.left / window.innerWidth;
      reglages.y = r.top / window.innerHeight;
      ecrire();
    });
    window.addEventListener("resize", function () { if (bulle) placer(); });
  }

  function replier(oui) {
    reglages.replie = oui;
    ecrire();
    afficher();
    choisirCoin();
  }

  function afficher() {
    var parle = phrases.length > 0;
    bulle.hidden = !parle || !!reglages.replie;
    bouton.hidden = !parle || !reglages.replie;
    if (!bulle.hidden) borner();
  }

  function position() {
    var total = bornes[bornes.length - 1] || 1;
    if (audio) {
      if (!(audio.duration > 0)) return 0;
      return Math.min(1, audio.currentTime / audio.duration) * total;
    }
    return ((Date.now() - debut) / 1000) * CARACTERES_PAR_SECONDE * debit;
  }

  function suivre() {
    var p = position();
    var i = 0;
    while (i < bornes.length - 1 && p >= bornes[i]) i += 1;
    if (i !== courante) {
      courante = i;
      zone.textContent = phrases[i];
      borner();
    }
  }

  function montrer(texte, options) {
    if (!texte || !document.body) return;
    construire();
    window.clearTimeout(extinction);
    window.clearInterval(minuterie);
    phrases = decouper(texte);
    var cumul = 0;
    bornes = phrases.map(function (p) { cumul += p.length + 1; return cumul; });
    audio = options && options.audio || null;
    debit = options && Number(options.debit) > 0 ? Number(options.debit) : 1;
    debut = Date.now();
    courante = -1;
    bulle.classList.remove("pst-eteinte");
    afficher();
    suivre();
    choisirCoin();
    minuterie = window.setInterval(suivre, 200);
  }

  function cacher() {
    if (!bulle) return;
    window.clearInterval(minuterie);
    bulle.classList.add("pst-eteinte");
    extinction = window.setTimeout(function () {
      phrases = [];
      audio = null;
      bulle.classList.remove("pst-eteinte");
      afficher();
    }, 1200);
  }

  document.addEventListener("pilotevoix:debut", function (e) {
    var d = e.detail || {};
    if (d.interne) return; /* les répliques du mode professeur sont déjà écrites à l'écran */
    var voix = window.PiloteVoix;
    montrer(d.texte, { audio: voix && voix.audioEnCours ? voix.audioEnCours() : null, debit: d.debit });
  });
  document.addEventListener("pilotevoix:fin", function (e) { if (!(e.detail || {}).interne) cacher(); });
  document.addEventListener("pilotevoix:annulation", cacher);
  document.addEventListener("pilotevoix:erreur", cacher);

  window.PiloteSousTitres = { montrer: montrer, cacher: cacher };
})();

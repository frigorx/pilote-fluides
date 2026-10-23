/* =====================================================================
   agrandir.js — « ⤢ Agrandir » : le schéma en plein écran, sur téléphone
   ---------------------------------------------------------------------
   POURQUOI (mesure du 08/10/2026, outils/mobile-ecrans.mjs) : sur un
   téléphone de 375 px, 82 stations thermo-techno sur 101 affichent des
   libellés de schéma sous 10 px (médiane 5 px, pire 1,9 px). Le téléphone
   ne rame pas, il RÉDUIT un dessin fait pour 800 à 1 060 unités de large.

   CE QUE FAIT LE SCRIPT, sans retoucher aucun dessin :
   · repère les grands schémas (SVG dont un texte s'affiche sous 12 px,
     canvas de plus de 200 px) ;
   · pose un bouton « ⤢ Agrandir » à leur coin haut droit, tant qu'on les voit ;
   · ouvre une COPIE VIVANTE en plein écran, tournée en paysage si le
     téléphone est tenu droit ; on y zoome avec deux doigts. La page n'est
     jamais déplacée ni modifiée : un SVG est recopié à chaque changement
     (les animations continuent), un canvas est recopié image par image.
   Actif seulement sur petit écran ou écran tactile.
   PILOTE (08/10/2026) : chargé par 3 stations ; à étendre après essai.
   AUDIT TÉLÉPHONE (23/10/2026) : moteur/retour-accueil.js le charge sur toute page
   en dessous de 760 px de large. Là seulement : le bouton se pose dans un coin
   qui ne recouvre AUCUNE commande (bouton, lien, champ, « Aa »), et la vue
   agrandie dit « Tournez le téléphone pour voir en grand » quand il est tenu droit.
   ===================================================================== */
(function () {
  "use strict";
  if (window.__iwAgrandir) return; // double chargement (page + retour-accueil.js) : inoffensif
  window.__iwAgrandir = true;
  var petit = window.matchMedia("(max-width: 900px), (pointer: coarse)");
  var tel = window.matchMedia("(max-width: 760px)"); // téléphone : seul cas où le bouton évite les commandes
  var cibles = [], bouton = null, courante = null, voile = null, arret = null, retour = null;
  var COMMANDES = "button,a[href],input:not([type=hidden]),select,textarea,summary,[role=button],[onclick],[tabindex]:not([tabindex='-1'])";

  function petitTexte(svg) {
    var textes = svg.querySelectorAll("text");
    for (var i = 0; i < textes.length && i < 80; i++) {
      var t = textes[i], m = t.getScreenCTM();
      if (!m || !t.textContent.trim()) continue;
      var px = parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b);
      if (px > 0 && px < 12) return true;
    }
    return false;
  }

  function chercher() {
    cibles = Array.prototype.filter.call(document.querySelectorAll("svg, canvas"), function (el) {
      if (el.closest(".iw-agrandi-voile") || (el.tagName.toLowerCase() === "svg" && el.parentElement && el.parentElement.closest("svg"))) return false;
      if (el.closest("button, a")) return false;
      var r = el.getBoundingClientRect();
      if (r.width < 200 || r.height < 110) return false;
      return el.tagName.toLowerCase() === "canvas" || petitTexte(el);
    });
    placer();
  }

  /* Téléphone : le rectangle (x, y, l, h) ne recouvre aucune commande visible et tombe sur le schéma. */
  function libre(x, y, l, h, cible) {
    var liste = document.querySelectorAll(COMMANDES);
    for (var i = 0; i < liste.length; i++) {
      var e = liste[i];
      if (e === bouton || e.contains(cible) || e.closest(".iw-agrandi-voile")) continue;
      var r = e.getBoundingClientRect();
      if (!r.width || !r.height || r.right <= x || r.left >= x + l || r.bottom <= y || r.top >= y + h) continue;
      var c = getComputedStyle(e);
      if (c.visibility === "hidden" || c.display === "none" || c.pointerEvents === "none") continue; // une zone de toucher transparente compte
      return false;
    }
    bouton.hidden = true; // le point sous le bouton doit appartenir au schéma (ou à son cadre), pas à une barre fixe
    var dessus = document.elementFromPoint(x + l / 2, y + h / 2);
    bouton.hidden = false;
    return !!dessus && (cible.contains(dessus) || dessus.contains(cible));
  }

  /* Le bouton suit le schéma le plus visible, à son coin haut droit. */
  function placer() {
    if (!bouton || voile) return;
    var mieux = null, part = 0;
    cibles.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var vu = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / Math.max(1, Math.min(r.height, innerHeight));
      if (r.width > 0 && vu > part) { part = vu; mieux = el; }
    });
    courante = part > 0.45 ? mieux : null;
    if (!courante) { bouton.hidden = true; return; }
    var r = courante.getBoundingClientRect();
    bouton.hidden = false;
    if (tel.matches) {
      var l = bouton.offsetWidth || 110, h = bouton.offsetHeight || 44, m = 6;
      var largeur = Math.min(innerWidth, document.documentElement.clientWidth || innerWidth); // une page qui déborde élargit innerWidth, pas l'écran
      var g = Math.max(r.left, 0) + m, d = Math.min(r.right, largeur) - l - m;
      var hau = Math.max(r.top, 0) + m, bas = Math.min(r.bottom, innerHeight) - h - m;
      var mil = (g + d) / 2;
      var essais = [[d, hau], [g, hau], [d, bas], [g, bas], [mil, hau], [mil, bas]];
      for (var k = 0; k < essais.length; k++) {
        var x = Math.max(8, Math.min(largeur - l - 8, essais[k][0])), y = Math.max(8, Math.min(innerHeight - h - 8, essais[k][1]));
        if (libre(x, y, l, h, courante)) {
          bouton.style.left = x + "px"; bouton.style.top = y + "px";
          return;
        }
      }
      bouton.hidden = true; // aucun coin libre : on ne recouvre jamais une commande
      return;
    }
    bouton.style.top = Math.max(8, Math.min(innerHeight - 52, r.top + 6)) + "px";
    bouton.style.left = Math.max(8, Math.min(innerWidth - bouton.offsetWidth - 8, r.right - bouton.offsetWidth - 6)) + "px";
  }

  function copier(el, hote) {
    var c;
    if (el.tagName.toLowerCase() === "canvas") {
      c = document.createElement("canvas");
      c.width = el.width; c.height = el.height;
      var dessiner = function () { try { c.getContext("2d").clearRect(0, 0, c.width, c.height); c.getContext("2d").drawImage(el, 0, 0); } catch (e) {} };
      dessiner();
      var tour = setInterval(dessiner, 66);
      arret = function () { clearInterval(tour); };
    } else {
      var r = el.getBoundingClientRect();
      var vb = el.getAttribute("viewBox") ||
        ("0 0 " + (parseFloat(el.getAttribute("width")) || r.width) + " " + (parseFloat(el.getAttribute("height")) || r.height));
      var refaire = function () {
        var n = el.cloneNode(true);
        n.setAttribute("viewBox", vb);
        n.removeAttribute("width"); n.removeAttribute("height"); n.removeAttribute("style");
        n.removeAttribute("id");
        if (c) hote.replaceChild(n, c); else hote.appendChild(n);
        c = n;
      };
      refaire();
      /* Recopie seulement quand le dessin change (animation pilotée par le
         script de la station) ; une animation CSS ou SMIL vit seule. */
      var attente = false;
      var obs = new MutationObserver(function () {
        if (attente) return;
        attente = true;
        setTimeout(function () { attente = false; refaire(); }, 66);
      });
      obs.observe(el, { attributes: true, childList: true, subtree: true, characterData: true });
      arret = function () { obs.disconnect(); };
      return;
    }
    hote.appendChild(c);
  }

  function ouvrir() {
    if (!courante) return;
    var el = courante, r = el.getBoundingClientRect();
    var tourner = innerHeight > innerWidth && r.width / Math.max(1, r.height) > 1.15;
    voile = document.createElement("div");
    voile.className = "iw-agrandi-voile";
    voile.setAttribute("role", "dialog");
    voile.setAttribute("aria-label", "Schéma agrandi");
    var hote = document.createElement("div");
    hote.className = "iw-agrandi-hote" + (tourner ? " iw-tourne" : "");
    var fermer = document.createElement("button");
    fermer.type = "button";
    fermer.className = "iw-agrandi-fermer";
    fermer.textContent = "✕ Fermer";
    fermer.addEventListener("click", clore);
    voile.appendChild(hote);
    voile.appendChild(fermer);
    if (tel.matches) {
      /* Tenu droit : la copie est tournée ; l'élève est invité à tourner le téléphone, et s'il le tourne
         la copie se redresse. Le conseil s'efface au bout de 6 s. */
      var ratio = r.width / Math.max(1, r.height);
      var conseil = document.createElement("p");
      conseil.className = "iw-agrandi-conseil";
      conseil.textContent = "Tournez le téléphone pour voir en grand";
      voile.appendChild(conseil);
      var pause = setTimeout(function () { conseil.hidden = true; }, 6000);
      var orienter = function () {
        var droit = innerHeight > innerWidth && ratio > 1.15;
        hote.classList.toggle("iw-tourne", droit);
        if (!droit) conseil.hidden = true;
      };
      window.addEventListener("resize", orienter);
      retour = function () { clearTimeout(pause); window.removeEventListener("resize", orienter); };
    }
    document.body.appendChild(voile);
    copier(el, hote);
    bouton.hidden = true;
    document.documentElement.classList.add("iw-agrandi-ouvert");
    fermer.focus();
  }

  function clore() {
    if (retour) { retour(); retour = null; }
    if (arret) { arret(); arret = null; }
    if (voile) { voile.remove(); voile = null; }
    document.documentElement.classList.remove("iw-agrandi-ouvert");
    placer();
  }

  function demarrer() {
    if (!petit.matches || bouton) return;
    var style = document.createElement("style");
    style.textContent =
      ".iw-agrandir{position:fixed;z-index:2147483000;padding:8px 12px;min-height:44px;border:2px solid #fffdf8;border-radius:10px;background:#1b3a63;color:#fffdf8;font:700 15px Calibri,'Segoe UI',system-ui,sans-serif;box-shadow:0 3px 12px rgba(0,0,0,.28);cursor:pointer}" +
      ".iw-agrandir[hidden]{display:none}" +
      ".iw-agrandi-voile{position:fixed;inset:0;z-index:2147483001;background:#fffdf8;overflow:hidden}" +
      ".iw-agrandi-hote{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:8px}" +
      ".iw-agrandi-hote.iw-tourne{inset:auto;top:50%;left:50%;width:100vh;height:100vw;transform:translate(-50%,-50%) rotate(90deg)}" +
      ".iw-agrandi-hote>svg,.iw-agrandi-hote>canvas{width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;display:block}" +
      ".iw-agrandi-fermer{position:absolute;top:calc(8px + env(safe-area-inset-top));right:8px;z-index:2;min-height:44px;padding:8px 14px;border:2px solid #1b3a63;border-radius:10px;background:#fffdf8;color:#1b3a63;font:700 16px Calibri,'Segoe UI',system-ui,sans-serif}" +
      "html.iw-agrandi-ouvert,html.iw-agrandi-ouvert body{overflow:hidden}" +
      ".iw-agrandi-conseil{position:absolute;left:8px;bottom:calc(8px + env(safe-area-inset-bottom));z-index:2;margin:0;max-width:calc(100% - 16px);padding:8px 12px;border-radius:10px;background:#1b3a63;color:#fffdf8;font:700 15px/1.3 Calibri,'Segoe UI',system-ui,sans-serif;pointer-events:none}" +
      ".iw-agrandi-conseil[hidden]{display:none}";
    document.head.appendChild(style);
    bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "iw-agrandir";
    bouton.textContent = "⤢ Agrandir";
    bouton.setAttribute("aria-label", "Agrandir le schéma en plein écran");
    bouton.hidden = true;
    bouton.addEventListener("click", ouvrir);
    document.body.appendChild(bouton);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && voile) clore(); });
    var image = 0;
    window.addEventListener("scroll", function () {
      if (!tel.matches) return placer();
      if (!image) image = requestAnimationFrame(function () { image = 0; placer(); });
    }, { passive: true });
    window.addEventListener("resize", chercher);
    /* Les stations changent d'écran sans recharger : on recherche les
       schémas quand la page change, au plus deux fois par seconde. */
    var prevu = false;
    new MutationObserver(function (liste) {
      if (prevu || voile) return;
      if (liste.every(function (m) { return m.target === bouton || (m.target.closest && m.target.closest("svg")); })) return;
      prevu = true;
      setTimeout(function () { prevu = false; chercher(); }, 500);
    }).observe(document.body, { childList: true, subtree: true });
    setTimeout(chercher, 300);
    /* Téléphone : la page se met en place après coup (polices, images, panneaux qui s'ouvrent) ; le bouton se
       replace donc de lui-même pour ne jamais recouvrir une commande qui vient d'apparaître. */
    var replacer = function () { if (tel.matches && !voile && !document.hidden) placer(); };
    setInterval(replacer, 250);
    document.addEventListener("transitionend", replacer, true);
    document.addEventListener("animationend", replacer, true);
    window.addEventListener("load", replacer);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
  petit.addEventListener && petit.addEventListener("change", demarrer);
})();

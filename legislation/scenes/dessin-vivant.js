/* =====================================================================
   dessin-vivant.js — les dessins fixes des écrans de Législation prennent vie
   (audit animation du 15/10/2026 : 325 dessins sur 456 étaient fixes)
   ---------------------------------------------------------------------
   Quand un écran devient actif (.slide.active), chacun de ses dessins
   <img src="…svg"> encore FIXE (ni @keyframes ni <animate> dedans) est
   remplacé par le même SVG intégré à la page (ses id préfixés), puis :
   · il se CONSTRUIT groupe par groupe : les commentaires du fichier SVG
     découpent le dessin dans l'ordre où la narration le décrit (gauche →
     droite, haut → bas) ; chaque groupe entre à son tour ;
   · il VIT ensuite : un pointillé fléché (un flux, une chaîne) avance
     dans le sens de sa flèche ; l'accent orange respire doucement.
     Un tireté sans flèche (une limite, un repère) ne bouge pas : le
     mouvement sert le mécanisme, jamais la décoration
     (CONSIGNES-ANIMATION.md).
   Rien n'est ajouté ni retiré : construit, le dessin est identique à
   l'original. Interrupteur « Animations » coupé ou mouvement réduit
   (moteur/animations.js) : le dessin s'affiche entier, immobile.
   Les dessins déjà animés ne sont pas touchés ; une erreur de chargement
   laisse l'image d'origine. Styles : scenes/scenes.css (« dessin vivant »).
   Chargé par chaque station : <script src="../../scenes/dessin-vivant.js" defer>.
   ===================================================================== */
(function () {
  "use strict";
  if (!window.fetch || !window.DOMParser) return;
  var NS = "http://www.w3.org/2000/svg";
  var ACCENT = /#(c9451a|ff6b35|e8914a|c0392b|d35400|e67e22)\b/i;
  var compteur = 0;
  var textes = {};

  function charger(url) {
    if (!textes[url]) textes[url] = fetch(url, { credentials: "same-origin" }).then(function (r) {
      if (!r.ok) throw new Error(r.status); return r.text();
    });
    return textes[url];
  }

  /* les id du SVG deviennent uniques dans la page : id, url(#…), href="#…", aria-labelledby/-describedby */
  function prefixer(svg, p) {
    var ids = {};
    Array.prototype.forEach.call(svg.querySelectorAll("[id]"), function (e) { ids[e.id] = p + e.id; e.id = p + e.id; });
    var refait = function (v) {
      return v.replace(/url\(\s*#([^)\s]+)\s*\)/g, function (m, id) { return ids[id] ? "url(#" + ids[id] + ")" : m; });
    };
    Array.prototype.forEach.call(svg.querySelectorAll("*"), function (e) {
      Array.prototype.forEach.call(e.attributes, function (a) {
        if ((a.name === "href" || a.name === "xlink:href") && a.value.charAt(0) === "#" && ids[a.value.slice(1)]) e.setAttribute(a.name, "#" + ids[a.value.slice(1)]);
        else if (a.name === "aria-labelledby" || a.name === "aria-describedby") e.setAttribute(a.name, a.value.split(/\s+/).map(function (t) { return ids[t] || t; }).join(" "));
        else if (a.value.indexOf("url(#") >= 0) e.setAttribute(a.name, refait(a.value));
      });
      if (e.tagName.toLowerCase() === "style") e.textContent = refait(e.textContent);
    });
    ["aria-labelledby", "aria-describedby"].forEach(function (n) {
      var v = svg.getAttribute(n); if (v) svg.setAttribute(n, v.split(/\s+/).map(function (t) { return ids[t] || t; }).join(" "));
    });
  }

  /* les groupes : un commentaire de premier niveau ouvre un nouveau groupe */
  function grouper(svg) {
    var garder = /^(title|desc|style|defs|metadata)$/i, groupes = [], courant = null;
    Array.prototype.slice.call(svg.childNodes).forEach(function (n) {
      if (n.nodeType === 8) { courant = null; return; }                       // commentaire : groupe suivant
      if (n.nodeType !== 1 || garder.test(n.tagName)) return;
      if (!courant) { courant = document.createElementNS(NS, "g"); courant.setAttribute("class", "dv-pas"); svg.insertBefore(courant, n); groupes.push(courant); }
      courant.appendChild(n);
    });
    groupes.forEach(function (g, i) { g.style.setProperty("--dv-i", String(i)); });
    return groupes.length;
  }

  /* ce qui vit : pointillés fléchés (flux), accents orange */
  function marquer(svg) {
    Array.prototype.forEach.call(svg.querySelectorAll("line, path, polyline"), function (e) {
      var cs = window.getComputedStyle(e), da = e.getAttribute("stroke-dasharray") || cs.strokeDasharray;
      var fleche = e.getAttribute("marker-end") || e.getAttribute("marker-start") || (cs.markerEnd && cs.markerEnd !== "none");
      if (da && da !== "none" && fleche) {
        var tour = da.split(/[\s,]+/).map(parseFloat).filter(function (x) { return x > 0; }).reduce(function (a, b) { return a + b; }, 0);
        if (tour > 0) { e.classList.add("dv-flux"); e.style.setProperty("--dv-tour", (e.getAttribute("marker-start") && !e.getAttribute("marker-end") ? tour : -tour) + "px"); }
      }
    });
    Array.prototype.forEach.call(svg.querySelectorAll("[fill], [stroke]"), function (e) {
      if (e.closest(".dv-flux")) return;
      if (ACCENT.test((e.getAttribute("fill") || "") + " " + (e.getAttribute("stroke") || "")) && !/^(text|tspan)$/i.test(e.tagName)) e.classList.add("dv-accent");
    });
  }

  function construire(svg) {
    svg.classList.remove("dv-construit");
    void svg.getBoundingClientRect();                                          // relance l'entrée en scène
    svg.classList.add("dv-construit");
  }

  function vivant(img) {
    if (img.dataset.dvFait) return;
    img.dataset.dvFait = "1";
    charger(img.src).then(function (txt) {
      if (/@keyframes|<animate|<script/i.test(txt)) return;                 // déjà animé (ou scripté) : on n'y touche pas
      var doc = new DOMParser().parseFromString(txt, "image/svg+xml"), src = doc.documentElement;
      if (!src || src.tagName.toLowerCase() !== "svg" || doc.querySelector("parsererror")) return;
      var svg = document.importNode(src, true);
      prefixer(svg, "dv" + (++compteur) + "-");
      if (grouper(svg) < 2) return;                                             // un seul bloc : rien à construire
      svg.setAttribute("class", ((svg.getAttribute("class") || "") + " dv-svg").trim());
      svg.removeAttribute("width"); svg.removeAttribute("height");
      if (!svg.getAttribute("role")) svg.setAttribute("role", "img");
      if (!svg.querySelector("title") && img.alt) svg.setAttribute("aria-label", img.alt);
      img.replaceWith(svg);
      marquer(svg);
      if (img.closest(".slide.active") || svg.closest(".slide.active")) construire(svg);
    }).catch(function () { /* l'image d'origine reste */ });
  }

  function surEcran(slide) {
    Array.prototype.forEach.call(slide.querySelectorAll("figure:not(.vignette) img[src*='.svg']"), vivant);
    Array.prototype.forEach.call(slide.querySelectorAll("svg.dv-svg"), construire);
  }

  function demarrer() {
    var slides = document.querySelectorAll(".slide");
    if (!slides.length) return;
    var obs = new MutationObserver(function (ms) {
      ms.forEach(function (m) { if (m.target.classList.contains("active")) surEcran(m.target); });
    });
    Array.prototype.forEach.call(slides, function (s) { obs.observe(s, { attributes: true, attributeFilter: ["class"] }); if (s.classList.contains("active")) surEcran(s); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer); else demarrer();
})();

/* =====================================================================
   scene-station.js — la vue des pièces dont parle l'écran
   ---------------------------------------------------------------------
   Pas de schéma : l'écran montre les APPAREILS tels qu'ils sont (images
   de synthèse des organes, déjà en ligne sur le site, voir SOURCES-IMAGES.md).
   app.js appelle SCENE_STATION.montrer(écran) à chaque écran :
     écran.scene = { imgs: ["compresseurs", "clapet"], t: "titre", d: "phrase" }
   Les clés renvoient à PH (défini en tête de app.js) : { src, alt, t }.
   Sans scène, la colonne disparaît et l'activité prend toute la largeur.
   ===================================================================== */
(function () {
  "use strict";
  const hote = document.getElementById("scene-lecon");
  if (!hote) return;
  hote.hidden = true;
  const rang = document.createElement("div");
  rang.className = "scene-photos";
  const legende = document.createElement("p");
  legende.className = "scene-legende-box";
  hote.appendChild(rang);
  hote.appendChild(legende);
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  window.SCENE_STATION = {
    montrer: function (item) {
      const s = item.scene;
      if (!s || !s.imgs || !s.imgs.length || typeof PH === "undefined") { hote.hidden = true; return; }
      rang.innerHTML = s.imgs.map((k) => PH[k] ? `<figure><img src="${esc(PH[k].src)}" alt="${esc(PH[k].alt)}"><figcaption>${esc(PH[k].t)}</figcaption></figure>` : "").join("");
      legende.innerHTML = (s.t ? "<strong>" + esc(s.t) + "</strong> " : "") + esc(s.d || "");
      hote.hidden = false;
    }
  };
})();

/* CONTRAT : pose le logo inerWeb compact (charte § 3.4, gabarit figé 400×50,
   cartouche « Hydro ») en tête de chaque `.topbar .brand` de la page et retire
   le rond « H » provisoire. marque.js détecte alors un logo d'en-tête
   (svg[aria-label^="inerWeb"]) et réserve son filigrane à l'impression.
   Autonome : aucun réseau, aucune dépendance. Orange du LOGO #e8914a, distinct
   de l'orange du contenu. */
(function () {
  "use strict";
  var SVG = '<svg class="logo-inerweb" viewBox="0 0 232 50" role="img" aria-label="inerWeb Hydro">' +
    '<text fill="#1b3a63" font-size="28px" x="4" y="34">❄️</text>' +
    '<text fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif" font-size="26px" font-weight="bold" x="44" y="32">iner</text>' +
    '<text fill="#1b3a63" font-family="Segoe Script, Brush Script MT, cursive" font-size="26px" x="94" y="32">Web</text>' +
    '<line stroke="#e8914a" stroke-width="2" x1="44" x2="150" y1="35" y2="35"/>' +
    '<rect fill="#e8914a" x="155" y="10" rx="5" ry="5" width="73" height="24"/>' +
    '<text fill="#ffffff" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="14px" font-weight="bold" x="191" y="27" text-anchor="middle">Hydro</text>' +
    "</svg>";
  var style = document.createElement("style");
  style.textContent = ".logo-inerweb{height:34px;width:auto;flex:0 0 auto;display:block}" +
    "@media (max-width:560px){.logo-inerweb{height:26px}}";
  document.head.appendChild(style);
  var marques = document.querySelectorAll(".topbar .brand");
  for (var i = 0; i < marques.length; i += 1) {
    var rond = marques[i].querySelector(".brand-mark, b[aria-hidden]");
    if (rond) rond.parentNode.removeChild(rond);
    marques[i].insertAdjacentHTML("afterbegin", SVG);
  }
})();

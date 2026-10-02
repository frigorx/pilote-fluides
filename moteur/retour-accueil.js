/* retour-accueil.js — logo inerWeb cliquable vers l'accueil, sur toute page.
   Source unique ; posé par build/retour-accueil.mjs. Si la page a déjà un lien
   vers l'accueil qui porte un logo (svg/img), ne fait rien. Sinon : fine barre
   blanche en tête de page (dans le flux, ne recouvre rien). Masqué à l'impression et dans les cadres intégrés. */
(function () {
  "use strict";
  if (window.top !== window) return;
  function lancer() {
    if (document.getElementById("inerweb-retour-accueil")) return;
    var s = document.currentScript || document.querySelector('script[src*="retour-accueil.js"]');
    var racine = s ? new URL(".", new URL(s.getAttribute("src"), location.href)).href.replace(/moteur\/$/, "") : location.origin + "/";
    var accueil = new URL("index.html", racine).href;
    var liens = document.querySelectorAll("a[href]");
    for (var i = 0; i < liens.length; i++) {
      var u;
      try { u = new URL(liens[i].getAttribute("href"), location.href); } catch (e) { continue; }
      var p = u.href.split("#")[0].split("?")[0];
      if ((p === accueil || p === racine) && liens[i].querySelector("svg,img")) return;
    }
    // Logo inerWeb déjà présent (svg/img nommé « iner… ») : on le rend cliquable vers l'accueil, pas de doublon.
    var logos = document.querySelectorAll('svg[aria-label*="iner" i],img[alt*="iner" i],svg.logo,img.logo');
    for (var j = 0; j < logos.length; j++) {
      var l = logos[j];
      if (l.getBoundingClientRect().top > 200) continue;
      var lien = l.closest("a");
      if (!lien) { lien = document.createElement("a"); l.parentNode.insertBefore(lien, l); lien.appendChild(l); }
      lien.href = accueil;
      lien.setAttribute("aria-label", "Retour à l’accueil inerWeb");
      lien.title = "Accueil inerWeb";
      return;
    }
    var st = document.createElement("style");
    st.textContent = "#inerweb-retour-accueil-barre{position:static;display:block;background:#fff;border-bottom:1px solid #c9d3df;padding:4px 10px;line-height:0}#inerweb-retour-accueil{display:inline-block;line-height:0}#inerweb-retour-accueil:focus-visible{outline:3px solid #e8914a;outline-offset:2px}@media print{#inerweb-retour-accueil-barre{display:none}}";
    document.head.appendChild(st);
    var a = document.createElement("a");
    a.id = "inerweb-retour-accueil";
    a.href = accueil;
    a.setAttribute("aria-label", "Retour à l’accueil inerWeb");
    a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219 50" width="110" height="25" aria-hidden="true" focusable="false"><text fill="#1b3a63" font-size="28px" x="4" y="34">&#10052;&#65039;</text><text fill="#1b3a63" font-family="Trebuchet MS,Trebuchet,sans-serif" font-size="26px" font-weight="bold" x="44" y="32">iner</text><text fill="#1b3a63" font-family="Segoe Script,Brush Script MT,cursive" font-size="26px" x="94" y="32">Web</text><line stroke="#e8914a" stroke-width="2" x1="44" x2="150" y1="35" y2="35"></line><rect fill="#e8914a" x="155" y="10" rx="5" ry="5" width="59" height="24"></rect><text fill="#fff" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="14px" font-weight="bold" x="184.5" y="27" text-anchor="middle">Édu</text></svg>';
    var b = document.createElement("div");
    b.id = "inerweb-retour-accueil-barre";
    b.appendChild(a);
    document.body.insertBefore(b, document.body.firstChild);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", lancer); else lancer();
})();

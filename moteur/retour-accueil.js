/* retour-accueil.js — sur toute page : un chemin de retour vers l'accueil ET vers le réseau.
   Source unique ; posé par build/retour-accueil.mjs, qui écrit sur la balise le réseau de la
   page : data-reseau-href (adresse RELATIVE À LA RACINE du site) et data-reseau-nom.
   06/10/2026 — F. Henninot : « toutes les pages doivent avoir un lien de retour au réseau et
   un lien de retour à la page d'accueil » (sur un film, on ne pouvait plus revenir au Studio).
   RÈGLES
   · l'accueil lui-même : rien ;
   · la page a déjà un lien-logo vers l'accueil (svg/img) ET un lien visible vers son réseau
     en haut de page : rien (son en-tête fait déjà le travail) ;
   · sinon, fine barre blanche en tête de page, dans le flux (ne recouvre rien) :
       [logo inerWeb .fr] › [🎬 inerWeb Studio]
     Le logo devient le texte « 🏠 inerweb.fr » quand la page porte déjà son propre logo
     (pas deux logos l'un sur l'autre). Une page sans réseau n'a que le retour à l'accueil.
   Masqué à l'impression et dans les cadres intégrés. */
(function () {
  "use strict";
  if (window.top !== window) return;
  // Lue tout de suite : `currentScript` n'existe que pendant l'exécution du script.
  var s = document.currentScript || document.querySelector('script[src*="retour-accueil.js"]');

  function lancer() {
    if (document.getElementById("inerweb-retour-accueil-barre")) return;
    var racine = s ? new URL(".", new URL(s.getAttribute("src"), location.href)).href.replace(/moteur\/$/, "") : location.origin + "/";
    var accueil = new URL("index.html", racine).href;
    // Adresse comparable : sans ancre, sans paramètres, « dossier/ » = « dossier/index.html ».
    function nu(h) {
      var u;
      try { u = new URL(h, location.href); } catch (e) { return null; }
      return u.href.split("#")[0].split("?")[0].replace(/index\.html$/, "");
    }
    var ici = nu(location.href);
    if (ici === nu(accueil)) return;

    var reseau = null;
    var rHref = s && s.getAttribute("data-reseau-href"), rNom = s && s.getAttribute("data-reseau-nom");
    if (rHref && rNom) {
      reseau = { href: new URL(rHref, racine).href, nom: rNom };
      if (nu(reseau.href) === ici) reseau = null; // la page d'entrée du réseau : l'accueil suffit
    }

    // En haut de page = dans les 400 premiers pixels du document, et visible.
    function enHaut(el) {
      if (!el.getClientRects().length) return false;
      return el.getBoundingClientRect().top + (window.scrollY || 0) < 400;
    }
    var logoAccueil = false, lienReseau = false;
    var liens = document.querySelectorAll("a[href]");
    for (var i = 0; i < liens.length; i++) {
      var p = nu(liens[i].getAttribute("href"));
      if (!p) continue;
      if ((p === nu(accueil) || p === racine) && liens[i].querySelector("svg,img")) logoAccueil = true;
      if (reseau && p === nu(reseau.href) && enHaut(liens[i])) lienReseau = true;
    }
    // Logo inerWeb déjà présent en haut (svg/img nommé « iner… ») mais sans lien : on le rend cliquable.
    if (!logoAccueil) {
      var logos = document.querySelectorAll('svg[aria-label*="iner" i],img[alt*="iner" i],svg.logo,img.logo');
      for (var j = 0; j < logos.length; j++) {
        var l = logos[j];
        if (l.getBoundingClientRect().top > 200) continue;
        var lien = l.closest("a");
        if (!lien) { lien = document.createElement("a"); l.parentNode.insertBefore(lien, l); lien.appendChild(l); }
        lien.href = accueil;
        lien.setAttribute("aria-label", "Retour à l’accueil inerweb.fr");
        lien.title = "Accueil inerweb.fr";
        logoAccueil = true;
        break;
      }
    }
    if (logoAccueil && (!reseau || lienReseau)) return;

    var st = document.createElement("style");
    st.textContent =
      "#inerweb-retour-accueil-barre{position:static;display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;background:#fff;border-bottom:1px solid #c9d3df;padding:4px 10px;" +
      "font:bold 15px/25px 'Trebuchet MS',Calibri,'Segoe UI',Arial,sans-serif}" +
      "#inerweb-retour-accueil-barre a{color:#1b3a63;text-decoration:none;display:inline-flex;align-items:center;line-height:25px}" +
      "#inerweb-retour-accueil-barre a:hover{text-decoration:underline}" +
      "#inerweb-retour-accueil-barre a:focus-visible{outline:3px solid #e8914a;outline-offset:2px}" +
      "#inerweb-retour-accueil-barre .sep{color:#5a6b7d;font-weight:normal}" +
      "@media print{#inerweb-retour-accueil-barre{display:none}}";
    document.head.appendChild(st);

    var b = document.createElement("nav");
    b.id = "inerweb-retour-accueil-barre";
    b.setAttribute("aria-label", "Retour");
    var a = document.createElement("a");
    a.id = "inerweb-retour-accueil";
    a.href = accueil;
    a.setAttribute("aria-label", "Retour à l’accueil inerweb.fr");
    a.title = "Accueil inerweb.fr";
    if (logoAccueil) a.textContent = "🏠 inerweb.fr";
    else a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219 50" width="110" height="25" aria-hidden="true" focusable="false"><text fill="#1b3a63" font-size="28px" x="4" y="34">&#10052;&#65039;</text><text fill="#1b3a63" font-family="Trebuchet MS,Trebuchet,sans-serif" font-size="26px" font-weight="bold" x="44" y="32">iner</text><text fill="#1b3a63" font-family="Segoe Script,Brush Script MT,cursive" font-size="26px" x="94" y="32">Web</text><line stroke="#e8914a" stroke-width="2" x1="44" x2="150" y1="35" y2="35"></line><rect fill="#e8914a" x="155" y="10" rx="5" ry="5" width="59" height="24"></rect><text fill="#fff" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="14px" font-weight="bold" x="184.5" y="27" text-anchor="middle">.fr</text></svg>';
    b.appendChild(a);
    if (reseau && !lienReseau) {
      var sep = document.createElement("span");
      sep.className = "sep";
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = "›";
      var r = document.createElement("a");
      r.id = "inerweb-retour-reseau";
      r.href = reseau.href;
      r.textContent = reseau.nom;
      r.title = "Retour au réseau : " + reseau.nom.replace(/^\W+\s*/, "");
      b.appendChild(sep);
      b.appendChild(r);
    }
    document.body.insertBefore(b, document.body.firstChild);

    /* Une barre FIXÉE de la page (les commandes de lecture des films, sur téléphone) peut
       recouvrir nos liens : on le constate au point même (elementFromPoint) et la barre de
       retour descend juste sous elle. Les lecteurs se montent après le chargement : on
       regarde plusieurs fois, et à chaque changement de taille. Un voile plein écran (plus
       de 40 % de la hauteur) n'est pas une barre : on ne le contourne pas. */
    function degager() {
      for (var tour = 0; tour < 3; tour++) {
        var bas = 0, liensBarre = b.querySelectorAll("a");
        for (var k = 0; k < liensBarre.length; k++) {
          var rl = liensBarre[k].getBoundingClientRect();
          if (rl.bottom <= 0 || rl.top >= innerHeight || !rl.width) continue;
          var dessus = document.elementFromPoint(rl.left + Math.min(rl.width / 2, 40), rl.top + rl.height / 2);
          if (!dessus || b.contains(dessus)) continue;
          for (var f = dessus; f && f !== document.body && f !== document.documentElement; f = f.parentElement) {
            var position = getComputedStyle(f).position;
            if (position !== "fixed" && position !== "sticky") continue;
            var rf = f.getBoundingClientRect();
            if (rf.top < 100 && rf.height < innerHeight * 0.4) bas = Math.max(bas, rf.bottom);
            break;
          }
        }
        if (!bas) return;
        b.style.marginTop = Math.round((parseFloat(b.style.marginTop) || 0) + bas - b.getBoundingClientRect().top + 4) + "px";
      }
    }
    [0, 400, 1500, 4000].forEach(function (ms) { setTimeout(degager, ms); });
    var attente;
    window.addEventListener("resize", function () { clearTimeout(attente); attente = setTimeout(function () { b.style.marginTop = ""; degager(); }, 250); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", lancer); else lancer();
})();

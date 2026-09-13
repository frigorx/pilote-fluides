/* =====================================================================
   suivant.js — LA BRIQUE « STATION SUIVANTE » : navigation de ligne
   ---------------------------------------------------------------------
   Rôle : sur une page de module (packs/fluides/res/<module>/index.html),
   pose en bas de page « ← précédente · ↑ la ligne · suivante → », calculée
   depuis window.PLAN_DONNEES (chargé juste avant par plan-donnees.js) —
   jamais de texte gravé ici, une seule source pour les 49 pages.
   Entrées : location.pathname (le module courant) ; location.search
   (?ligne=<slug> pour choisir la ligne si le module en porte deux —
   sinon la première ligne qui le porte, dans l'ordre du plan).
   Sortie : aucune — pose son bloc dans le DOM, ou ne fait rien.
   Pièges : (1) module hors plan, ou PLAN_DONNEES absent → silence ;
   (2) écran fixe (`overflow:hidden` sur html ET body) ou barre déjà
   collée au bord bas (Continuer, lecteur vidéo…) → silence, la barre
   ne s'insère pas plutôt que de recouvrir — piège mesuré et déjà
   documenté dans moteur/marque.js (18/08) sur ce même détendeur ;
   (3) toujours en flux normal (pas de position:fixed) : « discrète »,
   pas un troisième élément flottant à côté de Aa et Mode prof vocal.
   ===================================================================== */
(function () {
  "use strict";
  var D = window.PLAN_DONNEES;
  if (!D) return;

  var RES = "packs/fluides/res/";
  var pageActuelle = /\/packs\/fluides\/res\/([^/]+)\//.exec(location.pathname);
  if (!pageActuelle) return;
  var moduleCourant = pageActuelle[1];

  function dossierDe(href) {
    var i = (href || "").indexOf(RES);
    if (i === -1) return null;
    return href.slice(i + RES.length).split(/[/?]/)[0];
  }
  /* Un même module peut revenir plusieurs fois dans une ligne (les escales
     du CO2, la sous-station NRD) : une seule entrée par dossier, la
     première rencontrée, sinon le CO2 se navigue en 8 pas sur lui-même. */
  function stationsUniques(stations) {
    var vus = {}, out = [];
    for (var i = 0; i < stations.length; i++) {
      var d = dossierDe(stations[i].href);
      if (d && !vus[d]) { vus[d] = true; out.push({ dossier: d, nom: stations[i].nom, href: stations[i].href }); }
    }
    return out;
  }

  var lignes = [{ slug: null, nom: "🚉 LE TRONC", stations: stationsUniques(D.TRONC.stations.concat(D.TRONC.queue)) }];
  for (var i = 0; i < D.LIGNES.length; i++) {
    lignes.push({ slug: D.LIGNES[i].slug, nom: D.LIGNES[i].nom, stations: stationsUniques(D.LIGNES[i].stations) });
  }
  ["HUILE", "HUILE_CIRCUIT", "CO2", "CENTRALES", "REGULES"].forEach(function (cle) {
    lignes.push({ slug: D[cle].slug, nom: D[cle].nom, stations: stationsUniques(D[cle].stations) });
  });

  var demandee = /[?&]ligne=([a-z0-9-]+)/.exec(location.search);
  demandee = demandee ? demandee[1] : null;

  var ligne = null, idx = -1;
  for (var j = 0; j < lignes.length; j++) {
    var k = -1;
    for (var s = 0; s < lignes[j].stations.length; s++) {
      if (lignes[j].stations[s].dossier === moduleCourant) { k = s; break; }
    }
    if (k === -1) continue;
    if (demandee && lignes[j].slug === demandee) { ligne = lignes[j]; idx = k; break; }
    if (!ligne) { ligne = lignes[j]; idx = k; }
  }
  if (!ligne) return; // page hors plan : rien à faire

  /* Piège mesuré (moteur/marque.js, 18/08, sur ce même détendeur) :
     certains modules ont déjà une barre collée au bord bas (Continuer,
     lecteur vidéo). On mesure comme marque.js — géométrie, pas
     `position:fixed`, car cette barre-là est parfois en flux normal au
     fond d'un conteneur 100 % — et on renonce plutôt que de la couvrir. */
  var csBody = getComputedStyle(document.body), csHtml = getComputedStyle(document.documentElement);
  if (csBody.overflow === "hidden" && csHtml.overflow === "hidden") return;
  var vue = window.innerHeight || document.documentElement.clientHeight;
  var noeuds = document.body.querySelectorAll("*");
  for (var n = 0; n < noeuds.length; n++) {
    var r = noeuds[n].getBoundingClientRect();
    /* largeur ≥ 120 : comme marque.js, écarte les petits badges (ex. les
       pastilles 1-2-3-4-5 d'une intro) qui touchent le bord par hasard
       de fold, pas parce qu'ils forment une barre. */
    if (r.height < 8 || r.height > vue * 0.45 || r.width < 120) continue;
    if (Math.abs(r.bottom - vue) <= 4) return; // le bord bas est déjà pris
  }

  function relatif(href) { return "../" + href.slice(href.indexOf(RES) + RES.length); }
  var PLAN = "../../../../index.html";
  var versLigne = ligne.slug ? PLAN + "#ligne=" + ligne.slug : PLAN;
  var precedente = idx > 0
    ? { texte: "← " + ligne.stations[idx - 1].nom, href: relatif(ligne.stations[idx - 1].href) }
    : { texte: "← départ", href: versLigne };
  var suivante = idx < ligne.stations.length - 1
    ? { texte: ligne.stations[idx + 1].nom + " →", href: relatif(ligne.stations[idx + 1].href) }
    : { texte: "🏁 fin de ligne", href: versLigne };

  var style = document.createElement("style");
  style.textContent =
    "#station-suivante{display:flex;justify-content:space-between;align-items:center;" +
    "gap:8px;margin-top:24px;padding:9px 16px;background:#1B3A63;" +
    "font:14px/1.3 'Trebuchet MS',Calibri,Arial,sans-serif;flex-wrap:wrap}" +
    "#station-suivante a{color:#fff;text-decoration:none;padding:4px 8px;border-radius:6px}" +
    "#station-suivante a:hover,#station-suivante a:focus-visible{background:#FF6B35}" +
    "#station-suivante .ligne{opacity:.85;font-size:13px}" +
    "@media(max-width:520px){#station-suivante{font-size:12.5px;padding:7px 10px}}";
  document.head.appendChild(style);

  var barre = document.createElement("nav");
  barre.id = "station-suivante";
  barre.setAttribute("aria-label", "Navigation de ligne");
  barre.innerHTML =
    '<a href="' + precedente.href + '">' + precedente.texte + "</a>" +
    '<a class="ligne" href="' + versLigne + '">↑ ' + ligne.nom + "</a>" +
    '<a href="' + suivante.href + '">' + suivante.texte + "</a>";
  document.body.appendChild(barre);
})();

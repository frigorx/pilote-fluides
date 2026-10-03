/* =====================================================================
   voyage-nh3-dessin.js — ce que l'édition NH₃ change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-nh3.html (et par les
   outils quand ils fabriquent l'édition NH₃). Remplace, sans toucher au
   fichier commun : les organes et la carte du circuit (régime noyé par
   gravité : bouteille séparatrice au-dessus de l'évaporateur, flotteur,
   séparateur d'huile, condenseur évaporatif, réservoir haute pression,
   pot à huile), la carte d'identité (noms longs sur deux lignes).
   L'héroïne commune (un corps, trois satellites) a déjà la silhouette de
   NH₃ : un azote, trois hydrogènes. Elle ne change pas.
   ACIER : l'ammoniac ronge le cuivre — les tuyauteries de la carte sont
   gris acier (jamais les dégradés cuivre de l'original). Les scènes
   utilisent "url(#vm-acier-h)" et non "url(#vm-cuivre)" pour les tubes.
   CARTE (repère 1000 × 620, croix du frigoriste) : basse pression en bas
   (évaporateur, bouteille séparatrice au-dessus de lui), compresseur à
   droite, condenseur en haut, flotteur à gauche. D.CIRCUIT_PTS est le
   CHEMIN de l'héroïne (il repasse par la bouteille) ; les tuyaux sont
   dessinés à part (TUYAUX).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;

  /* ---------- les organes de l'installation ---------- */
  D.ORGANES = {
    separateur: { f: "separateur_liquide", vb: [-14, -26, 28, 53], axe: [0, 5.5], nom: "bouteille séparatrice", court: "bouteille|séparatrice" },
    evaporateur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "évaporateur noyé", court: "évaporateur" },
    compresseur: { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseur ouvert", court: "compresseur" },
    separateurHuile: { f: "separateur_huile", vb: [-14, -18, 30, 40], axe: [0, -10], nom: "séparateur d'huile", court: "séparateur d'huile" },
    condenseur: { f: "condenseur_evaporatif", vb: [-27, -33, 50, 50], axe: [-2, -10], nom: "condenseur évaporatif", court: "condenseur évaporatif" },
    reservoir: { f: "bouteille_liquide", vb: [-24, -14, 50, 30], axe: [0, 0], nom: "réservoir haute pression", court: "réservoir HP" },
    flotteur: { f: "regulateur_flotteur", vb: [-13, -13, 26, 19], axe: [0.3, 0], nom: "régulateur à flotteur", court: "flotteur" },
    potHuile: { f: "pot_huile", vb: [-14, -54, 38, 98], axe: [5, -5], nom: "pot à huile", court: "pot à huile" }
  };

  /* la carte d'identité : même cadre que l'original (la série verticale s'en sert), nom sur deux lignes s'il est long */
  D.carteIdentite = function (parent, s) {
    const g = D.el("g", { "data-layout-allow-overlap": "" }, parent), o = D.ORGANES[s.organe], nom = o.nom[0].toUpperCase() + o.nom.slice(1);
    D.el("rect", { x: 260, y: 190, width: 900, height: 470, rx: 28, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 296, y: 226, width: 380, height: 300, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.18)", "stroke-width": 2 }, g);
    D.image(g, s.organe, 316, 246, 340, 260);
    D.texte(g, 486, 566, "son symbole", { "text-anchor": "middle", "font-size": 28, fill: "#637285", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 });
    const lignes = nom.length > 13 ? D.couper(nom, 15) : [nom], deux = lignes.length > 1;
    D.lignes(g, 712, 296, lignes, { "font-size": deux ? 50 : 60, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" }, 56);
    D.lignes(g, 712, deux ? 424 : 372, D.couper("Son rôle : " + s.role + ".", 22), { "font-size": 38, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, 48);
    D.texte(g, 712, 616, "Entrons dedans…", { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    return g;
  };

  /* ---------- briques des scènes NH₃ (partagées par voyage-nh3-scenes-a/b/c.js) ---------- */
  D.HUILE = "#b7801c"; // les gouttes et la couche d'huile : ambre, jamais la couleur du fluide
  D.AIR = "#8d969f";   // les molécules d'air (incondensables) : gris
  /* une cuve d'acier en coupe, bouts arrondis : o = { x, y, l, h, vertical } (cadre extérieur), paroi 14 px.
     rend { g, dedans (groupe découpé à l'intérieur : y poser liquide, vapeur, héroïne), x0, x1, yh, yb } (intérieur) */
  let nc = 0;
  D.cuve = function (parent, o) {
    const g = D.el("g", {}, parent), e = 14, rx = (o.vertical ? o.l : o.h) / 2, cid = "vm-cuve-" + (++nc);
    D.el("rect", { x: o.x, y: o.y, width: o.l, height: o.h, rx: rx, fill: "url(#vm-acier" + (o.vertical ? "-h" : "") + ")" }, g);
    const dim = { x: o.x + e, y: o.y + e, width: o.l - 2 * e, height: o.h - 2 * e, rx: rx - e };
    D.el("rect", Object.assign({}, dim), D.el("clipPath", { id: cid }, g));
    D.el("rect", Object.assign({ fill: "#f4f8fc" }, dim), g);
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    return { g: g, dedans: dedans, x0: o.x + e, x1: o.x + o.l - e, yh: o.y + e, yb: o.y + o.h - e };
  };

  /* ---------- la carte du circuit ---------- */
  /* le CHEMIN de l'héroïne : 0 bouteille (liquide) · 1 son fond · 2 bas de la descente · 3 évaporateur · 4-5 retour ·
     6 entrée haute de la bouteille · 7 sa zone vapeur · 8 sortie vapeur · 9 entrée du compresseur · 10 refoulement ·
     11 coin haut droit · 12 séparateur d'huile · 13 condenseur · 14 réservoir · 15 coin haut gauche · 16 flotteur ·
     17 coin bas gauche · 18 entrée du liquide détendu · 19 = 0 */
  D.CIRCUIT_PTS = [[400, 395], [400, 430], [400, 545], [560, 545], [720, 545], [720, 300], [442, 300], [400, 310], [400, 230],
    [738, 230], [890, 230], [890, 85], [790, 85], [560, 96], [330, 106], [95, 106], [95, 250], [95, 340], [358, 340], [400, 395]];
  const TUYAUX = [
    [[400, 285], [400, 230], [738, 230]],                         // aspiration : vapeur sèche
    [[822, 230], [890, 230], [890, 85], [813, 85]],               // refoulement
    [[767, 85], [604, 85]],                                       // vers le condenseur
    [[516, 106], [382, 106]],                                     // liquide vers le réservoir
    [[278, 106], [95, 106], [95, 340], [358, 340]],               // ligne liquide, flotteur, entrée dans la bouteille
    [[400, 430], [400, 545], [496, 545]],                         // descente (liquide)
    [[624, 545], [720, 545], [720, 300], [442, 300]]              // retour (mélange)
  ];
  const FILETS = [[[790, 147], [790, 178]], [[388, 430], [300, 430], [300, 440]]]; // retour d'huile au carter ; purge vers le pot
  const PLACES = { separateur: [400, 370, 3, 0], evaporateur: [560, 545, 2.2, -90], compresseur: [780, 230, 2.6, 0],
    separateurHuile: [790, 85, 2.6, 0], condenseur: [560, 85, 2.6, 0, true], reservoir: [330, 106, 2.6, 0],
    flotteur: [95, 250, 2.6, 90], potHuile: [300, 470, 0.6, 0] };
  const NOMS = { separateur: [456, 390, "start", 26], evaporateur: [745, 595, "start"], compresseur: [740, 330, "start"],
    separateurHuile: [790, 46, "middle", 26], condenseur: [560, 190, "middle", 26], reservoir: [330, 180, "middle", 26],
    flotteur: [140, 262, "start"], potHuile: [300, 548, "middle", 24] };
  function poser(parent, nom, px, py, s, rot, miroir) { // = voyage-dessin.js (privée là-bas) ; renvoie le cadre du symbole posé
    const o = D.ORGANES[nom], [vx, vy, vl, vh] = o.vb, [ax, ay] = o.axe, embarque = window.VOYAGE_SYM_DATA && window.VOYAGE_SYM_DATA[o.f];
    const g = D.el("g", { transform: "translate(" + px + " " + py + ") rotate(" + rot + ") scale(" + (miroir ? -s : s) + " " + s + ") translate(" + (-ax) + " " + (-ay) + ")" }, parent);
    D.el("image", { href: embarque || D.SYM + o.f + ".svg", x: vx, y: vy, width: vl, height: vh }, g);
    const c = Math.round(Math.cos(rot * Math.PI / 180)), si = Math.round(Math.sin(rot * Math.PI / 180));
    const pts = [[vx, vy], [vx + vl, vy], [vx, vy + vh], [vx + vl, vy + vh]].map(([x, y]) => {
      const u = (x - ax) * (miroir ? -s : s), v = (y - ay) * s;
      return [px + u * c - v * si, py + u * si + v * c];
    });
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
  }
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const ligne = p => p.map(q => q.join(",")).join(" ");
    TUYAUX.forEach(p => { // acier : gris foncé, reflet clair
      D.el("polyline", { points: ligne(p), fill: "none", stroke: "#4d5866", "stroke-width": 16, "stroke-linejoin": "round" }, g);
      D.el("polyline", { points: ligne(p), fill: "none", stroke: "#b9c3cd", "stroke-width": 6, "stroke-linejoin": "round" }, g);
    });
    FILETS.forEach(p => D.el("polyline", { points: ligne(p), fill: "none", stroke: "#4d5866", "stroke-width": 7, "stroke-linejoin": "round" }, g));
    const reperes = {};
    for (const nom in PLACES) {
      const cadre = D.el("rect", { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
      const [x0, y0, w, h] = poser(g, nom, ...PLACES[nom]);
      Object.entries({ x: x0 - 8, y: y0 - 8, width: w + 16, height: h + 16 }).forEach(([c, v]) => cadre.setAttribute(c, v.toFixed(1)));
      reperes[nom] = cadre;
      if (noms) { const [nx, ny, a, taille] = NOMS[nom]; D.ORGANES[nom].court.split("|").forEach((l, i) => D.etiquette(g, nx, ny + i * (taille || 30) * 1.05, l, { "text-anchor": a, "font-size": taille || 30, "font-weight": 700, fill: D.BLEU })); }
    }
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { if (!reperes[nom]) return; reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };
})();

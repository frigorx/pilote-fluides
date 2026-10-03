/* =====================================================================
   voyage-bietage-dessin.js — ce que l'édition « installation bi-étagée »
   change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-bietage.html (et par les
   outils quand ils fabriquent l'édition). Remplace, sans toucher au fichier
   commun : les organes, la carte du circuit et la carte d'identité, DÉCALÉE
   À GAUCHE (écran partagé : la colonne de droite porte la carte « où je
   suis » et le diagramme enthalpique).
   CARTE « EN ESCALIER » (repère 1000 × 620, comme le diagramme) : la basse
   pression EN BAS (bouteille BP, pompe, évaporateur), la pression
   intermédiaire AU MILIEU (bouteille intermédiaire), la haute pression EN
   HAUT (condenseur, réservoir). Les compresseurs MONTENT à droite (BP puis
   HP), les détentes DESCENDENT à gauche (flotteur puis détendeur).
   D.CIRCUIT_PTS est le CHEMIN de la molécule (il traverse les bouteilles) ;
   les tuyaux sont dessinés à part (TUYAUX), gris acier : l'ammoniac ronge
   le cuivre (comme l'édition NH₃).
   BRIQUES : D.cuve (cuve d'acier en coupe, reprise de l'édition NH₃),
   D.HUILE (ambre), D.ACIER (gris des tuyaux).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  D.HUILE = "#b7801c";
  D.ACIER = "#4d5866";
  D.VITRINE_C = [480, 425]; // centre du zoom d'entrée dans l'organe (moteur/voyage-theatre.js)

  /* ---------- les organes ---------- */
  D.ORGANES = {
    evaporateur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "évaporateur", court: "évaporateur" },
    bouteilleBP: { f: "separateur_liquide", vb: [-14, -26, 28, 53], axe: [0, 5.5], nom: "bouteille BP", court: "bouteille BP" },
    pompe: { f: "pompe", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "pompe", court: "pompe" },
    compresseurBP: { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseur BP", court: "compresseur BP" },
    bouteille: { f: "separateur_liquide", vb: [-14, -26, 28, 53], axe: [0, 5.5], nom: "bouteille intermédiaire", court: "bouteille|intermédiaire" },
    compresseurHP: { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseur HP", court: "compresseur HP" },
    condenseur: { f: "condenseur_evaporatif", vb: [-27, -33, 50, 50], axe: [-2, -10], nom: "condenseur évaporatif", court: "condenseur" },
    reservoir: { f: "bouteille_liquide", vb: [-24, -14, 50, 30], axe: [0, 0], nom: "réservoir haute pression", court: "réservoir" },
    flotteur: { f: "regulateur_flotteur", vb: [-13, -13, 26, 19], axe: [0.3, 0], nom: "régulateur à flotteur", court: "flotteur" },
    detendeur: { f: "detendeur_electronique--sans-reperes", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "détendeur", court: "détendeur" }
  };

  /* la carte d'identité : même cadre que l'édition vis, décalée à gauche (x 30 → 930) */
  D.carteIdentite = function (parent, s) {
    const g = D.el("g", { "data-layout-allow-overlap": "" }, parent), o = D.ORGANES[s.organe], nom = o.nom[0].toUpperCase() + o.nom.slice(1);
    D.el("rect", { x: 30, y: 190, width: 900, height: 470, rx: 28, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 66, y: 226, width: 380, height: 300, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.18)", "stroke-width": 2 }, g);
    D.image(g, s.organe, 86, 246, 340, 260);
    D.texte(g, 256, 566, "son symbole", { "text-anchor": "middle", "font-size": 28, fill: "#637285", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 });
    const lignes = nom.length > 12 ? D.couper(nom, 12) : [nom], deux = lignes.length > 1; // « Compresseur HP » : deux lignes, sinon il sort du cadre
    D.lignes(g, 482, 296, lignes, { "font-size": deux ? 50 : 60, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" }, 56);
    const y0 = deux ? 424 : 372, role = "Son rôle : " + s.role + ".";
    let r = D.couper(role, 22), taille = 38, pas = 48; // le rôle s'arrête au-dessus de « Entrons dedans… » (y 616)
    if (y0 + (r.length - 1) * pas > 572) { r = D.couper(role, 28); taille = 31; pas = 38; }
    D.lignes(g, 482, y0, r, { "font-size": taille, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, pas);
    D.texte(g, 482, 616, "Entrons dedans…", { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    return g;
  };

  /* une cuve d'acier en coupe, bouts arrondis (= édition NH₃) : o = { x, y, l, h, vertical } (cadre extérieur), paroi 14.
     rend { g, dedans (groupe découpé à l'intérieur), x0, x1, yh, yb } (intérieur) */
  let nc = 0;
  D.cuve = function (parent, o) {
    const g = D.el("g", {}, parent), e = 14, rx = (o.vertical ? o.l : o.h) / 2, cid = "vb-cuve-" + (++nc);
    D.el("rect", { x: o.x, y: o.y, width: o.l, height: o.h, rx: rx, fill: "url(#vm-acier" + (o.vertical ? "-h" : "") + ")" }, g);
    const dim = { x: o.x + e, y: o.y + e, width: o.l - 2 * e, height: o.h - 2 * e, rx: rx - e };
    D.el("rect", Object.assign({}, dim), D.el("clipPath", { id: cid }, g));
    D.el("rect", Object.assign({ fill: "#f4f8fc" }, dim), g);
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    return { g: g, dedans: dedans, x0: o.x + e, x1: o.x + o.l - e, yh: o.y + e, yb: o.y + o.h - e };
  };

  /* ---------- la carte du circuit ---------- */
  /* le CHEMIN : 0 bouteille BP (liquide) · 1 coin · 2 pompe · 3 évaporateur · 4-5 retour · 6 entrée du retour ·
     7 vapeur de la bouteille BP · 8 sa sortie · 9 coin · 10 compresseur BP · 11 coin · 12 entrée dans la bouteille
     intermédiaire (tube plongeur) · 13 sous le liquide · 14 haut de la bouteille · 15 sortie · 16 coin · 17 compresseur HP ·
     18 coin · 19 condenseur · 20 réservoir · 21 coin · 22 flotteur · 23 coin · 24 entrée du liquide · 25 son liquide ·
     26 sortie basse · 27 coin · 28 détendeur · 29 coin · 30 entrée dans la bouteille BP · 31 = 0 */
  D.CIRCUIT_PTS = [[320, 480], [320, 570], [420, 570], [640, 570], [860, 570], [860, 470], [348, 470], [320, 440], [320, 400],
    [880, 400], [880, 350], [880, 300], [522, 300], [490, 315], [480, 200], [480, 180], [700, 180], [700, 120], [700, 60],
    [450, 60], [250, 60], [95, 60], [95, 150], [95, 225], [438, 225], [470, 295], [438, 325], [95, 325], [95, 400], [95, 470],
    [292, 470], [320, 480]];
  const TUYAUX = [
    [[320, 523], [320, 570], [860, 570], [860, 470], [348, 470]],          // bouteille BP → pompe → évaporateur → retour
    [[320, 417], [320, 400], [880, 400], [880, 300], [522, 300]],          // vapeur BP → compresseur BP → bouteille intermédiaire
    [[480, 181], [700, 180], [700, 60], [95, 60], [95, 225], [438, 225]],  // compresseur HP → condenseur → réservoir → flotteur
    [[438, 325], [95, 325], [95, 470], [292, 470]]                         // liquide refroidi → détendeur → bouteille BP
  ];
  const PLACES = { bouteilleBP: [320, 480, 2, 0], pompe: [420, 570, 1.4, 0], evaporateur: [640, 570, 1.9, -90],
    compresseurBP: [880, 350, 2.2, -90], bouteille: [480, 275, 3, 0], compresseurHP: [700, 120, 2, -90],
    condenseur: [450, 60, 1.8, 0, true], reservoir: [250, 60, 2.2, 0], flotteur: [95, 150, 2.6, 90], detendeur: [95, 400, 2, 90] };
  const NOMS = { bouteilleBP: [362, 450, "start", 26], pompe: [420, 532, "middle", 26], evaporateur: [640, 515, "middle", 26],
    compresseurBP: [826, 372, "end", 26], bouteille: [552, 234, "start", 28], compresseurHP: [752, 130, "start", 26],
    condenseur: [450, 146, "middle", 26], reservoir: [250, 128, "middle", 26], flotteur: [140, 162, "start", 26],
    detendeur: [140, 412, "start", 26] };
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
      D.el("polyline", { points: ligne(p), fill: "none", stroke: D.ACIER, "stroke-width": 16, "stroke-linejoin": "round" }, g);
      D.el("polyline", { points: ligne(p), fill: "none", stroke: "#b9c3cd", "stroke-width": 6, "stroke-linejoin": "round" }, g);
    });
    const reperes = {};
    for (const nom in PLACES) {
      const cadre = D.el("rect", { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
      const [x0, y0, w, h] = poser(g, nom, ...PLACES[nom]);
      Object.entries({ x: x0 - 8, y: y0 - 8, width: w + 16, height: h + 16 }).forEach(([c, v]) => cadre.setAttribute(c, v.toFixed(1)));
      reperes[nom] = cadre;
      if (noms) { const [nx, ny, a, taille] = NOMS[nom]; D.ORGANES[nom].court.split("|").forEach((ligneNom, i) => D.etiquette(g, nx, ny + i * (taille || 30) * 1.05, ligneNom, { "text-anchor": a, "font-size": taille || 30, "font-weight": 700, fill: D.BLEU })); }
    }
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { if (!reperes[nom]) return; reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };
})();

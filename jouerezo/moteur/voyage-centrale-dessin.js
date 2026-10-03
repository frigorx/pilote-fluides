/* =====================================================================
   voyage-centrale-dessin.js — ce que l'édition « les centrales
   frigorifiques » change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-centrale.html (et par
   les outils). Remplace, sans toucher au fichier commun : les organes, la
   carte du circuit (trois meubles en parallèle, trois compresseurs en
   parallèle entre deux collecteurs) et la carte d'identité, DÉCALÉE À
   GAUCHE (écran partagé : x > 970 = carte « où je suis » + diagramme).
   Pour « les compresseurs », la carte d'identité montre TROIS symboles
   empilés et dit « Leur rôle » (o.pluriel).
   CARTE (repère 1000 × 620, sens du fluide, croix du frigoriste) :
   ligne liquide en bas (y 595) qui monte dans les trois postes
   (x 250, 450, 650 : détendeur puis évaporateur) ; conduite d'aspiration
   (y 340) jusqu'au collecteur d'aspiration (x 740) ; trois compresseurs
   (y 230, 340, 450) jusqu'au collecteur de refoulement (x 920) ; en haut
   (le toit, y 85) : séparateur d'huile, condenseur, bouteille ; la ligne
   liquide redescend à gauche (x 95), filtre déshydrateur et voyant.
   L'héroïne passe par le poste du milieu et le compresseur n° 2.
   D.CIRCUIT_PTS : 0 coin bas gauche · 1 pied du poste · 1,25 détendeur ·
   1,65 évaporateur · 1,82 sortie du meuble · 3 collecteur d'aspiration ·
   3,5 compresseur n° 2 · 4 collecteur de refoulement · 6 séparateur ·
   7 condenseur · 8 bouteille · 10 = 0.
   Repères pour les scènes : D.POSTES (x des trois postes), D.COMPRESSEURS
   (y des trois compresseurs), D.COLLECTEURS ({ asp, ref } : x).
   HORS CARTE (D.ORGANES, pour les scènes et le film qui embarque les
   symboles) : electrovanne, clapet (anti-retour), filtre, voyant.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  D.HUILE = "#c98a1b";
  D.VITRINE_C = [480, 425]; // centre du zoom d'entrée dans l'organe (moteur/voyage-theatre.js)

  /* ---------- les organes ---------- */
  D.ORGANES = {
    evaporateur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "évaporateur du meuble", court: "évaporateur" },
    compresseur: { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseurs en parallèle", court: "compresseurs", pluriel: true },
    separateurHuile: { f: "separateur_huile", vb: [-14, -18, 30, 40], axe: [0, -10], nom: "séparateur d'huile", court: "séparateur d'huile" },
    condenseur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "condenseur", court: "condenseur" },
    bouteille: { f: "bouteille_liquide_verticale", vb: [-14, -26, 28, 52], axe: [0, -24.5], nom: "bouteille", court: "bouteille" },
    detendeur: { f: "detendeur_thermo_ext", vb: [-19, -28, 40, 40], axe: [0, 0], nom: "détendeur", court: "détendeur", lettres: [0, -12, 4.6, "TC"] },
    /* hors carte (PLACES) : pour les scènes */
    electrovanne: { f: "electrovanne_frigo", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "électrovanne", court: "électrovanne" },
    clapet: { f: "clapet_anti_retour", vb: [-19, -10, 40, 20], axe: [0, 0], nom: "clapet anti-retour", court: "clapet" },
    filtre: { f: "filtre_deshydrateur", vb: [-25, -10, 40, 20], axe: [-4.875, 0.495], nom: "filtre déshydrateur", court: "filtre" },
    voyant: { f: "voyant_liquide", vb: [-15, -10, 50, 20], axe: [9.8, -0.054], nom: "voyant", court: "voyant" }
  };

  /* la carte d'identité : cadre décalé à gauche (x 30 → 930) ; « les compresseurs » : trois symboles, « Leur rôle » */
  D.carteIdentite = function (parent, s) {
    const g = D.el("g", { "data-layout-allow-overlap": "" }, parent), o = D.ORGANES[s.organe], nom = o.nom[0].toUpperCase() + o.nom.slice(1);
    D.el("rect", { x: 30, y: 190, width: 900, height: 470, rx: 28, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 66, y: 226, width: 380, height: 300, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.18)", "stroke-width": 2 }, g);
    if (o.pluriel) [0, 1, 2].forEach(i => D.image(g, s.organe, 156, 240 + i * 92, 160, 88));
    else D.image(g, s.organe, 86, 246, 340, 260);
    D.texte(g, 256, 566, o.pluriel ? "leurs symboles" : "son symbole", { "text-anchor": "middle", "font-size": 28, fill: "#637285", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 });
    const lignes = nom.length > 13 ? D.couper(nom, 15) : [nom], deux = lignes.length > 1;
    D.lignes(g, 482, 296, lignes, { "font-size": deux ? 50 : 60, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" }, 56);
    D.lignes(g, 482, deux ? 424 : 372, D.couper((o.pluriel ? "Leur rôle : " : "Son rôle : ") + s.role + ".", 22), { "font-size": 38, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, 48);
    D.texte(g, 482, 616, "Entrons dedans…", { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    return g;
  };

  /* ---------- la carte du circuit ---------- */
  D.POSTES = [250, 450, 650];
  D.COMPRESSEURS = [230, 340, 450];
  D.COLLECTEURS = { asp: 740, ref: 920 };
  D.CIRCUIT_PTS = [[95, 595], [450, 595], [450, 340], [740, 340], [920, 340], [920, 85], [830, 85], [560, 85], [300, 85], [95, 85], [95, 595]];
  /* les tubes que l'héroïne ne prend pas : les deux autres postes, les deux autres compresseurs, les collecteurs */
  const AUTRES = [
    [[450, 595], [650, 595], [650, 340], [450, 340]], [[250, 595], [250, 340], [450, 340]],
    [[740, 340], [740, 230], [920, 230], [920, 340]], [[740, 340], [740, 450], [920, 450], [920, 340]]
  ];
  const PLACES = { evaporateur: [450, 430, 1.5, 0], detendeur: [450, 530, 1.5, -90], compresseur: [830, 340, 1.8, 0],
    separateurHuile: [830, 85, 2.3, 0, true], condenseur: [560, 85, 2.4, 90], bouteille: [300, 85, 1.65, 0, true] };
  /* le décor sans repère : les deux autres postes, les deux autres compresseurs, filtre et voyant sur la ligne liquide */
  const DECOR = [["evaporateur", 250, 430, 1.5, 0], ["detendeur", 250, 530, 1.5, -90], ["evaporateur", 650, 430, 1.5, 0], ["detendeur", 650, 530, 1.5, -90],
    ["compresseur", 830, 230, 1.8, 0], ["compresseur", 830, 450, 1.8, 0], ["filtre", 95, 260, 1.9, 90], ["voyant", 95, 420, 1.7, 90]];
  const NOMS = { evaporateur: [450, 650, "middle", 30, "les meubles"], compresseur: [722, 250, "end"], separateurHuile: [830, 34, "middle", 26],
    condenseur: [560, 168, "middle"], bouteille: [300, 210, "middle"], detendeur: [478, 540, "start", 26] };
  function poser(parent, nom, px, py, s, rot, miroir) { // = voyage-dessin.js (privée là-bas) ; renvoie le cadre du symbole posé
    const o = D.ORGANES[nom], [vx, vy, vl, vh] = o.vb, [ax, ay] = o.axe, embarque = window.VOYAGE_SYM_DATA && window.VOYAGE_SYM_DATA[o.f];
    const g = D.el("g", { transform: "translate(" + px + " " + py + ") rotate(" + rot + ") scale(" + (miroir ? -s : s) + " " + s + ") translate(" + (-ax) + " " + (-ay) + ")" }, parent);
    D.el("image", { href: embarque || D.SYM + o.f + ".svg", x: vx, y: vy, width: vl, height: vh }, g);
    const c = Math.round(Math.cos(rot * Math.PI / 180)), si = Math.round(Math.sin(rot * Math.PI / 180));
    if (o.lettres && rot) {
      const [lx, ly, lr, lt] = o.lettres, u = (lx - ax) * s, v = (ly - ay) * s, qx = px + u * c - v * si, qy = py + u * si + v * c;
      D.el("circle", { cx: qx, cy: qy, r: lr * s, fill: "#fff" }, parent);
      D.texte(parent, qx, qy + 2.1 * s, lt, { "text-anchor": "middle", "font-size": 5.4 * s, fill: "#333", "font-family": "sans-serif" });
    }
    const pts = [[vx, vy], [vx + vl, vy], [vx, vy + vh], [vx + vl, vy + vh]].map(([x, y]) => {
      const u = (x - ax) * (miroir ? -s : s), v = (y - ay) * s;
      return [px + u * c - v * si, py + u * si + v * c];
    });
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
  }
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const tube = (pts, large) => {
      const p = pts.map(q => q.join(",")).join(" ");
      D.el("polyline", { points: p, fill: "none", stroke: "#8a4a24", "stroke-width": large ? 16 : 12, "stroke-linejoin": "round" }, g);
      D.el("polyline", { points: p, fill: "none", stroke: "#e7a978", "stroke-width": large ? 6 : 4, "stroke-linejoin": "round" }, g);
    };
    AUTRES.forEach(a => tube(a, false));
    tube(D.CIRCUIT_PTS, true);
    const encadre = (nom, p, trait) => { // le cadre blanc d'abord (sous le symbole), dimensionné une fois le symbole posé
      const c = D.el("rect", { rx: 14, fill: "#fff", stroke: trait, "stroke-width": 3 }, g), [x0, y0, w, h] = poser(g, nom, ...p);
      Object.entries({ x: x0 - 10, y: y0 - 10, width: w + 20, height: h + 20 }).forEach(([a, v]) => c.setAttribute(a, v.toFixed(1)));
      return c;
    };
    DECOR.forEach(([nom, ...p]) => encadre(nom, p, "rgba(27,58,99,.18)"));
    const reperes = {};
    for (const nom in PLACES) {
      reperes[nom] = encadre(nom, PLACES[nom], "rgba(27,58,99,.3)");
      if (noms) { const [nx, ny, a, taille, texte] = NOMS[nom]; (texte || D.ORGANES[nom].court).split("|").forEach((ligne, i) => D.etiquette(g, nx, ny + i * (taille || 30) * 1.05, ligne, { "text-anchor": a, "font-size": taille || 30, "font-weight": 700, fill: D.BLEU })); }
    }
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };
})();

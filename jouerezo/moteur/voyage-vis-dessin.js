/* =====================================================================
   voyage-vis-dessin.js — ce que l'édition « compresseur à vis » change au
   dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-vis.html (et par les
   outils quand ils fabriquent l'édition). Remplace, sans toucher au fichier
   commun : les organes (compresseur à vis, séparateur d'huile), la carte du
   circuit (avec la branche du retour d'huile) et la carte d'identité,
   DÉCALÉE À GAUCHE : écran partagé (Franck, 03/10), la colonne de droite
   (x > 970) porte la carte « où je suis » et le diagramme enthalpique.
   CARTE (repère 1000 × 620, sens du fluide, croix du frigoriste) :
   évaporateur en bas, compresseur à vis à droite (refoulement en haut),
   séparateur d'huile en haut à droite, condenseur en haut, bouteille pendue
   en haut à gauche, détendeur à gauche ; l'huile redescend du séparateur au
   compresseur (D.BRANCHE, D.branchePoint), trait ambre.
   HORS CARTE : D.ORGANES.clapet (clapet anti-retour, scène « à l'arrêt »).
   D.HUILE : la couleur de l'huile (ambre), pour les scènes.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  D.HUILE = "#c98a1b";
  D.VITRINE_C = [480, 425]; // centre du zoom d'entrée dans l'organe (moteur/voyage-theatre.js)

  /* ---------- les organes ---------- */
  D.ORGANES = {
    evaporateur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "évaporateur", court: "évaporateur" },
    compresseur: { f: "compresseur_vis", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseur à vis", court: "compresseur|à vis" },
    separateurHuile: { f: "separateur_huile", vb: [-14, -18, 30, 40], axe: [0, -10], nom: "séparateur d'huile", court: "séparateur d'huile" },
    condenseur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "condenseur", court: "condenseur" },
    bouteille: { f: "bouteille_liquide_verticale", vb: [-14, -26, 28, 52], axe: [0, -24.5], nom: "bouteille", court: "bouteille" },
    detendeur: { f: "detendeur_thermo_ext", vb: [-19, -28, 40, 40], axe: [0, 0], nom: "détendeur", court: "détendeur", lettres: [0, -12, 4.6, "TC"] },
    clapet: { f: "clapet_anti_retour", vb: [-19, -10, 40, 20], axe: [0, 0], nom: "clapet anti-retour", court: "clapet" } // hors carte (PLACES)
  };

  /* la carte d'identité : même cadre que le CO₂, décalée à gauche (x 30 → 930) pour laisser la colonne de droite libre */
  D.carteIdentite = function (parent, s) {
    const g = D.el("g", { "data-layout-allow-overlap": "" }, parent), o = D.ORGANES[s.organe], nom = o.nom[0].toUpperCase() + o.nom.slice(1);
    D.el("rect", { x: 30, y: 190, width: 900, height: 470, rx: 28, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 66, y: 226, width: 380, height: 300, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.18)", "stroke-width": 2 }, g);
    D.image(g, s.organe, 86, 246, 340, 260);
    D.texte(g, 256, 566, "son symbole", { "text-anchor": "middle", "font-size": 28, fill: "#637285", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 });
    const lignes = nom.length > 13 ? D.couper(nom, 15) : [nom], deux = lignes.length > 1;
    D.lignes(g, 482, 296, lignes, { "font-size": deux ? 50 : 60, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" }, 56);
    D.lignes(g, 482, deux ? 424 : 372, D.couper("Son rôle : " + s.role + ".", 22), { "font-size": 38, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, 48);
    D.texte(g, 482, 616, "Entrons dedans…", { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    return g;
  };

  /* ---------- la carte du circuit ---------- */
  D.CIRCUIT_PTS = [[390, 545], [650, 545], [890, 545], [890, 440], [890, 230], [890, 85], [790, 85], [700, 85], [440, 85],
    [330, 85], [95, 85], [95, 320], [95, 545], [390, 545]];
  /* le retour d'huile : du bas du séparateur au flanc du compresseur (injection, côté aspiration) */
  D.BRANCHE = [[790, 150], [790, 360], [842, 360]];
  const PLACES = { evaporateur: [520, 545, 2.4, -90], compresseur: [890, 335, 3.2, -90], separateurHuile: [790, 85, 2.6, 0, true],
    condenseur: [570, 85, 2.4, 90], bouteille: [330, 85, 1.65, 0, true], detendeur: [95, 320, 2.5, 90] };
  const NOMS = { evaporateur: [520, 490, "middle"], compresseur: [772, 290, "end"], separateurHuile: [790, 46, "middle", 26],
    condenseur: [570, 184, "middle"], bouteille: [330, 206, "middle"], detendeur: [188, 328, "start"] };
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
  D.branchePoint = function (w) { // 0 → bas du séparateur, D.BRANCHE.length - 1 → injection au compresseur
    const nb = D.BRANCHE.length - 1;
    w = D.borne(w, 0, nb);
    const i = Math.min(nb - 1, Math.floor(w)), f = w - i, a = D.BRANCHE[i], b = D.BRANCHE[i + 1];
    return [D.lerp(a[0], b[0], f), D.lerp(a[1], b[1], f)];
  };
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const pts = D.CIRCUIT_PTS.map(p => p.join(",")).join(" "), br = D.BRANCHE.map(p => p.join(",")).join(" ");
    D.el("polyline", { points: br, fill: "none", stroke: "#8a5a10", "stroke-width": 11, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: br, fill: "none", stroke: "#f0c66e", "stroke-width": 5, "stroke-linejoin": "round" }, g); // l'huile : trait ambre
    D.el("polyline", { points: pts, fill: "none", stroke: "#8a4a24", "stroke-width": 16, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: pts, fill: "none", stroke: "#e7a978", "stroke-width": 6, "stroke-linejoin": "round" }, g);
    const reperes = {};
    for (const nom in PLACES) {
      const cadre = D.el("rect", { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
      const [x0, y0, w, h] = poser(g, nom, ...PLACES[nom]);
      Object.entries({ x: x0 - 10, y: y0 - 10, width: w + 20, height: h + 20 }).forEach(([c, v]) => cadre.setAttribute(c, v.toFixed(1)));
      reperes[nom] = cadre;
      if (noms) { const [nx, ny, a, taille] = NOMS[nom]; D.ORGANES[nom].court.split("|").forEach((ligne, i) => D.etiquette(g, nx, ny + i * (taille || 30) * 1.05, ligne, { "text-anchor": a, "font-size": taille || 30, "font-weight": 700, fill: D.BLEU })); }
    }
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };
})();

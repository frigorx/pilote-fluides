/* =====================================================================
   voyage-co2-dessin.js — ce que l'édition CO₂ change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-co2.html (et par les
   outils quand ils fabriquent l'édition CO₂). Remplace, sans toucher au
   fichier commun : les organes et la carte du circuit (centrale
   transcritique, bouteille intermédiaire, branche de la vapeur de
   détente), la carte d'identité (noms longs sur deux lignes), et
   l'héroïne (molécule droite O=C=O, deux états de plus).
   ÉTATS DE L'HÉROÏNE : "liquide" | "bout" | "vapeur" (communs) +
     "supercritique" : corps plein, dense, SANS surface (pas de nappe),
       grains serrés qui frémissent — « dense comme un liquide, remplit
       tout comme un gaz » ;
     "solide" : glace (neige carbonique), facettes et éclats.
   CARTE (repère 1000 × 620, sens du fluide, croix du frigoriste) :
   évaporateur en bas, compresseur à droite, refroidisseur de gaz en haut,
   détendeur HP puis bouteille pendue en haut à gauche, détendeur de
   l'évaporateur à gauche ; la vapeur de détente quitte la bouteille par
   le côté (zone vapeur), traverse la carte par la vanne de gaz de détente
   et rejoint l'aspiration du compresseur (D.BRANCHE, D.branchePoint).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;


  /* ---------- l'héroïne CO₂ ---------- */
  const base = D.heroine;
  D.heroine = function (parent, o) {
    o = o || {};
    const R = o.r || 30, maj = base(parent, o), corps = maj.g.lastChild;
    // la molécule de CO₂ est droite : un oxygène de chaque côté du carbone
    const ronds = Array.from(corps.children).filter(e => e.tagName === "circle" && Math.abs(Number(e.getAttribute("r")) - R * 0.46) < 0.01);
    ronds.forEach((c, k) => { if (k < 2) { c.setAttribute("cx", ((k ? 1 : -1) * R * 1.12).toFixed(1)); c.setAttribute("cy", 0); } else c.setAttribute("display", "none"); });
    const dedans = corps.querySelector("g[clip-path]");
    const couche = D.el("g", { "clip-path": dedans.getAttribute("clip-path") }, corps);
    corps.insertBefore(couche, dedans.nextSibling); // sous le visage, au-dessus du fond
    const dense = D.el("circle", { r: R }, couche);
    const al = D.alea(7), grains = []; // graine fixe : une scène recréée (film rendu dans le désordre) retrouve les mêmes grains
    for (let i = 0; i < 15; i++) {
      const a = i * 2.39996, d = R * 0.8 * Math.sqrt((i + 0.5) / 15);
      grains.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, ph: al() * 6.28,
        e: D.el("circle", { r: R * 0.14, stroke: "#fff", "stroke-width": 1.2, "stroke-opacity": 0.7 }, couche) });
    }
    const glace = D.el("g", {}, couche);
    D.el("circle", { r: R, fill: "#eaf5ff" }, glace);
    const hex = [0, 1, 2, 3, 4, 5].map(k => [Math.cos(k * Math.PI / 3) * R * 0.62, Math.sin(k * Math.PI / 3) * R * 0.62]);
    D.el("polygon", { points: hex.map(p => p.map(v => v.toFixed(1)).join(",")).join(" "), fill: "#d4ebff", stroke: "#8fc3f0", "stroke-width": 2 }, glace);
    hex.forEach(([x, y]) => D.el("line", { x1: 0, y1: 0, x2: (x * 1.6).toFixed(1), y2: (y * 1.6).toFixed(1), stroke: "#8fc3f0", "stroke-width": 1.6 }, glace));
    const eclats = [[-0.5, 0.55], [0.55, 0.5], [0.1, -0.7]].map(([x, y]) => D.el("path", {
      d: "M 0 " + (-R * 0.16) + " L " + R * 0.04 + " " + (-R * 0.04) + " L " + R * 0.16 + " 0 L " + R * 0.04 + " " + R * 0.04 + " L 0 " + R * 0.16 + " L " + (-R * 0.04) + " " + R * 0.04 + " L " + (-R * 0.16) + " 0 L " + (-R * 0.04) + " " + (-R * 0.04) + " Z",
      fill: "#fff", transform: "translate(" + (x * R).toFixed(1) + " " + (y * R).toFixed(1) + ")" }, glace));
    const f = function (p) {
      maj(p);
      const etat = o.teinte ? "plein" : p.etat, t = p.t || 0, temp = p.temp === undefined ? 0.1 : p.temp;
      const sc = etat === "supercritique", so = etat === "solide";
      dense.setAttribute("opacity", sc ? 0.6 : 0);
      dense.setAttribute("fill", D.couleur(temp, false));
      grains.forEach(gr => {
        gr.e.setAttribute("opacity", sc ? 0.95 : 0);
        if (!sc) return;
        gr.e.setAttribute("cx", (gr.x + Math.sin(t * 3.1 + gr.ph) * R * 0.05).toFixed(1));
        gr.e.setAttribute("cy", (gr.y + Math.cos(t * 2.7 + gr.ph) * R * 0.05).toFixed(1));
        gr.e.setAttribute("fill", D.couleur(temp, true));
      });
      glace.setAttribute("opacity", so ? 1 : 0);
      eclats.forEach((e, k) => e.setAttribute("opacity", so ? (0.3 + 0.7 * Math.abs(Math.sin(t * 2.2 + k * 2))).toFixed(2) : 0));
    };
    f.g = maj.g;
    return f;
  };

  /* ---------- les organes de la centrale ---------- */
  D.ORGANES = {
    evaporateur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "évaporateur", court: "évaporateur" },
    compresseur: { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseur", court: "compresseur" },
    refroidisseur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "refroidisseur de gaz", court: "refroidisseur de gaz" },
    detendeurHP: { f: "detendeur_electronique--sans-reperes", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "détendeur haute pression", court: "détendeur HP" },
    bouteille: { f: "bouteille_liquide_verticale", vb: [-14, -26, 28, 52], axe: [0, -24.5], nom: "bouteille intermédiaire", court: "bouteille" },
    vanneGaz: { f: "detendeur_electronique--sans-reperes", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "vanne de gaz de détente", court: "vanne de gaz de détente" },
    detendeur: { f: "detendeur_electronique", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "détendeur de l'évaporateur", court: "détendeur", lettres: [0, -12, 6.4, "TCE"] },
    soupape: { f: "vanne_securite", vb: [-7, -20, 20, 40], axe: [0, 11], nom: "soupape de sécurité", court: "soupape" } // hors carte (PLACES) : dessinée par la scène « à l'arrêt »
  };

  /* ---------- le fluide supercritique dans un volume : plein, SANS surface, grains serrés qui frémissent ----------
     o : { x0, y0, x1, y1, pas (écart des grains, 26 par défaut), graine } → maj(t, temp, vitesse, op).
     vitesse en px/s le long de x (0 = sur place). Plus `pas` est petit, plus le fluide est dense. */
  D.supercritique = function (parent, o) {
    const g = D.el("g", {}, parent), pas = o.pas || 26, L = o.x1 - o.x0;
    const fond = D.el("rect", { x: o.x0, y: o.y0, width: L, height: o.y1 - o.y0 }, g);
    const al = D.alea(o.graine || 3), G = [];
    let rang = 0;
    for (let y = o.y0 + pas * 0.55; y < o.y1 - pas * 0.3; y += pas * 0.87, rang++)
      for (let x = o.x0 + (rang % 2 ? pas / 2 : 0); x < o.x1; x += pas) G.push({ x: x, y: y, ph: al() * 6.28, maj: D.mol(g) });
    return function (t, temp, vitesse, op) {
      op = op === undefined ? 1 : op;
      fond.setAttribute("fill", D.couleur(temp, false)); fond.setAttribute("opacity", (0.42 * op).toFixed(2));
      G.forEach(m => {
        const x = o.x0 + D.frac((m.x - o.x0 + t * (vitesse || 0)) / L) * L, bord = D.borne(Math.min(x - o.x0, o.x1 - x) / 14, 0, 1);
        m.maj(x + Math.sin(t * 3.3 + m.ph) * 2.6, m.y + Math.cos(t * 2.9 + m.ph) * 2.6, temp, true, op * bord);
      });
    };
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

  /* ---------- la carte du circuit ---------- */
  D.CIRCUIT_PTS = [[390, 545], [650, 545], [890, 545], [890, 400], [890, 240], [890, 85], [745, 85], [495, 85], [400, 85],
    [300, 85], [210, 85], [95, 85], [95, 190], [95, 320], [95, 545], [390, 545]];
  /* la vapeur de détente : du côté de la bouteille (zone vapeur) à l'aspiration du compresseur */
  D.BRANCHE = [[225, 112], [300, 112], [300, 440], [700, 440], [890, 440]];
  const PLACES = { evaporateur: [520, 545, 2.4, -90], compresseur: [890, 320, 3.2, -90], refroidisseur: [620, 85, 2.4, 90],
    detendeurHP: [400, 85, 2.3, 0], bouteille: [210, 85, 1.65, 0, true], vanneGaz: [700, 440, 2.1, 0], detendeur: [95, 320, 2.5, 90] };
  const NOMS = { evaporateur: [520, 490, "middle"], compresseur: [790, 326, "end"], refroidisseur: [660, 192, "middle"],
    detendeurHP: [400, 152, "middle"], bouteille: [178, 206, "middle"], vanneGaz: [800, 374, "end"], detendeur: [148, 330, "start"] };
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
  D.branchePoint = function (w) { // 0 → sortie de la bouteille, D.BRANCHE.length - 1 → aspiration
    const nb = D.BRANCHE.length - 1;
    w = D.borne(w, 0, nb);
    const i = Math.min(nb - 1, Math.floor(w)), f = w - i, a = D.BRANCHE[i], b = D.BRANCHE[i + 1];
    return [D.lerp(a[0], b[0], f), D.lerp(a[1], b[1], f)];
  };
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const pts = D.CIRCUIT_PTS.map(p => p.join(",")).join(" "), br = D.BRANCHE.map(p => p.join(",")).join(" ");
    D.el("polyline", { points: br, fill: "none", stroke: "#8a4a24", "stroke-width": 11, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: br, fill: "none", stroke: "#f3d2b6", "stroke-width": 4, "stroke-linejoin": "round", "stroke-dasharray": "10 8" }, g); // vapeur : trait clair pointillé
    D.el("polyline", { points: pts, fill: "none", stroke: "#8a4a24", "stroke-width": 16, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: pts, fill: "none", stroke: "#e7a978", "stroke-width": 6, "stroke-linejoin": "round" }, g);
    const reperes = {};
    for (const nom in PLACES) {
      const cadre = D.el("rect", { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
      const [x0, y0, w, h] = poser(g, nom, ...PLACES[nom]);
      Object.entries({ x: x0 - 10, y: y0 - 10, width: w + 20, height: h + 20 }).forEach(([c, v]) => cadre.setAttribute(c, v.toFixed(1)));
      reperes[nom] = cadre;
      if (noms) { const [nx, ny, a, taille] = NOMS[nom]; D.etiquette(g, nx, ny, D.ORGANES[nom].court, { "text-anchor": a, "font-size": taille || 30, "font-weight": 700, fill: D.BLEU }); }
    }
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };
})();

/* =====================================================================
   voyage-booster-dessin.js — ce que l'édition « centrale booster CO₂ »
   change au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-booster.html (et par les
   outils quand ils fabriquent l'édition). Remplace, sans toucher au fichier
   commun : l'héroïne (molécule droite O=C=O + états « supercritique » et
   « solide », repris de l'édition CO₂ : même héroïne), les organes, la
   carte du circuit (deux étages, deux familles de meubles, deux branches),
   la carte d'identité (décalée à gauche : écran partagé) et le DIAGRAMME
   (version CHIFFRÉE : quatre isobares en bar absolus + point critique ;
   choix de Franck, 03/10 — le moteur commun ne sait que le schéma sans
   chiffres).
   CARTE (repère 1000 × 620, sens du fluide, sans croisement) : le chemin de
   l'héroïne = le froid négatif (D.CIRCUIT_PTS) : évaporateur BT en bas,
   compresseur BT puis compresseur MT à droite, refroidisseur de gaz en
   haut, détendeur HP puis bouteille à gauche, détendeur BT en bas à gauche.
   Deux branches (D.BRANCHES) : `flash` (vapeur de détente : côté de la
   bouteille → vanne de gaz → aspiration MT) et `MT` (froid positif :
   dérivation sous la bouteille → détendeur MT → évaporateur MT → aspiration
   MT). D.branchePoint(w, nom) : un point sur une branche (nom = "flash" par
   défaut, comme l'édition CO₂).
   D.VITRINE_C : centre du zoom d'entrée dans l'organe (moteur/voyage-theatre.js).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  D.VITRINE_C = [480, 425];

  /* ---------- l'héroïne CO₂ (= moteur/voyage-co2-dessin.js, recopiée : chaque édition se charge seule) ---------- */
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

  /* le fluide supercritique dans un volume (= édition CO₂) : plein, SANS surface, grains serrés qui frémissent.
     o : { x0, y0, x1, y1, pas, graine } → maj(t, temp, vitesse, op) ; vitesse en px/s le long de x. */
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

  /* ---------- les organes ---------- */
  const ECH = { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0] };
  const CMP = { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0] };
  const DET = { f: "detendeur_electronique", vb: [-19, -21, 40, 30], axe: [0, 0], lettres: [0, -12, 6.4, "TCE"] };
  const VAN = { f: "detendeur_electronique--sans-reperes", vb: [-19, -21, 40, 30], axe: [0, 0] };
  D.ORGANES = {
    evapBT: Object.assign({ nom: "évaporateur des surgelés", court: "froid négatif" }, ECH),
    compBT: Object.assign({ nom: "compresseur basse température", court: "compresseur|BT" }, CMP),
    compMT: Object.assign({ nom: "compresseur moyenne température", court: "compresseur|MT" }, CMP),
    refroidisseur: Object.assign({ nom: "refroidisseur de gaz", court: "refroidisseur de gaz" }, ECH),
    detendeurHP: Object.assign({ nom: "détendeur haute pression", court: "détendeur HP" }, VAN),
    bouteille: { f: "bouteille_liquide_verticale", vb: [-14, -26, 28, 52], axe: [0, -24.5], nom: "bouteille intermédiaire", court: "bouteille" },
    vanneGaz: Object.assign({ nom: "vanne de gaz de détente", court: "vanne de gaz de détente" }, VAN),
    detendeurMT: Object.assign({ nom: "détendeur des produits frais", court: "détendeur MT" }, DET),
    evapMT: Object.assign({ nom: "évaporateur des produits frais", court: "froid positif" }, ECH),
    detendeurBT: Object.assign({ nom: "détendeur des surgelés", court: "détendeur BT" }, DET)
  };

  /* la carte d'identité : celle de l'édition vis (décalée à gauche), nom sur deux ou trois lignes s'il est long */
  D.carteIdentite = function (parent, s) {
    const g = D.el("g", { "data-layout-allow-overlap": "" }, parent), o = D.ORGANES[s.organe], nom = o.nom[0].toUpperCase() + o.nom.slice(1);
    D.el("rect", { x: 30, y: 190, width: 900, height: 470, rx: 28, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 66, y: 226, width: 380, height: 300, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.18)", "stroke-width": 2 }, g);
    D.image(g, s.organe, 86, 246, 340, 260);
    D.texte(g, 256, 566, "son symbole", { "text-anchor": "middle", "font-size": 28, fill: "#637285", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 });
    const lignes = nom.length > 13 ? D.couper(nom, 15) : [nom], n = lignes.length;
    const taille = n > 2 ? 44 : n > 1 ? 50 : 60, pas = n > 2 ? 48 : 56;
    D.lignes(g, 482, 290, lignes, { "font-size": taille, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" }, pas);
    D.lignes(g, 482, n > 2 ? 456 : n > 1 ? 418 : 366, D.couper("Son rôle : " + s.role + ".", 22), { "font-size": 38, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, 46);
    D.texte(g, 482, 626, "Entrons dedans…", { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    return g;
  };

  /* ---------- la carte du circuit ---------- */
  /* le chemin de l'héroïne : 0 après le détendeur BT · 1 évaporateur BT · 2 coin · 3 compresseur BT · 4 arrivée du froid
     positif · 5 arrivée de la vapeur de détente · 6 compresseur MT · 7 coin · 8 refroidisseur · 9 coin · 10 détendeur HP ·
     11 bouteille · 12 départ du froid positif · 13 détendeur BT · 14 coin · 15 = 0 */
  D.CIRCUIT_PTS = [[300, 545], [620, 545], [890, 545], [890, 470], [890, 385], [890, 256], [890, 165], [890, 85], [560, 85],
    [95, 85], [95, 148], [95, 226], [95, 385], [95, 462], [95, 545], [300, 545]];
  D.BRANCHES = {
    flash: [[116, 256], [520, 256], [890, 256]],          // côté haut de la bouteille → vanne de gaz → aspiration MT
    MT: [[95, 385], [230, 385], [430, 385], [890, 385]]    // sous la bouteille → détendeur MT → évaporateur MT → aspiration MT
  };
  D.BRANCHE = D.BRANCHES.flash;
  const PLACES = { evapBT: [620, 545, 2.4, -90], compBT: [890, 470, 2.2, -90], compMT: [890, 165, 2.2, -90],
    refroidisseur: [560, 85, 2.4, 90], detendeurHP: [95, 148, 2.1, 90], bouteille: [95, 226, 1.5, 0],
    vanneGaz: [520, 256, 2.0, 0], detendeurMT: [230, 385, 2.0, 0], evapMT: [430, 385, 2.0, -90], detendeurBT: [95, 462, 2.1, 90] };
  const NOMS = { evapBT: [620, 488, "middle", 31], compBT: [830, 428, "end", 31], compMT: [830, 150, "end", 31],
    refroidisseur: [560, 186, "middle", 32], detendeurHP: [140, 156, "start", 31], bouteille: [140, 296, "start", 31],
    vanneGaz: [456, 236, "end", 31], detendeurMT: [152, 446, "start", 31], evapMT: [430, 488, "middle", 31], detendeurBT: [140, 522, "start", 31] };
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
  D.branchePoint = function (w, nom) { // 0 → début de la branche, longueur - 1 → arrivée à l'aspiration MT
    const B = D.BRANCHES[nom || "flash"], nb = B.length - 1;
    w = D.borne(w, 0, nb);
    const i = Math.min(nb - 1, Math.floor(w)), f = w - i, a = B[i], b = B[i + 1];
    return [D.lerp(a[0], b[0], f), D.lerp(a[1], b[1], f)];
  };
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const pts = D.CIRCUIT_PTS.map(p => p.join(",")).join(" ");
    for (const nom in D.BRANCHES) { // même tuyau que le circuit ; la vapeur de détente : trait clair pointillé (= édition CO₂)
      const br = D.BRANCHES[nom].map(p => p.join(",")).join(" ");
      D.el("polyline", { points: br, fill: "none", stroke: "#8a4a24", "stroke-width": nom === "flash" ? 11 : 16, "stroke-linejoin": "round" }, g);
      D.el("polyline", Object.assign({ points: br, fill: "none", stroke: nom === "flash" ? "#f3d2b6" : "#e7a978", "stroke-width": nom === "flash" ? 4 : 6, "stroke-linejoin": "round" },
        nom === "flash" ? { "stroke-dasharray": "10 8" } : {}), g);
    }
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
      surligne: (nom, oui) => { if (!reperes[nom]) return; reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };

  /* ---------- le diagramme CHIFFRÉ (remplace D.diagramme de moteur/voyage-diagramme.js, chargé APRÈS ce fichier) ----------
     Même contrat que le moteur commun (maj(w0, w, vus, o)), mêmes zones de l'écran (window.VOYAGE_DIAGRAMME_ZONE).
     Ce qui change : la pression est graduée aux quatre niveaux de la centrale (data.niveaux : [nom, p, coul, chiffre]),
     en bar ABSOLUS (titre de l'axe) ; le point critique est marqué (data.critique : texte, position, ancre) ; l'énergie
     reste sans graduation. Le moteur commun, qui se pose ensuite sur D.diagramme, est gardé de côté sans servir. */
  const POLICE = { "font-family": "Calibri, Arial, sans-serif", "font-weight": 700 };
  function diagrammeChiffre(parent, data) {
    const Z = window.VOYAGE_DIAGRAMME_ZONE, g = D.el("g", {}, parent);
    const x0 = Z.x + 80, x1 = Z.x + Z.l - 58, y0 = Z.y + 50, y1 = Z.y + Z.h - 56;
    const [hmin, hmax] = data.plage.h, [pmin, pmax] = data.plage.p;
    const X = h => x0 + (h - hmin) / (hmax - hmin) * (x1 - x0);
    const Y = p => y1 - Math.log10(p / pmin) / Math.log10(pmax / pmin) * (y1 - y0);
    const pt = ([h, p]) => X(h).toFixed(1) + "," + Y(p).toFixed(1);

    D.el("rect", { x: Z.x, y: Z.y, width: Z.l, height: Z.h, rx: 18, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, g);
    D.texte(g, Z.x + Z.l / 2, Z.y + 34, "Le diagramme enthalpique", Object.assign({ "text-anchor": "middle", "font-size": 26, fill: D.BLEU }, POLICE));
    const c = data.cloche.filter(r => r[0] >= pmin), sommet = data.pcrit;
    const d = "M " + c.map(r => pt([r[1], r[0]])).join(" L ") + " L " + pt([sommet[1], sommet[0]]) + " L " + c.slice().reverse().map(r => pt([r[2], r[0]])).join(" L ");
    D.el("path", { d: d, fill: "rgba(47,111,184,.10)", stroke: "#2f6fb8", "stroke-width": 3 }, g);
    D.el("rect", { x: x0, y: y0, width: x1 - x0, height: y1 - y0, fill: "none", stroke: "#637285", "stroke-width": 2 }, g);
    D.el("path", { d: "M " + x0 + " " + (y1 + 4) + " V " + (y0 - 6) + " m -7 12 l 7 -12 l 7 12", fill: "none", stroke: "#10233c", "stroke-width": 2.4 }, g);
    D.el("path", { d: "M " + (x0 - 4) + " " + y1 + " H " + (x1 + 8) + " m -12 -7 l 12 7 l -12 7", fill: "none", stroke: "#10233c", "stroke-width": 2.4 }, g);
    const axeP = D.texte(g, 0, 0, "pression absolue (bar)", Object.assign({ "text-anchor": "middle", "font-size": 20, fill: "#10233c" }, POLICE));
    axeP.setAttribute("transform", "translate(" + (Z.x + 22) + " " + ((y0 + y1) / 2) + ") rotate(-90)");
    D.texte(g, (x0 + x1) / 2, y1 + 34, "énergie de 1 kg (enthalpie h)", Object.assign({ "text-anchor": "middle", "font-size": 22, fill: "#10233c" }, POLICE));
    (data.zones || []).forEach(([texte, h, p, ancre]) =>
      D.texte(g, X(h), Y(p), texte, Object.assign({ "text-anchor": ancre || "middle", "font-size": 22, fill: "#2f6fb8" }, POLICE)));
    /* les quatre niveaux : pointillé sur tout le cadre, chiffre à gauche, nom à droite */
    (data.niveaux || []).forEach(([nom, p, coul, chiffre]) => {
      D.el("line", { x1: x0, y1: Y(p), x2: x1, y2: Y(p), stroke: coul, "stroke-width": 2, "stroke-dasharray": "6 6", opacity: 0.8 }, g);
      D.texte(g, x0 - 8, Y(p) + 7, chiffre, Object.assign({ "text-anchor": "end", "font-size": 20, fill: coul }, POLICE));
      D.texte(g, x1 + 8, Y(p) + 8, nom, Object.assign({ "font-size": 22, fill: coul }, POLICE));
    });
    /* le point critique : un point au sommet, son texte là où rien ne passe, relié par un trait fin */
    if (data.critique) {
      const k = data.critique, [tx, ty] = [X(k.ou[0]), Y(k.ou[1])];
      D.el("line", { x1: X(k.trait[0]), y1: Y(k.trait[1]), x2: X(sommet[1]), y2: Y(sommet[0]), stroke: "#2f6fb8", "stroke-width": 1.6 }, g);
      D.el("circle", { cx: X(sommet[1]), cy: Y(sommet[0]), r: 6, fill: "#2f6fb8", stroke: "#fff", "stroke-width": 2 }, g);
      k.texte.forEach((ligne, i) => D.texte(g, tx, ty + i * 22, ligne, Object.assign({ "text-anchor": k.ancre || "start", "font-size": 19, fill: "#2f6fb8" }, POLICE)));
    }
    D.el("polyline", { points: data.chemin.map(pt).join(" "), fill: "none", stroke: "#9aa7b5", "stroke-width": 3, "stroke-dasharray": "8 7", "stroke-linejoin": "round" }, g);
    const calques = {};
    for (const id in (data.calques || {})) {
      const k = data.calques[id], gc = D.el("g", { opacity: 0 }, g), coul = k.coul || "#c0392b";
      k.traits.forEach(tr => D.el("polyline", Object.assign({ points: tr.map(pt).join(" "), fill: "none", stroke: coul, "stroke-width": 4, "stroke-linejoin": "round" }, k.plein ? {} : { "stroke-dasharray": "10 6" }), gc));
      if (k.texte) D.texte(gc, X(k.ou[0]), Y(k.ou[1]), k.texte, Object.assign({ "text-anchor": k.ancre || "middle", "font-size": 21, fill: coul }, POLICE));
      calques[id] = gc;
    }
    const trace = D.el("polyline", { fill: "none", stroke: D.ORANGE, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
    const mol = D.heroine(g, { r: 30 });
    const n = data.chemin.length - 1;
    const surChemin = w => {
      const m = ((w % n) + n) % n, i = Math.min(n - 1, Math.floor(m)), f = m - i, a = data.chemin[i], b = data.chemin[i + 1];
      return [D.lerp(a[0], b[0], f), Math.exp(D.lerp(Math.log(a[1]), Math.log(b[1]), f))];
    };
    return {
      g: g, X: X, Y: Y, // X, Y : pour une scène qui voudrait pointer un endroit du diagramme
      maj: function (w0, w, vus, o) {
        o = o || {};
        for (const id in calques) calques[id].setAttribute("opacity", vus && vus[id] ? 1 : 0);
        if (w === null || w === undefined) { trace.setAttribute("points", ""); mol({ x: -999, y: -999, s: 0.01, t: 0 }); return; }
        const pts = [];
        if (w0 !== null && w0 !== undefined && w > w0) {
          for (let v = w0; v < w; v = Math.floor(v + 1)) pts.push(surChemin(v));
          pts.push(surChemin(w));
        }
        trace.setAttribute("points", pts.map(pt).join(" "));
        const [h, p] = surChemin(w);
        mol({ x: X(h), y: Y(p), s: 0.55, t: o.t || 0, temp: o.temp, etat: o.etat, humeur: o.humeur });
      }
    };
  }
  let commun = null;
  Object.defineProperty(D, "diagramme", { configurable: true, enumerable: true,
    get: () => diagrammeChiffre, set: f => { commun = f; } }); // le moteur commun reste dans `commun`, inutilisé ici
})();

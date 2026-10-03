/* =====================================================================
   voyage-centrale-scenes-a.js — édition « les centrales frigorifiques »,
   lot A : `intro`, `meuble`, `glissement`, `collecteur`
   ---------------------------------------------------------------------
   Brief : voyage-centrale/BRIEF-SCENES.md (section A). Même contrat que
   moteur/voyage-scenes-a.js : VOYAGE_SCENES[id] = function (g, c) → maj(t),
   tout est fonction PURE de t (pas de SMIL, pas d'animation CSS, hasard par
   D.alea). Les gestes sont accrochés au RANG des phrases du récit
   (donnees/voyage-centrale.js) : ajouter une phrase décale tout.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (la carte et le
   diagramme occupent la colonne de droite).
   BRIQUES LOCALES (un seul fichier, aucune aide ajoutée ailleurs) :
     · poste()      le meuble en coupe de côté + son circuit (ligne liquide,
                    électrovanne, détendeur, évaporateur, régulateur) ; même
                    dessin en grand (meuble), en réduction (meuble k6,
                    collecteur) et en vignette (intro k7) ;
     · loupe()      la loupe sur le liquide : molécules de quatre couleurs
                    (intro k6, glissement k1 à k3) ;
     · molecule(), thermo(), manometre(), flèches, pastilles, étiquettes.
   LIQUIDE = nappe (D.liquide), jamais des billes ; vapeur = molécules
   séparées ; l'héroïne (R-134a) vit entre les couches (voir `fond`).
   COULEURS DU MÉLANGE : violet, vert, rose = les trois autres fluides (jamais
   nommés) ; la famille de l'héroïne garde la couleur normale (D.couleur).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const el = D.el, CAL = "Calibri, Arial, sans-serif", TRE = "Trebuchet MS, Arial, sans-serif";
  const FOND = "#f4f8fc", LIQ = D.couleur(0.45, false), FRD = D.couleur(0.08, false);
  const VIOLET = "#8e44ad", VERT = "#1e7e54", ROSE = "#c2185b", AIRF = "#4a8fd6";
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const vis = (e, t, a, b) => opa(e, D.fenetre(t, a, b === undefined ? 1e9 : b, 0.4)); // visible de a à b
  const entree = (t, a, du) => D.lisse((t - a) / (du || 0.5));
  const ligne = (p, pts, at) => el("polyline", Object.assign({ points: pts.map(q => q.join(",")).join(" "), fill: "none" }, at), p);

  /* pastille centrée (x 492, y 742), réduite si elle déborde de la scène */
  function pas(parent, s, coul, o) {
    o = o || {};
    const cx = o.x === undefined ? 492 : o.x, y = o.y || 742, ancre = o.ancre || "middle", max = o.max || 930;
    let taille = o.taille || 30, g = D.pastille(parent, cx, y, s, coul, taille, ancre);
    if (g.largeur > max) { parent.removeChild(g); taille = Math.max(28, Math.floor(taille * max / g.largeur)); g = D.pastille(parent, cx, y, s, coul, taille, ancre); }
    g.setAttribute("opacity", 0);
    return g;
  }
  /* étiquette (une ou plusieurs lignes) + trait en pointillés, dans un groupe qu'on estompe */
  function etq(parent, x, y, texte, at, trait) {
    const gr = el("g", { opacity: 0 }, parent);
    const pas = ((at && at["font-size"]) || 32) * 1.2;
    (Array.isArray(texte) ? texte : [texte]).forEach((l, i) => D.etiquette(gr, x, y + i * pas, l, at));
    if (trait) D.trait(gr, ...trait);
    return gr;
  }
  /* une nappe (D.liquide) dont le pas tombe juste : elle finit proprement contre la paroi */
  function nappe(parent, o) {
    const n = Math.max(2, Math.round((o.x1 - o.x0) / (o.pas || 20)));
    return D.liquide(parent, Object.assign({}, o, { pas: (o.x1 - o.x0) / n }));
  }
  /* une molécule de vapeur colorée (comme D.mol, mais à la couleur du fluide voulu) */
  function molecule(parent, coul) {
    const u = el("use", { href: "#vm-mol", fill: coul }, parent);
    return function (x, y, op, s, c2) {
      u.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")" + (s && s !== 1 ? " scale(" + s.toFixed(2) + ")" : ""));
      u.setAttribute("opacity", (op === undefined ? 1 : D.borne(op, 0, 1)).toFixed(2));
      if (c2) u.setAttribute("fill", c2);
    };
  }
  /* l'héroïne sous le liquide + un fantôme au-dessus : on la devine à travers la nappe sans qu'elle disparaisse */
  function heroineVue(H, top, o) {
    const a = D.heroine(H, o), b = D.heroine(top, Object.assign({}, o, { sansHalo: true }));
    const m = function (p) { a(p); b(Object.assign({}, p, { op: (p.op === undefined ? 1 : p.op) * 0.55 })); };
    m.g = a.g;
    return m;
  }
  /* un thermomètre dessiné, sans chiffre : maj(niveau 0..1) ; coul = couleur de la colonne */
  function thermo(parent, x, yh, h, coul) {
    const g = el("g", {}, parent), rb = 22, yb = yh + h;
    el("rect", { x: x - 12, y: yh, width: 24, height: h - rb + 6, rx: 12, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, g);
    el("circle", { cx: x, cy: yb, r: rb, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, g);
    for (let k = 0; k < 6; k++) el("line", { x1: x + 12, y1: yh + 16 + k * (h - rb - 24) / 5, x2: x + 22, y2: yh + 16 + k * (h - rb - 24) / 5, stroke: D.BLEU, "stroke-width": 3 }, g);
    const col = el("rect", { x: x - 5, width: 10, rx: 5, fill: coul }, g), bulbe = el("circle", { cx: x, cy: yb, r: rb - 6, fill: coul }, g);
    return function (n, c) {
      const y0 = yh + 14, y1 = yb - 4, top = D.lerp(y1, y0, D.borne(n, 0, 1));
      col.setAttribute("y", top.toFixed(1)); col.setAttribute("height", (y1 - top).toFixed(1));
      if (c) { col.setAttribute("fill", c); bulbe.setAttribute("fill", c); }
    };
  }
  /* un manomètre dessiné, sans chiffre : cadran, graduations, aiguille ; maj(angle en degrés, 0 = vers le haut) */
  function manometre(parent, cx, cy, r) {
    const g = el("g", { transform: "translate(" + cx + " " + cy + ")" }, parent);
    el("circle", { r: r, fill: "#fff", stroke: D.BLEU, "stroke-width": 6 }, g);
    for (let a = -120; a <= 120; a += 30) {
      const q = a * Math.PI / 180, c = Math.cos(q), s = Math.sin(q);
      el("line", { x1: s * (r - 7), y1: -c * (r - 7), x2: s * (r - 16), y2: -c * (r - 16), stroke: D.BLEU, "stroke-width": 3 }, g);
    }
    el("path", { d: "M " + (-r * 0.62) + " " + (r * 0.34) + " A " + r * 0.72 + " " + r * 0.72 + " 0 1 1 " + (r * 0.62) + " " + (r * 0.34), fill: "none", stroke: "#cfd8e3", "stroke-width": 5, "stroke-linecap": "round" }, g);
    const ai = el("line", { x1: 0, y1: 8, x2: 0, y2: -(r - 14), stroke: "#c0392b", "stroke-width": 5, "stroke-linecap": "round" }, g);
    el("circle", { r: 7, fill: D.BLEU }, g);
    return a => ai.setAttribute("transform", "rotate(" + a.toFixed(1) + ")");
  }
  /* flèche pleine vers +x (tournée de `ang`) : maj(x, y, ang, long, op) */
  function fleche(parent, coul, ep) {
    const e = el("path", { fill: "none", stroke: coul, "stroke-width": ep || 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
    return function (x, y, ang, len, op) {
      e.setAttribute("d", "M 0 0 H " + len.toFixed(1) + " M " + (len - 16).toFixed(1) + " -14 L " + len.toFixed(1) + " 0 L " + (len - 16).toFixed(1) + " 14");
      e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang + ")");
      e.setAttribute("opacity", op.toFixed(2));
    };
  }

  /* =====================================================================
     LE POSTE : un meuble de produits frais en coupe de côté, avec son circuit
     ---------------------------------------------------------------------
     Repère de dessin « poste » : x 20 → 945, y 165 → 716 (le scale se fait sur
     le groupe retourné). Face ouverte du meuble à GAUCHE ; au fond, la gaine
     d'air (x 770 → 890) ; sous le meuble, la chambre de l'évaporateur ; le
     circuit part de la gauche : ligne liquide (axe y 621) → électrovanne
     (x 110 → 220) → détendeur (x 270 → 370) → évaporateur (x 380 → 910) →
     sortie vers la droite (x 945). Le régulateur du meuble et sa sonde sont à
     gauche, au-dessus.
     o : { produits: "laitiers" | "charcuterie" | "chambre", graine }
     rend { g, fond (couche de l'héroïne, sous les liquides), dessus,
            maj(t, s) } — s : { vanne 0..1 (noyau levé), bobine 0..1, thermo 0..1,
            air 0..1, souffle 0..1, chaleur 0..1, ebull 0..1, flux (horloge du
            courant dans la ligne), ventil (vitesse), reflets 0..1 }
            surface(x, t) : surface de la nappe de l'évaporateur.
     ===================================================================== */
  let nid = 0;
  const YC = 621, TI0 = 592, TI1 = 650;           // axe du tube, intérieur du tube
  const NIVEAU = x => x < 444 ? 0.86 : 0.86 * (1 - D.lisse((x - 444) / 300));
  function produits(p, type, graine) {
    const r = D.alea(graine), RANGS = [280, 360, 440, 520], PASTEL = ["#e8914a", "#4b8fd6", "#1e7e54", "#c2185b", "#e3c21b"];
    const trait = { stroke: D.BLEU, "stroke-width": 2.5, "stroke-linejoin": "round" };
    RANGS.forEach(yb => {
      for (let k = 0; k < 6; k++) {
        const x = 458 + k * 44, c = PASTEL[Math.floor(r() * PASTEL.length)], f = Math.floor(r() * 3);
        if (type === "charcuterie") {
          if (f === 0) { // barquette de tranches
            el("rect", Object.assign({ x: x - 19, y: yb - 20, width: 38, height: 20, rx: 4, fill: "#f6c9cf" }, trait), p);
            el("path", { d: "M " + (x - 14) + " " + (yb - 12) + " q 7 -8 14 0 t 14 0", fill: "none", stroke: "#c2185b", "stroke-width": 3, "stroke-linecap": "round" }, p);
            el("rect", Object.assign({ x: x - 19, y: yb - 40, width: 38, height: 20, rx: 4, fill: "#f6c9cf" }, trait), p);
          } else if (f === 1) { // jambon
            el("path", Object.assign({ d: "M " + (x - 18) + " " + yb + " v -20 q 0 -22 18 -22 q 18 0 18 22 v 20 Z", fill: "#e98c9a" }, trait), p);
            el("rect", { x: x - 8, y: yb - 28, width: 16, height: 8, rx: 4, fill: "#fff", opacity: 0.8 }, p);
          } else { // saucisson
            el("ellipse", Object.assign({ cx: x, cy: yb - 13, rx: 21, ry: 13, fill: "#a0452f" }, trait), p);
            el("line", { x1: x - 7, y1: yb - 25, x2: x - 7, y2: yb - 1, stroke: "#e8d7a8", "stroke-width": 3 }, p);
            el("line", { x1: x + 7, y1: yb - 25, x2: x + 7, y2: yb - 1, stroke: "#e8d7a8", "stroke-width": 3 }, p);
          }
        } else if (type === "chambre") {
          if (f === 0) { // carton
            el("rect", Object.assign({ x: x - 19, y: yb - 46, width: 38, height: 46, fill: "#d3ae72" }, trait), p);
            el("rect", { x: x - 6, y: yb - 46, width: 12, height: 14, fill: "#f0e3c4" }, p);
          } else if (f === 1) { // bac
            el("rect", Object.assign({ x: x - 20, y: yb - 30, width: 40, height: 30, rx: 3, fill: "#6e9fd6" }, trait), p);
            [-10, 0, 10].forEach(d => el("rect", { x: x + d - 3, y: yb - 20, width: 6, height: 10, rx: 2, fill: "#eaf2fb" }, p));
          } else { // petit carton
            el("rect", Object.assign({ x: x - 17, y: yb - 32, width: 34, height: 32, fill: "#c4975a" }, trait), p);
            el("rect", { x: x - 17, y: yb - 20, width: 34, height: 5, fill: "#f0e3c4" }, p);
          }
        } else {
          if (f === 0) { // pot de yaourt
            el("path", Object.assign({ d: "M " + (x - 15) + " " + (yb - 34) + " H " + (x + 15) + " L " + (x + 11) + " " + yb + " H " + (x - 11) + " Z", fill: "#fff" }, trait), p);
            el("rect", Object.assign({ x: x - 17, y: yb - 41, width: 34, height: 9, rx: 3, fill: c }, trait), p);
          } else if (f === 1) { // brique de lait
            el("rect", Object.assign({ x: x - 16, y: yb - 50, width: 32, height: 50, fill: "#fff" }, trait), p);
            el("rect", { x: x - 14, y: yb - 34, width: 28, height: 14, fill: c }, p);
            el("path", Object.assign({ d: "M " + (x - 16) + " " + (yb - 50) + " l 8 -9 h 16 l 8 9", fill: "#eaf2fb" }, trait), p);
          } else { // bouteille
            el("rect", Object.assign({ x: x - 11, y: yb - 38, width: 22, height: 38, rx: 5, fill: "#fff" }, trait), p);
            el("rect", Object.assign({ x: x - 5, y: yb - 54, width: 10, height: 17, fill: "#fff" }, trait), p);
            el("rect", { x: x - 7, y: yb - 60, width: 14, height: 7, rx: 2, fill: c }, p);
            el("rect", { x: x - 9, y: yb - 26, width: 18, height: 10, fill: c, opacity: 0.85 }, p);
          }
        }
      }
    });
  }

  function poste(parent, o) {
    o = o || {};
    const g = el("g", {}, parent), P = { g: g };
    /* ---- 1 · le meuble ---- */
    el("rect", { x: 392, y: 192, width: 498, height: 328, fill: "#eef5fb" }, g);                 // l'intérieur
    el("rect", { x: 770, y: 192, width: 120, height: 328, fill: "#d9e7f4" }, g);                // la gaine d'air, à l'arrière
    el("line", { x1: 770, y1: 224, x2: 770, y2: 520, stroke: "#6f8399", "stroke-width": 6, "stroke-dasharray": "9 11" }, g); // paroi percée
    el("rect", { x: 428, y: 216, width: 342, height: 6, fill: "url(#vm-acier)" }, g);
    [280, 360, 440].forEach(y => el("rect", { x: 424, y: y, width: 346, height: 10, fill: "url(#vm-acier)" }, g)); // les étagères
    produits(g, o.produits || "laitiers", o.graine || 3);
    el("rect", { x: 890, y: 165, width: 20, height: 357, fill: "url(#vm-acier-h)" }, g);        // le dos
    el("rect", { x: 378, y: 165, width: 532, height: 27, rx: 6, fill: "url(#vm-acier)" }, g);    // le dessus
    el("rect", { x: 378, y: 165, width: 14, height: 66, rx: 5, fill: "url(#vm-acier-h)" }, g);  // la lèvre avant
    /* ---- 2 · la chambre de l'évaporateur ---- */
    el("rect", { x: 380, y: 520, width: 530, height: 196, rx: 6, fill: "url(#vm-acier)" }, g);
    el("rect", { x: 392, y: 532, width: 506, height: 172, fill: FOND }, g);
    el("rect", { x: 770, y: 520, width: 120, height: 14, fill: "#d9e7f4" }, g);                   // l'ouverture vers la gaine
    for (let k = 0; k < 8; k++) el("rect", { x: 398 + k * 10, y: 521, width: 5, height: 12, fill: "#2c3e53" }, g); // la grille de retour
    for (let k = 0; k < 15; k++) el("rect", { x: 446 + k * 22, y: 545, width: 6, height: 149, fill: "url(#vm-acier-h)", opacity: 0.92 }, g); // les ailettes
    /* ---- 3 · les tubes et les corps de vanne (parois) ---- */
    D.tube(g, 20, YC - 39, 90, 78, "cuivre");                                                    // ligne liquide
    D.tube(g, 220, YC - 39, 50, 78, "cuivre");
    el("rect", { x: 110, y: 575, width: 110, height: 92, rx: 10, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, g); // corps de l'électrovanne
    el("rect", { x: 110, y: TI0, width: 110, height: TI1 - TI0, fill: FOND }, g);
    el("rect", { x: 147, y: 480, width: 36, height: 112, fill: "#eef2f6" }, g);                 // le fourreau du noyau
    el("rect", { x: 270, y: 570, width: 100, height: 102, rx: 12, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, g); // corps du détendeur
    el("polygon", { points: "270,592 294,592 312,614 324,614 342,592 370,592 370,650 342,650 324,628 312,628 294,650 270,650", fill: FOND }, g);
    D.tube(g, 370, YC - 39, 575, 78, "cuivre");                                                  // l'évaporateur, puis la sortie
    const fond = el("g", {}, g);                                                                 // l'héroïne : sous les liquides
    /* ---- 4 · les liquides (translucides) ---- */
    // haute pression : une nappe de liquide tiède dans la ligne, le corps de vanne et la moitié du détendeur
    const idc = "vm-poste-" + (++nid), cp = el("clipPath", { id: idc }, g);
    el("rect", { x: 20, y: TI0, width: 250, height: TI1 - TI0 }, cp);
    el("polygon", { points: "270,592 294,592 312,614 318,614 318,628 312,628 294,650 270,650" }, cp);
    const hp = el("g", { "clip-path": "url(#" + idc + ")" }, g);
    let front = 147;                                                  // où la nappe s'arrête (le noyau tant qu'il est posé)
    const ligneL = nappe(hp, { x0: 20, x1: 318, yh: TI0, yb: TI1, niveau: x => 0.72 * D.lisse((front - x) / 12 + 0.5), couleur: () => LIQ, pas: 14, opacite: 0.85 });
    const flux = D.courant(hp, 20, 316, 612, TI1, 6, 3);
    el("polygon", { points: "318,614 324,614 342,592 370,592 370,650 342,650 324,628 318,628", fill: FRD, opacity: 0.8 }, g); // après le détendeur
    const nap = nappe(g, { x0: 370, x1: 945, yh: TI0, yb: TI1, niveau: NIVEAU, couleur: x => D.couleur(D.lerp(0.08, 0.13, D.borne((x - 400) / 360, 0, 1)), false), pas: 15 });
    const bul = D.bulles(el("g", {}, g), 18, (o.graine || 3) + 1, false);
    const rv = D.alea((o.graine || 3) + 7), V = [];
    for (let i = 0; i < 22; i++) V.push({ s: rv(), ry: rv(), ph: rv() * 6.28, maj: molecule(g, "#fff") });
    const bulles2 = D.bulles(el("g", {}, g), 5, (o.graine || 3) + 5, false);
    /* ---- 5 · les pièces mobiles et les repères, par-dessus ---- */
    const dessus = el("g", {}, g);
    // électrovanne : noyau, bobine
    const noyau = el("g", {}, g);
    el("rect", { x: 148, y: 0, width: 34, height: 110, rx: 5, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, noyau);
    el("rect", { x: 148, y: 100, width: 34, height: 10, rx: 3, fill: "#1f2a36" }, noyau);
    const bob = el("g", {}, g);
    [112, 188].forEach(x => {
      el("rect", { x: x, y: 484, width: 30, height: 91, rx: 8, fill: "url(#vm-marine-h)" }, bob);
      for (let k = 0; k < 5; k++) el("line", { x1: x + 4, y1: 498 + k * 17, x2: x + 26, y2: 498 + k * 17, stroke: "#c57a45", "stroke-width": 6, "stroke-linecap": "round" }, bob);
    });
    const contour = el("rect", { x: 106, y: 478, width: 118, height: 99, rx: 12, fill: "none", stroke: D.BLEU, "stroke-width": 4 }, g);
    const champ = el("g", {}, g);
    [[78, 46], [96, 62]].forEach(([rx, ry]) => el("ellipse", { cx: 165, cy: 528, rx: rx, ry: ry, fill: "none", stroke: "#ff6b35", "stroke-width": 4, "stroke-dasharray": "9 9" }, champ));
    // détendeur : pointeau, membrane, capillaire, bulbe
    el("rect", { x: 315, y: 548, width: 6, height: 74, fill: "#3f4a55" }, g);
    el("polygon", { points: "311,606 325,606 320,624 316,624", fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    el("rect", { x: 298, y: 546, width: 40, height: 26, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 2 }, g);
    el("path", { d: "M 282 548 A 36 30 0 0 1 354 548 Z", fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 }, g);
    el("path", { d: "M 352 540 L 380 538 H 742 V 576", fill: "none", stroke: "#3f4a55", "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    el("rect", { x: 722, y: 570, width: 40, height: 16, rx: 7, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, g);
    // ventilateurs dans la gaine
    const vA = D.ventilateur(g, 800, 484, 28), vB = D.ventilateur(g, 860, 484, 28);
    /* ---- 6 · le régulateur du meuble, sa sonde ---- */
    const reg = el("g", {}, g);
    el("rect", { x: 40, y: 225, width: 190, height: 120, rx: 12, fill: "#fff", stroke: D.BLEU, "stroke-width": 5 }, reg);
    el("rect", { x: 54, y: 238, width: 98, height: 94, rx: 6, fill: "#16304f" }, reg);
    el("rect", { x: 92, y: 250, width: 10, height: 62, rx: 5, fill: "#fff", opacity: 0.25 }, reg);
    el("circle", { cx: 97, cy: 318, r: 10, fill: "#fff", opacity: 0.25 }, reg);
    const colR = el("rect", { x: 94, width: 6, rx: 3 }, reg), bulbR = el("circle", { cx: 97, cy: 318, r: 8 }, reg);
    [[-1, 78, 80], [1, 116, 114]].forEach(([, a, b]) => el("path", { d: "M " + a + " 280 L " + b + " 273 L " + b + " 287 Z", fill: "#9be7a8" }, reg)); // la consigne
    const led = el("circle", { cx: 192, cy: 250, r: 10, stroke: D.BLEU, "stroke-width": 3 }, reg);
    [[176, 296], [208, 296], [176, 322], [208, 322]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 8, fill: "#cfd8e3", stroke: D.BLEU, "stroke-width": 2 }, reg));
    ligne(g, [[230, 285], [310, 285], [310, 345], [398, 345]], { stroke: "#3f4a55", "stroke-width": 3, "stroke-dasharray": "10 6", "stroke-linecap": "round", "stroke-linejoin": "round" }); // câble de la sonde
    el("rect", { x: 396, y: 339, width: 40, height: 12, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, g);
    el("circle", { cx: 436, cy: 345, r: 8, fill: "#e8914a", stroke: "#5d6b7a", "stroke-width": 2 }, g);
    const cable = ligne(g, [[62, 345], [62, 528], [106, 528]], { "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "10 6" });
    /* ---- 7 · l'air ---- */
    const air = el("g", {}, g), CH = [];
    const filet = (n, pos, ang, vit, souffle) => { for (let i = 0; i < n; i++) CH.push({ f: i / n, maj: D.chevron(air), pos: pos, ang: ang, vit: vit, souffle: souffle }); };
    filet(5, f => [410, 228 + f * 288], 0, 0.13);                       // le rideau d'air, devant
    filet(5, f => [756 - f * 322, 204], 90, 0.13);                      // sous le dessus, vers l'avant
    filet(4, f => [830, 440 - f * 226], 180, 0.13);                     // la gaine, vers le haut
    [250, 330, 410, 490].forEach((y, k) => CH.push({ f: k * 0.25, maj: D.chevron(air), pos: f => [766 - f * 60, y], ang: 90, vit: 0.2, souffle: true }));
    const CHAL = [];
    for (let k = 0; k < 5; k++) [[0, 581], [180, 661]].forEach(([ang, y]) => CHAL.push({ x: 478 + k * 62, y: y, ang: ang, f: D.frac(k * 0.37 + (ang ? 0.5 : 0)), maj: D.chaleur(air) }));

    P.fond = fond; P.dessus = dessus;
    P.surface = nap.surface;
    P.maj = function (t, s) {
      s = Object.assign({ front: 147, vanne: 0, bobine: 0, thermo: 0.3, air: 1, souffle: 1, chaleur: 0, ebull: 1, flux: 0, ventil: 1, reflets: 1 }, s || {});
      // le noyau : levé (vanne = 1) ou posé sur le passage (vanne = 0)
      noyau.setAttribute("transform", "translate(0 " + D.lerp(540, 480, s.vanne).toFixed(1) + ")");
      const allume = s.bobine > 0.5;
      contour.setAttribute("stroke", allume ? "#ff6b35" : D.BLEU); contour.setAttribute("stroke-width", allume ? 7 : 4);
      opa(champ, allume ? 0.55 + 0.35 * Math.sin(t * 6) : 0);
      cable.setAttribute("stroke", allume ? "#ff6b35" : "#9aa7b5");
      led.setAttribute("fill", allume ? "#ff9a3c" : "#cfd8e3");
      const top = D.lerp(312, 252, D.borne(s.thermo, 0, 1)), chaud = s.thermo > 0.55;
      colR.setAttribute("y", top.toFixed(1)); colR.setAttribute("height", (312 - top).toFixed(1));
      colR.setAttribute("fill", chaud ? "#ff9a5c" : "#7cd4ff"); bulbR.setAttribute("fill", chaud ? "#ff9a5c" : "#7cd4ff");
      vA(t * 300 * s.ventil); vB(t * 300 * s.ventil + 40);
      flux(s.flux, 110);
      CH.forEach(c => {
        const f = D.frac(c.f + t * c.vit), [x, y] = c.pos(f);
        c.maj(x, y, c.ang, AIRF, D.fenetre(f, 0, 1, 0.12) * (c.souffle ? s.souffle : s.air));
      });
      CHAL.forEach(a => {
        const f = D.frac(a.f + t * 0.45), d = 24 * (1 - f);
        a.maj(a.x, a.ang ? a.y + d : a.y - d, a.ang, s.chaleur * D.fenetre(f, 0, 1, 0.25));
      });
      front = s.front === undefined ? 147 : s.front; ligneL.maj(t);
      nap.maj(t);
      bul(t, q => { const x = 384 + q * 360, nv = NIVEAU(x); return [x, TI1 - 6, nap.surface(x, t) + 4, nv > 0.08 ? s.ebull : 0, null]; });
      bulles2(t, q => { const x = 332 + q * 30; return [x, 640, 604, 1, null]; });
      V.forEach(m => {
        const p = D.frac(m.s + t / 18), x = 430 + 515 * (1 - Math.pow(1 - p, 1.7)), libre = nap.surface(x, t) - TI0;
        m.maj(x, TI0 + 14 + m.ry * Math.max(0, libre - 22) + Math.sin(t * 3 + m.ph) * 3, D.borne((libre - 22) / 14, 0, 1) * D.fenetre(p, 0, 1, 0.06), 0.8, D.couleur(D.lerp(0.08, 0.15, p), true));
      });
    };
    return P;
  }

  /* =====================================================================
     meuble — le poste en coupe : électrovanne, détendeur, évaporateur
     ---------------------------------------------------------------------
     k0, k1 : la carte d'identité couvre la scène (pres: 2) ; la coupe
     s'anime à partir de k2. k2 : le liquide arrive par la ligne (le noyau est
     posé). k3 : le régulateur, la bobine, le noyau se lève. k4 : le détendeur.
     k5 : l'évaporateur. k6 : on recule, trois postes côte à côte.
     ===================================================================== */
  S.meuble = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const monde = el("g", {}, g), p1 = poste(monde, { produits: "laitiers", graine: 3 });
    const etiq = el("g", {}, p1.g);
    const MID = { "text-anchor": "middle" };
    const lEv = etq(etiq, 138, 752, "électrovanne", MID, [138, 724, 138, 672]);
    const lDe = etq(etiq, 322, 752, "détendeur", MID, [322, 724, 322, 676]);
    const lEv2 = etq(etiq, 640, 752, "évaporateur", MID);
    const lReg = etq(etiq, 40, 212, "régulateur du meuble", {});
    const mila = heroineVue(p1.fond, p1.dessus, { r: 30 });
    const pP = pas(g, "pression ↓", D.ORANGE, { x: 90, y: 452, ancre: "start" });
    // les deux autres postes (k6) : même dessin, en réduction ; sous chacun : son nom et ses trois symboles
    const p2 = poste(monde, { produits: "charcuterie", graine: 9 }), p3 = poste(monde, { produits: "chambre", graine: 14 });
    const K = 0.322, X0 = [24, 340, 656], Y0 = 282, NOM = ["produits laitiers", "charcuterie", "chambre froide"];
    const rang = el("g", {}, g), noms = NOM.map((nom, i) => { const gr = el("g", { opacity: 0 }, rang); D.etiquette(gr, X0[i] + 149, Y0 + 262, nom, MID); return gr; });
    const symboles = ["electrovanne", "detendeur", "evaporateur"].map((s, j) => {
      const gr = el("g", { opacity: 0 }, rang);
      X0.forEach(x => D.image(gr, s, x + 149 - 135 + j * 92, Y0 + 284, 86, 62));
      return gr;
    });
    const dest = i => ({ x: X0[i] - 20 * K, y: Y0 - 165 * K });
    const tOn = A(3, 0.5), tOuvre = tOn + 0.8, tFerme = A(5, 0.8), tZ = T[6] + 0.1;
    return function (t) {
      // ---- le noyau, le liquide, la position de l'héroïne (repère du poste) ----
      const vanne = t < tOuvre ? D.lisse((t - tOn) / 0.8) : 1 - D.lisse((t - tFerme) / 0.9);
      const flux = D.courbe([[T[2], 0], [E[2], 4], [tOuvre, 4], [A(4, 0.5), 9]], t, true);
      const front = D.courbe([[tOuvre - 0.1, 147], [tOuvre + 0.2, 160], [E[3], 318]], t);
      const xH = D.courbe([[T[2], 60], [E[2], 104], [tOuvre - 0.2, 112], [tOuvre + 0.6, 168], [E[3], 255], [A(4, 0.2), 290], [A(4, 0.36), 318], [A(4, 0.56), 342], [E[4], 424], [T[5], 446], [E[5], 620], [c.D, 620]], t);
      const sq = D.fenetre(t, A(4, 0.22), A(4, 0.54), 0.15);               // le passage étroit : elle s'écrase
      const etat = t < A(4, 0.36) ? "liquide" : "bout";
      const temp = D.courbe([[A(4, 0.3), 0.45], [A(4, 0.5), 0.08], [E[5], 0.12]], t, true);
      const zoom = D.lisse((t - tZ) / 1.8), kk = D.lerp(1, K, zoom);
      const yy = xH < 330 ? 618 + Math.sin(t * 2) * 3 : D.borne(p1.surface(xH, t) + 8, TI0 + 24, TI1 - 20);
      const humeur = t > A(4, 0.2) && t < A(4, 0.58) ? "surprise" : t > A(4, 0.58) && t < E[4] ? "froid" : "sourire";
      mila({ x: xH, y: yy, s: D.lerp(0.66, 1.2, zoom) - 0.34 * sq, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: 0.7 * sq, regard: [1, 0], op: D.lisse((t - T[2]) / 0.8) });
      const reg = t < A(3, 0.36) ? 0.3 : t < tOn ? D.lerp(0.3, 0.8, D.lisse((t - A(3, 0.36)) / (tOn - A(3, 0.36)))) : t < tFerme ? 0.8 : D.lerp(0.8, 0.28, D.lisse((t - tFerme) / 2));
      p1.maj(t, { vanne: vanne, bobine: t > tOn && t < tFerme + 0.3 ? 1 : 0, thermo: reg, flux: flux, front: front, chaleur: D.fenetre(t, T[5], c.D + 1, 0.8), souffle: D.lerp(0.45, 1, D.lisse((t - T[5]) / 1)) });
      [p2, p3].forEach((p, i) => p.maj(t + i * 1.7, { vanne: 1, bobine: 1, thermo: 0.7, flux: t * 0.9, front: 318, chaleur: 0.7 }));
      // ---- étiquettes et pastille, au fil des phrases ----
      const fin6 = T[6] - 0.3;
      vis(lEv, t, T[3], fin6); vis(lReg, t, A(3, 0.26), fin6);
      vis(lDe, t, T[4], fin6); vis(lEv2, t, T[5], fin6); vis(pP, t, A(4, 0.55), T[5]);
      // ---- k6 : on recule ----
      p1.g.setAttribute("transform", "translate(" + D.lerp(0, dest(0).x, zoom).toFixed(1) + " " + D.lerp(0, dest(0).y, zoom).toFixed(1) + ") scale(" + kk.toFixed(3) + ")");
      [p2, p3].forEach((p, i) => { const d = dest(i + 1); p.g.setAttribute("transform", "translate(" + d.x.toFixed(1) + " " + d.y.toFixed(1) + ") scale(" + K + ")"); opa(p.g, entree(t, A(6, 0.08 + i * 0.3), 0.8)); });
      opa(noms[0], entree(t, tZ + 1, 0.6)); opa(noms[1], entree(t, A(6, 0.08), 0.6)); opa(noms[2], entree(t, A(6, 0.38), 0.6));
      symboles.forEach((gr, j) => opa(gr, entree(t, A(6, 0.56 + 0.1 * j), 0.5)));
      return { carte: D.courbe([[T[2], 0.62], [E[2], 0.95], [tOuvre + 0.6, 1.02], [A(4, 0.36), 1.25], [E[4], 1.5], [T[5], 1.6], [E[5], 1.82]], t, true), temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     LA LOUPE : une nappe de liquide vue de très près (intro k6, glissement)
     ---------------------------------------------------------------------
     Des molécules de quatre couleurs, serrées dans le liquide : violet, vert,
     rose (les trois autres fluides) et la couleur normale (la famille de
     l'héroïne). maj(t, { a, b, f }) : part de chaque couleur qui s'est
     échappée en vapeur (a : violet + vert, b : rose, f : famille), de 0 à 1.
     o : { graine, n, trou: [x, y, r] (la place de l'héroïne) }
     ===================================================================== */
  const TOUR = 2 * Math.PI;
  function loupe(parent, cx, cy, R, o) {
    o = o || {};
    const g = el("g", {}, parent);
    el("line", { x1: cx + R * 0.7, y1: cy + R * 0.7, x2: cx + R * 1.1, y2: cy + R * 1.1, stroke: "#4a3a28", "stroke-width": 26, "stroke-linecap": "round" }, g);
    el("line", { x1: cx + R * 0.74, y1: cy + R * 0.74, x2: cx + R * 1.08, y2: cy + R * 1.08, stroke: "#b08a5c", "stroke-width": 12, "stroke-linecap": "round" }, g);
    el("circle", { cx: cx, cy: cy, r: R - 4, fill: "#f7fbff" }, g);
    const cid = "vm-loupe-" + (++nid);
    el("circle", { cx: cx, cy: cy, r: R - 8 }, el("clipPath", { id: cid }, g));
    const dedans = el("g", { "clip-path": "url(#" + cid + ")" }, g);
    const ys = cy - R * 0.12, reste = R - 30, rr = D.alea(o.graine || 5), n = o.n || 40;
    // les places dans le liquide : serrées, sans se chevaucher ; et les places dans la vapeur, plus espacées
    const place = (ok, dmin, nb) => {
      const pts = [];
      for (let essais = 0; pts.length < nb && essais < 12000; essais++) {
        const a = rr() * TOUR, d = Math.sqrt(rr()) * reste, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
        if (!ok(x, y) || pts.some(q => Math.hypot(q[0] - x, q[1] - y) < dmin)) continue;
        pts.push([x, y]);
      }
      return pts;
    };
    const liq = place((x, y) => y > ys + 16 && !(o.trou && Math.hypot(x - o.trou[0], y - o.trou[1]) < o.trou[2]), 26, n);
    const vapP = place((x, y) => y < ys - 14 && y > cy - R + 30, 28, liq.length);
    const nV = Math.round(liq.length * 0.22), types = [];
    for (let i = 0; i < liq.length; i++) types.push(i < nV ? "V" : i < 2 * nV ? "G" : i < 3 * nV ? "R" : "F");
    for (let i = types.length - 1; i > 0; i--) { const j = Math.floor(rr() * (i + 1)); [types[i], types[j]] = [types[j], types[i]]; }
    const COUL = { V: VIOLET, G: VERT, R: ROSE, F: D.couleur(0.08, false) }, M = [];
    liq.forEach((q, i) => {
      const v = vapP[i] || [q[0], ys - 30];
      M.push({ x: q[0], y: q[1], vx: v[0], vy: v[1], type: types[i], th: rr() * 0.62, ph: rr() * TOUR, maj: molecule(dedans, COUL[types[i]]) });
    });
    const nap = nappe(dedans, { x0: cx - R, x1: cx + R, yh: cy - R, yb: cy + R, niveau: () => (cy + R - ys) / (2 * R), couleur: () => D.couleur(0.08, false), pas: 20, opacite: 0.34 });
    el("circle", { cx: cx, cy: cy, r: R - 2, fill: "none", stroke: "#3b4a5e", "stroke-width": 14 }, g);
    el("path", { d: "M " + (cx - R * 0.62) + " " + (cy - R * 0.5) + " A " + R * 0.8 + " " + R * 0.8 + " 0 0 1 " + (cx - R * 0.15) + " " + (cy - R * 0.78), fill: "none", stroke: "#fff", "stroke-width": 9, "stroke-linecap": "round", opacity: 0.75 }, g);
    return {
      g: g, cx: cx, cy: cy, R: R, ys: ys,
      maj: function (t, p) {
        p = p || {};
        M.forEach(m => {
          const niv = m.type === "F" ? (p.f || 0) : m.type === "R" ? (p.b || 0) : (p.a || 0);
          const q = D.lisse(D.borne((niv - m.th) / 0.3, 0, 1)), wig = D.lerp(3.2, 5, q);
          m.maj(D.lerp(m.x, m.vx, q) + Math.sin(t * 1.9 + m.ph) * wig,
            D.lerp(m.y, m.vy, q) - Math.sin(q * Math.PI) * 16 + Math.cos(t * 1.5 + m.ph * 1.3) * wig, 1, 1.12);
        });
        nap.maj(t);
      }
    };
  }

  /* une vignette : « point de bulle » (la première bulle) ou « point de rosée » (la dernière goutte) */
  function vignette(parent, x, y, w, h, titre, genre) {
    const g = el("g", { opacity: 0 }, parent);
    el("rect", { x: x, y: y, width: w, height: h, rx: 18, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.etiquette(g, x + w / 2, y + 46, titre, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: D.BLEU });
    const tx = x + 26, tw = w - 52, ty = y + 66, th = h - 86, yh = ty + 10, yb = ty + th - 10, cx = x + w / 2;
    D.tube(g, tx, ty, tw, th, "cuivre");
    if (genre === "bulle") {
      const nap = nappe(g, { x0: tx, x1: tx + tw, yh: yh, yb: yb, niveau: () => 0.82, couleur: () => FRD, pas: 20 });
      const b = el("circle", { fill: "#fff", "fill-opacity": 0.55, stroke: "#2f6fb8", "stroke-width": 3 }, g);
      return { g: g, maj: function (t) {
        nap.maj(t);
        const f = D.frac(t / 3.4), ease = D.lisse(f);
        b.setAttribute("cx", (cx + Math.sin(t * 2) * 3).toFixed(1)); b.setAttribute("cy", D.lerp(yb - 22, yh + 30, f * f).toFixed(1));
        b.setAttribute("r", D.lerp(2, 17, ease).toFixed(1)); b.setAttribute("opacity", D.fenetre(f, 0, 1, 0.08).toFixed(2));
      } };
    }
    const rg = D.alea(41), V = [];
    for (let i = 0; i < 9; i++) V.push({ x: tx + 30 + rg() * (tw - 60), y: yh + 22 + rg() * (yb - yh - 60), ph: rg() * TOUR, maj: molecule(g, D.couleur(0.13, true)) });
    const goutte = el("path", { d: "M 0 -22 Q 17 6 0 20 Q -17 6 0 -22 Z", fill: FRD, stroke: D.BLEU, "stroke-width": 3 }, g);
    return { g: g, maj: function (t) {
      V.forEach(m => m.maj(m.x + Math.sin(t * 1.7 + m.ph) * 9, m.y + Math.cos(t * 1.3 + m.ph) * 7, 1, 0.9));
      const f = D.frac(t / 4.2), s = 1.15 * (1 - D.lisse(D.borne((f - 0.1) / 0.72, 0, 1)));
      goutte.setAttribute("transform", "translate(" + (cx + 40) + " " + (yb - 24) + ") scale(" + Math.max(0.01, s).toFixed(2) + ")");
      goutte.setAttribute("opacity", s > 0.04 ? 1 : 0);
    } };
  }
  /* une carte du technicien : un mot en gros, ce qu'il veut dire dessous */
  function carteTech(parent, x, y, w, titre, sous, coul) {
    const g = el("g", { opacity: 0 }, parent);
    el("rect", { x: x, y: y, width: w, height: 112, rx: 16, fill: "#fffdf8", stroke: coul, "stroke-width": 5 }, g);
    D.texte(g, x + 24, y + 52, titre, { "font-size": 40, "font-weight": 700, fill: coul, "font-family": TRE });
    D.texte(g, x + 24, y + 94, sous, { "font-size": 32, "font-weight": 600, fill: "#10233c", "font-family": CAL });
    return g;
  }

  /* =====================================================================
     glissement — le tube d'évaporateur, la loupe, les thermomètres
     ---------------------------------------------------------------------
     k0 surprise · k1 la loupe : quatre fluides · k2 les plus pressées partent
     d'abord · k3 il reste des lentes : il bout plus chaud · k4 deux
     thermomètres, deux manomètres · k5 point de bulle · k6 point de rosée ·
     k7 les deux cartes du technicien. Le diagramme montre seul les isothermes
     (récit : calques à partir de la phrase 4) : rien à rendre ici.
     ===================================================================== */
  S.glissement = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const X0 = 30, X1 = 960, L = X1 - X0, YH = 210, YB = 320;
    const lvl = x => 0.88 * Math.pow(Math.max(0, 1 - (x - X0) / L), 1.15) + 0.03;
    const tb = el("g", {}, g);                                           // le tube, qui monte quand la loupe arrive
    const air = el("g", {}, tb), CHAL = [];
    for (let k = 0; k < 7; k++) CHAL.push({ x: 250 + k * 80, f: D.frac(k * 0.37), maj: D.chaleur(air) });
    D.tube(tb, X0, 200, L, 130, "cuivre");
    const vap = el("g", {}, tb), fond = el("g", {}, tb);
    const nap = nappe(tb, { x0: X0, x1: X1, yh: YH, yb: YB, niveau: lvl, couleur: x => D.couleur(D.lerp(0.08, 0.13, (x - X0) / L), false), pas: 20 });
    const bul = D.bulles(el("g", {}, tb), 46, 12, false);
    const haut = el("g", {}, tb);
    // la vapeur dans le tube : les plus pressées d'abord (violet, vert), la famille de l'héroïne en dernier
    const rv = D.alea(31), V = [];
    [[14, 0.0, 0.72, i => i % 2 ? VERT : VIOLET], [12, 0.22, 0.92, () => ROSE], [18, 0.46, 1, () => D.couleur(0.1, true)]].forEach(([n, pa, pb, col]) => {
      for (let i = 0; i < n; i++) { const u = (i + rv() * 0.8) / n; V.push({ x: X0 + 18 + D.lerp(pa, pb, Math.pow(u, 0.8)) * (L - 36), ry: rv(), ph: rv() * TOUR, maj: molecule(vap, col(i)) }); }
    });
    D.etiquette(tb, X0, 180, "entrée", { "font-weight": 700 }); D.etiquette(tb, X1, 180, "sortie", { "font-weight": 700, "text-anchor": "end" });
    const mT = heroineVue(fond, haut, { r: 30 });
    // la loupe sur la nappe, au milieu du tube
    const CX = 495, CY = 530, RL = 150, HX = 495, HY = 265;
    const gl = el("g", { opacity: 0 }, g);
    D.trait(gl, HX - 40, 322, CX - 130, CY - 58, "#637285"); D.trait(gl, HX + 40, 322, CX + 130, CY - 58, "#637285");
    el("circle", { cx: HX, cy: HY, r: 58, fill: "none", stroke: "#3b4a5e", "stroke-width": 6 }, gl);
    const lp = loupe(gl, CX, CY, RL, { graine: 7, n: 46, trou: [CX, CY + 48, 46] });
    const mL = D.heroine(gl, { r: 30 });
    const lMoi = etq(g, 672, 482, ["moi, R-134a :", "la plus lente"], {}, [668, 528, CX + 40, CY + 52]);
    const p1 = pas(g, "quatre fluides mélangés : le R449A", D.BLEU), p3 = pas(g, "il bout un peu plus chaud", D.ORANGE);
    // k4 : deux thermomètres, deux manomètres
    const g4 = el("g", { opacity: 0 }, g), gm = el("g", { opacity: 0 }, g);
    [110, 215, 745, 850].forEach(x => D.trait(g4, x, 334, x, x === 110 || x === 850 ? 392 : 418, "#637285"));
    const thE = thermo(g4, 110, 396, 176, "#2f6fb8"), thS = thermo(g4, 850, 396, 176, "#c0392b");
    const maE = manometre(gm, 215, 470, 52), maS = manometre(gm, 745, 470, 52);
    const gGl = el("g", { opacity: 0 }, g), flGl = fleche(gGl, D.ORANGE, 12);
    D.etiquette(gGl, 480, 440, "le glissement", { "text-anchor": "middle", fill: D.ORANGE, "font-size": 36, "font-weight": 700 });
    const q1 = pas(g, "même pression", D.BLEU, { x: 300 }), q2 = pas(g, "température ↑", "#c0392b", { x: 690 });
    // k5, k6 : les deux vignettes ; k7 : les deux cartes
    const vB = vignette(g, 40, 372, 440, 240, "point de bulle", "bulle"), vR = vignette(g, 500, 372, 440, 240, "point de rosée", "rosee");
    const pinB = el("g", { opacity: 0 }, g), pinR = el("g", { opacity: 0 }, g);
    // pas de repère « point de bulle » sur le tube : après le détendeur, le fluide entre déjà en partie vaporisé (relecture du 03/10)
    el("path", { d: "M 88 334 l 12 -22 l 12 22 Z", fill: D.BLEU }, pinB); D.trait(pinB, 100, 340, 150, 370, "#637285");
    el("path", { d: "M 778 334 l 12 -22 l 12 22 Z", fill: D.BLEU }, pinR); D.trait(pinR, 790, 340, 760, 370, "#637285");
    const cSur = carteTech(g, 500, 634, 440, "surchauffe", "→ depuis le point de rosée", D.ORANGE);
    const cSou = carteTech(g, 40, 634, 440, "sous-refroidissement", "→ depuis le point de bulle", D.BLEU);
    return function (t) {
      // ---- le tube : au milieu de l'écran pendant la surprise, puis il monte pour laisser place à la loupe ----
      tb.setAttribute("transform", "translate(0 " + (170 * (1 - D.lisse((t - (T[1] - 0.4)) / 1.3))).toFixed(1) + ")");
      CHAL.forEach(a => { const f = D.frac(a.f + t * 0.45); a.maj(a.x, 196 - 14 * (1 - f), 0, 0.9 * D.fenetre(f, 0, 1, 0.25)); });
      nap.maj(t);
      bul(t, q => { const x = X0 + 14 + q * (L - 28); return [x, YB - 6, nap.surface(x, t) + 4, lvl(x) > 0.1 ? 1 : 0, null]; });
      V.forEach(m => {
        const libre = nap.surface(m.x, t) - YH;
        m.maj(m.x + Math.sin(t * 1.3 + m.ph) * 16, YH + 14 + m.ry * Math.max(0, libre - 30) + Math.cos(t * 1.7 + m.ph) * 4, D.borne((libre - 28) / 16, 0, 1), 0.85);
      });
      // ---- l'héroïne dans le tube ----
      const x = D.courbe([[T[0], 130], [T[1], 130], [T[1] + 2, 495], [T[4] + 0.4, 495], [A(4, 0.66), 870], [c.D, 870]], t);
      const temp = D.courbe([[T[4], 0.08], [A(4, 0.7), 0.13]], t, true);
      const humeur = t < E[0] + 0.6 ? "surprise" : t > A(4, 0.6) ? "chaud" : "sourire";
      mT({ x: x, y: D.borne(nap.surface(x, t) + 6, YH + 36, YB - 30), s: 0.78, t: t, temp: temp, etat: "bout", humeur: humeur, regard: [1, 0] });
      // ---- k1 à k3 : la loupe ----
      opa(gl, entree(t, A(1, 0.18), 0.7) * (1 - entree(t, T[4], 0.6)));
      lp.maj(t, { a: D.courbe([[A(2, 0.04), 0], [A(2, 0.55), 1]], t, true), b: D.courbe([[A(3, 0.0), 0], [A(3, 0.55), 1]], t, true), f: D.courbe([[A(3, 0.4), 0], [E[3], 0.22]], t, true) });
      mL({ x: CX, y: CY + 48 + Math.sin(t * 2) * 3, s: 0.92, t: t, temp: 0.08, etat: "bout", humeur: t > A(2, 0.1) && t < E[2] ? "surprise" : "sourire", regard: [0, -1] });
      vis(p1, t, A(1, 0.35), E[1] + 0.4); vis(lMoi, t, A(2, 0.5), E[2] + 0.6); vis(p3, t, A(3, 0.68), E[3] + 0.5);
      // ---- k4 : thermomètres et manomètres ----
      opa(g4, D.fenetre(t, T[4], T[5] - 0.2, 0.5)); opa(gm, D.fenetre(t, A(4, 0.1), T[5] - 0.2, 0.5));
      thE(0.3); thS(D.courbe([[A(4, 0.4), 0.3], [A(4, 0.65), 0.66]], t), "#c0392b");
      maE(48); maS(48);
      flGl(300, 478, 0, 360 * entree(t, A(4, 0.74), 1.2), 1); vis(gGl, t, A(4, 0.74), T[5] - 0.2);
      vis(q1, t, A(4, 0.1), T[5] - 0.2); vis(q2, t, A(4, 0.45), T[5] - 0.2);
      // ---- k5, k6, k7 ----
      vB.maj(t); vR.maj(t);
      opa(vB.g, entree(t, T[5], 0.6)); opa(vR.g, entree(t, T[6], 0.6));
      opa(pinR, entree(t, T[6], 0.6));
      opa(cSur, entree(t, A(7, 0.12), 0.6)); opa(cSou, entree(t, A(7, 0.55), 0.6));
      return { carte: D.borne(1.6 + 0.35 * (x - X0) / L, 1.6, 1.95), temp: temp, etat: "bout", humeur: humeur };
    };
  };

  /* =====================================================================
     collecteur — de la sortie du meuble au collecteur d'aspiration
     ---------------------------------------------------------------------
     k0 : la fin du poste (même dessin que `meuble`, en grand) : sortie du
     meuble, surchauffe, bulbe du détendeur. k1 : on recule (le poste rapetisse
     en bas à gauche), la conduite d'aspiration (manchon noir) traverse le
     magasin jusqu'au mur du local technique. k2 : deux autres conduites la
     rejoignent par des tés. k3 : le collecteur d'aspiration et ses trois
     piquages. k4 : un manomètre, une seule basse pression. k5 : les trois
     meubles, chacun son électrovanne, à son rythme.
     CARTE (écran) : poste i en bas (x SORTIE[i]), conduite à y = YL, mur à x = MUR,
     collecteur dans le local technique (x XCOL → 952).
     ===================================================================== */
  const longueur = pts => pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  function sur(pts, f) { // position à la fraction f de la longueur d'une ligne brisée
    const L = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = L.reduce((a, b) => a + b, 0);
    let d = D.borne(f, 0, 1) * tot;
    for (let i = 0; i < L.length; i++) {
      if (d <= L[i] || i === L.length - 1) { const k = L[i] ? D.borne(d / L[i], 0, 1) : 0; return [D.lerp(pts[i][0], pts[i + 1][0], k), D.lerp(pts[i][1], pts[i + 1][1], k)]; }
      d -= L[i];
    }
  }
  /* des conduites isolées : manchon noir, cuivre, intérieur clair (trois passes pour que les tés se fondent) */
  function conduites(parent, chemins) {
    [["#262b33", 74], ["#b66d40", 54], [FOND, 40]].forEach(([coul, ep]) =>
      chemins.forEach(pts => ligne(parent, pts, { stroke: coul, "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "butt" })));
  }
  /* un courant de petites molécules de vapeur le long d'une ligne brisée */
  function courant(parent, pts, n, graine) {
    const r = D.alea(graine), M = [], L = longueur(pts);
    for (let i = 0; i < n; i++) M.push({ ph: (i + r() * 0.6) / n, dy: (r() - 0.5) * 12, maj: molecule(parent, "#fff") });
    return function (t, vit, op, temp) {
      M.forEach(m => {
        const f = D.frac(m.ph + t * vit / L), [x, y] = sur(pts, f);
        m.maj(x, y + m.dy * 0.4, op * D.fenetre(f, 0, 1, 0.04), 0.78, D.couleur(temp + 0.05 * f, true));
      });
    };
  }

  S.collecteur = function (g, c) {
    const T = c.T, E = c.E, A = c.A, MID = { "text-anchor": "middle" };
    const KM = 0.22, KC = 0.322, SORTIE = [225, 433, 641], XR = SORTIE.map(x => x + 20), YAXE = 668, YL = 415, XCOL = 745, MUR = 706;
    const XC = [24, 340, 656], YC0 = 250, EX = 930, XP = [790, 850, 910];
    // ---- le décor : le magasin, le mur, le local technique ----
    const decor = el("g", {}, g), magasin = el("g", {}, decor), local = el("g", { opacity: 0 }, decor);
    el("rect", { x: 20, y: 172, width: 686, height: 575, rx: 14, fill: "#f5f0e6", stroke: "rgba(27,58,99,.14)", "stroke-width": 2 }, magasin);
    el("rect", { x: 21, y: 566, width: 684, height: 180, fill: "#ebe4d5" }, magasin);
    const rr = D.alea(17), PAST = ["#e8914a", "#4b8fd6", "#1e7e54", "#c2185b", "#e3c21b"];
    for (let i = 0; i < 5; i++) {
      const x = 44 + i * 128;
      el("rect", { x: x, y: 212, width: 112, height: 304, rx: 8, fill: "#e3eaf2", stroke: "#c3cfdb", "stroke-width": 3 }, magasin);
      for (let k = 0; k < 4; k++) {
        const y = 212 + 72 * (k + 1);
        el("rect", { x: x + 4, y: y - 6, width: 104, height: 6, fill: "#c3cfdb" }, magasin);
        for (let j = 0; j < 5; j++) el("rect", { x: x + 10 + j * 19, y: y - 34, width: 15, height: 28, rx: 4, fill: PAST[Math.floor(rr() * PAST.length)], opacity: 0.55 }, magasin);
      }
    }
    el("rect", { x: MUR, y: 172, width: 22, height: 448, fill: "#8d99a6" }, local);
    el("rect", { x: MUR + 22, y: 172, width: 232, height: 448, fill: "#e4ebe6" }, local);
    el("rect", { x: MUR + 22, y: 600, width: 232, height: 20, fill: "#b9c3cc" }, local);
    D.etiquette(local, 844, 206, "local technique", Object.assign({ "font-size": 28 }, MID));
    // les compresseurs (leur bas seulement), le collecteur d'aspiration et ses trois piquages
    XP.forEach(x => {
      el("rect", { x: x - 27, y: YL - 171, width: 54, height: 60, rx: 6, fill: "url(#vm-acier-h)", stroke: "#5d6b7a", "stroke-width": 3 }, local);
      el("rect", { x: x - 32, y: YL - 117, width: 64, height: 12, rx: 3, fill: "url(#vm-acier)" }, local);
      el("circle", { cx: x, cy: YL - 141, r: 7, fill: "#9be7a8", stroke: "#5d6b7a", "stroke-width": 2 }, local);
      el("rect", { x: x - 22, y: YL - 107, width: 44, height: 78, fill: "url(#vm-marine-h)" }, local);
    });
    const idf = "vm-fondu-" + (++nid), gf = el("linearGradient", { id: idf, x1: 0, y1: 0, x2: 0, y2: 1 }, local);
    el("stop", { offset: 0, "stop-color": "#e4ebe6", "stop-opacity": 1 }, gf); el("stop", { offset: 1, "stop-color": "#e4ebe6", "stop-opacity": 0 }, gf);
    el("rect", { x: MUR + 22, y: YL - 204, width: 232, height: 62, fill: "url(#" + idf + ")" }, local);   // le haut des compresseurs se perd
    el("rect", { x: XCOL, y: YL - 58, width: 207, height: 116, rx: 22, fill: "url(#vm-marine)" }, local);   // le collecteur, isolé
    el("rect", { x: XCOL + 12, y: YL - 34, width: 183, height: 68, rx: 8, fill: FOND }, local);
    XP.forEach(x => el("rect", { x: x - 12, y: YL - 107, width: 24, height: 90, fill: FOND }, local));
    // ---- les trois postes (même dessin que `meuble`), les conduites ----
    const monde = el("g", {}, g);
    const P = [poste(monde, { produits: "laitiers", graine: 3 }), poste(monde, { produits: "charcuterie", graine: 9 }), poste(monde, { produits: "chambre", graine: 14 })];
    const place = (p, K, x, y) => p.g.setAttribute("transform", "translate(" + (x - 20 * K).toFixed(1) + " " + (y - 165 * K).toFixed(1) + ") scale(" + K.toFixed(3) + ")");
    const chemins = [[[SORTIE[0], YAXE], [XR[0], YAXE], [XR[0], YL], [XCOL, YL]], [[SORTIE[1], YAXE], [XR[1], YAXE], [XR[1], YL], [XCOL, YL]], [[SORTIE[2], YAXE], [XR[2], YAXE], [XR[2], YL], [XCOL, YL]]];
    const cond = [el("g", { opacity: 0 }, g), el("g", { opacity: 0 }, g), el("g", { opacity: 0 }, g)];
    chemins.forEach((pts, i) => conduites(cond[i], [pts]));
    const vap = el("g", {}, g);
    const flux = [courant(vap, chemins[0], 13, 3), courant(vap, chemins[1], 7, 5), courant(vap, chemins[2], 7, 8)];
    const fluxC = XP.map((x, i) => courant(vap, [[XCOL, YL], [x, YL], [x, YL - 100]], 5, 21 + i));
    // ---- les étiquettes, le manomètre ----
    const lCol = etq(g, 844, YL + 118, ["collecteur", "d'aspiration"], MID, [844, YL + 92, 844, YL + 62]);
    const gm = el("g", { opacity: 0 }, g);
    el("rect", { x: 838, y: YL + 56, width: 12, height: 20, fill: "url(#vm-acier-h)" }, gm);
    const mano = manometre(gm, 844, YL + 122, 46);
    const pCol = pas(g, "une seule basse pression", D.BLEU), pSur = pas(g, "surchauffe", D.ORANGE, { y: 746 }), pCh = pas(g, "chacun son électrovanne", D.ORANGE);
    // k0 : le bulbe et le détendeur
    const anneaux = el("g", { opacity: 0 }, P[0].g);
    [[742, 578, 30], [318, 556, 58]].forEach(([x, y, r]) => el("circle", { cx: x, cy: y, r: r, fill: "none", stroke: "#ff6b35", "stroke-width": 6, "stroke-dasharray": "14 9" }, anneaux));
    const tes = el("g", { opacity: 0 }, g);
    [XR[1], XR[2]].forEach(x => el("circle", { cx: x, cy: YL, r: 52, fill: "none", stroke: "#ff6b35", "stroke-width": 6, "stroke-dasharray": "14 9" }, tes));
    const te = tes.childNodes;
    // k5 : sous chaque meuble, un voyant de bobine et un thermomètre
    const g5 = el("g", { opacity: 0 }, g), VOY = [], TH = [];
    XC.forEach((x, i) => {
      const cx = x + 149;
      D.trait(g5, x + 47, 402, cx - 62, 514, "#637285");
      VOY.push(el("circle", { cx: cx - 62, cy: 540, r: 24, stroke: D.BLEU, "stroke-width": 5 }, g5));
      TH.push(thermo(g5, cx + 40, 462, 130, "#2f6fb8"));
    });
    // ---- l'héroïne : dans le poste (k0), puis sur l'écran ----
    const mP = heroineVue(P[0].fond, P[0].dessus, { r: 30 }), top = el("g", {}, g), mT = D.heroine(top, { r: 30 });
    const tZ = T[1], tFin = T[1] + 2.2, tArr = T[3] + 0.3;
    return function (t) {
      // ---- le recul (k1) puis le passage aux trois meubles (k5) ----
      const w1 = D.lisse((t - tZ) / 2.2), w5 = D.lisse((t - T[5] + 0.2) / 1.5);
      const z1 = D.lerp(1, KM, w1), exit = [D.lerp(EX, SORTIE[0] - 3, w1), D.lerp(621, YAXE, w1)];
      if (t < T[5] - 0.2) place(P[0], z1, exit[0] - 910 * z1, exit[1] - 456 * z1);
      else place(P[0], D.lerp(KM, KC, w5), D.lerp(SORTIE[0] - 3 - 910 * KM, XC[0], w5), D.lerp(YAXE - 456 * KM, YC0, w5));
      [1, 2].forEach(i => place(P[i], D.lerp(KM, KC, w5), D.lerp(SORTIE[i] - 925 * KM, XC[i], w5), D.lerp(YAXE - 456 * KM, YC0, w5)));
      opa(P[1].g, entree(t, A(2, 0.0), 0.8)); opa(P[2].g, entree(t, A(2, 0.0), 0.8));
      const carte = (1 - w5);
      opa(magasin, entree(t, tZ + 0.8, 1.2) * carte); opa(local, entree(t, A(1, 0.55), 0.9) * carte);
      cond.forEach((cc, i) => opa(cc, (i === 0 ? entree(t, tFin - 0.3, 0.7) : entree(t, A(2, 0.0), 0.7)) * carte));
      // ---- les postes : l'état des vannes et de l'air ----
      const per = [5.4, 7.2, 9.6], ph = [per[0] * 0.2, per[1] * 0.75, per[2] * 0.3];
      P.forEach((p, i) => {
        const v = t < T[5] - 0.2 ? (i === 0 ? 0 : 1) : 0.5 + 0.5 * D.borne(Math.sin(TOUR * (t - T[5] + ph[i]) / per[i]) * 4, -1, 1);
        p.maj(t + i * 1.7, { vanne: v, bobine: v > 0.5 ? 1 : 0, thermo: 0.28 + 0.015 * Math.sin(t * 0.7 + i), flux: t * 0.8, front: 318, chaleur: 0.8, souffle: 1 });
        VOY[i].setAttribute("fill", t >= T[5] - 0.2 && v > 0.5 ? "#ff9a3c" : "#dde4ec");
      });
      const gg = D.fenetre(t, T[5] + 0.3, c.D + 1, 0.8);
      opa(g5, gg); TH.forEach((th, i) => th(0.34 + 0.012 * Math.sin(t * 0.9 + i * 2)));
      // ---- k0 : le poste, l'héroïne qui sort ----
      opa(anneaux, D.fenetre(t, A(0, 0.55), T[1] + 0.1, 0.4) * (0.55 + 0.45 * Math.sin(t * 5)));
      const xd = D.courbe([[T[0], 640], [A(0, 0.5), 740], [E[0] + 0.3, 925], [T[1], 930]], t);
      mP({ x: xd, y: 621 + Math.sin(t * 2) * 3, s: 0.66, t: t, temp: D.lerp(0.12, 0.15, D.borne((xd - 640) / 250, 0, 1)), etat: xd < 720 ? "bout" : "vapeur", humeur: "sourire", regard: [1, 0], op: t < T[1] ? 1 : 0 });
      // ---- k1 à k4 : l'héroïne sur la conduite, dans le collecteur ----
      const f = D.courbe([[tFin, 0], [tArr, 1]], t, true), pt0 = sur(chemins[0], f);
      let x, y;
      if (t < tFin) { x = exit[0]; y = exit[1]; }
      else if (t < tArr) { x = pt0[0]; y = pt0[1]; }
      else { x = D.courbe([[tArr, XCOL], [A(4, 0.45), 850]], t); y = YL + Math.sin(t * 2) * 4; }
      let s = D.lerp(0.66, 0.5, w1), op = t < T[1] ? 0 : 1;
      const xe = [x, y];
      const sortie = D.lisse((t - T[5] + 0.2) / 1.5);
      if (sortie > 0) { xe[0] = D.lerp(x, 120, sortie); xe[1] = D.lerp(y, 215, sortie); s = D.lerp(0.5, 0.95, sortie); }
      const temp = D.courbe([[T[0], 0.15], [tFin, 0.15], [tArr, 0.2]], t, true);
      mT({ x: xe[0], y: xe[1], s: s, t: t, temp: temp, etat: "vapeur", humeur: "sourire", regard: sortie > 0 ? [1, 1] : [1, 0], op: op });
      // ---- les courants de vapeur ----
      flux[0](t, 85, entree(t, tFin, 0.6) * carte, 0.15);
      flux[1](t, 70, entree(t, A(2, 0.0), 0.6) * carte, 0.17); flux[2](t, 70, entree(t, A(2, 0.0), 0.6) * carte, 0.17);
      fluxC.forEach(fc => fc(t, 60, entree(t, T[3], 0.6) * carte, 0.2));
      opa(te[0], D.fenetre(t, A(2, 0.0), A(2, 0.75), 0.4) * (0.6 + 0.4 * Math.sin(t * 5))); opa(te[1], D.fenetre(t, A(2, 0.3), E[2] + 0.4, 0.4) * (0.6 + 0.4 * Math.sin(t * 5)));
      tes.setAttribute("opacity", 1);
      // ---- étiquettes et pastilles ----
      vis(pSur, t, A(0, 0.4), T[1] - 0.2);
      vis(lCol, t, A(3, 0.05), E[3] + 0.4);
      opa(gm, D.fenetre(t, T[4], T[5] - 0.3, 0.6)); mano(18 + 3 * Math.sin(t * 2));
      vis(pCol, t, A(4, 0.1), T[5] - 0.2); vis(pCh, t, A(5, 0.15), c.D + 1);
      return { carte: D.courbe([[T[0], 1.7], [E[0], 1.95], [tFin, 2.0], [T[3], 2.9], [E[3], 3.1], [c.D, 3.1]], t, true), temp: temp, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* =====================================================================
     intro — le supermarché, le froid positif, la centrale, la carte, le mélange
     ---------------------------------------------------------------------
     La carte de titre s'efface avant k0. k0 l'héroïne et son nom · k1 le
     supermarché (façade, puis le rayon frais et la chambre froide) · k2 le
     froid positif (thermomètre au-dessus de zéro ; les surgelés, grisés) ·
     k3 le local technique et la centrale en petit · k4 la carte du circuit et
     son tour · k5 la flèche vers le diagramme (rendu : `diag`, 0 → 8 pendant
     k5 et k6) · k6 la loupe : le mélange R449A · k7 vers un meuble.
     ===================================================================== */
  const ecrit = p => Array.isArray(p) ? p[0] : p;

  /* un meuble de rayon frais vu de face (étagères garnies) ; gris = éteint (les surgelés) */
  function meubleFace(parent, x, y, w, h, graine, gris) {
    const g = el("g", {}, parent), r = D.alea(graine), PAS = gris ? ["#b9c1ca", "#c9d0d8", "#aab3bd"] : ["#e8914a", "#4b8fd6", "#1e7e54", "#c2185b", "#e3c21b", "#fff"];
    el("rect", { x: x, y: y, width: w, height: h, rx: 10, fill: gris ? "#cfd5dc" : "url(#vm-acier-h)", stroke: gris ? "#aab3bd" : "#5d6b7a", "stroke-width": 3 }, g);
    el("rect", { x: x + 10, y: y + 34, width: w - 20, height: h - 74, fill: gris ? "#e4e8ec" : "#e8f2fb" }, g);
    el("rect", { x: x + 6, y: y + 6, width: w - 12, height: 20, rx: 6, fill: gris ? "#eef1f4" : "#fff", opacity: 0.9 }, g);
    const n = 4, pas = (h - 74) / n, k = Math.max(3, Math.floor((w - 30) / 26));
    for (let i = 0; i < n; i++) {
      const yb = y + 34 + (i + 1) * pas;
      for (let j = 0; j < k; j++) {
        const hh = 24 + Math.floor(r() * 3) * 7, c = PAS[Math.floor(r() * PAS.length)];
        el("rect", { x: x + 16 + j * ((w - 32) / k), y: yb - 8 - hh, width: (w - 32) / k - 5, height: hh, rx: 4, fill: c, stroke: gris ? "#9aa4af" : D.BLEU, "stroke-width": 1.8 }, g);
      }
      el("rect", { x: x + 10, y: yb - 8, width: w - 20, height: 8, fill: gris ? "#aab3bd" : "url(#vm-acier)" }, g);
    }
    for (let j = 0; j < 8; j++) el("rect", { x: x + 16 + j * ((w - 32) / 8), y: y + h - 28, width: (w - 32) / 8 - 6, height: 12, rx: 2, fill: gris ? "#8e98a3" : "#2c3e53" }, g);
    return g;
  }
  /* un coffre de surgelés, éteint */
  function coffre(parent, x, y, w, h) {
    const g = el("g", {}, parent);
    el("rect", { x: x, y: y + 24, width: w, height: h - 24, rx: 12, fill: "#cfd5dc", stroke: "#aab3bd", "stroke-width": 3 }, g);
    el("rect", { x: x + 10, y: y, width: w - 20, height: 34, rx: 8, fill: "#e4e8ec", stroke: "#aab3bd", "stroke-width": 3 }, g);
    for (let i = 0; i < 3; i++) el("rect", { x: x + 22 + i * ((w - 44) / 3), y: y + 6, width: (w - 44) / 3 - 10, height: 22, rx: 4, fill: "#f4f6f8", stroke: "#aab3bd", "stroke-width": 2 }, g);
    for (let i = 0; i < 5; i++) el("rect", { x: x + 24 + i * ((w - 48) / 5), y: y + 52, width: (w - 48) / 5 - 12, height: h - 78, rx: 6, fill: ["#b9c1ca", "#c9d0d8"][i % 2], stroke: "#9aa4af", "stroke-width": 1.8 }, g);
    return g;
  }
  /* la porte d'une chambre froide : panneau isolant, poignée, joint */
  function chambreFroide(parent, x, y, w, h) {
    const g = el("g", {}, parent);
    el("rect", { x: x - 12, y: y - 12, width: w + 24, height: h + 12, rx: 6, fill: "#7f8d9c" }, g);
    el("rect", { x: x, y: y, width: w, height: h, rx: 4, fill: "#eef3f8", stroke: "#5d6b7a", "stroke-width": 5 }, g);
    for (let i = 1; i < 4; i++) el("line", { x1: x + 8, y1: y + i * h / 4, x2: x + w - 8, y2: y + i * h / 4, stroke: "#cfd9e3", "stroke-width": 4 }, g);
    el("rect", { x: x + 22, y: y + h * 0.42, width: 20, height: 92, rx: 8, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 3 }, g);
    [y + 36, y + h - 56].forEach(yy => el("rect", { x: x + w - 12, y: yy, width: 18, height: 28, rx: 4, fill: "url(#vm-acier)" }, g));
    el("rect", { x: x + w / 2 - 44, y: y + 22, width: 88, height: 44, rx: 8, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, g);
    [[0, -14], [12, -7], [12, 7], [0, 14], [-12, 7], [-12, -7]].forEach(([dx, dy]) => el("line", { x1: x + w / 2, y1: y + 44, x2: x + w / 2 + dx * 1.2, y2: y + 44 + dy * 1.2, stroke: "#2f6fb8", "stroke-width": 4, "stroke-linecap": "round" }, g));
    return g;
  }
  /* la façade d'un supermarché, sans enseigne : un panier, rien d'autre */
  function facade(parent) {
    const g = el("g", {}, parent), r = D.alea(23);
    el("rect", { x: 20, y: 640, width: 945, height: 74, fill: "#d8d1c2" }, g);
    for (let k = 0; k < 8; k++) el("rect", { x: 50 + k * 116, y: 676, width: 64, height: 8, fill: "#fff", opacity: 0.85 }, g);
    el("rect", { x: 70, y: 262, width: 830, height: 378, fill: "#f4e9d3", stroke: D.BLEU, "stroke-width": 5 }, g);
    el("rect", { x: 54, y: 236, width: 862, height: 38, rx: 6, fill: D.BLEU }, g);
    el("rect", { x: 335, y: 158, width: 300, height: 84, rx: 18, fill: "#fff", stroke: D.BLEU, "stroke-width": 6 }, g);
    el("path", { d: "M 438 194 H 532 L 518 228 H 452 Z", fill: D.ORANGE, stroke: D.BLEU, "stroke-width": 4, "stroke-linejoin": "round" }, g);
    el("path", { d: "M 458 194 Q 485 160 512 194", fill: "none", stroke: D.BLEU, "stroke-width": 6, "stroke-linecap": "round" }, g);
    [472, 485, 498].forEach(xx => el("line", { x1: xx, y1: 200, x2: xx - 2, y2: 222, stroke: "#fff", "stroke-width": 3 }, g));
    [[100, 330, 230], [640, 330, 230]].forEach(([x, y, w]) => {
      el("rect", { x: x, y: y, width: w, height: 270, rx: 8, fill: "#d6e9f8", stroke: D.BLEU, "stroke-width": 4 }, g);
      for (let i = 0; i < 3; i++) {
        const yb = y + 86 + i * 80;
        el("rect", { x: x + 10, y: yb, width: w - 20, height: 6, fill: "#9fb3c8" }, g);
        for (let j = 0; j < 7; j++) el("rect", { x: x + 16 + j * 30, y: yb - 38, width: 22, height: 38, rx: 4, fill: ["#e8914a", "#4b8fd6", "#1e7e54", "#c2185b", "#e3c21b"][Math.floor(r() * 5)], opacity: 0.8 }, g);
      }
      el("path", { d: "M " + (x + 14) + " " + (y + 256) + " L " + (x + 90) + " " + (y + 14), stroke: "#fff", "stroke-width": 10, opacity: 0.35, "stroke-linecap": "round" }, g);
    });
    for (let k = 0; k < 10; k++) el("rect", { x: 340 + k * 29.4, y: 322, width: 29.4, height: 50, fill: k % 2 ? "#fff" : "#2f6fb8", stroke: D.BLEU, "stroke-width": 2 }, g);
    [[372, 117], [489, 117]].forEach(([x, w]) => {
      el("rect", { x: x, y: 380, width: w, height: 260, fill: "#cfe6fb", stroke: D.BLEU, "stroke-width": 4 }, g);
      el("rect", { x: x + (x < 480 ? w - 20 : 8), y: 480, width: 8, height: 70, rx: 4, fill: "url(#vm-acier-h)" }, g);
    });
    el("path", { d: "M 380 630 L 470 392", stroke: "#fff", "stroke-width": 10, opacity: 0.4, "stroke-linecap": "round" }, g);
    // un chariot
    el("path", { d: "M 786 566 H 880 L 868 612 H 798 Z", fill: "#e8edf2", stroke: D.BLEU, "stroke-width": 4, "stroke-linejoin": "round" }, g);
    el("path", { d: "M 786 566 L 774 540 H 756", fill: "none", stroke: D.BLEU, "stroke-width": 5, "stroke-linecap": "round" }, g);
    [806, 862].forEach(xx => el("circle", { cx: xx, cy: 628, r: 8, fill: "#3b4a5e" }, g));
    return g;
  }
  /* le rayon frais vu de face (trois meubles) et la porte de la chambre froide */
  function rayonFrais(parent) {
    const g = el("g", {}, parent);
    el("rect", { x: 40, y: 176, width: 890, height: 430, fill: "#eef2f7" }, g);
    el("rect", { x: 40, y: 600, width: 890, height: 100, fill: "#e3dccb" }, g);
    for (let k = 1; k < 7; k++) el("line", { x1: 40 + k * 148, y1: 604, x2: 40 + k * 148 - 40, y2: 700, stroke: "#d2c9b3", "stroke-width": 3 }, g);
    [110, 420, 730].forEach(x => el("rect", { x: x, y: 184, width: 150, height: 14, rx: 4, fill: "#fff", stroke: "#cfd9e3", "stroke-width": 2 }, g));
    [60, 260, 460].forEach((x, i) => meubleFace(g, x, 250, 180, 330, 5 + i * 3, false));
    chambreFroide(g, 710, 236, 180, 364);
    return g;
  }
  /* la centrale vue de face, en petit : trois compresseurs sur un châssis, deux collecteurs */
  function centraleFace(parent, x, y) {
    const g = el("g", {}, parent);
    el("rect", { x: x - 20, y: y + 292, width: 700, height: 36, rx: 4, fill: "url(#vm-noir)" }, g);                    // le châssis
    [x, x + 640].forEach(xx => el("rect", { x: xx, y: y + 326, width: 24, height: 18, fill: "#22252a" }, g));
    el("rect", { x: x, y: y + 240, width: 660, height: 36, rx: 8, fill: "url(#vm-marine)" }, g);                    // collecteur d'aspiration (isolé, bleu)
    el("rect", { x: x, y: y, width: 660, height: 30, rx: 8, fill: "url(#vm-cuivre)" }, g);                           // collecteur de refoulement (cuivre)
    [0, 1, 2].forEach(i => {
      const cx = x + 20 + i * 210;
      el("rect", { x: cx + 64, y: y + 28, width: 28, height: 44, fill: "url(#vm-cuivre-h)" }, g);
      el("rect", { x: cx + 64, y: y + 206, width: 28, height: 36, fill: "url(#vm-marine-h)" }, g);
      el("rect", { x: cx + 20, y: y + 70, width: 116, height: 40, rx: 6, fill: "url(#vm-acier-h)", stroke: "#5d6b7a", "stroke-width": 3 }, g);   // la culasse
      el("rect", { x: cx, y: y + 108, width: 156, height: 100, rx: 12, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 3 }, g);        // le carter
      el("rect", { x: cx + 104, y: y + 48, width: 44, height: 28, rx: 5, fill: "url(#vm-marine-h)", stroke: D.BLEU, "stroke-width": 2 }, g);     // la boîte à bornes
      el("circle", { cx: cx + 36, cy: y + 168, r: 12, fill: "#9be7a8", stroke: "#2c3e53", "stroke-width": 3 }, g);                              // le voyant de marche
      el("circle", { cx: cx + 112, cy: y + 168, r: 12, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, g);                                   // le voyant d'huile
    });
    return g;
  }

  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A, MID = { "text-anchor": "middle" };
    const fen = (t, a, b) => D.fenetre(t, a, b === undefined ? 1e9 : b, 0.6);
    const quand = (k, mot) => { const ph = ecrit(c.recit.scenes[0].phrases[k]), i = ph.indexOf(mot); return i < 0 ? 0.5 : D.borne((i + mot.length * 0.5) / ph.length, 0, 1); };
    // ---- les décors, un par moment ----
    const gTitre = el("g", {}, g), gExt = el("g", { opacity: 0 }, g), gInt = el("g", { opacity: 0 }, g), gC = el("g", { opacity: 0 }, g),
      gD = el("g", { opacity: 0 }, g), gCir = el("g", { opacity: 0 }, g), gFl = el("g", { opacity: 0 }, g), gLoupe = el("g", { opacity: 0 }, g), gPoste = el("g", { opacity: 0 }, g);
    D.texte(gTitre, 492, 300, c.recit.titre, Object.assign({ "font-size": 60, "font-weight": 700, fill: D.BLEU, "font-family": TRE }, MID));
    D.lignes(gTitre, 492, 366, D.couper(c.recit.sousTitre, 26), Object.assign({ "font-size": 40, "font-weight": 700, fill: D.ORANGE, "font-family": CAL }, MID), 46);
    const grandeT = D.heroine(gTitre, { r: 54 });
    D.pastille(gTitre, 492, 700, "édition : " + c.recit.edition, D.BLEU, 34, "middle");
    facade(gExt); rayonFrais(gInt);
    // k2 : le froid positif
    const th = thermo(gC, 200, 200, 330, "#2f6fb8");
    el("line", { x1: 150, y1: 420, x2: 260, y2: 420, stroke: "#c0392b", "stroke-width": 5, "stroke-dasharray": "12 8" }, gC);
    D.etiquette(gC, 274, 430, "zéro", { "font-size": 34 });
    el("path", { d: "M 112 330 v -70 m -14 22 l 14 -22 l 14 22", fill: "none", stroke: "#2f6fb8", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, gC);
    [500, 700].forEach((x, i) => meubleFace(gC, x, 200, 180, 300, 6 + i * 4, false));
    const frz = el("g", { opacity: 0.9 }, gC);
    coffre(frz, 290, 548, 250, 92);
    const lSurg = etq(gC, 590, 584, ["surgelés :", "une autre centrale"], {}, [586, 600, 544, 598]);
    // k3 : le local technique
    el("rect", { x: 40, y: 178, width: 890, height: 462, rx: 14, fill: "#e4ebe6", stroke: "#8d99a6", "stroke-width": 5 }, gD);
    el("rect", { x: 45, y: 600, width: 880, height: 36, fill: "#b9c3cc" }, gD);
    D.etiquette(gD, 66, 226, "local technique", { "font-size": 34 });
    centraleFace(gD, 130, 250);
    // ---- k4, k5 : la carte du circuit ----
    const cw = el("g", {}, gCir), cir = D.circuit(cw, 45, 152, 900, false);
    const coll = el("line", { x1: 740, y1: 226, x2: 740, y2: 454, stroke: "#ff6b35", "stroke-width": 24, "stroke-linecap": "round", opacity: 0 }, cir.g);
    const gLab = el("g", {}, gCir);
    [["les meubles", 450, 650, "middle"], ["compresseurs", 722, 250, "end"], ["séparateur d'huile", 830, 34, "middle"], ["condenseur", 560, 168, "middle"],
      ["bouteille", 300, 210, "middle"]].forEach(([s, x, y, a]) => {
      const [px, py] = cir.ecran(x, y);
      D.etiquette(gLab, px, py, s, { "text-anchor": a, "font-size": 28, "font-weight": 700, fill: D.BLEU });
    });
    const MARQUES = [["evaporateur", "meubles"], ["detendeur", "détendeurs"], [null, "collecteur"], ["compresseur", "compresseurs"], ["separateurHuile", "séparateur"], ["condenseur", "condenseur"], ["bouteille", "bouteille"]]
      .map(([nom, mot]) => ({ nom: nom, a: A(4, quand(4, mot) - 0.04) }));
    // k5 : la grande flèche vers le diagramme
    D.lignes(gFl, 836, 338, ["à droite :", "le diagramme"], Object.assign({ "font-size": 38, "font-weight": 700, fill: D.ORANGE, "font-family": CAL }, MID), 46);
    const flD = fleche(gFl, D.ORANGE, 22);
    // k6 : la loupe, le mélange
    const LX = 492, LY = 438, LR = 168;
    const lp = loupe(gLoupe, LX, LY, LR, { graine: 11, n: 54, trou: [LX, LY + 58, 58] });
    const lMoi = etq(g, 700, 350, ["moi :", "R-134a"], { "font-size": 40 }, [696, 396, LX + 70, LY + 58]);
    // k7 : un meuble, en petit
    const KP = 0.62, PX = 380, PY = 300, ps = poste(gPoste, { produits: "laitiers", graine: 3 }), YLQ = PY + 456 * KP;
    el("rect", { x: 20, y: YLQ - 24, width: 366, height: 48, fill: "url(#vm-cuivre)" }, gPoste);
    el("rect", { x: 20, y: YLQ - 18, width: 366, height: 36, fill: FOND }, gPoste);
    const ligneQ = nappe(gPoste, { x0: 20, x1: 386, yh: YLQ - 18, yb: YLQ + 18, niveau: () => 0.72, couleur: () => LIQ, pas: 20, opacite: 0.85 }), fluxQ = D.courant(gPoste, 20, 380, YLQ - 8, YLQ + 18, 5, 4);
    ps.g.setAttribute("transform", "translate(" + (PX - 20 * KP) + " " + (PY - 165 * KP) + ") scale(" + KP + ")");
    // ---- pastilles ----
    const pFr = pas(g, "fluide frigorigène", D.BLEU), pRay = pas(g, "rayon frais · chambre froide", D.ORANGE), pPos = pas(g, "froid positif : au-dessus de zéro", D.BLEU),
      pPlu = pas(g, "plusieurs compresseurs ensemble", D.ORANGE), pMel = pas(g, "un mélange : le R449A", D.ORANGE), pRf = pas(g, "au rayon frais", D.BLEU);
    const mila = D.heroine(g, { r: 30 });
    // ---- l'héroïne : où elle est, à chaque instant ----
    const tempDe = w => D.courbe([[0, 0.45], [1.2, 0.45], [1.3, 0.08], [1.8, 0.13], [3, 0.2], [3.9, 0.62], [6.1, 0.62], [7, 0.5], [7.6, 0.45], [10, 0.45]], w, true);
    const etatDe = w => w < 1.25 ? "liquide" : w < 1.75 ? "bout" : w < 7.1 ? "vapeur" : "liquide";
    const MD = [[0, 1.3], [1, 1.65], [2, 1.82], [3, 3.1], [4, 4.0], [5, 7.0], [6, 7.6], [7, 8.4], [8, 11.3]];
    const diagVersCarte = d => D.courbe(MD.map(([a, b]) => [a, b]), d, true);
    const COIN = [915, 692];
    return function (t) {
      // ---- les décors ----
      opa(gTitre, 1 - entree(t, T[0] - 1.1, 0.8));
      opa(gExt, fen(t, T[1] - 0.3, A(1, 0.4)));
      opa(gInt, fen(t, A(1, 0.38), T[2] - 0.1));
      opa(gC, fen(t, T[2] - 0.1, T[3] - 0.1));
      opa(gD, fen(t, T[3] - 0.1, T[4] - 0.2));
      opa(gCir, fen(t, T[4] - 0.2, T[6] - 0.2));
      opa(gFl, fen(t, T[5] + 0.2, E[5] + 0.1));
      opa(gLoupe, fen(t, T[6], A(7, 0.22)));
      opa(gPoste, fen(t, A(7, 0.12)));
      // k2 : le thermomètre monte au-dessus de zéro, les surgelés restent éteints
      th(D.courbe([[A(2, 0.05), 0.2], [A(2, 0.35), 0.64]], t), "#2f6fb8");
      opa(frz, 0.9 * entree(t, A(2, 0.5), 0.8)); vis(lSurg, t, A(2, 0.55), T[3] - 0.1);
      // k4 : les organes, un à un, quand le récit les nomme
      MARQUES.forEach((m, i) => {
        const fin = i + 1 < MARQUES.length ? MARQUES[i + 1].a : E[4] + 0.3, oui = t > m.a && t < fin;
        if (m.nom) cir.surligne(m.nom, oui); else opa(coll, oui ? 0.5 : 0);
      });
      opa(gLab, fen(t, T[4], T[5] - 0.2));
      // ---- la carte : sa taille (k5), la position de l'héroïne dessus ----
      const w5 = D.lisse((t - T[5] + 0.1) / 1.0), ks = D.lerp(1, 0.74, w5);
      cw.setAttribute("transform", "translate(" + (45 * (1 - ks)).toFixed(1) + " " + (152 * (1 - ks)).toFixed(1) + ") scale(" + ks.toFixed(3) + ")");
      const tc = Math.min(t, T[6]);
      const wTour = D.courbe([[T[4], 0], [MARQUES[0].a, 1.45], [MARQUES[2].a, 3.0], [MARQUES[3].a, 3.6], [MARQUES[4].a, 6.0], [MARQUES[5].a, 7.0], [MARQUES[6].a, 8.0], [E[4] + 0.2, 10]], tc, true);
      const dg = tc < T[5] ? 0 : 8 * D.borne((tc - T[5]) / (E[6] - T[5]), 0, 1);
      const wCarte = tc < T[5] ? wTour : 10 + D.lerp(0, diagVersCarte(dg), D.lisse((tc - T[5]) / 0.8));
      const [cx0, cy0] = cir.ecran(...D.circuitPoint(wCarte)), cx = 45 + (cx0 - 45) * ks, cy = 152 + (cy0 - 152) * ks;
      const wm = ((wCarte % 10) + 10) % 10;
      // ---- la flèche (k5) ----
      flD(690, 470, 0, 260 * entree(t, T[5] + 0.3, 1.0), 1);
      // ---- l'héroïne : titre → grande → coin → carte → loupe → meuble ----
      const grosse = D.lisse((t - (T[0] - 1.1)) / 0.9);
      grandeT({ x: 492, y: 560 + Math.sin(t * 2.2) * 6, t: t, humeur: "sourire", etat: "liquide", temp: 0.1 });
      let x = 492, y = D.lerp(560, 470, grosse), s = D.lerp(1.8, 2.3, grosse), humeur = "sourire", etat = "liquide", temp = 0.1, op = t < T[0] - 1.1 ? 0 : 1;
      const k1 = D.lisse((t - T[1]) / 1.0);
      x = D.lerp(x, COIN[0], k1); y = D.lerp(y, COIN[1], k1); s = D.lerp(s, 0.9, k1);
      const b4 = D.lisse((t - T[4]) / 1.2);
      x = D.lerp(x, cx, b4); y = D.lerp(y, cy, b4); s = D.lerp(s, 0.8 * ks, b4);
      if (t >= T[4]) { temp = tempDe(wm); etat = etatDe(wm); humeur = wm > 3 && wm < 6.5 ? "chaud" : "sourire"; }
      const b6 = D.lisse((t - T[6]) / 1.0);
      x = D.lerp(x, LX, b6); y = D.lerp(y, LY + 58 + Math.sin(t * 2) * 3, b6); s = D.lerp(s, 1.25, b6);
      if (b6 > 0.5) { temp = 0.1; etat = "liquide"; humeur = t < A(6, 0.4) ? "surprise" : "sourire"; }
      const b7 = D.lisse((t - A(7, 0.12)) / 1.7);
      const xq = D.courbe([[A(7, 0.12), 0], [A(7, 0.5), 0.55], [E[7] + 0.9, 1]], t, true);
      x = D.lerp(x, D.lerp(210, PX + 14, xq), b7); y = D.lerp(y, YLQ - 2, b7); s = D.lerp(s, 0.5, b7);
      mila({ x: x, y: y + (t < T[4] ? Math.sin(t * 2.2) * 5 : 0), s: s, t: t, temp: temp, etat: etat, humeur: t > T[0] - 0.6 && t < A(0, 0.6) ? "sourire" : humeur, regard: [1, 0], op: op });
      lp.maj(t, {});
      ps.maj(t, { vanne: 0, bobine: 0, thermo: 0.28, flux: t * 0.9, front: 147, chaleur: 0.7 }); ligneQ.maj(t); fluxQ(t, 70);
      // ---- pastilles et étiquettes ----
      vis(pFr, t, A(0, 0.45), T[1] - 0.1);
      vis(pRay, t, A(1, 0.55), E[1] + 0.5); vis(pPos, t, T[2], E[2] + 0.4); vis(pPlu, t, A(3, 0.55), E[3] + 0.5);
      vis(lMoi, t, A(6, 0.0), A(6, 0.4)); vis(pMel, t, A(6, 0.42), E[6] + 0.6); vis(pRf, t, A(7, 0.3), c.D + 1);
      // ---- le diagramme : le tour complet pendant k5 et k6 ; rien avant ----
      const r = { temp: temp, etat: etat, humeur: humeur };
      if (t >= T[5]) {
        const d = 8 * D.borne((t - T[5]) / (E[6] - T[5]), 0, 1), wd = diagVersCarte(d) % 10;
        r.diag = d; r.diag0 = 0; r.temp = tempDe(wd); r.etat = etatDe(wd); r.humeur = wd > 3 && wd < 6.5 ? "chaud" : "sourire";
      }
      return r;
    };
  };
})();

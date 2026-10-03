/* =====================================================================
   voyage-booster-scenes-b.js — le compresseur moyenne température, le
   refroidisseur de gaz, le détendeur haute pression, la bouteille
   intermédiaire (édition « centrale booster CO₂ »)
   ---------------------------------------------------------------------
   Même contrat que moteur/voyage-co2-scenes-*.js : VOYAGE_SCENES[id](g, c) → maj(t).
   Les gestes sont accrochés au RANG des phrases du récit donnees/voyage-booster.js :
   ajouter une phrase au récit décale tout. Phrases 0-1 : la carte d'identité de
   l'organe ; la coupe s'anime à partir de la phrase 2.
   ÉCRAN PARTAGÉ : tout tient dans x 20 → 965, y 150 → 760 (la colonne de droite
   porte la carte et le diagramme chiffré). Les flèches « vers le diagramme »
   s'arrêtent à x = 960.
   LIQUIDE = nappe (D.liquide) ; VAPEUR = petites molécules ; SUPERCRITIQUE = volume
   plein sans surface (D.supercritique), jamais de nappe ni de bulles.
   Couleurs des trois chemins : froid négatif = orange (l'héroïne), froid positif =
   vert, vapeur de détente = violet.
   PIÈGE : fonction pure de t — aucun état gardé d'une image à l'autre (sauf plan(),
   qui change le parent de l'héroïne).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI, FONT = "Calibri, Arial, sans-serif", CLAIR = "#f4f8fc";
  const VIOLET = "#9b7fd1", VIOLET_T = "#8e44ad", VERT = "#4caf7d", VERT_T = "#1e7e54", ORANGE_M = "#e8914a";
  const MEL = 0.3; // bouteille : liquide à 0,3
  let nid = 0;
  const ident = p => "vbb-" + p + "-" + (++nid);
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fondu = (e, t, a, b, du) => opa(e, D.fenetre(t, a, b, du));
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };

  /* une étiquette (ou plusieurs lignes) avec son trait en pointillés, dans un groupe qu'on peut estomper */
  function etiq(parent, x, y, lignes, at, trait, pasL) {
    const gr = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(lignes) ? lignes : [lignes]).forEach((l, i) => D.etiquette(gr, x, y + i * (pasL || 38), l, at));
    if (trait) D.trait(gr, ...trait);
    return gr;
  }
  /* une molécule d'une couleur donnée (D.mol ne sait colorer que par la température) */
  function molC(parent) {
    const u = D.el("use", { href: "#vm-mol" }, parent);
    return function (x, y, coul, op) {
      u.setAttribute("x", x.toFixed(1)); u.setAttribute("y", y.toFixed(1));
      u.setAttribute("fill", coul); u.setAttribute("opacity", op.toFixed(2));
    };
  }
  const rgbDe = s => s[0] === "#" ? [1, 3, 5].map(i => parseInt(s.substr(i, 2), 16)) : s.match(/[0-9]+/g).slice(0, 3).map(Number);
  const mix = (a, b, f) => { const A = rgbDe(a), B = rgbDe(b); return "rgb(" + A.map((v, i) => Math.round(D.lerp(v, B[i], f))).join(",") + ")"; };

  /* ---------- les instruments ---------- */
  /* cadran de manomètre, balayage de 270° (graduations sans chiffres) ; rend maj(valeur) */
  function cadran(parent, cx, cy, r, vmax, graduation) {
    const g = D.el("g", {}, parent);
    D.el("circle", { cx: cx, cy: cy, r: r + 9, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    D.el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, g);
    const ang = v => (135 + 270 * D.borne(v / vmax, 0, 1)) * Math.PI / 180;
    const pt = (v, rr) => [cx + rr * Math.cos(ang(v)), cy + rr * Math.sin(ang(v))];
    for (let v = 0; v <= vmax + 0.01; v += graduation) {
      const [x0, y0] = pt(v, r * 0.66), [x1, y1] = pt(v, r * 0.9);
      D.el("line", { x1: x0.toFixed(1), y1: y0.toFixed(1), x2: x1.toFixed(1), y2: y1.toFixed(1), stroke: D.BLEU, "stroke-width": 3, "stroke-linecap": "round" }, g);
    }
    const aig = D.el("g", {}, g);
    D.el("line", { x1: cx - r * 0.18, y1: cy, x2: cx + r * 0.72, y2: cy, stroke: "#c0392b", "stroke-width": 5, "stroke-linecap": "round" }, aig);
    D.el("circle", { cx: cx, cy: cy, r: r * 0.11, fill: D.BLEU }, g);
    const maj = v => aig.setAttribute("transform", "rotate(" + (ang(v) * 180 / Math.PI).toFixed(1) + " " + cx + " " + cy + ")");
    maj.g = g;
    return maj;
  }
  /* thermomètre sans chiffres : tube de hauteur h (haut y0), bulbe en bas ; rend maj(température 0..1) */
  function thermo(parent, x, y0, h) {
    const g = D.el("g", {}, parent), yb = y0 + h, jx = Math.sqrt(26 * 26 - 15 * 15);
    D.el("path", { d: "M " + (x - 15) + " " + (y0 + 15) + " A 15 15 0 0 1 " + (x + 15) + " " + (y0 + 15) + " L " + (x + 15) + " " + (yb - jx).toFixed(1) +
      " A 26 26 0 1 1 " + (x - 15) + " " + (yb - jx).toFixed(1) + " Z", fill: "#fff", stroke: D.BLEU, "stroke-width": 3, "stroke-linejoin": "round" }, g);
    for (let k = 0; k <= 5; k++) { const y = yb - 6 - k / 5 * (h - 24); D.el("line", { x1: x - 15, y1: y.toFixed(1), x2: x - 28, y2: y.toFixed(1), stroke: D.BLEU, "stroke-width": 3, "stroke-linecap": "round" }, g); }
    const col = D.el("rect", { x: x - 7, width: 14, rx: 7 }, g), bulbe = D.el("circle", { cx: x, cy: yb, r: 17 }, g);
    const maj = v => {
      const c = D.couleur(v, false), top = yb - 6 - D.borne(v, 0, 1) * (h - 24);
      col.setAttribute("y", top.toFixed(1)); col.setAttribute("height", (yb - top).toFixed(1)); col.setAttribute("fill", c); bulbe.setAttribute("fill", c);
    };
    maj.g = g;
    return maj;
  }
  /* le régulateur : un boîtier à écran de deux lignes */
  function regulateur(parent, x, y, w, h) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: x, y: y, width: w, height: h, rx: 14, fill: "url(#vm-marine)", stroke: "#0a1829", "stroke-width": 3 }, g);
    D.texte(g, x + 18, y + 32, "régulateur", { "font-size": 28, "font-weight": 700, fill: "#cfe0f4", "font-family": FONT });
    D.el("circle", { cx: x + w - 26, cy: y + 24, r: 8, fill: "#2e9e57" }, g);
    const ey = y + 46, eh = h - 62;
    D.el("rect", { x: x + 14, y: ey, width: w - 28, height: eh, rx: 8, fill: "#0e2a40", stroke: "#5d80ad", "stroke-width": 2 }, g);
    const l1 = D.texte(g, x + w / 2, ey + eh * 0.4, "", { "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: "#bfe3ff", "font-family": FONT });
    const l2 = D.texte(g, x + w / 2, ey + eh * 0.86, "", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#ffb36b", "font-family": FONT });
    return { g: g, ecrire: (a, b) => { if (l1.textContent !== a) l1.textContent = a; if (l2.textContent !== b) l2.textContent = b; } };
  }
  /* câble qui s'anime quand il est actif */
  function cable(parent, d) {
    const p = D.el("path", { d: d, fill: "none", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "14 9" }, parent);
    return (t, actif) => { p.setAttribute("stroke", actif ? "#ff6b35" : "#9aa7b5"); p.setAttribute("stroke-dashoffset", actif ? (-t * 60).toFixed(1) : 0); };
  }
  /* un réservoir debout à parois épaisses ; ouvrir() rend un groupe rogné à l'intérieur (la nappe et la vapeur y restent) */
  function reservoir(g, x, y, w, h, e, rx, id) {
    D.el("rect", { x: x, y: y, width: w, height: h, rx: rx, fill: "url(#vm-marine-h)", stroke: "#0a1829", "stroke-width": 3 }, g);
    const ix = x + e, iy = y + e, iw = w - 2 * e, ih = h - 2 * e;
    D.el("rect", { x: ix, y: iy, width: iw, height: ih, rx: rx - e, fill: CLAIR }, g);
    const clip = D.el("clipPath", { id: id }, g);
    D.el("rect", { x: ix, y: iy, width: iw, height: ih, rx: rx - e }, clip);
    return { ix: ix, iy: iy, iw: iw, ih: ih, ouvrir: () => D.el("g", { "clip-path": "url(#" + id + ")" }, g) };
  }
  /* la coupe d'une vanne à pointeau (= édition CO₂) : (cx, cy) centre de l'orifice, k échelle, tete "moteur" | "bobine",
     cote : côté de la prise du câble (−1 gauche). Repère local : cavité haute (entrée) x −200 → +180, y −110 → −16 ;
     siège y −16 → +16 ; cavité basse (sortie) x −60 → +200, y +16 → +130. haut() se dessine après les fluides. */
  function vanne(g, cx, cy, k, tete, cote) {
    const X = lx => cx + k * lx, Y = ly => cy + k * ly;
    const place = "translate(" + cx + " " + cy + ") scale(" + k + ")";
    const v = D.el("g", { transform: place }, g);
    D.el("rect", { x: -200, y: -148, width: 400, height: 320, rx: 26, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, v);
    D.el("rect", { x: -200, y: -110, width: 380, height: 94, fill: CLAIR }, v);
    D.el("rect", { x: -60, y: 16, width: 260, height: 114, fill: CLAIR }, v);
    D.el("rect", { x: -20, y: -16, width: 40, height: 32, fill: CLAIR }, v);
    [[-46, -20], [20, 46]].forEach(([a, b]) => D.el("rect", { x: a, y: -16, width: b - a, height: 32, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, v));
    function haut() {
      const t = D.el("g", { transform: place }, g);
      D.el("rect", { x: -28, y: -164, width: 56, height: 58, rx: 8, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      const tige = D.el("rect", { x: -6, y: -190, width: 12, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1.5 }, t);
      const cone = D.el("polygon", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2, "stroke-linejoin": "round" }, t);
      D.el("rect", { x: -72, y: -302, width: 144, height: 118, rx: 14, fill: "url(#vm-marine-h)", stroke: "#0a1829", "stroke-width": 3 }, t);
      for (let i = 0; i < 5; i++) D.el("line", { x1: -60, y1: -282 + i * 20, x2: 60, y2: -282 + i * 20, stroke: "#5d80ad", "stroke-width": 5, "stroke-linecap": "round" }, t);
      D.el("rect", { x: -48, y: -318, width: 96, height: 18, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      D.el("rect", { x: cote < 0 ? -102 : 72, y: -262, width: 30, height: 34, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      return function (ecart) { // levée du pointeau au-dessus du siège (0 = fermé)
        const yb = -19.3 - ecart;
        tige.setAttribute("height", (yb + 192).toFixed(1));
        cone.setAttribute("points", "-22," + yb.toFixed(1) + " 22," + yb.toFixed(1) + " 0," + (yb + 36).toFixed(1));
      };
    }
    return { X: X, Y: Y, haut: haut, prise: [X(cote < 0 ? -102 : 102), Y(-245)] };
  }

  /* =====================================================================
     5 · le compresseur moyenne température : coupe à piston, trois filets qui entrent,
         refoulement supercritique
     ===================================================================== */
  S["compresseur-mt"] = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const K = 0.85, OX = 490 - 800 * K, OY = 194 - 272 * K; // la coupe est dessinée dans le repère de l'édition CO₂, puis réduite
    const dec = D.el("g", { transform: "translate(" + OX.toFixed(2) + " " + OY.toFixed(2) + ") scale(" + K + ")" }, g);
    const YP0 = 424, COURSE = 196, LANES = [322, 345, 368], IDC = [VIOLET, VERT, ORANGE_M], TM = 0.25;
    // tubes d'aspiration (à gauche) et de refoulement (à droite)
    [[270, 335, "#eef4fa"], [995, 352, "#fbefe6"]].forEach(([x, l, f]) => {
      D.el("rect", { x: x, y: 296, width: l, height: 98, fill: "url(#vm-cuivre)" }, dec);
      D.el("rect", { x: x, y: 308, width: l, height: 74, fill: f }, dec);
    });
    // la tête : chambre d'aspiration, chambre de refoulement
    D.el("rect", { x: 590, y: 272, width: 420, height: 130, rx: 10, fill: "url(#vm-acier)" }, dec);
    D.el("rect", { x: 600, y: 284, width: 190, height: 116, fill: "#eef4fa" }, dec);
    D.el("rect", { x: 810, y: 284, width: 190, height: 116, fill: "#fbefe6" }, dec);
    D.el("rect", { x: 590, y: 308, width: 14, height: 74, fill: "#eef4fa" }, dec);
    D.el("rect", { x: 996, y: 308, width: 14, height: 74, fill: "#fbefe6" }, dec);
    const refoul = D.supercritique(dec, { x0: 996, y0: 308, x1: 1347, y1: 382, pas: 24, graine: 5 }); // le refoulement : supercritique
    // le cylindre
    D.el("rect", { x: 590, y: 418, width: 420, height: 272, fill: "url(#vm-acier-h)" }, dec);
    D.el("rect", { x: 610, y: 418, width: 380, height: 272, fill: "#f3f6fa" }, dec);
    const gaz = D.el("rect", { x: 612, y: 418, width: 376, height: 0, opacity: 0.22 }, dec);
    const flux = D.el("g", {}, dec), mols = D.el("g", {}, dec);
    const bielle = D.el("rect", { x: 785, y: 0, width: 30, height: 10, fill: "url(#vm-acier-h)" }, dec);
    const piston = D.el("g", {}, dec);
    D.el("rect", { x: 612, y: 0, width: 376, height: 56, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [16, 30].forEach(y => D.el("line", { x1: 612, y1: y, x2: 988, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    D.el("rect", { x: 590, y: 400, width: 60, height: 18, fill: "#6b7785" }, dec);
    D.el("rect", { x: 720, y: 400, width: 160, height: 18, fill: "#6b7785" }, dec);
    D.el("rect", { x: 950, y: 400, width: 60, height: 18, fill: "#6b7785" }, dec);
    const clapA = D.el("rect", { x: 645, y: 418, width: 82, height: 8, rx: 3, fill: "#24384f" }, dec);
    const clapR = D.el("rect", { x: 875, y: 392, width: 82, height: 8, rx: 3, fill: "#24384f" }, dec);
    D.el("rect", { x: 540, y: 690, width: 520, height: 46, rx: 12, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 6 }, dec);
    D.el("path", { d: "M 604 698 L 590 718 L 602 718 L 594 732 L 616 712 L 604 712 L 612 698 Z", fill: "#ffd166" }, dec);
    const mila = D.heroine(dec, { r: 30 });

    // trois filets entrent ensemble (violet : vapeur de détente, vert : froid positif, orange : froid négatif)
    const r = D.alea(23), M = 24, FX0 = 285, FL = 355;
    const LOTS = [0, 1, 2].map(() => {
      const l = [];
      for (let j = 0; j < M; j++) l.push({ u: 0.06 + r() * 0.88, v: 0.06 + r() * 0.88, e: r() * 0.6, w: r(), lane: j % 3, maj: molC(mols) });
      return l;
    });
    const MOI = { u: 0.45, v: 0.5, e: 0.12, w: 0.5, lane: 2 };
    const FLUX = [];
    for (let l = 0; l < 3; l++) for (let i = 0; i < 7; i++) FLUX.push({ l: l, s: (i + l * 0.33 + r() * 0.3) / 7, ph: r() * TOUR, maj: molC(flux) });

    // étiquettes, instruments (hors de la coupe : écriture pleine taille)
    const noms = D.el("g", { opacity: 0 }, g); // les noms n'apparaissent qu'avec la coupe (la carte d'identité couvre les phrases 0 et 1)
    D.etiquette(noms, 30, 205, "aspiration", { "font-weight": 700 });
    D.etiquette(noms, 958, 205, "refoulement", { "font-weight": 700, "text-anchor": "end" });
    D.etiquette(noms, 490, 176, "un compresseur du rack, en coupe", { "text-anchor": "middle", "font-size": 28 });
    const tit = etiq(g, 30, 345, ["tout passe", "par eux"], { "font-weight": 700, "font-size": 34, fill: D.BLEU });
    const LEG = [["froid positif", VERT, VERT_T, 0.3], ["froid négatif", ORANGE_M, D.ORANGE, 0.55], ["vapeur de détente", VIOLET, VIOLET_T, 0.8]].map(([s, mol, txt, f], i) => {
      const gr = D.el("g", { opacity: 0 }, g), y = 445 + i * 38;
      D.el("circle", { cx: 42, cy: y - 9, r: 10, fill: mol, stroke: D.BLEU, "stroke-width": 1.6 }, gr);
      D.etiquette(gr, 62, y, s, { "font-size": 28, "font-weight": 700, fill: txt });
      return { g: gr, a: A(2, f) };
    });
    const th = thermo(g, 750, 335, 190), lChaud = etiq(g, 795, 420, ["plus de", "100 °C"],{ "font-weight": 700, "font-size": 34, fill: "#c0392b" });
    th.g.setAttribute("opacity", 0);
    const pSup = D.pastille(g, 965, 610, "supercritique", D.ORANGE, 34, "end");
    const jauge = D.el("g", { opacity: 0 }, g);
    const cad = cadran(jauge, 490, 668, 48, 100, 10);
    const p28 = D.pastille(jauge, 405, 680, "28 bar", D.BLEU, 36, "end"), p90 = D.pastille(jauge, 575, 680, "90 bar", D.ORANGE, 36, "start");
    D.etiquette(jauge, 490, 752, "dans le cylindre", { "text-anchor": "middle", "font-size": 28, fill: "#637285" });
    const regard = D.el("g", { opacity: 0 }, g);
    D.etiquette(regard, 955, 392, "regardez", { "text-anchor": "end", "font-weight": 700, fill: D.ORANGE });
    D.etiquette(regard, 955, 430, "le diagramme", { "text-anchor": "end", "font-weight": 700, fill: D.ORANGE });
    D.el("path", { d: "M 760 462 H 950 M 926 442 L 952 462 L 926 482", fill: "none", stroke: D.ORANGE, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, regard);

    const yp = phi => YP0 + (1 - Math.cos(phi)) / 2 * COURSE;
    const tV = A(2, 0.5), t5 = E[5]; // tV : l'héroïne arrive devant le clapet d'aspiration ; t5 : fin du refoulement lent
    const phiDe = t => t < tV ? TOUR
      : t < t5 ? D.courbe([[tV, TOUR], [E[2], 1.5 * TOUR], [T[3], 1.5 * TOUR], [E[3], 1.78 * TOUR], [E[4], 1.86 * TOUR], [t5, 2 * TOUR]], t, true)
        : 2 * TOUR + (t - t5) * TOUR / 1.3;
    /* position, température, visibilité, part de couleur d'origine d'une molécule de phase locale L */
    function place(m, L, y, tg) {
      const cx = 612 + 14 + m.u * 348, cyc = 418 + 14 + m.v * Math.max(4, y - 418 - 28), ly = LANES[m.lane];
      if (L < 0) return [0, 0, TM, 0, 1];
      if (L < Math.PI) { // aspiration : elle passe le clapet, puis se répand dans le cylindre
        const k = D.lisse((L / Math.PI - m.e) / 0.35), op = D.borne(k * 8, 0, 1), idf = 1 - D.lisse(k * 2.5);
        return k < 0.5 ? [D.lerp(640, 686, k * 2), D.lerp(ly, 412, k * 2), TM, op, idf] : [D.lerp(686, cx, k * 2 - 1), D.lerp(412, cyc, k * 2 - 1), TM, 1, idf];
      }
      const tc = Math.min(TM + 0.7 * D.lisse((620 - y) / 168), tg);
      if (L < 1.75 * Math.PI) return [cx, cyc, tc, 1, 0];
      if (L < TOUR) { // refoulement : le clapet s'ouvre, elle sort vers la chambre puis le tube
        const k = D.lisse(((L - 1.75 * Math.PI) / (0.25 * Math.PI) - m.w * 0.4) / 0.6);
        return k < 0.5 ? [D.lerp(cx, 915, k * 2), D.lerp(cyc, 405, k * 2), tg, 1, 0] : [D.lerp(915, 930 + m.u * 60, k * 2 - 1), D.lerp(405, 345 + (m.v - 0.5) * 36, k * 2 - 1), tg, 1, 0];
      }
      const q = (L - TOUR) / TOUR, x = 930 + m.u * 60 + q * (640 + m.w * 260); // le tube de refoulement : le supercritique y est dessiné
      return [x, 345 + (m.v - 0.5) * 36, tg, L < 2 * TOUR ? D.borne((1000 - x) / 30, 0, 1) : 0, 0];
    }
    return function (t) {
      const phi = phiDe(t), y = yp(phi), n = Math.floor(phi / TOUR), f = phi - n * TOUR;
      const tg = D.courbe([[T[4], TM], [E[4], 0.95]], t); // température du gaz comprimé : elle monte à la phrase 4
      const vue = D.lisse((t - (T[2] - 0.3)) / 0.6), decharge = D.lisse((t - (T[5] - 0.3)) / 0.5);
      piston.setAttribute("transform", "translate(0 " + y.toFixed(1) + ")");
      bielle.setAttribute("y", (y + 50).toFixed(1)); bielle.setAttribute("height", (700 - y - 50).toFixed(1));
      clapA.setAttribute("transform", "rotate(" + (f > 0.03 * TOUR && f < 0.48 * TOUR ? 28 : 0) + " 645 418)");
      clapR.setAttribute("transform", "rotate(" + (f > 0.875 * TOUR && f < 0.995 * TOUR ? 28 : 0) + " 957 400)");
      gaz.setAttribute("height", Math.max(0, y - 418).toFixed(1));
      gaz.setAttribute("fill", D.couleur(f < 0.5 ? TM : Math.min(TM + 0.7 * D.lisse((620 - y) / 168), tg), false));
      for (let m = n - 1; m <= n + 1; m++) {
        const lot = LOTS[((m % 3) + 3) % 3], L = phi - m * TOUR;
        lot.forEach(mo => {
          const [x, yy, temp, op, idf] = place(mo, L, y, tg);
          mo.maj(x, yy, idf > 0 ? mix(IDC[mo.lane], D.couleur(temp, true), 1 - idf) : D.couleur(temp, true), op * (L >= TOUR ? decharge : 1));
        });
      }
      // les trois filets dans le tube d'aspiration, en continu
      FLUX.forEach(m => {
        const x = FX0 + D.frac(m.s + t * 100 / FL) * FL;
        m.maj(x, LANES[m.l] + Math.sin(t * 2.3 + m.ph) * 2, IDC[m.l], vue * D.borne((x - FX0) / 20, 0, 1) * D.borne((638 - x) / 20, 0, 1));
      });
      refoul(t, 0.95, 70, D.lisse((t - (T[5] - 0.1)) / 1.2));
      // l'héroïne : elle arrive dans le filet orange, entre, est serrée, sort supercritique
      let mx, my, temp, op = 1;
      const L = phi - TOUR;
      if (t < tV) { mx = D.courbe([[T[2] - 0.3, 288], [tV, 640]], t, true); my = LANES[2] + Math.sin(t * 2.3) * 2; temp = TM; op = D.lisse((t - (T[2] - 0.3)) / 0.3); }
      else if (t < t5) { [mx, my, temp] = place(MOI, L, y, tg); }
      else { mx = D.lerp(957, 1330, D.borne((t - t5) / (c.D - t5 - 0.3), 0, 1)); my = 345; temp = 0.95; op = D.borne((1318 - mx) / 30, 0, 1); }
      const serre = L > Math.PI && L < 1.8 * Math.PI ? D.lisse((620 - y) / 168) : 0;
      const etat = t < T[5] ? "vapeur" : "supercritique";
      const humeur = t < T[3] ? "sourire" : t < T[4] ? "surprise" : "chaud";
      mila({ x: mx, y: my, s: 0.85, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: serre * 0.8, regard: [1, 0], op: op });
      // étiquettes et instruments
      opa(noms, vue);
      opa(tit, D.fenetre(t, A(2, 0.05), T[3] - 0.1));
      LEG.forEach(l => opa(l.g, D.fenetre(t, l.a, T[3] - 0.1)));
      const gf = D.lisse((phi - 1.5 * TOUR) / (0.35 * TOUR));
      cad(28 + 62 * gf);
      opa(p28, 1 - 0.65 * D.lisse(gf * 2)); opa(p90, 0.35 + 0.65 * D.lisse((gf - 0.4) / 0.6));
      opa(jauge, D.fenetre(t, T[3] - 0.1, T[6], 0.4));
      th(tg); opa(th.g, D.fenetre(t, T[4], T[6], 0.4)); opa(lChaud, D.fenetre(t, T[4] + 0.2, T[6], 0.4));
      opa(pSup, D.fenetre(t, T[5] + 0.3, c.D + 1, 0.5));
      opa(regard, D.fenetre(t, A(6, 0.35), c.D + 1, 0.5));
      return { temp: temp, etat: etat, humeur: humeur, diag: D.courbe([[T[3], 4], [E[4], 5]], t), diag0: 4 };
    };
  };

  /* =====================================================================
     6 · le refroidisseur de gaz, sur le toit : le fluide va de droite à gauche
     ===================================================================== */
  const XA = 20, XB = 965, FA = 225, FB = 715, YH = 385, YB = 545, YF0 = 280, YF1 = 640; // tube, ailettes
  /* échangeur à air : ailettes, tube coupé, air, chaleur, nappe, bulles, vapeur (= S.refroidisseur de l'édition CO₂, recadré)
     o.air : [couleur au-dessus, au-dessous] (relue à chaque image) ; o.niveau(p), o.tempLiq(p), o.tempVap(p), o.vapeurOp(p) ;
     p = 0 à l'entrée (à droite), 1 à la sortie. Rend { fond, sc, air, surface, maj(t, chaleur) }. */
  function echangeur(g, o) {
    const L = XB - XA, xDe = p => XB - p * L, pDe = x => (XB - x) / L;
    for (let x = FA; x <= FB - 7; x += 24) D.el("rect", { x: x, y: YF0, width: 7, height: YF1 - YF0, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    [YF0 - 10, YF1].forEach(y => D.el("rect", { x: FA - 12, y: y, width: FB - FA + 24, height: 10, rx: 3, fill: "url(#vm-acier)" }, g));
    const air = D.el("g", {}, g), chaud = D.el("g", {}, g), chevrons = [], vagues = [];
    for (let k = 0; k < 6; k++) for (let j = 0; j < 3; j++) chevrons.push({ x: FA + 40 + k * 82, f: j / 3, maj: D.chevron(air) });
    for (let k = 0; k < 6; k++) [-1, 1].forEach(cote => vagues.push({ x: FA + 30 + k * 80 + (cote > 0 ? 40 : 0), cote: cote, f: D.frac(k * 0.37), maj: D.chaleur(chaud) }));
    D.el("rect", { x: XA, y: YH - 16, width: L, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: XA, y: YB, width: L, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: XA, y: YH, width: L, height: YB - YH, fill: CLAIR }, g);
    const sc = D.el("g", {}, g), vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    const liq = D.liquide(g, { x0: XA, x1: XB, yh: YH, yb: YB, niveau: x => o.niveau(pDe(x)), couleur: x => D.couleur(o.tempLiq(pDe(x)), false) });
    const bul = D.bulles(D.el("g", {}, g), 54, o.graine + 1, true);
    const r = D.alea(o.graine), V = [];
    for (let i = 0; i < 40; i++) V.push({ s: r(), ry: r(), ph: r() * TOUR, maj: D.mol(vap) });
    return {
      fond: fond, sc: sc, air: air, surface: liq.surface,
      maj: function (t, chaleurOp) {
        chevrons.forEach(ch => {
          const f = D.frac(ch.f + t * 0.16), y = YF0 + f * (YF1 - YF0);
          ch.maj(ch.x, y, 0, y < YH ? o.air[0] : o.air[1], D.fenetre(f, 0, 1, 0.12) * (y > YH - 26 && y < YB + 26 ? 0 : 0.9));
        });
        vagues.forEach(v => { // la chaleur quitte le tube : vers le haut et vers le bas
          const f = D.frac(v.f + t * 0.45), d = 40 * f, y = v.cote < 0 ? YH - 20 - d : YB + 20 + d;
          v.maj(v.x, y, v.cote < 0 ? 180 : 0, chaleurOp * D.fenetre(f, 0, 1, 0.25));
        });
        liq.maj(t);
        bul(t, q => { const p = 0.2 + q * 0.62, x = xDe(p), nv = o.niveau(p); return [x, YH + 6, liq.surface(x, t), nv > 0.02 && nv < 0.95 ? 0.95 : 0, D.couleur(o.tempLiq(p), false)]; });
        V.forEach(m => {
          const p = D.frac(m.s + t / 16), x = xDe(p), libre = liq.surface(x, t) - YH;
          m.maj(x, YH + 16 + m.ry * Math.max(0, libre - 32) + Math.sin(t * 3 + m.ph) * 5, o.tempVap(p), true, D.borne((libre - 34) / 30, 0, 1) * o.vapeurOp(p));
        });
      }
    };
  }
  /* la molécule qui flotte (à moitié dans le liquide) */
  const flotte = (ech, x, t) => Math.max(ech.surface(x, t) + 4 + Math.sin(t * 2) * 4, YH + 40);
  /* fluide supercritique qui se serre le long du tube (grains plus rapprochés et plus froids vers la sortie) :
     o : { x0, x1, y0, y1, sens, pasDe(p), tempDe(p), rangs, graine } → maj(t, vitesse, facteur(p)) */
  function fluideSerre(parent, o) {
    const g2 = D.el("g", {}, parent), Lg = o.x1 - o.x0, rangs = o.rangs || 6, hr = (o.y1 - o.y0) / rangs;
    const gid = ident("sc"), grad = D.el("linearGradient", { id: gid, x1: o.x0, x2: o.x1, y1: 0, y2: 0, gradientUnits: "userSpaceOnUse" }, g2), stops = [];
    for (let k = 0; k <= 12; k++) { const p = o.sens > 0 ? k / 12 : 1 - k / 12; stops.push([p, D.el("stop", { offset: k / 12, "stop-color": D.couleur(o.tempDe(p), false) }, grad)]); }
    D.el("rect", { x: o.x0, y: o.y0, width: Lg, height: o.y1 - o.y0, fill: "url(#" + gid + ")" }, g2);
    const P = [0]; let p = 0;
    while (p < 1) { p += o.pasDe(p) / Lg; P.push(Math.min(p, 1.2)); }
    const U = P.length - 1, G = [], al = D.alea(o.graine || 3);
    for (let j = 0; j < rangs; j++) for (let k = 0; k < U; k++) G.push({ u: k + (j % 2 ? 0.5 : 0), y: o.y0 + (j + 0.5) * hr, ph: al() * 6.28, maj: D.mol(g2) });
    const pDe = u => { const i = Math.min(U - 1, Math.floor(u)), f = u - i; return D.lerp(P[i], P[i + 1], f); };
    return function (t, vitesse, facteur) {
      stops.forEach(([pp, s]) => s.setAttribute("stop-opacity", (0.42 * facteur(pp)).toFixed(2)));
      G.forEach(m => {
        const u = (((m.u + t * vitesse) % U) + U) % U, pp = D.borne(pDe(u), 0, 1), x = o.sens > 0 ? o.x0 + pp * Lg : o.x1 - pp * Lg;
        const bord = D.borne((Math.min(pp * Lg, (1 - pp) * Lg) - 14) / 18, 0, 1);
        m.maj(x + Math.sin(t * 3.3 + m.ph) * 2.6, m.y + Math.cos(t * 2.9 + m.ph) * 2.6, o.tempDe(pp), true, bord * facteur(pp));
      });
    };
  }

  S.refroidisseur = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    let hiver = 0; // 0 en été, 1 en hiver : recalculé à chaque image
    const air = ["#3d7fca", "#e8914a"];
    // le décor : ciel, soleil, nuages, flocons, toit
    const ciel = D.el("g", {}, g), cielH = D.el("g", {}, g), soleil = D.el("g", { transform: "translate(905 212)" }, g);
    [[ciel, "#b7dcf5", "#eaf5fc"], [cielH, "#8fa6bb", "#d3dde7"]].forEach(([gr, h, b]) => {
      const lg = D.el("linearGradient", { id: ident("ciel"), x1: 0, x2: 0, y1: 0, y2: 1 }, ciel);
      D.el("stop", { offset: 0, "stop-color": h }, lg); D.el("stop", { offset: 1, "stop-color": b }, lg);
      D.el("rect", { x: 20, y: 150, width: 945, height: 545, rx: 18, fill: "url(#" + lg.getAttribute("id") + ")" }, gr);
    });
    D.el("circle", { r: 30, fill: "#ffd166", stroke: "#f0b429", "stroke-width": 3 }, soleil);
    const rayons = D.el("g", {}, soleil);
    for (let k = 0; k < 10; k++) D.el("line", { x1: 40, y1: 0, x2: 54, y2: 0, stroke: "#f0b429", "stroke-width": 5, "stroke-linecap": "round", transform: "rotate(" + k * 36 + ")" }, rayons);
    const nuage = (x, y, k) => {
      const n = D.el("g", { opacity: 0.85 }, g), tr = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, n);
      [[-26, 4, 20], [0, -8, 26], [28, 4, 20]].forEach(([cx, cy, rr]) => D.el("circle", { cx: cx, cy: cy, r: rr, fill: "#fff" }, tr));
      D.el("rect", { x: -46, y: 2, width: 92, height: 22, rx: 11, fill: "#fff" }, tr);
      return n;
    };
    const nu1 = nuage(110, 190, 1), nu2 = nuage(770, 182, 0.9);
    const neige = D.el("g", {}, g), FL = [], rf = D.alea(61);
    for (let i = 0; i < 44; i++) FL.push({ x: 40 + rf() * 885, s: rf(), v: 0.05 + rf() * 0.06, ph: rf() * TOUR,
      e: D.el("path", { d: "M -7 0 H 7 M -3.5 -6 L 3.5 6 M -3.5 6 L 3.5 -6", fill: "none", stroke: "#fff", "stroke-width": 2.5, "stroke-linecap": "round" }, neige) });
    D.el("rect", { x: 20, y: 690, width: 945, height: 24, fill: "#c4cad1" }, g);
    D.el("rect", { x: 20, y: 714, width: 945, height: 46, fill: "#9aa3ad" }, g);
    D.el("line", { x1: 20, y1: 714, x2: 965, y2: 714, stroke: "#6b7785", "stroke-width": 4 }, g);
    [262, 678].forEach(x => D.el("rect", { x: x - 10, y: YF1 + 10, width: 20, height: 50, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g));

    // l'échangeur : le fluide supercritique se serre de droite à gauche
    const tSC = p => D.courbe([[0, 0.95], [0.35, 0.72], [0.7, 0.56], [1, 0.5]], p, true);
    const ech = echangeur(g, { graine: 53, air: air,
      niveau: p => hiver * 0.85 * D.lisse((p - 0.55) / 0.4),
      tempLiq: p => D.lerp(0.5, 0.4, D.lisse((p - 0.6) / 0.4)),
      tempVap: p => D.lerp(0.9, 0.55, D.lisse(p / 0.6)),
      vapeurOp: p => hiver * D.lisse((p - 0.45) / 0.25) });
    const fluide = fluideSerre(ech.sc, { x0: XA, x1: XB, y0: YH, y1: YB, sens: -1, rangs: 6, graine: 71,
      pasDe: p => D.lerp(36, 19, D.lisse(p)), tempDe: tSC });
    const perte = p => 1 - hiver * D.lisse((p - 0.45) / 0.25); // l'hiver, le fluide supercritique cède la place à la vapeur et à la nappe
    const vents = [D.ventilateur(g, 355, 232, 36), D.ventilateur(g, 585, 232, 36)];
    const mila = D.heroine(D.el("g", {}, g), { r: 30 }); // au-dessus de la nappe : l'hiver, elle flotte dessus
    // le garde-corps du bord de toit
    [655, 675].forEach(y => D.el("line", { x1: 20, y1: y, x2: 965, y2: y, stroke: "#6b7785", "stroke-width": 5 }, g));
    for (let x = 30; x < 965; x += 116) D.el("rect", { x: x, y: 655, width: 7, height: 38, fill: "#6b7785" }, g);

    // étiquettes
    const lAirE = etiq(g, 470, 248, "air 30 °C", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#1f5fa9" });
    const lAirF = etiq(g, 470, 248, "air froid", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#10233c" });
    const lEntree = etiq(g, 955, 312, ["entrée : 90 bar", "plus de 100 °C"], { "text-anchor": "end", "font-size": 30 }, null, 36); lEntree.firstChild.setAttribute("font-weight", 700);
    const lSortie = etiq(g, 30, 312, ["sortie :", "vers 35 °C"], { "font-size": 30 }, null, 36); lSortie.firstChild.setAttribute("font-weight", 700);
    const pNon = D.pastille(g, 492, 733, "ni gouttes, ni nappe", D.ORANGE, 32, "middle");
    const pSortie = D.pastille(g, 492, 733, "35 °C · toujours supercritique", "#2f6fb8", 32, "middle");
    const pHiver = D.pastille(g, 492, 733, "l'hiver : un condenseur", "#2f6fb8", 32, "middle");

    // k2 : le rappel, une vignette du tube de verre (la surface s'efface au point critique)
    const rappel = D.el("g", { opacity: 0, "data-layout-allow-overlap": "" }, g);
    D.el("rect", { x: 215, y: 168, width: 530, height: 470, rx: 24, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, rappel);
    D.texte(rappel, 245, 218, "Rappel : mon premier voyage", { "font-size": 34, "font-weight": 700, fill: D.BLEU, "font-family": FONT });
    D.el("rect", { x: 262, y: 240, width: 90, height: 360, rx: 14, fill: "#cfe3f3", stroke: "#7fa3c4", "stroke-width": 4 }, rappel);
    D.el("rect", { x: 276, y: 254, width: 62, height: 332, fill: "#f7fafd" }, rappel);
    const cid = ident("tube");
    D.el("rect", { x: 276, y: 254, width: 62, height: 332 }, D.el("clipPath", { id: cid }, rappel));
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, rappel);
    const scT = D.supercritique(dedans, { x0: 276, y0: 254, x1: 338, y1: 586, pas: 22, graine: 9 });
    const flou = D.el("g", {}, dedans);
    const liqT = D.liquide(flou, { x0: 276, x1: 338, yh: 254, yb: 586, niveau: () => 0.5, couleur: () => D.couleur(0.4, false), pas: 10 });
    const nappeT = flou.children[1], refletT = flou.lastChild;
    const vapT = D.el("g", {}, dedans), rv = D.alea(17), VT = [];
    for (let i = 0; i < 6; i++) VT.push({ u: rv(), v: rv(), ph: rv() * TOUR, maj: D.mol(vapT) });
    [[232, 252], [588, 608]].forEach(([y0, y1]) => D.el("rect", { x: 254, y: y0, width: 106, height: y1 - y0, rx: 8, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, rappel));
    D.el("rect", { x: 281, y: 258, width: 7, height: 324, rx: 3, fill: "#fff", opacity: 0.55 }, rappel);
    const grand = D.el("g", { opacity: 0 }, rappel);
    D.texte(grand, 385, 340, "31 °C · 73,8 bar", { "font-size": 40, "font-weight": 700, fill: D.BLEU, "font-family": FONT });
    D.texte(grand, 385, 392, "point critique", { "font-size": 40, "font-weight": 700, fill: D.ORANGE, "font-family": FONT });
    const lSurf = etiq(rappel, 385, 500, "plus de surface", { "font-size": 32 }, [380, 490, 346, 430]);

    return function (t) {
      hiver = D.lisse((t - A(6, 0.2)) / (A(6, 0.62) - A(6, 0.2)));
      air[0] = hiver > 0.5 ? "#1f5fa9" : "#3d7fca"; air[1] = hiver > 0.5 ? "#9dbfe3" : "#e8914a";
      // ciel, soleil, nuages, flocons
      opa(cielH, hiver); opa(soleil, 1 - hiver); rayons.setAttribute("transform", "rotate(" + (t * 8).toFixed(1) + ")");
      nu1.setAttribute("transform", "translate(" + (Math.sin(t * 0.25) * 12).toFixed(1) + " 0)"); nu2.setAttribute("transform", "translate(" + (Math.sin(t * 0.2 + 1) * 10).toFixed(1) + " 0)");
      opa(neige, hiver);
      FL.forEach(f => {
        const y = 162 + D.frac(f.s + t * f.v) * 520, x = f.x + Math.sin(t * 0.9 + f.ph) * 12;
        f.e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + (t * 30 + f.ph * 50).toFixed(0) + ")");
      });
      vents.forEach((v, i) => v(t * 520 + i * 40));
      // l'air, la chaleur, le fluide
      opa(ech.air, D.lisse((t - T[3]) / 0.8));
      ech.maj(t, D.lisse((t - T[3]) / 0.8));
      fluide(t, 1.5, perte);
      // étiquettes et pastilles
      opa(lEntree, D.lisse((t - T[3]) / 0.5) * (1 - hiver)); // l'hiver, la haute pression n'est plus 90 bar : l'étiquette d'été s'efface
      opa(lAirE, D.lisse((t - T[3] - 0.3) / 0.5) * (1 - D.lisse((t - A(6, 0.1)) / 0.3))); opa(lAirF, D.lisse((t - A(6, 0.4)) / 0.5));
      opa(pNon, D.fenetre(t, T[4] + 0.3, E[4] + 0.4));
      opa(lSortie, D.fenetre(t, A(5, 0.1), T[6] - 0.1));
      opa(pSortie, D.fenetre(t, A(5, 0.45), E[5] + 0.5));
      opa(pHiver, D.fenetre(t, T[6] + 0.2, c.D + 1, 0.5));
      // le rappel du tube de verre : la surface s'efface, le fluide remplit tout
      opa(rappel, D.fenetre(t, T[2], T[3] - 0.15, 0.4));
      const sup = D.lisse((t - A(2, 0.38)) / (A(2, 0.72) - A(2, 0.38)));
      opa(nappeT, 0.82 * (1 - sup)); opa(refletT, 0.75 * (1 - D.lisse((t - A(2, 0.25)) / (A(2, 0.5) - A(2, 0.25)))));
      liqT.maj(t); scT(t, 0.45, 0, sup);
      const ys = 586 - 0.5 * 332;
      VT.forEach(m => m.maj(285 + m.u * 44 + Math.sin(t * 1.7 + m.ph) * 5, 268 + m.v * (ys - 300) + Math.cos(t * 1.3 + m.ph) * 5, 0.4, true, (1 - sup) * 0.95));
      opa(grand, D.lisse((t - A(2, 0.3)) / 0.5)); opa(lSurf, D.fenetre(t, A(2, 0.66), E[2] + 0.1, 0.4));
      // la molécule : elle traverse le tube, supercritique de bout en bout ; l'hiver (k6) elle finit liquide dans la nappe
      const p1 = D.courbe([[T[3] - 0.2, 0.03], [E[3], 0.27], [E[4], 0.62], [A(5, 0.35), 0.82], [A(5, 0.75), 1.07]], t);
      const p2 = D.courbe([[T[6], 0.03], [A(6, 0.5), 0.55], [E[6], 0.9], [c.D - 0.2, 0.93]], t);
      const p = t < T[6] ? p1 : p2, x = XB - p * (XB - XA);
      const ll = hiver * D.lisse((p - 0.78) / 0.12), etat = ll > 0.5 ? "liquide" : "supercritique";
      const temp = D.lerp(tSC(D.borne(p, 0, 1)), 0.4, ll);
      const humeur = p < 0.4 && t < T[6] ? "chaud" : t > A(6, 0.3) && t < A(6, 0.85) ? "surprise" : "sourire";
      const op = (t < T[6] ? D.lisse((t - (T[3] - 0.2)) / 0.4) * (t > A(5, 0.75) + 0.3 ? 0 : 1) : D.lisse((t - T[6]) / 0.4)) * D.borne((918 - x) / 30, 0, 1) * D.borne((x - 50) / 40, 0, 1);
      mila({ x: x, y: D.lerp(465 + Math.sin(t * 2.2) * 8, flotte(ech, x, t), ll), s: 0.9, t: t, temp: temp, etat: etat, humeur: humeur, regard: [-1, 0], op: op });
      return { temp: temp, etat: etat, humeur: humeur, diag: D.courbe([[T[3], 5], [E[5], 6]], t), diag0: 5 };
    };
  };

  /* =====================================================================
     7 · le détendeur haute pression : vanne motorisée, régulateur, réglette, détente
     ===================================================================== */
  S["detendeur-hp"] = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const CX = 500, CY = 470, KV = 0.85, SC = 0.5, XM = 965;
    const V = vanne(g, CX, CY, KV, "moteur", -1);
    const yH0 = V.Y(-110), yH1 = V.Y(-16), yB0 = V.Y(16), yB1 = V.Y(130);
    D.tube(g, 33, yH0 - 10, V.X(-200) - 33, yH1 - yH0 + 20, "cuivre");
    D.tube(g, V.X(200), yB0 - 10, XM - V.X(200), yB1 - yB0 + 20, "cuivre");
    const sc = D.supercritique(g, { x0: 33, y0: yH0, x1: V.X(180), y1: yH1, pas: 22, graine: 5 }); // l'entrée : supercritique
    const vap = D.el("g", {}, g);
    let nv = 0.55;
    const liq = D.liquide(g, { x0: V.X(-60), x1: XM, yh: yB0, yb: yB1, niveau: () => nv, couleur: () => D.couleur(MEL, false), pas: (XM - V.X(-60)) / 26 });
    const jet = D.el("path", { fill: D.couleur(MEL + 0.06, false), opacity: 0.5 }, g);
    const gouttes = D.bulles(D.el("g", {}, g), 10, 17, true);
    const eclat = D.el("circle", { cx: CX, cy: yB0 + 20, fill: "none", stroke: D.couleur(MEL, true), "stroke-width": 7 }, g);
    const rr = D.alea(29), VAP = [], VX0 = CX + 45, LV = XM - 25 - VX0;
    for (let i = 0; i < 30; i++) VAP.push({ s: rr(), ry: rr(), d: T[5] + 0.1 + i * 0.035, maj: molC(vap) });
    const ouvrir = V.haut();
    const dessus = D.el("g", {}, g);

    // le régulateur, son câble vers le moteur, sa sonde sur le tube d'entrée
    const reg = regulateur(g, 25, 180, 320, 140);
    const cabMoteur = cable(g, "M 345 250 L " + (V.prise[0] - 4).toFixed(1) + " " + V.prise[1].toFixed(1));
    D.el("line", { x1: 185, y1: 320, x2: 185, y2: 350, stroke: "#9aa7b5", "stroke-width": 5 }, g);
    D.el("rect", { x: 170, y: 350, width: 30, height: 18, rx: 5, fill: D.BLEU }, g);
    D.etiquette(g, 212, 350, "sonde", { "font-size": 28 });
    D.etiquette(g, 585, 322, "pointeau", { "font-size": 28 }); D.trait(g, 592, 330, 507, 452);

    // le manomètre : 90 bar → 38 bar (deux lectures, l'aiguille passe de l'une à l'autre)
    const jauge = D.el("g", { opacity: 0 }, g);
    const cad = cadran(jauge, 835, 296, 56, 100, 10);
    const p90 = D.pastille(jauge, 835, 208, "90 bar", D.ORANGE, 34, "middle"), p38 = D.pastille(jauge, 835, 405, "38 bar", D.BLEU, 34, "middle");

    // la courbe à sommet : trop basse, la bonne zone au sommet, trop haute
    const reglette = D.el("g", { opacity: 0 }, g), RX0 = 40, RX1 = 925, RB = 736;
    const bosse = x => RB - 70 * Math.exp(-Math.pow((x - 482) / 125, 2));
    D.el("line", { x1: RX0, y1: RB, x2: RX1, y2: RB, stroke: "#9aa7b5", "stroke-width": 6, "stroke-linecap": "round" }, reglette);
    const pts = [];
    for (let x = 60; x <= 905; x += 10) pts.push(x + "," + bosse(x).toFixed(1));
    D.el("polygon", { points: "60," + RB + " " + pts.join(" ") + " 905," + RB, fill: "#2e9e57", "fill-opacity": 0.3, stroke: "#2e9e57", "stroke-width": 4, "stroke-linejoin": "round" }, reglette);
    const AT = { "font-size": 30, "font-weight": 600, "font-family": FONT };
    const basse = D.el("g", { fill: "#10233c" }, reglette), haute = D.el("g", { fill: "#10233c" }, reglette);
    D.texte(basse, RX0, 664, "trop basse :", AT); D.texte(basse, RX0, 700, "le froid s'effondre", AT);
    D.texte(haute, RX1, 664, "trop haute :", Object.assign({ "text-anchor": "end" }, AT)); D.texte(haute, RX1, 700, "on consomme pour rien", Object.assign({ "text-anchor": "end" }, AT));
    D.etiquette(reglette, 482, 646, "la bonne zone", { "text-anchor": "middle", "font-size": 30, fill: VERT_T });
    const curseur = D.el("circle", { r: 18, fill: D.ORANGE, stroke: "#fff", "stroke-width": 4 }, reglette);

    const pVap = D.pastille(g, 965, 668, "plus de 40 % de vapeur", "#2f6fb8", 32, "end");
    const lVap = etiq(g, 955, 450, "vapeur de détente", { "text-anchor": "end", "font-weight": 700, fill: VIOLET_T }, [900, 458, 900, 492]);

    const mila = D.heroine(dessus, { r: 30 });
    const tPass0 = A(4, 0.15), tOri = A(4, 0.42), tPass1 = A(4, 0.72);
    return function (t) {
      // la réglette : le curseur cherche le bon réglage, le pointeau suit
      const cur = D.courbe([[T[3], 482], [A(3, 0.22), 60], [A(3, 0.45), 60], [A(3, 0.62), 905], [A(3, 0.85), 905], [E[3] + 0.3, 482]], t);
      const u = D.borne((cur - 60) / 845, 0, 1), passe = D.fenetre(t, tPass0 - 0.2, tPass1 + 0.2, 0.5);
      ouvrir(14 + 14 * (1 - u) + 8 * passe);
      curseur.setAttribute("cx", cur.toFixed(1)); curseur.setAttribute("cy", bosse(cur).toFixed(1));
      basse.setAttribute("fill", cur < 300 ? "#c0392b" : "#10233c"); haute.setAttribute("fill", cur > 660 ? "#c0392b" : "#10233c");
      fondu(reglette, t, T[3] - 0.1, E[3] + 0.3);

      // le régulateur : ce qu'il lit, ce qu'il calcule, ce qu'il décide
      if (t < T[2]) reg.ecrire("", ""); else if (t < A(2, 0.45)) reg.ecrire("température lue", "35 °C"); else if (t < A(2, 0.75)) reg.ecrire("je calcule…", "HP ?"); else reg.ecrire("consigne HP", "90 bar");
      cabMoteur(t, t > A(2, 0.78) && t < E[4]);

      // le fluide
      sc(t, SC, 60, 1);
      nv = D.courbe([[T[5], 0.55], [T[5] + 1.4, 0.3]], t);
      liq.maj(t);
      const surf = x => liq.surface(x, t), sb = surf(CX);
      jet.setAttribute("d", "M " + (CX - 15) + " " + (yB0 - 2).toFixed(1) + " L " + (CX + 15) + " " + (yB0 - 2).toFixed(1) + " L " + (CX + 24) + " " + sb.toFixed(1) + " L " + (CX - 24) + " " + sb.toFixed(1) + " Z");
      gouttes(t, q => [CX - 14 + q * 28, yB0 + 2, sb, 0.9, D.couleur(MEL, false)]);
      const fe = D.borne((t - T[5]) / 1.1, 0, 1);
      eclat.setAttribute("r", (20 + 100 * fe).toFixed(1)); eclat.setAttribute("opacity", t > T[5] ? (0.7 * (1 - fe)).toFixed(2) : 0);
      const teinte = D.lisse((t - A(6, 0.1)) / 0.8); // k6 : la vapeur se teinte en violet
      VAP.forEach(m => { // plus de 40 % deviennent vapeur d'un coup : ils se détachent de la nappe et montent
        const x = VX0 + D.frac(m.s + t * 80 / LV) * LV, libre = surf(x) - yB0, w = D.lisse((t - m.d) / 0.7);
        const yFin = yB0 + 16 + m.ry * Math.max(0, libre - 38);
        const vis = D.lisse((t - m.d) / 0.35) * D.borne((libre - 38) / 30, 0, 1) * D.borne((955 - x) / 30, 0, 1);
        m.maj(x, D.lerp(surf(x), yFin, w) + Math.sin(t * 3 + m.s * 9) * 3 * w, mix(D.couleur(MEL + 0.05, true), VIOLET, teinte), vis);
      });

      // le manomètre : 90 → 38 bar quand je passe le pointeau
      const bar = D.courbe([[tOri - 0.5, 90], [tOri + 0.7, 38]], t), uu = D.lisse((90 - bar) / 52);
      cad(bar); opa(p90, 1 - 0.65 * uu); opa(p38, 0.35 + 0.65 * uu);
      fondu(jauge, t, T[4] - 0.2, c.D + 1);

      // l'héroïne : tube d'entrée, passage du pointeau, nappe de sortie
      const x = D.courbe([[T[2], 70], [T[3], 200], [T[4], 330], [tPass0, 440], [tOri, CX], [tPass1, 556], [E[4] + 0.4, 640], [E[5], 700], [A(6, 0.4), 770], [c.D - 0.2, 840]], t, true);
      const pres = D.borne(1 - Math.abs(x - CX) / (60 * KV), 0, 1);
      let y;
      if (x < CX - 51) y = 416 + Math.sin(t * 2) * 3; else if (x < CX) y = D.lerp(416, CY, D.lisse((x - (CX - 51)) / 51)); else if (x < CX + 43) y = D.lerp(CY, surf(x) - 4, D.lisse((x - CX) / 43)); else y = surf(x) - 4;
      const temp = D.courbe([[tPass1, SC], [A(5, 0.55), MEL]], t);
      const etat = t < tOri ? "supercritique" : "bout";
      const humeur = t < tPass0 ? "sourire" : t < tPass1 + 0.3 ? "surprise" : t < T[6] + 1 ? "froid" : "sourire";
      mila({ x: x, y: y, s: D.lerp(0.62, 0.5, pres), t: t, temp: temp, etat: etat, humeur: humeur, ecrase: 0.8 * pres, regard: [1, 0.3], op: D.borne((955 - x) / 25, 0, 1) });
      opa(pVap, D.fenetre(t, A(5, 0.4), E[5] + 0.6, 0.4)); opa(lVap, D.lisse((t - A(6, 0.2)) / 0.4));
      return { temp: temp, etat: etat, humeur: humeur, diag: D.courbe([[T[4], 6], [E[5], 7]], t), diag0: 6 };
    };
  };

  /* =====================================================================
     8 · la bouteille intermédiaire : nappe au fond, vapeur en haut, trois départs
     ===================================================================== */
  S.bouteille = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const LIQ = D.couleur(MEL, false), CT = 465;
    const R = reservoir(g, 330, 250, 270, 400, 24, 90, ident("res"));
    // l'arrivée (haut gauche), la sortie vapeur (monte puis part à droite), les deux départs liquides (bas)
    D.tube(g, 20, 330, 340, 78, "cuivre");
    D.tube(g, 20, 556, 340, 70, "cuivre");
    D.tube(g, 570, 556, 395, 70, "cuivre");
    D.tube(g, CT - 39, 190, 78, 120, "cuivre", true);
    D.el("rect", { x: CT - 39, y: 190, width: 78, height: 10, rx: 4, fill: "url(#vm-cuivre)" }, g);
    D.tube(g, CT + 30, 190, 965 - CT - 30, 78, "cuivre");
    D.el("rect", { x: CT + 26, y: 200, width: 14, height: 58, fill: CLAIR }, g); // la jonction s'ouvre : plus de paroi entre la montée et le tube
    const vapTube = D.el("g", {}, g), fond = D.el("g", {}, g);
    const dedans = R.ouvrir();
    let nv = 0.12;
    const r = D.alea(5), VT = [];
    for (let i = 0; i < 14; i++) VT.push({ x: R.ix + 44 + r() * (R.iw - 88), ry: r(), ph: r() * TOUR, maj: molC(dedans) });
    const cuve = D.liquide(dedans, { x0: R.ix, x1: R.ix + R.iw, yh: R.iy, yb: R.iy + R.ih, niveau: () => nv, couleur: () => LIQ, pas: R.iw / 16, opacite: 0.68 });
    const arrivee = D.liquide(g, { x0: 20, x1: 360, yh: 340, yb: 398, niveau: () => 0.45, couleur: () => LIQ });
    const chute = D.bulles(D.el("g", {}, g), 12, 9, true);
    const MA = [];
    for (let i = 0; i < 8; i++) MA.push({ s: r(), maj: D.mol(g) });
    // les départs liquides : le liquide avance dans le tube (rideau qui s'ouvre), des flèches de la couleur du chemin
    const sorties = [[ident("sg"), 360, -1, D.ORANGE, 340], [ident("sd"), 570, 1, VERT_T, 395]].map(([id, xa, sens, coul, lg]) => {
      const rid = D.el("rect", { x: xa, y: 556, width: 0, height: 70 }, D.el("clipPath", { id: id }, g));
      const gr = D.el("g", { "clip-path": "url(#" + id + ")" }, g), x0 = sens < 0 ? 20 : 570, x1 = x0 + lg;
      D.el("rect", { x: x0, y: 566, width: lg, height: 50, fill: LIQ, opacity: 0.85 }, gr);
      const courant = D.courant(gr, x0, x1, 566, 616, 6, 3);
      const ch = [0, 1, 2].map(i => ({ s: i / 3, maj: D.chevron(gr) }));
      return { rid: rid, xa: xa, sens: sens, lg: lg, x0: x0, courant: courant, ch: ch, coul: coul };
    });
    const VV = [];
    for (let i = 0; i < 8; i++) VV.push({ s: i / 8 + r() * 0.05, maj: molC(vapTube) });
    const chV = [0, 1, 2].map(i => ({ s: i / 3, maj: D.chevron(vapTube) }));
    const dessus = D.el("g", {}, g);
    const mila = D.heroine(dessus, { r: 30 });
    const wv = D.el("g", {}, dessus), wg = D.el("g", {}, dessus);
    const voisineV = D.heroine(wv, { r: 26, teinte: VIOLET, sansHalo: true, dephasage: 0.4 });
    const voisineG = D.heroine(wg, { r: 26, teinte: VERT, sansHalo: true, dephasage: 0.7 });

    // étiquettes
    D.etiquette(g, 30, 452, "arrivée :", { "font-size": 30, "font-weight": 700 }); D.etiquette(g, 30, 488, "mélange", { "font-size": 30 });
    D.etiquette(g, 30, 292, "parois épaisses", { "font-size": 30 }); D.trait(g, 262, 284, 338, 300);
    const p38 = D.pastille(g, 416, 236, "38 bar", D.BLEU, 34, "end");
    const lLiq = etiq(g, 318, 535, "liquide", { "text-anchor": "end" }, [326, 528, 374, 540]);
    const lVap = etiq(g, 612, 352, "vapeur", {}, [606, 342, 548, 342]);
    const lDet = etiq(g, 955, 308, "vapeur de détente", { "text-anchor": "end", "font-weight": 700, fill: VIOLET_T });
    const lPos = etiq(g, 955, 668, "froid positif", { "text-anchor": "end", "font-weight": 700, fill: VERT_T });
    const lNeg = etiq(g, 30, 668, "froid négatif", { "font-weight": 700, fill: D.ORANGE });
    // k2 : l'échelle des quatre pressions, 38 surligné
    const ech = D.el("g", {}, g), ROWS = [["90 bar", 360, 0.6, "#637285"], ["38 bar", 414, 0.12, D.ORANGE], ["28 bar", 468, 0.72, "#637285"], ["13 bar", 522, 0.84, "#637285"]];
    D.el("line", { x1: 652, y1: 340, x2: 652, y2: 540, stroke: "#9aa7b5", "stroke-width": 6, "stroke-linecap": "round" }, ech);
    const rangs = ROWS.map(([s, y, f, coul]) => {
      const gr = D.el("g", { opacity: 0 }, ech);
      if (coul === D.ORANGE) D.el("rect", { x: 664, y: y - 25, width: 118, height: 50, rx: 12, fill: D.ORANGE, "fill-opacity": 0.2, stroke: D.ORANGE, "stroke-width": 3 }, gr);
      D.el("line", { x1: 640, y1: y, x2: 664, y2: y, stroke: coul === D.ORANGE ? D.ORANGE : "#637285", "stroke-width": 6, "stroke-linecap": "round" }, gr);
      D.etiquette(gr, 676, y + 11, s, { "font-weight": 700, fill: coul });
      return { g: gr, a: A(2, f) };
    });
    const lInter = etiq(ech, 792, 408, ["pression", "intermédiaire"], { "font-size": 28, "font-weight": 700, fill: D.ORANGE }, null, 32);

    const tA = A(2, 0.92), tB = A(3, 0.45), tC = E[3] + 0.3;
    return function (t) {
      nv = D.courbe([[T[3], 0.12], [E[3], 0.4]], t);
      cuve.maj(t); arrivee.maj(t);
      const sc = x => cuve.surface(x, t);
      chute(t, q => [362 + q * 40, 394, sc(380 + q * 40), t > T[2] + 0.3 ? 0.95 : 0, LIQ]);
      // la vapeur de la bouteille : en haut, qui se teinte en violet à la phrase 4
      const teinte = D.lisse((t - A(4, 0.15)) / 0.7), cV = mix(D.couleur(MEL, true), VIOLET, teinte);
      VT.forEach(m => {
        const libre = sc(m.x) - R.iy - 70;
        m.maj(m.x + Math.sin(t * 0.8 + m.ph) * 18, R.iy + 38 + m.ry * Math.max(0, libre) + Math.cos(t * 0.7 + m.ph) * 8, cV, 0.9);
      });
      // le mélange qui arrive : des molécules de vapeur au-dessus de la nappe du tube
      MA.forEach(m => {
        const x = 50 + D.frac(m.s + t * 0.1) * 290;
        m.maj(x, 352 + Math.sin(t * 3 + m.s * 9) * 3, MEL, true, D.fenetre(t, T[2] - 0.2, E[6], 0.4) * D.borne((350 - x) / 30, 0, 1));
      });
      // les départs liquides, de la couleur de leur chemin
      sorties.forEach((so, i) => {
        const w = D.courbe([[A(5, i ? 0.78 : 0.5), 0], [A(5, i ? 0.78 : 0.5) + 1.6, so.lg]], t);
        so.rid.setAttribute("width", w.toFixed(1)); so.rid.setAttribute("x", (so.sens < 0 ? so.xa - w : so.xa).toFixed(1));
        so.courant(t, so.sens * 150);
        so.ch.forEach(h => { const x = so.x0 + D.frac(h.s + so.sens * t * 0.12) * so.lg; h.maj(x, 591, so.sens < 0 ? 90 : -90, so.coul, 0.9 * D.borne((Math.min(x - so.x0, so.x0 + so.lg - x) - 12) / 25, 0, 1)); });
      });
      // la vapeur de détente repart par le haut
      const vv = D.fenetre(t, A(5, 0.12), c.D + 1, 0.4);
      VV.forEach(m => { const x = 520 + D.frac(m.s + t * 0.08) * 420; m.maj(x, 229 + Math.sin(t * 2.5 + m.s * 9) * 3, VIOLET, vv * D.borne((950 - x) / 30, 0, 1)); });
      chV.forEach(h => { const x = 510 + D.frac(h.s + t * 0.1) * 430; h.maj(x, 229, -90, VIOLET_T, 0.9 * vv * D.borne(Math.min(x - 510, 940 - x) / 25, 0, 1)); });

      // l'héroïne : elle flotte sur la nappe du tube, tombe, plonge, reste au fond
      let x, y;
      if (t < tA) { x = D.courbe([[T[2], 90], [tA, 330]], t, true); y = arrivee.surface(x, t) + 1; }
      else if (t < tB) { const q = (t - tA) / (tB - tA); x = D.lerp(334, 395, q); y = D.lerp(arrivee.surface(334, t) + 1, sc(395) + 6, q * q); }
      else if (t < tC) { const q = D.lisse((t - tB) / (tC - tB)); x = D.lerp(395, 418, q); y = D.lerp(sc(395) + 6, 596, q); }
      else { x = 418 + 20 * Math.sin(t * 0.7); y = 596 + 5 * Math.sin(t * 1.3); }
      const salut = D.fenetre(t, A(6, 0.2), c.D + 1, 0.3);
      y -= salut * Math.abs(Math.sin(t * 5)) * 12;
      plan(mila, t < tB ? dessus : fond);
      const humeur = t > tA - 0.6 && t < tB + 0.6 ? "surprise" : "sourire";
      mila({ x: x, y: y, s: 0.55, t: t, temp: MEL, etat: "liquide", humeur: humeur, regard: t < T[6] ? [1, 0.6] : [0.3, -1] });

      // les voisines : la violette dans la vapeur dès la phrase 4, la verte dans la nappe dès le départ du froid positif ; elles saluent à la phrase 6
      const onde = salut * 14 * Math.sin(t * 7);
      const vx = 440 + 12 * Math.sin(t * 0.9), vy = 338 + 10 * Math.sin(t * 1.4), gx = 520 + 10 * Math.sin(t * 0.8), gy = 574 + 6 * Math.sin(t * 1.3);
      wv.setAttribute("transform", "rotate(" + onde.toFixed(1) + " " + vx.toFixed(1) + " " + vy.toFixed(1) + ")");
      wg.setAttribute("transform", "rotate(" + (-onde).toFixed(1) + " " + gx.toFixed(1) + " " + gy.toFixed(1) + ")");
      voisineV({ x: vx, y: vy, s: 0.6, t: t, humeur: "sourire", regard: [0.4, 1], op: D.lisse((t - T[4]) / 0.5) });
      voisineG({ x: gx, y: gy, s: 0.6, t: t, humeur: "sourire", regard: [-1, 0.4], op: D.lisse((t - A(5, 0.5)) / 0.5) });

      // étiquettes, échelle des pressions
      opa(p38, D.lisse((t - A(2, 0.05)) / 0.4));
      rangs.forEach(rg => opa(rg.g, D.lisse((t - rg.a) / 0.4)));
      opa(lInter, D.lisse((t - A(2, 0.3)) / 0.4)); opa(ech, D.fenetre(t, T[2], T[4] - 0.1, 0.4));
      opa(lLiq, D.lisse((t - (T[3] + 0.5)) / 0.4)); opa(lVap, D.lisse((t - T[4]) / 0.4));
      opa(lDet, D.lisse((t - A(5, 0.12)) / 0.4)); opa(lPos, D.lisse((t - A(5, 0.5)) / 0.4)); opa(lNeg, D.lisse((t - A(5, 0.78)) / 0.4));
      return { temp: MEL, etat: "liquide", humeur: humeur, diag: D.courbe([[T[3], 7], [E[3], 8]], t), diag0: 7 };
    };
  };
})();

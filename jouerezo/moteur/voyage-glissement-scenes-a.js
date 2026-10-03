/* =====================================================================
   voyage-glissement-scenes-a.js — « le glissement » : l'ouverture et les
   trois premiers chapitres (intro, caracteres, palier, detente)
   ---------------------------------------------------------------------
   CONTRAT D'UNE SCÈNE : VOYAGE_SCENES[id] = function (g, c) → maj(t)
   (voir voyage-theatre.js). Les gestes sont accrochés aux PHRASES du récit
   (donnees/voyage-glissement.js) : c.T[k] / c.E[k] / c.A(k, f).
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (la colonne
   de droite est prise par la carte et le diagramme).
   LIQUIDE = une nappe (D.liquide), jamais des billes ; les petites molécules
   colorées se voient À TRAVERS la nappe (dessinées avant elle). Aucune
   pression chiffrée ; températures = celles du récit seulement.
   AIDES LOCALES (bocal, sonde, fleche, foule) : propres à ce fichier.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI;
  const VERT = D.SOEURS.R32.coul, VIOLET = D.SOEURS.R125.coul, BLEU = D.SOEURS.R134a.coul;
  const COUL = { R32: VERT, R125: VIOLET, R134a: BLEU };
  const ENCRE = "#10233c", MARINE = D.BLEU, ORANGE = D.ORANGE;
  const MIX = ["R32", "R32", "R125", "R134a", "R134a"]; // le mélange en NOMBRE : 2 : 1 : 2
  let nid = 0;
  const id = p => "vga-" + p + "-" + (++nid);
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const entree = (t, a, d) => D.lisse((t - a) / (d || 0.5)); // 0 → 1 à partir de a
  const fen = (t, a, b, d) => D.fenetre(t, a, b, d || 0.35); // visible entre a et b, fondus
  const tr = (x, y, s) => "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")" + (s === undefined ? "" : " scale(" + s.toFixed(3) + ")");
  const dans = (maj, parent) => { if (maj.g.parentNode !== parent) parent.appendChild(maj.g); };
  const repeter = (modele, n) => { const l = []; for (let i = 0; i < n; i++) modele.forEach(m => l.push(m)); return l; };

  /* petites molécules rangées par sorte : [{ sorte, u, v, ph, w, maj }] (u, v, ph, w : hasards reproductibles) */
  function foule(parent, sortes, graine) {
    const rnd = D.alea(graine);
    return sortes.map(s => ({ sorte: s, u: rnd(), v: rnd(), ph: rnd() * TOUR, w: rnd(), maj: D.petite(parent, s) }));
  }

  /* flèche pleine vers la droite, de x1 à x2 (pointe), sur la hauteur y */
  function fleche(parent, x1, x2, y, coul, ep) {
    const e = ep || 14, h = 3 * e, g = D.el("g", {}, parent);
    D.el("path", { d: "M " + x1 + " " + (y - e / 2) + " H " + (x2 - h) + " V " + (y - e * 1.7) + " L " + x2 + " " + y + " L " + (x2 - h) + " " + (y + e * 1.7) + " V " + (y + e / 2) + " H " + x1 + " Z",
      fill: coul, stroke: "#fff", "stroke-width": 2, "stroke-linejoin": "round" }, g);
    return g;
  }

  /* un récipient de verre en coupe : cx centre, y0 haut, l largeur, h hauteur.
     fond = groupe sous la nappe (ce qui y flotte) ; dessus = groupe au-dessus (bulles, vapeur) ;
     niveau(v) règle le remplissage (0..1) ; maj(t) anime la surface ; surface(x, t) */
  function bocal(g, cx, y0, l, h, o) {
    o = o || {};
    const xg = cx - l / 2, x0 = xg + 8, x1 = xg + l - 8, yh = y0 + 16, yb = y0 + h - 10, niv = { v: 0.6 };
    D.el("rect", { x: xg, y: y0, width: l, height: h, rx: 10, fill: "rgba(226,238,250,.5)" }, g);
    const fond = D.el("g", {}, g);
    const liq = D.liquide(g, { x0: x0, x1: x1, yh: yh, yb: yb, niveau: () => niv.v, couleur: () => o.liq || "#9cc8ee", opacite: 0.5, pas: 12 });
    const dessus = D.el("g", {}, g);
    D.el("path", { d: "M " + (xg - 10) + " " + (y0 - 2) + " H " + xg + " V " + (y0 + h - 12) + " Q " + xg + " " + (y0 + h) + " " + (xg + 14) + " " + (y0 + h) +
      " H " + (xg + l - 14) + " Q " + (xg + l) + " " + (y0 + h) + " " + (xg + l) + " " + (y0 + h - 12) + " V " + (y0 - 2) + " H " + (xg + l + 10),
      fill: "none", stroke: "#6f95b8", "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
    D.el("line", { x1: xg + 18, y1: y0 + 30, x2: xg + 18, y2: y0 + h - 34, stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", opacity: 0.7 }, g);
    return { fond: fond, dessus: dessus, x0: x0, x1: x1, yh: yh, yb: yb, cx: cx, y0: y0,
      niveau: v => { niv.v = v; }, maj: t => liq.maj(t), surface: (x, t) => liq.surface(x, t) };
  }

  /* câble d'un thermomètre jusqu'au liquide : du boîtier (bx, by) à la pointe de la sonde (px, py) */
  function sonde(parent, bx, by, px, py) {
    const g = D.el("g", {}, parent);
    D.el("path", { d: "M " + bx + " " + by + " C " + bx + " " + (by + 60) + " " + px + " " + (py - 90) + " " + px + " " + (py - 14), fill: "none", stroke: "#333", "stroke-width": 3 }, g);
    D.el("rect", { x: px - 6, y: py - 16, width: 12, height: 34, rx: 6, fill: "#e8914a", stroke: "#7a4a1c", "stroke-width": 2.5 }, g);
    return g;
  }

  /* ===================================================================
     INTRO — « Mon voyage » : l'héroïne, ses deux sœurs, le bureau, le circuit,
     la flèche vers le diagramme, le thermomètre, le départ
     =================================================================== */
  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const bureau = D.el("g", {}, g), cirG = D.el("g", {}, g), miniG = D.el("g", {}, g), tubeG = D.el("g", {}, g);
    const persos = D.el("g", {}, g), noms = D.el("g", {}, g), hauts = D.el("g", {}, g);

    /* le bureau (k3) : mur, fenêtre au soleil, unité au plafond qui souffle de l'air frais, table et portable */
    D.el("rect", { x: 300, y: 175, width: 650, height: 415, fill: "#f1e8d6", stroke: "#a69470", "stroke-width": 4 }, bureau);
    D.el("rect", { x: 300, y: 590, width: 650, height: 82, fill: "#d9c39d", stroke: "#a69470", "stroke-width": 4 }, bureau);
    D.el("rect", { x: 730, y: 235, width: 170, height: 230, fill: "#c4e5f8", stroke: "#7b6a4f", "stroke-width": 9 }, bureau);
    D.el("line", { x1: 815, y1: 235, x2: 815, y2: 465, stroke: "#7b6a4f", "stroke-width": 7 }, bureau);
    D.el("line", { x1: 730, y1: 350, x2: 900, y2: 350, stroke: "#7b6a4f", "stroke-width": 7 }, bureau);
    D.el("circle", { cx: 772, cy: 290, r: 20, fill: "#f6b73c" }, bureau);
    D.el("rect", { x: 420, y: 176, width: 250, height: 62, rx: 14, fill: "url(#vm-acier-h)", stroke: "#5d6b7a", "stroke-width": 3 }, bureau);
    D.el("rect", { x: 440, y: 220, width: 210, height: 10, rx: 5, fill: "#3b4a5e" }, bureau);
    D.el("rect", { x: 380, y: 512, width: 320, height: 22, rx: 6, fill: "#a9764a", stroke: "#6d4a2a", "stroke-width": 3 }, bureau);
    [396, 668].forEach(x => D.el("rect", { x: x, y: 534, width: 16, height: 56, fill: "#8b5e38" }, bureau));
    D.el("rect", { x: 480, y: 497, width: 120, height: 15, rx: 4, fill: "#5d6b7a" }, bureau);
    D.el("rect", { x: 495, y: 432, width: 90, height: 66, rx: 6, fill: "#24303d", stroke: "#0d141c", "stroke-width": 3 }, bureau);
    D.el("rect", { x: 503, y: 440, width: 74, height: 50, rx: 3, fill: "#9fd0f0" }, bureau);
    const chev = [];
    [[470, 0], [545, 0.33], [620, 0.66]].forEach(([x, ph]) => [0, 1, 2].forEach(j => chev.push({ x: x, ph: ph + j / 3, maj: D.chevron(bureau) })));

    /* le circuit de base (k4), grand, puis le même en petit (k5-k6) pour suivre les points du diagramme */
    const cir = D.circuit(cirG, 11, 162, 940, true);
    const mini = D.circuit(miniG, 25, 170, 360, false);
    const fl = fleche(miniG, 415, 955, 272, ORANGE, 15);
    const flTxt = D.etiquette(miniG, 950, 224, "à droite : le diagramme", { "text-anchor": "end", fill: ORANGE, "font-weight": 700 });
    const pts3 = [["R32", 0], ["R134a", 75], ["R125", 150]].map(([s, d]) => ({ d: d, maj: D.petite(miniG, s) }));

    /* distances le long du circuit (pour les décalages « en file ») */
    const PTS = D.CIRCUIT_PTS, LONG = [0];
    for (let i = 1; i < PTS.length; i++) LONG.push(LONG[i - 1] + Math.hypot(PTS[i][0] - PTS[i - 1][0], PTS[i][1] - PTS[i - 1][1]));
    const TOT = LONG[LONG.length - 1];
    const longDe = w => { const m = ((w % 15) + 15) % 15, i = Math.floor(m); return LONG[i] + (m - i) * (LONG[i + 1] - LONG[i]); };
    const wDe = s => { s = ((s % TOT) + TOT) % TOT; let i = 0; while (i < 14 && LONG[i + 1] < s) i++; return i + (s - LONG[i]) / (LONG[i + 1] - LONG[i]); };
    const decale = (w, d) => wDe(longDe(w) - d);
    /* le tour : chaque organe est nommé, la file passe devant au moment où la voix le dit */
    const wTour = t => D.courbe([[T[4], 0], [A(4, 0.22), 0.6], [A(4, 0.36), 3.5], [A(4, 0.5), 6.5], [A(4, 0.63), 8], [A(4, 0.76), 10.5], [A(4, 0.9), 13], [E[4], 15]], t, true);
    const tempDe = w => D.courbe([[0, 0.08], [1, 0.12], [2, 0.2], [3.2, 0.5], [4, 0.62], [6, 0.5], [7, 0.44], [12.5, 0.42], [13.3, 0.08], [15, 0.08]], w, true);
    const etatDe = w => w > 0.1 && w < 1 ? "bout" : w >= 1 && w < 6.5 ? "vapeur" : "liquide";
    const wMini = d => D.courbe([[0, 0], [1, 1], [2, 2], [3, 4], [4, 6], [5, 7], [6, 8], [7, 15]], d, true); // position du diagramme → circuit
    const cycTemp = d => D.courbe([[0, 0.08], [1, 0.12], [2, 0.2], [3, 0.62], [4, 0.5], [5, 0.46], [6, 0.42], [6.7, 0.42], [7, 0.08]], d, true);
    const cycEtat = d => d < 1 ? "bout" : d < 4 ? "vapeur" : d < 5 ? "bout" : "liquide";
    const MARQUES = [["evaporateur", 0.22], ["compresseur", 0.36], ["condenseur", 0.5], ["bouteille", 0.63], ["filtre", 0.76], ["voyant", 0.76], ["electrovanne", 0.76], ["detendeur", 0.9]];

    /* le tube (k5-k7) : une coupe d'évaporateur où la file bout */
    D.tube(tubeG, 40, 545, 900, 130, "cuivre", false);
    const fondT = D.el("g", {}, tubeG);
    const nappeT = D.liquide(tubeG, { x0: 40, x1: 940, yh: 555, yb: 665, niveau: () => 0.5, couleur: () => D.couleur(0.07, false), opacite: 0.5, pas: 18 });
    const bulT = D.bulles(D.el("g", {}, tubeG), 18, 91, false);
    const vapT = foule(fondT, ["R32", "R32", "R125", "R134a", "R134a"], 5);
    const th = D.thermometre(noms, 500, 425, { pince: [585, 548] });
    const meme = D.etiquette(noms, 940, 504, "à la même pression", { "text-anchor": "end", fill: MARINE, "font-weight": 700 });

    /* les trois personnages */
    const s32 = D.soeur(persos, "R32", 60, 0.35), s125 = D.soeur(persos, "R125", 60, 0.7), mila = D.heroine(persos, { r: 60 });
    const DEFS = [
      { key: "R32", maj: s32, rang: [190, 430], col: [125, 250], tube: 180, dec: 0, nomT: () => A(2, 0.55), regard: [1, 0] },
      { key: "R134a", maj: mila, rang: [490, 430], col: [125, 405], tube: 300, dec: 75, nomT: () => T[2], regard: [1, 0] },
      { key: "R125", maj: s125, rang: [790, 430], col: [125, 560], tube: 420, dec: 150, nomT: () => A(2, 0.8), regard: [-1, 0] }
    ];
    const NOMS = DEFS.map(d => D.etiquette(noms, 0, 0, d.key, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: COUL[d.key] }));
    const PAST = [["R134a", 640, BLEU, T[0], T[1]], ["le R407C : un mélange", 270, MARINE, T[1], T[3]],
      ["climatisation d'un grand bureau", 724, MARINE, T[3], T[4]], ["quand nous bouillons, notre température glisse", 724, ORANGE, T[6], T[7]],
      ["suivez-nous", 724, VERT, T[7], c.D + 1]].map(([s, y, f, a, b]) => ({ g: D.pastille(hauts, 492, y, s, f, 30, "middle"), a: a, b: b }));

    return function (t) {
      op(bureau, entree(t, T[3] - 0.3, 0.6) * (1 - entree(t, T[4] - 0.3, 0.4)));
      chev.forEach(ch => {
        const f = D.frac(ch.ph + t * 0.2);
        ch.maj(ch.x + Math.sin(f * 5 + ch.ph * 9) * 8, 252 + f * 170, 0, "#3d7fca", D.fenetre(f, 0, 1, 0.18) * 0.95);
      });
      op(cirG, entree(t, T[4] - 0.4, 0.6) * (1 - entree(t, T[5] - 0.2, 0.5)));
      MARQUES.forEach(([nom, f]) => cir.surligne(nom, t > A(4, f) && t < E[4] + 0.8));
      op(miniG, entree(t, T[5] - 0.1, 0.6));
      const e5 = entree(t, T[5], 0.7);
      fl.setAttribute("transform", tr(-(1 - e5) * 40, 0)); op(fl, e5); op(flTxt, e5);
      op(tubeG, entree(t, T[5] - 0.1, 0.7));

      /* les trois : rang → colonne (k3) → circuit (k4) → tube (k5), puis départ vers la droite (k7) */
      const kol = entree(t, T[3] - 0.2, 1.1), cir4 = entree(t, T[4] - 0.4, 0.9), tub5 = entree(t, T[5] - 0.1, 1.3);
      const sH = D.lerp(1.6, 1.25, entree(t, T[1] - 0.2, 1.0)), sx = entree(t, T[1], 1.1), ap1 = entree(t, T[1], 0.3);
      const wl = wTour(t), dx7 = D.courbe([[T[7], 0], [c.D - 0.3, 560]], t);
      const wh = decale(wl, 75), wm = ((wh % 15) + 15) % 15;
      let temp = 0.1, etat = "liquide", humeur = "sourire";
      if (t >= T[4] - 0.4 && t < T[5] - 0.1) { temp = tempDe(wm); etat = etatDe(wm); humeur = wm > 3 && wm < 5 ? "chaud" : "sourire"; }
      else if (t >= T[5] - 0.1) { temp = D.courbe([[T[5], 0.08], [E[6], 0.12]], t); etat = t > T[6] ? "bout" : "liquide"; }
      if (t > T[1] && t < T[1] + 1.4) humeur = "surprise";
      DEFS.forEach((d, i) => {
        const soeur = d.key !== "R134a";
        let x = soeur ? D.lerp(490, d.rang[0], sx) : d.rang[0], y = d.rang[1] + Math.sin(t * 2.2 + i) * 7;
        let s = soeur ? D.lerp(0.7, 1.1, sx) : sH, o = soeur ? ap1 : 1;
        x = D.lerp(x, d.col[0], kol); y = D.lerp(y, d.col[1], kol); s = D.lerp(s, 0.62, kol);
        const [cx, cy] = cir.ecran(...D.circuitPoint(decale(wl, d.dec)));
        x = D.lerp(x, cx, cir4); y = D.lerp(y, cy, cir4); s = D.lerp(s, 0.37, cir4);
        const xt = d.tube + dx7, yt = nappeT.surface(xt, t) + 4 + Math.sin(t * 2 + i * 2) * 4;
        x = D.lerp(x, xt, tub5); y = D.lerp(y, yt, tub5); s = D.lerp(s, 0.45, tub5);
        o *= D.borne((935 - x) / 60, 0, 1);
        dans(d.maj, tub5 > 0.5 ? fondT : persos);
        d.maj({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: soeur ? "sourire" : humeur, regard: d.regard, op: o });
        const n = NOMS[i];
        n.setAttribute("x", x.toFixed(1)); n.setAttribute("y", (y + 92 * s + 34).toFixed(1));
        op(n, entree(t, d.nomT(), 0.4) * (1 - entree(t, T[4] - 0.4, 0.4)) * (1 - D.borne(kol * (1 - kol) * 12, 0, 1))); // les noms s'effacent pendant que les trois se croisent
      });

      /* les petits points de la carte miniature : ils suivent le diagramme */
      const dd = 7 * D.borne((t - T[5]) / (E[6] - T[5]), 0, 1), wp = wMini(dd);
      pts3.forEach(p => { const [x, y] = mini.ecran(...D.circuitPoint(decale(wp, p.d))); p.maj(x, y, 1, 11); });

      /* le tube qui bout, le thermomètre */
      const bo = entree(t, T[6], 0.6);
      bulT(t, q => { const x = 60 + D.frac(q * 7.31) * 860; return [x, 661, nappeT.surface(x, t) + 4, q < bo ? 1 : 0]; });
      nappeT.maj(t);
      vapT.forEach(m => m.maj(110 + m.u * 780 + Math.sin(t * 0.7 + m.ph) * 18, 572 + m.v * 20 + Math.cos(t * 1.1 + m.ph) * 4, entree(t, T[6], 0.8), 9));
      th(t < A(6, 0.7) ? "0 °C" : "+5 °C", fen(t, T[6] + 0.1, T[7] + 0.3, 0.4));
      op(meme, fen(t, T[6] + 0.1, T[7] + 0.3, 0.4));
      PAST.forEach(p => op(p.g, fen(t, p.a, p.b - 0.1, 0.35)));

      const r = { temp: temp, etat: etat, humeur: humeur };
      if (t >= T[5]) { r.diag = dd; r.diag0 = 0; r.temp = cycTemp(dd); r.etat = cycEtat(dd); r.humeur = "sourire"; }
      return r;
    };
  };

  /* ===================================================================
     CARACTÈRES — trois sortes de molécules, trois températures d'ébullition
     =================================================================== */
  S.caracteres = function (g, c) {
    const T = c.T, A = c.A;
    const gGros = D.el("g", {}, g), gCam = D.el("g", {}, g), gTrio = D.el("g", {}, g), gEch = D.el("g", {}, g), gPast = D.el("g", {}, g);

    /* k0 : le grand récipient, les molécules mêlées (2 : 1 : 2) */
    const gb = bocal(gGros, 490, 215, 440, 380);
    gb.niveau(0.62);
    const molsG = foule(gb.fond, repeter(MIX, 4), 7);

    /* k1 : le camembert EN MASSE (R134a à droite, face à l'héroïne) */
    const CX = 300, CY = 455, RR = 150;
    const secteurs = [["R32", 93.6, 176.4, A(1, 0.2)], ["R125", 176.4, 266.4, A(1, 0.45)], ["R134a", -93.6, 93.6, A(1, 0.62)]].map(([cle, a0, a1, tA]) => {
      const p = a => [CX + RR * Math.cos(a * Math.PI / 180), CY + RR * Math.sin(a * Math.PI / 180)];
      const [x0, y0] = p(a0), [x1, y1] = p(a1), gs = D.el("g", {}, gCam);
      const f = D.el("path", { d: "M " + CX + " " + CY + " L " + x0.toFixed(1) + " " + y0.toFixed(1) + " A " + RR + " " + RR + " 0 " + (a1 - a0 > 180 ? 1 : 0) + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1) + " Z",
        fill: COUL[cle], stroke: "#fff", "stroke-width": 5, "stroke-linejoin": "round" }, gs);
      return { g: gs, f: f, t: tA, cle: cle };
    });
    const etCam = [["R32 · 23 %", 160, 590, "end", "R32", A(1, 0.28)], ["R125 · 25 %", 175, 350, "end", "R125", A(1, 0.52)], ["R134a · 52 %", 464, 468, "start", "R134a", A(1, 0.7)]]
      .map(([s, x, y, a, cle, tA]) => ({ e: D.etiquette(gCam, x, y, s, { "text-anchor": a, fill: COUL[cle], "font-weight": 700 }), t: tA }));
    const enMasse = D.etiquette(gCam, CX, 272, "en masse", { "text-anchor": "middle", fill: MARINE, "font-weight": 700 });
    const milaCam = D.heroine(gCam, { r: 60 });
    const moi = D.etiquette(gCam, 770, 528, "moi, la plus nombreuse", { "text-anchor": "middle", fill: BLEU, "font-weight": 700 });
    const ptr = D.trait(gCam, 692, 366, 450, 398, ORANGE);

    /* k2 → k6 : trois récipients, un par sorte */
    const KEYS = ["R32", "R125", "R134a"], BX = [180, 490, 800];
    const TEMPS = ["−12 °C", "−6 °C", "+19 °C"], TT = [A(3, 0.45), A(4, 0.4), A(5, 0.45)];
    const DEB = [T[3], T[4], T[5]], INT = [1, 0.9, 0.5], NBV = [6, 5, 2], RAPIDE = [0.55, 0.5, 0.22];
    const bocs = BX.map(cx => bocal(gTrio, cx, 305, 200, 285));
    const persoT = KEYS.map((k, i) => k === "R134a" ? D.heroine(bocs[i].fond, { r: 60 }) : D.soeur(bocs[i].fond, k, 60, i * 0.3));
    const pets = KEYS.map((k, i) => foule(bocs[i].fond, repeter([k], 5), 20 + i));
    const bul = bocs.map((b, i) => D.bulles(b.dessus, [24, 16, 8][i], 40 + i, false));
    const vap = KEYS.map((k, i) => foule(bocs[i].dessus, repeter([k], NBV[i]), 60 + i));
    const traces = [0, 1].map(i => vap[i].map(() => D.el("line", { stroke: COUL[KEYS[i]], "stroke-width": 4, "stroke-linecap": "round" }, bocs[i].dessus)));
    const thermos = BX.map((cx, i) => {
      const gs = sonde(gTrio, cx, 230, cx + 78, 480);
      return { sonde: gs, maj: D.thermometre(gTrio, cx - 85, 160, {}) };
    });
    const nomsT = KEYS.map((k, i) => D.etiquette(gTrio, BX[i], 640, k, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: COUL[k] }));
    const pressees = [0, 1].map(i => D.etiquette(gTrio, BX[i], 692, "les pressées", { "text-anchor": "middle", fill: ENCRE, "font-weight": 700 }));
    const lente = D.etiquette(gTrio, BX[2], 692, "la lente", { "text-anchor": "middle", fill: ENCRE, "font-weight": 700 });

    /* k7 : l'échelle de température */
    const xT = d => D.lerp(200, 830, (d + 12) / 31), YA = 520;
    const gr = id("echelle");
    const degrade = D.el("linearGradient", { id: gr, x1: 40, x2: 945, y1: 0, y2: 0, gradientUnits: "userSpaceOnUse" }, gEch);
    [[0, "#2f6fb8"], [0.5, "#f2cc8c"], [1, "#c8301f"]].forEach(([o, cc]) => D.el("stop", { offset: o, "stop-color": cc }, degrade));
    D.el("path", { d: "M 40 " + YA + " H 945", stroke: "url(#" + gr + ")", "stroke-width": 10, "stroke-linecap": "round" }, gEch);
    D.el("path", { d: "M 930 " + (YA - 14) + " L 950 " + YA + " L 930 " + (YA + 14), fill: "none", stroke: "#c8301f", "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, gEch);
    const bande = D.el("g", {}, gEch);
    D.el("rect", { x: xT(-6), y: YA - 22, width: xT(19) - xT(-6), height: 44, rx: 10, fill: "#e8914a", opacity: 0.9 }, bande);
    const etBande = D.etiquette(gEch, (xT(-6) + xT(19)) / 2, 612, "ensemble : entre les deux", { "text-anchor": "middle", fill: ORANGE, "font-weight": 700 });
    D.etiquette(gEch, 45, 612, "froid", { fill: "#2f6fb8", "font-weight": 700 });
    D.etiquette(gEch, 945, 612, "chaud", { "text-anchor": "end", fill: "#c8301f", "font-weight": 700 });
    const repere = KEYS.map((k, i) => {
      const x = xT([-12, -6, 19][i]);
      D.el("line", { x1: x, y1: 478, x2: x, y2: YA, stroke: ENCRE, "stroke-width": 4 }, gEch);
      const maj = k === "R134a" ? D.heroine(gEch, { r: 60 }) : D.soeur(gEch, k, 60, i * 0.3);
      D.etiquette(gEch, x, 408, k, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: COUL[k] });
      D.etiquette(gEch, x, 462, TEMPS[i], { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: ENCRE });
      return { maj: maj, x: x };
    });

    const PAST = [["toujours mêlées", 690, MARINE, T[0], T[1]], ["seule, à la même pression", 724, ORANGE, T[2], T[3]]]
      .map(([s, y, f, a, b]) => ({ g: D.pastille(gPast, 492, y, s, f, 30, "middle"), a: a, b: b }));

    return function (t) {
      /* k0 */
      op(gGros, fen(t, -1, T[1] - 0.1, 0.5));
      molsG.forEach(m => {
        const x = gb.x0 + 22 + m.u * (gb.x1 - gb.x0 - 44) + Math.sin(t * (0.5 + m.w * 0.5) + m.ph) * 14;
        const y = D.lerp(gb.surface(x, t) + 24, gb.yb - 24, m.v) + Math.cos(t * (0.45 + m.w * 0.4) + m.ph * 1.7) * 10;
        m.maj(x, y, 1, 13);
      });
      gb.maj(t);

      /* k1 */
      op(gCam, fen(t, T[1] - 0.2, T[2] - 0.1, 0.5));
      secteurs.forEach(s => {
        const e = entree(t, s.t - 0.2, 0.5), z = 0.8 + 0.2 * e;
        s.g.setAttribute("transform", "translate(" + CX + " " + CY + ") scale(" + z.toFixed(3) + ") translate(" + (-CX) + " " + (-CY) + ")"); op(s.g, e);
      });
      etCam.forEach(e => op(e.e, entree(t, e.t, 0.4)));
      const pt = entree(t, A(1, 0.86), 0.5);
      op(enMasse, entree(t, T[1] + 0.2, 0.5)); op(moi, pt); op(ptr, pt);
      secteurs[2].f.setAttribute("stroke", pt > 0.3 ? ORANGE : "#fff"); secteurs[2].f.setAttribute("stroke-width", pt > 0.3 ? 8 : 5);
      milaCam({ x: 770, y: 362 + Math.sin(t * 2.2) * 6, s: 1.2, t: t, temp: 0.1, etat: "liquide", humeur: "sourire", regard: [-1, 0.4], op: pt });

      /* k2 → k6 */
      op(gTrio, fen(t, T[2] - 0.2, T[7] - 0.1, 0.5));
      bocs.forEach((b, i) => {
        const cx = BX[i];
        b.niveau(0.55);
        const inten = INT[i] * entree(t, DEB[i], 0.8);
        const x = cx + Math.sin(t * 0.7 + i) * 28, ys = b.surface(x, t);
        persoT[i]({ x: x, y: ys + 6 + Math.sin(t * 2 + i) * 3, s: 0.45, t: t, temp: i === 2 ? D.lerp(0.1, 0.22, inten * 2) : 0.1, etat: i === 2 && inten > 0.1 ? "bout" : "liquide", humeur: i === 2 && inten > 0.1 ? "surprise" : "sourire", regard: [i === 2 ? -1 : 1, 0] });
        pets[i].forEach(m => {
          const px = cx - 70 + m.u * 140 + Math.sin(t * (0.5 + m.w * 0.5) + m.ph) * 8, sp = b.surface(px, t);
          m.maj(px, D.lerp(sp + 34, b.yb - 22, m.v) + Math.cos(t * 0.6 + m.ph) * 6, 1, 11);
        });
        bul[i](t, q => { const bx = cx - 78 + D.frac(q * 7.31) * 156; return [bx, b.yb - 6, b.surface(bx, t) + 4, q < inten ? 1 : 0]; });
        vap[i].forEach((m, k) => {
          const u = D.frac(t * RAPIDE[i] + m.ph / TOUR), sp = b.surface(cx, t);
          const mx = cx - 62 + m.v * 124 + Math.sin(t * 1.3 + m.ph) * 8, my = D.lerp(sp - 10, 262, u), o = D.fenetre(u, 0, 1, 0.15) * inten;
          m.maj(mx, my, o, 10);
          if (i < 2) {
            const tl = traces[i][k], vit = entree(t, T[6] - 0.1, 0.5) * o;
            tl.setAttribute("x1", mx.toFixed(1)); tl.setAttribute("x2", mx.toFixed(1));
            tl.setAttribute("y1", (my + 16).toFixed(1)); tl.setAttribute("y2", (my + 16 + 30).toFixed(1)); op(tl, 0.6 * vit);
          }
        });
        b.maj(t);
        const vis = entree(t, TT[i], 0.5);
        thermos[i].maj(TEMPS[i], vis); op(thermos[i].sonde, vis);
        op(nomsT[i], entree(t, T[2], 0.5));
      });
      pressees.forEach(p => op(p, entree(t, T[6] + 0.3, 0.5)));
      op(lente, entree(t, A(6, 0.55), 0.5));

      /* k7 */
      op(gEch, entree(t, T[7] - 0.2, 0.6));
      repere.forEach((r, i) => r.maj({ x: r.x, y: 330 + Math.sin(t * 2 + i) * 5, s: 0.5, t: t, temp: 0.1, etat: "liquide", humeur: "sourire", regard: [0, 0] }));
      op(bande, entree(t, A(7, 0.35), 0.6)); op(etBande, entree(t, A(7, 0.35), 0.6));
      PAST.forEach(p => op(p.g, fen(t, p.a, p.b - 0.1, 0.35)));
      return { temp: 0.1, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ===================================================================
     PALIER — chauffer à pression constante : le palier du corps pur, la pente du mélange
     =================================================================== */
  S.palier = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const AX = 340, AY = 650;
    const axes = D.el("g", {}, g);
    D.el("path", { d: "M " + AX + " " + (AY + 4) + " V 180 m -9 14 l 9 -14 l 9 14", fill: "none", stroke: ENCRE, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, axes);
    D.el("path", { d: "M " + (AX - 4) + " " + AY + " H 950 m -14 -9 l 14 9 l -14 9", fill: "none", stroke: ENCRE, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, axes);
    D.etiquette(axes, AX + 18, 206, "température", { fill: ENCRE, "font-weight": 700 });
    D.etiquette(axes, 946, AY + 44, "chaleur reçue", { "text-anchor": "end", fill: ENCRE, "font-weight": 700 });

    /* la zone d'ébullition (même largeur pour le corps pur et le mélange) : une bande pâle derrière les tracés, pour comparer le plat et la pente */
    const bande = D.el("g", {}, g);
    D.el("rect", { x: 470, y: 222, width: 150, height: AY - 222, fill: "#e8914a", opacity: 0.13 }, bande);
    D.etiquette(bande, 545, 258, "ébullition", { "text-anchor": "middle", fill: ENCRE, "font-weight": 700 });

    /* le tracé du corps pur (bleu, plein) et celui du mélange (orange, tirets) : révélés de gauche à droite.
       Liquide : même raideur pour les deux (parallèles). Ébullition : plat pour le corps pur, pente douce (le quart de la raideur) pour le mélange,
       qui commence à bouillir plus bas. Vapeur : remontées parallèles. */
    const rect = (nom) => D.el("rect", { x: AX, y: 170, width: 0, height: 490 }, D.el("clipPath", { id: nom }, g));
    const cA = id("rA"), cM = id("rM"), rA = rect(cA), rM = rect(cM);
    const gA = D.el("g", {}, g), gM = D.el("g", {}, g);
    const cuA = D.el("g", { "clip-path": "url(#" + cA + ")" }, gA), cuM = D.el("g", { "clip-path": "url(#" + cM + ")" }, gM);
    D.el("path", { d: "M 352 636 L 470 440 L 620 440 L 760 270", fill: "none", stroke: BLEU, "stroke-width": 7, "stroke-linejoin": "round", "stroke-linecap": "round" }, cuA);
    D.el("path", { d: "M 412 636 L 470 540 L 620 478 L 760 308", fill: "none", stroke: ORANGE, "stroke-width": 7, "stroke-dasharray": "16 10", "stroke-linejoin": "round", "stroke-linecap": "butt" }, cuM);
    const zA = [["liquide", 405, 408, A(1, 0.4)], ["palier", 545, 412, A(2, 0.3)], ["vapeur", 735, 242, A(3, 0.4)]]
      .map(([s, x, y, tA]) => ({ e: D.etiquette(gA, x, y, s, { "text-anchor": "middle", fill: BLEU, "font-weight": 700 }), t: tA }));
    /* repères du mélange : première bulle, dernière goutte, pente */
    const rep = D.el("g", {}, gM);
    const dotB = D.el("circle", { cx: 470, cy: 540, r: 10, fill: ORANGE, stroke: "#fff", "stroke-width": 3 }, rep);
    const dotE = D.el("circle", { cx: 620, cy: 478, r: 10, fill: ORANGE, stroke: "#fff", "stroke-width": 3 }, rep);
    const tB = D.trait(rep, 506, 576, 478, 549), tE = D.trait(rep, 705, 518, 628, 486);
    const eB = D.etiquette(rep, 545, 612, "1re bulle", { "text-anchor": "middle", fill: ORANGE, "font-weight": 700 });
    const eE = D.etiquette(rep, 800, 545, "dernière goutte", { "text-anchor": "middle", fill: ORANGE, "font-weight": 700 });
    const eP = D.etiquette(rep, 590, 558, "pente", { "text-anchor": "middle", fill: ORANGE, "font-weight": 700 });
    /* l'accolade du glissement, sur l'axe vertical, entre la première bulle et la dernière goutte */
    const gl = D.el("g", {}, g);
    D.trait(gl, 334, 478, 620, 478, "#637285"); D.trait(gl, 334, 540, 470, 540, "#637285");
    D.el("path", { d: "M 334 478 Q 320 478 320 490 V 503 Q 320 509 308 509 Q 320 509 320 515 V 528 Q 320 540 334 540", fill: "none", stroke: ENCRE, "stroke-width": 5, "stroke-linecap": "round" }, gl);
    const etGl = D.etiquette(gl, 298, 521, "glissement", { "text-anchor": "end", fill: ENCRE, "font-weight": 700 });

    /* le récipient chauffé, en haut à gauche */
    const CXB = 150, b = bocal(g, CXB, 190, 150, 125);
    const flamme = D.el("g", {}, g);
    D.el("rect", { x: CXB - 34, y: 352, width: 68, height: 12, rx: 5, fill: "#5d6b7a" }, flamme);
    const fl1 = D.el("path", { d: "M 150 352 C 122 350 128 332 150 318 C 172 332 178 350 150 352 Z", fill: "#f08a2c", stroke: "#c9451a", "stroke-width": 3 }, flamme);
    const fl2 = D.el("path", { d: "M 150 352 C 136 351 140 340 150 332 C 160 340 164 351 150 352 Z", fill: "#ffd166" }, flamme);
    const nom = D.etiquette(g, CXB, 414, "R134a seul", { "text-anchor": "middle", fill: BLEU, "font-weight": 700 });
    const nomM = D.etiquette(g, CXB, 414, "notre mélange", { "text-anchor": "middle", fill: ORANGE, "font-weight": 700 });
    const pur = foule(b.fond, repeter(["R134a"], 8), 11), mel = foule(b.fond, repeter(MIX, 2), 12);
    const rnd = D.alea(5);
    pur.forEach((m, i) => { m.th = 0.05 + 0.9 * ((i + 0.5) / pur.length); m.v2 = rnd(); });
    mel.forEach(m => { m.th = m.sorte === "R134a" ? 0.35 + 0.6 * rnd() : 0.15 + 0.7 * rnd(); m.v2 = rnd(); });
    [["R32", 0.96], ["R125", 0.97], ["R134a", 0.98]].forEach(([s, v]) => { mel.filter(m => m.sorte === s)[0].th = v; }); // chaque sorte part jusqu'au bout
    const bulC = D.bulles(b.dessus, 10, 17, false);
    D.pastille(g, 30, 478, "même pression", MARINE, 30, "start");

    const NIV0 = 0.7;
    return function (t) {
      /* tracés */
      rA.setAttribute("width", Math.max(0, D.courbe([[T[1] + 0.3, AX], [E[1] - 0.1, 470], [T[2] + 0.5, 470], [A(2, 0.85), 620], [T[3] + 0.2, 620], [E[3] - 0.3, 770]], t, true) - AX).toFixed(1));
      rM.setAttribute("width", Math.max(0, D.courbe([[T[4] + 1.0, AX], [E[4], 430], [T[5] + 0.3, 430], [A(5, 0.6), 470], [T[6] + 0.3, 470], [A(6, 0.85), 620], [T[7] + 0.1, 620], [T[7] + 1.6, 770]], t, true) - AX).toFixed(1));
      const dim = entree(t, T[4], 0.6);
      op(gA, 1 - 0.65 * dim);
      op(bande, entree(t, A(2, 0.2), 0.5));
      zA.forEach(z => op(z.e, entree(t, z.t, 0.4) * (1 - entree(t, T[4] - 0.1, 0.4))));
      op(dotB, entree(t, A(5, 0.6), 0.3)); op(tB, entree(t, A(5, 0.6), 0.3)); op(eB, entree(t, A(5, 0.6), 0.4));
      op(eP, entree(t, A(6, 0.7), 0.4));
      op(dotE, entree(t, A(6, 0.88), 0.3)); op(tE, entree(t, A(6, 0.88), 0.3)); op(eE, entree(t, A(6, 0.9), 0.4));
      op(gl, entree(t, A(7, 0.3), 0.5)); op(etGl, entree(t, A(7, 0.7), 0.5));

      /* le récipient : corps pur (k0 → k3), puis le mélange (k4 → k7) */
      const mode = t < T[4] ? "pur" : "mel";
      const niv = mode === "pur" ? D.courbe([[A(2, 0.1), NIV0], [A(3, 0.15), 0]], t, true)
        : D.courbe([[T[4] + 0.1, 0], [T[4] + 1.1, NIV0], [A(5, 0.55), NIV0], [A(6, 0.92), 0]], t, true);
      b.niveau(niv); b.maj(t);
      const inten = Math.max(fen(t, A(2, 0.05), A(3, 0.1), 0.4), fen(t, A(5, 0.55), A(6, 0.92), 0.4));
      bulC(t, q => { const bx = b.x0 + 12 + D.frac(q * 7.31) * (b.x1 - b.x0 - 24); return [bx, b.yb - 6, b.surface(bx, t) + 4, q < inten ? 1 : 0]; });
      const frac = D.borne(1 - niv / NIV0, 0, 1);
      const place = (lot, o) => lot.forEach(m => {
        const x = b.x0 + 14 + m.u * (b.x1 - b.x0 - 28) + Math.sin(t * (0.6 + m.w * 0.6) + m.ph) * 7, surf = b.surface(x, t);
        const yl = D.lerp(surf + 15, b.yb - 15, m.v) + Math.cos(t * 0.8 + m.ph) * 4;
        const yv = D.lerp(196, Math.max(surf - 14, 204), m.v2) + Math.sin(t * 1.4 + m.ph) * 5;
        m.maj(x, D.lerp(yl, yv, entree(frac, m.th, 0.1)), o, 9);
      });
      place(pur, 1 - entree(t, T[4] - 0.1, 0.3));
      place(mel, entree(t, T[4] + 0.3, 0.5));
      const f = 1 + 0.12 * Math.sin(t * 9);
      fl1.setAttribute("transform", "translate(150 352) scale(" + (1 - 0.04 * Math.sin(t * 7)).toFixed(3) + " " + f.toFixed(3) + ") translate(-150 -352)");
      fl2.setAttribute("transform", "translate(150 352) scale(1 " + (1 + 0.16 * Math.sin(t * 11 + 1)).toFixed(3) + ") translate(-150 -352)");
      op(nom, 1 - entree(t, T[4] - 0.1, 0.3)); op(nomM, entree(t, T[4] + 0.2, 0.4));
      return { temp: 0.1, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ===================================================================
     DÉTENTE — la ligne liquide, l'orifice du détendeur, l'entrée de l'évaporateur
     =================================================================== */
  S.detente = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const TIEDE = D.couleur(0.42, false), FROID = D.couleur(0.08, false);
    /* tubes, corps du détendeur, cavités */
    D.tube(g, 540, 330, 400, 200, "cuivre", false);
    D.tube(g, 20, 385, 400, 90, "cuivre", false);
    D.el("rect", { x: 400, y: 295, width: 140, height: 270, rx: 20, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, g);
    D.el("rect", { x: 400, y: 395, width: 70, height: 70, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 496, y: 340, width: 48, height: 180, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 20, y: 395, width: 450, height: 70, fill: TIEDE, opacity: 0.85 }, g);
    const flux = D.courant(g, 20, 460, 395, 465, 6, 21);
    /* la droite : ce qui flotte sous la nappe, la nappe (¾), puis le siège et le pointeau par-dessus */
    const fondD = D.el("g", {}, g);
    const nappe = D.liquide(g, { x0: 496, x1: 940, yh: 340, yb: 520, niveau: () => 0.75, couleur: () => FROID, opacite: 0.55, pas: 12 });
    D.el("rect", { x: 466, y: 420, width: 32, height: 17, fill: TIEDE, opacity: 0.9 }, g);
    D.el("path", { d: "M 466 335 H 496 V 405 L 487 421 H 475 L 466 405 Z", fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2, "stroke-linejoin": "round" }, g); // le siège
    D.el("path", { d: "M 481 436 L 466 472 H 496 Z", fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2, "stroke-linejoin": "round" }, g); // le pointeau
    D.el("rect", { x: 475, y: 472, width: 12, height: 93, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const persos = D.el("g", {}, g);

    /* molécules : le jet de vapeur à la sortie de l'orifice, et celles que la nappe emporte (vues à travers) */
    const jet = foule(fondD, ["R32", "R125", "R134a", "R32", "R134a", "R125", "R32", "R134a"], 31);
    const dansNappe = foule(fondD, ["R32", "R125", "R134a", "R32", "R134a", "R134a"], 32);
    const gerbe = foule(fondD, ["R32", "R125", "R134a", "R32", "R134a", "R125", "R32", "R134a", "R134a", "R32", "R125", "R134a"], 33);

    /* les trois personnages (en petit) : R32 en tête, l'héroïne au milieu, R125 derrière */
    const s32 = D.soeur(persos, "R32", 60, 0.35), s125 = D.soeur(persos, "R125", 60, 0.7), mila = D.heroine(persos, { r: 60 });
    const DEFS = [
      { maj: s32, tp: A(1, 0.2), xs: 250, xq: 380, xe: 700 },
      { maj: mila, tp: A(1, 0.42), xs: 150, xq: 290, xe: 600 },
      { maj: s125, tp: A(1, 0.64), xs: 60, xq: 200, xe: 500 }
    ];

    /* labels, thermomètre, manomètre, flèche */
    const eLig = D.etiquette(g, 210, 534, "ligne liquide", { "text-anchor": "middle", fill: ENCRE, "font-weight": 700 });
    const eDet = D.etiquette(g, 470, 284, "détendeur", { "text-anchor": "middle", fill: ENCRE, "font-weight": 700 });
    const eEnt = D.etiquette(g, 940, 586, "entrée de l'évaporateur", { "text-anchor": "end", fill: ENCRE, "font-weight": 700 });
    const th = D.thermometre(g, 760, 175, { pince: [815, 332] });
    const raccord = D.el("rect", { x: 633, y: 296, width: 14, height: 38, fill: "url(#vm-cuivre-h)" }, g);
    const man = D.manometre(g, 640, 232, 62, "BP", D.BLEU);
    const gFl = D.el("g", {}, g);
    fleche(gFl, 560, 935, 632, MARINE, 14);
    D.etiquette(gFl, 700, 692, "la même pression tout le long", { "text-anchor": "middle", fill: MARINE, "font-weight": 700 });
    const PAST = [["¼ vapeur · ¾ liquide", 724, BLEU, T[2], T[4]], ["même énergie, pression plus basse", 724, ORANGE, T[5], c.D + 1]]
      .map(([s, y, f, a, bb]) => ({ g: D.pastille(g, 492, y, s, f, 30, "middle"), a: a, b: bb }));

    return function (t) {
      flux(t, 70);
      nappe.maj(t);
      op(eLig, entree(t, 0.2, 0.6)); op(eDet, entree(t, 0.2, 0.6)); op(eEnt, entree(t, T[2], 0.5));
      /* le jet : naît à l'orifice dès que la première passe, monte dans la vapeur, file avec le courant */
      const emerg = entree(t, T[1] + 0.8, 0.6);
      jet.forEach((m, i) => {
        const u = D.frac((t - T[1]) / 5.5 + i / jet.length), lane = 354 + (i % 3) * 9;
        const x = D.lerp(500, 925, u), y = u < 0.2 ? D.lerp(430, lane, D.lisse(u / 0.2)) : lane + Math.sin(t * 2 + m.ph) * 3;
        m.maj(x, y, emerg * D.fenetre(u, 0, 1, 0.1), 9);
      });
      dansNappe.forEach((m, i) => {
        const u = D.frac(t / 9 + i / dansNappe.length), x = D.lerp(520, 925, u), surf = nappe.surface(x, t);
        m.maj(x, D.lerp(surf + 24, 502, m.v) + Math.sin(t * 1.2 + m.ph) * 5, D.fenetre(u, 0, 1, 0.1), 10);
      });
      /* à chaque passage, une gerbe de petites molécules jaillit de l'orifice et monte dans la vapeur */
      gerbe.forEach((m, i) => {
        const tp = DEFS[i % 3].tp, j = Math.floor(i / 3), u = (t - tp - 0.12 * j) / 1.8;
        if (u < 0 || u > 1) { m.maj(-50, -50, 0, 9); return; }
        const lane = 352 + (i % 4) * 8, x = 500 + u * (50 + 55 * (j + 1)) + Math.sin(i * 2.3) * 12;
        m.maj(x, D.lerp(428, lane, D.lisse(Math.min(1, u * 1.6))), D.fenetre(u, 0, 1, 0.12), 9);
      });
      /* l'héroïne et ses sœurs */
      let temp = 0.42, humeur = "sourire";
      DEFS.forEach((d, i) => {
        const tp = d.tp;
        const x = D.courbe([[T[0], d.xs], [E[0], d.xq], [tp - 0.4, 430], [tp, 481], [tp + 0.4, 522], [tp + 2.2, d.xe], [c.D, d.xe + 70]], t);
        const yR = nappe.surface(x, t) + 14 + Math.sin(t * 1.8 + i) * 4, y = D.lerp(430, yR, entree(t, tp - 0.1, 1.2));
        const s = D.courbe([[tp - 0.5, 0.33], [tp - 0.12, 0.26], [tp, 0.2], [tp + 0.12, 0.26], [tp + 0.8, 0.4]], t);
        const ec = D.courbe([[tp - 0.35, 0], [tp - 0.05, 0.8], [tp + 0.25, 0.8], [tp + 0.7, 0]], t);
        dans(d.maj, t > tp + 0.4 ? fondD : persos);
        let tmp = D.courbe([[tp - 0.3, 0.42], [tp + 0.7, 0.08]], t), hu = "sourire";
        if (i === 1) { if (t > tp - 0.3 && t < E[1] + 0.5) hu = "surprise"; else if (t > T[2] && t < T[4]) hu = "froid"; temp = tmp; humeur = hu; }
        d.maj({ x: x, y: y, s: s, t: t, temp: tmp, etat: "liquide", humeur: i === 1 ? hu : "sourire", ecrase: ec, regard: [1, 0] });
      });
      th("0 °C", entree(t, T[3], 0.5));
      man(0.2, entree(t, T[4], 0.5)); op(raccord, entree(t, T[4], 0.5));
      op(gFl, fen(t, A(4, 0.45), T[5] + 0.2, 0.4));
      PAST.forEach(p => op(p.g, fen(t, p.a, p.b - 0.1, 0.35)));
      return { temp: temp, etat: "liquide", humeur: humeur };
    };
  };
})();

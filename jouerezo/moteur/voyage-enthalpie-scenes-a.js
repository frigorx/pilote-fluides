/* =====================================================================
   voyage-enthalpie-scenes-a.js — édition « le diagramme enthalpique » :
   l'ouverture, la lecture de la carte, l'évaporateur
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-vis-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (c = { T, E, D, A(k, f) } ; T[k]/E[k] bornent la phrase k du récit
   donnees/voyage-enthalpie.js ; maj(t) rend { temp, etat, humeur, diag?, diag0? }).
   Fonction PURE de t. Les gestes sont accrochés au RANG des phrases : ajouter une
   phrase au récit décale tout. Ce fichier ne définit que trois scènes
   (intro, carte, evaporateur) ; les autres sont dans -b.js et -c.js.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête x < 760,
   y < 140 ; carte « où je suis » et diagramme chiffré à droite, x > 970).
   INTRO : la croix du frigoriste en grand (D.circuit), l'héroïne montre les quatre
   organes dans l'ordre de la phrase 1 (elle ne fait pas le tour ici : le vrai tour
   est la phrase 4, calé sur le diagramme) ; un schéma en rectangle, au milieu de la
   croix, reprend les quatre côtés du cycle.
   CARTE : un mini-diagramme explicatif qui se construit (axes, cloche, zones), la
   croix en petit dans le coin bas droit.
   EVAPORATEUR : le symbole de l'échangeur (echangeur_a_air_eduscol) posé couché en
   grand, le tube en COUPE par-dessus (liquide qui baisse, vapeur qui monte), la
   croix réduite dans le coin. Le symbole garde ses ailettes et son ventilateur ; son
   trait de tube est caché sous la coupe, les ailettes sont redessinées par-dessus.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const POL = "Calibri, Arial, sans-serif";
  const OR = "#ff6b35", ROUGE = "#c0392b", AIR_FROID = "#2f6fb8", ENCRE = "#10233c", GRIS = "#b9c3cf";
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => opa(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const apres = (e, t, a, du) => opa(e, D.lisse((t - a) / (du === undefined ? 0.4 : du)));
  const f1 = v => v.toFixed(1);
  const pts = a => a.map(p => f1(p[0]) + "," + f1(p[1])).join(" ");
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

  /* texte posé (une ligne), caché par défaut */
  function lib(parent, x, y, texte, o) {
    o = o || {};
    return D.etiquette(D.el("g", { opacity: 0 }, parent), x, y, texte, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, fill: o.coul || ENCRE, "font-weight": o.gras === false ? 600 : 700 });
  }
  const groupe = t => t.parentNode; // le <g> créé par lib

  /* flèche à pointe, tracée jusqu'à la fraction f de sa longueur (f = 1 : complète) */
  function fleche(parent, coul, ep) {
    const g = D.el("g", { opacity: 0 }, parent), l = D.el("line", { stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g), h = D.el("polygon", { fill: coul }, g);
    return function (x1, y1, x2, y2, f) {
      if (f === undefined) f = 1;
      opa(g, f > 0.002 ? 1 : 0);
      const a = Math.atan2(y2 - y1, x2 - x1), L = 5 * ep, xe = x1 + (x2 - x1) * f, ye = y1 + (y2 - y1) * f;
      l.setAttribute("x1", f1(x1)); l.setAttribute("y1", f1(y1)); l.setAttribute("x2", f1(xe - Math.cos(a) * L * 0.7)); l.setAttribute("y2", f1(ye - Math.sin(a) * L * 0.7));
      h.setAttribute("points", pts([[xe, ye], [xe - L * Math.cos(a - 0.45), ye - L * Math.sin(a - 0.45)], [xe - L * Math.cos(a + 0.45), ye - L * Math.sin(a + 0.45)]]));
    };
  }
  /* un symbole de voyage/symboles/ posé : centre (x, y), échelle s, rotation en degrés, viewBox [vx, vy, vl, vh] */
  function symbole(parent, fichier, vb, x, y, s, rot, axe) {
    axe = axe || [0, 0];
    const g = D.el("g", { transform: "translate(" + x + " " + y + ") rotate(" + (rot || 0) + ") scale(" + s + ") translate(" + (-axe[0]) + " " + (-axe[1]) + ")" }, parent);
    D.el("image", { href: (window.VOYAGE_SYM_DATA && window.VOYAGE_SYM_DATA[fichier.replace(".svg", "")]) || D.SYM + fichier, x: vb[0], y: vb[1], width: vb[2], height: vb[3] }, g);
    return g;
  }

  /* =====================================================================
     INTRO — « Mon voyage » : la croix, le diagramme à droite, les quatre côtés, le tour
     ===================================================================== */
  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const cir = D.circuit(g, 22, 165, 920, true);
    opa(cir.g, 0);
    const ec = (px, py) => cir.ecran(px, py);
    /* k2 : la grande flèche orange vers la droite, dans le vide de la croix, entre les noms des organes */
    const flD = D.el("g", { opacity: 0 }, g);
    D.el("polygon", { points: "200,492 635,492 635,478 752,515 635,552 635,540 200,540", fill: OR, stroke: "#8f2f10", "stroke-width": 3, "stroke-linejoin": "round" }, flD);
    D.texte(flD, 418, 527, "à droite : le diagramme", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff", "font-family": POL });
    /* k3 : les flèches des quatre côtés, sur la croix, et le même cycle en rectangle au milieu */
    const COTES = [["evaporateur", [210, 500, 390, 500]], ["compresseur", [838, 525, 838, 425]], ["condenseur", [870, 135, 730, 135]], ["detendeur", [108, 540, 108, 640]]];
    const surCroix = COTES.map(([, p]) => {
      const a = ec(p[0], p[1]), b = ec(p[2], p[3]);
      return { f: fleche(g, OR, 11), a: a, b: b };
    });
    const RX0 = 345, RX1 = 575, RY0 = 392, RY1 = 540;
    const schema = D.el("g", { opacity: 0 }, g);
    const SEG = [[RX0 + 12, RY1, RX1 - 6, RY1], [RX1, RY1 - 10, RX1, RY0 + 6], [RX1 - 12, RY0, RX0 + 6, RY0], [RX0, RY0 + 12, RX0, RY1 - 6]];
    D.el("rect", { x: RX0 - 14, y: RY0 - 14, width: RX1 - RX0 + 28, height: RY1 - RY0 + 28, rx: 14, fill: "#fffdf8", stroke: "rgba(27,58,99,.2)", "stroke-width": 2 }, schema);
    const pale = SEG.map(s => fleche(schema, GRIS, 9));
    const vif = SEG.map(s => fleche(g, OR, 9));
    const legende = lib(g, 460, 452, "le cycle", { ancre: "middle", taille: 32, coul: D.BLEU }), legende2 = lib(g, 460, 488, "du diagramme", { ancre: "middle", taille: 32, coul: D.BLEU });
    const pt = D.el("circle", { r: 11, fill: OR, stroke: "#8f2f10", "stroke-width": 3, opacity: 0 }, g);
    /* k0 : la pastille R32 */
    const dessus = D.el("g", {}, g);
    const pR32 = D.pastille(dessus, 492, 628, "R32", D.BLEU, 56, "middle");
    const mila = D.heroine(dessus, { r: 30 });
    /* la molécule montre les organes dans l'ordre de la phrase 1 : [nom, position de l'héroïne sur la croix, fraction de phrase] */
    const VIS = [["condenseur", [620, 262], 0.40], ["evaporateur", [520, 392], 0.56], ["compresseur", [760, 412], 0.72], ["detendeur", [250, 402], 0.88]];
    const VISP = VIS.map(v => ec(v[1][0], v[1][1]));
    /* le tour (phrase 4), de la sortie de l'évaporateur (point 1) jusqu'à y revenir : u = position sur D.CIRCUIT_PTS (2 → 17) */
    const MAPD = [[2, 0], [5, 1], [7.6, 4], [12.5, 4], [15, 5], [17, 7]];
    const tempDe = u => D.courbe([[2, 0.2], [5, 0.7], [5.6, 0.7], [7.6, 0.5], [8.6, 0.15], [12.5, 0.15], [15, 0.08], [16.4, 0.08], [17, 0.2]], u, true);
    const etatDe = u => u < 7.1 ? "vapeur" : u < 7.9 ? "bout" : u < 13 ? "liquide" : u < 16.6 ? "bout" : "vapeur";
    return function (t) {
      const r = {};
      /* la croix apparaît avec la phrase 1 */
      opa(cir.g, D.lisse((t - (T[1] - 0.3)) / 0.7));
      /* position et taille de l'héroïne */
      let x = 492, y = 440 + Math.sin(t * 2.2) * 6, s = 1.5, regard = [0, 0], humeur = "sourire", temp = 0.1, etat = "liquide";
      if (t >= T[1] - 0.4) {
        const vers = (i, a, b) => D.lisse((t - a) / (b - a)); // 0 → 1 entre a et b
        let k = -1;
        for (let i = 0; i < VIS.length; i++) if (t >= A(1, VIS[i][2]) - 0.5) k = i;
        const dep = (i) => i === 0 ? [492, 440, 1.5] : [VISP[i - 1][0], VISP[i - 1][1], 0.62];
        if (k >= 0 && t < T[2]) {
          const a = dep(k), b = [VISP[k][0], VISP[k][1], 0.62], f = vers(0, A(1, VIS[k][2]) - 0.5, A(1, VIS[k][2]) - 0.05);
          x = D.lerp(a[0], b[0], f); y = D.lerp(a[1], b[1], f) + Math.sin(t * 2.4) * 3; s = D.lerp(a[2], b[2], f);
          regard = [0, -0.5];
        } else if (t >= T[2] && t < T[3]) {
          const a = VISP[3], f = vers(0, T[2], T[2] + 0.7);
          x = D.lerp(a[0], 470, f); y = D.lerp(a[1], 440, f); s = 0.62; regard = [D.lisse((t - T[2] - 0.4) / 0.6), 0];
        } else if (t >= T[1] - 0.4 && t < T[1] + 0.2) { x = 492; y = 440; s = 1.5; }
        if (t >= T[2]) humeur = "sourire";
      }
      if (t >= T[3]) { // k3 : elle suit le côté allumé, le long du tuyau (u : 14.5 → 29.5), puis revient au point 1 (u = 17 ≡ 2)
        const u = D.courbe([[T[3], 14.5], [A(3, 0.04), 14.5], [A(3, 0.28), 17], [A(3, 0.52), 20], [A(3, 0.76), 26], [A(3, 0.96), 29.5], [E[3] + 0.35, 32]], t, true);
        const [px, py] = ec(...D.circuitPoint(u)); x = px; y = py; s = 0.62; regard = [0, 0];
      }
      let w = -1, ui = 2;
      if (t >= T[4]) { // k4 : le tour complet, et le diagramme en même temps
        const a = T[4] + 0.15, b = E[4] + 0.4, f = D.borne((t - a) / (b - a), 0, 1);
        ui = D.lerp(2, 17, f);
        w = D.courbe(MAPD, ui, true);
        const [px, py] = ec(...D.circuitPoint(ui)); x = px; y = py; s = 0.62;
        r.diag = w; r.diag0 = 0;
        temp = tempDe(ui); etat = etatDe(ui); humeur = ui > 3.2 && ui < 6.8 ? "chaud" : "sourire";
      }
      /* k0 : la pastille R32 */
      opa(pR32, D.lisse((t - (T[0] + 0.3)) / 0.5) * (1 - D.lisse((t - (T[1] - 0.2)) / 0.4)));
      /* k1 : les organes s'allument à mesure qu'ils sont nommés (condenseur, évaporateur, compresseur, détendeur) */
      VIS.forEach(([nom, , fr]) => cir.surligne(nom, t > A(1, fr) - 0.2 && t < E[1] + 0.4));
      /* k2 : la flèche vers le diagramme */
      fen(flD, t, T[2] + 0.1, E[2] + 0.2, 0.45);
      /* k3 : les quatre côtés, un à un (bas →, droite ↑, haut ←, gauche ↓) */
      COTES.forEach(([nom, ], i) => {
        const a = A(3, 0.04 + 0.24 * i), b = A(3, 0.28 + 0.24 * i);
        if (t >= T[3] - 0.2 && t < T[4]) cir.surligne(nom, t > a - 0.1 && t < b + 0.45);
        else if (t >= T[4]) cir.surligne(nom, false);
        else if (t < T[1]) cir.surligne(nom, false);
        const p = surCroix[i];
        p.f(p.a[0], p.a[1], p.b[0], p.b[1], t >= T[3] ? D.lisse((t - a) / 0.5) * (t < T[4] ? 1 : 0) : 0);
        const q = SEG[i];
        pale[i](q[0], q[1], q[2], q[3], 1);
        vif[i](q[0], q[1], q[2], q[3], t >= T[3] ? D.lisse((t - a) / 0.5) : 0);
      });
      opa(schema, D.lisse((t - T[3] + 0.1) / 0.5)); opa(legende.parentNode, D.lisse((t - T[3] - 0.2) / 0.5)); opa(legende2.parentNode, D.lisse((t - T[3] - 0.2) / 0.5));
      if (t >= T[4]) { // les quatre flèches s'éteignent en k4 ; le point suit le cycle
        vif.forEach(f => f(0, 0, 0, 0, 0));
        pt.setAttribute("cx", f1(D.courbe([[0, RX1], [1, RX1], [4, RX0], [5, RX0], [7, RX1]], w, true)));
        pt.setAttribute("cy", f1(D.courbe([[0, RY1], [1, RY0], [4, RY0], [5, RY1], [7, RY1]], w, true)));
        opa(pt, 1);
      } else opa(pt, 0);
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, regard: regard });
      return Object.assign({ temp: temp, etat: etat, humeur: humeur }, r);
    };
  };

  /* =====================================================================
     CARTE — « Lire la carte » : les axes et la cloche, dans un mini-diagramme
     ===================================================================== */
  S.carte = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const X0 = 190, Y0 = 560, X1 = 940, YH = 300;      // origine, bout de l'axe h, bout de l'axe p
    /* la cloche : la vraie cloche du R32 (CoolProp, voyage-enthalpie/cloche.py), réduite au mini-diagramme */
    const CLOCHE = "M 330.0 560.0 L 335.0 552.1 L 339.9 544.1 L 345.1 536.2 L 350.4 528.3 L 355.9 520.3 L 361.5 512.4 L 367.3 504.5 L 373.2 496.5 L 379.4 488.6 L 385.6 480.7 L 392.1 472.7 L 398.8 464.8 L 405.7 456.8 L 412.8 448.9 L 420.2 441.0 L 427.8 433.0 L 435.8 425.1 L 443.9 417.2 L 452.5 409.2 L 461.4 401.3 L 470.8 393.4 L 480.6 385.4 L 491.0 377.5 L 501.9 369.6 L 513.7 361.6 L 526.4 353.7 L 540.3 345.8 L 556.2 337.8 L 575.1 329.9 L 583.5 327.0 L 590.3 325.0 L 596.0 323.6 L 600.7 322.6 L 604.8 321.8 L 608.3 321.3 L 611.4 320.9 L 614.2 320.7 L 616.6 320.5 L 618.9 320.4 L 620.8 320.3 L 622.7 320.2 L 624.5 320.1 L 626.0 320.1 L 627.5 320.1 L 628.8 320.0 L 630.1 320.0 L 631.2 320.0 L 632.3 320.0 L 633.2 320.0 L 634.1 320.0 L 634.9 320.0 L 635.5 320.0 L 636.0 320.0 L 639.5 320.0 L 642.6 320.0 L 643.3 320.0 L 643.9 320.0 L 644.7 320.0 L 645.4 320.0 L 646.4 320.0 L 647.5 320.0 L 648.7 320.0 L 650.1 320.0 L 651.7 320.1 L 653.3 320.1 L 655.1 320.1 L 657.1 320.2 L 659.4 320.3 L 661.9 320.4 L 664.7 320.5 L 667.8 320.7 L 671.2 320.9 L 675.0 321.3 L 679.3 321.8 L 684.2 322.6 L 689.6 323.6 L 695.7 325.0 L 702.6 327.0 L 710.3 329.9 L 725.3 337.8 L 735.6 345.8 L 743.2 353.7 L 749.0 361.6 L 753.7 369.6 L 757.6 377.5 L 760.6 385.4 L 763.0 393.4 L 764.9 401.3 L 766.4 409.2 L 767.7 417.2 L 768.6 425.1 L 769.2 433.0 L 769.6 441.0 L 769.9 448.9 L 770.0 456.8 L 769.9 464.8 L 769.6 472.7 L 769.4 480.7 L 768.9 488.6 L 768.3 496.5 L 767.8 504.5 L 767.2 512.4 L 766.4 520.3 L 765.7 528.3 L 764.9 536.2 L 764.0 544.1 L 763.1 552.1 L 762.3 560.0";
    const fond = D.el("path", { d: CLOCHE + " Z", fill: "#cfe3f6", opacity: 0 }, g);
    const dome = D.el("path", { d: CLOCHE, pathLength: 1, fill: "none", stroke: AIR_FROID, "stroke-width": 7, "stroke-linecap": "round", "stroke-dasharray": "1 1", "stroke-dashoffset": 1 }, g);
    /* k0 : l'axe horizontal */
    const axeH = fleche(g, ENCRE, 7), axeP = fleche(g, ENCRE, 7);
    const lH1 = lib(g, 205, 618, "h : énergie de 1 kg", { taille: 34 }), lH2 = lib(g, 205, 656, "(en kJ/kg)", { taille: 30, coul: "#3b4a5e", gras: false });
    const lP = lib(g, 0, 0, "p : pression absolue", { ancre: "middle", taille: 30 });
    groupe(lP).setAttribute("transform", "translate(132 430) rotate(-90)");
    /* k1 : « plus d'énergie » */
    const bande = D.el("g", { opacity: 0 }, g);
    D.el("polygon", { points: "215,236 760,236 760,222 810,260 760,298 760,284 215,284", fill: OR, stroke: "#8f2f10", "stroke-width": 3, "stroke-linejoin": "round" }, bande);
    D.texte(bande, 480, 272, "plus d'énergie", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff", "font-family": POL });
    const sac = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M -6 -22 L -10 -32 L 10 -32 L 6 -22 Z", fill: "#a8670a", stroke: "#6e3f06", "stroke-width": 2.5, "stroke-linejoin": "round" }, sac);
    D.el("circle", { cx: 0, cy: 0, r: 24, fill: "#f2b134", stroke: "#6e3f06", "stroke-width": 3 }, sac);
    D.el("polygon", { points: "3,-14 -9,3 -1,3 -5,15 9,-3 1,-3", fill: "#fff", stroke: "#6e3f06", "stroke-width": 1.5, "stroke-linejoin": "round" }, sac);
    /* k2 : le cylindre, le piston, le repère sur l'axe de pression */
    const cyl = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M 214 340 V 566 H 316 V 340", fill: "rgba(150,170,195,.18)", stroke: ENCRE, "stroke-width": 6, "stroke-linejoin": "round" }, cyl);
    const piston = D.el("g", {}, cyl);
    D.el("rect", { x: 220, y: 0, width: 90, height: 18, rx: 4, fill: "url(#vm-acier)", stroke: ENCRE, "stroke-width": 3 }, piston);
    D.el("rect", { x: 258, y: -54, width: 14, height: 54, fill: "url(#vm-acier)", stroke: ENCRE, "stroke-width": 3 }, piston);
    D.el("rect", { x: 236, y: -66, width: 58, height: 16, rx: 6, fill: ENCRE }, piston);
    const rep = D.el("polygon", { points: "0,0 -26,-14 -26,14", fill: OR, stroke: "#8f2f10", "stroke-width": 3, opacity: 0 }, g);
    /* k4-k5 : les zones */
    const zL = lib(g, 262, 478, "liquide", { ancre: "middle", taille: 40, coul: D.BLEU });
    const zV = lib(g, 895, 478, "vapeur", { ancre: "middle", taille: 40, coul: D.BLEU });
    const zM = lib(g, 560, 500, "liquide + vapeur", { ancre: "middle", taille: 38, coul: D.BLEU });
    const mila = D.heroine(g, { r: 30 });
    g.appendChild(sac); // le sac passe devant l'héroïne
    /* la croix en petit, dans le coin */
    const cir = D.circuit(g, 668, 582, 268, false);
    const petite = D.heroine(g, { r: 30 });
    return function (t) {
      /* k0 */
      axeH(X0, Y0, X1, Y0, D.lisse((t - A(0, 0.08)) / Math.max(0.5, (E[0] - A(0, 0.08)) * 0.55)));
      apres(groupe(lH1), t, A(0, 0.3), 0.5); apres(groupe(lH2), t, A(0, 0.72), 0.5);
      /* k1 : la bande « plus d'énergie », l'héroïne et son sac qui grossit */
      fen(bande, t, T[1] + 0.05, E[1] + 0.6, 0.5);
      const fm = D.borne((t - T[1]) / (E[1] - T[1]), 0, 1);
      let x = 250, y = 190, s = 0.8, ecrase = 0, etat = "liquide", humeur = "sourire", temp = 0.1;
      if (t >= T[1]) x = D.lerp(250, 760, D.lisse(fm));
      if (t >= T[2]) { // vers le cylindre
        const f = D.lisse((t - T[2]) / 0.9);
        x = D.lerp(760, 266, f); y = D.lerp(190, 516, f); s = D.lerp(0.8, 0.72, f);
      }
      const sc = D.courbe([[T[1], 0.35], [E[1], 1.35]], t, true);
      sac.setAttribute("transform", "translate(" + f1(x + 38 * s) + " " + f1(y + 6) + ") scale(" + f1(sc * s) + ")");
      opa(sac, t >= T[1] && t < T[2] + 0.3 ? D.lisse((t - T[1]) / 0.4) * (1 - D.lisse((t - T[2]) / 0.5)) : 0);
      /* k2 : l'axe de pression, le piston qui descend quand le repère monte */
      axeP(X0, Y0, X0, YH, D.lisse((t - A(2, 0.1)) / Math.max(0.5, (E[2] - A(2, 0.1)) * 0.5)));
      apres(groupe(lP), t, A(2, 0.3), 0.5);
      const fp = D.lisse((t - A(2, 0.45)) / (E[2] - A(2, 0.45)));
      fen(cyl, t, T[2] + 0.2, T[3] + 0.3, 0.5);
      piston.setAttribute("transform", "translate(0 " + f1(D.lerp(368, 452, fp)) + ")");
      ecrase = 0.72 * fp * (t < T[3] + 0.3 ? 1 : 0);
      rep.setAttribute("transform", "translate(" + (X0 - 2) + " " + f1(D.lerp(540, 345, fp)) + ")");
      fen(rep, t, A(2, 0.3), T[3] + 0.3, 0.4);
      if (t >= T[2] && t < T[3] + 0.3) humeur = fp > 0.2 ? "triste" : "sourire";
      /* k3 : la cloche se dessine ; l'héroïne sort du cylindre */
      const fd = D.lisse((t - A(3, 0.1)) / (E[3] - A(3, 0.1)));
      dome.setAttribute("stroke-dashoffset", f1(1 - fd).slice(0, 5));
      opa(fond, D.lisse((t - E[3]) / 0.6) * (t < T[5] ? 0.45 : 1) * 0.8);
      if (t >= T[3]) {
        const f = D.lisse((t - T[3] - 0.2) / 0.9);
        x = D.lerp(266, 262, f); y = D.lerp(516, 395, f); s = D.lerp(0.72, 1, f); ecrase = 0.72 * (1 - f) * (t < T[3] + 1.1 ? 1 : 0);
        humeur = f < 0.5 ? "triste" : "surprise";
      }
      /* k4 : « liquide » à gauche, « vapeur » à droite */
      if (t >= T[4]) {
        humeur = "sourire"; etat = "liquide"; temp = 0.1;
        const f = D.lisse((t - A(4, 0.5)) / 0.8);
        x = D.lerp(262, 885, f); y = 395 - Math.sin(Math.PI * f) * 60;
        if (f > 0.5) { etat = "vapeur"; temp = 0.3; }
      }
      apres(groupe(zL), t, A(4, 0.1), 0.5); apres(groupe(zV), t, A(4, 0.62), 0.5);
      /* k5 : sous la cloche */
      if (t >= T[5]) {
        const f = D.lisse((t - T[5] - 0.1) / 0.9);
        x = D.lerp(885, 520, f); y = D.lerp(395, 405, f) - Math.sin(Math.PI * f) * 50; etat = "bout"; temp = 0.08; humeur = "surprise";
        if (f < 0.5) { etat = "vapeur"; temp = 0.3; }
      }
      apres(groupe(zM), t, A(5, 0.3), 0.5);
      /* zone « liquide + vapeur » : l'héroïne ne cache pas son étiquette (elle est au-dessus) */
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: ecrase, regard: t < T[1] ? [1, 0] : [0, 0] });
      /* la croix en petit, la molécule à l'entrée de l'évaporateur (repère 14,5) */
      const [px, py] = cir.ecran(...D.circuitPoint(14.6));
      petite({ x: px, y: py, s: 0.34, t: t, temp: 0.08, etat: "bout", humeur: "sourire" });
      return { temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     EVAPORATEUR — gros plan : le symbole couché, le tube en coupe, la croix dans le coin
     ===================================================================== */
  S.evaporateur = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const CX = 300, CY = 330, SC = 9;                       // centre du symbole (au tube), échelle
    const TX0 = 40, TX1 = 560, YH = 292, YB = 368;         // la coupe : du côté entrée au côté sortie ; intérieur du tube
    const XS = 470;                                        // où le dernier liquide a disparu (début de la surchauffe)
    /* l'air chaud : des chevrons qui descendent entre les ailettes (rouge en haut, bleu en bas) */
    const air = D.el("g", { opacity: 0 }, g), CHEV = [];
    [-190, -90, 0, 90, 190].forEach((dx, i) => { for (let j = 0; j < 4; j++) CHEV.push({ x: CX + dx, ph: (j + (i % 2) * 0.5) / 4, m: D.chevron(air) }); });
    const lAir = lib(g, 60, 200, "air chaud de la pièce", { taille: 32, coul: ROUGE });
    /* le symbole de l'échangeur, couché : tube horizontal, ailettes, ventilateur (sous le tube) */
    symbole(g, "echangeur_a_air_eduscol.svg", [-22, -32, 44, 64], CX, CY, SC, -90, [10, 0]);
    /* ailettes redessinées par-dessus (aux places du symbole), le tube les traverse */
    const FINS = [-135, -45, 45, 135].map(dx => CX + dx);
    FINS.forEach(x => D.el("rect", { x: x - 6, y: CY - 68, width: 12, height: 136, rx: 3, fill: "#d5dce4", stroke: "#39424c", "stroke-width": 2.5 }, g));
    /* le tube en coupe : paroi de cuivre, intérieur clair */
    D.tube(g, TX0, YH - 10, TX1 - TX0, YB - YH + 20, "cuivre", false, "#f4f8fc");
    let niveauT = 0; // 0 → 1 : le liquide baisse de plus en plus vite vers la sortie (piloté par maj)
    const lq = D.liquide(g, { x0: TX0, x1: TX1, yh: YH, yb: YB, pas: 10, couleur: () => D.couleur(0.08, false),
      niveau: x => 0.5 * (1 - niveauT * D.borne((x - 60) / (XS - 60), 0, 1)) });
    /* la vapeur : de petites molécules séparées, de plus en plus nombreuses vers la sortie */
    const MOL = [], rnd = D.alea(17);
    for (let i = 0; i < 40; i++) MOL.push({ u: rnd(), r: rnd(), v: rnd(), m: D.mol(g) });
    /* la sonde de température (symbole) debout sur le tube de sortie ; le thermomètre à droite */
    const sonde = symbole(g, "sonde_temperature.svg", [-30, -14, 60, 40], 555, 230, 2.6, 90, [0, 0]);
    opa(sonde, 0);
    const TH_X = 915, Y5 = 425, Y10 = 255;
    const th = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: TH_X - 11, y: 215, width: 22, height: 230, rx: 11, fill: "#fff", stroke: ENCRE, "stroke-width": 4 }, th);
    D.el("circle", { cx: TH_X, cy: 462, r: 24, fill: "#fff", stroke: ENCRE, "stroke-width": 4 }, th);
    D.el("circle", { cx: TH_X, cy: 462, r: 17, fill: ROUGE }, th);
    const colonne = D.el("rect", { x: TH_X - 6, width: 12, fill: ROUGE }, th);
    [[Y5, "5"], [Y10, "10"]].forEach(([yy, tx]) => {
      D.el("line", { x1: TH_X - 24, y1: yy, x2: TH_X - 11, y2: yy, stroke: ENCRE, "stroke-width": 3 }, th);
      D.texte(th, TH_X - 30, yy + 10, tx, { "text-anchor": "end", "font-size": 30, "font-weight": 700, fill: ENCRE, "font-family": POL });
    });
    /* les valeurs fixes et la lecture */
    const lP = lib(g, 625, 232, "9,5 bar abs", { taille: 40, coul: D.BLEU });
    const lT5 = lib(g, 625, 296, "5 °C", { taille: 46, coul: AIR_FROID }), lT10 = lib(g, 625, 296, "10 °C", { taille: 46, coul: ROUGE });
    const pRien = D.pastille(g, 625, 380, "rien ne change", D.BLEU, 32);
    const lSur = lib(g, 625, 380, "surchauffe", { taille: 42, coul: OR });
    const trSur = D.trait(g, 612, 368, 562, 345, OR);
    const rond = D.el("g", { opacity: 0 }, g);
    D.el("circle", { cx: 588, cy: CY, r: 17, fill: "#fff", stroke: ENCRE, "stroke-width": 3.5 }, rond);
    D.texte(rond, 588, CY + 7, "1", { "text-anchor": "middle", "font-size": 22, "font-weight": 700, fill: ENCRE, "font-family": POL });
    const lPt = lib(g, 625, 450, "point 1", { taille: 42, coul: D.BLEU }), lPh = lib(g, 625, 498, "523 kJ/kg", { taille: 40, coul: ENCRE });
    const trPt = D.trait(g, 598, CY + 20, 640, 418, D.BLEU);
    /* flèches de chaleur : de l'air vers les ailettes, des ailettes vers le fluide */
    const chal = D.el("g", { opacity: 0 }, g), CH = [];
    FINS.forEach(x => CH.push({ x: x, y: CY - 70, a: 0, m: D.chaleur(chal) }));
    [FINS[0], FINS[3]].forEach(x => CH.push({ x: x, y: CY + 70, a: 180, m: D.chaleur(chal) }));
    /* la croix réduite, dans le coin ; l'héroïne y avance avec l'évaporateur */
    const cir = D.circuit(g, 668, 582, 268, false);
    cir.surligne("evaporateur", true);
    const petite = D.heroine(g, { r: 30 });
    const mila = D.heroine(g, { r: 30 });
    return function (t) {
      /* progression du liquide qui baisse (k2 → k3) */
      niveauT = D.lisse((t - A(2, 0.15)) / (E[2] + 0.8 - A(2, 0.15)));
      lq.maj(t);
      /* l'air chaud et la chaleur arrivent à la phrase 2 */
      fen(air, t, T[2] + 0.2, c.D, 0.6);
      CHEV.forEach(h => {
        const f = D.frac(h.ph + t * 0.16), y = 236 + f * 400;
        const k = D.lisse((y - 300) / 150), col = "rgb(" + [Math.round(D.lerp(192, 47, k)), Math.round(D.lerp(57, 111, k)), Math.round(D.lerp(43, 184, k))].join(",") + ")";
        const surFan = Math.abs(h.x - CX) < 120 ? 1 - D.fenetre(y, 392, 612, 26) : 1; // le ventilateur et le tube cachent le flux : il reprend en dessous
        h.m(h.x, y, 0, col, D.fenetre(f, 0, 1, 0.1) * surFan * (y > YH - 10 && y < YB + 10 ? 0 : 1));
      });
      apres(groupe(lAir), t, T[2] + 0.1, 0.5);
      apres(chal, t, A(2, 0.45), 0.5);
      CH.forEach((h, i) => h.m(h.x, h.y - (h.a === 0 ? 4 : -4) + Math.sin(t * 3 + i) * 3 * (h.a === 0 ? 1 : -1), h.a, 1));
      /* l'héroïne : elle flotte à gauche (k2), avance vers la droite (k3), sort de la cloche (k4) */
      const x = D.courbe([[0, 120], [A(3, 0.1), 120], [E[3], XS - 12], [A(4, 0.3), XS - 12], [E[4], 548], [c.D, 548]], t, true);
      const dehors = x > XS - 6;
      const etat = dehors ? "vapeur" : "bout", temp = dehors ? D.lerp(0.08, 0.2, D.borne((x - XS) / (548 - XS), 0, 1)) : 0.08;
      const y = dehors ? CY + Math.sin(t * 2) * 5 : Math.min(CY + 2, lq.surface(x, t) + 22) + Math.sin(t * 2.2) * 2;
      /* la vapeur */
      MOL.forEach(m => {
        const x0 = TX0 + 20 + D.frac(m.u + t * 0.03 * (0.6 + m.v)) * (TX1 - TX0 - 40);
        const vf = D.borne(0.1 + 0.9 * (x0 - 60) / (XS - 60), 0, 1);
        const ys = lq.surface(x0, t), haut = YH + 13, bas = Math.min(YB - 13, ys - 13);
        const ok = bas - haut > 8 && Math.abs(x0 - x) > 34;
        const yy = D.lerp(haut, Math.max(haut, bas), m.r);
        m.m(x0, yy, 0.1 + 0.1 * D.borne((x0 - XS) / 80, 0, 1), true, ok ? D.borne((vf - m.r * 0.9) * 8, 0, 1) * D.fenetre(x0, TX0 + 4, TX1 - 4, 20) : 0);
      });
      mila({ x: x, y: y, s: 0.7, t: t, temp: temp, etat: etat, humeur: "sourire", regard: [0.6, 0.2] });
      /* la croix : la molécule va du bas-gauche (repère 0) à la sortie de l'évaporateur (repère 2) */
      const idx = t < T[2] ? D.courbe([[0, 14.6], [T[2], 14.6], [T[2] + 0.5, 0.2]], t, true) : D.courbe([[120, 0.2], [XS - 12, 0.8], [548, 1.7]], x, true);
      const [px, py] = cir.ecran(...D.circuitPoint(idx));
      petite({ x: px, y: py, s: 0.34, t: t, temp: temp, etat: etat, humeur: "sourire" });
      /* les valeurs : 9,5 bar abs et 5 °C fixes (k2-k3), puis 10 °C */
      apres(groupe(lP), t, A(2, 0.5), 0.5);
      const th10 = D.lisse((t - A(4, 0.55)) / 0.5);
      opa(groupe(lT5), D.lisse((t - A(2, 0.6)) / 0.5) * (1 - th10)); opa(groupe(lT10), th10);
      fen(pRien, t, A(3, 0.15), T[4] - 0.1, 0.4);
      fen(groupe(lSur), t, A(4, 0.35), c.D + 1, 0.4); fen(trSur, t, A(4, 0.35), c.D + 1, 0.4);
      /* le thermomètre : le niveau monte de 5 à 10 pendant la surchauffe */
      apres(th, t, A(3, 0.3), 0.5); apres(sonde, t, A(3, 0.3), 0.5);
      const niv = D.lerp(Y5, Y10, D.borne((t - A(4, 0.3)) / (E[4] - A(4, 0.3)), 0, 1));
      colonne.setAttribute("y", f1(niv)); colonne.setAttribute("height", f1(462 - niv));
      /* le point 1 */
      apres(rond, t, T[5] + 0.1, 0.5); apres(groupe(lPt), t, T[5] + 0.2, 0.5); apres(groupe(lPh), t, T[5] + 0.5, 0.5); apres(trPt, t, T[5] + 0.2, 0.5);
      return { temp: temp, etat: etat, humeur: "sourire" };
    };
  };
})();

/* =====================================================================
   metier/scene-mesurer.js — « Ce qu'on mesure, ce qu'on prouve » : la scène
   des grandeurs du tableau, dessinée et animée pas à pas
   ---------------------------------------------------------------------
   Page : metier.html, en tête de la section « Ce qu'on mesure, ce qu'on prouve »
   (#preuve). Hôte : <figure class="scene-journee" data-scene-journee="mesurer">.
   Cadre, technicien, instruments et « ▶ Dérouler » : metier/scene-commun.js (même
   vitrine que le pilote « diagnostiquer une panne »). La scène suit le tableau de
   la page, ligne par ligne : « HP et BP : au manifold, sur les vannes de service,
   en bar — préciser absolu ou relatif » · « Sous-refroidissement : sortie de
   condenseur, 4 à 8 K » · « COP / EER : calculé, puissance utile / puissance
   absorbée ; COP en chaud, EER en froid ». Quatre étapes : HP et BP · absolu ou
   relatif · sous-refroidissement · COP et EER. La SURCHAUFFE n'est pas refaite :
   elle a sa scène, la première de la page (« Diagnostiquer une panne », #journee),
   vers laquelle la légende renvoie.

   REPRISE, en lecture : les manomètres BP (bague bleue) et HP (bague rouge) à
   couronne R-134a, le thermomètre à pince, les molécules de la vapeur : le pilote,
   via metier/scene-commun.js. Le corps du manifold (un bloc portant les deux
   manomètres et trois raccords bleu, jaune, rouge) est dessiné dans la scène : seul
   le symbole schématique du manifold existe en bibliothèque (il sert dans la scène
   « Intervenir »), et ici ce sont les vrais manomètres qu'on lit. La machine de
   l'étape 4 est le symbole du compresseur de la bibliothèque curée
   (packs/fluides/res/symboles/compresseur_general.svg).
   VALEURS : seulement celles de la page et du cours. HP 40 °C = 10,166 bar absolus
   = 9,15 bar au manomètre ; BP −10 °C = 2,006 bar absolus ; ligne liquide à 34 °C,
   donc 6 K de sous-refroidissement, plage 4 à 8 K : valeurs par défaut du module
   surchauffe-sous-refroidissement-interactif. Le manomètre affiche du relatif :
   on ajoute 1 bar (1,013) pour l'absolu des tables : l'exemple montré d'abord est
   9,2 → 10,2, qui écarte « on double » (règle du 26/09). COP / EER : le « cas
   fictif » du module bilan-thermique-performance-interactif (froid retiré 3,0 kW,
   électricité 1,0 kW, chaud fourni 4,0 kW : EER 3,0, COP 4,0), HabFluide ch. 17.
   RÈGLES TENUES : aucun texte sur un tracé (contrôle navigateur, par les pixels) ;
   textes du dessin ≥ 21 unités ; le relevé se lit sur l'instrument ; la ligne
   liquide pleine se voit liquide (nappe, reflets qui filent, pas une bulle) ;
   filigrane R9.
   ===================================================================== */
(function () {
  "use strict";
  const M = window.METIER_SCENE;
  if (!M) return;
  const { D, C, ACCENT, BLEU_BP, ROUGE_HP, FIGE, INSTRUMENTS, ecrire, voir, nb, passe, pose } = M;
  const SYM = "packs/fluides/res/symboles/";
  const lab = (g, x, y, s, at) => ecrire(g, x, y, s, 22, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));
  const mot = (g, x, y, s, at) => ecrire(g, x, y, s, 24, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));
  const gros = (g, x, y, s, at) => ecrire(g, x, y, s, 28, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));
  const PBP = 2.006 - INSTRUMENTS.PATM, PHP = 10.166 - INSTRUMENTS.PATM;   // relatifs : BP 0,99 bar (−10 °C) ; HP 9,15 bar (40 °C)
  const JAUNE = "#e2a72b", LIQUIDE = "#4f8fc9";

  /* ---------- étape 1 · HP et BP : les deux manomètres du manifold, en bar, relatif ---------- */
  function hpbp(g) {
    const XB = 432, XH = 676, YM = 150;
    [XB, XH].forEach(x => {
      D.el("rect", { x: x - 7, y: 246, width: 14, height: 30, fill: "url(#vm-acier-h)" }, g);                                  // la tige du manomètre
      D.el("rect", { x: x - 15, y: 252, width: 30, height: 13, rx: 3, fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, g);  // le raccord
    });
    // le corps du manifold : un bloc, deux vannes, trois raccords (bleu BP, jaune au milieu, rouge HP)
    D.el("rect", { x: 380, y: 270, width: 348, height: 40, rx: 9, fill: C.navy }, g);
    [[470, C.bleu], [638, C.rouge]].forEach(([x, c]) => { D.el("circle", { cx: x, cy: 290, r: 14, fill: c }, g); D.el("circle", { cx: x, cy: 290, r: 5, fill: C.papier }, g); });
    [[XB, C.bleu], [(XB + XH) / 2, JAUNE], [XH, C.rouge]].forEach(([x, c]) => {
      D.el("rect", { x: x - 8, y: 308, width: 16, height: 38, fill: c }, g);
      D.el("rect", { x: x - 12, y: 342, width: 24, height: 12, rx: 3, fill: C.navy }, g);
    });
    const bp = INSTRUMENTS.manometre(g, XB, YM, "BP"), hp = INSTRUMENTS.manometre(g, XH, YM, "HP");
    lab(g, (XB + XH) / 2, 392, "manifold", { "text-anchor": "middle" });
    const tBP = mot(g, XB, 392, "BP : 1,0 bar", { "text-anchor": "middle", fill: BLEU_BP, opacity: 0 });
    const tHP = mot(g, XH, 392, "HP : 9,2 bar", { "text-anchor": "middle", fill: ROUGE_HP, opacity: 0 });
    const rel = [mot(g, 930, 96, "en bar,", { "text-anchor": "end", fill: ACCENT, opacity: 0 }), mot(g, 930, 126, "relatif", { "text-anchor": "end", fill: ACCENT, opacity: 0 })];
    return t => {
      const f = FIGE ? 8 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      const n = passe(f, 0, 1.4) * sortie, lu = passe(f, 1.4, 1.8) * sortie;
      for (let k = 0; k < (FIGE ? 80 : 1); k++) { bp(n * PBP, lu); hp(n * PHP, lu); }
      voir(tBP, passe(f, 2.2, 2.7) * sortie); voir(tHP, passe(f, 3, 3.5) * sortie);
      rel.forEach((r, k) => voir(r, passe(f, 4 + k * 0.3, 4.5 + k * 0.3) * sortie));
    };
  }

  /* ---------- étape 2 · Absolu ou relatif : le manomètre affiche du relatif, les tables se lisent en absolu ---------- */
  function absolu(g) {
    const XH = 440, YM = 150;
    D.el("rect", { x: XH - 7, y: 246, width: 14, height: 30, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: XH - 15, y: 252, width: 30, height: 13, rx: 3, fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, g);
    D.el("rect", { x: XH - 20, y: 270, width: 40, height: 60, rx: 6, fill: "url(#vm-cuivre-h)" }, g);                          // la prise sur la ligne haute pression
    const hp = INSTRUMENTS.manometre(g, XH, YM, "HP");
    const X = 775;
    const t1 = lab(g, X, 88, "au manomètre : relatif", { "text-anchor": "middle", fill: ACCENT, opacity: 0 });
    const v1 = gros(g, X, 132, "9,2 bar", { "text-anchor": "middle", opacity: 0 });
    const fl = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: `M${X} 150 V206`, stroke: ACCENT, "stroke-width": 6, "stroke-linecap": "round" }, fl);
    D.el("polygon", { points: `${X - 11},202 ${X + 11},202 ${X},222`, fill: ACCENT }, fl);
    const plus = mot(g, X + 20, 190, "+ 1 bar", { fill: ACCENT, opacity: 0 });
    const t2 = lab(g, X, 262, "dans les tables : absolu", { "text-anchor": "middle", opacity: 0 });
    const v2 = gros(g, X, 306, "10,2 bar", { "text-anchor": "middle", fill: C.vert, opacity: 0 });
    const r1 = lab(g, X, 356, "on ajoute 1 bar,", { "text-anchor": "middle", opacity: 0 });
    const r2 = lab(g, X, 382, "on ne double pas", { "text-anchor": "middle", opacity: 0 });
    return t => {
      const f = FIGE ? 9 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      const n = passe(f, 0, 1.2) * sortie, lu = passe(f, 1.2, 1.6) * sortie;
      for (let k = 0; k < (FIGE ? 80 : 1); k++) hp(n * PHP, lu);
      voir(t1, passe(f, 2, 2.5) * sortie); voir(v1, passe(f, 2.4, 2.9) * sortie);
      voir(fl, passe(f, 4, 4.5) * sortie); voir(plus, passe(f, 4.2, 4.7) * sortie);
      voir(t2, passe(f, 5.4, 5.9) * sortie); voir(v2, passe(f, 5.8, 6.3) * sortie);
      voir(r1, passe(f, 7.2, 7.7) * sortie); voir(r2, passe(f, 7.5, 8) * sortie);
    };
  }

  /* ---------- étape 3 · Sous-refroidissement : la ligne liquide pleine, la couronne HP, la sonde pincée ---------- */
  const xS = K => 350 + K * (560 / 12);   // jauge de sous-refroidissement : 0 … 12 K
  function sousRefroidissement(g) {
    const XM = 440, YM = 140, TYR = 268;
    D.el("rect", { x: XM - 7, y: 238, width: 14, height: 30, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: XM - 15, y: 244, width: 30, height: 13, rx: 3, fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, g);
    D.tube(g, 322, TYR, 612, 40, "cuivre", false, "#f4f8fc");                                                                  // la ligne liquide, sortie de condenseur
    D.el("rect", { x: 322, y: TYR + 10, width: 612, height: 20, fill: LIQUIDE, opacity: 0.55 }, g);                             // pleine de liquide, sans une bulle
    const courant = D.courant(g, 326, 930, TYR + 10, TYR + 30, 9, 11);
    D.el("rect", { x: XM - 13, y: 260, width: 26, height: 14, rx: 3, fill: C.navy }, g);
    const mano = INSTRUMENTS.manometre(g, XM, YM, "HP");
    const thermo = INSTRUMENTS.thermometre(g, 640, 74, 800, TYR + 20);
    lab(g, 934, 226, "sortie de", { "text-anchor": "end" }); lab(g, 934, 250, "condenseur", { "text-anchor": "end" });
    const jauge = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: xS(0), y: 352, width: xS(12) - xS(0), height: 26, rx: 13, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, jauge);
    D.el("rect", { x: xS(4), y: 354, width: xS(8) - xS(4), height: 22, fill: C.vert, opacity: 0.4 }, jauge);
    lab(jauge, xS(6), 332, "plage usuelle : 4 à 8 K", { "text-anchor": "middle", fill: C.vert });
    [0, 4, 8, 12].forEach(K => { D.el("path", { d: `M${xS(K)} 378 V387`, stroke: C.navy, "stroke-width": 2 }, jauge); lab(jauge, xS(K), 412, K === 12 ? "12 K" : String(K), { "text-anchor": "middle" }); });
    const aiguille = D.el("line", { y1: 346, y2: 384, stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round", opacity: 0 }, g);
    const l1 = mot(g, 930, 56, "40 °C − 34 °C", { "text-anchor": "end", fill: C.vert, opacity: 0 });
    const l2 = mot(g, 930, 86, "= 6 K", { "text-anchor": "end", fill: C.vert, opacity: 0 });
    return t => {
      const f = FIGE ? 9 : t % 12, sortie = 1 - passe(f, 11.3, 11.8);
      courant(FIGE ? 0 : t, 40);
      const n = passe(f, 0, 1.2) * sortie, lu = passe(f, 1.2, 1.6) * sortie;
      for (let k = 0; k < (FIGE ? 80 : 1); k++) mano(n * PHP, lu);
      thermo(f >= 2.6 && sortie > 0.5 ? nb(34, 1) : "--,-");
      voir(jauge, passe(f, 3.3, 3.8) * sortie);
      const k = 6 * passe(f, 4.1, 6);
      aiguille.setAttribute("x1", xS(k).toFixed(1)); aiguille.setAttribute("x2", xS(k).toFixed(1));
      voir(aiguille, passe(f, 3.8, 4.1) * sortie);
      voir(l1, passe(f, 6.2, 6.7) * sortie); voir(l2, passe(f, 6.8, 7.3) * sortie);
    };
  }

  /* ---------- étape 4 · COP et EER : puissance utile ÷ puissance absorbée ---------- */
  function rendement(g) {
    mot(g, 626, 60, "puissance utile ÷ puissance absorbée", { "text-anchor": "middle" });
    const CX = 626, CY = 200;
    pose(g, SYM + "compresseur_general.svg", CX - 62, CY - 62, 124, 124);                                              // la machine : le symbole du compresseur
    const fleche = (x1, y1, x2, y2, c) => {
      const g1 = D.el("g", { opacity: 0 }, g), a = Math.atan2(y2 - y1, x2 - x1), px = -Math.sin(a), py = Math.cos(a);
      D.el("path", { d: `M${x1} ${y1} L${x2 - 16 * Math.cos(a)} ${y2 - 16 * Math.sin(a)}`, stroke: c, "stroke-width": 9, "stroke-linecap": "round" }, g1);
      D.el("polygon", { points: `${x2},${y2} ${x2 - 22 * Math.cos(a) + 13 * px},${y2 - 22 * Math.sin(a) + 13 * py} ${x2 - 22 * Math.cos(a) - 13 * px},${y2 - 22 * Math.sin(a) - 13 * py}`, fill: c }, g1);
      return g1;
    };
    const flux = [
      [fleche(396, CY, 556, CY, C.bleu), [[458, 154, "froid retiré", C.bleu], [476, 246, "3,0 kW", C.navy]]],
      [fleche(CX, 100, CX, 134, "#c9851a"), [[CX - 26, 112, "électricité", "#8a5a0e"], [CX - 26, 140, "1,0 kW", C.navy]]],
      [fleche(696, CY, 856, CY, C.rouge), [[776, 154, "chaud fourni", C.rouge], [776, 246, "4,0 kW", C.navy]]]
    ].map(([fl, textes]) => ({ fl: fl, t: textes.map(([x, y, s, c], k) => ecrire(g, x, y, s, k ? 24 : 22, { "text-anchor": x === CX - 26 ? "end" : "middle", "font-weight": 700, fill: c, opacity: 0 })) }));
    const cartes = [[480, "EER, en froid", "3,0 ÷ 1,0 = 3,0"], [772, "COP, en chaud", "4,0 ÷ 1,0 = 4,0"]].map(([x, titre, calcul]) => {
      const c = D.el("g", { opacity: 0 }, g);
      D.el("rect", { x: x - 140, y: 296, width: 280, height: 100, rx: 14, fill: "#ffffff", stroke: C.navy, "stroke-width": 3 }, c);
      lab(c, x, 334, titre, { "text-anchor": "middle" });
      gros(c, x, 378, calcul, { "text-anchor": "middle", fill: C.vert });
      return c;
    });
    return t => {
      const f = FIGE ? 9 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      flux.forEach((x, i) => { const a = passe(f, 0.8 + i * 1.1, 1.4 + i * 1.1) * sortie; voir(x.fl, a); x.t.forEach(e => voir(e, a)); });
      cartes.forEach((c, i) => voir(c, passe(f, 5 + i * 1.6, 5.6 + i * 1.6) * sortie));
    };
  }

  const ETAPES = [   // les phrases : espaces insécables avant « : ; » et entre un nombre et son unité
    { titre: "HP et BP", bulle: ["Quelles sont", "les pressions ?"], bras: -75, cycle: 11, dessiner: hpbp,
      dire: "Au manifold, deux manomètres : le bleu pour la basse pression (BP), le rouge pour la haute pression (HP). On lit en bar sur le cadran : ici 1,0 bar côté BP et 9,2 bar côté HP, au manomètre, donc en relatif. La couronne R-134a en tire la température du fluide : −10 °C côté BP, 40 °C côté HP." },
    { titre: "Absolu ou relatif", bulle: ["Absolu", "ou relatif ?"], bras: -60, cycle: 11, dessiner: absolu,
      dire: "Une pression en bar, il faut dire si elle est relative ou absolue. Le manomètre affiche du relatif : il marque 0 à l’air libre. Les tables se lisent en absolu : on ajoute 1 bar. 9,2 + 1 = 10,2 bar : on ajoute, on ne double pas." },
    { titre: "Sous-refroidissement", bulle: ["La ligne liquide", "est pleine ?"], bras: -70, cycle: 12, dessiner: sousRefroidissement,
      dire: "Le sous-refroidissement se prend en sortie de condenseur, sur une ligne liquide pleine, sans bulle. La couronne HP donne 40 °C, la sonde pincée sur le tube lit 34 °C : 40 − 34 = 6 K, dans la plage usuelle de 4 à 8 K." },
    { titre: "COP et EER", bulle: ["Et la", "performance ?"], bras: -55, cycle: 11, dessiner: rendement,
      dire: "Le COP et l’EER ne se mesurent pas : ils se calculent. Puissance utile ÷ puissance absorbée. En froid, l’utile est le froid retiré, c’est l’EER : 3,0 ÷ 1,0 = 3,0. En chaud, c’est la chaleur fournie, c’est le COP : 4,0 ÷ 1,0 = 4,0. Un exemple chiffré ; le résultat n’a pas d’unité." }
  ];

  const scene = M.monter({ nom: "mesurer", etapes: ETAPES,
    aria: "Un technicien frigoriste prend les mesures en quatre étapes : il lit la basse pression et la haute pression sur les deux manomètres du manifold, en bar, 1,0 bar et 9,2 bar au manomètre ; il distingue le relatif de l’absolu, on ajoute 1 bar, 9,2 devient 10,2 ; il mesure le sous-refroidissement sur une ligne liquide pleine, 40 °C moins 34 °C, soit 6 K, dans la plage de 4 à 8 K ; il calcule le COP et l’EER, la puissance utile divisée par la puissance absorbée, 3,0 et 4,0 dans l’exemple.",
    legende: "Scène de cette section : ce qu’on mesure, en quatre étapes. « ▶ Dérouler » joue toute la scène." });
  if (scene) {   // la surchauffe a sa scène, la première de la page : renvoi vers elle, dans la légende
    const legende = scene.bloc.querySelector(".legende:last-child");
    if (legende) legende.append(" La surchauffe, première ligne du tableau, se mesure à la sortie de l’évaporateur : ",
      Object.assign(document.createElement("a"), { href: "#journee", textContent: "voir la première scène de la journée" }), ".");
  }
})();

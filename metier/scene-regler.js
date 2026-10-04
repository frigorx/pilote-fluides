/* =====================================================================
   metier/scene-regler.js — « Une journée type » : la troisième scène,
   RÉGLER, dessinée et animée pas à pas
   ---------------------------------------------------------------------
   Page : metier.html, sous la puce « Régler » de la section « Une journée
   type » (#journee). Hôte : <figure class="scene-journee scene-suite"
   data-scene-journee="regler">. Cadre, technicien, instruments et « ▶ Dérouler » :
   metier/scene-commun.js (même vitrine que le pilote « diagnostiquer une panne »).
   La scène suit la fin de la phrase de la page : « Régler : thermostats,
   pressostats, détendeurs, régulateur électronique — et prouver le réglage à
   l'instrument. » Elle reprend la surchauffe du pilote (même jauge : 0 à 20 K,
   plage usuelle 5 à 10 K, aiguille rouge hors plage ; mêmes instruments) et RACONTE
   UN RÉGLAGE QU'ON NE FAIT PAS : la panne a pour cause un filtre déshydrateur
   colmaté, changé dans la scène « Intervenir ». Un réglage ne corrige ni un manque de
   fluide ni un filtre colmaté (module detendeur-interactif, chapitre G9) : on ne
   tourne PAS la vis du détendeur, on remesure, et la mesure prouve que la cause était
   le filtre. Quatre étapes : mesurer d'abord (le point de départ du diagnostic) · pas
   de vis · attendre · prouver à l'instrument. À gauche, le technicien pose la
   question de l'étape ; à droite, le plateau y répond. Avant et après se regardent
   au même endroit : étapes 1 et 4 ont la même mise en page.

   REPRISE, en lecture (aucun de ces fichiers n'est modifié) :
   · le manomètre BP à couronne R-134a, le thermomètre à pince, la jauge et le tube
     avec ses molécules de vapeur : metier/scene-journee.js (le pilote), via
     metier/scene-commun.js ;
   · le détendeur : symbole de la bibliothèque curée (packs/fluides/res/symboles/
     detendeur_thermo_ext.svg), jamais redessiné. La vis de réglage, vue de près
     (tête six pans, barrée), et l'horloge sont des pictogrammes de la scène : le
     symbole du détendeur ne montre pas sa vis.
   VALEURS : seulement celles du cours. Avant la réparation : −10 °C, +6 °C, 16 K (le
   pilote). Après : −10 °C, −3 °C, 7 K (valeurs par défaut du module
   surchauffe-sous-refroidissement-interactif), plage usuelle 5 à 10 K (tableau de la
   page). La durée de la stabilisation n'est jamais chiffrée (« à valider » dans la
   fiche M4) : l'horloge n'a pas de chiffres. Le BP reste à −10 °C avant et après,
   comme dans le module.
   RÈGLES TENUES : aucun texte sur un tracé (contrôle navigateur, par les pixels) ;
   textes du dessin ≥ 21 unités ; le relevé se lit sur l'instrument ; filigrane R9.
   ===================================================================== */
(function () {
  "use strict";
  const M = window.METIER_SCENE;
  if (!M) return;
  const { D, C, ACCENT, FIGE, INSTRUMENTS, ecrire, voir, nb, passe, pose } = M;
  const SYM = "packs/fluides/res/symboles/";
  const lab = (g, x, y, s, at) => ecrire(g, x, y, s, 22, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));
  const mot = (g, x, y, s, at) => ecrire(g, x, y, s, 24, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));

  /* ---------- la lecture : manomètre BP, thermomètre pincé, tube, jauge de surchauffe (étapes 1 et 4, même mise en page) ---------- */
  const XM = 440, YM = 140, TYR = 268, PBP = 2.006 - INSTRUMENTS.PATM;   // le fluide bout à −10 °C : 2,006 bar absolus, 0,99 bar au manomètre
  const xK = K => 350 + K * 28;                                          // jauge de surchauffe : 0 … 20 K
  function lecture(g, apres) {
    D.el("rect", { x: XM - 7, y: 238, width: 14, height: 30, fill: "url(#vm-acier-h)" }, g);                                   // la tige du manomètre
    D.el("rect", { x: XM - 15, y: 244, width: 30, height: 13, rx: 3, fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, g); // le raccord
    D.tube(g, 322, TYR, 612, 40, "cuivre", false, "#f4f8fc");                                                                  // le tube, sortie d'évaporateur
    D.el("rect", { x: XM - 13, y: 260, width: 26, height: 14, rx: 3, fill: C.navy }, g);                                       // la prise de pression
    const KM = 0.5, mols = D.el("g", { transform: `scale(${KM})` }, g), r = D.alea(23), MOL = [];                              // la vapeur file vers le compresseur
    for (let i = 0; i < 16; i++) MOL.push({ s: r(), v: r(), maj: D.mol(mols) });
    const flot = t => MOL.forEach(m => { const x = 330 + D.frac(m.s + t * 46 / 596) * 596; m.maj(x / KM, (282 + m.v * 10) / KM, 0.3, true, D.borne(Math.min(x - 322, 934 - x) / 24, 0, 1)); });
    const mano = INSTRUMENTS.manometre(g, XM, YM, "BP");
    const thermo = INSTRUMENTS.thermometre(g, 560, 74, 800, TYR + 20);                                                           // près du manomètre : la place de droite sert aux lignes de résultat
    // la jauge de surchauffe (celle du pilote) : la plage usuelle 5 à 10 K, puis l'aiguille de la mesure
    const jauge = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: xK(0), y: 352, width: xK(20) - xK(0), height: 26, rx: 13, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, jauge);
    D.el("rect", { x: xK(5), y: 354, width: xK(10) - xK(5), height: 22, fill: C.vert, opacity: 0.4 }, jauge);
    lab(jauge, (xK(5) + xK(10)) / 2, 332, "plage usuelle : 5 à 10 K", { "text-anchor": "middle", fill: C.vert });
    [0, 5, 10, 15, 20].forEach(K => {
      D.el("path", { d: `M${xK(K)} 378 V387`, stroke: C.navy, "stroke-width": 2 }, jauge);
      lab(jauge, xK(K), 412, K === 20 ? "20 K" : String(K), { "text-anchor": "middle" });
    });
    const aiguille = D.el("line", { y1: 346, y2: 384, stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round", opacity: 0 }, g);
    const couleur = apres ? C.vert : C.rouge;
    const quand = mot(g, 930, 56, apres ? "après la réparation" : "avant la réparation", { "text-anchor": "end", fill: couleur, opacity: 0 });
    const valeur = mot(g, 930, 86, apres ? "surchauffe : 7 K" : "surchauffe : 16 K", { "text-anchor": "end", fill: couleur, opacity: 0 });
    const intact = apres ? mot(g, 930, 116, "détendeur non touché", { "text-anchor": "end", fill: couleur, opacity: 0 }) : null;
    const tube = apres ? -3 : 6, K = apres ? 7 : 16;
    return t => {
      const f = FIGE ? 9 : t % 12, sortie = 1 - passe(f, 11.3, 11.8);
      flot(FIGE ? 0 : t);
      const n = passe(f, 0, 1.2) * sortie, lu = passe(f, 1.2, 1.6) * sortie;
      for (let k = 0; k < (FIGE ? 80 : 1); k++) mano(n * PBP, lu);   // l'aiguille monte (figé : directement à sa valeur)
      thermo(f >= 2.6 && sortie > 0.5 ? nb(tube, 1) : "--,-");
      voir(quand, passe(f, 0.4, 0.9) * sortie);
      voir(jauge, passe(f, 3.3, 3.8) * sortie);
      const k = apres ? D.lerp(16, 7, passe(f, 4.4, 6.6)) : K * passe(f, 4.1, 6);
      aiguille.setAttribute("x1", xK(k).toFixed(1)); aiguille.setAttribute("x2", xK(k).toFixed(1));
      aiguille.setAttribute("stroke", k > 10 ? C.rouge : C.navy);
      voir(aiguille, passe(f, 3.8, 4.1) * sortie);
      voir(valeur, passe(f, 6.8, 7.3) * sortie);
      if (intact) voir(intact, passe(f, 7.8, 8.3) * sortie);
    };
  }

  /* ---------- étape 2 · Pas de vis : un réglage ne corrige pas un filtre colmaté ---------- */
  function hexagone(parent, r, at) {
    const pts = Array.from({ length: 6 }, (_, i) => [r * Math.cos(i * Math.PI / 3), r * Math.sin(i * Math.PI / 3)].map(v => v.toFixed(1)).join(",")).join(" ");
    return D.el("polygon", Object.assign({ points: pts }, at), parent);
  }
  function vis(g) {
    pose(g, SYM + "detendeur_thermo_ext.svg", 335, 55, 250, 250);                                    // le détendeur : symbole de la bibliothèque (tête à gauche, vanne en bas)
    lab(g, 454, 322, "détendeur", { "text-anchor": "middle" });
    D.el("path", { d: "M514 236 L656 206", stroke: C.navy, "stroke-width": 2.5, "stroke-dasharray": "3 7", "stroke-linecap": "round", fill: "none" }, g);   // la loupe
    const loupe = D.el("g", { opacity: 0 }, g);
    D.el("circle", { cx: 760, cy: 190, r: 105, fill: C.papier, stroke: C.navy, "stroke-width": 4 }, loupe);
    const tete = D.el("g", { transform: "translate(760 190)" }, loupe);
    hexagone(tete, 46, { fill: "#cfd6de", stroke: C.navy, "stroke-width": 4, "stroke-linejoin": "round" });
    hexagone(tete, 20, { fill: "#4c5a6a" });
    D.el("path", { d: "M0 0 V-46", stroke: ACCENT, "stroke-width": 6, "stroke-linecap": "round" }, tete);                             // le repère de la tête : elle ne bouge pas
    const interdit = D.el("g", { opacity: 0 }, g);                                                                                    // la vis est barrée : on n'y touche pas
    D.el("circle", { cx: 760, cy: 190, r: 92, fill: "none", stroke: C.rouge, "stroke-width": 11 }, interdit);
    D.el("path", { d: "M695 125 L825 255", stroke: C.rouge, "stroke-width": 11, "stroke-linecap": "round" }, interdit);
    lab(g, 760, 338, "vis de réglage", { "text-anchor": "middle" });
    const non = mot(g, 760, 368, "on n’y touche pas", { "text-anchor": "middle", fill: C.rouge, opacity: 0 });
    const note = lab(g, 626, 418, "la vis ne corrige pas un filtre colmaté", { "text-anchor": "middle", opacity: 0 });
    return t => {
      const f = FIGE ? 8 : t % 10, sortie = 1 - passe(f, 9.3, 9.8);
      voir(loupe, passe(f, 0.8, 1.4) * sortie);
      voir(interdit, passe(f, 2.2, 2.8) * sortie);
      voir(non, passe(f, 3, 3.5) * sortie); voir(note, passe(f, 5, 5.6) * sortie);
    };
  }

  /* ---------- étape 3 · Attendre : le régime se stabilise avant de relire ---------- */
  function attente(g) {
    const cx = 440, cy = 190, R = 100;
    D.el("circle", { cx: cx, cy: cy, r: R, fill: C.papier, stroke: C.navy, "stroke-width": 5 }, g);
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6, long = i % 3 === 0, r1 = R - 8, r2 = R - (long ? 24 : 15);
      D.el("line", { x1: (cx + r1 * Math.sin(a)).toFixed(1), y1: (cy - r1 * Math.cos(a)).toFixed(1), x2: (cx + r2 * Math.sin(a)).toFixed(1), y2: (cy - r2 * Math.cos(a)).toFixed(1), stroke: C.navy, "stroke-width": long ? 5 : 3, "stroke-linecap": "round" }, g);
    }
    const heure = D.el("line", { x1: cx, y1: cy, x2: cx, y2: cy - 52, stroke: C.navy, "stroke-width": 8, "stroke-linecap": "round" }, g);
    const minute = D.el("line", { x1: cx, y1: cy, x2: cx, y2: cy - 76, stroke: ACCENT, "stroke-width": 6, "stroke-linecap": "round" }, g);
    D.el("circle", { cx: cx, cy: cy, r: 9, fill: C.navy }, g);
    mot(g, cx, 340, "on laisse stabiliser", { "text-anchor": "middle" });
    const lignes = ["régime durable", "charge thermique connue", "temps d’attente respecté"].map((s, k) => {
      const y = 120 + k * 62, ligne = D.el("g", { opacity: 0 }, g);
      D.el("circle", { cx: 620, cy: y - 8, r: 17, fill: C.vert }, ligne);
      D.el("path", { d: `M611 ${y - 8} l7 8 l13 -17`, fill: "none", stroke: C.papier, "stroke-width": 4.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, ligne);
      lab(ligne, 650, y, s, { fill: C.navy });
      return ligne;
    });
    const fin = mot(g, 626, 418, "alors seulement, on relit", { "text-anchor": "middle", fill: C.vert, opacity: 0 });
    return t => {
      const f = FIGE ? 9 : t % 11, sortie = 1 - passe(f, 10.3, 10.8);
      const tours = FIGE ? 0 : f * 0.5;
      minute.setAttribute("transform", `rotate(${(360 * tours).toFixed(1)} ${cx} ${cy})`);
      heure.setAttribute("transform", `rotate(${(30 * tours + 20).toFixed(1)} ${cx} ${cy})`);
      lignes.forEach((l, k) => voir(l, passe(f, 1.6 + k * 2, 2.2 + k * 2) * sortie));
      voir(fin, passe(f, 7.8, 8.4) * sortie);
    };
  }

  /* ---------- les quatre étapes ---------- */
  const ETAPES = [   // les phrases : espaces insécables avant « : ; » et entre un nombre et son unité
    { titre: "Mesurer d’abord", bulle: ["Où en est la", "surchauffe ?"], bras: -70, cycle: 11, dessiner: g => lecture(g, false),
      dire: "On repart de la mesure du diagnostic : le manomètre BP donne −10 °C sur sa couronne R-134a, le thermomètre pincé sur le tube lit +6 °C. La surchauffe valait 16 K, hors de la plage usuelle de 5 à 10 K : l’évaporateur était mal alimenté." },
    { titre: "Pas de vis", bulle: ["Je tourne", "la vis ?"], bras: -60, cycle: 10, dessiner: vis,
      dire: "Non : on ne tourne pas la vis du détendeur. Un réglage ne corrige ni un manque de fluide, ni un filtre colmaté. La cause était le filtre, il est changé : le détendeur n’a rien à rattraper." },
    { titre: "Attendre", bulle: ["J’attends que", "ça se stabilise."], bras: -40, cycle: 11, dessiner: attente,
      dire: "Le filtre est changé, le fluide remis : on remet en route et on attend. L’installation doit se stabiliser avant de relire. Mesurer trop tôt, ce serait mesurer pour rien." },
    { titre: "Prouver à l’instrument", bulle: ["Que dit", "l’instrument ?"], bras: -70, cycle: 12, dessiner: g => lecture(g, true),
      dire: "On relit : le manomètre BP donne −10 °C sur sa couronne, le thermomètre pincé sur le tube lit −3 °C. La surchauffe vaut 7 K : elle est revenue d’elle-même dans la plage de 5 à 10 K, sans toucher au détendeur. La mesure le prouve : la cause était le filtre." }
  ];

  M.monter({ nom: "regler", etapes: ETAPES,
    aria: "Un technicien frigoriste vérifie en quatre étapes qu’il n’y a rien à régler : il repart de la mesure du diagnostic, le manomètre BP donne −10 °C et le thermomètre à pince +6 °C, soit 16 K de surchauffe, hors de la plage usuelle de 5 à 10 K ; il ne tourne pas la vis du détendeur, car un réglage ne corrige pas un filtre colmaté, cause de la panne, qui vient d’être changé ; il attend que l’installation se stabilise ; il relit, le thermomètre donne −3 °C : la surchauffe vaut 7 K, revenue d’elle-même dans la plage, ce qui prouve que la cause était le filtre.",
    legende: "Troisième scène de la journée : régler, en quatre étapes. « ▶ Dérouler » joue toute la scène." });
})();

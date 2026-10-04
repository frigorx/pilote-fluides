/* =====================================================================
   metier/scene-intervenir.js — « Une journée type » : la deuxième scène,
   INTERVENIR SUR LE CIRCUIT, dessinée et animée pas à pas
   ---------------------------------------------------------------------
   Page : metier.html, sous la puce « Intervenir » de la section « Une journée
   type » (#journee). Hôte : <figure class="scene-journee scene-suite"
   data-scene-journee="intervenir">. Cadre, technicien, instruments et « ▶ Dérouler » :
   metier/scene-commun.js (même vitrine que le pilote « diagnostiquer une panne »).
   La scène suit la phrase de la page, dans son ordre : « manifold, récupération
   du fluide, brasage, tirage au vide, charge à la balance. Le geste propre,
   dans l'ordre. » Cinq étapes ; le technicien (à gauche) pose la question de
   l'étape, le plateau (à droite) y répond.
   RÉCIT : la panne du pilote (16 K, évaporateur mal alimenté) a pour cause un FILTRE
   DÉSHYDRATEUR COLMATÉ. Le composant brasé à l'étape 3 est ce filtre : l'ancien sort, le
   neuf entre, brasé sous azote sec (le module detendeur-interactif et le chapitre G9 :
   un filtre saturé restreint le débit de liquide). Les 2,3 kg récupérés retournent dans
   LEUR machine (règle validée par F. Henninot le 20/07 : on remet dans une machine le
   fluide qu'on vient d'en tirer, sans retraitement ; tout complément vient d'une bouteille
   neuve) : la légende de l'étape 5 le dit.

   REPRISE, en lecture (aucun de ces fichiers n'est modifié) :
   · le manifold, les vannes de service, la pompe à vide, le vacuomètre et leur
     montage : packs/fluides/res/chaine-intervention-interactive/scene-geste.js
     (vanne fermée noircie sur sa propre forme, flexibles bleu / rouge / jaune,
     molécules qui filent, eau restée dans la ligne qui bout) ;
   · SYMBOLES, jamais redessinés : manifold et vannes de service = bibliothèque
     curée (packs/fluides/res/symboles/) ; groupe de récupération, bouteille,
     pompe à vide, vacuomètre = QElectroTech (metier/symboles/, voir SOURCES.txt).
     Dessinés dans la scène faute de symbole : la balance (modèle : planche
     pesee-charge.svg du pack), le chalumeau et sa flamme (modèle : planche
     balayage-azote.svg). Le filtre déshydrateur est le dessin de F. Henninot
     packs/fluides/res/filtre-deshydrateur-pedagogique/assets/svg/filtre-hermetique.svg,
     recopié sans ses raccords (le tube de la scène en tient lieu) ; le filtre colmaté
     n'est que ce dessin teinté de saleté.
   VALEURS : seulement celles du cours. Pesée 12,0 kg → 14,3 kg, soit 2,3 kg
   (chapitre G5, question 3 ; module recuperation-fluide-interactive). La même
   bouteille redescend de 14,3 à 12,0 kg à la charge : le fluide récupéré est
   remis dans la même machine (HabFluide ch. 15 ; station Traçabilité, écran 5).
   Le brasage se fait sous balayage d'azote sec, circuit vidé, récupéré et inerté
   (chapitre G10). Aucune valeur de vide, de durée ni de pression : la notice du
   constructeur fait foi (le texte le dit). Le niveau maxi de la bouteille est
   marqué sans chiffre (« jamais pleine », planche recuperation.svg).
   RÈGLES TENUES : aucun texte sur un tracé (contrôle navigateur, par les pixels) ;
   textes du dessin ≥ 21 unités (dessin de 940 unités affiché à 878 px à 1 280 px) ;
   le liquide se voit liquide (nappe qui monte dans la bouteille, eau qui bout dans
   la ligne), la vapeur en molécules qui filent ; filigrane R9 derrière tout.
   ===================================================================== */
(function () {
  "use strict";
  const M = window.METIER_SCENE;
  if (!M) return;
  const { D, C, ACCENT, BLEU_BP, ROUGE_HP, FIGE, INSTRUMENTS, ecrire, voir, nb, passe, pose } = M;
  const SYM = "packs/fluides/res/symboles/", LOC = "metier/symboles/";
  const AIR_FROID = "#5f86ad", AIR_CHAUD = "#e07a3f", LIQUIDE = "#4f8fc9", JAUNE = "#e2a72b";
  const lab = (g, x, y, s, at) => ecrire(g, x, y, s, 22, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));   // une étiquette
  const mot = (g, x, y, s, at) => ecrire(g, x, y, s, 24, Object.assign({ "font-weight": 700, fill: C.navy }, at || {}));  // un message
  const sol = g => D.el("path", { d: "M318 410 H930", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, g);

  /* ---------- les pièces (reprises de scene-geste.js) ---------- */
  const VANNES = { // triangles de la vanne fermée, dans le repère de chaque symbole
    mB: ["-13,-3 -13,4 -9,0.5", "-5,-3 -5,4 -9,0.5"], mA: ["4.7,-3 4.7,4 8.7,0.5", "12.7,-3 12.7,4 8.7,0.5"],
    s: ["-10,-5 -10,5 0,0", "10,-5 10,5 0,0"] };
  function noircir(parent, cle) { // la vanne fermée, noircie sur sa propre forme (opacité 0 = ouverte, 1 = fermée)
    const g = D.el("g", { opacity: 0 }, parent);
    VANNES[cle].forEach(pts => D.el("polygon", { points: pts, fill: C.navy }, g));
    return g;
  }
  function flexible(parent, d, couleur) { // un flexible : gaine de couleur, âme claire ; pathLength pour le raccorder pas à pas
    const g = D.el("g", {}, parent);
    D.el("path", { d: d, fill: "none", stroke: couleur, "stroke-width": 11, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "100 100" }, g);
    D.el("path", { d: d, fill: "none", stroke: "#f4f8fc", "stroke-width": 4.5, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "100 100" }, g);
    return v => g.querySelectorAll("path").forEach(p => p.setAttribute("stroke-dashoffset", (100 * (1 - v)).toFixed(1)));
  }
  function flux(parent, d, couleur) { // la vapeur qui passe : des molécules séparées qui filent le long du chemin
    return D.el("path", { d: d, fill: "none", stroke: couleur, "stroke-width": 7, "stroke-linecap": "round", "stroke-dasharray": "0.1 15", opacity: 0 }, parent);
  }
  const marche = (p, t, vit, v) => { p.setAttribute("opacity", (0.95 * v).toFixed(2)); p.setAttribute("stroke-dashoffset", (-t * vit).toFixed(1)); };
  function fleche(parent, r, horaire) { // le sens du geste autour de la pièce (centrée en 0 0) : à droite on ferme, à gauche on ouvre
    const p = a => [r * Math.cos(a * Math.PI / 180), r * Math.sin(a * Math.PI / 180)];
    const [a0, a1] = horaire ? [200, 340] : [340, 200], q0 = p(a0), q1 = p(a1), dir = (a1 + (horaire ? 90 : -90)) * Math.PI / 180;
    const g = D.el("g", { opacity: 0 }, parent), ux = Math.cos(dir), uy = Math.sin(dir);
    D.el("path", { d: `M${q0[0].toFixed(1)} ${q0[1].toFixed(1)} A${r} ${r} 0 0 ${horaire ? 1 : 0} ${q1[0].toFixed(1)} ${q1[1].toFixed(1)}`, fill: "none", stroke: ACCENT, "stroke-width": 4.5, "stroke-linecap": "round" }, g);
    const pointe = [[q1[0] + ux * 9, q1[1] + uy * 9], [q1[0] - uy * 7 - ux * 3, q1[1] + ux * 7 - uy * 3], [q1[0] + uy * 7 - ux * 3, q1[1] - ux * 7 - uy * 3]];
    D.el("polygon", { points: pointe.map(q => q.map(v => v.toFixed(1)).join(",")).join(" "), fill: ACCENT }, g);
    return g;
  }
  /* la pièce qui agit s'allume : un anneau et la flèche du geste, posés sur le cadre [x, y, l, h] */
  function geste(parent) {
    const ring = D.el("rect", { rx: 9, fill: "none", stroke: ACCENT, "stroke-width": 4, opacity: 0 }, parent);
    const ferme = fleche(parent, 26, true), ouvre = fleche(parent, 26, false);
    return (cadre, sens, v) => {
      [["x", cadre[0]], ["y", cadre[1]], ["width", cadre[2]], ["height", cadre[3]]].forEach(([k, x]) => ring.setAttribute(k, x.toFixed(1)));
      [ferme, ouvre].forEach(a => a.setAttribute("transform", `translate(${(cadre[0] + cadre[2] / 2).toFixed(1)} ${(cadre[1] + cadre[3] / 2 - 4).toFixed(1)})`));
      voir(ring, v); voir(ferme, sens > 0 ? v : 0); voir(ouvre, sens < 0 ? v : 0);
    };
  }

  /* le manifold : le symbole de la bibliothèque, ses vannes noircissables, ses trois raccords (repère 50 × 40, centre cx cy, échelle s) */
  function manifold(parent, cx, cy, s) {
    const g = D.el("g", { transform: `translate(${cx} ${cy}) scale(${s})` }, parent);
    pose(g, SYM + "manometres.svg", -24, -25, 50, 40);
    const pt = (x, y) => [cx + x * s, cy + y * s];
    return { noir: { mB: noircir(g, "mB"), mA: noircir(g, "mA") }, bp: pt(-15, 8), c: pt(0, 8), hp: pt(16, 8), corps: pt(0, 0), B: pt(-15, -14.5), A: pt(16, -14.5),
      cadre: { mB: [cx - 14.3 * s, cy - 7.6 * s, 10.7 * s, 13.1 * s], mA: [cx + 3.3 * s, cy - 7.6 * s, 10.7 * s, 13.1 * s] } };
  }
  /* une vanne de service debout sur son piquage (centre x VY, échelle VS ; son haut : VT) */
  const TY = 335, VS = 1.6, VY = 268, VT = VY - 20 * VS - 2;
  function vanneService(parent, x) {
    D.el("rect", { x: x - 8, y: VY + 20 * VS - 2, width: 16, height: TY - (VY + 20 * VS) + 4, fill: "url(#vm-cuivre-h)" }, parent);
    const v = D.el("g", { transform: `translate(${x} ${VY}) rotate(90) scale(${VS})` }, parent);
    pose(v, SYM + "vanne_isolement.svg", -19, -10, 40, 20);
    return noircir(v, "s");
  }

  /* la bouteille sur sa balance (symbole QElectroTech + nappe + plateau + afficheur) : axe BX ; corps y 280 → 391 ; niveau maxi à 80 % */
  const BX = 790, BS = 3.2, BY0 = 200, BHAUT = 280, BBAS = 391;
  function bouteilleSurBalance(parent, depart) {
    const niveau = { v: 0 };
    const nappe = D.liquide(D.el("g", {}, parent), { x0: BX - 25, x1: BX + 25, yh: BHAUT, yb: BBAS, niveau: () => niveau.v, couleur: () => LIQUIDE, opacite: 0.88, pas: 5 });
    pose(parent, LOC + "botella-refrig.svg", BX - 14 * BS, BY0, 28 * BS, 68 * BS, true);
    D.el("path", { d: `M${BX - 34} ${BBAS - 0.8 * (BBAS - BHAUT)} H${BX + 34}`, stroke: C.rouge, "stroke-width": 3, "stroke-dasharray": "7 6", fill: "none" }, parent);
    D.el("rect", { x: 738, y: 392, width: 192, height: 18, rx: 5, fill: C.navy }, parent);
    D.el("rect", { x: 746, y: 396, width: 176, height: 4, rx: 2, fill: "#84b7ec" }, parent);
    D.el("rect", { x: 822, y: 326, width: 104, height: 66, rx: 9, fill: C.navy }, parent);
    D.el("rect", { x: 828, y: 332, width: 92, height: 38, rx: 5, fill: INSTRUMENTS.lcd, stroke: "#0f2440", "stroke-width": 2 }, parent);
    const val = ecrire(parent, 893, 362, nb(depart, 1), 24, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
    ecrire(parent, 916, 362, "kg", 21, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
    [[846, "#84b7ec"], [875, "#e07a3f"], [904, "#fdfdfb"]].forEach(([x, f]) => D.el("circle", { cx: x, cy: 381, r: 6, fill: f }, parent));
    return (masse, nv, t) => { val.textContent = nb(masse, 1); niveau.v = nv; nappe.maj(t); };
  }

  /* ===== LES CINQ ÉTAPES (plateau x 318-935, y 30-438) ===== */

  /* ---------- étape 1 · Manifold : on ferme les vannes, puis on raccorde ---------- */
  function etapeManifold(g) {
    sol(g);
    D.tube(g, 318, TY, 617, 40, "cuivre", false, "#f4f8fc");
    const m = manifold(g, 585, 155, 3.8);
    vanneService(g, 435); vanneService(g, 735);
    const fl = [flexible(g, `M${m.bp[0]} ${m.bp[1]} C${m.bp[0]} 228 435 195 435 ${VT}`, C.bleu),
      flexible(g, `M${m.hp[0]} ${m.hp[1]} C${m.hp[0]} 228 735 195 735 ${VT}`, C.rouge),
      flexible(g, `M${m.c[0]} ${m.c[1]} V300`, JAUNE)];
    D.el("rect", { x: m.c[0] - 8, y: 298, width: 16, height: 13, rx: 3, fill: C.navy }, g);   // le jaune attend : son bout est bouché
    lab(g, 585, 66, "manifold", { "text-anchor": "middle" });
    lab(g, m.B[0] - 32, m.B[1] + 8, "BP", { "text-anchor": "end", fill: BLEU_BP });
    lab(g, m.A[0] + 32, m.A[1] + 8, "HP", { fill: ROUGE_HP });
    lab(g, 762, 262, "vannes de"); lab(g, 762, 286, "service");
    const agit = geste(g);
    const t1 = mot(g, 626, 402, "on ferme les vannes", { "text-anchor": "middle", opacity: 0 });
    const t2 = mot(g, 626, 402, "vannes fermées : on raccorde", { "text-anchor": "middle", fill: C.vert, opacity: 0 });
    return t => {
      const f = FIGE ? 8 : t % 10, sortie = 1 - passe(f, 9.3, 9.8);
      m.noir.mB.setAttribute("opacity", (passe(f, 0.8, 1.8) * sortie).toFixed(2)); m.noir.mA.setAttribute("opacity", (passe(f, 2.4, 3.4) * sortie).toFixed(2));   // 0 = ouverte, 1 = fermée
      if (FIGE) agit(m.cadre.mB, 1, 0);
      else if (f < 2.2) agit(m.cadre.mB, 1, D.fenetre(f, 0.5, 2.0, 0.3) * sortie);
      else agit(m.cadre.mA, 1, D.fenetre(f, 2.2, 3.6, 0.3) * sortie);
      fl[0](passe(f, 4.2, 5.4) * sortie); fl[1](passe(f, 5.6, 6.8) * sortie); fl[2](1);
      voir(t1, passe(f, 0.4, 0.8) * (1 - passe(f, 3.4, 3.8)) * sortie);
      voir(t2, passe(f, 3.8, 4.3) * sortie);
    };
  }

  /* ---------- étape 2 · Récupération : la vapeur passe dans la bouteille, la nappe monte, la balance dit combien ---------- */
  function etapeRecuperation(g) {
    sol(g);
    D.tube(g, 318, TY, 242, 40, "cuivre", false, "#f4f8fc");
    const m = manifold(g, 440, 160, 3);
    const jaune = `M${m.c[0]} ${m.c[1]} C${m.c[0]} 236 545 236 586 184`;
    flexible(g, jaune, JAUNE)(1);
    vanneService(g, 372); vanneService(g, 520);
    flexible(g, `M${m.bp[0]} ${m.bp[1]} C${m.bp[0]} 226 372 200 372 ${VT}`, C.bleu)(1);
    flexible(g, `M${m.hp[0]} ${m.hp[1]} C${m.hp[0]} 226 520 200 520 ${VT}`, C.rouge)(1);
    pose(g, LOC + "recuperador-refrig.svg", 565, 105, 130, 130, true);
    const sortieU = "M684 168 C740 168 790 190 790 246";
    flexible(g, sortieU, "#9aa7b5")(1);
    const vers = `V${m.corps[1]} H${m.c[0]} V${m.c[1]}`;
    const f1 = flux(g, `M372 ${VT} C372 200 ${m.bp[0]} 226 ${m.bp[0]} ${m.bp[1]} ${vers} C440 236 545 236 586 184`, AIR_FROID);
    const f2 = flux(g, `M520 ${VT} C520 200 ${m.hp[0]} 226 ${m.hp[0]} ${m.hp[1]} ${vers}`, AIR_FROID);
    const f4 = flux(g, sortieU, AIR_CHAUD);
    const bouteille = bouteilleSurBalance(g, 12);
    lab(g, 440, 66, "manifold", { "text-anchor": "middle" });
    lab(g, 630, 62, "groupe de", { "text-anchor": "middle" }); lab(g, 630, 86, "récupération", { "text-anchor": "middle" });
    lab(g, 440, 402, "installation", { "text-anchor": "middle" });
    lab(g, 732, 404, "balance", { "text-anchor": "end" });
    lab(g, BX + 30, 262, "bouteille");
    lab(g, 752, 312, "niveau maxi", { "text-anchor": "end", fill: C.rouge });
    const res = D.el("g", { opacity: 0 }, g);
    mot(res, 930, 56, "14,3 − 12,0", { "text-anchor": "end", fill: C.vert }); mot(res, 930, 84, "= 2,3 kg récupérés", { "text-anchor": "end", fill: C.vert });
    return t => {
      const f = FIGE ? 10.5 : t % 12, sortie = 1 - passe(f, 11.3, 11.8);
      const marcheU = FIGE ? 0 : passe(f, 1, 1.6) * (1 - passe(f, 8.8, 9.2)), p = FIGE ? 1 : passe(f, 1.6, 8.8) * sortie;
      [f1, f2, f4].forEach(x => marche(x, FIGE ? 0 : t, 36, marcheU));
      bouteille(12 + 2.3 * p, 0.04 + 0.54 * p, FIGE ? 0 : t);
      voir(res, passe(f, 9.4, 9.9) * sortie);
    };
  }

  /* ---------- étape 3 · Brasage : le filtre déshydrateur colmaté sort, le neuf est brasé sous azote sec ---------- */
  /* le filtre déshydrateur hermétique : le dessin de F. Henninot (packs/fluides/res/filtre-deshydrateur-pedagogique/assets/svg/filtre-hermetique.svg),
     recopié sans ses deux raccords (le tube de la scène en tient lieu). Repère d'origine 1200 × 560, axe y = 280, bouts du corps x = 242 et x = 958.
     sale : le filtre colmaté (teinte de saleté et dépôts). La flèche blanche marque le sens de circulation. */
  function filtre(parent, cx, cy, k, sale) {
    const g = D.el("g", { transform: `translate(${cx} ${cy}) scale(${k}) translate(-600 -280)` }, parent);
    const CORPS = "M242 214c42-62 95-92 157-92h402c62 0 115 30 157 92v132c-42 62-95 92-157 92H399c-62 0-115-30-157-92Z";
    D.el("path", { d: CORPS, fill: "#26394f", stroke: "#10233c", "stroke-width": 12, "stroke-linejoin": "round" }, g);
    D.el("rect", { x: 345, y: 112, width: 510, height: 336, rx: 96, fill: "#334b66", stroke: "#10233c", "stroke-width": 12, "stroke-linejoin": "round" }, g);
    D.el("path", { d: "M390 172h420", stroke: "#70839a", "stroke-width": 10, "stroke-linecap": "round", opacity: 0.72 }, g);
    D.el("path", { d: "M425 280h304", stroke: "#fffdf8", "stroke-width": 18, "stroke-linecap": "round" }, g);
    D.el("path", { d: "m720 240 72 40-72 40", fill: "#fffdf8", stroke: "#fffdf8", "stroke-width": 12, "stroke-linejoin": "round" }, g);
    if (sale) {
      D.el("path", { d: CORPS, fill: "#a8641e", opacity: 0.42 }, g);
      const r = D.alea(7);
      for (let i = 0; i < 16; i++) D.el("circle", { cx: 440 + r() * 320, cy: 185 + r() * 190, r: 7 + r() * 8, fill: "#3d2410", opacity: 0.75 }, g);
    }
    return g;
  }
  /* le chalumeau (poignée, flexible de gaz, vanne, lance, buse), dessiné autour de la pointe de la buse (0 0) ; sa flamme part de là, vers le bas et la gauche */
  function chalumeau(parent) {
    const g = D.el("g", { opacity: 0 }, parent);
    D.el("path", { d: "M164 -160 C188 -168 194 -134 180 -106", fill: "none", stroke: "#2c3947", "stroke-width": 7, "stroke-linecap": "round" }, g);
    D.el("path", { d: "M168 -164 L98 -94", stroke: "#4c5a6a", "stroke-width": 24, "stroke-linecap": "round" }, g);
    D.el("path", { d: "M164 -162 L102 -100", stroke: "#8fa0b3", "stroke-width": 5, "stroke-linecap": "round", opacity: 0.8 }, g);
    D.el("rect", { x: 48, y: -78, width: 52, height: 24, rx: 6, fill: "url(#vm-laiton)", transform: "rotate(-45 74 -66)" }, g);
    D.el("path", { d: "M58 -52 L14 -12", stroke: "#9aa7b5", "stroke-width": 8, "stroke-linecap": "round" }, g);
    D.el("path", { d: "M16 -14 L4 -3", stroke: "url(#vm-laiton)", "stroke-width": 13, "stroke-linecap": "round" }, g);
    const flamme = D.el("g", {}, g);
    D.el("path", { d: "M0 0 C14 18 17 46 0 90 C-17 46 -14 18 0 0 Z", fill: "#ff8c3a" }, flamme);
    D.el("path", { d: "M0 5 C8 21 10 40 0 66 C-10 40 -8 21 0 5 Z", fill: "#ffd45c" }, flamme);
    D.el("path", { d: "M0 7 C4 18 5 31 0 44 C-5 31 -4 18 0 7 Z", fill: "#7cc0ff" }, flamme);
    return { g: g, flamme: flamme };
  }
  function etapeBrasage(g) {
    sol(g);
    const CX = 610, CY = 296, K = 0.3, XL = CX - 358 * K, XR = CX + 358 * K;          // le filtre au milieu du tube ; ses deux joints (bouts du corps)
    D.tube(g, 440, CY - 20, XL + 3 - 440, 40, "cuivre", false, "#f4f8fc");             // le tube, en deux morceaux : le filtre est entre les deux
    D.tube(g, XR - 3, CY - 20, 905 - XR + 3, 40, "cuivre", false, "#f4f8fc");
    const vieux = D.el("g", {}, g), neuf = D.el("g", {}, g);
    filtre(vieux, CX, CY, K, true); filtre(neuf, CX, CY, K, false);
    const bagues = D.el("g", { opacity: 0 }, g);                                       // les deux bagues de brasure, posées avec le filtre neuf
    [XL, XR].forEach(x => D.el("rect", { x: x - 4, y: CY - 24, width: 8, height: 48, rx: 2, fill: "#cfd6de", stroke: C.navy, "stroke-width": 1.5 }, bagues));
    // la bouteille d'azote et son flexible
    const BXN = 385, SN = 3, YN0 = 410 - 60 * SN;
    pose(g, LOC + "botella-refrig.svg", BXN - 14 * SN, YN0, 28 * SN, 68 * SN, true);
    flexible(g, `M${BXN} ${YN0 + 14 * SN} C${BXN + 3} 246 428 258 440 ${CY}`, "#9aa7b5")(1);
    // le flux d'azote : des molécules pâles dans le tube, sur le filtre ; elles sortent par le bout ouvert tant que le filtre neuf n'est pas posé
    const KM = 0.5, mols = D.el("g", { transform: `scale(${KM})` }, g), r = D.alea(31), MOL = [];
    for (let i = 0; i < 17; i++) MOL.push({ s: r(), v: r(), maj: D.mol(mols) });
    const flot = (t, gaz, inst) => MOL.forEach(m => {
      const x = 448 + D.frac(m.s + t * 54 / 457) * 457, suite = x < XL - 20 ? 1 : x < XL ? D.lerp(1, inst, (x - (XL - 20)) / 20) : inst;
      m.maj(x / KM, (CY - 2 + m.v * 6) / KM, 0.3, true, D.borne(Math.min(x - 442, 905 - x) / 26, 0, 1) * gaz * suite);
    });
    // le chalumeau et sa flamme, dirigée vers le joint ; la lueur du joint qui chauffe
    const ch = chalumeau(g);
    const lueurs = [XL, XR].map(x => [D.el("ellipse", { cx: x, cy: CY, rx: 46, ry: 40, fill: "#ff5a1f", opacity: 0 }, g), D.el("ellipse", { cx: x, cy: CY, rx: 30, ry: 26, fill: "#ffb347", opacity: 0 }, g)]);
    lab(g, BXN + 26, 372, "azote");
    lab(g, 880, 340, "sortie libre", { "text-anchor": "middle" });
    const titre = lab(g, CX, 374, "filtre déshydrateur", { "text-anchor": "middle", opacity: 0 });
    const colmate = lab(g, CX, 400, "colmaté", { "text-anchor": "middle", fill: C.rouge, opacity: 0 });
    const neufT = lab(g, CX, 400, "neuf", { "text-anchor": "middle", fill: C.vert, opacity: 0 });
    const m = [["l’azote chasse", C.navy], ["l’oxygène :", C.navy], ["pas de calamine", C.vert], ["dans le tube", C.vert]].map(([s, c], k) => mot(g, 330, 62 + k * 28, s, { fill: c, opacity: 0 }));
    return t => {
      const f = FIGE ? 10 : t % 12.2, sortie = 1 - passe(f, 11.5, 12);
      const aVieux = FIGE ? 0 : 1 - passe(f, 1.3, 2.3), aNeuf = FIGE ? 1 : passe(f, 2.7, 3.2);                      // l'ancien filtre monte et s'efface, le neuf descend et se pose
      vieux.setAttribute("transform", `translate(0 ${(-130 * passe(f, 0.9, 2.3)).toFixed(1)})`); voir(vieux, aVieux * sortie);
      neuf.setAttribute("transform", `translate(0 ${(-130 * (1 - (FIGE ? 1 : passe(f, 2.7, 4)))).toFixed(1)})`); voir(neuf, aNeuf);
      voir(bagues, FIGE ? 1 : passe(f, 3.9, 4.3) * sortie);
      flot(FIGE ? 0 : t, FIGE ? 1 : passe(f, 1.8, 2.4) * sortie, FIGE ? 1 : passe(f, 3.9, 4.4));
      const feu = (FIGE ? 1 : passe(f, 4.5, 5) * (1 - passe(f, 10.7, 11.2))) * (FIGE ? 0.9 : 1);
      const vacille = FIGE ? 1 : 1 + 0.07 * Math.sin(t * 17) + 0.05 * Math.sin(t * 29 + 1);
      const ou = FIGE ? 1 : passe(f, 7, 8);                                                                         // le chalumeau passe d'un joint à l'autre
      ch.g.setAttribute("transform", `translate(${(D.lerp(XL, XR, ou) + 53).toFixed(1)} 219) scale(0.85)`);
      ch.flamme.setAttribute("transform", `rotate(${FIGE ? 46 : (46 + 2.5 * Math.sin(t * 11)).toFixed(1)}) scale(${(0.85 + 0.15 * feu).toFixed(2)} ${(feu * vacille).toFixed(3)})`);
      voir(ch.g, (FIGE ? 1 : passe(f, 4.2, 4.8) * (1 - passe(f, 10.9, 11.4))) * sortie);
      const chauffe = [FIGE ? 0 : passe(f, 4.9, 6.9) * (1 - passe(f, 7.4, 8.6)), FIGE ? 1 : passe(f, 8.2, 10.2) * (1 - passe(f, 10.8, 11.6))];
      lueurs.forEach(([a, b], i) => { voir(a, 0.42 * chauffe[i] * sortie); voir(b, 0.5 * chauffe[i] * sortie); });
      voir(titre, (FIGE ? 1 : passe(f, 0.2, 0.7)) * sortie);
      voir(colmate, FIGE ? 0 : passe(f, 0.5, 0.9) * (1 - passe(f, 1.9, 2.3)) * sortie); voir(neufT, FIGE ? 1 : passe(f, 3.2, 3.7) * sortie);
      m.forEach((e, k) => voir(e, (FIGE ? 1 : passe(f, 5.2 + k * 0.5, 5.7 + k * 0.5)) * sortie));
    };
  }

  /* ---------- étape 4 · Tirage au vide : la pompe aspire l'air et l'humidité, on isole, le vide tient ---------- */
  function etapeVide(g) {
    sol(g);
    D.tube(g, 318, TY, 182, 40, "cuivre", false, "#f4f8fc");
    D.tube(g, 670, TY, 265, 40, "cuivre", false, "#f4f8fc");
    const niveau = { v: 0.7 };
    const eau = D.liquide(D.el("g", {}, g), { x0: 328, x1: 492, yh: TY + 10, yb: TY + 30, niveau: x => niveau.v * Math.max(0, 1 - Math.pow((x - 410) / 90, 2)), couleur: () => "#8fb7d9", opacite: 0.9, pas: 6 });
    const bulles = D.bulles(D.el("g", {}, g), 7, 41);
    pose(g, LOC + "manometro.svg", 336, 247, 49.4, 88.4, true);
    const m = manifold(g, 585, 135, 3.4);
    vanneService(g, 455); vanneService(g, 715);
    const pompe = D.el("g", {}, g);
    pose(pompe, LOC + "bomba-vacio.svg", 528, 256, 114, 97, true);
    flexible(g, `M${m.bp[0]} ${m.bp[1]} C${m.bp[0]} 215 455 190 455 ${VT}`, C.bleu)(1);
    flexible(g, `M${m.hp[0]} ${m.hp[1]} C${m.hp[0]} 215 715 190 715 ${VT}`, C.rouge)(1);
    flexible(g, `M${m.c[0]} ${m.c[1]} V258`, JAUNE)(1);
    const fB = flux(g, `M455 ${VT} C455 190 ${m.bp[0]} 215 ${m.bp[0]} ${m.bp[1]} V${m.corps[1]} H${m.c[0]} V258`, AIR_FROID);
    const fA = flux(g, `M715 ${VT} C715 190 ${m.hp[0]} 215 ${m.hp[0]} ${m.hp[1]} V${m.corps[1]} H${m.c[0]}`, AIR_FROID);
    const agit = geste(g);
    lab(g, 585, 38, "manifold", { "text-anchor": "middle" });
    lab(g, 326, 232, "vacuomètre");
    lab(g, 400, 402, "humidité", { "text-anchor": "middle", fill: "#3f6b93" });
    lab(g, 585, 382, "pompe à vide", { "text-anchor": "middle" });
    lab(g, 741, 262, "vannes de"); lab(g, 741, 286, "service");
    const etat = (y, s, c) => mot(g, 930, y, s, { "text-anchor": "end", fill: c, opacity: 0 });
    const p1 = etat(62, "pompe en marche", C.vert), p2 = etat(62, "pompe arrêtée", C.navy);
    const v1 = etat(96, "le vide se creuse", BLEU_BP), v2 = etat(96, "circuit isolé", C.navy), v3 = etat(96, "le vide tient", C.vert);
    return t => {
      const f = FIGE ? 10.4 : t % 12, sortie = 1 - passe(f, 11.3, 11.8);
      const ouvB = passe(f, 0.8, 1.6) * (1 - passe(f, 7.4, 8.2)), ouvA = passe(f, 1.0, 1.8) * (1 - passe(f, 7.6, 8.4));
      m.noir.mB.setAttribute("opacity", (1 - ouvB).toFixed(2)); m.noir.mA.setAttribute("opacity", (1 - ouvA).toFixed(2));
      const enMarche = passe(f, 2, 2.4) * (1 - passe(f, 8.9, 9.3));
      pompe.setAttribute("transform", enMarche > 0.5 && !FIGE ? `translate(${(Math.sin(t * 61) * 0.9).toFixed(2)} ${(Math.cos(t * 47) * 0.6).toFixed(2)})` : "");
      const air = enMarche * Math.min(ouvB, ouvA) * (1 - 0.8 * passe(f, 3, 7));
      [fB, fA].forEach(x => marche(x, FIGE ? 0 : t, 34, FIGE ? 0 : air));
      niveau.v = FIGE ? 0.1 : 0.7 - 0.6 * passe(f, 3, 7) * sortie; eau.maj(FIGE ? 0 : t);
      bulles(FIGE ? 0 : t, q => { const x = 345 + q * 140; return [x, TY + 28, eau.surface(x, FIGE ? 0 : t) + 3, !FIGE && enMarche * ouvB > 0.5 && niveau.v > 0.16 ? 1 : 0]; });
      if (FIGE) agit(m.cadre.mB, -1, 0);
      else if (f < 4) agit(m.cadre.mB, -1, D.fenetre(f, 0.5, 1.9, 0.3) * sortie);
      else agit(m.cadre.mB, 1, D.fenetre(f, 7.2, 8.4, 0.3) * sortie);
      voir(p1, passe(f, 2.2, 2.6) * (1 - passe(f, 9, 9.3)) * sortie); voir(p2, passe(f, 9.4, 9.8) * sortie);
      voir(v1, passe(f, 3, 3.5) * (1 - passe(f, 7.2, 7.6)) * sortie); voir(v2, passe(f, 7.8, 8.2) * (1 - passe(f, 9, 9.3)) * sortie); voir(v3, passe(f, 9.4, 9.8) * sortie);
    };
  }

  /* ---------- étape 5 · Charge à la balance : la balance perd ce qui part dans la machine ---------- */
  function etapeCharge(g) {
    sol(g);
    D.tube(g, 318, TY, 242, 40, "cuivre", false, "#f4f8fc");
    const m = manifold(g, 440, 160, 3);
    const jaune = `M${m.c[0]} ${m.c[1]} V212 C440 240 600 226 700 232 C745 235 790 232 ${BX} 246`;
    flexible(g, jaune, JAUNE)(1);
    vanneService(g, 372); vanneService(g, 520);
    flexible(g, `M${m.bp[0]} ${m.bp[1]} C${m.bp[0]} 226 372 200 372 ${VT}`, C.bleu)(1);
    flexible(g, `M${m.hp[0]} ${m.hp[1]} C${m.hp[0]} 226 520 200 520 ${VT}`, C.rouge)(1);
    const retour = `M${BX} 246 C${BX} 232 745 235 700 232 C600 226 440 240 440 212 V${m.c[1]}`;
    const vers = `V${m.corps[1]} H${m.bp[0]} V${m.bp[1]} C${m.bp[0]} 226 372 200 372 ${VT}`;
    const f3 = flux(g, retour, AIR_FROID);
    const f1 = flux(g, `M${m.c[0]} ${m.c[1]} ${vers}`, AIR_FROID);
    const f2 = flux(g, `M${m.c[0]} ${m.c[1]} V${m.corps[1]} H${m.hp[0]} V${m.hp[1]} C${m.hp[0]} 226 520 200 520 ${VT}`, AIR_FROID);
    const bouteille = bouteilleSurBalance(g, 14.3);
    lab(g, 440, 66, "manifold", { "text-anchor": "middle" });
    lab(g, 440, 402, "installation", { "text-anchor": "middle" });
    lab(g, 732, 404, "balance", { "text-anchor": "end" });
    lab(g, BX + 30, 262, "bouteille");
    lab(g, 752, 312, "niveau maxi", { "text-anchor": "end", fill: C.rouge });
    const res = D.el("g", { opacity: 0 }, g);
    mot(res, 930, 56, "14,3 − 12,0", { "text-anchor": "end", fill: C.vert }); mot(res, 930, 84, "= 2,3 kg remis", { "text-anchor": "end", fill: C.vert }); mot(res, 930, 112, "dans sa machine", { "text-anchor": "end", fill: C.vert });
    return t => {
      const f = FIGE ? 10.5 : t % 12, sortie = 1 - passe(f, 11.3, 11.8);
      const circule = FIGE ? 0 : passe(f, 1, 1.6) * (1 - passe(f, 8.8, 9.2)), p = FIGE ? 1 : passe(f, 1.6, 8.8) * sortie;
      [f1, f2, f3].forEach(x => marche(x, FIGE ? 0 : t, 36, circule));
      bouteille(14.3 - 2.3 * p, 0.58 - 0.54 * p, FIGE ? 0 : t);
      voir(res, passe(f, 9.4, 9.9) * sortie);
    };
  }

  /* ---------- les cinq étapes, dans l'ordre de la page ---------- */
  const ETAPES = [   // les phrases : espaces insécables avant « : ; » et entre un nombre et son unité
    { titre: "Manifold", bulle: ["Les vannes sont", "fermées ?"], bras: -80, cycle: 10, dessiner: etapeManifold,
      dire: "On ferme d’abord les deux vannes du manifold. Puis on raccorde : le flexible bleu sur la basse pression (BP), le rouge sur la haute pression (HP). Le jaune, au milieu, attend la station, la pompe ou la bouteille." },
    { titre: "Récupérer", bulle: ["Combien j’ai", "récupéré ?"], bras: -50, cycle: 12, dessiner: etapeRecuperation,
      dire: "Le fluide quitte l’installation par la station de récupération et arrive dans la bouteille, posée sur une balance. On pèse avant et après : 12,0 kg au départ, 14,3 kg à la fin, soit 2,3 kg récupérés. C’est la balance qui dit combien, pas le manomètre. Jamais de bouteille pleine." },
    { titre: "Braser", bulle: ["Qu’est-ce que", "je remplace ?"], bras: -70, cycle: 12.2, dessiner: etapeBrasage,
      dire: "Le filtre déshydrateur est colmaté : il laisse passer trop peu de liquide, c’est la cause de la panne. Le fluide est récupéré : on sort l’ancien filtre, on brase le neuf sous un léger débit d’azote sec. L’azote chasse l’oxygène : il ne se forme pas de calamine, ce dépôt noir, à l’intérieur du tube. Azote sec seulement, jamais d’oxygène ni d’air comprimé." },
    { titre: "Tirer au vide", bulle: ["Le vide", "tient-il ?"], bras: -60, cycle: 12, dessiner: etapeVide,
      dire: "La pompe aspire l’air et l’humidité du circuit : l’eau restée dans la ligne bout et part avec l’air. On ferme côté circuit avant d’arrêter la pompe, puis le vacuomètre dit si le vide tient. Le vide à atteindre et la durée : selon la notice du constructeur." },
    { titre: "Charger", bulle: ["Combien j’ai", "remis ?"], bras: -50, cycle: 12, dessiner: etapeCharge,
      dire: "Le fluide récupéré retourne dans sa machine, sans retraitement. La balance perd ce qui est parti : 14,3 kg au départ, 12,0 kg à la fin, soit 2,3 kg remis. La charge se contrôle à la balance, jamais au manomètre. Un complément viendrait d’une bouteille neuve." }
  ];

  M.monter({ nom: "intervenir", etapes: ETAPES,
    aria: "Un technicien frigoriste intervient sur le circuit en cinq étapes : il ferme les vannes du manifold puis raccorde les flexibles ; il récupère le fluide dans une bouteille posée sur une balance, 12,0 kg au départ et 14,3 kg à la fin, soit 2,3 kg ; il remplace le filtre déshydrateur colmaté, cause de la panne : l’ancien sort, le neuf est brasé sous balayage d’azote sec ; il tire au vide avec une pompe, puis isole et vérifie que le vide tient ; il recharge à la balance, qui perd 2,3 kg : le fluide récupéré retourne dans sa machine.",
    legende: "Deuxième scène de la journée : intervenir sur le circuit, en cinq étapes. « ▶ Dérouler » joue toute la scène." });
})();

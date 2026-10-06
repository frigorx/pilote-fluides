/* =====================================================================
   scenes/dechets.js — la scène de la branche « Déchets »
   ---------------------------------------------------------------------
   Remplace l'image scene-dechets.webp en tête de l'accueil des cinq
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="dechets" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Le pas à pas : SceneKit (cartoclim/stations/_commun/scene-kit.js), une
   étape par station de la branche, dans l'ordre du plan. L'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche depuis l'étape 1, chaque étape le temps de son cycle (le film du
   kit avance toutes les 2,6 s, trop vite pour lire la phrase).
   Le dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — le liquide
   en nappe de la bouteille de récupération, le filigrane R9.
   Le chargé d'affaires : le bonhomme « plein » de HoCourant (option B,
   décision de F. Henninot du 30/09/2026 pour l'animé), recopié tel quel ;
   les déchets sont des formes simples (bennes, caisses, bouteille de
   récupération, bordereau, flèches de filière). Aucune image nouvelle,
   aucun logo d'éco-organisme. Les deux moteurs sont LUS, jamais modifiés.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités (≥ 18,7 px à 1280) ; un seul
   accent orange par étape ; tout bouge par le temps t (requestAnimationFrame),
   sans jamais interroger la préférence système de réduction des animations ;
   seul l'interrupteur « Animations » du site (moteur/animations.js, choix
   explicite de l'utilisateur) fige le dessin sur l'image finale de chaque
   étape. Faits : ceux des cinq stations, aucun chiffre nouveau.
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="dechets"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#57534e";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
  const INDIGO = "#1e40af";     // la capacité, comme dans la station Aptitude & capacité
  const LIQUIDE = "#5b9bd5", PEAU = "#f6d7bd", ENCRE = "#10233c";
  const POLICE = "Calibri, 'Segoe UI', Arial, sans-serif";
  const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);

  const ecrire = (parent, x, y, s, taille, at) =>
    D.texte(parent, x, y, s, Object.assign({ "font-size": taille, "font-family": POLICE, fill: ENCRE }, at || {}));
  const voir = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const coche = (parent, x, y) => {
    const c = D.el("g", { opacity: 0 }, parent);
    D.el("circle", { cx: x, cy: y, r: 15, fill: C.vert }, c);
    D.el("path", { d: `M${x - 7} ${y} l5 5 l9 -10`, fill: "none", stroke: C.papier, "stroke-width": 3.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, c);
    return c;
  };

  /* ---------- le personnage : bonhomme « plein » de HoCourant ----------
     Repère : tête en haut (y 0), pieds à y 72, ombre à y 73, regard vers la droite. */
  function bonhomme(parent, o) {
    const g = D.el("g", {}, parent);
    D.el("ellipse", { cx: 0, cy: 73, rx: 13, ry: 2.5, fill: C.navy, opacity: 0.15 }, g);
    const corps = D.el("g", {}, g);
    D.el("path", { d: "M-2 25 L-10 46", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, corps);
    if (o.dossier) {
      D.el("rect", { x: -17, y: 40, width: 12, height: 17, rx: 1.5, fill: C.bleu, stroke: C.navy, "stroke-width": 1.2 }, corps);
      D.el("path", { d: "M-15 44 H-7 M-15 47.5 H-7 M-15 51 H-9", stroke: C.papier, "stroke-width": 1 }, corps);
    }
    D.el("circle", { cx: -10, cy: 47, r: 3.6, fill: PEAU, stroke: C.navy, "stroke-width": 1.8 }, corps);
    const jg = D.el("g", {}, corps), jd = D.el("g", {}, corps);
    D.el("path", { d: "M-2 48 L-9 71", stroke: C.navy, "stroke-width": 7, "stroke-linecap": "round" }, jg);
    D.el("path", { d: "M-10 72 H-3", stroke: "#0f2440", "stroke-width": 5, "stroke-linecap": "round" }, jg);
    D.el("path", { d: "M2 48 L9 71", stroke: C.navy, "stroke-width": 7, "stroke-linecap": "round" }, jd);
    D.el("path", { d: "M8 72 H15", stroke: "#0f2440", "stroke-width": 5, "stroke-linecap": "round" }, jd);
    D.el("path", { d: "M-8 24 Q-8 19 -3 19 H3 Q8 19 8 24 V49 H-8 Z", fill: "#84b7ec", stroke: C.navy, "stroke-width": 2 }, corps);
    D.el("path", { d: "M-8 38 H8", stroke: C.papier, "stroke-width": 3 }, corps);
    D.el("path", { d: "M0 20 V49", stroke: C.navy, "stroke-width": 1.2 }, corps);
    D.el("rect", { x: -2.5, y: 16, width: 5, height: 5, fill: PEAU }, corps);
    D.el("circle", { cx: 0, cy: 10, r: 9, fill: PEAU, stroke: C.navy, "stroke-width": 2.2 }, corps);
    D.el("path", { d: "M-9 9.5 Q-9.5 0.5 0 0.8 Q9 0.5 9 7 Q4 4 -1 4.8 Q-6 5.5 -9 9.5Z", fill: C.navy }, corps);
    if (o.casquette) D.el("path", { d: "M-9.6 8 Q-9.6 -1.2 0 -1 Q9 -0.8 9.4 6 L16 7.2 Q16.5 9 14 9 H-9.6 Z", fill: C.navy }, corps);
    D.el("circle", { cx: -4.5, cy: 11, r: 1.7, fill: PEAU, stroke: C.navy, "stroke-width": 1 }, corps);
    const yeux = [2.5, 6.3].map(x => D.el("ellipse", { cx: x, cy: 10, rx: 1.2, ry: 1.2, fill: ENCRE }, corps));
    D.el("path", { d: "M2.8 14 Q4.8 15.6 6.8 14", stroke: ENCRE, "stroke-width": 1.2, fill: "none", "stroke-linecap": "round" }, corps);
    const bras = D.el("g", {}, corps);
    D.el("path", { d: "M2 24 L12 48", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, bras);
    if (o.carte) {
      D.el("rect", { x: 7, y: 47, width: 16, height: 11, rx: 1.5, fill: ACCENT, stroke: C.navy, "stroke-width": 1 }, bras);
      D.el("path", { d: "M10 51 H20 M10 54.5 H17", stroke: C.papier, "stroke-width": 1 }, bras);
    }
    D.el("circle", { cx: 12.5, cy: 49, r: 3.8, fill: PEAU, stroke: C.navy, "stroke-width": 1.8 }, bras);
    return function (p) { // p : { x, y, k, t, bras (degrés, 0 = bras pendant) }
      g.setAttribute("transform", `translate(${p.x} ${p.y}) scale(${p.k})`);
      corps.setAttribute("transform", `translate(0 ${(Math.sin(p.t * 2.1) * 0.35).toFixed(2)})`);
      bras.setAttribute("transform", `rotate(${p.bras.toFixed(1)} 2 24)`);
      const ferme = !FIGE && D.frac(p.t / 3.7 + (o.dephasage || 0)) < 0.035;
      yeux.forEach(e => e.setAttribute("ry", ferme ? 0.25 : 1.2));
    };
  }

  /* ===== PROPRE À LA BRANCHE : les dessins des étapes (plateau x 310-990, y 60-435 ; coin x 796-988,
     y 10-52 laissé libre pour « ★ Votre station ») et le tableau ETAPES ===== */

  const ORANGE = C.orange;          // l'accent orange : un seul par étape
  const ORANGE_TXT = "#9a3412";     // le texte qui accompagne l'orange (contraste)
  const ORANGE_FOND = "#fff4ec";    // son fond clair
  const PAILLE = "#f1d3a1";         // l'isolant
  const CUIVRE = "#b87333", BOIS = "#d9b27c", CARTON = "#ead8b4";
  const FILET = "#9aaabb";          // le trait des cadres au repos
  const ap = (f, debut, duree) => D.lisse((f - debut) / duree);   // 0 → 1 à partir de « debut », sur « duree » secondes

  /* la croix rouge du « non » (sœur de coche()) */
  const croix = (parent, x, y) => {
    const c = D.el("g", { opacity: 0 }, parent);
    D.el("circle", { cx: x, cy: y, r: 15, fill: C.rouge }, c);
    D.el("path", { d: `M${x - 6} ${y - 6} L${x + 6} ${y + 6} M${x + 6} ${y - 6} L${x - 6} ${y + 6}`, fill: "none", stroke: C.papier, "stroke-width": 3.5, "stroke-linecap": "round" }, c);
    return c;
  };

  /* une flèche de (x1,y1) vers (x2,y2) qui se trace : maj(p), p de 0 à 1 */
  function fleche(parent, x1, y1, x2, y2, coul, ep) {
    const g = D.el("g", { opacity: 0 }, parent), L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const bx = x2 - ux * 14, by = y2 - uy * 14, LL = L - 14;
    const ligne = D.el("path", { d: `M${x1} ${y1} L${bx.toFixed(1)} ${by.toFixed(1)}`, fill: "none", stroke: coul, "stroke-width": ep || 4,
      "stroke-linecap": "round", "stroke-dasharray": `${LL.toFixed(1)} ${LL.toFixed(1)}` }, g);
    const pointe = D.el("path", { d: `M${x2} ${y2} L${(bx - uy * 8).toFixed(1)} ${(by + ux * 8).toFixed(1)} L${(bx + uy * 8).toFixed(1)} ${(by - ux * 8).toFixed(1)} Z`, fill: coul, opacity: 0 }, g);
    const maj = p => {
      voir(g, p > 0 ? 1 : 0);
      ligne.setAttribute("stroke-dashoffset", (LL * (1 - D.borne(p / 0.85, 0, 1))).toFixed(1));
      voir(pointe, D.lisse((p - 0.85) / 0.15));
    };
    return maj;
  }

  /* la bouteille de récupération, le fluide en nappe dedans (jamais des billes) :
     g se place par transform, o.niveau se règle, maj(t) fait onduler la surface ; id préfixé « dechets- » */
  function bouteille(parent, id, o) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: -22, y: -34, width: 44, height: 70, rx: 14 }, D.el("clipPath", { id: id }, g));
    D.el("rect", { x: -24, y: -36, width: 48, height: 74, rx: 16, fill: "#eef5fc" }, g);
    const liq = D.liquide(D.el("g", { "clip-path": "url(#" + id + ")" }, g),
      { x0: -24, x1: 24, yh: -34, yb: 36, pas: 6, niveau: () => o.niveau, couleur: () => o.couleur || LIQUIDE });
    D.el("rect", { x: -24, y: -36, width: 48, height: 74, rx: 16, fill: "none", stroke: C.navy, "stroke-width": 4 }, g);
    D.el("rect", { x: -9, y: -48, width: 18, height: 12, rx: 3, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 3.5 }, g);
    return { g: g, maj: liq.maj };
  }

  /* un petit déchet de chantier, centré sur (0, 0), environ 36 × 28 */
  function objet(parent, nom) {
    const g = D.el("g", {}, parent);
    if (nom === "cuivre") {
      [[-13, 24], [0, 16], [13, 20]].forEach(([x, h]) => D.el("rect", { x: x - 5, y: 13 - h, width: 10, height: h, rx: 5, fill: CUIVRE, stroke: C.navy, "stroke-width": 1.8 }, g));
    } else if (nom === "bois") {
      D.el("rect", { x: -17, y: -12, width: 34, height: 10, rx: 3, fill: BOIS, stroke: "#7a5a2a", "stroke-width": 1.8 }, g);
      D.el("rect", { x: -13, y: 2, width: 34, height: 10, rx: 3, fill: BOIS, stroke: "#7a5a2a", "stroke-width": 1.8 }, g);
    } else if (nom === "carton") {
      D.el("rect", { x: -17, y: -12, width: 34, height: 24, fill: CARTON, stroke: "#7a5a2a", "stroke-width": 2 }, g);
      D.el("path", { d: "M-17 -2 H17 M-4 -12 V-2", stroke: "#7a5a2a", "stroke-width": 1.8 }, g);
    } else {   // l'isolant
      D.el("rect", { x: -17, y: -12, width: 34, height: 24, fill: PAILLE, stroke: "#8a7a4a", "stroke-width": 2 }, g);
      D.el("path", { d: "M-11 -6 L11 6 M11 -6 L-11 6", stroke: "#8a7a4a", "stroke-width": 1.6 }, g);
    }
    return g;
  }
  const COULEUR_OBJET = { cuivre: CUIVRE, bois: BOIS, carton: CARTON, isolant: PAILLE };

  /* ---------- étape 1 · Responsabilités : le producteur répond jusqu'au traitement final, même après la remise ---------- */
  function remise(g) {
    const r = D.el("g", {}, g);
    const XP = 414, XA = 658, XT = 895, R1 = 226, R2 = 386;   // les maillons (producteur, repreneur, traitement final) et les deux routes
    const carte = (x, y, w, h, fond, coul) => {
      const c = D.el("g", { opacity: 0 }, r);
      return { g: c, cadre: D.el("rect", { x: x, y: y, width: w, height: h, rx: 12, fill: fond, stroke: coul, "stroke-width": 3 }, c) };
    };
    const inscrire = (c, x, y, s, at) => ecrire(c.g, x, y, s, 22, Object.assign({ "text-anchor": "middle" }, at));
    // les routes : en haut le repreneur autorisé (jusqu'au traitement final), en bas le non autorisé (route tiretée, qui s'arrête)
    const routes = D.el("g", { opacity: 0 }, r);
    D.el("path", { d: `M330 ${R1} H975`, fill: "none", stroke: "#b9c6d3", "stroke-width": 4, "stroke-linecap": "round" }, routes);
    D.el("path", { d: `M330 ${R2} H736`, fill: "none", stroke: "#b9c6d3", "stroke-width": 4, "stroke-linecap": "round", "stroke-dasharray": "12 9" }, routes);
    [[XP, 170, R1], [XA, 170, R1], [XT, 170, R1], [XP, 330, R2], [XA, 330, R2]].forEach(([x, y0, y1]) => {
      D.el("path", { d: `M${x} ${y0} V${y1}`, stroke: "#b9c6d3", "stroke-width": 3 }, routes);
      D.el("circle", { cx: x, cy: y1, r: 7, fill: C.papier, stroke: C.gris, "stroke-width": 3 }, routes);
    });
    const P1 = carte(316, 90, 196, 80, "#eef0ee", ACCENT), A = carte(538, 114, 240, 56, "#e3f5ec", C.vert), T = carte(800, 64, 190, 106, C.vert, "#14583a");
    const P2 = carte(316, 250, 196, 80, "#eef0ee", ACCENT), B = carte(538, 250, 240, 80, "#fbe7e4", C.rouge);
    inscrire(P1, XP, 123, "Producteur", { "font-weight": 700, fill: C.navy });
    const naitP1 = inscrire(P1, XP, 152, "le déchet naît", { fill: C.gris });
    const soldeP1 = inscrire(P1, XP, 152, "le dossier est soldé", { "font-weight": 700, fill: C.vert, opacity: 0 });
    inscrire(A, XA, 150, "Repreneur autorisé", { "font-weight": 700, fill: C.navy });
    inscrire(T, XT, 96, "Traitement final", { "font-weight": 700, fill: C.papier });
    inscrire(T, XT, 125, "élimination", { fill: C.papier }); inscrire(T, XT, 154, "ou valorisation", { fill: C.papier });
    inscrire(P2, XP, 283, "Producteur", { "font-weight": 700, fill: C.navy }); inscrire(P2, XP, 312, "le déchet naît", { fill: C.gris });
    inscrire(B, XA, 283, "Repreneur non autorisé", { "font-weight": 700, fill: C.navy });
    const resteB = inscrire(B, XA, 312, "la responsabilité reste", { "font-weight": 700, fill: ORANGE_TXT, opacity: 0 });
    // la laisse orange : la responsabilité, attachée au producteur, qui suit le déchet
    const laisse = y => D.el("path", { d: `M${XP} ${y} H${XP}`, fill: "none", stroke: ORANGE, "stroke-width": 6, "stroke-linecap": "round", opacity: 0 }, r);
    const laisseA = laisse(R1), laisseB = laisse(R2);
    const ancre = y => { const a = D.el("g", { opacity: 0 }, r); D.el("circle", { cx: XP, cy: y, r: 9, fill: ORANGE, stroke: C.papier, "stroke-width": 2.5 }, a); return a; };
    const ancreA = ancre(R1), ancreB = ancre(R2);
    const oA = { niveau: 0.62 }, oB = { niveau: 0.62 }, bA = bouteille(r, "dechets-bout-a", oA), bB = bouteille(r, "dechets-bout-b", oB);
    // le bordereau qui revient du traitement final : cacheté, il rapporte le bout de la laisse au producteur
    const bordereau = D.el("g", { opacity: 0 }, r);
    D.el("path", { d: "M-11 -16 H5 L11 -10 V16 H-11 Z", fill: C.papier, stroke: C.navy, "stroke-width": 2, "stroke-linejoin": "round" }, bordereau);
    D.el("path", { d: "M-6 -4 H6 M-6 2 H6 M-6 8 H1", stroke: C.gris, "stroke-width": 2, "stroke-linecap": "round" }, bordereau);
    D.el("circle", { cx: 5, cy: 10, r: 5, fill: C.vert }, bordereau);
    const okA = coche(r, 346, R1), koB = croix(r, 720, R2);
    const reflexe = D.el("g", { opacity: 0 }, r);
    ecrire(reflexe, 316, 426, "Avant de remettre : vérifier l'autorisation", 22, { "font-weight": 700, fill: C.navy });
    const poser = (b, x, y) => b.g.setAttribute("transform", `translate(${x.toFixed(1)} ${y - 22}) scale(0.5)`);   // la bouteille roule, le fond posé sur la route
    return t => {
      const f = FIGE ? 10.4 : t % 12;
      voir(r, ap(f, 0, 0.4) * (1 - ap(f, 11.4, 0.5)));
      [P1, A, T, P2, B].forEach((c, i) => voir(c.g, ap(f, 0.2 + 0.1 * i, 0.4)));
      voir(routes, ap(f, 0.5, 0.4));
      // cas 1 · repreneur autorisé : la laisse suit la bouteille jusqu'au traitement final, puis le bordereau la ramène
      const xa = D.courbe([[1.6, XP], [3.2, XA], [3.7, XA], [5.3, XT]], f);
      const xb = D.courbe([[6.5, XT], [8.3, XP]], f), xe = f < 6.5 ? xa : xb;   // le bout de la laisse : la bouteille, puis le bordereau
      oA.niveau = D.lerp(0.62, 0.04, ap(f, 5.4, 0.7));   // le traitement a lieu : le fluide est traité
      poser(bA, xa, R1); voir(bA.g, ap(f, 1.1, 0.3) * (1 - ap(f, 6.0, 0.4)));
      laisseA.setAttribute("d", `M${XP} ${R1} H${xe.toFixed(1)}`); voir(laisseA, xe - XP > 1 ? ap(f, 1.2, 0.3) : 0);
      voir(ancreA, ap(f, 1.2, 0.3) * (1 - ap(f, 8.3, 0.3)));
      bordereau.setAttribute("transform", `translate(${xe.toFixed(1)} ${R1 - 26}) scale(1.4)`); voir(bordereau, D.fenetre(f, 6.3, 8.6, 0.25));
      A.cadre.setAttribute("stroke-width", f >= 3.2 && f < 3.8 ? 5 : 3);
      const traite = f >= 5.3 && f < 6.6;
      T.cadre.setAttribute("stroke", traite ? "#bfe8d0" : "#14583a"); T.cadre.setAttribute("stroke-width", traite ? 5 : 3);
      voir(okA, ap(f, 8.5, 0.3));
      voir(naitP1, 1 - ap(f, 8.4, 0.2)); voir(soldeP1, ap(f, 8.6, 0.3));   // l'un s'efface avant que l'autre paraisse
      P1.cadre.setAttribute("stroke", f > 8.5 ? C.vert : ACCENT); P1.cadre.setAttribute("stroke-width", f > 8.5 ? 5 : 3);
      // cas 2 · repreneur non autorisé : la bouteille n'arrive pas au traitement, la laisse reste tendue
      const xn = D.courbe([[1.6, XP], [3.2, XA]], f);
      poser(bB, xn, R2); voir(bB.g, ap(f, 1.1, 0.3));
      laisseB.setAttribute("d", `M${XP} ${R2} H${xn.toFixed(1)}`); voir(laisseB, xn - XP > 1 ? ap(f, 1.2, 0.3) : 0);
      laisseB.setAttribute("stroke-width", (6 + (f > 3.4 ? (FIGE ? 1 : 1.2 * Math.sin(t * 5)) : 0)).toFixed(2));
      voir(ancreB, ap(f, 1.2, 0.3));
      voir(koB, ap(f, 3.4, 0.3)); voir(resteB, ap(f, 3.6, 0.4));
      B.cadre.setAttribute("stroke-width", f > 3.3 ? 5 : 3);
      voir(reflexe, ap(f, 9.1, 0.5));
      bA.maj(t); bB.maj(t);
    };
  }

  /* ---------- étape 2 · Trier : les 7 flux : la matière d'abord, la benne ensuite ---------- */
  function tri(g) {
    const r = D.el("g", {}, g);
    const XO = 410, XB = 766, XN = 802;   // l'objet, la benne, son nom
    const YR = k => k < 7 ? 92 + 42 * k : 398;
    const NOMS = ["Métaux", "Bois", "Plastiques", "Verre", "Papier-carton", "Plâtre", "Minérale, inerte", "Tout-venant"];
    const bennes = NOMS.map((nom, k) => {
      const cy = YR(k), tv = k === 7, coul = tv ? ORANGE : ACCENT, dash = tv ? "7 5" : "none";
      const gb = D.el("g", { opacity: 0 }, r);
      const corps = D.el("path", { d: `M${XB - 20} ${cy - 11} H${XB + 20} L${XB + 16} ${cy + 14} H${XB - 16} Z`, fill: C.papier, stroke: coul, "stroke-width": 3, "stroke-linejoin": "round", "stroke-dasharray": dash }, gb);
      const bord = D.el("rect", { x: XB - 24, y: cy - 17, width: 48, height: 6, rx: 2, fill: C.papier, stroke: coul, "stroke-width": 3, "stroke-dasharray": dash }, gb);
      const contenu = D.el("rect", { x: XB - 12, y: cy - 4, width: 24, height: 12, rx: 2, opacity: 0 }, gb);
      ecrire(gb, XN, cy + 8, nom, 22, tv ? { "font-weight": 700, fill: ORANGE_TXT } : {});
      return { g: gb, corps: corps, bord: bord, contenu: contenu };
    });
    D.el("path", { d: "M742 370 H985", stroke: C.gris, "stroke-width": 2.5, "stroke-dasharray": "7 6" }, r);
    // les déchets du frigoriste, chacun relié à sa benne par une flèche horizontale
    const OBJETS = [["cuivre", 0], ["bois", 1], ["carton", 4], ["isolant", 7]];
    const lignes = OBJETS.map(([nom, k]) => {
      const y = YR(k), tv = k === 7, gl = D.el("g", { opacity: 0 }, r);
      ecrire(gl, 316, y + 8, nom, 22, {});
      const ico = objet(gl, nom); ico.setAttribute("transform", `translate(${XO} ${y})`);
      const ga = D.el("g", { opacity: 0 }, r);
      fleche(ga, 448, y, 736, y, tv ? ORANGE : ACCENT, 3.5)(1);
      return { g: gl, fleche: ga, ico: ico, jeton: null, k: k, y: y, nom: nom };
    });
    lignes.forEach(l => { l.jeton = objet(r, l.nom); l.jeton.setAttribute("opacity", 0); });
    const mot = D.el("g", { opacity: 0 }, r);
    ecrire(mot, 592, 192, "La matière d'abord,", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(mot, 592, 222, "la benne ensuite", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    return t => {
      const f = FIGE ? 9.6 : t % 12;
      voir(r, ap(f, 0, 0.4) * (1 - ap(f, 11.4, 0.5)));
      bennes.forEach((b, k) => voir(b.g, ap(f, 0.2 + 0.12 * k, 0.4)));
      voir(mot, ap(f, 1.2, 0.5));
      const actives = bennes.map(() => 0);
      lignes.forEach((l, i) => {
        const t0 = 1.8 + 1.7 * i;
        voir(l.g, ap(f, 0.3, 0.5)); voir(l.fleche, ap(f, 0.9 + 0.15 * i, 0.4));
        const x = D.courbe([[t0, XO], [t0 + 1.1, XB]], f), pris = f >= t0 + 1.1;
        const taille = pris ? 1 - 0.7 * ap(f, t0 + 1.1, 0.25) : 1;
        l.jeton.setAttribute("transform", `translate(${x.toFixed(1)} ${l.y}) scale(${taille.toFixed(2)})`);
        voir(l.jeton, f >= t0 && !(f > t0 + 1.4) ? 1 : 0);
        voir(l.ico, FIGE ? 0.3 : 1 - 0.7 * ap(f, t0, 0.3));
        const b = bennes[l.k];
        b.contenu.setAttribute("fill", COULEUR_OBJET[l.nom]); b.contenu.setAttribute("stroke", C.navy); b.contenu.setAttribute("stroke-width", 1.5);
        voir(b.contenu, ap(f, t0 + 1.2, 0.25));
        if (f > t0 - 0.2 && f < t0 + 1.5) actives[l.k] = 1;
      });
      bennes.forEach((b, k) => { const w = actives[k] ? 5.5 : 3; b.corps.setAttribute("stroke-width", w); b.bord.setAttribute("stroke-width", w); });
    };
  }

  /* ---------- étape 3 · Déchets dangereux : le bordereau suit le déchet, chaque maillon y appose sa marque ---------- */
  function bordereau(g) {
    const r = D.el("g", {}, g);
    const XC = [410, 650, 890], YB = 228;
    const TIT = ["Producteur", "Transporteur", "Traiteur"], SOUS = ["génère le déchet", "achemine le déchet", "traite le déchet"];
    const cartes = XC.map((cx, i) => {
      const c = D.el("g", { opacity: 0 }, r);
      const cadre = D.el("rect", { x: cx - 100, y: 72, width: 200, height: 78, rx: 12, fill: C.papier, stroke: ACCENT, "stroke-width": 3 }, c);
      ecrire(c, cx, 104, TIT[i], 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      ecrire(c, cx, 134, SOUS[i], 22, { "text-anchor": "middle", fill: C.gris });
      return { g: c, cadre: cadre };
    });
    const liens = D.el("g", { opacity: 0 }, r);
    [[514, 546], [754, 786]].forEach(([a, b]) => fleche(liens, a, 111, b, 111, C.gris, 3)(1));
    D.el("path", { d: "M330 268 H970", fill: "none", stroke: "#b9c6d3", "stroke-width": 4, "stroke-linecap": "round" }, liens);   // le rail du déchet
    // la bande du bordereau, qui traverse les trois maillons : l'accent orange de l'étape
    const bande = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 310, y: 306, width: 680, height: 52, rx: 10, fill: ORANGE_FOND, stroke: ORANGE, "stroke-width": 3, "stroke-dasharray": "10 6" }, bande);
    const encre = D.el("rect", { x: 313, y: 309, width: 0, height: 46, rx: 6, fill: "#ffd5bd" }, bande);   // le bordereau se remplit au fil du voyage
    ecrire(bande, 326, 340, "BSD", 22, { "font-weight": 700, fill: ORANGE_TXT });
    const cachets = XC.map(cx => coche(r, cx, 332));
    // le déchet : la bouteille de récupération, le fluide non réutilisable, et son pictogramme de danger
    const o = { niveau: 0.62 }, bout = bouteille(r, "dechets-bout-bsd", o);
    const danger = D.el("g", { opacity: 0 }, bout.g);
    D.el("path", { d: "M46 -36 L64 -6 H28 Z", fill: "#fbe7e4", stroke: C.rouge, "stroke-width": 3, "stroke-linejoin": "round" }, danger);
    D.el("path", { d: "M46 -26 V-17", stroke: C.rouge, "stroke-width": 3, "stroke-linecap": "round" }, danger);
    D.el("circle", { cx: 46, cy: -11, r: 2, fill: C.rouge }, danger);
    const fin = D.el("g", { opacity: 0 }, r);
    ecrire(fin, 650, 412, "Chaque maillon appose sa marque", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    return t => {
      const f = FIGE ? 9.2 : t % 11.4;
      voir(r, ap(f, 0, 0.4) * (1 - ap(f, 10.8, 0.5)));
      cartes.forEach((c, i) => voir(c.g, ap(f, 0.25 + 0.15 * i, 0.4)));
      voir(liens, ap(f, 0.7, 0.4)); voir(bande, ap(f, 0.9, 0.4));
      const x = D.courbe([[3.3, XC[0]], [4.5, XC[1]], [5.6, XC[1]], [6.8, XC[2]]], f);
      bout.g.setAttribute("transform", `translate(${x.toFixed(1)} ${YB})`);
      voir(bout.g, ap(f, 1.2, 0.4)); voir(danger, ap(f, 1.8, 0.3));
      [2.3, 4.8, 7.1].forEach((d, i) => voir(cachets[i], ap(f, d, 0.3)));
      voir(encre, ap(f, 2.0, 0.3));
      encre.setAttribute("width", D.courbe([[3.3, 97], [4.5, 337], [5.6, 337], [6.8, 577], [7.6, 671]], f).toFixed(1));   // jusqu'à x 410, 650, 890, puis le bout de la bande
      cartes.forEach((c, i) => c.cadre.setAttribute("stroke-width", Math.abs(x - XC[i]) < 4 && f > 1.2 ? 5.5 : 3));
      voir(fin, ap(f, 7.8, 0.5));
      bout.maj(t);
    };
  }

  /* ---------- étape 4 · La REP bâtiment : le metteur sur le marché paie en amont, le chantier n'a qu'à trier ---------- */
  function reprise(g) {
    const r = D.el("g", {}, g);
    const carte = (x, y, titre, sous) => {
      const c = D.el("g", { opacity: 0 }, r);
      const cadre = D.el("rect", { x: x, y: y, width: 280, height: 78, rx: 12, fill: C.papier, stroke: ACCENT, "stroke-width": 3 }, c);
      ecrire(c, x + 140, y + 32, titre, 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      ecrire(c, x + 140, y + 61, sous, 22, { "text-anchor": "middle", fill: C.gris });
      return { g: c, cadre: cadre };
    };
    const cTL = carte(316, 76, "Metteur sur le marché", "paie l'éco-contribution");
    const cTR = carte(710, 76, "Éco-organisme agréé", "organise la collecte");
    const cBR = carte(710, 278, "Point de reprise", "reçoit les déchets triés");
    const ga1 = D.el("g", { opacity: 0 }, r), ga2 = D.el("g", { opacity: 0 }, r);
    fleche(ga1, 604, 115, 702, 115, ACCENT, 4)(1); fleche(ga2, 850, 158, 850, 270, ACCENT, 4)(1);
    // l'éco-contribution : des pièces qui voyagent d'un bloc à l'autre — l'accent orange de l'étape
    const piece = () => {
      const c = D.el("g", { opacity: 0 }, r);
      D.el("circle", { r: 13, fill: ORANGE, stroke: "#9a3412", "stroke-width": 2 }, c);
      D.el("path", { d: "M-7 -2 A8 8 0 0 1 2 -8", fill: "none", stroke: ORANGE_FOND, "stroke-width": 2.5, "stroke-linecap": "round" }, c);
      return c;
    };
    const pieces1 = [0, 1, 2].map(piece), pieces2 = [0, 1, 2].map(piece);
    // le sol, le chantier et son camion, dont la charge est d'abord mélangée, puis triée
    const decor = D.el("g", { opacity: 0 }, r);
    D.el("path", { d: "M316 356 H700", stroke: "#b9c6d3", "stroke-width": 3, "stroke-linecap": "round" }, decor);
    ecrire(decor, 316, 390, "Chantier", 22, { "font-weight": 700, fill: C.navy });
    const camion = D.el("g", { opacity: 0 }, r);   // le museau à droite : x 0 = l'avant du camion
    D.el("rect", { x: -150, y: 308, width: 106, height: 34, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, camion);
    D.el("path", { d: "M-44 342 V316 H-14 L0 332 V342 Z", fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, camion);
    [-122, -20].forEach(x => D.el("circle", { cx: x, cy: 346, r: 10, fill: C.navy }, camion));
    const MELANGE = [C.bleu, BOIS, C.gris, C.vert];
    [-140, -116, -92, -68].forEach((x, i) => D.el("rect", { x: x, y: 318, width: 20, height: 24, rx: 2, fill: MELANGE[i], stroke: C.navy, "stroke-width": 1.5 }, camion));
    const trie = D.el("g", { opacity: 0 }, camion);
    [-140, -116, -92, -68].forEach(x => D.el("rect", { x: x, y: 318, width: 20, height: 24, rx: 2, fill: PAILLE, stroke: "#8a7a4a", "stroke-width": 1.5 }, trie));
    const koB = croix(r, 676, 288), okB = coche(r, 676, 288);
    const mot = D.el("g", { opacity: 0 }, r);
    ecrire(mot, 316, 214, "Trier avant de déposer", 22, { "font-weight": 700, fill: C.navy });
    const X0 = 466, DX = 230;   // l'avant du camion : au chantier, puis devant le point de reprise
    return t => {
      const f = FIGE ? 10.4 : t % 12;
      voir(r, ap(f, 0, 0.4) * (1 - ap(f, 11.4, 0.5)));
      [cTL, cTR, cBR].forEach((c, i) => voir(c.g, ap(f, 0.2 + 0.15 * i, 0.4)));
      voir(decor, ap(f, 0.5, 0.4)); voir(camion, ap(f, 0.6, 0.4));
      voir(ga1, ap(f, 1.0, 0.4)); voir(ga2, ap(f, 2.6, 0.4));
      pieces1.forEach((p, i) => {
        const s = 1.3 + 0.4 * i, q = (f - s) / 0.9, rest = FIGE && i === 1;
        p.setAttribute("transform", `translate(${D.lerp(614, 692, rest ? 0.5 : D.borne(q, 0, 1)).toFixed(1)} 115)`);
        voir(p, rest ? 1 : FIGE ? 0 : q > 0 && q < 1 ? D.fenetre(q, 0, 1, 0.15) : 0);
      });
      pieces2.forEach((p, i) => {
        const s = 2.9 + 0.4 * i, q = (f - s) / 0.9, rest = FIGE && i === 1;
        p.setAttribute("transform", `translate(850 ${D.lerp(172, 258, rest ? 0.5 : D.borne(q, 0, 1)).toFixed(1)})`);
        voir(p, rest ? 1 : FIGE ? 0 : q > 0 && q < 1 ? D.fenetre(q, 0, 1, 0.15) : 0);
      });
      // 1 · le camion arrive avec une charge mélangée : refusée, il repart ; 2 · il trie, revient : accepté
      const dx = D.courbe([[4.0, 0], [5.4, DX], [5.9, DX], [7.3, 0], [8.2, 0], [9.6, DX]], f);
      camion.setAttribute("transform", `translate(${X0 + dx} 0)`);
      voir(trie, ap(f, 7.4, 0.6));
      voir(mot, ap(f, 7.4, 0.5));
      voir(koB, FIGE ? 0 : D.fenetre(f, 5.5, 6.5, 0.25));
      voir(okB, ap(f, 9.7, 0.3));
      const ok = f > 9.7;
      cBR.cadre.setAttribute("stroke", ok ? C.vert : ACCENT); cBR.cadre.setAttribute("stroke-width", ok ? 5 : 3);
    };
  }

  /* ---------- étape 5 · Valoriser : cinq niveaux, du meilleur au dernier recours ---------- */
  function escalier(g) {
    const r = D.el("g", {}, g);
    const YT = k => 60 + 74 * k, YC = k => YT(k) + 36, W = [358, 346, 334, 322, 310];
    const NIV = [["1 Prévention", "éviter le déchet"], ["2 Réemploi", "remettre en service tel quel"], ["3 Recyclage", "transformer en matière première"],
      ["4 Valorisation énergétique", "en tirer une énergie"], ["5 Élimination", "dernier recours"]];
    const EX = [["récupérer plutôt", "que rejeter"], ["fluide propre,", "même machine"], ["chutes de cuivre", "en fonderie"], ["isolant non", "recyclable"], ["fluide non", "réutilisable"]];
    const lignes = NIV.map((n, k) => {
      const y = YT(k), gl = D.el("g", { opacity: 0 }, r);
      const cadre = D.el("rect", { x: 346, y: y, width: W[k], height: 72, rx: 10, fill: C.papier, stroke: FILET, "stroke-width": 2.5 }, gl);
      ecrire(gl, 364, y + 30, n[0], 22, { "font-weight": 700, fill: C.navy });
      const sous = ecrire(gl, 364, y + 58, n[1], 22, { fill: C.gris });
      // l'exemple du métier, à droite : il apparaît quand le repère arrive
      const ex = D.el("g", { opacity: 0 }, r), yc = YC(k);
      ecrire(ex, 792, yc - 5, EX[k][0], 22, {}); ecrire(ex, 792, yc + 23, EX[k][1], 22, {});
      return { g: gl, cadre: cadre, sous: sous, ex: ex, yc: yc };
    });
    // les cinq exemples en formes simples, centrés sur (744, yc)
    const e1 = D.el("g", { transform: `translate(744 ${lignes[0].yc}) scale(1.25)` }, lignes[0].ex);   // prévention : la poubelle barrée, le déchet évité
    D.el("path", { d: "M-12 -9 H12 L9 14 H-9 Z", fill: "none", stroke: C.gris, "stroke-width": 2.5, "stroke-dasharray": "5 4", "stroke-linejoin": "round" }, e1);
    D.el("path", { d: "M-15 -14 H15", stroke: C.gris, "stroke-width": 2.5, "stroke-dasharray": "5 4", "stroke-linecap": "round" }, e1);
    D.el("path", { d: "M-17 17 L17 -17", stroke: C.rouge, "stroke-width": 3.5, "stroke-linecap": "round" }, e1);
    const o2 = { niveau: 0.62 }, b2 = bouteille(lignes[1].ex, "dechets-bout-reemploi", o2);   // réemploi : le fluide propre
    b2.g.setAttribute("transform", `translate(744 ${lignes[1].yc + 4}) scale(0.52)`);
    objet(lignes[2].ex, "cuivre").setAttribute("transform", `translate(744 ${lignes[2].yc}) scale(1.3)`);   // recyclage : le cuivre
    const e4 = D.el("g", { transform: `translate(744 ${lignes[3].yc})` }, lignes[3].ex);   // valorisation énergétique : l'isolant, et la chaleur qu'on en tire
    objet(e4, "isolant").setAttribute("transform", "translate(0 10) scale(1.15)");
    [-14, 0, 14].forEach(x => D.el("path", { d: `M${x} -6 q5 -7 0 -14`, fill: "none", stroke: C.chaud, "stroke-width": 3, "stroke-linecap": "round" }, e4));
    const e5 = D.el("g", { transform: `translate(744 ${lignes[4].yc})` }, lignes[4].ex);   // élimination : le caisson scellé, le cadenas
    D.el("rect", { x: -18, y: -14, width: 36, height: 32, rx: 4, fill: "#f2eeee", stroke: C.rouge, "stroke-width": 3 }, e5);
    D.el("path", { d: "M-6 2 v-5 q0 -8 6 -8 q6 0 6 8 v5", fill: "none", stroke: C.rouge, "stroke-width": 3 }, e5);
    D.el("rect", { x: -9, y: 2, width: 18, height: 12, rx: 2, fill: C.rouge }, e5);
    // le repère qui descend l'échelle, et la ligne qu'il laisse derrière lui
    const trace = D.el("path", { d: "M0 0", fill: "none", stroke: ACCENT, "stroke-width": 4, "stroke-linecap": "round", opacity: 0 }, r);
    const repere = D.el("path", { d: "M-9 -11 L9 0 L-9 11 Z", fill: ACCENT, opacity: 0 }, r);
    return t => {
      const f = FIGE ? 9.4 : t % 11;
      voir(r, ap(f, 0, 0.4) * (1 - ap(f, 10.4, 0.5)));
      const T = k => 1.0 + 1.5 * k;
      lignes.forEach((l, k) => {
        voir(l.g, ap(f, 0.2 + 0.12 * k, 0.4));
        const actif = f >= T(k) && (f < T(k) + 1.5 || k === 4), fait = f >= T(k);
        const dernier = k === 4 && fait;
        l.cadre.setAttribute("fill", actif ? (dernier ? ORANGE_FOND : "#efece9") : C.papier);
        l.cadre.setAttribute("stroke", dernier ? ORANGE : fait ? ACCENT : FILET);
        l.cadre.setAttribute("stroke-width", actif ? 5 : fait ? 3 : 2.5);
        l.sous.setAttribute("fill", dernier ? ORANGE_TXT : C.gris); l.sous.setAttribute("font-weight", dernier ? 700 : 400);
        voir(l.ex, ap(f, T(k) + 0.2, 0.4));
      });
      const y = D.courbe([[T(0) - 0.4, lignes[0].yc], [T(1), lignes[1].yc], [T(2), lignes[2].yc], [T(3), lignes[3].yc], [T(4), lignes[4].yc]], f);
      repere.setAttribute("transform", `translate(329 ${y.toFixed(1)})`);
      trace.setAttribute("d", `M329 ${lignes[0].yc} V${y.toFixed(1)}`);
      voir(repere, ap(f, T(0) - 0.4, 0.3)); voir(trace, ap(f, T(0) - 0.4, 0.3));
      b2.maj(t);
    };
  }

  /* ---------- les cinq étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "dechets-responsabilites", titre: "Jusqu'au traitement", bulle: ["Qui répond", "du déchet ?"], bras: -72, cycle: 12, dessiner: remise,
      dire: "Responsabilités — Le producteur reste responsable jusqu'à l'élimination ou la valorisation finale, même s'il remet le déchet à un tiers. Repreneur autorisé : le bordereau revient, le dossier est soldé. Sinon, la responsabilité reste." },
    { station: "dechets-sept-flux", titre: "La benne juste", bulle: ["Quelle benne", "pour ce déchet ?"], bras: -70, cycle: 12, dessiner: tri,
      dire: "Trier : les 7 flux — On trie à la source, matière par matière : sept familles de bennes, plus le tout-venant pour ce qui ne se trie pas. D'abord la matière, ensuite la benne." },
    { station: "dechets-dangereux", titre: "Le bordereau suit", bulle: ["Par où est passé", "ce déchet ?"], bras: -84, cycle: 11.4, dessiner: bordereau,
      dire: "Déchets dangereux — Un fluide récupéré non réutilisable est un déchet dangereux. Le bordereau de suivi (BSD), aujourd'hui numérique, le suit du producteur au transporteur puis au traiteur, chacun y apposant sa marque." },
    { station: "dechets-rep-batiment", titre: "Payé en amont", bulle: ["Qui paie la", "reprise ?"], bras: -68, cycle: 12, dessiner: reprise,
      dire: "La REP bâtiment — Le metteur sur le marché finance la fin de vie par une éco-contribution, qui paie l'éco-organisme. Il organise les points de reprise : le trié y est accepté, le mélangé refusé." },
    { station: "dechets-valoriser", titre: "Éliminer en dernier", bulle: ["Je peux éliminer", "ce déchet ?"], bras: -100, cycle: 11, dessiner: escalier,
      dire: "Valoriser — Cinq niveaux, du meilleur au dernier recours : prévention, réemploi, recyclage, valorisation énergétique, élimination. On n'élimine que si rien d'autre n'est possible." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires suit un déchet de chantier en cinq étapes : " +
    "la responsabilité qui reste engagée tant que le repreneur n'est pas autorisé (responsabilités), le tri matière par matière vers la bonne benne (les sept flux), " +
    "le bordereau qui suit le déchet dangereux du producteur au traiteur, la reprise financée en amont par le metteur sur le marché (REP bâtiment), " +
    "l'ordre des traitements de la prévention à l'élimination (valoriser).");
  D.el("rect", { x: 0, y: 0, width: 1000, height: 440, fill: C.papier }, dessin);
  /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
     cartouche « .fr » (celui de l'en-tête des stations) à la place de « Studio » (vidéos) */
  D.filigrane(dessin, [[205, 120], [500, 236], [800, 352]], 300).querySelectorAll("text")
    .forEach(t => { if (t.textContent === "Studio") t.textContent = ".fr"; });
  D.el("path", { d: "M24 410 H286", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, dessin);
  const charge = bonhomme(dessin, { dossier: true });
  const bulle = D.el("g", {}, dessin);
  D.el("path", { d: "M30 30 H286 Q300 30 300 44 V136 Q300 150 286 150 H168 L136 188 L144 150 H30 Q16 150 16 136 V44 Q16 30 30 30 Z",
    fill: C.papier, stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, bulle);
  const question = [82, 118].map(y => ecrire(bulle, 158, y, "", 26, { "text-anchor": "middle", "font-weight": 700, fill: C.navy }));
  const plateau = D.el("g", {}, dessin);
  const badge = D.el("g", { opacity: 0 }, dessin);
  D.el("rect", { x: 796, y: 10, width: 192, height: 42, rx: 21, fill: ACCENT }, badge);
  ecrire(badge, 892, 39, "★ Votre station", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.papier });

  let anime = null, debut = 0, brasDe = 0, brasVers = 0, brasIci = 0;
  function image(maintenant) {
    const t = (maintenant - debut) / 1000;
    if (anime) anime(t);
    brasIci = D.lerp(brasDe, brasVers, FIGE ? 1 : D.lisse(t / 0.6));
    charge({ x: 128, y: 205.6, k: 2.8, t: maintenant / 1000, bras: brasIci + (FIGE ? 0 : Math.sin(maintenant / 700) * 3) });
  }
  function peindre(i) {
    while (plateau.firstChild) plateau.removeChild(plateau.firstChild);
    anime = ETAPES[i].dessiner(plateau);
    ETAPES[i].bulle.forEach((s, k) => { question[k].textContent = s; });
    badge.setAttribute("opacity", ETAPES[i].station === hote.dataset.station ? 1 : 0);
    brasDe = brasIci; brasVers = ETAPES[i].bras; debut = performance.now();
    image(debut);
  }
  if (!FIGE) {
    const boucle = maintenant => {
      if (dessin.isConnected && dessin.getClientRects().length) image(maintenant);
      requestAnimationFrame(boucle);
    };
    requestAnimationFrame(boucle);
  }

  const bloc = pasAPas(dessin, ETAPES.map((e, i) => ({ titre: e.titre, dire: e.dire, peindre: () => peindre(i) })),
    "La branche en " + ["", "une", "deux", "trois", "quatre", "cinq", "six"][ETAPES.length] + " étapes, une par station ; ★ marque l'étape de cette station. « ▶ Dérouler » joue toute la branche.");
  hote.appendChild(bloc);

  /* l'étape de la station : marquée ★ et ouverte d'emblée */
  const boutons = Array.from(bloc.querySelectorAll("button[data-etape]"));
  const ici = ETAPES.findIndex(e => e.station === hote.dataset.station);
  if (ici >= 0) {
    boutons[ici].textContent = "★ " + boutons[ici].textContent;
    boutons[ici].classList.add("etape-ici");
    boutons[ici].title = "L'étape de cette station";
    boutons[ici].click();
  }

  /* « ▶ Dérouler » : toute la branche depuis l'étape 1, chaque étape le temps de son cycle.
     Écouteur en capture sur la barre : il passe avant celui du kit, qui ne part donc pas. */
  const barre = bloc.querySelector(".choix"), btFilm = barre.querySelector("button.primary");
  let minuterie = null;
  const finFilm = () => { clearTimeout(minuterie); minuterie = null; btFilm.textContent = "▶ Dérouler"; btFilm.setAttribute("aria-pressed", "false"); };
  const jouer = i => {
    boutons[i].click();
    minuterie = setTimeout(() => (dessin.isConnected && i + 1 < ETAPES.length ? jouer(i + 1) : finFilm()), ETAPES[i].cycle * 1000);
  };
  barre.addEventListener("click", e => {
    if (e.target === btFilm) {
      e.stopPropagation();
      if (minuterie) return finFilm();
      btFilm.textContent = "⏸ Arrêter"; btFilm.setAttribute("aria-pressed", "true");
      jouer(0);
    } else if (e.isTrusted && minuterie) finFilm();   // l'élève choisit une étape : le film s'arrête
  }, true);
})();

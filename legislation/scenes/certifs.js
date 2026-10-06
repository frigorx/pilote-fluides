/* =====================================================================
   scenes/certifs.js — la scène de la branche « Certifications & normes »
   ---------------------------------------------------------------------
   Remplace l'image scene-certifs.webp en tête de l'accueil des quatre
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="certifs" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Même mécanique que scenes/fluidique.js (le pilote) : SceneKit (pas à pas,
   une étape par station de la branche, dans l'ordre du plan ; l'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche, chaque étape le temps de son cycle) et VOYAGE_DESSIN pour le
   dessin et le filigrane R9. Le chargé d'affaires est le bonhomme du pilote,
   recopié tel quel. Les deux moteurs sont LUS, jamais modifiés.

   Les quatre dessins montrent le mécanisme de chaque station, avec les seuls
   faits de la station : la pyramide des textes qui obligent, puis les deux
   portes par où une norme ou un DTU finit par s'imposer (l'arrêté, le
   marché) ; le colis qui porte le CE et sa déclaration des performances le
   long de la chaîne, chaque maillon vérifiant ce qui le concerne ; la porte
   de l'aide qui ne s'ouvre qu'avec la qualification du bon domaine ; les trois
   garanties qui partent de la même réception, sur la même échelle. Aucune
   valeur chiffrée nouvelle, aucune image, aucun logo : les mentions (CE, RGE,
   QualiPAC) ne sont que de simples cartouches de texte.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités ; tout bouge par le temps t
   (requestAnimationFrame) ; seul l'interrupteur « Animations » du site
   (moteur/animations.js, choix explicite de l'utilisateur) fige le dessin
   sur l'image finale de chaque étape.
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="certifs"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#3730a3";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
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

  const TEINTE = "#e7e5f8";          // le fond clair de l'accent de la branche
  const FILET = "#9aaabb";           // le trait des cadres au repos et des repères
  const ENCRE_ORANGE = "#9a3412";    // le texte posé à côté d'un accent orange (contraste)

  /* un texte en gras, centré par défaut */
  const gras = (parent, x, y, s, coul, taille, at) =>
    ecrire(parent, x, y, s, taille || 22, Object.assign({ "text-anchor": "middle", "font-weight": 700, fill: coul || C.navy }, at || {}));
  /* pointe de flèche : triangle plein dont la pointe est en (x, y), tourné de ang degrés (0 = vers la droite) */
  const pointe = (parent, x, y, ang, coul) =>
    D.el("path", { d: "M0 0 L-15 -8.5 L-15 8.5 Z", fill: coul, opacity: 0, transform: `translate(${x} ${y}) rotate(${ang})` }, parent);
  /* un trait qui se dessine (pathLength 100) : tire(p, q), q de 0 à 1 ; invisible tant que q ≤ 0 */
  const trace = (parent, d, coul, ep) =>
    D.el("path", { d: d, fill: "none", stroke: coul, "stroke-width": ep || 4, "stroke-linecap": "round", "stroke-linejoin": "round",
      pathLength: 100, "stroke-dasharray": 100, "stroke-dashoffset": 100, opacity: 0 }, parent);
  const tire = (p, q) => { p.setAttribute("stroke-dashoffset", (100 * (1 - D.borne(q, 0, 1))).toFixed(1)); voir(p, q > 0 ? 1 : 0); };
  /* la croix rouge du « non » (sœur de coche()) */
  const croix = (parent, x, y) => {
    const c = D.el("g", { opacity: 0 }, parent);
    D.el("circle", { cx: x, cy: y, r: 15, fill: C.rouge }, c);
    D.el("path", { d: `M${x - 6} ${y - 6} L${x + 6} ${y + 6} M${x + 6} ${y - 6} L${x - 6} ${y + 6}`, fill: "none", stroke: C.papier, "stroke-width": 3.5, "stroke-linecap": "round" }, c);
    return c;
  };

  /* ---------- étape 1 · Loi, norme ou DTU ? : la pyramide qui oblige, puis les deux portes par où la norme et le DTU s'imposent ---------- */
  function pyramide(g) {
    const R = D.el("g", {}, g);
    // quatre trapèzes empilés, du plus étroit (en haut) au plus large (en bas) : on les pose du bas vers le haut
    const CX = 555, Y0 = 62, H = 44, PAS = 48, L0 = 216, PENTE = 0.766;
    const larg = y => L0 + PENTE * (y - Y0);
    const etages = ["Union européenne", "loi", "décret", "arrêté"].map((nom, i) => {
      const yh = Y0 + i * PAS, yb = yh + H, wh = larg(yh) / 2, wb = larg(yb) / 2;
      const e = D.el("g", { opacity: 0 }, R);
      D.el("path", { d: `M${(CX - wh).toFixed(1)} ${yh} H${(CX + wh).toFixed(1)} L${(CX + wb).toFixed(1)} ${yb} H${(CX - wb).toFixed(1)} Z`,
        fill: TEINTE, stroke: ACCENT, "stroke-width": 3.5, "stroke-linejoin": "round" }, e);
      gras(e, CX, yh + H / 2 + 7.5, nom, C.navy);
      return { g: e };
    });
    // l'accolade : tout ce qui est dans la pyramide oblige
    const crochet = D.el("g", { opacity: 0 }, R);
    D.el("path", { d: "M748 64 H758 V248 H748", fill: "none", stroke: ACCENT, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, crochet);
    gras(crochet, 774, 164, "ils obligent", ACCENT, 22, { "text-anchor": "start" });
    // hors de la pyramide : trois références, en trait tireté tant que rien ne les rend obligatoires
    const puce = (x, titre, statut) => {
      const c = D.el("g", { opacity: 0 }, R);
      const r = D.el("rect", { x: x, y: 350, width: 196, height: 72, rx: 12, fill: C.papier, stroke: C.gris, "stroke-width": 3, "stroke-dasharray": "9 6" }, c);
      gras(c, x + 98, 379.5, titre, C.navy);
      const st = gras(c, x + 98, 407.5, statut, C.gris, 22, { "font-weight": 400 });
      return { g: c, r: r, st: st, cx: x + 98 };
    };
    const pN = puce(322, "norme", "volontaire"), pD = puce(548, "DTU", "règles de l'art"), pA = puce(774, "avis technique", "éclaire");
    const bascule = (p, oui, avant) => {
      p.r.setAttribute("stroke", oui ? ACCENT : C.gris); p.r.setAttribute("stroke-width", oui ? 4.5 : 3);
      p.r.setAttribute("stroke-dasharray", oui ? "none" : "9 6"); p.r.setAttribute("fill", oui ? TEINTE : C.papier);
      p.st.textContent = oui ? "obligatoire" : avant;
      p.st.setAttribute("fill", oui ? ACCENT : C.gris); p.st.setAttribute("font-weight", oui ? 700 : 400);
    };
    const pop = (p, dt) => {
      const s = 1 + 0.07 * Math.sin(D.borne(dt / 0.5, 0, 1) * Math.PI);
      p.g.setAttribute("transform", `translate(${p.cx} 386) scale(${s.toFixed(3)}) translate(${-p.cx} -386)`);
    };
    // « rend obligatoire » : de l'arrêté (le bas de la pyramide) vers la norme — l'accent orange de l'étape
    const fA = trace(R, "M420 256 V329", C.orange, 5), tA = pointe(R, 420, 344, 90, C.orange);
    const jeton = D.el("circle", { cx: 420, cy: 256, r: 8, fill: C.orange, stroke: C.papier, "stroke-width": 2.5, opacity: 0 }, R);
    const lA = gras(R, 434, 332, "rend obligatoire", ENCRE_ORANGE, 22, { "text-anchor": "start", opacity: 0 });
    // « y renvoie » : le marché, vers le DTU
    const marche = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 595, y: 262, width: 130, height: 44, rx: 10, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, marche);
    gras(marche, 660, 291.5, "le marché", C.navy);
    const fB = trace(R, "M660 310 V334", C.navy, 5), tB = pointe(R, 660, 346, 90, C.navy);
    const lB = gras(R, 674, 332, "y renvoie", C.navy, 22, { "text-anchor": "start", opacity: 0 });
    let nOui = false, dOui = false;
    return t => {
      const f = FIGE ? 9.9 : t % 11.4;
      voir(R, 1 - D.lisse((f - 10.8) / 0.5));
      etages.forEach((e, i) => {                      // de bas en haut : arrêté, décret, loi, Union européenne
        const p = D.lisse((f - 0.4 - (3 - i) * 0.65) / 0.5);
        voir(e.g, p);
        e.g.setAttribute("transform", `translate(0 ${(6 * (1 - p)).toFixed(1)})`);
      });
      voir(crochet, D.lisse((f - 3.2) / 0.5));
      [pN, pD, pA].forEach((p, k) => voir(p.g, D.lisse((f - 4 - 0.2 * k) / 0.5)));
      const ua = D.lisse((f - 5) / 0.8);               // la flèche part de l'arrêté et rejoint la norme
      tire(fA, ua); voir(tA, D.lisse((f - 5.7) / 0.2)); voir(lA, D.lisse((f - 5.3) / 0.4));
      jeton.setAttribute("cy", (256 + 78 * ua).toFixed(1)); voir(jeton, ua > 0 && ua < 1 ? 1 : 0);
      if ((f >= 6.2) !== nOui) { nOui = f >= 6.2; bascule(pN, nOui, "volontaire"); }
      pop(pN, f - 6.2);
      voir(marche, D.lisse((f - 7.2) / 0.4));
      const ub = D.lisse((f - 7.6) / 0.6);             // le marché renvoie au DTU
      tire(fB, ub); voir(tB, D.lisse((f - 8.1) / 0.2)); voir(lB, D.lisse((f - 7.9) / 0.4));
      if ((f >= 8.7) !== dOui) { dOui = f >= 8.7; bascule(pD, dOui, "règles de l'art"); }
      pop(pD, f - 8.7);
    };
  }

  /* ---------- étape 2 · Le marquage CE : le colis descend la chaîne avec sa déclaration, chaque maillon vérifie ---------- */
  function chaine(g) {
    const R = D.el("g", {}, g);
    const RX = 342, Y = [108, 164, 220, 276, 332], T = [0.9, 2.7, 4.5, 6.3, 8.1];   // T : l'instant où le colis arrive au maillon
    const NOMS = ["Fabricant", "Importateur", "Distributeur", "Entreprise", "Chantier"];
    const VERIF = ["établit la DoP, appose le CE", "produit venu de hors de l'Union", "vérifie le CE et la notice",
                   "compare à ce que le projet demande", "non conforme : on remonte la chaîne"];
    D.el("path", { d: `M${RX} ${Y[0]} V${Y[4]}`, stroke: C.gris, "stroke-width": 4, "stroke-linecap": "round" }, R);
    const noeuds = Y.map((y, i) => D.el("circle", { cx: RX, cy: y, r: 13, fill: C.papier, stroke: i === 1 ? C.gris : C.navy,
      "stroke-width": 3.5, "stroke-dasharray": i === 1 ? "5 4" : "none" }, R));
    const noms = NOMS.map((n, i) => gras(R, 466, Y[i] + 7.5, n, i === 1 ? C.gris : C.navy, 22, { "text-anchor": "start", opacity: 0 }));
    const verifs = VERIF.map((v, i) => ecrire(R, 596, Y[i] + 7.5, v, 22, { fill: i === 1 ? C.gris : ENCRE, opacity: 0 }));
    const oks = [0, 2, 3].map(i => coche(R, 950, Y[i]));                       // l'importateur est facultatif : pas de coche
    const remonte = D.el("path", { d: `M950 ${Y[4] + 14} V${Y[4] - 14} M940 ${Y[4] - 4} L950 ${Y[4] - 15} L960 ${Y[4] - 4}`, fill: "none",
      stroke: ACCENT, "stroke-width": 4.5, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, R);
    // le colis : une boîte à l'accent orange de l'étape, le CE et la déclaration des performances posés dessus
    const colis = D.el("g", { opacity: 0 }, R);
    D.el("path", { d: "M-40 -36 L-30 -46 H30 L40 -36 Z", fill: "#f8d3b0", stroke: C.orange, "stroke-width": 4, "stroke-linejoin": "round" }, colis);
    D.el("rect", { x: -40, y: -36, width: 80, height: 72, rx: 6, fill: "#fbe7d3", stroke: C.orange, "stroke-width": 4 }, colis);
    const ce = gras(colis, 0, -6, "CE", ACCENT, 22, { opacity: 0 }), dop = gras(colis, 0, 22, "DoP", C.navy, 22, { opacity: 0 });
    const bande = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 450, y: 386, width: 420, height: 44, rx: 12, fill: "#e6f0f6", stroke: ACCENT, "stroke-width": 2.5 }, bande);
    gras(bande, 660, 415.5, "Le CE est une déclaration, pas un label", ACCENT);
    return t => {
      const f = FIGE ? 9.9 : t % 11.4;
      voir(R, 1 - D.lisse((f - 10.8) / 0.5));
      const yc = D.courbe([[0.9, Y[0]], [1.4, Y[0]], [2.7, Y[1]], [3.2, Y[1]], [4.5, Y[2]], [5, Y[2]], [6.3, Y[3]], [6.8, Y[3]], [8.1, Y[4]]], f);
      colis.setAttribute("transform", `translate(406 ${yc.toFixed(1)})`);
      voir(colis, D.lisse((f - 0.35) / 0.4));
      voir(ce, D.lisse((f - 1) / 0.3)); voir(dop, D.lisse((f - 1.35) / 0.3));
      ce.setAttribute("transform", `translate(0 -13) scale(${(1 + 0.35 * (1 - D.lisse((f - 1) / 0.3))).toFixed(3)}) translate(0 13)`);
      Y.forEach((y, i) => {
        voir(noms[i], D.lisse((f - T[i] + 0.3) / 0.35)); voir(verifs[i], D.lisse((f - T[i] + 0.05) / 0.4));
        noeuds[i].setAttribute("fill", f >= T[i] ? (i === 1 ? "#dfe5ec" : ACCENT) : C.papier);
      });
      [0, 2, 3].forEach((i, k) => voir(oks[k], D.lisse((f - T[i] - 0.5) / 0.3)));
      voir(remonte, D.lisse((f - T[4] - 0.5) / 0.3));
      voir(bande, D.lisse((f - 9) / 0.4));
    };
  }

  /* ---------- étape 3 · RGE & QualiPAC : la porte de l'aide ne s'ouvre qu'avec la qualification du bon domaine ---------- */
  function aide(g) {
    const R = D.el("g", {}, g);
    // la demande du client
    const carte = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 330, y: 186, width: 226, height: 80, rx: 12, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, carte);
    ecrire(carte, 443, 219.5, "Le client demande", 22, { "text-anchor": "middle" });
    gras(carte, 443, 247.5, "pompe à chaleur", C.navy);
    // deux entreprises : une enseigne RGE avec son domaine ; la seconde porte l'accent orange de l'étape
    const enseigne = (y, domaine, coul, fond) => {
      const e = D.el("g", { opacity: 0 }, R);
      D.el("rect", { x: 596, y: y, width: 154, height: 80, rx: 12, fill: fond, stroke: coul, "stroke-width": 4 }, e);
      gras(e, 673, y + 33.5, "RGE", ACCENT);
      gras(e, 673, y + 61.5, domaine, C.navy);
      return e;
    };
    const s1 = enseigne(115, "Qualibois", C.gris, C.papier), s2 = enseigne(219, "QualiPAC", C.orange, "#fff4ec");
    // de la demande vers chaque entreprise
    const l1 = trace(R, "M558 226 H578 V155", C.gris, 4), h1 = pointe(R, 592, 155, 0, C.gris);
    const l2 = trace(R, "M578 226 V259", C.gris, 4), h2 = pointe(R, 592, 259, 0, C.gris);
    // de chaque entreprise vers la porte, avec le verdict sur l'enseigne
    const a1 = trace(R, "M754 155 H811", C.gris, 4), ha1 = pointe(R, 826, 155, 0, C.gris);
    const a2 = trace(R, "M754 259 H811", C.vert, 4), ha2 = pointe(R, 826, 259, 0, C.vert);
    const non = croix(R, 750, 115), oui = coche(R, 750, 219);
    // la porte de l'aide : le cadre, l'ouverture, le vantail qui pivote sur son bord gauche, le cadenas
    const PX = 836, PW = 116, PY = 112, PH = 188;
    const labelAide = gras(R, PX + PW / 2, 92, "L'aide", C.navy, 24, { opacity: 0 });
    const porte = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: PX - 5, y: PY - 5, width: PW + 10, height: PH + 10, rx: 10, fill: "#e0f2e9", stroke: C.navy, "stroke-width": 4 }, porte);
    const vantail = D.el("g", {}, porte);
    D.el("rect", { x: PX, y: PY, width: PW, height: PH, rx: 6, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 3 }, vantail);
    D.el("rect", { x: PX + 14, y: PY + 14, width: PW - 28, height: 66, rx: 4, fill: "none", stroke: FILET, "stroke-width": 2.5 }, vantail);
    D.el("rect", { x: PX + 14, y: PY + 108, width: PW - 28, height: 66, rx: 4, fill: "none", stroke: FILET, "stroke-width": 2.5 }, vantail);
    const cadenas = D.el("g", {}, porte);
    D.el("path", { d: "M-10 -2 V-12 a10 10 0 0 1 20 0 V-2", fill: "none", stroke: C.navy, "stroke-width": 5, "stroke-linecap": "round" }, cadenas);
    D.el("rect", { x: -18, y: -2, width: 36, height: 30, rx: 4, fill: C.navy }, cadenas);
    D.el("circle", { cx: 0, cy: 11, r: 4, fill: C.papier }, cadenas);
    const statut = gras(R, PX + PW / 2, 336, "fermée", C.rouge, 22, { opacity: 0 });
    const bande = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 424, y: 376, width: 440, height: 48, rx: 12, fill: "#e6f0f6", stroke: ACCENT, "stroke-width": 2.5 }, bande);
    gras(bande, 644, 407.5, "La qualification est propre à un domaine", ACCENT);
    let ouverte = false;
    return t => {
      const f = FIGE ? 9.9 : t % 11.4;
      voir(R, 1 - D.lisse((f - 10.8) / 0.5));
      voir(carte, D.lisse((f - 0.3) / 0.4));
      voir(porte, D.lisse((f - 0.6) / 0.4)); voir(labelAide, D.lisse((f - 0.6) / 0.4)); voir(statut, D.lisse((f - 0.8) / 0.4));
      // la première entreprise : son domaine n'est pas celui des travaux, la porte reste fermée
      tire(l1, D.lisse((f - 1.1) / 0.5)); voir(h1, D.lisse((f - 1.5) / 0.2));
      voir(s1, D.lisse((f - 1.5) / 0.4) * (1 - 0.45 * D.lisse((f - 4.2) / 0.4)));
      tire(a1, D.lisse((f - 2.2) / 0.5)); voir(ha1, D.lisse((f - 2.65) / 0.2));
      voir(non, D.lisse((f - 2.9) / 0.25));
      const sec = f > 2.9 && f < 3.8 ? Math.sin((f - 2.9) * 42) * 4 * (1 - (f - 2.9) / 0.9) : 0;
      porte.setAttribute("transform", `translate(${sec.toFixed(2)} 0)`);
      // la seconde : QualiPAC correspond aux travaux, la porte s'ouvre
      tire(l2, D.lisse((f - 4.2) / 0.5)); voir(h2, D.lisse((f - 4.65) / 0.2));
      voir(s2, D.lisse((f - 4.6) / 0.4));
      tire(a2, D.lisse((f - 5.2) / 0.5)); voir(ha2, D.lisse((f - 5.65) / 0.2));
      voir(oui, D.lisse((f - 5.9) / 0.25));
      const ouv = D.lisse((f - 6) / 0.9);
      vantail.setAttribute("transform", `translate(${PX} 0) scale(${(1 - 0.8 * ouv).toFixed(3)} 1) translate(${-PX} 0)`);
      cadenas.setAttribute("transform", `translate(${PX + PW / 2} ${PY + PH / 2}) scale(${(1 - 0.5 * ouv).toFixed(3)})`);
      voir(cadenas, 1 - D.lisse((f - 5.95) / 0.35));
      if ((f >= 6.6) !== ouverte) {
        ouverte = f >= 6.6;
        statut.textContent = ouverte ? "ouverte" : "fermée"; statut.setAttribute("fill", ouverte ? C.vert : C.rouge);
      }
      voir(bande, D.lisse((f - 8) / 0.4));
    };
  }

  /* ---------- étape 4 · Les garanties : un seul départ, la réception ; trois durées, sur la même échelle ---------- */
  function frise(g) {
    const R = D.el("g", {}, g);
    const X0 = 340, K = 60, YR = 306;                  // 60 unités par an ; la règle à y = 306
    // l'échelle commune : une règle graduée à l'année, trois repères nommés
    D.el("path", { d: `M${X0} ${YR} H${X0 + 10 * K}`, stroke: FILET, "stroke-width": 3, "stroke-linecap": "round" }, R);
    let graduation = "";
    for (let a = 0; a <= 10; a++) graduation += `M${X0 + a * K} ${YR - ([1, 2, 10].includes(a) ? 8 : 5)} V${YR + ([1, 2, 10].includes(a) ? 12 : 8)} `;
    D.el("path", { d: graduation.trim(), fill: "none", stroke: FILET, "stroke-width": 3, "stroke-linecap": "round" }, R);
    [["1 an", 1], ["2 ans", 2], ["10 ans", 10]].forEach(([s, a]) => gras(R, X0 + a * K, 348, s, C.navy, 22, { "font-weight": 400 }));
    // les repères qui descendent de la fin de chaque barre (derrière les barres)
    const BARRES = [{ ans: 1, y: 104, coul: "#6d5fd4" }, { ans: 2, y: 164, coul: C.bleu }, { ans: 10, y: 224, coul: ACCENT }], HB = 44;   // HB : hauteur d'une barre
    const reperes = BARRES.map(b => D.el("path", { d: `M${X0 + b.ans * K} ${b.y + HB} V${YR - 8}`, stroke: FILET, "stroke-width": 2.5,
      "stroke-dasharray": "4 5", "stroke-linecap": "round", opacity: 0 }, R));
    // l'avancée dans le temps, sur la règle
    const avance = D.el("path", { d: `M${X0} ${YR} H${X0}`, stroke: ACCENT, "stroke-width": 7, "stroke-linecap": "round", opacity: 0 }, R);
    const barres = BARRES.map(b => D.el("rect", { x: X0, y: b.y, width: 0, height: HB, rx: 8, fill: b.coul }, R));
    const jeton = D.el("circle", { cx: X0, cy: YR, r: 9, fill: C.navy, stroke: C.papier, "stroke-width": 2.5, opacity: 0 }, R);
    // les noms, à droite de la fin de chaque barre (le dernier, dans la barre)
    const nom1 = gras(R, X0 + K + 14, 133.5, "parfait achèvement", C.navy, 22, { "text-anchor": "start", opacity: 0 });
    const nom2 = gras(R, X0 + 2 * K + 14, 193.5, "bon fonctionnement", C.navy, 22, { "text-anchor": "start", opacity: 0 });
    D.el("tspan", { "font-weight": 400, fill: C.gris }, nom2).textContent = " · au minimum";
    const nom3 = gras(R, X0 + 10 * K - 14, 253.5, "décennale", C.papier, 22, { "text-anchor": "end", opacity: 0 });
    // la réception : l'unique point de départ, l'accent orange de l'étape
    const depart = D.el("g", { opacity: 0 }, R);
    D.el("path", { d: `M${X0} 90 V${YR + 12}`, stroke: C.orange, "stroke-width": 4, "stroke-linecap": "round" }, depart);
    D.el("circle", { cx: X0, cy: 82, r: 9, fill: C.orange, stroke: C.papier, "stroke-width": 2.5 }, depart);
    gras(depart, X0 + 16, 90, "réception", ENCRE_ORANGE, 22, { "text-anchor": "start" });
    const bande = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 490, y: 378, width: 300, height: 44, rx: 12, fill: "#e6f0f6", stroke: ACCENT, "stroke-width": 2.5 }, bande);
    gras(bande, 640, 407.5, "Même départ, trois durées", ACCENT);
    return t => {
      const f = FIGE ? 10 : t % 11.2;
      voir(R, 1 - D.lisse((f - 10.6) / 0.5));
      voir(depart, D.lisse((f - 0.2) / 0.5));
      // le temps passe : 1 an, puis 2 ans, puis jusqu'à 10 ans — chaque barre s'arrête à sa durée
      const tau = D.courbe([[1.3, 0], [2.4, 1], [3.1, 1], [4.1, 2], [4.8, 2], [8.6, 10]], f);
      barres.forEach((e, i) => e.setAttribute("width", (K * Math.min(tau, BARRES[i].ans)).toFixed(1)));
      avance.setAttribute("d", `M${X0} ${YR} H${(X0 + K * tau).toFixed(1)}`); voir(avance, f > 1.25 ? 1 : 0);
      jeton.setAttribute("cx", (X0 + K * tau).toFixed(1)); voir(jeton, D.lisse((f - 1.2) / 0.3));
      voir(nom1, D.lisse((f - 2.4) / 0.4)); voir(reperes[0], D.lisse((f - 2.4) / 0.4));
      voir(nom2, D.lisse((f - 4.1) / 0.4)); voir(reperes[1], D.lisse((f - 4.1) / 0.4));
      voir(nom3, D.lisse((f - 8.6) / 0.4)); voir(reperes[2], D.lisse((f - 8.6) / 0.4));
      voir(bande, D.lisse((f - 9.2) / 0.4));
    };
  }

  /* ---------- les quatre étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "certif-loi-norme-dtu", titre: "Qui oblige quoi ?", bulle: ["Cette référence", "m'oblige-t-elle ?"], bras: -72, cycle: 11.4, dessiner: pyramide,
      dire: "Loi, norme ou DTU ? — Les textes de la pyramide obligent. Une norme est volontaire, sauf si un arrêté la rend obligatoire. Un DTU s'impose si le marché y renvoie." },
    { station: "certif-marquage-ce", titre: "Le marquage CE", bulle: ["Que dit le CE", "sur ce produit ?"], bras: -66, cycle: 11.4, dessiner: chaine,
      dire: "Le marquage CE — Le CE est la déclaration du fabricant, pas un label de qualité. Le produit descend la chaîne avec sa déclaration des performances : chaque maillon vérifie ce qui le concerne." },
    { station: "certif-rge-qualipac", titre: "L'aide s'ouvre", bulle: ["Le client aura", "l'aide ?"], bras: -88, cycle: 11.4, dessiner: aide,
      dire: "RGE & QualiPAC — L'aide dépend de l'entreprise : sans la mention RGE pour ces travaux, la porte reste fermée. Qualibois ne couvre pas une pompe à chaleur ; QualiPAC, si." },
    { station: "certif-garanties", titre: "Les trois durées", bulle: ["Quelle garantie", "joue, et quand ?"], bras: -78, cycle: 11.2, dessiner: frise,
      dire: "Les garanties — Tout part de la réception : parfait achèvement, un an ; bon fonctionnement, deux ans au minimum ; décennale, dix ans. Même point de départ, trois durées." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires parcourt les certifications d'une affaire en quatre étapes : " +
    "savoir ce qui oblige, de la loi au DTU (Loi, norme ou DTU ?), suivre le produit et son marquage CE jusqu'au chantier (le marquage CE), " +
    "vérifier la qualification RGE qui ouvre l'aide (RGE & QualiPAC), compter les trois garanties à partir de la réception (les garanties).");
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

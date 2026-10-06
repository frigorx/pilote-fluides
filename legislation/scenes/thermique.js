/* =====================================================================
   scenes/thermique.js — la scène de la branche « Thermique »
   ---------------------------------------------------------------------
   Remplace l'image scene-thermique.webp en tête de l'accueil des six
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="thermique" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Même mécanique que scenes/fluidique.js (le pilote) : SceneKit (pas à pas,
   une étape par station de la branche, dans l'ordre du plan ; l'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche, chaque étape le temps de son cycle) et VOYAGE_DESSIN pour le
   dessin et le filigrane R9. Le chargé d'affaires est le bonhomme du pilote,
   recopié tel quel. Les deux moteurs sont LUS, jamais modifiés.

   Les six dessins montrent le mécanisme de chaque station, avec les seuls
   faits de la station : la chaleur qui fuit puis l'exigence qui monte (1974 →
   RT2012 → RE2020), les six indicateurs dont chacun a sa limite, l'aire des
   degrés-heures que les leviers réduisent, le geste de remplacement qui
   déclenche l'exigence sur un composant, l'étiquette A-G qui suit le moins bon
   des deux résultats, la boucle des CEE. Aucune valeur chiffrée nouvelle,
   aucune image.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités ; tout bouge par le temps t
   (requestAnimationFrame), sans jamais tester prefers-reduced-motion ; seul
   l'interrupteur « Animations » du site (moteur/animations.js, choix explicite
   de l'utilisateur) fige le dessin sur l'image finale de chaque étape.
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="thermique"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#92400e";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
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

  const CREME = "#fff4e0";    // fond clair des mises en évidence (celui des illustrations des stations)
  const PAILLE = "#f1d3a1";   // l'isolant
  const FILET = "#9aaabb";    // le trait des cadres au repos

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

  /* une maison de profil : murs l × h posés sur ySol, centrés en cx, toit de hauteur ht ; le trait est posé par l'appelant */
  function maison(parent, cx, ySol, l, h, ht) {
    const toit = D.el("path", { d: `M${cx - l / 2 - 14} ${ySol - h} L${cx} ${ySol - h - ht} L${cx + l / 2 + 14} ${ySol - h} Z`, fill: C.papier, "stroke-linejoin": "round" }, parent);
    const murs = D.el("rect", { x: cx - l / 2, y: ySol - h, width: l, height: h, fill: C.papier }, parent);
    return { toit, murs };
  }

  /* ---------- étape 1 · Pourquoi une RT ? : la chaleur fuit, puis chaque marche resserre l'exigence ---------- */
  function histoire(g) {
    const SOL = 355, CX = 452, LM = 124, HM = 76, HT = 56;
    D.el("path", { d: `M346 ${SOL} H558`, stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, g);
    const r = D.el("g", {}, g);
    const m = maison(r, CX, SOL, LM, HM, HT);
    [m.toit, m.murs].forEach(e => { e.setAttribute("stroke", C.navy); e.setAttribute("stroke-width", 4); });
    // l'isolant : une bande dans chaque mur et sous le toit, de plus en plus épaisse
    const bandeG = D.el("rect", { x: CX - LM / 2, y: SOL - HM, width: 0, height: HM, fill: PAILLE, stroke: ACCENT, "stroke-width": 2 }, r);
    const bandeD = D.el("rect", { x: CX + LM / 2, y: SOL - HM, width: 0, height: HM, fill: PAILLE, stroke: ACCENT, "stroke-width": 2 }, r);
    const isoToit = D.el("path", { fill: "none", stroke: PAILLE, "stroke-linejoin": "round" }, r);
    // la chaleur qui fuit : [x de départ, y de départ, angle, seuil de disparition, course]
    const FL = [[CX, 216, 0, 0.02, 34], [412.3, 242.4, -36, 0.5, 34], [491.7, 242.4, 36, 0.36, 34],
                [384, 300, -90, 0.05, 30], [384, 335, -90, 0.64, 30], [520, 300, 90, 0.44, 30], [520, 335, 90, 0.82, 30]];
    const chauds = FL.map(() => D.el("path", { d: "M0 0 V-28 M-9 -18 L0 -28 L9 -18", fill: "none", stroke: C.chaud, "stroke-width": 5,
      "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, r));
    // la légende du haut, qui change : avant, le choc, la première RT
    const MOTS = [["Avant 1974 : aucune règle nationale d'isolation", C.rouge, 330], ["Choc pétrolier de 1973", C.navy, 368],
                  ["1974 : première réglementation thermique", ACCENT, 330]];
    const cap = ecrire(r, 330, 98, "", 22, { "font-weight": 700, opacity: 0 });
    const baril = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 331, y: 78, width: 24, height: 32, rx: 7, fill: CREME, stroke: ACCENT, "stroke-width": 2.5 }, baril);
    D.el("path", { d: "M331 89 H355 M331 99 H355", stroke: ACCENT, "stroke-width": 2 }, baril);
    // l'escalier : une marche par génération, la dernière est la RT2012
    const H5 = [34, 68, 102, 136, 170];
    const marches = H5.map((h, k) => D.el("rect", { x: 600 + 78 * k, y: SOL, width: 78, height: 0, fill: k === 4 ? CREME : C.papier,
      stroke: k === 4 ? ACCENT : C.gris, "stroke-width": k === 4 ? 4 : 2.5 }, r));
    const lRT = ecrire(r, 951, 169, "RT2012", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    const frise = fleche(r, 600, 384, 988, 384, ACCENT, 4);
    const l1974 = ecrire(r, 600, 424, "1974", 22, { "font-weight": 700, fill: ACCENT, opacity: 0 });
    const lExig = ecrire(r, 790, 424, "plus d'exigence", 22, { "text-anchor": "middle", fill: C.navy, opacity: 0 });
    const lRE = ecrire(r, 988, 424, "RE2020", 22, { "text-anchor": "end", "font-weight": 700, fill: C.navy, opacity: 0 });
    let etat = -1;
    return t => {
      const f = FIGE ? 9.9 : t % 11.4;
      voir(r, D.lisse(f / 0.4) * (1 - D.lisse((f - 10.6) / 0.5)));
      const q = f < 3.3 ? 0 : f < 5.3 ? 1 : 2;
      if (q !== etat) { etat = q; cap.textContent = MOTS[q][0]; cap.setAttribute("fill", MOTS[q][1]); cap.setAttribute("x", MOTS[q][2]); }
      voir(cap, q === 0 ? D.fenetre(f, 0.3, 3.3, 0.3) : q === 1 ? D.fenetre(f, 3.4, 5.3, 0.3) : D.lisse((f - 5.4) / 0.3));
      voir(baril, q === 1 ? D.fenetre(f, 3.4, 5.3, 0.3) : 0);
      // l'isolant épaissit avec les marches, la chaleur perdue diminue
      const montee = D.borne((f - 5.6) / 3.5, 0, 1), w = 10 * D.lisse((f - 5.4) / 1) + 6 * montee;
      bandeG.setAttribute("width", w.toFixed(1));
      bandeD.setAttribute("width", w.toFixed(1)); bandeD.setAttribute("x", (CX + LM / 2 - w).toFixed(1));
      isoToit.setAttribute("stroke-width", w.toFixed(1));
      isoToit.setAttribute("d", `M${CX - LM / 2} ${(268.7 + w / 2).toFixed(1)} L${CX} ${(223 + w / 2).toFixed(1)} L${CX + LM / 2} ${(268.7 + w / 2).toFixed(1)}`);
      const a = 1 - 0.75 * D.lisse((f - 5.4) / 4);
      FL.forEach(([x, y, ang, seuil, course], k) => {
        const s = FIGE ? 0.5 : D.frac(f * 0.55 + k * 0.31), d = s * course, rad = ang * Math.PI / 180;
        chauds[k].setAttribute("transform", `translate(${(x + Math.sin(rad) * d).toFixed(1)} ${(y - Math.cos(rad) * d).toFixed(1)}) rotate(${ang})`);
        voir(chauds[k], D.fenetre(s, 0, 1, 0.25) * D.lisse((a - seuil) / 0.2));
      });
      marches.forEach((e, k) => {
        const h = H5[k] * D.lisse((f - 5.6 - k * 0.75) / 0.5);
        e.setAttribute("y", (SOL - h).toFixed(1)); e.setAttribute("height", h.toFixed(1));
      });
      frise(D.borne((f - 5.6) / 3.5, 0, 1));
      voir(l1974, D.lisse((f - 5.6) / 0.4)); voir(lExig, D.lisse((f - 7) / 0.4));
      voir(lRT, D.lisse((f - 9) / 0.4)); voir(lRE, D.lisse((f - 9.2) / 0.4));
    };
  }

  /* ---------- étape 2 · La RE2020 : six indicateurs, chacun sa limite, aucune compensation ---------- */
  function six(g) {
    const LG = [["Bbio", 0.62, 0.84], ["Cep", 0.70, 0.48], ["Cep,nr", 0.66, 0.44],
                ["Ic énergie", 0.60, 0.20], ["Ic construction", 0.72, 0.55], ["DH", 0.64, 0.40]];   // [nom, limite, résultat]
    const Y = [104, 150, 196, 254, 300, 358], X0 = 540, W = 360;
    // trois thèmes : énergie, carbone, confort d'été
    [[80, 220], [230, 324], [334, 382]].forEach(([a, b]) => D.el("rect", { x: 322, y: a, width: 660, height: b - a, rx: 12, fill: "#f3f6fb" }, g));
    LG.forEach(([nom], i) => {
      ecrire(g, 342, Y[i] + 8, nom, 22, { "font-weight": 700, fill: C.navy });
      D.el("rect", { x: X0, y: Y[i] - 10, width: W, height: 20, rx: 10, fill: "#dfe6ee" }, g);
    });
    const r = D.el("g", {}, g);
    const lignes = LG.map(([, lim, val], i) => ({
      barre: D.el("rect", { x: X0, y: Y[i] - 10, width: 0, height: 20, rx: 10, fill: C.bleu }, r), lim: lim, val: val, i: i }));
    LG.forEach(([, lim], i) => D.el("path", { d: `M${X0 + lim * W} ${Y[i] - 18} V${Y[i] + 18}`, stroke: C.rouge, "stroke-width": 3, "stroke-dasharray": "5 4" }, r));
    const verdicts = LG.map(([, lim, val], i) => (val > lim ? croix : coche)(r, 945, Y[i]));
    D.el("path", { d: "M340 404 V432", stroke: C.rouge, "stroke-width": 3, "stroke-dasharray": "5 4" }, r);
    ecrire(r, 354, 424, "limite", 22, { "font-weight": 700, fill: C.rouge });
    const message = ecrire(r, 700, 424, "Un dépassement ne se compense pas", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    return t => {
      const f = FIGE ? 7.4 : t % 10.5;
      voir(r, D.lisse(f / 0.4) * (1 - D.lisse((f - 9.5) / 0.5)));
      lignes.forEach(o => {
        const p = D.lisse((f - 0.8 - o.i * 0.7) / 0.9), v = o.val * p;
        o.barre.setAttribute("width", (v * W).toFixed(1));
        o.barre.setAttribute("fill", v > o.lim ? C.rouge : p >= 1 ? C.vert : C.bleu);
        voir(verdicts[o.i], D.lisse((f - 1.7 - o.i * 0.7) / 0.3));
      });
      const k = FIGE ? 1 : 1 + 0.16 * Math.max(0, Math.sin((f - 5.6) * 3.4)) * D.lisse((f - 5.6) / 0.5);
      verdicts[0].setAttribute("transform", `translate(945 ${Y[0]}) scale(${k.toFixed(3)}) translate(-945 ${-Y[0]})`);
      voir(message, D.lisse((f - 5.6) / 0.4));
    };
  }

  /* ---------- étape 3 · Le confort d'été : l'aire des degrés-heures, que les leviers réduisent dans l'ordre ---------- */
  function ete(g) {
    const X0 = 424, W = 262, YS = 232, N = 60;
    D.el("path", { d: "M420 332 V124", stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round" }, g);
    D.el("path", { d: "M412 126 L420 108 L428 126 Z", fill: C.navy }, g);
    D.el("path", { d: "M418 330 H682", stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round" }, g);
    D.el("path", { d: "M680 322 L698 330 L680 338 Z", fill: C.navy }, g);
    D.el("path", { d: `M422 ${YS} H690`, stroke: C.navy, "stroke-width": 3, "stroke-dasharray": "10 7" }, g);
    ecrire(g, 330, 88, "température", 22, {});
    ecrire(g, 698, 372, "temps", 22, { "text-anchor": "end" });
    ecrire(g, 330, 226, "seuil de", 22, {});
    ecrire(g, 330, 257, "confort", 22, {});
    const r = D.el("g", {}, g);
    const aire = D.el("path", { fill: C.rouge, "fill-opacity": 0.4 }, r);
    const aireBleue = D.el("path", { fill: C.bleu, "fill-opacity": 0.45 }, r);
    const courbe = D.el("path", { fill: "none", stroke: C.navy, "stroke-width": 4.5, "stroke-linejoin": "round" }, r);
    // la journée chaude : un sommet (A de haut, m place, w largeur) sur un fond de température yB
    const ETATS = [{ yB: 318, A: 196, m: 0.55, w: 0.28 }, { yB: 318, A: 150, m: 0.55, w: 0.28 },
                   { yB: 318, A: 118, m: 0.66, w: 0.30 }, { yB: 332, A: 118, m: 0.66, w: 0.30 }];
    // le panneau : l'aire rouge, puis les quatre leviers dans l'ordre
    const pastille = D.el("rect", { x: 738, y: 92, width: 24, height: 24, rx: 4, fill: C.rouge, "fill-opacity": 0.4, stroke: C.rouge, "stroke-width": 2.5 }, r);
    const legende = ecrire(r, 774, 112, "DH : l'aire rouge", 22, { "font-weight": 700, fill: C.navy });
    D.el("path", { d: "M714 150 V362", stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, r);
    D.el("path", { d: "M706 358 L714 376 L722 358 Z", fill: C.gris }, r);
    const NIV = ["Protection solaire", "Inertie", "Ventilation nocturne", "Climatiser en dernier"], YC = [168, 228, 288, 348];
    const leviers = NIV.map((n, i) => ({
      c: D.el("rect", { x: 730, y: YC[i] - 24, width: 258, height: 48, rx: 10, fill: C.papier, stroke: FILET, "stroke-width": 2.5 }, r),
      t: ecrire(r, 750, YC[i] + 8, n, 22, {}) }));
    let resteAvant = false;
    return t => {
      const f = FIGE ? 10.2 : t % 12;
      voir(r, D.lisse(f / 0.4) * (1 - D.lisse((f - 11.2) / 0.5)));
      const q = D.lisse((f - 1.6) / 1.2) + D.lisse((f - 4) / 1.2) + D.lisse((f - 6.4) / 1.2), i0 = Math.min(2, Math.floor(q)), fr = q - i0;
      const e = {};
      ["yB", "A", "m", "w"].forEach(k => { e[k] = D.lerp(ETATS[i0][k], ETATS[i0 + 1][k], fr); });
      const clim = D.lisse((f - 8.6) / 0.8);
      let d = "", da = `M${X0} ${YS}`;
      for (let i = 0; i <= N; i++) {
        const u = i / N, x = X0 + W * u, y = D.borne(e.yB - e.A * Math.exp(-(((u - e.m) / e.w) ** 2)), 112, 328);
        d += (i ? " L" : "M") + x.toFixed(1) + " " + D.lerp(y, Math.max(y, YS), clim).toFixed(1);
        da += ` L${x.toFixed(1)} ${Math.min(y, YS).toFixed(1)}`;
      }
      da += ` L${X0 + W} ${YS} Z`;
      courbe.setAttribute("d", d); aire.setAttribute("d", da); aireBleue.setAttribute("d", da);
      voir(aire, 1 - clim); voir(aireBleue, clim);
      const reste = clim > 0.5;   // la clim couvre ce qu'il reste : l'aire devient le besoin résiduel
      if (reste !== resteAvant) {
        resteAvant = reste; legende.textContent = reste ? "besoin résiduel" : "DH : l'aire rouge";
        pastille.setAttribute("fill", reste ? C.bleu : C.rouge); pastille.setAttribute("stroke", reste ? C.bleu : C.rouge);
      }
      const act = f < 1.4 ? -1 : f < 3.8 ? 0 : f < 6.2 ? 1 : f < 8.4 ? 2 : 3;
      leviers.forEach((o, i) => {
        const actif = i === act, fait = i < act, bleu = i === 3;
        o.c.setAttribute("fill", actif ? (bleu ? "#e8f1fb" : CREME) : C.papier);
        o.c.setAttribute("stroke", actif || fait ? (bleu ? C.bleu : ACCENT) : FILET);
        o.c.setAttribute("stroke-width", actif ? 4 : 2.5);
        o.t.setAttribute("font-weight", actif ? 700 : 400);
      });
    };
  }

  /* ---------- étape 4 · RT de l'existant : le geste de remplacement déclenche l'exigence sur ce composant ---------- */
  function renover(g) {
    const SOL = 395, CX = 472;
    D.el("path", { d: `M340 ${SOL} H606`, stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, g);
    const r = D.el("g", {}, g);
    const m = maison(r, CX, SOL, 200, 180, 95);
    const fen = [398, 494].map(x => D.el("rect", { x: x, y: 245, width: 52, height: 52, fill: "#e8f1fb" }, r));
    const trait = h => {
      [m.toit, m.murs].concat(fen).forEach(e => {
        e.setAttribute("stroke", h > 0.5 ? ACCENT : FILET); e.setAttribute("stroke-width", (2.5 + 3.5 * h).toFixed(1));
      });
    };
    // l'ancienne chaudière, barrée, puis la pompe à chaleur qui prend sa place
    const vieux = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 398, y: 322, width: 76, height: 58, rx: 6, fill: "none", stroke: C.gris, "stroke-width": 3, "stroke-dasharray": "8 6" }, vieux);
    D.el("path", { d: "M436 333 C426 346 424 356 436 366 C448 356 446 346 436 333 Z", fill: "none", stroke: C.gris, "stroke-width": 3 }, vieux);
    const barre = D.el("path", { d: "M404 328 L468 374 M468 328 L404 374", stroke: C.rouge, "stroke-width": 4.5, "stroke-linecap": "round", opacity: 0 }, vieux);
    const pac = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 398, y: 322, width: 76, height: 58, rx: 6, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, pac);
    D.el("circle", { cx: 436, cy: 351, r: 17, fill: "none", stroke: C.navy, "stroke-width": 2.5 }, pac);
    D.el("path", { d: "M436 337 V365 M422 351 H450", stroke: C.navy, "stroke-width": 2 }, pac);
    const halo = D.el("rect", { x: 388, y: 312, width: 96, height: 78, rx: 12, fill: "none", stroke: ACCENT, "stroke-width": 5, opacity: 0 }, r);
    // la clé plate : la tête en (0,0), le manche vers la droite
    const cle = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 12, y: -6, width: 74, height: 12, rx: 6, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2.5 }, cle);
    D.el("circle", { r: 15, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2.5 }, cle);
    D.el("rect", { x: -20, y: -5, width: 14, height: 10, fill: C.papier }, cle);
    // les deux cadres : par élément (en bas, à hauteur de la pompe), globale (en haut, tiré du toit)
    const fA = fleche(r, 486, 349, 644, 349, ACCENT, 4), fB = fleche(r, 526, 156, 644, 156, ACCENT, 4);
    const carte = (y, titre, sous) => {
      const c = D.el("g", { opacity: 0 }, r);
      D.el("rect", { x: 650, y: y, width: 338, height: 88, rx: 14, fill: CREME, stroke: ACCENT, "stroke-width": 3 }, c);
      ecrire(c, 672, y + 38, titre, 24, { "font-weight": 700, fill: ACCENT });
      ecrire(c, 672, y + 70, sous, 22, {});
      return c;
    };
    const cA = carte(305, "Par élément", "ce composant seul"), cB = carte(112, "Globale", "tout le bâtiment");
    return t => {
      const f = FIGE ? 9.6 : t % 11.5;
      voir(r, D.lisse(f / 0.4) * (1 - D.lisse((f - 10.6) / 0.5)));
      voir(vieux, D.lisse((f - 0.5) / 0.4) * (1 - D.lisse((f - 3) / 0.3)));
      voir(barre, D.lisse((f - 2.3) / 0.3));
      voir(pac, D.lisse((f - 3) / 0.4));
      voir(halo, D.lisse((f - 3.5) / 0.3));
      const rot = f > 2 && f < 3 ? 16 * Math.sin((f - 2) * 10) : 0;
      cle.setAttribute("transform", `translate(${D.courbe([[1.2, 640], [2, 488], [3.1, 488], [3.9, 640]], f).toFixed(1)} 351) rotate(${rot.toFixed(1)})`);
      voir(cle, D.fenetre(f, 1.2, 3.9, 0.3));
      fA(D.lisse((f - 3.9) / 0.7)); voir(cA, D.lisse((f - 4.4) / 0.4));
      trait(D.lisse((f - 6) / 0.8));
      fB(D.lisse((f - 6.9) / 0.7)); voir(cB, D.lisse((f - 7.5) / 0.4));
    };
  }

  /* ---------- étape 5 · Le DPE : l'étiquette suit le moins bon des deux résultats, les travaux la font monter ---------- */
  function dpe(g) {
    const SOL = 380, L0 = 736, BY = k => 76 + 50 * k;
    D.el("path", { d: `M330 ${SOL} H572`, stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, g);
    const mm = maison(g, 395, SOL, 100, 90, 56);
    [mm.toit, mm.murs].forEach(e => { e.setAttribute("stroke", C.navy); e.setAttribute("stroke-width", 3.5); });
    // l'échelle : sept bandes de plus en plus longues (la lettre, la longueur et la couleur disent la même chose)
    const COUL = ["#1e7e54", "#3f9d6e", "#8fbf5a", "#e0c23c", "#e2953f", "#c0392b", "#8b1e14"];
    COUL.forEach((c, k) => {
      D.el("rect", { x: L0, y: BY(k), width: 70 + 10 * k, height: 46, rx: 6, fill: c }, g);
      ecrire(g, L0 + 16, BY(k) + 31, "ABCDEFG"[k], 22, { "font-weight": 700, fill: k === 0 || k >= 5 ? C.papier : C.navy });
    });
    const r = D.el("g", {}, g);
    const marqueur = nom => {
      const e = D.el("g", { opacity: 0 }, r);
      D.el("path", { d: "M0 -11 L22 0 L0 11 Z", fill: ACCENT }, e);
      ecrire(e, -12, 8, nom, 22, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
      return e;
    };
    const mE = marqueur("énergie"), mG = marqueur("émissions");
    const tag = D.el("g", { opacity: 0 }, r);
    D.el("path", { d: "M0 0 L22 -11 V11 Z", fill: ACCENT }, tag);
    ecrire(tag, 30, 8, "étiquette", 22, { "font-weight": 700, fill: ACCENT });
    const regle = D.el("g", { opacity: 0 }, r);
    ecrire(regle, 330, 100, "Le moins bon", 22, { "font-weight": 700, fill: C.navy });
    ecrire(regle, 330, 131, "des deux l'emporte", 22, { "font-weight": 700, fill: C.navy });
    // les travaux : une pompe à chaleur, et une flèche vers les résultats
    const pac = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 492, y: 326, width: 72, height: 54, rx: 6, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, pac);
    D.el("circle", { cx: 528, cy: 353, r: 16, fill: "none", stroke: C.navy, "stroke-width": 2.5 }, pac);
    D.el("path", { d: "M528 340 V366 M515 353 H541", stroke: C.navy, "stroke-width": 2 }, pac);
    D.el("path", { d: "M528 320 V268 H572", fill: "none", stroke: C.navy, "stroke-width": 3.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, pac);
    D.el("path", { d: "M586 268 L570 259 V277 Z", fill: C.navy }, pac);
    const travaux = ecrire(r, 528, 418, "travaux", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    return t => {
      const f = FIGE ? 8.8 : t % 10.8;
      voir(r, D.lisse(f / 0.4) * (1 - D.lisse((f - 9.9) / 0.5)));
      const q = D.lisse((f - 5.8) / 2.4), iE = 2 - q, iG = 4 - 2 * q, iP = Math.max(iE, iG);
      mE.setAttribute("transform", `translate(706 ${(99 + 50 * iE).toFixed(1)})`); voir(mE, D.lisse((f - 1.2) / 0.4));
      mG.setAttribute("transform", `translate(706 ${(99 + 50 * iG).toFixed(1)})`); voir(mG, D.lisse((f - 1.7) / 0.4));
      tag.setAttribute("transform", `translate(${(L0 + 82 + 10 * iP).toFixed(1)} ${(99 + 50 * iP).toFixed(1)})`); voir(tag, D.lisse((f - 2.6) / 0.4));
      voir(regle, D.lisse((f - 2.8) / 0.4));
      voir(pac, D.lisse((f - 4.6) / 0.4)); voir(travaux, D.lisse((f - 4.8) / 0.4));
    };
  }

  /* ---------- étape 6 · Les CEE : la boucle de l'obligation, du financement, du certificat et de la preuve ---------- */
  function circuit(g) {
    const r = D.el("g", {}, g);
    const NOEUDS = [["État", 330, 97], ["Vendeur d'énergie", 760, 97], ["Client", 760, 312], ["Certificat", 330, 312]];   // sens horaire
    NOEUDS.forEach(([, x, y]) => D.el("rect", { x: x, y: y, width: 230, height: 66, rx: 14, fill: C.papier, stroke: FILET, "stroke-width": 3 }, r));
    const allume = NOEUDS.map(([, x, y]) => D.el("rect", { x: x, y: y, width: 230, height: 66, rx: 14, fill: CREME, stroke: ACCENT, "stroke-width": 5, opacity: 0 }, r));
    NOEUDS.forEach(([nom, x, y]) => ecrire(r, x + 115, y + 41, nom, 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy }));
    // les quatre flèches : [départ, arrivée, libellé, position du libellé]
    const JAMBES = [[[560, 130], [760, 130], "obligation", 660, 101, "middle"], [[875, 163], [875, 312], "finance", 898, 244, "start"],
                    [[760, 345], [560, 345], "travaux réalisés", 660, 389, "middle"], [[445, 312], [445, 163], "preuve", 422, 244, "end"]];
    const flechesGrises = JAMBES.map(([a, b]) => fleche(r, a[0], a[1], b[0], b[1], FILET, 3.5));
    const flechesVives = JAMBES.map(([a, b]) => fleche(r, a[0], a[1], b[0], b[1], ACCENT, 5));
    const mots = JAMBES.map(([, , s, x, y, ancre]) => ecrire(r, x, y, s, 22, { "text-anchor": ancre, fill: C.navy, opacity: 0 }));
    const jeton = D.el("circle", { r: 11, fill: ACCENT, stroke: C.papier, "stroke-width": 3, opacity: 0 }, r);
    const ok = coche(r, 560, 97);
    const morale = D.el("g", { opacity: 0 }, r);
    ecrire(morale, 660, 226, "L'aide est la contrepartie", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
    ecrire(morale, 660, 257, "d'une obligation légale", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
    return t => {
      const f = FIGE ? 9.5 : t % 11.4;
      voir(r, D.lisse(f / 0.4) * (1 - D.lisse((f - 10.5) / 0.5)));
      flechesGrises.forEach(m => m(1));
      voir(allume[0], D.lisse((f - 0.8) / 0.3));
      let vu = 0;   // le jeton n'est visible que le long d'une flèche
      JAMBES.forEach(([a, b], k) => {
        const d0 = 1 + 1.9 * k, p = D.borne((f - d0) / 1.5, 0, 1);
        flechesVives[k](p); voir(mots[k], D.lisse((f - d0) / 0.4));
        if (k < 3) voir(allume[k + 1], D.lisse((f - d0 - 1.5) / 0.3));
        if (p > 0 && p < 1) {
          const ux = b[0] - a[0], uy = b[1] - a[1], L = Math.hypot(ux, uy), z = 14 + (L - 28) * D.lisse(p);
          jeton.setAttribute("cx", (a[0] + ux / L * z).toFixed(1)); jeton.setAttribute("cy", (a[1] + uy / L * z).toFixed(1));
          vu = D.fenetre(p, 0, 1, 0.12);
        }
      });
      voir(jeton, vu);
      voir(ok, D.lisse((f - 8.4) / 0.3));
      voir(morale, D.lisse((f - 8.7) / 0.4));
    };
  }

  /* ---------- les six étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "thermique-pourquoi-une-rt", titre: "De 1974 à la RE2020", bulle: ["Pourquoi une", "règle thermique ?"], bras: -76, cycle: 11.4, dessiner: histoire,
      dire: "Pourquoi une RT ? — La première réglementation thermique naît en 1974, après le choc pétrolier de 1973. Chaque génération resserre l'exigence, jusqu'à la RT2012, que la RE2020 remplace progressivement." },
    { station: "thermique-re2020", titre: "Six indicateurs", bulle: ["Quels indicateurs", "à respecter ?"], bras: -70, cycle: 10.5, dessiner: six,
      dire: "La RE2020 — Six indicateurs, trois thèmes : énergie, carbone, confort d'été. Chacun a sa propre limite : un bon résultat sur le carbone ne compense pas un Bbio dépassé." },
    { station: "thermique-confort-ete", titre: "Réduire l'inconfort", bulle: ["Comment limiter", "la surchauffe ?"], bras: -78, cycle: 12, dessiner: ete,
      dire: "Le confort d'été — Il se mesure en degrés-heures : une aire cumulée, pas un pic. On la réduit dans l'ordre : protection solaire, inertie, ventilation nocturne, puis climatisation sur le besoin résiduel." },
    { station: "thermique-existant", titre: "Un geste, une règle", bulle: ["Que déclenche", "un remplacement ?"], bras: -66, cycle: 11.5, dessiner: renover,
      dire: "RT de l'existant — Remplacer un composant déclenche l'exigence sur ce composant seul : c'est la rénovation par élément. Une rénovation globale juge le bâtiment entier, bâti et systèmes réunis." },
    { station: "thermique-dpe", titre: "L'étiquette A à G", bulle: ["Qui décide de", "l'étiquette ?"], bras: -72, cycle: 10.8, dessiner: dpe,
      dire: "Le DPE — L'étiquette retient le moins bon des deux résultats : consommation d'énergie ou émissions de gaz à effet de serre. Des travaux, comme une pompe à chaleur, peuvent la faire remonter." },
    { station: "thermique-cee", titre: "Qui paie qui ?", bulle: ["D'où vient", "l'aide ?"], bras: -84, cycle: 11.4, dessiner: circuit,
      dire: "Les CEE — L'État oblige les vendeurs d'énergie à financer des travaux. Le client en reçoit une aide ; le certificat des travaux réalisés revient prouver à l'État que l'obligation est remplie." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires parcourt la thermique d'une affaire en six étapes : " +
    "pourquoi une réglementation thermique, de 1974 à la RE2020 (Pourquoi une RT ?), les six indicateurs de la RE2020 et leurs limites distinctes, " +
    "le confort d'été mesuré en degrés-heures et traité dans l'ordre, la rénovation de l'existant par élément ou globale, " +
    "l'étiquette A à G du DPE, les certificats d'économies d'énergie (CEE).");
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

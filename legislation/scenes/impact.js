/* =====================================================================
   scenes/impact.js — la scène de la branche « Impact environnemental »
   ---------------------------------------------------------------------
   Remplace l'image scene-impact.webp en tête de l'accueil des cinq
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="impact" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Le pas à pas : SceneKit (cartoclim/stations/_commun/scene-kit.js), une
   étape par station de la branche, dans l'ordre du plan. L'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche depuis l'étape 1, chaque étape le temps de son cycle.
   Le dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — le liquide
   en nappe dont la surface ondule, le ventilateur, le filigrane R9.
   Le chargé d'affaires : le bonhomme « plein » de HoCourant, recopié tel
   quel de la scène fluidique. Aucune image nouvelle.
   Les deux moteurs sont LUS, jamais modifiés.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités ; tout bouge par le temps t
   (requestAnimationFrame), sans jamais tester le réglage système de réduction
   des animations : seul l'interrupteur « Animations » du site
   (moteur/animations.js, choix explicite de l'utilisateur) fige le dessin
   sur l'image finale de chaque étape. Faits : ceux des cinq stations, aucun
   chiffre nouveau (le PRP compare au CO₂, l'ODP mesure l'ozone : jamais mêlés ;
   le TEWI additionne l'effet direct des fuites et l'effet indirect de l'énergie).
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="impact"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#047857";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
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

  const ORANGE_TXT = "#9a3412";   // le texte qui accompagne l'accent orange (contraste)
  const VERT_TXT = "#166534", ROUGE_TXT = "#922b21", BLEU_TXT = "#1e5a99", AMBRE = "#b06a00";
  const FILET = "#9aaabb";        // le trait des cadres au repos
  const ap = (f, debut, duree) => D.lisse((f - debut) / duree);   // 0 → 1 à partir de « debut », sur « duree » secondes

  /* un texte centré en gras */
  const gras = (parent, x, y, s, coul, taille, at) =>
    ecrire(parent, x, y, s, taille || 22, Object.assign({ "text-anchor": "middle", "font-weight": 700, fill: coul || C.navy }, at || {}));

  /* une flèche : un trait (éventuellement en tirets) et sa pointe, de (x1, y1) vers (x2, y2) */
  function fleche(parent, x1, y1, x2, y2, coul, ep, tirets) {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a), L = 10 + 2 * ep, W = 5 + 1.5 * ep;
    const gf = D.el("g", {}, parent), p = (k, w) => `${(x2 - c * k - s * w).toFixed(1)} ${(y2 - s * k + c * w).toFixed(1)}`;
    D.el("path", Object.assign({ d: `M${x1} ${y1} L${(x2 - c * (L - 2)).toFixed(1)} ${(y2 - s * (L - 2)).toFixed(1)}`, fill: "none", stroke: coul,
      "stroke-width": ep, "stroke-linecap": "round" }, tirets ? { "stroke-dasharray": tirets } : {}), gf);
    D.el("path", { d: `M${x2} ${y2} L${p(L, W)} L${p(L, -W)} Z`, fill: coul }, gf);
    return gf;
  }

  /* ---------- étape 1 · PRP & ODP : deux impacts, deux mécanismes, jamais confondus ----------
     À gauche l'ODP (l'ozone : le chlore l'attaque, le fluor non), à droite le PRP (la chaleur retenue). */
  function deux(g) {
    const R = D.el("g", {}, g);
    [322, 676].forEach(x => D.el("rect", { x: x, y: 66, width: 302, height: 260, rx: 14, fill: "#f4f7fb", stroke: C.navy, "stroke-width": 3 }, R));
    gras(R, 650, 205, "≠", C.navy, 34);
    // ---- l'ODP : la couche d'ozone, attaquée par le chlore, traversée par le fluor
    ecrire(R, 338, 98, "ODP · l'ozone", 24, { "font-weight": 700, fill: C.navy });
    D.el("rect", { x: 338, y: 112, width: 226, height: 22, rx: 6, fill: "#d6e6f6", stroke: C.bleu, "stroke-width": 2.5, "stroke-dasharray": "8 5" }, R);
    const trou = D.el("ellipse", { cx: 410, cy: 123, rx: 17, ry: 12, fill: C.papier, opacity: 0 }, R);
    const entaille = D.el("path", { d: "M398 111 L410 122 L401 129 L413 135", fill: "none", stroke: C.rouge, "stroke-width": 4,
      "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, R);
    // le CFC porte son chlore (Cl) ; le HFC, sans chlore ni brome, traverse la couche : aucune lettre en travers de la bande
    const cfc = D.el("g", {}, R);
    D.el("circle", { r: 24, fill: "#fbe3de", stroke: C.rouge, "stroke-width": 3 }, cfc);
    ecrire(cfc, 0, 8, "Cl", 22, { "text-anchor": "middle", "font-weight": 700, fill: ROUGE_TXT });
    const hfc = D.el("g", {}, R);
    [-22, 22].forEach(x => D.el("circle", { cx: x, r: 9, fill: "#dff0e6", stroke: C.vert, "stroke-width": 3 }, hfc));
    D.el("circle", { r: 15, fill: "#dff0e6", stroke: C.vert, "stroke-width": 3 }, hfc);
    const atome = D.el("circle", { r: 9, fill: C.rouge, stroke: ROUGE_TXT, "stroke-width": 2, opacity: 0 }, R);
    const ok = coche(R, 598, 123);
    const v1 = [gras(R, 410, 274, "CFC, HCFC", C.navy, 22, { opacity: 0 }), gras(R, 410, 304, "ODP non nul", ROUGE_TXT, 22, { opacity: 0 })];
    const v2 = [gras(R, 540, 274, "HFC", C.navy, 22, { opacity: 0 }), gras(R, 540, 304, "ODP nul", VERT_TXT, 22, { opacity: 0 })];
    // ---- le PRP : la chaleur du sol, renvoyée vers le bas par la molécule
    ecrire(R, 692, 98, "PRP · la chaleur", 24, { "font-weight": 700, fill: C.navy });
    D.el("rect", { x: 692, y: 252, width: 270, height: 20, rx: 4, fill: "#e6dcc8", stroke: C.gris, "stroke-width": 2 }, R);
    const B = D.el("g", { opacity: 0 }, R);
    [803, 851].forEach(x => D.el("circle", { cx: x, cy: 168, r: 10, fill: "#fbe9d9", stroke: C.navy, "stroke-width": 3 }, B));
    D.el("circle", { cx: 827, cy: 168, r: 15, fill: "#fbe9d9", stroke: C.navy, "stroke-width": 3 }, B);
    const montee = D.el("path", { d: "M827 246 V206", fill: "none", stroke: C.chaud, "stroke-width": 6, "stroke-dasharray": "12 9", "stroke-linecap": "round" }, B);
    D.el("path", { d: "M827 190 L816 208 L838 208 Z", fill: C.chaud }, B);
    const retours = [fleche(B, 812, 192, 778, 234, C.chaud, 5), fleche(B, 842, 192, 876, 234, C.chaud, 5)];
    const fuite = fleche(B, 848, 146, 918, 112, C.gris, 4, "9 7");
    [retours[0], retours[1], fuite].forEach(e => e.setAttribute("opacity", 0));
    const vB = gras(R, 827, 304, "retient la chaleur", ROUGE_TXT, 22, { opacity: 0 });
    // ---- le piège : un fluide à ODP nul peut peser lourd sur le climat (l'accent orange de l'étape)
    const bande = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 322, y: 346, width: 656, height: 78, rx: 14, fill: "#fff4ec", stroke: C.orange, "stroke-width": 3.5 }, bande);
    gras(bande, 650, 380, "R-410A : ODP nul, PRP 2088", ORANGE_TXT, 24);
    gras(bande, 650, 410, "2088 fois plus qu'une même masse de CO₂", C.navy, 22, { "font-weight": 400 });
    return t => {
      const f = FIGE ? 10.6 : t % 12, sortie = 1 - ap(f, 11.4, 0.5);
      voir(R, ap(f, 0.1, 0.4) * sortie);
      const bob = FIGE ? 0 : 2 * Math.sin(t * 3);
      cfc.setAttribute("transform", `translate(${(410 + bob).toFixed(1)} ${D.lerp(218, 168, ap(f, 0.9, 1.3)).toFixed(1)})`);
      atome.setAttribute("cx", D.lerp(436, 410, ap(f, 2.3, 0.7)).toFixed(1)); atome.setAttribute("cy", D.lerp(150, 124, ap(f, 2.3, 0.7)).toFixed(1));
      voir(atome, D.fenetre(f, 2.3, 3.05, 0.15));
      voir(trou, ap(f, 3.0, 0.25)); voir(entaille, ap(f, 3.0, 0.25));
      v1.forEach(e => voir(e, ap(f, 3.3, 0.4)));
      hfc.setAttribute("transform", `translate(${(540 + bob).toFixed(1)} ${D.lerp(218, 94, ap(f, 4.0, 1.6)).toFixed(1)})`);
      voir(ok, ap(f, 5.6, 0.3)); v2.forEach(e => voir(e, ap(f, 5.8, 0.4)));
      voir(B, ap(f, 6.4, 0.5));
      montee.setAttribute("stroke-dashoffset", (-(FIGE ? 0 : t) * 40).toFixed(1));
      voir(retours[0], ap(f, 7.4, 0.4)); voir(retours[1], ap(f, 7.7, 0.4)); voir(fuite, ap(f, 8.1, 0.4));
      voir(vB, ap(f, 8.5, 0.4));
      voir(bande, ap(f, 9.0, 0.5));
    };
  }

  /* ---------- étape 2 · TEWI : les deux parts s'empilent, une machine après l'autre ----------
     À gauche les deux instruments (la bouteille qui fuit : part directe ; le compteur : part indirecte),
     à droite deux colonnes : la part directe en bas, la part indirecte dessus, le total en orange. */
  function tewi(g) {
    const R = D.el("g", {}, g);
    // la bouteille : la nappe baisse quand la machine fuit, la vapeur s'échappe de la vanne
    D.el("rect", { x: 338, y: 162, width: 42, height: 80, rx: 13 }, D.el("clipPath", { id: "impact-tewi-bouteille" }, R));
    D.el("rect", { x: 336, y: 160, width: 46, height: 84, rx: 14, fill: "#eef5fc" }, R);
    let niveau = 0.84;
    const liq = D.liquide(D.el("g", { "clip-path": "url(#impact-tewi-bouteille)" }, R),
      { x0: 338, x1: 380, yh: 162, yb: 242, pas: 6, niveau: () => niveau, couleur: () => LIQUIDE });
    D.el("rect", { x: 336, y: 160, width: 46, height: 84, rx: 14, fill: "none", stroke: C.navy, "stroke-width": 3 }, R);
    D.el("rect", { x: 349, y: 146, width: 20, height: 14, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 2.5 }, R);
    D.el("rect", { x: 343, y: 136, width: 32, height: 10, rx: 3, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2.5 }, R);
    const vapeur = [0, 1, 2].map(() => D.el("path", { d: "M0 0 q7 -9 0 -18 t0 -18", fill: "none", stroke: "#9fb4c8", "stroke-width": 5, "stroke-linecap": "round" }, R));
    ecrire(R, 396, 172, "direct", 22, { "font-weight": 700, fill: ACCENT });
    ecrire(R, 396, 200, "fuites", 22, {});
    ecrire(R, 396, 228, "× PRP", 22, {});
    // le compteur : l'aiguille dit si la machine consomme beaucoup
    D.el("circle", { cx: 362, cy: 330, r: 34, fill: "#eef5fc", stroke: C.navy, "stroke-width": 3 }, R);
    D.el("path", { d: "M339.4 321.8 A24 24 0 0 1 384.6 321.8", fill: "none", stroke: "#cfe0f2", "stroke-width": 6, "stroke-linecap": "round" }, R);
    const aiguille = D.el("path", { d: "M362 330 V306", fill: "none", stroke: C.navy, "stroke-width": 4, "stroke-linecap": "round" }, R);
    D.el("circle", { cx: 362, cy: 330, r: 5, fill: C.navy }, R);
    ecrire(R, 414, 322, "indirect", 22, { "font-weight": 700, fill: BLEU_TXT });
    ecrire(R, 414, 350, "énergie", 22, {});
    ecrire(R, 414, 378, "× durée de vie", 22, {});
    // les deux colonnes : la part directe en bas, la part indirecte au-dessus, le total TEWI en orange
    [[644, 740], [822, 918]].forEach(([a, b]) => D.el("path", { d: `M${a} 396 H${b}`, stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round" }, R));
    const machine = (cx, nom, sous, dH, iH) => {
      const m = { g: D.el("g", { opacity: 0 }, R), cx: cx, dH: dH, iH: iH };
      gras(m.g, cx, 92, nom, C.navy);
      gras(m.g, cx, 120, sous, C.gris, 22, { "font-weight": 400 });
      m.d = D.el("rect", { x: cx - 32, y: 396, width: 64, height: 0, fill: ACCENT, stroke: C.papier, "stroke-width": 2 }, R);
      m.i = D.el("rect", { x: cx - 32, y: 396, width: 64, height: 0, fill: C.bleu, stroke: C.papier, "stroke-width": 2 }, R);
      m.tot = D.el("g", { opacity: 0 }, R);
      const haut = 396 - dH - iH;
      D.el("path", { d: `M${cx + 42} ${haut} H${cx + 50} V396 H${cx + 42}`, fill: "none", stroke: C.orange, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, m.tot);
      ecrire(m.tot, cx + 58, (haut + 396) / 2 + 8, "TEWI", 24, { "font-weight": 700, fill: ORANGE_TXT });
      return m;
    };
    const A = machine(692, "PAC propane", "gourmande", 26, 176), B = machine(870, "Groupe R-404A", "qui fuit", 142, 52);
    const pousse = (m, pd, pi, pt) => {
      const hd = m.dH * pd, hi = m.iH * pi;
      m.d.setAttribute("y", (396 - hd).toFixed(1)); m.d.setAttribute("height", hd.toFixed(1));
      m.i.setAttribute("y", (396 - hd - hi).toFixed(1)); m.i.setAttribute("height", hi.toFixed(1));
      voir(m.tot, pt);
    };
    return t => {
      const f = FIGE ? 10.4 : t % 11.4, sortie = 1 - ap(f, 10.8, 0.5);
      voir(R, ap(f, 0.1, 0.4) * sortie);
      voir(A.g, ap(f, 0.3, 0.4)); voir(B.g, ap(f, 5.8, 0.4));
      pousse(A, ap(f, 1.0, 1.2), ap(f, 2.6, 2.2), ap(f, 5.0, 0.4));
      pousse(B, ap(f, 6.5, 2.0), ap(f, 8.7, 0.9), ap(f, 9.6, 0.4));
      // les instruments suivent la machine du moment : peu de fuite et forte consommation, puis l'inverse
      niveau = D.courbe([[0.9, 0.84], [2.4, 0.80], [5.6, 0.80], [6.1, 0.84], [6.5, 0.84], [8.5, 0.38], [11, 0.38]], f);
      aiguille.setAttribute("transform", `rotate(${D.courbe([[2.6, 0], [4.8, 52], [5.6, 52], [6.2, 0], [8.7, 0], [9.6, -46]], f).toFixed(1)} 362 330)`);
      const vap = D.courbe([[0.9, 0], [1.2, 0.3], [5.4, 0.3], [5.8, 0], [6.5, 0], [7, 1], [8.6, 1], [9.4, 0.8]], f);
      vapeur.forEach((p, k) => {
        const s = FIGE ? (k + 0.5) / 3 : D.frac(t * 0.7 + k / 3);
        p.setAttribute("transform", `translate(359 ${(134 - 34 * s).toFixed(1)})`);
        voir(p, D.fenetre(s, 0, 1, 0.3) * vap);
      });
      liq.maj(t);
    };
  }

  /* ---------- étape 3 · ACV & carbone : le cycle de vie se parcourt, l'exploitation est la plus longue ----------
     Un appareil parcourt les quatre étapes ; il reste le plus longtemps dans « Exploiter », dont le TEWI n'est qu'une partie. */
  function cycleVie(g) {
    const R = D.el("g", {}, g);
    const BLOCS = [[330, 118], [478, 118], [626, 200], [856, 118]], NOMS = ["Fabriquer", "Transporter", "Exploiter", "Démolir"];
    const cx = BLOCS.map(([x, w]) => x + w / 2);
    D.el("path", { d: "M330 122 V112 H974 V122", fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, R);
    gras(R, 652, 96, "ACV : les quatre étapes", C.navy);
    const blocs = BLOCS.map(([x, w]) => D.el("rect", { x: x, y: 134, width: w, height: 148, rx: 14, fill: "#eef3fb", stroke: FILET, "stroke-width": 3 }, R));
    NOMS.forEach((n, i) => gras(R, cx[i], 312, n, C.navy));
    [[448, 478], [596, 626], [826, 856]].forEach(([a, b]) => fleche(R, a + 3, 208, b - 3, 208, C.gris, 3));
    // fabriquer : l'usine et sa fumée
    D.el("path", { d: "M354 266 V232 L372 244 V232 L390 244 V232 L408 244 V266 Z", fill: "#dbe6f2", stroke: C.navy, "stroke-width": 2.5, "stroke-linejoin": "round" }, R);
    D.el("rect", { x: 412, y: 214, width: 12, height: 52, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 2.5 }, R);
    const fumee = [0, 1].map(() => D.el("path", { d: "M0 0 q6 -7 0 -14 t0 -14", fill: "none", stroke: "#9fb4c8", "stroke-width": 5, "stroke-linecap": "round" }, R));
    // transporter : le camion roule
    const camion = D.el("g", {}, R);
    D.el("rect", { x: 507, y: 228, width: 42, height: 26, rx: 3, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 2.5 }, camion);
    D.el("path", { d: "M549 236 H562 L571 246 V254 H549 Z", fill: "#e8f1fb", stroke: C.navy, "stroke-width": 2.5, "stroke-linejoin": "round" }, camion);
    [520, 559].forEach(x => D.el("circle", { cx: x, cy: 258, r: 6, fill: C.navy }, camion));
    // exploiter : l'appareil tourne, la bague dit les années de service
    D.el("rect", { x: 696, y: 214, width: 60, height: 44, rx: 6, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, R);
    const tourne = D.ventilateur(R, 726, 236, 16); tourne(0);
    const anneau = D.el("circle", { cx: 726, cy: 236, r: 38, fill: "none", stroke: ACCENT, "stroke-width": 4, "stroke-dasharray": "16 10", "stroke-linecap": "round" }, R);
    // démolir : le fluide est récupéré dans une bouteille
    D.el("rect", { x: 901, y: 224, width: 28, height: 46, rx: 9 }, D.el("clipPath", { id: "impact-acv-bouteille" }, R));
    D.el("rect", { x: 899, y: 222, width: 32, height: 50, rx: 10, fill: "#eef5fc" }, R);
    let rempli = 0.1;
    const liq = D.liquide(D.el("g", { "clip-path": "url(#impact-acv-bouteille)" }, R),
      { x0: 901, x1: 929, yh: 224, yb: 270, pas: 4, niveau: () => rempli, couleur: () => LIQUIDE });
    D.el("rect", { x: 899, y: 222, width: 32, height: 50, rx: 10, fill: "none", stroke: C.navy, "stroke-width": 3 }, R);
    D.el("rect", { x: 908, y: 210, width: 14, height: 12, rx: 2, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2.5 }, R);
    const ok = coche(R, 952, 200);
    const recup = gras(R, 915, 344, "fluide récupéré", C.navy, 22, { "font-weight": 400, opacity: 0 });
    // le TEWI : seulement une partie de l'étape « exploiter » (l'accent orange de l'étape)
    const tewi = D.el("g", { opacity: 0 }, R), tewi2 = D.el("g", { opacity: 0 }, R);
    D.el("path", { d: "M626 330 V342 H826 V330", fill: "none", stroke: C.orange, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, tewi);
    gras(tewi, 726, 378, "TEWI : fuites + énergie", ORANGE_TXT);
    gras(tewi2, 726, 408, "une partie de cette étape", C.navy, 22, { "font-weight": 400 });
    // le jeton : l'appareil qui parcourt le cycle
    const jeton = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: -19, y: -12, width: 38, height: 24, rx: 4, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 2.5 }, jeton);
    D.el("circle", { r: 7, fill: "none", stroke: C.navy, "stroke-width": 2.5 }, jeton);
    const SEJOURS = [[1.2, 2.2], [2.7, 3.7], [4.2, 7.2], [7.7, 8.7]];   // il reste dans chaque bloc le temps de l'étape
    return t => {
      const f = FIGE ? 10.2 : t % 11.5, sortie = 1 - ap(f, 10.9, 0.5);
      voir(R, ap(f, 0.1, 0.5) * sortie);
      jeton.setAttribute("transform", `translate(${D.courbe([[1.2, cx[0]], [2.2, cx[0]], [2.7, cx[1]], [3.7, cx[1]], [4.2, cx[2]], [7.2, cx[2]], [7.7, cx[3]], [8.7, cx[3]]], f).toFixed(1)} 156)`);
      voir(jeton, D.fenetre(f, 1.0, 9.2, 0.3));
      blocs.forEach((b, i) => {
        const actif = f >= SEJOURS[i][0] && f < SEJOURS[i][1], fait = f >= SEJOURS[i][1];
        b.setAttribute("fill", actif ? "#cfeadc" : fait ? "#e6f2ec" : "#eef3fb");
        b.setAttribute("stroke", actif || fait ? ACCENT : FILET); b.setAttribute("stroke-width", actif ? 6 : fait ? 3.5 : 3);
      });
      fumee.forEach((p, k) => {
        const s = FIGE ? 0.3 + 0.4 * k : D.frac(t * 0.6 + k / 2);
        p.setAttribute("transform", `translate(418 ${(210 - 24 * s).toFixed(1)})`); voir(p, D.fenetre(s, 0, 1, 0.3));
      });
      camion.setAttribute("transform", `translate(${(FIGE ? 0 : 8 * Math.sin(t * 1.8)).toFixed(1)} 0)`);
      anneau.setAttribute("stroke-dashoffset", (-(FIGE ? 0 : t) * 30).toFixed(1)); tourne(FIGE ? 0 : t * 140);
      rempli = D.courbe([[7.7, 0.1], [8.7, 0.72]], f); liq.maj(t);
      voir(ok, ap(f, 8.7, 0.3)); voir(recup, ap(f, 8.2, 0.4));
      voir(tewi, ap(f, 5.4, 0.5)); voir(tewi2, ap(f, 5.9, 0.4));
    };
  }

  /* ---------- étape 4 · Écoconception : les trois piliers, puis le coût sur la vie et l'étiquette énergie ----------
     Un prix bas avec une mauvaise classe énergie : la courbe du coût cumulé monte plus vite et finit par croiser l'autre. */
  function conception(g) {
    const R = D.el("g", {}, g);
    const pil = [[322, 120, "Durer"], [458, 172, "Se réparer"], [646, 246, "Consommer moins"]].map(([x, w, s]) => {
      const p = D.el("g", { opacity: 0 }, R);
      D.el("rect", { x: x, y: 66, width: w, height: 44, rx: 22, fill: "#e6f2ec", stroke: ACCENT, "stroke-width": 3 }, p);
      gras(p, x + w / 2, 96, s, C.navy);
      return p;
    });
    // le graphique du coût cumulé, sans valeur chiffrée
    const axes = D.el("g", { opacity: 0 }, R);
    D.el("path", { d: "M350 392 V176 M346 392 H676", fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round" }, axes);
    D.el("path", { d: "M342 178 L350 160 L358 178 Z M674 384 L692 392 L674 400 Z", fill: C.navy }, axes);
    ecrire(axes, 330, 142, "coût cumulé", 22, {});
    ecrire(axes, 692, 426, "temps", 22, { "text-anchor": "end" });
    const coupe = D.el("rect", { x: 340, y: 150, width: 0, height: 250 }, D.el("clipPath", { id: "impact-eco-trace" }, R));
    const lignes = D.el("g", { "clip-path": "url(#impact-eco-trace)" }, R);
    D.el("line", { x1: 352, y1: 300, x2: 670, y2: 224, stroke: ACCENT, "stroke-width": 6, "stroke-linecap": "round" }, lignes);
    D.el("line", { x1: 352, y1: 340, x2: 670, y2: 214, stroke: AMBRE, "stroke-width": 6, "stroke-dasharray": "14 9", "stroke-linecap": "round" }, lignes);
    const tetes = [ACCENT, AMBRE].map(c => D.el("circle", { r: 7, fill: c, stroke: C.papier, "stroke-width": 2, opacity: 0 }, R));
    const legende = D.el("g", { opacity: 0 }, R);
    D.el("line", { x1: 482, y1: 330, x2: 510, y2: 330, stroke: ACCENT, "stroke-width": 6, "stroke-linecap": "round" }, legende);
    ecrire(legende, 522, 338, "bonne classe", 22, {});
    D.el("line", { x1: 482, y1: 362, x2: 510, y2: 362, stroke: AMBRE, "stroke-width": 6, "stroke-dasharray": "9 6", "stroke-linecap": "round" }, legende);
    ecrire(legende, 522, 370, "mauvaise classe", 22, {});
    // le croisement : l'accent orange de l'étape
    const surcout = D.el("g", { opacity: 0 }, R);
    D.el("circle", { cx: 606, cy: 239, r: 12, fill: "none", stroke: C.orange, "stroke-width": 4 }, surcout);
    D.el("path", { d: "M606 226 V218", stroke: C.orange, "stroke-width": 3.5, "stroke-linecap": "round" }, surcout);
    gras(surcout, 540, 206, "le surcoût apparaît", ORANGE_TXT);
    // l'étiquette énergie : une échelle de lettres, de A (longue) à G (courte)
    const COUL = ["#1e7e54", "#3f9d6e", "#8fbf5a", "#e0c23c", "#e2953f", "#c0392b", "#8b1e14"];
    const titre = ecrire(R, 792, 138, "étiquette énergie", 22, { "font-weight": 700, fill: C.navy, opacity: 0 });
    const bandes = COUL.map((c, k) => {
      const b = D.el("g", { opacity: 0 }, R);
      D.el("rect", { x: 792, y: 154 + 34 * k, width: 192 - 20 * k, height: 24, rx: 5, fill: c }, b);
      ecrire(b, 782, 175 + 34 * k, "ABCDEFG"[k], 22, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
      return b;
    });
    const hA = D.el("rect", { x: 788, y: 150, width: 200, height: 32, rx: 8, fill: "none", stroke: ACCENT, "stroke-width": 4, opacity: 0 }, R);
    const hF = D.el("rect", { x: 788, y: 320, width: 100, height: 32, rx: 8, fill: "none", stroke: AMBRE, "stroke-width": 4, opacity: 0 }, R);
    return t => {
      const f = FIGE ? 9.4 : t % 11.4, sortie = 1 - ap(f, 10.9, 0.5);
      voir(R, sortie);
      pil.forEach((p, k) => voir(p, ap(f, 0.2 + 0.3 * k, 0.4)));
      voir(axes, ap(f, 1.2, 0.4)); voir(legende, ap(f, 2.0, 0.4));
      const u = ap(f, 1.6, 4.0);   // les deux courbes se tracent ensemble, de gauche à droite
      coupe.setAttribute("width", (u > 0 ? 12 + 318 * u : 0).toFixed(1));
      tetes[0].setAttribute("cx", (352 + 318 * u).toFixed(1)); tetes[0].setAttribute("cy", (300 - 76 * u).toFixed(1));
      tetes[1].setAttribute("cx", (352 + 318 * u).toFixed(1)); tetes[1].setAttribute("cy", (340 - 126 * u).toFixed(1));
      tetes.forEach(e => voir(e, u > 0 ? 1 : 0));
      voir(surcout, ap(f, 5.4, 0.4));
      voir(titre, ap(f, 6.4, 0.4)); bandes.forEach((b, k) => voir(b, ap(f, 6.6 + 0.15 * k, 0.3)));
      voir(hA, ap(f, 8.0, 0.3)); voir(hF, ap(f, 8.3, 0.3));
    };
  }

  /* ---------- étape 5 · Montréal → Kigali : le curseur du temps avance, chaque temps répond au précédent ----------
     Seule la date 1987 est écrite : les autres dates ne sont pas dans la station. */
  function calendrier(g) {
    const R = D.el("g", {}, g);
    const X = [322, 553, 784], CX = X.map(x => x + 100);
    const TEXTES = [
      [["Montréal, 1987", C.navy, 700], ["vise l'ozone", C.navy, 400], ["CFC, puis HCFC", C.navy, 400], ["chlore ou brome", ROUGE_TXT, 400]],
      [["Les HFC", C.navy, 700], ["remplacent", C.navy, 400], ["ODP nul", VERT_TXT, 700], ["PRP élevé", ROUGE_TXT, 700]],
      [["Kigali", C.navy, 700], ["amendement", C.navy, 400], ["vise les HFC", C.navy, 400], ["par leur PRP", ROUGE_TXT, 700]]];
    const cartes = X.map((x, i) => {
      const c = { g: D.el("g", { opacity: 0 }, R) };
      c.r = D.el("rect", { x: x, y: 124, width: 200, height: 144, rx: 14, fill: "#eef3fb", stroke: FILET, "stroke-width": 3 }, c.g);
      c.l = TEXTES[i].map(([s, coul, poids], k) => ecrire(c.g, x + 16, 156 + 30 * k, s, 22, { "font-weight": poids, fill: coul, opacity: 0 }));
      return c;
    });
    const liens = [[522, 553], [753, 784]].map(([a, b]) => { const e = fleche(R, a + 3, 196, b - 3, 196, C.gris, 3); e.setAttribute("opacity", 0); return e; });
    // l'axe du temps, ses trois repères et le curseur
    D.el("path", { d: "M322 316 H968", fill: "none", stroke: C.gris, "stroke-width": 4, "stroke-linecap": "round" }, R);
    D.el("path", { d: "M984 316 L966 307 V325 Z", fill: C.gris }, R);
    CX.forEach(x => D.el("circle", { cx: x, cy: 316, r: 9, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, R));
    const curseur = D.el("circle", { r: 14, fill: ACCENT, stroke: C.papier, "stroke-width": 3 }, R);
    // sous chaque repère, un petit signe : la couche d'ozone, la molécule, la chaleur
    D.el("rect", { x: CX[0] - 30, y: 338, width: 60, height: 12, rx: 4, fill: "#d6e6f6", stroke: C.bleu, "stroke-width": 2, "stroke-dasharray": "6 4" }, R);
    D.el("circle", { cx: CX[1], cy: 344, r: 9, fill: "#dff0e6", stroke: C.vert, "stroke-width": 2.5 }, R);
    [CX[1] - 14, CX[1] + 14].forEach(x => D.el("circle", { cx: x, cy: 344, r: 5, fill: "#dff0e6", stroke: C.vert, "stroke-width": 2.5 }, R));
    [-14, 0, 14].forEach(dx => D.el("path", { d: `M${CX[2] + dx} 358 q5 -6 0 -12 t0 -12`, fill: "none", stroke: C.rouge, "stroke-width": 3.5, "stroke-linecap": "round" }, R));
    // la phrase du mécanisme : l'accent orange de l'étape
    const bande = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 322, y: 372, width: 662, height: 52, rx: 14, fill: "#fff4ec", stroke: C.orange, "stroke-width": 3.5 }, bande);
    gras(bande, 653, 406, "Kigali s'ajoute à Montréal, il ne le remplace pas", ORANGE_TXT);
    const DEP = [0.5, 3.8, 7.0];
    return t => {
      const f = FIGE ? 9.6 : t % 11, sortie = 1 - ap(f, 10.4, 0.5);
      voir(R, ap(f, 0.1, 0.4) * sortie);
      const x = D.courbe([[0.4, CX[0]], [3.4, CX[0]], [4.2, CX[1]], [6.6, CX[1]], [7.4, CX[2]]], f);
      curseur.setAttribute("cx", x.toFixed(1)); curseur.setAttribute("cy", 316);
      cartes.forEach((c, i) => {
        voir(c.g, ap(f, DEP[i], 0.4));
        c.l.forEach((l, k) => voir(l, ap(f, DEP[i] + 0.3 + 0.25 * k, 0.3)));
        const actif = Math.abs(x - CX[i]) < 40, fait = i < 2 && f >= DEP[i + 1];
        c.r.setAttribute("fill", actif ? "#d9efe6" : fait ? "#e6f2ec" : "#eef3fb");
        c.r.setAttribute("stroke", actif || fait ? ACCENT : FILET); c.r.setAttribute("stroke-width", actif ? 6 : fait ? 3.5 : 3);
      });
      voir(liens[0], ap(f, DEP[1] - 0.5, 0.4)); voir(liens[1], ap(f, DEP[2] - 0.5, 0.4));
      voir(bande, ap(f, 8.6, 0.5));
    };
  }

  /* ---------- les cinq étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "impact-prp-odp", titre: "Ozone ou climat ?", bulle: ["Ozone ou climat :", "quel impact ?"], bras: -72, cycle: 12, dessiner: deux,
      dire: "PRP & ODP — L'ODP mesure la destruction de l'ozone par le chlore ou le brome ; le PRP compare la chaleur retenue à celle du CO₂. Le R-410A : ODP nul, PRP 2088." },
    { station: "impact-tewi", titre: "Direct + indirect", bulle: ["Le fluide seul", "suffit-il ?"], bras: -84, cycle: 11.4, dessiner: tewi,
      dire: "Le TEWI — Il additionne la part directe (fuites × PRP) et la part indirecte (énergie consommée sur toute la vie). Un fluide bas PRP ne suffit pas à juger une machine." },
    { station: "impact-acv-carbone", titre: "Le cycle de vie", bulle: ["Que compte-t-on", "dans l'impact ?"], bras: -70, cycle: 11.5, dessiner: cycleVie,
      dire: "ACV & carbone — Une analyse de cycle de vie compte l'impact sur quatre étapes : fabriquer, transporter, exploiter, démolir. L'exploitation est en général la plus longue, le TEWI n'en est qu'une partie." },
    { station: "impact-ecoconception", titre: "Concevoir mieux", bulle: ["Que gagne-t-on", "à bien concevoir ?"], bras: -90, cycle: 11.4, dessiner: conception,
      dire: "Écoconception — On conçoit pour durer, se réparer et consommer moins. Un prix bas avec une mauvaise classe énergie peut coûter plus cher sur la vie de l'appareil : l'étiquette se lit avant d'acheter." },
    { station: "impact-montreal-kigali", titre: "De l'ozone au climat", bulle: ["Un traité de 1987", "pour le climat ?"], bras: -76, cycle: 11, dessiner: calendrier,
      dire: "Montréal → Kigali — Montréal, en 1987, vise l'ozone : CFC puis HCFC. Les HFC les remplacent, ODP nul mais PRP élevé. Kigali s'ajoute au même protocole pour les viser par leur PRP." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires parcourt l'impact environnemental d'une affaire en cinq étapes : " +
    "le PRP et l'ODP, deux impacts distincts, l'ozone d'un côté et la chaleur de l'autre (PRP & ODP), " +
    "le TEWI qui additionne l'effet direct des fuites et l'effet indirect de l'énergie consommée, " +
    "l'analyse de cycle de vie en quatre étapes (ACV & carbone), " +
    "l'écoconception et l'étiquette énergie (Écoconception), " +
    "le protocole de Montréal complété par l'amendement de Kigali (Montréal → Kigali).");
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

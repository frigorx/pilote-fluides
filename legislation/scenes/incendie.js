/* =====================================================================
   scenes/incendie.js — la scène de la branche « Incendie »
   ---------------------------------------------------------------------
   Remplace l'image scene-incendie.webp en tête de l'accueil des six
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="incendie" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Même mécanique que scenes/fluidique.js (le pilote) : SceneKit (pas à pas,
   une étape par station de la branche, dans l'ordre du plan ; l'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche, chaque étape le temps de son cycle) et VOYAGE_DESSIN pour le
   dessin, le liquide en nappe et le filigrane R9. Le chargé d'affaires est le
   bonhomme du pilote, recopié tel quel ; la personne du couloir (étape 3)
   est le même bonhomme. Les deux moteurs sont LUS, jamais modifiés.

   Les six dessins montrent le mécanisme de chaque station, avec les seuls
   faits de la station : un bâtiment, quatre questions, quatre régimes ; la
   réaction au feu (A1 à F) à côté de la résistance (R, E, I et des minutes) ;
   la fumée qui monte puis qu'on évacue pendant que l'air neuf entre en bas ;
   le fusible qui fond à 70 °C et le clapet qui ferme la gaine ; l'alarme qui
   part du détecteur et change l'état des dispositifs actionnés de sécurité ;
   la seule tête de sprinkler au-dessus du foyer qui s'ouvre, l'eau en nappe.
   Aucune valeur chiffrée nouvelle, aucune image, aucun symbole normalisé
   dessiné à la main : des formes simples (bâtiment, flamme, fumée, gaine).

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités (≥ 18,7 px quand le dessin fait
   850 px) ; tout bouge par le temps t (requestAnimationFrame), sans jamais
   tester le réglage système de réduction des animations ; seul l'interrupteur
   « Animations » du site (moteur/animations.js, choix explicite de
   l'utilisateur) fige le dessin sur l'image finale de chaque étape.
   La flamme est rouge, de la couleur de la branche. Un seul accent orange par
   étape : la règle qui l'emporte (1), la durée en minutes (2), la hauteur
   libre (3), le fusible (4), l'ordre qui part du centralisateur (5), la
   chaleur qui monte (6).
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="incendie"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#b91c1c";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
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

  const ROSE = "#fbeaea";       // fond clair des mises en évidence rouges (celui des illustrations des stations)
  const CIEL = "#e8f1fb";       // l'air, la gaine, le local voisin
  const FILET = "#9aaabb";      // le trait des cadres au repos
  const FUMEE = "#5a6b7d";      // la fumée, le sol, les tuyaux (celui des illustrations des stations)
  const BRUN = "#9a3412";       // le texte posé sur un fond orange clair

  /* la flamme des illustrations des stations, en rouge de la branche : maj(x, y, k, t), pied de la flamme en (x, y) */
  const FLAMME = "M0 0 C-30 -4 -38 -36 -14 -62 C-14 -44 -4 -40 0 -32 C4 -54 16 -68 22 -82 C42 -54 42 -8 0 0 Z";
  const COEUR = "M0 0 C-14 -2 -16 -18 -4 -30 C-2 -22 2 -20 6 -26 C14 -16 14 -2 0 0 Z";
  function flamme(parent) {
    const g = D.el("g", {}, parent);
    D.el("path", { d: FLAMME, fill: ACCENT }, g);
    D.el("path", { d: COEUR, fill: "#f2a8a0" }, g);
    const maj = (x, y, k, t) => {
      const v = FIGE ? 1 : 1 + 0.06 * Math.sin(t * 8.3) + 0.035 * Math.sin(t * 13.1), s = Math.max(k, 0.001);
      g.setAttribute("transform", `translate(${x} ${y}) scale(${(s * (1 + (v - 1) * 0.5)).toFixed(3)} ${(s * v).toFixed(3)})`);
    };
    maj.g = g;
    return maj;
  }

  /* la paroi hachurée des illustrations des stations : un motif, défini une fois par dessin */
  function hachures(parent) {
    const p = D.el("pattern", { id: "incendie-hach", width: 12, height: 12, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, D.el("defs", {}, parent));
    D.el("rect", { width: 12, height: 12, fill: "#e2e8f0" }, p);
    D.el("line", { x1: 0, y1: 0, x2: 0, y2: 12, stroke: "#94a3b8", "stroke-width": 3 }, p);
    return "url(#incendie-hach)";
  }

  /* un point à la fraction p (0 à 1) d'une ligne brisée */
  function surChemin(pts, p) {
    const seg = [];
    let L = 0;
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let reste = D.borne(p, 0, 1) * L;
    for (let i = 0; i < seg.length; i++) {
      if (reste <= seg[i] || i === seg.length - 1) {
        const u = seg[i] ? reste / seg[i] : 0;
        return [D.lerp(pts[i][0], pts[i + 1][0], u), D.lerp(pts[i][1], pts[i + 1][1], u)];
      }
      reste -= seg[i];
    }
  }

  /* une pointe de flèche pleine, qui regarde à droite, dont la pointe est en (x, y) */
  const pointe = (parent, x, y, coul, l) => D.el("path", { d: `M${x} ${y} L${x - (l || 14)} ${y - 8} V${y + 8} Z`, fill: coul }, parent);

  /* ---------- étape 1 · Classer le bâti : un bâtiment, quatre questions, quatre régimes ---------- */
  function classer(g) {
    const r = D.el("g", {}, g);
    const SOL = 372, CY = [104, 182, 260, 338], XQ = 460, LQ = 292, XR = 776, LR = 212;
    // le bâtiment à classer : des fenêtres, une porte
    D.el("path", { d: `M332 ${SOL} H424`, stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, r);
    D.el("rect", { x: 340, y: 178, width: 76, height: SOL - 178, fill: C.papier, stroke: C.navy, "stroke-width": 4 }, r);
    for (let k = 0; k < 4; k++) for (let c = 0; c < 3; c++)
      D.el("rect", { x: 350 + c * 22, y: 192 + k * 32, width: 14, height: 18, fill: "#cfd6df" }, r);
    D.el("rect", { x: 365, y: SOL - 36, width: 26, height: 36, fill: CIEL, stroke: C.navy, "stroke-width": 2.5 }, r);
    ecrire(r, 378, 160, "Bâtiment", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    // le tronc, puis une ligne par question : la question, une flèche, le régime
    D.el("path", { d: "M416 275 H444 M444 104 V338", fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round" }, r);
    // un petit pictogramme par question : une porte ouverte au public, la tour et sa cote, une maison, un poste de travail
    const PICTO = [
      (p, cx, c) => {
        D.el("rect", { x: cx - 2, y: c - 16, width: 20, height: 32, fill: CIEL, stroke: C.navy, "stroke-width": 2.5 }, p);
        D.el("path", { d: `M${cx - 24} ${c} H${cx - 10}`, stroke: ACCENT, "stroke-width": 3.5, "stroke-linecap": "round" }, p);
        pointe(p, cx - 3, c, ACCENT, 9);
      },
      (p, cx, c) => {
        D.el("rect", { x: cx - 10, y: c - 17, width: 16, height: 34, fill: CIEL, stroke: C.navy, "stroke-width": 2.5 }, p);
        D.el("path", { d: `M${cx - 10} ${c - 8} H${cx + 6}`, stroke: ACCENT, "stroke-width": 3 }, p);
        D.el("path", { d: `M${cx + 14} ${c + 17} V${c - 8} M${cx + 10} ${c - 8} H${cx + 18}`, fill: "none", stroke: ACCENT, "stroke-width": 3, "stroke-linecap": "round" }, p);
      },
      (p, cx, c) => {
        D.el("path", { d: `M${cx - 16} ${c - 1} L${cx} ${c - 16} L${cx + 16} ${c - 1} V${c + 16} H${cx - 16} Z`, fill: CIEL, stroke: C.navy, "stroke-width": 2.5, "stroke-linejoin": "round" }, p);
        D.el("rect", { x: cx - 4, y: c + 3, width: 8, height: 13, fill: C.papier, stroke: C.navy, "stroke-width": 2 }, p);
      },
      (p, cx, c) => {
        D.el("rect", { x: cx - 15, y: c - 15, width: 30, height: 20, rx: 2, fill: CIEL, stroke: C.navy, "stroke-width": 2.5 }, p);
        D.el("path", { d: `M${cx} ${c + 5} V${c + 11} M${cx - 10} ${c + 12} H${cx + 10}`, fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round" }, p);
      }
    ];
    const LIGNES = [["Du public y entre ?", "ERP"], ["Plancher très haut ?", "IGH"], ["On y habite ?", "Habitation"], ["Que des salariés ?", "Code du travail"]];
    const lignes = LIGNES.map(([q, rg], i) => {
      const c = CY[i];
      D.el("path", { d: `M444 ${c} H${XQ}`, stroke: C.navy, "stroke-width": 3 }, r);
      const boite = D.el("rect", { x: XQ, y: c - 30, width: LQ, height: 60, rx: 12, fill: C.papier, stroke: FILET, "stroke-width": 3 }, r);
      PICTO[i](r, XQ + 34, c);
      ecrire(r, XQ + 66, c + 8, q, 24, {});
      D.el("path", { d: `M${XQ + LQ + 2} ${c} H${XR - 6}`, stroke: C.gris, "stroke-width": 3 }, r);
      pointe(r, XR, c, C.gris, 12);
      const regime = D.el("g", { opacity: 0 }, r);
      D.el("rect", { x: XR, y: c - 30, width: LR, height: 60, rx: 12, fill: ROSE, stroke: ACCENT, "stroke-width": 3 }, regime);
      ecrire(regime, XR + LR / 2, c + 9, rg, 24, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
      return { boite: boite, regime: regime, chemin: [[416, 275], [444, 275], [444, c], [XQ, c]], t0: 0.9 + 1.55 * i };
    });
    const jeton = D.el("circle", { r: 9, fill: ACCENT, stroke: C.papier, "stroke-width": 3, opacity: 0 }, r);
    // la règle qui l'emporte quand plusieurs cas se cumulent (l'accent orange de l'étape)
    const bande = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 340, y: 388, width: 648, height: 44, rx: 14, fill: "#fff4ec", stroke: C.orange, "stroke-width": 3 }, bande);
    ecrire(bande, 664, 417, "Plusieurs cas : on suit la règle la plus contraignante", 22, { "text-anchor": "middle", "font-weight": 700, fill: BRUN });
    return t => {
      const f = FIGE ? 9.4 : t % 11.4, sortie = 1 - D.lisse((f - 10.8) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      let vu = 0;
      lignes.forEach(o => {
        const p = (f - o.t0) / 0.8;
        if (p > 0 && p < 1) {   // le jeton file du bâtiment vers la question
          const [x, y] = surChemin(o.chemin, D.lisse(p));
          jeton.setAttribute("cx", x.toFixed(1)); jeton.setAttribute("cy", y.toFixed(1));
          vu = D.fenetre(p, 0, 1, 0.15);
        }
        const a = D.lisse((f - o.t0 - 0.8) / 0.3);
        o.boite.setAttribute("stroke", a > 0.5 ? ACCENT : FILET); o.boite.setAttribute("stroke-width", a > 0.5 ? 4.5 : 3);
        voir(o.regime, a);
      });
      voir(jeton, vu);
      voir(bande, D.lisse((f - 7.4) / 0.4));
    };
  }

  /* ---------- étape 2 · Euroclasses : la réaction du produit, la résistance de l'ouvrage ---------- */
  function deuxQuestions(g) {
    const r = D.el("g", {}, g);
    const hach = hachures(r);
    const PY = 66, PH = 296, XG = 324, XD = 664;
    const panneau = (x, titre, question) => {
      const cadre = D.el("rect", { x: x, y: PY, width: 324, height: PH, rx: 14, fill: C.papier, stroke: FILET, "stroke-width": 3 }, r);
      ecrire(r, x + 162, 102, titre, 24, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
      ecrire(r, x + 162, 132, question, 22, { "text-anchor": "middle" });
      return cadre;
    };
    const cadreG = panneau(XG, "Réaction au feu", "Alimente-t-il le feu ?");
    const cadreD = panneau(XD, "Résistance au feu", "L'ouvrage tient-il ?");

    // à gauche : le produit sur lequel brûle la flamme, l'échelle A1 à F, la classe lue
    D.el("rect", { x: 392, y: 218, width: 160, height: 24, rx: 3, fill: "#cfd6df", stroke: FUMEE, "stroke-width": 2 }, r);
    const flG = flamme(r);
    const CLASSES = ["A1", "A2", "B", "C", "D", "E", "F"];
    const cases = CLASSES.map((n, i) => {
      const x = 332 + 44 * i, c = D.el("g", { opacity: 0 }, r);
      const fond = D.el("rect", { x: x, y: 276, width: 44, height: 36, rx: 6, fill: "#eef3f9", stroke: FILET, "stroke-width": 2.5 }, c);
      if (n === "F") fond.setAttribute("stroke-dasharray", "5 4");
      ecrire(c, x + 22, 302, n, 22, { "text-anchor": "middle", fill: C.navy });
      return { c: c, fond: fond };
    });
    const repere = D.el("path", { d: "M442 272 L432 256 H452 Z", fill: ACCENT, opacity: 0 }, r);
    const etiqG = ecrire(r, 486, 346, "B-s1,d0", 26, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });

    // à droite : la flamme, la paroi, ce qui ne passe pas (E), la face froide (I), les minutes
    D.el("path", { d: "M676 318 H976", stroke: FUMEE, "stroke-width": 4, "stroke-linecap": "round" }, r);
    D.el("rect", { x: 790, y: 190, width: 28, height: 128, fill: hach, stroke: C.navy, "stroke-width": 3 }, r);
    const flD = flamme(r);
    const gaz = [258, 288].map(y => D.el("path", { d: `M750 ${y} q9 -10 18 0 t18 0`, fill: "none", stroke: ACCENT, "stroke-width": 4.5, "stroke-linecap": "round", "stroke-dasharray": "9 7", opacity: 0 }, r));
    const lE = ecrire(r, 770, 238, "E", 26, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    // R : la charge posée sur la paroi, qu'elle continue de porter
    const poids = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 772, y: 178, width: 64, height: 12, rx: 2, fill: "#cfd6df", stroke: FUMEE, "stroke-width": 2 }, poids);
    D.el("path", { d: "M804 154 V164", stroke: C.navy, "stroke-width": 5, "stroke-linecap": "round" }, poids);
    D.el("path", { d: "M804 176 L794 162 H814 Z", fill: C.navy }, poids);
    const lR = ecrire(r, 756, 188, "R", 26, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    D.el("rect", { x: 872, y: 190, width: 16, height: 92, rx: 8, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, r);
    const mercure = D.el("rect", { x: 876, width: 8, fill: ACCENT }, r);
    D.el("circle", { cx: 880, cy: 296, r: 15, fill: ACCENT, stroke: C.navy, "stroke-width": 3 }, r);
    const lI = ecrire(r, 880, 178, "I", 26, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    D.el("circle", { cx: 944, cy: 226, r: 18, fill: "none", stroke: "#dfe6ee", "stroke-width": 6 }, r);
    const CIRC = 2 * Math.PI * 18;
    const anneau = D.el("circle", { cx: 944, cy: 226, r: 18, fill: "none", stroke: C.orange, "stroke-width": 6, "stroke-linecap": "round",
      "stroke-dasharray": `${CIRC.toFixed(1)} ${CIRC.toFixed(1)}`, transform: "rotate(-90 944 226)" }, r);
    const minutes = ecrire(r, 944, 274, "30 min", 22, { "text-anchor": "middle", "font-weight": 700, fill: BRUN, opacity: 0 });
    const etiqD = ecrire(r, 826, 346, "EI 30", 26, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });

    // la leçon : les deux questions ne se déduisent pas l'une de l'autre
    const bande = D.el("g", { opacity: 0 }, r);
    D.el("rect", { x: 324, y: 374, width: 664, height: 50, rx: 14, fill: CIEL, stroke: FILET, "stroke-width": 2.5 }, bande);
    ecrire(bande, 656, 406, "La réaction ne dit rien de la tenue du mur", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    return t => {
      const f = FIGE ? 10.4 : t % 12, sortie = 1 - D.lisse((f - 11.4) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      const gauche = f < 5 ? 1 : 0, droite = f >= 5 && f < 10.4 ? 1 : 0;
      cadreG.setAttribute("stroke", FIGE || gauche ? ACCENT : FILET); cadreG.setAttribute("stroke-width", gauche || FIGE ? 4.5 : 3);
      cadreD.setAttribute("stroke", FIGE || droite ? ACCENT : FILET); cadreD.setAttribute("stroke-width", droite || FIGE ? 4.5 : 3);
      // gauche
      flG(472, 218, 0.78 * D.lisse((f - 0.5) / 0.7), t);
      cases.forEach((o, i) => voir(o.c, D.lisse((f - 1 - 0.28 * i) / 0.3)));
      const choisie = D.lisse((f - 3.4) / 0.4);
      cases[2].fond.setAttribute("fill", choisie > 0.5 ? ROSE : "#eef3f9");
      cases[2].fond.setAttribute("stroke", choisie > 0.5 ? ACCENT : FILET); cases[2].fond.setAttribute("stroke-width", choisie > 0.5 ? 4 : 2.5);
      voir(repere, choisie); voir(etiqG, D.lisse((f - 4.1) / 0.4));
      // droite
      flD(712, 318, 0.8 * D.lisse((f - 5.2) / 0.8), t);
      const flux = D.lisse((f - 5.8) / 0.4);
      gaz.forEach((p, i) => { voir(p, flux); p.setAttribute("stroke-dashoffset", (-f * 26 + i * 8).toFixed(1)); });
      voir(poids, D.lisse((f - 5.8) / 0.4)); voir(lR, D.lisse((f - 6) / 0.4));
      voir(lE, D.lisse((f - 6.8) / 0.4));
      const h = 0.2 * D.lisse((f - 5.8) / 3.4);   // la face froide reste basse
      mercure.setAttribute("y", (296 - 8 - h * 96).toFixed(1)); mercure.setAttribute("height", (8 + h * 96).toFixed(1));
      voir(lI, D.lisse((f - 7.6) / 0.4));
      anneau.setAttribute("stroke-dashoffset", (CIRC * (1 - D.borne((f - 5.8) / 3.4, 0, 1))).toFixed(1));
      voir(minutes, D.lisse((f - 9.2) / 0.4)); voir(etiqD, D.lisse((f - 9.4) / 0.4));
      voir(bande, D.lisse((f - 10) / 0.4));
    };
  }

  /* ---------- étape 3 · Le désenfumage : les fumées montent, on les évacue, la hauteur libre revient ---------- */
  function couloir(g) {
    const r = D.el("g", {}, g);
    const X0 = 334, X1 = 884, YC = 176, SOL = 376, FX = 560, PX = 672, BX = 742, MX = 800, FY = 118;
    // la fumée : un dégradé, plus dense en haut
    const degrade = D.el("linearGradient", { id: "incendie-fumee", x1: 0, y1: 0, x2: 0, y2: 1 }, D.el("defs", {}, r));
    D.el("stop", { offset: 0, "stop-color": "#46556a", "stop-opacity": 0.82 }, degrade);
    D.el("stop", { offset: 1, "stop-color": "#7d8b9b", "stop-opacity": 0.42 }, degrade);
    D.el("rect", { x: X0, y: YC, width: X1 - X0, height: SOL - YC, fill: "#eef3f9" }, r);
    // l'air neuf entre en bas : la bouche d'amenée, des chevrons filent au ras du sol
    D.el("rect", { x: X0 + 4, y: 318, width: 22, height: 54, fill: C.papier, stroke: C.bleu, "stroke-width": 3 }, r);
    D.el("path", { d: `M${X0 + 8} 330 H${X0 + 22} M${X0 + 8} 342 H${X0 + 22} M${X0 + 8} 354 H${X0 + 22}`, stroke: C.bleu, "stroke-width": 2.5 }, r);
    const air = [0, 1, 2, 3, 4].map(() => D.el("path", { d: "M-7 -9 L5 0 L-7 9", fill: "none", stroke: C.bleu, "stroke-width": 5,
      "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, r));
    // la couche de fumée sous le plafond, les bouffées qui montent du foyer
    const couche = D.el("path", { fill: "url(#incendie-fumee)" }, r);
    const plume = [0, 1, 2, 3, 4, 5, 6].map(() => D.el("circle", { r: 8, fill: FUMEE, opacity: 0 }, r));
    // la sortie : le conduit, la bouche au plafond, le ventilateur d'extraction
    D.el("rect", { x: MX - 12, y: FY + 20, width: 24, height: YC - FY - 20, fill: C.papier }, r);
    D.el("path", { d: `M${MX - 12} ${YC} V${FY + 20} M${MX + 12} ${YC} V${FY + 20}`, stroke: C.navy, "stroke-width": 3 }, r);
    D.el("rect", { x: MX - 26, y: YC - 4, width: 52, height: 8, fill: ACCENT }, r);
    const balayage = [0, 1, 2, 3].map(() => D.el("path", { d: "M-6 -8 L4 0 L-6 8", fill: "none", stroke: C.papier, "stroke-width": 4.5,
      "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, r));
    const rejet = [0, 1, 2, 3, 4].map(() => D.el("circle", { r: 8, fill: FUMEE, opacity: 0 }, r));
    const helice = D.ventilateur(r, MX, FY, 20);
    // la personne : la hauteur libre se mesure à sa taille
    const pers = bonhomme(r, { dephasage: 0.7 });
    const fl = flamme(r);
    D.el("rect", { x: X0, y: YC, width: X1 - X0, height: SOL - YC, fill: "none", stroke: C.navy, "stroke-width": 3 }, r);
    // la hauteur libre : la barre orange, de la couche au sol
    const barre = D.el("rect", { x: BX, width: 10, fill: C.orange }, r);
    const butee = D.el("path", { fill: "none", stroke: C.orange, "stroke-width": 4, "stroke-linecap": "round" }, r);
    const lFoyer = ecrire(r, FX, 410, "Foyer", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    const lLibre = ecrire(r, BX + 5, 410, "Hauteur libre", 22, { "text-anchor": "middle", "font-weight": 700, fill: BRUN, opacity: 0 });
    const lFumees = ecrire(r, 338, 166, "Fumées", 22, { "font-weight": 700, fill: C.navy, opacity: 0 });
    const lAir = ecrire(r, 338, 410, "Amenée d'air", 22, { "font-weight": 700, fill: C.bleu, opacity: 0 });
    const lExtraction = ecrire(r, MX - 30, FY + 8, "Extraction", 22, { "text-anchor": "end", "font-weight": 700, fill: C.navy, opacity: 0 });
    const morale = D.el("g", { opacity: 0 }, r);
    ecrire(morale, 338, 98, "Il gagne du temps", 22, { "font-weight": 700, fill: ACCENT });
    ecrire(morale, 338, 126, "pour sortir", 22, { "font-weight": 700, fill: ACCENT });
    return t => {
      const f = FIGE ? 10.4 : t % 12, sortie = 1 - D.lisse((f - 11.4) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      const marche = D.lisse((f - 3.8) / 0.6);   // le ventilateur démarre
      const yb = D.courbe([[0.6, YC + 3], [3.6, 240], [4, 240], [8.2, 220]], f);   // le bas de la couche : elle descend, puis recule
      const releve = x => 18 * marche * D.lisse((x - 590) / 200);                      // vers la bouche, la couche est aspirée
      let d = `M${X0 + 3} ${YC + 3}`;
      for (let x = X0 + 3; x <= X1 - 3; x += 18)
        d += ` L${x} ${Math.max(YC + 3, yb - releve(x) + (yb > YC + 8 ? 4 * Math.sin(x / 37 - t * 1.6) : 0)).toFixed(1)}`;
      couche.setAttribute("d", d + ` L${X1 - 3} ${YC + 3} Z`);
      const yl = Math.max(YC + 3, yb - releve(BX));
      barre.setAttribute("y", yl.toFixed(1)); barre.setAttribute("height", (SOL - yl).toFixed(1));
      butee.setAttribute("d", `M${BX - 10} ${yl.toFixed(1)} H${BX + 20}`);
      fl(FX, SOL, 0.9 * D.lisse((f - 0.2) / 1), t);
      pers({ x: PX, y: SOL - 73 * 1.5, k: 1.5, t: t, bras: -12 });
      // la plume : des bouffées montent du foyer jusqu'à la couche
      const vivante = D.lisse((f - 0.9) / 0.5);
      plume.forEach((c, i) => {
        const s = FIGE ? (i + 0.5) / 7 : D.frac((f - 1 + i * 0.35) / 2.4);
        c.setAttribute("cx", (FX + 11 * Math.sin(i * 2.1 + s * 5)).toFixed(1));
        c.setAttribute("cy", D.lerp(296, yb + 8, s).toFixed(1));
        c.setAttribute("r", D.lerp(6, 16, s).toFixed(1));
        voir(c, 0.5 * D.fenetre(s, 0, 1, 0.2) * vivante);
      });
      // le ventilateur prend de la vitesse : l'air entre en bas, la fumée est tirée vers la bouche puis rejetée dehors
      const u = D.borne(f - 3.6, 0, 1);
      helice(f < 3.6 ? 0 : f < 4.6 ? 900 * (u * u * u - u * u * u * u / 2) : 900 * (0.5 + (f - 4.6)));
      air.forEach((c, i) => {
        const s = FIGE ? (i + 0.5) / 5 : D.frac(f * 0.4 + i / 5);
        c.setAttribute("transform", `translate(${(X0 + 38 + s * 270).toFixed(1)} 352)`);
        voir(c, marche * D.fenetre(s, 0, 1, 0.15));
      });
      balayage.forEach((c, i) => {
        const s = FIGE ? (i + 0.5) / 4 : D.frac(f * 0.55 + i / 4);
        c.setAttribute("transform", `translate(${(596 + s * 190).toFixed(1)} 197)`);
        voir(c, marche * D.fenetre(s, 0, 1, 0.15));
      });
      rejet.forEach((c, i) => {
        const s = FIGE ? (i + 0.5) / 5 : D.frac((f - 4) * 0.5 + i / 5), LA = YC - 4 - FY, LB = 141, p = s * (LA + LB);
        const x = p < LA ? MX : MX + 140 * (p - LA) / LB, y = p < LA ? YC - 4 - p : FY - 18 * (p - LA) / LB;
        c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); c.setAttribute("r", D.lerp(8, 11, s).toFixed(1));
        voir(c, 0.65 * D.fenetre(s, 0, 1, 0.12) * marche);
      });
      voir(lFoyer, D.lisse((f - 0.8) / 0.4)); voir(lLibre, D.lisse((f - 1.2) / 0.4)); voir(lFumees, D.lisse((f - 2.2) / 0.4));
      voir(lAir, marche); voir(lExtraction, marche);
      voir(morale, D.lisse((f - 6.4) / 0.4));
    };
  }

  /* ---------- étape 4 · Les clapets coupe-feu : à 70 °C le fusible fond, la lame ferme la gaine ---------- */
  function clapet(g) {
    const r = D.el("g", {}, g);
    const hach = hachures(r);
    const SOL = 376, WX = 622, WW = 44, YH = 215, YB = 285, YG = 250, HX = 612, HY = 226, TF = 5.0, TC = 5.0;
    D.el("rect", { x: 322, y: 96, width: WX - 322, height: SOL - 96, fill: ROSE }, r);
    D.el("rect", { x: WX + WW, y: 96, width: 988 - WX - WW, height: SOL - 96, fill: "#eef3f9" }, r);
    D.el("path", { d: `M322 ${SOL} H988`, stroke: FUMEE, "stroke-width": 4 }, r);
    D.el("rect", { x: WX, y: 96, width: WW, height: SOL - 96, fill: hach, stroke: C.navy, "stroke-width": 3 }, r);
    ecrire(r, WX + WW / 2, 82, "Paroi coupe-feu", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    // la gaine traverse la paroi : un trou fait pour elle
    D.el("rect", { x: 322, y: YH, width: 666, height: YB - YH, fill: C.papier }, r);
    D.el("path", { d: `M322 ${YH} H988 M322 ${YB} H988`, stroke: C.navy, "stroke-width": 4 }, r);
    const f1 = flamme(r), f2 = flamme(r);
    ecrire(r, 334, 200, "Gaz chauds", 22, { "font-weight": 700, fill: ACCENT });
    // le thermomètre et son repère de 70 °C
    D.el("rect", { x: 470, y: 98, width: 16, height: 76, rx: 8, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, r);
    const mercure = D.el("rect", { x: 474, width: 8, fill: ACCENT }, r);
    D.el("circle", { cx: 478, cy: 188, r: 15, fill: ACCENT, stroke: C.navy, "stroke-width": 3 }, r);
    D.el("path", { d: "M460 122 H504", stroke: ENCRE, "stroke-width": 3, "stroke-dasharray": "5 4" }, r);
    ecrire(r, 512, 130, "70 °C", 22, { "font-weight": 700, fill: C.navy });
    // les gaz chauds dans la gaine : à gauche de la lame toujours, au-delà tant qu'elle est ouverte
    const gazG = D.el("path", { d: `M340 ${YG} H580`, fill: "none", stroke: ACCENT, "stroke-width": 7, "stroke-linecap": "round", "stroke-dasharray": "22 16" }, r);
    const teteG = pointe(r, 604, YG, ACCENT, 22);
    const gazD = D.el("path", { d: `M690 ${YG} H872`, fill: "none", stroke: ACCENT, "stroke-width": 7, "stroke-linecap": "round", "stroke-dasharray": "22 16" }, r);
    const teteD = pointe(r, 900, YG, ACCENT, 22);
    // le clapet : le corps au droit de la paroi, la lame articulée en haut, retenue par le fusible
    D.el("rect", { x: 604, y: YH - 8, width: 80, height: YB - YH + 16, rx: 4, fill: "#e6edf6", stroke: C.navy, "stroke-width": 3 }, r);
    const fusible = D.el("rect", { x: 663, y: 211, width: 10, height: 15, rx: 3, fill: C.orange, stroke: BRUN, "stroke-width": 2 }, r);
    const lame = D.el("rect", { x: -4, y: 0, width: 8, height: 56, rx: 2, fill: C.navy }, D.el("g", {}, r));
    const pivot = lame.parentNode;
    D.el("circle", { cx: HX, cy: HY, r: 7, fill: C.navy }, r);
    const goutte = D.el("path", { d: "M0 -11 Q8 0 0 7 Q-8 0 0 -11 Z", fill: C.orange, stroke: BRUN, "stroke-width": 1.5, opacity: 0 }, r);
    const lFus = D.el("g", { opacity: 0 }, r);
    D.el("path", { d: "M676 210 L698 192", stroke: C.gris, "stroke-width": 2.5, "stroke-linecap": "round" }, lFus);
    ecrire(lFus, 702, 192, "fusible", 22, { "font-weight": 700, fill: BRUN });
    const lClapet = D.el("g", { opacity: 0 }, r);
    D.el("path", { d: "M682 292 L700 312", stroke: C.gris, "stroke-width": 2.5, "stroke-linecap": "round" }, lClapet);
    ecrire(lClapet, 704, 326, "Clapet", 22, { "font-weight": 700, fill: C.navy });
    // le résultat : le clapet a le degré de la paroi
    const ok = coche(r, 468, 410);
    const morale = ecrire(r, 492, 418, "Même degré coupe-feu que la paroi", 22, { "font-weight": 700, fill: C.navy, opacity: 0 });
    return t => {
      const f = FIGE ? 8.8 : t % 11, sortie = 1 - D.lisse((f - 10.4) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      f1(410, SOL, 0.95, t); f2(494, SOL, 0.7, t);
      // le mercure monte jusqu'au repère : à 70 °C le fusible fond
      const niv = D.lisse((f - 0.6) / 4);
      const haut = D.lerp(172, 122, niv);
      mercure.setAttribute("y", haut.toFixed(1)); mercure.setAttribute("height", (188 - haut).toFixed(1));
      const ferme = f >= TC, u = D.borne((f - TC) / 0.8, 0, 1);
      const chauffe = f > 4.2 && f < TF ? 0.5 + 0.5 * Math.sin(f * 30) : 1;
      fusible.setAttribute("opacity", f < TF ? chauffe.toFixed(2) : "0");
      const angle = -90 + 90 * u * u;
      pivot.setAttribute("transform", `translate(${HX} ${HY}) rotate(${angle.toFixed(1)})`);
      const chute = D.borne((f - TF) / 0.7, 0, 1);
      goutte.setAttribute("transform", `translate(668 ${D.lerp(228, 276, chute * chute).toFixed(1)})`);
      voir(goutte, f >= TF ? 1 : 0);
      // les gaz : le flux file jusqu'à la lame ; après la fermeture il s'arrête, et plus rien ne passe de l'autre côté
      const course = FIGE ? 0 : Math.min(f, TC + 0.4) * 80;
      gazG.setAttribute("stroke-dashoffset", (-course).toFixed(1)); gazD.setAttribute("stroke-dashoffset", (-course).toFixed(1));
      const arrive = D.lisse((f - 0.8) / 0.5), apres = ferme ? 1 - D.lisse((f - TC - 0.1) / 0.5) : 1;
      voir(gazG, arrive); voir(teteG, arrive); voir(gazD, arrive * apres); voir(teteD, arrive * apres);
      voir(lFus, D.lisse((f - 0.8) / 0.4) * (f < TF ? 1 : 0)); voir(lClapet, D.lisse((f - 5.8) / 0.4));
      voir(ok, D.lisse((f - 6.8) / 0.3)); voir(morale, D.lisse((f - 7) / 0.4));
    };
  }

  /* ---------- étape 5 · Le SSI : l'alarme part du détecteur, le centralisateur la traite, les DAS changent d'état ---------- */
  function alarme(g) {
    const r = D.el("g", {}, g);
    const DX = 372, DY = 150, CM = [486, 188, 108, 96], TX = 626, CYS = [110, 194, 278, 362], IX = 700;
    // la zone de mise en sécurité : elle se teinte quand l'ordre arrive
    const zone = D.el("rect", { x: 650, y: 70, width: 338, height: 342, rx: 14, fill: ROSE, "fill-opacity": 0, stroke: FILET, "stroke-width": 3 }, r);
    // 1 · le foyer, la fumée qui monte, le détecteur
    ecrire(r, DX, 96, "Détecteur", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    const fl = flamme(r);
    const fumee = [0, 1, 2].map(() => D.el("circle", { r: 8, fill: FUMEE, opacity: 0 }, r));
    D.el("circle", { cx: DX, cy: DY, r: 24, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, r);
    const voyant = D.el("circle", { cx: DX, cy: DY, r: 9, fill: C.navy }, r);
    const ondes = [0, 1].map(() => D.el("circle", { cx: DX, cy: DY, r: 24, fill: "none", stroke: ACCENT, "stroke-width": 4, opacity: 0 }, r));
    // 2 · le centralisateur de mise en sécurité
    D.el("path", { d: `M${DX + 24} ${DY} H456 V236 H${CM[0] - 4}`, fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, r);
    pointe(r, CM[0], 236, C.navy, 12);
    const boite = D.el("rect", { x: CM[0], y: CM[1], width: CM[2], height: CM[3], rx: 10, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, r);
    D.el("rect", { x: CM[0] + 14, y: CM[1] + 14, width: 80, height: 26, rx: 4, fill: "#eef3f9", stroke: C.navy, "stroke-width": 2 }, r);
    const leds = [0, 1, 2].map(i => D.el("circle", { cx: CM[0] + 26 + i * 28, cy: CM[1] + 72, r: 7, fill: C.navy }, r));
    ecrire(r, CM[0] + CM[2] / 2, 312, "Centralisateur", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    // 3 · les quatre dispositifs actionnés de sécurité
    D.el("path", { d: `M${CM[0] + CM[2]} 236 H${TX} M${TX} ${CYS[0]} V${CYS[3]}`, fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round" }, r);
    const NOMS = [["Clapet coupe-feu", "se ferme"], ["Volet de désenfumage", "s'ouvre"], ["Porte coupe-feu", "se ferme"], ["CTA", "s'arrête"]];
    const etats = [];
    NOMS.forEach(([nom, etat], i) => {
      const cy = CYS[i];
      D.el("path", { d: `M${TX} ${cy} H${IX - 40}`, stroke: C.navy, "stroke-width": 3 }, r);
      pointe(r, IX - 28, cy, C.navy, 12);
      ecrire(r, 744, cy - 6, nom, 22, { "font-weight": 700, fill: C.navy });
      etats.push(ecrire(r, 744, cy + 23, etat, 22, { fill: C.navy, opacity: 0 }));
    });
    const lames = [];   // clapet et volet : une lame dans la gaine ; la porte : un vantail ; la CTA : un ventilateur
    [0, 1].forEach(i => {
      D.el("rect", { x: IX - 22, y: CYS[i] - 20, width: 44, height: 40, fill: CIEL, stroke: C.navy, "stroke-width": 3 }, r);
      lames.push(D.el("path", { d: "M-17 0 H17", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, D.el("g", {}, r)));
    });
    D.el("rect", { x: IX - 22, y: CYS[2] - 8, width: 8, height: 16, fill: C.navy }, r);
    D.el("rect", { x: IX + 14, y: CYS[2] - 8, width: 8, height: 16, fill: C.navy }, r);
    const vantail = D.el("path", { d: "M0 0 H28", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, D.el("g", {}, r));
    const helice = D.ventilateur(r, IX, CYS[3], 22);
    const jetons = [D.el("circle", { r: 9, fill: C.orange, stroke: C.papier, "stroke-width": 3, opacity: 0 }, r)];
    CYS.forEach(() => jetons.push(D.el("circle", { r: 9, fill: C.orange, stroke: C.papier, "stroke-width": 3, opacity: 0 }, r)));
    return t => {
      const f = FIGE ? 9.4 : t % 11.4, sortie = 1 - D.lisse((f - 10.8) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      fl(DX, 366, 0.95 * D.lisse((f - 0.3) / 0.9), t);
      // la fumée monte du foyer jusqu'au détecteur
      fumee.forEach((c, i) => {
        const s = FIGE ? 0 : D.frac((f - 1 - i * 0.55) / 1.6);
        c.setAttribute("cx", (DX + 9 * Math.sin(i * 2 + s * 5)).toFixed(1)); c.setAttribute("cy", D.lerp(298, DY + 34, s).toFixed(1));
        c.setAttribute("r", D.lerp(6, 13, s).toFixed(1));
        voir(c, f > 1 && f < 3 ? 0.5 * D.fenetre(s, 0, 1, 0.2) : 0);
      });
      // le détecteur déclenche
      const dcl = D.lisse((f - 2.6) / 0.2);
      voyant.setAttribute("fill", dcl > 0.5 ? ACCENT : C.navy);
      ondes.forEach((o, i) => {
        const s = D.borne((f - 2.6 - i * 0.4) / 1, 0, 1);
        o.setAttribute("r", (24 + 16 * s).toFixed(1)); voir(o, s > 0 && s < 1 ? 0.9 * (1 - s) : 0);
      });
      // l'ordre part du détecteur, atteint le centralisateur, puis les quatre dispositifs
      const pc = D.borne((f - 3) / 1.3, 0, 1), cheminD = [[DX + 24, DY], [456, DY], [456, 236], [CM[0] - 4, 236]];
      let [x, y] = surChemin(cheminD, D.lisse(pc));
      jetons[0].setAttribute("cx", x.toFixed(1)); jetons[0].setAttribute("cy", y.toFixed(1));
      voir(jetons[0], pc > 0 && pc < 1 ? D.fenetre(pc, 0, 1, 0.1) : 0);
      const rouge = D.lisse((f - 4.4) / 0.3);
      boite.setAttribute("stroke", rouge > 0.5 ? ACCENT : C.navy); boite.setAttribute("stroke-width", rouge > 0.5 ? 4.5 : 3);
      leds[2].setAttribute("fill", rouge > 0.5 ? ACCENT : C.navy);
      zone.setAttribute("fill-opacity", rouge.toFixed(2)); zone.setAttribute("stroke", rouge > 0.5 ? ACCENT : FILET);
      const pz = D.borne((f - 4.8) / 1.1, 0, 1);
      CYS.forEach((cy, i) => {
        [x, y] = surChemin([[CM[0] + CM[2], 236], [TX, 236], [TX, cy], [IX - 40, cy]], D.lisse(pz));
        jetons[i + 1].setAttribute("cx", x.toFixed(1)); jetons[i + 1].setAttribute("cy", y.toFixed(1));
        voir(jetons[i + 1], pz > 0 && pz < 1 ? D.fenetre(pz, 0, 1, 0.1) : 0);
        voir(etats[i], D.lisse((f - 6.4 - 0.35 * i) / 0.3));
      });
      // les dispositifs changent d'état
      const a = D.lisse((f - 5.9) / 0.9);
      lames[0].parentNode.setAttribute("transform", `translate(${IX} ${CYS[0]}) rotate(${(90 * a).toFixed(1)})`);      // le clapet se ferme
      lames[1].parentNode.setAttribute("transform", `translate(${IX} ${CYS[1]}) rotate(${(90 * (1 - a)).toFixed(1)})`); // le volet s'ouvre
      vantail.parentNode.setAttribute("transform", `translate(${IX - 14} ${CYS[2]}) rotate(${(-80 * (1 - a)).toFixed(1)})`);   // la porte se ferme
      const tau = D.borne(f - 5.9, 0, 1.5), q = tau / 1.5;   // la CTA ralentit puis s'arrête : la vitesse de 700 °/s tombe à zéro en 1,5 s
      helice(FIGE ? 0 : 700 * (Math.min(f, 5.9) + tau - 1.5 * (q * q * q - q * q * q * q / 2)));
    };
  }

  /* ---------- étape 6 · Sprinkler & RIA : seule la tête au-dessus du foyer s'ouvre, l'eau tombe en nappe ---------- */
  function sprinkler(g) {
    const r = D.el("g", {}, g);
    const TETES = [392, 516, 640, 764, 888], JX = 640, SOL = 398, JY0 = 209, H = SOL - JY0;
    D.el("rect", { x: 326, y: 118, width: 660, height: 14, rx: 4, fill: "#9fbfe0", stroke: C.navy, "stroke-width": 3 }, r);
    D.el("path", { d: `M326 ${SOL} H986`, stroke: FUMEE, "stroke-width": 4, "stroke-linecap": "round" }, r);
    // la chaleur qui monte du foyer (polygone : aplat translucide, l'accent orange de l'étape)
    const chaleur = D.el("linearGradient", { id: "incendie-chaleur", x1: 0, y1: 0, x2: 0, y2: 1 }, D.el("defs", {}, r));
    D.el("stop", { offset: 0, "stop-color": C.orange, "stop-opacity": 0.1 }, chaleur);
    D.el("stop", { offset: 1, "stop-color": C.orange, "stop-opacity": 0.55 }, chaleur);
    const panache = D.el("polygon", { points: `612,${SOL - 4} 668,${SOL - 4} 702,236 578,236`, fill: "url(#incendie-chaleur)", opacity: 0 }, r);
    let ampoule = null, lFerme = null, lOuverte = null;
    TETES.forEach(hx => {
      D.el("rect", { x: hx - 6, y: 132, width: 12, height: 16, fill: FUMEE }, r);
      D.el("rect", { x: hx - 13, y: 148, width: 26, height: 14, rx: 3, fill: FUMEE }, r);
      D.el("path", { d: `M${hx - 11} 162 L${hx - 24} 204 M${hx + 11} 162 L${hx + 24} 204`, fill: "none", stroke: FUMEE, "stroke-width": 4 }, r);
      const amp = D.el("ellipse", { cx: hx, cy: 182, rx: 8, ry: 16, fill: ACCENT }, r);
      D.el("path", { d: `M${hx - 28} 207 H${hx + 28}`, stroke: C.navy, "stroke-width": 5, "stroke-linecap": "round" }, r);
      if (hx === JX) {
        ampoule = amp;
        lFerme = ecrire(r, hx, 104, "fermée", 22, { "text-anchor": "middle", fill: C.navy });
        lOuverte = ecrire(r, hx, 104, "ouverte", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
      } else ecrire(r, hx, 104, "fermée", 22, { "text-anchor": "middle", fill: C.navy });
    });
    // l'eau : une gerbe découpée, remplie par D.liquide (nappe translucide), des filets qui descendent
    const demi = q => 10 + 96 * Math.pow(q, 0.6);   // la demi-largeur de la gerbe à la fraction q de la chute
    const forme = D.el("path", {}, D.el("clipPath", { id: "incendie-gerbe" }, r));
    const eau = D.el("g", { "clip-path": "url(#incendie-gerbe)" }, r);
    const liq = D.liquide(eau, { x0: JX - 110, x1: JX + 110, yh: JY0, yb: SOL, pas: 12, niveau: () => 1, couleur: () => LIQUIDE });
    const filets = [-0.85, -0.45, 0, 0.45, 0.85].map(s => {
      let d = "";
      for (let k = 0; k <= 8; k++) d += (k ? " L" : "M") + (JX + s * demi(k / 8)).toFixed(1) + " " + (JY0 + H * k / 8).toFixed(1);
      return D.el("path", { d: d, fill: "none", stroke: "#ffffff", "stroke-width": 3, "stroke-linecap": "round", "stroke-dasharray": "16 14", opacity: 0.6 }, eau);
    });
    // la flaque au pied du foyer : le même liquide, dont le niveau monte
    D.el("rect", { x: 524, y: 376, width: 232, height: SOL - 376 + 2, rx: 6 }, D.el("clipPath", { id: "incendie-flaque" }, r));
    let niveauFlaque = 0;
    const liqF = D.liquide(D.el("g", { "clip-path": "url(#incendie-flaque)" }, r),
      { x0: 524, x1: 756, yh: 376, yb: SOL + 2, pas: 10, niveau: () => niveauFlaque, couleur: () => LIQUIDE });
    // les éclats de l'ampoule
    const eclats = [[-16, -0.2], [2, 0], [18, 0.25]].map(([dx, rot]) =>
      ({ dx: dx, rot: rot, e: D.el("path", { d: "M0 -7 L6 6 H-6 Z", fill: ACCENT, opacity: 0 }, r) }));
    const fl = flamme(r);
    ecrire(r, JX, 424, "Foyer", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    const lChaleur = ecrire(r, 566, 258, "chaleur", 22, { "text-anchor": "end", fill: BRUN, opacity: 0 });
    const morale = D.el("g", { opacity: 0 }, r);
    ecrire(morale, 332, 312, "Seule la tête du", 22, { "font-weight": 700, fill: ACCENT });
    ecrire(morale, 332, 340, "dessus s'ouvre", 22, { "font-weight": 700, fill: ACCENT });
    return t => {
      const f = FIGE ? 10.4 : t % 12, sortie = 1 - D.lisse((f - 11.4) / 0.5);
      voir(r, D.lisse(f / 0.4) * sortie);
      fl(JX, SOL, D.lerp(1, 0.38, D.lisse((f - 5.6) / 3.6)) * D.lisse((f - 0.2) / 1), t);
      voir(panache, 0.95 * D.lisse((f - 1) / 1.6) * (1 - 0.4 * D.lisse((f - 5.8) / 3)));
      voir(lChaleur, D.lisse((f - 1.6) / 0.4));
      // l'ampoule gonfle sous la chaleur puis éclate
      const gonfle = D.lisse((f - 2.4) / 2);
      ampoule.setAttribute("rx", (8 + 2.5 * gonfle).toFixed(2)); ampoule.setAttribute("ry", (16 + 4 * gonfle).toFixed(2));
      voir(ampoule, f < 4.4 ? 1 : 0);
      voir(lFerme, f < 4.5 ? 1 : 0); voir(lOuverte, f >= 4.5 ? D.lisse((f - 4.5) / 0.3) : 0);
      eclats.forEach(o => {
        const u = D.borne((f - 4.4) / 0.9, 0, 1);
        o.e.setAttribute("transform", `translate(${(JX + o.dx * u * 1.6).toFixed(1)} ${(182 + 110 * u * u).toFixed(1)}) rotate(${(o.rot * 360 * u).toFixed(1)})`);
        voir(o.e, f >= 4.4 ? 1 - D.lisse((u - 0.7) / 0.3) : 0);
      });
      // la gerbe descend jusqu'au sol, puis coule
      const front = D.lisse((f - 4.5) / 1.1);
      if (front > 0.01) {
        let a = "", b = "";
        for (let k = 0; k <= 16; k++) {
          const q = front * k / 16, y = (JY0 + H * q).toFixed(1);
          a += (k ? " L" : "M") + (JX - demi(q)).toFixed(1) + " " + y;
          b = " L" + (JX + demi(q)).toFixed(1) + " " + y + b;
        }
        forme.setAttribute("d", a + b + " Z");
      } else forme.setAttribute("d", "M0 0");
      liq.maj(t);
      niveauFlaque = 0.45 * D.lisse((f - 5.6) / 3.2); liqF.maj(t);
      filets.forEach((p, i) => p.setAttribute("stroke-dashoffset", (-(FIGE ? 0 : f) * 70 - i * 9).toFixed(1)));
      voir(morale, D.lisse((f - 8) / 0.4));
    };
  }

  /* ---------- les six étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "incendie-classer-le-bati", titre: "Classer le bâtiment", bulle: ["De quel bâtiment", "parle-t-on ?"], bras: -72, cycle: 11.4, dessiner: classer,
      dire: "Classer le bâti — De quel bâtiment parle-t-on ? Du public, un plancher très haut, un logement, des salariés : chaque réponse ouvre un régime. Plusieurs cas ? On suit la règle la plus contraignante." },
    { station: "incendie-euroclasses", titre: "Réaction, résistance", bulle: ["Brûle-t-il ?", "Tient-il ?"], bras: -68, cycle: 12, dessiner: deuxQuestions,
      dire: "Euroclasses — Deux questions à ne pas confondre : la réaction dit si le produit alimente le feu (A1 à F), la résistance dit si l'ouvrage tient (R, E, I, minutes)." },
    { station: "incendie-desenfumage", titre: "Évacuer les fumées", bulle: ["Où vont les", "fumées ?"], bras: -100, cycle: 12, dessiner: couloir,
      dire: "Le désenfumage — Les fumées tuent avant les flammes : la couche s'épaissit sous le plafond. Le ventilateur l'extrait, l'air neuf entre en bas. Il n'éteint rien : il gagne du temps pour sortir." },
    { station: "incendie-clapets-coupe-feu", titre: "Fermer la gaine", bulle: ["Et la gaine qui", "traverse le mur ?"], bras: -75, cycle: 11, dessiner: clapet,
      dire: "Clapets coupe-feu — Une gaine qui traverse une paroi coupe-feu ouvre un chemin au feu. À 70 °C le fusible fond, la lame ferme la gaine : la paroi retrouve son degré coupe-feu." },
    { station: "incendie-ssi", titre: "Donner l'ordre", bulle: ["Qui donne", "l'ordre ?"], bras: -84, cycle: 11.4, dessiner: alarme,
      dire: "Le SSI — Il recueille, il traite, il agit : le détecteur déclenche, le centralisateur traite l'alarme, puis les dispositifs actionnés de sécurité changent d'état : clapet fermé, volet ouvert, porte fermée, CTA arrêtée." },
    { station: "incendie-sprinkler-ria", titre: "L'eau sur le foyer", bulle: ["Qui éteint quand", "on n'est pas là ?"], bras: -100, cycle: 12, dessiner: sprinkler,
      dire: "Sprinkler & RIA — À la chaleur, l'ampoule éclate et l'eau tombe sur le foyer. Seule la tête au-dessus du foyer s'ouvre. Le RIA, lui, est déroulé par une personne formée." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires parcourt l'incendie d'une affaire en six étapes : " +
    "classer le bâtiment par quatre questions et quatre régimes (Classer le bâti), distinguer la réaction au feu des produits de la résistance au feu des ouvrages (Euroclasses), " +
    "évacuer les fumées par le haut pendant que l'air neuf entre par le bas (le désenfumage), fermer la gaine qui traverse une paroi coupe-feu quand le fusible fond (clapets coupe-feu), " +
    "faire partir l'ordre du détecteur jusqu'aux dispositifs actionnés de sécurité (le SSI), laisser la seule tête de sprinkler au-dessus du foyer s'ouvrir et arroser (Sprinkler et RIA).");
  D.el("rect", { x: 0, y: 0, width: 1000, height: 440, fill: C.papier }, dessin);
  /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
     cartouche « Édu » (celui de l'en-tête des stations) à la place de « Studio » (vidéos) */
  D.filigrane(dessin, [[205, 120], [500, 236], [800, 352]], 300).querySelectorAll("text")
    .forEach(t => { if (t.textContent === "Studio") t.textContent = "Édu"; });
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

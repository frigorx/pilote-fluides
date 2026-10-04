/* =====================================================================
   scenes/risques.js — la scène de la branche « Risques professionnels »
   ---------------------------------------------------------------------
   Remplace l'image scene-risques.webp en tête de l'accueil des six
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="risques" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Le pas à pas : SceneKit (cartoclim/stations/_commun/scene-kit.js), une
   étape par station de la branche, dans l'ordre du plan. L'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche depuis l'étape 1, chaque étape le temps de son cycle (le film du
   kit avance toutes les 2,6 s, trop vite pour lire la phrase).
   Le dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — le
   ventilateur, le filigrane R9, les briques SVG.
   Le chargé d'affaires : le bonhomme « plein » de HoCourant (option B,
   décision de F. Henninot du 30/09/2026 pour l'animé), recopié tel quel ;
   le technicien en hauteur est le même bonhomme, avec casquette et dossier.
   Aucune image nouvelle. Les deux moteurs sont LUS, jamais modifiés.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités (≥ 21 px quand le dessin fait
   960 px) ; un seul accent orange par étape ; tout bouge par le temps t
   (requestAnimationFrame), sans jamais interroger la préférence système de
   réduction des animations ; seul l'interrupteur « Animations » du site
   (moteur/animations.js, choix explicite de l'utilisateur) fige le dessin
   sur l'image finale de chaque étape. Faits : ceux des six stations,
   aucun chiffre nouveau.
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="risques"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#c2410c";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
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

  const ORANGE_TXT = "#9a3412";   // le texte qui accompagne un aplat orange de la branche (contraste)
  const ap = (f, debut, duree) => D.lisse((f - debut) / duree);   // 0 → 1 à partir de « debut », sur « duree » secondes

  /* une flèche : un trait et sa pointe, de (x1, y1) vers (x2, y2) */
  function fleche(parent, x1, y1, x2, y2, coul, ep) {
    const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a), s = Math.sin(a), L = 10 + 2 * ep, W = 5 + 1.5 * ep;
    const gf = D.el("g", {}, parent), p = (k, w) => `${(x2 - c * k - s * w).toFixed(1)} ${(y2 - s * k + c * w).toFixed(1)}`;
    D.el("path", { d: `M${x1} ${y1} L${(x2 - c * (L - 2)).toFixed(1)} ${(y2 - s * (L - 2)).toFixed(1)}`, fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, gf);
    D.el("path", { d: `M${x2} ${y2} L${p(L, W)} L${p(L, -W)} Z`, fill: coul }, gf);
    return gf;
  }

  /* ---------- étape 1 · Le DUERP : un cycle, pas un tiroir ---------- */
  function cycle(g) {
    const BX = [330, 562, 794], W = 180, BY = 88, H = 100, MID = BY + H / 2;
    const TITRES = ["1 Évaluer", "2 Consigner", "3 Tenir à jour"], SOUS = ["les risques", "par écrit", "le document"];
    const boites = BX.map((x, i) => {
      const gb = D.el("g", { opacity: 0 }, g);
      const r = D.el("rect", { x: x, y: BY, width: W, height: H, rx: 12, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, gb);
      ecrire(gb, x + W / 2, BY + 41, TITRES[i], 24, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
      ecrire(gb, x + W / 2, BY + 77, SOUS[i], 22, { "text-anchor": "middle", fill: C.gris });
      return { g: gb, r: r };
    });
    const liens = D.el("g", { opacity: 0 }, g);
    fleche(liens, 518, MID, 554, MID, C.gris, 3);
    fleche(liens, 750, MID, 786, MID, C.gris, 3);
    // le retour de la 3e case vers la 1re : la boucle ne se referme jamais
    const retour = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M884 190 V244 Q884 256 872 256 H432 Q420 256 420 244 V212", fill: "none", stroke: ACCENT, "stroke-width": 5, "stroke-linecap": "round" }, retour);
    D.el("path", { d: "M420 192 L410 212 L430 212 Z", fill: ACCENT }, retour);
    ecrire(retour, 652, 230, "on recommence", 22, { "text-anchor": "middle", "font-weight": 700, fill: ORANGE_TXT });
    // la bande du bas : un outil de pilotage, pas un papier rangé au tiroir
    const bande = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 330, y: 330, width: 644, height: 80, rx: 14, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, bande);
    D.el("rect", { x: 352, y: 358, width: 46, height: 32, rx: 4, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, bande);
    D.el("rect", { x: 366, y: 370, width: 18, height: 6, rx: 3, fill: C.navy }, bande);
    D.el("path", { d: "M346 352 L404 396", stroke: C.rouge, "stroke-width": 5, "stroke-linecap": "round" }, bande);
    ecrire(bande, 424, 364, "Un outil de pilotage de la prévention", 22, { "font-weight": 700, fill: C.navy });
    ecrire(bande, 424, 394, "pas un papier rangé au tiroir", 22, { fill: C.gris });
    // la feuille qui fait le tour
    const jeton = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: -12, y: -15, width: 24, height: 30, rx: 3, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, jeton);
    D.el("path", { d: "M-6 -6 H6 M-6 0 H6 M-6 6 H1", stroke: C.gris, "stroke-width": 2, "stroke-linecap": "round" }, jeton);
    const RET = [[884, 190], [884, 256], [420, 256], [420, 204]];
    const LONG = RET.slice(1).map((p, k) => Math.hypot(p[0] - RET[k][0], p[1] - RET[k][1])), TOT = LONG.reduce((a, b) => a + b, 0);
    const surRetour = u => {
      let d = u * TOT;
      for (let k = 0; k < LONG.length; k++) {
        if (d <= LONG[k] || k === LONG.length - 1) { const q = D.borne(d / LONG[k], 0, 1); return [D.lerp(RET[k][0], RET[k + 1][0], q), D.lerp(RET[k][1], RET[k + 1][1], q)]; }
        d -= LONG[k];
      }
    };
    const TOUR = 4.6, DEBUTS = [1.6, 6.2];   // deux tours complets
    return t => {
      const f = FIGE ? 11 : t % 12, sortie = 1 - D.lisse((f - 11.4) / 0.5);
      boites.forEach((b, i) => voir(b.g, ap(f, 0.3 + i * 0.15, 0.4) * sortie));
      voir(liens, ap(f, 0.7, 0.4) * sortie); voir(retour, ap(f, 1.0, 0.5) * sortie); voir(bande, ap(f, 1.2, 0.5) * sortie);
      let allume = -1, pos = null, vis = 0;
      if (!FIGE) DEBUTS.forEach(d0 => {
        const s = f - d0;
        if (s < 0 || s > TOUR) return;
        if (s < 0.7) allume = 0;
        else if (s < 1.1) { const u = (s - 0.7) / 0.4; pos = [D.lerp(514, 558, u), MID]; vis = D.fenetre(u, 0, 1, 0.15); }
        else if (s < 1.8) allume = 1;
        else if (s < 2.2) { const u = (s - 1.8) / 0.4; pos = [D.lerp(746, 790, u), MID]; vis = D.fenetre(u, 0, 1, 0.15); }
        else if (s < 2.9) allume = 2;
        else { const u = (s - 2.9) / 1.7; pos = surRetour(u); vis = D.fenetre(u, 0, 1, 0.06); }
      });
      boites.forEach((b, i) => { b.r.setAttribute("stroke-width", i === allume ? 6 : 3); b.r.setAttribute("fill", i === allume ? "#d6e4f7" : "#eef3fb"); });
      if (pos) jeton.setAttribute("transform", `translate(${pos[0].toFixed(1)} ${pos[1].toFixed(1)})`);
      voir(jeton, pos ? vis * sortie : 0);
    };
  }

  /* ---------- étape 2 · Les 9 principes : du plus efficace au dernier recours ---------- */
  function hierarchie(g) {
    const NOMS = ["Éviter les risques", "Évaluer ce qui reste", "Combattre à la source", "Adapter le travail", "Suivre la technique",
      "Remplacer le dangereux", "Planifier", "Collectif d'abord", "Donner les instructions"];
    const LONGS = [336, 302, 268, 234, 200, 166, 132, 98, 64];
    const TEINTES = ["#1b3a63", "#24477a", "#2d5590", "#3a65a3", "#4a77b5", "#5d8ac4", "#729fd2", "#8bb3de", "#a5c8ea"];
    const Y = i => 90 + i * 32, Y10 = 396, X0 = 640, debut = i => 0.5 + i * 0.8;
    const rangees = NOMS.map((nom, i) => {
      const gl = D.el("g", { opacity: 0 }, g);
      ecrire(gl, 362, Y(i), String(i + 1), 22, { "text-anchor": "end", "font-weight": 700, fill: C.gris });
      ecrire(gl, 374, Y(i), nom, 22, {});
      return { g: gl, bar: D.el("rect", { x: X0, y: Y(i) - 16, width: 0, height: 18, rx: 4, fill: TEINTES[i] }, g) };
    });
    // la dixième ligne, sous un trait : l'équipement individuel vient après les neuf
    const sep = D.el("path", { d: "M352 362 H980", stroke: "#b9c6d3", "stroke-width": 2.5, "stroke-dasharray": "7 6", opacity: 0 }, g);
    const epi = D.el("g", { opacity: 0 }, g);
    ecrire(epi, 374, Y10, "Équipement individuel", 22, {});
    D.el("rect", { x: X0, y: Y10 - 16, width: 40, height: 18, rx: 4, fill: "#fff4ec", stroke: ACCENT, "stroke-width": 3, "stroke-dasharray": "6 4" }, epi);
    const tag = ecrire(g, X0 + 56, Y10, "dernier recours", 22, { "font-weight": 700, fill: ORANGE_TXT, opacity: 0 });
    const repere = D.el("path", { d: "M-8 -9 L8 0 L-8 9 Z", fill: C.navy, opacity: 0 }, g);
    const PTS = [];
    for (let i = 0; i < 8; i++) PTS.push([debut(i), Y(i)], [debut(i + 1) - 0.3, Y(i)]);
    PTS.push([debut(8), Y(8)], [7.9, Y(8)], [8.3, Y10]);
    return t => {
      const f = FIGE ? 10 : t % 12, sortie = 1 - D.lisse((f - 11.5) / 0.4);
      rangees.forEach((r, i) => {
        voir(r.g, ap(f, debut(i), 0.3) * sortie);
        r.bar.setAttribute("width", (LONGS[i] * ap(f, debut(i), 0.5)).toFixed(1)); voir(r.bar, sortie);
      });
      voir(sep, ap(f, 7.9, 0.4) * sortie); voir(epi, ap(f, 8.3, 0.3) * sortie); voir(tag, ap(f, 8.9, 0.3) * sortie);
      repere.setAttribute("transform", `translate(336 ${(D.courbe(PTS, f) - 7).toFixed(1)})`);
      voir(repere, ap(f, debut(0) - 0.1, 0.2) * sortie);
    };
  }

  /* ---------- étape 3 · Les EPI : le risque qui reste arrive au dernier maillon ---------- */
  function chaine(g) {
    const BX = [330, 562, 794], W = 180, BY = 84, H = 104, YP = 250;
    const COUL = [C.vert, C.bleu, ACCENT], FOND = ["#e8f5ee", "#eaf2fb", "#fff4ec"], LIT = ["#cdeedb", "#cfe2f7", "#ffdcc8"];
    const TIT = ["1 Supprimer", "2 Collectif", "3 EPI"], SOUS = ["le risque", "tout le monde", "une personne"];
    const CX = BX.map(x => x + W / 2);
    const boites = BX.map((x, i) => {
      const gb = D.el("g", { opacity: 0 }, g);
      const r = D.el("rect", { x: x, y: BY, width: W, height: H, rx: 12, fill: FOND[i], stroke: COUL[i], "stroke-width": 3.5 }, gb);
      ecrire(gb, x + W / 2, BY + 43, TIT[i], 24, { "text-anchor": "middle", "font-weight": 700, fill: i === 2 ? ORANGE_TXT : C.navy });
      ecrire(gb, x + W / 2, BY + 79, SOUS[i], 22, { "text-anchor": "middle", fill: C.gris });
      return { g: gb, r: r };
    });
    const liens = D.el("g", { opacity: 0 }, g);
    fleche(liens, 518, BY + H / 2, 554, BY + H / 2, C.gris, 3);
    fleche(liens, 750, BY + H / 2, 786, BY + H / 2, C.gris, 3);
    // la piste du risque, et un raccord de chaque maillon vers elle
    const piste = D.el("g", { opacity: 0 }, g);
    fleche(piste, 340, YP, 940, YP, "#b9c6d3", 5);
    const raccords = CX.map(x => D.el("path", { d: `M${x} 190 V${YP - 14}`, fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-dasharray": "6 5" }, piste));
    ecrire(piste, 330, 306, "le risque", 22, { "font-weight": 700, fill: C.navy });
    const bande = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 330, y: 332, width: 644, height: 84, rx: 14, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, bande);
    ecrire(bande, 652, 366, "Le dernier maillon ne s'active que si", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    ecrire(bande, 652, 396, "les deux premiers n'ont pas suffi", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    const risque = D.el("circle", { cx: 346, cy: YP, r: 22, fill: C.rouge, stroke: "#7b241c", "stroke-width": 3, opacity: 0 }, g);
    const bouclier = D.el("path", { d: "M904 222 A30 30 0 0 0 904 278", fill: "none", stroke: ACCENT, "stroke-width": 7, "stroke-linecap": "round", opacity: 0 }, g);
    return t => {
      const f = FIGE ? 9 : t % 11, sortie = 1 - D.lisse((f - 10.4) / 0.5);
      boites.forEach((b, i) => voir(b.g, ap(f, 0.3 + i * 0.15, 0.4) * sortie));
      voir(liens, ap(f, 0.7, 0.4) * sortie); voir(piste, ap(f, 1.0, 0.5) * sortie); voir(bande, ap(f, 1.2, 0.5) * sortie);
      // le risque avance ; à chaque maillon, il en reste moins
      const x = D.courbe([[1.6, 346], [1.9, 346], [2.5, 420], [3.4, 420], [4.2, 652], [5.1, 652], [5.9, 866]], f);
      const r = D.courbe([[2.5, 22], [3.0, 16], [4.2, 16], [4.7, 10]], f);
      risque.setAttribute("cx", x.toFixed(1)); risque.setAttribute("r", r.toFixed(1)); voir(risque, ap(f, 1.6, 0.2) * sortie);
      const allume = [f >= 2.5 && f < 3.4, f >= 4.2 && f < 5.1, f >= 5.9];
      boites.forEach((b, i) => { b.r.setAttribute("stroke-width", allume[i] ? 7 : 3.5); b.r.setAttribute("fill", allume[i] ? LIT[i] : FOND[i]); });
      raccords.forEach((p, i) => { p.setAttribute("stroke-dasharray", allume[i] ? "none" : "6 5"); p.setAttribute("stroke-width", allume[i] ? 5 : 3); });
      voir(bouclier, ap(f, 5.6, 0.5) * sortie);
    };
  }

  /* ---------- étape 4 · En hauteur : l'accès, puis le collectif, puis le matériel ---------- */
  function hauteur(g) {
    const decor = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M322 410 H984", stroke: C.navy, "stroke-width": 3, opacity: 0.3 }, decor);
    D.el("rect", { x: 744, y: 214, width: 236, height: 196, fill: "#e9eef4", stroke: C.navy, "stroke-width": 3 }, decor);
    [780, 880].forEach(x => D.el("rect", { x: x, y: 262, width: 44, height: 44, rx: 4, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, decor));
    D.el("rect", { x: 734, y: 202, width: 256, height: 12, fill: "#c9d3de", stroke: C.navy, "stroke-width": 3 }, decor);
    // le garde-corps (derrière le groupe) : quatre poteaux et deux lisses, tracés l'un après l'autre
    const POSTS = [752, 818, 884, 950], LISSES = [146, 172];
    const poteaux = POSTS.map(x => D.el("path", { d: `M${x} 202 V202`, fill: "none", stroke: ACCENT, "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, g));
    const lisses = LISSES.map(y => D.el("path", { d: `M752 ${y} H752`, fill: "none", stroke: ACCENT, "stroke-width": 5, "stroke-linecap": "round", opacity: 0 }, g));
    // le groupe de condensation, posé sur la dalle
    const groupe = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 832, y: 148, width: 90, height: 54, rx: 4, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, groupe);
    const tourne = D.ventilateur(groupe, 877, 175, 20); tourne(0);
    // l'accès : une échelle à crinoline
    const echelle = D.el("g", { opacity: 0 }, g);
    const montants = D.el("g", { fill: "none", stroke: C.navy, "stroke-width": 3.5, "stroke-linecap": "round" }, echelle);
    D.el("path", { d: "M700 410 V190 M736 410 V190" }, montants);
    const detail = D.el("g", { fill: "none", stroke: C.navy, "stroke-width": 2.5, "stroke-linecap": "round" }, echelle);
    for (let y = 396; y >= 214; y -= 22) D.el("path", { d: `M700 ${y} H736` }, detail);
    D.el("path", { d: "M684 232 V372 M684 250 H700 M684 300 H700 M684 350 H700" }, detail);
    // la fiche de vérification
    const panneau = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 326, y: 70, width: 290, height: 192, rx: 14, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, panneau);
    ecrire(panneau, 346, 104, "Avant de monter", 22, { "font-weight": 700, fill: C.navy });
    const LIGNES = [["Accès vérifié", C.navy], ["Garde-corps en place", ORANGE_TXT], ["Sortir le matériel", C.navy]];
    LIGNES.forEach(([txt, coul], k) => {
      const y = 150 + k * 46;
      D.el("circle", { cx: 354, cy: y - 8, r: 15, fill: C.papier, stroke: C.gris, "stroke-width": 3 }, panneau);
      ecrire(panneau, 382, y, txt, 22, { fill: coul });
    });
    const cases = LIGNES.map((_, k) => coche(g, 354, 150 + k * 46 - 8));
    const etiqAcces = ecrire(g, 676, 300, "accès", 22, { "text-anchor": "end", fill: C.navy, opacity: 0 });
    const etiqGarde = ecrire(g, 851, 126, "garde-corps", 22, { "text-anchor": "middle", fill: ORANGE_TXT, opacity: 0 });
    // la loupe qui inspecte l'échelle, et le matériel qui attend au sol
    const loupe = D.el("g", { opacity: 0 }, g);
    D.el("circle", { r: 16, fill: "#ffffff", "fill-opacity": 0.55, stroke: C.navy, "stroke-width": 4 }, loupe);
    D.el("path", { d: "M12 12 L28 28", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, loupe);
    const caisse = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M-10 -14 V-22 H10 V-14", fill: "none", stroke: C.ambre, "stroke-width": 3 }, caisse);
    D.el("rect", { x: -22, y: -14, width: 44, height: 28, rx: 4, fill: "#f3e2b8", stroke: C.ambre, "stroke-width": 3 }, caisse);
    D.el("path", { d: "M-22 -2 H22", stroke: C.ambre, "stroke-width": 2.5 }, caisse);
    const tech = bonhomme(g, { casquette: true, dossier: true, dephasage: 0.4 });
    return t => {
      const f = FIGE ? 10 : t % 12, sortie = 1 - D.lisse((f - 11.4) / 0.5);
      const a = ap(f, 0.2, 0.6) * sortie;
      voir(decor, a); voir(echelle, a); voir(groupe, a); voir(panneau, ap(f, 0.3, 0.6) * sortie); voir(caisse, ap(f, 0.5, 0.5) * sortie);
      tourne(FIGE ? 0 : t * 120);
      // 1 · l'accès : la loupe monte le long de l'échelle, puis l'échelle est validée
      loupe.setAttribute("transform", `translate(718 ${D.courbe([[1.5, 380], [3.0, 246]], f).toFixed(1)})`);
      voir(loupe, D.fenetre(f, 1.5, 3.4, 0.3) * sortie);
      voir(etiqAcces, ap(f, 1.5, 0.3) * sortie);
      montants.setAttribute("stroke", f >= 3.2 ? C.vert : C.navy); montants.setAttribute("stroke-width", f >= 3.2 ? 6 : 3.5);
      voir(cases[0], ap(f, 3.3, 0.3) * sortie);
      // 2 · le garde-corps se trace : poteaux, puis lisses
      POSTS.forEach((x, k) => {
        const p = ap(f, 3.8 + k * 0.35, 0.5);
        poteaux[k].setAttribute("d", `M${x} 202 V${(202 - 56 * p).toFixed(1)}`); voir(poteaux[k], (p > 0 ? 1 : 0) * sortie);
      });
      const pr = ap(f, 4.9, 1.0);
      lisses.forEach((l, k) => { l.setAttribute("d", `M752 ${LISSES[k]} H${(752 + 198 * pr).toFixed(1)}`); voir(l, (pr > 0 ? 1 : 0) * sortie); });
      voir(etiqGarde, ap(f, 5.4, 0.3) * sortie); voir(cases[1], ap(f, 6.1, 0.3) * sortie);
      // 3 · seulement alors, le matériel monte
      caisse.setAttribute("transform", `translate(${D.courbe([[6.6, 590], [7.5, 718]], f).toFixed(1)} ${D.courbe([[6.6, 396], [7.5, 396], [9.1, 196]], f).toFixed(1)})`);
      voir(cases[2], ap(f, 9.1, 0.3) * sortie);
      tech({ x: 500, y: 304.2, k: 1.45, t: t, bras: D.courbe([[0, -15], [1.2, -15], [1.8, -72], [3.5, -72], [4.1, -130], [6.3, -130], [6.9, -15]], f) });
    };
  }

  /* ---------- étape 5 · Risque chimique : on lit la fiche avant d'ouvrir le bidon ---------- */
  function fds(g) {
    const bidon = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 340, y: 264, width: 100, height: 138, rx: 10, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3.5 }, bidon);
    D.el("path", { d: "M440 284 Q474 284 474 314 Q474 344 440 344", fill: "none", stroke: C.navy, "stroke-width": 4, "stroke-linecap": "round" }, bidon);
    D.el("rect", { x: 352, y: 292, width: 76, height: 80, rx: 6, fill: C.papier, stroke: C.navy, "stroke-width": 2 }, bidon);
    D.el("rect", { x: 370, y: 248, width: 40, height: 16, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 3 }, bidon);
    const bouchon = D.el("g", { transform: "translate(416 248)" }, bidon);
    D.el("rect", { x: -52, y: -16, width: 52, height: 16, rx: 3, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 3 }, bouchon);
    const inconnu = ecrire(g, 390, 346, "?", 44, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    const lu = coche(g, 390, 332);
    const carte = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 566, y: 82, width: 410, height: 300, rx: 14, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, carte);
    ecrire(carte, 771, 122, "Fiche de données de sécurité", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    const ZONES = ["Dangers", "Précautions d'emploi", "Conduite à tenir"];
    const zones = ZONES.map((nom, k) => {
      const y = 142 + k * 80;
      const r = D.el("rect", { x: 590, y: y, width: 362, height: 64, rx: 10, fill: "#f4f7fb", stroke: C.navy, "stroke-width": 2 }, carte);
      ecrire(carte, 612, y + 40, nom, 22, {});
      return r;
    });
    const coches = ZONES.map((_, k) => coche(g, 924, 142 + k * 80 + 32));
    const lien = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M488 326 C526 326 522 232 552 232", fill: "none", stroke: C.gris, "stroke-width": 4, "stroke-linecap": "round" }, lien);
    D.el("path", { d: "M564 232 L550 224 L550 240 Z", fill: C.gris }, lien);
    return t => {
      const f = FIGE ? 9.8 : t % 11.4, sortie = 1 - D.lisse((f - 10.8) / 0.5);
      voir(bidon, ap(f, 0.2, 0.6) * sortie); voir(carte, ap(f, 0.4, 0.6) * sortie); voir(lien, ap(f, 1.0, 0.6) * sortie);
      voir(inconnu, ap(f, 0.5, 0.4) * (1 - ap(f, 7.0, 0.2)) * sortie);
      // la fiche se lit zone par zone : la zone lue est surlignée, puis cochée
      zones.forEach((r, k) => {
        const lue = f >= 2.2 + 1.6 * k && f < 3.8 + 1.6 * k;
        r.setAttribute("fill", lue ? "#ffe9dc" : "#f4f7fb"); r.setAttribute("stroke", lue ? ACCENT : C.navy); r.setAttribute("stroke-width", lue ? 4 : 2);
        voir(coches[k], ap(f, 3.6 + 1.6 * k, 0.3) * sortie);
      });
      voir(lu, ap(f, 7.3, 0.3) * sortie);
      // alors seulement, le bouchon se soulève
      const o = ap(f, 7.9, 0.8);
      bouchon.setAttribute("transform", `translate(416 ${(248 - 22 * o).toFixed(1)}) rotate(${(26 * o).toFixed(1)})`);
    };
  }

  /* ---------- étape 6 · Zones ATEX : gaz + air + source d'inflammation ---------- */
  function atex(g) {
    const XS = [330, 566, 762], WS = [190, 150, 190], TY = 74, TH = 134, YI = 108;
    const TXT = [["Gaz", "inflammable"], ["Air", "ambiant"], ["Source", "d'inflammation"]];
    const tuiles = XS.map((x, i) => {
      const gt = D.el("g", { opacity: 0 }, g), cx = x + WS[i] / 2;
      const r = D.el("rect", { x: x, y: TY, width: WS[i], height: TH, rx: 14, fill: i === 2 ? "#fff4ec" : "#eef3fb", stroke: i === 2 ? ACCENT : C.navy, "stroke-width": 3.5 }, gt);
      ecrire(gt, cx, 162, TXT[i][0], 24, { "text-anchor": "middle", "font-weight": 700, fill: i === 2 ? ORANGE_TXT : C.navy });
      ecrire(gt, cx, 192, TXT[i][1], 22, { "text-anchor": "middle", fill: C.gris });
      return { g: gt, r: r, cx: cx };
    });
    // le gaz : un nuage ; l'air : trois filets qui soufflent ; la source : une étincelle
    const nuage = D.el("g", {}, tuiles[0].g);
    const CERCLES = [[-20, 4, 15], [3, -8, 19], [25, 4, 14], [2, 10, 13]];
    CERCLES.forEach(([dx, dy, r]) => D.el("circle", { cx: tuiles[0].cx + dx, cy: YI + dy, r: r + 2.5, fill: C.navy }, nuage));
    CERCLES.forEach(([dx, dy, r]) => D.el("circle", { cx: tuiles[0].cx + dx, cy: YI + dy, r: r, fill: "#a9c7e8" }, nuage));
    const filets = [-14, 0, 14].map(dy => D.el("path", { d: `M${tuiles[1].cx - 33} ${YI + dy} q8 -9 16 0 t16 0 t16 0 t16 0`, fill: "none", stroke: C.bleu, "stroke-width": 4, "stroke-linecap": "round", "stroke-dasharray": "22 10" }, tuiles[1].g));
    const etincelle = D.el("g", {}, tuiles[2].g);
    for (let k = 0; k < 8; k++) {
      const an = k * Math.PI / 4, r2 = k % 2 ? 19 : 24;
      D.el("path", { d: `M${(11 * Math.cos(an)).toFixed(1)} ${(11 * Math.sin(an)).toFixed(1)} L${(r2 * Math.cos(an)).toFixed(1)} ${(r2 * Math.sin(an)).toFixed(1)}`, stroke: ACCENT, "stroke-width": 5, "stroke-linecap": "round" }, etincelle);
    }
    D.el("circle", { r: 8, fill: ACCENT }, etincelle);
    const croix = D.el("path", { d: `M${tuiles[2].cx - 24} ${YI - 24} L${tuiles[2].cx + 24} ${YI + 24} M${tuiles[2].cx + 24} ${YI - 24} L${tuiles[2].cx - 24} ${YI + 24}`, stroke: C.rouge, "stroke-width": 6, "stroke-linecap": "round", opacity: 0 }, g);
    const plus = [543, 739].map(x => ecrire(g, x, 148, "+", 34, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 }));
    // les trois se rejoignent : atmosphère explosive
    const somme = D.el("g", { opacity: 0 }, g);
    D.el("path", { d: "M425 210 V226 H857 V210 M641 210 V226", fill: "none", stroke: C.gris, "stroke-width": 3, "stroke-linejoin": "round" }, somme);
    fleche(somme, 641, 226, 641, 246, C.gris, 3);
    const resultat = D.el("g", { opacity: 0 }, g);
    const cadreR = D.el("rect", { x: 480, y: 248, width: 320, height: 56, rx: 12, fill: "#fdecea", stroke: C.rouge, "stroke-width": 3.5 }, resultat);
    const txtA = ecrire(resultat, 640, 284, "Atmosphère explosive", 24, { "text-anchor": "middle", "font-weight": 700, fill: "#922b21" });
    const txtB = ecrire(resultat, 640, 284, "Rien ne se produit", 24, { "text-anchor": "middle", "font-weight": 700, fill: "#166534", opacity: 0 });
    const bande = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 330, y: 326, width: 644, height: 84, rx: 14, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, bande);
    ecrire(bande, 652, 360, "Le mélange seul ne suffit pas :", 22, { "text-anchor": "middle", fill: C.navy });
    ecrire(bande, 652, 390, "il faut aussi une source d'inflammation", 22, { "text-anchor": "middle", fill: C.navy });
    return t => {
      const f = FIGE ? 6 : t % 12, sortie = 1 - D.lisse((f - 11.4) / 0.5);
      voir(tuiles[0].g, ap(f, 0.3, 0.6) * sortie); voir(plus[0], ap(f, 1.0, 0.3) * sortie);
      voir(tuiles[1].g, ap(f, 1.3, 0.6) * sortie); voir(plus[1], ap(f, 1.9, 0.3) * sortie);
      voir(tuiles[2].g, ap(f, 2.2, 0.6) * sortie);
      voir(somme, ap(f, 3.4, 0.5) * sortie); voir(resultat, ap(f, 3.9, 0.5) * sortie); voir(bande, ap(f, 4.8, 0.5) * sortie);
      nuage.setAttribute("transform", `translate(${(3 * Math.sin(t * 1.6)).toFixed(1)} ${(2 * Math.cos(t * 1.3)).toFixed(1)})`);
      filets.forEach(p => p.setAttribute("stroke-dashoffset", (-t * 30).toFixed(1)));
      etincelle.setAttribute("transform", `translate(${tuiles[2].cx} ${YI}) scale(${(1 + 0.12 * Math.sin(t * 6)).toFixed(3)})`);
      // la source écartée : un seul des trois retiré, et rien ne se produit
      const retire = FIGE ? 0 : ap(f, 7.2, 0.5);
      voir(croix, retire * sortie);
      tuiles[2].r.setAttribute("stroke", retire > 0.5 ? C.gris : ACCENT); tuiles[2].r.setAttribute("stroke-dasharray", retire > 0.5 ? "10 7" : "none");
      voir(txtA, 1 - ap(f, 7.8, 0.2)); voir(txtB, ap(f, 8.1, 0.2));
      cadreR.setAttribute("stroke", f > 8.0 ? C.vert : C.rouge); cadreR.setAttribute("fill", f > 8.0 ? "#e8f5ee" : "#fdecea");
    };
  }

  /* ---------- les six étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "risques-duerp", titre: "Un cycle qui pilote", bulle: ["Où sont notés", "les risques ?"], bras: -72, cycle: 12, dessiner: cycle,
      dire: "Le DUERP — L'employeur évalue les risques de chaque situation de travail, les consigne par écrit, puis tient le document à jour. La boucle ne se referme jamais : c'est un outil de pilotage." },
    { station: "risques-neuf-principes", titre: "L'ordre qui compte", bulle: ["Par quoi", "commencer ?"], bras: -72, cycle: 12, dessiner: hierarchie,
      dire: "Les 9 principes — Les neuf principes de prévention sont classés, du plus efficace au moins efficace : on commence par éviter le risque. L'équipement individuel vient après les neuf, en dernier recours." },
    { station: "risques-epi", titre: "Le dernier maillon", bulle: ["Faut-il déjà", "s'équiper ?"], bras: -70, cycle: 11, dessiner: chaine,
      dire: "Les EPI — La prévention suit un ordre : supprimer le risque, protéger collectivement, puis équiper individuellement en dernier. Le troisième maillon ne s'active que si les deux premiers n'ont pas suffi." },
    { station: "risques-hauteur", titre: "Avant de monter", bulle: ["Je monte", "tout de suite ?"], bras: -100, cycle: 12, dessiner: hauteur,
      dire: "En hauteur — Avant de sortir le matériel, on vérifie l'accès, puis la protection collective : le garde-corps. L'équipement individuel, harnais et longe, ne vient qu'en dernier recours." },
    { station: "risques-chimique", titre: "Lire avant d'ouvrir", bulle: ["Je peux ouvrir", "ce bidon ?"], bras: -72, cycle: 11.4, dessiner: fds,
      dire: "Risque chimique — La fiche de données de sécurité (FDS) décrit les dangers, les précautions d'emploi et la conduite à tenir. On la lit avant d'ouvrir le bidon, jamais après." },
    { station: "risques-atex", titre: "Gaz + air + source", bulle: ["Ce fluide peut-il", "s'enflammer ?"], bras: -72, cycle: 12, dessiner: atex,
      dire: "Zones ATEX — Une atmosphère explosive naît d'un gaz inflammable mélangé à l'air, au contact d'une source d'inflammation. Le mélange seul ne suffit pas : ventiler et écarter les flammes évitent le risque." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires prépare une intervention en six étapes de prévention des risques : " +
    "consigner et tenir à jour l'évaluation (DUERP), appliquer les neuf principes dans l'ordre, ne mettre l'équipement individuel qu'en dernier maillon, " +
    "vérifier l'accès et le garde-corps avant de monter, lire la fiche de données de sécurité avant d'ouvrir un bidon, repérer le mélange gaz, air et source d'inflammation (zones ATEX).");
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

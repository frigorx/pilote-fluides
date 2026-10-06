/* =====================================================================
   scenes/fluidique.js — la scène de la branche « Fluidique & thermique »
   ---------------------------------------------------------------------
   Remplace l'image scene-fluidique.webp en tête de l'accueil des quatre
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="fluidique" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Le pas à pas : SceneKit (cartoclim/stations/_commun/scene-kit.js), une
   étape par station de la branche, dans l'ordre du plan. L'étape de la
   station est marquée ★ et ouverte d'emblée ; « ▶ Dérouler » joue toute la
   branche depuis l'étape 1, chaque étape le temps de son cycle (le film du
   kit avance toutes les 2,6 s, trop vite pour lire la phrase).
   Le dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — le liquide
   en nappe dont la surface ondule, le ventilateur, le filigrane R9.
   Le chargé d'affaires : le bonhomme « plein » de HoCourant (option B,
   décision de F. Henninot du 30/09/2026 pour l'animé), recopié tel quel ;
   ajouts : un dossier dans la main arrière, ou une casquette et la carte
   d'aptitude pour le technicien. Aucune image nouvelle.
   Les deux moteurs sont LUS, jamais modifiés.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités (≥ 21 px quand le dessin fait
   960 px) ; tout bouge par le temps t (requestAnimationFrame), sans jamais
   tester prefers-reduced-motion ; seul l'interrupteur « Animations » du site
   (moteur/animations.js, choix explicite de l'utilisateur) fige le dessin
   sur l'image finale de chaque étape. Faits : ceux des quatre stations,
   aucun chiffre nouveau.
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="fluidique"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#0f766e";     // la couleur de la branche (tableau RESEAU du plan, --sous-ligne des stations)
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

  /* une petite bouteille de fluide (pictogramme des barres du phase-down), posée sur yBas */
  function bouteillePicto(parent, x, yBas, coul) {
    D.el("rect", { x: x - 8, y: yBas - 28, width: 16, height: 28, rx: 5, fill: coul }, parent);
    D.el("rect", { x: x - 4.5, y: yBas - 35, width: 9, height: 8, rx: 2, fill: coul }, parent);
    D.el("rect", { x: x - 6, y: yBas - 39, width: 12, height: 4, rx: 1.5, fill: coul }, parent);
  }

  /* ---------- étape 1 · F-Gaz 3 : l'enveloppe de HFC rétrécit ---------- */
  function quota(g) {
    ecrire(g, 352, 64, "HFC mis sur le marché (t éq. CO₂)", 22, { "font-weight": 700, fill: C.navy });
    D.el("path", { d: "M350 84 V362 H912", fill: "none", stroke: C.navy, "stroke-width": 3 }, g);
    const H = [226, 176, 132, 92, 52, 5];
    const TEINTES = [ACCENT, "#2b8a80", "#4fa096", "#77b8ae", "#a3cfc7", "#c9e3de"];
    const barres = H.map((h, i) => D.el("rect", { x: 370 + i * 88, y: 361, width: 68, height: 0, fill: TEINTES[i] }, g));
    const bouteilles = [[0, 3], [2, 2], [4, 1]].map(([i, nb]) => {   // trois, puis deux, puis une seule
      const gb = D.el("g", { opacity: 0 }, g), x0 = 404 + i * 88 - (nb - 1) * 11;
      for (let k = 0; k < nb; k++) bouteillePicto(gb, x0 + k * 22, 361 - H[i] - 2, ACCENT);
      return { g: gb, i: i };
    });
    ecrire(g, 404, 392, "2024", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT });
    ecrire(g, 624, 392, "paliers fixés par le règlement", 22, { "text-anchor": "middle", fill: C.gris });
    ecrire(g, 844, 392, "2050", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    const etiquette = D.el("g", { opacity: 0 }, g);
    D.el("rect", { x: 640, y: 106, width: 300, height: 50, rx: 12, fill: "#fbe7e4", stroke: C.orange, "stroke-width": 2.5 }, etiquette);
    ecrire(etiquette, 790, 139, "Fort PRP : rare et cher", 22, { "text-anchor": "middle", "font-weight": 700, fill: "#9a3412" });
    return t => {
      const f = FIGE ? 7 : t % 9, sortie = 1 - D.lisse((f - 8.4) / 0.5);
      barres.forEach((b, i) => {   // une année après l'autre, la barre est plus basse
        const h = H[i] * D.lisse((f - 0.3 - i * 0.8) / 0.6);
        b.setAttribute("y", (361 - h).toFixed(1)); b.setAttribute("height", h.toFixed(1)); voir(b, sortie);
      });
      bouteilles.forEach(o => voir(o.g, D.lisse((f - 0.9 - o.i * 0.8) / 0.4) * sortie));
      voir(etiquette, D.lisse((f - 5.2) / 0.5) * sortie);
    };
  }

  /* ---------- étape 2 · Aptitude & capacité : les deux papiers, puis la bouteille s'ouvre ---------- */
  function papiers(g) {
    const carte = (x, coul, fond, titre, sous) => {
      const c = D.el("g", { opacity: 0 }, g);
      D.el("rect", { x: x, y: 70, width: 260, height: 82, rx: 12, fill: fond, stroke: coul, "stroke-width": 3 }, c);
      ecrire(c, x + 130, 104, titre, 24, { "text-anchor": "middle", "font-weight": 700, fill: coul });
      ecrire(c, x + 130, 136, sous, 22, { "text-anchor": "middle" });
      return c;
    };
    const cA = carte(330, ACCENT, "#e6f2ef", "Aptitude", "la personne");
    const cB = carte(670, INDIGO, "#e8edf9", "Capacité", "l'entreprise");
    const plus = ecrire(g, 630, 124, "+", 34, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    const okA = coche(g, 586, 72), okB = coche(g, 926, 72);
    const deux = ecrire(g, 630, 186, "Il faut les deux", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy, opacity: 0 });
    const tech = bonhomme(g, { casquette: true, carte: true, dephasage: 0.4 });
    // la bouteille en coupe : le liquide en nappe, la vapeur au-dessus
    D.el("rect", { x: 562, y: 264, width: 86, height: 138, rx: 22 }, D.el("clipPath", { id: "fl-bouteille" }, g));
    D.el("rect", { x: 560, y: 262, width: 90, height: 142, rx: 24, fill: "#eef5fc" }, g);
    let niveau = 0.72;
    const liq = D.liquide(D.el("g", { "clip-path": "url(#fl-bouteille)" }, g),
      { x0: 560, x1: 650, yh: 264, yb: 402, pas: 6, niveau: () => niveau, couleur: () => LIQUIDE });
    D.el("rect", { x: 560, y: 262, width: 90, height: 142, rx: 24, fill: "none", stroke: C.navy, "stroke-width": 3 }, g);
    D.el("rect", { x: 590, y: 240, width: 30, height: 24, rx: 4, fill: "#dbe6f2", stroke: C.navy, "stroke-width": 2.5 }, g);
    D.el("rect", { x: 582, y: 228, width: 46, height: 14, rx: 4, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2.5 }, g);
    const volant = D.el("g", {}, g);
    D.el("circle", { r: 12, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, volant);
    D.el("path", { d: "M-10 0 H10 M0 -10 V10", stroke: C.navy, "stroke-width": 2.5 }, volant);
    // le flexible, de la bouteille à la machine : il se remplit de liquide qui avance
    D.el("path", { d: "M628 235 H652", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, g);
    const trajet = "M652 235 C700 235 722 362 780 362";
    D.el("path", { d: trajet, fill: "none", stroke: C.navy, "stroke-width": 14, "stroke-linecap": "round" }, g);
    const ame = D.el("path", { d: trajet, fill: "none", stroke: "#e9eef4", "stroke-width": 8, "stroke-linecap": "round" }, g);
    const flux = D.el("path", { d: trajet, fill: "none", stroke: C.papier, "stroke-width": 3, "stroke-dasharray": "10 16", "stroke-linecap": "round", opacity: 0 }, g);
    // la machine (groupe extérieur) et son raccord
    D.el("rect", { x: 780, y: 262, width: 186, height: 140, rx: 8, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, g);
    D.ventilateur(g, 870, 332, 52)(0);
    D.el("rect", { x: 772, y: 354, width: 14, height: 16, rx: 2, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2 }, g);
    return t => {
      const f = FIGE ? 9.4 : t % 10.5, sortie = 1 - D.lisse((f - 9.9) / 0.5);
      voir(cA, D.lisse(f / 0.5) * sortie); voir(okA, D.lisse((f - 1.2) / 0.3) * sortie);
      voir(plus, D.lisse((f - 1.5) / 0.3) * sortie);
      voir(cB, D.lisse((f - 1.7) / 0.5) * sortie); voir(okB, D.lisse((f - 2.7) / 0.3) * sortie);
      voir(deux, D.lisse((f - 3.1) / 0.4) * sortie);
      volant.setAttribute("transform", `translate(605 214) rotate(${(D.lisse((f - 3.6) / 0.8) * 270).toFixed(1)})`);
      const coule = D.borne((f - 4.4) / 4.6, 0, 1);
      niveau = D.lerp(0.72, 0.32, coule);
      ame.setAttribute("stroke", f > 4.4 ? LIQUIDE : "#e9eef4");
      voir(flux, f > 4.4 && f < 9 ? 0.9 : 0);
      flux.setAttribute("stroke-dashoffset", (-f * 70).toFixed(1));
      liq.maj(t);
      tech({ x: 420, y: 242.1, k: 2.3, t: t, bras: D.courbe([[0, -15], [0.4, -15], [0.9, -140], [3.3, -140], [3.9, -15]], f) });
    };
  }

  /* ---------- étape 3 · NF EN 378 : la même charge dans un local plus petit ---------- */
  function local(g) {
    const piece = D.el("rect", { x: 342, y: 124, height: 260, fill: "#f4efe6" }, g);
    const zone = D.el("rect", { x: 342, y: 124, height: 260 }, D.el("clipPath", { id: "fl-piece" }, g));
    const brume = D.el("circle", { cx: 410, cy: 338, r: 0, fill: C.bleu, "fill-opacity": 0, "clip-path": "url(#fl-piece)" }, g);
    D.el("rect", { x: 354, y: 300, width: 112, height: 76, rx: 6, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, g);
    D.el("path", { d: "M366 362 H454 M366 368 H454", stroke: C.navy, "stroke-width": 2 }, g);
    ecrire(g, 410, 344, "machine", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    const mur = { fill: "#c9d3de", stroke: C.navy, "stroke-width": 2.5 };
    const plafond = D.el("rect", Object.assign({ x: 330, y: 112, height: 12 }, mur), g);
    const plancher = D.el("rect", Object.assign({ x: 330, y: 384, height: 12 }, mur), g);
    D.el("rect", Object.assign({ x: 330, y: 112, width: 12, height: 284 }, mur), g);
    const murD = D.el("rect", Object.assign({ y: 112, width: 12, height: 284 }, mur), g);
    // la jauge de concentration et sa limite
    ecrire(g, 808, 108, "concentration", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    D.el("rect", { x: 790, y: 130, width: 36, height: 256, rx: 18, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, g);
    const colonne = D.el("rect", { x: 796, width: 24, rx: 10, fill: ACCENT }, g);
    const Y0 = 380, HJ = 244, LIM = 0.62, yLim = Y0 - LIM * HJ;
    D.el("path", { d: `M774 ${yLim} H842`, stroke: C.rouge, "stroke-width": 3, "stroke-dasharray": "8 6" }, g);
    ecrire(g, 850, yLim + 8, "limite", 22, { "font-weight": 700, fill: C.rouge });
    const legende = ecrire(g, 330, 428, "", 22, { "font-weight": 700 });
    return t => {
      const f = FIGE ? 10.4 : t % 12;
      const murX = D.courbe([[0, 700], [5.6, 700], [7, 500], [11.4, 500], [12, 700]], f);
      const petit = f >= 6.2 && f < 11.6;
      const fuite = petit ? D.lisse((f - 7.2) / 2) * (1 - D.lisse((f - 11.4) / 0.2))
                          : D.lisse((f - 0.6) / 2) * (1 - D.lisse((f - 5) / 0.6));
      const c = fuite * 0.32 * (700 - 342) / (murX - 342);   // concentration = masse ÷ volume du local
      piece.setAttribute("width", murX - 342); zone.setAttribute("width", murX - 342);
      murD.setAttribute("x", murX);
      plafond.setAttribute("width", murX + 12 - 330); plancher.setAttribute("width", murX + 12 - 330);
      brume.setAttribute("r", (fuite > 0 ? 40 + 560 * D.lisse(fuite * 1.4) : 0).toFixed(1));
      brume.setAttribute("fill-opacity", (c * 0.5).toFixed(3));
      const h = c * HJ;
      colonne.setAttribute("y", (Y0 - h).toFixed(1)); colonne.setAttribute("height", h.toFixed(1));
      colonne.setAttribute("fill", c > LIM ? C.rouge : ACCENT);
      legende.textContent = petit ? "Petit local : au-dessus de la limite" : "Grand local : sous la limite";
      legende.setAttribute("fill", petit ? C.rouge : ACCENT);
      voir(legende, petit ? D.lisse((f - 9) / 0.4) * (1 - D.lisse((f - 11.4) / 0.2))
                          : D.lisse((f - 2.6) / 0.4) * (1 - D.lisse((f - 5) / 0.4)));
    };
  }

  /* ---------- étape 4 · Traçabilité : le fil du fluide, de la machine à la filière ---------- */
  function trace(g) {
    const X = [360, 505, 650, 795, 930], Y = 286, R = 32;
    D.el("rect", { x: 300, y: 112, width: 266, height: 52, rx: 12, fill: "#eef3fb", stroke: C.navy, "stroke-width": 3 }, g);
    ecrire(g, 433, 146, "Fiche d'intervention", 22, { "text-anchor": "middle", "font-weight": 700, fill: C.navy });
    D.el("rect", { x: 606, y: 112, width: 370, height: 52, rx: 12, fill: "#fff4ec", stroke: C.orange, "stroke-width": 3, "stroke-dasharray": "10 7" }, g);
    ecrire(g, 791, 146, "BSFF · Trackdéchets", 22, { "text-anchor": "middle", "font-weight": 700, fill: "#9a3412" });
    X.forEach((x, i) => D.el("path", i < 2
      ? { d: `M${x} 164 V${Y - R - 6}`, stroke: C.navy, "stroke-width": 2.5 }
      : { d: `M${x} 164 V${Y - R - 6}`, stroke: C.orange, "stroke-width": 2.5, "stroke-dasharray": "6 5" }, g));
    for (let i = 0; i < 4; i++) {
      D.el("path", { d: `M${X[i] + R + 6} ${Y} H${X[i + 1] - R - 14}`, stroke: C.gris, "stroke-width": 3 }, g);
      D.el("path", { d: `M${X[i + 1] - R - 16} ${Y - 7} L${X[i + 1] - R - 4} ${Y} L${X[i + 1] - R - 16} ${Y + 7} Z`, fill: C.gris }, g);
    }
    const cercles = X.map(x => D.el("circle", { cx: x, cy: Y, r: R, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, g));
    const icone = { fill: "#e8f1fb", stroke: C.navy, "stroke-width": 2 };
    D.el("rect", Object.assign({ x: 342, y: 275, width: 36, height: 22, rx: 3 }, icone), g);                  // la machine
    D.el("circle", Object.assign({ cx: 353, cy: 286, r: 6 }, icone), g);
    D.el("rect", Object.assign({ x: 489, y: 272, width: 32, height: 28, rx: 3 }, icone), g);                  // la récupération
    D.el("path", { d: "M505 277 V293 M499 287 L505 293 L511 287", fill: "none", stroke: C.navy, "stroke-width": 2.5, "stroke-linecap": "round" }, g);
    const bt = D.el("g", { transform: "translate(650 286) scale(.5)" }, g);                                  // la bouteille de récupération
    D.el("rect", { x: -22, y: -34, width: 44, height: 70, rx: 14 }, D.el("clipPath", { id: "fl-recup" }, bt));
    D.el("rect", { x: -24, y: -36, width: 48, height: 74, rx: 16, fill: "#eef5fc" }, bt);
    let remplie = 0;
    const liq = D.liquide(D.el("g", { "clip-path": "url(#fl-recup)" }, bt),
      { x0: -24, x1: 24, yh: -34, yb: 36, pas: 6, niveau: () => remplie, couleur: () => LIQUIDE });
    D.el("rect", { x: -24, y: -36, width: 48, height: 74, rx: 16, fill: "none", stroke: C.navy, "stroke-width": 4 }, bt);
    D.el("rect", { x: -9, y: -48, width: 18, height: 12, rx: 3, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 3.5 }, bt);
    D.el("rect", Object.assign({ x: 777, y: 277, width: 24, height: 16, rx: 2 }, icone), g);                 // le distributeur (camion)
    D.el("path", Object.assign({ d: "M801 281 H808 L814 287 V293 H801 Z" }, icone), g);
    D.el("circle", { cx: 784, cy: 296, r: 3.5, fill: C.navy }, g);
    D.el("circle", { cx: 808, cy: 296, r: 3.5, fill: C.navy }, g);
    D.el("path", Object.assign({ d: "M913 300 V284 L922 290 V284 L931 290 V273 H939 V300 Z" }, icone), g);   // le traitement
    ["Machine", "Récupération", "Bouteille", "Distributeur", "Traitement"].forEach((n, i) =>
      ecrire(g, X[i], 352, n, 22, { "text-anchor": "middle", fill: C.navy }));
    const okF = coche(g, 566, 112), okB = coche(g, 976, 112);
    const goutte = D.el("path", { d: "M0 -13 Q9 0 0 8 Q-9 0 0 -13 Z", fill: LIQUIDE, stroke: C.navy, "stroke-width": 2 }, g);
    const morale = ecrire(g, 640, 416, "Chaque étape laisse une trace écrite et signée.", 22, { "text-anchor": "middle", "font-weight": 700, fill: ACCENT, opacity: 0 });
    return t => {
      const f = FIGE ? 9 : t % 10.5, sortie = 1 - D.lisse((f - 9.9) / 0.5);
      let p = 0;   // où en est la goutte : 0 = machine … 4 = traitement
      for (let i = 0; i < 4; i++) if (f >= 0.8 + i * 1.8) p = i + D.lisse((f - 0.8 - i * 1.8) / 1.2);
      const i0 = Math.floor(p), x = i0 >= 4 ? X[4] : D.lerp(X[i0], X[i0 + 1], p - i0);
      goutte.setAttribute("transform", `translate(${x.toFixed(1)} ${Y})`);
      voir(goutte, sortie);
      cercles.forEach((c, i) => {
        const atteint = p >= i - 0.02 && sortie > 0.5;
        c.setAttribute("stroke", atteint ? ACCENT : C.navy); c.setAttribute("stroke-width", atteint ? 5 : 3);
      });
      remplie = 0.62 * D.lisse((f - 4.4) / 1) * sortie;
      liq.maj(t);
      voir(okF, D.lisse((f - 2.5) / 0.3) * sortie);
      voir(okB, D.lisse((f - 7.6) / 0.3) * sortie);
      voir(morale, D.lisse((f - 7.9) / 0.4) * sortie);
    };
  }

  /* ---------- les quatre étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "fgaz-3", titre: "Choisir le fluide", bulle: ["Quel fluide", "sera encore là ?"], bras: -72, cycle: 9, dessiner: quota,
      dire: "F-Gaz 3 — Le règlement (UE) 2024/573 réduit chaque année l'enveloppe de HFC mise sur le marché, jusqu'à zéro HFC neuf en 2050 : les fluides à fort PRP deviennent rares et chers." },
    { station: "aptitude-capacite", titre: "Les deux papiers", bulle: ["Qui a le droit", "de le charger ?"], bras: -100, cycle: 10.5, dessiner: papiers,
      dire: "Aptitude & capacité — L'attestation d'aptitude est à la personne, l'attestation de capacité à l'entreprise. Il faut les deux, l'une ne remplace jamais l'autre : alors seulement la bouteille s'ouvre." },
    { station: "en-378", titre: "Vérifier le local", bulle: ["Combien de fluide", "dans ce local ?"], bras: -68, cycle: 12, dessiner: local,
      dire: "NF EN 378 — Imaginons une fuite totale : le fluide se répartit dans le volume du local. Même charge, local plus petit : la concentration dépasse la limite. Voilà pourquoi la charge est limitée." },
    { station: "tracabilite-fluides", titre: "Tracer le fluide", bulle: ["Où est passé", "le fluide ?"], bras: -84, cycle: 10.5, dessiner: trace,
      dire: "Traçabilité — La fiche d'intervention couvre l'intervention ; dès que le fluide récupéré devient un déchet, le bordereau BSFF dans Trackdéchets l'accompagne jusqu'au traitement. Si un maillon manque, la preuve disparaît." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires suit le fluide d'une affaire en quatre étapes : " +
    "choisir un fluide qui restera disponible sous quota (F-Gaz 3), le confier à une personne attestée d'une entreprise attestée (aptitude et capacité), " +
    "vérifier que la charge reste sous la limite du local (NF EN 378), tracer le fluide jusqu'à la filière (traçabilité).");
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

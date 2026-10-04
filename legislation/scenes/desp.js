/* =====================================================================
   scenes/desp.js — la scène de la branche « La DESP »
   ---------------------------------------------------------------------
   Remplace l'image scene-desp.webp en tête de l'accueil des cinq
   stations de la branche. Hôte, dans l'index.html de chaque station :
     <figure class="scene" data-scene-branche="desp" data-station="<slug>"></figure>
   (class="scene" EXACT : outils/poser-les-scenes.mjs le reconnaît et ne
   repose pas l'image ; missions.js pose la carte « Votre mission » dessous.)

   Même mécanique que scenes/fluidique.js (le pilote) : SceneKit
   (cartoclim/stations/_commun/scene-kit.js), une étape par station de la
   branche, dans l'ordre du plan. L'étape de la station est marquée ★ et
   ouverte d'emblée ; « ▶ Dérouler » joue toute la branche depuis l'étape 1,
   chaque étape le temps de son cycle.
   Le dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — le liquide
   en nappe dont la surface ondule, le filigrane R9. Le chargé d'affaires :
   le bonhomme « plein » de HoCourant, recopié tel quel. Aucune image.
   Les deux moteurs sont LUS, jamais modifiés.

   Règles tenues : aucun texte sur un tracé (contrôle navigateur à chaque
   instant) ; textes du dessin ≥ 22 unités ; tout bouge par le temps t
   (requestAnimationFrame), sans jamais tester prefers-reduced-motion ;
   seul l'interrupteur « Animations » du site (moteur/animations.js, choix
   explicite de l'utilisateur) fige le dessin sur l'image finale de chaque
   étape. Faits : ceux des cinq stations. AUCUNE valeur réglementaire n'est
   dessinée (ni seuil de PS, ni catégorie chiffrée, ni périodicité, ni durée
   de conservation, ni pourcentage de tarage) : celles que liste
   VALEURS-A-VALIDER-DESP.md attendent l'arbitrage de F. Henninot.
   ===================================================================== */
(function () {
  "use strict";
  /* ===== COMMUN (recopier tel quel ; changer seulement le nom de branche ci-dessous et ACCENT) ===== */
  const hote = document.querySelector('figure.scene[data-scene-branche="desp"]');
  if (!hote || typeof SceneKit === "undefined" || !window.VOYAGE_DESSIN) return;
  const { svg, C, pasAPas } = SceneKit;
  const D = window.VOYAGE_DESSIN;
  const ACCENT = "#0c4a6e";     // la couleur de la branche (tableau RESEAU du plan : « La DESP »)
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

  /* pointe de flèche : triangle plein dont la pointe est en (x, y), tourné de ang degrés (0 = vers la droite) */
  const pointe = (parent, x, y, ang, coul) =>
    D.el("path", { d: "M0 0 L-15 -8.5 L-15 8.5 Z", fill: coul, transform: `translate(${x} ${y}) rotate(${ang})` }, parent);
  /* un trait qui se dessine : pathLength 100, donc aucune mesure du dessin n'est nécessaire */
  const trace = (parent, d, coul, ep) =>
    D.el("path", { d: d, fill: "none", stroke: coul, "stroke-width": ep || 4, "stroke-linecap": "round", "stroke-linejoin": "round",
      pathLength: 100, "stroke-dasharray": 100, "stroke-dashoffset": 100 }, parent);
  const tire = (p, q) => p.setAttribute("stroke-dashoffset", (100 * (1 - D.borne(q, 0, 1))).toFixed(1));
  /* point d'une courbe de Bézier cubique (le jeton qui suit une flèche) */
  const bezier = (P, q) => {
    const u = 1 - q, a = u * u * u, b = 3 * u * u * q, c = 3 * u * q * q, e = q * q * q;
    return [a * P[0] + b * P[2] + c * P[4] + e * P[6], a * P[1] + b * P[3] + c * P[5] + e * P[7]];
  };
  /* un texte centré en gras */
  const gras = (parent, x, y, s, coul, taille, at) =>
    ecrire(parent, x, y, s, taille || 22, Object.assign({ "text-anchor": "middle", "font-weight": 700, fill: coul || C.navy }, at || {}));

  /* ---------- étape 1 · La directive : l'énergie qui ne se voit pas ----------
     La pression pousse sur toute la paroi (invisible), puis, si l'enveloppe cède, tout se libère d'un coup. */
  function energie(g) {
    const R = D.el("g", {}, g), CX = 435, CY = 212, BX = 850, BY = 212;
    const t1 = gras(R, CX, 102, "énergie emmagasinée", C.navy, 22, { opacity: 0 });
    // l'équipement sous pression : les flèches poussent sur la paroi, qui tient
    const cuve = D.el("g", { opacity: 0 }, R);
    const corps = D.el("g", {}, cuve);
    D.el("rect", { x: CX - 85, y: CY - 85, width: 170, height: 170, rx: 34, fill: "#eef5fc", stroke: C.navy, "stroke-width": 4 }, corps);
    [-60, 36].forEach(dx => D.el("rect", { x: CX + dx, y: CY + 85, width: 24, height: 13, rx: 2, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2.5 }, corps));
    const fleches = [0, 45, 90, 135, 180, 225, 270, 315].map(a => D.el("path", { fill: "none", stroke: ACCENT, "stroke-width": 5,
      "stroke-linecap": "round", "stroke-linejoin": "round", transform: `translate(${CX} ${CY}) rotate(${a})` }, corps));
    const dFl = r => `M22 0 H${r.toFixed(1)} M${(r - 12).toFixed(1)} -9 L${r.toFixed(1)} 0 L${(r - 12).toFixed(1)} 9`;
    const t2 = ["invisible tant que", "l'enveloppe tient"].map((s, i) => gras(R, CX, 342 + i * 30, s, C.navy, 22, { opacity: 0 }));
    // « si l'enveloppe cède »
    const lien = trace(R, "M548 226 H690", C.gris, 5), tete = pointe(R, 706, 226, 0, C.gris);
    tete.setAttribute("opacity", 0);
    const t3 = ["si l'enveloppe", "cède"].map((s, i) => gras(R, 628, 180 + i * 30, s, C.navy, 22, { opacity: 0 }));
    // la libération brutale : étoile, ondes de choc, fragments projetés
    const eclat = D.el("g", { transform: `translate(${BX} ${BY})` }, R);
    const halo = D.el("circle", { r: 80, fill: "#fdeae6", opacity: 0 }, eclat);
    const ondes = [0, 1].map(() => D.el("circle", { r: 24, fill: "none", stroke: C.rouge, "stroke-width": 3, opacity: 0 }, eclat));
    const etoile = D.el("g", { opacity: 0 }, eclat);
    const pts = [];
    for (let k = 0; k < 20; k++) { const a = -Math.PI / 2 + k * Math.PI / 10, r = k % 2 ? 28 : 60; pts.push((r * Math.cos(a)).toFixed(1) + "," + (r * Math.sin(a)).toFixed(1)); }
    D.el("polygon", { points: pts.join(" "), fill: C.rouge }, etoile);
    const FORMES = ["-10,-7 11,-4 4,10", "-9,-9 10,-1 -3,9", "-11,-3 5,-9 10,5 -5,9", "-8,-10 9,-6 6,9 -9,5"];
    const frag = Array.from({ length: 8 }, (_, k) => ({
      e: D.el("polygon", { points: FORMES[k % 4], fill: "#dbe6f2", stroke: C.navy, "stroke-width": 2.5, "stroke-linejoin": "round", opacity: 0 }, eclat),
      a: (k * 45 + 22) * Math.PI / 180, r: 82 + (k % 3) * 7, spin: (k % 2 ? 1 : -1) * (120 + k * 25) }));
    const t4 = gras(R, BX, 92, "libération brutale", C.rouge, 22, { opacity: 0 });
    const bande = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 430, y: 392, width: 440, height: 40, rx: 12, fill: "#e6f0f6", stroke: ACCENT, "stroke-width": 2.5 }, bande);
    gras(bande, 650, 419, "C'est l'énergie stockée, pas le fluide", ACCENT);
    return t => {
      const f = FIGE ? 7.6 : t % 10, sortie = 1 - D.lisse((f - 9.4) / 0.5);
      voir(R, sortie);
      voir(cuve, D.lisse(f / 0.5)); voir(t1, D.lisse((f - 0.3) / 0.4));
      const p = D.lisse((f - 0.6) / 3.4);                                   // la pression monte, sans rien montrer d'autre
      const tremble = f > 4 && f < 5.1 ? Math.sin(f * 70) * 2 * D.fenetre(f, 4, 5.1, 0.3) : 0;
      corps.setAttribute("transform", `translate(${(CX + tremble).toFixed(2)} ${CY}) scale(${(1 + 0.03 * p).toFixed(3)}) translate(${-CX} ${-CY})`);
      fleches.forEach(a => a.setAttribute("d", dFl(D.lerp(36, 68, p) + Math.sin(f * 7) * 3 * p)));
      t2.forEach(e => voir(e, D.lisse((f - 1.6) / 0.4)));
      tire(lien, D.lisse((f - 4.7) / 0.6)); voir(lien, f > 4.7 ? 1 : 0); voir(tete, D.lisse((f - 5.2) / 0.2));
      t3.forEach(e => voir(e, D.lisse((f - 4.9) / 0.4)));
      const tb = f - 5.4;                                                   // l'enveloppe cède : tout part d'un coup
      voir(halo, 0.9 * D.lisse(tb / 0.25));
      voir(etoile, tb > 0 ? 1 : 0);
      etoile.setAttribute("transform", `scale(${D.courbe([[0, 0], [0.22, 1.2], [0.5, 1]], tb).toFixed(3)})`);
      ondes.forEach((o, k) => {
        const q = D.borne((tb - 0.12 * k) / 0.8, 0, 1);
        o.setAttribute("r", (24 + 76 * D.lisse(q)).toFixed(1)); voir(o, q > 0 && q < 1 ? (1 - q) * 0.85 : 0);
      });
      const e = 1 - Math.pow(1 - D.borne(tb / 1, 0, 1), 3);
      frag.forEach(o => {
        o.e.setAttribute("transform", `translate(${(Math.cos(o.a) * o.r * e).toFixed(1)} ${(Math.sin(o.a) * o.r * e).toFixed(1)}) rotate(${(o.spin * e).toFixed(1)})`);
        voir(o.e, tb > 0.02 ? 1 : 0);
      });
      voir(t4, D.lisse((tb - 0.5) / 0.4));
      voir(bande, D.lisse((f - 7) / 0.4));
    };
  }

  /* ---------- étape 2 · Catégories I à IV : trois critères se croisent, un seul change ---------- */
  function criteres(g) {
    const R = D.el("g", {}, g);
    const carte = (y, texte, coul) => {
      const c = D.el("g", { opacity: 0 }, R);
      const r = D.el("rect", { x: 330, y: y, width: 262, height: 58, rx: 12, fill: "#eef3fb", stroke: coul, "stroke-width": 3 }, c);
      return { g: c, r: r, t: gras(c, 461, y + 36, texte, C.navy) };
    };
    const c1 = carte(100, "la pression (PS)", C.navy), c2 = carte(178, "volume ou diamètre", C.navy), c3 = carte(256, "fluide : groupe 2", C.vert);
    // les trois flèches convergent vers la case de la catégorie
    const COURBES = [[598, 129, 640, 129, 650, 180, 684, 180], [598, 207, 640, 207, 650, 207, 684, 207], [598, 285, 640, 285, 650, 234, 684, 234]];
    const fl = COURBES.map(P => trace(R, `M${P[0]} ${P[1]} C${P[2]} ${P[3]} ${P[4]} ${P[5]} ${P[6]} ${P[7]}`, C.gris, 4));
    const tetes = COURBES.map(P => pointe(R, 698, P[7], 0, C.gris));
    tetes.forEach(h => h.setAttribute("opacity", 0));
    const jetons = [ACCENT, ACCENT, ACCENT, C.rouge].map(c => D.el("circle", { r: 8, fill: c, opacity: 0 }, R));
    // la case de la catégorie
    const bo = D.el("g", { opacity: 0 }, R);
    const cadre = D.el("rect", { x: 704, y: 140, width: 272, height: 134, rx: 14, fill: C.papier, stroke: C.vert, "stroke-width": 4 }, bo);
    gras(bo, 822, 178, "catégorie de I à IV");
    const etat = gras(bo, 822, 233, "plus basse", C.vert, 28);
    const icone = D.el("path", { d: "M0 26 V-26 M-13 -12 L0 -27 L13 -12", fill: "none", stroke: C.vert, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, bo);
    const bande = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 340, y: 352, width: 626, height: 48, rx: 12, fill: "#e6f0f6", stroke: ACCENT, "stroke-width": 2.5 }, bande);
    gras(bande, 653, 384, "Un seul critère change : la catégorie peut changer", ACCENT);
    return t => {
      const f = FIGE ? 8 : t % 10.2, sortie = 1 - D.lisse((f - 9.6) / 0.5);
      voir(R, sortie);
      [c1, c2, c3].forEach((c, i) => voir(c.g, D.lisse((f - 0.2 - i * 0.3) / 0.4)));
      fl.forEach((p, i) => { tire(p, D.lisse((f - 1.2 - i * 0.2) / 0.5)); voir(p, f > 1.2 + i * 0.2 ? 1 : 0); voir(tetes[i], D.lisse((f - 1.6 - i * 0.2) / 0.2)); });
      for (let i = 0; i < 3; i++) {                                         // les trois critères partent ensemble vers la catégorie
        const q = D.borne((f - 2 - 0.3 * i) / 0.8, 0, 1), [x, y] = bezier(COURBES[i], D.lisse(q));
        jetons[i].setAttribute("cx", x.toFixed(1)); jetons[i].setAttribute("cy", y.toFixed(1)); voir(jetons[i], q > 0 && q < 1 ? 1 : 0);
      }
      voir(bo, D.lisse((f - 2.8) / 0.4));
      // le fluide change : seul le troisième critère bouge
      const g1 = f >= 5.2;
      c3.t.textContent = g1 ? "fluide : groupe 1" : "fluide : groupe 2";
      voir(c3.t, f < 5 ? 1 : f < 5.2 ? 1 - (f - 5) / 0.2 : f < 5.4 ? (f - 5.2) / 0.2 : 1);
      c3.r.setAttribute("stroke", g1 ? C.rouge : C.vert); c3.r.setAttribute("stroke-dasharray", g1 ? "10 6" : "none");
      const pul = 1 + 0.05 * Math.sin(D.borne((f - 5) / 0.6, 0, 1) * Math.PI);
      c3.g.setAttribute("transform", `translate(461 285) scale(${pul.toFixed(3)}) translate(-461 -285)`);
      const q4 = D.borne((f - 5.7) / 0.8, 0, 1), [x4, y4] = bezier(COURBES[2], D.lisse(q4));
      jetons[3].setAttribute("cx", x4.toFixed(1)); jetons[3].setAttribute("cy", y4.toFixed(1)); voir(jetons[3], q4 > 0 && q4 < 1 ? 1 : 0);
      const haute = f >= 6.5;
      etat.textContent = haute ? "plus haute" : "plus basse";
      voir(etat, f < 6.3 ? 1 : f < 6.5 ? 1 - (f - 6.3) / 0.2 : f < 6.7 ? (f - 6.5) / 0.2 : 1);
      const coul = haute ? C.rouge : C.vert;
      etat.setAttribute("fill", coul); icone.setAttribute("stroke", coul);
      cadre.setAttribute("stroke", coul); cadre.setAttribute("stroke-dasharray", haute ? "12 7" : "none");
      icone.setAttribute("transform", `translate(950 207) scale(1 ${(-1 + 2 * D.lisse((f - 6.4) / 0.5)).toFixed(3)})`);
      voir(bande, D.lisse((f - 7.2) / 0.4));
    };
  }

  /* ---------- étape 3 · Marquage & papiers : trois pièces, puis le dossier de l'installation ---------- */
  function dossier(g) {
    const R = D.el("g", {}, g);
    // le dossier de l'installation (dessiné d'abord : les documents glissent dessus)
    const dos = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 740, y: 110, width: 240, height: 290, rx: 12, fill: "#eaf1f9", stroke: ACCENT, "stroke-width": 3.5 }, dos);
    D.el("path", { d: "M740 180 V122 Q740 110 752 110 H968 Q980 110 980 122 V180 Z", fill: ACCENT }, dos);
    gras(dos, 860, 136, "dossier de", C.papier);
    gras(dos, 860, 166, "l'installation", C.papier);
    // l'équipement et sa plaque : le CE s'ajoute aux autres champs
    const eq = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 335, y: 128, width: 150, height: 124, rx: 34, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3.5 }, eq);
    [355, 449].forEach(x => D.el("rect", { x: x, y: 252, width: 26, height: 12, rx: 2, fill: "#b9c6d3", stroke: C.navy, "stroke-width": 2.5 }, eq));
    D.el("rect", { x: 355, y: 160, width: 110, height: 56, rx: 6, fill: C.papier, stroke: C.navy, "stroke-width": 2.5 }, eq);
    D.el("path", { d: "M365 175 H405 M365 188 H405 M365 201 H393", stroke: "#9aa7b5", "stroke-width": 3, "stroke-linecap": "round" }, eq);
    const ce = D.el("g", { opacity: 0 }, R);
    gras(ce, 437, 199, "CE", ACCENT, 24);
    const lbl = gras(R, 410, 292, "marquage CE", C.navy, 22, { opacity: 0 });
    // les deux documents, qui glissent vers le dossier
    const doc = (y, coul, fond, l1, l2) => {
      const c = D.el("g", { opacity: 0 }, R);
      D.el("rect", { x: 520, y: y, width: 190, height: 86, rx: 10, fill: fond, stroke: coul, "stroke-width": 3 }, c);
      gras(c, 615, y + 34, l1, coul); gras(c, 615, y + 64, l2, coul);
      return c;
    };
    const dA = doc(194, C.navy, "#eef3fb", "déclaration", "de conformité"), dB = doc(304, C.vert, "#e6f2ec", "notice", "d'instructions");
    // le contrôle : la loupe pointe vers le dossier
    const lien = trace(R, "M668 237 H722", C.gris, 4), tete = pointe(R, 734, 237, 0, C.gris);
    tete.setAttribute("opacity", 0);
    const lp = D.el("g", { opacity: 0 }, R);
    D.el("circle", { r: 42, fill: C.papier, "fill-opacity": 0.55, stroke: C.orange, "stroke-width": 8 }, lp);
    D.el("path", { d: "M30 30 L62 62", stroke: C.orange, "stroke-width": 11, "stroke-linecap": "round" }, lp);
    const bande = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 346, y: 372, width: 360, height: 48, rx: 12, fill: "#e6f0f6", stroke: ACCENT, "stroke-width": 2.5 }, bande);
    gras(bande, 526, 404, "Le contrôle demande ce dossier", ACCENT);
    return t => {
      const f = FIGE ? 8.6 : t % 11.4, sortie = 1 - D.lisse((f - 10.8) / 0.5);
      voir(R, sortie);
      voir(eq, D.lisse(f / 0.6));
      voir(ce, D.lisse((f - 0.9) / 0.25));
      const pop = D.courbe([[0.9, 1.3], [1.25, 1]], f);
      ce.setAttribute("transform", `translate(437 192) scale(${pop.toFixed(3)}) translate(-437 -192)`);
      voir(lbl, D.lisse((f - 1.3) / 0.4));
      voir(dA, D.lisse((f - 1.9) / 0.4)); voir(dB, D.lisse((f - 2.7) / 0.4));
      dA.setAttribute("transform", `translate(${(245 * D.lisse((f - 4.2) / 0.8)).toFixed(1)} 0)`);
      dB.setAttribute("transform", `translate(${(245 * D.lisse((f - 4.7) / 0.8)).toFixed(1)} 0)`);
      voir(dos, D.lisse((f - 5.4) / 0.5));
      const lpx = D.lerp(520, 610, D.lisse((f - 6.6) / 0.6));
      lp.setAttribute("transform", `translate(${lpx.toFixed(1)} 237)`); voir(lp, D.lisse((f - 6.6) / 0.4));
      tire(lien, D.lisse((f - 7.2) / 0.4)); voir(lien, f > 7.2 ? 1 : 0); voir(tete, D.lisse((f - 7.5) / 0.2));
      voir(bande, D.lisse((f - 7.9) / 0.4));
    };
  }

  /* ---------- étape 4 · En service : la ligne de vie, les contrôles, le dossier d'exploitation ---------- */
  function suivi(g) {
    const R = D.el("g", {}, g), YT = 176;
    // la ligne du temps : fabrication et marquage → mise en service → exploitation (flèche ouverte, sans date)
    const p1 = D.el("g", { opacity: 0 }, R);
    D.el("circle", { cx: 385, cy: YT, r: 12, fill: C.papier, stroke: C.navy, "stroke-width": 4 }, p1);
    gras(p1, 385, 222, "fabrication"); gras(p1, 385, 252, "et marquage");
    const lien = trace(R, "M397 176 H512", C.gris, 5);
    const p2 = D.el("g", { opacity: 0 }, R);
    D.el("circle", { cx: 524, cy: YT, r: 12, fill: C.papier, stroke: C.navy, "stroke-width": 4 }, p2);
    gras(p2, 524, 222, "mise en"); gras(p2, 524, 252, "service");
    const barre = D.el("rect", { x: 548, y: 156, width: 0, height: 40, rx: 20, fill: ACCENT }, R);
    const fin = D.el("polygon", { points: "928,150 968,176 928,202", fill: ACCENT, opacity: 0 }, R);
    const tx = gras(R, 738, 184, "exploitation", C.papier, 22, { opacity: 0 });
    const sous = ecrire(R, 570, 232, "tant que l'équipement est en usage", 22, { fill: C.gris, opacity: 0 });
    // les inspections : des loupes régulièrement espacées, sans aucune date
    const lbI = gras(R, 690, 84, "inspections périodiques", C.navy, 22, { opacity: 0 });
    const loupes = [600, 690, 780].map(x => {
      const l = D.el("g", { opacity: 0 }, R);
      D.el("circle", { cx: 0, cy: 0, r: 17, fill: C.papier, stroke: ACCENT, "stroke-width": 5 }, l);
      D.el("path", { d: "M12 12 L27 27", stroke: ACCENT, "stroke-width": 6, "stroke-linecap": "round" }, l);
      return { g: l, x: x };
    });
    // la requalification : une remise à l'épreuve, la pression monte puis redescend
    const lbQ = gras(R, 900, 84, "requalification", C.navy, 22, { opacity: 0 });
    const mano = D.el("g", { opacity: 0 }, R);
    D.el("circle", { r: 28, fill: C.papier, stroke: ACCENT, "stroke-width": 5 }, mano);
    D.el("path", { d: "M-19 13 L-14 9 M-25 0 H-19 M-19 -13 L-14 -9 M0 -25 V-19 M19 -13 L14 -9 M25 0 H19", stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }, mano);
    const aig = D.el("path", { d: "M0 0 V-19", stroke: C.orange, "stroke-width": 5, "stroke-linecap": "round" }, mano);
    D.el("circle", { r: 5, fill: C.navy }, mano);
    // le dossier d'exploitation : la mémoire de l'équipement, tenue à jour par l'exploitant
    const dos = D.el("g", { opacity: 0 }, R);
    D.el("rect", { x: 330, y: 282, width: 430, height: 144, rx: 12, fill: "#eaf1f9", stroke: ACCENT, "stroke-width": 3.5 }, dos);
    D.el("path", { d: "M330 318 V294 Q330 282 342 282 H748 Q760 282 760 294 V318 Z", fill: ACCENT }, dos);
    gras(dos, 545, 307, "dossier d'exploitation", C.papier);
    D.el("path", { d: "M473 318 V426 M616 318 V426", stroke: "#9aa7b5", "stroke-width": 2.5 }, dos);
    gras(dos, 401, 346, "origine"); gras(dos, 544, 346, "historique"); gras(dos, 688, 346, "réparations");
    const ligne = (x1, x2, y, coul, ep) => D.el("path", { d: `M${x1} ${y} H${x2}`, stroke: coul, "stroke-width": ep || 4, "stroke-linecap": "round", opacity: 0 }, R);
    const eOrigine = [366, 380].map(y => ligne(375, 432, y, C.navy));
    const eHisto = [366, 380, 394].map(y => ligne(492, 596, y, ACCENT));
    const eHistoQ = ligne(492, 596, 408, ACCENT, 7);
    const eRepar = ligne(642, 742, 366, C.gris);
    // l'exploitant : c'est lui qui tient le dossier
    const exp = D.el("g", { opacity: 0 }, R);
    D.el("path", { d: "M830 342 L884 312 L938 342 Z", fill: "#dbe6f2", stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, exp);
    D.el("rect", { x: 838, y: 342, width: 92, height: 58, fill: "#e8f1fb", stroke: C.navy, "stroke-width": 3 }, exp);
    [850, 878, 906].forEach(x => D.el("rect", { x: x, y: 354, width: 14, height: 14, fill: C.papier, stroke: C.navy, "stroke-width": 2 }, exp));
    gras(exp, 884, 426, "l'exploitant");
    const lien2 = trace(R, "M824 372 H780", C.gris, 4), tete2 = pointe(R, 764, 372, 180, C.gris);
    tete2.setAttribute("opacity", 0);
    return t => {
      const f = FIGE ? 9.6 : t % 11.6, sortie = 1 - D.lisse((f - 11) / 0.5);
      voir(R, sortie);
      voir(p1, D.lisse(f / 0.4)); tire(lien, D.lisse((f - 0.5) / 0.5)); voir(lien, f > 0.5 ? 1 : 0); voir(p2, D.lisse((f - 0.9) / 0.4));
      voir(dos, D.lisse((f - 1) / 0.5));
      eOrigine.forEach((e, i) => voir(e, D.lisse((f - 1.6 - 0.2 * i) / 0.3)));
      const w = 380 * D.lisse((f - 1.7) / 0.9);
      barre.setAttribute("width", w.toFixed(1)); barre.setAttribute("rx", Math.min(20, w / 2).toFixed(1));
      voir(fin, D.lisse((f - 2.5) / 0.2)); voir(tx, D.lisse((f - 2.6) / 0.3)); voir(sous, D.lisse((f - 2.8) / 0.4));
      voir(lbI, D.lisse((f - 3.2) / 0.4));
      loupes.forEach((l, i) => {                                            // une inspection, puis la suivante, au même rythme
        const t0 = 3.2 + 1.1 * i, s = D.courbe([[t0, 0], [t0 + 0.25, 1.25], [t0 + 0.5, 1]], f);
        l.g.setAttribute("transform", `translate(${l.x} 118) scale(${s.toFixed(3)})`); voir(l.g, f > t0 ? 1 : 0);
        voir(eHisto[i], D.lisse((f - t0 - 0.4) / 0.3));
      });
      voir(lbQ, D.lisse((f - 6.4) / 0.4));
      const sm = D.courbe([[6.4, 0.2], [6.65, 1.12], [6.9, 1]], f);
      mano.setAttribute("transform", `translate(900 128) scale(${sm.toFixed(3)})`); voir(mano, f > 6.4 ? 1 : 0);
      aig.setAttribute("transform", `rotate(${D.courbe([[0, -62], [7, -62], [8, 48], [8.4, 48]], f).toFixed(1)})`);
      voir(eHistoQ, D.lisse((f - 7.4) / 0.3));
      voir(eRepar, D.lisse((f - 8) / 0.3));
      voir(exp, D.lisse((f - 8.4) / 0.4)); tire(lien2, D.lisse((f - 8.8) / 0.3)); voir(lien2, f > 8.8 ? 1 : 0); voir(tete2, D.lisse((f - 9.05) / 0.2));
    };
  }

  /* ---------- étape 5 · Soupapes & sécurités : la pression monte, le pressostat coupe d'abord, la soupape en dernier ---------- */
  function pression(g) {
    const R = D.el("g", {}, g), VX = 350, VY = 215, VW = 175, VH = 175, CXv = VX + VW / 2;
    // la cuve : le liquide en nappe, la soupape sur son dessus
    D.el("rect", { x: VX + 2, y: VY + 2, width: VW - 4, height: VH - 4, rx: 28 }, D.el("clipPath", { id: "desp-cuve" }, R));
    D.el("rect", { x: VX, y: VY, width: VW, height: VH, rx: 30, fill: "#eef5fc" }, R);
    const liq = D.liquide(D.el("g", { "clip-path": "url(#desp-cuve)" }, R),
      { x0: VX, x1: VX + VW, yh: VY, yb: VY + VH, pas: 6, niveau: () => 0.5, couleur: () => LIQUIDE });
    D.el("rect", { x: VX, y: VY, width: VW, height: VH, rx: 30, fill: "none", stroke: C.navy, "stroke-width": 4 }, R);
    D.el("rect", { x: CXv - 32, y: 130, width: 64, height: 85, fill: "#eef3f9", stroke: C.navy, "stroke-width": 3 }, R);
    D.el("path", { d: `M${CXv - 32} 205 H${CXv - 19} M${CXv + 19} 205 H${CXv + 32}`, stroke: C.navy, "stroke-width": 4 }, R);
    D.el("rect", { x: CXv - 15, y: 136, width: 30, height: 9, fill: C.navy }, R);
    ecrire(R, CXv - 44, 168, "soupape", 22, { "text-anchor": "end", "font-weight": 700, fill: C.navy });
    const ressort = D.el("path", { fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-linejoin": "round" }, R);
    const clapet = D.el("rect", { x: CXv - 22, width: 44, height: 13, rx: 2, fill: C.gris, stroke: C.navy, "stroke-width": 2 }, R);
    const evac = [-14, 14].map(dx => D.el("path", { fill: "none", stroke: C.orange, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, R));
    // la jauge de pression et ses trois repères
    const GX = 640, Y0 = 386, HJ = 280, yP = p => Y0 - p * HJ;
    gras(R, GX + 24, 88, "pression");
    D.el("rect", { x: GX, y: 100, width: 48, height: 292, rx: 24, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, R);
    const colonne = D.el("rect", { x: GX + 6, width: 36, rx: 10, fill: ACCENT }, R);
    D.el("path", { d: "M628 288 H706", stroke: C.bleu, "stroke-width": 5, "stroke-linecap": "round" }, R);                       // le pressostat
    D.el("path", { d: "M628 198 H706", stroke: C.vert, "stroke-width": 5, "stroke-linecap": "round" }, R);                        // la soupape
    D.el("path", { d: "M628 140 H706", stroke: C.rouge, "stroke-width": 4, "stroke-dasharray": "10 7" }, R);                      // la limite : la PS
    ecrire(R, 720, 148, "limite : la PS", 22, { "font-weight": 700, fill: C.rouge });
    ecrire(R, 720, 206, "2 · la soupape s'ouvre", 22, { "font-weight": 700, fill: C.navy });
    const milieu = [ecrire(R, 720, 250, "si elle monte quand même", 22, { fill: C.gris, opacity: 0 })];
    ecrire(R, 720, 296, "1 · le pressostat coupe", 22, { "font-weight": 700, fill: C.navy });
    // le compresseur : en marche, puis coupé par le pressostat
    const pastille = D.el("g", {}, R);
    const pf = D.el("rect", { x: 330, y: 396, width: 300, height: 38, rx: 19, fill: "#e6f2ec", stroke: C.vert, "stroke-width": 3 }, pastille);
    const pic = D.el("path", { fill: C.vert }, pastille);
    const pt = ecrire(pastille, 378, 422, "compresseur : marche", 22, { "font-weight": 700, fill: C.vert });
    return t => {
      const f = FIGE ? 7.9 : t % 11.4, sortie = 1 - D.lisse((f - 10.8) / 0.5);
      voir(R, sortie);
      const p = D.courbe([[0, 0.05], [0.8, 0.05], [3.5, 0.35], [5.6, 0.35], [7.3, 0.675], [7.6, 0.69], [8.6, 0.6], [12, 0.6]], f);
      colonne.setAttribute("y", yP(p).toFixed(1)); colonne.setAttribute("height", (Y0 - yP(p)).toFixed(1));
      const ouv = D.lisse((f - 7.2) / 0.25) * (1 - D.lisse((f - 8.4) / 0.3));   // la soupape s'ouvre au tarage, puis se referme
      const yc = 192 - 18 * ouv;
      clapet.setAttribute("y", yc.toFixed(1));
      let d = `M${CXv} 145`;
      for (let k = 1; k <= 5; k++) d += ` L${CXv + (k % 2 ? 11 : -11)} ${(145 + (yc - 145) * k / 6).toFixed(1)}`;
      ressort.setAttribute("d", d + ` L${CXv} ${yc.toFixed(1)}`);
      evac.forEach((a, i) => {
        const x = CXv + (i ? 17 : -17), L = 8 + 34 * ouv;
        a.setAttribute("d", `M${x} 124 V${(124 - L).toFixed(1)} M${x - 8} ${(136 - L).toFixed(1)} L${x} ${(124 - L).toFixed(1)} L${x + 8} ${(136 - L).toFixed(1)}`);
        voir(a, ouv > 0.05 ? 1 : 0);
      });
      milieu.forEach(e => voir(e, D.lisse((f - 5) / 0.4)));
      const arret = f >= 3.5;                                                // le pressostat a coupé : le compresseur s'arrête
      pt.textContent = arret ? "compresseur : arrêt" : "compresseur : marche";
      const coul = arret ? C.rouge : C.vert;
      pt.setAttribute("fill", coul); pf.setAttribute("stroke", coul); pf.setAttribute("fill", arret ? "#f9e3e0" : "#e6f2ec");
      pic.setAttribute("fill", coul); pic.setAttribute("d", arret ? "M346 407 H362 V423 H346 Z" : "M346 406 L364 415 L346 424 Z");
      liq.maj(t);
    };
  }

  /* ---------- les cinq étapes, une par station, dans l'ordre du plan ---------- */
  const ETAPES = [
    { station: "desp-la-directive", titre: "L'énergie stockée", bulle: ["Pourquoi un texte", "à part ?"], bras: -72, cycle: 10, dessiner: energie,
      dire: "La directive — Un volume fermé sous pression emmagasine une énergie invisible : si l'enveloppe cède, elle se libère d'un coup. C'est cette énergie, pas le fluide, qui justifie un texte à part." },
    { station: "desp-categories", titre: "Les trois critères", bulle: ["Dans quelle", "catégorie ?"], bras: -66, cycle: 10.2, dessiner: criteres,
      dire: "Catégories I à IV — La PS, le volume (ou le diamètre) et le groupe du fluide se croisent pour donner la catégorie. Un seul critère change, le fluide : elle peut changer." },
    { station: "desp-marquage-papiers", titre: "Garder les papiers", bulle: ["Quels papiers", "garder ?"], bras: -84, cycle: 11.4, dessiner: dossier,
      dire: "Marquage & papiers — Le CE est sur la plaque ; déclaration de conformité et notice viennent avec l'équipement. L'installateur les garde dans le dossier de l'installation, demandé au contrôle." },
    { station: "desp-en-service", titre: "Le suivi en service", bulle: ["Et après", "l'installation ?"], bras: -76, cycle: 11.6, dessiner: suivi,
      dire: "En service — Après la pose, l'équipement reste suivi : inspections périodiques, requalification plus profonde, le tout consigné dans le dossier d'exploitation que tient l'exploitant. Le rythme se lit sur le texte en vigueur." },
    { station: "desp-soupapes-securites", titre: "Qui agit en premier", bulle: ["Qui agit", "en premier ?"], bras: -96, cycle: 11.4, dessiner: pression,
      dire: "Soupapes & sécurités — Le pressostat coupe d'abord, sans rien évacuer. Si la pression monte quand même, la soupape s'ouvre, évacue l'excès, puis se referme. La limite à ne jamais atteindre : la PS." }
  ];

  /* ===== COMMUN (recopier tel quel ; seule la description du dessin, 2e argument de svg(), change) ===== */
  /* ---------- le dessin : fond, filigrane, chargé d'affaires, bulle, plateau ---------- */
  const dessin = svg("0 0 1000 440", "Le chargé d'affaires suit un équipement sous pression en cinq étapes : " +
    "comprendre pourquoi un texte à part existe, l'énergie stockée (la directive), classer l'équipement selon trois critères croisés (catégories I à IV), " +
    "garder le marquage, la déclaration et la notice dans le dossier de l'installation (marquage et papiers), suivre l'équipement en service (inspections, requalification, dossier d'exploitation), " +
    "puis protéger la PS : le pressostat coupe d'abord, la soupape s'ouvre en dernier recours (soupapes et sécurités).");
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

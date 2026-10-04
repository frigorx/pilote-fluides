/* =====================================================================
   scene-geste.js — etancheite-interactive : de l'indice à la preuve,
   la main sur le raccord
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, d'après le pilote
   chaine-intervention-interactive) : le dessin vivant du module, en haut
   de chaque écran. À gauche, le geste en gros plan : le technicien (le
   bonhomme de HoCourant, repris de legislation/scenes/fluidique.js) a la
   main sur ce qu'il utilise — le raccord, le manomètre, le détecteur, la
   solution moussante, le registre. À droite, le montage où l'on voit la
   conséquence : une ligne cuivre et son raccord flare déjà repris ; le
   fluide entraîne l'huile (une nappe ambre suinte et goutte) et la vapeur
   s'échappe (des molécules sortent du joint, s'étalent et retombent ; la
   sonde passe en partie basse, comme sur le schéma validé
   recherche-fuite-geste.svg) ; le détecteur réagit près du joint ; la
   solution moussante gonfle là où le fluide sort.
   Six étapes, l'ordre de l'enquête : voir et toucher, mesurer, balayer,
   confirmer, test à la bulle, consigner. Chaque écran ouvre l'étape de son
   dossier (SCENE_GESTE.dossier, appelé par app.js).
   SYMBOLES, jamais redessinés : le manomètre et le détecteur viennent de
   la collection QElectroTech de Franck (symboles/manometro.svg,
   detector-gas.svg, copies sans retouche). Le raccord n'a pas de symbole
   normalisé : il est monté avec les briques métal du moteur (écrous
   laiton sur le tube cuivre), comme les piquages du pilote. Seul ajout sur
   un symbole : la diode rouge du détecteur s'allume (un halo, sur sa
   propre place) quand il réagit.
   RÉEMPLOI, en lecture : jouerezo/moteur/voyage-dessin.js (tube cuivre,
   nappe, bulles, gouttes, courant, pastilles, filigrane).
   RÈGLES TENUES : texte jamais sur un tracé ; textes du dessin ≥ 22 unités
   (≥ 19 px à 956 px de large) ; filigrane R9 derrière le dessin ; le
   mouvement suit le temps de la page, sans autre condition (Pause le fige).
   Aucune valeur de pression, de seuil, de fréquence ni de durée (la notice
   et la procédure du site font foi).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, hote = document.getElementById("scene-lecon");
  if (!hote) return;
  if (!D) { hote.hidden = true; return; } // moteur du Voyage absent : pas de cadre vide
  const NS = "http://www.w3.org/2000/svg";
  const C = { navy: "#1b3a63", bleu: "#3d7fca", rouge: "#c0392b", vert: "#1e7e54", gris: "#637285", orange: "#ff6b35", papier: "#fffdf8", ambre: "#8a5a00", alerte: "#c9451a" };
  const PEAU = "#f6d7bd", ENCRE = "#10233c", POLICE = "Calibri, 'Segoe UI', Arial, sans-serif", HUILE = "#c98a1b", LIQUIDE = "#8fb7d9";
  const ecrire = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 22, "font-family": POLICE, "font-weight": 600, fill: ENCRE }, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = "Fluide"; }); // cartouche du produit (charte R9)
  const passe = (t, a, b) => D.lisse((t - a) / (b - a)); // 0 avant a, 1 après b

  /* ---------- les étapes (l'ordre de l'enquête) ---------- */
  const ETAPES = [
    { nom: "Voir, toucher", duree: 5, dire: "une trace d’huile marque le raccord déjà repris." },
    { nom: "Mesurer", duree: 5, dire: "la pression est plus basse que prévu : fuite plausible." },
    { nom: "Balayer", duree: 6, dire: "la sonde longe le raccord, lentement, au contact." },
    { nom: "Confirmer", duree: 5, dire: "second passage : l’alerte revient au même endroit." },
    { nom: "Test à la bulle", duree: 5, dire: "des bulles gonflent là où le fluide s’échappe." },
    { nom: "Consigner", duree: 5, dire: "contexte, méthode, résultat et suite vont au registre." }
  ];
  const DOSSIER = { orienter: 0, soupconner: 1, localiser: 2, comparer: 1, tracer: 5, bilan: 0 };
  const DEBUT = ETAPES.map((e, i) => ETAPES.slice(0, i).reduce((a, x) => a + x.duree, 0)), TOTAL = ETAPES.reduce((a, x) => a + x.duree, 0);

  /* le montage : le joint du raccord (XJ), l'axe de la ligne (YC), la hauteur de passage du détecteur (YD) */
  const XJ = 650, YC = 150, YD = 240;
  const proche = x => 1 - D.lisse((Math.abs(x - XJ) - 22) / 38); // 1 sur le raccord (± 22), 0 au-delà de ± 60 : là où le détecteur réagit

  /* l'état du plateau à l'étape k, au temps local τ (secondes) */
  function etat(k, tau) {
    const e = { vue: "joint", huile: 1, fuite: 0.55, mousse: 0, bulles: 0, det: 0, dx: XJ, alerte: 0, main: 0, agite: 1, geste: "", sens: 0, baisse: 0, coches: 0, pastille: null, titre: ["raccord flare", "déjà repris"], mot: null };
    if (k === 0) {
      e.huile = passe(tau, 0.9, 2.4); e.main = D.fenetre(tau, 0.2, 4.6, 0.4); e.geste = "toucher";
      if (e.huile > 0.6) { e.pastille = "huile"; e.mot = ["de l’huile", C.ambre]; }
    }
    if (k === 1) {
      e.vue = "mano"; e.titre = ["manomètre", "sur la ligne"]; e.fuite = 0.6;
      e.main = D.fenetre(tau, 0.2, 4.6, 0.4); e.geste = "lire"; e.baisse = passe(tau, 1, 4.2);
      if (tau > 1.6) { e.pastille = "basse"; e.mot = ["en baisse", C.bleu]; }
    }
    if (k === 2 || k === 3) {
      e.vue = "det"; e.titre = ["détecteur", "lent, au contact"]; e.geste = "balayer"; e.fuite = 0.8;
      if (k === 2) {
        e.det = passe(tau, 0, 0.4); e.sens = 1; e.main = D.fenetre(tau, 0.2, 7, 0.4);
        e.dx = D.courbe([[0.6, 390], [2.6, 590], [4.6, 710], [5.6, 790]], tau, true);
      } else {
        e.det = 1; e.sens = -1; e.main = D.fenetre(tau, -1, 4.6, 0.4);
        e.dx = D.courbe([[0.5, 790], [2, 700], [3.3, 650]], tau, true);
      }
      e.alerte = proche(e.dx);
      e.mot = e.alerte > 0.5 ? ["alerte !", C.alerte] : ["silence", C.gris];
      e.pastille = k === 2 ? (e.alerte > 0.5 ? "alerte" : "balaye") : tau > 3.6 ? "confirme" : e.alerte > 0.5 ? "alerte" : "second";
      if (k === 3 && tau > 3.6) e.mot = ["confirmée", C.vert];
    }
    if (k === 4) {
      e.titre = ["solution moussante", "sur le raccord"]; e.det = 1 - passe(tau, 0, 0.5); e.alerte = e.det;
      e.main = D.fenetre(tau, 0.3, 4.6, 0.3); e.geste = "badigeonner"; e.agite = D.fenetre(tau, 0.5, 2.6, 0.3); // la main badigeonne, puis reste sur le raccord pour regarder les bulles
      e.mousse = passe(tau, 0.8, 2); e.bulles = passe(tau, 1.8, 2.8); e.fuite = D.lerp(0.55, 0.2, e.bulles);
      if (e.bulles > 0.4) { e.pastille = "bulles"; e.mot = ["des bulles", C.bleu]; }
    }
    if (k === 5) {
      e.vue = "registre"; e.titre = ["le registre", "garde la trace"];
      e.mousse = 1 - passe(tau, 0, 1.2); e.bulles = e.mousse; e.fuite = D.lerp(0.55, 0.2, e.mousse); e.huile = 1 - passe(tau, 4.5, 5);
      e.main = D.fenetre(tau, 0.2, 4.4, 0.3); e.geste = "ecrire";
      e.coches = (tau > 0.8) + (tau > 1.7) + (tau > 2.6) + (tau > 3.5);
      if (e.coches === 4) { e.pastille = "consigne"; e.mot = ["consigné", C.vert]; }
    }
    return e;
  }

  /* ---------- le technicien : bonhomme « plein » de HoCourant (recopié de legislation/scenes/fluidique.js) ----------
     Repère : tête en haut (y 0), pieds à y 72, regard vers la droite ; bras tourné autour de l'épaule (2, 24). */
  function bonhomme(parent, o) {
    const g = D.el("g", {}, parent);
    D.el("ellipse", { cx: 0, cy: 73, rx: 13, ry: 2.5, fill: C.navy, opacity: 0.15 }, g);
    const corps = D.el("g", {}, g);
    D.el("path", { d: "M-2 25 L-10 46", stroke: C.navy, "stroke-width": 6, "stroke-linecap": "round" }, corps);
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
    D.el("circle", { cx: 12.5, cy: 49, r: 3.8, fill: PEAU, stroke: C.navy, "stroke-width": 1.8 }, bras);
    return function (p) { // p : { x, y, k, t, bras (degrés, 0 = bras pendant) }
      g.setAttribute("transform", `translate(${p.x} ${p.y}) scale(${p.k})`);
      corps.setAttribute("transform", `translate(0 ${(Math.sin(p.t * 2.1) * 0.35).toFixed(2)})`);
      bras.setAttribute("transform", `rotate(${p.bras.toFixed(1)} 2 24)`);
      const ferme = D.frac(p.t / 3.7 + (o.dephasage || 0)) < 0.035;
      yeux.forEach(e => e.setAttribute("ry", ferme ? 0.25 : 1.2));
    };
  }

  /* ---------- le dessin (repère 1060 × 276 : gros plan x 0-262, montage x 270-1060) ---------- */
  const TECH = { x: 66, y: 106, k: 2.25 }, MAIN = [127.6, 138.4], BRAS = -87.9; // la main sur l'objet du gros plan
  const SD = 2.2, RUBRIQUES = ["contexte", "méthode", "résultat", "suite"]; // le détecteur dans le montage et de près ; les quatre parties de la trace (écran « Le registre raconte… »)
  const PASTILLES = { huile: ["trace d’huile au raccord", C.navy], basse: ["pression plus basse que prévu", C.bleu], balaye: ["balayage lent", C.gris], alerte: ["alerte", C.alerte], second: ["second passage", C.gris],
    confirme: ["alerte confirmée", C.vert], bulles: ["des bulles au point précis", C.vert], consigne: ["consigné au registre", C.vert] };
  const CADRES = { joint: [XJ - 40, 108, 80, 84], mano: [301, 68, 58, 66] }; // la pièce qui agit s'allume

  function image(parent, href, x, y, l, h, multiplier) {
    const i = D.el("image", { href: href, x: x, y: y, width: l, height: h, preserveAspectRatio: "xMidYMid meet" }, parent);
    if (multiplier) i.setAttribute("style", "mix-blend-mode:multiply"); // le fond blanc du symbole s'efface sur le papier
    return i;
  }
  function vapeur(parent) { // la vapeur qui fuit : des molécules (celles du moteur) sortent du joint, s'étalent et retombent
    const r = D.alea(7), P = [];
    for (let i = 0; i < 36; i++) {
      const bas = i % 4 !== 0; // trois sur quatre vers le bas
      P.push({ ph: r() * 3, per: 1.7 + r() * 0.9, phi: (r() - 0.5) * (bas ? 2.2 : 1.6), R: 36 + r() * 40, bas: bas, rr: 0.46 + r() * 0.22, seuil: i / 36, c: D.el("use", { href: "#vm-mol", fill: D.couleur(0.12, true) }, parent) });
    }
    return (t, force) => P.forEach(p => {
      const a = D.frac((t + p.ph) / p.per), d = p.R * (1 - (1 - a) * (1 - a));
      const x = XJ + Math.sin(p.phi) * d * 0.8, y = YC + (p.bas ? Math.cos(p.phi) * d : -Math.cos(p.phi) * d + 26 * a * a);
      p.c.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(p.rr * (0.8 + 0.5 * a)).toFixed(2)})`);
      p.c.setAttribute("opacity", (0.95 * D.borne((force - p.seuil) * 6, 0, 1) * D.fenetre(a, 0, 1, 0.3)).toFixed(2));
    });
  }
  function fleche(parent, cx, cy, r, horaire) { // le sens du mouvement autour d'un centre : à droite des aiguilles d'une montre, ou l'inverse
    const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
    const [a0, a1] = horaire ? [200, 340] : [340, 200], q0 = p(a0), q1 = p(a1), dir = (a1 + (horaire ? 90 : -90)) * Math.PI / 180;
    const g = D.el("g", { opacity: 0 }, parent), ux = Math.cos(dir), uy = Math.sin(dir);
    D.el("path", { d: `M${q0[0].toFixed(1)} ${q0[1].toFixed(1)} A${r} ${r} 0 0 ${horaire ? 1 : 0} ${q1[0].toFixed(1)} ${q1[1].toFixed(1)}`, fill: "none", stroke: C.orange, "stroke-width": 4.5, "stroke-linecap": "round" }, g);
    const pointe = [[q1[0] + ux * 9, q1[1] + uy * 9], [q1[0] - uy * 7 - ux * 3, q1[1] + ux * 7 - uy * 3], [q1[0] + uy * 7 - ux * 3, q1[1] - ux * 7 - uy * 3]];
    D.el("polygon", { points: pointe.map(q => q.map(v => v.toFixed(1)).join(",")).join(" "), fill: C.orange }, g);
    return g;
  }
  function balayage(parent, sens) { // le sens du balayage, au-dessus du détecteur : vers la droite ou vers la gauche
    const g = D.el("g", { opacity: 0 }, parent), y = 72, d = sens > 0 ? 1 : -1, x0 = sens > 0 ? 150 : 242, x1 = sens > 0 ? 242 : 150;
    D.el("path", { d: `M${x0} ${y} H${x1 - 8 * d}`, fill: "none", stroke: C.orange, "stroke-width": 4.5, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: `${x1},${y} ${x1 - 13 * d},${y - 9} ${x1 - 13 * d},${y + 9}`, fill: C.orange }, g);
    return g;
  }

  function dessiner(svg) {
    svg.setAttribute("viewBox", "0 0 1060 276");
    const g = D.el("g", {}, svg);
    marquer(D.filigrane(g, [[132, 236], [900, 86]], 220));
    /* ===== le montage ===== */
    const m = D.el("g", {}, g);
    // la ligne cuivre et son raccord flare : un seul groupe, dont le gros plan montre une copie vivante
    const ligne = D.el("g", { id: "etancheite-ligne" }, m);
    const panache = vapeur(D.el("g", {}, ligne)); // derrière le métal : la vapeur sort du joint
    D.tube(ligne, 270, 130, 790, 40, "cuivre", false, LIQUIDE); // l'intérieur est du liquide
    const courant = D.courant(ligne, 276, 1054, 132, 168, 8, 11);
    [[XJ - 34, 34], [XJ, 30]].forEach(([x, l]) => D.el("rect", { x: x, y: 120, width: l, height: 60, rx: 5, fill: "url(#vm-laiton)" }, ligne)); // l'écrou et le corps du raccord
    D.el("line", { x1: XJ, x2: XJ, y1: 122, y2: 178, stroke: "#4e3a10", "stroke-width": 2.4 }, ligne);
    const huile = { v: 0 }, huileG = D.el("g", {}, ligne);
    const lavis = D.el("rect", { x: XJ - 34, y: 166, width: 64, height: 14, rx: 6, fill: HUILE, opacity: 0 }, huileG); // l'huile mouille le bas des écrous
    const nappeH = D.liquide(D.el("g", { transform: "translate(0 360) scale(1 -1)" }, huileG), { x0: XJ - 38, x1: XJ + 38, yh: 164, yb: 180, niveau: x => huile.v * Math.max(0, 1 - Math.pow((x - XJ) / 38, 2)), couleur: () => HUILE, opacite: 0.95, pas: 4 }); // retournée : le film pend sous le raccord
    const gtt = D.el("g", { transform: `translate(${XJ} 190) scale(0.8) translate(${-XJ} -190)` }, huileG);
    const gouttes = D.bulles(gtt, 4, 23, true);
    gtt.querySelectorAll("circle").forEach(c => { c.setAttribute("stroke", "#8a5a00"); c.setAttribute("stroke-width", 1.4); });
    const mousse = { v: 0 }, mousseG = D.el("g", {}, ligne);
    const nappeM = D.liquide(mousseG, { x0: XJ - 44, x1: XJ + 44, yh: 98, yb: 120, niveau: x => mousse.v * Math.max(0, 1 - Math.pow((x - XJ) / 44, 2)), couleur: () => "#cfe3f5", opacite: 0.95, pas: 4 });
    const bulles = D.bulles(D.el("g", {}, mousseG), 7, 41);
    mousseG.querySelectorAll("circle").forEach(c => { c.setAttribute("stroke", C.bleu); c.setAttribute("stroke-width", 1.6); c.setAttribute("fill-opacity", 0.5); });
    // le manomètre, posé sur la ligne (méthode indirecte)
    image(m, "symboles/manometro.svg", 303.4, 61.4, 53.2, 95.2, true);
    // le détecteur, balayé en partie basse
    const dg = D.el("g", {}, m);
    const detImg = image(dg, "symboles/detector-gas.svg", -20, -22, 38, 38, true);
    const halo = D.el("circle", { cx: 0.5, cy: 7.5, r: 4.5, fill: C.alerte, opacity: 0 }, dg);
    // la pièce qui agit s'allume
    const anneau = D.el("rect", { rx: 9, fill: "none", stroke: C.orange, "stroke-width": 4, opacity: 0 }, m);
    // légendes du montage (jamais sur un tracé)
    ecrire(m, 330, 50, "manomètre", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    ecrire(m, 716, 112, "raccord flare", { "font-weight": 700, fill: C.navy });
    ecrire(m, 716, 200, "trace d’huile", { fill: C.ambre });
    const etats = {};
    Object.entries(PASTILLES).forEach(([cle, [texte, fond]]) => { etats[cle] = D.pastille(m, 1052, 34, texte, fond, 22, "end"); });
    /* ===== le gros plan du geste ===== */
    const gp = D.el("g", {}, g);
    const vues = {};
    vues.joint = D.el("svg", { x: 134, y: 68, width: 128, height: 170, viewBox: "605 90 90 120" }, gp); // le raccord de près : une copie vivante de la ligne
    D.el("use", { href: "#etancheite-ligne" }, vues.joint);
    vues.mano = D.el("svg", { x: 120.4, y: 97.6, width: 95.2, height: 142.8, viewBox: "-14 -15 28 42" }, gp); // le manomètre, le même symbole, agrandi
    image(vues.mano, "symboles/manometro.svg", -19, -23, 38, 68, true);
    const flecheMano = fleche(gp, 168, 138.4, 48, false);
    vues.registre = D.el("g", {}, gp); // la trace : les quatre parties du registre
    D.el("rect", { x: 132, y: 70, width: 128, height: 166, rx: 10, fill: C.papier, stroke: C.navy, "stroke-width": 3 }, vues.registre);
    const lignes = RUBRIQUES.map((nom, i) => [D.el("circle", { cx: 147, cy: 105 + i * 38, r: 8, fill: C.vert, opacity: 0 }, vues.registre), ecrire(vues.registre, 162, 112 + i * 38, nom, { fill: C.gris })]);
    const mobile = D.el("g", {}, gp); // le technicien suit le détecteur : il se déplace le long de la ligne
    vues.det = D.el("svg", { x: 125.6, y: 78.4, width: 120, height: 110, viewBox: "-11 -12 24 22" }, mobile); // le détecteur de près
    image(vues.det, "symboles/detector-gas.svg", -20, -22, 38, 38, true);
    const haloZ = D.el("circle", { cx: 183.1, cy: 175.9, r: 15, fill: C.alerte, opacity: 0 }, mobile);
    const tech = bonhomme(mobile, { casquette: true, dephasage: 0.3 });
    const versDroite = balayage(gp, 1), versGauche = balayage(gp, -1);
    const titre1 = ecrire(gp, 131, 26, "", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    const titre2 = ecrire(gp, 131, 52, "", { "text-anchor": "middle", fill: C.gris });
    const mot = ecrire(gp, 258, 266, "", { "font-weight": 700, "text-anchor": "end" });
    const GESTES = { toucher: [7, 3.5], lire: [2.2, 1.2], balayer: [3, 1.2], badigeonner: [9, 9], ecrire: [9, 2.5], "": [0, 0] }; // [vitesse, amplitude en degrés] du bras

    return function (k, tau, t) {
      const e = etat(k, tau);
      /* montage */
      huile.v = e.huile; nappeH.maj(t); lavis.setAttribute("opacity", (0.65 * e.huile).toFixed(2)); gouttes(t, q => [XJ - 18 + q * 36, 190, 226, passe(e.huile, 0.5, 0.9), HUILE]);
      mousse.v = e.mousse; nappeM.maj(t); bulles(t, q => [XJ - 24 + q * 48, 110, 110, e.bulles, "#eaf4fd"]);
      panache(t, e.fuite); courant(t, 40);
      const pulse = 0.55 + 0.45 * Math.sin(t * 18), alerte = e.alerte * e.det;
      dg.setAttribute("transform", `translate(${e.dx.toFixed(1)} ${YD}) scale(${SD})`);
      detImg.setAttribute("opacity", e.det.toFixed(2)); halo.setAttribute("opacity", (alerte * pulse).toFixed(2));
      Object.entries(etats).forEach(([cle, p]) => p.setAttribute("opacity", e.pastille === cle ? 1 : 0));
      const cadre = e.vue === "joint" ? CADRES.joint : e.vue === "mano" ? CADRES.mano : e.vue === "det" ? [e.dx - 26, YD - 27, 54, 54] : null;
      if (cadre) Object.entries({ x: cadre[0], y: cadre[1], width: cadre[2], height: cadre[3] }).forEach(([a, v]) => anneau.setAttribute(a, v.toFixed(1)));
      anneau.setAttribute("opacity", (cadre ? e.main : 0).toFixed(2));
      /* le geste */
      const pris = e.main > 0.05; // l'objet de près n'apparaît que lorsque la main le prend
      Object.entries(vues).forEach(([cle, v]) => v.setAttribute("display", pris && cle === e.vue ? "inline" : "none"));
      flecheMano.setAttribute("opacity", (e.vue === "mano" ? D.fenetre(tau, 1, 4.2, 0.3) : 0).toFixed(2));
      flecheMano.setAttribute("transform", `rotate(${(-32 * e.baisse).toFixed(1)} 168 138.4)`);
      versDroite.setAttribute("opacity", (e.vue === "det" && e.sens > 0 ? 0.9 * e.main : 0).toFixed(2)); versGauche.setAttribute("opacity", (e.vue === "det" && e.sens < 0 ? 0.9 * e.main : 0).toFixed(2));
      haloZ.setAttribute("opacity", (e.vue === "det" && pris ? alerte * pulse : 0).toFixed(2));
      lignes.forEach(([point, texte], i) => { point.setAttribute("opacity", e.coches > i ? 1 : 0); texte.setAttribute("fill", e.coches > i ? ENCRE : C.gris); });
      if (titre1.textContent !== e.titre[0] || titre2.textContent !== e.titre[1]) { titre1.textContent = e.titre[0]; titre2.textContent = e.titre[1]; }
      const [mt, mc] = e.mot || ["", ENCRE];
      if (mot.textContent !== mt) mot.textContent = mt;
      mot.setAttribute("fill", mc);
      const [vit, amp] = GESTES[e.geste];
      const lean = e.vue === "det" ? D.lerp(-12, 12, D.borne((e.dx - 390) / 400, 0, 1)) * e.main : 0;
      mobile.setAttribute("transform", `translate(${lean.toFixed(1)} 0)`);
      tech({ x: TECH.x, y: TECH.y, k: TECH.k, t: t, bras: D.lerp(-15, BRAS + Math.sin(t * vit) * amp * e.agite, e.main) });
      return e;
    };
  }

  /* ---------- la pose : le dessin, les boutons pas à pas, la phrase de l'étape ---------- */
  const dessins = document.createElement("div");
  dessins.className = "scene-dessins";
  hote.appendChild(dessins);
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "scene-geste"); svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Animation pas à pas : à gauche, la main du technicien touche le raccord, lit le manomètre, balaye le détecteur, applique la solution moussante puis note le résultat ; à droite, une ligne cuivre et son raccord flare : l’huile suinte, la vapeur s’échappe, le détecteur réagit près du joint et des bulles se forment là où le fluide sort.");
  dessins.appendChild(svg);
  const defs = document.createElementNS(NS, "svg"); // dégradés métal, une fois pour la page
  defs.setAttribute("width", "0"); defs.setAttribute("height", "0"); defs.setAttribute("aria-hidden", "true");
  defs.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
  D.defs(defs); document.body.appendChild(defs);
  const rendreDessin = dessiner(svg);
  const barre = document.createElement("div");
  barre.className = "scene-barre";
  barre.innerHTML = '<button type="button" class="scene-lecture" aria-pressed="true">⏸ Pause</button>' +
    ETAPES.map((e, i) => '<button type="button" class="scene-etape" data-etape="' + i + '" aria-label="Étape ' + (i + 1) + " : " + e.nom.toLowerCase() + '" title="' + e.nom + '">' + (i + 1) + "</button>").join("") +
    '<p class="scene-legende"></p>';
  hote.appendChild(barre);
  const legende = barre.querySelector(".scene-legende");
  const s = { u: 0, t: 0, joue: true, arret: null, etape: -1 }; // u : secondes dans le film (0 → TOTAL, puis il recommence)
  const etapeDe = u => { let k = 0; while (k < ETAPES.length - 1 && u >= DEBUT[k + 1]) k++; return k; };
  function boutons() {
    const b = barre.querySelector(".scene-lecture");
    b.textContent = s.joue ? "⏸ Pause" : "▶ Lecture"; b.setAttribute("aria-pressed", String(s.joue));
    barre.querySelectorAll(".scene-etape").forEach((x, i) => { if (i === s.etape) x.setAttribute("aria-current", "step"); else x.removeAttribute("aria-current"); });
  }
  function rendre() {
    const k = etapeDe(s.u);
    rendreDessin(k, s.u - DEBUT[k], s.t);
    if (k !== s.etape) { s.etape = k; legende.innerHTML = "<strong>" + ETAPES[k].nom + "</strong> — " + ETAPES[k].dire; boutons(); }
  }
  function aller(k, seule) { s.u = DEBUT[k]; s.arret = seule ? DEBUT[k] + ETAPES[k].duree - 0.01 : null; s.joue = true; boutons(); rendre(); }
  barre.querySelector(".scene-lecture").addEventListener("click", () => { s.joue = !s.joue; s.arret = null; boutons(); });
  barre.querySelectorAll(".scene-etape").forEach(b => b.addEventListener("click", () => aller(Number(b.dataset.etape), true))); // l'étape se joue, puis s'arrête sur sa fin
  let avant = 0;
  function boucle(now) {
    const dt = avant ? Math.min(0.1, (now - avant) / 1000) : 0;
    avant = now;
    if (hote.getClientRects().length && s.joue) {
      s.t += dt; s.u += dt;
      if (s.arret !== null && s.u >= s.arret) { s.u = s.arret; s.arret = null; s.joue = false; boutons(); }
      if (s.u >= TOTAL) s.u -= TOTAL; // le film recommence
      rendre();
    }
    requestAnimationFrame(boucle);
  }
  /* app.js appelle SCENE_GESTE.dossier(id) à chaque écran : le dessin ouvre l'étape de ce dossier (une fois par dossier) */
  let dernier = null;
  window.SCENE_GESTE = { dossier: id => { if (id === dernier || !(id in DOSSIER)) return; dernier = id; aller(DOSSIER[id], false); } };
  rendre();
  requestAnimationFrame(boucle);
})();

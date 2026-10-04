/* =====================================================================
   scene-geste.js — pupitre-reglage-interactif : le thermostat, pas à pas,
   la main sur la molette de consigne et sur la vis du différentiel
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, d'après le pilote
   chaine-intervention-interactive) : le dessin vivant du module, en haut de
   chaque écran. À gauche, le geste en gros plan : le technicien (le bonhomme
   de HoCourant, repris de legislation/scenes/fluidique.js) règle la façade
   d'un thermostat de chambre froide, la molette de consigne puis la vis du
   différentiel. À droite, ce que le réglage change : la température de la
   chambre, enregistrée en continu entre l'ARRÊT du froid (la consigne) et la
   RELANCE (consigne + différentiel), l'état du contact (fermé : le froid
   tourne, ouvert : il est arrêté), le compresseur, et le thermomètre à part
   qui prouve le point d'action.
   Six étapes : la consigne, le différentiel, le cycle, le différentiel trop
   serré (courts-cycles), la preuve à l'instrument, puis « en pression » : la
   même logique avec un pressostat et un manomètre (étape 6, voir plus bas).
   Chaque écran ouvre l'étape de son dossier ; les deux écrans qui parlent de
   pression (le limiteur basse pression, le côté condenseur) ouvrent l'étape 6
   et y restent, sans thermostat (SCENE_GESTE.dossier, appelé par app.js).
   LA COURBE N'EST PAS UN DESSIN À LA MAIN : elle est calculée (table ci-dessous)
   à partir du réglage, comme une vraie chambre : le froid tourne et la
   température descend jusqu'à l'arrêt ; le contact s'ouvre, elle remonte
   jusqu'à la relance ; le contact se ferme. Le contact, le compresseur, le
   thermomètre et la courbe lisent donc la MÊME simulation. Valeurs d'exercice
   (celles du simulateur de l'écran Régler 1) : la notice et l'installation
   font foi.
   SYMBOLES, jamais redessinés : la façade du thermostat (molette, vis, bulbe)
   est la copie sans retouche de symboles/termostato-bulbo2.svg (collection
   QElectroTech de Franck, voir SOURCES.md) ; le compresseur, le ventilateur et
   les pressostats BP et HP sont ceux de la bibliothèque curée
   (../symboles/compresseur_general.svg, ventilateur.svg, pressostat_bp.svg,
   pressostat_hp.svg). Le manomètre de l'étape 6 est la copie de manometre() de
   surchauffe-sous-refroidissement-interactif/scene-mesure.js (voir plus bas).
   Le thermomètre est
   l'instrument électronique du modèle validé mano-thermo-distincts.svg
   (boîtier, afficheur, sonde) : seul l'afficheur est vivant.
   RÉEMPLOI, en lecture : jouerezo/moteur/voyage-dessin.js (pastilles,
   interpolation, filigrane).
   RÈGLES TENUES : texte jamais sur un tracé ; textes du dessin ≥ 22 unités
   (≥ 19 px à 956 px de large) ; filigrane R9 derrière le dessin ; une valeur
   n'est affichée que sur l'écran du thermomètre ; le mouvement suit le temps
   de la page, sans autre condition (Pause le fige).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, hote = document.getElementById("scene-lecon");
  if (!hote) return;
  if (!D) { hote.hidden = true; return; } // moteur du Voyage absent : pas de cadre vide
  const NS = "http://www.w3.org/2000/svg";
  const C = { navy: "#1b3a63", bleu: "#3d7fca", rouge: "#c0392b", jaune: "#e2a72b", vert: "#1e7e54", gris: "#637285", orange: "#ff6b35", orangeTexte: "#c9451a", papier: "#fffdf8" };
  const PEAU = "#f6d7bd", ENCRE = "#10233c", POLICE = "Calibri, 'Segoe UI', Arial, sans-serif";
  const ecrire = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 22, "font-family": POLICE, "font-weight": 600, fill: ENCRE }, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = "Fluide"; }); // cartouche du produit (charte R9)
  const passe = (t, a, b) => D.lisse((t - a) / (b - a)); // 0 avant a, 1 après b

  /* ---------- les étapes (l'ordre du parcours) ---------- */
  const ETAPES = [
    { nom: "Consigne", duree: 6, dire: "la molette fixe où le froid s’arrête." },
    { nom: "Différentiel", duree: 6, dire: "la vis fixe l’écart entre l’arrêt et la relance." },
    { nom: "Le cycle", duree: 7, dire: "arrêt à la consigne, relance au différentiel." },
    { nom: "Trop serré", duree: 7, dire: "courts-cycles : la machine bat, on rouvre l’écart." },
    { nom: "La preuve", duree: 7, dire: "un thermomètre à part lit le vrai point d’action." },
    { nom: "En pression", duree: 8, dire: "l’aiguille va de l’arrêt au redémarrage." } // la phrase de la variante condenseur : DIRE_HP
  ];
  const DIRE_HP = "le ventilateur démarre en haut, s’arrête en bas.";
  const DOSSIER = { observer: 0, regler: 3, controler: 4 };
  const PRESSION = { "simulateur-limiteur": "bp", "limiteur-ou-securite": "bp", "cote-condenseur": "hp" }; // les écrans qui parlent de pression : l'étape 6 s'y ouvre, dans sa variante
  const DEBUT = ETAPES.map((e, i) => ETAPES.slice(0, i).reduce((a, x) => a + x.duree, 0)), TOTAL = ETAPES.reduce((a, x) => a + x.duree, 0);

  /* ---------- le réglage, et la chambre qui répond (temps du film u, en secondes) ----------
     Les deux nombres du pupitre changent PENDANT le geste de la main (mêmes fenêtres que etat() plus bas). */
  const C_PTS = [[0, 4], [1.35, 4], [3.85, 2]];                                                         // consigne = point d'arrêt du froid (°C d'exercice) : étape 1
  const D_PTS = [[0, 3], [7.35, 3], [9.85, 4.5], [19.75, 4.5], [20.35, 0.9], [23.95, 0.9], [24.85, 3]]; // différentiel (K d'exercice) : étapes 2 et 4
  const consigne = u => D.courbe(C_PTS, u), diff = u => D.courbe(D_PTS, u);
  const FENETRE = 8.5, PAS = 0.02, V_BAISSE = 2.2, V_REMONTE = 1.5, MAINTIEN = 0.9; // fenêtre de la courbe (s), pas de calcul (s), °C par seconde, durée du relevé tenu (s)
  function simuler(bas, haut, vBaisse, vMonte, depart, u0, u1) { // une grandeur qui baisse jusqu'au bas tant que le contact est fermé, puis remonte jusqu'au haut ; calculée une fois pour tout le film
    const n = Math.round((u1 - u0) / PAS) + 2, T = new Float32Array(n), K = new Uint8Array(n), ev = [];
    let t = depart, marche = 1; // part du haut de la bande, le contact est fermé
    for (let i = 0; i < n; i++) {
      const u = u0 + i * PAS;
      if (marche && t <= bas(u)) { marche = 0; ev.push({ u: u, v: t }); } else if (!marche && t >= haut(u)) { marche = 1; ev.push({ u: u, v: t }); } // le contact bascule
      T[i] = t; K[i] = marche; t += (marche ? -vBaisse : vMonte) * PAS;
    }
    const idx = u => (u - u0) / PAS;
    return { ev: ev,
      temp: u => { const x = idx(u), i = Math.max(0, Math.min(n - 2, Math.floor(x))); return D.lerp(T[i], T[i + 1], x - i); },
      marche: u => K[Math.max(0, Math.min(n - 1, Math.round(idx(u))))] };
  }
  const SIM = simuler(consigne, u => consigne(u) + diff(u), V_BAISSE, V_REMONTE, 7, -FENETRE, DEBUT[5]); // la chambre (étapes 1 à 5), et les FENETRE secondes d'avant, déjà tracées au départ
  /* l'étape 6 : la pression. Même mécanique ; la main (fenêtre 1,35 s → 3,65 s de l'étape) baisse le repère d'arrêt. BP : valeurs du simulateur Régler 3 (arrêt 0,6 bar, redémarrage 1,4 bar, écart 0,8) ;
     condenseur : l'écran ne donne aucun chiffre, le cadran n'en porte aucun (seuls des traits). Au condenseur le contact se ferme EN HAUT : le ventilateur démarre quand la pression monte, s'arrête quand elle redescend. */
  const E6 = DEBUT[5], ECART = { bp: 0.8, hp: 3 };
  const REGLAGE = { bp: [[E6, 1.0], [E6 + 1.35, 1.0], [E6 + 3.65, 0.6]], hp: [[E6, 14], [E6 + 1.35, 14], [E6 + 3.65, 11]] }; // BP : repère d'arrêt (bar) ; condenseur : repère de marche (traits du cadran)
  const PRESS = {};
  ["bp", "hp"].forEach(v => {
    const r = u => D.courbe(REGLAGE[v], u), bas = v === "bp" ? r : u => r(u) - ECART.hp, haut = v === "bp" ? u => r(u) + ECART.bp : r;
    PRESS[v] = { bas: bas, haut: haut, sim: v === "bp" ? simuler(bas, haut, 0.5, 0.35, 1.8, E6 - 6, TOTAL) : simuler(bas, haut, 1.9, 1.3, 14, E6 - 6, TOTAL) };
  });

  /* l'état de la main à l'étape k, au temps local τ (secondes) : geste = [cible, sens (+1 : vers le plus, −1 : vers le moins), début, fin] */
  const TITRES = { dial: "molette de consigne", vis: "vis du différentiel", therm: "thermomètre", contact: "le contact", presso: { bp: "pressostat BP", hp: "pressostat de contrôle" } };
  function etat(k, tau, v) { // titre : la pièce en vue ; mot : ce que la main vient d'y changer (deuxième ligne du gros plan) ; v : la variante de l'étape 6 (bp | hp)
    const e = { geste: null, cible: "dial", titre: TITRES.dial, mot: "", motCouleur: C.gris };
    if (k === 0) { e.geste = ["dial", -1, 1.0, 4.2]; e.mot = tau < 1.35 ? "" : tau < 3.85 ? "plus froid" : "arrêt plus bas"; }
    if (k === 1) { e.geste = ["vis", 1, 1.0, 4.2]; e.cible = "vis"; e.titre = TITRES.vis; e.mot = tau < 1.35 ? "" : tau < 3.85 ? "plus large" : "relance plus haute"; }
    if (k === 2) { e.cible = "vis"; e.titre = TITRES.contact; e.mot = "@contact"; }
    if (k === 3) {
      e.geste = tau < 3 ? ["vis", -1, 0.4, 1.7] : ["vis", 1, 4.6, 6.2]; e.cible = "vis"; e.titre = TITRES.vis;
      if (tau < 0.75) e.mot = ""; else if (tau < 1.35) e.mot = "plus serré";
      else if (tau < 4.95) { e.mot = "courts-cycles"; e.motCouleur = C.rouge; } else if (tau < 5.85) e.mot = "plus large"; else { e.mot = "le cycle respire"; e.motCouleur = C.vert; }
    }
    if (k === 4) { e.cible = "therm"; e.titre = TITRES.therm; e.mot = "on lit l’écran"; }
    if (k === 5) { e.geste = ["presso", -1, 1.0, 4.0]; e.cible = "presso"; e.titre = TITRES.presso[v]; e.mot = tau < 1.35 ? "" : tau < 3.65 ? "plus bas" : v === "hp" ? "marche plus bas" : "arrêt plus bas"; }
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
  const TECH = { x: 66, y: 106, k: 2.25 }, MAIN = [127.6, 138.4]; // la main sur la molette : le centre du cadran du symbole est posé sur MAIN
  const REPOS = 10;                                               // bras au repos : la main pend sur le côté, loin de la façade
  const EPAULE = [TECH.x + 2 * TECH.k, TECH.y + 24 * TECH.k], BRAS_PENDANT = Math.atan2(25, 10.5) * 180 / Math.PI; // l'épaule, et la direction du bras au repos (sa main est à 61 px de l'épaule)
  const brasVers = (x, y) => Math.atan2(y - EPAULE[1], x - EPAULE[0]) * 180 / Math.PI - BRAS_PENDANT; // la rotation du bras qui met la main dans cette direction
  const S = 4.5;                                                  // échelle de la façade du thermostat (symbole termostato-bulbo2 : molette en (0,-1), vis du différentiel en (-4.5,13))
  const SP = 6;                                                   // échelle des symboles de pressostat (étape 6) : le bord gauche de leur boîte, là où la main prend la vis, est posé sous MAIN
  const CIBLES = { dial: [MAIN[0], MAIN[1]], vis: [MAIN[0] - 4.5 * S, MAIN[1] + 14 * S], presso: [MAIN[0], MAIN[1]] };
  const XL = 380, XR = 745, YB = 222, KY = 22;                    // la courbe : bords gauche et droit, ordonnée de 0 °C, unités par degré
  const Y = T => YB - KY * T;

  function image(parent, href, x, y, l, h, multiplier) {
    const i = D.el("image", { href: href, x: x, y: y, width: l, height: h, preserveAspectRatio: "xMidYMid meet" }, parent);
    if (multiplier) i.setAttribute("style", "mix-blend-mode:multiply"); // le fond blanc du symbole s'efface sur le papier
    return i;
  }
  function fleche(parent, horaire, cx, cy, r) { // le sens du geste autour de la pièce : à droite on va vers le plus, à gauche vers le moins
    const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
    const [a0, a1] = horaire ? [200, 340] : [340, 200], q0 = p(a0), q1 = p(a1), dir = (a1 + (horaire ? 90 : -90)) * Math.PI / 180;
    const g = D.el("g", { opacity: 0 }, parent), ux = Math.cos(dir), uy = Math.sin(dir);
    D.el("path", { d: `M${q0[0].toFixed(1)} ${q0[1].toFixed(1)} A${r} ${r} 0 0 ${horaire ? 1 : 0} ${q1[0].toFixed(1)} ${q1[1].toFixed(1)}`, fill: "none", stroke: C.orange, "stroke-width": 4.5, "stroke-linecap": "round" }, g);
    const pointe = [[q1[0] + ux * 9, q1[1] + uy * 9], [q1[0] - uy * 7 - ux * 3, q1[1] + ux * 7 - uy * 3], [q1[0] + uy * 7 - ux * 3, q1[1] - ux * 7 - uy * 3]];
    D.el("polygon", { points: pointe.map(q => q.map(v => v.toFixed(1)).join(",")).join(" "), fill: C.orange }, g);
    return g;
  }
  function thermometre(parent, avecSonde) { // l'instrument à part : boîtier, afficheur, sonde de contact (modèle validé mano-thermo-distincts.svg, 13/08/2026)
    const g = D.el("g", {}, parent);
    if (avecSonde) {
      D.el("path", { d: "M65 84 C65 112 30 106 18 128", fill: "none", stroke: "#0f2440", "stroke-width": 5, "stroke-linecap": "round" }, g);
      D.el("rect", { x: 6, y: 128, width: 24, height: 30, rx: 5, fill: C.navy }, g);
      D.el("circle", { cx: 18, cy: 139, r: 4, fill: "#84b7ec" }, g);
    }
    D.el("rect", { x: 0, y: 0, width: 130, height: 84, rx: 12, fill: C.navy }, g);
    const ecran = D.el("g", {}, g); // l'afficheur : son fond, et sa lecture (un chiffre n'existe que sur l'écran)
    D.el("rect", { x: 10, y: 10, width: 110, height: 46, rx: 6, fill: "#eaf2e6", stroke: "#0f2440", "stroke-width": 3 }, ecran);
    const lecture = ecrire(ecran, 65, 43, "", { "font-size": 28, "font-weight": 700, "text-anchor": "middle" });
    [[30, "#84b7ec"], [65, "#d17d43"], [100, C.papier]].forEach(([x, f]) => D.el("circle", { cx: x, cy: 70, r: 6, fill: f }, g));
    let avant = "";
    return { g: g, maj: (texte, tient) => { if (texte !== avant) { lecture.textContent = texte; avant = texte; } lecture.setAttribute("fill", tient ? C.orangeTexte : ENCRE); } };
  }

  /* le manomètre : copie de manometre() de surchauffe-sous-refroidissement-interactif/scene-mesure.js (générateur validé, progression-1re-mfer/outils/generer-interro-03-manometres.py :
     bague BP bleue / HP rouge, traits de pression, chiffres, chiffre ôté sous l'aiguille, aiguille orange). Adaptations : la couronne du R-134a est ôtée (le pupitre ne cite aucun fluide, et ses
     températures ne sont pas des chiffres du pupitre) ; l'échelle est celle du simulateur (BP : 0 à 4 bar ; cadran du condenseur : des traits, aucun chiffre) ; l'aiguille suit la pression exacte
     (le film est une fonction du temps : pas de lissage image par image) ; deux repères, l'arrêt (bleu) et le redémarrage ou la marche (rouge), glissent avec la main ; le trait lu s'allume
     à chaque bascule du contact. */
  const CADRANS = { bp: { vmin: 0, vmax: 4, majeurs: [0, 1, 2, 3, 4], pas: [1, 0.2], bague: "#1f6fa8", nom: "BP" },
    hp: { vmin: 0, vmax: 20, majeurs: [], pas: [5, 1], bague: "#b3261e", nom: "HP" } };
  function manometre(parent, cx, cy, cfg) {
    const R = 104, INK = "#22303f", g = D.el("g", {}, parent);
    const ang = p => -135 + 270 * (p - cfg.vmin) / (cfg.vmax - cfg.vmin);
    const pt = (r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
    D.el("circle", { cx: cx, cy: cy, r: R, fill: cfg.bague }, g);
    D.el("circle", { cx: cx, cy: cy, r: R - 7, fill: "#fdfdfb", stroke: INK, "stroke-width": 1.5 }, g);
    for (let p = cfg.vmin; p <= cfg.vmax + 1e-6; p += cfg.pas[1]) { // traits de pression (bord du cadran)
      const majeur = Math.abs(p / cfg.pas[0] - Math.round(p / cfg.pas[0])) < 1e-6, [x1, y1] = pt(R - 9, ang(p)), [x2, y2] = pt(R - 9 - (majeur ? 8 : 4), ang(p));
      D.el("line", { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2.toFixed(1), stroke: INK, "stroke-width": majeur ? 2.4 : 1.2 }, g);
    }
    const demi = (a, l) => Math.abs(Math.sin(a * Math.PI / 180)) * l / 2 + Math.abs(Math.cos(a * Math.PI / 180)) * 11; // demi-étendue radiale d'une boîte de chiffre
    const chiffres = cfg.majeurs.map(p => { const l = 11 * String(p).length, [x, y] = pt(R - 9 - 8 - 2 - demi(ang(p), l), ang(p)); return { x: x, y: y, l: l, e: D.texte(g, x, y + 7, String(p), { "font-size": 22, "font-weight": 700, "font-family": POLICE, fill: INK, "text-anchor": "middle" }) }; });
    D.texte(g, cx, cy + 40, cfg.nom, { "font-size": 24, "font-weight": 700, "font-family": "Trebuchet MS, Arial, sans-serif", fill: cfg.bague, "text-anchor": "middle" });
    D.texte(g, cx, cy + 66, "bar", { "font-size": 22, "font-weight": 700, "font-family": POLICE, fill: INK, "text-anchor": "middle" });
    const repere = coul => { // un repère : petit triangle dont la pointe vise le trait de pression
      const t = D.el("polygon", { fill: coul }, g);
      return a => { const [x1, y1] = pt(58, a), [x2, y2] = pt(44, a), ux = Math.cos(a * Math.PI / 180), uy = Math.sin(a * Math.PI / 180); t.setAttribute("points", `${x1.toFixed(1)},${y1.toFixed(1)} ${(x2 + 7 * ux).toFixed(1)},${(y2 + 7 * uy).toFixed(1)} ${(x2 - 7 * ux).toFixed(1)},${(y2 - 7 * uy).toFixed(1)}`); };
    };
    const reperes = [repere(C.bleu), repere(C.rouge)];
    const aiguille = D.el("path", { fill: C.orangeTexte }, g);
    D.el("circle", { cx: cx, cy: cy, r: 9, fill: "#333" }, g); D.el("circle", { cx: cx, cy: cy, r: 3, fill: "#bbb" }, g);
    const lu = D.el("circle", { r: 9, fill: "none", stroke: C.orange, "stroke-width": 3.5, opacity: 0 }, g); // le trait lu : il s'allume quand le contact bascule
    const sous = (c, a) => { // l'aiguille (du talon à la pointe, 8 de large) touche-t-elle la boîte du chiffre ?
      const ux = Math.sin(a * Math.PI / 180), uy = -Math.cos(a * Math.PI / 180), dx = c.x - cx, dy = c.y - cy;
      const le = dx * ux + dy * uy, tr = Math.abs(-dx * uy + dy * ux), bu = Math.abs(ux) * c.l / 2 + Math.abs(uy) * 8.5, bn = Math.abs(uy) * c.l / 2 + Math.abs(ux) * 8.5;
      return tr < bn + 1.5 + 4 * Math.max(0, 1 - Math.max(0, le) / (R - 14)) && le > -18 - bu && le < R - 14 + bu; // demi-largeur de l'aiguille : 4 au moyeu, 0 à la pointe
    };
    let aVue = null;
    return function (pression, bas, haut, lecture) { // pression, repère d'arrêt, repère de relance : dans l'unité de l'échelle ; lecture 0..1 : le trait lu s'allume
      const a = ang(Math.max(cfg.vmin, Math.min(cfg.vmax, pression))), [xt, yt] = pt(R - 14, a), [xg, yg] = pt(4, a - 90), [xd, yd] = pt(4, a + 90), [xq, yq] = pt(18, a + 180);
      aiguille.setAttribute("d", `M${xt.toFixed(1)} ${yt.toFixed(1)} L${xg.toFixed(1)} ${yg.toFixed(1)} L${xq.toFixed(1)} ${yq.toFixed(1)} L${xd.toFixed(1)} ${yd.toFixed(1)} Z`);
      if (aVue === null || Math.abs(a - aVue) > 0.3) { aVue = a; chiffres.forEach(c => c.e.setAttribute("opacity", sous(c, a) ? 0 : 1)); } // règle de F. Henninot : on ôte le chiffre sous l'aiguille
      reperes[0](ang(bas)); reperes[1](ang(haut));
      lu.setAttribute("cx", xt.toFixed(1)); lu.setAttribute("cy", yt.toFixed(1)); lu.setAttribute("opacity", lecture.toFixed(2));
    };
  }
  function montagePression(g) { // le montage de l'étape 6 : le manomètre, la machine, la clé des deux repères ; une scène par variante (bp : limiteur basse pression, hp : côté condenseur)
    const m = D.el("g", { display: "none" }, g);
    const contact = { ferme: D.pastille(m, 1052, 34, "contact fermé", C.bleu, 22, "end"), ouvert: D.pastille(m, 1052, 34, "contact ouvert", C.gris, 22, "end") };
    const vues = {};
    [["bp", "pression d’aspiration", "redémarrage", "compresseur", "../symboles/compresseur_general.svg"], ["hp", "pression de condensation", "marche", "ventilateur", "../symboles/ventilateur.svg"]].forEach(([v, titre, haut, machine, symbole]) => {
      const gv = D.el("g", { display: "none" }, m);
      ecrire(gv, 560, 24, titre, { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
      [[100, haut, C.rouge], [150, "arrêt", C.bleu]].forEach(([y, nom, coul]) => { // la clé des deux repères : même couleur, même forme que sur le cadran
        D.el("polygon", { points: `290,${y - 14} 290,${y + 2} 304,${y - 6}`, fill: coul }, gv);
        ecrire(gv, 312, y, nom, { "font-weight": 700, fill: coul });
      });
      const mano = manometre(gv, 560, 140, CADRANS[v]);
      const lueur = D.el("circle", { cx: 850, cy: 168, r: 40, fill: C.bleu, opacity: 0 }, gv);
      const bloc = D.el("g", {}, gv);
      image(D.el("g", { transform: "translate(850 168) scale(2.1)" }, bloc), symbole, -24, -20, 50, 40);
      ecrire(gv, 850, 250, machine, { "text-anchor": "middle" });
      vues[v] = { g: gv, mano: mano, lueur: lueur, bloc: bloc, marche: D.pastille(gv, 1052, 76, machine + " en marche", C.vert, 22, "end"), arret: D.pastille(gv, 1052, 76, machine + " arrêté", C.gris, 22, "end") };
    });
    return { g: m, maj: function (v, u, t) {
      Object.keys(vues).forEach(c => vues[c].g.setAttribute("display", c === v ? "inline" : "none"));
      const P = PRESS[v], x = vues[v], pression = P.sim.temp(u), marche = P.sim.marche(u) === 1;
      let dernier = null; for (const ev of P.sim.ev) { if (ev.u <= u) dernier = ev; else break; }
      x.mano(pression, P.bas(u), P.haut(u), dernier ? D.borne(1 - (u - dernier.u) / 0.7, 0, 1) : 0);
      x.bloc.setAttribute("transform", marche ? `translate(${(Math.sin(t * 61) * 0.9).toFixed(2)} ${(Math.cos(t * 47) * 0.6).toFixed(2)})` : "");
      x.lueur.setAttribute("opacity", marche ? 0.2 : 0); x.marche.setAttribute("opacity", marche ? 1 : 0); x.arret.setAttribute("opacity", marche ? 0 : 1);
      contact.ferme.setAttribute("opacity", marche ? 1 : 0); contact.ouvert.setAttribute("opacity", marche ? 0 : 1);
    } };
  }

  function dessiner(svg) {
    svg.setAttribute("viewBox", "0 0 1060 276");
    const g = D.el("g", {}, svg);
    marquer(D.filigrane(g, [[132, 236], [560, 160]], 220));
    /* ===== le montage : la chambre, le contact, le compresseur, le thermomètre ===== */
    const m = D.el("g", {}, g);
    const bande = D.el("rect", { x: XL, width: XR - XL, fill: C.bleu, opacity: 0.1 }, m);                     // la zone entre l'arrêt et la relance : le différentiel
    const lueurR = D.el("rect", { x: XL, width: XR - XL, height: 18, rx: 6, fill: C.orange, opacity: 0 }, m);   // la ligne que la main déplace s'allume
    const lueurA = D.el("rect", { x: XL, width: XR - XL, height: 18, rx: 6, fill: C.orange, opacity: 0 }, m);
    D.el("path", { d: `M${XL} 232 V40 M${XL} 232 H748`, fill: "none", stroke: C.navy, "stroke-width": 3, "stroke-linecap": "round" }, m);
    D.el("polygon", { points: `${XL},32 ${XL - 8},48 ${XL + 8},48`, fill: C.navy }, m);
    D.el("polygon", { points: "758,232 742,224 742,240", fill: C.navy }, m);
    const ligneR = D.el("line", { x1: XL, x2: XR, stroke: C.rouge, "stroke-width": 3.5, "stroke-dasharray": "10 6" }, m);
    const ligneA = D.el("line", { x1: XL, x2: XR, stroke: C.bleu, "stroke-width": 3.5, "stroke-dasharray": "10 6" }, m);
    const traceM = D.el("path", { fill: "none", stroke: C.bleu, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, m);                              // le froid tourne
    const traceA = D.el("path", { fill: "none", stroke: C.gris, "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "9 7" }, m); // le froid est arrêté
    const curseur = D.el("circle", { cx: XR, r: 8, stroke: C.navy, "stroke-width": 2.5 }, m);
    // légendes (jamais sur un tracé : les noms des lignes sont à gauche de l'axe, au bout de leur ligne)
    ecrire(m, 562, 24, "température de la chambre", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    ecrire(m, XR, 262, "temps", { "text-anchor": "end", fill: C.gris });
    const nomR = ecrire(m, XL - 10, 0, "relance", { "font-weight": 700, "text-anchor": "end", fill: C.rouge });
    const nomA = ecrire(m, XL - 10, 0, "arrêt", { "font-weight": 700, "text-anchor": "end", fill: C.bleu });
    // le compresseur (symbole de la bibliothèque) : il tourne quand le contact est fermé
    const lueurC = D.el("circle", { cx: 830, cy: 168, r: 40, fill: C.bleu, opacity: 0 }, m);
    const compresseur = D.el("g", {}, m), cx = D.el("g", { transform: "translate(830 168) scale(2.1)" }, compresseur);
    image(cx, "../symboles/compresseur_general.svg", -24, -20, 50, 40);
    ecrire(m, 830, 250, "compresseur", { "text-anchor": "middle" });
    // le thermomètre à part, sonde au bout du cordon
    const thM = thermometre(D.el("g", { transform: "translate(932 100) scale(0.8)" }, m), true);
    ecrire(m, 984, 250, "thermomètre", { "text-anchor": "middle" });
    const anneauT = D.el("rect", { x: 924, y: 92, width: 120, height: 132, rx: 12, fill: "none", stroke: C.orange, "stroke-width": 4, opacity: 0 }, m);
    const pastilles = { ferme: D.pastille(m, 1052, 34, "contact fermé", C.bleu, 22, "end"), ouvert: D.pastille(m, 1052, 34, "contact ouvert", C.gris, 22, "end"),
      respire: D.pastille(m, 1052, 76, "le cycle respire", C.vert, 22, "end"), serre: D.pastille(m, 1052, 76, "courts-cycles", C.rouge, 22, "end") };
    const mP = montagePression(g);
    /* ===== le gros plan du geste ===== */
    const gp = D.el("g", {}, g);
    const facade = D.el("g", {}, gp);                                  // la façade du thermostat, vue de près (le même symbole, agrandi, rogné à la boîte)
    const vue = D.el("svg", { x: MAIN[0] - 13.5 * S, y: MAIN[1] - 12.5 * S, width: 27 * S, height: 34 * S, viewBox: "-13.5 -13.5 27 34" }, facade);
    image(vue, "symboles/termostato-bulbo2.svg", -19, -20, 58, 68, true);
    const anneauF = D.el("rect", { x: MAIN[0] - 12 * S - 7, y: MAIN[1] - 11 * S - 7, width: 24 * S + 14, height: 29 * S + 14, rx: 12, fill: "none", stroke: C.orange, "stroke-width": 4, opacity: 0 }, facade); // le déclic du contact
    const zoomT = D.el("g", { transform: "translate(110 104) scale(1.15)", opacity: 0 }, gp);                    // le thermomètre, vu de près : l'écran se lit
    const thG = thermometre(zoomT, false);
    const zoomP = D.el("g", { opacity: 0 }, gp);                       // le pressostat, vu de près (étape 6) : la main sur le bord de sa boîte, là où se règle la vis
    const presso = {};
    [["bp", "pressostat_bp", -9, -12.87], ["hp", "pressostat_hp", -10, -13.16]].forEach(([v, f, hx, hy]) => {
      const gg = D.el("g", { display: "none" }, zoomP);
      image(gg, "../symboles/" + f + ".svg", MAIN[0] - hx * SP - 14 * SP, MAIN[1] - hy * SP - 23 * SP, 30 * SP, 30 * SP); // le symbole (cadre -14 -23 30 30) posé : le bord gauche de sa boîte est sous MAIN
      presso[v] = gg;
    });
    const tech = bonhomme(gp, { casquette: true, dephasage: 0.3 });
    const fl = { dial: [fleche(gp, true, CIBLES.dial[0], CIBLES.dial[1], 44), fleche(gp, false, CIBLES.dial[0], CIBLES.dial[1], 44)],
      vis: [fleche(gp, true, CIBLES.vis[0], CIBLES.vis[1], 25), fleche(gp, false, CIBLES.vis[0], CIBLES.vis[1], 25)],
      presso: [fleche(gp, true, CIBLES.presso[0], CIBLES.presso[1], 28), fleche(gp, false, CIBLES.presso[0], CIBLES.presso[1], 28)] };
    const titre1 = ecrire(gp, 131, 26, "", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    const mot = ecrire(gp, 131, 52, "", { "font-weight": 700, "text-anchor": "middle", fill: C.gris });
    let vu = "dial", brasLisse = REPOS;

    return function (k, tau, t, v) { // k : l'étape, tau : son temps (s), t : le temps de la page (s), v : la variante de l'étape 6 (bp | hp)
      const e = etat(k, tau, v), u = DEBUT[k] + tau, pression = k === 5;
      m.setAttribute("display", pression ? "none" : "inline"); mP.g.setAttribute("display", pression ? "inline" : "none");
      /* le geste (commun aux deux montages) */
      if (e.geste) vu = e.geste[0];
      const [cle, sens, g0, g1] = e.geste || [vu, 0, 0, 0];
      const enMain = e.geste ? D.fenetre(tau, g0, g1, 0.3) : 0, tourne = e.geste ? D.fenetre(tau, g0 + 0.35, g1 - 0.35, 0.15) : 0;
      ["dial", "vis", "presso"].forEach(n => [1, -1].forEach((sn, i) => fl[n][i].setAttribute("opacity", (cle === n && sens === sn ? tourne : 0).toFixed(2))));
      const [hx, hy] = CIBLES[cle];
      brasLisse = D.lerp(REPOS, brasVers(hx, hy) + Math.sin(t * 9) * 2.5 * tourne, enMain);
      tech({ x: TECH.x, y: TECH.y, k: TECH.k, t: t, bras: brasLisse });
      let marche = false, dernier = null;
      if (pression) {
        mP.maj(v, u, t); // l'étape 6 : le manomètre, le compresseur ou le ventilateur, le contact
        anneauF.setAttribute("opacity", 0);
      } else {
        const c = consigne(u), d = diff(u), T = SIM.temp(u);
        marche = SIM.marche(u) === 1;
        /* la courbe : les FENETRE dernières secondes, le présent à droite ; en bleu plein quand le froid tourne, en gris tireté quand il est arrêté */
        const N = 160, pas = FENETRE / N, vx = (XR - XL) / FENETRE;
        let dM = "", dA = "", cour = "", ec = -1, pa = "", ps = SIM.marche(u - FENETRE);
        for (let j = 0; j <= N; j++) {
          const uu = u - FENETRE + j * pas, p = (XL + j * pas * vx).toFixed(1) + " " + Y(SIM.temp(uu)).toFixed(1);
          if (j > 0) {
            if (ps !== ec) { if (cour) { if (ec) dM += cour; else dA += cour; } cour = "M" + pa + " L" + p; ec = ps; } else cour += " L" + p;
          }
          pa = p; ps = SIM.marche(uu);
        }
        if (cour) { if (ec) dM += cour; else dA += cour; }
        traceM.setAttribute("d", dM || "M0 0"); traceA.setAttribute("d", dA || "M0 0");
        curseur.setAttribute("cy", Y(T).toFixed(1)); curseur.setAttribute("fill", marche ? C.bleu : C.gris);
        /* l'arrêt (la consigne) et la relance (consigne + différentiel) */
        const yA = Y(c), yR = Y(c + d);
        ligneA.setAttribute("y1", yA.toFixed(1)); ligneA.setAttribute("y2", yA.toFixed(1)); ligneR.setAttribute("y1", yR.toFixed(1)); ligneR.setAttribute("y2", yR.toFixed(1));
        bande.setAttribute("y", yR.toFixed(1)); bande.setAttribute("height", Math.max(0, yA - yR).toFixed(1));
        nomR.setAttribute("y", (yR - 4).toFixed(1)); nomA.setAttribute("y", (yA + 22).toFixed(1));
        lueurA.setAttribute("y", (yA - 9).toFixed(1)); lueurR.setAttribute("y", (yR - 9).toFixed(1));
        lueurA.setAttribute("opacity", (cle === "dial" ? 0.4 * enMain : 0).toFixed(2)); lueurR.setAttribute("opacity", (cle === "vis" ? 0.4 * enMain : 0).toFixed(2));
        nomA.setAttribute("fill", cle === "dial" && enMain > 0.5 ? C.orangeTexte : C.bleu); nomR.setAttribute("fill", cle === "vis" && enMain > 0.5 ? C.orangeTexte : C.rouge);
        /* le contact, le compresseur, le thermomètre (il lit 4 fois par seconde ; à l'étape de la preuve, le relevé reste affiché un instant après chaque bascule : c'est le point d'action) */
        for (const ev of SIM.ev) { if (ev.u <= u) dernier = ev; else break; }
        const tient = k === 4 && !!dernier && u - dernier.u < MAINTIEN, lu = (tient ? dernier.v : SIM.temp(Math.floor(u * 4) / 4)).toFixed(1).replace(".", ",") + " °C";
        thM.maj(lu, tient); thG.maj(lu, tient);
        compresseur.setAttribute("transform", marche ? `translate(${(Math.sin(t * 61) * 0.9).toFixed(2)} ${(Math.cos(t * 47) * 0.6).toFixed(2)})` : "");
        lueurC.setAttribute("opacity", marche ? 0.2 : 0); pastilles.ferme.setAttribute("opacity", marche ? 1 : 0); pastilles.ouvert.setAttribute("opacity", marche ? 0 : 1);
        const serre = d < 2; // seuil du simulateur de l'écran Régler 1 : en dessous, la machine enchaîne les courts-cycles
        pastilles.serre.setAttribute("opacity", serre ? 1 : 0); pastilles.respire.setAttribute("opacity", serre ? 0 : 1);
        anneauT.setAttribute("opacity", e.cible === "therm" ? 1 : 0);
        anneauF.setAttribute("opacity", (enMain > 0.05 ? 0 : 0.9 * D.borne(1 - (dernier ? u - dernier.u : 9) / 0.4, 0, 1)).toFixed(2)); // la façade « claque » à chaque bascule du contact
      }
      /* le gros plan : la pièce en vue, les mots */
      facade.setAttribute("opacity", e.cible === "dial" || e.cible === "vis" ? 1 : 0);
      zoomT.setAttribute("opacity", e.cible === "therm" ? 1 : 0);
      zoomP.setAttribute("opacity", e.cible === "presso" ? 1 : 0); presso.bp.setAttribute("display", v === "hp" ? "none" : "inline"); presso.hp.setAttribute("display", v === "hp" ? "inline" : "none");
      if (titre1.textContent !== e.titre) titre1.textContent = e.titre;
      const dit = e.mot === "@contact" ? (marche ? "fermé" : "ouvert") : e.mot, couleur = e.mot === "@contact" ? (marche ? C.bleu : C.gris) : e.motCouleur;
      if (mot.textContent !== dit) mot.textContent = dit;
      mot.setAttribute("fill", couleur);
      return e;
    };
  }

  /* ---------- la pose : le dessin, les boutons pas à pas, la phrase de l'étape ---------- */
  const dessins = document.createElement("div");
  dessins.className = "scene-dessins";
  hote.appendChild(dessins);
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "scene-geste"); svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Animation pas à pas : à gauche, la main du technicien règle la molette de consigne puis la vis du différentiel d'un thermostat de chambre froide ; à droite, la courbe de la température entre l'arrêt et la relance, l'état du contact, le compresseur et le thermomètre à part qui lit le vrai point d'action. L'étape 6 montre la même logique en pression : la main sur la vis d'un pressostat, et un manomètre dont l'aiguille va de l'arrêt au redémarrage. Valeurs d'exercice : la notice fait foi.");
  dessins.appendChild(svg);
  const rendreDessin = dessiner(svg);
  const barre = document.createElement("div");
  barre.className = "scene-barre";
  barre.innerHTML = '<button type="button" class="scene-lecture" aria-pressed="true">⏸ Pause</button>' +
    ETAPES.map((e, i) => '<button type="button" class="scene-etape" data-etape="' + i + '" aria-label="Étape ' + (i + 1) + " : " + e.nom.toLowerCase() + '" title="' + e.nom + '">' + (i + 1) + "</button>").join("") +
    '<p class="scene-legende"></p>';
  hote.appendChild(barre);
  const legende = barre.querySelector(".scene-legende");
  const s = { u: 0, t: 0, joue: true, arret: null, etape: -1, seg: [0, DEBUT[5]], variante: "bp" }; // u : secondes dans le film ; seg : le film qui tourne (les étapes 1 à 5, ou l'étape 6 seule), puis il recommence ; variante : bp | hp
  const dire = k => k === 5 && s.variante === "hp" ? DIRE_HP : ETAPES[k].dire;
  const etapeDe = u => { let k = 0; while (k < ETAPES.length - 1 && u >= DEBUT[k + 1]) k++; return k; };
  function boutons() {
    const b = barre.querySelector(".scene-lecture");
    b.textContent = s.joue ? "⏸ Pause" : "▶ Lecture"; b.setAttribute("aria-pressed", String(s.joue));
    barre.querySelectorAll(".scene-etape").forEach((x, i) => { if (i === s.etape) x.setAttribute("aria-current", "step"); else x.removeAttribute("aria-current"); });
  }
  function rendre() {
    const k = etapeDe(s.u);
    rendreDessin(k, s.u - DEBUT[k], s.t, s.variante);
    if (k !== s.etape) { s.etape = k; legende.innerHTML = "<strong>" + ETAPES[k].nom + "</strong> — " + dire(k); boutons(); }
  }
  function aller(k, seule) { s.u = DEBUT[k]; s.seg = k >= 5 ? [DEBUT[5], TOTAL] : [0, DEBUT[5]]; s.arret = seule ? DEBUT[k] + ETAPES[k].duree - 0.01 : null; s.joue = true; s.etape = -1; boutons(); rendre(); }
  barre.querySelector(".scene-lecture").addEventListener("click", () => { s.joue = !s.joue; s.arret = null; boutons(); });
  barre.querySelectorAll(".scene-etape").forEach(b => b.addEventListener("click", () => aller(Number(b.dataset.etape), true))); // l'étape se joue, puis s'arrête sur sa fin
  let avant = 0;
  function boucle(now) {
    const dt = avant ? Math.min(0.1, (now - avant) / 1000) : 0;
    avant = now;
    if (hote.getClientRects().length && s.joue) {
      s.t += dt; s.u += dt;
      if (s.arret !== null && s.u >= s.arret) { s.u = s.arret; s.arret = null; s.joue = false; boutons(); }
      if (s.u >= s.seg[1]) s.u -= s.seg[1] - s.seg[0]; // le film recommence (celui du thermostat, ou celui de la pression)
      rendre();
    }
    requestAnimationFrame(boucle);
  }
  /* app.js appelle SCENE_GESTE.dossier(dossier, écran) à chaque écran : un écran qui parle de pression ouvre l'étape 6, dans sa variante, et y reste (le film de la pression tourne seul, sans
     thermostat) ; les autres ouvrent l'étape de leur dossier (une fois par dossier). Même clé qu'à l'écran précédent : le film continue. */
  let ouvert = null;
  window.SCENE_GESTE = { dossier: (id, ecran) => {
    const v = PRESSION[ecran], cle = v ? "pression:" + v : id;
    if (cle === ouvert || !(id in DOSSIER)) return;
    ouvert = cle; s.variante = v || "bp"; aller(v ? 5 : DOSSIER[id], false);
  } };
  rendre();
  requestAnimationFrame(boucle);
})();

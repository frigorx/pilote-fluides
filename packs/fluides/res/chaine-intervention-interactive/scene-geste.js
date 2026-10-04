/* =====================================================================
   scene-geste.js — chaine-intervention-interactive : l'ordre des vannes,
   pas à pas, la main du technicien sur la vanne
   ---------------------------------------------------------------------
   RÔLE (chantier « Animer les réseaux », 04/10/2026, pilote d'un GESTE) :
   le dessin vivant du module, en haut de chaque écran. À gauche, le geste
   en gros plan : le technicien (le bonhomme de HoCourant, repris de
   legislation/scenes/fluidique.js) a la main sur la vanne qui agit et la
   tourne. À droite, le montage, où l'on voit la conséquence : vanne
   ouverte = la vapeur passe (petites molécules qui filent), vanne fermée
   = rien ne passe ; sous vide, l'eau restée dans la ligne (une nappe)
   bout et part avec l'air.
   Six étapes, l'ordre du parcours : fermer, raccorder, tirer au vide,
   isoler, arrêter et observer, déconnecter. Chaque écran ouvre l'étape de
   son dossier (SCENE_GESTE.dossier, appelé par app.js).
   SYMBOLES, jamais redessinés : le manifold et les vannes de service sont
   ceux de la bibliothèque curée (../symboles/manometres.svg,
   vanne_isolement.svg) ; la pompe à vide et le vacuomètre viennent de la
   collection QElectroTech de Franck (symboles/bomba-vacio.svg,
   manometro.svg, copies sans retouche). Seul ajout sur un symbole : la
   vanne fermée est noircie (convention des schémas), sur sa propre forme.
   RÉEMPLOI, en lecture : jouerezo/moteur/voyage-dessin.js (tubes cuivre,
   nappe, bulles, pastilles, filigrane).
   RÈGLES TENUES : texte jamais sur un tracé ; textes du dessin ≥ 22 unités
   (≥ 19 px à 956 px de large) ; filigrane R9 derrière le dessin ; le
   mouvement suit le temps de la page, sans autre condition (Pause le fige).
   Aucune valeur de vide, de durée ni de pression (la notice fait foi).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, hote = document.getElementById("scene-lecon");
  if (!hote) return;
  if (!D) { hote.hidden = true; return; } // moteur du Voyage absent : pas de cadre vide
  const NS = "http://www.w3.org/2000/svg";
  const C = { navy: "#1b3a63", bleu: "#3d7fca", rouge: "#c0392b", jaune: "#e2a72b", vert: "#1e7e54", gris: "#637285", orange: "#ff6b35", papier: "#fffdf8" };
  const PEAU = "#f6d7bd", ENCRE = "#10233c", POLICE = "Calibri, 'Segoe UI', Arial, sans-serif", AIR = "#7d95ae";
  const ecrire = (p, x, y, s, at) => D.texte(p, x, y, s, Object.assign({ "font-size": 22, "font-family": POLICE, "font-weight": 600, fill: ENCRE }, at || {}));
  const marquer = g => g.querySelectorAll("text").forEach(t => { if (t.textContent === "Studio") t.textContent = "Fluide"; }); // cartouche du produit (charte R9)
  const passe = (t, a, b) => D.lisse((t - a) / (b - a)); // 0 avant a, 1 après b

  /* ---------- les étapes (l'ordre du parcours) ---------- */
  const ETAPES = [
    { nom: "Fermer", duree: 5, dire: "avant de raccorder, les vannes du manifold sont fermées." },
    { nom: "Raccorder", duree: 5, dire: "bleu sur la BP, rouge sur la HP, jaune vers la pompe." },
    { nom: "Tirer au vide", duree: 7, dire: "on ouvre, puis la pompe aspire l’air et l’humidité." },
    { nom: "Isoler", duree: 5, dire: "fermer côté circuit avant d’arrêter la pompe." },
    { nom: "Arrêter, observer", duree: 4, dire: "pompe arrêtée : le vacuomètre dit si le vide tient." },
    { nom: "Déconnecter", duree: 6, dire: "fermer, laisser stabiliser, desserrer lentement." }
  ];
  const DOSSIER = { manifold: 0, raccorder: 1, vide: 2, isoler: 3, deconnecter: 5, bilan: 0 };
  const DEBUT = ETAPES.map((e, i) => ETAPES.slice(0, i).reduce((a, x) => a + x.duree, 0)), TOTAL = ETAPES.reduce((a, x) => a + x.duree, 0);

  /* l'état du plateau à l'étape k, au temps local τ (secondes) */
  function etat(k, tau) {
    const e = { mB: 0, mA: 0, sB: 1, sA: 1, pompe: 0, flex: [0, 0, 0], air: 1, eau: 0.6, geste: null, vide: "", titre: null };
    if (k === 0) { e.mB = 1 - passe(tau, 1, 2); e.mA = 1 - passe(tau, 3, 4); e.geste = tau < 2.4 ? ["mB", 1, 0.6, 2.2] : ["mA", 1, 2.6, 4.2]; }
    if (k === 1) { e.flex = [passe(tau, 0.5, 1.7), passe(tau, 1.9, 3.1), passe(tau, 3.3, 4.5)]; e.titre = ["vannes fermées", "pendant le vissage"]; }
    if (k >= 2) e.flex = [1, 1, 1];
    if (k === 2) {
      e.mB = passe(tau, 0.8, 1.6); e.mA = passe(tau, 2, 2.8); e.pompe = passe(tau, 3.2, 3.6);
      e.air = 1 - 0.8 * passe(tau, 3.4, 7); e.eau = 0.6 - 0.48 * passe(tau, 3.4, 7);
      e.geste = tau < 1.8 ? ["mB", -1, 0.4, 1.8] : tau < 3 ? ["mA", -1, 1.8, 3] : null;
      if (tau > 3.4) e.vide = "creuse";
      if (tau >= 3) e.titre = ["chemin ouvert :", "la pompe aspire"];
    }
    if (k >= 3) { e.air = 0.2; e.eau = 0.12; }
    if (k === 3) {
      e.mB = 1 - passe(tau, 0.8, 1.6); e.mA = 1 - passe(tau, 2.4, 3.2); e.pompe = 1;
      e.geste = tau < 1.8 ? ["mB", 1, 0.4, 1.8] : tau < 3.4 ? ["mA", 1, 2, 3.4] : null;
      e.vide = tau < 3.2 ? "creuse" : "isole";
      if (tau >= 3.4) e.titre = ["circuit isolé :", "on peut arrêter"];
    }
    if (k === 4) { e.pompe = 1 - passe(tau, 0.8, 1.2); e.vide = tau > 1.2 ? "tient" : "isole"; e.titre = ["pompe arrêtée :", "on lit le vacuomètre"]; }
    if (k === 5) {
      e.sB = 1 - passe(tau, 0.8, 1.6); e.sA = 1 - passe(tau, 1.8, 2.6);
      const desserre = 1 - passe(tau, 4, 5.6); e.flex = [desserre, desserre, 1];
      e.geste = tau < 1.8 ? ["sB", 1, 0.4, 1.8] : tau < 2.8 ? ["sA", 1, 1.6, 2.8] : null;
      if (tau >= 2.8) e.titre = tau < 4 ? ["on laisse", "stabiliser"] : ["on desserre", "lentement"];
    }
    const f = e.pompe * e.flex[2];
    e.fluxB = f * e.flex[0] * e.mB * e.sB; e.fluxA = f * e.flex[1] * e.mA * e.sA;
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
  const MX = 600, MY = 112, MS = 4.2;                        // le manifold (repère du symbole manometres.svg)
  const SB = [470, 188], SA = [730, 188], SS = 1;           // les vannes de service, debout sur leurs piquages
  const TECH = { x: 66, y: 106, k: 2.25 }, MAIN = [127.6, 138.4], BRAS_VANNE = -87.9; // la main sur la poignée du gros plan
  const VANNES = { // triangles de la vanne fermée, dans le repère de chaque symbole
    mB: ["-13,-3 -13,4 -9,0.5", "-5,-3 -5,4 -9,0.5"], mA: ["4.7,-3 4.7,4 8.7,0.5", "12.7,-3 12.7,4 8.7,0.5"],
    s: ["-10,-5 -10,5 0,0", "10,-5 10,5 0,0"] };
  const TITRES = { mB: ["vanne BP", "du manifold"], mA: ["vanne HP", "du manifold"], sB: ["vanne de service", "BP, côté circuit"], sA: ["vanne de service", "HP, côté circuit"] };

  function image(parent, href, x, y, l, h, multiplier) {
    const i = D.el("image", { href: href, x: x, y: y, width: l, height: h, preserveAspectRatio: "xMidYMid meet" }, parent);
    if (multiplier) i.setAttribute("style", "mix-blend-mode:multiply"); // le fond blanc du symbole s'efface sur le papier
    return i;
  }
  function noircir(parent, cle) { // la vanne fermée, noircie sur sa propre forme
    const g = D.el("g", { opacity: 0 }, parent);
    VANNES[cle].forEach(pts => D.el("polygon", { points: pts, fill: C.navy }, g));
    return g;
  }
  function flexible(parent, d, couleur) { // un flexible : gaine de couleur, âme claire ; pathLength pour le raccorder pas à pas
    const g = D.el("g", {}, parent);
    D.el("path", { d: d, fill: "none", stroke: couleur, "stroke-width": 11, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "100 100" }, g);
    D.el("path", { d: d, fill: "none", stroke: "#f4f8fc", "stroke-width": 4.5, "stroke-linecap": "round", pathLength: 100, "stroke-dasharray": "100 100" }, g);
    return v => g.querySelectorAll("path").forEach(p => p.setAttribute("stroke-dashoffset", (100 * (1 - v)).toFixed(1)));
  }
  function flux(parent, d) { // la vapeur qui passe : des molécules séparées qui filent le long du chemin
    return D.el("path", { d: d, fill: "none", stroke: AIR, "stroke-width": 6, "stroke-linecap": "round", "stroke-dasharray": "0.1 15", opacity: 0 }, parent);
  }
  function fleche(parent, horaire) { // le sens du geste autour de la poignée : à droite on ferme, à gauche on ouvre
    const [cx, cy] = MAIN, r = 27, p = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
    const [a0, a1] = horaire ? [200, 340] : [340, 200], q0 = p(a0), q1 = p(a1), dir = (a1 + (horaire ? 90 : -90)) * Math.PI / 180;
    const g = D.el("g", { opacity: 0 }, parent), ux = Math.cos(dir), uy = Math.sin(dir);
    D.el("path", { d: `M${q0[0].toFixed(1)} ${q0[1].toFixed(1)} A${r} ${r} 0 0 ${horaire ? 1 : 0} ${q1[0].toFixed(1)} ${q1[1].toFixed(1)}`, fill: "none", stroke: C.orange, "stroke-width": 4.5, "stroke-linecap": "round" }, g);
    const pointe = [[q1[0] + ux * 9, q1[1] + uy * 9], [q1[0] - uy * 7 - ux * 3, q1[1] + ux * 7 - uy * 3], [q1[0] + uy * 7 - ux * 3, q1[1] - ux * 7 - uy * 3]];
    D.el("polygon", { points: pointe.map(q => q.map(v => v.toFixed(1)).join(",")).join(" "), fill: C.orange }, g);
    return g;
  }

  function dessiner(svg) {
    svg.setAttribute("viewBox", "0 0 1060 276");
    const g = D.el("g", {}, svg);
    marquer(D.filigrane(g, [[132, 236], [880, 130]], 220));
    /* ===== le montage ===== */
    const m = D.el("g", {}, g);
    // les deux lignes de l'installation (cuivre), l'eau restée dans la ligne BP, l'air dedans
    D.tube(m, 270, 212, 216, 40, "cuivre", false, "#f4f8fc");
    D.tube(m, 714, 212, 346, 40, "cuivre", false, "#f4f8fc");
    const eauG = D.el("g", {}, m), niveau = { v: 0.6 };
    const eau = D.liquide(eauG, { x0: 290, x1: 452, yh: 222, yb: 242, niveau: x => niveau.v * Math.max(0, 1 - Math.pow((x - 371) / 76, 2)), couleur: () => "#8fb7d9", opacite: 0.85, pas: 6 });
    const bulles = D.bulles(D.el("g", {}, m), 7, 41);
    const fcB = flux(m, "M276 232 H470 V172"), fcA = flux(m, "M1054 232 H730 V172");
    // piquages et vannes de service
    [SB, SA].forEach(([x]) => D.el("rect", { x: x - 8, y: 166, width: 16, height: 48, fill: "url(#vm-cuivre-h)" }, m));
    const vanneS = [SB, SA].map(([x, y]) => {
      const v = D.el("g", { transform: `translate(${x} ${y}) rotate(90) scale(${SS})` }, m);
      image(v, "../symboles/vanne_isolement.svg", -19, -10, 40, 20);
      return noircir(v, "s");
    });
    // la pompe à vide (entre les deux piquages), le vacuomètre (côté circuit, sur la ligne BP)
    const pompe = D.el("g", {}, m);
    image(pompe, "symboles/bomba-vacio.svg", 569, 158.75, 105.4, 89.9, true);
    image(m, "symboles/manometro.svg", 307.2, 153.2, 45.6, 81.6, true);
    // les flexibles, puis le manifold par-dessus (ses raccords cachent les bouts)
    const flex = [flexible(m, "M537 145.6 C537 162 470 152 470 168", C.bleu), flexible(m, "M667.2 145.6 C667.2 162 730 152 730 168", C.rouge), flexible(m, "M600 145.6 V182", C.jaune)];
    const fhB = flux(m, "M470 168 C470 152 537 162 537 145.6 V112 H600"), fhA = flux(m, "M730 168 C730 152 667.2 162 667.2 145.6 V112 H600"), fy = flux(m, "M600 112 V182");
    const man = D.el("g", { transform: `translate(${MX} ${MY}) scale(${MS})` }, m);
    image(man, "../symboles/manometres.svg", -24, -25, 50, 40);
    const vanneM = { mB: noircir(man, "mB"), mA: noircir(man, "mA") };
    // la pièce qui agit s'allume
    const anneau = D.el("rect", { rx: 9, fill: "none", stroke: C.orange, "stroke-width": 4, opacity: 0 }, m);
    const CADRES = { mB: [540, 80, 45, 55], mA: [614, 80, 45, 55], sB: [SB[0] - 14, 173, 28, 30], sA: [SA[0] - 14, 173, 28, 30] };
    // légendes du montage (jamais sur un tracé)
    ecrire(m, MX, 20, "manifold", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    ecrire(m, 509, 58, "BP", { "font-weight": 700, fill: C.bleu, "text-anchor": "end" });
    ecrire(m, 700, 58, "HP", { "font-weight": 700, fill: C.rouge });
    ecrire(m, 330, 124, "vacuomètre", { "text-anchor": "middle" });
    ecrire(m, 330, 150, "côté circuit", { "text-anchor": "middle", fill: C.gris });
    ecrire(m, 371, 270, "humidité", { "text-anchor": "middle", fill: "#3f6b93" });
    ecrire(m, 752, 195, "vannes de service");
    const etats = { "pompe0": D.pastille(m, 1052, 34, "pompe arrêtée", C.gris, 22, "end"), "pompe1": D.pastille(m, 1052, 34, "pompe en marche", C.vert, 22, "end"),
      creuse: D.pastille(m, 1052, 76, "le vide se creuse", C.bleu, 22, "end"), isole: D.pastille(m, 1052, 76, "circuit isolé", C.navy, 22, "end"), tient: D.pastille(m, 1052, 76, "le vide tient", C.vert, 22, "end") };
    /* ===== le gros plan du geste ===== */
    const gp = D.el("g", {}, g);
    const zoomM = {}, zoomMgr = {};
    [["mB", -14], ["mA", 3.7]].forEach(([cle, x0]) => { // la vanne du manifold, vue de près (le même symbole, agrandi)
      const z = D.el("svg", { x: MAIN[0] - 45, y: MAIN[1] - 22.5, width: 103.5, height: 126, viewBox: `${x0} -8.5 11.5 14`, opacity: 0 }, gp);
      image(z, "../symboles/manometres.svg", -24, -25, 50, 40);
      zoomM[cle] = z; zoomMgr[cle] = noircir(z, cle);
    });
    const zS = D.el("g", { transform: `translate(${MAIN[0]} ${MAIN[1]}) rotate(90)`, opacity: 0 }, gp); // la vanne de service, debout comme sur son piquage
    const zSv = D.el("svg", { x: -52.8, y: -30.8, width: 105.6, height: 61.6, viewBox: "-12 -7 24 14" }, zS);
    image(zSv, "../symboles/vanne_isolement.svg", -19, -10, 40, 20);
    const zSnoir = noircir(zSv, "s");
    const tech = bonhomme(gp, { casquette: true, dephasage: 0.3 });
    const ferme = fleche(gp, true), ouvre = fleche(gp, false);
    const titre1 = ecrire(gp, 131, 26, "", { "font-weight": 700, fill: C.navy, "text-anchor": "middle" });
    const titre2 = ecrire(gp, 131, 52, "", { "text-anchor": "middle", fill: C.gris });
    const mot = ecrire(gp, 140, 266, "", { "font-weight": 700, "text-anchor": "middle" });
    let vu = "mB", brasLisse = -15;

    return function (k, tau, t) {
      const e = etat(k, tau);
      /* montage */
      niveau.v = e.eau; eau.maj(t);
      bulles(t, q => { const x = 335 + q * 72; return [x, 240, eau.surface(x, t) + 3, e.fluxB > 0.5 && e.eau > 0.14 ? 1 : 0]; });
      const vit = 34;
      fcB.setAttribute("opacity", (0.85 * e.air).toFixed(2)); fcA.setAttribute("opacity", (0.85 * e.air).toFixed(2));
      fcB.setAttribute("stroke-dashoffset", (-t * vit * e.fluxB).toFixed(1)); fcA.setAttribute("stroke-dashoffset", (-t * vit * e.fluxA).toFixed(1));
      [[fhB, e.fluxB], [fhA, e.fluxA], [fy, Math.max(e.fluxB, e.fluxA)]].forEach(([p, v]) => { p.setAttribute("opacity", (0.9 * v).toFixed(2)); p.setAttribute("stroke-dashoffset", (-t * vit).toFixed(1)); });
      e.flex.forEach((v, i) => flex[i](v));
      vanneM.mB.setAttribute("opacity", (1 - e.mB).toFixed(2)); vanneM.mA.setAttribute("opacity", (1 - e.mA).toFixed(2));
      vanneS[0].setAttribute("opacity", (1 - e.sB).toFixed(2)); vanneS[1].setAttribute("opacity", (1 - e.sA).toFixed(2));
      pompe.setAttribute("transform", e.pompe > 0.5 ? `translate(${(Math.sin(t * 61) * 0.9).toFixed(2)} ${(Math.cos(t * 47) * 0.6).toFixed(2)})` : "");
      etats.pompe0.setAttribute("opacity", e.pompe > 0.5 ? 0 : 1); etats.pompe1.setAttribute("opacity", e.pompe > 0.5 ? 1 : 0);
      ["creuse", "isole", "tient"].forEach(c => etats[c].setAttribute("opacity", e.vide === c ? 1 : 0));
      /* le geste */
      if (e.geste) vu = e.geste[0];
      const [cle, sens, g0, g1] = e.geste || [vu, 0, 0, 0];
      const enMain = e.geste ? D.fenetre(tau, g0, g1, 0.3) : 0, tourne = e.geste ? D.fenetre(tau, g0 + 0.35, g1 - 0.35, 0.15) : 0;
      const [x, y, l, h] = CADRES[cle];
      Object.entries({ x: x, y: y, width: l, height: h }).forEach(([a, v]) => anneau.setAttribute(a, v));
      anneau.setAttribute("opacity", enMain.toFixed(2));
      const ouvert = cle === "mB" ? e.mB : cle === "mA" ? e.mA : cle === "sB" ? e.sB : e.sA;
      zoomM.mB.setAttribute("opacity", cle === "mB" ? 1 : 0); zoomM.mA.setAttribute("opacity", cle === "mA" ? 1 : 0); zS.setAttribute("opacity", cle[0] === "s" ? 1 : 0);
      (cle[0] === "s" ? zSnoir : zoomMgr[cle]).setAttribute("opacity", (1 - ouvert).toFixed(2));
      ferme.setAttribute("opacity", (sens > 0 ? tourne : 0).toFixed(2)); ouvre.setAttribute("opacity", (sens < 0 ? tourne : 0).toFixed(2));
      const titre = e.geste || !e.titre ? TITRES[cle] : e.titre;
      if (titre1.textContent !== titre[0] || titre2.textContent !== titre[1]) { titre1.textContent = titre[0]; titre2.textContent = titre[1]; }
      mot.textContent = ouvert > 0.5 ? "ouverte" : "fermée"; mot.setAttribute("fill", ouvert > 0.5 ? C.vert : C.navy);
      brasLisse = D.lerp(-15, BRAS_VANNE + Math.sin(t * 9) * 2.5 * tourne, enMain);
      tech({ x: TECH.x, y: TECH.y, k: TECH.k, t: t, bras: brasLisse });
      return e;
    };
  }

  /* ---------- la pose : le dessin, les boutons pas à pas, la phrase de l'étape ---------- */
  const dessins = document.createElement("div");
  dessins.className = "scene-dessins";
  hote.appendChild(dessins);
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "scene-geste"); svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Animation pas à pas : à gauche, la main du technicien tourne la vanne qui agit ; à droite, le montage manifold, pompe à vide et vacuomètre, où la vapeur passe quand la vanne est ouverte et s'arrête quand elle est fermée.");
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

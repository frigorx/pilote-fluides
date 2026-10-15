/* =====================================================================
   scenes-huile.js — les scènes animées de la ligne « Le circuit d'huile »
   ---------------------------------------------------------------------
   Remise à niveau des illustrations (lot I6, 15/10/2026). Rien n'est
   inventé : le dessin vient de VOYAGE_DESSIN (nappe qui ondule, tubes en
   relief, filigrane) et le pas à pas de la ligne des détendeurs
   (DETENDEURS_SCENES.jouer : une étape = une cause → un effet, la pièce
   qui agit est entourée). engine.js appelle
   HUILE_SCENES[visual.scene](hote, visual, outils) quand un écran nomme
   une scène ; une station qui ne charge pas ce fichier garde ses schémas.

   CHARGEMENT (avant module.js et engine.js) :
     jouerezo/moteur/voyage-dessin.js → _detendeurs-commun/scenes-detendeurs.js → scenes-huile.js

   RÈGLES TENUES (MOULE des détendeurs § 4) : aucun texte sur un tracé (les
   mots sont dans la légende HTML du pas à pas et dans des pastilles posées
   hors des tubes) ; l'huile se voit liquide (nappe ambrée, gouttes qui
   tombent), le gaz en petites molécules ; HP orangé, BP bleu ; tout se
   calcule à partir du temps t, ni CSS ni SMIL ; le symbole normalisé vient
   de la bibliothèque (fourni par engine.js), jamais redessiné.

   SCÈNES : "separateur-chemins" (les trois raccordements, 3 étapes),
            "separateur-flotteur" (flotteur, levier, pointeau, 5 étapes).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, DS = window.DETENDEURS_SCENES;
  if (!D || !DS) return;
  const el = D.el, bn = D.borne, lerp = D.lerp, frac = D.frac;
  const HUILE = "#d69a16", HUILE_FONCE = "#8a5a06", BP = "#2f6fb8", RAD = Math.PI / 180;

  /* ---------- géométrie de la coupe (viewBox 640 × 470) ---------- */
  const W = 640, H = 470;
  const C = { x: 215, y: 40, l: 210, h: 370, r: 55, e: 11 };                    // la cuve
  const I = { x: C.x + C.e, y: C.y + C.e, l: C.l - 2 * C.e, h: C.h - 2 * C.e, r: C.r - C.e };
  const FOND = I.y + I.h;                                                       // 399, le fond intérieur
  const TY = 92, TH = 44, TM = TY + TH / 2;                                     // entrée et sortie du gaz
  const ENTREE_FIN = 268, SORTIE_DEBUT = 372;
  const CHIC = { x: 288, y: I.y + 8, l: 10, h: 178 };                           // la chicane
  const NAPPE_H = 112;                                                          // hauteur de cuve que l'huile peut remplir
  /* Le levier : le flotteur au bout du bras, le pointeau accroché près de l'axe par un étrier.
     L'étrier laisse une course morte : le flotteur monte d'abord seul (pointeau sur son siège),
     puis il soulève le pointeau. */
  const PIV = { x: 385, y: 352 }, BRAS = 100, BRAS_P = 48, RF = 22;
  const A_MIN = -10, A_OUVRE = 6, A_MAX = 24;                                    // degrés
  const LEVE_MAX = BRAS_P * (Math.sin(A_MAX * RAD) - Math.sin(A_OUVRE * RAD));
  const SIEGE_Y = 383, AXE = 339;                                               // le siège, l'axe du retour
  const RET = { x: AXE - 18, l: 36 };                                           // le tube de retour, vertical
  const ETRIER_Y = PIV.y - BRAS_P * Math.sin(A_OUVRE * RAD) - 3.5;              // barre haute de l'étrier, fermé

  /* le trajet du gaz : entre à gauche, descend derrière la chicane, la contourne, remonte, sort à droite */
  const GAZ_PTS = [[-14, TM], [246, TM], [257, TM + 14], [257, 228], [266, 254], [292, 268], [326, 262], [350, 240], [355, 160], [362, 126], [380, TM], [W + 14, TM]];
  const GOUTTE_PTS = [[-14, TM + 4], [246, TM + 4], [257, TM + 18], [257, 232]];
  function chemin(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const tot = L[L.length - 1];
    return function (f) {
      const d = bn(f, 0, 1) * tot;
      let i = 1;
      while (i < L.length - 1 && L[i] < d) i++;
      const s = (d - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [lerp(pts[i - 1][0], pts[i][0], s), lerp(pts[i - 1][1], pts[i][1], s)];
    };
  }
  const surGaz = chemin(GAZ_PTS), surGoutte = chemin(GOUTTE_PTS);

  /* une pastille (D.pastille) masquable sur petit écran par le CSS de la ligne */
  function pastille(g, x, y, s, fond, ancre) {
    const p = D.pastille(g, x, y, s, fond, 24, ancre);
    p.setAttribute("class", "ds-pastille");
    return p;
  }
  function anneau(g) {
    const r = el("rect", { rx: 12, fill: "none", stroke: "#ff6b35", "stroke-width": 5, opacity: 0 }, g);
    return function (z, t) {
      if (!z) { r.setAttribute("opacity", 0); return; }
      r.setAttribute("x", z[0].toFixed(1)); r.setAttribute("y", z[1].toFixed(1));
      r.setAttribute("width", z[2].toFixed(1)); r.setAttribute("height", z[3].toFixed(1));
      r.setAttribute("opacity", (0.65 + 0.35 * Math.sin(t * 5)).toFixed(2));
    };
  }

  /* ---------- la coupe du séparateur à flotteur ----------
     etat : { flux 0..1 (gaz + gouttes qui entrent), chute 0..1 (gouttes qui tombent), gaz 0..1 (gaz qui sort),
              niveau 0..1 (huile au fond), pousse 0..1 (la haute pression pousse l'huile vers le retour) }
     info.agit : entree, gaz, huile, chicane, nappe, flotteur, pointeau
     o : { retour: [texte, couleur] de la pastille du retour, symbole: fonction de la bibliothèque (engine.js),
           loupe: { x, y, cx, cy, r, k, mot } agrandit k fois le point (x, y) du dessin dans un cercle (cx, cy, r) } */
  function coupe(svg, o) {
    o = o || {};
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const uid = Math.random().toString(36).slice(2, 8);
    const racine = el("g", {}, svg);
    const g = el("g", { id: "hs-coupe-" + uid }, racine);    // tout le dessin : la loupe le réutilise tel quel
    // la cuve : paroi en relief, intérieur plein de gaz chaud
    el("rect", { x: C.x, y: C.y, width: C.l, height: C.h, rx: C.r, fill: "url(#vm-acier-h)" }, g);
    el("rect", { x: I.x, y: I.y, width: I.l, height: I.h, rx: I.r, fill: "#fff6ec" }, g);
    // les tubes : leur intérieur traverse la paroi de la cuve (posés après elle)
    D.tube(g, 0, TY, ENTREE_FIN, TH, "cuivre", false, "#fdf1e4");
    D.tube(g, SORTIE_DEBUT, TY, W - SORTIE_DEBUT, TH, "cuivre", false, "#fdf1e4");
    D.tube(g, RET.x, FOND - 4, RET.l, H - FOND + 8, "cuivre", true, HUILE);
    // la chicane
    el("rect", { x: CHIC.x, y: CHIC.y, width: CHIC.l, height: CHIC.h, rx: 3, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1 }, g);
    // le mécanisme, sous la nappe (elle est translucide : on le voit à travers l'huile)
    const meca = el("g", {}, g);
    el("rect", { x: PIV.x - 4, y: PIV.y, width: 8, height: FOND - PIV.y, fill: "url(#vm-acier-h)" }, meca);
    const bras = el("line", { stroke: "#4e5a66", "stroke-width": 6, "stroke-linecap": "round" }, meca);
    el("circle", { cx: PIV.x, cy: PIV.y, r: 6.5, fill: "#aab6c3", stroke: D.BLEU, "stroke-width": 2.5 }, meca);
    const flot = el("g", {}, meca);
    el("circle", { r: RF, fill: "url(#vm-acier)", stroke: D.BLEU, "stroke-width": 2.5 }, flot);
    el("ellipse", { cx: -7, cy: -9, rx: 8, ry: 4.5, fill: "#fff", opacity: 0.7, transform: "rotate(-25 -7 -9)" }, flot);
    // la nappe d'huile, tenue dans l'intérieur arrondi de la cuve
    const cid = "hs-clip-" + uid;
    el("rect", { x: I.x, y: I.y, width: I.l, height: I.h, rx: I.r }, el("clipPath", { id: cid }, g));
    let niv = 0.4;
    const nappe = D.liquide(el("g", { "clip-path": "url(#" + cid + ")" }, g),
      { x0: I.x, x1: I.x + I.l, yh: FOND - NAPPE_H, yb: FOND, niveau: () => niv, couleur: () => HUILE, opacite: 0.86, pas: 8 });
    // le pointeau et son siège, posés sur la nappe pour rester lisibles (laiton cerné de brun)
    const pt = el("g", {}, g), TRAIT = { stroke: "#5a3d05", "stroke-width": 1.6 };
    el("rect", { x: AXE - 4, y: SIEGE_Y + 8, width: 8, height: FOND - SIEGE_Y - 8, fill: HUILE }, pt);
    el("path", Object.assign({ d: "M" + (AXE - 10) + " " + FOND + " V" + SIEGE_Y + " H" + (AXE - 6) + " L" + AXE + " " + (SIEGE_Y + 8) + " L" + (AXE + 6) + " " + SIEGE_Y + " H" + (AXE + 10) + " V" + FOND + " Z",
      fill: "url(#vm-laiton)" }, TRAIT), pt);
    const etrier = el("rect", { x: AXE - 7, width: 14, height: 25, rx: 3, fill: "none", stroke: "#5a3d05", "stroke-width": 3 }, pt);
    const tige = el("line", { x1: AXE, x2: AXE, stroke: "#5a3d05", "stroke-width": 4 }, pt);
    const cone = el("path", Object.assign({ fill: "url(#vm-laiton)" }, TRAIT), pt);
    const goupille = el("circle", { r: 3.5, fill: D.BLEU }, pt);
    // l'huile qui file dans le tube de retour
    const filets = [0, 1, 2].map(() => el("line", { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }, g));
    // les gouttes d'huile (entraînées, puis qui tombent) et le gaz (petites molécules)
    const alea = D.alea(17);
    const gouttes = Array.from({ length: 9 }, (_, k) => ({ ph: k / 9, dx: -26 + alea() * 48,
      c: el("circle", { r: 4.2, fill: HUILE, stroke: HUILE_FONCE, "stroke-width": 1 }, g) }));
    const mols = Array.from({ length: 16 }, (_, k) => ({ ph: k / 16,
      c: el("circle", { r: 5.5, fill: D.couleur(0.78, true), stroke: D.BLEU, "stroke-width": 1.4, "stroke-opacity": 0.45 }, g) }));
    // la haute pression qui pousse sur la nappe
    const poussees = [D.chaleur(g), D.chaleur(g)];
    // les mots, hors des tracés
    const pg = el("g", {}, racine);
    pastille(pg, (C.x + C.l / 2), 28, "HP", D.ORANGE, "middle");
    pastille(pg, 6, 76, "gaz + huile", D.BLEU, "start");
    pastille(pg, W - 6, 76, "gaz seul", D.BLEU, "end");
    const ret = o.retour || ["retour d’huile", HUILE_FONCE];
    pastille(pg, RET.x + RET.l + 9, 452, ret[0], ret[1], "start");
    if (typeof o.symbole === "function") {   // la carte d'identité : le symbole normalisé, à côté de la coupe
      const carte = el("g", {}, racine);
      el("rect", { x: 452, y: 166, width: 176, height: 206, rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.28)", "stroke-width": 2 }, carte);
      D.texte(carte, 540, 196, "son symbole", { "text-anchor": "middle", "font-size": 22, "font-weight": 700, fill: D.BLEU, "font-family": "Calibri, Arial, sans-serif", class: "ds-pastille" });
      const s = el("g", {}, carte);
      s.innerHTML = o.symbole(490, 214, 100, 133, "Symbole normalisé du séparateur d’huile");
    }
    if (o.loupe) {   // une vraie loupe : le même dessin, vivant, agrandi (rien n'est redessiné)
      const L = o.loupe, lg = el("g", {}, racine), lid = "hs-loupe-" + uid;
      const ux = L.cx - L.x, uy = L.cy - L.y, n = Math.hypot(ux, uy), rv = L.r / L.k;
      el("line", { x1: (L.x + ux / n * rv).toFixed(1), y1: (L.y + uy / n * rv).toFixed(1), x2: (L.cx - ux / n * (L.r + 5)).toFixed(1), y2: (L.cy - uy / n * (L.r + 5)).toFixed(1),
        stroke: D.BLEU, "stroke-width": 2.5, "stroke-dasharray": "6 5" }, lg);
      el("circle", { cx: L.x, cy: L.y, r: rv, fill: "none", stroke: D.BLEU, "stroke-width": 2.5, "stroke-dasharray": "6 5" }, lg);
      el("circle", { cx: L.cx, cy: L.cy, r: L.r }, el("clipPath", { id: lid }, lg));
      el("circle", { cx: L.cx, cy: L.cy, r: L.r, fill: "#fff6ec" }, lg);
      el("use", { href: "#hs-coupe-" + uid,
        transform: "translate(" + L.cx + " " + L.cy + ") scale(" + L.k + ") translate(" + (-L.x) + " " + (-L.y) + ")" }, el("g", { "clip-path": "url(#" + lid + ")" }, lg));
      el("circle", { cx: L.cx, cy: L.cy, r: L.r + 2, fill: "none", stroke: D.BLEU, "stroke-width": 4 }, lg);
      if (L.mot) D.texte(lg, L.cx, L.cy + L.r + 30, L.mot, { "text-anchor": "middle", "font-size": 21, "font-weight": 700, fill: D.BLEU, "font-family": "Calibri, Arial, sans-serif", class: "ds-pastille" });
    }
    const zone = anneau(el("g", {}, racine));

    function maj(e, t, info) {
      niv = bn(e.niveau === undefined ? 0.4 : e.niveau, 0, 1);
      nappe.maj(t);
      // le flotteur suit la surface ; le levier tourne autour de son axe ; l'étrier soulève le pointeau
      const xs = PIV.x - BRAS;
      const a = bn(Math.asin(bn((PIV.y - nappe.surface(xs, t) - 5) / BRAS, -1, 1)) / RAD, A_MIN, A_MAX) * RAD;
      const F = [PIV.x - BRAS * Math.cos(a), PIV.y - BRAS * Math.sin(a)], Q = [PIV.x - BRAS_P * Math.cos(a), PIV.y - BRAS_P * Math.sin(a)];
      const leve = Math.max(0, BRAS_P * (Math.sin(a) - Math.sin(A_OUVRE * RAD))), ouv = bn(leve / LEVE_MAX, 0, 1);
      bras.setAttribute("x1", F[0].toFixed(1)); bras.setAttribute("y1", F[1].toFixed(1));
      bras.setAttribute("x2", PIV.x); bras.setAttribute("y2", PIV.y);
      flot.setAttribute("transform", "translate(" + F[0].toFixed(1) + " " + F[1].toFixed(1) + ")");
      goupille.setAttribute("cx", Q[0].toFixed(1)); goupille.setAttribute("cy", Q[1].toFixed(1));
      const yb = ETRIER_Y - leve, pointe = SIEGE_Y + 8 - leve;
      etrier.setAttribute("y", (yb - 3).toFixed(1));
      tige.setAttribute("y1", (yb + 22).toFixed(1)); tige.setAttribute("y2", (pointe - 9).toFixed(1));
      cone.setAttribute("d", "M" + (AXE - 6) + " " + (pointe - 9).toFixed(1) + " L" + (AXE + 6) + " " + (pointe - 9).toFixed(1) + " L" + AXE + " " + pointe.toFixed(1) + " Z");
      // l'huile file dans le retour tant que le pointeau est ouvert
      filets.forEach((f, k) => {
        const y = FOND + 2 + frac(k / 3 + t * 0.8) * (H - FOND - 4);
        f.setAttribute("x1", AXE); f.setAttribute("x2", AXE); f.setAttribute("y1", y.toFixed(1)); f.setAttribute("y2", Math.min(H, y + 9).toFixed(1));
        f.setAttribute("opacity", (ouv > 0.02 ? 0.75 : 0).toFixed(2));
      });
      // les gouttes : entraînées par le gaz jusqu'au bas de la chicane, puis elles tombent dans la nappe
      const flux = bn(e.flux || 0, 0, 1), chute = bn(e.chute || 0, 0, 1), gaz = bn(e.gaz || 0, 0, 1);
      gouttes.forEach(gt => {
        const q = frac(gt.ph + t / 3.4);
        let x, y, op;
        if (q < 0.62) { [x, y] = surGoutte(q / 0.62); op = flux * D.fenetre(q, 0, 1, 0.06); }
        else {
          const f = (q - 0.62) / 0.38;
          x = 257 + gt.dx; const y1 = nappe.surface(x, t);
          y = lerp(236, y1, f * f); op = flux * chute * (f < 0.92 ? 1 : (1 - f) / 0.08);
        }
        gt.c.setAttribute("cx", x.toFixed(1)); gt.c.setAttribute("cy", y.toFixed(1)); gt.c.setAttribute("opacity", bn(op, 0, 1).toFixed(2));
      });
      mols.forEach(m => {
        const [x, y] = surGaz(frac(m.ph + t / 4.4));
        const op = x > SORTIE_DEBUT + 6 ? flux * gaz : flux;
        m.c.setAttribute("cx", x.toFixed(1)); m.c.setAttribute("cy", y.toFixed(1)); m.c.setAttribute("opacity", (op * 0.95).toFixed(2));
      });
      const p = bn(e.pousse || 0, 0, 1);
      [I.x + 16, I.x + I.l - 14].forEach((x, k) => poussees[k](x, nappe.surface(x, t) - 6 - 4 * Math.abs(Math.sin(t * 3 + k)), 0, p));
      const z = info && info.agit;
      const Z = {
        entree: [2, TY - 9, ENTREE_FIN + 4, TH + 18], gaz: [SORTIE_DEBUT - 6, TY - 9, W - SORTIE_DEBUT + 4, TH + 18],
        huile: [RET.x - 7, SIEGE_Y - 14, RET.l + 14, H - SIEGE_Y + 11], chicane: [I.x + 2, CHIC.y - 4, CHIC.x + CHIC.l - I.x + 4, CHIC.h + 44],
        nappe: [I.x + 2, FOND - niv * NAPPE_H - 12, I.l - 4, niv * NAPPE_H + 10],
        flotteur: [F[0] - RF - 8, F[1] - RF - 8, 2 * RF + 16, 2 * RF + 16], pointeau: [AXE - 16, yb - 10, 32, pointe - yb + 18]
      };
      zone(z && Z[z] ? Z[z] : null, t);
    }
    return { maj: maj };
  }

  /* ---------- les pas à pas ---------- */
  const CHEMINS = {
    aria: "Coupe animée du séparateur d’huile : le mélange de gaz et d’huile entre à gauche, le gaz seul sort à droite, l’huile tombe au fond et repart par le bas.",
    init: { flux: 0, chute: 0, gaz: 0, niveau: 0.5, pousse: 0 },
    etapes: [
      { nom: "L’entrée", dire: "Du compresseur arrive le gaz chaud, chargé de gouttelettes d’huile.", agit: "entree", cible: { flux: 1 }, duree: 3 },
      { nom: "La sortie du gaz", dire: "En haut, le gaz débarrassé de son huile repart vers le condenseur.", agit: "gaz", cible: { gaz: 1, chute: 1 }, duree: 3 },
      { nom: "La sortie de l’huile", dire: "En bas, l’huile collectée repart : directement au carter, ou vers un réservoir.", agit: "huile", cible: { niveau: 0.8 }, duree: 3.4 }
    ]
  };
  const FLOTTEUR = {
    aria: "Coupe animée du séparateur à flotteur : l’huile s’accumule au fond, le flotteur monte et soulève le pointeau, l’huile repart vers le carter, puis le pointeau se referme.",
    init: { flux: 1, chute: 1, gaz: 1, niveau: 0.2, pousse: 0 },
    etapes: [
      { nom: "L’huile tombe", dire: "Le gaz ralentit et change de direction : les gouttes d’huile tombent au fond.", agit: "chicane", cible: { niveau: 0.32 }, duree: 3 },
      { nom: "Le flotteur monte", dire: "L’huile s’accumule dans le bas. Le flotteur monte avec le niveau.", agit: "flotteur", cible: { niveau: 0.54 }, duree: 3 },
      { nom: "Le pointeau s’ouvre", dire: "Le flotteur soulève le levier : le pointeau se lève et ouvre le passage.", agit: "pointeau", cible: { niveau: 0.8 }, duree: 3 },
      { nom: "L’huile repart", dire: "Poussée par la haute pression, l’huile file vers le carter. Le niveau baisse.", agit: "huile", cible: { niveau: 0.62, pousse: 1 }, duree: 3.4 },
      { nom: "Le pointeau se ferme", dire: "Le flotteur redescend, le pointeau se referme : le gaz chaud ne passe pas.", agit: "pointeau", cible: { niveau: 0.42, pousse: 0 }, duree: 3.4 }
    ]
  };
  function jouer(hote, def, o) {
    hote.classList.add("huile-scene");
    return DS.jouer(hote, { init: def.init, etapes: def.etapes, construire: dessin => coupe(DS.svg(dessin, "ds-svg", def.aria), o).maj });
  }
  window.HUILE_SCENES = {
    "separateur-chemins": (hote, visual, outils) => jouer(hote, CHEMINS, { retour: ["retour d’huile", HUILE_FONCE], symbole: outils && outils.symboleSeparateur }),
    "separateur-flotteur": hote => jouer(hote, FLOTTEUR, { retour: ["carter · BP", BP],
      loupe: { x: AXE, y: 368, cx: 535, cy: 280, r: 88, k: 2.6, mot: "le pointeau" } })
  };
})();

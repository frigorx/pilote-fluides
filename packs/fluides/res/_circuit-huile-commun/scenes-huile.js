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

   SCÈNES : "clapet" (le réservoir et son clapet taré ; visual.programme : cycle, branches, reglable, force, ecart, mesure),
            "separateur-chemins" (les trois raccordements, 3 étapes),
            "separateur-pannes" (diagnostic : bon retour, flotteur bloqué, pointeau qui fuit),
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
    // quand le pointeau fuit et que la cuve s'est vidée, c'est du gaz chaud qui remplit le retour
    const retGaz = el("rect", { x: RET.x + 10, y: FOND - 4, width: RET.l - 20, height: H - FOND + 8, fill: D.couleur(0.85, true), opacity: 0 }, g);
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
    const grain = el("circle", { cx: AXE + 3.5, cy: SIEGE_Y + 2.5, r: 2.6, fill: "#3a2a10", opacity: 0 }, pt);   // l'impureté qui tient le pointeau ouvert
    // l'huile qui file dans le tube de retour ; ou le gaz chaud, si le pointeau fuit
    const filets = [0, 1, 2].map(() => el("line", { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }, g));
    const fuiteMols = [0, 1, 2, 3].map(() => el("circle", { r: 4.5, fill: D.couleur(0.85, true), stroke: D.BLEU, "stroke-width": 1.2, "stroke-opacity": 0.5, opacity: 0 }, g));
    const chauds = [D.chaleur(g), D.chaleur(g)];
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
      // pannes : bloque (le flotteur reste en butée basse), fuite (une impureté laisse le pointeau entrouvert)
      const bloque = bn(e.bloque || 0, 0, 1), fuite = bn(e.fuite || 0, 0, 1);
      const xs = PIV.x - BRAS;
      const libre = bn(Math.asin(bn((PIV.y - nappe.surface(xs, t) - 5) / BRAS, -1, 1)) / RAD, A_MIN, A_MAX);
      const a = lerp(libre, A_MIN, bloque) * RAD;
      const F = [PIV.x - BRAS * Math.cos(a), PIV.y - BRAS * Math.sin(a)], Q = [PIV.x - BRAS_P * Math.cos(a), PIV.y - BRAS_P * Math.sin(a)];
      const leve = Math.max(0, BRAS_P * (Math.sin(a) - Math.sin(A_OUVRE * RAD)), 4.5 * fuite), ouv = bn(leve / LEVE_MAX, 0, 1);
      grain.setAttribute("opacity", fuite.toFixed(2));
      bras.setAttribute("x1", F[0].toFixed(1)); bras.setAttribute("y1", F[1].toFixed(1));
      bras.setAttribute("x2", PIV.x); bras.setAttribute("y2", PIV.y);
      flot.setAttribute("transform", "translate(" + F[0].toFixed(1) + " " + F[1].toFixed(1) + ")");
      goupille.setAttribute("cx", Q[0].toFixed(1)); goupille.setAttribute("cy", Q[1].toFixed(1));
      const yb = ETRIER_Y - leve, pointe = SIEGE_Y + 8 - leve;
      etrier.setAttribute("y", (yb - 3).toFixed(1));
      tige.setAttribute("y1", (yb + 22).toFixed(1)); tige.setAttribute("y2", (pointe - 9).toFixed(1));
      cone.setAttribute("d", "M" + (AXE - 6) + " " + (pointe - 9).toFixed(1) + " L" + (AXE + 6) + " " + (pointe - 9).toFixed(1) + " L" + AXE + " " + pointe.toFixed(1) + " Z");
      // l'huile file dans le retour tant que le pointeau est ouvert ; cuve vide et pointeau qui fuit : le gaz chaud passe
      const gz = fuite * bn((0.2 - niv) / 0.12, 0, 1);
      retGaz.setAttribute("opacity", gz.toFixed(2));
      filets.forEach((f, k) => {
        const y = FOND + 2 + frac(k / 3 + t * 0.8) * (H - FOND - 4);
        f.setAttribute("x1", AXE); f.setAttribute("x2", AXE); f.setAttribute("y1", y.toFixed(1)); f.setAttribute("y2", Math.min(H, y + 9).toFixed(1));
        f.setAttribute("opacity", ((ouv > 0.02 ? 0.75 : 0) * (1 - gz)).toFixed(2));
      });
      fuiteMols.forEach((m, k) => {
        m.setAttribute("cx", (AXE + 2 * Math.sin(t * 4 + k)).toFixed(1));
        m.setAttribute("cy", (FOND - 2 + frac(k / 4 + t * 1.3) * (H - FOND + 4)).toFixed(1));
        m.setAttribute("opacity", (gz * 0.95).toFixed(2));
      });
      chauds.forEach((c, k) => c(RET.x - 40 - 3 * Math.abs(Math.sin(t * 3 + k)), 420 + 30 * k, 90, gz));
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

  /* plusieurs anneaux à la fois (deux manomètres éloignés, par exemple) */
  function anneaux(g, n) {
    const a = Array.from({ length: n }, () => anneau(g));
    return (zones, t) => a.forEach((f, k) => f(zones && zones[k] ? zones[k] : null, t));
  }

  /* ---------- la coupe du clapet taré (clapet différentiel) et de son réservoir ----------
     Le réservoir (huile en nappe, gaz au-dessus) a deux sorties : en haut la branche de pression, qui rejoint
     l'aspiration à travers le clapet ; en bas la branche d'huile, vers le filtre et les régulateurs. Le clapet
     (siège, clapet mobile, ressort, appui du ressort) se lit dans une loupe. Deux manomètres qualitatifs.
     etat : { pres 0..1 (écart du réservoir au-dessus de l'aspiration), tarage 0..1 (écart que tient le ressort),
              gazIn 0..1 (huile et gaz qui arrivent du séparateur), vis 0..1 (la vis comprime le ressort),
              reglable 0..1 (la vis se montre), alim 0..1 (les régulateurs acceptent l'huile), niveau 0..1 }
     info.agit : reservoir, branche, clapet, ressort, vis, huile, manometres */
  const RS = { x: 30, y: 150, l: 160, h: 280, r: 42, e: 10 };
  const RI = { x: RS.x + RS.e, y: RS.y + RS.e, l: RS.l - 2 * RS.e, h: RS.h - 2 * RS.e, r: RS.r - RS.e };
  const R_FOND = RI.y + RI.h, R_NH = 200, BY = 167, BH = 36, BM = BY + BH / 2, OY = 382;
  const CL = { x: 290, y: 140, l: 110, h: 90 }, SIEGE_X = 328, CLAPET_X = 336, LEVEE = 15;
  function coupeClapet(svg, o) {
    o = o || {};
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const uid = Math.random().toString(36).slice(2, 8);
    const racine = el("g", {}, svg);
    const g = el("g", { id: "hs-coupe-" + uid }, racine);
    const GAZ_R = D.couleur(0.45, true), GAZ_BP = D.couleur(0.2, true);
    // le réservoir
    el("rect", { x: RS.x, y: RS.y, width: RS.l, height: RS.h, rx: RS.r, fill: "url(#vm-acier-h)" }, g);
    el("rect", { x: RI.x, y: RI.y, width: RI.l, height: RI.h, rx: RI.r, fill: "#fbf7f0" }, g);
    // l'arrivée du séparateur (en haut), la branche de pression, la branche d'huile, l'aspiration
    D.tube(g, 52, 0, 36, RI.y + 16, "cuivre", true, "#fbf3e6");
    D.tube(g, RI.x + RI.l - 10, OY, W - (RI.x + RI.l - 10), BH, "cuivre", false, HUILE);
    // le clapet : corps en laiton, chambre, siège percé, clapet mobile, ressort, appui du ressort ;
    // les tubes sont posés après le corps : leur intérieur traverse sa paroi
    el("rect", { x: CL.x, y: CL.y, width: CL.l, height: CL.h, rx: 14, fill: "url(#vm-laiton)", stroke: "#6f5214", "stroke-width": 1.5 }, g);
    el("rect", { x: CL.x + 10, y: CL.y + 18, width: CL.l - 18, height: CL.h - 36, rx: 6, fill: "#f6efe2" }, g);
    D.tube(g, RI.x + RI.l - 10, BY, CL.x + 12 - (RI.x + RI.l - 10), BH, "cuivre", false, "#fbf7f0");
    D.tube(g, CL.x + CL.l - 10, BY, W - (CL.x + CL.l - 10), BH, "cuivre", false, "#dce9f7");
    [[CL.y + 18, BM - 8], [BM + 8, CL.y + CL.h - 18]].forEach(([y0, y1]) =>
      el("rect", { x: SIEGE_X, y: y0, width: CLAPET_X - SIEGE_X, height: y1 - y0, fill: "#b8902f", stroke: "#6f5214", "stroke-width": 1 }, g));
    const ressort = el("polyline", { fill: "none", stroke: "#5d6b7a", "stroke-width": 3, "stroke-linejoin": "round" }, g);
    const appui = [0, 1].map(() => el("rect", { width: 5, height: 14, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1 }, g));
    const clapet = el("rect", { y: BM - 19, width: 9, height: 38, rx: 2, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1.2 }, g);
    // la vis de réglage (clapet réglable) : une tête qui tourne au-dessus du corps
    const visG = el("g", { opacity: 0 }, g);
    el("rect", { x: 368, y: CL.y - 12, width: 8, height: 14, fill: "url(#vm-acier-h)" }, visG);
    el("polygon", { points: Array.from({ length: 6 }, (_, k) => (372 + 13 * Math.cos(k * Math.PI / 3)).toFixed(1) + "," + (CL.y - 20 + 13 * Math.sin(k * Math.PI / 3)).toFixed(1)).join(" "),
      fill: "url(#vm-acier)", stroke: D.BLEU, "stroke-width": 2 }, visG);
    const fente = el("line", { stroke: D.BLEU, "stroke-width": 3, "stroke-linecap": "round" }, visG);
    // l'huile du réservoir
    const cid = "hs-clip-" + uid;
    el("rect", { x: RI.x, y: RI.y, width: RI.l, height: RI.h, rx: RI.r }, el("clipPath", { id: cid }, g));
    let niv = 0.45;
    const nappe = D.liquide(el("g", { "clip-path": "url(#" + cid + ")" }, g),
      { x0: RI.x, x1: RI.x + RI.l, yh: R_FOND - R_NH, yb: R_FOND, niveau: () => niv, couleur: () => HUILE, opacite: 0.86, pas: 8 });
    // ce qui bouge : gouttes et gaz qui arrivent, gaz du réservoir (plus il y en a, plus la pression monte),
    // gaz qui passe le clapet, gaz de l'aspiration, huile qui file vers les régulateurs
    const alea = D.alea(29);
    const gouttes = Array.from({ length: 5 }, (_, k) => ({ ph: k / 5, dx: -6 + alea() * 12, c: el("circle", { r: 4.2, fill: HUILE, stroke: HUILE_FONCE, "stroke-width": 1 }, g) }));
    const molG = (coul, r) => el("circle", { r: r || 5, fill: coul, stroke: D.BLEU, "stroke-width": 1.2, "stroke-opacity": 0.45, opacity: 0 }, g);
    const arrivee = Array.from({ length: 4 }, (_, k) => ({ ph: k / 4, c: molG(GAZ_R) }));
    const dedans = Array.from({ length: 14 }, () => ({ a: alea(), b: alea(), c2: alea(), d: alea(), c: molG(GAZ_R) }));
    const surClapet = chemin([[150, BM], [CL.x + 6, BM], [SIEGE_X + 2, BM], [CLAPET_X + 4, BM], [CLAPET_X + 12, CL.y + 22], [CL.x + CL.l - 24, CL.y + 22], [CL.x + CL.l - 8, BM], [W + 10, BM]]);
    const passe = Array.from({ length: 7 }, (_, k) => ({ ph: k / 7, c: molG(GAZ_R, 4.5) }));
    const aspi = Array.from({ length: 6 }, (_, k) => ({ ph: k / 6, c: molG(GAZ_BP) }));
    const filets = Array.from({ length: 5 }, () => el("line", { stroke: "#fff", "stroke-width": 3.5, "stroke-linecap": "round", opacity: 0 }, g));
    // les instruments et les mots, hors des tracés
    const pg = el("g", {}, racine);
    el("rect", { x: 147, y: 132, width: 6, height: RS.y - 132 + 4, fill: "url(#vm-acier-h)" }, pg);
    el("rect", { x: 517, y: 132, width: 6, height: BY - 132 + 4, fill: "url(#vm-acier-h)" }, pg);
    const mRes = DS.manometre(pg, 150, 108, 26), mAsp = DS.manometre(pg, 520, 108, 26);
    const mot = (x, y, s, ancre) => D.texte(pg, x, y, s, { "text-anchor": ancre, "font-size": 20, "font-weight": 700, fill: D.BLEU, "font-family": "Calibri, Arial, sans-serif", class: "ds-pastille" });
    mot(182, 114, "réservoir", "start"); mot(488, 114, "aspiration", "end");
    pastille(pg, 96, 30, "du séparateur", HUILE_FONCE, "start");
    pastille(pg, W - 4, 152, "BP", BP, "end");
    pastille(pg, W - 4, 452, "vers les régulateurs", HUILE_FONCE, "end");
    // la loupe sur le clapet (le même dessin, vivant)
    const L = { x: 350, y: BM, cx: 420, cy: 300, r: 66, k: 2.2 }, lg = el("g", {}, racine), lid = "hs-loupe-" + uid;
    const ux = L.cx - L.x, uy = L.cy - L.y, nn = Math.hypot(ux, uy), rv = L.r / L.k;
    el("line", { x1: (L.x + ux / nn * rv).toFixed(1), y1: (L.y + uy / nn * rv).toFixed(1), x2: (L.cx - ux / nn * (L.r + 5)).toFixed(1), y2: (L.cy - uy / nn * (L.r + 5)).toFixed(1), stroke: D.BLEU, "stroke-width": 2.5, "stroke-dasharray": "6 5" }, lg);
    el("circle", { cx: L.x, cy: L.y, r: rv, fill: "none", stroke: D.BLEU, "stroke-width": 2.5, "stroke-dasharray": "6 5" }, lg);
    el("circle", { cx: L.cx, cy: L.cy, r: L.r }, el("clipPath", { id: lid }, lg));
    el("circle", { cx: L.cx, cy: L.cy, r: L.r, fill: "#fbf7f0" }, lg);
    el("use", { href: "#hs-coupe-" + uid, transform: "translate(" + L.cx + " " + L.cy + ") scale(" + L.k + ") translate(" + (-L.x) + " " + (-L.y) + ")" }, el("g", { "clip-path": "url(#" + lid + ")" }, lg));
    el("circle", { cx: L.cx, cy: L.cy, r: L.r + 2, fill: "none", stroke: D.BLEU, "stroke-width": 4 }, lg);
    mot(L.cx + L.r + 10, L.cy + 7, "le clapet", "start");
    const zone = anneaux(el("g", {}, racine), 2);
    let phase = 0, tPrec = 0;

    function maj(e, t, info) {
      niv = bn(e.niveau === undefined ? 0.45 : e.niveau, 0, 1);
      nappe.maj(t);
      const pres = bn(e.pres || 0, 0, 1), tarage = bn(e.tarage === undefined ? 0.6 : e.tarage, 0, 1);
      const gazIn = bn(e.gazIn || 0, 0, 1), vis = bn(e.vis || 0, 0, 1), alim = e.alim === undefined ? 1 : bn(e.alim, 0, 1);
      const ouv = bn((pres - tarage) / 0.12, 0, 1), flot = bn(pres / 0.5, 0, 1) * alim;
      // le clapet mobile recule de son siège ; le ressort va de lui à son appui (que la vis rapproche)
      const xc = CLAPET_X + LEVEE * ouv, xa = 378 - 16 * vis;
      clapet.setAttribute("x", xc.toFixed(1));
      appui.forEach((a, k) => { a.setAttribute("x", xa.toFixed(1)); a.setAttribute("y", k ? BM + 9 : BM - 23); });
      const x0 = xc + 9, n = 7, pts = [[x0, BM]];
      for (let i = 1; i < 2 * n; i++) pts.push([x0 + (xa - x0) * i / (2 * n), BM + (i % 2 ? -13 : 13)]);
      pts.push([xa, BM]);
      ressort.setAttribute("points", pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "));
      visG.setAttribute("opacity", bn(e.reglable || 0, 0, 1).toFixed(2));
      const av = vis * Math.PI * 1.5;
      fente.setAttribute("x1", (372 - 8 * Math.cos(av)).toFixed(1)); fente.setAttribute("y1", (CL.y - 20 - 8 * Math.sin(av)).toFixed(1));
      fente.setAttribute("x2", (372 + 8 * Math.cos(av)).toFixed(1)); fente.setAttribute("y2", (CL.y - 20 + 8 * Math.sin(av)).toFixed(1));
      // les pressions : l'aspiration ne bouge pas ; le réservoir est au-dessus de l'écart
      mAsp.maj(0.25); mRes.maj(0.25 + 0.55 * pres);
      // ce qui arrive du séparateur
      gouttes.forEach(gt => {
        const q = frac(gt.ph + t / 2.6), x = 70 + gt.dx, y1 = nappe.surface(x, t);
        gt.c.setAttribute("cx", x.toFixed(1)); gt.c.setAttribute("cy", lerp(-6, y1, q * q).toFixed(1));
        gt.c.setAttribute("opacity", (gazIn * (q < 0.94 ? 1 : (1 - q) / 0.06)).toFixed(2));
      });
      arrivee.forEach(m => {
        const q = frac(m.ph + t / 2.2);
        m.c.setAttribute("cx", (70 + 4 * Math.sin(t * 3 + m.ph * 9)).toFixed(1)); m.c.setAttribute("cy", lerp(-6, RI.y + 30, q).toFixed(1));
        m.c.setAttribute("opacity", (gazIn * 0.9 * D.fenetre(q, 0, 1, 0.15)).toFixed(2));
      });
      // le gaz du réservoir : plus l'écart monte, plus il y a de molécules
      const surf = R_FOND - niv * R_NH, nb = 3 + 11 * pres;
      dedans.forEach((m, k) => {
        const x = RI.x + 14 + (RI.l - 28) * (0.5 + 0.45 * Math.sin(t * (0.5 + m.a * 0.6) + m.b * 6.3));
        const y = RI.y + 14 + (surf - RI.y - 30) * (0.5 + 0.45 * Math.sin(t * (0.6 + m.c2 * 0.7) + m.d * 6.3));
        m.c.setAttribute("cx", x.toFixed(1)); m.c.setAttribute("cy", y.toFixed(1));
        m.c.setAttribute("opacity", (k < nb ? 0.9 * bn(nb - k, 0, 1) : 0).toFixed(2));
      });
      passe.forEach(m => {
        const [x, y] = surClapet(frac(m.ph + t / 2.4));
        m.c.setAttribute("cx", x.toFixed(1)); m.c.setAttribute("cy", y.toFixed(1)); m.c.setAttribute("opacity", (0.95 * ouv).toFixed(2));
      });
      aspi.forEach(m => {
        const x = CL.x + CL.l + frac(m.ph + t / 3.2) * (W - CL.x - CL.l);
        m.c.setAttribute("cx", x.toFixed(1)); m.c.setAttribute("cy", (BM + 4 * Math.sin(t * 2 + m.ph * 7)).toFixed(1)); m.c.setAttribute("opacity", 0.85);
      });
      phase += Math.max(0, t - tPrec) * 0.5 * flot; tPrec = t;   // l'huile file d'autant plus vite que l'écart est grand
      filets.forEach((f, k) => {
        const x = RI.x + RI.l + 6 + frac(k / 5 + phase) * (W - RI.x - RI.l - 30);
        f.setAttribute("x1", x.toFixed(1)); f.setAttribute("x2", (x + 22).toFixed(1)); f.setAttribute("y1", OY + BH / 2); f.setAttribute("y2", OY + BH / 2);
        f.setAttribute("opacity", (flot > 0.03 ? 0.8 : 0).toFixed(2));
      });
      const z = info && info.agit;
      const Z = {
        reservoir: [[RS.x - 6, RS.y - 6, RS.l + 12, RS.h + 12]], branche: [[RI.x + RI.l - 4, CL.y - 6, W - RI.x - RI.l + 2, CL.h + 12]],
        clapet: [[CL.x - 6, CL.y - 6, CL.l + 12, CL.h + 12], [L.cx - L.r - 7, L.cy - L.r - 7, 2 * L.r + 14, 2 * L.r + 14]],
        ressort: [[xc + 4, BM - 22, xa - xc + 6, 44], [L.cx - L.r - 7, L.cy - L.r - 7, 2 * L.r + 14, 2 * L.r + 14]],
        vis: [[355, CL.y - 38, 34, 36]], huile: [[RI.x + RI.l - 4, OY - 8, W - RI.x - RI.l + 2, BH + 16]],
        manometres: [[118, 76, 64, 64], [488, 76, 64, 64]]
      };
      zone(z && Z[z] ? Z[z] : null, t);
    }
    return { maj: maj };
  }
  /* les pas à pas du clapet : un par sens d'écran (visual.programme) */
  const CLAPET = {
    cycle: [
      { nom: "Le gaz arrive", dire: "Avec l’huile du séparateur arrive un peu de gaz : la pression du réservoir monte.", agit: "reservoir", cible: { pres: 0.5 }, duree: 3.4 },
      { nom: "Le ressort tient", dire: "Tant que l’écart reste sous le tarage, le ressort garde le clapet fermé.", agit: "ressort", cible: { pres: 0.6 }, duree: 3 },
      { nom: "Le clapet s’ouvre", dire: "L’écart dépasse le tarage : le clapet s’ouvre, l’excès de gaz part vers l’aspiration.", agit: "clapet", cible: { pres: 0.8 }, duree: 3.4 },
      { nom: "L’écart est tenu", dire: "La pression revient à l’écart réglé : le clapet se referme. Cet écart pousse l’huile vers les régulateurs.", agit: "huile", cible: { pres: 0.6 }, duree: 3.6 }
    ],
    branches: [
      { nom: "La branche de pression", dire: "En haut, le clapet relie le gaz du réservoir à l’aspiration : il tient l’écart de pression.", agit: "branche", cible: { pres: 0.7 }, duree: 3.4 },
      { nom: "La branche d’huile", dire: "En bas, l’huile liquide part vers le filtre et les régulateurs : elle ne traverse pas le clapet.", agit: "huile", cible: { pres: 0.62 }, duree: 3.6 }
    ],
    reglable: [
      { nom: "Clapet fixe", dire: "Clapet fixe : son ressort est étalonné en usine. L’écart est celui de la notice.", agit: "ressort", cible: { pres: 0.66 }, duree: 3.4 },
      { nom: "Clapet réglable", dire: "Clapet réglable : la vis comprime le ressort et l’écart augmente, dans la plage de la notice.", agit: "vis", cible: { reglable: 1, vis: 1, tarage: 0.8 }, duree: 3.8 }
    ],
    force: [
      { nom: "Même pression", dire: "Réservoir et carter à la même pression : l’huile ne part pas.", agit: "manometres", cible: { pres: 0, gazIn: 0 }, duree: 3 },
      { nom: "Un écart", dire: "La pression du réservoir dépasse celle du carter : l’huile file vers les régulateurs.", agit: "huile", cible: { pres: 0.6, gazIn: 1 }, duree: 3.6 },
      { nom: "Le clapet le tient", dire: "Le clapet différentiel garde cet écart au-dessus de l’aspiration.", agit: "clapet", cible: { pres: 0.64 }, duree: 3.2 }
    ],
    ecart: [
      { nom: "Lire les deux pressions", dire: "On relève la pression du réservoir et celle de l’aspiration : leur écart pousse l’huile.", agit: "manometres", cible: { pres: 0.6 }, duree: 3.2 },
      { nom: "Écart trop faible", dire: "Écart trop faible : l’huile arrive mal, le carter reste bas.", agit: "huile", cible: { pres: 0.12, tarage: 0.12 }, duree: 3.4 },
      { nom: "Écart trop fort", dire: "Écart trop fort : l’huile entre trop brutalement, le régulateur devient instable.", agit: "huile", cible: { pres: 0.95, tarage: 0.95 }, duree: 3.4 }
    ],
    mesure: [
      { nom: "Relever", dire: "En régime stable, on relève la pression du réservoir et celle de l’aspiration.", agit: "manometres", cible: { pres: 0.6 }, duree: 3.2 },
      { nom: "Comparer", dire: "On compare leur écart à la valeur prescrite pour le clapet et les régulateurs.", agit: "clapet", cible: { pres: 0.62 }, duree: 3.2 },
      { nom: "Puis vérifier", dire: "Ensuite seulement : sens de montage, raccordements, stabilité, absence de fuite.", agit: "branche", cible: { pres: 0.62 }, duree: 3.4 }
    ]
  };
  const CLAPET_INIT = { cycle: { pres: 0.15, gazIn: 1 }, branches: { pres: 0.62, gazIn: 1 }, reglable: { pres: 0.66, gazIn: 1 },
    force: { pres: 0, gazIn: 0 }, ecart: { pres: 0.6, gazIn: 1 }, mesure: { pres: 0.6, gazIn: 1 } };

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
  /* le diagnostic (station 16) : le bon retour, puis les deux pannes du séparateur à flotteur */
  const PANNES = {
    aria: "Coupe animée du séparateur à flotteur : un retour normal, puis un flotteur bloqué qui laisse l’huile s’entasser, puis un pointeau qui fuit et laisse le gaz chaud filer vers le carter.",
    init: { flux: 1, chute: 1, gaz: 1, niveau: 0.45, pousse: 0, bloque: 0, fuite: 0 },
    etapes: [
      { nom: "Le bon retour", dire: "Le niveau monte, le pointeau s’ouvre, l’huile repart : le retour coule par moments.", agit: "pointeau", cible: { niveau: 0.78 }, duree: 3.4 },
      { nom: "Flotteur bloqué", dire: "Le flotteur reste en bas : le pointeau ne s’ouvre plus. L’huile s’entasse et ne revient pas au carter.", agit: "flotteur", cible: { bloque: 1, niveau: 0.97 }, duree: 3.4 },
      { nom: "Pointeau qui fuit", dire: "Une impureté empêche le pointeau de fermer : l’huile part, puis le gaz chaud file vers le carter. Le retour reste chaud.", agit: "huile", cible: { bloque: 0, fuite: 1, niveau: 0.05 }, duree: 4 }
    ]
  };
  function jouer(hote, def, o, dessiner) {
    hote.classList.add("huile-scene");
    return DS.jouer(hote, { init: def.init, etapes: def.etapes, construire: d => (dessiner || coupe)(DS.svg(d, "ds-svg", def.aria), o).maj });
  }
  function jouerClapet(hote, visual) {
    const p = visual && CLAPET[visual.programme] ? visual.programme : "cycle";
    return jouer(hote, {
      aria: "Coupe animée du réservoir d’huile et de son clapet taré : en haut, la branche de pression rejoint l’aspiration à travers le clapet ; en bas, l’huile part vers les régulateurs. Deux manomètres comparent les pressions.",
      init: Object.assign({ pres: 0, tarage: 0.6, gazIn: 1, vis: 0, reglable: 0, alim: 1, niveau: 0.45 }, CLAPET_INIT[p]), etapes: CLAPET[p]
    }, {}, coupeClapet);
  }
  window.HUILE_SCENES = {
    "separateur-chemins": (hote, visual, outils) => jouer(hote, CHEMINS, { retour: ["retour d’huile", HUILE_FONCE], symbole: outils && outils.symboleSeparateur }),
    "separateur-flotteur": hote => jouer(hote, FLOTTEUR, { retour: ["carter · BP", BP],
      loupe: { x: AXE, y: 368, cx: 535, cy: 280, r: 88, k: 2.6, mot: "le pointeau" } }),
    "separateur-pannes": hote => jouer(hote, PANNES, { retour: ["carter · BP", BP],
      loupe: { x: AXE, y: 372, cx: 535, cy: 280, r: 88, k: 2.6, mot: "le pointeau" } }),
    "clapet": jouerClapet
  };
})();

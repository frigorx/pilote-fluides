/* Type "coupe" : vue en coupe animée d'un pressostat (côté bp, hp ou combine).
   Contrat : PressostatDessins.creer("coupe", { cote, valeurs, echelles, reperes, accent, label }) rend { noeud, regler, reperes }.
   regler({ bp: { p, ouvert }, hp: { p, ouvert }, appui }) accepte un état partiel, ne plante jamais.
   Le dessin affiche ce qu'on lui donne : la logique des seuils est dans le moteur de la page.
   Mouvement : soufflet, tige rigide, bras (-3° à +3° selon la pression) et ressorts en 250 ms ; bascule et contact en 80 ms avec le « clac » (400 ms).
   Rend aussi forces: true (le moteur écrit la légende des deux flèches sous le dessin).
   Dépend de dessins-base.js (palette, el, racine, etiquette, degrade). Aucune image, aucune dépendance. */
(function () {
  "use strict";
  var B = window.PressostatDessins;
  if (!B) return;
  var C = B.C, el = B.el, RAD = Math.PI / 180, MARINE = C.marine, ACIER_FONCE = "#6e7a87";
  var NOMS = { 1: "Soufflet BP", 2: "Tige", 3: "Grand ressort BP", 4: "Ressort de différentiel", 5: "Bascule", 6: "Contacts", 7: "Vis de plage", 8: "Vis de différentiel", 9: "Bouton de réarmement", 10: "Raccord et capillaire", 11: "Soufflet HP", 12: "Grand ressort HP" };

  /* ---------- petites aides ---------- */
  var ctxMes = null;
  function largeur(txt, taille, gras) {
    try {
      if (!ctxMes) ctxMes = document.createElement("canvas").getContext("2d");
      ctxMes.font = (gras ? "700 " : "500 ") + taille + "px " + B.POLICE;
      return ctxMes.measureText(txt).width * 1.05;
    } catch (e) { return txt.length * taille * 0.56; }
  }
  function fmt(v, d) { return v.toFixed(d).replace(".", ",").replace("-", "−"); }
  function bornes(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function pts(liste) { return liste.map(function (p) { return (Math.round(p[0] * 10) / 10) + "," + (Math.round(p[1] * 10) / 10); }).join(" "); }
  function reduit() { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } }

  /* Étiquette sur plusieurs lignes (fond papier, bord de couleur). Rend { w, h }. */
  function bloc(parent, x, y, lignes, taille, bord) {
    var pad = 11, lh = Math.round(taille * 1.2), w = 0, g = el("g", { class: "etiquette" }, parent);
    lignes.forEach(function (l) { w = Math.max(w, largeur(l, taille)); });
    w = Math.ceil(w + 2 * pad);
    var h = lh * lignes.length + 2 * pad - 2;
    el("rect", { x: x, y: y, width: w, height: h, rx: 9, fill: C.papier, stroke: bord || MARINE, "stroke-width": 3.5 }, g);
    lignes.forEach(function (l, i) { B.texte(g, x + pad, y + pad + taille * 0.82 + i * lh - 1, l, { "font-size": taille, "font-weight": 500 }); });
    return { w: w, h: h };
  }

  /* Pastille numérotée agrandie (lisible sur téléphone). */
  function repere(parent, x, y, n, r, fs) {
    var g = el("g", { class: "repere" }, parent);
    el("circle", { cx: x, cy: y, r: r, fill: MARINE, stroke: C.blanc, "stroke-width": 3 }, g);
    B.texte(g, x, y + fs * 0.35, String(n), { "text-anchor": "middle", "font-size": fs, "font-weight": 700, fill: C.blanc });
    return g;
  }

  function trait(g, xa, ya, xb, yb, w, col, bord, lum) {
    var a = { x1: xa, y1: ya, x2: xb, y2: yb, "stroke-linecap": "round" };
    el("line", Object.assign({ stroke: MARINE, "stroke-width": w + bord }, a), g);
    el("line", Object.assign({ stroke: col, "stroke-width": w }, a), g);
    if (lum) el("line", { x1: xa, y1: ya - w * 0.2, x2: xb, y2: yb - w * 0.2, stroke: "#e6ebf0", "stroke-width": Math.max(1.3, w * 0.26), "stroke-linecap": "round" }, g);
  }

  /* Ressort hélicoïdal vu de côté : brins arrière sombres, brins avant clairs. */
  function helice(g, x, y0, y1, R, fil, n) {
    g.textContent = "";
    var p = (y1 - y0 - fil) / n, ya = y0 + fil / 2, i;
    for (i = 0; i < n; i++) trait(g, x + R, ya + i * p + p / 2, x - R, ya + (i + 1) * p, fil * 0.85, ACIER_FONCE, 2.5, false);
    for (i = 0; i < n; i++) trait(g, x - R, ya + i * p, x + R, ya + i * p + p / 2, fil, C.acier, 3, true);
  }

  function pointsFleche(x, yBase, long, sw, hw, hh, haut) {
    var s = haut ? -1 : 1, yH = yBase + s * (long - hh), yT = yBase + s * long;
    return pts([[x - sw / 2, yBase], [x - sw / 2, yH], [x - hw / 2, yH], [x, yT], [x + hw / 2, yH], [x + sw / 2, yH], [x + sw / 2, yBase]]);
  }
  function fleche(g, x, yBase, long, sw, hw, hh, haut, attrs) {
    return el("polygon", Object.assign({ points: pointsFleche(x, yBase, long, sw, hw, hh, haut), "stroke-linejoin": "round" }, attrs), g);
  }

  /* Tête de vis fendue au-dessus du boîtier + tige filetée jusqu'à la coupelle. */
  function vis(svg, G, x, yMur, yBas) {
    var g = el("g", null, svg), y;
    el("rect", { x: x - 7, y: yMur - 4, width: 14, height: yBas - yMur + 4, fill: G.acierH, stroke: MARINE, "stroke-width": 2 }, g);
    for (y = yMur + 8; y < yBas - 4; y += 8) el("line", { x1: x - 7, y1: y + 4, x2: x + 7, y2: y, stroke: MARINE, "stroke-width": 1.4 }, g);
    el("rect", { x: x - 21, y: yMur - 20, width: 42, height: 20, rx: 5, fill: G.acierV, stroke: MARINE, "stroke-width": 3 }, g);
    el("line", { x1: x - 12, y1: yMur - 10, x2: x + 12, y2: yMur - 10, stroke: MARINE, "stroke-width": 3.5, "stroke-linecap": "round" }, g);
    el("line", { x1: x - 18, y1: yMur - 16.5, x2: x + 18, y2: yMur - 16.5, stroke: "#e6ebf0", "stroke-width": 1.8, "stroke-linecap": "round" }, g);
  }

  /* ---------- fabrique ---------- */
  function fabrique(o) {
    o = o || {};
    var cote = o.cote === "hp" ? "hp" : (o.cote === "combine" ? "combine" : "bp"), comb = cote === "combine";
    var V = o.valeurs || {}, VB = V.bp || {}, VH = V.hp || {}, E = o.echelles || {};
    var EB = { min: (E.bp && isFinite(E.bp.min)) ? +E.bp.min : -0.2, max: (E.bp && isFinite(E.bp.max)) ? +E.bp.max : 3 };
    var EH = { min: (E.hp && isFinite(E.hp.min)) ? +E.hp.min : 6, max: (E.hp && isFinite(E.hp.max)) ? +E.hp.max : 18 };
    var manuel = { bp: VB.rearmement === "manuel", hp: VH.rearmement !== "auto" };
    var accent = o.accent === "levier" || o.accent === "bouton" ? o.accent : null;

    var sc = comb ? { W: 900, H: 620, bx: 30, by: 70, bw: 840, bh: 450 } : { W: 560, H: 680, bx: 40, by: 58, bw: 480, bh: 500 };
    sc.yTop = sc.by + 12; sc.yFloor = sc.by + sc.bh - 12; sc.xi0 = sc.bx + 12; sc.xi1 = sc.bx + sc.bw - 12; sc.yPied = sc.by + sc.bh;
    var T = comb ? 32 : 26;                       /* taille des étiquettes */
    var svg = B.racine(sc.W, sc.H, o.label || (comb ? "Vue en coupe d'un pressostat combiné HP et BP" : "Vue en coupe d'un pressostat " + (cote === "bp" ? "basse pression" : "haute pression")));
    B.filigrane(svg, comb ? [[190, 570], [720, 570]] : [[410, 626]], comb ? 520 : 420);

    var G = {
      laitonV: B.degrade(svg, "#ecc872", C.laitonFonce, false), laitonH: B.degrade(svg, "#ecc872", C.laitonFonce, true),
      acierV: B.degrade(svg, "#dfe4ea", C.acier, false), acierH: B.degrade(svg, "#dfe4ea", C.acier, true),
      cuivreV: B.degrade(svg, "#e49a5c", "#a85d28", false), boitier: B.degrade(svg, "#e2e7ec", C.boitierFonce, false),
      vert: B.degrade(svg, "#58b985", "#1f6b40", false), orange: B.degrade(svg, "#ff9a6c", "#e6501c", false), grisCoul: B.degrade(svg, "#b9c0c8", "#8a939d", false)
    };

    /* boîtier : tôle en coupe, vis qui dépassent, raccord dessous */
    [sc.by + 56, sc.by + sc.bh - 96].forEach(function (y) {
      [sc.bx - 22, sc.bx + sc.bw - 8].forEach(function (x) {
        el("rect", { x: x, y: y, width: 30, height: 40, rx: 9, fill: G.boitier, stroke: MARINE, "stroke-width": 3 }, svg);
        el("circle", { cx: x < sc.bx ? x + 11 : x + 19, cy: y + 20, r: 6, fill: C.creme, stroke: MARINE, "stroke-width": 2.2 }, svg);
      });
    });
    el("rect", { x: sc.bx, y: sc.by, width: sc.bw, height: sc.bh, rx: 26, fill: G.boitier, stroke: MARINE, "stroke-width": 3 }, svg);
    el("rect", { x: sc.bx + 8, y: sc.by + 3, width: sc.bw - 16, height: 5, rx: 2.5, fill: C.blanc, opacity: 0.55 }, svg);
    el("rect", { x: sc.xi0, y: sc.yTop, width: sc.xi1 - sc.xi0, height: sc.yFloor - sc.yTop, rx: 14, fill: C.interieur, "fill-opacity": 0.86, stroke: MARINE, "stroke-width": 2 }, svg);
    B.filigrane(svg, comb ? [[450, 330]] : [[290, 330]], comb ? 520 : 420);   /* exemplaire dans le boîtier, sous les pièces */

    /* ---------- configuration des colonnes ---------- */
    var cols = [], PV = 22, G_OUV = 28, LR = 68;   /* hauteur de la chape de la bascule au-dessus du bras */
    function cfg(id, base) {
      var bp = id === "bp", c = Object.assign({
        id: id, cote: id, bp: bp, dir: bp ? 1 : -1, W: bp ? 110 : 62, amp: bp ? 17 : 10, H0: bp ? 128 : 106, fil: bp ? 4 : 8, nsp: bp ? 8 : 6, R: 32,
        couleur: bp ? C.bp : C.hp, pale: bp ? C.bpPale : C.hpPale, man: manuel[id], E: bp ? EB : EH
      }, base);
      c.xc = c.x0 + c.s * c.uT;
      c.xB = c.x0 + c.s * c.uBase;
      return c;
    }
    if (comb) {
      cols.push(cfg("bp", { s: 1, x0: 56, py: 260, uT: 145, uD: 210, uB: 258, uE: 272, uBase: 372, xFinBloc: 440 }));
      cols.push(cfg("hp", { s: -1, x0: 844, py: 260, uT: 145, uD: 0, uB: 258, uE: 272, uBase: 372, xFinBloc: 460 }));
    } else {
      cols.push(cfg(cote, { s: 1, x0: 66, py: 300, uT: 145, uD: cote === "bp" ? 220 : 0, uB: 270, uE: 284, uBase: 420, xFinBloc: sc.xi1 }));
    }

    function P(c, a, u, v) { return [c.x0 + c.s * (u * Math.cos(a) - v * Math.sin(a)), c.py + u * Math.sin(a) + v * Math.cos(a)]; }
    /* contacts au centre (combine) : bornes et câble, posés avant les colonnes */
    if (comb) {
      var yb0 = sc.yTop + 16;
      el("rect", { x: 450 - 4, y: yb0 + 58, width: 8, height: sc.yPied + 10 - (yb0 + 58), fill: C.acier, stroke: MARINE, "stroke-width": 2 }, svg);
      el("rect", { x: 392, y: yb0, width: 116, height: 58, rx: 8, fill: C.papier, stroke: MARINE, "stroke-width": 3 }, svg);
      [422, 450, 478].forEach(function (x) {
        el("rect", { x: x - 14, y: yb0 - 12, width: 28, height: 14, rx: 4, fill: G.acierV, stroke: MARINE, "stroke-width": 2.5 }, svg);
        el("line", { x1: x - 8, y1: yb0 - 5, x2: x + 8, y2: yb0 - 5, stroke: MARINE, "stroke-width": 3, "stroke-linecap": "round" }, svg);
        el("rect", { x: x - 5, y: yb0 + 2, width: 10, height: 18, fill: G.cuivreV, stroke: MARINE, "stroke-width": 2 }, svg);
      });
      /* entrée de câble : collerette, cône de caoutchouc, câble qui sort du cadre */
      var wb = sc.yPied;
      el("rect", { x: 443, y: wb + 40, width: 14, height: sc.H - wb - 40, fill: G.grisCoul, stroke: MARINE, "stroke-width": 2.5 }, svg);
      el("polygon", { points: pts([[422, wb + 9], [478, wb + 9], [464, wb + 44], [436, wb + 44]]), fill: "#7b8794", stroke: MARINE, "stroke-width": 3, "stroke-linejoin": "round" }, svg);
      el("rect", { x: 414, y: wb - 2, width: 72, height: 12, rx: 4, fill: G.acierV, stroke: MARINE, "stroke-width": 3 }, svg);
    }

    /* ---------- une colonne ---------- */
    function colonne(c) {
      var s = c.s, dir = c.dir, g = el("g", { class: "colonne-" + c.id }, svg);
      var wb = sc.yPied, yS = c.py - 128, Rd = 15;
      c.kyC = c.bp ? c.py - 2 : c.py - 30;                 /* hauteur du poussoir de la bascule, contact fermé */
      c.kyO = c.kyC - dir * G_OUV;                          /* contact ouvert : la lame est levée de G_OUV */
      c.yB = c.kyC + dir * 10; c.xTip = c.x0 + s * (c.uB + 60);
      c.Lrod = (sc.yFloor - (c.H0 + 15)) - 8 - (c.py + 7);

      /* raccord, embout, capillaire : tout en bas */
      c.canalEls = [];
      var xe = c.xc, ye = wb + (comb ? 44 : 44), xs = s > 0 ? 0 : sc.W;
      el("path", { d: "M" + xe + " " + ye + " L" + xe + " " + (ye + 16) + " Q" + xe + " " + (ye + 34) + " " + (xe - s * 26) + " " + (ye + 34) + " L" + xs + " " + (ye + 34), fill: "none", stroke: MARINE, "stroke-width": 10, "stroke-linecap": "round" }, g);
      el("path", { d: "M" + xe + " " + ye + " L" + xe + " " + (ye + 16) + " Q" + xe + " " + (ye + 34) + " " + (xe - s * 26) + " " + (ye + 34) + " L" + xs + " " + (ye + 34), fill: "none", stroke: C.cuivre, "stroke-width": 6, "stroke-linecap": "round" }, g);
      c.canalEls.push(el("path", { d: "M" + xe + " " + ye + " L" + xe + " " + (ye + 16) + " Q" + xe + " " + (ye + 34) + " " + (xe - s * 26) + " " + (ye + 34) + " L" + xs + " " + (ye + 34), fill: "none", stroke: c.couleur, "stroke-width": 2.6, "stroke-linecap": "round" }, g));
      el("rect", { x: xe - 27, y: wb - 1, width: 54, height: 27, rx: 4, fill: G.laitonH, stroke: MARINE, "stroke-width": 3 }, g);
      el("line", { x1: xe - 9, y1: wb, x2: xe - 9, y2: wb + 25, stroke: MARINE, "stroke-width": 2 }, g);
      el("line", { x1: xe + 9, y1: wb, x2: xe + 9, y2: wb + 25, stroke: MARINE, "stroke-width": 2 }, g);
      el("rect", { x: xe - 13, y: wb + 26, width: 26, height: 18, fill: G.laitonH, stroke: MARINE, "stroke-width": 3 }, g);
      [31, 37, 43].forEach(function (y) { el("line", { x1: xe - 13, y1: wb + y - 3, x2: xe + 13, y2: wb + y, stroke: MARINE, "stroke-width": 1.5 }, g); });
      c.canalEls.push(el("rect", { x: xe - 5, y: sc.yFloor - 8, width: 10, height: ye - sc.yFloor + 10, fill: c.couleur }, g));
      el("line", { x1: xe - 5, y1: sc.yFloor - 8, x2: xe - 5, y2: ye, stroke: MARINE, "stroke-width": 1.8 }, g);
      el("line", { x1: xe + 5, y1: sc.yFloor - 8, x2: xe + 5, y2: ye, stroke: MARINE, "stroke-width": 1.8 }, g);

      /* soufflet (dynamique) : intérieur, deux flancs plissés, plateau, flèche de pression */
      el("rect", { x: c.xc - c.W / 2 - 12, y: sc.yFloor - 8, width: c.W + 24, height: 8, rx: 2, fill: G.laitonV, stroke: MARINE, "stroke-width": 2.5 }, g);
      c.sIn = el("polygon", { fill: c.couleur, stroke: "none" }, g);
      c.sLm = el("polyline", { fill: "none", stroke: MARINE, "stroke-width": 8, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
      c.sRm = el("polyline", { fill: "none", stroke: MARINE, "stroke-width": 8, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
      c.sL = el("polyline", { fill: "none", stroke: C.laiton, "stroke-width": 4.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
      c.sR = el("polyline", { fill: "none", stroke: C.laiton, "stroke-width": 4.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
      c.sLh = el("polyline", { fill: "none", stroke: "#f6dd9a", "stroke-width": 1.5, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0.9 }, g);
      c.sRh = el("polyline", { fill: "none", stroke: "#f6dd9a", "stroke-width": 1.5, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0.9 }, g);
      c.fleche = fleche(g, c.xc, 0, 10, c.bp ? 16 : 10, c.bp ? 38 : 26, c.bp ? 26 : 18, true, { fill: c.couleur, stroke: MARINE, "stroke-width": 2.5 });
      c.plateau = el("g", null, g);
      el("rect", { x: c.xc - 11, y: -8, width: 22, height: 9, rx: 2, fill: G.laitonV, stroke: MARINE, "stroke-width": 2.5 }, c.plateau);
      el("rect", { x: c.xc - c.W / 2, y: 0, width: c.W, height: 10, rx: 3, fill: G.laitonV, stroke: MARINE, "stroke-width": 3 }, c.plateau);

      /* vis de plage (tige filetée), coupelle du ressort */
      vis(g, G, c.xc, sc.by, yS - 8);
      if (c.uD) vis(g, G, c.x0 + s * c.uD, sc.by, c.py - 72 - 8);
      el("rect", { x: c.xc - c.R - 9, y: yS - 8, width: 2 * c.R + 18, height: 8, rx: 2, fill: G.acierV, stroke: MARINE, "stroke-width": 2.5 }, g);
      if (c.uD) el("rect", { x: c.x0 + s * c.uD - Rd - 6, y: c.py - 72 - 7, width: 2 * Rd + 12, height: 7, rx: 2, fill: G.acierV, stroke: MARINE, "stroke-width": 2.5 }, g);

      /* contact : isolant, plots, lame */
      var plotProche = c.yB + dir * 5, bA = plotProche + dir * 10, bB = bA + dir * 38;
      var xa = c.xTip - s * 26, xb = c.xFinBloc;
      el("rect", { x: Math.min(xa, xb), y: Math.min(bA, bB), width: Math.abs(xb - xa), height: 38, rx: 6, fill: "#e4e9ef", stroke: MARINE, "stroke-width": 3 }, g);
      el("rect", { x: c.xTip - 13, y: Math.min(plotProche, plotProche + dir * 22), width: 26, height: 22, rx: 2, fill: G.cuivreV, stroke: MARINE, "stroke-width": 2.5 }, g);
      el("ellipse", { cx: c.xTip, cy: plotProche + dir * 1.5, rx: 10, ry: 3, fill: C.acierClair, stroke: MARINE, "stroke-width": 1.8 }, g);
      var ya = dir > 0 ? c.yB - 16 : bA - 6, yb = dir > 0 ? bA + 6 : c.yB + 16;
      el("rect", { x: c.xB - 12, y: ya, width: 24, height: yb - ya, rx: 3, fill: G.cuivreV, stroke: MARINE, "stroke-width": 2.5 }, g);
      el("circle", { cx: c.xB, cy: c.yB, r: 4, fill: C.acierClair, stroke: MARINE, "stroke-width": 1.8 }, g);
      c.lame = el("g", null, g);
      c.lameCorps = el("rect", { x: 0, y: -5, width: 80, height: 10, rx: 4, fill: G.cuivreV, stroke: MARINE, "stroke-width": 2.5 }, c.lame);
      c.lameLis = el("line", { x1: 4, y1: 0, x2: 70, y2: 0, stroke: C.accent, "stroke-width": 3, "stroke-linecap": "round" }, c.lame);
      el("ellipse", { cx: 0, cy: 0, rx: 0, ry: 0 }, c.lame);
      c.lamePlot = el("ellipse", { cx: 0, cy: dir * 7, rx: 9, ry: 3, fill: C.acierClair, stroke: MARINE, "stroke-width": 1.8 }, c.lame);
      /* le « clac » : trois traits qui rayonnent du point de contact */
      c.clac = el("g", { opacity: 0, "pointer-events": "none" }, g);
      [-50, 0, 50].forEach(function (d) {
        var an = (dir > 0 ? -90 : 90) + d, ca = Math.cos(an * RAD), sa = Math.sin(an * RAD), cx = c.xTip, cy = plotProche;
        el("line", { x1: cx + ca * 16, y1: cy + sa * 16, x2: cx + ca * 38, y2: cy + sa * 38, stroke: C.accent, "stroke-width": 5, "stroke-linecap": "round" }, c.clac);
      });

      /* tige rigide : du plateau du soufflet jusqu'au bras */
      c.tige = el("rect", { x: c.xc - 4, y: 0, width: 8, height: 10, fill: G.acierH, stroke: MARINE, "stroke-width": 2 }, g);

      /* ressorts */
      c.gRes = el("g", null, g);
      c.gDif = c.uD ? el("g", null, g) : null;

      /* bras principal : pivot sur la paroi extérieure, siège des ressorts, axe de la bascule */
      var bx = s > 0 ? sc.xi0 : sc.xi1 - 28;
      el("rect", { x: bx, y: c.py - 22, width: 28, height: 44, rx: 4, fill: C.boitierFonce, stroke: MARINE, "stroke-width": 2.5 }, g);
      c.bras = el("g", null, g);
      el("rect", { x: -14, y: -7, width: c.uE + 14, height: 14, rx: 6, fill: G.acierV, stroke: MARINE, "stroke-width": 3 }, c.bras);
      el("rect", { x: c.uT - c.R - 6, y: -12, width: 2 * c.R + 12, height: 6, rx: 2, fill: G.acierV, stroke: MARINE, "stroke-width": 2.2 }, c.bras);
      if (c.uD) el("rect", { x: c.uD - Rd - 5, y: -11, width: 2 * Rd + 10, height: 5, rx: 2, fill: G.acierV, stroke: MARINE, "stroke-width": 2.2 }, c.bras);
      el("rect", { x: c.uB - 8, y: -PV, width: 16, height: PV - 3, rx: 2, fill: G.acierH, stroke: MARINE, "stroke-width": 2.5 }, c.bras);
      el("circle", { cx: c.x0, cy: c.py, r: 10, fill: G.laitonH, stroke: MARINE, "stroke-width": 3 }, g);
      el("circle", { cx: c.x0, cy: c.py, r: 3, fill: MARINE }, g);

      /* bouton de réarmement et verrou (réarmement manuel seulement) */
      if (c.man) {
        c.stemX = c.x0 + s * (c.uB - 41);
        var cap = c.stemX, capY = sc.by - 26;
        if (accent === "bouton") {
          var h = el("circle", { cx: cap, cy: capY + 10, r: 30, fill: C.accent, opacity: 0.3 }, g);
          if (!reduit()) {
            el("animate", { attributeName: "r", values: "26;40;26", dur: "2.6s", repeatCount: "indefinite" }, h);
            el("animate", { attributeName: "opacity", values: "0.36;0.08;0.36", dur: "2.6s", repeatCount: "indefinite" }, h);
          }
        }
        c.pousse = el("g", null, g);
        c.stem = el("rect", { x: cap - 6, y: capY + 14, width: 12, height: 100, fill: G.acierH, stroke: MARINE, "stroke-width": 2.2 }, c.pousse);
        c.verrou = el("polygon", { fill: G.orange, stroke: MARINE, "stroke-width": 3, "stroke-linejoin": "round" }, c.pousse);
        el("path", { d: "M" + (cap - 19) + " " + (capY + 26) + " L" + (cap - 19) + " " + (capY + 12) + " Q" + (cap - 19) + " " + capY + " " + cap + " " + capY + " Q" + (cap + 19) + " " + capY + " " + (cap + 19) + " " + (capY + 12) + " L" + (cap + 19) + " " + (capY + 26) + " Z", fill: accent === "bouton" ? G.orange : G.vert, stroke: MARINE, "stroke-width": 3, "stroke-linejoin": "round" }, c.pousse);
        el("path", { d: "M" + (cap - 12) + " " + (capY + 8) + " Q" + cap + " " + (capY + 1) + " " + (cap + 12) + " " + (capY + 8), fill: "none", stroke: C.blanc, "stroke-width": 2, "stroke-linecap": "round", opacity: 0.65 }, c.pousse);
      }

      /* bascule : deux positions stables, pivote au bout du bras */
      c.rocker = el("g", null, g);
      el("rect", { x: -26, y: -7, width: 94, height: 14, rx: 7, fill: G.acierV, stroke: MARINE, "stroke-width": 2.8 }, c.rocker);
      el("circle", { cx: LR, cy: 0, r: 7, fill: C.papier, stroke: MARINE, "stroke-width": 2.2 }, c.rocker);
      el("circle", { cx: 0, cy: 0, r: 5.5, fill: C.acierClair, stroke: MARINE, "stroke-width": 2.2 }, c.rocker);

      /* levier d'essai : languette qui sort par une fente du dessus, près de la bascule */
      var lx = c.x0 + s * (c.uB + 12), ly = sc.yTop + 24, lev = accent === "levier" && (!comb || c.bp), ang = lev ? -38 : -52, L = 86;
      var fx = lx + s * Math.cos(ang * RAD) * ((ly - (sc.by + 6)) / -Math.sin(ang * RAD));
      el("rect", { x: fx - 16, y: sc.by - 1, width: 32, height: 14, rx: 3, fill: C.interieur, stroke: MARINE, "stroke-width": 2 }, g);
      var tip = [lx + s * Math.cos(ang * RAD) * L, ly + Math.sin(ang * RAD) * L];
      if (lev) {
        var hl = el("circle", { cx: tip[0], cy: tip[1], r: 20, fill: C.accent, opacity: 0.3 }, g);
        if (!reduit()) {
          el("animate", { attributeName: "r", values: "18;32;18", dur: "2.6s", repeatCount: "indefinite" }, hl);
          el("animate", { attributeName: "opacity", values: "0.36;0.08;0.36", dur: "2.6s", repeatCount: "indefinite" }, hl);
        }
      }
      var lg = el("g", { transform: "translate(" + lx + " " + ly + ") scale(" + s + " 1) rotate(" + ang + ")" }, g);
      el("rect", { x: -4, y: -6.5, width: L + 4, height: 13, rx: 5, fill: lev ? G.orange : G.acierV, stroke: MARINE, "stroke-width": 3 }, lg);
      el("circle", { cx: 0, cy: 0, r: 9, fill: G.acierH, stroke: MARINE, "stroke-width": 2.8 }, lg);
      el("circle", { cx: 0, cy: 0, r: 2.8, fill: MARINE }, lg);

      /* flèche grise : le ressort retient (longueur fixe) */
      c.xFG = c.xc - s * (c.R + 30);
      fleche(g, c.xFG, yS + 4, 42, 14, 30, 20, false, { fill: C.repos, stroke: MARINE, "stroke-width": 2.5 });

      /* mise à jour dynamique */
      c.maj = function (v, appui) {
        var a = (6 - 12 * v.haut) * RAD, yb = sc.yFloor - 8, n = 12, k, Lp = [], Rp = [], xl = c.xc - c.W / 2, xr = c.xc + c.W / 2;
        var fy = P(c, a, c.uT, 7)[1], yP = fy + c.Lrod + 8, yt = yP + 10, dy = (yb - yt) / n;   /* le plateau suit le bras par la tige rigide */
        for (k = 0; k <= n; k++) { var ins = (k % 2) ? c.amp : 0, y = yb - k * dy; Lp.push([xl + ins, y]); Rp.push([xr - ins, y]); }
        var op = 0.2 + 0.55 * v.f;
        c.sIn.setAttribute("points", pts(Lp.concat(Rp.slice().reverse()))); c.sIn.setAttribute("fill-opacity", op);
        [c.sL, c.sLm, c.sLh].forEach(function (e) { e.setAttribute("points", pts(Lp)); });
        [c.sR, c.sRm, c.sRh].forEach(function (e) { e.setAttribute("points", pts(Rp)); });
        c.canalEls.forEach(function (e) { e.setAttribute(e.tagName === "path" ? "stroke-opacity" : "fill-opacity", Math.min(1, op + 0.15)); });
        c.plateau.setAttribute("transform", "translate(0 " + yP + ")");
        var fl0 = c.bp ? 26 : 22, fl1 = c.bp ? 62 : 44;
        c.fleche.setAttribute("transform", "translate(0 " + (yb - 10) + ")");
        c.fleche.setAttribute("points", pointsFleche(c.xc, 0, fl0 + fl1 * v.f, c.bp ? 16 : 10, c.bp ? 38 : 26, c.bp ? 26 : 18, true));
        /* bras, ressorts, tige */
        c.bras.setAttribute("transform", "translate(" + c.x0 + " " + c.py + ") scale(" + s + " 1) rotate(" + (a / RAD) + ")");
        var pu = P(c, a, c.uT, -12);
        helice(c.gRes, c.xc, yS, pu[1], c.R, c.fil, c.nsp);
        if (c.gDif) { var pd = P(c, a, c.uD, -11); helice(c.gDif, c.x0 + s * c.uD, c.py - 72, pd[1], Rd, 3, 5); }
        c.tige.setAttribute("y", fy - 1); c.tige.setAttribute("height", Math.max(1, yP - 8 - fy + 1));
        /* bascule : son poussoir va au point voulu selon l'état du contact, quelle que soit l'inclinaison du bras */
        var pin = P(c, a, c.uB, -PV), ky = c.kyO + (c.kyC - c.kyO) * v.ferme;
        var al = Math.asin(bornes((ky - pin[1]) / LR, -0.95, 0.95));
        if (c.ldB) { c.ldB.ln.setAttribute("x2", pin[0]); c.ldB.ln.setAttribute("y2", pin[1]); c.ldB.pt.setAttribute("cx", pin[0]); c.ldB.pt.setAttribute("cy", pin[1]); }
        c.rocker.setAttribute("transform", "translate(" + pin[0] + " " + pin[1] + ") scale(" + s + " 1) rotate(" + (al / RAD) + ")");
        var ty = c.yB - dir * G_OUV * (1 - v.ferme), Lb = Math.abs(c.xB - c.xTip), ph = Math.atan2(ty - c.yB, Lb), lon = Math.sqrt(Lb * Lb + (ty - c.yB) * (ty - c.yB));
        c.lame.setAttribute("transform", "translate(" + c.xB + " " + c.yB + ") scale(" + (-s) + " 1) rotate(" + (ph / RAD) + ")");
        c.lameCorps.setAttribute("width", lon + 12); c.lamePlot.setAttribute("cx", lon);
        var ferme = v.ferme > 0.5;
        c.lameCorps.setAttribute("fill", ferme ? G.cuivreV : "#a9b1ba");
        c.lameLis.setAttribute("x2", lon + 6); c.lameLis.setAttribute("opacity", ferme ? 1 : 0);
        if (c.pousse) {
          c.pousse.setAttribute("transform", "translate(0 " + (8 * appui) + ")");
          var eng = 1 - v.ferme, tx = pin[0] - s * 26 * Math.cos(al), tyy = pin[1] - 26 * Math.sin(al);
          var x0 = c.stemX - s * 6, x1 = x0 + s * 12 + (tx + s * 14 - (x0 + s * 12)) * eng, y0 = c.bp ? tyy - 7 - 16 : tyy + 7;
          c.verrou.setAttribute("points", pts([[x0, y0], [x1, y0], [x1, y0 + 16], [x0, y0 + 16]]));
          c.verrou.setAttribute("fill", ferme ? G.grisCoul : G.orange);
          c.stem.setAttribute("height", y0 + 16 - (sc.by - 26 + 14));
        }
      };
      return g;
    }

    cols.forEach(colonne);

    /* ---------- étiquettes ---------- */
    var etatEt = {}, pressEt = {};
    if (!comb) {
      var c0 = cols[0], maxTxt = c0.bp ? "Aspiration : −0,20 bar" : "Refoulement : 18,0 bar", lg = Math.ceil(largeur(maxTxt, T) + 26);
      var T2 = 28;
      if (accent !== "levier" && !o.compact) {  /* compact : pression et état sont écrits sous le dessin par l'outil */
        pressEt[c0.id] = B.etiquette(svg, 372, 664, "", { taille: T, largeur: lg, bord: c0.couleur });
        pressEt[c0.id].firstChild.setAttribute("stroke-width", 3.5);
        etatEt[c0.id] = B.etiquette(svg, 396, 432, "", { taille: T2, largeur: Math.ceil(largeur("Contact ouvert", T2) + 28) });
        etatEt[c0.id].firstChild.setAttribute("stroke-width", 3.5);
      } else if (accent === "levier") bloc(svg, 282, 392, ["Contact ouvert", "à la main"], 28, C.accent);
    }

    /* ---------- repères numérotés ---------- */
    var reperes = [];
    if (o.reperes) {
      var rr = comb ? 28 : 21, fs = comb ? 36 : 26, gp = el("g", { class: "reperes" }, svg), spec = [], prem = cols[0], yMur = sc.by, wb = sc.yPied;
      var add = function (ordre, n, nom, nomSolo, x, y, cx, cy, dyn) { spec.push({ o: ordre, n: n, nom: nom, nomSolo: nomSolo, x: x, y: y, cx: cx, cy: cy, dyn: dyn }); };
      cols.forEach(function (c) {
        var s = c.s, bpq = c.bp, first = c === prem, xD = c.x0 + s * c.uD;
        add(0, bpq ? 1 : 11, bpq ? "Soufflet BP" : "Soufflet HP", "Soufflet", c.xc - s * (c.W / 2 + (comb ? 46 : 52)), sc.yFloor - (comb ? 68 : 76), c.xc - s * (c.W / 2 - 2), sc.yFloor - 68);
        if (first) add(1, 2, "Tige", "Tige", c.xc + s * (comb ? 62 : 67), c.py + (comb ? 58 : 45), c.xc, c.py + 7 + c.Lrod * 0.4);
        add(2, bpq ? 3 : 12, bpq ? "Grand ressort BP" : "Grand ressort HP", "Grand ressort", c.xc - s * (comb ? 81 : 96), c.py - (comb ? 45 : 40), c.xc - s * c.R, c.py - 60);
        if (c.uD) add(3, 4, "Ressort de différentiel", "Ressort de différentiel", comb ? xD + s * 54 : xD, c.py - (comb ? 95 : 170), comb ? xD + s * 15 : xD, comb ? c.py - 40 : c.py - 170);
        if (first) {
          add(4, 5, "Bascule", "Bascule", comb ? c.x0 + s * (c.uB + 81) : c.x0 + s * (c.uB + 50), comb ? c.py - 75 : (bpq ? c.py - 85 : c.py + 45), c.x0 + s * c.uB, c.py - PV, true);
          add(5, 6, "Contacts", "Contacts", comb ? 520 : c.xB - c.s * 50, comb ? c.py + 40 : (bpq ? c.yB - 55 : c.yB + 70), c.xB, c.yB + c.dir * 10);
          add(6, 7, "Vis de plage", "Vis de plage", c.xc - s * (comb ? 61 : 51), yMur - 30, c.xc, yMur - 12);
          add(9, 10, "Raccord et capillaire", "Raccord et capillaire", c.xc + s * (comb ? 69 : 64), comb ? wb + 60 : wb + 27, c.xc, wb + 13);
        }
        if (c.uD) add(7, 8, "Vis de différentiel", "Vis de différentiel", xD + s * (comb ? 54 : 60), yMur - (comb ? 34 : 30), xD, yMur - 12);
        if (c.man && !spec.some(function (r) { return r.n === 9; })) add(8, 9, "Bouton de réarmement", "Bouton de réarmement", c.stemX + s * (comb ? -53 : 55), yMur - (comb ? 34 : 33), c.stemX, yMur - 16);
      });
      var c1 = prem, lev1 = accent === "levier", an1 = (lev1 ? -38 : -52) * RAD, lx1 = c1.x0 + c1.s * (c1.uB + 12), ly1 = sc.yTop + 24;
      add(10, 13, "Levier d’essai", "Levier d’essai", comb ? 440 : 462, comb ? 38 : 30, lx1 + c1.s * Math.cos(an1) * 70, ly1 + Math.sin(an1) * 70);
      if (comb) spec.sort(function (a, b) { return a.n - b.n; }); else spec.sort(function (a, b) { return a.o - b.o; });
      spec.forEach(function (r, i) {
        var n = comb ? r.n : i + 1;
        if (Math.hypot(r.x - r.cx, r.y - r.cy) > rr + 4) {
          var ln = el("line", { x1: r.x, y1: r.y, x2: r.cx, y2: r.cy, stroke: MARINE, "stroke-width": 1.5, "stroke-linecap": "round" }, gp);
          var pt = el("circle", { cx: r.cx, cy: r.cy, r: 3.5, fill: MARINE }, gp);
          if (r.dyn) { cols[0].ldB = { ln: ln, pt: pt }; }
        }
        repere(gp, r.x, r.y, n, rr, fs);
        reperes.push({ n: n, nom: comb ? r.nom : r.nomSolo });
      });
    }

    /* ---------- état et moteur d'animation ---------- */
    var etat = { bp: { p: EB.max > EB.min ? (VB.enclenchement != null ? +VB.enclenchement + 0.35 * (EB.max - VB.enclenchement) : EB.min + 0.6 * (EB.max - EB.min)) : 1.5, ouvert: false },
                 hp: { p: VH.retour != null ? +VH.retour - 0.3 * (VH.retour - EH.min) : EH.min + 0.4 * (EH.max - EH.min), ouvert: false }, appui: false };
    var vars = {}, raf = 0, pre = {}, clacDeb = {};

    function vers(nom, a, d) {
      var q = vars[nom];
      if (!q) { vars[nom] = { v: a, a: a, de: a, t0: 0, d: d }; return; }
      if (q.a === a) return;
      if (reduit()) { q.v = a; q.a = a; return; }
      q.de = q.v; q.a = a; q.t0 = performance.now(); q.d = d;
      if (!raf) raf = requestAnimationFrame(pas);
    }
    function lire(c, n) { return vars[c.id + n] ? vars[c.id + n].v : 0; }
    function dessiner() {
      var ap = vars.appui ? vars.appui.v : 0;
      cols.forEach(function (c) { c.maj({ f: lire(c, "f"), haut: lire(c, "haut"), ferme: lire(c, "ferme") }, ap); });
    }
    function pas(t) {
      raf = 0;
      var actif = false, n, q, k;
      for (n in vars) {
        q = vars[n];
        if (q.v === q.a) continue;
        k = (t - q.t0) / q.d;
        if (k >= 1) q.v = q.a;
        else { k = Math.max(0, k); q.v = q.de + (q.a - q.de) * (1 - Math.pow(1 - k, 3)); actif = true; }
      }
      cols.forEach(function (c) {
        var d = clacDeb[c.id];
        if (d == null) return;
        var e = (t - d) / 400;
        if (e >= 1) { c.clac.setAttribute("opacity", 0); clacDeb[c.id] = null; }
        else { c.clac.setAttribute("opacity", Math.max(0, Math.min(1, 1 - e))); actif = true; }
      });
      dessiner();
      if (actif) raf = requestAnimationFrame(pas);
    }

    function appliquer() {
      cols.forEach(function (c) {
        var e = etat[c.id];
        if (accent === "levier") e.ouvert = comb ? c.bp : true;   /* essai à la main : le contact du côté du levier est ouvert */
        var f = bornes((e.p - c.E.min) / ((c.E.max - c.E.min) || 1), 0, 1), ferme = e.ouvert ? 0 : 1, haut = f;
        vers(c.id + "f", f, 250);
        vers(c.id + "haut", haut, 250);
        vers(c.id + "ferme", ferme, 80);
        if (pre[c.id] != null && pre[c.id] !== e.ouvert && !reduit()) { clacDeb[c.id] = performance.now(); if (!raf) raf = requestAnimationFrame(pas); }
        pre[c.id] = e.ouvert;
        if (pressEt[c.id]) pressEt[c.id].lastChild.textContent = (c.bp ? "Aspiration : " + fmt(e.p, 2) : "Refoulement : " + fmt(e.p, 1)) + " bar";
        if (etatEt[c.id]) {
          etatEt[c.id].lastChild.textContent = e.ouvert ? "Contact ouvert" : "Contact fermé";
          etatEt[c.id].firstChild.setAttribute("stroke", e.ouvert ? C.repos : C.accent);
        }
      });
      vers("appui", etat.appui ? 1 : 0, 120);
      dessiner();
    }

    function regler(e) {
      try {
        e = e || {};
        ["bp", "hp"].forEach(function (k) {
          var r = e[k];
          if (r && typeof r === "object") {
            if (r.p != null && isFinite(r.p)) etat[k].p = +r.p;
            if (typeof r.ouvert === "boolean") etat[k].ouvert = r.ouvert;
          }
        });
        if (typeof e.appui === "boolean") etat.appui = e.appui;
        appliquer();
      } catch (err) { /* ne jamais planter */ }
    }

    appliquer();
    return { noeud: svg, regler: regler, reperes: reperes, forces: true };
  }

  B.enregistrer("coupe", fabrique);
})();

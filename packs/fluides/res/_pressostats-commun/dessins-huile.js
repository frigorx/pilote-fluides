/* Socle pressostats : dessins-huile.js
   Rôle : cinq types de dessin du pressostat différentiel d'huile (SVG construit en JavaScript, dessins fixes).
   Contrat : PressostatDessins.creer(type, options) rend { noeud, regler(etat), reperes } ; regler ne fait rien.
   Types : huile-circuit, huile-graissage, huile-chrono, huile-bornes, huile-appareil (options dans chaque fabrique).
   Dépend de dessins-base.js (palette C, el, racine, texte, filigrane, pastille, degrade, enregistrer).
   Règles : aucun texte sur un tracé, huile en nappe dorée, couleurs de sens constantes, pas de marque. */
(function () {
  "use strict";
  var P = window.PressostatDessins;
  if (!P) return;
  var C = P.C, el = P.el, M = C.marine;
  var TXT = 32, JAUNE = "#ffd23f";
  var HUILE = "#e6ac1f", HUILE_CLAIR = "#f8dd82", HUILE_FONCE = "#c98a0a", HUILE_FLECHE = "#8f5600", REFLET = "#fff4bd";

  /* ---------- petites aides de dessin ---------- */
  function chemin(p, d, col, w, extra) {
    var a = { d: d, fill: "none", stroke: col || M, "stroke-width": w == null ? 3 : w, "stroke-linecap": "round", "stroke-linejoin": "round" }, k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) a[k] = extra[k];
    return el("path", a, p);
  }
  function rect(p, x, y, w, h, r, fill, stroke, sw) {
    return el("rect", { x: x, y: y, width: w, height: h, rx: r || 0, fill: fill || "none", stroke: stroke || "none", "stroke-width": sw || 0 }, p);
  }
  function cercle(p, x, y, r, fill, stroke, sw) {
    return el("circle", { cx: x, cy: y, r: r, fill: fill || "none", stroke: stroke || "none", "stroke-width": sw || 0 }, p);
  }
  function ligne(p, x1, y1, x2, y2, col, w, extra) {
    var a = { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col || M, "stroke-width": w || 3, "stroke-linecap": "round" }, k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) a[k] = extra[k];
    return el("line", a, p);
  }
  function poly(p, pts, fill, stroke, sw) {
    return el("polygon", { points: pts, fill: fill || "none", stroke: stroke || "none", "stroke-width": sw || 0, "stroke-linejoin": "round" }, p);
  }
  function groupe(p, attrs) { return el("g", attrs || null, p); }
  function virg(x, d) { var v = d == null ? String(Math.round(x * 100) / 100) : x.toFixed(d); return v.replace(".", ",").replace("-", "−"); }
  function num(v, defaut) { return typeof v === "number" && isFinite(v) ? v : defaut; }

  /* ---------- étiquettes (mesurées, jamais posées sur un tracé) ---------- */
  var ctxMes = null;
  function lg(txt, t, gras) {
    try {
      if (!ctxMes) ctxMes = document.createElement("canvas").getContext("2d");
      ctxMes.font = (gras ? "700 " : "500 ") + t + "px " + P.POLICE;
      return ctxMes.measureText(txt).width * 1.04;
    } catch (e) { return txt.length * t * 0.56; }
  }
  /* Étiquette d'une ou plusieurs lignes. ax = ancre horizontale (ancre : "middle", "start", "end"), cy = centre vertical. */
  function etiq(p, ax, cy, lignes, o) {
    var op = o || {}, t = op.taille || TXT, pad = 8, lh = Math.round(t * 1.2), w = 0, i, x0, y0, g, h;
    if (typeof lignes === "string") lignes = [lignes];
    lignes.forEach(function (l) { w = Math.max(w, lg(l, t, op.gras)); });
    w = Math.ceil(w + 2 * pad);
    h = lh * lignes.length + 2 * pad - 4;
    x0 = op.ancre === "start" ? ax : (op.ancre === "end" ? ax - w : ax - w / 2);
    y0 = cy - h / 2;
    g = groupe(p, { class: "etiquette" });
    rect(g, x0, y0, w, h, 8, op.fond || C.papier, op.bord || M, 1.6);
    for (i = 0; i < lignes.length; i++) {
      P.texte(g, x0 + w / 2, y0 + pad - 2 + t * 0.82 + lh * i, lignes[i], { "text-anchor": "middle", "font-size": t, "font-weight": op.gras ? 700 : 500, fill: op.couleur || M });
    }
    return { x: x0, y: y0, w: w, h: h, cx: x0 + w / 2, cy: cy, d: x0 + w, b: y0 + h };
  }
  /* Lettre ou chiffre de borne : gras 34, boîte étroite collée à la borne. */
  function lettre(p, cx, cy, ch) {
    var g = groupe(p, { class: "etiquette" }), w = ch.length > 1 ? 56 : 44;
    rect(g, cx - w / 2, cy - 24, w, 48, 8, C.papier, M, 1.6);
    P.texte(g, cx, cy + 12, ch, { "text-anchor": "middle", "font-size": 34, "font-weight": 700 });
    return g;
  }
  /* Trait de renvoi : de l'étiquette vers la pièce, terminé par un point. */
  function renvoi(p, x1, y1, x2, y2) {
    ligne(p, x1, y1, x2, y2, M, 2.2);
    cercle(p, x2, y2, 4.5, M);
  }
  /* Pastille de la base, agrandie pour rester lisible sur téléphone. */
  function pastilleG(p, x, y, n, k) {
    var g = groupe(p, { transform: "translate(" + x + " " + y + ") scale(" + k + ") translate(" + (-x) + " " + (-y) + ")" });
    return P.pastille(g, x, y, n);
  }

  /* Filigrane discret : deux exemplaires au plus, réduits d'un tiers, 0,08 d'opacité, sous toutes les pièces. */
  function fili(s, pts, larg) {
    var g = P.filigrane(s, pts, larg || 373);
    g.setAttribute("opacity", 0.08);
    return g;
  }
  /* Pastille reliée à sa pièce par un trait fin terminé par un point. */
  function pastilleRelie(s, x, y, n, tx, ty) {
    renvoi(s, x, y, tx, ty);
    pastilleG(s, x, y, n, 1.9);
  }

  /* Tube de cuivre fin : double trait, coins arrondis. */
  function trace(pts, r) {
    var d = "M" + pts[0][0] + " " + pts[0][1], i, a, b, c, l1, l2, r1;
    for (i = 1; i < pts.length - 1; i++) {
      a = pts[i - 1]; b = pts[i]; c = pts[i + 1];
      l1 = Math.hypot(b[0] - a[0], b[1] - a[1]); l2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
      r1 = Math.min(r, l1 / 2, l2 / 2);
      d += " L" + (b[0] + (a[0] - b[0]) / l1 * r1) + " " + (b[1] + (a[1] - b[1]) / l1 * r1) + " Q" + b[0] + " " + b[1] + " " + (b[0] + (c[0] - b[0]) / l2 * r1) + " " + (b[1] + (c[1] - b[1]) / l2 * r1);
    }
    return d + " L" + pts[pts.length - 1][0] + " " + pts[pts.length - 1][1];
  }
  function tube(p, pts, r) {
    var d = trace(pts, r || 14);
    chemin(p, d, M, 11);
    chemin(p, d, C.cuivre, 5.5);
  }
  /* Écrou de laiton : hexagone vu de côté. */
  function ecrou(p, x, y, w, h, grad) {
    var g = groupe(p);
    rect(g, x, y, w, h, 3, grad, M, 2.5);
    if (w >= h) { ligne(g, x + w / 3, y + 2, x + w / 3, y + h - 2, M, 1.8); ligne(g, x + 2 * w / 3, y + 2, x + 2 * w / 3, y + h - 2, M, 1.8); }
    else { ligne(g, x + 2, y + h / 3, x + w - 2, y + h / 3, M, 1.8); ligne(g, x + 2, y + 2 * h / 3, x + w - 2, y + 2 * h / 3, M, 1.8); }
    return g;
  }
  /* Surface d'une nappe : courbe ondulée de x0 à x1. */
  function vague(x0, x1, y0, amp, pas) {
    var d = "M" + x0 + " " + y0, x = x0, premier = true;
    while (x + pas <= x1 + 0.1) {
      d += premier ? " Q" + (x + pas / 2) + " " + (y0 - amp) + " " + (x + pas) + " " + y0 : " T" + (x + pas) + " " + y0;
      premier = false; x += pas;
    }
    return d;
  }
  function engrenage(p, cx, cy, r1, r2, n, fill) {
    var pts = [], i, w = Math.PI / n, a;
    for (i = 0; i < n; i++) {
      a = i * 2 * w;
      [[r1, -0.95], [r2, -0.55], [r2, 0.55], [r1, 0.95]].forEach(function (c) {
        pts.push((cx + c[0] * Math.cos(a + c[1] * w)).toFixed(1) + "," + (cy + c[0] * Math.sin(a + c[1] * w)).toFixed(1));
      });
    }
    return poly(p, pts.join(" "), fill, M, 2.5);
  }

  /* ======================================================================
     COMPRESSEUR EN COUPE (commun à huile-circuit et huile-graissage)
     Coordonnées locales : carter 0..520 x 236..470, cylindre à gauche (60..220), pompe à droite.
     ====================================================================== */
  function compresseur(s, o) {
    var k = o.k, g = groupe(s, { transform: "translate(" + o.ox + " " + o.oy + ") scale(" + k + ")" });
    var gA = P.degrade(s, C.acierClair, C.acier), gAh = P.degrade(s, C.acierClair, C.acier, true),
      gL = P.degrade(s, C.laiton, C.laitonFonce), gB = P.degrade(s, C.boitier, C.boitierFonce),
      gH = P.degrade(s, HUILE_CLAIR, HUILE_FONCE), gLh = P.degrade(s, C.laiton, C.laitonFonce, true);
    var surf = vague(14, 506, 396, 6, 41), bas = " V456 H14 Z", flux = !!o.flux;

    /* vide intérieur, puis nappe d'huile dorée (liquide plein, surface ondulée, reflets) */
    chemin(g, "M14 250 H74 V60 H206 V250 H506 V456 H14 Z", null, 0, { fill: C.interieur, stroke: "none" });
    chemin(g, surf + bas, null, 0, { fill: gH, stroke: "none" });
    chemin(g, surf, REFLET, 3.5, { opacity: 0.9 });
    chemin(g, vague(14, 506, 416, 5, 41), REFLET, 2.5, { opacity: 0.35 });
    chemin(g, vague(14, 506, 436, 5, 41), HUILE_FONCE, 2, { opacity: 0.25 });

    /* paroi du carter et du cylindre (tôle en coupe, 14 unités) */
    chemin(g, "M0 236 H60 V52 H220 V236 H520 V470 H0 Z M14 250 H74 V60 H206 V250 H506 V456 H14 Z", M, 3, { fill: gB, "fill-rule": "evenodd" });

    /* culasse, plaque de clapets, deux raccords de gaz */
    rect(g, 86, 0, 26, 16, 3, gL, M, 2.5); rect(g, 164, 0, 26, 16, 3, gL, M, 2.5);
    rect(g, 54, 14, 172, 38, 6, gA, M, 3);
    rect(g, 60, 52, 160, 8, 0, C.laitonFonce, M, 2);
    ligne(g, 84, 33, 196, 33, M, 2);

    /* piston, axe, bielle */
    rect(g, 92, 132, 96, 64, 4, gAh, M, 3);
    ligne(g, 92, 144, 188, 144, M, 2); ligne(g, 92, 154, 188, 154, M, 2);
    /* arbre (vilebrequin) et joint de sortie */
    rect(g, -28, 322, 468, 36, 0, gA, M, 3);
    rect(g, -6, 313, 22, 54, 4, gL, M, 3);
    /* maneton et bielle */
    cercle(g, 140, 340, 46, gA, M, 3);
    cercle(g, 140, 340, 17, gAh, M, 2.5);
    chemin(g, "M140 182 L162 300", M, 22);
    chemin(g, "M140 182 L162 300", C.acier, 14);
    cercle(g, 140, 182, 9, gL, M, 2.5);
    cercle(g, 162, 300, 20, gA, M, 3);
    cercle(g, 162, 300, 7, C.laitonFonce, M, 2);
    /* paliers du vilebrequin */
    rect(g, 226, 308, 36, 64, 5, gL, M, 3);
    rect(g, 330, 308, 36, 64, 5, gL, M, 3);

    /* pompe à huile en bout de vilebrequin : corps de laiton, pignon */
    rect(g, 424, 304, 72, 72, 9, gL, M, 3);
    engrenage(g, 460, 340, 22, 30, 10, gA);
    cercle(g, 460, 340, 8, C.laitonFonce, M, 2.5);
    /* tube d'aspiration et crépine plongée dans l'huile */
    chemin(g, "M460 376 V416", M, 28);
    chemin(g, "M460 376 V416", C.acierClair, 20);
    chemin(g, "M460 376 V416", HUILE, 12);
    rect(g, 430, 414, 60, 34, 6, C.papier, M, 3);
    [442, 454, 466, 478].forEach(function (x) { ligne(g, x, 417, x, 445, M, 1.8); });
    [424, 436].forEach(function (y) { ligne(g, 433, y, 487, y, M, 1.8); });
    rect(g, 446, 408, 28, 8, 2, gL, M, 2);
    /* l'huile recouvre ce qui est plongé */
    chemin(g, surf + bas, null, 0, { fill: HUILE, opacity: 0.32, stroke: "none" });

    /* canal d'huile dans l'arbre : pompe -> paliers -> maneton, continu */
    var bore = "M446 340 H140 L160 306";
    chemin(g, bore, M, 22); chemin(g, bore, HUILE, 14);
    ["M244 340 V372", "M348 340 V372"].forEach(function (d) { chemin(g, d, M, 17); chemin(g, d, HUILE, 10); });
    /* l'huile quitte les paliers et retombe dans le carter */
    [244, 348].forEach(function (x) {
      chemin(g, "M" + x + " 372 V398", HUILE_FONCE, 13);
      chemin(g, "M" + x + " 372 V398", HUILE, 8);
      el("ellipse", { cx: x, cy: 398, rx: 19, ry: 5, fill: "none", stroke: HUILE_FONCE, "stroke-width": 2.5 }, g);
      chemin(g, "M" + (x - 22) + " 382 q 5 -7 8 0 q -3 6 -8 0 Z", HUILE, 1.5, { fill: HUILE, stroke: HUILE_FONCE });
      chemin(g, "M" + (x + 16) + " 378 q 5 -7 8 0 q -3 6 -8 0 Z", HUILE, 1.5, { fill: HUILE, stroke: HUILE_FONCE });
    });
    if (flux) {
      [400, 296, 206].forEach(function (x) { poly(g, (x - 9) + ",340 " + (x + 7) + ",330 " + (x + 7) + ",350", HUILE_FLECHE); });
      poly(g, "460,382 453,398 467,398", HUILE_FLECHE);
      poly(g, "408,431 422,423 422,439", HUILE_FLECHE);
      [244, 348].forEach(function (x) { poly(g, x + ",394 " + (x - 7) + ",380 " + (x + 7) + ",380", HUILE_FLECHE); });
    }
    /* raccords de prise de pression traversant la paroi (le pressostat les utilise) */
    if (o.prises) {
      rect(g, 496, 350, 34, 14, 3, gLh, M, 2.5);
      rect(g, 504, 266, 26, 14, 3, gLh, M, 2.5);
      ecrou(g, 518, 258, 14, 30, gL); ecrou(g, 518, 342, 14, 30, gL);
    }
    return { g: g, G: function (lx, ly) { return [o.ox + k * lx, o.oy + k * ly]; } };
  }

  /* ======================================================================
     PRESSOSTAT D'HUILE FERMÉ (vue compacte du circuit) : prise LP en haut, prise OIL en bas.
     ====================================================================== */
  function pressostatFerme(s, cx, y0) {
    var g = groupe(s), gB = P.degrade(s, C.boitier, C.boitierFonce), gL = P.degrade(s, C.laiton, C.laitonFonce, true), gLv = P.degrade(s, C.laiton, C.laitonFonce);
    var i;
    /* prise LP (haut) : embout, écrou, capsule bleue */
    rect(g, cx - 9, y0, 18, 18, 2, gL, M, 2.5);
    ecrou(g, cx - 24, y0 + 18, 48, 22, gL);
    rect(g, cx - 42, y0 + 40, 84, 40, 12, C.bpPale, M, 3);
    ligne(g, cx - 28, y0 + 50, cx + 28, y0 + 50, C.blanc, 3, { opacity: 0.8 });
    /* prise OIL (bas) : capsule rouge pâle */
    rect(g, cx - 42, y0 + 220, 84, 40, 12, C.hpPale, M, 3);
    ligne(g, cx - 28, y0 + 230, cx + 28, y0 + 230, C.blanc, 3, { opacity: 0.8 });
    ecrou(g, cx - 24, y0 + 260, 48, 22, gL);
    rect(g, cx - 9, y0 + 282, 18, 18, 2, gL, M, 2.5);
    /* boîtier gris, couvercle, bouton de réarmement vert, vis */
    rect(g, cx + 36, y0 + 62, 16, 22, 4, C.vert, M, 2.5);
    rect(g, cx - 54, y0 + 80, 108, 140, 12, gB, M, 3);
    rect(g, cx - 42, y0 + 92, 84, 116, 8, C.interieur, M, 2.2);
    for (i = 0; i < 4; i++) {
      cercle(g, cx + (i % 2 ? 32 : -32), y0 + (i < 2 ? 100 : 200), 5, C.acierClair, M, 2);
    }
    rect(g, cx - 28, y0 + 112, 56, 54, 5, C.papier, M, 2.2);
    for (i = 0; i < 6; i++) ligne(g, cx - 20, y0 + 122 + i * 8, cx - 8, y0 + 122 + i * 8, M, 1.6);
    ligne(g, cx - 24, y0 + 140, cx + 20, y0 + 140, C.accent, 4);
    rect(g, cx - 18, y0 + 176, 36, 14, 4, C.boitierFonce, M, 2);
    return g;
  }

  /* Manomètre : cadran rond, graduations, aiguille de la couleur du côté. */
  function manometre(s, cx, cy, r, col, angle) {
    var g = groupe(s), gA = P.degrade(s, C.acierClair, C.acier), i, a;
    cercle(g, cx, cy, r, gA, M, 3);
    cercle(g, cx, cy, r - 7, C.papier, M, 2);
    for (i = 0; i <= 6; i++) {
      a = (150 + i * 40) * Math.PI / 180;
      ligne(g, cx + (r - 9) * Math.cos(a), cy + (r - 9) * Math.sin(a), cx + (r - 15) * Math.cos(a), cy + (r - 15) * Math.sin(a), M, 2);
    }
    a = angle * Math.PI / 180;
    ligne(g, cx, cy, cx + (r - 14) * Math.cos(a), cy + (r - 14) * Math.sin(a), col, 4.5);
    cercle(g, cx, cy, 5, M);
    return g;
  }

  /* ======================================================================
     HUILE-CIRCUIT  (viewBox 900 x 560)
     ====================================================================== */
  function fabCircuit(o) {
    var s = P.racine(900, 560, o.label || "Compresseur à pompe à huile et pressostat d’huile");
    fili(s, [[200, 380]]);
    var reperes = [], mano = !!o.manometres, controles = !!o.controles;
    var avecValeurs = typeof o.p1 === "number" && typeof o.p2 === "number";
    var K = 0.66, OX = 30, OY = 145;
    var cp = compresseur(s, { k: K, ox: OX, oy: OY, prises: true }), G = cp.G, gLv = P.degrade(s, C.laiton, C.laitonFonce);
    var cx = 826, y0 = 188;                        /* pressostat : prise LP en (cx, y0), prise OIL en (cx, y0 + 300) */
    var lp = G(530, 273), oil = G(530, 357);       /* sorties de tube, côté extérieur du carter */
    var yLP = 160, yOIL = 512, xV = 395;
    tube(s, [lp, [xV, lp[1]], [xV, yLP], [cx, yLP], [cx, y0 + 4]], 16);
    tube(s, [oil, [xV, oil[1]], [xV, yOIL], [cx, yOIL], [cx, y0 + 296]], 16);
    pressostatFerme(s, cx, y0);

    /* manomètres sur chaque prise : P2 (carter) en bleu, P1 (sortie de pompe) en rouge */
    if (mano) {
      var xM = 502;
      ligne(s, xM, yLP, xM, yLP + 30, M, 11); ligne(s, xM, yLP, xM, yLP + 30, C.cuivre, 5.5);
      ecrou(s, xM - 9, yLP + 20, 18, 14, gLv);
      manometre(s, xM, yLP + 66, 34, C.bp, 215);
      ligne(s, xM, yOIL, xM, yOIL - 30, M, 11); ligne(s, xM, yOIL, xM, yOIL - 30, C.cuivre, 5.5);
      ecrou(s, xM - 9, yOIL - 34, 18, 14, gLv);
      manometre(s, xM, yOIL - 66, 34, C.hp, 300);
      etiq(s, xM, yLP + 138, avecValeurs ? "P2 = " + virg(o.p2, 1) + " bar" : "P2");
      etiq(s, xM, yOIL - 138, avecValeurs ? "P1 = " + virg(o.p1, 1) + " bar" : "P1");
    }

    /* étiquettes en zone libre, avec trait de renvoi */
    var e;
    if (!controles) {
      e = etiq(s, 332, 215, ["Pompe", "à huile"]);
      renvoi(s, G(460, 304)[0], e.b, G(460, 304)[0], G(460, 304)[1]);
    }
    e = etiq(s, G(250, 0)[0] - 10, G(0, 470)[1] + 52, "Carter");
    renvoi(s, e.cx, e.y, e.cx, G(0, 470)[1]);
    e = etiq(s, 696, yLP + 52, "Prise LP");
    renvoi(s, 696, e.y, 696, yLP);
    e = etiq(s, 696, yOIL - 52, "Prise OIL");
    renvoi(s, 696, e.b, 696, yOIL);
    etiq(s, 681, y0 + 152, ["Pressostat", "d’huile"]);

    if (avecValeurs) {
      etiq(s, 450, 56, "Pression nette = " + virg(o.p1, 1) + " − " + virg(o.p2, 1) + " = " + virg(o.p1 - o.p2, 1) + " bar", { taille: 36, gras: true, bord: C.accent });
    }
    if (controles) {
      var liste = [[1, "Niveau d’huile", 20, 40], [3, "Pompe à huile", 20, 98], [2, "Crépine", 380, 40], [4, "Prises de pression", 380, 98]];
      liste.forEach(function (it) {
        pastilleG(s, it[2] + 28, it[3], it[0], 1.9);
        etiq(s, it[2] + 66, it[3], it[1], { ancre: "start" });
      });
      pastilleRelie(s, 70, 507, 1, G(150, 456)[0], G(150, 456)[1]);
      pastilleRelie(s, G(407, 0)[0], 507, 2, G(460, 440)[0], G(460, 440)[1]);
      pastilleRelie(s, 240, 215, 3, G(430, 304)[0], G(430, 304)[1]);
      pastilleRelie(s, 438, 262, 4, 396, 262);
      pastilleRelie(s, 438, 402, 4, 396, 402);
    }
    reperes = controles ? [{ n: 1, nom: "Niveau d’huile" }, { n: 2, nom: "Crépine" }, { n: 3, nom: "Pompe à huile" }, { n: 4, nom: "Prises de pression" }] : [];
    return { noeud: s, regler: function () {}, reperes: reperes };
  }

  /* ======================================================================
     HUILE-GRAISSAGE  (viewBox 900 x 560)
     ====================================================================== */
  function fabGraissage(o) {
    var s = P.racine(900, 560, o.label || "Trajet de l’huile dans le compresseur");
    fili(s, [[300, 330]]);
    var K = 0.95, OX = 30, OY = 34, cp = compresseur(s, { k: K, ox: OX, oy: OY, flux: true }), G = cp.G, e;
    /* à droite : Carter, Pompe à huile, Crépine ; les renvois arrivent par l'extérieur et ne traversent ni la nappe ni le canal */
    e = etiq(s, 600, 262, "Carter", { ancre: "start" });
    renvoi(s, e.x, 262, G(520, 262)[0], 262);
    e = etiq(s, 600, 340, "Pompe à huile", { ancre: "start" });
    renvoi(s, e.x, e.cy, G(496, 345)[0], G(496, 345)[1]);
    var yc = G(0, 384)[1], xc = G(474, 0)[0];
    e = etiq(s, 600, 440, "Crépine", { ancre: "start" });
    chemin(s, "M" + e.x + " 440 H570 V" + yc + " H" + xc, M, 2.2);
    cercle(s, xc, yc, 4.5, M);
    /* au-dessus : Paliers (deux renvois qui s'arrêtent sur le dessus des paliers) */
    e = etiq(s, G(296, 0)[0], 160, "Paliers");
    renvoi(s, G(244, 0)[0], e.b, G(244, 308)[0], G(244, 308)[1]);
    renvoi(s, G(348, 0)[0], e.b, G(348, 308)[0], G(348, 308)[1]);
    /* en dessous : Retour au carter ; les renvois s'arrêtent sur la paroi du carter, sous les points de chute */
    e = etiq(s, G(296, 0)[0], 530, "Retour au carter");
    renvoi(s, G(244, 0)[0], e.y, G(244, 0)[0], G(0, 470)[1]);
    renvoi(s, G(348, 0)[0], e.y, G(348, 0)[0], G(0, 470)[1]);
    return { noeud: s, regler: function () {}, reperes: [] };
  }

  /* ======================================================================
     HUILE-CHRONO  (viewBox 900 x 560)
     ====================================================================== */
  function lisse(pts) {
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1), i, p0, p1, p2, p3;
    for (i = 0; i < pts.length - 1; i++) {
      p0 = pts[i - 1] || pts[i]; p1 = pts[i]; p2 = pts[i + 1]; p3 = pts[i + 2] || p2;
      d += " C" + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + " " + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + " " + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + " " + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
    }
    return d;
  }
  function fabChrono(o) {
    var mode = o.mode === "marche" ? "marche" : "demarrage";
    var issue = o.issue === "arret" || o.issue === "double" ? o.issue : "reussi";
    var seuil = num(o.seuil, 0.65), contact = num(o.contact, 0.2), haut = Math.round((seuil + contact) * 100) / 100, delai = num(o.delai, 60);
    var s = P.racine(900, 560, o.label || "Pression nette d’huile en fonction du temps");
    fili(s, [[300, 280]]);
    var X0 = 110, X1 = 480, YA = 420, YT = 130, PMAX = 1.1, TMAX = 100;
    function xs(t) { return X0 + t * (X1 - X0) / TMAX; }
    function ys(p) { return YA - p * (YA - YT) / PMAX; }
    function pt(t, p) { return [xs(t), ys(p)]; }
    var i, e;

    /* lignes de seuil, en pointillé, prolongées jusqu'à leur étiquette */
    var xL = 516, yS = ys(seuil), yH = ys(haut);
    ligne(s, X0, yS, xL, yS, M, 3, { "stroke-dasharray": "11 8" });
    ligne(s, X0, yH, xL, yH, M, 3, { "stroke-dasharray": "11 8" });
    etiq(s, xL, yH - 14, ["Seuil + différentiel", "de contact : " + virg(haut) + " bar"], { ancre: "start" });
    etiq(s, xL, yS + 20, "Seuil : " + virg(seuil) + " bar", { ancre: "start" });

    /* axes, graduations chiffrées */
    chemin(s, "M" + X0 + " " + YA + " H" + (X1 + 14), M, 4);
    chemin(s, "M" + X0 + " " + YA + " V" + (YT - 20), M, 4);
    poly(s, (X1 + 26) + "," + YA + " " + (X1 + 8) + "," + (YA - 9) + " " + (X1 + 8) + "," + (YA + 9), M);
    poly(s, X0 + "," + (YT - 34) + " " + (X0 - 9) + "," + (YT - 16) + " " + (X0 + 9) + "," + (YT - 16), M);
    for (i = 0; i <= TMAX; i += 20) {
      ligne(s, xs(i), YA, xs(i), YA + 9, M, 3);
      P.texte(s, xs(i), YA + 42, String(i), { "text-anchor": "middle", "font-size": 32 });
    }
    for (i = 0; i <= 5; i++) {
      ligne(s, X0 - 9, ys(i / 5), X0, ys(i / 5), M, 3);
      P.texte(s, X0 - 14, ys(i / 5) + 11, virg(i / 5, 1), { "text-anchor": "end", "font-size": 32 });
    }
    etiq(s, 20, 30, "Pression nette d’huile (bar)", { ancre: "start" });
    etiq(s, 520, YA + 8, "Temps (s)", { ancre: "start" });

    /* courbes */
    var vert = [], orange = [], debut = 0, tP, tStop, pStop, commun = null;
    if (mode === "demarrage") {
      vert = [[0, 0], [2, 0.2], [6, 0.4], [12, 0.58], [20, 0.69], [30, 0.79], [38, haut], [46, 0.93], [58, 0.98], [76, 1.0], [100, 1.0]];
      orange = [[0, 0], [3, 0.19], [8, 0.36], [14, 0.48], [22, 0.58], [32, 0.67], [42, 0.74], [52, 0.77], [delai, 0.78]];
      tP = 38; tStop = delai; pStop = 0.78;
    } else {
      debut = 22;
      commun = [[0, 1.0], [6, 0.97], [12, 0.88], [18, 0.74], [debut, seuil]];
      vert = [[debut, seuil], [28, 0.6], [34, 0.58], [40, 0.63], [46, 0.73], [52, haut], [60, 0.95], [70, 1.0], [100, 1.0]];
      orange = [[debut, seuil], [28, 0.53], [36, 0.45], [46, 0.4], [60, 0.37], [debut + delai, 0.36]];
      tP = 52; tStop = debut + delai; pStop = 0.36;
    }
    function px(l) { return l.map(function (a) { return pt(a[0], a[1]); }); }
    if (commun) chemin(s, lisse(px(commun)), M, 6);
    if (issue !== "arret") chemin(s, lisse(px(vert)), C.vert, 6.5);
    if (issue !== "reussi") chemin(s, lisse(px(orange)), C.accent, 6.5);
    if (mode === "marche") { cercle(s, xs(debut), ys(seuil), 8, C.papier, M, 3); }

    /* succès : le point où la temporisation s'arrête, étiquette en marge haute, renvoi qui monte sans toucher la courbe */
    if (issue !== "arret") {
      var pp = pt(tP, haut), yEt = 68;
      e = etiq(s, xL, yEt, ["La temporisation", "s’arrête"], { ancre: "start" });
      ligne(s, pp[0], pp[1], pp[0], yEt, M, 2.2);
      ligne(s, pp[0], yEt, xL, yEt, M, 2.2);
      cercle(s, pp[0], pp[1], 9, C.papier, M, 3.5);
    }
    /* arrêt : trait vertical à la fin du délai, étiquette en marge, renvoi horizontal sous les lignes de seuil */
    if (issue !== "reussi") {
      var xStop = xs(tStop), yFin = ys(pStop) - 6, yR = 352;
      ligne(s, xStop, YA, xStop, yFin, C.hp, 6.5);
      ligne(s, xStop, yR, xL, yR, M, 2.2);
      cercle(s, xStop, yR, 4.5, M);
      etiq(s, xL, yR, ["Arrêt du", "compresseur"], { ancre: "start" });
    }

    /* temporisation : barre sous l'axe du temps */
    var xa = xs(debut), xb = xs(debut + delai), yB = 478;
    rect(s, xa, yB, xb - xa, 26, 6, C.bpPale, M, 3);
    ligne(s, xa, yB - 6, xa, yB + 32, M, 3); ligne(s, xb, yB - 6, xb, yB + 32, M, 3);
    etiq(s, xb + 18, yB + 13, "Temporisation : " + delai + " s", { ancre: "start" });
    return { noeud: s, regler: function () {}, reperes: [] };
  }

  /* ======================================================================
     HUILE-BORNES  (viewBox 900 x 560)
     ====================================================================== */
  function fabBornes(o) {
    var etat = o.etat === "tempo" || o.etat === "defaut" ? o.etat : "marche";
    var s = P.racine(900, 560, o.label || "Schéma électrique du pressostat d’huile");
    fili(s, [[300, 235]]);
    var gB = P.degrade(s, C.laiton, C.laitonFonce);
    var marche = etat !== "defaut", defaut = etat === "defaut", secu = etat !== "marche";
    function fil(d, on) { chemin(s, d, on ? C.accent : C.repos, on ? 6.5 : 4.5); }
    function borne(x, y) { cercle(s, x, y, 13, gB, M, 3); ligne(s, x - 6, y - 6, x + 6, y + 6, M, 2.5); }
    function plot(x, y) { cercle(s, x, y, 8, C.cuivre, M, 3); }
    function lame(x1, y1, x2, y2, on) { chemin(s, "M" + x1 + " " + y1 + " L" + x2 + " " + y2, M, 14); chemin(s, "M" + x1 + " " + y1 + " L" + x2 + " " + y2, on ? C.accent : C.repos, 7.5); }
    var yM = 140, yS = 240, yT = 425, xN = 850;

    /* neutre : rail de droite, coloré là où le courant revient */
    fil("M" + xN + " " + yM + " V" + yS, marche);
    fil("M" + xN + " " + yS + " V" + yT, defaut || secu);
    fil("M" + xN + " " + yT + " V545", defaut || secu || marche);
    cercle(s, xN, 548, 6, C.papier, M, 3);
    /* arrivée : le conducteur chaud, présent partout */
    cercle(s, 30, yM, 6, M);
    fil("M30 " + yM + " H187", true);
    fil("M30 " + yM + " V" + yT + " H67", secu);
    /* circuit de marche : borne L, contact inverseur commandé par la temporisation, bornes M et S */
    fil("M213 " + yM + " H240", true);
    plot(240, yM);
    fil("M428 " + yM + " H457", marche); fil("M483 " + yM + " H580", marche); fil("M700 " + yM + " H" + xN, marche);
    fil("M398 " + yS + " H457", defaut); fil("M483 " + yS + " H616", defaut); fil("M664 " + yS + " H" + xN, defaut);
    plot(420, yM); plot(390, yS);
    lame(240, yM, defaut ? 390 : 420, defaut ? yS : yM, true);
    borne(200, yM); borne(470, yM); borne(470, yS);
    /* bobine du contacteur */
    rect(s, 580, 115, 120, 50, 6, marche ? "#bfe3cf" : C.papier, M, 3);
    chemin(s, "M600 140 q 10 -16 20 0 t 20 0 t 20 0 t 20 0", M, 2.5);
    /* voyant de défaut */
    if (defaut) cercle(s, 640, yS, 36, JAUNE, null).setAttribute("opacity", 0.45);
    cercle(s, 640, yS, 24, defaut ? JAUNE : C.papier, M, 3);
    ligne(s, 623, yS - 17, 657, yS + 17, M, 3); ligne(s, 623, yS + 17, 657, yS - 17, M, 3);
    /* circuit de sécurité : contact T1-T2 commandé par la pression nette, puis la résistance de la temporisation */
    borne(80, yT);
    fil("M93 " + yT + " H110", secu);
    plot(110, yT); plot(200, yT);
    lame(110, yT, secu ? 200 : 188, secu ? yT : 380, secu);
    fil("M208 " + yT + " H222", secu); borne(235, yT); fil("M248 " + yT + " H270", secu);
    rect(s, 270, 400, 130, 50, 6, secu ? "#ffe0cc" : C.papier, M, 3);
    chemin(s, "M284 425 l 9 -14 l 12 28 l 12 -28 l 12 28 l 12 -28 l 12 28 l 9 -14", M, 2.5);
    fil("M400 " + yT + " H" + xN, secu);
    /* liaison mécanique : la résistance chauffe le bilame qui déplace la lame L-M */
    chemin(s, "M335 396 V232", M, 3, { "stroke-dasharray": "9 8" });
    poly(s, "335,222 327,238 343,238", M);

    /* noms de bornes et étiquettes, chacun collé à sa borne */
    lettre(s, 200, yM - 46, "L"); lettre(s, 470, yM - 46, "M"); lettre(s, 470, yS + 46, "S");
    lettre(s, 80, yT - 46, "T1"); lettre(s, 235, yT - 46, "T2");
    etiq(s, 95, 78, "Arrivée");
    etiq(s, 640, 58, ["Bobine du", "contacteur"]);
    etiq(s, 595, 335, ["Voyant de", "défaut"]);
    etiq(s, 775, 340, "Neutre");
    etiq(s, 335, 502, "Temporisation");
    etiq(s, 110, 505, ["Contact de", "pression"]);
    return { noeud: s, regler: function () {}, reperes: [] };
  }

  /* ======================================================================
     HUILE-APPAREIL  (viewBox 840 x 600, contenu centré) : couvercle ouvert, d'après la vue « Design » de la fiche
     ====================================================================== */
  function fabAppareil(o) {
    var s = P.racine(720, 600, o.label || "Pressostat d’huile, couvercle ouvert");
    fili(s, [[400, 320]], 320);
    var gA = P.degrade(s, C.acierClair, C.acier), gAh = P.degrade(s, C.acierClair, C.acier, true), gL = P.degrade(s, C.laiton, C.laitonFonce, true),
      gLv = P.degrade(s, C.laiton, C.laitonFonce), gB = P.degrade(s, C.boitier, C.boitierFonce), gC = P.degrade(s, "#e4b08a", C.cuivre);
    var rearm = o.accent === "rearmement", reperes = [], i, cxA = 250;

    /* prise LP en haut : embout, écrou, capsule bleue pâle */
    rect(s, cxA - 12, 22, 24, 34, 3, gL, M, 3);
    for (i = 0; i < 3; i++) ligne(s, cxA - 12, 30 + i * 9, cxA + 12, 30 + i * 9, M, 1.8);
    ecrou(s, cxA - 32, 56, 64, 28, gL);
    rect(s, cxA - 66, 84, 132, 84, 16, C.bpPale, M, 3);
    ligne(s, cxA - 44, 100, cxA + 44, 100, C.blanc, 4, { opacity: 0.85 });
    /* prise OIL en bas : capsule rouge pâle */
    rect(s, cxA - 66, 432, 132, 84, 16, C.hpPale, M, 3);
    ligne(s, cxA - 44, 448, cxA + 44, 448, C.blanc, 4, { opacity: 0.85 });
    ecrou(s, cxA - 32, 516, 64, 28, gL);
    rect(s, cxA - 12, 544, 24, 34, 3, gL, M, 3);
    for (i = 0; i < 3; i++) ligne(s, cxA - 12, 552 + i * 9, cxA + 12, 552 + i * 9, M, 1.8);

    /* boîtier : tôle en coupe, vide intérieur */
    rect(s, 90, 168, 430, 264, 12, C.interieur, null, 0);
    chemin(s, "M90 168 H520 V432 H90 Z M104 182 H506 V418 H104 Z", M, 3, { fill: gB, "fill-rule": "evenodd" });

    /* disque de réglage, échelle intérieure, vis, ressort */
    rect(s, 116, 206, 52, 104, 5, C.papier, M, 2.5);
    for (i = 0; i < 9; i++) ligne(s, 124, 216 + i * 11, i % 2 ? 142 : 152, 216 + i * 11, M, 2);
    ligne(s, 118, 262, 166, 262, C.accent, 5);
    rect(s, cxA - 8, 200, 16, 215, 3, gAh, M, 2.5);
    for (i = 0; i < 18; i++) ligne(s, cxA - 8, 208 + i * 11, cxA + 8, 203 + i * 11, M, 1.4);
    for (i = 0; i < 9; i++) {
      chemin(s, "M" + (cxA + 44) + " " + (262 + i * 17 + 8) + " L" + (cxA - 44) + " " + (262 + i * 17 + 17), M, 9);
      chemin(s, "M" + (cxA + 44) + " " + (262 + i * 17 + 8) + " L" + (cxA - 44) + " " + (262 + i * 17 + 17), C.acier, 5);
    }
    el("ellipse", { cx: cxA, cy: 222, rx: 56, ry: 15, fill: gA, stroke: M, "stroke-width": 3 }, s);
    for (i = -3; i <= 3; i++) ligne(s, cxA + i * 15, 212, cxA + i * 15 + 3, 232, M, 2.5);
    rect(s, cxA - 44, 408, 88, 12, 3, C.acierClair, M, 2.5);

    /* bouton d'essai, côté gauche : poussoir qui traverse la paroi */
    ligne(s, 112, 332, 205, 332, M, 12); ligne(s, 112, 332, 205, 332, C.acier, 6);
    rect(s, 56, 316, 34, 32, 6, gC, M, 3);
    rect(s, 88, 324, 22, 16, 2, gA, M, 2.5);

    /* bornier à droite : bloc cuivré, cinq vis fendues */
    rect(s, 372, 200, 112, 206, 8, gC, M, 3);
    for (i = 0; i < 5; i++) {
      cercle(s, 410, 232 + i * 38, 14, gLv, M, 3);
      ligne(s, 403, 225 + i * 38, 417, 239 + i * 38, M, 2.8);
      rect(s, 436, 224 + i * 38, 34, 16, 3, C.interieur, M, 2);
    }

    /* bouton de réarmement : poussoir vertical sur le dessus du boîtier */
    var bx = 410, capCol = rearm ? C.accent : C.vert;
    rect(s, bx - 8, 128, 16, 44, 2, gA, M, 2.5);
    rect(s, bx - 30, 100, 60, 32, 10, capCol, M, 3.5);
    ligne(s, bx - 20, 110, bx + 20, 110, C.blanc, 3, { opacity: 0.7 });
    /* entrée de câble en bas à droite */
    ecrou(s, 440, 432, 56, 18, gL);
    poly(s, "446,450 490,450 482,486 454,486", C.repos, M, 3);
    rect(s, 458, 486, 20, 56, 4, C.repos, M, 3);

    if (rearm) {
      /* un doigt au trait appuie sur le bouton, penché, venant du haut à droite */
      var gd = groupe(s, { transform: "translate(" + bx + " 98) rotate(24)" });
      chemin(gd, "M-23 -260 V-26 Q-23 3 0 3 Q23 3 23 -26 V-260 Z", M, 3.5, { fill: C.papier });
      chemin(gd, "M4 -14 Q4 -54 13 -54 Q21 -54 21 -14", M, 2.4);
      chemin(gd, "M-17 -100 q 17 8 34 0", M, 2.4); chemin(gd, "M-17 -128 q 17 8 34 0", M, 2.4);
      ligne(s, bx - 50, 104, bx - 38, 108, C.accent, 5);
      ligne(s, bx - 54, 118, bx - 40, 118, C.accent, 5);
      ligne(s, bx - 50, 132, bx - 38, 128, C.accent, 5);
    } else if (o.reperes) {
      var K = 1.9;
      pastilleG(s, 318, 222, 1, K);
      pastilleG(s, bx + 52, 116, 2, K);
      pastilleG(s, 52, 296, 3, K);
      pastilleG(s, cxA + 56, 560, 4, K);
      pastilleG(s, cxA + 56, 40, 5, K);
      reperes = [{ n: 1, nom: "Disque de réglage" }, { n: 2, nom: "Bouton de réarmement" }, { n: 3, nom: "Bouton d’essai" }, { n: 4, nom: "Prise OIL" }, { n: 5, nom: "Prise LP" }];
    }
    /* cadre plus large (840 x 600) : le dessin garde une marge et reste entier dans le cadre de la page */
    s.setAttribute("viewBox", "-60 0 840 600");
    var fond = s.querySelector("rect"); fond.setAttribute("x", -60); fond.setAttribute("width", 840);
    return { noeud: s, regler: function () {}, reperes: reperes };
  }

  P.enregistrer("huile-circuit", fabCircuit);
  P.enregistrer("huile-graissage", fabGraissage);
  P.enregistrer("huile-chrono", fabChrono);
  P.enregistrer("huile-bornes", fabBornes);
  P.enregistrer("huile-appareil", fabAppareil);
})();

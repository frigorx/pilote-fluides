/* Socle pressostats : dessins-schemas.js
   Rôle : types de dessin circuit, face, versions, bornes, plaque, famille (SVG construit en JavaScript).
   Contrat : PressostatDessins.creer(type, options) rend { noeud, regler(etat), reperes }.
     reperes = [{ n, nom }] des pastilles posées ; regler accepte un état partiel et ne plante jamais.
   Dépend de dessins-base.js (palette C, el, racine, texte, filigrane, pastille, etiquette, degrade).
   Règles : aucun texte sur un tracé, symboles repris de packs/fluides/res/symboles/*.svg, pas de marque. */
(function () {
  "use strict";
  var P = window.PressostatDessins;
  if (!P) return;
  var C = P.C, el = P.el;
  var REDUIT = false;
  try { REDUIT = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { REDUIT = false; }
  var D_LENT = REDUIT ? "0ms" : "250ms", D_VIF = REDUIT ? "0ms" : "80ms";
  var TXT = 36, JAUNE = "#ffd23f";

  /* ---------- petites aides de dessin ---------- */
  function chemin(p, d, col, w, extra) {
    var a = { d: d, fill: "none", stroke: col || C.marine, "stroke-width": w || 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) a[k] = extra[k];
    return el("path", a, p);
  }
  function rect(p, x, y, w, h, r, fill, stroke, sw) {
    return el("rect", { x: x, y: y, width: w, height: h, rx: r || 0, fill: fill || "none", stroke: stroke || "none", "stroke-width": sw || 0 }, p);
  }
  function cercle(p, x, y, r, fill, stroke, sw) {
    return el("circle", { cx: x, cy: y, r: r, fill: fill || "none", stroke: stroke || "none", "stroke-width": sw || 0 }, p);
  }
  function ligne(p, x1, y1, x2, y2, col, w) {
    return el("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col || C.marine, "stroke-width": w || 3, "stroke-linecap": "round" }, p);
  }
  function poly(p, pts, fill, stroke, sw) {
    return el("polygon", { points: pts, fill: fill || "none", stroke: stroke || "none", "stroke-width": sw || 0, "stroke-linejoin": "round" }, p);
  }
  function groupe(p, attrs) { return el("g", attrs || null, p); }

  function styleCommun(s) {
    el("style", null, s).textContent =
      ".pd-av{animation:pd-av .9s linear infinite}@keyframes pd-av{to{stroke-dashoffset:-32}}" +
      ".pd-clac{opacity:0}.pd-clac.on{animation:pd-clac .4s ease-out forwards}@keyframes pd-clac{0%{opacity:1}100%{opacity:0}}" +
      ".pd-tourne{animation:pd-tourne 1.6s linear infinite}@keyframes pd-tourne{to{transform:rotate(360deg)}}" +
      "@media (prefers-reduced-motion:reduce){.pd-av,.pd-tourne,.pd-clac.on{animation:none}}";
  }

  /* Pièce mobile : g en coordonnées absolues, tourne autour de (ox, oy). Rend poser(dx, dy, angle, scaleY). */
  function mobile(g, ox, oy, duree) {
    g.style.transformOrigin = ox + "px " + oy + "px";
    var premier = true;
    return function (dx, dy, ang, sy, sx) {
      var t = "translate(" + (dx || 0) + "px," + (dy || 0) + "px) rotate(" + (ang || 0) + "deg)" + (sy != null || sx != null ? " scale(" + (sx == null ? 1 : sx) + "," + (sy == null ? 1 : sy) + ")" : "");
      if (premier) { g.style.transform = t; premier = false; setTimeout(function () { g.style.transition = "transform " + duree + " ease-out"; }, 30); return; }
      g.style.transition = "transform " + duree + " ease-out";
      g.style.transform = t;
    };
  }

  /* Le « clac » : trois petits traits orange qui rayonnent puis s'effacent en 400 ms. */
  function clac(p, x, y, ang) {
    var g = groupe(p, { class: "pd-clac" }), i, a;
    for (i = -1; i <= 1; i++) {
      a = (ang + i * 42) * Math.PI / 180;
      ligne(g, x + 14 * Math.cos(a), y + 14 * Math.sin(a), x + 32 * Math.cos(a), y + 32 * Math.sin(a), C.accent, 4);
    }
    return function () {
      if (REDUIT) return;
      g.classList.remove("on");
      void g.getBoundingClientRect();
      g.classList.add("on");
    };
  }

  /* Étiquettes : taille 32 pour un dessin de 900 de large. cx, cy = centre de la boîte. */
  function larg(txt, t) { return Math.round(txt.length * t * 0.5) + 26; }
  function E(p, cx, cy, txt, opt) {
    var o = opt || {}, t = o.taille || TXT;
    return P.etiquette(p, cx, cy + t / 2 - 2, txt, { taille: t, largeur: o.largeur || larg(txt, t), gras: o.gras, couleur: o.couleur, fond: o.fond, bord: o.bord });
  }
  function E2(p, cx, cy, lignes, opt) {
    var o = opt || {}, t = o.taille || TXT, lh = Math.round(t * 1.25), w = 0, h = lh * lignes.length + 12, g = groupe(p, { class: "etiquette" }), i;
    lignes.forEach(function (l) { w = Math.max(w, larg(l, t)); });
    if (o.largeur) w = o.largeur;
    rect(g, cx - w / 2, cy - h / 2, w, h, 7, C.papier, C.marine, 1.2).setAttribute("data-support", "1");
    for (i = 0; i < lignes.length; i++) P.texte(g, cx, cy - h / 2 + 6 + lh * i + t * 0.84, lignes[i], { "text-anchor": "middle", "font-size": t, "font-weight": 500 });
    return g;
  }
  /* Lettre ou chiffre de borne : gras 34, boîte étroite collée à la borne. */
  function lettre(p, cx, cy, ch, pt) {
    var f = pt || 40, g = groupe(p, { class: "etiquette" }), w = f * (ch.length > 1 ? 1.45 : 1.2), h = f * 1.4;
    rect(g, cx - w / 2, cy - h / 2, w, h, 8, C.papier, C.marine, 1.2).setAttribute("data-support", "1");
    P.texte(g, cx, cy + f * 0.35, ch, { "text-anchor": "middle", "font-size": f, "font-weight": 700 });
    return g;
  }

  /* Pastille de la base, agrandie pour rester lisible sur téléphone (k = 1,7 environ). */
  function pastilleG(p, x, y, n, k) {
    var g = groupe(p, { transform: "translate(" + x + " " + y + ") scale(" + k + ") translate(" + (-x) + " " + (-y) + ")" });
    return P.pastille(g, x, y, n);
  }

  /* ---------- pièces communes ---------- */
  function borne(p, x, y, grad) {
    var g = groupe(p);
    cercle(g, x, y, 13, grad, C.marine, 3);
    ligne(g, x - 6, y - 6, x + 6, y + 6, C.marine, 2.5);
    return g;
  }
  function plot(p, x, y) { return cercle(p, x, y, 8, C.cuivre, C.marine, 3); }

  /* Conducteur : gris 4 sans courant ; orange 6 avec des tirets qui avancent quand il est parcouru. */
  function fil(p, d) {
    var base = chemin(p, d, C.repos, 4), tir = chemin(p, d, C.blanc, 2.5, { "stroke-dasharray": "8 24", opacity: 0.85, display: "none" });
    return { maj: function (on) {
      base.setAttribute("stroke", on ? C.accent : C.repos);
      base.setAttribute("stroke-width", on ? 6 : 4);
      tir.setAttribute("display", on ? "inline" : "none");
      if (on) tir.setAttribute("class", "pd-av"); else tir.removeAttribute("class");
    } };
  }
  /* Lame de contact : contour marine, âme grise ou orange selon le courant. */
  function lame(p, px, py, longueur) {
    var g = groupe(p), d = "M" + px + " " + py + " H" + (px + longueur);
    chemin(g, d, C.marine, 13);
    var ame = chemin(g, d, C.repos, 7);
    return { g: g, maj: function (on) { ame.setAttribute("stroke", on ? C.accent : C.repos); } };
  }
  function voyant(p, x, y, k) {
    var g = groupe(p, k ? { transform: "translate(" + x + " " + y + ") scale(" + k + ") translate(" + (-x) + " " + (-y) + ")" } : null), halo = cercle(g, x, y, 36, JAUNE, null);
    halo.setAttribute("opacity", 0); halo.setAttribute("data-support", "1");
    var c = cercle(g, x, y, 24, C.papier, C.marine, 3);
    ligne(g, x - 17, y - 17, x + 17, y + 17, C.marine, 3);
    ligne(g, x - 17, y + 17, x + 17, y - 17, C.marine, 3);
    return { maj: function (on) { halo.setAttribute("opacity", on ? 0.45 : 0); c.setAttribute("fill", on ? JAUNE : C.papier); } };
  }
  function flecheV(p, x, y1, y2, col) {  /* flèche verticale, pointe en y2 */
    var s = y2 > y1 ? 1 : -1, g = groupe(p);
    ligne(g, x, y1, x, y2 - s * 14, col, 7);
    poly(g, (x - 15) + "," + (y2 - s * 22) + " " + (x + 15) + "," + (y2 - s * 22) + " " + x + "," + y2, col, col, 2);
    return g;
  }
  /* Soufflet de laiton plissé en coordonnées absolues : centre x, plateau haut yh, base yb. */
  function soufflet(p, x, yh, yb, demi, grad) {
    var g = groupe(p), n = 6, h = (yb - yh) / n, i, gauche = "", droite = "";
    for (i = 0; i <= n; i++) {
      gauche += (i ? " L" : "M") + (x - demi + (i % 2 ? 8 : 0)) + " " + (yh + i * h);
    }
    for (i = n; i >= 0; i--) droite += " L" + (x + demi - (i % 2 ? 8 : 0)) + " " + (yh + i * h);
    chemin(g, gauche + droite + " Z", C.marine, 3, { fill: grad, "vector-effect": "non-scaling-stroke" });
    return g;
  }
  function terre(p, x, y) {   /* symbole normalisé : un trait vertical, puis trois traits horizontaux décroissants */
    var g = groupe(p);
    ligne(g, x, y, x, y + 22, C.marine, 4);
    ligne(g, x - 20, y + 22, x + 20, y + 22, C.marine, 4);
    ligne(g, x - 13, y + 33, x + 13, y + 33, C.marine, 4);
    ligne(g, x - 6, y + 44, x + 6, y + 44, C.marine, 4);
    return g;
  }

  /* ---------- symboles de la bibliothèque (packs/fluides/res/symboles) ---------- */
  /* compresseur_piston.svg : cercle, trapèze, piston ; ports à gauche et à droite (viewBox -24 -20 50 40). */
  function symCompresseur(p, k, fill, rot) {
    var g = groupe(p, { transform: "rotate(" + (rot || 0) + ")" }), w = 3 / k, s = C.marine;
    var h = groupe(g, { transform: "scale(" + k + ")" });
    cercle(h, 0, 0, 15, fill, s, w);
    [[-15, 0, -16, 0], [15, 0, 16, 0], [-7, -13, 13, -7], [-7, 13, 13, 7], [-4, 0, 5, 0], [-5, -5, -5, 5]].forEach(function (l) { ligne(h, l[0], l[1], l[2], l[3], s, w); });
    cercle(h, -16, 0, 1.5, s); cercle(h, 16, 0, 1.5, s);
    return g;
  }
  /* echangeur_a_air.svg : boîte, ventilateur (3 pales), peigne d'ailettes ; le tube est dessiné par le circuit. */
  function symEchangeur(p, k, fill, flip) {
    var g = groupe(p), h = groupe(g, { transform: "scale(" + k + "," + (flip ? -k : k) + ")" }), w = 3 / k, s = C.marine, i;
    rect(h, -18, -20, 36, 48, 0, fill, s, w);
    var fan = groupe(h), cf = cercle(fan, -5, 2, 9, C.papier, s, w * 0.8), pales = groupe(fan);
    for (i = 0; i < 3; i++) chemin(pales, "M -5 2 C -3 -2 -3 -5 -5 -6 C -7 -5 -7 -2 -5 2 Z", s, w * 0.8, { transform: "rotate(" + (i * 120) + " -5 2)", fill: C.papier });
    ligne(h, 11, -15, 11, 20, s, w);
    [-12, -5, 2, 9, 16].forEach(function (y) { ligne(h, 6, y, 11, y, s, w); });
    return { g: g, fan: cf, pales: pales };
  }
  /* detendeur_thermo_int.svg : nœud papillon, tige, bulbe ; ports à gauche et à droite. */
  function symDetendeur(p, k, fill, rot) {
    var g = groupe(p, { transform: "rotate(" + (rot || 0) + ")" }), h = groupe(g, { transform: "scale(" + k + ")" }), w = 3 / k, s = C.marine;
    ligne(h, 10, 0, 11, 0, s, w); ligne(h, -10, 0, -11, 0, s, w);
    poly(h, "2,1 0,3 -2,1 -10,5 -10,-5 10,5 10,-5 -2,1", fill, s, w);
    ligne(h, 0, 0, 0, -6, s, w);
    cercle(h, 0, -12, 5.83, C.papier, s, w);
    return g;
  }
  /* vanne_isolement.svg : nœud papillon et point central. */
  function symVanne(p, k, fill, rot) {
    var g = groupe(p, { transform: "rotate(" + (rot || 0) + ")" }), h = groupe(g, { transform: "scale(" + k + ")" }), w = 3 / k, s = C.marine;
    ligne(h, 10, 0, 11, 0, s, w); ligne(h, -10, 0, -11, 0, s, w);
    poly(h, "-10,-5 10,5 10,-5 -10,5", fill, s, w);
    cercle(h, 0, 0, 2, s, s, 0.5);
    return g;
  }

  /* ======================================================================
     BORNES  (viewBox 900 x 560)
     ====================================================================== */
  function fabBornes(o) {
    var modele = o.modele === "bp" || o.modele === "hp" ? o.modele : "combine";
    if (o.etroit) return bornesEtroit(o, modele);
    var s = P.racine(900, 560, o.label || "Schéma des bornes du pressostat " + modele);
    styleCommun(s);
    P.filigrane(s, [[450, 300], [150, 480], [760, 120]], 560);
    return modele === "combine" ? bornesCombine(s) : bornesSimple(s, modele);
  }

  function bornesCombine(s) {
    var grad = P.degrade(s, C.laiton, C.laitonFonce), F = {}, i;
    var yM = 250;
    /* conducteurs fixes */
    F.arr = fil(s, "M24 250 H157");
    F.feed = fil(s, "M170 237 V120 H430");
    F.aP1 = fil(s, "M183 250 H240");
    F.pont = fil(s, "M360 250 H430");
    F.jc = fil(s, "M550 250 H587");
    F.cbob = fil(s, "M613 250 H733");
    F.bobN = fil(s, "M823 250 H888");
    F.dplot = fil(s, "M541 75 H597");
    F.dlamp = fil(s, "M623 75 H754");
    F.dN = fil(s, "M802 75 H888");
    F.bW = fil(s, "M338 319 V372");
    F.bL = fil(s, "M338 398 V426");
    F.bN = fil(s, "M338 474 V525 H888");
    F.nTop = fil(s, "M888 75 V250");
    F.nMid = fil(s, "M888 250 V525");
    F.nExit = fil(s, "M888 525 V548");
    cercle(s, 24, 250, 6, C.marine); cercle(s, 888, 548, 6, C.papier, C.marine, 3);

    /* bobine du contacteur */
    var bob = rect(s, 733, 225, 90, 50, 6, C.papier, C.marine, 3);
    /* voyants */
    var vBP = voyant(s, 338, 450), vHP = voyant(s, 778, 75);
    /* bornes et plots */
    plot(s, 360, 250); plot(s, 550, 250); plot(s, 338, 319); plot(s, 541, 75);
    borne(s, 170, 250, grad); borne(s, 600, 250, grad); borne(s, 338, 385, grad); borne(s, 610, 75, grad);
    /* pivots */
    cercle(s, 240, 250, 8, C.acier, C.marine, 3); cercle(s, 430, 250, 8, C.acier, C.marine, 3); cercle(s, 430, 120, 8, C.acier, C.marine, 3);
    /* soufflets : BP en bas (tige x=290), HP en haut (tige x=490) */
    var gPleBP = groupe(s), gPleHP = groupe(s), gTopBP = groupe(s), gTopHP = groupe(s);
    rect(s, 284, 380, 12, 50, 0, C.cuivre, C.marine, 3);
    rect(s, 484, 380, 12, 30, 0, C.cuivre, C.marine, 3);
    gPleBP.appendChild(soufflet(s, 290, 310, 370, 28, grad)); gPleHP.appendChild(soufflet(s, 490, 310, 370, 28, grad));
    rect(s, 262, 370, 56, 10, 3, C.acier, C.marine, 3); rect(s, 462, 370, 56, 10, 3, C.acier, C.marine, 3);
    ligne(gTopBP, 290, 250, 290, 300, C.acier, 6); rect(gTopBP, 262, 300, 56, 10, 3, C.acier, C.marine, 3);
    ligne(gTopHP, 490, 250, 490, 300, C.acier, 6); rect(gTopHP, 462, 300, 56, 10, 3, C.acier, C.marine, 3);
    flecheV(s, 235, 335, 392, C.bp);
    flecheV(s, 436, 410, 350, C.hp);
    /* lames et liaison mécanique */
    var lBP = lame(s, 240, 250, 120), lHP = lame(s, 430, 250, 120), lS = lame(s, 430, 120, 120);
    var gLien = groupe(s);
    chemin(gLien, "M490 250 V120", C.marine, 3, { "stroke-dasharray": "7 7" });
    cercle(gLien, 490, 250, 5, C.marine); cercle(gLien, 490, 120, 5, C.marine);
    var pBP = mobile(lBP.g, 240, 250, D_VIF), pHP = mobile(lHP.g, 430, 250, D_VIF), pS = mobile(lS.g, 430, 120, D_VIF), pLien = mobile(gLien, 490, 250, D_VIF);
    var pTopBP = mobile(gTopBP, 290, 250, D_LENT), pTopHP = mobile(gTopHP, 490, 250, D_LENT), pPleBP = mobile(gPleBP, 290, 370, D_LENT), pPleHP = mobile(gPleHP, 490, 370, D_LENT);
    var kBP = clac(s, 338, 319, 20), kHP = clac(s, 541, 205, -40), kD = clac(s, 541, 75, -40);

    /* étiquettes (toutes dans des zones libres) */
    E(s, 80, 205, "Arrivée");
    E(s, 285, 205, "Contact BP");
    E2(s, 597, 330, ["Contact", "HP"], { largeur: 142 });
    E(s, 175, 505, "Voyant défaut BP");
    E2(s, 778, 168, ["Voyant", "défaut HP"]);
    E2(s, 778, 335, ["Bobine du", "contacteur"]);
    E(s, 805, 470, "Neutre");
    lettre(s, 170, 300, "A"); lettre(s, 385, 385, "B"); lettre(s, 600, 205, "C"); lettre(s, 610, 124, "D");
    /* terre, à part */
    borne(s, 50, 380, grad); terre(s, 50, 380); E(s, 152, 410, "Terre");

    var ETATS = {
      "marche": { bp: 0, hp: 0, vivants: ["arr", "aP1", "pont", "jc", "cbob", "bobN", "nMid", "nExit"], lBP: 1, lHP: 1, lS: 0, bob: 1, vBP: 0, vHP: 0 },
      "defaut-bp": { bp: 35, hp: 0, vivants: ["arr", "aP1", "bW", "bL", "bN", "nExit"], lBP: 1, lHP: 0, lS: 0, bob: 0, vBP: 1, vHP: 0 },
      "defaut-hp": { bp: 0, hp: -22, vivants: ["arr", "feed", "dplot", "dlamp", "dN", "nTop", "nMid", "nExit"], lBP: 0, lHP: 0, lS: 1, bob: 0, vBP: 0, vHP: 1 }
    };
    var courant = null;
    function regler(e) {
      var nom = e && e.etat, E_ = ETATS[nom], k;
      if (!E_) E_ = ETATS[courant || "marche"], nom = courant || "marche";
      for (k in F) F[k].maj(E_.vivants.indexOf(k) >= 0);
      lBP.maj(E_.lBP); lHP.maj(E_.lHP); lS.maj(E_.lS);
      pBP(0, 0, E_.bp); pHP(0, 0, E_.hp); pS(0, 0, E_.hp); pLien(E_.hp ? -4.4 : 0, E_.hp ? -22.5 : 0, 0);
      pTopBP(0, E_.bp ? 35 : 0, 0); pPleBP(0, 0, 0, E_.bp ? 0.42 : 1);
      pTopHP(0, E_.hp ? -24.2 : 0, 0); pPleHP(0, 0, 0, E_.hp ? 1.4 : 1);
      bob.setAttribute("fill", E_.bob ? C.vert : C.papier);
      vBP.maj(E_.vBP); vHP.maj(E_.vHP);
      if (courant && courant !== nom) {
        if (nom === "defaut-bp" || courant === "defaut-bp") kBP();
        if (nom === "defaut-hp" || courant === "defaut-hp") { kHP(); kD(); }
      }
      courant = nom;
    }
    regler({ etat: "marche" });
    return { noeud: s, regler: regler, reperes: [] };
  }

  /* bp : bornes 1, 2, 4 (1-4 vers le compresseur, 1-2 vers le voyant). hp : 1-2 vers le compresseur, 1-4 vers le voyant. */
  function bornesSimple(s, modele) {
    var hp = modele === "hp", grad = P.degrade(s, C.laiton, C.laitonFonce), F = {};
    var y = hp ? 330 : 230, sgn = hp ? -1 : 1, ang = hp ? -30 : 30, yV = hp ? 130 : 430;
    var fermee = hp ? "2" : "4", ouverte = hp ? "4" : "2";
    var tx = 170 + 200 * Math.cos(ang * Math.PI / 180), ty = y + 200 * Math.sin(ang * Math.PI / 180);   /* plot de la position ouverte */
    var xN = 860, yMin = Math.min(y, yV), yMax = Math.max(y, yV);
    F.arr = fil(s, "M24 " + y + " H157");
    F.charge = fil(s, "M370 " + y + " H642");
    F.chargeN = fil(s, "M738 " + y + " H" + xN);
    F.sW = fil(s, "M" + Math.round(tx) + " " + Math.round(ty) + " V" + yV + " H536");
    F.sL = fil(s, "M584 " + yV + " H" + xN);
    F.nv = fil(s, "M" + xN + " " + yMin + " V" + yMax);
    plot(s, 370, y); plot(s, Math.round(tx), Math.round(ty));
    borne(s, 170, y, grad);
    symCompresseur(el("g", { transform: "translate(690 " + y + ")" }, s), 3, C.papier, 0);
    var vo = voyant(s, 560, yV);
    var gl = lame(s, 170, y, 200);
    /* soufflet sous la lame, tige x=230 (BP : au-dessus de la flèche vers le bas ; HP : flèche vers le haut) */
    var xt = 230, dy = 60 * Math.tan(30 * Math.PI / 180);
    var yb = hp ? y + 150 : y + 170, yp = hp ? y + 40 : y + 80;  /* base et plateau (marche) */
    var gPle = groupe(s), gTop = groupe(s);
    rect(s, xt - 6, yb, 12, 50, 0, C.cuivre, C.marine, 3);
    gPle.appendChild(soufflet(s, xt, yp + 10, yb, 28, grad));
    rect(s, xt - 28, yb, 56, 10, 3, C.acier, C.marine, 3);
    ligne(gTop, xt, y, xt, yp, C.acier, 6); rect(gTop, xt - 28, yp, 56, 10, 3, C.acier, C.marine, 3);
    if (hp) flecheV(s, xt - 55, yb + 40, yb - 20, C.hp); else flecheV(s, xt - 55, yp + 30, yp + 90, C.bp);
    var pL = mobile(gl.g, 170, y, D_VIF), pT = mobile(gTop, xt, yb, D_LENT), pP = mobile(gPle, xt, yb, D_LENT);
    cercle(s, 170, y, 8, C.acier, C.marine, 3);
    borne(s, Math.round(tx), Math.round(ty), grad); borne(s, 370, y, grad);
    var kk = clac(s, Math.round(tx), Math.round(ty), hp ? -60 : 60);
    /* étiquettes */
    E(s, 80, y + 45, "Arrivée");
    E(s, 690, hp ? y + 95 : y - 90, "Compresseur");
    E(s, 780, hp ? 230 : 330, "Neutre");
    E(s, 600, hp ? 60 : 505, "Voyant de défaut");
    lettre(s, hp ? 126 : 170, y - 50, "1");
    lettre(s, 370, hp ? y + 52 : y - 46, fermee);
    lettre(s, Math.round(tx) + 46, Math.round(ty) + (hp ? -4 : 4), ouverte);
    function regler(e) {
      var d = e && e.etat === "defaut" ? 1 : 0, k;
      F.arr.maj(1);
      F.charge.maj(!d); F.chargeN.maj(!d); F.sW.maj(d); F.sL.maj(d); F.nv.maj(1);
      gl.maj(1);
      pL(0, 0, d ? ang : 0);
      pT(0, d ? sgn * dy : 0, 0); pP(0, 0, 0, d ? (hp ? 1.35 : 0.57) : 1);
      vo.maj(d);
      if (regler.avant !== undefined && regler.avant !== d) kk();
      regler.avant = d;
    }
    regler({ etat: "marche" });
    return { noeud: s, regler: regler, reperes: [] };
  }


  /* ======================================================================
     CIRCUIT  (viewBox 900 x 600)
     ====================================================================== */
  function manometre(p, cx, cy, col, ang, k) {
    var g = groupe(p, k ? { transform: "translate(" + cx + " " + cy + ") scale(" + k + ") translate(" + (-cx) + " " + (-cy) + ")" } : null), i, a;
    cercle(g, cx, cy, 31, C.papier, col, 6);
    for (i = 0; i < 7; i++) {
      a = (-135 + i * 45) * Math.PI / 180;
      ligne(g, cx + 17 * Math.sin(a), cy - 17 * Math.cos(a), cx + 23 * Math.sin(a), cy - 23 * Math.cos(a), C.marine, 2);
    }
    a = ang * Math.PI / 180;
    ligne(g, cx, cy, cx + 21 * Math.sin(a), cy - 21 * Math.cos(a), C.marine, 4);
    cercle(g, cx, cy, 5, C.marine);
    return g;
  }
  function fenetrePlaque(p, x, y, w, h, frac) {   /* petite fenêtre : plaque claire, traits, index orange */
    var g = groupe(p), i, yy;
    rect(g, x, y, w, h, 5, C.papier, C.marine, 2.5);
    for (i = 1; i < 8; i++) { yy = y + i * h / 8; ligne(g, x + 5, yy, x + (i % 2 ? w * 0.4 : w * 0.6), yy, C.marine, 1.8); }
    yy = y + h * (1 - frac);
    rect(g, x + 4, yy - 3, w - 8, 6, 2, C.accent, C.marine, 1.2);
    return g;
  }
  function boitierMini(p, grad, x, y, w, h, fenetres) {   /* petit boîtier gris à fenêtres, vu de face */
    var g = groupe(p), n = fenetres.length, fw = n === 2 ? 36 : 50, i, gap = (w - n * fw) / (n + 1);
    var tetes = n === 2 ? [x + 28, x + 60] : [x + w * 0.33, x + w * 0.66];
    tetes.forEach(function (tx) { rect(g, tx - 5, y - 12, 10, 14, 1, C.acier, C.marine, 2); ellipse2(g, tx, y - 14, 15, 6, grad); });
    rect(g, x, y, w, h, 12, P.degrade(p.ownerSVGElement || p, C.boitier, C.boitierFonce), C.marine, 3);
    for (i = 0; i < n; i++) fenetrePlaque(g, x + gap + i * (fw + gap), y + 14, fw, h - 28, fenetres[i]);
    return g;
  }
  function ellipse2(p, cx, cy, rx, ry, fill) {
    var e = el("ellipse", { cx: cx, cy: cy, rx: rx, ry: ry, fill: fill, stroke: C.marine, "stroke-width": 2.5 }, p);
    ligne(p, cx - rx * 0.55, cy, cx + rx * 0.55, cy, C.marine, 2);
    return e;
  }

  function fabCircuit(o) {
    var prises = o.prises === "bp" || o.prises === "hp" ? o.prises : "deux", man = !!o.manometres, essai = !!o.essai;
    if (o.etroit) return circuitEtroit(o, prises, man, essai);
    var s = P.racine(900, 600, o.label || "Circuit frigorifique fermé avec la prise de pression du pressostat");
    styleCommun(s);
    P.filigrane(s, [[450, 300], [150, 540], [760, 560]], 600);
    var grad = P.degrade(s, C.laiton, C.laitonFonce), hpP = prises !== "bp", bpP = prises !== "hp";
    var cond = symEchangeur(el("g", { transform: "translate(525 130)" }, s), 3, C.hpPale, false);
    var evap = symEchangeur(el("g", { transform: "translate(525 490)" }, s), 3, C.bpPale, true);
    cond.pales.style.transformOrigin = "-5px 2px"; evap.pales.style.transformOrigin = "-5px 2px";
    function tube(d, col) {
      var g = groupe(s);
      chemin(g, d, C.marine, 15); chemin(g, d, col, 9);
      return chemin(g, d, C.blanc, 3, { "stroke-dasharray": "10 22", opacity: 0.85 });
    }
    var tirR = tube("M250 262 V190 H800 V297", C.hp), tirB = tube("M800 363 V430 H250 V358", C.bp);
    function sens(x, y, ang) { poly(el("g", { transform: "translate(" + x + " " + y + ") rotate(" + ang + ")" }, s), "-11,-10 11,0 -11,10", C.papier, C.marine, 3); }
    sens(700, 190, 0); sens(700, 430, 180); sens(800, 395, 90);
    /* prises de pression et capillaires */
    function capillaire(d) { chemin(s, d, C.marine, 9); chemin(s, d, C.cuivre, 4.5); }
    var deux = hpP && bpP, bx = deux ? 25 : 55, bw = deux ? 120 : 90;
    if (hpP) capillaire("M250 235 H200 V290 H150");
    if (bpP) capillaire("M250 385 H222 V335 H150");
    boitierMini(s, grad, bx, 255, bw, 110, deux ? [0.35, 0.65] : [hpP ? 0.7 : 0.35]);
    if (hpP) rect(s, 143, 284, 14, 12, 2, grad, C.marine, 2.5);
    if (bpP) rect(s, 143, 329, 14, 12, 2, grad, C.marine, 2.5);
    [hpP ? 235 : null, bpP ? 385 : null].forEach(function (yy) { if (yy) rect(s, 231, yy - 8, 24, 16, 3, grad, C.marine, 2.5); });
    if (man) {
      if (hpP) { chemin(s, "M257 235 H308", C.marine, 9); chemin(s, "M257 235 H308", C.laiton, 5); manometre(s, 338, 235, C.hp, 55); }
      if (bpP) { chemin(s, "M257 385 H308", C.marine, 9); chemin(s, "M257 385 H308", C.laiton, 5); manometre(s, 338, 385, C.bp, -50); }
    }
    /* organes */
    symCompresseur(el("g", { transform: "translate(250 310)" }, s), 3, C.papier, -90);
    var oVanne = essai && prises !== "hp", oFan = essai && prises !== "bp";
    symVanne(el("g", { transform: "translate(800 235)" }, s), 3, oVanne ? C.accent : grad, 90);
    symDetendeur(el("g", { transform: "translate(800 330)" }, s), 3, C.papier, 90);
    if (oFan) { cond.fan.setAttribute("fill", C.accent); cond.pales.querySelectorAll("path").forEach(function (q) { q.setAttribute("fill", C.accent); }); }
    /* étiquettes */
    E(s, 104, 398, "Pressostat");
    E(s, 418, 310, "Compresseur");
    E(s, 360, 100, "Condenseur");
    E(s, 700, 490, "Évaporateur");
    E(s, 670, 318, "Détendeur");
    E(s, 560, 245, "Refoulement (HP)");
    E2(s, 350, 497, ["Aspiration", "(BP)"]);
    var reperes = [];
    var n = 0;
    if (oVanne) { pastilleG(s, 850, 235, ++n, 2.2); reperes.push({ n: n, nom: "Vanne de départ liquide" }); }
    if (oFan) { pastilleG(s, 612, 120, ++n, 2.2); reperes.push({ n: n, nom: "Ventilateur du condenseur" }); }
    function regler(e) {
      var m = !(e && e.marche === false);
      [tirR, tirB].forEach(function (t) { if (m) t.setAttribute("class", "pd-av"); else t.removeAttribute("class"); });
      [cond.pales, evap.pales].forEach(function (t) { if (m) t.setAttribute("class", "pd-tourne"); else t.removeAttribute("class"); });
    }
    regler({ marche: true });
    return { noeud: s, regler: regler, reperes: reperes };
  }

  /* ======================================================================
     FACE  (viewBox 720 x 560)
     ====================================================================== */
  function teteVis(p, x, y, rx, ry, grad) {
    var g = groupe(p);
    el("ellipse", { cx: x, cy: y, rx: rx, ry: ry, fill: grad, stroke: C.marine, "stroke-width": 3 }, g);
    ligne(g, x - rx * 0.6, y, x + rx * 0.6, y, C.marine, 3);
    return g;
  }
  function fenetreGraduee(p, x, y, w, h, frac) {
    var g = groupe(p), i, yy;
    rect(g, x, y, w, h, 12, C.papier, C.marine, 3);
    for (i = 1; i < 16; i++) { yy = y + 10 + i * (h - 20) / 16; ligne(g, x + 12, yy, x + (i % 4 ? 36 : 56), yy, C.marine, i % 4 ? 2 : 3); }
    yy = y + 10 + (h - 20) * (1 - frac);
    rect(g, x + 6, yy - 5, w - 12, 10, 4, C.accent, C.marine, 2);
    return g;
  }
  function raccordFace(p, x, yTop, grad, gradH, capSens) {
    var g = groupe(p);
    chemin(g, "M" + x + " " + (yTop + 52) + " V" + (yTop + 100) + " Q" + x + " " + (yTop + 128) + " " + (x + capSens * 26) + " " + (yTop + 134), C.marine, 9);
    chemin(g, "M" + x + " " + (yTop + 52) + " V" + (yTop + 100) + " Q" + x + " " + (yTop + 128) + " " + (x + capSens * 26) + " " + (yTop + 134), C.cuivre, 4.5);
    rect(g, x - 14, yTop + 28, 28, 28, 3, gradH, C.marine, 3);
    rect(g, x - 28, yTop, 56, 30, 4, gradH, C.marine, 3);
    ligne(g, x - 10, yTop + 3, x - 10, yTop + 27, C.marine, 2); ligne(g, x + 10, yTop + 3, x + 10, yTop + 27, C.marine, 2);
    return g;
  }
  function entreeCable(p, x, yTop, sens) {
    var g = groupe(p);
    chemin(g, "M" + x + " " + (yTop + 36) + " V" + (yTop + 70) + " Q" + x + " " + (yTop + 108) + " " + (x + sens * 36) + " " + (yTop + 134), C.marine, 22);
    chemin(g, "M" + x + " " + (yTop + 36) + " V" + (yTop + 70) + " Q" + x + " " + (yTop + 108) + " " + (x + sens * 36) + " " + (yTop + 134), C.acier, 16);
    poly(g, (x - 26) + "," + yTop + " " + (x + 26) + "," + yTop + " " + (x + 17) + "," + (yTop + 40) + " " + (x - 17) + "," + (yTop + 40), "#6b7683", C.marine, 3);
    return g;
  }
  function doigt(p, x, y, sens) {    /* index vu de dessus, bout du doigt en (x, y), qui vient du haut (à droite si sens = 1, à gauche si -1) */
    var g = groupe(p), d = "M" + x + " " + y + " L" + (x + 66 * (sens || 1)) + " " + (y - 120);
    chemin(g, d, C.marine, 40); chemin(g, d, C.papier, 33);
    chemin(g, "M" + (x - 6) + " " + (y - 14) + " Q" + x + " " + (y - 20) + " " + (x + 8) + " " + (y - 14), C.marine, 2.5);
    return g;
  }

  /* Appareil combiné vu de face, coordonnées de la vue 720 x 560. simple : sans raccords ni câble. */
  function corpsCombine(g, s, simple, accent) {
    var gr = P.degrade(s, "#e1e6ec", C.boitierFonce), grL = P.degrade(s, C.laiton, C.laitonFonce), grLh = P.degrade(s, C.laiton, C.laitonFonce, true);
    var grV = P.degrade(s, "#5cc08a", C.vert);
    if (!simple) {
      raccordFace(g, 190, 410, grL, grLh, 1); raccordFace(g, 530, 410, grL, grLh, -1);
      entreeCable(g, 360, 410, 1);
    }
    [135, 215, 585].forEach(function (x) { rect(g, x - 12, 146, 24, 28, 2, C.acier, C.marine, 3); });
    rect(g, 60, 170, 600, 240, 26, gr, C.marine, 3);
    rect(g, 76, 186, 568, 208, 18, "#eef1f5", C.marine, 2);
    fenetreGraduee(g, 130, 198, 100, 184, 0.4);
    fenetreGraduee(g, 490, 198, 100, 184, 0.62);
    [135, 215, 585].forEach(function (x) { teteVis(g, x, 142, 28, 12, grL); });
    var bx = accent ? 500 : 330;   /* avec l'accent, le bouton passe au-dessus du côté HP */
    rect(g, bx - 8, 164, 76, 12, 5, "#5b6672", C.marine, 2.5);
    var tab = groupe(g);
    rect(tab, bx, 144, 60, 26, 9, accent ? C.accent : grV, C.marine, 3);
    ligne(tab, bx + 12, 157, bx + 48, 157, C.marine, 2);
    return { tab: tab };
  }
  function fenetreDeux(p, x, y, w, h, f1, f2) {   /* fenêtre à deux échelles côte à côte, un index sur chacune */
    var g = groupe(p), i, yy, m = x + w / 2;
    rect(g, x, y, w, h, 12, C.papier, C.marine, 3);
    ligne(g, m, y + 10, m, y + h - 10, C.marine, 2);
    for (i = 1; i < 16; i++) {
      yy = y + 10 + i * (h - 20) / 16;
      ligne(g, x + 10, yy, x + (i % 4 ? 22 : 34), yy, C.marine, i % 4 ? 2 : 3);
      ligne(g, m + 10, yy, m + (i % 4 ? 22 : 34), yy, C.marine, i % 4 ? 2 : 3);
    }
    [[x + 6, f1], [m + 6, f2]].forEach(function (c) { rect(g, c[0], y + 10 + (h - 20) * (1 - c[1]) - 5, w / 2 - 12, 10, 4, C.accent, C.marine, 2); });
    return g;
  }
  /* o = { diff: vis et échelle de différentiel présentes, manuel: bouton de réarmement présent } */
  function corpsMono(g, s, cote, accent, o) {
    var gr = P.degrade(s, "#e1e6ec", C.boitierFonce), grL = P.degrade(s, C.laiton, C.laitonFonce), grLh = P.degrade(s, C.laiton, C.laitonFonce, true);
    var grV = P.degrade(s, "#5cc08a", C.vert), vis = o.diff ? [285, 355] : [320];
    raccordFace(g, 275, 458, grL, grLh, 1); entreeCable(g, 445, 458, 1);
    vis.forEach(function (x) { rect(g, x - 12, 106, 24, 28, 2, C.acier, C.marine, 3); });
    rect(g, 210, 130, 300, 330, 26, gr, C.marine, 3);
    rect(g, 226, 146, 268, 298, 18, "#eef1f5", C.marine, 2);
    rect(g, 236, 170, 14, 250, 6, cote === "hp" ? C.hp : C.bp, C.marine, 2);
    if (o.diff) fenetreDeux(g, 295, 190, 130, 214, cote === "hp" ? 0.62 : 0.4, 0.3);
    else fenetreGraduee(g, 305, 190, 110, 214, cote === "hp" ? 0.62 : 0.4);
    vis.forEach(function (x) { teteVis(g, x, 102, 28, 12, grL); });
    var tab = groupe(g);
    if (o.manuel) {
      rect(g, 422, 124, 70, 12, 5, "#5b6672", C.marine, 2.5);
      rect(tab, 430, 104, 54, 26, 9, accent ? C.accent : grV, C.marine, 3);
      ligne(tab, 441, 117, 473, 117, C.marine, 2);
    }
    return { tab: tab };
  }

  function fabFace(o) {
    var modele = o.modele === "bp" || o.modele === "hp" ? o.modele : "combine", rep = !!o.reperes, acc = o.accent === "bouton";
    var s = P.racine(720, 560, o.label || "Pressostat " + (modele === "combine" ? "combiné" : modele.toUpperCase()) + " vu de face");
    styleCommun(s);
    P.filigrane(s, [[360, 290]], 440);
    var diff = o.differentiel ? o.differentiel === "reglable" : modele === "bp";
    var manuel = (o.rearmement ? o.rearmement === "manuel" : modele === "hp") || acc;
    var g = groupe(s), res = modele === "combine" ? corpsCombine(g, s, false, acc) : corpsMono(g, s, modele, acc, { diff: diff, manuel: manuel }), reperes = [];
    var pTab = mobile(res.tab, modele === "combine" && acc ? 530 : 360, 150, D_LENT), pDoigt = null;
    if (acc) {
      var bx = modele === "combine" ? 530 : 457, by = modele === "combine" ? 144 : 104;
      var gd = groupe(s);
      doigt(gd, bx + 6, by - 8, modele === "combine" ? -1 : 1);
      pDoigt = mobile(gd, bx, by, D_LENT);
      if (modele === "combine") rect(s, 414, 118, 266, 432, 24, "none", C.accent, 5);
      else rect(s, 196, 118, 328, 396, 30, "none", C.accent, 5);
    }
    function pose(n, nom, x, y) { if (rep) { pastilleG(s, x, y, n, 1.7); reperes.push({ n: n, nom: nom }); } }
    if (modele === "combine") {
      pose(1, "Vis de plage BP", 135, 100); pose(2, "Vis de différentiel BP", 215, 100); pose(3, "Vis de plage HP", 585, 100);
      pose(4, "Plaque graduée", 264, 214); if (acc) pose(5, "Bouton de réarmement", 450, 160); else pose(5, "Bouton de réarmement", 300, 100);
      pose(6, "Raccord BP", 130, 450); pose(7, "Raccord HP", 592, 450); pose(8, "Entrée du câble", 305, 450);
    } else {
      var liste = [["Vis de plage", diff ? 285 : 320, 60, 1], ["Vis de différentiel", 355, 60, diff], ["Plaque graduée", 450, 215, 1],
        ["Bouton de réarmement", 457, 60, manuel], ["Raccord", 212, 495, 1], ["Entrée du câble", 500, 495, 1]], n = 0;
      liste.forEach(function (it) { if (it[3]) pose(++n, it[0], it[1], it[2]); });
    }
    function regler(e) {
      var a = e && e.appui ? 8 : 0;
      pTab(0, a, 0);
      if (pDoigt) pDoigt(0, a, 0);
    }
    regler({ appui: false });
    return { noeud: s, regler: regler, reperes: reperes };
  }

  /* ======================================================================
     PICTOGRAMMES (versions, famille)
     ====================================================================== */
  function pictoAuto(p, cx, cy, sz) {   /* flèche qui tourne en rond : le contact revient seul */
    var r = sz * 0.36, g = groupe(p), a1 = -50 * Math.PI / 180, a2 = 230 * Math.PI / 180;
    var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    chemin(g, "M" + x1 + " " + y1 + " A" + r + " " + r + " 0 1 1 " + x2 + " " + y2, C.vert, 5);
    var tx = -Math.sin(a2), ty = Math.cos(a2), nx = -ty, ny = tx, L = sz * 0.2;
    poly(g, (x2 + tx * L) + "," + (y2 + ty * L) + " " + (x2 + nx * L * 0.8) + "," + (y2 + ny * L * 0.8) + " " + (x2 - nx * L * 0.8) + "," + (y2 - ny * L * 0.8), C.vert, C.vert, 2);
    return g;
  }
  function pictoBouton(p, cx, cy, sz) {   /* bouton et doigt : il faut appuyer */
    var g = groupe(p);
    rect(g, cx - sz * 0.3, cy + sz * 0.12, sz * 0.6, sz * 0.24, 5, C.vert, C.marine, 3);
    var d = "M" + (cx - sz * 0.04) + " " + (cy - sz * 0.02) + " L" + (cx + sz * 0.16) + " " + (cy - sz * 0.42);
    chemin(g, d, C.marine, sz * 0.26); chemin(g, d, C.papier, sz * 0.19);
    return g;
  }
  function pictoTournevis(p, cx, cy, sz) {
    var g = groupe(p), d = "M" + (cx - sz * 0.2) + " " + (cy + sz * 0.45) + " L" + (cx + sz * 0.2) + " " + (cy - sz * 0.45);
    chemin(g, d, C.marine, sz * 0.2); chemin(g, d, C.accent, sz * 0.13);
    var e = "M" + (cx - sz * 0.2) + " " + (cy + sz * 0.45) + " L" + (cx - sz * 0.02) + " " + (cy + sz * 0.1);
    chemin(g, e, C.marine, 5); chemin(g, e, C.acierClair, 2.5);
    return g;
  }
  function pictoSoufflet(p, cx, cy, sz, grad) {
    var g = groupe(p);
    g.appendChild(soufflet(p, cx, cy - sz * 0.22, cy + sz * 0.22, sz * 0.22, grad));
    rect(g, cx - sz * 0.26, cy - sz * 0.3, sz * 0.52, sz * 0.08, 2, C.acier, C.marine, 2.5);
    rect(g, cx - sz * 0.26, cy + sz * 0.22, sz * 0.52, sz * 0.08, 2, C.acier, C.marine, 2.5);
    rect(g, cx - 4, cy + sz * 0.3, 8, sz * 0.14, 0, C.cuivre, C.marine, 2);
    return g;
  }
  function pictoRessort(p, cx, cy, sz) {
    var g = groupe(p), n = 5, h = sz * 0.6, st = h / n, w = sz * 0.22, y = cy - h / 2, d = "M" + cx + " " + (y - sz * 0.1) + " V" + y + " L" + (cx - w) + " " + y, i;
    for (i = 0; i < n; i++) d += " Q" + cx + " " + (y + st * (i + 0.9)) + " " + (cx + w) + " " + (y + st * (i + 0.5)) + " L" + (cx - w) + " " + (y + st * (i + 1));
    d += " L" + cx + " " + (y + h) + " V" + (y + h + sz * 0.1);
    chemin(g, d, C.marine, 8); chemin(g, d, C.acier, 4);
    return g;
  }
  function pictoContact(p, cx, cy, sz) {
    var g = groupe(p), a = sz * 0.3;
    var d = "M" + (cx - a) + " " + (cy + a * 0.5) + " L" + (cx + a * 0.9) + " " + (cy - a * 0.2);
    cercle(g, cx + a, cy + a * 0.5, 7, C.cuivre, C.marine, 3);
    chemin(g, d, C.marine, 11); chemin(g, d, C.cuivre, 6);
    cercle(g, cx - a, cy + a * 0.5, 8, C.acier, C.marine, 3);
    cercle(g, cx + a, cy - a * 0.9, 7, C.cuivre, C.marine, 3);
    return g;
  }

  /* ======================================================================
     VERSIONS  (viewBox 900 x 340)
     ====================================================================== */
  function fabVersions(o) {
    if (o.etroit) return versionsEtroit(o);
    var s = P.racine(900, 340, o.label || "Quatre versions du pressostat combiné : réarmement automatique ou manuel");
    styleCommun(s);
    P.filigrane(s, [[450, 170]], 560);
    var K = 0.33, i, cx;
    var noms = [["BP auto", "HP auto"], ["BP auto", "HP manuel"], ["BP manuel", "HP manuel"], ["Convertible"]];
    var modes = [["a", "a"], ["a", "m"], ["m", "m"], null];
    var cadres = [];
    for (i = 0; i < 4; i++) {
      cx = 112.5 + 225 * i;
      var g = groupe(s, { transform: "translate(" + (cx - 99) + " 30) scale(" + K + ") translate(-60 -120)" });
      corpsCombine(g, s, true, false);
      var m = modes[i];
      if (m) {
        [[cx - 59, m[0]], [cx + 59, m[1]]].forEach(function (c) { (c[1] === "a" ? pictoAuto : pictoBouton)(s, c[0], 168, 54); });
      } else {
        [cx - 81, cx + 37].forEach(function (x) { pictoAuto(s, x, 168, 40); pictoBouton(s, x + 44, 168, 40); });
        pictoTournevis(s, cx, 168, 40);
      }
      if (noms[i].length === 1) E(s, cx, 262, noms[i][0]); else E2(s, cx, 262, noms[i]);
      cadres.push(rect(s, cx - 108, 12, 216, 316, 16, "none", C.accent, 5));
    }
    function regler(e) {
      var k = e && typeof e.surligner === "number" ? e.surligner : o.surligner;
      cadres.forEach(function (c, j) { c.setAttribute("display", j === k ? "inline" : "none"); });
    }
    regler({});
    return { noeud: s, regler: regler, reperes: [] };
  }

  /* ======================================================================
     PLAQUE  (viewBox 720 x 560)
     ====================================================================== */
  function fleche(p, cx, cy, r, col) {   /* flèche de rotation au-dessus d'une vis */
    var g = groupe(p), a1 = 205 * Math.PI / 180, a2 = 335 * Math.PI / 180;
    var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    chemin(g, "M" + x1 + " " + y1 + " A" + r + " " + r + " 0 0 1 " + x2 + " " + y2, col, 5);
    var tx = -Math.sin(a2), ty = Math.cos(a2), nx = -ty, ny = tx, L = 16;
    poly(g, (x2 + tx * L) + "," + (y2 + ty * L) + " " + (x2 + nx * L * 0.75) + "," + (y2 + ny * L * 0.75) + " " + (x2 - nx * L * 0.75) + "," + (y2 - ny * L * 0.75), col, col, 2);
    return g;
  }
  function vue(p, cx, cy, grad) {    /* vis vue de dessus, tête fendue */
    var g = groupe(p);
    cercle(g, cx, cy, 30, grad, C.marine, 3);
    ligne(g, cx - 19, cy + 19, cx + 19, cy - 19, C.marine, 5);
    return g;
  }
  function virgule(v) { return String(Math.round(v * 100) / 100).replace(".", ","); }
  /* Échelle verticale : valeur mini en bas (y1), maxi en haut (y0). Chiffres à gauche de l'axe, traits à droite. */
  function echelle(p, ax, y0, y1, vmin, vmax, pasMaj, pasMin) {
    var g = groupe(p), v, yOf = function (x) { return y1 - (x - vmin) / (vmax - vmin) * (y1 - y0); };
    ligne(g, ax, y0, ax, y1, C.marine, 3);
    for (v = Math.ceil(vmin / pasMin - 1e-9) * pasMin; v <= vmax + 1e-9; v += pasMin) {
      var maj = Math.abs(v / pasMaj - Math.round(v / pasMaj)) < 1e-6, y = yOf(v);
      ligne(g, ax, y, ax + (maj ? 24 : 13), y, C.marine, maj ? 3 : 2);
      if (maj) P.texte(g, ax - 14, y + 10, virgule(v), { "text-anchor": "end", "font-size": 28, "font-weight": 600 });
    }
    return yOf;
  }
  function index(p, ax) {
    var g = groupe(p);
    poly(g, (ax + 6) + ",0 " + (ax + 30) + ",-13 " + (ax + 70) + ",-13 " + (ax + 70) + ",13 " + (ax + 30) + ",13", C.accent, C.marine, 2.5);
    return g;
  }

  function fabPlaque(o) {
    var hp = o.cote === "hp", plage = o.plage || (hp ? [8, 32] : [-0.2, 7.5]), diff = o.diffPlage || [0.7, 4];
    var s = P.racine(720, 560, o.label || "Plaque graduée du pressostat " + (hp ? "HP" : "BP") + ", vue de près");
    styleCommun(s);
    P.filigrane(s, [[360, 380]], 440);
    var grL = P.degrade(s, C.laiton, C.laitonFonce);
    var y0 = 280, y1 = 520;
    var yP, yD, iP, iD, mP, mD, vP, vD;
    function gravure(x, txt) { P.texte(s, x, 240, txt, { "text-anchor": "middle", "font-size": 30, "font-weight": 700, "letter-spacing": 2 }); }
    if (hp) {
      rect(s, 210, 190, 300, 355, 14, C.papier, C.marine, 4).setAttribute("data-support", "1");
      gravure(380, "CUT OUT");
      yP = echelle(s, 330, y0, y1, plage[0], plage[1], 4, 2);
      iP = groupe(s); index(iP, 330); mP = mobile(iP, 0, 0, D_LENT);
      vue(s, 330, 135, grL); fleche(s, 330, 135, 46, C.marine);
      E(s, 330, 43, "Coupure", { taille: 30 });
      vP = 14;
    } else {
      rect(s, 120, 190, 480, 355, 14, C.papier, C.marine, 4).setAttribute("data-support", "1");
      gravure(262, "CUT IN"); gravure(512, "DIFF");
      yP = echelle(s, 230, y0, y1, plage[0], plage[1], 1, 0.5);
      yD = echelle(s, 480, y0, y1, diff[0], diff[1], 1, 0.5);
      iP = groupe(s); index(iP, 230); mP = mobile(iP, 0, 0, D_LENT);
      iD = groupe(s); index(iD, 480); mD = mobile(iD, 0, 0, D_LENT);
      vue(s, 230, 135, grL); fleche(s, 230, 135, 46, C.marine);
      vue(s, 480, 135, grL); fleche(s, 480, 135, 46, C.marine);
      E(s, 230, 43, "Enclenchement", { taille: 30 }); E(s, 480, 43, "Différentiel", { taille: 30 });
      vP = 1.4; vD = 1.2;
    }
    function bornee(v, mini, maxi) { return Math.max(mini, Math.min(maxi, v)); }
    function regler(e) {
      e = e || {};
      if (hp) {
        if (typeof e.coupure === "number") vP = e.coupure;
        mP(0, yP(bornee(vP, plage[0], plage[1])), 0);
      } else {
        if (typeof e.enclenchement === "number") vP = e.enclenchement;
        if (typeof e.differentiel === "number") vD = e.differentiel;
        mP(0, yP(bornee(vP, plage[0], plage[1])), 0);
        mD(0, yD(bornee(vD, diff[0], diff[1])), 0);
      }
    }
    regler({});
    return { noeud: s, regler: regler, reperes: [] };
  }

  /* ======================================================================
     FAMILLE  (viewBox 900 x 320)
     ====================================================================== */
  function fabFamille(o) {
    var s = P.racine(900, 320, o.label || "Trois formes de pressostats, qui ont le même principe : un soufflet, un ressort, un contact");
    styleCommun(s);
    P.filigrane(s, [[450, 160]], 560);
    var grL = P.degrade(s, C.laiton, C.laitonFonce), gr = P.degrade(s, C.boitier, C.boitierFonce), i;
    /* 1 : boîtier large à deux fenêtres */
    var g1 = groupe(s, { transform: "translate(60 22) scale(0.3) translate(-60 -120)" });
    corpsCombine(g1, s, true, false);
    /* 2 : boîtier haut à une fenêtre */
    var g2 = groupe(s, { transform: "translate(" + (450 - 51) + " 18) scale(0.3) translate(-210 -100)" });
    corpsMono(g2, s, "bp", false, { diff: true, manuel: true });
    /* 3 : boîtier compact à molette */
    var cx = 750;
    rect(s, cx - 62, 54, 124, 124, 20, gr, C.marine, 3);
    rect(s, cx - 48, 68, 96, 96, 12, "#eef1f5", C.marine, 2);
    cercle(s, cx, 116, 36, grL, C.marine, 3);
    for (i = 0; i < 12; i++) { var a = i * Math.PI / 6; ligne(s, cx + 36 * Math.cos(a), 116 + 36 * Math.sin(a), cx + 41 * Math.cos(a), 116 + 41 * Math.sin(a), C.marine, 3); }
    ligne(s, cx, 116, cx + 22, 100, C.marine, 5);
    rect(s, cx - 7, 178, 14, 22, 2, grL, C.marine, 3);
    rect(s, cx - 12, 196, 24, 14, 3, grL, C.marine, 3);
    [150, 450, 750].forEach(function (x) {
      pictoSoufflet(s, x - 75, 262, 64, grL); pictoRessort(s, x, 262, 64); pictoContact(s, x + 75, 262, 64);
    });
    return { noeud: s, regler: function () {}, reperes: [] };
  }

  /* ======================================================================
     MISE EN PAGE ÉTROITE (option etroit: true, dessin affiché à moins de 480 px)
     viewBox de 500 de large, texte de 22 unités, lettres de borne de 30 en gras.
     ====================================================================== */
  var TE = 22, TL = 30;
  function e22(p, cx, cy, txt) { return E(p, cx, cy, txt, { taille: TE }); }
  function e22b(p, cx, cy, lignes, largeur) { return E2(p, cx, cy, lignes, { taille: TE, largeur: largeur }); }

  function lameV(p, px, py, long) {
    var g = groupe(p), d = "M" + px + " " + py + " V" + (py + long);
    chemin(g, d, C.marine, 13);
    var ame = chemin(g, d, C.repos, 7);
    return { g: g, maj: function (on) { ame.setAttribute("stroke", on ? C.accent : C.repos); } };
  }
  function souffletH(p, y, xh, xb, demi, grad) {
    var g = groupe(p), n = 6, h = (xb - xh) / n, i, a = "", b = "";
    for (i = 0; i <= n; i++) a += (i ? " L" : "M") + (xh + i * h) + " " + (y - demi + (i % 2 ? 8 : 0));
    for (i = n; i >= 0; i--) b += " L" + (xh + i * h) + " " + (y + demi - (i % 2 ? 8 : 0));
    chemin(g, a + b + " Z", C.marine, 3, { fill: grad, "vector-effect": "non-scaling-stroke" });
    return g;
  }
  /* Soufflet horizontal à droite de la lame : tige depuis la lame (x=250), plateau en 300, plis de 310 à 380, raccord à droite. */
  function blocSoufflet(s, y, grad) {
    rect(s, 390, y - 6, 50, 12, 0, C.cuivre, C.marine, 3);
    rect(s, 380, y - 28, 10, 56, 3, C.acier, C.marine, 3);
    var gPle = groupe(s), gTop = groupe(s);
    gPle.appendChild(souffletH(s, y, 310, 380, 28, grad));
    ligne(gTop, 250, y, 300, y, C.acier, 6);
    rect(gTop, 300, y - 28, 10, 56, 3, C.acier, C.marine, 3);
    return { top: mobile(gTop, 300, y, D_LENT), ple: mobile(gPle, 380, y, D_LENT) };
  }

  function bornesEtroit(o, modele) {
    var combine = modele === "combine";
    var s = P.racine(500, combine ? 760 : 640, o.label || "Schéma des bornes du pressostat " + modele + ", en hauteur");
    styleCommun(s);
    P.filigrane(s, [[250, combine ? 380 : 320]], 340);
    return combine ? bornesCombineEtroit(s) : bornesSimpleEtroit(s, modele);
  }

  function bornesCombineEtroit(s) {
    var grad = P.degrade(s, C.laiton, C.laitonFonce), F = {}, k;
    F.arr = fil(s, "M250 14 V62");
    F.feed = fil(s, "M237 75 H30 V300 H100");
    F.aP1 = fil(s, "M250 88 V150");
    F.pont = fil(s, "M250 250 V300");
    F.jc = fil(s, "M250 400 V427");
    F.cbob = fil(s, "M250 453 V470");
    F.bobN = fil(s, "M250 520 V620");
    F.dplot = fil(s, "M62 393 V417");
    F.dlamp = fil(s, "M62 443 V540");
    F.dN = fil(s, "M62 580 V620");
    F.bW = fil(s, "M307 232 H460 V287");
    F.bL = fil(s, "M460 313 V500");
    F.bN = fil(s, "M460 540 V620");
    F.busL = fil(s, "M250 620 H62");
    F.busR = fil(s, "M250 620 H460");
    F.exit = fil(s, "M250 620 V665");
    cercle(s, 250, 14, 6, C.marine); cercle(s, 250, 665, 6, C.papier, C.marine, 3);
    var bob = rect(s, 225, 470, 50, 50, 6, C.papier, C.marine, 3);
    var vBP = voyant(s, 460, 520, 0.83), vHP = voyant(s, 62, 560, 0.83);
    plot(s, 250, 250); plot(s, 250, 400); plot(s, 307, 232); plot(s, 62, 393);
    borne(s, 250, 75, grad); borne(s, 250, 440, grad); borne(s, 460, 300, grad); borne(s, 62, 430, grad);
    cercle(s, 250, 150, 8, C.acier, C.marine, 3); cercle(s, 250, 300, 8, C.acier, C.marine, 3); cercle(s, 100, 300, 8, C.acier, C.marine, 3);
    var bBP = blocSoufflet(s, 190, grad), bHP = blocSoufflet(s, 350, grad);
    flecheV(s, 410, 75, 130, C.bp);
    flecheV(s, 415, 435, 385, C.hp);
    var lBP = lameV(s, 250, 150, 100), lHP = lameV(s, 250, 300, 100), lS = lameV(s, 100, 300, 100);
    var gLien = groupe(s);
    chemin(gLien, "M250 360 H100", C.marine, 3, { "stroke-dasharray": "7 7" });
    cercle(gLien, 250, 360, 5, C.marine); cercle(gLien, 100, 360, 5, C.marine);
    var pBP = mobile(lBP.g, 250, 150, D_VIF), pHP = mobile(lHP.g, 250, 300, D_VIF), pS = mobile(lS.g, 100, 300, D_VIF), pLien = mobile(gLien, 250, 360, D_VIF);
    var kBP = clac(s, 307, 232, -20), kHP = clac(s, 212, 393, 200), kD = clac(s, 62, 393, 200);
    /* étiquettes */
    e22(s, 170, 32, "Arrivée");
    e22b(s, 150, 200, ["Contact", "BP"]);
    e22b(s, 335, 420, ["Contact", "HP"]);
    e22b(s, 372, 520, ["Voyant", "défaut BP"]);
    e22b(s, 160, 578, ["Voyant", "défaut HP"]);
    e22b(s, 150, 503, ["Bobine du", "contacteur"]);
    e22(s, 330, 655, "Neutre");
    lettre(s, 292, 80, "A", TL); lettre(s, 424, 300, "B", TL); lettre(s, 212, 445, "C", TL); lettre(s, 27, 435, "D", TL);
    borne(s, 60, 690, grad); terre(s, 60, 690); e22(s, 150, 712, "Terre");
    var ETATS = {
      "marche": { bp: 0, hp: 0, vivants: ["arr", "aP1", "pont", "jc", "cbob", "bobN", "exit"], lBP: 1, lHP: 1, lS: 0, bob: 1, vBP: 0, vHP: 0 },
      "defaut-bp": { bp: -35, hp: 0, vivants: ["arr", "aP1", "bW", "bL", "bN", "busR", "exit"], lBP: 1, lHP: 0, lS: 0, bob: 0, vBP: 1, vHP: 0 },
      "defaut-hp": { bp: 0, hp: 22, vivants: ["arr", "feed", "dplot", "dlamp", "dN", "busL", "exit"], lBP: 0, lHP: 0, lS: 1, bob: 0, vBP: 0, vHP: 1 }
    };
    var courant = null;
    function regler(e) {
      var nom = e && e.etat, E_ = ETATS[nom];
      if (!E_) { nom = courant || "marche"; E_ = ETATS[nom]; }
      for (k in F) F[k].maj(E_.vivants.indexOf(k) >= 0);
      lBP.maj(E_.lBP); lHP.maj(E_.lHP); lS.maj(E_.lS);
      pBP(0, 0, E_.bp); pHP(0, 0, E_.hp); pS(0, 0, E_.hp); pLien(E_.hp ? -22.5 : 0, E_.hp ? -4.4 : 0, 0);
      bBP.top(E_.bp ? 28 : 0, 0, 0); bBP.ple(0, 0, 0, 1, E_.bp ? 0.6 : 1);
      bHP.top(E_.hp ? -20.2 : 0, 0, 0); bHP.ple(0, 0, 0, 1, E_.hp ? 1.29 : 1);
      bob.setAttribute("fill", E_.bob ? C.vert : C.papier);
      vBP.maj(E_.vBP); vHP.maj(E_.vHP);
      if (courant && courant !== nom) {
        if (nom === "defaut-bp" || courant === "defaut-bp") kBP();
        if (nom === "defaut-hp" || courant === "defaut-hp") { kHP(); kD(); }
      }
      courant = nom;
    }
    regler({ etat: "marche" });
    return { noeud: s, regler: regler, reperes: [] };
  }

  /* bp : 1-4 vers le compresseur, 1-2 vers le voyant (lame vers la droite). hp : 1-2 vers le compresseur, 1-4 vers le voyant (lame vers la gauche). */
  function bornesSimpleEtroit(s, modele) {
    var hp = modele === "hp", grad = P.degrade(s, C.laiton, C.laitonFonce), F = {};
    var ox = hp ? 165 : 335, fermee = hp ? "2" : "4", ouverte = hp ? "4" : "2", ang = hp ? 30 : -30, dx = hp ? -34.6 : 34.6;
    F.arr = fil(s, "M250 14 V77");
    F.charge = fil(s, "M250 273 V322");
    F.chargeN = fil(s, "M250 398 V560");
    F.sW = fil(s, "M" + ox + " 250 V410");
    F.sL = fil(s, "M" + ox + " 450 V560");
    F.bus = fil(s, "M" + ox + " 560 H250");
    F.exit = fil(s, "M250 560 V600");
    cercle(s, 250, 600, 6, C.papier, C.marine, 3);
    symCompresseur(el("g", { transform: "translate(250 360)" }, s), 2.4, C.papier, 90);
    var vo = voyant(s, ox, 430, 0.83);
    var gl = lameV(s, 250, 90, 170);
    var bl = blocSoufflet(s, 150, grad);
    cercle(s, 250, 90, 8, C.acier, C.marine, 3);
    borne(s, 250, 90, grad); borne(s, 250, 260, grad); borne(s, ox, 237, grad);
    if (hp) flecheV(s, 415, 240, 190, C.hp); else flecheV(s, 410, 75, 130, C.bp);
    var pL = mobile(gl.g, 250, 90, D_VIF), kk = clac(s, ox, 237, hp ? 200 : -20);
    e22(s, 150, 30, "Arrivée");
    e22(s, hp ? 380 : 120, 360, "Compresseur");
    if (hp) e22b(s, 345, 225, ["Contact", "HP"]); else e22b(s, 150, 170, ["Contact", "BP"]);
    e22b(s, hp ? 68 : 432, 430, ["Voyant de", "défaut"]);
    e22(s, hp ? 320 : 180, 585, "Neutre");
    lettre(s, 292, 92, "1", TL); lettre(s, 210, 262, fermee, TL); lettre(s, hp ? 122 : 378, 240, ouverte, TL);
    function regler(e) {
      var d = e && e.etat === "defaut" ? 1 : 0;
      F.arr.maj(1); F.charge.maj(!d); F.chargeN.maj(!d); F.sW.maj(d); F.sL.maj(d); F.bus.maj(d); F.exit.maj(1);
      gl.maj(1);
      pL(0, 0, d ? ang : 0);
      bl.top(d ? dx : 0, 0, 0); bl.ple(0, 0, 0, 1, d ? (70 - Math.abs(dx) * (hp ? -1 : 1)) / 70 : 1);
      vo.maj(d);
      if (regler.avant !== undefined && regler.avant !== d) kk();
      regler.avant = d;
    }
    regler({ etat: "marche" });
    return { noeud: s, regler: regler, reperes: [] };
  }

  /* circuit en hauteur : boucle de 260 de large sur 390 de haut */
  function circuitEtroit(o, prises, man, essai) {
    var s = P.racine(500, 740, o.label || "Circuit frigorifique fermé avec la prise de pression du pressostat, en hauteur");
    styleCommun(s);
    P.filigrane(s, [[250, 380]], 340);
    var grad = P.degrade(s, C.laiton, C.laitonFonce), hpP = prises !== "bp", bpP = prises !== "hp", K = 2.4;
    var cond = symEchangeur(el("g", { transform: "translate(300 122)" }, s), K, C.hpPale, false);
    var evap = symEchangeur(el("g", { transform: "translate(300 608)" }, s), K, C.bpPale, true);
    cond.pales.style.transformOrigin = "-5px 2px"; evap.pales.style.transformOrigin = "-5px 2px";
    function tube(d, col) {
      var g = groupe(s);
      chemin(g, d, C.marine, 15); chemin(g, d, col, 9);
      return chemin(g, d, C.blanc, 3, { "stroke-dasharray": "10 22", opacity: 0.85 });
    }
    var tirR = tube("M170 327 V170 H430 V354", C.hp), tirB = tube("M430 406 V560 H170 V403", C.bp);
    function sens(x, y, ang) { poly(el("g", { transform: "translate(" + x + " " + y + ") rotate(" + ang + ")" }, s), "-11,-10 11,0 -11,10", C.papier, C.marine, 3); }
    sens(300, 170, 0); sens(300, 560, 180); sens(430, 480, 90);
    function capillaire(d) { chemin(s, d, C.marine, 9); chemin(s, d, C.cuivre, 4.5); }
    var deux = hpP && bpP, bx = deux ? 12 : 32, bw = deux ? 100 : 70, re = bx + bw;
    if (hpP) capillaire("M170 290 H152 V340 H" + (re + 2));
    if (bpP) capillaire("M170 445 H140 V395 H" + (re + 2));
    boitierMini(s, grad, bx, 320, bw, 100, deux ? [0.35, 0.65] : [hpP ? 0.7 : 0.35]);
    if (hpP) rect(s, re - 2, 334, 14, 12, 2, grad, C.marine, 2.5);
    if (bpP) rect(s, re - 2, 389, 14, 12, 2, grad, C.marine, 2.5);
    [hpP ? 290 : null, bpP ? 445 : null].forEach(function (yy) { if (yy) rect(s, 158, yy - 8, 24, 16, 3, grad, C.marine, 2.5); });
    if (man) {
      if (hpP) { chemin(s, "M177 290 H203", C.marine, 9); chemin(s, "M177 290 H203", C.laiton, 5); manometre(s, 228, 290, C.hp, 55, 0.8); }
      if (bpP) { chemin(s, "M177 445 H203", C.marine, 9); chemin(s, "M177 445 H203", C.laiton, 5); manometre(s, 228, 445, C.bp, -50, 0.8); }
    }
    symCompresseur(el("g", { transform: "translate(170 365)" }, s), K, C.papier, -90);
    var oVanne = essai && prises !== "hp", oFan = essai && prises !== "bp";
    symVanne(el("g", { transform: "translate(430 262)" }, s), K, oVanne ? C.accent : grad, 90);
    symDetendeur(el("g", { transform: "translate(430 380)" }, s), K, C.papier, 90);
    if (oFan) { cond.fan.setAttribute("fill", C.accent); cond.pales.querySelectorAll("path").forEach(function (q) { q.setAttribute("fill", C.accent); }); }
    e22(s, 76, 270, "Pressostat");
    e22(s, 190, 40, "Condenseur");
    e22b(s, 330, 245, ["Refoulement", "(HP)"]);
    e22(s, 290, 365, "Compresseur");
    e22(s, 347, 420, "Détendeur");
    e22b(s, 320, 503, ["Aspiration", "(BP)"]);
    e22(s, 300, 690, "Évaporateur");
    var reperes = [], n = 0;
    if (oVanne) { pastilleG(s, 472, 262, ++n, 1.4); reperes.push({ n: n, nom: "Vanne de départ liquide" }); }
    if (oFan) { pastilleG(s, 372, 105, ++n, 1.4); reperes.push({ n: n, nom: "Ventilateur du condenseur" }); }
    function regler(e) {
      var m = !(e && e.marche === false);
      [tirR, tirB].forEach(function (t) { if (m) t.setAttribute("class", "pd-av"); else t.removeAttribute("class"); });
      [cond.pales, evap.pales].forEach(function (t) { if (m) t.setAttribute("class", "pd-tourne"); else t.removeAttribute("class"); });
    }
    regler({ marche: true });
    return { noeud: s, regler: regler, reperes: reperes };
  }

  function versionsEtroit(o) {
    var s = P.racine(500, 580, o.label || "Quatre versions du pressostat combiné : réarmement automatique ou manuel");
    styleCommun(s);
    P.filigrane(s, [[250, 290]], 340);
    var K = 0.36, i, cx, top, cadres = [];
    var noms = [["BP auto", "HP auto"], ["BP auto", "HP manuel"], ["BP manuel", "HP manuel"], ["Convertible"]];
    var modes = [["a", "a"], ["a", "m"], ["m", "m"], null];
    for (i = 0; i < 4; i++) {
      cx = 125 + 250 * (i % 2); top = i < 2 ? 14 : 300;
      corpsCombine(groupe(s, { transform: "translate(" + (cx - 108) + " " + (top + 14) + ") scale(" + K + ") translate(-60 -120)" }), s, true, false);
      var m = modes[i], py = top + 146;
      if (m) {
        [[cx - 65, m[0]], [cx + 65, m[1]]].forEach(function (c) { (c[1] === "a" ? pictoAuto : pictoBouton)(s, c[0], py, 54); });
      } else {
        [cx - 88, cx + 44].forEach(function (x) { pictoAuto(s, x, py, 36); pictoBouton(s, x + 44, py, 36); });
        pictoTournevis(s, cx, py, 36);
      }
      if (noms[i].length === 1) e22(s, cx, top + 222, noms[i][0]); else e22b(s, cx, top + 222, noms[i]);
      cadres.push(rect(s, cx - 120, top, 240, 262, 14, "none", C.accent, 5));
    }
    function regler(e) {
      var k = e && typeof e.surligner === "number" ? e.surligner : o.surligner;
      cadres.forEach(function (c, j) { c.setAttribute("display", j === k ? "inline" : "none"); });
    }
    regler({});
    return { noeud: s, regler: regler, reperes: [] };
  }

  P.enregistrer("circuit", fabCircuit);
  P.enregistrer("face", fabFace);
  P.enregistrer("versions", fabVersions);
  P.enregistrer("plaque", fabPlaque);
  P.enregistrer("famille", fabFamille);
  P.enregistrer("bornes", fabBornes);
})();

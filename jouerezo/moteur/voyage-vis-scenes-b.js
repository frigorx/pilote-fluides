/* =====================================================================
   voyage-vis-scenes-b.js — édition « compresseur à vis », lot B : l'huile
   injectée, le refoulement (et le Vi), le tiroir, le séparateur d'huile
   ---------------------------------------------------------------------
   RÔLE : les scènes `huile`, `refoulement`, `tiroir` et `separateur` du récit
   donnees/voyage-vis.js. Même contrat que moteur/voyage-scenes-a.js :
   VOYAGE_SCENES[id] = function (g, c) → maj(t) ; tout est fonction PURE de t
   (aucun état gardé, aucun SMIL, hasard par D.alea). Brief :
   voyage-vis/BRIEF-SCENES.md. Chargé après -a.js : ses quatre définitions
   remplacent le bouche-trou de A.
   ÉCRAN PARTAGÉ : tout tient dans x 20 → 965, y 150 → 760 (la colonne de droite
   porte la carte et le diagramme). Le compresseur est découpé par un clip à ces
   bornes : même en gros plan, rien ne déborde.
   COMPRESSEUR : aide locale `vueLongue`, MÊME DESSIN que le lot A (géométrie, couleurs,
   alvéole en chevron butée contre la paroi de bout : voir voyage-vis-scenes-a.js).
   Ce lot y AJOUTE : la buse d'injection d'huile (sur le couvercle), le perçage de
   refoulement (dans le couvercle, près de la paroi de bout, il se découvre en k0 de
   `refoulement`), un palier détaillé, et pour `tiroir` un logement sous la carcasse
   (pièce, vérin, tube de retour vers l'aspiration).
   Le Vi (`refoulement`) ne peut pas se lire sur le chevron à pas constant : il est
   montré par un schéma de l'alvéole en trois instants, où la fenêtre glisse.
   PIÈGE : tout est dessiné en coordonnées LOCALES de la machine (celles de A, avant son
   décalage oy = 60) ; la caméra (V.cam) pose et zoome ce groupe, les textes sont posés
   en coordonnées d'écran (V.pt).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const el = D.el, SANS = "Calibri, Arial, sans-serif";
  const VIF = "#ff6b35", VIOLET = "#8e44ad", VERT = "#1e7e54", ROUGE = "#c0392b", VAP = "#4f7fb8";
  let nid = 0;
  const ident = p => "vm-vb-" + p + "-" + (++nid);
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const doux = (t, t0, du) => D.lisse((t - t0) / (du || 0.5)); // 0 → 1 à partir de t0
  const pos = (e, x, y) => { e.setAttribute("cx", x.toFixed(1)); e.setAttribute("cy", y.toFixed(1)); };
  const lg = pts => pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const mixer = (a, b, w) => a.map((v, i) => i === 2 ? Math.exp(D.lerp(Math.log(v), Math.log(b[i]), w)) : D.lerp(v, b[i], w)); // pose de caméra [cx, cy, s, ax, ay]


  /* ---------- petits outils ---------- */
  /* flèche pleine de (x1,y1) vers (x2,y2) : maj(x1, y1, x2, y2, op) */
  function fleche(parent, coul, ep) {
    const e = el("path", { fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
    return function (x1, y1, x2, y2, o) {
      const a = Math.atan2(y2 - y1, x2 - x1), h = ep * 2.6, w = ep * 1.7, bx = x2 - Math.cos(a) * h, by = y2 - Math.sin(a) * h;
      e.setAttribute("d", "M " + x1.toFixed(1) + " " + y1.toFixed(1) + " L " + x2.toFixed(1) + " " + y2.toFixed(1) +
        " M " + (bx - Math.sin(a) * w).toFixed(1) + " " + (by + Math.cos(a) * w).toFixed(1) + " L " + x2.toFixed(1) + " " + y2.toFixed(1) +
        " L " + (bx + Math.sin(a) * w).toFixed(1) + " " + (by - Math.cos(a) * w).toFixed(1));
      e.setAttribute("opacity", D.borne(o, 0, 1).toFixed(2));
    };
  }
  /* chevrons qui défilent le long d'une ligne brisée : maj(t, vitesse px/s, opacité) */
  function flux(parent, pts, nb, coul, ep, taille) {
    const L = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = L.reduce((a, b) => a + b, 0), E = [];
    for (let i = 0; i < nb; i++) E.push(el("path", { d: "M " + (-taille) + " " + (-taille) + " L " + (taille * 0.6) + " 0 L " + (-taille) + " " + taille, fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent));
    return function (t, vit, o) {
      E.forEach((e, i) => {
        const f = D.frac(i / nb + t * vit / tot);
        let d = f * tot, k = 0;
        while (k < L.length - 1 && d > L[k]) { d -= L[k]; k++; }
        const a = pts[k], b = pts[k + 1], u = L[k] ? d / L[k] : 0;
        e.setAttribute("transform", "translate(" + D.lerp(a[0], b[0], u).toFixed(1) + " " + D.lerp(a[1], b[1], u).toFixed(1) + ") rotate(" + (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI).toFixed(1) + ")");
        e.setAttribute("opacity", (o * D.fenetre(f, 0, 1, 0.08)).toFixed(2));
      });
    };
  }
  /* point à la distance s le long d'une ligne brisée */
  function parcours(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const long = L[L.length - 1];
    return { long: long, at: s => {
      s = D.borne(s, 0, long);
      let i = 1;
      while (i < pts.length - 1 && L[i] < s) i++;
      const f = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [D.lerp(pts[i - 1][0], pts[i][0], f), D.lerp(pts[i - 1][1], pts[i][1], f)];
    } };
  }
  /* des gouttes qui tombent : maj(t, place(q, f) → [x, y, vis]) ; r en px locaux */
  function gouttes(parent, nb, graine, coul, rmin, rmax) {
    const r = D.alea(graine), B = [];
    for (let i = 0; i < nb; i++) B.push({ p: r(), per: 0.9 + r() * 0.9, ph: r() * 3, r: D.lerp(rmin || 1.8, rmax || 4, r()),
      e: el("circle", { fill: coul || D.HUILE, stroke: "#8a5a10", "stroke-width": 0.7 }, parent) });
    return function (t, place) {
      B.forEach(b => {
        const cyc = Math.floor((t + b.ph) / b.per), f = D.frac((t + b.ph) / b.per), q = D.frac(b.p + cyc * 0.618);
        const [x, y, vis] = place(q, f, b);
        pos(b.e, x, y); b.e.setAttribute("r", b.r.toFixed(1)); b.e.setAttribute("opacity", (vis * D.fenetre(f, 0, 1, 0.12)).toFixed(2));
      });
    };
  }
  /* de petites molécules de vapeur (D.mol réduite) : maj(x, y, temp, op) en coordonnées du parent */
  function petiteMol(parent, k) {
    const g = el("g", { transform: "scale(" + k + ")" }, parent), m = D.mol(g);
    return (x, y, temp, o) => m(x / k, y / k, temp, true, o);
  }
  /* flèche de chaleur réduite : maj(x, y, ang, op), ang = direction de la flèche (0 = vers +x) */
  function chaleur(parent, k) {
    const g = el("g", { transform: "scale(" + k + ")" }, parent), m = D.chaleur(g);
    return (x, y, ang, o) => m(x / k, y / k, ang - 90, o);
  }
  /* pastilles du bas : [texte, couleur, [k, f] début, [k, f] fin | "fin", y] */
  const pastilles = (g, c, x, ancre, liste) => liste.map(([s, coul, a, b, y]) => ({ g: D.pastille(g, x, y || 748, s, coul, 30, ancre), t0: c.A(a[0], a[1]), t1: b === "fin" ? c.D : c.A(b[0], b[1]) }));
  const montrer = (liste, t) => liste.forEach(p => op(p.g, D.fenetre(t, p.t0, p.t1, 0.35)));
  const croixRouge = (parent, x, y, r, ep) => { const g = el("g", {}, parent); [[-1, -1, 1, 1], [-1, 1, 1, -1]].forEach(([a, b, c, d]) => el("line", { x1: x + a * r, y1: y + b * r, x2: x + c * r, y2: y + d * r, stroke: ROUGE, "stroke-width": ep || 8, "stroke-linecap": "round" }, g)); return g; };

  /* ---------- la géométrie du compresseur : celle du lot A (même repère local) ---------- */
  const YM = 350, YF = 458, RB = 54, YI = 404;      // axe du mâle, axe de la femelle, demi-hauteur d'une bande, jonction des deux bandes
  const XR0 = 372, XR1 = 902, PAS = 96;             // les rotors, de l'aspiration (gauche) à la paroi de bout (droite) ; pas CONSTANT
  const DEL = 0.3, LOB = 0.15;                      // inclinaison des bandes, demi-largeur d'un lobe (en phase)
  const XU = u => XR0 + PAS * u;                    // abscisse du lobe de phase u
  const BP = "#eef4fa", HP = "#fbefe6", TRAIT = "#39424c", ACIER = "#4d5866";
  const XB = 640, XF = 864;                         // la buse d'injection ; le perçage de refoulement (son axe)
  const tempAt = x => D.lerp(0.2, 0.62, D.borne((x - 450) / 440, 0, 1)); // la vapeur de l'alvéole se réchauffe en avançant

  /* un polygone (fermé) ou une ligne brisée (ouverte) coupés à x ≤ X : ce qui dépasse est ramené sur la paroi de bout */
  function coupe(p, X, ferme) {
    const out = [], n = p.length, inter = (a, b) => [X, a[1] + (b[1] - a[1]) * (X - a[0]) / (b[0] - a[0])];
    for (let i = ferme ? 0 : 1; i < n; i++) {
      const c = p[i], q = p[(i + n - 1) % n], ci = c[0] <= X, qi = q[0] <= X;
      if (!ferme && i === 1 && qi) out.push(q);
      if (ci) { if (!qi) out.push(inter(q, c)); out.push(c); } else if (qi) out.push(inter(q, c));
    }
    return out;
  }

  /* un palier en coupe (roulement à billes) : x, y = centre de l'arbre, w = largeur du logement */
  function palier(parent, x, y, w) {
    const q = el("g", {}, parent), a = (w - 14) / 2, bague = [];
    el("rect", { x: x - w / 2, y: y - 48, width: w, height: 96, rx: 4, fill: "#dfe6ee", stroke: TRAIT, "stroke-width": 2.5 }, q);
    el("rect", { x: x - w / 2, y: y - 13, width: w, height: 26, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, q);
    [-1, 1].forEach(sg => {
      bague.push(el("rect", { x: x - a, y: sg < 0 ? y - 22 : y + 14, width: 2 * a, height: 8, fill: "#9aa7b5", stroke: "#4e5a66", "stroke-width": 1.8 }, q));
      bague.push(el("rect", { x: x - a, y: sg < 0 ? y - 40 : y + 32, width: 2 * a, height: 8, fill: "#9aa7b5", stroke: "#4e5a66", "stroke-width": 1.8 }, q));
      bague.push(el("circle", { cx: x, cy: y + sg * 27, r: 5, fill: "#dfe6ee", stroke: "#4e5a66", "stroke-width": 1.8 }, q));
    });
    q.bague = bague;
    return q;
  }
  /* étiquette sur plaque opaque : x, y = centre ; rend le groupe (.cadre = [x, y, l, h]) */
  function plaque(parent, x, y, lignes, o) {
    o = o || {};
    const taille = o.taille || 32, pas = taille * 1.2, g = el("g", {}, parent);
    const fond = el("rect", { rx: 12, fill: "#fffdf8", stroke: o.bord || D.BLEU, "stroke-width": 3 }, g);
    let l = 0;
    lignes.forEach((s, i) => {
      const t = D.texte(g, x, y + (i - (lignes.length - 1) / 2) * pas + taille * 0.34, s, { "text-anchor": "middle", "font-size": taille, "font-weight": 700, fill: o.coul || "#10233c", "font-family": SANS });
      l = Math.max(l, (t.getComputedTextLength && t.getComputedTextLength()) || s.length * taille * 0.5);
    });
    const w = l + 28, h = lignes.length * pas + 14;
    fond.setAttribute("x", (x - w / 2).toFixed(1)); fond.setAttribute("y", (y - h / 2).toFixed(1)); fond.setAttribute("width", w.toFixed(1)); fond.setAttribute("height", h.toFixed(1));
    return g;
  }

  /* =====================================================================
     le compresseur, en vue longue — MÊME DESSIN que le lot A
     ---------------------------------------------------------------------
     Carcasse en fonte hachurée, moteur (bobinages de cuivre) et tube d'aspiration à
     gauche, deux bandes de rotors (mâle en haut, femelle en bas) dont les lobes sont
     des bandes obliques qui défilent vers la droite et se rejoignent en chevrons.
     L'alvéole est le chevron entre la ligne de prise (lobe phi) et l'avant (lobe phi + K),
     BUTÉ contre la paroi de bout : elle se raccourcit.
     V.g (groupe local, posé par V.cam) · V.dessus (calque des scènes) · V.maj({ phi, buse,
     fen, mot }) · V.poche() · V.geo(phi, K) · V.centre(phi, K) · V.dans(phi, K, a, b) ·
     V.pt(x, y) · V.pied(basY) · V.hach (le remplissage de la fonte).
     ===================================================================== */
  function vueLongue(parent) {
    const cid = ident("zone"), zone = el("g", { "clip-path": "url(#" + cid + ")" }, parent);
    el("rect", { x: 20, y: 150, width: 945, height: 610 }, el("clipPath", { id: cid }, zone));
    const g = el("g", {}, zone), V = { zone: zone, g: g, k: 1, tx: 0, ty: 0 };
    V.cam = (cx, cy, s, ax, ay) => { V.k = s; V.tx = ax - cx * s; V.ty = ay - cy * s; g.setAttribute("transform", "translate(" + V.tx.toFixed(2) + " " + V.ty.toFixed(2) + ") scale(" + s.toFixed(4) + ")"); };
    V.pt = (x, y) => [V.tx + x * V.k, V.ty + y * V.k];
    /* pied : la machine s'estompe vers le bas à partir de y = bas - 44 (laisse la place à une pastille posée dessous) */
    const mid = ident("masque"), mgd = ident("degrade"), dm = el("defs", {}, zone);
    const mk = el("mask", { id: mid, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 1600, height: 770 }, dm), dg = el("linearGradient", { id: mgd, x1: 0, y1: 150, x2: 0, y2: 760, gradientUnits: "userSpaceOnUse" }, dm);
    const arrets = [[0, "#fff"], [1, "#fff"], [1, "#000"], [1, "#000"]].map(([o, col]) => el("stop", { offset: o, "stop-color": col }, dg));
    el("rect", { x: 0, y: 0, width: 1600, height: 770, fill: "url(#" + mgd + ")" }, mk);
    zone.setAttribute("mask", "url(#" + mid + ")");
    V.pied = bas => { const a = D.borne((bas - 44 - 150) / 610, 0, 1), b = D.borne((bas - 150) / 610, 0, 1); arrets[1].setAttribute("offset", a.toFixed(4)); arrets[2].setAttribute("offset", b.toFixed(4)); };
    V.pied(900);

    /* hachures de coupe (fonte grise), grille du filtre, dégradés des creux, découpes */
    const pid = ident("hach"), gid = ident("grille"), gm = ident("fm"), gf = ident("ff"), cm = ident("cm"), cf = ident("cf"), cb = ident("cb"), defs = el("defs", {}, g);
    const pat = el("pattern", { id: pid, width: 11, height: 11, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    el("rect", { width: 11, height: 11, fill: "#bcc2c8" }, pat);
    el("line", { x1: 0, y1: 0, x2: 0, y2: 11, stroke: "#767f88", "stroke-width": 2.4 }, pat);
    const gr = el("pattern", { id: gid, width: 8, height: 8, patternUnits: "userSpaceOnUse" }, defs);
    el("rect", { width: 8, height: 8, fill: "#e9d9a8" }, gr);
    el("path", { d: "M 0 0 H 8 M 0 0 V 8", stroke: "#7c5c18", "stroke-width": 1.6, fill: "none" }, gr);
    const degrade = (id, y0, y1) => { const l = el("linearGradient", { id: id, x1: 0, y1: y0, x2: 0, y2: y1, gradientUnits: "userSpaceOnUse" }, defs); [[0, "#3c4855"], [0.5, "#8996a6"], [1, "#35414d"]].forEach(([k, col]) => el("stop", { offset: k, "stop-color": col }, l)); };
    degrade(gm, YM - RB, YM + RB); degrade(gf, YI, YF + RB);
    const clip = (id, y0, h) => el("rect", { x: XR0, y: y0, width: XR1 - XR0, height: h }, el("clipPath", { id: id }, defs));
    clip(cm, YM - RB, 2 * RB); clip(cf, YI, 2 * RB); clip(cb, YM - RB, 4 * RB);
    V.hach = "url(#" + pid + ")";

    /* la carcasse, en fonte grise hachurée, et ses creux (le contour d'abord, puis le remplissage) */
    el("rect", { x: 150, y: 204, width: 800, height: 344, rx: 10, fill: V.hach, stroke: TRAIT, "stroke-width": 3 }, g);
    const CREUX = [[166, 240, 180, 220, 6], [330, 226, 194, 40, 0], [392, 262, 120, 34, 0], [XR0, 292, XR1 - XR0, 224, 0], [150, 318, 22, 64, 0]];
    CREUX.forEach(r => el("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: r[4], fill: "none", stroke: TRAIT, "stroke-width": 6 }, g));
    CREUX.forEach(r => el("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: r[4], fill: BP }, g));
    [[162, 218], [162, 534], [936, 218], [936, 534]].forEach(([x, y]) => { // les boulons
      el("circle", { cx: x, cy: y, r: 7, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 2 }, g);
      el("line", { x1: x - 4, y1: y, x2: x + 4, y2: y, stroke: TRAIT, "stroke-width": 2 }, g);
    });

    /* le moteur : stator (acier + bobinages de cuivre) et rotor sur l'axe du mâle (ses rayures défilent quand il tourne) */
    [[256, 292], [408, 444]].forEach(([y0, y1]) => {
      el("rect", { x: 196, y: y0, width: 120, height: y1 - y0, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 2 }, g);
      for (let x = 208; x < 316; x += 14) el("line", { x1: x, y1: y0 + 3, x2: x, y2: y1 - 3, stroke: TRAIT, "stroke-width": 1.2, opacity: 0.5 }, g);
    });
    [[176, 256, 44], [314, 256, 44], [176, 400, 44], [314, 400, 44]].forEach(([x, y, h]) => {
      el("rect", { x: x, y: y, width: 22, height: h, rx: 9, fill: "url(#vm-cuivre-h)", stroke: "#5a2c10", "stroke-width": 2 }, g);
      for (let k = 1; k < 4; k++) el("line", { x1: x + 5.5 * k, y1: y + 4, x2: x + 5.5 * k, y2: y + h - 4, stroke: "#5a2c10", "stroke-width": 1.3, opacity: 0.7 }, g);
    });
    el("rect", { x: 190, y: 328, width: 132, height: 44, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 2 }, g);
    const mcid = ident("mot"), mrayes = el("g", { "clip-path": "url(#" + mcid + ")" }, g), RAYES = [];
    el("rect", { x: 191, y: 329, width: 130, height: 42 }, el("clipPath", { id: mcid }, defs));
    for (let i = 0; i < 8; i++) RAYES.push(el("line", { stroke: TRAIT, "stroke-width": 2, opacity: 0.55 }, mrayes));
    [[352, YM], [352, YF], [XR1, YM], [XR1, YF]].forEach(([x, y]) => el("rect", { x: x, y: y - 20, width: 22, height: 40, rx: 4, fill: "url(#vm-marine)", stroke: "#0a1829", "stroke-width": 2 }, g)); // les paliers
    el("rect", { x: 322, y: 340, width: 54, height: 20, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 2 }, g); // l'arbre : moteur → vis mâle

    /* le tube d'aspiration (cuivre), sa vanne, son filtre */
    el("rect", { x: 28, y: 304, width: 124, height: 92, fill: "url(#vm-cuivre)" }, g);
    el("rect", { x: 28, y: 318, width: 124, height: 64, fill: BP }, g);
    el("rect", { x: 26, y: 296, width: 16, height: 108, rx: 3, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 2 }, g);
    el("rect", { x: 62, y: 296, width: 50, height: 108, rx: 4, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 2 }, g);
    el("rect", { x: 62, y: 318, width: 50, height: 64, fill: BP }, g);
    el("rect", { x: 76, y: 300, width: 22, height: 16, fill: "url(#vm-acier-h)", stroke: TRAIT, "stroke-width": 1.5 }, g);
    el("rect", { x: 78, y: 262, width: 18, height: 36, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 2 }, g);
    el("rect", { x: 85, y: 242, width: 4, height: 22, fill: TRAIT }, g);
    el("ellipse", { cx: 87, cy: 238, rx: 28, ry: 8, fill: "none", stroke: "#8a6b1a", "stroke-width": 6 }, g);
    el("line", { x1: 59, y1: 238, x2: 115, y2: 238, stroke: "#8a6b1a", "stroke-width": 3 }, g);
    el("rect", { x: 122, y: 318, width: 12, height: 64, fill: "url(#" + gid + ")", stroke: "#7c5c18", "stroke-width": 2 }, g);

    /* la paroi de bout (pleine : la fenêtre n'y est pas, elle est dans le couvercle) */
    el("line", { x1: XR1, y1: 292, x2: XR1, y2: 516, stroke: TRAIT, "stroke-width": 5 }, g);

    /* la buse d'injection d'huile, sur le couvercle, au milieu, et sa ligne (ambre) ; son perçage traverse la carcasse */
    const buse = el("g", { opacity: 0 }, g);
    el("polyline", { points: lg([[XB, 192], [XB, 172], [480, 172]]), fill: "none", stroke: "#8a4a24", "stroke-width": 18, "stroke-linejoin": "round" }, buse);
    el("polyline", { points: lg([[XB, 192], [XB, 172], [480, 172]]), fill: "none", stroke: "#f0c66e", "stroke-width": 8, "stroke-linejoin": "round" }, buse);
    el("rect", { x: 474, y: 160, width: 8, height: 24, rx: 2, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 1.8 }, buse);
    el("rect", { x: XB - 15, y: 188, width: 30, height: 16, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2.2 }, buse);
    el("rect", { x: XB - 5, y: 204, width: 10, height: 92, fill: "#e8b04a", stroke: "#8a5a10", "stroke-width": 1.6 }, buse);

    /* la fenêtre de refoulement : un perçage dans le couvercle, au-dessus du mâle, près de la paroi de bout, et le tube qui monte */
    const fen = el("g", {}, g), fid = ident("fen"), fr = el("rect", { x: XF - 40, y: 296, width: 80, height: 0 }, el("clipPath", { id: fid }, defs));
    const fd = el("g", { "clip-path": "url(#" + fid + ")" }, fen);
    el("rect", { x: XF - 20, y: 160, width: 40, height: 138, fill: HP }, fd);
    [XF - 20, XF + 20].forEach(x => el("line", { x1: x, y1: 204, x2: x, y2: 293, stroke: TRAIT, "stroke-width": 6 }, fd));
    [XF - 28, XF + 20].forEach(x => el("rect", { x: x, y: 162, width: 8, height: 44, fill: "url(#vm-cuivre-h)", stroke: "#6e3818", "stroke-width": 1.8 }, fd));
    el("rect", { x: XF - 34, y: 154, width: 68, height: 10, rx: 2, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, fd);

    /* les rotors : une gorge sombre + des lobes (bandes obliques) qui défilent */
    const rot = el("g", {}, g), gM = el("g", { "clip-path": "url(#" + cm + ")" }, rot), gF = el("g", { "clip-path": "url(#" + cf + ")" }, rot);
    el("rect", { x: XR0, y: YM - RB, width: XR1 - XR0, height: 2 * RB, fill: "url(#" + gm + ")" }, gM);
    el("rect", { x: XR0, y: YI, width: XR1 - XR0, height: 2 * RB, fill: "url(#" + gf + ")" }, gF);
    const MS = [-1, 0, 1, 2, 3, 4, 5, 6], lobM = [], lobF = [];
    MS.forEach(() => {
      lobM.push(el("polygon", { fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": 1.5 }, gM));
      lobF.push(el("polygon", { fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": 1.5 }, gF));
    });
    el("rect", { x: XR0, y: YM - RB, width: XR1 - XR0, height: 4 * RB, fill: "none", stroke: "#2d3743", "stroke-width": 3 }, rot);
    const gP = el("g", { "clip-path": "url(#" + cb + ")" }, rot); // les alvéoles surlignées
    function majLobes(phi) {
      const ph = phi - Math.floor(phi);
      MS.forEach((m, i) => {
        const a = ph + m - LOB, b = ph + m + LOB;
        lobM[i].setAttribute("points", lg([[XU(a - DEL), YM - RB], [XU(b - DEL), YM - RB], [XU(b + DEL), YI], [XU(a + DEL), YI]]));
        lobF[i].setAttribute("points", lg([[XU(a + DEL), YI], [XU(b + DEL), YI], [XU(b - DEL), YF + RB], [XU(a - DEL), YF + RB]]));
      });
    }
    majLobes(0);
    V.dessus = el("g", {}, g);

    /* l'alvéole suivie : les six coins du chevron (ligne de prise phi → avant phi + K) */
    V.geo = (phi, K) => { const a = phi + LOB, b = phi + K - LOB;
      return { TL: [XU(a - DEL), YM - RB], TR: [XU(b - DEL), YM - RB], MR: [XU(b + DEL), YI], BR: [XU(b - DEL), YF + RB], BL: [XU(a - DEL), YF + RB], ML: [XU(a + DEL), YI] }; };
    V.centre = (phi, K) => { const G = V.geo(phi, K), xa = Math.max(XR0, G.TL[0]), xb = Math.min(XR1, G.TR[0] + 2 * DEL * PAS); return { x: (xa + xb) / 2, xa: xa, xb: xb, l: Math.max(0, xb - xa) }; };
    /* un point DANS l'alvéole : a de l'arrière (0) à l'avant (1), b du haut (0) au bas (1) ; les bords sont des chevrons */
    V.dans = (phi, K, a, b) => {
      const G = V.geo(phi, K), y = D.lerp(YM - RB + 22, YF + RB - 22, b), dx = 2 * DEL * PAS * (1 - Math.min(1, Math.abs(y - YI) / (2 * RB)));
      const x0 = G.TL[0] + dx + 16, x1 = Math.min(G.TR[0] + dx, XR1) - 16;
      return [x1 > x0 ? D.lerp(x0, x1, a) : (x0 + x1) / 2, y];
    };
    /* le surlignage : remplissage clair, bord orange ; maj(phi, K, op, ferme, temp) — ferme 0 → 1 : le bord de gauche se trace */
    V.poche = function () {
      const pg = el("g", { opacity: 0 }, gP);
      const rempl = el("polygon", { fill: "rgba(255,255,255,.82)" }, pg), teinte = el("polygon", {}, pg); // clair, comme chez A, à peine teinté par la température
      const bord = el("polyline", { fill: "none", stroke: VIF, "stroke-width": 5, "stroke-linejoin": "round", "stroke-linecap": "round" }, pg);
      const gauche = el("polyline", { fill: "none", stroke: VIF, "stroke-width": 5, "stroke-linejoin": "round", "stroke-linecap": "round", pathLength: 100 }, pg);
      return { g: pg, maj: function (phi, K, o, ferme, temp) {
        const G = V.geo(phi, K);
        const pf = lg(coupe([G.TL, G.TR, G.MR, G.BR, G.BL, G.ML], XR1, true));
        rempl.setAttribute("points", pf); teinte.setAttribute("points", pf);
        teinte.setAttribute("fill", D.couleur(temp === undefined ? 0.3 : temp, true)); teinte.setAttribute("fill-opacity", "0.22");
        bord.setAttribute("points", lg(coupe([G.TL, G.TR, G.MR, G.BR, G.BL], XR1, false)));
        gauche.setAttribute("points", lg(coupe([G.BL, G.ML, G.TL], XR1, false)));
        const fe = ferme === undefined ? 1 : ferme;
        gauche.setAttribute("stroke-dasharray", (100 * fe).toFixed(1) + " 100"); gauche.setAttribute("opacity", fe > 0.01 ? 1 : 0);
        pg.setAttribute("opacity", D.borne(o, 0, 1).toFixed(2));
      } };
    };
    /* maj : défilement des lobes (phi), buse (0 → 1), fenêtre de refoulement (0 → 1, elle s'ouvre de bas en haut), rotation du moteur */
    V.maj = function (o) {
      majLobes(o.phi || 0);
      op(buse, o.buse === undefined ? 0 : o.buse);
      const f = D.borne(o.fen || 0, 0, 1);
      fr.setAttribute("y", (296 - 150 * f).toFixed(1)); fr.setAttribute("height", (150 * f).toFixed(1));
      const mf = D.frac(o.mot || 0);
      RAYES.forEach((l, i) => { const x = 182 + (i + mf) * 20; l.setAttribute("x1", x.toFixed(1)); l.setAttribute("y1", 330); l.setAttribute("x2", (x + 12).toFixed(1)); l.setAttribute("y2", 370); });
    };
    return V;
  }

  /* ---- la caméra : suite de poses [cx, cy, s, ax, ay] reliées par un indice continu ---- */
  function camera(V, poses, reperes, t) {
    const idx = D.courbe(reperes, t, true), i0 = Math.min(poses.length - 2, Math.max(0, Math.floor(idx))), w = D.lisse(idx - i0);
    const p = mixer(poses[i0], poses[i0 + 1], w);
    V.cam(p[0], p[1], p[2], p[3], p[4]);
  }

  /* un texte posé à l'écran, avec des pointillés vers une cible d'écran : place(x, y, [bx, by], [tx, ty] | null) */
  function etiq(parent, texte, at) {
    const g = el("g", {}, parent), t = D.etiquette(g, 0, 0, texte, at || {}), l = D.trait(g, 0, 0, 0, 0);
    return { g: g, texte: t, place: function (x, y, b, cible) {
      t.setAttribute("x", x.toFixed(1)); t.setAttribute("y", y.toFixed(1));
      if (cible) { l.setAttribute("x1", b[0].toFixed(1)); l.setAttribute("y1", b[1].toFixed(1)); l.setAttribute("x2", cible[0].toFixed(1)); l.setAttribute("y2", cible[1].toFixed(1)); l.setAttribute("opacity", 1); }
      else l.setAttribute("opacity", 0);
    } };
  }


  /* =====================================================================
     huile — l'injection : étancher, refroidir, graisser (7 phrases)
     ---------------------------------------------------------------------
     L'alvéole est celle du lot A (K = 4, butée contre la paroi de bout) : elle est
     « fermée, au milieu ». Caméra : machine entière (k0), gros plan sur l'alvéole
     (k1, k3, k4), sur le sommet d'un lobe (k2), sur le palier (k5), retour (k6).
     ===================================================================== */
  S.huile = function (g, c) {
    const T = c.T, E = c.E, V = vueLongue(g), dz = V.dessus, lab = el("g", {}, g), K = 4;
    const phiDe = t => D.courbe([[0, 1.5], [c.D, 3.3]], t, true); // la phase de l'alvéole : lente, comme dans le gros plan
    const alv = V.poche();
    // calques : film d'huile, vapeur, brouillard d'huile, pluie
    const film = el("rect", { x: XR0 + 3, y: 290.5, width: XR1 - XR0 - 6, height: 5.5, fill: D.HUILE }, dz);
    const ra = D.alea(7), molP = [], bruP = [];
    for (let i = 0; i < 7; i++) molP.push({ a: 0.08 + ra() * 0.84, b: 0.1 + ra() * 0.8, p: ra() * 6.28, m: petiteMol(dz, 0.75) });
    for (let i = 0; i < 12; i++) bruP.push({ a: ra(), b: 0.05 + ra() * 0.9, p: ra() * 6.28, e: el("circle", { r: 3 + ra() * 1.8, fill: D.HUILE, stroke: "#8a5a10", "stroke-width": 0.8 }, dz) });
    const pluie = gouttes(dz, 16, 11, D.HUILE, 2.4, 4.2);
    // la gouttelette (personnage ambre), une lueur chaude derrière elle, l'héroïne, les flèches de chaleur
    const lueur = el("circle", { r: 26, fill: "#e2662c" }, dz);
    const gout = D.heroine(dz, { r: 24, teinte: D.HUILE, sansHalo: true, dephasage: 0.4 });
    const mila = D.heroine(dz, { r: 30 });
    const chal = [0, 1, 2].map(() => chaleur(dz, 0.6));
    // k2 : la flèche de vapeur « en arrière », barrée
    const fuite = fleche(dz, VAP, 3.2), barreG = croixRouge(el("g", {}, dz), 0, 0, 9, 4).parentNode;
    // k5 : le palier en coupe, et l'huile qui y arrive par la droite
    const pal = el("g", {}, dz), PB = palier(pal, 926, 350, 44), CP = [[962, 352], [940, 352]];
    el("polyline", { points: lg(CP), fill: "none", stroke: "#8a4a24", "stroke-width": 16 }, pal);
    el("polyline", { points: lg(CP), fill: "none", stroke: "#f0c66e", "stroke-width": 8 }, pal);
    const fluxP = flux(pal, CP, 3, "#fff6d8", 2.4, 4), gPal = gouttes(pal, 8, 23, D.HUILE, 1.6, 2.8);
    // k6 : la vapeur chargée de gouttelettes, qui avance vers la droite dans l'alvéole
    const SM = [], SG = [];
    for (let i = 0; i < 14; i++) SM.push({ s: ra(), b: ra(), m: petiteMol(dz, 0.75) });
    for (let i = 0; i < 28; i++) SG.push({ s: ra(), b: ra(), e: el("circle", { r: 2.6 + ra() * 2, fill: D.HUILE, stroke: "#8a5a10", "stroke-width": 0.7 }, dz) });
    // textes (écran)
    const lBuse = etiq(lab, "buse d'injection"), lGout = etiq(lab, "gouttelette d'huile"), lRef = etiq(lab, "refroidir", { "font-size": 40, "font-weight": 700, fill: "#2f6fb8" });
    const lEta = plaque(lab, 0, 0, ["étancher"], { taille: 46, coul: D.ORANGE, bord: D.ORANGE }), lGra = etiq(lab, "graisser", { "font-size": 46, "font-weight": 700, fill: D.ORANGE }), lPal = etiq(lab, "palier");
    const pas = pastilles(lab, c, 480, "middle", [["je ne surchauffe pas", VERT, [4, 0.05], [4, 1]], ["beaucoup d'huile : il faudra la récupérer", "#8a5a12", [6, 0.1], "fin"]]);
    const poseA = [550, 365, 1.12, 492, 452], poseB = [700, 400, 1.5, 492, 509], poseE = [880, 355, 2.4, 492, 440], poseF = [700, 400, 1.3, 492, 490];
    const reperes = [[0, 0], [E[0] - 2, 0], [T[1] + 0.4, 1], [T[2] - 0.3, 1], [T[2] + 1.3, 2], [E[2] - 1.4, 2], [T[3] + 0.5, 3], [T[5] - 0.9, 3], [T[5] + 0.9, 4], [T[6] - 1.2, 4], [T[6] + 0.6, 5]];

    return function (t) {
      const phi = phiDe(t), G = V.geo(phi, K), cen = V.centre(phi, K), xg = XU(phi - DEL); // xg : le sommet du lobe de gauche de l'alvéole
      V.maj({ phi: phi, buse: doux(t, T[0] - 0.3, 0.8), fen: 0 });
      // l'héroïne (dans le haut de l'alvéole, à gauche) et la gouttelette (qui se colle à la paroi, juste à côté)
      const ak = doux(t, T[1] + 1, 1.2), tAlv = Math.min(0.62, tempAt(cen.x)) - 0.05 * doux(t, T[3] + 1, 3);
      const [hx, hy0] = V.dans(phi, K, D.lerp(0.34, 0.2, ak), 0.4), hy = hy0 + Math.sin(t * 1.8) * 3, sc = 0.85, sg = 0.7;
      const [gxT, gyT] = V.dans(phi, K, 0.5, 0.04), tomb = D.lisse((t - T[1]) / 2);
      const gx = D.lerp(XB, gxT, tomb), gy = D.lerp(196, gyT, tomb * tomb) + (tomb >= 1 ? Math.sin(t * 2.2) * 1.5 : 0), gop = doux(t, T[1] - 0.05, 0.2);
      // la caméra
      camera(V, [poseA, poseB, [xg, 296, 5.5, 492, 330], [hx + 70, 400, 1.5, 492, 509], poseE, poseF], reperes, t);
      alv.maj(phi, K, 1, 1, tAlv + 0.1);
      molP.forEach(o => { const [x, y] = V.dans(phi, K, o.a, o.b); o.m(x + Math.sin(t * 1.7 + o.p) * 3, y + Math.cos(t * 1.3 + o.p) * 3, tAlv, 0.95); });
      const brou = doux(t, E[0] - 0.5, 1.2);
      bruP.forEach((o, i) => { const [x, y] = V.dans(phi, K, o.a, o.b); pos(o.e, x + Math.sin(t * 1.1 + o.p) * 4, y + Math.cos(t * 0.9 + o.p) * 4); o.e.setAttribute("opacity", (brou * (i < 5 ? 1 : doux(t, T[6], 1))).toFixed(2)); });
      // k0 : la pluie par la buse, dans l'alvéole (ou sur le dos du lobe si un lobe passe dessous)
      const dedans = XB > G.TL[0] + 10 && XB < Math.min(XR1, G.TR[0]) - 10;
      pluie(t, (q, f) => [XB + (q - 0.5) * 5, D.lerp(196, dedans ? 332 + q * 70 : 292, f * f), D.fenetre(t, T[0] + 0.3, E[1], 0.6)]);
      // k6 : tout avance vers la droite
      const k6 = D.fenetre(t, T[6] + 0.2, c.D, 0.6), hs = D.lerp(0, 0.18, doux(t, T[6], 3));
      // l'héroïne et la gouttelette
      lueur.setAttribute("cx", gx.toFixed(1)); lueur.setAttribute("cy", gy.toFixed(1)); lueur.setAttribute("opacity", (0.45 * doux(t, T[3] + 0.6, 2.5) * gop).toFixed(2));
      const hum = t < E[0] + 0.5 ? "surprise" : t > T[3] && t < T[3] + 3 ? "chaud" : "sourire";
      gout({ x: gx, y: gy, s: sg, t: t, humeur: t > T[3] + 2 ? "chaud" : "sourire", op: gop, regard: [-1, 0] });
      mila({ x: hx + hs * cen.l, y: hy, s: sc, t: t, temp: tAlv, etat: "vapeur", humeur: hum, ecrase: 0.1 + 0.15 * doux(t, T[6], 3), regard: [t > T[1] ? 1 : 0, 0] });
      SM.forEach(o => { const f = D.frac(o.s + t * 0.1), [x, y] = V.dans(phi, K, f, o.b); o.m(x, y, tAlv, k6 * D.fenetre(f, 0, 1, 0.08)); });
      SG.forEach(o => { const f = D.frac(o.s + t * 0.13), [x, y] = V.dans(phi, K, f, o.b); pos(o.e, x, y); o.e.setAttribute("opacity", (k6 * D.fenetre(f, 0, 1, 0.06)).toFixed(2)); });
      // k2 : le filet d'huile bouche le jeu entre le sommet du lobe et la carcasse
      op(film, doux(t, T[2] + 0.6, 1.2));
      const kf = D.fenetre(t, T[2] + 1.6, E[2] - 0.8, 0.8);
      fuite(xg + 64, 332, xg + 18, 300, kf);
      barreG.setAttribute("transform", "translate(" + (xg + 8).toFixed(1) + " 293)"); op(barreG, kf);
      // k3 : la chaleur passe de l'héroïne à la gouttelette
      const kc = D.fenetre(t, T[3] + 0.5, E[3] - 0.4, 0.7), bordH = hx + hs * cen.l + 1.44 * 30 * sc + 2, bordG = gx - 1.44 * 24 * sg - 2;
      chal.forEach((f, i) => { const dx = (((t * 1.2 + i / 3) % 1) - 0.5) * 4; f((bordH + bordG) / 2 + 10 + dx, (hy + gy) / 2 + (i - 1) * 11, 0, kc); });
      // k5 : le palier et son huile
      const kp = D.fenetre(t, T[5] - 0.4, E[5] + 1.5, 0.6);
      op(pal, kp); fluxP(t, 40, kp); gPal(t, (q, f) => [926 + (q - 0.5) * 24, 302 + f * 26, kp]);
      PB.bague.forEach((e, i) => e.setAttribute("fill", i % 3 === 2 && kp > 0.4 ? D.HUILE : (i % 3 === 2 ? "#dfe6ee" : "#9aa7b5")));
      // les textes d'écran
      const [nx, ny] = V.pt(XB, 188), kB = D.fenetre(t, T[0] + 0.3, E[0] + 0.5, 0.5);
      lBuse.place(nx + 44, ny - 26, [nx + 40, ny - 32], [nx + 18, ny + 2]); op(lBuse.g, kB);
      const [ggx, ggy] = V.pt(gx, gy), [h2x, h2y] = V.pt(hx + hs * cen.l, hy);
      lGout.place(Math.max(450, ggx - 120), 200, [ggx, 208], [ggx, ggy - 36]); op(lGout.g, D.fenetre(t, T[1] + 1.2, E[1], 0.5));
      lRef.place(Math.max(450, h2x - 30), 196, [h2x + 30, 204], [h2x + 30, h2y - 60]); op(lRef.g, D.fenetre(t, T[3] + 0.4, E[3] + 0.4, 0.5));
      lEta.setAttribute("transform", "translate(720 226)"); op(lEta, D.fenetre(t, T[2] + 1.6, E[2] - 0.6, 0.6));
      const [bx, by] = V.pt(926, 350);
      lGra.place(bx + 80, by - 100, [0, 0], null); op(lGra.g, D.fenetre(t, T[5] + 0.3, E[5] + 1.2, 0.5));
      lPal.place(bx + 94, by + 40, [bx + 88, by + 32], [bx + 30, by + 4]); op(lPal.g, D.fenetre(t, T[5] + 0.6, E[5] + 1.2, 0.5));
      V.pied(900 - 184 * Math.max(D.fenetre(t, T[4] + 0.1, c.A(4, 1), 0.35), D.fenetre(t, c.A(6, 0.1), c.D, 0.35)));
      montrer(pas, t);
      return { temp: tAlv, etat: "vapeur", humeur: hum };
    };
  };

  /* =====================================================================
     refoulement — la fenêtre de sortie et le Vi (6 phrases)
     ---------------------------------------------------------------------
     k0-k1 : la machine du lot A, côté droit agrandi. L'alvéole (K = 4) arrive contre la
     paroi de bout, se raccourcit ; le perçage de refoulement, dans le couvercle, se
     DÉCOUVRE ; l'héroïne sort par le tube. k2-k5 : un schéma de l'alvéole en trois
     instants (grande, moyenne, petite), où la fenêtre — un trou dans le plafond — glisse :
     au milieu (le cas juste), à gauche (trop tôt), à droite (trop tard).
     ===================================================================== */
  S.refoulement = function (g, c) {
    const T = c.T, E = c.E, V = vueLongue(g), dz = V.dessus, lab = el("g", {}, g), K = 4;
    const phiDe = t => D.courbe([[0, 3.3], [T[1] + 1, 4.95], [E[1] + 1, 5.35]], t, true);
    const alv = V.poche(), ra = D.alea(5), molP = [];
    for (let i = 0; i < 6; i++) molP.push({ a: 0.1 + ra() * 0.8, b: 0.1 + ra() * 0.8, p: ra() * 6.28, m: petiteMol(dz, 0.75) });
    const sortie = flux(dz, [[XF, 346], [XF, 296], [XF, 190]], 5, "#e07a3c", 3.4, 7);   // le gaz chaud qui part par le tube
    const pousse = fleche(dz, VIF, 3.2), mila = D.heroine(dz, { r: 30 });
    const lOr = etiq(lab, "orifice de"), lOr2 = etiq(lab, "refoulement");
    const P = [780, 330, 1.45, 492, 450];

    /* ---- le schéma (écran) : trois instants de la même alvéole, la fenêtre dans le plafond ---- */
    const sch = el("g", {}, lab), OY = 50, CX = [190, 480, 770], WF = [210, 140, 74], TH = [0.25, 0.42, 0.62], SC = [0.95, 0.72, 0.5], EC = [0, 0.3, 0.85];
    el("rect", { x: 40, y: 300 + OY, width: 900, height: 26, fill: V.hach, stroke: TRAIT, "stroke-width": 3 }, sch);
    el("rect", { x: 40, y: 486 + OY, width: 900, height: 26, fill: "#6f7c89", stroke: TRAIT, "stroke-width": 3 }, sch);
    const schP = CX.map((cx, i) => {
      const q = el("g", {}, sch), w = WF[i];
      el("polygon", { points: lg([[cx - w / 2, 486 + OY], [cx + w / 2, 486 + OY], [cx + w / 2 + 12, 326 + OY], [cx - w / 2 - 12, 326 + OY]]), fill: D.couleur(TH[i], true), "fill-opacity": 0.8, stroke: VIF, "stroke-width": 5, "stroke-linejoin": "round" }, q);
      D.texte(q, cx, 566 + OY, ["grande", "moyenne", "petite"][i], { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#10233c", "font-family": SANS });
      return { g: q, m: D.heroine(q, { r: 30 }) };
    });
    const trou = el("g", {}, sch), trouR = el("rect", { y: 300 + OY - 2, height: 30, fill: D.CREME, stroke: VIF, "stroke-width": 4, "stroke-dasharray": "9 6" }, trou);
    const aS = [fleche(sch, VIF, 6), fleche(sch, VIF, 6)];
    const colonne = (y0, y1) => { const q = el("g", {}, sch); return { q: q, f: flux(q, [[0, y0], [0, y1]], 2, VIOLET, 4, 8) }; };
    const colE = [colonne(300 + OY, 470 + OY), colonne(300 + OY, 470 + OY)], colS = [colonne(480 + OY, 306 + OY), colonne(480 + OY, 306 + OY)];
    const lFen = etiq(lab, "la fenêtre s'ouvre ici", { "text-anchor": "middle" }), pVi = D.pastille(lab, 940, 262 + OY, "Vi", D.ORANGE, 38, "end");
    const lTot = etiq(lab, "trop tôt", { "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: VIOLET }), lTard = etiq(lab, "trop tard", { "text-anchor": "middle", "font-size": 42, "font-weight": 700, fill: VIOLET });
    const pas = pastilles(lab, c, 480, "middle", [["Vi choisi selon l'installation", VERT, [5, 0.1], "fin"]]);
    const xm = t => D.courbe([[0, CX[1]], [T[3] - 0.3, CX[1]], [T[3] + 1, CX[0]], [T[4] - 0.3, CX[0]], [T[4] + 1, CX[2]], [T[5] - 0.3, CX[2]], [T[5] + 1, CX[1]]], t);
    const wm = t => D.courbe([[0, WF[1]], [T[3] - 0.3, WF[1]], [T[3] + 1, WF[0]], [T[4] - 0.3, WF[0]], [T[4] + 1, WF[2]], [T[5] - 0.3, WF[2]], [T[5] + 1, WF[1]]], t);

    return function (t) {
      const phi = phiDe(t), cen = V.centre(phi, K), G = V.geo(phi, K);
      V.maj({ phi: phi, buse: 1, fen: doux(t, c.A(0, 0.3), 1.0) });
      V.cam(P[0], P[1], P[2], P[3], P[4]);
      op(V.zone, 1 - doux(t, T[2] - 0.3, 0.8));
      alv.maj(phi, K, 1 - doux(t, E[1] + 0.2, 0.8), 1, Math.min(0.62, tempAt(cen.x)) + 0.1);
      // l'héroïne : dans l'alvéole, puis poussée par le lobe vers le perçage, et par le tube
      const tAlv = Math.min(0.62, tempAt(cen.x) + 0.1), ecr = D.borne((1 - cen.l / 300) * 1.1, 0.05, 0.7);
      const [hx, hy0] = V.dans(phi, K, 0.4, 0.38), hy = hy0 + Math.sin(t * 1.8) * 3;
      const sExit = D.courbe([[T[1] + 0.2, 0], [E[1] + 0.4, 1]], t), ch = parcours([[hx, hy], [XF - 6, 350], [XF, 300], [XF, 172]]), p = ch.at(D.lisse(sExit) * ch.long);
      mila({ x: p[0], y: p[1], s: D.lerp(0.85, 0.6, D.lisse(sExit * 2)), t: t, temp: tAlv, etat: "vapeur", humeur: "sourire", ecrase: sExit > 0.05 ? 0.1 : ecr, regard: [1, 0], op: (1 - D.lisse((sExit - 0.88) / 0.12)) * (1 - doux(t, T[2] - 0.2, 0.4)) });
      molP.forEach(o => { const [x, y] = V.dans(phi, K, o.a, o.b); o.m(x + Math.sin(t * 1.7 + o.p) * 3, y + Math.cos(t * 1.3 + o.p) * 3, tAlv, 0.95 * (1 - doux(t, E[1] + 0.2, 0.6))); });
      sortie(t, 110, doux(t, c.A(0, 0.5), 0.8) * (1 - doux(t, T[2] - 0.2, 0.5)));
      // k1 : le lobe pousse (flèche sur la ligne de prise de l'alvéole)
      const bx = G.TL[0] + 2 * DEL * PAS * (1 - 24 / (2 * RB));
      pousse(bx - 36, 384, bx + 2, 384, D.fenetre(t, T[1] + 0.2, E[1] - 0.3, 0.5) * (1 - D.lisse(sExit * 4)));
      // k0 : le nom de la fenêtre
      const [wx, wy] = V.pt(XF - 20, 250);
      lOr.place(wx + 102, 206, [0, 0], null); lOr2.place(wx + 102, 242, [wx + 98, 236], [wx + 34, wy + 18]);
      const kO = D.fenetre(t, c.A(0, 0.35), E[0] + 0.8, 0.5); op(lOr.g, kO); op(lOr2.g, kO);
      // k2-k5 : le schéma
      op(sch, doux(t, T[2] - 0.1, 0.7));
      schP.forEach((o, i) => {
        const actif = (i === 1 && (t < T[3] - 0.3 || t >= T[5] - 0.3)) || (i === 0 && t >= T[3] - 0.3 && t < T[4] - 0.3) || (i === 2 && t >= T[4] - 0.3 && t < T[5] - 0.3);
        const hum = actif ? (i === 0 ? "surprise" : i === 2 ? "chaud" : "sourire") : "sourire";
        op(o.g, 0.3 + 0.7 * doux(t, c.A(2, 0.1 + 0.18 * i), 0.5) * (t >= T[3] - 0.3 ? (actif ? 1 : 0.55) : 1));
        o.m({ x: CX[i], y: 436 + OY + Math.sin(t * 1.8 + i) * 2, s: SC[i], t: t, temp: TH[i], etat: "vapeur", humeur: hum, ecrase: EC[i], regard: [1, 0] });
      });
      aS[0](CX[0] + WF[0] / 2 + 44, 430 + OY, CX[1] - WF[1] / 2 - 44, 430 + OY, doux(t, c.A(2, 0.28), 0.5));
      aS[1](CX[1] + WF[1] / 2 + 44, 430 + OY, CX[2] - WF[2] / 2 - 44, 430 + OY, doux(t, c.A(2, 0.46), 0.5));
      const m = xm(t), w = wm(t) + 36;
      trouR.setAttribute("x", (m - w / 2).toFixed(1)); trouR.setAttribute("width", w.toFixed(1)); op(trou, doux(t, c.A(2, 0.62), 0.5));
      const kE = D.fenetre(t, T[3] + 1.6, E[3] + 0.2, 0.5), kS = D.fenetre(t, T[4] + 1.6, E[4] + 0.2, 0.5);
      colE.forEach((o, i) => { o.q.setAttribute("transform", "translate(" + (m + (i ? 1 : -1) * 0.36 * (w - 36)).toFixed(1) + " 0)"); o.f(t + i * 0.3, 90, kE); });
      colS.forEach((o, i) => { o.q.setAttribute("transform", "translate(" + (m + (i ? 1 : -1) * 0.36 * (w - 36)).toFixed(1) + " 0)"); o.f(t + i * 0.3, 110, kS); });
      lFen.place(m, 286 + OY, [0, 0], null); op(lFen.g, D.fenetre(t, c.A(2, 0.62), T[3] - 0.1, 0.4) + D.fenetre(t, T[5] + 0.6, E[5] + 0.2, 0.4));
      lTot.place(m, 286 + OY, [0, 0], null); op(lTot.g, D.fenetre(t, T[3] + 1.0, E[3] + 0.4, 0.5));
      lTard.place(m, 286 + OY, [0, 0], null); op(lTard.g, D.fenetre(t, T[4] + 1.0, E[4] + 0.4, 0.5));
      op(pVi, D.fenetre(t, c.A(2, 0.8), E[2] + 0.3, 0.4));
      montrer(pas, t);
      const humM = t >= T[3] - 0.3 && t < T[4] - 0.3 ? "surprise" : t >= T[4] - 0.3 && t < T[5] - 0.3 ? "chaud" : "sourire";
      return { temp: t >= T[4] - 0.3 && t < T[5] - 0.3 ? 0.62 : tAlv, etat: "vapeur", humeur: humM };
    };
  };

  /* =====================================================================
     tiroir — régler la puissance (7 phrases)
     ---------------------------------------------------------------------
     k0 : la nuit sur l'entrepôt ; k1 : le tiroir sous les vis (un logement ajouté sous la
     carcasse du lot A) ; k2 : il recule, une fenêtre s'ouvre, la vapeur repart vers
     l'aspiration (par un tube de retour, l'héroïne avec elle) ; k3 : la jauge de puissance
     ; k4 : le vérin à huile et ses deux électrovannes ; k5 : le tiroir au plus bas, le
     moteur démarre ; k6 : ou bien un variateur de vitesse.
     ===================================================================== */
  S.tiroir = function (g, c) {
    const T = c.T, E = c.E, nuit = el("g", {}, g), V = vueLongue(g), dz = V.dessus, lab = el("g", {}, g);
    /* ---- k0 : l'entrepôt la nuit, portes fermées ---- */
    const cid = ident("nuit"), cg = ident("ciel"), dn = el("defs", {}, nuit);
    el("rect", { x: 40, y: 172, width: 900, height: 530, rx: 26 }, el("clipPath", { id: cid }, dn));
    const gc = el("linearGradient", { id: cg, x1: 0, y1: 0, x2: 0, y2: 1 }, dn);
    [[0, "#0b1830"], [1, "#2b4a76"]].forEach(([o, col]) => el("stop", { offset: o, "stop-color": col }, gc));
    const ciel = el("g", { "clip-path": "url(#" + cid + ")" }, nuit), rs = D.alea(3), etoiles = [];
    el("rect", { x: 40, y: 172, width: 900, height: 530, fill: "url(#" + cg + ")" }, ciel);
    for (let i = 0; i < 34; i++) etoiles.push({ e: el("circle", { cx: (60 + rs() * 860).toFixed(0), cy: (190 + rs() * 200).toFixed(0), r: (1.4 + rs() * 2).toFixed(1), fill: "#fff" }, ciel), p: rs() * 6.28 });
    el("circle", { cx: 790, cy: 290, r: 86, fill: "#f6f0cf", opacity: 0.1 }, ciel);
    el("circle", { cx: 790, cy: 290, r: 54, fill: "#f6f0cf" }, ciel);
    [[772, 304, 11], [808, 272, 7], [806, 312, 13]].forEach(([x, y, r]) => el("circle", { cx: x, cy: y, r: r, fill: "#e0d6a8" }, ciel));
    el("rect", { x: 40, y: 612, width: 900, height: 90, fill: "#16253b" }, ciel);
    el("rect", { x: 150, y: 412, width: 620, height: 200, fill: "#5e6c7b" }, ciel);
    for (let x = 172; x < 770; x += 24) el("line", { x1: x, y1: 412, x2: x, y2: 612, stroke: "#52606f", "stroke-width": 2 }, ciel);
    el("rect", { x: 138, y: 392, width: 644, height: 22, rx: 3, fill: "#47535f" }, ciel);
    el("rect", { x: 220, y: 356, width: 190, height: 36, rx: 4, fill: "#6f7d8b", stroke: "#47535f", "stroke-width": 2 }, ciel);
    const vent = [D.ventilateur(ciel, 266, 344, 24), D.ventilateur(ciel, 364, 344, 24)];
    [195, 375, 555].forEach(x0 => { // trois portes de chambre froide, fermées
      el("rect", { x: x0, y: 452, width: 140, height: 160, fill: "#33404d", stroke: "#8a97a5", "stroke-width": 3 }, ciel);
      for (let y = 468; y < 612; y += 14) el("line", { x1: x0 + 3, y1: y, x2: x0 + 137, y2: y, stroke: "#27323d", "stroke-width": 2.4 }, ciel);
      el("circle", { cx: x0 + 70, cy: 434, r: 22, fill: "#ffd36b", opacity: 0.25 }, ciel); el("circle", { cx: x0 + 70, cy: 434, r: 6, fill: "#ffd36b" }, ciel);
    });
    el("rect", { x: 40, y: 172, width: 900, height: 530, rx: 26, fill: "none", stroke: D.BLEU, "stroke-width": 4 }, nuit);
    const pas = pastilles(lab, c, 480, "middle", [["moins de froid demandé", "#2f6fb8", [0, 0.1], [0, 1]], ["ou bien : variateur de vitesse", D.ORANGE, [6, 0.1], "fin"]]);

    /* ---- la machine : le logement du tiroir, sa pièce, le vérin, le tube de retour ---- */
    const LT = 260, DP = 180, ROD = 34, XL0 = 376, YP = 521, PH = 28;     // longueur de la pièce, course, tige, départ, hauteur
    const log = el("g", {}, dz), gtir = ident("tir"), dt = el("defs", {}, log);
    const gt = el("linearGradient", { id: gtir, x1: 0, y1: 0, x2: 0, y2: 1 }, dt);
    [[0, "#b7c8da"], [1, "#5d7894"]].forEach(([o, col]) => el("stop", { offset: o, "stop-color": col }, gt));
    // le tube de retour vers l'aspiration (cuivre), derrière le logement
    const RET = [[480, 470], [480, 566], [396, 566], [396, 632], [142, 632], [142, 360], [168, 350], [182, 334], [196, 310], [322, 310], [338, 296], [340, 246], [452, 246], [452, 284]], chem = parcours(RET);
    [[[396, 596], [396, 632], [142, 632], [142, 392]]].forEach(p => {
      el("polyline", { points: lg(p), fill: "none", stroke: "#8a4a24", "stroke-width": 18, "stroke-linejoin": "round" }, log);
      el("polyline", { points: lg(p), fill: "none", stroke: BP, "stroke-width": 10, "stroke-linejoin": "round" }, log);
    });
    el("rect", { x: 136, y: 378, width: 12, height: 24, fill: BP }, log);
    // le logement, sous la carcasse : une fonte hachurée, avec sa cavité qui prolonge l'alésage
    el("rect", { x: 372, y: 545, width: 578, height: 60, fill: V.hach }, log);
    el("polyline", { points: lg([[372, 545], [372, 605], [950, 605], [950, 545]]), fill: "none", stroke: TRAIT, "stroke-width": 3 }, log);
    el("polyline", { points: lg([[372, 516], [372, 582], [902, 582], [902, 516]]), fill: "none", stroke: TRAIT, "stroke-width": 6 }, log);
    el("rect", { x: 374, y: 512.5, width: 526, height: 69.5, fill: BP }, log);
    el("rect", { x: 382, y: 578, width: 28, height: 28, fill: BP }, log);
    [382, 410].forEach(x => el("line", { x1: x, y1: 582, x2: x, y2: 605, stroke: TRAIT, "stroke-width": 4 }, log));
    el("rect", { x: 870, y: 578, width: 20, height: 28, fill: BP }, log);
    [870, 890].forEach(x => el("line", { x1: x, y1: 582, x2: x, y2: 605, stroke: TRAIT, "stroke-width": 4 }, log));
    const chambre = el("rect", { y: YP + 1, height: PH - 2, fill: D.HUILE, opacity: 0.92 }, log), pist = el("rect", { y: YP - 2, width: 16, height: PH + 4, rx: 2, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 2 }, log);
    const tige = el("rect", { y: YP + PH / 2 - 4, width: ROD, height: 8, fill: "url(#vm-acier)", stroke: TRAIT, "stroke-width": 1.6 }, log);
    const piece = el("rect", { y: YP, width: LT, height: PH, rx: 4, fill: "url(#" + gtir + ")", stroke: TRAIT, "stroke-width": 2.5 }, log);
    const lumT = el("rect", { y: YP - 3, width: LT + 6, height: PH + 6, rx: 6, fill: "none", stroke: VIF, "stroke-width": 5, opacity: 0 }, log);
    const fenetre = el("rect", { x: 376, y: 513, height: 68, fill: "none", stroke: VIF, "stroke-width": 3.4, "stroke-dasharray": "9 6" }, log);
    // le vérin : la ligne d'huile sous le logement et ses deux électrovannes
    const hv = el("g", {}, dz), CA = [[962, 662], [880, 662], [880, 590]], CB = [[880, 590], [880, 662], [700, 662]];
    [[[962, 662], [700, 662]], [[880, 606], [880, 662]]].forEach(p => {
      el("polyline", { points: lg(p), fill: "none", stroke: "#8a4a24", "stroke-width": 14, "stroke-linejoin": "round" }, hv);
      el("polyline", { points: lg(p), fill: "none", stroke: "#f0c66e", "stroke-width": 6, "stroke-linejoin": "round" }, hv);
    });
    const flotA = flux(hv, CA, 5, "#fff6d8", 2.4, 5), flotB = flux(hv, CB, 8, "#fff6d8", 2.4, 5);
    const EV = [926, 760].map(x => { const q = el("g", {}, hv); const r = el("rect", { x: x - 28, y: 642, width: 56, height: 40, rx: 8, fill: "#e9eef4", stroke: "#56636f", "stroke-width": 3 }, q); D.texte(q, x, 672, "EV", { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: "#10233c", "font-family": SANS }); return r; });
    // la vapeur qui repart, les molécules, l'héroïne
    const flot = flux(dz, RET, 14, VAP, 3.4, 7), ra = D.alea(9), SM = [];
    for (let i = 0; i < 9; i++) SM.push({ s: ra(), m: petiteMol(dz, 0.6) });
    const mila = D.heroine(dz, { r: 30 }), alv = V.poche();
    /* la jauge de puissance (écran) : 100 % en haut, ¼ plus bas */
    const jau = el("g", {}, lab), JX = 60, JY = 650, JH = 96;
    el("rect", { x: JX, y: JY, width: 36, height: JH, rx: 8, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, jau);
    const niveau = el("rect", { x: JX + 3, width: 30, rx: 5, fill: D.ORANGE }, jau);
    [[JY, "100 %", JY + 12], [JY + JH * 0.75, "¼", JY + JH * 0.75 + 10]].forEach(([y, s, ty]) => { el("line", { x1: JX + 36, y1: y, x2: JX + 48, y2: y, stroke: D.BLEU, "stroke-width": 3 }, jau); D.texte(jau, JX + 58, ty, s, { "font-size": 30, "font-weight": 700, fill: "#10233c", "font-family": SANS }); });
    D.texte(jau, JX + 58, JY + 52, "puissance", { "font-size": 30, "font-weight": 700, fill: D.ORANGE, "font-family": SANS });
    /* le variateur (k6) */
    const vari = el("g", {}, lab);
    el("line", { x1: 235, y1: 190, x2: 235, y2: 204, stroke: "#56636f", "stroke-width": 5 }, vari);
    el("rect", { x: 155, y: 150, width: 160, height: 42, rx: 9, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, vari);
    D.texte(vari, 235, 180, "variateur", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.BLEU, "font-family": SANS });
    // textes
    const lTir = etiq(lab, "tiroir", { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: D.ORANGE }), lFen = etiq(lab, "fenêtre", { "text-anchor": "middle" }), lAsp = etiq(lab, "vers l'aspiration");
    const lVer = etiq(lab, "vérin à huile"), lEV = etiq(lab, "électrovannes", { "text-anchor": "middle" }), lDem = etiq(lab, "démarrage presque à vide");
    // temps
    const tpDe = t => D.courbe([[0, 0], [T[2] + 0.5, 0], [T[2] + 2.4, 0.75], [E[2] - 1.8, 0.75], [E[2] - 0.2, 0], [T[3] + 0.4, 0], [E[3] - 0.2, 1],
      [T[4] + 0.5, 1], [c.A(4, 0.5), 0.4], [c.A(4, 0.7), 0.4], [E[4] - 0.4, 0.8], [T[5] + 1.0, 1]], t);
    const vit = t => { // vitesse de défilement (phases par seconde) : lente, arrêt (k4 → k5), démarrage, variateur (k6)
      let v = 0.05 * (1 - D.lisse((t - (E[4] - 1)) / 1.3)) + 0.12 * D.lisse((t - (T[5] + 1.4)) / 3);
      if (t > T[6]) v *= 1 + 0.5 * Math.sin((t - T[6]) * 1.1);
      return v;
    };
    const phiDe = t => { let a = 0.2; for (let u = 0; u < t; u += 0.1) a += vit(Math.min(u + 0.05, t)) * Math.min(0.1, t - u); return a; };

    return function (t) {
      // k0 → k1 : la nuit s'efface, la machine apparaît
      const kN = 1 - doux(t, T[1] - 0.6, 0.8);
      op(nuit, kN); op(V.zone, 1 - kN);
      etoiles.forEach(o => o.e.setAttribute("opacity", (0.45 + 0.55 * Math.sin(t * 1.3 + o.p)).toFixed(2)));
      vent.forEach((f, i) => f(t * 40 + i * 30));
      const phi = phiDe(t), tp = D.borne(tpDe(t), 0, 1);
      V.cam(488, 400, 1, 492, 398);
      V.maj({ phi: phi, buse: 1, fen: 1, mot: phi * 1.3 });
      const xl = XL0 + tp * DP, xpl = xl + LT + ROD, ouvF = D.borne((xl - XL0 - 4) / 30, 0, 1);
      piece.setAttribute("x", xl.toFixed(1)); lumT.setAttribute("x", (xl - 3).toFixed(1)); tige.setAttribute("x", (xl + LT).toFixed(1)); pist.setAttribute("x", xpl.toFixed(1));
      chambre.setAttribute("x", (xpl + 16).toFixed(1)); chambre.setAttribute("width", Math.max(0, 896 - xpl - 16).toFixed(1));
      lumT.setAttribute("opacity", (D.fenetre(t, T[1] + 0.8, E[1] + 0.3, 0.5) * (0.6 + 0.4 * Math.sin(t * 6))).toFixed(2));
      // l'alvéole (début de vie : grande) ; la fenêtre sous elle et la vapeur qui repart vers l'aspiration
      const cen = V.centre(phi, 4);
      alv.maj(phi, 4, D.fenetre(t, T[1] + 0.2, E[3], 0.5), 1, 0.25);
      fenetre.setAttribute("width", Math.max(0, xl - XL0 - 4).toFixed(1)); op(fenetre, ouvF * 0.9);
      flot(t, 90, ouvF * doux(t, T[2] + 1.0, 0.5));
      SM.forEach(o => { const u = D.frac(o.s + t * 0.1), p = chem.at(u * chem.long); o.m(p[0], p[1] + Math.sin(o.s * 40) * 4, 0.2, ouvF * D.fenetre(u, 0, 1, 0.05)); });
      // l'héroïne : dans l'alvéole, puis elle repart avec la vapeur, jusqu'à l'orifice d'aspiration
      const tDep = c.A(2, 0.42), sH = D.courbe([[tDep, 0], [E[3] - 0.8, 1]], t, true), hp = chem.at(sH * chem.long);
      const [ax, ay] = V.dans(phi, 4, 0.12, 0.8), av = doux(t, tDep - 1.2, 1.2), hum = sH > 0 && sH < 0.97 ? "surprise" : "sourire";
      const hxp = sH > 0 ? hp[0] : D.lerp(ax, RET[0][0], av), hyp = sH > 0 ? hp[1] : D.lerp(ay, RET[0][1], av);
      mila({ x: hxp, y: hyp, s: 0.55, t: t, temp: 0.2, etat: "vapeur", humeur: hum, regard: [-1, 0], op: doux(t, T[1] + 0.3, 0.6) });
      // jauge de puissance
      const p = 1 - 0.75 * tp, kJ = doux(t, T[3] - 0.3, 0.6);
      op(jau, kJ); niveau.setAttribute("y", (JY + JH - (JH - 6) * p - 3).toFixed(1)); niveau.setAttribute("height", ((JH - 6) * p).toFixed(1));
      // k4 : le vérin, les électrovannes, l'huile qui pousse
      const k4 = D.fenetre(t, T[4] - 0.3, E[4] + 0.8, 0.5), ev1 = t > T[4] + 0.4 && t < c.A(4, 0.55), ev2 = t > c.A(4, 0.62) && t < E[4] - 0.3;
      op(hv, k4);
      EV[0].setAttribute("fill", ev1 ? "#bfe6cf" : "#e9eef4"); EV[0].setAttribute("stroke", ev1 ? VERT : "#56636f");
      EV[1].setAttribute("fill", ev2 ? "#bfe6cf" : "#e9eef4"); EV[1].setAttribute("stroke", ev2 ? VERT : "#56636f");
      flotA(t, 50, ev1 ? 1 : 0); flotB(t, 50, ev2 ? 1 : 0);
      // textes d'écran
      const [tx, ty] = V.pt(xl + LT / 2, 605);
      lTir.place(tx, ty + 52, [tx, ty + 24], [tx, V.pt(0, 552)[1]]); op(lTir.g, D.fenetre(t, T[1] + 0.4, E[1] + 0.2, 0.5));
      const [fx] = V.pt((XL0 + xl) / 2, 0), [, fy] = V.pt(0, 605);
      lFen.place(fx, fy + 48, [fx, fy + 22], [fx, V.pt(0, 584)[1]]); op(lFen.g, D.fenetre(t, T[2] + 2.2, E[2] - 1.0, 0.5));
      const [px, py] = V.pt(322, 310);
      lAsp.place(40, 188, [250, 196], [px, py - 6]); op(lAsp.g, D.fenetre(t, T[2] + 2.6, E[2] - 0.5, 0.5));
      const [ex, ey] = V.pt(760, 662), [vx, vy] = V.pt(xpl + 8, 585);
      lEV.place(ex, ey + 62, [ex, ey + 40], [ex, ey + 22]); op(lEV.g, D.fenetre(t, T[4] + 0.2, E[4] + 0.5, 0.5));
      lVer.place(450, ey - 20, [640, ey - 26], [vx, vy + 4]); op(lVer.g, D.fenetre(t, T[4] + 0.2, E[4] + 0.5, 0.5));
      lDem.place(40, 188, [140, 196], [140, 214]); op(lDem.g, D.fenetre(t, T[5] + 0.8, E[5] + 0.3, 0.5));
      op(vari, doux(t, T[6], 0.6));
      montrer(pas, t);
      return { temp: 0.2, etat: "vapeur", humeur: hum };
    };
  };

  /* =====================================================================
     separateur — le séparateur d'huile, vertical (8 phrases, pres: 2)
     ---------------------------------------------------------------------
     Manière de l'édition NH₃ (cuve d'acier en coupe, nappe D.liquide en ambre, gouttes
     qui tombent). Entrée à droite, en haut ; chicane (plaque) sous l'entrée ; cartouche
     de fibres en haut (bloc creux), sortie vapeur au sommet qui part vers la GAUCHE (le
     condenseur) ; nappe d'huile au fond, voyant sur le côté, sortie d'huile en bas qui
     part vers la DROITE (le compresseur) par un filtre et un refroidisseur d'huile.
     Pendant les phrases 0 et 1, la carte d'identité couvre la scène : tout y est déjà
     posé, rien ne bouge avant la phrase 2.
     ===================================================================== */
  S.separateur = function (g, c) {
    const T = c.T, E = c.E, ra = D.alea(21), CHAUD = "#fbe5d6", ACIER = "#4d5866";
    const tuyaux = el("g", {}, g), cu = el("g", {}, g), dz = el("g", {}, g), lab = el("g", {}, g);
    // les tuyaux, derrière la cuve : arrivée (à droite), sortie vapeur (au sommet, vers la gauche), sortie d'huile (en bas, vers la droite)
    const tube = (pts, ep, paroi, coul) => { el("polyline", { points: lg(pts), fill: "none", stroke: paroi, "stroke-width": ep, "stroke-linejoin": "round" }, tuyaux); el("polyline", { points: lg(pts), fill: "none", stroke: coul, "stroke-width": ep - 20, "stroke-linejoin": "round" }, tuyaux); };
    tube([[962, 405], [500, 405]], 76, ACIER, CHAUD); tube([[380, 250], [380, 190], [40, 190]], 76, ACIER, CHAUD); tube([[500, 668], [962, 668]], 46, "#8a4a24", "#f0c66e");
    el("rect", { x: 36, y: 152, width: 12, height: 76, rx: 3, fill: ACIER }, tuyaux);
    // la cuve (virole d'acier, fonds bombés) : intérieur x 264 → 496, y 250 → 692
    const X0C = 264, X1C = 496, YHC = 250, YBC = 692, cid = ident("cuve");
    el("rect", { x: 250, y: 236, width: 260, height: 470, rx: 46, fill: "url(#vm-acier-h)" }, cu);
    el("rect", { x: X0C, y: YHC, width: X1C - X0C, height: YBC - YHC, rx: 32, fill: "#f4f8fc" }, cu);
    el("rect", { x: X0C, y: YHC, width: X1C - X0C, height: YBC - YHC, rx: 32 }, el("clipPath", { id: cid }, cu));
    const dedans = el("g", { "clip-path": "url(#" + cid + ")" }, dz);
    // les ouvertures dans la paroi : l'arrivée, la sortie vapeur, la sortie d'huile
    el("rect", { x: 492, y: 377, width: 22, height: 56, fill: CHAUD }, dz); el("rect", { x: 352, y: 232, width: 56, height: 26, fill: CHAUD }, dz); el("rect", { x: 492, y: 659, width: 22, height: 26, fill: "#f0c66e" }, dz);
    // la cartouche de fibres : un cylindre creux, vu en coupe (deux blocs), sa plaque de tête avec l'ouverture vers le haut
    const cart = el("g", {}, dedans);
    [[316, 350], [410, 444]].forEach(([a, b]) => {
      el("rect", { x: a, y: 272, width: b - a, height: 86, fill: "#ecdfba", stroke: "#a58c4c", "stroke-width": 2.5 }, cart);
      for (let y = 280; y < 354; y += 9) el("line", { x1: a + 3, y1: y + 6, x2: b - 3, y2: y, stroke: "#c9b27a", "stroke-width": 2 }, cart);
    });
    [[316, 352], [408, 444]].forEach(([a, b]) => el("rect", { x: a, y: 258, width: b - a, height: 16, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, cart));
    el("rect", { x: 352, y: 250, width: 56, height: 10, fill: CHAUD }, cart);
    // la chicane : une plaque fixée à la paroi gauche, sous l'entrée ; passage libre à droite
    el("rect", { x: X0C, y: 470, width: 400 - X0C, height: 12, rx: 3, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, dedans);
    const filmPl = el("rect", { x: X0C, y: 466, width: 400 - X0C, height: 5, fill: D.HUILE }, dedans);
    // la nappe d'huile
    let depth = 52;
    const nappe = D.liquide(dedans, { x0: X0C, x1: X1C, yh: YHC, yb: YBC, niveau: () => depth / (YBC - YHC), couleur: () => D.HUILE, opacite: 0.92, pas: (X1C - X0C) / 12 });
    // le voyant d'huile, sur le côté gauche
    const voy = el("g", {}, dz);
    [[606, 626], [676, 656]].forEach(([a, b]) => el("rect", { x: 232, y: a - 4, width: 22, height: 8, fill: ACIER }, voy));
    el("rect", { x: 216, y: 598, width: 34, height: 86, rx: 9, fill: "#fff", stroke: ACIER, "stroke-width": 4 }, voy);
    const voyNiv = el("rect", { x: 220, width: 26, rx: 4, fill: D.HUILE }, voy);
    // le chemin de la vapeur (arrivée, virage sous la cartouche, passage par la cartouche, sortie)
    const CH = parcours([[950, 405], [520, 405], [430, 420], [330, 440], [290, 405], [290, 330], [333, 308], [380, 304], [380, 262], [380, 190], [300, 190], [60, 190]]);
    const cum = [0], pts = [[950, 405], [520, 405], [430, 420], [330, 440], [290, 405], [290, 330], [333, 308], [380, 304], [380, 262], [380, 190], [300, 190], [60, 190]];
    for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const pn = (d, off) => { const a = CH.at(d - 3), b = CH.at(d + 3), n = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, p = CH.at(d); return [p[0] - (b[1] - a[1]) / n * off, p[1] + (b[0] - a[0]) / n * off]; };
    const gaz = [], fines = [];
    for (let i = 0; i < 18; i++) gaz.push({ s: ra(), u: ra() * 2 - 1, m: petiteMol(dz, 0.55) });
    for (let i = 0; i < 30; i++) fines.push({ s: ra(), u: ra() * 2 - 1, e: el("circle", { r: 2.2 + ra() * 0.8, fill: D.HUILE }, dz) });
    const grosses = gouttes(dz, 8, 31, D.HUILE, 4, 6.5), suintent = gouttes(dz, 7, 41, D.HUILE, 2.6, 4), fouettes = gouttes(dz, 6, 43, D.HUILE, 2.6, 4), gPlaque = gouttes(dz, 3, 47, D.HUILE, 3, 4.5);
    // gouttelettes collées à la cartouche, filets qui ruissellent
    const colles = [], filets = [];
    for (let i = 0; i < 12; i++) colles.push({ x: i < 6 ? 316 - 2 : 444 + 2, y: 282 + ra() * 66, e: el("circle", { r: 2.6 + ra() * 1.8, fill: D.HUILE, stroke: "#8a5a10", "stroke-width": 0.7 }, dedans) });
    for (let i = 0; i < 6; i++) filets.push({ x: i < 3 ? 316 - 1 : 444 + 1, s: ra(), e: el("line", { stroke: D.HUILE, "stroke-width": 3, "stroke-linecap": "round" }, dedans) });
    const mila = D.heroine(dz, { r: 30 });
    // la ligne d'huile : gouttes qui défilent, un filtre, un refroidisseur d'huile (k6)
    const hu = el("g", {}, g), lignes = [];
    for (let i = 0; i < 11; i++) lignes.push(el("circle", { r: 5.5, fill: D.HUILE, stroke: "#8a5a10", "stroke-width": 1 }, hu));
    const filtre = el("g", {}, hu), refro = el("g", {}, hu);
    el("rect", { x: 596, y: 630, width: 88, height: 76, rx: 8, fill: "#fff", stroke: D.BLEU, "stroke-width": 3.5 }, filtre);
    [616, 640, 664].forEach(x => el("line", { x1: x, y1: 640, x2: x, y2: 696, stroke: "#7f8c99", "stroke-width": 3 }, filtre));
    el("rect", { x: 744, y: 630, width: 112, height: 76, rx: 8, fill: "#fff", stroke: D.BLEU, "stroke-width": 3.5 }, refro);
    el("polyline", { points: lg([[756, 668], [772, 644], [788, 692], [804, 644], [820, 692], [836, 668], [846, 668]]), fill: "none", stroke: "#2f6fb8", "stroke-width": 4, "stroke-linejoin": "round" }, refro);
    // k7 : la vignette barrée
    const vig = el("g", {}, lab);
    el("rect", { x: 520, y: 160, width: 436, height: 190, rx: 16, fill: "#fffdf8", stroke: ROUGE, "stroke-width": 4 }, vig);
    [["evaporateur", "évaporateur : huile collée", 168, true], ["condenseur", "condenseur : huile collée", 224, true], ["compresseur", "compresseur : à sec", 280, false]].forEach(([nom, txt, y, tache]) => {
      D.image(vig, nom, 528, y - 4, 76, 56);
      if (tache) [[546, y + 8, 6], [580, y + 28, 5], [562, y + 40, 4]].forEach(([x, yy, r]) => el("circle", { cx: x, cy: yy, r: r, fill: D.HUILE, stroke: "#8a5a10", "stroke-width": 1 }, vig));
      D.texte(vig, 608, y + 34, txt, { "font-size": 29, "font-weight": 700, fill: "#10233c", "font-family": SANS });
    });
    el("circle", { cx: 936, cy: 166, r: 24, fill: ROUGE, stroke: "#fff", "stroke-width": 4 }, vig);
    [[-1, -1, 1, 1], [-1, 1, 1, -1]].forEach(([a, b, cc, d]) => el("line", { x1: 936 + a * 10, y1: 166 + b * 10, x2: 936 + cc * 10, y2: 166 + d * 10, stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round" }, vig));
    // textes
    const lVap = etiq(lab, "vapeur chaude + huile"), lGro = etiq(lab, "grosses gouttes"), lCar = etiq(lab, "cartouche"), lCar2 = etiq(lab, "de fibres");
    const lCond = etiq(lab, "vers le"), lCond2 = etiq(lab, "condenseur"), lNap = etiq(lab, "nappe d'huile"), lVoy = etiq(lab, "voyant"), lVoy2 = etiq(lab, "d'huile");
    const lFil = etiq(lab, "filtre", { "text-anchor": "middle" }), lRef = etiq(lab, "refroidisseur", { "text-anchor": "middle" }), lRef2 = etiq(lab, "d'huile", { "text-anchor": "middle" }), lCmp = etiq(lab, "vers le compresseur", { "text-anchor": "end" });
    const pas = pastilles(lab, c, 735, "middle", [["poussée par la haute pression", D.ORANGE, [6, 0.1], [6, 1], 522]]);

    return function (t) {
      const kv = (a, b) => D.fenetre(t, a, b, 0.5);
      // la nappe, le voyant, la plaque
      depth = D.courbe([[0, 52], [T[4], 52], [E[4], 66], [E[5], 86]], t);
      nappe.maj(t);
      voyNiv.setAttribute("y", (YBC - depth).toFixed(1)); voyNiv.setAttribute("height", (684 - (YBC - depth)).toFixed(1));
      op(filmPl, doux(t, T[4] + 1, 1.5)); const surf = YBC - depth;
      // la vapeur, le brouillard : tout part de l'arrivée, vire sous la cartouche, passe par les fibres
      const kb = doux(t, T[2] - 0.1, 0.6), L = CH.long, vit = f => D.courbe([[0, 0], [0.3, cum[1]], [0.55, cum[4]], [1, L]], f, true);
      gaz.forEach(o => { const f = D.frac(o.s + t / 16), d = vit(f), p = pn(d, o.u * (d < cum[2] || d > cum[8] ? 14 : 9)); o.m(p[0], p[1], 0.62, kb * D.fenetre(f, 0, 1, 0.04)); });
      fines.forEach(o => { const f = D.frac(o.s + t / 16), d = vit(f), p = pn(d, o.u * (d < cum[2] ? 15 : 10)); pos(o.e, p[0], p[1]); o.e.setAttribute("opacity", (kb * D.fenetre(f, 0, 1, 0.04) * (d < cum[5] + 20 ? 1 : 0)).toFixed(2)); });
      // k3 : les grosses gouttes, plus lourdes, quittent le flux et tombent dans l'ouverture à droite de la chicane
      const k3 = D.fenetre(t, T[3] - 0.2, E[4] + 0.5, 0.6);
      grosses(t, (q, f) => [D.lerp(506, 450 + q * 28, Math.sqrt(f)), D.lerp(408, surf, f * f), k3 * (f * f * (surf - 408) + 408 < surf - 3 ? 1 : 0)]);
      // k4 : les fines gouttes se collent aux fibres et ruissellent
      const k4 = doux(t, T[4] + 0.3, 1.2);
      colles.forEach(o => { pos(o.e, o.x, o.y); o.e.setAttribute("opacity", k4.toFixed(2)); });
      filets.forEach(o => { const f = D.frac(o.s + t * 0.35), y = 284 + f * 62; o.e.setAttribute("x1", o.x); o.e.setAttribute("x2", o.x); o.e.setAttribute("y1", y.toFixed(1)); o.e.setAttribute("y2", Math.min(356, y + 12).toFixed(1)); o.e.setAttribute("opacity", (k4 * D.fenetre(f, 0, 1, 0.1)).toFixed(2)); });
      suintent(t, (q, f) => [318 + q * 28, 358 + (468 - 358) * f * f, k4 * (f * f * 110 + 358 < 466 ? 1 : 0)]);
      fouettes(t, (q, f) => [414 + q * 28, 358 + (surf - 358) * f * f, k4 * (f * f * (surf - 358) + 358 < surf - 3 ? 1 : 0)]);
      gPlaque(t, (q, f) => [398 - q * 4, 484 + (surf - 484) * f * f, k4 * doux(t, T[4] + 2, 1) * (f * f * (surf - 484) + 484 < surf - 3 ? 1 : 0)]);
      // l'héroïne : arrive par la droite, vire, traverse la cartouche, sort par le haut vers le condenseur
      const sH = D.courbe([[T[2], 0], [E[2], cum[1]], [E[3], cum[4]], [E[4], cum[7]], [c.A(5, 0.55), cum[9]], [E[5] + 0.3, cum[11]]], t, true), hp = CH.at(sH);
      const hum = t < E[2] ? "surprise" : t < E[3] ? "chaud" : "sourire";
      mila({ x: hp[0], y: hp[1], s: D.courbe([[0, 0.54], [cum[2], 0.54], [cum[3], 0.46], [cum[8], 0.46], [cum[9], 0.54]], sH), t: t, temp: 0.62, etat: "vapeur", humeur: hum, regard: [t < E[3] ? -1 : 0, 0], op: doux(t, T[2] - 0.1, 0.4) * (1 - doux(t, E[5] + 0.1, 0.4)) });
      // k6 : l'huile repart vers le compresseur
      const k6 = D.fenetre(t, T[6] - 0.3, c.D, 0.7);
      op(hu, k6);
      lignes.forEach((e, i) => { const f = D.frac(i / lignes.length + t / 9); pos(e, D.lerp(512, 958, f), 668); e.setAttribute("opacity", D.fenetre(f, 0, 1, 0.05).toFixed(2)); });
      // k7 : la vignette
      op(vig, doux(t, T[7] - 0.1, 0.7));
      // textes
      lVap.place(530, 354, [0, 0], null); op(lVap.g, kv(T[2] + 0.4, E[2] + 0.6));
      lGro.place(540, 530, [536, 522], [470, 520]); op(lGro.g, kv(T[3] + 0.8, E[3] + 0.6));
      lCar.place(40, 336, [0, 0], null); lCar2.place(40, 374, [150, 366], [312, 322]); op(lCar.g, kv(T[4] + 0.4, E[4] + 0.6)); op(lCar2.g, kv(T[4] + 0.4, E[4] + 0.6));
      lCond.place(44, 262, [0, 0], null); lCond2.place(44, 300, [0, 0], null); op(lCond.g, kv(c.A(5, 0.5), E[5] + 1.2)); op(lCond2.g, kv(c.A(5, 0.5), E[5] + 1.2));
      lNap.place(540, 604, [536, 596], [500, 640]); op(lNap.g, kv(T[5] + 0.3, E[5] - 0.2));
      lVoy.place(36, 596, [0, 0], null); lVoy2.place(36, 634, [150, 628], [214, 642]); op(lVoy.g, kv(T[5] + 1.2, E[5] + 0.4)); op(lVoy2.g, kv(T[5] + 1.2, E[5] + 0.4));
      lFil.place(640, 612, [0, 0], null); lRef.place(800, 584, [0, 0], null); lRef2.place(800, 614, [0, 0], null);
      [lFil, lRef, lRef2].forEach(l => op(l.g, kv(c.A(6, 0.35), c.D))); lCmp.place(956, 748, [0, 0], null); op(lCmp.g, kv(T[6] + 0.8, c.D));
      montrer(pas, t);
      return { temp: 0.62, etat: "vapeur", humeur: hum };
    };
  };


})();

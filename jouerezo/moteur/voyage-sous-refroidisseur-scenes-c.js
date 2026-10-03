/* =====================================================================
   voyage-sous-refroidisseur-scenes-c.js — édition « sous-refroidisseur de
   liquide » : l'orifice économiseur, les autres façons, la mesure, le résumé
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (c = { T, E, D, A } ; T[k]/E[k] bornent la phrase k du récit
   donnees/voyage-sous-refroidisseur.js ; maj(t) rend { temp, etat, humeur,
   carte?, diag?, diag0? }). Fonction PURE de t : rien n'est gardé d'une image
   à l'autre. Les gestes sont accrochés au RANG des phrases : ajouter une phrase
   au récit décale tout. Ce fichier ne définit que quatre scènes (orifice,
   autres, mesure, resume) ; les dix autres sont dans -a.js et -b.js.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête x < 760,
   y < 140 ; carte et diagramme à droite, x > 970). Les pastilles se posent à
   y = 742 ; aucun texte sous 28 px.
   AIDE LOCALE vueLongue() : le compresseur à vis en coupe le long des rotors
   (mâle en haut, femelle en bas, aspiration à GAUCHE, refoulement à DROITE),
   recopiée de l'édition vis (moteur/voyage-vis-scenes-c.js, scène « économiseur »)
   — le même dessin que dans -b.js (« les vis »). L'ORIFICE ÉCONOMISEUR (o.eco)
   s'ouvre SOUS la carcasse, au milieu de la compression ; le piquage y arrive
   par un tube cuivre à cœur vert (D.ECO), sans passer par le dessus.
   AUTRES AIDES LOCALES : etiq (étiquette + trait), fleche / flecheVar, poly
   (point d'une ligne brisée), tuyau (tube cuivre à cœur coloré), molV (molécule
   de couleur), organe (symbole posé par son axe), flocon, casquette, cadran,
   thermometre, cote, voyantGros.
   TABLEAUX : une scène enchaîne des tableaux qui se succèdent SANS se
   superposer (l'un s'efface avant que le suivant n'apparaisse : jamais deux
   textes l'un sur l'autre) ; une seule héroïne, déplacée d'un tableau à l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const POL = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const VERT = D.ECO, BLEU = "#2f6fb8", ROUGE = "#c0392b", NUIT = "#10233c", GRIS = "#637285", OR = "#ff6b35", CLAIR = "#f4f8fc";
  const VERT_RGB = "rgb(30,126,84)";
  const LIQ = D.couleur(0.45, false), FROID = D.couleur(0.28, false); // liquide chaud (sortie condenseur), liquide sous-refroidi
  const PI = Math.PI;
  let nid = 0;
  const ident = p => "vsc-" + p + "-" + (++nid);
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => opa(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const f1 = v => v.toFixed(1);
  const pts = a => a.map(p => f1(p[0]) + "," + f1(p[1])).join(" ");
  const rect = (p, x, y, w, h, at) => D.el("rect", Object.assign({ x: x, y: y, width: w, height: h }, at || {}), p);
  const cercle = (p, cx, cy, r, at) => D.el("circle", Object.assign({ cx: cx, cy: cy, r: r }, at || {}), p);
  const ligne = (p, x1, y1, x2, y2, at) => D.el("line", Object.assign({ x1: x1, y1: y1, x2: x2, y2: y2 }, at || {}), p);
  const fond = (t, a, b, du) => D.lisse((t - a) / du) * (1 - D.lisse((t - b) / du)); // fondu entre a et b
  const rgb = s => s.match(/\d+/g).map(Number);
  const melange = (a, b, f) => { const u = rgb(a), v = rgb(b); return "rgb(" + u.map((x, i) => Math.round(D.lerp(x, v[i], D.borne(f, 0, 1)))).join(",") + ")"; };
  const pastille = (p, s, coul, taille) => D.pastille(p, 492, 742, s, coul, taille || 32, "middle");

  /* étiquette (une ou plusieurs lignes) + son trait en pointillés ; rend { g, mv(x2, y2) } (le trait peut suivre une cible) */
  function etiq(parent, x, y, texte, o) {
    o = o || {};
    const g = D.el("g", { opacity: 0 }, parent), taille = o.taille || 32;
    (Array.isArray(texte) ? texte : [texte]).forEach((l, i) => D.etiquette(g, x, y + i * taille * 1.12, l, { "text-anchor": o.ancre || "start", "font-size": taille, fill: o.coul || NUIT, "font-weight": o.gras ? 700 : 600 }));
    const l = o.trait ? D.trait(g, o.trait[0], o.trait[1], o.trait[2], o.trait[3], o.coulTrait) : null;
    return { g: g, mv: (x2, y2) => { if (l) { l.setAttribute("x2", f1(x2)); l.setAttribute("y2", f1(y2)); } } };
  }
  /* flèche pleine : la pointe est en (x2, y2) */
  function fleche(parent, x1, y1, x2, y2, coul, ep) {
    ep = ep || 8;
    const g = D.el("g", {}, parent), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    ligne(g, x1, y1, bx, by, { stroke: coul, "stroke-width": ep, "stroke-linecap": "round" });
    D.el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }
  /* flèche dont les extrémités changent à chaque image → f(x1, y1, x2, y2, opacité) */
  function flecheVar(parent, coul, ep) {
    const g = D.el("g", {}, parent), l = D.el("line", { stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g), h = D.el("polygon", { fill: coul }, g);
    return function (x1, y1, x2, y2, o) {
      const a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, w = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
      l.setAttribute("x1", f1(x1)); l.setAttribute("y1", f1(y1)); l.setAttribute("x2", f1(bx)); l.setAttribute("y2", f1(by));
      h.setAttribute("points", pts([[x2, y2], [bx - w * Math.sin(a), by + w * Math.cos(a)], [bx + w * Math.sin(a), by - w * Math.cos(a)]]));
      g.setAttribute("opacity", D.borne(o, 0, 1).toFixed(2));
    };
  }
  /* point d'une ligne brisée à l'abscisse curviligne s : [x, y, rang du segment] ; f.long = longueur */
  function poly(p) {
    const L = [0];
    for (let i = 1; i < p.length; i++) L.push(L[i - 1] + Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]));
    const f = function (s) {
      s = D.borne(s, 0, L[L.length - 1]);
      let i = 1;
      while (i < L.length - 1 && s > L[i]) i++;
      const u = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [D.lerp(p[i - 1][0], p[i][0], u), D.lerp(p[i - 1][1], p[i][1], u), i - 1];
    };
    f.long = L[L.length - 1];
    return f;
  }
  /* tube cuivre à cœur de couleur (le piquage : cœur vert), suivant une ligne brisée ; l = largeur du cœur */
  function tuyau(parent, route, l, coeur, e) {
    // un tube = trois traits superposés : paroi, reflet de cuivre, cœur ; e = épaisseur de la paroi (9 par défaut)
    e = e || 9;
    const at = { fill: "none", "stroke-linejoin": "round" };
    D.el("polyline", Object.assign({ points: pts(route), stroke: "#8a4a24", "stroke-width": l + 2 * e }, at), parent);
    D.el("polyline", Object.assign({ points: pts(route), stroke: "#d9955f", "stroke-width": l + e }, at), parent);
    return D.el("polyline", Object.assign({ points: pts(route), stroke: coeur || "#cfe8d9", "stroke-width": l }, at), parent);
  }
  /* petite molécule de vapeur d'une couleur à choisir (le piquage est vert) → f(x, y, couleur, opacité) ; (x, y) = le centre */
  function molV(parent) {
    const u = D.el("use", { href: "#vm-mol" }, parent);
    return (x, y, coul, o) => { u.setAttribute("x", f1(x)); u.setAttribute("y", f1(y)); u.setAttribute("fill", coul); u.setAttribute("opacity", (o === undefined ? 1 : D.borne(o, 0, 1)).toFixed(2)); };
  }
  /* un organe (symbole) posé par son point d'axe, comme sur la carte du circuit : (cx, cy) = l'axe, s = échelle, rot = rotation */
  function organe(parent, nom, cx, cy, s, rot) {
    const o = D.ORGANES[nom], [vx, vy, vl, vh] = o.vb, [ax, ay] = o.axe, embarque = window.VOYAGE_SYM_DATA && window.VOYAGE_SYM_DATA[o.f];
    const g = D.el("g", { transform: "translate(" + cx + " " + cy + ") rotate(" + (rot || 0) + ") scale(" + s + ") translate(" + (-ax) + " " + (-ay) + ")" }, parent);
    D.el("image", { href: embarque || D.SYM + o.f + ".svg", x: vx, y: vy, width: vl, height: vh }, g);
    return g;
  }
  /* un flocon : six branches, deux barbes par branche */
  function flocon(parent, cx, cy, r, coul, ep) {
    const g = D.el("g", { transform: "translate(" + cx + " " + cy + ")", stroke: coul, "stroke-width": ep, "stroke-linecap": "round", fill: "none" }, parent);
    for (let k = 0; k < 6; k++) {
      const a = k * PI / 3, c = Math.cos(a), s = Math.sin(a);
      ligne(g, 0, 0, r * c, r * s);
      [0.45, 0.72].forEach(u => [-1, 1].forEach(m => ligne(g, u * r * c, u * r * s, u * r * c + 0.28 * r * Math.cos(a + m * 0.9), u * r * s + 0.28 * r * Math.sin(a + m * 0.9))));
    }
    return g;
  }

  /* =====================================================================
     LA VUE LONGUE — le compresseur à vis en coupe le long des rotors
     Recopiée de moteur/voyage-vis-scenes-c.js (édition vis ; le même dessin sert dans -b.js, scène « les vis »).
     Repère LOCAL : x 20 → 740, y −34 → 292 (aspiration à gauche, refoulement à droite, mâle en haut, femelle en bas) ;
     l'ORIFICE ÉCONOMISEUR (o.eco) s'ouvre sous la carcasse, à x = G.xEco, au milieu de la compression.
     ===================================================================== */
  const G = { xI0: 212, xI1: 660, yH: 26, yB: 236, yM: 84, yF: 178, yV: 131, pas: 70, lobe: 36, pente: 0.55, xA: 300, Wmax: 120, Wmin: 40, xAsp: [215, 322], xEco: 520 };
  G.poche = u => ({ xL: G.xA + u * (G.xI1 - G.Wmin - G.xA), W: D.lerp(G.Wmax, G.Wmin, u) }); // u : 0 = alvéole juste fermée, 1 = au refoulement
  const chev = (xL, W) => { const d = G.pente * 87; return pts([[xL + d, 44], [xL + d + W, 44], [xL + W, G.yV], [xL + d + W, 218], [xL + d, 218], [xL, G.yV]]); };
  function bande(parent, o) { // o : { x, y, w, h, yRef, sens (−1 : lobes en « / », +1 : en « \ »), decal, fond } → maj(phase)
    const cid = "vcb" + (++nid), g = D.el("g", {}, parent);
    rect(D.el("clipPath", { id: cid }, g), o.x, o.y, o.w, o.h);
    const c = D.el("g", { "clip-path": "url(#" + cid + ")" }, g), ext = Math.abs(G.pente * o.h) + G.pas;
    rect(c, o.x, o.y, o.w, o.h, { fill: o.fond || "#5d6975" });
    const lobes = D.el("g", {}, c);
    for (let j = Math.floor((o.x - ext - G.pas - G.xA) / G.pas); G.xA + j * G.pas < o.x + o.w + ext; j++)
      rect(lobes, G.xA + j * G.pas + (o.decal || 0), o.y, G.lobe, o.h, { fill: "url(#vm-acier-h)", stroke: "#3d4650", "stroke-width": 1.5 });
    const ang = (o.sens * Math.atan(G.pente) * 180 / Math.PI).toFixed(2);
    return function (phase) {
      const dx = ((phase % G.pas) + G.pas) % G.pas;
      lobes.setAttribute("transform", "translate(" + dx.toFixed(2) + " 0) translate(0 " + o.yRef + ") skewX(" + ang + ") translate(0 " + (-o.yRef) + ")");
    };
  }

  /* ---------- le compresseur à vis en coupe le long des rotors ----------
     Repère LOCAL : x 20 → 740, y −34 → 292 (aspiration à gauche, refoulement à droite). o : { x, y, k, eco, nmol }.
     Rend { g, k, pt(lx, ly) → écran, fond, dedans, devant, mur(x, y, l, h), fonte, hach, maj(p) }.
     maj(p) : { t, phase (déplacement des lobes, px locaux), alv: { xL, W, ouverte, halo, op, nmol },
                heroine: { s, temp, etat, humeur, ecrase, regard, dx, dy, op } } */
  function vueLongue(parent, o) {
    const k = o.k || 1, uid = "vcl" + (++nid);
    const g = D.el("g", { transform: "translate(" + o.x + " " + o.y + ") scale(" + k + ")" }, parent);
    const defs = D.el("defs", {}, g);
    const gf = D.el("linearGradient", { id: uid + "f", x1: 0, y1: 0, x2: 0, y2: 1 }, defs); // fonte grise
    [[0, "#dfe2e6"], [0.5, "#b4bac1"], [1, "#8e959d"]].forEach(([f, cc]) => D.el("stop", { offset: f, "stop-color": cc }, gf));
    const ph = D.el("pattern", { id: uid + "h", width: 9, height: 9, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs); // hachures de coupe
    D.el("line", { x1: 0, y1: 0, x2: 0, y2: 9, stroke: "#4f565e", "stroke-width": 2, opacity: 0.8 }, ph);
    rect(D.el("clipPath", { id: uid + "c" }, defs), G.xI0, G.yH, G.xI1 - G.xI0, G.yB - G.yH);
    const fond = D.el("g", {}, g), rotG = D.el("g", {}, g), alvG = D.el("g", { "clip-path": "url(#" + uid + "c)" }, g), dedans = D.el("g", {}, g),
      moteur = D.el("g", {}, g), murs = D.el("g", {}, g), devant = D.el("g", {}, g);
    // les chambres (le gaz y circule) : moteur, galerie d'aspiration, vis, fenêtre de refoulement
    [[46, 26, 144, 124], [100, 0, 90, 26], [100, -20, 222, 20], [215, 0, 107, 26], [G.xI0, G.yH, G.xI1 - G.xI0, G.yB - G.yH], [660, 100, 80, 66]].forEach(([x, y, w, h]) => rect(fond, x, y, w, h, { fill: CLAIR }));
    if (o.eco) rect(fond, G.xEco - 28, 236, 56, 56, { fill: CLAIR });
    // les deux vis : mâle en haut (lobes bombés), femelle en bas (creux), lobes en diagonale opposée
    const mM = bande(rotG, { x: G.xI0, y: G.yH, w: G.xI1 - G.xI0, h: G.yV - G.yH, yRef: G.yV, sens: -1 });
    const mF = bande(rotG, { x: G.xI0, y: G.yV, w: G.xI1 - G.xI0, h: G.yB - G.yV, yRef: G.yV, sens: 1, decal: G.pas / 2, fond: "#667380" });
    D.el("line", { x1: G.xI0, x2: G.xI1, y1: G.yV, y2: G.yV, stroke: "#2c343d", "stroke-width": 2 }, rotG);
    // l'alvéole : zone claire bordée d'orange, avec des voisines (vapeur) et l'héroïne dedans
    const halo = D.el("polygon", { fill: "none", stroke: D.ORANGE, "stroke-width": 15, "stroke-linejoin": "round", opacity: 0 }, alvG);
    const poche = D.el("polygon", { fill: "#fff", "fill-opacity": 0.62, stroke: D.ORANGE, "stroke-width": 5, "stroke-linejoin": "round", opacity: 0 }, alvG);
    const nm = o.nm || 7, ra = D.alea(7), VM = [];
    for (let i = 0; i < nm; i++) VM.push({ fx: 0.14 + 0.72 * ra(), dy: (i % 2 ? 1 : -1) * (34 + 56 * ra()), ph: ra() * 6.28, maj: D.mol(dedans) });
    const mila = D.heroine(dedans, { r: 30 });
    // le moteur (bobinages de cuivre, rotor d'acier) et son arbre, sur l'axe du mâle ; la grille du filtre d'aspiration
    [[62, 30], [62, 108]].forEach(([x, y]) => {
      rect(moteur, x, y, 112, 30, { rx: 7, fill: "url(#vm-cuivre)", stroke: "#5a2c10", "stroke-width": 2 });
      for (let i = 0; i < 12; i++) D.el("line", { x1: x + 8 + i * 8.8, y1: y + 4, x2: x + 8 + i * 8.8, y2: y + 26, stroke: "#5a2c10", "stroke-width": 1.6, opacity: 0.5 }, moteur);
    });
    rect(moteur, 76, 66, 98, 36, { fill: "url(#vm-acier)", stroke: "#3d4650", "stroke-width": 2 });
    rect(moteur, 170, 77, 80, 14, { fill: "url(#vm-acier)", stroke: "#3d4650", "stroke-width": 2 });
    rect(moteur, 22, 50, 24, 70, { fill: "#e6edf4", stroke: "#56636f", "stroke-width": 2 });
    for (let i = 1; i < 6; i++) D.el("line", { x1: 22, x2: 46, y1: 50 + i * 11.7, y2: 50 + i * 11.7, stroke: "#8493a3", "stroke-width": 1.4 }, moteur);
    for (let i = 1; i < 4; i++) D.el("line", { x1: 22 + i * 6, x2: 22 + i * 6, y1: 50, y2: 120, stroke: "#8493a3", "stroke-width": 1.4 }, moteur);
    // la carcasse : fonte grise coupée (dégradé + hachures)
    const mur = (x, y, w, h) => { rect(murs, x, y, w, h, { fill: "url(#" + uid + "f)" }); rect(murs, x, y, w, h, { fill: "url(#" + uid + "h)", stroke: "#3b4249", "stroke-width": 2.5 }); };
    [[20, 0, 80, 26], [190, 0, 25, 26], [322, 0, 368, 26], [88, -34, 246, 14], [88, -20, 12, 20], [322, -20, 12, 20], // dessus + galerie d'aspiration
      [20, 26, 26, 24], [20, 120, 26, 30], [20, 150, 192, 26], [190, 26, 22, 51], [190, 91, 22, 145], // moteur et cloison
      [660, 26, 30, 74], [660, 166, 30, 70], [690, 84, 50, 16], [690, 166, 50, 16] // fond côté refoulement, tube de refoulement
    ].forEach(a => mur(...a));
    if (o.eco) [[190, 236, G.xEco - 28 - 190, 26], [G.xEco + 28, 236, 690 - G.xEco - 28, 26], [G.xEco - 40, 262, 12, 30], [G.xEco + 28, 262, 12, 30]].forEach(a => mur(...a));
    else mur(190, 236, 500, 26);
    return {
      g: g, k: k, fond: fond, dedans: dedans, devant: devant, mur: mur, fonte: "url(#" + uid + "f)", hach: "url(#" + uid + "h)",
      pt: (x, y) => [o.x + x * k, o.y + y * k],
      maj: function (p) {
        const t = p.t || 0, a = p.alv;
        mM(p.phase || 0); mF(p.phase || 0);
        if (!a || a.op === 0) {
          [poche, halo].forEach(e => e.setAttribute("opacity", 0));
          VM.forEach(m => m.maj(-999, -999, 0.5, true, 0));
          mila({ x: -999, y: -999, s: 0.1, t: t, op: 0 });
          return;
        }
        const P = chev(a.xL, a.W), vis = a.op === undefined ? 1 : a.op;
        poche.setAttribute("points", P); halo.setAttribute("points", P);
        poche.setAttribute("opacity", vis.toFixed(2)); halo.setAttribute("opacity", ((a.halo || 0) * vis).toFixed(2));
        poche.setAttribute("stroke-dasharray", a.ouverte ? "16 10" : "none");
        const n = a.nmol === undefined ? nm : a.nmol, tm = a.temp === undefined ? 0.2 : a.temp;
        VM.forEach((m, i) => {
          const y = G.yV + m.dy + Math.sin(t * 2.3 + m.ph) * 4, x = a.xL + G.pente * Math.abs(y - G.yV) + m.fx * a.W + Math.cos(t * 1.9 + m.ph) * 4;
          m.maj(x, y, tm, true, D.borne(n - i, 0, 1) * vis);
        });
        const h = p.heroine;
        if (h) mila({ x: a.xL + a.W / 2 + (h.dx || 0), y: G.yV + (h.dy || 0), s: h.s === undefined ? 0.62 : h.s, t: t, temp: h.temp, etat: h.etat || "vapeur", humeur: h.humeur, ecrase: h.ecrase, regard: h.regard, op: (h.op === undefined ? 1 : h.op) * (a.opH === undefined ? vis : a.opH) });
        else mila({ x: -999, y: -999, s: 0.1, t: t, op: 0 });
      }
    };
  }

  /* =====================================================================
     10 · L'ORIFICE ÉCONOMISEUR
     k0 : la ligne de l'économiseur, de la sortie de l'échangeur au flanc du compresseur (symboles) ;
     k1 : la vue longue, l'orifice s'ouvre sur une alvéole déjà fermée, la molécule y entre ;
     k2 : elle y retrouve la vapeur de l'évaporateur, on se mélange ;
     k3 : deux flèches de compression (BP → HP, pression intermédiaire → HP) ;
     k4 : deux jauges (énergie au moteur, froid produit) ; k5 : la chambre de congélation, l'écart de pression.
     ===================================================================== */
  S.orifice = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const gA = D.el("g", {}, g), gB = D.el("g", { opacity: 0 }, g), gC = D.el("g", { opacity: 0 }, g), gD = D.el("g", { opacity: 0 }, g), gE = D.el("g", { opacity: 0 }, g);
    const dessus = D.el("g", {}, g);

    /* ---------- tableau A (k0) : la ligne de l'économiseur ---------- */
    D.image(gA, "sousRefroidisseur", 40, 370, 210, 210);
    D.image(gA, "compresseur", 590, 360, 340, 272);
    const RA = [[203, 396], [203, 250], [750, 250], [750, 398]], PA = poly(RA);
    tuyau(gA, RA, 36);
    D.etiquette(gA, 476, 204, "ligne de l'économiseur", { "text-anchor": "middle" });
    D.etiquette(gA, 30, 612, "sous-refroidisseur", { "font-weight": 700, fill: BLEU });
    D.etiquette(gA, 760, 650, "compresseur à vis", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    const flotA = [];
    for (let i = 0; i < 8; i++) flotA.push(molV(dessus));

    /* ---------- tableau B (k1-k2) : la vue longue et l'orifice, sous la carcasse ---------- */
    const V = vueLongue(gB, { x: 40, y: 197, k: 1.1, eco: true, nm: 6 });
    const XOs = V.pt(G.xEco, 0)[0], YBore = V.pt(0, 292)[1], YIn = V.pt(0, 250)[1]; // l'orifice : abscisse, bas du perçage, entrée dans la chambre (écran)
    const RB2 = [[26, 662], [XOs, 662], [XOs, YBore]];
    tuyau(gB, RB2, 32);
    const RB = [[40, 662], [XOs, 662], [XOs, YIn]], PB = poly(RB);
    const eOr = etiq(gB, XOs + 44, 640, ["orifice", "économiseur"], { coul: VERT, gras: true });
    const eAlv = etiq(gB, 790, 560, "alvéole fermée", { ancre: "middle", coul: OR, gras: true, trait: [790, 528, 560, 330], coulTrait: OR });
    const eEv = etiq(gB, 790, 556, ["vapeur de", "l'évaporateur"], { ancre: "middle", coul: BLEU, gras: true, trait: [790, 524, 560, 330], coulTrait: BLEU });
    const eGr = etiq(gB, 250, 560, "vapeur du piquage", { ancre: "middle", coul: VERT, gras: true, trait: [250, 530, 480, 400], coulTrait: VERT });
    const pB1 = pastille(gB, "au milieu de la compression", BLEU), pB2 = pastille(gB, "on se mélange", VERT);
    // les molécules du piquage (vertes) entrent par l'orifice ; celles de l'évaporateur sont déjà dans l'alvéole (VM de la vue)
    const GR = [{ fx: 0.25, dy: -62 }, { fx: 0.6, dy: 44 }, { fx: 0.4, dy: -34 }, { fx: 0.7, dy: 70 }, { fx: 0.3, dy: 30 }, { fx: 0.8, dy: -56 }].map((q, i) => Object.assign(q, { ph: i * 2.3 + 1, te: T[1] + 0.7 + i * 0.9, maj: molV(dessus) }));
    const uAlv = t => D.courbe([[T[1] - 0.5, 0.3], [E[2], 0.46]], t, true); // l'alvéole avance lentement : elle reste devant l'orifice pendant k1-k2

    /* ---------- tableau C (k3) : deux flèches de compression ---------- */
    const YH = 195, YP = 372, YB = 545, XA1 = 420, XA2 = 720;
    [[YH, "HP", D.ORANGE, ["HP"]], [YP, "Pi", VERT, ["pression", "intermédiaire"]], [YB, "BP", D.BLEU, ["BP"]]].forEach(([y, , coul, noms]) => {
      ligne(gC, 270, y, 945, y, { stroke: coul, "stroke-width": 3, "stroke-dasharray": "10 8", opacity: 0.85 });
      noms.forEach((n, i) => D.etiquette(gC, 40, y - 10 - (noms.length - 1 - i) * 36, n, { "font-weight": 700, fill: coul }));
    });
    const gid = ident("gr"), gr = D.el("linearGradient", { id: gid, x1: 0, y1: YB, x2: 0, y2: YH, gradientUnits: "userSpaceOnUse" }, gC);
    [[0, D.BLEU], [1, D.ORANGE]].forEach(([k, cc]) => D.el("stop", { offset: k, "stop-color": cc }, gr));
    const longue = flecheVar(gC, "url(#" + gid + ")", 14), courte = flecheVar(gC, VERT, 14);
    const evite = ligne(gC, XA2, YB, XA2, YP + 6, { stroke: "#9aa7b5", "stroke-width": 8, "stroke-dasharray": "3 14", "stroke-linecap": "round", opacity: 0 });
    const eLong = etiq(gC, XA1, 605, ["vapeur de", "l'évaporateur", "de BP à HP"], { ancre: "middle", coul: NUIT, gras: true });
    const eCourt = etiq(gC, XA2, 605, ["moi : de la pression", "intermédiaire à HP"], { ancre: "middle", coul: VERT, gras: true });
    const pC = pastille(gC, "moins de travail", VERT);
    const MC = [0, 1, 2, 3].map(i => ({ ph: i / 4, dx: i % 2 ? 30 : -30, maj: D.mol(dessus) }));

    /* ---------- tableau D (k4) : deux jauges, sans chiffre ---------- */
    const GY0 = 215, GY1 = 555, XG1 = 300, XG2 = 650, NIV0 = 0.4;
    const yNiv = v => GY1 - 10 - v * (GY1 - GY0 - 20);
    const jauges = [[XG1, OR, "énergie au moteur", 0.52], [XG2, BLEU, "froid produit", 0.82]].map(([x, coul, nom, fin]) => {
      const cid = ident("jg"), cl = D.el("clipPath", { id: cid }, gD);
      rect(cl, x - 24, GY0 + 4, 48, GY1 - GY0 - 8, { rx: 24 });
      rect(gD, x - 28, GY0, 56, GY1 - GY0, { rx: 28, fill: "#fff", stroke: NUIT, "stroke-width": 5 });
      const niv = rect(D.el("g", { "clip-path": "url(#" + cid + ")" }, gD), x - 24, 0, 48, 0, { fill: coul });
      ligne(gD, x - 44, yNiv(NIV0), x + 44, yNiv(NIV0), { stroke: GRIS, "stroke-width": 4, "stroke-dasharray": "8 6" });
      D.etiquette(gD, x + 52, yNiv(NIV0) + 10, "avant", { "font-size": 28, fill: GRIS, "font-weight": 700 });
      D.etiquette(gD, x, 612, nom, { "text-anchor": "middle", "font-weight": 700, fill: coul === OR ? D.ORANGE : BLEU });
      const fl = flecheVar(gD, coul, 10);
      return { x: x, coul: coul, niv: niv, fin: fin, fl: fl };
    });
    { // le moteur (cercle M) et le flocon, au-dessus des jauges
      cercle(gD, XG1, 178, 24, { fill: "#fff", stroke: NUIT, "stroke-width": 4 });
      D.texte(gD, XG1, 190, "M", { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: NUIT, "font-family": TITRE });
      flocon(gD, XG2, 178, 26, BLEU, 4);
    }

    /* ---------- tableau E (k5) : la chambre de congélation et l'écart de pression ---------- */
    { // la chambre : panneaux isolants, givre, flocon
      rect(gE, 40, 220, 360, 330, { rx: 14, fill: "#cfdbe8", stroke: NUIT, "stroke-width": 5 });
      rect(gE, 62, 242, 316, 286, { rx: 6, fill: "#eef8ff", stroke: "#8fb3d6", "stroke-width": 3 });
      rect(gE, 316, 332, 40, 196, { fill: "#dbe9f6", stroke: "#8fb3d6", "stroke-width": 3 }); // la porte
      cercle(gE, 330, 440, 6, { fill: NUIT });
      flocon(gE, 190, 385, 66, "#6aa6dc", 6);
      [[96, 276], [338, 276], [96, 496], [286, 496]].forEach(([x, y], i) => flocon(gE, x, y, 20, "#8fb3d6", 3));
      D.etiquette(gE, 220, 604, "chambre de", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
      D.etiquette(gE, 220, 640, "congélation", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    }
    ligne(gE, 540, 240, 940, 240, { stroke: D.ORANGE, "stroke-width": 12, "stroke-linecap": "round" });
    ligne(gE, 540, 600, 940, 600, { stroke: D.BLEU, "stroke-width": 12, "stroke-linecap": "round" });
    D.etiquette(gE, 540, 222, "HP", { "font-weight": 700, fill: D.ORANGE });
    D.etiquette(gE, 540, 646, "BP", { "font-weight": 700, fill: D.BLEU });
    const ecart = D.el("g", {}, gE);
    fleche(ecart, 740, 396, 740, 262, D.ORANGE, 10); fleche(ecart, 740, 444, 740, 578, D.BLEU, 10);
    D.etiquette(ecart, 774, 430, "grand écart", { "font-weight": 700, fill: NUIT });
    const pE = pastille(gE, "surtout quand l'écart est grand", D.ORANGE);

    /* ---------- l'héroïne (une seule, d'un tableau à l'autre) ---------- */
    const mila = D.heroine(dessus, { r: 30 });
    const tempOr = t => D.courbe([[T[0], 0.28], [A(2, 0.3), 0.28], [E[2], 0.4], [T[3], 0.4], [E[4], 0.62], [DUR, 0.62]], t, true);

    return function (t) {
      const temp = tempOr(t);
      let humeur = "sourire";
      // ----- les tableaux se succèdent : l'un s'efface avant que le suivant n'apparaisse (jamais deux textes superposés) -----
      const tB0 = E[0] + 0.3, tB1 = E[2] + 0.2, tC0 = E[2] + 0.3, tC1 = E[3] + 0.25, tD0 = E[3] + 0.3, tD1 = E[4] + 0.25, tE0 = E[4] + 0.3;
      const seq = (a, b) => D.lisse((t - a) / 0.35) * (1 - D.lisse((t - (b - 0.3)) / 0.3));
      const oA = 1 - D.lisse((t - (E[0] - 0.05)) / 0.3), oB = seq(tB0, tB1), oC = seq(tC0, tC1), oD = seq(tD0, tD1), oE = D.lisse((t - tE0) / 0.35);
      opa(gA, oA); opa(gB, oB); opa(gC, oC); opa(gD, oD); opa(gE, oE);

      // ----- A : la vapeur du piquage file dans la ligne, l'héroïne avec elle -----
      flotA.forEach((m, i) => {
        const s = ((t * 120 + i * PA.long / flotA.length) % PA.long), [x, y] = PA(s);
        m(x, y, VERT, D.borne(Math.min(s - 10, PA.long - 12 - s) / 30, 0, 1) * oA);
      });

      // ----- B : l'alvéole, les molécules, l'héroïne -----
      const pc = G.poche(uAlv(t));
      const mixe = D.lisse((t - A(2, 0.25)) / 3.4);
      V.maj({ t: t, phase: 9 * t, alv: { xL: pc.xL, W: pc.W, temp: D.lerp(0.2, 0.4, mixe), nmol: 6, halo: 0.5 * (0.65 + 0.35 * Math.sin(t * 5)) * D.fenetre(t, T[1], E[1] + 1, 0.5) } });
      const slot = (q, amp) => { const y = G.yV + q.dy + Math.cos(t * 1.3 + q.ph) * amp; return V.pt(pc.xL + G.pente * Math.abs(y - G.yV) + q.fx * pc.W + Math.sin(t * 1.7 + q.ph) * amp, y); };
      GR.forEach(q => {
        const L = PB.long, v = 150, dt = t - q.te, s = D.borne(dt * v, 0, L), arrive = D.lisse((dt - L / v) / 1.4);
        const [px, py] = PB(s), [sx, sy] = slot(q, 3 + 7 * mixe);
        q.maj(D.lerp(px, sx, arrive), D.lerp(py, sy, arrive), melange(VERT_RGB, D.couleur(0.4, true), mixe), dt < 0 ? 0 : oB);
      });

      // ----- l'héroïne : dans la ligne (A), le long du tube puis dans l'alvéole (B), sur les flèches (C), entre les jauges (D), près des pressions (E) -----
      let hx, hy, hs, hop, hecr = 0, reg = [1, 0];
      const etat = "vapeur";
      if (t < tB0 - 0.02) { // A
        const [ax, ay] = PA(D.courbe([[T[0] + 0.15, 0], [E[0] - 0.05, PA.long]], t, true));
        hx = ax; hy = ay; hs = 0.42; hecr = 0.1; reg = [1, 0.3]; hop = oA;
      } else if (t < tC0 - 0.02) { // B
        const sB = D.courbe([[tB0 + 0.1, 0], [A(1, 0.7), PB.long]], t, true), [bx, by] = PB(sB);
        const entre = D.lisse((t - A(1, 0.72)) / 1.5), [ix, iy] = slot({ fx: 0.45, dy: 10, ph: 0 }, 3);
        hx = D.lerp(bx, ix, entre); hy = D.lerp(by, iy, entre); hs = D.lerp(0.38, 0.6, entre); hecr = D.lerp(0.1, 0.25, entre);
        reg = entre < 0.5 ? [0.2, -1] : [1, 0.1]; hop = oB;
        if (t > A(1, 0.7) && t < E[1] + 0.8) humeur = "surprise";
      } else if (t < tD0 - 0.02) { // C : elle monte sur la flèche courte
        const gc = D.lisse((t - A(3, 0.14)) / 1.8);
        hx = XA2 + 46; hy = D.lerp(YP, YH + 40, gc); hs = 0.55; hecr = 0.1 + 0.4 * gc; reg = [0, -1]; hop = oC * D.lisse((t - (tC0 + 0.3)) / 0.4);
      } else if (t < tE0 - 0.02) { // D : entre les deux jauges
        hx = 475; hy = 396; hs = 1.0; reg = [t < A(4, 0.45) ? -1 : 1, 0]; hop = oD * D.lisse((t - (tD0 + 0.3)) / 0.4);
        if (t > A(4, 0.55)) humeur = "chaud";
      } else { // E : près des deux niveaux de pression
        hx = 862; hy = 520; hs = 0.9; reg = [-1, 0]; hop = oE; humeur = "chaud";
      }
      // C : les flèches de compression, les molécules qui montent ; D : les jauges
      const gc2 = D.lisse((t - A(3, 0.14)) / 1.8), gm = D.lisse((t - (T[3] + 0.2)) / 1.4);
      longue(XA1, YB, XA1, D.lerp(YB, YH + 8, gm), gm > 0.01 ? 1 : 0);
      courte(XA2, YP, XA2, D.lerp(YP, YH + 8, gc2), gc2 > 0.01 ? 1 : 0);
      MC.forEach(q => { const f = D.frac(t * 0.22 + q.ph), y = D.lerp(YB - 14, YH + 36, f); q.maj(XA1 + q.dx, y, D.lerp(0.2, 0.62, f), true, gm * D.fenetre(f, 0, 1, 0.15) * oC); });
      opa(evite, D.lisse((t - A(3, 0.45)) / 0.5));
      jauges.forEach((j, i) => {
        const v = D.lerp(NIV0, j.fin, D.lisse((t - (i ? A(4, 0.42) : T[4] + 0.5)) / 2.2));
        j.niv.setAttribute("y", f1(yNiv(v))); j.niv.setAttribute("height", f1(GY1 - yNiv(v)));
        j.fl(j.x - 62, yNiv(NIV0), j.x - 62, yNiv(v), v > NIV0 + 0.02 ? 1 : 0);
      });
      mila({ x: hx, y: hy, s: hs, t: t, temp: temp, etat: etat, humeur: humeur, regard: reg, ecrase: hecr, op: hop });

      // ----- étiquettes et pastilles -----
      fen(eOr.g, t, T[1] + 0.3, E[2] + 0.2);
      fen(eAlv.g, t, A(1, 0.5), T[2] + 0.3);
      fen(eEv.g, t, A(2, 0.1), A(2, 0.8)); fen(eGr.g, t, A(2, 0.1), A(2, 0.8));
      fen(pB1, t, A(1, 0.2), E[1] + 0.5); fen(pB2, t, A(2, 0.45), E[2] + 0.1);
      fen(eLong.g, t, T[3] + 0.3, E[3] + 0.1); fen(eCourt.g, t, A(3, 0.2), E[3] + 0.1);
      fen(pC, t, A(3, 0.72), E[3] + 0.1);
      fen(pE, t, A(5, 0.2), DUR + 1);

      const cAlv = V.pt(pc.xL + 0.5 * pc.W, G.yV + 30), pEv = V.pt(pc.xL + 0.8 * pc.W + 30, G.yV + 55), pGr = slot(GR[1], 3);
      eAlv.mv(cAlv[0], cAlv[1]); eEv.mv(pEv[0], pEv[1]); eGr.mv(pGr[0], pGr[1]);

      // ----- ce que le théâtre lit : la carte et le diagramme -----
      const carte = t < T[1] - 0.1 ? 103 + D.lisse((t - T[0]) / (E[0] - T[0])) : 3.5 + 0.4 * D.lisse((t - T[1]) / (DUR - T[1]));
      const diag = D.courbe([[T[0], 13], [T[1], 13], [E[2], 14], [T[3], 14], [E[4], 15], [DUR, 15]], t, true);
      return { temp: temp, etat: etat, humeur: humeur, carte: carte, diag: diag, diag0: 13 };
    };
  };

  /* =====================================================================
     11 · D'AUTRES FAÇONS DE SOUS-REFROIDIR (pas de carte, pas de diagramme)
     Quatre cartes en grille 2 × 2 (x 24 → 958, y 150 → 698), qui s'allument une à une :
     k0 : l'héroïne et son point d'interrogation ; k1 : échangeur liquide-aspiration ; k2 : sous-refroidisseur
     à eau ; k3 : sous-refroidissement mécanique ; k4-k5 : économiseur à bouteille (la vapeur part au
     compresseur, le liquide refroidi sort du bas) ; k6 : les quatre cartes ensemble.
     L'héroïne se range au croisement des quatre cartes (l'écart de 70 px la laisse entre elles).
     ===================================================================== */
  S.autres = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const W = 433, H = 262, POS = [[24, 150], [525, 150], [24, 436], [525, 436]];
    const TITRES = [["échangeur", "liquide-aspiration"], ["sous-refroidisseur", "à eau"], ["sous-refroidissement", "mécanique"], ["économiseur", "à bouteille"]];
    const cartes = POS.map(([x, y], i) => {
      const g0 = D.el("g", { opacity: 0 }, g), gg = D.el("g", { transform: "translate(" + x + " " + y + ")" }, g0);
      const cadre = rect(gg, 0, 0, W, H, { rx: 20, fill: "#fffdf8", stroke: BLEU, "stroke-width": 3 });
      TITRES[i].forEach((l, j) => D.etiquette(gg, 18, 40 + j * 34, l, { "font-size": 30, "font-weight": 700, fill: BLEU }));
      return { g: g0, k: gg, cadre: cadre };
    });
    const pied = (k, s, coul, x) => { const e = D.etiquette(D.el("g", { opacity: 0 }, k), x === undefined ? W / 2 : x, 250, s, { "text-anchor": x === undefined ? "middle" : "start", "font-size": 28, "font-weight": 700, fill: coul }); return e.parentNode; };
    const gout = (k, coul) => D.el("path", { d: "M 0 -9 Q 7 2 0 7 Q -7 2 0 -9 Z", fill: "#8fc3f0", stroke: coul || BLEU, "stroke-width": 1.5 }, k);

    /* ----- carte 1 : l'échangeur liquide-aspiration ----- */
    const c1 = (() => {
      const k = cartes[0].k;
      D.tube(k, 20, 96, 282, 52, "cuivre", false, LIQ);
      const refl = D.courant(k, 30, 292, 106, 138, 5, 11);
      D.tube(k, 20, 148, 334, 52, "cuivre", false, "#eaf2fb");
      D.el("polygon", { points: "300,110 324,122 300,134", fill: D.ORANGE }, k);
      const fl = [70, 140, 210].map(x => fleche(k, x, 120, x, 172, "#e2662c", 6));
      const mols = [0, 1, 2, 3, 4].map(i => ({ ph: i / 5, maj: D.mol(k) }));
      D.image(k, "compresseur", 340, 144, 80, 64);
      // le thermomètre de la vapeur aspirée, au-dessus du compresseur
      rect(k, 372, 90, 16, 46, { rx: 8, fill: "#fff", stroke: BLEU, "stroke-width": 3 });
      const merc = rect(k, 376, 130, 8, 0, { fill: "#d64530" });
      cercle(k, 380, 140, 9, { fill: "#d64530", stroke: BLEU, "stroke-width": 2.5 });
      const p = pied(k, "vapeur aspirée plus chaude", D.ORANGE);
      return function (t, lit) {
        refl(t, 40);
        fl.forEach((e, i) => opa(e, 0.55 + 0.45 * Math.sin(t * 3 + i * 1.3)));
        mols.forEach(m => { const f = D.frac(t * 0.1 + m.ph), x = D.lerp(34, 340, f); m.maj(x, 174 + Math.sin(t * 2 + m.ph * 9) * 6, D.lerp(0.1, 0.34, f), true, D.fenetre(f, 0, 1, 0.08)); });
        const v = D.lerp(0.15, 0.95, D.lisse((t - lit) / 3.5));
        merc.setAttribute("y", f1(134 - v * 40)); merc.setAttribute("height", f1(v * 40 + 4));
        opa(p, D.lisse((t - (lit + 2.6)) / 0.5));
      };
    })();

    /* ----- carte 2 : le sous-refroidisseur à eau ----- */
    const c2 = (() => {
      const k = cartes[1].k;
      const eau = D.couleur(0.2, false), eau2 = D.couleur(0.3, false);
      const RE = [[20, 206], [186, 206]], RS = [[251, 108], [419, 108]], RL1 = [[20, 108], [186, 108]], RL2 = [[251, 206], [419, 206]];
      tuyau(k, RL1, 12, LIQ); tuyau(k, RL2, 12, FROID); tuyau(k, RE, 12, "#bfe0f7"); tuyau(k, RS, 12, "#a9d3ee");
      D.image(k, "sousRefroidisseur", 150, 92, 130, 130);
      const GE = [0, 1, 2].map(i => ({ ph: i / 3, e: gout(k) })), GS = [0, 1, 2].map(i => ({ ph: i / 3, e: gout(k) }));
      const refl = [D.courant(k, 30, 176, 100, 116, 3, 21), D.courant(k, 261, 410, 198, 214, 3, 22)];
      D.el("polygon", { points: "390,96 414,108 390,120", fill: "#5aa5d6" }, k);
      D.el("polygon", { points: "30,194 54,206 30,218", fill: "#5aa5d6" }, k);
      D.el("polygon", { points: "30,96 54,108 30,120", fill: D.ORANGE }, k);
      D.el("polygon", { points: "390,194 414,206 390,218", fill: "#3d6fa3" }, k);
      const p = pied(k, "eau fraîche", BLEU, 20);
      return function (t, lit) {
        refl.forEach(r => r(t, 40));
        GE.forEach(q => { const f = D.frac(t * 0.28 + q.ph); q.e.setAttribute("transform", "translate(" + f1(D.lerp(34, 176, f)) + " 206)"); q.e.setAttribute("opacity", D.fenetre(f, 0, 1, 0.12).toFixed(2)); });
        GS.forEach(q => { const f = D.frac(t * 0.28 + q.ph + 0.2); q.e.setAttribute("transform", "translate(" + f1(D.lerp(262, 404, f)) + " 108)"); q.e.setAttribute("opacity", D.fenetre(f, 0, 1, 0.12).toFixed(2)); });
        opa(p, D.lisse((t - (lit + 0.8)) / 0.5));
      };
    })();

    /* ----- carte 3 : le sous-refroidissement mécanique ----- */
    const c3 = (() => {
      const k = cartes[2].k, gid = ident("lq3");
      const gr = D.el("linearGradient", { id: gid, x1: 20, y1: 0, x2: 420, y2: 0, gradientUnits: "userSpaceOnUse" }, k);
      [[0, LIQ], [0.22, LIQ], [0.7, FROID], [1, FROID]].forEach(([o, cc]) => D.el("stop", { offset: o, "stop-color": cc }, gr));
      rect(k, 100, 140, 190, 76, { rx: 12, fill: "#dcecfb", stroke: BLEU, "stroke-width": 5 }); // l'évaporateur de la petite machine
      D.tube(k, 20, 156, 400, 44, "cuivre", false, "url(#" + gid + ")");
      const refl = D.courant(k, 30, 410, 166, 190, 6, 31);
      for (let x = 112; x < 284; x += 26) ligne(k, x, 142, x + 16, 214, { stroke: BLEU, "stroke-width": 4, opacity: 0.75, "stroke-linecap": "round" }); // les spires autour du tube
      const RL = [[290, 140], [290, 102], [100, 102], [100, 140]], PL = poly(RL);
      D.el("polyline", { points: pts([[100, 140], [100, 102], [290, 102], [290, 140]]), fill: "none", stroke: BLEU, "stroke-width": 6, "stroke-linejoin": "round" }, k);
      D.image(k, "compresseur", 152, 72, 76, 61);
      const mols = [0, 1, 2, 3].map(i => ({ ph: i / 4, maj: molV(k) }));
      const p = pied(k, "une seconde petite machine", BLEU);
      return function (t, lit) {
        refl(t, 40);
        mols.forEach(m => { const f = D.frac(t * 0.12 + m.ph), [x, y] = PL(f * PL.long); m.maj(x, y, BLEU, x > 150 && x < 232 && y < 115 ? 0 : D.fenetre(f, 0, 1, 0.05)); });
        opa(p, D.lisse((t - (lit + 0.8)) / 0.5));
      };
    })();

    /* ----- carte 4 : l'économiseur à bouteille ----- */
    const c4 = (() => {
      const k = cartes[3].k, vapV = poly([[205, 172], [205, 118], [352, 118]]);
      const cid = ident("bt"), cl = D.el("clipPath", { id: cid }, k);
      rect(cl, 160, 102, 80, 110, { rx: 26 });
      tuyau(k, [[20, 162], [52, 162]], 12, LIQ); tuyau(k, [[82, 162], [156, 162]], 12, LIQ);
      tuyau(k, [[244, 118], [352, 118]], 12, "#cfe8d9");
      const halo = D.el("polyline", { points: pts([[244, 200], [363, 200]]), fill: "none", stroke: OR, "stroke-width": 46, "stroke-linecap": "round", opacity: 0 }, k);
      tuyau(k, [[244, 200], [363, 200]], 12, FROID);
      rect(k, 150, 92, 100, 130, { rx: 34, fill: "url(#vm-marine-h)" });
      rect(k, 160, 102, 80, 110, { rx: 26, fill: CLAIR });
      const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, k);
      const liq = D.liquide(dedans, { x0: 160, x1: 240, yh: 102, yb: 212, niveau: () => 0.4, couleur: () => FROID, pas: 10 });
      const bul = D.bulles(dedans, 7, 5);
      D.image(k, "detendeur", 40, 123, 56, 56);
      D.image(k, "compresseur", 340, 88, 76, 61);
      D.image(k, "detendeur", 352, 160, 56, 56);
      const refl = [D.courant(k, 22, 52, 155, 169, 2, 41), D.courant(k, 84, 150, 155, 169, 2, 42), D.courant(k, 256, 358, 193, 207, 3, 43)];
      const mols = [0, 1, 2, 3, 4].map(i => ({ ph: i / 5, maj: molV(k) }));
      const p = pied(k, "cousin du bi-étagé", BLEU);
      return function (t, lit, fin) {
        liq.maj(t);
        bul(t, q => [168 + q * 64, 206, 172, 1, "#fff"]);
        refl.forEach(r => r(t, 40));
        mols.forEach(m => { const f = D.frac(t * 0.13 + m.ph), [x, y] = vapV(f * vapV.long); m.maj(x, y, VERT_RGB, D.fenetre(f, 0, 1, 0.06)); });
        opa(halo, 0.3 * (0.6 + 0.4 * Math.sin(t * 5)) * D.lisse((t - fin) / 0.4));
        opa(p, D.lisse((t - (fin + 2.2)) / 0.5));
      };
    })();

    /* ----- l'héroïne : grande au centre, puis au croisement des cartes ----- */
    const mila = D.heroine(g, { r: 30 });
    const point = D.texte(g, 580, 380, "?", { "font-size": 110, "font-weight": 700, fill: D.ORANGE, "font-family": TITRE, opacity: 0 });
    const pasD = pastille(g, "d'autres façons", D.BLEU, 36), pasF = pastille(g, "le choix : bureau d'études et constructeur", D.ORANGE, 30);
    return function (t) {
      // les cartes s'allument une à une (k1 → k4), puis toutes ensemble (k6)
      const DEB = [T[1], T[2], T[3], T[4]];
      cartes.forEach((cd, i) => {
        const lit = D.lisse((t - DEB[i] + 0.2) / 0.6), actif = (t >= DEB[i] - 0.2 && t < (i < 3 ? DEB[i + 1] - 0.2 : T[6] - 0.2)) || t >= T[6] - 0.2;
        opa(cd.g, lit);
        cd.cadre.setAttribute("stroke", actif ? OR : BLEU); cd.cadre.setAttribute("stroke-width", actif ? 7 : 3);
      });
      c1(t, T[1]); c2(t, T[2]); c3(t, T[3]); c4(t, T[4], T[5]);
      // l'héroïne : grande avec son « ? » (k0), puis petite au croisement
      const petit = D.lisse((t - (T[1] - 0.6)) / 0.9);
      const hx = D.lerp(492, 490, petit), hy = D.lerp(440, 424, petit), hs = D.lerp(1.5, 0.55, petit);
      let regard = [0, -1];
      const dir = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
      if (t >= T[1] - 0.3) { const i = t < T[2] - 0.2 ? 0 : t < T[3] - 0.2 ? 1 : t < T[4] - 0.2 ? 2 : 3; regard = t >= T[6] ? [0, 0] : dir[i]; }
      mila({ x: hx, y: hy + Math.sin(t * 2.2) * 5 * (1 - petit), s: hs, t: t, temp: 0.1, etat: "liquide", humeur: "sourire", regard: regard });
      opa(point, D.fenetre(t, T[0] + 0.5, T[1] - 0.3, 0.5)); point.setAttribute("transform", "translate(0 " + f1(Math.sin(t * 3) * 6) + ")");
      fen(pasD, t, T[0] + 0.3, T[1] - 0.2, 0.4);
      fen(pasF, t, T[6] + 0.3, DUR + 1, 0.5);
      return { temp: 0.1, etat: "liquide", humeur: "sourire" };
    };
  };

  /* la casquette du technicien, posée sur l'héroïne (elle suit son groupe : position, échelle) */
  function casquette(mila) {
    const k = D.el("g", {}, mila.g);
    D.el("path", { d: "M -25 -13 Q -24 -42 2 -43 Q 26 -42 27 -14 Z", fill: "#1b3a63", stroke: NUIT, "stroke-width": 2.5, "stroke-linejoin": "round" }, k);
    D.el("path", { d: "M 6 -17 L 40 -13 Q 47 -9 40 -5 L 4 -9 Z", fill: BLEU, stroke: NUIT, "stroke-width": 2.5, "stroke-linejoin": "round" }, k);
    cercle(k, 2, -43, 3.5, { fill: "#fff" });
    return k;
  }
  /* thermomètre en verre (sans graduation chiffrée) : tube plein, colonne rouge ; rend f(niveau 0..1) */
  function thermometre(parent, x, yHaut, yBas) {
    rect(parent, x - 10, yHaut, 20, yBas - yHaut, { rx: 10, fill: "#fff", stroke: BLEU, "stroke-width": 3.5 });
    const col = rect(parent, x - 4, yBas, 8, 0, { fill: "#d64530" });
    for (let k = 1; k < 5; k++) ligne(parent, x + 12, yHaut + 8 + (yBas - yHaut - 16) * k / 5, x + 24, yHaut + 8 + (yBas - yHaut - 16) * k / 5, { stroke: GRIS, "stroke-width": 3 });
    return v => { const h = 8 + v * (yBas - yHaut - 16); col.setAttribute("y", f1(yBas - 4 - h)); col.setAttribute("height", f1(h)); };
  }
  /* manomètre à cadran, SANS chiffre : deux zones (basse, haute), des graduations, une aiguille ; rend f(angle en degrés, -135 → 135) */
  function cadran(parent, cx, cy, R) {
    const pt = (a, r) => [cx + r * Math.sin(a * PI / 180), cy - r * Math.cos(a * PI / 180)];
    const arc = (a1, a2, r, coul) => { const [x1, y1] = pt(a1, r), [x2, y2] = pt(a2, r); D.el("path", { d: "M " + f1(x1) + " " + f1(y1) + " A " + r + " " + r + " 0 " + (a2 - a1 > 180 ? 1 : 0) + " 1 " + f1(x2) + " " + f1(y2), fill: "none", stroke: coul, "stroke-width": 11 }, parent); };
    cercle(parent, cx, cy, R + 6, { fill: "#fff", stroke: "#56636f", "stroke-width": 12 });
    arc(-125, -10, R - 24, D.BLEU); arc(-10, 125, R - 24, D.ORANGE);
    for (let a = -135; a <= 135; a += 27) { const [x1, y1] = pt(a, R - 2), [x2, y2] = pt(a, R - (a % 54 ? 9 : 15)); ligne(parent, x1, y1, x2, y2, { stroke: NUIT, "stroke-width": 3 }); }
    const ai = D.el("g", {}, parent);
    D.el("path", { d: "M " + (cx - 6) + " " + cy + " L " + cx + " " + (cy - (R - 20)) + " L " + (cx + 6) + " " + cy + " Z", fill: NUIT }, ai);
    cercle(parent, cx, cy, 9, { fill: NUIT });
    return a => ai.setAttribute("transform", "rotate(" + f1(a) + " " + cx + " " + cy + ")");
  }
  /* cote : un trait vertical, deux butées horizontales */
  function cote(parent, x, y1, y2, coul) {
    const g = D.el("g", { stroke: coul, "stroke-width": 6, "stroke-linecap": "round" }, parent);
    ligne(g, x, y1, x, y2); ligne(g, x - 20, y1, x + 20, y1); ligne(g, x - 20, y2, x + 20, y2);
    return g;
  }
  /* un voyant vu de face, grand : bague de laiton, vitre ; avecBulles : des bulles filent avec le liquide → f(t) */
  function voyantGros(parent, cx, cy, R, avecBulles, graine) {
    const cid = ident("vg");
    [[cx - R - 74, cx - R + 4], [cx + R - 4, cx + R + 74]].forEach(([a, b]) => { rect(parent, a, cy - 26, b - a, 52, { fill: "url(#vm-cuivre)" }); rect(parent, a, cy - 16, b - a, 32, { fill: FROID }); });
    cercle(parent, cx, cy, R + 18, { fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 3 });
    cercle(parent, cx, cy, R + 2, { fill: "#6f5214" });
    cercle(D.el("clipPath", { id: cid }, parent), cx, cy, R - 10);
    const vitre = D.el("g", { "clip-path": "url(#" + cid + ")" }, parent);
    cercle(vitre, cx, cy, R, { fill: CLAIR });
    cercle(vitre, cx, cy, R, { fill: FROID, opacity: 0.85 });
    const refl = D.courant(vitre, cx - R, cx + R, cy - R + 10, cy + R - 10, 9, graine);
    const rb = D.alea(graine + 3), BU = [];
    if (avecBulles) for (let i = 0; i < 12; i++) BU.push({ s: rb(), y: cy - R + 24 + rb() * (2 * R - 48), r: 6 + rb() * 9, e: cercle(vitre, 0, 0, 5, { fill: "#fff", "fill-opacity": 0.4, stroke: "#fff", "stroke-width": 3 }) });
    D.el("path", { d: "M " + f1(cx - R * 0.7) + " " + f1(cy - R * 0.45) + " A " + f1(R * 0.85) + " " + f1(R * 0.85) + " 0 0 1 " + f1(cx - R * 0.2) + " " + f1(cy - R * 0.84), fill: "none", stroke: "#fff", "stroke-width": 8, opacity: 0.55, "stroke-linecap": "round" }, parent);
    return function (t) {
      refl(t, 90);
      BU.forEach(b => { const x = cx - R + D.frac(b.s + t * 0.1) * 2 * R; b.e.setAttribute("cx", f1(x)); b.e.setAttribute("cy", f1(b.y + Math.sin(t * 3 + b.s * 9) * 7)); b.e.setAttribute("r", f1(b.r)); });
    };
  }

  /* =====================================================================
     12 · CE QUE L'ON MESURE
     La ligne liquide à la sortie du condenseur (symboles : condenseur, voyant ; tube cuivre). L'héroïne porte la
     casquette du technicien. k0 : elle seule ; k1 : le manomètre HP (prise de pression) → « température de
     saturation » ; k2 : le thermomètre de contact sous sa gaine isolante → « température réelle du tube » ;
     k3 : la carte-formule, sur UNE ligne ; k4 : deux repères (sortie du condenseur : 4 à 8 K ; après le
     sous-refroidisseur : bien plus) ; k5 : deux voyants (clair / avec bulles) ; k6 : mélange qui glisse, livret.
     ===================================================================== */
  S.mesure = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const LY = 585;
    const gBase = D.el("g", {}, g), gInst = D.el("g", { opacity: 0 }, g), gTh = D.el("g", { opacity: 0 }, g), gForm = D.el("g", { opacity: 0 }, g), gProf = D.el("g", { opacity: 0 }, g), gVoy = D.el("g", { opacity: 0 }, g), gLiv = D.el("g", { opacity: 0 }, g);
    const dessus = D.el("g", {}, g);

    /* ----- la ligne liquide : condenseur à gauche, tube (orangé, puis plus bleu), voyant à droite ----- */
    organe(gBase, "condenseur", 110, LY, 1.8, 90);
    D.etiquette(gBase, 110, 487, "condenseur", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    const gid = ident("lq"), gr = D.el("linearGradient", { id: gid, x1: 164, y1: 0, x2: 940, y2: 0, gradientUnits: "userSpaceOnUse" }, gBase);
    [[0, LIQ], [0.5, LIQ], [0.66, FROID], [1, FROID]].forEach(([o, cc]) => D.el("stop", { offset: o, "stop-color": cc }, gr));
    const bloc = D.el("g", { opacity: 0 }, gBase); // le sous-refroidisseur, sur la ligne (k4) : un bloc d'inox et ses plaques
    rect(bloc, 575, LY - 45, 100, 90, { rx: 8, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 3 });
    for (let x = 587; x < 670; x += 12) ligne(bloc, x, LY - 38, x, LY + 38, { stroke: "#56636f", "stroke-width": 1.8 });
    tuyau(gBase, [[164, LY], [738, LY]], 14, "url(#" + gid + ")");
    tuyau(gBase, [[878, LY], [940, LY]], 14, "url(#" + gid + ")");
    const blocTop = D.el("g", { opacity: 0 }, gBase); // le tube qui traverse le bloc, par-dessus les plaques
    ligne(blocTop, 575, LY, 675, LY, { stroke: "#8a4a24", "stroke-width": 26 });
    ligne(blocTop, 575, LY, 675, LY, { stroke: "#d9955f", "stroke-width": 17 });
    ligne(blocTop, 575, LY, 675, LY, { stroke: FROID, "stroke-width": 8 });
    organe(gBase, "voyant", 768, LY, 4, 0);
    const eBloc = etiq(gBase, 625, 520, "sous-refroidisseur", { ancre: "middle", coul: BLEU, gras: true });

    /* ----- k1-k2 : les instruments ----- */
    const CX = 300, CY = 335, R = 72;
    ligne(gInst, CX, LY - 12, CX, CY + R + 8, { stroke: "#8a4a24", "stroke-width": 16 });
    ligne(gInst, CX, LY - 12, CX, CY + R + 8, { stroke: "#d9955f", "stroke-width": 8 });
    rect(gInst, CX - 16, LY - 26, 32, 14, { rx: 3, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }); // le raccord de la prise de pression
    const aiguille = cadran(gInst, CX, CY, R);
    D.etiquette(gInst, CX, 238, "manomètre HP", { "text-anchor": "middle", "font-weight": 700, fill: D.ORANGE });
    const eSat = etiq(gInst, 452, 345, "température de saturation", { gras: true, coul: D.ORANGE });
    const flSat = fleche(D.el("g", { opacity: 0 }, gInst), 392, 335, 440, 335, D.ORANGE, 8).parentNode;
    const TX = 460, thermo = thermometre(gTh, TX, 430, 548);
    rect(gTh, 400, LY - 36, 120, 72, { rx: 20, fill: "url(#vm-noir)", stroke: "#000", "stroke-width": 2 }); // la gaine isolante, noire
    [430, 460, 490].forEach(x => ligne(gTh, x, LY - 28, x, LY + 28, { stroke: "#6b7078", "stroke-width": 3, "stroke-dasharray": "7 9" }));
    D.el("path", { d: "M 412 " + (LY - 22) + " Q 440 " + (LY - 32) + " 500 " + (LY - 26), fill: "none", stroke: "#fff", "stroke-width": 4, opacity: 0.35, "stroke-linecap": "round" }, gTh);
    const eReel = etiq(gTh, 494, 482, "température réelle du tube", { gras: true, coul: D.BLEU });
    const eGaine = etiq(gTh, 460, 676, "gaine isolante", { ancre: "middle", gras: true, coul: NUIT, trait: [460, 646, 460, LY + 40] });

    /* ----- k3 : la carte-formule, sur UNE seule ligne, jamais coupée ----- */
    rect(gForm, 30, 250, 910, 260, { rx: 28, fill: "#fffdf8", stroke: BLEU, "stroke-width": 5 });
    const formule = D.el("text", { x: 485, y: 378, "text-anchor": "middle", "font-size": 46, "font-weight": 700, "font-family": POL }, gForm);
    [["sous-refroidissement", BLEU], [" = ", NUIT], ["T saturation", D.ORANGE], [" − ", NUIT], ["T réelle", "#1b3a63"]].forEach(([s, col]) => { const ts = D.el("tspan", { fill: col }, formule); ts.textContent = s; });
    const larg = formule.getComputedTextLength ? formule.getComputedTextLength() : 0, LMAX = 860;
    if (larg > LMAX) formule.setAttribute("font-size", f1(46 * LMAX / larg)); // la formule tient toujours sur sa ligne, quelle que soit la police
    D.texte(gForm, 485, 462, "en kelvins (K)", { "text-anchor": "middle", "font-size": 40, "font-weight": 700, fill: GRIS, "font-family": POL });

    /* ----- k4 : deux repères (profil de la température le long de la ligne) ----- */
    const YS = 330, Y1 = 362, Y2 = 470;
    ligne(gProf, 164, YS, 940, YS, { stroke: D.ORANGE, "stroke-width": 4, "stroke-dasharray": "10 8" });
    D.etiquette(gProf, 175, 318, "T saturation", { "font-weight": 700, fill: D.ORANGE });
    const courbe = D.el("polyline", { points: pts([[164, Y1], [560, Y1], [690, Y2], [940, Y2]]), fill: "none", stroke: D.BLEU, "stroke-width": 8, "stroke-linejoin": "round", "stroke-linecap": "round", pathLength: 100 }, gProf);
    D.etiquette(gProf, 175, 408, "T réelle", { "font-weight": 700, fill: D.BLEU });
    const rep1 = D.el("g", { opacity: 0 }, gProf), rep2 = D.el("g", { opacity: 0 }, gProf);
    cote(rep1, 300, YS, Y1, ROUGE); cote(rep2, 800, YS, Y2, ROUGE);
    D.etiquette(rep1, 300, 235, "sortie du condenseur", { "text-anchor": "middle", "font-weight": 700, fill: NUIT });
    D.etiquette(rep1, 300, 271, "4 à 8 K", { "text-anchor": "middle", "font-weight": 700, fill: ROUGE });
    D.etiquette(rep2, 740, 235, "après le sous-refroidisseur", { "text-anchor": "middle", "font-weight": 700, fill: NUIT });
    D.etiquette(rep2, 740, 271, "bien plus", { "text-anchor": "middle", "font-weight": 700, fill: ROUGE });

    /* ----- k5 : deux voyants ----- */
    const gVoyD = D.el("g", { opacity: 0 }, gVoy); // le voyant à bulles n'arrive qu'à « des bulles »
    const vOk = voyantGros(gVoy, 250, 400, 95, false, 5), vBu = voyantGros(gVoyD, 690, 400, 95, true, 9);
    cercle(gVoy, 250, 235, 27, { fill: VERT }); D.el("path", { d: "M 236 236 L 246 247 L 266 224", fill: "none", stroke: "#fff", "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, gVoy);
    cercle(gVoyD, 690, 235, 27, { fill: ROUGE }); D.el("path", { d: "M 678 223 L 702 247 M 702 223 L 678 247", fill: "none", stroke: "#fff", "stroke-width": 8, "stroke-linecap": "round" }, gVoyD);
    D.etiquette(gVoy, 250, 575, "liquide clair", { "text-anchor": "middle", "font-weight": 700, fill: VERT });
    D.etiquette(gVoyD, 690, 575, "des bulles", { "text-anchor": "middle", "font-weight": 700, fill: ROUGE });
    const eCause = etiq(gVoyD, 690, 625, "chercher la cause", { ancre: "middle", gras: true, coul: ROUGE });

    /* ----- k6 : le livret du constructeur ----- */
    const livre = D.el("g", { transform: "translate(480 360) rotate(-6)" }, gLiv);
    rect(livre, -90, -125, 180, 250, { rx: 10, fill: "#1b3a63", stroke: NUIT, "stroke-width": 4 });
    rect(livre, -90, -125, 22, 250, { rx: 6, fill: "#2f6fb8" });
    [-70, -46, -22].forEach((y, i) => rect(livre, -44, y, 100 - i * 18, 12, { rx: 6, fill: "#fff", opacity: 0.85 }));
    flocon(livre, 0, 50, 36, "#fff", 4);
    D.etiquette(gLiv, 480, 568, "documentation du constructeur", { "text-anchor": "middle", "font-weight": 700, fill: BLEU });
    const pM = pastille(gLiv, "mélange qui glisse : température de bulle", D.ORANGE, 30);

    /* ----- l'héroïne technicien ----- */
    const mila = D.heroine(dessus, { r: 30 });
    casquette(mila);
    return function (t) {
      // ----- les tableaux se succèdent : l'un s'efface avant que le suivant n'apparaisse (jamais deux textes superposés) -----
      const seq = (a, b) => D.lisse((t - a) / 0.35) * (1 - D.lisse((t - (b - 0.3)) / 0.3));
      const fI = E[2] + 0.25, fF = E[3] + 0.25, fP = E[4] + 0.25, fV = E[5] + 0.25;
      opa(gBase, (1 - D.lisse((t - (fI - 0.3)) / 0.3)) + seq(fF + 0.05, fP));
      opa(gInst, seq(T[1] - 0.1, fI)); opa(gTh, seq(T[2] - 0.1, fI)); opa(gForm, seq(fI + 0.05, fF)); opa(gProf, seq(fF + 0.05, fP)); opa(gVoy, seq(fP + 0.05, fV)); opa(gLiv, D.lisse((t - (fV + 0.05)) / 0.35));

      // ----- k1 : l'aiguille monte, se pose ; k2 : la colonne monte -----
      aiguille(D.lerp(-125, 52, D.lisse((t - A(1, 0.25)) / 2.2)) + Math.sin(t * 9) * 2.2 * D.fenetre(t, A(1, 0.45), A(1, 0.8), 0.3));
      thermo(D.lerp(0.18, 0.62, D.lisse((t - A(2, 0.3)) / 2.4)));
      fen(eSat.g, t, A(1, 0.55), E[2] + 0.1); opa(flSat, D.lisse((t - A(1, 0.5)) / 0.4));
      fen(eReel.g, t, A(2, 0.45), E[2] + 0.1); fen(eGaine.g, t, A(2, 0.25), E[2] + 0.1);

      // ----- k4 : le tube se refroidit, le profil se trace, les deux repères -----
      const pc = D.courbe([[T[4] - 0.1, 0], [A(4, 0.45), 0.477], [A(4, 0.7), 0.72], [E[4] + 0.3, 1]], t, true);
      courbe.setAttribute("stroke-dasharray", f1(100 * pc) + " 100"); courbe.setAttribute("opacity", pc > 0.005 ? 1 : 0);
      fen(rep1, t, A(4, 0.04), E[4] + 0.1, 0.4); fen(rep2, t, A(4, 0.68), E[4] + 0.1, 0.4);
      const ib = D.lisse((t - A(4, 0.5)) / 0.5);
      bloc.setAttribute("opacity", ib.toFixed(2)); blocTop.setAttribute("opacity", ib.toFixed(2));
      fen(eBloc.g, t, A(4, 0.55), E[4] + 0.1, 0.4);

      // ----- k5 : des bulles filent dans le voyant de droite -----
      vOk(t); vBu(t); opa(gVoyD, D.lisse((t - A(5, 0.36)) / 0.4));
      fen(eCause.g, t, A(5, 0.55), E[5] + 0.1, 0.4);
      fen(pM, t, A(6, 0.12), DUR + 1, 0.5);

      // ----- l'héroïne : grande (k0), puis en bas à gauche, le regard sur ce que l'on mesure -----
      const petit = D.lisse((t - (T[1] - 0.5)) / 0.9);
      const regards = [[0, 0], [0.5, -1], [1, -0.4], [1, -0.8], [1, -1], [1, -0.7], [1, -1]];
      let k = 0; for (let m = 0; m < T.length; m++) if (t >= T[m] - 0.2) k = m;
      mila({ x: D.lerp(480, 92, petit), y: D.lerp(350, 680, petit) + Math.sin(t * 2.2) * 5 * (1 - petit), s: D.lerp(1.6, 0.95, petit), t: t, temp: 0.4, etat: "liquide", humeur: "sourire", regard: regards[k] });

      // ----- ce que le théâtre lit : le point du liquide sur le diagramme -----
      const f4 = D.lisse((t - T[4]) / (E[4] - T[4]));
      return { temp: D.lerp(0.45, 0.3, f4), etat: "liquide", humeur: "sourire", diag: f4, diag0: 0 };
    };
  };

  /* =====================================================================
     RÉSUMÉ · LE VOYAGE EN DEUX CHEMINS (pas de carte)
     Un schéma qui s'allume élément par élément : le té (la ligne arrive de la bouteille) ; le gros flot
     (liquide principal) → sous-refroidisseur → détendeur → évaporateur ; le petit flot vert (piquage) →
     petit détendeur → l'autre côté du sous-refroidisseur → orifice économiseur des vis.
     k1 : le té ; k2 : le gros flot traverse l'échangeur, devient bleu, arrive au détendeur ; k3 : l'évaporateur ;
     k4 : le petit flot vert ; k5 : la flèche verte entre dans les vis ; k6 : tout allumé.
     L'état de la molécule (temp, état) suit la position rendue sur le diagramme (aide etatDe).
     ===================================================================== */
  S.resume = function (g, c) {
    const T = c.T, E = c.E, A = c.A, DUR = c.D;
    const gM1 = D.el("g", {}, g), gEx = D.el("g", {}, g), gM2 = D.el("g", {}, g), gDet = D.el("g", {}, g), gEv = D.el("g", {}, g),
      gP1 = D.el("g", {}, g), gP2 = D.el("g", {}, g), gP3 = D.el("g", {}, g), gCo = D.el("g", {}, g), gTe = D.el("g", {}, g), dessus = D.el("g", {}, g);
    const COEUR_V = "#bfe3cd";
    const lab = (parent, x, y, texte, ancre, coul) => { const e = D.etiquette(parent, x, y, texte, { "text-anchor": ancre || "middle", "font-weight": 700, fill: coul || BLEU }); return e; };
    const etiqG = []; // les étiquettes ne se montrent qu'une fois l'élément allumé

    /* le gros flot : la ligne arrive de la bouteille, passe le té, entre par le haut à gauche de l'échangeur, sort en bas à droite */
    const RM1 = [[30, 320], [396, 320]], RM2 = [[516, 500], [672, 500]], RM3 = [[732, 500], [820, 500]];
    tuyau(gM1, RM1, 24, LIQ); tuyau(gM2, RM2, 24, FROID); tuyau(gM2, RM3, 24, FROID);
    const refl = [D.courant(gM1, 36, 390, 308, 332, 5, 61), D.courant(gM2, 522, 666, 488, 512, 3, 62), D.courant(gM2, 738, 814, 488, 512, 2, 63)];
    /* le petit flot vert : du té vers le bas, petit détendeur, entrée en bas à gauche de l'échangeur ; sortie en haut à droite, vers les vis */
    const RP1 = [[130, 320], [130, 620], [234, 620]], RP2 = [[286, 620], [396, 620], [396, 500]], RP3 = [[516, 320], [857, 320], [857, 268]];
    tuyau(gP1, RP1, 8, LIQ, 6); tuyau(gP2, RP2, 8, COEUR_V, 6); tuyau(gP3, RP3, 8, COEUR_V, 6);
    D.image(gEx, "sousRefroidisseur", 330, 290, 240, 240);
    D.image(gDet, "detendeur", 650, 423, 110, 110);
    organe(gEv, "evaporateur", 880, 500, 2.0, 90);
    D.image(gP1, "detendeurEco", 214.4, 552.8, 96, 96);
    D.image(gCo, "compresseur", 785, 165, 150, 120);
    cercle(gTe, 130, 320, 14, { fill: "#8a4a24" }); // le té
    [[gTe, 30, 282, "de la bouteille", "start", NUIT, T[1]], [gTe, 150, 372, "le té", "start", NUIT, T[1]], [gEx, 450, 272, "sous-refroidisseur", "middle", BLEU, T[2]],
      [gDet, 702, 566, "détendeur", "middle", BLEU, A(2, 0.5)], [gEv, 960, 572, "évaporateur", "end", BLEU, T[3]], [gP1, 260, 676, "petit détendeur", "middle", VERT, T[4]],
      [gCo, 770, 232, "compresseur à vis", "end", BLEU, T[5] - 0.3]].forEach(([p, x, y, s, a, coul, t0]) => etiqG.push({ e: lab(p, x, y, s, a, coul), t0: t0 }));
    /* les pastilles, une par phrase */
    const PAS = [[1, "le liquide se partage", BLEU], [2, "bien liquide, sans bulles", BLEU], [3, "plus de froid par kilo", BLEU], [4, "il bout en refroidissant l'autre", VERT], [5, "orifice économiseur", VERT], [6, "une petite part travaille pour l'autre", VERT]]
      .map(([k, s, coul]) => ({ k: k, g: pastille(dessus, s, coul, 32) }));
    /* la vapeur verte qui file dans le piquage */
    const RPQ = [[130, 320], [130, 620], [396, 620], [396, 500], [516, 320], [857, 320], [857, 268]], PQ = poly(RPQ), mols = [];
    for (let i = 0; i < 10; i++) mols.push(molV(dessus));
    /* l'héroïne : le long du gros flot (k0-k3), puis du petit flot (k4-k6) */
    const mila = D.heroine(dessus, { r: 30 });
    const RM = [[40, 320], [130, 320], [396, 320], [516, 500], [672, 500], [702, 500], [820, 500], [880, 500]], PM = poly(RM);
    const RP = [[130, 320], [130, 620], [234, 620], [286, 620], [396, 620], [396, 500], [516, 320], [857, 320], [857, 268]], PP = poly(RP);
    const sM = t => D.courbe([[T[0] + 0.2, 0], [E[0], 90], [T[2] + 0.2, 90], [A(2, 0.35), 356], [A(2, 0.7), 572.3], [E[2] - 0.2, 758.3], [T[3] + 0.1, 758.3], [A(3, 0.55), 936.3], [DUR, 936.3]], t, true);
    const sP = t => D.courbe([[T[4], 0], [A(4, 0.2), 404], [A(4, 0.3), 456], [A(4, 0.5), 686], [E[4] - 0.2, 902.3], [A(5, 0.15), 902.3], [E[5] - 0.3, 1295.3], [DUR, 1295.3]], t, true);
    /* la position sur le diagramme : le chemin principal (0 → 3), le piquage (11 → 14), puis le tour complet (0 → 18) */
    const diagDe = t => t < T[2] ? 0 : t < T[3] ? D.courbe([[T[2], 0], [E[2], 2]], t, true) : t < T[4] - 0.05 ? D.courbe([[T[3], 2], [E[3], 3]], t, true)
      : t < T[5] ? D.courbe([[T[4], 11], [E[4], 13]], t, true) : t < T[6] - 0.05 ? D.courbe([[T[5], 13], [E[5], 14]], t, true) : D.courbe([[T[6], 0], [E[6], 18]], t, true);
    const tempDe = w => D.courbe([[0, 0.45], [1, 0.3], [2, 0.08], [4, 0.08], [5, 0.2], [7, 0.4], [8, 0.62], [9, 0.62], [10, 0.5], [11, 0.45], [12, 0.25], [13, 0.28], [14, 0.4], [15, 0.62], [16, 0.62], [17, 0.5], [18, 0.45]], w, true);
    const etatDe = w => w < 2 ? "liquide" : w < 3.9 ? "bout" : w < 9 ? "vapeur" : w < 10.9 ? "bout" : w < 12 ? "liquide" : w < 12.9 ? "bout" : w < 16 ? "vapeur" : w < 17.9 ? "bout" : "liquide";
    const lit = (t, t0) => 0.18 + 0.82 * D.lisse((t - t0) / 0.5);
    return function (t) {
      // ----- les éléments s'allument un à un -----
      opa(gTe, lit(t, T[1])); opa(gM1, lit(t, T[1])); opa(gEx, lit(t, T[2])); opa(gM2, lit(t, A(2, 0.45))); opa(gDet, lit(t, A(2, 0.55))); opa(gEv, lit(t, T[3]));
      opa(gP1, lit(t, T[4])); opa(gP2, lit(t, A(4, 0.3))); opa(gP3, lit(t, T[5])); opa(gCo, lit(t, T[5] - 0.3));
      etiqG.forEach(q => opa(q.e, D.lisse((t - q.t0) / 0.5)));
      refl[0](t, 60); refl[1](t, 60); refl[2](t, 60);
      PAS.forEach((p, i) => fen(p.g, t, T[p.k] + 0.2, p.k < 6 ? E[p.k] + 0.35 : DUR + 1, 0.4));
      // la vapeur verte file dans le piquage, après le petit détendeur seulement
      const vp = D.lisse((t - A(4, 0.3)) / 0.8);
      mols.forEach((m, i) => { const s = (t * 80 + i * PQ.long / mols.length) % PQ.long, [x, y] = PQ(s); m(x, y, VERT_RGB, s > 460 ? vp * 0.9 * (s > 902 ? D.lisse((t - T[5]) / 0.5) : 1) : 0); });
      // ----- l'héroïne -----
      const w = diagDe(t);
      let hx, hy, etat, temp, hop, hum = "sourire";
      if (t < T[4] - 0.25) { // le gros flot
        const s = sM(t), [x, y] = PM(s);
        hx = x; hy = y; hop = D.lisse((t - (T[0] + 0.1)) / 0.4) * (1 - D.lisse((t - (T[4] - 0.55)) / 0.3));
        temp = D.courbe([[0, 0.45], [356, 0.45], [572.3, 0.3], [728, 0.3], [758, 0.1], [936.3, 0.08]], s, true);
        etat = s < 740 ? "liquide" : "bout"; if (s > 760) hum = "froid";
      } else { // le petit flot
        const s = sP(t), [x, y] = PP(s);
        hx = x; hy = y; hop = D.lisse((t - (T[4] - 0.2)) / 0.4);
        temp = D.courbe([[0, 0.45], [404, 0.45], [456, 0.25], [860, 0.25], [902.3, 0.28], [1295.3, 0.4]], s, true);
        etat = s < 430 ? "liquide" : s < 880 ? "bout" : "vapeur"; if (s > 1200) hum = "surprise";
      }
      mila({ x: hx, y: hy, s: 0.5, t: t, temp: temp, etat: etat, humeur: hum, regard: [1, 0], op: hop });
      // ----- ce que le théâtre lit : le point du diagramme -----
      const dw = t >= T[6] - 0.05 ? 0 : t >= T[4] - 0.05 ? 11 : 0;
      const hd = w > 2 && w < 3.2 ? "froid" : (w > 7.2 && w < 9.1) || (w > 14.4 && w < 16.2) ? "chaud" : "sourire";
      return { temp: tempDe(w), etat: etatDe(w), humeur: hd, diag: w, diag0: dw };
    };
  };
})();

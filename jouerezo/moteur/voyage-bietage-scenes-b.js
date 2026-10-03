/* =====================================================================
   voyage-bietage-scenes-b.js — bi-étagé : la bouteille intermédiaire,
   la pression intermédiaire, le compresseur HP, le condenseur et le réservoir
   ---------------------------------------------------------------------
   Même contrat que voyage-nh3-scenes-b.js : VOYAGE_SCENES[id] = function (g, c)
   → maj(t) (fonction PURE de t, aucun état gardé d'une image à l'autre).
   Récit : donnees/voyage-bietage.js ; briques : voyage-dessin.js et
   voyage-bietage-dessin.js (D.cuve, D.HUILE, D.ACIER). Brief : voyage-bietage/BRIEF-SCENES.md.
   ÉCRAN PARTAGÉ : tout tient dans x 20 → 965, y 150 → 760 (la colonne de droite
   porte la carte et le diagramme) ; en-tête interdit : x < 760 et y < 140.
   Les phrases 0 et 1 d'un organe (`pres: 2`) sont la présentation (carte d'identité
   devant la coupe) : la coupe sert à partir de la phrase 2, mais elle est déjà
   dessinée à t = 0. ACIER partout ; le cuivre n'existe que dans le bobinage du
   moteur du compresseur, dehors.
   Ce fichier ne définit QUE ses quatre scènes : bouteille, pression, compresseurHP,
   condenseur (celles de -a.js et -c.js sont écrites par d'autres).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const PI = Math.PI, TOUR = 2 * PI;
  const POLICE = "Calibri, Arial, sans-serif";
  const ACIER = "#4d5866", VERT = "#1e7e54", ROUGE = "#c0392b";

  /* ---------- outils privés ---------- */
  /* tuyau d'acier en coupe, suivant une ligne brisée : paroi sombre (paroi px de chaque côté), intérieur teinté */
  function tuyau(parent, pts, w, teinte, paroi) {
    const l = pts.map(p => p.join(",")).join(" "), e = paroi === undefined ? 12 : paroi;
    D.el("polyline", { points: l, fill: "none", stroke: ACIER, "stroke-width": w, "stroke-linejoin": "round" }, parent);
    D.el("polyline", { points: l, fill: "none", stroke: teinte, "stroke-width": w - 2 * e, "stroke-linejoin": "round" }, parent);
  }
  /* petits traits qui filent le long d'une ligne brisée (un liquide qui circule, et dans quel sens) */
  function fil(parent, pts, nb, coul) {
    const lg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), tot = lg.reduce((a, b) => a + b, 0);
    const E = [];
    for (let i = 0; i < nb; i++) E.push(D.el("line", { stroke: coul || "#fff", "stroke-width": 5, "stroke-linecap": "round" }, parent));
    return function (t, vit, op) {
      E.forEach((e, i) => {
        let d = D.frac(i / nb + t * vit / tot) * tot, k = 0;
        while (k < lg.length - 1 && d > lg[k]) { d -= lg[k]; k++; }
        const a = pts[k], b = pts[k + 1], f = d / lg[k], ux = (b[0] - a[0]) / lg[k], uy = (b[1] - a[1]) / lg[k];
        const x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f, l = Math.min(14, lg[k] * (1 - f));
        e.setAttribute("x1", x.toFixed(1)); e.setAttribute("y1", y.toFixed(1));
        e.setAttribute("x2", (x + ux * l).toFixed(1)); e.setAttribute("y2", (y + uy * l).toFixed(1));
        e.setAttribute("opacity", (op * D.fenetre(D.frac(i / nb + t * vit / tot), 0, 1, 0.06)).toFixed(2));
      });
    };
  }
  /* chemin : ligne brisée à coins arrondis (rayon r), repérée à la distance parcourue s.
     pos(s) = point ; norm(s) = perpendiculaire unitaire ; cum[i] = distance du sommet i ; l = longueur */
  function chemin(pts, r) {
    const P = [pts[0]], idx = [0];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], d = pts[i + 1];
      const la = Math.hypot(b[0] - a[0], b[1] - a[1]), ld = Math.hypot(d[0] - b[0], d[1] - b[1]);
      const ra = Math.min(r, la / 2), rd = Math.min(r, ld / 2);
      const p0 = [b[0] + (a[0] - b[0]) * ra / la, b[1] + (a[1] - b[1]) * ra / la], p2 = [b[0] + (d[0] - b[0]) * rd / ld, b[1] + (d[1] - b[1]) * rd / ld];
      for (let k = 0; k <= 8; k++) {
        const u = k / 8, v = 1 - u;
        P.push([v * v * p0[0] + 2 * u * v * b[0] + u * u * p2[0], v * v * p0[1] + 2 * u * v * b[1] + u * u * p2[1]]);
        if (k === 4) idx.push(P.length - 1);
      }
    }
    P.push(pts[pts.length - 1]); idx.push(P.length - 1);
    const L = [0];
    for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const l = L[L.length - 1];
    function pos(s) {
      s = D.borne(s, 0, l);
      let i = 1; while (i < L.length - 1 && L[i] < s) i++;
      const f = L[i] > L[i - 1] ? (s - L[i - 1]) / (L[i] - L[i - 1]) : 0;
      return [D.lerp(P[i - 1][0], P[i][0], f), D.lerp(P[i - 1][1], P[i][1], f)];
    }
    function norm(s) {
      const a = pos(s - 4), b = pos(s + 4), d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      return [-(b[1] - a[1]) / d, (b[0] - a[0]) / d];
    }
    return { pos: pos, norm: norm, cum: idx.map(i => L[i]), l: l };
  }
  /* une molécule de vapeur d'une couleur donnée (D.mol colore selon la température ; ici on choisit) */
  function mol(parent) {
    const u = D.el("use", { href: "#vm-mol" }, parent);
    return function (x, y, fond, op) {
      u.setAttribute("x", x.toFixed(1)); u.setAttribute("y", y.toFixed(1));
      u.setAttribute("fill", fond); u.setAttribute("opacity", op === undefined ? 1 : op.toFixed(2));
    };
  }
  /* bulles qui montent en se balançant : place(q, i) → [x0, y0, x1, y1, visible 0..1] ; la bulle part de (x0, y0), arrive en (x1, y1) */
  function bullesBain(parent, nb, graine) {
    const r = D.alea(graine), B = [];
    for (let i = 0; i < nb; i++) B.push({ p: r(), per: 1.6 + r() * 1.4, ph: r() * 4, taille: 5 + r() * 7, sw: 3 + r() * 5, o: r() * 6,
      c: D.el("circle", { fill: "#fff", "fill-opacity": 0.35, stroke: "#fff", "stroke-width": 2.5 }, parent) });
    return function (t, place) {
      B.forEach(b => {
        const f = D.frac((t + b.ph) / b.per), cyc = Math.floor((t + b.ph) / b.per);
        const [x0, y0, x1, y1, vis] = place(D.frac(b.p + cyc * 0.618), b);
        const k = D.borne(f * 2.4, 0, 1);
        b.c.setAttribute("cx", (D.lerp(x0, x1, D.lisse(k)) + Math.sin(f * 9 + b.o) * b.sw).toFixed(1));
        b.c.setAttribute("cy", D.lerp(y0, y1, f).toFixed(1));
        b.c.setAttribute("r", D.lerp(2, b.taille, f).toFixed(1));
        b.c.setAttribute("opacity", (vis * D.fenetre(f, 0, 1, 0.12)).toFixed(2));
      });
    };
  }
  /* mélange de deux couleurs [r, g, b] */
  const mix = (a, b, f) => "rgb(" + a.map((v, i) => Math.round(D.lerp(v, b[i], f))).join(",") + ")";
  const rgb = s => s.match(/\d+/g).map(Number);
  /* flèche pleine vers la droite, pointe en x1 (≤ 960) ; texte au-dessus, aligné à droite sur la pointe */
  function flecheDiagramme(parent, x0, x1, y, lignes, coul, taille) {
    const g = D.el("g", {}, parent), fl = D.el("g", {}, g);
    coul = coul || D.ORANGE;
    D.el("path", { d: "M " + x0 + " " + (y - 13) + " H " + (x1 - 46) + " V " + (y - 32) + " L " + x1 + " " + y + " L " + (x1 - 46) + " " + (y + 32) + " V " + (y + 13) + " H " + x0 + " Z", fill: coul }, fl);
    lignes.forEach((l, i) => D.etiquette(g, x1, y - 52 - (lignes.length - 1 - i) * 38, l, { "text-anchor": "end", fill: coul, "font-weight": 700, "font-size": taille || 34 }));
    g.glisse = t => fl.setAttribute("transform", "translate(" + (Math.sin(t * 4.5) * 6).toFixed(1) + " 0)");
    return g;
  }
  /* symbole du compresseur (cercle traversé de deux lignes, raccordements à gauche et à droite) */
  function symboleCompresseur(parent, cx, cy, r) {
    const g = D.el("g", { transform: "translate(" + cx + " " + cy + ")" }, parent), k = r / 15, tr = { stroke: "#1d2b3a", "stroke-width": 3.2, "stroke-linecap": "round" };
    D.el("circle", Object.assign({ r: r, fill: "#fff" }, tr), g);
    D.el("line", Object.assign({ x1: -7 * k, y1: -13 * k, x2: 13 * k, y2: -7 * k }, tr), g);
    D.el("line", Object.assign({ x1: -7 * k, y1: 13 * k, x2: 13 * k, y2: 7 * k }, tr), g);
    return g;
  }

  /* ---------- 4 · la bouteille intermédiaire (dessin commun 2 : mêmes cotes que l'agent C) ----------
     Cuve verticale D.cuve({ x: 360, y: 210, l: 240, h: 520 }) ; nappe jusqu'à y = 500 ; tube plongeur venu de la
     droite (paroi droite à y = 270, jusqu'à x = 530, puis descente à y = 650, bout ouvert) ; sortie vapeur en haut
     au centre (x = 480, jusqu'à y = 160 puis à droite) ; entrée du liquide par la paroi gauche à y = 300 ; sortie du
     liquide par la paroi gauche à y = 690 ; sécurité de niveau haut sur la paroi droite à y = 420. Pas d'huile.
     La molécule arrive par le tube plongeur, sort sous le liquide dans une grosse bulle, remonte au milieu des
     bulles en se refroidissant, crève la surface, puis monte à la sortie du haut. */
  S.bouteille = function (g, c) {
    const LIQ = D.couleur(0.22, false), SABLE = D.couleur(0.5, false), CHAUD = "#fbe5d6", FROID = "#e6eef7";
    const NIV = (716 - 500) / 492; // la surface, à y = 500
    const cu = D.cuve(g, { x: 360, y: 210, l: 240, h: 520, vertical: true }); // intérieur x 374-586, y 224-716
    D.el("rect", { x: 374, y: 224, width: 212, height: 492, fill: D.couleur(0.22, true), opacity: 0.16 }, cu.dedans);
    const nap = D.liquide(cu.dedans, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => NIV, couleur: () => LIQ, opacite: 0.8 });

    // tuyauterie d'acier : entrée et sortie du liquide (à gauche), tube plongeur (à droite), sortie vapeur (en haut)
    tuyau(g, [[28, 300], [384, 300]], 44, SABLE, 8);
    tuyau(g, [[28, 690], [414, 690]], 44, LIQ, 8);
    tuyau(g, [[480, 228], [480, 160], [952, 160]], 44, FROID, 6);
    tuyau(g, [[952, 270], [530, 270], [530, 648]], 60, CHAUD, 12);
    [[28, 300, 44], [28, 690, 44], [952, 160, 44], [952, 270, 60]].forEach(([x, y, w]) => D.el("rect", { x: x < 100 ? x - 8 : x - 2, y: y - w / 2 - 3, width: 14, height: w + 6, rx: 3, fill: ACIER }, g));
    // sécurité de niveau haut : un petit boîtier sur la paroi droite, au-dessus du niveau normal
    D.el("rect", { x: 598, y: 396, width: 70, height: 48, rx: 8, fill: "url(#vm-acier)", stroke: ACIER, "stroke-width": 3 }, g);
    D.el("rect", { x: 610, y: 406, width: 46, height: 28, rx: 5, fill: "#eef2f6" }, g);
    D.el("circle", { cx: 633, cy: 420, r: 8, fill: "#3fa56a", stroke: "#24384f", "stroke-width": 2 }, g);
    // par-dessus les tubes : un voile de liquide (le tube plongeur se devine à travers), les bulles, la chute du liquide
    const dedans2 = D.el("g", { "clip-path": cu.dedans.getAttribute("clip-path") }, g);
    const nap2 = D.liquide(dedans2, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => NIV, couleur: () => LIQ, opacite: 0.2 });
    const bain = bullesBain(dedans2, 14, 11), chute = D.bulles(dedans2, 6, 7, true);
    const filEntree = fil(g, [[34, 300], [380, 300]], 6, "#fff"), filSortie = fil(g, [[34, 690], [410, 690]], 6, "#fff");

    // le chemin de la vapeur : tube plongeur, sortie sous le liquide (à gauche du tube), remontée, sortie du haut
    const PC = chemin([[958, 270], [530, 270], [530, 640], [500, 674], [455, 640], [450, 560], [462, 500], [480, 420], [480, 236], [480, 160], [958, 160]], 26);
    const cm = PC.cum; // 0 entrée · 1 coude · 2 bout du tube · 3-4 sous le tube · 5 le long du tube · 6 surface · 7 · 8 haut · 9 coude · 10 sortie
    const NP = 18, VIT = 92, P = PC.l / VIT, bulleP = [], molP = [];
    for (let i = 0; i < NP; i++) {
      bulleP.push(D.el("circle", { r: 17, fill: "#fff", "fill-opacity": 0.3, stroke: "#fff", "stroke-width": 2.5 }, g));
      molP.push(mol(g));
    }
    const rn = D.alea(41), NN = 7, NB = []; // les molécules de liquide qui deviennent vapeur (phrase 4)
    for (let i = 0; i < NN; i++) NB.push({ x: 396 + rn() * 90, y: 548 + rn() * 90, tb: c.A(4, 0.08 + 0.7 * i / (NN - 1)), maj: mol(g), b: D.el("circle", { fill: "#fff", "fill-opacity": 0.35, stroke: "#fff", "stroke-width": 2.5 }, g) });
    const grosse = D.el("circle", { fill: "#fff", "fill-opacity": 0.28, stroke: "#fff", "stroke-width": 4 }, g);
    const reflet = D.el("path", { d: "M -32 -14 A 35 35 0 0 1 -12 -33", fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round" }, g);
    const mila = D.heroine(g, { r: 30 });
    const chal = [0, 1, 2, 3].map(() => D.chaleur(g));
    // sa course : tube plongeur (en k2), sortie dans une bulle (k3), remontée (k4), la surface (k5), la sortie (k7)
    const tA = c.T[2] - 0.2, tB = c.E[2] + 0.1, tS = c.A(5, 0.3);
    const sMila = t => D.courbe([[tA, 0], [tB, cm[2]], [c.A(3, 0.2), cm[2] + 22], [c.A(3, 0.55), cm[3] + 40], [c.E[3], cm[4] + 12], [c.A(4, 0.5), cm[5] - 10], [c.E[4], cm[5] + 25], [tS, cm[6]], [c.A(5, 0.62), cm[6] + 60],
      [c.T[7], cm[6] + 74], [c.A(7, 0.32), cm[8]], [c.A(7, 0.5), cm[9]], [c.E[7] + 0.4, cm[10] - 46]], t, true);

    // étiquettes, phrase par phrase
    const gris = { fill: "#637285", "font-size": 28, "font-weight": 700 };
    D.etiquette(g, 30, 262, "du flotteur", gris);
    D.etiquette(g, 30, 745, "vers le détendeur", gris);
    D.lignes(g, 690, 412, ["sécurité de", "niveau haut"], Object.assign({ "font-family": POLICE }, gris, { "font-weight": 700 }), 32);
    const labPlo = D.el("g", {}, g); D.etiquette(labPlo, 630, 540, "tube plongeur", { "font-weight": 700 }); D.trait(labPlo, 626, 528, 566, 500);
    const labBP = D.etiquette(g, 622, 342, "venue du compresseur BP", { "font-size": 30, "font-weight": 600 });
    const labBout = D.el("g", {}, g);
    D.lignes(labBout, 30, 520, ["un peu de liquide", "bout"], { "font-size": 32, fill: "#10233c", "font-family": POLICE, "font-weight": 700 }, 36); D.trait(labBout, 290, 506, 410, 560);
    const labFroid = D.el("g", {}, g); D.etiquette(labFroid, 30, 450, "refroidie", { "font-weight": 700, fill: "#2f6fb8", "font-size": 36 }); D.trait(labFroid, 190, 440, 442, 462);
    const labHP = D.etiquette(g, 622, 218, "vers le compresseur HP", { "font-weight": 700 });
    const flDia = flecheDiagramme(g, 624, 958, 640, ["regardez", "le diagramme"]);
    // phrase 7 : la chaleur enlevée, c'est de la chaleur en moins au refoulement suivant
    const nChal = D.el("g", {}, g);
    const fl = D.el("g", { transform: "translate(150 450) scale(2.2)" }, nChal);
    D.el("path", { d: "M 0 -32 V -4 M -9 -14 L 0 -2 L 9 -14", fill: "none", stroke: "#e2662c", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, fl);
    [[-50, -45, 50, 45], [-50, 45, 50, -45]].forEach(([x1, y1, x2, y2]) => D.el("line", { x1: 150 + x1, y1: 412 + y1, x2: 150 + x2, y2: 412 + y2, stroke: ROUGE, "stroke-width": 11, "stroke-linecap": "round" }, nChal));
    D.lignes(nChal, 30, 520, ["chaleur en moins", "au refoulement", "suivant"], { "font-size": 32, fill: "#10233c", "font-family": POLICE, "font-weight": 700 }, 36);

    return function (t) {
      nap.maj(t); nap2.maj(t);
      const surf = nap.surface(480, t);
      filEntree(t, 70, 1); filSortie(t, 70, 1);
      chute(t, q => [392 + q * 14, 312, nap.surface(398, t), 1, SABLE]);
      // le flux de vapeur : tube plongeur → bulles → surface → sortie du haut
      const sH = sMila(t);
      molP.forEach((m, i) => {
        const u = D.frac(i / NP + t / P), s = u * PC.l, p = PC.pos(s), n = PC.norm(s);
        const dans = s > cm[2] && s < cm[6], temp = D.courbe([[cm[2], 0.45], [cm[4], 0.22]], s, true), fade = D.fenetre(u, 0, 1, 0.025);
        const dec = (i % 3 - 1) * (s < cm[2] ? 7 : s > cm[7] ? 5 : 0);
        const etale = D.borne((s - cm[6]) / 50, 0, 1) * D.borne((cm[8] - 50 - s) / 70, 0, 1); // dans la vapeur de la bouteille, elles s'étalent
        const x = p[0] + n[0] * dec + (dans ? Math.sin(t * 3 + i * 2) * 7 : 0) + (Math.sin(i * 2.3 + s * 0.02 + t * 0.6) * 24 - 18) * etale, y = p[1] + n[1] * dec;
        m(x, y, D.couleur(temp, true), fade * (Math.abs(s - sH) < 46 ? 0 : 1));
        bulleP[i].setAttribute("cx", x.toFixed(1)); bulleP[i].setAttribute("cy", y.toFixed(1));
        bulleP[i].setAttribute("opacity", (dans ? fade * (Math.abs(s - sH) < 46 ? 0 : 1) : 0).toFixed(2));
      });
      const arrive = D.lisse((t - c.A(3, 0.1)) / 0.8);
      bain(t, (q, b) => [518, 664, 395 + q * 95, nap.surface(430, t), arrive * 0.9]);
      // phrase 4 : des voisines du liquide deviennent vapeur
      NB.forEach(n => {
        const u = t - n.tb;
        if (u < 0) { n.maj(0, 0, "#fff", 0); n.b.setAttribute("opacity", 0); return; }
        const croit = D.borne(u / 0.9, 0, 1), y = n.y - Math.max(0, u - 0.9) * 52, dessus = y < surf - 6; // sous la surface : dans une bulle ; au-dessus : seule, elle file vers la sortie
        const x = D.lerp(n.x, 480, D.lisse((n.y - y) / (n.y - 250))) + (dessus ? 0 : Math.sin(u * 7 + n.x) * 3);
        n.b.setAttribute("cx", x.toFixed(1)); n.b.setAttribute("cy", y.toFixed(1)); n.b.setAttribute("r", D.lerp(2, 16, croit).toFixed(1));
        n.b.setAttribute("opacity", dessus ? 0 : 0.95);
        n.maj(x, y, D.couleur(0.22, true), D.lisse(u / 0.8) * D.borne((y - 232) / 60, 0, 1));
      });
      // l'héroïne et sa grosse bulle : elle se forme à la sortie du tube, elle éclate à la surface
      const p = PC.pos(sH), pop = D.lisse((t - tS) / 0.5);
      const tempH = D.courbe([[0, 0.45], [c.A(3, 0.25), 0.45], [c.E[3], 0.22]], t, true);
      const rayon = t > tS ? D.lerp(44, 68, pop) : D.courbe([[tB, 0], [tB + 0.5, 44]], t), ob = t > tS ? 1 - pop : 1;
      grosse.setAttribute("cx", p[0].toFixed(1)); grosse.setAttribute("cy", p[1].toFixed(1)); grosse.setAttribute("r", Math.max(0.1, rayon).toFixed(1));
      grosse.setAttribute("opacity", (rayon > 1 ? ob : 0).toFixed(2));
      reflet.setAttribute("transform", "translate(" + p[0].toFixed(1) + " " + p[1].toFixed(1) + ") scale(" + (Math.max(0.1, rayon) / 44).toFixed(2) + ")");
      reflet.setAttribute("opacity", (rayon > 1 ? ob * 0.9 : 0).toFixed(2));
      const humeur = t < c.A(3, 0.12) ? "chaud" : t < tS ? "surprise" : "sourire";
      mila({ x: p[0], y: p[1] + (sH > cm[2] ? Math.sin(t * 2.2) * 3 : 0), s: sH > cm[8] - 20 ? 0.34 : sH > cm[2] + 30 ? 0.55 : 0.42, t: t, temp: tempH, etat: "vapeur", humeur: humeur, regard: [sH < cm[1] ? -1 : 0, 0], op: D.fenetre(t, tA, c.D - 0.3, 0.4) });
      // phrase 3 : la chaleur quitte la molécule (flèches orange qui s'éloignent d'elle)
      const fc = D.fenetre(t, c.A(3, 0.3), c.E[3] + 0.2, 0.5);
      chal.forEach((f, i) => {
        const a = (i * 90 + 45) * PI / 180, d = 86 + 8 * Math.sin(t * 4 + i * 2);
        f(p[0] + Math.cos(a) * d, p[1] + Math.sin(a) * d, i * 90 - 45, fc * 0.9);
      });
      // textes
      labPlo.setAttribute("opacity", D.fenetre(t, c.T[2] + 0.6, c.E[3] + 0.4, 0.5).toFixed(2));
      labBP.setAttribute("opacity", D.fenetre(t, c.T[2] - 0.2, c.E[2] + 0.4, 0.5).toFixed(2));
      labBout.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.4, 0.5).toFixed(2));
      labFroid.setAttribute("opacity", D.fenetre(t, c.T[5] + 0.3, c.E[5] + 0.6, 0.5).toFixed(2));
      flDia.setAttribute("opacity", D.fenetre(t, c.T[6] - 0.1, c.E[6] + 0.3, 0.5).toFixed(2)); flDia.glisse(t);
      labHP.setAttribute("opacity", D.fenetre(t, c.A(7, 0.25), c.D - 0.3, 0.5).toFixed(2));
      nChal.setAttribute("opacity", D.fenetre(t, c.T[7] - 0.1, c.D - 0.4, 0.5).toFixed(2));
      return { carte: D.courbe([[tA, 11.7], [tB, 12.8], [c.E[3], 13.3], [tS, 13.8], [c.T[7], 14.05], [c.E[7], 15]], t, true), temp: tempH, etat: "vapeur", humeur: humeur };
    };
  };

  /* ---------- 5 · la pression intermédiaire (trois paliers, la bouteille au milieu, deux compresseurs) ----------
     À gauche, trois paliers empilés (basse, intermédiaire, haute) ; la bouteille est au niveau du milieu ; à droite,
     un compresseur à chaque marche. Phrase 0 : les paliers, la bouteille, l'héroïne sur le palier du milieu.
     1 : les deux compresseurs et deux barres de travail égales. 2 : « × même nombre » sur chaque marche. 3 : la bouteille
     entre deux flèches (ce que le BP envoie / ce que le HP aspire). 4 : le HP s'arrête, la vapeur s'entasse, le manomètre
     monte. 5 : flèche vers le diagramme. */
  S.pression = function (g, c) {
    const YH = 250, YI = 440, YB = 630, TON = { HP: D.ORANGE, PI: VERT, BP: D.BLEU };
    const gris = { fill: "#637285", "font-size": 28, "font-weight": 700 };
    // les repères de niveau, pointillés (ceux de droite apparaissent avec les compresseurs)
    const niveaux = D.el("g", {}, g);
    [[YH, "HP"], [YI, "PI"], [YB, "BP"]].forEach(([y, k]) => D.el("line", { x1: k === "PI" ? 540 : 360, y1: y + 8, x2: 960, y2: y + 8, stroke: TON[k], "stroke-width": 3, "stroke-dasharray": "3 9", "stroke-linecap": "round", opacity: 0.55 }, niveaux));
    D.el("line", { x1: 360, y1: YI + 8, x2: 410, y2: YI + 8, stroke: VERT, "stroke-width": 3, "stroke-dasharray": "3 9", "stroke-linecap": "round", opacity: 0.7 }, g);
    // les trois paliers
    [[YH, "haute", "HP"], [YI, "intermédiaire", "PI"], [YB, "basse", "BP"]].forEach(([y, nom, k]) => {
      D.el("rect", { x: 40, y: y, width: 320, height: 16, rx: 5, fill: TON[k] }, g);
      D.etiquette(g, 48, y - 14, nom, { "font-size": 36, "font-weight": 700, fill: TON[k] });
    });
    // la bouteille, au niveau du milieu
    const cu = D.cuve(g, { x: 410, y: 313, l: 130, h: 270, vertical: true }); // intérieur x 424-526, y 327-569
    D.el("rect", { x: 424, y: 327, width: 102, height: 242, fill: D.couleur(0.22, true), opacity: 0.16 }, cu.dedans);
    const nap = D.liquide(cu.dedans, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => (569 - 536) / 242, couleur: () => D.couleur(0.22, false), opacite: 0.8 });
    D.etiquette(g, 475, 622, "bouteille", { "text-anchor": "middle", "font-weight": 700 });

    // les molécules de la bouteille : cinq d'emblée, les autres arrivent et s'entassent (phrase 4)
    const rs = D.alea(8), SLOTS = [];
    for (let essai = 0; essai < 6000 && SLOTS.length < 26; essai++) {
      const x = 440 + rs() * 70, y = 372 + rs() * 150;
      if (SLOTS.every(s => Math.hypot(s[0] - x, s[1] - y) > 22.5)) SLOTS.push([x, y]);
    }
    const NB = SLOTS.length, BASE = 5, NEW = NB - BASE, vap = D.couleur(0.22, true);
    const ENT = [[632, 512], [548, 496], [500, 470]], SORT = [[505, 392], [540, 350], [630, 326]];
    const MS = SLOTS.map((p, i) => ({ p: p, ph: rs() * 6, maj: mol(g), tb: i < BASE ? c.T[3] + 0.4 + i * 0.3 : c.A(4, 0.08 + 0.8 * (i - BASE) / Math.max(1, NEW - 1)) }));
    const flux = (pts, nb) => {
      const L = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1])), tot = L.reduce((a, b) => a + b, 0), E = [];
      for (let i = 0; i < nb; i++) E.push(mol(g));
      return (t, op) => E.forEach((m, i) => {
        const u = D.frac(i / nb + t / 3), d = u * tot; let k = 0, r = d;
        while (k < L.length - 1 && r > L[k]) { r -= L[k]; k++; }
        const a = pts[k], b = pts[k + 1], f = r / L[k];
        m(D.lerp(a[0], b[0], f), D.lerp(a[1], b[1], f), vap, op * D.fenetre(u, 0, 1, 0.12));
      });
    };
    const fluxIn = flux(ENT, 6), fluxOut = flux(SORT, 6);
    const mila = D.heroine(g, { r: 30 });

    // compresseurs, tubes, noms, repères de niveau (phrases 1 à 4)
    const comp = D.el("g", {}, g);
    [[335, "HP"], [515, "BP"]].forEach(([y, k]) => {
      symboleCompresseur(comp, 680, y, 44);
      D.pastille(comp, 680, y + 93, "compresseur " + k, TON[k], 28, "middle");
    });
    // phrase 1 : deux barres de travail égales ; phrase 2 : × même nombre
    const travail = D.el("g", {}, g), barres = [];
    [[335, 340], [515, 520]].forEach(([yc, yb]) => {
      D.el("rect", { x: 815, y: yb, width: 140, height: 28, rx: 8, fill: "#eef2f6", stroke: ACIER, "stroke-width": 3 }, travail);
      barres.push(D.el("rect", { x: 818, y: yb + 3, height: 22, rx: 6, fill: "#2f6fb8" }, travail));
      D.etiquette(travail, 815, yb + 66, "travail", { "font-size": 30, "font-weight": 700 });
    });
    const fois = D.el("g", {}, g);
    D.pastille(fois, 958, 321, "× même nombre", D.BLEU, 28, "end"); D.pastille(fois, 958, 497, "× même nombre", D.BLEU, 28, "end");
    // phrase 3 : les deux flèches autour de la bouteille
    const fleche = (parent, x1, y1, x2, y2, coul) => {
      const a = Math.atan2(y2 - y1, x2 - x1), L = 28, bx = x2 - Math.cos(a) * L, by = y2 - Math.sin(a) * L;
      D.el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": 14, "stroke-linecap": "round" }, parent);
      D.el("path", { d: "M " + x2 + " " + y2 + " L " + (bx + Math.sin(a) * 20) + " " + (by - Math.cos(a) * 20) + " L " + (bx - Math.sin(a) * 20) + " " + (by + Math.cos(a) * 20) + " Z", fill: coul }, parent);
    };
    const entree = D.el("g", {}, g), sortie = D.el("g", {}, g);
    fleche(entree, 630, 512, 546, 494, D.BLEU); fleche(sortie, 542, 352, 630, 326, D.ORANGE);
    const lab3 = D.el("g", {}, g), st3 = { "font-size": 28, fill: "#10233c", "font-family": POLICE, "font-weight": 700 };
    D.lignes(lab3, 795, 490, ["ce que le", "compresseur", "BP envoie"], st3, 32);
    D.lignes(lab3, 795, 312, ["ce que le", "compresseur", "HP aspire"], st3, 32);
    // phrase 4 : le HP s'arrête (croix rouge), le manomètre monte
    const stop = D.el("g", {}, g);
    [[-34, -34, 34, 34], [-34, 34, 34, -34]].forEach(([x1, y1, x2, y2]) => D.el("line", { x1: 680 + x1, y1: 335 + y1, x2: 680 + x2, y2: 335 + y2, stroke: ROUGE, "stroke-width": 11, "stroke-linecap": "round" }, stop));
    const mano = D.el("g", {}, g), MX = 880, MY = 340;
    D.el("circle", { cx: MX, cy: MY, r: 64, fill: "url(#vm-acier)", stroke: ACIER, "stroke-width": 3 }, mano);
    D.el("circle", { cx: MX, cy: MY, r: 53, fill: "#fffdf8" }, mano);
    const arc = (a0, a1, coul) => {
      const p = a => [MX + 43 * Math.sin(a * PI / 180), MY - 43 * Math.cos(a * PI / 180)], A = p(a0), B = p(a1);
      D.el("path", { d: "M " + A[0].toFixed(1) + " " + A[1].toFixed(1) + " A 43 43 0 0 1 " + B[0].toFixed(1) + " " + B[1].toFixed(1), fill: "none", stroke: coul, "stroke-width": 9 }, mano);
    };
    arc(-125, -30, "#3fa56a"); arc(-30, 40, "#e8a13a"); arc(40, 125, ROUGE);
    const aig = D.el("line", { x1: MX, y1: MY, stroke: D.BLEU, "stroke-width": 6, "stroke-linecap": "round" }, mano);
    D.el("circle", { cx: MX, cy: MY, r: 7, fill: D.BLEU }, mano);
    const pMonte = D.pastille(g, 958, 705, "la pression intermédiaire monte", ROUGE, 30, "end");
    const flDia = flecheDiagramme(g, 620, 958, 578, ["la ligne du milieu,", "sur le diagramme"], VERT);

    return function (t) {
      nap.maj(t);
      const f1 = D.fenetre(t, c.T[1] - 0.2, c.E[4] + 0.5, 0.5);
      comp.setAttribute("opacity", f1.toFixed(2)); niveaux.setAttribute("opacity", f1.toFixed(2));
      travail.setAttribute("opacity", D.fenetre(t, c.T[1] - 0.1, c.E[2] + 0.4, 0.5).toFixed(2));
      const crois = D.lisse((t - c.T[1] - 0.4) / 1.6);
      barres.forEach(b => b.setAttribute("width", Math.max(0.1, 134 * crois).toFixed(1)));
      fois.setAttribute("opacity", D.fenetre(t, c.T[2] - 0.1, c.E[2] + 0.4, 0.5).toFixed(2));
      const f3 = D.fenetre(t, c.T[3] - 0.1, c.E[4] + 0.5, 0.5), f4 = D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.5, 0.5);
      entree.setAttribute("opacity", f3.toFixed(2));
      sortie.setAttribute("opacity", (f3 * (t > c.T[4] ? 0.3 : 1)).toFixed(2));
      lab3.setAttribute("opacity", D.fenetre(t, c.T[3] - 0.1, c.E[3] + 0.4, 0.5).toFixed(2));
      stop.setAttribute("opacity", (D.lisse((t - c.T[4]) / 0.5) * f1).toFixed(2));
      mano.setAttribute("opacity", f4.toFixed(2)); pMonte.setAttribute("opacity", f4.toFixed(2));
      const p = D.courbe([[0, 0.28], [c.T[4], 0.28], [c.A(4, 0.3), 0.34], [c.E[4], 0.96]], t, true), ang = (-125 + 250 * p) * PI / 180 + Math.sin(t * 9) * 0.012;
      aig.setAttribute("x2", (MX + 44 * Math.sin(ang)).toFixed(1)); aig.setAttribute("y2", (MY - 44 * Math.cos(ang)).toFixed(1));
      flDia.setAttribute("opacity", D.fenetre(t, c.T[5] - 0.1, c.D - 0.3, 0.5).toFixed(2)); flDia.glisse(t);
      // les molécules de la bouteille ; entre T3 et T4, elles entrent (BP) et sortent (HP) à égalité
      const equilibre = D.fenetre(t, c.T[3] + 0.2, c.T[4] + 0.3, 0.5);
      fluxIn(t, equilibre); fluxOut(t, equilibre);
      MS.forEach((m, i) => {
        const u = t - m.tb, a = D.lisse(u / 1.4);
        let x = m.p[0], y = m.p[1];
        if (u < 1.4 && i >= BASE) { const k = D.lisse(u / 1.4); x = D.lerp(ENT[1][0], m.p[0], k); y = D.lerp(ENT[1][1], m.p[1], k); }
        m.maj(x, y, vap, u < 0 ? 0 : (i < BASE ? a : D.borne(u / 0.3, 0, 1)));
      });
      // l'héroïne : sur le palier du milieu, puis dans la bouteille
      const k3 = D.courbe([[c.T[3] - 0.2, 0], [c.A(3, 0.4), 1]], t);
      const hx = D.lerp(312, 475 + Math.sin(t * 1.1) * 12, k3), hy = D.courbe([[c.T[3] - 0.2, 398], [c.A(3, 0.18), 350], [c.A(3, 0.4), 440]], t) + (k3 > 0.99 ? Math.sin(t * 1.4) * 8 : Math.sin(t * 2) * 2);
      const humeur = t > c.T[4] ? "surprise" : "sourire";
      mila({ x: hx, y: hy, s: D.lerp(0.9, 0.5, k3), t: t, temp: 0.22, etat: "vapeur", humeur: humeur, regard: [1, 0] });
      return { temp: 0.22, etat: "vapeur", humeur: humeur };
    };
  };

  /* ---------- 6 · le compresseur HP (pistons, en coupe : même dessin que le BP, cylindre plus étroit) ----------
     Même mécanique que S.compresseur de l'édition NH₃ (bielle-manivelle, clapets, moteur dehors, bobinage de cuivre) mais
     ramassée dans x 20 → 965 : à gauche, le HAUT de la bouteille intermédiaire (coupée), d'où la vapeur monte au
     compresseur ; le cylindre est plus étroit que celui du BP (pointillé en phrase 4). Le piston tourne au ralenti
     pendant les phrases 0 à 2, aspire pendant la phrase 3, reste en bas pendant la 4, comprime pendant la 5. */
  S.compresseurHP = function (g, c) {
    const CX = 480, CY = 530, RV = 50, LB = 130, PIN = 44, TY = 250, BORE = 128, DP = BORE / 2;
    const FROID = "#e3eefa", CHAUD = "#fbe5d6", BDC = CY - 124, Y0 = 318;
    const dessus = th => CY - RV * Math.cos(th) - Math.sqrt(LB * LB - Math.pow(RV * Math.sin(th), 2)) - PIN; // haut du piston
    const tempGaz = top => 0.22 + 0.4 * D.lisse((BDC - top) / 54);
    const CA = [159, 187, 214], CB = [86, 184, 128]; // les deux familles de molécules : venues du compresseur BP / formées dans la bouteille

    /* le haut de la bouteille intermédiaire (même cuve que le dessin commun, coupée) */
    const cid = "vb-hp-coupe", zig = (x0, x1, y, pas) => { const l = []; for (let x = x0, k = 0; x <= x1 + 0.1; x += pas, k++) l.push([x, y - (k % 2 ? 9 : 0)]); return l; };
    D.el("polygon", { points: [[0, 150], [400, 150]].concat(zig(0, 400, 650, 20).reverse()).map(p => p.join(",")).join(" ") }, D.el("clipPath", { id: cid }, g));
    const coupe = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    const cu = D.cuve(coupe, { x: 30, y: 300, l: 240, h: 520, vertical: true }); // intérieur x 44-256, y 314-806
    D.el("rect", { x: 44, y: 314, width: 212, height: 492, fill: D.couleur(0.22, true), opacity: 0.16 }, cu.dedans);
    const NIV = (806 - 590) / 492;
    const nap = D.liquide(cu.dedans, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => NIV, couleur: () => D.couleur(0.22, false), opacite: 0.8 });
    const bain = bullesBain(cu.dedans, 7, 5);
    D.el("polyline", { points: zig(30, 270, 650, 20).map(p => p.join(",")).join(" "), fill: "none", stroke: ACIER, "stroke-width": 3 }, g);

    /* tubes d'acier : aspiration (de la bouteille) et refoulement (HP) */
    tuyau(g, [[150, 316], [150, TY], [CX - 76, TY]], 66, FROID, 10);
    tuyau(g, [[CX + 76, TY], [952, TY]], 66, CHAUD, 10);
    D.el("rect", { x: 950, y: TY - 41, width: 14, height: 82, rx: 3, fill: ACIER }, g);

    /* culasse (deux chambres, plaque à clapets), cylindre étroit, carter, huile */
    D.el("rect", { x: CX - 100, y: TY - 44, width: 200, height: 88, rx: 8, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: CX - 88, y: TY - 28, width: 76, height: 56, fill: FROID }, g);
    D.el("rect", { x: CX + 12, y: TY - 28, width: 76, height: 56, fill: CHAUD }, g);
    const chaud = D.el("rect", { x: CX - 2, y: TY - 44, width: 102, height: 88, rx: 8, fill: "#e2562c", opacity: 0 }, g); // la culasse chauffe
    D.el("rect", { x: CX - 80, y: TY + 28, width: 60, height: 16, fill: FROID }, g);
    D.el("rect", { x: CX + 20, y: TY + 28, width: 60, height: 16, fill: CHAUD }, g);
    D.el("rect", { x: CX - DP - 14, y: TY + 40, width: BORE + 28, height: 200, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: CX - 130, y: CY - 60, width: 260, height: 190, rx: 26, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: CX - 116, y: CY - 46, width: 232, height: 162, rx: 14, fill: "#f4f8fc" }, g);
    D.el("rect", { x: CX - 116, y: CY + 90, width: 232, height: 26, rx: 8, fill: D.HUILE, opacity: 0.75 }, g);
    D.el("rect", { x: CX - DP, y: TY + 44, width: BORE, height: 196, fill: "#f4f8fc" }, g);
    const tint = D.el("rect", { x: CX - DP, y: TY + 44, width: BORE, height: 196 }, g);
    const mols = D.el("g", {}, g);

    /* vilebrequin, bielle, piston, clapets */
    const bielle = [D.el("line", { stroke: "#3f4a55", "stroke-width": 20, "stroke-linecap": "round" }, g), D.el("line", { stroke: "#aab6c3", "stroke-width": 9, "stroke-linecap": "round" }, g)];
    const poids = D.el("circle", { r: 25, fill: "#6b7785", stroke: "#3f4a55", "stroke-width": 3 }, g);
    const bras = D.el("line", { x1: CX, y1: CY, stroke: "#7d8a98", "stroke-width": 20, "stroke-linecap": "round" }, g);
    D.el("circle", { cx: CX, cy: CY, r: 15, fill: "url(#vm-acier)", stroke: "#3f4a55", "stroke-width": 3 }, g);
    const manet = D.el("circle", { r: 10, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 3 }, g);
    const piston = D.el("g", {}, g);
    D.el("rect", { x: CX - DP + 2, y: 0, width: BORE - 4, height: 66, rx: 6, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, piston);
    [12, 24].forEach(y => D.el("line", { x1: CX - DP + 2, y1: y, x2: CX + DP - 2, y2: y, stroke: "#5d6b7a", "stroke-width": 2 }, piston));
    D.el("circle", { cx: CX, cy: PIN, r: 10, fill: "#24384f", stroke: "#aab6c3", "stroke-width": 3 }, piston);
    const clapA = D.el("rect", { x: CX - 62, y: TY + 44, width: 48, height: 6, rx: 3, fill: "#24384f" }, g);
    const clapR = D.el("rect", { x: CX + 12, y: TY + 22, width: 48, height: 6, rx: 3, fill: "#24384f" }, g);

    /* l'arbre sort par la garniture, passe l'accouplement, entre dans le moteur (dehors) */
    D.el("rect", { x: CX, y: CY - 10, width: 290, height: 20, fill: "url(#vm-acier)" }, g);
    const gx = CX + 122;
    D.el("rect", { x: gx, y: CY - 30, width: 40, height: 60, rx: 6, fill: "url(#vm-marine)", stroke: "#5d80ad", "stroke-width": 3 }, g);
    [CY - 20, CY + 20].forEach(y => D.el("circle", { cx: gx + 20, cy: y, r: 4.5, fill: "#aab6c3" }, g));
    D.el("rect", { x: 690, y: CY - 30, width: 24, height: 60, rx: 4, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    D.el("rect", { x: 720, y: CY - 30, width: 24, height: 60, rx: 4, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const boulons = [0, 1, 2].map(() => D.el("circle", { cx: 717, r: 4, fill: "#24384f" }, g));
    D.el("rect", { x: 770, y: CY - 62, width: 188, height: 124, rx: 14, fill: "url(#vm-marine)", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 782, y: CY - 50, width: 164, height: 100, rx: 6, fill: "#eef2f6" }, g);
    D.el("rect", { x: 782, y: CY - 16, width: 164, height: 32, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: 762, y: CY - 10, width: 22, height: 20, fill: "url(#vm-acier)" }, g);
    [CY - 46, CY + 18].forEach(y => { // le bobinage : des bobines de cuivre, au-dessus et au-dessous du rotor
      for (let i = 0; i < 3; i++) {
        D.el("rect", { x: 790 + i * 52, y: y, width: 44, height: 28, rx: 9, fill: "url(#vm-cuivre)", stroke: "#6e3818", "stroke-width": 2 }, g);
        [8, 14, 20].forEach(d => D.el("line", { x1: 796 + i * 52, y1: y + d, x2: 828 + i * 52, y2: y + d, stroke: "#6e3818", "stroke-width": 2, opacity: 0.6 }, g));
      }
    });

    /* les molécules : douze, de deux familles (une sur deux), et l'héroïne qui monte avec elles */
    const ta0 = c.T[3] + 0.2, ta1 = c.E[3] - 0.6, tc0 = c.T[5] - 0.1, tc1 = c.A(5, 0.78), tD0 = tc0 + 0.62 * (tc1 - tc0);
    const RT = chemin([[150, 340], [150, TY], [CX - 96, TY]], 34), VIT = 100, DB = 1.4, ATT = 0.3;
    const N = 12, rn = D.alea(23), MOL = [];
    for (let i = 0; i < N; i++) {
      const tIn = ta0 + 0.65 + i * (ta1 - 0.75 - ta0 - 0.65) / (N - 1);
      MOL.push({ fam: i % 2, u: 0.07 + rn() * 0.86, v: rn(), sx: 92 + (i % 4) * 38 + rn() * 14, sy: 372 + Math.floor(i / 4) * 66 + rn() * 26, tIn: tIn, lane: [-13, 0, 13][i % 3],
        tOut: tD0 + 0.1 + i * 0.15, maj: mol(mols), ph: rn() * 6 });
    }
    const AMB = [];
    [[120, 418], [205, 420], [100, 486], [165, 484], [228, 488], [120, 552], [185, 552], [238, 548]].forEach(([x, y], i) => AMB.push({ x: x, y: y, fam: i % 2, ph: rn() * 6, maj: mol(mols) }));
    const MOI = { fam: 0, u: 0.5, v: 0.3, sx: 130, sy: 470, tIn: ta0 + 0.3, lane: 0, tOut: tD0 + 0.2, ph: 1 };
    MOL.forEach(m => { m.td = m.tIn - ATT - DB - RT.l / VIT; });
    MOI.td = MOI.tIn - ATT - DB - RT.l / VIT;
    const mila = D.heroine(g, { r: 30 });
    // où est une molécule à l'instant t ? [x, y, vapeur chaude 0..1 (couleur), opacité]
    function ou(m, t, top, tg) {
      const jig = (a, b) => [Math.sin(t * 1.7 + m.ph * 3) * a, Math.cos(t * 1.3 + m.ph * 2) * b];
      if (t < m.td) { const [jx, jy] = jig(5, 5); return [m.sx + jx, m.sy + jy, 0, 1]; }
      if (t < m.td + DB) { const k = D.lisse((t - m.td) / DB), [jx, jy] = jig(5 * (1 - k), 5 * (1 - k)); return [D.lerp(m.sx, 150, k) + jx, D.lerp(m.sy, 340, k) + jy, 0, 1]; }
      const wait = [CX - 100, TY + m.lane];
      if (t < m.tIn) {
        const s = Math.min(RT.l, (t - m.td - DB) * VIT), p = RT.pos(s);
        return [p[0], p[1] + (s > 80 ? m.lane * D.lisse((s - 80) / 60) : 0), 0, 1];
      }
      const cx = CX + (m.u - 0.5) * (BORE - 28), cy = Y0 + m.v * Math.max(4, top - Y0 - 14);
      if (t < m.tOut) {
        const k = D.borne((t - m.tIn) / 0.9, 0, 1);
        let x, y;
        if (k < 0.4) { const q = D.lisse(k / 0.4); x = D.lerp(wait[0], CX - 46, q); y = D.lerp(wait[1], TY + 4, q); }
        else if (k < 0.7) { const q = (k - 0.4) / 0.3; x = D.lerp(CX - 46, CX - 38, q); y = D.lerp(TY + 4, TY + 52, q); }
        else { const q = D.lisse((k - 0.7) / 0.3); x = D.lerp(CX - 38, cx, q); y = D.lerp(TY + 52, cy, q); }
        const calme = k >= 1 ? 1 : 0;
        return [x + calme * Math.sin(t * 2.1 + m.ph * 4) * 3, y + calme * Math.cos(t * 1.7 + m.ph * 3) * 2, tg > 0.23 ? 1 : 0, 1];
      }
      const e = t - m.tOut;
      let x, y;
      if (e < 0.5) { const q = D.lisse(e / 0.5); x = D.lerp(cx, CX + 36, q); y = D.lerp(cy, TY + 52, q); }
      else if (e < 0.9) { const q = (e - 0.5) / 0.4; x = D.lerp(CX + 36, CX + 52, q); y = D.lerp(TY + 52, TY + m.lane, q); }
      else { x = CX + 52 + (e - 0.9) * 90; y = TY + m.lane; }
      return [x, y, 1, D.borne((938 - x) / 50, 0, 1)];
    }

    // pièces repérées : étiquettes et encadrés, phrase par phrase
    const gris = { fill: "#637285", "font-size": 28, "font-weight": 700 };
    D.lignes(g, 30, 696, ["bouteille", "intermédiaire"], Object.assign({ "font-family": POLICE }, gris), 32);
    D.etiquette(g, CX, 706, "compresseur HP", { "text-anchor": "middle", "font-weight": 700 });
    D.etiquette(g, 958, 640, "moteur électrique", { "text-anchor": "end", "font-size": 28, "font-weight": 700 });
    const labAsp = D.etiquette(g, 190, 204, "aspiration", { "font-weight": 700 });
    const labRef = D.etiquette(g, 700, 204, "refoulement", { "font-weight": 700 });
    const legende = D.el("g", {}, g);
    [[CA, "du compresseur BP", 340], [CB, "de la bouteille", 384]].forEach(([coul, txt, y]) => {
      D.el("circle", { cx: 628, cy: y - 10, r: 12, fill: "rgb(" + coul.join(",") + ")", stroke: D.BLEU, "stroke-opacity": 0.5, "stroke-width": 1.6 }, legende);
      D.etiquette(legende, 654, y, txt, { "font-size": 30, "font-weight": 600 });
    });
    const pFluide = D.pastille(g, 958, 440, "plus de fluide", "#c0392b", 30, "end");
    const contour = D.el("g", {}, g);
    D.el("rect", { x: CX - 96, y: TY + 44, width: 192, height: 200, fill: "none", stroke: "#637285", "stroke-width": 3.5, "stroke-dasharray": "11 8" }, contour);
    D.lignes(contour, 612, 340, ["taille du", "compresseur BP"], { "font-size": 30, fill: "#637285", "font-family": POLICE, "font-weight": 700 }, 34); D.trait(contour, 604, 332, 580, 340);
    const pPetit = D.pastille(g, 958, 440, "moins étalée : plus petit", D.BLEU, 28, "end");
    // phrase 5 : un seul étage / deux étages, deux thermomètres couchés
    const thermos = D.el("g", {}, g);
    [[322, "un seul étage", 266, ROUGE], [404, "deux étages", 112, "#e8914a"]].forEach(([y, txt, l, coul]) => {
      D.etiquette(thermos, 622, y, txt, { "font-size": 30, "font-weight": 700 });
      D.el("rect", { x: 622, y: y + 10, width: 330, height: 26, rx: 13, fill: "#f4f8fc", stroke: ACIER, "stroke-width": 3.5 }, thermos);
      D.el("rect", { x: 626, y: y + 14, width: l + 14, height: 18, rx: 9, fill: coul }, thermos);
      D.el("circle", { cx: 626, cy: y + 23, r: 18, fill: coul, stroke: ACIER, "stroke-width": 3.5 }, thermos);
    });
    [[-30, -17, 30, 17], [-30, 17, 30, -17]].forEach(([x1, y1, x2, y2]) => D.el("line", { x1: 868 + x1, y1: 345 + y1, x2: 868 + x2, y2: 345 + y2, stroke: ROUGE, "stroke-width": 9, "stroke-linecap": "round" }, thermos));
    const flDia = flecheDiagramme(g, 624, 958, 420, ["deux petites", "compressions"]);

    return function (t) {
      nap.maj(t);
      bain(t, (q, b) => [150 + (q - 0.5) * 120, 645, 150 + (q - 0.5) * 120, nap.surface(150, t), 0.9]);
      // le piston : ralenti, aspiration (phrase 3), plein (4), compression (5), puis fixe
      const phi = t >= tc1 ? 6 * PI + (t - tc1) * 0.6 : D.courbe([[0, 0], [ta0, 4 * PI], [ta1, 5 * PI], [tc0, 5 * PI], [tc1, 6 * PI]], t, true);
      const th = phi % TOUR, top = dessus(th), tg = t < tc0 ? 0.22 : t < tc1 ? tempGaz(top) : 0.62;
      piston.setAttribute("transform", "translate(0 " + top.toFixed(1) + ")");
      const px = CX + RV * Math.sin(th), py = CY - RV * Math.cos(th), pinY = top + PIN;
      bielle.forEach(b => { b.setAttribute("x1", CX); b.setAttribute("y1", pinY.toFixed(1)); b.setAttribute("x2", px.toFixed(1)); b.setAttribute("y2", py.toFixed(1)); });
      manet.setAttribute("cx", px.toFixed(1)); manet.setAttribute("cy", py.toFixed(1));
      bras.setAttribute("x2", px.toFixed(1)); bras.setAttribute("y2", py.toFixed(1));
      poids.setAttribute("cx", (CX - 0.55 * RV * Math.sin(th)).toFixed(1)); poids.setAttribute("cy", (CY + 0.55 * RV * Math.cos(th)).toFixed(1));
      boulons.forEach((b, i) => b.setAttribute("cy", (CY + 20 * Math.sin(phi + i * TOUR / 3)).toFixed(1)));
      clapA.setAttribute("transform", "rotate(" + (t > ta0 + 0.1 && t < ta1 + 0.2 ? 26 : 0) + " " + (CX - 62) + " " + (TY + 44) + ")");
      clapR.setAttribute("transform", "rotate(" + (t > tD0 && t < tc1 + 0.3 ? 26 : 0) + " " + (CX + 60) + " " + (TY + 28) + ")");
      tint.setAttribute("fill", D.couleur(tg, true)); tint.setAttribute("fill-opacity", (0.3 * D.lisse((t - ta0) / 0.6) * (t > tc1 + 0.8 ? 0 : 1)).toFixed(2));
      chaud.setAttribute("opacity", (0.4 * D.lisse((t - tD0) / 1.5) * (1 - 0.7 * D.lisse((t - c.E[5]) / 2))).toFixed(2));
      AMB.forEach(m => m.maj(m.x + Math.sin(t * 1.5 + m.ph * 3) * 6, m.y + Math.cos(t * 1.2 + m.ph * 2) * 5, "rgb(" + (m.fam ? CB : CA).join(",") + ")", 1));
      // les molécules : leur couleur est celle de leur famille, puis celle de la vapeur chaude (kc = 1)
      MOL.forEach(m => {
        const [x, y, kc, op] = ou(m, t, top, tg), base = m.fam ? CB : CA;
        m.maj(x, y, mix(base, rgb(D.couleur(Math.max(tg, 0.22), true)), kc * D.borne((tg - 0.22) / 0.1 + (kc === 1 && t > tD0 ? 1 : 0), 0, 1)), op);
      });
      // l'héroïne : elle monte avec les autres, entre, se serre, repart chaude
      const [hx, hy, , op] = ou(MOI, t, top, tg);
      const serre = t > tc0 && t < tD0 + 0.6 ? D.lisse((BDC - top) / 90) : 0;
      const tempH = t < tc0 ? 0.22 : t < tD0 + 0.9 ? tg : 0.62;
      const humeur = t < ta0 ? "sourire" : t < tc0 ? "surprise" : t < c.A(5, 0.82) ? "chaud" : "sourire";
      mila({ x: hx, y: hy, s: 0.5, t: t, temp: tempH, etat: "vapeur", humeur: humeur, ecrase: serre * 0.5, regard: [1, 0], op: Math.min(op, D.fenetre(t, 0, c.D - 0.05, 0.3) + (t < 1 ? 1 : 0)) });
      // textes
      labAsp.setAttribute("opacity", D.fenetre(t, c.T[2] - 0.1, c.E[4] + 0.4, 0.5).toFixed(2));
      labRef.setAttribute("opacity", D.fenetre(t, c.A(5, 0.5), c.D - 0.3, 0.5).toFixed(2));
      const f3 = D.fenetre(t, c.T[3] - 0.1, c.E[3] + 0.5, 0.5), f4 = D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.5, 0.5);
      legende.setAttribute("opacity", f3.toFixed(2)); pFluide.setAttribute("opacity", f3.toFixed(2));
      contour.setAttribute("opacity", f4.toFixed(2)); pPetit.setAttribute("opacity", f4.toFixed(2));
      thermos.setAttribute("opacity", D.fenetre(t, c.A(5, 0.55), c.E[5] + 0.4, 0.5).toFixed(2));
      flDia.setAttribute("opacity", D.fenetre(t, c.T[6] - 0.1, c.D - 0.4, 0.5).toFixed(2)); flDia.glisse(t);
      return { carte: D.courbe([[c.T[2], 15.0], [c.A(2, 0.9), 16.1], [ta0 + 1, 16.9], [tc0, 17.0], [tD0, 17.3], [c.E[5], 17.8], [c.D - 0.4, 18.2]], t, true), temp: tempH, etat: "vapeur", humeur: humeur };
    };
  };

  /* ---------- 7 · le condenseur évaporatif et le réservoir (version ramassée dans x 20 → 965) ----------
     Un serpentin d'acier à quatre rangées, arrosé, dans une carcasse que l'air traverse (ventilateur en cheminée) :
     la vapeur entre en haut à gauche, elle ressort liquide en bas à gauche et tombe dans le réservoir haute pression
     (cuve couchée). Phrase 2 : une carte montre les deux séparateurs d'huile aux refoulements ; 3 : flèche vers le
     diagramme ; 4 : l'héroïne au bas du réservoir, deux flèches qui descendent. */
  S.condenseur = function (g, c) {
    const Y = [292, 358, 424, 490], XL = 490, XR = 770, RB = 33, EAU = "#4fb3c4", SABLE = D.couleur(0.5, false);
    // la route de la molécule : tube d'entrée, quatre rangées, sortie liquide, descente vers le réservoir
    const pts = [[40, Y[0]], [430, Y[0]]], U = [];
    for (let i = 0; i < 4; i++) {
      const dir = i % 2 ? -1 : 1, xs = dir > 0 ? XL : XR, xe = dir > 0 ? XR : XL, ym = (Y[i] + Y[i + 1]) / 2;
      pts.push([xs, Y[i]], [xe, Y[i]]);
      if (i < 3) [-60, -30, 0, 30, 60].forEach(a => { pts.push([xe + dir * RB * Math.cos(a * PI / 180), ym + RB * Math.sin(a * PI / 180)]); if (a === 0) U.push(pts.length - 1); });
    }
    const iSort = pts.length; pts.push([430, Y[3]]);
    const iCoin = pts.length; pts.push([150, Y[3]]);
    const iChute = pts.length; pts.push([150, 610]);
    const ch = chemin(pts, 12), cm = ch.cum, sU = U.map(i => cm[i]), sEnt = cm[1], sSort = cm[iSort], sCoin = cm[iCoin], sChute = cm[iChute];
    const ligne = (a, b) => { const o = []; for (let s = a; s < b; s += 5) o.push(ch.pos(s).map(v => v.toFixed(1)).join(",")); o.push(ch.pos(b).map(v => v.toFixed(1)).join(",")); return o.join(" "); };

    // la carcasse, le bac d'eau, la cheminée du ventilateur
    D.el("rect", { x: 330, y: 220, width: 600, height: 330, rx: 10, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 344, y: 234, width: 572, height: 302, fill: "#eef6fb" }, g);
    D.el("rect", { x: 540, y: 150, width: 180, height: 76, rx: 8, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 554, y: 160, width: 152, height: 66, fill: "#fffdf8" }, g);
    const vent = D.ventilateur(g, 630, 192, 28);
    const bac = D.liquide(g, { x0: 344, x1: 916, yh: 234, yb: 536, niveau: () => 16 / 302, couleur: () => EAU, opacite: 0.85 });
    // le réservoir (cuve couchée) : dessiné avant les tuyaux, qui viennent s'y raccorder
    const cu = D.cuve(g, { x: 40, y: 600, l: 560, h: 150 }); // intérieur x 54-586, y 614-736
    const nap = D.liquide(cu.dedans, { x0: cu.x0, x1: cu.x1, yh: cu.yh, yb: cu.yb, niveau: () => 0.55, couleur: () => SABLE, opacite: 0.86 });
    const SURF = 736 - 0.55 * 122;

    // l'air : des chevrons montent dans les deux couloirs latéraux (derrière le serpentin) et dans la cheminée
    const air = D.el("g", {}, g), AIR = [];
    for (let k = 0; k < 5; k++) [392, 868].forEach((x, j) => AIR.push({ x: x, f: D.frac(k / 5 + j * 0.37), maj: D.chevron(air) }));
    const cheminee = [570, 690].map(x => ({ x: x, maj: D.chevron(air) }));
    const colAir = y => y > 440 ? "#3d7fca" : y > 340 ? "#6b92b8" : "#e8914a";

    // serpentin : pellicule d'eau, tube d'acier, intérieur
    const film = D.el("polyline", { points: ligne(sEnt, sSort), fill: "none", stroke: "#79c3d6", "stroke-width": 64, "stroke-linejoin": "round", opacity: 0 }, g);
    D.el("polyline", { points: ligne(0, sChute), fill: "none", stroke: ACIER, "stroke-width": 50, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: ligne(0, sChute), fill: "none", stroke: "#f6ede4", "stroke-width": 36, "stroke-linejoin": "round" }, g);
    D.el("rect", { x: 28, y: Y[0] - 37, width: 14, height: 74, rx: 3, fill: ACIER }, g);
    const vap = D.el("g", {}, g);
    const tL = SABLE;
    const nappes = [[Y[2], 0.12, 0.42, XL, XR], [Y[3], 0.5, 0.85, XR, XL]].map(([y, a, b, xa, xb]) => D.liquide(g, { x0: XL, x1: XR, yh: y - 18, yb: y + 18, niveau: x => D.lerp(a, b, Math.abs(x - xa) / (XR - XL)), couleur: () => tL, opacite: 0.88 }));
    D.el("polyline", { points: [[XL, Y[3]], [150, Y[3]], [150, 612]].map(p => p.join(",")).join(" "), fill: "none", stroke: tL, "stroke-width": 36, "stroke-linejoin": "round", opacity: 0.88 }, g);
    const filSortie = fil(g, [[XL, Y[3]], [150, Y[3]], [150, 612]], 8, "#fff");
    const rg = D.alea(19), perles = D.el("g", {}, g), PERLES = [];
    for (let i = 0; i < 14; i++) PERLES.push(D.el("circle", { cx: XL + 14 + rg() * (XR - XL - 28), cy: Y[1] + (i % 2 ? 11 : -11), r: 2.5 + rg() * 2, fill: tL, stroke: "#fff", "stroke-width": 1.4 }, perles));
    const V = []; for (let i = 0; i < 16; i++) V.push({ s: i / 16, o: rg() * 2 - 1, maj: D.mol(vap) });

    // les rampes d'arrosage, la pluie qui ruisselle de rangée en rangée
    D.el("polyline", { points: "905,250 400,250", fill: "none", stroke: ACIER, "stroke-width": 12 }, g);
    for (let x = 430; x <= 880; x += 50) D.el("path", { d: "M " + (x - 6) + " 256 L " + (x + 6) + " 256 L " + x + " 266 Z", fill: ACIER }, g);
    const GAP = [[318, 332], [384, 398], [450, 464]], pluie = GAP.map((gp, i) => D.bulles(D.el("g", {}, g), 9, 90 + i, true));

    // le jet de liquide qui tombe dans le réservoir
    const jet = D.el("rect", { x: 138, y: 612, width: 24, fill: SABLE, opacity: 0.85 }, g);
    const rides = [0, 1].map(() => D.el("ellipse", { cy: SURF, ry: 4, fill: "none", stroke: "#fff", "stroke-width": 2.5 }, g));
    // tube plongeur : le liquide repart par le fond
    tuyau(g, [[540, 728], [540, 650], [640, 650]], 40, SABLE, 7);
    D.el("rect", { x: 638, y: 628, width: 14, height: 44, rx: 3, fill: ACIER }, g);
    const mila = D.heroine(g, { r: 30 });

    // étiquettes, phrase par phrase
    D.etiquette(g, 40, 252, "vapeur chaude (HP)", { "font-weight": 700 });
    D.etiquette(g, 40, 458, "liquide (HP)", { "font-weight": 700 });
    const labRa = D.el("g", {}, g); D.etiquette(labRa, 40, 200, "rampes d'arrosage"); D.trait(labRa, 270, 192, 410, 248);
    const labVe = D.etiquette(g, 528, 206, "ventilateur", { "text-anchor": "end" });
    const labRes = D.etiquette(g, 230, 590, "réservoir haute pression", { "font-weight": 700 });
    // phrase 2 : les deux séparateurs d'huile, aux refoulements des compresseurs
    const carte = D.el("g", { "data-layout-allow-overlap": "" }, g);
    D.el("rect", { x: 30, y: 150, width: 910, height: 400, rx: 24, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, carte);
    [[235, "BP", "vers la bouteille", "intermédiaire"], [392, "HP", "vers le condenseur", ""]].forEach(([yc, k, vers, suite]) => {
      tuyau(carte, [[186, yc], [386, yc]], 26, "#e8eef5", 6);
      symboleCompresseur(carte, 150, yc, 36);
      D.etiquette(carte, 150, yc + 92, "compresseur " + k, { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: k === "BP" ? D.BLEU : D.ORANGE });
      const sep = D.cuve(carte, { x: 372, y: yc - 55, l: 96, h: 110, vertical: true });
      D.el("rect", { x: 396, y: yc - 42, width: 8, height: 56, rx: 3, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1.5 }, sep.dedans);
      tuyau(carte, [[462, yc - 30], [640, yc - 30]], 26, "#fbe5d6", 6);
      D.etiquette(carte, 420, yc + 92, "séparateur d'huile", { "text-anchor": "middle", "font-weight": 700, fill: D.BLEU });
      D.etiquette(carte, 660, yc - 20, vers, { "font-size": 30, "font-weight": 600 });
      if (suite) D.etiquette(carte, 660, yc + 16, suite, { "font-size": 30, "font-weight": 600 });
    });
    const pRaconte = D.pastille(carte, 485, 536, "le voyage de l'ammoniac les raconte", D.ORANGE, 28, "middle");
    // phrase 3 : le diagramme ; phrase 4 : redescendre en deux fois
    const flDia = flecheDiagramme(g, 660, 958, 700, ["sur le diagramme :", "je traverse la cloche"], D.ORANGE, 30);
    const descente = D.el("g", {}, g), sd = { "font-size": 30, fill: "#10233c", "font-family": POLICE, "font-weight": 700 };
    [[700, 584, 660], [760, 650, 726]].forEach(([x, y1, y2]) => {
      D.el("line", { x1: x, y1: y1, x2: x, y2: y2 - 26, stroke: D.ORANGE, "stroke-width": 16, "stroke-linecap": "round" }, descente);
      D.el("path", { d: "M " + x + " " + y2 + " L " + (x - 26) + " " + (y2 - 32) + " L " + (x + 26) + " " + (y2 - 32) + " Z", fill: D.ORANGE }, descente);
    });
    D.lignes(descente, 802, 646, ["redescendre", "en deux fois"], sd, 34);

    // sa course
    const sPos = t => D.courbe([[c.T[0] - 0.3, 30], [c.T[0] + 0.8, sEnt], [c.T[0] + 2.0, sU[0]], [c.T[0] + 3.2, sU[1]], [c.T[0] + 4.4, sU[2]], [c.E[0] + 0.1, sSort], [c.T[1] + 1.0, sCoin], [c.T[1] + 2.0, sChute]], t, true);
    const tChute = c.T[1] + 2.0, tPlouf = tChute + 0.55;
    return function (t) {
      const rain = D.lisse((t - c.T[0] - 0.4) / 0.8), tf = Math.max(0, t - c.T[0] - 0.3), ven = D.lisse((t - c.T[0] - 0.2) / 0.6);
      bac.maj(t); nap.maj(t); nappes.forEach(n => n.maj(t));
      film.setAttribute("opacity", (0.55 * rain).toFixed(2));
      pluie.forEach((b, i) => b(t, q => [380 + q * 500, GAP[i][0], GAP[i][1], rain, EAU]));
      vent(520 * (tf < 1.2 ? 1.2 * (D.lerp(0, 1, tf / 1.2) ** 3 - (tf / 1.2) ** 4 / 2) : tf - 0.6));
      AIR.forEach(a => { const f = D.frac(a.f + t * 0.14), y = 532 - f * 280; a.maj(a.x + Math.sin(a.f * 9) * 14, y, 180, colAir(y), ven * D.fenetre(f, 0, 1, 0.1) * 0.9); });
      cheminee.forEach((a, i) => { const f = D.frac(i * 0.5 + t * 0.35); a.maj(a.x, 214 - f * 52, 180, "#e8914a", ven * D.fenetre(f, 0, 1, 0.2) * 0.9); });
      // le liquide s'écoule : filet, jet, rides
      const ecoule = D.lisse((t - c.T[0] - 4.8) / 0.8);
      filSortie(t, 90, ecoule);
      const surf = nap.surface(150, t);
      jet.setAttribute("height", Math.max(0, surf - 612).toFixed(1)); jet.setAttribute("opacity", (0.85 * ecoule).toFixed(2));
      rides.forEach((e, k) => { const f = D.frac(t * 0.8 + k * 0.5); e.setAttribute("cx", 150); e.setAttribute("cy", surf.toFixed(1)); e.setAttribute("rx", (12 + f * 34).toFixed(1)); e.setAttribute("opacity", ((1 - f) * 0.9 * ecoule).toFixed(2)); });
      // la vapeur du serpentin
      const sh = sPos(t), arrive = D.lisse((t - c.T[0] + 0.3) / 0.8);
      const tHer = D.courbe([[0, 0.62], [sU[0], 0.62], [sU[1], 0.58], [sU[2], 0.5], [sCoin, 0.5]], sh, true);
      V.forEach(m => {
        const u = D.frac(m.s + t * 0.06), sv = 60 + u * (sU[1] + 60 - 60), q = ch.pos(sv), n = ch.norm(sv);
        m.maj(q[0] + n[0] * m.o * 8, q[1] + n[1] * m.o * 8, D.courbe([[0, 0.62], [sU[0], 0.62], [sU[1] + 60, 0.58]], sv, true), true, arrive * D.fenetre(u, 0, 1, 0.1));
      });
      const gt = D.lisse((t - c.T[0] - 3.0) / 0.8);
      PERLES.forEach(e => e.setAttribute("opacity", gt.toFixed(2)));
      // l'héroïne : serpentin, puis chute dans le réservoir, flotte, descend vers le fond (phrase 4)
      let x, y, etat, humeur, s = 0.36;
      if (t < tChute) {
        const p = ch.pos(sh); x = p[0]; y = p[1];
        etat = sh < sU[1] ? "vapeur" : sh < sU[2] ? "bout" : "liquide";
        humeur = sh > sU[1] - 50 && sh < sU[2] + 60 ? "surprise" : sh < sU[0] ? "chaud" : "sourire";
      } else {
        etat = "liquide"; humeur = "sourire";
        const k = D.borne((t - tChute) / (tPlouf - tChute), 0, 1);
        if (t < tPlouf) { x = 150; y = D.lerp(612, SURF, k * k); s = D.lerp(0.36, 0.55, k); }
        else {
          const dx = D.courbe([[tPlouf, 150], [c.T[2], 280], [c.E[2], 340], [c.T[4], 380], [c.A(4, 0.7), 472]], t, true);
          const bas = D.lisse((t - c.T[4] - 0.3) / 2.2);
          x = dx; y = D.lerp(nap.surface(dx, t) + 6 + Math.sin(t * 2) * 3, 712, bas); s = D.lerp(0.55, 0.5, bas);
          if (t > c.T[4] + 1.5) humeur = "sourire";
        }
      }
      const temp = t < tChute ? tHer : 0.5, vue = etat === "bout" ? "liquide" : etat;
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: vue, humeur: humeur, regard: [1, 0], op: D.fenetre(t, c.T[0] - 0.5, c.D - 0.1, 0.4) });
      // textes
      const f2 = D.fenetre(t, c.T[2] - 0.1, c.E[2] + 0.5, 0.5);
      labRa.setAttribute("opacity", D.fenetre(t, c.T[0] + 0.2, c.T[0] + 3.0, 0.5).toFixed(2));
      labVe.setAttribute("opacity", D.fenetre(t, c.T[0] + 0.8, c.T[0] + 3.6, 0.5).toFixed(2));
      labRes.setAttribute("opacity", D.lisse((t - c.T[1] + 0.2) / 0.5).toFixed(2));
      carte.setAttribute("opacity", f2.toFixed(2)); carte.setAttribute("display", f2 > 0.01 ? "inline" : "none");
      flDia.setAttribute("opacity", D.fenetre(t, c.T[3] - 0.1, c.E[3] + 0.6, 0.5).toFixed(2)); flDia.glisse(t);
      descente.setAttribute("opacity", D.fenetre(t, c.T[4] - 0.1, c.D - 0.4, 0.5).toFixed(2));
      return { carte: D.courbe([[c.T[0] - 0.3, 18.2], [c.T[0] + 1.2, 19.0], [c.E[0], 19.7], [c.T[1] + 1, 19.95], [tChute + 0.6, 20.3], [c.T[4], 20.45], [c.E[4], 20.9]], t, true), temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ==FIN== */
})();

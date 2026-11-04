/* =====================================================================
   voyage-enthalpie2-scenes-b.js — édition « le diagramme enthalpique, niveau 2 » :
   scènes isentropes (5), isochores (6), releves (7), absolu (8)
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-enthalpie-scenes-c.js : VOYAGE_SCENES[id](g, c) → maj(t),
   c = { T, E, D, A(k, f) }. La scène tient dans x 20 → 965, y 150 → 760 (écran partagé : la colonne de
   droite porte la carte du coin et le diagramme chiffré). Récit : donnees/voyage-enthalpie2.js (l'ORDRE des
   phrases porte les gestes). Brief : voyage-enthalpie2/BRIEF-SCENES.md. Ce fichier ne définit que ses scènes.
   AIDES LOCALES : fleche(), thermo(), multi() (texte à tronçons colorés), cadran(), pince().
   Aucun symbole chargé par chemin : tout est dessiné (le manifold, la pince, les cylindres, le ballon).
   TOUT EST FONCTION DE t : aucune animation CSS, aucun état gardé (sauf le décor posé une fois).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const el = D.el, SANS = "Calibri, Arial, sans-serif";
  const BLEU = "#2f6fb8", AMBRE = "#e8820c", AMBRE_T = "#b35f00", ROUGE = "#c0392b", NUIT = "#10233c", GRIS = "#637285", AIR = "#5b7fa6";
  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const pts = l => l.map(q => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");
  const txt = (p, x, y, s, taille, fill, at) => D.texte(p, x, y, s, Object.assign({ "font-size": taille, fill: fill || NUIT, "font-family": SANS, "font-weight": 700 }, at || {}));
  const MID = { "text-anchor": "middle" }, FIN = { "text-anchor": "end" };
  /* apparition : 0 avant la phrase k, 1 un instant après son début (0 si la phrase n'existe pas) */
  const vu = (c, t, k, delai) => k >= c.T.length ? 0 : D.borne((t - c.T[k] - (delai || 0) + 0.15) / 0.45, 0, 1);
  /* « allumé pendant la phrase k seulement » */
  const seul = (c, t, k) => vu(c, t, k) * (1 - vu(c, t, k + 1));

  function fleche(p, x1, y1, x2, y2, coul, ep) { // flèche pleine, pointe en (x2, y2)
    ep = ep || 8;
    const g = el("g", {}, p), a = Math.atan2(y2 - y1, x2 - x1), L = ep * 2.6, l = ep * 1.5, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
    el("line", { x1: x1, y1: y1, x2: bx, y2: by, stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    el("polygon", { points: pts([[x2, y2], [bx - l * Math.sin(a), by + l * Math.cos(a)], [bx + l * Math.sin(a), by - l * Math.cos(a)]]), fill: coul }, g);
    return g;
  }
  /* tronçons de texte de couleurs différentes : parts = [[texte, couleur], …] */
  function multi(p, x, y, parts, taille, ancre) {
    const t = el("text", { x: x, y: y, "font-size": taille, "font-weight": 700, "font-family": SANS, "text-anchor": ancre || "start" }, p);
    parts.forEach(([s, coul]) => { const ts = el("tspan", { fill: coul }, t); ts.textContent = s; });
    return t;
  }
  /* thermomètre dessiné : tube de y0 (haut) à y1 (bas), bulbe dessous ; renvoie maj(f 0..1) */
  function thermo(p, x, y0, y1) {
    el("rect", { x: x - 14, y: y0, width: 28, height: y1 - y0, rx: 14, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, p);
    const col = el("rect", { x: x - 7, width: 14, fill: ROUGE }, p);
    el("circle", { cx: x, cy: y1 + 22, r: 27, fill: ROUGE, stroke: NUIT, "stroke-width": 3 }, p);
    return f => { const h = 14 + (y1 - y0 - 24) * D.borne(f, 0, 1); col.setAttribute("y", (y1 + 4 - h).toFixed(1)); col.setAttribute("height", (h + 4).toFixed(1)); };
  }
  /* le corps du cylindre : parois, fond, tige et piston (le piston se déplace par maj(yPiston)) */
  function cylindre(p, cx, haut, bas, L) {
    const fond = el("rect", { x: cx - L / 2, y: haut, width: L, height: bas - haut, fill: "#f4f8fc" }, p);
    const dessus = el("g", {}, p);
    return {
      fond: fond, dessus: dessus,
      parois: g => {
        el("rect", { x: cx - L / 2 - 12, y: haut, width: 12, height: bas - haut + 14, rx: 3, fill: "url(#vm-acier-h)" }, g);
        el("rect", { x: cx + L / 2, y: haut, width: 12, height: bas - haut + 14, rx: 3, fill: "url(#vm-acier-h)" }, g);
        el("rect", { x: cx - L / 2 - 12, y: bas, width: L + 24, height: 14, rx: 3, fill: "url(#vm-acier-h)" }, g);
      },
      piston: (g, y) => { // renvoie le groupe, déplacé par translate
        const m = el("g", {}, g);
        el("rect", { x: cx - 8, y: -62, width: 16, height: 66, fill: "url(#vm-acier-h)" }, m);
        el("rect", { x: cx - 44, y: -76, width: 88, height: 18, rx: 6, fill: "url(#vm-noir)" }, m);
        el("rect", { x: cx - L / 2, y: 0, width: L, height: 20, rx: 3, fill: "url(#vm-acier)", stroke: NUIT, "stroke-width": 2 }, m);
        m.setAttribute("transform", "translate(0 " + y + ")");
        return m;
      }
    };
  }
  /* un point sur le chemin d'un réel : avance d'une valeur à l'autre pendant les premières secondes de la phrase */
  function etapes(c, t, cibles) {
    let k = 0;
    for (let m = 0; m < cibles.length; m++) if (t >= c.T[m]) k = m;
    const prev = cibles[Math.max(0, k - 1)], d = Math.min(2, 0.45 * (c.E[k] - c.T[k]));
    return D.lerp(prev, cibles[k], D.lisse((t - c.T[k]) / d));
  }

  /* ======================================================================
     5 — LES ISENTROPES : la compression idéale et la vraie, deux cylindres côte à côte
     ====================================================================== */
  S.isentropes = function (g, c) {
    const HAUT = 340, BAS = 640, L = 150, PMIN = 372, PMAX = 535;
    const unites = [], fan = el("g", {}, g), duo = el("g", {}, g);
    function unite(cx, kApp, vrai) {
      const coque = el("g", {}, g), vie = el("g", {}, g);
      const cy = cylindre(coque, cx, HAUT, BAS, L);
      // la vie (gaz, molécules, héroïne) est entre le fond et le piston : on la pose après le fond
      coque.removeChild(cy.dessus);
      const gaz = el("g", {}, coque);
      const mols = [];
      for (let i = 0; i < 6; i++) mols.push({ m: D.mol(gaz), side: i < 3 ? -1 : 1, v: (i % 3 + 1) / 4, ph: i * 1.7 });
      const mila = D.heroine(gaz, { r: 30 });
      cy.parois(coque);
      const piston = cy.piston(coque, PMIN);
      txt(coque, cx, 262, vrai ? "vrai" : "idéal", 42, vrai ? ROUGE : BLEU, MID);
      const lgn = vrai ? ["avec frottement", "chaleur en plus"] : ["sans frottement", "ni chaleur perdue"];
      txt(vie, cx + (vrai ? 20 : 10), 722, lgn[0], 28, NUIT, MID); txt(vie, cx + (vrai ? 20 : 10), 754, lgn[1], 28, GRIS, MID);
      const tx = vrai ? 925 : 285, maj_th = thermo(vie, tx, 360, 600);
      const marques = [], chal = [];
      if (vrai) {
        for (let i = 0; i < 3; i++) marques.push([-1, 1].map(s => el("line", { stroke: ROUGE, "stroke-width": 4, "stroke-linecap": "round" }, vie)));
        for (let i = 0; i < 3; i++) chal.push(D.chaleur(vie));
      }
      unites.push(function (t) {
        const k0 = c.T[kApp], app = vu(c, t, kApp);
        op(coque, 0.45 + 0.55 * app); op(vie, app);
        const amp = D.lisse((t - k0) / 1.0), u = amp * (0.5 - 0.5 * Math.cos(2 * Math.PI * (t - k0) / 5));
        const yP = D.lerp(PMIN, PMAX, u), haut = yP + 20, milieu = (haut + BAS) / 2;
        piston.setAttribute("transform", "translate(0 " + yP.toFixed(1) + ")");
        mols.forEach(q => {
          const x = cx + q.side * 46 + Math.sin(t * 1.9 + q.ph) * 6, y = D.lerp(haut + 16, BAS - 16, q.v) + Math.cos(t * 2.3 + q.ph) * 5;
          q.m(x - 11, y - 11, vrai ? 0.15 + 0.5 * u : 0.2, true, 1);
        });
        mila({ x: cx, y: milieu, s: 0.68, t: t, temp: vrai ? D.lerp(0.25, 0.7, u) : D.lerp(0.2, 0.38, u), etat: "vapeur", humeur: vrai && t > k0 + 0.4 ? "chaud" : "sourire", ecrase: 0.7 * u, op: app });
        maj_th(vrai ? D.lerp(0.15, 0.82, u) : D.lerp(0.15, 0.42, u));
        if (vrai) {
          marques.forEach((par, i) => par.forEach((e, j) => {
            const x = cx + (j ? 1 : -1) * (L / 2 - 6), y = yP + 28 + i * 9, f = 0.55 + 0.45 * Math.sin(t * 17 + i * 2 + j);
            e.setAttribute("x1", x - 7); e.setAttribute("y1", y + 4); e.setAttribute("x2", x + 7); e.setAttribute("y2", y - 4);
            e.setAttribute("opacity", (app * f * (u > 0.05 ? 1 : 0)).toFixed(2));
          }));
          chal.forEach((m, i) => m(cx + (i - 1) * 46, 658 + 4 * Math.sin(t * 6 + i), 180, app * (0.6 + 0.4 * Math.sin(t * 5 + i))));
        }
      });
    }
    unite(150, 1, false); unite(800, 2, true);
    // la zone du milieu : un éventail de flèches (k0 à k2), puis les deux flèches d'arrivée (k3)
    [[390, 0], [480, 1], [570, 2]].forEach(([x]) => fleche(fan, x, 640, x + 90, 372, AMBRE, 9));
    txt(fan, 480, 700, "les isentropes", 34, AMBRE_T, MID);
    const fl1 = fleche(duo, 420, 640, 500, 372, BLEU, 10), fl2 = fleche(duo, 420, 640, 600, 372, ROUGE, 10);
    txt(duo, 490, 300, "idéal", 32, BLEU, MID); txt(duo, 490, 336, "53 °C", 34, BLEU, MID);
    txt(duo, 612, 300, "vrai", 32, ROUGE, MID); txt(duo, 612, 336, "65 °C", 34, ROUGE, MID);
    txt(duo, 520, 690, "même point de départ", 28, GRIS, MID);
    return function (t) {
      unites.forEach(u => u(t));
      op(fan, 1 - vu(c, t, 3)); op(duo, vu(c, t, 3));
      return { temp: t >= c.T[2] ? 0.6 : 0.3, etat: "vapeur", humeur: t >= c.T[2] ? "chaud" : "sourire" };
    };
  };

  /* ======================================================================
     6 — LES ISOCHORES : la place d'un kilo, puis le volume aspiré
     ====================================================================== */
  S.isochores = function (g, c) {
    const CX = 480, BAS = 700, GR = 300, PE = 120;
    const A = el("g", {}, g), B = el("g", {}, g);
    // ---------- A : les boîtes (k0 → k2) ----------
    const GRILLE = [[0.2, 0.2], [0.5, 0.2], [0.8, 0.2], [0.2, 0.5], [0.8, 0.5], [0.2, 0.8], [0.5, 0.8], [0.8, 0.8]];
    function boite(parent, bas, coul) {
      const r = el("rect", { rx: 8, fill: "#f4f8fc", stroke: coul, "stroke-width": 5 }, parent);
      const mols = GRILLE.map((q, i) => ({ q: q, m: D.mol(parent), ph: i * 1.3 }));
      const mila = D.heroine(parent, { r: 30 });
      return function (t, s, a, humeur) {
        r.setAttribute("x", (CX - s / 2).toFixed(1)); r.setAttribute("y", (bas - s).toFixed(1)); r.setAttribute("width", s.toFixed(1)); r.setAttribute("height", s.toFixed(1));
        mols.forEach(m => m.m(CX + (m.q[0] - 0.5) * s * 0.92 - 11 + Math.sin(t * 1.7 + m.ph) * 5, bas - s + m.q[1] * s - 11 + Math.cos(t * 2.1 + m.ph) * 5, 0.2, true, a));
        mila({ x: CX, y: bas - s / 2, s: 0.5, t: t, temp: 0.2, etat: "vapeur", humeur: humeur || "sourire", op: a });
      };
    }
    const grande = boite(A, BAS, BLEU), PT = el("g", {}, A), petite = boite(PT, 330, ROUGE);
    const ax = el("g", {}, A);
    fleche(ax, 80, 722, 80, 205, NUIT, 7);
    txt(ax, 48, 470, "pression", 30, NUIT, MID).setAttribute("transform", "rotate(-90 48 470)");
    const lgb = el("g", {}, A), lgh = el("g", {}, A);
    txt(lgb, 660, 565, "basse pression", 30, BLEU); txt(lgb, 660, 603, "beaucoup de place", 28, NUIT);
    txt(lgh, 562, 262, "haute pression", 30, ROUGE); txt(lgh, 562, 300, "peu de place", 28, NUIT);
    const unite = el("g", {}, A); D.pastille(unite, 0, 0, "m³ par kg", D.BLEU, 32);
    txt(A, 480, 745, "1 kg de vapeur", 30, NUIT, MID);
    // ---------- B : deux cylindres de même volume (k3) ----------
    const CYL = [{ cx: 250, n: 12, nom: "haute pression", bas: "beaucoup de kilos", coul: ROUGE }, { cx: 710, n: 4, nom: "basse pression", bas: "moins de kilos par tour", coul: BLEU }];
    const mol = [];
    CYL.forEach((q, j) => {
      const cy = cylindre(B, q.cx, 345, 620, 220);
      B.removeChild(cy.dessus);
      const pos = [], al = D.alea(40 + j);
      for (let essai = 0; essai < 900 && pos.length < q.n; essai++) {
        const x = q.cx + (al() - 0.5) * 190, y = 495 + (al() - 0.5) * 200;
        if (Math.hypot(x - q.cx, y - 495) > 52 && pos.every(p => Math.hypot(p[0] - x, p[1] - y) > 34)) pos.push([x, y]);
      }
      pos.forEach((p, i) => mol.push({ m: D.mol(B), x: p[0], y: p[1], ph: i * 1.9 + j }));
      q.mila = D.heroine(B, { r: 30 });
      cy.parois(B); cy.piston(B, 345 - 0);
      txt(B, q.cx, 248, q.nom, 36, q.coul, MID); txt(B, q.cx, 692, q.bas, 30, NUIT, MID);
    });
    txt(B, 480, 478, "même", 30, GRIS, MID); txt(B, 480, 514, "volume", 30, GRIS, MID);

    return function (t) {
      const dans = vu(c, t, 3), rouge = vu(c, t, 2);
      op(A, 1 - dans); op(B, dans);
      op(unite, vu(c, t, 1)); op(ax, rouge); op(lgb, rouge); op(lgh, rouge);
      const osc = 215 + 85 * Math.cos(2 * Math.PI * t / 6), s = D.lerp(osc, GR, rouge);
      grande(t, s, 1, s < 190 ? "surprise" : "sourire");
      petite(t, PE, 1, "sourire"); op(PT, rouge);
      unite.setAttribute("transform", "translate(" + (CX + s / 2 + 14).toFixed(1) + " " + (BAS - s + 36).toFixed(1) + ")");
      CYL.forEach(q => q.mila({ x: q.cx, y: 495, s: 0.62, t: t, temp: 0.2, etat: "vapeur", humeur: "sourire", op: dans }));
      mol.forEach(m => m.m(m.x - 11 + Math.sin(t * 1.8 + m.ph) * 6, m.y - 11 + Math.cos(t * 2.2 + m.ph) * 6, 0.2, true, dans));
      return { temp: 0.2, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* ======================================================================
     7 — LES RELEVÉS : la croix, le manifold, la pince, le tableau des cinq relevés
     ====================================================================== */
  /* un cadran de manomètre : renvoie maj(f 0..1) */
  function cadran(p, cx, cy, r, coul) {
    el("circle", { cx: cx, cy: cy, r: r + 7, fill: "#dfe5ec", stroke: GRIS, "stroke-width": 4 }, p);
    el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: coul, "stroke-width": 5 }, p);
    const ang = f => (135 + 270 * f) * Math.PI / 180;
    for (let i = 0; i <= 10; i++) {
      const a = ang(i / 10), maj = i % 5 === 0;
      el("line", { x1: cx + (r - (maj ? 15 : 9)) * Math.cos(a), y1: cy + (r - (maj ? 15 : 9)) * Math.sin(a), x2: cx + (r - 3) * Math.cos(a), y2: cy + (r - 3) * Math.sin(a), stroke: NUIT, "stroke-width": maj ? 4 : 2.4 }, p);
    }
    const aig = el("line", { x1: cx, y1: cy, stroke: NUIT, "stroke-width": 5, "stroke-linecap": "round" }, p);
    el("circle", { cx: cx, cy: cy, r: 7, fill: NUIT }, p);
    return f => { const a = ang(D.borne(f, 0, 1)); aig.setAttribute("x2", (cx + (r - 14) * Math.cos(a)).toFixed(1)); aig.setAttribute("y2", (cy + (r - 14) * Math.sin(a)).toFixed(1)); };
  }
  /* la pince : une mâchoire (anneau) posée sur le tube et son afficheur, relié par un trait ; renvoie [anneau, afficheur] */
  function pince(p, rx, ry, bx, by, valeur, t1, t2) {
    const anneau = el("circle", { cx: rx, cy: ry, r: 19, fill: "none", stroke: D.ORANGE, "stroke-width": 5, opacity: 0 }, p), b = el("g", { opacity: 0 }, p);
    D.trait(b, t1[0], t1[1], t2[0], t2[1], GRIS);
    el("rect", { x: bx, y: by, width: 190, height: 62, rx: 12, fill: "#1f2d3d" }, b);
    el("rect", { x: bx + 8, y: by + 7, width: 174, height: 48, rx: 6, fill: "#c9e6c3" }, b);
    txt(b, bx + 95, by + 44, valeur, 40, NUIT, MID);
    return [anneau, b];
  }

  S.releves = function (g, c) {
    const X0 = 20, Y0 = 205, L = 560, K = L / 1000, cir = D.circuit(g, X0, Y0, L, false), E = (x, y) => cir.ecran(x, y);
    // les noms des quatre organes, dans le vide de la croix
    txt(g, E(620, 85)[0], 322, "condenseur", 28, D.BLEU, MID);
    txt(g, E(520, 545)[0], 584, "évaporateur", 28, D.BLEU, MID);
    txt(g, 468, 395, "compresseur", 28, D.BLEU, FIN);
    txt(g, 116, 395, "détendeur", 28, D.BLEU);
    // points de la croix
    const S_ = E(800, 545), R_ = E(890, 160), L_ = E(500, 85), BP = E(700, 545), HP = E(890, 300);
    const dBP = el("circle", { cx: BP[0], cy: BP[1], r: 10, fill: BLEU, stroke: "#fff", "stroke-width": 3, opacity: 0 }, g);
    const dHP = el("circle", { cx: HP[0], cy: HP[1], r: 10, fill: ROUGE, stroke: "#fff", "stroke-width": 3, opacity: 0 }, g);
    // ----- le manifold (k0, k1) : deux cadrans, un bloc, deux flexibles -----
    const man = el("g", { opacity: 0 }, g);
    const hose = (d, coul) => { el("path", { d: d, fill: "none", stroke: NUIT, "stroke-width": 14, "stroke-linecap": "round" }, man); el("path", { d: d, fill: "none", stroke: coul, "stroke-width": 8, "stroke-linecap": "round" }, man); };
    hose("M 690 405 C 690 520 520 585 " + (BP[0] + 6) + " " + (BP[1] + 8), "#3d86d6");
    hose("M 850 405 C 850 450 600 445 " + (HP[0] + 8) + " " + (HP[1] + 6), "#e24b3b");
    el("rect", { x: 640, y: 362, width: 260, height: 44, rx: 10, fill: "#3b4a5e" }, man);
    el("circle", { cx: 690, cy: 384, r: 13, fill: "#3d86d6", stroke: NUIT, "stroke-width": 3 }, man); el("circle", { cx: 850, cy: 384, r: 13, fill: "#e24b3b", stroke: NUIT, "stroke-width": 3 }, man);
    const majB = cadran(man, 690, 305, 50, BLEU), majH = cadran(man, 850, 305, 50, ROUGE);
    const lect = el("g", { opacity: 0 }, g);
    txt(lect, 690, 236, "1 bar", 40, BLEU, MID); txt(lect, 850, 236, "9,2 bar", 40, ROUGE, MID);
    const rel = D.pastille(lect, 770, 190, "pressions relatives", D.BLEU, 28, "middle");
    // ----- le technicien (silhouette, tourné vers la gauche) et la pince au repos -----
    const tec = el("g", { transform: "translate(1010 393) scale(-0.9 0.9)" }, g);
    el("rect", { x: 74, y: 332, width: 20, height: 64, rx: 7, fill: "#3b4a5e" }, tec); el("rect", { x: 98, y: 332, width: 20, height: 64, rx: 7, fill: "#3b4a5e" }, tec);
    el("rect", { x: 66, y: 238, width: 60, height: 108, rx: 20, fill: "#4d7cb5" }, tec);
    el("line", { x1: 116, y1: 262, x2: 168, y2: 286, stroke: "#4d7cb5", "stroke-width": 16, "stroke-linecap": "round" }, tec);
    el("circle", { cx: 172, cy: 288, r: 9, fill: "#e8c5a0" }, tec); el("circle", { cx: 96, cy: 210, r: 24, fill: "#e8c5a0" }, tec);
    el("path", { d: "M 70 208 A 26 26 0 0 1 122 208 Z", fill: "#e8a317" }, tec); el("rect", { x: 64, y: 206, width: 64, height: 8, rx: 4, fill: "#e8a317" }, tec);
    const repos = el("g", {}, g);
    el("circle", { cx: 770, cy: 620, r: 26, fill: "none", stroke: D.ORANGE, "stroke-width": 7 }, repos);
    el("rect", { x: 790, y: 604, width: 54, height: 36, rx: 8, fill: "#3b4a5e" }, repos); el("rect", { x: 798, y: 611, width: 38, height: 22, rx: 4, fill: "#c9e6c3" }, repos);
    txt(repos, 800, 686, "pince", 30, NUIT, MID);
    // ----- les trois pinces : aspiration (dessous), refoulement (à droite), sortie du condenseur (dessus) -----
    const pS = pince(g, S_[0], S_[1], 420, 548, "−3 °C", [S_[0], S_[1] + 19], [S_[0], 548]);
    const pR = pince(g, R_[0], R_[1], 556, 262, "65 °C", [R_[0] + 19, R_[1]], [556, R_[1]]);
    const pL = pince(g, L_[0], L_[1], 120, 150, "35 °C", [L_[0], L_[1] - 19], [L_[0], 212]);
    // ----- le tableau des cinq relevés (k5) -----
    const tab = el("g", { opacity: 0 }, g), LIG = [];
    el("rect", { x: 602, y: 205, width: 358, height: 340, rx: 16, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, tab);
    txt(tab, 781, 245, "les cinq relevés", 34, D.BLEU, MID);
    [["BP", "1 bar", BLEU, "dot", BP], ["HP", "9,2 bar", ROUGE, "dot", HP], ["aspiration", "−3 °C", AMBRE_T, "ring", S_], ["refoulement", "65 °C", AMBRE_T, "ring", R_], ["sortie condenseur", "35 °C", AMBRE_T, "ring", L_]].forEach(([nom, val, coul, forme, pt], i) => {
      const y = 292 + i * 48, r = el("g", { opacity: 0 }, tab);
      if (forme === "dot") el("circle", { cx: 626, cy: y - 10, r: 10, fill: coul, stroke: "#fff", "stroke-width": 2 }, r);
      else el("circle", { cx: 626, cy: y - 10, r: 10, fill: "none", stroke: D.ORANGE, "stroke-width": 5 }, r);
      txt(r, 646, y, nom, 28, NUIT); txt(r, 948, y, val, 30, coul, FIN);
      const echo = el("circle", { cx: pt[0], cy: pt[1], r: 28, fill: "none", stroke: D.ORANGE, "stroke-width": 5, opacity: 0 }, g);
      LIG.push({ r: r, echo: echo });
    });
    txt(tab, 781, 528, "BP, HP : pressions relatives", 28, GRIS, MID);
    const mila = D.heroine(g, { r: 30 });
    const CIBLE = [14.5, 14.5, 16.35, 19.0, 22.5, 29.5], TEMP = [0.12, 0.12, 0.12, 0.75, 0.45, 0.12];

    return function (t) {
      // k0 : le manifold, la pince au repos ; k1 : les deux pressions ; le manifold s'efface quand les pinces arrivent
      const m0 = vu(c, t, 0), m1 = vu(c, t, 1), m2 = vu(c, t, 2);
      op(man, m0 * (1 - m2)); op(dBP, m0); op(dHP, m0);
      op(lect, m1 * (1 - m2));
      const f1 = D.lisse((t - c.T[1] - 0.2) / ((c.E[1] - c.T[1]) * 0.5));
      majB(0.1 * f1 + 0.01 * Math.sin(t * 40) * (1 - f1)); majH(0.31 * f1 + 0.01 * Math.sin(t * 40) * (1 - f1));
      op(repos, m0 * (1 - m2));
      [pS, pR, pL].forEach(([an, bo], i) => { const v = vu(c, t, 2 + i); op(an, v); op(bo, v * (1 - vu(c, t, 5))); });
      op(tab, vu(c, t, 5));
      LIG.forEach((q, i) => {
        const d = c.T[5] + 0.4 + i * 0.7;
        op(q.r, D.borne((t - d + 0.15) / 0.4, 0, 1));
        const e = (t - d) / 1.3;
        q.echo.setAttribute("r", (20 + 14 * D.borne(e, 0, 1)).toFixed(1)); op(q.echo, e > 0 && e < 1 ? 1 - e : 0);
      });
      // l'héroïne suit les relevés sur la croix
      let k = 0; for (let m = 0; m < CIBLE.length; m++) if (t >= c.T[m]) k = m;
      const fa = D.lisse((t - c.T[k]) / Math.min(2, 0.45 * (c.E[k] - c.T[k]))), temp = D.lerp(TEMP[Math.max(0, k - 1)], TEMP[k], fa);
      const etat = k === 4 ? "liquide" : k === 5 ? "bout" : "vapeur", humeur = k === 3 ? "chaud" : "sourire";
      const [px, py] = E(...D.circuitPoint(etapes(c, t, CIBLE)));
      mila({ x: px, y: py, s: 0.7, t: t, temp: temp, etat: etat, humeur: humeur });
      return { temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ======================================================================
     8 — PASSER EN ABSOLU : +1 bar, les deux isobares, les températures de saturation, surchauffe, sous-refroidissement
     ====================================================================== */
  const CLOCHE_G = [[0.12, 0], [0.14, 0.18], [0.2, 0.4], [0.3, 0.62], [0.45, 0.86], [0.62, 0.97]];
  const CLOCHE_D = [[0.62, 0.97], [0.72, 0.88], [0.78, 0.68], [0.8, 0.42], [0.8, 0.2], [0.78, 0]];
  S.absolu = function (g, c) {
    // ---- le tableau des relevés, en petit, en haut à gauche ----
    const tab = el("g", {}, g);
    el("rect", { x: 28, y: 158, width: 296, height: 192, rx: 14, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 3 }, tab);
    const LIG = [["BP", "1 bar", BLEU, [1, 3]], ["HP", "9,2 bar", ROUGE, [1, 4]], ["aspiration", "−3 °C", AMBRE_T, [5]], ["refoulement", "65 °C", AMBRE_T, []], ["condenseur", "35 °C", AMBRE_T, [6]]].map(([nom, val, coul, ph], i) => {
      const y = 196 + i * 34, lum = el("rect", { x: 34, y: y - 26, width: 284, height: 33, rx: 8, fill: "#ffe9a8", opacity: 0 }, tab);
      txt(tab, 44, y, nom, 28, NUIT); txt(tab, 312, y, val, 28, coul, FIN);
      return { lum: lum, ph: ph };
    });
    // ---- k0, k1 : la pression de l'air, puis les deux additions (bande du haut, ballon en bas) ----
    const air = el("g", {}, g), t0 = el("g", {}, g), t1 = el("g", {}, g);
    const BX = 645, BY = 565;
    el("circle", { cx: BX, cy: BY, r: 88, fill: "#e4f1fb", stroke: AIR, "stroke-width": 6 }, air);
    const flg = el("g", {}, air), flE = [];
    for (let i = 0; i < 8; i++) flE.push(el("g", {}, flg));
    const milaA = D.heroine(g, { r: 30 });
    txt(t0, 645, 238, "la pression de l'air", 40, NUIT, MID); txt(t0, 645, 300, "environ 1 bar", 48, AIR, MID);
    multi(t1, 645, 258, [["1", BLEU], [" + 1", AMBRE_T], [" = 2 bar abs", BLEU]], 46, "middle");
    multi(t1, 645, 336, [["9,2", ROUGE], [" + 1", AMBRE_T], [" = 10,2 bar abs", ROUGE]], 46, "middle");
    // ---- k2 → : le repère (pression absolue en haut, enthalpie à droite) ----
    const px0 = 80, py0 = 395, W = 450, H = 330, X = u => px0 + u * W, Y = v => py0 + H - v * H;
    const plan = el("g", {}, g), cloche = el("g", {}, g);
    el("path", { d: "M " + pts(CLOCHE_G.concat(CLOCHE_D.slice(1)).map(([u, v]) => [X(u), Y(v)])).replace(/ /g, " L "), fill: "rgba(47,111,184,.10)", stroke: BLEU, "stroke-width": 4 }, cloche);
    el("path", { d: "M " + px0 + " " + (py0 + H + 4) + " V " + (py0 - 10) + " m -8 13 l 8 -13 l 8 13", fill: "none", stroke: NUIT, "stroke-width": 4 }, plan);
    el("path", { d: "M " + (px0 - 4) + " " + (py0 + H) + " H " + (px0 + W + 12) + " m -13 -8 l 13 8 l -13 8", fill: "none", stroke: NUIT, "stroke-width": 4 }, plan);
    txt(plan, px0 + 16, 392, "pression absolue", 28, NUIT); txt(plan, px0 + W / 2, 752, "h : énergie de 1 kg", 28, NUIT, MID);
    const BPv = 0.22, HPv = 0.62, uBPg = 0.151, uBPd = 0.8, uHPg = 0.3, uHPd = 0.785;
    const lBP = el("g", {}, g), lHP = el("g", {}, g);
    [[lBP, BPv, BLEU, "BP 2 bar abs", "−10 °C", "évaporation", uBPg, uBPd, 0.3], [lHP, HPv, ROUGE, "HP 10,2 bar abs", "40 °C", "condensation", uHPg, uHPd, 0.85]].forEach(([gr, v, coul, nom, tmp, cap, ug, ud, niv]) => {
      el("line", { x1: px0, y1: Y(v), x2: 730, y2: Y(v), stroke: coul, "stroke-width": 4 }, gr);
      txt(gr, 452, Y(v) - 9, nom, 28, coul);
      const seg = el("g", { opacity: 0 }, gr);
      el("line", { x1: X(ug), y1: Y(v), x2: X(ud), y2: Y(v), stroke: coul, "stroke-width": 11, "stroke-linecap": "round", opacity: 0.55 }, seg);
      [ug, ud].forEach(u => el("circle", { cx: X(u), cy: Y(v), r: 9, fill: NUIT, stroke: "#fff", "stroke-width": 3 }, seg));
      const th = el("g", { opacity: 0 }, gr), ty = Y(v);
      el("rect", { x: 739, y: ty - 66, width: 18, height: 56, rx: 9, fill: "#fff", stroke: NUIT, "stroke-width": 3 }, th);
      el("rect", { x: 744, y: ty - 6 - 50 * niv, width: 8, height: 50 * niv + 6, fill: ROUGE }, th);
      el("circle", { cx: 748, cy: ty, r: 15, fill: ROUGE, stroke: NUIT, "stroke-width": 3 }, th);
      txt(th, 775, ty - 10, tmp, 46, coul); txt(th, 775, ty + 32, cap, 28, NUIT);
      gr.seg = seg; gr.th = th;
    });
    const milaB = D.heroine(g, { r: 30 });
    // ---- k5, k6 : les réglettes (bande du haut) ----
    function reglette(a, b, haut, coul, gA, gB, sA, sB) {
      const r = el("g", {}, g), x0 = 420, x1 = 860, n = b - a;
      el("rect", { x: x0, y: 262, width: x1 - x0, height: 30, rx: 6, fill: "#fff", stroke: NUIT, "stroke-width": 4 }, r);
      el("rect", { x: x0 + 3, y: 265, width: x1 - x0 - 6, height: 24, rx: 4, fill: coul, opacity: 0.4 }, r);
      for (let i = 0; i <= n; i++) el("line", { x1: x0 + (x1 - x0) * i / n, y1: 262, x2: x0 + (x1 - x0) * i / n, y2: 292, stroke: NUIT, "stroke-width": 3 }, r);
      el("path", { d: "M " + x0 + " 250 V 232 H " + x1 + " V 250", fill: "none", stroke: coul, "stroke-width": 5, "stroke-linejoin": "round" }, r);
      txt(r, (x0 + x1) / 2, 206, haut, 42, coul, MID);
      txt(r, x0, 332, gA, 34, NUIT, MID); txt(r, x1, 332, gB, 34, NUIT, MID);
      txt(r, x0, 370, sA, 28, GRIS, MID); txt(r, x1, 370, sB, 28, GRIS, MID);
      return r;
    }
    const reg1 = reglette(-10, -3, "7 K de surchauffe", AMBRE_T, "−10 °C", "−3 °C", "évaporation", "aspiration");
    const reg2 = reglette(35, 40, "5 K de sous-refroidissement", BLEU, "35 °C", "40 °C", "à la sortie", "condensation");

    return function (t) {
      // tableau : lignes allumées pendant les phrases qui les utilisent
      LIG.forEach(q => op(q.lum, q.ph.reduce((m, k) => Math.max(m, seul(c, t, k)), 0)));
      // air, additions
      const a0 = vu(c, t, 0), a1 = vu(c, t, 1), a2 = vu(c, t, 2);
      op(air, a0 * (1 - a2)); op(t0, a0 * (1 - a1)); op(t1, a1 * (1 - vu(c, t, 5)));
      for (let i = 0; i < 8; i++) { // les flèches de l'air poussent vers le ballon
        const a = i * Math.PI / 4, d = 100 + 8 * Math.sin(t * 3 + i * 0.7), e = flE[i];
        e.innerHTML = "";
        fleche(e, BX + Math.cos(a) * (d + 64), BY + Math.sin(a) * (d + 64), BX + Math.cos(a) * d, BY + Math.sin(a) * d, AIR, 7);
      }
      milaA({ x: BX, y: BY, s: 0.8, t: t, temp: 0.12, etat: "vapeur", humeur: "sourire", op: a0 * (1 - a2) });
      // repère, isobares
      op(plan, a2); op(lBP, a2); op(lHP, vu(c, t, 2, 0.35));
      op(cloche, vu(c, t, 3));
      op(lBP.seg, seul(c, t, 3) + vu(c, t, 4) * 0.45); op(lBP.th, vu(c, t, 3));
      op(lHP.seg, vu(c, t, 4)); op(lHP.th, vu(c, t, 4));
      const mb = vu(c, t, 3), h4 = D.lisse((t - c.T[4]) / 0.9);
      milaB({ x: D.lerp(X(0.475), X(0.54), h4), y: D.lerp(Y(BPv), Y(HPv), h4), s: 0.72, t: t, temp: D.lerp(0.05, 0.55, h4), etat: "bout", humeur: "sourire", op: mb });
      op(reg1, seul(c, t, 5)); op(reg2, seul(c, t, 6));
      return { temp: 0.12, etat: "vapeur", humeur: "sourire" };
    };
  };
})();

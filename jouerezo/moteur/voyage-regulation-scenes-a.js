/* =====================================================================
   voyage-regulation-scenes-a.js — le voyage, la centrale, le bilan de
   vapeur, la consigne, la zone neutre (édition « la régulation d'une
   centrale »)
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (c = { T, E, D, A(k, f), film, recit } ; maj(t) rend { temp, etat, humeur,
   diag?, diag0?, calques? }). Les gestes sont accrochés au RANG des phrases
   du récit donnees/voyage-regulation.js : ajouter une phrase décale tout.
   Écran partagé : la scène tient dans x 20 → 965, y 150 → 760 (les courbes
   de la régulation occupent la droite). La centrale est celle de
   D.vueCentrale, l'armoire celle de D.armoire (voyage-regulation-dessin.js).
   COURBES ET SCÈNE RACONTENT LA MÊME CHOSE : quand la scène montre des
   compresseurs, elle les allume avec D.regul(w).marche, w étant aussi ce
   qu'elle rend en `diag`. ATTENTION : toujours D.regul(w, diag0) (à w = 10
   pile, l'épisode « bilan » finit et « journée » commence).
   ÉCARTS ASSUMÉS AU BRIEF (à relire) :
     · bilan : w n'est pas D.temps(c, t, 0, 10, 2, 5) mais une courbe par
       morceaux, pour que la MONTÉE de la basse pression tombe dans la phrase 2
       (« la basse pression monte ») et la DESCENTE dans la phrase 3 (« elle
       baisse ») ; avec D.temps la montée arrivait une phrase trop tard.
       Fin à w = 10 dès la fin de la phrase 4 (« sur la courbe… »).
     · intro : les courbes ne sont rendues que pendant la phrase 5.
   PIÈGE : fonction pure de t — jamais d'état gardé d'une image à l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const POL = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const BP = "#2f6fb8", HPC = D.ORANGE, VERT = "#2ecc71", ROUGE = "#e74c3c", ENCRE = "#10233c", GRIS = "#637285", SARCELLE = "#1e7e8c";
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (t, a, b) => D.fenetre(t, a, b + 0.4, 0.4);     // visible de a à b (fondu de 0,4 s)
  const surv = (t, a, du) => D.lisse((t - a) / (du || 0.5));    // apparaît à a, et reste
  const lieu = (X, Y, K) => (lx, ly) => [X + lx * K, Y + ly * K]; // repère d'une vue commune → scène
  const groupe = (p, at) => D.el("g", Object.assign({ opacity: 0 }, at || {}), p);
  const lab = (p, x, y, s, at) => D.etiquette(p, x, y, s, Object.assign({ "font-size": 30, "font-weight": 700, fill: D.BLEU }, at || {}));
  const pas = (p, x, y, s, fond, taille, ancre) => { const q = D.pastille(p, x, y, s, fond, taille || 32, ancre || "middle"); q.setAttribute("opacity", 0); return q; };
  const integre = (f, t) => { let a = 0; for (let u = 0; u < t; u += 0.1) a += f(u) * Math.min(0.1, t - u); return a; };
  const bpDe = (w, w0) => D.regul(w, w0).valeur;
  const dens = v => D.borne((v + 2.1) / 4, 0, 1);

  /* ---------- petites briques locales ---------- */
  /* grosse flèche d'épaisseur variable : (x1, y1) → (x2, y2) */
  function fleche(p, coul) {
    const e = D.el("path", { fill: coul, stroke: "#fff", "stroke-width": 2.5, "stroke-linejoin": "round", opacity: 0 }, p);
    return function (x1, y1, x2, y2, ep, op) {
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
      const a = ep / 2, b = ep * 0.8 + 10, h = Math.min(L * 0.55, ep * 0.9 + 22), bx = x2 - ux * h, by = y2 - uy * h;
      const q = (x, y, m) => (x + nx * m).toFixed(1) + " " + (y + ny * m).toFixed(1);
      e.setAttribute("d", "M " + q(x1, y1, a) + " L " + q(bx, by, a) + " L " + q(bx, by, b) + " L " + x2.toFixed(1) + " " + y2.toFixed(1) +
        " L " + q(bx, by, -b) + " L " + q(bx, by, -a) + " L " + q(x1, y1, -a) + " Z");
      opa(e, op);
    };
  }
  /* fil en pointillés avec des points qui courent du premier point au dernier */
  function fil(p, pts, coul, nb) {
    const g = groupe(p), segs = [];
    let L = 0;
    for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(l); L += l; }
    D.el("polyline", { points: pts.map(q => q.join(",")).join(" "), fill: "none", stroke: coul, "stroke-width": 3.5, "stroke-dasharray": "3 8", "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    const pts_ = []; for (let i = 0; i < (nb || 3); i++) pts_.push(D.el("circle", { r: 7, fill: coul, stroke: "#fff", "stroke-width": 2 }, g));
    const en = f => { let d = f * L; for (let i = 0; i < segs.length; i++) { if (d <= segs[i]) { const u = segs[i] ? d / segs[i] : 0; return [D.lerp(pts[i][0], pts[i + 1][0], u), D.lerp(pts[i][1], pts[i + 1][1], u)]; } d -= segs[i]; } return pts[pts.length - 1]; };
    return { g: g, maj: function (t, op) { opa(g, op); pts_.forEach((c, i) => { const [x, y] = en(D.frac(t * 0.4 + i / pts_.length)); c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); }); } };
  }
  /* thermomètre : axe x, tube de y à y + h, bulbe dessous */
  function thermo(p, x, y, h) {
    const g = D.el("g", {}, p), by = y + h + 8;
    D.el("rect", { x: x - 11, y: y, width: 22, height: h + 6, rx: 11, fill: "#fff", stroke: D.BLEU, "stroke-width": 3.5 }, g);
    D.el("circle", { cx: x, cy: by, r: 21, fill: "#fff", stroke: D.BLEU, "stroke-width": 3.5 }, g);
    D.el("circle", { cx: x, cy: by, r: 17, fill: "#fff" }, g);
    const bulbe = D.el("circle", { cx: x, cy: by, r: 14, fill: BP }, g), col = D.el("rect", { x: x - 5.5, width: 11, rx: 5.5, fill: BP }, g);
    for (let k = 1; k <= 4; k++) D.el("line", { x1: x + 14, y1: y + 6 + k * (h - 12) / 5, x2: x + 22, y2: y + 6 + k * (h - 12) / 5, stroke: GRIS, "stroke-width": 2.5 }, g);
    return { g: g, maj: function (n, coul) {
      const hh = D.borne(n, 0, 1) * (h - 18) + 8, yy = y + h - hh;
      col.setAttribute("y", yy.toFixed(1)); col.setAttribute("height", (by - yy).toFixed(1)); col.setAttribute("fill", coul); bulbe.setAttribute("fill", coul);
    } };
  }
  /* un meuble de vente en façade, de (x, y), l × h : « laitiers » | « charcuterie » | « chambre » */
  function meuble(p, x, y, l, h, genre) {
    const g = D.el("g", {}, p), ix = x + 10, iw = l - 20, iy = y + 10, ih = h - 20;
    D.el("rect", { x: x, y: y, width: l, height: h, rx: 14, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: ix, y: iy, width: iw, height: ih, rx: 8, fill: "#e8f3fb" }, g);
    if (genre === "chambre") {
      D.el("rect", { x: ix + 8, y: iy + 8, width: iw - 16, height: ih - 16, rx: 6, fill: "#cfe2f1", stroke: "#8aa6bf", "stroke-width": 3 }, g);
      D.el("line", { x1: ix + iw / 2, y1: iy + 8, x2: ix + iw / 2, y2: iy + ih - 8, stroke: "#8aa6bf", "stroke-width": 3 }, g);
      [-1, 1].forEach(s => D.el("rect", { x: ix + iw / 2 + s * 14 - 4, y: iy + ih / 2 - 24, width: 8, height: 48, rx: 4, fill: "url(#vm-noir)" }, g));
      const cai = ["#e8a95e", "#9cc7ec", "#c9e0a5", "#e8a95e", "#f1c9a0", "#9cc7ec"];
      [0, 1].forEach(r => [0, 1, 2].forEach(k => { const cx0 = ix + 16 + k * (iw - 32) / 3, cy0 = iy + ih - 24 - r * 22 - 16; if (k !== 1 || r === 0) D.el("rect", { x: cx0, y: cy0 + 12, width: (iw - 32) / 3 - 6, height: 18, rx: 3, fill: cai[(k + r * 3) % 6], stroke: "rgba(16,35,60,.35)", "stroke-width": 2 }, g); }));
    } else {
      const rh = ih / 3, cou = genre === "laitiers" ? ["#ffffff", "#ffd86b", "#9cc7ec", "#ffffff", "#f4a6b8"] : ["#c8575d", "#e79aa0", "#9c3d44"], n = genre === "laitiers" ? 5 : 3;
      for (let r = 0; r < 3; r++) {
        const yb = iy + (r + 1) * rh - 7;
        D.el("rect", { x: ix + 4, y: yb, width: iw - 8, height: 5, rx: 2, fill: "#9aa7b5" }, g);
        for (let k = 0; k < n; k++) {
          const cx0 = ix + 8 + k * (iw - 16) / n, w1 = (iw - 16) / n - 6;
          if (genre === "laitiers") { D.el("rect", { x: cx0, y: yb - 32, width: Math.min(w1, 24), height: 32, rx: 4, fill: cou[(k + r) % 5], stroke: "rgba(16,35,60,.35)", "stroke-width": 1.5 }, g); D.el("rect", { x: cx0, y: yb - 32, width: Math.min(w1, 24), height: 9, rx: 3, fill: BP }, g); }
          else D.el("rect", { x: cx0, y: yb - 20, width: w1, height: 20, rx: 10, fill: cou[(k + r) % 3], stroke: "rgba(16,35,60,.35)", "stroke-width": 1.5 }, g);
        }
      }
    }
    D.el("path", { d: "M " + (ix + 14) + " " + (iy + 4) + " L " + (ix + 54) + " " + (iy + 4) + " L " + (ix + 26) + " " + (iy + ih - 4) + " L " + (ix + 14) + " " + (iy + ih - 4) + " Z", fill: "#fff", opacity: 0.28 }, g);
    return g;
  }
  /* bouton de réglage : v de −1 (à gauche) à +1 (à droite, vers le haut) */
  function bouton(p, cx, cy, r) {
    const g = D.el("g", {}, p);
    D.el("circle", { cx: cx, cy: cy, r: r + 8, fill: "url(#vm-acier)" }, g);
    D.el("circle", { cx: cx, cy: cy, r: r, fill: "#e9edf1", stroke: "#56636f", "stroke-width": 3 }, g);
    for (let k = 0; k <= 10; k++) {
      const a = (-110 + k * 22) * Math.PI / 180, f = k / 10;
      D.el("line", { x1: cx + Math.sin(a) * r * 0.72, y1: cy - Math.cos(a) * r * 0.72, x2: cx + Math.sin(a) * r * 0.9, y2: cy - Math.cos(a) * r * 0.9, stroke: D.couleur(0.05 + 0.85 * f, false), "stroke-width": 5, "stroke-linecap": "round" }, g);
    }
    const aig = D.el("g", {}, g);
    D.el("path", { d: "M -8 8 L 0 " + (-r * 0.74) + " L 8 8 Z", fill: ENCRE }, aig);
    D.el("circle", { r: 11, fill: ENCRE }, aig);
    return v => aig.setAttribute("transform", "translate(" + cx + " " + cy + ") rotate(" + (D.borne(v, -1, 1) * 110).toFixed(1) + ")");
  }
  /* compteur électrique : boîte 120 × 100 à disque tournant (la légende se pose à côté) */
  function compteur(p, x, y) {
    const g = D.el("g", {}, p);
    D.el("rect", { x: x, y: y, width: 120, height: 100, rx: 14, fill: "#e9edf1", stroke: "#56636f", "stroke-width": 3 }, g);
    D.el("rect", { x: x + 14, y: y + 14, width: 92, height: 72, rx: 8, fill: ENCRE }, g);
    D.el("circle", { cx: x + 60, cy: y + 50, r: 29, fill: "#d9dee4", stroke: "#fff", "stroke-width": 2 }, g);
    const disque = D.el("g", {}, g);
    D.el("line", { x1: 0, y1: 0, x2: 0, y2: -26, stroke: ROUGE, "stroke-width": 7, "stroke-linecap": "round" }, disque);
    D.el("circle", { r: 6, fill: ENCRE }, disque);
    return a => disque.setAttribute("transform", "translate(" + (x + 60) + " " + (y + 50) + ") rotate(" + (a % 360).toFixed(1) + ")");
  }
  /* un symbole de compresseur avec sa lampe et sa flèche qui tourne : maj(marche, t) */
  function compSym(p, x, y, l, h) {
    const g = D.el("g", {}, p), corps = D.el("g", {}, g);
    D.image(corps, "compresseur", x, y, l, h);
    const lampe = D.el("circle", { cx: x + l / 2, cy: y + h + 24, r: 14, stroke: ENCRE, "stroke-width": 3 }, g);
    const tourne = D.el("path", { d: "M 18 0 A 18 18 0 1 1 0 -18 m -7 -6 l 7 6 l -7 6", fill: "none", stroke: VERT, "stroke-width": 5, "stroke-linecap": "round" }, g);
    return { g: g, maj: function (on, t) {
      corps.setAttribute("transform", on ? "translate(" + (Math.sin(t * 70) * 1.6).toFixed(2) + " 0)" : "");
      corps.setAttribute("opacity", on ? 1 : 0.5);
      lampe.setAttribute("fill", on ? VERT : "#9aa7b5");
      tourne.setAttribute("transform", "translate(" + (x + l / 2 + 42) + " " + (y + h + 24) + ") scale(0.8) rotate(" + ((t * 300) % 360).toFixed(1) + ")");
      tourne.setAttribute("opacity", on ? 1 : 0);
    } };
  }
  /* colonne de pression : x, y, l, h ; échelle vmin → vmax ; bande lo → hi (facultative) ; niveau maj(v) */
  function colonne(p, x, y, l, h, vmin, vmax, lo, hi) {
    const g = D.el("g", {}, p), Y = v => y + h - (v - vmin) / (vmax - vmin) * h;
    D.el("rect", { x: x, y: y, width: l, height: h, rx: 16, fill: "#f4f8fc", stroke: GRIS, "stroke-width": 3 }, g);
    const bande = lo === undefined ? null : D.el("rect", { x: x + 3, y: Y(hi), width: l - 6, height: Y(lo) - Y(hi), fill: "rgba(47,111,184,.16)" }, g);
    const niv = D.el("rect", { x: x + 5, width: l - 10, rx: 8, fill: BP, "fill-opacity": 0.5 }, g);
    const nl = D.el("line", { x1: x + 4, x2: x + l - 4, stroke: ENCRE, "stroke-width": 5, "stroke-linecap": "round" }, g);
    const pointe = D.el("path", { stroke: "#fff", "stroke-width": 2 }, g);
    return { g: g, Y: Y, bande: bande,
      trait: (v, coul, dash, x2) => D.el("line", { x1: x - 2, y1: Y(v), x2: x2 === undefined ? x + l + 14 : x2, y2: Y(v), stroke: coul, "stroke-width": 3.5, "stroke-dasharray": dash, "stroke-linecap": "round" }, g),
      maj: function (v) {
        const yv = Y(D.borne(v, vmin + 0.05, vmax - 0.05));
        niv.setAttribute("y", yv.toFixed(1)); niv.setAttribute("height", Math.max(1, y + h - 5 - yv).toFixed(1));
        nl.setAttribute("y1", yv.toFixed(1)); nl.setAttribute("y2", yv.toFixed(1));
        pointe.setAttribute("d", "M " + (x + l + 3) + " " + yv.toFixed(1) + " L " + (x + l + 21) + " " + (yv - 11).toFixed(1) + " L " + (x + l + 21) + " " + (yv + 11).toFixed(1) + " Z");
        pointe.setAttribute("fill", lo === undefined ? D.BLEU : v > hi ? HPC : v < lo ? SARCELLE : D.BLEU);
      } };
  }
  /* un moteur (boîte de 232 × 132 de (x, y)) */
  function moteur(p, x, y) {
    const g = D.el("g", {}, p);
    D.el("rect", { x: x, y: y + 20, width: 200, height: 100, rx: 30, fill: "url(#vm-acier)" }, g);
    D.el("rect", { x: x, y: y + 20, width: 200, height: 100, rx: 30, fill: "rgba(70,110,80,.32)" }, g);
    for (let k = 0; k < 6; k++) D.el("line", { x1: x + 34 + k * 26, y1: y + 28, x2: x + 34 + k * 26, y2: y + 112, stroke: "#4e5a66", "stroke-width": 4, "stroke-linecap": "round" }, g);
    D.el("rect", { x: x + 198, y: y + 56, width: 34, height: 28, rx: 4, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: x + 20, y: y + 118, width: 160, height: 14, rx: 4, fill: "url(#vm-noir)" }, g);
    return g;
  }
  /* balance : pivot (cx, py) ; maj(angle en degrés, + = côté droit qui descend) ; pans à 120 sous les extrémités */
  function balance(p, cx, py) {
    const g = D.el("g", {}, p), D1 = 170, PAN = 120;
    D.el("path", { d: "M " + (cx - 70) + " " + (py + 215) + " L " + (cx + 70) + " " + (py + 215) + " L " + (cx + 12) + " " + (py + 8) + " L " + (cx - 12) + " " + (py + 8) + " Z", fill: "url(#vm-acier)" }, g);
    const fleau = D.el("line", { stroke: "url(#vm-marine-h)", "stroke-width": 14, "stroke-linecap": "round" }, g);
    D.el("circle", { cx: cx, cy: py, r: 16, fill: D.BLEU, stroke: "#fff", "stroke-width": 3 }, g);
    const cote = s => {
      const q = D.el("g", {}, g);
      D.el("line", { x1: 0, y1: 0, x2: -58, y2: PAN - 22, stroke: GRIS, "stroke-width": 3 }, q);
      D.el("line", { x1: 0, y1: 0, x2: 58, y2: PAN - 22, stroke: GRIS, "stroke-width": 3 }, q);
      D.el("path", { d: "M -70 " + (PAN - 22) + " L 70 " + (PAN - 22) + " Q 60 " + (PAN + 22) + " 0 " + (PAN + 22) + " Q -60 " + (PAN + 22) + " -70 " + (PAN - 22) + " Z", fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, q);
      return q;
    };
    const gauche = cote(-1), droite = cote(1);
    return function (a) {
      const r = a * Math.PI / 180, dx = Math.cos(r) * D1, dy = Math.sin(r) * D1;
      fleau.setAttribute("x1", (cx - dx).toFixed(1)); fleau.setAttribute("y1", (py - dy).toFixed(1)); fleau.setAttribute("x2", (cx + dx).toFixed(1)); fleau.setAttribute("y2", (py + dy).toFixed(1));
      gauche.setAttribute("transform", "translate(" + (cx - dx).toFixed(1) + " " + (py - dy).toFixed(1) + ")");
      droite.setAttribute("transform", "translate(" + (cx + dx).toFixed(1) + " " + (py + dy).toFixed(1) + ")");
    };
  }

  /* =====================================================================
     0 · INTRO — qui décide ?
     ===================================================================== */
  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const titre = D.el("g", {}, g);
    D.texte(titre, 490, 330, c.recit.titre, { "text-anchor": "middle", "font-size": 56, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    D.lignes(titre, 490, 400, D.couper(c.recit.sousTitre, 30), { "text-anchor": "middle", "font-size": 38, "font-weight": 700, fill: D.ORANGE, "font-family": POL }, 46);
    // k1 : la centrale, derrière elle
    const gVue = groupe(g, { "data-ext": "" }), vue = D.vueCentrale(gVue, 130, 190, 0.8);
    // k3 : trois vignettes en ligne
    const cartes = [55, 345, 635].map((x, i) => {
      const gr = groupe(g), rot = [];
      D.el("rect", { x: x, y: 230, width: 270, height: 330, rx: 20, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, gr);
      if (i < 2) {
        const im = D.image(gr, "compresseur", x + 55, 255, 160, 128);
        if (i === 0) im.setAttribute("opacity", 0.5);
        D.el("circle", { cx: x + 135, cy: 405, r: 11, fill: i ? VERT : "#9aa7b5", stroke: ENCRE, "stroke-width": 2.5 }, gr);
      } else rot.push(D.ventilateur(gr, x + 135, 322, 62));
      lab(gr, x + 135, 448, ["à l'arrêt", "en marche", "ventilateur"][i], { "text-anchor": "middle" });
      D.texte(gr, x + 135, 548, "?", { "text-anchor": "middle", "font-size": 92, "font-weight": 700, fill: D.ORANGE, "font-family": TITRE });
      return { g: gr, rot: rot[0], at: [A(3, 0.02), A(3, 0.28), A(3, 0.45)][i] };
    });
    // k4 : l'armoire, le régulateur
    const gArm = groupe(g, { "data-ext": "" }), arm = D.armoire(gArm, 60, 200, 0.95);
    const dessus = groupe(g);
    lab(dessus, 40, 182, "régulateur de centrale", { "font-size": 32 });
    const pBP = pas(g, 410, 286, "basse pression", BP, 34, "start"), pHP = pas(g, 410, 345, "haute pression", HPC, 34, "start");
    const tBP = D.trait(g, 405, 274, 350, 290, BP), tHP = D.trait(g, 405, 333, 350, 322, HPC);
    tBP.setAttribute("opacity", 0); tHP.setAttribute("opacity", 0);
    // k5 : « ses courbes »
    const fcourbes = fleche(g, HPC), lcourbes = groupe(g);
    lab(lcourbes, 660, 385, "ses courbes", { "text-anchor": "middle", fill: D.ORANGE, "font-size": 36 });
    // k6 : les compresseurs
    const syms = [0, 1, 2, 3].map(i => { const q = groupe(g); D.image(q, "compresseur", 815, 215 + i * 110, 112, 90); return q; });
    const mila = D.heroine(g, { r: 30 });
    const p0 = pas(g, 490, 722, "fluide frigorigène", D.BLEU, 38), p1 = pas(g, 490, 722, "quatre compresseurs à pistons", D.BLEU, 36), p2 = pas(g, 490, 722, "qui décide ?", HPC, 40);
    return function (t) {
      opa(titre, 1 - D.lisse((t - (T[0] - 1.4)) / 0.6));
      // la centrale : apparaît au k1, s'efface au k3
      opa(gVue, surv(t, T[1] + 0.3, 0.8) * (1 - 0.7 * D.lisse((t - (T[2] + 0.2)) / 0.6)) * (1 - D.lisse((t - (T[3] - 0.1)) / 0.6)));
      const m = [0, 1, 2, 3].map(i => t > A(1, 0.5) + i * 0.35);
      vue.maj({ t: t, marche: m, densite: 0.55 - 0.05 * m.filter(Boolean).length, defaut: null });
      // héroïne
      const hx = D.courbe([[0, 490], [T[3], 490], [T[3] + 1.2, 90], [T[6], 90], [T[6] + 2.5, 640], [E[6] + 0.3, 800]], t);
      const hy = D.courbe([[0, 520], [T[1], 520], [T[1] + 1.2, 600], [T[2], 600], [T[2] + 0.9, 490], [T[3], 490], [T[3] + 1.2, 690], [T[6], 690], [T[6] + 2.5, 660], [E[6] + 0.3, 470]], t) + Math.sin(t * 2.2) * 6;
      const hs = D.courbe([[0, 2.4], [T[1], 2.4], [T[1] + 1.2, 1.5], [T[2], 1.5], [T[2] + 0.9, 2.1], [T[3], 2.1], [T[3] + 1.2, 1.1], [T[6] + 2.5, 1.1], [E[6] + 0.3, 0.9]], t);
      const humeur = t > T[2] + 0.5 && t < E[3] + 0.3 ? "surprise" : "sourire";
      mila({ x: hx, y: hy, s: hs, t: t, temp: 0.1, etat: "liquide", humeur: humeur, regard: [t > T[5] ? 1 : 0, t > T[4] && t < T[5] ? -0.6 : 0], op: surv(t, T[0] - 1, 0.8) * (1 - D.lisse((t - (E[6] - 0.8)) / 0.9)) });
      // pastilles
      opa(p0, fen(t, A(0, 0.3), E[0])); opa(p1, fen(t, A(1, 0.45), E[1])); opa(p2, fen(t, A(2, 0.5), E[3]));
      // k3 : les vignettes
      cartes.forEach((q, i) => { opa(q.g, surv(t, q.at, 0.4) * (1 - D.lisse((t - (T[4] - 0.2)) / 0.5))); if (q.rot) q.rot(t * 500); });
      // k4 : l'armoire
      opa(gArm, surv(t, A(4, 0.02), 0.6)); arm.maj({ t: t, marche: [false, false, false, false], alarme: false });
      opa(dessus, fen(t, A(4, 0.02), E[5] + 1));
      opa(pBP, fen(t, A(4, 0.62), E[4])); opa(tBP, fen(t, A(4, 0.62), E[4])); opa(pHP, fen(t, A(4, 0.82), E[4])); opa(tHP, fen(t, A(4, 0.82), E[4]));
      // k5 : « ses courbes »
      const ok5 = fen(t, A(5, 0.08), E[5]);
      fcourbes(380, 440, D.lerp(540, 950, D.lisse((t - A(5, 0.08)) / 0.9)), 440, 34, ok5);
      opa(lcourbes, ok5);
      // k6 : les compresseurs
      syms.forEach((q, i) => opa(q, surv(t, T[6] + 0.2 + i * 0.4, 0.5)));
      const r = { temp: 0.1, etat: "liquide", humeur: humeur };
      if (t >= T[5] - 0.15 && t < T[6] - 0.15) { r.diag = D.temps(c, t, 10, 40, 5, 5); r.diag0 = 10; r.calques = { consigne: true, zone: true }; }
      return r;
    };
  };

  /* =====================================================================
     1 · CENTRALE — quatre compresseurs, deux capteurs, un régulateur
     ===================================================================== */
  S.centrale = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const tout = groupe(g), X = 30, Y = 250, K = 0.78, P = lieu(X, Y, K);
    const gVue = D.el("g", { "data-ext": "" }, tout), vue = D.vueCentrale(gVue, X, Y, K);
    const gArm = D.el("g", { "data-ext": "" }, tout), arm = D.armoire(gArm, 762, 215, 0.62);
    // k2 : les collecteurs
    const lAsp = groupe(tout), lRef = groupe(tout);
    lab(lAsp, P(450, 0)[0], 644, "collecteur d'aspiration", { "text-anchor": "middle", "font-size": 32 });
    lab(lRef, P(450, 0)[0], 288, "collecteur de refoulement", { "text-anchor": "middle", "font-size": 32 });
    // k3 : la pastille et l'escalier des quatre marches
    const pM = pas(tout, 381, 722, "4 marches de puissance", D.BLEU, 34);
    const esc = groupe(tout), marches = [1, 2, 3, 4].map(n => {
      const x = 792 + (n - 1) * 40;
      const r = D.el("rect", { x: x, y: 700 - 34 * n, width: 34, height: 34 * n, rx: 4, fill: "#dfe6ee", stroke: GRIS, "stroke-width": 2 }, esc);
      lab(esc, x + 17, 732, String(n), { "text-anchor": "middle", "font-size": 28 });
      return r;
    });
    // k4 : les capteurs
    const [bx, by] = P(862, 351), [hx, hy] = P(862, 19);
    const cBP = D.el("circle", { cx: bx, cy: by, r: 46, fill: "none", stroke: HPC, "stroke-width": 6, opacity: 0 }, tout);
    const cHP = D.el("circle", { cx: hx, cy: hy, r: 46, fill: "none", stroke: HPC, "stroke-width": 6, opacity: 0 }, tout);
    const lBP = groupe(tout), lHP = groupe(tout);
    lab(lBP, bx - 10, 664, "capteur BP", { "text-anchor": "middle" }); D.trait(lBP, bx, by + 50, bx, 632);
    lab(lHP, hx - 10, 190, "capteur HP", { "text-anchor": "middle" }); D.trait(lHP, hx, 198, hx, hy - 50);
    // k5 : les fils
    const wHP = fil(tout, [[bx, hy - 30], [762, hy - 30]], HPC, 2);
    const wBP = fil(tout, [[bx, by - 36], [735, by - 36], [735, 462], [762, 462]], BP, 2);
    const yBus = 392, xs = [190, 370, 550, 730].map(cx => P(cx + 8, 0)[0]);
    const bus = fil(tout, [[745, yBus], [xs[0], yBus]], ENCRE, 4);
    const gTronc = groupe(tout);
    [0, 1, 2, 3].forEach(i => { const y = 215 + 0.62 * (190 + 52 * i); D.el("line", { x1: 745, y1: y, x2: 762, y2: y, stroke: ENCRE, "stroke-width": 3.5, "stroke-dasharray": "3 8", "stroke-linecap": "round" }, gTronc); });
    D.el("line", { x1: 745, y1: 215 + 0.62 * 190, x2: 745, y2: 215 + 0.62 * (190 + 52 * 3), stroke: ENCRE, "stroke-width": 3.5, "stroke-dasharray": "3 8", "stroke-linecap": "round" }, gTronc);
    const bornes = xs.map(x => D.el("circle", { cx: x, cy: yBus, r: 8, stroke: "#fff", "stroke-width": 2.5 }, gTronc));
    const wVent = fil(tout, [[855, 215], [855, 192]], ENCRE, 1), lVent = groupe(tout);
    lab(lVent, 950, 178, "ventilateurs du condenseur", { "text-anchor": "end", "font-size": 30 });
    const mila = D.heroine(tout, { r: 30 });
    return function (t) {
      opa(tout, surv(t, T[2] - 0.8, 0.6));
      // compresseurs : k3 un par un puis ils s'éteignent ; k5 C2 puis C3 avec leur contacteur
      const m = [t > A(3, 0.06) && t < A(3, 0.97), t > A(3, 0.17) && t < A(3, 0.88) || t > A(5, 0.62), t > A(3, 0.28) && t < A(3, 0.78) || t > A(5, 0.78), t > A(3, 0.39) && t < A(3, 0.68)], n = m.filter(Boolean).length;
      vue.maj({ t: t, marche: m, densite: 0.6 - 0.1 * n, defaut: null });
      arm.maj({ t: t, marche: m, alarme: false });
      opa(lAsp, fen(t, A(2, 0.22), T[4] - 0.3)); opa(lRef, fen(t, A(2, 0.62), T[4] - 0.3));
      opa(esc, surv(t, T[3], 0.4) * (1 - D.lisse((t - (T[4] - 0.2)) / 0.5))); marches.forEach((r, i) => r.setAttribute("fill", n > i ? BP : "#dfe6ee"));
      opa(pM, fen(t, A(3, 0.52), E[3]));
      const ok4 = fen(t, A(4, 0.02), E[4]);
      opa(cBP, fen(t, A(4, 0.08), E[4])); opa(cHP, fen(t, A(4, 0.5), E[4])); opa(lBP, fen(t, A(4, 0.1), E[4])); opa(lHP, fen(t, A(4, 0.52), E[4]));
      wHP.maj(t, surv(t, A(5, 0.1), 0.5)); wBP.maj(t, surv(t, A(5, 0.14), 0.5));
      const fb = surv(t, A(5, 0.52), 0.5);
      bus.maj(t, fb); opa(gTronc, fb); bornes.forEach((b, i) => b.setAttribute("fill", m[i] && t > A(5, 0.6) ? VERT : ENCRE));
      wVent.maj(t, surv(t, A(5, 0.86), 0.4)); opa(lVent, surv(t, A(5, 0.86), 0.4));
      // l'héroïne : collecteur d'aspiration, puis le tuyau qui monte dans C2
      const lx = D.courbe([[A(2, 0.05), 10], [A(2, 0.5), 320], [E[5], 320]], t), ly = D.courbe([[A(2, 0.05), 424], [A(2, 0.5), 424], [A(2, 0.8), 356], [E[5], 356]], t);
      const [px, py] = P(lx, ly + Math.sin(t * 3) * 2);
      mila({ x: px, y: py, s: 0.6, t: t, temp: 0.15, etat: "vapeur", humeur: "sourire", regard: [t > T[4] ? 1 : 0, t > T[4] ? -0.5 : 0], op: surv(t, A(2, 0.03), 0.4) });
      return { temp: 0.15, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* =====================================================================
     2 · BILAN — la vapeur qui arrive, la vapeur qui part
     ===================================================================== */
  S.bilan = function (g, c) {
    const T = c.T, E = c.E, A = c.A, X = 130, Y = 270, K = 0.9, P = lieu(X, Y, K), yAsp = P(0, 424)[1];
    const gVue = groupe(g, { "data-ext": "" }), vue = D.vueCentrale(gVue, X, Y, K);
    // les flèches : meubles (entrante, épaisseur = vapeur produite) ; compresseurs C2 et C3 (montantes)
    const fM = fleche(g, BP), fC = [fleche(g, HPC), fleche(g, HPC)], xC = [P(350, 0)[0], P(530, 0)[0]];
    const lM = groupe(g), lC = groupe(g);
    lab(lM, 35, 548, "des meubles");
    const lM1 = groupe(g); lab(lM1, 35, 514, "vapeur");
    lab(lC, (xC[0] + xC[1]) / 2, 302, "vapeur des compresseurs", { "text-anchor": "middle" });
    D.trait(lC, xC[0] + 10, 312, xC[0], P(0, 98)[1] - 4); D.trait(lC, xC[1] - 10, 312, xC[1], P(0, 98)[1] - 4);
    const pHaut = pas(g, 490, 215, "BP ↑", HPC, 40), pBas = pas(g, 490, 215, "BP ↓", SARCELLE, 40);
    const fcourbe = fleche(g, BP), lcourbe = groupe(g);
    lab(lcourbe, 545, 216, "la courbe", { "text-anchor": "end", "font-size": 32 });
    // k5 : la vitrine et son thermomètre (« si la BP monte »)
    const gVit = groupe(g), gVitrine = D.el("g", {}, gVit);
    meuble(gVitrine, 200, 300, 250, 230, "laitiers");
    const tint = D.el("rect", { x: 210, y: 310, width: 230, height: 210, rx: 8, fill: "#e4702c", opacity: 0 }, gVit);
    const th = thermo(gVit, 570, 290, 220);
    const pSi = pas(gVit, 570, 250, "BP ↑", HPC, 36);
    const pChaud = pas(g, 400, 640, "produits plus chauds", ROUGE, 36);
    // k6 : l'armoire, « il faut la tenir »
    const gArm = groupe(g, { "data-ext": "" }), arm = D.armoire(gArm, 600, 290, 0.62);
    const pTenir = pas(g, 330, 560, "il faut la tenir", D.ORANGE, 40);
    const mila = D.heroine(g, { r: 30 });
    const wDe = t => D.courbe([[T[1], 0], [E[1], 2], [T[2], 2], [E[2] + 0.3, 5.6], [T[3], 5.6], [E[3], 9.3], [E[4], 10]], t, true);
    const vap = w => D.courbe([[0, 2], [2, 2], [3.2, 2.9], [5.6, 2.9], [6.6, 1.25], [9, 1.25], [10, 1.6]], w, true);
    return function (t) {
      const w = wDe(t), reg = D.regul(w, 0), v = reg.valeur, vueOp = 1 - D.lisse((t - (E[4] + 0.05)) / 0.5);
      opa(gVue, vueOp);
      vue.maj({ t: t, marche: reg.marche, densite: dens(v), defaut: null });
      // flèches
      const aM = vueOp * surv(t, A(1, 0.12), 0.5), aC = vueOp * surv(t, A(1, 0.5), 0.5);
      fM(45, yAsp, 150, yAsp, 16 * vap(w), aM);
      fC[0](xC[0], P(0, 190)[1], xC[0], P(0, 98)[1], 18, aC); fC[1](xC[1], P(0, 190)[1], xC[1], P(0, 98)[1], 18, aC);
      opa(lM, vueOp * fen(t, A(0, 0.45), E[6])); opa(lM1, vueOp * surv(t, A(1, 0.12), 0.5)); opa(lC, aC * (1 - D.lisse((t - (E[2] + 0.2)) / 0.4)));
      opa(pHaut, fen(t, A(2, 0.25), E[2])); opa(pBas, fen(t, A(3, 0.25), E[3]));
      const ac = vueOp * fen(t, A(4, 0.45), E[4]);
      fcourbe(560, 205, D.lerp(700, 950, D.lisse((t - A(4, 0.45)) / 0.8)), 205, 28, ac); opa(lcourbe, ac);
      // héroïne : dans le collecteur (k0 à k4), à la vitrine (k5), devant l'armoire (k6)
      const dans = vueOp, ecrase = 0.3 * D.lisse((v - 0.2) / 0.9);
      const cx = D.courbe([[T[0] - 0.2, 45], [E[0], 230], [E[4], 520]], t), cy = yAsp + Math.sin(t * 3.1) * 3;
      const hx = D.courbe([[E[4] + 0.2, cx], [E[4] + 1.2, 110], [T[6], 110], [T[6] + 1.2, 470]], t), hy = D.courbe([[E[4] + 0.2, cy], [E[4] + 1.2, 410], [T[6], 410], [T[6] + 1.2, 360]], t);
      const apres = t > E[4] + 0.2, chaud = t > A(5, 0.7) && t < T[6];
      mila({ x: apres ? hx : cx, y: apres ? hy : cy, s: apres ? 1.3 : 0.6, t: t, temp: apres ? 0.1 : 0.15, etat: apres ? "bout" : "vapeur",
        humeur: chaud ? "chaud" : ecrase > 0.12 ? "surprise" : "sourire", ecrase: apres ? 0 : ecrase, regard: [apres && t > T[6] ? 1 : 0, 0],
        op: surv(t, T[0] - 0.1, 0.5) * (apres ? surv(t, E[4] + 0.3, 0.5) : 1) });
      // k5 : la vitrine
      opa(gVit, surv(t, T[5] - 0.1, 0.5) * (1 - D.lisse((t - (T[6] - 0.1)) / 0.5)));
      const n = D.courbe([[T[5], 0.12], [A(5, 0.4), 0.2], [E[5], 0.92]], t);
      th.maj(n, D.couleur(0.05 + 0.85 * n, false)); tint.setAttribute("opacity", (0.34 * D.lisse((n - 0.3) / 0.6)).toFixed(2));
      opa(pSi, fen(t, A(5, 0.45), E[5])); opa(pChaud, fen(t, A(5, 0.72), E[5]));
      // k6 : l'armoire
      opa(gArm, surv(t, T[6] + 0.1, 0.6)); arm.maj({ t: t, marche: [false, true, true, false] });
      opa(pTenir, surv(t, A(6, 0.35), 0.5));
      return { temp: apres ? 0.1 : 0.15, etat: apres ? "bout" : "vapeur", humeur: ecrase > 0.12 ? "surprise" : "sourire", diag: w, diag0: 0 };
    };
  };

  /* =====================================================================
     3 · CONSIGNE — la basse pression que l'on veut tenir (pas de courbe à rendre)
     ===================================================================== */
  S.consigne = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    // le rayon : trois meubles, chacun avec son thermomètre
    const NOMS = [["produits", "laitiers"], ["charcuterie"], ["chambre", "froide"]], BASE = [0.55, 0.46, 0.3], UX = [40, 260, 480];
    const rayon = groupe(g), unites = UX.map((x, i) => {
      meuble(rayon, x, 250, 150, 190, ["laitiers", "charcuterie", "chambre"][i]);
      const th = thermo(rayon, x + 175, 262, 150);
      NOMS[i].forEach((s, j) => lab(rayon, x + 90, 484 + j * 34, s, { "text-anchor": "middle" }));
      return th;
    });
    const anneau = groupe(g);
    D.el("rect", { x: 466, y: 238, width: 232, height: 292, rx: 22, fill: "none", stroke: HPC, "stroke-width": 6 }, anneau);
    // l'armoire et son bouton « consigne »
    const gArm = D.el("g", { "data-ext": "" }, g), arm = D.armoire(gArm, 762, 240, 0.62);
    const tourne = bouton(g, 835, 590, 52);
    lab(g, 759, 600, "−", { "text-anchor": "middle", "font-size": 40 }); lab(g, 911, 600, "+", { "text-anchor": "middle", "font-size": 40 });
    const lCons = groupe(g);
    lab(lCons, 950, 690, "consigne de", { "text-anchor": "end" }); lab(lCons, 950, 724, "basse pression", { "text-anchor": "end" });
    // pastilles du haut
    const pFroid = pas(g, 40, 215, "le meuble le plus froid décide", D.BLEU, 32, "start"), pHaute = pas(g, 40, 215, "trop haute", HPC, 36, "start"), pBasse = pas(g, 40, 215, "trop basse : énergie perdue", SARCELLE, 36, "start");
    // k3 : les compresseurs travaillent, le compteur tourne
    const gComp = groupe(g), comps = [0, 1, 2].map(i => compSym(gComp, 230 + i * 110, 595, 100, 80));
    lab(gComp, 330, 570, "compresseurs", { "text-anchor": "middle" });
    const gCpt = groupe(g), disque = compteur(gCpt, 610, 595);
    lab(gCpt, 670, 570, "compteur", { "text-anchor": "middle" });
    // k4 : « trait bleu »
    const ftrait = fleche(g, BP), ltrait = groupe(g);
    lab(ltrait, 548, 206, "trait bleu", { "text-anchor": "end", "font-size": 32 });
    // k5 : la balance
    const gBal = groupe(g), bal = balance(gBal, 380, 330);
    lab(gBal, 210, 548, "mesurée", { "text-anchor": "middle" }); lab(gBal, 550, 548, "consigne", { "text-anchor": "middle" });
    const mila = D.heroine(g, { r: 30 });
    const vDe = t => D.courbe([[0, 0], [A(2, 0.08), 0], [A(2, 0.6), 0.8], [A(3, 0), 0.8], [A(3, 0.55), -0.8], [T[4], -0.8], [A(4, 0.4), 0], [E[5], 0]], t);
    const vit = t => 40 + 700 * D.lisse((t - A(3, 0.2)) / 1.0) * (1 - D.lisse((t - T[4]) / 1.0));
    return function (t) {
      const v = vDe(t), rayonOp = 1 - D.lisse((t - (T[5] - 0.2)) / 0.5);
      opa(rayon, surv(t, 0.3, 0.6) * rayonOp);
      unites.forEach((th, i) => { const d = v > 0 ? 0.3 * v : 0.2 * v; th.maj(BASE[i] + d, D.couleur(0.05 + 0.9 * Math.max(0, v) / 0.8, false)); });
      opa(anneau, fen(t, A(1, 0.12), E[1]) * rayonOp);
      tourne(v); arm.maj({ t: t, marche: [false, false, false, false] });
      opa(lCons, surv(t, A(0, 0.25), 0.5));
      opa(pFroid, fen(t, A(1, 0.2), E[1])); opa(pHaute, fen(t, A(2, 0.55), E[2])); opa(pBasse, fen(t, A(3, 0.35), E[3]));
      const tr = fen(t, A(3, 0.1), E[3]);
      opa(gComp, tr); comps.forEach(cp => cp.maj(true, t)); opa(gCpt, tr); disque(integre(vit, t));
      const a4 = fen(t, A(4, 0.45), E[4]);
      ftrait(600, 195, D.lerp(700, 950, D.lisse((t - A(4, 0.45)) / 0.8)), 195, 28, a4); opa(ltrait, a4);
      opa(gBal, surv(t, T[5] + 0.1, 0.6)); bal(9 * Math.sin((t - T[5]) * 2.1) * Math.exp(-(t - T[5]) / 3.2));
      const humeur = t > A(2, 0.2) && t < E[2] + 0.3 ? "triste" : t > A(3, 0.3) && t < E[3] + 0.3 ? "chaud" : "sourire";
      mila({ x: 100, y: 665, s: 1.2, t: t, temp: 0.1, etat: "liquide", humeur: humeur, regard: [1, 0], op: surv(t, 0.5, 0.6) * rayonOp });
      return { temp: 0.1, etat: "liquide", humeur: humeur };
    };
  };

  /* =====================================================================
     4 · ZONE — la bande où l'on ne touche à rien
     ===================================================================== */
  S.zone = function (g, c) {
    const T = c.T, E = c.E, A = c.A, X = 340, Y = 290, K = 0.66, P = lieu(X, Y, K), yAsp = P(0, 424)[1];
    // la colonne « basse pression » : bande, trois traits et leurs noms
    const col = colonne(g, 40, 175, 110, 550, -2.4, 2.4, -1, 1), Yc = col.Y;
    const nomHaut = groupe(g), nomCons = groupe(g), nomBas = groupe(g), lueur = groupe(g);
    const tH = col.trait(1, BP, "3 6", 166), tC = col.trait(0, BP, "10 7", 166), tB = col.trait(-1, BP, "3 6", 166);
    [tH, tC, tB].forEach((e, i) => [nomHaut, nomCons, nomBas][i].appendChild(e));
    lab(nomHaut, 178, Yc(1) + 10, "seuil haut"); lab(nomCons, 178, Yc(0) + 10, "consigne"); lab(nomBas, 178, Yc(-1) + 10, "seuil bas");
    D.el("rect", { x: 38, y: Yc(1), width: 114, height: Yc(-1) - Yc(1), rx: 6, fill: "none", stroke: BP, "stroke-width": 6 }, lueur);
    const bandeEl = col.bande;
    // la centrale
    const gVue = groupe(g, { "data-ext": "" }), vue = D.vueCentrale(gVue, X, Y, K);
    const mila = D.heroine(g, { r: 30 });
    const pRien = pas(g, 640, 215, "rien ne bouge", D.BLEU, 38), pDem = pas(g, 640, 215, "demande de froid", HPC, 38), pExc = pas(g, 640, 215, "excès de froid", SARCELLE, 38);
    // k4 : « un seul trait »
    const v4 = groupe(g), g4 = D.el("g", {}, v4);
    D.el("rect", { x: 395, y: 255, width: 520, height: 445, rx: 22, fill: "#fffdf8", stroke: GRIS, "stroke-width": 3 }, g4);
    const c4 = colonne(g4, 430, 285, 80, 320, -2, 2); c4.trait(0, BP, "10 7", 530);
    const s4 = compSym(g4, 600, 380, 130, 104);
    const croix = groupe(v4);
    [[410, 275, 800, 615], [800, 275, 410, 615]].forEach(([a, b, d, e]) => D.el("line", { x1: a, y1: b, x2: d, y2: e, stroke: ROUGE, "stroke-width": 14, "stroke-linecap": "round" }, croix));
    lab(v4, 655, 668, "un seul trait", { "text-anchor": "middle" });
    // k5 : le moteur chauffe, les démarrages montent
    const v5 = groupe(g), mot = moteur(v5, 420, 380), flammes = [0, 1, 2, 3, 4].map(() => D.chaleur(v5));
    lab(v5, 520, 570, "moteur", { "text-anchor": "middle" });
    lab(v5, 815, 405, "démarrages", { "text-anchor": "middle" });
    D.el("rect", { x: 710, y: 425, width: 210, height: 100, rx: 14, fill: ENCRE, stroke: "#56636f", "stroke-width": 4 }, v5);
    const chiffres = D.texte(v5, 815, 497, "00", { "text-anchor": "middle", "font-size": 66, "font-weight": 700, fill: "#9fe3b8", "font-family": TITRE });
    // k6 : bande étroite / bande large
    const v6 = groupe(g);
    const cE = colonne(v6, 420, 280, 70, 320, -2, 2, -0.25, 0.25), cL = colonne(v6, 690, 280, 70, 320, -2, 2, -1.4, 1.4);
    const sE = compSym(v6, 540, 390, 110, 88), thL = thermo(v6, 840, 290, 250);
    [0.25, -0.25].forEach(v => cE.trait(v, BP, "3 6", 490)); [1.4, -1.4].forEach(v => cL.trait(v, BP, "3 6", 760));
    lab(v6, 540, 668, "trop étroite", { "text-anchor": "middle" }); lab(v6, 770, 668, "trop large", { "text-anchor": "middle" });
    const wDe = t => D.courbe([[T[0], 10], [E[1], 15], [T[2], 15], [E[2], 16.5]], t, true);
    const v165 = bpDe(16.5, 10);
    return function (t) {
      const w = wDe(t), reg = D.regul(w, 10), vp = reg.valeur;
      // le niveau de la colonne : celui de la courbe, sauf dans la phrase 3 (illustration : excès de froid)
      const vs = t < T[3] ? vp : D.courbe([[T[3], v165], [A(3, 0.4), -1.4], [E[3], -0.55], [T[4] + 0.3, -0.55], [T[4] + 1.6, v165]], t);
      col.maj(vs);
      opa(nomCons, surv(t, A(0, 0.2), 0.4));
      opa(nomHaut, surv(t, A(0, 0.55), 0.4)); opa(nomBas, surv(t, A(0, 0.8), 0.4));
      bandeEl.setAttribute("fill", "rgba(47,111,184," + (0.16 + 0.2 * D.fenetre(t, A(1, 0.0), E[1] + 0.2, 0.8) * (0.6 + 0.4 * Math.sin(t * 5))).toFixed(2) + ")"); opa(bandeEl, surv(t, A(0, 0.5), 0.5));
      opa(lueur, D.fenetre(t, A(1, 0.0), E[1] + 0.2, 0.6) * (0.55 + 0.45 * Math.sin(t * 5)));
      // la centrale et ses compresseurs
      const vueOp = 1 - D.lisse((t - (T[4] - 0.3)) / 0.5);
      opa(gVue, vueOp);
      const marche = reg.marche.slice(); if (t > A(3, 0.62)) marche[1] = false;
      vue.maj({ t: t, marche: marche, densite: dens(vs), defaut: null });
      const hx = D.courbe([[T[0], 470], [E[3], 640]], t, true), humeur = t > A(2, 0.15) && t < E[2] + 0.2 ? "chaud" : t > A(3, 0.3) && t < E[3] ? "froid" : "sourire";
      mila({ x: hx, y: yAsp + Math.sin(t * 3) * 3, s: 0.6, t: t, temp: 0.15, etat: "vapeur", humeur: humeur, op: surv(t, T[0] + 0.2, 0.5) * vueOp });
      opa(pRien, fen(t, A(1, 0.0), E[1])); opa(pDem, fen(t, A(2, 0.2), E[2])); opa(pExc, fen(t, A(3, 0.35), E[3]));
      // k4 : un seul trait
      opa(v4, surv(t, T[4] + 0.2, 0.5) * (1 - D.lisse((t - (T[5] - 0.1)) / 0.4)));
      const nv = 0.42 * Math.sin(t * 5.5) + 0.18 * Math.sin(t * 13.1 + 1);
      c4.maj(nv); s4.maj(nv > 0, t);
      opa(croix, surv(t, A(4, 0.8), 0.4));
      // k5 : le moteur
      opa(v5, surv(t, T[5] + 0.1, 0.5) * (1 - D.lisse((t - (T[6] - 0.1)) / 0.4)));
      flammes.forEach((f, i) => { const u = D.frac(t * 0.6 + i * 0.2); f(450 + i * 36 + (i % 2) * 8, 400 - u * 60, 180, D.fenetre(u, 0, 1, 0.25) * D.lisse((t - T[5]) / 1.2)); });
      const n = Math.floor(Math.pow(D.borne((t - T[5]) / (E[5] - T[5]), 0, 1), 1.4) * 97);
      chiffres.textContent = (n < 10 ? "0" : "") + n; chiffres.setAttribute("fill", n > 60 ? "#ff7b6b" : "#9fe3b8");
      // k6 : étroite / large
      opa(v6, surv(t, T[6] + 0.2, 0.5));
      const ne = 0.5 * Math.sin(t * 4.2), nl = 1.85 * Math.sin(t * 0.9 + 1.2);
      cE.maj(ne); sE.maj(((t * 4.2 - Math.asin(0.25 / 0.5)) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) < Math.PI, t);
      cL.maj(nl); thL.maj(0.5 + 0.4 * nl / 1.85, D.couleur(0.05 + 0.85 * (0.5 + 0.5 * nl / 1.85), false));
      return { temp: 0.15, etat: "vapeur", humeur: humeur, diag: w, diag0: 10 };
    };
  };
})();

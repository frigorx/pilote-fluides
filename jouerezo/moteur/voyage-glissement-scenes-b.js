/* =====================================================================
   voyage-glissement-scenes-b.js — « le glissement » : l'évaporateur qui
   glisse (rythme, glisse), la loupe sur la basse pression (bulle-rosee),
   la fin de l'évaporateur et la surchauffe (surchauffe)
   ---------------------------------------------------------------------
   Contrat d'une scène : S[id] = function (g, c) → maj(t) (voir
   voyage-glissement/BRIEF-SCENES.md). Tout le décor est posé UNE fois,
   maj(t) ne fait que déplacer / colorer / montrer-cacher : fonction pure
   de t (les variables locales recalculées à chaque image à partir de t
   ne gardent rien d'une image à l'autre).
   ÉCRAN PARTAGÉ : tout tient dans x 20 → 965, y 150 → 760.
   ÉVAPORATEUR (rythme, glisse) : coupe d'un tube de x 40 à 940, ailettes et
   air en chevrons derrière ; le niveau du liquide baisse jusqu'à une petite
   goutte vers 81 % du tube ; PUIS vapeur seule. Les petites molécules sont
   posées à leur place (elles flottent, elles ne dérivent pas : une molécule
   ne change jamais de couleur en route) ; leur sorte suit la composition
   du lieu : liquide 2 : 1 : 2 à l'entrée puis presque que du bleu (jamais
   zéro vert ni violet tant qu'il reste du liquide) ; vapeur riche en vert
   et violet tant qu'il reste du liquide, de nouveau 2 : 1 : 2 après la
   dernière goutte. Le liquide est une nappe translucide (D.liquide) : les
   molécules et l'héroïne, dessinées AVANT elle, se voient à travers.
   rythme RÉVÈLE la composition au fil des phrases : mélange 2 : 1 : 2
   partout (k0-k2), puis la vapeur devient riche en vert et violet (k3), puis
   le liquide se charge en bleu (k4) : fondu enchaîné entre deux dessins de
   chaque molécule, jamais une molécule qui bouge en changeant de couleur.
   glisse montre l'évaporateur DÉJÀ révélé (le liquide de plus en plus bleu).
   LOUPE (glisse k7, bulle-rosee) : D.loupe sur la basse pression
   (h 180 → 470 kJ/kg, p 4,3 → 6,9 bar ; aucune pression écrite) ; les
   positions des étiquettes sont choisies hors de tout tracé (vérifié sur
   les images). Bulle = bleu, rosée = rouge, comme les isothermes du calque.
   SURCHAUFFE : fin de l'évaporateur (ailettes) + tube d'aspiration, bulbe,
   thermomètre à pince ; l'afficheur encadre la rosée (vert, juste) ou la
   bulle (rouge, faux).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN, S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const DG = window.VOYAGE_DIAGRAMME;
  const SORTES = ["R32", "R125", "R134a"];
  const COUL = { R32: D.SOEURS.R32.coul, R125: D.SOEURS.R125.coul, R134a: D.SOEURS.R134a.coul };
  const BLEU = COUL.R134a, ROUGE = "#c0392b", BLEUT = "#1f5fa8", VERTOK = "#1e7e54", ORANGE = D.ORANGE, ENCRE = "#10233c";
  let nid = 0;

  const op = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(3));
  const des = (t, a, du) => D.lisse((t - a) / (du || 0.5));            // apparaît à partir de a, puis reste
  const fen = (t, a, b) => D.fenetre(t, a, b, 0.45);                   // visible de a à b
  const txt = (p, x, y, s, at) => D.etiquette(p, x, y, s, at);
  const gros = (p, x, y, s, taille, fill, ancre) => D.etiquette(p, x, y, s, { "font-size": taille, fill: fill, "text-anchor": ancre || "start", "font-weight": 700 });
  function txtCouleurs(p, x, y, parts, at) { // un texte dont certains mots ont leur couleur (le nom d'une sorte)
    const t = D.etiquette(p, x, y, "", at || {});
    parts.forEach(([s, coul]) => { const ts = D.el("tspan", coul ? { fill: coul } : {}, t); ts.textContent = s; });
    return t;
  }
  function carte(parent, cx, y, lignes, fond, taille) { // pastille sur plusieurs lignes
    taille = taille || 30;
    const g = D.el("g", {}, parent), pas = taille * 1.35, h = lignes.length * pas + taille * 0.45;
    const r = D.el("rect", { rx: taille * 0.6, fill: fond, height: h, y: y - taille * 0.95 }, g);
    let l = 0;
    lignes.forEach((s, k) => {
      const t = D.texte(g, cx, y + k * pas, s, { "text-anchor": "middle", fill: "#fff", "font-size": taille, "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
      l = Math.max(l, (t.getComputedTextLength ? t.getComputedTextLength() : 0) || s.length * taille * 0.52);
    });
    l += taille * 1.2; r.setAttribute("x", cx - l / 2); r.setAttribute("width", l);
    return g;
  }
  const marque = (p, [x, y], coul) => D.el("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: 11, fill: coul, stroke: "#fff", "stroke-width": 3.5 }, p);

  /* ---------- les sorties de molécules : une sorte par place, jamais de changement de couleur en route ---------- */
  function assigner(ps, compo, graine) { // répartit les sortes le long de ps (triés) selon la composition du lieu
    const r = D.alea(graine), dette = [0, 0, 0];
    return ps.map(p => {
      const c = compo(p);
      let k = 0, mieux = -1e9;
      for (let i = 0; i < 3; i++) { dette[i] += c[i]; const v = dette[i] + r() * 0.35; if (v > mieux) { mieux = v; k = i; } }
      dette[k] -= 1;
      return SORTES[k];
    });
  }
  /* une molécule posée en un point : a = sorte AVANT la révélation (mélange 2 : 1 : 2), b = sorte APRÈS ;
     m = 0 → a, m = 1 → b (fondu enchaîné : une scène qui « révèle » la composition) */
  function molecule(parent, a, b) {
    const mb = D.petite(parent, b), ma = a && a !== b ? D.petite(parent, a) : null;
    return (x, y, o, m, r) => { if (ma) { ma(x, y, o * (1 - m), r); mb(x, y, o * m, r); } else mb(x, y, o, r); };
  }

  /* ---------- l'évaporateur (le même dans rythme et glisse) ---------- */
  const X0 = 40, X1 = 940, LT = X1 - X0, YH = 332, YB = 482;
  const pDe = x => (x - X0) / LT, xDe = p => X0 + p * LT;
  const P_FIN = 0.81, UNI = [0.4, 0.2, 0.4];
  const niveau = p => p < 0.7 ? 0.7 - 0.46 * (p / 0.7) : p < P_FIN ? 0.24 * Math.sqrt(Math.max(0, 1 - Math.pow((p - 0.7) / (P_FIN - 0.7), 2))) : 0;
  const liqC = p => { const k = D.lisse(p / 0.78); return [D.lerp(0.4, 0.1, k), D.lerp(0.2, 0.05, k), D.lerp(0.4, 0.85, k)]; };
  const vapC = p => { const k = D.lisse((p - P_FIN) / 0.06); return [D.lerp(0.52, 0.4, k), D.lerp(0.28, 0.2, k), D.lerp(0.2, 0.4, k)]; };

  /* o : { graine, temp(p), revele } → { fond, surface, maj(t, { chaleur, mv, ml, bulles }) }
     fond = groupe DERRIÈRE la nappe (héroïne, molécules qui montent) ; mv, ml = fondu mélange → composition réelle (vapeur, liquide) */
  function evaporateur(g, o) {
    const r = D.alea(o.graine);
    for (let x = 62; x <= 920; x += 26) D.el("rect", { x: x, y: 236, width: 7, height: 342, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    const air = D.el("g", {}, g), chaud = D.el("g", {}, g), chevrons = [], vagues = [];
    for (let k = 0; k < 7; k++) for (let j = 0; j < 3; j++) chevrons.push({ x: 110 + k * 120, f: (j + (k % 2) * 0.5) / 3, maj: D.chevron(air) });
    for (let k = 0; k < 7; k++) [-1, 1].forEach(cote => vagues.push({ x: 170 + k * 120, cote: cote, f: D.frac(k * 0.37 + (cote > 0 ? 0.5 : 0)), maj: D.chaleur(chaud) }));
    D.el("rect", { x: X0, y: YH - 16, width: LT, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YB, width: LT, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YH, width: LT, height: YB - YH, fill: "#f4f8fc" }, g);
    [X0 - 12, X1].forEach(x => D.el("rect", { x: x, y: YH - 22, width: 12, height: YB - YH + 44, rx: 3, fill: "url(#vm-acier)" }, g));
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    const liq = D.liquide(g, { x0: X0, x1: X1, yh: YH, yb: YB, pas: 10, opacite: 0.5, niveau: x => niveau(pDe(x)), couleur: x => D.couleur(o.temp(pDe(x)), false) });
    const bul = D.bulles(D.el("g", {}, g), 26, o.graine + 1, false);
    const NL = 34, psL = [], psV = [];
    for (let i = 0; i < NL; i++) psL.push(D.lerp(0.03, 0.8, (i + 0.15 + 0.7 * r()) / NL));
    for (let i = 0; i < 38; i++) psV.push(D.lerp(0.02, 0.82, (i + 0.15 + 0.7 * r()) / 38)); // sur le liquide
    for (let i = 0; i < 16; i++) psV.push(D.lerp(0.835, 0.98, (i + 0.15 + 0.7 * r()) / 16)); // après la dernière goutte : tout le tube est de la vapeur
    psV.sort((a, b) => a - b);
    const aL = assigner(psL, () => UNI, o.graine + 2), bL = assigner(psL, liqC, o.graine + 3);
    const aV = assigner(psV, () => UNI, o.graine + 4), bV = assigner(psV, vapC, o.graine + 5);
    const fin = psL.map((p, i) => i).filter(i => psL[i] > 0.62 && psL[i] < 0.76); // jamais zéro vert ni violet tant qu'il reste du liquide
    if (!fin.some(i => bL[i] === "R32")) bL[fin[0]] = "R32";
    if (!fin.some(i => bL[i] === "R125")) bL[fin[1]] = "R125";
    const ML = psL.map((p, i) => ({ p: p, v: D.frac(i * 0.618 + 0.13), ph: r() * 6.28, maj: molecule(fond, o.revele ? aL[i] : null, bL[i]) }));
    const MV = psV.map((p, i) => ({ p: p, v: D.frac(i * 0.382 + 0.31), ph: r() * 6.28, maj: molecule(vap, o.revele ? aV[i] : null, bV[i]) }));
    return {
      fond: fond, surface: liq.surface,
      maj: function (t, e) {
        chevrons.forEach(ch => {
          const f = D.frac(ch.f + t * 0.16), y = 236 + f * 342, cache = y > YH - 38 && y < YB + 38;
          ch.maj(ch.x, y, 0, y < YH ? "#e8914a" : "#3d7fca", cache ? 0 : 0.9 * D.fenetre(f, 0, 1, 0.12));
        });
        vagues.forEach(v => {
          const f = D.frac(v.f + t * 0.45), haut = v.cote < 0;
          v.maj(v.x, haut ? D.lerp(YH - 76, YH - 22, f) : D.lerp(YB + 66, YB + 22, f), haut ? 0 : 180, e.chaleur * D.fenetre(f, 0, 1, 0.25));
        });
        liq.maj(t);
        bul(t, q => { const p = 0.03 + q * 0.75, x = xDe(p); return [x, YB - 8, liq.surface(x, t) + 4, e.bulles * (niveau(p) > 0.12 ? 1 : 0)]; });
        ML.forEach(m => {
          const x = xDe(m.p) + 7 * Math.sin(t * 0.9 + m.ph), surf = liq.surface(x, t), prof = YB - surf;
          const y = surf + 12 + m.v * Math.max(0, prof - 26) + 4 * Math.sin(t * 1.3 + m.ph * 1.7);
          m.maj(x, Math.min(y, YB - 12), D.borne((prof - 22) / 12, 0, 1), e.ml, 9);
        });
        MV.forEach(m => {
          const x = D.borne(xDe(m.p) + 16 * Math.sin(t * 0.55 + m.ph), X0 + 14, X1 - 14), libre = liq.surface(x, t) - YH;
          const y = YH + 14 + m.v * Math.max(0, libre - 30) + 6 * Math.sin(t * 1.1 + m.ph * 2);
          m.maj(x, y, D.borne((libre - 26) / 14, 0, 1), e.mv, 8.5);
        });
      }
    };
  }
  /* l'héroïne qui flotte à moitié dans la nappe (sans déborder sur le cuivre), ou qui vole dans la vapeur */
  const flotte = (ech, x, t, s) => Math.min(Math.max(ech.surface(x, t) + 4 + Math.sin(t * 2) * 3, YH + 32 * s + 4), YB - 46 * s - 4);
  const vole = t => YH + 76 + Math.sin(t * 2.3) * 8;
  const ECH = 0.95; // échelle de l'héroïne dans l'évaporateur

  /* ---------- 4 · rythme : toutes partent, pas au même pas ---------- */
  S.rythme = function (g, c) {
    const T = c.T, E = c.E;
    const ech = evaporateur(g, { graine: 11, revele: true, temp: () => 0.08 });
    const airTiede = txt(g, 40, 205, "air tiède du bureau", { fill: ORANGE });
    const airFroid = txt(g, 940, 628, "air refroidi", { fill: BLEU, "text-anchor": "end" });
    const l2 = D.el("g", {}, g); txt(l2, 940, 205, "les pressées partent plus vite", { "text-anchor": "end" }); D.trait(l2, 620, 216, 620, 380);
    const l3 = D.el("g", {}, g); txtCouleurs(l3, 940, 205, [["vapeur : plus de ", null], ["R32", COUL.R32], [" et de ", null], ["R125", COUL.R125]], { "text-anchor": "end" }); D.trait(l3, 500, 216, 500, 360);
    const l4 = D.el("g", {}, g); txtCouleurs(l4, 40, 650, [["liquide : de plus en plus de ", null], ["R134a", COUL.R134a]]); D.trait(l4, 620, 612, 620, 470);
    const past5 = D.pastille(g, 940, 205, "toutes partent, les proportions changent", ENCRE, 30, "end");
    // k5 : trois petites barres, une par sorte, qui baissent toutes (la bleue moins vite) et n'arrivent jamais à zéro
    const barres = D.el("g", {}, g), CIBLE = [0.16, 0.2, 0.62], rangs = [];
    SORTES.forEach((s, k) => {
      const cy = 622 + k * 45;
      D.texte(barres, 40, cy + 10, s, { "font-size": 30, "font-weight": 700, fill: COUL[s], "font-family": "Calibri, Arial, sans-serif" });
      D.el("rect", { x: 140, y: cy - 14, width: 280, height: 28, rx: 8, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 3 }, barres);
      rangs.push(D.el("rect", { x: 140, y: cy - 14, width: 280, height: 28, rx: 8, fill: COUL[s] }, barres));
    });
    txt(barres, 452, 677, "dans le liquide");
    // k6 : un petit thermomètre dont le mercure monte, une flèche, « il faut un peu plus chaud »
    const th = D.el("g", {}, g);
    D.el("rect", { x: 70, y: 614, width: 20, height: 96, rx: 10, fill: "#fff", stroke: ENCRE, "stroke-width": 4 }, th);
    [640, 664, 688].forEach(y => D.el("line", { x1: 96, x2: 110, y1: y, y2: y, stroke: ENCRE, "stroke-width": 3 }, th));
    D.el("circle", { cx: 80, cy: 722, r: 20, fill: ROUGE, stroke: ENCRE, "stroke-width": 4 }, th);
    const mercure = D.el("rect", { x: 75, width: 10, fill: ROUGE }, th);
    D.el("path", { d: "M 156 728 V 640 M 136 662 L 156 636 L 176 662", fill: "none", stroke: ORANGE, "stroke-width": 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, th);
    txt(th, 204, 676, "il faut un peu plus chaud"); txt(th, 204, 718, "à la même pression", { fill: D.BLEU });
    // k1-k2 : des molécules montent de la nappe vers la vapeur (une de chaque sorte, puis 5 vertes, 2 violettes, 2 bleues)
    const RISE = [["R32", 0.14], ["R125", 0.52], ["R134a", 0.33], ["R32", 0.62], ["R32", 0.22], ["R125", 0.42], ["R134a", 0.58], ["R32", 0.37], ["R32", 0.47]];
    const mont = RISE.map(([s, p], i) => ({ i: i, p: p, queue: D.el("line", { stroke: COUL[s], "stroke-width": 4, "stroke-linecap": "round" }, ech.fond) }));
    mont.forEach((m, i) => { m.maj = D.petite(ech.fond, RISE[i][0]); }); // les queues d'abord : la molécule passe devant
    const mila = D.heroine(ech.fond, { r: 30 });
    return function (t) {
      const mv = des(t, T[3] - 0.1, 1), ml = des(t, T[4] - 0.1, 1);
      ech.maj(t, { chaleur: 0.35 + 0.65 * des(t, T[0], 0.8), mv: mv, ml: ml, bulles: des(t, T[1] - 0.3, 0.6) });
      op(airTiede, fen(t, T[0] - 0.5, T[2] - 0.05)); op(airFroid, des(t, T[0] + 0.3));
      op(l2, fen(t, T[2], T[3])); op(l3, fen(t, T[3], T[4])); op(l4, fen(t, T[4], T[5]));
      op(past5, fen(t, T[5], T[6])); op(barres, fen(t, T[5], T[6] - 0.05)); op(th, fen(t, T[6], c.D + 1));
      const f5 = D.lisse((t - T[5] - 0.3) / Math.max(1, E[5] - T[5] - 0.6));
      rangs.forEach((r, k) => r.setAttribute("width", (280 * D.lerp(1, CIBLE[k], f5)).toFixed(1)));
      const niv = D.lerp(0.3, 0.75, D.lisse((t - T[6]) / (E[6] - T[6]))), yb = 722 - 14;
      mercure.setAttribute("y", (yb - niv * 94).toFixed(1)); mercure.setAttribute("height", (niv * 94 + 10).toFixed(1));
      mont.forEach(m => {
        const vu = des(t, m.i < 3 ? T[1] + 0.2 : T[2] + 0.2, 0.5), f = D.frac(t / 3.1 + m.i * 0.37);
        const xh = xDe(m.p), sh = ech.surface(xh, t), o = vu * D.fenetre(f, 0, 1, 0.15);
        const x = xh + 26 * f, y = D.lerp(sh + 0.6 * (YB - sh), YH + 22, f);
        m.maj(x, y, o, 12);
        m.queue.setAttribute("x1", (x - 3).toFixed(1)); m.queue.setAttribute("y1", (y + 14).toFixed(1));
        m.queue.setAttribute("x2", (x - 8).toFixed(1)); m.queue.setAttribute("y2", (y + 44).toFixed(1)); m.queue.setAttribute("opacity", (0.3 * o).toFixed(2));
      });
      const p = D.courbe([[T[0], 0.07], [E[6], 0.46]], t, true), x = xDe(p);
      const humeur = t > T[6] ? "chaud" : "sourire";
      mila({ x: x, y: flotte(ech, x, t, ECH), s: ECH, t: t, temp: 0.08, etat: "bout", humeur: humeur, regard: [1, 0] });
      return { carte: 0.5 * D.borne((p - 0.07) / 0.39, 0, 1), temp: 0.08, etat: "bout", humeur: humeur };
    };
  };

  /* ---------- la loupe sur la basse pression (glisse k7, bulle-rosee) ---------- */
  function loupeBP(parent) {
    const L = D.loupe(parent, { x: 40, y: 330, l: 900, h: 370, plageH: [180, 470], plageP: [4.3, 6.9], isobares: ["BP"], isos: ["isoM1", "isoP5"] });
    L.PB = L.pt([198.4, DG.BP]); L.PR = L.pt([411.9, DG.BP]); L.PE = L.pt([252.4, DG.BP]); // bulle, rosée, entrée de l'évaporateur (sur la BP)
    return L;
  }

  /* ---------- 5 · glisse : la température monte jusqu'à la dernière goutte ---------- */
  S.glisse = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const e1 = D.el("g", {}, g), e2 = D.el("g", {}, g);
    const ech = evaporateur(e1, { graine: 11, revele: false, temp: p => D.lerp(0.08, 0.12, D.borne(p / 0.8, 0, 1)) });
    // les instruments, sous le tube : manomètre (aiguille immobile) et trois thermomètres à pince
    const gm = D.el("g", {}, e1);
    D.el("rect", { x: 316, y: YB + 16, width: 8, height: 100, fill: "url(#vm-cuivre-h)" }, gm);
    const man = D.manometre(gm, 320, 660, 54, "BP", D.BLEU);
    const tE = D.thermometre(e1, 40, 612, { pince: [95, YB + 8] });
    const tM = D.thermometre(e1, 405, 612, { pince: [490, YB + 8] });
    const tS = D.thermometre(e1, 770, 612, { pince: [855, YB + 8] });
    // en haut : les pastilles et l'étiquette de la dernière goutte
    const p0 = D.pastille(e1, 40, 205, "liquide : de plus en plus de R134a", BLEU, 30);
    const p1 = D.pastille(e1, 40, 205, "même pression tout le long", D.BLEU, 30);
    const xg = xDe(0.755);
    const bague = D.el("ellipse", { cx: xg.toFixed(1), cy: 456, rx: 82, ry: 40, fill: "none", stroke: ORANGE, "stroke-width": 4, "stroke-dasharray": "2 8", "stroke-linecap": "round" }, e1);
    const l3 = D.el("g", {}, e1); txt(l3, 745, 205, "la dernière goutte", { "text-anchor": "middle" }); D.trait(l3, 745, 216, 745, 414);
    const cadreMele = D.el("rect", { x: 786, y: 338, width: 148, height: 130, rx: 14, fill: "none", stroke: VERTOK, "stroke-width": 4, "stroke-dasharray": "10 8" }, e1);
    const p5 = D.pastille(e1, 940, 205, "de nouveau bien mêlées", VERTOK, 30, "end"), l5 = D.trait(e1, 866, 216, 866, 336, VERTOK);
    const p6 = D.pastille(e1, 940, 205, "0 → 5 °C à la même pression", ORANGE, 30, "end");
    const fleche = D.el("g", {}, e1);
    D.el("path", { d: "M 110 742 H 860", stroke: ORANGE, "stroke-width": 8, "stroke-linecap": "round" }, fleche);
    D.el("path", { d: "M 844 726 L 868 742 L 844 758", fill: "none", stroke: ORANGE, "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, fleche);
    const mila = D.heroine(ech.fond, { r: 30 });
    // la loupe (k7) : l'isobare traversée de gauche à droite, deux isothermes penchées
    const L = loupeBP(e2), ov = D.el("g", {}, e2);
    const bm = marque(ov, L.PB, BLEUT), rm = marque(ov, L.PR, ROUGE);
    const trait = D.el("line", { y1: L.PB[1], y2: L.PB[1], stroke: ORANGE, "stroke-width": 8, "stroke-linecap": "round" }, ov);
    const pointe = D.el("path", { fill: ORANGE }, ov);
    const m1 = D.el("g", {}, ov); gros(m1, 540, 580, "−1 °C", 34, BLEUT);
    const m5 = D.el("g", {}, ov); gros(m5, 500, 424, "+5 °C", 34, ROUGE);
    const penche = D.el("g", {}, ov); gros(penche, 500, 368, "des lignes de température penchées", 30, ENCRE, "middle");
    const tv = A(4, 0.3), tFl = A(7, 0.5);
    return function (t) {
      const vue2 = des(t, T[7] - 0.2, 0.7);
      op(e1, 1 - vue2); op(e2, vue2);
      ech.maj(t, { chaleur: 1, mv: 1, ml: 1, bulles: 1 });
      // l'héroïne : elle avance dans la nappe, atteint la petite goutte du bout, puis s'envole en vapeur
      const p = D.courbe([[T[0], 0.34], [T[2], 0.46], [E[2], 0.54], [T[3], 0.63], [A(3, 0.8), 0.76], [tv, 0.8], [E[4], 0.86], [E[6], 0.93]], t, true), x = xDe(p);
      const envol = D.lisse((t - tv) / 1.3), etat = t < tv + 0.4 ? "bout" : "vapeur";
      const temp = D.courbe([[T[0], 0.08], [tv, 0.12]], t, true);
      const humeur = t > T[3] && t < E[3] + 0.5 || t > tv - 0.2 && t < tv + 1.5 ? "surprise" : "sourire";
      mila({ x: x, y: D.lerp(flotte(ech, x, t, ECH), vole(t), envol), s: ECH, t: t, temp: temp, etat: etat, humeur: humeur, regard: [1, 0] });
      // instruments
      man(0.35, 1); op(gm, des(t, T[1] - 0.1)); tE("0 °C", des(t, A(1, 0.55))); tM("≈ 3 °C", des(t, A(2, 0.5))); tS("+5 °C", des(t, A(4, 0.55)));
      op(p0, fen(t, T[0] - 0.4, T[1])); op(p1, fen(t, T[1], T[2]));
      op(l3, fen(t, A(3, 0.1), T[4] + 0.3)); op(bague, fen(t, A(3, 0.1), T[4] + 0.3));
      op(cadreMele, fen(t, T[5] + 0.3, T[6])); op(p5, fen(t, T[5], T[6])); op(l5, fen(t, T[5], T[6]));
      op(p6, fen(t, T[6], T[7] - 0.1)); op(fleche, fen(t, T[6] + 0.3, T[7] - 0.1));
      // la loupe
      const xf = D.lerp(L.PB[0] + 8, L.PR[0], D.lisse((t - tFl) / Math.max(1, E[7] - tFl - 0.4)));
      trait.setAttribute("x1", (L.PB[0] + 8).toFixed(1)); trait.setAttribute("x2", (xf - 12).toFixed(1));
      pointe.setAttribute("d", "M " + xf.toFixed(1) + " " + L.PB[1].toFixed(1) + " l -28 -15 v 30 Z");
      const aF = des(t, tFl, 0.4); op(trait, aF); op(pointe, aF); op(bm, aF); op(rm, des(t, tFl + (E[7] - tFl) * 0.8, 0.4));
      op(m1, des(t, A(7, 0.2))); op(m5, des(t, A(7, 0.2))); op(penche, des(t, A(7, 0.3)));
      return { carte: D.lerp(0.5, 1, D.borne((p - 0.4) / 0.45, 0, 1)), temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* ---------- 6 · bulle-rosee : une pression, deux températures ---------- */
  function verre(parent, x, y, w, h) { // un petit verre (contour, fond) ; renvoie le groupe de son contenu (découpé au verre)
    const d = "M " + x + " " + y + " L " + (x + 6) + " " + (y + h - 12) + " Q " + (x + 8) + " " + (y + h) + " " + (x + 22) + " " + (y + h) +
      " L " + (x + w - 22) + " " + (y + h) + " Q " + (x + w - 8) + " " + (y + h) + " " + (x + w - 6) + " " + (y + h - 12) + " L " + (x + w) + " " + y;
    const g = D.el("g", {}, parent), cid = "vgb-verre-" + (++nid);
    D.el("path", { d: d + " Z" }, D.el("clipPath", { id: cid }, g));
    D.el("path", { d: d + " Z", fill: "#eef5fb" }, g);
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    D.el("path", { d: d, fill: "none", stroke: "#637285", "stroke-width": 5, "stroke-linejoin": "round" }, g);
    return { g: g, dedans: dedans };
  }
  function accolade(x0, x1, y, h) { // pointe en haut, extrémités en y
    const m = (x0 + x1) / 2, r = 20, a = y - h / 2;
    return "M " + x0 + " " + y + " Q " + x0 + " " + a + " " + (x0 + r) + " " + a + " L " + (m - r) + " " + a + " Q " + m + " " + a + " " + m + " " + (y - h) +
      " Q " + m + " " + a + " " + (m + r) + " " + a + " L " + (x1 - r) + " " + a + " Q " + x1 + " " + a + " " + x1 + " " + y;
  }

  S["bulle-rosee"] = function (g, c) {
    const T = c.T, A = c.A;
    const L = loupeBP(g), [PB, PR, PE] = [L.PB, L.PR, L.PE];
    const cid = "vgb-clip-" + (++nid);
    D.el("rect", { x: 40, y: 330, width: 900, height: 370 }, D.el("clipPath", { id: cid }, g));
    const gc = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    const courbe = (i, coul) => D.el("polyline", { points: DG.cloche.filter(r => r[0] > 3.6 && r[0] < 8).map(r => L.pt([r[i], r[0]]).map(v => v.toFixed(1)).join(",")).join(" "),
      fill: "none", stroke: coul, "stroke-width": 4, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0 }, gc);
    const cG = courbe(1, BLEUT), cD = courbe(2, ROUGE);
    const surlignage = D.el("path", { d: "M " + PE[0].toFixed(1) + " " + PE[1].toFixed(1) + " H " + PR[0].toFixed(1), stroke: ORANGE, "stroke-width": 9, "stroke-linecap": "round", opacity: 0 }, g);
    const zone = txt(g, 260, 672, "liquide + vapeur", { fill: BLEU });
    const mB = marque(g, PB, BLEUT), mR = marque(g, PR, ROUGE), mE = marque(g, PE, ORANGE);
    // k0 : une pression, deux températures
    const past0 = D.pastille(g, 490, 746, "une pression, deux températures", ORANGE, 32, "middle");
    // k1 : le verre de liquide avec UNE bulle, au point de bulle
    const g1 = D.el("g", {}, g), v1 = verre(g1, 42, 186, 76, 102);
    const eau1 = D.el("path", { fill: D.couleur(0.08, false), opacity: 0.8 }, v1.dedans);
    const bulle1 = D.el("circle", { fill: "#fff", "fill-opacity": 0.5, stroke: "#fff", "stroke-width": 3 }, v1.dedans);
    D.trait(g1, 82, 292, PB[0] - 3, PB[1] - 12);
    D.lignes(g1, 138, 236, ["bulle :", "la 1re bulle"], { "font-size": 32, "font-weight": 600, fill: ENCRE, "font-family": "Calibri, Arial, sans-serif" }, 40);
    // k2 : le verre de vapeur avec UNE goutte, au point de rosée
    const g2 = D.el("g", {}, g), v2 = verre(g2, 788, 186, 76, 102);
    const BASE2 = [[808, 206], [843, 200], [824, 229], [849, 241], [806, 246]]; // vapeur : 2 R32, 1 R125, 2 R134a, bien séparées
    const vap2 = [["R32", 0], ["R32", 1], ["R125", 2], ["R134a", 3], ["R134a", 4]].map(([s, k]) => ({ k: k, maj: D.petite(v2.dedans, s) }));
    const goutte = D.el("path", { d: "M 0 -13 Q 11 4 0 11 Q -11 4 0 -13 Z", fill: "#8fc3f0", stroke: BLEUT, "stroke-width": 2.5 }, v2.dedans);
    D.trait(g2, 826, 292, PR[0] + 3, PR[1] - 12);
    D.lignes(g2, 775, 236, ["rosée :", "la dernière goutte"], { "font-size": 32, "font-weight": 600, fill: ENCRE, "font-family": "Calibri, Arial, sans-serif", "text-anchor": "end" }, 40);
    // k3 : les deux courbes
    const lG = D.el("g", {}, g); txt(lG, 156, 470, "courbe de bulle", { fill: BLEUT }); D.trait(lG, 142, 462, 116, 462, BLEUT);
    const lD = D.el("g", {}, g); txt(lD, 728, 400, "courbe de rosée", { fill: ROUGE, "text-anchor": "end" }); D.trait(lD, 740, 392, 762, 392, ROUGE);
    // k4 : les deux températures
    const t1 = D.el("g", {}, g); gros(t1, 122, 495, "−1 °C", 34, BLEUT);
    const t2 = D.el("g", {}, g); gros(t2, 790, 495, "+5 °C", 34, ROUGE);
    // k5 : l'accolade, le glissement, la formule
    const k5 = D.el("g", {}, g);
    D.el("path", { d: accolade(PB[0] - 9, PR[0] - 11, 322, 26), fill: "none", stroke: ORANGE, "stroke-width": 5, "stroke-linecap": "round" }, k5);
    D.trait(k5, PB[0] - 9, 324, PB[0] - 9, PB[1] - 12, ORANGE); D.trait(k5, PR[0] - 11, 324, PR[0] - 11, PR[1] - 12, ORANGE);
    gros(k5, (PB[0] + PR[0]) / 2 - 10, 270, "glissement ≈ 6 degrés", 38, ORANGE, "middle");
    const form5 = D.pastille(g, 490, 746, "glissement = rosée − bulle, à la même pression", ORANGE, 30, "middle");
    // k6 : l'entrée de l'évaporateur et ce que l'évaporateur voit
    const eE = D.el("g", {}, g); txt(eE, 280, 489, "entrée : 0 °C");
    const eV = D.el("g", {}, g); txt(eV, 738, 560, "ce que voit l'évaporateur", { "text-anchor": "end" });
    // k7 : l'encart « corps pur »
    const enc = D.el("g", { "data-layout-allow-overlap": "" }, g); // l'encart opaque posé sur la loupe estompée : voulu
    D.el("rect", { x: 130, y: 345, width: 720, height: 345, rx: 22, fill: "#fffdf8", stroke: ENCRE, "stroke-width": 4 }, enc);
    gros(enc, 165, 400, "corps pur", 42, ORANGE);
    const cx = 330, yH = 440, yBas = 650, bord = u => 150 * Math.pow(u, 0.55), pas = [];
    for (let k = 0; k <= 25; k++) pas.push(Math.pow(k / 25, 1.8)); // plus de points au sommet : il reste rond
    const gauche = pas.map(u => (cx - bord(u)).toFixed(1) + "," + (yH + u * (yBas - yH)).toFixed(1)), droite = pas.map(u => (cx + bord(u)).toFixed(1) + "," + (yH + u * (yBas - yH)).toFixed(1));
    D.el("polygon", { points: gauche.concat(droite.slice().reverse()).join(" "), fill: "rgba(47,111,184,.10)" }, enc);
    D.el("polyline", { points: gauche.join(" "), fill: "none", stroke: BLEU, "stroke-width": 5, "stroke-linejoin": "round" }, enc);
    D.el("polyline", { points: droite.join(" "), fill: "none", stroke: BLEU, "stroke-width": 5, "stroke-linejoin": "round" }, enc);
    const yIso = yH + 0.55 * (yBas - yH), uIso = 150 * Math.pow(0.55, 0.55);
    D.el("line", { x1: cx - 168, x2: cx + 168, y1: yIso, y2: yIso, stroke: D.BLEU, "stroke-width": 3, "stroke-dasharray": "8 8" }, enc);
    D.el("line", { x1: cx - uIso, x2: cx + uIso, y1: yIso, y2: yIso, stroke: ORANGE, "stroke-width": 9, "stroke-linecap": "round" }, enc);
    marque(enc, [cx - uIso, yIso], BLEUT); marque(enc, [cx + uIso, yIso], ROUGE);
    gros(enc, 520, 505, "bulle et rosée :", 34, ENCRE); gros(enc, 520, 553, "même température", 34, ENCRE); gros(enc, 520, 619, "pas de glissement", 36, ORANGE);
    return function (t) {
      const dim = D.lerp(1, 0.18, des(t, T[7] - 0.2, 0.7)), pTout = des(t, T[7] - 0.2, 0.7);
      op(L.g, dim); op(zone, 1 - pTout);
      op(past0, fen(t, T[0] - 0.4, T[1]));
      op(mB, des(t, T[1]) * (1 - pTout)); op(mR, des(t, T[2]) * (1 - pTout));
      const e1 = des(t, T[1]) * (1 - des(t, A(3, 0.8))), e2 = des(t, T[2]) * (1 - des(t, A(3, 0.8)));
      op(g1, e1); op(g2, e2);
      const ys = 186 + 102 * 0.34, fb = D.frac(t / 2.2);
      eau1.setAttribute("d", "M 38 " + ys + " " + [0, 1, 2, 3, 4, 5, 6].map(k => "L " + (38 + k * 14) + " " + (ys + 2.6 * Math.sin(k * 1.3 + t * 3.4)).toFixed(1)).join(" ") + " L 122 300 L 38 300 Z");
      bulle1.setAttribute("cx", (80 + 4 * Math.sin(t * 4)).toFixed(1)); bulle1.setAttribute("cy", D.lerp(268, ys + 6, fb).toFixed(1));
      bulle1.setAttribute("r", D.lerp(4, 11, fb).toFixed(1)); bulle1.setAttribute("opacity", D.fenetre(fb, 0, 1, 0.1).toFixed(2));
      vap2.forEach(m => m.maj(BASE2[m.k][0] + 4 * Math.sin(t * 0.9 + m.k * 2.1), BASE2[m.k][1] + 4 * Math.cos(t * 0.7 + m.k * 1.7), 1, 9));
      const gp = 1 + 0.06 * Math.sin(t * 3); goutte.setAttribute("transform", "translate(826 270) scale(" + gp.toFixed(3) + ")");
      const th = D.lisse((t - A(3, 0.2)) / 0.6), td = D.lisse((t - A(3, 0.6)) / 0.6);
      cG.setAttribute("stroke-width", D.lerp(4, 11, th).toFixed(1)); cD.setAttribute("stroke-width", D.lerp(4, 11, td).toFixed(1));
      const ouvertG = th * (1 - pTout), ouvertD = td * (1 - pTout); op(cG, ouvertG); op(cD, ouvertD);
      op(lG, fen(t, A(3, 0.2), T[4] + 0.2)); op(lD, fen(t, A(3, 0.6), T[4] + 0.2));
      op(t1, des(t, T[4]) * (1 - pTout)); op(t2, des(t, A(4, 0.55)) * (1 - pTout));
      op(k5, fen(t, T[5], T[6] - 0.05)); op(form5, fen(t, A(5, 0.5), T[6] - 0.05));
      op(surlignage, des(t, A(6, 0.55)) * (1 - pTout)); op(mE, des(t, T[6]) * (1 - pTout));
      op(eE, des(t, T[6]) * (1 - pTout)); op(eV, des(t, A(6, 0.55)) * (1 - pTout));
      op(enc, des(t, T[7] + 0.2, 0.7));
      return { temp: 0.12, etat: "bout", humeur: "sourire" };
    };
  };

  /* ---------- 7 · surchauffe : la fin de l'évaporateur et le tube d'aspiration ---------- */
  S.surchauffe = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const YH2 = 262, YB2 = 342, XC = 800, XT = 824; // XC : le symbole du compresseur ; XT : fin du tube (son raccord)
    for (let x = 62; x <= 322; x += 26) D.el("rect", { x: x, y: 180, width: 7, height: 244, fill: "url(#vm-acier-h)", opacity: 0.55 }, g);
    const air = D.el("g", {}, g), chaud = D.el("g", {}, g), chevrons = [], vagues = [];
    [100, 200, 300].forEach((x, k) => { for (let j = 0; j < 3; j++) chevrons.push({ x: x, f: (j + k * 0.4) / 3, maj: D.chevron(air) }); });
    [150, 250].forEach((x, k) => [-1, 1].forEach(cote => vagues.push({ x: x, cote: cote, f: D.frac(k * 0.37 + (cote > 0 ? 0.5 : 0)), maj: D.chaleur(chaud) })));
    D.el("rect", { x: X0, y: YH2 - 16, width: XT - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YB2, width: XT - X0, height: 16, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: X0, y: YH2, width: XT - X0, height: YB2 - YH2, fill: "#f4f8fc" }, g);
    D.el("rect", { x: X0 - 12, y: YH2 - 22, width: 12, height: YB2 - YH2 + 44, rx: 3, fill: "url(#vm-acier)" }, g);
    // le bulbe posé sur le tube d'aspiration
    D.el("rect", { x: 560, y: YH2 - 40, width: 120, height: 24, rx: 10, fill: "url(#vm-acier)", stroke: "#5d6b7a", "stroke-width": 2 }, g);
    [578, 660].forEach(x => D.el("rect", { x: x, y: YH2 - 44, width: 10, height: 32, rx: 3, fill: "#5d6b7a" }, g));
    txt(g, 700, YH2 - 22, "bulbe");
    txt(g, 360, 205, "tube d'aspiration"); txt(g, 40, 472, "fin de l'évaporateur");
    // la vapeur : de nouveau mêlée 2 : 1 : 2, partout
    const r = D.alea(51), NV = 26, psV = [];
    for (let i = 0; i < NV; i++) psV.push(D.lerp(0.02, 0.98, (i + 0.15 + 0.7 * r()) / NV));
    const sV = assigner(psV, () => UNI, 52);
    const MV = psV.map((p, i) => ({ p: p, v: D.frac(i * 0.382 + 0.31), ph: r() * 6.28, maj: D.petite(g, sV[i]) }));
    // la goutte de liquide qui file vers le compresseur (k6)
    let xs = -999;
    const slug = D.liquide(g, { x0: 345, x1: XT - 2, yh: YH2, yb: YB2, pas: 6, opacite: 0.78, niveau: x => { const u = (x - xs) / 52; return Math.abs(u) < 1 ? 0.55 * Math.sqrt(1 - u * u) : 0; }, couleur: () => D.couleur(0.05, false) });
    D.image(g, "compresseur", XC, 242, 150, 120);
    txt(g, 950, 402, "compresseur", { "text-anchor": "end" });
    const alerte = D.el("g", {}, g);
    D.el("ellipse", { cx: XC + 74, cy: 298, rx: 80, ry: 68, fill: "none", stroke: ROUGE, "stroke-width": 8 }, alerte);
    gros(alerte, 950, 452, "danger : du liquide", 32, ROUGE, "end");
    const mila = D.heroine(g, { r: 30 });
    const th = D.thermometre(g, 355, 440, { pince: [440, YB2 + 8] });
    // k2 : la définition
    const def = carte(g, 490, 610, ["surchauffe :", "de combien la vapeur dépasse la fin de l'ébullition"], ORANGE, 30);
    // k3-k5-k7 : l'afficheur de manomètre électronique
    const wa = D.el("g", {}, g), aff = D.afficheur(wa, 40, 540, 300, ["rosée +5 °C", "bulle −1 °C"], "BP");
    const cadre = wa.querySelector('rect[stroke="#c9451a"]');
    // k4 : le bon calcul ; k5 : le mauvais
    const f4 = D.el("g", {}, g); gros(f4, 380, 612, "11 − 5 = 6 degrés", 52, VERTOK); gros(f4, 920, 622, "✓", 72, VERTOK, "end");
    const f5 = D.el("g", {}, g); gros(f5, 380, 612, "11 − (−1) = 12 degrés", 50, ROUGE); gros(f5, 920, 622, "✗", 72, ROUGE, "end"); gros(f5, 380, 690, "le double !", 56, ROUGE);
    // k6 : le détendeur qui s'ouvrirait
    const p6 = D.el("g", {}, g);
    D.image(p6, "detendeur", 60, 520, 170, 170);
    txt(p6, 145, 730, "détendeur", { "text-anchor": "middle" });
    D.el("path", { d: "M 330 618 H 246 M 266 600 L 244 618 L 266 636", fill: "none", stroke: ORANGE, "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, p6);
    gros(p6, 350, 630, "il l'ouvrirait", 38, ORANGE);
    // k7 : la bonne lecture
    const p7 = D.pastille(g, 660, 640, "surchauffe → rosée", ORANGE, 36, "middle");
    const tS = A(6, 0.4);
    return function (t) {
      chevrons.forEach(ch => {
        const f = D.frac(ch.f + t * 0.16), y = 180 + f * 244, cache = y > YH2 - 38 && y < YB2 + 38;
        ch.maj(ch.x, y, 0, y < YH2 ? "#e8914a" : "#3d7fca", cache ? 0 : 0.9 * D.fenetre(f, 0, 1, 0.12));
      });
      vagues.forEach(v => {
        const f = D.frac(v.f + t * 0.45), haut = v.cote < 0;
        v.maj(v.x, haut ? D.lerp(YH2 - 66, YH2 - 22, f) : D.lerp(YB2 + 62, YB2 + 22, f), haut ? 0 : 180, D.fenetre(f, 0, 1, 0.25));
      });
      MV.forEach(m => {
        const x = xDe(m.p * 0.84 + 0.016) + 14 * Math.sin(t * 0.55 + m.ph), y = YH2 + 16 + m.v * 48 + 5 * Math.sin(t * 1.1 + m.ph * 2);
        m.maj(Math.min(x, XT - 16), y, 1, 8.5);
      });
      xs = D.lerp(370, XT + 70, D.borne((t - tS) / Math.max(1, E[6] - tS + 0.3), 0, 1)); if (t < tS) xs = -999;
      slug.maj(t);
      const aS = des(t, A(6, 0.75), 0.4) * (1 - des(t, T[7], 0.4));
      op(alerte, aS * (0.75 + 0.25 * Math.sin(t * 7)));
      // l'héroïne : vapeur qui se réchauffe, le long du tube
      const x = D.courbe([[T[0], 90], [E[0], 400], [A(1, 0.6), 470], [T[6], 640], [E[7], 740]], t, true);
      const temp = D.courbe([[T[0], 0.12], [E[0], 0.2]], t, true);
      const humeur = t > T[6] && t < T[7] ? "surprise" : "sourire";
      mila({ x: x, y: 302 + Math.sin(t * 2.3) * 6, s: 0.8, t: t, temp: temp, etat: "vapeur", humeur: humeur, regard: [1, 0] });
      th(t > A(1, 0.4) ? "+11 °C" : "", des(t, A(1, 0.5)));
      op(def, fen(t, T[2], T[3]));
      const sel = t > T[5] - 0.05 && t < T[6] ? 1 : 0;
      aff(sel, 1); op(wa, des(t, T[3]) * (1 - des(t, T[6] - 0.1, 0.4)) + des(t, T[7], 0.5));
      cadre.setAttribute("stroke", sel ? ROUGE : VERTOK);
      op(f4, fen(t, T[4], T[5])); op(f5, fen(t, T[5], T[6] - 0.05)); op(p6, fen(t, T[6], T[7] - 0.05)); op(p7, des(t, T[7] + 0.3, 0.5));
      return { carte: 1 + D.borne((x - 90) / 650, 0, 1), temp: temp, etat: "vapeur", humeur: humeur };
    };
  };
})();

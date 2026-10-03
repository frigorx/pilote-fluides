/* =====================================================================
   voyage-scenes-b.js — la ligne liquide : la bouteille de liquide,
   le filtre déshydrateur, le voyant liquide, l'électrovanne
   ---------------------------------------------------------------------
   Même contrat que voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t),
   phrases 0-1 = présentation (l'organe en vrai, posé par le théâtre),
   coupe à partir de la phrase 2. Zones interdites : en-tête (x < 760,
   y < 140) et carte (x > 1200, y < 285). Le fluide est LIQUIDE partout ici
   (haute pression, tiède) : nappe ou tube plein, avec des reflets qui filent.
   CHANGER DE PLAN : l'héroïne passe sous le liquide (immergée) ou au-dessus
   (dans un tube plongeur, un passage) en déplaçant son groupe (maj.g).
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI, TL = 0.5, LIQ = D.couleur(TL, false);
  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };
  const pastilles = (g, x, ancre, liste) => liste.map(([s, coul, a, b]) => ({ g: D.pastille(g, x, 748, s, coul, 30, ancre), a: a, b: b }));
  const montrer = (liste, c, t) => liste.forEach(p => p.g.setAttribute("opacity", D.fenetre(t, c.T[p.a], p.b + 1 < c.T.length ? c.T[p.b + 1] - 0.1 : c.D).toFixed(2)));

  /* ---------- 4 · la bouteille de liquide (réservoir vertical, tube plongeur) ---------- */
  S.bouteille = function (g, c) {
    D.el("rect", { x: 60, y: 276, width: 600, height: 68, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 936, y: 300, width: 604, height: 68, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 640, y: 220, width: 320, height: 492, rx: 80, fill: "url(#vm-marine-h)" }, g);
    D.el("rect", { x: 664, y: 250, width: 272, height: 432, rx: 48, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 60, y: 286, width: 620, height: 48, fill: "#f4f8fc" }, g);
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g);
    const r = D.alea(5), V = [];
    for (let i = 0; i < 9; i++) V.push({ x: 690 + r() * 140, y: 270 + r() * 170, ph: r() * TOUR, maj: D.mol(vap) });
    const cuve = D.liquide(g, { x0: 664, x1: 936, yh: 250, yb: 680, niveau: () => 0.45, couleur: () => LIQ, pas: 16 });
    const arrivee = D.liquide(g, { x0: 60, x1: 680, yh: 286, yb: 334, niveau: () => 0.55, couleur: () => LIQ });
    const chute = D.bulles(D.el("g", {}, g), 16, 9, true);
    D.el("rect", { x: 846, y: 300, width: 90, height: 68, fill: "url(#vm-cuivre)" }, g); // coude du tube plongeur
    D.el("rect", { x: 846, y: 330, width: 36, height: 336, fill: "url(#vm-cuivre-h)" }, g);
    D.el("rect", { x: 854, y: 310, width: 82, height: 48, fill: LIQ, opacity: 0.85 }, g);
    D.el("rect", { x: 854, y: 330, width: 20, height: 336, fill: LIQ, opacity: 0.85 }, g);
    D.el("rect", { x: 936, y: 310, width: 604, height: 48, fill: LIQ, opacity: 0.82 }, g);
    const sortie = D.courant(g, 936, 1540, 310, 358, 8, 3);
    const dessus = D.el("g", {}, g);
    D.etiquette(g, 60, 262, "entrée : liquide du condenseur");
    D.etiquette(g, 1540, 410, "sortie : liquide vers le détendeur", { "text-anchor": "end" });
    D.etiquette(g, 1000, 568, "tube plongeur"); D.trait(g, 996, 560, 886, 560);
    D.etiquette(g, 620, 608, "réserve de liquide", { "text-anchor": "end" }); D.trait(g, 624, 600, 700, 600);
    const pas = pastilles(g, 800, "middle", [["seul du liquide repart, jamais de vapeur", "#1e7e54", 4, 4]]);
    const mila = D.heroine(fond, { r: 30 });
    const t1 = c.A(2, 0.45), t2 = c.A(2, 0.85), t3 = c.T[4], t4 = c.A(4, 0.5);
    return function (t) {
      cuve.maj(t); arrivee.maj(t); sortie(t, 120); montrer(pas, c, t);
      chute(t, q => [672 + q * 30, 336, cuve.surface(686, t), 1, LIQ]);
      V.forEach(m => m.maj(m.x + Math.sin(t * 0.8 + m.ph) * 20, m.y + Math.cos(t * 0.7 + m.ph) * 14, TL, true, 0.8));
      let x, y, s = 0.55;
      if (t < t1) { x = D.courbe([[c.T[2], 120], [t1, 680]], t); y = arrivee.surface(x, t) + 2; plan(mila, fond); }
      else if (t < t2) { const k = (t - t1) / (t2 - t1); x = D.lerp(690, 730, k); y = D.lerp(330, cuve.surface(730, t) + 6, k * k); }
      else if (t < t3) { const k = D.lisse((t - t2) / (c.E[3] - t2)); x = D.lerp(730, 840, k); y = D.lerp(cuve.surface(730, t) + 6, 640, k); if (k > 0.3) plan(mila, dessus); }
      else if (t < t4) { plan(mila, dessus); s = 0.36; x = 864; y = D.lerp(655, 334, D.lisse((t - t3) / (t4 - t3))); }
      else { plan(mila, dessus); s = 0.45; x = D.lerp(880, 1630, D.lisse((t - t4) / (c.D - t4 - 0.2))); y = 334; }
      const humeur = t > t1 && t < t2 + 0.6 ? "surprise" : "sourire";
      mila({ x: x, y: y, s: s, t: t, temp: TL, etat: "liquide", humeur: humeur, regard: t < t3 ? [1, 1] : [1, -1] });
      return { carte: D.courbe([[c.T[2], 7.6], [t3, 8], [c.D, 8.5]], t), temp: TL, etat: "liquide", humeur: humeur };
    };
  };

  /* ---------- 5 · le filtre déshydrateur (coupe : grains, grille) ---------- */
  S.filtre = function (g, c) {
    D.el("rect", { x: 60, y: 436, width: 390, height: 68, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 1150, y: 436, width: 390, height: 68, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 420, y: 330, width: 760, height: 280, rx: 64, fill: "url(#vm-noir)" }, g);
    D.el("rect", { x: 460, y: 362, width: 680, height: 216, rx: 30, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 60, y: 446, width: 420, height: 48, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 1120, y: 446, width: 420, height: 48, fill: "#f4f8fc" }, g);
    const fond = D.el("g", {}, g);
    D.el("rect", { x: 60, y: 446, width: 420, height: 48, fill: LIQ, opacity: 0.82 }, g);
    D.el("rect", { x: 1120, y: 446, width: 420, height: 48, fill: LIQ, opacity: 0.82 }, g);
    D.el("rect", { x: 460, y: 362, width: 680, height: 216, rx: 30, fill: LIQ, opacity: 0.45 }, g);
    const flux = [D.courant(g, 60, 480, 446, 494, 5, 1), D.courant(g, 1120, 1540, 446, 494, 5, 2)];
    const r = D.alea(13);
    D.el("rect", { x: 616, y: 370, width: 368, height: 200, rx: 12, fill: "#e8dcc2", opacity: 0.55 }, g);
    for (let i = 0; i < 16; i++) for (let j = 0; j < 9; j++)
      D.el("circle", { cx: 628 + i * 22.5 + (r() - 0.5) * 5, cy: 382 + j * 22 + (r() - 0.5) * 5, r: 9.5, fill: "#efe3c6", stroke: "#b59b6a", "stroke-width": 1.5 }, g);
    D.el("line", { x1: 1016, y1: 372, x2: 1016, y2: 568, stroke: "#6b7785", "stroke-width": 12, "stroke-dasharray": "7 6" }, g);
    D.el("path", { d: "M 690 346 H 900 M 878 336 L 904 346 L 878 356", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    const objets = D.el("g", {}, g);
    const EAU = [], SAL = [];
    for (let i = 0; i < 7; i++) EAU.push({ d: D.lerp(c.T[2], c.E[3] - 1, i / 6), x: 632 + r() * 120, y: 388 + r() * 160,
      e: D.el("path", { d: "M 0 -12 Q 9 2 0 9 Q -9 2 0 -12 Z", fill: "#3d9be9", stroke: "#fff", "stroke-width": 2 }, objets) });
    for (let i = 0; i < 6; i++) SAL.push({ d: D.lerp(c.T[4], c.E[4] - 0.8, i / 5), y: 386 + r() * 168,
      e: D.el("path", { d: "M -7 -4 L -2 -8 L 6 -5 L 8 3 L 1 8 L -6 5 Z", fill: "#3f3f3f" }, objets) });
    const dessus = D.el("g", {}, g);
    D.etiquette(g, 800, 314, "sens de passage", { "text-anchor": "middle" });
    D.etiquette(g, 60, 420, "entrée", { "font-weight": 700 }); D.etiquette(g, 1540, 420, "sortie", { "font-weight": 700, "text-anchor": "end" });
    D.etiquette(g, 800, 654, "des grains qui boivent l'eau", { "text-anchor": "middle" }); D.trait(g, 800, 626, 800, 572);
    D.etiquette(g, 1044, 696, "grille : retient les saletés"); D.trait(g, 1040, 688, 1018, 574);
    const pas = pastilles(g, 60, "start", [["l'eau gèlerait au détendeur, et ferait de l'acide", "#c0392b", 3, 3], ["propre et sèche ✓", "#1e7e54", 5, 5]]);
    const mila = D.heroine(fond, { r: 30 });
    function chemin(q, yf) { return [D.lerp(80, 1620, q), q < 0.25 || q > 0.68 ? 470 : yf]; }
    return function (t) {
      flux.forEach(f => f(t, 110)); montrer(pas, c, t);
      EAU.forEach(o => { // l'eau arrive avec le fluide et reste prise dans les grains
        const k = D.borne((t - o.d) / 2.6, 0, 1);
        const x = k < 0.6 ? D.lerp(80, 470, k / 0.6) : D.lerp(470, o.x, (k - 0.6) / 0.4), y = k < 0.6 ? 470 : D.lerp(470, o.y, (k - 0.6) / 0.4);
        o.e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + (k >= 1 ? 0.7 : 1) + ")");
        o.e.setAttribute("opacity", t < o.d ? 0 : k >= 1 ? 0.75 : 1);
      });
      SAL.forEach(o => {
        const k = D.borne((t - o.d) / 3, 0, 1), x = D.lerp(80, 1004, k), y = k < 0.42 ? 470 : D.lerp(470, o.y, D.borne((k - 0.42) / 0.3, 0, 1));
        o.e.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); o.e.setAttribute("opacity", t < o.d ? 0 : 1);
      });
      const q = D.courbe([[c.T[2], 0.02], [c.E[4], 0.12], [c.T[5], 0.13], [c.D - 0.2, 1]], t);
      plan(mila, dessus);
      const [x, y] = chemin(q, 470 + Math.sin(t * 2) * 30);
      mila({ x: x, y: y, s: 0.5, t: t, temp: TL, etat: "liquide", humeur: "sourire", regard: [1, 0] });
      return { carte: 8.5 + D.borne(q, 0, 1), temp: TL, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ---------- 6 · le voyant liquide (vue de face, fenêtre et pastille d'humidité) ---------- */
  S.voyant = function (g, c) {
    D.el("rect", { x: 60, y: 436, width: 520, height: 88, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 1020, y: 436, width: 520, height: 88, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 60, y: 448, width: 520, height: 64, fill: "#f4f8fc" }, g);
    D.el("rect", { x: 1020, y: 448, width: 520, height: 64, fill: "#f4f8fc" }, g);
    [[540, 600], [1000, 1060]].forEach(([a, b]) => D.el("polygon", { points: [a, 420, b, 420, b + 14, 480, b, 540, a, 540, a - 14, 480].join(" "), fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 2 }, g));
    D.el("rect", { x: 590, y: 300, width: 420, height: 340, rx: 46, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 3 }, g);
    D.el("circle", { cx: 800, cy: 470, r: 156, fill: "#6f5214" }, g);
    const cid = "vm-vitre-" + Math.round(c.D * 1000);
    const clip = D.el("clipPath", { id: cid }, g);
    D.el("circle", { cx: 800, cy: 470, r: 142 }, clip);
    D.el("rect", { x: 60, y: 448, width: 540, height: 64 }, clip);
    D.el("rect", { x: 1000, y: 448, width: 540, height: 64 }, clip);
    const vitre = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    D.el("rect", { x: 60, y: 300, width: 1480, height: 340, fill: "#f4f8fc" }, vitre);
    const fond = D.el("g", {}, vitre);
    D.el("rect", { x: 60, y: 300, width: 1480, height: 340, fill: LIQ, opacity: 0.72 }, vitre);
    const flux = D.courant(vitre, 60, 1540, 330, 610, 16, 7);
    const devant = D.el("g", {}, vitre);
    const rb = D.alea(17), BUL = [];
    for (let i = 0; i < 22; i++) BUL.push({ s: rb(), y: 320 + rb() * 300, r: 5 + rb() * 7, e: D.el("circle", { fill: "#fff", "fill-opacity": 0.35, stroke: "#fff", "stroke-width": 2.5 }, vitre) });
    const pastille = D.el("circle", { cx: 800, cy: 470, r: 46, stroke: "#fff", "stroke-width": 6 }, g);
    D.el("path", { d: "M 690 360 A 150 150 0 0 1 860 328", fill: "none", stroke: "#fff", "stroke-width": 8, opacity: 0.55, "stroke-linecap": "round" }, g);
    D.etiquette(g, 560, 322, "fenêtre en verre", { "text-anchor": "end" }); D.trait(g, 566, 314, 690, 368);
    D.etiquette(g, 1064, 664, "pastille d'humidité"); D.trait(g, 1060, 656, 836, 500);
    const pas = pastilles(g, 60, "start", [["plein et clair : tout va bien", "#1e7e54", 2, 2], ["des bulles : manque de fluide, ou filtre bouché", D.ORANGE, 3, 3],
      ["pastille verte = sec · jaune = humide", D.BLEU, 4, 4], ["plein, pas de bulles ✓", "#1e7e54", 5, 5]]);
    const mila = D.heroine(devant, { r: 30 });
    const tj = c.A(4, 0.55), tv = c.A(4, 0.9);
    return function (t) {
      flux(t, 150); montrer(pas, c, t);
      const avecBulles = t > c.T[3] && t < c.E[3] + 0.6;
      BUL.forEach(b => { // les bulles filent avec le liquide
        const x = 60 + D.frac(b.s + t * 0.11) * 1480;
        b.e.setAttribute("cx", x.toFixed(1)); b.e.setAttribute("cy", (b.y + Math.sin(t * 3 + b.s * 9) * 6).toFixed(1)); b.e.setAttribute("r", b.r);
        b.e.setAttribute("opacity", avecBulles ? 1 : 0);
      });
      pastille.setAttribute("fill", t > tj && t < tv ? "#e3c21b" : "#2e9e57");
      const x = D.courbe([[c.T[2], 160], [c.T[5], 300], [c.E[5] + 1.2, 1300], [c.D - 0.2, 1640]], t);
      const y = x > 620 && x < 980 ? 470 + 90 * Math.sin(Math.PI * (x - 620) / 360) : 480;
      mila({ x: x, y: y, s: 0.55, t: t, temp: TL, etat: "liquide", humeur: "sourire", regard: [1, 0] });
      return { carte: 9.5 + D.borne((x - 160) / 1480, 0, 1), temp: TL, etat: "liquide", humeur: "sourire" };
    };
  };

  /* ---------- 7 · l'électrovanne (bobine, noyau, ressort, siège) ---------- */
  S.electrovanne = function (g, c) {
    D.el("rect", { x: 60, y: 516, width: 480, height: 88, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 1060, y: 516, width: 480, height: 88, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 520, y: 470, width: 560, height: 190, rx: 24, fill: "url(#vm-laiton)", stroke: "#7c5c18", "stroke-width": 3 }, g);
    D.el("rect", { x: 60, y: 528, width: 1480, height: 64, fill: "#f4f8fc" }, g);
    const fond = D.el("g", {}, g);
    D.el("rect", { x: 60, y: 528, width: 1480, height: 64, fill: LIQ, opacity: 0.82 }, g);
    const flux = [D.courant(g, 60, 780, 528, 592, 7, 4), D.courant(g, 820, 1540, 528, 592, 7, 5)];
    D.el("rect", { x: 772, y: 280, width: 56, height: 250, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: 780, y: 284, width: 40, height: 244, fill: "#eef2f6" }, g);
    const ressort = D.el("path", { fill: "none", stroke: "#5d6b7a", "stroke-width": 4, "stroke-linejoin": "round" }, g);
    const noyau = D.el("rect", { x: 782, width: 36, height: 200, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const joint = D.el("rect", { x: 782, width: 36, height: 10, rx: 3, fill: "#1f2a36" }, g);
    const bob = D.el("g", {}, g);
    D.el("rect", { x: 690, y: 290, width: 82, height: 180, rx: 10, fill: "url(#vm-marine-h)" }, bob);
    D.el("rect", { x: 828, y: 290, width: 82, height: 180, rx: 10, fill: "url(#vm-marine-h)" }, bob);
    for (let k = 0; k < 9; k++) [700, 838].forEach(x => D.el("line", { x1: x, y1: 306 + k * 18, x2: x + 62, y2: 306 + k * 18, stroke: "#c57a45", "stroke-width": 7, "stroke-linecap": "round" }, bob));
    const contour = D.el("rect", { x: 684, y: 284, width: 232, height: 192, rx: 14, fill: "none", stroke: D.BLEU, "stroke-width": 4 }, g);
    const champ = D.el("g", {}, g);
    [[140, 110], [180, 140]].forEach(([rx, ry]) => D.el("ellipse", { cx: 800, cy: 380, rx: rx, ry: ry, fill: "none", stroke: "#ff6b35", "stroke-width": 4, "stroke-dasharray": "10 10" }, champ));
    const cable = D.el("path", { d: "M 910 330 H 1070 V 256", fill: "none", "stroke-width": 7, "stroke-linecap": "round", "stroke-dasharray": "16 10" }, g);
    D.el("rect", { x: 980, y: 196, width: 180, height: 60, rx: 10, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, g);
    const lampe = D.el("circle", { cx: 1002, cy: 226, r: 9 }, g);
    D.texte(g, 1080, 236, "thermostat", { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: D.BLEU, "font-family": "Calibri, Arial, sans-serif" });
    const dessus = D.el("g", {}, g);
    D.etiquette(g, 596, 384, "bobine", { "text-anchor": "end" }); D.trait(g, 600, 376, 690, 376);
    D.etiquette(g, 596, 262, "ressort", { "text-anchor": "end" }); D.trait(g, 600, 256, 784, 300);
    D.etiquette(g, 800, 712, "noyau en acier", { "text-anchor": "middle" }); D.trait(g, 800, 684, 800, 600);
    const etat = { ferme: D.pastille(g, 60, 748, "fermée : la bobine n'a pas de courant", "#c0392b", 30), ouvert: D.pastille(g, 60, 748, "ouverte : la bobine est un aimant, le noyau monte", "#1e7e54", 30) };
    const mila = D.heroine(fond, { r: 30 });
    const tOn = c.A(2, 0.6), tHaut = c.A(3, 0.4), tOff = c.A(4, 0.35), tBas = c.A(4, 0.6);
    return function (t) {
      const courant = t > tOn && t < tOff;
      const ouvre = t < tHaut ? 0 : t < tOff ? D.lisse((t - tHaut) / 0.5) : 1 - D.lisse((t - tBas) / 0.4);
      const haut = D.lerp(394, 322, ouvre); // haut du noyau
      noyau.setAttribute("y", haut.toFixed(1)); joint.setAttribute("y", (haut + 190).toFixed(1));
      let d = "M 800 286";
      for (let k = 1; k <= 8; k++) d += " L " + (k % 2 ? 788 : 812) + " " + (286 + (haut - 286) * k / 8).toFixed(1);
      ressort.setAttribute("d", d);
      champ.setAttribute("opacity", courant ? 0.5 + 0.4 * Math.sin(t * 6) : 0);
      cable.setAttribute("stroke", courant ? "#ff6b35" : "#9aa7b5"); cable.setAttribute("stroke-dashoffset", courant ? (-t * 60).toFixed(1) : 0);
      contour.setAttribute("stroke", courant ? "#ff6b35" : D.BLEU);
      lampe.setAttribute("fill", courant ? "#2e9e57" : "#c9d4e2");
      etat.ouvert.setAttribute("opacity", ouvre > 0.5 ? 1 : 0); etat.ferme.setAttribute("opacity", ouvre > 0.5 || t < c.T[2] + 0.8 ? 0 : 1);
      const coule = D.borne(t, tHaut, tOff + 0.3) - tHaut; // le liquide n'avance que vanne ouverte
      flux.forEach(f => f(coule, 150));
      const x = D.courbe([[c.T[2], 200], [tHaut + 0.3, 330], [c.E[3] + 0.4, 1300], [c.T[5], 1310], [c.D - 0.2, 1640]], t);
      plan(mila, dessus);
      mila({ x: x, y: 560, s: 0.62, t: t, temp: TL, etat: "liquide", humeur: ouvre < 0.5 && x < 400 ? "triste" : "sourire", regard: x < 760 ? [1, -1] : [-1, -1] });
      return { carte: 10.5 + 2 * D.borne((x - 200) / 1400, 0, 1), temp: TL, etat: "liquide", humeur: "sourire" };
    };
  };
})();

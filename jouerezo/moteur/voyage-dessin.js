/* =====================================================================
   voyage-dessin.js — les briques SVG de « Voyage dans tous ses états »
   ---------------------------------------------------------------------
   RÔLE : créer des éléments SVG, tirer un hasard REPRODUCTIBLE (le film se
   rend image par image : même image au même instant), interpoler des
   repères dans le temps, colorer selon la température, dessiner :
     · l'héroïne (molécule à visage) en trois états — liquide (on voit le
       liquide bouger dedans, comme une goutte d'eau), en ébullition (des
       bulles montent en elle), vapeur (pâle, légère) ;
     · le liquide des tubes (nappe translucide, surface qui ondule), les
       bulles et les gouttes, les petites molécules de vapeur ;
     · les métaux en relief (dégradés cuivre, laiton, acier, noir, marine) ;
     · les symboles des organes (bibliothèque de Franck) et le circuit des
       huit organes placés selon la croix du frigoriste (condenseur en haut,
       compresseur à droite, évaporateur en bas, détendeur à gauche).
   SORTIE : window.VOYAGE_DESSIN (abrégé D dans les scènes).
   PIÈGE : jamais de SMIL ni d'animation CSS infinie — tout se calcule à
   partir du temps t (le rendu vidéo ne pilote ni l'un ni l'autre).
   ===================================================================== */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const D = {};
  window.VOYAGE_DESSIN = D;
  D.BLEU = "#1b3a63"; D.ORANGE = "#c9451a"; D.CREME = "#f7f1e7";
  let n = 0;
  const id = p => "vm-" + p + "-" + (++n);

  D.el = function (tag, at, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in at) e.setAttribute(k, at[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  D.texte = function (parent, x, y, s, at) {
    const t = D.el("text", Object.assign({ x: x, y: y }, at || {}), parent);
    t.textContent = s;
    return t;
  };
  D.lignes = function (parent, x, y, lignes, at, pas) {
    const g = D.el("g", {}, parent);
    lignes.forEach((l, i) => D.texte(g, x, y + i * (pas || 40), l, at));
    return g;
  };
  D.etiquette = (parent, x, y, s, at) => D.texte(parent, x, y, s, Object.assign({ "font-size": 32, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, at || {}));
  D.trait = (parent, x1, y1, x2, y2, coul) => D.el("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: coul || "#637285", "stroke-width": 3, "stroke-dasharray": "2 7", "stroke-linecap": "round" }, parent);
  D.alea = function (graine) { // mulberry32
    let a = graine >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  D.borne = (x, a, b) => Math.max(a, Math.min(b, x));
  D.lisse = x => { x = D.borne(x, 0, 1); return x * x * (3 - 2 * x); };
  D.lerp = (a, b, f) => a + (b - a) * f;
  D.frac = x => x - Math.floor(x);
  D.courbe = function (rep, t, lineaire) { // repères [[t, v], ...] triés
    if (t <= rep[0][0]) return rep[0][1];
    for (let i = 1; i < rep.length; i++) {
      if (t <= rep[i][0]) {
        const t0 = rep[i - 1][0], t1 = rep[i][0], f = t1 > t0 ? (t - t0) / (t1 - t0) : 1;
        return D.lerp(rep[i - 1][1], rep[i][1], lineaire ? f : D.lisse(f));
      }
    }
    return rep[rep.length - 1][1];
  };
  D.fenetre = (t, a, b, du) => D.borne(Math.min((t - a) / (du || 0.4), (b - t) / (du || 0.4)), 0, 1);

  /* température 0 (très froide) → 1 (très chaude) ; la vapeur est plus pâle */
  const PALIERS = [[0, [47, 111, 184]], [0.3, [150, 178, 208]], [0.45, [242, 204, 140]], [0.6, [236, 168, 78]], [0.8, [228, 112, 44]], [1, [200, 48, 34]]];
  D.couleur = function (temp, vapeur) {
    temp = D.borne(temp, 0, 1);
    let i = 1;
    while (i < PALIERS.length - 1 && temp > PALIERS[i][0]) i++;
    const [t0, c0] = PALIERS[i - 1], [t1, c1] = PALIERS[i], f = (temp - t0) / (t1 - t0);
    const c = c0.map((v, k) => D.lerp(v, c1[k], f)).map(v => vapeur ? D.lerp(v, 255, 0.28) : v);
    return "rgb(" + c.map(Math.round).join(",") + ")";
  };

  /* définitions communes : petite molécule de vapeur, métaux en relief */
  const METAUX = { cuivre: ["#7a3f1c", "#e7a978", "#c57a45", "#6e3818"], laiton: ["#7c5c18", "#f3d98a", "#d4a94f", "#6f5214"],
    acier: ["#56636f", "#e3e8ee", "#aab6c3", "#4e5a66"], noir: ["#050505", "#5b5f66", "#22252a", "#000"], marine: ["#0c1d33", "#5d80ad", "#1b3a63", "#0a1829"] };
  D.defs = function (svg) {
    const defs = D.el("defs", {}, svg);
    const m = D.el("g", { id: "vm-mol" }, defs);
    D.el("circle", { r: 11, stroke: D.BLEU, "stroke-width": 1.6, "stroke-opacity": 0.5 }, m);
    D.el("circle", { cx: -3.6, cy: -4, r: 3.2, fill: "#fff", opacity: 0.6 }, m);
    for (const nom in METAUX) [["", 0, 1], ["-h", 1, 0]].forEach(([suf, x2, y2]) => {
      const gr = D.el("linearGradient", { id: "vm-" + nom + suf, x1: 0, y1: 0, x2: x2, y2: y2 }, defs);
      METAUX[nom].forEach((c, k) => D.el("stop", { offset: [0, 0.32, 0.62, 1][k], "stop-color": c }, gr));
    });
    return defs;
  };
  D.mol = function (parent) {
    const u = D.el("use", { href: "#vm-mol" }, parent);
    return function (x, y, temp, vapeur, op) {
      u.setAttribute("x", x.toFixed(1)); u.setAttribute("y", y.toFixed(1));
      u.setAttribute("fill", D.couleur(temp, vapeur));
      u.setAttribute("opacity", op === undefined ? 1 : op.toFixed(2));
    };
  };
  /* tube en relief : paroi métal (dégradé), intérieur clair rendu pour y poser le fluide */
  D.tube = function (parent, x, y, l, h, metal, vertical, interieur) {
    D.el("rect", { x: x, y: y, width: l, height: h, rx: 4, fill: "url(#vm-" + (metal || "cuivre") + (vertical ? "-h" : "") + ")" }, parent);
    const e = 10;
    return D.el("rect", vertical ? { x: x + e, y: y, width: l - 2 * e, height: h, fill: interieur || "#f4f8fc" } : { x: x, y: y + e, width: l, height: h - 2 * e, fill: interieur || "#f4f8fc" }, parent);
  };

  /* ---------- l'héroïne : une molécule avec un visage, en trois états ----------
     p : { x, y, s, t, temp, etat: "liquide" | "bout" | "vapeur", humeur, regard, ecrase, op }
     o.teinte : personnage « plein » (la famille, la voisine) — pas d'eau dedans. */
  D.heroine = function (parent, o) {
    o = o || {};
    const R = o.r || 30, trait = { stroke: D.BLEU, "stroke-width": 3.5 };
    const g = D.el("g", {}, parent);
    const halo = D.el("circle", { r: R * 1.7, fill: "#ff6b35", opacity: 0.22 }, g);
    const corps = D.el("g", {}, g);
    if (o.chignon) D.el("circle", Object.assign({ cx: 0, cy: -R * 1.18, r: R * 0.42, fill: "#d9dde3" }, trait), corps);
    const sats = [[-0.98, -0.6], [0.98, -0.6], [0, 1.08]].map(([a, b]) =>
      D.el("circle", Object.assign({ cx: a * R, cy: b * R, r: R * 0.46 }, trait), corps));
    const cid = id("h");
    D.el("circle", { r: R - 1.5 }, D.el("clipPath", { id: cid }, corps));
    const fond = D.el("circle", { r: R }, corps);
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, corps);
    const eau = D.el("path", {}, dedans);
    const surfaceEau = D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 2.2 }, dedans);
    const bulles = [0, 1, 2, 3, 4].map(() => D.el("circle", { fill: "#fff", "fill-opacity": 0.45, stroke: "#fff", "stroke-width": 1.6 }, dedans));
    const gaz = [0, 1, 2, 3, 4, 5].map(() => D.el("circle", { r: R * 0.08 }, dedans));
    D.el("circle", Object.assign({ r: R, fill: "none" }, trait), corps);
    D.el("ellipse", { cx: -R * 0.36, cy: -R * 0.48, rx: R * 0.28, ry: R * 0.14, fill: "#fff", opacity: 0.75, transform: "rotate(-28 " + (-R * 0.36) + " " + (-R * 0.48) + ")" }, corps);
    [-1, 1].forEach(s => D.el("circle", { cx: s * R * 0.56, cy: R * 0.26, r: R * 0.14, fill: "#f08a8a", opacity: 0.55 }, corps));
    const pupilles = [-1, 1].map(s => {
      D.el("ellipse", { cx: s * R * 0.32, cy: -R * 0.12, rx: R * 0.2, ry: R * 0.26, fill: "#fff", stroke: D.BLEU, "stroke-width": 2 }, corps);
      return D.el("circle", { cx: s * R * 0.32, cy: -R * 0.1, r: R * 0.11, fill: D.BLEU }, corps);
    });
    const paupieres = [-1, 1].map(s => D.el("rect", { x: s * R * 0.32 - R * 0.23, y: -R * 0.4, width: R * 0.46, height: R * 0.3, fill: "none" }, corps));
    if (o.lunettes) {
      [-1, 1].forEach(s => D.el("circle", { cx: s * R * 0.32, cy: -R * 0.12, r: R * 0.29, fill: "none", stroke: D.BLEU, "stroke-width": 3 }, corps));
      D.el("path", { d: "M " + (-R * 0.04) + " " + (-R * 0.14) + " h " + (R * 0.08), stroke: D.BLEU, "stroke-width": 3 }, corps);
    }
    const bouche = D.el("path", { fill: "none", stroke: D.BLEU, "stroke-width": 3.2, "stroke-linecap": "round", "stroke-linejoin": "round" }, corps);
    const goutte = D.el("path", { d: "M 0 -9 Q 7 2 0 7 Q -7 2 0 -9 Z", fill: "#8fc3f0", stroke: D.BLEU, "stroke-width": 1.5,
      transform: "translate(" + R * 0.92 + " " + (-R * 0.78) + ")" }, corps);
    const BOUCHES = {
      sourire: "M " + (-R * 0.34) + " " + R * 0.3 + " Q 0 " + R * 0.62 + " " + R * 0.34 + " " + R * 0.3,
      triste: "M " + (-R * 0.3) + " " + R * 0.5 + " Q 0 " + R * 0.24 + " " + R * 0.3 + " " + R * 0.5,
      surprise: "M " + (-R * 0.1) + " " + R * 0.36 + " a " + R * 0.1 + " " + R * 0.14 + " 0 1 0 " + R * 0.2 + " 0 a " + R * 0.1 + " " + R * 0.14 + " 0 1 0 " + (-R * 0.2) + " 0",
      chaud: "M " + (-R * 0.32) + " " + R * 0.42 + " q " + R * 0.16 + " " + (-R * 0.14) + " " + R * 0.32 + " 0 t " + R * 0.32 + " 0",
      froid: "M " + (-R * 0.3) + " " + R * 0.4 + " l " + R * 0.1 + " " + (-R * 0.09) + " l " + R * 0.1 + " " + R * 0.09 + " l " + R * 0.1 + " " + (-R * 0.09) + " l " + R * 0.1 + " " + R * 0.09 + " l " + R * 0.1 + " " + (-R * 0.09) + " l " + R * 0.1 + " " + R * 0.09
    };
    const maj = function (p) {
      const t = p.t || 0, temp = p.temp === undefined ? 0.1 : p.temp;
      const etat = o.teinte ? "plein" : (p.etat || (p.vapeur ? "vapeur" : "liquide"));
      const coul = o.teinte || D.couleur(temp, false), claire = o.teinte || D.couleur(temp, true);
      sats.forEach(c => c.setAttribute("fill", claire));
      if (etat === "plein") { fond.setAttribute("fill", coul); fond.setAttribute("fill-opacity", 1); }
      else if (etat === "vapeur") { fond.setAttribute("fill", claire); fond.setAttribute("fill-opacity", 0.5); }
      else { fond.setAttribute("fill", "#f2f8ff"); fond.setAttribute("fill-opacity", 0.75); }
      const liquide = etat === "liquide" || etat === "bout";
      eau.setAttribute("opacity", liquide ? 0.92 : 0); surfaceEau.setAttribute("opacity", liquide ? 0.8 : 0);
      if (liquide) { // le liquide bouge dedans, comme de l'eau dans une boule de verre
        const ys = R * (0.6 - 2 * (etat === "bout" ? 0.52 : 0.62)) + Math.sin(t * 2.6) * R * 0.06;
        let d = "";
        for (let k = 0; k <= 8; k++) {
          const x = -R + k * R / 4, y = ys + Math.sin(k * 0.9 + t * 4.2) * R * 0.07;
          d += (k ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
        }
        surfaceEau.setAttribute("d", d);
        eau.setAttribute("d", d + " L " + R + " " + R * 1.2 + " L " + (-R) + " " + R * 1.2 + " Z");
        eau.setAttribute("fill", coul);
        bulles.forEach((b, k) => {
          const f = D.frac(t * 0.9 + k * 0.23);
          b.setAttribute("cx", ((k - 2) * R * 0.26 + Math.sin(t * 5 + k) * R * 0.05).toFixed(1));
          b.setAttribute("cy", D.lerp(R * 0.85, ys, f).toFixed(1));
          b.setAttribute("r", (R * D.lerp(0.05, 0.13, f)).toFixed(1));
          b.setAttribute("opacity", etat === "bout" ? D.fenetre(f, 0, 1, 0.1).toFixed(2) : 0);
        });
      } else bulles.forEach(b => b.setAttribute("opacity", 0));
      gaz.forEach((c, k) => {
        c.setAttribute("cx", (Math.sin(t * (1.7 + k * 0.3) + k * 2) * R * 0.6).toFixed(1));
        c.setAttribute("cy", (Math.cos(t * (1.3 + k * 0.4) + k) * R * 0.6).toFixed(1));
        c.setAttribute("fill", coul); c.setAttribute("opacity", etat === "vapeur" ? 0.75 : 0);
      });
      const e = p.ecrase || 0, sx = 1 + 0.34 * e, sy = 1 - 0.34 * e;
      const tremble = p.humeur === "froid" ? Math.sin(t * 60) * 1.6 : 0;
      g.setAttribute("transform", "translate(" + (p.x + tremble).toFixed(1) + " " + p.y.toFixed(1) + ") scale(" + (p.s || 1) + ")");
      corps.setAttribute("transform", "scale(" + sx.toFixed(3) + " " + sy.toFixed(3) + ")");
      const [dx, dy] = p.regard || [0, 0];
      pupilles.forEach((c, i) => { c.setAttribute("cx", ((i ? 1 : -1) * R * 0.32 + dx * R * 0.08).toFixed(1)); c.setAttribute("cy", (-R * 0.1 + dy * R * 0.1).toFixed(1)); });
      const ferme = D.frac(t / 3.7 + (o.dephasage || 0)) < 0.04;
      paupieres.forEach(r => r.setAttribute("fill", ferme ? (etat === "plein" ? coul : "#dfeaf6") : "none"));
      bouche.setAttribute("d", BOUCHES[p.humeur] || BOUCHES.sourire);
      goutte.setAttribute("opacity", p.humeur === "chaud" ? 1 : 0);
      halo.setAttribute("opacity", o.sansHalo ? 0 : 0.22);
      g.setAttribute("opacity", p.op === undefined ? 1 : p.op.toFixed(2));
    };
    maj.g = g;
    return maj;
  };

  D.ventilateur = function (parent, x, y, r) {
    const g = D.el("g", { transform: "translate(" + x + " " + y + ")" }, parent);
    D.el("circle", { r: r, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    const pales = D.el("g", {}, g);
    for (let k = 0; k < 3; k++) D.el("path", { d: "M 0 0 C " + r * 0.25 + " " + (-r * 0.2) + " " + r * 0.35 + " " + (-r * 0.7) + " 0 " + (-r * 0.82) + " C " + (-r * 0.2) + " " + (-r * 0.6) + " " + (-r * 0.12) + " " + (-r * 0.2) + " 0 0 Z",
      fill: "#9fbfe0", stroke: D.BLEU, "stroke-width": 2.5, transform: "rotate(" + k * 120 + ")" }, pales);
    D.el("circle", { r: r * 0.13, fill: D.BLEU }, g);
    return a => pales.setAttribute("transform", "rotate(" + (a % 360).toFixed(1) + ")");
  };
  D.chevron = function (parent) { // flux d'air, pointe vers le bas à angle 0
    const p = D.el("path", { d: "M -16 -9 L 0 7 L 16 -9", fill: "none", "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
    return function (x, y, ang, coul, op) {
      p.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang + ")");
      p.setAttribute("stroke", coul); p.setAttribute("opacity", op.toFixed(2));
    };
  };
  D.chaleur = function (parent) { // flèche de chaleur, vers le bas à angle 0
    const p = D.el("path", { d: "M 0 -32 V -4 M -9 -14 L 0 -2 L 9 -14", fill: "none", stroke: "#e2662c", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
    return function (x, y, ang, op) {
      p.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + ang + ")");
      p.setAttribute("opacity", op.toFixed(2));
    };
  };
  D.pastille = function (parent, x, y, s, fond, taille, ancre) {
    taille = taille || 30;
    const g = D.el("g", {}, parent);
    const fondR = D.el("rect", { y: y - taille * 0.95, height: taille * 1.35, rx: taille * 0.67, fill: fond }, g);
    const t = D.texte(g, 0, y, s, { "text-anchor": "middle", fill: "#fff", "font-size": taille, "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
    const mesure = t.getComputedTextLength ? t.getComputedTextLength() : 0; // vraie largeur, page affichée
    const l = (mesure || s.length * taille * 0.52) + taille * 1.1, x0 = ancre === "end" ? x - l : ancre === "middle" ? x - l / 2 : x;
    fondR.setAttribute("x", x0); fondR.setAttribute("width", l); t.setAttribute("x", x0 + l / 2);
    g.largeur = l;
    return g;
  };

  /* ---------- le liquide : une nappe dont la surface ondule ----------
     o : { x0, x1, yh, yb, niveau(x) 0..1, couleur(x) } → { maj(t), surface(x, t) }.
     Translucide : ce qui est dessiné avant lui (la molécule qui flotte) se voit à travers. */
  D.liquide = function (parent, o) {
    const gid = id("liq"), grad = D.el("linearGradient", { id: gid, x1: o.x0, x2: o.x1, y1: 0, y2: 0, gradientUnits: "userSpaceOnUse" }, parent);
    for (let k = 0; k <= 8; k++) D.el("stop", { offset: k / 8, "stop-color": o.couleur(D.lerp(o.x0, o.x1, k / 8)) }, grad);
    const nappe = D.el("path", { fill: "url(#" + gid + ")", opacity: o.opacite || 0.82 }, parent);
    const reflet = D.el("path", { fill: "none", stroke: "#fff", "stroke-width": 3, opacity: 0.75, "stroke-linecap": "round" }, parent);
    const H = o.yb - o.yh, pas = o.pas || 20;
    function surface(x, t) {
      const nv = D.borne(o.niveau(x), 0, 1), houle = nv > 0.04 && nv < 0.97 ? 3.5 * Math.sin(x / 38 - t * 3.2) + 2 * Math.sin(x / 17 + t * 2.1) : 0;
      return o.yb - nv * H + houle;
    }
    function maj(t) {
      let d = "M " + o.x0 + " " + o.yb, r = "", dedans = false;
      for (let x = o.x0; x <= o.x1 + 0.1; x += pas) {
        const y = surface(x, t).toFixed(1), nv = o.niveau(x), ici = nv > 0.04 && nv < 0.97;
        d += " L " + x + " " + y;
        if (ici) r += (dedans ? " L " : " M ") + x + " " + y;
        dedans = ici;
      }
      nappe.setAttribute("d", d + " L " + o.x1 + " " + o.yb + " Z");
      reflet.setAttribute("d", r.trim() || "M 0 0");
    }
    return { maj: maj, surface: surface };
  };
  /* reflets qui filent dans un liquide plein (pour voir qu'il coule) */
  D.courant = function (parent, x0, x1, y0, y1, nb, graine) {
    const r = D.alea(graine), L = [];
    for (let i = 0; i < nb; i++) L.push({ s: r(), y: D.lerp(y0 + 8, y1 - 8, r()), l: 30 + r() * 40,
      e: D.el("line", { stroke: "#fff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.6 }, parent) });
    return function (t, vitesse) {
      L.forEach(c => {
        const x = x0 + D.frac(c.s + t * vitesse / (x1 - x0)) * (x1 - x0);
        c.e.setAttribute("x1", x.toFixed(1)); c.e.setAttribute("x2", Math.min(x1, x + c.l).toFixed(1));
        c.e.setAttribute("y1", c.y); c.e.setAttribute("y2", c.y);
      });
    };
  };
  /* bulles (montent du fond à la surface) ou gouttes (tombent dans le liquide) */
  D.bulles = function (parent, nb, graine, gouttes) {
    const r = D.alea(graine), B = [];
    for (let i = 0; i < nb; i++) B.push({ p: r(), per: 1.3 + r() * 1.1, ph: r() * 3, taille: 4 + r() * 6,
      c: D.el("circle", gouttes ? { fill: "#fff", stroke: "#fff", "stroke-width": 1.5 } : { fill: "#fff", "fill-opacity": 0.35, stroke: "#fff", "stroke-width": 2.5 }, parent) });
    return function (t, place) { // place(q, b) → [x, yDepart, yArrivee, visible 0..1, couleur]
      B.forEach(b => {
        const cyc = Math.floor((t + b.ph) / b.per), f = D.frac((t + b.ph) / b.per);
        const [x, y0, y1, vis, coul] = place(D.frac(b.p + cyc * 0.618), b);
        const y = D.lerp(y0, y1, gouttes ? f * f : f), rr = gouttes ? b.taille * 0.8 : D.lerp(2, b.taille, f);
        b.c.setAttribute("cx", x.toFixed(1)); b.c.setAttribute("cy", y.toFixed(1)); b.c.setAttribute("r", rr.toFixed(1));
        if (coul) b.c.setAttribute("fill", coul);
        b.c.setAttribute("opacity", (vis * D.fenetre(f, 0, 1, 0.12)).toFixed(2));
      });
    };
  };

  /* ---------- les organes : leurs symboles normalisés (bibliothèque de Franck, voyage/symboles/) ----------
     Pas de photos (Franck, 03/10) : le dessin, c'est la coupe animée ; le symbole, c'est ce que l'élève
     retrouvera sur les schémas. vb = viewBox du SVG ; axe = le point du symbole posé sur le tuyau (milieu
     de ses raccordements), pour que la carte du circuit le pose dans le sens du fluide. */
  D.SYM = window.VOYAGE_SYM || (window.VOYAGE_BASE || "") + "voyage/symboles/";
  D.ORGANES = {
    evaporateur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "évaporateur" },
    compresseur: { f: "compresseur_general", vb: [-24, -20, 50, 40], axe: [0, 0], nom: "compresseur" },
    condenseur: { f: "echangeur_a_air_eduscol", vb: [-22, -32, 44, 64], axe: [10, 0], nom: "condenseur" },
    bouteille: { f: "bouteille_liquide_verticale", vb: [-14, -26, 28, 52], axe: [0, -24.5], nom: "bouteille" },
    filtre: { f: "filtre_deshydrateur", vb: [-25, -10, 40, 20], axe: [-4.875, 0.495], nom: "filtre" },
    voyant: { f: "voyant_liquide", vb: [-15, -10, 50, 20], axe: [9.8, -0.054], nom: "voyant" },
    electrovanne: { f: "electrovanne_frigo", vb: [-19, -21, 40, 30], axe: [0, 0], nom: "électrovanne" },
    detendeur: { f: "detendeur_thermo_ext", vb: [-19, -28, 40, 40], axe: [0, 0], nom: "détendeur", lettres: [0, -12, 4.6, "TC"] }
  };
  D.image = function (parent, nom, x, y, l, h) {
    const o = D.ORGANES[nom], embarque = window.VOYAGE_SYM_DATA && window.VOYAGE_SYM_DATA[o.f]; // le film embarque les symboles
    return D.el("image", { href: embarque || D.SYM + o.f + ".svg", x: x, y: y, width: l, height: h, preserveAspectRatio: "xMidYMid meet" }, parent);
  };

  D.couper = function (s, max) { // découpe en lignes d'au plus max caractères
    const l = [""];
    s.split(" ").forEach(m => { if ((l[l.length - 1] + " " + m).trim().length > max) l.push(m); else l[l.length - 1] = (l[l.length - 1] + " " + m).trim(); });
    return l;
  };
  /* la carte d'identité d'un organe (repère de la scène 1600 × 770) */
  D.carteIdentite = function (parent, s) {
    // la coupe se devine derrière, à 22 % : chevauchement voulu (carte opaque), déclaré au contrôle HyperFrames
    const g = D.el("g", { "data-layout-allow-overlap": "" }, parent), o = D.ORGANES[s.organe], nom = o.nom[0].toUpperCase() + o.nom.slice(1);
    D.el("rect", { x: 260, y: 190, width: 900, height: 470, rx: 28, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, g);
    D.el("rect", { x: 296, y: 226, width: 380, height: 300, rx: 16, fill: "#fff", stroke: "rgba(27,58,99,.18)", "stroke-width": 2 }, g);
    D.image(g, s.organe, 316, 246, 340, 260);
    D.texte(g, 486, 566, "son symbole", { "text-anchor": "middle", "font-size": 28, fill: "#637285", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 });
    D.texte(g, 712, 300, nom, { "font-size": 60, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Arial, sans-serif" });
    D.lignes(g, 712, 372, D.couper("Son rôle : " + s.role + ".", 22), { "font-size": 38, fill: "#10233c", "font-family": "Calibri, Arial, sans-serif", "font-weight": 600 }, 48);
    D.texte(g, 712, 590, "Entrons dedans…", { "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": "Calibri, Arial, sans-serif" });
    return g;
  };
  /* la signature commune des vidéos : logo inerWeb (charte, 00-charte/logo-inerweb.html) + « en partenariat
     avec » + le logo du lycée. Tant que la direction n'a pas donné son accord (Franck, 03/10), un EMPLACEMENT
     marqué le remplace : le jour venu, renseigner VOYAGE_RECIT.logoLycee et refaire les vidéos. */
  D.signature = function (parent, cx, y, l) {
    const g = D.el("g", {}, parent), k = l / 1100;
    const iw = D.el("g", { transform: "translate(" + (cx - l / 2) + " " + y + ") scale(" + (1.05 * k) + ")" }, g);
    D.texte(iw, 0, 80, "❄️", { "font-size": 56, fill: D.BLEU });
    D.texte(iw, 76, 75, "iner", { "font-size": 52, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Trebuchet, sans-serif" });
    D.texte(iw, 171, 75, "Web", { "font-size": 52, fill: D.BLEU, "font-family": "Segoe Script, Brush Script MT, cursive" });
    D.texte(iw, 276, 75, ".fr", { "font-size": 52, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Trebuchet, sans-serif" });
    D.el("line", { x1: 76, x2: 334, y1: 80, y2: 80, stroke: "#e8914a", "stroke-width": 4 }, iw);
    // « inerweb.fr » + cartouche orange VIDE (Franck, 03/10) : la porte d'entrée dans inerWeb, l'image de la marque
    D.el("rect", { x: 342, y: 8, rx: 7, width: 110, height: 38, fill: "#e8914a" }, iw);
    D.el("line", { x1: cx, x2: cx, y1: y + 6 * k, y2: y + 120 * k, stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
    D.texte(g, cx + 30 * k, y + 22 * k, "en partenariat avec", { "font-size": 26 * k, fill: "#3b4a5e", "font-weight": 600, "font-family": "Calibri, Arial, sans-serif" });
    const logo = window.VOYAGE_LOGO_LYCEE || (window.VOYAGE_RECIT && window.VOYAGE_RECIT.logoLycee);
    if (logo) D.el("image", { href: logo, x: cx + 30 * k, y: y + 34 * k, width: l / 2 - 30 * k, height: 100 * k, preserveAspectRatio: "xMinYMid meet" }, g);
    else {
      D.el("rect", { x: cx + 30 * k, y: y + 34 * k, width: l / 2 - 40 * k, height: 96 * k, rx: 10 * k, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 3, "stroke-dasharray": "12 9" }, g);
      D.texte(g, cx + 30 * k + (l / 2 - 40 * k) / 2, y + 92 * k, "Intégrer ici le logo du lycée", { "text-anchor": "middle", "font-size": 30 * k, fill: "#637285", "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
    }
    return g;
  };

  /* la signature en petit, EN PERMANENCE à l'écran (Franck, 03/10 : « le logo inerweb.fr en permanence avec le logo du
     lycée, durant toute la vidéo ») : le logo en haut, « en partenariat avec » et le logo du lycée (ou son emplacement) dessous */
  D.signaturePermanente = function (parent, x, y, l) {
    const g = D.el("g", {}, parent), k = l / 470;
    const iw = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, g);
    D.texte(iw, 0, 80, "❄️", { "font-size": 56, fill: D.BLEU });
    D.texte(iw, 76, 75, "iner", { "font-size": 52, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Trebuchet, sans-serif" });
    D.texte(iw, 171, 75, "Web", { "font-size": 52, fill: D.BLEU, "font-family": "Segoe Script, Brush Script MT, cursive" });
    D.texte(iw, 276, 75, ".fr", { "font-size": 52, "font-weight": 700, fill: D.BLEU, "font-family": "Trebuchet MS, Trebuchet, sans-serif" });
    D.el("line", { x1: 76, x2: 334, y1: 80, y2: 80, stroke: "#e8914a", "stroke-width": 4 }, iw);
    D.el("rect", { x: 342, y: 8, rx: 7, width: 110, height: 38, fill: "#e8914a" }, iw);
    const y2 = y + 96 * k, h2 = 60 * k;
    D.texte(g, x, y2 + 4 * k, "en partenariat avec", { "font-size": 24 * k, fill: "#3b4a5e", "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
    const logo = window.VOYAGE_LOGO_LYCEE || (window.VOYAGE_RECIT && window.VOYAGE_RECIT.logoLycee);
    if (logo) D.el("image", { href: logo, x: x, y: y2 + 12 * k, width: l, height: h2, preserveAspectRatio: "xMinYMid meet" }, g);
    else {
      D.el("rect", { x: x, y: y2 + 12 * k, width: l, height: h2, rx: 8 * k, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 2, "stroke-dasharray": "8 6" }, g);
      D.texte(g, x + l / 2, y2 + 12 * k + h2 / 2 + 9 * k, "logo du lycée", { "text-anchor": "middle", "font-size": 26 * k, fill: "#637285", "font-weight": 700, "font-family": "Calibri, Arial, sans-serif" });
    }
    return g;
  };

  /* ---------- le circuit des huit organes (repère 1000 × 620, dans le sens du fluide) ---------- */
  D.CIRCUIT_PTS = [[390, 545], [650, 545], [890, 545], [890, 400], [890, 240], [890, 85], [745, 85], [495, 85], [400, 85],
    [290, 85], [190, 85], [95, 85], [95, 190], [95, 320], [95, 545], [390, 545]];
  /* chaque symbole posé DANS LE SENS DU FLUIDE (Franck, 03/10) : [x, y du tuyau, échelle, rotation, miroir].
     Échangeurs couchés sur leur branche, ventilateur dehors ; compresseur refoulement en haut ; électrovanne et
     détendeur debout sur la branche qui descend ; bouteille pendue sous le tuyau, arrivée à droite, tube plongeur à gauche. */
  const PLACES = { evaporateur: [520, 545, 2.4, -90], compresseur: [890, 320, 3.2, -90], condenseur: [620, 85, 2.4, 90],
    bouteille: [400, 85, 1.65, 0, true], filtre: [290, 85, 2, 0], voyant: [190, 85, 1.92, 0], electrovanne: [95, 190, 2.1, 90], detendeur: [95, 320, 2.5, 90] };
  const NOMS = { evaporateur: [520, 490, "middle"], compresseur: [790, 326, "end"], condenseur: [620, 184, "middle"], bouteille: [400, 206, "middle"],
    filtre: [290, 146, "middle"], voyant: [190, 146, "middle"], electrovanne: [162, 198, "start"], detendeur: [188, 328, "start"] };
  function poser(parent, nom, px, py, s, rot, miroir) { // renvoie le cadre [x, y, l, h] du symbole posé
    const o = D.ORGANES[nom], [vx, vy, vl, vh] = o.vb, [ax, ay] = o.axe, embarque = window.VOYAGE_SYM_DATA && window.VOYAGE_SYM_DATA[o.f];
    const g = D.el("g", { transform: "translate(" + px + " " + py + ") rotate(" + rot + ") scale(" + (miroir ? -s : s) + " " + s + ") translate(" + (-ax) + " " + (-ay) + ")" }, parent);
    D.el("image", { href: embarque || D.SYM + o.f + ".svg", x: vx, y: vy, width: vl, height: vh }, g);
    const c = Math.round(Math.cos(rot * Math.PI / 180)), si = Math.round(Math.sin(rot * Math.PI / 180));
    if (o.lettres && rot) { // les lettres du symbole (TC) restent droites quand il est tourné
      const [lx, ly, lr, lt] = o.lettres, u = (lx - ax) * s, v = (ly - ay) * s, qx = px + u * c - v * si, qy = py + u * si + v * c;
      D.el("circle", { cx: qx, cy: qy, r: lr * s, fill: "#fff" }, parent);
      D.texte(parent, qx, qy + 2.1 * s, lt, { "text-anchor": "middle", "font-size": 6 * s, fill: "#333", "font-family": "sans-serif" });
    }
    const pts = [[vx, vy], [vx + vl, vy], [vx, vy + vh], [vx + vl, vy + vh]].map(([x, y]) => {
      const u = (x - ax) * (miroir ? -s : s), v = (y - ay) * s;
      return [px + u * c - v * si, py + u * si + v * c];
    });
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
  }
  D.circuitPoint = function (w) {
    const nb = D.CIRCUIT_PTS.length - 1;
    w = ((w % nb) + nb) % nb;
    const i = Math.floor(w), f = w - i, a = D.CIRCUIT_PTS[i], b = D.CIRCUIT_PTS[i + 1];
    return [D.lerp(a[0], b[0], f), D.lerp(a[1], b[1], f)];
  };
  D.circuit = function (parent, x, y, l, noms) {
    const k = l / 1000, g = D.el("g", { transform: "translate(" + x + " " + y + ") scale(" + k + ")" }, parent);
    const pts = D.CIRCUIT_PTS.map(p => p.join(",")).join(" ");
    D.el("polyline", { points: pts, fill: "none", stroke: "#8a4a24", "stroke-width": 16, "stroke-linejoin": "round" }, g);
    D.el("polyline", { points: pts, fill: "none", stroke: "#e7a978", "stroke-width": 6, "stroke-linejoin": "round" }, g);
    const reperes = {};
    for (const nom in PLACES) {
      const cadre = D.el("rect", { rx: 14, fill: "#fff", stroke: "rgba(27,58,99,.3)", "stroke-width": 3 }, g);
      const [x0, y0, w, h] = poser(g, nom, ...PLACES[nom]);
      Object.entries({ x: x0 - 10, y: y0 - 10, width: w + 20, height: h + 20 }).forEach(([k, v]) => cadre.setAttribute(k, v.toFixed(1)));
      reperes[nom] = cadre;
      if (noms) { const [nx, ny, a] = NOMS[nom]; D.etiquette(g, nx, ny, D.ORGANES[nom].nom, { "text-anchor": a, "font-size": 30, "font-weight": 700, fill: D.BLEU }); }
    }
    // le bulbe du détendeur, posé sur le tuyau à la sortie de l'évaporateur, relié à la tête TC par le capillaire (Franck, 03/10)
    const [, , ds, drot] = PLACES.detendeur, cap = [PLACES.detendeur[0] + 20 * ds * Math.sin(drot * Math.PI / 180), PLACES.detendeur[1]];
    D.el("polyline", { points: [cap, [cap[0], 440], [660, 440], [660, 521]].map(p => p.join(",")).join(" "), fill: "none", stroke: "#000", "stroke-width": 2.5 }, g);
    D.el("rect", { x: 644, y: 521, width: 32, height: 14, rx: 7, fill: "#fff", stroke: "#000", "stroke-width": 2.5 }, g);
    if (noms) D.etiquette(g, 688, 512, "bulbe", { "font-size": 26, "font-weight": 700, fill: D.BLEU });
    return { g: g, k: k, ecran: (cx, cy) => [x + cx * k, y + cy * k],
      surligne: (nom, oui) => { reperes[nom].setAttribute("stroke", oui ? "#ff6b35" : "rgba(27,58,99,.3)"); reperes[nom].setAttribute("stroke-width", oui ? 9 : 3); } };
  };
})();

/* =====================================================================
   voyage-glissement-dessin.js — ce que l'édition « le glissement » ajoute
   au dessin commun
   ---------------------------------------------------------------------
   RÔLE : chargé APRÈS voyage-dessin.js par voyage-glissement.html (et par
   les outils). N'enlève et ne remplace RIEN du dessin commun : le circuit
   est celui du premier voyage (D.circuit, 8 organes). Ajoute les aides
   partagées par les trois fichiers de scènes, pour qu'elles dessinent pareil :
     D.SOEURS / D.soeur / D.petite  les trois sortes de molécules du R407C
     D.thermometre                  thermomètre à pince, afficheur en °C
     D.manometre                    manomètre à aiguille SANS chiffres
     D.afficheur                    écran d'un manomètre électronique (lignes)
     D.loupe                        agrandissement du diagramme (cloche,
                                    isobares, isothermes de VOYAGE_DIAGRAMME)
   COULEURS : R32 vert, R125 violet, R134a = l'héroïne (bleu, sa couleur suit
   sa température). Le liquide reste une nappe (D.liquide) ; les petites
   molécules s'y voient par transparence.
   PROPORTIONS : en masse 23 / 25 / 52 % (camembert) ; en NOMBRE de molécules
   38 / 18 / 44 % (moles) : pour dessiner, 2 R32 : 1 R125 : 2 R134a.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  let n = 0;
  const id = p => "vg-" + p + "-" + (++n);
  const POLICE = { "font-family": "Calibri, Arial, sans-serif", "font-weight": 700 };

  D.SOEURS = {
    R32: { coul: "#2e9e6b", nom: "R32" },
    R125: { coul: "#8e5bb5", nom: "R125" },
    R134a: { coul: "#2f6fb8", nom: "R134a" }
  };
  D.MELANGE = { masse: [0.23, 0.25, 0.52], moles: [0.38, 0.18, 0.44] };

  /* une sœur en personnage plein (voisine de l'héroïne) : renvoie maj({ x, y, s, t, humeur, regard, op }) */
  D.soeur = function (parent, sorte, r, dephasage) {
    return D.heroine(parent, { r: r || 24, teinte: D.SOEURS[sorte].coul, sansHalo: true, dephasage: dephasage || 0 });
  };

  /* une petite molécule colorée selon sa sorte (vapeur ou dans la nappe) : renvoie maj(x, y, op, r) */
  D.petite = function (parent, sorte) {
    const g = D.el("g", {}, parent), coul = D.SOEURS[sorte].coul;
    const c = D.el("circle", { r: 10, fill: coul, stroke: "#fff", "stroke-width": 2 }, g);
    D.el("circle", { cx: -3.4, cy: -3.6, r: 2.8, fill: "#fff", opacity: 0.7 }, g);
    return function (x, y, op, r) {
      g.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + ((r || 10) / 10).toFixed(2) + ")");
      g.setAttribute("opacity", (op === undefined ? 1 : op).toFixed(2));
    };
  };

  /* thermomètre à pince : le boîtier (afficheur) en (x, y), coin haut gauche, 170 × 70 ; la pince sur le tube en o.pince.
     renvoie maj(texte, op) — texte : « 0 °C », « +5 °C »… (seulement des valeurs du récit) */
  D.thermometre = function (parent, x, y, o) {
    o = o || {};
    const g = D.el("g", {}, parent), l = o.l || 170, h = 70;
    if (o.pince) {
      const [px, py] = o.pince;
      D.el("path", { d: "M " + (x + l / 2) + " " + (y + (py > y ? h : 0)) + " C " + (x + l / 2) + " " + ((y + py) / 2) + " " + px + " " + ((y + py) / 2) + " " + px + " " + (py + (py > y ? -18 : 18)),
        fill: "none", stroke: "#333", "stroke-width": 3 }, g);
      D.el("rect", { x: px - 14, y: py - 18, width: 28, height: 36, rx: 6, fill: "#e8914a", stroke: "#7a4a1c", "stroke-width": 2.5 }, g);
    }
    D.el("rect", { x: x, y: y, width: l, height: h, rx: 12, fill: "#24303d", stroke: "#0d141c", "stroke-width": 3 }, g);
    D.el("rect", { x: x + 10, y: y + 10, width: l - 20, height: h - 20, rx: 6, fill: "#d9f0d9" }, g);
    const t = D.texte(g, x + l / 2, y + h / 2 + 12, "", Object.assign({ "text-anchor": "middle", "font-size": 34, fill: "#10233c" }, POLICE));
    return function (texte, op) {
      t.textContent = texte;
      g.setAttribute("opacity", (op === undefined ? 1 : op).toFixed(2));
    };
  };

  /* manomètre à aiguille, SANS chiffres de pression (choix de Franck) : cadran de rayon r centré en (x, y),
     graduations muettes, nom (« BP », « HP ») dans le cadran. renvoie maj(a, op), a de 0 (début) à 1 (fin de l'échelle) */
  D.manometre = function (parent, x, y, r, nom, coul) {
    const g = D.el("g", { transform: "translate(" + x + " " + y + ")" }, parent);
    coul = coul || D.BLEU;
    D.el("circle", { r: r + 8, fill: "url(#vm-acier)" }, g);
    D.el("circle", { r: r, fill: "#fffdf8", stroke: coul, "stroke-width": 5 }, g);
    for (let k = 0; k <= 10; k++) {
      const a = (-225 + k * 27) * Math.PI / 180, r0 = k % 5 ? r * 0.8 : r * 0.72;
      D.el("line", { x1: Math.cos(a) * r0, y1: Math.sin(a) * r0, x2: Math.cos(a) * r * 0.9, y2: Math.sin(a) * r * 0.9, stroke: "#10233c", "stroke-width": k % 5 ? 2 : 4 }, g);
    }
    D.texte(g, 0, r * 0.52, nom, Object.assign({ "text-anchor": "middle", "font-size": Math.max(28, r * 0.36), fill: coul }, POLICE));
    const aig = D.el("path", { d: "M -6 0 L 0 " + (-r * 0.78) + " L 6 0 Z", fill: "#c0392b" }, g);
    D.el("circle", { r: 8, fill: "#10233c" }, g);
    return function (a, op) {
      aig.setAttribute("transform", "rotate(" + (-135 + D.borne(a, 0, 1) * 270).toFixed(1) + ")");
      g.setAttribute("opacity", (op === undefined ? 1 : op).toFixed(2));
    };
  };

  /* écran de manomètre électronique : coin haut gauche (x, y), largeur l ; lignes = [« rosée +5 °C », « bulle −1 °C »…].
     renvoie maj(choisie, op) — choisie : rang de la ligne encadrée (ou -1) */
  D.afficheur = function (parent, x, y, l, lignes, titre) {
    const g = D.el("g", {}, parent), pas = 52, h = 40 + lignes.length * pas + (titre ? 40 : 0);
    D.el("rect", { x: x, y: y, width: l, height: h, rx: 16, fill: "#24303d", stroke: "#0d141c", "stroke-width": 3 }, g);
    D.el("rect", { x: x + 12, y: y + 12, width: l - 24, height: h - 24, rx: 8, fill: "#dbeaf5" }, g);
    if (titre) D.texte(g, x + l / 2, y + 46, titre, Object.assign({ "text-anchor": "middle", "font-size": 28, fill: "#3b4a5e" }, POLICE));
    const y0 = y + (titre ? 52 : 20);
    const cadre = D.el("rect", { x: x + 22, width: l - 44, height: pas - 6, rx: 8, fill: "none", stroke: "#c9451a", "stroke-width": 4 }, g);
    lignes.forEach((s, k) => D.texte(g, x + 34, y0 + k * pas + 36, s, Object.assign({ "font-size": 32, fill: "#10233c" }, POLICE)));
    return function (choisie, op) {
      cadre.setAttribute("opacity", choisie >= 0 ? 1 : 0);
      cadre.setAttribute("y", (y0 + Math.max(0, choisie) * pas + 2).toFixed(1));
      g.setAttribute("opacity", (op === undefined ? 1 : op).toFixed(2));
    };
  };

  /* la loupe : un morceau du diagramme enthalpique, agrandi, DANS la scène (jamais au-delà de x = 965).
     o : { x, y, l, h, plageH: [h0, h1], plageP: [p0, p1], isobares: ["BP", "HP"], isos: ["isoM1", "isoP5", …] }
     Dessine le cadre, la cloche (découpée au cadre), les isobares en pointillés et les isothermes demandées (traits
     pleins, couleur du calque), SANS étiquette : la scène pose les siennes (hors des tracés).
     renvoie { g, X(h), Y(p), pt([h, p]) → [x, y], isos: { id: <g> } } pour montrer / cacher chaque isotherme. */
  D.loupe = function (parent, o) {
    const V = window.VOYAGE_DIAGRAMME, g = D.el("g", {}, parent);
    const [h0, h1] = o.plageH, [p0, p1] = o.plageP;
    const X = h => o.x + (h - h0) / (h1 - h0) * o.l;
    const Y = p => o.y + o.h - Math.log(p / p0) / Math.log(p1 / p0) * o.h;
    const pt = ([h, p]) => [X(h), Y(p)], s = q => pt(q).map(v => v.toFixed(1)).join(",");
    const cid = id("loupe");
    D.el("rect", { x: o.x, y: o.y, width: o.l, height: o.h }, D.el("clipPath", { id: cid }, g));
    D.el("rect", { x: o.x, y: o.y, width: o.l, height: o.h, rx: 10, fill: "#fffdf8" }, g);
    const dedans = D.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    const c = V.cloche;
    D.el("path", { d: "M " + c.map(r => s([r[1], r[0]])).join(" L ") + " L " + s([V.pcrit[1], V.pcrit[0]]) + " L " + c.slice().reverse().map(r => s([r[2], r[0]])).join(" L "),
      fill: "rgba(47,111,184,.10)", stroke: "#2f6fb8", "stroke-width": 4 }, dedans);
    (o.isobares || []).forEach(nom => D.el("line", { x1: o.x, x2: o.x + o.l, y1: Y(V[nom]), y2: Y(V[nom]), stroke: nom === "HP" ? D.ORANGE : D.BLEU, "stroke-width": 3, "stroke-dasharray": "8 8" }, dedans));
    const isos = {};
    (o.isos || []).forEach(k => {
      const cq = V.calques[k], gi = D.el("g", {}, dedans);
      cq.traits.forEach(tr => D.el("polyline", { points: tr.map(s).join(" "), fill: "none", stroke: cq.coul, "stroke-width": 5, "stroke-linejoin": "round" }, gi));
      isos[k] = gi;
    });
    D.el("rect", { x: o.x, y: o.y, width: o.l, height: o.h, rx: 10, fill: "none", stroke: "#637285", "stroke-width": 3 }, g);
    return { g: g, X: X, Y: Y, pt: pt, isos: isos };
  };
})();

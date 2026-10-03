/* =====================================================================
   voyage-booster-scenes-c.js — la vapeur de détente, le froid positif,
   le détendeur des surgelés, le résumé (édition « centrale booster CO₂ »)
   ---------------------------------------------------------------------
   Même contrat que voyage-co2-scenes-b.js : VOYAGE_SCENES[id](g, c) → maj(t).
   Cette édition est en ÉCRAN PARTAGÉ : tout tient dans x 20 → 965, y 150 → 760
   (la colonne de droite porte la carte et le diagramme enthalpique).
   Phrases 0 à pres−1 = carte d'identité de l'organe (la scène se devine à 22 %
   derrière) ; la coupe s'anime à partir de la phrase pres (2, sauf
   froid-positif et detendeur-bt : 3). Chaque geste est accroché au RANG de sa
   phrase (c.T[k], c.E[k], c.A(k, f)) : ajouter une phrase au récit décale tout.
   CE QUE CHAQUE SCÈNE RENDU AU THÉÂTRE (cf. voyage-booster/BRIEF-SCENES.md) :
     · gaz-detente, froid-positif : ni diag, ni calques, ni carte (le récit les fixe) ;
     · detendeur-bt : diag 8 → 9 pendant k3 (diag0 : 8) et carte 11,3 → 13 → 15 ;
     · resume : diag 0 → 9 par phrase (diag0 : 0), calques MT et flash dès k2.
   LE FLUIDE : vapeur = petites molécules séparées (violettes pour la vapeur de
   détente, vertes pour le froid positif) ; liquide = nappe (D.liquide) ou tube
   plein à reflets ; jamais de billes.
   AIDES LOCALES recopiées de l'édition CO₂ (cadran, lecture, regulateur, cable,
   reservoir, vanne) ; la vanne est une coupe à l'échelle voulue.
   PIÈGE : fonction pure de t — rien n'est gardé d'une image à l'autre.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const TOUR = 2 * Math.PI, FONT = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif", CLAIR = "#f4f8fc";
  const VIOLET = "#8e44ad", VIOLET_H = "#9b7fd1", VERT = "#1e7e54", VERT_H = "#4caf7d", ROUGE = "#c0392b";
  const T_BOUT = 0.3, T_BT = 0.03, T_POS = 0.1; // échelle du récit : bouteille · après le détendeur BT · froid positif

  const plan = (maj, g) => { if (maj.g.parentNode !== g) g.appendChild(maj.g); };
  const pas = (g, x, y, ancre, s, coul, a, b, taille) => ({ g: D.pastille(g, x, y, s, coul, taille || 30, ancre), a: a, b: b });
  const montrer = (liste, t) => liste.forEach(p => p.g.setAttribute("opacity", D.fenetre(t, p.a, p.b).toFixed(2)));
  const fondu = (e, t, a, b, du) => e.setAttribute("opacity", D.fenetre(t, a, b, du).toFixed(2));
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  /* une molécule de vapeur d'une couleur donnée (vapeur de détente : violet ; froid positif : vert) */
  const molC = (parent, coul) => {
    const m = D.mol(parent), u = parent.lastChild;
    return (x, y, op) => { m(x, y, 0.3, true, op); u.setAttribute("fill", coul); };
  };
  /* point d'une ligne brisée à l'abscisse curviligne s */
  function poly(pts) {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const f = function (s) {
      s = D.borne(s, 0, L[L.length - 1]);
      let i = 1;
      while (i < L.length - 1 && s > L[i]) i++;
      const u = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [D.lerp(pts[i - 1][0], pts[i][0], u), D.lerp(pts[i - 1][1], pts[i][1], u)];
    };
    f.long = L[L.length - 1];
    return f;
  }

  /* ---------- les instruments (recopiés de l'édition CO₂) ---------- */
  /* cadran de manomètre, balayage de 270° ; zones = [[de, à, couleur]] ; rend maj(valeur) */
  function cadran(parent, cx, cy, r, vmax, graduation, zones) {
    const g = D.el("g", {}, parent);
    D.el("circle", { cx: cx, cy: cy, r: r + 9, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    D.el("circle", { cx: cx, cy: cy, r: r, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, g);
    const ang = v => (135 + 270 * D.borne(v / vmax, 0, 1)) * Math.PI / 180;
    const pt = (v, rr) => [cx + rr * Math.cos(ang(v)), cy + rr * Math.sin(ang(v))];
    (zones || []).forEach(([a, b, coul]) => {
      const [x0, y0] = pt(a, r * 0.8), [x1, y1] = pt(b, r * 0.8);
      D.el("path", { d: "M " + x0.toFixed(1) + " " + y0.toFixed(1) + " A " + r * 0.8 + " " + r * 0.8 + " 0 " + ((b - a) / vmax * 270 > 180 ? 1 : 0) + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1),
        fill: "none", stroke: coul, "stroke-width": r * 0.16 }, g);
    });
    for (let v = 0; v <= vmax + 0.01; v += graduation) {
      const [x0, y0] = pt(v, r * 0.66), [x1, y1] = pt(v, r * 0.9);
      D.el("line", { x1: x0.toFixed(1), y1: y0.toFixed(1), x2: x1.toFixed(1), y2: y1.toFixed(1), stroke: D.BLEU, "stroke-width": 3, "stroke-linecap": "round" }, g);
    }
    const aig = D.el("g", {}, g);
    D.el("line", { x1: cx - r * 0.18, y1: cy, x2: cx + r * 0.72, y2: cy, stroke: ROUGE, "stroke-width": 5, "stroke-linecap": "round" }, aig);
    D.el("circle", { cx: cx, cy: cy, r: r * 0.11, fill: D.BLEU }, g);
    const maj = v => aig.setAttribute("transform", "rotate(" + (ang(v) * 180 / Math.PI).toFixed(1) + " " + cx + " " + cy + ")");
    maj.g = g;
    return maj;
  }
  /* thermomètre : tube de hauteur h dont le haut est y0, bulbe en bas ; rend maj(valeur en °C) */
  const degVersTemp = v => D.courbe([[-40, 0], [-20, 0.01], [-10, 0.08], [0, 0.22], [20, 0.40], [35, 0.50], [100, 0.95]], v, true);
  function thermo(parent, x, y0, h, tmin, tmax) {
    const g = D.el("g", {}, parent), yb = y0 + h, jx = Math.sqrt(26 * 26 - 15 * 15);
    D.el("path", { d: "M " + (x - 15) + " " + (y0 + 15) + " A 15 15 0 0 1 " + (x + 15) + " " + (y0 + 15) + " L " + (x + 15) + " " + (yb - jx).toFixed(1) +
      " A 26 26 0 1 1 " + (x - 15) + " " + (yb - jx).toFixed(1) + " Z", fill: "#fff", stroke: D.BLEU, "stroke-width": 3, "stroke-linejoin": "round" }, g);
    const y = v => yb - 6 - (v - tmin) / (tmax - tmin) * (h - 24);
    for (let v = tmin; v <= tmax + 0.01; v += 10) D.el("line", { x1: x - 15, y1: y(v).toFixed(1), x2: x - 28, y2: y(v).toFixed(1), stroke: D.BLEU, "stroke-width": 3, "stroke-linecap": "round" }, g);
    const col = D.el("rect", { x: x - 7, width: 14, rx: 7 }, g), bulbe = D.el("circle", { cx: x, cy: yb, r: 17 }, g);
    const maj = v => {
      const c = D.couleur(degVersTemp(v), false), top = y(v);
      col.setAttribute("y", top.toFixed(1)); col.setAttribute("height", (yb - top).toFixed(1)); col.setAttribute("fill", c); bulbe.setAttribute("fill", c);
    };
    maj.g = g;
    return maj;
  }
  /* pastille de lecture (valeur numérique) : rend ecrire(texte) */
  function lecture(parent, cx, y, w) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: cx - w / 2, y: y - 31, width: w, height: 42, rx: 21, fill: "#fff", stroke: D.BLEU, "stroke-width": 3 }, g);
    const tx = D.texte(g, cx, y, "", { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: D.BLEU, "font-family": FONT });
    const f = s => { if (tx.textContent !== s) tx.textContent = s; };
    f.g = g;
    return f;
  }
  /* le régulateur : un boîtier à écran de deux lignes */
  function regulateur(parent, x, y, w, h, titre) {
    const g = D.el("g", {}, parent);
    D.el("rect", { x: x, y: y, width: w, height: h, rx: 14, fill: "url(#vm-marine)", stroke: "#0a1829", "stroke-width": 3 }, g);
    D.texte(g, x + 18, y + 32, titre || "régulateur", { "font-size": 28, "font-weight": 700, fill: "#cfe0f4", "font-family": FONT });
    D.el("circle", { cx: x + w - 26, cy: y + 24, r: 8, fill: "#2e9e57" }, g);
    const ey = y + 46, eh = h - 62;
    D.el("rect", { x: x + 14, y: ey, width: w - 28, height: eh, rx: 8, fill: "#0e2a40", stroke: "#5d80ad", "stroke-width": 2 }, g);
    const l1 = D.texte(g, x + w / 2, ey + eh * 0.4, "", { "text-anchor": "middle", "font-size": 28, "font-weight": 600, fill: "#bfe3ff", "font-family": FONT });
    const l2 = D.texte(g, x + w / 2, ey + eh * 0.86, "", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#ffb36b", "font-family": FONT });
    return { g: g, ecrire: (a, b) => { if (l1.textContent !== a) l1.textContent = a; if (l2.textContent !== b) l2.textContent = b; } };
  }
  /* câble qui s'anime quand il est actif */
  function cable(parent, d) {
    const p = D.el("path", { d: d, fill: "none", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": "14 9" }, parent);
    const f = (t, actif) => { p.setAttribute("stroke", actif ? "#ff6b35" : "#9aa7b5"); p.setAttribute("stroke-dashoffset", actif ? (-t * 60).toFixed(1) : 0); };
    f.p = p;
    return f;
  }
  /* un réservoir debout à parois épaisses ; ouvrir() rend un groupe rogné à l'intérieur (la nappe et la vapeur y restent) */
  function reservoir(g, x, y, w, h, e, rx, id) {
    D.el("rect", { x: x, y: y, width: w, height: h, rx: rx, fill: "url(#vm-marine-h)", stroke: "#0a1829", "stroke-width": 3 }, g);
    const ix = x + e, iy = y + e, iw = w - 2 * e, ih = h - 2 * e;
    D.el("rect", { x: ix, y: iy, width: iw, height: ih, rx: rx - e, fill: CLAIR }, g);
    const clip = D.el("clipPath", { id: id }, g);
    D.el("rect", { x: ix, y: iy, width: iw, height: ih, rx: rx - e }, clip);
    return { ix: ix, iy: iy, iw: iw, ih: ih, ouvrir: () => D.el("g", { "clip-path": "url(#" + id + ")" }, g) };
  }
  /* la coupe d'une vanne à pointeau (comme l'édition CO₂). (cx, cy) : centre de l'orifice ; k : échelle ;
     tete : "moteur" | "bobine" ; cote : côté de la prise du câble (−1 gauche, +1 droite).
     Repère local : cavité haute (entrée) x −200 → +180, y −110 → −16 ; siège y −16 → +16, orifice ±20 ;
     cavité basse (sortie) x −60 → +200, y +16 → +130. haut() se dessine après les fluides et rend ouvrir(écart). */
  function vanne(g, cx, cy, k, tete, cote) {
    const X = lx => cx + k * lx, Y = ly => cy + k * ly;
    const place = "translate(" + cx + " " + cy + ") scale(" + k + ")";
    const v = D.el("g", { transform: place }, g);
    D.el("rect", { x: -200, y: -148, width: 400, height: 320, rx: 26, fill: "url(#vm-laiton-h)", stroke: "#7c5c18", "stroke-width": 3 }, v);
    D.el("rect", { x: -200, y: -110, width: 380, height: 94, fill: CLAIR }, v);
    D.el("rect", { x: -60, y: 16, width: 260, height: 114, fill: CLAIR }, v);
    D.el("rect", { x: -20, y: -16, width: 40, height: 32, fill: CLAIR }, v);
    [[-46, -20], [20, 46]].forEach(([a, b]) => D.el("rect", { x: a, y: -16, width: b - a, height: 32, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, v));
    function haut() {
      const t = D.el("g", { transform: place }, g);
      D.el("rect", { x: -28, y: -164, width: 56, height: 58, rx: 8, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      const tige = D.el("rect", { x: -6, y: -190, width: 12, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 1.5 }, t);
      const cone = D.el("polygon", { fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2, "stroke-linejoin": "round" }, t);
      if (tete === "bobine") {
        D.el("rect", { x: -16, y: -196, width: 32, height: 50, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
        D.el("rect", { x: -64, y: -296, width: 128, height: 112, rx: 12, fill: "url(#vm-marine-h)", stroke: D.BLEU, "stroke-width": 4 }, t);
        for (let i = 0; i < 6; i++) D.el("line", { x1: -50, y1: -280 + i * 18, x2: 50, y2: -280 + i * 18, stroke: "#c57a45", "stroke-width": 8, "stroke-linecap": "round" }, t);
      } else {
        D.el("rect", { x: -72, y: -302, width: 144, height: 118, rx: 14, fill: "url(#vm-marine-h)", stroke: "#0a1829", "stroke-width": 3 }, t);
        for (let i = 0; i < 5; i++) D.el("line", { x1: -60, y1: -282 + i * 20, x2: 60, y2: -282 + i * 20, stroke: "#5d80ad", "stroke-width": 5, "stroke-linecap": "round" }, t);
        D.el("rect", { x: -48, y: -318, width: 96, height: 18, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      }
      D.el("rect", { x: cote < 0 ? -102 : 72, y: -262, width: 30, height: 34, rx: 6, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, t);
      return function (ecart) { // ecart : levée du pointeau au-dessus du siège (0 = fermé)
        const yb = -19.3 - ecart;
        tige.setAttribute("height", (yb + 192).toFixed(1));
        cone.setAttribute("points", "-22," + yb.toFixed(1) + " 22," + yb.toFixed(1) + " 0," + (yb + 36).toFixed(1));
      };
    }
    return { X: X, Y: Y, haut: haut, prise: [X(cote < 0 ? -102 : 102), Y(-245)] };
  }
  /* une croix rouge (chemin barré) */
  function croix(parent, x, y, l, h) {
    const k = D.el("g", { stroke: ROUGE, "stroke-width": 11, "stroke-linecap": "round" }, parent);
    D.el("line", { x1: x - l / 2, y1: y - h / 2, x2: x + l / 2, y2: y + h / 2 }, k);
    D.el("line", { x1: x + l / 2, y1: y - h / 2, x2: x - l / 2, y2: y + h / 2 }, k);
    return k;
  }

  /* =====================================================================
     9 · la vanne de gaz de détente : la voisine violette file à l'aspiration
     ===================================================================== */
  S["gaz-detente"] = function (g, c) {
    const id = Math.round(c.D * 1000), LIQ = D.couleur(T_BOUT, false);
    const R = reservoir(g, 40, 440, 200, 310, 22, 70, "vm-gd-" + id);
    const V = vanne(g, 470, 380, 0.55, "moteur", 1);
    // la montée sort par le haut de la bouteille, part à droite vers la vanne ; la sortie de la vanne va au compresseur
    D.tube(g, 104, 309, 72, 161, "cuivre", true);
    D.el("rect", { x: 104, y: 309, width: 72, height: 10, rx: 4, fill: "url(#vm-cuivre)" }, g);
    D.tube(g, 168, 309, V.X(-200) - 168, 72, "cuivre");
    D.el("rect", { x: 164, y: 319, width: 14, height: 52, fill: CLAIR }, g); // la montée s'ouvre sur le tube
    D.tube(g, V.X(200), V.Y(16) - 10, 800 - V.X(200), V.Y(130) - V.Y(16) + 20, "cuivre");
    D.image(g, "compMT", 790, 360, 150, 120);

    // le chemin fantôme vers les meubles (une jonction s'ouvre sous le tube) : barré
    const PF = [[300, 381], [300, 590], [770, 590]], fp = poly(PF), pts = PF.map(p => p.join(",")).join(" ");
    const fant = D.el("g", {}, g);
    D.el("polyline", { points: pts, fill: "none", stroke: "#637285", "stroke-width": 62, "stroke-dasharray": "14 12", opacity: 0.55, "stroke-linejoin": "round" }, fant);
    D.el("polyline", { points: pts, fill: "none", stroke: D.CREME, "stroke-width": 54, "stroke-linejoin": "round" }, fant);
    D.el("rect", { x: 276, y: 369, width: 48, height: 14, fill: CLAIR }, fant);
    const evap = D.el("g", { transform: "translate(845 590) rotate(-90) scale(2.2)", opacity: 0.8 }, fant);
    D.image(evap, "evapMT", -22, -32, 44, 64);
    const mf = D.el("g", {}, fant), MF = [];
    for (let i = 0; i < 16; i++) MF.push({ d: c.T[3] + 0.6 + i * 0.12, p: fp.long * (i + 0.5) / 16, maj: molC(mf, VIOLET_H) });
    const fantome = D.heroine(fant, { r: 26, teinte: VIOLET_H, sansHalo: true, dephasage: 0.4 });
    const barre = croix(fant, 560, 590, 140, 110);

    // la vapeur : dans la bouteille (en haut), dans la montée et le tube, puis dans la sortie de la vanne
    const vap = D.el("g", {}, g), fond = D.el("g", {}, g), dedans = R.ouvrir();
    const r = D.alea(17), VT = [], VH = [], VS = [];
    [[0.15, 0.1], [0.55, 0.3], [0.85, 0.08], [0.3, 0.55], [0.7, 0.62], [0.12, 0.85]].forEach(([u, v]) =>
      VT.push({ x: R.ix + 28 + u * (R.iw - 56), ry: v, ph: r() * TOUR, maj: molC(dedans, VIOLET_H) }));
    for (let i = 0; i < 5; i++) VH.push({ x: 212 + i * 33, y: 345, ph: r() * TOUR, maj: molC(vap, VIOLET_H) });
    for (let i = 0; i < 2; i++) VH.push({ x: 140, y: 395 + i * 46, ph: r() * TOUR, maj: molC(vap, VIOLET_H) });
    for (let i = 0; i < 5; i++) VS.push({ s: i / 5, maj: molC(vap, VIOLET_H) });
    const cuve = D.liquide(dedans, { x0: R.ix, x1: R.ix + R.iw, yh: R.iy, yb: R.iy + R.ih, niveau: () => 0.4, couleur: () => LIQ, pas: 14 });
    const ouvrir = V.haut();
    const dessus = D.el("g", {}, g);
    const mila = D.heroine(fond, { r: 30 }), voisine = D.heroine(dessus, { r: 26, teinte: VIOLET_H, sansHalo: true, dephasage: 0.4 });

    // k4 : deux manomètres (avant la vanne, après la vanne) ; k5 : celui de la bouteille reste stable
    const amont = D.el("g", {}, g), aval = D.el("g", {}, g);
    const cA = cadran(amont, 330, 610, 52, 60, 10, [[33, 43, "#2e9e57"]]), lA = lecture(amont, 330, 725, 150);
    const cB = cadran(aval, 700, 610, 52, 60, 10, [[23, 33, "#2e9e57"]]), lB = lecture(aval, 700, 725, 150);
    const trA = D.trait(g, 330, 546, 330, 384), trB = D.trait(aval, 700, 546, 700, 464);
    D.el("path", { d: "M 408 610 H 626 m -20 -16 l 20 16 l -20 16", fill: "none", stroke: D.BLEU, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round" }, aval);
    const piquage = D.el("rect", { x: 238, y: 602, width: 34, height: 16, fill: "url(#vm-cuivre)" }, g); // le manomètre est vissé sur la bouteille
    const eTient = D.etiquette(g, 415, 596, "elle tient la bouteille");

    // étiquettes
    D.etiquette(g, 415, 214, "vanne motorisée", { "text-anchor": "end" });
    const eAsp = D.el("g", {}, g);
    D.etiquette(eAsp, 955, 305, "aspiration moyenne", { "text-anchor": "end" });
    D.etiquette(eAsp, 955, 343, "température", { "text-anchor": "end" });
    const eViolet = D.etiquette(g, 955, 258, "en violet sur le diagramme →", { "text-anchor": "end", fill: VIOLET });
    const eAucun = D.etiquette(g, 300, 692, "aucun froid : déjà vapeur", { fill: ROUGE });
    const pDeux = pas(g, 415, 686, "start", "un organe, deux missions", D.ORANGE, c.A(5, 0.4), c.T[6] - 0.2, 32);
    const pPerdu = pas(g, 620, 660, "middle", "du travail perdu", ROUGE, c.T[6] + 0.3, c.A(6, 0.6), 40);

    // k6 : deux autres façons de reprendre la vapeur — annoncées seulement, aucun dessin technique
    const cadres = [[290, ["compresseur", "parallèle"], c.A(6, 0.6)], [630, ["éjecteur"], c.A(6, 0.78)]].map(([x, titre, a]) => {
      const k = D.el("g", {}, g);
      D.el("rect", { x: x, y: 520, width: 320, height: 215, rx: 20, fill: "#fff", stroke: D.BLEU, "stroke-width": 4 }, k);
      titre.forEach((l, i) => D.texte(k, x + 160, 578 + i * 40, l, { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: D.BLEU, "font-family": TITRE }));
      D.el("rect", { x: x + 60, y: 650, width: 200, height: 54, rx: 12, fill: "#fff4e5", stroke: D.ORANGE, "stroke-width": 4, "stroke-dasharray": "14 8" }, k);
      D.texte(k, x + 160, 689, "bientôt", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": FONT });
      return { g: k, a: a };
    });

    const route = poly([[140, 540], [140, 345], [300, 345], [440, 345], [470, 360], [470, 382], [470, 405], [500, 420], [790, 420], [890, 420]]);
    const tGo = c.A(4, 0.08), tOri = c.A(4, 0.3);
    return function (t) {
      // la vanne : fermée jusqu'à la phrase 4, puis elle s'ouvre
      const ouv = D.lisse((t - c.T[4]) / 0.9);
      ouvrir(22 * ouv);
      cuve.maj(t);
      VT.forEach(m => m.maj(m.x + Math.sin(t * 0.8 + m.ph) * 14, 462 + 30 + m.ry * 105 + Math.cos(t * 0.7 + m.ph) * 8, 0.9));
      VH.forEach(m => m.maj(m.x + Math.sin(t * 0.9 + m.ph) * 8, m.y + Math.sin(t * 1.7 + m.ph) * 4, 0.9));
      VS.forEach(m => {
        const x = 590 + D.frac(m.s + t * 0.17) * 200;
        m.maj(x, 420 + Math.sin(t * 3 + m.s * 9) * 5, D.borne(ouv * 3 - 1, 0, 1) * D.borne((788 - x) / 30, 0, 1));
      });

      // k3 : le chemin vers les meubles, barré (il disparaît quand la vanne s'ouvre)
      const tFin = c.T[4] + 0.1;
      fondu(fant, t, c.T[3], tFin, 0.5);
      const sF = D.courbe([[c.A(3, 0.15), 0], [c.E[3], fp.long - 120]], t, true), [fx, fy] = fp(sF);
      fantome({ x: fx, y: fy, s: 0.55, t: t, humeur: "triste", regard: [1, 0], op: 0.6 * D.fenetre(t, c.A(3, 0.1), c.E[3] + 0.9, 0.4) });
      opa(barre, D.lisse((t - c.A(3, 0.65)) / 0.4));
      MF.forEach(m => { const [x, y] = fp(m.p); m.maj(x + Math.sin(t * 1.5 + m.p) * 6, y + Math.cos(t * 1.8 + m.p) * 5, D.lisse((t - m.d) / 0.3)); });
      fondu(eAucun, t, c.T[3] + 0.3, tFin, 0.5);
      fondu(eAsp, t, c.T[2] - 0.2, c.D + 1, 0.5);
      fondu(eViolet, t, c.A(2, 0.5), c.T[4] + 0.2, 0.5);

      // k4 : les deux manomètres ; la pression chute quand la voisine passe l'orifice
      const bar = D.courbe([[tOri - 0.5, 38], [tOri + 0.8, 28]], t);
      cA(38 + 0.4 * Math.sin(t * 2.3)); lA("38 bar");
      cB(bar + (t > tOri + 1 ? 0.3 * Math.sin(t * 2.1) : 0)); lB((bar > 33 ? 38 : 28) + " bar"); // le chiffre change d'un coup : aucun nombre intermédiaire
      const k4 = c.T[4] + 0.3;
      fondu(amont, t, k4, c.A(6, 0.52), 0.4); fondu(aval, t, k4, c.T[5] + 0.3, 0.4);
      fondu(trA, t, k4, c.T[5] + 0.3, 0.3);
      // k5 : le manomètre de la bouteille reste stable
      fondu(piquage, t, c.T[5] + 0.3, c.A(6, 0.52), 0.4);
      fondu(eTient, t, c.T[5] + 0.4, c.T[6] - 0.1, 0.4);
      montrer([pDeux, pPerdu], t);
      // k6 : « bientôt »
      cadres.forEach(k => k.g.setAttribute("opacity", D.lisse((t - k.a) / 0.4).toFixed(2)));

      // la voisine : elle sort par le haut, attend à la jonction (k3), puis file par la vanne vers l'aspiration
      const s = D.courbe([[c.T[2] + 0.2, 0], [c.E[2], 355], [tGo, 355], [tOri, 561], [c.A(4, 0.85), 897], [c.E[4] + 0.6, 997]], t, true);
      const calme = 1 - D.lisse((t - (c.T[2] - 0.2)) / 0.6), [px, py] = route(s);
      const vx = px + 12 * Math.sin(t * 0.9) * calme, vy = py + 9 * Math.sin(t * 1.4) * calme;
      const pres = D.borne(1 - Math.hypot(vx - 470, vy - 380) / 45, 0, 1);
      voisine({ x: vx, y: vy, s: D.lerp(0.55, 0.38, pres), t: t, humeur: pres > 0.05 ? "surprise" : "sourire", regard: [1, 0.2], ecrase: 0.7 * pres, op: 1 - D.lisse((vx - 830) / 50) });
      // l'héroïne reste petite, dans la nappe de la bouteille
      plan(mila, fond);
      mila({ x: 150 + 14 * Math.sin(t * 0.6), y: 690 + 5 * Math.sin(t * 1.2), s: 0.5, t: t, temp: T_BOUT, etat: "liquide", humeur: "sourire", regard: [1, -1] });
      return { temp: T_BOUT, etat: "liquide", humeur: "sourire" };
    };
  };

  /* =====================================================================
     10 · le froid positif : la voisine verte passe son détendeur, bout dans la vitrine
     ===================================================================== */
  S["froid-positif"] = function (g, c) {
    const LIQ = D.couleur(T_BOUT, false), FRD = D.couleur(T_POS, false);
    const YC = 520; // axe du tube ; paroi 470 → 570, intérieur 480 → 560
    // la vitrine : caisson d'acier, intérieur vitré, enseigne, un rayon de produits frais
    D.el("rect", { x: 300, y: 165, width: 560, height: 460, rx: 18, fill: "url(#vm-acier)", stroke: "#4e5a66", "stroke-width": 3 }, g);
    D.el("rect", { x: 322, y: 187, width: 516, height: 416, rx: 8, fill: "#eaf3fb" }, g);
    D.el("rect", { x: 340, y: 198, width: 480, height: 46, rx: 10, fill: VERT }, g);
    D.texte(g, 580, 232, "produits frais", { "text-anchor": "middle", "font-size": 32, "font-weight": 700, fill: "#fff", "font-family": FONT });
    for (let x = 372; x <= 790; x += 22) D.el("rect", { x: x, y: 440, width: 7, height: 156, fill: "url(#vm-acier-h)", opacity: 0.6 }, g);
    D.el("rect", { x: 322, y: 398, width: 516, height: 12, fill: "url(#vm-acier-h)", stroke: "#4e5a66", "stroke-width": 2 }, g);
    const prod = D.el("g", { transform: "translate(0 398)" }, g);
    // fromage : un quartier percé de trous et une meule
    D.el("polygon", { points: "338,0 458,0 458,-40 338,-80", fill: "#f4c542", stroke: "#a87a10", "stroke-width": 3, "stroke-linejoin": "round" }, prod);
    [[372, -22, 8], [412, -14, 6], [434, -28, 7]].forEach(([x, y, rr]) => D.el("circle", { cx: x, cy: y, r: rr, fill: "#d9a62a" }, prod));
    D.el("rect", { x: 470, y: -42, width: 78, height: 42, rx: 6, fill: "#f0c850", stroke: "#a87a10", "stroke-width": 3 }, prod);
    D.el("ellipse", { cx: 509, cy: -42, rx: 39, ry: 11, fill: "#f8e08e", stroke: "#a87a10", "stroke-width": 3 }, prod);
    // jambon : le membre rose, sa tranche et son os
    D.el("ellipse", { cx: 622, cy: -34, rx: 62, ry: 34, fill: "#e8939a", stroke: "#a85660", "stroke-width": 3 }, prod);
    D.el("ellipse", { cx: 668, cy: -34, rx: 13, ry: 25, fill: "#f8c9cc", stroke: "#a85660", "stroke-width": 3 }, prod);
    D.el("rect", { x: 684, y: -40, width: 24, height: 12, rx: 6, fill: "#fff", stroke: "#9b9484", "stroke-width": 3 }, prod);
    D.el("circle", { cx: 710, cy: -34, r: 9, fill: "#fff", stroke: "#9b9484", "stroke-width": 3 }, prod);
    // salade : des feuilles dressées, une côte claire au milieu
    [[760, -34, -26, "#58b03e"], [812, -34, 26, "#58b03e"], [786, -42, 0, "#7fd05a"]].forEach(([x, y, a, f]) => {
      D.el("ellipse", { cx: x, cy: y, rx: a ? 22 : 26, ry: a ? 34 : 40, fill: f, stroke: "#3f8a2a", "stroke-width": 3, transform: "rotate(" + a + " " + x + " 0)" }, prod);
    });
    [[786, -78, 786, -10], [770, -64, 764, -20], [802, -64, 808, -20]].forEach(([x1, y1, x2, y2]) => D.el("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: "#d9f2c6", "stroke-width": 3, "stroke-linecap": "round" }, prod));
    D.etiquette(g, 443, 292, "fromage", { "text-anchor": "middle", "font-size": 30 });
    D.etiquette(g, 638, 292, "jambon", { "text-anchor": "middle", "font-size": 30 });
    D.etiquette(g, 785, 292, "salade", { "text-anchor": "middle", "font-size": 30 });

    // le tube de l'évaporateur traverse la vitrine : du liquide plein avant le détendeur, une nappe qui s'amenuise après
    D.tube(g, 20, 470, 935, 100, "cuivre");
    D.el("rect", { x: 20, y: 480, width: 190, height: 80, fill: LIQ, opacity: 0.82 }, g);
    const fluxIn = D.courant(g, 20, 112, 480, 560, 5, 21);
    const NV = 0.55, niv = x => x < 330 ? NV : x < 830 ? NV * (1 - D.lisse((x - 330) / 500)) : 0;
    const liq = D.liquide(g, { x0: 206, x1: 955, yh: 480, yb: 560, niveau: niv, couleur: () => FRD, pas: 20 });
    const bul = D.bulles(D.el("g", {}, g), 16, 41, false);
    const vap = D.el("g", {}, g), r = D.alea(29), VAP = [];
    for (let i = 0; i < 24; i++) VAP.push({ s: (i + 0.5) / 24 + (r() - 0.5) * 0.015, ry: D.frac(i * 0.618), d: c.T[3] + 0.8 + (i % 10) * 0.12, maj: molC(vap, VERT_H) });
    // le détendeur (symbole) posé sur le tube
    const boite = D.el("g", {}, g);
    D.el("rect", { x: 108, y: 458, width: 100, height: 124, rx: 14, fill: "#fff", stroke: "#9aa7b5", "stroke-width": 3 }, boite);
    D.image(boite, "detendeurMT", 112, 484, 92, 70);
    const eDet = D.etiquette(g, 158, 624, "détendeur", { "text-anchor": "middle" });
    // flèches de chaleur : des produits vers le tube
    const chaud = D.el("g", {}, g), CH = [];
    for (let k = 0; k < 9; k++) CH.push({ x: 362 + k * 52, f: D.frac(k * 0.37), maj: D.chaleur(chaud) });
    const dessus = D.el("g", {}, g);
    const voisine = D.heroine(dessus, { r: 26, teinte: VERT_H, sansHalo: true, dephasage: 0.4 });

    // k3 : deux manomètres, 38 → 28 bar
    const cA = cadran(g, 80, 330, 44, 60, 10, [[33, 43, "#2e9e57"]]), lA = lecture(g, 80, 252, 118);
    const cB = cadran(g, 230, 330, 44, 60, 10, [[23, 33, "#2e9e57"]]), lB = lecture(g, 230, 252, 118);
    const mano = D.el("g", {}, g);
    [cA.g, lA.g, cB.g, lB.g].forEach(e => mano.appendChild(e));
    D.trait(mano, 80, 383, 80, 468); D.trait(mano, 230, 383, 230, 468);
    D.el("path", { d: "M 140 330 H 176 m -13 -12 l 13 12 l -13 12", fill: "none", stroke: D.BLEU, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, mano);

    // étiquettes
    const eBouteille = D.el("g", {}, g);
    D.lignes(eBouteille, 30, 698, ["liquide de", "la bouteille"], { "font-size": 32, "font-weight": 600, fill: "#10233c", "font-family": FONT }, 38); D.trait(eBouteille, 60, 662, 60, 576);
    const eEvap = D.el("g", {}, g);
    D.etiquette(eEvap, 520, 668, "évaporateur", { "text-anchor": "middle" }); D.trait(eEvap, 520, 640, 520, 576);
    const pMoins8 = pas(g, 690, 722, "middle", "−8 °C", D.BLEU, c.A(4, 0.1), c.E[4] + 0.3, 38);
    const eVert = D.etiquette(g, 610, 716, "en vert sur le diagramme →", { "text-anchor": "end", fill: VERT });
    const panneau = D.el("g", {}, g);
    D.el("polygon", { points: "625,640 922,640 955,691 922,742 625,742", fill: VERT, stroke: "#14583b", "stroke-width": 4, "stroke-linejoin": "round" }, panneau);
    D.lignes(panneau, 772, 683, ["vers l'aspiration", "moyenne température"], { "text-anchor": "middle", "font-size": 28, "font-weight": 700, fill: "#fff", "font-family": FONT }, 36);
    D.trait(panneau, 940, 576, 940, 640);

    const tDet = c.A(3, 0.5);
    return function (t) {
      fluxIn(t, 90);
      liq.maj(t);
      const surf = x => liq.surface(x, t);
      bul(t, q => { const x = 340 + q * 460; return [x, 556, surf(x) + 4, niv(x) > 0.1 ? D.lisse((t - c.T[4]) / 0.8) : 0]; });
      VAP.forEach(m => {
        const x = 230 + D.frac(m.s + t * 130 / 725) * 725, libre = surf(x) - 480;
        const vis = D.lisse((t - m.d) / 0.35) * D.borne((libre - 34) / 26, 0, 1) * D.borne((950 - x) / 40, 0, 1);
        m.maj(x, 496 + m.ry * Math.max(0, libre - 34) + Math.sin(t * 3 + m.s * 9) * 3, vis);
      });
      // la chaleur des produits vers le tube (k4)
      const vc = D.lisse((t - c.T[4] - 0.2) / 0.8);
      CH.forEach(h => { const f = D.frac(h.f + t * 0.45); h.maj(h.x, 440 + 28 * f, 0, vc * D.fenetre(f, 0, 1, 0.25)); });

      // k3 : manomètres et détendeur
      const bar = D.courbe([[tDet - 0.5, 38], [tDet + 0.8, 28]], t);
      cA(38 + 0.4 * Math.sin(t * 2.3)); lA("38 bar");
      cB(bar + (t > tDet + 1 ? 0.3 * Math.sin(t * 2.1) : 0)); lB((bar > 33 ? 38 : 28) + " bar");
      fondu(mano, t, c.T[3] + 0.1, c.E[3] + 0.8, 0.4);
      fondu(eDet, t, c.T[3], c.D + 1, 0.4);
      fondu(eBouteille, t, c.T[0] + 0.2, c.D + 1, 0.4);
      fondu(eEvap, t, c.T[3] + 0.3, c.D + 1, 0.5);
      // k4 : −8 °C ; k5 : le panneau et « en vert sur le diagramme »
      montrer([pMoins8], t);
      fondu(panneau, t, c.A(5, 0.15), c.D + 1, 0.5);
      fondu(eVert, t, c.A(5, 0.35), c.D + 1, 0.5);

      // la voisine verte : dans le liquide plein, passe le détendeur, flotte sur la nappe, s'envole en vapeur
      const calme = 1 - D.lisse((t - c.T[3]) / 0.5);
      const x = D.courbe([[c.T[3] + 0.2, 52], [tDet, 158], [c.E[3] + 0.3, 270], [c.T[4] + 0.6, 340], [c.A(4, 0.9), 800], [c.T[5] + 0.3, 830], [c.E[5], 950]], t, true) + 7 * Math.sin(t * 0.8) * calme;
      const pres = D.borne(1 - Math.abs(x - 158) / 45, 0, 1);
      const ysurf = D.borne(surf(x) + 4, 498, 546), y = x < 215 ? YC : D.lerp(ysurf, YC - 4 + Math.sin(t * 2.5) * 5, D.lisse((x - 700) / 130));
      voisine({ x: x, y: y + 4 * Math.sin(t * 1.3) * calme, s: D.lerp(0.55, 0.4, pres), t: t, humeur: pres > 0.05 ? "surprise" : "sourire", regard: [1, 0.2], ecrase: 0.7 * pres,
        op: D.lisse((t - c.T[0] - 0.2) / 0.8) * (1 - D.lisse((x - 915) / 35)) });
      return { temp: T_BOUT, etat: "liquide", humeur: "sourire" };
    };
  };

  /* =====================================================================
     11 · le détendeur des surgelés : le passage étroit, les sondes, « Faisons le compte »
     ===================================================================== */
  S["detendeur-bt"] = function (g, c) {
    const LIQ = D.couleur(T_BOUT, false), FRD = D.couleur(T_BT, false);
    const CX = 290, V = vanne(g, CX, 325, 0.55, "bobine", 1);
    const yH0 = V.Y(-110), yH1 = V.Y(-16), yB0 = V.Y(16), yB1 = V.Y(130);
    // les ailettes de l'évaporateur des surgelés (givrées) sont derrière le tube
    for (let x = 520; x <= 700; x += 22) D.el("rect", { x: x, y: 292, width: 8, height: 138, rx: 2, fill: "#eaf5ff", stroke: "#8fc3f0", "stroke-width": 1.5 }, g);
    D.tube(g, 20, yH0 - 10, V.X(-200) - 20, yH1 - yH0 + 20, "cuivre");
    D.tube(g, V.X(200), yB0 - 10, 955 - V.X(200), yB1 - yB0 + 20, "cuivre");
    // à 38 bar : du liquide plein ; après le passage : une nappe qui bout dans l'évaporateur
    D.el("rect", { x: 20, y: yH0, width: V.X(180) - 20, height: yH1 - yH0, fill: LIQ, opacity: 0.82 }, g);
    const fluxIn = D.courant(g, 20, V.X(180), yH0, yH1, 6, 21);
    const NV = 0.55, niv = x => x < 520 ? NV : x < 830 ? NV * (1 - D.lisse((x - 520) / 310)) : 0;
    const liq = D.liquide(g, { x0: V.X(-60), x1: 955, yh: yB0, yb: yB1, niveau: niv, couleur: () => FRD, pas: 20 });
    const jet = D.el("path", { fill: D.couleur(T_BT + 0.05, false), opacity: 0.5 }, g);
    const gouttes = D.bulles(D.el("g", {}, g), 8, 31, true);
    const bul = D.bulles(D.el("g", {}, g), 16, 41, false);
    const vap = D.el("g", {}, g), r = D.alea(29), VAP = [];
    for (let i = 0; i < 26; i++) VAP.push({ s: r(), ry: r(), d: i < 3 ? c.T[3] + 1 + i : c.T[3] + 1.5 + (i - 3) * 0.1, maj: D.mol(vap) });
    const ouvrir = V.haut();
    const dessus = D.el("g", {}, g);

    // k4 : le régulateur du meuble, son câble vers la bobine, les deux sondes à la sortie de l'évaporateur
    const reg = regulateur(g, 410, 150, 340, 140, "régulateur du meuble");
    const cabBobine = cable(g, "M " + (V.prise[0] + 2) + " " + V.prise[1].toFixed(1) + " L 410 " + V.prise[1].toFixed(1));
    const cabP = cable(g, "M 790 266 L 790 238 L 752 238"), cabT = cable(g, "M 860 262 L 860 200 L 752 200");
    const sondes = D.el("g", {}, g);
    D.el("rect", { x: 782, y: 314, width: 16, height: 12, fill: "#5d6b7a" }, sondes);
    D.el("circle", { cx: 790, cy: 290, r: 24, fill: "#fff", stroke: "#2f6fb8", "stroke-width": 5 }, sondes);
    D.texte(sondes, 790, 301, "P", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: "#2f6fb8", "font-family": FONT });
    D.el("rect", { x: 830, y: 314, width: 60, height: 8, rx: 4, fill: "#5d6b7a" }, sondes);
    D.el("rect", { x: 840, y: 262, width: 40, height: 52, rx: 8, fill: "#fff", stroke: D.ORANGE, "stroke-width": 5 }, sondes);
    D.texte(sondes, 860, 298, "T", { "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: D.ORANGE, "font-family": FONT });
    const bande = D.el("rect", { x: 762, y: 320, width: 193, height: 90, rx: 12, fill: "#ff6b35", opacity: 0.14, stroke: "#e2662c", "stroke-width": 3, "stroke-dasharray": "10 7" }, g);
    const lSonde = D.el("g", {}, g);
    D.etiquette(lSonde, 750, 458, "surchauffe", { "text-anchor": "end", fill: "#b0501c" }); D.trait(lSonde, 746, 436, 768, 412, "#b0501c");
    D.etiquette(lSonde, 815, 508, "sonde de pression", { "text-anchor": "end" }); D.trait(lSonde, 790, 474, 790, 328);
    D.etiquette(lSonde, 955, 558, "sonde de température", { "text-anchor": "end" }); D.trait(lSonde, 860, 526, 860, 324);

    // k3 : deux manomètres (38 → 13 bar) et la pastille « −32 °C »
    const bloc = D.el("g", {}, g);
    const cA = cadran(bloc, 100, 590, 60, 60, 10, [[33, 43, "#2e9e57"]]), lA = lecture(bloc, 100, 735, 150);
    const cB = cadran(bloc, 470, 590, 60, 60, 10, [[8, 18, "#2e9e57"]]), lB = lecture(bloc, 470, 735, 150);
    D.trait(bloc, 100, 517, 100, 330); D.trait(bloc, 470, 517, 470, 410);
    D.el("path", { d: "M 188 590 H 384 m -22 -17 l 22 17 l -22 17", fill: "none", stroke: D.BLEU, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round" }, bloc);
    const th = thermo(bloc, 860, 540, 190, -40, 10);
    D.etiquette(bloc, 860, 518, "température", { "text-anchor": "middle" });
    const pFroid = pas(g, 806, 650, "end", "−32 °C", "#2f6fb8", c.A(3, 0.55), c.E[3] + 1.6, 40);

    // k5-k6 : le tableau « Faisons le compte »
    const tab = D.el("g", {}, g);
    D.el("rect", { x: 30, y: 436, width: 920, height: 322, rx: 22, fill: "#fffdf8", stroke: D.BLEU, "stroke-width": 4 }, tab);
    D.texte(tab, 60, 486, "Faisons le compte", { "font-size": 38, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    const LIGNES = [["detendeurHP", "détendeur haute pression", "la haute pression", c.A(5, 0.17)],
      ["vanneGaz", "vanne de gaz de détente", "la bouteille", c.A(5, 0.5)],
      ["detendeurBT", "détendeurs des meubles", "la surchauffe", c.A(5, 0.72)],
      ["compBT", "compresseurs de chaque étage", "leur basse pression", c.T[6] + 0.3]];
    const rangs = LIGNES.map(([nom, a, b, quand], i) => {
      const y = 540 + i * 50, k = D.el("g", {}, tab);
      D.image(k, nom, 56, y - 34, 56, 42);
      D.texte(k, 128, y, a, { "font-size": 30, "font-weight": 700, fill: D.BLEU, "font-family": FONT });
      D.texte(k, 566, y, "→", { "font-size": 30, "font-weight": 700, fill: "#637285", "font-family": FONT });
      D.texte(k, 610, y, b, { "font-size": 30, "font-weight": 700, fill: D.ORANGE, "font-family": FONT });
      return { g: k, a: quand };
    });
    // les deux pictos de la 4e ligne : variateur (une onde) et paliers (des marches)
    const pictos = [[585, 196, "variateur", c.A(6, 0.45), "M 0 0 q 6 -14 12 0 t 12 0 t 12 0 t 12 0", 72], [791, 152, "paliers", c.A(6, 0.78), "M 0 8 h 8 v -8 h 8 v -8 h 8 v -8 h 8 v -8 h 8", 62]].map(([x, w, nom, quand, d, dx]) => {
      const k = D.el("g", {}, tab);
      D.el("rect", { x: x, y: 710, width: w, height: 42, rx: 21, fill: "#eef4fa", stroke: "#9aa7b5", "stroke-width": 2 }, k);
      D.el("path", { d: d, transform: "translate(" + (x + 14) + " 740)", fill: "none", stroke: D.BLEU, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, k);
      D.texte(k, x + dx, 740, nom, { "font-size": 28, "font-weight": 700, fill: D.BLEU, "font-family": FONT });
      return { g: k, a: quand };
    });
    // k7 : la coche verte
    const fin = D.el("g", {}, g);
    D.el("circle", { cx: 275, cy: 610, r: 54, fill: VERT }, fin);
    D.el("path", { d: "M 247 612 L 267 634 L 305 586", fill: "none", stroke: "#fff", "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round" }, fin);
    D.texte(fin, 350, 628, "le tour est bouclé", { "font-size": 46, "font-weight": 700, fill: VERT, "font-family": TITRE });
    const eEvap = D.el("g", {}, g);
    D.etiquette(eEvap, 610, 480, "évaporateur", { "text-anchor": "middle" }); D.trait(eEvap, 610, 448, 610, 424);

    const mila = D.heroine(dessus, { r: 30 });
    const tOri = c.A(3, 0.55);
    return function (t) {
      ouvrir(14 + 4 * Math.sin(t * 1.6));
      const sonde = t > c.T[4] && t < c.E[6];
      cabBobine(t, sonde); cabP(t, sonde); cabT(t, sonde);
      [reg.g, cabBobine.p, cabP.p, cabT.p, sondes, bande].forEach(e => fondu(e, t, c.T[4] - 0.1, c.D + 1, 0.4));
      bande.setAttribute("opacity", (0.14 * D.fenetre(t, c.T[4] - 0.1, c.E[4] + 0.3, 0.4)).toFixed(2));
      fondu(lSonde, t, c.A(4, 0.2), c.E[4] + 0.3, 0.4);
      reg.ecrire(t > c.T[4] ? "surchauffe" : "", t > c.A(4, 0.3) ? "réglée ✓" : "");

      fluxIn(t, 90);
      liq.maj(t);
      const surf = x => liq.surface(x, t), sb = surf(CX);
      jet.setAttribute("d", "M " + (CX - 18) + " " + (yB0 - 2) + " L " + (CX + 18) + " " + (yB0 - 2) + " L " + (CX + 28) + " " + sb.toFixed(1) + " L " + (CX - 28) + " " + sb.toFixed(1) + " Z");
      gouttes(t, q => [CX - 14 + q * 28, yB0 + 2, sb, 0.9, FRD]);
      bul(t, q => { const x = 470 + q * 330; return [x, yB1 - 6, surf(x) + 4, niv(x) > 0.12 ? D.lisse((t - c.T[3]) / 0.8) : 0]; });
      VAP.forEach(m => {
        const x = 330 + D.frac(m.s + t * 120 / 625) * 625, libre = surf(x) - yB0;
        const vis = D.lisse((t - m.d) / 0.35) * D.borne((libre - 34) / 26, 0, 1) * D.borne((950 - x) / 40, 0, 1);
        m.maj(x, yB0 + 16 + m.ry * Math.max(0, libre - 34) + Math.sin(t * 3 + m.s * 9) * 3, T_BT, true, vis);
      });

      // k3 : 38 bar → 13 bar quand je passe le pointeau
      const bar = D.courbe([[tOri - 0.5, 38], [tOri + 0.8, 13]], t);
      cA(38 + 0.4 * Math.sin(t * 2.3)); lA("38 bar");
      cB(bar + (t > tOri + 1 ? 0.2 * Math.sin(t * 2.1) : 0)); lB((bar > 25.5 ? 38 : 13) + " bar");
      th(D.courbe([[tOri - 0.4, 3], [tOri + 1.4, -32]], t));
      fondu(bloc, t, c.T[3] + 0.1, c.E[3] + 1.6, 0.4);
      montrer([pFroid], t);
      // k5-k6 : le tableau, ligne par ligne
      fondu(tab, t, c.T[5] - 0.1, c.T[7] - 0.2, 0.4);
      rangs.forEach(k => opa(k.g, (t - k.a) / 0.4));
      pictos.forEach(k => opa(k.g, (t - k.a) / 0.4));
      // k7 : le tour est bouclé
      fondu(fin, t, c.A(7, 0.45), c.D + 1, 0.5);
      fondu(eEvap, t, c.T[7] - 0.2, c.D + 1, 0.4);

      // l'héroïne : tube plein à 38 bar, passage du pointeau, nappe qui bout, puis l'entrée dans l'évaporateur
      const x = D.courbe([[c.T[0], 70], [c.A(3, 0.05), 90], [tOri, CX], [c.A(3, 0.9), 345], [c.E[3] + 0.5, 430], [c.T[7] - 0.2, 480], [c.A(7, 0.5), 620], [c.E[7], 720]], t, true);
      const pres = D.borne(1 - Math.abs(x - CX) / 60, 0, 1), yEnt = (yH0 + yH1) / 2;
      let y;
      if (x < CX - 45) y = yEnt; else if (x < CX) y = D.lerp(yEnt, V.Y(0), D.lisse((x - (CX - 45)) / 45));
      else if (x < CX + 50) y = D.lerp(V.Y(0), surf(x) + 4, D.lisse((x - CX) / 50)); else y = surf(x) + 4;
      const temp = D.courbe([[tOri - 0.2, T_BOUT], [tOri + 0.6, T_BT]], t);
      const etat = t < tOri ? "liquide" : "bout";
      const humeur = t < tOri - 0.5 ? "sourire" : t < tOri + 0.7 ? "surprise" : t < c.T[7] ? "froid" : "sourire";
      mila({ x: x, y: y, s: D.lerp(0.62, 0.42, pres), t: t, temp: temp, etat: etat, humeur: humeur, ecrase: 0.8 * pres, regard: [1, 0.3] });
      return { carte: D.courbe([[c.T[3], 11.3], [c.E[4], 13], [c.T[7], 13], [c.E[7], 15]], t), diag: D.courbe([[c.T[3] + 0.2, 8], [c.E[3], 9]], t), diag0: 8, temp: temp, etat: etat, humeur: humeur };
    };
  };

  /* =====================================================================
     12 · le résumé : l'escalier des quatre pressions, le tour complet
     ===================================================================== */
  S.resume = function (g, c) {
    // niveaux (repère de la scène) : 13, 28, 38, 90 bar — échelle des pressions du diagramme, mêmes couleurs
    const XA = 215, XB = 350, XM = 530, XH = 800, XV = 700, XR = 880, XL = 175;
    const Y90 = 235, Y38 = 405, Y28 = 525, Y13 = 650, YR = 690, YV = 480;
    const NIV = [["13 bar", Y13, "#1b3a63"], ["28 bar", Y28, "#2f6fb8"], ["38 bar", Y38, "#637285"], ["90 bar", Y90, D.ORANGE]];
    const bandes = NIV.map(([nom, y, coul]) => {
      const k = D.el("g", {}, g);
      const bande = D.el("rect", { x: 158, y: y - 20, width: 797, height: 40, rx: 12, fill: coul, opacity: 0 }, k);
      const ligne = D.el("line", { x1: 158, y1: y, x2: 955, y2: y, stroke: coul, "stroke-width": 3, "stroke-dasharray": "10 8", "stroke-linecap": "round" }, k);
      const pg = D.el("g", {}, k);
      const pilule = D.el("rect", { x: 22, y: y - 26, width: 128, height: 52, rx: 26, fill: "#fff", stroke: coul, "stroke-width": 4 }, pg);
      const txt = D.texte(pg, 86, y + 13, nom, { "text-anchor": "middle", "font-size": 36, "font-weight": 700, fill: coul, "font-family": FONT });
      return { g: k, pg: pg, bande: bande, ligne: ligne, pilule: pilule, txt: txt, coul: coul, y: y };
    });

    // les pipes : tout le tour de l'héroïne (cuivre), le départ de la vapeur de détente (violet) et du froid positif (vert)
    const BOUCLE = [[XA, Y13], [XB, Y13], [XB, Y28], [XM, Y28], [XM, Y90], [XH, Y90], [XH, Y38], [XR, Y38], [XR, YR], [XL, YR], [XL, Y13], [XA, Y13]];
    const boucle = poly(BOUCLE), LT = boucle.long;
    const dPts = pts => "M " + pts.map(p => p.join(" ")).join(" L ");
    const LV = [[XH - 36, Y38 - 20], [XV, Y38 - 20], [XV, YV], [XM, YV]], LG = [[XH, Y38 + 50], [XH, Y28], [XM, Y28]];
    const lanV = poly(LV), lanG = poly(LG);
    const lanes = D.el("g", {}, g);
    const pV = D.el("path", { d: dPts(LV), fill: "none", stroke: VIOLET, "stroke-width": 9, "stroke-linejoin": "round", "stroke-dasharray": "16 8" }, lanes);
    const pG = D.el("path", { d: dPts(LG), fill: "none", stroke: VERT, "stroke-width": 9, "stroke-linejoin": "round" }, lanes);
    const pBoucleA = D.el("path", { d: dPts(BOUCLE), fill: "none", stroke: "#8a4a24", "stroke-width": 16, "stroke-linejoin": "round" }, g);
    const pBoucleB = D.el("path", { d: dPts(BOUCLE), fill: "none", stroke: "#e7a978", "stroke-width": 6, "stroke-linejoin": "round" }, g);

    // les organes : un cadre blanc et le symbole, posés sur les pipes
    const organe = (nom, cx, cy, w, h, rot) => {
      const k = D.el("g", {}, g);
      D.el("rect", { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 12, fill: "#fff", stroke: "rgba(27,58,99,.35)", "stroke-width": 3 }, k);
      if (rot) { const s = 1.25, m = D.el("g", { transform: "translate(" + cx + " " + cy + ") rotate(-90) scale(" + s + ")" }, k); D.image(m, nom, -22, -32, 44, 64); }
      else if (nom === "bouteille") D.image(k, nom, cx - 27, cy - 50, 54, 100);
      else if (nom === "compBT" || nom === "compMT") D.image(k, nom, cx - 32, cy - 26, 64, 52);
      else D.image(k, nom, cx - 30, cy - 23, 60, 46);
      k.cadre = [cx - w / 2, cy - h / 2, w, h];
      return k;
    };
    const O = {
      evap: organe("evapBT", 282, Y13, 92, 68, true), compBT: organe("compBT", XB, 590, 76, 64), compMT: organe("compMT", XM, 380, 76, 64),
      refroid: organe("refroidisseur", 665, Y90, 92, 68, true), hp: organe("detendeurHP", XH, 295, 72, 58), bouteille: organe("bouteille", XH, Y38, 66, 112),
      gaz: organe("vanneGaz", XV, 432, 72, 58), mt: organe("detendeurMT", 640, Y28, 72, 58), bt: organe("detendeurBT", XR, 560, 72, 58)
    };
    const fan = D.ventilateur(g, 665, 180, 22), fanG = g.lastChild;
    // anneaux de mise en avant (k6 : deux étages en série)
    const anneau = o => { const [x, y, w, h] = o.cadre; return D.el("rect", { x: x - 6, y: y - 6, width: w + 12, height: h + 12, rx: 16, fill: "none", stroke: D.ORANGE, "stroke-width": 7 }, g); };
    const aBT = anneau(O.compBT), aMT = anneau(O.compMT);

    // légende des trois chemins (k4) et pastilles du bas
    const leg = [pas(g, 0, 746, "start", "vapeur de détente", VIOLET, c.A(4, 0.5), c.E[4] + 0.5, 30),
      pas(g, 0, 746, "start", "froid positif", VERT, c.A(4, 0.62), c.E[4] + 0.5, 30),
      pas(g, 0, 746, "start", "froid négatif", D.ORANGE, c.A(4, 0.74), c.E[4] + 0.5, 30)];
    const wLeg = leg.reduce((a, p) => a + p.g.largeur, 0) + 40;
    let xLeg = 590 - wLeg / 2;
    leg.forEach(p => { p.g.setAttribute("transform", "translate(" + xLeg.toFixed(1) + " 0)"); xLeg += p.g.largeur + 20; });
    const pas4 = pas(g, 590, 746, "middle", "quatre pressions à repérer", D.BLEU, c.A(5, 0.12), c.T[6] - 0.1, 32);
    const pas2 = pas(g, 590, 746, "middle", "deux étages en série, une seule haute pression", D.ORANGE, c.A(6, 0.1), c.D + 1, 30);
    const pSuper = pas(g, 730, 182, "start", "supercritique", "#c0392b", c.A(3, 0.55), c.E[3] + 0.8, 30);

    const mila = D.heroine(g, { r: 30 });
    const vG = D.heroine(g, { r: 26, teinte: VERT_H, sansHalo: true, dephasage: 0.4 });
    const vV = D.heroine(g, { r: 26, teinte: VIOLET_H, sansHalo: true, dephasage: 0.4 });

    /* position de l'héroïne sur la boucle (0 → LT) : k1 à k5 suivent les phrases, k6 refait le tour d'un trait */
    const sRev = t => D.courbe([[c.T[1] + 0.3, 0], [c.A(1, 0.45), 135], [c.E[1], 260], [c.A(2, 0.08), 260], [c.A(2, 0.42), 440], [c.T[3], 440], [c.E[3], 1000],
      [c.T[4], 1000], [c.A(4, 0.5), 1170], [c.E[4], 1250], [c.T[5], 1250], [c.E[5], LT]], t, true);
    const sHer = t => t < c.T[6] + 0.1 ? sRev(t) : D.courbe([[c.T[6] + 0.2, 0], [c.E[6] - 0.1, LT]], t, true);
    const diagDe = s => D.courbe([[0, 0], [85, 1], [135, 2], [260, 3], [440, 4], [730, 5], [1000, 6], [1085, 7], [1170, 8], [1380, 8], [1430, 9], [LT, 9]], s, true);
    const etatDe = s => s < 90 ? "bout" : s < 640 ? "vapeur" : s < 1075 ? "supercritique" : s < 1150 ? "bout" : s < 1420 ? "liquide" : "bout";
    const tempDe = s => D.courbe([[0, T_BT], [90, T_BT], [135, 0.06], [260, 0.35], [440, 0.25], [730, 0.95], [800, 0.95], [1000, 0.5], [1075, 0.5], [1110, T_BOUT], [1400, T_BOUT], [1440, T_BT], [LT, T_BT]], s, true);
    const humeurDe = s => s > 520 && s < 820 ? "chaud" : (s > 1040 && s < 1110) || (s > 1380 && s < 1440) ? "surprise" : s > 1440 && s < LT - 60 ? "froid" : "sourire";
    const tSep = c.A(4, 0.62), tFinG = c.A(5, 0.4);

    return function (t) {
      const s = sHer(t), cible = t < c.T[6] ? s : LT;
      // les niveaux : ils se posent un à un (k0) ; les quatre s'allument ensemble (k5)
      const allume = D.lisse((t - c.A(5, 0.12)) / 0.5);
      // chaque pression est soulignée au moment où la voix la dit (k5), la haute pression encore à « une seule » (k6)
      const PULSE = [[c.A(5, 0.4)], [c.A(5, 0.53)], [c.A(5, 0.67)], [c.A(5, 0.86), c.A(6, 0.6)]];
      bandes.forEach((b, i) => {
        const bosse = Math.max(...PULSE[i].map(tp => D.fenetre(t, tp - 0.3, tp + 0.3, 0.3))), z = 1 + 0.1 * bosse;
        b.pg.setAttribute("transform", "translate(24 " + b.y + ") scale(" + z.toFixed(3) + ") translate(-24 " + (-b.y) + ")");
        opa(b.g, (t - (c.T[0] + 0.3 + i * 0.5)) / 0.5);
        const lit = allume;
        b.bande.setAttribute("opacity", (0.16 * lit).toFixed(2));
        b.ligne.setAttribute("stroke-width", D.lerp(3, 6, lit).toFixed(1));
        b.pilule.setAttribute("fill", lit > 0.5 ? b.coul : "#fff");
        b.txt.setAttribute("fill", lit > 0.5 ? "#fff" : b.coul);
      });
      // les pipes se dessinent un peu devant l'héroïne
      const rev = D.borne(cible + 70, 0, LT);
      [pBoucleA, pBoucleB].forEach(p => p.setAttribute("stroke-dasharray", rev.toFixed(1) + " 6000"));
      pBoucleA.setAttribute("opacity", t > c.T[1] - 0.5 ? 1 : 0); pBoucleB.setAttribute("opacity", t > c.T[1] - 0.5 ? 1 : 0);
      fondu(lanes, t, c.A(2, 0.05), c.D + 1, 0.5);
      // les organes apparaissent quand l'héroïne s'en approche
      const ap = (e, sOrg) => opa(e, (cible + 60 - sOrg) / 40);
      opa(O.evap, (t - (c.T[1] - 0.4)) / 0.4); ap(O.compBT, 195);
      opa(O.compMT, (t - c.T[3] + 0.2) / 0.5); ap(O.refroid, 865); ap(O.hp, 1060);
      opa(O.bouteille, (t - c.A(2, 0.05)) / 0.5); opa(O.gaz, (t - c.A(2, 0.1)) / 0.5); opa(O.mt, (t - c.A(2, 0.15)) / 0.5);
      opa(O.bt, (t - c.A(4, 0.5)) / 0.5);
      fan(t * 420); opa(fanG, (cible + 60 - 865) / 40);
      opa(aBT, D.fenetre(t, c.A(6, 0.12), c.D, 0.3)); opa(aMT, D.fenetre(t, c.A(6, 0.35), c.D, 0.3));

      // k2 : la vapeur de détente et le froid positif arrivent à l'aspiration moyenne température, k4 : ils repartent de la bouteille
      const sG = D.courbe([[c.A(2, 0.2), 0], [c.A(2, 0.58), lanG.long], [tSep, 0], [tFinG, lanG.long]], t, true);
      const sV = D.courbe([[c.A(2, 0.32), 0], [c.A(2, 0.74), lanV.long], [tSep, 0], [tFinG, lanV.long]], t, true);
      const [gx, gy] = lanG(sG), [vx, vy] = lanV(sV);
      const visG = D.fenetre(t, c.A(2, 0.14), c.A(2, 0.66), 0.3) + D.fenetre(t, tSep - 0.2, tFinG + 0.3, 0.3);
      const visV = D.fenetre(t, c.A(2, 0.26), c.A(2, 0.82), 0.3) + D.fenetre(t, tSep - 0.2, tFinG + 0.3, 0.3);
      vG({ x: gx, y: gy, s: 0.55, t: t, humeur: "sourire", regard: [-1, 0], op: D.borne(visG, 0, 1) });
      vV({ x: vx, y: vy, s: 0.55, t: t, humeur: "sourire", regard: [-1, 0], op: D.borne(visV, 0, 1) });

      // l'héroïne
      const [hx, hy] = boucle(s), etat = etatDe(s), temp = tempDe(s), humeur = humeurDe(s);
      const ec = Math.max(D.borne(1 - Math.abs(s - 195) / 55, 0, 1), D.borne(1 - Math.abs(s - 585) / 55, 0, 1), D.borne(1 - Math.abs(s - 1060) / 40, 0, 1), D.borne(1 - Math.abs(s - 1405) / 40, 0, 1));
      mila({ x: hx, y: hy, s: 0.72 - 0.12 * ec, t: t, temp: temp, etat: etat, humeur: humeur, ecrase: 0.7 * ec, regard: [1, 0.2], op: D.lisse((t - c.T[0] - 1) / 0.5) });

      montrer(leg, t); montrer([pas4, pas2, pSuper], t);
      const out = { calques: { MT: t >= c.T[2] - 0.15, flash: t >= c.T[2] - 0.15 }, temp: temp, etat: etat, humeur: humeur };
      if (t >= c.T[1]) { out.diag = diagDe(s); out.diag0 = 0; }
      return out;
    };
  };
})();

/* =====================================================================
   voyage-vis-scenes-a.js — édition « compresseur à vis » : le voyage,
   l'aspiration, les deux vis, l'alvéole qui se ferme, la compression
   ---------------------------------------------------------------------
   MÊME CONTRAT que moteur/voyage-scenes-a.js : VOYAGE_SCENES[id](g, c) → maj(t)
   (c = { T, E, D, A(k, f) } ; T[k]/E[k] bornent la phrase k du récit
   donnees/voyage-vis.js ; maj(t) rend { temp, etat, humeur, carte?, diag?,
   diag0?, calques? }). Fonction PURE de t. Les gestes sont accrochés au RANG
   des phrases : ajouter une phrase au récit décale tout. Ce fichier ne définit
   que cinq scènes (intro, aspiration, vis, enfermee, compression) ; les neuf
   autres sont dans -b.js et -c.js.
   ÉCRAN PARTAGÉ : la scène tient dans x 20 → 965, y 150 → 760 (en-tête x < 760,
   y < 140 ; carte et diagramme à droite, x > 970).
   LE COMPRESSEUR, COMME ON LE DESSINE ICI (bi-vis, semi-hermétique, injection
   d'huile) : deux vues, `vueLongue` (coupe le long des rotors : aspiration à
   gauche, refoulement à droite, mâle au-dessus de la femelle) et `vueBout`
   (coupe en travers : carter en 8, mâle à 5 lobes, femelle à 6 creux).
   VUE LONGUE : chaque lobe est une bande oblique qui DÉFILE vers la droite
   quand les vis tournent. Le pas est CONSTANT sur toute la longueur des rotors
   (comme sur un vrai compresseur). Le mâle (bandes « \ ») et la femelle
   (bandes « / ») se rejoignent en chevrons « > » : une alvéole couvre les deux
   rotors. COMMENT L'ALVÉOLE RÉTRÉCIT : côté refoulement la carcasse est fermée
   par une paroi de bout pleine (fonte hachurée ; la fenêtre de refoulement n'y
   est pas encore ouverte). L'avant de l'alvéole bute contre cette paroi et s'y
   arrête ; l'arrière — la ligne où le lobe du mâle entre dans le creux de la
   femelle — continue d'avancer : l'alvéole se RACCOURCIT (même chevron, même pas).
   À l'aspiration c'est l'inverse : elle naît contre la paroi d'aspiration et
   grandit. L'alvéole suivie est celle de la phase `phi` : de la ligne de prise
   (lobe phi) à l'avant (lobe phi + KALV), butée contre la paroi.
   ===================================================================== */
(function () {
  "use strict";
  const D = window.VOYAGE_DESSIN;
  const S = window.VOYAGE_SCENES = window.VOYAGE_SCENES || {};
  const PI = Math.PI, TOUR = 2 * PI;
  const POL = "Calibri, Arial, sans-serif", TITRE = "Trebuchet MS, Arial, sans-serif";
  const OR = "#ff6b35", ROUGE = "#c0392b", VERT = "#1e7e54", BP = "#eef4fa", HP = "#fbefe6", AMBRE_F = "#a8670a";
  let nid = 0;
  const ident = p => "vsa-" + p + "-" + (++nid);
  const opa = (e, v) => e.setAttribute("opacity", D.borne(v, 0, 1).toFixed(2));
  const fen = (e, t, a, b, du) => opa(e, D.fenetre(t, a, b, du === undefined ? 0.4 : du));
  const f1 = v => v.toFixed(1);
  const pts = a => a.map(p => f1(p[0]) + "," + f1(p[1])).join(" ");
  const fond = (t, a, b, du) => D.lisse((t - a) / du) * (1 - D.lisse((t - b) / du)); // fondu entre a et b (du : durée)

  /* ---------- petits outils ---------- */
  /* étiquette (une ou plusieurs lignes) + son trait en pointillés ; rend { g, mv(x2, y2) } (le trait peut suivre une cible) */
  function etiq(parent, x, y, texte, o) {
    o = o || {};
    const g = D.el("g", { opacity: 0 }, parent);
    (Array.isArray(texte) ? texte : [texte]).forEach((l, i) => D.etiquette(g, x, y + i * 36, l, { "text-anchor": o.ancre || "start", "font-size": o.taille || 32, fill: o.coul || "#10233c", "font-weight": o.gras ? 700 : 600 }));
    const l = o.trait ? D.trait(g, o.trait[0], o.trait[1], o.trait[2], o.trait[3], o.coulTrait) : null;
    return { g: g, mv: (x2, y2) => { if (l) { l.setAttribute("x2", f1(x2)); l.setAttribute("y2", f1(y2)); } } };
  }
  function fleche(parent, x1, y1, x2, y2, coul, ep) {
    ep = ep || 7;
    const g = D.el("g", {}, parent), a = Math.atan2(y2 - y1, x2 - x1), L = 5 * ep;
    D.el("line", { x1: x1, y1: y1, x2: f1(x2 - Math.cos(a) * L * 0.7), y2: f1(y2 - Math.sin(a) * L * 0.7), stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    D.el("polygon", { points: pts([[x2, y2], [x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45)], [x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)]]), fill: coul }, g);
    return g;
  }
  /* flèche courbe : arc de cercle de a0 à a1 (radians, repère écran), pointe en a1 */
  function arc(parent, cx, cy, r, a0, a1, coul, ep) {
    const g = D.el("g", {}, parent);
    let d = "";
    for (let i = 0; i <= 24; i++) { const a = D.lerp(a0, a1, i / 24); d += (i ? " L " : "M ") + f1(cx + r * Math.cos(a)) + " " + f1(cy + r * Math.sin(a)); }
    D.el("path", { d: d, fill: "none", stroke: coul, "stroke-width": ep, "stroke-linecap": "round" }, g);
    const sg = a1 > a0 ? 1 : -1, ex = cx + r * Math.cos(a1), ey = cy + r * Math.sin(a1), tg = a1 + sg * PI / 2, L = 4.6 * ep;
    const ux = Math.cos(a1), uy = Math.sin(a1);
    D.el("polygon", { points: pts([[ex + Math.cos(tg) * L * 0.8, ey + Math.sin(tg) * L * 0.8], [ex + ux * L * 0.6, ey + uy * L * 0.6], [ex - ux * L * 0.6, ey - uy * L * 0.6]]), fill: coul }, g);
    return g;
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

  /* =====================================================================
     LA VUE LONGUE — coupe le long des rotors (repère local, échelle s)
     ===================================================================== */
  const YM = 350, YF = 458, RB = 54, YI = 404;      // axe du mâle, axe de la femelle, demi-hauteur d'une bande, jonction des deux
  const XR0 = 372, XR1 = 902;                       // les rotors : de l'aspiration (gauche) au refoulement (droite)
  const PAS = 96;                                   // le pas des rotors : CONSTANT sur toute leur longueur
  const XU = u => XR0 + PAS * u;                    // abscisse du lobe de phase u (une phase = un pas)
  const DEL = 0.3, LOB = 0.15;                      // inclinaison des bandes (en phase) ; demi-largeur d'un lobe (en phase)
  const KALV = 4;                                   // l'alvéole suivie : de la ligne de prise (lobe 0) jusqu'au lobe KALV, ou jusqu'à la paroi de bout
  /* le trajet du gaz : tube → vanne → filtre → moteur (entrefer du haut) → conduit → orifice d'aspiration */
  const GAZ = [[34, 350], [168, 350], [182, 334], [196, 310], [322, 310], [338, 296], [340, 246], [452, 246], [452, 292]];

  /* coupe une ligne brisée (ou un polygone fermé) à x ≤ X : ce qui dépasse la paroi de bout est remplacé par le segment qui longe la paroi */
  function coupeDroite(p, X, ferme) {
    const out = [], n = p.length, inter = (a, b) => [X, a[1] + (b[1] - a[1]) * (X - a[0]) / (b[0] - a[0])];
    for (let i = ferme ? 0 : 1; i < n; i++) {
      const c = p[i], q = p[(i + n - 1) % n], ci = c[0] <= X, qi = q[0] <= X;
      if (!ferme && i === 1 && qi) out.push(q);
      if (ci) { if (!qi) out.push(inter(q, c)); out.push(c); } else if (qi) out.push(inter(q, c));
    }
    return out;
  }

  function vueLongue(parent, o) {
    o = o || {};
    const ox = o.ox || 0, oy = o.oy || 0, s = o.s || 1;
    const fd = D.el("g", {}, parent);
    if (o.coupe) { // coupure à droite (la vue agrandie déborde)
      const cid = ident("cp");
      D.el("rect", { x: 0, y: 0, width: o.coupe, height: 800 }, D.el("clipPath", { id: cid }, fd));
      fd.setAttribute("clip-path", "url(#" + cid + ")");
    }
    const g = D.el("g", { transform: "translate(" + ox + " " + oy + ") scale(" + s + ")" }, fd);
    const defs = D.el("defs", {}, g);
    const pid = ident("hach"), gid = ident("grille"), gm = ident("fm"), gf = ident("ff"), cm = ident("cm"), cf = ident("cf"), cb = ident("cb");
    const pat = D.el("pattern", { id: pid, width: 11, height: 11, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs); // hachures de coupe : la fonte grise
    D.el("rect", { width: 11, height: 11, fill: "#bcc2c8" }, pat);
    D.el("line", { x1: 0, y1: 0, x2: 0, y2: 11, stroke: "#767f88", "stroke-width": 2.4 }, pat);
    const gr = D.el("pattern", { id: gid, width: 8, height: 8, patternUnits: "userSpaceOnUse" }, defs); // la grille du filtre
    D.el("rect", { width: 8, height: 8, fill: "#e9d9a8" }, gr);
    D.el("path", { d: "M 0 0 H 8 M 0 0 V 8", stroke: "#7c5c18", "stroke-width": 1.6, fill: "none" }, gr);
    const degrade = (id, y0, y1) => { // creux d'un rotor : acier sombre (la gorge entre deux lobes)
      const lg = D.el("linearGradient", { id: id, x1: 0, y1: y0, x2: 0, y2: y1, gradientUnits: "userSpaceOnUse" }, defs);
      [[0, "#3c4855"], [0.5, "#8996a6"], [1, "#35414d"]].forEach(([k, c]) => D.el("stop", { offset: k, "stop-color": c }, lg));
    };
    degrade(gm, YM - RB, YM + RB); degrade(gf, YI, YF + RB);
    const clip = (id, y0, h) => D.el("rect", { x: XR0, y: y0, width: XR1 - XR0, height: h }, D.el("clipPath", { id: id }, defs));
    clip(cm, YM - RB, 2 * RB); clip(cf, YI, 2 * RB); clip(cb, YM - RB, 4 * RB);

    /* la carcasse, en fonte grise hachurée, et ses creux (le contour de l'ensemble d'abord, puis le remplissage) */
    D.el("rect", { x: 150, y: 204, width: 800, height: 344, rx: 10, fill: "url(#" + pid + ")", stroke: "#39424c", "stroke-width": 3 }, g);
    const CREUX = [[166, 240, 180, 220, BP, 6], [330, 226, 194, 40, BP, 0], [392, 262, 120, 34, BP, 0], [XR0, 292, XR1 - XR0, 224, BP, 0], [150, 318, 22, 64, BP, 0]];
    CREUX.forEach(r => D.el("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: r[5], fill: "none", stroke: "#39424c", "stroke-width": 6 }, g));
    CREUX.forEach(r => D.el("rect", { x: r[0], y: r[1], width: r[2], height: r[3], rx: r[5], fill: r[4] }, g));
    [[162, 218], [162, 534], [936, 218], [936, 534]].forEach(([x, y]) => { // les boulons
      D.el("circle", { cx: x, cy: y, r: 7, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }, g);
      D.el("line", { x1: x - 4, y1: y, x2: x + 4, y2: y, stroke: "#39424c", "stroke-width": 2 }, g);
    });

    /* le moteur : stator (acier + bobinages de cuivre) et rotor sur l'axe du mâle */
    [[256, 292], [408, 444]].forEach(([y0, y1]) => {
      D.el("rect", { x: 196, y: y0, width: 120, height: y1 - y0, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }, g);
      for (let x = 208; x < 316; x += 14) D.el("line", { x1: x, y1: y0 + 3, x2: x, y2: y1 - 3, stroke: "#39424c", "stroke-width": 1.2, opacity: 0.5 }, g);
    });
    [[176, 256, 44], [314, 256, 44], [176, 400, 44], [314, 400, 44]].forEach(([x, y, h]) => {
      D.el("rect", { x: x, y: y, width: 22, height: h, rx: 9, fill: "url(#vm-cuivre-h)", stroke: "#5a2c10", "stroke-width": 2 }, g);
      for (let k = 1; k < 4; k++) D.el("line", { x1: x + 5.5 * k, y1: y + 4, x2: x + 5.5 * k, y2: y + h - 4, stroke: "#5a2c10", "stroke-width": 1.3, opacity: 0.7 }, g);
    });
    D.el("rect", { x: 190, y: 328, width: 132, height: 44, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }, g);
    for (let x = 202; x < 322; x += 20) D.el("line", { x1: x, y1: 330, x2: x + 12, y2: 370, stroke: "#39424c", "stroke-width": 2, opacity: 0.55 }, g);
    [[352, YM], [352, YF], [902, YM], [902, YF]].forEach(([x, y]) => D.el("rect", { x: x, y: y - 20, width: 22, height: 40, rx: 4, fill: "url(#vm-marine)", stroke: "#0a1829", "stroke-width": 2 }, g)); // les paliers
    D.el("rect", { x: 322, y: 340, width: 54, height: 20, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }, g); // l'arbre : moteur → vis mâle

    /* le tube d'aspiration (cuivre), sa vanne, son filtre */
    D.el("rect", { x: 28, y: 304, width: 124, height: 92, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: 28, y: 318, width: 124, height: 64, fill: BP }, g);
    D.el("rect", { x: 26, y: 296, width: 16, height: 108, rx: 3, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }, g);
    D.el("rect", { x: 62, y: 296, width: 50, height: 108, rx: 4, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }, g); // corps de la vanne
    D.el("rect", { x: 62, y: 318, width: 50, height: 64, fill: BP }, g);
    D.el("rect", { x: 76, y: 300, width: 22, height: 16, fill: "url(#vm-acier-h)", stroke: "#39424c", "stroke-width": 1.5 }, g); // le clapet de la vanne, relevé (vanne ouverte)
    D.el("rect", { x: 78, y: 262, width: 18, height: 36, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }, g);
    D.el("rect", { x: 85, y: 242, width: 4, height: 22, fill: "#39424c" }, g);
    D.el("ellipse", { cx: 87, cy: 238, rx: 28, ry: 8, fill: "none", stroke: "#8a6b1a", "stroke-width": 6 }, g);
    D.el("line", { x1: 59, y1: 238, x2: 115, y2: 238, stroke: "#8a6b1a", "stroke-width": 3 }, g);
    D.el("rect", { x: 122, y: 318, width: 12, height: 64, fill: "url(#" + gid + ")", stroke: "#7c5c18", "stroke-width": 2 }, g); // le filtre : une grille en travers du tube

    /* côté refoulement : la paroi de bout est PLEINE (fonte hachurée) — la fenêtre de refoulement n'y est pas encore ouverte */
    D.el("line", { x1: XR1, y1: 292, x2: XR1, y2: 516, stroke: "#39424c", "stroke-width": 5 }, g);

    /* les rotors : une gorge sombre + des lobes (bandes obliques) qui défilent */
    const rot = D.el("g", {}, g);
    const gM = D.el("g", { "clip-path": "url(#" + cm + ")" }, rot), gF = D.el("g", { "clip-path": "url(#" + cf + ")" }, rot);
    D.el("rect", { x: XR0, y: YM - RB, width: XR1 - XR0, height: 2 * RB, fill: "url(#" + gm + ")" }, gM);
    D.el("rect", { x: XR0, y: YI, width: XR1 - XR0, height: 2 * RB, fill: "url(#" + gf + ")" }, gF);
    const MS = [-1, 0, 1, 2, 3, 4, 5, 6], lobM = [], lobF = [];
    MS.forEach(() => {
      lobM.push(D.el("polygon", { fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": 1.5 }, gM));
      lobF.push(D.el("polygon", { fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": 1.5 }, gF));
    });
    D.el("rect", { x: XR0, y: YM - RB, width: XR1 - XR0, height: 4 * RB, fill: "none", stroke: "#2d3743", "stroke-width": 3 }, rot);
    const gP = D.el("g", { "clip-path": "url(#" + cb + ")" }, rot); // les alvéoles surlignées
    function majLobes(phi) {
      const ph = phi - Math.floor(phi);
      MS.forEach((m, i) => {
        const a = ph + m - LOB, b = ph + m + LOB;
        lobM[i].setAttribute("points", pts([[XU(a - DEL), YM - RB], [XU(b - DEL), YM - RB], [XU(b + DEL), YI], [XU(a + DEL), YI]]));
        lobF[i].setAttribute("points", pts([[XU(a + DEL), YI], [XU(b + DEL), YI], [XU(b - DEL), YF + RB], [XU(a - DEL), YF + RB]]));
      });
    }
    majLobes(0);
    /* une alvéole : le chevron entre la ligne de prise (lobe phi + m) et l'avant (lobe phi + m + K), BUTÉ contre la paroi de bout :
       l'avant s'arrête à la paroi, l'arrière continue d'avancer, l'alvéole se raccourcit. K = oo.K (1 : une simple gorge).
       coul : contour ; remplissage clair. maj(phi, m, op, ferme) : ferme 0 → 1 = le bord de gauche se trace (l'alvéole se ferme). */
    function poche(oo) {
      const K = oo.K || 1;
      const pg = D.el("g", { opacity: 0 }, gP);
      const rempl = D.el("polygon", { fill: oo.fill || "rgba(255,255,255,.82)" }, pg);
      const bord = D.el("polyline", { fill: "none", stroke: oo.coul, "stroke-width": oo.ep || 5, "stroke-linejoin": "round", "stroke-linecap": "round" }, pg);
      const gauche = D.el("polyline", { fill: "none", stroke: oo.coul, "stroke-width": oo.ep || 5, "stroke-linejoin": "round", "stroke-linecap": "round", pathLength: 100 }, pg);
      return { g: pg, maj: function (phi, m, op, ferme) {
        const a = phi + m + LOB, b = phi + m + K - LOB;
        const TL = [XU(a - DEL), YM - RB], TR = [XU(b - DEL), YM - RB], MR = [XU(b + DEL), YI], BR = [XU(b - DEL), YF + RB], BL = [XU(a - DEL), YF + RB], ML = [XU(a + DEL), YI];
        rempl.setAttribute("points", pts(coupeDroite([TL, TR, MR, BR, BL, ML], XR1, true)));
        bord.setAttribute("points", pts(coupeDroite([TL, TR, MR, BR, BL], XR1, false)));
        gauche.setAttribute("points", pts(coupeDroite([BL, ML, TL], XR1, false)));
        const fe = ferme === undefined ? 1 : ferme;
        gauche.setAttribute("stroke-dasharray", f1(100 * fe) + " 100");
        gauche.setAttribute("opacity", fe > 0.01 ? 1 : 0);
        pg.setAttribute("opacity", D.borne(op, 0, 1).toFixed(2));
      } };
    }
    /* le centre de l'alvéole (sur l'axe du mâle) et sa longueur, bornés aux rotors (l'avant s'arrête à la paroi de bout) */
    function centre(phi, m, K) {
      const xa = Math.max(XR0, XU(phi + m + LOB)), xb = Math.min(XR1, XU(phi + m + (K || 1) - LOB));
      return { x: (xa + xb) / 2, xa: xa, xb: xb, l: Math.max(0, xb - xa) };
    }
    return { fond: fd, g: g, rot: rot, s: s, majLobes: majLobes, poche: poche, centre: centre, P: (x, y) => [ox + s * x, oy + s * y] };
  }

  /* des molécules qui voyagent DANS une alvéole (positions relatives : elles suivent l'alvéole) */
  function molsPoche(parent, n, graine) {
    const r = D.alea(graine), L = [];
    for (let i = 0; i < n; i++) L.push({ fx: 0.14 + 0.72 * r(), dy: (r() - 0.5) * 56, ph: r() * TOUR, maj: D.mol(parent) });
    return function (t, V, phi, m, K, temp, op, nb) {
      const c = V.centre(phi, m, K), k = D.borne(c.l / 60, 0, 1);
      L.forEach((q, i) => {
        if (i >= nb || c.l < 14) { q.maj(-999, -999, 0, true, 0); return; }
        const [x, y] = V.P(c.xa + q.fx * c.l + Math.sin(t * 1.7 + q.ph) * 3, YM + q.dy * k + Math.cos(t * 1.3 + q.ph) * 3);
        q.maj(x - 11, y - 11, temp, true, op);
      });
    };
  }

  /* =====================================================================
     LA VUE EN BOUT — coupe en travers : carter en 8, mâle à 5 lobes, femelle à 6 creux
     ===================================================================== */
  const EB = { D: 150, Rtm: 80, Rrm: 54, Rtf: 94.5, Rrf: 68.5, Bm: 85, Bf: 99.5, W: 34, QM: 1.6, QF: 1.2 };
  const rMale = th => EB.Rrm + (EB.Rtm - EB.Rrm) * Math.pow(0.5 + 0.5 * Math.cos(5 * th), EB.QM);
  const rFem = ps => EB.Rtf - (EB.Rtf - EB.Rrf) * Math.pow(0.5 + 0.5 * Math.cos(6 * ps), EB.QF);
  /* o : { cx, cy, s } (mâle centré en cx, cy) ou { loupe: { x, y, r, z, fx, fy } } : zoom z autour du point local (fx, fy), dans un disque */
  function vueBout(parent, o) {
    const fd = D.el("g", {}, parent);
    let z, tx, ty, fx = 0, fy = 0, hote;
    if (o.loupe) {
      const L = o.loupe, cid = ident("lp");
      D.el("circle", { cx: L.x, cy: L.y, r: L.r }, D.el("clipPath", { id: cid }, fd));
      D.el("circle", { cx: L.x, cy: L.y, r: L.r, fill: "#fffdf8" }, fd);
      hote = D.el("g", { "clip-path": "url(#" + cid + ")" }, fd);
      z = L.z; tx = L.x; ty = L.y; fx = L.fx; fy = L.fy;
    } else { hote = fd; z = o.s; tx = o.cx; ty = o.cy; }
    const g = D.el("g", { transform: "translate(" + tx + " " + ty + ") scale(" + z + ") translate(" + (-fx) + " " + (-fy) + ")" }, hote);
    const defs = D.el("defs", {}, g), pid = ident("hachb");
    const pat = D.el("pattern", { id: pid, width: 11, height: 11, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    D.el("rect", { width: 11, height: 11, fill: "#bcc2c8" }, pat);
    D.el("line", { x1: 0, y1: 0, x2: 0, y2: 11, stroke: "#767f88", "stroke-width": 2.4 }, pat);
    const ET = o.loupe ? 2 : 4; // épaisseur des contours (en local) : plus fine dans la loupe
    const cercles = (r1, r2, at) => { D.el("circle", Object.assign({ cx: 0, cy: 0, r: r1 }, at), g); D.el("circle", Object.assign({ cx: 0, cy: EB.D, r: r2 }, at), g); };
    cercles(EB.Bm + EB.W, EB.Bf + EB.W, { fill: "none", stroke: "#39424c", "stroke-width": ET + 2 }); // le carter (fonte hachurée)
    cercles(EB.Bm + EB.W, EB.Bf + EB.W, { fill: "url(#" + pid + ")" });
    cercles(EB.Bm, EB.Bf, { fill: "none", stroke: "#39424c", "stroke-width": ET + 2 });              // l'alésage (les deux cylindres qui se coupent)
    cercles(EB.Bm, EB.Bf, { fill: BP });
    const pocheM = D.el("path", { fill: "rgba(255,255,255,.85)", stroke: OR, "stroke-width": ET + 1, "stroke-linejoin": "round", opacity: 0 }, g);
    const rimM = D.el("path", { fill: "none", stroke: D.HUILE, "stroke-width": 3.6, "stroke-linejoin": "round", opacity: 0 }, g); // le film d'huile : un liseré ambre sur les deux profils, sous l'acier ;
    const rimF = D.el("path", { fill: "none", stroke: D.HUILE, "stroke-width": 3.6, "stroke-linejoin": "round", opacity: 0 }, g); // là où les rotors se frôlent, les deux liserés se rejoignent
    const male = D.el("path", { fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": ET * 0.6, "stroke-linejoin": "round" }, g);
    const femelle = D.el("path", { fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": ET * 0.6, "stroke-linejoin": "round" }, g);
    D.el("circle", { cx: 0, cy: 0, r: 13, fill: "url(#vm-marine)", stroke: "#0a1829", "stroke-width": 2 }, g);
    D.el("circle", { cx: 0, cy: EB.D, r: 13, fill: "url(#vm-marine)", stroke: "#0a1829", "stroke-width": 2 }, g);
    const repM = D.el("line", { x1: 0, y1: 0, x2: 0, y2: -13, stroke: "#fff", "stroke-width": 3 }, g), repF = D.el("line", { x1: 0, y1: EB.D, x2: 0, y2: EB.D - 13, stroke: "#fff", "stroke-width": 3 }, g);
    if (o.loupe) { const L = o.loupe; D.el("circle", { cx: L.x, cy: L.y, r: L.r, fill: "none", stroke: D.BLEU, "stroke-width": 8 }, fd); }
    const chem = (f, cy) => { let d = ""; for (let i = 0; i < 300; i++) { const th = TOUR * i / 300, r = f(th); d += (i ? "L" : "M") + f1(r * Math.cos(th)) + " " + f1(cy + r * Math.sin(th)); } return d + "Z"; };
    return {
      fond: fd, s: z,
      P: (x, y) => [tx + z * (x - fx), ty + z * (y - fy)],
      /* a : angle du mâle (radian, sens horaire à l'écran) ; la femelle tourne en sens inverse, à 5/6 de la vitesse */
      maj: function (a, op, film) {
        const dm = chem(th => rMale(th - a), 0), df = chem(th => rFem(th + 5 * a / 6 + PI / 12), EB.D);
        male.setAttribute("d", dm); femelle.setAttribute("d", df); rimM.setAttribute("d", dm); rimF.setAttribute("d", df);
        repM.setAttribute("transform", "rotate(" + f1(a * 180 / PI) + ")");
        repF.setAttribute("transform", "rotate(" + f1(-5 * a / 6 * 180 / PI) + " 0 " + EB.D + ")");
        let d = "";
        for (let i = 0; i <= 26; i++) { const th = a + (2 * PI / 5) * i / 26; d += (i ? "L" : "M") + f1(EB.Bm * Math.cos(th)) + " " + f1(EB.Bm * Math.sin(th)); }
        for (let i = 26; i >= 0; i--) { const th = a + (2 * PI / 5) * i / 26; d += "L" + f1(rMale(th - a) * Math.cos(th)) + " " + f1(rMale(th - a) * Math.sin(th)); }
        pocheM.setAttribute("d", d + "Z");
        pocheM.setAttribute("opacity", D.borne(op, 0, 1).toFixed(2));
        rimM.setAttribute("opacity", D.borne(film || 0, 0, 1).toFixed(2)); rimF.setAttribute("opacity", D.borne(film || 0, 0, 1).toFixed(2));
      },
      /* le centre de l'alvéole surlignée (celle qui suit le lobe d'angle a), en repère local */
      centre: a => [(EB.Rrm + EB.Bm) / 2 * Math.cos(a + PI / 5) * 1.02, (EB.Rrm + EB.Bm) / 2 * Math.sin(a + PI / 5) * 1.02]
    };
  }

  /* ---------- des pictogrammes ---------- */
  function pictoClapet(parent, x, y) { // coupe d'un clapet (battant relevé), 120 × 70 ; en haut à gauche (x, y)
    const g = D.el("g", {}, parent);
    D.el("rect", { x: x, y: y, width: 120, height: 70, rx: 4, fill: "url(#vm-cuivre)" }, g);
    D.el("rect", { x: x, y: y + 10, width: 120, height: 50, fill: BP }, g);
    D.el("rect", { x: x + 50, y: y + 10, width: 9, height: 14, fill: "url(#vm-acier-h)" }, g);
    D.el("rect", { x: x + 50, y: y + 46, width: 9, height: 14, fill: "url(#vm-acier-h)" }, g);
    D.el("line", { x1: x + 56, y1: y + 24, x2: x + 90, y2: y + 48, stroke: "#56636f", "stroke-width": 8, "stroke-linecap": "round" }, g);
    D.el("line", { x1: x + 6, y1: y - 8, x2: x + 114, y2: y + 78, stroke: ROUGE, "stroke-width": 10, "stroke-linecap": "round" }, g);
    D.el("line", { x1: x + 114, y1: y - 8, x2: x + 6, y2: y + 78, stroke: ROUGE, "stroke-width": 10, "stroke-linecap": "round" }, g);
    return g;
  }

  /* =====================================================================
     0 · L'INTRO — titre, héroïne, la carte du circuit, le diagramme, la machine
     ===================================================================== */
  S.intro = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const titre = D.el("g", {}, g), corps = D.el("g", {}, g);
    D.texte(titre, 492, 330, c.recit.titre, { "text-anchor": "middle", "font-size": 64, "font-weight": 700, fill: D.BLEU, "font-family": TITRE });
    D.texte(titre, 492, 392, c.recit.sousTitre, { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: D.ORANGE, "font-family": POL });
    /* k5 : le grand compresseur à vis (vue longue) */
    const V = vueLongue(corps, { ox: 0, oy: 60, s: 1 });
    opa(V.fond, 0);
    /* k2 : un flot régulier de vapeur (trois files, vitesse constante : sans à-coups) */
    const flot = D.el("g", { opacity: 0 }, corps), FL = [];
    for (let r = 0; r < 3; r++) for (let i = 0; i < 15; i++) FL.push({ r: r, i: i, maj: D.mol(flot) });
    /* k1 : un entrepôt, trois portes de chambre froide */
    const entrepot = D.el("g", { opacity: 0 }, corps);
    D.el("polygon", { points: "650,330 760,290 870,330", fill: "#8a96a4", stroke: D.BLEU, "stroke-width": 4, "stroke-linejoin": "round" }, entrepot);
    D.el("rect", { x: 660, y: 330, width: 200, height: 150, fill: "#e4ebf3", stroke: D.BLEU, "stroke-width": 4 }, entrepot);
    [0, 1, 2].forEach(k => {
      D.el("rect", { x: 676 + k * 60, y: 380, width: 44, height: 100, fill: "#bcd9f2", stroke: D.BLEU, "stroke-width": 3 }, entrepot);
      D.el("line", { x1: 698 + k * 60, y1: 380, x2: 698 + k * 60, y2: 480, stroke: D.BLEU, "stroke-width": 2 }, entrepot);
    });
    /* k3 : la carte du circuit ; k4 : la flèche vers le diagramme */
    const cir = D.circuit(corps, 22, 165, 920, true);
    opa(cir.g, 0);
    const fl = D.el("g", { opacity: 0 }, corps);
    D.el("polygon", { points: "206,520 600,520 600,494 758,542 600,590 600,564 206,564", fill: D.ORANGE, stroke: "#8f2f10", "stroke-width": 3, "stroke-linejoin": "round" }, fl);
    D.texte(fl, 400, 551, "à droite : le diagramme", { "text-anchor": "middle", "font-size": 34, "font-weight": 700, fill: "#fff", "font-family": POL });
    const chev = [0, 1, 2].map(() => D.el("path", { d: "M 0 -22 L 16 0 L 0 22", fill: "none", stroke: D.ORANGE, "stroke-width": 8, "stroke-linecap": "round", "stroke-linejoin": "round" }, corps));
    /* k6 : la pluie de gouttelettes d'huile dans les vis */
    const huile = D.el("g", { opacity: 0 }, corps), GO = [];
    { const r = D.alea(61); for (let i = 0; i < 24; i++) GO.push({ x0: r(), y: 372 + r() * 188, ph: r() * TOUR, R: 4.5 + r() * 4, e: D.el("circle", { fill: D.HUILE, stroke: "#8a5a10", "stroke-width": 1.4 }, huile) }); }
    /* au-dessus : pastilles, héroïnes */
    const dessus = D.el("g", {}, g);
    const pas = [["fluide frigorigène", D.BLEU, T[0], E[0]], ["chambres froides d'un entrepôt", "#2f6fb8", T[1], E[1]], ["beaucoup de vapeur, sans à-coups", D.ORANGE, T[2], E[2]]]
      .map(([s, coul, a, b]) => ({ g: D.pastille(dessus, 492, 640, s, coul, 38, "middle"), a: a + 0.2, b: b + 0.3 }));
    const pPiston = D.pastille(dessus, 492, 742, "pas de piston, pas de clapets", D.ORANGE, 34, "middle");
    const pHuile = D.pastille(dessus, 492, 742, "beaucoup d'huile", AMBRE_F, 34, "middle");
    const grande = D.heroine(dessus, { r: 60 }), petite = D.heroine(dessus, { r: 30 });
    /* le tour du circuit : d'abord à l'oreille de la phrase 3, puis au rythme du diagramme (phrases 4-5) */
    const MAPD = [[0, 0], [1, 0.7], [2, 1.2], [3, 3.2], [4, 3.7], [5, 4.2], [6, 7.1], [7, 7.8], [8, 8.3], [9, 13]];
    const tour3 = [[A(3, 0.12), 0], [A(3, 0.2), 0.6], [A(3, 0.38), 4], [A(3, 0.55), 6], [A(3, 0.7), 7.6], [A(3, 0.82), 9], [A(3, 0.93), 11.6], [E[3] + 0.4, 13]];
    const tempDe = w => D.courbe([[0, 0.08], [1.2, 0.08], [3, 0.2], [4.2, 0.62], [6.8, 0.62], [7.4, 0.5], [11.3, 0.5], [11.9, 0.08], [13, 0.08]], w, true);
    const etatDe = w => w > 0.15 && w < 1 ? "bout" : w >= 1 && w < 7.2 ? "vapeur" : "liquide";
    const POS = { evaporateur: 0.7, compresseur: 4, separateurHuile: 6, condenseur: 7.5, bouteille: 9, detendeur: 11.5 };
    return function (t) {
      opa(titre, 1 - D.lisse((t - (T[0] - 1)) / 0.7));
      /* la grande héroïne : sous le titre, puis au centre, puis elle rapetisse pour entrer dans la carte */
      const gx = D.courbe([[0, 492], [T[3] - 0.2, 492], [A(3, 0.12), 168]], t), gy = D.courbe([[0, 560], [T[0] - 0.6, 560], [T[0] + 0.6, 430], [T[3] - 0.2, 430], [A(3, 0.12), 165 + 0.92 * 545]], t) + Math.sin(t * 2.2) * 6;
      const gs = D.courbe([[0, 0.9], [T[0] - 0.6, 0.9], [T[0] + 0.6, 1.5], [T[3] - 0.2, 1.5], [A(3, 0.12), 0.45]], t);
      const dansCarte = t >= A(3, 0.12) && t <= T[5] + 0.4;
      /* le diagramme et le point sur la carte */
      const r = {};
      let w = -1;
      if (t >= T[4]) { w = 9 * D.borne((t - T[4]) / (E[5] - T[4]), 0, 1); r.diag = w; r.diag0 = 0; }
      const idx = t >= T[4] ? D.courbe(MAPD, w, true) : D.courbe(tour3, t, true);
      const wm = ((idx % 13) + 13) % 13;
      const etat = etatDe(wm), temp = tempDe(wm), humeur = wm > 3.2 && wm < 6.8 ? "chaud" : "sourire";
      const [px, py] = cir.ecran(...D.circuitPoint(idx));
      /* la grande, avant la carte (op 1 → 0 pendant qu'elle devient la petite) */
      const passage = D.lisse((t - A(3, 0.1)) / 0.4);
      grande({ x: gx, y: gy, s: gs, t: t, temp: 0.1, etat: "liquide", regard: [D.lisse((t - T[3]) / 1.4), 0], humeur: t > T[5] ? "surprise" : "sourire",
        op: t < A(3, 0.12) ? 1 : 0 });
      petite({ x: px, y: py, s: 0.62, t: t, temp: temp, etat: etat, humeur: humeur, op: dansCarte ? passage * (1 - D.lisse((t - (T[5] - 0.2)) / 0.5)) : 0 });
      /* pastilles de la présentation */
      pas.forEach(p => fen(p.g, t, p.a, p.b, 0.35));
      /* k1 : l'entrepôt */
      fen(entrepot, t, T[1] + 0.3, E[1] + 0.2, 0.5);
      /* k2 : le flot de vapeur */
      fen(flot, t, T[2] - 0.1, E[2] + 0.6, 0.6);
      FL.forEach(m => {
        const x = -20 + ((m.i * 66 + t * 120 + m.r * 25) % 990), y = 200 + m.r * 34 + Math.sin(m.i * 1.9 + m.r) * 6;
        m.maj(x, y, 0.08 + 0.1 * (x / 990), true, D.borne(Math.min(x - 34, 950 - x) / 50, 0, 1));
      });
      /* k3 : la carte, ses organes qui s'allument à leur nom */
      const carte = D.lisse((t - (T[3] - 0.1)) / 0.9) * (1 - D.lisse((t - (T[5] - 0.2)) / 0.7));
      opa(cir.g, carte);
      for (const nom in POS) cir.surligne(nom, t > A(3, 0.12) && t < E[3] + 0.5 && Math.abs(idx - POS[nom]) < 0.8);
      /* k4 : la grande flèche vers le diagramme */
      fen(fl, t, T[4], E[4] + 0.3, 0.5);
      chev.forEach((e, k) => {
        const f = D.frac(t * 0.9 - k * 0.22), a = fond(t, T[4], E[4] + 0.3, 0.4) * D.fenetre(f, 0, 1, 0.2);
        e.setAttribute("transform", "translate(" + (916 + k * 14) + " 542)"); opa(e, a * (0.35 + 0.65 * D.frac(1 - f)));
      });
      /* k5 : la machine ; k6 : l'huile ; k7 : on entre */
      opa(V.fond, D.lisse((t - (T[5] + 0.45)) / 0.8));
      V.majLobes(0.1 * Math.max(0, t - T[5]));
      fen(pPiston, t, T[5] + 0.7, E[5] + 0.4, 0.35); fen(pHuile, t, T[6], c.D + 1, 0.35);
      opa(huile, D.lisse((t - A(6, 0.1)) / 0.6));
      GO.forEach(q => {
        const x = 410 + D.frac(q.x0 + t * 0.045) * 470, y = q.y + Math.sin(t * 1.6 + q.ph) * 9 + 14 * Math.sin(t * 0.7 + q.ph * 2);
        q.e.setAttribute("cx", f1(x)); q.e.setAttribute("cy", f1(y)); q.e.setAttribute("r", f1(q.R));
      });
      /* la grande revient près de la machine (k5), puis plonge dans l'orifice d'aspiration (k7) */
      const vient = D.lisse((t - (T[5] + 0.6)) / 0.8);
      const plonge = t > T[7] - 0.2 ? D.lisse((t - (T[7] - 0.2)) / (c.D - T[7] - 0.4)) : 0;
      const [ox, oy] = V.P(452, 246), px2 = D.courbe([[0, 110], [T[7] - 0.2, 110], [A(7, 0.35), 330], [A(7, 0.62), 452]], t);
      const py2 = D.courbe([[0, 205], [A(7, 0.62), 205], [A(7, 0.75), oy + 6], [c.D - 0.3, 410]], t);
      const ec = D.fenetre(t, A(7, 0.7), c.D, 0.5) * 0.4;
      if (t > T[5] + 0.3) { // la grande revient, en vapeur : même visage, sans le décor de la carte
        grande({ x: px2, y: py2, s: D.lerp(0.62, 0.36, D.lisse((t - A(7, 0.55)) / 1.2)), t: t, temp: D.lerp(0.1, 0.2, plonge), etat: "vapeur", regard: [1, 0.2], humeur: t > T[5] && t < E[6] ? "surprise" : "sourire", ecrase: ec, op: vient });
      }
      /* le point du diagramme (état de la molécule du circuit) */
      r.temp = temp; r.etat = etat; r.humeur = humeur;
      return r;
    };
  };

  /* =====================================================================
     1 · L'ASPIRATION — côté gauche agrandi : tube, vanne, filtre, moteur, entrée des vis
     ===================================================================== */
  S.aspiration = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const V = vueLongue(g, { ox: -14.4, oy: -60, s: 1.3, coupe: 964 });
    opa(V.rot, 0);
    D.el("polygon", { points: "948,205 960,235 944,265 960,295 944,325 960,355 944,385 960,415 944,445 960,475 944,505 960,535 944,565 960,595 944,625 960,652 964,652 964,205", fill: D.CREME, stroke: "#39424c", "stroke-width": 2.5 }, g); // la coupure à droite
    const dessus = D.el("g", {}, g);
    const GZ = poly(GAZ);
    /* le flot de vapeur le long du trajet, la saleté arrêtée par le filtre, les flèches de chaleur du moteur */
    const flot = D.el("g", { opacity: 0 }, dessus), FL = [], R = D.alea(33);
    for (let i = 0; i < 15; i++) FL.push({ o: (R() - 0.5) * 1.6, maj: D.mol(flot) });
    const AMP = [22, 6, 6, 4, 6, 6, 9, 9]; // écart latéral (local) des molécules, segment par segment : elles restent dans leur couloir
    const saletes = [], rs = D.alea(8);
    for (let i = 0; i < 10; i++) saletes.push({ y: 324 + rs() * 52, dx: rs() * 6, ta: 0.08 + 0.55 * rs(), R: 2.5 + rs() * 2.5, e: D.el("circle", { fill: "#6b4a2b", stroke: "#3b2a18", "stroke-width": 1 }, dessus) });
    const chaud = D.el("g", {}, dessus), CH = [];
    for (let i = 0; i < 6; i++) CH.push({ x: 215 + (i % 3) * 38, bas: i > 2, maj: D.chaleur(chaud) });
    const mila = D.heroine(dessus, { r: 30 });
    /* étiquettes et pastille */
    const eVanne = etiq(dessus, 22, 192, "vanne d'aspiration", { trait: [100, 202, 100, 232] });
    const eFiltre = etiq(dessus, 152, 700, "filtre", { ancre: "middle", trait: [152, 668, 152, 458] });
    const eMoteur = etiq(dessus, 318, 192, "moteur électrique", { ancre: "middle", trait: [318, 202, 318, 262] });
    const eVis = etiq(dessus, 800, 192, "entrée des vis", { ancre: "middle", trait: [800, 202, 800, 322] });
    const pAucune = D.pastille(dessus, 492, 742, "aucune goutte de liquide", ROUGE, 32, "middle");
    return function (t) {
      /* la position de la molécule le long du trajet */
      const s = D.courbe([[T[2], 40], [E[2], 78], [T[3], 78], [E[3], 140], [T[4], 140], [E[4], 390], [T[5], 390], [E[5], 480], [T[6], 480], [E[6], 495]], t, true);
      const [lx, ly] = GZ(s), [x, y] = V.P(lx, ly);
      const sh = D.courbe([[100, 0.6], [150, 0.6], [185, 0.4], [340, 0.4], [400, 0.45]], s, true) * V.s;
      const filtre = D.fenetre(s, 86, 102, 8) * 0.35;
      const temp = D.courbe([[T[5], 0.08], [E[5], 0.2]], t, true);
      const vue = t >= T[2] - 0.2;
      mila({ x: x, y: y, s: sh, t: t, temp: temp, etat: "vapeur", humeur: "sourire", regard: [1, 0.1], ecrase: filtre, op: vue ? D.lisse((t - (T[2] - 0.2)) / 0.5) : 0 });
      /* le flot de vapeur (même trajet, vitesse constante) */
      opa(flot, D.lisse((t - T[2]) / 1));
      FL.forEach((m, i) => {
        const ss = ((t * 55 + i * GZ.long / 15) % GZ.long), [qx, qy, k] = GZ(ss);
        const a = GAZ[k], b = GAZ[k + 1], dl = Math.hypot(b[0] - a[0], b[1] - a[1]), ec = m.o * AMP[k]; // écart le long de la normale du segment
        const [px, py] = V.P(qx - (b[1] - a[1]) / dl * ec, qy + (b[0] - a[0]) / dl * ec);
        m.maj(px - 11, py - 11, D.courbe([[183, 0.08], [309, 0.2]], ss, true), true, D.borne(Math.min(ss - 12, GZ.long - 20 - ss) / 25, 0, 1) * 0.9);
      });
      /* k3 : les saletés arrêtées par la grille */
      saletes.forEach(q => {
        const ta = A(3, q.ta), f = D.lisse((t - (ta - 1.1)) / 1.1);
        const [px, py] = V.P(D.lerp(72, 118 - q.dx, f), q.y);
        q.e.setAttribute("cx", f1(px)); q.e.setAttribute("cy", f1(py)); q.e.setAttribute("r", f1(q.R * V.s));
        q.e.setAttribute("opacity", t < ta - 1.1 ? 0 : 1);
      });
      /* k4 : la chaleur du moteur passe dans la vapeur */
      const ch = D.fenetre(t, A(4, 0.05), E[4] + 0.5, 0.5);
      CH.forEach((q, i) => {
        const f = D.frac(t * 0.55 + i * 0.17), [px, py] = V.P(q.x, q.bas ? 396 + f * 14 : 304 - f * 14);
        q.maj(px, py, q.bas ? 180 : 0, ch * D.fenetre(f, 0, 1, 0.25));
      });
      /* étiquettes, pastille, vis */
      fen(eVanne.g, t, A(2, 0.1), E[2] + 0.4); fen(eFiltre.g, t, A(3, 0.05), E[3] + 0.4); fen(eMoteur.g, t, A(4, 0.1), E[4] + 0.4);
      fen(eVis.g, t, T[6], c.D + 1, 0.4); fen(pAucune, t, T[5] + 0.3, E[5] + 0.4, 0.4);
      opa(V.rot, D.lisse((t - (T[6] - 0.1)) / 0.9));
      V.majLobes(0.05 * t);
      return { temp: temp, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* =====================================================================
     2 · LES DEUX VIS — la vue longue, puis la vue en bout, puis le film d'huile
     ===================================================================== */
  S.vis = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const g1 = D.el("g", {}, g), g2 = D.el("g", { opacity: 0 }, g), g3 = D.el("g", { opacity: 0 }, g);
    /* vue longue */
    const V = vueLongue(g1, { ox: 0, oy: 60, s: 1 });
    const pocheV = V.poche({ coul: OR, K: KALV });
    const mols1 = molsPoche(g1, 6, 5);
    const lab1 = etiq(g1, 650, 222, "rotor mâle", { ancre: "middle", trait: [650, 232, 650, 358] });
    const lab2 = etiq(g1, 650, 668, "rotor femelle", { ancre: "middle", trait: [650, 636, 650, 570] });
    const rotA = D.el("g", { opacity: 0 }, g1);
    arc(rotA, 258, 204, 34, -2.4, 0.6, OR, 8);
    D.etiquette(rotA, 312, 214, "moteur", { "font-weight": 700, fill: D.ORANGE });
    const flAR = D.el("g", { opacity: 0 }, g1);
    fleche(flAR, 380, 650, 900, 650, D.ORANGE, 8);
    D.etiquette(flAR, 640, 704, "de l'aspiration au refoulement", { "text-anchor": "middle", "font-weight": 700, fill: D.ORANGE });
    const pTr = D.pastille(g1, 492, 742, "près de 3 000 tr/min", "#2f6fb8", 32, "middle");
    /* vue en bout */
    const B = vueBout(g2, { cx: 330, cy: 315, s: 1.3 });
    const labM = etiq(g2, 600, 262, "rotor mâle", { trait: [592, 252, 408, 300] });
    const labF = etiq(g2, 600, 560, "rotor femelle", { trait: [592, 550, 450, 500] });
    const labA = etiq(g2, 600, 392, "alvéole", { coul: D.ORANGE, gras: true, trait: [592, 382, 430, 340], coulTrait: D.ORANGE });
    const flM = D.el("g", { opacity: 0 }, g2), flF = D.el("g", { opacity: 0 }, g2);
    arc(flM, 330, 315, 176, -2.95, -2.2, OR, 9);
    arc(flF, 330, 510, 196, 2.95, 2.2, OR, 9);
    const pSens = D.pastille(g2, 492, 742, "sens contraires", "#2f6fb8", 32, "middle");
    /* loupe sur le contact */
    const BL = vueBout(g3, { loupe: { x: 330, y: 455, r: 235, z: 4.6, fx: 0, fy: 80 } });
    const labFilm = etiq(g3, 612, 392, "film d'huile", { coul: AMBRE_F, gras: true, trait: [604, 382, 338, 453], coulTrait: AMBRE_F });
    const labMl = etiq(g3, 612, 270, "rotor mâle", { trait: [604, 260, 380, 340] });
    const labFl = etiq(g3, 612, 560, "rotor femelle", { trait: [604, 550, 380, 520] });
    const mila = D.heroine(g, { r: 30 });
    /* l'angle du mâle : tourne en k2, s'arrête en k3 (alvéole à droite), repart doucement en k5 */
    const AS = -1.064 + TOUR * 3;
    const angle = t => t < T[3] ? AS - D.courbe([[T[2] - 0.5, 5.2], [T[3], 0]], t) : AS;
    const A_LOUPE = PI / 2 - TOUR / 5 + 3 * TOUR; // un lobe du mâle pointe droit dans un creux de la femelle : le contact est au centre de la loupe
    const phi = t => D.courbe([[T[1], -4], [T[1] + 2, -3.8], [T[4] - 0.3, -0.45], [T[5] - 0.1, 3.9]], t, true); // k4 : l'arrière de l'alvéole sort de l'aspiration, l'avant bute contre la paroi de bout, elle se raccourcit
    return function (t) {
      const aLong = Math.max(fond(t, -1, T[2] - 0.1, 0.5), fond(t, T[4] - 0.4, T[5] - 0.1, 0.5));
      opa(g1, aLong); opa(g2, fond(t, T[2] - 0.2, T[4] - 0.1, 0.5)); opa(g3, fond(t, T[5] - 0.1, c.D + 1, 0.6));
      /* vue longue */
      const ph = phi(t);
      V.majLobes(ph);
      pocheV.maj(ph, 0, D.fenetre(t, T[4] - 0.1, T[5] - 0.1, 0.5) * 0.9, 1);
      const cc = V.centre(ph, 0, KALV);
      mols1(t, V, ph, 0, KALV, 0.2, D.fenetre(t, A(4, 0.1), T[5] - 0.1, 0.5), 6);
      fen(lab1.g, t, A(0, 0.35), T[2] - 0.1, 0.4); fen(lab2.g, t, A(0, 0.6), T[2] - 0.1, 0.4);
      fen(rotA, t, T[1] + 0.2, T[2] - 0.1, 0.4); fen(pTr, t, A(1, 0.45), T[2] - 0.1, 0.4);
      fen(flAR, t, T[4] + 0.2, T[5] - 0.1, 0.4);
      /* vue en bout */
      const a = angle(t);
      B.maj(a, D.lisse((t - (T[3] - 0.3)) / 0.5), 0);
      fen(labM.g, t, T[2] + 0.4, E[2] + 0.2, 0.3); fen(labF.g, t, A(2, 0.2), E[2] + 0.2, 0.3);
      fen(flM, t, T[2] + 0.1, E[3] + 0.3, 0.4); fen(flF, t, T[2] + 0.1, E[3] + 0.3, 0.4);
      fen(pSens, t, T[2] + 0.4, E[2] + 0.4, 0.4);
      fen(labA.g, t, A(3, 0.1), E[3] + 0.3, 0.4);
      /* loupe */
      BL.maj(A_LOUPE, 0, D.lisse((t - T[5]) / 0.8));
      fen(labFilm.g, t, T[5] + 0.5, c.D + 1, 0.4); fen(labMl.g, t, T[5] + 0.3, c.D + 1, 0.4); fen(labFl.g, t, T[5] + 0.3, c.D + 1, 0.4);
      /* l'héroïne : dans l'alvéole surlignée (vue en bout, k3 ; vue longue, k4) */
      const [bx, by] = B.centre(AS), pb = B.P(bx, by), pl = V.P(cc.x, YM);
      const enBout = fond(t, T[3] + 0.3, T[4] - 0.1, 0.4), enLong = fond(t, T[4] + 0.1, T[5] - 0.2, 0.4);
      const largeur = D.borne(cc.l / 62, 0.4, 1);
      mila({ x: enBout > enLong ? pb[0] : pl[0], y: enBout > enLong ? pb[1] : pl[1], s: enBout > enLong ? 0.5 : 0.62 * largeur + 0.1, t: t, temp: 0.2, etat: "vapeur", humeur: "sourire", regard: [1, 0], ecrase: enLong > enBout ? 0.35 : 0, op: Math.max(enBout, enLong) });
      return { temp: 0.2, etat: "vapeur", humeur: "sourire" };
    };
  };

  /* =====================================================================
     3 · ENFERMÉE — l'alvéole s'ouvre sous l'orifice, se remplit, se ferme
     ===================================================================== */
  S.enfermee = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const V = vueLongue(g, { ox: 0, oy: 60, s: 1 });
    const pO = V.poche({ coul: OR, K: KALV });
    const dessus = D.el("g", {}, g);
    const R = D.alea(71), VO = [];
    for (let i = 0; i < 8; i++) VO.push({ xd: 410 + R() * 90, dy: (R() - 0.5) * 44, fx: 0.15 + 0.7 * R(), td: 0.22 * i, maj: D.mol(dessus) });
    const mila = D.heroine(dessus, { r: 30 });
    /* le bord de l'orifice (le repère « l'orifice glisse hors de son bord ») */
    const [bx0, by0] = V.P(512, 294);
    const marque = D.el("g", { opacity: 0 }, dessus);
    D.el("circle", { cx: bx0, cy: by0, r: 16, fill: "none", stroke: OR, "stroke-width": 5 }, marque);
    const eOr = etiq(dessus, 640, 205, "orifice d'aspiration", { ancre: "middle", trait: [560, 215, 470, 322] });
    const eAlv = etiq(dessus, 300, 668, "alvéole", { ancre: "middle", coul: D.ORANGE, gras: true, trait: [300, 636, 420, 572], coulTrait: D.ORANGE });
    const pClapet = D.pastille(dessus, 492, 742, "pas de clapet : la forme des vis fait la porte", "#2f6fb8", 30, "middle");
    const picto = D.el("g", { opacity: 0 }, dessus);
    pictoClapet(picto, 800, 164);
    D.etiquette(picto, 780, 212, "clapet", { "text-anchor": "end", "font-size": 30 });
    /* l'alvéole naît contre la paroi d'aspiration (phi −3,85), grandit jusqu'à sa longueur pleine (la ligne de prise sort alors de la paroi),
       puis le lobe quitte l'orifice : elle est fermée à phi 1,6 (t ≈ 19,6 s) et son avant touche alors la paroi de bout */
    const phi = t => -3.85 + 0.297 * (t - 1.2);
    return function (t) {
      const ph = phi(t), cc = V.centre(ph, 0, KALV);
      V.majLobes(ph);
      pO.maj(ph, 0, D.lisse((t - T[0]) / 0.5), D.lisse((ph - 0.95) / 0.65)); // le bord de gauche se ferme quand le lobe quitte l'orifice (phi 0,95 → 1,6)
      /* l'héroïne : au-dessus de l'orifice, elle descend dans l'alvéole pendant la phrase 1 */
      const xd = D.courbe([[0, 345], [T[1] - 0.5, 440]], t), xh = D.lerp(xd, D.borne(cc.x, 400, 505), D.lisse((t - (T[1] - 0.7)) / 0.7));
      const w = D.lisse((t - (T[1] + 0.3)) / 2.4);
      const [x, y] = V.P(D.lerp(xh, cc.x, w), D.lerp(246, YM, w));
      const largeur = D.borne(cc.l / 70, 0.5, 1);
      const humeur = t > A(3, 0.1) && t < E[3] + 0.5 ? "surprise" : "sourire";
      mila({ x: x, y: y, s: D.lerp(0.5, 0.82 * largeur, w), t: t, temp: 0.2, etat: "vapeur", humeur: humeur, regard: [1, 0.2], ecrase: 0, op: 1 });
      /* les voisines : elles arrivent du conduit et se logent dans l'alvéole */
      VO.forEach((m, i) => {
        const td = T[1] + 0.2 + m.td, f = D.lisse((t - td) / 1.5);
        const xm = D.courbe([[0, 345 + i * 6], [td, m.xd]], t); // dans le conduit, puis : d'abord DESCENDRE par l'orifice, ensuite glisser vers sa place dans l'alvéole
        const q = V.P(cc.xa + m.fx * cc.l, YM + m.dy * D.borne(cc.l / 60, 0, 1)), q0 = V.P(xm, 246 + m.dy * 0.25);
        const dsc = D.lisse(f / 0.5), gl = D.lisse((f - 0.5) / 0.5);
        const px = f < 0.5 ? q0[0] : D.lerp(V.P(m.xd, 0)[0], q[0], gl), py = f < 0.5 ? D.lerp(q0[1], q[1], dsc) : q[1];
        m.maj(px - 11, py - 11, 0.2, true, t > T[1] - 1.5 ? D.borne((t - (T[1] - 1.5)) / 0.8, 0, 1) * (cc.l < 14 && f > 0.5 ? 0 : 1) : 0);
      });
      /* le repère du bord de l'orifice : il glisse hors du bord de l'alvéole (phrase 2) */
      opa(marque, D.fenetre(ph, 0.55, 1.75, 0.25));
      /* étiquettes, pastille, pictogramme */
      fen(eOr.g, t, T[0] + 0.3, E[2] + 0.4); fen(eAlv.g, t, A(0, 0.5), E[3] + 0.4);
      fen(pClapet, t, T[4] + 0.2, c.D + 1, 0.5); fen(picto, t, A(4, 0.3), c.D + 1, 0.5);
      eAlv.mv(V.P(cc.x, 512)[0], 574);
      return { temp: 0.2, etat: "vapeur", humeur: humeur };
    };
  };

  /* =====================================================================
     4 · LA COMPRESSION — l'alvéole avance et rétrécit ; d'autres se remplissent derrière
     ===================================================================== */
  S.compression = function (g, c) {
    const T = c.T, E = c.E, A = c.A;
    const V = vueLongue(g, { ox: 0, oy: 60, s: 1 });
    const pO = V.poche({ coul: OR, K: KALV }), p1 = V.poche({ coul: "#6f8aa8", fill: "rgba(230,240,250,.7)", ep: 3 }), p2 = V.poche({ coul: "#6f8aa8", fill: "rgba(230,240,250,.7)", ep: 3 });
    const dessus = D.el("g", {}, g);
    const m0 = molsPoche(dessus, 6, 41), m1 = molsPoche(dessus, 5, 42), m2 = molsPoche(dessus, 5, 43);
    const flux = [], R = D.alea(9); // le flux continu par l'orifice
    for (let i = 0; i < 6; i++) flux.push({ x: 405 + R() * 90, ph: i / 6, maj: D.mol(dessus) });
    const mila = D.heroine(dessus, { r: 30 });
    /* k4 : la comparaison, en bas à gauche */
    const cmp = D.el("g", { opacity: 0 }, dessus);
    D.el("rect", { x: 22, y: 628, width: 610, height: 110, rx: 16, fill: "#fffdf8", stroke: "rgba(27,58,99,.25)", "stroke-width": 2 }, cmp);
    D.el("rect", { x: 44, y: 646, width: 84, height: 74, rx: 5, fill: BP, stroke: D.BLEU, "stroke-width": 4 }, cmp);
    const piston = D.el("rect", { x: 50, y: 0, width: 72, height: 22, rx: 3, fill: "url(#vm-acier)", stroke: "#39424c", "stroke-width": 2 }, cmp);
    const tige = D.el("line", { x1: 86, y1: 0, x2: 86, y2: 720, stroke: "#56636f", "stroke-width": 6 }, cmp);
    D.el("line", { x1: 40, y1: 642, x2: 132, y2: 724, stroke: ROUGE, "stroke-width": 10, "stroke-linecap": "round" }, cmp);
    D.el("line", { x1: 132, y1: 642, x2: 40, y2: 724, stroke: ROUGE, "stroke-width": 10, "stroke-linecap": "round" }, cmp);
    const cl = D.el("clipPath", { id: ident("cv") }, cmp), cid = cl.getAttribute("id");
    D.el("rect", { x: 190, y: 646, width: 130, height: 74 }, cl);
    D.el("rect", { x: 190, y: 646, width: 130, height: 74, rx: 6, fill: "url(#vm-acier)", stroke: "#2d3743", "stroke-width": 3 }, cmp);
    const bandes = D.el("g", { "clip-path": "url(#" + cid + ")" }, cmp), BAN = [];
    for (let i = 0; i < 5; i++) BAN.push(D.el("polygon", { fill: "#3c4855" }, bandes));
    D.el("line", { x1: 190, y1: 683, x2: 320, y2: 683, stroke: "#2d3743", "stroke-width": 3 }, cmp);
    D.el("path", { d: "M 340 692 L 360 712 L 396 662", fill: "none", stroke: VERT, "stroke-width": 12, "stroke-linecap": "round", "stroke-linejoin": "round" }, cmp);
    D.etiquette(cmp, 416, 696, "sans à-coups", { "font-weight": 700, fill: VERT });
    /* k5 : une goutte de liquide devant l'aspiration, barrée */
    const goutte = D.el("g", { opacity: 0 }, dessus), [lx, ly] = V.P(352, 266); // dans le conduit, devant l'orifice : une nappe de liquide (bleue), et sa goutte
    const liq = D.liquide(goutte, { x0: lx, x1: lx + 100, yh: ly - 20, yb: ly + 20, niveau: () => 0.62, couleur: () => "#2f6fb8", pas: 10 });
    const dr = D.el("path", { d: "M 0 -20 Q 14 4 0 12 Q -14 4 0 -20 Z", fill: "#8fc3f0", stroke: D.BLEU, "stroke-width": 2.5 }, goutte);
    D.el("line", { x1: lx - 6, y1: ly - 42, x2: lx + 106, y2: ly + 48, stroke: ROUGE, "stroke-width": 10, "stroke-linecap": "round" }, goutte);
    D.el("line", { x1: lx + 106, y1: ly - 42, x2: lx - 6, y2: ly + 48, stroke: ROUGE, "stroke-width": 10, "stroke-linecap": "round" }, goutte);
    const pPression = D.pastille(dessus, 492, 742, "pression ↑ · température ↑", D.ORANGE, 32, "middle");
    const pJamais = D.pastille(dessus, 492, 742, "jamais de liquide", ROUGE, 32, "middle");
    const eAlv = etiq(dessus, 300, 668, "mon alvéole", { ancre: "middle", coul: D.ORANGE, gras: true, trait: [300, 636, 725, 574], coulTrait: D.ORANGE });
    const eMur = etiq(dessus, 960, 668, "paroi de refoulement fermée", { ancre: "end", taille: 30, trait: [926, 636, 926, 572] });
    /* l'alvéole est déjà fermée, son avant touche la paroi de bout (phi 1,67) ; son arrière avance à vitesse constante : elle se raccourcit (355 → 42 px) */
    const phi = t => 1.67 + 0.093 * (t - 1.2);
    return function (t) {
      const ph = phi(t), cc = V.centre(ph, 0, KALV);
      V.majLobes(ph);
      pO.maj(ph, 0, 1, 1);
      /* l'héroïne : serrée de plus en plus, de plus en plus chaude */
      const temp = D.courbe([[T[2], 0.2], [E[2], 0.55]], t, true);
      const humeur = t > A(2, 0.65) ? "chaud" : "sourire";
      const ec = D.courbe([[T[0], 0], [E[1], 0.6]], t, true);
      const [x, y] = V.P(cc.x, YM);
      const s = D.borne(cc.l / 110, 0.4, 1) * 0.82 + 0.02;
      mila({ x: x, y: y, s: s, t: t, temp: temp, etat: "vapeur", humeur: humeur, regard: [1, 0], ecrase: ec, op: 1 });
      m0(t, V, ph, 0, KALV, temp, 1, 6);
      /* k3 : d'autres alvéoles se remplissent derrière (à gauche), en continu */
      const a1 = D.lisse((t - T[3]) / 1.2), a2 = D.lisse((t - A(3, 0.4)) / 1.2);
      p1.maj(ph, -1, a1, 1); p2.maj(ph, -2, a2, 1);
      m1(t, V, ph, -1, 1, 0.2, a1, 5); m2(t, V, ph, -2, 1, 0.2, a2, 5);
      flux.forEach((m, i) => {
        const f = D.frac(t * 0.45 + m.ph), [qx, qy] = V.P(m.x, D.lerp(246, 336, f));
        m.maj(qx - 11, qy - 11, 0.2, true, a1 * D.fenetre(f, 0, 1, 0.2));
      });
      /* k4 : le piston (barré) et la vis (cochée) */
      fen(cmp, t, T[4] + 0.2, E[4] + 0.6, 0.5);
      const yp = 650 + 24 * (0.5 - 0.5 * Math.cos(t * 5));
      piston.setAttribute("y", f1(yp)); tige.setAttribute("y1", f1(yp + 22));
      BAN.forEach((e, i) => {
        const ph2 = D.frac(t * 0.5 + i / 5) , x0 = 190 + ph2 * 130 - 40;
        e.setAttribute("points", pts([[x0, 646], [x0 + 18, 646], [x0 + 30, 683], [x0 + 12, 683]]) + " " + pts([[x0 + 12, 683], [x0 + 30, 683], [x0 + 18, 720], [x0, 720]]));
      });
      /* k5 : la goutte de liquide, barrée */
      fen(goutte, t, T[5] + 0.2, E[5] + 0.4, 0.5);
      liq.maj(t);
      dr.setAttribute("transform", "translate(" + f1(lx + 50) + " " + f1(ly - 6 + 6 * Math.sin(t * 3)) + ") scale(0.8)");
      /* pastilles et étiquette */
      fen(pPression, t, T[2] + 0.2, E[2] + 0.5, 0.4); fen(pJamais, t, T[5] + 0.3, E[5] + 0.4, 0.4);
      fen(eAlv.g, t, T[0] + 0.3, E[1] + 0.2, 0.4); eAlv.mv(V.P(cc.x, 512)[0], 574); fen(eMur.g, t, T[0] + 0.5, E[1] + 0.2, 0.4);
      return { temp: temp, etat: "vapeur", humeur: humeur };
    };
  };
})();

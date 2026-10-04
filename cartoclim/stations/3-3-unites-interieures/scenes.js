/* CartoClim 3.3 — scènes du choix de l'unité intérieure.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : une même pièce en coupe, quatre unités tour à
   tour (murale, console, cassette, gainable). À chaque pas : où l'unité se pose, par où l'air entre et sort,
   par où l'eau s'en va — et l'AIR circule (journée « Animer les réseaux », 04/10/2026, sur le modèle du
   pilote 3.2). Temps 5 : le récapitulatif des quatre visages, une carte par unité.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air : des chevrons qui avancent, couleurs de la légende (bleu foncé = air repris de la pièce, bleu =
     air refroidi, rouge = air chauffé) ; la turbine du gainable tourne ;
   · l'eau des condensats : un tuyau plein, des reflets qui filent jusqu'à dehors — sauf pour la console, qui chauffe
     (air rouge) : en chauffage il n'y a pas de condensats, son tuyau d'évacuation reste dessiné, mais à sec.
   Les quatre unités sont dessinées une seule fois ; chaque pas montre celle dont il parle.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à pas
   marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — chevron, filigrane R9, liquide. Aucun texte sur
   un tracé, ni sur le trajet d'un chevron : vérifié par outils/controler-station-navigateur.mjs. Étiquettes
   en taille 16 dans 750 : au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* une pointe de flèche d'une taille fixe, quelle que soit l'épaisseur du trait */
  const pointe = (id, couleur) =>
    `<marker id="${id}" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto"><path d="M0 1 L14 8 L0 15 z" fill="${couleur}"/></marker>`;
  const fleche = (trace, couleur, mk, ep = 4) =>
    `<path d="${trace}" fill="none" stroke="${couleur}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${mk})"/>`;
  const txt = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" text-anchor="${o.ancre || 'middle'}" font-size="${o.taille || 14}" font-weight="${o.gras ? 700 : 400}" fill="${o.couleur || C.gris}">${t}</text>`;

  /* ---------- la circulation : un trajet (ligne brisée) et ce qui avance dessus (briques du pilote 3.2) ---------- */
  function trajet(pts) {
    const seg = []; let L = 0;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], l = Math.hypot(x1 - x0, y1 - y0);
      seg.push({ x0, y0, x1, y1, l, s: L }); L += l;
    }
    const a = s => {
      const g = seg.find(k => s <= k.s + k.l) || seg[seg.length - 1], f = g.l ? (s - g.s) / g.l : 0;
      return [g.x0 + (g.x1 - g.x0) * f, g.y0 + (g.y1 - g.y0) * f, Math.atan2(g.y1 - g.y0, g.x1 - g.x0) * 180 / Math.PI];
    };
    return { pts, L, a, d: 'M ' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') };
  }
  /* une courbe de Bézier cubique, en ligne brisée : le jet d'air prend la forme qu'avait sa flèche */
  const bezier = (p0, p1, p2, p3, n = 16) => Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [0, 1].map(k => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]);
  });
  /* n repères régulièrement espacés qui avancent à v unités par seconde ; poser(repère, x, y, angle, f) */
  function filer(parent, tr, n, v, creer, poser) {
    const D = window.VOYAGE_DESSIN, rep = Array.from({ length: n }, (_, i) => creer(parent, i));
    return t => rep.forEach((e, i) => {
      const f = D.frac(i / n + t * v / tr.L), [x, y, ang] = tr.a(f * tr.L);
      poser(e, x, y, ang, f);
    });
  }

  /* ------------------------------------------------------------------ temps 2 */
  function lesQuatreVisages() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 750 470',
      'Une pièce en coupe, avec dehors à gauche. Quatre unités intérieures se succèdent : la murale en haut du mur, la console au sol, la cassette dans le plafond, le gainable caché dans le faux plafond. Pour chacune : le trajet de l’air et le trajet de l’eau des condensats. Les chevrons qui avancent montrent le sens de l’air.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const nav = C.navy, bp = C.froid, hp = C.chaud, CREUX = '#f4f8fc';
    const anime = [[], [], [], []];                          /* ce que chaque image fait avancer, unité par unité */
    let actif = 0, tc = 1.6;

    D.defs(d);
    D.el('rect', { x: 10, y: 10, width: 730, height: 450, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[176, 131], [375, 242], [574, 354]], 188).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    const T = (g, x, y, s, o) => D.texte(g, x, y, s, Object.assign({ 'font-size': 16, fill: C.gris, 'text-anchor': 'middle' }, o || {}));
    const G = { 'font-weight': 700 }, DEB = { 'text-anchor': 'start' }, FIN = { 'text-anchor': 'end' };

    /* le décor commun : dehors, les murs, le plafond, le sol */
    D.el('rect', { x: 30, y: 44, width: 100, height: 376, rx: 8, fill: C.creme, stroke: 'none' }, d);
    T(d, 80, 300, 'dehors', G);
    D.el('rect', { x: 150, y: 44, width: 550, height: 86, fill: C.creme, stroke: 'none' }, d);
    D.el('rect', { x: 130, y: 44, width: 20, height: 376, fill: C.gris, 'fill-opacity': 0.35, stroke: 'none' }, d);
    D.el('rect', { x: 700, y: 44, width: 20, height: 376, fill: C.gris, 'fill-opacity': 0.35, stroke: 'none' }, d);
    D.el('line', { x1: 150, y1: 130, x2: 700, y2: 130, stroke: nav, 'stroke-width': 4 }, d);
    D.el('line', { x1: 150, y1: 400, x2: 700, y2: 400, stroke: nav, 'stroke-width': 4 }, d);
    T(d, 650, 388, 'la pièce', G);

    /* l'air : des chevrons qui avancent sur un trajet, d'une couleur ; k = l'unité à laquelle ils appartiennent */
    const air = (g, k, pts, coul, o = {}) => {
      const tr = trajet(pts), e = o.echelle || 0.5, fondu = (o.fondu || 14) / tr.L;
      const sc = D.el('g', { transform: 'scale(' + e + ')' }, g);   /* D.chevron se place dans un groupe réduit */
      anime[k].push(filer(sc, tr, Math.max(2, Math.round(tr.L / (o.pas || 40))), o.v || 70, p => D.chevron(p),
        (ch, x, y, ang, f) => ch(x / e, y / e, ang - 90, coul, D.fenetre(f, 0, 1, fondu))));
    };
    /* le tuyau des condensats : un tube plein d'eau (vert-bleu de la légende), des reflets qui filent ; sec : à sec, rien ne coule */
    const drain = (g, k, pts, int, sec) => {
      const tr = trajet(pts), t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
      D.el('path', Object.assign({ stroke: C.gris, 'stroke-width': int + 6 }, t), g);
      D.el('path', Object.assign({ stroke: CREUX, 'stroke-width': int }, t), g);
      if (sec) return;
      D.el('path', Object.assign({ stroke: C.eau, 'stroke-width': int, opacity: 0.9 }, t), g);
      const reflet = D.el('path', Object.assign({ stroke: C.papier, 'stroke-width': 1.8, 'stroke-dasharray': '10 24', opacity: 0.85 }, t), g);
      anime[k].push(t2 => reflet.setAttribute('stroke-dashoffset', (-(t2 * 26) % 34).toFixed(1)));
    };
    /* une turbine : la roue tourne, le cercle reste */
    const turbine = (g, k, x, y, r) => {
      const c = D.el('g', { transform: 'translate(' + x + ' ' + y + ')' }, g);
      D.el('circle', { r, fill: C.papier, stroke: nav, 'stroke-width': 3 }, c);
      const roue = D.el('g', {}, c);
      for (let i = 0; i < 16; i++) D.el('path', { d: 'M ' + r * 0.56 + ' 0 Q ' + r * 0.8 + ' ' + (-r * 0.02) + ' ' + r * 0.88 + ' ' + (-r * 0.26),
        fill: 'none', stroke: nav, 'stroke-width': 2.4, 'stroke-linecap': 'round', transform: 'rotate(' + i * 22.5 + ')' }, roue);
      D.el('circle', { r: r * 0.5, fill: 'none', stroke: nav, 'stroke-width': 1.5, opacity: 0.5 }, c);
      anime[k].push(t2 => roue.setAttribute('transform', 'rotate(' + ((t2 * 320) % 360).toFixed(1) + ')'));
    };
    const boite = (g, x, y, l, h, r, ep) => D.el('rect', { x, y, width: l, height: h, rx: r, fill: C.papier, stroke: nav, 'stroke-width': ep }, g);

    /* 1 · la murale : haut du mur, jet vers le bas, tuyau en pente à travers le mur */
    const murale = (g, k) => {
      air(g, k, [[470, 162], [330, 164]], nav);                                        /* l'air repris */
      [bezier([204, 206], [204, 264], [226, 332], [290, 378]), bezier([250, 206], [280, 264], [376, 332], [470, 374]),
        bezier([300, 206], [360, 246], [500, 298], [640, 354])].forEach(p => air(g, k, p, bp));   /* le jet, qui descend */
      drain(g, k, [[178, 196], [178, 214], [78, 238]], 5);
      boite(g, 152, 146, 182, 52, 12, 5);
      D.el('path', { d: 'M174 186 h138', fill: 'none', stroke: C.gris, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
      T(g, 243, 172, 'murale', { 'font-size': 18, fill: nav, 'font-weight': 700 });
      T(g, 392, 206, 'air repris', { fill: nav });
      T(g, 470, 258, 'air frais soufflé', Object.assign({ fill: bp }, G, DEB));
      T(g, 80, 270, 'condensats', Object.assign({ fill: C.eau }, G));
    };

    /* 2 · la console : au sol, jet vers le haut, l'air chaud monte — elle chauffe, donc pas de condensats : tuyau à sec */
    const console_ = (g, k) => {
      air(g, k, [[420, 372], [290, 372]], nav);
      [bezier([196, 306], [196, 236], [210, 186], [262, 152]), bezier([236, 306], [236, 242], [290, 192], [420, 154]),
        bezier([272, 306], [292, 272], [420, 232], [556, 194])].forEach(p => air(g, k, p, hp));
      drain(g, k, [[158, 372], [120, 378], [72, 390]], 5, true);
      boite(g, 154, 312, 130, 80, 10, 5);
      D.el('path', { d: 'M176 324 h86', fill: 'none', stroke: C.gris, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
      T(g, 219, 362, 'console', { 'font-size': 18, fill: nav, 'font-weight': 700 });
      T(g, 352, 346, 'air repris', { fill: nav });
      T(g, 692, 222, 'air chaud', Object.assign({ fill: hp }, G, FIN));
      T(g, 692, 249, 'plus léger : il monte', FIN);
      T(g, 80, 352, 'condensats');
    };

    /* 3 · la cassette : dans le plafond, quatre côtés, pompe intégrée */
    const cassette = (g, k) => {
      T(g, 160, 112, 'faux plafond', Object.assign({}, G, DEB));
      [384, 432].forEach(x => air(g, k, [[x, 192], [x, 140]], nav, { pas: 30, v: 50 }));
      [bezier([318, 146], [268, 146], [200, 152], [170, 204]), bezier([318, 156], [256, 176], [226, 236], [214, 296]),
        bezier([492, 146], [542, 146], [610, 152], [640, 204]), bezier([492, 156], [554, 176], [584, 236], [596, 296])]
        .forEach(p => air(g, k, p, bp));
      /* la vue d'en dessous : la dalle carrée, et l'air qui part sur ses quatre côtés */
      [[[410, 238], [410, 206]], [[410, 326], [410, 356]], [[366, 282], [326, 282]], [[454, 282], [494, 282]]]
        .forEach(p => air(g, k, p, bp, { pas: 36, v: 45, fondu: 8 }));
      boite(g, 335, 62, 140, 60, 6, 5);
      boite(g, 325, 123, 160, 10, 3, 4);
      D.el('rect', { x: 372, y: 244, width: 76, height: 76, rx: 6, fill: C.papier, stroke: nav, 'stroke-width': 4 }, g);
      D.el('rect', { x: 392, y: 264, width: 36, height: 36, fill: C.creme, stroke: C.gris, 'stroke-width': 3 }, g);
      D.el('circle', { cx: 356, cy: 108, r: 9, fill: C.papier, stroke: C.eau, 'stroke-width': 3 }, g);
      drain(g, k, [[356, 99], [356, 52], [96, 62]], 5);
      T(g, 418, 90, 'cassette', { 'font-size': 18, fill: nav, 'font-weight': 700 });
      T(g, 372, 114, 'pompe', Object.assign({ fill: C.eau }, G, DEB));
      T(g, 448, 198, 'air repris', Object.assign({ fill: nav }, DEB));
      T(g, 410, 388, 'vue d’en dessous : quatre côtés', G);
      T(g, 80, 90, 'condensats', Object.assign({ fill: C.eau }, G));
    };

    /* 4 · le gainable : tout caché, une turbine qui pousse dans des gaines vers des bouches */
    const gainable = (g, k) => {
      T(g, 160, 66, 'faux plafond', Object.assign({}, G, DEB));
      D.el('rect', { x: 432, y: 78, width: 238, height: 24, rx: 4, fill: C.creme, stroke: nav, 'stroke-width': 4 }, g);
      [[490, 484], [620, 614]].forEach(([x, xg]) => D.el('rect', { x, y: 102, width: 30, height: 22, fill: C.creme, stroke: nav, 'stroke-width': 3 }, g));
      [300, 334].forEach(x => air(g, k, [[x, 192], [x, 140]], nav, { pas: 30, v: 50 }));
      air(g, k, [[440, 90], [635, 90], [635, 128]], bp, { echelle: 0.4, pas: 34 });   /* la gaine, puis la bouche */
      air(g, k, [[505, 92], [505, 128]], bp, { echelle: 0.4, pas: 34, fondu: 8 });
      [bezier([497, 146], [484, 190], [468, 232], [458, 276]), bezier([513, 146], [526, 190], [542, 232], [552, 276]),
        bezier([627, 146], [614, 190], [598, 232], [588, 276]), bezier([643, 146], [656, 190], [672, 232], [682, 276])]
        .forEach(p => air(g, k, p, bp));
      boite(g, 262, 56, 170, 62, 6, 5);
      D.el('path', { d: 'M276 118 V124 M358 118 V124', fill: 'none', stroke: nav, 'stroke-width': 3 }, g);
      boite(g, 272, 124, 90, 10, 3, 4);
      [484, 614].forEach(xg => boite(g, xg, 124, 42, 10, 3, 4));
      turbine(g, 3, 392, 87, 24);
      drain(g, k, [[262, 100], [200, 106], [72, 124]], 5);
      T(g, 277, 82, 'gainable', Object.assign({ 'font-size': 18, fill: nav }, G, DEB));
      T(g, 277, 106, 'turbine', DEB);
      T(g, 362, 176, 'air repris', Object.assign({ fill: nav }, DEB));
      T(g, 551, 66, 'gaine', Object.assign({ fill: nav }, G));
      T(g, 570, 318, 'bouches de soufflage', Object.assign({ fill: bp }, G));
      T(g, 80, 152, 'condensats', Object.assign({ fill: C.eau }, G));
    };

    const calques = [murale, console_, cassette, gainable].map((faire, k) => { const g = D.el('g', {}); faire(g, k); return g; });
    /* une image : tout avance selon t ; on ne fait avancer que l'unité montrée */
    const image = t => { tc = t; anime[actif].forEach(f => f(t)); };
    anime.forEach(liste => liste.forEach(f => f(tc)));      /* les quatre unités sont déjà en place */
    const montrer = k => {
      actif = k;
      calques.forEach((c, i) => { if (i === k) d.appendChild(c); else if (c.parentNode) d.removeChild(c); });
      image(tc);
    };
    if (!FIGE) {
      let vu = false;
      const boucle = now => {
        if (d.isConnected) { vu = true; image(now / 1000); }
        else if (vu) return;                               /* on a quitté le temps : la boucle s'arrête */
        requestAnimationFrame(boucle);
      };
      requestAnimationFrame(boucle);
    }

    const etapes = [
      { titre: 'La murale : en haut du mur',
        dire: 'Elle est fixée en haut du mur. Elle reprend l’air de la pièce par le dessus et le souffle vers le bas : l’air frais est plus lourd, il descend tout seul et se répand. L’eau du bac sort par un tuyau en pente, à travers le mur.' },
      { titre: 'La console : au sol, comme un radiateur',
        dire: 'Posée au sol contre le mur, elle souffle vers le haut. L’air chaud est plus léger : il monte le long du mur et brasse la pièce. C’est pourquoi on la choisit surtout pour chauffer. L’eau sort près du sol, à travers le mur.' },
      { titre: 'La cassette : dans le plafond, sur quatre côtés',
        dire: 'Le boîtier est caché au-dessus du faux plafond ; seule la dalle se voit. L’air est repris au centre et soufflé sur les quatre côtés : c’est le choix d’une grande pièce ou d’un bureau ouvert. L’eau est remontée par une petite pompe, presque toujours intégrée.' },
      { titre: 'Le gainable : caché, avec plusieurs bouches',
        dire: 'L’unité entière est cachée dans le faux plafond. Elle reprend l’air par une grille, le pousse dans des gaines, et il ressort par plusieurs bouches. Il faut de la place au-dessus du plafond, et des gaines calculées pour la pression que la turbine peut fournir.' }
    ].map((e, i) => ({ ...e, peindre: () => montrer(i) }));

    return pasAPas(d, etapes,
      'Bleu : air refroidi. Rouge : air chauffé. Bleu foncé : air repris de la pièce. Vert-bleu : eau des condensats, qui doit pouvoir sortir, en pente ou par une pompe (station 4.4).');
  }

  /* ------------------------------------------------------------------ temps 5 */
  /* Une carte par unité : un petit dessin de la pièce, puis quatre lignes (se pose, souffle, l'eau, pour quoi). */
  function recapitulatif() {
    const d = svg('0 0 820 378',
      'Récapitulatif : quatre cartes. Murale : haut du mur, souffle vers le bas, eau en pente, pour une pièce. Console : au sol, souffle vers le haut, eau en pente, pour chauffer surtout. Cassette : dans le plafond, souffle sur quatre côtés, pompe intégrée, pour une grande pièce. Gainable : dans le faux plafond, gaines et bouches, pente ou pompe, pour plusieurs bouches.');
    const nav = C.navy, bp = C.froid, hp = C.chaud;

    /* le mini-dessin de chaque unité, dans un cadre de 160 x 86 */
    const mini = {
      murale: `<rect x="10" y="27" width="50" height="14" rx="4" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
${fleche('M24 46 C 30 62 60 70 104 72', bp, 'r-bp', 3)}`,
      console: `<rect x="10" y="50" width="34" height="26" rx="4" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
${fleche('M24 46 C 26 36 44 30 92 29', hp, 'r-hp', 3)}`,
      cassette: `<rect x="58" y="6" width="44" height="14" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
<rect x="54" y="19" width="52" height="6" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
${fleche('M50 34 C 34 34 22 40 16 60', bp, 'r-bp', 3)}
${fleche('M110 34 C 126 34 138 40 144 60', bp, 'r-bp', 3)}`,
      gainable: `<rect x="12" y="5" width="40" height="13" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
<rect x="52" y="8" width="86" height="8" fill="${C.creme}" stroke="${nav}" stroke-width="3"/>
<rect x="72" y="19" width="16" height="6" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
<rect x="112" y="19" width="16" height="6" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
${fleche('M80 34 C 76 44 72 52 68 64', bp, 'r-bp', 3)}
${fleche('M120 34 C 124 44 128 52 132 64', bp, 'r-bp', 3)}`
    };

    const cartes = [
      { id: 'murale', titre: 'Murale', lignes: [['Se pose', 'haut du mur'], ['Souffle', 'vers le bas'], ['L’eau', 'pente'], ['Pour', 'une pièce']] },
      { id: 'console', titre: 'Console', lignes: [['Se pose', 'au sol'], ['Souffle', 'vers le haut'], ['L’eau', 'pente'], ['Pour', 'chauffer surtout']] },
      { id: 'cassette', titre: 'Cassette', lignes: [['Se pose', 'dans le plafond'], ['Souffle', 'quatre côtés'], ['L’eau', 'pompe intégrée'], ['Pour', 'grande pièce']] },
      { id: 'gainable', titre: 'Gainable', lignes: [['Se pose', 'faux plafond'], ['Souffle', 'gaines et bouches'], ['L’eau', 'pente ou pompe'], ['Pour', 'plusieurs bouches']] }
    ];

    d.innerHTML = `
<defs>${pointe('r-bp', bp)}${pointe('r-hp', hp)}</defs>
<rect x="10" y="10" width="800" height="358" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${cartes.map((c, i) => {
  const x = 26 + i * 196;
  return `<rect x="${x}" y="24" width="180" height="294" rx="12" fill="${C.creme}" stroke="${nav}" stroke-width="3"/>
<g transform="translate(${x + 10},34)">
  <rect x="0" y="0" width="160" height="86" rx="6" fill="${C.papier}" stroke="${C.trait}"/>
  <line x1="8" y1="22" x2="152" y2="22" stroke="${nav}" stroke-width="3"/>
  <line x1="8" y1="78" x2="152" y2="78" stroke="${nav}" stroke-width="3"/>
  ${mini[c.id]}
</g>
${txt(x + 90, 148, c.titre, { taille: 18, gras: true, couleur: nav })}
${c.lignes.map(([etiquette, valeur], k) => {
  const y = 174 + k * 36;
  return txt(x + 14, y, etiquette, { ancre: 'start', taille: 13 }) + txt(x + 14, y + 18, valeur, { ancre: 'start', taille: 15, gras: true, couleur: nav });
}).join('')}`;
}).join('')}
${txt(410, 350, 'Dedans, c’est la même machine : batterie, turbine, filtre, bac. Seules la place et la route de l’air changent.', { taille: 14 })}`;
    return d;
  }

  return { lesQuatreVisages, recapitulatif };
})();

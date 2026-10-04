/* CartoClim 3.1 — scènes du monobloc.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : (A) le mobile en coupe, dans sa pièce, en quatre
   pas — l'air de la pièce refroidi, l'air du condenseur poussé dehors par la gaine, l'air chaud qui rentre, le
   bac ; l'AIR et le FLUIDE y circulent (« Animer les réseaux », 04/10/2026, sur le modèle de la 3.2) ;
   (B) les trois monoblocs côte à côte (mobile, fenêtre, mural à deux trous). Temps 5 : le tableau qui les compare.
   Croix du frigoriste (charte R6) : détendeur à gauche, compresseur à droite, condenseur en haut,
   évaporateur en bas. Le condenseur est alimenté par le haut, le liquide sort en bas.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air : des chevrons qui avancent, couleur = température (pièce tiède → soufflé froid ; air de la pièce
     → rejeté chaud par la gaine ; air chaud du dehors qui entre par la porte) ; les deux ventilateurs tournent ;
   · le fluide : LIQUIDE = tube plein, des reflets qui filent ; VAPEUR = petites molécules séparées ;
     dans l'évaporateur le liquide bout (bulles), dans le condenseur la vapeur se condense (gouttes) ;
     l'eau des condensats tombe dans le bac (nappe qui ondule) ;
   · le pas à pas allume la partie qui agit ; le reste continue de tourner, en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — couleur de température, hélice, chevron,
   nappe, gouttes, métal, filigrane R9. Aucun texte sur un tracé, ni sur le trajet d'un chevron ou d'une
   molécule : vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 1 000 :
   au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;

  /* Têtes de flèche de taille fixe (14 px), une par couleur ; p = préfixe propre à chaque dessin. */
  const tetes = p => `<defs>${[['bp', C.froid], ['hp', C.chaud], ['air', C.navy], ['ora', C.orange], ['eau', C.eau]]
    .map(([n, c]) => `<marker id="${p}-${n}" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${c}"/></marker>`).join('')}</defs>`;
  /* une flèche par sous-tracé : marker-end ne coiffe que le dernier bout d'un tracé composé */
  const fleche = (p, n, c, d, l = 4) => d.split(/(?=M)/).map(x => `<path d="${x.trim()}" fill="none" stroke="${c}" stroke-width="${l}" marker-end="url(#${p}-${n})"/>`).join('');
  const T = (x, y, txt, c = C.navy, t = 13, ancre = 'start') =>
    `<text x="${x}" y="${y}" text-anchor="${ancre}" font-size="${t}" font-weight="700" fill="${c}">${txt}</text>`;

  /* ------------------------------------------------------------------ la circulation : un trajet (ligne brisée) et ce qui avance dessus */
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
  /* un coude de serpentin : demi-cercle de (x, ya) à (x, yb), bombé à droite (+1) ou à gauche (-1) */
  function coude(x, ya, yb, sens) {
    const r = Math.abs(yb - ya) / 2, cy = (ya + yb) / 2, v = yb > ya ? 1 : -1, p = [];
    for (let i = 1; i < 10; i++) { const th = -Math.PI / 2 + Math.PI * i / 10; p.push([x + sens * r * Math.cos(th), cy + v * r * Math.sin(th)]); }
    return p;
  }
  /* un virage : l'arc de cercle de centre (cx, cy) et de rayon r, de l'angle a0 à l'angle a1 (en degrés) */
  function virage(cx, cy, r, a0, a1) {
    const p = [];
    for (let i = 1; i < 8; i++) { const a = (a0 + (a1 - a0) * i / 8) * Math.PI / 180; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return p;
  }
  /* un trajet coupé à la fraction f de sa longueur : [l'amont, l'aval] */
  function couper(tr, f) {
    const [x, y] = tr.a(tr.L * f), amont = [tr.pts[0]];
    let cumul = 0;
    for (let i = 1; i < tr.pts.length; i++) {
      cumul += Math.hypot(tr.pts[i][0] - tr.pts[i - 1][0], tr.pts[i][1] - tr.pts[i - 1][1]);
      if (cumul >= tr.L * f) return [trajet(amont.concat([[x, y]])), trajet([[x, y]].concat(tr.pts.slice(i)))];
      amont.push(tr.pts[i]);
    }
    return [tr, tr];
  }
  /* n repères régulièrement espacés qui avancent à v unités par seconde ; poser(repère, x, y, angle, f) */
  function filer(parent, tr, n, v, creer, poser) {
    const D = window.VOYAGE_DESSIN, rep = Array.from({ length: n }, (_, i) => creer(parent, i));
    return t => rep.forEach((e, i) => {
      const f = D.frac(i / n + t * v / tr.L), [x, y, ang] = tr.a(f * tr.L);
      poser(e, x, y, ang, f);
    });
  }

  /* ------------------------------------------------------------------ (A) le mobile en coupe, quatre pas */
  function trajetDeLAir() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 620',
      'Un climatiseur mobile en coupe, en marche, dans une pièce. Tout le circuit est dans le boîtier : condenseur en haut, évaporateur en bas, détendeur à gauche, compresseur à droite. L’air de la pièce traverse l’évaporateur et ressort froid ; un autre courant d’air de la pièce traverse le condenseur, s’échauffe et part dehors par une gaine à la fenêtre ; de l’air chaud du dehors rentre par la porte ; un bac recueille l’eau.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc', EAU = '#4f9fc0';
    const couche = c => D.el('g', { 'data-c': c }, d);     /* une partie du dessin, que le pas à pas allume */
    const anime = [];                                      /* ce que chaque image fait avancer */

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 608, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 178], [500, 330], [765, 482]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    /* la pièce : mur de gauche et sa porte, mur de droite et sa fenêtre, sol */
    const SOL = 570;
    D.el('rect', { x: 28, y: 30, width: 16, height: 240, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    const porte = D.el('rect', { x: 28, y: 270, width: 16, height: SOL - 270, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 850, y: 30, width: 40, height: 92, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 850, y: 258, width: 40, height: SOL - 258, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('line', { x1: 20, y1: SOL, x2: 980, y2: SOL, stroke: C.gris, 'stroke-width': 4 }, d);

    /* le boîtier : tout le circuit dedans */
    D.el('rect', { x: 240, y: 100, width: 500, height: 452, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    [290, 690].forEach(x => D.el('circle', { cx: x, cy: SOL - 9, r: 9, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, d));

    /* les ailettes des deux batteries, derrière l'air et les tubes */
    const ailettes = (c, x0, y1, y2) => {
      const g = couche(c);
      for (let i = 0; i < 12; i++) D.el('line', { x1: x0 + i * 18, y1, x2: x0 + i * 18, y2, stroke: C.trait, 'stroke-width': 2 }, g);
    };
    ailettes('cond', 338, 135, 245);
    ailettes('evap', 338, 358, 468);

    /* les deux ventilateurs : celui du condenseur (en haut) et celui de l'évaporateur (en bas) */
    const helice = D.ventilateur(couche('helice'), 612, 190, 34);
    const turbine = (() => {
      const g = D.el('g', { transform: 'translate(612 413)' }, couche('turbine')), r = 34;
      D.el('circle', { r, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
      const roue = D.el('g', {}, g);
      for (let i = 0; i < 16; i++) D.el('path', { d: 'M ' + r * 0.56 + ' 0 Q ' + r * 0.8 + ' ' + (-r * 0.02) + ' ' + r * 0.88 + ' ' + (-r * 0.26),
        fill: 'none', stroke: C.navy, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + i * 22.5 + ')' }, roue);
      D.el('circle', { r: r * 0.5, fill: 'none', stroke: C.navy, 'stroke-width': 1.5, opacity: 0.5 }, g);
      return a => roue.setAttribute('transform', 'rotate(' + (a % 360).toFixed(1) + ')');
    })();

    /* la gaine : du boîtier jusque dehors, en traversant la fenêtre */
    let g = couche('gaine');
    const gaine = { d: 'M740 190 H925', fill: 'none', 'stroke-width': 64 };
    D.el('path', Object.assign({ stroke: C.navy, 'stroke-opacity': 0.14 }, gaine), g);
    D.el('path', Object.assign({ stroke: C.gris, 'stroke-opacity': 0.5, 'stroke-dasharray': '2 11' }, gaine), g);
    [158, 222].forEach(y => D.el('line', { x1: 740, y1: y, x2: 925, y2: y, stroke: C.gris, 'stroke-width': 2 }, g));

    /* l'air : des chevrons qui avancent ; leur couleur suit la température, qui change dans la batterie */
    const air = (c, tr, temp, v = 75) => {
      const k = 0.5, gc = D.el('g', { transform: 'scale(' + k + ')' }, couche(c));
      anime.push(filer(gc, tr, Math.max(2, Math.round(tr.L / 49)), v, p => D.chevron(p),
        (ch, x, y, ang, f) => ch(x / k, y / k, ang - 90, D.couleur(temp(f * tr.L)), D.fenetre(f, 0, 1, 0.06))));
    };
    const voie = (c, y, xa, xb, tEntree, tSortie) => air(c, trajet([[xa, y], [xb, y]]), s => {
      const x = xa + s;                                    /* la batterie va de x = 326 à x = 536 */
      return x < 326 ? tEntree : x > 536 ? tSortie : D.lerp(tEntree, tSortie, (x - 326) / 210);
    });
    [171, 209].forEach(y => voie('airCond', y, 60, 975, 0.58, 0.95));   /* l'air de la pièce s'échauffe, part dehors */
    [394, 432].forEach(y => voie('airInt', y, 60, 842, 0.58, 0.08));    /* l'air de la pièce se refroidit, revient */
    /* l'air chaud du dehors : il entre par la porte, monte et se mêle à l'air que le condenseur aspire */
    air('fuites', trajet([[50, 320], [150, 320], ...virage(150, 270, 50, 90, 0), [200, 270], [200, 234],
      ...virage(225, 234, 25, 180, 270), [225, 209], [236, 209]]), () => 0.86, 60);

    /* les tubes de cuivre, et ce qui coule dedans */
    const tube = (g, tr, ext, int) => {
      const t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
      D.el('path', Object.assign({ stroke: CUIVRE_BORD, 'stroke-width': ext }, t), g);
      D.el('path', Object.assign({ stroke: CUIVRE, 'stroke-width': ext - 3 }, t), g);
      D.el('path', Object.assign({ stroke: CREUX, 'stroke-width': int }, t), g);
    };
    /* liquide : le tube plein, des reflets qui filent dans le sens du fluide */
    const liquide = (g, tr, int, couleur, v) => {
      const t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round' };
      D.el('path', Object.assign({ stroke: couleur, 'stroke-width': int, opacity: 0.92 }, t), g);
      const reflet = D.el('path', Object.assign({ stroke: C.papier, 'stroke-width': Math.max(1.6, int * 0.28), 'stroke-dasharray': '12 30', opacity: 0.85 }, t), g);
      anime.push(t2 => reflet.setAttribute('stroke-dashoffset', (-(t2 * v) % 42).toFixed(1)));
    };
    /* vapeur : le creux à peine teinté, de petites molécules séparées ; gouttes(f) : où elles deviennent gouttes */
    const vapeur = (g, tr, int, temp, v, pas, gouttes) => {
      D.el('path', { d: tr.d, fill: 'none', stroke: D.couleur(temp, true), 'stroke-width': int, opacity: 0.25, 'stroke-linejoin': 'round' }, g);
      anime.push(filer(g, tr, Math.max(2, Math.round(tr.L / pas)), v,
        p => D.el('circle', { r: int * 0.3 }, p),
        (m, x, y, ang, f) => {
          const goutte = gouttes && f > gouttes;
          m.setAttribute('cx', x.toFixed(1)); m.setAttribute('cy', y.toFixed(1));
          m.setAttribute('fill', goutte ? D.couleur(0.62) : D.couleur(temp, true));
          m.setAttribute('stroke', goutte ? 'none' : C.navy); m.setAttribute('stroke-opacity', 0.5);
          m.setAttribute('r', (goutte ? int * 0.26 : int * 0.3).toFixed(1));
        }));
    };
    /* les bulles de l'ébullition : elles naissent, grossissent et filent avec le liquide */
    const bulles = (g, tr, int, v) => anime.push(filer(g, tr, Math.round(tr.L / 17), v,
      p => D.el('circle', { fill: C.papier, 'fill-opacity': 0.55, stroke: C.papier, 'stroke-width': 1.2 }, p),
      (b, x, y, ang, f) => { b.setAttribute('cx', x.toFixed(1)); b.setAttribute('cy', y.toFixed(1));
        b.setAttribute('r', (0.6 + int * 0.33 * f).toFixed(1)); b.setAttribute('opacity', D.borne(f * 1.6, 0, 1).toFixed(2)); }));

    /* le parcours, dans le sens du fluide (mode froid) : condenseur alimenté par le haut */
    const refoul = trajet([[692, 284], [692, 120], [546, 120], [546, 152]]);
    const cond = trajet([[546, 152], [326, 152], ...coude(326, 152, 190, -1), [326, 190], [546, 190], ...coude(546, 190, 228, 1), [546, 228], [326, 228]]);
    const liqHP = trajet([[326, 228], [274, 228], [274, 262]]);
    const liqBP = trajet([[274, 296], [274, 347], [326, 347], [326, 375]]);
    const evap = trajet([[326, 375], [546, 375], ...coude(546, 375, 413, 1), [546, 413], [326, 413], ...coude(326, 413, 451, -1), [326, 451], [546, 451]]);
    const gaz = trajet([[546, 451], [574, 451], [574, 474], [692, 474], [692, 336]]);

    g = couche('refoul'); tube(g, refoul, 16, 10); vapeur(g, refoul, 10, 0.95, 85, 20);
    g = couche('cond'); tube(g, cond, 14, 8);
    const [condV, condL] = couper(cond, 0.55);
    vapeur(g, condV, 8, 0.92, 55, 20, 0.55); liquide(g, condL, 8, D.couleur(0.62), 30);
    g = couche('liqHP'); tube(g, liqHP, 12, 6); liquide(g, liqHP, 6, D.couleur(0.62), 30);
    g = couche('liqBP'); tube(g, liqBP, 12, 6); liquide(g, liqBP, 6, D.couleur(0.08), 32);
    g = couche('evap'); tube(g, evap, 14, 8);
    const [evapL, evapV] = couper(evap, 0.55);
    liquide(g, evapL, 8, D.couleur(0.08), 30); bulles(g, evapL, 8, 30); vapeur(g, evapV, 8, 0.16, 55, 20);
    g = couche('gaz'); tube(g, gaz, 20, 14); vapeur(g, gaz, 14, 0.18, 60, 26);

    /* le compresseur et le détendeur */
    g = couche('compr');
    D.el('rect', { x: 656, y: 284, width: 72, height: 52, rx: 12, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, g);
    g = couche('detendeur');
    D.el('path', { d: 'M262 262 h24 l-12 17 z M262 296 h24 l-12 -17 z', fill: C.papier, stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);

    /* l'eau : les gouttes tombent de la batterie froide dans le bac */
    g = couche('bac');
    const eauBac = D.liquide(D.el('g', { transform: 'translate(0 504) scale(1 0.5) translate(0 -504)' }, g),
      { x0: 325, x1: 547, yh: 468, yb: 504, niveau: () => 0.5, couleur: () => EAU, pas: 16 });
    D.el('path', { d: 'M322 484 V506 H550 V484', fill: 'none', stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    const kG = 0.5, gouttes = D.bulles(D.el('g', { transform: 'scale(' + kG + ')' }, g), 7, 32, true);
    anime.push(t => { eauBac.maj(t); gouttes(t, q => [(345 + q * 190) / kG, 471 / kG, 496 / kG, 1, EAU]); });

    /* les étiquettes, par-dessus tout ; chacune a sa place libre */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700 });
      return t;
    };
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' };
    ecrire(60, 52, 'DANS LA PIÈCE', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(900, 52, 'DEHORS', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(490, 86, 'CLIMATISEUR MOBILE · tout dans un boîtier', null, null, { 'font-size': 22, 'font-weight': 700, 'text-anchor': 'middle' });
    ecrire(56, 146, 'air de la pièce', 'airCond', C.ambre);
    ecrire(56, 252, 'air chaud', 'fuites', C.orange);
    ecrire(56, 279, 'qui rentre', 'fuites', C.orange);
    ecrire(56, 366, 'air de la pièce', 'airInt', C.ambre);
    ecrire(56, 520, 'porte', 'fuites', C.orange);
    ecrire(450, 270, 'condenseur', 'cond', C.chaud, Object.assign({}, G, M));
    ecrire(612, 252, 'ventilateur', 'helice', C.navy, M);
    ecrire(292, 292, 'détendeur', 'detendeur', C.froid, G);
    ecrire(646, 316, 'compresseur', 'compr', C.chaud, Object.assign({}, G, F));
    ecrire(436, 340, 'évaporateur', 'evap', C.froid, Object.assign({}, G, M));
    ecrire(612, 366, 'ventilateur', 'turbine', C.navy, M);
    ecrire(436, 536, 'bac à condensats', 'bac', C.eau, M);
    ecrire(752, 146, 'gaine', 'gaine', C.chaud);
    ecrire(842, 252, 'fenêtre', null, null, Object.assign({ fill: C.gris }, F));
    ecrire(756, 470, 'air frais', 'airInt', C.froid);
    ecrire(756, 497, 'soufflé', 'airInt', C.froid);
    ecrire(900, 88, 'air chaud', 'airCond', C.chaud);
    ecrire(900, 115, 'rejeté', 'airCond', C.chaud);
    ecrire(900, 142, 'dehors', 'airCond', C.chaud);

    /* une image : tout avance selon t */
    const image = t => { helice(t * 260); turbine(t * 320); anime.forEach(f => f(t)); };
    image(1.6);
    if (!FIGE) {
      let vu = false;
      const boucle = now => {
        if (d.isConnected) { vu = true; image(now / 1000); }
        else if (vu) return;                               /* on a quitté le temps : la boucle s'arrête */
        requestAnimationFrame(boucle);
      };
      requestAnimationFrame(boucle);
    }

    /* le pas à pas : la partie qui agit s'allume, le reste tourne en retrait */
    const ALLUME = [
      ['airInt', 'turbine', 'evap'],
      ['airCond', 'helice', 'cond', 'refoul', 'gaine'],
      ['fuites', 'airCond', 'gaine'],
      ['airInt', 'evap', 'bac']
    ];
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : RETRAIT));
      etiquettes.forEach(e => { const oui = on.has(e.c); e.t.setAttribute('fill', oui ? e.coul : C.navy); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400); });
      porte.setAttribute('stroke', on.has('fuites') ? C.orange : C.navy);              /* la porte, quand l'air chaud y entre */
      porte.setAttribute('stroke-width', on.has('fuites') ? 5 : 3);
    };

    const etapes = [
      { titre: 'L’air de la pièce traverse l’évaporateur',
        dire: 'Un ventilateur, placé après la batterie, aspire l’air de la pièce à travers la batterie froide. Le fluide y bout et prend la chaleur de l’air. L’air ressort plus frais : le ventilateur le souffle dans la pièce.',
        peindre: () => allumer(0) },
      { titre: 'L’air du condenseur part dehors par la gaine',
        dire: 'Le condenseur rend sa chaleur à un autre courant d’air, qui ne se mélange jamais à celui de la pièce. Cet air se réchauffe : la gaine le pousse dehors, par la fenêtre.',
        peindre: () => allumer(1) },
      { titre: 'La pièce manque d’air : du chaud rentre',
        dire: 'L’air qui part par la gaine est de l’air de la pièce. Il est remplacé par de l’air du dehors, chaud, qui entre par la porte, les joints, la fenêtre entrouverte. Le mobile refroidit sans cesse un air qui revient.',
        peindre: () => allumer(2) },
      { titre: 'Et l’eau ? Le bac se remplit',
        dire: 'L’humidité de l’air se dépose sur la batterie froide et tombe dans le bac. Il faut le vider, ou prévoir un tuyau qui l’évacue.',
        peindre: () => allumer(3) }
    ];
    return pasAPas(d, etapes, 'Mobile à une seule gaine. Les modèles qui prennent aussi l’air du condenseur dehors, par une seconde gaine, n’aspirent plus l’air de la pièce : c’est le cas le plus favorable.');
  }

  /* ------------------------------------------------------------------ (B) les trois monoblocs, côte à côte */
  function troisMonoblocs() {
    const d = svg('0 0 820 330',
      'Trois monoblocs en coupe, chacun avec son mur : le mobile (gaine jusqu’à la fenêtre), le climatiseur de fenêtre (le boîtier traverse le mur, un côté dedans, un côté dehors), le monobloc mural (collé au mur, deux trous pour l’air du condenseur).');
    const f = (n, c, dd, l = 4) => fleche('b', n, c, dd, l);
    const base = `${tetes('b')}
<rect x="10" y="10" width="800" height="310" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${T(40, 36, 'DANS LA PIÈCE', C.navy, 14)}${T(700, 36, 'DEHORS', C.navy, 14)}
<line x1="20" y1="290" x2="800" y2="290" stroke="${C.gris}" stroke-width="4"/>`;
    const mur = (x, trous) => {            /* un mur plein de y=40 à y=290, percé aux intervalles donnés */
      let y = 40, s = '';
      trous.concat([[290, 290]]).forEach(([a, b]) => { if (a > y) s += `<rect x="${x}" y="${y}" width="40" height="${a - y}" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>`; y = b; });
      return s;
    };
    const zone = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" fill-opacity=".14" stroke="none"/>`;
    const gaine = (dd, large) => `<path d="${dd}" fill="none" stroke="${C.navy}" stroke-opacity=".14" stroke-width="${large}"/>
<path d="${dd}" fill="none" stroke="${C.gris}" stroke-width="${large}" stroke-dasharray="2 9"/>`;

    const CORPS = {
      mobile: () => `${mur(520, [[80, 180]])}
<rect x="230" y="100" width="150" height="190" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${zone(233, 103, 144, 90, C.chaud)}${zone(233, 196, 144, 91, C.froid)}
<line x1="230" y1="196" x2="380" y2="196" stroke="${C.navy}" stroke-width="2"/>
${T(305, 152, 'condenseur', C.navy, 12, 'middle')}${T(305, 248, 'évaporateur', C.navy, 12, 'middle')}
${gaine('M380 130 H640', 22)}
${T(420, 108, 'gaine', C.gris)}
${f('hp', C.chaud, 'M376 130 H704', 5)}
${T(580, 106, 'air chaud', C.chaud)}${T(580, 172, 'fenêtre entrouverte', C.gris)}
${f('ora', C.orange, 'M70 130 H222')}${T(70, 112, 'air chaud qui rentre', C.orange)}
${f('bp', C.froid, 'M376 244 H492')}${T(400, 270, 'air frais', C.froid)}`,

      fenetre: () => `${mur(470, [[110, 220]])}
<rect x="370" y="118" width="240" height="94" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${zone(373, 121, 97, 88, C.froid)}${zone(510, 121, 97, 88, C.chaud)}
<line x1="470" y1="118" x2="470" y2="212" stroke="${C.navy}" stroke-width="2"/><line x1="510" y1="118" x2="510" y2="212" stroke="${C.navy}" stroke-width="2"/>
${T(421, 170, 'évaporateur', C.navy, 12, 'middle')}${T(558, 170, 'condenseur', C.navy, 12, 'middle')}
${f('air', C.navy, 'M250 150 H364', 3.5)}${T(230, 134, 'air de la pièce', C.navy)}
${f('bp', C.froid, 'M364 190 H250')}${T(250, 216, 'air frais', C.froid)}
${f('air', C.navy, 'M704 150 H616', 3.5)}${T(620, 134, 'air du dehors', C.navy)}
${f('hp', C.chaud, 'M616 190 H704')}${T(620, 216, 'air chaud', C.chaud)}
${T(400, 252, 'moitié dedans', C.gris, 13, 'middle')}${T(582, 252, 'moitié dehors', C.gris, 13, 'middle')}`,

      mural: () => `${mur(470, [[120, 150], [190, 220]])}
<rect x="270" y="96" width="200" height="140" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${zone(273, 99, 97, 134, C.froid)}${zone(370, 99, 97, 134, C.chaud)}
<line x1="370" y1="96" x2="370" y2="236" stroke="${C.navy}" stroke-width="2"/>
${T(321, 170, 'évaporateur', C.navy, 12, 'middle')}${T(419, 170, 'condenseur', C.navy, 12, 'middle')}
${f('air', C.navy, 'M150 135 H264', 3.5)}${T(150, 116, 'air de la pièce', C.navy)}
${f('bp', C.froid, 'M264 205 H150')}${T(150, 232, 'air frais', C.froid)}
${f('air', C.navy, 'M704 135 H420', 3.5)}${T(520, 116, 'air du dehors', C.navy)}
${f('hp', C.chaud, 'M420 205 H704', 5)}${T(520, 240, 'air chaud', C.chaud)}
${T(520, 174, 'deux trous', C.gris)}`
    };

    const liste = [
      { id: 'mobile', libelle: 'Le mobile',
        legende: 'Le mobile : posé dans la pièce, il envoie l’air chaud du condenseur dehors par une gaine. La pièce perd de l’air : l’air chaud du dehors rentre par les fuites.' },
      { id: 'fenetre', libelle: 'Le climatiseur de fenêtre',
        legende: 'Le climatiseur de fenêtre : le boîtier est engagé dans l’ouverture, un côté dans la pièce, un côté dehors. Pas de gaine, mais le compresseur et les ventilateurs sont dans le boîtier : le bruit de fonctionnement entre dans la pièce.' },
      { id: 'mural', libelle: 'Le monobloc mural',
        legende: 'Le monobloc mural : fixé au mur, à l’intérieur, sans unité dehors. Deux trous dans le mur : l’un laisse entrer l’air du condenseur, l’autre le rejette.' }
    ];
    const peindre = id => { d.innerHTML = base + CORPS[id](); };
    liste.forEach(x => { x.appliquer = () => peindre(x.id); });
    peindre('mobile');
    return etats(d, liste, 'mobile', liste[0].legende);
  }

  /* Le temps 2 : le pas à pas du mobile, puis les trois monoblocs comparés. */
  function scene() {
    const hote = document.createElement('div');
    hote.appendChild(trajetDeLAir());
    const t = document.createElement('p');
    t.className = 'legende'; t.style.fontWeight = '700'; t.style.color = C.navy; t.style.marginTop = '1.4rem';
    t.textContent = 'Les trois monoblocs, côte à côte : où part la chaleur ?';
    hote.appendChild(t);
    hote.appendChild(troisMonoblocs());
    return hote;
  }

  /* ------------------------------------------------------------------ temps 5 : le tableau qui les compare */
  function recapitulatif() {
    const d = svg('0 0 820 330', 'Tableau comparatif des trois monoblocs, mobile, fenêtre, mural à deux trous : où est le condenseur, par où sort l’air chaud, ce qu’on pose.');
    const colX = [196, 400, 604], cw = 196;
    const lignes = [
      ['Où est le', 'condenseur ?', [['dans le boîtier,', 'dans la pièce'], ['dans la moitié', 'qui est dehors'], ['dans le boîtier,', 'contre le mur']]],
      ['Par où sort', 'l’air chaud ?', [['par la gaine,', 'jusqu’à la fenêtre'], ['directement dehors,', 'sans gaine'], ['par l’un des deux', 'trous du mur']]],
      ['Qu’est-ce qu’on', 'pose ?', [['rien : on le branche,', 'on passe la gaine'], ['une ouverture dans', 'le mur ou la baie'], ['le boîtier au mur', 'et deux trous']]]
    ];
    let s = `<rect x="10" y="10" width="800" height="310" rx="16" fill="${C.papier}" stroke="${C.trait}"/>`;
    ['Mobile', 'Fenêtre', 'Mural, deux trous'].forEach((t, i) => {
      s += `<rect x="${colX[i]}" y="24" width="${cw}" height="40" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>${T(colX[i] + cw / 2, 50, t, C.navy, 16, 'middle')}`;
    });
    lignes.forEach(([a, b, cases], r) => {
      const y0 = 72 + r * 68;
      s += T(24, y0 + 26, a, C.navy, 14) + T(24, y0 + 46, b, C.navy, 14);
      cases.forEach(([l1, l2], i) => {
        s += `<rect x="${colX[i]}" y="${y0}" width="${cw}" height="60" rx="8" fill="${C.papier}" stroke="${C.trait}" stroke-width="2"/>`
          + `<text x="${colX[i] + cw / 2}" y="${y0 + 26}" text-anchor="middle" font-size="14" fill="${C.navy}">${l1}</text>`
          + `<text x="${colX[i] + cw / 2}" y="${y0 + 46}" text-anchor="middle" font-size="14" fill="${C.navy}">${l2}</text>`;
      });
    });
    s += `<rect x="196" y="278" width="604" height="34" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>`
      + T(498, 300, 'Tous trois : simples à poser, plus bruyants, moins efficaces qu’un split.', C.navy, 14, 'middle');
    d.innerHTML = s;
    return d;
  }

  return { scene, trajetDeLAir, recapitulatif };
})();

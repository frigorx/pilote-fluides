/* CartoClim 3.6 — scènes du roof-top.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : le caisson en coupe, en six pas — l'air repris,
   l'air neuf qui se mélange, les filtres, la batterie, le ventilateur, puis, à côté, le groupe frigorifique.
   Deux états commutables : mode froid (l'été) et mode chaud (l'hiver, appareil réversible) : les couleurs du
   fluide et de l'air s'inversent, le fluide change de sens, le dessin ne bouge pas.
   Croix du frigoriste (charte R6) : condenseur en haut (avec son hélice), détendeur à gauche, compresseur à droite,
   évaporateur en bas — ici la batterie du compartiment de l'air. Rouge = chaud, bleu = froid (charte).

   L'AIR et le FLUIDE circulent (journée « Animer les réseaux », 04/10/2026, sur le modèle du pilote 3.2). Tout se
   calcule à partir du temps t (requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air : des chevrons qui avancent, couleur = température (air de la salle tiède, air neuf chaud l'été et froid
     l'hiver, qui se mélangent, puis ressortent refroidis ou chauffés par la batterie) ; le ventilateur et l'hélice
     tournent ; dehors, l'air balaie la batterie du groupe et sort par l'hélice ;
   · le fluide : LIQUIDE = tube plein, des reflets qui filent ; VAPEUR = petites molécules séparées ; là où il bout
     (évaporateur) des bulles, là où il se condense (condenseur) des gouttes ; en mode chaud la vanne 4 voies
     croise ses voies et tout le circuit tourne à l'envers ;
   · le pas à pas allume la partie qui agit ; le reste continue de tourner, en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à pas marche.
   Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.
   Temps 5 : ce qu'on raccorde sur le toit.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — couleur de température, hélice, chevron, métal,
   filigrane R9. Aucun texte sur un tracé, ni sur le trajet d'un chevron ou d'une molécule : vérifié par
   outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 1 000 : au moins 18,7 px quand la scène
   est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;
  const ROUGE = C.chaud, BLEU = C.froid;

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
  /* un coude de serpentin : demi-cercle de (x, ya) à (x, yb), bombé à droite (+1) ou à gauche (-1) */
  function coude(x, ya, yb, sens) {
    const r = Math.abs(yb - ya) / 2, cy = (ya + yb) / 2, v = yb > ya ? 1 : -1, p = [];
    for (let i = 1; i < 10; i++) { const th = -Math.PI / 2 + Math.PI * i / 10; p.push([x + sens * r * Math.cos(th), cy + v * r * Math.sin(th)]); }
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

  function roofTopEnCoupe() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 540',
      'Un roof-top en coupe, posé sur le toit. À gauche, le compartiment de l’air : l’air repris de la salle et l’air neuf du dehors se mélangent, traversent les filtres, la batterie et le ventilateur, puis repartent dans la gaine de soufflage. À droite, le groupe frigorifique : le compresseur, le condenseur avec son hélice et le détendeur. L’air et le fluide circulent : les chevrons et les molécules qui avancent montrent leur sens.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc';
    let etape = 0, mode = 'froid', tc = 1.6;
    const froid = () => mode === 'froid';
    const anime = [];                                      /* ce que chaque image fait avancer, quel que soit le mode */
    const animeMode = { froid: [], chaud: [] };            /* et ce qui ne vaut que pour un mode */
    const couche = (c, parent) => D.el('g', { 'data-c': c }, parent === undefined ? d : parent);   /* une partie du dessin, que le pas à pas allume */

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 528, rx: 16, fill: C.papier, stroke: C.trait }, d);

    /* le caisson, ses deux compartiments ; le toit, avec ses deux ouvertures : reprise à gauche, soufflage à droite */
    D.el('rect', { x: 30, y: 78, width: 940, height: 318, rx: 10, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, au-dessus du fond du caisson, derrière le reste ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 150], [500, 279], [765, 407]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });
    D.el('path', { d: 'M600 78 V396', fill: 'none', stroke: C.navy, 'stroke-width': 2, 'stroke-dasharray': '10 7' }, d);
    D.el('path', { d: 'M30 404 H70 M130 404 H540 M600 404 H970', fill: 'none', stroke: C.gris, 'stroke-width': 10, 'stroke-dasharray': '26 10' }, d);
    D.el('path', { d: 'M70 404 V444 M130 404 V444 M540 404 V444 M600 404 V444', fill: 'none', stroke: C.navy, 'stroke-width': 3 }, d);

    /* 1 · le caisson de mélange et ses volets ; 2 · les filtres ; 3 · les ailettes de la batterie ; 4 · le ventilateur */
    let g = couche('melange');
    D.el('rect', { x: 50, y: 290, width: 170, height: 94, rx: 6, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('path', { d: 'M114 292 L150 304 M72 382 L108 370', fill: 'none', stroke: C.navy, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    g = couche('neuf');
    D.el('rect', { x: 100, y: 74, width: 80, height: 12, rx: 3, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    g = couche('filtres');
    D.el('rect', { x: 250, y: 290, width: 26, height: 94, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('path', { d: 'M250 296 l26 12 l-26 12 l26 12 l-26 12 l26 12 l-26 12 l26 12', fill: 'none', stroke: C.navy, 'stroke-width': 2 }, g);
    g = couche('batterie');
    D.el('rect', { x: 332, y: 290, width: 80, height: 94, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    for (let i = 0; i < 9; i++) D.el('line', { x1: 340 + i * 8.5, y1: 296, x2: 340 + i * 8.5, y2: 378, stroke: C.trait, 'stroke-width': 2 }, g);
    /* une roue de turbine : le cercle reste, la roue tourne */
    const roue = (parent, x, y, r) => {
      const c = D.el('g', { transform: 'translate(' + x + ' ' + y + ')' }, parent);
      D.el('circle', { r, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, c);
      const w = D.el('g', {}, c);
      for (let i = 0; i < 16; i++) D.el('path', { d: 'M ' + r * 0.56 + ' 0 Q ' + r * 0.8 + ' ' + (-r * 0.02) + ' ' + r * 0.88 + ' ' + (-r * 0.26),
        fill: 'none', stroke: C.navy, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + i * 22.5 + ')' }, w);
      D.el('circle', { r: r * 0.5, fill: 'none', stroke: C.navy, 'stroke-width': 1.5, opacity: 0.5 }, c);
      return a => w.setAttribute('transform', 'rotate(' + (a % 360).toFixed(1) + ')');
    };
    const ventilo = roue(couche('ventilateur'), 500, 337, 46);

    /* 5 · le groupe frigorifique : hélice, ailettes du condenseur, compresseur, vanne 4 voies, détendeur */
    g = couche('groupe');
    const helice = D.ventilateur(g, 780, 128, 34);
    D.el('rect', { x: 756, y: 194, width: 188, height: 66, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    for (let i = 0; i < 12; i++) D.el('line', { x1: 770 + i * 14, y1: 198, x2: 770 + i * 14, y2: 256, stroke: C.trait, 'stroke-width': 2 }, g);
    D.el('rect', { x: 850, y: 292, width: 90, height: 32, rx: 6, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('rect', { x: 860, y: 340, width: 80, height: 40, rx: 10, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('path', { d: 'M654 230 v32 l18 -16 z M690 230 v32 l-18 -16 z', fill: C.papier, stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);

    /* l'air : des chevrons qui avancent ; couleur(x, y) donne la couleur de l'air à l'endroit où il passe */
    const T_REPRISE = () => froid() ? 0.55 : 0.42;        /* la salle : tiède l'été, plus fraîche l'hiver */
    const T_NEUF = () => froid() ? 0.85 : 0.12;            /* le dehors : chaud l'été, froid l'hiver */
    const T_MELANGE = () => 0.7 * T_REPRISE() + 0.3 * T_NEUF();
    const T_SOUFFLE = () => froid() ? 0.08 : 0.92;         /* après la batterie : refroidi ou chauffé */
    const T_REJET = () => froid() ? 0.97 : 0.02;           /* dehors, après la batterie du groupe */
    const air = (c, pts, couleur, o = {}) => {
      const tr = trajet(pts), e = o.echelle || 0.5, fondu = (o.fondu || 16) / tr.L, sc = D.el('g', { transform: 'scale(' + e + ')' }, c);   /* D.chevron se place dans un groupe réduit */
      anime.push(filer(sc, tr, Math.max(2, Math.round(tr.L / (o.pas || 44))), o.v || 70, p => D.chevron(p),
        (ch, x, y, ang, f) => ch(x / e, y / e, ang - 90, couleur(x, y), D.fenetre(f, 0, 1, fondu))));
    };
    air(couche('reprise'), [[100, 456], [100, 386]], () => D.couleur(T_REPRISE()));
    air(couche('neuf'), [[140, 60], [140, 288]], () => D.couleur(T_NEUF()));
    air(couche('air'), [[226, 337], [436, 337]], x => D.couleur(x < 332 ? T_MELANGE() : x > 412 ? T_SOUFFLE() : D.lerp(T_MELANGE(), T_SOUFFLE(), (x - 332) / 80)));
    air(couche('soufflage'), [[552, 337], [572, 337], [572, 448]], () => D.couleur(T_SOUFFLE()));
    air(couche('rejet'), [[780, 258], [780, 66]], (x, y) => D.couleur(y > 260 ? (froid() ? 0.8 : 0.12) : y < 194 ? T_REJET() : D.lerp(froid() ? 0.8 : 0.12, T_REJET(), (260 - y) / 66)));

    /* les briques du fluide, pour un mode : tube de cuivre, liquide (tube plein à reflets), vapeur (molécules), bulles */
    const brique = liste => {
      const tube = (g, tr, ext, int) => {
        const t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
        D.el('path', Object.assign({ stroke: CUIVRE_BORD, 'stroke-width': ext }, t), g);
        D.el('path', Object.assign({ stroke: CUIVRE, 'stroke-width': ext - 3 }, t), g);
        D.el('path', Object.assign({ stroke: CREUX, 'stroke-width': int }, t), g);
      };
      const liquide = (g, tr, int, couleur, v) => {
        const t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round' };
        D.el('path', Object.assign({ stroke: couleur, 'stroke-width': int, opacity: 0.92 }, t), g);
        const reflet = D.el('path', Object.assign({ stroke: C.papier, 'stroke-width': Math.max(1.6, int * 0.28), 'stroke-dasharray': '12 30', opacity: 0.85 }, t), g);
        liste.push(t2 => reflet.setAttribute('stroke-dashoffset', (-(t2 * v) % 42).toFixed(1)));
      };
      const vapeur = (g, tr, int, temp, v, pas, gouttes) => {
        D.el('path', { d: tr.d, fill: 'none', stroke: D.couleur(temp, true), 'stroke-width': int, opacity: 0.25, 'stroke-linejoin': 'round' }, g);
        liste.push(filer(g, tr, Math.max(2, Math.round(tr.L / pas)), v,
          p => D.el('circle', { r: int * 0.3 }, p),
          (m, x, y, ang, f) => {
            const goutte = gouttes && f > gouttes;
            m.setAttribute('cx', x.toFixed(1)); m.setAttribute('cy', y.toFixed(1));
            m.setAttribute('fill', goutte ? D.couleur(0.62) : D.couleur(temp, true));
            m.setAttribute('stroke', goutte ? 'none' : C.navy); m.setAttribute('stroke-opacity', 0.5);
            m.setAttribute('r', (goutte ? int * 0.26 : int * 0.3).toFixed(1));
          }));
      };
      const bulles = (g, tr, int, v) => liste.push(filer(g, tr, Math.round(tr.L / 17), v,
        p => D.el('circle', { fill: C.papier, 'fill-opacity': 0.55, stroke: C.papier, 'stroke-width': 1.2 }, p),
        (b, x, y, ang, f) => { b.setAttribute('cx', x.toFixed(1)); b.setAttribute('cy', y.toFixed(1));
          b.setAttribute('r', (0.6 + int * 0.33 * f).toFixed(1)); b.setAttribute('opacity', D.borne(f * 1.6, 0, 1).toFixed(2)); }));
      return { tube, liquide, vapeur, bulles };
    };

    /* le circuit, pour un mode, dans le sens du fluide. Les deux batteries sont en serpentin ; la ligne du liquide
       (condenseur → détendeur → batterie de l'air) est droite ; la vanne 4 voies fait passer le fluide tout droit
       (froid) ou en croix (chaud). Le condenseur est alimenté par le haut, le liquide sort en bas. */
    const DEHORS = [[928, 210], [772, 210], ...coude(772, 210, 228, -1), [772, 228], [928, 228], ...coude(928, 228, 246, 1), [928, 246], [772, 246]];
    const BOBINE = [[345, 312], [400, 312], ...coude(400, 312, 337, 1), [400, 337], [345, 337], ...coude(345, 337, 362, -1), [345, 362], [400, 362]];
    const zone = D.el('g', {}, d);                         /* le circuit du mode choisi s'accroche ici */
    const circuits = {};
    ['froid', 'chaud'].forEach(m => {
      const f = m === 'froid', B = brique(animeMode[m]);
      const gB = couche('batterie', null), gG = couche('groupe', null);   /* détachés : on accroche le bon selon le mode */
      circuits[m] = [gB, gG];
      /* batterie du caisson : évaporateur l'été (le liquide bout), condenseur l'hiver (la vapeur se condense) */
      const bob = trajet(f ? BOBINE : BOBINE.slice().reverse()), [b1, b2] = couper(bob, 0.55);
      B.tube(gB, bob, 12, 7);
      if (f) { B.liquide(gB, b1, 7, D.couleur(0.08), 30); B.bulles(gB, b1, 7, 30); B.vapeur(gB, b2, 7, 0.16, 55, 20); }
      else { B.vapeur(gB, b1, 7, 0.92, 55, 20, 0.55); B.liquide(gB, b2, 7, D.couleur(0.62), 30); }
      /* batterie de dehors : condenseur l'été, évaporateur l'hiver */
      const deh = trajet(f ? DEHORS : DEHORS.slice().reverse()), [h1, h2] = couper(deh, 0.55);
      B.tube(gG, deh, 12, 7);
      if (f) { B.vapeur(gG, h1, 7, 0.92, 55, 20, 0.55); B.liquide(gG, h2, 7, D.couleur(0.62), 30); }
      else { B.liquide(gG, h1, 7, D.couleur(0.08), 30); B.bulles(gG, h1, 7, 30); B.vapeur(gG, h2, 7, 0.16, 55, 20); }
      /* les lignes : refoulement (vapeur chaude), liquide haute pression, liquide basse pression, gaz basse pression */
      const refoul = trajet(f ? [[918, 340], [918, 282], [956, 282], [956, 210], [928, 210]]
        : [[918, 340], [918, 324], [872, 292], [872, 272], [420, 272], [420, 362], [400, 362]]);
      const liqHP = trajet(f ? [[772, 246], [690, 246]] : [[345, 312], [345, 246], [654, 246]]);
      const liqBP = trajet(f ? [[654, 246], [345, 246], [345, 312]] : [[690, 246], [772, 246]]);
      const gaz = trajet(f ? [[400, 362], [420, 362], [420, 272], [872, 272], [872, 340]]
        : [[928, 210], [956, 210], [956, 282], [918, 282], [918, 292], [872, 324], [872, 340]]);
      [[refoul, 14, 8], [liqHP, 12, 6], [liqBP, 12, 6], [gaz, 16, 10]].forEach(([tr, ext, int]) => B.tube(gG, tr, ext, int));
      B.vapeur(gG, refoul, 8, 0.95, 85, 20);
      B.liquide(gG, liqHP, 6, D.couleur(0.62), 30);
      B.liquide(gG, liqBP, 6, D.couleur(0.08), 32);
      B.vapeur(gG, gaz, 10, 0.18, 60, 26);
    });

    /* les étiquettes, par-dessus tout ; chacune a sa place libre. c = la couche qui l'allume ('*' : toujours) */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, typeof s === 'function' ? s() : s, base);
      if (c) etiquettes.push({ t, s, c, coul, gras: base['font-weight'] === 700, base: base.fill });
      return t;
    };
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' }, GRIS = { fill: C.gris };
    const pDehors = () => froid() ? ROUGE : BLEU, pBatterie = () => froid() ? BLEU : ROUGE;
    ecrire(966, 36, () => froid() ? 'MODE FROID — l’été' : 'MODE CHAUD — l’hiver, appareil réversible', '*', pBatterie, Object.assign({}, G, F));
    ecrire(196, 64, 'air neuf, de dehors', 'neuf', C.ambre);
    ecrire(196, 108, 'TRAITEMENT DE L’AIR', null, null, G);
    ecrire(196, 138, 'comme une centrale de traitement d’air', null, null, GRIS);
    ecrire(620, 108, 'PRODUCTION', null, null, G);
    ecrire(620, 138, 'DE FROID', null, null, G);
    ecrire(160, 226, 'mélange', 'melange', C.orange);
    ecrire(272, 226, 'filtres', 'filtres', C.orange, M);
    ecrire(372, 226, 'batterie', 'batterie', pBatterie, Object.assign({}, M));
    ecrire(500, 226, 'ventilateur', 'ventilateur', C.orange, M);
    ecrire(24, 490, 'reprise de la salle', 'reprise', C.ambre);
    ecrire(570, 490, 'soufflage vers la salle', 'soufflage', pBatterie, M);
    ecrire(335, 470, 'la salle à climatiser', null, null, Object.assign({}, GRIS, M));
    ecrire(966, 432, 'le toit', null, null, Object.assign({}, GRIS, F));
    ecrire(956, 134, 'hélice', 'groupe', C.navy, F);
    ecrire(956, 176, () => froid() ? 'condenseur' : 'évaporateur', 'groupe', pDehors, Object.assign({}, G, F));
    ecrire(672, 214, 'détendeur', 'groupe', C.navy, M);
    ecrire(836, 314, 'vanne 4 voies', 'groupe', C.navy, F);
    ecrire(846, 368, 'compresseur', 'groupe', C.orange, F);
    ecrire(764, 68, () => froid() ? 'air chaud rejeté' : 'air froid rejeté', 'rejet', pDehors, Object.assign({}, G, F));
    /* la légende des couleurs */
    D.el('rect', { x: 720, y: 503, width: 22, height: 12, fill: ROUGE, stroke: 'none' }, d);
    ecrire(750, 515, 'chaud', null, null);
    D.el('rect', { x: 850, y: 503, width: 22, height: 12, fill: BLEU, stroke: 'none' }, d);
    ecrire(880, 515, 'froid', null, null);

    /* une image : tout avance selon t */
    const image = t => {
      tc = t; helice(t * 260); ventilo(t * 320);
      anime.forEach(f => f(t)); animeMode[mode].forEach(f => f(t));
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

    /* le pas à pas : la partie qui agit s'allume, le reste tourne en retrait */
    const ALLUME = [
      ['reprise'],
      ['reprise', 'neuf', 'melange', 'air'],
      ['filtres', 'air'],
      ['batterie', 'air'],
      ['ventilateur', 'soufflage'],
      ['groupe', 'rejet']
    ];
    const peindre = () => {
      Object.keys(circuits).forEach(m => circuits[m].forEach(c => {
        if (m === mode) { if (!c.parentNode) zone.appendChild(c); } else if (c.parentNode) c.parentNode.removeChild(c);
      }));
      const on = new Set(ALLUME[etape]); on.add('*');
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : RETRAIT));
      etiquettes.forEach(e => {
        const oui = on.has(e.c);
        if (typeof e.s === 'function') e.t.textContent = e.s();
        e.t.setAttribute('fill', oui ? (typeof e.coul === 'function' ? e.coul() : e.coul) : e.base);
        e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400);
      });
      image(tc);
    };

    const etapes = [
      { titre: 'L’air de la salle est repris',
        dire: 'Le ventilateur aspire l’air de la salle par la gaine de reprise. C’est un air déjà passé par les clients et les machines : tiède, chargé de poussière.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'L’air neuf se mélange',
        dire: 'Par une grille, de l’air du dehors entre dans le caisson de mélange. Des volets motorisés dosent la part d’air neuf et la part d’air repris. Le mélange repart vers les filtres.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Les filtres retiennent la poussière',
        dire: 'Le mélange traverse les filtres, avant la batterie, qu’ils gardent propre. Ce sont de grandes surfaces, et elles s’encrassent vite.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'La batterie refroidit ou chauffe l’air',
        get dire() { return mode === 'froid'
          ? 'Mode froid : le fluide est froid dans la batterie, il bout et prend la chaleur de l’air. L’air ressort plus frais.'
          : 'Mode chaud : la batterie est devenue le condenseur. Le fluide chaud y rend sa chaleur à l’air. L’air ressort plus chaud.'; },
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'Le ventilateur souffle dans les gaines',
        dire: 'Le ventilateur centrifuge pousse l’air traité vers le bas, dans la gaine de soufflage, jusqu’aux bouches de la salle.',
        peindre: () => { etape = 4; peindre(); } },
      { titre: 'À côté, le groupe frigorifique',
        get dire() { return mode === 'froid'
          ? 'Mode froid : le compresseur comprime le gaz sorti de la batterie. L’hélice balaie le condenseur et rejette dehors la chaleur prise à la salle. Le détendeur ramène le liquide à la batterie.'
          : 'Mode chaud : la vanne 4 voies a inversé le sens. Le compresseur envoie le gaz chaud dans la batterie. Dehors, la batterie est devenue évaporateur : elle prend de la chaleur à l’air extérieur, que l’hélice rejette plus froid.'; },
        peindre: () => { etape = 5; peindre(); } }
    ];

    const pas = pasAPas(d, etapes);
    /* changer de mode : on repeint la même étape, et on relit sa phrase (le clic sur le bouton d'étape fait les deux) */
    const rejouer = m => () => {
      mode = m;
      const b = pas.querySelector('button[data-etape][aria-pressed="true"]');
      if (b) b.click(); else peindre();
    };
    return etats(pas, [
      { id: 'froid', libelle: 'Mode froid (été)', appliquer: rejouer('froid'),
        legende: 'Mode froid : la batterie du caisson est l’évaporateur, le condenseur est dehors.' },
      { id: 'chaud', libelle: 'Mode chaud (hiver)', appliquer: rejouer('chaud'),
        legende: 'Mode chaud, appareil réversible : une vanne 4 voies inverse le sens du fluide (station 2.6). La batterie du caisson devient le condenseur, la batterie de dehors l’évaporateur.' }
    ], 'froid', 'Mode froid : la batterie du caisson est l’évaporateur, le condenseur est dehors.');
  }

  /* Temps 5 : ce qu'on raccorde sur le toit, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 320', 'Récapitulatif : le roof-top posé sur le toit, avec ses deux compartiments, l’air et le froid. Ce qu’on raccorde : la gaine de reprise et la gaine de soufflage sous l’appareil, l’alimentation électrique, le gaz ou l’eau chaude selon le modèle, et l’évacuation des condensats. Aucun tube frigorifique à tirer.');
    d.innerHTML = `
<defs>
  <marker id="r-n" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${C.navy}"/></marker>
  <marker id="r-e" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${C.eau}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="300" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<rect x="240" y="40" width="340" height="100" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<path d="M410 40 V140" fill="none" stroke="${C.navy}" stroke-width="2" stroke-dasharray="8 6"/>
<text x="325" y="66" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">L’AIR</text>
<text x="325" y="90" text-anchor="middle" font-size="14" fill="${C.gris}">mélange · filtres</text>
<text x="325" y="112" text-anchor="middle" font-size="14" fill="${C.gris}">batterie · ventilateur</text>
<text x="495" y="66" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">LE FROID</text>
<text x="495" y="90" text-anchor="middle" font-size="14" fill="${C.gris}">compresseur · détendeur</text>
<text x="495" y="112" text-anchor="middle" font-size="14" fill="${C.gris}">condenseur · hélice</text>

<path d="M40 160 H780" fill="none" stroke="${C.gris}" stroke-width="8" stroke-dasharray="22 8"/>
<text x="776" y="186" text-anchor="end" font-size="14" fill="${C.gris}">le toit</text>

<!-- les deux gaines sous l'appareil -->
<path d="M270 164 V236 M320 164 V236 M500 164 V236 M550 164 V236" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M295 230 V176" fill="none" stroke="${C.navy}" stroke-width="4" marker-end="url(#r-n)"/>
<path d="M525 176 V230" fill="none" stroke="${C.navy}" stroke-width="4" marker-end="url(#r-n)"/>
<text x="295" y="258" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">gaine de reprise</text>
<text x="525" y="258" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">gaine de soufflage</text>
<text x="410" y="206" text-anchor="middle" font-size="14" fill="${C.gris}">l’air de la salle</text>

<!-- l'électricité, à gauche -->
<path d="M60 90 H240" fill="none" stroke="${C.navy}" stroke-width="3" stroke-dasharray="7 5"/>
<text x="60" y="76" font-size="14" font-weight="700" fill="${C.navy}">alimentation électrique</text>
<text x="60" y="112" font-size="14" fill="${C.gris}">et son disjoncteur</text>

<!-- le gaz ou l'eau chaude, selon le modèle -->
<path d="M580 70 H720" fill="none" stroke="${C.gris}" stroke-width="3" stroke-dasharray="7 5"/>
<text x="586" y="58" font-size="14" font-weight="700" fill="${C.gris}">gaz (si brûleur)</text>
<path d="M580 105 H720" fill="none" stroke="${C.gris}" stroke-width="3" stroke-dasharray="7 5"/>
<text x="586" y="93" font-size="14" font-weight="700" fill="${C.gris}">eau chaude (si batterie)</text>

<!-- les condensats -->
<path d="M580 128 H640 V218" fill="none" stroke="${C.eau}" stroke-width="4" marker-end="url(#r-e)"/>
<text x="656" y="214" font-size="14" font-weight="700" fill="${C.eau}">condensats</text>
<text x="656" y="234" font-size="14" fill="${C.eau}">vers une évacuation</text>

<text x="410" y="292" text-anchor="middle" font-size="14" fill="${C.gris}">Le groupe froid est déjà dans le caisson : aucun tube frigorifique à tirer.</text>`;
    return d;
  }

  return { roofTopEnCoupe, recapitulatif };
})();

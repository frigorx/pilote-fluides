/* CartoClim 3.9 — scènes du groupe d'eau glacée et des ventilo-convecteurs.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : l'eau qui fait le tour du bâtiment, en six pas
   (le groupe refroidit l'eau, la pompe l'envoie, elle traverse la batterie, l'air passe dessus, elle revient, le
   groupe rejette la chaleur dehors), puis deux tubes / quatre tubes en deux états. Temps 5 : ce qu'on raccorde
   sur un ventilo-convecteur.
   Croix du frigoriste (charte R6) dans le groupe : détendeur à gauche, compresseur à droite, condenseur en haut
   (alimenté par le haut, le liquide sort en bas), évaporateur en bas.

   L'EAU, L'AIR et le FLUIDE circulent (journée « Animer les réseaux », 04/10/2026, sur le modèle du pilote 3.2).
   Tout se calcule à partir du temps t (requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'eau : un tuyau plein, des reflets qui filent dans le sens de l'eau ; couleur = température : bleu au départ
     (eau froide), bleu clair au retour (plus tiède) ; dans l'évaporateur elle passe du tiède au froid, à
     contre-courant du fluide (elle entre à droite et sort à gauche, le fluide va de gauche à droite), dans la
     batterie du froid au tiède ;
   · l'air : des chevrons qui avancent (tiède dans la pièce, plus frais après la batterie du ventilo-convecteur ;
     dehors, il sort chaud du condenseur) ; la turbine et l'hélice tournent ; l'eau de l'air goutte dans le bac ;
   · le fluide frigorigène, qui reste dans le groupe : LIQUIDE = tube plein, VAPEUR = petites molécules séparées ;
     il bout dans l'évaporateur (bulles), se condense dans le condenseur (gouttes) ;
   · le pas à pas allume la partie qui agit ; le reste continue de tourner, en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à pas marche.
   Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.
   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — couleur de température, hélice, chevron, nappe,
   gouttes, métal, filigrane R9. Aucun texte sur un tracé, ni sur le trajet d'un chevron ou d'une molécule : vérifié
   par outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 1 000 : au moins 18,7 px quand la
   scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;

  /* petite flèche pleine (polygone) posée sur un tuyau pour dire le sens de l'eau */
  const tri = (x, y, sens, c = C.navy) => {
    const p = { h: [[x, y - 7], [x + 7, y + 6], [x - 7, y + 6]], b: [[x, y + 7], [x + 7, y - 6], [x - 7, y - 6]],
                r: [[x + 7, y], [x - 6, y - 7], [x - 6, y + 7]], g: [[x - 7, y], [x + 6, y - 7], [x + 6, y + 7]] }[sens];
    return `<polygon points="${p.map(q => q.join(',')).join(' ')}" fill="${c}"/>`;
  };
  /* sens : 'h' haut, 'b' bas, 'r' droite, 'g' gauche */

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

  /* ------------------------------------------------------------------ temps 2, premier dessin */
  function circuit() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 660',
      'Un groupe d’eau glacée à gauche, avec son propre circuit frigorifique ; une pompe, un tuyau de départ et un tuyau de retour ; trois pièces à droite, chacune avec un ventilo-convecteur : un filtre, un ventilateur qui souffle l’air sur une batterie traversée par l’eau, et un bac. L’eau, l’air et le fluide frigorigène circulent : les reflets, les chevrons et les molécules qui avancent montrent leur sens.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc', PAROI = '#6b7a8c', EAU_BAC = '#4f9fc0';
    const T_DEPART = 0.08, T_RETOUR = 0.3;                 /* l'eau : froide au départ, plus tiède au retour */
    const couche = c => D.el('g', { 'data-c': c }, d);     /* une partie du dessin, que le pas à pas allume */
    const anime = [];                                      /* ce que chaque image fait avancer */

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 648, rx: 16, fill: C.papier, stroke: C.trait }, d);

    /* le groupe d'un côté, les trois ventilo-convecteurs de l'autre */
    D.el('rect', { x: 20, y: 24, width: 410, height: 412, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    const BOITES = [[24, 220], [256, 156], [424, 156]];    /* haut et hauteur de chaque ventilo-convecteur */
    BOITES.forEach(([y, h]) => D.el('rect', { x: 490, y, width: 440, height: h, rx: 12, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d));

    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, au-dessus des fonds crème, derrière le reste ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 183], [500, 340], [765, 497]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    /* ---- les briques : tube, liquide, vapeur, bulles (pilote 3.2) ---- */
    const tube = (g, tr, ext, int, paroi, bord) => {
      const t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
      D.el('path', Object.assign({ stroke: bord || CUIVRE_BORD, 'stroke-width': ext }, t), g);
      D.el('path', Object.assign({ stroke: paroi || CUIVRE, 'stroke-width': ext - 3 }, t), g);
      D.el('path', Object.assign({ stroke: CREUX, 'stroke-width': int }, t), g);
    };
    /* liquide : le tube plein, des reflets qui filent dans le sens du fluide */
    const liquide = (g, tr, int, couleur, v) => {
      const t = { d: tr.d, fill: 'none', 'stroke-linejoin': 'round' };
      D.el('path', Object.assign({ stroke: couleur, 'stroke-width': int, opacity: 0.92 }, t), g);
      const reflet = D.el('path', Object.assign({ stroke: C.papier, 'stroke-width': Math.max(1.6, int * 0.28), 'stroke-dasharray': '12 30', opacity: 0.85 }, t), g);
      anime.push(t2 => reflet.setAttribute('stroke-dashoffset', (-(t2 * v) % 42).toFixed(1)));
    };
    /* l'eau d'un tuyau : tube plein dont la couleur passe de t0 à t1 le long du trajet (froid → tiède, ou l'inverse) */
    const eau = (g, tr, int, t0, t1, v) => {
      let s = 0;
      for (let i = 1; i < tr.pts.length; i++) {
        const [x0, y0] = tr.pts[i - 1], [x1, y1] = tr.pts[i], l = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.ceil(l / 8));
        for (let k = 0; k < n; k++) {
          const a = k / n, b = (k + 1) / n, f = (s + l * (a + b) / 2) / tr.L;
          D.el('path', { d: 'M' + (x0 + (x1 - x0) * a).toFixed(1) + ' ' + (y0 + (y1 - y0) * a).toFixed(1) + ' L' + (x0 + (x1 - x0) * b).toFixed(1) + ' ' + (y0 + (y1 - y0) * b).toFixed(1),
            fill: 'none', stroke: D.couleur(D.lerp(t0, t1, f)), 'stroke-width': int, 'stroke-linecap': 'round' }, g);
        }
        s += l;
      }
      const reflet = D.el('path', { d: tr.d, fill: 'none', stroke: C.papier, 'stroke-width': Math.max(1.8, int * 0.26), 'stroke-dasharray': '12 30', 'stroke-linejoin': 'round', opacity: 0.8 }, g);
      anime.push(t2 => reflet.setAttribute('stroke-dashoffset', (-(t2 * v) % 42).toFixed(1)));
    };
    /* un tuyau d'eau : paroi, creux, eau */
    const tuyau = (g, pts, t0, t1, v, ext, int) => {
      const tr = trajet(pts);
      tube(g, tr, ext || 14, int || 8, PAROI, C.navy);
      eau(g, tr, int || 8, t0, t1, v || 30);
      return tr;
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
    /* l'air : des chevrons qui avancent sur un trajet ; couleur(x, y) donne la couleur de l'air à l'endroit où il passe */
    const air = (g, pts, couleur, o = {}) => {
      const tr = trajet(pts), e = o.echelle || 0.5, fondu = (o.fondu || 16) / tr.L, sc = D.el('g', { transform: 'scale(' + e + ')' }, g);   /* D.chevron se place dans un groupe réduit */
      anime.push(filer(sc, tr, Math.max(2, Math.round(tr.L / (o.pas || 44))), o.v || 70, p => D.chevron(p),
        (ch, x, y, ang, f) => ch(x / e, y / e, ang - 90, couleur(x, y), D.fenetre(f, 0, 1, fondu))));
    };

    /* ---- le groupe d'eau glacée ---- */
    let g = couche('groupe');
    const helice = D.ventilateur(g, 260, 124, 34);
    D.el('rect', { x: 68, y: 92, width: 152, height: 64, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    for (let i = 0; i < 10; i++) D.el('line', { x1: 80 + i * 14, y1: 96, x2: 80 + i * 14, y2: 152, stroke: C.trait, 'stroke-width': 2 }, g);
    D.el('rect', { x: 330, y: 270, width: 76, height: 50, rx: 12, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('path', { d: 'M66 234 h32 l-16 17 z M66 268 h32 l-16 -17 z', fill: C.papier, stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    /* l'air extérieur balaie le condenseur : il en sort chaud */
    [108, 140].forEach(y => air(g, [[30, y], [300, y]],
      x => D.couleur(x < 68 ? 0.62 : x > 220 ? 0.95 : D.lerp(0.62, 0.95, (x - 68) / 152))));
    const COND = [[206, 104], [82, 104], ...coude(82, 104, 124, -1), [82, 124], [206, 124], ...coude(206, 124, 144, 1), [206, 144], [82, 144]];
    const refoul = trajet([[406, 295], [420, 295], [420, 72], [214, 72], [214, 104], [206, 104]]);
    const cond = trajet(COND), [condV, condL] = couper(cond, 0.55);
    const liqHP = trajet([[82, 144], [82, 234]]);
    const liqBP = trajet([[82, 268], [82, 370], [110, 370]]);
    tube(g, refoul, 14, 8); vapeur(g, refoul, 8, 0.95, 85, 20);
    tube(g, cond, 14, 8); vapeur(g, condV, 8, 0.92, 55, 20, 0.55); liquide(g, condL, 8, D.couleur(0.62), 30);
    tube(g, liqHP, 12, 6); liquide(g, liqHP, 6, D.couleur(0.62), 30);
    tube(g, liqBP, 12, 6); liquide(g, liqBP, 6, D.couleur(0.08), 32);

    /* l'évaporateur à plaques : le fluide qui bout d'un côté, l'eau qui se refroidit de l'autre */
    g = couche('evap');
    D.el('rect', { x: 110, y: 350, width: 200, height: 64, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    for (let i = 0; i < 15; i++) D.el('line', { x1: 122 + i * 12, y1: 354, x2: 122 + i * 12, y2: 410, stroke: C.trait, 'stroke-width': 2 }, g);
    const gazEv = trajet([[310, 370], [368, 370], [368, 320]]);
    const evap = trajet([[110, 370], [310, 370]]), [evL, evV] = couper(evap, 0.55);
    tube(g, evap, 16, 10); liquide(g, evL, 10, D.couleur(0.08), 30); bulles(g, evL, 10, 30); vapeur(g, evV, 10, 0.16, 55, 20);
    tube(g, gazEv, 16, 10); vapeur(g, gazEv, 10, 0.18, 60, 26);
    tuyau(g, [[270, 414], [270, 394], [150, 394], [150, 414]], T_RETOUR, T_DEPART, 30, 16, 10);   /* à contre-courant du fluide : entrée à droite, sortie à gauche */

    /* le réseau d'eau : départ de l'évaporateur à la pompe, la colonne et les trois départs de pièce ; retour des pièces au groupe */
    const BR = BOITES.map(([y, h], i) => i === 0 ? { y, cy: y + 120, dep: y + 12, ret: y + 168 } : { y, cy: y + 88, dep: y + 12, ret: y + 138 });
    g = couche('depart');
    tuyau(g, [[150, 414], [150, 530], [384, 530]], T_DEPART, T_DEPART, 30);
    tuyau(g, [[436, 530], [462, 530], [462, 36]], T_DEPART, T_DEPART, 30);
    BR.forEach(b => tuyau(g, [[462, b.dep], [714, b.dep], [714, b.cy - 20]], T_DEPART, T_DEPART, 30, 12, 7));
    g = couche('pompe');
    D.el('circle', { cx: 410, cy: 530, r: 26, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('polygon', { points: '400,517 400,543 424,530', fill: C.navy }, g);
    g = couche('retour');
    tuyau(g, [[962, BR[0].ret], [962, 636], [270, 636], [270, 548]], T_RETOUR, T_RETOUR, 30);
    tuyau(g, [[270, 512], [270, 414]], T_RETOUR, T_RETOUR, 30);   /* le départ passe entre les deux : les tuyaux se croisent sans se raccorder */
    BR.forEach(b => tuyau(g, [[826, b.ret], [962, b.ret]], T_RETOUR, T_RETOUR, 30, 12, 7));

    /* les trois ventilo-convecteurs : filtre, batterie (l'eau y passe du froid au tiède), turbine, bac */
    const turbines = [];
    const XT = 646, RT = 32;                               /* la turbine est AVANT la batterie : elle aspire à travers le filtre et souffle sur la batterie */
    BR.forEach((b, i) => {
      const cy = b.cy, haut = i === 0;
      const gb = couche('batterie'), ga = couche('air');
      /* l'air : de la pièce vers le filtre, la turbine, la batterie ; il sort plus frais */
      D.el('line', { x1: 560, y1: cy - 30, x2: 560, y2: cy + 30, stroke: C.navy, 'stroke-width': 3, 'stroke-dasharray': '6 5' }, ga);
      D.el('circle', { cx: XT, cy, r: RT, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, ga);
      const roue = D.el('g', { transform: 'translate(' + XT + ' ' + cy + ')' }, ga);
      for (let k = 0; k < 16; k++) D.el('path', { d: 'M ' + RT * 0.56 + ' 0 Q ' + RT * 0.8 + ' ' + (-RT * 0.02) + ' ' + RT * 0.88 + ' ' + (-RT * 0.26), fill: 'none', stroke: C.navy, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + k * 22.5 + ')' }, roue);
      D.el('circle', { cx: XT, cy, r: RT / 2, fill: 'none', stroke: C.navy, 'stroke-width': 1.5, opacity: 0.5 }, ga);
      turbines.push(a => roue.setAttribute('transform', 'translate(' + XT + ' ' + cy + ') rotate(' + (a % 360).toFixed(1) + ')'));
      /* la batterie : ailettes, trois passes d'eau (entrée en haut à gauche, sortie en bas à droite) */
      D.el('rect', { x: 706, y: cy - 30, width: 110, height: 60, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, gb);
      for (let k = 0; k < 9; k++) D.el('line', { x1: 722 + k * 10, y1: cy - 26, x2: 722 + k * 10, y2: cy + 26, stroke: C.trait, 'stroke-width': 2 }, gb);
      const passes = trajet([[714, cy - 20], [806, cy - 20], ...coude(806, cy - 20, cy, 1), [806, cy], [714, cy], ...coude(714, cy, cy + 20, -1), [714, cy + 20], [806, cy + 20]]);
      tube(gb, passes, 12, 7); eau(gb, passes, 7, T_DEPART, T_RETOUR, 30);
      tuyau(gb, [[806, cy + 20], [826, cy + 20], [826, b.ret]], T_RETOUR, T_RETOUR, 30, 12, 7);
      /* le bac, sous la batterie : l'eau de l'air y goutte */
      D.el('path', { d: 'M718 ' + (cy + 36) + ' v10 h88 v-10', fill: 'none', stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, ga);
      D.el('rect', { x: 722, y: cy + 42, width: 80, height: 3, fill: EAU_BAC, stroke: 'none' }, ga);
      const gouttes = D.bulles(D.el('g', { transform: 'scale(0.5)' }, ga), 4, 32 + i, true);
      anime.push(t => gouttes(t, q => [(726 + q * 72) / 0.5, (cy + 30) / 0.5, (cy + 42) / 0.5, 1, EAU_BAC]));
      /* l'air passe : tiède de la pièce, plus frais après la batterie, puis il est soufflé vers le haut */
      air(ga, [[500, cy], [880, cy]], x => D.couleur(x < 706 ? 0.6 : x > 816 ? 0.2 : D.lerp(0.6, 0.2, (x - 706) / 110)), { echelle: haut ? 0.5 : 0.45 });
      air(ga, [[880, cy - 8], [880, cy - (haut ? 100 : 72)]], () => D.couleur(0.2), { fondu: 8, pas: 30 });
    });

    /* les étiquettes, par-dessus tout ; chacune a sa place libre */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700 });
      return t;
    };
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' };
    ecrire(38, 52, 'GROUPE D’EAU GLACÉE', null, null, G);
    ecrire(154, 190, 'condenseur', 'groupe', C.chaud, Object.assign({}, G, M));
    ecrire(260, 190, 'hélice', 'groupe', C.navy, M);
    ecrire(404, 122, 'air chaud', 'groupe', C.chaud, Object.assign({}, G, F));
    ecrire(106, 258, 'détendeur', 'groupe', C.froid, G);
    ecrire(318, 302, 'compresseur', 'groupe', C.chaud, Object.assign({}, G, F));
    ecrire(210, 338, 'évaporateur à plaques', 'evap', C.froid, Object.assign({}, G, M));
    ecrire(288, 470, 'eau tiède', 'evap', C.navy);
    ecrire(132, 470, 'eau froide', 'evap', C.froid, Object.assign({}, G, F));
    ecrire(170, 512, 'départ', 'depart', C.froid, G);
    ecrire(410, 586, 'pompe', 'pompe', C.froid, Object.assign({}, G, M));
    ecrire(560, 612, 'retour : eau plus tiède', 'retour', C.navy, Object.assign({}, G, M));
    BOITES.forEach(([y], i) => ecrire(506, y + 46, 'ventilo-convecteur', null, null, G));
    const b0 = BR[0];
    ecrire(770, b0.cy - 48, 'batterie', 'batterie', C.froid, Object.assign({}, G, M));
    ecrire(560, b0.cy + 80, 'filtre', 'air', C.navy, M);
    ecrire(762, b0.cy + 80, 'bac', 'air', C.eau, M);
    ecrire(XT, b0.cy + 80, 'turbine', 'air', C.navy, M);

    /* une image : tout avance selon t */
    const image = t => { helice(t * 260); turbines.forEach(f => f(t * 320)); anime.forEach(f => f(t)); };
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
      ['evap'],
      ['pompe', 'depart'],
      ['batterie'],
      ['air', 'batterie'],
      ['retour'],
      ['groupe']
    ];
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : RETRAIT));
      etiquettes.forEach(e => { const oui = on.has(e.c); e.t.setAttribute('fill', oui ? e.coul : C.navy); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400); });
    };

    const etapes = [
      { titre: 'Le groupe refroidit l’eau',
        dire: 'Dans l’évaporateur du groupe, le fluide frigorigène bout : il prend la chaleur de l’eau qui le traverse. L’eau sort froide ; le fluide, devenu gaz, repart vers le compresseur.',
        peindre: () => allumer(0) },
      { titre: 'La pompe l’envoie dans le bâtiment',
        dire: 'La pompe pousse l’eau froide dans le tuyau de départ, vers toutes les pièces à la fois. Dans les étages, il n’y a que de l’eau : le fluide frigorigène ne quitte pas le groupe.',
        peindre: () => allumer(1) },
      { titre: 'L’eau traverse la batterie',
        dire: 'Dans chaque pièce, l’eau entre dans la batterie du ventilo-convecteur : des tubes de cuivre couverts d’ailettes. Les trois ventilo-convecteurs sont alimentés en parallèle.',
        peindre: () => allumer(2) },
      { titre: 'L’air de la pièce passe dessus',
        dire: 'La turbine aspire l’air de la pièce à travers le filtre et le pousse sur la batterie froide. L’air ressort plus frais. Il laisse aussi son humidité, qui goutte dans le bac.',
        peindre: () => allumer(3) },
      { titre: 'L’eau réchauffée revient',
        dire: 'L’eau, qui a pris la chaleur de la pièce, est plus tiède. Elle repart par le tuyau de retour, jusqu’au groupe.',
        peindre: () => allumer(4) },
      { titre: 'Le groupe rejette la chaleur dehors',
        dire: 'Dans le groupe, le compresseur comprime le gaz, et le condenseur, balayé par l’air extérieur, rend la chaleur dehors. Le détendeur ramène le liquide à basse pression : le cycle recommence, et l’eau retournera se faire refroidir.',
        peindre: () => allumer(5) }
    ];
    return pasAPas(d, etapes, 'Mode froid, réseau deux tubes. Trait bleu : départ d’eau froide ; trait bleu clair : retour. Rouge : le fluide frigorigène chaud, qui reste dans le groupe.');
  }

  /* ------------------------------------------------------------------ temps 2, deuxième dessin : deux tubes / quatre tubes */
  function reseaux() {
    const d = svg('0 0 900 300',
      'Deux réseaux possibles : en deux tubes, un seul départ et un seul retour relient la production au ventilo-convecteur ; en quatre tubes, un départ et un retour pour le froid, et un départ et un retour pour le chaud.');
    const boite = (x, y, w, h, t, sous) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="${x + w / 2}" y="${y + h / 2 - (sous.length ? (sous.length * 11) : 0) + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">${t}</text>
${sous.map((s, k) => `<text x="${x + w / 2}" y="${y + h / 2 - sous.length * 11 + 29 + k * 20}" text-anchor="middle" font-size="13" fill="${C.gris}">${s}</text>`).join('')}`;
    const tuyau = (y, couleur, w = 6) => `<line x1="240" y1="${y}" x2="640" y2="${y}" stroke="${couleur}" stroke-width="${w}"/>`;

    const peindre = quatre => {
      d.setAttribute('viewBox', quatre ? '0 0 900 300' : '0 0 900 200');
      d.innerHTML = quatre ? `
<rect x="10" y="10" width="880" height="280" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${boite(30, 25, 210, 100, 'Groupe d’eau glacée', ['le froid'])}
${boite(30, 175, 210, 100, 'Chaudière ou PAC', ['le chaud'])}
${boite(640, 25, 230, 250, 'Ventilo-convecteur', ['raccordé aux deux réseaux', 'souvent deux batteries'])}
${tuyau(55, C.froid)}${tuyau(95, C.doux)}${tuyau(205, C.chaud)}${tuyau(245, C.feu)}
${tri(330, 55, 'r')}${tri(550, 95, 'g')}${tri(330, 205, 'r')}${tri(550, 245, 'g')}
<text x="440" y="43" text-anchor="middle" font-size="14" font-weight="700" fill="${C.froid}">départ froid</text>
<text x="440" y="116" text-anchor="middle" font-size="14" fill="${C.navy}">retour froid</text>
<text x="440" y="164" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">quatre tubes</text>
<text x="440" y="193" text-anchor="middle" font-size="14" font-weight="700" fill="${C.chaud}">départ chaud</text>
<text x="440" y="266" text-anchor="middle" font-size="14" fill="${C.navy}">retour chaud</text>`
      : `
<rect x="10" y="10" width="880" height="180" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${boite(30, 30, 210, 140, 'Production', ['du froid l’été,', 'du chaud l’hiver'])}
${boite(640, 30, 230, 140, 'Ventilo-convecteur', ['une seule batterie'])}
${tuyau(75, C.froid)}<line x1="240" y1="75" x2="640" y2="75" stroke="${C.chaud}" stroke-width="6" stroke-dasharray="18 18"/>
${tuyau(125, C.doux)}<line x1="240" y1="125" x2="640" y2="125" stroke="${C.feu}" stroke-width="6" stroke-dasharray="18 18"/>
${tri(330, 75, 'r')}${tri(550, 125, 'g')}
<text x="440" y="62" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">départ</text>
<text x="440" y="106" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">deux tubes</text>
<text x="440" y="150" text-anchor="middle" font-size="14" fill="${C.navy}">retour</text>`;
    };
    peindre(false);

    return etats(d, [
      { id: 'deux', libelle: 'Deux tubes', appliquer: () => peindre(false),
        legende: 'Deux tubes : un seul réseau, un départ et un retour. Il porte de l’eau froide l’été et de l’eau chaude l’hiver. Toutes les pièces reçoivent la même chose, en même temps.' },
      { id: 'quatre', libelle: 'Quatre tubes', appliquer: () => peindre(true),
        legende: 'Quatre tubes : deux réseaux côte à côte, un froid et un chaud. Chaque pièce choisit : la pièce au soleil refroidit pendant que sa voisine, à l’ombre, chauffe.' }
    ], 'deux', 'Deux tubes : un seul réseau, un départ et un retour. Il porte de l’eau froide l’été et de l’eau chaude l’hiver. Toutes les pièces reçoivent la même chose, en même temps.');
  }

  /* La scène du temps 2 : le trajet de l'eau, puis les deux sortes de réseau. */
  function trajetDeLEau() {
    const hote = document.createElement('div');
    hote.appendChild(circuit());
    const t = document.createElement('p');
    t.className = 'legende';
    t.style.cssText = 'font-weight:700;color:' + C.navy + ';margin-top:1.1rem';
    t.textContent = 'Deux tubes ou quatre tubes ?';
    hote.append(t, reseaux());
    return hote;
  }

  /* ------------------------------------------------------------------ temps 5 : ce qu'on raccorde sur un ventilo-convecteur */
  function recapitulatif() {
    const d = svg('0 0 900 350',
      'Récapitulatif : le réseau d’eau glacée arrive au ventilo-convecteur par un tuyau de départ et un tuyau de retour, isolés ; le bac évacue ses condensats par un tuyau en pente ; une alimentation électrique commande le ventilateur.');
    d.innerHTML = `
<defs><marker id="fl-rc" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.eau}"/></marker></defs>
<rect x="10" y="10" width="880" height="330" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<rect x="30" y="70" width="170" height="110" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="115" y="118" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Réseau d’eau</text>
<text x="115" y="142" text-anchor="middle" font-size="13" fill="${C.gris}">glacée, venu du groupe</text>

<rect x="330" y="60" width="250" height="140" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="455" y="100" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">Ventilo-convecteur</text>
<text x="455" y="128" text-anchor="middle" font-size="13" fill="${C.gris}">batterie · turbine</text>
<text x="455" y="148" text-anchor="middle" font-size="13" fill="${C.gris}">filtre · bac</text>
<text x="455" y="168" text-anchor="middle" font-size="13" fill="${C.gris}">thermostat · trois vitesses</text>

<line x1="200" y1="95" x2="330" y2="95" stroke="${C.froid}" stroke-width="6"/>
<line x1="200" y1="150" x2="330" y2="150" stroke="${C.doux}" stroke-width="6"/>
${tri(265, 95, 'r')}${tri(265, 150, 'g')}
<text x="265" y="82" text-anchor="middle" font-size="13" font-weight="700" fill="${C.froid}">départ</text>
<text x="265" y="176" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">retour</text>
<text x="265" y="198" text-anchor="middle" font-size="13" fill="${C.gris}">isolés, sans trou</text>

<path d="M455 200 V250 H700" fill="none" stroke="${C.eau}" stroke-width="4" marker-end="url(#fl-rc)"/>
<text x="578" y="276" text-anchor="middle" font-size="13" font-weight="700" fill="${C.eau}">condensats, en pente, jusqu’à l’évacuation</text>

<line x1="580" y1="130" x2="650" y2="130" stroke="${C.navy}" stroke-width="3" stroke-dasharray="6 5"/>
<rect x="650" y="60" width="220" height="140" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="760" y="108" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Alimentation</text>
<text x="760" y="132" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">électrique</text>
<text x="760" y="160" text-anchor="middle" font-size="13" fill="${C.gris}">ventilateur et commande</text>

<text x="450" y="306" text-anchor="middle" font-size="14" fill="${C.gris}">Aucun fluide frigorigène à raccorder ici : le circuit du groupe est fermé.</text>
<text x="450" y="328" text-anchor="middle" font-size="14" fill="${C.gris}">L’air du circuit d’eau se purge aux points hauts.</text>`;
    return d;
  }

  return { circuit, trajetDeLEau, recapitulatif };
})();

/* CartoClim 5.3 — scènes de l'entretien.
   Temps 2 (et temps 1, devant la photo : scene-devant.js) : un split dessiné d'un seul tenant — l'unité
   extérieure en haut (batterie, hélice, compresseur), le mur, l'unité intérieure en bas (filtre, batterie,
   turbine, bac), les deux liaisons isolées entre les deux, le tuyau de condensats qui sort. Six points
   d'entretien numérotés, allumés un par un ; sous le dessin, un bandeau dit ce qu'on voit quand le point est
   oublié (cause → effet). Aucune valeur chiffrée : ni rythme d'entretien, ni pression, ni température.
   Temps 5 : qui fait quoi, et le signe qui trahit chaque point oublié.

   Ce qui bouge (« Animer les réseaux », 04/10/2026, sur le modèle de la 3.2 ; tout se calcule à partir du
   temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air : des chevrons qui avancent à travers les deux batteries, couleur = température (pièce tiède →
     soufflé froid ; dehors → rejeté chaud) ; l'hélice et la turbine tournent. Quand le point oublié gêne
     l'air (filtre, batterie intérieure, turbine, batterie extérieure), le débit tombe : il ne reste qu'un
     chevron sur trois, plus lent ;
   · le fluide dans les batteries (LIQUIDE = tube plein, des reflets qui filent ; VAPEUR = molécules séparées ;
     dedans il bout, dehors il se condense) ; l'eau des condensats tombe dans le bac et part par le tuyau ;
   · ce qu'on voit quand le point est oublié (poussière, givre, feuilles, vibrations, bac qui déborde, tuyau
     bouché) n'apparaît qu'à son pas ; le pas à pas allume le point, le reste tourne en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — couleur de température, hélice, chevron,
   nappe, gouttes, métal, filigrane R9. Aucun texte sur un tracé, ni sur le trajet d'un chevron ou d'une
   molécule : vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 1 000 :
   au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* Pictogrammes des aptitudes et du récapitulatif, tracés dans un carré 0 0 100 100, sans couleur. */
  const ICONES = {
    filtre: '<rect x="12" y="24" width="76" height="52" rx="6"/><path d="M22 34 L33 66 L44 34 L55 66 L66 34 L77 66"/>',
    duree: '<circle cx="50" cy="50" r="36"/><path d="M50 26 V52 L68 64"/>',
    cadenas: '<rect x="22" y="46" width="56" height="40" rx="8"/><path d="M34 46 V34 a16 16 0 0 1 32 0 V40"/><path d="M50 62 V72"/>',
    loupe: '<circle cx="42" cy="42" r="24"/><path d="M60 60 L86 86"/>'
  };
  const ico = (nom, x, y, t, coul, e = 2.6) =>
    `<g transform="translate(${x},${y}) scale(${t / 100})" fill="none" stroke="${coul}" stroke-width="${e * 100 / t}" stroke-linecap="round" stroke-linejoin="round">${ICONES[nom]}</g>`;

  const AILETTE = 'rgba(27,58,99,.38)';

  /* Ce qu'on voit quand un point est oublié (le dernier point dit plutôt ce qu'on regarde). */
  const BANDES = [
    ['SI ON L’OUBLIE', 'l’air passe mal : le débit baisse et la batterie givre'],
    ['SI ON L’OUBLIE', 'l’air passe mal entre les ailettes : l’échange de chaleur baisse'],
    ['SI ON L’OUBLIE', 'le bac déborde : de l’eau au plafond'],
    ['SI ON L’OUBLIE', 'moins d’air brassé, du bruit, des vibrations'],
    ['SI ON L’OUBLIE', 'la haute pression monte et la machine consomme plus'],
    ['À REGARDER', 'isolant entier, unités bien fixées, accès dégagé']
  ];

  /* ---------- la circulation : un trajet (ligne brisée) et ce qui avance dessus ---------- */
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

  function lesSixPoints() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 640',
      'Un split en schéma, en marche : l’unité extérieure en haut, avec sa batterie, son hélice et son compresseur ; l’unité intérieure en bas, avec le filtre, la batterie, la turbine et le bac à condensats ; deux liaisons isolées traversent le mur et un tuyau évacue l’eau vers l’extérieur. L’air de la pièce et l’air du dehors circulent à travers les batteries. Six points d’entretien sont numérotés de 1 à 6 et s’allument l’un après l’autre ; quand un point est oublié, l’air passe mal.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc', EAU = '#4f9fc0';
    const couche = c => D.el('g', { 'data-c': c }, d);     /* une partie du dessin, que le pas à pas allume */
    const anime = [];                                      /* ce que chaque image fait avancer */
    let faibleInt = false, faibleExt = false;              /* le point oublié : l'air passe mal (peu de repères, et lents) */
    let debitInt = 1, debitExt = 1;                        /* le débit vu : il rejoint sa cible en douceur */
    let niveauBac = 0.5;

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 628, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 178], [500, 330], [765, 482]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    /* dehors / dedans, le mur */
    D.el('rect', { x: 30, y: 18, width: 850, height: 190, rx: 12, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 30, y: 276, width: 850, height: 269, rx: 12, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('line', { x1: 20, y1: 262, x2: 890, y2: 262, stroke: C.gris, 'stroke-width': 10, 'stroke-dasharray': '26 10', opacity: 0.55 }, d);

    /* les fixations de l'unité extérieure (point 6) */
    let g = couche('fixations');
    [90, 700].forEach(x => D.el('rect', { x, y: 208, width: 40, height: 14, rx: 3, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, g));

    /* les ailettes des deux batteries et le filtre, derrière l'air et les tubes */
    const ailettes = (c, x0, y1, y2) => {
      const gc = couche(c);
      for (let i = 0; i < 11; i++) D.el('line', { x1: x0 + i * 18, y1, x2: x0 + i * 18, y2, stroke: AILETTE, 'stroke-width': 2 }, gc);
    };
    ailettes('batExt', 122, 64, 164);
    ailettes('batInt', 302, 364, 464);
    g = couche('filtre');
    D.el('rect', { x: 210, y: 364, width: 16, height: 100, rx: 3, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    for (let i = 0; i < 9; i++) D.el('line', { x1: 210, y1: 374 + i * 10, x2: 226, y2: 374 + i * 10, stroke: C.gris, 'stroke-width': 2 }, g);

    /* l'hélice (dehors) et la turbine (dedans) */
    const helice = D.ventilateur(couche('helice'), 470, 114, 40);
    const turbine = (() => {
      const gt = D.el('g', { transform: 'translate(610 414)' }, couche('turbine')), r = 40;
      D.el('circle', { r, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, gt);
      const roue = D.el('g', {}, gt);
      for (let i = 0; i < 16; i++) D.el('path', { d: 'M ' + r * 0.56 + ' 0 Q ' + r * 0.8 + ' ' + (-r * 0.02) + ' ' + r * 0.88 + ' ' + (-r * 0.26),
        fill: 'none', stroke: C.navy, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + i * 22.5 + ')' }, roue);
      D.el('circle', { r: r * 0.5, fill: 'none', stroke: C.navy, 'stroke-width': 1.5, opacity: 0.5 }, gt);
      return a => roue.setAttribute('transform', 'rotate(' + (a % 360).toFixed(1) + ')');
    })();

    /* l'air : des chevrons qui avancent ; leur couleur suit la température, qui change dans la batterie.
       Quand le point est oublié, l'air passe mal : le débit tombe, il ne reste qu'un chevron sur trois, plus lent. */
    const air = (c, tr, temp, v, debit) => {
      const k = 0.5, gc = D.el('g', { transform: 'scale(' + k + ')' }, couche(c)), n = Math.max(2, Math.round(tr.L / 49));
      const rep = Array.from({ length: n }, () => D.chevron(gc));
      let phase = 0, avant = null;
      anime.push(t => {
        const q = debit();                                 /* 1 : plein débit ; 0 : l'air ne passe presque plus */
        if (avant !== null) phase += (t - avant) * v * (0.25 + 0.75 * q);
        avant = t;
        rep.forEach((ch, i) => {
          const f = D.frac(i / n + phase / tr.L), [x, y, ang] = tr.a(f * tr.L);
          ch(x / k, y / k, ang - 90, D.couleur(temp(f * tr.L)), D.fenetre(f, 0, 1, 0.06) * (i % 3 === 0 ? 1 : q * q));
        });
      });
    };
    const voie = (c, y, xa, xb, x0, x1, tEntree, tSortie, debit) => air(c, trajet([[xa, y], [xb, y]]), s => {
      const x = xa + s;
      return x < x0 ? tEntree : x > x1 ? tSortie : D.lerp(tEntree, tSortie, (x - x0) / (x1 - x0));
    }, 75, debit);
    [90, 114, 138].forEach(y => voie('airExt', y, 40, 700, 100, 310, 0.62, 0.95, () => debitExt));   /* dehors : l'air sort chaud */
    [390, 414, 438].forEach(y => voie('airInt', y, 40, 820, 290, 490, 0.6, 0.08, () => debitInt));   /* dedans : l'air sort froid */

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

    /* les deux batteries : le fluide les parcourt (dehors il se condense, dedans il bout) */
    const condExt = trajet([[310, 78], [110, 78], ...coude(110, 78, 102, -1), [110, 102], [310, 102], ...coude(310, 102, 126, 1), [310, 126], [110, 126], ...coude(110, 126, 150, -1), [110, 150], [310, 150]]);
    const evapInt = trajet([[290, 378], [490, 378], ...coude(490, 378, 402, 1), [490, 402], [290, 402], ...coude(290, 402, 426, -1), [290, 426], [490, 426], ...coude(490, 426, 450, 1), [490, 450], [290, 450]]);
    g = couche('batExt'); tube(g, condExt, 14, 8);
    const [condV, condL] = couper(condExt, 0.55);
    vapeur(g, condV, 8, 0.92, 55, 20, 0.55); liquide(g, condL, 8, D.couleur(0.62), 30);
    g = couche('batInt'); tube(g, evapInt, 14, 8);
    const [evapL, evapV] = couper(evapInt, 0.55);
    liquide(g, evapL, 8, D.couleur(0.08), 30); bulles(g, evapL, 8, 30); vapeur(g, evapV, 8, 0.16, 55, 20);

    /* le compresseur */
    D.el('rect', { x: 740, y: 78, width: 110, height: 72, rx: 12, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, d);

    /* l'eau : les gouttes tombent de la batterie froide dans le bac, puis le tuyau l'emmène dehors */
    g = couche('bac');
    const eauBac = D.liquide(D.el('g', { transform: 'translate(0 500) scale(1 0.5) translate(0 -500)' }, g),
      { x0: 293, x1: 487, yh: 468, yb: 500, niveau: () => niveauBac, couleur: () => EAU, pas: 16 });
    D.el('path', { d: 'M290 480 V502 H490 V480', fill: 'none', stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    const kG = 0.5, gouttes = D.bulles(D.el('g', { transform: 'scale(' + kG + ')' }, g), 6, 32, true);
    anime.push(t => { eauBac.maj(t); gouttes(t, q => [(310 + q * 170) / kG, 467 / kG, 492 / kG, 1, EAU]); });
    const amont = trajet([[482, 502], [482, 528], [640, 528]]), aval = trajet([[640, 528], [850, 528], [850, 232]]);
    g = couche('tuyauAmont'); tube(g, amont, 9, 5); liquide(g, amont, 5, EAU, 26);
    g = couche('tuyauAval'); tube(g, aval, 9, 5); liquide(g, aval, 5, EAU, 26);

    /* les deux liaisons, isolées : gros tube à gauche, petit tube à droite */
    g = couche('liaisons');
    D.el('path', { d: 'M780 208 V276', fill: 'none', stroke: C.navy, 'stroke-opacity': 0.12, 'stroke-width': 26 }, g);
    D.el('path', { d: 'M820 208 V276', fill: 'none', stroke: C.navy, 'stroke-opacity': 0.12, 'stroke-width': 18 }, g);
    D.el('path', { d: 'M780 208 V276', fill: 'none', stroke: C.gris, 'stroke-width': 8 }, g);
    D.el('path', { d: 'M820 208 V276', fill: 'none', stroke: C.gris, 'stroke-width': 4 }, g);

    /* ce qu'on voit quand le point est oublié : chaque signe n'apparaît qu'à son pas (couches « seules ») */
    const grain = (x, y) => D.el('circle', { cx: x, cy: y, r: 4, fill: C.ambre, opacity: 0.85, stroke: 'none' }, null);
    const sur = (nom, points) => { const gs = couche(nom); points.forEach(([x, y]) => gs.appendChild(grain(x, y))); return gs; };
    sur('poussFiltre', [[218, 372], [218, 392], [218, 412], [218, 432], [218, 452]]);
    g = couche('givreInt');                                /* le filtre bouché, la batterie givre */
    D.el('rect', { x: 292, y: 366, width: 196, height: 96, fill: C.doux, 'fill-opacity': 0.38, stroke: 'none' }, g);
    D.el('path', { d: [[318, 390], [392, 392], [466, 390], [336, 444], [410, 446], [478, 444]].map(([x, y]) =>
      'M' + (x - 7) + ' ' + y + ' H' + (x + 7) + ' M' + x + ' ' + (y - 7) + ' V' + (y + 7) + ' M' + (x - 5) + ' ' + (y - 5) + ' L' + (x + 5) + ' ' + (y + 5) +
      ' M' + (x - 5) + ' ' + (y + 5) + ' L' + (x + 5) + ' ' + (y - 5)).join(' '), fill: 'none', stroke: C.froid, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    sur('poussBatInt', [[311, 392], [329, 438], [347, 404], [365, 450], [383, 418], [401, 386], [419, 442], [437, 408], [455, 454], [473, 424]]);
    g = sur('poussTurbine', [[594, 394], [630, 430], [598, 432], [626, 396]]);
    D.el('path', { d: 'M552 392 q-9 20 0 40 M668 392 q9 20 0 40', fill: 'none', stroke: C.ambre, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);   /* les vibrations */
    g = couche('bouchon');                                 /* le tuyau bouché : le bac déborde */
    D.el('circle', { cx: 640, cy: 528, r: 10, fill: 'rgba(176,106,0,.65)', stroke: C.ambre, 'stroke-width': 3 }, g);
    const debord = D.bulles(D.el('g', { transform: 'scale(' + kG + ')' }, g), 5, 17, true);
    anime.push(t => debord(t, q => [(q < 0.5 ? 276 + q * 14 : 504 + (q - 0.5) * 14) / kG, 486 / kG, 514 / kG, 1, EAU]));
    sur('poussBatExt', [[122, 70], [140, 90], [158, 114], [176, 138], [194, 160], [230, 80], [248, 120], [266, 156]]);
    g = couche('feuilles');
    [[104, 80, -25], [100, 114, 20], [106, 148, -15]].forEach(([x, y, a]) =>
      D.el('ellipse', { cx: x, cy: y, rx: 11, ry: 6, transform: 'rotate(' + a + ' ' + x + ' ' + y + ')', fill: 'rgba(176,106,0,.55)', stroke: 'none' }, g));
    g = couche('repere6');                                 /* liaisons et fixations en évidence */
    [[780, 26], [820, 18]].forEach(([x, l]) => D.el('path', { d: 'M' + x + ' 208 V276', fill: 'none', stroke: 'rgba(255,107,53,.30)', 'stroke-width': l }, g));
    [90, 700].forEach(x => D.el('rect', { x, y: 208, width: 40, height: 14, rx: 3, fill: 'rgba(255,107,53,.25)', stroke: C.feu, 'stroke-width': 5 }, g));

    /* le bandeau : ce qu'on voit quand le point est oublié (ou ce qu'on regarde) */
    D.el('rect', { x: 30, y: 556, width: 850, height: 72, rx: 12, fill: C.creme, stroke: C.feu, 'stroke-width': 3 }, d);
    const bandeau = [D.texte(d, 52, 584, '', { 'font-size': 21, 'font-weight': 700, fill: C.orange }),
      D.texte(d, 52, 614, '', { 'font-size': 21, 'font-weight': 700, fill: C.navy })];

    /* les étiquettes, par-dessus tout ; chacune a sa place libre */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700 });
      return t;
    };
    /* un point d'entretien : un rond numéroté et son nom, qui s'allument avec lui */
    const badges = [];
    const badge = (i, cx, cy, mot) => {
      const rond = D.el('circle', { cx, cy, r: 17, fill: C.papier, stroke: C.navy, 'stroke-width': 2.5 }, d);
      D.texte(d, cx, cy + 7, String(i + 1), { 'text-anchor': 'middle', 'font-size': 21, 'font-weight': 700, fill: C.navy });
      badges.push({ i, rond, nom: D.texte(d, cx + 27, cy + 7, mot, { 'font-size': 21, fill: C.gris }) });
    };
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' };
    ecrire(50, 46, 'UNITÉ EXTÉRIEURE — dehors', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(50, 304, 'UNITÉ INTÉRIEURE — dans la pièce', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(892, 292, 'le mur', null, null, { fill: C.gris });
    ecrire(864, 246, 'dehors', null, null, { fill: C.gris });
    ecrire(470, 192, 'hélice', null, null, M);
    ecrire(795, 192, 'compresseur', null, null, Object.assign({}, G, M));
    ecrire(50, 486, 'air de la pièce', 'airInt', C.ambre);
    ecrire(690, 486, 'air soufflé', 'airInt', C.froid);
    badge(4, 110, 185, 'batterie extérieure');
    badge(5, 160, 235, 'fixations');
    badge(5, 520, 235, 'liaisons isolées');
    badge(0, 178, 337, 'filtre');
    badge(1, 296, 337, 'batterie intérieure');
    badge(3, 566, 337, 'turbine');
    badge(2, 330, 523, 'bac et tuyau');

    /* une image : tout avance selon t */
    const image = t => {
      debitInt += ((faibleInt ? 0.12 : 1) - debitInt) * 0.08; debitExt += ((faibleExt ? 0.12 : 1) - debitExt) * 0.08;
      helice(t * 260); turbine(t * 320); anime.forEach(f => f(t));
    };
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
      ['filtre', 'poussFiltre', 'givreInt', 'airInt'],
      ['batInt', 'poussBatInt', 'airInt'],
      ['bac', 'tuyauAmont', 'bouchon'],
      ['turbine', 'poussTurbine', 'airInt'],
      ['batExt', 'poussBatExt', 'feuilles', 'airExt', 'helice'],
      ['fixations', 'liaisons', 'repere6']
    ];
    const SEULES = ['poussFiltre', 'givreInt', 'poussBatInt', 'poussTurbine', 'bouchon', 'poussBatExt', 'feuilles', 'repere6'];
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => {
        const c = e.getAttribute('data-c');
        e.setAttribute('opacity', SEULES.includes(c) ? (on.has(c) ? 1 : 0) : on.has(c) ? 1 : RETRAIT);
      });
      d.querySelectorAll('[data-c="tuyauAval"]').forEach(e => { if (k === 2) e.setAttribute('opacity', 0); });   /* bouché : plus rien ne sort */
      etiquettes.forEach(e => { const oui = on.has(e.c); e.t.setAttribute('fill', oui ? e.coul : C.navy); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400); });
      badges.forEach(b => {
        const oui = b.i === k;
        b.rond.setAttribute('fill', oui ? C.feu : C.papier); b.rond.setAttribute('stroke', oui ? C.feu : C.navy);
        b.nom.setAttribute('fill', oui ? C.orange : C.gris); b.nom.setAttribute('font-weight', oui ? 700 : 400);
      });
      bandeau[0].textContent = BANDES[k][0]; bandeau[1].textContent = BANDES[k][1];
      faibleInt = k === 0 || k === 1 || k === 3; faibleExt = k === 4; niveauBac = k === 2 ? 0.92 : 0.5;
      if (FIGE) { debitInt = faibleInt ? 0.12 : 1; debitExt = faibleExt ? 0.12 : 1; image(1.6); }
    };

    const etapes = [
      { titre: 'Le filtre arrête la poussière',
        dire: 'Le filtre est la première grille que l’air de la pièce rencontre. Quand la poussière le bouche, l’air passe mal : la batterie reçoit moins de chaleur et finit par givrer. C’est la part de l’utilisateur : il le lave, ou le change si c’est nécessaire.',
        peindre: () => allumer(0) },
      { titre: 'La batterie intérieure garde ses ailettes ouvertes',
        dire: 'Ce que le filtre laisse passer se colle entre les ailettes de la batterie. L’air traverse de plus en plus mal et l’échange de chaleur baisse. Le technicien la nettoie, sans écraser les ailettes : elles sont fines.',
        peindre: () => allumer(1) },
      { titre: 'Le bac et le tuyau laissent sortir l’eau',
        dire: 'L’eau de l’air tombe dans le bac et part par le tuyau, jusqu’à dehors. Si quelque chose bouche le bac ou le tuyau, l’eau déborde : c’est le plafond du client qui coule. Le technicien verse de l’eau dans le bac et regarde si elle ressort au bout du tuyau.',
        peindre: () => allumer(2) },
      { titre: 'La turbine brasse l’air sans freiner',
        dire: 'La turbine aspire l’air de la pièce et le souffle à travers la batterie. Encrassée, elle brasse moins d’air et vibre. Le technicien la nettoie et vérifie qu’elle tourne sans bruit anormal.',
        peindre: () => allumer(3) },
      { titre: 'La batterie extérieure respire',
        dire: 'Dehors, l’hélice pousse l’air à travers la batterie. Feuilles et poussière l’étouffent : l’air ne passe plus, la haute pression monte et la machine consomme plus. On nettoie à l’eau à basse pression ou au peigne à ailettes, jamais au jet puissant droit sur les ailettes.',
        peindre: () => allumer(4) },
      { titre: 'Les liaisons et les fixations tiennent',
        dire: 'Le technicien regarde ce qui tient la machine et ce qui l’habille : l’isolant des deux tubes, les fixations des unités, le serrage des câbles, les traces d’oxydation, et l’air libre autour de l’unité extérieure.',
        peindre: () => allumer(5) }
    ];
    return pasAPas(d, etapes, 'Six points, et chacun a son signe quand on l’oublie. Le rythme des visites vient de la notice et de la réglementation : aucun n’est donné ici.');
  }

  /* Temps 5 : qui fait quoi, et le signe qui trahit chaque point oublié. */
  function recapitulatif() {
    const d = svg('0 0 900 430', 'Récapitulatif : à gauche, qui fait quoi — l’utilisateur lave les filtres, le technicien nettoie et mesure, une personne attestée seule touche au circuit du fluide ; à droite, trois signes qui trahissent un point oublié : du givre ou un air faible, une haute pression élevée, de l’eau au plafond.');
    const gauche = [
      ['filtre', 'L’utilisateur', 'lave ses filtres', 'ou les change, si c’est nécessaire'],
      ['loupe', 'Le technicien', 'batteries, bac et tuyau, turbine', 'isolant, fixations, mesures, carnet'],
      ['cadenas', 'Une personne attestée', 'tout ce qui touche au circuit du fluide', 'voir la Législation']
    ];
    const droite = [
      ['Du givre, un air qui souffle mal', '→ le filtre, puis la batterie intérieure'],
      ['La haute pression est élevée', '→ la batterie extérieure, encrassée'],
      ['De l’eau coule au plafond', '→ le bac ou le tuyau de condensats']
    ];
    d.innerHTML = `
<rect x="10" y="10" width="880" height="410" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="40" y="44" font-size="16" font-weight="700" fill="${C.navy}">QUI FAIT QUOI</text>
<text x="470" y="44" font-size="16" font-weight="700" fill="${C.navy}">CE QUI SE VOIT QUAND ON L’OUBLIE</text>
<line x1="455" y1="30" x2="455" y2="398" stroke="${C.trait}" stroke-width="2"/>
${gauche.map(([icone, qui, l1, l2], i) => {
  const y = 62 + i * 112;
  return `<rect x="40" y="${y}" width="400" height="100" rx="12" fill="${C.creme}" stroke="${i === 2 ? C.feu : C.navy}" stroke-width="3"${i === 2 ? ' stroke-dasharray="9 6"' : ''}/>
${ico(icone, 56, y + 28, 44, i === 2 ? C.orange : C.navy)}
<text x="118" y="${y + 32}" font-size="19" font-weight="700" fill="${C.navy}">${qui}</text>
<text x="118" y="${y + 58}" font-size="17" fill="${C.navy}">${l1}</text>
<text x="118" y="${y + 83}" font-size="15" fill="${C.gris}">${l2}</text>`;
}).join('\n')}
${droite.map(([signe, point], i) => {
  const y = 62 + i * 112;
  return `<rect x="470" y="${y}" width="400" height="100" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="490" y="${y + 40}" font-size="19" font-weight="700" fill="${C.navy}">${signe}</text>
<text x="490" y="${y + 74}" font-size="17" font-weight="700" fill="${C.orange}">${point}</text>`;
}).join('\n')}`;
    return d;
  }

  return { lesSixPoints, recapitulatif, icones: ICONES };
})();

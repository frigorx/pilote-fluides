/* CartoClim 3.2 — scènes du split. Temps 2 (et temps 1, devant les photos : scene-devant.js) : le trajet
   de la chaleur en mode froid, en six pas, avec l'AIR et le FLUIDE qui circulent (pilote « Animer les
   réseaux », 04/10/2026). Temps 5 : ce qu'on raccorde entre les deux unités.
   Croix du frigoriste (charte R6) : détendeur à gauche, compresseur à droite, condenseur en haut
   (dehors), évaporateur en bas (dedans). Le condenseur est alimenté par le haut, le liquide sort en bas.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air : des chevrons qui avancent, couleur = température (pièce tiède → soufflé froid ; air du
     dehors → rejeté chaud) ; l'hélice et la turbine tournent ;
   · le fluide : LIQUIDE = tube plein, des reflets qui filent ; VAPEUR = petites molécules séparées ;
     dans l'évaporateur le liquide bout (bulles qui grossissent), dans le condenseur la vapeur se
     condense (gouttes) ; l'eau des condensats tombe dans le bac (nappe qui ondule) et part dehors ;
   · le pas à pas allume la partie qui agit ; le reste continue de tourner, en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche. Le réglage du système, lui, n'arrête rien : c'est le cours qui bouge.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — couleur de température, hélice, chevron,
   nappe, gouttes, métal, filigrane R9. Aucun texte sur un tracé, ni sur le trajet d'un chevron ou d'une
   molécule : vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 1 000 :
   au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

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

  function trajetDeLaChaleur() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 640',
      'Un split en coupe schématique, en marche en mode froid : l’unité extérieure en haut avec condenseur, hélice, compresseur et détendeur ; l’unité intérieure en bas avec la turbine, l’évaporateur et le bac à condensats ; deux tubes traversent le mur. L’air de la pièce entre tiède et ressort froid ; l’air du dehors ressort chaud ; le liquide coule dans le petit tube, la vapeur file dans le gros.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc', EAU = '#4f9fc0';
    const couche = c => D.el('g', { 'data-c': c }, d);     /* une partie du dessin, que le pas à pas allume */
    const anime = [];                                      /* ce que chaque image fait avancer */

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 628, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 178], [500, 330], [765, 482]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    /* dehors / dedans */
    D.el('rect', { x: 110, y: 30, width: 760, height: 226, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 110, y: 338, width: 760, height: 282, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('line', { x1: 16, y1: 286, x2: 880, y2: 286, stroke: C.gris, 'stroke-width': 10, 'stroke-dasharray': '26 12' }, d);

    /* les ailettes des deux batteries, derrière l'air et les tubes */
    const ailettes = (c, x0, y1, y2) => {
      const g = couche(c);
      for (let i = 0; i < 14; i++) D.el('line', { x1: x0 + i * 18, y1, x2: x0 + i * 18, y2, stroke: C.trait, 'stroke-width': 2 }, g);
    };
    ailettes('cond', 342, 96, 206);
    ailettes('evap', 352, 420, 528);

    /* l'hélice (dehors) et la turbine (dedans) */
    const helice = D.ventilateur(couche('helice'), 690, 151, 46);
    const turbine = (() => {
      const g = D.el('g', { transform: 'translate(230 474)' }, couche('turbine')), r = 36;
      D.el('circle', { r, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
      const roue = D.el('g', {}, g);
      for (let i = 0; i < 16; i++) D.el('path', { d: 'M ' + r * 0.56 + ' 0 Q ' + r * 0.8 + ' ' + (-r * 0.02) + ' ' + r * 0.88 + ' ' + (-r * 0.26),
        fill: 'none', stroke: C.navy, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + i * 22.5 + ')' }, roue);
      D.el('circle', { r: r * 0.5, fill: 'none', stroke: C.navy, 'stroke-width': 1.5, opacity: 0.5 }, g);
      return a => roue.setAttribute('transform', 'rotate(' + (a % 360).toFixed(1) + ')');
    })();

    /* l'air : des chevrons qui avancent ; leur couleur suit la température, qui change dans la batterie */
    const air = (c, y, x0, x1, tEntree, tSortie) => {
      const k = 0.5, g = D.el('g', { transform: 'scale(' + k + ')' }, couche(c)), tr = trajet([[14, y], [990, y]]);
      const temp = x => x < x0 ? tEntree : x > x1 ? tSortie : D.lerp(tEntree, tSortie, (x - x0) / (x1 - x0));
      anime.push(filer(g, tr, 20, 75, p => D.chevron(p),
        (ch, x, yy, ang, f) => ch(x / k, yy / k, ang - 90, D.couleur(temp(x)), D.fenetre(f, 0, 1, 0.06))));
    };
    [132, 170].forEach(y => air('airExt', y, 330, 600, 0.62, 0.95));   /* dehors : l'air sort chaud */
    [455, 493].forEach(y => air('airInt', y, 340, 600, 0.6, 0.08));    /* dedans : l'air sort froid */

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

    /* le parcours, dans le sens du fluide (mode froid) */
    const refoul = trajet([[807, 196], [807, 48], [590, 48], [590, 113]]);
    const cond = trajet([[590, 113], [330, 113], ...coude(330, 113, 151, -1), [330, 151], [590, 151], ...coude(590, 151, 189, 1), [590, 189], [330, 189]]);
    const liqHP = trajet([[330, 189], [312, 189], [312, 214]]);
    const liqBP = trajet([[312, 248], [312, 404], [340, 404], [340, 436]]);
    const evap = trajet([[340, 436], [600, 436], ...coude(600, 436, 474, 1), [600, 474], [340, 474], ...coude(340, 474, 512, -1), [340, 512], [600, 512]]);
    const gaz = trajet([[600, 512], [807, 512], [807, 246]]);

    let g = couche('refoul'); tube(g, refoul, 16, 10); vapeur(g, refoul, 10, 0.95, 85, 20);
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
    D.el('rect', { x: 770, y: 196, width: 74, height: 50, rx: 12, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, g);
    g = couche('detendeur');
    D.el('path', { d: 'M300 214 h24 l-12 17 z M300 248 h24 l-12 -17 z', fill: C.papier, stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);

    /* l'eau : les gouttes tombent de la batterie froide dans le bac, puis le tuyau l'emmène dehors */
    g = couche('bac');
    const eauBac = D.liquide(D.el('g', { transform: 'translate(0 568) scale(1 0.5) translate(0 -568)' }, g),
      { x0: 339, x1: 601, yh: 532, yb: 568, niveau: () => 0.5, couleur: () => EAU, pas: 16 });
    D.el('path', { d: 'M336 548 V570 H604 V548', fill: 'none', stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    const kG = 0.5, gouttes = D.bulles(D.el('g', { transform: 'scale(' + kG + ')' }, g), 7, 32, true);
    anime.push(t => { eauBac.maj(t); gouttes(t, q => [(360 + q * 220) / kG, 531 / kG, 556 / kG, 1, EAU]); });
    g = couche('eau');
    const tuyau = trajet([[604, 566], [700, 570], [940, 578]]);
    tube(g, tuyau, 9, 5); liquide(g, tuyau, 5, EAU, 26);

    /* les étiquettes, par-dessus tout ; chacune a sa place libre */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700 });
      return t;
    };
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' };
    ecrire(126, 60, 'UNITÉ EXTÉRIEURE — dehors', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(126, 102, 'air extérieur', 'airExt', C.ambre);
    ecrire(690, 92, 'hélice', 'helice', C.navy, M);
    ecrire(882, 104, 'air chaud', 'airExt', C.chaud);
    ecrire(460, 238, 'condenseur', 'cond', C.chaud, Object.assign({}, G, M));
    ecrire(760, 238, 'compresseur', 'compr', C.chaud, Object.assign({}, G, F));
    ecrire(290, 238, 'détendeur', 'detendeur', C.froid, Object.assign({}, G, F));
    ecrire(892, 293, 'le mur', null, null, { fill: C.gris });
    ecrire(326, 321, 'petit tube : liquide', 'liqBP', C.orange, G);
    ecrire(790, 321, 'gros tube : gaz', 'gaz', C.orange, Object.assign({}, G, F));
    ecrire(550, 368, 'UNITÉ INTÉRIEURE — dans la pièce', null, null, { 'font-size': 22, 'font-weight': 700, 'text-anchor': 'middle' });
    ecrire(126, 412, 'air de la pièce', 'airInt', C.ambre);
    ecrire(470, 408, 'évaporateur', 'evap', C.froid, Object.assign({}, G, M));
    ecrire(882, 408, 'air frais', 'airInt', C.froid);
    ecrire(882, 435, 'soufflé', 'airInt', C.froid);
    ecrire(230, 542, 'turbine', 'turbine', C.navy, M);
    ecrire(470, 602, 'bac à condensats', 'bac', C.eau, M);
    ecrire(884, 556, '→ dehors', 'eau', C.eau);

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
      ['gaz'],
      ['compr', 'refoul'],
      ['cond', 'airExt', 'helice'],
      ['detendeur', 'liqHP', 'liqBP'],
      ['bac', 'eau']
    ];
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : RETRAIT));
      etiquettes.forEach(e => { const oui = on.has(e.c); e.t.setAttribute('fill', oui ? e.coul : C.navy); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400); });
    };

    const etapes = [
      { titre: 'L’air de la pièce traverse l’évaporateur', dire: 'La turbine aspire l’air de la pièce et le pousse à travers la batterie. Le fluide, qui est froid dedans, bout : il prend la chaleur de l’air. L’air ressort plus frais.',
        peindre: () => allumer(0) },
      { titre: 'Le gaz part par le gros tube', dire: 'Devenu gaz, le fluide quitte l’unité intérieure par le gros tube, celui qu’on appelle la ligne gaz, et traverse le mur.',
        peindre: () => allumer(1) },
      { titre: 'Le compresseur le comprime', dire: 'Dehors, le compresseur aspire ce gaz et le comprime. En sortie il est chaud et sous haute pression.',
        peindre: () => allumer(2) },
      { titre: 'Le condenseur rend la chaleur dehors', dire: 'L’hélice balaie le condenseur avec l’air extérieur. Le gaz chaud se refroidit, redevient liquide, et la chaleur de la pièce est rejetée dehors.',
        peindre: () => allumer(3) },
      { titre: 'Le détendeur fait chuter la pression', dire: 'Le liquide passe le détendeur : sa pression tombe d’un coup, il devient froid, et il repart vers l’intérieur par le petit tube, la ligne liquide.',
        peindre: () => allumer(4) },
      { titre: 'Et l’eau ? Les condensats', dire: 'L’air de la pièce, refroidi sur la batterie, lâche une partie de son humidité. Cette eau tombe dans le bac et s’évacue dehors par le tuyau de condensats.',
        peindre: () => allumer(5) }
    ];
    return pasAPas(d, etapes, 'Mode froid. En mode chaud, la vanne 4 voies inverse le sens : la station 2.6 le montre.');
  }

  /* Temps 5 : ce qu'on raccorde entre les deux unités, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 290', 'Récapitulatif : l’unité intérieure et l’unité extérieure, reliées par le petit tube liquide, le gros tube gaz et le câble ; le tuyau de condensats part de l’unité intérieure vers dehors.');
    d.innerHTML = `
<rect x="10" y="10" width="800" height="270" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="40" y="60" width="220" height="130" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="150" y="92" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Unité intérieure</text>
<text x="150" y="116" text-anchor="middle" font-size="13" fill="${C.gris}">évaporateur · turbine</text>
<text x="150" y="136" text-anchor="middle" font-size="13" fill="${C.gris}">filtre · bac · sondes</text>
<rect x="560" y="60" width="220" height="130" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="670" y="92" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Unité extérieure</text>
<text x="670" y="116" text-anchor="middle" font-size="13" fill="${C.gris}">compresseur · condenseur</text>
<text x="670" y="136" text-anchor="middle" font-size="13" fill="${C.gris}">détendeur · vannes de service</text>
<line x1="410" y1="40" x2="410" y2="248" stroke="${C.gris}" stroke-width="8" stroke-dasharray="20 8"/>
<text x="410" y="268" text-anchor="middle" font-size="12" fill="${C.gris}">le mur</text>
<line x1="260" y1="90" x2="560" y2="90" stroke="${C.froid}" stroke-width="4"/>
<text x="330" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="${C.froid}">petit tube · liquide</text>
<line x1="260" y1="125" x2="560" y2="125" stroke="${C.froid}" stroke-width="9"/>
<text x="330" y="148" text-anchor="middle" font-size="12" font-weight="700" fill="${C.froid}">gros tube · gaz</text>
<line x1="260" y1="172" x2="560" y2="172" stroke="${C.navy}" stroke-width="3" stroke-dasharray="6 5"/>
<text x="330" y="194" text-anchor="middle" font-size="12" font-weight="700" fill="${C.navy}">câble entre les unités</text>
<path d="M150 190 v40 h235" fill="none" stroke="${C.eau}" stroke-width="4"/>
<text x="150" y="252" text-anchor="middle" font-size="12" font-weight="700" fill="${C.eau}">condensats, en pente, jusqu’à dehors</text>
<text x="670" y="218" text-anchor="middle" font-size="12" fill="${C.gris}">alimentation + disjoncteur</text>
<text x="670" y="240" text-anchor="middle" font-size="12" fill="${C.gris}">tirage au vide avant d’ouvrir les vannes</text>`;
    return d;
  }

  return { trajetDeLaChaleur, recapitulatif };
})();

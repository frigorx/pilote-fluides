/* CartoClim 3.8 — scènes du chauffe-eau thermodynamique.
   Temps 2 (et temps 1, devant les photos : scene-devant.js), premier dessin : la chaleur de l'air jusqu'à
   l'eau du ballon, en cinq pas, avec l'AIR et le FLUIDE qui circulent (« Animer les réseaux », 04/10/2026,
   sur le modèle de la 3.2). Croix du frigoriste (charte R6) : détendeur à gauche, compresseur à droite,
   condenseur en haut, évaporateur en bas. Le ballon est dessiné en coupe, à côté de la croix ; le condenseur
   est ce tube enroulé contre sa paroi, alimenté par le haut. Dans l'appareil réel l'évaporateur est en haut,
   sous le capot : on ne retourne jamais la croix pour autant.
   Temps 2, second dessin : trois états de la cuve — la pompe à chaleur seule, avec l'appoint, on puise.
   Temps 5 : ce qu'on raccorde, puis les trois compteurs du banc du lycée.

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air : des chevrons qui montent à travers l'évaporateur, couleur = température (pièce tiède → plus froid) ;
     le ventilateur tourne ;
   · le fluide : LIQUIDE = tube plein, des reflets qui filent ; VAPEUR = petites molécules séparées ;
     dans l'évaporateur le liquide bout (bulles), dans le tube enroulé la vapeur se condense (gouttes) ;
   · l'eau : la chaleur du tube traverse la paroi (flèches), un reflet monte le long de la paroi, l'eau chaude
     sort en haut et l'eau froide entre en bas (tubes pleins à reflets) ; les couches restent séparées ;
   · le pas à pas allume la partie qui agit ; le reste continue de tourner, en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — couleur de température, hélice, chevron,
   flèche de chaleur, métal, filigrane R9. Aucun texte sur un tracé, ni sur le trajet d'un chevron ou d'une
   molécule : vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 1 000 :
   au moins 18,7 px quand la scène est devant, à 1 280 px. Aucune valeur chiffrée, sauf celles de la fiche
   du banc (200 L, R-134a, 750 W, 1 800 W), qui ne figurent que dans le récapitulatif du temps 5. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;
  const NBSP = String.fromCharCode(160);                 /* espace insécable : un nombre et son unité ne se séparent pas */
  const hp = C.chaud;                                  /* fluide : haute pression rouge */
  const eauChaude = C.ambre, eauFroide = C.eau;        /* eau sanitaire : chaude ambre · froide vert-bleu */

  /* Une pointe de flèche à taille fixe, quelle que soit l'épaisseur du trait. */
  const pointe = (id, couleur) =>
    `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="13" markerHeight="13" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${couleur}"/></marker>`;
  /* Plusieurs flèches : un marqueur de fin ne s'applique qu'au dernier sous-tracé, donc un tracé par flèche. */
  const fleches = (chemins, couleur, marque, w = 4) =>
    chemins.map(c => `<path d="${c}" fill="none" stroke="${couleur}" stroke-width="${w}" marker-end="url(#${marque})"/>`).join('');
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}"${o.ancre ? ` text-anchor="${o.ancre}"` : ''} font-size="${o.taille || 16}"${o.gras === false ? '' : ' font-weight="700"'} fill="${o.couleur || C.navy}">${t}</text>`;
  /* Un tube : couleur fixe, plus épais et auréolé quand il agit, flèche de sens seulement alors. */
  const tube = (chemin, couleur, actif, marque, w = 5) =>
    (actif ? `<path d="${chemin}" fill="none" stroke="${C.feu}" stroke-opacity=".3" stroke-width="${w + 12}" stroke-linejoin="round" stroke-linecap="round"/>` : '') +
    `<path d="${chemin}" fill="none" stroke="${couleur}" stroke-opacity="${actif ? 1 : .55}" stroke-width="${actif ? w + 3 : w}" stroke-linejoin="round"${actif && marque ? ` marker-end="url(#${marque})"` : ''}/>`;
  /* Les couches d'eau de la cuve, du haut (chaude) vers le bas (froide), coupées à la forme de la cuve. */
  const couches = (idClip, chemin, x, w, haut, bas, limite) => `
<clipPath id="${idClip}"><path d="${chemin}"/></clipPath>
<g clip-path="url(#${idClip})" stroke="none">
  <rect x="${x}" y="${haut}" width="${w}" height="${limite - haut}" fill="${C.chaud}" fill-opacity=".38"/>
  <rect x="${x}" y="${limite}" width="${w}" height="50" fill="#e07a2f" fill-opacity=".3"/>
  <rect x="${x}" y="${limite + 50}" width="${w}" height="${bas - limite - 50}" fill="${C.bleu}" fill-opacity=".34"/>
</g>`;
  /* Un serpentin enroulé contre une paroi verticale : onze demi-vagues de 24 de haut. */
  const serpentin = (x, y, n) => `M${x} ${y} q-22 12 0 24` + ' t0 24'.repeat(n - 1);

  /* ------------------------------------------------------------------------------------------
     La circulation : un trajet (ligne brisée) et ce qui avance dessus.                          */
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
  /* un tube enroulé contre une paroi verticale : n demi-vagues de hauteur h et d'amplitude a, de (xc, y0) vers le bas */
  function ondes(xc, y0, n, h, a) {
    const p = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < 8; j++) p.push([xc + (i % 2 ? 1 : -1) * a * Math.sin(Math.PI * j / 8), y0 + h * (i + j / 8)]);
    p.push([xc, y0 + h * n]);
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

  /* ------------------------------------------------------------------------------------------
     Temps 2 — dessin 1 : la chaleur de l'air jusqu'à l'eau du ballon.                           */
  function trajetDeLaChaleur() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 640',
      'Un chauffe-eau thermodynamique en schéma, en marche. À gauche, le circuit du fluide en croix : le détendeur à gauche, le compresseur à droite, le condenseur en haut — un tube enroulé contre la paroi du ballon — et l’évaporateur en bas, avec son ventilateur ; l’air de la pièce le traverse de bas en haut et ressort plus froid. À côté, le ballon d’eau chaude en coupe : l’eau chaude en haut, l’eau froide en bas ; la chaleur du tube traverse la paroi, l’eau chaude sort en haut, l’eau froide entre en bas.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc', EAU = '#4f9fc0';
    const couche = c => D.el('g', { 'data-c': c }, d);     /* une partie du dessin, que le pas à pas allume */
    const anime = [];                                      /* ce que chaque image fait avancer */
    const CUVE = 'M560 110 Q560 74 596 74 H714 Q750 74 750 110 V316 Q750 352 714 352 H596 Q560 352 560 316 Z';

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 628, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 178], [500, 330], [765, 482]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    /* le ballon, en coupe : l'eau se range par couches (chaude en haut, froide en bas), la paroi ;
       à gauche de la paroi un reflet monte : l'eau chauffée, plus légère, s'élève */
    let g = couche('cuve');
    D.el('clipPath', { id: 'ce8-cuve' }, g).appendChild(D.el('path', { d: CUVE }, null));
    const bandes = D.el('g', { 'clip-path': 'url(#ce8-cuve)' }, g);
    [[74, 76, C.chaud, 0.38], [150, 50, '#e07a2f', 0.3], [200, 152, C.bleu, 0.34]].forEach(([y, h, fill, op]) =>
      D.el('rect', { x: 560, y, width: 190, height: h, fill, 'fill-opacity': op, stroke: 'none' }, bandes));
    const montee = trajet([[572, 340], [572, 86]]);
    D.el('path', { d: montee.d, fill: 'none', stroke: C.papier, 'stroke-width': 4, 'stroke-dasharray': '10 28', opacity: 0.9 }, g);
    const reflet = g.lastChild;
    anime.push(t => reflet.setAttribute('stroke-dashoffset', (-(t * 22) % 38).toFixed(1)));
    D.el('path', { d: CUVE, fill: 'none', stroke: C.navy, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);

    /* les ailettes de l'évaporateur : l'air monte entre elles */
    g = couche('evap');
    for (let i = 0; i < 8; i++) D.el('line', { x1: 340 + i * 20, y1: 468, x2: 340 + i * 20, y2: 562, stroke: C.trait, 'stroke-width': 2 }, g);

    /* le ventilateur, au-dessus de l'évaporateur */
    const helice = D.ventilateur(couche('ventilo'), 410, 410, 50);

    /* l'air : des chevrons qui montent ; leur couleur suit la température, qui change dans la batterie */
    const air = (c, tr, temp, v = 75) => {
      const k = 0.5, gc = D.el('g', { transform: 'scale(' + k + ')' }, couche(c));
      anime.push(filer(gc, tr, Math.max(2, Math.round(tr.L / 49)), v, p => D.chevron(p),
        (ch, x, y, ang, f) => ch(x / k, y / k, ang - 90, D.couleur(temp(f * tr.L)), D.fenetre(f, 0, 1, 0.06))));
    };
    [365, 410, 455].forEach(x => air('air', trajet([[x, 618], [x, 340]]),
      s => s < 56 ? 0.58 : s > 150 ? 0.08 : D.lerp(0.58, 0.08, (s - 56) / 94)));      /* la batterie va de y = 562 à y = 468 */

    /* la chaleur du tube traverse la paroi et passe dans l'eau */
    g = couche('chaleur');
    const kC = 0.75, gC = D.el('g', { transform: 'scale(' + kC + ')' }, g);
    [150, 182, 262, 294].forEach(y => {
      const tr = trajet([[552, y], [650, y]]);
      anime.push(filer(gC, tr, 2, 36, p => D.chaleur(p),
        (a, x, yy, ang, f) => a(x / kC, yy / kC, ang - 90, D.fenetre(f, 0, 1, 0.2))));
    });

    /* les tubes de cuivre, et ce qui coule dedans (ici, ces trois briques portent le nom de celles du dessin) */
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

    /* le parcours, dans le sens du fluide : le condenseur est le tube enroulé contre la cuve, alimenté par le haut */
    const refoul = trajet([[900, 410], [900, 40], [548, 40], [548, 100]]);
    const cond = trajet(ondes(548, 100, 8, 24, 11));
    const liqHP = trajet([[548, 292], [548, 322], [150, 322], [150, 395]]);
    const liqBP = trajet([[150, 429], [150, 485], [330, 485]]);
    const evap = trajet([[330, 485], [490, 485], ...coude(490, 485, 515, 1), [490, 515], [330, 515], ...coude(330, 515, 545, -1), [330, 545], [490, 545]]);
    const gaz = trajet([[490, 545], [900, 545], [900, 470]]);
    const eauC = trajet([[750, 120], [850, 120]]), eauF = trajet([[850, 300], [750, 300]]);

    g = couche('refoul'); tube(g, refoul, 16, 10); vapeur(g, refoul, 10, 0.95, 85, 20);
    g = couche('cond'); tube(g, cond, 14, 8);
    const [condV, condL] = couper(cond, 0.6);
    vapeur(g, condV, 8, 0.92, 45, 18, 0.55); liquide(g, condL, 8, D.couleur(0.62), 30);
    g = couche('liqHP'); tube(g, liqHP, 12, 6); liquide(g, liqHP, 6, D.couleur(0.62), 30);
    g = couche('liqBP'); tube(g, liqBP, 12, 6); liquide(g, liqBP, 6, D.couleur(0.08), 32);
    g = couche('evap'); tube(g, evap, 14, 8);
    const [evapL, evapV] = couper(evap, 0.55);
    liquide(g, evapL, 8, D.couleur(0.08), 30); bulles(g, evapL, 8, 30); vapeur(g, evapV, 8, 0.16, 55, 20);
    g = couche('gaz'); tube(g, gaz, 20, 14); vapeur(g, gaz, 14, 0.18, 60, 26);

    /* le compresseur et le détendeur */
    g = couche('compr');
    D.el('rect', { x: 860, y: 410, width: 80, height: 60, rx: 12, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, g);
    g = couche('detendeur');
    D.el('path', { d: 'M138 395 h24 l-12 17 z M138 429 h24 l-12 -17 z', fill: C.papier, stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);

    /* l'eau sanitaire : sortie en haut (chaude), entrée en bas (froide) */
    g = couche('eauChaude'); tube(g, eauC, 12, 6); liquide(g, eauC, 6, D.couleur(0.72), 26);
    g = couche('eauFroide'); tube(g, eauF, 12, 6); liquide(g, eauF, 6, EAU, 26);

    /* les étiquettes, par-dessus tout ; chacune a sa place libre */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700 });
      return t;
    };
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' };
    ecrire(516, 190, 'condenseur', 'cond', C.chaud, Object.assign({}, G, F));
    ecrire(516, 217, 'tube enroulé', null, null, F);
    ecrire(516, 244, 'contre la cuve', null, null, F);
    ecrire(340, 304, 'liquide', 'liqHP', C.orange, Object.assign({}, G, M));
    ecrire(176, 429, 'détendeur', 'detendeur', C.froid, G);
    ecrire(886, 210, 'gaz chaud', 'refoul', C.chaud, Object.assign({}, G, F));
    ecrire(850, 446, 'compresseur', 'compr', C.chaud, Object.assign({}, G, F));
    ecrire(474, 416, 'ventilateur', 'ventilo', C.navy);
    ecrire(516, 521, 'évaporateur', 'evap', C.froid, G);
    ecrire(490, 614, 'air de la pièce', 'air', C.ambre);
    ecrire(480, 386, 'air plus froid, plus sec', 'air', C.froid);
    ecrire(762, 100, 'eau chaude', 'eauChaude', C.ambre);
    ecrire(762, 280, 'eau froide', 'eauFroide', C.eau);
    ecrire(655, 108, 'la plus chaude', 'cuve', C.chaud, M);
    ecrire(655, 218, 'la chaleur', 'chaleur', C.ambre, M);
    ecrire(655, 245, 'traverse la paroi', 'chaleur', C.ambre, M);
    ecrire(655, 336, 'la plus froide', 'cuve', C.froid, M);

    /* une image : tout avance selon t */
    const image = t => { helice(t * 260); anime.forEach(f => f(t)); };
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
      ['air', 'ventilo', 'evap'],
      ['compr', 'refoul', 'gaz'],
      ['refoul', 'cond', 'chaleur', 'cuve'],
      ['detendeur', 'liqHP', 'liqBP'],
      ['cuve', 'eauChaude', 'eauFroide']
    ];
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : RETRAIT));
      etiquettes.forEach(e => { const oui = on.has(e.c); e.t.setAttribute('fill', oui ? e.coul : C.navy); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400); });
    };

    const etapes = [
      { titre: 'L’air de la pièce traverse l’évaporateur',
        dire: 'Le ventilateur aspire l’air de la pièce et le fait passer dans l’évaporateur. Le fluide qui y circule est plus froid que cet air : il prend sa chaleur, bout et devient gaz. L’air ressort plus froid, et plus sec : une partie de son humidité se dépose en gouttes, les condensats.',
        peindre: () => allumer(0) },
      { titre: 'Le compresseur refoule un gaz chaud',
        dire: 'Le compresseur aspire ce gaz et le comprime. En sortie il est plus chaud que l’eau du ballon : sans cela, il ne pourrait pas la chauffer. Il part vers le condenseur.',
        peindre: () => allumer(1) },
      { titre: 'Le gaz chaud chauffe l’eau à travers la paroi',
        dire: 'Le condenseur est un tube enroulé contre la paroi extérieure de la cuve. Le gaz y cède sa chaleur à l’eau, à travers la paroi, et redevient liquide. Le fluide ne touche jamais l’eau qu’on boit : seule la chaleur traverse.',
        peindre: () => allumer(2) },
      { titre: 'Le détendeur : le fluide repart froid',
        dire: 'Le liquide passe le détendeur : sa pression tombe d’un coup, il redevient froid et repart vers l’évaporateur. Le tour recommence.',
        peindre: () => allumer(3) },
      { titre: 'L’eau chaude monte : on puise en haut',
        dire: 'L’eau chauffée, plus légère, monte et reste en haut de la cuve. On puise tout en haut ; l’eau froide entre en bas et ne se mélange pas : l’eau se range par couches.',
        peindre: () => allumer(4) }
    ];
    return pasAPas(d, etapes,
      'Dans l’appareil réel, l’évaporateur est en haut, sous le capot. Le dessin garde la croix du frigoriste : détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas. Le circuit est fermé et chargé en usine : on ne s’en occupe pas à la pose.');
  }

  /* ------------------------------------------------------------------------------------------
     Temps 2 — dessin 2 : trois états de la cuve. Même ballon, grandi : ce qui agit change.      */
  function lesTroisEtats() {
    const d = svg('0 0 820 480',
      'Trois états commutables du ballon en coupe. La pompe à chaleur seule : le tube enroulé contre la paroi chauffe l’eau, et le groupe de sécurité goutte. Avec l’appoint : la résistance, en bas de la cuve, s’allume en plus. On puise : l’eau froide entre en bas, l’eau chaude sort en haut, et les couches restent séparées.');
    let etat = 'pac';
    const CUVE = 'M300 100 Q300 60 340 60 H460 Q500 60 500 100 V380 Q500 420 460 420 H340 Q300 420 300 380 Z';
    const ZIGZAG = 'M340 380 l10 -14 l10 28 l10 -28 l10 28 l10 -28 l10 28 l10 -28 l10 28 l10 -28 l10 28 l10 -28 l10 14';

    const peindre = () => {
      const pac = etat === 'pac', app = etat === 'app', puise = etat === 'puise';
      const goutte = pac || app;
      d.innerHTML = `
<defs>${pointe('ce2-hp', hp)}${pointe('ce2-chaud', eauChaude)}${pointe('ce2-froid', eauFroide)}${pointe('ce2-chal', eauChaude)}${pointe('ce2-feu', C.feu)}</defs>
<rect x="10" y="10" width="800" height="460" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- la cuve : les couches d'eau (la limite monte quand on puise) -->
${couches('ce2-cuve', CUVE, 300, 200, 60, 420, puise ? 150 : 200)}
<path d="${CUVE}" fill="none" stroke="${C.navy}" stroke-width="4" stroke-linejoin="round"/>
${puise ? `${T(430, 100, 'la plus chaude', { ancre: 'middle', taille: 15 })}
${T(400, 290, 'la plus froide', { ancre: 'middle', taille: 15 })}` : ''}

<!-- l'anode, accrochée en haut -->
<path d="M330 63 V150" stroke="${C.gris}" stroke-width="9" stroke-linecap="round"/>
${T(346, 134, 'anode', { couleur: C.gris, gras: false })}

<!-- le tube enroulé contre la paroi : le condenseur -->
${tube('M200 44 H288 V100', hp, pac, 'ce2-hp')}
${T(192, 49, 'gaz chaud', { ancre: 'end', couleur: pac ? hp : C.gris, taille: 15 })}
${tube(serpentin(288, 100, 11), hp, pac, null, 5)}
${T(262, 232, 'tube enroulé', { ancre: 'end', couleur: pac ? hp : C.navy })}
${T(262, 255, 'contre la cuve', { ancre: 'end', taille: 15, gras: false })}
${tube('M288 364 V400 H200', hp, pac, 'ce2-hp')}
${T(192, 405, 'liquide', { ancre: 'end', couleur: pac ? hp : C.gris, taille: 15 })}
${pac ? fleches(['M312 160 h40', 'M312 240 h40', 'M312 320 h40'], eauChaude, 'ce2-chal', 4) : ''}

<!-- la résistance d'appoint, en bas -->
${app ? `<path d="${ZIGZAG}" fill="none" stroke="${C.feu}" stroke-opacity=".35" stroke-width="18" stroke-linejoin="round" stroke-linecap="round"/>` : ''}
<path d="${ZIGZAG}" fill="none" stroke="${app ? C.rouge : C.gris}" stroke-width="${app ? 5 : 4}" stroke-linejoin="round"/>
${T(400, 352, 'résistance', { ancre: 'middle', couleur: app ? C.rouge : C.gris, taille: 15 })}
${app ? fleches(['M350 358 V318', 'M450 358 V318'], C.feu, 'ce2-feu', 4) : ''}

<!-- le côté eau : sortie en haut avec son mitigeur, entrée en bas avec son groupe de sécurité -->
${tube('M502 100 H590', eauChaude, puise, null)}
<rect x="590" y="84" width="50" height="32" rx="6" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
${tube('M640 100 H720', eauChaude, puise, 'ce2-chaud')}
${T(615, 72, 'mitigeur thermostatique', { ancre: 'middle', taille: 15 })}
${T(680, 140, 'eau chaude', { ancre: 'middle', couleur: puise ? eauChaude : C.gris })}
${tube('M720 330 H650', eauFroide, puise, null)}
<rect x="600" y="314" width="50" height="32" rx="6" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
${tube('M600 330 H504', eauFroide, puise, 'ce2-froid')}
${T(625, 304, 'groupe de sécurité', { ancre: 'middle', taille: 15 })}
${T(550, 366, 'eau froide', { ancre: 'middle', couleur: puise ? eauFroide : C.gris })}
<path d="M625 346 V394" stroke="${goutte ? eauFroide : C.trait}" stroke-width="3"/>
${goutte ? `<path d="M625 400 C619 408 617 413 620 418 C622 422 628 422 630 418 C633 413 631 408 625 400 Z" fill="${eauFroide}" fill-opacity=".55" stroke="${eauFroide}" stroke-width="2"/>
${T(644, 416, 'écoulement', { couleur: eauFroide, taille: 15 })}` : ''}`;
    };

    const appliquer = k => () => { etat = k; peindre(); };
    peindre();
    return etats(d, [
      { id: 'pac', libelle: 'La pompe à chaleur seule', appliquer: appliquer('pac'),
        legende: 'La pompe à chaleur seule : le gaz chaud du tube enroulé cède sa chaleur à l’eau, à travers la paroi. L’eau chauffée monte et se range en haut. En chauffant, l’eau gonfle un peu : le groupe de sécurité laisse partir le surplus par son écoulement. Ça goutte, c’est normal.' },
      { id: 'app', libelle: 'Avec l’appoint', appliquer: appliquer('app'),
        legende: 'Avec l’appoint : si l’air est trop froid, ou si l’on a besoin d’eau chaude vite, la résistance se met en route et chauffe l’eau directement. Pour la même chaleur, elle consomme plus d’électricité que la pompe à chaleur. Laissée forcée en permanence, elle fait de l’appareil un simple chauffe-eau électrique.' },
      { id: 'puise', libelle: 'On puise', appliquer: appliquer('puise'),
        legende: 'On puise : l’eau froide entre en bas, par le groupe de sécurité ; l’eau chaude sort tout en haut, souvent par un mitigeur thermostatique qui la mélange d’eau froide pour que le robinet ne brûle pas. Les couches ne se mélangent pas : la limite entre l’eau chaude et l’eau froide monte à mesure qu’on puise.' }
    ], 'pac', 'La pompe à chaleur seule : le gaz chaud du tube enroulé cède sa chaleur à l’eau, à travers la paroi. L’eau chauffée monte et se range en haut. En chauffant, l’eau gonfle un peu : le groupe de sécurité laisse partir le surplus par son écoulement. Ça goutte, c’est normal.');
  }

  /* Le temps 2 montre les deux dessins l'un sous l'autre. */
  function leChauffeEau() {
    const hote = document.createElement('div');
    const intro = document.createElement('p');
    intro.className = 'legende';
    intro.style.cssText = 'font-weight:700;color:' + C.navy + ';margin:1rem 0 .3rem';
    intro.textContent = 'Dans la cuve, trois façons de chauffer ou de puiser :';
    hote.append(trajetDeLaChaleur(), intro, lesTroisEtats());
    return hote;
  }

  /* ------------------------------------------------------------------------------------------
     Temps 5 — le récapitulatif : ce qu'on raccorde, puis les trois compteurs du banc.           */
  function recapitulatif() {
    const d = svg('0 0 820 520',
      'Récapitulatif. En haut, le chauffe-eau avec ses cinq raccordements : l’air de la pièce ou une gaine, l’alimentation électrique avec sa protection, l’eau chaude en sortie, l’eau froide en entrée avec son groupe de sécurité, et les condensats vers l’évacuation. En bas, les trois compteurs du banc du lycée : un compteur électrique sur la pompe à chaleur, un sur la résistance, un compteur d’énergie sur l’eau chaude.');
    const boite = (x, a, b, c, couleur) => `
<rect x="${x}" y="398" width="230" height="78" rx="12" fill="${C.creme}" stroke="${couleur}" stroke-width="3"/>
${T(x + 115, 424, a, { ancre: 'middle', couleur })}
${T(x + 115, 446, b, { ancre: 'middle', taille: 15, gras: false })}
${T(x + 115, 466, c, { ancre: 'middle', taille: 14, couleur: C.gris, gras: false })}`;
    d.innerHTML = `
<defs>${pointe('rc-air', C.navy)}${pointe('rc-chaud', eauChaude)}${pointe('rc-froid', eauFroide)}${pointe('rc-elec', C.navy)}</defs>
<rect x="10" y="10" width="800" height="500" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${T(410, 42, 'Cinq raccordements', { ancre: 'middle', taille: 17 })}

<!-- l'appareil -->
<rect x="300" y="70" width="220" height="210" rx="16" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${T(410, 150, 'chauffe-eau', { ancre: 'middle', taille: 17 })}
${T(410, 174, 'thermodynamique', { ancre: 'middle', taille: 17 })}
${T(410, 204, 'ballon + pompe à chaleur', { ancre: 'middle', taille: 14, gras: false, couleur: C.gris })}

<!-- à gauche : l'air et l'électricité -->
${fleches(['M110 110 H296'], C.navy, 'rc-air', 5)}
${T(203, 92, 'air de la pièce', { ancre: 'middle', couleur: C.navy })}
${T(203, 136, 'ou une gaine', { ancre: 'middle', taille: 14, gras: false, couleur: C.gris })}
${fleches(['M110 220 H296'], C.navy, 'rc-elec', 5)}
${T(203, 202, 'alimentation', { ancre: 'middle', couleur: C.navy })}
${T(203, 246, 'avec sa protection', { ancre: 'middle', taille: 14, gras: false, couleur: C.gris })}

<!-- à droite : l'eau chaude qui sort, l'eau froide qui entre -->
${fleches(['M524 110 H710'], eauChaude, 'rc-chaud', 5)}
${T(617, 92, 'eau chaude', { ancre: 'middle', couleur: eauChaude })}
${T(617, 136, 'souvent un mitigeur', { ancre: 'middle', taille: 14, gras: false, couleur: C.gris })}
${fleches(['M710 220 H524'], eauFroide, 'rc-froid', 5)}
${T(617, 202, 'eau froide', { ancre: 'middle', couleur: eauFroide })}
${T(617, 246, 'groupe de sécurité', { ancre: 'middle', taille: 14, gras: false, couleur: C.gris })}
${T(617, 266, 'écoulement jamais bouché', { ancre: 'middle', taille: 14, gras: false, couleur: C.gris })}

<!-- en bas : les condensats -->
${fleches(['M410 284 V336'], eauFroide, 'rc-froid', 5)}
${T(428, 312, 'condensats', { couleur: eauFroide })}
${T(428, 332, 'en pente, vers l’évacuation', { taille: 14, gras: false, couleur: C.gris })}

<!-- le banc du lycée -->
<line x1="40" y1="356" x2="780" y2="356" stroke="${C.trait}" stroke-width="3" stroke-dasharray="10 8"/>
${T(410, 384, 'Sur le banc du lycée : trois compteurs', { ancre: 'middle' })}
${boite(30, 'compteur électrique', 'sur la pompe à chaleur', '750' + NBSP + 'W au plus', C.navy)}
${boite(295, 'compteur électrique', 'sur la résistance', '1' + NBSP + '800' + NBSP + 'W', C.navy)}
${boite(560, 'compteur d’énergie', 'sur l’eau chaude', 'volume, températures, énergie', eauChaude)}
${T(280, 498, 'ce qu’on paie', { ancre: 'middle', taille: 15, gras: false, couleur: C.gris })}
${T(675, 498, 'ce que l’eau reçoit', { ancre: 'middle', taille: 15, gras: false, couleur: C.gris })}`;
    return d;
  }

  return { leChauffeEau, trajetDeLaChaleur, lesTroisEtats, recapitulatif };
})();

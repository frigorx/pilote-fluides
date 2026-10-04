/* CartoClim 3.7 — scènes de la PAC air/eau.
   Temps 2 (et temps 1, devant les photos : scene-devant.js), premier dessin : le trajet de la chaleur, de
   l'air du dehors à l'émetteur, en six pas, avec l'AIR, le FLUIDE et l'EAU qui circulent (« Animer les
   réseaux », 04/10/2026, sur le modèle de la 3.2).
   Croix du frigoriste (charte R6) : détendeur à gauche, compresseur à droite, condenseur à plaques
   en haut (dedans, côté eau), évaporateur en bas (dehors, côté air). Machine dessinée en bibloc :
   les deux liaisons frigorifiques (rouges) traversent le mur, l'eau reste dedans. Le condenseur est
   alimenté par le haut.
   Temps 2, second dessin : trois états — basse, moyenne, haute température — où l'émetteur, l'eau
   demandée et l'effort de la machine changent.
   Temps 5 : un récapitulatif dessiné — les trois familles, puis ce qui traverse le mur
   (monobloc ou bibloc).

   Ce qui bouge (tout se calcule à partir du temps t, requestAnimationFrame — ni SMIL ni animation CSS) :
   · l'air : des chevrons qui montent à travers l'évaporateur, couleur = température (l'air du dehors
     ressort plus froid) ; le ventilateur tourne ; la chaleur de l'émetteur passe à la pièce ;
   · le fluide : LIQUIDE = tube plein, des reflets qui filent ; VAPEUR = petites molécules séparées ;
     dans l'évaporateur le liquide bout (bulles), dans le condenseur à plaques la vapeur se condense
     (gouttes) pendant que l'eau monte en s'échauffant, canal contre canal, sans jamais se mêler ;
   · l'eau : tubes pleins à reflets (départ chaud, retour tiède) ; l'eau chaude descend dans l'émetteur ;
   · le givre (pas 6) : l'air du dehors ralentit et pâlit, une croûte et des flocons couvrent la batterie ;
   · le pas à pas allume la partie qui agit ; le reste continue de tourner, en retrait.
   L'interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche.

   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — couleur de température, hélice, chevron,
   métal, filigrane R9. Aucun texte sur un tracé, ni sur le trajet d'un chevron ou d'une molécule :
   vérifié par outils/controler-station-navigateur.mjs. Étiquettes en taille 21 dans 1 000 : au moins
   18,7 px quand la scène est devant, à 1 280 px. Aucune valeur chiffrée : ni température, ni puissance,
   ni rendement. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;
  const hp = C.chaud;                                /* fluide : haute pression rouge */
  const eauChaude = C.ambre, eauTiede = C.eau;       /* eau du chauffage : départ ambre · retour vert-bleu */

  /* Une pointe de flèche à taille fixe, quelle que soit l'épaisseur du trait. */
  const pointe = (id, couleur) =>
    `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="13" markerHeight="13" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${couleur}"/></marker>`;
  /* Plusieurs flèches : un marqueur de fin ne s'applique qu'au dernier sous-tracé, donc un tracé par flèche. */
  const fleches = (chemins, couleur, marque, w = 4) =>
    chemins.map(c => `<path d="${c}" fill="none" stroke="${couleur}" stroke-width="${w}" marker-end="url(#${marque})"/>`).join('');
  const T = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}"${o.ancre ? ` text-anchor="${o.ancre}"` : ''} font-size="${o.taille || 15}"${o.gras === false ? '' : ' font-weight="700"'} fill="${o.couleur || C.navy}">${t}</text>`;

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
     Temps 2 — dessin 1 : le trajet de la chaleur, de l'air du dehors à l'émetteur, en six pas.  */
  function trajetDeLaChaleur() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 640',
      'Une pompe à chaleur air/eau en bibloc, vue en schéma, en marche : dehors, l’air du dehors monte à travers l’évaporateur, balayé par un ventilateur, et ressort plus froid ; le compresseur est à droite et le détendeur à gauche ; dedans, en haut, le condenseur à plaques où le fluide chauffe l’eau, un circulateur et l’émetteur qui rend la chaleur à la pièce. Deux liaisons frigorifiques traversent le mur ; l’eau reste dedans.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CUIVRE = '#c57a45', CUIVRE_BORD = '#7a3f1c', CREUX = '#f4f8fc', EAU = '#4f9fc0';
    const CHAUD = D.couleur(0.72);                         /* l'eau du départ */
    const couche = c => D.el('g', { 'data-c': c }, d);     /* une partie du dessin, que le pas à pas allume */
    const anime = [];                                      /* ce que chaque image fait avancer */
    let debit = 1, debitVu = 1;                            /* le débit de l'air dehors : il tombe quand le givre bouche l'évaporateur */

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 628, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 178], [500, 330], [765, 482]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    /* dedans / dehors */
    D.el('rect', { x: 40, y: 24, width: 920, height: 258, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 40, y: 326, width: 920, height: 298, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('line', { x1: 20, y1: 304, x2: 880, y2: 304, stroke: C.gris, 'stroke-width': 10, 'stroke-dasharray': '26 12' }, d);

    /* les ailettes de l'évaporateur : l'air monte entre elles */
    let g = couche('evap');
    for (let i = 0; i < 8; i++) D.el('line', { x1: 400 + i * 20, y1: 473, x2: 400 + i * 20, y2: 567, stroke: C.trait, 'stroke-width': 2 }, g);

    /* le ventilateur, au-dessus de l'évaporateur */
    const helice = D.ventilateur(couche('ventilo'), 470, 420, 48);

    /* l'air : des chevrons qui avancent ; leur couleur suit la température, qui change dans la batterie.
       bride : l'air du dehors ralentit et pâlit quand le givre bouche l'évaporateur (debit) */
    const air = (c, tr, temp, v, bride) => {
      const k = 0.5, gc = D.el('g', { transform: 'scale(' + k + ')' }, couche(c)), n = Math.max(2, Math.round(tr.L / 49));
      const rep = Array.from({ length: n }, () => D.chevron(gc));
      let phase = 0, avant = null;
      anime.push(t => {
        const q = bride ? debitVu : 1;
        if (avant !== null) phase += (t - avant) * v * q;
        avant = t;
        rep.forEach((ch, i) => {
          const f = D.frac(i / n + phase / tr.L), [x, y, ang] = tr.a(f * tr.L);
          ch(x / k, y / k, ang - 90, D.couleur(temp(f * tr.L)), D.fenetre(f, 0, 1, 0.06) * (0.25 + 0.75 * q));
        });
      });
    };
    [425, 470, 515].forEach(x => air('air', trajet([[x, 612], [x, 332]]),
      s => s < 45 ? 0.3 : s > 139 ? 0 : D.lerp(0.3, 0, (s - 45) / 94), 75, true));      /* la batterie va de y = 567 à y = 473 */

    /* le condenseur à plaques : le fluide descend dans un canal sur deux, l'eau monte dans les autres */
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

    g = couche('cond');
    D.el('rect', { x: 380, y: 100, width: 160, height: 74, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    [410, 450, 490, 530].forEach(x => {                    /* le fluide se condense : vapeur, gouttes, puis liquide */
      const [v, l] = couper(trajet([[x, 106], [x, 168]]), 0.55);
      vapeur(g, v, 12, 0.92, 40, 14, 0.55); liquide(g, l, 12, D.couleur(0.62), 30);
    });
    [390, 430, 470, 510].forEach(x => {                    /* l'eau s'échauffe en montant */
      const [b, h] = couper(trajet([[x, 168], [x, 106]]), 0.5);
      liquide(g, b, 12, EAU, 26); liquide(g, h, 12, CHAUD, 26);
    });
    for (let i = 1; i < 8; i++) D.el('line', { x1: 380 + i * 20, y1: 100, x2: 380 + i * 20, y2: 174, stroke: C.navy, 'stroke-width': 2 }, g);

    /* l'émetteur (un radiateur) : l'eau chaude descend entre les éléments, la chaleur passe à la pièce */
    g = couche('emetteur');
    D.el('rect', { x: 640, y: 72, width: 120, height: 110, rx: 8, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('rect', { x: 643, y: 75, width: 114, height: 104, rx: 6, fill: CHAUD, 'fill-opacity': 0.28, stroke: 'none' }, g);
    for (let i = 0; i < 7; i++) D.el('line', { x1: 655 + i * 15, y1: 84, x2: 655 + i * 15, y2: 170, stroke: C.navy, 'stroke-width': 2.5 }, g);
    for (let i = 0; i < 6; i++) {
      const tr = trajet([[662.5 + i * 15, 84], [662.5 + i * 15, 170]]);
      D.el('path', { d: tr.d, fill: 'none', stroke: C.papier, 'stroke-width': 3, 'stroke-dasharray': '8 22', opacity: 0.85 }, g);
      const r = g.lastChild;
      anime.push(t => r.setAttribute('stroke-dashoffset', (-(t * 24 + i * 9) % 30).toFixed(1)));
    }
    [100, 127, 154].forEach(y => air('emetteur', trajet([[764, y], [872, y]]), s => D.lerp(0.82, 0.62, s / 108), 60, false));

    /* le parcours, dans le sens du fluide : le condenseur est alimenté par le haut */
    const refoul = trajet([[885, 380], [885, 52], [530, 52], [530, 100]]);
    const liqHP = trajet([[380, 160], [90, 160], [90, 420]]);
    const liqBP = trajet([[90, 454], [90, 490], [390, 490]]);
    const evap = trajet([[390, 490], [550, 490], ...coude(550, 490, 520, 1), [550, 520], [390, 520], ...coude(390, 520, 550, -1), [390, 550], [550, 550]]);
    const gaz = trajet([[550, 550], [885, 550], [885, 440]]);
    const eauC = trajet([[540, 126], [640, 126]]);
    const eauR = trajet([[750, 182], [750, 232], [470, 232], [470, 174]]);

    g = couche('refoul'); tube(g, refoul, 16, 10); vapeur(g, refoul, 10, 0.95, 85, 20);
    g = couche('liqHP'); tube(g, liqHP, 12, 6); liquide(g, liqHP, 6, D.couleur(0.62), 30);
    g = couche('liqBP'); tube(g, liqBP, 12, 6); liquide(g, liqBP, 6, D.couleur(0.08), 32);
    g = couche('evap'); tube(g, evap, 14, 8);
    const [evapL, evapV] = couper(evap, 0.55);
    liquide(g, evapL, 8, D.couleur(0.08), 30); bulles(g, evapL, 8, 30); vapeur(g, evapV, 8, 0.16, 55, 20);
    g = couche('gaz'); tube(g, gaz, 20, 14); vapeur(g, gaz, 14, 0.18, 60, 26);
    g = couche('eauChaude'); tube(g, eauC, 12, 6); liquide(g, eauC, 6, CHAUD, 26);
    g = couche('eauRetour'); tube(g, eauR, 12, 6); liquide(g, eauR, 6, EAU, 26);
    D.el('circle', { cx: 590, cy: 232, r: 17, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
    D.el('path', { d: 'M598 222 V242 L580 232 z', fill: C.navy }, g);                /* le circulateur : le triangle pointe dans le sens de l'eau */

    /* le compresseur et le détendeur */
    g = couche('compr');
    D.el('rect', { x: 850, y: 380, width: 70, height: 60, rx: 12, fill: 'url(#vm-acier)', stroke: C.navy, 'stroke-width': 3 }, g);
    g = couche('detendeur');
    D.el('path', { d: 'M78 420 h24 l-12 17 z M78 454 h24 l-12 -17 z', fill: C.papier, stroke: C.navy, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);

    /* le givre (pas 6 seulement) : une croûte sur les ailettes et des flocons */
    const givre = couche('givre');
    D.el('rect', { x: 392, y: 471, width: 158, height: 98, rx: 4, fill: C.doux, 'fill-opacity': 0.35, stroke: 'none' }, givre);
    [[412, 497], [452, 543], [492, 497], [532, 543], [554, 497]].forEach(([x, y]) =>
      D.el('path', { d: 'M' + (x - 7) + ' ' + (y - 7) + ' L' + (x + 7) + ' ' + (y + 7) + ' M' + (x - 7) + ' ' + (y + 7) + ' L' + (x + 7) + ' ' + (y - 7) +
        ' M' + (x - 9) + ' ' + y + ' H' + (x + 9) + ' M' + x + ' ' + (y - 9) + ' V' + (y + 9), fill: 'none', stroke: C.bleu, 'stroke-width': 2.5 }, givre));

    /* les étiquettes, par-dessus tout ; chacune a sa place libre. cache : l'étiquette n'apparaît qu'à son pas */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o, cache) => {
      const base = Object.assign({ 'font-size': 21, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      if (c) etiquettes.push({ t, c, coul, gras: base['font-weight'] === 700, cache });
      return t;
    };
    const G = { 'font-weight': 700 }, M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' };
    ecrire(60, 58, 'DEDANS — module hydraulique', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(120, 354, 'DEHORS — unité extérieure', null, null, { 'font-size': 22, 'font-weight': 700 });
    ecrire(902, 311, 'le mur', null, null, { fill: C.gris });
    ecrire(368, 114, 'condenseur', 'cond', C.chaud, Object.assign({}, G, F));
    ecrire(368, 141, 'à plaques', null, null, F);
    ecrire(690, 210, 'émetteur', 'emetteur', C.ambre, Object.assign({}, G, M));
    ecrire(560, 204, 'circulateur', 'eauRetour', C.eau, M);
    ecrire(372, 196, 'chaleur reprise sur l’eau', 'givre', C.eau, F, true);
    ecrire(576, 526, 'évaporateur', 'evap', C.froid, G);
    ecrire(576, 478, 'givre', 'givre', C.bleu, G, true);
    ecrire(534, 426, 'ventilateur', 'ventilo', C.navy);
    ecrire(540, 358, 'air refroidi', 'air', C.froid);
    ecrire(550, 608, 'air du dehors', 'air', C.navy);
    ecrire(840, 416, 'compresseur', 'compr', C.chaud, Object.assign({}, G, F));
    ecrire(116, 446, 'détendeur', 'detendeur', C.froid, G);

    /* une image : tout avance selon t */
    const image = t => { debitVu += (debit - debitVu) * 0.08; helice(t * 260); anime.forEach(f => f(t)); };
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
      ['refoul', 'cond', 'eauChaude'],
      ['eauChaude', 'emetteur', 'eauRetour'],
      ['detendeur', 'liqHP', 'liqBP'],
      ['givre', 'evap', 'cond']
    ];
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : RETRAIT));
      givre.setAttribute('opacity', on.has('givre') ? 1 : 0);
      etiquettes.forEach(e => {
        const oui = on.has(e.c);
        e.t.setAttribute('fill', oui ? e.coul : C.navy); e.t.setAttribute('font-weight', oui || e.gras ? 700 : 400);
        if (e.cache) e.t.setAttribute('opacity', oui ? 1 : 0);
      });
      debit = k === 5 ? 0.12 : 1;
      if (FIGE) { debitVu = debit; image(1.6); }
    };

    const etapes = [
      { titre: 'L’air du dehors donne sa chaleur à l’évaporateur',
        dire: 'Le ventilateur fait passer l’air extérieur dans la batterie. Le fluide qui y circule est plus froid que cet air, même par temps de gel : la chaleur passe de l’air au fluide, qui bout et devient gaz. L’air ressort plus froid.',
        peindre: () => allumer(0) },
      { titre: 'Le compresseur monte la pression',
        dire: 'Le compresseur aspire ce gaz et le comprime. En sortie il est très chaud, bien plus que l’eau à chauffer. Il part par la liaison gaz et traverse le mur.',
        peindre: () => allumer(1) },
      { titre: 'Le condenseur à plaques chauffe l’eau',
        dire: 'Dedans, le gaz chaud passe d’un côté des plaques, l’eau du chauffage de l’autre. Le fluide se refroidit et redevient liquide ; l’eau s’échauffe. Rien ne se mélange, seule la chaleur passe.',
        peindre: () => allumer(2) },
      { titre: 'L’eau part vers l’émetteur',
        dire: 'Le circulateur pousse l’eau chaude vers le radiateur ou le plancher, qui rend la chaleur à la pièce. L’eau revient plus tiède et repart vers le condenseur.',
        peindre: () => allumer(3) },
      { titre: 'Le détendeur fait chuter la pression',
        dire: 'Le fluide, redevenu liquide, repart vers le détendeur par la liaison liquide, qui traverse le mur. Sa pression tombe d’un coup, il redevient froid, et il repart vers l’évaporateur. Le tour recommence.',
        peindre: () => allumer(4) },
      { titre: 'Et par grand froid ? Le givre',
        dire: 'Par temps froid et humide, l’évaporateur se couvre de givre et l’air ne passe plus. La machine inverse son cycle quelques minutes pour faire fondre la glace : elle reprend alors de la chaleur sur l’eau du chauffage. C’est normal, ce n’est pas une panne.',
        peindre: () => allumer(5) }
    ];
    return pasAPas(d, etapes, 'Machine dessinée en bibloc. En monobloc, c’est l’eau, non le fluide, qui traverse le mur : le dessin du temps 5 les compare. L’inversion du cycle pour dégivrer : stations 2.6 et 2.7.');
  }

  /* ------------------------------------------------------------------------------------------
     Temps 2 — dessin 2 : trois états. Même mise en page : l'émetteur, l'eau demandée (le niveau
     du thermomètre), la montée de la chaleur (la pente de la flèche) et l'efficacité changent.   */
  function lesTroisFamilles() {
    const d = svg('0 0 820 400',
      'Trois états commutables : basse, moyenne ou haute température. À gauche l’air du dehors, froid ; au milieu un thermomètre qui montre l’eau demandée ; à droite l’émetteur : plancher chauffant, radiateurs adaptés ou anciens radiateurs en fonte. Plus l’eau est chaude, plus la flèche monte et moins la machine est à l’aise.');
    let fam = 'bt';
    const F = {
      bt: { titre: 'Basse température : le plancher chauffant', couleur: C.vert, niveau: '#e8b04a', h: 60, barres: 3, mot: 'la machine est à l’aise', xe: 566 },
      mt: { titre: 'Moyenne température : des radiateurs dimensionnés', couleur: C.ambre, niveau: '#e07a2f', h: 105, barres: 2, mot: 'elle travaille un peu plus', xe: 606 },
      ht: { titre: 'Haute température : d’anciens radiateurs en fonte', couleur: C.rouge, niveau: C.chaud, h: 150, barres: 1, mot: 'elle force : l’appoint peut démarrer', xe: 586 }
    };

    const emetteur = () => {
      if (fam === 'bt') {          /* le plancher : une dalle, un tube en serpentin */
        return `<rect x="570" y="230" width="200" height="100" rx="6" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<path d="M582 250 H748 c12 0 12 20 0 20 H592 c-12 0 -12 20 0 20 H748 c12 0 12 20 0 20 H582" fill="none" stroke="${C.ambre}" stroke-width="4"/>
${fleches(['M620 214 V176', 'M672 214 V166', 'M724 214 V176'], C.ambre, 'et-chaud')}
${T(670, 356, 'plancher chauffant', { ancre: 'middle' })}`;
      }
      if (fam === 'mt') {          /* un radiateur à panneau, plus grand que l'ancien pour une eau moins chaude */
        const fentes = [0,1,2,3,4,5,6].map(i => `<line x1="${625 + i * 15}" y1="165" x2="${625 + i * 15}" y2="285" stroke="${C.navy}" stroke-width="2.5"/>`).join('');
        return `<rect x="610" y="150" width="120" height="150" rx="8" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>${fentes}
<path d="M625 300 V316 M715 300 V316" stroke="${C.navy}" stroke-width="4"/>
${fleches(['M640 138 V104', 'M670 138 V100', 'M700 138 V104'], C.ambre, 'et-chaud')}
${T(670, 346, 'radiateurs adaptés', { ancre: 'middle' })}`;
      }
      /* haute : des colonnes de fonte, reliées par deux collecteurs */
      const cols = [0,1,2,3,4,5].map(i => `<rect x="${592 + i * 24}" y="150" width="18" height="150" rx="9" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>`).join('');
      return `${cols}
<path d="M586 168 H736 M586 282 H736" stroke="${C.navy}" stroke-width="3"/>
${fleches(['M610 138 V104', 'M661 138 V100', 'M712 138 V104'], C.ambre, 'et-chaud')}
${T(661, 336, 'anciens radiateurs en fonte', { ancre: 'middle' })}`;
    };

    const peindre = () => {
      const f = F[fam];
      const yNiveau = 317 - f.h;
      const barres = [0, 1, 2].map(i =>
        `<rect x="${50 + i * 28}" y="112" width="24" height="14" rx="3" fill="${i < f.barres ? f.couleur : C.trait}" stroke="none"/>`).join('');
      d.innerHTML = `
<defs>${pointe('et-chaud', C.ambre)}${pointe('et-fam', f.couleur)}</defs>
<rect x="10" y="10" width="800" height="380" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${T(410, 46, f.titre, { ancre: 'middle', taille: 18, couleur: f.couleur })}

<!-- l'efficacité de la machine -->
${T(50, 100, f.mot, { couleur: f.couleur })}
${barres}
${T(140, 125, 'efficacité', { couleur: C.gris, gras: false, taille: 14 })}

<!-- l'air du dehors : la machine, avec son ventilateur -->
<rect x="50" y="200" width="150" height="120" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="125" cy="260" r="34" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M125 226 v68 M91 260 h68 M101 236 l48 48 M149 236 l-48 48" stroke="${C.navy}" stroke-width="2"/>
${T(125, 345, 'air du dehors', { ancre: 'middle' })}

<!-- l'eau demandée : un thermomètre dont le niveau monte avec la famille -->
<rect x="470" y="160" width="30" height="160" rx="8" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<rect x="473" y="${yNiveau}" width="24" height="${f.h}" rx="5" fill="${f.niveau}" stroke="none"/>
${T(485, 345, 'eau demandée', { ancre: 'middle' })}

<!-- la chaleur monte : plus l'eau est chaude, plus la pente est forte -->
<path d="M205 290 L462 ${yNiveau}" fill="none" stroke="${f.couleur}" stroke-width="5" marker-end="url(#et-fam)"/>
${T(335, 372, 'le compresseur monte la chaleur', { ancre: 'middle', couleur: C.gris })}

<!-- l'eau part vers l'émetteur -->
<path d="M505 245 H${f.xe}" fill="none" stroke="${C.ambre}" stroke-width="5" marker-end="url(#et-chaud)"/>
${emetteur()}`;
    };

    const appliquer = k => () => { fam = k; peindre(); };
    peindre();
    return etats(d, [
      { id: 'bt', libelle: 'Basse température', appliquer: appliquer('bt'),
        legende: 'Basse température : le plancher chauffant. Il chauffe sur toute la surface du sol avec une eau tiède. L’écart à franchir entre l’air du dehors et l’eau est le plus petit : c’est là que la machine travaille le mieux.' },
      { id: 'mt', libelle: 'Moyenne température', appliquer: appliquer('mt'),
        legende: 'Moyenne température : des radiateurs dimensionnés pour une eau moins chaude qu’avec une chaudière — plus grands, ou plus nombreux. La machine monte la chaleur un peu plus haut : elle travaille un peu moins bien.' },
      { id: 'ht', libelle: 'Haute température', appliquer: appliquer('ht'),
        legende: 'Haute température : d’anciens radiateurs, en fonte par exemple, prévus pour l’eau d’une chaudière. Il faut une eau bien plus chaude : la machine monte la chaleur très haut, surtout quand il fait froid dehors, et l’appoint électrique peut prendre le relais sans qu’on le voie.' }
    ], 'bt', 'Basse température : le plancher chauffant. Il chauffe sur toute la surface du sol avec une eau tiède. L’écart à franchir entre l’air du dehors et l’eau est le plus petit : c’est là que la machine travaille le mieux.');
  }

  /* Le temps 2 montre les deux dessins l'un sous l'autre. */
  function laPacAirEau() {
    const hote = document.createElement('div');
    const intro = document.createElement('p');
    intro.className = 'legende';
    intro.style.cssText = 'font-weight:700;color:' + C.navy + ';margin:1rem 0 .3rem';
    intro.textContent = 'Selon la température de l’eau demandée, trois familles :';
    hote.append(trajetDeLaChaleur(), intro, lesTroisFamilles());
    return hote;
  }

  /* ------------------------------------------------------------------------------------------
     Temps 5 — le récapitulatif : les trois familles, puis ce qui traverse le mur.               */
  function recapitulatif() {
    const d = svg('0 0 820 460',
      'Récapitulatif en deux parties. En haut, trois familles selon la température de l’eau : basse pour le plancher chauffant, moyenne pour des radiateurs adaptés, haute pour d’anciens radiateurs. En bas, monobloc : toute la machine dehors, deux tuyaux d’eau traversent le mur ; bibloc : le circuit dehors, deux liaisons frigorifiques traversent le mur et l’eau reste dedans.');
    const cellule = (x, couleur, a, b, c, e) => `
<rect x="${x}" y="58" width="240" height="108" rx="12" fill="${C.creme}" stroke="${couleur}" stroke-width="3"/>
${T(x + 120, 86, a, { ancre: 'middle', couleur })}
${T(x + 120, 112, b, { ancre: 'middle', taille: 14, gras: false })}
${T(x + 120, 134, c, { ancre: 'middle', taille: 14, gras: false })}
${T(x + 120, 156, e, { ancre: 'middle', taille: 14, couleur })}`;
    d.innerHTML = `
<rect x="10" y="10" width="800" height="440" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${T(410, 40, 'Trois familles, selon la température de l’eau', { ancre: 'middle' })}
${cellule(30, C.vert, 'BASSE', 'plancher chauffant', 'eau tiède', 'la machine est à l’aise')}
${cellule(290, C.ambre, 'MOYENNE', 'radiateurs adaptés', 'eau plus chaude', 'un peu plus d’effort')}
${cellule(550, C.rouge, 'HAUTE', 'anciens radiateurs en fonte', 'eau très chaude', 'la machine force')}

<line x1="30" y1="190" x2="790" y2="190" stroke="${C.trait}" stroke-width="3" stroke-dasharray="10 8"/>
${T(410, 220, 'Monobloc ou bibloc : ce qui traverse le mur', { ancre: 'middle' })}
<line x1="410" y1="236" x2="410" y2="430" stroke="${C.trait}" stroke-width="3" stroke-dasharray="10 8"/>

<!-- monobloc -->
${T(215, 252, 'MONOBLOC', { ancre: 'middle', couleur: C.eau })}
<rect x="24" y="266" width="172" height="120" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${T(110, 296, 'dehors', { ancre: 'middle' })}
${T(110, 322, 'circuit frigorifique', { ancre: 'middle', taille: 14, gras: false })}
${T(110, 344, 'condenseur à plaques', { ancre: 'middle', taille: 14, gras: false })}
<rect x="221" y="256" width="12" height="140" fill="${C.gris}" fill-opacity=".3" stroke="none"/>
<path d="M196 300 H264" stroke="${eauChaude}" stroke-width="6"/>
<path d="M196 346 H264" stroke="${eauTiede}" stroke-width="6"/>
<rect x="264" y="266" width="130" height="120" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${T(329, 296, 'dedans', { ancre: 'middle' })}
${T(329, 322, 'émetteurs', { ancre: 'middle', taille: 14, gras: false })}
${T(329, 344, 'ballon d’eau', { ancre: 'middle', taille: 14, gras: false })}
${T(215, 414, '2 tuyaux d’eau traversent le mur', { ancre: 'middle', taille: 14, couleur: C.eau })}
${T(215, 436, 'il faut protéger l’eau du gel', { ancre: 'middle', taille: 14, couleur: C.ambre })}

<!-- bibloc -->
${T(605, 252, 'BIBLOC', { ancre: 'middle', couleur: C.chaud })}
<rect x="424" y="266" width="150" height="120" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${T(499, 296, 'dehors', { ancre: 'middle' })}
${T(499, 320, 'compresseur', { ancre: 'middle', taille: 14, gras: false })}
${T(499, 342, 'évaporateur', { ancre: 'middle', taille: 14, gras: false })}
${T(499, 364, 'détendeur', { ancre: 'middle', taille: 14, gras: false })}
<rect x="593" y="256" width="12" height="140" fill="${C.gris}" fill-opacity=".3" stroke="none"/>
<path d="M574 300 H632" stroke="${hp}" stroke-width="9"/>
<path d="M574 346 H632" stroke="${hp}" stroke-width="4"/>
<rect x="632" y="266" width="160" height="120" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${T(712, 296, 'dedans', { ancre: 'middle' })}
${T(712, 320, 'module hydraulique', { ancre: 'middle', taille: 14, gras: false })}
${T(712, 342, 'condenseur à plaques', { ancre: 'middle', taille: 14, gras: false })}
${T(605, 414, '2 liaisons frigorifiques traversent le mur', { ancre: 'middle', taille: 14, couleur: C.chaud })}
${T(605, 436, 'tirage au vide, comme pour un split', { ancre: 'middle', taille: 14 })}`;
    return d;
  }

  return { laPacAirEau, trajetDeLaChaleur, lesTroisFamilles, recapitulatif };
})();

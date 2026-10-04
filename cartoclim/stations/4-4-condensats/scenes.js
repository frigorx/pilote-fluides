/* CartoClim 4.4 — scènes des condensats. Temps 2 : le chemin de l'eau, en six pas
   (formation, pente bonne, contre-pente, siphon, pompe, flotteur). Coupe schématique :
   la pièce à gauche avec l'unité intérieure et son bac, le mur au milieu, dehors à droite.
   Pilote « Animer les réseaux » (04/10/2026) : ce chemin de l'eau est animé et passe aussi devant les photos au
   temps 1 (scene-devant.js). Tout se calcule à partir du temps t (requestAnimationFrame — ni SMIL ni animation
   CSS) : l'air de la pièce (chevrons, couleur = température) traverse la batterie, des gouttes tombent dans le
   bac (nappe qui ondule), l'eau coule dans le tuyau (filet au fond, tuyau plein, siphon, pompe). Les quatre
   montages du tuyau ne sont dans le dessin que pendant leur pas. Dessin : VOYAGE_DESSIN (jouerezo/moteur/
   voyage-dessin.js). Étiquettes en taille 21 dans 1 000 : 19,6 px à l'écran à 1 280 px.
   Temps 5 : une situation, sa réponse.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
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
  /* n repères régulièrement espacés qui avancent à v unités par seconde ; poser(repère, x, y, angle, f) */
  function filer(parent, tr, n, v, creer, poser) {
    const D = window.VOYAGE_DESSIN, rep = Array.from({ length: n }, (_, i) => creer(parent, i));
    return t => rep.forEach((e, i) => {
      const f = D.frac(i / n + t * v / tr.L), [x, y, ang] = tr.a(f * tr.L);
      poser(e, x, y, ang, f);
    });
  }
  /* un arc de cercle en points (angles en radians, y vers le bas) */
  const arc = (cx, cy, r, a0, a1, n = 12) =>
    Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  /* la ligne brisée décalée de e vers sa droite (vers le bas pour un tuyau qui va vers la droite) :
     le filet d'eau qui coule au fond d'un tuyau pas plein */
  function decaler(pts, e) {
    const normale = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l]; };
    return pts.map((p, i) => {
      const n1 = i > 0 ? normale(pts[i - 1], p) : null, n2 = i < pts.length - 1 ? normale(p, pts[i + 1]) : null;
      const m = n1 && n2 ? [n1[0] + n2[0], n1[1] + n2[1]] : n1 || n2, l = Math.hypot(m[0], m[1]) || 1;
      const u = [m[0] / l, m[1] / l], c = n1 && n2 ? Math.max(0.5, u[0] * n1[0] + u[1] * n1[1]) : 1;
      return [p[0] + u[0] * e / c, p[1] + u[1] * e / c];
    });
  }

  function cheminDeLeau() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 620',
      'Coupe schématique d’une unité intérieure murale et de l’évacuation de ses condensats : la batterie froide, le bac, puis selon l’étape un tuyau en pente jusqu’à dehors, un tuyau qui remonte et déborde, un siphon, une pompe de relevage et son flotteur.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const EAU = '#4f9fc0';
    const couche = c => D.el('g', { 'data-c': c }, d);     /* une partie du dessin, que le pas à pas allume */
    const anime = [];                                      /* ce que chaque image fait avancer */
    const etat = { froid: 1, niv: 0.29 }, cible = { froid: 1, niv: 0.29 };   /* ce qui s'installe doucement d'un pas à l'autre */

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 608, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 178], [500, 330], [765, 482]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    /* dans la pièce / dehors : le mur, et le sol dehors */
    D.el('line', { x1: 790, y1: 74, x2: 790, y2: 592, stroke: C.gris, 'stroke-width': 10, 'stroke-dasharray': '26 12' }, d);
    D.el('line', { x1: 802, y1: 580, x2: 976, y2: 580, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 215, y: 76, width: 370, height: 194, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);

    /* la batterie froide : des ailettes, deux rangs de tube */
    let g = couche('batterie');
    for (let i = 0; i < 9; i++) D.el('line', { x1: 330 + i * 20, y1: 124, x2: 330 + i * 20, y2: 208, stroke: C.trait, 'stroke-width': 2 }, g);
    const rangs = [154, 186].map(y => D.el('line', { x1: 322, y1: y, x2: 498, y2: y, stroke: C.froid, 'stroke-width': 5, 'stroke-linecap': 'round' }, g));

    /* l'air : des chevrons qui avancent ; leur couleur suit la température, qui baisse dans la batterie
       tant que le froid marche */
    const sortie = () => D.lerp(0.6, 0.08, etat.froid);
    const air = y => {
      const k = 0.5, h = D.el('g', { transform: 'scale(' + k + ')' }, g), tr = trajet([[14, y], [632, y]]);
      const temp = x => x < 326 ? 0.6 : x > 494 ? sortie() : D.lerp(0.6, sortie(), (x - 326) / 168);
      anime.push(filer(h, tr, 13, 75, p => D.chevron(p),
        (ch, x, yy, ang, f) => ch(x / k, yy / k, ang - 90, D.couleur(temp(x)), D.fenetre(f, 0, 1, 0.06))));
    };
    g = couche('air');
    [138, 170, 202].forEach(air);

    /* l'eau naît sur la batterie : des gouttes tombent dans le bac, tant que le froid marche */
    const gouttes = (parent, nb, graine, k) => D.bulles(D.el('g', { transform: 'scale(' + k + ')' }, parent), nb, graine, true);
    const KG = 0.8;
    g = couche('gouttes');
    const surBatterie = gouttes(g, 8, 32, KG);
    anime.push(t => surBatterie(t, q => [(332 + q * 156) / KG, 208 / KG, (262 - 30 * etat.niv - 3) / KG, etat.froid, EAU]));

    /* le bac : une nappe qui ondule ; son niveau dépend du pas (écrasée en hauteur : un bac mince) */
    g = couche('bac');
    const eauBac = D.liquide(D.el('g', { transform: 'translate(0 262) scale(1 0.5) translate(0 -262)' }, g),
      { x0: 264, x1: 536, yh: 202, yb: 262, niveau: () => etat.niv, couleur: () => EAU, pas: 12 });
    anime.push(t => eauBac.maj(t));
    const contourBac = D.el('path', { d: 'M262 232 V262 H538 V232', fill: 'none', stroke: C.eau, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);

    /* ---------- les tuyaux, et ce qui coule dedans ---------- */
    const tuyau = (parent, pts, ext, int) => {
      const t = { d: trajet(pts).d, fill: 'none', 'stroke-linejoin': 'round' };
      D.el('path', Object.assign({ stroke: C.gris, 'stroke-width': ext }, t), parent);
      D.el('path', Object.assign({ stroke: C.papier, 'stroke-width': int }, t), parent);
    };
    /* tuyau plein : l'eau le remplit, des reflets filent dans le sens de l'écoulement (v = 0 : l'eau ne bouge pas) */
    const plein = (parent, pts, int, v) => {
      const t = { d: trajet(pts).d, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
      D.el('path', Object.assign({ stroke: EAU, 'stroke-width': int, opacity: 0.92 }, t), parent);
      const reflet = D.el('path', Object.assign({ stroke: C.papier, 'stroke-width': Math.max(1.6, int * 0.28), 'stroke-dasharray': '12 30', opacity: 0.85 }, t), parent);
      if (v) anime.push(t2 => reflet.setAttribute('stroke-dashoffset', (-(t2 * v) % 42).toFixed(1)));
    };
    /* tuyau pas plein : un filet d'eau au fond */
    const filet = (parent, pts, int, v) => plein(parent, decaler(pts, int * 0.28), int * 0.44, v);
    const etiq = (parent, x, y, s, coul, o) => D.texte(parent, x, y, s, Object.assign({ 'font-size': 21, 'font-weight': 700, fill: coul }, o || {}));
    const F = { 'text-anchor': 'end' }, M = { 'text-anchor': 'middle' };
    const niveau = (parent, x0, x1, y) => D.el('path', { d: 'M' + x0 + ' ' + y + ' H' + x1, fill: 'none', stroke: C.gris, 'stroke-width': 2, 'stroke-dasharray': '6 6' }, parent);
    /* des gouttes qui tombent d'un point jusqu'au sol (ou plus bas) */
    const tombe = (parent, x, y0, y1, nb, graine, vis) => {
      const f = gouttes(parent, nb, graine, 1);
      anime.push(t => f(t, q => [x + (q - 0.5) * 6, y0, y1, vis, EAU]));
    };

    /* les quatre montages du tuyau : chacun n'est dans le dessin que pendant son pas (ils ne se superposent pas) */
    /* 0 · avant que l'eau n'arrive : le tuyau en pente, vide */
    const v0 = D.el('g', {});
    tuyau(v0, [[538, 246], [612, 246], [930, 394]], 20, 14);

    /* 1 · en pente continue : un filet au fond, qui descend tout seul jusqu'à dehors */
    const pente = [[538, 246], [612, 246], [930, 394]];
    const v1 = D.el('g', {});
    tuyau(v1, pente, 20, 14); filet(v1, pente, 14, 38);
    niveau(v1, 612, 930, 246);
    tombe(v1, 930, 398, 572, 8, 21, 1);
    etiq(v1, 612, 372, 'pente continue', C.eau);
    etiq(v1, 905, 470, 'l’eau sort', C.eau, F);
    etiq(v1, 905, 497, 'toute seule', C.eau, F);

    /* 2 · un point bas : le tuyau se remplit, l'eau reste là, remonte dans le bac, qui déborde */
    const creux = [[538, 246], [612, 246], [692, 322], [800, 216], [930, 264]];
    const v2 = D.el('g', {});
    tuyau(v2, creux, 20, 14); plein(v2, [[538, 246], [612, 246], [692, 322], [769, 246]], 14, 0);
    niveau(v2, 612, 930, 246);
    tombe(v2, 380, 276, 372, 4, 52, 1);
    etiq(v2, 690, 372, 'point bas :', C.rouge, M);
    etiq(v2, 690, 399, 'l’eau reste là', C.rouge, M);
    etiq(v2, 815, 196, 'ça remonte', C.rouge);
    etiq(v2, 340, 372, 'le bac déborde', C.rouge, F);

    /* 3 · le siphon : un coude en U garde un bouchon d'eau ; les odeurs de l'évacuation s'arrêtent dessous */
    const v3 = D.el('g', {});
    const entree3 = [[538, 246], [612, 246], [660, 276], [660, 318]];
    const bouchon = [[660, 318], ...arc(692, 352, 32, Math.PI, 0), [724, 318]];
    const sortie3 = [[724, 318], [760, 318], [760, 596]];
    tuyau(v3, [[538, 246], [612, 246], [660, 276], ...arc(692, 352, 32, Math.PI, 0), [724, 318], [760, 318], [760, 596]], 20, 14);
    filet(v3, entree3, 14, 38); plein(v3, bouchon, 14, 8); filet(v3, sortie3, 14, 45);
    const odeurs = D.el('path', { d: 'M765 560' + ' q-4 -7 0 -14' + ' t0 -14'.repeat(14), fill: 'none', stroke: C.ambre, 'stroke-width': 2.5,
      'stroke-linecap': 'round', 'stroke-dasharray': '34 22' }, v3);
    anime.push(t => odeurs.setAttribute('stroke-dashoffset', (-((t * 26) % 56)).toFixed(1)));
    etiq(v3, 640, 372, 'bouchon d’eau', C.eau, F);
    etiq(v3, 692, 430, 'siphon', C.navy, M);
    etiq(v3, 742, 480, 'odeurs', C.ambre, F);
    etiq(v3, 742, 540, 'évacuation d’eaux usées', C.gris, Object.assign({ 'font-weight': 400 }, F));

    /* 4 et 5 · la pompe de relevage : l'eau tombe dans la pompe, qui la pousse vers le haut ; son flotteur monte
       avec l'eau et, tout en haut, ouvre le contact de sécurité */
    const pompe = haut => {
      const v = D.el('g', {}), coul = haut ? C.rouge : C.vert;
      const entree = [[538, 246], [612, 246], [612, 316]], riser = [[700, 370], [742, 370], [742, 176], [860, 176], [930, 206]];
      tuyau(v, entree, 20, 14); plein(v, entree, 14, haut ? 0 : 30);
      tuyau(v, riser, 14, 8);
      if (!haut) { plein(v, riser, 8, 44); tombe(v, 930, 210, 572, 8, 61, 1); niveau(v, 760, 930, 246); }
      /* le contact de sécurité, sur le fil qui va à l'unité */
      D.el('path', { d: 'M480 270 V292 M480 316 V352 H560', fill: 'none', stroke: haut ? C.rouge : C.gris, 'stroke-width': 3 }, v);
      D.el('circle', { cx: 480, cy: 294, r: 4, fill: C.navy, stroke: 'none' }, v);
      D.el('circle', { cx: 480, cy: 314, r: 4, fill: C.navy, stroke: 'none' }, v);
      D.el('path', { d: haut ? 'M480 314 L495 297' : 'M480 314 V294', fill: 'none', stroke: haut ? C.rouge : C.gris, 'stroke-width': 3, 'stroke-linecap': 'round' }, v);
      /* le boîtier, son eau, son flotteur */
      D.el('rect', { x: 560, y: 318, width: 140, height: 68, rx: 9, fill: C.creme, stroke: coul, 'stroke-width': 4 }, v);
      const eau = D.liquide(D.el('g', { transform: 'translate(0 384) scale(1 0.6) translate(0 -384)' }, v),
        { x0: 562, x1: 698, yh: 277, yb: 384, niveau: () => haut ? 0.85 : 0.4, couleur: () => EAU, pas: 12 });
      const flotteur = D.el('circle', { cx: 630, r: 10, fill: haut ? C.ambre : C.papier, stroke: C.navy, 'stroke-width': 3 }, v);
      anime.push(t => { eau.maj(t); flotteur.setAttribute('cy', (384 + (eau.surface(630, t) - 384) * 0.6 - 8).toFixed(1)); });
      etiq(v, 630, 416, 'pompe de relevage', coul, M);
      etiq(v, 630, 443, 'et son flotteur', C.navy, Object.assign({ 'font-weight': 400 }, M));
      etiq(v, 462, 298, 'contact', haut ? C.rouge : C.navy, F);
      etiq(v, 462, 325, haut ? 'ouvert' : 'fermé', haut ? C.rouge : C.navy, F);
      if (!haut) {
        etiq(v, 912, 345, 'l’eau sort', C.eau, F);
        etiq(v, 812, 276, 'niveau', C.gris, { 'font-weight': 400 });
        etiq(v, 812, 303, 'du bac', C.gris, { 'font-weight': 400 });
      } else etiq(v, 655, 118, 'froid coupé', C.rouge);
      return v;
    };
    const v4 = pompe(false), v5 = pompe(true);

    const variantes = [v0, v1, v2, v3, v4, v5];            /* variantes[k] : le montage du pas k */
    const repere = D.el('g', {}, d);                       /* c'est ici qu'on pose le montage du pas, sous les étiquettes */

    /* les étiquettes communes, par-dessus tout ; chacune a sa place libre */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o, cache) => {
      const base = Object.assign({ 'font-size': 21, 'font-weight': 700, fill: C.navy }, o || {});
      const t = D.texte(d, x, y, s, base);
      etiquettes.push({ t, c, coul, fond: base.fill, cache: cache || [] });
    };
    ecrire(36, 46, 'DANS LA PIÈCE');
    ecrire(964, 46, 'DEHORS', null, null, F);
    ecrire(790, 62, 'le mur', null, null, Object.assign({ fill: C.gris, 'font-weight': 400 }, M));
    ecrire(233, 106, 'unité intérieure');
    ecrire(567, 106, 'batterie froide', 'batterieEt', C.froid, F);
    ecrire(30, 118, 'air de la pièce', 'air', C.ambre);
    ecrire(655, 118, 'air frais', 'air', C.froid, null, [5]);
    ecrire(300, 304, 'bac', 'bac', C.eau, M);

    /* une image : tout avance selon t ; ce qui change d'un pas à l'autre s'installe doucement */
    let avant = null;
    const image = t => {
      const dt = avant === null ? 0 : D.borne(t - avant, 0, 0.1), k = 1 - Math.exp(-dt * 3.5);
      avant = t;
      etat.froid += (cible.froid - etat.froid) * k; etat.niv += (cible.niv - etat.niv) * k;
      rangs.forEach(r => r.setAttribute('stroke', etat.froid > 0.5 ? C.froid : C.gris));
      anime.forEach(f => f(t));
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
      ['air', 'batterie', 'batterieEt', 'gouttes', 'bac'],
      ['bac'],
      ['bac'],
      ['bac'],
      ['bac'],
      ['bac', 'batterie', 'air']
    ];
    const ETATS = [{ froid: 1, niv: 0.29 }, { froid: 1, niv: 0.7 }, { froid: 1, niv: 1 }, { froid: 1, niv: 0.7 }, { froid: 1, niv: 0.47 }, { froid: 0, niv: 1 }];
    const CONTOUR_BAC = [C.eau, C.eau, C.rouge, C.navy, C.navy, C.rouge];
    let premier = true;
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : RETRAIT));
      etiquettes.forEach(e => {
        e.t.setAttribute('fill', on.has(e.c) ? e.coul : e.fond);
        if (e.cache.includes(k)) e.t.setAttribute('display', 'none'); else e.t.removeAttribute('display');
      });
      variantes.forEach((v, i) => { if (!v) return; if (i === k) { if (!v.parentNode) d.insertBefore(v, repere); } else if (v.parentNode) v.remove(); });
      contourBac.setAttribute('stroke', CONTOUR_BAC[k]);
      Object.assign(cible, ETATS[k]);
      if (premier || FIGE) { Object.assign(etat, cible); premier = false; if (FIGE) image(1.6); }
    };

    const etapes = [
      { titre: 'L’eau se dépose sur la batterie',
        dire: 'L’air de la pièce touche la batterie froide. Refroidi, il ne peut plus garder toute son humidité : elle se dépose en gouttes, qui tombent dans le bac.',
        peindre: () => allumer(0) },
      { titre: 'Le tuyau, en pente, l’emmène dehors',
        dire: 'Le bac se vide par un tuyau posé en pente continue : l’eau descend toute seule jusqu’à dehors, sans pompe. D’après la fiche de montage du split, la pente est de 3 cm par mètre au moins.',
        peindre: () => allumer(1) },
      { titre: 'Un point bas : le bac déborde',
        dire: 'Si le tuyau a un creux, ou s’il remonte avant la sortie, l’eau n’en sort plus. Elle remplit le tuyau, remonte dans le bac, et le bac déborde. Un seul point bas suffit.',
        peindre: () => allumer(2) },
      { titre: 'Le siphon : un bouchon d’eau',
        dire: 'Quand le tuyau finit sur une évacuation d’eaux usées, un siphon garde un peu d’eau en permanence : l’eau du bac passe, les odeurs de l’évacuation ne remontent pas.',
        peindre: () => allumer(3) },
      { titre: 'La pompe relève l’eau',
        dire: 'Quand la sortie est plus haute que le bac, la pente est impossible. Une pompe de relevage reprend l’eau et la pousse vers le haut ; son flotteur la fait démarrer quand l’eau monte.',
        peindre: () => allumer(4) },
      { titre: 'Le flotteur coupe le froid',
        dire: 'Si la pompe s’arrête ou si le tuyau se bouche, l’eau monte, et le flotteur avec elle. Le contact de sécurité s’ouvre : il coupe le froid avant que le bac ne déborde.',
        peindre: () => allumer(5) }
    ];
    return pasAPas(d, etapes, 'Mode froid. En mode chaud, c’est l’unité extérieure qui fait de l’eau, au dégivrage : la station 2.7 le montre.');
  }

  /* Temps 5 : chaque situation, sa réponse. */
  function recapitulatif() {
    const d = svg('0 0 820 420', 'Récapitulatif en cinq lignes : si l’eau peut descendre, un tuyau en pente continue ; si le tuyau finit sur une évacuation d’eaux usées, un siphon ; si la pente est impossible, une pompe de relevage et son contact de sécurité ; si le tuyau passe dans un local chaud et humide, un isolant ; si l’appareil chauffe, prévoir où s’écoule l’eau de l’unité extérieure.');
    const lignes = [
      { si: ['L’eau peut descendre', 'jusqu’à dehors'], alors: ['un tuyau en pente continue,', 'sans point bas'], c: C.eau },
      { si: ['Le tuyau finit sur une évacuation', 'd’eaux usées'], alors: ['un siphon : le bouchon d’eau', 'arrête les odeurs'], c: C.eau },
      { si: ['La pente est impossible', '(sortie plus haute que le bac)'], alors: ['une pompe de relevage et', 'son contact de sécurité'], c: C.vert },
      { si: ['Le tuyau passe dans un local', 'chaud et humide'], alors: ['un isolant, sinon le tuyau', 'se couvre de gouttes'], c: C.navy },
      { si: ['L’appareil chauffe', '(mode chaud)'], alors: ['prévoir où s’écoule l’eau', 'de l’unité extérieure'], c: C.chaud }
    ];
    let h = `<defs><marker id="fl-rec" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.navy}"/></marker></defs>
<rect x="10" y="10" width="800" height="400" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="84" y="46" font-size="16" font-weight="700" fill="${C.navy}">La situation</text>
<text x="468" y="46" font-size="16" font-weight="700" fill="${C.navy}">Ce qu’on pose</text>`;
    lignes.forEach((l, i) => {
      const y = 62 + i * 66;
      h += `<circle cx="50" cy="${y + 30}" r="15" fill="${C.creme}" stroke="${l.c}" stroke-width="3"/>
<text x="50" y="${y + 36}" text-anchor="middle" font-size="16" font-weight="700" fill="${l.c}">${i + 1}</text>
<rect x="84" y="${y}" width="320" height="60" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="100" y="${y + 26}" font-size="16" fill="${C.navy}">${l.si[0]}</text>
<text x="100" y="${y + 47}" font-size="16" fill="${C.gris}">${l.si[1]}</text>
<line x1="408" y1="${y + 30}" x2="456" y2="${y + 30}" stroke="${C.navy}" stroke-width="3" marker-end="url(#fl-rec)"/>
<rect x="464" y="${y}" width="320" height="60" rx="10" fill="${C.papier}" stroke="${l.c}" stroke-width="3"/>
<text x="480" y="${y + 26}" font-size="16" font-weight="700" fill="${l.c}">${l.alors[0]}</text>
<text x="480" y="${y + 47}" font-size="16" font-weight="700" fill="${l.c}">${l.alors[1]}</text>`;
    });
    d.innerHTML = h;
    return d;
  }

  return { cheminDeLeau, recapitulatif };
})();

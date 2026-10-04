/* CartoClim 5.1 — scènes des modes et de la télécommande.
   Temps 2 (et temps 1, devant les photos : scene-devant.js) : une télécommande dessinée en grand (écran,
   touches de mode, + et −), l’ordre qui part en infrarouge vers la carte de l’unité intérieure, puis trois
   cartes — compresseur, vanne 4 voies, turbine — allumées ou éteintes selon le mode, et à droite ce qui sort
   de l’unité. Cinq pas : froid, chaud, déshumidification, ventilation, automatique. Aucune valeur chiffrée :
   ni température, ni durée.
   L’AIR circule (journée « Animer les réseaux », 04/10/2026, sur le modèle du pilote 3.2) : l’air de la pièce
   entre dans l’unité (chevrons ambre), la turbine tourne, l’air ressort de la couleur du mode (bleu : plus
   frais ; rouge : plus chaud ; bleu pâle : plus sec ; ambre : brassé ; en automatique il passe du bleu au
   rouge, la carte choisit) ; l’ordre part en pointillés qui avancent ; l’eau des condensats coule dans son
   tuyau quand il y en a. Tout se calcule à partir du temps t (requestAnimationFrame — ni SMIL ni animation
   CSS). L’interrupteur « Animations » du site coupé (moteur/animations.js) : le dessin reste fixe, le pas à
   pas marche. Le réglage du système, lui, n’arrête rien : c’est le cours qui bouge.
   Temps 5 : ce que lit la machine (la sonde, en hauteur) contre l’endroit où l’on est, et les cinq modes.
   Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js) — chevron, couleur de température, filigrane R9.
   Aucun texte sur un tracé, ni sur le trajet d’un chevron : vérifié par outils/controler-station-navigateur.mjs.
   Étiquettes en taille 21 dans 1 000 : au moins 18,7 px quand la scène est devant, à 1 280 px. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* Les pictogrammes, tracés dans un carré 0 0 100 100, sans couleur : la scène ou le kit la pose.
     Ce sont des pictogrammes de touches, pas des symboles de la bibliothèque. */
  const ICONES = {
    froid: SceneKit.pictos.DESSINS.froid,
    chaud: '<circle cx="50" cy="50" r="18"/><path d="M50 8 V22 M50 78 V92 M8 50 H22 M78 50 H92 M20 20 L30 30 M70 70 L80 80 M80 20 L70 30 M30 70 L20 80"/>',
    goutte: '<path d="M50 8 C 28 38, 20 56, 32 74 C 40 86, 60 86, 68 74 C 80 56, 72 38, 50 8 Z"/>',
    vent: '<circle cx="50" cy="50" r="6"/>' + [0, 120, 240].map(a =>
      `<path d="M50 44 C 42 22, 60 8, 70 22 C 70 34, 60 40, 50 44 Z" transform="rotate(${a} 50 50)"/>`).join(''),
    auto: '<path d="M26 86 L50 14 L74 86 M35 60 H65"/>',
    consigne: '<path d="M22 12 a10 10 0 0 1 20 0 V54 a18 18 0 1 1 -20 0 Z M32 36 V68"/><path d="M66 30 L78 18 L90 30 M78 18 V42 M66 70 L78 82 L90 70 M78 82 V58"/>',
    lit: '<path d="M8 50 V88 M8 72 H92 M92 72 V88 M16 62 H36"/><path d="M62 8 a7 7 0 0 1 14 0 V30 a11 11 0 1 1 -14 0 Z M69 22 V40"/>',
    neuf: '<path d="M48 8 V92 M60 8 V92"/><path d="M6 50 H92 M78 36 L92 50 L78 64"/><path d="M6 28 q7 -7 14 0 t14 0 M6 72 q7 -7 14 0 t14 0"/>'
  };
  /* une icône posée en (x, y), de côté t, en traits de e unités d’écran */
  const ico = (nom, x, y, t, coul, e = 2.6) =>
    `<g transform="translate(${x},${y}) scale(${t / 100})" fill="none" stroke="${coul}" stroke-width="${e * 100 / t}" stroke-linecap="round" stroke-linejoin="round">${ICONES[nom]}</g>`;

  const marqueur = cle => `<marker id="mk-${cle}" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="11" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${C[cle]}"/></marker>`;

  /* Les cinq modes : la touche, ce que la carte met en marche (oui : true, false, ou null = selon l’écart),
     et ce qui sort de l’unité. `air.cle` est la couleur de C. */
  const MODES = [
    { icone: 'froid', coul: C.froid, mot: 'froid', tc: [80, 294],
      comp: { oui: true, etat: 'en marche', sub: 'comprime le fluide' },
      vanne: { oui: true, etat: 'sens froid', sub: 'batterie intérieure froide' },
      turb: { oui: true, etat: 'en marche', sub: 'vitesse au choix' },
      air: { cle: 'froid', mot: 'air plus frais', sub: 'la chaleur part dehors', eau: 'l’eau part dehors' } },
    { icone: 'chaud', coul: C.chaud, mot: 'chaud', tc: [130, 294],
      comp: { oui: true, etat: 'en marche', sub: 'comprime le fluide' },
      vanne: { oui: true, etat: 'sens chaud', sub: 'batterie intérieure chaude' },
      turb: { oui: true, etat: 'en marche', sub: 'vitesse au choix' },
      air: { cle: 'chaud', mot: 'air plus chaud', sub: 'la chaleur vient de dehors', eau: 'pas d’eau' } },
    { icone: 'goutte', coul: C.eau, mot: 'sécher', tc: [180, 294],
      comp: { oui: true, etat: 'en marche', sub: 'comprime le fluide' },
      vanne: { oui: true, etat: 'sens froid', sub: 'batterie intérieure froide' },
      turb: { oui: true, etat: 'petite vitesse', sub: 'l’air s’attarde sur le froid' },
      air: { cle: 'doux', mot: 'air plus sec', sub: 'sans trop refroidir', eau: 'l’eau part dehors' } },
    { icone: 'vent', coul: C.navy, mot: 'ventiler', tc: [105, 372],
      comp: { oui: false, etat: 'à l’arrêt', sub: 'rien ne circule' },
      vanne: { oui: false, etat: 'sans rôle', sub: 'le fluide ne circule pas' },
      turb: { oui: true, etat: 'en marche', sub: 'vitesse au choix' },
      air: { cle: 'gris', mot: 'air brassé', sub: 'ni plus frais ni plus chaud', eau: 'pas d’eau' } },
    { icone: 'auto', coul: C.navy, mot: 'auto', tc: [155, 372],
      comp: { oui: null, etat: 'selon l’écart', sub: 'la carte décide' },
      vanne: { oui: null, etat: 'froid ou chaud', sub: 'selon l’écart' },
      turb: { oui: true, etat: 'en marche', sub: 'vitesse au choix' },
      air: { cle: 'gris', mot: 'froid ou chaud', sub: 'la carte choisit', eau: 'selon le mode', pointille: true } }
  ];

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
  /* n repères régulièrement espacés qui avancent à v unités par seconde ; poser(repère, x, y, angle, f) */
  function filer(parent, tr, n, v, creer, poser) {
    const D = window.VOYAGE_DESSIN, rep = Array.from({ length: n }, (_, i) => creer(parent, i));
    return t => rep.forEach((e, i) => {
      const f = D.frac(i / n + t * v / tr.L), [x, y, ang] = tr.a(f * tr.L);
      poser(e, x, y, ang, f);
    });
  }

  function lesModes() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 655',
      'Une télécommande dessinée en grand, avec son écran et ses touches : flocon, soleil, goutte, ventilateur, A. L’ordre part en infrarouge vers la carte de l’unité intérieure, qui allume ou éteint le compresseur, la vanne 4 voies et la turbine, selon le mode choisi. L’air de la pièce entre dans l’unité intérieure et en ressort ; les chevrons qui avancent montrent son sens et sa couleur.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const CREUX = '#f4f8fc', CHAMBRE = 0.6;                /* l'air de la pièce : tiède */
    const SORTIE = [0.08, 0.95, 0.3, CHAMBRE, null];       /* l'air qui sort, mode par mode ; null : la carte choisit */
    const VITESSE = [1, 1, 0.35, 1, 1];                    /* la turbine tourne lentement pour sécher */
    const anime = [];                                      /* ce que chaque image fait avancer */
    let k = 0, tc = 1.6, tp = null, angle = 0;

    D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 643, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[235, 186], [500, 345], [765, 504]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    const T = (g, x, y, s, o) => D.texte(g, x, y, s, Object.assign({ 'font-size': 21, fill: C.navy }, o || {}));
    const M = { 'text-anchor': 'middle' }, G = { 'font-weight': 700 };
    const nu = (g, h) => { const e = D.el('g', {}, g); if (h) e.innerHTML = h; return e; };

    /* la télécommande : émetteur, écran qui répète le mode, consigne + et −, touches de mode, autres touches */
    D.el('rect', { x: 24, y: 70, width: 226, height: 570, rx: 30, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    D.el('rect', { x: 112, y: 58, width: 50, height: 12, rx: 3, fill: C.feu, stroke: C.navy, 'stroke-width': 2 }, d);
    D.el('rect', { x: 44, y: 92, width: 186, height: 154, rx: 10, fill: C.papier, stroke: C.navy, 'stroke-width': 2.5 }, d);
    const ecran = nu(d);
    T(d, 137, 284, 'consigne', Object.assign({ fill: C.gris }, M));
    [[87, 'M79 322 H95'], [187, 'M179 322 H195 M187 314 V330']].forEach(([x, p]) => {
      D.el('circle', { cx: x, cy: 322, r: 18, fill: C.papier, stroke: C.navy, 'stroke-width': 2.5 }, d);
      D.el('path', { d: p, fill: 'none', stroke: C.navy, 'stroke-width': 3, 'stroke-linecap': 'round' }, d);
    });
    const POS = [[67, 410], [137, 410], [207, 410], [102, 516], [172, 516]];
    const touches = MODES.map((m, i) => {
      const [x, y] = POS[i];
      const rond = D.el('circle', { cx: x, cy: y, r: 24 }, d);
      const ic = nu(d, ico(m.icone, x - 17, y - 17, 34, C.navy, 2.6));
      return { rond, ic, lib: T(d, x, y + 48, m.mot, M) };
    });
    [47, 96, 145, 194].forEach(x => D.el('rect', { x, y: 594, width: 36, height: 26, rx: 6, fill: C.papier, stroke: C.navy, 'stroke-width': 2 }, d));

    /* l'ordre part en infrarouge vers la carte : des pointillés qui avancent */
    const ir = D.el('path', { d: 'M168 64 H282', fill: 'none', stroke: C.feu, 'stroke-width': 4, 'stroke-dasharray': '14 10', 'stroke-linecap': 'round' }, d);
    anime.push(t => ir.setAttribute('stroke-dashoffset', (-(t * 48) % 24).toFixed(1)));
    D.el('path', { d: 'M280 55 L292 64 L280 73 Z', fill: C.feu }, d);
    T(d, 228, 46, 'infrarouge', Object.assign({ fill: C.ambre }, M, G));
    D.el('rect', { x: 290, y: 44, width: 312, height: 40, rx: 20, fill: 'rgba(255,107,53,.12)', stroke: C.feu, 'stroke-width': 4 }, d);
    T(d, 446, 71, 'carte de l’unité intérieure', Object.assign({}, M, G));

    /* ce que la carte met en marche : trois cartes, qui changent d'état selon le mode */
    const cartes = [[120, 'Compresseur'], [256, 'Vanne 4 voies'], [392, 'Turbine']].map(([y, titre]) => {
      const cadre = D.el('rect', { x: 290, y, width: 312, height: 112, rx: 12 }, d);
      T(d, 308, y + 34, titre, G);
      return { cadre, etat: T(d, 308, y + 66, '', G), sub: T(d, 308, y + 96, '', { fill: C.gris }), voyant: D.el('circle', { cx: 572, cy: y + 54, r: 16, 'stroke-width': 3 }, d) };
    });
    const etatCarte = (c, o) => {
      const nul = o.oui === false, tirets = (e, v) => v ? e.setAttribute('stroke-dasharray', '9 6') : e.removeAttribute('stroke-dasharray');
      c.cadre.setAttribute('fill', nul ? C.creme : 'rgba(255,107,53,.10)');
      c.cadre.setAttribute('stroke', nul ? C.trait : C.feu);
      c.cadre.setAttribute('stroke-width', nul ? 3 : 5);
      tirets(c.cadre, o.oui === null);
      c.etat.textContent = o.etat; c.etat.setAttribute('fill', nul ? C.gris : C.ambre);
      c.sub.textContent = o.sub;
      c.voyant.setAttribute('fill', o.oui === true ? C.feu : C.papier);
      c.voyant.setAttribute('stroke', nul ? C.gris : C.feu);
      tirets(c.voyant, o.oui === null);
    };
    [['en action', true], ['à l’arrêt', false], ['selon l’écart', null]].forEach(([s, v], i) => {
      const y = 556 + i * 30, p = { cx: 308, cy: y - 7, r: 9, 'stroke-width': 3, fill: v === true ? C.feu : C.papier, stroke: v === false ? C.gris : C.feu };
      if (v === null) p['stroke-dasharray'] = '5 4';
      D.el('circle', p, d);
      T(d, 326, y, s, { fill: C.gris });
    });

    /* l'unité intérieure : l'air de la pièce entre, la sonde le lit, la turbine le pousse, l'air sort */
    const air = (pts, coul) => {
      const tr = trajet(pts), e = 0.5, fondu = 14 / tr.L, g = D.el('g', { transform: 'scale(' + e + ')' }, d);   /* D.chevron se place dans un groupe réduit */
      anime.push(filer(g, tr, Math.max(2, Math.round(tr.L / 36)), 70, p => D.chevron(p),
        (ch, x, y, ang, f) => ch(x / e, y / e, ang - 90, coul(), D.fenetre(f, 0, 1, fondu))));
    };
    const sortie = () => D.couleur(SORTIE[k] === null ? 0.5 + 0.42 * Math.sin(tc * 0.8) : SORTIE[k]);
    air([[700, 36], [700, 196]], () => D.couleur(CHAMBRE));
    [700, 770, 840].forEach(x => air([[x, 308], [x, 428]], sortie));
    D.el('rect', { x: 640, y: 200, width: 330, height: 100, rx: 14, fill: C.creme, stroke: C.navy, 'stroke-width': 3 }, d);
    const sonde = D.el('circle', { cx: 664, cy: 224, r: 7 }, d);
    const sondeT = T(d, 680, 231, 'sonde');
    T(d, 656, 286, 'unité intérieure', G);
    const roue = (() => {                                  /* la turbine : le cercle reste, la roue tourne */
      const g = D.el('g', { transform: 'translate(902 250)' }, d), r = 32;
      D.el('circle', { r, fill: C.papier, stroke: C.navy, 'stroke-width': 3 }, g);
      const w = D.el('g', {}, g);
      for (let i = 0; i < 16; i++) D.el('path', { d: 'M ' + r * 0.56 + ' 0 Q ' + r * 0.8 + ' ' + (-r * 0.02) + ' ' + r * 0.88 + ' ' + (-r * 0.26),
        fill: 'none', stroke: C.navy, 'stroke-width': 2.6, 'stroke-linecap': 'round', transform: 'rotate(' + i * 22.5 + ')' }, w);
      D.el('circle', { r: r * 0.5, fill: 'none', stroke: C.navy, 'stroke-width': 1.5, opacity: 0.5 }, g);
      return w;
    })();
    T(d, 730, 118, 'l’air de la pièce entre', { fill: C.ambre });
    const motAir = T(d, 640, 470, '', G), subAir = T(d, 640, 500, '', { fill: C.gris });

    /* l'eau des condensats : un tuyau plein d'eau, des reflets qui filent — ou un trait pointillé quand il n'y en a pas */
    const eauG = D.el('g', {}, d), secG = D.el('g', {}, d);
    const tuyau = trajet([[955, 301], [955, 520]]), tp2 = { d: tuyau.d, fill: 'none', 'stroke-linecap': 'round' };
    D.el('path', Object.assign({ stroke: C.gris, 'stroke-width': 14 }, tp2), eauG);
    D.el('path', Object.assign({ stroke: CREUX, 'stroke-width': 8 }, tp2), eauG);
    D.el('path', Object.assign({ stroke: C.eau, 'stroke-width': 8, opacity: 0.9 }, tp2), eauG);
    const reflet = D.el('path', Object.assign({ stroke: C.papier, 'stroke-width': 2, 'stroke-dasharray': '12 26', opacity: 0.85 }, tp2), eauG);
    anime.push(t => reflet.setAttribute('stroke-dashoffset', (-(t * 30) % 38).toFixed(1)));
    D.el('path', { d: tuyau.d, fill: 'none', stroke: C.trait, 'stroke-width': 3, 'stroke-dasharray': '6 6' }, secG);
    const motEau = T(d, 975, 556, '', { 'text-anchor': 'end' });

    /* une image : tout avance selon t */
    const image = t => {
      const dt = tp === null ? 0 : Math.min(0.1, Math.max(0, t - tp));
      tp = t; tc = t; angle += dt * 320 * VITESSE[k];
      roue.setAttribute('transform', 'rotate(' + (angle % 360).toFixed(1) + ')');
      anime.forEach(f => f(t));
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

    /* le pas à pas : le mode choisi s'allume, le reste tourne en retrait */
    const allumer = i => {
      k = i;
      const m = MODES[i], a = m.air, eau = a.eau.startsWith('l’eau'), coulAir = C[a.cle];
      ecran.innerHTML = ico(m.icone, 87, 119, 100, m.coul, 5);
      touches.forEach((b, j) => {
        const on = j === i;
        b.rond.setAttribute('fill', on ? 'rgba(255,107,53,.22)' : C.papier);
        b.rond.setAttribute('stroke', on ? C.feu : C.navy);
        b.rond.setAttribute('stroke-width', on ? 5 : 2.5);
        b.ic.firstChild.setAttribute('stroke', on ? C.ambre : C.navy);
        b.lib.setAttribute('fill', on ? C.ambre : C.gris);
        b.lib.setAttribute('font-weight', on ? 700 : 400);
      });
      etatCarte(cartes[0], m.comp); etatCarte(cartes[1], m.vanne); etatCarte(cartes[2], m.turb);
      sonde.setAttribute('fill', i === 4 ? C.feu : C.gris);
      sondeT.setAttribute('fill', i === 4 ? C.ambre : C.gris);
      sondeT.setAttribute('font-weight', i === 4 ? 700 : 400);
      motAir.textContent = a.mot; motAir.setAttribute('fill', a.cle === 'doux' ? C.froid : coulAir);
      subAir.textContent = a.sub;
      eauG.setAttribute('opacity', eau ? 1 : 0); secG.setAttribute('opacity', eau ? 0 : 1);
      motEau.textContent = a.eau; motEau.setAttribute('fill', eau ? C.eau : C.gris); motEau.setAttribute('font-weight', eau ? 700 : 400);
      image(tc);
    };

    const etapes = [
      { titre: 'Le flocon : du froid',
        dire: 'Vous appuyez sur le flocon. L’ordre part en infrarouge, la carte de l’unité intérieure le reçoit : elle lance le compresseur et la turbine, et place la vanne 4 voies dans le sens froid. La batterie intérieure devient froide, l’air qui la traverse ressort plus frais, et l’eau de l’air se dépose dans le bac.',
        peindre: () => allumer(0) },
      { titre: 'Le soleil : du chaud',
        dire: 'Le soleil, pas le flocon : c’est la touche que les clients confondent le plus. La machine est la même, mais la vanne 4 voies inverse le sens du fluide. La batterie intérieure devient chaude, l’air ressort chaud. Un client qui appuie sur le soleil en plein été chauffe sa pièce.',
        peindre: () => allumer(1) },
      { titre: 'La goutte : sécher l’air',
        dire: 'Déshumidification : du froid, mais à petite vitesse. La turbine tourne lentement, l’air s’attarde sur la batterie froide et y laisse son eau, sans que la pièce se refroidisse beaucoup. L’eau part par le tuyau de condensats, comme en mode froid. Ce n’est donc pas le mode froid.',
        peindre: () => allumer(2) },
      { titre: 'Le ventilateur : brasser l’air',
        dire: 'Ventilation : le compresseur est arrêté, la vanne 4 voies ne sert à rien, seule la turbine tourne. L’air de la pièce est brassé, ni refroidi ni chauffé, et aucune eau n’est récupérée. Aucun air neuf n’entre : la télécommande ne sait pas faire cela.',
        peindre: () => allumer(3) },
      { titre: 'A : la carte choisit',
        dire: 'Automatique : la carte compare la consigne avec la température que lit la sonde, à la reprise d’air de l’unité intérieure. Trop chaud : elle choisit le froid. Trop frais : le chaud, si l’appareil est réversible. Quand la sonde atteint la consigne, la machine s’arrête ou ralentit.',
        peindre: () => allumer(4) }
    ];
    return pasAPas(d, etapes, 'Cinq modes, une seule machine. Le détail (vitesses, ordre de démarrage, noms des touches) change d’un modèle à l’autre : la notice fait foi.');
  }

  /* Temps 5 : ce que lit la machine, et les cinq modes. */
  function recapitulatif() {
    const d = svg('0 0 900 400', 'Récapitulatif : à gauche une pièce, avec l’unité intérieure en hauteur et sa sonde, et un lit plus bas ; à droite les cinq modes et ce que fait chacun.');
    const lignes = [
      ['froid', C.froid, 'Froid', 'air frais, l’eau coule au bac'],
      ['chaud', C.chaud, 'Chaud', 'la vanne inverse, air chaud'],
      ['goutte', C.eau, 'Déshumidification', 'froid à petite vitesse, air plus sec'],
      ['vent', C.navy, 'Ventilation', 'la turbine seule, compresseur arrêté'],
      ['auto', C.navy, 'Automatique', 'la carte choisit froid ou chaud']
    ];
    d.innerHTML = `
<defs>${['gris'].map(marqueur).join('')}</defs>
<rect x="10" y="10" width="880" height="380" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<line x1="450" y1="34" x2="450" y2="366" stroke="${C.trait}" stroke-width="2"/>

<text x="40" y="46" font-size="15" font-weight="700" fill="${C.navy}">CE QUE LIT LA MACHINE</text>
<path d="M420 70 H40 V330 H420" fill="none" stroke="${C.navy}" stroke-width="4" stroke-linejoin="round"/>
<rect x="52" y="88" width="170" height="52" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="204" cy="104" r="6" fill="${C.feu}"/>
<text x="130" y="128" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">unité intérieure</text>
<text x="238" y="109" font-size="14" font-weight="700" fill="${C.ambre}">la sonde lit ici</text>
<path d="M140 152 V284" fill="none" stroke="${C.gris}" stroke-width="3" stroke-dasharray="8 6" marker-end="url(#mk-gris)"/>
<text x="160" y="206" font-size="15" fill="${C.gris}">plus bas, l’air peut être</text>
<text x="160" y="226" font-size="15" fill="${C.gris}">à une autre température</text>
<path d="M60 276 V330 M222 318 V330" fill="none" stroke="${C.navy}" stroke-width="4"/>
<rect x="60" y="296" width="170" height="22" rx="4" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="68" y="286" width="36" height="10" rx="5" fill="${C.papier}" stroke="${C.navy}" stroke-width="2"/>
<text x="250" y="312" font-size="14" font-weight="700" fill="${C.navy}">vous êtes ici</text>
<text x="40" y="354" font-size="14" fill="${C.gris}">Sauf télécommande à sonde : elle lit là où on la pose.</text>

<text x="480" y="46" font-size="15" font-weight="700" fill="${C.navy}">CINQ MODES, CINQ ÉTATS</text>
${lignes.map(([icone, coul, nom, texte], i) => {
  const y = 66 + i * 60;
  return `${ico(icone, 480, y + 6, 40, coul, 2.4)}
<text x="536" y="${y + 24}" font-size="16" font-weight="700" fill="${C.navy}">${nom}</text>
<text x="536" y="${y + 46}" font-size="15" fill="${C.gris}">${texte}</text>${i < 4 ? `
<line x1="470" y1="${y + 56}" x2="870" y2="${y + 56}" stroke="${C.trait}" stroke-width="2"/>` : ''}`;
}).join('\n')}`;
    return d;
  }

  return { lesModes, recapitulatif, icones: ICONES };
})();

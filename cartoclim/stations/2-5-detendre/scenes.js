/* CartoClim 2.5 — scènes de la station « Détendre ».
   Temps 2, premier dessin : une coupe du passage étroit, en quatre pas — le liquide arrive sous haute
   pression, passe l'étranglement, la pression tombe et une partie bout, le mélange froid repart.
   Ce premier dessin est animé (pilote « Animer les réseaux », 04/10/2026) et passe aussi devant les photos au
   temps 1 (scene-devant.js) : le liquide file, bout d'un coup après l'étranglement, bulles et vapeur.
   Temps 2, second dessin : trois états à comparer — le tube capillaire (rien ne bouge) et le
   détendeur électronique (la carte commande, le moteur relève puis pousse l'aiguille).
   Temps 5 : un tableau dessiné, capillaire contre électronique.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. Aucune valeur chiffrée : ni pression, ni surchauffe,
   ni longueur ni diamètre de tube. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;
  const bp = C.froid, hp = C.chaud;                       /* basse pression : bleu · haute pression : rouge */

  /* Une pointe de flèche à taille fixe, quelle que soit l'épaisseur du trait. */
  const pointe = (id, couleur) =>
    `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="13" markerHeight="13" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${couleur}"/></marker>`;

  /* ------------------------------------------------------------------------------------------
     Temps 1 (devant les photos : scene-devant.js) et temps 2 — dessin 1 : le passage étroit, en coupe, et la
     courbe de pression dessous. Pilote « Animer les réseaux » (04/10/2026) : tout se calcule à partir du
     temps t (requestAnimationFrame — ni SMIL ni animation CSS).
       · le liquide chaud file vers l'étranglement : tube plein, des reflets qui avancent dans le sens du
         fluide, en lignes de courant qui se resserrent ;
       · juste après, la pression tombe : le niveau du liquide baisse (nappe qui ondule), des bulles naissent,
         grossissent et éclatent à la surface, la vapeur file au-dessus, et le liquide se refroidit ;
       · le pas à pas allume la partie qui agit ; le reste continue de tourner, en retrait.
     Dessin : VOYAGE_DESSIN (jouerezo/moteur/voyage-dessin.js). Aucun texte sur un tracé ni sur ce qui bouge :
     toute la matière est dans le canal, les étiquettes sont au-dessus et en dessous. Étiquettes en taille 21
     dans 1 000 : 19,6 px à l'écran à 1 280 px. */
  function lePassageEtroit() {
    const D = window.VOYAGE_DESSIN;
    const d = svg('0 0 1000 520',
      'Coupe d’un passage étroit : le liquide arrive à gauche sous haute pression, traverse un étranglement, puis repart à droite à basse pression, en mélange froid de liquide et de bulles. Sous la coupe, la courbe de pression tombe au niveau de l’étranglement.');
    const FIGE = !!(window.inerwebAnimations && window.inerwebAnimations.actives === false);
    const RETRAIT = 0.4;                                   /* ce qui n'agit pas à cette étape */
    const CHAUD = D.couleur(0.62);                         /* le liquide qui sort du condenseur */
    const couche = (c, o) => D.el('g', Object.assign({ 'data-c': c }, o || {}), d);   /* une partie du dessin, que le pas à pas allume */
    const AU_CANAL = { 'clip-path': 'url(#pe-canal)' };
    const SURBRILLANCE = { 'data-sur': '' };               /* n'existe que lorsqu'elle est allumée */
    const anime = [];                                      /* ce que chaque image fait avancer */
    const chemin = pts => 'M' + pts.map(p => p.join(' ')).join(' L');

    const defs = D.defs(d);
    D.el('rect', { x: 6, y: 6, width: 988, height: 508, rx: 16, fill: C.papier, stroke: C.trait }, d);
    /* filigrane R9 : logo officiel + « by inerweb.fr », 3 exemplaires dont un au centre, derrière tout ;
       cartouche « CartoClim » (le nom du produit) à la place de « Studio » (les vidéos) */
    D.filigrane(d, [[240, 150], [500, 262], [760, 374]], 250).querySelectorAll('text')
      .forEach(t => { if (t.textContent === 'Studio') t.textContent = 'CartoClim'; });

    /* le canal : parois haute et basse ; l'étranglement va de x = 375 à 445 */
    const haut = [[50, 110], [300, 110], [375, 173], [445, 173], [520, 110], [900, 110]];
    const bas = haut.map(([x, y]) => [x, 370 - y]);        /* symétrique par rapport à l'axe y = 185 */
    D.el('polygon', { points: haut.concat(bas.slice().reverse()).map(p => p.join(',')).join(' ') },
      D.el('clipPath', { id: 'pe-canal' }, defs));

    /* liquide : le canal plein, des reflets qui filent dans le sens du fluide (trois lignes de courant) */
    const plein = (g, x0, x1) => D.el('rect', { x: x0, y: 110, width: x1 - x0, height: 150, fill: CHAUD, opacity: 0.92,
      stroke: 'none', 'shape-rendering': 'crispEdges' }, g);
    const filet = (g, pts, ph) => {
      const p = D.el('path', { d: chemin(pts), fill: 'none', stroke: C.papier, 'stroke-width': 4, 'stroke-linecap': 'round',
        'stroke-dasharray': '14 36', opacity: 0.85 }, g);
      anime.push(t => p.setAttribute('stroke-dashoffset', (-((t * 40 + ph) % 50)).toFixed(1)));
    };
    let g = couche('hp', AU_CANAL);
    plein(g, 50, 300);
    [[140, 0], [185, 17], [230, 34]].forEach(([y, ph]) => filet(g, [[50, y], [300, y]], ph));
    g = couche('goulot', AU_CANAL);
    plein(g, 300, 445);
    [[140, 177, 0], [185, 185, 17], [230, 193, 34]].forEach(([y, yg, ph]) => filet(g, [[300, y], [375, yg], [445, yg]], ph));

    /* après l'étranglement : le liquide bout d'un coup. Le niveau baisse (le reste est de la vapeur), le
       liquide se refroidit au fil de l'ébullition (il donne sa chaleur à la partie qui s'évapore) */
    g = couche('bout', AU_CANAL);
    D.el('rect', { x: 445, y: 110, width: 455, height: 150, fill: D.couleur(0.2, true), opacity: 0.22, stroke: 'none' }, g);
    const niveau = x => D.lerp(1, 0.58, D.lisse((x - 470) / 130)) - 0.07 * D.lisse((x - 600) / 300);
    const liq = D.liquide(g, { x0: 445, x1: 900, yh: 110, yb: 260, pas: 10, niveau,
      couleur: x => D.couleur(D.lerp(0.62, 0.08, D.lisse((x - 450) / 260))) });
    /* les bulles : elles naissent dans le liquide (plus nombreuses près du passage), grossissent en montant,
       dérivent avec l'écoulement et éclatent à la surface */
    const bulles = Array.from({ length: 36 }, (_, i) => {
      const r = D.alea(7 + i);
      return { p: r(), per: 1.6 + r() * 1.2, ph: r() * 6, taille: 6 + r() * 7,
        c: D.el('circle', { fill: C.papier, 'fill-opacity': 0.5, stroke: C.papier, 'stroke-width': 1.6 }, g) };
    });
    /* la vapeur : de petites molécules séparées, qui n'existent qu'au-dessus de la surface */
    const molecules = Array.from({ length: 12 }, (_, i) => {
      const r = D.alea(60 + i);
      return { x: r(), y: 120 + r() * 32, v: 45 + r() * 40, a: 3 + r() * 3, ph: r() * 6,
        c: D.el('circle', { r: 4.5, fill: D.couleur(0.2, true), stroke: C.navy, 'stroke-opacity': 0.5 }, g) };
    });
    anime.push(t => {
      liq.maj(t);
      bulles.forEach(b => {
        const u = (t + b.ph) / b.per, f = D.frac(u), q = D.frac(b.p + Math.floor(u) * 0.618);
        const x = 490 + q * q * 300 + f * 60, s = liq.surface(x, t), y0 = D.lerp(s + 20, 248, D.frac(q * 7.3));
        b.c.setAttribute('cx', x.toFixed(1)); b.c.setAttribute('cy', D.lerp(y0, s + 2, f).toFixed(1));
        b.c.setAttribute('r', D.lerp(1.5, b.taille, f).toFixed(1)); b.c.setAttribute('opacity', D.fenetre(f, 0, 1, 0.15).toFixed(2));
      });
      molecules.forEach(m => {
        const x = 470 + D.frac(m.x + t * m.v / 430) * 430, y = m.y + Math.sin(t * 1.9 + m.ph) * m.a, s = liq.surface(x, t);
        m.c.setAttribute('cx', x.toFixed(1)); m.c.setAttribute('cy', y.toFixed(1));
        m.c.setAttribute('opacity', D.borne((s - y - 9) / 10, 0, 1).toFixed(2));
      });
    });

    /* les parois : un tube qui se rétrécit, puis s'élargit — et l'étranglement en surbrillance à son pas */
    [haut, bas].forEach(pts => D.el('path', { d: chemin(pts), fill: 'none', stroke: C.navy, 'stroke-width': 4, 'stroke-linejoin': 'round' }, d));
    D.el('path', { d: 'M300 110 L375 173 H445 L520 110 M300 260 L375 197 H445 L520 260', fill: 'none', stroke: C.feu,
      'stroke-width': 8, 'stroke-linejoin': 'round' }, couche('goulot', SURBRILLANCE));

    /* la sortie : le mélange froid repart vers l'évaporateur */
    g = couche('sortie');
    D.el('path', { d: 'M910 185 H950', fill: 'none', stroke: bp, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
    D.el('polygon', { points: '964,185 948,176 948,194', fill: bp, stroke: 'none' }, g);

    /* la courbe de pression, sous la coupe : un trait pâle, et le même en couleur quand il agit */
    const courbes = [['hp', 'M50 345 H300', hp], ['goulot', 'M300 345 C380 345 440 440 520 440', C.feu], ['bout', 'M520 440 H900', bp]];
    courbes.forEach(([, dd]) => D.el('path', { d: dd, fill: 'none', stroke: C.trait, 'stroke-width': 4, 'stroke-linecap': 'round' }, d));
    courbes.forEach(([c, dd, coul]) => D.el('path', { d: dd, fill: 'none', stroke: coul, 'stroke-width': 8, 'stroke-linecap': 'round' }, couche(c, SURBRILLANCE)));

    /* les étiquettes, par-dessus tout ; chacune a sa place libre */
    const etiquettes = [];
    const ecrire = (x, y, s, c, coul, o) => {
      const t = D.texte(d, x, y, s, Object.assign({ 'font-size': 21, 'font-weight': 700, fill: C.navy }, o || {}));
      etiquettes.push({ t, c, coul });
    };
    const M = { 'text-anchor': 'middle' }, F = { 'text-anchor': 'end' };
    ecrire(56, 84, 'liquide, haute pression', 'hp', hp);
    ecrire(410, 84, 'passage étroit', 'goulot', C.orange, M);
    ecrire(560, 84, 'mélange froid : liquide et bulles', 'bout', bp);
    ecrire(56, 322, 'haute pression', 'hp', hp);
    ecrire(390, 452, 'la pression tombe', 'goulot', C.orange, F);
    ecrire(610, 418, 'basse pression', 'bout', bp);
    ecrire(980, 296, 'vers l’évaporateur', 'sortie', bp, F);

    /* une image : tout avance selon t */
    const image = t => anime.forEach(f => f(t));
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
      ['hp'],
      ['goulot'],
      ['bout'],
      ['bout', 'sortie']
    ];
    const allumer = k => {
      const on = new Set(ALLUME[k]);
      d.querySelectorAll('[data-c]').forEach(e => e.setAttribute('opacity', on.has(e.getAttribute('data-c')) ? 1 : e.hasAttribute('data-sur') ? 0 : RETRAIT));
      etiquettes.forEach(e => e.t.setAttribute('fill', on.has(e.c) ? e.coul : C.navy));
    };

    const etapes = [
      { titre: 'Le liquide arrive sous haute pression',
        dire: 'À la sortie du condenseur, le fluide est liquide et sous haute pression. Il arrive devant un passage très étroit.',
        peindre: () => allumer(0) },
      { titre: 'Il se faufile dans le passage étroit',
        dire: 'Le liquide est forcé de passer par ce passage très fin. Il perd presque toute sa pression en le traversant.',
        peindre: () => allumer(1) },
      { titre: 'Une partie du liquide bout d’un coup',
        dire: 'À basse pression, le liquide est trop chaud pour rester liquide : des bulles apparaissent. Pour bouillir, la partie qui s’évapore prend de la chaleur au reste du liquide, qui se refroidit.',
        peindre: () => allumer(2) },
      { titre: 'Le mélange froid part vers l’évaporateur',
        dire: 'Ce qui sort est un mélange froid de liquide et de vapeur. Dans l’évaporateur, le liquide finira de bouillir en prenant la chaleur de la pièce.',
        peindre: () => allumer(3) }
    ];
    return pasAPas(d, etapes, 'Ce passage étroit est, selon la machine, un tube capillaire ou un détendeur électronique : le dessin suivant les compare.');
  }

  /* ------------------------------------------------------------------------------------------
     Temps 2 — dessin 2 : trois états. Le capillaire ne bouge pas ; l'électronique ouvre, puis ferme.
     Même mise en page dans les trois états : on compare ce qui est là et ce qui manque. */
  function deuxDetendeurs() {
    const d = svg('0 0 820 340',
      'Comparaison de deux détendeurs. Le tube capillaire : un tube de cuivre très fin replié sur lui-même, sans moteur ni carte. Le détendeur électronique : une aiguille dans un passage étroit, poussée ou relevée par un moteur que commande une carte électronique reliée à deux sondes.');
    let mode = 'capillaire';

    const peindre = () => {
      const ouvre = mode === 'ouvre', elec = mode !== 'capillaire';
      const pointeAiguille = ouvre ? 200 : 234;              /* la pointe de l'aiguille : haute = ouvert */
      d.innerHTML = `
<defs>${pointe('dd-hp', hp)}${pointe('dd-bp', bp)}${pointe('dd-feu', C.feu)}</defs>
<rect x="10" y="10" width="800" height="320" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- le circuit : le liquide arrive à gauche, le mélange froid repart à droite -->
<path d="M40 195 H${elec ? 330 : 250}" fill="none" stroke="${hp}" stroke-width="8"/>
<path d="M${elec ? 490 : 550} 255 H700" fill="none" stroke="${bp}" stroke-width="8"/>
<path d="M704 255 H772" stroke="${bp}" stroke-width="5" marker-end="url(#dd-bp)"/>
<text x="40" y="232" font-size="17" font-weight="700" fill="${hp}">liquide haute pression</text>
<text x="795" y="292" text-anchor="end" font-size="17" font-weight="700" fill="${bp}">mélange froid</text>

${elec ? `
<!-- le corps du détendeur : en haut la haute pression, en bas la basse pression, l'aiguille bouche ou ouvre le trou -->
<rect x="330" y="165" width="160" height="110" rx="8" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="331" y="166" width="158" height="64" fill="${hp}" fill-opacity=".12" stroke="none"/>
<rect x="331" y="238" width="158" height="36" fill="${bp}" fill-opacity=".14" stroke="none"/>
<rect x="331" y="230" width="71" height="8" fill="${C.navy}" stroke="none"/>
<rect x="418" y="230" width="71" height="8" fill="${C.navy}" stroke="none"/>
${ouvre ? `<polygon points="400,238 420,238 438,266 382,266" fill="${bp}" fill-opacity=".5" stroke="none"/>` : `<polygon points="406,238 414,238 416,254 404,254" fill="${bp}" fill-opacity=".5" stroke="none"/>`}
<path d="M338 195 H392" stroke="${hp}" stroke-width="4" marker-end="url(#dd-hp)"/>
<path d="M432 255 H478" stroke="${bp}" stroke-width="4" marker-end="url(#dd-bp)"/>
<text x="410" y="312" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">détendeur électronique</text>

<!-- l'aiguille et son moteur -->
<rect x="370" y="38" width="80" height="75" rx="10" fill="${C.papier}" stroke="${C.feu}" stroke-width="5"/>
<text x="410" y="84" text-anchor="middle" font-size="26" font-weight="700" fill="${C.feu}">M</text>
<text x="358" y="83" text-anchor="end" font-size="17" font-weight="700" fill="${C.navy}">moteur pas à pas</text>
<rect x="406" y="113" width="8" height="${pointeAiguille - 8 - 113}" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<polygon points="402,${pointeAiguille - 8} 418,${pointeAiguille - 8} 410,${pointeAiguille}" fill="${C.creme}" stroke="${C.navy}" stroke-width="2" stroke-linejoin="round"/>
<text x="430" y="146" font-size="16" fill="${C.navy}">${ouvre ? 'aiguille relevée' : 'aiguille poussée'}</text>
<path d="${ouvre ? 'M388 155 V129' : 'M388 129 V155'}" stroke="${C.feu}" stroke-width="4" marker-end="url(#dd-feu)"/>

<!-- la carte, son câble vers le moteur, ses deux sondes sur le tube de sortie -->
<path d="M450 75 H560" fill="none" stroke="${C.navy}" stroke-width="3"/>
<rect x="560" y="30" width="200" height="90" rx="10" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<text x="660" y="57" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">carte électronique</text>
<text x="660" y="82" text-anchor="middle" font-size="15" fill="${C.navy}">${ouvre ? 'surchauffe trop forte' : 'surchauffe trop faible'}</text>
<text x="660" y="106" text-anchor="middle" font-size="15" font-weight="700" fill="${C.orange}">${ouvre ? '→ j’ouvre' : '→ je ferme'}</text>
<path d="M600 120 V248 M670 120 V248" fill="none" stroke="${C.navy}" stroke-width="2.5" stroke-dasharray="6 4"/>
<circle cx="600" cy="255" r="7" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="670" cy="255" r="7" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<text x="635" y="292" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">sondes</text>
` : `
<!-- le tube capillaire : un tube de cuivre très fin, replié, sans aucune pièce qui bouge -->
<path d="M250 195 H500 a7.5 7.5 0 0 1 0 15 H300 a7.5 7.5 0 0 0 0 15 H500 a7.5 7.5 0 0 1 0 15 H300 a7.5 7.5 0 0 0 0 15 H550" fill="none" stroke="${C.ambre}" stroke-width="3" stroke-linecap="round"/>
<text x="390" y="165" text-anchor="middle" font-size="17" font-weight="700" fill="${C.ambre}">tube capillaire : long et très fin</text>
<text x="410" y="312" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">rien ne bouge</text>

<!-- ce qui manque : ni moteur, ni carte -->
<rect x="370" y="38" width="80" height="75" rx="10" fill="none" stroke="${C.gris}" stroke-width="2.5" stroke-dasharray="7 5"/>
<text x="410" y="70" text-anchor="middle" font-size="15" fill="${C.gris}">pas de</text>
<text x="410" y="92" text-anchor="middle" font-size="15" fill="${C.gris}">moteur</text>
<rect x="560" y="30" width="200" height="90" rx="10" fill="none" stroke="${C.gris}" stroke-width="2.5" stroke-dasharray="7 5"/>
<text x="660" y="68" text-anchor="middle" font-size="16" fill="${C.gris}">pas de carte,</text>
<text x="660" y="94" text-anchor="middle" font-size="16" fill="${C.gris}">pas de réglage</text>
`}`;
    };

    const appliquer = m => () => { mode = m; peindre(); };
    const legCapillaire = 'Le capillaire : un tube long et très fin, dont la longueur et la finesse sont choisies une fois pour toutes. Rien ne bouge, rien ne se règle : la charge de fluide doit être exacte.';
    peindre();
    return etats(d, [
      { id: 'capillaire', libelle: 'Capillaire', appliquer: appliquer('capillaire'), legende: legCapillaire },
      { id: 'ouvre', libelle: 'Électronique : il ouvre', appliquer: appliquer('ouvre'),
        legende: 'Électronique : la surchauffe est trop forte, l’évaporateur manque de fluide. La carte commande le moteur, qui relève l’aiguille : le passage s’ouvre.' },
      { id: 'ferme', libelle: 'Électronique : il ferme', appliquer: appliquer('ferme'),
        legende: 'Électronique : la surchauffe est trop faible, l’évaporateur reçoit trop de fluide. La carte commande le moteur, qui pousse l’aiguille : le passage se ferme.' }
    ], 'capillaire', legCapillaire);
  }

  /* Le temps 2 montre les deux dessins l'un sous l'autre. */
  function detendre() {
    const hote = document.createElement('div');
    const intro = document.createElement('p');
    intro.className = 'legende';
    intro.style.cssText = 'font-weight:700;color:' + C.navy + ';margin:1rem 0 .3rem';
    intro.textContent = 'Deux façons de faire ce passage étroit :';
    hote.append(lePassageEtroit(), intro, deuxDetendeurs());
    return hote;
  }

  /* ------------------------------------------------------------------------------------------
     Temps 5 — le récapitulatif : capillaire contre électronique, en cinq lignes. */
  function recapitulatif() {
    const d = svg('0 0 820 365',
      'Tableau : le tube capillaire et le détendeur électronique comparés en cinq lignes — le passage, ce qui bouge, le réglage, où on les trouve, la panne typique.');
    const lignes = [
      ['Le passage',       'un tube long et très fin',       'une aiguille dans un passage étroit'],
      ['Ce qui bouge',     'rien',                           'l’aiguille, poussée par un moteur'],
      ['Le réglage',       'aucun',                          'en continu, par la carte'],
      ['On le trouve sur', 'les petits splits',              'l’Inverter, les réversibles'],
      ['Panne typique',    'bouché : givre, pas de froid',   'bobine débranchée : aiguille bloquée']
    ];
    d.innerHTML = `
<rect x="10" y="10" width="800" height="345" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="200" y="24" width="290" height="44" rx="10" fill="${C.navy}" stroke="${C.navy}"/>
<text x="345" y="53" text-anchor="middle" font-size="16" font-weight="700" fill="${C.papier}">Tube capillaire</text>
<rect x="505" y="24" width="290" height="44" rx="10" fill="${C.navy}" stroke="${C.navy}"/>
<text x="650" y="53" text-anchor="middle" font-size="16" font-weight="700" fill="${C.papier}">Détendeur électronique</text>
${lignes.map(([nom, a, b], i) => {
  const y = 80 + i * 54;
  return `<text x="26" y="${y + 29}" font-size="15" font-weight="700" fill="${C.navy}">${nom}</text>
<rect x="200" y="${y}" width="290" height="46" rx="8" fill="${C.creme}" stroke="${C.trait}" stroke-width="2"/>
<text x="345" y="${y + 29}" text-anchor="middle" font-size="15" fill="${C.navy}">${a}</text>
<rect x="505" y="${y}" width="290" height="46" rx="8" fill="${C.creme}" stroke="${C.trait}" stroke-width="2"/>
<text x="650" y="${y + 29}" text-anchor="middle" font-size="15" fill="${C.navy}">${b}</text>`;
}).join('')}`;
    return d;
  }

  return { detendre, lePassageEtroit, recapitulatif };
})();

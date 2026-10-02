/* CartoClim 3.3 — scènes du choix de l'unité intérieure.
   Temps 2 : une même pièce en coupe, quatre unités tour à tour (murale, console, cassette,
   gainable). À chaque pas : où l'unité se pose, par où l'air entre et sort, par où l'eau s'en va.
   Temps 5 : le récapitulatif des quatre visages, une carte par unité.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. Couleurs : SceneKit.C (bleu = air refroidi,
   rouge = air chauffé, vert-bleu = eau). */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* une pointe de flèche d'une taille fixe, quelle que soit l'épaisseur du trait */
  const pointe = (id, couleur) =>
    `<marker id="${id}" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto"><path d="M0 1 L14 8 L0 15 z" fill="${couleur}"/></marker>`;
  const fleche = (trace, couleur, mk, ep = 4) =>
    `<path d="${trace}" fill="none" stroke="${couleur}" stroke-width="${ep}" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#${mk})"/>`;
  const txt = (x, y, t, o = {}) =>
    `<text x="${x}" y="${y}" text-anchor="${o.ancre || 'middle'}" font-size="${o.taille || 14}" font-weight="${o.gras ? 700 : 400}" fill="${o.couleur || C.gris}">${t}</text>`;

  /* ------------------------------------------------------------------ temps 2 */
  function lesQuatreVisages() {
    const d = svg('0 0 750 470',
      'Une pièce en coupe, avec dehors à gauche. Quatre unités intérieures se succèdent : la murale en haut du mur, la console au sol, la cassette dans le plafond, le gainable caché dans le faux plafond. Pour chacune : le trajet de l’air et le trajet de l’eau des condensats.');
    const bp = C.froid, hp = C.chaud, eau = C.eau, nav = C.navy;

    /* le décor commun : dehors, les murs, le plafond, le sol */
    const decor = fauxPlafond => `
<defs>${pointe('m-bp', bp)}${pointe('m-hp', hp)}${pointe('m-eau', eau)}${pointe('m-air', nav)}</defs>
<rect x="10" y="10" width="730" height="450" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="30" y="44" width="100" height="376" rx="8" fill="${C.creme}" stroke="none"/>
${txt(80, 300, 'dehors', { taille: 14, gras: true })}
<rect x="150" y="44" width="550" height="86" fill="${C.creme}" stroke="none"/>
<rect x="130" y="44" width="20" height="376" fill="${C.gris}" fill-opacity=".35" stroke="none"/>
<rect x="700" y="44" width="20" height="376" fill="${C.gris}" fill-opacity=".35" stroke="none"/>
<line x1="150" y1="130" x2="700" y2="130" stroke="${nav}" stroke-width="4"/>
<line x1="150" y1="400" x2="700" y2="400" stroke="${nav}" stroke-width="4"/>
${txt(650, 388, 'la pièce', { taille: 14, gras: true })}
${fauxPlafond ? txt(160, 84, 'faux plafond', { ancre: 'start', taille: 13, gras: true }) : ''}`;

    /* 1 · la murale : haut du mur, jet vers le bas, tuyau en pente à travers le mur */
    const murale = () => decor(false) + `
<rect x="152" y="146" width="182" height="52" rx="12" fill="${C.papier}" stroke="${nav}" stroke-width="5"/>
<path d="M174 186 h138" stroke="${C.gris}" stroke-width="3" stroke-linecap="round"/>
${txt(243, 172, 'murale', { taille: 17, gras: true, couleur: nav })}
${fleche('M412 160 C 384 160 364 162 344 164', nav, 'm-air', 3)}
${txt(420, 166, 'air repris', { ancre: 'start', couleur: nav })}
${fleche('M204 206 C 204 264 226 332 290 378', bp, 'm-bp')}
${fleche('M250 206 C 280 264 376 332 470 374', bp, 'm-bp')}
${fleche('M300 206 C 360 246 500 298 640 354', bp, 'm-bp')}
${txt(470, 258, 'air frais soufflé', { ancre: 'start', gras: true, couleur: bp })}
${fleche('M178 192 V214 L96 230', eau, 'm-eau')}
${txt(80, 254, 'condensats', { gras: true, couleur: eau })}`;

    /* 2 · la console : au sol, jet vers le haut, l'air chaud monte */
    const console_ = () => decor(false) + `
<rect x="154" y="312" width="130" height="80" rx="10" fill="${C.papier}" stroke="${nav}" stroke-width="5"/>
<path d="M176 324 h86" stroke="${C.gris}" stroke-width="3" stroke-linecap="round"/>
${txt(219, 362, 'console', { taille: 17, gras: true, couleur: nav })}
${fleche('M372 378 H296', nav, 'm-air', 3)}
${txt(318, 366, 'air repris', { ancre: 'start', couleur: nav })}
${fleche('M196 306 C 196 236 210 186 262 152', hp, 'm-hp')}
${fleche('M236 306 C 236 242 290 192 420 154', hp, 'm-hp')}
${fleche('M272 306 C 292 272 420 232 556 194', hp, 'm-hp')}
${txt(690, 198, 'air chaud', { ancre: 'end', gras: true, couleur: hp })}
${txt(690, 216, 'plus léger : il monte', { ancre: 'end', taille: 13 })}
${fleche('M154 366 L100 380', eau, 'm-eau')}
${txt(80, 404, 'condensats', { gras: true, couleur: eau })}`;

    /* 3 · la cassette : dans le plafond, quatre côtés, pompe intégrée */
    const cassette = () => decor(true) + `
<rect x="335" y="62" width="140" height="60" rx="6" fill="${C.papier}" stroke="${nav}" stroke-width="5"/>
<rect x="325" y="123" width="160" height="10" rx="3" fill="${C.papier}" stroke="${nav}" stroke-width="4"/>
${txt(422, 86, 'cassette', { taille: 17, gras: true, couleur: nav })}
<circle cx="356" cy="108" r="9" fill="${C.papier}" stroke="${eau}" stroke-width="3"/>
${txt(372, 113, 'pompe', { ancre: 'start', gras: true, couleur: eau })}
${fleche('M356 99 V50 L96 66', eau, 'm-eau')}
${txt(80, 90, 'condensats', { gras: true, couleur: eau })}
${fleche('M384 192 V142', nav, 'm-air', 3)}
${fleche('M432 192 V142', nav, 'm-air', 3)}
${txt(448, 198, 'air repris', { ancre: 'start', couleur: nav })}
${fleche('M318 146 C 268 146 200 152 170 204', bp, 'm-bp')}
${fleche('M318 156 C 256 176 226 236 214 296', bp, 'm-bp')}
${fleche('M492 146 C 542 146 610 152 640 204', bp, 'm-bp')}
${fleche('M492 156 C 554 176 584 236 596 296', bp, 'm-bp')}
<rect x="372" y="252" width="76" height="76" rx="6" fill="${C.papier}" stroke="${nav}" stroke-width="4"/>
<rect x="392" y="272" width="36" height="36" fill="${C.creme}" stroke="${C.gris}" stroke-width="3"/>
${fleche('M410 246 V218', bp, 'm-bp')}
${fleche('M366 290 H336', bp, 'm-bp')}
${fleche('M454 290 H484', bp, 'm-bp')}
${fleche('M410 334 V362', bp, 'm-bp')}
${txt(410, 386, 'vue d’en dessous : quatre côtés', { taille: 13, gras: true })}`;

    /* 4 · le gainable : tout caché, un ventilateur qui pousse dans des gaines vers des bouches */
    const gainable = () => decor(true) + `
<rect x="262" y="60" width="170" height="56" rx="6" fill="${C.papier}" stroke="${nav}" stroke-width="5"/>
${txt(347, 82, 'gainable', { taille: 17, gras: true, couleur: nav })}
${txt(347, 104, 'turbine', { taille: 13 })}
<path d="M276 116 V124 M358 116 V124" stroke="${nav}" stroke-width="3"/>
<rect x="272" y="124" width="90" height="10" rx="3" fill="${C.papier}" stroke="${nav}" stroke-width="4"/>
${fleche('M300 192 V142', nav, 'm-air', 3)}
${fleche('M334 192 V142', nav, 'm-air', 3)}
${txt(350, 172, 'air repris', { ancre: 'start', couleur: nav })}
<rect x="432" y="78" width="238" height="24" rx="4" fill="${C.creme}" stroke="${nav}" stroke-width="4"/>
${txt(551, 66, 'gaine', { taille: 14, gras: true, couleur: nav })}
<rect x="490" y="102" width="30" height="22" fill="${C.creme}" stroke="${nav}" stroke-width="3"/>
<rect x="620" y="102" width="30" height="22" fill="${C.creme}" stroke="${nav}" stroke-width="3"/>
<rect x="484" y="124" width="42" height="10" rx="3" fill="${C.papier}" stroke="${nav}" stroke-width="4"/>
<rect x="614" y="124" width="42" height="10" rx="3" fill="${C.papier}" stroke="${nav}" stroke-width="4"/>
${fleche('M497 146 C 484 190 468 232 458 276', bp, 'm-bp')}
${fleche('M513 146 C 526 190 542 232 552 276', bp, 'm-bp')}
${fleche('M627 146 C 614 190 598 232 588 276', bp, 'm-bp')}
${fleche('M643 146 C 656 190 672 232 682 276', bp, 'm-bp')}
${txt(570, 318, 'bouches de soufflage', { taille: 13, gras: true, couleur: bp })}
${fleche('M262 96 L96 118', eau, 'm-eau')}
${txt(80, 142, 'condensats', { gras: true, couleur: eau })}`;

    const peintres = [murale, console_, cassette, gainable];
    const etapes = [
      { titre: 'La murale : en haut du mur',
        dire: 'Elle est fixée en haut du mur. Elle reprend l’air de la pièce par le dessus et le souffle vers le bas : l’air frais est plus lourd, il descend tout seul et se répand. L’eau du bac sort par un tuyau en pente, à travers le mur.' },
      { titre: 'La console : au sol, comme un radiateur',
        dire: 'Posée au sol contre le mur, elle souffle vers le haut. L’air chaud est plus léger : il monte le long du mur et brasse la pièce. C’est pourquoi on la choisit surtout pour chauffer. L’eau sort près du sol, à travers le mur.' },
      { titre: 'La cassette : dans le plafond, sur quatre côtés',
        dire: 'Le boîtier est caché au-dessus du faux plafond ; seule la dalle se voit. L’air est repris au centre et soufflé sur les quatre côtés : c’est le choix d’une grande pièce ou d’un bureau ouvert. L’eau est remontée par une petite pompe, presque toujours intégrée.' },
      { titre: 'Le gainable : caché, avec plusieurs bouches',
        dire: 'L’unité entière est cachée dans le faux plafond. Elle reprend l’air par une grille, le pousse dans des gaines, et il ressort par plusieurs bouches. Il faut de la place au-dessus du plafond, et des gaines calculées pour la pression que la turbine peut fournir.' }
    ].map((e, i) => ({ ...e, peindre: () => { d.innerHTML = peintres[i](); } }));

    return pasAPas(d, etapes,
      'Bleu : air refroidi. Rouge : air chauffé. Bleu foncé : air repris de la pièce. Vert-bleu : eau des condensats, qui doit pouvoir sortir, en pente ou par une pompe (station 4.4).');
  }

  /* ------------------------------------------------------------------ temps 5 */
  /* Une carte par unité : un petit dessin de la pièce, puis quatre lignes (se pose, souffle, l'eau, pour quoi). */
  function recapitulatif() {
    const d = svg('0 0 820 378',
      'Récapitulatif : quatre cartes. Murale : haut du mur, souffle vers le bas, eau en pente, pour une pièce. Console : au sol, souffle vers le haut, eau en pente, pour chauffer surtout. Cassette : dans le plafond, souffle sur quatre côtés, pompe intégrée, pour une grande pièce. Gainable : dans le faux plafond, gaines et bouches, pente ou pompe, pour plusieurs bouches.');
    const nav = C.navy, bp = C.froid, hp = C.chaud;

    /* le mini-dessin de chaque unité, dans un cadre de 160 x 86 */
    const mini = {
      murale: `<rect x="10" y="27" width="50" height="14" rx="4" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
${fleche('M24 46 C 30 62 60 70 104 72', bp, 'r-bp', 3)}`,
      console: `<rect x="10" y="50" width="34" height="26" rx="4" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
${fleche('M24 46 C 26 36 44 30 92 29', hp, 'r-hp', 3)}`,
      cassette: `<rect x="58" y="6" width="44" height="14" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
<rect x="54" y="19" width="52" height="6" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
${fleche('M50 34 C 34 34 22 40 16 60', bp, 'r-bp', 3)}
${fleche('M110 34 C 126 34 138 40 144 60', bp, 'r-bp', 3)}`,
      gainable: `<rect x="12" y="5" width="40" height="13" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
<rect x="52" y="8" width="86" height="8" fill="${C.creme}" stroke="${nav}" stroke-width="3"/>
<rect x="72" y="19" width="16" height="6" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
<rect x="112" y="19" width="16" height="6" rx="2" fill="${C.papier}" stroke="${nav}" stroke-width="3"/>
${fleche('M80 34 C 76 44 72 52 68 64', bp, 'r-bp', 3)}
${fleche('M120 34 C 124 44 128 52 132 64', bp, 'r-bp', 3)}`
    };

    const cartes = [
      { id: 'murale', titre: 'Murale', lignes: [['Se pose', 'haut du mur'], ['Souffle', 'vers le bas'], ['L’eau', 'pente'], ['Pour', 'une pièce']] },
      { id: 'console', titre: 'Console', lignes: [['Se pose', 'au sol'], ['Souffle', 'vers le haut'], ['L’eau', 'pente'], ['Pour', 'chauffer surtout']] },
      { id: 'cassette', titre: 'Cassette', lignes: [['Se pose', 'dans le plafond'], ['Souffle', 'quatre côtés'], ['L’eau', 'pompe intégrée'], ['Pour', 'grande pièce']] },
      { id: 'gainable', titre: 'Gainable', lignes: [['Se pose', 'faux plafond'], ['Souffle', 'gaines et bouches'], ['L’eau', 'pente ou pompe'], ['Pour', 'plusieurs bouches']] }
    ];

    d.innerHTML = `
<defs>${pointe('r-bp', bp)}${pointe('r-hp', hp)}</defs>
<rect x="10" y="10" width="800" height="358" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${cartes.map((c, i) => {
  const x = 26 + i * 196;
  return `<rect x="${x}" y="24" width="180" height="294" rx="12" fill="${C.creme}" stroke="${nav}" stroke-width="3"/>
<g transform="translate(${x + 10},34)">
  <rect x="0" y="0" width="160" height="86" rx="6" fill="${C.papier}" stroke="${C.trait}"/>
  <line x1="8" y1="22" x2="152" y2="22" stroke="${nav}" stroke-width="3"/>
  <line x1="8" y1="78" x2="152" y2="78" stroke="${nav}" stroke-width="3"/>
  ${mini[c.id]}
</g>
${txt(x + 90, 148, c.titre, { taille: 18, gras: true, couleur: nav })}
${c.lignes.map(([etiquette, valeur], k) => {
  const y = 174 + k * 36;
  return txt(x + 14, y, etiquette, { ancre: 'start', taille: 13 }) + txt(x + 14, y + 18, valeur, { ancre: 'start', taille: 15, gras: true, couleur: nav });
}).join('')}`;
}).join('')}
${txt(410, 350, 'Dedans, c’est la même machine : batterie, turbine, filtre, bac. Seules la place et la route de l’air changent.', { taille: 14 })}`;
    return d;
  }

  return { lesQuatreVisages, recapitulatif };
})();

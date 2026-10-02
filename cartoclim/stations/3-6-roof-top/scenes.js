/* CartoClim 3.6 — scènes du roof-top.
   Temps 2 : le caisson en coupe, en six pas — l'air repris, l'air neuf qui se mélange, les filtres, la batterie,
   le ventilateur, puis, à côté, le groupe frigorifique. Deux états commutables : mode froid (l'été) et mode
   chaud (l'hiver, appareil réversible) : les couleurs du fluide et de l'air s'inversent, le dessin ne bouge pas.
   Croix du frigoriste (charte R6) : condenseur en haut (avec son hélice), détendeur à gauche, compresseur à droite,
   évaporateur en bas — ici la batterie du compartiment de l'air. Rouge = chaud, bleu = froid (charte).
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par outils/controler-station-navigateur.mjs.
   Temps 5 : ce qu'on raccorde sur le toit. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;
  const ROUGE = C.chaud, BLEU = C.froid;

  /* petit chevron plein, posé sur un tube pour dire dans quel sens le fluide y va */
  const tri = (x, y, sens, s = 5) => ({
    l: `${x - s},${y} ${x + s},${y - s} ${x + s},${y + s}`,
    r: `${x + s},${y} ${x - s},${y - s} ${x - s},${y + s}`,
    d: `${x},${y + s} ${x - s},${y - s} ${x + s},${y - s}`,
    u: `${x},${y - s} ${x - s},${y + s} ${x + s},${y + s}`
  })[sens];
  const chev = (x, y, sens) => `<polygon points="${tri(x, y, sens)}" fill="${C.papier}" stroke="none"/>`;

  function roofTopEnCoupe() {
    const d = svg('0 0 900 540',
      'Un roof-top en coupe, posé sur le toit. À gauche, le compartiment de l’air : l’air repris de la salle et l’air neuf du dehors se mélangent, traversent les filtres, la batterie et le ventilateur, puis repartent dans la gaine de soufflage. À droite, le groupe frigorifique : le compresseur, le condenseur avec son hélice et le détendeur.');
    let etape = 0, mode = 'froid';
    const on = k => etape === k;
    const hl = k => on(k) ? C.feu : C.navy;                 /* la pièce qui agit s'allume */
    const sw = k => on(k) ? 5 : 3;

    const peindre = () => {
      const froid = mode === 'froid';
      const pDehors = froid ? ROUGE : BLEU;                  /* côté dehors : condenseur l'été, évaporateur l'hiver */
      const pBatterie = froid ? BLEU : ROUGE;                /* côté batterie : évaporateur l'été, condenseur l'hiver */
      const air2 = pBatterie;                                /* l'air qui sort de la batterie */
      const fleche = (dd, col, w = 5) => `<path d="${dd}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" marker-end="url(#a-${col === BLEU ? 'b' : col === ROUGE ? 'r' : 'n'})"/>`;
      const tube = (dd, col, w = 6) => `<path d="${dd}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round"/>`;

      d.innerHTML = `
<defs>
  <marker id="a-n" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${C.navy}"/></marker>
  <marker id="a-b" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${BLEU}"/></marker>
  <marker id="a-r" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${ROUGE}"/></marker>
</defs>
<rect x="10" y="10" width="880" height="520" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="40" y="34" font-size="16" font-weight="700" fill="${froid ? BLEU : ROUGE}">${froid ? 'MODE FROID — l’été' : 'MODE CHAUD — l’hiver, appareil réversible'}</text>

<!-- le toit, avec ses deux ouvertures : reprise à gauche, soufflage à droite -->
<path d="M30 442 H60 M110 442 H440 M490 442 H870" fill="none" stroke="${C.gris}" stroke-width="10" stroke-dasharray="26 10"/>
<text x="866" y="466" text-anchor="end" font-size="14" fill="${C.gris}">le toit</text>
<text x="290" y="486" text-anchor="middle" font-size="14" fill="${C.gris}">la salle à climatiser</text>

<!-- le caisson, ses deux compartiments -->
<rect x="40" y="70" width="820" height="366" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<path d="M520 70 V436" fill="none" stroke="${C.navy}" stroke-width="2" stroke-dasharray="10 7"/>
<text x="170" y="122" font-size="16" font-weight="700" fill="${C.navy}">TRAITEMENT DE L’AIR</text>
<text x="170" y="144" font-size="14" fill="${C.gris}">comme une centrale de traitement d’air</text>
<text x="538" y="100" font-size="16" font-weight="700" fill="${C.navy}">PRODUCTION</text>
<text x="538" y="120" font-size="16" font-weight="700" fill="${C.navy}">DE FROID</text>

<!-- gaines sous le toit -->
<path d="M60 442 V496 M110 442 V496 M440 442 V496 M490 442 V496" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="85" y="518" text-anchor="middle" font-size="14" fill="${C.navy}">reprise de la salle</text>
<text x="465" y="518" text-anchor="middle" font-size="14" fill="${C.navy}">soufflage vers la salle</text>

<!-- la grille d'air neuf, sur le dessus -->
<rect x="75" y="64" width="70" height="12" rx="3" fill="${C.papier}" stroke="${on(1) ? C.feu : C.navy}" stroke-width="${on(1) ? 4 : 2}"/>
<text x="160" y="58" font-size="15" fill="${C.navy}">air neuf, de dehors</text>

<!-- 1 · caisson de mélange, avec ses volets -->
<rect x="55" y="315" width="125" height="95" rx="6" fill="${C.papier}" stroke="${hl(1)}" stroke-width="${sw(1)}"/>
<path d="M95 320 L125 334 M70 405 L100 391" fill="none" stroke="${hl(1)}" stroke-width="4" stroke-linecap="round"/>
<text x="140" y="427" text-anchor="middle" font-size="15" font-weight="700" fill="${on(1) ? C.orange : C.navy}">mélange</text>

<!-- 2 · filtres -->
<rect x="205" y="315" width="22" height="95" fill="${C.papier}" stroke="${hl(2)}" stroke-width="${sw(2)}"/>
<path d="M205 319 l22 12 l-22 12 l22 12 l-22 12 l22 12 l-22 12 l22 12" fill="none" stroke="${hl(2)}" stroke-width="2"/>
<text x="216" y="427" text-anchor="middle" font-size="15" font-weight="700" fill="${on(2) ? C.orange : C.navy}">filtres</text>

<!-- 3 · batterie : évaporateur l'été, condenseur l'hiver -->
<rect x="270" y="315" width="60" height="95" fill="${C.papier}" stroke="${hl(3)}" stroke-width="${sw(3)}"/>
<g stroke="${C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${280 + i * 7}" y1="321" x2="${280 + i * 7}" y2="404"/>`).join('')}</g>
<g stroke="${pBatterie}" stroke-width="${on(3) ? 6 : 4}" fill="none"><path d="M274 336 h52 M274 358 h52 M274 380 h52 M274 398 h52"/></g>
<text x="300" y="427" text-anchor="middle" font-size="15" font-weight="700" fill="${on(3) ? pBatterie : C.navy}">batterie</text>

<!-- 4 · ventilateur centrifuge et sa gaine de soufflage -->
<circle cx="395" cy="362" r="34" fill="${C.papier}" stroke="${hl(4)}" stroke-width="${sw(4)}"/>
<circle cx="395" cy="362" r="7" fill="none" stroke="${hl(4)}" stroke-width="3"/>
<g fill="none" stroke="${hl(4)}" stroke-width="3" stroke-linecap="round">${[0, 60, 120, 180, 240, 300].map(a => `<path transform="rotate(${a} 395 362)" d="M402 362 q10 -3 20 6"/>`).join('')}</g>
<path d="M429 335 H490 V436 M429 389 H440 V436" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="390" y="427" text-anchor="middle" font-size="15" font-weight="700" fill="${on(4) ? C.orange : C.navy}">ventilateur</text>

<!-- 5 · le groupe frigorifique : condenseur en haut, hélice, compresseur à droite, détendeur à gauche -->
<circle cx="680" cy="113" r="26" fill="${C.papier}" stroke="${hl(5)}" stroke-width="${sw(5)}"/>
<path d="M680 87 v52 M654 113 h52" fill="none" stroke="${hl(5)}" stroke-width="3"/>
<text x="716" y="118" font-size="15" fill="${C.gris}">hélice</text>
<rect x="600" y="155" width="160" height="50" fill="${C.papier}" stroke="${hl(5)}" stroke-width="${sw(5)}"/>
<g stroke="${C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `<line x1="${612 + i * 13.6}" y1="159" x2="${612 + i * 13.6}" y2="201"/>`).join('')}</g>
<g stroke="${pDehors}" stroke-width="${on(5) ? 6 : 4}" fill="none"><path d="M604 167 h152 M604 180 h152 M604 193 h152"/></g>
<text x="680" y="230" text-anchor="middle" font-size="15" font-weight="700" fill="${on(5) ? pDehors : C.navy}">${froid ? 'condenseur' : 'évaporateur'}</text>
<path d="M539 234 h32 l-16 16 z M539 266 h32 l-16 -16 z" fill="${C.papier}" stroke="${C.navy}" stroke-width="3" stroke-linejoin="round"/>
<text x="580" y="256" font-size="15" font-weight="700" fill="${C.navy}">détendeur</text>
<rect x="735" y="366" width="80" height="50" rx="10" fill="${C.papier}" stroke="${hl(5)}" stroke-width="${sw(5)}"/>
<text x="726" y="396" text-anchor="end" font-size="15" font-weight="700" fill="${on(5) ? C.orange : C.navy}">compresseur</text>
<rect x="735" y="310" width="80" height="34" rx="6" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<text x="726" y="332" text-anchor="end" font-size="15" font-weight="700" fill="${C.navy}">vanne 4 voies</text>

<!-- les tubes : couleur = côté chaud ou côté froid, le sens est donné par les chevrons -->
${tube(`M795 310 V180 H760`, pDehors)}
${tube(`M600 180 H555 V234`, pDehors)}
${tube(`M555 266 V275 H285 V315`, pBatterie)}
${tube(`M315 315 V297 H755 V310`, pBatterie)}
${tube(`M755 344 V366`, BLEU)}
${tube(`M795 344 V366`, ROUGE)}
${froid
  ? `${tube('M755 310 V344', BLEU, 5)}${tube('M795 310 V344', ROUGE, 5)}`
  : `${tube('M795 344 L755 310', ROUGE, 5)}${tube('M755 344 L795 310', BLEU, 5)}`}
${chev(795, 250, froid ? 'u' : 'd')}
${chev(578, 180, froid ? 'l' : 'r')}
${chev(420, 275, froid ? 'l' : 'r')}
${chev(600, 297, froid ? 'r' : 'l')}
${chev(755, 355, 'd')}${chev(795, 355, 'u')}

<!-- les flux d'air, un par étape -->
${on(0) ? `${fleche('M72 490 V396', C.navy)}${fleche('M98 490 V396', C.navy)}` : ''}
${on(1) ? `${fleche('M95 48 V332', C.navy)}${fleche('M125 48 V332', C.navy)}${fleche('M72 490 V396', C.navy)}${fleche('M98 490 V396', C.navy)}${fleche('M140 362 H198', C.navy)}` : ''}
${on(2) ? fleche('M186 362 H262', C.navy) : ''}
${on(3) ? `${fleche('M236 362 H266', C.navy)}${fleche('M334 362 H356', air2)}` : ''}
${on(4) ? fleche('M429 362 H465 V488', air2) : ''}
${on(5) ? `${fleche('M662 64 V32', pDehors)}${fleche('M680 64 V32', pDehors)}${fleche('M698 64 V32', pDehors)}
<text x="722" y="52" font-size="15" font-weight="700" fill="${pDehors}">${froid ? 'air chaud rejeté' : 'air froid rejeté'}</text>` : ''}

<!-- légende des couleurs -->
<rect x="600" y="470" width="16" height="9" fill="${ROUGE}" stroke="none"/>
<text x="624" y="480" font-size="14" fill="${C.navy}">chaud</text>
<rect x="690" y="470" width="16" height="9" fill="${BLEU}" stroke="none"/>
<text x="714" y="480" font-size="14" fill="${C.navy}">froid</text>`;
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

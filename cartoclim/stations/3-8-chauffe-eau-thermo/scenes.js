/* CartoClim 3.8 — scènes du chauffe-eau thermodynamique.
   Temps 2, premier dessin : la chaleur de l'air jusqu'à l'eau du ballon, en cinq pas. Croix du frigoriste
   (charte R6) : détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas. Le ballon
   est dessiné en coupe, à côté de la croix ; le condenseur est ce tube enroulé contre sa paroi. Dans
   l'appareil réel l'évaporateur est en haut, sous le capot : on ne retourne jamais la croix pour autant.
   Temps 2, second dessin : trois états de la cuve — la pompe à chaleur seule, avec l'appoint, on puise.
   Temps 5 : ce qu'on raccorde, puis les trois compteurs du banc du lycée.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. Aucune valeur chiffrée, sauf celles de la fiche du banc
   (200 L, R-134a, 750 W, 1 800 W), qui ne figurent que dans le récapitulatif du temps 5. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;
  const NBSP = String.fromCharCode(160);                 /* espace insécable : un nombre et son unité ne se séparent pas */
  const bp = C.froid, hp = C.chaud;                    /* fluide : basse pression bleu · haute pression rouge */
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
     Temps 2 — dessin 1 : la chaleur de l'air jusqu'à l'eau du ballon.                           */
  function trajetDeLaChaleur() {
    const d = svg('0 0 900 640',
      'Un chauffe-eau thermodynamique en schéma. À gauche, le circuit du fluide en croix : le détendeur à gauche, le compresseur à droite, le condenseur en haut — un tube enroulé contre la paroi du ballon — et l’évaporateur en bas, avec son ventilateur. À côté, le ballon d’eau chaude en coupe : l’eau chaude en haut, l’eau froide en bas.');
    let etape = 0;
    const on = (...ks) => ks.includes(etape);
    const CUVE = 'M470 116 Q470 80 506 80 H614 Q650 80 650 116 V314 Q650 350 614 350 H506 Q470 350 470 314 Z';

    const peindre = () => {
      const puise = on(4);
      const ailettes = [0,1,2,3,4,5,6,7,8,9,10].map(i =>
        `<line x1="${310 + i * 20}" y1="510" x2="${310 + i * 20}" y2="570" stroke="${C.trait}" stroke-width="2"/>`).join('');
      d.innerHTML = `
<defs>${pointe('ce1-hp', hp)}${pointe('ce1-bp', bp)}${pointe('ce1-chaud', eauChaude)}${pointe('ce1-froid', eauFroide)}${pointe('ce1-air', C.navy)}${pointe('ce1-chal', eauChaude)}</defs>
<rect x="10" y="10" width="880" height="620" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- le ballon, en coupe : les couches d'eau, la paroi -->
${couches('ce1-cuve', CUVE, 470, 180, 80, 350, 150)}
${puise ? `<path d="${CUVE}" fill="none" stroke="${C.feu}" stroke-opacity=".3" stroke-width="16" stroke-linejoin="round"/>` : ''}
<path d="${CUVE}" fill="none" stroke="${C.navy}" stroke-width="${puise ? 6 : 4}" stroke-linejoin="round"/>
${puise ? `<line x1="474" y1="150" x2="646" y2="150" stroke="${C.navy}" stroke-width="2" stroke-dasharray="8 6"/>
<line x1="474" y1="200" x2="646" y2="200" stroke="${C.navy}" stroke-width="2" stroke-dasharray="8 6"/>
${T(560, 124, 'la plus chaude', { ancre: 'middle', taille: 15 })}
${T(560, 332, 'la plus froide', { ancre: 'middle', taille: 15 })}` : ''}
${on(2) ? `${fleches(['M484 150 h36', 'M484 182 h36', 'M484 262 h36', 'M484 294 h36'], eauChaude, 'ce1-chal', 4)}
${T(566, 216, 'la chaleur', { ancre: 'middle', taille: 15, couleur: eauChaude })}
${T(566, 238, 'traverse la paroi', { ancre: 'middle', taille: 15, couleur: eauChaude })}` : ''}

<!-- l'eau sanitaire : sortie en haut, entrée en bas -->
${tube('M648 130 H760', eauChaude, puise, 'ce1-chaud')}
${T(662, 112, 'eau chaude', { couleur: puise ? eauChaude : C.gris })}
${tube('M800 310 H652', eauFroide, puise, 'ce1-froid')}
${T(662, 292, 'eau froide', { couleur: puise ? eauFroide : C.gris })}

<!-- le condenseur, en haut de la croix : un tube enroulé contre la paroi -->
${tube(serpentin(458, 112, 8), hp, on(2), null, 5)}
${T(436, 198, 'condenseur', { ancre: 'end', couleur: on(2) ? hp : C.navy })}
${T(436, 221, 'tube enroulé', { ancre: 'end', taille: 15, gras: false })}
${T(436, 242, 'contre la cuve', { ancre: 'end', taille: 15, gras: false })}

<!-- haute pression : du compresseur au condenseur, puis du condenseur au détendeur -->
${tube('M830 400 V46 H458 V112', hp, on(1, 2), 'ce1-hp')}
${T(818, 240, 'gaz chaud', { ancre: 'end', couleur: on(1, 2) ? hp : C.gris, taille: 15 })}
${tube('M458 304 V330 H110 V402', hp, on(3), 'ce1-hp')}
${T(300, 316, 'liquide', { ancre: 'middle', couleur: on(3) ? hp : C.gris, taille: 15 })}

<!-- détendeur, à gauche (deux triangles pointe à pointe) -->
<path d="M110 430 L94 402 H126 Z M110 430 L94 458 H126 Z" fill="${C.papier}" stroke="${on(3) ? C.feu : C.navy}" stroke-width="${on(3) ? 5 : 3}" stroke-linejoin="round"/>
${T(136, 434, 'détendeur', { couleur: on(3) ? bp : C.navy })}
${tube('M110 458 V520 H300', bp, on(3), 'ce1-bp')}

<!-- évaporateur, en bas : ailettes, serpentin, ventilateur au-dessus -->
${ailettes}
<g fill="none" stroke="${bp}" stroke-width="${on(0) ? 7 : 4}" stroke-linecap="round">
  <path d="M300 520 H520 M300 540 H520 M300 560 H520"/>
  <path d="M520 520 c18 0 18 20 0 20 M300 540 c-18 0 -18 20 0 20"/>
</g>
${T(410, 500, 'évaporateur', { ancre: 'middle', couleur: on(0) ? bp : C.navy })}
<circle cx="410" cy="436" r="30" fill="none" stroke="${on(0) ? C.feu : C.navy}" stroke-width="3"/>
<path d="M410 406 v60 M380 436 h60 M389 415 l42 42 M431 415 l-42 42" stroke="${on(0) ? C.feu : C.navy}" stroke-width="2"/>
${T(452, 441, 'ventilateur', { couleur: C.gris, gras: false })}
${on(0) ? `${fleches(['M350 612 V586', 'M410 612 V586', 'M470 612 V586'], C.navy, 'ce1-air', 3)}
${T(500, 604, 'air de la pièce', { couleur: C.navy })}
${fleches(['M395 398 V372', 'M425 398 V372'], bp, 'ce1-bp', 3)}
${T(448, 388, 'air plus froid, plus sec', { couleur: bp, taille: 15 })}` : ''}
${tube('M520 560 H830 V462', bp, on(1), 'ce1-bp')}

<!-- compresseur, à droite -->
<rect x="790" y="400" width="80" height="60" rx="10" fill="${C.papier}" stroke="${on(1) ? C.feu : C.navy}" stroke-width="${on(1) ? 6 : 3}"/>
${T(780, 436, 'compresseur', { ancre: 'end', couleur: on(1) ? hp : C.navy })}

<!-- légende des couleurs -->
<path d="M40 585 H70" stroke="${hp}" stroke-width="6"/>${T(78, 590, 'haute pression', { couleur: hp, taille: 15 })}
<path d="M40 610 H70" stroke="${bp}" stroke-width="6"/>${T(78, 615, 'basse pression', { couleur: bp, taille: 15 })}`;
    };

    const etapes = [
      { titre: 'L’air de la pièce traverse l’évaporateur',
        dire: 'Le ventilateur aspire l’air de la pièce et le fait passer dans l’évaporateur. Le fluide qui y circule est plus froid que cet air : il prend sa chaleur, bout et devient gaz. L’air ressort plus froid, et plus sec : une partie de son humidité se dépose en gouttes, les condensats.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Le compresseur refoule un gaz chaud',
        dire: 'Le compresseur aspire ce gaz et le comprime. En sortie il est plus chaud que l’eau du ballon : sans cela, il ne pourrait pas la chauffer. Il part vers le condenseur.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Le gaz chaud chauffe l’eau à travers la paroi',
        dire: 'Le condenseur est un tube enroulé contre la paroi extérieure de la cuve. Le gaz y cède sa chaleur à l’eau, à travers la paroi, et redevient liquide. Le fluide ne touche jamais l’eau qu’on boit : seule la chaleur traverse.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Le détendeur : le fluide repart froid',
        dire: 'Le liquide passe le détendeur : sa pression tombe d’un coup, il redevient froid et repart vers l’évaporateur. Le tour recommence.',
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'L’eau chaude monte : on puise en haut',
        dire: 'L’eau chauffée, plus légère, monte et reste en haut de la cuve. On puise tout en haut ; l’eau froide entre en bas et ne se mélange pas : l’eau se range par couches.',
        peindre: () => { etape = 4; peindre(); } }
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

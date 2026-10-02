/* CartoClim 3.7 — scènes de la PAC air/eau.
   Temps 2, premier dessin : le trajet de la chaleur, de l'air du dehors à l'émetteur, en six pas.
   Croix du frigoriste (charte R6) : détendeur à gauche, compresseur à droite, condenseur à plaques
   en haut (dedans, côté eau), évaporateur en bas (dehors, côté air). Machine dessinée en bibloc :
   les deux liaisons frigorifiques (rouges) traversent le mur, l'eau reste dedans.
   Temps 2, second dessin : trois états — basse, moyenne, haute température — où l'émetteur, l'eau
   demandée et l'effort de la machine changent.
   Temps 5 : un récapitulatif dessiné — les trois familles, puis ce qui traverse le mur
   (monobloc ou bibloc).
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. Aucune valeur chiffrée : ni température, ni puissance,
   ni rendement. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;
  const bp = C.froid, hp = C.chaud;                  /* fluide : basse pression bleu · haute pression rouge */
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
     Temps 2 — dessin 1 : le trajet de la chaleur.                                               */
  function trajetDeLaChaleur() {
    const d = svg('0 0 820 570',
      'Une pompe à chaleur air/eau en bibloc, vue en schéma : dehors, l’évaporateur en bas balayé par un ventilateur, le compresseur à droite et le détendeur à gauche ; dedans, en haut, le condenseur à plaques qui chauffe l’eau, un circulateur et l’émetteur. Deux liaisons frigorifiques traversent le mur.');
    let etape = 0;
    const on = (...ks) => ks.includes(etape);

    /* un tube : couleur fixe, plus épais et auréolé quand il agit, flèche de sens seulement alors */
    const tube = (chemin, couleur, actif, marque, w = 5) =>
      (actif ? `<path d="${chemin}" fill="none" stroke="${C.feu}" stroke-opacity=".3" stroke-width="${w + 12}" stroke-linejoin="round" stroke-linecap="round"/>` : '') +
      `<path d="${chemin}" fill="none" stroke="${couleur}" stroke-opacity="${actif ? 1 : .55}" stroke-width="${actif ? w + 3 : w}" stroke-linejoin="round"${actif && marque ? ` marker-end="url(#${marque})"` : ''}/>`;

    const peindre = () => {
      const givre = etape === 5;
      /* la plaque du condenseur : huit canaux côte à côte, fluide et eau en alternance */
      const canaux = [0,1,2,3,4,5,6,7].map(i =>
        `<rect x="${330 + i * 20}" y="110" width="20" height="70" fill="${i % 2 ? eauTiede : hp}" fill-opacity="${on(2) ? .38 : .2}" stroke="none"/>`).join('');
      const plaques = [1,2,3,4,5,6,7].map(i =>
        `<line x1="${330 + i * 20}" y1="110" x2="${330 + i * 20}" y2="180" stroke="${C.navy}" stroke-width="2"/>`).join('');
      const ailettes = [0,1,2,3,4,5,6,7,8,9,10].map(i =>
        `<line x1="${310 + i * 20}" y1="445" x2="${310 + i * 20}" y2="505" stroke="${givre ? C.doux : C.trait}" stroke-width="2"/>`).join('');
      const fentes = [0,1,2,3,4].map(i =>
        `<line x1="${565 + i * 18}" y1="92" x2="${565 + i * 18}" y2="173" stroke="${on(3) ? eauChaude : C.trait}" stroke-width="3"/>`).join('');
      const flocons = !givre ? '' : [[330,465],[372,486],[414,466],[456,486],[498,466]].map(([x, y]) =>
        `<path d="M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x - 7} ${y + 7} L${x + 7} ${y - 7} M${x - 9} ${y} H${x + 9} M${x} ${y - 9} V${y + 9}" fill="none" stroke="${C.bleu}" stroke-width="2.5"/>`).join('');

      d.innerHTML = `
<defs>${pointe('pa-hp', hp)}${pointe('pa-bp', bp)}${pointe('pa-chaud', eauChaude)}${pointe('pa-tiede', eauTiede)}${pointe('pa-air', C.navy)}</defs>
<rect x="10" y="10" width="800" height="550" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- dedans / dehors -->
<rect x="40" y="30" width="740" height="220" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${T(56, 58, 'DEDANS — module hydraulique')}
<line x1="60" y1="269" x2="730" y2="269" stroke="${C.gris}" stroke-width="10" stroke-dasharray="26 10"/>
${T(738, 274, 'le mur', { couleur: C.gris, gras: false, taille: 14 })}
<rect x="40" y="288" width="740" height="262" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${T(100, 314, 'DEHORS — unité extérieure')}

<!-- les tubes du fluide : les deux liaisons (rouges) traversent le mur -->
${tube('M725 340 V48 H470 V110', hp, on(1, 2), 'pa-hp')}
${tube('M330 170 H70 V392', hp, on(4), 'pa-hp')}
${tube('M70 448 V455 H300', bp, on(4), 'pa-bp')}
${tube('M520 495 H725 V400', bp, on(1), 'pa-bp')}

<!-- les tubes d'eau -->
${tube('M490 135 H545', eauChaude, on(2, 3), 'pa-chaud')}
${tube('M655 185 V225 H410 V180', eauTiede, on(3), 'pa-tiede')}

<!-- condenseur à plaques, en haut -->
${canaux}${plaques}
<rect x="330" y="110" width="160" height="70" fill="none" stroke="${on(2) ? C.feu : C.navy}" stroke-width="${on(2) ? 7 : 3}"/>
${T(320, 132, 'condenseur', { ancre: 'end', couleur: on(2) ? hp : C.navy })}
${T(320, 150, 'à plaques', { ancre: 'end', couleur: on(2) ? hp : C.navy })}

<!-- émetteur (un radiateur) et circulateur, dedans -->
<rect x="545" y="80" width="110" height="105" rx="8" fill="${C.papier}" stroke="${on(3) ? C.feu : C.navy}" stroke-width="${on(3) ? 6 : 3}"/>
${fentes}
${T(600, 208, 'émetteur', { ancre: 'middle', couleur: on(3) ? eauChaude : C.navy })}
${on(3) ? fleches(['M664 110 h28', 'M664 135 h28', 'M664 160 h28'], eauChaude, 'pa-chaud') : ''}
<circle cx="470" cy="225" r="16" fill="${C.papier}" stroke="${on(3) ? C.feu : C.navy}" stroke-width="${on(3) ? 5 : 3}"/>
<path d="M463 217 V233 L479 225 z" fill="${on(3) ? C.feu : C.navy}"/>
${T(470, 203, 'circulateur', { ancre: 'middle', couleur: on(3) ? eauChaude : C.navy })}

<!-- évaporateur, en bas : serpentin, ailettes, ventilateur au-dessus -->
${ailettes}
<g fill="none" stroke="${givre ? C.doux : bp}" stroke-width="${on(0) ? 7 : 4}" stroke-linecap="round">
  <path d="M300 455 H520 M300 475 H520 M300 495 H520"/>
  <path d="M520 455 c18 0 18 20 0 20 M300 475 c-18 0 -18 20 0 20"/>
</g>
${flocons}
${T(410, 436, 'évaporateur', { ancre: 'middle', couleur: on(0) ? bp : C.navy })}
<circle cx="410" cy="372" r="32" fill="none" stroke="${on(0) ? C.feu : C.navy}" stroke-width="3"/>
<path d="M410 340 v64 M378 372 h64 M387 349 l46 46 M433 349 l-46 46" stroke="${on(0) ? C.feu : C.navy}" stroke-width="2"/>
${T(458, 377, 'ventilateur', { couleur: C.gris, gras: false })}
${on(0) ? `${fleches(['M350 540 V514', 'M410 540 V514', 'M470 540 V514'], C.navy, 'pa-air', 3)}
${T(500, 532, 'air du dehors', { couleur: C.navy })}
${fleches(['M392 336 V314', 'M428 336 V314'], bp, 'pa-bp', 3)}
${T(475, 322, 'air refroidi', { couleur: bp })}` : ''}
${givre ? T(545, 452, 'givre', { couleur: C.bleu }) + T(395, 204, 'chaleur reprise sur l’eau', { ancre: 'end', couleur: eauTiede }) : ''}

<!-- compresseur, à droite -->
<rect x="690" y="340" width="70" height="60" rx="10" fill="${C.papier}" stroke="${on(1) ? C.feu : C.navy}" stroke-width="${on(1) ? 6 : 3}"/>
${T(680, 376, 'compresseur', { ancre: 'end', couleur: on(1) ? hp : C.navy })}

<!-- détendeur, à gauche (deux triangles pointe à pointe) -->
<path d="M70 420 L54 392 H86 Z M70 420 L54 448 H86 Z" fill="${C.papier}" stroke="${on(4) ? C.feu : C.navy}" stroke-width="${on(4) ? 5 : 3}" stroke-linejoin="round"/>
${T(96, 424, 'détendeur', { couleur: on(4) ? bp : C.navy })}

<!-- légende des couleurs -->
<path d="M96 92 H124" stroke="${eauChaude}" stroke-width="6"/>${T(132, 97, 'eau chaude', { couleur: eauChaude, taille: 14 })}
<path d="M96 116 H124" stroke="${eauTiede}" stroke-width="6"/>${T(132, 121, 'eau tiède', { couleur: eauTiede, taille: 14 })}
<path d="M110 500 H140" stroke="${hp}" stroke-width="6"/>${T(150, 505, 'haute pression', { couleur: hp, taille: 14 })}
<path d="M110 526 H140" stroke="${bp}" stroke-width="6"/>${T(150, 531, 'basse pression', { couleur: bp, taille: 14 })}`;
    };

    const etapes = [
      { titre: 'L’air du dehors donne sa chaleur à l’évaporateur',
        dire: 'Le ventilateur fait passer l’air extérieur dans la batterie. Le fluide qui y circule est plus froid que cet air, même par temps de gel : la chaleur passe de l’air au fluide, qui bout et devient gaz. L’air ressort plus froid.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Le compresseur monte la pression',
        dire: 'Le compresseur aspire ce gaz et le comprime. En sortie il est très chaud, bien plus que l’eau à chauffer. Il part par la liaison gaz et traverse le mur.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Le condenseur à plaques chauffe l’eau',
        dire: 'Dedans, le gaz chaud passe d’un côté des plaques, l’eau du chauffage de l’autre. Le fluide se refroidit et redevient liquide ; l’eau s’échauffe. Rien ne se mélange, seule la chaleur passe.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'L’eau part vers l’émetteur',
        dire: 'Le circulateur pousse l’eau chaude vers le radiateur ou le plancher, qui rend la chaleur à la pièce. L’eau revient plus tiède et repart vers le condenseur.',
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'Le détendeur fait chuter la pression',
        dire: 'Le fluide, redevenu liquide, repart vers le détendeur par la liaison liquide, qui traverse le mur. Sa pression tombe d’un coup, il redevient froid, et il repart vers l’évaporateur. Le tour recommence.',
        peindre: () => { etape = 4; peindre(); } },
      { titre: 'Et par grand froid ? Le givre',
        dire: 'Par temps froid et humide, l’évaporateur se couvre de givre et l’air ne passe plus. La machine inverse son cycle quelques minutes pour faire fondre la glace : elle reprend alors de la chaleur sur l’eau du chauffage. C’est normal, ce n’est pas une panne.',
        peindre: () => { etape = 5; peindre(); } }
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

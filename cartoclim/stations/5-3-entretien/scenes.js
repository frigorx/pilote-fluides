/* CartoClim 5.3 — scènes de l'entretien.
   Temps 2 : un split dessiné d'un seul tenant — l'unité extérieure en haut (batterie, hélice, compresseur),
   le mur, l'unité intérieure en bas (filtre, batterie, turbine, bac), les deux liaisons isolées entre les deux,
   le tuyau de condensats qui sort. Six points d'entretien numérotés, allumés un par un ; sous le dessin, un
   bandeau dit ce qu'on voit quand le point est oublié (cause → effet). Aucune valeur chiffrée : ni rythme
   d'entretien, ni pression, ni température.
   Temps 5 : qui fait quoi, et le signe qui trahit chaque point oublié.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* Pictogrammes des aptitudes et du récapitulatif, tracés dans un carré 0 0 100 100, sans couleur. */
  const ICONES = {
    filtre: '<rect x="12" y="24" width="76" height="52" rx="6"/><path d="M22 34 L33 66 L44 34 L55 66 L66 34 L77 66"/>',
    duree: '<circle cx="50" cy="50" r="36"/><path d="M50 26 V52 L68 64"/>',
    cadenas: '<rect x="22" y="46" width="56" height="40" rx="8"/><path d="M34 46 V34 a16 16 0 0 1 32 0 V40"/><path d="M50 62 V72"/>',
    loupe: '<circle cx="42" cy="42" r="24"/><path d="M60 60 L86 86"/>'
  };
  const ico = (nom, x, y, t, coul, e = 2.6) =>
    `<g transform="translate(${x},${y}) scale(${t / 100})" fill="none" stroke="${coul}" stroke-width="${e * 100 / t}" stroke-linecap="round" stroke-linejoin="round">${ICONES[nom]}</g>`;

  const marqueur = cle => `<marker id="mk-${cle}" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="11" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${C[cle]}"/></marker>`;
  const AILETTE = 'rgba(27,58,99,.38)';

  /* Ce qu'on voit quand un point est oublié (le dernier point dit plutôt ce qu'on regarde). */
  const BANDES = [
    ['SI ON L’OUBLIE', 'l’air passe mal : le débit baisse et la batterie givre'],
    ['SI ON L’OUBLIE', 'l’air passe mal entre les ailettes : l’échange de chaleur baisse'],
    ['SI ON L’OUBLIE', 'le bac déborde : de l’eau au plafond'],
    ['SI ON L’OUBLIE', 'moins d’air brassé, du bruit, des vibrations'],
    ['SI ON L’OUBLIE', 'la haute pression monte et la machine consomme plus'],
    ['À REGARDER', 'isolant entier, unités bien fixées, accès dégagé']
  ];

  function lesSixPoints() {
    const d = svg('0 0 900 640',
      'Un split en schéma : l’unité extérieure en haut, avec sa batterie, son hélice et son compresseur ; l’unité intérieure en bas, avec le filtre, la batterie, la turbine et le bac à condensats ; deux liaisons isolées traversent le mur et un tuyau évacue l’eau vers l’extérieur. Six points d’entretien sont numérotés de 1 à 6 et s’allument l’un après l’autre.');
    let k = 0;
    const on = i => i === k;
    const ligne = (i, normal = C.navy) => on(i) ? C.feu : normal;
    const epais = (i, n = 3, a = 6) => on(i) ? a : n;

    const badge = (i, x, y, mot) => `<circle cx="${x}" cy="${y}" r="13" fill="${on(i) ? C.feu : C.papier}" stroke="${on(i) ? C.feu : C.navy}" stroke-width="2.5"/>
<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">${i + 1}</text>
<text x="${x + 21}" y="${y + 6}" font-size="16" font-weight="${on(i) ? 700 : 400}" fill="${on(i) ? C.orange : C.gris}">${mot}</text>`;

    /* un jeu de flèches d'air : plein, ou en pointillé gris quand le débit est freiné */
    const air = (x1, x2, ys, faible, cle) => ys.map(y => faible
      ? `<path d="M${x1} ${y} H${x2}" fill="none" stroke="${C.gris}" stroke-width="3" stroke-dasharray="7 7" marker-end="url(#mk-gris)"/>`
      : `<path d="M${x1} ${y} H${x2}" fill="none" stroke="${C[cle]}" stroke-width="5" marker-end="url(#mk-${cle})"/>`).join('');

    const goutte = (x, y) => `<path d="M${x} ${y} c-5 7 -8 11 -8 14 a8 8 0 0 0 16 0 c0 -3 -3 -7 -8 -14 z" fill="${C.eau}" stroke="none"/>`;
    const poussiere = pts => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${C.ambre}" opacity=".85" stroke="none"/>`).join('');

    const peindre = () => {
      const faibleDedans = k === 0 || k === 1 || k === 3;
      d.innerHTML = `
<defs>${['navy', 'froid', 'chaud', 'gris', 'eau', 'feu'].map(marqueur).join('')}</defs>
<rect x="10" y="10" width="880" height="620" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- ===== dehors : l'unité extérieure ===== -->
<rect x="60" y="36" width="780" height="180" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="76" y="60" font-size="15" font-weight="700" fill="${C.navy}">UNITÉ EXTÉRIEURE — dehors</text>

<!-- batterie extérieure (le condenseur) -->
<g stroke="${ligne(4)}" stroke-width="${epais(4, 4, 7)}" fill="none">
  <path d="M150 96 h180 M150 118 h180 M150 140 h180 M150 162 h180"/>
  <path d="M150 96 c-16 0 -16 22 0 22 M330 118 c16 0 16 22 0 22 M150 140 c-16 0 -16 22 0 22"/>
</g>
<g stroke="${AILETTE}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<line x1="${164 + i * 18}" y1="84" x2="${164 + i * 18}" y2="174"/>`).join('')}</g>
${on(4) ? poussiere([[170, 92], [188, 112], [166, 128], [206, 146], [176, 160], [224, 100], [242, 130], [260, 158]]) + `
<ellipse cx="156" cy="92" rx="11" ry="6" transform="rotate(-25 156 92)" fill="rgba(176,106,0,.55)" stroke="none"/>
<ellipse cx="152" cy="128" rx="11" ry="6" transform="rotate(20 152 128)" fill="rgba(176,106,0,.55)" stroke="none"/>
<ellipse cx="158" cy="160" rx="11" ry="6" transform="rotate(-15 158 160)" fill="rgba(176,106,0,.55)" stroke="none"/>` : ''}
${badge(4, 170, 198, 'batterie extérieure')}

<!-- hélice -->
<circle cx="450" cy="130" r="36" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M450 94 V166 M414 130 H486" stroke="${C.navy}" stroke-width="3"/>
<text x="450" y="198" text-anchor="middle" font-size="14" fill="${C.gris}">hélice</text>

<!-- compresseur -->
<rect x="600" y="96" width="100" height="70" rx="10" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<text x="650" y="136" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">compresseur</text>

<!-- l'air dehors : il entre par la batterie, l'hélice le chasse -->
${air(72, 126, [108, 130, 152], k === 4, 'navy')}
${air(500, 572, [108, 130, 152], k === 4, 'chaud')}

<!-- fixations de l'unité extérieure -->
<rect x="100" y="216" width="40" height="14" rx="3" fill="${on(5) ? 'rgba(255,107,53,.25)' : C.creme}" stroke="${ligne(5)}" stroke-width="${epais(5, 3, 5)}"/>
<rect x="640" y="216" width="40" height="14" rx="3" fill="${on(5) ? 'rgba(255,107,53,.25)' : C.creme}" stroke="${ligne(5)}" stroke-width="${epais(5, 3, 5)}"/>
${badge(5, 160, 232, 'fixations')}

<!-- ===== le mur ===== -->
<path d="M30 262 H870" fill="none" stroke="${C.gris}" stroke-width="10" stroke-dasharray="26 10" opacity=".55"/>
<text x="44" y="250" font-size="14" fill="${C.gris}">le mur</text>

<!-- ===== les deux liaisons, isolées : gros tube à gauche, petit tube à droite ===== -->
<path d="M730 216 V292" fill="none" stroke="${on(5) ? 'rgba(255,107,53,.30)' : 'rgba(27,58,99,.12)'}" stroke-width="26"/>
<path d="M770 216 V292" fill="none" stroke="${on(5) ? 'rgba(255,107,53,.30)' : 'rgba(27,58,99,.12)'}" stroke-width="18"/>
<path d="M730 216 V292" fill="none" stroke="${ligne(5, C.gris)}" stroke-width="${on(5) ? 10 : 8}"/>
<path d="M770 216 V292" fill="none" stroke="${ligne(5, C.gris)}" stroke-width="${on(5) ? 6 : 4}"/>
${badge(5, 580, 246, 'liaisons isolées')}

<!-- ===== dedans : l'unité intérieure ===== -->
<rect x="60" y="292" width="780" height="244" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="76" y="316" font-size="15" font-weight="700" fill="${C.navy}">UNITÉ INTÉRIEURE — dans la pièce</text>

<!-- l'air de la pièce entre, traverse le filtre, la batterie, la turbine, ressort -->
<text x="76" y="372" font-size="14" fill="${C.gris}">air de la pièce</text>
${air(76, 186, [388, 414, 440], faibleDedans, 'navy')}
${air(618, 700, [402, 420, 438], faibleDedans, 'froid')}
<text x="618" y="466" font-size="14" fill="${C.gris}">air soufflé</text>

<!-- 1 · le filtre -->
<rect x="198" y="372" width="14" height="118" rx="3" fill="${on(0) ? 'rgba(255,107,53,.25)' : C.papier}" stroke="${ligne(0)}" stroke-width="${epais(0, 3, 6)}"/>
<path d="${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `M198 ${384 + i * 10} H212`).join(' ')}" stroke="${ligne(0, C.gris)}" stroke-width="2" fill="none"/>
${on(0) ? poussiere([[205, 392], [205, 416], [205, 438], [205, 462], [205, 480]]) : ''}
${badge(0, 205, 346, 'filtre')}

<!-- 2 · la batterie intérieure (l'évaporateur) -->
<g stroke="${ligne(1, C.froid)}" stroke-width="${epais(1, 4, 7)}" fill="none">
  <path d="M250 394 h200 M250 420 h200 M250 446 h200"/>
  <path d="M250 394 c-14 0 -14 26 0 26 M450 420 c14 0 14 26 0 26"/>
</g>
<g stroke="${AILETTE}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<line x1="${264 + i * 18}" y1="378" x2="${264 + i * 18}" y2="458"/>`).join('')}</g>
${on(0) ? `<rect x="252" y="380" width="196" height="76" fill="${C.doux}" opacity=".38" stroke="none"/>
<g stroke="${C.froid}" stroke-width="3" stroke-linecap="round" fill="none">${[[282, 388], [348, 390], [414, 388], [300, 450], [372, 452], [436, 450]].map(([x, y]) =>
  `<path d="M${x - 7} ${y} H${x + 7} M${x} ${y - 7} V${y + 7} M${x - 5} ${y - 5} L${x + 5} ${y + 5} M${x - 5} ${y + 5} L${x + 5} ${y - 5}"/>`).join('')}</g>` : ''}
${on(1) ? poussiere([[273, 388], [291, 430], [309, 402], [327, 448], [345, 416], [363, 390], [381, 436], [399, 404], [417, 450], [435, 420]]) : ''}
${badge(1, 300, 346, 'batterie intérieure')}

<!-- 4 · la turbine -->
<ellipse cx="548" cy="420" rx="38" ry="32" fill="none" stroke="${ligne(3)}" stroke-width="${epais(3, 3, 6)}"/>
<path d="M548 388 V452 M510 420 H586" fill="none" stroke="${ligne(3)}" stroke-width="${epais(3, 2, 4)}"/>
${on(3) ? poussiere([[530, 404], [566, 436], [538, 440], [560, 404]]) + `
<path d="M498 400 q-8 20 0 40 M598 400 q8 20 0 40" fill="none" stroke="${C.ambre}" stroke-width="3" stroke-linecap="round"/>` : ''}
${badge(3, 520, 346, 'turbine')}

<!-- 3 · le bac et son tuyau -->
<path d="M240 462 v14 h232 v-14" fill="none" stroke="${ligne(2)}" stroke-width="${epais(2, 4, 7)}" stroke-linejoin="round"/>
<rect x="244" y="468" width="224" height="6" fill="${C.eau}" opacity=".5" stroke="none"/>
<path d="M456 476 V516 H812 V240" fill="none" stroke="${on(2) ? C.feu : C.eau}" stroke-width="${on(2) ? 8 : 5}" stroke-linejoin="round" marker-end="url(#mk-${on(2) ? 'feu' : 'eau'})"/>
<text x="822" y="244" font-size="14" fill="${C.gris}">dehors</text>
${on(2) ? `<rect x="244" y="450" width="224" height="24" fill="${C.eau}" opacity=".35" stroke="none"/>
${goutte(232, 486)}${goutte(226, 506)}${goutte(486, 488)}
<circle cx="640" cy="516" r="10" fill="rgba(176,106,0,.65)" stroke="${C.ambre}" stroke-width="3"/>` : ''}
${badge(2, 270, 500, 'bac et tuyau')}

<!-- le bandeau : ce qu'on voit quand le point est oublié -->
<rect x="40" y="556" width="820" height="60" rx="12" fill="${C.creme}" stroke="${C.feu}" stroke-width="3"/>
<text x="62" y="580" font-size="14" font-weight="700" fill="${C.orange}">${BANDES[k][0]}</text>
<text x="62" y="605" font-size="19" font-weight="700" fill="${C.navy}">${BANDES[k][1]}</text>`;
    };

    const etapes = [
      { titre: 'Le filtre arrête la poussière',
        dire: 'Le filtre est la première grille que l’air de la pièce rencontre. Quand la poussière le bouche, l’air passe mal : la batterie reçoit moins de chaleur et finit par givrer. C’est la part de l’utilisateur : il le lave, ou le change si c’est nécessaire.',
        peindre: () => { k = 0; peindre(); } },
      { titre: 'La batterie intérieure garde ses ailettes ouvertes',
        dire: 'Ce que le filtre laisse passer se colle entre les ailettes de la batterie. L’air traverse de plus en plus mal et l’échange de chaleur baisse. Le technicien la nettoie, sans écraser les ailettes : elles sont fines.',
        peindre: () => { k = 1; peindre(); } },
      { titre: 'Le bac et le tuyau laissent sortir l’eau',
        dire: 'L’eau de l’air tombe dans le bac et part par le tuyau, jusqu’à dehors. Si quelque chose bouche le bac ou le tuyau, l’eau déborde : c’est le plafond du client qui coule. Le technicien verse de l’eau dans le bac et regarde si elle ressort au bout du tuyau.',
        peindre: () => { k = 2; peindre(); } },
      { titre: 'La turbine brasse l’air sans freiner',
        dire: 'La turbine aspire l’air de la pièce et le souffle à travers la batterie. Encrassée, elle brasse moins d’air et vibre. Le technicien la nettoie et vérifie qu’elle tourne sans bruit anormal.',
        peindre: () => { k = 3; peindre(); } },
      { titre: 'La batterie extérieure respire',
        dire: 'Dehors, l’hélice pousse l’air à travers la batterie. Feuilles et poussière l’étouffent : l’air ne passe plus, la haute pression monte et la machine consomme plus. On nettoie à l’eau à basse pression ou au peigne à ailettes, jamais au jet puissant droit sur les ailettes.',
        peindre: () => { k = 4; peindre(); } },
      { titre: 'Les liaisons et les fixations tiennent',
        dire: 'Le technicien regarde ce qui tient la machine et ce qui l’habille : l’isolant des deux tubes, les fixations des unités, le serrage des câbles, les traces d’oxydation, et l’air libre autour de l’unité extérieure.',
        peindre: () => { k = 5; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Six points, et chacun a son signe quand on l’oublie. Le rythme des visites vient de la notice et de la réglementation : aucun n’est donné ici.');
  }

  /* Temps 5 : qui fait quoi, et le signe qui trahit chaque point oublié. */
  function recapitulatif() {
    const d = svg('0 0 900 430', 'Récapitulatif : à gauche, qui fait quoi — l’utilisateur lave les filtres, le technicien nettoie et mesure, une personne attestée seule touche au circuit du fluide ; à droite, trois signes qui trahissent un point oublié : du givre ou un air faible, une haute pression élevée, de l’eau au plafond.');
    const gauche = [
      ['filtre', 'L’utilisateur', 'lave ses filtres', 'ou les change, si c’est nécessaire'],
      ['loupe', 'Le technicien', 'batteries, bac et tuyau, turbine', 'isolant, fixations, mesures, carnet'],
      ['cadenas', 'Une personne attestée', 'tout ce qui touche au circuit du fluide', 'voir la Législation']
    ];
    const droite = [
      ['Du givre, un air qui souffle mal', '→ le filtre, puis la batterie intérieure'],
      ['La haute pression est élevée', '→ la batterie extérieure, encrassée'],
      ['De l’eau coule au plafond', '→ le bac ou le tuyau de condensats']
    ];
    d.innerHTML = `
<rect x="10" y="10" width="880" height="410" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="40" y="44" font-size="16" font-weight="700" fill="${C.navy}">QUI FAIT QUOI</text>
<text x="470" y="44" font-size="16" font-weight="700" fill="${C.navy}">CE QUI SE VOIT QUAND ON L’OUBLIE</text>
<line x1="455" y1="30" x2="455" y2="398" stroke="${C.trait}" stroke-width="2"/>
${gauche.map(([icone, qui, l1, l2], i) => {
  const y = 62 + i * 112;
  return `<rect x="40" y="${y}" width="400" height="100" rx="12" fill="${C.creme}" stroke="${i === 2 ? C.feu : C.navy}" stroke-width="3"${i === 2 ? ' stroke-dasharray="9 6"' : ''}/>
${ico(icone, 56, y + 28, 44, i === 2 ? C.orange : C.navy)}
<text x="118" y="${y + 32}" font-size="19" font-weight="700" fill="${C.navy}">${qui}</text>
<text x="118" y="${y + 58}" font-size="17" fill="${C.navy}">${l1}</text>
<text x="118" y="${y + 83}" font-size="15" fill="${C.gris}">${l2}</text>`;
}).join('\n')}
${droite.map(([signe, point], i) => {
  const y = 62 + i * 112;
  return `<rect x="470" y="${y}" width="400" height="100" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="490" y="${y + 40}" font-size="19" font-weight="700" fill="${C.navy}">${signe}</text>
<text x="490" y="${y + 74}" font-size="17" font-weight="700" fill="${C.orange}">${point}</text>`;
}).join('\n')}`;
    return d;
  }

  return { lesSixPoints, recapitulatif, icones: ICONES };
})();

/* CartoClim 5.6 — scènes des codes défauts.
   Temps 2 : deux dessins. Le premier déroule la démarche en cinq pas (relever le code, ouvrir la
   notice, trouver la famille, vérifier sur la machine, remettre en marche) ; le second montre trois
   familles de codes, avec le point de la machine en cause allumé.
   Aucun code d'une marque réelle : l'exemple (trois clignotements = communication) est inventé.
   Temps 5 : la table des familles, en un dessin.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;

  /* ------------------------------------------------------------------------------------------
     Temps 2 — dessin 1 : la démarche, en cinq pas. */
  function situation() {
    const d = svg('0 0 820 470',
      'Une pièce à gauche, le dehors à droite, séparés par le mur. Dans la pièce, une unité intérieure murale avec sa LED, une télécommande avec son écran, et la notice ouverte sur sa table des codes. Dehors, l’unité extérieure avec son hélice et son bornier. Un câble relie les deux unités à travers le mur. Cinq pas : relever le code, ouvrir la notice, trouver la famille, vérifier sur la machine, remettre en marche.');
    let etape = 0;
    const rayons = (cx, cy) => [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
      const a = i * Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
      return `<line x1="${(cx + 15 * c).toFixed(1)}" y1="${(cy + 15 * s).toFixed(1)}" x2="${(cx + 23 * c).toFixed(1)}" y2="${(cy + 23 * s).toFixed(1)}"/>`;
    }).join('');

    const peindre = () => {
      const led = etape === 4 ? C.vert : C.feu;
      d.innerHTML = `
<rect x="10" y="10" width="800" height="450" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- dedans / dehors, séparés par le mur -->
<text x="40" y="42" font-size="14" font-weight="700" fill="${C.navy}">DANS LA PIÈCE</text>
<text x="560" y="42" font-size="14" font-weight="700" fill="${C.navy}">DEHORS</text>
<line x1="470" y1="30" x2="470" y2="220" stroke="${C.gris}" stroke-width="10" stroke-dasharray="26 10"/>
<text x="470" y="244" text-anchor="middle" font-size="14" fill="${C.gris}">le mur</text>

<!-- l'unité intérieure et sa LED -->
<rect x="40" y="70" width="300" height="90" rx="16" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<path d="M62 138 H318" stroke="${C.navy}" stroke-width="2" fill="none"/>
<text x="190" y="184" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité intérieure</text>
<circle cx="310" cy="100" r="9" fill="${led}" stroke="${etape === 0 ? C.feu : C.navy}" stroke-width="2"/>
${etape === 0 ? `<g stroke="${C.feu}" stroke-width="3" stroke-linecap="round">${rayons(310, 100)}</g>
<text x="340" y="58" text-anchor="end" font-size="14" font-weight="700" fill="${C.orange}">la LED clignote : 3 fois</text>` : ''}
${etape === 4 ? `<text x="340" y="58" text-anchor="end" font-size="14" font-weight="700" fill="${C.vert}">la LED ne clignote plus</text>` : ''}

<!-- le câble entre les unités : de l'unité intérieure au bornier de l'unité extérieure -->
<text x="405" y="158" text-anchor="middle" font-size="14" font-weight="700" fill="${etape === 3 ? C.orange : C.navy}">câble entre</text>
<text x="405" y="174" text-anchor="middle" font-size="14" font-weight="700" fill="${etape === 3 ? C.orange : C.navy}">les unités</text>

<!-- l'unité extérieure : hélice, bornier -->
<rect x="560" y="60" width="210" height="150" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="625" cy="140" r="42" fill="none" stroke="${etape === 4 ? C.vert : C.navy}" stroke-width="${etape === 4 ? 5 : 3}"/>
<path d="M625 98 V182 M583 140 H667" fill="none" stroke="${etape === 4 ? C.vert : C.navy}" stroke-width="${etape === 4 ? 5 : 3}"/>
<rect x="708" y="112" width="48" height="70" rx="6" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="732" cy="128" r="6" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<circle cx="732" cy="147" r="${etape === 3 ? 8 : 6}" fill="${etape === 3 ? C.feu : C.creme}" stroke="${etape === 3 ? C.feu : C.navy}" stroke-width="2"/>
<circle cx="732" cy="166" r="6" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<path d="M340 135 H515 V80 H732 V112" fill="none" stroke="${etape === 3 ? C.feu : C.navy}" stroke-width="${etape === 3 ? 6 : 3}"${etape === 3 ? '' : ' stroke-dasharray="8 6"'} stroke-linejoin="round"/>
<text x="665" y="234" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité extérieure</text>
${etape === 3 ? `<text x="665" y="252" text-anchor="middle" font-size="14" font-weight="700" fill="${C.orange}">bornier : un fil desserré</text>` : ''}
${etape === 4 ? `<text x="665" y="252" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">l’hélice tourne</text>` : ''}

<!-- la télécommande et son écran -->
<rect x="50" y="262" width="72" height="140" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="62" y="276" width="48" height="38" rx="5" fill="${C.papier}" stroke="${etape === 0 ? C.feu : C.navy}" stroke-width="${etape === 0 ? 4 : 2}"/>
${etape === 4
  ? `<path d="M74 296 l8 9 l16 -18" fill="none" stroke="${C.vert}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
  : `<path d="M86 284 L101 308 L71 308 Z M86 292 V299 M86 303 V304" fill="none" stroke="${etape === 0 ? C.feu : C.gris}" stroke-width="${etape === 0 ? 3 : 2}" stroke-linejoin="round" stroke-linecap="round"/>`}
<circle cx="86" cy="340" r="7" fill="${C.papier}" stroke="${C.navy}" stroke-width="2"/>
<circle cx="86" cy="362" r="7" fill="${C.papier}" stroke="${C.navy}" stroke-width="2"/>
<circle cx="86" cy="384" r="7" fill="${C.papier}" stroke="${C.navy}" stroke-width="2"/>
<text x="86" y="424" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">télécommande</text>
${etape === 0 ? `<text x="134" y="296" font-size="14" font-weight="700" fill="${C.orange}">le code s’affiche</text>` : ''}

<!-- la notice ouverte sur sa table des codes (exemple inventé) -->
<rect x="270" y="262" width="290" height="150" rx="10" fill="${C.papier}" stroke="${etape === 1 ? C.feu : C.navy}" stroke-width="${etape === 1 ? 6 : 3}"/>
<text x="415" y="288" text-anchor="middle" font-size="14" font-weight="700" fill="${etape === 1 ? C.orange : C.navy}">NOTICE — table des codes</text>
<path d="M286 298 H544 M286 332 H544 M286 366 H544" fill="none" stroke="${C.trait}" stroke-width="2"/>
<circle cx="300" cy="315" r="5" fill="${C.navy}"/>
<circle cx="300" cy="349" r="5" fill="${C.navy}"/><circle cx="318" cy="349" r="5" fill="${C.navy}"/>
<circle cx="300" cy="383" r="5" fill="${C.navy}"/><circle cx="318" cy="383" r="5" fill="${C.navy}"/><circle cx="336" cy="383" r="5" fill="${C.navy}"/>
<text x="380" y="320" font-size="14" fill="${C.navy}">sonde</text>
<text x="380" y="354" font-size="14" fill="${C.navy}">pression</text>
<text x="380" y="388" font-size="14" fill="${C.navy}">communication</text>
${etape === 2 ? `<rect x="278" y="368" width="266" height="30" rx="6" fill="${C.feu}" fill-opacity=".14" stroke="${C.feu}" stroke-width="3"/>` : ''}
<text x="415" y="431" text-anchor="middle" font-size="13" fill="${C.gris}">(exemple inventé)</text>

<!-- le code écrit, avant de couper -->
<rect x="640" y="272" width="130" height="104" rx="8" fill="${C.papier}" stroke="${etape === 0 ? C.feu : C.navy}" stroke-width="${etape === 0 ? 5 : 3}"/>
<path d="M656 296 H754 M656 318 H754" fill="none" stroke="${C.trait}" stroke-width="2"/>
<circle cx="668" cy="346" r="5" fill="${etape === 0 ? C.feu : C.gris}"/><circle cx="686" cy="346" r="5" fill="${etape === 0 ? C.feu : C.gris}"/><circle cx="704" cy="346" r="5" fill="${etape === 0 ? C.feu : C.gris}"/>
<text x="705" y="398" text-anchor="middle" font-size="14" font-weight="700" fill="${etape === 0 ? C.orange : C.gris}">j’écris le code,</text>
<text x="705" y="414" text-anchor="middle" font-size="14" font-weight="700" fill="${etape === 0 ? C.orange : C.gris}">avant de couper</text>`;
    };

    const etapes = [
      { titre: 'Relever le code', dire: 'La machine est à l’arrêt et la LED clignote : trois fois, puis une pause. C’est la carte qui parle. Avant de toucher à quoi que ce soit, on écrit ce qu’elle dit, ou on photographie l’écran : couper l’alimentation peut faire disparaître le code.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Ouvrir la notice', dire: 'Le code est celui du constructeur : seule la notice de cet appareil le traduit. On cherche sa table des codes, ou l’étiquette collée sous le capot.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Trouver la famille', dire: 'Dans cet exemple inventé, trois clignotements veulent dire : communication. Le code ne désigne pas une pièce cassée, il désigne une famille de pannes. On sait où chercher.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Vérifier sur la machine', dire: 'Famille communication : on regarde le câble entre les deux unités et ses bornes. Ici, au bornier de l’unité extérieure, un fil est desserré. C’est la cause réelle, on l’a vue.',
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'Remettre en marche', dire: 'On serre le fil, on rétablit l’alimentation, on remet en marche comme la notice le prévoit. La LED ne clignote plus, l’hélice tourne. On reste un moment pour s’assurer que le code ne revient pas.',
        peindre: () => { etape = 4; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Exemple inventé : chaque constructeur a sa propre table des codes. Si la machine vient de s’arrêter et qu’aucun code n’apparaît, patientez : le compresseur attend quelques minutes avant de redémarrer. Ce n’est pas un défaut.');
  }

  /* ------------------------------------------------------------------------------------------
     Temps 2 — dessin 2 : trois familles de codes. Même machine, même place : seul le point
     de la machine en cause s'allume. Dehors en haut, dedans en bas (croix du frigoriste). */
  function familles() {
    const d = svg('0 0 820 430',
      'La machine en deux blocs. En haut, l’unité extérieure avec sa carte, son condenseur, son hélice, son compresseur et un pressostat haute pression. En bas, l’unité intérieure avec sa carte, son évaporateur, une sonde de batterie et sa turbine. Un câble de communication relie les deux cartes à travers le mur. Trois familles de codes : communication, sonde, pression ; dans chacune, la partie en cause s’allume.');
    let mode = 'comm';

    const peindre = () => {
      const cC = mode === 'comm', cS = mode === 'sonde', cP = mode === 'pression';
      d.innerHTML = `
<rect x="10" y="10" width="800" height="410" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- dehors -->
<rect x="40" y="30" width="740" height="170" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="52" y="52" font-size="14" font-weight="700" fill="${C.navy}">UNITÉ EXTÉRIEURE — dehors</text>
<rect x="70" y="84" width="100" height="64" rx="8" fill="${C.papier}" stroke="${cC ? C.feu : C.navy}" stroke-width="${cC ? 6 : 3}"/>
<text x="120" y="122" text-anchor="middle" font-size="14" font-weight="700" fill="${cC ? C.orange : C.navy}">carte</text>
<path d="M290 96 h160 M290 114 h160 M290 132 h160 M290 150 h160" fill="none" stroke="${C.navy}" stroke-width="4"/>
<g stroke="${C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<line x1="${300 + i * 18}" y1="86" x2="${300 + i * 18}" y2="160"/>`).join('')}</g>
<text x="370" y="184" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">condenseur</text>
<circle cx="540" cy="122" r="30" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M540 92 V152 M510 122 H570" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="540" y="174" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">hélice</text>
<rect x="640" y="100" width="120" height="60" rx="10" fill="${C.papier}" stroke="${C.navy}" stroke-width="3"/>
<text x="700" y="135" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">compresseur</text>
<path d="M700 100 V72 H450 V96" fill="none" stroke="${cP ? C.feu : C.navy}" stroke-width="${cP ? 6 : 4}" stroke-linejoin="round"/>
<circle cx="620" cy="72" r="9" fill="${cP ? C.feu : C.papier}" stroke="${cP ? C.feu : C.navy}" stroke-width="3"/>
<text x="620" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="${cP ? C.orange : C.navy}">pressostat haute pression</text>

<!-- le mur -->
<line x1="20" y1="225" x2="690" y2="225" stroke="${C.gris}" stroke-width="10" stroke-dasharray="26 10"/>
<text x="706" y="230" font-size="14" fill="${C.gris}">le mur</text>

<!-- dedans -->
<rect x="40" y="250" width="740" height="150" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="140" y="272" font-size="14" font-weight="700" fill="${C.navy}">UNITÉ INTÉRIEURE — dans la pièce</text>
<rect x="70" y="294" width="100" height="64" rx="8" fill="${C.papier}" stroke="${cC ? C.feu : C.navy}" stroke-width="${cC ? 6 : 3}"/>
<text x="120" y="332" text-anchor="middle" font-size="14" font-weight="700" fill="${cC ? C.orange : C.navy}">carte</text>
<path d="M290 308 h160 M290 324 h160 M290 340 h160 M290 356 h160" fill="none" stroke="${C.navy}" stroke-width="4"/>
<g stroke="${C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<line x1="${300 + i * 18}" y1="298" x2="${300 + i * 18}" y2="366"/>`).join('')}</g>
<text x="370" y="386" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">évaporateur</text>
<path d="M281 332 H170" fill="none" stroke="${cS ? C.feu : C.navy}" stroke-width="${cS ? 4 : 2}"/>
<circle cx="288" cy="332" r="7" fill="${cS ? C.feu : C.papier}" stroke="${cS ? C.feu : C.navy}" stroke-width="3"/>
<text x="225" y="318" text-anchor="middle" font-size="14" font-weight="700" fill="${cS ? C.orange : C.navy}">sonde</text>
<ellipse cx="580" cy="332" rx="36" ry="26" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M580 306 V358 M544 332 H616" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="580" y="382" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">turbine</text>

<!-- le câble de communication, d'une carte à l'autre -->
<path d="M120 148 V294" fill="none" stroke="${cC ? C.feu : C.navy}" stroke-width="${cC ? 6 : 3}"${cC ? '' : ' stroke-dasharray="8 6"'}/>
<text x="136" y="186" font-size="14" font-weight="700" fill="${cC ? C.orange : C.navy}">câble de communication</text>`;
    };

    const appliquer = m => () => { mode = m; peindre(); };
    const legComm = 'Famille communication : les deux cartes ne se parlent plus. On regarde le câble entre les unités et ses bornes, puis les cartes.';
    peindre();
    return etats(d, [
      { id: 'comm', libelle: 'Communication', appliquer: appliquer('comm'), legende: legComm },
      { id: 'sonde', libelle: 'Sonde', appliquer: appliquer('sonde'),
        legende: 'Famille sonde : la carte reçoit une mesure impossible. On contrôle la sonde de batterie, son fil et son raccord, avant de soupçonner la carte.' },
      { id: 'pression', libelle: 'Pression', appliquer: appliquer('pression'),
        legende: 'Famille pression : le pressostat signale une pression trop haute. Condenseur encrassé, hélice arrêtée : on regarde, puis on mesure avec le manomètre (station 5.4).' }
    ], 'comm', legComm);
  }

  /* Le temps 2 montre les deux dessins l'un sous l'autre. */
  function lireLeCode() {
    const hote = document.createElement('div');
    const intro = document.createElement('p');
    intro.className = 'legende';
    intro.style.cssText = 'font-weight:700;color:' + C.navy + ';margin:1rem 0 .3rem';
    intro.textContent = 'Trois familles de codes, la même machine : le point en cause s’allume.';
    hote.append(situation(), intro, familles());
    return hote;
  }

  /* ------------------------------------------------------------------------------------------
     Temps 5 — le récapitulatif : les familles, ce que dit le code, où l'on vérifie. */
  function recapitulatif() {
    const d = svg('0 0 820 430', 'Récapitulatif : six lignes. Communication : les unités ne se parlent plus, on vérifie le câble, ses bornes, la carte. Sonde : mesure impossible, on vérifie la sonde et son raccord. Pression : trop haute ou trop basse, on vérifie le condenseur, l’hélice, le manomètre. Ventilateur : il ne tourne pas comme demandé, on vérifie l’hélice ou la turbine et le moteur. Compresseur ou Inverter : trop de courant, on mesure avant de changer. Pas un défaut : le compresseur attend quelques minutes, on patiente. En bas, la démarche en cinq pas.');
    const lignes = [
      ['Communication', 'les deux unités ne se parlent plus', 'le câble, ses bornes, la carte'],
      ['Sonde', 'une mesure impossible', 'la sonde et son raccord'],
      ['Pression', 'trop haute ou trop basse', 'condenseur, hélice, manomètre'],
      ['Ventilateur', 'il ne tourne pas comme demandé', 'hélice ou turbine, moteur'],
      ['Compresseur · Inverter', 'trop de courant, démarrage raté', 'on mesure avant de changer'],
      ['Pas un défaut', 'le compresseur attend quelques minutes', 'on patiente (voir la notice)']
    ];
    const rangs = lignes.map((l, i) => {
      const y = 66 + i * 52, pasDefaut = i === 5;
      return `<rect x="28" y="${y}" width="764" height="46" rx="10" fill="${pasDefaut ? C.papier : C.creme}" stroke="${pasDefaut ? C.gris : C.navy}" stroke-width="2"${pasDefaut ? ' stroke-dasharray="8 5"' : ''}/>
<text x="46" y="${y + 29}" font-size="15" font-weight="700" fill="${C.navy}">${l[0]}</text>
<text x="244" y="${y + 29}" font-size="15" fill="${C.navy}">${l[1]}</text>
<text x="556" y="${y + 29}" font-size="15" fill="${C.navy}">${l[2]}</text>`;
    }).join('\n');
    d.innerHTML = `
<rect x="10" y="10" width="800" height="410" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="46" y="52" font-size="16" font-weight="700" fill="${C.orange}">La famille</text>
<text x="244" y="52" font-size="16" font-weight="700" fill="${C.orange}">Ce que dit le code</text>
<text x="556" y="52" font-size="16" font-weight="700" fill="${C.orange}">Où l’on vérifie</text>
${rangs}
<text x="410" y="404" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Relever le code → ouvrir la notice → trouver la famille → vérifier → remettre en marche</text>`;
    return d;
  }

  return { lireLeCode, recapitulatif };
})();

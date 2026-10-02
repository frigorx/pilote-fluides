/* CartoClim 4.5 — scènes de l'alimentation et de la liaison des deux unités.
   Temps 2 : le chemin du courant, du tableau à l'unité intérieure, en six pas ; le dernier pas montre
   le défaut classique (le fil de communication croisé avec un autre fil).
   Disposition : dehors en haut, dedans en bas, le mur entre les deux (comme la station 3.2).
   Les repères 1, N, 2 et la borne de terre sont un EXEMPLE : la notice de l'appareil commande.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. Temps 5 : le récapitulatif. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* une couleur par fil — toujours doublée d'une étiquette et d'un style de trait */
  const PH = C.rouge, NE = C.froid, TE = C.vert, CO = C.ambre;

  function alimenterEtRelier() {
    const d = svg('0 0 820 620',
      'Schéma d’alimentation d’un split : en bas à gauche le tableau avec son différentiel et son disjoncteur dédié ; un câble monte au-dessus du mur jusqu’à l’interrupteur de proximité, puis à l’unité extérieure ; de son bornier repart un câble de quatre fils vers le bornier de l’unité intérieure, dans la maison.');
    let etape = 0;
    const est = (...k) => k.includes(etape);

    /* un fil : plein, ou tireté pour la terre ; plus épais et pleinement coloré quand il est « allumé » */
    const fil = (chemin, couleur, allume, tirets) =>
      `<path d="${chemin}" fill="none" stroke="${couleur}" stroke-width="${allume ? 7 : 5}" opacity="${allume ? 1 : .5}" stroke-linejoin="round" stroke-linecap="round"${tirets ? ' stroke-dasharray="12 7"' : ''}/>`;
    /* une pièce : contour navy au repos, orange épais quand elle agit, rouge quand elle est en défaut */
    const trait = (allume, defaut) => defaut ? `stroke="${C.rouge}" stroke-width="6"` : allume ? `stroke="${C.orange}" stroke-width="6"` : `stroke="${C.navy}" stroke-width="3"`;
    const borne = (x, y, rouge) => `<circle cx="${x}" cy="${y}" r="8" fill="${C.papier}" stroke="${rouge ? C.rouge : C.navy}" stroke-width="${rouge ? 4 : 3}"/>`;

    const peindre = () => {
      const croise = etape === 5;
      /* le câble d'interconnexion : quatre fils bornes à bornes ; au dernier pas, N et 2 se croisent côté intérieur */
      const filsLies = [
        { x: 420, couleur: PH, allume: est(3) },
        { x: 480, couleur: NE, allume: est(3, 5) },
        { x: 540, couleur: CO, allume: est(3, 4, 5) },
        { x: 600, couleur: TE, allume: est(3), tirets: true }
      ];
      const trace = f => {
        const croisement = croise && (f.x === 480 || f.x === 540);
        if (!croisement) return `M${f.x} 214 V364`;
        const arrivee = f.x === 480 ? 540 : 480;
        return `M${f.x} 214 V300 L${arrivee} 336 V364`;
      };

      const encadre = (x, y, w, h, rx, allume, defaut) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${C.papier}" ${trait(allume, defaut)}/>`;
      const petite = (x, y, w, h, allume, defaut) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${C.creme}" ${defaut ? `stroke="${C.rouge}" stroke-width="4"` : allume ? `stroke="${C.orange}" stroke-width="4"` : `stroke="${C.navy}" stroke-width="2.5"`}/>`;
      const t = (x, y, txt, o = {}) =>
        `<text x="${x}" y="${y}"${o.milieu ? ' text-anchor="middle"' : ''} font-size="${o.taille || 13}"${o.gras ? ' font-weight="700"' : ''} fill="${o.couleur || C.navy}">${txt}</text>`;

      d.innerHTML = `
<rect x="10" y="10" width="800" height="600" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- le mur, en bande, entre dehors et dedans ; puis les deux zones -->
<rect x="42" y="250" width="736" height="46" fill="rgba(99,114,133,.16)" stroke="${C.gris}" stroke-width="2" stroke-dasharray="8 6"/>
<rect x="30" y="34" width="760" height="216" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="30" y="296" width="760" height="250" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>

<!-- les pièces -->
${encadre(50, 380, 230, 150, 10, est(0))}
${petite(62, 420, 100, 58, est(0))}
${petite(170, 420, 100, 58, est(0))}
${encadre(150, 96, 160, 94, 10, est(1))}
${encadre(340, 76, 440, 156, 12, est(2))}
${petite(664, 96, 106, 96, est(2, 4))}
${encadre(340, 350, 440, 180, 12, est(3, 4), croise)}
${petite(664, 380, 106, 96, est(3, 4), croise)}
${etape === 4 ? `<rect x="356" y="452" width="262" height="48" rx="10" fill="${C.papier}" stroke="${C.vert}" stroke-width="3"/>` : ''}
${croise ? `<rect x="356" y="452" width="262" height="48" rx="10" fill="${C.papier}" stroke="${C.rouge}" stroke-width="3"/>` : ''}

<!-- le câble d'alimentation : du tableau à l'interrupteur (trois fils), puis dans l'unité extérieure.
     Dans l'unité : terre, neutre, phase, du plus lointain au plus proche, pour ne rien croiser. -->
${fil('M190 420 V190', PH, est(1))}
${fil('M220 420 V190', NE, est(1))}
${fil('M250 420 V190', TE, est(1), true)}
${fil('M310 126 H600 V198', TE, est(2), true)}
${fil('M310 148 H480 V198', NE, est(2))}
${fil('M310 170 H420 V198', PH, est(2))}

<!-- le câble d'interconnexion : quatre fils, un repère à chaque bout -->
${filsLies.map(f => fil(trace(f), f.couleur, f.allume, f.tirets)).join('\n')}

<!-- les bornes -->
${borne(420, 206)}${borne(480, 206)}${borne(540, 206)}${borne(600, 206)}
${borne(420, 372)}${borne(480, 372, croise)}${borne(540, 372, croise)}${borne(600, 372)}

<!-- les étiquettes, par-dessus -->
${t(44, 58, 'DEHORS', { taille: 14, gras: true })}
${t(44, 320, 'DANS LA MAISON', { taille: 14, gras: true })}
${t(56, 278, 'le mur', { taille: 13, couleur: C.gris })}
${t(266, 278, 'câble d’alimentation', { gras: true })}
${t(614, 278, 'câble d’interconnexion', { gras: true })}

${t(64, 404, 'Tableau', { taille: 15, gras: true })}
${t(112, 454, 'différentiel', { milieu: true, gras: true })}
${t(220, 446, 'disjoncteur', { milieu: true, gras: true })}
${t(220, 464, 'dédié', { milieu: true, gras: true })}
${t(165, 508, 'calibre : celui de la notice', { milieu: true, couleur: C.gris })}

${t(230, 138, 'Interrupteur', { milieu: true, taille: 14, gras: true })}
${t(230, 158, 'de proximité', { milieu: true, taille: 14, gras: true })}

${t(356, 102, 'Unité extérieure', { taille: 15, gras: true })}
${t(352, 211, 'bornier', { couleur: C.gris })}
${t(433, 211, '1', { taille: 14, gras: true })}${t(493, 211, 'N', { taille: 14, gras: true })}${t(553, 211, '2', { taille: 14, gras: true })}${t(613, 211, 'terre', { taille: 14, gras: true })}
${t(717, 138, 'carte et', { milieu: true, gras: true })}
${t(717, 156, 'compresseur', { milieu: true, gras: true })}

${t(356, 424, 'Unité intérieure', { taille: 15, gras: true })}
${t(352, 377, 'bornier', { couleur: C.gris })}
${t(433, 377, '1', { taille: 14, gras: true })}${t(493, 377, 'N', { taille: 14, gras: true })}${t(553, 377, '2', { taille: 14, gras: true })}${t(613, 377, 'terre', { taille: 14, gras: true })}
${t(717, 422, 'carte', { milieu: true, gras: true })}
${t(717, 440, 'électronique', { milieu: true, gras: true })}

${etape === 4 ? t(487, 481, 'les deux cartes se parlent', { milieu: true, taille: 15, gras: true, couleur: C.vert }) : ''}
${croise ? t(487, 481, 'défaut de communication', { milieu: true, taille: 15, gras: true, couleur: C.rouge }) + t(622, 324, 'repères croisés', { taille: 14, gras: true, couleur: C.rouge }) : ''}

<!-- la légende des fils -->
<path d="M44 564 H76" stroke="${PH}" stroke-width="5" stroke-linecap="round"/>
${t(84, 569, 'phase', { taille: 14 })}
<path d="M150 564 H182" stroke="${NE}" stroke-width="5" stroke-linecap="round"/>
${t(190, 569, 'neutre', { taille: 14 })}
<path d="M262 564 H294" stroke="${TE}" stroke-width="5" stroke-linecap="round" stroke-dasharray="12 7"/>
${t(302, 569, 'terre', { taille: 14 })}
<path d="M360 564 H392" stroke="${CO}" stroke-width="5" stroke-linecap="round"/>
${t(400, 569, 'fil de communication', { taille: 14 })}
${t(44, 595, 'Les repères 1, N et 2 sont un exemple : sur votre appareil, ce sont ceux de la notice qui font foi.', { couleur: C.gris })}`;
    };

    const etapes = [
      { titre: 'Le tableau protège la ligne',
        dire: 'Le courant part du tableau. Il passe par un différentiel et par un disjoncteur qui ne protège que ce climatiseur. En cas de défaut ou de surcharge, c’est lui qui coupe, avant que le câble chauffe.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'L’interrupteur coupe tout, tout près',
        dire: 'Un câble à trois fils monte jusqu’à l’unité extérieure. Juste à côté, un interrupteur de proximité : en l’ouvrant, on coupe l’unité sans retourner au tableau.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'L’unité extérieure est alimentée',
        dire: 'Phase, neutre et terre arrivent au bornier de l’unité extérieure. La carte et le compresseur reçoivent le courant du tableau.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Le câble relie les deux unités',
        dire: 'Du même bornier repart un câble de quatre fils vers l’unité intérieure. Sur la plupart des appareils, c’est ainsi qu’elle est alimentée. Chaque fil va au même repère des deux côtés : 1 avec 1, N avec N, 2 avec 2, la terre avec la terre.',
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'Les deux cartes se parlent',
        dire: 'Sur le fil de communication, les deux cartes électroniques s’échangent des messages : l’unité intérieure transmet la demande, l’unité extérieure répond. Ce fil ne porte pas d’énergie, seulement des messages.',
        peindre: () => { etape = 4; peindre(); } },
      { titre: 'Repères croisés : défaut de communication',
        dire: 'Ici, le fil de communication et le neutre sont croisés côté intérieur. Les cartes ne se comprennent plus : au premier démarrage, l’appareil affiche un défaut de communication. Une erreur de repère peut aussi abîmer l’appareil : on contrôle avant de remettre sous tension.',
        peindre: () => { etape = 5; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Qui alimente qui, et par quels repères, varie selon le constructeur : le schéma de la notice commande.');
  }

  /* Temps 5 : ce qu'on alimente, ce qu'on relie, ce qu'on évite — en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 356', 'Récapitulatif : du tableau à l’unité intérieure, cinq éléments reliés par des flèches ; dessous, quatre erreurs à éviter ; en bas, la règle de sécurité avant d’ouvrir un bornier.');
    const boite = (i, titres, details) => {
      const x = 24 + i * 162;
      return `<rect x="${x}" y="40" width="124" height="130" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${titres.map((t, k) => `<text x="${x + 62}" y="${64 + k * 18}" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">${t}</text>`).join('')}
${details.map((t, k) => `<text x="${x + 62}" y="${108 + k * 18}" text-anchor="middle" font-size="13" fill="${C.gris}">${t}</text>`).join('')}`;
    };
    const fleche = i => {
      const x = 24 + i * 162 + 124;
      return `<path d="M${x + 4} 105 H${x + 32}" fill="none" stroke="${C.navy}" stroke-width="3" marker-end="url(#fl-r)"/>`;
    };
    const piege = (i, gras, lignes) => {
      const x = 27 + i * 200;
      return `<rect x="${x}" y="222" width="176" height="78" rx="10" fill="${C.papier}" stroke="${C.rouge}" stroke-width="2.5"/>
<text x="${x + 88}" y="246" text-anchor="middle" font-size="13" font-weight="700" fill="${C.rouge}">${gras}</text>
${lignes.map((t, k) => `<text x="${x + 88}" y="${266 + k * 18}" text-anchor="middle" font-size="12" fill="${C.gris}">${t}</text>`).join('')}`;
    };
    d.innerHTML = `
<defs>
  <marker id="fl-r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.navy}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="336" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${boite(0, ['Tableau'], ['disjoncteur dédié', 'et différentiel', 'calibre : notice'])}
${fleche(0)}
${boite(1, ['Interrupteur', 'de proximité'], ['à portée de main', 'de l’unité', 'extérieure'])}
${fleche(1)}
${boite(2, ['Unité', 'extérieure'], ['reçoit le courant', 'câble prévu', 'pour dehors'])}
${fleche(2)}
${boite(3, ['Câble entre', 'les unités'], ['quatre fils', 'mêmes repères', 'des deux côtés'])}
${fleche(3)}
${boite(4, ['Unité', 'intérieure'], ['reçoit le câble', 'et ses quatre fils', 'terre en place'])}
<text x="28" y="206" font-size="15" font-weight="700" fill="${C.rouge}">À éviter</text>
${piege(0, 'Repères croisés', ['défaut de communication'])}
${piege(1, 'Pas de terre', ['risque de choc'])}
${piege(2, 'Câble de maison', ['posé dehors :', 'il vieillit au soleil'])}
${piege(3, 'Protection partagée', ['avec un autre circuit'])}
<text x="410" y="332" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">Avant d’ouvrir un bornier : on consigne (voir HoCourant).</text>`;
    return d;
  }

  return { alimenterEtRelier, recapitulatif };
})();

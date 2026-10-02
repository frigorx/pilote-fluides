/* CartoClim 2.4 — scènes de l'Inverter.
   Temps 2 : six pas. Deux courbes de température (tout-ou-rien en dents de scie, Inverter lissée),
   puis la chaîne réseau → redresseur → onduleur → moteur du compresseur, puis l'écart entre
   consigne et mesure qui fait monter ou descendre la vitesse.
   Temps 5 : le tableau tout-ou-rien / Inverter.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. Aucune valeur chiffrée : elles viennent de la notice. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;
  const TEINTE = 'rgba(201,69,26,.10)';                    /* fond léger de la pièce qui agit */

  const txt = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" text-anchor="${o.a || 'start'}" font-size="${o.s || 13}" font-weight="${o.w || 400}" fill="${o.f || C.gris}">${s}</text>`;

  function vitesseSuitLeBesoin() {
    const d = svg('0 0 820 590',
      'Deux courbes de température dans le temps : en dents de scie avec un compresseur tout-ou-rien, presque plate avec un Inverter. En dessous, la chaîne réseau, redresseur, onduleur, moteur du compresseur, et la comparaison de la consigne et de la mesure qui règle la vitesse.');
    let etape = 0;
    const acc = C.orange;

    /* Un cadre de courbe : axes, consigne, étiquettes. dx décale le cadre de droite. */
    const cadre = (dx, actif, couleur, titre, sous) => `
<rect x="${30 + dx}" y="30" width="370" height="250" rx="12" fill="${C.creme}" stroke="${actif ? couleur : C.trait}" stroke-width="${actif ? 5 : 3}"/>
${txt(45 + dx, 56, titre, { s: 16, w: 700, f: C.navy })}
${txt(45 + dx, 76, sous, { s: 13 })}
<path d="M${95 + dx} 105 V205 H${385 + dx}" fill="none" stroke="${C.navy}" stroke-width="2"/>
${txt(100 + dx, 100, 'température', { s: 13 })}
${txt(385 + dx, 224, 'temps', { s: 13, a: 'end' })}
<path d="M${95 + dx} 155 H${385 + dx}" fill="none" stroke="${C.gris}" stroke-width="1.5" stroke-dasharray="6 5"/>
${txt(38 + dx, 160, 'consigne', { s: 13 })}
<path d="M${95 + dx} 256 H${385 + dx}" fill="none" stroke="${C.navy}" stroke-width="1.5"/>`;

    /* Un bloc de la chaîne : rectangle + lignes de texte centrées. */
    const bloc = (x, w, actif, lignes) => {
      const h = 72, y = 368;
      const n = lignes.length, y0 = y + (h - (n - 1) * 19) / 2 + 5;
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${actif ? TEINTE : C.papier}" stroke="${actif ? acc : C.navy}" stroke-width="${actif ? 4 : 2}"/>` +
        lignes.map((l, i) => txt(x + w / 2, y0 + i * 19, l[0], { a: 'middle', s: l[1] || 14, w: l[2] || 400, f: l[3] || C.gris })).join('');
    };
    const fleche = (x1, x2, y, actif) =>
      `<path d="M${x1} ${y} H${x2}" fill="none" stroke="${actif ? acc : C.navy}" stroke-width="${actif ? 4 : 2}" marker-end="url(#fl-${actif ? 'or' : 'na'})"/>`;

    const peindre = () => {
      const chaine1 = etape === 2, chaine2 = etape === 3, regul = etape === 4 || etape === 5;
      const niveau = etape === 3 ? 40 : etape === 4 ? 66 : 18;           /* hauteur de la jauge de vitesse */
      const mot = etape === 3 ? 'moyenne' : etape === 4 ? 'haute' : 'basse';
      d.innerHTML = `
<defs>
  <marker id="fl-or" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="15" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${acc}"/></marker>
  <marker id="fl-na" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="15" refY="8" orient="auto"><path d="M0 0 L16 8 L0 16 z" fill="${C.navy}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="565" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- à gauche : le tout-ou-rien, en dents de scie -->
${cadre(0, etape === 0, C.chaud, 'Tout-ou-rien', 'à fond, puis arrêt')}
<path d="M100 125 L125 185 L170 125 L195 185 L240 125 L265 185 L310 125 L335 185 L380 125" fill="none" stroke="${C.chaud}" stroke-width="${etape === 0 ? 6 : 4}" stroke-linejoin="round"/>
${[100, 170, 240, 310].map(x => `<rect x="${x}" y="236" width="25" height="20" fill="${C.chaud}" fill-opacity=".30" stroke="${C.chaud}" stroke-width="2"/>`).join('')}
${txt(45, 273, 'compresseur : à fond (en rouge), ou arrêté', { s: 13 })}

<!-- à droite : l'Inverter, courbe lissée -->
${cadre(390, etape === 1, C.vert, 'Inverter', 'la vitesse suit le besoin')}
<path d="M490 125 C510 125 520 155 550 155 S620 153 650 155 S720 157 770 155" fill="none" stroke="${C.vert}" stroke-width="${etape === 1 ? 6 : 4}" stroke-linejoin="round"/>
<path d="M490 256 V238 C518 238 524 249 552 249 S616 247 645 249 S715 251 770 249 V256 Z" fill="${C.vert}" fill-opacity=".30" stroke="${C.vert}" stroke-width="2"/>
${txt(435, 273, 'compresseur : lent, presque sans arrêt', { s: 13 })}

<!-- en bas : l'unité extérieure et ce qui commande le compresseur -->
<rect x="30" y="298" width="760" height="267" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${txt(45, 320, 'UNITÉ EXTÉRIEURE — ce qui commande le compresseur', { s: 15, w: 700, f: C.navy })}

<rect x="190" y="335" width="360" height="120" rx="10" fill="none" stroke="${regul ? acc : C.navy}" stroke-width="${regul ? 4 : 2}" stroke-dasharray="8 5"/>
${txt(205, 355, 'la carte électronique', { s: 14, w: 700, f: regul ? acc : C.navy })}

${bloc(50, 105, chaine1, [['Réseau', 15, 700, C.navy], ['alternatif,'], ['fréquence fixe']])}
${fleche(155, 203, 404, chaine1)}
${bloc(205, 140, chaine1, [['Redresseur', 15, 700, C.navy], ['alternatif → continu']])}
${fleche(345, 393, 404, chaine2)}
${bloc(395, 140, chaine2, [['Onduleur', 15, 700, C.navy], ['continu → alternatif'], ['fréquence variable']])}
${fleche(535, 583, 404, chaine2)}
${bloc(585, 120, chaine2, [['Moteur du', 15, 700, C.navy], ['compresseur', 15, 700, C.navy], ['vitesse variable']])}

<!-- la jauge de vitesse -->
${txt(750, 354, 'vitesse', { s: 13, a: 'middle', w: 700, f: chaine2 || regul ? acc : C.navy })}
<rect x="735" y="360" width="30" height="80" rx="4" fill="${C.papier}" stroke="${C.navy}" stroke-width="2"/>
<rect x="737" y="${438 - niveau}" width="26" height="${niveau}" fill="${chaine2 || regul ? acc : C.gris}" stroke="none"/>
${txt(750, 459, mot, { s: 13, a: 'middle', w: 700, f: chaine2 || regul ? acc : C.gris })}

<!-- la régulation : la consigne et la mesure donnent l'écart, l'écart règle la fréquence -->
<rect x="60" y="495" width="120" height="50" rx="8" fill="${regul ? TEINTE : C.papier}" stroke="${regul ? acc : C.navy}" stroke-width="${regul ? 4 : 2}"/>
${txt(120, 516, 'Consigne', { a: 'middle', s: 15, w: 700, f: C.navy })}
${txt(120, 534, 'ce qu’on veut', { a: 'middle', s: 13 })}
${fleche(180, 228, 520, regul)}
<rect x="230" y="495" width="120" height="50" rx="8" fill="${regul ? TEINTE : C.papier}" stroke="${regul ? acc : C.navy}" stroke-width="${regul ? 4 : 2}"/>
${txt(290, 516, 'Écart', { a: 'middle', s: 15, w: 700, f: C.navy })}
${txt(290, 534, 'entre les deux', { a: 'middle', s: 13 })}
${fleche(408, 352, 520, regul)}
<rect x="410" y="495" width="120" height="50" rx="8" fill="${regul ? TEINTE : C.papier}" stroke="${regul ? acc : C.navy}" stroke-width="${regul ? 4 : 2}"/>
${txt(470, 516, 'Mesure', { a: 'middle', s: 15, w: 700, f: C.navy })}
${txt(470, 534, 'sonde de la pièce', { a: 'middle', s: 13 })}
<path d="M290 493 V459" fill="none" stroke="${regul ? acc : C.navy}" stroke-width="${regul ? 4 : 2}" marker-end="url(#fl-${regul ? 'or' : 'na'})"/>
${txt(310, 480, 'règle la fréquence', { s: 13, w: 700, f: regul ? acc : C.gris })}
${txt(570, 512, 'écart grand : vitesse haute', { s: 14, w: etape === 4 ? 700 : 400, f: etape === 4 ? acc : C.gris })}
${txt(570, 534, 'écart faible : vitesse basse', { s: 14, w: etape === 5 ? 700 : 400, f: etape === 5 ? acc : C.gris })}`;
    };

    const etapes = [
      { titre: 'Tout-ou-rien : à fond, puis arrêt',
        dire: 'Le compresseur n’a que deux états. Il démarre à fond, la pièce refroidit, il s’arrête, la pièce se réchauffe, il redémarre. La température fait des dents de scie autour de la consigne.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Inverter : il ralentit au lieu de s’arrêter',
        dire: 'Une fois la pièce à la bonne température, le compresseur ne s’arrête pas : il tourne doucement, juste assez pour compenser ce que la pièce gagne en chaleur. La courbe reste presque plate.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'La carte redresse le courant du réseau',
        dire: 'Le réseau fournit un courant alternatif, à fréquence fixe. La carte électronique commence par le redresser : l’alternatif devient du continu.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Elle refabrique un alternatif à la vitesse voulue',
        dire: 'L’onduleur découpe ce continu et refabrique un alternatif, dont la fréquence est choisie par la carte. Le moteur du compresseur suit cette fréquence : la vitesse suit la fréquence.',
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'Écart grand : la vitesse monte',
        dire: 'La carte compare la température mesurée par la sonde à la consigne. Quand l’écart est grand, elle demande une fréquence haute : le compresseur accélère et la pièce refroidit vite.',
        peindre: () => { etape = 4; peindre(); } },
      { titre: 'Écart faible : la vitesse descend',
        dire: 'La pièce approche de la consigne, l’écart fond. La carte baisse la fréquence : le compresseur ralentit, sans s’arrêter, et garde la température.',
        peindre: () => { etape = 5; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Aucune valeur chiffrée : fréquence, tension et vitesse dépendent de l’appareil. Le principe électrique est détaillé dans ÉlectroRézo 7.3 et 7.4.');
  }

  /* Temps 5 : le tableau tout-ou-rien / Inverter, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 440',
      'Tableau comparatif : le compresseur tout-ou-rien est à fond ou arrêté, la température fait des dents de scie, les démarrages sont nombreux, la consommation et le bruit plus élevés. Avec l’Inverter, la vitesse varie, la température est stable, les démarrages sont rares, la consommation et le bruit plus faibles. En panne, on regarde d’abord la carte et les capteurs.');
    const lignes = [
      ['Le compresseur', 'à fond, ou arrêté', 'vitesse variable'],
      ['La température', 'dents de scie', 'stable, près de la consigne'],
      ['Les démarrages', 'nombreux', 'rares'],
      ['L’électricité', 'consommation plus haute', 'consommation plus basse'],
      ['Le bruit', 'à-coups à chaque démarrage', 'plus discret']
    ];
    d.innerHTML = `
<rect x="10" y="10" width="800" height="420" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="520" y="30" width="270" height="300" fill="rgba(30,126,84,.09)" stroke="none"/>
<rect x="30" y="30" width="760" height="300" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M240 30 V330 M520 30 V330" stroke="${C.navy}" stroke-width="2" fill="none"/>
${[80, 130, 180, 230, 280].map(y => `<path d="M30 ${y} H790" stroke="${C.trait}" stroke-width="2" fill="none"/>`).join('')}
${txt(380, 62, 'Tout-ou-rien', { a: 'middle', s: 19, w: 700, f: C.chaud })}
${txt(655, 62, 'Inverter', { a: 'middle', s: 19, w: 700, f: C.vert })}
${lignes.map((l, i) => {
      const y = 112 + i * 50;
      return txt(46, y, l[0], { s: 17, w: 700, f: C.navy }) +
             txt(380, y, l[1], { a: 'middle', s: 17, f: C.navy }) +
             txt(655, y, l[2], { a: 'middle', s: 17, f: C.navy });
    }).join('')}
<rect x="30" y="350" width="760" height="64" rx="10" fill="${C.papier}" stroke="${C.vert}" stroke-width="3"/>
${txt(410, 376, 'En panne, on regarde d’abord la carte et les capteurs, pas le compresseur.', { a: 'middle', s: 16, w: 700, f: C.navy })}
${txt(410, 400, 'En sortie de carte : tension continue élevée, on ne mesure pas sans savoir ce qu’on fait.', { a: 'middle', s: 15, f: C.gris })}`;
    return d;
  }

  return { vitesseSuitLeBesoin, recapitulatif };
})();

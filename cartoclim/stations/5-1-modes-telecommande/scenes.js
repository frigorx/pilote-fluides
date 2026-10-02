/* CartoClim 5.1 — scènes des modes et de la télécommande.
   Temps 2 : une télécommande dessinée en grand (écran, touches de mode, + et −), l’ordre qui part en
   infrarouge vers la carte de l’unité intérieure, puis trois cartes — compresseur, vanne 4 voies, turbine —
   allumées ou éteintes selon le mode, et à droite ce qui sort de l’unité. Cinq pas : froid, chaud,
   déshumidification, ventilation, automatique. Aucune valeur chiffrée : ni température, ni durée.
   Temps 5 : ce que lit la machine (la sonde, en hauteur) contre l’endroit où l’on est, et les cinq modes.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
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

  function lesModes() {
    const d = svg('0 0 900 480',
      'Une télécommande dessinée en grand, avec son écran et ses touches : flocon, soleil, goutte, ventilateur, A. L’ordre part en infrarouge vers la carte de l’unité intérieure, qui allume ou éteint le compresseur, la vanne 4 voies et la turbine, selon le mode choisi.');
    let k = 0;

    const bouton = i => {
      const m = MODES[i], [x, y] = m.tc, actif = i === k;
      return `<circle cx="${x}" cy="${y}" r="21" fill="${actif ? 'rgba(255,107,53,.22)' : C.papier}" stroke="${actif ? C.feu : C.navy}" stroke-width="${actif ? 5 : 2.5}"/>
${ico(m.icone, x - 14, y - 14, 28, actif ? C.ambre : C.navy, 2.4)}
<text x="${x}" y="${y + 38}" text-anchor="middle" font-size="13" font-weight="${actif ? 700 : 400}" fill="${actif ? C.ambre : C.gris}">${m.mot}</text>`;
    };
    const carte = (y, titre, o) => {
      const nul = o.oui === false;
      return `<rect x="345" y="${y}" width="265" height="92" rx="12" fill="${nul ? C.creme : 'rgba(255,107,53,.10)'}" stroke="${nul ? C.trait : C.feu}" stroke-width="${nul ? 3 : 5}"${o.oui === null ? ' stroke-dasharray="9 6"' : ''}/>
<text x="362" y="${y + 30}" font-size="17" font-weight="700" fill="${C.navy}">${titre}</text>
<text x="362" y="${y + 55}" font-size="15" font-weight="700" fill="${nul ? C.gris : C.ambre}">${o.etat}</text>
<text x="362" y="${y + 77}" font-size="14" fill="${C.gris}">${o.sub}</text>
<circle cx="580" cy="${y + 46}" r="15" fill="${o.oui === true ? C.feu : C.papier}" stroke="${nul ? C.gris : C.feu}" stroke-width="3"${o.oui === null ? ' stroke-dasharray="5 4"' : ''}/>`;
    };

    const peindre = () => {
      const m = MODES[k], a = m.air, eau = a.eau.startsWith('l’eau');
      const coulAir = C[a.cle], texteAir = a.cle === 'doux' ? C.froid : coulAir;
      const flecheAir = x => `<path d="M${x} 168 V228" fill="none" stroke="${coulAir}" stroke-width="${a.cle === 'doux' ? 4 : 6}"${a.pointille ? ' stroke-dasharray="10 7"' : ''} marker-end="url(#mk-${a.cle})"/>`;
      d.innerHTML = `
<defs>${['feu', 'navy', 'froid', 'chaud', 'doux', 'gris', 'eau'].map(marqueur).join('')}</defs>
<rect x="10" y="10" width="880" height="460" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- la télécommande : émetteur, écran qui répète le mode, consigne + et −, touches de mode, autres touches -->
<rect x="40" y="56" width="180" height="400" rx="26" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="105" y="46" width="50" height="10" rx="3" fill="${C.feu}" stroke="${C.navy}" stroke-width="2"/>
<rect x="58" y="76" width="144" height="112" rx="10" fill="${C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
${ico(m.icone, 92, 94, 76, m.coul, 5)}
<text x="130" y="216" text-anchor="middle" font-size="14" fill="${C.gris}">consigne</text>
<circle cx="88" cy="240" r="15" fill="${C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
<path d="M80 240 H96" stroke="${C.navy}" stroke-width="3" stroke-linecap="round"/>
<circle cx="172" cy="240" r="15" fill="${C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
<path d="M164 240 H180 M172 232 V248" stroke="${C.navy}" stroke-width="3" stroke-linecap="round"/>
${MODES.map((_, i) => bouton(i)).join('')}
${[58, 96, 134, 172].map(x => `<rect x="${x}" y="424" width="30" height="22" rx="6" fill="${C.papier}" stroke="${C.navy}" stroke-width="2"/>`).join('')}

<!-- l'ordre part en infrarouge vers la carte -->
<path d="M160 51 H336" fill="none" stroke="${C.feu}" stroke-width="4" stroke-dasharray="10 7" marker-end="url(#mk-feu)"/>
<text x="248" y="40" text-anchor="middle" font-size="14" font-weight="700" fill="${C.ambre}">infrarouge</text>
<rect x="345" y="30" width="265" height="40" rx="20" fill="rgba(255,107,53,.12)" stroke="${C.feu}" stroke-width="4"/>
<text x="477" y="56" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">carte de l’unité intérieure</text>

<!-- ce que la carte met en marche -->
${carte(92, 'Compresseur', m.comp)}
${carte(196, 'Vanne 4 voies', m.vanne)}
${carte(300, 'Turbine', m.turb)}
<circle cx="362" cy="437" r="9" fill="${C.feu}" stroke="${C.feu}" stroke-width="3"/>
<text x="378" y="442" font-size="14" fill="${C.gris}">en action</text>
<circle cx="462" cy="437" r="9" fill="${C.papier}" stroke="${C.gris}" stroke-width="3"/>
<text x="478" y="442" font-size="14" fill="${C.gris}">à l’arrêt</text>
<circle cx="552" cy="437" r="9" fill="${C.papier}" stroke="${C.feu}" stroke-width="3" stroke-dasharray="5 4"/>
<text x="568" y="442" font-size="14" fill="${C.gris}">selon l’écart</text>

<!-- l'unité intérieure : l'air de la pièce entre, la sonde le lit, l'air sort -->
<text x="650" y="50" font-size="14" fill="${C.gris}">l’air de la pièce entre</text>
<path d="M690 60 V86" fill="none" stroke="${C.navy}" stroke-width="4" marker-end="url(#mk-navy)"/>
<rect x="650" y="92" width="220" height="64" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<circle cx="690" cy="110" r="6" fill="${k === 4 ? C.feu : C.gris}"/>
<text x="704" y="115" font-size="14" font-weight="${k === 4 ? 700 : 400}" fill="${k === 4 ? C.ambre : C.gris}">sonde</text>
<text x="760" y="144" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité intérieure</text>
${[680, 730, 780].map(flecheAir).join('')}
<text x="650" y="258" font-size="17" font-weight="700" fill="${texteAir}">${a.mot}</text>
<text x="650" y="279" font-size="14" fill="${C.gris}">${a.sub}</text>
<path d="M852 156 V320" fill="none" stroke="${eau ? C.eau : C.trait}" stroke-width="${eau ? 5 : 3}"${eau ? ' marker-end="url(#mk-eau)"' : ' stroke-dasharray="6 6"'}/>
${eau ? [190, 240].map(y => `<path d="M832 ${y} c-5 7 -8 11 -8 14 a8 8 0 0 0 16 0 c0 -3 -3 -7 -8 -14 z" fill="${C.eau}" stroke="none"/>`).join('') : ''}
<text x="872" y="352" text-anchor="end" font-size="14" font-weight="700" fill="${eau ? C.eau : C.gris}">${a.eau}</text>`;
    };

    const etapes = [
      { titre: 'Le flocon : du froid',
        dire: 'Vous appuyez sur le flocon. L’ordre part en infrarouge, la carte de l’unité intérieure le reçoit : elle lance le compresseur et la turbine, et place la vanne 4 voies dans le sens froid. La batterie intérieure devient froide, l’air qui la traverse ressort plus frais, et l’eau de l’air se dépose dans le bac.',
        peindre: () => { k = 0; peindre(); } },
      { titre: 'Le soleil : du chaud',
        dire: 'Le soleil, pas le flocon : c’est la touche que les clients confondent le plus. La machine est la même, mais la vanne 4 voies inverse le sens du fluide. La batterie intérieure devient chaude, l’air ressort chaud. Un client qui appuie sur le soleil en plein été chauffe sa pièce.',
        peindre: () => { k = 1; peindre(); } },
      { titre: 'La goutte : sécher l’air',
        dire: 'Déshumidification : du froid, mais à petite vitesse. La turbine tourne lentement, l’air s’attarde sur la batterie froide et y laisse son eau, sans que la pièce se refroidisse beaucoup. L’eau part par le tuyau de condensats, comme en mode froid. Ce n’est donc pas le mode froid.',
        peindre: () => { k = 2; peindre(); } },
      { titre: 'Le ventilateur : brasser l’air',
        dire: 'Ventilation : le compresseur est arrêté, la vanne 4 voies ne sert à rien, seule la turbine tourne. L’air de la pièce est brassé, ni refroidi ni chauffé, et aucune eau n’est récupérée. Aucun air neuf n’entre : la télécommande ne sait pas faire cela.',
        peindre: () => { k = 3; peindre(); } },
      { titre: 'A : la carte choisit',
        dire: 'Automatique : la carte compare la consigne avec la température que lit la sonde, à la reprise d’air de l’unité intérieure. Trop chaud : elle choisit le froid. Trop frais : le chaud, si l’appareil est réversible. Quand la sonde atteint la consigne, la machine s’arrête ou ralentit.',
        peindre: () => { k = 4; peindre(); } }
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

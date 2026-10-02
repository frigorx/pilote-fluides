/* CartoClim 2.5 — scènes de la station « Détendre ».
   Temps 2, premier dessin : une coupe du passage étroit, en quatre pas — le liquide arrive sous haute
   pression, passe l'étranglement, la pression tombe et une partie bout, le mélange froid repart.
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
     Temps 2 — dessin 1 : le passage étroit, en coupe, et la courbe de pression dessous.        */
  function lePassageEtroit() {
    const d = svg('0 0 820 330',
      'Coupe d’un passage étroit : le liquide arrive à gauche sous haute pression, traverse un étranglement, puis repart à droite à basse pression, en mélange froid de liquide et de bulles. Sous la coupe, la courbe de pression tombe au niveau de l’étranglement.');
    let etape = 0;
    const lit = (k, c) => etape === k ? c : C.trait;      /* la pièce qui agit s'allume */
    const bulles = [[468,112,6],[490,140,7],[510,95,6],[532,126,9],[552,100,7],[570,146,8],[592,112,10],[616,140,7],[636,96,9],[656,122,8]];

    const peindre = () => {
      d.innerHTML = `
<defs>${pointe('pe-hp', hp)}${pointe('pe-bp', bp)}</defs>
<rect x="10" y="10" width="800" height="310" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- le liquide à gauche (haute pression) et le mélange à droite (basse pression) -->
<polygon points="50,75 290,75 335,111 360,111 360,129 335,129 290,165 50,165" fill="${hp}" fill-opacity="${etape === 0 ? .3 : .12}" stroke="none"/>
<polygon points="360,111 385,111 430,75 730,75 730,165 430,165 385,129 360,129" fill="${bp}" fill-opacity="${etape >= 2 ? .3 : .08}" stroke="none"/>

<!-- les parois : un tube qui se rétrécit, puis s'élargit -->
<path d="M50 75 H290 L335 111 H385 L430 75 H730" fill="none" stroke="${C.navy}" stroke-width="4" stroke-linejoin="round"/>
<path d="M50 165 H290 L335 129 H385 L430 165 H730" fill="none" stroke="${C.navy}" stroke-width="4" stroke-linejoin="round"/>
${etape === 1 ? `<path d="M290 75 L335 111 H385 L430 75 M290 165 L335 129 H385 L430 165" fill="none" stroke="${C.feu}" stroke-width="8" stroke-linejoin="round"/>` : ''}

<text x="60" y="52" font-size="17" font-weight="700" fill="${etape === 0 ? hp : C.navy}">liquide, haute pression</text>
<text x="360" y="52" text-anchor="middle" font-size="17" font-weight="700" fill="${etape === 1 ? C.orange : C.navy}">passage étroit</text>
<text x="450" y="52" font-size="17" font-weight="700" fill="${etape >= 2 ? bp : C.navy}">mélange froid : liquide et bulles</text>

${etape === 0 ? `<path d="M72 120 H210" stroke="${hp}" stroke-width="5" marker-end="url(#pe-hp)"/>` : ''}
${etape >= 2 ? bulles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.papier}" stroke="${bp}" stroke-width="2.5"/>`).join('') : ''}
${etape === 3 ? `<path d="M690 120 H772" stroke="${bp}" stroke-width="5" marker-end="url(#pe-bp)"/>
<text x="800" y="192" text-anchor="end" font-size="17" font-weight="700" fill="${bp}">vers l’évaporateur</text>` : ''}

<!-- la courbe de pression, sous la coupe -->
<path d="M50 225 H290" fill="none" stroke="${lit(0, hp)}" stroke-width="${etape === 0 ? 8 : 4}" stroke-linecap="round"/>
<path d="M290 225 C340 225 380 295 430 295" fill="none" stroke="${lit(1, C.feu)}" stroke-width="${etape === 1 ? 8 : 4}" stroke-linecap="round"/>
<path d="M430 295 H730" fill="none" stroke="${etape >= 2 ? bp : C.trait}" stroke-width="${etape >= 2 ? 8 : 4}" stroke-linecap="round"/>
<text x="50" y="207" font-size="17" font-weight="700" fill="${etape === 0 ? hp : C.gris}">haute pression</text>
<text x="170" y="290" font-size="17" font-weight="700" fill="${etape === 1 ? C.orange : C.gris}">la pression tombe</text>
<text x="520" y="277" font-size="17" font-weight="700" fill="${etape >= 2 ? bp : C.gris}">basse pression</text>`;
    };

    const etapes = [
      { titre: 'Le liquide arrive sous haute pression',
        dire: 'À la sortie du condenseur, le fluide est liquide et sous haute pression. Il arrive devant un passage très étroit.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Il se faufile dans le passage étroit',
        dire: 'Le liquide est forcé de passer par ce passage très fin. Il perd presque toute sa pression en le traversant.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Une partie du liquide bout d’un coup',
        dire: 'À basse pression, le liquide est trop chaud pour rester liquide : des bulles apparaissent. Pour bouillir, la partie qui s’évapore prend de la chaleur au reste du liquide, qui se refroidit.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Le mélange froid part vers l’évaporateur',
        dire: 'Ce qui sort est un mélange froid de liquide et de vapeur. Dans l’évaporateur, le liquide finira de bouillir en prenant la chaleur de la pièce.',
        peindre: () => { etape = 3; peindre(); } }
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

  return { detendre, recapitulatif };
})();

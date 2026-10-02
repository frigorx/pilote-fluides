/* CartoClim 4.2 — scènes des liaisons frigorifiques.
   Temps 2 : la liaison de bout en bout, en six pas — les deux tubes, leur isolant, les cotes L et H,
   puis trois cas : liaison courte (la précharge suffit), plus longue (appoint pesé), au-delà de la
   notice (interdit). Aucune valeur chiffrée : les lettres L et H, et la mention « notice ».
   Temps 5 : ce qu'on vérifie sur une liaison, en cinq cartes.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  function liaison() {
    const d = svg('0 0 820 555',
      'Coupe schématique d’une liaison frigorifique : l’unité intérieure à gauche du mur, l’unité extérieure à droite, reliées par un petit tube pour le liquide et un gros tube pour le gaz, chacun dans son isolant. La longueur L se mesure le long des tubes, le dénivelé H est la différence de hauteur entre les deux unités.');
    let etape = 0;
    /* l'unité extérieure s'éloigne avec la longueur : courte, longue, au-delà de la notice */
    const XE = [500, 570, 640];
    const cas = () => etape === 4 ? 1 : etape === 5 ? 2 : 0;
    const on = (k, c, s) => etape === k ? c : s;
    const cuivre = C.orange;

    const peindre = () => {
      const xe = XE[cas()];
      const gaz = `M200 109 H410 V326 H${xe}`;           /* le gros tube, en haut puis à l'extérieur */
      const liq = `M200 139 H380 V356 H${xe}`;           /* le petit tube, en dessous */
      const iso = etape >= 1;
      const cotes = etape >= 2;
      const zoneVive = [C.vert, C.ambre, C.rouge];
      const xm = [180, 420, 650][cas()];                 /* le repère de L sur la règle */
      const cx = xe + 45;                                 /* le centre de l'unité extérieure */

      d.innerHTML = `
<defs>
  <marker id="cote" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto-start-reverse"><path d="M0 0 L12 6 L0 12 z" fill="${C.navy}"/></marker>
  <marker id="flN" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0 0 L12 6 L0 12 z" fill="${C.navy}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="535" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- dedans, le mur, dehors -->
<rect x="200" y="30" width="22" height="370" fill="${C.creme}" stroke="${C.gris}" stroke-width="2"/>
<text x="211" y="419" text-anchor="middle" font-size="14" fill="${C.gris}">le mur</text>
<line x1="30" y1="400" x2="200" y2="400" stroke="${C.gris}" stroke-width="4"/>
<line x1="222" y1="400" x2="790" y2="400" stroke="${C.gris}" stroke-width="4"/>
<text x="125" y="52" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">dans la pièce</text>
<text x="240" y="40" font-size="14" font-weight="700" fill="${C.navy}">dehors</text>

<!-- l'unité intérieure -->
<rect x="50" y="78" width="150" height="100" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="125" y="124" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité</text>
<text x="125" y="144" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">intérieure</text>

<!-- l'unité extérieure : elle s'éloigne quand la liaison s'allonge -->
<rect x="${xe}" y="290" width="90" height="110" rx="10" fill="${C.creme}" stroke="${etape === 5 ? C.rouge : C.navy}" stroke-width="3"/>
<circle cx="${cx}" cy="322" r="20" fill="none" stroke="${C.navy}" stroke-width="2"/>
<path d="M${cx} 304 v36 M${cx - 18} 322 h36" stroke="${C.navy}" stroke-width="2"/>
<text x="${cx}" y="368" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité</text>
<text x="${cx}" y="385" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">extérieure</text>

<!-- les cotes : L le long des tubes, H entre les deux niveaux -->
${cotes ? `
<path d="M424 109 H770 M${xe + 90} 326 H770" fill="none" stroke="${C.gris}" stroke-width="1.5" stroke-dasharray="6 5"/>
<path d="M200 62 H460 V270 H${xe}" fill="none" stroke="${C.navy}" stroke-width="${etape === 2 ? 3 : 2}" stroke-linejoin="round" marker-start="url(#cote)" marker-end="url(#cote)"/>
<path d="M770 109 V326" fill="none" stroke="${C.navy}" stroke-width="${etape === 2 ? 3 : 2}" marker-start="url(#cote)" marker-end="url(#cote)"/>
<text x="441" y="170" text-anchor="middle" font-size="22" font-weight="700" fill="${C.navy}">L</text>
<text x="782" y="226" font-size="22" font-weight="700" fill="${C.navy}">H</text>` : ''}
${etape === 2 ? `
<text x="476" y="198" font-size="14" fill="${C.navy}">longueur, mesurée</text>
<text x="476" y="215" font-size="14" fill="${C.navy}">le long des tubes</text>
<text x="760" y="210" text-anchor="end" font-size="14" fill="${C.navy}">dénivelé : différence</text>
<text x="760" y="227" text-anchor="end" font-size="14" fill="${C.navy}">de hauteur entre les unités</text>` : ''}

<!-- l'isolant : une gaine sur chaque tube, sans coupure, jusqu'au raccord -->
${iso ? `
<g fill="none" stroke="${on(1, C.navy, C.gris)}" stroke-opacity="${etape === 1 ? .8 : .45}" stroke-linejoin="round" stroke-linecap="butt">
  <path d="${gaz}" stroke-width="24"/>
  <path d="${liq}" stroke-width="16"/>
</g>` : ''}

<!-- les deux tubes de cuivre -->
<g fill="none" stroke="${on(0, C.feu, cuivre)}" stroke-linejoin="round" stroke-linecap="butt">
  <path d="${gaz}" stroke-width="${etape === 0 ? 13 : 10}"/>
  <path d="${liq}" stroke-width="${etape === 0 ? 8 : 6}"/>
</g>
<g fill="${C.navy}">
  <rect x="188" y="101" width="12" height="16"/><rect x="190" y="132" width="10" height="14"/>
  <rect x="${xe - 12}" y="318" width="12" height="16"/><rect x="${xe - 10}" y="349" width="10" height="14"/>
</g>
<text x="236" y="88" font-size="14" font-weight="700" fill="${etape === 0 ? C.orange : C.navy}">gros tube : gaz</text>
<text x="236" y="170" font-size="14" font-weight="700" fill="${etape === 0 ? C.orange : C.navy}">petit tube : liquide</text>
${etape === 1 ? `
<text x="285" y="236" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">un isolant continu</text>
<text x="285" y="253" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">sur chaque tube</text>
<path d="M338 244 h26" fill="none" stroke="${C.navy}" stroke-width="3" marker-end="url(#flN)"/>
<text x="462" y="390" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">fermé jusqu’au raccord</text>
<path d="M470 383 L486 368" fill="none" stroke="${C.navy}" stroke-width="3" marker-end="url(#flN)"/>` : ''}

<!-- ce que dit la longueur : courte, longue, hors notice -->
${etape === 3 ? `
<circle cx="${cx}" cy="215" r="25" fill="${C.vert}"/>
<path d="M${cx - 12} 215 l9 10 l17 -20" fill="none" stroke="${C.papier}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
<text x="${cx}" y="172" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">précharge suffisante</text>` : ''}
${etape === 4 ? `
<rect x="${cx - 24}" y="190" width="30" height="42" rx="9" fill="${C.papier}" stroke="${C.ambre}" stroke-width="3"/>
<rect x="${cx - 16}" y="180" width="14" height="10" rx="2" fill="${C.papier}" stroke="${C.ambre}" stroke-width="3"/>
<rect x="${cx - 38}" y="232" width="76" height="22" rx="6" fill="${C.creme}" stroke="${C.ambre}" stroke-width="3"/>
<rect x="${cx + 12}" y="238" width="20" height="10" rx="2" fill="${C.ambre}" fill-opacity=".3" stroke="none"/>
<text x="${cx}" y="172" text-anchor="middle" font-size="14" font-weight="700" fill="${C.ambre}">appoint pesé</text>` : ''}
${etape === 5 ? `
<circle cx="${cx}" cy="215" r="26" fill="none" stroke="${C.rouge}" stroke-width="6"/>
<path d="M${cx - 18} 197 L${cx + 18} 233" stroke="${C.rouge}" stroke-width="6" stroke-linecap="round"/>
<text x="${cx}" y="172" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">hors de la notice</text>` : ''}

<!-- la règle de la longueur : trois zones -->
<rect x="60" y="452" width="240" height="36" fill="${C.vert}" fill-opacity=".16" stroke="${cas() === 0 && etape >= 3 ? C.vert : 'none'}" stroke-width="3"/>
<rect x="300" y="452" width="240" height="36" fill="${C.ambre}" fill-opacity=".18" stroke="${cas() === 1 ? C.ambre : 'none'}" stroke-width="3"/>
<rect x="540" y="452" width="220" height="36" fill="${C.rouge}" fill-opacity=".16" stroke="${cas() === 2 ? C.rouge : 'none'}" stroke-width="3"/>
<text x="180" y="475" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">la précharge suffit</text>
<text x="420" y="475" text-anchor="middle" font-size="14" font-weight="700" fill="${C.ambre}">appoint de fluide, pesé</text>
<text x="650" y="475" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">interdit : hors notice</text>
${etape >= 3 ? `<path d="M${xm} 450 l-10 -16 h20 z" fill="${zoneVive[cas()]}" stroke="none"/>
<text x="${xm + 16}" y="441" font-size="16" font-weight="700" fill="${C.navy}">L</text>` : ''}
<text x="60" y="508" font-size="14" fill="${C.gris}">la liaison s’allonge →</text>
<text x="300" y="508" text-anchor="middle" font-size="14" fill="${C.gris}">limite de la précharge</text>
<text x="540" y="508" text-anchor="middle" font-size="14" fill="${C.gris}">longueur maximale</text>
<text x="300" y="527" text-anchor="middle" font-size="14" fill="${C.gris}">(dans la notice)</text>
<text x="540" y="527" text-anchor="middle" font-size="14" fill="${C.gris}">(dans la notice)</text>`;
    };

    const etapes = [
      { titre: 'Deux tubes, deux diamètres',
        dire: 'Le fluide passe d’une unité à l’autre par deux tubes de cuivre. Le petit porte le liquide, le gros porte le gaz. Les deux diamètres sont imposés : ils sont dans la notice.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Chacun dans son isolant',
        dire: 'Une gaine entoure chaque tube, sans coupure du début à la fin, et jusqu’au raccord. Le gros tube, froid quand l’appareil refroidit, se couvrirait de gouttes s’il était nu.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Deux mesures : L et H',
        dire: 'La longueur L se mesure le long des tubes, tous les détours compris. Le dénivelé H est la différence de hauteur entre les deux unités. La notice donne un minimum, un maximum, et un dénivelé maximal.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Liaison courte : la précharge suffit',
        dire: 'L’appareil est livré avec du fluide pour une certaine longueur de liaison, écrite dans la notice. Tant qu’on reste dans cette longueur, on n’ajoute rien.',
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'Liaison plus longue : appoint pesé',
        dire: 'Plus longue que la précharge, mais dans la limite : les tubes contiennent plus de fluide, il en manque. On ajoute un appoint, calculé d’après la notice, et pesé sur une balance.',
        peindre: () => { etape = 4; peindre(); } },
      { titre: 'Au-delà de la notice : interdit',
        dire: 'Plus longue que la longueur maximale, ou plus haute que le dénivelé maximal : l’appareil sort de ses limites. On ne pose pas ainsi : on change le tracé, ou l’appareil.',
        peindre: () => { etape = 5; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Aucune valeur ici : les diamètres, les longueurs et le dénivelé sont ceux de la notice de l’appareil.');
  }

  /* Temps 5 : ce qu'on vérifie sur une liaison, en cinq cartes sous un dessin des deux unités. */
  function recapitulatif() {
    const d = svg('0 0 820 398', 'Récapitulatif : l’unité intérieure et l’unité extérieure reliées par le gros tube de gaz et le petit tube de liquide, chacun dans son isolant ; cinq cartes dessous : le tube, les diamètres, L et H, l’isolant, les raccords.');
    const cartes = [
      { t: 'Le tube', l: ['qualité frigorifique,', 'bouché et sec ;', 'on rebouche ce', 'qui attend'],
        p: x => `<line x1="${x - 36}" y1="214" x2="${x + 36}" y2="214" stroke="${C.orange}" stroke-width="10"/><rect x="${x - 46}" y="205" width="8" height="18" fill="${C.navy}"/><rect x="${x + 38}" y="205" width="8" height="18" fill="${C.navy}"/>` },
      { t: 'Les diamètres', l: ['ceux de la notice :', 'petit tube : liquide,', 'gros tube : gaz'],
        p: x => `<circle cx="${x - 24}" cy="214" r="8" fill="${C.creme}" stroke="${C.orange}" stroke-width="4"/><circle cx="${x + 16}" cy="214" r="15" fill="${C.creme}" stroke="${C.orange}" stroke-width="4"/>` },
      { t: 'L et H', l: ['dans la notice :', 'longueur mini et maxi,', 'dénivelé maxi ;', 'au-delà : appoint pesé'],
        p: x => `<path d="M${x - 40} 222 H${x + 6}" stroke="${C.navy}" stroke-width="2.5" marker-start="url(#cote5)" marker-end="url(#cote5)"/><text x="${x - 20}" y="212" font-size="15" font-weight="700" fill="${C.navy}">L</text><path d="M${x + 30} 194 V232" stroke="${C.navy}" stroke-width="2.5" marker-start="url(#cote5)" marker-end="url(#cote5)"/><text x="${x + 38}" y="218" font-size="15" font-weight="700" fill="${C.navy}">H</text>` },
      { t: 'L’isolant', l: ['sur les deux tubes,', 'sans coupure,', 'fermé aux raccords'],
        p: x => `<line x1="${x - 36}" y1="214" x2="${x + 36}" y2="214" stroke="${C.gris}" stroke-opacity=".5" stroke-width="28"/><line x1="${x - 46}" y1="214" x2="${x + 46}" y2="214" stroke="${C.orange}" stroke-width="8"/>` },
      { t: 'Les raccords', l: ['dudgeon au couple', 'ou brasure sous azote', '(le geste : CuivRézo)'],
        p: x => `<path d="M${x - 40} 206 H${x - 8} L${x + 10} 196 V232 L${x - 8} 222 H${x - 40}" fill="none" stroke="${C.orange}" stroke-width="4" stroke-linejoin="round"/>` }
    ];
    const W = 152, G = 9, X0 = 19;
    const fiches = cartes.map((c, i) => {
      const x0 = X0 + i * (W + G), x = x0 + W / 2;
      return `<rect x="${x0}" y="140" width="${W}" height="234" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
<circle cx="${x}" cy="170" r="15" fill="${C.navy}"/>
<text x="${x}" y="176" text-anchor="middle" font-size="16" font-weight="700" fill="${C.papier}">${i + 1}</text>
${c.p(x)}
<text x="${x}" y="268" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">${c.t}</text>
${c.l.map((ligne, k) => `<text x="${x}" y="${292 + k * 21}" text-anchor="middle" font-size="14" fill="${C.navy}">${ligne}</text>`).join('')}`;
    }).join('');
    d.innerHTML = `
<defs><marker id="cote5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="${C.navy}"/></marker></defs>
<rect x="10" y="10" width="800" height="378" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="30" y="30" width="140" height="84" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="100" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité</text>
<text x="100" y="88" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">intérieure</text>
<rect x="650" y="30" width="140" height="84" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="720" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité</text>
<text x="720" y="88" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">extérieure</text>
<g fill="none" stroke="${C.gris}" stroke-opacity=".45"><path d="M170 58 H650" stroke-width="26"/><path d="M170 88 H650" stroke-width="18"/></g>
<g fill="none" stroke="${C.orange}"><path d="M170 58 H650" stroke-width="12"/><path d="M170 88 H650" stroke-width="7"/></g>
<text x="410" y="38" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">gros tube : gaz</text>
<text x="410" y="118" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">petit tube : liquide</text>
${fiches}`;
    return d;
  }

  return { liaison, recapitulatif };
})();

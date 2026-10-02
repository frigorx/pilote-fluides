/* CartoClim 3.2 — scènes du split. Temps 2 : le trajet de la chaleur en mode froid, en six pas.
   Croix du frigoriste (charte R6) : détendeur à gauche, compresseur à droite, condenseur en haut
   (dehors), évaporateur en bas (dedans). Temps 5 : ce qu'on raccorde entre les deux unités.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  function trajetDeLaChaleur() {
    const d = svg('0 0 820 470',
      'Un split en coupe schématique : l’unité extérieure en haut avec condenseur, compresseur et détendeur ; l’unité intérieure en bas avec l’évaporateur et la turbine ; deux tubes traversent le mur.');
    let etape = 0;
    const on = (k, c) => etape === k ? c : C.trait;       /* la pièce qui agit s'allume */
    const onW = k => etape === k ? 7 : 4;
    const bp = C.froid, hp = C.chaud;                     /* basse pression : bleu · haute pression : rouge */

    const peindre = () => {
      d.innerHTML = `
<defs>
  <marker id="fl-bp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${bp}"/></marker>
  <marker id="fl-hp" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${hp}"/></marker>
  <marker id="fl-air" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.navy}"/></marker>
  <marker id="fl-eau" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.eau}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="450" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- dehors / dedans -->
<rect x="90" y="40" width="640" height="200" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="100" y="62" font-size="14" font-weight="700" fill="${C.navy}">UNITÉ EXTÉRIEURE — dehors</text>
<rect x="90" y="300" width="640" height="130" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="200" y="322" font-size="14" font-weight="700" fill="${C.navy}">UNITÉ INTÉRIEURE — dans la pièce</text>
<line x1="60" y1="270" x2="760" y2="270" stroke="${C.gris}" stroke-width="10" stroke-dasharray="26 10"/>
<text x="770" y="275" font-size="13" fill="${C.gris}">le mur</text>

<!-- condenseur, en haut : serpentin dans des ailettes, hélice à côté -->
<g stroke="${on(3, hp)}" stroke-width="${onW(3)}" fill="none">
  <path d="M330 100 h160 M330 125 h160 M330 150 h160 M330 175 h160"/>
  <path d="M330 100 c-18 0 -18 25 0 25 M490 125 c18 0 18 25 0 25 M330 150 c-18 0 -18 25 0 25"/>
</g>
<g stroke="${C.trait}" stroke-width="2">${[0,1,2,3,4,5,6,7,8].map(i => `<line x1="${345 + i * 18}" y1="88" x2="${345 + i * 18}" y2="187"/>`).join('')}</g>
<text x="410" y="212" text-anchor="middle" font-size="13" font-weight="700" fill="${etape === 3 ? hp : C.navy}">condenseur</text>
<circle cx="580" cy="138" r="30" fill="none" stroke="${on(3, C.navy)}" stroke-width="3"/>
<path d="M580 108 v60 M550 138 h60" stroke="${on(3, C.navy)}" stroke-width="3"/>
<text x="580" y="96" text-anchor="middle" font-size="12" fill="${C.gris}">hélice</text>
${etape === 3 ? `<path d="M690 118 h50 M690 138 h50 M690 158 h50" stroke="${hp}" stroke-width="4" marker-end="url(#fl-hp)"/>
<text x="737" y="186" font-size="12" font-weight="700" fill="${hp}">air chaud</text>` : ''}

<!-- compresseur, à droite -->
<rect x="640" y="190" width="70" height="50" rx="10" fill="${C.papier}" stroke="${on(2, hp)}" stroke-width="${onW(2)}"/>
<text x="675" y="220" text-anchor="middle" font-size="12" font-weight="700" fill="${etape === 2 ? hp : C.navy}">compr.</text>

<!-- détendeur, à gauche -->
<path d="M150 190 l30 -16 v32 z M210 190 l-30 -16 v32 z" fill="${C.papier}" stroke="${on(4, bp)}" stroke-width="${onW(4)}"/>
<text x="180" y="165" text-anchor="middle" font-size="12" font-weight="700" fill="${etape === 4 ? bp : C.navy}">détendeur</text>

<!-- haute pression : du compresseur au condenseur, puis du condenseur au détendeur (par la gauche) -->
<path d="M675 190 v-8 h-185 v-7" fill="none" stroke="${etape === 2 ? hp : C.trait}" stroke-width="${etape === 2 ? 9 : 6}" stroke-linejoin="round"/>
<path d="M490 100 v-25 h-370 v115 h30" fill="none" stroke="${etape === 3 ? hp : C.trait}" stroke-width="${etape === 3 ? 7 : 6}" stroke-linejoin="round"/>

<!-- évaporateur, en bas : turbine à gauche, batterie, bac -->
<ellipse cx="250" cy="365" rx="32" ry="22" fill="none" stroke="${on(0, C.navy)}" stroke-width="3"/>
<path d="M250 343 v44 M218 365 h64" stroke="${on(0, C.navy)}" stroke-width="2"/>
<text x="250" y="413" text-anchor="middle" font-size="12" fill="${C.gris}">turbine</text>
<g stroke="${on(0, bp)}" stroke-width="${onW(0)}" fill="none">
  <path d="M300 345 h220 M300 365 h220 M300 385 h220"/>
  <path d="M520 345 c18 0 18 20 0 20 M300 365 c-18 0 -18 20 0 20"/>
</g>
<g stroke="${C.trait}" stroke-width="2">${[0,1,2,3,4,5,6,7,8,9,10].map(i => `<line x1="${310 + i * 20}" y1="336" x2="${310 + i * 20}" y2="394"/>`).join('')}</g>
<text x="340" y="414" font-size="13" font-weight="700" fill="${etape === 0 ? bp : C.navy}">évaporateur</text>
<path d="M296 400 h230" stroke="${on(5, C.eau)}" stroke-width="${etape === 5 ? 6 : 3}"/>
<text x="436" y="424" font-size="12" fill="${etape === 5 ? C.eau : C.gris}">bac à condensats</text>
<path d="M526 400 h110 v-42 h110" fill="none" stroke="${on(5, C.eau)}" stroke-width="${etape === 5 ? 5 : 3}" marker-end="${etape === 5 ? 'url(#fl-eau)' : ''}"/>
<text x="752" y="362" font-size="12" font-weight="700" fill="${etape === 5 ? C.eau : C.gris}">→ dehors</text>
${etape === 0 ? `<path d="M130 352 h60 M130 365 h60 M130 378 h60" stroke="${C.navy}" stroke-width="3" marker-end="url(#fl-air)"/>
<text x="130" y="398" font-size="12" fill="${C.navy}">air de la pièce</text>
<path d="M530 324 h70" stroke="${bp}" stroke-width="4" marker-end="url(#fl-bp)"/>
<text x="530" y="314" font-size="12" font-weight="700" fill="${bp}">air frais soufflé</text>` : ''}

<!-- liaisons : le gros tube (gaz) à droite, le petit tube (liquide) à gauche -->
<path d="M520 385 h100 v-50 h55 v-95" fill="none" stroke="${etape === 1 ? C.feu : bp}" stroke-width="${etape === 1 ? 9 : 7}" stroke-linejoin="round"/>
<text x="665" y="258" text-anchor="end" font-size="12" font-weight="700" fill="${etape === 1 ? C.feu : bp}">gros tube : gaz</text>
<path d="M180 206 v128 h120 v11" fill="none" stroke="${etape === 4 ? C.feu : bp}" stroke-width="${etape === 4 ? 6 : 4}" stroke-linejoin="round"/>
<text x="190" y="258" font-size="12" font-weight="700" fill="${etape === 4 ? C.feu : bp}">petit tube : liquide</text>`;
    };

    const etapes = [
      { titre: 'L’air de la pièce traverse l’évaporateur', dire: 'La turbine aspire l’air de la pièce et le pousse à travers la batterie. Le fluide, qui est froid dedans, bout : il prend la chaleur de l’air. L’air ressort plus frais.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Le gaz part par le gros tube', dire: 'Devenu gaz, le fluide quitte l’unité intérieure par le gros tube, celui qu’on appelle la ligne gaz, et traverse le mur.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Le compresseur le comprime', dire: 'Dehors, le compresseur aspire ce gaz et le comprime. En sortie il est chaud et sous haute pression.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Le condenseur rend la chaleur dehors', dire: 'L’hélice balaie le condenseur avec l’air extérieur. Le gaz chaud se refroidit, redevient liquide, et la chaleur de la pièce est rejetée dehors.',
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'Le détendeur fait chuter la pression', dire: 'Le liquide passe le détendeur : sa pression tombe d’un coup, il devient froid, et il repart vers l’intérieur par le petit tube, la ligne liquide.',
        peindre: () => { etape = 4; peindre(); } },
      { titre: 'Et l’eau ? Les condensats', dire: 'L’air de la pièce, refroidi sur la batterie, lâche une partie de son humidité. Cette eau tombe dans le bac et s’évacue dehors par le tuyau de condensats.',
        peindre: () => { etape = 5; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Mode froid. En mode chaud, la vanne 4 voies inverse le sens : la station 2.6 le montre.');
  }

  /* Temps 5 : ce qu'on raccorde entre les deux unités, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 290', 'Récapitulatif : l’unité intérieure et l’unité extérieure, reliées par le petit tube liquide, le gros tube gaz et le câble ; le tuyau de condensats part de l’unité intérieure vers dehors.');
    d.innerHTML = `
<rect x="10" y="10" width="800" height="270" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="40" y="60" width="220" height="130" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="150" y="92" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Unité intérieure</text>
<text x="150" y="116" text-anchor="middle" font-size="13" fill="${C.gris}">évaporateur · turbine</text>
<text x="150" y="136" text-anchor="middle" font-size="13" fill="${C.gris}">filtre · bac · sondes</text>
<rect x="560" y="60" width="220" height="130" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="670" y="92" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Unité extérieure</text>
<text x="670" y="116" text-anchor="middle" font-size="13" fill="${C.gris}">compresseur · condenseur</text>
<text x="670" y="136" text-anchor="middle" font-size="13" fill="${C.gris}">détendeur · vannes de service</text>
<line x1="410" y1="40" x2="410" y2="248" stroke="${C.gris}" stroke-width="8" stroke-dasharray="20 8"/>
<text x="410" y="268" text-anchor="middle" font-size="12" fill="${C.gris}">le mur</text>
<line x1="260" y1="90" x2="560" y2="90" stroke="${C.froid}" stroke-width="4"/>
<text x="330" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="${C.froid}">petit tube · liquide</text>
<line x1="260" y1="125" x2="560" y2="125" stroke="${C.froid}" stroke-width="9"/>
<text x="330" y="148" text-anchor="middle" font-size="12" font-weight="700" fill="${C.froid}">gros tube · gaz</text>
<line x1="260" y1="172" x2="560" y2="172" stroke="${C.navy}" stroke-width="3" stroke-dasharray="6 5"/>
<text x="330" y="194" text-anchor="middle" font-size="12" font-weight="700" fill="${C.navy}">câble entre les unités</text>
<path d="M150 190 v40 h235" fill="none" stroke="${C.eau}" stroke-width="4"/>
<text x="150" y="252" text-anchor="middle" font-size="12" font-weight="700" fill="${C.eau}">condensats, en pente, jusqu’à dehors</text>
<text x="670" y="218" text-anchor="middle" font-size="12" fill="${C.gris}">alimentation + disjoncteur</text>
<text x="670" y="240" text-anchor="middle" font-size="12" fill="${C.gris}">tirage au vide avant d’ouvrir les vannes</text>`;
    return d;
  }

  return { trajetDeLaChaleur, recapitulatif };
})();

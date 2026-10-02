/* CartoClim 4.1 — scènes de la pose des deux unités.
   Temps 2 : une façade en coupe, quatre pas (l'unité intérieure, la carotte, le support extérieur,
   l'unité extérieure et ses dégagements d'air), avec une bascule « Bien posé / Mal posé » :
   le mal posé dessine d'un coup les quatre défauts du même chantier (cloison légère, jet sur le lit,
   carotte à contre-pente, support pas de niveau, unité enfermée) ; le pas actif met le sien en rouge.
   Temps 5 : une pose réussie, en un coup d'œil.
   Aucune cote chiffrée : les dégagements sont ceux de la notice.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  function poseDesDeuxUnites() {
    const d = svg('0 0 820 480',
      'Coupe d’une façade, la pièce à gauche et le dehors à droite. L’unité intérieure est fixée au mur sur sa platine, la carotte traverse le mur en pente vers l’extérieur, l’unité extérieure repose sur un support de niveau avec de l’air libre à l’aspiration et au soufflage.');
    let etape = 0, mal = false;
    const malP = document.createElement('p');          /* la phrase « mal posé » du pas courant */
    malP.className = 'verdict bad'; malP.style.display = 'none';

    const peindre = () => {
      const A = k => etape === k;
      const vif = mal ? C.rouge : C.feu;                    /* trait de la pièce active */
      const vifT = mal ? C.rouge : C.orange;                /* texte de la pièce active */
      const tr = (k, base) => A(k) ? vif : base;
      const ep = (k, n) => A(k) ? n + 3 : n;
      const tx = (k, base) => A(k) ? vifT : (mal ? C.gris : base);
      const T = (x, y, s, k, a = 'start', c = C.navy) =>
        `<text x="${x}" y="${y}" font-size="14" font-weight="700" text-anchor="${a}" fill="${tx(k, c)}">${s}</text>`;
      const goutte = (x, y) => `<path d="M${x} ${y} c-3.5 5 -3.5 8 0 8 c3.5 0 3.5 -3 0 -8 z" fill="${C.eau}" stroke="none"/>`;
      const ar = (x1, y1, x2, y2, col, m, w = 4) =>
        `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col}" stroke-width="${w}" fill="none" marker-end="url(#${m})"/>`;

      const yi = mal ? 190 : 176, yo = mal ? 176 : 190;     /* la carotte : bout intérieur, bout extérieur */
      const rot = mal ? 7 : 0;                              /* le support qui penche */

      /* le mur : plein et hachuré, ou cloison creuse */
      const hach = []; for (let y = 70; y < 440; y += 22) hach.push(`<line x1="390" y1="${y + 30}" x2="450" y2="${y}"/>`);
      const mur = mal
        ? `<rect x="390" y="62" width="9" height="368" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="441" y="62" width="9" height="368" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<line x1="420" y1="62" x2="420" y2="430" stroke="${C.gris}" stroke-width="2" stroke-dasharray="6 6"/>`
        : `<clipPath id="m41-clip"><rect x="390" y="62" width="60" height="368"/></clipPath>
<rect x="390" y="62" width="60" height="368" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<g clip-path="url(#m41-clip)" stroke="${C.trait}" stroke-width="2">${hach.join('')}</g>`;

      /* les jets d'air de l'unité intérieure : au-dessus du lit, ou droit dessus */
      const jets = mal
        ? ar(336, 148, 160, 370, C.gris, 'm41-gris') + ar(346, 150, 190, 374, C.gris, 'm41-gris') + ar(356, 152, 220, 378, C.gris, 'm41-gris')
        : ar(336, 146, 190, 160, tr(0, C.navy), A(0) ? 'm41-vif' : 'm41-air', ep(0, 3)) + ar(346, 148, 200, 184, tr(0, C.navy), A(0) ? 'm41-vif' : 'm41-air', ep(0, 3)) + ar(356, 150, 212, 208, tr(0, C.navy), A(0) ? 'm41-vif' : 'm41-air', ep(0, 3));

      const bulle = (x, y, bx, k) => `<rect x="${x}" y="${y}" width="56" height="11" rx="5.5" fill="${C.papier}" stroke="${tr(k, C.navy)}" stroke-width="2"/>
<circle cx="${bx}" cy="${y + 5.5}" r="3" fill="${tr(k, C.navy)}" stroke="none"/>`;

      d.innerHTML = `
<defs>
  <marker id="m41-air" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.navy}"/></marker>
  <marker id="m41-vif" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${vif}"/></marker>
  <marker id="m41-gris" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.gris}"/></marker>
  <marker id="m41-hp" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.chaud}"/></marker>
  <marker id="m41-eau" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.eau}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="460" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- dedans / dehors, sol, plafond -->
<text x="28" y="36" font-size="14" font-weight="700" fill="${C.navy}">DEDANS — la pièce</text>
<text x="796" y="36" font-size="14" font-weight="700" text-anchor="end" fill="${C.navy}">DEHORS</text>
<line x1="20" y1="62" x2="390" y2="62" stroke="${C.gris}" stroke-width="3"/>
<line x1="20" y1="430" x2="390" y2="430" stroke="${C.gris}" stroke-width="3"/>
<line x1="450" y1="430" x2="800" y2="430" stroke="${C.gris}" stroke-width="3"/>
<rect x="470" y="402" width="330" height="28" fill="${C.air}" opacity=".35" stroke="none"/>
<text x="736" y="422" font-size="13" font-weight="700" text-anchor="end" fill="${A(3) && !mal ? C.orange : C.gris}">niveau de la neige</text>

<!-- le mur -->
${mur}
${mal ? T(420, 54, 'cloison légère', 0, 'middle') : T(420, 54, 'mur porteur', 9, 'middle')}

<!-- le lit -->
<line x1="52" y1="416" x2="52" y2="430" stroke="${C.navy}" stroke-width="3"/>
<line x1="238" y1="416" x2="238" y2="430" stroke="${C.navy}" stroke-width="3"/>
<rect x="40" y="392" width="210" height="24" rx="6" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="48" y="382" width="46" height="12" rx="6" fill="${C.papier}" stroke="${C.navy}" stroke-width="2"/>

<!-- pas 1 : l'unité intérieure, sa platine, son air libre, son jet -->
<rect x="286" y="68" width="102" height="84" rx="10" fill="none" stroke="${tr(0, C.gris)}" stroke-width="${ep(0, 2)}" stroke-dasharray="7 5"/>
<rect x="384" y="84" width="6" height="58" fill="${tr(0, C.navy)}" stroke="none"/>
<line x1="378" y1="98" x2="${mal ? 399 : 412}" y2="98" stroke="${tr(0, C.navy)}" stroke-width="3"/>
<line x1="378" y1="128" x2="${mal ? 399 : 412}" y2="128" stroke="${tr(0, C.navy)}" stroke-width="3"/>
<g transform="${mal ? 'rotate(-5 384 140)' : ''}">
  <path d="M384 86 H312 a12 12 0 0 0 -12 12 V128 a12 12 0 0 0 12 12 H384 Z" fill="${C.creme}" stroke="${tr(0, C.navy)}" stroke-width="${ep(0, 3)}"/>
  <rect x="312" y="130" width="52" height="5" rx="2" fill="${tr(0, C.navy)}" stroke="none"/>
  ${bulle(318, 72, mal ? 340 : 346, 0)}
</g>
<text x="${mal ? 340 : 342}" y="${mal ? 112 : 108}" font-size="13" font-weight="700" text-anchor="middle" fill="${C.navy}">unité</text>
<text x="${mal ? 340 : 342}" y="${mal ? 127 : 123}" font-size="13" font-weight="700" text-anchor="middle" fill="${C.navy}">intérieure</text>
${jets}
${T(278, 90, 'platine de niveau,', 0, 'end')}
${T(278, 106, 'air libre autour', 0, 'end')}
${T(278, 122, '(dégagements de la notice)', 0, 'end')}
${mal ? T(30, 300, 'le jet tombe sur le lit', 0) : T(30, 232, 'le jet passe au-dessus du lit', 0)}

<!-- pas 2 : la carotte, et l'eau qui sort ou qui reste -->
<path d="M372 140 V${yi} H390" fill="none" stroke="${C.gris}" stroke-width="5" stroke-linejoin="round"/>
<path d="M390 ${yi} L450 ${yo}" fill="none" stroke="${tr(1, C.navy)}" stroke-width="${ep(1, 18)}"/>
<path d="M390 ${yi} L450 ${yo}" fill="none" stroke="${C.papier}" stroke-width="${ep(1, 18) - 7}"/>
<path d="M390 ${yi} L450 ${yo}" fill="none" stroke="${C.gris}" stroke-width="4"/>
<path d="M450 ${yo} H474 V310 H560" fill="none" stroke="${C.gris}" stroke-width="5" stroke-linejoin="round"/>
${mal
  ? `<ellipse cx="405" cy="206" rx="12" ry="16" fill="none" stroke="${C.eau}" stroke-width="2" stroke-dasharray="4 4"/>
${goutte(400, 198)}${goutte(410, 206)}${goutte(402, 214)}`
  : `${goutte(458, 206)}${goutte(461, 222)}`}
${A(1) ? (mal ? ar(444, 152, 400, 164, C.eau, 'm41-eau', 4) : ar(398, 150, 442, 164, C.eau, 'm41-eau', 4)) : ''}
${mal ? T(462, 120, 'à contre-pente : l’eau reste dans le mur', 1) : T(462, 120, 'carotte en pente : l’eau sort', 1)}
<line x1="468" y1="128" x2="453" y2="${yo - 12}" stroke="${tr(1, C.gris)}" stroke-width="2"/>

<!-- pas 3 : le support de l'unité extérieure, de niveau -->
<g transform="rotate(${rot} 450 332)">
  <rect x="438" y="327" width="12" height="10" fill="${tr(2, C.navy)}" stroke="none"/>
  <rect x="438" y="391" width="12" height="10" fill="${tr(2, C.navy)}" stroke="none"/>
  <path d="M450 332 H680" fill="none" stroke="${tr(2, C.navy)}" stroke-width="${ep(2, 6)}"/>
  <path d="M450 396 L540 332" fill="none" stroke="${tr(2, C.navy)}" stroke-width="${ep(2, 5)}"/>
  <rect x="568" y="322" width="22" height="10" fill="${tr(2, C.navy)}" stroke="none"/>
  <rect x="640" y="322" width="22" height="10" fill="${tr(2, C.navy)}" stroke="none"/>

  <!-- pas 4 : l'unité extérieure -->
  <rect x="560" y="222" width="110" height="100" rx="8" fill="${C.creme}" stroke="${tr(3, C.navy)}" stroke-width="${ep(3, 3)}"/>
  <path d="M566 240 h14 M566 258 h14 M566 276 h14 M566 294 h14" stroke="${C.gris}" stroke-width="2" fill="none"/>
  <path d="M650 236 h14 M650 250 h14 M650 264 h14 M650 278 h14 M650 292 h14 M650 306 h14" stroke="${C.gris}" stroke-width="2" fill="none"/>
  ${bulle(588, 209, mal ? 598 : 616, 3)}
</g>
<text x="${mal ? 621 : 615}" y="${mal ? 286 : 266}" font-size="13" font-weight="700" text-anchor="middle" fill="${C.navy}">unité</text>
<text x="${mal ? 621 : 615}" y="${mal ? 302 : 282}" font-size="13" font-weight="700" text-anchor="middle" fill="${C.navy}">extérieure</text>
${mal ? T(566, 384, 'pas de niveau :', 2) + T(566, 400, 'vibrations, bruit', 2)
      : T(566, 384, 'support de niveau,', 2) + T(566, 400, 'plots antivibratiles', 2)}

${mal
  ? `<rect x="482" y="180" width="270" height="8" fill="${C.creme}" stroke="${tr(3, C.navy)}" stroke-width="2"/>
<rect x="744" y="180" width="12" height="250" fill="${C.creme}" stroke="${tr(3, C.navy)}" stroke-width="2"/>
${ar(676, 244, 722, 244, C.chaud, 'm41-hp', 4)}${ar(676, 262, 722, 262, C.chaud, 'm41-hp', 4)}${ar(676, 280, 722, 280, C.chaud, 'm41-hp', 4)}
<path d="M733 236 V204 H520 V256 H552" fill="none" stroke="${C.chaud}" stroke-width="${ep(3, 4)}" stroke-linejoin="round" marker-end="url(#m41-hp)"/>
${T(486, 170, 'unité enfermée : l’air chaud revient', 3)}`
  : `${ar(494, 240, 548, 240, tr(3, C.navy), A(3) ? 'm41-vif' : 'm41-air', ep(3, 4))}${ar(494, 258, 548, 258, tr(3, C.navy), A(3) ? 'm41-vif' : 'm41-air', ep(3, 4))}${ar(494, 276, 548, 276, tr(3, C.navy), A(3) ? 'm41-vif' : 'm41-air', ep(3, 4))}
${ar(678, 240, 736, 240, C.chaud, 'm41-hp', ep(3, 4))}${ar(678, 258, 736, 258, C.chaud, 'm41-hp', ep(3, 4))}${ar(678, 276, 736, 276, C.chaud, 'm41-hp', ep(3, 4))}
${T(518, 296, 'aspiration', 3, 'middle')}
${T(678, 296, 'soufflage libre', 3)}`}
`;
    };

    const dire = {
      bien: [
        'Sur un mur qui porte, la platine est vissée de niveau. L’unité s’y accroche en hauteur, avec de l’air libre autour des grilles, et son jet passe au-dessus du lit et du bureau.',
        'Le trou traverse le mur en pente vers l’extérieur. L’eau de condensation, qui accompagne les tubes, descend et sort : elle ne reste pas dans le mur.',
        'Dehors, la console est fixée solidement dans le mur. Les plots antivibratiles se glissent sous les pieds, et le niveau à bulle dit si c’est droit.',
        'L’unité extérieure aspire d’un côté et souffle de l’autre. Rien ne gêne ni l’un ni l’autre. Elle reste accessible, loin de la chambre du voisin et au-dessus de la neige. Les distances sont celles de la notice.'
      ],
      mal: [
        'Sur une cloison légère sans renfort, la platine ne tient pas le poids : l’unité se décroche. Et le jet tombe droit sur le lit.',
        'À contre-pente, l’eau ne sort pas. Elle reste dans le mur, ou revient vers l’unité.',
        'Un support pas de niveau fait vibrer l’unité. Le bruit passe dans le mur.',
        'Dans un recoin fermé, l’air chaud soufflé est aspiré de nouveau. L’été, la haute pression monte et la machine force.'
      ]
    };
    const majMal = () => {
      malP.style.display = mal ? '' : 'none';
      malP.innerHTML = '<span class="signe">✘</span>Mal posé — ' + dire.mal[etape];
    };

    const etapes = [
      { titre: 'L’unité intérieure, sur sa platine', dire: dire.bien[0], peindre: () => { etape = 0; peindre(); majMal(); } },
      { titre: 'La carotte descend vers l’extérieur', dire: dire.bien[1], peindre: () => { etape = 1; peindre(); majMal(); } },
      { titre: 'Le support, de niveau', dire: dire.bien[2], peindre: () => { etape = 2; peindre(); majMal(); } },
      { titre: 'L’air entre et sort librement', dire: dire.bien[3], peindre: () => { etape = 3; peindre(); majMal(); } }
    ];
    const hote = pasAPas(d, etapes, 'Aucune cote ici : les dégagements, la longueur et le dénivelé admis sont ceux de la notice de l’appareil.');

    /* la bascule : bien posé / mal posé */
    const bascule = document.createElement('div');
    bascule.className = 'choix'; bascule.style.marginTop = '.6rem';
    [['Bien posé', false], ['Mal posé', true]].forEach(([lib, valeur]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = lib;
      b.setAttribute('aria-pressed', String(valeur === mal));
      b.addEventListener('click', () => {
        mal = valeur;
        bascule.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        peindre(); majMal();
      });
      bascule.appendChild(b);
    });
    hote.querySelector('.choix').after(bascule);
    bascule.after(malP);
    return hote;
  }

  /* Temps 5 : une pose réussie, en un coup d'œil. */
  function recapitulatif() {
    const d = svg('0 0 820 350', 'Récapitulatif : à gauche, ce que l’unité intérieure demande ; à droite, ce que l’unité extérieure demande ; au milieu, la carotte en pente vers l’extérieur ; en bas, les dégagements, la longueur et le dénivelé sont ceux de la notice.');
    const coche = (x, y) => `<path d="M${x} ${y - 4} l5 6 l11 -14" fill="none" stroke="${C.vert}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    const ligne = (x, y, s) => `${coche(x, y)}<text x="${x + 24}" y="${y}" font-size="14" fill="${C.navy}">${s}</text>`;
    d.innerHTML = `
<rect x="10" y="10" width="800" height="330" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="24" y="24" width="290" height="212" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="42" y="54" font-size="16" font-weight="700" fill="${C.navy}">Dedans : l’unité intérieure</text>
${ligne(44, 90, 'un mur qui porte')}
${ligne(44, 122, 'une platine de niveau')}
${ligne(44, 154, 'de l’air libre autour')}
${ligne(44, 186, 'un jet loin du lit, du bureau')}
${ligne(44, 218, 'un filtre qu’on peut retirer')}
<rect x="506" y="24" width="290" height="212" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="524" y="54" font-size="16" font-weight="700" fill="${C.navy}">Dehors : l’unité extérieure</text>
${ligne(526, 90, 'un support de niveau, solide')}
${ligne(526, 122, 'des plots antivibratiles')}
${ligne(526, 154, 'air libre : entrée et sortie')}
${ligne(526, 186, 'accessible, loin du voisin')}
${ligne(526, 218, 'au-dessus de la neige')}
<line x1="410" y1="30" x2="410" y2="230" stroke="${C.gris}" stroke-width="8" stroke-dasharray="20 8"/>
<path d="M386 112 L434 126" fill="none" stroke="${C.navy}" stroke-width="14"/>
<path d="M386 112 L434 126" fill="none" stroke="${C.papier}" stroke-width="8"/>
<path d="M386 112 L434 126" fill="none" stroke="${C.gris}" stroke-width="4"/>
<path d="M440 140 c-3.5 5 -3.5 8 0 8 c3.5 0 3.5 -3 0 -8 z" fill="${C.eau}" stroke="none"/>
<text x="410" y="258" text-anchor="middle" font-size="14" font-weight="700" fill="${C.eau}">la carotte descend vers l’extérieur</text>
<rect x="24" y="274" width="772" height="48" rx="12" fill="${C.creme}" stroke="${C.orange}" stroke-width="2.5"/>
<text x="410" y="304" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Dégagements, longueur, dénivelé : ceux de la notice, jamais devinés.</text>`;
    return d;
  }

  return { poseDesDeuxUnites, recapitulatif };
})();

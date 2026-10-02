/* CartoClim 3.4 — scènes du multisplit.
   Temps 2 : un seul groupe dehors, trois pièces dedans, en cinq pas (une seule unité en marche, les trois,
   une unité éteinte qui reste dans le circuit, la longueur totale des liaisons, les repères inversés).
   C'est un schéma d'INSTALLATION (qui est relié à quoi), pas la boucle du cycle : la croix du frigoriste ne
   s'y applique pas, le cycle lui-même est dessiné à la station 3.2. Dehors à gauche, dedans à droite, le mur
   entre les deux ; chaque pièce a sa paire de tubes (petit = liquide, gros = gaz), repérée A, B ou C.
   Temps 5 : ce qu'on raccorde pour chaque pièce.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;
  const L = ['A', 'B', 'C'];
  const CY = [129, 247, 365];                       /* hauteur de chaque pièce et de sa paire de vannes */
  const FLOCON = SceneKit.pictos.DESSINS.froid;
  const DROIT = [0, 1, 2];                          /* la vanne A va à la pièce A, etc. */
  const MOTS = { ralenti: 'au ralenti', moyen: 'à vitesse moyenne', plein: 'à plein régime' };

  function plusieursPieces() {
    const d = svg('0 0 820 510',
      'Un multisplit : une seule unité extérieure à gauche, trois pièces A, B et C à droite, chacune avec son unité intérieure reliée au groupe par deux tubes repérés, un petit et un gros. Le mur sépare le dehors du dedans.');

    const peindre = s => {
      const actif = r => s.marche[s.perm[r]];
      const teinte = r => s.ambre ? C.ambre : actif(r) ? C.froid : C.gris;
      const fort = r => (s.ambre || actif(r)) ? 1 : 0;
      const tube = (r, gaz) => {
        const y0 = CY[r] + (gaz ? 12 : -12), y1 = CY[s.perm[r]] + (gaz ? 12 : -12);
        const trace = y0 === y1 ? `M270 ${y0} H410` : `M270 ${y0} C340 ${y0} 340 ${y1} 410 ${y1}`;
        return `<path d="${trace}" fill="none" stroke="${teinte(r)}" stroke-width="${(gaz ? 8 : 4) + fort(r)}"/>`;
      };
      const ordre = [0, 1, 2].sort((a, b) => fort(a) - fort(b));      /* les tubes en service sont dessinés par-dessus */
      const enMarche = s.marche.some(Boolean);
      const chaud = enMarche ? C.chaud : C.navy;                        /* le condenseur rend la chaleur dehors */

      const salle = k => {
        const c = CY[k], top = c - 55, run = s.marche[k];
        const mot = (s.mots && s.mots[k]) || (run ? { t: ['air frais'], c: C.froid, y: 36 } : null);
        return `
<rect x="380" y="${top}" width="415" height="110" rx="10" fill="${run ? 'rgba(61,127,202,.10)' : C.papier}" stroke="${run ? C.froid : C.navy}" stroke-width="${run ? 3 : 2}"/>
<text x="392" y="${top + 22}" font-size="13" font-weight="700" fill="${C.navy}">PIÈCE ${L[k]}</text>
<rect x="410" y="${c - 24}" width="180" height="48" rx="8" fill="${C.creme}" stroke="${run ? C.froid : C.navy}" stroke-width="3"/>
<text x="500" y="${c + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">unité ${L[k]}</text>
${run ? [-12, 0, 12].map(dy => `<path d="M602 ${c + dy} h62" stroke="${C.froid}" stroke-width="3" marker-end="url(#ms-air)"/>`).join('') : ''}
${mot ? mot.t.map((ligne, i) => `<text x="602" y="${c + mot.y + 16 * i}" font-size="13" font-weight="700" fill="${mot.c}">${ligne}</text>`).join('') : ''}
${s.demande[k] ? `<text x="750" y="${top + 26}" text-anchor="end" font-size="13" font-weight="700" fill="${C.froid}">demande du froid</text>
<g transform="translate(756,${top + 8}) scale(.34)" fill="none" stroke="${C.froid}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">${FLOCON}</g>` : ''}`;
      };

      d.innerHTML = `
<defs>
  <marker id="ms-air" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.froid}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="490" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- le mur, entre le dehors et le dedans -->
<line x1="330" y1="52" x2="330" y2="445" stroke="${C.gris}" stroke-width="10" stroke-dasharray="26 10"/>
<text x="322" y="40" text-anchor="end" font-size="13" font-weight="700" fill="${C.gris}">dehors</text>
<text x="338" y="40" font-size="13" font-weight="700" fill="${C.gris}">dedans</text>

<!-- l'unité extérieure : un seul groupe -->
<rect x="20" y="50" width="250" height="390" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="34" y="76" font-size="14" font-weight="700" fill="${C.navy}">UNITÉ EXTÉRIEURE</text>
<g stroke="${chaud}" stroke-width="${enMarche ? 5 : 4}" fill="none">
  <path d="M46 104 h74 M46 120 h74 M46 136 h74 M46 152 h74"/>
  <path d="M46 104 c-14 0 -14 16 0 16 M120 120 c14 0 14 16 0 16 M46 136 c-14 0 -14 16 0 16"/>
</g>
<g stroke="${C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5].map(i => `<line x1="${56 + i * 12}" y1="96" x2="${56 + i * 12}" y2="160"/>`).join('')}</g>
<circle cx="172" cy="128" r="26" fill="none" stroke="${chaud}" stroke-width="3"/>
<path d="M172 102 v52 M146 128 h52" stroke="${chaud}" stroke-width="3"/>
<text x="46" y="182" font-size="13" font-weight="700" fill="${enMarche ? C.chaud : C.navy}">condenseur et hélice</text>
<rect x="44" y="250" width="120" height="60" rx="10" fill="${C.papier}" stroke="${s.comp ? C.chaud : C.navy}" stroke-width="${s.comp ? 5 : 3}"/>
<text x="104" y="276" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">compresseur</text>
<text x="104" y="296" text-anchor="middle" font-size="13" fill="${C.gris}">Inverter</text>
${s.comp ? `<text x="44" y="334" font-size="13" font-weight="700" fill="${C.chaud}">${MOTS[s.comp]}</text>` : ''}
<text x="44" y="404" font-size="13" font-weight="700" fill="${C.froid}">un seul mode : froid</text>

<!-- les liaisons : une paire par vanne, le petit tube (liquide) au-dessus du gros (gaz) -->
${ordre.map(r => tube(r, false) + tube(r, true)).join('')}
${[0, 1, 2].map(r => `
<rect x="264" y="${CY[r] - 18}" width="12" height="12" fill="${C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
<rect x="264" y="${CY[r] + 6}" width="12" height="12" fill="${C.papier}" stroke="${C.navy}" stroke-width="2.5"/>
<text x="243" y="${CY[r] + 7}" text-anchor="middle" font-size="20" font-weight="700" fill="${C.navy}">${L[r]}</text>`).join('')}

<!-- les pièces : une unité intérieure chacune -->
${[0, 1, 2].map(salle).join('')}

${s.mention ? `<text x="410" y="466" text-anchor="middle" font-size="15" font-weight="700" fill="${s.mention.c}">${s.mention.t}</text>` : ''}

<!-- légende -->
<line x1="20" y1="485" x2="56" y2="485" stroke="${C.gris}" stroke-width="4"/>
<text x="64" y="490" font-size="13" fill="${C.gris}">petit tube : liquide</text>
<line x1="210" y1="485" x2="246" y2="485" stroke="${C.gris}" stroke-width="8"/>
<text x="254" y="490" font-size="13" fill="${C.gris}">gros tube : gaz</text>
<line x1="400" y1="485" x2="436" y2="485" stroke="${C.gris}" stroke-width="8" stroke-dasharray="14 6"/>
<text x="444" y="490" font-size="13" fill="${C.gris}">le mur</text>
<line x1="520" y1="485" x2="556" y2="485" stroke="${C.froid}" stroke-width="5"/>
<text x="564" y="490" font-size="13" fill="${C.gris}">bleu : le fluide circule</text>`;
    };

    const etapes = [
      { titre: 'Une seule pièce demande du froid',
        dire: 'La pièce B demande du froid. Sa carte le dit au groupe, qui ouvre la branche B et elle seule : le fluide ne va que vers cette pièce. Le compresseur Inverter tourne au ralenti, la demande est petite. Les deux autres unités restent à l’arrêt.',
        peindre: () => peindre({ marche: [false, true, false], demande: [false, true, false], perm: DROIT, comp: 'ralenti' }) },
      { titre: 'Les trois pièces demandent du froid',
        dire: 'Les trois branches s’ouvrent. Le compresseur, toujours le même, accélère pour servir tout le monde : sa vitesse suit la somme des demandes.',
        peindre: () => peindre({ marche: [true, true, true], demande: [true, true, true], perm: DROIT, comp: 'plein' }) },
      { titre: 'Une pièce s’éteint : ses tubes restent',
        dire: 'L’unité C s’arrête et sa branche se ferme. Elle n’est pas débranchée pour autant : ses deux tubes restent raccordés au circuit et comptent dans la charge. Le compresseur ralentit pour les deux pièces restantes.',
        peindre: () => peindre({ marche: [true, true, false], demande: [true, true, false], perm: DROIT, comp: 'moyen',
          mots: [null, null, { t: ['éteinte :', 'toujours raccordée'], c: C.gris, y: 4 }] }) },
      { titre: 'Toutes les liaisons comptent',
        dire: 'Le groupe est préchargé pour une longueur totale de liaisons : celle de tous les couples de tubes mis bout à bout. Si l’installation en demande davantage, on ajoute du fluide, comme la notice le dit.',
        peindre: () => peindre({ marche: [false, false, false], demande: [false, false, false], perm: DROIT, comp: null, ambre: true,
          mention: { t: 'longueur totale = A + B + C', c: C.ambre } }) },
      { titre: 'Repères inversés : la mauvaise pièce est servie',
        dire: 'Les tubes de la pièce A sont sur le raccord B, et ceux de B sur le raccord A. La pièce B demande du froid, le groupe ouvre son raccord B… et le froid arrive dans la pièce A. La machine démarre, mais elle sert la mauvaise pièce.',
        peindre: () => peindre({ marche: [true, false, false], demande: [false, true, false], perm: [1, 0, 2], comp: 'ralenti',
          mots: [{ t: ['froid demandé par B'], c: C.rouge, y: 36 }, { t: ['ne reçoit rien'], c: C.rouge, y: 4 }, null],
          mention: { t: 'A branché sur B, B branché sur A', c: C.rouge } }) }
    ];
    return pasAPas(d, etapes, 'Mode froid. Le mode est le même pour toutes les pièces : une seule vanne 4 voies dans le groupe inverse le fluide pour tout le monde, voir la station 2.6.');
  }

  /* Temps 5 : ce qu'on raccorde pour chaque pièce, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 820 360',
      'Récapitulatif : un groupe extérieur relié à trois unités intérieures A, B et C ; chaque pièce a son petit tube liquide, son gros tube gaz, son câble de liaison et son tuyau de condensats, le même repère aux deux bouts.');
    const R = [70, 160, 250];
    d.innerHTML = `
<defs>
  <marker id="rc-eau" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.eau}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="340" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<line x1="350" y1="44" x2="350" y2="300" stroke="${C.gris}" stroke-width="8" stroke-dasharray="20 8"/>
<text x="350" y="36" text-anchor="middle" font-size="13" fill="${C.gris}">le mur</text>
<rect x="20" y="20" width="200" height="280" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="120" y="48" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Groupe extérieur</text>
<text x="108" y="116" text-anchor="middle" font-size="14" fill="${C.gris}">un seul compresseur</text>
<text x="108" y="134" text-anchor="middle" font-size="14" fill="${C.gris}">un seul mode pour tous</text>
<text x="108" y="210" text-anchor="middle" font-size="14" fill="${C.gris}">une branche par pièce</text>
<text x="108" y="228" text-anchor="middle" font-size="14" fill="${C.gris}">des vannes repérées</text>
${R.map((y, i) => `
<text x="200" y="${y + 6}" text-anchor="middle" font-size="18" font-weight="700" fill="${C.navy}">${L[i]}</text>
<line x1="220" y1="${y - 18}" x2="480" y2="${y - 18}" stroke="${C.froid}" stroke-width="4"/>
<line x1="220" y1="${y - 4}" x2="480" y2="${y - 4}" stroke="${C.froid}" stroke-width="9"/>
<line x1="220" y1="${y + 12}" x2="480" y2="${y + 12}" stroke="${C.navy}" stroke-width="3" stroke-dasharray="6 5"/>
<rect x="480" y="${y - 32}" width="160" height="64" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="560" y="${y - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Unité ${L[i]}</text>
<text x="560" y="${y + 16}" text-anchor="middle" font-size="13" fill="${C.gris}">dans la pièce ${L[i]}</text>
<line x1="640" y1="${y}" x2="706" y2="${y}" stroke="${C.eau}" stroke-width="3" marker-end="url(#rc-eau)"/>
<text x="718" y="${y + 5}" font-size="13" font-weight="700" fill="${C.eau}">condensats</text>`).join('')}
<text x="410" y="322" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">le même repère aux deux bouts : A dehors, A dedans</text>
<line x1="20" y1="341" x2="56" y2="341" stroke="${C.froid}" stroke-width="4"/>
<text x="64" y="345" font-size="13" fill="${C.gris}">petit tube : liquide</text>
<line x1="210" y1="341" x2="246" y2="341" stroke="${C.froid}" stroke-width="9"/>
<text x="254" y="345" font-size="13" fill="${C.gris}">gros tube : gaz</text>
<line x1="380" y1="341" x2="416" y2="341" stroke="${C.navy}" stroke-width="3" stroke-dasharray="6 5"/>
<text x="424" y="345" font-size="13" fill="${C.gris}">câble de liaison</text>
<line x1="560" y1="341" x2="596" y2="341" stroke="${C.eau}" stroke-width="4"/>
<text x="604" y="345" font-size="13" fill="${C.gris}">tuyau de condensats</text>`;
    return d;
  }

  return { plusieursPieces, recapitulatif };
})();

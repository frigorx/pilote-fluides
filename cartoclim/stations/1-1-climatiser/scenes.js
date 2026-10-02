/* CartoClim 1.1 — scènes de « Climatiser, c'est quoi ? ». Temps 2 : une pièce en été, en coupe ; la chaleur
   entre (soleil, occupants, ordinateur), le climatiseur la prend dedans et la rejette dehors, en quatre pas.
   Le dessin ne montre PAS le circuit du fluide (c'est la station 2.1) : il montre où va la chaleur.
   Temps 5 : ce qu'un climatiseur fait, et ce qu'il ne fait pas, en un dessin.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* Les icônes des aptitudes, dans un carré 0 0 100 100, sans couleur (le kit la pose). */
  const icones = {
    froid: SceneKit.pictos.DESSINS.froid,
    chaud: SceneKit.pictos.DESSINS.chaud,
    /* deux pièces, et la chaleur qui passe de l'une à l'autre */
    deplacer: '<path d="M8 28 h30 v44 h-30 z M62 28 h30 v44 h-30 z M42 50 h16 M52 42 l8 8 l-8 8"/>',
    /* une goutte qui tombe dans un bac */
    eau: '<path d="M50 8 C40 24 34 32 34 42 a16 16 0 0 0 32 0 C66 32 60 24 50 8 Z"/><path d="M22 68 v16 h56 v-16"/>',
    /* une grille fine qui arrête la poussière */
    filtre: '<path d="M14 20 h72 v60 h-72 z M32 20 v60 M50 20 v60 M68 20 v60 M14 40 h72 M14 60 h72"/>',
    /* une hélice à trois pales */
    brasser: '<circle cx="50" cy="50" r="6"/>' +
      '<ellipse cx="50" cy="27" rx="10" ry="19"/>' +
      '<ellipse transform="rotate(120 50 50)" cx="50" cy="27" rx="10" ry="19"/>' +
      '<ellipse transform="rotate(240 50 50)" cx="50" cy="27" rx="10" ry="19"/>',
    /* une flèche qui entre dans une pièce : de l'air venu de dehors */
    neuf: '<path d="M36 22 h56 v56 h-56 z M4 50 h38 M30 40 l12 10 l-12 10"/>'
  };

  /* Temps 2 : la chaleur d'une pièce l'été, et où elle va. */
  function trajetDeLaChaleur() {
    const d = svg('0 0 820 470',
      'Une pièce en été, en coupe : le soleil entre par la vitre, les occupants et l’ordinateur chauffent ; l’unité intérieure du climatiseur prend la chaleur dans la pièce, les tubes la traversent le mur, et l’unité extérieure la rejette dehors.');
    let etape = 0;
    const hp = C.chaud, bp = C.froid, sol = C.ambre;

    /* une flèche = un tracé : un marqueur n'orne que le dernier segment d'un tracé */
    const fl = (traits, couleur, marqueur, epaisseur = 5) => traits.map(t =>
      `<path d="M${t[0]} ${t[1]} L${t[2]} ${t[3]}" stroke="${couleur}" stroke-width="${epaisseur}" marker-end="url(#${marqueur})"/>`).join('');

    const personne = (x, lit) => {
      const k = lit ? hp : C.navy, w = lit ? 4 : 3;
      return `<circle cx="${x}" cy="322" r="13" fill="${C.papier}" stroke="${k}" stroke-width="${w}"/>
<path d="M${x - 17} 390 v-34 a17 14 0 0 1 34 0 v34 z" fill="${C.papier}" stroke="${k}" stroke-width="${w}" stroke-linejoin="round"/>`;
    };

    const peindre = () => {
      const k = etape;
      const teinte = k === 0 ? [hp, .07] : k === 1 ? [hp, .16] : [C.doux, .22];   /* la pièce chauffe, puis le climatiseur la rafraîchit */
      const faible = k === 1 ? .45 : 1;                                       /* au pas 2, le soleil continue d'entrer, plus discret */
      d.innerHTML = `
<defs>
  <marker id="c-hp" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" refX="12" refY="9" orient="auto"><path d="M0 0 L18 9 L0 18 z" fill="${hp}"/></marker>
  <marker id="c-bp" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" refX="12" refY="9" orient="auto"><path d="M0 0 L18 9 L0 18 z" fill="${bp}"/></marker>
  <marker id="c-sol" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" refX="12" refY="9" orient="auto"><path d="M0 0 L18 9 L0 18 z" fill="${sol}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="450" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- la pièce, ses deux murs, le sol -->
<rect x="150" y="60" width="420" height="330" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="150" y="60" width="420" height="330" fill="${teinte[0]}" fill-opacity="${teinte[1]}" stroke="none"/>
<rect x="128" y="60" width="22" height="330" fill="${C.trait}" stroke="${C.navy}" stroke-width="3"/>
<rect x="570" y="60" width="22" height="330" fill="${C.trait}" stroke="${C.navy}" stroke-width="3"/>
<line x1="20" y1="390" x2="800" y2="390" stroke="${C.navy}" stroke-width="4"/>
<text x="162" y="84" font-size="14" font-weight="700" fill="${C.navy}">DANS LA PIÈCE</text>
<text x="606" y="48" font-size="14" font-weight="700" fill="${C.navy}">DEHORS</text>

<!-- la vitre -->
<rect x="128" y="130" width="22" height="140" fill="${C.air}" fill-opacity=".55" stroke="${k === 0 ? sol : C.navy}" stroke-width="${k === 0 ? 5 : 3}"/>
<text x="120" y="300" text-anchor="end" font-size="14" fill="${C.gris}">vitre</text>

<!-- le soleil, dehors -->
<circle cx="66" cy="82" r="20" fill="${sol}" stroke="none"/>
<g stroke="${sol}" stroke-width="3" stroke-linecap="round">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
  const a = i * Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
  return `<line x1="${(66 + 27 * c).toFixed(1)}" y1="${(82 + 27 * s).toFixed(1)}" x2="${(66 + 36 * c).toFixed(1)}" y2="${(82 + 36 * s).toFixed(1)}"/>`; }).join('')}</g>
<text x="66" y="30" text-anchor="middle" font-size="14" fill="${C.gris}">soleil</text>

<!-- le soleil entre : la lumière traverse la vitre, puis devient chaleur dans la pièce -->
${k <= 1 ? `<g opacity="${faible}">
  ${fl([[92, 100, 122, 142], [88, 106, 122, 190], [82, 110, 122, 238]], sol, 'c-sol', 4)}
  ${fl([[154, 160, 220, 204], [154, 200, 220, 244], [154, 240, 220, 284]], hp, 'c-hp')}
</g>` : ''}
${k === 0 ? `<text x="190" y="145" text-anchor="middle" font-size="14" font-weight="700" fill="${hp}">chaleur</text>` : ''}

<!-- occupants et ordinateur -->
${personne(270, k === 1)}
${personne(330, k === 1)}
<g stroke="${k === 1 ? hp : C.navy}" stroke-width="${k === 1 ? 4 : 3}" stroke-linecap="round" stroke-linejoin="round">
  <rect x="375" y="356" width="100" height="8" rx="2" fill="${C.papier}"/>
  <path d="M385 364 v26 M465 364 v26" fill="none"/>
  <rect x="400" y="312" width="52" height="36" rx="4" fill="${C.papier}"/>
  <path d="M426 348 v8 M414 356 h24" fill="none"/>
</g>
<text x="300" y="412" text-anchor="middle" font-size="14" fill="${C.gris}">occupants</text>
<text x="425" y="412" text-anchor="middle" font-size="14" fill="${C.gris}">ordinateur</text>
${k === 1 ? `${fl([[270, 302, 270, 254], [330, 302, 330, 254], [426, 302, 426, 254]], hp, 'c-hp')}
<text x="348" y="242" text-anchor="middle" font-size="14" font-weight="700" fill="${hp}">chaleur</text>` : ''}

<!-- l'unité intérieure, contre le mur de droite -->
<rect x="430" y="84" width="130" height="48" rx="10" fill="${C.papier}" stroke="${k === 2 ? bp : C.navy}" stroke-width="${k === 2 ? 5 : 3}"/>
<path d="M442 122 h106" stroke="${k === 2 ? bp : C.navy}" stroke-width="3" stroke-linecap="round"/>
<text x="420" y="112" text-anchor="end" font-size="14" fill="${C.gris}">unité intérieure</text>
${k === 2 ? `${fl([[352, 200, 418, 138], [388, 218, 440, 140]], hp, 'c-hp')}
<text x="330" y="212" text-anchor="end" font-size="14" font-weight="700" fill="${hp}">air chaud</text>
${fl([[472, 136, 472, 202], [506, 136, 506, 202]], bp, 'c-bp')}
<text x="490" y="226" text-anchor="middle" font-size="14" font-weight="700" fill="${bp}">air frais</text>` : ''}

<!-- les tubes de cuivre : de l'unité intérieure, à travers le mur, jusqu'à l'unité extérieure -->
<path d="M560 108 H650 V288" fill="none" stroke="${k >= 2 ? hp : C.gris}" stroke-width="${k === 3 ? 9 : k === 2 ? 6 : 4}" stroke-linejoin="round" ${k === 3 ? 'marker-end="url(#c-hp)"' : ''}/>
<text x="664" y="150" font-size="14" fill="${k >= 2 ? hp : C.gris}" font-weight="${k >= 2 ? 700 : 400}">tubes de cuivre</text>

<!-- l'unité extérieure, dehors, au sol -->
<rect x="620" y="290" width="170" height="100" rx="10" fill="${C.papier}" stroke="${k === 3 ? hp : C.navy}" stroke-width="${k === 3 ? 5 : 3}"/>
<circle cx="735" cy="340" r="34" fill="none" stroke="${k === 3 ? hp : C.navy}" stroke-width="3"/>
<path d="M735 310 v60 M705 340 h60" stroke="${k === 3 ? hp : C.navy}" stroke-width="3"/>
<path d="M640 312 v56 M654 312 v56 M668 312 v56" stroke="${C.trait}" stroke-width="3"/>
<text x="628" y="412" font-size="14" fill="${C.gris}">unité extérieure</text>
${k === 3 ? `${fl([[700, 282, 700, 238], [735, 282, 735, 238], [770, 282, 770, 238]], hp, 'c-hp')}
<text x="735" y="222" text-anchor="middle" font-size="14" font-weight="700" fill="${hp}">chaleur rejetée</text>
${fl([[780, 438, 780, 394]], sol, 'c-sol')}
<text x="768" y="440" text-anchor="end" font-size="14" font-weight="700" fill="${sol}">électricité</text>` : ''}`;
    };

    const etapes = [
      { titre: 'Le soleil entre par la vitre',
        dire: 'La lumière traverse le verre et tombe sur le sol et les meubles : elle devient de la chaleur, et cette chaleur reste enfermée dans la pièce.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Les occupants et l’ordinateur chauffent aussi',
        dire: 'Un corps donne de la chaleur en permanence. Un ordinateur transforme en chaleur toute l’électricité qu’il consomme. La pièce se réchauffe encore.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Le climatiseur prend la chaleur dedans',
        dire: 'L’unité intérieure aspire l’air chaud de la pièce, lui prend sa chaleur et le souffle plus frais. La chaleur n’a pas disparu : elle passe dans le fluide, qui l’emmène par les tubes.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Il la rejette dehors',
        dire: 'L’unité extérieure rend cette chaleur à l’air du dehors. Rien n’est détruit, tout est déplacé — et l’électricité consommée s’y ajoute, car elle finit aussi en chaleur.',
        peindre: () => { etape = 3; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Ce dessin ne montre pas le circuit du fluide : la station 2.1 le déroule organe par organe.');
  }

  /* Temps 5 : ce que fait un climatiseur, et ce qu'il ne fait pas. */
  function recapitulatif() {
    const d = svg('0 0 820 360', 'Récapitulatif : un climatiseur déplace la chaleur de la pièce vers dehors grâce à l’électricité ; il sait refroidir, chauffer, déshumidifier, filtrer et brasser, mais il ne fait pas entrer d’air neuf.');
    const tuiles = [
      { icone: icones.froid,   nom: 'Refroidir',     sous: 'l’été',          oui: true },
      { icone: icones.chaud,   nom: 'Chauffer',      sous: 'si réversible',  oui: true },
      { icone: icones.eau,     nom: 'Déshumidifier', sous: 'l’eau va au bac', oui: true },
      { icone: icones.filtre,  nom: 'Filtrer',       sous: 'les poussières', oui: true },
      { icone: icones.brasser, nom: 'Brasser',       sous: 'fait circuler',  oui: true },
      { icone: icones.neuf,    nom: 'Air neuf',      sous: 'pas son métier', oui: false }
    ];
    d.innerHTML = `
<defs>
  <marker id="r-hp" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" refX="18" refY="13" orient="auto"><path d="M0 0 L26 13 L0 26 z" fill="${C.chaud}"/></marker>
</defs>
<rect x="10" y="10" width="800" height="340" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<rect x="110" y="36" width="200" height="90" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="210" y="76" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">DANS LA PIÈCE</text>
<text x="210" y="102" text-anchor="middle" font-size="14" fill="${C.gris}">la chaleur est prise</text>
<rect x="510" y="36" width="200" height="90" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="610" y="76" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">DEHORS</text>
<text x="610" y="102" text-anchor="middle" font-size="14" fill="${C.gris}">la chaleur est rejetée</text>
<path d="M318 81 H502" stroke="${C.chaud}" stroke-width="10" marker-end="url(#r-hp)"/>
<text x="410" y="62" text-anchor="middle" font-size="14" font-weight="700" fill="${C.chaud}">la chaleur est déplacée</text>
<text x="410" y="112" text-anchor="middle" font-size="14" font-weight="700" fill="${C.ambre}">grâce à l’électricité</text>
${tuiles.map((t, i) => {
  const x = 39 + i * 126, y = 160;
  const couleur = t.oui ? C.navy : C.gris;
  return `<rect x="${x}" y="${y}" width="112" height="170" rx="14" fill="${C.creme}" stroke="${t.oui ? C.vert : C.rouge}" stroke-width="3"/>
<g transform="translate(${x + 20},${y + 14}) scale(.72)" fill="none" stroke="${couleur}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${t.icone}</g>
${t.oui ? `<circle cx="${x + 98}" cy="${y + 14}" r="10" fill="${C.vert}"/><path d="M${x + 93} ${y + 14} l4 4 l7 -8" fill="none" stroke="${C.papier}" stroke-width="3" stroke-linecap="round"/>` : `<line x1="${x + 20}" y1="${y + 14}" x2="${x + 92}" y2="${y + 86}" stroke="${C.rouge}" stroke-width="7" stroke-linecap="round"/>`}
<text x="${x + 56}" y="${y + 122}" text-anchor="middle" font-size="14" font-weight="700" fill="${couleur}">${t.nom}</text>
<text x="${x + 56}" y="${y + 144}" text-anchor="middle" font-size="13" fill="${C.gris}">${t.sous}</text>`;
}).join('')}`;
    return d;
  }

  return { trajetDeLaChaleur, recapitulatif, icones };
})();

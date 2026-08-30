/* ÉlectroRézo — les scènes des lignes 6 « Machines » et 7 « Faire varier ».

   Deux lignes, une même idée : on convertit. De l'électricité vers du mouvement,
   d'une tension vers une autre, d'une fréquence vers une autre.

   Les deux réglettes qui portent ces lignes :
     · le rapport de transformation — on ajoute des spires, la tension suit,
       et le courant fait l'inverse. La puissance, elle, ne bouge pas ;
     · la loi U sur f — on baisse la fréquence, et si on ne baisse pas la tension
       en même temps, le moteur sature. C'est toute la ligne 7 en un curseur.

   Règles de maison : la couleur ne porte jamais seule l'information, aucun texte
   ne chevauche un tracé. */

const SchemasMachines = (() => {
  'use strict';
  const C = { navy:'#1b3a63', bleu:'#3d7fca', doux:'#84b7ec', orange:'#c9451a', feu:'#ff6b35',
              vert:'#1e7e54', rouge:'#c0392b', gris:'#637285', papier:'#fffdf8',
              creme:'#f7f1e7', trait:'rgba(27,58,99,.18)', cuivre:'#c07a3e' };

  const svg = (vb, aria) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', vb); s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img'); s.setAttribute('aria-label', aria); return s;
  };
  const nb = (v, d) => v.toFixed(d === undefined ? 0 : d).replace('.', ',');
  const bloc = SchemasGrandeurs.bloc;
  const reglette = SchemasGrandeurs.reglette;

  /* ============================================================ les trois questions
     Le fil rouge des lignes 6 et 7. */
  const COLONNES = [
    { id: 'mouvement', libelle: 'Produire du mouvement', aide: 'quelque chose tourne, ou se déplace',
      dessin: (x, y) => `
        <circle cx="${x}" cy="${y}" r="26" fill="none" stroke="${C.orange}" stroke-width="6"/>
        <path d="M${x + 26} ${y - 16} A 32 32 0 0 1 ${x + 26} ${y + 16}" fill="none" stroke="${C.orange}" stroke-width="5"/>
        <path d="M${x + 19} ${y + 10} L${x + 27} ${y + 18} L${x + 34} ${y + 8}" fill="none" stroke="${C.orange}" stroke-width="5"/>
        <text x="${x}" y="${y + 50}" text-anchor="middle" font-size="12" fill="${C.gris}">ça tourne</text>` },
    { id: 'tension', libelle: 'Changer la tension', aide: 'elle sort différente de ce qui entre',
      dessin: (x, y) => `
        <line x1="${x - 40}" y1="${y - 12}" x2="${x - 6}" y2="${y - 12}" stroke="${C.navy}" stroke-width="9"/>
        <line x1="${x + 6}" y1="${y - 12}" x2="${x + 40}" y2="${y - 12}" stroke="${C.navy}" stroke-width="3"/>
        <rect x="${x - 8}" y="${y - 24}" width="16" height="26" rx="2" fill="none" stroke="${C.navy}" stroke-width="4"/>
        <text x="${x - 34}" y="${y + 16}" font-size="12" fill="${C.gris}">gros</text>
        <text x="${x + 12}" y="${y + 16}" font-size="12" fill="${C.gris}">petit</text>
        <text x="${x}" y="${y + 50}" text-anchor="middle" font-size="12" fill="${C.gris}">entrée ≠ sortie</text>` },
    { id: 'alternatif', libelle: 'Exiger de l’alternatif', aide: 'en continu, elle ne fonctionne pas',
      dessin: (x, y) => `
        <path d="M${x - 40} ${y} Q${x - 30} ${y - 26} ${x - 20} ${y} Q${x - 10} ${y + 26} ${x} ${y}
                 Q${x + 10} ${y - 26} ${x + 20} ${y} Q${x + 30} ${y + 26} ${x + 40} ${y}"
              fill="none" stroke="${C.vert}" stroke-width="6"/>
        <text x="${x}" y="${y + 50}" text-anchor="middle" font-size="12" fill="${C.gris}">il lui faut la vague</text>` }
  ];

  function pictoTrois(defs) {
    const cols = defs || COLONNES;
    const d = svg('0 0 640 200', 'Les trois questions que l’on pose à une machine.');
    const pas = 640 / cols.length;
    d.innerHTML = `<rect x="6" y="6" width="628" height="188" rx="14" fill="${C.papier}" stroke="${C.trait}"/>` +
      cols.map((c, i) => {
        const x = pas * (i + .5);
        return `<g id="pic-${c.id}" opacity=".38">${c.dessin(x, 88)}
          <text x="${x}" y="176" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">${c.libelle}</text></g>`;
      }).join('');
    return {
      element: d,
      marquer(rep) {
        cols.forEach(c => {
          const g = d.querySelector('#pic-' + c.id);
          if (!g) return;
          g.setAttribute('opacity', rep[c.id] ? '1' : '.22');
          if (!rep[c.id]) {
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.setAttribute('x', pas * (cols.indexOf(c) + .5)); t.setAttribute('y', '40');
            t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '26');
            t.setAttribute('fill', C.rouge); t.textContent = 'non';
            g.appendChild(t);
          }
        });
      }
    };
  }

  /* ============================================================ 6.1 — l'électro-aimant */
  function electroAimant() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 320', 'Une bobine autour d’un noyau de fer : elle attire une armature, d’autant plus fort que le courant est grand.');
    let I = 0.5;

    const peindre = () => {
      const colle = I > 0.62;
      const ecart = colle ? 0 : Math.round((0.62 - I) * 66);
      const F = Math.round(I * I * 260);
      d.innerHTML = `
<rect x="8" y="8" width="684" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${colle ? 'Le courant suffit — l’armature vient coller' : 'Le courant est trop faible — le ressort l’emporte'}</text>

<rect x="150" y="${170 - ecart}" width="240" height="26" rx="3" fill="#c9d6e6" stroke="${C.navy}" stroke-width="3"/>
<text x="270" y="${188 - ecart}" text-anchor="middle" font-size="13" fill="${C.navy}">armature mobile</text>
<path d="M132 ${146 - ecart} L114 ${154 - ecart} L132 ${162 - ecart} L114 ${170 - ecart} L132 ${178 - ecart} L114 ${186 - ecart}"
      fill="none" stroke="${C.orange}" stroke-width="3"/>
<text x="104" y="${142 - ecart}" text-anchor="end" font-size="12" fill="${C.orange}">le ressort</text>
<text x="104" y="${160 - ecart}" text-anchor="end" font-size="12" fill="${C.orange}">tire vers le haut</text>

${ecart ? `<line x1="150" y1="${206 - ecart}" x2="390" y2="${206 - ecart}" stroke="${C.rouge}" stroke-width="2" stroke-dasharray="5 5"/>
<text x="400" y="${210 - ecart}" font-size="12" fill="${C.rouge}">entrefer</text>` : ''}

<rect x="150" y="206" width="240" height="26" rx="3" fill="#c9d6e6" stroke="${C.navy}" stroke-width="3"/>
<text x="270" y="224" text-anchor="middle" font-size="13" fill="${C.navy}">noyau fixe</text>
<rect x="188" y="240" width="164" height="42" rx="4" fill="none" stroke="${C.orange}" stroke-width="${3 + I * 6}"/>
<text x="270" y="266" text-anchor="middle" font-size="14" font-weight="700" fill="${C.orange}">la bobine</text>

<rect x="440" y="86" width="220" height="150" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="550" y="114" text-anchor="middle" font-size="12" fill="${C.gris}">le courant</text>
<text x="550" y="146" text-anchor="middle" font-size="24" font-weight="700" fill="${C.orange}">${nb(I, 2)} A</text>
<text x="550" y="176" text-anchor="middle" font-size="12" fill="${C.gris}">la force d’attraction</text>
<text x="550" y="208" text-anchor="middle" font-size="24" font-weight="700" fill="${colle ? C.vert : C.gris}">${F} N</text>

<text x="350" y="298" text-anchor="middle" font-size="13" fill="${C.gris}">La force suit le CARRÉ du courant : doublez-le, elle est multipliée par quatre.</text>`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'ea', 'Le courant dans la bobine', 0.1, 1.2, 0.02, I, v => nb(v, 2) + ' A', v => { I = v; peindre(); });
    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Montez doucement : rien ne bouge, puis d’un coup l’armature colle. '
      + 'Un électro-aimant n’attire pas progressivement : il y a un seuil, et il est franchi ou il ne l’est pas.';
    hote.appendChild(p);
    return hote;
  }

  /* ============================================================ 6.2 — le transformateur
     LA réglette de la ligne 6 : on ajoute des spires, tout suit. */
  function rapportDeTransformation() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 340', 'Un transformateur : le rapport des spires décide du rapport des tensions, et l’inverse pour les courants.');
    let N2 = 100;
    const N1 = 1000, U1 = 230, P = 460;

    const peindre = () => {
      const U2 = U1 * N2 / N1;
      const I1 = P / U1, I2 = U2 > 0 ? P / U2 : 0;
      const spires = n => Math.max(4, Math.min(14, Math.round(n / 90)));
      const bob = (x, n, coul) => Array.from({ length: spires(n) }, (_, i) =>
        `<path d="M${x} ${104 + i * 12} q22 6 0 12" fill="none" stroke="${coul}" stroke-width="3"/>`).join('');
      d.innerHTML = `
<rect x="8" y="8" width="684" height="324" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">${U2 < U1 ? 'Il abaisse' : U2 > U1 ? 'Il élève' : 'Il laisse la tension telle quelle'}</text>

<rect x="230" y="76" width="180" height="200" rx="4" fill="none" stroke="${C.gris}" stroke-width="16"/>
<text x="320" y="300" text-anchor="middle" font-size="12" fill="${C.gris}">le circuit magnétique — aucune liaison électrique entre les deux côtés</text>

${bob(222, N1, C.navy)}
${bob(410, N2, C.orange)}

<text x="150" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">primaire</text>
<text x="150" y="130" text-anchor="middle" font-size="20" font-weight="700" fill="${C.navy}">${U1} V</text>
<text x="150" y="156" text-anchor="middle" font-size="13" fill="${C.gris}">${N1} spires</text>
<text x="150" y="186" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">${nb(I1, 2)} A</text>
<line x1="196" y1="112" x2="120" y2="112" stroke="${C.navy}" stroke-width="4"/>
<line x1="196" y1="248" x2="120" y2="248" stroke="${C.navy}" stroke-width="4"/>

<text x="546" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="${C.orange}">secondaire</text>
<text x="546" y="130" text-anchor="middle" font-size="20" font-weight="700" fill="${C.orange}">${nb(U2, 1)} V</text>
<text x="546" y="156" text-anchor="middle" font-size="13" fill="${C.gris}">${N2} spires</text>
<text x="546" y="186" text-anchor="middle" font-size="16" font-weight="700" fill="${C.orange}">${nb(I2, 2)} A</text>
<line x1="440" y1="112" x2="620" y2="112" stroke="${C.orange}" stroke-width="4"/>
<line x1="440" y1="248" x2="620" y2="248" stroke="${C.orange}" stroke-width="4"/>

<rect x="240" y="176" width="160" height="52" rx="8" fill="${C.creme}" stroke="${C.trait}"/>
<text x="320" y="198" text-anchor="middle" font-size="12" fill="${C.gris}">la puissance</text>
<text x="320" y="220" text-anchor="middle" font-size="17" font-weight="700" fill="${C.vert}">${P} W</text>

<text x="350" y="324" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">La tension descend, le courant monte. Le produit des deux ne bouge pas.</text>`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'tr', 'Les spires du secondaire', 20, 2000, 10, N2, v => v + ' spires', v => { N2 = v; peindre(); });
    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Cherchez 100 spires : vous obtenez 23 volts. Cherchez 2000 : vous obtenez 460 et il élève. '
      + 'Et à chaque fois, regardez la puissance au centre : elle ne bouge pas d’un watt.';
    hote.appendChild(p);
    return hote;
  }

  /* ============================================================ 6.3 — le glissement */
  function rotorEtGlissement() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 320', 'Le rotor tourne un peu moins vite que le champ. Cet écart est le glissement, et il grandit avec la charge.');
    let charge = 100;      /* pourcentage de la charge nominale */

    const peindre = () => {
      const ns = 1500;
      const g = 0.005 + (charge / 100) * 0.038;      /* glissement : 0,5 % à vide, ~4 % en charge */
      const n = Math.round(ns * (1 - g));
      const I = 1.4 + (charge / 100) * 2.44;
      d.innerHTML = `
<rect x="8" y="8" width="684" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Il ne rattrape jamais le champ — et c’est nécessaire</text>

<circle cx="200" cy="164" r="86" fill="none" stroke="${C.trait}" stroke-width="14"/>
<text x="200" y="72" text-anchor="middle" font-size="12" fill="${C.gris}">le stator</text>
<circle cx="200" cy="164" r="52" fill="none" stroke="${C.navy}" stroke-width="4"/>
<text x="200" y="169" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">rotor</text>

<path d="M200 64 A 100 100 0 0 1 288 116" fill="none" stroke="${C.rouge}" stroke-width="5"/>
<path d="M278 108 L292 120 L278 128" fill="none" stroke="${C.rouge}" stroke-width="5"/>
<text x="300" y="76" font-size="12" font-weight="700" fill="${C.rouge}">le champ : ${ns} tr/min</text>

<path d="M200 106 A 58 58 0 0 1 246 132" fill="none" stroke="${C.orange}" stroke-width="5"/>
<path d="M238 126 L250 136 L238 144" fill="none" stroke="${C.orange}" stroke-width="5"/>
<text x="262" y="176" font-size="12" font-weight="700" fill="${C.orange}">le rotor : ${n} tr/min</text>

<rect x="420" y="72" width="240" height="180" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="540" y="100" text-anchor="middle" font-size="12" fill="${C.gris}">le glissement</text>
<text x="540" y="132" text-anchor="middle" font-size="26" font-weight="700" fill="${C.rouge}">${nb(g * 100, 1)} %</text>
<text x="540" y="164" text-anchor="middle" font-size="12" fill="${C.gris}">l’intensité absorbée</text>
<text x="540" y="196" text-anchor="middle" font-size="24" font-weight="700"
      fill="${I > 4.2 ? C.rouge : C.navy}">${nb(I, 2)} A</text>
<text x="540" y="228" text-anchor="middle" font-size="11" fill="${C.gris}">${I > 4.2 ? 'au-dessus de la plaque : le thermique va chauffer' : 'la plaque annonce 3,84 A'}</text>

<text x="350" y="288" text-anchor="middle" font-size="13" fill="${C.gris}">Sans glissement, le rotor ne verrait plus le champ varier — et il ne produirait aucun couple.</text>`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'gl', 'La charge sur l’arbre', 0, 140, 5, charge, v => v + ' %', v => { charge = v; peindre(); });
    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Chargez le moteur : il ralentit un peu, et il absorbe davantage. '
      + 'Passez au-dessus de 100 % : l’intensité dépasse la plaque, et c’est exactement ce que le relais thermique surveille.';
    hote.appendChild(p);
    return hote;
  }

  /* ============================================================ 6.5 — le monophasé */
  function pourquoiUnCondensateur() {
    const d = svg('0 0 700 320', 'Un seul enroulement donne un champ qui pulse mais ne tourne pas. Un second enroulement, décalé par un condensateur, met le champ en rotation.');
    const peindre = (avec) => {
      d.innerHTML = `
<rect x="8" y="8" width="684" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700"
      fill="${avec ? C.vert : C.rouge}">${avec ? 'Avec l’enroulement auxiliaire : ça tourne' : 'Avec un seul enroulement : ça vibre, ça ne démarre pas'}</text>

<circle cx="220" cy="168" r="80" fill="none" stroke="${C.trait}" stroke-width="12"/>
<circle cx="220" cy="168" r="15" fill="none" stroke="${C.navy}" stroke-width="4"/>

<circle cx="220" cy="88" r="16" fill="none" stroke="${C.orange}" stroke-width="7"/>
<circle cx="220" cy="248" r="16" fill="none" stroke="${C.orange}" stroke-width="7"/>
<text x="220" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="${C.orange}">enroulement principal</text>

${avec
  ? `<circle cx="140" cy="168" r="14" fill="none" stroke="${C.vert}" stroke-width="6"/>
     <circle cx="300" cy="168" r="14" fill="none" stroke="${C.vert}" stroke-width="6"/>
     <text x="220" y="290" text-anchor="middle" font-size="12" font-weight="700" fill="${C.vert}">enroulement auxiliaire, décalé de 90°</text>
     <path d="M270 118 A 70 70 0 0 1 270 218" fill="none" stroke="${C.rouge}" stroke-width="5"/>
     <path d="M262 210 L274 222 L282 210" fill="none" stroke="${C.rouge}" stroke-width="5"/>`
  : `<line x1="220" y1="120" x2="220" y2="216" stroke="${C.rouge}" stroke-width="6"/>
     <path d="M212 130 L220 118 L228 130" fill="none" stroke="${C.rouge}" stroke-width="5"/>
     <path d="M212 206 L220 218 L228 206" fill="none" stroke="${C.rouge}" stroke-width="5"/>
     <text x="220" y="290" text-anchor="middle" font-size="12" font-weight="700" fill="${C.rouge}">le champ va et vient sur un seul axe</text>`}

<rect x="400" y="80" width="260" height="170" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
${avec
  ? `<text x="530" y="112" text-anchor="middle" font-size="14" font-weight="700" fill="${C.vert}">Le condensateur décale</text>
     <text x="530" y="142" text-anchor="middle" font-size="12.5" fill="${C.gris}">Il retarde le courant de l’auxiliaire</text>
     <text x="530" y="162" text-anchor="middle" font-size="12.5" fill="${C.gris}">par rapport à celui du principal.</text>
     <text x="530" y="192" text-anchor="middle" font-size="12.5" fill="${C.gris}">Deux courants décalés, deux enroulements</text>
     <text x="530" y="212" text-anchor="middle" font-size="12.5" fill="${C.gris}">décalés : le champ se met à tourner.</text>
     <text x="530" y="238" text-anchor="middle" font-size="12.5" font-weight="700" fill="${C.navy}">Le moteur démarre seul.</text>`
  : `<text x="530" y="112" text-anchor="middle" font-size="14" font-weight="700" fill="${C.rouge}">Un axe, pas de sens</text>
     <text x="530" y="142" text-anchor="middle" font-size="12.5" fill="${C.gris}">Le champ grandit, s’annule, repart</text>
     <text x="530" y="162" text-anchor="middle" font-size="12.5" fill="${C.gris}">dans l’autre sens. Toujours sur le même axe.</text>
     <text x="530" y="192" text-anchor="middle" font-size="12.5" fill="${C.gris}">Rien ne dit au rotor de quel côté partir.</text>
     <text x="530" y="222" text-anchor="middle" font-size="12.5" font-weight="700" fill="${C.rouge}">Lancé à la main, il tourne — dans le sens</text>
     <text x="530" y="242" text-anchor="middle" font-size="12.5" font-weight="700" fill="${C.rouge}">où on l’a lancé. C’est le signe du défaut.</text>`}`;
    };
    peindre(false);
    return bloc(d, [
      { id: 'sans', libelle: 'Un seul enroulement', legende: 'Le champ pulse le long d’un axe : il grandit, s’annule, repart en sens inverse. Rien n’indique au rotor de quel côté partir. Le moteur ronfle et ne démarre pas.', appliquer: () => peindre(false) },
      { id: 'avec', libelle: 'Avec le condensateur', legende: 'Un second enroulement, alimenté à travers un condensateur qui décale son courant. Deux enroulements décalés dans l’espace, deux courants décalés dans le temps : le champ tourne, et le moteur démarre seul.', appliquer: () => peindre(true) }
    ], 'sans', 'Le champ pulse le long d’un axe : il grandit, s’annule, repart en sens inverse. Rien n’indique au rotor de quel côté partir. Le moteur ronfle et ne démarre pas.');
  }

  /* ============================================================ 6.6 — trois familles */
  function troisFamilles() {
    const d = svg('0 0 760 320', 'Trois moteurs, trois façons de faire tourner un rotor : asynchrone, synchrone, et à courant continu.');
    const cadre = (x, titre, sous, dessin, note) => `
<rect x="${x}" y="66" width="220" height="196" rx="10" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="${x + 110}" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">${titre}</text>
<text x="${x + 110}" y="114" text-anchor="middle" font-size="11.5" fill="${C.gris}">${sous}</text>
${dessin}
<text x="${x + 110}" y="242" text-anchor="middle" font-size="11.5" fill="${C.gris}">${note}</text>`;
    d.innerHTML = `
<rect x="8" y="8" width="744" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Trois façons de faire tourner un rotor</text>

${cadre(30, 'Asynchrone', 'il traîne derrière le champ',
  `<circle cx="140" cy="172" r="34" fill="none" stroke="${C.orange}" stroke-width="4"/>
   <text x="140" y="178" text-anchor="middle" font-size="13" font-weight="700" fill="${C.orange}">1435</text>
   <text x="140" y="220" text-anchor="middle" font-size="11" fill="${C.gris}">pour un champ à 1500</text>`,
  'robuste, pas cher — celui de l’atelier')}

${cadre(270, 'Synchrone', 'il est accroché au champ',
  `<circle cx="380" cy="172" r="34" fill="none" stroke="${C.vert}" stroke-width="4"/>
   <text x="380" y="178" text-anchor="middle" font-size="13" font-weight="700" fill="${C.vert}">1500</text>
   <text x="380" y="220" text-anchor="middle" font-size="11" fill="${C.gris}">exactement 1500</text>`,
  'vitesse exacte — mais il faut l’aider à démarrer')}

${cadre(510, 'Courant continu', 'il n’a pas de champ tournant',
  `<circle cx="620" cy="172" r="34" fill="none" stroke="${C.bleu}" stroke-width="4"/>
   <line x1="596" y1="150" x2="596" y2="194" stroke="${C.bleu}" stroke-width="4"/>
   <line x1="644" y1="150" x2="644" y2="194" stroke="${C.bleu}" stroke-width="4"/>
   <text x="620" y="220" text-anchor="middle" font-size="11" fill="${C.gris}">deux balais qui frottent</text>`,
  'vitesse réglable — mais les balais s’usent')}

<text x="380" y="292" text-anchor="middle" font-size="13" fill="${C.gris}">Le variateur de fréquence a donné à l’asynchrone la souplesse du continu, sans les balais. C’est ce qui l’a fait gagner.</text>`;
    return bloc(d, [], null,
      'Trois familles, trois compromis. Aucune n’est meilleure : chacune répond à un besoin différent.');
  }

  /* ============================================================ 7.1 / 7.2 — varier la tension */
  function baisserLaTension() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 320', 'On baisse la tension d’un moteur asynchrone : la vitesse bouge à peine, mais le couple s’effondre.');
    let U = 400;

    const peindre = () => {
      const k = U / 400;
      const couple = Math.round(k * k * 100);        /* le couple suit le CARRÉ de la tension */
      const vitesse = Math.round(1435 + (1 - k) * 40);
      const I = 3.84 / Math.max(0.35, k * k) * 0.62 + 1.4;
      d.innerHTML = `
<rect x="8" y="8" width="684" height="304" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700"
      fill="${couple < 55 ? C.rouge : C.navy}">${couple < 55 ? 'Le couple ne suffit plus : le moteur cale' : 'La vitesse tient à peine — le couple, lui, s’écroule'}</text>

<rect x="50" y="74" width="180" height="170" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="140" y="102" text-anchor="middle" font-size="12" fill="${C.gris}">la tension appliquée</text>
<text x="140" y="140" text-anchor="middle" font-size="26" font-weight="700" fill="${C.navy}">${U} V</text>
<text x="140" y="176" text-anchor="middle" font-size="12" fill="${C.gris}">soit ${nb(k * 100)} % du nominal</text>
<rect x="76" y="196" width="128" height="16" rx="8" fill="none" stroke="${C.navy}" stroke-width="2"/>
<rect x="78" y="198" width="${(124 * k).toFixed(0)}" height="12" rx="6" fill="${C.navy}"/>

<rect x="260" y="74" width="180" height="170" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="350" y="102" text-anchor="middle" font-size="12" fill="${C.gris}">le couple disponible</text>
<text x="350" y="140" text-anchor="middle" font-size="26" font-weight="700"
      fill="${couple < 55 ? C.rouge : C.orange}">${couple} %</text>
<text x="350" y="176" text-anchor="middle" font-size="12" fill="${C.gris}">il suit le CARRÉ de la tension</text>
<rect x="286" y="196" width="128" height="16" rx="8" fill="none" stroke="${C.orange}" stroke-width="2"/>
<rect x="288" y="198" width="${(124 * k * k).toFixed(0)}" height="12" rx="6" fill="${couple < 55 ? C.rouge : C.orange}"/>

<rect x="470" y="74" width="180" height="170" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="560" y="102" text-anchor="middle" font-size="12" fill="${C.gris}">la vitesse</text>
<text x="560" y="140" text-anchor="middle" font-size="26" font-weight="700" fill="${C.gris}">${vitesse}</text>
<text x="560" y="164" text-anchor="middle" font-size="12" fill="${C.gris}">tr/min</text>
<text x="560" y="196" text-anchor="middle" font-size="12" fill="${C.gris}">elle bouge à peine</text>
<text x="560" y="218" text-anchor="middle" font-size="12" font-weight="700" fill="${C.navy}">et l’intensité monte : ${nb(I, 1)} A</text>

<text x="350" y="290" text-anchor="middle" font-size="13" fill="${C.gris}">Baisser la tension d’un moteur asynchrone ne le ralentit presque pas. Ça l’affaiblit, et ça le fait chauffer.</text>`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'bt', 'La tension appliquée', 160, 400, 5, U, v => v + ' V', v => { U = v; peindre(); });
    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Descendez à 280 volts : le couple est tombé à la moitié, et la vitesse n’a presque pas bougé. '
      + 'C’est pour cela qu’on ne règle pas la vitesse d’un moteur asynchrone en jouant sur la tension.';
    hote.appendChild(p);
    return hote;
  }

  function ondeDecoupee() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 300', 'Un gradateur ne fait pas varier la hauteur de la sinusoïde : il en supprime un morceau à chaque alternance.');
    let angle = 0;

    const peindre = () => {
      const seuil = angle / 180;
      const pts = [];
      for (let i = 0; i <= 560; i += 2) {
        const p = (i / 560) * 4;                       /* deux périodes */
        const frac = p % 1;
        const y = frac < seuil ? 170 : 170 - 74 * Math.sin(p * Math.PI) * (p % 2 < 1 ? 1 : -1);
        pts.push((100 + i) + ',' + Math.min(244, Math.max(96, y)).toFixed(1));
      }
      const eff = Math.round(230 * Math.sqrt(Math.max(0, 1 - seuil)));
      d.innerHTML = `
<rect x="8" y="8" width="684" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="38" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Le gradateur découpe, il n’abaisse pas</text>

<line x1="100" y1="170" x2="660" y2="170" stroke="${C.navy}" stroke-width="2"/>
<polyline points="${pts.join(' ')}" fill="none" stroke="${C.orange}" stroke-width="3"/>

<text x="380" y="272" text-anchor="middle" font-size="13" fill="${C.gris}">La hauteur ne change jamais : c’est la durée pendant laquelle on laisse passer qui change.</text>
<text x="112" y="120" font-size="13" font-weight="700" fill="${C.navy}">valeur efficace : ${eff} V</text>`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'gr', 'L’angle de retard', 0, 160, 5, angle, v => v + '°', v => { angle = v; peindre(); });
    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'On laisse passer la fin de chaque alternance, et on coupe le début. La valeur efficace baisse — '
      + 'mais l’onde n’est plus une sinusoïde, et beaucoup d’appareils n’aiment pas ça du tout.';
    hote.appendChild(p);
    return hote;
  }

  /* ============================================================ 7.3 / 7.4 — U sur f
     La loi qui fait tout le métier du variateur de fréquence. */
  function loiUsurF() {
    const hote = document.createElement('div');
    const d = svg('0 0 700 356', 'La loi U sur f : pour garder le couple quand on baisse la fréquence, il faut baisser la tension dans le même rapport.');
    let f = 50, suivre = true;

    const peindre = () => {
      const U = suivre ? Math.round(400 * f / 50) : 400;
      const ratio = U / f;
      const bon = Math.abs(ratio - 8) < 0.6;
      const n = Math.round(f * 30 - 65);
      /* Quand U/f dérive vers le haut, le couple ne s'effondre pas : c'est le
         courant magnétisant qui s'envole, sans rien donner de plus. C'est bien
         cela qui détruit le moteur — pas une perte de force. */
      const couple = 100;
      const magnetisant = Math.round(100 * Math.pow(ratio / 8, 2.2));
      d.innerHTML = `
<rect x="8" y="8" width="684" height="340" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700"
      fill="${bon ? C.vert : C.rouge}">${bon ? 'Le rapport est tenu — le couple est intact' : 'Le rapport a dérivé — le moteur sature et chauffe'}</text>

<rect x="46" y="74" width="180" height="130" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="136" y="102" text-anchor="middle" font-size="12" fill="${C.gris}">la fréquence</text>
<text x="136" y="140" text-anchor="middle" font-size="26" font-weight="700" fill="${C.orange}">${f} Hz</text>
<text x="136" y="176" text-anchor="middle" font-size="13" fill="${C.gris}">le moteur tourne à ${n} tr/min</text>

<text x="256" y="140" text-anchor="middle" font-size="22" font-weight="700" fill="${C.navy}">et</text>

<rect x="286" y="74" width="180" height="130" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="376" y="102" text-anchor="middle" font-size="12" fill="${C.gris}">la tension</text>
<text x="376" y="140" text-anchor="middle" font-size="26" font-weight="700"
      fill="${suivre ? C.navy : C.rouge}">${U} V</text>
<text x="376" y="176" text-anchor="middle" font-size="13" fill="${C.gris}">${suivre ? 'elle suit la fréquence' : 'elle reste au maximum'}</text>

<rect x="496" y="74" width="164" height="130" rx="10" fill="${C.creme}" stroke="${C.trait}"/>
<text x="578" y="102" text-anchor="middle" font-size="12" fill="${C.gris}">le rapport U / f</text>
<text x="578" y="140" text-anchor="middle" font-size="26" font-weight="700"
      fill="${bon ? C.vert : C.rouge}">${nb(ratio, 1)}</text>
<text x="578" y="176" text-anchor="middle" font-size="13" fill="${bon ? C.vert : C.rouge}">${bon ? 'constant' : 'il a dérivé'}</text>

<rect x="46" y="222" width="614" height="80" rx="10" fill="none" stroke="${C.trait}" stroke-width="2"/>
<text x="76" y="246" font-size="13" fill="${C.gris}">le couple disponible</text>
<rect x="300" y="234" width="300" height="16" rx="8" fill="none" stroke="${C.navy}" stroke-width="2"/>
<rect x="302" y="236" width="296" height="12" rx="6" fill="${C.vert}"/>
<text x="620" y="247" font-size="14" font-weight="700" fill="${C.vert}">${couple} %</text>
<text x="76" y="274" font-size="13" fill="${C.gris}">le courant magnétisant</text>
<rect x="300" y="262" width="300" height="16" rx="8" fill="none" stroke="${C.navy}" stroke-width="2"/>
<rect x="302" y="264" width="${Math.min(296, 296 * magnetisant / 400).toFixed(0)}" height="12" rx="6"
      fill="${magnetisant > 140 ? C.rouge : C.navy}"/>
<text x="620" y="275" font-size="14" font-weight="700"
      fill="${magnetisant > 140 ? C.rouge : C.navy}">${Math.min(999, magnetisant)} %</text>
<text x="76" y="296" font-size="12" fill="${C.gris}">${suivre
  ? 'Le moteur garde toute sa force, et il n’appelle rien de plus qu’au nominal.'
  : 'Le couple ne gagne rien. C’est le courant magnétisant qui s’envole — et il ne fait que chauffer le fer.'}</text>

<text x="350" y="338" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">Faire varier la fréquence sans faire varier la tension ne marche pas. Les deux vont ensemble.</text>`;
    };
    peindre();
    hote.appendChild(d);
    reglette(hote, 'uf', 'La fréquence de sortie', 10, 50, 1, f, v => v + ' Hz', v => { f = v; peindre(); });

    const barre = document.createElement('div');
    barre.className = 'choix'; barre.style.marginTop = '.5rem';
    [[true, 'La tension suit la fréquence'], [false, 'La tension reste à 400 V']].forEach(([s, lib]) => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = lib;
      b.setAttribute('aria-pressed', String(s === suivre));
      b.addEventListener('click', () => {
        suivre = s;
        barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        peindre();
      });
      barre.appendChild(b);
    });
    hote.appendChild(barre);

    const p = document.createElement('p');
    p.className = 'legende';
    p.textContent = 'Descendez à 25 hertz avec la tension qui suit : 200 volts, rapport tenu, couple intact. '
      + 'Refaites-le avec la tension bloquée à 400 : le rapport double, et le moteur sature.';
    hote.appendChild(p);
    return hote;
  }

  function troisEtagesDuVariateur() {
    const d = svg('0 0 760 300', 'Un variateur de fréquence en trois étages : il redresse, il lisse, puis il refabrique une alternative à la fréquence voulue.');
    d.innerHTML = `
<rect x="8" y="8" width="744" height="284" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="380" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="${C.navy}">Il ne transforme pas : il défait, puis il refait</text>

<text x="60" y="120" text-anchor="end" font-size="13" font-weight="700" fill="${C.orange}">50 Hz</text>
<path d="M70 140 Q84 108 98 140 Q112 172 126 140" fill="none" stroke="${C.orange}" stroke-width="3"/>

${[[150, 'Le redresseur', 'il fait passer tout du même côté'],
   [340, 'Le bus continu', 'un condensateur lisse ce qui reste'],
   [530, 'L’onduleur', 'il redécoupe à la fréquence voulue']]
  .map(([x, t, s]) => `
<rect x="${x}" y="86" width="160" height="108" rx="8" fill="none" stroke="${C.navy}" stroke-width="3"/>
<text x="${x + 80}" y="120" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">${t}</text>
<text x="${x + 80}" y="148" text-anchor="middle" font-size="11.5" fill="${C.gris}">${s.split(' ').slice(0, 4).join(' ')}</text>
<text x="${x + 80}" y="166" text-anchor="middle" font-size="11.5" fill="${C.gris}">${s.split(' ').slice(4).join(' ')}</text>`).join('')}

<path d="M312 140 L336 140" stroke="${C.navy}" stroke-width="3"/>
<path d="M328 134 L338 140 L328 146" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M502 140 L526 140" stroke="${C.navy}" stroke-width="3"/>
<path d="M518 134 L528 140 L518 146" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M128 140 L146 140" stroke="${C.navy}" stroke-width="3"/>

<text x="700" y="120" text-anchor="middle" font-size="13" font-weight="700" fill="${C.vert}">0 à 400 Hz</text>
<path d="M662 152 L672 132 L682 152 L692 132 L702 152 L712 132 L722 152" fill="none" stroke="${C.vert}" stroke-width="3"/>

<text x="380" y="230" text-anchor="middle" font-size="13" fill="${C.gris}">Entre les deux, l’énergie passe par du continu. C’est pour cela qu’un variateur ne peut pas être un simple transformateur.</text>
<text x="380" y="258" text-anchor="middle" font-size="13" font-weight="700" fill="${C.rouge}">Le condensateur du bus reste chargé après la coupure. On attend le temps indiqué avant d’ouvrir.</text>
<text x="380" y="282" text-anchor="middle" font-size="12" fill="${C.gris}">Cinq minutes, souvent. C’est écrit sur l’appareil, et ce n’est pas une précaution de principe.</text>`;
    return bloc(d, [], null,
      'Trois étages, et une seule chose à retenir pour la sécurité : le bus continu garde sa charge longtemps après la coupure.');
  }

  /* ============================================================ le tableau des machines */
  const MACHINES = [
    ['6.1', 'La bobine, l’électro-aimant', true, false, false, 'Elle attire. Elle fonctionne aussi en continu.'],
    ['6.2', 'Le transformateur', false, true, true, 'Rien ne bouge, et il lui faut absolument l’alternatif.'],
    ['6.3', 'Le moteur asynchrone triphasé', true, false, true, 'Le moteur de l’atelier. Il démarre seul.'],
    ['6.4', 'Le couplage de la plaque à bornes', false, false, false, 'Ce n’est pas une machine : c’est un geste.'],
    ['6.5', 'Le moteur monophasé', true, false, true, 'Il lui faut un condensateur pour partir.'],
    ['6.6', 'Le moteur à courant continu', true, false, false, 'Le seul qui se moque de l’alternatif.'],
    ['7.2', 'Le variateur de tension', false, true, true, 'Il découpe l’onde. Il ne règle pas vraiment la vitesse.'],
    ['7.4', 'Le variateur de fréquence', false, true, true, 'Il refabrique tout. C’est lui qui règle la vitesse.']
  ];

  function tableauMachines(idCourant) {
    const t = document.createElement('table');
    t.className = 'tab';
    t.innerHTML = '<thead><tr><th>La machine</th><th>Produit du mouvement</th><th>Change la tension</th><th>Exige de l’alternatif</th></tr></thead><tbody>' +
      MACHINES.map(([id, nom, m, u, a, note]) => {
        const ici = id === idCourant;
        const c = v => v ? '<td><strong>oui</strong></td>' : '<td>non</td>';
        return '<tr' + (ici ? ' class="ici"' : '') + '><td><strong>' + id + '</strong> ' + nom +
               '<br><span class="legende">' + note + '</span></td>' + c(m) + c(u) + c(a) + '</tr>';
      }).join('') + '</tbody>';
    return t;
  }

  return { COLONNES, pictoTrois, electroAimant, rapportDeTransformation,
           rotorEtGlissement, pourquoiUnCondensateur, troisFamilles,
           baisserLaTension, ondeDecoupee, loiUsurF, troisEtagesDuVariateur,
           tableauMachines };
})();

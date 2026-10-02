/* CartoClim 3.8 — scènes du groupe d'eau glacée et des ventilo-convecteurs.
   Temps 2 : l'eau qui fait le tour du bâtiment, en six pas (le groupe refroidit l'eau, la pompe l'envoie,
   elle traverse la batterie, l'air passe dessus, elle revient, le groupe rejette la chaleur dehors),
   puis deux tubes / quatre tubes en deux états. Temps 5 : ce qu'on raccorde sur un ventilo-convecteur.
   Croix du frigoriste (charte R6) dans le groupe : détendeur à gauche, compresseur à droite,
   condenseur en haut, évaporateur en bas. Aucun texte sur un tracé : chaque étiquette a sa place libre,
   vérifiée par outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas, etats } = SceneKit;

  /* petite flèche pleine (polygone) posée sur un tuyau pour dire le sens de l'eau */
  const tri = (x, y, sens, c = C.navy) => {
    const p = { h: [[x, y - 7], [x + 7, y + 6], [x - 7, y + 6]], b: [[x, y + 7], [x + 7, y - 6], [x - 7, y - 6]],
                r: [[x + 7, y], [x - 6, y - 7], [x - 6, y + 7]], g: [[x - 7, y], [x + 6, y - 7], [x + 6, y + 7]] }[sens];
    return `<polygon points="${p.map(q => q.join(',')).join(' ')}" fill="${c}"/>`;
  };
  /* sens : 'h' haut, 'b' bas, 'r' droite, 'g' gauche */

  /* ------------------------------------------------------------------ temps 2, premier dessin */
  function circuit() {
    const d = svg('0 0 900 540',
      'Un groupe d’eau glacée à gauche, avec son propre circuit frigorifique ; une pompe, un tuyau de départ et un tuyau de retour ; trois pièces à droite, chacune avec un ventilo-convecteur : une batterie traversée par l’eau, un filtre, un ventilateur et un bac.');
    let e = 0;
    const L = (...k) => k.includes(e);                 /* la pièce qui agit s'allume */
    const dep = C.froid, ret = C.doux, bp = C.froid, hp = C.chaud;
    const W = (...k) => L(...k) ? 9 : 5;               /* épaisseur d'un tuyau d'eau */
    const Wr = (...k) => L(...k) ? 7 : 4;              /* épaisseur d'un tuyau de fluide */
    const RY = [34, 184, 334];                         /* le haut de chaque pièce */

    const piece = (i, ry) => {
      const nom = i === 0;
      return `
<rect x="470" y="${ry}" width="380" height="144" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="480" y="${ry + 30}" font-size="13" font-weight="700" fill="${C.navy}">ventilo-convecteur</text>
<text x="482" y="${ry + 118}" font-size="13" fill="${C.gris}">Pièce ${i + 1}</text>
<rect x="590" y="${ry + 38}" width="225" height="64" rx="6" fill="${C.papier}" stroke="${L(3) ? C.navy : C.gris}" stroke-width="3"/>

<!-- l'eau : départ par le haut, retour par le bas -->
<path d="M440 ${ry + 12} H628 V${ry + 50}" fill="none" stroke="${dep}" stroke-width="${W(1)}" stroke-linejoin="round"/>
<path d="M628 ${ry + 50} H698 c16 0 16 16 0 16 H628 c-16 0 -16 16 0 16 H698" fill="none" stroke="${dep}" stroke-width="${L(2) ? 7 : 4}" stroke-linejoin="round"/>
<g stroke="${C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5].map(k => `<line x1="${638 + k * 10}" y1="${ry + 44}" x2="${638 + k * 10}" y2="${ry + 88}"/>`).join('')}</g>
<path d="M698 ${ry + 82} H718 V${ry + 130} H872" fill="none" stroke="${ret}" stroke-width="${W(4)}" stroke-linejoin="round"/>

<!-- l'air : le filtre, la batterie, la turbine -->
<line x1="608" y1="${ry + 44}" x2="608" y2="${ry + 96}" stroke="${L(3) ? C.navy : C.gris}" stroke-width="${L(3) ? 4 : 3}" stroke-dasharray="5 4"/>
<circle cx="765" cy="${ry + 70}" r="26" fill="none" stroke="${L(3) ? C.navy : C.gris}" stroke-width="3"/>
<path d="M765 ${ry + 46} v48 M741 ${ry + 70} h48" stroke="${L(3) ? C.navy : C.gris}" stroke-width="3"/>
<path d="M626 ${ry + 90} v8 h80 v-8" fill="none" stroke="${C.eau}" stroke-width="${L(3) ? 5 : 3}"/>
${L(3) ? `<path d="M494 ${ry + 72} H582" stroke="${C.navy}" stroke-width="4" marker-end="url(#fl-air)"/>
<path d="M765 ${ry + 36} V${ry + 12}" stroke="${C.froid}" stroke-width="4" marker-end="url(#fl-bp)"/>
${[640, 662, 684].map(x => `<polygon points="${x},${ry + 86} ${x + 3.5},${ry + 91} ${x - 3.5},${ry + 91}" fill="${C.eau}"/>`).join('')}` : ''}
${nom ? `
<text x="640" y="${ry + 30}" font-size="13" font-weight="700" fill="${L(2) ? C.froid : C.navy}">batterie</text>
<text x="608" y="${ry + 118}" text-anchor="middle" font-size="13" font-weight="${L(3) ? 700 : 400}" fill="${L(3) ? C.navy : C.gris}">filtre</text>
<text x="665" y="${ry + 118}" text-anchor="middle" font-size="13" font-weight="${L(3) ? 700 : 400}" fill="${L(3) ? C.eau : C.gris}">bac</text>
<text x="765" y="${ry + 118}" text-anchor="middle" font-size="13" font-weight="${L(3) ? 700 : 400}" fill="${L(3) ? C.navy : C.gris}">turbine</text>
${L(3) ? `<text x="480" y="${ry + 62}" font-size="13" font-weight="700" fill="${C.navy}">air de la pièce</text>
<text x="778" y="${ry + 26}" font-size="13" font-weight="700" fill="${C.froid}">air frais</text>` : ''}` : ''}
${L(1) ? tri(540, ry + 12, 'r') : ''}${L(2) ? tri(663, ry + 50, 'r') + tri(663, ry + 66, 'g') + tri(663, ry + 82, 'r') : ''}${L(4) ? tri(800, ry + 130, 'r') : ''}`;
    };

    const peindre = () => {
      d.innerHTML = `
<defs>
  <marker id="fl-bp" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.froid}"/></marker>
  <marker id="fl-hp" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.chaud}"/></marker>
  <marker id="fl-air" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.navy}"/></marker>
</defs>
<rect x="10" y="10" width="880" height="520" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- ============ le groupe d'eau glacée : son propre circuit frigorifique ============ -->
<rect x="20" y="30" width="345" height="370" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="34" y="53" font-size="15" font-weight="700" fill="${C.navy}">GROUPE D’EAU GLACÉE</text>

<!-- condenseur, en haut : serpentin, ailettes, hélice -->
<path d="M210 121 H80 c-16 0 -16 -18 0 -18 H210 c16 0 16 -18 0 -18 H80" fill="none" stroke="${hp}" stroke-width="${Wr(5)}" stroke-linejoin="round"/>
<g stroke="${C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<line x1="${95 + k * 14}" y1="79" x2="${95 + k * 14}" y2="127"/>`).join('')}</g>
<text x="145" y="148" text-anchor="middle" font-size="15" font-weight="700" fill="${L(5) ? hp : C.navy}">condenseur</text>
<circle cx="265" cy="103" r="26" fill="none" stroke="${L(5) ? C.navy : C.gris}" stroke-width="3"/>
<path d="M265 79 v48 M241 103 h48" stroke="${L(5) ? C.navy : C.gris}" stroke-width="3"/>
<text x="265" y="148" text-anchor="middle" font-size="14" fill="${L(5) ? C.navy : C.gris}">hélice</text>
${L(5) ? `<path d="M303 90 H350 M303 103 H350 M303 116 H350" stroke="${hp}" stroke-width="4" marker-end="url(#fl-hp)"/>
<text x="322" y="142" text-anchor="middle" font-size="14" font-weight="700" fill="${hp}">air chaud</text>` : ''}

<!-- compresseur, à droite ; haute pression en rouge jusqu'au condenseur -->
<path d="M300 215 V165 H225 V121 H210" fill="none" stroke="${hp}" stroke-width="${Wr(5)}" stroke-linejoin="round"/>
<rect x="248" y="215" width="104" height="50" rx="10" fill="${C.papier}" stroke="${hp}" stroke-width="${L(5) ? 6 : 4}"/>
<text x="300" y="246" text-anchor="middle" font-size="14" font-weight="700" fill="${L(5) ? hp : C.navy}">compresseur</text>

<!-- liquide sous haute pression à gauche, détendeur, puis liquide basse pression vers l'évaporateur -->
<path d="M80 85 H60 V207" fill="none" stroke="${hp}" stroke-width="${Wr(5)}" stroke-linejoin="round"/>
<path d="M60 263 V353 H120" fill="none" stroke="${bp}" stroke-width="${Wr(5)}" stroke-linejoin="round"/>
<path d="M44 207 h32 l-16 28 z M44 263 h32 l-16 -28 z" fill="${C.papier}" stroke="${L(5) ? bp : C.navy}" stroke-width="${L(5) ? 5 : 3}" stroke-linejoin="round"/>
<text x="86" y="241" font-size="15" font-weight="700" fill="${L(5) ? bp : C.navy}">détendeur</text>

<!-- évaporateur à plaques, en bas : le fluide d'un côté, l'eau de l'autre -->
<rect x="120" y="322" width="150" height="62" rx="6" fill="${C.papier}" stroke="${bp}" stroke-width="${L(0) ? 7 : 4}"/>
<g stroke="${L(0) ? bp : C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => `<line x1="${135 + k * 15}" y1="328" x2="${135 + k * 15}" y2="378"/>`).join('')}</g>
<text x="195" y="313" text-anchor="middle" font-size="14" font-weight="700" fill="${L(0) ? bp : C.navy}">évaporateur à plaques</text>
<path d="M270 353 H300 V265" fill="none" stroke="${bp}" stroke-width="${Wr(0)}" stroke-linejoin="round"/>

<!-- ============ le réseau d'eau ============ -->
<!-- départ : de l'évaporateur à la pompe, puis la colonne et les trois départs de pièce -->
<path d="M240 384 V440 H387" fill="none" stroke="${dep}" stroke-width="${W(0, 1)}" stroke-linejoin="round"/>
<path d="M419 440 H440 V46" fill="none" stroke="${dep}" stroke-width="${W(1)}" stroke-linejoin="round"/>
<circle cx="403" cy="440" r="16" fill="${C.papier}" stroke="${L(1) ? C.froid : C.navy}" stroke-width="${L(1) ? 5 : 3}"/>
<polygon points="397,431 397,449 412,440" fill="${L(1) ? C.froid : C.navy}"/>
<circle cx="440" cy="196" r="5" fill="${dep}"/><circle cx="440" cy="346" r="5" fill="${dep}"/>
<!-- retour : des pièces au groupe -->
<path d="M872 164 V490 H150 V384" fill="none" stroke="${ret}" stroke-width="${W(4)}" stroke-linejoin="round"/>
<circle cx="872" cy="314" r="5" fill="${ret}"/><circle cx="872" cy="464" r="5" fill="${ret}"/>
${L(0) ? `<path d="M150 470 V384" fill="none" stroke="${ret}" stroke-width="9"/>${tri(150, 425, 'h')}${tri(240, 412, 'b')}` : ''}
${L(1) ? tri(330, 440, 'r') + tri(440, 395, 'h') + tri(440, 270, 'h') + tri(440, 120, 'h') : ''}
${L(4) ? tri(872, 240, 'b') + tri(872, 390, 'b') + tri(560, 490, 'g') + tri(300, 490, 'g') + tri(150, 440, 'h') : ''}

${L(0) ? `<text x="140" y="421" text-anchor="end" font-size="14" font-weight="700" fill="${C.navy}">eau tiède</text>
<text x="252" y="421" font-size="14" font-weight="700" fill="${C.froid}">eau froide</text>` : ''}
<text x="300" y="461" text-anchor="middle" font-size="14" font-weight="${L(1) ? 700 : 400}" fill="${L(1) ? C.froid : C.gris}">${L(1) ? 'départ : eau froide' : 'départ'}</text>
<text x="403" y="478" text-anchor="middle" font-size="14" font-weight="${L(1) ? 700 : 400}" fill="${L(1) ? C.froid : C.gris}">pompe</text>
<text x="660" y="510" text-anchor="middle" font-size="14" font-weight="${L(4) ? 700 : 400}" fill="${L(4) ? C.navy : C.gris}">${L(4) ? 'retour : eau plus tiède' : 'retour'}</text>

<!-- ============ les trois pièces ============ -->
${RY.map((ry, i) => piece(i, ry)).join('')}`;
    };

    const etapes = [
      { titre: 'Le groupe refroidit l’eau',
        dire: 'Dans l’évaporateur du groupe, le fluide frigorigène bout : il prend la chaleur de l’eau qui le traverse. L’eau sort froide ; le fluide, devenu gaz, repart vers le compresseur.',
        peindre: () => { e = 0; peindre(); } },
      { titre: 'La pompe l’envoie dans le bâtiment',
        dire: 'La pompe pousse l’eau froide dans le tuyau de départ, vers toutes les pièces à la fois. Dans les étages, il n’y a que de l’eau : le fluide frigorigène ne quitte pas le groupe.',
        peindre: () => { e = 1; peindre(); } },
      { titre: 'L’eau traverse la batterie',
        dire: 'Dans chaque pièce, l’eau entre dans la batterie du ventilo-convecteur : des tubes de cuivre couverts d’ailettes. Les trois ventilo-convecteurs sont alimentés en parallèle.',
        peindre: () => { e = 2; peindre(); } },
      { titre: 'L’air de la pièce passe dessus',
        dire: 'La turbine aspire l’air de la pièce à travers le filtre et le pousse sur la batterie froide. L’air ressort plus frais. Il laisse aussi son humidité, qui goutte dans le bac.',
        peindre: () => { e = 3; peindre(); } },
      { titre: 'L’eau réchauffée revient',
        dire: 'L’eau, qui a pris la chaleur de la pièce, est plus tiède. Elle repart par le tuyau de retour, jusqu’au groupe.',
        peindre: () => { e = 4; peindre(); } },
      { titre: 'Le groupe rejette la chaleur dehors',
        dire: 'Dans le groupe, le compresseur comprime le gaz, et le condenseur, balayé par l’air extérieur, rend la chaleur dehors. Le détendeur ramène le liquide à basse pression : le cycle recommence, et l’eau retournera se faire refroidir.',
        peindre: () => { e = 5; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Mode froid, réseau deux tubes. Trait bleu : départ d’eau froide ; trait bleu clair : retour. Rouge : le fluide frigorigène chaud, qui reste dans le groupe.');
  }

  /* ------------------------------------------------------------------ temps 2, deuxième dessin : deux tubes / quatre tubes */
  function reseaux() {
    const d = svg('0 0 900 300',
      'Deux réseaux possibles : en deux tubes, un seul départ et un seul retour relient la production au ventilo-convecteur ; en quatre tubes, un départ et un retour pour le froid, et un départ et un retour pour le chaud.');
    const boite = (x, y, w, h, t, sous) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="${x + w / 2}" y="${y + h / 2 - (sous.length ? (sous.length * 11) : 0) + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">${t}</text>
${sous.map((s, k) => `<text x="${x + w / 2}" y="${y + h / 2 - sous.length * 11 + 29 + k * 20}" text-anchor="middle" font-size="13" fill="${C.gris}">${s}</text>`).join('')}`;
    const tuyau = (y, couleur, w = 6) => `<line x1="240" y1="${y}" x2="640" y2="${y}" stroke="${couleur}" stroke-width="${w}"/>`;

    const peindre = quatre => {
      d.setAttribute('viewBox', quatre ? '0 0 900 300' : '0 0 900 200');
      d.innerHTML = quatre ? `
<rect x="10" y="10" width="880" height="280" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${boite(30, 25, 210, 100, 'Groupe d’eau glacée', ['le froid'])}
${boite(30, 175, 210, 100, 'Chaudière ou PAC', ['le chaud'])}
${boite(640, 25, 230, 250, 'Ventilo-convecteur', ['raccordé aux deux réseaux', 'souvent deux batteries'])}
${tuyau(55, C.froid)}${tuyau(95, C.doux)}${tuyau(205, C.chaud)}${tuyau(245, C.feu)}
${tri(330, 55, 'r')}${tri(550, 95, 'g')}${tri(330, 205, 'r')}${tri(550, 245, 'g')}
<text x="440" y="43" text-anchor="middle" font-size="14" font-weight="700" fill="${C.froid}">départ froid</text>
<text x="440" y="116" text-anchor="middle" font-size="14" fill="${C.navy}">retour froid</text>
<text x="440" y="164" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">quatre tubes</text>
<text x="440" y="193" text-anchor="middle" font-size="14" font-weight="700" fill="${C.chaud}">départ chaud</text>
<text x="440" y="266" text-anchor="middle" font-size="14" fill="${C.navy}">retour chaud</text>`
      : `
<rect x="10" y="10" width="880" height="180" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
${boite(30, 30, 210, 140, 'Production', ['du froid l’été,', 'du chaud l’hiver'])}
${boite(640, 30, 230, 140, 'Ventilo-convecteur', ['une seule batterie'])}
${tuyau(75, C.froid)}<line x1="240" y1="75" x2="640" y2="75" stroke="${C.chaud}" stroke-width="6" stroke-dasharray="18 18"/>
${tuyau(125, C.doux)}<line x1="240" y1="125" x2="640" y2="125" stroke="${C.feu}" stroke-width="6" stroke-dasharray="18 18"/>
${tri(330, 75, 'r')}${tri(550, 125, 'g')}
<text x="440" y="62" text-anchor="middle" font-size="14" font-weight="700" fill="${C.navy}">départ</text>
<text x="440" y="106" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">deux tubes</text>
<text x="440" y="150" text-anchor="middle" font-size="14" fill="${C.navy}">retour</text>`;
    };
    peindre(false);

    return etats(d, [
      { id: 'deux', libelle: 'Deux tubes', appliquer: () => peindre(false),
        legende: 'Deux tubes : un seul réseau, un départ et un retour. Il porte de l’eau froide l’été et de l’eau chaude l’hiver. Toutes les pièces reçoivent la même chose, en même temps.' },
      { id: 'quatre', libelle: 'Quatre tubes', appliquer: () => peindre(true),
        legende: 'Quatre tubes : deux réseaux côte à côte, un froid et un chaud. Chaque pièce choisit : la pièce au soleil refroidit pendant que sa voisine, à l’ombre, chauffe.' }
    ], 'deux', 'Deux tubes : un seul réseau, un départ et un retour. Il porte de l’eau froide l’été et de l’eau chaude l’hiver. Toutes les pièces reçoivent la même chose, en même temps.');
  }

  /* La scène du temps 2 : le trajet de l'eau, puis les deux sortes de réseau. */
  function trajetDeLEau() {
    const hote = document.createElement('div');
    hote.appendChild(circuit());
    const t = document.createElement('p');
    t.className = 'legende';
    t.style.cssText = 'font-weight:700;color:' + C.navy + ';margin-top:1.1rem';
    t.textContent = 'Deux tubes ou quatre tubes ?';
    hote.append(t, reseaux());
    return hote;
  }

  /* ------------------------------------------------------------------ temps 5 : ce qu'on raccorde sur un ventilo-convecteur */
  function recapitulatif() {
    const d = svg('0 0 900 350',
      'Récapitulatif : le réseau d’eau glacée arrive au ventilo-convecteur par un tuyau de départ et un tuyau de retour, isolés ; le bac évacue ses condensats par un tuyau en pente ; une alimentation électrique commande le ventilateur.');
    d.innerHTML = `
<defs><marker id="fl-rc" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto"><path d="M0 0 L14 7 L0 14 z" fill="${C.eau}"/></marker></defs>
<rect x="10" y="10" width="880" height="330" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<rect x="30" y="70" width="170" height="110" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="115" y="118" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Réseau d’eau</text>
<text x="115" y="142" text-anchor="middle" font-size="13" fill="${C.gris}">glacée, venu du groupe</text>

<rect x="330" y="60" width="250" height="140" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="455" y="100" text-anchor="middle" font-size="16" font-weight="700" fill="${C.navy}">Ventilo-convecteur</text>
<text x="455" y="128" text-anchor="middle" font-size="13" fill="${C.gris}">batterie · turbine</text>
<text x="455" y="148" text-anchor="middle" font-size="13" fill="${C.gris}">filtre · bac</text>
<text x="455" y="168" text-anchor="middle" font-size="13" fill="${C.gris}">thermostat · trois vitesses</text>

<line x1="200" y1="95" x2="330" y2="95" stroke="${C.froid}" stroke-width="6"/>
<line x1="200" y1="150" x2="330" y2="150" stroke="${C.doux}" stroke-width="6"/>
${tri(265, 95, 'r')}${tri(265, 150, 'g')}
<text x="265" y="82" text-anchor="middle" font-size="13" font-weight="700" fill="${C.froid}">départ</text>
<text x="265" y="176" text-anchor="middle" font-size="13" font-weight="700" fill="${C.navy}">retour</text>
<text x="265" y="198" text-anchor="middle" font-size="13" fill="${C.gris}">isolés, sans trou</text>

<path d="M455 200 V250 H700" fill="none" stroke="${C.eau}" stroke-width="4" marker-end="url(#fl-rc)"/>
<text x="578" y="276" text-anchor="middle" font-size="13" font-weight="700" fill="${C.eau}">condensats, en pente, jusqu’à l’évacuation</text>

<line x1="580" y1="130" x2="650" y2="130" stroke="${C.navy}" stroke-width="3" stroke-dasharray="6 5"/>
<rect x="650" y="60" width="220" height="140" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="760" y="108" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">Alimentation</text>
<text x="760" y="132" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">électrique</text>
<text x="760" y="160" text-anchor="middle" font-size="13" fill="${C.gris}">ventilateur et commande</text>

<text x="450" y="306" text-anchor="middle" font-size="14" fill="${C.gris}">Aucun fluide frigorigène à raccorder ici : le circuit du groupe est fermé.</text>
<text x="450" y="328" text-anchor="middle" font-size="14" fill="${C.gris}">L’air du circuit d’eau se purge aux points hauts.</text>`;
    return d;
  }

  return { trajetDeLEau, recapitulatif };
})();

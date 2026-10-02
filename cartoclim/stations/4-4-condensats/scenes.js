/* CartoClim 4.4 — scènes des condensats. Temps 2 : le chemin de l'eau, en six pas
   (formation, pente bonne, contre-pente, siphon, pompe, flotteur). Coupe schématique :
   la pièce à gauche avec l'unité intérieure et son bac, le mur au milieu, dehors à droite.
   Temps 5 : une situation, sa réponse.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* une goutte : pointe en (x, y), hauteur ≈ 25·s */
  const goutte = (x, y, s, fill) =>
    `<path d="M${x} ${y} C${x - 3 * s} ${y + 8 * s} ${x - 8 * s} ${y + 12 * s} ${x - 8 * s} ${y + 17 * s} A${8 * s} ${8 * s} 0 0 0 ${x + 8 * s} ${y + 17 * s} C${x + 8 * s} ${y + 12 * s} ${x + 3 * s} ${y + 8 * s} ${x} ${y} Z" fill="${fill}" stroke="none"/>`;

  /* un point à la distance d le long d'une ligne brisée, avec son angle (en degrés) */
  function along(pts, d) {
    let reste = d;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      const L = Math.hypot(x2 - x1, y2 - y1);
      if (reste <= L) {
        const t = reste / L;
        return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, a: Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI };
      }
      reste -= L;
    }
    const [x, y] = pts[pts.length - 1];
    return { x, y, a: 0 };
  }
  /* des chevrons posés sur un tuyau : le sens de l'écoulement */
  const chevrons = (pts, distances, couleur) => distances.map(d => {
    const p = along(pts, d);
    return `<path transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.a.toFixed(1)})" d="M-5 -4.5 L2 0 L-5 4.5" fill="none" stroke="${couleur}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  const chemin = pts => 'M' + pts.map(p => p.join(' ')).join(' L');

  function cheminDeLeau() {
    const d = svg('0 0 820 440',
      'Coupe schématique d’une unité intérieure murale et de l’évacuation de ses condensats : la batterie froide, le bac, puis selon l’étape un tuyau en pente jusqu’à dehors, un tuyau qui remonte et déborde, un siphon, une pompe de relevage et son flotteur.');
    let etape = 0;
    const eau = C.eau, froid = C.froid;
    /* un tuyau : paroi grise, intérieur d'eau ou vide */
    const tuyau = (dd, plein) =>
      `<path d="${dd}" fill="none" stroke="${C.gris}" stroke-width="15" stroke-linejoin="round"/>` +
      `<path d="${dd}" fill="none" stroke="${plein ? eau : C.papier}" stroke-width="10" stroke-linejoin="round"/>`;
    const filet = (dd, couleur) => `<path d="${dd}" fill="none" stroke="${couleur}" stroke-width="10" stroke-linejoin="round"/>`;
    const niveauRef = (x1, x2) => `<line x1="${x1}" y1="160" x2="${x2}" y2="160" stroke="${C.gris}" stroke-width="2" stroke-dasharray="6 6"/>`;

    const peindre = () => {
      const niveauBac = [5, 12, 17, 12, 8, 17][etape];       /* hauteur d'eau dans le bac, en px */
      const parts = [];
      const p = s => parts.push(s);

      /* ---------- le décor : la pièce, le mur, dehors ---------- */
      p(`<rect x="10" y="10" width="800" height="420" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="30" y="38" font-size="15" font-weight="700" fill="${C.navy}">DANS LA PIÈCE</text>
<text x="790" y="38" text-anchor="end" font-size="15" font-weight="700" fill="${C.navy}">DEHORS</text>
<line x1="640" y1="58" x2="640" y2="410" stroke="${C.gris}" stroke-width="10" stroke-dasharray="26 10"/>
<text x="640" y="50" text-anchor="middle" font-size="14" fill="${C.gris}">le mur</text>
<line x1="652" y1="380" x2="800" y2="380" stroke="${C.navy}" stroke-width="3"/>`);

      /* ---------- l'unité intérieure : batterie, gouttes, bac ---------- */
      const coilCol = etape === 5 ? C.gris : froid;
      const coilW = etape === 0 ? 5 : 3;
      p(`<rect x="150" y="50" width="290" height="125" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="162" y="73" font-size="14" font-weight="700" fill="${C.navy}">unité intérieure</text>
<text x="160" y="103" font-size="13" font-weight="700" fill="${etape === 0 ? froid : C.navy}">batterie</text>
<text x="160" y="119" font-size="13" font-weight="700" fill="${etape === 0 ? froid : C.navy}">froide</text>
<g stroke="${C.trait}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<line x1="${238 + i * 16}" y1="86" x2="${238 + i * 16}" y2="128"/>`).join('')}</g>
<g stroke="${coilCol}" stroke-width="${coilW}" fill="none"><path d="M230 98 H374 M230 116 H374"/></g>
<text x="162" y="165" font-size="15" font-weight="700" fill="${C.navy}">bac</text>
<path d="M220 150 V167 H412 V150" fill="none" stroke="${etape === 2 || etape === 5 ? C.rouge : (etape === 1 || etape === 0 ? eau : C.navy)}" stroke-width="4" stroke-linejoin="round"/>
<rect x="222" y="${167 - niveauBac}" width="188" height="${niveauBac - 2}" fill="${eau}" opacity=".55" stroke="none"/>`);
      if (etape === 5) p(`<text x="322" y="80" font-size="15" font-weight="700" fill="${C.rouge}">froid coupé</text>`);

      /* l'air de la pièce, la formation des gouttes */
      if (etape === 0) {
        [98, 112, 126].forEach(y => p(`<path d="M30 ${y} h92" stroke="${C.navy}" stroke-width="3" fill="none" marker-end="url(#fl-air)"/>`));
        p(`<text x="26" y="152" font-size="15" fill="${C.navy}">air de la pièce</text>`);
        [252, 300, 348].forEach(x => p(goutte(x, 131, .55, eau)));
      }

      /* ---------- selon l'étape : le tuyau, le siphon, la pompe ---------- */
      if (etape === 0 || etape === 1) {
        const pts = [[412, 160], [460, 160], [700, 250]];
        p(tuyau(chemin(pts), etape === 1));
        if (etape === 1) {
          p(niveauRef(460, 700));
          p(chevrons(pts, [20, 70, 130, 190, 240], C.papier));
          p(`<text x="468" y="240" font-size="15" font-weight="700" fill="${eau}">pente continue</text>`);
          [268, 302, 336].forEach(y => p(goutte(700, y, .7, eau)));
          p(`<text x="716" y="304" font-size="14" font-weight="700" fill="${eau}">l’eau sort</text>
<text x="716" y="321" font-size="14" font-weight="700" fill="${eau}">toute seule</text>`);
        }
      }

      if (etape === 2) {
        const pts = [[412, 160], [460, 160], [540, 205], [620, 140], [700, 170]];
        p(tuyau(chemin(pts), false));
        p(filet('M412 160 H460 L540 205 L608 150', eau));
        p(niveauRef(460, 700));
        p(`<text x="500" y="246" font-size="15" font-weight="700" fill="${C.rouge}">point bas :</text>
<text x="500" y="264" font-size="15" font-weight="700" fill="${C.rouge}">l’eau reste là</text>
<text x="528" y="122" font-size="14" font-weight="700" fill="${C.rouge}">ça remonte</text>`);
        [316, 350].forEach((x, i) => p(goutte(x, 190 + i * 26, .7, C.rouge)));
        p(`<text x="170" y="228" font-size="15" font-weight="700" fill="${C.rouge}">le bac déborde</text>`);
      }

      if (etape === 3) {
        const pts = [[412, 160], [460, 160], [540, 195]];
        p(tuyau('M412 160 H460 L540 195 V262 A23 23 0 0 0 586 262 V226 H610 V385', false));
        p(filet(chemin(pts), eau));
        p(filet('M540 226 V262 A23 23 0 0 0 586 262 V226', eau));
        p(chevrons(pts, [24, 60, 100], C.papier));
        p(`<path d="M610 368 q-5 -8 0 -16 t0 -16 t0 -16 t0 -16 t0 -16" fill="none" stroke="${C.ambre}" stroke-width="2.5" stroke-linecap="round"/>`);
        p(`<text x="522" y="268" text-anchor="end" font-size="15" font-weight="700" fill="${eau}">bouchon d’eau</text>
<text x="563" y="322" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">siphon</text>
<text x="594" y="356" text-anchor="end" font-size="15" font-weight="700" fill="${C.ambre}">odeurs</text>
<text x="594" y="404" text-anchor="end" font-size="14" fill="${C.gris}">évacuation d’eaux usées</text>`);
      }

      if (etape === 4 || etape === 5) {
        /* la pompe : le tuyau du bac entre à gauche, le fin tuyau repart vers le haut */
        const haut = etape === 5;
        const montee = [[568, 138], [568, 70], [620, 70], [700, 98]];
        p(tuyau('M412 160 H460', true));
        p(tuyau(chemin(montee), etape === 4));
        if (etape === 4) {
          p(chevrons(montee, [20, 45, 85, 120, 160], C.papier));
          [112, 146, 180].forEach(y => p(goutte(700, y, .7, eau)));
          p(`<text x="716" y="150" font-size="14" font-weight="700" fill="${eau}">l’eau sort</text>`);
          p(niveauRef(592, 700));
          p(`<text x="592" y="180" font-size="14" fill="${C.gris}">niveau</text>
<text x="592" y="196" font-size="14" fill="${C.gris}">du bac</text>`);
        }
        /* le boîtier de la pompe, son eau, son flotteur */
        const niv = haut ? 148 : 172;                       /* surface de l'eau dans la pompe */
        p(`<rect x="460" y="138" width="120" height="54" rx="9" fill="${C.creme}" stroke="${haut ? C.rouge : C.vert}" stroke-width="4"/>
<rect x="462" y="${niv}" width="116" height="${190 - niv}" fill="${eau}" opacity=".55" stroke="none"/>
<circle cx="520" cy="${niv - 4}" r="8" fill="${haut ? C.ambre : C.papier}" stroke="${C.navy}" stroke-width="3"/>
<text x="520" y="214" text-anchor="middle" font-size="15" font-weight="700" fill="${haut ? C.rouge : C.vert}">pompe de relevage</text>
<text x="520" y="231" text-anchor="middle" font-size="14" fill="${C.navy}">et son flotteur</text>`);
        /* le contact de sécurité, sur le fil qui va à l'unité */
        const ouvert = haut;
        p(`<path d="M480 138 V128 M480 114 V104 H440" fill="none" stroke="${ouvert ? C.rouge : C.gris}" stroke-width="3"/>
<circle cx="480" cy="128" r="3.5" fill="${C.navy}" stroke="none"/><circle cx="480" cy="114" r="3.5" fill="${C.navy}" stroke="none"/>
<path d="${ouvert ? 'M480 128 L489 116' : 'M480 128 V114'}" fill="none" stroke="${ouvert ? C.rouge : C.gris}" stroke-width="3" stroke-linecap="round"/>
<text x="500" y="110" font-size="14" font-weight="700" fill="${ouvert ? C.rouge : C.navy}">contact</text>
<text x="500" y="126" font-size="14" font-weight="700" fill="${ouvert ? C.rouge : C.navy}">${ouvert ? 'ouvert' : 'fermé'}</text>`);
      }

      d.innerHTML = `<defs>
  <marker id="fl-air" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.navy}"/></marker>
</defs>` + parts.join('\n');
    };

    const etapes = [
      { titre: 'L’eau se dépose sur la batterie',
        dire: 'L’air de la pièce touche la batterie froide. Refroidi, il ne peut plus garder toute son humidité : elle se dépose en gouttes, qui tombent dans le bac.',
        peindre: () => { etape = 0; peindre(); } },
      { titre: 'Le tuyau, en pente, l’emmène dehors',
        dire: 'Le bac se vide par un tuyau posé en pente continue : l’eau descend toute seule jusqu’à dehors, sans pompe. D’après la fiche de montage du split, la pente est de 3 cm par mètre au moins.',
        peindre: () => { etape = 1; peindre(); } },
      { titre: 'Un point bas : le bac déborde',
        dire: 'Si le tuyau a un creux, ou s’il remonte avant la sortie, l’eau n’en sort plus. Elle remplit le tuyau, remonte dans le bac, et le bac déborde. Un seul point bas suffit.',
        peindre: () => { etape = 2; peindre(); } },
      { titre: 'Le siphon : un bouchon d’eau',
        dire: 'Quand le tuyau finit sur une évacuation d’eaux usées, un siphon garde un peu d’eau en permanence : l’eau du bac passe, les odeurs de l’évacuation ne remontent pas.',
        peindre: () => { etape = 3; peindre(); } },
      { titre: 'La pompe relève l’eau',
        dire: 'Quand la sortie est plus haute que le bac, la pente est impossible. Une pompe de relevage reprend l’eau et la pousse vers le haut ; son flotteur la fait démarrer quand l’eau monte.',
        peindre: () => { etape = 4; peindre(); } },
      { titre: 'Le flotteur coupe le froid',
        dire: 'Si la pompe s’arrête ou si le tuyau se bouche, l’eau monte, et le flotteur avec elle. Le contact de sécurité s’ouvre : il coupe le froid avant que le bac ne déborde.',
        peindre: () => { etape = 5; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Mode froid. En mode chaud, c’est l’unité extérieure qui fait de l’eau, au dégivrage : la station 2.7 le montre.');
  }

  /* Temps 5 : chaque situation, sa réponse. */
  function recapitulatif() {
    const d = svg('0 0 820 420', 'Récapitulatif en cinq lignes : si l’eau peut descendre, un tuyau en pente continue ; si le tuyau finit sur une évacuation d’eaux usées, un siphon ; si la pente est impossible, une pompe de relevage et son contact de sécurité ; si le tuyau passe dans un local chaud et humide, un isolant ; si l’appareil chauffe, prévoir où s’écoule l’eau de l’unité extérieure.');
    const lignes = [
      { si: ['L’eau peut descendre', 'jusqu’à dehors'], alors: ['un tuyau en pente continue,', 'sans point bas'], c: C.eau },
      { si: ['Le tuyau finit sur une évacuation', 'd’eaux usées'], alors: ['un siphon : le bouchon d’eau', 'arrête les odeurs'], c: C.eau },
      { si: ['La pente est impossible', '(sortie plus haute que le bac)'], alors: ['une pompe de relevage et', 'son contact de sécurité'], c: C.vert },
      { si: ['Le tuyau passe dans un local', 'chaud et humide'], alors: ['un isolant, sinon le tuyau', 'se couvre de gouttes'], c: C.navy },
      { si: ['L’appareil chauffe', '(mode chaud)'], alors: ['prévoir où s’écoule l’eau', 'de l’unité extérieure'], c: C.chaud }
    ];
    let h = `<defs><marker id="fl-rec" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="${C.navy}"/></marker></defs>
<rect x="10" y="10" width="800" height="400" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="84" y="46" font-size="16" font-weight="700" fill="${C.navy}">La situation</text>
<text x="468" y="46" font-size="16" font-weight="700" fill="${C.navy}">Ce qu’on pose</text>`;
    lignes.forEach((l, i) => {
      const y = 62 + i * 66;
      h += `<circle cx="50" cy="${y + 30}" r="15" fill="${C.creme}" stroke="${l.c}" stroke-width="3"/>
<text x="50" y="${y + 36}" text-anchor="middle" font-size="16" font-weight="700" fill="${l.c}">${i + 1}</text>
<rect x="84" y="${y}" width="320" height="60" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="100" y="${y + 26}" font-size="16" fill="${C.navy}">${l.si[0]}</text>
<text x="100" y="${y + 47}" font-size="16" fill="${C.gris}">${l.si[1]}</text>
<line x1="408" y1="${y + 30}" x2="456" y2="${y + 30}" stroke="${C.navy}" stroke-width="3" marker-end="url(#fl-rec)"/>
<rect x="464" y="${y}" width="320" height="60" rx="10" fill="${C.papier}" stroke="${l.c}" stroke-width="3"/>
<text x="480" y="${y + 26}" font-size="16" font-weight="700" fill="${l.c}">${l.alors[0]}</text>
<text x="480" y="${y + 47}" font-size="16" font-weight="700" fill="${l.c}">${l.alors[1]}</text>`;
    });
    d.innerHTML = h;
    return d;
  }

  return { cheminDeLeau, recapitulatif };
})();

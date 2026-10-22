/* CuivRézo — figures de la ligne 5 (réseau acier et réseaux du plombier) : la base commune et les tubes.
   CONTRAT : enregistre « tubesPlomb » (famille · coupes · marquage · pied · tarif:acier[:26,9] · tarif:plast[:per16]
   · usages · noms) dans CuivFigures, et pose window.CuivPlomb (palette, tube droit, bloc de texte) pour
   figures-plomb-2-acier.js et figures-plomb-3-plastique.js (qui se chargent après, par l'ordre alphabétique).
   Figures SVG dessinées pour la station : aucune n'existe dans la bibliothèque de symboles (frigo et électricité).
   Mêmes règles que les autres familles : viewBox 800 × 500, étiquettes hors des tracés, jamais de texte sur un dessin. */

(() => {
  'use strict';

  /* matières : trois teintes (haut, milieu, bas) du dégradé vertical */
  const MAT = {
    noir: ['#6b727b', '#454b53', '#2a2e34'], galva: ['#eef2f5', '#c3ccd4', '#8f9aa5'], inox: ['#ffffff', '#dfe5ea', '#aeb9c2'],
    rouge: ['#ef6a55', '#d8452f', '#9c2616'], bleu: ['#6aaaf0', '#3b82d6', '#1f5a9e'], multi: ['#fbf9f4', '#ece6d8', '#bfb7a3'],
    pe: ['#4b4f55', '#2a2d31', '#131518'], pvc: ['#cfd4d9', '#aab1b8', '#838b93'], laiton: ['#f2d388', '#d4a63a', '#97701a']
  };
  const STROKE = { noir: '#23272c', galva: '#7d8995', inox: '#8f9aa5', rouge: '#7a1c10', bleu: '#174775', multi: '#8c8576', pe: '#0c0d0f', pvc: '#6c747c', laiton: '#6e5010' };
  const defs = '<defs>' + Object.entries(MAT).map(([k, c]) =>
    `<linearGradient id="cz-p-${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".5" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient>`).join('')
    + `<style>.cz-tb{font:600 22px Calibri,'Segoe UI',Arial,sans-serif;fill:#10233c}.cz-bl{font:700 22px Calibri,'Segoe UI',Arial,sans-serif;fill:#fff}.cz-txt{font-size:24px}.cz-pt{font-size:22px}
       .cz-gr{font:700 30px Calibri,'Segoe UI',Arial,sans-serif;fill:#10233c}  .cz-sd{font:600 22px Calibri,'Segoe UI',Arial,sans-serif;fill:#56657a}</style></defs>`;

  /* un tube droit horizontal de x0 à x1, axe en y, diamètre d, dans la matière m */
  const tube = (x0, x1, y, d, m, extra) =>
    `<rect x="${x0}" y="${y - d / 2}" width="${x1 - x0}" height="${d}" rx="${Math.min(6, d / 4)}" fill="url(#cz-p-${m})" stroke="${STROKE[m]}" stroke-width="2"/>`
    + `<rect x="${x0 + 3}" y="${y - d / 2 + 3}" width="${x1 - x0 - 6}" height="${Math.max(2, d / 8)}" rx="2" fill="#fff" opacity=".35"/>` + (extra || '');
  /* un tube souple : un trait onduleux (couleur pleine, reflet par-dessus) */
  const souple = (x0, y, n, d, m, dy) =>
    `<path d="M${x0} ${y} q35 ${-16} 70 0${' t70 0'.repeat(n - 1)}" fill="none" stroke="${STROKE[m]}" stroke-width="${d + 4}" stroke-linecap="round"/>`
    + `<path d="M${x0} ${y} q35 ${-16} 70 0${' t70 0'.repeat(n - 1)}" fill="none" stroke="${MAT[m][1]}" stroke-width="${d}" stroke-linecap="round"/>`
    + `<path d="M${x0} ${(y || 0) + (dy || -3)} q35 ${-16} 70 0${' t70 0'.repeat(n - 1)}" fill="none" stroke="#fff" stroke-width="${Math.max(2, d / 6)}" opacity=".4" stroke-linecap="round"/>`;
  /* un bloc de texte coupé à `max` caractères par ligne ; renvoie les <text> */
  const bloc = (x, y, txt, max, cls, ancre, pas) => {
    const mots = txt.split(' '), lignes = []; let l = '';
    mots.forEach(w => { if ((l + ' ' + w).trim().length > max) { lignes.push(l); l = w; } else l = (l + ' ' + w).trim(); });
    if (l) lignes.push(l);
    return lignes.map((t, i) => `<text x="${x}" y="${y + i * (pas || 24)}" text-anchor="${ancre || 'start'}" class="${cls || 'cz-pt'}">${t}</text>`).join('');
  };
  const rond = (cx, cy, r, t, m) => `<circle cx="${cx}" cy="${cy}" r="${r - t / 2}" fill="none" stroke="url(#cz-p-${m})" stroke-width="${t}"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${STROKE[m]}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r - t}" fill="none" stroke="${STROKE[m]}" stroke-width="1.5"/>`;
  /* un tube comme l'objet réel : corps, bout coupé visible (face claire, alésage) ; couches = multicouche (aluminium entre deux plastiques) */
  const NAVY = '#1b3a63';
  const cyl = (x0, x1, y, d, m, couches) => {
    const rx = Math.max(5, d * 0.2), paroi = Math.max(3, d * 0.13);
    return `<rect x="${x0}" y="${y - d / 2}" width="${x1 - x0}" height="${d}" fill="url(#cz-p-${m})" stroke="${NAVY}" stroke-width="2.5"/>`
      + `<rect x="${x0 + 3}" y="${y - d / 2 + 3}" width="${x1 - x0 - 6}" height="${Math.max(2, d / 8)}" rx="2" fill="#fff" opacity=".4"/>`
      + `<ellipse cx="${x1}" cy="${y}" rx="${rx}" ry="${d / 2}" fill="${MAT[m][0]}" stroke="${NAVY}" stroke-width="2.5"/>`
      + (couches ? `<ellipse cx="${x1}" cy="${y}" rx="${rx * 0.75}" ry="${d / 2 - paroi * 0.6}" fill="none" stroke="#9aa6b2" stroke-width="3"/>` : '')
      + `<ellipse cx="${x1}" cy="${y}" rx="${rx * 0.5}" ry="${d / 2 - paroi}" fill="#fbf6ee" stroke="${NAVY}" stroke-width="2"/>`;
  };
  /* une couronne de tube souple, vue de trois quarts : quelques spires empilées */
  const bobine = (cx, cy, rx, ry, m, tours, e) => Array.from({ length: tours }, (_, i) => {
    const y = cy + i * (e || 7);
    return `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="${NAVY}" stroke-width="${(e || 7) + 5}"/>`
      + `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="${MAT[m][1]}" stroke-width="${(e || 7) + 1}"/>`
      + `<ellipse cx="${cx}" cy="${y - 2}" rx="${rx - 2}" ry="${ry - 1}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".4"/>`;
  }).join('');
  window.CuivPlomb = { MAT, STROKE, NAVY, defs, tube, cyl, bobine, souple, bloc, rond };

  /* ------------------------------------------------------------------ données des tableaux (fiches de F. Henninot) */
  /* tube acier tarif 1 : Ø ext × ép. (fiche « Le tube acier noir et galvanisé »), ancien nom, pouces ; DN : usage courant (à valider) */
  const ACIER = [['17,2 × 2,0', '12/17', '3/8″', '10'], ['21,3 × 2,3', '15/21', '1/2″', '15'], ['26,9 × 2,3', '20/27', '3/4″', '20'], ['33,7 × 2,9', '26/34', '1″', '25'],
                 ['42,4 × 2,9', '33/42', '1″1/4', '32'], ['48,3 × 2,9', '40/49', '1″1/2', '40'], ['60,3 × 3,2', '50/60', '2″', '50']];
  const norm = s => String(s || '').replace('.', ',').trim();

  CuivFigures.ajouter('tubesPlomb', (etat, { cadre, etiquette }) => {
    const [vue, par] = String(etat || 'famille').split(':');

    if (vue === 'coupes') {
      const cy = 215, R = 56, X = [100, 250, 400, 550, 700];
      const noms = ['Acier noir', 'Galvanisé', 'PER', 'Multicouche', 'PVC'];
      const desc = [['sans zinc,', 'plein métal'], ['zinc autour', 'et dedans'], ['une seule', 'matière,', 'souple'], ['3 couches', 'collées'], ['une seule', 'matière,', 'rigide']];
      const f = [
        rond(X[0], cy, R, 14, 'noir'),
        rond(X[1], cy, R, 5, 'galva') + rond(X[1], cy, R - 5, 12, 'noir') + rond(X[1], cy, R - 17, 4, 'galva'),
        rond(X[2], cy, R, 14, 'bleu'),
        rond(X[3], cy, R, 9, 'multi') + rond(X[3], cy, R - 9, 4, 'inox') + rond(X[3], cy, R - 13, 9, 'multi'),
        rond(X[4], cy, R, 18, 'pvc')
      ];
      return cadre(`${defs}${f.join('')}
        ${X.map((x, i) => `<text x="${x}" y="318" text-anchor="middle" class="cz-txt">${noms[i]}</text>${bloc(x, 346, desc[i].join(' '), 12, 'cz-pt', 'middle')}`).join('')}
        ${etiquette(X[1] + R - 2, cy - 12, 330, 118, 'couche de zinc')}
        ${etiquette(X[3], cy - 40, X[3], 106, 'bande d’aluminium')}
        <text x="400" y="${par === 'pm' ? 470 : 452}" text-anchor="middle" class="cz-pt">Vus de face, chaque tube a sa signature : le bout coupé ne trompe pas</text>
        ${par === 'pm' ? '' : '<text x="400" y="482" text-anchor="middle" class="cz-txt">Galvanisé ou inox ? L’aimant colle sur le galvanisé, rarement sur l’inox</text>'}`, 'Les tubes vus en coupe');
    }

    if (vue === 'marquage') {
      const tr = [[120, 210], [260, 340], [390, 470], [540, 670]].map(([a, b]) => `<rect x="${a}" y="${130}" width="${b - a}" height="8" rx="3" fill="#fff" opacity=".85"/>`).join('');
      const cols = [[60, 200], [200, 400], [400, 560], [560, 740]];
      const cap = ['la matière', 'diamètre extérieur × épaisseur, en millimètres', 'le fabricant', 'température et pression maximales'];
      return cadre(`${defs}${cyl(60, 722, 134, 56, 'bleu')}${tr}
        <path d="M200 164 L60 232 M640 164 L740 232" stroke="#1b3a63" stroke-width="2" stroke-dasharray="7 6" fill="none"/>
        <rect x="60" y="232" width="680" height="86" rx="12" fill="#fff" stroke="#1b3a63" stroke-width="3"/>
        ${cols.slice(1).map(([a]) => `<line x1="${a}" y1="244" x2="${a}" y2="306" stroke="#1b3a63" stroke-width="2"/>`).join('')}
        <text x="130" y="288" text-anchor="middle" class="cz-gr">PER</text><text x="300" y="288" text-anchor="middle" class="cz-gr">16 × 1,5</text>
        <text x="480" y="288" text-anchor="middle" class="cz-gr">MARQUE</text><text x="650" y="288" text-anchor="middle" class="cz-gr">… bar · … °C</text>
        ${cols.map(([a, b], i) => `<circle cx="${(a + b) / 2}" cy="232" r="16" fill="#1b3a63"/><text x="${(a + b) / 2}" y="239" text-anchor="middle" class="cz-bl">${i + 1}</text>
          ${bloc((a + b) / 2, 362, cap[i], i === 1 ? 17 : 13, 'cz-pt', 'middle')}`).join('')}
        <text x="400" y="480" text-anchor="middle" class="cz-pt">Sur les plastiques, l’inscription revient tous les mètres</text>`, 'Lire le marquage d’un tube');
    }

    if (vue === 'pied') {
      const cx = 330, cy = 300, R = 95, e = 14;
      return cadre(`${defs}
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#cz-p-bleu)" stroke="${STROKE.bleu}" stroke-width="3"/>
        <circle cx="${cx}" cy="${cy}" r="${R - e}" fill="#fbf6ee" stroke="${STROKE.bleu}" stroke-width="2"/>
        <rect x="120" y="110" width="520" height="46" rx="6" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        ${Array.from({ length: 25 }, (_, i) => `<line x1="${140 + i * 20}" y1="156" x2="${140 + i * 20}" y2="${i % 5 ? 146 : 138}" stroke="#2c333b" stroke-width="2"/>`).join('')}
        <path d="M${cx - R - 40} 110 h40 v${cy - 110} h-10 l-30 -40 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <path d="M${cx + R} 110 h40 v${cy - 150} l-30 40 h-10 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <rect x="${cx + R + 40}" y="84" width="170" height="96" rx="10" fill="#e4e8ec" stroke="#4d5763" stroke-width="2"/>
        <rect x="${cx + R + 56}" y="98" width="138" height="46" rx="4" fill="#cfe3c4" stroke="#4d5763"/>
        <text x="${cx + R + 125}" y="131" text-anchor="middle" style="font:700 30px Consolas,monospace;fill:#10233c">16,0</text>
        <text x="${cx + R + 125}" y="168" text-anchor="middle" class="cz-pt">mm</text>
        ${etiquette(cx - R - 20, cy - 70, 150, 420, 'Bec fixe')}
        ${etiquette(cx + R + 20, cy - 70, 560, 290, 'Bec mobile')}
        ${etiquette(cx + R + 125, 180, 560, 360, 'Lecture : 16,0 mm')}
        <text x="560" y="410" class="cz-txt">= tube 16</text>
        <text x="400" y="472" text-anchor="middle" class="cz-pt">Becs en travers, sans serrer : on lit le diamètre EXTÉRIEUR</text>`, 'Mesurer un tube au pied à coulisse');
    }

    if (vue === 'tarif' && par === 'acier') {
      const sel = norm(String(etat).split(':')[2]);
      const X = [60, 300, 470, 620], Wc = [240, 170, 150, 120], y0 = 66, h = 44;
      const entetes = ['Ø ext. × épaisseur (mm)', 'ancien nom', 'pouces', 'DN'];
      const lignes = ACIER.map((r, i) => {
        const on = sel && norm(r[0]).startsWith(sel), y = y0 + h + i * h;
        return `<rect x="60" y="${y}" width="680" height="${h}" fill="${on ? '#ffd89a' : i % 2 ? '#f6efe3' : '#fffdf8'}" stroke="${on ? '#c9451a' : '#d9cfbd'}" stroke-width="${on ? 3 : 1}"/>`
          + r.map((c, k) => `<text x="${X[k] + 16}" y="${y + 30}" class="${on ? 'cz-gr' : 'cz-txt'}" style="${on ? 'font-size:26px' : ''}">${c}</text>`).join('');
      }).join('');
      return cadre(`${defs}
        <rect x="60" y="${y0}" width="680" height="${h}" rx="6" fill="#1b3a63"/>
        ${entetes.map((t, k) => `<text x="${X[k] + 16}" y="${y0 + 29}" class="cz-bl">${t}</text>`).join('')}${lignes}
        <text x="400" y="454" text-anchor="middle" class="cz-pt">Tube acier, noir ou galvanisé : tarif 1, norme NF A 49-145 (ancienne norme)</text>
        <text x="400" y="482" text-anchor="middle" class="cz-pt">DN : un nom normalisé, pas une mesure</text>`, 'Tableau des tubes acier');
    }

    if (vue === 'tarif' && par === 'plast') {
      const sel = norm(String(etat).split(':')[2]);
      const blocs = [
        { x: 24, nom: 'PER', m: 'bleu', sous: 'Ø ext. × ép. · ancien nom', lig: [['12 × 1,1', '10 × 12', 'per12'], ['16 × 1,5', '13 × 16', 'per16'], ['20 × 1,9', '16 × 20', 'per20'], ['25 × 2,3', '20 × 25', 'per25']] },
        { x: 280, nom: 'Multicouche', m: 'multi', sous: 'Ø ext. × épaisseur', lig: [['14 × 2', '', 'mc14'], ['16', 'notice', 'mc16']] },
        { x: 536, nom: 'PVC évacuation', m: 'pvc', sous: 'Ø ext. × épaisseur', lig: [['32 × 3', 'lavabo', 'pvc32'], ['40 × 3', 'collecteur', 'pvc40'], ['50', 'catalogue', 'pvc50'], ['100', 'catalogue', 'pvc100']] }
      ];
      return cadre(`${defs}${blocs.map(b => `
        <rect x="${b.x}" y="56" width="240" height="46" rx="8" fill="${b.m === 'multi' ? '#6c6a5e' : b.m === 'pvc' ? '#6c747c' : '#1f5a9e'}"/>
        <text x="${b.x + 120}" y="88" text-anchor="middle" class="cz-bl">${b.nom}</text>
        <text x="${b.x + 120}" y="128" text-anchor="middle" class="cz-sd">${b.sous}</text>
        ${b.lig.map((r, i) => { const on = sel === r[2], y = 142 + i * 46;
          return `<rect x="${b.x}" y="${y}" width="240" height="44" fill="${on ? '#ffd89a' : i % 2 ? '#f6efe3' : '#fffdf8'}" stroke="${on ? '#c9451a' : '#d9cfbd'}" stroke-width="${on ? 3 : 1}"/>
            <text x="${b.x + 12}" y="${y + 30}" class="cz-txt">${r[0]}</text><text x="${b.x + 228}" y="${y + 30}" text-anchor="end" class="cz-sd">${r[1]}</text>`; }).join('')}`).join('')}
        <rect x="24" y="338" width="752" height="108" rx="12" fill="#e9f1fb" stroke="#1b3a63" stroke-width="2"/>
        <text x="44" y="370" class="cz-txt">Un même tube, deux façons de le dire : « 16 × 1,5 » ou « 13 × 16 »</text>
        <text x="44" y="398" class="cz-pt">13 + 1,5 + 1,5 = 16 : le diamètre intérieur, c’est l’extérieur moins deux parois</text>
        <text x="44" y="426" class="cz-pt">Inox et PE : même règle (Ø extérieur en mm), valeurs au catalogue</text>
        <text x="400" y="480" text-anchor="middle" class="cz-pt">Plastiques, inox, PE : le nom est le diamètre EXTÉRIEUR, en millimètres</text>`, 'Tableau des tubes plastiques');
    }

    if (vue === 'usages') {
      const L = [
        ['noir', 'Acier noir', ['chauffage · eau glacée · gaz'], ['interdit pour l’eau potable']],
        ['galva', 'Galvanisé', ['eau sanitaire, froide ou chaude', 'incendie · air comprimé'], ['interdit en chauffage central', 'ne se soude pas']],
        ['inox', 'Inox', ['eau sanitaire, froide ou chaude', 'chauffage · eau glacée'], ['va avec le cuivre', 'aimant : en général non']],
        ['bleu', 'PER', ['eau sanitaire, froide ou chaude', 'radiateurs · plancher chauffant'], ['jamais en apparent', 'colliers non serrés']],
        ['multi', 'Multicouche', ['eau sanitaire, froide ou chaude', 'chauffage'], ['se sertit · se cintre']],
        ['pe', 'PE', ['eau potable et gaz', 'enterrés'], ['souple, en couronne']],
        ['pvc', 'PVC', ['évacuation : eaux usées', 'et eaux pluviales'], ['ne se cintre jamais', 'se colle']]
      ];
      const lignes = (x, y, t) => t.map((u, k) => `<text x="${x}" y="${y + k * 22}" class="cz-tb" style="font-size:20px">${u}</text>`).join('');
      return cadre(`${defs}
        <rect x="20" y="30" width="760" height="40" rx="6" fill="#1b3a63"/>
        <text x="60" y="58" class="cz-bl">Tube</text><text x="226" y="58" class="cz-bl">Il sert à</text><text x="520" y="58" class="cz-bl">À savoir</text>
        ${L.map((r, i) => { const y = 70 + i * 60;
          return `<rect x="20" y="${y}" width="760" height="60" fill="${i % 2 ? '#f6efe3' : '#fffdf8'}" stroke="#d9cfbd"/>
            <rect x="32" y="${y + 18}" width="20" height="24" rx="4" fill="url(#cz-p-${r[0]})" stroke="${STROKE[r[0]]}" stroke-width="1.5"/>
            <text x="62" y="${y + 38}" class="cz-txt">${r[1]}</text>
            ${lignes(226, y + (r[2].length > 1 ? 26 : 36), r[2])}${lignes(520, y + (r[3].length > 1 ? 26 : 36), r[3])}`; }).join('')}`, 'À quoi sert chaque tube');
    }

    if (vue === 'noms') {
      const cx = 170, cy = 250, R = 100;
      const B = [[130, '3/4″', 'le nom en pouces : celui du filetage', false], [255, 'DN 20', 'le nom normalisé : un repère, pas une mesure', false], [380, '26,9 mm', 'la mesure réelle : le diamètre extérieur', true]];
      return cadre(`${defs}${rond(cx, cy, R, 18, 'galva')}${rond(cx, cy, R - 18, 12, 'noir')}
        <line x1="${cx - R}" y1="${cy + R + 34}" x2="${cx + R}" y2="${cy + R + 34}" class="cz-cote"/>
        <text x="${cx}" y="${cy + R + 66}" text-anchor="middle" class="cz-txt">Un seul tube</text>
        ${B.map(([c, n, t, v]) => `<line x1="${cx + R + 8}" y1="${cy}" x2="338" y2="${c}" stroke="#1b3a63" stroke-width="1.6"/>
          <rect x="340" y="${c - 56}" width="430" height="112" rx="12" fill="${v ? '#e3f5ec' : '#fffdf8'}" stroke="${v ? '#1e7e54' : '#1b3a63'}" stroke-width="${v ? 4 : 2}"/>
          <text x="360" y="${c - 14}" class="cz-gr">${n}</text>${bloc(360, c + 14, t, 40, 'cz-pt')}`).join('')}`, 'Les trois noms d’un tube');
    }

    /* par défaut : la famille, sept tubes rangés */
    const coul = (cx, m) => bobine(cx, -9, 36, 13, m, 3, 6) + cyl(cx + 36, cx + 100, 9, 13, m);
    const R = [
      ['Acier noir', 'gris sombre, rigide, en barres', () => cyl(36, 296, 0, 30, 'noir')],
      ['Acier galvanisé', 'gris clair brillant (zinc), rigide', () => cyl(36, 296, 0, 30, 'galva') + [90, 150, 215].map(x => `<path d="M${x} -8 l8 5 l-4 8 l-9 -3z" fill="none" stroke="#7d8995" stroke-width="1.5"/>`).join('')],
      ['Inox', 'brillant, rigide', () => cyl(36, 296, 0, 30, 'inox') + `<rect x="46" y="-9" width="230" height="3" rx="1.5" fill="#fff"/>`],
      ['PER', 'rouge ou bleu, souple, en couronne', () => coul(60, 'rouge') + coul(190, 'bleu')],
      ['Multicouche', 'blanc ou gris, souple', () => bobine(90, -9, 52, 14, 'multi', 3, 6) + cyl(142, 250, 10, 18, 'multi', true)],
      ['PE', 'noir (bande de couleur), souple', () => bobine(90, -9, 52, 14, 'pe', 3, 6) + `<ellipse cx="90" cy="3" rx="52" ry="14" fill="none" stroke="#2c7fb8" stroke-width="2.5" stroke-dasharray="10 12"/>` + cyl(142, 250, 10, 18, 'pe')],
      ['PVC', 'gris, rigide, en barres', () => cyl(36, 250, 0, 24, 'pvc') + `<rect x="250" y="-20" width="46" height="40" rx="5" fill="url(#cz-p-pvc)" stroke="#1b3a63" stroke-width="2.5"/><rect x="244" y="-23" width="10" height="46" rx="3" fill="url(#cz-p-pvc)" stroke="#1b3a63" stroke-width="2.5"/><ellipse cx="296" cy="0" rx="8" ry="20" fill="#cfd4d9" stroke="#1b3a63" stroke-width="2.5"/><ellipse cx="296" cy="0" rx="5" ry="13" fill="#fbf6ee" stroke="#1b3a63" stroke-width="2"/>`]
    ];
    return cadre(`${defs}${R.map(([n, t, d], i) => `<g transform="translate(0,${62 + i * 56})">${d()}</g>
      <text x="350" y="${58 + i * 56}" class="cz-txt">${n}</text><text x="350" y="${82 + i * 56}" class="cz-pt">${t}</text>`).join('')}
      <text x="400" y="484" text-anchor="middle" class="cz-pt">Métal ou plastique, rigide ou souple : le premier tri se fait à l’œil</text>`, 'Les sept tubes de plomberie');
  });
})();

/* CuivRézo — figures de l'acier : « acier » (choisir · raccords · serrer · alesage · filiere · copeaux · fin · etancheite
   · serrage · vide), « soudure » (principe · arc · epi · galva) et « sertissage » (principe · repere · sertir · controle).
   Dessinées pour la ligne 5 : le filetage d'après les fiches de F. Henninot (filière à têtes rouge/jaune, filasse et pâte),
   le soudage d'après la fiche « Le soudage » et l'INRS ED 742 (EPI, fumées). Le sertissage est générique (acier, inox, multicouche).
   Se charge après figures-plomb-1-base.js (window.CuivPlomb). */

(() => {
  'use strict';
  const P = window.CuivPlomb, { defs, tube, bloc, rond } = P;
  const ST = '#4d5763';
  /* un tube vu de côté qui se termine en x1 ; mat = matière */
  const T = (x0, x1, y, d, m) => tube(x0, x1, y, d, m);
  /* le coupe-tube rouge, vu de côté, centré en (x, y) */
  const coupeTube = (x, y) => `<path d="M${x - 25} ${y - 51} a14 14 0 0 1 14 -14 h22 a14 14 0 0 1 14 14 v102 a14 14 0 0 1 -14 14 h-22 a14 14 0 0 1 -14 -14 z M${x - 11} ${y - 35} v70 h22 v-70 z" fill="url(#cz-rouge)" fill-rule="evenodd" stroke="#6d1610" stroke-width="3"/>`;

  /* la filière : cage à cliquet autour de la tête (couleur = sens du filetage), manche à droite ; le tube arrive par la gauche */
  const filiere = (tete) => `
    ${T(60, 470, 290, 56, 'noir')}
    <path d="M470 288 L690 150" stroke="#2c333b" stroke-width="26" stroke-linecap="round"/>
    <path d="M470 288 L690 150" stroke="url(#cz-ac)" stroke-width="20" stroke-linecap="round"/>
    <path d="M640 180 L700 142" stroke="#c9631a" stroke-width="30" stroke-linecap="round"/>
    <circle cx="486" cy="290" r="66" fill="url(#cz-ac)" stroke="${ST}" stroke-width="3"/>
    <rect x="448" y="242" width="76" height="96" rx="12" fill="${tete}" stroke="#2c333b" stroke-width="3"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${462 + i * 15}" y="${272}" width="8" height="36" rx="2" fill="#2c333b" opacity=".75"/>`).join('')}
    <circle cx="486" cy="290" r="12" fill="#2c333b"/>`;

  CuivFigures.ajouter('acier', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'choisir') {
      const C = [
        { x: 24, nom: 'Vissé', pts: ['démontable', 'sans flamme', 'filière + raccord'], ico: `${T(40, 140, 160, 34, 'noir')}${T(176, 220, 160, 34, 'noir')}
          <rect x="120" y="136" width="100" height="48" rx="8" fill="url(#cz-p-galva)" stroke="#7d8995" stroke-width="3"/>${[132, 146, 160, 174, 188, 202].map(x => `<line x1="${x}" y1="138" x2="${x + 8}" y2="182" stroke="#7d8995" stroke-width="2"/>`).join('')}` },
        { x: 280, nom: 'Serti', pts: ['très rapide', 'sans flamme', 'presse + mâchoire'], ico: `${T(296, 380, 160, 34, 'noir')}${T(450, 500, 160, 34, 'noir')}
          <rect x="370" y="134" width="90" height="52" rx="8" fill="url(#cz-p-galva)" stroke="#7d8995" stroke-width="3"/>
          <path d="M405 100 v26 m0 0 l-9 -10 m9 10 l9 -10 M405 220 v-26 m0 0 l-9 10 m9 -10 l9 10" stroke="#c9451a" stroke-width="5" fill="none" stroke-linecap="round"/>` },
        { x: 536, nom: 'Soudé', pts: ['définitif', 'chauffage, gros diamètres', 'avec le professeur'], ico: `${T(552, 650, 160, 34, 'noir')}${T(670, 764, 160, 34, 'noir')}
          <path d="M644 138 q14 -10 28 0 q14 10 0 22 q14 12 0 24 q-14 10 -28 0 q-14 -12 0 -24 q-14 -12 0 -22z" fill="#e6891f" stroke="#8a4a0a" stroke-width="2.5"/>
          <path d="M600 60 l26 52 l-38 -4 z" fill="#f7a233" stroke="#c9631a" stroke-width="2"/>` }
      ];
      return cadre(`${defs}${C.map(c => `
        <rect x="${c.x}" y="40" width="240" height="380" rx="14" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
        <rect x="${c.x}" y="40" width="240" height="52" rx="14" fill="#1b3a63"/><rect x="${c.x}" y="70" width="240" height="22" fill="#1b3a63"/>
        <text x="${c.x + 120}" y="78" text-anchor="middle" class="cz-bl" style="font-size:26px">${c.nom}</text>
        ${c.ico}
        ${c.pts.map((t, i) => bloc(c.x + 120, 270 + i * 46, t, 20, 'cz-txt', 'middle')).join('')}`).join('')}
        <text x="400" y="462" text-anchor="middle" class="cz-pt">Démontable ? Flamme interdite ? Quel diamètre ? Trois questions, un choix</text>`, 'Choisir le procédé d’assemblage');
    }

    if (etat === 'criteres') {
      const X = [170, 372, 574], W = 196, Y0 = 62, H = 88;
      const R = [
        ['Matériau', 'noir ou galvanisé', 'acier ou inox : raccords du fabricant', 'acier noir ; le galvanisé : jamais'],
        ['Diamètre', 'jusqu’à 2″ à la filière à main', 'selon la gamme du fabricant', 'tous ; au-delà de 2″ : raccords à souder ou brides'],
        ['Usage', 'eau sanitaire, ou joint à démonter', 'quand il faut aller vite', 'chauffage, joint définitif'],
        ['Lieu', 'partout : sans flamme', 'flamme interdite ou risquée', 'flamme permise, avec le professeur']
      ];
      return cadre(`${defs}
        <rect x="20" y="22" width="760" height="40" rx="6" fill="#1b3a63"/>
        <text x="30" y="50" class="cz-bl">Question</text>${['Vissé', 'Serti', 'Soudé'].map((n, i) => `<text x="${X[i] + W / 2}" y="50" text-anchor="middle" class="cz-bl">${n}</text>`).join('')}
        ${R.map((r, i) => { const y = Y0 + i * H;
          return `<rect x="20" y="${y}" width="760" height="${H}" fill="${i % 2 ? '#f6efe3' : '#fffdf8'}" stroke="#d9cfbd"/><text x="30" y="${y + 52}" class="cz-txt">${r[0]}</text>`
            + [1, 2, 3].map(k => bloc(X[k - 1] + W / 2, y + 30, r[k], 19, 'cz-tb', 'middle', 22)).join(''); }).join('')}
        <text x="400" y="448" text-anchor="middle" class="cz-txt">Quatre questions : matériau, diamètre, usage, lieu</text>
        <text x="400" y="480" text-anchor="middle" class="cz-pt">Une seule réponse peut suffire à éliminer un procédé</text>`, 'Les quatre critères du choix');
    }

    if (etat === 'cas') {
      const R = [['Matériau', 'acier noir', 'tout est possible'], ['Diamètre', '3/4″', 'la filière passe (jusqu’à 2″)'], ['Usage', 'chauffage', 'à démonter pour l’entretien'], ['Lieu', 'atelier', 'flamme permise, mais inutile']];
      return cadre(`${defs}${R.map((r, i) => { const y = 36 + i * 96;
        return `<rect x="20" y="${y}" width="470" height="84" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="2"/><rect x="20" y="${y}" width="136" height="84" rx="12" fill="#1b3a63"/>
          <text x="88" y="${y + 50}" text-anchor="middle" class="cz-bl" style="font-size:22px">${r[0]}</text>
          <text x="172" y="${y + 38}" class="cz-gr" style="font-size:26px">${r[1]}</text>${bloc(172, y + 66, r[2], 30, 'cz-pt')}
          <line x1="490" y1="${y + 42}" x2="530" y2="210" stroke="#1b3a63" stroke-width="2"/>`; }).join('')}
        <rect x="530" y="120" width="250" height="180" rx="16" fill="#e3f5ec" stroke="#1e7e54" stroke-width="4"/>
        <text x="655" y="190" text-anchor="middle" class="cz-ok" style="font-size:40px">Vissé</text>
        <text x="655" y="228" text-anchor="middle" class="cz-txt">avec une union</text><text x="655" y="260" text-anchor="middle" class="cz-pt">le joint se démonte</text>
        <text x="400" y="440" text-anchor="middle" class="cz-txt">Cas résolu : ici, un seul critère décide</text>
        <text x="400" y="472" text-anchor="middle" class="cz-pt">Le joint doit se démonter pour l’entretien : on visse</text>`, 'Un cas résolu');
    }

    if (etat === 'raccords') {
      const NV = '#1b3a63', OR = '#e6891f';
      const g = `fill="url(#cz-p-galva)" stroke="${NV}" stroke-width="2.5" stroke-linejoin="round"`;
      /* bourrelet d'extrémité d'un raccord de fonte malléable, vertical (extrémité horizontale) ou horizontal */
      const bv = (x, cy, h) => `<rect x="${x - 7}" y="${cy - h / 2}" width="14" height="${h}" rx="5" ${g}/>`;
      const bh = (cx, y, w) => `<rect x="${cx - w / 2}" y="${y - 7}" width="${w}" height="14" rx="5" ${g}/>`;
      const fils = (x0, x1, y0, y1) => Array.from({ length: Math.floor((x1 - x0) / 9) }, (_, i) => `<line x1="${x0 + i * 9}" y1="${y1}" x2="${x0 + i * 9 + 6}" y2="${y0}" stroke="${OR}" stroke-width="3" stroke-linecap="round"/>`).join('');
      const taraud = (x, cy, h) => `<line x1="${x}" y1="${cy - h / 2 + 5}" x2="${x}" y2="${cy + h / 2 - 5}" stroke="${NV}" stroke-width="1.6" stroke-dasharray="4 4"/>`;
      const hexa = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" ${g}/><line x1="${x}" y1="${y + h / 3}" x2="${x + w}" y2="${y + h / 3}" stroke="${NV}" stroke-width="1.8"/><line x1="${x}" y1="${y + 2 * h / 3}" x2="${x + w}" y2="${y + 2 * h / 3}" stroke="${NV}" stroke-width="1.8"/>`;
      const L = [
        ['Manchon', 'F · F', `<rect x="-50" y="-20" width="100" height="40" rx="8" ${g}/>${bv(-52, 0, 54)}${bv(52, 0, 54)}${taraud(-30, 0, 40)}${taraud(30, 0, 40)}`],
        ['Coude 90°', 'F · F', `<path d="M-48 28 H0 V-48" fill="none" stroke="${NV}" stroke-width="46" stroke-linejoin="round"/><path d="M-48 28 H0 V-48" fill="none" stroke="#dfe5ea" stroke-width="40" stroke-linejoin="round"/>${bv(-50, 28, 54)}${bh(0, -50, 54)}<path d="M-30 12 Q-12 12 -12 -30" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>`],
        ['Té', 'F · F · F', `<rect x="-52" y="-18" width="104" height="36" rx="7" ${g}/><rect x="-18" y="-60" width="36" height="46" rx="7" ${g}/>${bv(-54, 0, 50)}${bv(54, 0, 50)}${bh(0, -62, 50)}`],
        ['Union', '3 pièces', `<rect x="-66" y="-17" width="42" height="34" rx="6" ${g}/>${bv(-68, 0, 48)}${hexa(-26, -28, 52, 56)}<rect x="24" y="-17" width="42" height="34" rx="6" ${g}/>${bv(68, 0, 48)}`],
        ['Bouchon', 'M', `${hexa(-44, -26, 40, 52)}<rect x="-4" y="-17" width="40" height="34" rx="3" fill="#fff" stroke="${NV}" stroke-width="2.5"/>${fils(2, 34, -15, 15)}`],
        ['Mamelon', 'M · M', `${hexa(-22, -26, 44, 52)}<rect x="-68" y="-17" width="46" height="34" rx="3" fill="#fff" stroke="${NV}" stroke-width="2.5"/>${fils(-66, -24, -15, 15)}<rect x="22" y="-17" width="46" height="34" rx="3" fill="#fff" stroke="${NV}" stroke-width="2.5"/>${fils(24, 66, -15, 15)}`]
      ];
      return cadre(`${defs}${L.map(([n, c, d], i) => { const x = 135 + (i % 3) * 265, y = 100 + Math.floor(i / 3) * 170;
        return `<g transform="translate(${x},${y}) scale(1.1)">${d}</g><text x="${x}" y="${y + 84}" text-anchor="middle" class="cz-txt">${n}</text><text x="${x}" y="${y + 106}" text-anchor="middle" class="cz-pt">${c}</text>`; }).join('')}
        <text x="400" y="452" text-anchor="middle" class="cz-txt">M = mâle : filetage à l’extérieur</text>
        <text x="400" y="480" text-anchor="middle" class="cz-txt">F = femelle : taraudage à l’intérieur</text>`, 'Les raccords à visser');
    }

    if (etat === 'serrer') {
      return cadre(`${defs}
        ${T(70, 710, 250, 40, 'noir')}
        <rect x="300" y="150" width="140" height="78" rx="8" fill="url(#cz-ac)" stroke="${ST}" stroke-width="3"/>
        <rect x="300" y="272" width="140" height="78" rx="8" fill="url(#cz-ac)" stroke="${ST}" stroke-width="3"/>
        <line x1="370" y1="150" x2="370" y2="100" stroke="${ST}" stroke-width="10"/><rect x="326" y="86" width="88" height="16" rx="6" fill="#2c333b"/>
        ${coupeTube(570, 250)}
        <line x1="440" y1="392" x2="710" y2="392" class="cz-cote"/>
        <text x="575" y="424" text-anchor="middle" class="cz-txt">le bout qui dépasse : juste ce qu’il faut</text>
        ${etiquette(300, 330, 190, 440, 'Étau serre-tube')}
        ${etiquette(570, 190, 600, 110, 'Coupe-tube acier')}
        <text x="400" y="480" text-anchor="middle" class="cz-pt">Mors propres, tube bien serré : il ne doit ni glisser, ni tourner</text>`, 'Serrer le tube dans l’étau');
    }

    if (etat === 'alesage') {
      return cadre(`${defs}
        <rect x="100" y="180" width="470" height="30" fill="url(#cz-p-noir)" stroke="#23272c" stroke-width="2"/>
        <rect x="100" y="290" width="470" height="30" fill="url(#cz-p-noir)" stroke="#23272c" stroke-width="2"/>
        <rect x="100" y="210" width="470" height="80" fill="#f1e8dc"/>
        <path d="M570 210 l-22 10 v-10 z M570 290 l-22 -10 v10 z" fill="#c9451a"/>
        <path d="M440 250 L555 218 V282 Z" fill="url(#cz-p-inox)" stroke="#6c7782" stroke-width="3"/>
        <rect x="555" y="236" width="80" height="28" fill="url(#cz-ac)" stroke="${ST}" stroke-width="2"/>
        <path d="M635 250 L705 150" stroke="#2c333b" stroke-width="22" stroke-linecap="round"/><path d="M635 250 L705 150" stroke="url(#cz-ac)" stroke-width="16" stroke-linecap="round"/>
        <circle cx="712" cy="140" r="22" fill="#c9631a" stroke="#6a3208" stroke-width="3"/>
        <path d="M600 330 a52 52 0 0 0 70 -4" fill="none" stroke="#c9451a" stroke-width="5" marker-end="url(#cz-fl)"/>
        ${etiquette(500, 250, 380, 392, 'Alésoir à cliquet')}
        ${etiquette(548, 214, 200, 118, 'Bavure à enlever')}
        <text x="400" y="470" text-anchor="middle" class="cz-pt">Le bout du tube vu en coupe : on lisse l’intérieur, on ne creuse pas</text>`, 'Ébavurer l’intérieur du tube');
    }

    if (etat === 'filiere' || etat === 'copeaux') {
      const copeaux = etat === 'copeaux';
      return cadre(`${defs}${filiere(copeaux ? '#d8452f' : '#d8452f')}
        ${copeaux ? `<g class="cz-tombe"><path d="M470 345 q10 -8 14 2 q4 10 -6 12" fill="none" stroke="#454b53" stroke-width="5"/></g>
          <g class="cz-tombe2"><path d="M500 350 q10 -8 14 2 q4 10 -6 12" fill="none" stroke="#454b53" stroke-width="5"/></g>
          <g class="cz-tombe3"><path d="M530 345 q10 -8 14 2 q4 10 -6 12" fill="none" stroke="#454b53" stroke-width="5"/></g>
          <path d="M404 238 a46 46 0 1 0 -4 60" fill="none" stroke="#c9451a" stroke-width="6" marker-end="url(#cz-fl)"/>
          <text x="60" y="110" class="cz-txt">Un tour en arrière :</text><text x="60" y="138" class="cz-pt">les copeaux se cassent</text>
          <circle cx="440" cy="228" r="7" fill="#e6b422"/><circle cx="470" cy="224" r="7" fill="#e6b422"/><circle cx="500" cy="228" r="7" fill="#e6b422"/>
          ${etiquette(470, 224, 520, 110, 'Huile de coupe')}` : `
          <rect x="60" y="372" width="34" height="34" rx="4" fill="#d8452f" stroke="#2c333b" stroke-width="2"/><text x="108" y="398" class="cz-txt">tête rouge : filetage à droite</text>
          <rect x="60" y="418" width="34" height="34" rx="4" fill="#f2c230" stroke="#2c333b" stroke-width="2"/><text x="108" y="444" class="cz-txt">tête jaune : filetage à gauche</text>
          ${etiquette(486, 232, 560, 96, 'Tête : 4 peignes')}
          ${etiquette(550, 270, 620, 200, 'Cage à cliquet')}`}
        <text x="400" y="486" text-anchor="middle" class="cz-pt">${copeaux ? 'Dès que la filière force : huile, puis un tour en arrière' : 'Le diamètre de la tête est le diamètre du tube'}</text>`, copeaux ? 'Fileter et casser les copeaux' : 'Choisir la tête de filière');
    }

    if (etat === 'fin') {
      const T3 = [['3/8″', '10'], ['1/2″', '13'], ['3/4″', '15'], ['1″', '17'], ['1″1/4', '19'], ['1″1/2', '19'], ['2″', '24']];
      return cadre(`${defs}${T(40, 470, 200, 70, 'noir')}
        ${Array.from({ length: 10 }, (_, i) => `<line x1="${350 + i * 12}" y1="166" x2="${360 + i * 12}" y2="234" stroke="#23272c" stroke-width="3"/>`).join('')}
        <line x1="344" y1="270" x2="470" y2="270" class="cz-cote"/>
        <text x="407" y="306" text-anchor="middle" class="cz-txt">longueur utile</text>
        ${bloc(60, 352, 'Le bout du tube arrive à fleur des peignes', 34, 'cz-txt')}
        <rect x="520" y="70" width="260" height="360" rx="12" fill="#fffdf8" stroke="#1b3a63" stroke-width="2.5"/>
        <rect x="520" y="70" width="260" height="46" rx="12" fill="#1b3a63"/><rect x="520" y="96" width="260" height="20" fill="#1b3a63"/>
        <text x="650" y="102" text-anchor="middle" class="cz-bl">Longueur utile (mm)</text>
        ${T3.map(([a, b], i) => { const on = a === '3/4″'; return `<rect x="520" y="${116 + i * 44}" width="260" height="44" fill="${on ? '#ffd89a' : i % 2 ? '#f6efe3' : '#fffdf8'}" stroke="${on ? '#c9451a' : '#d9cfbd'}" stroke-width="${on ? 3 : 1}"/>
          <text x="548" y="${146 + i * 44}" class="cz-txt">${a}</text><text x="752" y="${146 + i * 44}" text-anchor="end" class="cz-txt">${b} mm</text>`; }).join('')}
        <text x="400" y="476" text-anchor="middle" class="cz-pt">Tube 3/4″ : 15 mm de filetage utile</text>`, 'Le filetage terminé');
    }

    if (etat === 'etancheite') {
      return cadre(`${defs}${T(70, 560, 250, 100, 'noir')}
        ${Array.from({ length: 16 }, (_, i) => `<line x1="${290 + i * 15}" y1="200" x2="${300 + i * 15}" y2="300" stroke="#1b1f23" stroke-width="3" opacity=".7"/>`).join('')}
        ${Array.from({ length: 6 }, (_, i) => `<path d="M${300 + i * 26} 198 l14 102" stroke="#ecd9a8" stroke-width="12" stroke-linecap="round"/><path d="M${300 + i * 26} 198 l14 102" stroke="#b9a06a" stroke-width="2" stroke-linecap="round" opacity=".7"/>`).join('')}
        <path d="M330 142 a96 36 0 0 1 150 0" fill="none" stroke="#c9451a" stroke-width="6" marker-end="url(#cz-fl)"/>
        <text x="405" y="116" text-anchor="middle" class="cz-txt">sens du vissage</text>
        ${etiquette(380, 300, 420, 400, 'Filasse (chanvre)')}
        ${etiquette(535, 250, 540, 150, 'Deux pas libres')}
        <ellipse cx="660" cy="340" rx="44" ry="30" fill="#f2c230" stroke="#8a6d00" stroke-width="3"/>
        ${etiquette(660, 340, 560, 430, 'Pâte d’étanchéité', 'cz-txt', 'end')}
        <text x="400" y="480" text-anchor="middle" class="cz-pt">On enroule dans le sens du vissage, puis on enduit de pâte</text>`, 'Rendre le filetage étanche');
    }

    if (etat === 'serrage' || etat === 'vide') {
      if (etat === 'vide') return cadre(`${defs}
        ${rond(220, 250, 90, 18, 'galva')}
        <ellipse cx="580" cy="250" rx="118" ry="68" fill="none" stroke="url(#cz-p-galva)" stroke-width="18"/><ellipse cx="580" cy="250" rx="118" ry="68" fill="none" stroke="#6c7782" stroke-width="2"/>
        <path d="M580 120 v50 m0 0 l-10 -12 m10 12 l10 -12 M580 380 v-50 m0 0 l-10 12 m10 -12 l10 12" stroke="#c9451a" stroke-width="6" fill="none" stroke-linecap="round"/>
        <text x="220" y="390" text-anchor="middle" class="cz-txt">Raccord rond</text>
        ${verdict(false, 'Serré « à vide » : il s’ovalise', 580, 410)}
        <text x="400" y="470" text-anchor="middle" class="cz-pt">On visse toujours le tube avant de serrer à la clé</text>`, 'Raccord serré à vide');
      return cadre(`${defs}${T(60, 322, 250, 56, 'noir')}
        ${[0, 1, 2].map(i => `<line x1="${290 + i * 14}" y1="222" x2="${298 + i * 14}" y2="278" stroke="#23272c" stroke-width="3"/>`).join('')}
        <rect x="334" y="212" width="150" height="76" rx="10" fill="url(#cz-p-galva)" stroke="#6c7782" stroke-width="3"/>
        <line x1="380" y1="212" x2="380" y2="288" stroke="#6c7782" stroke-width="2"/><line x1="438" y1="212" x2="438" y2="288" stroke="#6c7782" stroke-width="2"/>
        <path d="M400 214 L580 100" stroke="#2c333b" stroke-width="30" stroke-linecap="round"/><path d="M400 214 L580 100" stroke="url(#cz-rouge)" stroke-width="22" stroke-linecap="round"/>
        <path d="M376 206 h56 v14 h-56 z" fill="url(#cz-ac)" stroke="${ST}" stroke-width="2"/>
        ${T(484, 700, 250, 56, 'noir')}
        ${etiquette(300, 252, 260, 360, 'Deux filets visibles')}
        ${etiquette(560, 112, 640, 60, 'Clé à tube')}
        ${etiquette(410, 288, 470, 360, 'Manchon')}
        <text x="400" y="470" text-anchor="middle" class="cz-pt">On s’arrête à deux filets du bout : pas plus</text>`, 'Visser et serrer');
    }

    /* par défaut : le tube dans l'étau */
    return CuivFigures.dessiner('acier', 'serrer');
  });

  /* ------------------------------------------------------------------ le soudage (principe, sécurité) */
  CuivFigures.ajouter('soudure', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'arc') {
      return cadre(`${defs}
        <rect x="90" y="332" width="300" height="40" fill="url(#cz-p-noir)" stroke="#23272c" stroke-width="2"/><rect x="430" y="332" width="280" height="40" fill="url(#cz-p-noir)" stroke="#23272c" stroke-width="2"/>
        <path d="M388 332 h44 v40 h-44 z" fill="#e6891f" stroke="#8a4a0a" stroke-width="2"/>
        <path d="M432 326 q40 -6 100 0 v8 h-100 z" fill="#4a3a2e" stroke="#2a1f17" stroke-width="2"/>
        <path d="M560 118 L418 322" stroke="#8a5a1e" stroke-width="12" stroke-linecap="round"/><path d="M560 118 L418 322" stroke="#d9a561" stroke-width="7" stroke-linecap="round"/>
        <rect x="548" y="82" width="44" height="64" rx="10" transform="rotate(35 570 114)" fill="#2c333b" stroke="#111" stroke-width="2"/>
        <path d="M588 92 q60 -50 120 -30" fill="none" stroke="#2c333b" stroke-width="7"/>
        <circle cx="408" cy="330" r="22" fill="#fff6c0" opacity=".85"/>
        <path d="M418 322 l-10 9 l12 4 l-12 9" fill="none" stroke="#f2b61f" stroke-width="4" stroke-linejoin="round"/>
        <rect x="96" y="372" width="30" height="26" rx="4" fill="url(#cz-ac)" stroke="${ST}" stroke-width="2"/><path d="M96 386 q-60 20 -50 -80" fill="none" stroke="#2c333b" stroke-width="7"/>
        ${etiquette(576, 100, 610, 170, 'Porte-électrode')}
        ${etiquette(490, 224, 560, 282, 'Électrode enrobée')}
        ${etiquette(408, 336, 250, 430, 'Arc électrique : ≈ 6 000 °C', 'cz-txt', 'start')}
        ${etiquette(510, 330, 600, 420, 'Laitier à piquer')}
        ${etiquette(110, 385, 60, 456, 'Pince de masse', 'cz-txt', 'start')}
        <text x="400" y="42" text-anchor="middle" class="cz-pt">L’électrode fond et fournit le métal d’apport ; son enrobage protège le bain</text>`, 'Le soudage à l’arc');
    }
    if (etat === 'epi') {
      const NV = '#1b3a63', OR = '#e6891f', CUIR = '#ead9bd';
      const tuile = (x, y, ico, titre) => `<rect x="${x}" y="${y}" width="360" height="196" rx="14" fill="#fffdf8" stroke="${NV}" stroke-width="2.5"/><g transform="translate(${x + 14},${y + 14})">${ico}</g>${bloc(x + 196, y + 80, titre, 15, 'cz-txt', 'start', 28)}`;
      /* casque de soudeur (écran noir, serre-tête réglable) et lunettes teintées à coques latérales */
      const masque = `<path d="M12 92 Q12 14 70 14 Q128 14 128 92 V132 H12 Z" fill="#cfd9e5" stroke="${NV}" stroke-width="3"/>
        <rect x="28" y="52" width="84" height="42" rx="8" fill="${NV}"/><path d="M36 60 L60 60 L44 86 L36 86 Z" fill="#fff" opacity=".25"/>
        <path d="M30 14 Q70 -4 110 14" fill="none" stroke="${NV}" stroke-width="5"/><circle cx="70" cy="2" r="7" fill="${OR}" stroke="${NV}" stroke-width="2.5"/>
        <path d="M12 118 H128" stroke="${NV}" stroke-width="2"/>
        <g transform="translate(34,138)"><circle cx="14" cy="14" r="13" fill="#cfe3f0" stroke="${NV}" stroke-width="2.5"/><circle cx="58" cy="14" r="13" fill="#cfe3f0" stroke="${NV}" stroke-width="2.5"/><path d="M27 12 q7 -5 18 0" fill="none" stroke="${NV}" stroke-width="3"/><path d="M1 14 H-10 M71 14 H82" stroke="${OR}" stroke-width="4" stroke-linecap="round"/><rect x="-2" y="6" width="6" height="16" rx="2" fill="${NV}"/><rect x="66" y="6" width="6" height="16" rx="2" fill="${NV}"/></g>`;
      /* gant à crispin en cuir : doigts, pouce, manchette longue, couture */
      const gant = `<path d="M34 80 L34 34 Q34 24 44 24 Q54 24 54 34 L54 74 L54 20 Q54 10 64 10 Q74 10 74 20 L74 74 L74 24 Q74 14 84 14 Q94 14 94 24 L94 76 L94 38 Q94 28 104 28 Q112 28 112 38 L112 92 Q112 112 96 118 H44 Q34 112 34 100 L18 74 Q10 62 22 58 Q32 56 34 68 Z" fill="${CUIR}" stroke="${NV}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M32 116 H114 L124 164 H22 Z" fill="${CUIR}" stroke="${NV}" stroke-width="3" stroke-linejoin="round"/><path d="M36 128 H110" stroke="${OR}" stroke-width="3" stroke-dasharray="6 5"/><path d="M54 74 V100 M74 74 V100 M94 76 V100" stroke="${NV}" stroke-width="1.6"/>`;
      /* tablier de cuir : plastron, lanière de cou, liens de taille, poche */
      const tablier = `<path d="M44 40 Q70 -2 96 40" fill="none" stroke="${NV}" stroke-width="5"/><path d="M44 40 H96 L102 84 L128 150 H12 L38 84 Z" fill="${CUIR}" stroke="${NV}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M38 84 H102" stroke="${NV}" stroke-width="2"/><path d="M38 84 L4 96 M102 84 L136 96" stroke="${OR}" stroke-width="5" stroke-linecap="round"/><rect x="48" y="104" width="44" height="30" rx="4" fill="none" stroke="${NV}" stroke-width="2.5"/><path d="M52 112 H88" stroke="${OR}" stroke-width="2.5" stroke-dasharray="5 4"/>`;
      /* bras d'aspiration : socle, gaine annelée, hotte évasée au-dessus de la pièce ; les fumées montent dans la hotte */
      const hotte = `<ellipse cx="22" cy="150" rx="20" ry="8" fill="#cfd9e5" stroke="${NV}" stroke-width="2.5"/><path d="M22 146 V108 Q22 50 66 46" fill="none" stroke="${NV}" stroke-width="16" stroke-linecap="round"/><path d="M22 146 V108 Q22 50 66 46" fill="none" stroke="#cfd9e5" stroke-width="11" stroke-linecap="round"/>
        <path d="M22 146 V108 Q22 50 66 46" fill="none" stroke="${NV}" stroke-width="11" stroke-dasharray="1.5 9" stroke-linecap="butt"/>
        <path d="M62 26 L104 38 L96 78 L56 66 Z" fill="#cfd9e5" stroke="${NV}" stroke-width="3" stroke-linejoin="round"/><path d="M72 40 L92 46" stroke="#fff" stroke-width="3" opacity=".6"/>
        <rect x="60" y="128" width="76" height="14" rx="3" fill="#fff" stroke="${NV}" stroke-width="2.5"/><path d="M84 122 q-8 -16 4 -26 q8 -10 0 -20 M106 122 q-8 -16 4 -26 q8 -10 0 -20" fill="none" stroke="${OR}" stroke-width="3.5" stroke-linecap="round"/>`;
      return cadre(`${defs}${tuile(30, 40, masque, 'Lunettes teintées (flamme) ou masque (arc)')}${tuile(410, 40, gant, 'Gants de cuir')}
        ${tuile(30, 250, tablier, 'Tablier de cuir, jamais de nylon')}${tuile(410, 250, hotte, 'Aspiration des fumées')}
        <text x="400" y="486" text-anchor="middle" class="cz-pt">Se protéger avant d’allumer : la flamme et l’arc ne pardonnent pas</text>`, 'Les protections du soudeur');
    }
    if (etat === 'galva') {
      return cadre(`${defs}${T(60, 360, 300, 56, 'galva')}
        <path d="M150 360 q10 -34 24 -4 q8 -26 24 2 q8 -30 26 2 l-8 30 h-66z" fill="#f7a233" stroke="#c9631a" stroke-width="2.5"/>
        <path d="M120 230 q-20 -26 0 -46 q20 -20 0 -44 M190 226 q-20 -26 0 -46 q20 -20 0 -44 M260 230 q-20 -26 0 -46 q20 -20 0 -44" fill="none" stroke="#8a929b" stroke-width="7" stroke-linecap="round" opacity=".8"/>
        <text x="210" y="100" text-anchor="middle" class="cz-ko" style="font-size:34px">✘</text>
        ${bloc(210, 430, 'Au chalumeau, le zinc brûle (≈ 900 °C) : fumées dangereuses', 40, 'cz-txt', 'middle', 26)}
        <path d="M388 300 h60" stroke="#1b3a63" stroke-width="5" marker-end="url(#cz-fl)"/>
        <rect x="460" y="130" width="320" height="250" rx="14" fill="#e3f5ec" stroke="#1e7e54" stroke-width="4"/>
        <text x="620" y="176" text-anchor="middle" class="cz-ok" style="font-size:30px">✔ À la place</text>
        ${bloc(620, 222, 'On le visse, ou on le soudo-braze : le métal d’apport fond vers 700 à 800 °C.', 24, 'cz-txt', 'middle', 28)}
        ${bloc(620, 332, 'Avec aspiration des fumées', 24, 'cz-txt', 'middle', 28)}`, 'Le galvanisé ne se soude pas');
    }
    /* par défaut : la flamme et la baguette, autogène */
    return cadre(`${defs}${T(110, 400, 320, 62, 'noir')}${T(400, 690, 320, 62, 'noir')}
      <path d="M370 288 q30 -22 60 0 q20 14 0 26 q-30 12 -60 0 q-20 -14 0 -26z" fill="#e6891f" stroke="#8a4a0a" stroke-width="2.5"/>
      <g transform="translate(230,130) rotate(38)">
        <rect x="0" y="-14" width="120" height="28" rx="6" fill="url(#cz-p-laiton)" stroke="#6e5010" stroke-width="2.5"/>
        <rect x="120" y="-7" width="52" height="14" rx="3" fill="url(#cz-p-laiton)" stroke="#6e5010" stroke-width="2.5"/>
        <path d="M172 0 L210 -9 Q232 0 210 9 Z" fill="#f7a233"/><path d="M172 0 L194 -4 L194 4 Z" fill="#5aaeea"/>
        <rect x="-30" y="-8" width="32" height="16" fill="#c9451a"/><rect x="-30" y="2" width="32" height="6" fill="#1f5a9e"/></g>
      <path d="M690 170 L418 286" stroke="#b58a3a" stroke-width="7" stroke-linecap="round"/>
      ${etiquette(280, 170, 100, 70, 'Chalumeau oxyacétylénique', 'cz-txt', 'start')}
      ${etiquette(620, 202, 626, 110, 'Baguette')}<text x="632" y="138" class="cz-pt">de même métal</text>
      ${etiquette(400, 310, 520, 420, 'Cordon de soudure', 'cz-txt', 'start')}
      <text x="120" y="440" class="cz-txt">≈ 1 500 °C : l’acier fond</text>
      <text x="400" y="482" text-anchor="middle" class="cz-pt">Les bords et la baguette fondent ensemble : un seul bloc, une soudure autogène</text>`, 'Le soudage à la flamme');
  });

  /* ------------------------------------------------------------------ le sertissage (générique : acier, inox, multicouche) */
  CuivFigures.ajouter('sertissage', (etat, { cadre, etiquette, verdict }) => {
    const raccord = (x0, x1, y, d) => `<rect x="${x0}" y="${y - d / 2}" width="${x1 - x0}" height="${d}" rx="8" fill="url(#cz-p-galva)" stroke="#6c7782" stroke-width="3"/>`;
    if (etat === 'repere') {
      return cadre(`${defs}${raccord(320, 560, 250, 96)}${T(70, 460, 250, 54, 'noir')}${T(560, 740, 250, 54, 'noir')}
        <line x1="440" y1="196" x2="440" y2="304" stroke="#1b3a63" stroke-width="2.5" stroke-dasharray="6 5"/>
        <rect x="316" y="214" width="9" height="72" rx="2" fill="#c9451a"/>
        ${etiquette(320, 250, 200, 130, 'Repère au feutre')}
        ${etiquette(440, 196, 520, 120, 'Butée du raccord')}
        <text x="400" y="400" text-anchor="middle" class="cz-txt">Tube enfoncé à fond, puis on marque</text>
        <text x="400" y="440" text-anchor="middle" class="cz-pt">Si le repère s’éloigne du raccord, le tube n’était pas à fond</text>`, 'Marquer l’emmanchement');
    }
    if (etat === 'sertir') {
      return cadre(`${defs}${T(70, 330, 250, 54, 'noir')}${raccord(330, 470, 250, 96)}
        <path d="M335 140 h130 v68 h-26 l-14 -18 h-50 l-14 18 h-26 z" fill="url(#cz-p-inox)" stroke="${ST}" stroke-width="3"/>
        <path d="M335 360 h130 v-68 h-26 l-14 18 h-50 l-14 -18 h-26 z" fill="url(#cz-p-inox)" stroke="${ST}" stroke-width="3"/>
        <path d="M465 160 h40 q50 0 130 30 v120 q-80 30 -130 30 h-40 z" fill="url(#cz-rouge)" stroke="#6d1610" stroke-width="3"/>
        <rect x="600" y="300" width="70" height="120" rx="14" fill="#2c333b" stroke="#111" stroke-width="2"/>
        <circle cx="530" cy="250" r="22" fill="#2c333b" opacity=".8"/>
        <path d="M400 96 v32 m0 0 l-10 -12 m10 12 l10 -12 M400 404 v-32 m0 0 l-10 12 m10 -12 l10 12" stroke="#c9451a" stroke-width="6" fill="none" stroke-linecap="round"/>
        ${etiquette(400, 160, 210, 100, 'Mâchoire')}
        ${etiquette(560, 190, 600, 110, 'Sertisseuse')}
        ${etiquette(635, 400, 560, 456, 'Gâchette : jusqu’à la fin du cycle', 'cz-txt', 'end')}
        <text x="400" y="488" text-anchor="middle" class="cz-pt">Mâchoire du même diamètre que le raccord ; on presse jusqu’au bout du cycle</text>`, 'Sertir avec la bonne mâchoire');
    }
    if (etat === 'controle') {
      return cadre(`${defs}${T(70, 330, 250, 54, 'noir')}
        <rect x="330" y="204" width="230" height="92" rx="8" fill="url(#cz-p-galva)" stroke="#6c7782" stroke-width="3"/>
        <path d="M376 204 q-8 46 0 92 M514 204 q8 46 0 92" fill="none" stroke="#6c7782" stroke-width="5"/>
        <rect x="326" y="214" width="8" height="72" rx="2" fill="#c9451a"/>${T(560, 740, 250, 54, 'noir')}
        ${etiquette(330, 250, 200, 130, 'Repère au bord')}
        ${etiquette(376, 296, 300, 372, 'Sertissage marqué')}
        ${verdict(true, 'Repère au bord : le tube était à fond', 400, 450)}`, 'Contrôler le sertissage');
    }
    /* par défaut : le raccord en coupe, ses deux joints, les mâchoires qui se ferment */
    return cadre(`${defs}
      <path d="M300 180 h250 v140 h-250 z" fill="url(#cz-p-galva)" stroke="#6c7782" stroke-width="3"/>
      <rect x="150" y="216" width="330" height="68" fill="url(#cz-p-noir)" stroke="#23272c" stroke-width="2"/>
      <rect x="300" y="216" width="250" height="68" fill="none"/>
      <rect x="330" y="216" width="190" height="68" fill="#f1e8dc" opacity="0"/>
      ${[345, 505].map(x => `<circle cx="${x}" cy="213" r="13" fill="#2c333b" stroke="#111" stroke-width="2"/><circle cx="${x}" cy="287" r="13" fill="#2c333b" stroke="#111" stroke-width="2"/>`).join('')}
      <path d="M270 110 h300 v52 h-40 l-24 -26 h-172 l-24 26 h-40 z" fill="url(#cz-p-inox)" stroke="${ST}" stroke-width="3"/>
      <path d="M270 390 h300 v-52 h-40 l-24 26 h-172 l-24 -26 h-40 z" fill="url(#cz-p-inox)" stroke="${ST}" stroke-width="3"/>
      <path d="M420 66 v36 m0 0 l-10 -12 m10 12 l10 -12 M420 434 v-36 m0 0 l-10 12 m10 -12 l10 12" stroke="#c9451a" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${etiquette(505, 213, 600, 200, 'Joint élastomère')}
      ${etiquette(540, 136, 600, 120, 'Mâchoires')}
      ${etiquette(200, 250, 140, 380, 'Tube à fond')}
      <text x="400" y="486" text-anchor="middle" class="cz-pt">La presse écrase le raccord sur le tube : le joint fait l’étanchéité</text>`, 'Le sertissage, en coupe');
  });
})();

/* CuivRézo — figures du tube : section, pied à coulisse, couronne et barre, bouts de tube.
   CONTRAT : enregistre « tube » (section · pied · couronne-barre · bouchons)
   et « bout » (equerre · biais · bavure · propre · ovale) dans CuivFigures. */

(() => {
  'use strict';

  /* tube vu de côté, horizontal : x0 → x1, axe en y, diamètre d */
  const tubeCote = (x0, x1, y, d, bout) =>
    `<rect x="${x0}" y="${y - d / 2}" width="${x1 - x0}" height="${d}" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>`
    + (bout === 'rond' ? `<ellipse cx="${x1}" cy="${y}" rx="${d / 7}" ry="${d / 2}" fill="#7a3f15" stroke="#6e3a14" stroke-width="2"/>
       <ellipse cx="${x1}" cy="${y}" rx="${d / 11}" ry="${d / 2 - 6}" fill="#2a1609"/>` : '');

  CuivFigures.ajouter('tube', (etat, { cadre, etiquette }) => {
    if (etat === 'pied') {
      /* bout du tube vu en face, serré entre les becs d'un pied à coulisse numérique */
      const cx = 330, cy = 300, R = 95, e = 14;
      return cadre(`
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#cz-cu-r)" stroke="#6e3a14" stroke-width="3"/>
        <circle cx="${cx}" cy="${cy}" r="${R - e}" fill="#2a1609"/>
        <rect x="120" y="110" width="520" height="46" rx="6" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        ${Array.from({ length: 25 }, (_, i) => `<line x1="${140 + i * 20}" y1="156" x2="${140 + i * 20}" y2="${i % 5 ? 146 : 138}" stroke="#2c333b" stroke-width="2"/>`).join('')}
        <path d="M${cx - R - 40} 110 h40 v${cy - 110} h-10 l-30 -40 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <path d="M${cx + R} 110 h40 v${cy - 150} l-30 40 h-10 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <rect x="${cx + R + 40}" y="84" width="170" height="96" rx="10" fill="#e4e8ec" stroke="#4d5763" stroke-width="2"/>
        <rect x="${cx + R + 56}" y="98" width="138" height="46" rx="4" fill="#cfe3c4" stroke="#4d5763"/>
        <text x="${cx + R + 125}" y="131" text-anchor="middle" style="font:700 30px Consolas,monospace;fill:#10233c">9,52</text>
        <text x="${cx + R + 125}" y="168" text-anchor="middle" class="cz-pt">mm</text>
        ${etiquette(cx - R - 20, cy - 70, 150, 420, 'Bec fixe')}
        ${etiquette(cx + R + 20, cy - 70, 560, 290, 'Bec mobile')}
        ${etiquette(cx + R + 125, 180, 560, 360, 'Lecture : 9,52 mm')}
        <text x="560" y="410" class="cz-txt">= tube 3/8″</text>
        <text x="400" y="470" text-anchor="middle" class="cz-pt">Les becs touchent le tube sans le serrer : on lit le diamètre EXTÉRIEUR</text>`, 'Mesurer un tube au pied à coulisse');
    }
    if (etat === 'couronne-barre') {
      /* la couronne vue de dessus : une galette de spires, trou au centre */
      const spires = [0, 1, 2, 3, 4].map(i => `<ellipse cx="220" cy="270" rx="${150 - i * 17}" ry="${80 - i * 9}" fill="none" stroke="#6e3a14" stroke-width="15"/>
        <ellipse cx="220" cy="270" rx="${150 - i * 17}" ry="${80 - i * 9}" fill="none" stroke="url(#cz-cu-h)" stroke-width="11"/>`).join('');
      return cadre(`
        ${spires}
        ${[0, 1, 2].map(i => `<rect x="450" y="${170 + i * 44}" width="300" height="22" rx="4" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>`).join('')}
        <text x="220" y="90" text-anchor="middle" class="cz-txt">La couronne</text>
        <text x="220" y="118" text-anchor="middle" class="cz-pt">cuivre recuit : il se cintre</text>
        <text x="600" y="90" text-anchor="middle" class="cz-txt">La barre</text>
        <text x="600" y="118" text-anchor="middle" class="cz-pt">cuivre écroui : il reste droit</text>
        <text x="400" y="440" text-anchor="middle" class="cz-pt">Même métal, deux états : l’un se plie à la main, l’autre non</text>`, 'Couronne et barre');
    }
    if (etat === 'bouchons') {
      return cadre(`
        ${tubeCote(110, 560, 230, 70)}
        <rect x="540" y="185" width="70" height="90" rx="14" fill="#f2c230" stroke="#8a6d00" stroke-width="3"/>
        <rect x="70" y="185" width="60" height="90" rx="14" fill="#f2c230" stroke="#8a6d00" stroke-width="3"/>
        ${etiquette(590, 190, 680, 120, 'Bouchon')}
        <text x="400" y="360" text-anchor="middle" class="cz-txt">Un tube neuf reste bouché jusqu’au dernier moment</text>
        <text x="400" y="395" text-anchor="middle" class="cz-pt">poussière, humidité et copeaux n’ont rien à faire dans un circuit</text>`, 'Tube bouché');
    }
    /* par défaut : la section, diamètre extérieur et épaisseur */
    const cx = 300, cy = 270, R = 150, e = 24;
    return cadre(`
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#cz-cu-r)" stroke="#6e3a14" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy}" r="${R - e}" fill="#fbf6ee" stroke="#6e3a14" stroke-width="2"/>
      <line x1="${cx - R}" y1="${cy - R - 40}" x2="${cx - R}" y2="${cy - 20}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>
      <line x1="${cx + R}" y1="${cy - R - 40}" x2="${cx + R}" y2="${cy - 20}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>
      <line x1="${cx - R}" y1="${cy - R - 26}" x2="${cx + R}" y2="${cy - R - 26}" class="cz-cote"/>
      <text x="${cx}" y="${cy - R - 38}" text-anchor="middle" class="cz-txt">Diamètre extérieur</text>
      ${etiquette(cx + R - e / 2, cy + 12, 560, 300, 'Épaisseur de la paroi')}
      ${etiquette(cx + 60, cy + 60, 560, 380, 'Le fluide passe ici')}
      <text x="560" y="200" class="cz-pt">Un tube frigorifique</text>
      <text x="560" y="228" class="cz-pt">se nomme par son</text>
      <text x="560" y="256" class="cz-pt">diamètre EXTÉRIEUR</text>`, 'Section d’un tube');
  });

  CuivFigures.ajouter('bout', (etat, { cadre, etiquette, verdict }) => {
    const y = 250, d = 110;
    if (etat === 'biais') return cadre(`
      <path d="M120 ${y - d / 2} H560 L520 ${y + d / 2} H120 Z" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
      <line x1="${560}" y1="120" x2="${560}" y2="380" stroke="#1b3a63" stroke-width="2" stroke-dasharray="8 6"/>
      ${etiquette(540, y, 640, 170, 'Face en biais')}
      ${verdict(false, 'Coupe en biais : le raccord ne portera pas', 400, 450)}`, 'Coupe en biais');
    if (etat === 'bavure' || etat === 'propre') {
      const ok = etat === 'propre';
      /* coupe longitudinale : on voit les deux parois et, au bout, le bourrelet intérieur */
      const lev = ok ? '' : `<path d="M560 ${y - d / 2 + 18} q-22 6 -40 22 h40 z" fill="#8f4f1f"/><path d="M560 ${y + d / 2 - 18} q-22 -6 -40 -22 h40 z" fill="#8f4f1f"/>`;
      return cadre(`
        <rect x="120" y="${y - d / 2}" width="440" height="18" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
        <rect x="120" y="${y + d / 2 - 18}" width="440" height="18" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
        <rect x="120" y="${y - d / 2 + 18}" width="440" height="${d - 36}" fill="#f1e4d4"/>
        ${lev}
        <line x1="120" y1="${y}" x2="600" y2="${y}" stroke="#56657a" stroke-width="1.5" stroke-dasharray="10 6"/>
        ${ok ? etiquette(556, y - d / 2 + 9, 650, 150, 'Bord net') : etiquette(545, y - d / 2 + 30, 560, 150, 'Bavure intérieure')}
        <text x="160" y="150" class="cz-pt">Tube vu en coupe</text>
        ${verdict(ok, ok ? 'Sans bavure : le passage est entier' : 'Bavure : le passage est rétréci', 400, 450)}`, ok ? 'Bout propre' : 'Bavure intérieure');
    }
    if (etat === 'ovale') return cadre(`
      <circle cx="250" cy="${y}" r="100" fill="url(#cz-cu-r)" stroke="#6e3a14" stroke-width="3"/><circle cx="250" cy="${y}" r="84" fill="#2a1609"/>
      <ellipse cx="560" cy="${y}" rx="122" ry="78" fill="url(#cz-cu-r)" stroke="#6e3a14" stroke-width="3"/><ellipse cx="560" cy="${y}" rx="106" ry="62" fill="#2a1609"/>
      ${verdict(true, 'Rond', 250, 400)}${verdict(false, 'Ovalisé', 560, 400)}
      <text x="400" y="460" text-anchor="middle" class="cz-pt">Un tube écrasé n’entre plus dans le raccord</text>`, 'Tube ovalisé');
    /* par défaut : coupe d'équerre contrôlée à l'équerre */
    return cadre(`
      ${tubeCote(120, 560, y, d, 'rond')}
      <path d="M580 110 h26 v280 h-26 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      <path d="M606 364 h120 v26 h-120 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      ${etiquette(606, 150, 680, 150, 'Équerre')}
      ${etiquette(565, y + 40, 680, 300, 'Face plane')}
      ${verdict(true, 'Coupe d’équerre : pas de jour entre l’équerre et le tube', 400, 460)}`, 'Coupe d’équerre');
  });
})();

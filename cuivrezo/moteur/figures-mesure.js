/* CuivRézo — figures de la mesure et du traçage.
   CONTRAT : enregistre « mesure » (butee · lecture · parallaxe · trait) dans CuivFigures.
   Principe tenu de tp-cintrage : on mesure contre une BUTÉE, jamais sur un repère virtuel.
   Échelle de « butee » : 1 mm = 5 unités (cote de 70 mm). */

(() => {
  'use strict';

  function ruban(x0, y, mmMax, px, pas) {
    let s = `<rect x="${x0}" y="${y}" width="${mmMax * px}" height="38" fill="#f2c230" stroke="#8a6d00" stroke-width="2"/>`;
    for (let m = 0; m <= mmMax; m += pas) {
      const x = x0 + m * px, h = m % 10 === 0 ? 20 : 11;
      s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="#2b2100" stroke-width="2"/>`;
      if (m % 10 === 0 && m > 0) s += `<text x="${x}" y="${y + 34}" text-anchor="middle" style="font:700 15px Calibri,Arial;fill:#2b2100">${m}</text>`;
    }
    return s;
  }

  CuivFigures.ajouter('mesure', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'lecture' || etat === 'parallaxe') {
      /* le ruban vu de près, de 60 à 80 mm : 1 mm = 30 unités */
      const x0 = 100, px = 30, y = 250, base = 60;
      let g = `<rect x="${x0 - 20}" y="${y}" width="${20 * px + 40}" height="60" fill="#f2c230" stroke="#8a6d00" stroke-width="2"/>`;
      for (let m = 0; m <= 20; m++) {
        const x = x0 + m * px, h = (base + m) % 10 === 0 ? 34 : (base + m) % 5 === 0 ? 24 : 14;
        g += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + h}" stroke="#2b2100" stroke-width="2.5"/>`;
        if ((base + m) % 10 === 0) g += `<text x="${x}" y="${y + 54}" text-anchor="middle" style="font:800 20px Calibri,Arial;fill:#2b2100">${base + m}</text>`;
      }
      const xt = x0 + 10 * px;
      g += `<rect x="${x0 - 20}" y="${y - 60}" width="${20 * px + 40}" height="52" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
            <line x1="${xt}" y1="${y - 60}" x2="${xt}" y2="${y - 8}" stroke="#10233c" stroke-width="3"/>`;
      if (etat === 'lecture') return cadre(`${g}
        <g transform="translate(${xt},90)"><ellipse rx="34" ry="20" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><circle r="10" fill="#1b3a63"/></g>
        <line x1="${xt}" y1="112" x2="${xt}" y2="${y - 62}" stroke="#1e7e54" stroke-width="3" stroke-dasharray="8 6"/>
        ${etiquette(xt, y - 34, 560, 150, 'Trait fin, pile sur 70')}
        ${verdict(true, 'L’œil juste au-dessus du trait : on lit 70 mm', 400, 440)}`, 'Lire la cote de face');
      const xf = xt + 2 * px;
      return cadre(`${g}
        <g transform="translate(${xt},90)"><ellipse rx="34" ry="20" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/><circle r="10" fill="#1b3a63"/></g>
        <line x1="${xt}" y1="112" x2="${xt}" y2="${y - 62}" stroke="#1e7e54" stroke-width="3" stroke-dasharray="8 6"/>
        <g transform="translate(${x0 + 18 * px},70)"><ellipse rx="34" ry="20" fill="#fffdf8" stroke="#b3261e" stroke-width="3"/><circle cx="-8" cy="4" r="10" fill="#b3261e"/></g>
        <line x1="${x0 + 18 * px - 20}" y1="90" x2="${xf}" y2="${y}" stroke="#b3261e" stroke-width="3" stroke-dasharray="8 6"/>
        ${verdict(true, 'De face : 70', 200, 420)}${verdict(false, 'De biais : on croit lire 72', 560, 420)}`, 'Erreur de lecture de biais');
    }
    if (etat === 'trait') {
      /* le tube de côté ; le trait fait le tour : devant en plein, derrière en pointillé */
      const y = 240, d = 110, x = 470;
      return cadre(`
        <rect x="90" y="${y - d / 2}" width="600" height="${d}" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
        <path d="M${x} ${y - d / 2} q18 ${d / 2} 0 ${d}" fill="none" stroke="#10233c" stroke-width="4"/>
        <path d="M${x} ${y - d / 2} q-18 ${d / 2} 0 ${d}" fill="none" stroke="#10233c" stroke-width="3" stroke-dasharray="7 6" opacity=".55"/>
        <g transform="translate(${x + 10},${y - d / 2 - 8}) rotate(35)"><rect x="-10" y="-150" width="20" height="130" rx="6" fill="#1b3a63"/><path d="M-10 -20 h20 l-10 20 z" fill="#10233c"/></g>
        ${etiquette(x + 9, y + 20, 520, 390, 'Le trait fait tout le tour')}
        <text x="526" y="425" class="cz-pt">le tube tourne,</text><text x="526" y="452" class="cz-pt">le feutre reste immobile</text>
        ${etiquette(120, y, 120, 400, 'Tube de 70 mm')}`, 'Le trait sur tout le tour');
    }
    /* par défaut : la mesure contre la butée, vue de dessus sur l'établi */
    const xb = 110, px = 5, cote = 70, xt = xb + cote * px;
    return cadre(`
      <rect x="0" y="0" width="800" height="500" fill="#efe3cf" opacity=".6"/>
      <path d="M70 60 h40 v380 h-40 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      <path d="M70 400 h160 v40 h-160 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      <rect x="${xb}" y="150" width="560" height="44" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
      <line x1="${xt}" y1="146" x2="${xt}" y2="198" stroke="#10233c" stroke-width="4"/>
      ${ruban(xb, 230, 110, px, 5)}
      <rect x="${xb}" y="224" width="8" height="50" fill="#2b2100"/>
      <line x1="${xt}" y1="198" x2="${xt}" y2="230" stroke="#c9451a" stroke-width="2.5" stroke-dasharray="5 4"/>
      ${etiquette(90, 120, 170, 90, 'Équerre : la butée')}
      ${etiquette(xb + 4, 172, 230, 110, 'Le bout du tube touche la butée')}
      ${etiquette(xb + 4, 262, 230, 340, 'Le crochet du mètre aussi')}
      ${etiquette(xt, 170, 560, 110, 'Trait à 70 mm')}
      <text x="400" y="478" text-anchor="middle" class="cz-pt">Tube et mètre partent de la même butée : la cote ne peut pas glisser</text>`, 'Mesurer contre une butée');
  });
})();

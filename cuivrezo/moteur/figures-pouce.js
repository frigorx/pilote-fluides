/* CuivRézo — figures du pouce et du pied à coulisse à vernier.
   CONTRAT : enregistre « vernier » (zero · lecture) et « pouce » (regle · fraction) dans CuivFigures.
   Lecture du vernier au 1/10 : les mm entiers à gauche du zéro du vernier, puis le trait du
   vernier aligné sur un trait de la règle (fiche « pied a coulisse », p. 2 et 4).
   Échelle : 1 mm = 24 unités ; un pas de vernier = 0,9 mm. */

(() => {
  'use strict';
  const MM = 24, X0 = 70;

  function regle(yBase, jusqua) {
    let s = `<rect x="${X0 - 30}" y="${yBase - 70}" width="${jusqua * MM + 70}" height="70" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>`;
    for (let i = 0; i <= jusqua; i++) {
      const x = X0 + i * MM, h = i % 10 === 0 ? 34 : i % 5 === 0 ? 26 : 18;
      s += `<line x1="${x}" y1="${yBase}" x2="${x}" y2="${yBase - h}" stroke="#1f262d" stroke-width="2"/>`;
      if (i % 10 === 0) s += `<text x="${x}" y="${yBase - 42}" text-anchor="middle" style="font:700 20px Calibri,Arial;fill:#1f262d">${i / 10}</text>`;
    }
    return s;
  }
  function vernier(yBase, zeroMm, allume) {
    const x0 = X0 + zeroMm * MM;
    let s = `<rect x="${x0 - 24}" y="${yBase}" width="${10 * 0.9 * MM + 48}" height="62" fill="#e7ebef" stroke="#4d5763" stroke-width="2"/>`;
    for (let k = 0; k <= 10; k++) {
      const x = x0 + k * 0.9 * MM, on = k === allume;
      s += `<line x1="${x}" y1="${yBase}" x2="${x}" y2="${yBase + (k % 5 === 0 ? 30 : 20)}" stroke="${on ? '#c9451a' : '#1f262d'}" stroke-width="${on ? 4 : 2}"/>`;
      if (k % 5 === 0) s += `<text x="${x}" y="${yBase + 54}" text-anchor="middle" style="font:700 18px Calibri,Arial;fill:${on ? '#c9451a' : '#1f262d'}">${k}</text>`;
    }
    return s;
  }

  CuivFigures.ajouter('vernier', (etat, { cadre, etiquette }) => {
    const y = 220;
    if (etat === 'zero') return cadre(`
      <text x="400" y="60" text-anchor="middle" class="cz-txt">Becs fermés : le zéro du vernier tombe sur le zéro de la règle</text>
      ${regle(y, 26)}${vernier(y, 0, 0)}
      ${etiquette(X0, y + 4, 200, 380, 'Les deux zéros sont alignés')}
      <text x="206" y="418" class="cz-pt">sinon, toutes vos lectures seront fausses</text>`, 'Vérifier le zéro');
    /* lecture : 9,5 mm — zéro entre 9 et 10, cinquième trait aligné */
    const xz = X0 + 9.5 * MM, xa = X0 + 14 * MM;
    return cadre(`
      ${regle(y, 26)}${vernier(y, 9.5, 5)}
      <line x1="${xa}" y1="${y - 26}" x2="${xa}" y2="${y}" stroke="#c9451a" stroke-width="4"/>
      ${etiquette(xz, y + 34, 60, 360, '① Zéro du vernier entre 9 et 10', 'cz-txt', 'start')}
      <text x="66" y="392" class="cz-pt">→ 9 mm entiers</text>
      ${etiquette(xa, y + 34, 470, 420, '② Trait aligné : le 5')}
      <text x="476" y="452" class="cz-pt">→ 5 dixièmes</text>
      <text x="400" y="60" text-anchor="middle" class="cz-txt">Lecture : 9 + 0,5 = 9,5 mm</text>
      <text x="400" y="92" text-anchor="middle" class="cz-pt">la ligne la plus proche du tableau : 3/8″ (9,53 mm)</text>`, 'Lire le vernier');
  });

  CuivFigures.ajouter('pouce', (etat, { cadre }) => {
    /* une règle en pouces (au huitième) face à une règle en millimètres, même échelle :
       1 pouce = 25,4 mm = 254 unités */
    const P = 254, x0 = 110, yP = 190, yM = 290;
    let s = `<rect x="${x0 - 20}" y="${yP - 60}" width="${1.5 * P + 40}" height="60" fill="#f4e6c8" stroke="#8a6d00" stroke-width="2"/>
             <rect x="${x0 - 20}" y="${yM}" width="${1.5 * P + 40}" height="60" fill="#e7ebef" stroke="#4d5763" stroke-width="2"/>`;
    for (let i = 0; i <= 12; i++) {
      const x = x0 + i * P / 8, h = i % 8 === 0 ? 40 : i % 4 === 0 ? 32 : i % 2 === 0 ? 24 : 16;
      s += `<line x1="${x}" y1="${yP}" x2="${x}" y2="${yP - h}" stroke="#3b2e00" stroke-width="2.5"/>`;
    }
    for (let m = 0; m <= 38; m++) {
      const x = x0 + m * 10, h = m % 10 === 0 ? 34 : m % 5 === 0 ? 24 : 14;
      s += `<line x1="${x}" y1="${yM}" x2="${x}" y2="${yM + h}" stroke="#1f262d" stroke-width="1.6"/>`;
      if (m % 10 === 0) s += `<text x="${x}" y="${yM + 56}" text-anchor="middle" style="font:700 18px Calibri,Arial">${m}</text>`;
    }
    const marques = etat === 'fraction'
      ? [[2, '1/4″', '6,35'], [3, '3/8″', '9,53'], [4, '1/2″', '12,70'], [5, '5/8″', '15,88']]
      : [[8, '1″', '25,40'], [9, '1″1/8', '28,58']];
    marques.forEach(([h, nom, mm], i) => {
      const x = x0 + h * P / 8, dy = i % 2 ? 0 : -34;
      s += `<line x1="${x}" y1="${yP - 44 + dy}" x2="${x}" y2="${yM + 4}" stroke="#c9451a" stroke-width="3"/>`
        + `<text x="${x}" y="${yP - 50 + dy}" text-anchor="middle" style="font:800 22px Calibri,Arial;fill:#c9451a">${nom}</text>`
        + `<text x="${x}" y="${yM + 86 + (i % 2 ? 28 : 0)}" text-anchor="middle" style="font:700 20px Calibri,Arial;fill:#1b3a63">${mm}</text>`;
    });
    s += `<text x="${x0 + 1.5 * P + 40}" y="${yP - 22}" class="cz-pt">pouces</text><text x="${x0 + 1.5 * P + 40}" y="${yM + 38}" class="cz-pt">millimètres</text>`;
    const bas = etat === 'fraction'
      ? 'De huitième en huitième : 1/4 = 2/8, 3/8, 1/2 = 4/8, 5/8…'
      : '1″1/8, c’est 1 pouce ET 1/8 : (1 + 0,125) × 25,4 = 28,58 mm';
    return cadre(`${s}<text x="400" y="480" text-anchor="middle" class="cz-txt">${bas}</text>`, 'Pouces et millimètres');
  });
})();

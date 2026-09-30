/* CuivRézo — figures du poste oxyacétylénique.
   CONTRAT : enregistre « oa » (poste · detendeur · ouvrir · savon · allumer · eteindre · fin).
   Ogives : oxygène BLANCHE, acétylène MARRON (fiche CDG, INRS ED 742 p. 6). Tuyaux : bleu = oxygène,
   rouge = acétylène. Les ordres suivent la majorité des fiches et l'INRS (voir sources-metier/2-chalumeau.md) :
   allumage oxygène un peu, puis acétylène, puis allumer ; extinction acétylène d'abord. */

(() => {
  'use strict';
  function bouteille(x, y, ogive, h) {
    return `<rect x="${x}" y="${y}" width="80" height="${h}" rx="24" fill="#d7dde3" stroke="#4d5763" stroke-width="2.5"/>
      <path d="M${x} ${y + 40} q0 -40 40 -40 q40 0 40 40 z" fill="${ogive}" stroke="#4d5763" stroke-width="2.5"/>
      <rect x="${x + 30}" y="${y - 26}" width="20" height="28" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/>`;
  }
  function manometre(x, y, r, aiguille) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fffdf8" stroke="#1b3a63" stroke-width="3"/>
      <line x1="${x}" y1="${y}" x2="${x + Math.cos(aiguille) * r * .75}" y2="${y + Math.sin(aiguille) * r * .75}" stroke="#c9451a" stroke-width="3"/>
      <circle cx="${x}" cy="${y}" r="4" fill="#1b3a63"/>`;
  }
  /* une liste d'étapes numérotées, dans des cases : ce qu'on fait, dans l'ordre */
  function etapes(titre, liste, couleurs) {
    return `<text x="400" y="60" text-anchor="middle" class="cz-txt" style="font-size:28px">${titre}</text>` + liste.map((t, i) => {
      const y = 100 + i * 78, c = couleurs[i] || '#1b3a63';
      return `<rect x="110" y="${y}" width="580" height="62" rx="14" fill="#fffdf8" stroke="${c}" stroke-width="3"/>
        <circle cx="150" cy="${y + 31}" r="21" fill="${c}"/><text x="150" y="${y + 39}" text-anchor="middle" style="font:800 22px Calibri,Arial;fill:#fff">${i + 1}</text>
        <text x="190" y="${y + 39}" class="cz-txt">${t}</text>`;
    }).join('');
  }

  CuivFigures.ajouter('oa', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'detendeur') return cadre(`
      <rect x="250" y="220" width="200" height="90" rx="20" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2.5"/>
      ${manometre(270, 170, 58, -2.2)}${manometre(430, 170, 58, -0.6)}
      <rect x="330" y="310" width="40" height="60" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/>
      <rect x="310" y="370" width="80" height="34" rx="10" fill="#2c333b"/>
      ${etiquette(230, 150, 70, 90, 'HP : ce qui reste', 'cz-txt', 'start')}<text x="76" y="122" class="cz-pt">dans la bouteille</text>
      ${etiquette(470, 150, 560, 90, 'BP : ce qui part')}<text x="566" y="122" class="cz-pt">vers le chalumeau</text>
      ${etiquette(390, 388, 520, 440, 'Vis de détente')}<text x="526" y="472" class="cz-pt">desserrée = rien ne passe</text>`, 'Le détendeur');
    if (etat === 'ouvrir') return cadre(`${bouteille(140, 150, '#fffdf8', 300)}
      <circle cx="180" cy="112" r="26" fill="#56657a"/><path d="M150 90 a40 40 0 0 1 60 0" fill="none" stroke="#c9451a" stroke-width="5" marker-end="url(#cz-fl)"/>
      <rect x="220" y="100" width="80" height="26" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/>
      <text x="400" y="150" class="cz-txt">Un quart de tour, lentement,</text>
      <text x="400" y="182" class="cz-txt">à la main</text>
      <text x="400" y="240" class="cz-pt">le corps sur le côté du détendeur,</text>
      <text x="400" y="268" class="cz-pt">jamais en face</text>
      <text x="400" y="330" class="cz-pt">un quart de tour : on referme vite</text>
      <text x="400" y="358" class="cz-pt">en cas d’incident</text>`, 'Ouvrir une bouteille');
    if (etat === 'savon') return cadre(`
      <rect x="120" y="220" width="260" height="60" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      <rect x="380" y="232" width="300" height="36" fill="#d7382c" stroke="#7d1810" stroke-width="2"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${372 + (i % 3) * 14}" cy="${206 - Math.floor(i / 3) * 16 - (i % 2) * 6}" r="${7 + (i % 2) * 3}" fill="#eaf4ff" stroke="#3d7fca" stroke-width="2"/>`).join('')}
      ${etiquette(386, 196, 520, 120, 'Des bulles : une fuite')}
      ${verdict(true, 'Eau savonneuse au pinceau : jamais une flamme pour chercher une fuite', 400, 420)}`, 'Chercher une fuite');
    if (etat === 'allumer') return cadre(etapes('Allumer : le professeur est présent', [
      'Buse vers une zone libre, allumeur à pierre en main',
      'Ouvrir un peu l’oxygène (bouton bleu)',
      'Ouvrir largement l’acétylène (bouton rouge)',
      'Allumer à la buse, avec l’allumeur',
      'Ajouter l’oxygène jusqu’au dard net'
    ], ['#1b3a63', '#3d7fca', '#b3261e', '#c9451a', '#1e7e54']), 'Allumer le chalumeau');
    if (etat === 'eteindre') return cadre(etapes('Éteindre : l’acétylène d’abord', [
      'Fermer le robinet d’acétylène (rouge)',
      'Fermer le robinet d’oxygène (bleu)',
      'Poser le chalumeau éteint sur son crochet',
      'Surveiller la zone : rien ne doit couver'
    ], ['#b3261e', '#3d7fca', '#1b3a63', '#1e7e54']), 'Éteindre le chalumeau');
    if (etat === 'fin') return cadre(etapes('Fin de travail : refermer le poste', [
      'Fermer les deux bouteilles',
      'Purger : ouvrir les robinets du chalumeau jusqu’à zéro',
      'Desserrer les vis de détente',
      'Refermer les robinets du chalumeau'
    ], ['#1b3a63', '#c9451a', '#3d7fca', '#1e7e54']), 'Refermer le poste');
    /* poste : vue d'ensemble */
    return cadre(`
      ${bouteille(120, 170, '#fffdf8', 290)}${bouteille(250, 170, '#7a2e1f', 290)}
      <path d="M110 250 h240" stroke="#56657a" stroke-width="5" stroke-dasharray="10 5"/>
      <rect x="140" y="112" width="40" height="30" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>${manometre(160, 96, 16, -2)}
      <rect x="270" y="112" width="40" height="30" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>${manometre(290, 96, 16, -2)}
      <path d="M180 128 C 420 60, 480 200, 600 230" fill="none" stroke="#3d7fca" stroke-width="7"/>
      <path d="M310 136 C 440 110, 490 230, 600 244" fill="none" stroke="#d7382c" stroke-width="7"/>
      <rect x="592" y="224" width="26" height="28" rx="4" fill="#f2c230" stroke="#8a6d00" stroke-width="2"/>
      <path d="M618 232 h110 l20 -8" stroke="#8a96a3" stroke-width="12" fill="none" stroke-linecap="round"/>
      ${etiquette(160, 250, 60, 470, 'Oxygène : ogive blanche', 'cz-txt', 'start')}
      ${etiquette(290, 300, 360, 440, 'Acétylène : ogive marron', 'cz-txt', 'start')}
      ${etiquette(230, 250, 420, 330, 'Chaîne : bouteilles debout, arrimées', 'cz-txt', 'start')}
      ${etiquette(605, 238, 560, 130, 'Clapets anti-retour')}
      ${etiquette(740, 226, 790, 160, 'Chalumeau', 'cz-txt', 'end')}`, 'Le poste oxyacétylénique');
  });
})();

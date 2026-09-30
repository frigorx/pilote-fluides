/* CuivRézo — figures du poste de travail.
   CONTRAT : enregistre « poste » (secours · etau · range) dans CuivFigures.
   Pictogrammes simples dessinés ici pour les repères de l'atelier ; les pictogrammes normalisés
   des EPI viennent de la fiche de sécurité de F. Henninot (images/reprises/). */

(() => {
  'use strict';
  CuivFigures.ajouter('poste', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'etau') {
      /* l'étau vu de face : mordaches, tube serré, zone de pincement */
      return cadre(`
        <rect x="120" y="360" width="560" height="40" fill="#b98b54" stroke="#6e4b22" stroke-width="2"/>
        <path d="M220 360 v-150 h110 v150 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <path d="M470 360 v-150 h110 v150 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <rect x="330" y="196" width="24" height="70" fill="#dfe6ec" stroke="#4d5763" stroke-width="2"/>
        <rect x="446" y="196" width="24" height="70" fill="#dfe6ec" stroke="#4d5763" stroke-width="2"/>
        <rect x="354" y="206" width="92" height="50" fill="#b3261e" opacity=".18"/>
        <circle cx="400" cy="231" r="24" fill="url(#cz-cu-r)" stroke="#6e3a14" stroke-width="2.5"/><circle cx="400" cy="231" r="16" fill="#2a1609"/>
        <rect x="580" y="262" width="150" height="18" rx="9" fill="#4d5763"/>
        ${etiquette(342, 200, 230, 110, 'Mordaches : mors doux')}
        ${etiquette(400, 256, 400, 450, 'Zone de pincement : jamais les doigts')}
        ${etiquette(700, 271, 620, 150, 'Serrer progressivement')}
        <text x="626" y="182" class="cz-pt">juste de quoi tenir</text>`, 'L’étau');
    }
    if (etat === 'range') {
      /* l'établi vu de dessus, en fin de séance */
      const outil = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${c}" stroke="#1b3a63" stroke-width="2"/>`;
      return cadre(`
        <rect x="60" y="80" width="520" height="300" rx="10" fill="#d9b98a" stroke="#6e4b22" stroke-width="3"/>
        ${outil(100, 120, 130, 40, '#d7382c')}${outil(100, 190, 110, 22, '#2c7fb8')}${outil(100, 240, 70, 60, '#f2c230')}${outil(250, 120, 110, 16, '#10233c')}
        ${outil(250, 170, 20, 160, '#9aa6b2')}${outil(250, 314, 120, 16, '#9aa6b2')}
        <rect x="620" y="170" width="130" height="200" rx="10" fill="#8a96a3" stroke="#4d5763" stroke-width="3"/>
        ${[0, 1, 2, 3, 4].map(i => `<rect x="${636 + i * 22}" y="${120 + (i % 2) * 18}" width="12" height="${110 - (i % 2) * 18}" fill="url(#cz-cu-h)" stroke="#6e3a14"/>`).join('')}
        ${etiquette(165, 140, 165, 50, 'Chaque outil à sa place')}
        ${etiquette(685, 250, 610, 420, 'Chutes au bac, debout', 'cz-txt', 'end')}
        ${verdict(true, 'Rien au sol, établi propre', 320, 475)}`, 'Le poste rangé');
    }
    /* par défaut : les repères de secours de l'atelier */
    const case_ = (x, titre, dessin) => `<g transform="translate(${x},90)"><rect width="160" height="200" rx="16" fill="#fffdf8" stroke="#d6dee7" stroke-width="2"/>${dessin}
      <text x="80" y="250" text-anchor="middle" class="cz-txt">${titre[0]}</text><text x="80" y="278" text-anchor="middle" class="cz-pt">${titre[1]}</text></g>`;
    return cadre(`
      ${case_(30, ['Arrêt', 'd’urgence'], '<rect x="30" y="40" width="100" height="120" rx="8" fill="#f2c230" stroke="#8a6d00" stroke-width="3"/><circle cx="80" cy="100" r="36" fill="#d7382c" stroke="#7d1810" stroke-width="3"/>')}
      ${case_(220, ['Trousse', 'de secours'], '<rect x="25" y="55" width="110" height="90" rx="12" fill="#1e7e54"/><rect x="70" y="72" width="20" height="56" fill="#fff"/><rect x="52" y="90" width="56" height="20" fill="#fff"/>')}
      ${case_(410, ['Extincteur', ''], '<rect x="55" y="50" width="50" height="120" rx="18" fill="#d7382c" stroke="#7d1810" stroke-width="3"/><rect x="65" y="30" width="30" height="24" fill="#2c333b"/><path d="M95 40 q40 0 40 40" fill="none" stroke="#2c333b" stroke-width="6"/>')}
      ${case_(600, ['Point d’eau', 'rinçage des yeux'], '<path d="M40 60 h60 v24 h-20 v20 h-20 v-20 h-20z" fill="#9aa6b2" stroke="#4d5763" stroke-width="2"/><path d="M70 120 q-14 22 0 32 q14 -10 0 -32z" fill="#3d7fca"/>')}
      <text x="400" y="440" text-anchor="middle" class="cz-txt">Je sais les montrer du doigt, sans hésiter</text>`, 'Les repères de secours');
  });
})();

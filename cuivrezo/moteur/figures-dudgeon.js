/* CuivRézo — figures du dudgeon (évasement à 45° pour raccord à écrou).
   CONTRAT : enregistre « dudgeon » (ecrou · mors · evaser · controle · fissure · oblique · serrage).
   Vue en COUPE pour la barre à trous et le cône : on voit ce que le cône fait au bout du tube.
   Cotes exagérées pour être lisibles (le dépassement réel est de 1 à 2 mm). */

(() => {
  'use strict';
  const X = 330, RO = 40, E = 8, YF = 250;          /* axe, rayon ext., paroi, face de la barre */

  const barre = () => `
    <path d="M140 ${YF} H${X - RO - 40} L${X - RO} ${YF + 40} V440 H140 Z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
    <path d="M520 ${YF} H${X + RO + 40} L${X + RO} ${YF + 40} V440 H520 Z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>`;
  const tubeDroit = haut => `
    <rect x="${X - RO}" y="${haut}" width="${E}" height="${470 - haut}" fill="url(#cz-cu-h)" stroke="#6e3a14" stroke-width="1.5"/>
    <rect x="${X + RO - E}" y="${haut}" width="${E}" height="${470 - haut}" fill="url(#cz-cu-h)" stroke="#6e3a14" stroke-width="1.5"/>`;
  const tubeEvase = () => `
    <path d="M${X - RO} 470 V${YF + 40} L${X - RO - 40} ${YF} H${X - RO - 30} L${X - RO + E} ${YF + 44} V470 Z" fill="url(#cz-cu-h)" stroke="#6e3a14" stroke-width="1.5"/>
    <path d="M${X + RO} 470 V${YF + 40} L${X + RO + 40} ${YF} H${X + RO + 30} L${X + RO - E} ${YF + 44} V470 Z" fill="url(#cz-cu-h)" stroke="#6e3a14" stroke-width="1.5"/>`;
  const cone = anime => `<g class="${anime ? 'cz-pousse' : ''}"><g transform="translate(0,${anime ? -34 : 0})">
    <path d="M${X} ${YF + 72} L${X - 122} ${YF - 50} H${X + 122} Z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
    <rect x="${X - 14}" y="${YF - 170}" width="28" height="120" fill="#6b7785" stroke="#4d5763" stroke-width="2"/></g></g>`;

  /* le tube vu de côté avec son dudgeon au bout droit, et l'écrou */
  function tubeCote(defaut) {
    const y = 250, d = 50, xb = 520;
    const evas = defaut === 'oblique'
      ? `<path d="M${xb} ${y - d / 2} L${xb + 50} ${y - d / 2 - 38} L${xb + 26} ${y + d / 2 + 22} L${xb} ${y + d / 2} Z" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>`
      : `<path d="M${xb} ${y - d / 2} L${xb + 38} ${y - d / 2 - 36} V${y + d / 2 + 36} L${xb} ${y + d / 2} Z" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>`;
    const fente = defaut === 'fissure' ? `<path d="M${xb + 36} ${y - 58} l-10 16 l8 6 l-12 18" fill="none" stroke="#b3261e" stroke-width="4"/>` : '';
    return `<rect x="90" y="${y - d / 2}" width="${xb - 90}" height="${d}" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
      ${evas}${fente}
      <path d="M330 ${y - 62} h90 l14 20 v84 l-14 20 h-90 l-14 -20 v-84 z" fill="#d7b24a" stroke="#7a5c00" stroke-width="2.5"/>
      <line x1="330" y1="${y - 62}" x2="330" y2="${y + 62}" stroke="#7a5c00" stroke-width="1.5"/><line x1="420" y1="${y - 62}" x2="420" y2="${y + 62}" stroke="#7a5c00" stroke-width="1.5"/>`;
  }

  CuivFigures.ajouter('dudgeon', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'ecrou') return cadre(`${tubeCote('aucun').replace(/<path d="M520[^>]*>/, '')}
      <path d="M470 212 l40 38 l-40 38" fill="none" stroke="#c9451a" stroke-width="6" marker-end="url(#cz-fl)"/>
      ${etiquette(376, 188, 100, 110, 'L’écrou, enfilé AVANT d’évaser', 'cz-txt', 'start')}
      <text x="106" y="142" class="cz-pt">son filetage regarde le bout du tube</text>
      ${verdict(true, 'Après l’évasement, il ne passerait plus', 400, 440)}`, 'Enfiler l’écrou');
    if (etat === 'mors') {
      const A = 16;
      return cadre(`${barre()}${tubeDroit(YF - A)}
        <line x1="${X + RO + 70}" y1="${YF - A}" x2="${X + RO + 170}" y2="${YF - A}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>
        <line x1="${X + RO + 70}" y1="${YF}" x2="${X + RO + 170}" y2="${YF}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>
        <line x1="${X + RO + 150}" y1="${YF - A - 34}" x2="${X + RO + 150}" y2="${YF - A}" stroke="#1b3a63" stroke-width="2" marker-end="url(#cz-fl)"/>
        <line x1="${X + RO + 150}" y1="${YF + 34}" x2="${X + RO + 150}" y2="${YF}" stroke="#1b3a63" stroke-width="2" marker-end="url(#cz-fl)"/>
        <text x="${X + RO + 180}" y="${YF - 2}" class="cz-txt">A : le dépassement</text>
        ${etiquette(160, 400, 120, 480, 'La barre à trous (vue en coupe)', 'cz-txt', 'start')}
        ${etiquette(X - RO + 4, 380, 560, 390, 'Le tube serré')}
        <text x="566" y="424" class="cz-pt">au bon diamètre</text>
        <text x="400" y="60" text-anchor="middle" class="cz-pt">Le bout du tube dépasse de la face chanfreinée de A millimètres</text>`, 'Le dépassement dans la barre');
    }
    if (etat === 'evaser') return cadre(`${barre()}${tubeEvase()}${cone(true)}
      ${etiquette(X + 60, YF - 20, 600, 150, 'Le cône descend')}
      <text x="606" y="186" class="cz-pt">et rabat le bout</text><text x="606" y="214" class="cz-pt">du tube à 45°</text>
      ${etiquette(X - RO - 22, YF + 20, 60, 150, 'Le chanfrein', 'cz-txt', 'start')}`, 'Évaser au cône');
    if (etat === 'fissure' || etat === 'oblique') return cadre(`${tubeCote(etat)}
      ${etiquette(etat === 'fissure' ? 552 : 560, etat === 'fissure' ? 208 : 236, 640, 130, etat === 'fissure' ? 'Fissure' : 'Cône de travers')}
      ${verdict(false, etat === 'fissure' ? 'Dudgeon fendu : il fuira' : 'Dudgeon oblique : il portera d’un seul côté', 400, 440)}`, 'Dudgeon raté');
    if (etat === 'serrage') return cadre(`
      <rect x="90" y="225" width="250" height="50" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
      <path d="M330 188 h90 l14 20 v84 l-14 20 h-90 l-14 -20 v-84 z" fill="#d7b24a" stroke="#7a5c00" stroke-width="2.5"/>
      <path d="M434 200 h110 v100 h-110 z" fill="#e1c05a" stroke="#7a5c00" stroke-width="2.5"/>
      <rect x="544" y="232" width="160" height="36" fill="#e1c05a" stroke="#7a5c00" stroke-width="2"/>
      <g transform="translate(375,190)"><rect x="-22" y="-150" width="44" height="150" rx="10" fill="#1b3a63"/><path d="M-40 -8 h80 v26 h-80z" fill="#1b3a63"/></g>
      <g transform="translate(490,310)"><rect x="-22" y="0" width="44" height="150" rx="10" fill="#56657a"/><path d="M-40 -18 h80 v26 h-80z" fill="#56657a"/></g>
      <path d="M430 60 a70 70 0 0 1 20 60" fill="none" stroke="#c9451a" stroke-width="5" marker-end="url(#cz-fl)"/>
      ${etiquette(375, 70, 40, 60, 'Clé dynamométrique', 'cz-txt', 'start')}
      <text x="46" y="94" class="cz-pt">sur l’écrou</text>
      ${etiquette(490, 420, 580, 410, 'Contre-clé')}
      <text x="586" y="444" class="cz-pt">sur le raccord</text>
      <text x="560" y="180" class="cz-pt">le raccord ne tourne pas</text>`, 'Serrer à deux clés');
    /* par défaut : le contrôle, dudgeon réussi et écrou qui vient le coiffer */
    return cadre(`${tubeCote('aucun')}
      <path d="M440 330 h70" stroke="#c9451a" stroke-width="5" marker-end="url(#cz-fl)"/>
      ${etiquette(548, 214, 560, 110, 'Cône régulier, lisse')}
      ${etiquette(376, 312, 220, 400, 'L’écrou vient le coiffer')}
      ${verdict(true, 'Sans fissure, sans bavure, bien centré', 400, 470)}`, 'Contrôler le dudgeon');
  });
})();

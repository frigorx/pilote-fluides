/* CuivRézo — figures du cintrage : la cintreuse à levier et le coude.
   CONTRAT : enregistre « cintreuse » (reperes · placer-L · placer-R · cintrer · angle)
   et « coude » (rc · equerre · ovale · pli · vrille) dans CuivFigures.
   SCHÉMA DE PRINCIPE, pas à l'échelle. Repères 0, R, L portés par le bras tournant, dans l'ordre
   « 0 R L » de trois sources sur quatre (l'évaluation de séquence 3 écrit « 0 L R ») :
   la position réelle est À VÉRIFIER sur la cintreuse de l'atelier.
   Le coude s'anime : le bras tourne autour de la forme, l'arc du tube se dessine en même temps
   (même durée, même courbe) ; le tronçon droit du tube tourne avec le bras. */

(() => {
  'use strict';
  const C = [300, 215], RF = 100, RT = 110, T = 20;   /* centre, rayon de forme, rayon du tube à l'axe, épaisseur */
  const ARC = Math.PI * RT / 2;
  const style = `<style>
    @keyframes cz-bras{0%,12%{transform:rotate(0)}72%,100%{transform:rotate(90deg)}}
    @keyframes cz-arc{0%,12%{stroke-dashoffset:${ARC}}72%,100%{stroke-dashoffset:0}}
    .cz-bras{animation:cz-bras 5s linear infinite;transform-origin:0 0}
    .cz-arc{stroke-dasharray:${ARC};animation:cz-arc 5s linear infinite}</style>`;

  function marques(trait) {
    /* les repères du bras, en coordonnées du bras (x le long du tube, 0 au point de tangence) */
    const m = [['0', 0], ['R', 34], ['L', 72]];
    return m.map(([l, x]) => `<line x1="${x}" y1="-${RT + 32}" x2="${x}" y2="-${RT + 12}" stroke="${l === trait ? '#c9451a' : '#10233c'}" stroke-width="${l === trait ? 4 : 2.5}"/>
      <text x="${x}" y="-${RT + 40}" text-anchor="middle" style="font:800 22px Calibri,Arial;fill:${l === trait ? '#c9451a' : '#10233c'}">${l}</text>`).join('');
  }

  function outil(etat) {
    const anime = etat === 'cintrer', fini = etat === 'angle';
    const trait = etat === 'placer-L' ? 'L' : etat === 'placer-R' ? 'R' : '';
    const xTrait = trait === 'L' ? 72 : trait === 'R' ? 34 : null;
    const graduations = [[-90, '0'], [-45, '45'], [0, '90'], [90, '180']].map(([a, t]) => {
      const r = a * Math.PI / 180, x1 = Math.cos(r) * (RF - 4), y1 = Math.sin(r) * (RF - 4), x2 = Math.cos(r) * (RF - 18), y2 = Math.sin(r) * (RF - 18);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#10233c" stroke-width="3"/>
        <text x="${Math.cos(r) * (RF - 38)}" y="${Math.sin(r) * (RF - 38) + 7}" text-anchor="middle" style="font:800 19px Calibri,Arial;fill:#10233c">${t}</text>`;
    }).join('');
    const bras = `
      <rect x="-6" y="-${RT + T + 12}" width="190" height="${T + 4}" rx="6" fill="#dfe6ec" stroke="#4d5763" stroke-width="2"/>
      ${marques(trait)}
      <rect x="180" y="-${RT + T + 10}" width="70" height="22" rx="8" fill="#3d7fca" stroke="#1b3a63" stroke-width="2"/>
      <path d="M0 -${RT} H200" stroke="#6e3a14" stroke-width="${T + 3}" stroke-linecap="butt"/>
      <path d="M0 -${RT} H200" stroke="url(#cz-cu)" stroke-width="${T}" stroke-linecap="butt"/>
      ${xTrait != null ? `<line x1="${xTrait}" y1="-${RT + 11}" x2="${xTrait}" y2="-${RT - 11}" stroke="#10233c" stroke-width="4"/>` : ''}`;
    return `${style}
      <g transform="translate(${C[0]},${C[1]})">
        <path d="M-20 20 L-190 190" stroke="#1b3a63" stroke-width="30" stroke-linecap="round"/>
        <circle r="${RF}" fill="#c9d2db" stroke="#4d5763" stroke-width="3"/>
        ${graduations}
        <circle r="16" fill="#8a96a3" stroke="#4d5763" stroke-width="2"/>
        <path d="M-240 -${RT} H0" stroke="#6e3a14" stroke-width="${T + 3}"/><path d="M-240 -${RT} H0" stroke="url(#cz-cu)" stroke-width="${T}"/>
        <path d="M-70 -${RT + T} v${T + 26} h22 v-${T + 26}" fill="#56657a" stroke="#2c333b" stroke-width="2"/>
        ${anime || fini ? `<path class="${anime ? 'cz-arc' : ''}" d="M0 -${RT} A${RT} ${RT} 0 0 1 ${RT} 0" fill="none" stroke="url(#cz-cu)" stroke-width="${T}"/>` : ''}
        <g class="${anime ? 'cz-bras' : ''}" ${fini ? 'transform="rotate(90)"' : ''}>${bras}</g>
      </g>`;
  }

  CuivFigures.ajouter('cintreuse', (etat, { cadre, etiquette }) => {
    const [cx, cy] = C;
    if (etat === 'placer-L' || etat === 'placer-R') {
      const L = etat === 'placer-L', xt = cx + (L ? 72 : 34), bout = L ? cx - 240 : cx + 200;
      return cadre(`${outil(etat)}
        <line x1="${bout}" y1="40" x2="${xt}" y2="40" class="cz-cote"/>
        <line x1="${bout}" y1="30" x2="${bout}" y2="${cy - RT - 12}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>
        <line x1="${xt}" y1="30" x2="${xt}" y2="${cy - RT - 40}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>
        <text x="${(bout + xt) / 2}" y="30" text-anchor="middle" class="cz-txt">cote depuis l’extrémité ${L ? 'GAUCHE' : 'DROITE'}</text>
        <text x="560" y="330" class="cz-txt">Trait sur ${L ? 'L' : 'R'}</text>
        <text x="560" y="362" class="cz-pt">${L ? 'L comme Left : gauche' : 'R comme Right : droite'}</text>
        <text x="560" y="470" class="cz-pt">schéma de principe</text>`, L ? 'Trait sur L' : 'Trait sur R');
    }
    if (etat === 'cintrer' || etat === 'angle') return cadre(`${outil(etat)}
      <text x="560" y="300" class="cz-txt">${etat === 'angle' ? 'Le 0 du bras' : 'Le bras tourne'}</text>
      <text x="560" y="332" class="cz-pt">${etat === 'angle' ? 'est en face du 90 :' : 'le tube s’enroule'}</text>
      <text x="560" y="360" class="cz-pt">${etat === 'angle' ? 'le coude est à 90°' : 'autour de la forme'}</text>
      <text x="560" y="470" class="cz-pt">schéma de principe</text>`, etat === 'angle' ? 'Lire l’angle' : 'Cintrer');
    /* repères : l'anatomie de l'outil */
    return cadre(`${outil('')}
      ${etiquette(cx - 59, cy - RT - 20, 60, 40, 'Crochet de serrage', 'cz-txt', 'start')}
      ${etiquette(cx + 34, cy - RT - 56, 470, 40, 'Repères 0 · R · L du bras')}
      ${etiquette(cx + 215, cy - RT - 10, 620, 150, 'Bras tournant')}
      ${etiquette(cx + 60, cy + 30, 560, 290, 'Forme graduée')}
      <text x="566" y="322" class="cz-pt">0 · 45 · 90 · 180</text>
      ${etiquette(cx - 150, cy + 150, 120, 470, 'Bras fixe')}
      <text x="560" y="470" class="cz-pt">schéma de principe</text>`, 'La cintreuse à levier');
  });

  /* le coude fini, vu à plat : branches, rayon, contrôles */
  CuivFigures.ajouter('coude', (etat, { cadre, etiquette, verdict }) => {
    const R = 70, x0 = 150, y0 = 110, xa = 520;            /* branche haute horizontale, coude en haut à droite */
    const tube = (col, extra) => `<path d="M${x0} ${y0} H${xa - R} A${R} ${R} 0 0 1 ${xa} ${y0 + R} V400" fill="none" stroke="#6e3a14" stroke-width="30"/>
      <path d="M${x0} ${y0} H${xa - R} A${R} ${R} 0 0 1 ${xa} ${y0 + R} V400" fill="none" stroke="${col || '#c77a3a'}" stroke-width="26" ${extra || ''}/>`;
    if (etat === 'equerre') return cadre(`${tube()}
      <path d="M${x0 + 20} ${y0 + 28} h${xa - x0 - 34} v260" fill="none" stroke="#4d5763" stroke-width="16" opacity=".75"/>
      ${etiquette(xa - 16, 300, 640, 300, 'Équerre')}
      ${verdict(true, 'Les deux branches collent à l’équerre : 90°', 400, 470)}`, 'Contrôler l’angle');
    if (etat === 'ovale' || etat === 'pli') return cadre(`${tube()}
      ${etat === 'ovale' ? `<ellipse cx="${xa - R * 0.3}" cy="${y0 + R * 0.3}" rx="30" ry="12" transform="rotate(45 ${xa - R * 0.3} ${y0 + R * 0.3})" fill="#8f4f1f" stroke="#b3261e" stroke-width="3"/>`
        : [0, 1, 2, 3].map(i => `<path d="M${xa - R + 8 + i * 13} ${y0 + 20 + i * 11} l10 -8" stroke="#b3261e" stroke-width="4"/>`).join('')}
      ${etiquette(xa - 22, y0 + 24, 640, 140, etat === 'ovale' ? 'Coude aplati' : 'Plis à l’intérieur')}
      ${verdict(false, etat === 'ovale' ? 'Tube ovalisé : le passage est réduit' : 'Tube plissé : le tube a glissé', 400, 470)}`, 'Coude raté');
    if (etat === 'vrille') return cadre(`${tube()}
      <path d="M${x0} ${y0} H${xa - R - 40} q30 0 40 14" fill="none" stroke="#10233c" stroke-width="4" stroke-dasharray="10 6"/>
      ${etiquette(xa - R - 30, y0 + 4, 470, 50, 'La ligne de contrôle tourne', 'cz-txt', 'start')}
      ${verdict(false, 'Coude vrillé : la pièce sort de son plan', 400, 470)}`, 'Coude vrillé');
    /* rc : l'expérience des 300 mm — trait sur 0, on mesure, on trouve Rc */
    return cadre(`
      <rect x="${x0 - 60}" y="60" width="16" height="360" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      <path d="M${x0 - 44} ${y0} H${xa - R} A${R} ${R} 0 0 1 ${xa} ${y0 + R} V420" fill="none" stroke="#6e3a14" stroke-width="30"/>
      <path d="M${x0 - 44} ${y0} H${xa - R} A${R} ${R} 0 0 1 ${xa} ${y0 + R} V420" fill="none" stroke="#c77a3a" stroke-width="26"/>
      <line x1="${xa}" y1="${y0 - 40}" x2="${xa}" y2="440" stroke="#1b3a63" stroke-width="1.6" stroke-dasharray="8 6"/>
      <line x1="${x0 - 44}" y1="${y0 - 34}" x2="${xa}" y2="${y0 - 34}" class="cz-cote"/>
      <text x="${(x0 + xa) / 2}" y="${y0 - 44}" text-anchor="middle" class="cz-txt">mesure à l’axe : 300 + Rc</text>
      <line x1="${xa - R}" y1="${y0 + 26}" x2="${xa - R}" y2="${y0 + 60}" stroke="#c9451a" stroke-width="3"/>
      ${etiquette(x0 - 52, 300, 60, 470, 'Butée', 'cz-txt', 'start')}
      ${etiquette(xa - R, y0 + 44, 300, 300, 'Trait tracé à 300, posé sur 0')}
      <text x="306" y="334" class="cz-pt">le coude commence ici</text>
      <text x="560" y="400" class="cz-txt">Rc = mesure − 300</text>`, 'Trouver le rayon de sa cintrette');
  });
})();

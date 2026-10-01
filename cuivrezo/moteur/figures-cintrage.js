/* CuivRézo — figures du cintrage : la cintreuse à levier et le coude.
   CONTRAT : enregistre « cintreuse » (reperes · lever · engager · hors-crochet · rabattre · placer-L ·
   placer-R · placer-0 · cintrer · angle) et « coude » (rc · equerre · ovale · pli · vrille) dans CuivFigures.
   SCHÉMA DE PRINCIPE, pas à l'échelle. Géométrie du croquis de Franck (01/10/2026) : le bras fixe pend
   sous la forme et son CROCHET FIXE tient le tube ; le bras tournant porte le guide, prolongé par sa
   poignée. Mise en place : bras en l'air (le guide quitte la forme), tube engagé sous le crochet, bras
   rabattu, trait sur L, R ou 0. Repères 0, R, L du guide dans l'ordre « 0 R L » (trois sources sur quatre,
   et le croquis de Franck). Aplats de la charte, sans dégradé.
   Le coude s'anime : le bras tourne autour de la forme, l'arc du tube se dessine en même temps
   (même durée, même courbe) ; le tronçon droit du tube tourne avec le bras. */

(() => {
  'use strict';
  const C = [300, 262], RF = 80, RT = 88, T = 16;   /* centre, rayon de forme, rayon du tube à l'axe, épaisseur */
  const ARC = Math.PI * RT / 2;
  const NAVY = '#1b3a63', ACIER = '#9aa6b2', CUIVRE = '#c77a3a', REFLET = '#e8a46c';
  const XC = -114;                                   /* abscisse du bras fixe et de son crochet */
  const REPERES = { '0': 0, R: 27, L: 58 };          /* position des repères sur le guide */
  const style = `<style>
    @keyframes cz-bras{0%,12%{transform:rotate(0)}72%,100%{transform:rotate(90deg)}}
    @keyframes cz-arc{0%,12%{stroke-dashoffset:${ARC}}72%,100%{stroke-dashoffset:0}}
    @keyframes cz-rabat{0%,15%{transform:rotate(-25deg) translate(0px,-22px)}70%,100%{transform:none}}
    .cz-bras{animation:cz-bras 5s linear infinite;transform-origin:0 0}
    .cz-arc{stroke-dasharray:${ARC};animation:cz-arc 5s linear infinite}
    .cz-rabat{animation:cz-rabat 4s ease-in-out infinite;transform-origin:0 0}</style>`;

  const tube = (d, cls) => `<path ${cls ? `class="${cls}"` : ''} d="${d}" fill="none" stroke="${NAVY}" stroke-width="${T + 5}"/>
    <path ${cls ? `class="${cls}"` : ''} d="${d}" fill="none" stroke="${CUIVRE}" stroke-width="${T}"/>
    <path ${cls ? `class="${cls}"` : ''} d="${d}" fill="none" stroke="${REFLET}" stroke-width="4"/>`;

  function marques(trait) {
    /* les repères du guide, en coordonnées du bras (x le long du tube, 0 au point de tangence) */
    const haut = RT + T / 2 + 22;
    return Object.entries(REPERES).map(([l, x]) => {
      const c = l === trait ? '#c9451a' : '#10233c';
      return `<line x1="${x}" y1="-${haut}" x2="${x}" y2="-${haut - 14}" stroke="${c}" stroke-width="${l === trait ? 4 : 2.5}"/>
      <text x="${x}" y="-${haut + 6}" text-anchor="middle" style="font:800 20px Calibri,Arial;fill:${c}">${l}</text>`;
    }).join('');
  }

  /* le bras tournant : sa poignée, puis le guide qui porte les repères */
  const bras = trait => `
      <path d="M146 -107 L222 -142" stroke="${NAVY}" stroke-width="30" stroke-linecap="round"/>
      <path d="M146 -107 L222 -142" stroke="${ACIER}" stroke-width="20" stroke-linecap="round"/>
      <path d="M190 -127 L222 -142" stroke="${NAVY}" stroke-width="32" stroke-linecap="round"/>
      <path d="M190 -127 L222 -142" stroke="#ff6b35" stroke-width="22" stroke-linecap="round"/>
      <rect x="-6" y="-${RT + T / 2 + 22}" width="160" height="22" rx="5" fill="#e3e9ef" stroke="${NAVY}" stroke-width="3"/>
      ${marques(trait)}`;

  function outil(etat) {
    const anime = etat === 'cintrer', fini = etat === 'angle', tourne = anime || fini;
    const trait = { 'placer-L': 'L', 'placer-R': 'R', 'placer-0': '0' }[etat] || '';
    const yTube = etat === 'hors-crochet' ? -RT - 26 : -RT;
    const graduations = [[-90, '0'], [-45, '45'], [0, '90'], [90, '180']].map(([a, t]) => {
      const r = a * Math.PI / 180, x1 = Math.cos(r) * (RF - 4), y1 = Math.sin(r) * (RF - 4), x2 = Math.cos(r) * (RF - 16), y2 = Math.sin(r) * (RF - 16);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#10233c" stroke-width="3"/>
        <text x="${Math.cos(r) * (RF - 33)}" y="${Math.sin(r) * (RF - 33) + 6}" text-anchor="middle" style="font:800 17px Calibri,Arial;fill:#10233c">${t}</text>`;
    }).join('');
    const brasPose = tourne
      ? `<g class="${anime ? 'cz-bras' : ''}" ${fini ? 'transform="rotate(90)"' : ''}>${bras('')}${tube(`M0 -${RT} H200`)}</g>`
      : etat === 'rabattre' ? `<g class="cz-rabat">${bras('')}</g>`
      : `<g ${['lever', 'engager', 'hors-crochet'].includes(etat) ? 'transform="rotate(-25) translate(0 -22)"' : ''}>${bras(trait)}</g>`;
    const tubeDroit = etat === 'lever' ? '' : tube(`M-240 ${yTube} H${tourne ? 0 : 200}`);
    return `${style}
      <g transform="translate(${C[0]},${C[1]})">
        <path d="M${XC} 0 H0 M${XC} -${RT} V228" stroke="${NAVY}" stroke-width="30" stroke-linecap="round"/>
        <path d="M${XC} 0 H0 M${XC} -${RT} V228" stroke="${ACIER}" stroke-width="20" stroke-linecap="round"/>
        <path d="M${XC} 150 V228" stroke="${NAVY}" stroke-width="32" stroke-linecap="round"/>
        <path d="M${XC} 150 V228" stroke="#84b7ec" stroke-width="22" stroke-linecap="round"/>
        <circle r="${RF}" fill="#cfd8e2" stroke="${NAVY}" stroke-width="3"/>
        ${graduations}
        ${tourne ? tube(`M0 -${RT} A${RT} ${RT} 0 0 1 ${RT} 0`, anime ? 'cz-arc' : '') : ''}
        ${tubeDroit}
        <path d="M${XC - 14} -${RT - 10} V-${RT + 16} H${XC + 14} V-${RT - 10}" fill="none" stroke="${NAVY}" stroke-width="10" stroke-linejoin="round"/>
        <path d="M${XC - 14} -${RT - 10} V-${RT + 16} H${XC + 14} V-${RT - 10}" fill="none" stroke="${ACIER}" stroke-width="5" stroke-linejoin="round"/>
        ${brasPose}
        ${trait ? `<line x1="${REPERES[trait]}" y1="-${RT + 10}" x2="${REPERES[trait]}" y2="-${RT - 10}" stroke="#10233c" stroke-width="4"/>` : ''}
        <circle r="14" fill="#cfd8e2" stroke="${NAVY}" stroke-width="3"/>
      </g>`;
  }

  CuivFigures.ajouter('cintreuse', (etat, { cadre, etiquette, verdict }) => {
    const [cx, cy] = C;
    const crochet = (tx, ty) => etiquette(cx + XC, cy - RT - 16, tx, ty, 'Crochet fixe');
    if (etat === 'placer-L' || etat === 'placer-R' || etat === 'placer-0') {
      const r = etat.slice(-1), xt = cx + REPERES[r], bout = r === 'R' ? cx + 200 : cx - 240;
      const quoi = r === 'L' ? 'cote depuis l’extrémité GAUCHE' : r === 'R' ? 'cote depuis l’extrémité DROITE' : 'cote moins Rc, depuis la GAUCHE';
      return cadre(`${outil(etat)}
        <line x1="${bout}" y1="40" x2="${xt}" y2="40" class="cz-cote"/>
        <line x1="${bout}" y1="30" x2="${bout}" y2="${cy - RT - 12}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>
        <line x1="${xt}" y1="30" x2="${xt}" y2="${cy - RT - 12}" stroke="#1b3a63" stroke-width="1.4" stroke-dasharray="6 5"/>
        <text x="${(bout + xt) / 2}" y="30" text-anchor="middle" class="cz-txt">${quoi}</text>
        <text x="560" y="330" class="cz-txt">Trait sur ${r}</text>
        <text x="560" y="362" class="cz-pt">${r === 'L' ? 'L comme Left : gauche' : r === 'R' ? 'R comme Right : droite' : '0 : le coude commence ici'}</text>
        <text x="560" y="470" class="cz-pt">schéma de principe</text>`, 'Trait sur ' + r);
    }
    if (etat === 'cintrer' || etat === 'angle') return cadre(`${outil(etat)}
      <text x="600" y="300" class="cz-txt">${etat === 'angle' ? 'Le 0 du bras' : 'Le bras tourne'}</text>
      <text x="600" y="332" class="cz-pt">${etat === 'angle' ? 'est en face du 90 :' : 'le tube s’enroule'}</text>
      <text x="600" y="360" class="cz-pt">${etat === 'angle' ? 'le coude est à 90°' : 'autour de la forme'}</text>
      <text x="600" y="470" class="cz-pt">schéma de principe</text>`, etat === 'angle' ? 'Lire l’angle' : 'Cintrer');
    if (etat === 'lever') return cadre(`${outil(etat)}
      <text x="560" y="300" class="cz-txt">Bras en l’air</text>
      <text x="560" y="332" class="cz-pt">le guide quitte la forme :</text>
      <text x="560" y="360" class="cz-pt">la gorge est libre</text>
      <text x="560" y="470" class="cz-pt">schéma de principe</text>`, 'Lever le bras');
    if (etat === 'engager') return cadre(`${outil(etat)}
      ${crochet(150, 110)}
      <text x="560" y="300" class="cz-txt">Tube dans la gorge</text>
      <text x="560" y="332" class="cz-pt">et bloqué sous</text>
      <text x="560" y="360" class="cz-pt">le crochet fixe</text>
      <text x="560" y="470" class="cz-pt">schéma de principe</text>`, 'Engager le tube');
    if (etat === 'hors-crochet') return cadre(`${outil(etat)}
      ${crochet(150, 110)}
      <text x="560" y="300" class="cz-txt">Le tube passe</text>
      <text x="560" y="332" class="cz-pt">au-dessus du crochet :</text>
      <text x="560" y="360" class="cz-pt">rien ne le retient</text>
      ${verdict(false, 'Le tube glissera pendant le coude', 400, 470)}`, 'Tube hors du crochet');
    if (etat === 'rabattre') return cadre(`${outil(etat)}
      <text x="560" y="300" class="cz-txt">Rabattre le bras</text>
      <text x="560" y="332" class="cz-pt">le guide se pose</text>
      <text x="560" y="360" class="cz-pt">sur le tube</text>
      <text x="560" y="470" class="cz-pt">schéma de principe</text>`, 'Rabattre le bras');
    /* repères : l'anatomie de l'outil */
    return cadre(`${outil('')}
      ${crochet(150, 110)}
      ${etiquette(cx + REPERES.R, cy - RT - 34, 470, 40, 'Repères 0 · R · L du guide')}
      ${etiquette(cx + 205, cy - 135, 600, 150, 'Bras tournant')}
      ${etiquette(cx + 50, cy + 40, 560, 290, 'Forme graduée')}
      <text x="566" y="322" class="cz-pt">0 · 45 · 90 · 180</text>
      ${etiquette(cx + XC, cy + 110, 150, 420, 'Bras fixe')}
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

/* CuivRézo — figures du brasage.
   CONTRAT : enregistre « brasure » (capillarite · chauffe · baguette · azote · calamine · seche · surchauffe · reussie).
   Vue en COUPE longitudinale d'une emboîture : tube femelle élargi, tube mâle, jeu exagéré.
   Le métal d'apport monte dans le jeu par capillarité (animation) ; l'azote balaie l'intérieur. */

(() => {
  'use strict';
  const Y = 250, R = 46, E = 9, XE = 330, LE = 150;     /* axe, rayon, paroi, début et longueur de l'emboîture */
  const STYLE = `<style>
    @keyframes cz-cap{0%,15%{stroke-dashoffset:${LE}}75%,100%{stroke-dashoffset:0}}
    .cz-cap{stroke-dasharray:${LE};animation:cz-cap 4s ease-in-out infinite}
    @keyframes cz-n2{from{transform:translateX(0)}to{transform:translateX(60px)}}
    .cz-n2{animation:cz-n2 1.2s linear infinite}</style>`;

  /* femelle à gauche (élargie à partir de XE), mâle venant de la droite */
  function assemblage(apport, interieur) {
    const femelle = s => `<path d="M40 ${Y + s * R} H${XE - 14} L${XE} ${Y + s * (R + 13)} H${XE + LE} V${Y + s * (R + 13 - E)} H${XE} L${XE - 14} ${Y + s * (R - E)} H40 Z" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>`;
    const male = s => `<path d="M${XE + 6} ${Y + s * R} H770 V${Y + s * (R - E)} H${XE + 6} Z" fill="#e6a86b" stroke="#6e3a14" stroke-width="2"/>`;
    const jeu = s => `<line x1="${XE + LE}" y1="${Y + s * (R + 2)}" x2="${XE + 6}" y2="${Y + s * (R + 2)}" stroke="#7d8793" stroke-width="5" ${apport === 'anime' ? 'class="cz-cap"' : apport === 'plein' ? '' : 'opacity="0"'}/>`;
    /* le cordon : le petit congé d'apport au bord de l'emboîture, quand le joint est plein */
    const cordon = s => apport === 'plein' ? `<path d="M${XE + LE} ${Y + s * (R + 13)} V${Y + s * R} H${XE + LE + 18} Z" fill="#7d8793" stroke="#4d5763" stroke-width="1.5"/>` : '';
    const fond = interieur === 'calamine'
      ? Array.from({ length: 14 }, (_, i) => `<path d="M${120 + i * 45} ${Y - R + E + 4} l12 6 l-8 5 z M${140 + i * 45} ${Y + R - E - 4} l12 -6 l-8 -5 z" fill="#2a2a2a"/>`).join('') : '';
    return femelle(-1) + femelle(1) + male(-1) + male(1) + jeu(-1) + jeu(1) + cordon(-1) + cordon(1) + fond;
  }
  const flamme = (x, y) => `<g transform="translate(${x},${y}) rotate(90)"><path d="M0 -12 C40 -30 110 -18 130 0 C110 18 40 30 0 12 Z" fill="#8fb8e6" stroke="#3d7fca" stroke-width="1.5"/>
    <path d="M0 -7 C20 -8 34 -5 34 0 C34 5 20 8 0 7 Z" fill="#fff" stroke="#1b3a63" stroke-width="2"/></g>
    <path d="M${x - 10} ${y - 140} h20 v140 h-20 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>`;

  CuivFigures.ajouter('brasure', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'chauffe') return cadre(`${STYLE}${assemblage('vide')}${flamme(XE + 70, 60)}
      <path d="M${XE + 70} ${Y + R + 60} a50 22 0 1 1 -1 0" fill="none" stroke="#c9451a" stroke-width="5" marker-end="url(#cz-fl)"/>
      <text x="560" y="410" class="cz-txt">Chauffer les deux pièces</text><text x="560" y="440" class="cz-pt">en tournant autour du joint</text>`, 'Chauffer le joint');
    if (etat === 'baguette') return cadre(`${STYLE}${assemblage('anime')}
      <path d="M${XE + LE + 4} ${Y + R + 14} l140 150" stroke="#d7b24a" stroke-width="10" stroke-linecap="round"/>
      ${etiquette(XE + LE + 70, Y + R + 90, 120, 400, 'La baguette touche le joint', 'cz-txt', 'start')}
      <text x="126" y="432" class="cz-pt">elle fond au contact du cuivre chaud</text>
      ${etiquette(XE + 70, Y - R - 2, 500, 90, 'L’apport monte dans le jeu', 'cz-txt', 'start')}`, 'L’apport de la baguette');
    if (etat === 'azote') return cadre(`${STYLE}${assemblage('plein')}
      ${[0, 1, 2, 3, 4].map(i => `<g class="cz-n2"><path d="M${60 + i * 140} ${Y} h40" stroke="#3d7fca" stroke-width="5" marker-end="url(#cz-fl)"/></g>`).join('')}
      ${etiquette(90, Y, 90, 110, 'Azote : un débit léger et continu', 'cz-txt', 'start')}
      <text x="96" y="142" class="cz-pt">il chasse l’air avant la flamme, jusqu’au refroidissement</text>`, 'Le balayage à l’azote');
    if (etat === 'calamine') return cadre(`${STYLE}${assemblage('plein', 'calamine')}
      ${etiquette(300, Y - R + E + 8, 300, 110, 'Calamine : des écailles noires à l’intérieur', 'cz-txt', 'start')}
      ${verdict(false, 'Sans azote, elles partiront dans le circuit', 400, 460)}`, 'La calamine');
    if (etat === 'seche') return cadre(`${STYLE}${assemblage('vide')}
      <circle cx="${XE + LE + 14}" cy="${Y - R - 24}" r="16" fill="#d7b24a" stroke="#8a6d00" stroke-width="2"/>
      ${etiquette(XE + LE + 20, Y - R - 30, 560, 110, 'Une goutte posée dessus')}
      <text x="566" y="142" class="cz-pt">l’apport n’est pas entré</text>
      ${verdict(false, 'Brasure « collée, pas brasée » : le tube n’était pas assez chaud', 400, 460)}`, 'La brasure sèche');
    if (etat === 'surchauffe') return cadre(`${STYLE}${assemblage('plein')}
      <rect x="${XE - 40}" y="${Y - R - 20}" width="${LE + 80}" height="${2 * R + 40}" fill="#2a2a2a" opacity=".35"/>
      ${etiquette(XE + 40, Y - R - 10, 560, 110, 'Cuivre noirci, écaillé')}
      ${verdict(false, 'Surchauffe : flamme trop forte ou trop proche', 400, 460)}`, 'La surchauffe');
    if (etat === 'reussie') return cadre(`${STYLE}${assemblage('plein')}
      ${etiquette(XE + 60, Y - R - 2, 480, 90, 'L’apport remplit tout le jeu', 'cz-txt', 'start')}
      ${verdict(true, 'Cordon fin et régulier tout autour, intérieur couleur cuivre', 400, 460)}`, 'La brasure réussie');
    /* capillarite : l'apport monte seul dans le jeu */
    return cadre(`${STYLE}${assemblage('anime')}
      ${etiquette(XE + 70, Y - R - 2, 400, 90, 'Le jeu : 0,1 à 0,2 mm (exagéré ici)', 'cz-txt', 'start')}
      <text x="400" y="440" text-anchor="middle" class="cz-txt">L’apport fondu est aspiré dans le jeu : c’est la capillarité</text>
      <text x="400" y="470" text-anchor="middle" class="cz-pt">trop large, il coule sans entrer ; trop serré, il ne passe pas</text>`, 'La capillarité');
  });
})();

/* CuivRézo — figures de la coupe : coupe-tube et ébavureur.
   CONTRAT : enregistre « coupeTube » (poser · serrer · tourner · coupe · trop-serre)
   et « ebavurer » (interieur · exterieur) dans CuivFigures.
   Le coupe-tube est vu EN BOUT DE TUBE pour montrer le mécanisme : la molette tranchante en
   haut, les deux galets en bas, la vis de serrage au-dessus. Il tourne autour du tube. */

(() => {
  'use strict';

  /* le coupe-tube dessiné autour de (0,0), centre du tube, rayon de tube r */
  function outil(r, vis) {
    const m = 30, g = 24;
    return `
      <path d="M-${r + 70} -${r + 118} h${2 * r + 140} a26 26 0 0 1 26 26 v${2 * r + 150} a26 26 0 0 1 -26 26 h-${2 * r + 140} a26 26 0 0 1 -26 -26 v-${2 * r + 150} a26 26 0 0 1 26 -26 z
               M-${r + 34} -${r + 82} v${2 * r + 136} h${2 * r + 68} v-${2 * r + 136} z" fill="url(#cz-rouge)" fill-rule="evenodd" stroke="#6d1610" stroke-width="3"/>
      <rect x="-14" y="-${r + m * 2 + 60}" width="28" height="60" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      <g transform="translate(0,-${r + m * 2 + 72})"><g class="${vis ? 'cz-vis' : ''}">
        <rect x="-44" y="-16" width="88" height="32" rx="10" fill="#2c333b"/><rect x="-8" y="-16" width="16" height="32" fill="#56657a"/></g></g>
      <circle cx="0" cy="-${r + m}" r="${m}" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="3"/>
      <circle cx="0" cy="-${r + m}" r="7" fill="#2c333b"/>
      <circle cx="-${(r + g) * 0.72}" cy="${(r + g) * 0.7}" r="${g}" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="3"/>
      <circle cx="${(r + g) * 0.72}" cy="${(r + g) * 0.7}" r="${g}" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="3"/>`;
  }
  const tubeBout = (r, rx) => `<ellipse cx="0" cy="0" rx="${rx || r}" ry="${r}" fill="url(#cz-cu-r)" stroke="#6e3a14" stroke-width="3"/>
      <ellipse cx="0" cy="0" rx="${(rx || r) - 11}" ry="${r - 11}" fill="#2a1609"/>`;

  CuivFigures.ajouter('coupeTube', (etat, { cadre, etiquette, verdict }) => {
    const r = 62, C = 'translate(300,270) scale(.78)';
    if (etat === 'poser') {
      /* vu de côté : le trait tracé tout autour, la molette posée pile dessus */
      return cadre(`
        <rect x="60" y="250" width="640" height="60" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
        <line x1="420" y1="250" x2="420" y2="310" stroke="#10233c" stroke-width="4"/>
        <path d="M360 110 h120 a18 18 0 0 1 18 18 v242 a18 18 0 0 1 -18 18 h-120 a18 18 0 0 1 -18 -18 v-242 a18 18 0 0 1 18 -18z
                 M372 140 v220 h96 v-220z" fill="url(#cz-rouge)" fill-rule="evenodd" stroke="#6d1610" stroke-width="3"/>
        <rect x="408" y="200" width="24" height="50" rx="4" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <rect x="378" y="312" width="32" height="40" rx="6" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        <rect x="430" y="312" width="32" height="40" rx="6" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
        ${etiquette(420, 245, 560, 160, 'Molette sur le trait')}
        ${etiquette(394, 350, 200, 420, 'Galets')}
        ${etiquette(120, 280, 120, 170, 'Tube tracé')}
        <text x="400" y="475" text-anchor="middle" class="cz-pt">Le trait doit passer au milieu de la molette</text>`, 'Poser la molette sur le trait');
    }
    if (etat === 'coupe') {
      return cadre(`
        <rect x="60" y="230" width="330" height="60" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
        <rect x="440" y="230" width="300" height="60" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>
        <g class="cz-va"><rect x="440" y="230" width="300" height="60" fill="none"/></g>
        <text x="415" y="200" text-anchor="middle" class="cz-txt">La coupe se fait d’elle-même</text>
        ${verdict(true, 'Sans forcer, sans arracher', 400, 400)}`, 'Tube coupé');
    }
    if (etat === 'trop-serre') {
      return cadre(`
        <g transform="${C}">${tubeBout(r, r + 16)}${outil(r, false)}</g>
        ${etiquette(300 + (r + 16) * .78, 270, 600, 200, 'Tube écrasé')}
        ${verdict(false, 'Trop serré d’un coup : le tube s’ovalise', 400, 470)}`, 'Coupe-tube trop serré');
    }
    const tourne = etat === 'tourner' || etat === 'resserrer';
    const vis = etat === 'serrer' || etat === 'resserrer';
    const texte = {
      serrer: ['Serrer jusqu’au contact', 'la molette touche le tube, sans le marquer'],
      tourner: ['Un tour complet', 'l’outil tourne autour du tube, le tube ne bouge pas'],
      resserrer: ['Un tour, puis serrer un peu', 'on recommence, jusqu’à la coupe']
    }[etat] || ['Vu en bout de tube', 'molette en haut, galets en bas'];
    return cadre(`
      <g transform="${C}"><g class="${tourne ? 'cz-tourne' : ''}">${outil(r, vis)}</g>${tubeBout(r)}</g>
      ${tourne ? `<path d="M373 64 A215 215 0 0 1 502 196" fill="none" stroke="#c9451a" stroke-width="6" marker-end="url(#cz-fl)"/>` : ''}
      <text x="540" y="380" class="cz-txt">${texte[0]}</text>
      <text x="540" y="414" class="cz-pt">${texte[1].split(', ')[0]}</text>
      <text x="540" y="442" class="cz-pt">${texte[1].split(', ')[1] || ''}</text>
      ${etat === 'serrer' || !etat ? etiquette(300, 270 - (r + 30) * .78, 560, 160, 'Molette') : ''}
      ${etat === 'serrer' || !etat ? etiquette(300, 270 - (r + 132) * .78, 560, 90, 'Vis de serrage') : ''}
      ${!etat ? etiquette(300 + (r + 24) * .72 * .78, 270 + (r + 24) * .7 * .78, 560, 280, 'Galets') : ''}`, 'Le coupe-tube');
  });

  CuivFigures.ajouter('ebavurer', (etat, { cadre, etiquette }) => {
    /* le tube est tenu bouche vers le BAS : les copeaux tombent dehors */
    const ext = etat === 'exterieur';
    const copeaux = [0, 1, 2].map(i => `<g class="cz-tombe${i ? i + 1 : ''}"><path d="M${360 + i * 14} 330 l8 6 l-6 8 z" fill="#c77a3a"/></g>`).join('');
    const lame = ext
      ? `<g transform="translate(428,300)"><g class="cz-va"><path d="M0 -40 l46 -14 l6 18 l-46 14 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/><rect x="40" y="-66" width="90" height="30" rx="10" fill="#2c7fb8" stroke="#1b4f73" stroke-width="3" transform="rotate(-17 40 -66)"/></g></g>`
      : `<g transform="translate(370,318)"><g class="cz-tourne-lent"><path d="M0 0 l26 -36 l6 4 l-24 38 z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/></g></g>
         <rect x="352" y="318" width="36" height="120" rx="12" fill="#2c7fb8" stroke="#1b4f73" stroke-width="3"/>`;
    return cadre(`
      <rect x="315" y="40" width="110" height="270" fill="url(#cz-cu-h)" stroke="#6e3a14" stroke-width="2"/>
      <rect x="331" y="40" width="78" height="270" fill="#6b3512" opacity=".35"/>
      ${lame}
      ${copeaux}
      ${etiquette(420, 120, 560, 120, 'Tube tenu bouche en bas')}
      ${etiquette(ext ? 440 : 388, ext ? 262 : 360, 560, 270, ext ? 'Lame sur l’arête' : 'Ébavureur dans le tube')}
      <text x="566" y="304" class="cz-pt">${ext ? 'extérieure, un tour léger' : 'quelques tours, sans forcer'}</text>
      ${etiquette(376, 380, 560, 410, 'Les copeaux')}
      <text x="566" y="446" class="cz-txt">tombent dehors</text>`, ext ? 'Ébavurer l’extérieur' : 'Ébavurer l’intérieur');
  });
})();

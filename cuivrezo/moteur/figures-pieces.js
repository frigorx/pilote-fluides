/* CuivRézo — figures des pièces complexes : chapeau de gendarme et baïonnette.
   CONTRAT : enregistre « chapeau » (plan · traits · central · controle · desaxe) et
   « baionnette » (plan · premier · deplacer · parallele · tordue).
   Les formes sont TRACÉES comme un tube réel : des droites et des coudes de rayon donné, enchaînés
   (petit traceur, en coordonnées mathématiques puis retournées pour l'écran). Pas à l'échelle. */

(() => {
  'use strict';
  const RAD = Math.PI / 180;
  /* trace(x, y, cap, [ ['L', longueur] | ['A', angle en degrés (+ gauche), rayon] ]) → chemin SVG */
  function trace(x0, y0, cap, segs) {
    let x = x0, y = 0, h = cap * RAD;
    const sy = v => y0 - v;
    let d = `M${x.toFixed(1)} ${sy(y).toFixed(1)}`;
    for (const s of segs) {
      if (s[0] === 'L') { x += s[1] * Math.cos(h); y += s[1] * Math.sin(h); d += ` L${x.toFixed(1)} ${sy(y).toFixed(1)}`; }
      else {
        const t = s[1] * RAD, r = s[2];
        let cx, cy, ex, ey;
        if (t > 0) { cx = x - r * Math.sin(h); cy = y + r * Math.cos(h); ex = cx + r * Math.sin(h + t); ey = cy - r * Math.cos(h + t); }
        else { cx = x + r * Math.sin(h); cy = y - r * Math.cos(h); ex = cx - r * Math.sin(h + t); ey = cy + r * Math.cos(h + t); }
        d += ` A${r} ${r} 0 0 ${t > 0 ? 0 : 1} ${ex.toFixed(1)} ${sy(ey).toFixed(1)}`;
        x = ex; y = ey; h += t;
      }
    }
    return d;
  }
  const tube = (d, couleur) => `<path d="${d}" fill="none" stroke="#6e3a14" stroke-width="22" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="${couleur || '#c77a3a'}" stroke-width="17" stroke-linejoin="round"/>`;
  const marque = (x, y, t) => `<line x1="${x}" y1="${y - 20}" x2="${x}" y2="${y + 20}" stroke="#10233c" stroke-width="4"/>
    <text x="${x}" y="${y + 46}" text-anchor="middle" class="cz-txt">${t}</text>`;

  /* le chapeau : droit, demi-coude, montée, coude central, descente, demi-coude, droit */
  const R = 34, a = 45, M = 70, D = 260;                       /* rayon, demi-angle, montée, droits */
  const DEMI = 2 * R * Math.sin(a * RAD) + M * Math.cos(a * RAD);  /* demi-largeur de la bosse */
  const HAUT = 2 * R * (1 - Math.cos(a * RAD)) + M * Math.sin(a * RAD); /* hauteur H, d'axe à axe */
  const X0 = 400 - DEMI - D;                                   /* bosse centrée sur x = 400 */
  const chapeau = (x, y, ecart) => trace(x, y, 0, [['L', D], ['A', a, R], ['L', M], ['A', -2 * a, R], ['L', M], ['A', a + (ecart || 0), R], ['L', D]]);

  CuivFigures.ajouter('chapeau', (etat, { cadre, etiquette, verdict }) => {
    const y = 360;
    if (etat === 'traits') return cadre(`${tube(`M60 ${y} H740`)}
      ${marque(400, y, 'axe')}${marque(270, y, 'A')}${marque(530, y, 'B')}
      <line x1="270" y1="${y - 60}" x2="400" y2="${y - 60}" class="cz-cote"/><line x1="400" y1="${y - 60}" x2="530" y2="${y - 60}" class="cz-cote"/>
      <text x="335" y="${y - 72}" text-anchor="middle" class="cz-pt">même distance</text><text x="465" y="${y - 72}" text-anchor="middle" class="cz-pt">même distance</text>
      <text x="400" y="120" text-anchor="middle" class="cz-txt">L’axe au milieu, A et B de part et d’autre, à égale distance</text>`, 'Tracer l’axe, A et B');
    if (etat === 'central') {
      /* seul le coude central est fait : deux bras droits de part et d'autre */
      const d = trace(170, 420, a, [['L', 190], ['A', -2 * a, R], ['L', 190]]);
      return cadre(`${tube(d)}
        <text x="400" y="110" text-anchor="middle" class="cz-txt">D’abord le coude central, l’axe au milieu</text>
        <text x="400" y="142" text-anchor="middle" class="cz-pt">puis les deux coudes de moitié, en A et en B</text>
        ${etiquette(400, 230, 560, 230, 'Coude central')}`, 'Le coude central');
    }
    if (etat === 'desaxe') return cadre(`<circle cx="400" cy="${y - 22}" r="30" fill="#9aa6b2" stroke="#4d5763" stroke-width="2"/>${tube(chapeau(X0, y, 8))}
      <line x1="30" y1="${y + 26}" x2="770" y2="${y + 26}" stroke="#1b3a63" stroke-width="3" stroke-dasharray="10 6"/>
      ${verdict(false, 'Les deux branches ne sont plus alignées', 400, 460)}`, 'Chapeau désaxé');
    const obstacle = `<circle cx="400" cy="${y - 22}" r="30" fill="#9aa6b2" stroke="#4d5763" stroke-width="2"/>`;
    const d = chapeau(X0, y);
    if (etat === 'controle') return cadre(`${obstacle}${tube(d)}
      <rect x="40" y="${y + 14}" width="720" height="14" rx="3" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      ${etiquette(700, y + 21, 640, 440, 'La règle touche les deux branches')}
      ${verdict(true, 'Branches alignées, côtés égaux, pièce plane', 400, 150)}`, 'Contrôler le chapeau');
    /* plan */
    return cadre(`${obstacle}${tube(d)}
      <line x1="400" y1="${y - HAUT}" x2="580" y2="${y - HAUT}" stroke="#56657a" stroke-width="1.5" stroke-dasharray="8 6"/>
      <line x1="560" y1="${y}" x2="560" y2="${y - HAUT}" class="cz-cote"/>
      <text x="572" y="${y - HAUT / 2 + 8}" class="cz-txt">H</text>
      <line x1="400" y1="${y + 40}" x2="400" y2="160" stroke="#56657a" stroke-width="1.5" stroke-dasharray="8 6"/>
      ${etiquette(400, y - 22, 150, 440, 'L’obstacle à franchir', 'cz-txt', 'start')}
      <text x="400" y="100" text-anchor="middle" class="cz-txt">Un coude central, deux coudes de moitié, symétriques</text>`, 'Le chapeau de gendarme');
  });

  /* la baïonnette : droit, coude à 45°, oblique, coude à -45°, droit */
  const DEC = 150 * Math.sin(45 * RAD) + 2 * 34 * (1 - Math.cos(45 * RAD));  /* décalage d'axe à axe */
  const baio = (x, y, fin) => trace(x, y, 0, [['L', 200], ['A', 45, 34], ['L', 150], ...(fin === 'premier' ? [] : [['A', -45 + (fin === 'tordue' ? -10 : 0), 34], ['L', 230]])]);
  CuivFigures.ajouter('baionnette', (etat, { cadre, etiquette, verdict }) => {
    const y = 380;
    if (etat === 'premier') return cadre(`${tube(baio(60, y, 'premier'))}
      <text x="400" y="110" text-anchor="middle" class="cz-txt">Premier coude à 45°</text>
      <text x="400" y="142" text-anchor="middle" class="cz-pt">puis on retourne le tube pour le second, en sens inverse</text>`, 'Le premier coude');
    if (etat === 'deplacer') return cadre(`${tube(baio(60, y, 'premier'))}
      <rect x="40" y="${y + 16}" width="360" height="12" rx="3" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>
      <line x1="520" y1="${y}" x2="520" y2="${y - DEC}" class="cz-cote"/><text x="532" y="${y - 60}" class="cz-txt">le décalage voulu</text>
      <text x="400" y="110" text-anchor="middle" class="cz-txt">Faire coulisser jusqu’au décalage, règle parallèle au tube</text>`, 'Régler le décalage');
    if (etat === 'tordue') return cadre(`${tube(baio(40, y, 'tordue'))}
      ${verdict(false, 'Les deux branches ne sont pas parallèles', 400, 460)}`, 'Baïonnette ratée');
    const d = baio(40, y);
    if (etat === 'parallele') return cadre(`${tube(d)}
      <line x1="30" y1="${y}" x2="770" y2="${y}" stroke="#1e7e54" stroke-width="2" stroke-dasharray="10 6"/>
      <line x1="30" y1="${y - DEC}" x2="770" y2="${y - DEC}" stroke="#1e7e54" stroke-width="2" stroke-dasharray="10 6"/>
      ${verdict(true, 'Branches parallèles, décalage à la cote, pièce plane', 400, 460)}`, 'Contrôler la baïonnette');
    return cadre(`${tube(d)}
      <line x1="620" y1="${y}" x2="620" y2="${y - DEC}" class="cz-cote"/><text x="632" y="${y - 66}" class="cz-txt">décalage</text>
      <text x="400" y="100" text-anchor="middle" class="cz-txt">Deux coudes égaux, en sens opposés</text>
      <text x="400" y="132" text-anchor="middle" class="cz-pt">les deux branches restent parallèles</text>`, 'La baïonnette');
  });
})();

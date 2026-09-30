/* CuivRézo — figures de la flamme oxyacétylénique.
   CONTRAT : enregistre « flamme » (trois · carburante · neutre · oxydante) dans CuivFigures.
   Chaque flamme sort d'une buse, horizontale. Le dard (cône intérieur) change de forme :
   carburante = dard long entouré d'un voile blanc ; neutre = dard net et arrondi ;
   oxydante = dard court et pointu. La flamme vacille légèrement (animation). */

(() => {
  'use strict';
  const STYLE = `<style>@keyframes cz-vac{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.06)}}
    .cz-vac{animation:cz-vac .6s ease-in-out infinite;transform-box:fill-box;transform-origin:left center}</style>`;
  function flamme(x, y, sorte, echelle) {
    const k = echelle || 1;
    const L = { carburante: 72, neutre: 44, oxydante: 30 }[sorte] * k, h = 9 * k;
    /* le dard : arrondi (carburante, neutre) ou en pointe (oxydante) */
    const dard = sorte === 'oxydante'
      ? `M${x} ${y - h} L${x + L} ${y} L${x} ${y + h} Z`
      : `M${x} ${y - h} C${x + L * .55} ${y - h * 1.15} ${x + L} ${y - h * .7} ${x + L} ${y} C${x + L} ${y + h * .7} ${x + L * .55} ${y + h * 1.15} ${x} ${y + h} Z`;
    const voile = sorte === 'carburante'
      ? `<path d="M${x} ${y - 13 * k} C${x + 60 * k} ${y - 24 * k} ${x + 125 * k} ${y - 15 * k} ${x + 150 * k} ${y} C${x + 125 * k} ${y + 15 * k} ${x + 60 * k} ${y + 24 * k} ${x} ${y + 13 * k} Z" fill="#ffffff" stroke="#8a96a3" stroke-width="2" stroke-dasharray="6 4"/>` : '';
    return `<g class="cz-vac">
      <path d="M${x} ${y - 16 * k} C${x + 90 * k} ${y - 40 * k} ${x + 250 * k} ${y - 26 * k} ${x + 300 * k} ${y} C${x + 250 * k} ${y + 26 * k} ${x + 90 * k} ${y + 40 * k} ${x} ${y + 16 * k} Z" fill="#8fb8e6" stroke="#3d7fca" stroke-width="1.5"/>
      ${voile}
      <path d="${dard}" fill="#ffffff" stroke="#1b3a63" stroke-width="2.5"/>
    </g>`;
  }
  const buse = (x, y, k = 1) => `<path d="M${x - 150 * k} ${y - 14 * k} H${x - 4} L${x} ${y - 8 * k} V${y + 8 * k} L${x - 4} ${y + 14 * k} H${x - 150 * k} Z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/>`;

  CuivFigures.ajouter('flamme', (etat, { cadre, etiquette }) => {
    if (etat === 'carburante' || etat === 'neutre' || etat === 'oxydante') {
      const x = 260, y = 230;
      const txt = {
        carburante: ['Flamme carburante', 'trop d’acétylène : le dard est long,', 'entouré d’un voile blanc'],
        neutre: ['Flamme neutre', 'le dard est net, arrondi, bien délimité :', 'ni voile blanc, ni pointe'],
        oxydante: ['Flamme oxydante', 'trop d’oxygène : le dard est court', 'et pointu, la flamme siffle']
      }[etat];
      return cadre(`${STYLE}
        ${buse(x, y, 1.6)}${flamme(x, y, etat, 1.8)}
        <text x="400" y="400" text-anchor="middle" class="cz-txt" style="font-size:30px">${txt[0]}</text>
        <text x="400" y="438" text-anchor="middle" class="cz-pt">${txt[1]}</text>
        <text x="400" y="468" text-anchor="middle" class="cz-pt">${txt[2]}</text>`, txt[0]);
    }
    /* les trois, l'une sous l'autre */
    const rangs = [['carburante', 'Carburante', 'dard long, voile blanc'], ['neutre', 'Neutre', 'dard net et arrondi'], ['oxydante', 'Oxydante', 'dard court et pointu']];
    return cadre(`${STYLE}
      ${rangs.map(([s, nom, d], i) => { const y = 100 + i * 150; return `${buse(190, y)}${flamme(190, y, s, 1)}
        <text x="540" y="${y - 4}" class="cz-txt" style="font-size:26px">${nom}</text>
        <text x="540" y="${y + 26}" class="cz-pt">${d}</text>`; }).join('')}`, 'Les trois flammes');
  });
})();

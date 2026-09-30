/* CuivRézo — figures de l'emboîture à l'expandeur.
   CONTRAT : enregistre « emboiture » (tete · ouvrir · tourner · profil · fissure · ovale) dans CuivFigures.
   Vues en COUPE longitudinale : le bout du tube, la tête de l'expandeur, puis le tube mâle emboîté.
   Cotes exagérées pour être lisibles : le jeu réel se compte en dixièmes de millimètre. */

(() => {
  'use strict';
  const Y = 250, R = 46, E = 9;                      /* axe, rayon extérieur du tube, paroi */

  /* un tube vu en coupe, de x0 à x1 ; `evase` = longueur élargie au bout droit, de `dr` de plus au rayon */
  function tube(x0, x1, evase, dr) {
    const xe = x1 - (evase || 0), d = dr || 0;
    const paroi = s => `<path d="M${x0} ${Y + s * R} H${xe} ${evase ? `L${xe + 14} ${Y + s * (R + d)} H${x1}` : `H${x1}`}
      V${Y + s * (R + d - E)} ${evase ? `H${xe + 14} L${xe} ${Y + s * (R - E)}` : ''} H${x0} Z" fill="url(#cz-cu)" stroke="#6e3a14" stroke-width="2"/>`;
    return paroi(-1) + paroi(1);
  }
  /* la tête : segments qui s'écartent (anime : ouvrir / fermer) */
  function tete(x, ouvert, anime) {
    const o = ouvert ? 9 : 0;
    const seg = s => `<g class="${anime ? 'cz-ouvre' + (s < 0 ? 'h' : 'b') : ''}"><path d="M${x} ${Y + s * 4} H${x + 120} V${Y + s * (R - E - 1 + o)} H${x + 8} Z" fill="url(#cz-ac)" stroke="#4d5763" stroke-width="2"/></g>`;
    return `<style>@keyframes cz-oh{0%,30%{transform:translateY(0)}60%,100%{transform:translateY(-9px)}}@keyframes cz-ob{0%,30%{transform:translateY(0)}60%,100%{transform:translateY(9px)}}
      .cz-ouvreh{animation:cz-oh 3s ease-in-out infinite}.cz-ouvreb{animation:cz-ob 3s ease-in-out infinite}</style>
      ${seg(-1)}${seg(1)}<rect x="${x + 120}" y="${Y - 22}" width="220" height="44" rx="10" fill="#2c7fb8" stroke="#1b4f73" stroke-width="3"/>`;
  }

  CuivFigures.ajouter('emboiture', (etat, { cadre, etiquette, verdict }) => {
    if (etat === 'tete' || etat === 'ouvrir') {
      const ouvert = etat === 'ouvrir';
      return cadre(`${tube(60, 420, ouvert ? 120 : 0, ouvert ? 9 : 0)}${tete(300, ouvert, ouvert)}
        ${etiquette(360, Y - 30, 560, 110, ouvert ? 'Les segments s’écartent' : 'La tête, au fond du bout')}
        <text x="566" y="142" class="cz-pt">${ouvert ? 'et élargissent le tube' : 'du diamètre du tube'}</text>
        ${etiquette(140, Y - R + 4, 140, 110, 'Le tube, vu en coupe', 'cz-txt', 'start')}`, ouvert ? 'Élargir le bout' : 'Engager la tête');
    }
    if (etat === 'tourner') return cadre(`${tube(60, 420, 120, 9)}${tete(300, true, false)}
      <path d="M660 150 a60 60 0 1 1 -40 -30" fill="none" stroke="#c9451a" stroke-width="6" marker-end="url(#cz-fl)"/>
      <text x="560" y="330" class="cz-txt">Refermer, tourner</text>
      <text x="560" y="362" class="cz-pt">d’un huitième de tour,</text>
      <text x="560" y="390" class="cz-pt">puis serrer de nouveau</text>`, 'Tourner la tête entre deux serrages');
    if (etat === 'fissure' || etat === 'ovale') return cadre(`${tube(80, 480, 130, 9)}
      ${etat === 'fissure' ? `<path d="M470 ${Y - R - 9} l-14 12 l10 8 l-14 12" fill="none" stroke="#b3261e" stroke-width="4"/>` : `<path d="M350 ${Y - R - 16} q60 -12 130 0" fill="none" stroke="#b3261e" stroke-width="4" stroke-dasharray="8 6"/>`}
      ${etiquette(465, Y - R - 4, 600, 140, etat === 'fissure' ? 'Fente au bord' : 'Élargi de travers')}
      ${verdict(false, etat === 'fissure' ? 'Emboîture fendue : la brasure ne tiendra pas' : 'Emboîture ovale ou marquée : jeu irrégulier', 400, 450)}`, 'Emboîture ratée');
    /* profil : le tube mâle emboîté, le jeu et la profondeur */
    const xe = 520 - 130;
    /* le bout femelle est élargi de 13 : son intérieur (R + 4) laisse 4 de jeu autour du mâle (rayon R) */
    return cadre(`${tube(60, 520, 130, 13)}
      <path d="M${xe + 20} ${Y - R} H760 V${Y - R + E} H${xe + 20} Z" fill="#e6a86b" stroke="#6e3a14" stroke-width="2"/>
      <path d="M${xe + 20} ${Y + R} H760 V${Y + R - E} H${xe + 20} Z" fill="#e6a86b" stroke="#6e3a14" stroke-width="2"/>
      <line x1="${xe + 14}" y1="${Y + R + 40}" x2="520" y2="${Y + R + 40}" class="cz-cote"/>
      <text x="${(xe + 534) / 2}" y="${Y + R + 72}" text-anchor="middle" class="cz-txt">profondeur d’emboîture</text>
      ${etiquette(470, Y - R - 2, 300, 90, 'Le jeu : quelques dixièmes, pour la brasure', 'cz-txt', 'start')}
      ${etiquette(200, Y - R + 4, 120, 160, 'Tube femelle, élargi', 'cz-txt', 'start')}
      ${etiquette(700, Y - R + 4, 640, 170, 'Tube mâle')}
      ${verdict(true, 'Le tube mâle entre sans forcer, sans jeu excessif', 400, 470)}`, 'L’emboîture réussie');
  });
})();

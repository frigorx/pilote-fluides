/* CartoClim 2.6 — scènes de la vanne 4 voies.
   Temps 2 : à gauche la vanne ouverte en deux (corps, tiroir et sa cuvette, deux pistons, vanne pilote à
   bobine, quatre voies), à droite le circuit vu de loin (croix du frigoriste : détendeur à gauche, compresseur
   à droite, échangeur extérieur en haut, intérieur en bas). Cinq pas : le mode froid, la bobine, la pilote,
   le tiroir qui glisse, le mode chaud. Le compresseur et ses deux tubes (refoulement, aspiration) ne changent
   jamais ; seuls les deux échangeurs changent de rôle.
   Rouge = haute pression, bleu = basse pression (charte). Aucun texte sur un tracé : chaque étiquette a sa
   place libre, vérifiée par outils/controler-station-navigateur.mjs.
   Temps 5 : ce qui change, ce qui ne change pas. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;
  const HP = C.chaud, BP = C.froid;
  const couleur = p => p === 'HP' ? HP : p === 'BP' ? BP : C.gris;
  const teinte = p => p === 'HP' ? '#efd2c9' : p === 'BP' ? '#c8def5' : C.creme;   /* aplats opaques : un voile translucide se mélange au fond et devient gris */
  /* petit chevron plein, posé sur un tube pour dire dans quel sens le fluide y va */
  const tri = (x, y, sens, s = 5.5) => ({
    l: `${x - s},${y} ${x + s},${y - s} ${x + s},${y + s}`,
    r: `${x + s},${y} ${x - s},${y - s} ${x - s},${y + s}`,
    d: `${x},${y + s} ${x - s},${y - s} ${x + s},${y - s}`,
    u: `${x},${y - s} ${x - s},${y + s} ${x + s},${y + s}`
  })[sens];
  const fleche = (x, y, sens, s) => `<polygon points="${tri(x, y, sens, s)}" fill="${C.papier}" stroke="none"/>`;

  function vanneEnCoupe() {
    const d = svg('0 0 900 560',
      'La vanne quatre voies ouverte en deux, avec son tiroir, ses deux pistons et sa vanne pilote à bobine ; à droite, le circuit : échangeur extérieur en haut, échangeur intérieur en bas, détendeur à gauche, compresseur à droite.');
    let e;                                              /* l'état dessiné */

    const peindre = () => {
      const s = e.s;                                    /* 1 : tiroir à droite (froid) · 0 : à gauche (chaud) */
      const pL = 135 + 80 * s, pR = pL + 280, xc = pL + 145;
      const mode = e.mode;                              /* 'froid' | 'chaud' | 'transit' */
      const pExt = mode === 'froid' ? 'HP' : mode === 'chaud' ? 'BP' : null;   /* le tube extérieur (gauche) */
      const pInt = mode === 'froid' ? 'BP' : mode === 'chaud' ? 'HP' : null;   /* le tube intérieur (droite) */
      const roleExt = mode === 'froid' ? 'condenseur' : mode === 'chaud' ? 'évaporateur' : 'en changement';
      const roleInt = mode === 'froid' ? 'évaporateur' : mode === 'chaud' ? 'condenseur' : 'en changement';
      const tir = e.agit === 'tiroir' ? C.feu : C.navy;
      const cuv = (e.agit === 'tiroir' || e.agit === 'cuvette') ? C.feu : C.navy;
      const tube = (dd, p, l = 12) => `<path d="${dd}" fill="none" stroke="${couleur(p)}" stroke-width="${l}" stroke-linejoin="round"${p ? '' : ' stroke-dasharray="9 7"'}/>`;
      const capG = e.pilote === 'B' ? 'BP' : 'HP';     /* le capillaire du bout gauche */
      const capD = e.pilote === 'A' ? 'BP' : 'HP';     /* celui du bout droit */
      const largG = pL - 124, largD = 228 - pL;        /* largeur des deux bouts du corps */
      const cap = (dd, p) => `<path d="${dd}" fill="none" stroke="${couleur(p)}" stroke-width="3" stroke-linejoin="round"/>`;
      const bout = (x, w, p) => `<rect x="${x}" y="256" width="${w}" height="92" fill="${teinte(p)}" stroke="none"/>`;
      const etiq = (x, p) => `<text x="${x}" y="308" font-size="15" font-weight="700" fill="${couleur(p)}">${p}</text>`;
      const piston = x => `<rect x="${x}" y="256" width="8" height="36" fill="${tir}" stroke="none"/><rect x="${x}" y="304" width="8" height="44" fill="${tir}" stroke="none"/>`;
      const coupe = (xm) => `M${xm - 58} 348 V322 H${xm + 58} V348`;

      d.innerHTML = `
<rect x="10" y="10" width="880" height="540" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="40" y="40" font-size="15" font-weight="700" fill="${C.navy}">LA VANNE 4 VOIES, EN COUPE</text>
<line x1="588" y1="30" x2="588" y2="530" stroke="${C.trait}" stroke-width="2"/>
<text x="612" y="40" font-size="15" font-weight="700" fill="${mode === 'froid' ? BP : mode === 'chaud' ? HP : C.gris}">LE CIRCUIT : ${mode === 'transit' ? 'EN CHANGEMENT' : 'MODE ' + mode.toUpperCase()}</text>

<!-- la vanne pilote et sa bobine -->
<rect x="90" y="56" width="150" height="44" rx="8" fill="${e.bobine ? 'rgba(255,107,53,.22)' : C.papier}" stroke="${e.bobine ? C.feu : C.navy}" stroke-width="${e.bobine ? 5 : 3}"/>
<g stroke="${e.bobine ? C.feu : C.navy}" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${110 + i * 20}" y1="66" x2="${110 + i * 20}" y2="90"/>`).join('')}</g>
<text x="252" y="76" font-size="15" font-weight="700" fill="${e.bobine ? C.ambre : C.navy}">bobine : ${e.bobine ? 'alimentée' : 'sans courant'}</text>
<text x="252" y="96" font-size="14" fill="${C.gris}">vanne pilote</text>
<rect x="85" y="104" width="150" height="30" rx="6" fill="${C.creme}" stroke="${e.agit === 'pilote' ? C.feu : C.navy}" stroke-width="${e.agit === 'pilote' ? 5 : 3}"/>
<path d="M100 134 V122 H${e.pilote === 'A' ? 220 : 160} V134" fill="none" stroke="${BP}" stroke-width="4" stroke-linejoin="round"/>
<rect x="${(e.pilote === 'A' ? 160 : 220) - 12}" y="129" width="24" height="6" fill="${C.navy}" stroke="none"/>

<!-- les trois capillaires : l'aspiration (au milieu de la pilote), le bout gauche, le bout droit -->
${cap('M100 134 V440 H320', 'BP')}
${cap('M160 134 V224 H127 V252', capG)}
${cap('M220 134 V165 H513 V252', capD)}

<!-- le corps de la vanne : tout l'intérieur est à haute pression, sauf la cuvette et le bout relié à l'aspiration -->
<rect x="120" y="252" width="400" height="100" rx="12" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<rect x="124" y="256" width="392" height="92" rx="9" fill="${teinte('HP')}" stroke="none"/>
${bout(124, largG, e.gauche)}${bout(pR + 8, largD, e.droite)}
${largG >= 40 ? etiq(132, e.gauche) : ''}${largD >= 40 ? etiq(pR + 16, e.droite) : ''}

<!-- le tiroir : deux pistons percés, une tige, une cuvette -->
${e.fantome ? `<path d="${coupe(360)}" fill="none" stroke="${C.gris}" stroke-width="3" stroke-dasharray="7 5"/>` : ''}
<rect x="${xc - 55}" y="325" width="110" height="23" fill="${teinte('BP')}" stroke="none"/>
<rect x="${pL + 8}" y="282" width="${pR - pL - 8}" height="10" fill="${tir}" stroke="none"/>
<rect x="${xc - 5}" y="292" width="10" height="30" fill="${tir}" stroke="none"/>
<path d="${coupe(xc)}" fill="none" stroke="${cuv}" stroke-width="5" stroke-linejoin="round"/>
${piston(pL)}${piston(pR)}
<text x="400" y="240" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">tiroir</text>
<line x1="400" y1="247" x2="400" y2="283" stroke="${C.navy}" stroke-width="2"/>
${e.force ? `<path d="M335 268 H262" fill="none" stroke="${C.feu}" stroke-width="5"${e.force === 'prevue' ? ' stroke-dasharray="9 6"' : ''}/><polygon points="246,268 262,259 262,277" fill="${C.feu}" stroke="none"/>` : ''}

<!-- les quatre voies -->
${tube('M470 192 H320 V262', 'HP')}
${tube('M240 346 V382 H152', pExt)}
${tube('M400 346 V382 H488', pInt)}
${tube('M320 346 V472', 'BP')}
${fleche(410, 192, 'l')}${fleche(320, 224, 'd')}${fleche(320, 376, 'd')}
${mode === 'froid' ? fleche(196, 382, 'l') + fleche(444, 382, 'l') : mode === 'chaud' ? fleche(196, 382, 'r') + fleche(444, 382, 'r') : ''}
<text x="306" y="221" text-anchor="end" font-size="15" font-weight="700" fill="${HP}">refoulement</text>
<text x="306" y="239" text-anchor="end" font-size="14" fill="${C.gris}">du compresseur</text>
<text x="252" y="404" text-anchor="end" font-size="14" fill="${C.gris}">échangeur extérieur</text>
<text x="252" y="423" text-anchor="end" font-size="15" font-weight="700" fill="${couleur(pExt)}">${roleExt}</text>
<text x="392" y="404" font-size="14" fill="${C.gris}">échangeur intérieur</text>
<text x="392" y="423" font-size="15" font-weight="700" fill="${couleur(pInt)}">${roleInt}</text>
<text x="320" y="496" text-anchor="middle" font-size="15" font-weight="700" fill="${BP}">aspiration</text>
<text x="320" y="514" text-anchor="middle" font-size="14" fill="${C.gris}">retour au compresseur</text>

<!-- le circuit, vu de loin -->
<path d="M645 124 H625 V284" fill="none" stroke="${couleur(mode === 'froid' ? 'HP' : mode === 'chaud' ? 'BP' : null)}" stroke-width="8" stroke-linejoin="round"${mode === 'transit' ? ' stroke-dasharray="9 7"' : ''}/>
<path d="M625 316 V480 H645" fill="none" stroke="${couleur(mode === 'froid' ? 'BP' : mode === 'chaud' ? 'HP' : null)}" stroke-width="8" stroke-linejoin="round"${mode === 'transit' ? ' stroke-dasharray="9 7"' : ''}/>
<path d="M720 272 V156" fill="none" stroke="${couleur(pExt)}" stroke-width="8"${mode === 'transit' ? ' stroke-dasharray="9 7"' : ''}/>
<path d="M720 328 V448" fill="none" stroke="${couleur(pInt)}" stroke-width="8"${mode === 'transit' ? ' stroke-dasharray="9 7"' : ''}/>
<path d="M756 284 H815" fill="none" stroke="${HP}" stroke-width="8"/>
<path d="M756 316 H815" fill="none" stroke="${BP}" stroke-width="8"/>
${fleche(790, 284, 'l', 4)}${fleche(782, 316, 'r', 4)}
${mode === 'froid' ? fleche(625, 200, 'd', 4) + fleche(625, 400, 'd', 4) + fleche(720, 220, 'u', 4) + fleche(720, 385, 'u', 4)
  : mode === 'chaud' ? fleche(625, 200, 'u', 4) + fleche(625, 400, 'u', 4) + fleche(720, 220, 'd', 4) + fleche(720, 385, 'd', 4) : ''}

<rect x="645" y="92" width="150" height="64" rx="10" fill="${teinte(pExt)}" stroke="${couleur(pExt)}" stroke-width="${e.agit === 'echangeurs' ? 6 : 4}"/>
<text x="720" y="116" text-anchor="middle" font-size="14" fill="${C.gris}">échangeur extérieur</text>
<text x="720" y="140" text-anchor="middle" font-size="17" font-weight="700" fill="${couleur(pExt)}">${roleExt}</text>
<rect x="645" y="448" width="150" height="64" rx="10" fill="${teinte(pInt)}" stroke="${couleur(pInt)}" stroke-width="${e.agit === 'echangeurs' ? 6 : 4}"/>
<text x="720" y="472" text-anchor="middle" font-size="14" fill="${C.gris}">échangeur intérieur</text>
<text x="720" y="496" text-anchor="middle" font-size="17" font-weight="700" fill="${couleur(pInt)}">${roleInt}</text>

<path d="M609 284 H641 L625 300 Z M609 316 H641 L625 300 Z" fill="${C.papier}" stroke="${C.navy}" stroke-width="3" stroke-linejoin="round"/>
<text x="636" y="354" font-size="14" fill="${C.gris}">détendeur</text>

<rect x="684" y="272" width="72" height="56" rx="6" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${mode === 'froid'
  ? `<path d="M756 284 H720 V272" fill="none" stroke="${HP}" stroke-width="5" stroke-linejoin="round"/><path d="M720 328 V316 H756" fill="none" stroke="${BP}" stroke-width="5" stroke-linejoin="round"/>`
  : mode === 'chaud'
  ? `<path d="M756 284 H740 L720 328" fill="none" stroke="${HP}" stroke-width="5" stroke-linejoin="round"/><path d="M720 272 L740 316 H756" fill="none" stroke="${BP}" stroke-width="5" stroke-linejoin="round"/>`
  : `<path d="M756 284 H720 V272 M720 328 V316 H756 M756 284 H740 L720 328 M720 272 L740 316 H756" fill="none" stroke="${C.gris}" stroke-width="3" stroke-dasharray="5 4"/>`}
<text x="734" y="352" font-size="14" fill="${C.gris}">vanne</text>
<text x="734" y="370" font-size="14" fill="${C.gris}">4 voies</text>

<circle cx="840" cy="300" r="28" fill="${C.papier}" stroke="${e.agit === 'compresseur' ? C.feu : C.navy}" stroke-width="3"/>
<path d="M826.8 304.7 A14 14 0 1 1 835.2 313.2" fill="none" stroke="${C.navy}" stroke-width="3"/>
<polygon points="828.6,310.8 833.5,317.9 836.9,308.5" fill="${C.navy}" stroke="none"/>
<text x="838" y="354" text-anchor="middle" font-size="15" font-weight="700" fill="${C.navy}">compresseur</text>
<text x="838" y="373" text-anchor="middle" font-size="14" fill="${C.gris}">toujours dans</text>
<text x="838" y="390" text-anchor="middle" font-size="14" fill="${C.gris}">le même sens</text>

<!-- la légende des couleurs -->
<line x1="40" y1="536" x2="70" y2="536" stroke="${HP}" stroke-width="8"/>
<text x="80" y="541" font-size="15" fill="${C.navy}">haute pression (HP)</text>
<line x1="250" y1="536" x2="280" y2="536" stroke="${BP}" stroke-width="8"/>
<text x="290" y="541" font-size="15" fill="${C.navy}">basse pression (BP)</text>`;
    };

    const etapes = [
      { titre: 'Mode froid : quatre voies, deux trajets',
        dire: 'Le refoulement du compresseur arrive par le tube seul et remplit le corps de la vanne : haute pression, en rouge. La cuvette du tiroir relie l’aspiration au tube de l’échangeur intérieur : basse pression, en bleu. L’échangeur extérieur reçoit la haute pression : il condense. L’intérieur évapore.',
        peindre: () => { e = { s: 1, mode: 'froid', bobine: false, pilote: 'A', gauche: 'HP', droite: 'BP', agit: 'cuvette' }; peindre(); } },
      { titre: 'On alimente la bobine',
        dire: 'La carte de la machine envoie le courant à la bobine. Le petit noyau de la vanne pilote se déplace : il ferme le tube de droite et relie celui de gauche à l’aspiration. Dans le corps de la vanne, rien n’a encore bougé.',
        peindre: () => { e = { s: 1, mode: 'froid', bobine: true, pilote: 'B', gauche: 'HP', droite: 'BP', agit: 'bobine' }; peindre(); } },
      { titre: 'Un bout se vide, l’autre pousse',
        dire: 'Le bout gauche, relié à l’aspiration, se vide : sa pression tombe. À droite, la haute pression, passée par le petit trou du piston, ne peut plus s’échapper. Le piston de droite est poussé plus fort que celui de gauche : le tiroir va partir du côté basse pression.',
        peindre: () => { e = { s: 1, mode: 'froid', bobine: true, pilote: 'B', gauche: 'BP', droite: 'HP', agit: 'pilote', force: 'prevue' }; peindre(); } },
      { titre: 'Le tiroir glisse',
        dire: 'Poussé par la différence de pression, le tiroir glisse avec sa cuvette. Pendant la course, la vanne n’est ni en position froid ni en position chaud : s’il s’arrêtait là, les deux échangeurs resteraient tièdes.',
        peindre: () => { e = { s: .5, mode: 'transit', bobine: true, pilote: 'B', gauche: 'BP', droite: 'HP', agit: 'tiroir', force: 'va', fantome: true }; peindre(); } },
      { titre: 'Mode chaud : les rôles sont échangés',
        dire: 'La cuvette relie maintenant l’aspiration à l’échangeur extérieur : il évapore et prend la chaleur dehors. Le refoulement va à l’échangeur intérieur : il condense et chauffe la pièce. Refoulement et aspiration n’ont pas bougé : le compresseur tourne toujours dans le même sens.',
        peindre: () => { e = { s: 0, mode: 'chaud', bobine: true, pilote: 'B', gauche: 'BP', droite: 'HP', agit: 'echangeurs' }; peindre(); } }
    ];
    return pasAPas(d, etapes, 'Ici, bobine alimentée = mode chaud. Selon le modèle c’est l’inverse : la vanne est la même, seule la position « sans courant » change. Le dégivrage fait ce même basculement : station 2.7.');
  }

  /* Temps 5 : ce qui change, ce qui ne change pas, d'un mode à l'autre. */
  function recapitulatif() {
    const d = svg('0 0 820 280', 'Récapitulatif : en mode froid, l’échangeur extérieur condense et l’intérieur évapore ; en mode chaud, c’est l’inverse. Le compresseur garde son sens, le refoulement reste sur le tube seul, l’aspiration sur le tube du milieu.');
    const puce = (x, y, w, p, texte) => `<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" fill="${teinte(p)}" stroke="${couleur(p)}" stroke-width="3"/>
<text x="${x + w / 2}" y="${y + 26}" text-anchor="middle" font-size="16" font-weight="700" fill="${couleur(p)}">${texte}</text>`;
    const neutre = (x, y, w, texte) => `<rect x="${x}" y="${y}" width="${w}" height="40" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<text x="${x + w / 2}" y="${y + 26}" text-anchor="middle" font-size="16" fill="${C.navy}">${texte}</text>`;
    const ligne = (y, texte) => `<text x="30" y="${y + 26}" font-size="16" font-weight="700" fill="${C.navy}">${texte}</text>`;
    d.innerHTML = `
<rect x="10" y="10" width="800" height="262" rx="16" fill="${C.papier}" stroke="${C.trait}"/>
<text x="367" y="46" text-anchor="middle" font-size="19" font-weight="700" fill="${BP}">MODE FROID</text>
<text x="647" y="46" text-anchor="middle" font-size="19" font-weight="700" fill="${HP}">MODE CHAUD</text>
${ligne(60, 'Échangeur extérieur')}${puce(235, 60, 265, 'HP', 'condenseur · haute pression')}${puce(515, 60, 265, 'BP', 'évaporateur · basse pression')}
${ligne(112, 'Échangeur intérieur')}${puce(235, 112, 265, 'BP', 'évaporateur · basse pression')}${puce(515, 112, 265, 'HP', 'condenseur · haute pression')}
${ligne(164, 'Compresseur')}${neutre(235, 164, 545, 'tourne dans le même sens, dans les deux modes')}
${ligne(216, 'Refoulement, aspiration')}${neutre(235, 216, 545, 'refoulement sur le tube seul, aspiration sur celui du milieu')}`;
    return d;
  }

  return { vanneEnCoupe, recapitulatif };
})();

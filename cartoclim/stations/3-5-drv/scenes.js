/* CartoClim 3.5 — scènes du DRV. Temps 2 : le réseau en arbre d'un immeuble de bureaux, en six pas
   (le fluide dans la colonne et les dérivations, le détendeur de chaque pièce, le bus, le compresseur,
   puis les deux façons de choisir le mode : deux tubes, ou récupération d'énergie).
   Temps 5 : ce qu'on maîtrise du groupe à la dernière unité.
   Aucun texte sur un tracé : chaque étiquette a sa place libre, vérifiée par
   outils/controler-station-navigateur.mjs. Les couleurs viennent de SceneKit.C :
   bleu = froid, rouge = chaud, vert = bus de communication. */
const ScenesStation = (() => {
  'use strict';
  const { svg, C, pasAPas } = SceneKit;

  /* un texte : x, y, contenu, options { a: ancrage, c: couleur, t: taille, g: gras (défaut oui) } */
  const tx = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}"${o.a ? ` text-anchor="${o.a}"` : ''} font-size="${o.t || 14}"${o.g === false ? '' : ' font-weight="700"'} fill="${o.c || C.navy}">${s}</text>`;

  /* un détendeur électronique : deux triangles, une tige vers le bas, un petit moteur */
  const vanne = (x, y, c, w) =>
    `<path d="M${x - 14} ${y - 9} V${y + 9} L${x} ${y} Z M${x + 14} ${y - 9} V${y + 9} L${x} ${y} Z" fill="${C.papier}" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>` +
    `<path d="M${x} ${y} V${y + 15}" stroke="${c}" stroke-width="${w}"/>` +
    `<rect x="${x - 6}" y="${y + 15}" width="12" height="8" fill="${C.papier}" stroke="${c}" stroke-width="${w}"/>`;

  const fleche = (id, c) =>
    `<marker id="${id}" markerUnits="userSpaceOnUse" markerWidth="16" markerHeight="16" refX="10" refY="8" orient="auto"><path d="M0 1 L16 8 L0 15 z" fill="${c}"/></marker>`;

  function reseauEnArbre() {
    const d = svg('0 0 860 540',
      'Un immeuble de bureaux en coupe : le groupe extérieur sur le toit, une colonne de tubes qui descend, une dérivation à chaque étage, deux unités intérieures par étage, et un bus de communication qui relie chaque unité au groupe.');
    let e = 0;
    const CX = 330;                       /* la colonne */
    const YB = [193, 311, 429];           /* l'axe de chaque étage */
    /* six unités : étage k, côté -1 (gauche) ou +1 (droite) */
    const U = [];
    YB.forEach((y, k) => [-1, 1].forEach(c => U.push({
      k, y, c,
      x0: c < 0 ? 130 : 434,              /* bord gauche du rectangle */
      bord: c < 0 ? 226 : 434,            /* le côté qui regarde la colonne */
      ve: c < 0 ? 272 : 388,              /* le détendeur */
      av: c < 0 ? 302 : 358,              /* le sommet où l'on pose une flèche */
      cx: c < 0 ? 178 : 482               /* le centre, pour les étiquettes */
    })));

    const peindre = () => {
      const reseauAllume = e !== 2;                       /* au pas du bus, ce sont les fils qui comptent */
      const flot = e === 3 ? 9 : 6;
      const froid = C.froid, chaud = C.chaud;
      /* couleur et épaisseur de la branche d'une unité */
      const coulBranche = u => e === 5 ? (u.k === 0 ? chaud : froid) : (reseauAllume ? froid : C.gris);
      const epBranche = (u, i) => e === 1 ? (i === 0 ? 11 : i === 5 ? 3 : 6) : (reseauAllume ? flot : 5);
      const coulUnite = (u, i) => {
        if (e === 0 || e === 4) return froid;
        if (e === 1) return (i === 0 || i === 5) ? froid : C.navy;
        if (e === 5) return u.k === 0 ? chaud : froid;
        return C.navy;
      };
      const flechesOn = e === 0 || e === 3;
      const coulColonne = reseauAllume ? froid : C.gris;
      const epColonne = reseauAllume ? flot : 5;
      const mk = flechesOn ? 'url(#drv-fl-bleu)' : '';

      let s = `<defs>${fleche('drv-fl-bleu', froid)}${fleche('drv-fl-vert', C.vert)}${fleche('drv-fl-ambre', C.ambre)}</defs>
<rect x="10" y="10" width="840" height="520" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<!-- l'immeuble : le toit est son bord du haut -->
<rect x="60" y="134" width="540" height="354" rx="6" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
<path d="M60 252 H600 M60 370 H600" stroke="${C.trait}" stroke-width="2" stroke-dasharray="10 8" fill="none"/>

<!-- le groupe, sur le toit -->
${tx(240, 44, 'groupe extérieur, en toiture')}
<rect x="240" y="56" width="180" height="78" rx="10" fill="${C.papier}" stroke="${e === 0 ? froid : C.navy}" stroke-width="${e === 0 ? 5 : 3}"/>
<circle cx="282" cy="95" r="26" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M282 69 V121 M256 95 H308" stroke="${C.navy}" stroke-width="3" fill="none"/>
<rect x="336" y="72" width="70" height="46" rx="10" fill="${C.papier}" stroke="${e === 3 ? chaud : C.navy}" stroke-width="${e === 3 ? 6 : 3}"/>
${tx(371, 99, 'compr.', { a: 'middle', c: e === 3 ? chaud : C.navy })}

<!-- le bus de communication : un fil de chaque côté, jusqu'au groupe -->
<path d="M88 ${YB[2] + 10} V118 H240" fill="none" stroke="${e === 2 ? C.vert : C.gris}" stroke-width="${e === 2 ? 4 : 2}" stroke-dasharray="${e === 2 ? '12 6' : '6 5'}" stroke-linejoin="round" marker-end="${e === 2 ? 'url(#drv-fl-vert)' : ''}"/>
<path d="M572 ${YB[2] + 10} V118 H420" fill="none" stroke="${e === 2 ? C.vert : C.gris}" stroke-width="${e === 2 ? 4 : 2}" stroke-dasharray="${e === 2 ? '12 6' : '6 5'}" stroke-linejoin="round" marker-end="${e === 2 ? 'url(#drv-fl-vert)' : ''}"/>
${U.map(u => `<path d="M${u.bord === 226 ? 130 : 434} ${u.y + 10} H${u.c < 0 ? 88 : 572}" fill="none" stroke="${e === 2 ? C.vert : C.gris}" stroke-width="${e === 2 ? 4 : 2}" stroke-dasharray="${e === 2 ? '12 6' : '6 5'}"/>`).join('')}`;

      /* la colonne et les dérivations */
      if (e === 5) {
        /* trois tubes : gaz chaud, liquide, gaz de retour, coupés devant chaque boîtier */
        const segs = [[134, YB[0] - 20], [YB[0] + 20, YB[1] - 20], [YB[1] + 20, YB[2] - 20]];
        [[318, chaud], [330, C.eau], [342, froid]].forEach(([x, c]) =>
          segs.forEach(([a, b]) => { s += `<path d="M${x} ${a} V${b}" stroke="${c}" stroke-width="4" fill="none"/>`; }));
        U.forEach((u, i) => {
          s += `<path d="M${u.c < 0 ? 296 : 364} ${u.y} H${u.bord}" stroke="${coulBranche(u)}" stroke-width="6" fill="none"/>`;
        });
        YB.forEach(y => { s += `<rect x="296" y="${y - 20}" width="68" height="40" rx="6" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>`; });
      } else {
        s += `<path d="M${CX} 134 V164 V282 V400 V429" fill="none" stroke="${coulColonne}" stroke-width="${epColonne}" stroke-linejoin="round" marker-mid="${mk}"/>`;
        U.forEach((u, i) => {
          s += `<path d="M${CX} ${u.y} H${u.av} H${u.bord}" fill="none" stroke="${coulBranche(u)}" stroke-width="${epBranche(u, i)}" marker-mid="${mk}"/>`;
        });
        YB.forEach(y => { s += `<circle cx="${CX}" cy="${y}" r="7" fill="${C.navy}"/>`; });
      }

      /* les unités et leurs détendeurs */
      U.forEach((u, i) => {
        const cu = coulUnite(u, i), wu = (e === 0 || e === 4 || e === 5 || ((e === 1) && (i === 0 || i === 5))) ? 5 : 3;
        s += vanne(u.ve, u.y, e === 1 ? C.orange : C.navy, e === 1 ? 4 : 3);
        s += `<rect x="${u.x0}" y="${u.y - 20}" width="96" height="40" rx="8" fill="${C.papier}" stroke="${cu}" stroke-width="${wu}"/>`;
        const fx = u.c < 0 ? u.x0 + 24 : u.x0 + 72, cx2 = u.c < 0 ? u.x0 + 62 : u.x0 + 24;
        s += `<circle cx="${fx}" cy="${u.y}" r="11" fill="none" stroke="${C.navy}" stroke-width="2"/><path d="M${fx} ${u.y - 11} V${u.y + 11} M${fx - 11} ${u.y} H${fx + 11}" stroke="${C.navy}" stroke-width="2" fill="none"/>`;
        s += `<path d="M${cx2} ${u.y - 13} V${u.y + 13} M${cx2 + 10} ${u.y - 13} V${u.y + 13} M${cx2 + 20} ${u.y - 13} V${u.y + 13}" stroke="${C.navy}" stroke-width="2" fill="none"/>`;
      });

      /* ce que chaque pas écrit sur le dessin */
      if (e === 0) {
        s += tx(318, 156, 'colonne', { a: 'end', c: froid });
        s += tx(344, 176, 'dérivation', { c: C.navy });
        s += tx(178, 162, 'unité intérieure', { a: 'middle', g: false, c: C.gris });
      }
      if (e === 1) {
        s += tx(272, 148, 'détendeur', { a: 'middle', t: 13, c: C.orange });
        s += tx(272, 165, 'électronique', { a: 'middle', t: 13, c: C.orange });
        s += tx(100, U[0].y + 40, `pièce chaude : <tspan fill="${froid}">gros débit</tspan>`, { t: 13, c: chaud });
        s += tx(562, U[5].y + 40, `pièce déjà fraîche : <tspan fill="${froid}">petit débit</tspan>`, { a: 'end', t: 13, c: chaud });
      }
      if (e === 2) {
        s += tx(94, 108, 'bus de communication', { t: 13, c: C.vert });
        U.forEach((u, i) => { s += tx(u.cx, u.y + 40, 'adresse ' + (i + 1), { a: 'middle', c: C.vert }); });
      }
      if (e === 3) {
        s += tx(432, 84, 'la demande monte :', { c: C.navy });
        s += tx(432, 103, 'le compresseur accélère', { c: chaud });
      }
      if (e === 4) {
        s += tx(432, 84, 'tout le réseau', { c: froid });
        s += tx(432, 103, 'dans le même mode', { c: froid });
        U.forEach(u => { s += tx(u.cx, u.y + 40, 'froid', { a: 'middle', c: froid }); });
        s += tx(652, 168, 'deux tubes', { c: C.navy });
        s += `<circle cx="664" cy="196" r="12" fill="none" stroke="${froid}" stroke-width="4"/>${tx(684, 200, 'gros tube : gaz', { t: 13, c: froid })}`;
        s += `<circle cx="664" cy="226" r="6" fill="none" stroke="${C.eau}" stroke-width="4"/>${tx(684, 230, 'petit tube : liquide', { t: 13, c: C.eau })}`;
      }
      if (e === 5) {
        s += `<path d="M470 33 H498" stroke="${chaud}" stroke-width="5" fill="none"/>${tx(508, 37, 'gaz chaud', { t: 13, c: chaud })}`;
        s += `<path d="M470 55 H498" stroke="${C.eau}" stroke-width="5" fill="none"/>${tx(508, 59, 'liquide', { t: 13, c: C.eau })}`;
        s += `<path d="M470 77 H498" stroke="${froid}" stroke-width="5" fill="none"/>${tx(508, 81, 'gaz de retour', { t: 13, c: froid })}`;
        s += tx(372, 158, 'boîtier de répartition', { c: C.navy });
        s += tx(616, YB[0] - 5, 'bureau nord', { c: chaud });
        s += tx(616, YB[0] + 14, 'chaud', { c: chaud });
        s += tx(616, YB[1] - 5, 'salle de réunion', { c: froid });
        s += tx(616, YB[1] + 14, 'froid', { c: froid });
        s += tx(616, YB[2] - 5, 'accueil', { c: froid });
        s += tx(616, YB[2] + 14, 'froid', { c: froid });
        s += `<path d="M178 289 C140 270 140 232 178 215" fill="none" stroke="${C.ambre}" stroke-width="5" marker-end="url(#drv-fl-ambre)"/>`;
        s += tx(192, 244, 'chaleur', { c: C.ambre });
      }
      d.innerHTML = s;
    };

    const pas = [
      { titre: 'Le groupe pousse le fluide dans le réseau',
        dire: 'Sur le toit, le groupe envoie le fluide dans une colonne qui descend. À chaque étage, une dérivation — un joint Y — le partage entre deux unités : le réseau a la forme d’un arbre.',
        peindre: () => { e = 0; peindre(); } },
      { titre: 'Chaque pièce règle son propre débit',
        dire: 'Dans chaque unité intérieure, un détendeur électronique s’ouvre plus ou moins. Pièce très chaude : grand débit. Pièce déjà fraîche : il se ferme presque. Le même réseau sert tout le monde, chacun selon son besoin.',
        peindre: () => { e = 1; peindre(); } },
      { titre: 'Le bus dit au groupe ce que chaque pièce demande',
        dire: 'Un câble de communication, le bus, relie chaque unité au groupe. Chaque unité y a son adresse : elle annonce sa demande, et la télécommande se rattache à la bonne unité.',
        peindre: () => { e = 2; peindre(); } },
      { titre: 'Le compresseur suit la demande totale',
        dire: 'Le groupe additionne les demandes. Quand elles montent, son compresseur à vitesse variable accélère : le débit de fluide augmente dans tout le réseau.',
        peindre: () => { e = 3; peindre(); } },
      { titre: 'Deux tubes : tout le monde dans le même mode',
        dire: 'Avec un réseau à deux tubes — un gros pour le gaz, un petit pour le liquide —, le groupe décide pour tout l’immeuble : tout en froid, ou tout en chaud.',
        peindre: () => { e = 4; peindre(); } },
      { titre: 'Récupération d’énergie : froid et chaud ensemble',
        dire: 'Avec trois tubes et un boîtier de répartition par zone, chaque zone choisit. La chaleur retirée dans la salle de réunion sert à chauffer le bureau nord : l’immeuble se partage son énergie.',
        peindre: () => { e = 5; peindre(); } }
    ];
    return pasAPas(d, pas, 'Sur le dessin, chaque trait du réseau regroupe les deux tubes (gaz et liquide). Six pas : le fluide, la demande de chaque pièce, le bus, le compresseur, puis les deux façons de choisir le mode.');
  }

  /* Temps 5 : ce qu'on maîtrise du groupe à la dernière unité, en un dessin. */
  function recapitulatif() {
    const d = svg('0 0 860 380',
      'Récapitulatif : le groupe extérieur est relié par un réseau de tubes en arbre à plusieurs unités intérieures, et par un bus de communication qui donne une adresse à chacune. Trois contrôles à la mise en service : la charge calculée par tronçon, le brasage sous azote, l’adressage de chaque unité.');
    d.innerHTML = `
<rect x="10" y="10" width="840" height="360" rx="16" fill="${C.papier}" stroke="${C.trait}"/>

<rect x="30" y="70" width="190" height="110" rx="14" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${tx(125, 102, 'Groupe extérieur', { a: 'middle', t: 16 })}
${tx(125, 128, 'compresseur Inverter', { a: 'middle', t: 14, g: false, c: C.gris })}
${tx(125, 150, 'batterie · ventilateurs', { a: 'middle', t: 14, g: false, c: C.gris })}

<path d="M220 125 H330 M330 65 V185 M330 65 H590 M330 125 H590 M330 185 H590" fill="none" stroke="${C.froid}" stroke-width="6" stroke-linejoin="round"/>
<circle cx="330" cy="125" r="8" fill="${C.navy}"/>
${tx(460, 111, 'réseau de tubes', { a: 'middle', t: 15, c: C.froid })}

<rect x="590" y="40" width="210" height="50" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${tx(695, 62, 'Unité intérieure', { a: 'middle', t: 15 })}
${tx(695, 80, 'détendeur · adresse 1', { a: 'middle', t: 13, g: false, c: C.gris })}
<rect x="590" y="100" width="210" height="50" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${tx(695, 122, 'Unité intérieure', { a: 'middle', t: 15 })}
${tx(695, 140, 'détendeur · adresse 2', { a: 'middle', t: 13, g: false, c: C.gris })}
<rect x="590" y="160" width="210" height="50" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="3"/>
${tx(695, 182, 'Unité intérieure', { a: 'middle', t: 15 })}
${tx(695, 200, 'et des dizaines d’autres', { a: 'middle', t: 13, g: false, c: C.gris })}

<path d="M125 180 V240 H830 V65 H800 M830 125 H800 M830 185 H800" fill="none" stroke="${C.vert}" stroke-width="3" stroke-dasharray="10 6" stroke-linejoin="round"/>
${tx(470, 264, 'bus de communication : une adresse par unité', { a: 'middle', t: 15, c: C.vert })}

${tx(440, 210, 'deux tubes : le même mode partout', { a: 'middle', t: 14, g: false })}
${tx(440, 229, 'avec boîtiers : froid et chaud ensemble', { a: 'middle', t: 14, g: false })}

${tx(30, 296, 'À la mise en service', { t: 15 })}
<rect x="30" y="308" width="250" height="44" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
${tx(155, 335, 'charge calculée par tronçon', { a: 'middle', t: 15 })}
<rect x="305" y="308" width="250" height="44" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
${tx(430, 335, 'brasage sous azote', { a: 'middle', t: 15 })}
<rect x="580" y="308" width="250" height="44" rx="10" fill="${C.creme}" stroke="${C.navy}" stroke-width="2"/>
${tx(705, 335, 'adressage de chaque unité', { a: 'middle', t: 15 })}`;
    return d;
  }

  return { reseauEnArbre, recapitulatif };
})();

/* Station 3-1 — La brasure tendre à l'étain. Source : sources-metier/3-brasures.md (partie 3-1)
   Référence : fiche 02 « brasure tendre » du Centre du cuivre et le cours CICLA. Usage : eau sanitaire et
   chauffage ; en froid, on brase fort (cours T10 de 1re MFER) : la station le dit.
   DÉCIDÉ le 30/09/2026 (DECISIONS-2026-09-30.md) : le chalumeau propane s'allume et se règle devant le
   professeur, d'après la notice du chalumeau ; le décapant va sur les deux surfaces à assembler ; pas de
   couleur de chauffe, le fil d'étain fait le test. */
CUIVREZO.stations.push({
  id: '3-1', ligne: 3, titre: 'La brasure tendre à l’étain', duree: '30 min', vignette: 'images/3-1-tendre.webp',
  sources: ['sources-metier/3-brasures.md'],
  referentiel: { taches: [REF.T10, REF.T12], competences: [REF.C34], savoirs: [REF.S55, REF.S62, REF.S63] },
  obtenir: {
    titre: 'Un anneau d’étain régulier, étanche',
    texte: 'L’étain a filé tout autour du joint et forme un anneau régulier. Le cuivre n’est pas noirci, le décapant est essuyé.',
    criteres: ['Anneau d’étain régulier, tout autour du joint', 'Cuivre non noirci, non brûlé', 'Décapant essuyé, pas de coulure à l’intérieur', 'Pièces restées immobiles pendant le refroidissement'],
    figure: { img: 'images/3-1-tendre.webp', alt: 'L’étain file autour d’un joint chauffé au chalumeau propane', legende: 'L’étain touche le cuivre chaud et file tout autour.' },
    narration: 'La brasure tendre se fait à basse température : l’étain fond vers deux cent cinquante degrés, bien avant que le cuivre ne rougisse. Elle sert sur les réseaux d’eau sanitaire et de chauffage. Sur un circuit frigorifique, qui monte en pression, on brase fort : ce sera la station suivante. Mais le principe est le même, et il est plus facile à voir ici : un métal fondu qui file tout seul dans un joint chaud et propre.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/3-1-tendre.webp', alt: 'Le chalumeau propane et le fil d’étain' },
    items: [
      { nom: 'Le fil d’étain', detail: 'étain-cuivre ou étain-argent : jamais d’étain-plomb sur l’eau potable' },
      { nom: 'La pâte décapante', detail: 'adaptée à la brasure tendre' },
      { nom: 'Le tampon abrasif et un chiffon propre', detail: 'pour nettoyer avant, essuyer après' },
      { nom: 'Le chalumeau propane', detail: 'allumé et réglé devant le professeur, d’après la notice du chalumeau' },
      { nom: 'Le pare-flamme', detail: 'derrière le joint' },
      { nom: 'L’emboîture prête', detail: 'station 1.7 : le tube entre sans forcer ni jouer' }
    ],
    narration: 'Pour la brasure tendre, un petit chalumeau au propane suffit. L’apport est un fil d’étain, allié au cuivre ou à l’argent. Attention : l’étain-plomb est interdit sur l’eau potable. La pâte décapante empêche le cuivre de s’oxyder pendant la chauffe. Et le pare-flamme protège ce qui se trouve derrière le joint.'
  },
  gestes: [
    { titre: 'Protéger autour du joint', texte: 'Posez le pare-flamme derrière le joint. Écartez tout ce qui peut brûler.',
      pointCle: 'Ce qui est derrière le joint est aussi dans la flamme.',
      pourquoi: 'Sur chantier, derrière le tuyau, il y a un mur, un câble, une cloison.',
      figure: { svg: 'poste', etat: 'secours' }, clip: 'clips/3-1/01-proteger.mp4',
      narration: 'Avant de chauffer, on pense à ce qui est derrière le joint : la flamme le touchera aussi. À l’atelier, un pare-flamme ; sur chantier, ce sera un mur, un câble, une cloison. On écarte tout ce qui peut brûler.' },
    { titre: 'Emboîter à sec', texte: 'Présentez les deux pièces sans rien : le tube entre sans forcer, sans jouer.',
      pointCle: 'Un jeu faible et régulier.',
      pourquoi: 'L’étain monte par capillarité dans un jeu fin. Trop large, il ne monte plus.',
      figure: { svg: 'emboiture', etat: 'profil' }, clip: 'clips/3-1/02-sec.mp4',
      narration: 'On emboîte d’abord à sec, sans décapant, pour vérifier l’ajustage. Le tube doit entrer sans forcer et ne pas jouer. C’est dans ce jeu très fin que l’étain va monter, tout seul.' },
    { titre: 'Nettoyer au tampon abrasif', texte: 'Nettoyez l’extérieur du mâle et l’intérieur de la femelle jusqu’au métal brillant.',
      pointCle: 'Brillant sur toute la longueur emboîtée.',
      pourquoi: 'L’étain ne mouille pas un cuivre oxydé.',
      figure: { svg: 'brasure', etat: 'capillarite' }, clip: 'clips/3-1/03-nettoyer.mp4',
      narration: 'On nettoie au tampon abrasif l’extérieur du tube mâle et l’intérieur de l’emboîture, jusqu’à ce que le cuivre brille. L’étain ne s’accroche pas à un cuivre terni : il roulerait dessus en billes.' },
    { titre: 'Étaler le décapant sur les deux pièces', texte: 'Une fine couche de pâte décapante sur le mâle, et une autre à l’intérieur de l’emboîture, sans excès, tube tenu vers le haut.',
      pointCle: 'Peu, sur les deux pièces, et pas de coulure dans le tube.',
      pourquoi: 'Le décapant protège le cuivre de l’oxydation à la chauffe. En excès, il coule dans le tube.',
      figure: { svg: 'brasure', etat: 'capillarite' }, clip: 'clips/3-1/04-decapant.mp4',
      narration: 'On étale une fine couche de pâte décapante sur le tube mâle, et une autre à l’intérieur de l’emboîture : partout où l’étain devra s’accrocher. Juste de quoi couvrir : le surplus ne sert à rien, il coule à l’intérieur du tube. Le décapant empêche le cuivre de s’oxyder pendant la chauffe, pour que l’étain puisse s’y accrocher.' },
    { titre: 'Emboîter en tournant', texte: 'Emboîtez les deux pièces en tournant un peu.',
      pointCle: 'Le décapant se répartit tout autour.',
      pourquoi: 'Un côté sans décapant, c’est un côté où l’étain ne prend pas.',
      figure: { svg: 'emboiture', etat: 'profil' }, clip: 'clips/3-1/05-emboiter.mp4',
      narration: 'On emboîte en faisant tourner un peu le tube : le décapant se répartit sur tout le tour du joint.' },
    { titre: 'Chauffer modérément', texte: 'Le chalumeau propane est allumé et réglé devant le professeur. Chauffez toute la longueur de l’emboîture, en balayant.',
      pointCle: 'Modérément : le cuivre ne doit ni noircir ni rougir.',
      pourquoi: 'L’étain fond vers 250 °C. Au-delà, on oxyde le cuivre, et l’étain n’y adhère plus. Il n’y a pas de couleur à attendre : c’est le fil d’étain, au geste suivant, qui dit si le tube est assez chaud.',
      figure: { svg: 'brasure', etat: 'chauffe' }, clip: 'clips/3-1/06-chauffer.mp4',
      narration: 'Le chalumeau propane s’allume et se règle devant le professeur, d’après la notice du chalumeau. Ensuite, on chauffe toute la longueur de l’emboîture, en balayant. Modérément : l’étain fond vers deux cent cinquante degrés, le cuivre ne doit ni noircir ni rougir. Trop chauffé, il s’oxyde, et l’étain n’y tient plus. Il n’y a pas de couleur à attendre : c’est le fil d’étain, au geste suivant, qui dira si le tube est assez chaud.' },
    { titre: 'Toucher le joint avec l’étain', texte: 'Écartez la flamme et touchez le joint avec le fil d’étain.',
      pointCle: 'L’étain fond au contact du tube chaud, pas dans la flamme.',
      pourquoi: 'Si le tube est assez chaud, c’est lui qui fait fondre l’étain et l’aspire dans le joint.',
      figure: { img: 'images/3-1-tendre.webp', alt: 'Le fil d’étain touche le joint chaud' }, clip: 'clips/3-1/07-etain.mp4',
      narration: 'On écarte la flamme, et l’on touche le joint avec le bout du fil d’étain. S’il fond au contact, le tube est à la bonne température. S’il ne fond pas, on rechauffe un peu. On ne fond jamais l’étain dans la flamme : il tomberait en goutte sur un tube trop froid.' },
    { titre: 'Regarder l’étain filer', texte: 'L’étain disparaît dans le joint et forme un anneau tout autour.',
      pointCle: 'Un anneau fermé : le joint est plein.',
      pourquoi: 'C’est la capillarité : le joint aspire l’étain fondu jusqu’au fond.',
      figure: { svg: 'brasure', etat: 'capillarite' }, clip: 'clips/3-1/08-filer.mp4',
      narration: 'Regardez l’étain : il ne coule pas vers le bas, il file dans le joint, tout autour, même vers le haut. C’est la capillarité. Quand un anneau brillant fait le tour complet, on arrête : le joint est plein.' },
    { titre: 'Essuyer, puis laisser refroidir', texte: 'Essuyez le joint au chiffon. Laissez refroidir sans bouger l’assemblage.',
      pointCle: 'Ne rien bouger tant que l’étain n’est pas figé.',
      pourquoi: 'Un joint bougé pendant qu’il fige se fissure. Et un décapant laissé en place ronge le cuivre.',
      figure: { svg: 'brasure', etat: 'reussie' }, clip: 'clips/3-1/09-essuyer.mp4',
      narration: 'On essuie le joint au chiffon pour retirer le décapant, qui rongerait le cuivre avec le temps. Avec un décapant halogéné, on lave même à l’eau chaude. Puis on laisse refroidir sans toucher à l’assemblage : un joint qu’on bouge pendant que l’étain fige se fissure.' }
  ],
  pieges: [
    { titre: 'L’étain qui ne prend pas', voit: 'L’étain roule en billes, sans entrer dans le joint.', cause: 'Cuivre mal nettoyé, ou oxydé par une chauffe trop forte.',
      eviter: 'Cuivre brillant, décapant, chauffe modérée.', geste: 2, figure: { svg: 'brasure', etat: 'surchauffe' },
      narration: 'Premier piège : l’étain qui roule en billes. Le cuivre était sale, ou on l’a trop chauffé et il s’est oxydé.' },
    { titre: 'L’étain fondu dans la flamme', voit: 'Une goutte posée sur le joint.', cause: 'L’étain a été fondu par la flamme sur un tube pas assez chaud.',
      eviter: 'Écarter la flamme, toucher le tube chaud.', geste: 6, figure: { svg: 'brasure', etat: 'seche' },
      narration: 'Deuxième piège : fondre l’étain dans la flamme. Il tombe en goutte sur le joint sans y entrer.' },
    { titre: 'Le décapant oublié', voit: 'Des traces vertes, de la corrosion autour du joint, des semaines plus tard.', cause: 'Le décapant n’a pas été essuyé.',
      eviter: 'Essuyer aussitôt, laver un décapant halogéné.', geste: 8, figure: { svg: 'brasure', etat: 'reussie' },
      narration: 'Troisième piège, qui ne se voit que plus tard : le décapant laissé sur le joint. Il continue de ronger le cuivre.' },
    { titre: 'Le joint bougé', voit: 'Une fissure dans l’anneau d’étain.', cause: 'On a bougé l’assemblage avant que l’étain soit figé.',
      eviter: 'Laisser refroidir sans toucher.', geste: 8, figure: { svg: 'brasure', etat: 'seche' },
      narration: 'Quatrième piège : bouger l’assemblage trop tôt. L’étain qui fige se fissure, et le joint fuit.' },
    { titre: 'L’étain-plomb sur l’eau potable', voit: 'Rien : le plomb se dissout dans l’eau.', cause: 'Mauvais fil d’étain.',
      eviter: 'Étain-cuivre ou étain-argent sur l’eau potable.', geste: null, figure: { img: 'images/3-1-tendre.webp', alt: 'Le fil d’étain' },
      narration: 'Dernier piège : l’étain-plomb sur un réseau d’eau potable. C’est interdit : le plomb passerait dans l’eau qu’on boit.' }
  ],
  controles: [
    { question: 'L’anneau d’étain fait-il tout le tour ?', comment: 'Tournez la pièce et regardez tout le joint.', siNon: 'Rechauffez et complétez, sans surchauffer.', geste: 7,
      figure: { svg: 'brasure', etat: 'reussie' }, narration: 'Premier contrôle : l’anneau est complet.' },
    { question: 'Le cuivre est-il resté propre, pas noirci ?', comment: 'Regardez de part et d’autre du joint.', siNon: 'Chauffe trop forte : réduisez la flamme.', geste: 5,
      figure: { svg: 'brasure', etat: 'surchauffe' }, narration: 'Deuxième contrôle : le cuivre n’est pas noirci.' },
    { question: 'Le décapant est-il essuyé ?', comment: 'Plus aucune trace de pâte autour du joint.', siNon: 'Essuyez, lavez si le décapant est halogéné.', geste: 8,
      figure: { svg: 'brasure', etat: 'reussie' }, narration: 'Troisième contrôle : le décapant est retiré.' },
    { question: 'Pas de goutte ni de bille sur le joint ?', comment: 'Un anneau lisse, pas de goutte posée.', siNon: 'L’étain a fondu dans la flamme : chauffez le tube, pas l’étain.', geste: 6,
      figure: { svg: 'brasure', etat: 'seche' }, narration: 'Dernier contrôle : pas de goutte posée sur le joint.' }
  ],
  prof: {
    verifie: ['Le chalumeau propane, allumé et réglé devant lui', 'Les emboîtures, avant de braser', 'Le joint : anneau complet, cuivre propre', 'Le décapant essuyé', 'Plus tard : l’étanchéité, à la solution moussante'],
    narration: 'Le professeur regarde vos emboîtures avant la brasure, puis le joint fini. L’étanchéité se vérifiera ensuite, sous pression, à la solution moussante. La station suivante passe à la brasure forte, celle des circuits frigorifiques.'
  }
});

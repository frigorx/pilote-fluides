/* Station 1-5 — Cintrer à la cintreuse (repères L, R et 0). Source : sources-metier/1-4-1-5-cintrage.md (partie 2)
   Repères portés par le bras tournant. L = cote prise depuis l'extrémité GAUCHE (écrit dans les fiches) ;
   R = cote prise depuis l'extrémité DROITE (lu sur un dessin, jamais écrit) ; 0 = lecture de l'angle
   sur la forme graduée (0 en face de 90 = coude à 90°). Ordre « 0 R L » : trois sources sur quatre.
   Pièce de référence : pièce 1 du niveau 3 de tp-cintrage (1/4″, coupe 144, cote 80 sur L). */
CUIVREZO.stations.push({
  id: '1-5', ligne: 1, titre: 'Cintrer à la cintreuse (L, R, 0)', duree: '30 min', vignette: 'images/1-5-cintreuse.webp',
  sources: ['sources-metier/1-4-1-5-cintrage.md', 'C:/git/tp-cintrage/niveau-3-data.js'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un coude à 90°, à la cote, du premier coup',
    texte: 'Pièce 1 : un tube 1/4″ coupé à 144 mm, un coude à 90°, des branches de 80 et 70 mm jusqu’à l’axe, à ± 1 mm.',
    criteres: ['Branches de 80 et 70 mm à l’axe, à ± 1 mm', 'Angle de 90°', 'Tube ni écrasé ni fortement marqué', 'Pièce plane, sens de cintrage respecté'],
    figure: { img: 'images/reprises/piece-1-coude-1-4.svg', alt: 'Plan de la pièce 1 : coude à 90° en cuivre 1/4 pouce', legende: 'Plan de la pièce 1 (TP cintrage, niveau 3).' },
    narration: 'La cintreuse à levier est plus précise que la cintrette : un millimètre de tolérance au lieu de trois. Sa précision vient de trois repères gravés sur son bras : L, R et zéro. L et R disent où poser le trait selon le bout depuis lequel vous avez mesuré. Le zéro dit quand s’arrêter. Si vous comprenez ces trois lettres, vous faites un coude juste du premier coup.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { svg: 'cintreuse', etat: 'reperes', aValider: 'Position et ordre des repères 0, R, L à vérifier sur la cintreuse de l’atelier' },
    items: [
      { nom: 'La cintreuse du bon diamètre', detail: 'son marquage (1/4″, 3/8″) est celui du tube' },
      { nom: 'Le tube 1/4″ coupé à 144 mm', detail: 'coupé d’équerre et ébavuré : stations 1.2 et 1.3' },
      { nom: 'Feutre fin, mètre ou réglet', detail: 'pour tracer la cote' },
      { nom: 'L’équerre', detail: 'pour contrôler l’angle' }
    ],
    narration: 'Regardez l’outil. Une forme ronde, graduée : zéro, quarante-cinq, quatre-vingt-dix, cent quatre-vingts. Un crochet qui serre le tube contre la forme. Un bras fixe, et un bras tournant qui porte trois repères : zéro, R et L. Chaque cintreuse ne fait qu’un diamètre : son marquage, un quart ou trois huitièmes, doit être celui du tube. Son rayon lui est propre.'
  },
  gestes: [
    { titre: 'Prendre la bonne cintreuse', texte: 'Le marquage de la cintreuse doit être celui du tube : 1/4″ avec 1/4″.',
      pointCle: 'Une cintreuse, un diamètre.',
      pourquoi: 'La gorge et le rayon sont faits pour un seul tube. Un autre diamètre s’écrase ou glisse, et les cotes du plan ne tombent plus.',
      figure: { img: 'images/1-5-cintreuse.webp', alt: 'La cintreuse à levier et son tube cintré à 90°' }, clip: 'clips/1-5/01-choisir.mp4',
      narration: 'Premier réflexe : la cintreuse du bon diamètre. Sa gorge est taillée pour un seul tube, et son rayon aussi. Un tube trop petit y glisse, un tube trop gros s’y écrase. Et le plan a été calculé pour le rayon de cet outil-là : avec une autre cintreuse, les cotes ne tomberaient plus.' },
    { titre: 'Choisir le repère : L ou R', texte: 'La cote part de l’extrémité gauche du tube ? Ce sera L. De l’extrémité droite ? Ce sera R.',
      pointCle: 'L comme Left, gauche. R comme Right, droite.',
      pourquoi: 'Le coude s’enroule d’un côté du trait. Le repère compense ce décalage selon le côté d’où vient la cote.',
      aValider: 'La règle de R est lue sur un dessin (CINTRAGE 1, p. 8), elle n’est écrite dans aucune fiche',
      figure: { svg: 'cintreuse', etat: 'placer-L' }, clip: 'clips/1-5/02-choisir-repere.mp4',
      narration: 'Avant de tracer, on se demande de quel bout part la cote. Si elle part de l’extrémité gauche du tube, on posera le trait sur L, comme Left, gauche. Si elle part de l’extrémité droite, sur R, comme Right, droite. Pourquoi deux repères ? Parce que le coude s’enroule d’un côté du trait, et que ce décalage ne se compense pas de la même façon selon le côté d’où vient la cote.' },
    { titre: 'Tracer la cote finie', texte: 'Depuis le bout choisi, tracez la cote du plan : 80 mm pour la pièce 1.',
      pointCle: 'On trace la cote finie, telle qu’elle est sur le plan.',
      pourquoi: 'Avec la cintreuse, pas de soustraction : c’est le repère L ou R qui tient compte du rayon.',
      aValider: 'Aucune fiche ne dit pourquoi on ne retire pas le rayon avec L : hypothèse, le repère le compense (distance 0→L à mesurer)',
      figure: { svg: 'mesure', etat: 'butee' }, clip: 'clips/1-5/03-tracer.mp4',
      narration: 'On trace la cote telle qu’elle est sur le plan : quatre-vingts millimètres depuis l’extrémité gauche, pour la pièce une. Avec la cintrette, il fallait retirer le rayon. Ici, non : c’est le repère L, ou R, qui en tient compte à votre place. C’est tout l’intérêt de ces lettres.' },
    { titre: 'Ouvrir la cintreuse', texte: 'Dépliez le bras tournant vers l’avant, dans le prolongement de la butée.',
      pointCle: 'Le 0 du bras en face du 0 de la forme.',
      pourquoi: 'Le coude se mesure à partir de ce point de départ.',
      figure: { svg: 'cintreuse', etat: 'reperes' }, clip: 'clips/1-5/04-ouvrir.mp4',
      narration: 'On ouvre la cintreuse : le bras tournant se déplie vers l’avant, dans le prolongement de la butée. Le zéro du bras est alors en face du zéro de la forme. C’est le point de départ du coude.' },
    { titre: 'Poser le trait sur L', texte: 'Glissez le tube dans la gorge, trait exactement en face de L. Rabattez le crochet.',
      pointCle: 'Exactement sur le repère : un millimètre d’écart, un millimètre d’erreur.',
      pourquoi: 'Le crochet tient le tube pendant que le bras l’enroule : sans lui, le tube glisse.',
      figure: { svg: 'cintreuse', etat: 'placer-L' }, clip: 'clips/1-5/05-sur-L.mp4',
      narration: 'On glisse le tube dans la gorge et on le fait coulisser jusqu’à ce que le trait soit exactement en face du repère L. Puis on rabat le crochet, qui bloque le tube contre la forme. Vérifiez une dernière fois l’alignement : c’est ici que se joue la précision de la pièce.' },
    { titre: 'Ou sur R, si la cote part de la droite', texte: 'Même geste, mais le trait se pose en face de R.',
      pointCle: 'Le repère suit le bout d’où part la cote.',
      pourquoi: 'Sur une pièce à plusieurs coudes, on passe parfois d’un repère à l’autre selon le sens des cotes.',
      aValider: 'Règle de R lue sur un dessin, et ordre des repères 0 R L ou 0 L R à vérifier sur l’outil',
      figure: { svg: 'cintreuse', etat: 'placer-R' }, clip: 'clips/1-5/06-sur-R.mp4',
      narration: 'Si la cote du plan part de l’extrémité droite, le geste est le même, mais le trait se pose en face de R. Sur une pièce à plusieurs coudes, les cotes ne partent pas toujours du même côté : on choisit le repère à chaque coude, en regardant d’où part la cote.' },
    { titre: 'Ramener le bras', texte: 'Main gauche : poignée et tube. Main droite : ramenez le bras vers vous, d’un seul mouvement.',
      pointCle: 'Progressivement, sans à-coup.',
      pourquoi: 'Un mouvement haché ovalise ou plisse le tube.',
      figure: { svg: 'cintreuse', etat: 'cintrer' }, clip: 'clips/1-5/07-cintrer.mp4',
      narration: 'La main gauche tient la poignée fixe et le tube ; la main droite ramène le bras tournant vers vous. D’un seul mouvement, régulier. Regardez le tube s’enrouler autour de la forme : le bras le pousse dans la gorge, pendant que le crochet le retient.' },
    { titre: 'Arrêter quand le 0 est face au 90', texte: 'Le 0 du bras arrive en face du 90 de la forme : arrêtez. Tenez compte de la détente.',
      pointCle: '0 face à 90 : coude à 90°.',
      pourquoi: 'La forme est graduée en degrés, et le 0 du bras est l’aiguille qui les lit.',
      figure: { svg: 'cintreuse', etat: 'angle' }, clip: 'clips/1-5/08-angle.mp4',
      narration: 'Le zéro du bras sert maintenant d’aiguille. Il avance devant les graduations de la forme : quarante-cinq, puis quatre-vingt-dix. Quand il est en face de quatre-vingt-dix, le coude est à quatre-vingt-dix degrés : on s’arrête. Comme pour la cintrette, le cuivre se détend un peu quand on relâche : on vérifie à l’équerre.' },
    { titre: 'Dégager, puis enchaîner', texte: 'Redépliez le bras, ouvrez le crochet, sortez le tube. Coude suivant : mesurez depuis l’axe de la branche déjà cintrée.',
      pointCle: 'Toujours de gauche à droite, avec le même mouvement du bras.',
      pourquoi: 'Travailler toujours dans le même sens évite de se tromper de repère et de vriller la pièce.',
      figure: { img: 'images/1-5-cintreuse.webp', alt: 'Coude à 90° dans la cintreuse' }, clip: 'clips/1-5/09-enchainer.mp4',
      narration: 'On redéplie le bras, on ouvre le crochet, et le tube sort. Pour une pièce à plusieurs coudes, la cote suivante se mesure depuis l’axe de la branche qu’on vient de cintrer. Et on travaille toujours dans le même sens, de gauche à droite, comme on écrit : c’est ce qui évite de se tromper de repère.' }
  ],
  pieges: [
    { titre: 'La mauvaise cintreuse', voit: 'Un tube écrasé, ou des cotes fausses.', cause: 'Une cintreuse 1/4″ pour un tube 3/8″, ou l’inverse.',
      eviter: 'Vérifier le marquage avant de commencer.', geste: 0, figure: { svg: 'cintreuse', etat: 'reperes' },
      narration: 'Premier piège : la cintreuse d’un autre diamètre. Soit le tube s’écrase dans une gorge trop petite, soit il glisse dans une gorge trop grande. Et même s’il passe, le rayon n’est pas celui pour lequel le plan a été calculé.' },
    { titre: 'Le mauvais repère', voit: 'Une branche fausse de plusieurs millimètres.', cause: 'Trait posé sur L alors que la cote partait de la droite, ou l’inverse.',
      eviter: 'Se demander à chaque coude : d’où part la cote ?', geste: 1,
      aValider: 'L’erreur produite par un mauvais repère n’est chiffrée dans aucune fiche : à mesurer sur l’outil',
      figure: { svg: 'cintreuse', etat: 'placer-R' },
      narration: 'Deuxième piège : poser le trait sur le mauvais repère. La pièce est fausse de la distance qui sépare L de R. Un seul réflexe l’évite : avant chaque coude, se demander de quel bout part la cote.' },
    { titre: 'Le trait mal aligné', voit: 'Une branche un peu trop longue ou trop courte.', cause: 'Le trait n’était pas pile sur le repère.',
      eviter: 'Aligner exactement, puis rabattre le crochet.', geste: 4, figure: { svg: 'cintreuse', etat: 'placer-L' },
      narration: 'Troisième piège : le bon repère, mais un alignement approximatif. Avec un millimètre de tolérance, il n’y a pas de place pour l’à-peu-près.' },
    { titre: 'Le tube plissé ou écrasé', voit: 'Des plis dans le coude, ou un tube aplati.', cause: 'Mouvement haché, crochet mal serré.',
      eviter: 'Un seul mouvement continu.', geste: 6, figure: { svg: 'coude', etat: 'pli' },
      narration: 'Quatrième piège : le coude plissé ou aplati. Le mouvement a été haché, ou le crochet n’a pas tenu le tube. Un seul mouvement, régulier.' },
    { titre: 'La pièce vrillée', voit: 'La pièce ne tient pas à plat sur l’établi.', cause: 'Le sens de cintrage a changé, ou le tube a tourné entre deux coudes.',
      eviter: 'Toujours de gauche à droite, même mouvement du bras.', geste: 8, figure: { svg: 'coude', etat: 'vrille' },
      narration: 'Dernier piège, sur les pièces à plusieurs coudes : la pièce vrillée, qui ne tient pas à plat. Le sens de travail a changé en cours de route. De gauche à droite, toujours.' }
  ],
  controles: [
    { question: 'Les branches mesurent-elles 80 et 70 mm à l’axe (± 1) ?', comment: 'Mesurez chaque branche jusqu’à l’axe de l’autre.', siNon: 'Vérifiez le repère utilisé et l’alignement du trait.', geste: 1,
      aValider: 'Méthode de mesure à l’axe non écrite pour la cintreuse',
      figure: { img: 'images/reprises/piece-1-coude-1-4.svg', alt: 'Plan de la pièce 1' }, narration: 'Premier contrôle : les deux branches, à l’axe, au millimètre.' },
    { question: 'Le coude est-il à 90° ?', comment: 'Posez l’équerre contre les deux branches.', siNon: 'Reprenez un tout petit peu à la cintreuse.', geste: 7,
      figure: { svg: 'coude', etat: 'equerre' }, narration: 'Deuxième contrôle : l’angle, à l’équerre.' },
    { question: 'Le tube est-il ni écrasé ni fortement marqué ?', comment: 'Regardez le coude de près.', siNon: 'Pièce à refaire : bon diamètre de cintreuse, mouvement continu.', geste: 6,
      figure: { svg: 'coude', etat: 'ovale' }, narration: 'Troisième contrôle : le coude est rond et propre.' },
    { question: 'La pièce est-elle plane ?', comment: 'Posez-la à plat : elle touche l’établi partout.', siNon: 'Le tube a tourné : gardez le même sens de travail.', geste: 8,
      figure: { svg: 'coude', etat: 'vrille' }, narration: 'Dernier contrôle : la pièce est plane.' }
  ],
  suite: {
    titre: 'La série du TP cintrage (niveau 3), à enchaîner après la pièce 1',
    pieces: [
      { titre: 'Pièce 2 : un U en 1/4″ (coupe 208 mm, branches 80, entraxe 60)', img: 'images/reprises/piece-2-u-1-4.svg' },
      { titre: 'Pièce 3 : trois coudes en 1/4″ (coupe 232 mm)', img: 'images/reprises/piece-3-marche-1-4.svg' },
      { titre: 'Pièce 4 : un U en 3/8″ (coupe 250 mm, rayon 23,8 mm)', img: 'images/reprises/piece-4-u-3-8.svg' },
      { titre: 'Pièce 5 : deux coudes dans deux plans, 3/8″ (coupe 220 mm)', img: 'images/reprises/piece-5-3d-3-8.svg' }
    ]
  },
  prof: {
    verifie: ['Le repère choisi (L ou R) et pourquoi', 'L’angle lu au 0 du bras, puis à l’équerre', 'Les cotes à l’axe, au millimètre', 'L’aspect du coude'],
    narration: 'Le professeur vous demande quel repère vous avez utilisé, et pourquoi. C’est la vraie preuve : savoir expliquer le choix entre L et R. Puis il mesure la pièce. Les pièces suivantes du TP, un U, trois coudes, deux plans, se font avec exactement la même méthode.'
  }
});

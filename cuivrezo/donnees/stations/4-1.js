/* Station 4-1 — Le chapeau de gendarme. Source : sources-metier/4-pieces-complexes.md (partie 1)
   Méthode retenue : « METHODE CHAPEAU DE GENDARME CUIVRE » du dossier CAP IFCA (C3-Réaliser) et fiches
   voisines : coude central d'abord (60 à 90°), puis deux coudes de moitié, A et B à égale distance de l'axe.
   Les fiches divergent fortement (définition de l'axe, espacement des coudes, angles, outil) : aucune
   n'emploie les repères L et R ; chaque choix est marqué aValider. Tolérance des fiches : ± 2 mm. */
CUIVREZO.stations.push({
  id: '4-1', ligne: 4, titre: 'Le chapeau de gendarme', duree: '45 min', vignette: 'images/4-1-chapeau.webp',
  sources: ['sources-metier/4-pieces-complexes.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un contournement symétrique, branches alignées',
    texte: 'Le tube passe par-dessus l’obstacle avec un coude central et deux coudes de moitié. Les deux côtés sont égaux, les deux branches restent sur la même ligne.',
    criteres: ['Hauteur H conforme au plan', 'Les deux côtés du chapeau égaux', 'Les deux branches alignées sur une même droite', 'Pièce plane, tube ni écrasé ni marqué (cotes à ± 2 mm)'],
    aValider: 'Méthode retenue parmi cinq (définition de l’axe, espacement des coudes, angles, outil) : à confirmer',
    figure: { svg: 'chapeau', etat: 'plan', legende: 'Le chapeau passe au-dessus de l’obstacle ; H se mesure d’axe à axe.' },
    narration: 'Sur un chantier, un tube rencontre souvent un autre tube, une gaine, un support. Plutôt que de couper et d’ajouter des raccords, on le fait passer par-dessus d’un seul morceau : c’est le chapeau de gendarme. Un coude au sommet, deux coudes plus doux de chaque côté. Sa difficulté n’est pas dans chaque coude, que vous savez faire : elle est dans la symétrie. Les deux branches doivent repartir exactement sur la même ligne.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/4-1-chapeau.webp', alt: 'Un chapeau de gendarme en cuivre au-dessus d’un tuyau' },
    items: [
      { nom: 'Le plan de la pièce', detail: 'la hauteur H, la position de l’obstacle' },
      { nom: 'La cintrette ou la cintreuse du tube', detail: 'stations 1.4 et 1.5' },
      { nom: 'Un tube recuit, coupé et ébavuré', detail: 'avec de la longueur en plus pour les coudes' },
      { nom: 'La règle, l’équerre, la fausse équerre', detail: 'pour contrôler l’alignement, la hauteur et les angles' },
      { nom: 'Le feutre fin et le mètre', detail: 'pour tracer l’axe, A et B' }
    ],
    narration: 'Le chapeau se fait avec les outils que vous connaissez : la cintrette ou la cintreuse, le mètre, le feutre. Il s’y ajoute la règle, qui dira si les deux branches sont alignées, et la fausse équerre, qui compare les angles. Le plan donne la hauteur H du chapeau, d’axe à axe, et l’emplacement de l’obstacle.'
  },
  gestes: [
    { titre: 'Repérer l’axe du chapeau', texte: 'Sur le plan, repérez où passe le milieu de l’obstacle. Reportez-le sur le tube : c’est l’axe du chapeau.',
      pointCle: 'L’axe au-dessus du centre de l’obstacle.',
      pourquoi: 'Tout le chapeau se construit symétriquement autour de cet axe : s’il est décalé, le chapeau l’est aussi.',
      aValider: 'Position de l’axe : cote + 20 mm, cote − B (tableau), cote − R + 2 cm, M + 2 cm selon les fiches',
      figure: { svg: 'chapeau', etat: 'traits' }, clip: 'clips/4-1/01-axe.mp4',
      narration: 'Tout part de l’axe du chapeau : l’endroit du tube qui passera exactement au-dessus du milieu de l’obstacle. On le repère sur le plan, on le reporte sur le tube, en mesurant contre une butée comme toujours. Le chapeau entier va se construire symétriquement autour de ce trait.' },
    { titre: 'Tracer A et B, à égale distance', texte: 'De part et d’autre de l’axe, tracez A et B à la même distance, sur tout le tour du tube.',
      pointCle: 'Même distance des deux côtés.',
      pourquoi: 'A et B sont les deux coudes de moitié. S’ils ne sont pas à égale distance, le chapeau penche.',
      aValider: 'Distance axe–A : « X = ½ Ø tube + ½ Ø obstacle + 10 mm » (fiche 08), « 2 × H » (recueil de façonnage), tableau par diamètre d’obstacle (fiche 10)',
      figure: { svg: 'chapeau', etat: 'traits' }, clip: 'clips/4-1/02-a-b.mp4',
      narration: 'De chaque côté de l’axe, on trace deux repères, A et B, à exactement la même distance, et sur tout le tour du tube. Ce seront les deux coudes de moitié. La distance dépend de la hauteur du chapeau et de la taille de l’obstacle : c’est le plan, ou le professeur, qui la donne.' },
    { titre: 'Choisir l’angle central', texte: 'L’angle du coude central dépend de la hauteur : entre 60 et 90°.',
      pointCle: 'Plus le chapeau est haut, plus le coude central est fermé.',
      pourquoi: 'Les deux coudes de côté font chacun la moitié de cet angle : c’est ce qui ramène les branches sur la même ligne.',
      aValider: 'Angle central : 60 à 90° (méthode CAP), 30 à 120° (autre méthode), 90° puis deux 45° (recueil)',
      figure: { svg: 'chapeau', etat: 'central' }, clip: 'clips/4-1/03-angle.mp4',
      narration: 'On choisit l’angle du coude central, entre soixante et quatre-vingt-dix degrés, selon la hauteur à franchir. Le principe à comprendre est simple : chaque coude de côté fera exactement la moitié de cet angle. Soixante au centre, trente de chaque côté. Quatre-vingt-dix au centre, quarante-cinq de chaque côté. C’est cette moitié qui ramène les deux branches sur la même ligne.' },
    { titre: 'Cintrer le coude central', texte: 'Placez l’axe sur l’outil, au milieu du coude, et cintrez à l’angle choisi.',
      pointCle: 'L’axe au milieu du coude, pas au début.',
      pourquoi: 'Le coude central doit être partagé en deux par l’axe, pour que les deux côtés soient égaux.',
      aValider: 'Position de l’axe sur l’outil : « à la moitié de l’angle » (60° → repère 30°) dans la méthode CAP',
      figure: { svg: 'chapeau', etat: 'central' }, clip: 'clips/4-1/04-central.mp4',
      narration: 'On commence par le coude du sommet. L’axe tracé sur le tube doit tomber au milieu du coude, pas à son début : on le place donc sur l’outil à la moitié de l’angle, par exemple sur le repère trente pour un coude de soixante. Puis on cintre jusqu’à l’angle choisi.' },
    { titre: 'Cintrer le coude A, à la moitié', texte: 'Placez le repère A sur l’outil et cintrez à la moitié de l’angle central, dans l’autre sens.',
      pointCle: 'Le coude de côté tourne en sens inverse du coude central.',
      pourquoi: 'Il ramène la branche à l’horizontale : moitié d’angle, sens contraire.',
      figure: { svg: 'chapeau', etat: 'plan' }, clip: 'clips/4-1/05-coude-a.mp4',
      narration: 'Premier coude de côté, sur le repère A. Il fait la moitié de l’angle central, et il tourne dans l’autre sens : il ramène la branche à l’horizontale. On contrôle à la fausse équerre avant de passer à l’autre côté.' },
    { titre: 'Cintrer le coude B, pareil', texte: 'Même geste sur le repère B : même angle, même sens que A.',
      pointCle: 'B est le jumeau de A.',
      pourquoi: 'Deux coudes identiques de part et d’autre : c’est la symétrie du chapeau.',
      figure: { svg: 'chapeau', etat: 'plan' }, clip: 'clips/4-1/06-coude-b.mp4',
      narration: 'Même geste de l’autre côté, sur le repère B, avec exactement le même angle. Si A et B sont identiques et à égale distance de l’axe, les deux branches se retrouvent sur la même ligne.' },
    { titre: 'Contrôler l’alignement à la règle', texte: 'Posez la règle sous les deux branches : elle doit les toucher toutes les deux.',
      pointCle: 'Les deux branches sur une même droite, la pièce à plat.',
      pourquoi: 'Un chapeau désaxé ne se raccorde plus : le tube suivant arrive de travers.',
      figure: { svg: 'chapeau', etat: 'controle' }, clip: 'clips/4-1/07-regle.mp4',
      narration: 'Le contrôle décisif se fait à la règle. On la pose sous les deux branches : elle doit les toucher toutes les deux, sur toute leur longueur. On mesure aussi la hauteur H à l’équerre, et on pose la pièce à plat sur l’établi : elle doit y reposer partout. Un petit écart se reprend en finissant le dernier coude ; un gros écart, non.' }
  ],
  pieges: [
    { titre: 'Les branches désaxées', voit: 'La règle ne touche qu’une branche.', cause: 'Coudes A et B différents, ou pas à égale distance de l’axe.',
      eviter: 'A et B tracés à égale distance, cintrés au même angle.', geste: 1, figure: { svg: 'chapeau', etat: 'desaxe' },
      narration: 'Premier piège : les branches qui ne sont plus alignées. Presque toujours, A et B n’étaient pas à la même distance de l’axe, ou pas cintrés au même angle.' },
    { titre: 'La hauteur fausse', voit: 'Le chapeau touche l’obstacle, ou passe trop haut.', cause: 'Angle central mal choisi, ou repères A et B mal placés.',
      eviter: 'Mesurer H à l’équerre pendant le travail.', geste: 2, figure: { svg: 'chapeau', etat: 'plan' },
      narration: 'Deuxième piège : la hauteur. Trop bas, le tube touche l’obstacle ; trop haut, il gêne. On mesure H à l’équerre avant de finir.' },
    { titre: 'La pièce gauchie', voit: 'Posée à plat, la pièce bascule.', cause: 'Le tube a tourné entre deux coudes.',
      eviter: 'Vérifier la planéité avant chaque coude.', geste: 6, figure: { svg: 'coude', etat: 'vrille' },
      narration: 'Troisième piège : la pièce gauchie, qui ne tient pas à plat. Le tube a tourné entre deux coudes. On vérifie la planéité avant chaque nouveau coude.' },
    { titre: 'Le tube écrasé', voit: 'Un coude aplati ou pincé.', cause: 'Tube écroui non recuit, ou cintrage forcé.',
      eviter: 'Tube recuit, mouvement lent et continu.', geste: 3, figure: { svg: 'coude', etat: 'ovale' },
      narration: 'Dernier piège, commun à tous les coudes : l’écrasement. Sur une pièce à trois coudes, un seul coude écrasé suffit à la rendre inutilisable.' }
  ],
  controles: [
    { question: 'La règle touche-t-elle les deux branches ?', comment: 'Posez-la sous les deux branches.', siNon: 'Reprenez le dernier coude, ou refaites la pièce si l’écart est grand.', geste: 6,
      figure: { svg: 'chapeau', etat: 'controle' }, narration: 'Premier contrôle : les deux branches alignées.' },
    { question: 'La hauteur H est-elle celle du plan ?', comment: 'Équerre posée sur la branche, mesurez jusqu’à l’axe du sommet.', siNon: 'Revoyez l’angle central et la place de A et B.', geste: 2,
      figure: { svg: 'chapeau', etat: 'plan' }, narration: 'Deuxième contrôle : la hauteur, d’axe à axe.' },
    { question: 'Les deux côtés sont-ils égaux ?', comment: 'Comparez les deux angles à la fausse équerre.', siNon: 'Les coudes A et B n’ont pas le même angle.', geste: 5,
      figure: { svg: 'chapeau', etat: 'central' }, narration: 'Troisième contrôle : la symétrie.' },
    { question: 'La pièce est-elle plane et sans écrasement ?', comment: 'Posez-la à plat ; regardez chaque coude.', siNon: 'Pièce à refaire : planéité avant chaque coude, tube recuit.', geste: 6,
      figure: { svg: 'chapeau', etat: 'controle' }, narration: 'Dernier contrôle : la pièce plane, les coudes ronds.' }
  ],
  prof: {
    verifie: ['Le positionnement dans l’outil, avant le premier coude', 'La hauteur H et l’alignement des branches', 'La symétrie et la planéité', 'L’aspect des trois coudes'],
    narration: 'Les fiches de l’atelier demandent d’appeler le professeur une fois le tube positionné dans l’outil, avant de cintrer : c’est le moment où une erreur se corrige encore. Puis il contrôle la pièce finie : hauteur, alignement, symétrie, planéité.'
  }
});

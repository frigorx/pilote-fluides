/* Station 4-1 — Le chapeau de gendarme. Source : sources-metier/4-pieces-complexes.md (partie 1).
   Refonte du 11/10/2026 (F. Henninot : « il faut trouver un juste équilibre entre la formule, le tracé et
   l'exécution ; la station s'appuie sur l'exemple dont on a besoin » ; puis : « la station explique mot pour mot
   toute la gestuelle et le tracé : apprendre à tracer sur le tube et à centrer comme prévu ») :
   · plus de formule pour l'élève : il MESURE le dépassement d et LIT une ligne de tableau (H, X → M, MA) ;
   · le tableau vaut pour le tube 1/4″ et la cintreuse 1/4″ de rayon 9/16″ = 14,3 mm (donnée de F. Henninot),
     chapeau 45°-90°-45°, jeu 10 mm ; il est CALCULÉ par la figure (fibre neutre), les mêmes nombres que le
     tableur de l'atelier [TAB] ;
   · l'exemple suivi d'un bout à l'autre est la planche du TP « franchir un multicouche » (CAP IFCA) : tube 1/4″
     posé à 23 mm (dessus), multicouche Ø 16 dessus à 30 mm → d = 7 → H 25, X → M 9, MA 40 ;
   · le trait M se décale de X (le chapeau consomme du tube) : plus de mesure à travers un coude ;
   · dix gestes, chacun un seul mouvement, dans les mots de la station 1.5 (forme graduée, 0 du bras, crochet).
   SOIR DU 11/10 (F. Henninot : « le trait à 45, c'est pifométrique ; un millimètre c'est vite une grosse erreur ;
   y a pas un moyen pour que le trait soit mis au 0 ? » et « poser le tube et viser, pas pratique : plus de mesures ») :
   · X se MESURE : du bout du cône du raccord à l'axe de l'obstacle, reporté sur le tube depuis le bout évasé ;
   · on trace le DÉBUT de chaque coude (S sommet, A et B côtés), côté collet, depuis X (un seul zéro) ; chaque trait
     se pose PILE sur le 0 du guide, trait contre trait ; le tableau donne H et les trois traits par côté.
   Ancienne méthode (avant le soir du 11/10) : coude central d'abord, M au milieu (repère à la moitié de l'angle), puis deux coudes de
   moitié en sens inverse. Remplace la décision du 30/09 « distance axe–A donnée par le plan, pas de formule »
   pour CE tube et CET outil seulement (DECISIONS-2026-09-30.md, ajout du 11/10). Tolérance des fiches : ± 2 mm. */
CUIVREZO.stations.push({
  id: '4-1', ligne: 4, titre: 'Le chapeau de gendarme', duree: '45 min', vignette: 'images/4-1-chapeau.webp',
  sources: ['sources-metier/4-pieces-complexes.md'],
  film: { src: 'clips/4-1/film-chapeau-de-gendarme.mp4', titre: 'Le film, de A à Z (6 min)' },
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Passer par-dessus un tube, d’un seul morceau',
    texte: 'Le tube 1/4″ monte, passe au-dessus de l’obstacle et redescend sur sa ligne : trois coudes, aucun raccord. Une soustraction pour trouver d, puis les longueurs se lisent dans un tableau.',
    criteres: ['La hauteur H du tableau, d’axe à axe (± 2 mm)', 'Le sommet centré au-dessus de l’obstacle (± 2 mm), 10 mm de jeu au moins', 'Les deux branches alignées sur une même droite', 'Pièce plane, aucun coude écrasé'],
    figure: { composant: 'cuivre-3d', attributs: { piece: 'chapeau', hauteur: '25', obstacle: '16', diametre: '6.35', rc: '14.3', angle: '90' }, legende: 'Le chapeau passe au-dessus de l’obstacle ; H se mesure d’axe à axe.' },
    narration: 'Sur un chantier, un tube rencontre souvent un autre tube. Plutôt que de couper et d’ajouter des raccords, on le fait passer par-dessus, d’un seul morceau : c’est le chapeau de gendarme, qui doit son nom au bicorne des gendarmes d’autrefois : vu de face, il monte au milieu et retombe de chaque côté. Trois coudes : un au sommet, deux plus doux de chaque côté. Une seule soustraction : vous mesurez de combien l’obstacle dépasse votre tube, et un tableau vous donne les longueurs à tracer. L’exemple suivi dans toute la station est celui de la planche de l’atelier : un tube un quart de pouce qui passe au-dessus d’un multicouche de seize.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/4-1-chapeau.webp', alt: 'Un chapeau de gendarme en cuivre au-dessus d’un tuyau' },
    items: [
      { nom: 'Le tableau du chapeau', detail: 'geste 2 ; il vaut pour le tube 1/4″ et la cintreuse 1/4″' },
      { nom: 'La cintreuse 1/4″', detail: 'rayon de cintrage 9/16″, soit 14,3 mm (station 1.5)' },
      { nom: 'Un tube 1/4″ recuit, coupé et ébavuré', detail: 'avec de la longueur en plus : le chapeau consomme du tube' },
      { nom: 'Le réglet ou le mètre, le feutre fin', detail: 'pour mesurer d et X, et tracer A, S et B' },
      { nom: 'La règle', detail: 'pour contrôler l’alignement ; avec le réglet, la hauteur' },
      { nom: 'Le gabarit à l’échelle 1, s’il est fourni', detail: 'le chapeau couché dessus doit le recouvrir' }
    ],
    narration: 'Sortez le tableau du chapeau : il est au geste deux, et il ne vaut que pour le tube un quart de pouce et sa cintreuse, dont le rayon de cintrage est de neuf seizièmes de pouce, environ quatorze millimètres. Il vous faut aussi un tube recuit avec de la longueur en plus, car le chapeau consomme du tube ; le réglet et le feutre fin pour mesurer et tracer ; la règle pour contrôler. Si le professeur a imprimé un gabarit, gardez-le à portée de main.'
  },
  gestes: [
    { titre: 'Mesurer le dépassement d', texte: 'Depuis la planche, mesurez le dessus de l’obstacle, puis le dessus de votre tube posé dans son collier. La différence, c’est d. Sur la planche de l’atelier : 30 − 23 = 7 mm.',
      pointCle: 'd : de combien l’obstacle dépasse le dessus de votre tube.',
      pourquoi: 'Le dessous du tube doit passer 10 mm au-dessus de l’obstacle : le chapeau monte donc de d, plus 10 mm de jeu, plus le diamètre du tube (6 mm). Le tableau a déjà fait ce calcul.',
      figure: { svg: 'chapeau', etat: 'mesure' }, clip: 'clips/4-1/01-mesurer.mp4',
      narration: 'Tout commence par une mesure. Posez votre tube dans son collier, à côté de l’obstacle. Avec le réglet, mesurez depuis la planche jusqu’au dessus de l’obstacle, puis jusqu’au dessus de votre tube. Faites la différence : c’est le dépassement, que l’on appelle d. Sur la planche de l’atelier, le multicouche monte à trente millimètres, le tube à vingt-trois : d vaut sept millimètres.' },
    { titre: 'Lire la ligne du tableau', texte: 'Cherchez la ligne où tombe d. Elle donne H, la hauteur du chapeau, puis la place de trois traits mesurés depuis X. Pour d = 7, ligne « 4 à 8 » : H = 25 ; côté collet, A à 37 et S à 2 ; de l’autre côté, B à 44.',
      pointCle: 'Une ligne : la hauteur H, puis trois traits depuis X.',
      pourquoi: 'Le tableau vaut pour le tube 1/4″ et sa cintreuse (rayon 9/16″). Avec un autre tube ou un autre outil, les nombres changent : demandez le tableau qui va avec.',
      figure: { svg: 'chapeau', etat: 'tableau' }, clip: 'clips/4-1/02-tableau.mp4',
      narration: 'Le tableau fait le calcul à votre place. Cherchez la ligne où tombe votre dépassement : pour sept millimètres, c’est la ligne quatre à huit. Elle donne d’abord la hauteur du chapeau, H : vingt-cinq. Puis la place de trois traits, mesurés depuis X. Du côté du collet : A à trente-sept millimètres, et S à deux millimètres. De l’autre côté : B à quarante-quatre millimètres. Attention : ce tableau ne vaut que pour le tube un quart de pouce et sa cintreuse.' },
    { titre: 'Mesurer et tracer X', texte: 'Premier collet fait. Sur la planche, mesurez du bout du cône du raccord, là où le collet se visse, jusqu’à l’axe de l’obstacle. Reportez cette cote sur le tube, depuis son bout évasé : trait X, fin, tout le tour (station 1.2).',
      pointCle: 'X : l’axe de l’obstacle, reporté depuis le collet.',
      pourquoi: 'Une cote se reporte au millimètre. Un tube posé sur l’obstacle et visé à l’œil peut décaler X de plusieurs millimètres.',
      figure: { svg: 'chapeau', etat: 'repere-x' }, clip: 'clips/4-1/03-x.mp4',
      narration: 'Votre premier collet est fait. Sur la planche, mesurez depuis le bout du cône du raccord, là où le collet viendra se visser, jusqu’à l’axe de l’obstacle. Reportez cette cote sur le tube, depuis son bout évasé : c’est le trait X. Un trait fin au feutre, qui fait tout le tour du tube, comme à la station un point deux.' },
    { titre: 'Tracer A, S et B depuis X', texte: 'Tube à plat, zéro du mètre sur X. Du côté du collet : A à 37, puis S à 2. De l’autre côté : B à 44. Chaque trait fait le tour du tube.',
      pointCle: 'Un seul zéro, sur X ; chaque trait marque le début d’un coude.',
      pourquoi: 'Chaque trait se posera sur le 0 de la cintreuse : le coude part de là. Tout mesurer depuis X évite d’ajouter les erreurs d’un trait à l’autre.',
      figure: { svg: 'chapeau', etat: 'traits' }, clip: 'clips/4-1/04-m-a-b.mp4',
      narration: 'Posez le tube à plat et mettez le zéro du mètre sur X. Du côté du collet, tracez A à trente-sept millimètres, puis S à deux millimètres. De l’autre côté, tracez B à quarante-quatre millimètres. Chaque trait marque le début d’un coude : c’est lui qui se posera sur le zéro de la cintreuse. Tout se mesure depuis X, pour ne pas ajouter les erreurs d’un trait à l’autre.' },
    { titre: 'Placer S sur le 0', texte: 'Bras levé, engagez le tube sous le crochet, le côté collet au crochet. Rabattez le bras. Faites glisser le tube jusqu’à ce que S soit pile en face du 0 du guide.',
      pointCle: 'S pile en face du 0 : le coude part de S.',
      pourquoi: 'Le 0 du guide marque le point où le coude commence. Trait contre trait, il n’y a rien à estimer.',
      figure: { svg: 'cintreuse', etat: 'placer-0-s' }, clip: 'clips/4-1/05-placer.mp4',
      narration: 'Levez le bras de la cintreuse et engagez le tube sous le crochet, le côté du collet au crochet. Rabattez le bras. Faites glisser le tube jusqu’à ce que le trait S soit pile en face du zéro du guide. Le zéro marque le point où le coude commence : trait contre trait, il n’y a rien à estimer.' },
    { titre: 'Cintrer le sommet à 90°', texte: 'Tirez le bras lentement, d’un seul mouvement. Quand le 0 du bras arrive en face de 90, arrêtez.',
      pointCle: 'Le 0 du bras lit l’angle : à 90, on s’arrête.',
      pourquoi: 'Le coude part de S : son milieu tombe au-dessus de l’axe de l’obstacle, là où le tableau l’a placé.',
      figure: { composant: 'cuivre-3d', attributs: { piece: 'chapeau', hauteur: '25', obstacle: '16', diametre: '6.35', rc: '14.3', angle: '54' } }, clip: 'clips/4-1/06-sommet.mp4',
      narration: 'Tirez le bras lentement, d’un mouvement continu, sans à-coup. Le zéro du bras lit les degrés sur la forme : quand il arrive en face de quatre-vingt-dix, arrêtez. Le coude du sommet est fait.' },
    { titre: 'Cintrer A à 45°, tube retourné', texte: 'Sortez le tube et retournez-le d’un demi-tour. Côté collet au crochet, A pile en face du 0 du guide. Cintrez : arrêt quand le 0 du bras arrive en face de 45. Posez la pièce à plat pour vérifier.',
      pointCle: 'Tube retourné, A sur le 0 : ce coude tourne dans l’autre sens.',
      pourquoi: 'Chaque coude de côté fait la moitié du sommet, en sens inverse : il ramène la branche à l’horizontale.',
      figure: { svg: 'cintreuse', etat: 'placer-0-a' }, clip: 'clips/4-1/07-coude-a.mp4',
      narration: 'Premier coude de côté. Sortez le tube et retournez-le d’un demi-tour sur lui-même : ce coude tourne dans l’autre sens que le sommet. Le côté du collet au crochet, placez le trait A pile en face du zéro du guide. Cintrez, et arrêtez quand le zéro du bras arrive en face de quarante-cinq. Posez la pièce à plat pour vérifier avant de continuer.' },
    { titre: 'Cintrer B pareil', texte: 'Même geste sur B : tube dans le même sens que pour A, B pile en face du 0, arrêt au 45.',
      pointCle: 'B est le jumeau de A.',
      pourquoi: 'Deux coudes identiques, partis chacun de leur trait : c’est ce qui remet les deux branches sur la même ligne.',
      figure: { svg: 'cintreuse', etat: 'placer-0-b' }, clip: 'clips/4-1/08-coude-b.mp4',
      narration: 'Même geste sur B : le tube dans le même sens que pour A, le trait B pile en face du zéro, arrêt au quarante-cinq. Si les deux coudes de côté sont identiques, les deux branches se retrouvent sur la même ligne.' },
    { titre: 'Présenter : le sommet centré', texte: 'Revissez le tube sur son collet, posé sur sa ligne. Regardez de face : le sommet tombe juste au-dessus du milieu de l’obstacle, à 2 mm près. Le réglet glissé sous le sommet : 10 mm au moins.',
      pointCle: 'Sommet au-dessus du milieu de l’obstacle : le chapeau est centré.',
      pourquoi: 'C’est la preuve que X était bien reporté et les traits au bon endroit.',
      figure: { svg: 'chapeau', etat: 'plan' }, clip: 'clips/4-1/09-centrer.mp4',
      narration: 'Revissez le tube sur son collet et posez-le sur sa ligne. Regardez de face : le sommet du chapeau doit tomber juste au-dessus du milieu de l’obstacle, à deux millimètres près. C’est la preuve que X et les traits étaient au bon endroit. Glissez ensuite le réglet sous le sommet : il doit rester au moins dix millimètres au-dessus de l’obstacle.' },
    { titre: 'Contrôler à la règle et au réglet', texte: 'La règle posée sous les deux branches les touche toutes les deux. Réglet debout sur la règle, jusqu’au dessous du sommet : c’est H, celle du tableau, à 2 mm près. Posée à plat, la pièce ne bascule pas. Gabarit fourni : couché dessus, le chapeau le recouvre.',
      pointCle: 'Branches alignées, bonne hauteur, pièce plane.',
      pourquoi: 'Un chapeau désaxé ne se raccorde plus ; une pièce gauche ne se fixe pas à plat.',
      figure: { svg: 'chapeau', etat: 'controle' }, clip: 'clips/4-1/10-controle.mp4',
      narration: 'Le contrôle décisif se fait à la règle : posée sous les deux branches, elle doit les toucher toutes les deux. Posez ensuite le réglet debout sur la règle, jusqu’au dessous du sommet : c’est la hauteur H du tableau, à deux millimètres près. Posez enfin la pièce à plat : elle ne doit pas basculer. Si le professeur a imprimé un gabarit, couchez le chapeau dessus : il doit le recouvrir.' }
  ],
  pieges: [
    { titre: 'Le chapeau décalé', voit: 'Le sommet n’est pas au-dessus de l’obstacle, le chapeau est décalé.', cause: 'X mal reporté, ou un trait mesuré depuis un autre trait que X, ou du mauvais côté.',
      eviter: 'X mesuré depuis le collet ; zéro du mètre sur X pour A, S et B ; le côté lu dans le tableau.', geste: 3, figure: { svg: 'chapeau', etat: 'decale' },
      narration: 'Premier piège : le chapeau décalé. X a été mal reporté, ou un trait a été mesuré depuis un autre trait que X, ou du mauvais côté. Gardez le zéro du mètre sur X, et lisez le côté dans le tableau.' },
    { titre: 'La mauvaise ligne', voit: 'Le chapeau touche l’obstacle, ou passe beaucoup trop haut.', cause: 'd mal mesuré, ou une autre ligne lue dans le tableau.',
      eviter: 'Mesurer les deux hauteurs depuis la planche, relire la ligne.', geste: 0, figure: { svg: 'chapeau', etat: 'mesure' },
      narration: 'Deuxième piège : la mauvaise hauteur. Le dépassement a été mal mesuré, ou une autre ligne a été lue. Mesurez les deux hauteurs depuis la planche et relisez la ligne avant de tracer.' },
    { titre: 'Les branches désaxées', voit: 'La règle ne touche qu’une branche.', cause: 'A ou B pas pile sur le 0 (ou posé sur L ou R), ou cintrés à des angles différents.',
      eviter: 'Trait contre trait sur le 0 ; A et B arrêtés au même repère.', geste: 6, figure: { svg: 'chapeau', etat: 'desaxe' },
      narration: 'Troisième piège : les branches qui ne sont plus alignées. A ou B n’était pas pile sur le zéro, ou posé sur L ou R, ou ils n’ont pas été cintrés au même angle.' },
    { titre: 'La pièce gauchie', voit: 'Posée à plat, la pièce bascule.', cause: 'Le tube a tourné entre deux coudes.',
      eviter: 'Vérifier à plat avant chaque coude.', geste: 6, figure: { svg: 'coude', etat: 'vrille' },
      narration: 'Quatrième piège : la pièce gauchie, qui ne tient pas à plat. Le tube a tourné entre deux coudes. Vérifiez la planéité avant chaque nouveau coude.' },
    { titre: 'Le tube écrasé', voit: 'Un coude aplati ou pincé.', cause: 'Tube écroui non recuit, ou cintrage forcé.',
      eviter: 'Tube recuit, mouvement lent et continu.', geste: 5, figure: { svg: 'coude', etat: 'ovale' },
      narration: 'Dernier piège : l’écrasement. Sur une pièce à trois coudes, un seul coude écrasé suffit à la rendre inutilisable.' }
  ],
  controles: [
    { question: 'La règle touche-t-elle les deux branches ?', comment: 'Posez-la sous les deux branches.', siNon: 'Reprenez le dernier coude, ou refaites la pièce si l’écart est grand.', geste: 9,
      figure: { svg: 'chapeau', etat: 'controle' }, narration: 'Premier contrôle : les deux branches alignées.' },
    { question: 'H est-elle celle du tableau ?', comment: 'Règle sous les deux branches, réglet debout jusqu’au dessous du sommet (25 sur la planche de l’atelier).', siNon: 'Relisez la ligne du tableau et vérifiez le tracé de M.', geste: 1,
      figure: { svg: 'chapeau', etat: 'plan' }, narration: 'Deuxième contrôle : la hauteur, d’axe à axe, celle du tableau.' },
    { question: 'Le sommet est-il centré, à 10 mm au moins de l’obstacle ?', comment: 'Tube monté : regardez de face, puis glissez le réglet sous le sommet.', siNon: 'X mal reporté, un trait du mauvais côté, ou d mal mesuré.', geste: 3,
      figure: { svg: 'chapeau', etat: 'plan' }, narration: 'Troisième contrôle : le sommet au-dessus du milieu de l’obstacle, avec au moins dix millimètres de jeu.' },
    { question: 'La pièce est-elle plane et sans écrasement ?', comment: 'Posez-la à plat ; regardez chaque coude.', siNon: 'Pièce à refaire : planéité avant chaque coude, tube recuit.', geste: 6,
      figure: { svg: 'chapeau', etat: 'controle' }, narration: 'Dernier contrôle : la pièce plane, les coudes ronds.' }
  ],
  prof: {
    verifie: ['La mesure d et la ligne lue dans le tableau', 'X mesuré depuis le collet, puis A, S et B depuis X, avant le premier coude', 'Le sommet centré, le jeu de 10 mm, la hauteur H', 'L’alignement, la symétrie et la planéité', 'L’aspect des trois coudes'],
    narration: 'Le professeur regarde le tracé avant le premier coude : c’est le moment où une erreur se corrige encore. Chaque trait marque le début d’un coude et se pose sur le zéro du guide. Le tableau vaut pour le tube un quart de pouce et la cintreuse de rayon neuf seizièmes de pouce, quatorze virgule trois millimètres. Ses nombres viennent de la fibre neutre du tube, les mêmes que le tableur de l’atelier. Pour un autre tube ou un autre outil, il faut un autre tableau. Puis il contrôle la pièce finie : sommet centré, jeu, hauteur, alignement, planéité.'
  }
});

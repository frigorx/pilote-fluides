/* Station 1-6 — Le dudgeon (évasement à 45° pour raccord à écrou). Source : sources-metier/1-6-collet-battu.md, partie [B]
   Vocabulaire des fiches : le « dudgeon » est l'évasement frigorifique à 45° (dudgeonnière, écrou, huile,
   clé dynamométrique) ; le « collet battu » est le geste de plomberie (collerette plate au marteau, joint),
   qui demande un recuit au chalumeau : il n'est pas traité ici.
   Dépassement et couples : fiche d'atelier « FICHE SYNTHESE Travail tube cuivre froid » et « Faire un dudgeon » ;
   la notice du fabricant de l'appareil fait foi sur chantier. */
CUIVREZO.stations.push({
  id: '1-6', ligne: 1, titre: 'Le dudgeon', duree: '25 min',
  sources: ['sources-metier/1-6-collet-battu.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un dudgeon régulier, l’écrou en place',
    texte: 'Le bout du tube est évasé en cône à 45°, lisse, sans fissure. L’écrou, enfilé avant, vient le coiffer et se visse sur le raccord.',
    criteres: ['Cône régulier, lisse, sans fissure ni marque d’outil', 'Épaisseur uniforme, bien centré', 'Il épouse le raccord : ni trop grand, ni trop petit', 'L’écrou enfilé, dans le bon sens'],
    figure: { svg: 'dudgeon', etat: 'controle', legende: 'Le dudgeon réussi, l’écrou qui vient le coiffer.' },
    narration: 'Le dudgeon est un raccord sans flamme. Le bout du tube est évasé en cône, et un écrou vient le plaquer contre un raccord en laiton : métal contre métal, sans joint. C’est ce qui raccorde, par exemple, les liaisons d’une climatisation. Tout repose sur la qualité du cône : trop petit, il fuit ; trop grand, l’écrou ne passe plus ; fendu, il fuira un jour. Et un raccord qui fuit, c’est du fluide frigorigène dans l’atmosphère.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/1-6-dudgeon.webp', alt: 'La dudgeonnière : barre à trous, étrier et cône' },
    items: [
      { nom: 'Le tube recuit, coupé d’équerre et ébavuré', detail: 'station 1.3 : c’est la moitié de la réussite' },
      { nom: 'L’écrou du bon diamètre', detail: 'celui du raccord' },
      { nom: 'La dudgeonnière', detail: 'une barre à trous et un étrier à cône de 45°' },
      { nom: 'L’huile frigorifique', detail: 'une goutte sur les cônes au montage', aValider: 'L’huile : citée par la fiche de synthèse, formulation ambiguë dans « Faire un dudgeon »' },
      { nom: 'Deux clés, dont une dynamométrique', detail: 'pour serrer au bon couple' },
      { nom: 'Le raccord', detail: 'pour l’essai de montage' }
    ],
    narration: 'La dudgeonnière a deux pièces. La barre à trous, faite de deux mâchoires percées à plusieurs diamètres, qui serre le tube. Et l’étrier, qui porte un cône à quarante-cinq degrés au bout d’une vis. Le cône descend dans le tube et le rabat contre le chanfrein de la barre. Pour le montage, il faudra deux clés, dont une dynamométrique, qui mesure le serrage.'
  },
  gestes: [
    { titre: 'Partir d’un bout parfait', texte: 'Le tube est coupé d’équerre au coupe-tube, jamais à la scie, et ébavuré bout en bas, sans trop enlever de métal.',
      pointCle: 'Un bout de travers fait un dudgeon de travers.',
      pourquoi: 'Le cône reproduit fidèlement le bout du tube : une coupe oblique donne un cône oblique, une bavure donne une portée rugueuse, une paroi trop amincie donne un cône fragile.',
      figure: { svg: 'bout', etat: 'propre' }, clip: 'clips/1-6/01-bout.mp4',
      narration: 'Un dudgeon réussi commence à la station un point trois. Le cône va reproduire fidèlement le bout du tube : une coupe de travers donne un cône de travers, une bavure oubliée donne une portée rugueuse qui fuira. Et un ébavurage trop appuyé amincit la paroi, qui se fendra à l’évasement. Coupe d’équerre, ébavurage léger, bout vers le bas.' },
    { titre: 'Enfiler l’écrou, dans le bon sens', texte: 'Enfilez l’écrou sur le tube, filetage tourné vers le bout à évaser.',
      pointCle: 'Avant d’évaser. Toujours.',
      pourquoi: 'Une fois le cône formé, l’écrou ne peut plus passer : il faudrait recouper.',
      figure: { svg: 'dudgeon', etat: 'ecrou' }, clip: 'clips/1-6/02-ecrou.mp4',
      narration: 'Le geste qu’on oublie une fois, et jamais deux : enfiler l’écrou avant d’évaser. Une fois le cône formé, l’écrou ne passe plus par-dessus. Il ne reste alors qu’à recouper le tube et tout recommencer. L’écrou s’enfile dans le bon sens : son filetage regarde le bout du tube.' },
    { titre: 'Serrer le tube dans la barre', texte: 'Dans le trou du bon diamètre, côté chanfrein. Le tube dépasse de la cote A, puis on serre les écrous papillons.',
      pointCle: 'Dépassement A (fiche) : 1/4″ 1,3 · 3/8″ 1,6 · 1/2″ 1,8 · 5/8″ 2 mm.',
      pourquoi: 'Le métal qui dépasse est celui qui formera le cône. Trop, le cône est trop grand ; pas assez, il est trop petit.',
      aValider: 'Dépassement de la fiche d’atelier ; la notice d’un fabricant donne une fourchette voisine (0,7 à 1,3 mm en 1/4″)',
      figure: { svg: 'dudgeon', etat: 'mors' }, clip: 'clips/1-6/03-barre.mp4',
      narration: 'On place le tube dans le trou de son diamètre, du côté chanfreiné de la barre, et on le fait dépasser d’une petite hauteur, qu’on appelle A : un virgule trois millimètre en un quart, un virgule six en trois huitièmes, d’après la fiche de l’atelier. C’est ce métal qui dépasse qui va former le cône. Puis on serre les deux écrous papillons : le tube ne doit plus bouger.' },
    { titre: 'Poser l’étrier', texte: 'Posez l’étrier sur la barre, le cône bien au centre du tube, et bloquez-le.',
      pointCle: 'Le cône au centre, sinon le dudgeon sera décentré.',
      pourquoi: 'Un cône qui entre de biais pousse le métal d’un seul côté.',
      figure: { img: 'images/1-6-dudgeon.webp', alt: 'L’étrier posé sur la barre, cône au centre du tube' }, clip: 'clips/1-6/04-etrier.mp4',
      narration: 'On pose l’étrier sur la barre, au-dessus du tube, et on le bloque. Le cône doit arriver exactement au centre du tube. Un cône qui entre de biais pousse le métal d’un seul côté, et le dudgeon sera décentré.' },
    { titre: 'Visser jusqu’à la butée', texte: 'Tournez la poignée : le cône descend et rabat le bout du tube à 45°. Continuez jusqu’à la butée.',
      pointCle: 'Régulièrement, sans forcer au-delà de la butée.',
      pourquoi: 'Le cône étire le cuivre recuit contre le chanfrein de la barre. Forcer le fendrait.',
      figure: { svg: 'dudgeon', etat: 'evaser' }, clip: 'clips/1-6/05-evaser.mp4',
      narration: 'On tourne la poignée de l’étrier. Le cône descend dans le tube et l’écarte peu à peu, jusqu’à le plaquer contre le chanfrein de la barre, à quarante-cinq degrés. On tourne régulièrement, jusqu’à la butée. Le cuivre recuit se laisse étirer, mais il a une limite : au-delà, il se fend.' },
    { titre: 'Dévisser et contrôler', texte: 'Remontez le cône, retirez l’étrier, desserrez la barre et regardez le dudgeon.',
      pointCle: 'Lisse, régulier, centré, sans fissure.',
      pourquoi: 'C’est maintenant qu’un défaut se voit, et qu’on peut encore recouper.',
      figure: { svg: 'dudgeon', etat: 'controle' }, clip: 'clips/1-6/06-controler.mp4',
      narration: 'On remonte le cône, on retire l’étrier, on desserre la barre. Et on regarde le dudgeon de près, avant de monter quoi que ce soit. La surface est-elle lisse ? Le cône est-il régulier et centré ? Pas la moindre fissure au bord ? C’est le moment de voir un défaut : une fois monté, il ne se verra plus… jusqu’à la fuite.' },
    { titre: 'Huiler et visser à la main', texte: 'Une goutte d’huile frigorifique sur les cônes. Présentez le tube sur le raccord et vissez l’écrou à la main, jusqu’au contact.',
      pointCle: 'À la main d’abord : l’écrou doit se visser sans résistance.',
      pourquoi: 'Un écrou qui force à la main est mal engagé : à la clé, il abîmerait le filetage.',
      aValider: 'L’huile sur les cônes : à confirmer',
      figure: { img: 'images/1-6-serrage.webp', alt: 'Le tube présenté sur le raccord, l’écrou vissé' }, clip: 'clips/1-6/07-main.mp4',
      narration: 'Au montage, une goutte d’huile frigorifique sur les cônes aide les deux surfaces à glisser l’une sur l’autre. On présente le tube bien dans l’axe du raccord, et on visse l’écrou à la main, jusqu’au contact. S’il force à la main, c’est qu’il est mal engagé : on dévisse, on recommence. La clé ne sert qu’à finir le serrage.' },
    { titre: 'Serrer au couple, à deux clés', texte: 'Clé dynamométrique sur l’écrou, contre-clé sur le raccord. Serrez jusqu’au couple.',
      pointCle: 'Couples de la fiche : 1/4″ 18 · 3/8″ 22 · 1/2″ 42 N·m. Sur chantier, la notice de l’appareil fait foi.',
      pourquoi: 'Pas assez serré, le raccord fuit. Trop serré, le dudgeon s’écrase ou l’écrou casse. La contre-clé empêche le raccord de tourner et de tordre le tube.',
      aValider: 'Couples de la fiche d’atelier (unité écrite « N/m ») ; une notice de fabricant donne 15,7 · 29,4 · 29,4 N·m',
      figure: { svg: 'dudgeon', etat: 'serrage' }, clip: 'clips/1-6/08-couple.mp4',
      narration: 'Le serrage final se fait à deux clés. La clé dynamométrique sur l’écrou, parce qu’elle mesure l’effort : trop peu, le raccord fuit ; trop, le dudgeon s’écrase ou l’écrou casse. Et une contre-clé sur le raccord, qui l’empêche de tourner et de tordre le tube. Le couple dépend du diamètre. Sur un appareil réel, c’est la notice du fabricant qui le donne.' }
  ],
  pieges: [
    { titre: 'L’écrou oublié', voit: 'Un beau dudgeon… et l’écrou resté sur l’établi.', cause: 'On a évasé avant d’enfiler l’écrou.',
      eviter: 'L’écrou d’abord, toujours.', geste: 1, figure: { svg: 'dudgeon', etat: 'ecrou' },
      narration: 'Premier piège, le plus connu : l’écrou oublié. Le dudgeon est parfait, et l’écrou est resté sur l’établi. Il n’y a qu’un remède : recouper et tout refaire.' },
    { titre: 'Le dudgeon fendu', voit: 'Une fissure au bord du cône.', cause: 'Cuivre écroui non recuit, paroi amincie à l’ébavurage, ou évasement forcé.',
      eviter: 'Tube recuit, ébavurage léger, arrêt à la butée.', geste: 4, figure: { svg: 'dudgeon', etat: 'fissure' },
      narration: 'Deuxième piège : la fissure. Elle est parfois fine comme un cheveu, et elle fuira à coup sûr. Le cuivre était dur, ou la paroi trop amincie, ou l’on a forcé au-delà de la butée.' },
    { titre: 'Le dudgeon oblique', voit: 'Le cône est plus large d’un côté.', cause: 'Coupe de travers, ou cône posé hors du centre.',
      eviter: 'Coupe d’équerre, cône centré.', geste: 0, figure: { svg: 'dudgeon', etat: 'oblique' },
      narration: 'Troisième piège : le dudgeon oblique, qui ne portera que d’un côté. Il vient presque toujours d’une coupe de travers, ou d’un étrier mal centré.' },
    { titre: 'Trop grand ou trop petit', voit: 'L’écrou ne passe pas, ou le cône ne remplit pas le raccord.', cause: 'Mauvais dépassement dans la barre.',
      eviter: 'Respecter la cote A de votre diamètre.', geste: 2, figure: { svg: 'dudgeon', etat: 'mors' },
      narration: 'Quatrième piège : la mauvaise taille. Trop de tube dépassait de la barre, et le cône est trop grand : l’écrou ne se visse pas. Pas assez, et le cône est trop petit : il fuira. Tout se joue à la cote A.' },
    { titre: 'Le mauvais serrage', voit: 'Une fuite, ou un dudgeon écrasé, un écrou fendu.', cause: 'Serrage au jugé, ou sans contre-clé.',
      eviter: 'Clé dynamométrique au couple, contre-clé sur le raccord.', geste: 7, figure: { svg: 'dudgeon', etat: 'serrage' },
      narration: 'Dernier piège : le serrage au jugé. Trop faible, le raccord fuit ; trop fort, on écrase le dudgeon qu’on a si bien réussi, ou l’on fend l’écrou. La clé dynamométrique n’est pas un luxe : c’est elle qui rend le raccord étanche.' }
  ],
  controles: [
    { question: 'L’écrou est-il enfilé, et coulisse-t-il librement ?', comment: 'Faites glisser l’écrou jusqu’au dudgeon : il vient le coiffer.', siNon: 'Écrou oublié : recoupez. Écrou qui bloque : dudgeon trop grand.', geste: 1,
      figure: { svg: 'dudgeon', etat: 'controle' }, narration: 'Premier contrôle : l’écrou vient coiffer le dudgeon.' },
    { question: 'Le cône est-il sans fissure ?', comment: 'Regardez tout le bord, en tournant le tube à la lumière.', siNon: 'Recoupez et refaites : tube recuit, sans forcer.', geste: 4,
      figure: { svg: 'dudgeon', etat: 'fissure' }, narration: 'Deuxième contrôle : pas la moindre fissure au bord du cône.' },
    { question: 'La portée est-elle lisse et propre ?', comment: 'Ni bavure, ni rayure, ni marque d’outil.', siNon: 'Recoupez : l’ébavurage était insuffisant.', geste: 0,
      figure: { svg: 'bout', etat: 'propre' }, narration: 'Troisième contrôle : la surface du cône est lisse.' },
    { question: 'Le dudgeon est-il centré, d’épaisseur égale ?', comment: 'Regardez-le de face : le bord a la même largeur tout autour.', siNon: 'Recoupez : coupe d’équerre, étrier centré.', geste: 3,
      figure: { svg: 'dudgeon', etat: 'oblique' }, narration: 'Quatrième contrôle : le dudgeon est centré.' },
    { question: 'Le cône épouse-t-il le raccord ?', comment: 'Présentez-le sur le raccord : il porte tout autour.', siNon: 'Trop grand ou trop petit : revoyez le dépassement A.', geste: 2,
      figure: { img: 'images/1-6-serrage.webp', alt: 'Essai sur le raccord' }, narration: 'Dernier contrôle : l’essai sur le raccord.' }
  ],
  prof: {
    verifie: ['L’écrou en place, qui coulisse et coiffe le dudgeon', 'Le cône : sans fissure, lisse, centré', 'Le montage : à la main, puis au couple à deux clés', 'Plus tard : l’essai d’étanchéité'],
    narration: 'Le professeur regarde votre dudgeon avant le montage, puis votre serrage. Un raccord frigorifique se juge sur une seule chose : son étanchéité. Elle se vérifiera plus tard, sous pression d’azote. Aujourd’hui, le professeur confirme que votre dudgeon a tout pour la réussir.'
  }
});

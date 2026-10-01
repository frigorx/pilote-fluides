/* Station 2-2 — Allumer, régler, éteindre la flamme. Source : sources-metier/2-chalumeau.md (partie 2-2)
   RÈGLE DES FICHES : le professeur est présent à CHAQUE allumage ; aucun élève seul à un poste allumé.
   La station prépare le geste, elle ne remplace pas la surveillance.
   DÉCIDÉ le 30/09/2026 (DECISIONS-2026-09-30.md) : le gaz combustible s'ouvre en dernier et se ferme en premier.
   Allumage : oxygène un peu, acétylène largement, allumer, régler (INRS ED 742 p. 22). Extinction : acétylène,
   un peu d'oxygène, oxygène (INRS). Fin de travail : bouteilles fermées (acétylène d'abord), purge à zéro,
   vis desserrées, robinets du chalumeau refermés (OPPBTP, notice WELDTEAM, cinq fiches). */
CUIVREZO.stations.push({
  id: '2-2', ligne: 2, titre: 'Allumer, régler, éteindre la flamme', duree: '25 min', vignette: 'images/2-2-allumer.webp',
  sources: ['sources-metier/2-chalumeau.md'],
  referentiel: { taches: [REF.T12, REF.T10], competences: [REF.C31, REF.C34], savoirs: [REF.S62, REF.S63] },
  obtenir: {
    titre: 'Une flamme neutre, allumée et éteinte dans l’ordre',
    texte: 'Devant le professeur, vous allumez, vous réglez une flamme neutre, vous nommez les deux autres, et vous éteignez dans le bon ordre.',
    criteres: ['Allumage dans l’ordre, avec l’allumeur à pierre', 'Flamme neutre : dard net, arrondi, ni sifflement ni fumée', 'Les deux autres flammes reconnues et nommées', 'Extinction dans l’ordre, poste refermé en fin de travail'],
    figure: { svg: 'flamme', etat: 'neutre', legende: 'La flamme neutre : un dard net, arrondi, bien délimité.' },
    narration: 'Allumer un chalumeau n’a rien de difficile, à condition de toujours faire les gestes dans le même ordre. C’est l’ordre qui protège : il évite le claquement à l’allumage, la fumée noire, et le retour de flamme à l’extinction. Dans cette station, vous apprenez cet ordre et vous apprenez à lire la flamme. Mais retenez la règle de l’atelier : vous n’allumez jamais seul, le professeur est toujours là.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/2-2-allumer.webp', alt: 'Allumer le chalumeau à l’allumeur à pierre' },
    items: [
      { nom: 'Le poste préparé et visé', detail: 'station 2.1 : pressions réglées, sans fuite' },
      { nom: 'Le chalumeau et sa buse', detail: 'la buse adaptée au travail, donnée par le professeur' },
      { nom: 'L’allumeur à pierre', detail: 'jamais un briquet' },
      { nom: 'Mes protections', detail: 'lunettes teintées, gants à manchettes, tablier' }
    ],
    narration: 'On part d’un poste préparé et visé à la station deux point un. Le chalumeau porte deux robinets : le bleu pour l’oxygène, le rouge pour l’acétylène. On allume avec un allumeur à pierre, jamais avec un briquet, qui peut exploser dans la main. Et les lunettes teintées sont sur les yeux avant la première étincelle.'
  },
  gestes: [
    { titre: 'Orienter la buse, préparer l’allumeur', texte: 'Buse vers une zone libre. L’allumeur à pierre en main avant d’ouvrir le moindre robinet.',
      pointCle: 'Jamais vers un camarade, un tuyau, une bouteille.',
      pourquoi: 'Un chalumeau ouvert et pas encore allumé laisse échapper du gaz : l’allumeur doit être prêt.',
      figure: { img: 'images/2-2-allumer.webp', alt: 'Buse vers une zone libre, allumeur en main' }, clip: 'clips/2-2/01-orienter.mp4',
      narration: 'Avant d’ouvrir quoi que ce soit, on oriente la buse vers une zone libre : jamais vers quelqu’un, ni vers un tuyau, ni vers une bouteille. Et l’allumeur est déjà dans l’autre main. Un chalumeau qu’on ouvre sans pouvoir l’allumer aussitôt laisse le gaz s’échapper.' },
    { titre: 'Ouvrir un peu l’oxygène', texte: 'Ouvrez légèrement le robinet bleu.',
      pointCle: 'Un filet d’oxygène, pas plus.',
      pourquoi: 'Ce filet évite les flammèches noires et fumeuses de l’acétylène pur à l’allumage.',
      figure: { svg: 'oa', etat: 'allumer' }, clip: 'clips/2-2/02-oxygene.mp4',
      narration: 'Premier robinet : l’oxygène, le bleu, ouvert légèrement. Juste un filet. Il évite qu’à l’allumage l’acétylène brûle seul, en flammèches noires et en suie. C’est l’ordre que recommande l’INRS : l’oxygène d’abord, le gaz combustible ensuite.' },
    { titre: 'Ouvrir largement l’acétylène', texte: 'Ouvrez le robinet rouge, largement.',
      pointCle: 'Et on allume aussitôt.',
      pourquoi: 'L’acétylène qui sort sans être allumé s’accumule autour de vous.',
      figure: { svg: 'oa', etat: 'allumer' }, clip: 'clips/2-2/03-acetylene.mp4',
      narration: 'Deuxième robinet : l’acétylène, le rouge, ouvert largement. Et l’on n’attend pas : on allume tout de suite.' },
    { titre: 'Allumer à la buse', texte: 'Faites jaillir l’étincelle au bout de la buse.',
      pointCle: 'La flamme est d’abord très chargée en acétylène, jaune et fumeuse.',
      pourquoi: 'C’est normal : il n’y a pas encore assez d’oxygène. On règle ensuite.',
      figure: { img: 'images/2-2-allumer.webp', alt: 'L’étincelle de l’allumeur au bout de la buse' }, clip: 'clips/2-2/04-allumer.mp4',
      narration: 'On présente l’allumeur au bout de la buse et on fait jaillir l’étincelle. La flamme prend, jaune, longue, un peu fumeuse : elle a trop d’acétylène. C’est normal, on va la régler.' },
    { titre: 'Régler à l’oxygène jusqu’au dard net', texte: 'Ouvrez peu à peu l’oxygène : le voile blanc autour du dard disparaît, le dard devient net et arrondi.',
      pointCle: 'On s’arrête dès que le voile blanc a disparu.',
      pourquoi: 'Trop d’oxygène au-delà, et la flamme devient oxydante : elle siffle et brûle le cuivre.',
      figure: { svg: 'flamme', etat: 'trois' }, clip: 'clips/2-2/05-regler.mp4',
      narration: 'On ouvre maintenant l’oxygène, doucement, en regardant le cœur de la flamme, le dard. Il est d’abord long et entouré d’un voile blanc : c’est la flamme carburante. À mesure que l’oxygène arrive, le voile se retire. Dès qu’il a disparu et que le dard est net, arrondi, on s’arrête : c’est la flamme neutre. Si l’on continue, le dard raccourcit, s’affine, et la flamme se met à siffler : elle est oxydante.' },
    { titre: 'Reconnaître les trois flammes', texte: 'Carburante : dard long, voile blanc. Neutre : dard net, arrondi. Oxydante : dard court, pointu, qui siffle.',
      pointCle: 'Le professeur vous demande de les nommer.',
      pourquoi: 'Chaque travail demande sa flamme. Pour braser le cuivre, on règle une flamme neutre, jamais oxydante. Savoir les lire, c’est savoir corriger.',
      figure: { svg: 'flamme', etat: 'trois' }, clip: 'clips/2-2/06-trois.mp4',
      narration: 'Il faut savoir reconnaître les trois flammes d’un coup d’œil. La carburante, trop riche en acétylène : un dard long, entouré d’un voile blanc. La neutre : un dard net et arrondi. L’oxydante, trop riche en oxygène : un dard court et pointu, et une flamme qui siffle. Pour braser le cuivre, vous garderez la flamme neutre, jamais l’oxydante, qui noircit le cuivre. Le professeur vous les fera nommer.' },
    { titre: 'Ne jamais poser le chalumeau allumé', texte: 'Pendant le travail, le chalumeau reste en main. Pour le poser, on l’éteint.',
      pointCle: 'Même « une seconde ».',
      pourquoi: 'Un chalumeau posé allumé glisse, tourne, et brûle ce qu’il touche.',
      figure: { svg: 'poste', etat: 'secours' }, clip: 'clips/2-2/07-poser.mp4',
      narration: 'Un chalumeau allumé ne se pose jamais, même une seconde, même sur l’établi. Il bascule, tourne, et la flamme part vers un tuyau ou une main. Pour le poser, on l’éteint.' },
    { titre: 'Éteindre : l’acétylène d’abord', texte: 'Fermez d’abord le robinet d’acétylène. Laissez l’oxygène s’échapper un court instant, puis fermez le robinet d’oxygène.',
      pointCle: 'Rouge d’abord, bleu ensuite.',
      pourquoi: 'En coupant d’abord le gaz combustible, la flamme s’éteint net, sans claquement ni suie.',
      figure: { svg: 'oa', etat: 'eteindre' }, clip: 'clips/2-2/08-eteindre.mp4',
      narration: 'Pour éteindre, on ferme d’abord le robinet d’acétylène, le rouge : la flamme s’éteint net. On laisse l’oxygène s’échapper un court instant, pour chasser ce qui reste d’acétylène dans le chalumeau, puis on ferme celui d’oxygène, le bleu. C’est l’ordre de l’INRS, et toutes les fiches de l’atelier sont d’accord. Le chalumeau éteint se pose sur son crochet, et on surveille la zone : rien ne doit couver.' },
    { titre: 'En fin de travail, refermer le poste', texte: 'Fermez les deux bouteilles, l’acétylène d’abord. Ouvrez les robinets du chalumeau et purgez jusqu’à zéro aux deux manomètres, loin de toute flamme. Desserrez les vis de détente. Refermez les robinets du chalumeau.',
      pointCle: 'Les manomètres retombent à zéro.',
      pourquoi: 'Un poste laissé sous pression fuit pendant la nuit, et fatigue les détendeurs.',
      figure: { svg: 'oa', etat: 'fin' }, clip: 'clips/2-2/09-fin.mp4',
      narration: 'À la fin du travail, on referme tout le poste, toujours dans le même ordre. D’abord les deux bouteilles, en commençant par l’acétylène : le gaz combustible se ferme en premier. Ensuite on purge : on ouvre les robinets du chalumeau, dans un endroit aéré, loin de toute flamme, et le gaz resté dans les tuyaux s’échappe jusqu’à ce que les manomètres retombent à zéro. Alors seulement, on desserre les vis de détente, et on referme les robinets du chalumeau. Le poste est au repos, sans aucune pression.' }
  ],
  pieges: [
    { titre: 'Le chalumeau ouvert, pas allumé', voit: 'Du gaz s’échappe pendant qu’on cherche l’allumeur.', cause: 'Hésitation, allumeur pas prêt.',
      eviter: 'Allumeur en main avant d’ouvrir.', geste: 0, figure: { img: 'images/2-2-allumer.webp', alt: 'L’allumeur prêt' },
      narration: 'Premier piège : ouvrir le chalumeau, puis chercher l’allumeur. Le gaz s’échappe pendant ce temps. L’allumeur est en main avant le premier robinet.' },
    { titre: 'Le briquet', voit: 'Un briquet approché de la buse.', cause: 'L’allumeur n’était pas là.',
      eviter: 'Uniquement l’allumeur à pierre.', geste: 0, figure: { img: 'images/2-2-allumer.webp', alt: 'L’allumeur à pierre' },
      narration: 'Deuxième piège : le briquet. Près d’une flamme de trois mille degrés, il peut exploser dans la main. Seul l’allumeur à pierre est autorisé.' },
    { titre: 'La flamme qui se décolle', voit: 'Le dard ne tient plus à la buse, la flamme souffle.', cause: 'Gaz ouvert trop grand pour la buse.',
      eviter: 'Réduire l’acétylène, ou prendre une buse plus grosse.', geste: 4, figure: { svg: 'flamme', etat: 'oxydante' },
      narration: 'Troisième piège : la flamme décollée, qui souffle au lieu de tenir à la buse. Trop de gaz pour cette buse : on réduit l’acétylène.' },
    { titre: 'Le claquement', voit: 'Un claquement sec, la flamme s’éteint ou siffle dans le chalumeau.', cause: 'Débit trop faible, buse trop chaude ou encrassée.',
      eviter: 'Fermer l’acétylène, puis l’oxygène, et appeler le professeur.', geste: 7, figure: { svg: 'oa', etat: 'eteindre' },
      narration: 'Quatrième piège, le plus sérieux : le claquement, parfois suivi d’un sifflement dans le chalumeau. C’est le signe d’un retour de flamme. On ferme l’acétylène, puis l’oxygène, et on appelle le professeur. On ne rallume pas seul.' },
    { titre: 'Le chalumeau posé allumé', voit: 'Un chalumeau allumé sur l’établi.', cause: 'L’habitude du « juste une seconde ».',
      eviter: 'On l’éteint pour le poser.', geste: 6, figure: { svg: 'poste', etat: 'secours' },
      narration: 'Dernier piège : poser le chalumeau allumé. Il bascule, et brûle ce qu’il touche. On l’éteint.' }
  ],
  controles: [
    { question: 'Ai-je allumé dans l’ordre, avec l’allumeur ?', comment: 'Buse orientée, oxygène un peu, acétylène largement, allumer.', siNon: 'Éteignez, et reprenez l’ordre devant le professeur.', geste: 1,
      figure: { svg: 'oa', etat: 'allumer' }, narration: 'Premier contrôle : l’ordre d’allumage.' },
    { question: 'Ma flamme est-elle neutre ?', comment: 'Dard net et arrondi, sans voile blanc, sans sifflement.', siNon: 'Voile blanc : ajoutez de l’oxygène. Sifflement : retirez-en.', geste: 4,
      figure: { svg: 'flamme', etat: 'neutre' }, narration: 'Deuxième contrôle : la flamme est neutre.' },
    { question: 'Je sais nommer les deux autres flammes ?', comment: 'Carburante et oxydante : à quoi on les reconnaît.', siNon: 'Revoyez les trois flammes.', geste: 5,
      figure: { svg: 'flamme', etat: 'trois' }, narration: 'Troisième contrôle : les trois flammes, reconnues.' },
    { question: 'Ai-je éteint dans l’ordre ?', comment: 'Acétylène d’abord, puis oxygène.', siNon: 'Reprenez l’extinction : rouge d’abord.', geste: 7,
      figure: { svg: 'oa', etat: 'eteindre' }, narration: 'Quatrième contrôle : l’extinction, acétylène d’abord.' },
    { question: 'En fin de travail, le poste est-il sans pression ?', comment: 'Bouteilles fermées, manomètres à zéro, vis desserrées.', siNon: 'Refermez le poste dans l’ordre.', geste: 8,
      figure: { svg: 'oa', etat: 'fin' }, narration: 'Dernier contrôle : le poste est refermé, sans pression.' }
  ],
  prof: {
    verifie: ['Il est présent à l’allumage', 'La flamme neutre obtenue, les deux autres nommées', 'L’extinction dans l’ordre', 'Le poste refermé, le chalumeau froid, la zone surveillée'],
    narration: 'Le professeur est là à chaque allumage : c’est la règle, et elle ne change pas quand on sait faire. Il regarde votre ordre, votre flamme, et votre extinction. Une fois ces gestes sûrs, le chalumeau devient l’outil de la ligne suivante : braser.'
  }
});

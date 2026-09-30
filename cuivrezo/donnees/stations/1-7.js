/* Station 1-7 — L'emboîture à la pince (l'expandeur). Source : sources-metier/1-7-emboiture.md
   Outil des fiches : la « pince à emboîture (expandeur) » et ses têtes, une par diamètre.
   Serrage en trois temps avec un quart de tour (fiche « T.P Les assemblages par emboîture ») ;
   recuit exigé sur tube écroui seulement (DÉCIDÉ le 30/09/2026) : la station part d'un tube recuit en
   couronne, le recuit d'une barre est fait par le professeur, au chalumeau (ligne 2).
   Profondeur d'emboîture : DÉCIDÉE le 30/09/2026, de 1 à 1,5 fois le diamètre (DECISIONS-2026-09-30.md). */
CUIVREZO.stations.push({
  id: '1-7', ligne: 1, titre: 'L’emboîture à la pince', duree: '20 min', vignette: 'images/1-7-pince.webp',
  sources: ['sources-metier/1-7-emboiture.md'],
  referentiel: { taches: [REF.T10], competences: [REF.C34], savoirs: [REF.S55, REF.S62] },
  obtenir: {
    titre: 'Un bout élargi où l’autre tube entre juste',
    texte: 'Le bout du tube est élargi, droit dans l’axe, sans fente. Un tube du même diamètre y entre sans forcer et sans jouer : il est prêt pour la brasure.',
    criteres: ['L’autre tube entre sans forcer, et sans jouer', 'Emboîture sans fente ni bavure', 'Régulière, ronde, alignée sur l’axe du tube', 'Profondeur d’emboîture conforme'],
    figure: { composant: 'cuivre-3d', attributs: { piece: 'emboiture', angle: '90' }, legende: 'Le tube mâle dans l’emboîture : un jeu de quelques dixièmes.' },
    narration: 'Pour raccorder deux tubes de même diamètre, on peut ajouter un manchon, avec deux brasures. Ou bien élargir le bout de l’un pour y glisser l’autre : une seule brasure, donc une seule fuite possible au lieu de deux. C’est l’emboîture. Tout son secret tient dans un jeu minuscule entre les deux tubes : assez pour que la brasure s’y glisse, pas assez pour que le tube joue. Le seul contrôle qui compte, c’est l’essai : l’autre tube doit entrer sans forcer, et sans jouer.'
  },
  materiel: {
    titre: 'Je sors mon matériel',
    figure: { img: 'images/1-7-pince.webp', alt: 'La pince à emboîture, tête engagée dans le tube' },
    items: [
      { nom: 'La pince à emboîture', detail: 'l’expandeur, avec son jeu de têtes' },
      { nom: 'La tête du diamètre du tube', detail: 'une tête par diamètre' },
      { nom: 'Un tube recuit, coupé d’équerre et ébavuré', detail: 'en couronne, il se travaille tel quel ; une barre écrouie est recuite d’abord par le professeur, au chalumeau' },
      { nom: 'Un bout du même tube pour l’essai', detail: 'c’est lui qui dira si l’emboîture est bonne' },
      { nom: 'Le mètre et le feutre', detail: 'pour la profondeur d’emboîture' }
    ],
    narration: 'La pince à emboîture, qu’on appelle aussi l’expandeur, ressemble à une grosse pince. Au bout, on visse une tête faite de segments : quand on serre les poignées, les segments s’écartent et poussent la paroi du tube vers l’extérieur. Chaque tête correspond à un seul diamètre. Gardez près de vous un bout du même tube : c’est lui qui servira à l’essai final.'
  },
  gestes: [
    { titre: 'Partir d’un bout parfait', texte: 'Coupé d’équerre au coupe-tube, ébavuré bout vers le bas, sans trop enlever de métal.',
      pointCle: 'Une bavure oubliée fait fendre le tube.',
      pourquoi: 'Au moment d’élargir, la moindre entaille au bord devient le départ d’une fente. Et une bavure abîme aussi la tête de la pince.',
      figure: { svg: 'bout', etat: 'propre' }, clip: 'clips/1-7/01-bout.mp4',
      narration: 'Comme pour le dudgeon, tout commence par un bout parfait : coupé d’équerre, ébavuré bout vers le bas. Ici, c’est encore plus important. En élargissant le tube, on étire le cuivre, et la moindre entaille au bord devient le point de départ d’une fente.' },
    { titre: 'Choisir la tête du bon diamètre', texte: 'Prenez la tête qui porte le diamètre du tube.',
      pointCle: 'Une tête par diamètre, jamais « à peu près ».',
      pourquoi: 'Trop grosse, le jeu est trop grand : la brasure ne remplit plus le joint. Trop petite, l’autre tube n’entre pas.',
      figure: { svg: 'emboiture', etat: 'tete' }, clip: 'clips/1-7/02-tete.mp4',
      narration: 'Chaque tête est faite pour un diamètre. Une tête trop grosse élargit trop : l’autre tube flotte, et la brasure, qui monte par capillarité dans un jeu très fin, ne remplit plus le joint. Une tête trop petite n’élargit pas assez : l’autre tube n’entre pas. On prend la tête du diamètre exact.' },
    { titre: 'Visser la tête sur la pince', texte: 'Pince ouverte, vissez la tête à fond, dans le sens des aiguilles d’une montre.',
      pointCle: 'Tête vissée à fond, pince ouverte.',
      pourquoi: 'Une tête mal vissée se désaxe au serrage et élargit de travers.',
      figure: { img: 'images/1-7-pince.webp', alt: 'La pince et sa tête' }, clip: 'clips/1-7/03-visser.mp4',
      narration: 'On ouvre la pince et on visse la tête à fond, dans le sens des aiguilles d’une montre. Une tête mal vissée bouge au serrage, et l’emboîture part de travers.' },
    { titre: 'Enfiler la tête jusqu’à la butée', texte: 'Pince ouverte, enfilez la tête dans le tube jusqu’à la butée. Tenez le tube à la main, la pince dans son axe.',
      pointCle: 'À la main, pas dans l’étau : la pince doit rester dans l’axe du tube.',
      pourquoi: 'Serré dans l’étau, le tube ne peut plus suivre la pince : l’emboîture se désaxe.',
      figure: { svg: 'emboiture', etat: 'tete' }, clip: 'clips/1-7/04-enfiler.mp4',
      narration: 'On enfile la tête dans le bout du tube, jusqu’à la butée. Le tube se tient à la main, pas dans l’étau. Pourquoi ? Parce que la pince doit rester exactement dans l’axe du tube, et qu’un tube bloqué dans l’étau ne peut pas s’aligner avec elle.' },
    { titre: 'Serrer un premier tiers', texte: 'Serrez les poignées environ au tiers de leur course, puis desserrez.',
      pointCle: 'Jamais tout d’un coup.',
      pourquoi: 'Élargi en une seule fois, le cuivre se fend.',
      figure: { svg: 'emboiture', etat: 'ouvrir' }, clip: 'clips/1-7/05-tiers.mp4',
      narration: 'Premier serrage, au tiers de la course environ. Les segments de la tête s’écartent et poussent la paroi. Puis on desserre. On ne va jamais jusqu’au bout du premier coup : le cuivre a besoin d’être élargi par étapes, sinon il se fend.' },
    { titre: 'Tourner d’un quart de tour', texte: 'Pince desserrée, tournez-la d’un quart de tour dans le tube.',
      pointCle: 'Entre deux serrages, un quart de tour.',
      pourquoi: 'Les segments laissent de petites marques entre eux. En tournant, le serrage suivant les efface : l’emboîture reste ronde.',
      figure: { svg: 'emboiture', etat: 'tourner' }, clip: 'clips/1-7/06-quart.mp4',
      narration: 'La pince desserrée, on la fait tourner d’un quart de tour dans le tube. La tête est faite de segments séparés par de petits espaces : chaque serrage laisse une trace à leur place. En tournant avant de serrer de nouveau, on répartit le travail, et l’emboîture reste bien ronde.' },
    { titre: 'Serrer aux deux tiers, puis jusqu’à la butée', texte: 'Serrez aux deux tiers, desserrez, puis serrez jusqu’à la butée de la pince.',
      pointCle: 'Trois serrages progressifs, jusqu’à la butée.',
      pourquoi: 'La butée fixe le diamètre final : c’est elle qui donne le bon jeu.',
      figure: { svg: 'emboiture', etat: 'ouvrir' }, clip: 'clips/1-7/07-butee.mp4',
      narration: 'Deuxième serrage, aux deux tiers de la course. Puis le dernier, jusqu’à la butée de la pince. C’est la butée qui fixe le diamètre final de l’emboîture, et donc le jeu. Trois serrages progressifs, jamais un seul.' },
    { titre: 'Retirer et essayer', texte: 'Desserrez, retirez la tête. Glissez le bout de tube d’essai dans l’emboîture.',
      pointCle: 'Il entre sans forcer, et sans jouer.',
      pourquoi: 'C’est le seul contrôle qui compte : il dit tout du jeu que remplira la brasure.',
      figure: { svg: 'emboiture', etat: 'profil' }, clip: 'clips/1-7/08-essai.mp4',
      narration: 'On desserre, on retire la tête, et on fait l’essai. Le bout de tube d’essai doit entrer à la main, sans forcer, et une fois entré, il ne doit pas jouer. S’il force, l’emboîture est trop étroite ; s’il flotte, elle est trop large. Ce jeu, presque invisible, c’est celui que la brasure viendra remplir.' }
  ],
  pieges: [
    { titre: 'L’emboîture fendue', voit: 'Une fente au bord du tube élargi.', cause: 'Tube écroui non recuit, bavure laissée, ou serrage en une seule fois.',
      eviter: 'Tube recuit, bout ébavuré, trois serrages progressifs.', geste: 4, figure: { svg: 'emboiture', etat: 'fissure' },
      narration: 'Premier piège : la fente. Elle vient d’un cuivre trop dur, d’une bavure oubliée, ou d’un serrage fait d’un seul coup. Une emboîture fendue ne se rattrape pas : la brasure ne tiendra pas.' },
    { titre: 'L’emboîture de travers', voit: 'Le bout élargi n’est pas dans l’axe du tube.', cause: 'Tube serré dans l’étau, ou pince tenue de biais.',
      eviter: 'Tube à la main, pince dans l’axe.', geste: 3, figure: { svg: 'emboiture', etat: 'ovale' },
      narration: 'Deuxième piège : l’emboîture de travers. Les deux tubes ne seront pas alignés, et le jeu sera plus grand d’un côté que de l’autre. Tube à la main, pince dans l’axe.' },
    { titre: 'Le tube qui joue', voit: 'Le tube d’essai flotte dans l’emboîture.', cause: 'Tête trop grosse pour le tube.',
      eviter: 'La tête du diamètre exact.', geste: 1, figure: { svg: 'emboiture', etat: 'profil' },
      narration: 'Troisième piège : le tube d’essai flotte. La tête était trop grosse. Avec trop de jeu, la brasure ne monte plus par capillarité, et le joint reste creux.' },
    { titre: 'L’emboîture ovale', voit: 'Le bout élargi n’est pas rond.', cause: 'Tête engagée de travers, ou pas de quart de tour entre les serrages.',
      eviter: 'Tête enfilée droit, quart de tour entre deux serrages.', geste: 5, figure: { svg: 'emboiture', etat: 'ovale' },
      narration: 'Quatrième piège : l’emboîture ovale. La tête était de biais, ou l’on a serré toujours au même endroit. Le jeu devient irrégulier.' },
    { titre: 'La tête bloquée', voit: 'La tête ne sort plus du tube.', cause: 'On a élargi un tube encore chaud du recuit.',
      eviter: 'Laisser refroidir le tube avant d’élargir.', geste: 3, figure: { svg: 'emboiture', etat: 'tete' },
      narration: 'Dernier piège, quand le tube a été recuit : élargir un tube encore chaud. En refroidissant, il se resserre sur la tête et la bloque. On attend toujours qu’il soit froid.' }
  ],
  controles: [
    { question: 'Le tube d’essai entre-t-il sans forcer ?', comment: 'Glissez-le à la main.', siNon: 'Emboîture trop étroite : vérifiez la tête et allez jusqu’à la butée.', geste: 6,
      figure: { svg: 'emboiture', etat: 'profil' }, narration: 'Premier contrôle : le tube d’essai entre à la main.' },
    { question: 'Une fois entré, ne joue-t-il pas ?', comment: 'Essayez de le faire bouger de côté.', siNon: 'Trop de jeu : la tête était trop grosse. Recoupez et recommencez.', geste: 1,
      figure: { svg: 'emboiture', etat: 'profil' }, narration: 'Deuxième contrôle : entré, il ne bouge pas de côté.' },
    { question: 'L’emboîture est-elle sans fente ?', comment: 'Regardez tout le bord, à la lumière.', siNon: 'Recoupez, et reprenez sur un tube recuit, en trois serrages.', geste: 4,
      figure: { svg: 'emboiture', etat: 'fissure' }, narration: 'Troisième contrôle : aucune fente au bord.' },
    { question: 'Est-elle ronde et dans l’axe ?', comment: 'Regardez le bout de face, puis de profil.', siNon: 'Recoupez : tube à la main, pince dans l’axe, quart de tour.', geste: 5,
      figure: { svg: 'emboiture', etat: 'ovale' }, narration: 'Quatrième contrôle : ronde, et bien dans l’axe du tube.' },
    { question: 'La profondeur est-elle conforme ?', comment: 'Mesurez la longueur élargie : au moins le diamètre du tube, au plus une fois et demie ce diamètre (de 14 à 21 mm pour un tube de 14).', siNon: 'Trop courte : recoupez et recommencez, tête enfilée jusqu’à la butée. Si le plan demande autre chose, voyez le professeur.', geste: 6,
      figure: { svg: 'emboiture', etat: 'profil' }, narration: 'Dernier contrôle : la longueur élargie. Elle doit valoir au moins le diamètre du tube, et au plus une fois et demie ce diamètre.' }
  ],
  prof: {
    verifie: ['L’essai d’emboîtement : sans forcer, sans jouer', 'L’emboîture : sans fente, ronde, dans l’axe', 'Le geste : trois serrages, quart de tour, tube à la main', 'Avant de braser : il voit toutes les emboîtures'],
    narration: 'Le professeur fait l’essai avec vous, et regarde l’emboîture de près. Dans les fiches de l’atelier, les emboîtures se montrent toujours avant de braser : une fois brasées, un défaut ne se corrige plus. La brasure, justement, fera l’objet d’une prochaine ligne.'
  }
});

/* CartoClim 2.6 — La vanne 4 voies : froid ou chaud. Écrite le 02/10/2026 sur le moule de la station étalon 3.2. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '2.6', ligne: 2,
  kicker: 'CartoClim · Ligne 2 La machine · Station 6',
  titre: "La vanne 4 voies : froid ou chaud",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" },
    { id: '2.2', quoi: "haute pression, basse pression : ce que ça veut dire" }
  ],

  photos: [
    { src: 'assets/biblio/fd4279c1a0.jpeg',
      alt: "Une unité extérieure de pompe à chaleur blanche, fixée au mur d’une maison, avec son hélice derrière une grille.",
      titre: "Une unité extérieure.", sous: "Sur une machine réversible, la vanne 4 voies est cachée dans ce boîtier." },
    { src: 'assets/biblio/e2e7fed2c7.jpeg',
      alt: "Une grosse unité extérieure grise posée sur des plots au pied d’un bâtiment, avec ses grilles sur le côté et un conduit noir au sol.",
      titre: "Plus grosse, toujours dehors.", sous: "C’est dehors que travaillent le compresseur et ses vannes." }
  ],

  aQuoiCaSert: "À <strong>inverser le sens du fluide</strong> dans les deux échangeurs, pour que la même machine fasse du <strong>froid</strong> l’été et du <strong>chaud</strong> l’hiver. Le compresseur, lui, ne change jamais de sens : la vanne change seulement la route que prend le fluide. Résultat : la batterie du dehors et celle du dedans <strong>échangent leur rôle</strong>.",
  ouOnLeTrouve: "Dans l’unité extérieure de tous les climatiseurs et pompes à chaleur air-air réversibles, près du compresseur. Elle sert aussi à <strong>dégivrer</strong> l’unité extérieure l’hiver : on passe quelques minutes en mode froid. C’est une pièce que le technicien rencontre au dépannage et à la pose.",

  scene: () => ScenesStation.vanneEnCoupe(),

  technologie: [
    ["Le corps de la vanne", "un tube de cuivre fermé aux deux bouts, avec <strong>quatre raccordements</strong>. D’un côté, <strong>un seul tube</strong> : le <strong>refoulement</strong> du compresseur, en haute pression. De l’autre, <strong>trois tubes côte à côte</strong> : celui du milieu est l’<strong>aspiration</strong>, en basse pression ; les deux autres vont aux échangeurs. Sur certains modèles, le tube du refoulement est décalé."],
    ["Le tiroir", "une pièce qui glisse d’un bout à l’autre du corps. Elle porte une <strong>cuvette</strong>, un petit pont qui relie le tube du milieu à l’un des deux tubes voisins. Le tube resté libre débouche dans le corps de la vanne, donc dans la haute pression. À chaque bout du tiroir, un <strong>piston</strong> percé d’un tout petit trou."],
    ["La vanne pilote", "une toute petite vanne à <strong>bobine</strong>, fixée sur le corps et reliée à lui par <strong>trois capillaires</strong> : un vers chaque bout, un vers l’aspiration. Son seul rôle : relier l’un des deux bouts à la basse pression, ou l’autre."],
    ["Ce qui pousse le tiroir", "pas de moteur : la <strong>différence de pression</strong> entre haute et basse pression. Le petit trou des pistons laisse la haute pression remplir les deux bouts ; la pilote en vide un vers l’aspiration ; de l’autre côté, la haute pression pousse. En fin de course, un pointeau ferme le petit trou : plus de fuite entre haute et basse pression."]
  ],

  variantes: [
    "<strong>Le dégivrage</strong> — l’hiver, l’échangeur extérieur évapore et se couvre de givre. La vanne bascule quelques minutes en mode froid : il condense, et le givre fond. C’est la station 2.7.",
    "<strong>Bobine alimentée en chaud, ou en froid</strong> — selon le modèle, c’est l’un ou l’autre. La vanne est la même, seule la position « sans courant » diffère : on la lit sur la notice.",
    "<strong>Les coups de liquide</strong> — à l’inversion, l’ancien condenseur, plein de liquide, devient évaporateur : du liquide peut revenir vers le compresseur. D’où la <strong>bouteille anti-coups de liquide</strong> qu’on trouve souvent sur l’aspiration.",
    "<strong>Le détendeur</strong> — le fluide le traverse dans l’autre sens quand on inverse le cycle. C’est la station 2.5."
  ],
  reglage: "Aucun réglage sur la vanne elle-même : elle n’a que deux positions. C’est la <strong>carte de la machine</strong> qui commande la bobine, selon le mode choisi à la télécommande (froid ou chaud) et pendant les dégivrages. Stations 5.1 et 2.7.",

  consigneAptitudes: 'La vanne 4 voies d’un split réversible : cochez ce qu’elle sait faire, puis validez.',
  titreAptitudes: 'Que sait faire la vanne 4 voies ?',
  colonnes: [
    { id: 'inverser', libelle: 'Échanger les rôles', aide: 'les deux échangeurs : celui qui condensait évapore, et l’autre fait l’inverse',
      dessin: '<path d="M18 34 H78 M62 18 L80 34 L62 50 M82 66 H22 M38 50 L20 66 L38 82"/>' },
    { id: 'sens', libelle: 'Tourner à l’envers', aide: 'le compresseur change de sens de rotation',
      dessin: '<path d="M80 52 A30 30 0 1 1 52 20"/><path d="M52 20 L66 8 M52 20 L66 34"/>' },
    { id: 'puissance', libelle: 'Changer la puissance', aide: 'faire plus ou moins de froid ou de chaud',
      dessin: '<path d="M20 84 V66 M42 84 V50 M64 84 V34 M86 84 V16"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    inverser: true, sens: false, puissance: false,
    bonneReponse: 'Exact. Inverser le rôle des deux échangeurs est son seul métier : le refoulement change d’échangeur, et l’aspiration aussi. Le compresseur garde son sens, et la puissance ne dépend pas de la vanne.',
    erreurs: {
      inverser: 'C’est justement son métier : la cuvette du tiroir relie l’aspiration à l’un ou à l’autre des deux échangeurs, et le refoulement va à l’autre.',
      sens: 'Un compresseur ne change jamais de sens dans une machine réversible : il aspire d’un côté et refoule de l’autre. Ce qui change, c’est la route du fluide après lui.',
      puissance: 'La vanne n’y est pour rien : elle aiguille le fluide, elle n’en change pas le débit. La puissance vient du compresseur.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Quatre tubes de cuivre</strong>, brasés : le <strong>refoulement</strong> sur le tube seul, l’<strong>aspiration</strong> sur le tube du milieu, et les deux <strong>échangeurs</strong> sur les deux tubes voisins.",
    "<strong>Ne croisez pas les tubes des échangeurs</strong> : la machine ferait du froid quand on lui demande du chaud, et inversement.",
    "<strong>Deux fils à la bobine</strong>, venus de la carte de la machine. La bobine se retire de son tube : on la change sans ouvrir le circuit.",
    "<strong>La chaleur</strong> : au brasage, on protège la vanne (chiffon mouillé ou produit prévu pour cela) et on éloigne la flamme du corps. Le geste : voir CuivRézo."
  ],
  piege: "<strong>La vanne ne bascule que compresseur en marche</strong> : il faut l’écart entre haute et basse pression pour pousser le tiroir. Machine arrêtée, la bobine fait « clic » et rien ne bouge. Et un tiroir <strong>coincé à mi-course</strong> donne deux échangeurs tièdes : la machine ne fait ni froid ni chaud.",

  symboles: [
    { src: 'assets/valv-4vias.svg', alt: "Symbole d’une vanne 4 voies d’inversion de cycle : un corps allongé, un raccord au-dessus et trois raccords en dessous.", legende: "Vanne 4 voies d’inversion de cycle" }
  ],
  titreLecturePlan: 'Le lire sur un schéma d’installation',
  lecturePlan: [
    "Sur un schéma frigorifique, la vanne 4 voies est dessinée <strong>près du compresseur</strong>, entre le compresseur et les deux échangeurs.",
    "<strong>Quatre traits</strong> en partent : le refoulement, l’aspiration, et les deux échangeurs. Suivez-les un par un : le refoulement ne va jamais vers le même échangeur dans les deux modes.",
    "Un schéma ne montre qu’<strong>une seule position</strong>. La légende dit laquelle ; l’autre se déduit en croisant les deux échangeurs.",
    "La <strong>bobine</strong> se cherche sur le schéma électrique : c’est une sortie de la carte, commandée par le mode. Repère courant : <strong>V4V</strong>."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qui change, ce qui ne change pas',

  quiz: [
    { question: "Que change la vanne 4 voies quand on passe du froid au chaud ?",
      confirmation: "Le rôle des deux échangeurs : celui du dehors et celui du dedans échangent leur métier.",
      reponses: [
        { texte: "Le rôle des deux échangeurs.", juste: true },
        { texte: "Le sens de rotation du compresseur.", pourquoi: "Un compresseur ne change jamais de sens : il aspire d’un côté et refoule de l’autre. C’est la route du fluide qui change." },
        { texte: "La puissance de la machine.", pourquoi: "La puissance dépend du compresseur, pas de la vanne. La vanne ne fait qu’aiguiller le fluide." },
        { texte: "Le fluide frigorigène.", pourquoi: "C’est toujours le même fluide, dans le même circuit : seule sa route change." } ] },

    { question: "Où se raccorde l’aspiration du compresseur sur la vanne ?",
      confirmation: "Sur le tube du milieu, parmi les trois côte à côte : il ne change jamais.",
      reponses: [
        { texte: "Sur le tube tout seul, de l’autre côté.", pourquoi: "Le tube seul reçoit le refoulement du compresseur, en haute pression. L’aspiration est un retour, en basse pression." },
        { texte: "Sur le tube du milieu des trois.", juste: true },
        { texte: "Sur l’échangeur extérieur.", pourquoi: "L’échangeur extérieur change de tube selon le mode. L’aspiration, elle, ne change jamais de tube." },
        { texte: "Sur la bobine.", pourquoi: "La bobine est un organe électrique : aucun fluide n’y passe." } ] },

    { question: "Qu’est-ce qui pousse le tiroir d’un côté à l’autre ?",
      confirmation: "La différence de pression : la haute pression pousse le tiroir vers le bout qui est à basse pression.",
      reponses: [
        { texte: "La bobine, qui tire directement le tiroir.", pourquoi: "La bobine est trop petite pour déplacer le tiroir : elle commande seulement la vanne pilote, qui vide un bout vers l’aspiration." },
        { texte: "Un petit moteur dans la vanne.", pourquoi: "Il n’y a pas de moteur. La bobine ne tire que le petit noyau de la vanne pilote." },
        { texte: "La différence entre la haute et la basse pression.", juste: true },
        { texte: "La température de l’air extérieur.", pourquoi: "Elle décide quand on change de mode, mais ce qui pousse le tiroir, c’est la pression que crée le compresseur." } ] },

    { question: "Machine arrêtée, on alimente la bobine pour passer en chaud. La vanne bascule-t-elle ?",
      confirmation: "Non : sans compresseur en marche, il n’y a pas de différence de pression pour pousser le tiroir.",
      reponses: [
        { texte: "Oui, la bobine suffit.", pourquoi: "La bobine ne fait que commander la pilote. Sans différence de pression, le tiroir reste où il est : on entend un clic, rien de plus." },
        { texte: "Oui, mais plus lentement.", pourquoi: "Il ne bouge pas du tout : aucune force ne le pousse." },
        { texte: "Seulement si l’air extérieur est froid.", pourquoi: "La température de l’air n’y change rien. Il faut que le compresseur tourne." },
        { texte: "Non, il faut le compresseur en marche.", juste: true } ] },

    { question: "Après la bascule, les deux échangeurs restent tièdes et la machine ne fait ni froid ni chaud. Que soupçonnez-vous ?",
      confirmation: "Un tiroir coincé à mi-course : aucun des deux trajets n’est établi.",
      reponses: [
        { texte: "Un tiroir coincé à mi-course.", juste: true },
        { texte: "Un filtre à air encrassé.", pourquoi: "Un filtre encrassé abîme le rendement, mais il ne bloque pas la vanne : le symptôme n’est pas le même." },
        { texte: "Une bobine en panne.", pourquoi: "Avec une bobine en panne, la vanne reste dans un seul mode : la machine fait toujours du froid, ou toujours du chaud, mais elle le fait." },
        { texte: "Un détendeur déréglé.", pourquoi: "Un détendeur déréglé change les pressions, mais la vanne bascule bien : un échangeur reste chaud et l’autre froid." } ] },

    { question: "Pourquoi protège-t-on la vanne 4 voies quand on brase près d’elle ?",
      confirmation: "Parce que le tiroir, à l’intérieur du corps, ne supporte pas la chaleur de la flamme.",
      reponses: [
        { texte: "Parce que le cuivre du corps fondrait.", pourquoi: "Le cuivre du corps résiste comme celui d’un tube. C’est l’intérieur qui craint." },
        { texte: "Parce que le tiroir ne supporte pas la chaleur.", juste: true },
        { texte: "Parce que la bobine brûlerait.", pourquoi: "La bobine se retire d’un geste, et ce n’est pas elle la pièce fragile : c’est le tiroir, caché dans le corps." },
        { texte: "Parce que le fluide risquerait de s’enflammer.", pourquoi: "Le circuit est vidé de son fluide avant de braser : le risque, c’est le tiroir, pas le fluide." } ] }
  ],

  retenir: [
    "<strong>La vanne change la route du fluide, pas le compresseur</strong> : les deux échangeurs échangent leur rôle, le compresseur garde son sens.",
    "<strong>Refoulement sur le tube seul, aspiration sur le tube du milieu</strong> : toujours.",
    "<strong>Un tiroir poussé par la pression</strong>, déclenché par une petite vanne pilote à bobine : pas de compresseur en marche, pas de bascule.",
    "<strong>Tiroir coincé : deux échangeurs tièdes. Bobine en panne : un seul mode.</strong> Et on protège la vanne de la flamme."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre ce que fait la vanne 4 voies — changer le rôle des deux échangeurs sans toucher au sens du compresseur —, voir comment le tiroir glisse, et savoir ce qu’on risque au raccordement et au dépannage.</p><p><strong>Limite.</strong> Le dégivrage, le détendeur et les modes de la télécommande sont des stations à part. Aucune valeur de pression ni de tension n’est donnée ici : elles viennent de la notice de l’appareil.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Scène du temps 2', source: 'dessin inerWeb', detail: 'dessinée pour cette station, d’après le fonctionnement décrit dans les cours cités dans SOURCES.md' },
    { quoi: 'Symbole', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.1 Le circuit, organe par organe", url: lien('2.1') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.2 Pression et température", url: lien('2.2') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.5 Détendre", url: lien('2.5') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.7 Le dégivrage par inversion de cycle", url: lien('2.7') },
    { ligne: 5, couleur: '#B06A00', texte: "5.1 Les modes et la télécommande", url: lien('5.1') } ]
});

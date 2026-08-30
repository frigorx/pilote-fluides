/* ÉlectroRézo 5.9 — Lire un schéma : puissance et commande. */

ModeleAppareil.construire({
  id: '5.9', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 9',
  titre: "Lire un schéma : puissance et commande",
  narration: NARRATION,

  prerequis: [
    { id: '5.2', quoi: "le contacteur" },
    { id: '5.3', quoi: "l’auto-maintien" },
    { id: '5.7', quoi: "les boutons" },
  ],

  photos: [
    { src: 'assets/biblio/puissance-et-commande.jpeg',
      alt: "Deux schémas d’un démarrage direct : à gauche le schéma de puissance avec Q1, Q2, KM1 et le moteur M1 ; en dessous le schéma de commande avec S1, S2, le contact KM1 13-14 et la bobine KM1.",
      titre: "Le vrai document.", sous: "Un démarrage direct, tel qu’on le trouve dans un dossier." },
    { src: 'assets/biblio/platine-demarrage-direct.jpeg',
      alt: "Plan d’implantation d’une platine de démarrage direct : l’appareillage sur la grille, le bornier en bas, et sur la porte l’arrêt d’urgence S1, les boutons S2 et S3 et les voyants H1, H2, H3.",
      titre: "Du dessin à l’armoire.", sous: "Les mêmes repères, posés à leur place réelle." }
  ],
  creditPhoto: 'Documents de cours indexés dans la base inerWeb. Détail dans « Crédits ».',

  aQuoiCaSert: "À lire un dossier électrique en entier. C’est la station de synthèse : tout ce que les lignes 3, 4, 5 et 8 ont installé se retrouve ici, sur un seul schéma qu’on va parcourir du haut vers le bas.",
  ouOnLeTrouve: "Dans tous les dossiers de machine, sur toutes les armoires. Le démarrage direct est le montage le plus répandu au monde.",

  scene: () => SchemasCommande.deuxSchemas(),

  technologie: [
    ["Deux schémas, un appareil", "la bobine de KM1 est sur le schéma de commande, ses contacts de puissance sur le schéma de puissance. C’est le même appareil, coupé en deux par le dessin."],
    ["Le schéma de puissance", "trois fils, épais, verticaux. On descend : sectionnement, protection, contacteur, moteur. L’ordre est presque toujours celui-là."],
    ["Le schéma de commande", "deux fils fins, phase en haut, neutre en bas. On descend : sécurités, ordres, auto-maintien, bobine. La bobine est toujours en bas."],
    ["Les repères", "ils font le lien entre les deux pages. <strong>Q</strong> pour ce qui coupe, <strong>F</strong> pour ce qui protège, <strong>KM</strong> pour un contacteur, <strong>S</strong> pour un ordre, <strong>M</strong> pour le moteur."]
  ],

  variantes: [
    "<strong>Le démarrage direct</strong> — un seul contacteur. Le montage de base, celui de cette station.",
    "<strong>Le démarrage à deux sens</strong> — deux contacteurs verrouillés l’un avec l’autre, pour tourner dans les deux sens.",
    "<strong>Le démarrage étoile-triangle</strong> — trois contacteurs et une temporisation, pour réduire la pointe au démarrage. Il croise la station 6.4.",
    "<strong>Le démarrage électronique</strong> — plus de contacteur du tout : un variateur fait le travail. C’est la ligne 7."
  ],

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'Un schéma n’est pas un appareil. Cochez ce qu’il sait faire, puis validez — la réponse va vous faire sourire, et elle est le résumé de la ligne.',
  aptitudes: {
    puissance: false, distance: false, maintien: false,
    bonneReponse: 'Bien sûr : un schéma ne fait rien. C’est du papier. Mais c’est le seul endroit où l’on peut voir, avant de toucher quoi que ce soit, ce que l’installation va faire. Comprendre un plan avant d’ouvrir une armoire, c’est le geste professionnel que cette ligne cherchait à vous donner.',
    erreurs: {
      puissance: 'Un dessin ne porte aucun ampère.',
      distance: 'Un plan n’obéit à aucune bobine.',
      maintien: 'Un plan ne garde rien — sinon la mémoire de ce que quelqu’un a monté.'
    }
  },

  cablage: [
    "Sur le schéma de puissance, on descend toujours : <strong>sectionnement</strong>, puis <strong>protection</strong>, puis <strong>contacteur</strong>, puis <strong>moteur</strong>.",
    "Sur le schéma de commande, on descend aussi : <strong>sécurités</strong>, puis <strong>ordres</strong>, puis <strong>auto-maintien</strong>, puis <strong>bobine</strong>.",
    "La <strong>bobine est toujours en bas</strong>, juste au-dessus du neutre. Si vous la cherchez, commencez par là.",
    "Chaque fil de l’armoire porte à ses deux bouts un repère qui figure sur le plan. C’est ce qui rend un dépannage possible dix ans plus tard."
  ],
  piege: "Ne cherchez jamais un appareil sur une seule page. Un contacteur est écrit à deux endroits, un relais thermique aussi, un bouton parfois à trois. Si vous ne trouvez pas le second morceau, c’est qu’il faut tourner la page — pas que le plan est faux.",

  symboles: [
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé de la bobine d’un contacteur.", legende: "La bobine — KM1" },
    { src: 'assets/con_simple.svg', alt: "Symbole normalisé d’un contact auxiliaire normalement ouvert.", legende: "Le maintien — 13-14" },
    { src: 'assets/poussoir.svg', alt: "Symbole normalisé d’un bouton-poussoir normalement ouvert.", legende: "La marche — S1" },
    { src: 'assets/poussoir_nf.svg', alt: "Symbole normalisé d’un bouton-poussoir normalement fermé.", legende: "L’arrêt — S2" }
  ],
  lecturePlan: [
    "Voici la méthode, en trois gestes, et elle marche sur n’importe quel dossier.",
    "<strong>Un</strong> — trouvez le moteur, tout en bas de la puissance. C’est le terminus : tout converge vers lui.",
    "<strong>Deux</strong> — remontez, et nommez chaque appareil que vous croisez. Vous savez tous les lire : ils sont dans les lignes 3, 4 et 5.",
    "<strong>Trois</strong> — passez à la commande, et cherchez la bobine, en bas. Puis remontez le chemin qui l’alimente : vous y trouverez l’auto-maintien, l’arrêt, la marche, les sécurités.",
    "En trois gestes, vous avez lu un dossier que vous n’aviez jamais vu. Ce n’est pas de la mémoire : c’est de la lecture."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Sur un schéma de commande, où trouve-t-on la bobine ?",
      confirmation: "Toujours en bas, juste avant le neutre.",
      reponses: [
        { texte: "En haut, juste après la phase.", pourquoi: "En haut se trouvent les sécurités : la bobine est le dernier élément de la descente." },
        { texte: "En bas, juste avant le neutre.", juste: true },
        { texte: "Cela dépend du dessinateur.", pourquoi: "C’est une convention constante : la bobine termine la descente." },
        { texte: "Au milieu, entre les boutons.", pourquoi: "Les boutons sont au-dessus d’elle, jamais autour." } ] },

    { question: "Le repère Q1 apparaît sur le schéma de puissance. Que désigne-t-il ?",
      confirmation: "Q désigne ce qui coupe la puissance : sectionneur, disjoncteur, interrupteur de tête.",
      reponses: [
        { texte: "Un relais.", pourquoi: "Un relais porte KA." },
        { texte: "Un bouton de commande.", pourquoi: "Un organe de commande manuelle porte S." },
        { texte: "Un appareil de coupure ou de sectionnement.", juste: true },
        { texte: "Un contacteur.", pourquoi: "Un contacteur porte KM." } ] },

    { question: "Vous ne trouvez pas les contacts de KM1 sur la page de commande. Pourquoi ?",
      confirmation: "Les contacts de puissance sont sur l’autre page. Le repère fait le lien.",
      reponses: [
        { texte: "Parce que ce contacteur n’en a pas.", pourquoi: "Tout contacteur a des contacts de puissance : c’est sa raison d’être." },
        { texte: "Parce qu’ils sont dessinés en pointillé.", pourquoi: "Le pointillé relie, il ne remplace pas le dessin d’un contact." },
        { texte: "Parce que le plan est incomplet.", pourquoi: "C’est le montage normal : un appareil est écrit à plusieurs endroits." },
        { texte: "Parce qu’ils sont sur le schéma de puissance.", juste: true } ] },

    { question: "Quel est le premier geste pour lire un dossier inconnu ?",
      confirmation: "Trouver le moteur, en bas de la puissance : tout converge vers lui.",
      reponses: [
        { texte: "Trouver le moteur, en bas de la puissance.", juste: true },
        { texte: "Chercher les repères de bornes.", pourquoi: "Ils servent au câblage, pas à comprendre l’architecture." },
        { texte: "Lire la nomenclature en première page.", pourquoi: "Utile ensuite, mais elle ne montre pas comment le circuit est bâti." },
        { texte: "Compter les contacteurs.", pourquoi: "Leur nombre ne dit pas ce qu’ils font ni dans quel ordre." } ] }
  ],

  retenir: [
    "<strong>Deux schémas, un appareil.</strong> Le repère fait le lien.",
    "<strong>On descend toujours</strong> : sectionner, protéger, commander, faire tourner.",
    "<strong>La bobine est en bas.</strong> Commencez par là.",
    "<strong>Lire un plan</strong>, ce n’est pas le connaître par cœur : c’est le parcourir dans le bon ordre."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire un dossier de démarrage direct en entier, retrouver un appareil sur deux pages, et parcourir chaque schéma dans le bon ordre.</p><p><strong>Limite.</strong> Les schémas développés à folios multiples et les renvois de bornier ne sont qu’évoqués.</p>',

  credits: [
    { quoi: 'Schémas de démarrage direct', source: 'documents de cours indexés dans la base inerWeb',
      detail: '02 Les schémas élèves — Bac MFER' },
    { quoi: 'Photographies et planches', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/' } ],

  correspondances: [
    { ligne: 8, couleur: '#7c3aed', texte: "8.10 Déchiffrer un symbole" },
    { ligne: 3, couleur: '#1b3a63', texte: "3.5 Le sectionneur porte-fusible" },
    { ligne: 4, couleur: '#c0392b', texte: "4.4 Le disjoncteur moteur" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage étoile-triangle" } ]
});

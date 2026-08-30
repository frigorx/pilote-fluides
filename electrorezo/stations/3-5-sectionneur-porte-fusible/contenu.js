/* ÉlectroRézo 3.5 — Le sectionneur porte-fusible. Fin de la ligne 3 :
   elle porte le mini-jeu de synthèse. */

ModeleAppareil.construire({
  id: '3.5', ligne: 3,
  kicker: 'ÉlectroRézo · Ligne 3 Couper et isoler · Station 5 · fin de ligne · ⇄ ligne 4',
  titre: 'Le sectionneur porte-fusible',
  narration: NARRATION,

  prerequis: [
    { id: '3.2', quoi: "le sectionneur" },
    { id: '3.4', quoi: "le porte-fusible" },
  ],

  photos: [
    { src: 'assets/biblio/porte-fusible-mural.jpeg',
      alt: 'Photo d’un porte-fusible modulaire de 32 ampères sous 380 volts, avec son levier basculant noir portant le repère N.',
      titre: 'L’appareil.',
      sous: 'La cartouche est portée par le levier : elle sort du circuit quand on l’abaisse.' },
    { src: 'assets/biblio/appareillages-normalises.jpeg',
      alt: 'Planche de symboles normalisés de l’appareillage d’installation, où figurent notamment le fusible sectionneur et le fusible interrupteur-sectionneur, à côté des fonctions sectionneur, interrupteur et disjoncteur.',
      titre: 'Toute la famille, en symboles.',
      sous: 'Cherchez « fusible sectionneur » : c’est l’assemblage que cette station décrit.' }
  ],
  creditPhoto: 'Photographie : base de connaissances inerWeb, document de cours. Détail dans « Crédits ».',

  aQuoiCaSert: 'Réunir dans un seul boîtier ce que font le sectionneur et le porte-fusible : isoler et se condamner d’un côté, protéger de l’autre. C’est l’appareil de tête d’un très grand nombre d’installations.',
  ouOnLeTrouve: 'En tête d’armoire, en amont d’un départ moteur, partout où il faut à la fois protéger et pouvoir intervenir.',

  scene: () => Schemas.coupeAssemblage(),
  tableauLigne: true,

  technologie: [
    ['Les cartouches sur la partie mobile', 'elles ne sont pas à côté du sectionneur : elles <strong>sont</strong> la partie mobile. Abaisser la poignée, c’est les retirer du circuit.'],
    ['La conséquence heureuse', 'ouvert et cadenassé, l’appareil met les cartouches hors tension. On les change <strong>sans risque</strong>, avec la même poignée qui a servi à isoler.'],
    ['Le défaut hérité', 'il garde celui du sectionneur : <strong>pas de pouvoir de coupure</strong>. Les fusibles n’en donnent aucun à la poignée.'],
    ['La famille voisine', 'l’<em>interrupteur-sectionneur à fusibles</em>, lui, coupe en charge. Ça se lit sur la plaque et sur le symbole. Dans le doute, on n’ouvre pas en charge.']
  ],

  variantes: [
    '<strong>Tripolaire</strong> — le cas courant en départ moteur.',
    '<strong>Tripolaire + neutre</strong> — le neutre sur un pôle sans cartouche.',
    '<strong>À cartouches cylindriques ou à couteaux</strong> — selon le courant à tenir.',
    '<strong>Avec voyant de fusion</strong> — utile, car de l’extérieur on ne voit rien.',
    '<strong>Interrupteur-sectionneur à fusibles</strong> — la variante qui, elle, coupe en charge. À ne pas confondre.'
  ],

  aptitudes: {
    commander: false, couper: false, isoler: true,
    bonneReponse: 'C’est bien cela. Il isole et se condamne — et il protège, ce qui n’était pas dans la question. Mais il ne commande pas, et il ne coupe pas en charge : les fusibles n’y changent rien.',
    erreurs: {
      commander: 'Il ne commande pas : ce n’est pas un appareil de manœuvre quotidienne.',
      couper: '⚠️ Il ne coupe pas en charge. Ajouter des fusibles ne donne aucun pouvoir de coupure à la poignée. Seule la variante « interrupteur-sectionneur à fusibles » le peut.',
      isoler: 'Il isole : distance garantie et trou de cadenas, comme le sectionneur dont il descend.'
    }
  },

  cablage: [
    'Amont côté réseau, aval côté départ. Le sens compte pour l’intervention.',
    'Une cartouche <strong>par phase</strong>. Sur le pôle du neutre, un barreau plein, pas une cartouche.',
    '<strong>Jamais de cartouche sur le conducteur de protection.</strong>',
    'Remplacement <strong>à l’identique</strong> — taille, courant, lettre — et appareil ouvert et condamné.'
  ],
  piege: 'Le raisonnement qui trompe : « il y a des fusibles, donc je peux ouvrir en charge, ils me protégeront ». Faux. Les fusibles protègent contre les surintensités, pas contre l’arc que <em>vous</em> créez en ouvrant.',

  symboles: [
    { src: 'assets/sectionneur_3_fusibles.svg', alt: 'Symbole normalisé d’un sectionneur porte-fusible à trois pôles.', legende: 'Sectionneur porte-fusible, trois pôles' },
    { src: 'assets/sectionneur_fusible_bi.svg', alt: 'Symbole normalisé d’un sectionneur porte-fusible à deux pôles.', legende: 'Deux pôles' }
  ],
  lecturePlan: [
    'Le symbole raconte l’assemblage : le contact du sectionneur, sa <strong>petite barre</strong> d’aptitude au sectionnement, et le <strong>rectangle du fusible</strong> posé dessus.',
    'En un seul dessin : il isole, il se condamne, il protège. C’est le symbole que vous verrez le plus souvent en tête d’un schéma de puissance.'
  ],

  quiz: [
    { question: 'Où sont placées les cartouches dans un sectionneur porte-fusible ?',
      confirmation: 'Elles sont portées par la partie mobile : ouvrir, c’est les retirer du circuit.',
      reponses: [
        { texte: 'À côté du sectionneur, dans un logement séparé.', pourquoi: 'Ce serait deux appareils voisins. Ici, l’astuce est justement qu’ils n’en font qu’un.' },
        { texte: 'Dans la poignée, à l’abri des manipulations.', pourquoi: 'Les cartouches doivent rester accessibles pour être remplacées.' },
        { texte: 'En aval, après le sectionneur, sur le départ.', pourquoi: 'Elles seraient alors sous tension même appareil ouvert — tout l’intérêt disparaîtrait.' },
        { texte: 'Sur la partie mobile : les ouvrir, c’est les mettre hors tension.', juste: true } ] },

    { question: 'Peut-on ouvrir un sectionneur porte-fusible pendant que le moteur tourne ?',
      confirmation: 'Il n’a pas de pouvoir de coupure : les fusibles ne lui en donnent pas.',
      reponses: [
        { texte: 'Non : il n’a pas de pouvoir de coupure.', juste: true },
        { texte: 'Oui, c’est fait pour cela.', pourquoi: 'Non : c’est un sectionneur, avec le défaut du sectionneur.' },
        { texte: 'Oui, les fusibles protègent contre l’arc.', pourquoi: 'Les fusibles protègent contre les surintensités. Ils ne font rien contre l’arc que vous créez en ouvrant.' },
        { texte: 'Oui, à condition d’ouvrir lentement.', pourquoi: 'Ouvrir lentement aggrave l’arc au lieu de l’éviter.' } ] },

    { question: 'Quel est l’avantage de cet assemblage pour l’intervenant ?',
      confirmation: 'Une seule poignée sert à isoler et à mettre les cartouches hors tension.',
      reponses: [
        { texte: 'Il permet de se passer de disjoncteur en aval.', pourquoi: 'Cela dépend de l’installation, et ce n’est pas l’intérêt de l’assemblage.' },
        { texte: 'Il permet de changer les cartouches sans risque, une fois ouvert et condamné.', juste: true },
        { texte: 'Il coupe plus vite qu’un sectionneur seul.', pourquoi: 'La vitesse d’ouverture est celle du sectionneur : inchangée.' },
        { texte: 'Il double la protection contre les court-circuits.', pourquoi: 'La protection n’est pas doublée : il n’y a qu’un jeu de cartouches.' } ] },

    { question: 'Un appareil ressemble au nôtre mais sa plaque annonce un pouvoir de coupure. C’est…',
      confirmation: 'La variante qui coupe en charge — et la plaque est ce qui le dit.',
      reponses: [
        { texte: 'Le même appareil, la mention est décorative.', pourquoi: 'Le pouvoir de coupure est une caractéristique normalisée, jamais décorative.' },
        { texte: 'Un appareil réservé à la haute tension.', pourquoi: 'Rien dans cette mention ne renvoie à la haute tension.' },
        { texte: 'Un interrupteur-sectionneur à fusibles, qui sait couper en charge.', juste: true },
        { texte: 'Une erreur du fabricant.', pourquoi: 'La plaque engage le constructeur : elle ne s’écrit pas au hasard.' } ] }
  ],

  jeu: {
    titre: 'Avant de mettre les mains — le test de la ligne 3',
    regle: 'Cinq situations d’atelier. Pour chacune, choisissez le geste juste en vingt secondes. Deux d’entre elles n’ont pas de bonne manœuvre : le bon geste est alors de refuser ou d’aller chercher autre chose.',
    secondes: 20,
    actions: [
      { id: 'ouvrir', libelle: 'J’ouvre cet appareil' },
      { id: 'couper-avant', libelle: 'Je coupe ailleurs d’abord' },
      { id: 'condamner', libelle: 'J’ouvre, je cadenasse, puis j’interviens' },
      { id: 'refus', libelle: 'Cet appareil ne convient pas ici' } ],
    cas: [
      { enonce: 'Fin de journée. Il faut éteindre une machine qui tourne.',
        fiche: [['Appareil disponible', 'interrupteur-sectionneur'], ['État', 'machine en marche']],
        bonne: 'ouvrir',
        explication: 'L’interrupteur-sectionneur a un pouvoir de coupure : on peut l’ouvrir en charge. C’est son métier.' },
      { enonce: 'Même machine, mais l’appareil du coffret est un sectionneur simple.',
        fiche: [['Appareil disponible', 'sectionneur'], ['État', 'machine en marche']],
        bonne: 'couper-avant',
        explication: 'Un sectionneur ne s’ouvre jamais en charge. On arrête la machine par sa commande, ensuite on ouvre le sectionneur.' },
      { enonce: 'Vous devez remplacer un contacteur dans l’armoire.',
        fiche: [['Appareil en tête', 'sectionneur porte-fusible'], ['État', 'installation à l’arrêt']],
        bonne: 'condamner',
        explication: 'Ouvrir, poser le cadenas, garder la clé, accrocher le macaron. Alors seulement on intervient.' },
      { enonce: 'Un collègue vous dit : « retire juste les fusibles, ça suffira pour travailler ».',
        fiche: [['Appareil', 'porte-fusible seul'], ['État', 'sous tension']],
        bonne: 'refus',
        explication: 'Retirer des cartouches n’est pas un sectionnement : ni distance garantie, ni condamnation. Et le geste sous tension est dangereux.' },
      { enonce: 'Il faut poser un appareil de coupure sur une nouvelle machine, à portée de l’opérateur.',
        fiche: [['Proposé', 'un interrupteur simple'], ['Besoin', 'arrêter ET intervenir']],
        bonne: 'refus',
        explication: 'Un interrupteur ne se condamne pas. Il faut un interrupteur-sectionneur : le seul qui coupe en charge et isole.' } ],
    reussite: 'Cinq sur cinq. Vous avez surtout su refuser deux fois — c’est ce que cette ligne cherchait à vous apprendre.',
    echec: 'On recommence. Regardez les deux situations où la bonne réponse n’était pas de manœuvrer.'
  },

  objectifs: '<p><strong>Objectif.</strong> Comprendre l’assemblage sectionneur + fusibles, savoir qu’il isole et protège mais ne coupe pas en charge, et reconnaître la variante qui, elle, le peut.</p><p><strong>Fin de la ligne 3.</strong> Le test rassemble les cinq stations : couper n’est pas commander, et commander n’est pas isoler.</p>',

  credits: [
    { quoi: 'Photo « consignation »', source: 'base de connaissances inerWeb',
      detail: 'document de cours indexé — recherche « sectionneur porte-fusible tripolaire »' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: '200_fuses_protective_gears/10_fuses/' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: '4.1 Le fusible gG' },
    { ligne: 4, couleur: '#c0392b', texte: '4.2 Le fusible aM' },
    { ligne: 3, couleur: '#5b4bd6', texte: '3.2 Le sectionneur' } ]
});

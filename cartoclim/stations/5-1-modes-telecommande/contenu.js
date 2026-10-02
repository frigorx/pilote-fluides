/* CartoClim 5.1 — Les modes et la télécommande. Écrite le 02/10/2026 sur le moule de la station étalon 3.2.
   Station-objet : l'objet est la télécommande. Elle est aussi la dernière gare de la ligne 4 : la mise en
   service finit par le premier démarrage. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '5.1', ligne: 5,
  kicker: 'CartoClim · Ligne 5 Exploiter · Station 1',
  titre: "Les modes et la télécommande : froid, chaud, déshumidification, ventilation",
  narration: NARRATION,

  prerequis: [
    { id: '3.2', quoi: "le split : deux unités, un circuit" },
    { id: '2.6', quoi: "la vanne 4 voies : froid ou chaud" }
  ],

  photos: [
    { src: 'assets/biblio/c80013e97b.jpeg',
      alt: "Une main tient une télécommande pointée vers une unité intérieure murale blanche, dans une pièce avec un rideau.",
      titre: "On la pointe vers l’unité intérieure.", sous: "Elle envoie ses ordres en infrarouge, comme celle d’un téléviseur : un obstacle sur le trajet, et l’ordre ne passe pas." },
    { src: 'assets/biblio/898384a2af.png',
      alt: "Un climatiseur split blanc : l’unité extérieure, l’unité intérieure murale, et la télécommande posée devant.",
      titre: "Trois pièces, un seul ordre.", sous: "La télécommande ne touche à rien : elle parle à l’unité intérieure, qui commande le reste." }
  ],

  aQuoiCaSert: "À <strong>dire à la machine ce qu’on veut</strong> : quel mode, quelle température, quelle vitesse de turbine. La télécommande ne règle rien dans le circuit : elle envoie un ordre à la <strong>carte</strong> de l’unité intérieure, et c’est la carte qui met en marche le compresseur, la turbine et la vanne 4 voies. Cinq modes : <strong>froid</strong> (le flocon), <strong>chaud</strong> (le soleil), <strong>déshumidification</strong> (la goutte), <strong>ventilation</strong> (le ventilateur) et <strong>automatique</strong> (A).",
  ouOnLeTrouve: "Avec tous les splits : c’est ce que le client a en main tous les jours. C’est aussi le <strong>dernier geste de la mise en service</strong> : avant de laisser l’appareil, le technicien essaie chaque mode, écoute la machine et regarde l’eau sortir.",

  scene: () => ScenesStation.lesModes(),

  titreDedans: 'Ce que fait chaque touche',
  technologie: [
    ["La télécommande", "un petit boîtier à piles : des touches, un écran qui répète le mode choisi, et au bout un <strong>émetteur infrarouge</strong>. À chaque appui, elle envoie un ordre à l’unité intérieure. Elle ne touche à aucune pièce de la machine."],
    ["Les cinq modes", "<strong>Froid</strong> (flocon) · <strong>chaud</strong> (soleil) · <strong>déshumidification</strong> (goutte) : du froid à petite vitesse, pour faire condenser l’eau de l’air sans trop refroidir la pièce · <strong>ventilation</strong> (ventilateur) : la turbine seule, compresseur arrêté · <strong>automatique</strong> (A) : la carte choisit entre froid et chaud."],
    ["La consigne et la sonde", "la <strong>consigne</strong> est la température qu’on demande. La machine ne la « sent » pas : elle la compare à ce que lit une <strong>sonde de température</strong>, placée à la <strong>reprise d’air</strong> de l’unité intérieure, là où l’air de la pièce entre. Sur certains modèles, c’est la télécommande qui porte la sonde. Quand la sonde atteint la consigne, la machine s’arrête, ou ralentit si elle est Inverter."],
    ["Les autres touches", "la <strong>vitesse de la turbine</strong>, les <strong>volets</strong> qui orientent le souffle, la <strong>minuterie</strong> qui met en marche ou arrête à l’heure choisie, le <strong>mode nuit</strong>. Elles règlent le confort, pas le mode. Leur nom et leur détail changent d’un constructeur à l’autre : la notice fait foi."]
  ],

  variantes: [
    "<strong>Télécommande à sonde</strong> — sur certains modèles, la télécommande mesure elle-même la température là où on la pose. La consigne se rapporte alors à cet endroit, pas à la reprise d’air. La notice dit si c’est le cas.",
    "<strong>Froid seul ou réversible</strong> — un appareil à froid seul n’a pas de mode chaud, donc pas de vanne 4 voies. Le soleil n’existe que sur un réversible : station 2.6.",
    "<strong>Inverter ou tout-ou-rien</strong> — les modes sont les mêmes ; ce qui change, c’est la façon d’atteindre la consigne : ralentir ou s’arrêter. Station 2.4.",
    "<strong>Multisplit</strong> — chaque unité intérieure a sa propre télécommande et sa propre consigne. Station 3.4.",
    "<strong>Le régulateur électronique</strong> — sur d’autres machines, c’est un régulateur câblé qui porte la consigne et lit la sonde : station 5.2."
  ],
  reglage: "Trois gestes : choisir le <strong>mode</strong>, fixer la <strong>consigne</strong>, régler la <strong>vitesse de la turbine</strong>. Pour la lecture d’une sonde et le réglage d’une consigne sur un régulateur, voyez la station 5.2. Pour ce que la carte affiche quand elle détecte un défaut, la station 5.6.",

  consigneAptitudes: 'Une télécommande de split ordinaire, sans sonde dans la télécommande : cochez ce qu’elle sait faire, puis validez.',
  titreAptitudes: 'Que sait faire la télécommande ?',
  colonnes: [
    { id: 'consigne', libelle: 'Régler la consigne', aide: 'dire à la machine la température qu’on veut atteindre', dessin: ScenesStation.icones.consigne },
    { id: 'lit',      libelle: 'Mesurer au lit',     aide: 'connaître la température de l’air à l’endroit où l’on dort ou travaille', dessin: ScenesStation.icones.lit },
    { id: 'neuf',     libelle: 'Faire entrer l’air neuf', aide: 'amener de l’air venu de dehors dans la pièce', dessin: ScenesStation.icones.neuf }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    consigne: true, lit: false, neuf: false,
    bonneReponse: 'Exact. La télécommande règle la consigne, le mode et la vitesse. Elle ne mesure rien là où vous dormez : la machine lit sa sonde, à la reprise d’air. Et elle ne fait entrer aucun air neuf : elle commande un appareil qui brasse l’air de la pièce.',
    erreurs: {
      consigne: 'C’est son rôle : elle dit à la carte la température demandée. La carte la compare ensuite à ce que lit la sonde.',
      lit: 'Une télécommande ordinaire n’a pas de sonde : la machine mesure l’air qui entre dans l’unité intérieure, souvent en hauteur. Seuls certains modèles ont une sonde dans la télécommande : alors elle mesure là où on la pose. La notice le précise.',
      neuf: 'Aucun mode ne fait entrer d’air du dehors, pas même la ventilation : la turbine brasse l’air de la pièce. L’air neuf, c’est le travail d’une ventilation.'
    }
  },

  titreCablage: 'Le premier démarrage',
  cablage: [
    "<strong>Les piles d’abord</strong>, puis la télécommande pointée vers l’unité intérieure, sans obstacle sur le trajet.",
    "<strong>Chaque mode, l’un après l’autre</strong> : flocon, soleil, goutte, ventilateur. À chaque touche l’unité répond, puis la turbine démarre. Le compresseur peut mettre un temps à suivre : une attente de protection est normale.",
    "<strong>On écoute</strong> : la turbine ne doit ni frotter ni vibrer, l’unité extérieure doit démarrer sans bruit anormal.",
    "<strong>On contrôle le sens</strong> : en froid l’air soufflé est frais, en chaud il est chaud. Si c’est l’inverse, il y a un défaut du côté de la vanne 4 voies (station 2.6).",
    "<strong>On regarde l’eau sortir</strong> : en froid ou en déshumidification, l’eau doit couler au bout du tuyau de condensats, dehors. C’est le contrôle de la pente : station 4.4.",
    "<strong>On montre au client</strong> les touches de mode, surtout la différence entre le flocon et le soleil."
  ],
  piege: "<strong>La déshumidification n’est pas le froid</strong> : c’est du froid à petite vitesse, qui sèche l’air sans trop le refroidir. Le client confond aussi le <strong>flocon</strong> et le <strong>soleil</strong> : l’été, le soleil chauffe la pièce. Et une <strong>consigne très basse ne refroidit pas plus vite</strong> : tant que l’écart est grand, la machine donne déjà sa puissance ; demander plus froid la fait seulement travailler plus longtemps. Enfin, une télécommande qui n’émet plus : les <strong>piles</strong> d’abord, puis l’<strong>émetteur</strong>.",

  symboles: [
    { src: 'assets/mando-infrarrojos.svg', alt: "Symbole d’une télécommande infrarouge : un boîtier allongé avec son écran, ses touches et son émetteur.", legende: "Télécommande infrarouge" },
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure murale : celle qui reçoit les ordres" }
  ],
  titreLecturePlan: 'Le lire sur un plan',
  lecturePlan: [
    "Sur un schéma d’installation, la <strong>télécommande</strong> est dessinée près de l’<strong>unité intérieure</strong> qu’elle commande, sans aucun fil : elle parle en infrarouge.",
    "Elle <strong>ne se câble pas</strong> et n’a pas de tube : le schéma n’a rien à coter pour elle. Ce qu’il faut y lire, c’est <strong>quelle unité elle commande</strong>, surtout sur un multisplit.",
    "Dans la notice, cherchez si la télécommande est <strong>à sonde</strong> ou non : cela décide de l’endroit où la température est mesurée."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce que lit la machine, et les cinq modes',

  quiz: [
    { question: "Quelle touche choisir pour chauffer la pièce ?",
      confirmation: "Le soleil : la vanne 4 voies inverse le sens du fluide, la batterie intérieure devient chaude.",
      reponses: [
        { texte: "Le flocon.", pourquoi: "Le flocon, c’est le froid : en plein hiver, il refroidit encore la pièce. C’est la confusion la plus fréquente chez les clients." },
        { texte: "Le soleil.", juste: true },
        { texte: "La goutte.", pourquoi: "La goutte est la déshumidification : du froid à petite vitesse pour sécher l’air, pas pour chauffer." },
        { texte: "Le ventilateur.", pourquoi: "Le ventilateur ne fait que brasser l’air : le compresseur est arrêté, rien ne chauffe ni ne refroidit." } ] },

    { question: "Que fait la machine en mode déshumidification ?",
      confirmation: "Du froid à petite vitesse : l’air laisse son eau sur la batterie sans que la pièce se refroidisse beaucoup.",
      reponses: [
        { texte: "Elle chauffe l’air pour le sécher.", pourquoi: "C’est un froid qui sèche : l’eau se dépose sur la batterie froide, comme sur une bouteille sortie du frigo. Aucune chaleur n’est ajoutée." },
        { texte: "Elle arrête le compresseur et ne garde que la turbine.", pourquoi: "C’est la ventilation. Sans compresseur, la batterie n’est pas froide, et aucune eau ne se dépose." },
        { texte: "Du froid à petite vitesse.", juste: true },
        { texte: "Elle aspire l’humidité de dehors.", pourquoi: "Aucun air ne vient de dehors : c’est l’eau de l’air de la pièce qui se dépose sur la batterie." } ] },

    { question: "Pour refroidir plus vite, un client règle la consigne très bas. Que se passe-t-il ?",
      confirmation: "Rien de plus vite : tant que l’écart est grand, la machine donne déjà sa puissance. Elle travaille seulement plus longtemps.",
      reponses: [
        { texte: "La machine passe en déshumidification.", pourquoi: "Le mode ne change pas parce qu’on touche à la consigne : on le choisit avec les touches de mode." },
        { texte: "La pièce refroidit plus vite.", pourquoi: "La machine donne déjà sa puissance tant que la sonde est loin de la consigne : demander plus froid ne la fait pas aller plus fort." },
        { texte: "L’air soufflé est plus froid.", pourquoi: "La consigne dit où la machine s’arrête, pas la température de l’air qu’elle souffle." },
        { texte: "Rien de plus vite : elle travaille plus longtemps.", juste: true } ] },

    { question: "Où l’appareil mesure-t-il la température de la pièce ?",
      confirmation: "À la reprise d’air de l’unité intérieure ; sur certains modèles, dans la télécommande.",
      reponses: [
        { texte: "À la reprise d’air de l’unité intérieure.", juste: true },
        { texte: "Dans l’unité extérieure, dehors.", pourquoi: "Dehors, ce n’est pas la pièce : la consigne se compare à l’air de la pièce, pas à celui de la façade." },
        { texte: "Dans le tuyau de condensats.", pourquoi: "Ce tuyau évacue l’eau, il ne mesure rien." },
        { texte: "Au niveau du lit ou du bureau.", pourquoi: "La machine ne sait pas où vous êtes : sa sonde est dans l’unité, souvent en hauteur. Sauf si la télécommande porte la sonde." } ] },

    { question: "La télécommande ne fait plus rien. Que vérifiez-vous en premier ?",
      confirmation: "Les piles, puis l’émetteur : tant que l’ordre ne part pas, la machine ne peut pas y répondre.",
      reponses: [
        { texte: "La charge en fluide.", pourquoi: "Un manque de fluide se voit au manque de froid, pas à une télécommande muette. Ici l’ordre n’arrive même pas." },
        { texte: "Les piles, puis l’émetteur.", juste: true },
        { texte: "La vanne 4 voies.", pourquoi: "La vanne n’agit qu’après que la carte a reçu l’ordre : si la carte ne reçoit rien, le défaut est avant." },
        { texte: "Le tuyau de condensats.", pourquoi: "Il évacue l’eau ; il n’a aucun rapport avec la réception des ordres." } ] },

    { question: "Que fait le mode ventilation ?",
      confirmation: "La turbine brasse l’air de la pièce, compresseur arrêté : ni froid, ni chaud, ni air neuf.",
      reponses: [
        { texte: "Elle fait entrer de l’air neuf de dehors.", pourquoi: "Aucun mode ne le fait : l’unité extérieure ne communique avec la pièce que par les tubes de fluide." },
        { texte: "Elle refroidit un peu l’air, sans compresseur.", pourquoi: "Sans compresseur, la batterie n’est pas froide : la température de la pièce ne bouge pas." },
        { texte: "La turbine seule brasse l’air de la pièce.", juste: true },
        { texte: "Elle sèche l’air.", pourquoi: "Sécher l’air demande une batterie froide : c’est la goutte, pas le ventilateur." } ] }
  ],

  retenir: [
    "<strong>La télécommande envoie un ordre</strong> : c’est la carte de l’unité intérieure qui commande le compresseur, la turbine et la vanne 4 voies.",
    "<strong>Flocon = froid, soleil = chaud.</strong> La goutte sèche l’air à petite vitesse ; le ventilateur brasse sans froid ni chaud.",
    "<strong>La machine lit sa sonde, pas votre lit</strong> : la consigne se compare à l’air qui entre dans l’unité intérieure.",
    "<strong>Une consigne très basse ne refroidit pas plus vite.</strong>",
    "<strong>Aucun mode ne renouvelle l’air.</strong>"
  ],

  objectifs: '<p><strong>Objectif.</strong> Nommer les cinq modes et dire ce qui tourne dans la machine pour chacun, savoir ce que la machine mesure vraiment, et mener un premier démarrage.</p><p><strong>Limite.</strong> Le nom des touches, les vitesses et le détail du mode nuit changent d’un constructeur à l’autre : la notice fait foi. Aucune valeur de température ni de durée n’est donnée ici. Le régulateur électronique, la lecture des codes défauts et l’entretien sont des stations à part.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' },
    { quoi: 'Pictogrammes des touches et dessins des scènes', source: 'dessins originaux inerWeb', detail: 'flocon, soleil, goutte, ventilateur, A : pictogrammes de touches, pas des symboles de la bibliothèque' } ],

  correspondances: [
    { ligne: 1, couleur: '#C9451A', texte: "1.4 Point de rosée et air humide", url: lien('1.4') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.6 La vanne 4 voies : froid ou chaud", url: lien('2.6') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.4 Les condensats : pente, siphon, pompe", url: lien('4.4') },
    { ligne: 5, couleur: '#B06A00', texte: "5.2 Le régulateur électronique", url: lien('5.2') },
    { ligne: 5, couleur: '#B06A00', texte: "5.6 Les codes défauts", url: lien('5.6') } ]
});

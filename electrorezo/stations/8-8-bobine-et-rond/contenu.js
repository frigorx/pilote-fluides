/* ÉlectroRézo 8.8 — La bobine et le rond. */

ModeleSigne.construire({
  id: '8.8',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 8',
  titre: "La bobine et le rond",
  lettre: 'bobine',
  narration: NARRATION,

  prerequis: [
    { id: '5.2', quoi: "la bobine" },
    { id: '6.3', quoi: "le moteur" },
  ],

  ceQuelleDit: "Un rectangle barré : une bobine, ce qui commande. Un rond avec une lettre : une machine, ce qui consomme et travaille. D’un côté ce qui décide, de l’autre ce qui fait.",
  ouOnLaVoit: "La bobine en bas du circuit de commande, le rond en bas du circuit de puissance. Les deux schémas ont la même architecture.",

  pourquoiCetteForme: [
    "<strong>Le rectangle barré représente un bobinage</strong> : du fil enroulé. Ici, la bobine n’est pas une sécurité, c’est une commande : on l’alimente, elle attire, des contacts bougent.",
    "<strong>Le rond ne dit rien de ce qu’il y a dedans</strong>, et c’est volontaire. Un moteur est compliqué ; le schéma s’en moque. Ce qui l’intéresse : il consomme, et combien de fils l’alimentent.",
    "<strong>On compte les traits qui arrivent</strong> : trois traits, trois fils, machine triphasée.",
    "<strong>La lettre dans le rond dit la famille</strong> : M pour un moteur, G pour un générateur. Les mêmes dans toute l’Europe."
  ],

  motsOuOnLaTrouve: ['contacteur', 'moteur', 'fusible'],
  motVedette: 'contacteur',

  symbolesBiblio: [
    { src: 'assets/moteur_tri.svg', alt: "Symbole normalisé d’un moteur triphasé.", legende: "Un moteur triphasé" }
  ],
  duDessinAuPlan: [
    "Le rond du moteur est <strong>le terminus du circuit de puissance</strong> : tout converge vers lui.",
    "La bobine est <strong>le terminus du circuit de commande</strong>.",
    "<strong>Les deux schémas se lisent de la même façon</strong> : on descend depuis la phase jusqu’à ce qui travaille."
  ],

  quiz: [
    { question: "Que dit le rond avec un M à l’intérieur ?",
      confirmation: "Une machine, et la lettre dit laquelle.",
      reponses: [
        { texte: "Un moteur.", juste: true },
        { texte: "Une borne principale.", pourquoi: "Une borne se dessine par un petit cercle vide, sans lettre." },
        { texte: "Un module de commande.", pourquoi: "Les modules et automates ont d’autres représentations, rectangulaires." },
        { texte: "Une mesure.", pourquoi: "Un appareil de mesure porte A, V ou W, jamais M." } ] },

    { question: "Comment sait-on qu’un moteur est triphasé sur un schéma ?",
      confirmation: "On compte les traits qui arrivent : trois.",
      reponses: [
        { texte: "Le rond est dessiné plus gros.", pourquoi: "La taille d’un symbole ne code jamais d’information." },
        { texte: "Aux trois traits d’alimentation qui arrivent.", juste: true },
        { texte: "C’est écrit à l’intérieur du rond.", pourquoi: "À l’intérieur, il n’y a que la lettre de famille." },
        { texte: "Au repère, qui commence par M3.", pourquoi: "Le repère commence par M, sans indiquer le nombre de phases." } ] },

    { question: "Pourquoi le schéma ne dessine-t-il pas l’intérieur du moteur ?",
      confirmation: "Ce n’est pas ce qu’un schéma sert à dire.",
      reponses: [
        { texte: "Parce que ce serait trop long à dessiner.", pourquoi: "La difficulté du tracé n’a jamais dicté une norme." },
        { texte: "Parce que tous les moteurs sont identiques à l’intérieur.", pourquoi: "Ils ne le sont pas du tout : asynchrone, synchrone, à courant continu." },
        { texte: "Parce que le schéma dit comment c’est branché, pas comment c’est fait.", juste: true },
        { texte: "Parce que c’est un secret des constructeurs.", pourquoi: "Les constructeurs publient au contraire des coupes détaillées." } ] },

    { question: "Où trouve-t-on la bobine d’un contacteur sur un dossier ?",
      confirmation: "Dans le circuit de commande.",
      reponses: [
        { texte: "Nulle part : elle n’est pas représentée.", pourquoi: "Elle l’est toujours : sans elle, on ne saurait pas ce qui pilote les contacts." },
        { texte: "Sur la page de garde.", pourquoi: "La page de garde porte le cartouche et le sommaire, pas de symbole." },
        { texte: "Dans le circuit de puissance, avec les contacts.", pourquoi: "Les contacts y sont, mais pas la bobine : elle est en commande." },
        { texte: "Dans le circuit de commande.", juste: true } ] }
  ],

  retenir: [
    "<strong>Rectangle barré = une bobine</strong>, ce qui commande.",
    "<strong>Rond avec une lettre = une machine</strong>, ce qui travaille.",
    "On compte <strong>les traits qui arrivent</strong> pour connaître le nombre de phases.",
    "Commande et puissance se lisent de la même façon : du haut vers ce qui travaille."
  ],

  objectifs: '<p><strong>Objectif.</strong> Distinguer ce qui commande de ce qui consomme, et lire le nombre de phases d’une machine en comptant ses traits d’alimentation.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/391_consumers_actuators/10_engines/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: "5.2 Le contacteur" },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Moteur asynchrone triphasé" } ]
});

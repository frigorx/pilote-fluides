/* ÉlectroRézo 4.7 — Le relais thermique. */

ModeleAppareil.construire({
  id: '4.7', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 7',
  titre: "Le relais thermique",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/relais-schneider-lr2.png', alt: "Photo d’un relais thermique modulaire noir, avec sa molette de réglage et sa fenêtre de lecture.",
      titre: "La molette, encore.", sous: "Comme le disjoncteur moteur : on le règle sur l’intensité de la plaque." },
    { src: 'assets/biblio/relais-telemecanique-lrd.png', alt: "Photo d’un relais thermique avec ses bornes de raccordement.",
      titre: "Sous le contacteur.", sous: "Il se clipse directement dessous, et suit ses trois phases." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Protéger un moteur contre la <strong>surcharge</strong>, et rien d’autre. Il ne coupe pas la puissance lui-même : il ouvre un contact qui fait retomber le contacteur.",
  ouOnLeTrouve: "Directement sous le contacteur du départ moteur, avec un fusible aM ou un disjoncteur en amont pour le court-circuit.",

  scene: () => SchemasProtection.bilameReglage(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["Trois bilames", "un par phase, traversés par le courant du moteur. Ils se courbent quand ils chauffent."],
    ["Le levier", "les bilames poussent une tige qui bascule le mécanisme."],
    ["Les contacts 95-96 et 97-98", "<strong>95-96 s’ouvre</strong> — il coupe la commande. 97-98 se ferme — il signale le défaut."],
    ["Il ne coupe pas la puissance", "c’est le <strong>contacteur</strong> qui coupe, parce que sa bobine n’est plus alimentée. Le relais ne fait que donner l’ordre."]
  ],

  variantes: [
    "<strong>Classe de déclenchement</strong> : 10A, 10, 20, 30 — le temps qu’il tolère avant de couper au démarrage.",
    "<strong>Réarmement manuel ou automatique</strong> — le manuel oblige quelqu’un à venir voir. Souvent préférable.",
    "<strong>Compensé en température</strong> — pour que la température de l’armoire ne fausse pas le réglage.",
    "<strong>À sondes PTC</strong> — variante moderne : des thermistances noyées dans le bobinage remplacent les bilames."
  ],

  aptitudes: {
    surcharge: true, courtCircuit: false, defautIsolement: false,
    bonneReponse: "La surcharge, et uniquement elle. Le bilame est bien trop lent pour un court-circuit — c’est pour ça qu’il ne travaille jamais sans fusible aM ou disjoncteur en amont.",
    erreurs: {
      surcharge: "Il voit la surcharge : c’est exactement son métier, et il le fait mieux que personne sur un moteur.",
      courtCircuit: "⚠️ Il ne voit PAS le court-circuit. Le bilame n’a pas le temps de se courber : le défaut est fini avant. Il lui faut un fusible aM ou un disjoncteur en amont.",
      defautIsolement: "Il ne voit pas le défaut d’isolement : il ne mesure aucune différence entre l’aller et le retour."
    }
  },

  cablage: [
    "<strong>Entre le contacteur et le moteur</strong>, sur les trois phases.",
    "<strong>95-96 dans le circuit de commande</strong>, en série avec la bobine du contacteur.",
    "97-98 vers le voyant ou l’automate, pour signaler.",
    "Réglage sur <strong>l’intensité de la plaque</strong>, pour le couplage réellement posé."
  ],
  piege: "Croire que le relais coupe le moteur. Il ne coupe rien : il ouvre 95-96, la bobine du contacteur retombe, et c’est le contacteur qui ouvre la puissance. Si le contact 95-96 n’est pas câblé, le relais chauffe, déclenche… et le moteur continue de tourner.",

  symboles: [
    { src: 'assets/relais_therm4.svg', alt: "Symbole normalisé d’un relais thermique tripolaire.", legende: "Trois pôles" },
    { src: 'assets/relais_mono.svg', alt: "Symbole normalisé d’un relais thermique.", legende: "Autre représentation" }
  ],
  lecturePlan: [
    "Le symbole porte <strong>le crochet du thermique</strong>, et rien d’autre. Pas de demi-cercle.",
    "<strong>C’est écrit noir sur blanc</strong> : cet appareil ne protège pas du court-circuit.",
    "Repère <strong>F</strong>. Ses contacts 95-96 apparaissent dans le circuit de commande, souvent une page plus loin — reliés par le repère, ou par le pointillé de la station 8.7."
  ],

  quiz: [
    { question: "Le relais thermique coupe-t-il lui-même la puissance ?",
      confirmation: "Il ouvre 95-96 ; c’est le contacteur qui coupe.",
      reponses: [
        { texte: "Seulement en réarmement automatique.", pourquoi: "Le mode de réarmement ne change rien à qui coupe." },
        { texte: "Oui, avec un léger retard.", pourquoi: "Le retard existe, mais ce n’est pas lui qui ouvre la puissance." },
        { texte: "Non : il ouvre un contact, et le contacteur retombe.", juste: true },
        { texte: "Oui, il ouvre les trois phases.", pourquoi: "Il est traversé par les trois phases, mais il ne les ouvre pas." } ] },

    { question: "Que se passe-t-il si le contact 95-96 n’est pas câblé ?",
      confirmation: "Le relais déclenche dans le vide.",
      reponses: [
        { texte: "Le relais ne chauffe plus.", pourquoi: "Il chauffe exactement pareil : il est toujours traversé par le courant." },
        { texte: "Le moteur est mieux protégé.", pourquoi: "Il n’est plus protégé du tout : personne ne reçoit l’ordre de couper." },
        { texte: "Le contacteur ne colle plus.", pourquoi: "Au contraire : il reste collé, puisque rien n’ouvre son circuit de commande." },
        { texte: "Le relais déclenche, mais le moteur continue de tourner.", juste: true } ] },

    { question: "Pourquoi un relais thermique ne travaille-t-il jamais seul ?",
      confirmation: "Il ne voit pas le court-circuit.",
      reponses: [
        { texte: "Parce qu’il ne voit pas le court-circuit.", juste: true },
        { texte: "Parce qu’il chauffe trop.", pourquoi: "Son échauffement est le principe même de son fonctionnement." },
        { texte: "Parce qu’il n’a pas de contact.", pourquoi: "Il en a : 95-96 et 97-98." },
        { texte: "Parce qu’il n’a pas de pouvoir de coupure.", pourquoi: "C’est vrai, mais la raison de fond est qu’il ne détecte pas le court-circuit." } ] },

    { question: "Sur quoi se règle un relais thermique ?",
      confirmation: "Sur l’intensité de la plaque, pour le couplage posé.",
      reponses: [
        { texte: "Sur le calibre du fusible amont.", pourquoi: "Le fusible protège le circuit, le relais protège le moteur : deux valeurs différentes." },
        { texte: "Sur l’intensité de la plaque du moteur.", juste: true },
        { texte: "Sur la puissance de la machine entraînée.", pourquoi: "Ce n’est pas une donnée du moteur, et elle ne figure pas sur sa plaque." },
        { texte: "Sur la section du câble.", pourquoi: "La section conditionne la protection du câble, pas celle du moteur." } ] }
  ],

  retenir: [
    "<strong>Il ne voit que la surcharge</strong>, et il la voit très bien.",
    "<strong>Il ne coupe rien</strong> : il ouvre 95-96, le contacteur retombe.",
    "<strong>Jamais seul</strong> : fusible aM ou disjoncteur en amont.",
    "Réglé sur l’intensité de la plaque, pour le couplage posé."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre que le relais thermique donne l’ordre sans couper, ce qu’il protège, et pourquoi il lui faut toujours un compagnon en amont.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: "5.2 Le contacteur" },
    { ligne: 4, couleur: '#c0392b', texte: "4.2 Le fusible aM" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.5 Le déclencheur thermique" } ]
});

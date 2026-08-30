/* ÉlectroRézo 4.4 — Le disjoncteur moteur. */

ModeleAppareil.construire({
  id: '4.4', ligne: 4,
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 4',
  titre: "Le disjoncteur moteur",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/disjoncteurs-gv2.jpg', alt: "Schémas techniques de disjoncteurs moteurs magnéto-thermiques, avec leurs plages de réglage.",
      titre: "Les plages de réglage.", sous: "Chaque modèle couvre une plage : on choisit celle où tombe l’intensité du moteur." },
    { src: 'assets/biblio/schema-disjoncteur-moteur.jpeg', alt: "Schéma d’un disjoncteur moteur repéré Q1, avec la numérotation de ses bornes.",
      titre: "Sur le plan.", sous: "Repéré Q1, en tête du départ, juste avant le contacteur." }
  ],
  creditPhoto: 'Photographies : base de connaissances inerWeb, documents de cours. Détail dans « Crédits ».',

  aQuoiCaSert: "Protéger un moteur contre la surcharge <em>et</em> le court-circuit, avec un seul appareil réglable — et qui se condamne.",
  ouOnLeTrouve: "En tête d’un départ moteur, à la place du couple fusible aM + relais thermique. Un appareil au lieu de deux.",

  scene: () => SchemasProtection.deuxDeclencheurs(),
  tableau: (id) => SchemasProtection.tableauDefauts(id),
  tableauTitre: 'Qui voit quel défaut ?',
  colonnes: SchemasProtection.COLONNES,
  consigneAptitudes: 'Trois défauts très différents. Cochez ceux que cet appareil sait voir, puis validez.',

  technologie: [
    ["Les deux déclencheurs", "comme le magnéto-thermique : bilame pour la surcharge, bobine pour le court-circuit."],
    ["La molette de réglage", "c’est ce qui le distingue. On règle le thermique sur <strong>l’intensité lue sur la plaque du moteur</strong>, pas au jugé."],
    ["Le magnétique fixe", "il est calé très haut, autour de treize fois le courant réglé, pour laisser passer la pointe de démarrage."],
    ["L’aptitude au sectionnement", "beaucoup de modèles se cadenassent : ils remplacent aussi le sectionneur du départ."]
  ],

  variantes: [
    "<strong>Plages de réglage</strong> : 0,16–0,25 A, 6–10 A, 17–23 A… on choisit la plage où tombe l’intensité du moteur.",
    "<strong>Avec ou sans contacts auxiliaires</strong> — pour signaler le déclenchement à l’automate.",
    "<strong>Boîtier ou modulaire</strong> — poignée rotative sur le coffret, ou rangée dans le tableau.",
    "<strong>Il remplace le couple aM + relais thermique</strong>, mais il ne remplace pas le contacteur : lui ne commande pas."
  ],

  aptitudes: {
    surcharge: true, courtCircuit: true, defautIsolement: false,
    bonneReponse: "Les deux surintensités, comme le magnéto-thermique — mais avec un réglage. Il ne voit toujours pas le défaut d’isolement : pour cela il faut un différentiel en amont.",
    erreurs: {
      surcharge: "Il voit la surcharge, et c’est même là qu’il est irremplaçable : réglé sur l’intensité de la plaque, il protège ce moteur-là précisément.",
      courtCircuit: "Il voit le court-circuit : sa bobine est calée haut, mais elle est bien là.",
      defautIsolement: "Il ne voit pas le défaut d’isolement. Aucun appareil de cette famille ne le voit : il faut un tore différentiel."
    }
  },

  cablage: [
    "<strong>En tête du départ</strong>, avant le contacteur.",
    "Réglage du thermique sur <strong>l’intensité écrite sur la plaque</strong> du moteur, pour le couplage réellement posé.",
    "Contacts auxiliaires vers l’automate si le déclenchement doit être signalé.",
    "Poignée accessible, trou de cadenas dégagé si l’appareil sert aussi de sectionnement."
  ],
  piege: "Régler au jugé, ou régler au maximum « pour ne pas être embêté ». Le réglage n’est pas un confort : c’est ce qui fait que le moteur est protégé ou non. Et si le moteur est recouplé — étoile au lieu de triangle — l’intensité change : le réglage aussi.",

  symboles: [
    { src: 'assets/dis_mag_term_3f-2.svg', alt: "Symbole normalisé d’un disjoncteur moteur à trois pôles.", legende: "Trois pôles, avec les deux déclencheurs" }
  ],
  lecturePlan: [
    "Le symbole porte <strong>le crochet, le demi-cercle et souvent la barre</strong> du sectionnement : trois signes, trois capacités.",
    "Repère <strong>Q</strong>, en tête du départ.",
    "Le réglage n’apparaît pas sur le symbole : il est écrit à côté, ou dans le carnet."
  ],

  quiz: [
    { question: "Sur quoi règle-t-on le thermique d’un disjoncteur moteur ?",
      confirmation: "Sur l’intensité écrite sur la plaque du moteur.",
      reponses: [
        { texte: "Sur la puissance en kilowatts.", pourquoi: "La puissance figure sur la plaque, mais la molette se règle en ampères." },
        { texte: "Sur la section du câble.", pourquoi: "La section conditionne le calibre d’une protection de circuit, pas le réglage d’une protection de moteur." },
        { texte: "Au maximum, par sécurité.", pourquoi: "Au maximum, le moteur n’est plus protégé du tout : c’est l’erreur la plus fréquente." },
        { texte: "Sur l’intensité lue sur la plaque du moteur.", juste: true } ] },

    { question: "Un moteur passe du triangle à l’étoile. Le réglage change-t-il ?",
      confirmation: "L’intensité absorbée change avec le couplage : le réglage aussi.",
      reponses: [
        { texte: "Oui : l’intensité absorbée n’est plus la même.", juste: true },
        { texte: "Non, c’est le même moteur.", pourquoi: "Le moteur est le même, mais il n’absorbe pas la même intensité selon le couplage." },
        { texte: "Non, le disjoncteur s’adapte tout seul.", pourquoi: "Aucun disjoncteur moteur ne détecte le couplage." },
        { texte: "Seulement si la tension change.", pourquoi: "La tension du réseau peut être identique et l’intensité changer quand même." } ] },

    { question: "Le disjoncteur moteur remplace…",
      confirmation: "Le couple fusible aM + relais thermique, en un seul appareil réglable.",
      reponses: [
        { texte: "Le contacteur.", pourquoi: "Non : le disjoncteur protège, le contacteur commande. Deux métiers différents." },
        { texte: "Le couple fusible aM + relais thermique.", juste: true },
        { texte: "Le bornier de raccordement.", pourquoi: "Aucun rapport : le bornier ne protège rien." },
        { texte: "Le différentiel.", pourquoi: "Il ne voit pas le défaut d’isolement : il ne remplace aucun différentiel." } ] },

    { question: "Pourquoi son déclencheur magnétique est-il calé très haut ?",
      confirmation: "Pour laisser passer la pointe de démarrage du moteur.",
      reponses: [
        { texte: "Pour compenser le réglage du thermique.", pourquoi: "Les deux déclencheurs sont indépendants." },
        { texte: "Parce que les moteurs sont peu sensibles.", pourquoi: "Les moteurs sont au contraire fragiles à la surcharge : c’est le thermique qui s’en occupe." },
        { texte: "Pour laisser passer la pointe de démarrage.", juste: true },
        { texte: "Pour économiser le mécanisme.", pourquoi: "Le calage n’a rien à voir avec l’usure." } ] }
  ],

  retenir: [
    "<strong>Deux déclencheurs, et un réglage.</strong>",
    "Le thermique se règle sur <strong>l’intensité de la plaque</strong>.",
    "Le magnétique est calé haut : il laisse démarrer.",
    "<strong>Il ne remplace pas le contacteur</strong>, et pas non plus le différentiel."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre pourquoi ce disjoncteur se règle, sur quelle valeur, et ce qu’il remplace — ou pas.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/' } ],

  correspondances: [
    { ligne: 1, couleur: '#1b3a63', texte: "1.7 Lire une plaque signalétique" },
    { ligne: 4, couleur: '#c0392b', texte: "4.7 Le relais thermique" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage" } ]
});

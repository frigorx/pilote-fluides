/* ÉlectroRézo 7.4 — Le variateur de fréquence. Terminus du réseau. */

ModeleAppareil.construire({
  id: '7.4', ligne: 7,
  vue3d: { modele: 'variateur' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 7 Faire varier · Station 4 · terminus',
  titre: "Le variateur de fréquence",
  narration: NARRATION,

  prerequis: [
    { id: '7.3', quoi: "varier la fréquence" },
    { id: '7.2', quoi: "le gradateur" },
  ],

  photos: [
    { src: 'assets/biblio/pompes-et-variateurs.jpeg',
      alt: "Photo de deux pompes de circulation, chacune surmontée de son boîtier électronique.",
      titre: "Sur les machines.", sous: "Ici, l’électronique de réglage est montée directement sur chaque pompe." }
  ],

  aQuoiCaSert: "À régler la vitesse d’un moteur asynchrone, vraiment. Et à bien davantage : démarrer en douceur, freiner, protéger, compter les heures, dialoguer avec un automate. C’est le terminus de ce réseau, et ce n’est pas un hasard.",
  ouOnLeTrouve: "Sur presque toutes les machines installées depuis vingt ans. Pompes, ventilateurs, convoyeurs, compresseurs de climatisation, ascenseurs.",

  scene: () => SchemasMachines.loiUsurF(),

  technologie: [
    ["Le redresseur", "il prend l’alternatif du réseau et fait passer tout du même côté. Six diodes suffisent en triphasé."],
    ["Le bus continu", "un gros condensateur qui lisse. Il monte à plus de 500 volts continus, et il <strong>reste chargé</strong> plusieurs minutes après la coupure."],
    ["L’onduleur", "six interrupteurs électroniques qui redécoupent ce continu très vite. C’est lui qui fabrique la fréquence de sortie, et la tension qui va avec."],
    ["Le calculateur", "il applique la loi U sur f, surveille l’intensité, limite les rampes, et coupe en cas de défaut. C’est lui qui fait du variateur une protection en plus d’un régulateur."]
  ],

  variantes: [
    "<strong>Les rampes</strong> — on règle le temps de montée et le temps de descente. Un convoyeur qui démarre en dix secondes ne renverse pas ses caisses.",
    "<strong>Le freinage</strong> — en ralentissant, le moteur devient générateur et renvoie de l’énergie. Une <strong>résistance de freinage</strong> la dissipe, sinon le bus monte trop haut.",
    "<strong>Le contrôle vectoriel</strong> — plus fin que la loi U/f : il tient le couple même à l’arrêt. Nécessaire sur un levage.",
    "<strong>La communication</strong> — la plupart dialoguent avec un automate par un bus. La consigne de vitesse arrive alors par deux fils, et non par un potentiomètre."
  ],
  reglage: "Quelques paramètres seulement comptent vraiment, et ils sont toujours les mêmes : l’<strong>intensité nominale du moteur</strong>, relevée sur sa plaque ; la <strong>fréquence minimale et maximale</strong> ; les <strong>rampes</strong> ; et la <strong>loi U/f</strong>. Le reste, on y touche quand on sait pourquoi.",

  picto: SchemasMachines.pictoTrois,
  colonnes: SchemasMachines.COLONNES,
  consigneAptitudes: 'Les trois questions, une dernière fois. C’est le terminus du réseau.',
  aptitudes: {
    mouvement: false, tension: true, alternatif: true,
    bonneReponse: 'Exact. Il ne bouge pas — c’est le moteur qui bouge. Il change la tension, et aussi la fréquence, ce qu’aucun autre appareil de ce réseau ne sait faire. Et il lui faut l’alternatif en entrée, même s’il fabrique du continu au milieu.',
    erreurs: {
      mouvement: 'C’est le moteur qui produit le mouvement. Le variateur lui dit seulement à quelle vitesse.',
      tension: 'Il fabrique sa tension de sortie de toutes pièces, en même temps que sa fréquence.',
      alternatif: 'Son redresseur a besoin d’alternatif en entrée. Certains modèles acceptent du continu sur le bus, mais c’est un usage particulier.'
    }
  },

  cablage: [
    "En amont : une <strong>protection</strong> et un <strong>sectionnement</strong>. Le variateur ne remplace ni l’un ni l’autre.",
    "Entre le variateur et le moteur : <strong>ne jamais ouvrir la sortie en charge</strong>. Un contacteur ou un sectionneur placé là n’est admis que s’il s’ouvre variateur bloqué (verrouillage), selon la notice : ouvrir en charge peut détruire l’onduleur.",
    "Le <strong>câble moteur</strong> doit être blindé, et son blindage raccordé aux deux extrémités. Le découpage rayonne, et il perturbe tout le reste de l’armoire.",
    "Le <strong>réglage de l’intensité nominale</strong> se fait sur la valeur de la plaque du moteur, correspondant au couplage retenu. C’est ce qui remplace le relais thermique."
  ],
  piege: "Un <strong>différentiel ordinaire</strong> ne convient pas toujours derrière un variateur. Derrière un variateur triphasé, un défaut peut produire du continu lisse que les types AC et A ne voient pas : il faut un différentiel de <strong>type B</strong>, ou celui que la notice impose. Les fuites à haute fréquence du découpage font aussi déclencher un différentiel ordinaire sans raison.",

  symboles: [
    { src: 'assets/redresseur.svg', alt: "Symbole normalisé d’un redresseur : alternatif vers continu.", legende: "Le redresseur" },
    { src: 'assets/dc_ac1.svg', alt: "Symbole normalisé d’un onduleur : continu vers alternatif.", legende: "L’onduleur" }
  ],
  lecturePlan: [
    "Les deux symboles reprennent la <strong>diagonale</strong> des convertisseurs, vue à la station 7.2. Mais cette fois, ce qui est écrit de part et d’autre n’est pas la même chose.",
    "Mis bout à bout, ils donnent le variateur : le <strong>redresseur</strong> (alternatif vers continu), puis l’<strong>onduleur</strong> (continu vers alternatif). Entre les deux, le bus continu fait le lien.",
    "Sur un plan de puissance, le variateur remplace, pour le démarrage, le <strong>contacteur</strong> de puissance et, pour la protection du moteur, le <strong>relais thermique</strong>. Un contacteur ou un sectionneur en amont reste courant.",
    "Et cherchez, en revanche, la <strong>résistance de freinage</strong> : deux bornes en plus, souvent repérées PA et PB. Sa présence vous dit que la machine freine, donc qu’elle a de l’inertie."
  ],

  tableau: SchemasMachines.tableauMachines,
  tableauTitre: 'Les machines des lignes 6 et 7',

  quiz: [
    { question: "Le moteur tourne, le variateur est en marche : peut-on ouvrir un contacteur placé entre eux ?",
      confirmation: "Non : ouvrir en charge la sortie d’un variateur peut le détruire. Un contacteur aval ne s’ouvre que variateur bloqué.",
      reponses: [
        { texte: "Oui, pour couper en urgence.", pourquoi: "L’arrêt d’urgence agit en amont, ou par une entrée dédiée du variateur." },
        { texte: "Oui, c’est même recommandé.", pourquoi: "C’est exactement l’inverse : la coupure en charge peut détruire l’onduleur." },
        { texte: "Oui, si le contacteur est calibré.", pourquoi: "Le calibre n’est pas en cause : c’est la coupure en charge elle-même qui est interdite." },
        { texte: "Non.", juste: true } ] },

    { question: "Sur quoi règle-t-on, dans un variateur, l’intensité nominale du moteur ?",
      confirmation: "Sur la valeur de la plaque du moteur, pour le couplage retenu.",
      reponses: [
        { texte: "Sur la valeur de la plaque du moteur.", juste: true },
        { texte: "Sur le calibre de la protection amont.", pourquoi: "La protection amont protège le câble, pas le moteur." },
        { texte: "Au maximum, pour éviter les déclenchements.", pourquoi: "C’est rendre la protection du moteur inopérante." },
        { texte: "Sur la puissance divisée par la tension.", pourquoi: "Ce calcul néglige le rendement et le cos φ." } ] },

    { question: "Pourquoi faut-il un différentiel de type B derrière un variateur ?",
      confirmation: "Parce qu’un défaut derrière le redresseur peut donner du continu lisse que les types AC et A ne voient pas.",
      reponses: [
        { texte: "Parce que le variateur consomme plus.", pourquoi: "La consommation ne change pas le type de différentiel." },
        { texte: "Parce qu’un défaut après le redresseur peut donner un courant de fuite continu lisse qu’un différentiel ordinaire ne voit pas.", juste: true },
        { texte: "Parce que la tension de sortie est plus élevée.", pourquoi: "Elle ne dépasse pas celle du réseau." },
        { texte: "Parce que le moteur tourne plus vite.", pourquoi: "La vitesse n’a aucun rapport avec le type de différentiel." } ] },

    { question: "Combien de temps le bus continu reste-t-il chargé après la coupure ?",
      confirmation: "Plusieurs minutes — le délai est écrit sur l’appareil.",
      reponses: [
        { texte: "Quelques secondes.", pourquoi: "C’est bien plus long, et c’est justement ce qui rend le risque sérieux." },
        { texte: "Il se décharge instantanément.", pourquoi: "Un condensateur de cette taille ne se décharge pas seul rapidement." },
        { texte: "Plusieurs minutes.", juste: true },
        { texte: "Cela dépend de la fréquence réglée.", pourquoi: "Le réglage de fréquence n’a rien à voir avec la décharge du bus." } ] }
  ],

  retenir: [
    "<strong>Redresseur, bus continu, onduleur.</strong> Il défait, puis il refait.",
    "<strong>Jamais d’ouverture en charge</strong> de sa sortie : un contacteur aval ne s’ouvre que variateur bloqué, selon la notice.",
    "<strong>Le bus reste chargé</strong> plusieurs minutes. Le délai est écrit dessus.",
    "<strong>Différentiel de type B</strong> (ou celui de la notice), et câble moteur blindé."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre les trois étages d’un variateur, connaître les quelques paramètres qui comptent, et les règles de câblage et de sécurité qui lui sont propres.</p><p><strong>Limite.</strong> La mise en service détaillée dépend de chaque constructeur : ce sont les notices qui font foi.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' } ],

  correspondances: [
    { ligne: 7, couleur: '#0b7285', texte: "7.3 La variation de fréquence" },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone" },
    { ligne: 4, couleur: '#c0392b', texte: "4.6 Le disjoncteur différentiel" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.9 Lire un schéma" } ]
});

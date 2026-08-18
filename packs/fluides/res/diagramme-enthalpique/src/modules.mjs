export const MODULES = [
  {
    id: "axes",
    order: 1,
    title: "Les axes p-h",
    short: "Axes p-h",
    level: "essentiel",
    symbol: "p ↕ · h ↔",
    goal: "Repérer immédiatement la pression et l’enthalpie massique.",
    discover: {
      title: "Deux axes suffisent pour commencer",
      body: "Sur le diagramme log(p)-h, la pression absolue p se lit verticalement. L’enthalpie massique h se lit horizontalement. L’échelle de pression est logarithmique : elle permet de voir clairement les basses comme les hautes pressions.",
      remember: "Vertical : pression p en bar absolus. Horizontal : enthalpie h en kJ/kg."
    },
    function: {
      title: "À quoi servent les axes ?",
      body: "Chaque point du diagramme représente un état du fluide. Sa hauteur donne la pression. Sa position vers la droite donne l’enthalpie. Avant de regarder une courbe, vérifiez toujours ces deux directions.",
      terrain: "Lien métier : distinguer la basse pression de la haute pression et suivre l’énergie transportée par un kilogramme de fluide."
    },
    quiz: [
      {
        question: "Quelle grandeur se lit sur l’axe horizontal ?",
        choices: ["La pression p", "L’enthalpie massique h", "Le titre vapeur x"],
        answer: 1,
        feedback: "L’enthalpie massique h se lit horizontalement, en kJ/kg."
      },
      {
        question: "Pourquoi la pression est-elle tracée sur une échelle logarithmique ?",
        choices: ["Pour rendre les courbes décoratives", "Pour lire une grande plage de pressions", "Pour supprimer les unités"],
        answer: 1,
        feedback: "L’échelle logarithmique rend lisibles sur la même feuille les petites et les grandes pressions."
      }
    ]
  },
  {
    id: "saturation",
    order: 2,
    title: "La courbe de saturation",
    short: "Saturation",
    level: "essentiel",
    symbol: "cloche",
    goal: "Utiliser la cloche comme premier repère du diagramme.",
    discover: {
      title: "Cherchez d’abord la cloche",
      body: "La courbe de saturation forme une enveloppe centrale. Elle sépare les domaines liquide, liquide plus vapeur et vapeur. Son sommet est le point critique.",
      remember: "La cloche est le repère principal. Repérez-la avant toutes les autres familles."
    },
    function: {
      title: "Une frontière entre les états",
      body: "La cloche ne donne pas seulement une forme : elle indique où commence ou se termine le changement d’état liquide-vapeur. À l’intérieur, les deux phases coexistent.",
      terrain: "Lien métier : elle permet de savoir si le fluide est liquide, diphasique ou vapeur avant d’interpréter une mesure."
    },
    quiz: [
      {
        question: "Que délimite principalement la courbe de saturation ?",
        choices: ["Les domaines de phase du fluide", "La tension électrique", "Le débit d’air"],
        answer: 0,
        feedback: "La cloche sépare les domaines liquide, diphasique et vapeur."
      },
      {
        question: "Comment s’appelle le sommet de la cloche ?",
        choices: ["Le point zéro", "Le point critique", "Le point de vide"],
        answer: 1,
        feedback: "Le sommet est le point critique. Au-dessus, la frontière liquide-vapeur disparaît."
      }
    ]
  },
  {
    id: "bulle-rosee",
    order: 3,
    title: "Bulle et rosée",
    short: "Bulle / rosée",
    level: "essentiel",
    symbol: "bulle ◁ cloche ▷ rosée",
    goal: "Distinguer les deux frontières de la cloche.",
    discover: {
      title: "Deux côtés, deux noms",
      body: "La branche gauche est la courbe de bulle : en partant du liquide, la première bulle de vapeur apparaît. La branche droite est la courbe de rosée : en partant de la vapeur, la première goutte de liquide apparaît.",
      remember: "Bulle : côté liquide. Rosée : côté vapeur."
    },
    function: {
      title: "Le bon côté pour le bon calcul",
      body: "La température de rosée sert notamment de référence pour la surchauffe. La température de bulle sert notamment de référence pour le sous-refroidissement. Pour un mélange zéotropique, elles peuvent être différentes : c’est le glissement de température.",
      terrain: "Lien métier : choisir la bonne référence de saturation évite de fausser une surchauffe ou un sous-refroidissement."
    },
    quiz: [
      {
        question: "En partant d’un liquide que l’on chauffe, quelle frontière rencontre-t-on ?",
        choices: ["La courbe de bulle", "La courbe de rosée", "Une isentrope"],
        answer: 0,
        feedback: "La première bulle de vapeur apparaît sur la courbe de bulle."
      },
      {
        question: "Quelle référence utilise-t-on généralement pour raisonner sur la surchauffe ?",
        choices: ["La température de rosée", "La température de bulle", "Le point critique"],
        answer: 0,
        feedback: "La surchauffe se raisonne côté vapeur, à partir de la température de rosée."
      }
    ]
  },
  {
    id: "zones",
    order: 4,
    title: "Les trois zones",
    short: "Zones du fluide",
    level: "essentiel",
    symbol: "liquide · mélange · vapeur",
    goal: "Identifier l’état du fluide à partir de la position d’un point.",
    discover: {
      title: "Où se trouve le point ?",
      body: "À gauche de la cloche, le fluide est liquide sous-refroidi. Dans la cloche, liquide et vapeur coexistent. À droite, le fluide est vapeur surchauffée.",
      remember: "Gauche : liquide. Dedans : liquide + vapeur. Droite : vapeur."
    },
    function: {
      title: "La zone donne déjà une information",
      body: "Avant de lire une température ou une enthalpie, repérez la zone. La position du point indique immédiatement l’état physique probable du fluide.",
      terrain: "Lien métier : à l’aspiration d’un compresseur, on recherche une vapeur ; avant le détendeur, on recherche un liquide."
    },
    quiz: [
      {
        question: "Que trouve-t-on à l’intérieur de la cloche ?",
        choices: ["Du liquide uniquement", "Un mélange liquide-vapeur", "De la vapeur uniquement"],
        answer: 1,
        feedback: "Dans la cloche, les phases liquide et vapeur coexistent."
      },
      {
        question: "Dans quelle zone doit se trouver le fluide aspiré par le compresseur ?",
        choices: ["Dans la vapeur, à droite de la cloche", "Dans le liquide, à gauche", "Toujours au point critique"],
        answer: 0,
        feedback: "Le compresseur doit aspirer de la vapeur ; un retour de liquide est dangereux pour lui."
      }
    ]
  },
  {
    id: "isotitres",
    order: 5,
    title: "Les isotitres",
    short: "Isotitres x",
    level: "essentiel",
    symbol: "x = constante",
    goal: "Reconnaître les lignes de titre vapeur dans la zone diphasique.",
    discover: {
      title: "Quelle part est déjà vapeur ?",
      body: "Dans la cloche, le titre x est la fraction massique de vapeur. Une isotitre relie des points de même titre. Ces lignes restent à l’intérieur de la zone liquide-vapeur.",
      remember: "x = 0 : liquide saturé. x = 1 : vapeur saturée. Entre les deux : mélange."
    },
    function: {
      title: "Lire la qualité du mélange",
      body: "Une isotitre n’est ni une température ni une pression. Elle indique la proportion massique de vapeur présente dans le mélange.",
      terrain: "Lien métier : savoir les reconnaître évite de confondre une ligne de titre avec une frontière ou une autre famille de courbes."
    },
    quiz: [
      {
        question: "Que représente le titre x ?",
        choices: ["La fraction massique de vapeur", "La pression absolue", "Le volume du local"],
        answer: 0,
        feedback: "Le titre x indique la part massique du fluide présente sous forme de vapeur."
      },
      {
        question: "Où se trouvent les isotitres ?",
        choices: ["Uniquement dans la cloche", "Uniquement à gauche", "Sur l’axe des pressions"],
        answer: 0,
        feedback: "Le titre n’a de sens que dans la zone où liquide et vapeur coexistent."
      }
    ]
  },
  {
    id: "isobare",
    order: 6,
    title: "L’isobare",
    short: "Isobare",
    level: "essentiel",
    symbol: "p = constante",
    goal: "Reconnaître une transformation à pression constante.",
    discover: {
      title: "Même pression",
      body: "ISO signifie « même ». Une isobare relie tous les points ayant la même pression p. Comme la pression se lit verticalement, une isobare est horizontale.",
      remember: "ISObare : même pression. Sur le diagramme p-h : ligne horizontale."
    },
    function: {
      title: "Suivre une transformation horizontale",
      body: "Dans le modèle simple du cycle frigorifique, l’évaporation et la condensation sont représentées sur des portions d’isobares, respectivement en basse et en haute pression.",
      terrain: "Lien métier : relier les transformations dans les échangeurs aux niveaux BP et HP."
    },
    quiz: [
      {
        question: "Quelle grandeur reste constante sur une isobare ?",
        choices: ["La pression p", "L’enthalpie h", "L’entropie s"],
        answer: 0,
        feedback: "Le suffixe « bare » renvoie à la pression."
      },
      {
        question: "Quelle allure a une isobare sur un diagramme p-h ?",
        choices: ["Horizontale", "Verticale", "Circulaire"],
        answer: 0,
        feedback: "Une hauteur constante correspond à une pression constante : la ligne est horizontale."
      }
    ]
  },
  {
    id: "isotherme",
    order: 7,
    title: "L’isotherme",
    short: "Isotherme",
    level: "essentiel",
    symbol: "T = constante",
    goal: "Reconnaître les états de même température.",
    discover: {
      title: "Même température",
      body: "Une isotherme relie les points ayant la même température T. Sur un diagramme réel, plusieurs isothermes forment un réseau ; leur allure change selon la zone du fluide.",
      remember: "ISOtherme : même température. Pensez au thermomètre."
    },
    function: {
      title: "Ne pas apprendre seulement une couleur",
      body: "Une couleur peut changer d’un éditeur de diagramme à l’autre. Pour identifier la famille, cherchez la légende, la valeur de température et l’allure de la courbe.",
      terrain: "Lien métier : comparer une température réelle à la température de saturation pour déterminer surchauffe ou sous-refroidissement."
    },
    quiz: [
      {
        question: "Quelle grandeur reste constante sur une isotherme ?",
        choices: ["Le volume massique", "La température", "La pression"],
        answer: 1,
        feedback: "THERME renvoie à la température : T reste constante."
      },
      {
        question: "Pour identifier une isotherme sur un autre diagramme, que faut-il privilégier ?",
        choices: ["Uniquement sa couleur", "La légende, la valeur T et son allure", "La taille du fichier"],
        answer: 1,
        feedback: "La couleur n’est pas une convention universelle. Le symbole T et la légende sont les repères fiables."
      }
    ]
  },
  {
    id: "isochore",
    order: 8,
    title: "L’isochore",
    short: "Isochore",
    level: "approfondissement",
    symbol: "v = constante",
    goal: "Reconnaître les états de même volume massique.",
    discover: {
      title: "Même volume massique",
      body: "Une isochore relie les points où le volume massique v reste constant. Le volume massique est le volume occupé par un kilogramme de fluide, exprimé en m³/kg.",
      remember: "ISOchore : même volume massique v."
    },
    function: {
      title: "Une famille surtout visible côté vapeur",
      body: "Les isochores forment généralement un réseau de courbes dans la zone vapeur. Leur pente les distingue des isobares horizontales et des isenthalpes verticales.",
      terrain: "Lien métier : comprendre comment la masse volumique de la vapeur évolue avec l’état thermodynamique."
    },
    quiz: [
      {
        question: "Que conserve une isochore ?",
        choices: ["Le volume massique v", "Le titre x", "La température T"],
        answer: 0,
        feedback: "Une isochore relie les états de même volume massique."
      },
      {
        question: "Quelle unité convient au volume massique ?",
        choices: ["m³/kg", "bar absolu", "kJ/kg"],
        answer: 0,
        feedback: "Le volume massique s’exprime en mètres cubes par kilogramme."
      }
    ]
  },
  {
    id: "isentrope",
    order: 9,
    title: "L’isentrope",
    short: "Isentrope",
    level: "approfondissement",
    symbol: "s = constante",
    goal: "Relier l’isentrope à la compression idéale de référence.",
    discover: {
      title: "Même entropie",
      body: "Une isentrope relie les points où l’entropie s reste constante. L’entropie est une grandeur thermodynamique ; pour cette formation, retenez surtout son usage comme référence de compression idéale.",
      remember: "ISEntrope : même entropie s. Référence de compression idéale."
    },
    function: {
      title: "Une référence, pas une promesse",
      body: "Le compresseur réel n’est pas parfait. La compression isentropique sert de modèle de comparaison pour analyser l’écart entre le comportement idéal et le comportement réel.",
      terrain: "Lien métier : repérer la direction de la compression et comprendre pourquoi la température de refoulement augmente."
    },
    quiz: [
      {
        question: "À quelle transformation associe-t-on surtout l’isentrope dans ce parcours ?",
        choices: ["À la compression idéale", "Au tirage au vide", "À la pesée du fluide"],
        answer: 0,
        feedback: "L’isentrope sert de référence pour représenter la compression idéale."
      },
      {
        question: "Le compresseur réel suit-il toujours une compression parfaitement isentropique ?",
        choices: ["Oui, sans exception", "Non, c’est un modèle de référence", "Seulement à l’arrêt"],
        answer: 1,
        feedback: "L’isentrope représente un idéal utilisé pour comparer le fonctionnement réel."
      }
    ]
  },
  {
    id: "isenthalpe",
    order: 10,
    title: "L’isenthalpe",
    short: "Isenthalpe",
    level: "essentiel",
    symbol: "h = constante",
    goal: "Relier une ligne verticale à la détente au détendeur.",
    discover: {
      title: "Même enthalpie",
      body: "Une isenthalpe relie les points ayant la même enthalpie h. Puisque h se lit horizontalement, conserver la même valeur revient à se déplacer verticalement.",
      remember: "ISenthalpe : même h. Sur le diagramme p-h : ligne verticale."
    },
    function: {
      title: "La forte chute de pression du détendeur",
      body: "Dans le modèle frigorifique courant, la détente au détendeur est représentée comme isenthalpique : la pression chute fortement tandis que l’enthalpie reste constante.",
      terrain: "Lien métier : reconnaître immédiatement le trait descendant associé au détendeur."
    },
    quiz: [
      {
        question: "Quelle grandeur reste constante pendant une détente isenthalpique ?",
        choices: ["La pression", "L’enthalpie", "Le volume du local"],
        answer: 1,
        feedback: "Isenthalpique signifie : enthalpie h constante."
      },
      {
        question: "Quelle allure a une isenthalpe sur le diagramme p-h ?",
        choices: ["Une ligne verticale", "Une ligne horizontale", "Une boucle fermée"],
        answer: 0,
        feedback: "Une abscisse h constante produit une ligne verticale."
      }
    ]
  }
];

export const CORE_IDS = MODULES.filter((module) => module.level === "essentiel").map((module) => module.id);
export const ALL_IDS = MODULES.map((module) => module.id);

export function getModule(id) {
  return MODULES.find((module) => module.id === id);
}

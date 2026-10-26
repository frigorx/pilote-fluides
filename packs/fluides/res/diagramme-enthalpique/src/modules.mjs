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
      remember: "Vertical : pression p en bar absolus. Horizontal : enthalpie h en kJ/kg.",
      narration: "Ce schéma met en évidence les deux axes, et deux directions suffisent pour commencer. La verticale indique la pression absolue, en bar. L'horizontale indique l'enthalpie massique, en kilojoules par kilogramme. L'échelle de pression a une particularité : elle est logarithmique, ce qui permet de bien voir les basses pressions autant que les hautes. Tout point du diagramme se situe grâce à ces deux repères. L'écran suivant explique à quoi ils servent."
    },
    function: {
      title: "À quoi servent les axes ?",
      body: "Chaque point du diagramme représente un état du fluide. Sa hauteur donne la pression. Sa position vers la droite donne l’enthalpie. Avant de regarder une courbe, vérifiez toujours ces deux directions.",
      terrain: "Lien métier : distinguer la basse pression de la haute pression et suivre l’énergie transportée par un kilogramme de fluide.",
      narration: "Les axes passent en premier pour une raison simple. Chaque point dit dans quel état se trouve le fluide. Cet état s'obtient avec deux repères. La pression se trouve à la hauteur du point, l'enthalpie à sa place sur l'horizontale. C'est le premier contrôle, avant d'étudier une courbe. En pratique, il permet de dire si l'on est en basse ou en haute pression, et de suivre l'énergie portée par chaque kilogramme de fluide. Les questions du module vous attendent ensuite."
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
        choices: ["Pour que toutes les courbes deviennent des droites", "Pour supprimer les unités", "Pour lire une grande plage de pressions"],
        answer: 2,
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
      remember: "La cloche est le repère principal. Repérez-la avant toutes les autres familles.",
      narration: "Sur le schéma, la courbe mise en évidence dessine une cloche au centre du diagramme : c'est la courbe de saturation. Elle sépare trois domaines : le liquide, la vapeur, et la zone où les deux phases coexistent, à l'intérieur de la cloche. Son sommet porte un nom, le point critique. On la cherche avant toute autre famille de courbes, parce qu'elle sert de repère principal. L'écran suivant précise ce que la cloche indique."
    },
    function: {
      title: "Une frontière entre les états",
      body: "La cloche ne donne pas seulement une forme : elle indique où commence ou se termine le changement d’état liquide-vapeur. À l’intérieur, les deux phases coexistent.",
      terrain: "Lien métier : elle permet de savoir si le fluide est liquide, diphasique ou vapeur avant d’interpréter une mesure.",
      narration: "La cloche n'est pas qu'une forme à reconnaître : c'est une frontière. Elle marque l'endroit où le passage entre liquide et vapeur démarre, et celui où il s'achève. Dedans, le liquide et la vapeur sont là en même temps : on dit que le fluide est diphasique. En pratique, elle permet de situer le fluide, liquide, diphasique ou vapeur, avant même d'interpréter une mesure. Place ensuite aux questions du module."
    },
    quiz: [
      {
        question: "Que délimite principalement la courbe de saturation ?",
        choices: ["Les domaines de phase du fluide", "Les lignes de pression constante", "Les lignes de température constante"],
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
      remember: "Bulle : côté liquide. Rosée : côté vapeur.",
      narration: "La cloche a deux flancs, et leurs noms disent ce qui s'y passe. À gauche, le trait plein du schéma s'appelle la courbe de bulle. Si l'on part du liquide, c'est là qu'apparaît la toute première bulle de vapeur. À droite, le trait tireté s'appelle la courbe de rosée. Si l'on part de la vapeur, c'est là que se forme la toute première goutte de liquide. Bulle du côté liquide, rosée du côté vapeur. La suite montre pourquoi cette distinction compte."
    },
    function: {
      title: "Le bon côté pour le bon calcul",
      body: "La température de rosée sert notamment de référence pour la surchauffe. La température de bulle sert notamment de référence pour le sous-refroidissement. Pour un mélange zéotropique, elles peuvent être différentes : c’est le glissement de température.",
      terrain: "Lien métier : choisir la bonne référence de saturation évite de fausser une surchauffe ou un sous-refroidissement.",
      narration: "Distinguer ces deux côtés change le résultat d'un calcul. Pour une surchauffe, on s'appuie notamment sur la température de rosée, celle du côté vapeur. Pour un sous-refroidissement, on s'appuie notamment sur la température de bulle, celle du côté liquide. Avec un mélange zéotropique, ces deux températures peuvent différer : on parle alors de glissement de température. Prendre la mauvaise référence fausserait donc la surchauffe ou le sous-refroidissement. Des questions du module prennent maintenant le relais."
    },
    quiz: [
      {
        question: "En partant d’un liquide que l’on chauffe, quelle frontière rencontre-t-on ?",
        choices: ["La courbe de rosée", "Une isentrope", "La courbe de bulle"],
        answer: 2,
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
      remember: "Gauche : liquide. Dedans : liquide + vapeur. Droite : vapeur.",
      narration: "Un point posé sur le diagramme prend son sens par sa place par rapport à la cloche. Sur le schéma, tout point situé à gauche de la cloche représente du liquide, qu'on dit sous-refroidi. À l'intérieur de la cloche, on a les deux phases à la fois. À droite, c'est de la vapeur, dite surchauffée. Il suffit donc de regarder où tombe un point pour savoir dans quel état est le fluide. À l'écran suivant, vous verrez pourquoi cette information passe avant toute lecture."
    },
    function: {
      title: "La zone donne déjà une information",
      body: "Avant de lire une température ou une enthalpie, repérez la zone. La position du point indique immédiatement l’état physique probable du fluide.",
      terrain: "Lien métier : à l’aspiration d’un compresseur, on recherche une vapeur ; avant le détendeur, on recherche un liquide.",
      narration: "Repérer la zone passe avant tout le reste : la position du point indique tout de suite l'état probable du fluide. On sait donc à quoi s'attendre avant de relever la moindre température ou enthalpie. Deux exemples sur une installation. Au niveau de l'aspiration du compresseur, on s'attend à de la vapeur. En amont du détendeur, on s'attend à du liquide. C'est le premier réflexe à avoir devant un point du diagramme. Les questions du module suivent."
    },
    quiz: [
      {
        question: "Que trouve-t-on à l’intérieur de la cloche ?",
        choices: ["Du liquide uniquement", "De la vapeur uniquement", "Un mélange liquide-vapeur"],
        answer: 2,
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
      remember: "x = 0 : liquide saturé. x = 1 : vapeur saturée. Entre les deux : mélange.",
      narration: "Dans la cloche, le fluide est un mélange, dont une part de la masse est déjà de la vapeur. Cette part s'appelle le titre vapeur. Sur le schéma, chaque ligne pointillée rassemble des points de même titre : c'est une isotitre, et elle reste à l'intérieur de la cloche. Un titre de zéro correspond au liquide saturé, un titre de un à la vapeur saturée. Tout ce qui se trouve entre les deux est un mélange. Vous verrez ensuite comment lire la qualité du mélange."
    },
    function: {
      title: "Lire la qualité du mélange",
      body: "Une isotitre n’est ni une température ni une pression. Elle indique la proportion massique de vapeur présente dans le mélange.",
      terrain: "Lien métier : savoir les reconnaître évite de confondre une ligne de titre avec une frontière ou une autre famille de courbes.",
      narration: "Une isotitre ne vous renseigne ni sur la température, ni sur la pression. Ce qu'elle exprime, c'est la qualité du mélange : la part de vapeur qu'il contient, comptée en masse. Sur le chantier, savoir la reconnaître évite deux confusions : la prendre pour une frontière, ou pour une courbe d'une autre famille. Chaque ligne de titre répond donc à une seule question, celle de la proportion de vapeur. Les questions du module viennent ensuite."
    },
    quiz: [
      {
        question: "Que représente le titre x ?",
        choices: ["La pression absolue", "La fraction massique de vapeur", "La température de saturation"],
        answer: 1,
        feedback: "Le titre x indique la part massique du fluide présente sous forme de vapeur."
      },
      {
        question: "Où se trouvent les isotitres ?",
        choices: ["Uniquement à gauche", "Sur l’axe des pressions", "Uniquement dans la cloche"],
        answer: 2,
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
      remember: "ISObare : même pression. Sur le diagramme p-h : ligne horizontale.",
      narration: "Le préfixe iso veut dire même : une isobare rassemble donc les points qui ont la même pression. Voici pourquoi elle est horizontale sur le schéma. La pression se lit en hauteur. Des points de même pression sont donc tous à la même hauteur, et la ligne qui les relie reste à plat. Elle représente une transformation à pression constante. À l'écran suivant, vous verrez où ces horizontales se trouvent dans un cycle frigorifique."
    },
    function: {
      title: "Suivre une transformation horizontale",
      body: "Dans le modèle simple du cycle frigorifique, l’évaporation et la condensation sont représentées sur des portions d’isobares, respectivement en basse et en haute pression.",
      terrain: "Lien métier : relier les transformations dans les échangeurs aux niveaux BP et HP.",
      narration: "Dans la représentation simplifiée du cycle frigorifique, deux transformations se font à pression constante : évaporer et condenser. Chacune se dessine donc sur un morceau d'isobare. Pour la suivre, on se déplace à l'horizontale. L'évaporation se situe en basse pression, la condensation en haute pression. En pratique, on s'en sert pour rattacher ce qui se passe dans chaque échangeur à son niveau de pression, BP ou HP. Des questions du module suivent."
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
        choices: ["Verticale", "Horizontale", "Circulaire"],
        answer: 1,
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
      remember: "ISOtherme : même température. Pensez au thermomètre.",
      narration: "Une isotherme réunit les points qui ont la même température. Sur le schéma, c'est la ligne tiretée mise en évidence. Sur un diagramme réel, on en trouve plusieurs, qui forment un réseau. Leur allure n'est pas la même partout : elle change selon la zone où se trouve le fluide. Le thermomètre aide à retenir le mot. À l'écran suivant, vous verrez comment reconnaître cette famille sans vous fier à sa couleur."
    },
    function: {
      title: "Ne pas apprendre seulement une couleur",
      body: "Une couleur peut changer d’un éditeur de diagramme à l’autre. Pour identifier la famille, cherchez la légende, la valeur de température et l’allure de la courbe.",
      terrain: "Lien métier : comparer une température réelle à la température de saturation pour déterminer surchauffe ou sous-refroidissement.",
      narration: "Apprendre l'isotherme par sa seule couleur ne suffit pas, puisque la teinte varie selon l'éditeur du diagramme. Pour reconnaître la famille, trois appuis sont plus sûrs : la légende, la température indiquée, et la forme de la ligne. Sur le chantier, on met en regard la température réelle et la température de saturation. Cette comparaison permet de déterminer s'il y a surchauffe ou sous-refroidissement. Place maintenant aux questions du module."
    },
    quiz: [
      {
        question: "Quelle grandeur reste constante sur une isotherme ?",
        choices: ["Le volume massique", "La pression", "La température"],
        answer: 2,
        feedback: "THERME renvoie à la température : T reste constante."
      },
      {
        question: "Pour identifier une isotherme sur un autre diagramme, que faut-il privilégier ?",
        choices: ["La légende, la valeur T et son allure", "Uniquement sa couleur", "Uniquement l’épaisseur du trait"],
        answer: 0,
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
      remember: "ISOchore : même volume massique v.",
      narration: "Le volume massique, c'est la place qu'occupe un kilogramme de fluide, exprimée en mètres cubes par kilogramme. Une isochore rassemble tous les points où cette place reste la même. Chaque point de la ligne est un état du fluide, et tous ces états ont le même volume massique. Sur le schéma, elle est tracée en trait mixte. Le préfixe iso veut dire même : ici, même volume massique. Vous verrez ensuite dans quelle zone du diagramme on les repère surtout."
    },
    function: {
      title: "Une famille surtout visible côté vapeur",
      body: "Les isochores forment généralement un réseau de courbes dans la zone vapeur. Leur pente les distingue des isobares horizontales et des isenthalpes verticales.",
      terrain: "Lien métier : comprendre comment la masse volumique de la vapeur évolue avec l’état thermodynamique.",
      narration: "C'est du côté vapeur que cette famille se remarque le plus : les isochores y dessinent, en général, tout un réseau de courbes. Pour ne pas les confondre avec d'autres lignes, leur inclinaison est le bon critère. Une isobare est horizontale, une isenthalpe verticale, et l'isochore, elle, penche. Sur le chantier, ces lignes aident à suivre l'évolution de la masse volumique de la vapeur selon son état thermodynamique. Les questions du module prennent le relais."
    },
    quiz: [
      {
        question: "Que conserve une isochore ?",
        choices: ["Le titre x", "Le volume massique v", "La température T"],
        answer: 1,
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
      remember: "ISEntrope : même entropie s. Référence de compression idéale.",
      narration: "L'entropie est une grandeur thermodynamique, mais ici on retient surtout l'usage qu'on en fait. Sur le schéma, la ligne en trait plein qui monte rassemble les points où l'entropie ne varie pas : c'est une isentrope. On s'en sert comme référence pour une compression idéale, autrement dit ce que ferait un compresseur parfait. Gardez cette idée en tête. L'écran suivant explique pourquoi on la compare à ce que fait un compresseur réel."
    },
    function: {
      title: "Une référence, pas une promesse",
      body: "Le compresseur réel n’est pas parfait. La compression isentropique sert de modèle de comparaison pour analyser l’écart entre le comportement idéal et le comportement réel.",
      terrain: "Lien métier : repérer la direction de la compression et comprendre pourquoi la température de refoulement augmente.",
      narration: "Le compresseur réel a ses imperfections. L'isentrope fournit le modèle idéal auquel on le compare. Ce qui intéresse, c'est la distance entre ce que ferait une machine parfaite et ce que fait la vraie. D'où le titre de l'écran : une référence, pas une promesse. Sur le chantier, elle sert à voir dans quel sens va la compression, et à comprendre la hausse de la température de refoulement. Les questions du module viennent ensuite."
    },
    quiz: [
      {
        question: "À quelle transformation associe-t-on surtout l’isentrope dans ce parcours ?",
        choices: ["Au tirage au vide", "À la pesée du fluide", "À la compression idéale"],
        answer: 2,
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
      remember: "ISenthalpe : même h. Sur le diagramme p-h : ligne verticale.",
      narration: "Rappelons où se lit l'enthalpie : à l'horizontale. Garder la même enthalpie, c'est donc rester au même endroit sur cet axe. Le seul déplacement possible est alors vers le haut ou vers le bas, ce qui change la pression sans changer l'enthalpie. D'où la ligne verticale tiretée que montre le schéma. L'objectif est de relier cette verticale à la détente qui se produit au détendeur, et l'écran suivant explique ce lien."
    },
    function: {
      title: "La forte chute de pression du détendeur",
      body: "Dans le modèle frigorifique courant, la détente au détendeur est représentée comme isenthalpique : la pression chute fortement tandis que l’enthalpie reste constante.",
      terrain: "Lien métier : reconnaître immédiatement le trait descendant associé au détendeur.",
      narration: "Dans la représentation habituelle du circuit frigorifique, la détente au détendeur se dessine sur une isenthalpe. La pression chute fortement, alors que l'enthalpie ne bouge pas. Comme la pression se lit en hauteur, on obtient un trait qui descend, sans déplacement sur le côté. Sur le chantier, ce trait descendant est celui qu'on associe au détendeur, et il faut le reconnaître immédiatement. Le repère à garder tient en quelques mots : enthalpie constante, donc ligne verticale. Les questions du module vous attendent."
    },
    quiz: [
      {
        question: "Quelle grandeur reste constante pendant une détente isenthalpique ?",
        choices: ["L’enthalpie", "La pression", "La température"],
        answer: 0,
        feedback: "Isenthalpique signifie : enthalpie h constante."
      },
      {
        question: "Quelle allure a une isenthalpe sur le diagramme p-h ?",
        choices: ["Une ligne horizontale", "Une boucle fermée", "Une ligne verticale"],
        answer: 2,
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

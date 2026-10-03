/* =====================================================================
   voyage-glissement.js — le récit de « Voyage dans tous ses états »,
   édition « le glissement de température »
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage-vis.js (une source pour le module,
   le film et la série), chargé À LA PLACE de voyage.js par
   voyage-glissement.html ; `dossier` dit où sont ses voix. Pas de livret
   (film + série + module, choix de Franck du 03/10) : `livret: ""`.
   CHOIX DE FRANCK (03/10, questions posées) : inerWeb, édition complète,
   fluide R407C, températures CHIFFRÉES (aucune pression chiffrée : pas de
   piège relatif / absolu).
   HÉROÏNE : une molécule de R134a (« la lente »), avec ses deux sœurs de
   mélange, R32 et R125 (« les pressées »). Installation : climatisation
   d'un grand bureau, circuit de base du premier voyage (8 organes).
   CHIFFRES : tous calculés par voyage-glissement/calcul-diagramme-glissement.py
   (CoolProp HEOS, R32/R125/R134a = 23/25/52 % en masse, ASHRAE 34) :
   BP : bulle −1,2 °C, rosée +5,0 °C (glissement 6,2 K) ; entrée évaporateur
   +0,3 °C, titre 0,26 ; mi-évaporateur ≈ +2,7 °C ; sortie +11 °C (surchauffe
   6 K) ; refoulement ≈ 62 °C ; HP : rosée 45,0 °C, bulle 40,1 °C (4,9 K) ;
   liquide 35 °C (sous-refroidissement 5 K). Seuls à la pression BP : R32
   −11,8 °C, R125 −6,3 °C, R134a +18,6 °C. Dernière goutte à la BP : 64 % de
   R134a (en moles) contre 44 % dans le mélange ; vapeur de la bouteille de
   charge à 20 °C : 50 % de R32 contre 38 % dans le liquide. R454C ≈ 8 K,
   R448A ≈ 6 K, R449A ≈ 5,7 K (tables SimuRézo), R410A ≈ 0,1 K, R507A ≈ 0.
   SOURCES : station « Pourquoi la température glisse ? » (pilote-fluides,
   packs/fluides/res/glissement-temperature : ses décisions métier sont
   reprises — personne ne part en entier d'abord, surchauffe sur la rosée,
   sous-refroidissement sur la bulle, l'évaporateur commence DANS la cloche),
   ses sources (Chemours, Copeland 95-14, Danfoss, BITZER, ASHRAE 34),
   HabFluide ch. 8, TP « Application sur les fluides zéotropiques R407C ».
   PRONONCIATION : les phrases à nom de fluide ou à °C ont leur forme dite
   ([écrit, dit]) : la voix ne lit ni « R407C » ni « −1 °C » à coup sûr.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-glissement-scenes-*.js) : ajouter une phrase décale tout.
   DIAGRAMME (écran partagé) : `diag: [w0, w1]` = position sur le cycle de
   donnees/voyage-glissement-diagramme.js (0 entrée évaporateur, 1 rosée BP,
   2 sortie évaporateur, 3 refoulement, 4 rosée HP, 5 bulle HP, 6 sortie
   condenseur, 7 = 0), `calques: { id: k }` = calque montré dès la phrase k.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "le glissement de température raconté par une molécule",
  edition: "le glissement",
  dossier: "voyage-glissement",
  film: "../voyage/glissement.html", livret: "", // pas de livret pour cette édition : le module n'affiche pas le bouton
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le circuit de base et le diagramme enthalpique",
    notions: [["Un mélange de trois fluides, chacun son caractère", "1"],
              ["Palier du corps pur, pente du mélange (à pression constante)", "2"],
              ["L'évaporateur commence dans la cloche, après la détente", "3"],
              ["Pourquoi la température glisse : la composition du liquide change", "4, 5"],
              ["Bulle, rosée, glissement = rosée − bulle", "6"],
              ["Surchauffe comptée depuis la rosée", "7"],
              ["Le condenseur glisse en descendant", "8"],
              ["Sous-refroidissement compté depuis la bulle", "9"],
              ["Charge en liquide, fuite et composition", "10"],
              ["Zéotropes, quasi-azéotropes, azéotropes, corps purs", "11"]],
    usage: "Ce voyage suppose connus le circuit de base (le premier « Voyage dans tous ses états ») et la lecture du diagramme enthalpique. Il se regarde d'un trait ou en trois temps : le phénomène (1 à 6), les mesures du technicien (7 à 9), la charge et les autres fluides (10, 11). Les températures sont celles d'un R407C de climatisation (rosée +5 °C à l'évaporateur, +45 °C au condenseur), calculées avec CoolProp ; les tables du fabricant font foi. Ce voyage ouvre le sujet sans remplacer le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de R134a et ses deux sœurs, le R32 et le R125, dans un circuit de climatisation au R407C : pourquoi un mélange bout en se réchauffant alors que la pression ne change pas, la bulle et la rosée sur le diagramme enthalpique, le condenseur qui glisse en descendant, la surchauffe comptée depuis la rosée, le sous-refroidissement depuis la bulle, la charge en liquide et les autres fluides qui glissent.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Températures calculées avec CoolProp (mélange R32 / R125 / R134a, 23 / 25 / 52 % en masse). Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "dans un mélange qui glisse", carte: null,
      phrases: [
        ["Bonjour. Je suis une molécule de R134a.", "Bonjour. Je suis une molécule de R cent trente-quatre A."],
        ["Mais je ne voyage pas seule : je fais partie d'un mélange, le R407C.", "Mais je ne voyage pas seule : je fais partie d'un mélange, le R quatre cent sept C."],
        ["Avec moi, deux autres sortes de molécules : le R32 et le R125.", "Avec moi, deux autres sortes de molécules : le R trente-deux et le R cent vingt-cinq."],
        "Aujourd'hui, nous refroidissons l'air d'un grand bureau : une installation de climatisation.",
        "Voici notre circuit : l'évaporateur, le compresseur, le condenseur, la bouteille, la ligne liquide et le détendeur.",
        "À droite, le diagramme enthalpique : à chaque pas, notre point y avance.",
        "Notre particularité : quand nous bouillons, notre température ne reste pas la même. Elle glisse.",
        "Suivez-nous : vous allez comprendre pourquoi, et ce que cela change pour le technicien."
      ] },
    { id: "caracteres", num: "1", titre: "Trois caractères", sous: "un seul mélange", carte: null,
      phrases: [
        "Dans le mélange, nous sommes toujours ensemble, bien mêlées : impossible de nous voir séparées.",
        ["En masse, il y a un peu moins d'un quart de R32, un quart de R125, et un peu plus de la moitié de R134a : moi, la plus nombreuse.", "En masse, il y a un peu moins d'un quart de R trente-deux, un quart de R cent vingt-cinq, et un peu plus de la moitié de R cent trente-quatre A : moi, la plus nombreuse."],
        "Mais chacune garde son caractère : à la même pression, seule, chacune bouillirait à une température bien à elle.",
        ["À la pression de notre évaporateur, le R32 seul bouillirait vers −12 °C.", "À la pression de notre évaporateur, le R trente-deux seul bouillirait vers moins douze degrés."],
        ["Le R125 seul, vers −6 °C.", "Le R cent vingt-cinq seul, vers moins six degrés."],
        ["Et moi, seule, vers +19 °C !", "Et moi, seule, vers plus dix-neuf degrés !"],
        ["Les molécules de R32 et de R125 passent en vapeur bien plus facilement que moi : ce sont les pressées. Moi, je suis la lente.", "Les molécules de R trente-deux et de R cent vingt-cinq passent en vapeur bien plus facilement que moi : ce sont les pressées. Moi, je suis la lente."],
        "Ensemble, nous bouillons entre les deux : ni aussi froid qu'elles, ni aussi chaud que moi."
      ],
      question: { q: "À la même pression, quelles molécules passent le plus facilement en vapeur ?",
        choix: [["Celles de R32 et de R125, les pressées.", 1],
                ["Celles de R134a.", 0],
                ["Toutes pareil : elles sont mélangées.", 0]],
        pourquoi: "Seul, à la pression de l'évaporateur, le R32 bouillirait vers −12 °C, le R125 vers −6 °C et le R134a vers +19 °C. Mélangées, les molécules gardent ce caractère : celles de R32 et de R125 passent en vapeur plus facilement." } },
    { id: "palier", num: "2", titre: "Palier ou pente", sous: "chauffer à pression constante", carte: null,
      phrases: [
        ["Faisons une expérience. Chauffons un liquide pur, du R134a seul, en gardant toujours la même pression.", "Faisons une expérience. Chauffons un liquide pur, du R cent trente-quatre A seul, en gardant toujours la même pression."],
        "D'abord, il se réchauffe : sa température monte.",
        "Puis il se met à bouillir. Tant qu'il reste du liquide, sa température ne bouge plus : c'est le palier.",
        "Quand la dernière goutte est partie, la vapeur se réchauffe à son tour.",
        "Recommençons avec notre mélange, toujours à la même pression.",
        "Il se réchauffe, puis la première bulle apparaît : il commence à bouillir.",
        "Mais cette fois, pendant qu'il bout, sa température continue de monter, doucement. Pas de palier : une pente.",
        "Cette montée de température pendant l'ébullition, à pression constante, c'est le glissement."
      ],
      question: { q: "On chauffe notre mélange à pression constante. Que fait sa température pendant qu'il bout ?",
        choix: [["Elle monte doucement : elle glisse.", 1],
                ["Elle reste constante, comme un corps pur.", 0],
                ["Elle baisse.", 0]],
        pourquoi: "À pression constante, un corps pur bout sans changer de température : c'est le palier. Notre mélange, lui, bout en se réchauffant peu à peu : c'est le glissement." } },
    { id: "detente", num: "3", titre: "La détente", sous: "l'entrée de l'évaporateur",
      carte: [13, 15], diag: [6, 7], puces: [["HP", "liquide"], ["BP", "¼ vapeur"]],
      phrases: [
        "Revenons dans le circuit. Nous sortons de la bouteille, liquides, et nous filons vers le détendeur.",
        "Le détendeur fait chuter notre pression : une partie du liquide s'évapore aussitôt, et ce qui reste se refroidit.",
        "À l'entrée de l'évaporateur, nous sommes déjà un quart de vapeur, et trois quarts de liquide.",
        ["Un thermomètre posé sur le tube, à l'entrée, marque environ 0 °C.", "Un thermomètre posé sur le tube, à l'entrée, marque environ zéro degré."],
        "Le manomètre, lui, indique la basse pression. Elle reste pratiquement la même tout le long de l'évaporateur.",
        "Sur le diagramme, notre point est descendu tout droit : même énergie, pression plus basse, et nous voilà dans la cloche."
      ],
      question: { q: "Juste après le détendeur, à l'entrée de l'évaporateur, dans quel état est le mélange ?",
        choix: [["Surtout liquide, avec déjà un peu de vapeur.", 1],
                ["Tout en vapeur.", 0],
                ["Tout en liquide, sans une bulle.", 0]],
        pourquoi: "En passant le détendeur, la pression chute : une partie du liquide s'évapore aussitôt. Ici, environ un quart de vapeur entre dans l'évaporateur avec trois quarts de liquide : le point est déjà dans la cloche." } },
    { id: "rythme", num: "4", titre: "Toutes ensemble", sous: "mais pas au même pas",
      carte: [0, 0.5], diag: [0, 0.5], puces: [["BP", "ébullition"], ["froid", "air refroidi"]],
      phrases: [
        "Dans l'évaporateur, l'air chaud du bureau nous donne sa chaleur. Nous bouillons.",
        "Regardez les bulles : toutes les sortes de molécules s'en vont dans la vapeur.",
        ["Mais pas au même rythme : les pressées, R32 et R125, quittent le liquide plus vite que moi.", "Mais pas au même rythme : les pressées, R trente-deux et R cent vingt-cinq, quittent le liquide plus vite que moi."],
        ["La vapeur qui se forme est donc plus riche en R32 et en R125.", "La vapeur qui se forme est donc plus riche en R trente-deux et en R cent vingt-cinq."],
        ["Et le liquide qui reste devient de plus en plus riche en R134a : en molécules comme moi.", "Et le liquide qui reste devient de plus en plus riche en R cent trente-quatre A : en molécules comme moi."],
        "Attention : aucune sorte ne part entièrement avant les autres. Nous partons toutes ; seules les proportions changent.",
        ["Or moi, je bous plus chaud. Un liquide plus riche en R134a a besoin d'une température un peu plus haute pour continuer à bouillir.", "Or moi, je bous plus chaud. Un liquide plus riche en R cent trente-quatre A a besoin d'une température un peu plus haute pour continuer à bouillir."]
      ],
      question: { q: "Pendant l'ébullition du R407C, que devient le liquide qui reste ?",
        choix: [["Il s'enrichit en R134a, la molécule lente.", 1],
                ["Il garde la même composition.", 0],
                ["Il ne contient plus que du R32.", 0]],
        pourquoi: "Les molécules de R32 et de R125 quittent le liquide plus vite que celles de R134a. Toutes partent, mais le liquide qui reste devient de plus en plus riche en R134a, qui bout plus chaud." } },
    { id: "glisse", num: "5", titre: "La température glisse", sous: "jusqu'à la dernière goutte",
      carte: [0.5, 1], diag: [0.5, 1], calques: { isoM1: 7, isoP5: 7 }, puces: [["BP", "pression constante"], ["chaud", "0 → 5 °C"]],
      phrases: [
        ["Plus nous avançons dans l'évaporateur, plus le liquide qui reste est riche en R134a.", "Plus nous avançons dans l'évaporateur, plus le liquide qui reste est riche en R cent trente-quatre A."],
        "Alors la température monte, doucement, pendant que la pression, elle, ne change pas.",
        ["Au milieu de l'évaporateur, le thermomètre marque près de 3 °C.", "Au milieu de l'évaporateur, le thermomètre marque près de trois degrés."],
        ["Voici la dernière goutte de liquide : c'est la plus riche en R134a.", "Voici la dernière goutte de liquide : c'est la plus riche en R cent trente-quatre A."],
        ["Quand elle s'évapore, le thermomètre marque 5 °C.", "Quand elle s'évapore, le thermomètre marque cinq degrés."],
        "Toute la vapeur a retrouvé la composition du mélange : nous voilà de nouveau bien mêlées.",
        ["De 0 à 5 °C, à la même pression : notre température a glissé.", "De zéro à cinq degrés, à la même pression : notre température a glissé."],
        "Sur le diagramme, regardez : dans la cloche, les lignes de même température sont penchées. En suivant notre pression, nous les avons traversées."
      ],
      question: { q: "Dans l'évaporateur, la basse pression ne change pas. Pourquoi la température monte-t-elle de 0 à 5 °C ?",
        choix: [["Le liquide qui reste s'enrichit en R134a, qui bout plus chaud.", 1],
                ["La pression monte en douce.", 0],
                ["Le thermomètre est mal posé.", 0]],
        pourquoi: "À pression constante, le liquide de R407C s'appauvrit en R32 et en R125 et s'enrichit en R134a, qui bout plus chaud : la température monte jusqu'à la dernière goutte. C'est le glissement." } },
    { id: "bulle-rosee", num: "6", titre: "Bulle et rosée", sous: "deux températures pour une pression",
      carte: [1, 1], diag: [1, 1], calques: { isoM1: 0, isoP5: 0 }, puces: [["BP", "bulle −1 °C"], ["BP", "rosée +5 °C"]],
      phrases: [
        "Pour une même pression, notre mélange a donc deux températures à connaître.",
        "La température de bulle : celle où la première bulle de vapeur apparaît dans le liquide.",
        "La température de rosée : celle où la dernière goutte de liquide disparaît.",
        "Sur le diagramme, la bulle se lit sur la courbe de gauche, la rosée sur la courbe de droite.",
        ["À notre basse pression, la bulle est à −1 °C, la rosée à +5 °C.", "À notre basse pression, la bulle est à moins un degré, la rosée à plus cinq degrés."],
        ["Le glissement, c'est l'écart entre les deux, à la même pression : rosée moins bulle. Ici, environ 6 degrés.", "Le glissement, c'est l'écart entre les deux, à la même pression : rosée moins bulle. Ici, environ six degrés."],
        ["Nous, nous sommes entrées à 0 °C, déjà dans la cloche : dans l'évaporateur, nous n'avons vu qu'une partie du glissement.", "Nous, nous sommes entrées à zéro degré, déjà dans la cloche : dans l'évaporateur, nous n'avons vu qu'une partie du glissement."],
        "Pour un corps pur, bulle et rosée sont à la même température : pas de glissement."
      ],
      question: { q: "Qu'appelle-t-on le glissement de température ?",
        choix: [["L'écart entre la rosée et la bulle, à la même pression.", 1],
                ["L'écart entre la haute et la basse pression.", 0],
                ["La surchauffe à la sortie de l'évaporateur.", 0]],
        pourquoi: "À une même pression, un mélange zéotrope commence à bouillir à sa température de bulle et finit à sa température de rosée. L'écart rosée − bulle, c'est le glissement : ici, environ 6 degrés." } },
    { id: "surchauffe", num: "7", titre: "La surchauffe", sous: "se compte depuis la rosée",
      carte: [1, 2], diag: [1, 2], puces: [["BP", "rosée +5 °C"], ["chaud", "sortie +11 °C"]],
      phrases: [
        "Toutes en vapeur, nous traversons les derniers tubes de l'évaporateur : nous nous réchauffons encore.",
        ["À la sortie, le thermomètre marque 11 °C.", "À la sortie, le thermomètre marque onze degrés."],
        "Le technicien veut connaître la surchauffe : de combien la vapeur est plus chaude que la fin de l'ébullition.",
        "La fin de l'ébullition, c'est la rosée. La surchauffe se compte donc depuis la rosée.",
        ["11 moins 5 : 6 degrés de surchauffe. C'est juste.", "Onze moins cinq : six degrés de surchauffe. C'est juste."],
        ["Avec la bulle, à −1 °C, il aurait trouvé 12 degrés : le double !", "Avec la bulle, à moins un degré, il aurait trouvé douze degrés : le double !"],
        "Il croirait le détendeur trop fermé, il l'ouvrirait, et risquerait d'envoyer du liquide au compresseur.",
        "Les manomètres électroniques savent afficher la rosée et la bulle : pour la surchauffe, lisez la rosée."
      ],
      question: { q: "Pour calculer la surchauffe d'un R407C, quelle température de saturation prend-on ?",
        choix: [["La température de rosée, à la basse pression.", 1],
                ["La température de bulle, à la basse pression.", 0],
                ["La température de condensation.", 0]],
        pourquoi: "La surchauffe se compte depuis la fin de l'ébullition, c'est-à-dire la rosée. Avec la bulle, on trouverait environ 6 degrés de trop, et l'on risquerait de trop ouvrir le détendeur." } },
    { id: "condenseur", num: "8", titre: "Le condenseur", sous: "le glissement à l'envers",
      carte: [2, 7], diag: [2, 5], calques: { iso45: 3, iso40: 6 }, puces: [["HP", "rosée 45 °C"], ["HP", "bulle 40 °C"]],
      phrases: [
        "Le compresseur nous aspire et nous comprime : notre pression et notre température montent.",
        ["Nous sortons à plus de 60 °C, vers le condenseur.", "Nous sortons à plus de soixante degrés, vers le condenseur."],
        "Dans le condenseur, l'air du dehors nous refroidit : nous allons redevenir liquides.",
        ["À la haute pression, la première goutte apparaît à 45 °C : c'est la rosée.", "À la haute pression, la première goutte apparaît à quarante-cinq degrés : c'est la rosée."],
        ["Cette fois, c'est moi, la lente, qui me condense le plus vite : les premières gouttes sont plus riches en R134a.", "Cette fois, c'est moi, la lente, qui me condense le plus vite : les premières gouttes sont plus riches en R cent trente-quatre A."],
        "Les pressées restent plus longtemps en vapeur : pour les faire passer en liquide, il faut descendre plus bas.",
        ["La température baisse donc, toujours à la même pression, jusqu'à la dernière bulle, à 40 °C : c'est la bulle.", "La température baisse donc, toujours à la même pression, jusqu'à la dernière bulle, à quarante degrés : c'est la bulle."],
        "Au condenseur aussi, la température glisse, mais en descendant : de la rosée vers la bulle."
      ],
      question: { q: "Dans le condenseur, à haute pression, comment évolue la température du R407C pendant qu'il se condense ?",
        choix: [["Elle baisse, de la rosée vers la bulle.", 1],
                ["Elle monte, de la bulle vers la rosée.", 0],
                ["Elle reste constante.", 0]],
        pourquoi: "Au condenseur, le trajet est inverse : la condensation commence à la rosée (45 °C ici) et finit à la bulle (40 °C). La température glisse en descendant." } },
    { id: "sous-refroidissement", num: "9", titre: "Le sous-refroidissement", sous: "se compte depuis la bulle",
      carte: [7, 8], diag: [5, 6], calques: { iso45: 0, iso40: 0 }, puces: [["HP", "bulle 40 °C"], ["liq", "liquide 35 °C"]],
      phrases: [
        "Toutes liquides, nous traversons le bas du condenseur : nous nous refroidissons encore.",
        ["Dans la ligne liquide, le thermomètre marque 35 °C.", "Dans la ligne liquide, le thermomètre marque trente-cinq degrés."],
        "Le sous-refroidissement, c'est de combien le liquide est plus froid que la fin de la condensation.",
        "La fin de la condensation, c'est la bulle. Le sous-refroidissement se compte donc depuis la bulle.",
        ["40 moins 35 : 5 degrés de sous-refroidissement.", "Quarante moins trente-cinq : cinq degrés de sous-refroidissement."],
        ["Avec la rosée, à 45 °C, on trouverait 10 degrés : encore le double.", "Avec la rosée, à quarante-cinq degrés, on trouverait dix degrés : encore le double."],
        ["On pourrait croire l'installation trop chargée, et retirer du fluide à tort.", "On pourrait croire l'installation trop chargée, et retirer du fluide, à tort."],
        "Retenez la paire : la surchauffe avec la rosée, le sous-refroidissement avec la bulle."
      ],
      question: { q: "Pour calculer le sous-refroidissement d'un R407C, quelle température de saturation prend-on ?",
        choix: [["La température de bulle, à la haute pression.", 1],
                ["La température de rosée, à la haute pression.", 0],
                ["La température d'évaporation.", 0]],
        pourquoi: "Le sous-refroidissement se compte depuis la fin de la condensation, c'est-à-dire la bulle. Avec la rosée, on trouverait environ 5 degrés de trop." } },
    { id: "charge", num: "10", titre: "Garder le bon mélange", sous: "la charge et les fuites", carte: null,
      phrases: [
        ["Dans une bouteille de R407C, il y a du liquide au fond, et de la vapeur au-dessus.", "Dans une bouteille de R quatre cent sept C, il y a du liquide au fond, et de la vapeur au-dessus."],
        ["Cette vapeur est plus riche en pressées, R32 et R125 ; le liquide, plus riche en R134a.", "Cette vapeur est plus riche en pressées, R trente-deux et R cent vingt-cinq ; le liquide, plus riche en R cent trente-quatre A."],
        ["Charger en vapeur enverrait trop de pressées dans le circuit, et laisserait trop de molécules lentes dans la bouteille.", "Si l'on chargeait en vapeur, on enverrait trop de pressées dans le circuit, et on laisserait trop de molécules lentes dans la bouteille."],
        "Un mélange qui glisse se charge donc toujours en liquide : par le robinet liquide, ou bouteille retournée, selon le modèle.",
        "Si l'on charge côté aspiration, on laisse entrer le liquide doucement, pour qu'il se vaporise avant le compresseur.",
        "Et en cas de fuite ? La vapeur qui s'échappe emporte un peu plus de pressées : le mélange peut changer.",
        "On répare d'abord la fuite. Puis on complète la charge, en liquide.",
        "Après une grosse fuite, on suit la consigne du fabricant : elle peut demander de tout récupérer et de recharger à neuf."
      ],
      question: { q: "Comment charge-t-on un mélange zéotrope comme le R407C ?",
        choix: [["En liquide, pour garder la bonne composition.", 1],
                ["En vapeur, c'est plus sûr pour le compresseur.", 0],
                ["Peu importe, c'est le même fluide.", 0]],
        pourquoi: "Dans la bouteille, la vapeur est plus riche en R32 et en R125 que le liquide. Charger en vapeur changerait la composition : on charge en liquide, et doucement si c'est côté aspiration." } },
    { id: "familles", num: "11", titre: "Qui glisse ?", sous: "les autres fluides", carte: null,
      phrases: [
        "Nous ne sommes pas le seul mélange qui glisse.",
        ["Le R448A, le R449A, le R454C, qui remplacent l'ancien R404A, glissent eux aussi, de plusieurs degrés.", "Le R quatre cent quarante-huit A, le R quatre cent quarante-neuf A, le R quatre cent cinquante-quatre C, qui remplacent l'ancien R quatre cent quatre A, glissent eux aussi, de plusieurs degrés."],
        ["D'autres mélanges glissent à peine, de quelques dixièmes de degré : on les dit quasi azéotropes, comme le R410A.", "D'autres mélanges glissent à peine, de quelques dixièmes de degré : on les dit quasi azéotropes, comme le R quatre cent dix A."],
        ["Un azéotrope, comme le R507A, se comporte comme un corps pur : en pratique, il ne glisse pas.", "Un azéotrope, comme le R cinq cent sept A, se comporte comme un corps pur : en pratique, il ne glisse pas."],
        ["Et les corps purs, comme le R134a seul, le R32 seul ou le R290, ne glissent pas : à pression constante, leur palier est bien plat.", "Et les corps purs, comme le R cent trente-quatre A seul, le R trente-deux seul ou le R deux cent quatre-vingt-dix, ne glissent pas : à pression constante, leur palier est bien plat."],
        ["Le nom vous aide : un mélange zéotrope porte un numéro en 400, comme le R407C ; un azéotrope, un numéro en 500.", "Le nom vous aide : un mélange zéotrope porte un numéro en quatre cents, comme le R quatre cent sept C ; un azéotrope, un numéro en cinq cents."]
      ],
      question: { q: "Lequel de ces fluides glisse de plusieurs degrés ?",
        choix: [["Le R449A.", 1],
                ["Le R134a.", 0],
                ["Le R507A.", 0]],
        pourquoi: "Le R449A est un mélange zéotrope (numéro en 400) : il glisse de plusieurs degrés. Le R134a est un corps pur, le R507A un azéotrope (numéro en 500) : en pratique, ils ne glissent pas." } },
    { id: "resume", num: "", titre: "Le glissement en quatre phrases", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le voyage en quatre phrases.",
        "Un mélange zéotrope bout, à pression constante, en se réchauffant : sa température glisse.",
        "Parce que les molécules pressées quittent le liquide plus vite : celui qui reste s'enrichit en molécules lentes, qui bouillent plus chaud.",
        "À une même pression : la bulle au début de l'ébullition, la rosée à la fin. Le glissement, c'est rosée moins bulle.",
        "Le technicien compte la surchauffe depuis la rosée, le sous-refroidissement depuis la bulle, et il charge en liquide.",
        "Bulle, rosée, et la charge en liquide : vous savez lire un mélange qui glisse."
      ],
      question: { q: "Pour un R407C, quelle paire est juste ?",
        choix: [["Surchauffe depuis la rosée, sous-refroidissement depuis la bulle.", 1],
                ["Surchauffe depuis la bulle, sous-refroidissement depuis la rosée.", 0],
                ["Les deux depuis la même température, au milieu.", 0]],
        pourquoi: "La surchauffe se compte depuis la fin de l'ébullition (la rosée), le sous-refroidissement depuis la fin de la condensation (la bulle). Les manomètres électroniques affichent les deux : on lit la bonne." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "Pourquoi la température glisse ?", h: "../packs/fluides/res/glissement-temperature/" },
    { t: "Surchauffe et sous-refroidissement", h: "../packs/fluides/res/surchauffe-sous-refroidissement-interactif/" },
    { t: "La relation pression-température", h: "../packs/fluides/res/pression-temperature-interactive/" }
  ]
};

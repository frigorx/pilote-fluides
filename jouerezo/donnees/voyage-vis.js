/* =====================================================================
   voyage-vis.js — le récit de « Voyage dans tous ses états », édition
   « compresseur à vis »
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage.js (une source pour le module,
   le film et la série), chargé À LA PLACE de voyage.js par
   voyage-vis.html ; `dossier` dit où sont ses voix. Pas de livret
   (choix de Franck, 03/10 : film + série + module) : `livret: ""`.
   MACHINE RACONTÉE : compresseur bi-vis, semi-hermétique, à injection
   d'huile (le plus courant en froid commercial et en eau glacée), sur
   les chambres froides d'un entrepôt. Mono-vis et compresseur ouvert
   seulement cités. Fluide NON nommé, comme le premier voyage : aucune
   pression ni température chiffrée (seule valeur : ≈ 3 000 tr/min, moteur
   deux pôles en 50 Hz ; réglage du tiroir « jusqu'à un quart environ »).
   FIL ROUGE : aspirer, enfermer, comprimer, refouler — sans clapet.
   Une gouttelette d'huile (ambre) croise l'héroïne au chapitre 5 :
   annonce du futur film sur le circuit d'huile ; l'orifice économiseur
   (chapitre 9) annonce le film sur le sous-refroidisseur de liquide.
   SOURCES : le fonds de Franck est maigre sur l'intérieur de la vis
   (comparatif des quatre compresseurs, stations compresseur et huile) :
   le contenu suit la pratique courante des constructeurs (semi-
   hermétiques à vis : filtre d'aspiration, moteur refroidi par les gaz
   aspirés, huile poussée par la différence de pression, tiroir commandé
   par l'huile et des électrovannes, clapet anti-retour au refoulement,
   contrôle du sens de rotation, chauffage d'huile, contrôleur de débit
   d'huile). À RELIRE PAR FRANCK avant les scènes.
   DROIT : comme l'original — l'idée, jamais le texte du livre.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-vis-scenes-*.js) : ajouter une phrase décale tout.
   DIAGRAMME (écran partagé, Franck 03/10) : `diag: [w0, w1]` = position sur
   le cycle de donnees/voyage-vis-diagramme.js (0 entrée évaporateur … 3
   aspiration des vis, 4 mi-compression, 5 refoulement … 9 = 0, on reboucle),
   `calques: { id: k }` = calque montré à partir de la phrase k.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "le compresseur à vis raconté par une molécule",
  edition: "compresseur à vis",
  dossier: "voyage-vis",
  film: "../voyage/vis.html", livret: "", // pas de livret pour cette édition : le module n'affiche pas le bouton
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le circuit de base",
    notions: [["Le principe : aspirer, enfermer, comprimer, refouler, sans clapet", "2 à 6, le tour"],
              ["Les rotors mâle et femelle, les alvéoles", "2, 3"],
              ["Les trois rôles de l'huile injectée", "5"],
              ["Le rapport de volume intégré (Vi)", "6"],
              ["Le réglage de puissance par le tiroir", "7"],
              ["Le séparateur d'huile et le retour de l'huile", "8"],
              ["L'orifice économiseur", "9"],
              ["L'arrêt : clapet anti-retour, sens de rotation, chauffage d'huile", "10"],
              ["Ce que le technicien surveille", "11"]],
    usage: "Ce voyage suppose connu le circuit de base (le premier « Voyage dans tous ses états »). Il se regarde d'un trait ou en trois temps : l'intérieur des vis (1 à 6), la puissance et l'huile (7 à 9), l'arrêt et la surveillance (10, 11). Le compresseur décrit est un modèle courant (deux vis, semi-hermétique, à injection d'huile) : la documentation du constructeur fait foi. Ce voyage ouvre le sujet sans remplacer le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de fluide frigorigène dans un compresseur à vis : le filtre et le moteur, les rotors mâle et femelle, l'alvéole qui se ferme sans clapet puis rétrécit, l'huile injectée, la fenêtre de refoulement et le Vi, le tiroir qui règle la puissance, le séparateur d'huile, l'économiseur, puis l'arrêt et ce que surveille le technicien.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "dans un compresseur à vis", carte: null,
      phrases: [
        "Bonjour. Je suis une molécule de fluide frigorigène.",
        "Aujourd'hui, je travaille dans une grosse installation : les chambres froides d'un entrepôt.",
        "Ici, il faut beaucoup de vapeur aspirée, des heures durant, sans à-coups.",
        "Voici mon circuit : l'évaporateur, le compresseur, le séparateur d'huile, le condenseur, la bouteille et le détendeur.",
        "À droite, le diagramme enthalpique : à chaque pas, mon point y avance, et dessine mon cycle.",
        "Le compresseur est à vis : pas de piston, pas de clapets. Deux vis qui tournent l'une dans l'autre.",
        "Et beaucoup d'huile : vous allez voir pourquoi.",
        "Suivez-moi : on entre dans la machine."
      ] },
    { id: "aspiration", num: "1", titre: "L'aspiration", sous: "le filtre et le moteur", organe: "compresseur", pres: 2,
      role: "aspire la vapeur et la comprime, d'un flot continu",
      carte: [1.6, 3.4], diag: [1.5, 3], puces: [["BP", "vapeur aspirée"], ["froid", "moteur refroidi"]],
      phrases: [
        "Voici le compresseur à vis. Il est semi-hermétique : le moteur et les vis partagent la même carcasse, fermée par des boulons.",
        "Son rôle : aspirer ma vapeur et la comprimer, d'un flot continu.",
        "J'arrive de l'évaporateur, en vapeur, par la vanne d'aspiration.",
        "Je traverse d'abord un filtre : il arrête les saletés du chantier.",
        "Puis je passe autour du moteur électrique. Il chauffe en tournant : je le refroidis au passage.",
        "Je me réchauffe un peu. Tant mieux : surtout, aucune goutte de liquide ne doit arriver aux vis.",
        "Devant moi, les deux vis."
      ],
      question: { q: "Dans ce compresseur semi-hermétique, que fait la vapeur aspirée avant d'arriver aux vis ?",
        choix: [["Elle refroidit le moteur électrique.", 1],
                ["Elle graisse les paliers.", 0],
                ["Elle chauffe l'huile.", 0]],
        pourquoi: "La vapeur aspirée passe autour du moteur et emporte sa chaleur. Elle arrive aux vis un peu réchauffée : c'est voulu, aucune goutte de liquide ne doit y entrer." } },
    { id: "vis", num: "2", titre: "Les deux vis", sous: "un mâle et une femelle",
      carte: [3.4, 3.5], diag: [3, 3], puces: [["BP", "rotor mâle"], ["BP", "rotor femelle"]],
      phrases: [
        "Voici les deux vis, qu'on appelle des rotors. Elles tournent l'une dans l'autre, dans un carter ajusté au plus près.",
        ["Le rotor mâle a des lobes bombés. C'est lui que le moteur fait tourner, à près de 3 000 tours par minute.", "Le rotor mâle a des lobes bombés. C'est lui que le moteur fait tourner, à près de trois mille tours par minute."],
        "Le rotor femelle a des creux. Les lobes du mâle s'y logent, et l'entraînent.",
        "Entre les lobes, les creux et le carter, il reste des poches : les alvéoles. C'est là que je vais voyager.",
        "Quand les vis tournent, chaque alvéole avance le long des rotors, du côté de l'aspiration vers le côté du refoulement.",
        "Les rotors ne se touchent presque pas : un film d'huile les sépare."
      ],
      question: { q: "Qui fait tourner le rotor femelle ?",
        choix: [["Le rotor mâle, à travers un film d'huile.", 1],
                ["Un second moteur électrique.", 0],
                ["La vapeur aspirée.", 0]],
        pourquoi: "Le moteur entraîne le rotor mâle. Ses lobes se logent dans les creux du rotor femelle et le font tourner ; un film d'huile évite que les deux rotors s'usent l'un contre l'autre." } },
    { id: "enfermee", num: "3", titre: "Je suis enfermée", sous: "l'alvéole se ferme",
      carte: [3.5, 3.5], diag: [3, 3], puces: [["BP", "alvéole fermée"]],
      phrases: [
        "Côté aspiration, les lobes sortent des creux : une alvéole s'ouvre, et grandit.",
        "J'y entre avec d'autres molécules de vapeur : on la remplit.",
        "Les vis tournent encore : l'alvéole a atteint sa plus grande taille, et elle quitte l'orifice d'aspiration.",
        "La voilà fermée : je suis enfermée avec mes voisines.",
        "Aucun clapet ne s'est fermé : c'est la forme des vis et du carter qui fait la porte."
      ],
      question: { q: "Comment l'alvéole se ferme-t-elle, côté aspiration ?",
        choix: [["En tournant, elle quitte l'orifice d'aspiration.", 1],
                ["Un clapet d'aspiration se ferme.", 0],
                ["Une électrovanne se ferme.", 0]],
        pourquoi: "Le compresseur à vis n'a pas de clapets. En tournant, l'alvéole quitte l'orifice d'aspiration : c'est la forme des vis et du carter qui l'enferme." } },
    { id: "compression", num: "4", titre: "La compression", sous: "l'alvéole rétrécit",
      carte: [3.5, 3.6], diag: [3, 4.6], puces: [["BP", "volume ↓"], ["HP", "pression ↑"]],
      phrases: [
        "Les vis tournent toujours. De l'autre côté, un lobe du mâle rentre dans un creux de la femelle.",
        "Mon alvéole avance vers le refoulement, et elle devient de plus en plus petite.",
        "On nous serre : ma pression monte, ma température aussi.",
        "Pendant ce temps, d'autres alvéoles se remplissent derrière moi : le débit est continu, sans à-coups.",
        "Ni piston qui va et vient, ni clapets : la machine vibre peu, et s'use peu.",
        "Comme dans tout compresseur : jamais de liquide ici. Il ne se comprime pas."
      ],
      question: { q: "Pourquoi la pression monte-t-elle dans l'alvéole ?",
        choix: [["Son volume diminue en avançant vers le refoulement.", 1],
                ["L'huile injectée la chauffe.", 0],
                ["Un piston la pousse.", 0]],
        pourquoi: "En tournant, les lobes du mâle rentrent dans les creux de la femelle : l'alvéole fermée avance et rétrécit. Moins de place pour la même vapeur : la pression monte." } },
    { id: "huile", num: "5", titre: "L'huile injectée", sous: "trois métiers",
      carte: [3.6, 3.6], diag: [4.6, 4.9], calques: { sansHuile: 4 }, puces: [["chaud", "huile injectée"]],
      phrases: [
        "Soudain, une pluie de gouttelettes entre dans mon alvéole : de l'huile, injectée sous pression.",
        "Une gouttelette d'huile vient se coller à la paroi, juste à côté de moi. Elle a trois métiers.",
        "Premier métier : étancher. Entre les vis et le carter, il reste un passage très fin ; l'huile le bouche, pour que nous ne fuyions pas en arrière.",
        "Deuxième métier : refroidir. Elle emporte une grande partie de la chaleur de la compression.",
        "Grâce à elle, je ne surchauffe pas, même quand on me serre fort.",
        "Troisième métier : graisser les paliers, sur lesquels tournent les vis.",
        "Beaucoup d'huile, donc. Il faudra la récupérer à la sortie."
      ],
      question: { q: "Quels sont les trois métiers de l'huile injectée dans les vis ?",
        choix: [["Étancher, refroidir, graisser.", 1],
                ["Comprimer, condenser, détendre.", 0],
                ["Filtrer, sécher, détendre.", 0]],
        pourquoi: "L'huile bouche les passages fins entre les vis et le carter (elle étanche), emporte la chaleur de la compression (elle refroidit) et graisse les paliers." } },
    { id: "refoulement", num: "6", titre: "Le refoulement", sous: "la fenêtre de sortie",
      carte: [3.6, 3.95], diag: [4.9, 5], calques: { sousCompression: 3, surCompression: 4 }, puces: [["HP", "refoulement"], ["HP", "Vi"]],
      phrases: [
        "Mon alvéole arrive au bout des vis. Elle découvre une fenêtre taillée dans le carter : l'orifice de refoulement.",
        "Je sors, poussée par le lobe qui finit de vider l'alvéole.",
        ["La place de cette fenêtre décide jusqu'où on me serre avant de me lâcher : c'est le rapport de volume intégré, le Vi.", "La place de cette fenêtre décide jusqu'où on me serre avant de me lâcher : c'est le rapport de volume intégré, le V i."],
        "Si la fenêtre s'ouvre trop tôt, je ne suis pas assez serrée : le gaz du refoulement revient brutalement dans l'alvéole.",
        "Si elle s'ouvre trop tard, on me serre plus que nécessaire : c'est de l'énergie perdue.",
        ["On choisit donc le Vi selon l'installation ; certains compresseurs le règlent tout seuls.", "On choisit donc le V i selon l'installation ; certains compresseurs le règlent tout seuls."]
      ],
      question: { q: "Que décide le rapport de volume intégré, le Vi ?",
        choix: [["Jusqu'où la vapeur est serrée avant d'être lâchée.", 1],
                ["La vitesse du moteur.", 0],
                ["La quantité d'huile injectée.", 0]],
        pourquoi: "La place de l'orifice de refoulement fixe jusqu'où l'alvéole rétrécit avant de s'ouvrir. Trop tôt, le gaz du refoulement revient dans l'alvéole ; trop tard, on comprime pour rien. Le Vi se choisit selon l'installation." } },
    { id: "tiroir", num: "7", titre: "Le tiroir", sous: "régler la puissance",
      carte: [3.5, 3.5], diag: [3, 3], puces: [["BP", "puissance : de 100 % à ¼"]],
      phrases: [
        "Le froid demandé change : la nuit, les portes des chambres restent fermées, il en faut moins.",
        "Sous les vis, une pièce peut glisser le long des rotors : le tiroir.",
        "Quand il recule, il ouvre une fenêtre vers l'aspiration : une partie de la vapeur repart avant d'être enfermée.",
        "Moins de vapeur enfermée, moins de travail : la puissance baisse, sans palier, jusqu'à un quart environ.",
        "C'est l'huile sous pression qui pousse le tiroir, commandée par des électrovannes.",
        "Au démarrage, le tiroir est au plus bas : le moteur démarre presque à vide.",
        "D'autres installations règlent la puissance autrement : elles font varier la vitesse du moteur, avec un variateur."
      ],
      question: { q: "Le tiroir recule. Que se passe-t-il ?",
        choix: [["Une partie de la vapeur repart à l'aspiration : la puissance baisse.", 1],
                ["Le moteur ralentit.", 0],
                ["La haute pression augmente.", 0]],
        pourquoi: "En reculant, le tiroir ouvre une fenêtre vers l'aspiration : une partie de la vapeur repart avant d'être enfermée. Le compresseur comprime moins de vapeur : sa puissance baisse, sans palier." } },
    { id: "separateur", num: "8", titre: "Le séparateur d'huile", sous: "chacun son chemin", organe: "separateurHuile", pres: 2,
      role: "sépare l'huile du fluide et la garde pour le compresseur",
      carte: [3.95, 6], diag: [5, 5], puces: [["HP", "vapeur → condenseur"], ["chaud", "huile → compresseur"]],
      phrases: [
        "Voici le séparateur d'huile, juste après le compresseur : un gros réservoir.",
        "Son rôle : séparer l'huile du fluide, et la garder pour le compresseur.",
        "J'y entre en brouillard : de la vapeur chaude, pleine de fines gouttelettes d'huile.",
        "Je ralentis et je tourne : les grosses gouttes, plus lourdes, tombent au fond.",
        "Les plus fines s'accrochent dans une cartouche de fibres, et ruissellent vers le bas.",
        "En bas, l'huile forme une nappe. Moi, je sors par le haut, presque sans huile, vers le condenseur.",
        "Poussée par la haute pression, l'huile repart vers le compresseur, à travers un filtre, et souvent un refroidisseur d'huile.",
        "Sans séparateur, l'huile irait se coller dans le condenseur et l'évaporateur, et le compresseur finirait à sec."
      ],
      question: { q: "Pourquoi le séparateur d'huile est-il indispensable sur un compresseur à vis ?",
        choix: [["Il récupère la grande quantité d'huile injectée et la renvoie au compresseur.", 1],
                ["Il sépare le liquide de la vapeur avant l'aspiration.", 0],
                ["Il refroidit le fluide avant le condenseur.", 0]],
        pourquoi: "Le compresseur à vis injecte beaucoup d'huile dans la vapeur. Le séparateur la récupère au refoulement et la renvoie, poussée par la haute pression, vers le compresseur. Sans lui, l'huile partirait dans les échangeurs et le compresseur manquerait d'huile." } },
    { id: "economiseur", num: "9", titre: "Une porte de plus", sous: "l'économiseur",
      carte: [6, 16.5], diag: [5, 12], calques: { eco: 2 }, puces: [["BP", "orifice économiseur"]],
      phrases: [
        "Je file au condenseur, je redeviens liquide, puis je passe la bouteille et le détendeur.",
        "Je bous dans l'évaporateur, et me revoilà à l'aspiration des vis.",
        "Cette fois, je remarque une porte de plus, sur le côté du carter : l'orifice économiseur.",
        "Il débouche dans une alvéole déjà fermée, au milieu de la compression.",
        "On y fait entrer de la vapeur qui vient d'un sous-refroidisseur de liquide.",
        "Le liquide qui part vers le détendeur est alors plus froid : le compresseur fait plus de froid, sans changer de taille.",
        "Sur le diagramme, mon entrée dans l'évaporateur glisse vers la gauche : chaque kilo de fluide y prend plus de chaleur.",
        "Ce sous-refroidisseur, c'est un autre voyage."
      ],
      question: { q: "Où arrive la vapeur qui entre par l'orifice économiseur ?",
        choix: [["Dans une alvéole déjà fermée, au milieu de la compression.", 1],
                ["Dans l'orifice d'aspiration.", 0],
                ["Dans le séparateur d'huile.", 0]],
        pourquoi: "L'orifice économiseur débouche dans une alvéole déjà fermée, au milieu de la compression. La vapeur qui y entre vient d'un sous-refroidisseur de liquide : le liquide envoyé au détendeur est plus froid, et le compresseur fait plus de froid." } },
    { id: "arret", num: "10", titre: "À l'arrêt", sous: "jamais à l'envers",
      carte: [3.9, 3.9], puces: [["HP", "clapet fermé"]],
      phrases: [
        "Le compresseur s'arrête.",
        "Derrière lui, la haute pression pousse : la vapeur voudrait revenir en arrière, à travers les vis.",
        "Elle ferait tourner les vis à l'envers, et les abîmerait.",
        "Un clapet anti-retour, au refoulement, ferme le passage.",
        "Même prudence au démarrage : un contrôleur du sens de rotation empêche le moteur de tourner à l'envers.",
        "Et pendant l'arrêt, une résistance garde l'huile au chaud, pour que le fluide ne vienne pas s'y mélanger."
      ],
      question: { q: "À quoi sert le clapet anti-retour au refoulement d'un compresseur à vis ?",
        choix: [["À empêcher les vis de tourner à l'envers à l'arrêt.", 1],
                ["À régler la puissance.", 0],
                ["À garder l'huile dans le séparateur.", 0]],
        pourquoi: "À l'arrêt, la haute pression pousse la vapeur à revenir à travers les vis : elle les ferait tourner à l'envers et les abîmerait. Le clapet anti-retour du refoulement l'en empêche." } },
    { id: "surveillance", num: "11", titre: "Ce que l'on surveille", sous: "l'œil du technicien",
      carte: [4.5, 4.5], diag: [5, 5], calques: { sansHuile: 3 }, puces: [["chaud", "huile"], ["HP", "température"]],
      phrases: [
        "Pour finir, voyons ce que le technicien surveille sur cette machine.",
        "Au voyant du séparateur : le niveau d'huile. Trop bas, le compresseur va manquer d'huile.",
        "Sur la ligne d'huile : le filtre. S'il se bouche, l'huile arrive mal ; un contrôleur de débit d'huile arrête alors la machine.",
        "Au refoulement : ma température. Trop haute, c'est souvent l'huile qui manque, ou qu'on me serre trop.",
        "À la mise en service : le sens de rotation, et l'intensité du moteur.",
        "Et à l'oreille : un bruit nouveau annonce souvent des paliers fatigués."
      ],
      question: { q: "La température de refoulement d'un compresseur à vis monte anormalement. Que vérifier d'abord ?",
        choix: [["L'arrivée de l'huile : niveau, filtre, débit.", 1],
                ["Le thermostat de la chambre froide.", 0],
                ["La bouteille de liquide.", 0]],
        pourquoi: "Dans un compresseur à vis, c'est l'huile injectée qui emporte la chaleur de la compression. Une température de refoulement trop haute fait d'abord penser à l'huile : niveau au voyant, filtre, débit." } },
    { id: "resume", num: "", titre: "Le voyage en quatre temps", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le voyage dans les vis.",
        "Aspirer : l'alvéole s'ouvre et se remplit.",
        "Enfermer : elle se ferme, sans aucun clapet.",
        "Comprimer : elle avance et rétrécit ; l'huile étanche et refroidit.",
        "Refouler : la fenêtre s'ouvre, je sors, et le séparateur reprend l'huile.",
        "Et le tiroir règle combien de vapeur on enferme : c'est la puissance.",
        "Aspirer, enfermer, comprimer, refouler : quatre temps, sans clapet, sans à-coups."
      ],
      question: { q: "Dans quel ordre l'alvéole travaille-t-elle ?",
        choix: [["Aspirer, enfermer, comprimer, refouler.", 1],
                ["Enfermer, aspirer, refouler, comprimer.", 0],
                ["Comprimer, aspirer, enfermer, refouler.", 0]],
        pourquoi: "L'alvéole s'ouvre et se remplit (aspirer), quitte l'orifice d'aspiration (enfermer), avance en rétrécissant (comprimer), puis découvre la fenêtre de refoulement (refouler)." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "Le compresseur : installer, régler, vérifier", h: "../packs/fluides/res/compresseur-interactif/" },
    { t: "Le séparateur d'huile", h: "../packs/fluides/res/separateur-huile-pedagogique/" },
    { t: "Le circuit d'huile", h: "../packs/fluides/res/circuit-huile-interactif/" }
  ]
};

/* =====================================================================
   voyage.js — le récit de « Voyage dans tous ses états »
   ---------------------------------------------------------------------
   RÔLE : UNE source pour les trois sorties (module, film, livret).
   Chaque scène : id, numéro, titre, sous-titre, puces d'état, trajet sur
   le circuit (points de passage de D.CIRCUIT_PTS), organe présenté par sa
   carte d'identité (symbole, rôle) pendant les `pres` premières phrases,
   question. Une phrase = "texte" (écrit et dit) ou ["écrit", "dit"]
   quand la voix doit lire autrement (codes de fluides, sigles).
   DROIT : idée déjà ancienne (A. Delalande, 1948, puis un feuilleton de la
   RPF dans les années 1980), texte écrit sans eux, personnage et scènes
   propres. Ne jamais y recopier.
   PIÈGES : (1) une phrase modifiée refait sa piste (outils/voyage-voix.py) ;
   (2) l'ORDRE des phrases porte les gestes des scènes (moteur/voyage-
   scenes-*.js les appellent par leur rang) : ajouter une phrase décale tout.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "le circuit frigorifique raconté par une molécule",
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  /* page de l'enseignant GÉNÉRIQUE (Franck, 03/10 : « pas de diplôme Éduc nat ») : vitrine publique, toutes formations */
  enseignant: {
    public: "toutes les formations du froid et de la climatisation",
    notions: [["Le rôle des quatre organes principaux, dans le sens du fluide", "1, 2, 3, 8"],
              ["La ligne liquide : bouteille, filtre déshydrateur, voyant, électrovanne", "4 à 7"],
              ["Les changements d'état : ébullition, condensation, surchauffe, sous-refroidissement", "1, 3, 8"],
              ["L'étanchéité, le PRP, la récupération du fluide", "9, 10"],
              ["Les familles de fluides, d'hier à demain", "la famille"],
              ["Le tour complet : absorber, comprimer, rejeter, détendre", "le tour"]],
    usage: "Le film dure 9 minutes. Il se regarde d'un trait, ou en trois temps avec une question entre chacun : les organes principaux (1 à 3), la ligne liquide et le détendeur (4 à 8), puis la fuite, la récupération et les fluides. Le module pose une question à chaque organe ; le livret se lit seul, un QR code par chapitre. Ce voyage ouvre le sujet : il ne remplace ni le cours ni les travaux pratiques."
  },
  /* logo du lycée en fin de vidéo : VIDE tant que la direction n'a pas donné son accord (un emplacement marqué
     le remplace). Le jour venu : logoLycee: "voyage/logos/logo-lycee-jacques-raynaud.png" (fichier à recopier depuis
     progression-2a-cap-ifca/logos/), puis node outils/voyage-film.mjs et refaire les rendus. */
  logoLycee: "",
  /* fin du film : une mention COURTE et lisible (relecture du 03/10) ; le crédit complet va dans la description
     (node outils/voyage-film.mjs --description) et reste en entier dans le module et le livret */
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "un circuit fermé", carte: null,
      phrases: [
        "Bonjour. Je suis une molécule de fluide frigorigène.",
        "Mon nom de code n'a pas d'importance : quel que soit le fluide, le voyage est le même.",
        "J'habite le circuit fermé d'une chambre froide.",
        "Je passe par quatre organes principaux : l'évaporateur, le compresseur, le condenseur et le détendeur.",
        "Sur mon chemin, d'autres organes m'aident : la bouteille de liquide, le filtre déshydrateur, le voyant et l'électrovanne.",
        "Je fais le tour sans jamais sortir. En principe.",
        "Suivez-moi : à chaque organe, je vous montre comment il marche."
      ] },
    { id: "evaporateur", num: "1", titre: "L'évaporateur", sous: "je prends la chaleur", organe: "evaporateur", pres: 2,
      role: "prend la chaleur de la chambre froide",
      carte: [0, 2], puces: [["BP", "basse pression"], ["froid", "très froide"]],
      phrases: [
        "Voici l'évaporateur. Il est accroché dans la chambre froide : des tubes en cuivre, des ailettes en aluminium et des ventilateurs.",
        "Son rôle : prendre la chaleur de la chambre.",
        "Entrons. J'arrive très froide, à basse pression, presque toute liquide.",
        "Le ventilateur pousse l'air de la chambre à travers les ailettes.",
        "Cet air est plus chaud que moi : je lui prends sa chaleur.",
        "Alors je bous : des bulles naissent en moi, comme dans l'eau d'une casserole, mais à très basse température.",
        "Me voilà devenue vapeur.",
        "Je me réchauffe même encore un peu : c'est la surchauffe.",
        "Elle garantit qu'aucune goutte de liquide n'arrive au compresseur."
      ],
      question: { q: "Dans l'évaporateur, que fait la molécule ?",
        choix: [["Elle prend la chaleur de l'air de la chambre et devient vapeur.", 1],
                ["Elle donne du froid à l'air de la chambre.", 0],
                ["Elle redevient liquide.", 0]],
        pourquoi: "Le froid ne se donne pas : on retire de la chaleur. La molécule la prend à l'air de la chambre, et cette chaleur la fait bouillir." } },
    { id: "compresseur", num: "2", titre: "Le compresseur", sous: "on me serre", organe: "compresseur", pres: 2,
      role: "aspire la vapeur et la comprime",
      carte: [2, 5], puces: [["BP", "basse pression"], ["HP", "haute pression"]],
      phrases: [
        "Voici le compresseur : c'est le cœur du circuit.",
        "Celui-ci est à pistons, entraînés par un moteur électrique, comme dans un moteur de voiture.",
        "Il m'aspire. Regardons au ralenti.",
        "Le piston descend : le clapet d'aspiration s'ouvre, et j'entre avec mes voisines.",
        "Le piston remonte : le clapet se ferme, la place diminue, on nous serre.",
        "Ma pression monte, et ma température aussi.",
        "En haut, le clapet de refoulement s'ouvre : je sors, vapeur très chaude, à haute pression.",
        "C'est ici que le circuit reçoit son énergie : celle du moteur électrique.",
        "Le compresseur ne doit aspirer que de la vapeur : un liquide ne se comprime pas, il casserait les clapets."
      ],
      question: { q: "Pourquoi le compresseur ne doit-il aspirer que de la vapeur ?",
        choix: [["Un liquide ne se comprime pas : il casserait les clapets.", 1],
                ["La vapeur est plus lourde que le liquide.", 0],
                ["Pour faire baisser la pression.", 0]],
        pourquoi: "Le piston serre la vapeur dans une place de plus en plus petite. Un liquide, lui, ne se laisse pas serrer : c'est le coup de liquide, et les clapets cassent." } },
    { id: "condenseur", num: "3", titre: "Le condenseur", sous: "je rends la chaleur", organe: "condenseur", pres: 2,
      role: "rejette la chaleur dehors",
      carte: [5, 7.6], puces: [["HP", "haute pression"], ["chaud", "très chaude"]],
      phrases: [
        "Voici le condenseur, dehors, sur le toit ou contre un mur.",
        "Comme l'évaporateur, il a des tubes, des ailettes et des ventilateurs, mais lui, il rejette la chaleur.",
        "Je suis brûlante, et l'air extérieur, poussé par le ventilateur, est plus frais que moi.",
        "Je lui donne ma chaleur : celle prise dans la chambre froide, et celle du compresseur.",
        "D'abord je refroidis.",
        "Puis des gouttes se forment : je redeviens liquide avec mes voisines, c'est la condensation.",
        "À la sortie, je refroidis encore un peu : c'est le sous-refroidissement.",
        "Il garantit que le détendeur ne recevra que du liquide."
      ],
      question: { q: "Au condenseur, à qui la molécule donne-t-elle sa chaleur ?",
        choix: [["À l'air extérieur, plus frais qu'elle.", 1],
                ["À l'air de la chambre froide.", 0],
                ["Au compresseur.", 0]],
        pourquoi: "La chaleur va toujours du plus chaud vers le plus froid. Au condenseur, la molécule est brûlante : l'air du dehors, plus frais, emporte sa chaleur." } },
    { id: "bouteille", num: "4", titre: "La bouteille de liquide", sous: "la réserve", organe: "bouteille", pres: 2,
      role: "garde une réserve de liquide",
      carte: [7.6, 8.5], puces: [["HP", "haute pression"], ["liq", "liquide"]],
      phrases: [
        "Voici la bouteille de liquide, qu'on appelle aussi le réservoir.",
        "C'est une réserve : la machine n'a pas toujours besoin de la même quantité de fluide.",
        "J'y tombe par le haut, et je rejoins le liquide qui attend au fond.",
        "La sortie, elle, part d'un tube plongeur qui descend jusqu'en bas.",
        "Comme ça, seul du liquide repart vers le détendeur, jamais de vapeur."
      ],
      question: { q: "À quoi sert le tube plongeur de la bouteille de liquide ?",
        choix: [["À ne laisser repartir que du liquide.", 1],
                ["À faire entrer la vapeur dans la bouteille.", 0],
                ["À vider la bouteille dans l'air.", 0]],
        pourquoi: "Le tube plongeur prend le fluide tout au fond, là où il est liquide. La vapeur, plus légère, reste en haut." } },
    { id: "filtre", num: "5", titre: "Le filtre déshydrateur", sous: "ni eau, ni saleté", organe: "filtre", pres: 2,
      role: "retient l'eau et les saletés",
      carte: [8.5, 9.5], puces: [["HP", "haute pression"], ["liq", "liquide"]],
      phrases: [
        "Voici le filtre déshydrateur.",
        "Une flèche sur son corps indique le sens de passage : on ne le pose jamais à l'envers.",
        "Dedans, des grains spéciaux boivent l'humidité, comme une éponge.",
        "Une goutte d'eau dans le circuit gèlerait dans le détendeur, et elle ferait de l'acide avec l'huile.",
        "Une grille retient aussi les saletés : copeaux de cuivre, poussières.",
        "Moi, je passe à travers, propre et sèche."
      ],
      question: { q: "Pourquoi le filtre déshydrateur retient-il l'eau ?",
        choix: [["Elle gèlerait dans le détendeur et ferait de l'acide avec l'huile.", 1],
                ["Pour refroidir le liquide.", 0],
                ["Pour faire monter la pression.", 0]],
        pourquoi: "L'eau n'a rien à faire dans le circuit : elle gèle au passage étroit du détendeur et attaque l'huile. Les grains du filtre la boivent." } },
    { id: "voyant", num: "6", titre: "Le voyant liquide", sous: "une fenêtre sur le circuit", organe: "voyant", pres: 2,
      role: "laisse voir le fluide passer",
      carte: [9.5, 10.5], puces: [["HP", "haute pression"], ["liq", "liquide"]],
      phrases: [
        "Voici le voyant liquide : une petite fenêtre sur le circuit.",
        "On y regarde passer le fluide, machine en marche.",
        "Si c'est plein et clair, comme maintenant, c'est bon signe. Mais ce n'est qu'un indice : on le confirme par des mesures.",
        "Si on voit passer des bulles, il manque peut-être du fluide, le filtre est peut-être bouché, ou le liquide n'est pas assez sous-refroidi.",
        "Au centre, une pastille change de couleur s'il y a de l'humidité : verte, c'est sec ; jaune, c'est humide.",
        "Moi, on me voit passer : plein, pas de bulles."
      ],
      question: { q: "Au voyant, on voit passer des bulles. Que peut-on penser ?",
        choix: [["Il manque peut-être du fluide, le filtre est bouché, ou le liquide n'est pas assez sous-refroidi.", 1],
                ["Il y a trop de fluide dans le circuit.", 0],
                ["La pastille est en panne.", 0]],
        pourquoi: "Au voyant, le fluide doit passer liquide, plein. Des bulles disent qu'une partie s'est déjà vaporisée : manque de fluide, filtre qui freine le passage, ou liquide pas assez sous-refroidi. Le voyant donne un indice ; les mesures confirment." } },
    { id: "electrovanne", num: "7", titre: "L'électrovanne", sous: "un robinet électrique", organe: "electrovanne", pres: 2,
      role: "ouvre ou ferme la ligne liquide",
      carte: [10.5, 12.5], puces: [["HP", "haute pression"], ["liq", "liquide"]],
      phrases: [
        "Voici l'électrovanne : un robinet commandé par l'électricité.",
        "En haut, une bobine. Dedans, un noyau en acier qui peut monter et descendre.",
        "Quand le thermostat demande du froid, la bobine reçoit du courant.",
        "Elle devient un aimant et soulève le noyau : le passage s'ouvre, je passe.",
        "Quand la chambre est assez froide, le courant est coupé : un ressort repousse le noyau, le passage se ferme.",
        "Le liquide ne descend plus vers l'évaporateur pendant l'arrêt."
      ],
      question: { q: "Que se passe-t-il quand la bobine de l'électrovanne n'a plus de courant ?",
        choix: [["Le noyau redescend : le passage se ferme.", 1],
                ["Le passage s'ouvre en grand.", 0],
                ["La bobine chauffe le fluide.", 0]],
        pourquoi: "Sans courant, plus d'aimant : le ressort pousse le noyau sur son siège et la ligne liquide est fermée." } },
    { id: "detendeur", num: "8", titre: "Le détendeur", sous: "le passage étroit", organe: "detendeur", pres: 2,
      role: "fait chuter la pression et dose le fluide",
      carte: [12.5, 15], puces: [["HP", "haute pression"], ["BP", "basse pression"]],
      phrases: [
        "Voici le détendeur thermostatique.",
        "Il a un bulbe, fixé à la sortie de l'évaporateur, et relié à sa tête par un tube fin : le capillaire.",
        "Derrière moi, la haute pression. Devant moi, le passage le plus étroit du circuit.",
        "Je me faufile par un trou minuscule, et ma pression chute d'un coup.",
        "Une partie de mes voisines se met à bouillir aussitôt, et nous voilà toutes très froides.",
        "Le bulbe surveille la sortie de l'évaporateur : si la surchauffe y est trop élevée, il pousse sur la membrane, et le détendeur ouvre davantage.",
        "Il garde ainsi la bonne surchauffe : l'évaporateur est bien rempli, sans liquide pour le compresseur.",
        "Et me revoilà à l'évaporateur. Je recommence, des milliers de tours, pendant des années."
      ],
      question: { q: "En sortie d'évaporateur, la surchauffe est trop élevée. Que fait le détendeur ?",
        choix: [["Il ouvre davantage, pour laisser passer plus de fluide.", 1],
                ["Il se ferme complètement.", 0],
                ["Il arrête le compresseur.", 0]],
        pourquoi: "Surchauffe trop élevée en sortie = l'évaporateur manque de fluide. Le bulbe pousse sur la membrane : le pointeau s'écarte, le détendeur ouvre davantage." } },
    { id: "fuite", num: "9", titre: "La fuite", sous: "une voisine s'échappe",
      carte: [9.2, 9.2], puces: [["fuite", "fuite"]],
      phrases: [
        "Un jour, un raccord se desserre, à force de vibrations.",
        "Ma voisine s'échappe par la fuite.",
        "Pour la machine, c'est une mauvaise nouvelle : un circuit fermé ne consomme pas de fluide.",
        "S'il en manque, on cherche pourquoi : le plus souvent, c'est une fuite. Et la machine fait de moins en moins de froid.",
        "Pour la planète aussi : dans l'air, ma voisine agit comme une couverture, elle retient la chaleur autour de la Terre.",
        ["Le PRP dit combien, comparé au CO2. Pour certains fluides, plusieurs milliers de fois plus.",
         "Le P R P dit combien, comparé au C O deux. Pour certains fluides, plusieurs milliers de fois plus."],
        "Voilà pourquoi on contrôle l'étanchéité des circuits, et pourquoi on répare avant de recharger."
      ],
      question: { q: "Un circuit manque de fluide. Que faut-il faire ?",
        choix: [["Chercher la cause, d'abord une fuite.", 1],
                ["Rien : le fluide s'use avec le temps.", 0],
                ["En rajouter chaque année, sans chercher.", 0]],
        pourquoi: "Le fluide tourne en rond sans s'user. S'il en manque, il est sorti quelque part, ou la charge de départ était trop faible : on cherche la fuite, on répare, puis on recharge." } },
    { id: "recuperation", num: "10", titre: "La récupération", sous: "jamais dans l'air",
      carte: [2.5, 2.5], puces: [["recup", "récupération"]],
      phrases: [
        "Des années plus tard, la machine s'arrête pour de bon.",
        "Personne n'a le droit de me relâcher dans l'air.",
        "Un technicien titulaire de son attestation d'aptitude branche une station de récupération.",
        "Elle m'aspire hors du circuit et me pousse dans une bouteille de récupération.",
        "Tout est noté sur la fiche d'intervention : combien de kilos, et où ils partent.",
        "Ensuite, deux chemins. Soit je suis régénérée : on me nettoie, et je repars dans une autre machine.",
        "Soit je suis détruite, dans une usine spéciale.",
        "Dans les deux cas, je ne finis pas dans l'air."
      ],
      question: { q: "La machine part à la casse. Que devient le fluide ?",
        choix: [["Il est récupéré en bouteille, puis régénéré ou détruit.", 1],
                ["On ouvre les vannes : il part dans l'air.", 0],
                ["Il reste dans la machine jusqu'à la déchetterie.", 0]],
        pourquoi: "Relâcher un fluide dans l'air est interdit. Il est récupéré, pesé, noté sur la fiche d'intervention, puis régénéré ou détruit." } },
    { id: "famille", num: "", titre: "La famille", sous: "d'hier à demain", carte: null,
      phrases: [
        "Avant de vous quitter, je vous présente ma famille.",
        ["Ma grand-mère, le R-12, était un CFC : elle abîmait la couche d'ozone, qui nous protège des rayons dangereux du soleil.",
         "Ma grand-mère, le R douze, était un C F C : elle abîmait la couche d'ozone, qui nous protège des rayons dangereux du soleil."],
        "En 1987, le protocole de Montréal a décidé d'arrêter ces fluides.",
        ["Mes parents, comme le R-134a ou le R-404A, sont des HFC : ils n'abîment plus l'ozone, mais ils réchauffent la planète s'ils s'échappent.",
         "Mes parents, comme le R cent trente-quatre A ou le R quatre cent quatre A, sont des H F C : ils n'abîment plus l'ozone, mais ils réchauffent la planète s'ils s'échappent."],
        "On les remplace peu à peu.",
        ["Les nouveaux s'appellent R-290, le propane, R-744, le CO2, R-717, l'ammoniac, ou encore les HFO.",
         "Les nouveaux s'appellent R deux cent quatre-vingt-dix, le propane, R sept cent quarante-quatre, le C O deux, R sept cent dix-sept, l'ammoniac, ou encore les H F O."],
        ["Leur PRP est faible, mais chacun a ses règles : certains brûlent, d'autres sont toxiques, d'autres travaillent à très haute pression.",
         "Leur P R P est faible, mais chacun a ses règles : certains brûlent, d'autres sont toxiques, d'autres travaillent à très haute pression."],
        "Une règle ne change jamais : un fluide reste dans son circuit."
      ],
      question: { q: "Pourquoi le R-12 a-t-il été arrêté ?",
        choix: [["Il abîmait la couche d'ozone.", 1],
                ["Il ne faisait pas assez de froid.", 0],
                ["Il était trop cher.", 0]],
        pourquoi: "Le R-12 est un CFC : en montant dans le ciel, il détruit la couche d'ozone. Le protocole de Montréal (1987) a arrêté ces fluides." } },
    { id: "resume", num: "", titre: "Le tour en quatre verbes", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le tour en quatre verbes.",
        "Dans l'évaporateur, j'absorbe la chaleur de la chambre.",
        "Dans le compresseur, on me comprime.",
        "Dans le condenseur, je rejette la chaleur dehors.",
        "Dans le détendeur, je me détends : ma pression chute.",
        "Absorber, comprimer, rejeter, détendre : et le tour recommence."
      ],
      question: { q: "Dans quel ordre la molécule fait-elle le tour ?",
        choix: [["Absorber, comprimer, rejeter, détendre.", 1],
                ["Comprimer, absorber, détendre, rejeter.", 0],
                ["Rejeter, absorber, détendre, comprimer.", 0]],
        pourquoi: "Évaporateur, compresseur, condenseur, détendeur : elle absorbe la chaleur, on la comprime, elle rejette la chaleur, elle se détend. Puis tout recommence." } }
  ],
  portes: [
    { t: "La croix du frigoriste", h: "../f/a-croix-frigoriste/" },
    { t: "Les compresseurs", h: "../f/a-compresseurs/" },
    { t: "Les trois zones du condenseur", h: "../f/a-condenseur-trois-zones/" },
    { t: "Le détendeur et sa régulation", h: "../f/a-detendeur-regulation/" },
    { t: "Surchauffe et sous-refroidissement", h: "../f/a-mesures-surchauffe-sous-refroidissement/" },
    { t: "Les points de fuite", h: "../f/a-points-de-fuite/" },
    { t: "L'échelle des PRP", h: "../f/a-prp-echelle/" },
    { t: "La récupération", h: "../f/a-recuperation/" },
    { t: "Les familles de fluides", h: "../f/a-familles-fluides/" }
  ]
};

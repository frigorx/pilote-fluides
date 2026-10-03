/* =====================================================================
   voyage-booster.js — le récit de « Voyage dans tous ses états », édition
   « centrale booster CO₂ »
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage.js (une source pour le module,
   le film et la série), chargé À LA PLACE de voyage.js par
   voyage-booster.html ; `dossier` dit où sont ses voix. Pas de livret
   (série « éditions du Voyage » : film + série + module) : `livret: ""`.
   Premier film de la série CO₂ élargie (Franck, 03/10 : « il n'y a pas que
   le CO₂ simple… élargir le cercle de toutes les centrales »).
   MACHINE RACONTÉE : la centrale booster CO₂ transcritique de supermarché
   (station co2-booster de la ligne CO₂ / R744) : étage basse température
   (BT, surgelés) qui refoule dans l'aspiration de l'étage moyenne
   température (MT, produits frais), refroidisseur de gaz, détendeur haute
   pression, bouteille intermédiaire, vanne de gaz de détente, détendeurs
   électroniques des meubles. Compression parallèle, éjecteur, adiabatique :
   seulement annoncés (films suivants).
   FIL ROUGE : trois chemins se rejoignent (aspiration MT), puis se séparent
   (bouteille). L'héroïne prend le plus long : celui du froid négatif.
   CHIFFRES (marque inerWeb, diagramme à PRESSIONS CHIFFRÉES : choix de
   Franck, 03/10) : point de fonctionnement de la station
   co2-booster-diagramme (relue par Franck) — BT −32 °C, MT −8 °C, bouteille
   38 bar, HP 90 bar, sortie du refroidisseur de gaz 35 °C — recalculé avec
   CoolProp (voyage-booster/calcul-diagramme-booster.py) : 13 bar (13,3) et
   28 bar (28,0) ABSOLUS, plus de 40 % de vapeur après le détendeur HP
   (41 %), refoulement MT plus de 100 °C (107), un seul étage plus de
   150 °C (151) et taux près de 7 (6,7). Point critique 31 °C / 73,8 bar
   (RELECTURE-METIER.md). Pas de température chiffrée au refoulement BT ni
   au mélange (elles dépendent des hypothèses du calcul).
   CORRIGÉ PAR RAPPORT AU FONDS : la station dit le mélange d'aspiration MT
   « plus chaud que chacun des trois débits » — impossible ; le récit dit
   « plus chaud que la seule vapeur des meubles positifs » (= sa question d-q2).
   DROIT : comme l'original — l'idée, jamais le texte du livre.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-booster-scenes-*.js) : ajouter une phrase décale tout.
   DIAGRAMME : `diag: [w0, w1]` = position sur le cycle de
   donnees/voyage-booster-diagramme.js (0 entrée évaporateur BT, 1 fin
   d'ébullition, 2 sortie évaporateur BT, 3 refoulement BT, 4 aspiration MT
   (mélange), 5 refoulement MT, 6 sortie du refroidisseur de gaz, 7 après le
   détendeur HP, 8 liquide de la bouteille, 9 = 0), `calques: { id: k }` =
   calque montré à partir de la phrase k (unEtage, MT, flash).
   CARTE : `carte: [w0, w1]` sur D.CIRCUIT_PTS de moteur/voyage-booster-dessin.js
   (0 → 15, le chemin de l'héroïne).
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "la centrale booster CO₂ racontée par une molécule",
  edition: "centrale booster CO₂",
  dossier: "voyage-booster",
  film: "../voyage/booster.html", livret: "", // pas de livret pour cette édition : le module n'affiche pas le bouton
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le premier voyage CO₂",
    notions: [["Deux froids, une centrale : l'étage basse température refoule dans l'aspiration moyenne température", "2, 3"],
              ["Pourquoi deux étages : le taux de compression et la température de refoulement", "3"],
              ["L'aspiration moyenne température : trois débits se mélangent", "4"],
              ["Le refroidisseur de gaz et le point critique sur le diagramme", "5, 6"],
              ["La haute pression réglée, la vapeur de détente", "7"],
              ["La bouteille intermédiaire et la vanne de gaz de détente", "8, 9"],
              ["Quatre niveaux de pression, quatre organes de réglage", "10, 11, le tour"]],
    usage: "Ce voyage suppose connu le premier voyage CO₂ (le point critique, le refroidisseur de gaz). Il se regarde d'un trait ou en trois temps : les deux étages (1 à 5), la haute pression et la bouteille (6 à 9), les meubles et le réglage (10, 11). Les chiffres sont des valeurs d'illustration, en bar absolus : la plaque et la documentation de l'installation font foi. Ce voyage ouvre le sujet sans remplacer le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de CO₂ dans la centrale booster d'un supermarché : l'étage basse température qui refoule dans l'aspiration moyenne température, trois chemins qui se rejoignent puis se séparent, le refroidisseur de gaz au-dessus du point critique, le détendeur haute pression, la bouteille intermédiaire et la vanne de gaz de détente — avec le cycle chiffré sur le diagramme enthalpique.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "dans une centrale booster", carte: null,
      phrases: [
        ["Bonjour. Je suis une molécule de CO₂ : le R744.", "Bonjour. Je suis une molécule de C O deux : le R sept cent quarante-quatre."],
        "Aujourd'hui, je travaille dans un grand supermarché.",
        "Ici, il faut deux froids : le froid positif pour les produits frais, et le froid négatif pour les surgelés.",
        "Une seule centrale fait les deux, avec un seul fluide : moi. On l'appelle une centrale booster.",
        "Voici le circuit : deux étages de compresseurs, un refroidisseur de gaz, une bouteille, et deux familles de meubles.",
        "À droite, le diagramme enthalpique. Les pressions y sont en bar absolus : un manomètre classique affiche environ un bar de moins.",
        "Trois chemins vont se rejoindre, puis se séparer. Moi, je prends le plus long : celui du froid négatif.",
        "Suivez-moi : je pars des surgelés."
      ] },
    { id: "evaporateur-bt", num: "1", titre: "L'évaporateur des surgelés", sous: "le froid négatif", organe: "evapBT", pres: 2,
      role: "prend la chaleur des meubles de surgelés",
      carte: [0, 2.4], diag: [0, 2], puces: [["froid", "−32 °C"], ["BP", "≈ 13 bar"]],
      phrases: [
        "Voici l'évaporateur d'un meuble de surgelés : des tubes, des ailettes et des ventilateurs.",
        "Son rôle : prendre la chaleur des surgelés.",
        ["J'y entre très froide, à −32 °C : surtout du liquide, avec un peu de vapeur.", "J'y entre très froide, à moins trente-deux degrés : surtout du liquide, avec un peu de vapeur."],
        ["Ma pression : 13 bar environ. C'est la plus basse de la centrale.", "Ma pression : treize bar environ. C'est la plus basse de la centrale."],
        "L'air du meuble est plus chaud que moi : je lui prends sa chaleur.",
        "Alors je bous : des bulles naissent en moi, et je deviens vapeur. Sur le diagramme, mon point traverse la cloche.",
        "Je me réchauffe encore de quelques degrés : c'est la surchauffe. Aucune goutte de liquide ne doit partir vers le compresseur."
      ],
      question: { q: "Dans l'évaporateur des surgelés, à −32 °C, quelle est à peu près la pression absolue du CO₂ ?",
        choix: [["Environ 13 bar.", 1],
                ["Environ 1 bar.", 0],
                ["Environ 90 bar.", 0]],
        pourquoi: "Même au froid négatif, le CO₂ travaille sous pression : environ 13 bar absolus à −32 °C. C'est la pression la plus basse de la centrale booster." } },
    { id: "compresseur-bt", num: "2", titre: "Le compresseur basse température", sous: "le premier étage", organe: "compBT", pres: 2,
      role: "remonte la vapeur des surgelés au froid positif",
      carte: [2.4, 3.6], diag: [2, 3], puces: [["BP", "13 bar"], ["BP", "28 bar"]],
      phrases: [
        "Voici le compresseur basse température. Souvent, ils sont plusieurs côte à côte, et travaillent ensemble.",
        "Son rôle : aspirer la vapeur des surgelés, et la remonter.",
        "Le piston descend : j'entre. Le piston remonte : on me serre.",
        ["Ma pression passe de 13 à 28 bar environ : un peu plus du double.", "Ma pression passe de treize à vingt-huit bar environ : un peu plus du double."],
        "Je me réchauffe en route : je ressors bien plus chaude que je ne suis entrée.",
        "Mais il ne m'envoie pas dehors, vers le refroidisseur de gaz.",
        "Il me refoule dans l'aspiration des compresseurs moyenne température. C'est tout le secret de la centrale booster."
      ],
      question: { q: "Dans une centrale booster, où refoulent les compresseurs basse température ?",
        choix: [["Dans l'aspiration des compresseurs moyenne température.", 1],
                ["Dans le refroidisseur de gaz.", 0],
                ["Dans la bouteille intermédiaire.", 0]],
        pourquoi: "C'est ce qui fait la centrale booster : le compresseur basse température remonte la vapeur jusqu'à la pression du froid positif, et les compresseurs moyenne température prennent le relais." } },
    { id: "booster", num: "3", titre: "Pourquoi « booster » ?", sous: "deux étages en série",
      carte: [3.6, 3.6], diag: [3, 3], calques: { unEtage: 2 }, puces: [["BP", "13 bar"], ["HP", "90 bar"]],
      phrases: [
        "Arrêtons-nous un instant. Pourquoi deux étages ?",
        ["Imaginez un seul compresseur, qui me remonterait d'un coup de 13 à 90 bar.", "Imaginez un seul compresseur, qui me remonterait d'un coup de treize à quatre-vingt-dix bar."],
        ["Sur le diagramme, son trait file loin à droite : je sortirais à plus de 150 °C.", "Sur le diagramme, son trait file loin à droite : je sortirais à plus de cent cinquante degrés."],
        ["Le taux de compression serait énorme, près de 7 : beaucoup trop pour un seul compresseur.", "Le taux de compression serait énorme, près de sept : beaucoup trop pour un seul compresseur."],
        ["En deux étages, chacun travaille dans une plage raisonnable : de 13 à 28 bar, puis de 28 à 90 bar.", "En deux étages, chacun travaille dans une plage raisonnable : de treize à vingt-huit bar, puis de vingt-huit à quatre-vingt-dix bar."],
        "Les deux étages travaillent en série : le premier pousse, le second prend le relais. Pousser, renforcer : en anglais, « to boost ».",
        "Pour le dépannage : un défaut sur l'étage moyenne température touche tout de suite le froid négatif. L'inverse n'est pas vrai."
      ],
      question: { q: "Pourquoi comprime-t-on en deux étages sur une centrale booster ?",
        choix: [["Un seul étage aurait un taux de compression énorme, et chaufferait trop.", 1],
                ["Pour faire travailler deux fluides différents.", 0],
                ["Parce que le CO₂ ne peut pas dépasser 28 bar.", 0]],
        pourquoi: "De 13 à 90 bar d'un coup, le taux de compression serait près de 7 et le refoulement dépasserait 150 °C. En deux étages en série, chaque compresseur travaille dans une plage raisonnable. Deux fluides différents, c'est une autre famille : la cascade." } },
    { id: "aspiration-mt", num: "4", titre: "L'aspiration moyenne température", sous: "trois chemins se rejoignent",
      carte: [3.6, 5.6], diag: [3, 4], calques: { MT: 3, flash: 4 }, puces: [["BP", "≈ 28 bar"]],
      phrases: [
        "Je sors du compresseur basse température, et j'arrive dans un gros tube : l'aspiration des compresseurs moyenne température.",
        "Ici, trois chemins se rejoignent.",
        "Le premier, c'est le mien : la vapeur du froid négatif, réchauffée par le premier étage.",
        ["Le deuxième arrive des meubles du froid positif : une vapeur froide, qui a bouilli à −8 °C, à la même pression que moi.", "Le deuxième arrive des meubles du froid positif : une vapeur froide, qui a bouilli à moins huit degrés, à la même pression que moi."],
        "Le troisième vient de la bouteille : de la vapeur de détente. Elle n'a refroidi aucun meuble. Nous verrons pourquoi.",
        "Nous nous mélangeons. Moi, je me refroidis au contact des deux autres : sur le diagramme, mon point recule vers la gauche.",
        "Le mélange reste plus chaud que la seule vapeur des meubles positifs. Ici, une aspiration un peu chaude n'est pas forcément un défaut."
      ],
      question: { q: "À l'aspiration des compresseurs moyenne température d'une booster, qu'est-ce qui se mélange ?",
        choix: [["La vapeur du froid positif, le refoulement basse température et la vapeur de détente.", 1],
                ["Seulement la vapeur des meubles du froid positif.", 0],
                ["Du liquide de la bouteille et de l'huile.", 0]],
        pourquoi: "Trois débits se rejoignent avant les compresseurs moyenne température. Le refoulement basse température réchauffe le mélange : il est plus chaud que la seule vapeur des meubles positifs, sans que ce soit un défaut." } },
    { id: "compresseur-mt", num: "5", titre: "Le compresseur moyenne température", sous: "le second étage", organe: "compMT", pres: 2,
      role: "comprime tout le fluide jusqu'à la haute pression",
      carte: [5.6, 7], diag: [4, 5], puces: [["BP", "28 bar"], ["HP", "90 bar"]],
      phrases: [
        "Voici les compresseurs moyenne température : le second étage.",
        "Son rôle : aspirer tout le fluide de la centrale, et le comprimer jusqu'à la haute pression.",
        "Tout passe par eux : le froid positif, le froid négatif, et la vapeur de détente.",
        ["On me serre de nouveau : de 28 à 90 bar environ, un peu plus du triple.", "On me serre de nouveau : de vingt-huit à quatre-vingt-dix bar environ, un peu plus du triple."],
        ["Je chauffe fort : je sors à plus de 100 °C.", "Je chauffe fort : je sors à plus de cent degrés."],
        "Me voilà au-dessus de mon point critique : ni liquide, ni vapeur. Je suis supercritique.",
        "Sur le diagramme, mon point est monté tout en haut, au-dessus du sommet de la cloche."
      ],
      question: { q: "Quels débits passent par les compresseurs moyenne température d'une booster ?",
        choix: [["Tous : froid positif, froid négatif et vapeur de détente.", 1],
                ["Seulement celui du froid positif.", 0],
                ["Seulement la vapeur de détente.", 0]],
        pourquoi: "Les compresseurs moyenne température aspirent le mélange des trois chemins : tout le fluide de la centrale passe par eux avant de partir vers le refroidisseur de gaz." } },
    { id: "refroidisseur", num: "6", titre: "Le refroidisseur de gaz", sous: "je refroidis sans me condenser", organe: "refroidisseur", pres: 2,
      role: "rejette dehors la chaleur des meubles et des compressions",
      carte: [7, 8.8], diag: [5, 6], puces: [["HP", "90 bar"], ["chaud", "sortie 35 °C"]],
      phrases: [
        "Voici le refroidisseur de gaz, posé sur le toit du magasin.",
        "Son rôle : rejeter dehors la chaleur prise dans tous les meubles, et celle des deux compressions.",
        ["Rappel de mon premier voyage : au-dessus de 31 °C et 73,8 bar, c'est mon point critique. Je ne sais plus me condenser.", "Rappel de mon premier voyage : au-dessus de trente et un degrés et soixante-treize virgule huit bar, c'est mon point critique. Je ne sais plus me condenser."],
        ["J'entre à plus de 100 °C, à 90 bar. L'air du dehors, à 30 °C, emporte ma chaleur.", "J'entre à plus de cent degrés, à quatre-vingt-dix bar. L'air du dehors, à trente degrés, emporte ma chaleur."],
        "Je refroidis, je deviens plus dense, mais je ne me condense pas : ni gouttes, ni nappe de liquide.",
        ["Je sors vers 35 °C, toujours supercritique. Sur le diagramme, mon point passe au-dessus de la cloche, sans y entrer.", "Je sors vers trente-cinq degrés, toujours supercritique. Sur le diagramme, mon point passe au-dessus de la cloche, sans y entrer."],
        "L'hiver, l'air est frais : je repasse sous le point critique, et l'échangeur redevient un condenseur."
      ],
      question: { q: "En été, sur le diagramme, où passe le trajet du refroidisseur de gaz ?",
        choix: [["Au-dessus de la cloche, sans y entrer.", 1],
                ["À travers la cloche, de droite à gauche.", 0],
                ["Sous la cloche, dans la zone du liquide.", 0]],
        pourquoi: "Au-dessus du point critique, 31 °C et 73,8 bar, le CO₂ ne peut plus se condenser : la ligne du refroidisseur passe au-dessus du sommet de la cloche. L'hiver, sous le point critique, elle traverse la cloche : l'échangeur condense." } },
    { id: "detendeur-hp", num: "7", titre: "Le détendeur haute pression", sous: "il choisit la haute pression", organe: "detendeurHP", pres: 2,
      role: "tient la haute pression et détend le fluide",
      carte: [8.8, 10.4], diag: [6, 7], puces: [["HP", "90 bar"], ["BP", "38 bar"]],
      phrases: [
        "Voici le détendeur haute pression : une vanne motorisée, pilotée par le régulateur de la centrale.",
        "Son rôle : tenir la haute pression à la bonne valeur, et me détendre.",
        "Le régulateur lit ma température à la sortie du refroidisseur de gaz, et en déduit la meilleure haute pression.",
        "Trop basse, le froid s'effondre. Trop haute, les compresseurs consomment pour rien.",
        ["Je passe le pointeau : ma pression chute de 90 à 38 bar.", "Je passe le pointeau : ma pression chute de quatre-vingt-dix à trente-huit bar."],
        ["Je repasse sous le point critique, en plein milieu de la cloche : plus de 40 % d'entre nous deviennent vapeur, d'un coup.", "Je repasse sous le point critique, en plein milieu de la cloche : plus de quarante pour cent d'entre nous deviennent vapeur, d'un coup."],
        "C'est la vapeur de détente. Elle ne refroidira aucun meuble : il va falloir s'en occuper."
      ],
      question: { q: "Juste après le détendeur haute pression, sur cet exemple, quelle part du CO₂ est déjà vapeur ?",
        choix: [["Plus de 40 %.", 1],
                ["Aucune : il est tout liquide.", 0],
                ["Tout : il est tout vapeur.", 0]],
        pourquoi: "La détente depuis 90 bar amène le fluide en plein milieu de la cloche : plus de 40 % du débit est déjà vapeur. Plus le fluide sort chaud du refroidisseur de gaz, plus il y en a." } },
    { id: "bouteille", num: "8", titre: "La bouteille intermédiaire", sous: "trois chemins se séparent", organe: "bouteille", pres: 2,
      role: "sépare le liquide de la vapeur de détente",
      carte: [10.4, 11.3], diag: [7, 8], puces: [["BP", "38 bar"], ["liq", "liquide en bas"]],
      phrases: [
        "Voici la bouteille intermédiaire, qu'on appelle aussi bouteille flash : un réservoir debout, aux parois épaisses.",
        "Son rôle : séparer le liquide de la vapeur de détente.",
        ["Elle travaille à 38 bar : la pression intermédiaire. Un niveau de pression de plus, entre la haute pression et les aspirations.", "Elle travaille à trente-huit bar : la pression intermédiaire. Un niveau de pression de plus, entre la haute pression et les aspirations."],
        "Le liquide tombe au fond : une nappe calme. J'y plonge. Sur le diagramme, mon point glisse jusqu'à la courbe du liquide.",
        "La vapeur, elle, reste en haut de la bouteille.",
        "Trois chemins partent d'ici : en haut, la vapeur de détente ; en bas, le liquide du froid positif, et celui du froid négatif.",
        "Je prendrai celui du froid négatif. Mais d'abord, regardons partir mes deux voisines."
      ],
      question: { q: "Dans la bouteille intermédiaire, par où part le liquide ?",
        choix: [["Par le bas, vers les détendeurs du froid positif et du froid négatif.", 1],
                ["Par le haut, vers l'aspiration des compresseurs.", 0],
                ["Vers le refroidisseur de gaz.", 0]],
        pourquoi: "Le liquide tombe au fond de la bouteille et part par le bas, vers les détendeurs des meubles. La vapeur reste en haut et prend un autre chemin." } },
    { id: "gaz-detente", num: "9", titre: "La vanne de gaz de détente", sous: "le raccourci de la vapeur", organe: "vanneGaz", pres: 2,
      role: "renvoie la vapeur de détente à l'aspiration moyenne température",
      carte: [11.3, 11.3], diag: [8, 8], calques: { flash: 2 }, puces: [["BP", "38 bar"], ["BP", "28 bar"]],
      phrases: [
        "Voici la vanne de gaz de détente : elle aussi est motorisée, pilotée par le régulateur.",
        "Son rôle : renvoyer la vapeur de détente vers l'aspiration moyenne température.",
        "Ma première voisine sort par le haut de la bouteille, en vapeur. Sur le diagramme, son chemin est en violet.",
        "Elle ne va pas dans les meubles : elle n'y ferait aucun froid, elle est déjà vapeur.",
        ["La vanne lui ouvre un raccourci : de 38 à 28 bar, elle file rejoindre l'aspiration. C'est le troisième chemin de tout à l'heure.", "La vanne lui ouvre un raccourci : de trente-huit à vingt-huit bar, elle file rejoindre l'aspiration. C'est le troisième chemin de tout à l'heure."],
        "Au passage, la vanne tient la pression de la bouteille : un seul organe, deux missions.",
        "Détendre pour recomprimer, c'est du travail perdu. D'autres centrales la reprennent par un compresseur parallèle, ou un éjecteur : d'autres voyages."
      ],
      question: { q: "Quelles sont les deux missions de la vanne de gaz de détente ?",
        choix: [["Renvoyer la vapeur de détente à l'aspiration, et tenir la pression de la bouteille.", 1],
                ["Régler la surchauffe des meubles, et la haute pression.", 0],
                ["Vidanger l'huile, et purger l'air.", 0]],
        pourquoi: "La vanne de gaz de détente court-circuite les meubles : la vapeur de détente rejoint directement l'aspiration moyenne température. En même temps, elle tient la pression de la bouteille intermédiaire." } },
    { id: "froid-positif", num: "10", titre: "Le froid positif", sous: "ma voisine part vers les produits frais", organe: "evapMT", pres: 3,
      role: "prend la chaleur des meubles de produits frais",
      carte: [12, 12], diag: [8, 8], calques: { MT: 3 }, puces: [["BP", "28 bar"], ["froid", "−8 °C"]],
      phrases: [
        "Ma deuxième voisine sort par le bas de la bouteille, liquide. Elle part vers le froid positif.",
        "Voici l'évaporateur d'un meuble de produits frais : la crèmerie, la charcuterie, les fruits et légumes.",
        "Son rôle : prendre la chaleur des produits frais.",
        ["Avant d'y entrer, ma voisine passe son détendeur : de 38 à 28 bar.", "Avant d'y entrer, ma voisine passe son détendeur : de trente-huit à vingt-huit bar."],
        ["Elle bout à −8 °C, se réchauffe un peu, et repart en vapeur vers l'aspiration moyenne température.", "Elle bout à moins huit degrés, se réchauffe un peu, et repart en vapeur vers l'aspiration moyenne température."],
        "C'est le deuxième chemin de tout à l'heure. Sur le diagramme, son trajet est en vert : plus court que le mien."
      ],
      question: { q: "Dans les meubles du froid positif d'une booster, à quelle pression bout le CO₂ ?",
        choix: [["Environ 28 bar, à −8 °C.", 1],
                ["Environ 13 bar, à −32 °C.", 0],
                ["Environ 90 bar.", 0]],
        pourquoi: "Les meubles du froid positif travaillent à la pression d'aspiration moyenne température : environ 28 bar absolus, pour une ébullition à −8 °C. Le froid négatif, lui, bout à environ 13 bar, à −32 °C." } },
    { id: "detendeur-bt", num: "11", titre: "Le détendeur des surgelés", sous: "quatre réglages, quatre missions", organe: "detendeurBT", pres: 3,
      role: "règle l'entrée du fluide dans l'évaporateur des surgelés",
      carte: [11.3, 15], diag: [8, 9], puces: [["BP", "38 bar"], ["BP", "13 bar"]],
      phrases: [
        ["À mon tour. Je sors par le bas de la bouteille, liquide, à 38 bar.", "À mon tour. Je sors par le bas de la bouteille, liquide, à trente-huit bar."],
        "Voici le détendeur du meuble de surgelés : électronique, piloté par le régulateur du meuble.",
        "Son rôle : régler la quantité de fluide qui entre dans l'évaporateur.",
        ["Le passage est étroit : ma pression tombe à 13 bar, et ma température à −32 °C.", "Le passage est étroit : ma pression tombe à treize bar, et ma température à moins trente-deux degrés."],
        "Il règle la surchauffe, avec une sonde de pression et une sonde de température à la sortie de l'évaporateur.",
        "Faisons le compte. Le détendeur haute pression tient la haute pression ; la vanne de gaz, la bouteille ; les détendeurs des meubles, leur surchauffe.",
        "Et les compresseurs de chaque étage tiennent leur basse pression, en changeant de vitesse, ou en se mettant en route par paliers.",
        "Me voilà revenue dans l'évaporateur des surgelés : le tour est bouclé."
      ],
      question: { q: "Sur une centrale booster, qui tient la pression de la bouteille intermédiaire ?",
        choix: [["La vanne de gaz de détente.", 1],
                ["Le détendeur haute pression.", 0],
                ["Les détendeurs des meubles.", 0]],
        pourquoi: "Chaque réglage a son organe : le détendeur haute pression tient la haute pression, la vanne de gaz de détente tient la bouteille, les détendeurs des meubles règlent la surchauffe, les compresseurs tiennent la basse pression de leur étage." } },
    { id: "resume", num: "", titre: "Le tour en deux étages", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le tour.",
        ["Dans les surgelés, je bous à 13 bar. Le premier étage me remonte à 28 bar.", "Dans les surgelés, je bous à treize bar. Le premier étage me remonte à vingt-huit bar."],
        "À l'aspiration moyenne température, trois chemins se rejoignent : le froid négatif, le froid positif, la vapeur de détente.",
        ["Le second étage nous porte à 90 bar. Le refroidisseur de gaz nous refroidit, sans nous condenser.", "Le second étage nous porte à quatre-vingt-dix bar. Le refroidisseur de gaz nous refroidit, sans nous condenser."],
        ["Le détendeur haute pression nous détend à 38 bar. La bouteille nous sépare, et trois chemins repartent.", "Le détendeur haute pression nous détend à trente-huit bar. La bouteille nous sépare, et trois chemins repartent."],
        ["Quatre pressions à repérer : 13, 28, 38 et 90 bar.", "Quatre pressions à repérer : treize, vingt-huit, trente-huit et quatre-vingt-dix bar."],
        "Deux étages en série, une seule haute pression : c'est la centrale booster."
      ],
      question: { q: "Sur une centrale booster, combien de niveaux de pression faut-il repérer ?",
        choix: [["Quatre : l'aspiration basse température, l'aspiration moyenne température, la bouteille, la haute pression.", 1],
                ["Deux : la basse pression et la haute pression.", 0],
                ["Un seul : la haute pression.", 0]],
        pourquoi: "La booster a deux aspirations (froid négatif et froid positif), une pression intermédiaire dans la bouteille, et une haute pression : quatre niveaux à repérer sur le schéma avant d'intervenir." } }
  ],
  portes: [
    { t: "Le premier voyage CO₂ : la centrale transcritique", h: "../voyage/module-co2.html" },
    { t: "La centrale booster", h: "../packs/fluides/res/co2-r744/index.html?e=booster" },
    { t: "Le booster sur le diagramme", h: "../packs/fluides/res/co2-r744/index.html?e=booster-diagramme" },
    { t: "Les familles d'architecture CO₂", h: "../packs/fluides/res/co2-r744/index.html?e=familles" },
    { t: "La haute pression optimale", h: "../packs/fluides/res/co2-r744/index.html?e=hp-optimale" },
    { t: "La ligne CO₂ / R744", h: "../packs/fluides/res/co2-r744/" }
  ]
};

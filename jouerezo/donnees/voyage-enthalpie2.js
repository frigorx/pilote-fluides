/* =====================================================================
   voyage-enthalpie2.js — le récit de « Voyage dans tous ses états »,
   édition « le diagramme enthalpique, niveau 2 » (version Découverte, R134a)
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage-enthalpie.js (une source pour le
   module, le film et la série), chargé par voyage-enthalpie2.html.
   Pas de livret (série : film + série + module) : `livret: ""`.
   SUJET : après le niveau 1, lire TOUTES les lignes du diagramme (cloche et
   point critique, isobares, isenthalpes, isothermes, isotitres, isentropes,
   isochores), puis tracer à la main le cycle d'une chambre froide au R134a
   à partir des relevés d'un technicien, et faire les calculs (écarts
   d'enthalpie, COP, taux de compression, débit massique, puissances).
   RÉCIT : voyage-enthalpie2/RECIT-A-RELIRE.md, validé par l'enseignant (le
   texte affiché est celui du récit, mot pour mot ; seule la forme DITE des
   phrases à chiffres change).
   CHIFFRES (voyage-enthalpie2/CHIFFRES.md, CoolProp 8.0.0, convention IIR) :
   relevés BP 1,0 bar rel (2,0 abs, évaporation -10,1 °C), HP 9,2 bar rel
   (10,2 abs, condensation 40,1 °C), aspiration -3 °C, refoulement 65 °C,
   sortie condenseur 35 °C. h1 398,6 ; h2 446,4 ; h2s 433,9 (53,2 °C) ;
   h3 = h4 = 249,0 kJ/kg ; x4 0,303. Les enthalpies DITES sont arrondies
   au kJ/kg (399, 446, 249) : 150, 47, 197 ; COP froid 3,2 ; COP chaud 4,2 ;
   taux 5,1 ; débit 0,02 kg/s (72 kg/h) pour 3 kW. Données du diagramme :
   donnees/voyage-enthalpie2-diagramme.js (engendré, ne pas éditer).
   DIAGRAMME : `diag: [w0, w1]` = position sur `chemin` (0 = point 1,
   1 = point 2 refoulement, 2 fin de désurchauffe, 3 liquide saturé,
   4 = point 3, 5 = point 4, 6 vapeur saturée, 7 = 0, on reboucle ; un tour
   complet depuis 4 = [5, 12]). Sans `diag`, la molécule est cachée.
   CALQUES : { id: k } = montré à partir de la phrase k (rang dans `phrases`).
   Les calques isobaresCycle, pt1 à pt4 et pt2s sont dessinés par
   moteur/voyage-enthalpie2-dessin.js (pas dans les données).
   SCÈNES : moteur/voyage-enthalpie2-scenes-a/b/c.js (bouche-trous pour
   l'instant : fond bleu pâle). PIÈGE : l'ORDRE des phrases porte les gestes
   des scènes et les calques : ajouter une phrase décale tout.
   SUITE : une version « Je réalise » en R32 suivra, sur les mêmes scènes.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "toutes les lignes du diagramme, et le tracé d'un circuit réel",
  edition: "le diagramme enthalpique, niveau 2",
  dossier: "voyage-enthalpie2",
  film: "../voyage/enthalpie2.html", livret: "",
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "Bac pro MFER et formations du froid, après le diagramme enthalpique de niveau 1",
    notions: [["Le point critique et les deux courbes de la cloche (liquide saturé, vapeur saturée)", "1"],
              ["Les isobares et les isenthalpes : évaporateur, condenseur, détendeur", "2"],
              ["Les isothermes : leur allure dans le liquide, sous la cloche et dans la vapeur", "3"],
              ["Les isotitres : la part de vapeur du mélange", "4"],
              ["Les isentropes : la compression idéale, comparée au compresseur réel", "5, 10"],
              ["Les isochores : le volume d'un kilo de vapeur, le volume aspiré", "6"],
              ["Les cinq relevés du technicien : deux pressions, trois températures", "7"],
              ["Du relatif à l'absolu, températures de saturation, surchauffe et sous-refroidissement", "8"],
              ["Placer les quatre points du cycle, dont le point 4 par h4 = h3", "9"],
              ["Tracer le cycle réel et le comparer à la compression idéale", "10"],
              ["Écarts d'enthalpie, COP froid et chaud, taux de compression", "11"],
              ["Du kilo à l'installation : débit massique et puissances", "12"]],
    usage: "Ce voyage suppose connu le diagramme enthalpique de niveau 1 (axes, cloche, quatre côtés du cycle). Les relevés sont ceux d'une chambre froide au R134a : basse pression 1 bar, haute pression 9,2 bar, aspiration -3 °C, refoulement 65 °C, sortie du condenseur 35 °C. Les valeurs lues sur le diagramme sont arrondies au kJ/kg, et les calculs sont faits avec ces valeurs lues. Il se regarde en deux temps : les lignes du diagramme (1 à 6), puis le tracé et les calculs (7 à 12), de préférence avec un diagramme vierge à remplir. Une version « Je réalise » en R32 suivra. Ce voyage ne remplace ni le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de R134a dans une chambre froide, avec à gauche la croix du frigoriste et à droite le diagramme enthalpique : le point critique, les isobares, les isenthalpes, les isothermes, les isotitres, les isentropes et les isochores, puis le tracé du cycle à partir des relevés d'un technicien, les calculs d'enthalpie, le COP, le taux de compression, le débit et les puissances.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Propriétés du R134a calculées avec CoolProp. Symboles d'après la planche Éduscol « Le circuit frigorifique ». Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon nouveau voyage", sous: "toutes les lignes du diagramme", carte: null,
      phrases: [
        ["Bonjour. Je suis une molécule de R134a, et je travaille dans une chambre froide.", "Bonjour. Je suis une molécule de R cent trente-quatre A, et je travaille dans une chambre froide."],
        "À gauche, mon circuit, dessiné en croix. À droite, le diagramme enthalpique.",
        "La dernière fois, vous avez vu les axes, la cloche et les quatre côtés du cycle.",
        "Aujourd'hui, nous lisons toutes les lignes du diagramme, une par une.",
        "Puis nous tracerons mon cycle à partir des relevés d'un technicien, et nous ferons les calculs."
      ] },
    { id: "cloche", num: "1", titre: "La cloche", sous: "et le point critique",
      carte: [14.5, 15], calques: { liquideSature: 1, vapeurSaturee: 2, pointCritique: 3 },
      phrases: [
        "La cloche est faite de deux courbes qui se rejoignent en haut.",
        "À gauche, la courbe de liquide saturé : sur elle, je suis tout liquide, et la première bulle de vapeur va naître.",
        "À droite, la courbe de vapeur saturée : sur elle, je suis toute vapeur, et la dernière goutte vient de disparaître.",
        ["Elles se rejoignent au point critique, vers 40 bar pour le R134a.", "Elles se rejoignent au point critique, vers quarante bars pour le R cent trente-quatre A."],
        "Au-dessus du point critique, on ne distingue plus le liquide de la vapeur. Une installation frigorifique travaille toujours en dessous."
      ],
      question: { q: "Sur la courbe de vapeur saturée, dans quel état est le fluide ?",
        choix: [["Toute vapeur : la dernière goutte de liquide vient de disparaître.", 1],
                ["Tout liquide : la première bulle va naître.", 0],
                ["Moitié liquide, moitié vapeur.", 0]],
        pourquoi: "La courbe de droite de la cloche marque la fin de l'évaporation. À gauche de la cloche, on a la courbe de liquide saturé, où la première bulle apparaît." } },
    { id: "isobares", num: "2", titre: "Isobares, isenthalpes", sous: "pression et énergie constantes",
      carte: [14.5, 15], calques: { isobares: 0, isenthalpes: 1 },
      phrases: [
        "Une isobare est une ligne où la pression ne change pas. Sur le diagramme, ce sont les lignes horizontales.",
        "Une isenthalpe est une ligne où l'enthalpie ne change pas. Ce sont les lignes verticales.",
        "Sur une isobare, je garde la même pression : c'est ce qui se passe dans l'évaporateur et dans le condenseur.",
        "Sur une isenthalpe, je garde la même énergie : c'est ce qui se passe dans le détendeur."
      ],
      question: { q: "Dans le détendeur, le point suit quelle ligne ?",
        choix: [["Une isenthalpe, verticale : l'enthalpie ne change pas.", 1],
                ["Une isobare, horizontale.", 0],
                ["La courbe de vapeur saturée.", 0]],
        pourquoi: "Le fluide traverse le détendeur sans recevoir ni rendre d'énergie. Son enthalpie reste la même : le point descend sur une ligne verticale, une isenthalpe." } },
    { id: "isothermes", num: "3", titre: "Les isothermes", sous: "la même température",
      carte: [14.5, 15], calques: { isothermes: 0 },
      phrases: [
        "Une isotherme relie les points qui ont la même température. Elle change d'allure selon la zone.",
        "Dans le liquide, à gauche, elle est presque verticale : serrer un liquide ne change presque pas son énergie.",
        "Sous la cloche, elle est horizontale : à pression constante, je change d'état sans changer de température.",
        "Sous la cloche, isotherme et isobare se confondent. Chaque pression a sa température d'évaporation.",
        "Dans la vapeur, à droite, l'isotherme redescend vers la droite.",
        ["Les isothermes sont notées en degrés : moins 20, 0, 20, 40, 60, 80.", "Les isothermes sont notées en degrés : moins vingt, zéro, vingt, quarante, soixante, quatre-vingts."]
      ],
      question: { q: "Sous la cloche, comment est l'isotherme ?",
        choix: [["Horizontale, confondue avec l'isobare.", 1],
                ["Presque verticale.", 0],
                ["Elle descend vers la droite.", 0]],
        pourquoi: "Sous la cloche, à pression constante, un corps pur change d'état à température constante. La ligne de même température est donc aussi la ligne de même pression : horizontale." } },
    { id: "isotitres", num: "4", titre: "Les isotitres", sous: "la part de vapeur",
      carte: [14.5, 15], calques: { isotitres: 0 },
      phrases: [
        "Sous la cloche, je suis un mélange. Le titre dit la part de vapeur dans ce mélange.",
        ["Titre 0, sur la courbe de liquide saturé : aucune vapeur. Titre 1, sur la courbe de vapeur saturée : toute vapeur.", "Titre zéro, sur la courbe de liquide saturé : aucune vapeur. Titre un, sur la courbe de vapeur saturée : toute vapeur."],
        ["Entre les deux, les isotitres partent du bas et montent vers le point critique : 0,1, 0,2, jusqu'à 0,9.", "Entre les deux, les isotitres partent du bas et montent vers le point critique : zéro virgule un, zéro virgule deux, jusqu'à zéro virgule neuf."],
        ["Un titre de 0,3 veut dire 30 % de vapeur et 70 % de liquide, en masse.", "Un titre de zéro virgule trois veut dire trente pour cent de vapeur et soixante-dix pour cent de liquide, en masse."]
      ],
      question: { q: "Un point est sous la cloche, sur l'isotitre 0,3. Que contient chaque kilo de fluide ?",
        choix: [["300 grammes de vapeur et 700 grammes de liquide.", 1],
                ["300 grammes de liquide et 700 grammes de vapeur.", 0],
                ["30 % d'huile.", 0]],
        pourquoi: "Le titre donne la part de vapeur. Titre 0,3 : 0,3 kg de vapeur pour 1 kg de mélange, donc 0,7 kg de liquide." } },
    { id: "isentropes", num: "5", titre: "Les isentropes", sous: "la compression idéale",
      carte: [14.5, 15], calques: { isentropes: 0 },
      phrases: [
        "Dans la vapeur, des lignes montent en penchant vers la droite : les isentropes.",
        "Une isentrope montre le chemin d'une compression idéale, sans frottement et sans perte de chaleur.",
        "Un vrai compresseur s'en écarte : il chauffe la vapeur un peu plus. Son point d'arrivée est plus à droite.",
        "Nous nous en servirons tout à l'heure, pour comparer mon vrai compresseur au compresseur idéal."
      ],
      question: { q: "À quoi sert une isentrope sur le diagramme ?",
        choix: [["Elle montre le chemin d'une compression idéale.", 1],
                ["Elle montre la détente.", 0],
                ["Elle montre la condensation.", 0]],
        pourquoi: "L'isentrope suit une compression sans frottement ni perte de chaleur. Un vrai compresseur arrive un peu plus à droite, car il chauffe davantage le gaz." } },
    { id: "isochores", num: "6", titre: "Les isochores", sous: "la place d'un kilo",
      carte: [14.5, 15], calques: { isochores: 0 },
      phrases: [
        "Dernières lignes, dans la vapeur et sous la cloche : les isochores, des lignes de même volume.",
        "Elles disent la place que prend un kilo de fluide, en mètres cubes par kilo.",
        "En bas du diagramme, la vapeur est peu serrée : un kilo prend beaucoup de place.",
        "C'est utile pour le compresseur : il aspire un volume. Plus la vapeur prend de place, moins il aspire de kilos à chaque tour."
      ],
      question: { q: "La pression d'aspiration baisse. Que devient le volume d'un kilo de vapeur aspirée ?",
        choix: [["Il augmente : le compresseur aspire moins de kilos à chaque tour.", 1],
                ["Il diminue.", 0],
                ["Il ne change pas.", 0]],
        pourquoi: "Moins serrée, la vapeur prend plus de place. Le compresseur aspire toujours le même volume, donc moins de masse de fluide." } },
    { id: "releves", num: "7", titre: "Les relevés", sous: "du technicien", organe: "compresseur", pres: 0,
      carte: [2, 2], puces: [["BP", "1 bar relatif"], ["HP", "9,2 bar relatif"]],
      phrases: [
        "Maintenant, le chantier. Le technicien branche son manifold et pose sa pince thermométrique.",
        ["Manomètre basse pression : 1 bar. Manomètre haute pression : 9,2 bar.", "Manomètre basse pression : un bar. Manomètre haute pression : neuf virgule deux bars."],
        ["Sur la tuyauterie d'aspiration, à l'entrée du compresseur : moins 3 degrés.", "Sur la tuyauterie d'aspiration, à l'entrée du compresseur : moins trois degrés."],
        ["Sur la tuyauterie de refoulement, à la sortie du compresseur : 65 degrés.", "Sur la tuyauterie de refoulement, à la sortie du compresseur : soixante-cinq degrés."],
        ["À la sortie du condenseur, sur le liquide : 35 degrés.", "À la sortie du condenseur, sur le liquide : trente-cinq degrés."],
        "Cinq relevés. Avec eux, nous allons placer mes quatre points."
      ],
      question: { q: "Où prend-on la température de refoulement ?",
        choix: [["Sur la tuyauterie à la sortie du compresseur.", 1],
                ["À l'entrée de l'évaporateur.", 0],
                ["Sur la bouteille de liquide.", 0]],
        pourquoi: "Le refoulement est la sortie du compresseur, où la vapeur est la plus chaude du circuit. On y pose la pince thermométrique." } },
    { id: "absolu", num: "8", titre: "Passer en absolu", sous: "lire les saturations",
      carte: [14.5, 15], calques: { isobaresCycle: 2, isothermes: 3 },
      puces: [["BP", "2 bar abs"], ["HP", "10,2 bar abs"]],
      phrases: [
        ["Les manomètres mesurent à partir de la pression de l'air, environ 1 bar. Le diagramme est en pression absolue.", "Les manomètres mesurent à partir de la pression de l'air, environ un bar. Le diagramme est en pression absolue."],
        ["J'ajoute 1 bar : la basse pression devient 2 bar absolus, la haute pression 10,2 bar absolus.", "J'ajoute un bar : la basse pression devient deux bars absolus, la haute pression dix virgule deux bars absolus."],
        "Je trace ces deux isobares sur le diagramme.",
        ["Là où l'isobare de 2 bar coupe la cloche, l'isotherme dit moins 10 degrés : c'est ma température d'évaporation.", "Là où l'isobare de deux bars coupe la cloche, l'isotherme dit moins dix degrés : c'est ma température d'évaporation."],
        ["À 10,2 bar, elle dit 40 degrés : c'est ma température de condensation.", "À dix virgule deux bars, elle dit quarante degrés : c'est ma température de condensation."],
        ["Surchauffe : moins 3 contre moins 10, soit 7 degrés de plus que l'évaporation.", "Surchauffe : moins trois contre moins dix, soit sept degrés de plus que l'évaporation."],
        ["Sous-refroidissement : 40 contre 35, soit 5 degrés de moins que la condensation.", "Sous-refroidissement : quarante contre trente-cinq, soit cinq degrés de moins que la condensation."]
      ],
      question: { q: "Évaporation à moins 10 degrés, aspiration à moins 3 degrés. Quelle est la surchauffe ?",
        choix: [["7 K.", 1],
                ["13 K.", 0],
                ["3 K.", 0]],
        pourquoi: "La surchauffe est l'écart entre la température d'aspiration et la température d'évaporation : −3 − (−10) = 7 K." } },
    { id: "points", num: "9", titre: "Placer les points", sous: "1, 2, 3 et 4",
      carte: [0, 0], puces: [["BP", "2 bar abs"], ["HP", "10,2 bar abs"]],
      calques: { isobaresCycle: 0, isothermes: 0, pt1: 0, pt2: 1, pt3: 2, detente: 4, pt4: 5, isotitres: 5 },
      phrases: [
        ["Point 1 : sur l'isobare basse pression, là où passe l'isotherme moins 3 degrés. Je suis vapeur, hors de la cloche. Je lis 399 kilojoules par kilo.", "Point un : sur l'isobare basse pression, là où passe l'isotherme moins trois degrés. Je suis vapeur, hors de la cloche. Je lis trois cent quatre-vingt-dix-neuf kilojoules par kilo."],
        ["Point 2 : sur l'isobare haute pression, à 65 degrés, entre les isothermes 60 et 80. Je lis 446 kilojoules par kilo.", "Point deux : sur l'isobare haute pression, à soixante-cinq degrés, entre les isothermes soixante et quatre-vingts. Je lis quatre cent quarante-six kilojoules par kilo."],
        ["Point 3 : sur l'isobare haute pression, dans le liquide, à 35 degrés. L'isotherme y est presque verticale. Je lis 249 kilojoules par kilo.", "Point trois : sur l'isobare haute pression, dans le liquide, à trente-cinq degrés. L'isotherme y est presque verticale. Je lis deux cent quarante-neuf kilojoules par kilo."],
        ["Point 4 : aucun relevé ne le place. Sous la cloche, une pression et une température ne suffisent pas.", "Point quatre : aucun relevé ne le place. Sous la cloche, une pression et une température ne suffisent pas."],
        ["Je descends donc tout droit depuis le point 3, sur l'isenthalpe 249, jusqu'à la basse pression.", "Je descends donc tout droit depuis le point trois, sur l'isenthalpe deux cent quarante-neuf, jusqu'à la basse pression."],
        ["Le point 4 tombe sur l'isotitre 0,3 : j'entre dans l'évaporateur avec 30 % de vapeur.", "Le point quatre tombe sur l'isotitre zéro virgule trois : j'entre dans l'évaporateur avec trente pour cent de vapeur."]
      ],
      question: { q: "Pourquoi ne peut-on pas placer le point 4 avec un relevé de pression et de température ?",
        choix: [["Il est sous la cloche : à une pression ne correspond qu'une température, quel que soit le titre.", 1],
                ["Le thermomètre ne mesure pas sous zéro.", 0],
                ["Le point 4 n'existe pas.", 0]],
        pourquoi: "Sous la cloche, pression et température sont liées. Elles ne disent pas la part de vapeur. On place le point 4 avec h4 = h3, sur la verticale du point 3." } },
    { id: "trace", num: "10", titre: "Tracer le cycle", sous: "relier les points dans l'ordre",
      carte: [0, 15], diag: [5, 12], puces: [["BP", "2 bar abs"], ["HP", "10,2 bar abs"]],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0, surchauffe: 1, compressionIdeale: 2, desurchauffe: 3, sousRefroidissement: 3, detente: 4 },
      phrases: [
        "Je relie les points dans l'ordre de mon voyage.",
        ["De 4 à 1, l'évaporateur, à droite sur la basse pression : la surchauffe se voit au bout, après la cloche.", "De quatre à un, l'évaporateur, à droite sur la basse pression : la surchauffe se voit au bout, après la cloche."],
        ["De 1 à 2, le compresseur. L'isentrope qui part du point 1 arrive à 53 degrés : mon vrai compresseur m'a chauffée jusqu'à 65.", "De un à deux, le compresseur. L'isentrope qui part du point un arrive à cinquante-trois degrés : mon vrai compresseur m'a chauffée jusqu'à soixante-cinq."],
        ["De 2 à 3, le condenseur, vers la gauche sur la haute pression : désurchauffe, condensation, sous-refroidissement.", "De deux à trois, le condenseur, vers la gauche sur la haute pression : désurchauffe, condensation, sous-refroidissement."],
        ["De 3 à 4, le détendeur, à la verticale. Le cycle est fermé.", "De trois à quatre, le détendeur, à la verticale. Le cycle est fermé."]
      ],
      question: { q: "Le point 2 réel est à droite de la fin de l'isentrope. Qu'est-ce que cela montre ?",
        choix: [["Le vrai compresseur chauffe la vapeur plus qu'un compresseur idéal.", 1],
                ["Le manomètre est faux.", 0],
                ["Le fluide est redevenu liquide.", 0]],
        pourquoi: "L'isentrope est la compression idéale. Le vrai compresseur a des frottements et s'échauffe : la vapeur sort plus chaude, 65 °C au lieu de 53 °C, et porte plus d'énergie." } },
    { id: "calculs", num: "11", titre: "Les calculs", sous: "écarts, COP, taux de compression",
      carte: [0, 0], diag: [12, 12], puces: [["froid", "150 kJ/kg"], ["chaud", "197 kJ/kg"]],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0 },
      phrases: [
        ["Évaporateur : 399 moins 249, chaque kilo prend 150 kilojoules à la chambre froide.", "Évaporateur : trois cent quatre-vingt-dix-neuf moins deux cent quarante-neuf, chaque kilo prend cent cinquante kilojoules à la chambre froide."],
        ["Compresseur : 446 moins 399, le moteur donne 47 kilojoules par kilo.", "Compresseur : quatre cent quarante-six moins trois cent quatre-vingt-dix-neuf, le moteur donne quarante-sept kilojoules par kilo."],
        ["Condenseur : 446 moins 249, chaque kilo rend 197 kilojoules dehors.", "Condenseur : quatre cent quarante-six moins deux cent quarante-neuf, chaque kilo rend cent quatre-vingt-dix-sept kilojoules dehors."],
        ["COP froid : 150 divisé par 47, environ 3,2. Le froid produit vaut un peu plus de trois fois l'énergie du compresseur.", "C O P froid : cent cinquante divisé par quarante-sept, environ trois virgule deux. Le froid produit vaut un peu plus de trois fois l'énergie du compresseur."],
        ["COP chaud : 197 divisé par 47, environ 4,2. Il sert quand on chauffe, avec une pompe à chaleur.", "C O P chaud : cent quatre-vingt-dix-sept divisé par quarante-sept, environ quatre virgule deux. Il sert quand on chauffe, avec une pompe à chaleur."],
        ["Taux de compression : la haute pression absolue divisée par la basse pression absolue, 10,2 divisé par 2, soit 5,1.", "Taux de compression : la haute pression absolue divisée par la basse pression absolue, dix virgule deux divisé par deux, soit cinq virgule un."],
        ["Toujours en absolu : avec les pressions des manomètres, on trouverait 9,2, un chiffre faux.", "Toujours en absolu : avec les pressions des manomètres, on trouverait neuf virgule deux, un chiffre faux."]
      ],
      question: { q: "Quel calcul donne le taux de compression de ce circuit ?",
        choix: [["10,2 ÷ 2,0 = 5,1, avec les pressions absolues.", 1],
                ["9,2 ÷ 1,0 = 9,2, avec les pressions des manomètres.", 0],
                ["10,2 − 2,0 = 8,2.", 0]],
        pourquoi: "Le taux de compression est le rapport des pressions absolues, haute pression divisée par basse pression. Les pressions relatives donnent un rapport faux." } },
    { id: "debit", num: "12", titre: "Du kilo à l'installation", sous: "débit et puissances",
      carte: [0, 0], diag: [12, 12], puces: [["froid", "3 kW"], ["chaud", "3,9 kW"]],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0 },
      phrases: [
        ["La chambre froide demande 3 kilowatts de froid.", "La chambre froide demande trois kilowatts de froid."],
        ["Chaque kilo de fluide apporte 150 kilojoules. Il faut donc 3 divisé par 150, soit 0,02 kilo par seconde : 72 kilos par heure.", "Chaque kilo de fluide apporte cent cinquante kilojoules. Il faut donc trois divisé par cent cinquante, soit zéro virgule zéro deux kilo par seconde : soixante-douze kilos par heure."],
        "C'est le débit massique, le nombre de kilos qui passent dans le circuit à chaque seconde.",
        ["Au compresseur : 0,02 fois 47, environ 0,94 kilowatt donnés au fluide.", "Au compresseur : zéro virgule zéro deux fois quarante-sept, environ zéro virgule quatre-vingt-quatorze kilowatt donnés au fluide."],
        ["Au condenseur : 0,02 fois 197, environ 3,9 kilowatts rendus dehors. C'est le froid produit plus l'énergie du compresseur.", "Au condenseur : zéro virgule zéro deux fois cent quatre-vingt-dix-sept, environ trois virgule neuf kilowatts rendus dehors. C'est le froid produit plus l'énergie du compresseur."]
      ],
      question: { q: "Le circuit doit produire 3 kW de froid et chaque kilo prend 150 kJ dans l'évaporateur. Quel est le débit massique ?",
        choix: [["0,02 kg/s, soit 72 kg/h.", 1],
                ["450 kg/s.", 0],
                ["0,2 kg/s.", 0]],
        pourquoi: "qm = puissance frigorifique ÷ Δh évaporateur = 3 kW ÷ 150 kJ/kg = 0,02 kg/s. Un kilowatt vaut un kilojoule par seconde." } },
    { id: "resume", num: "", titre: "La méthode en cinq gestes", sous: "l'essentiel à retenir",
      carte: [0, 15], diag: [5, 12],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0 },
      phrases: [
        "Pour tracer un cycle à partir d'un circuit réel : relever les deux pressions et les trois températures.",
        ["Ajouter 1 bar, tracer les deux isobares, lire les températures d'évaporation et de condensation.", "Ajouter un bar, tracer les deux isobares, lire les températures d'évaporation et de condensation."],
        "Calculer la surchauffe et le sous-refroidissement.",
        ["Placer 1, 2 et 3 hors de la cloche, puis 4 à la verticale du point 3.", "Placer un, deux et trois hors de la cloche, puis quatre à la verticale du point trois."],
        "Lire les enthalpies et faire les calculs."
      ],
      question: { q: "Quel point du cycle se place sans relevé de température ?",
        choix: [["Le point 4, à la verticale du point 3.", 1],
                ["Le point 1.", 0],
                ["Le point 2.", 0]],
        pourquoi: "Les points 1, 2 et 3 sont hors de la cloche : une pression et une température les placent. Le point 4 est sous la cloche : il se place par h4 = h3." } }
  ],
  portes: [
    { t: "Le diagramme enthalpique, niveau 1", h: "../voyage/enthalpie.html" },
    { t: "La croix du frigoriste", h: "../f/a-croix-frigoriste/" },
    { t: "Le diagramme enthalpique interactif", h: "../packs/fluides/res/diagramme-enthalpique/" }
  ]
};

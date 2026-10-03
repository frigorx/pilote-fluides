/* =====================================================================
   voyage-sous-refroidisseur.js — le récit de « Voyage dans tous ses
   états », édition « sous-refroidisseur de liquide »
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage-vis.js (une source pour le
   module, le film et la série), chargé par voyage-sous-refroidisseur.html.
   Pas de livret (série : film + série + module) : `livret: ""`.
   SUITE DU FILM « compresseur à vis » (chapitre 9, l'orifice économiseur :
   « Ce sous-refroidisseur, c'est un autre voyage »). Même installation :
   chambres froides d'un entrepôt, compresseur bi-vis à injection d'huile,
   séparateur d'huile, condenseur à air, bouteille, détendeur ; on y ajoute
   le sous-refroidisseur (échangeur à plaques) et son piquage. Le retour
   d'huile n'est pas dessiné sur la carte de cette édition (sujet d'un autre
   film) : la branche dessinée est celle du piquage.
   PÉRIMÈTRE (Franck, 03/10) : à quoi sert le sous-refroidissement (1-4),
   le sous-refroidisseur à économiseur en DEUX TOURS (5-10 : premier tour
   dans le liquide principal, second tour par le piquage), les autres
   façons seulement citées (11), la mesure (12).
   Fluide NON nommé, aucune pression ni température chiffrée ; seul
   chiffre : le repère usuel de 4 à 8 K en sortie de condenseur.
   SOURCES : le fonds de Franck pour le sous-refroidissement (HabFluide
   ch. 7 et 10, station surchauffe-sous-refroidissement-interactif,
   planche « condenseur, trois zones », voyant liquide : bulles, liquide
   pur au détendeur, 4 à 8 K, saturation − température réelle, point de
   bulle pour un mélange qui glisse). Le fonds est MAIGRE sur l'économiseur
   et muet sur les autres façons (échangeur liquide-aspiration, à eau,
   mécanique, économiseur à bouteille) ; la « bouteille d'injection »
   Thermador du fonds est un pot à glycol, hors sujet. Ces passages suivent
   la pratique courante des constructeurs de compresseurs à vis : piquage
   sur la ligne liquide, électrovanne, petit détendeur réglé sur la
   surchauffe de la vapeur sortant de l'échangeur, échangeur à plaques
   brasées à contre-courant, vapeur dans une alvéole déjà fermée, aspiration
   presque inchangée (Bitzer), puissance absorbée un peu plus forte, gain surtout quand
   l'écart BP / HP est grand. Le piquage est pris AVANT l'échangeur, comme
   sur le calque `eco` de l'édition vis (d'autres montages le prennent après :
   la documentation du constructeur fait foi). VÉRIFIÉ EN LIGNE (03/10, à la
   demande de Franck) : Bitzer BA-509-4 (CSH : part du débit venue du
   condenseur, détendue, qui s'évapore à contre-courant, vapeur surchauffée
   mélangée au débit de l'évaporateur ; clapet anti-retour au refoulement),
   Bitzer ST-610 (débit BP « presque constant », électrovanne en amont du
   détendeur d'ECO commandée avec le contacteur du compresseur, détendeur
   thermostatique au bulbe sur la ligne d'ECO, gain de puissance et de COP
   surtout en basse température) ; brevets US6374631 (piquage avant OU après
   l'échangeur, les deux existent).
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-sous-refroidisseur-scenes-*.js) : ajouter une phrase
   décale tout.
   DIAGRAMME : `diag: [w0, w1]` = position sur le cycle double de
   donnees/voyage-sous-refroidisseur-diagramme.js (0 sortie condenseur ·
   1 sortie sous-refroidisseur · 2 entrée évaporateur · 3 fin d'ébullition ·
   4 sortie évaporateur · 5 aspiration des vis · 6 alvéole devant l'orifice
   économiseur · 7 après le mélange · 8 refoulement · 9 début de
   condensation · 10 fin de condensation · 11 sortie condenseur — second
   tour, le piquage : 12 après le petit détendeur · 13 sortie de
   l'échangeur · 14 mélangée dans l'alvéole · 15 refoulement · 16, 17
   condensation · 18 = 0), `calques: { id: k }` = calque montré à partir
   de la phrase k.
   CARTE : `carte` sur D.CIRCUIT_PTS (0-17, voir le dessin de l'édition) ;
   100 et au-delà = la branche du piquage (100 le té, 101 le petit
   détendeur, 102 entrée de l'échangeur, 103 sortie, 104 orifice économiseur).
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "le sous-refroidisseur de liquide raconté par une molécule",
  edition: "sous-refroidisseur de liquide",
  dossier: "voyage-sous-refroidisseur",
  film: "../voyage/sous-refroidisseur.html", livret: "", // pas de livret pour cette édition
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le circuit de base et le compresseur à vis",
    notions: [["Les trois zones du condenseur, le sous-refroidissement", "1"],
              ["Plus de froid par kilo, sur le diagramme enthalpique", "2"],
              ["La vapeur de détente", "3"],
              ["Pas de bulles au détendeur : la marge de la ligne liquide", "4"],
              ["L'échangeur à plaques", "5"],
              ["Le liquide principal sous-refroidi", "6"],
              ["L'orifice économiseur et la pression intermédiaire", "7, 10"],
              ["Le piquage : électrovanne, petit détendeur, ébullition dans l'échangeur", "8, 9"],
              ["Les autres façons de sous-refroidir", "11"],
              ["Mesurer le sous-refroidissement", "12"]],
    usage: "Ce voyage fait suite au « compresseur à vis » (chapitre 9, l'économiseur) et suppose connu le circuit de base. Il se regarde d'un trait ou en trois temps : à quoi sert le sous-refroidissement (1 à 4), le sous-refroidisseur à économiseur en deux tours (5 à 10), les autres façons et la mesure (11, 12). Repères du référentiel des attestations d'aptitude : 1.02 (thermodynamique élémentaire : sous-refroidissement, effet de réfrigération) et 5.05 (état du fluide avant remplissage). Les montages décrits sont courants ; la documentation du constructeur fait foi. Ce voyage ouvre le sujet sans remplacer le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de fluide frigorigène dans le sous-refroidisseur de liquide d'une grosse installation à compresseur à vis : les trois zones du condenseur, plus de froid par kilo, la vapeur de détente, pas de bulles au détendeur, puis deux tours — dans le liquide principal qui se refroidit, et par le piquage qui bout dans l'échangeur à plaques et entre par l'orifice économiseur. Pour finir, les autres façons de sous-refroidir et la mesure du technicien.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "au sous-refroidisseur de liquide", carte: null,
      phrases: [
        "Bonjour. Je suis une molécule de fluide frigorigène.",
        "Je reviens dans l'entrepôt aux chambres froides, avec son compresseur à vis.",
        "La dernière fois, j'ai remarqué une porte de plus sur les vis : l'orifice économiseur.",
        "Aujourd'hui, je vais voir d'où vient la vapeur qui y entre : d'un sous-refroidisseur de liquide.",
        "Voici mon circuit, avec le sous-refroidisseur entre la bouteille et le détendeur.",
        "À droite, le diagramme enthalpique : à chaque pas, mon point y avance, et dessine mon cycle.",
        "Je vais faire deux tours : le premier dans le liquide principal, le second par une petite dérivation, le piquage.",
        "Suivez-moi : on commence au condenseur."
      ] },
    { id: "condenseur", num: "1", titre: "Le condenseur", sous: "trois zones", organe: "condenseur", pres: 2,
      role: "évacue la chaleur et rend le fluide liquide",
      carte: [6.4, 8.8], diag: [8, 11], puces: [["HP", "vapeur → liquide"], ["froid", "sous-refroidi"]],
      phrases: [
        "Voici le condenseur, sur le toit de l'entrepôt.",
        "Son rôle : évacuer la chaleur, et me rendre liquide.",
        "J'y entre en vapeur très chaude. D'abord, je refroidis sans changer d'état : c'est la désurchauffe.",
        "Puis je me condense, à pression constante. Pour un fluide pur, ma température ne bouge pas. C'est la plus grande partie de la batterie.",
        "À la dernière bulle, je suis toute liquide. Les derniers tubes me refroidissent encore un peu : c'est le sous-refroidissement.",
        "Un liquide sous-refroidi est plus froid que sa température de condensation, à la même pression.",
        "Mais le condenseur ne peut pas me rendre plus froide que l'air qui le traverse. Pour aller plus loin, il faut autre chose."
      ],
      question: { q: "Dans la dernière zone du condenseur, que se passe-t-il ?",
        choix: [["Le liquide se refroidit encore, sans changer d'état.", 1],
                ["La vapeur se condense.", 0],
                ["Le liquide se met à bouillir.", 0]],
        pourquoi: "Le condenseur a trois zones : la désurchauffe (la vapeur refroidit), la condensation (elle devient liquide), puis le sous-refroidissement (le liquide, déjà tout liquide, se refroidit encore)." } },
    { id: "plusDeFroid", num: "2", titre: "Plus de froid", sous: "pour chaque kilo",
      carte: [14, 15.4], diag: [0, 3], calques: { sansSR: 1, gain: 3 }, puces: [["froid", "plus de froid par kilo"]],
      phrases: [
        "Pourquoi vouloir un liquide encore plus froid ? Regardons le diagramme.",
        "Au détendeur, ma pression tombe d'un coup. Mon énergie ne change pas : sur le diagramme, mon point descend tout droit.",
        "Plus je suis froide avant le détendeur, plus mon point part de la gauche : j'entre dans l'évaporateur plus à gauche.",
        "Mon trajet dans l'évaporateur s'allonge : chaque kilo de fluide y prend plus de chaleur à la chambre froide.",
        "Le compresseur aspire toujours autant de vapeur : il fait donc plus de froid.",
        "Refroidir le liquide, c'est gagner du froid à bon compte."
      ],
      question: { q: "Le liquide arrive plus froid au détendeur. Que gagne-t-on ?",
        choix: [["Chaque kilo de fluide prend plus de chaleur dans l'évaporateur.", 1],
                ["Le compresseur aspire plus de vapeur.", 0],
                ["La haute pression baisse.", 0]],
        pourquoi: "Au détendeur, l'énergie du fluide ne change pas. Plus froid avant, il entre dans l'évaporateur avec moins d'énergie : il peut y prendre davantage de chaleur. Le compresseur aspire autant de vapeur : il fait plus de froid." } },
    { id: "vapeurDetente", num: "3", titre: "La vapeur de détente", sous: "du travail sans froid",
      carte: [15, 15.7], diag: [1, 2], calques: { sansSR: 0, detente: 3 }, puces: [["BP", "vapeur de détente ↓"]],
      phrases: [
        "Juste après le détendeur, autour de moi, une partie du liquide s'est vaporisée d'un coup.",
        "Cette vapeur de détente s'est formée en refroidissant le reste du liquide. Elle n'a rien pris à la chambre froide.",
        "Le compresseur doit pourtant l'aspirer, et la comprimer de nouveau : c'est du travail sans froid.",
        "Plus le liquide arrive froid, moins il se forme de vapeur de détente.",
        "Sur le diagramme, mon entrée dans l'évaporateur se rapproche du bord liquide de la cloche."
      ],
      question: { q: "D'où vient la vapeur qui sort du détendeur ?",
        choix: [["D'une partie du liquide, qui se vaporise en refroidissant le reste.", 1],
                ["De la chaleur de la chambre froide.", 0],
                ["D'une fuite du compresseur.", 0]],
        pourquoi: "Au détendeur, la pression tombe : une partie du liquide se vaporise, et ce faisant refroidit le reste jusqu'à la température de l'évaporateur. Cette vapeur de détente n'a pris aucune chaleur à la chambre froide, mais le compresseur doit l'aspirer quand même." } },
    { id: "bulles", num: "4", titre: "Pas de bulles", sous: "la ligne liquide",
      carte: [9.2, 15], diag: [1, 1], calques: { marge: 4 }, puces: [["liq", "liquide sans bulles"]],
      phrases: [
        "Entre la bouteille et le détendeur, la ligne liquide est longue : des tubes, un filtre, des coudes, parfois une montée.",
        "À chaque obstacle, ma pression baisse un peu.",
        "Si j'étais juste à ma température de condensation, la moindre baisse de pression ferait naître des bulles.",
        "Le détendeur recevrait un mélange de liquide et de vapeur : il alimenterait mal l'évaporateur.",
        "Sous-refroidie, j'ai de la marge : je reste liquide jusqu'au détendeur.",
        "Au voyant, le liquide passe clair, sans bulles."
      ],
      question: { q: "Pourquoi veut-on un liquide sous-refroidi à l'entrée du détendeur ?",
        choix: [["Pour qu'il ne se forme pas de bulles dans la ligne liquide.", 1],
                ["Pour graisser le détendeur.", 0],
                ["Pour faire monter la haute pression.", 0]],
        pourquoi: "Dans la ligne liquide, la pression baisse un peu à chaque obstacle. Un liquide juste à sa température de condensation y ferait des bulles, et le détendeur alimenterait mal l'évaporateur. Sous-refroidi, il garde de la marge et reste liquide." } },
    { id: "echangeur", num: "5", titre: "Le sous-refroidisseur", sous: "un échangeur à plaques", organe: "sousRefroidisseur", pres: 2,
      role: "refroidit le liquide qui part vers le détendeur",
      carte: [10.6, 12.5], diag: [0, 0], puces: [["HP", "liquide principal"], ["recup", "piquage"]],
      phrases: [
        "Voici le sous-refroidisseur, juste après la bouteille : un échangeur à plaques.",
        "Son rôle : refroidir le liquide qui part vers le détendeur.",
        "Dedans, des plaques d'acier inoxydable embouties, empilées et brasées.",
        "Entre les plaques, deux fluides passent, un canal sur deux, sans jamais se mélanger.",
        "D'un côté, le liquide principal, chaud. De l'autre, une petite part du même fluide, qui bout.",
        "Ils circulent en sens contraires : c'est ainsi qu'ils échangent le mieux.",
        "Ce fluide qui bout vient d'un piquage, pris sur la ligne liquide juste avant l'échangeur."
      ],
      question: { q: "Dans le sous-refroidisseur, comment les deux fluides échangent-ils leur chaleur ?",
        choix: [["À travers les plaques, sans se mélanger.", 1],
                ["En se mélangeant dans l'échangeur.", 0],
                ["Par l'huile du compresseur.", 0]],
        pourquoi: "L'échangeur à plaques fait passer les deux fluides un canal sur deux, en sens contraires. La chaleur traverse les plaques ; les fluides, eux, ne se mélangent jamais." } },
    { id: "premierTour", num: "6", titre: "Premier tour", sous: "le liquide principal",
      carte: [11, 17.5], diag: [0, 4], puces: [["HP", "liquide sous-refroidi"], ["BP", "plus de froid"]],
      phrases: [
        "Premier tour : je reste dans le liquide principal, avec presque tout le fluide.",
        "J'entre dans l'échangeur, par un canal sur deux.",
        "À travers la plaque, je donne ma chaleur au fluide qui bout de l'autre côté.",
        "Je ressors plus froide, toujours liquide : bien sous-refroidie.",
        "Je file au détendeur. Sur le diagramme, mon point descend, bien à gauche.",
        "Dans l'évaporateur, je prends plus de chaleur à la chambre froide. Puis je repars vers les vis."
      ],
      question: { q: "Dans l'échangeur, à qui le liquide principal donne-t-il sa chaleur ?",
        choix: [["Au fluide du piquage, qui bout de l'autre côté des plaques.", 1],
                ["À l'air de la chambre froide.", 0],
                ["À l'huile du séparateur.", 0]],
        pourquoi: "Le liquide principal traverse l'échangeur d'un côté des plaques ; de l'autre côté, le fluide du piquage bout et lui prend sa chaleur. Le liquide principal ressort sous-refroidi." } },
    { id: "lesVis", num: "7", titre: "Dans les vis", sous: "une vapeur arrive",
      carte: [3.1, 3.9], diag: [5, 8], calques: { pi: 3 }, puces: [["BP", "aspiration"], ["recup", "orifice économiseur"]],
      phrases: [
        "Me revoilà dans les vis, enfermée dans une alvéole.",
        "Au milieu de la compression, mon alvéole passe devant l'orifice économiseur.",
        "De la vapeur entre : celle qui a bouilli dans l'échangeur. Nous voilà plus nombreuses, et la compression continue.",
        "Sur le diagramme, une troisième pression apparaît : la pression intermédiaire, entre la basse et la haute.",
        "L'aspiration, elle, ne perd presque rien : le compresseur aspire toujours à peu près autant de vapeur à l'évaporateur.",
        "Au refoulement, nous sortons ensemble, vers le séparateur d'huile et le condenseur."
      ],
      question: { q: "La vapeur de l'économiseur entre au milieu de la compression. Que devient l'aspiration ?",
        choix: [["Presque rien ne change : le compresseur aspire à peu près autant de vapeur à l'évaporateur.", 1],
                ["Elle diminue de moitié.", 0],
                ["Elle s'arrête.", 0]],
        pourquoi: "L'orifice économiseur débouche dans une alvéole déjà fermée. La vapeur qui y entre s'ajoute à celle de l'évaporateur sans lui prendre de place : l'aspiration ne change presque pas." } },
    { id: "piquage", num: "8", titre: "Second tour", sous: "je prends le piquage",
      carte: [100, 101.6], diag: [8, 12], calques: { pi: 0 }, puces: [["recup", "piquage"], ["recup", "pression intermédiaire"]],
      phrases: [
        "Je repasse par le condenseur et la bouteille. Me voici de nouveau liquide, devant l'échangeur.",
        "Cette fois, au té, je suis prise par le piquage : une petite part du liquide part de côté.",
        "Une électrovanne ouvre ce passage quand le compresseur tourne.",
        "Puis un petit détendeur : ma pression tombe, mais pas jusqu'à la basse pression. Elle s'arrête à la pression intermédiaire.",
        "Autour de moi, une partie du liquide se vaporise déjà : liquide et vapeur mêlés, plus froids.",
        "Sur le diagramme, mon point descend tout droit, et s'arrête sur la ligne intermédiaire."
      ],
      question: { q: "Jusqu'où le petit détendeur du piquage fait-il tomber la pression ?",
        choix: [["Jusqu'à la pression intermédiaire, entre la basse et la haute.", 1],
                ["Jusqu'à la basse pression de l'évaporateur.", 0],
                ["Il ne change pas la pression.", 0]],
        pourquoi: "Le petit détendeur du piquage détend le liquide jusqu'à la pression intermédiaire, celle de l'orifice économiseur. Le fluide y bout à une température plus haute que dans l'évaporateur, mais plus basse que celle du liquide principal." } },
    { id: "ebullition", num: "9", titre: "Je bous dans l'échangeur", sous: "de l'autre côté des plaques",
      carte: [102, 103], diag: [12, 13], calques: { pi: 0 }, puces: [["recup", "je bous"], ["froid", "liquide refroidi"]],
      phrases: [
        "J'entre dans l'échangeur, de l'autre côté des plaques.",
        "En face, à travers la plaque, passe le liquide principal, plus chaud que moi.",
        "Je lui prends sa chaleur : je bous, et lui se refroidit.",
        "À la sortie, je suis toute vapeur, un peu surchauffée.",
        "Le petit détendeur y veille : son bulbe, posé à la sortie, sent ma température, et il dose le liquide du piquage.",
        "Ma chaleur, je l'ai prise au liquide, pas à la chambre froide : je fais du froid pour les autres."
      ],
      question: { q: "Dans l'échangeur, à qui le fluide du piquage prend-il sa chaleur ?",
        choix: [["Au liquide principal, qui se refroidit.", 1],
                ["À la chambre froide.", 0],
                ["Au moteur du compresseur.", 0]],
        pourquoi: "Le fluide du piquage bout dans l'échangeur en prenant la chaleur du liquide principal, de l'autre côté des plaques. Le liquide principal ressort sous-refroidi ; le fluide du piquage, en vapeur un peu surchauffée." } },
    { id: "orifice", num: "10", titre: "L'orifice économiseur", sous: "une entrée au milieu",
      carte: [103, 104], diag: [13, 15], calques: { pi: 0 }, puces: [["recup", "orifice économiseur"], ["HP", "refoulement"]],
      phrases: [
        "Je file vers le compresseur, par la ligne de l'économiseur.",
        "L'orifice économiseur s'ouvre dans une alvéole déjà fermée : j'y entre, au milieu de la compression.",
        "Là, je retrouve la vapeur aspirée à l'évaporateur. On se mélange, et on continue ensemble.",
        "Moi, on ne me comprime qu'à partir de la pression intermédiaire : une partie du chemin seulement, donc moins de travail.",
        "Le moteur consomme un peu plus, mais le froid produit augmente davantage.",
        "C'est surtout utile quand l'écart est grand entre la basse et la haute pression : en congélation, par exemple."
      ],
      question: { q: "Que gagne-t-on avec le sous-refroidisseur à économiseur, pour le même compresseur ?",
        choix: [["Plus de froid, pour un peu plus d'énergie au moteur.", 1],
                ["Moins de froid, mais moins de bruit.", 0],
                ["Rien : il ne sert qu'au démarrage.", 0]],
        pourquoi: "Le liquide principal, sous-refroidi, fait plus de froid par kilo, et l'aspiration ne change presque pas. La vapeur du piquage n'est comprimée qu'à partir de la pression intermédiaire : le moteur consomme un peu plus, mais le froid produit augmente davantage." } },
    { id: "autres", num: "11", titre: "D'autres façons", sous: "de sous-refroidir", carte: null,
      phrases: [
        "L'économiseur n'est pas la seule façon de refroidir le liquide.",
        "L'échangeur liquide-aspiration : la vapeur froide qui part au compresseur refroidit le liquide. C'est simple, mais le compresseur aspire alors une vapeur plus chaude.",
        "Le sous-refroidisseur à eau : de l'eau fraîche refroidit le liquide, quand il y en a à disposition.",
        "Le sous-refroidissement mécanique : une seconde petite machine frigorifique, avec son propre compresseur, refroidit le liquide de la première.",
        "Et l'économiseur à bouteille : le liquide s'y détend jusqu'à la pression intermédiaire, et la vapeur part au compresseur.",
        "Le liquide, refroidi, continue vers le détendeur. C'est un cousin de l'installation bi-étagée.",
        "Chaque façon a son prix : le choix revient au bureau d'études et au constructeur."
      ],
      question: { q: "Dans un échangeur liquide-aspiration, qu'est-ce qui refroidit le liquide ?",
        choix: [["La vapeur froide qui part vers le compresseur.", 1],
                ["L'air extérieur.", 0],
                ["L'huile du séparateur.", 0]],
        pourquoi: "Dans l'échangeur liquide-aspiration, la vapeur froide qui sort de l'évaporateur prend la chaleur du liquide. Le liquide est sous-refroidi, mais la vapeur aspirée arrive plus chaude au compresseur." } },
    { id: "mesure", num: "12", titre: "Ce que l'on mesure", sous: "l'œil du technicien",
      carte: [9.2, 14.5], diag: [0, 1], calques: { ecart: 3 }, puces: [["HP", "saturation − tube"], ["liq", "4 à 8 K"]],
      phrases: [
        "Pour finir, voyons comment le technicien vérifie le sous-refroidissement.",
        "Au manomètre haute pression, il lit la pression, et en déduit la température de saturation.",
        "Sur la ligne liquide, un thermomètre de contact, bien isolé, donne la température réelle du tube.",
        "Le sous-refroidissement, c'est la différence : température de saturation moins température réelle. Il s'exprime en kelvins.",
        ["À la sortie du condenseur, le repère usuel est de 4 à 8 K. Après le sous-refroidisseur, l'écart est bien plus grand.", "À la sortie du condenseur, le repère usuel est de quatre à huit kelvins. Après le sous-refroidisseur, l'écart est bien plus grand."],
        "Au voyant, le liquide doit passer clair. Des bulles : le liquide n'est plus assez sous-refroidi, et il faut en chercher la cause.",
        "Avec un mélange qui glisse, on prend la température de bulle. Et la documentation du constructeur fait foi."
      ],
      question: { q: "Comment calcule-t-on le sous-refroidissement ?",
        choix: [["Température de saturation moins température réelle du tube.", 1],
                ["Température réelle du tube moins température de saturation.", 0],
                ["Haute pression moins basse pression.", 0]],
        pourquoi: "Le liquide sous-refroidi est plus froid que sa saturation : on retranche la température réelle du tube, prise sur la ligne liquide, à la température de saturation lue au manomètre HP. Le résultat s'exprime en kelvins." } },
    { id: "resume", num: "", titre: "Le voyage en deux chemins", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le voyage.",
        "Au sortir de la bouteille, le liquide se partage en deux.",
        "La plus grande part traverse l'échangeur et s'y refroidit : elle arrive au détendeur bien liquide, sans bulles.",
        "Dans l'évaporateur, chaque kilo prend plus de chaleur : c'est plus de froid.",
        "La petite part est détendue à la pression intermédiaire, et bout dans l'échangeur, en refroidissant l'autre.",
        "Sa vapeur entre dans les vis par l'orifice économiseur, au milieu de la compression.",
        "Une petite part travaille pour l'autre : tout le circuit fait plus de froid."
      ],
      question: { q: "Où va la vapeur qui a bouilli dans le sous-refroidisseur ?",
        choix: [["Dans les vis, par l'orifice économiseur.", 1],
                ["Dans l'évaporateur.", 0],
                ["Dans la bouteille.", 0]],
        pourquoi: "Le fluide du piquage bout dans l'échangeur à la pression intermédiaire. Sa vapeur rejoint le compresseur par l'orifice économiseur, dans une alvéole déjà fermée, au milieu de la compression." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "Le voyage précédent : le compresseur à vis", h: "../voyage/module-vis.html" },
    { t: "Surchauffe et sous-refroidissement", h: "../packs/fluides/res/surchauffe-sous-refroidissement-interactif/" },
    { t: "Le condenseur", h: "../packs/fluides/res/condenseur-interactif/" },
    { t: "Le voyant liquide", h: "../packs/fluides/res/voyant-liquide-pedagogique/" }
  ]
};

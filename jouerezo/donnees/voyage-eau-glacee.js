/* =====================================================================
   voyage-eau-glacee.js — le récit de « L'ennemi juré », tome 1 :
   la frontière (le groupe d'eau glacée et son évaporateur à plaques)
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage-vis.js (une source pour le
   module, le film et la série), chargé par voyage-eau-glacee.html.
   Pas de livret : `livret: ""`.
   SÉRIE (Franck, 06/10/2026) : « L'ennemi juré », nouvelle série de la
   famille des Voyages (saga « Les voyages extraordinaires » du Studio).
   Angle : la rencontre de deux ennemis, l'eau et le fluide frigorigène
   (« le pire ennemi du frigoriste, c'est l'eau »). Pour YouTube et inerWeb
   Studio, en complément des cours. Cadrage :
   CLAUDE-ESPACE-TRAVAIL/VOYAGES-EAU-GLACEE.md. Tome 1 = film pilote, court.
   INSTALLATION : un groupe d'eau glacée à condensation par air, sur le
   toit d'un immeuble de bureaux ; compresseur, condenseur à air,
   filtre déshydrateur, détendeur ÉLECTRONIQUE (Franck, 06/10 : sans lui,
   il faudrait une électrovanne ; lui dose le débit et se ferme à
   l'arrêt, il fait les deux), évaporateur à plaques brasées ; côté
   eau : pompe, filtre à tamis, contrôleur de débit, ventilo-convecteurs.
   L'héroïne (la molécule) parle seule ; la goutte d'eau est un personnage
   muet (D.goutte, moteur/voyage-eau-glacee-dessin.js).
   SOURCES : le fonds de Franck — « 3.1 Technologie (groupe d'eau glacée) »
   (composition du groupe, évaporateur à plaques, contrôleur de débit,
   groupe livré chargé et essayé en usine, l'eau fluide de transfert,
   régime « autour de 6 °C / 12 °C »), station CartoClim 3-8 (groupe
   d'eau glacée et ventilo-convecteurs), stations HydroMétro (échangeur,
   circulateur). VÉRIFIÉ EN LIGNE (06/10) : régime nominal 12 → 7 °C,
   air 35 °C (Eurovent LCP-HP « A35/W12-7 », Daikin EWAQ) — seul chiffre
   affiché, « autour de 7 °C / 12 °C » ; plaques inox embouties brasées au
   cuivre, canaux alternés, contre-courant, fluide qui entre en bas et
   sort en haut, eau qui entre en haut (SWEP 4-120, Alfa Laval, Danfoss) ;
   gel : faible débit et basse évaporation, la glace rompt les plaques
   (SWEP, brevet Alfa Laval EP4498028) ; contrôleur de débit « essentiel »
   (Daikin EWAD), pompe avant, pendant et après le compresseur (Alfa
   Laval, Danfoss), pressostat BP d'abord, sonde de sortie d'eau jamais
   seule (Schmidt/API) ; filtre à l'entrée d'eau (SWEP, Daikin) ; glycol :
   gèle plus bas, moins de puissance (Daikin EWAD) ; humidité : acides
   avec l'huile POE, glace au détendeur, voyant vert → jaune, tirage au
   vide + déshydrateur (Danfoss, Bitzer, Copeland AE4-1494, AE4-1396) ;
   nettoyage après contamination (Copeland AE24-1105) ; charge limitée
   des fluides inflammables dans les locaux occupés (EN 378, d'après
   AREA). AUCUNE source sur le sens de la fuite d'une plaque fendue : le
   récit dit « selon les pressions ». Détail : voyage-eau-glacee/REPRISE-VOYAGE-EAU-GLACEE.md.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-eau-glacee-scenes-*.js) : ajouter une phrase décale tout.
   DIAGRAMME : `diag: [w0, w1]` = position sur le cycle de
   donnees/voyage-eau-glacee-diagramme.js (0 sortie condenseur · 1 entrée
   évaporateur, après le détendeur · 2 fin d'ébullition · 3 sortie
   évaporateur · 4 refoulement · 5 début de condensation · 6 fin de
   condensation · 7 = 0) ; `calques: { id: k }` = calque montré à partir
   de la phrase k (chute : la pression d'évaporation qui tombe ; gel :
   l'isobare où le fluide bout à zéro degré).
   CARTE : `carte` sur D.CIRCUIT_PTS, circuit du fluide (0 → 14, voir le
   dessin de l'édition) ; 200 et au-delà = la boucle d'eau (la goutte).
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "L'ennemi juré",
  sousTitre: "la frontière : le groupe d'eau glacée raconté par une molécule",
  edition: "la frontière",
  dossier: "voyage-eau-glacee",
  film: "../voyage/eau-glacee.html", livret: "", // pas de livret pour cette série
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le circuit frigorifique de base",
    notions: [["Le groupe d'eau glacée : deux circuits qui se touchent à l'évaporateur", "intro"],
              ["L'évaporateur à plaques : canaux alternés, contre-courant", "1, 2"],
              ["La boucle d'eau : pompe, ventilo-convecteurs, régime départ / retour", "3"],
              ["Pourquoi l'eau glacée : le fluide frigorigène confiné dans le groupe", "4"],
              ["Le cycle du fluide : compresseur, condenseur à air, détendeur électronique (il fait aussi électrovanne)", "5"],
              ["Le contrôleur de débit et la protection contre le gel", "6"],
              ["Le gel de l'évaporateur et l'eau dans le circuit frigorifique", "7"],
              ["Filtre à tamis, eau glycolée, tirage au vide, filtre déshydrateur", "8"]],
    usage: "Premier tome de la série « L'ennemi juré » : l'eau et le fluide frigorigène, deux ennemis qui travaillent ensemble de part et d'autre d'une plaque. Il se regarde d'un trait (environ sept minutes) ou en trois temps : la frontière et la rencontre (1, 2), l'eau et le groupe (3 à 5), la sentinelle, le gel et les armes du frigoriste (6 à 8). Repères : Bac Pro MFER, savoirs S4 (circuits frigorifiques et réseaux hydrauliques) ; CAP IFCA, compétences C3.9 (vérifier l'étanchéité d'un circuit frigorifique ou hydraulique) et C4.4 (intervenir sur un circuit hydraulique). Les montages décrits sont courants ; la documentation du constructeur fait foi. Ce voyage ouvre le sujet sans remplacer le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Une molécule de fluide frigorigène raconte son travail dans un groupe d'eau glacée, sur le toit d'un immeuble de bureaux. L'eau, l'ennemi juré du frigoriste, passe de l'autre côté d'une plaque d'inox : dans l'évaporateur à plaques, elles échangent leur chaleur sans jamais se toucher. Le voyage de l'eau jusqu'aux ventilo-convecteurs, pourquoi le fluide reste dans le groupe, la sentinelle qui surveille le débit, ce qui arrive quand la frontière gèle, et les armes du frigoriste pour tenir l'eau à distance.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "à la frontière de l'eau", carte: null,
      phrases: [
        "Bonjour. Je suis une molécule de fluide frigorigène.",
        "Aujourd'hui, je travaille dans un groupe d'eau glacée, posé sur le toit d'un immeuble de bureaux.",
        "Mon métier ne change pas : prendre de la chaleur, et la rejeter dehors.",
        "Mais cette fois, je ne descends pas dans les bureaux. C'est l'eau qui y va, à ma place.",
        "L'eau… c'est l'ennemi juré du frigoriste. Et le mien : une seule goutte dans mon circuit, et c'est la catastrophe.",
        "Voici mes deux circuits : le mien, et celui de l'eau. Ils ne se touchent qu'en un seul endroit : l'évaporateur à plaques.",
        "À droite, le diagramme enthalpique : à chaque pas, mon point y avance, et dessine mon cycle.",
        "Suivez-moi à la frontière."
      ] },
    { id: "frontiere", num: "1", titre: "La frontière", sous: "l'évaporateur à plaques", organe: "evaporateur", pres: 2,
      role: "donner la chaleur de l'eau au fluide frigorigène, sans les mélanger",
      carte: [13.6, 14], diag: [1, 1], puces: [["BP", "évaporateur"], ["froid", "eau glacée"]],
      phrases: [
        "Voici l'évaporateur du groupe : un échangeur à plaques.",
        "Son rôle : prendre la chaleur de l'eau, et me la donner, sans jamais nous mélanger.",
        "Dedans, des plaques d'acier inoxydable embouties, empilées et brasées.",
        "Entre les plaques, un canal sur deux : moi d'un côté, l'eau de l'autre.",
        "Nous circulons en sens contraires : c'est ainsi que nous échangeons le mieux.",
        "Entre l'eau et moi, rien qu'une plaque de métal, très mince. C'est la frontière."
      ],
      question: { q: "Dans l'évaporateur à plaques, comment l'eau et le fluide frigorigène échangent-ils leur chaleur ?",
        choix: [["À travers les plaques, sans jamais se mélanger.", 1],
                ["En se mélangeant entre les plaques.", 0],
                ["Grâce à l'air soufflé par un ventilateur.", 0]],
        pourquoi: "L'échangeur à plaques fait passer l'eau et le fluide frigorigène un canal sur deux, en sens contraires. La chaleur traverse la plaque de métal ; les deux fluides, eux, ne se touchent jamais." } },
    { id: "rencontre", num: "2", titre: "La rencontre", sous: "de part et d'autre de la plaque",
      carte: [0, 3], diag: [1, 3], puces: [["BP", "je bous"], ["froid", "l'eau se refroidit"]],
      phrases: [
        "Je sors du détendeur, froide : un liquide, avec déjà quelques bulles.",
        "De l'autre côté de la plaque, voici une goutte d'eau. Elle revient des bureaux, tiède.",
        "À travers la plaque, elle me donne sa chaleur. Moi, je bous, à pression constante.",
        "Elle descend en se refroidissant ; je monte en bouillant. À la sortie, elle est glacée, et moi, toute en vapeur.",
        "Nous ne nous sommes jamais touchées. Pourtant, je viens de lui prendre sa chaleur.",
        "Pour que tout aille bien, je dois bouillir plus froid que l'eau… mais pas trop froid. Retenez bien cela."
      ],
      question: { q: "Dans l'évaporateur, que fait la goutte d'eau ?",
        choix: [["Elle donne sa chaleur au fluide frigorigène, qui bout de l'autre côté.", 1],
                ["Elle se met à bouillir.", 0],
                ["Elle se mélange au fluide frigorigène.", 0]],
        pourquoi: "L'eau tiède donne sa chaleur à travers la plaque. Le fluide frigorigène, plus froid, la prend et bout ; l'eau ressort glacée. Les deux ne se mélangent jamais." } },
    { id: "voyageEau", num: "3", titre: "Le voyage de l'eau", sous: "jusqu'aux bureaux",
      carte: [203, 213], puces: [["froid", "départ"], ["chaud", "retour"]],
      phrases: [
        "Suivons l'ennemi. À la sortie de l'évaporateur, l'eau glacée part vers les bureaux.",
        "Une pompe la fait circuler, dans une boucle fermée de tuyaux.",
        "Dans chaque bureau, un ventilo-convecteur : une batterie où passe l'eau glacée, et un ventilateur qui y souffle l'air de la pièce.",
        "L'air donne sa chaleur à l'eau : le bureau se rafraîchit.",
        "L'eau revient au groupe un peu plus chaude, et la boucle recommence.",
        ["Le régime courant : autour de 7 °C au départ, et de 12 °C au retour.", "Le régime courant : autour de sept degrés au départ, et de douze degrés au retour."]
      ],
      question: { q: "Dans les bureaux, qui rafraîchit l'air ?",
        choix: [["L'eau glacée, dans les ventilo-convecteurs.", 1],
                ["Le fluide frigorigène, envoyé dans chaque bureau.", 0],
                ["Le condenseur du groupe.", 0]],
        pourquoi: "Le fluide frigorigène reste dans le groupe, sur le toit. C'est l'eau glacée qui descend dans les bureaux : dans chaque ventilo-convecteur, l'air de la pièce lui donne sa chaleur." } },
    { id: "pourquoiEau", num: "4", titre: "Pourquoi l'eau ?", sous: "le fluide reste chez lui",
      carte: [3, 5], diag: [3, 3], puces: [["froid", "fluide enfermé"], ["liq", "l'eau transporte"]],
      phrases: [
        "Pourquoi envoyer l'eau dans les bureaux, et pas moi ?",
        "Parce que je reste enfermée dans le groupe : un circuit court, fermé, rempli et essayé en usine.",
        "Moins de fluide, moins de raccords, et pas de fluide frigorigène dans les bureaux.",
        "L'eau, elle, est un fluide de transfert simple : elle va loin, dans tout le bâtiment.",
        "Et avec un fluide inflammable, comme le propane, la norme limite beaucoup la charge dans les pièces occupées : l'eau glacée le garde dehors."
      ],
      question: { q: "Pourquoi fait-on circuler de l'eau glacée dans le bâtiment, plutôt que le fluide frigorigène ?",
        choix: [["Pour garder le fluide frigorigène enfermé dans le groupe, en petite quantité.", 1],
                ["Parce que l'eau est plus froide que le fluide frigorigène.", 0],
                ["Parce que le fluide frigorigène ne sait pas refroidir l'air.", 0]],
        pourquoi: "Avec l'eau glacée, le fluide frigorigène reste dans un circuit court et fermé, rempli et essayé en usine. C'est l'eau, simple à transporter, qui va dans tout le bâtiment. Avec un fluide inflammable, la norme EN 378 limite fortement la charge dans les locaux occupés." } },
    { id: "tourGroupe", num: "5", titre: "Le reste de mon voyage", sous: "compresseur et condenseur",
      carte: [5, 14.6], diag: [3, 8], puces: [["BP", "aspiration"], ["HP", "condenseur"]],
      phrases: [
        "Je sors de l'évaporateur en vapeur, et j'entre dans le compresseur.",
        "Il me comprime : ma pression et ma température montent.",
        "Au condenseur, de grands ventilateurs soufflent l'air extérieur à travers la batterie.",
        "J'y rejette toute la chaleur prise à l'eau, plus celle du compresseur. Je redeviens liquide.",
        "Puis le filtre déshydrateur, et le détendeur électronique : il dose mon débit, et se ferme tout seul à l'arrêt, comme une électrovanne.",
        "Ma pression tombe d'un coup, et me revoilà à la frontière."
      ],
      question: { q: "Où part la chaleur prise à l'eau des bureaux ?",
        choix: [["Dans l'air extérieur, au condenseur.", 1],
                ["Dans la boucle d'eau.", 0],
                ["Nulle part : le compresseur la fait disparaître.", 0]],
        pourquoi: "Le fluide frigorigène emporte la chaleur de l'eau jusqu'au condenseur. Là, l'air extérieur la reçoit, avec en plus la chaleur apportée par le compresseur." } },
    { id: "sentinelle", num: "6", titre: "La sentinelle", sous: "le contrôleur de débit",
      carte: [0, 1.5], diag: [1, 2], calques: { chute: 1, gel: 2 }, puces: [["froid", "débit d'eau"], ["fuite", "arrêt"]],
      phrases: [
        "Revenons à la frontière. Pour que je bouille, il faut que l'eau passe, sans arrêt.",
        "Si l'eau s'arrête, plus personne ne me donne de chaleur : ma pression baisse, et je bous de plus en plus froid.",
        "Sous zéro degré, l'eau immobile entre les plaques commence à geler.",
        "Voici la sentinelle : le contrôleur de débit, sur le tuyau d'eau. Une palette plongée dans le courant.",
        "Tant que l'eau pousse la palette, le compresseur a le droit de tourner. Si le débit manque, la palette retombe, et le compresseur s'arrête.",
        "C'est aussi pour cela que la pompe démarre avant le compresseur, et s'arrête après lui.",
        "D'autres gardes veillent avec elle : le pressostat basse pression, et une sonde antigel sur l'eau qui sort."
      ],
      question: { q: "Que se passe-t-il quand le contrôleur de débit ne sent plus l'eau passer ?",
        choix: [["Il fait arrêter le compresseur.", 1],
                ["Il fait accélérer le compresseur.", 0],
                ["Il ouvre le détendeur en grand.", 0]],
        pourquoi: "Sans débit d'eau, le fluide frigorigène n'a plus de chaleur à prendre : sa pression d'évaporation chute, et l'eau peut geler entre les plaques. Le contrôleur de débit fait alors arrêter le compresseur." } },
    { id: "gel", num: "7", titre: "Si la frontière cède", sous: "le gel",
      carte: [0, 3], puces: [["fuite", "plaque fendue"]],
      phrases: [
        "Et sans sentinelle ? Imaginons.",
        "En gelant, l'eau gonfle : la glace prend plus de place que l'eau.",
        "Coincée entre les plaques, la glace pousse fort sur elles, et peut les fendre.",
        "La frontière est percée. Selon les pressions, je file dans l'eau… ou l'eau entre chez moi.",
        "Dans mon circuit, l'eau devient un poison : avec l'huile, elle forme des acides ; au détendeur, elle gèle et le bouche.",
        "Échangeur à changer, circuit à nettoyer, huile et filtres à remplacer : c'est long et coûteux. Le pire des chantiers.",
        "Voilà pourquoi l'eau est l'ennemi juré du frigoriste : de l'autre côté de la plaque, toujours."
      ],
      question: { q: "Pourquoi le gel peut-il fendre un évaporateur à plaques ?",
        choix: [["Parce que l'eau gonfle en gelant, coincée entre les plaques.", 1],
                ["Parce que le fluide frigorigène gèle.", 0],
                ["Parce que la pompe tourne trop vite.", 0]],
        pourquoi: "En devenant glace, l'eau prend plus de place. Coincée dans les canaux étroits, elle pousse les plaques et peut les fendre : l'eau et le fluide frigorigène peuvent alors passer d'un côté à l'autre." } },
    { id: "armes", num: "8", titre: "Les armes du frigoriste", sous: "tenir l'eau à distance",
      carte: [9, 11], puces: [["froid", "côté eau"], ["HP", "côté fluide"]],
      phrases: [
        "Contre l'ennemi, le frigoriste a ses armes.",
        "Du côté de l'eau : un filtre à tamis avant l'évaporateur, pour que rien ne bouche les canaux.",
        "Si le groupe passe l'hiver dehors : de l'eau glycolée, qui gèle bien plus bas que l'eau pure, au prix d'un peu de puissance.",
        "Du côté du fluide : avant de me mettre dans le circuit, on y fait le vide, pour chasser l'air et l'humidité.",
        "Et le filtre déshydrateur capture les dernières traces d'eau. Au voyant, la pastille passe du vert au jaune s'il en reste."
      ],
      question: { q: "Avant de remplir un circuit frigorifique neuf, pourquoi y fait-on le vide ?",
        choix: [["Pour chasser l'air et l'humidité.", 1],
                ["Pour refroidir les tuyaux.", 0],
                ["Pour vérifier la pompe à eau.", 0]],
        pourquoi: "L'humidité laissée dans un circuit frigorifique forme des acides avec l'huile et peut geler au détendeur. Le tirage au vide la chasse avant la charge ; le filtre déshydrateur capture le reste." } },
    { id: "resume", num: "", titre: "La frontière", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le voyage.",
        "Dans l'évaporateur à plaques, l'eau me donne sa chaleur, à travers une plaque mince, sans jamais me toucher.",
        "L'eau glacée part rafraîchir les bureaux ; moi, je rejette la chaleur dehors, au condenseur.",
        "La frontière tient tant que l'eau circule : la sentinelle y veille.",
        "Ennemis, oui… mais ensemble, nous rafraîchissons tout un immeuble.",
        "Au prochain voyage, l'eau m'attendra des deux côtés."
      ],
      question: { q: "Que surveille le contrôleur de débit ?",
        choix: [["Que l'eau circule bien dans l'évaporateur.", 1],
                ["La pression du fluide frigorigène au condenseur.", 0],
                ["La température de l'air des bureaux.", 0]],
        pourquoi: "Le contrôleur de débit vérifie que l'eau passe dans l'évaporateur. Sans débit, l'eau pourrait geler entre les plaques : il fait arrêter le compresseur." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "Groupe d'eau glacée et ventilo-convecteurs (CartoClim)", h: "../cartoclim/stations/3-8-eau-glacee/" },
    { t: "L'échangeur (HydroMétro)", h: "../hydrometro/stations/echangeur/" },
    { t: "Le circulateur (HydroMétro)", h: "../hydrometro/stations/circulateur/" }
  ]
};

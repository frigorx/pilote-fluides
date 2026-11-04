/* =====================================================================
   voyage-enthalpie.js — le récit de « Voyage dans tous ses états »,
   édition « le diagramme enthalpique »
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage.js et voyage-vis.js (une source
   pour le module, le film et la série), chargé par voyage-enthalpie.html.
   Pas de livret (série : film + série + module) : `livret: ""`.
   SUJET : lire le diagramme enthalpique (h, log p) en suivant une molécule
   de R32 dans un climatiseur, en parallèle avec la croix du frigoriste :
   condenseur en haut, évaporateur en bas, compresseur à droite, détendeur
   à gauche, comme les quatre côtés du cycle sur le diagramme.
   CHIFFRES (Franck, 04/11 : diagramme chiffré, R32) : cycle idéal de
   donnees/voyage-enthalpie-diagramme.js (CoolProp via inerweb-dep R32.json,
   calcul voyage-enthalpie/calcul-diagramme-enthalpie.js) : évaporation 5 °C
   à 9,5 bar abs, condensation 45 °C à 28 bar abs, surchauffe 5 K,
   sous-refroidissement 5 K, compression isentropique. h1 522,6 ; h2 566,8 ;
   h3 = h4 275,6 kJ/kg ; refoulement 70,6 °C ; COP froid 5,6 (idéal).
   Pressions relatives ≈ absolues − 1. R32 corps pur : pas de glissement
   (Franck, 04/11 : n'en pas parler).
   DIAGRAMME : `diag: [w0, w1]` = position sur `chemin` (0 = point 1 sortie
   évaporateur, 1 = point 2 refoulement, 2 fin de désurchauffe, 3 liquide
   saturé, 4 = point 3 sortie condenseur, 5 = point 4 entrée évaporateur,
   6 vapeur saturée, 7 = 0, on reboucle).
   DROIT : comme l'original, l'idée, jamais le texte du livre.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-enthalpie-scenes-*.js) : ajouter une phrase décale tout.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "le diagramme enthalpique raconté par une molécule",
  edition: "le diagramme enthalpique",
  dossier: "voyage-enthalpie",
  film: "../voyage/enthalpie.html", livret: "",
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le circuit de base",
    notions: [["La croix du frigoriste et le diagramme : les mêmes quatre côtés", "intro, 7"],
              ["Les axes : l'enthalpie h (énergie de 1 kg) et la pression absolue", "1"],
              ["La cloche : liquide, liquide + vapeur, vapeur", "1"],
              ["L'évaporation à pression et température constantes, la surchauffe", "2"],
              ["La compression et la température de refoulement", "3"],
              ["La désurchauffe, la condensation, le sous-refroidissement", "4"],
              ["La détente à enthalpie constante : h3 = h4", "5"],
              ["Les écarts d'enthalpie et le COP froid", "6"],
              ["Du manomètre au diagramme : pression relative et absolue, placer un point", "8"]],
    usage: "Ce voyage suppose connu le circuit de base (le premier « Voyage dans tous ses états »). Les valeurs sont celles d'un cycle idéal de climatiseur au R32 (évaporation 5 °C, condensation 45 °C, surchauffe et sous-refroidissement de 5 K, compression sans pertes) : une installation réelle refoule plus chaud et son COP est plus faible. Il se regarde d'un trait ou en deux temps : les quatre organes sur le diagramme (1 à 5), puis la lecture des énergies et des relevés (6 à 8). Ce voyage ouvre le sujet sans remplacer le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de R32 dans un climatiseur, avec à gauche la croix du frigoriste et à droite le diagramme enthalpique : les axes et la cloche, l'évaporation et la surchauffe, la compression, la désurchauffe, la condensation et le sous-refroidissement, la détente à enthalpie constante, puis les écarts d'enthalpie, le COP et le passage du manomètre au diagramme.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Propriétés du R32 calculées avec CoolProp. Symboles d'après la planche Éduscol « Le circuit frigorifique ». Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "sur la croix et sur le diagramme", carte: null,
      phrases: [
        ["Bonjour. Je suis une molécule de R32, le fluide de la plupart des climatiseurs d'aujourd'hui.", "Bonjour. Je suis une molécule de R trente-deux, le fluide de la plupart des climatiseurs d'aujourd'hui."],
        "À gauche, mon circuit, dessiné en croix : le condenseur en haut, l'évaporateur en bas, le compresseur à droite, le détendeur à gauche.",
        "À droite, le diagramme enthalpique, la carte que lisent les frigoristes.",
        "Les deux se ressemblent : chaque organe de la croix correspond à un côté de mon trajet sur le diagramme.",
        "Je vais faire un tour complet. À chaque pas, mon point avance sur la croix et sur le diagramme en même temps."
      ] },
    { id: "carte", num: "1", titre: "Lire la carte", sous: "les axes et la cloche",
      carte: [14.5, 15], diag: [5, 5], puces: [["h", "énergie de 1 kg"], ["p", "pression"]],
      phrases: [
        ["Sur l'axe horizontal, l'enthalpie, notée h : l'énergie contenue dans un kilo de fluide, en kilojoules par kilo.", "Sur l'axe horizontal, l'enthalpie, notée h : l'énergie contenue dans un kilo de fluide, en kilojoules par kilo."],
        "Plus mon point va vers la droite, plus je porte d'énergie.",
        "Sur l'axe vertical, la pression absolue, en bar. Plus mon point monte, plus on me serre.",
        "Au milieu, une courbe en forme de cloche.",
        "À gauche de la cloche, je suis liquide. À droite, je suis vapeur.",
        "Sous la cloche, je suis un mélange : liquide et vapeur ensemble, et je change d'état."
      ],
      question: { q: "Sous la cloche du diagramme, dans quel état est le fluide ?",
        choix: [["Liquide et vapeur ensemble.", 1],
                ["Liquide seulement.", 0],
                ["Vapeur seulement.", 0]],
        pourquoi: "À gauche de la cloche, le fluide est liquide ; à droite, il est vapeur. Sous la cloche, liquide et vapeur sont mélangés : le fluide est en train de changer d'état." } },
    { id: "evaporateur", num: "2", titre: "L'évaporateur", sous: "la branche du bas", organe: "evaporateur", pres: 2,
      role: "prend la chaleur de l'air de la pièce",
      carte: [0, 2], diag: [5, 7], calques: { surchauffe: 4 }, puces: [["BP", "9,5 bar abs"], ["froid", "5 °C"]],
      phrases: [
        "J'entre dans l'évaporateur, la branche du bas de la croix. Sur le diagramme, c'est le point 4.",
        ["Je suis un mélange froid : 5 degrés, à 9,5 bar absolus.", "Je suis un mélange froid : cinq degrés, à neuf virgule cinq bars absolus."],
        "L'air chaud de la pièce passe sur les ailettes. Je prends sa chaleur, et mon liquide se transforme en vapeur.",
        ["Mon point file vers la droite, à l'horizontale : ni ma pression ni ma température ne changent, tant que j'ai du liquide.", "Mon point file vers la droite, à l'horizontale : ni ma pression ni ma température ne changent, tant que j'ai du liquide."],
        ["Je sors de la cloche : je suis toute en vapeur. L'évaporateur me réchauffe encore de 5 degrés : c'est la surchauffe.", "Je sors de la cloche : je suis toute en vapeur. L'évaporateur me réchauffe encore de cinq degrés : c'est la surchauffe."],
        ["Point 1, sortie de l'évaporateur : vapeur à 10 degrés, et 523 kilojoules par kilo.", "Point un, sortie de l'évaporateur : vapeur à dix degrés, et cinq cent vingt-trois kilojoules par kilo."]
      ],
      question: { q: "Dans l'évaporateur, sous la cloche, comment évolue la température du R32 ?",
        choix: [["Elle reste la même, tant qu'il reste du liquide.", 1],
                ["Elle monte régulièrement.", 0],
                ["Elle descend.", 0]],
        pourquoi: "Sous la cloche, à pression constante, le R32 change d'état à température constante. Elle ne monte qu'une fois tout le liquide passé en vapeur : c'est la surchauffe." } },
    { id: "compresseur", num: "3", titre: "Le compresseur", sous: "la branche de droite", organe: "compresseur", pres: 2,
      role: "aspire la vapeur et la comprime",
      carte: [2, 5], diag: [0, 1], puces: [["BP", "9,5 bar abs"], ["HP", "28 bar abs"]],
      phrases: [
        "Le compresseur m'aspire : c'est la branche de droite de la croix.",
        ["Il me comprime : ma pression passe de 9,5 à 28 bar absolus.", "Il me comprime : ma pression passe de neuf virgule cinq à vingt-huit bars absolus."],
        "Sur le diagramme, mon point monte, et il penche vers la droite.",
        "Le moteur du compresseur me donne de l'énergie : mon enthalpie augmente.",
        ["Point 2, au refoulement : vapeur très chaude, à 71 degrés, et 567 kilojoules par kilo.", "Point deux, au refoulement : vapeur très chaude, à soixante et onze degrés, et cinq cent soixante-sept kilojoules par kilo."],
        "Je suis encore loin de la cloche, à droite : aucune goutte de liquide dans le compresseur."
      ],
      question: { q: "Pourquoi le point monte-t-il en penchant vers la droite pendant la compression ?",
        choix: [["La pression monte, et le moteur ajoute de l'énergie au fluide.", 1],
                ["Le fluide redevient liquide.", 0],
                ["Le fluide prend la chaleur de la pièce.", 0]],
        pourquoi: "La compression fait monter la pression : le point monte. L'énergie du moteur passe dans le fluide : son enthalpie augmente, le point va vers la droite." } },
    { id: "condenseur", num: "4", titre: "Le condenseur", sous: "la branche du haut", organe: "condenseur", pres: 2,
      role: "rejette la chaleur dehors",
      carte: [5, 7.6], diag: [1, 4], calques: { desurchauffe: 1, sousRefroidissement: 5 }, puces: [["HP", "28 bar abs"], ["chaud", "45 °C"]],
      phrases: [
        "J'arrive au condenseur, dans l'unité extérieure : la branche du haut de la croix.",
        ["L'air du dehors me refroidit. D'abord, ma vapeur descend de 71 à 45 degrés : c'est la désurchauffe.", "L'air du dehors me refroidit. D'abord, ma vapeur descend de soixante et onze à quarante-cinq degrés : c'est la désurchauffe."],
        "Sur le diagramme, mon point file vers la gauche, sur la ligne de la haute pression, et il entre dans la cloche.",
        ["Je me condense : ma vapeur redevient liquide, toujours à 45 degrés.", "Je me condense : ma vapeur redevient liquide, toujours à quarante-cinq degrés."],
        "Je sors de la cloche par la gauche : je suis toute liquide.",
        ["Le condenseur me refroidit encore de 5 degrés : c'est le sous-refroidissement.", "Le condenseur me refroidit encore de cinq degrés : c'est le sous-refroidissement."],
        ["Point 3, sortie du condenseur : liquide à 40 degrés, et 276 kilojoules par kilo.", "Point trois, sortie du condenseur : liquide à quarante degrés, et deux cent soixante-seize kilojoules par kilo."]
      ],
      question: { q: "Dans le condenseur, dans quel ordre le R32 passe-t-il ?",
        choix: [["Désurchauffe, condensation, sous-refroidissement.", 1],
                ["Condensation, désurchauffe, sous-refroidissement.", 0],
                ["Sous-refroidissement, condensation, désurchauffe.", 0]],
        pourquoi: "La vapeur chaude se refroidit d'abord jusqu'à 45 °C (désurchauffe), puis redevient liquide à température constante (condensation), puis le liquide se refroidit encore (sous-refroidissement)." } },
    { id: "detendeur", num: "5", titre: "Le détendeur", sous: "la branche de gauche", organe: "detendeur", pres: 2,
      role: "fait chuter la pression",
      carte: [12.5, 15], diag: [4, 5], calques: { detente: 2 }, puces: [["HP", "28 bar abs"], ["BP", "9,5 bar abs"]],
      phrases: [
        "Le détendeur, la branche de gauche de la croix : un passage très étroit.",
        ["Je le traverse, et ma pression tombe de 28 à 9,5 bar absolus.", "Je le traverse, et ma pression tombe de vingt-huit à neuf virgule cinq bars absolus."],
        "Sur le diagramme, mon point descend tout droit : une ligne verticale.",
        "Je ne reçois aucune énergie, et je n'en rends aucune : mon enthalpie ne change pas. Le point 4 a le même h que le point 3.",
        ["Une partie de mon liquide se vaporise, et refroidit le reste : je ressors à 5 degrés, en mélange.", "Une partie de mon liquide se vaporise, et refroidit le reste : je ressors à cinq degrés, en mélange."],
        "Retour au point 4 : le tour est bouclé."
      ],
      question: { q: "Pourquoi la détente est-elle un trait vertical sur le diagramme ?",
        choix: [["L'enthalpie ne change pas : h3 = h4.", 1],
                ["La pression ne change pas.", 0],
                ["La température ne change pas.", 0]],
        pourquoi: "Dans le détendeur, le fluide ne reçoit ni ne rend d'énergie : son enthalpie reste la même. Seule la pression chute, donc le point descend à la verticale." } },
    { id: "energies", num: "6", titre: "Lire les énergies", sous: "les écarts d'enthalpie",
      carte: [0, 0], diag: [5, 5], puces: [["froid", "247 kJ/kg"], ["chaud", "291 kJ/kg"]],
      phrases: [
        "La différence d'enthalpie entre deux points dit combien d'énergie chaque kilo gagne ou perd dans un organe.",
        ["Évaporateur, 523 − 276 : chaque kilo prend 247 kJ à la pièce. C'est le froid produit.", "Dans l'évaporateur, chaque kilo prend deux cent quarante-sept kilojoules à la pièce. C'est le froid produit."],
        ["Compresseur, 567 − 523 : le moteur donne 44 kJ par kilo.", "Dans le compresseur, le moteur donne quarante-quatre kilojoules par kilo."],
        ["Condenseur, 567 − 276 : 291 kJ par kilo rendus dehors, la chaleur de la pièce plus l'énergie du moteur.", "Le condenseur rend deux cent quatre-vingt-onze kilojoules par kilo : la chaleur de la pièce, plus l'énergie du moteur."],
        ["COP = 247 ÷ 44 ≈ 5,6, dans ce cycle idéal.", "Le froid produit, divisé par l'énergie du moteur, donne le coefficient de performance : environ cinq virgule six dans ce cycle idéal."]
      ],
      question: { q: "Pourquoi le condenseur rejette-t-il plus d'énergie que l'évaporateur n'en prend ?",
        choix: [["Il rejette aussi l'énergie apportée par le moteur du compresseur.", 1],
                ["Le condenseur est plus grand.", 0],
                ["Le détendeur ajoute de l'énergie.", 0]],
        pourquoi: "h2 − h3 = (h1 − h4) + (h2 − h1) : le condenseur rend la chaleur prise dans la pièce plus l'énergie du compresseur, 247 + 44 = 291 kJ/kg." } },
    { id: "parallele", num: "7", titre: "La croix et le diagramme", sous: "les mêmes quatre côtés",
      carte: [0, 15], diag: [5, 12], puces: [["BP", "en bas"], ["HP", "en haut"]],
      phrases: [
        "Refaisons le tour, sur les deux cartes à la fois.",
        "En bas de la croix, l'évaporateur ; en bas du diagramme, la basse pression : je vais vers la droite, je prends de l'énergie.",
        "À droite de la croix, le compresseur ; à droite du diagramme, je monte : on me serre.",
        "En haut de la croix, le condenseur ; en haut du diagramme, la haute pression : je vais vers la gauche, je rends de l'énergie.",
        "À gauche de la croix, le détendeur ; à gauche du diagramme, je descends : la pression chute."
      ],
      question: { q: "Sur le diagramme, quel organe correspond au côté du haut du cycle ?",
        choix: [["Le condenseur.", 1],
                ["L'évaporateur.", 0],
                ["Le détendeur.", 0]],
        pourquoi: "Le côté du haut est à la haute pression, parcouru vers la gauche : le fluide rend de l'énergie. C'est le condenseur, en haut de la croix comme en haut du diagramme." } },
    { id: "releves", num: "8", titre: "Du manomètre au diagramme", sous: "placer un point", organe: "compresseur", pres: 0,
      carte: [2, 2], diag: [0, 0], puces: [["BP", "8,5 bar relatif"], ["HP", "27 bar relatif"]],
      phrases: [
        "Sur le chantier, le technicien place mon point à partir de ses relevés.",
        ["Son manomètre basse pression lit 8,5 bar relatifs. Le diagramme est en absolu : on ajoute environ 1 bar, soit 9,5.", "Son manomètre basse pression lit huit virgule cinq bars, en relatif. Le diagramme est en absolu : on ajoute environ un bar, soit neuf virgule cinq."],
        ["Sa pince thermométrique, sur la tuyauterie d'aspiration, lit 10 degrés.", "Sa pince thermométrique, sur la tuyauterie d'aspiration, lit dix degrés."],
        "Une pression et une température placent mon point seulement hors de la cloche : en vapeur surchauffée ou en liquide sous-refroidi."
      ],
      question: { q: "Le manomètre basse pression lit 8,5 bar. Quelle pression lire sur le diagramme ?",
        choix: [["Environ 9,5 bar absolus.", 1],
                ["8,5 bar.", 0],
                ["Environ 7,5 bar absolus.", 0]],
        pourquoi: "Le manomètre mesure à partir de la pression de l'air, environ 1 bar. Le diagramme est en pression absolue : 8,5 + 1 = 9,5 bar abs." } },
    { id: "resume", num: "", titre: "Le tour en quatre côtés", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir : en bas, je prends la chaleur ; à droite, on me serre ; en haut, je la rends ; à gauche, je me détends.",
        "La croix montre où je passe. Le diagramme montre ce que je deviens."
      ],
      question: { q: "Sur quel côté du cycle le fluide prend-il la chaleur de la pièce ?",
        choix: [["Le côté du bas, à basse pression : l'évaporateur.", 1],
                ["Le côté de droite : le compresseur.", 0],
                ["Le côté du haut : le condenseur.", 0]],
        pourquoi: "Dans l'évaporateur, à basse pression, le fluide prend la chaleur de la pièce : son point va vers la droite, sur le côté du bas du cycle." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "La croix du frigoriste", h: "../f/a-croix-frigoriste/" },
    { t: "Le diagramme enthalpique interactif", h: "../packs/fluides/res/diagramme-enthalpique/" }
  ]
};

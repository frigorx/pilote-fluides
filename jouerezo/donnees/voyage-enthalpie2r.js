/* =====================================================================
   voyage-enthalpie2r.js — le récit de « Voyage dans tous ses états »,
   édition « le diagramme enthalpique, niveau 2 : je réalise » (R32, climatiseur)
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage-enthalpie2.js (une source pour le module, le film et la série),
   chargé par voyage-enthalpie2r.html. Pas de livret : `livret: ""`.
   SUJET : l'élève trace lui-même le cycle d'un climatiseur au R32 sur la feuille A4 (diagramme vierge),
   à partir de cinq relevés. Chaque chapitre = la consigne (phrase finissant par « Mettez en pause. »),
   puis la correction. La phrase de consigne est celle du panneau « À vous » (scènes) ; moteur/voyage-enthalpie2r-dessin.js.
   RÉCIT : voyage-enthalpie2r/RECIT-A-RELIRE.md, validé (texte mot pour mot ; seule la forme DITE des phrases
   à chiffres change : « R trente-deux », « C O P »).
   CHIFFRES (voyage-enthalpie2/CHIFFRES.md, partie R32, CoolProp 8.0.0, IIR) : BP 7,1 bar rel (8,1 abs, évaporation
   0 °C), HP 23,8 bar rel (24,8 abs, condensation 40 °C), aspiration 7 °C, refoulement 95 °C, sortie condenseur 34 °C.
   h1 523,8 ; h2 591,0 ; h2s 571,1 (79 °C) ; h3 = h4 263,0 ; x4 0,200. Enthalpies lues arrondies au kJ/kg
   (524, 591, 263) : 261, 67, 328 ; COP froid 3,9 ; COP chaud 4,9 ; taux 3,1 ; débit 0,013 kg/s (48 kg/h) pour 3,5 kW ;
   0,9 kW ; 4,4 kW. Données du diagramme : donnees/voyage-enthalpie2r-diagramme.js (engendré, ne pas éditer).
   DIAGRAMME : `diag: [w0, w1]` = position sur `chemin` (0 = point 1, 1 = point 2, 2 fin de désurchauffe, 3 liquide
   saturé, 4 = point 3, 5 = point 4, 6 vapeur saturée, 7 = 0, on reboucle ; un tour complet depuis 4 = [5, 12]).
   CALQUES : { id: k } = montré à partir de la phrase k (rang dans `phrases`).
   PAUSES : le moteur n'a pas de champ de pause. Le silence de 4 s après chaque « Mettez en pause. » est ajouté à la durée
   de la piste dans voyage-enthalpie2r/voix/pistes.json par voyage-enthalpie2r/pauses.mjs (à lancer après voyage-voix.py).
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes et les calques : ajouter une phrase décale tout.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "à vous de tracer le cycle d'un climatiseur",
  edition: "le diagramme enthalpique, niveau 2 : je réalise",
  dossier: "voyage-enthalpie2r",
  film: "../voyage/enthalpie2r.html", livret: "",
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "1re MFER, après le TD 05 et le film Découverte du diagramme enthalpique de niveau 2",
    notions: [["Noter les cinq relevés du technicien : deux pressions relatives, trois températures", "1"],
              ["Du relatif à l'absolu, les deux isobares, températures de saturation, surchauffe et sous-refroidissement", "2"],
              ["Placer les points 1, 2 et 3 hors de la cloche et lire leur enthalpie", "3"],
              ["Placer le point 4 sous la cloche par h4 = h3 et lire son titre", "4"],
              ["Tracer le cycle réel et le comparer à la compression idéale (isentrope)", "5"],
              ["Écarts d'enthalpie, COP froid et chaud, taux de compression", "6"],
              ["Du kilo à l'installation : débit massique et puissances", "7"]],
    usage: "Ce voyage se fait avec la feuille A4 « je réalise » (le diagramme du R32 vierge et le tableau des relevés), dans le dossier voyage-enthalpie2r/feuille/ (à venir), un crayon, une règle et une calculatrice. Les relevés sont ceux d'un climatiseur au R32 : basse pression 7,1 bar, haute pression 23,8 bar, aspiration 7 °C, refoulement 95 °C, sortie du condenseur 34 °C. À chaque étape, le film donne la consigne et demande la pause : l'élève fait l'étape sur sa feuille, puis relance pour voir la correction. Les valeurs lues sur le diagramme sont arrondies au kJ/kg ; une lecture à plus ou moins 4 kJ/kg près en enthalpie et à plus ou moins 2 °C en température est acceptable. Il suit le film Découverte (R134a, chambre froide). Ce voyage ne remplace ni le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "À vous de tracer : à partir des cinq relevés d'un technicien sur un climatiseur au R32, notez les relevés, passez en pression absolue, placez les quatre points du cycle sur la feuille du diagramme, tracez le cycle, puis calculez les écarts d'enthalpie, le COP, le taux de compression, le débit et les puissances. À chaque étape, la consigne, la pause, puis la correction.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Propriétés du R32 calculées avec CoolProp. Symboles d'après la planche Éduscol « Le circuit frigorifique ». Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "À vous de tracer", sous: "mon cycle sur votre feuille", carte: null,
      phrases: [
        ["Bonjour. Je suis une molécule de R32, dans un climatiseur.", "Bonjour. Je suis une molécule de R trente-deux, dans un climatiseur."],
        ["Cette fois, c'est vous qui tracez mon cycle, sur la feuille avec le diagramme du R32.", "Cette fois, c'est vous qui tracez mon cycle, sur la feuille avec le diagramme du R trente-deux."],
        "Il vous faut un crayon, une règle et une calculatrice.",
        "À chaque étape, je vous donne la consigne. Mettez alors la vidéo en pause, faites l'étape, puis relancez pour voir la correction."
      ] },
    { id: "releves", num: "1", titre: "Noter les relevés", sous: "deux pressions, trois températures", organe: "compresseur", pres: 0,
      carte: [2, 2], puces: [["BP", "7,1 bar relatif"], ["HP", "23,8 bar relatif"]],
      phrases: [
        "Le technicien a branché son manifold et posé sa pince thermométrique.",
        ["Manomètre basse pression : 7,1 bar. Manomètre haute pression : 23,8 bar.", "Manomètre basse pression : sept virgule un bars. Manomètre haute pression : vingt-trois virgule huit bars."],
        ["Aspiration : 7 degrés. Refoulement : 95 degrés. Sortie du condenseur : 34 degrés.", "Aspiration : sept degrés. Refoulement : quatre-vingt-quinze degrés. Sortie du condenseur : trente-quatre degrés."],
        "Notez ces cinq relevés dans le tableau de votre feuille. Mettez en pause.",
        "Vérifiez votre tableau : deux pressions relatives, trois températures."
      ],
      question: { q: "Quelle température lit la pince posée sur la tuyauterie de refoulement ?",
        choix: [["95 °C.", 1], ["7 °C.", 0], ["34 °C.", 0]],
        pourquoi: "Le refoulement est la sortie du compresseur, l'endroit le plus chaud du circuit : 95 °C. 7 °C est l'aspiration, 34 °C la sortie du condenseur." } },
    { id: "absolu", num: "2", titre: "Passer en absolu", sous: "lire les saturations",
      carte: [14.5, 15], calques: { isobaresCycle: 1, isothermes: 2 },
      puces: [["BP", "8,1 bar abs"], ["HP", "24,8 bar abs"]],
      phrases: [
        ["Ajoutez 1 bar à chaque pression. Tracez les deux isobares. Lisez les températures d'évaporation et de condensation. Mettez en pause.", "Ajoutez un bar à chaque pression. Tracez les deux isobares. Lisez les températures d'évaporation et de condensation. Mettez en pause."],
        ["Correction : 7,1 plus 1, la basse pression vaut 8,1 bar absolus. 23,8 plus 1, la haute pression vaut 24,8 bar absolus.", "Correction : sept virgule un plus un, la basse pression vaut huit virgule un bars absolus. Vingt-trois virgule huit plus un, la haute pression vaut vingt-quatre virgule huit bars absolus."],
        ["À 8,1 bar, l'isotherme horizontale sous la cloche dit 0 degré : c'est l'évaporation.", "À huit virgule un bars, l'isotherme horizontale sous la cloche dit zéro degré : c'est l'évaporation."],
        ["À 24,8 bar, elle dit 40 degrés : c'est la condensation.", "À vingt-quatre virgule huit bars, elle dit quarante degrés : c'est la condensation."],
        ["Surchauffe : 7 degrés à l'aspiration contre 0, soit 7 K.", "Surchauffe : sept degrés à l'aspiration contre zéro, soit sept kelvins."],
        ["Sous-refroidissement : 40 contre 34, soit 6 K.", "Sous-refroidissement : quarante contre trente-quatre, soit six kelvins."]
      ],
      question: { q: "Condensation à 40 °C, sortie du condenseur à 34 °C. Quel est le sous-refroidissement ?",
        choix: [["6 K.", 1], ["74 K.", 0], ["34 K.", 0]],
        pourquoi: "Le sous-refroidissement est l'écart entre la température de condensation et la température du liquide à la sortie du condenseur : 40 − 34 = 6 K." } },
    { id: "points", num: "3", titre: "Placer les points", sous: "1, 2 et 3",
      carte: [0, 0], puces: [["BP", "8,1 bar abs"], ["HP", "24,8 bar abs"]],
      calques: { isobaresCycle: 0, isothermes: 0, pt1: 1, pt2: 2, pt3: 3 },
      phrases: [
        ["Placez le point 1, sortie de l'évaporateur, le point 2, refoulement, et le point 3, sortie du condenseur. Lisez leur enthalpie. Mettez en pause.", "Placez le point un, sortie de l'évaporateur, le point deux, refoulement, et le point trois, sortie du condenseur. Lisez leur enthalpie. Mettez en pause."],
        ["Correction. Point 1 : basse pression et 7 degrés, dans la vapeur. Environ 524 kilojoules par kilo.", "Correction. Point un : basse pression et sept degrés, dans la vapeur. Environ cinq cent vingt-quatre kilojoules par kilo."],
        ["Point 2 : haute pression et 95 degrés, loin à droite. Environ 591 kilojoules par kilo.", "Point deux : haute pression et quatre-vingt-quinze degrés, loin à droite. Environ cinq cent quatre-vingt-onze kilojoules par kilo."],
        ["Point 3 : haute pression et 34 degrés, dans le liquide. Environ 263 kilojoules par kilo.", "Point trois : haute pression et trente-quatre degrés, dans le liquide. Environ deux cent soixante-trois kilojoules par kilo."],
        "Un écart de quelques kilojoules par kilo vient de la lecture sur le diagramme : il est normal."
      ],
      question: { q: "Le point 1 se trouve à l'intersection de quelles lignes ?",
        choix: [["L'isobare basse pression et l'isotherme de la température d'aspiration.", 1],
                ["L'isobare haute pression et l'isotherme de refoulement.", 0],
                ["L'isobare basse pression et la courbe de liquide saturé.", 0]],
        pourquoi: "Le point 1 est la sortie de l'évaporateur : basse pression, 8,1 bar absolus, et température d'aspiration, 7 °C. Il est dans la vapeur, hors de la cloche, donc ces deux lignes suffisent à le placer." } },
    { id: "point4", num: "4", titre: "Placer le point 4", sous: "sous la cloche",
      carte: [0, 0], puces: [["BP", "8,1 bar abs"], ["HP", "24,8 bar abs"]],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, detente: 2, pt4: 3, isotitres: 3 },
      phrases: [
        ["Placez le point 4, entrée de l'évaporateur. Lisez son titre. Mettez en pause.", "Placez le point quatre, entrée de l'évaporateur. Lisez son titre. Mettez en pause."],
        "Correction : aucun relevé ne le place, car il est sous la cloche.",
        ["Descendez tout droit depuis le point 3, sur l'isenthalpe 263, jusqu'à l'isobare basse pression.", "Descendez tout droit depuis le point trois, sur l'isenthalpe deux cent soixante-trois, jusqu'à l'isobare basse pression."],
        ["Le point 4 tombe sur l'isotitre 0,2 : 20 % de vapeur à l'entrée de l'évaporateur.", "Le point quatre tombe sur l'isotitre zéro virgule deux : vingt pour cent de vapeur à l'entrée de l'évaporateur."]
      ],
      question: { q: "Comment place-t-on le point 4 ?",
        choix: [["À la verticale du point 3, jusqu'à la basse pression : h4 = h3.", 1],
                ["Avec la température d'aspiration.", 0],
                ["Sur la courbe de vapeur saturée.", 0]],
        pourquoi: "Dans le détendeur, l'enthalpie ne change pas. Le point 4 a le même h que le point 3 et se trouve à la basse pression, sous la cloche." } },
    { id: "trace", num: "5", titre: "Tracer le cycle", sous: "relier les points dans l'ordre",
      carte: [0, 15], diag: [5, 12], puces: [["BP", "8,1 bar abs"], ["HP", "24,8 bar abs"]],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0, surchauffe: 1, desurchauffe: 1, sousRefroidissement: 1, detente: 1, compressionIdeale: 2 },
      phrases: [
        ["Reliez 4, 1, 2, 3, puis revenez à 4. Depuis le point 1, suivez aussi l'isentrope jusqu'à la haute pression. Mettez en pause.", "Reliez quatre, un, deux, trois, puis revenez à quatre. Depuis le point un, suivez aussi l'isentrope jusqu'à la haute pression. Mettez en pause."],
        "Correction : le cycle est fermé, avec la surchauffe au bout de l'évaporateur et la désurchauffe au début du condenseur.",
        ["L'isentrope arrive vers 79 degrés. Le vrai compresseur refoule à 95 degrés : il chauffe le gaz plus qu'un compresseur idéal.", "L'isentrope arrive vers soixante-dix-neuf degrés. Le vrai compresseur refoule à quatre-vingt-quinze degrés : il chauffe le gaz plus qu'un compresseur idéal."]
      ],
      question: { q: "L'isentrope depuis le point 1 arrive à 79 °C, le refoulement mesuré est 95 °C. Que montre cet écart ?",
        choix: [["Le vrai compresseur chauffe le gaz plus qu'un compresseur idéal.", 1],
                ["Le relevé de refoulement est faux.", 0],
                ["Le fluide se condense dans le compresseur.", 0]],
        pourquoi: "L'isentrope est la compression idéale. Le vrai compresseur a des frottements et s'échauffe : la vapeur sort plus chaude, et son point 2 est à droite de la fin de l'isentrope." } },
    { id: "calculs", num: "6", titre: "Les calculs", sous: "écarts, COP, taux de compression",
      carte: [0, 0], diag: [12, 12], puces: [["froid", "261 kJ/kg"], ["chaud", "328 kJ/kg"]],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0 },
      phrases: [
        ["Calculez les trois écarts d'enthalpie, le COP froid, le COP chaud et le taux de compression. Mettez en pause.", "Calculez les trois écarts d'enthalpie, le C O P froid, le C O P chaud et le taux de compression. Mettez en pause."],
        ["Correction. Évaporateur : 524 moins 263, soit 261 kilojoules par kilo.", "Correction. Évaporateur : cinq cent vingt-quatre moins deux cent soixante-trois, soit deux cent soixante et un kilojoules par kilo."],
        ["Compresseur : 591 moins 524, soit 67 kilojoules par kilo.", "Compresseur : cinq cent quatre-vingt-onze moins cinq cent vingt-quatre, soit soixante-sept kilojoules par kilo."],
        ["Condenseur : 591 moins 263, soit 328 kilojoules par kilo.", "Condenseur : cinq cent quatre-vingt-onze moins deux cent soixante-trois, soit trois cent vingt-huit kilojoules par kilo."],
        ["COP froid : 261 divisé par 67, environ 3,9. COP chaud : 328 divisé par 67, environ 4,9.", "C O P froid : deux cent soixante et un divisé par soixante-sept, environ trois virgule neuf. C O P chaud : trois cent vingt-huit divisé par soixante-sept, environ quatre virgule neuf."],
        ["Taux de compression : 24,8 divisé par 8,1, environ 3,1. Toujours avec les pressions absolues.", "Taux de compression : vingt-quatre virgule huit divisé par huit virgule un, environ trois virgule un. Toujours avec les pressions absolues."]
      ],
      question: { q: "Pourquoi le COP chaud vaut-il le COP froid plus 1 ?",
        choix: [["Le condenseur rend la chaleur prise à l'évaporateur plus l'énergie du compresseur.", 1],
                ["Le condenseur est plus grand que l'évaporateur.", 0],
                ["C'est un hasard de ce circuit.", 0]],
        pourquoi: "h2 − h3 = (h1 − h4) + (h2 − h1), soit 328 = 261 + 67. En divisant par 67 : 4,9 = 3,9 + 1." } },
    { id: "debit", num: "7", titre: "Le débit et les puissances", sous: "du kilo à l'installation",
      carte: [0, 0], diag: [12, 12], puces: [["froid", "3,5 kW"], ["chaud", "4,4 kW"]],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0 },
      phrases: [
        ["Le climatiseur produit 3,5 kilowatts de froid. Calculez le débit massique, puis les puissances au compresseur et au condenseur. Mettez en pause.", "Le climatiseur produit trois virgule cinq kilowatts de froid. Calculez le débit massique, puis les puissances au compresseur et au condenseur. Mettez en pause."],
        ["Correction : 3,5 divisé par 261, environ 0,013 kilo par seconde, soit 48 kilos par heure.", "Correction : trois virgule cinq divisé par deux cent soixante et un, environ zéro virgule zéro treize kilo par seconde, soit quarante-huit kilos par heure."],
        ["Au compresseur : 0,013 fois 67, environ 0,9 kilowatt.", "Au compresseur : zéro virgule zéro treize fois soixante-sept, environ zéro virgule neuf kilowatt."],
        ["Au condenseur : 0,013 fois 328, environ 4,4 kilowatts : les 3,5 kilowatts de froid plus les 0,9 du compresseur.", "Au condenseur : zéro virgule zéro treize fois trois cent vingt-huit, environ quatre virgule quatre kilowatts : les trois virgule cinq kilowatts de froid plus les zéro virgule neuf du compresseur."]
      ],
      question: { q: "Le climatiseur produit 3,5 kW de froid et chaque kilo prend 261 kJ. Quel est le débit massique ?",
        choix: [["Environ 0,013 kg/s, soit 48 kg/h.", 1], ["Environ 0,13 kg/s.", 0], ["Environ 75 kg/s.", 0]],
        pourquoi: "qm = puissance frigorifique ÷ Δh évaporateur = 3,5 ÷ 261 ≈ 0,013 kg/s. Un kilowatt vaut un kilojoule par seconde ; 0,013 × 3 600 ≈ 48 kg/h." } },
    { id: "fin", num: "", titre: "Votre feuille est complète", sous: "même méthode, autre fluide",
      carte: [0, 15], diag: [5, 12],
      calques: { isobaresCycle: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0, surchauffe: 0, desurchauffe: 0, sousRefroidissement: 0, detente: 0, compressionIdeale: 0 },
      phrases: [
        "Vous avez tracé un cycle réel à partir de cinq relevés.",
        ["Comparez avec la chambre froide au R134a du film Découverte : même méthode, autre fluide, autres chiffres.", "Comparez avec la chambre froide au R cent trente-quatre A du film Découverte : même méthode, autre fluide, autres chiffres."],
        "Gardez votre feuille : elle servira de modèle pour les relevés de votre prochaine installation."
      ],
      question: { q: "Pour tracer le cycle d'un autre fluide, que faut-il changer ?",
        choix: [["Le diagramme : chaque fluide a le sien.", 1], ["La méthode.", 0], ["Rien du tout.", 0]],
        pourquoi: "La méthode reste la même : relevés, passage en absolu, saturations, points, tracé, calculs. Seul le diagramme change, car chaque fluide a ses propres courbes." } }
  ],
  portes: [
    { t: "Le diagramme enthalpique, niveau 2 : découverte", h: "../voyage/enthalpie2.html" },
    { t: "Le diagramme enthalpique, niveau 1", h: "../voyage/enthalpie.html" },
    { t: "La croix du frigoriste", h: "../f/a-croix-frigoriste/" },
    { t: "Le diagramme enthalpique interactif", h: "../packs/fluides/res/diagramme-enthalpique/" }
  ]
};

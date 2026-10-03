/* =====================================================================
   voyage-centrale.js — le récit de « Voyage dans tous ses états »,
   édition « les centrales frigorifiques »
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage-vis.js (une source pour le
   module, le film et la série), chargé par voyage-centrale.html ;
   `dossier` dit où sont ses voix. Pas de livret (choix de Franck, 03/10 :
   film + série + module) : `livret: ""`.
   INSTALLATION RACONTÉE : centrale positive HFC de supermarché, trois
   compresseurs semi-hermétiques à pistons en parallèle (comme le TP
   « Centrale de supermarché » du fonds et la centrale de l'atelier D30),
   collecteurs d'aspiration et de refoulement communs, régulateur de
   centrale (capteur de BP sur le collecteur, zone neutre, temporisation,
   permutation, compresseur de tête à variateur), séparateur d'huile commun,
   condenseur à air sur le toit (ventilateurs commandés par la HP, HP
   flottante l'hiver), bouteille, ligne liquide, trois postes (meuble des
   produits laitiers, vitrine de la charcuterie, chambre froide de réserve)
   avec électrovanne + détendeur thermostatique + évaporateur.
   FLUIDE (choix de Franck, 03/10) : R449A, mélange zéotrope de quatre
   fluides (R-32, R-125, R-1234yf, R-134a — ASHRAE 34 / NF EN 378 ; la
   composition n'est PAS dans le fonds). L'héroïne est une molécule de
   R-134a, le moins volatil des quatre (elle bout parmi les dernières) :
   c'est elle qui raconte le glissement. Aucune pression ni température
   chiffrée ; « dix heures » est une heure de la journée, pas une donnée.
   F-GAS (choix de Franck, 03/10) : une phrase sans chiffre au chapitre 11 —
   centrales neuves de forte puissance interdites aux HFC à fort PRP
   (règlement UE sur les gaz fluorés), passage le plus souvent au CO₂.
   SOURCES : fonds maigre sur la centrale elle-même (TP « Centrale de
   supermarché » : trois compresseurs, pressostats, intérêt de plusieurs
   compresseurs ; activité « collecteur d'aspiration » ; épreuve E32 :
   chambre positive de supermarché au R449A) ; glissement : station
   « Pourquoi la température glisse ? » et HabFluide ch. 8 (bulle, rosée,
   surchauffe au point de rosée, sous-refroidissement au point de bulle,
   charge en phase liquide) ; le reste suit la pratique courante des
   régulateurs de centrale. À RELIRE PAR FRANCK avant les scènes.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-centrale-scenes-*.js) : ajouter une phrase décale tout.
   CARTE (moteur/voyage-centrale-dessin.js, D.CIRCUIT_PTS, 0 à 10, on
   reboucle) : 0 coin bas gauche (ligne liquide) · 1 pied du poste de
   l'héroïne · 1,25 détendeur · 1,65 évaporateur · 2 sortie du meuble ·
   3 collecteur d'aspiration · 3,5 compresseur n° 2 · 4 collecteur de
   refoulement · 6 séparateur d'huile · 7 condenseur · 8 bouteille · 10 = 0.
   DIAGRAMME : `diag: [w0, w1]` = position sur le cycle de
   donnees/voyage-centrale-diagramme.js (0 entrée évaporateur · 1 point de
   rosée BP · 2 sortie du meuble · 3 aspiration du compresseur ·
   4 refoulement · 5 point de rosée HP · 6 point de bulle HP · 7 liquide
   sous-refroidi · 8 = 0, on reboucle) ; `calques: { id: k }` = calque
   montré à partir de la phrase k.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "la centrale frigorifique racontée par une molécule",
  edition: "les centrales frigorifiques",
  dossier: "voyage-centrale",
  film: "../voyage/centrale.html", livret: "", // pas de livret pour cette édition : le module n'affiche pas le bouton
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le circuit de base",
    notions: [["Plusieurs postes de froid sur une seule machine", "1, 3"],
              ["Le mélange zéotrope et le glissement de température (bulle, rosée)", "2, 9"],
              ["Le collecteur d'aspiration : une seule basse pression", "3"],
              ["Les compresseurs en parallèle : pourquoi plusieurs", "4"],
              ["La régulation par la basse pression : capteur, consigne, zone neutre", "5, 6"],
              ["La marche étagée, la permutation, le variateur", "6, 7"],
              ["Le refoulement commun, le clapet anti-retour, le séparateur d'huile", "8"],
              ["Le condenseur et la haute pression", "9"],
              ["La bouteille, la ligne liquide, la surveillance, le règlement F-Gas", "10, 11"]],
    usage: "Ce voyage suppose connu le circuit de base (le premier « Voyage dans tous ses états »). Il se regarde d'un trait ou en trois temps : le rayon frais et le mélange (1 à 3), les compresseurs et leur régulation (4 à 7), le retour par le toit et la surveillance (8 à 11). La centrale décrite est un modèle courant (positive, trois compresseurs à pistons, R449A) : la documentation du constructeur et du régulateur fait foi. Ce voyage ouvre le sujet sans remplacer le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de R-134a, dans le mélange R449A, à travers la centrale d'un supermarché : le meuble et son électrovanne, le glissement de température, le collecteur d'aspiration, les compresseurs en parallèle, la basse pression qui commande, la marche étagée et le variateur, le séparateur d'huile, le condenseur sur le toit, la bouteille, puis ce que surveille le technicien.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "dans une centrale frigorifique", carte: null,
      phrases: [
        "Bonjour. Je suis une molécule de fluide frigorigène.",
        "Aujourd'hui, je travaille dans un supermarché : au rayon frais, et dans la chambre froide de réserve.",
        "C'est le froid positif : celui des produits frais, gardés au-dessus de zéro. Les surgelés ont leur propre centrale.",
        "Tous ces meubles sont refroidis par une seule machine, au local technique : la centrale. Plusieurs compresseurs qui travaillent ensemble.",
        "Voici mon circuit : les meubles et leurs détendeurs, le collecteur d'aspiration, les compresseurs, le séparateur d'huile, le condenseur, la bouteille.",
        "À droite, le diagramme enthalpique : à chaque pas, mon point y avance, et dessine mon cycle.",
        ["Je suis une molécule de R-134a. Mais ici, je fais partie d'un mélange : le R449A. Vous verrez ce que ça change.", "Je suis une molécule de R cent trente-quatre a. Mais ici, je fais partie d'un mélange : le R quatre cent quarante-neuf A. Vous verrez ce que ça change."],
        "Suivez-moi : on commence au rayon frais."
      ] },
    { id: "meuble", num: "1", titre: "Le meuble frigorifique", sous: "un poste parmi d'autres", organe: "evaporateur", pres: 2,
      role: "prendre la chaleur de l'air qui refroidit les produits",
      carte: [0.6, 1.9], diag: [7, 8.6], puces: [["HP", "liquide"], ["BP", "électrovanne + détendeur"]],
      phrases: [
        "Voici le meuble des produits laitiers. Au fond, caché derrière une grille : l'évaporateur.",
        "Son rôle : prendre la chaleur de l'air qui refroidit les produits.",
        "J'arrive liquide, par la longue ligne liquide qui vient du local technique.",
        "Devant le meuble, une électrovanne. Le régulateur du meuble l'ouvre quand l'air se réchauffe, et la ferme quand il est assez froid.",
        "Puis le détendeur : je passe par un passage étroit, et ma pression tombe d'un coup.",
        "Dans l'évaporateur, je bous : je prends la chaleur de l'air que les ventilateurs soufflent sur les produits.",
        "À côté, la vitrine de la charcuterie et la chambre froide de réserve ont, elles aussi, leur électrovanne, leur détendeur et leur évaporateur."
      ],
      question: { q: "À quoi sert l'électrovanne, devant le meuble ?",
        choix: [["À laisser passer le liquide quand le meuble a besoin de froid, et à le couper sinon.", 1],
                ["À faire baisser la pression du liquide.", 0],
                ["À séparer l'huile du fluide.", 0]],
        pourquoi: "Le régulateur du meuble ouvre l'électrovanne quand l'air se réchauffe et la ferme quand il est assez froid. C'est le détendeur, après elle, qui fait baisser la pression." } },
    { id: "glissement", num: "2", titre: "Je bous en me réchauffant", sous: "le glissement de température",
      carte: [1.6, 1.95], diag: [8.6, 9], calques: { isoFroidBP: 4, isoChaudBP: 4 }, puces: [["BP", "pression constante"], ["chaud", "température ↑"]],
      phrases: [
        "Ici, je ne bous pas tout à fait comme d'habitude.",
        ["Le R449A est un mélange de quatre fluides. Leurs molécules n'ont pas toutes la même envie de s'évaporer.", "Le R quatre cent quarante-neuf A est un mélange de quatre fluides. Leurs molécules n'ont pas toutes la même envie de s'évaporer."],
        ["Les plus pressées partent en vapeur les premières. Moi, le R-134a, je suis la plus lente des quatre.", "Les plus pressées partent en vapeur les premières. Moi, le R cent trente-quatre a, je suis la plus lente des quatre."],
        "Le liquide qui reste contient donc de plus en plus de molécules lentes, comme moi : à la même pression, il bout un peu plus chaud.",
        "Résultat : ma pression ne change pas, mais ma température monte pendant que je bous. C'est le glissement de température.",
        "Deux mots à retenir. Le point de bulle : la première bulle de vapeur apparaît dans le liquide.",
        "Le point de rosée : la dernière goutte de liquide disparaît.",
        "Pour le technicien : la surchauffe se compte depuis le point de rosée, le sous-refroidissement depuis le point de bulle."
      ],
      question: { q: "Dans l'évaporateur, à pression constante, que fait la température du R449A pendant qu'il bout ?",
        choix: [["Elle monte un peu : c'est le glissement de température.", 1],
                ["Elle reste exactement la même.", 0],
                ["Elle descend.", 0]],
        pourquoi: "Le R449A est un mélange zéotrope : les molécules les plus volatiles s'évaporent les premières. Le liquide qui reste bout un peu plus chaud : la température monte du point de bulle vers le point de rosée, à pression constante." } },
    { id: "collecteur", num: "3", titre: "Le collecteur d'aspiration", sous: "toutes les vapeurs se rejoignent",
      carte: [1.95, 3.1], diag: [9, 11], puces: [["BP", "une seule basse pression"]],
      phrases: [
        "Je sors du meuble en vapeur, un peu réchauffée : c'est la surchauffe, que règle le détendeur.",
        "Je pars dans la conduite d'aspiration : un gros tube isolé, qui traverse le magasin jusqu'au local technique.",
        "En route, les vapeurs des autres meubles me rejoignent.",
        "Au local technique, nous entrons toutes dans le collecteur d'aspiration : un gros tube, sur lequel sont branchés tous les compresseurs.",
        "Ici, une seule pression pour tout le monde : la basse pression de la centrale.",
        "Tous les meubles bouillent donc à la même pression. Chacun règle sa température avec son électrovanne."
      ],
      question: { q: "Pourquoi tous les meubles d'une centrale bouillent-ils à la même pression ?",
        choix: [["Ils sont tous reliés au même collecteur d'aspiration.", 1],
                ["Ils ont tous le même détendeur.", 0],
                ["Le condenseur l'impose.", 0]],
        pourquoi: "Toutes les conduites d'aspiration arrivent au même collecteur, où aspirent tous les compresseurs : une seule basse pression pour tous les meubles. Chaque meuble règle sa température en ouvrant ou en fermant son électrovanne." } },
    { id: "compresseurs", num: "4", titre: "Plusieurs compresseurs", sous: "montés en parallèle", organe: "compresseur", pres: 2,
      role: "aspirer ensemble la vapeur de tout le magasin, et la comprimer",
      carte: [3.1, 3.55], diag: [3, 4], puces: [["BP", "même aspiration"], ["HP", "même refoulement"]],
      phrases: [
        "Voici les compresseurs de la centrale : trois compresseurs à pistons, semi-hermétiques, côte à côte sur un même châssis.",
        "Leur rôle : aspirer ensemble la vapeur de tout le magasin, et la comprimer.",
        "Ils sont montés en parallèle : chacun aspire dans le même collecteur, et refoule dans un même collecteur de refoulement.",
        "Pourquoi trois, et pas un seul gros ? Parce que le froid demandé change sans cesse.",
        "Avec trois compresseurs, on fait tourner seulement ceux qu'il faut.",
        "Et si l'un tombe en panne, les autres continuent : les produits restent au froid.",
        "Chacun a ses vannes : on peut l'isoler pour le réparer, sans arrêter le magasin.",
        "Moi, j'entre dans le deuxième. On me comprime : ma pression monte, ma température aussi."
      ],
      question: { q: "Quel est l'intérêt de plusieurs compresseurs en parallèle, plutôt qu'un seul gros ?",
        choix: [["Adapter la puissance au besoin, et continuer si l'un tombe en panne.", 1],
                ["Comprimer la vapeur trois fois de suite.", 0],
                ["Se passer de condenseur.", 0]],
        pourquoi: "Le froid demandé change sans cesse : on ne fait tourner que les compresseurs nécessaires. Et si l'un tombe en panne, les autres continuent. En parallèle, chacun comprime de la même basse pression à la même haute pression." } },
    { id: "bp", num: "5", titre: "La basse pression commande", sous: "le capteur et le régulateur",
      carte: [3, 3], diag: [3, 3], puces: [["BP", "capteur → régulateur"]],
      phrases: [
        "Comment la centrale sait-elle combien de compresseurs faire tourner ? Elle surveille la basse pression.",
        "Sur le collecteur d'aspiration, un capteur de pression la mesure sans arrêt.",
        "Il l'envoie au régulateur de centrale, dans l'armoire électrique.",
        "Si les meubles produisent plus de vapeur que les compresseurs n'en aspirent, la basse pression monte.",
        "S'ils en produisent moins, elle baisse.",
        "Le régulateur compare la basse pression à sa consigne, et décide.",
        "Une basse pression stable, c'est une température stable dans tous les meubles."
      ],
      question: { q: "Les meubles produisent plus de vapeur que les compresseurs n'en aspirent. Que fait la basse pression ?",
        choix: [["Elle monte.", 1],
                ["Elle baisse.", 0],
                ["Elle ne change pas.", 0]],
        pourquoi: "Plus de vapeur arrive au collecteur que les compresseurs n'en emportent : elle s'y accumule, la basse pression monte. Le capteur le voit, et le régulateur de centrale réagit." } },
    { id: "etages", num: "6", titre: "Un de plus, un de moins", sous: "la marche étagée",
      carte: [3, 3], diag: [3, 3], puces: [["BP", "zone neutre"]],
      phrases: [
        "Dix heures : les clients se servent, on remplit les rayons. Les électrovannes s'ouvrent, la basse pression monte.",
        "Elle dépasse le haut de la zone neutre : le régulateur démarre un compresseur de plus.",
        "Pas tout de suite : il attend un peu, pour laisser à la pression le temps de réagir.",
        "Le soir, on baisse les rideaux de nuit sur les meubles. La basse pression descend sous la zone neutre : un compresseur s'arrête.",
        "Entre les deux seuils, dans la zone neutre, le régulateur ne touche à rien.",
        "Il fait aussi tourner les rôles : ce n'est pas toujours le même compresseur qui démarre le premier. Chacun travaille autant que les autres.",
        "Et il limite les démarrages : chaque démarrage fatigue le moteur."
      ],
      question: { q: "La basse pression est dans la zone neutre. Que fait le régulateur de centrale ?",
        choix: [["Rien : il ne démarre ni n'arrête aucun compresseur.", 1],
                ["Il démarre un compresseur.", 0],
                ["Il arrête tous les compresseurs.", 0]],
        pourquoi: "Au-dessus de la zone neutre, le régulateur ajoute un compresseur ; en dessous, il en retire un, toujours après une temporisation. Dans la zone neutre, il ne change rien : c'est ce qui évite les démarrages à répétition." } },
    { id: "variateur", num: "7", titre: "Le variateur", sous: "le compresseur de tête",
      carte: [3.5, 3.5], diag: [3, 3], puces: [["BP", "presque plate"]],
      phrases: [
        "Avec des compresseurs qui démarrent et s'arrêtent, la puissance change par marches : la basse pression fait des vagues.",
        "Sur beaucoup de centrales, le premier compresseur a un variateur de vitesse : c'est le compresseur de tête.",
        "Le variateur change la fréquence du courant : le moteur tourne plus ou moins vite, et aspire plus ou moins de vapeur.",
        "Il remplit l'écart entre deux marches : la basse pression reste presque plate.",
        "Quand il est au maximum, le régulateur démarre un compresseur de plus, et le variateur ralentit pour compenser.",
        "Moins de démarrages, des meubles plus réguliers, et moins d'énergie dépensée."
      ],
      question: { q: "À quoi sert le variateur du compresseur de tête ?",
        choix: [["À régler la puissance en continu, entre deux marches.", 1],
                ["À démarrer tous les compresseurs ensemble.", 0],
                ["À refroidir le condenseur.", 0]],
        pourquoi: "En faisant varier la vitesse du compresseur de tête, le variateur fait varier la vapeur aspirée sans palier. Il comble l'écart entre deux compresseurs : la basse pression reste presque plate, avec moins de démarrages." } },
    { id: "refoulement", num: "8", titre: "Le collecteur de refoulement", sous: "et l'huile des compresseurs",
      carte: [3.55, 6.1], diag: [4, 4], puces: [["HP", "refoulement commun"], ["chaud", "huile récupérée"]],
      phrases: [
        "Je sors du compresseur, chaude, au refoulement.",
        "Sur chaque refoulement, un clapet anti-retour : un compresseur à l'arrêt ne reçoit pas le gaz des autres.",
        "Les refoulements se rejoignent dans le collecteur de refoulement.",
        "Avec nous partent quelques gouttelettes d'huile, arrachées aux compresseurs.",
        "Un séparateur d'huile, commun à toute la centrale, les récupère.",
        "Puis il faut rendre l'huile aux compresseurs : à chacun sa part, ni trop, ni trop peu.",
        "Sur une centrale, c'est tout un circuit. Ce circuit d'huile, c'est un autre voyage."
      ],
      question: { q: "Pourquoi un clapet anti-retour sur le refoulement de chaque compresseur ?",
        choix: [["Pour qu'un compresseur à l'arrêt ne reçoive pas le gaz des autres.", 1],
                ["Pour régler la basse pression.", 0],
                ["Pour séparer l'huile du fluide.", 0]],
        pourquoi: "Tous les compresseurs refoulent dans le même collecteur. Sans clapet, le gaz chaud des compresseurs en marche reviendrait dans celui qui est arrêté." } },
    { id: "condenseur", num: "9", titre: "Le condenseur sur le toit", sous: "le glissement, dans l'autre sens", organe: "condenseur", pres: 2,
      role: "rejeter dehors la chaleur prise dans tout le magasin",
      carte: [6.1, 7.6], diag: [4, 7], calques: { isoChaudHP: 4, isoFroidHP: 4 }, puces: [["HP", "pression constante"], ["froid", "température ↓"]],
      phrases: [
        "Je monte sur le toit, jusqu'au condenseur à air : une grande batterie, et plusieurs ventilateurs.",
        "Son rôle : rejeter dehors la chaleur prise dans tout le magasin.",
        "Ma chaleur passe à l'air du dehors : je me condense.",
        "Je commence au point de rosée, et je finis liquide au point de bulle.",
        "Cette fois, ma température descend pendant que je me condense : le glissement, dans l'autre sens.",
        "Les ventilateurs ne tournent pas tous à la fois : un capteur de haute pression les commande, un par un, ou avec un variateur.",
        "En hiver, l'air froid aide : on laisse la haute pression baisser, juste assez pour que les détendeurs restent bien alimentés.",
        "Moins de haute pression, moins de travail pour les compresseurs."
      ],
      question: { q: "En hiver, pourquoi ne pas laisser la haute pression descendre sans limite ?",
        choix: [["Les détendeurs doivent rester bien alimentés.", 1],
                ["Les ventilateurs s'arrêteraient.", 0],
                ["Le fluide gèlerait dans le condenseur.", 0]],
        pourquoi: "Une haute pression plus basse fait travailler moins les compresseurs : on la laisse descendre en hiver. Mais il faut assez d'écart de pression pour que les détendeurs des meubles restent bien alimentés." } },
    { id: "bouteille", num: "10", titre: "La bouteille et la ligne liquide", sous: "le retour au rayon frais",
      carte: [7.6, 10.6], diag: [7, 7], puces: [["HP", "liquide"]],
      phrases: [
        "Liquide, je descends dans la bouteille, au local technique.",
        "Elle garde une réserve : quand des meubles s'arrêtent, le fluide qu'ils n'utilisent pas attend ici.",
        "Je repars par la ligne liquide. Un filtre déshydrateur arrête l'humidité et les saletés.",
        "Au voyant, le technicien vérifie que je passe bien liquide, sans bulles.",
        "Puis la longue ligne liquide me ramène au rayon frais.",
        "Et le voyage recommence, vers le meuble qui aura besoin de moi."
      ],
      question: { q: "À quoi sert la bouteille d'une centrale ?",
        choix: [["À garder une réserve de liquide, qui change selon les meubles en marche.", 1],
                ["À séparer l'huile du fluide.", 0],
                ["À faire bouillir le fluide.", 0]],
        pourquoi: "Selon les meubles en marche, le circuit n'a pas besoin de la même quantité de fluide. La bouteille garde le liquide qui n'est pas utilisé, et alimente la ligne liquide." } },
    { id: "surveillance", num: "11", titre: "Ce que l'on surveille", sous: "l'œil du technicien",
      carte: [3.5, 3.5], puces: [["HP", "sécurités"], ["BP", "étanchéité"]],
      phrases: [
        "Pour finir, voyons ce que surveille le technicien sur une centrale.",
        "Chaque compresseur a ses pressostats de sécurité, haute et basse pression : ils l'arrêtent en cas de danger.",
        "Le régulateur de centrale garde l'historique, et prévient le technicien d'astreinte en cas d'alarme.",
        "Une centrale contient beaucoup de fluide, dans des tubes qui courent dans tout le magasin : une fuite coûte cher, et pèse sur le climat.",
        "D'où les contrôles d'étanchéité réguliers, et souvent un détecteur de fuite dans le local technique.",
        ["On charge toujours le R449A en phase liquide : pris en vapeur, il sortirait de la bouteille avec ses molécules les plus pressées d'abord, et le mélange changerait.", "On charge toujours le R quatre cent quarante-neuf A en phase liquide : pris en vapeur, il sortirait de la bouteille avec ses molécules les plus pressées d'abord, et le mélange changerait."],
        "En Europe, le règlement sur les gaz fluorés interdit désormais ce fluide dans les grosses centrales neuves : elles passent le plus souvent au CO₂.",
        ["Le CO₂, c'est un autre voyage.", "Le C O 2, c'est un autre voyage."]
      ],
      question: { q: "Pourquoi charge-t-on le R449A en phase liquide ?",
        choix: [["Pour garder la bonne composition du mélange.", 1],
                ["Pour charger plus vite.", 0],
                ["Pour refroidir la bouteille.", 0]],
        pourquoi: "Le R449A est un mélange zéotrope : en phase vapeur, les fluides les plus volatils sortiraient de la bouteille les premiers. Le fluide chargé n'aurait plus la composition annoncée. On le charge donc en phase liquide." } },
    { id: "resume", num: "", titre: "La centrale en un tour", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le tour de la centrale.",
        "Au rayon frais, chaque meuble a son électrovanne, son détendeur et son évaporateur.",
        "Le collecteur d'aspiration rassemble les vapeurs : une seule basse pression pour tous.",
        "Les compresseurs en parallèle : on fait tourner ceux qu'il faut, et c'est la basse pression qui décide.",
        "Le variateur lisse, le séparateur garde l'huile, le condenseur rejette la chaleur dehors.",
        ["Et le R449A glisse : sa température monte quand il bout, et descend quand il se condense.", "Et le R quatre cent quarante-neuf A glisse : sa température monte quand il bout, et descend quand il se condense."],
        "Plusieurs compresseurs, une seule basse pression, beaucoup de meubles : c'est ça, une centrale."
      ],
      question: { q: "Sur une centrale, qu'est-ce qui décide du nombre de compresseurs en marche ?",
        choix: [["La basse pression, mesurée au collecteur d'aspiration.", 1],
                ["L'heure de la journée.", 0],
                ["La haute pression.", 0]],
        pourquoi: "Le capteur du collecteur d'aspiration mesure la basse pression ; le régulateur de centrale la compare à sa consigne et ajoute ou retire des compresseurs, avec le variateur entre deux marches." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "Pourquoi la température glisse ?", h: "../packs/fluides/res/glissement-temperature/" },
    { t: "Le régulateur électronique", h: "../packs/fluides/res/regulateur-electronique-interactif/" },
    { t: "Le circuit d'huile", h: "../packs/fluides/res/circuit-huile-interactif/" }
  ]
};

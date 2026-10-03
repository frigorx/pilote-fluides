/* =====================================================================
   voyage-nh3.js — le récit de « Voyage dans tous ses états », édition NH₃
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage.js (une source pour le module,
   le film, la série et le livret), pour une installation à l'ammoniac
   en RÉGIME NOYÉ PAR GRAVITÉ (thermosiphon) : bouteille séparatrice
   au-dessus des évaporateurs, niveau tenu par un régulateur à flotteur
   basse pression ; le régime pompé est cité (chapitre 2). Chargé À LA
   PLACE de voyage.js par voyage-nh3.html ; `dossier` dit où sont ses voix.
   FIL ROUGE : le voyage ne change pas (bouillir, comprimer, condenser,
   détendre) ; c'est le CARACTÈRE de l'ammoniac qui change le circuit :
   toxique (B2L), il ronge le cuivre (acier, compresseur ouvert), il ne se
   mélange pas à l'huile (séparateur d'huile, pot à huile), il emporte
   beaucoup de chaleur (peu de vapeur de détente).
   CHIFFRES : valeurs d'illustration, sans pression chiffrée (piège
   relatif / absolu) : évaporation −10 °C, condensation +35 °C,
   refoulement au-delà de 100 °C ; vapeur de détente ≈ 1/6 (calcul :
   (h′35 − h′−10) / r−10 ≈ (366 − 154) / 1 296 ≈ 0,16) ; R-134a ≈ 0,30.
   Odeur, sens de la vapeur (« il monte »), B2L : alignés sur les
   planches du site f/a-co2-nh3-compare et f/a-co2-nh3-deux-risques.
   DROIT : comme l'original — l'idée, jamais le texte du livre.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-nh3-scenes-*.js) : ajouter une phrase décale tout.
   CARTE : les nombres de `carte` sont des rangs de D.CIRCUIT_PTS
   (moteur/voyage-nh3-dessin.js) : 0 bouteille séparatrice (liquide),
   1 son fond, 2-4 descente et évaporateur, 5-6 retour, 7-8 sortie vapeur,
   9-10 compresseur, 11-12 séparateur d'huile, 13 condenseur, 14 réservoir,
   15-16 flotteur, 17-18 entrée dans la bouteille, 19 = 0.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "l'ammoniac en régime noyé raconté par une molécule",
  edition: "NH₃",
  dossier: "voyage-nh3",
  film: "../voyage/nh3.html", livret: "../voyage/voyage-dans-tous-ses-etats-nh3.pdf", // en ligne, le module vit dans voyage/
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "après le circuit de base : une porte vers le froid industriel",
    notions: [["Le régime noyé : bouteille séparatrice, évaporateur plein de liquide, thermosiphon", "1 à 3"],
              ["Pas de surchauffe à régler : la bouteille protège le compresseur", "3"],
              ["Le caractère de l'ammoniac : pas de cuivre, compresseur ouvert, huile à part", "4, 5, 9"],
              ["Condenseur évaporatif, air incondensable, détente par flotteur", "6 à 8"],
              ["La sécurité : B2L, odeur, détection en hauteur, conduite à tenir", "10"]],
    usage: "Ce voyage suppose connu le circuit de base (le premier « Voyage dans tous ses états »). Il se regarde d'un trait ou en trois temps : la boucle du régime noyé (1 à 3), le chemin jusqu'au flotteur (4 à 8), l'huile et la sécurité (9, 10). Températures d'illustration : la documentation de l'installation fait foi. Ce voyage ouvre le sujet ; il ne remplace ni le cours, ni les travaux pratiques, ni la formation exigée pour intervenir sur l'ammoniac."
  },
  logoLycee: "",
  /* le résumé de la description à coller sous la vidéo (node outils/voyage-film.mjs --description, RECIT=voyage-nh3) */
  resumeFilm: "Suivez une molécule d’ammoniac dans une installation industrielle en régime noyé : la bouteille séparatrice, l’évaporateur plein de liquide et le thermosiphon, le compresseur ouvert, le séparateur d’huile, le condenseur évaporatif, le réservoir et l’air incondensable, le régulateur à flotteur, le pot à huile, puis la fuite et la conduite à tenir.",
  /* le livret (outils/voyage-livret.mjs) : instants montrés par chapitre [phrase, avancée] — deux pour un organe,
     trois pour un chapitre sans organe, un pour le tour (légende d'une ligne) ; l'illustration de la couverture */
  moments: { intro: [[5, 0.9]], separateur: [[3, 0.7], [4, 0.7]], evaporateur: [[4, 0.6], [6, 0.5]],
    retour: [[0, 0.8], [3, 0.6], [5, 0.8]], compresseur: [[4, 0.75], [6, 0.7]], huile: [[3, 0.8], [6, 0.7]],
    condenseur: [[4, 0.7], [6, 0.6]], reservoir: [[3, 0.7], [5, 0.7]], flotteur: [[3, 0.8], [5, 0.7]],
    "pot-huile": [[3, 0.8], [6, 0.7]], fuite: [[0, 0.8], [4, 0.8], [6, 0.9]], resume: [[0, 0.95], [3, 0.9], [6, 0.9]] },
  illustration: "intro&k=6&f=0.95&nu=1", // nu=1 : sans l'en-tête (son sous-titre déborderait dans le cadre)
  /* fin du film : mention COURTE (comme le voyage d’origine) ; le crédit complet reste dans le module et le livret */
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "une molécule d'ammoniac", carte: null,
      phrases: [
        ["Bonjour. Je suis une molécule d'ammoniac : NH₃.", "Bonjour. Je suis une molécule d'ammoniac : N H trois."],
        ["Un atome d'azote, trois atomes d'hydrogène. Dans le métier, on m'appelle R717.", "Un atome d'azote, trois atomes d'hydrogène. Dans le métier, on m'appelle R sept cent dix-sept."],
        ["Je fais du froid dans les usines depuis près de cent cinquante ans. Mon PRP vaut 0 : je ne réchauffe pas la planète.", "Je fais du froid dans les usines depuis près de cent cinquante ans. Mon P R P vaut zéro : je ne réchauffe pas la planète."],
        "J'habite le circuit d'une grande usine agroalimentaire : ses chambres froides gardent la viande, le lait, les légumes.",
        "Ici, l'évaporateur ne reçoit pas un filet de liquide : il en est plein. On dit qu'il est noyé.",
        "J'ai aussi mon caractère : je suis toxique, je ronge le cuivre, et je ne me mélange pas à l'huile.",
        "Alors ici, pas de cuivre : les tuyauteries sont en acier. Et le circuit a des organes que vous n'avez peut-être jamais vus.",
        "Suivez-moi : je commence dans une grosse bouteille, au-dessus des évaporateurs."
      ] },
    { id: "separateur", num: "1", titre: "La bouteille séparatrice", sous: "ma réserve de liquide", organe: "separateur", pres: 2,
      role: "garder du liquide pour les évaporateurs, ne laisser partir que de la vapeur",
      carte: [0, 1], puces: [["BP", "basse pression"], ["froid", "−10 °C"]],
      phrases: [
        "Voici la bouteille séparatrice : un gros réservoir d'acier, placé plus haut que les évaporateurs.",
        "Son rôle : garder une réserve de liquide pour les évaporateurs, et ne laisser partir vers le compresseur que de la vapeur.",
        ["En bas, le liquide : une nappe calme, à −10 °C. J'y flotte, avec des milliards de voisines.", "En bas, le liquide : une nappe calme, à moins dix degrés. J'y flotte, avec des milliards de voisines."],
        "En haut, la vapeur. Entre les deux, une surface : c'est le niveau.",
        "Ce niveau doit rester à peu près constant : un régulateur à flotteur le surveille. On le verra plus tard.",
        "Par le fond, un gros tube descend vers les évaporateurs. J'y entre."
      ],
      question: { q: "Où place-t-on la bouteille séparatrice d'un régime noyé par gravité ?",
        choix: [["Plus haut que les évaporateurs.", 1],
                ["Plus bas que les évaporateurs.", 0],
                ["Contre le compresseur, à sa hauteur.", 0]],
        pourquoi: "Le liquide descend vers les évaporateurs par son propre poids : la bouteille doit donc être au-dessus d'eux. On parle de circulation par gravité, ou de thermosiphon." } },
    { id: "evaporateur", num: "2", titre: "L'évaporateur noyé", sous: "plein de liquide", organe: "evaporateur", pres: 2,
      role: "prendre la chaleur de la chambre froide",
      carte: [1, 6], puces: [["BP", "basse pression"], ["froid", "−10 °C"]],
      phrases: [
        "Voici l'évaporateur, accroché dans la chambre froide : des tubes, des ailettes et des ventilateurs.",
        "Son rôle : prendre la chaleur de la chambre.",
        "Je descends par le tube jusqu'au bas de l'évaporateur. Il est plein de liquide, de bas en haut.",
        "L'air de la chambre traverse les ailettes. Il est plus chaud que nous : des bulles naissent dans le liquide.",
        "Le mélange de liquide et de bulles est plus léger que le liquide du tube de descente : il remonte, et le liquide lourd pousse derrière.",
        "Pas de pompe : le poids du liquide suffit. On appelle cela un thermosiphon.",
        "Cette fois, je ne bous pas : je remonte liquide, emportée par les bulles de mes voisines.",
        "Il passe dans l'évaporateur plus de liquide qu'il ne s'en évapore : c'est ce qui le garde noyé, mouillé sur toute sa surface.",
        "Dans les très grandes usines, une pompe pousse le liquide vers les évaporateurs : on parle alors de régime pompé."
      ],
      question: { q: "Dans un évaporateur noyé par gravité, qu'est-ce qui fait circuler le fluide ?",
        choix: [["Le poids du liquide qui descend de la bouteille.", 1],
                ["Une pompe, placée sous l'évaporateur.", 0],
                ["Le compresseur, qui aspire le liquide.", 0]],
        pourquoi: "Le tube de descente est plein de liquide, lourd ; le tube de retour contient un mélange de liquide et de bulles, plus léger. Le lourd pousse le léger : c'est le thermosiphon. Dans les très grandes usines, une pompe prend le relais : c'est le régime pompé." } },
    { id: "retour", num: "3", titre: "Le retour à la bouteille", sous: "on se sépare",
      carte: [6, 9], puces: [["BP", "basse pression"], ["froid", "−10 °C"]],
      phrases: [
        "Je retombe dans la bouteille, et je refais le tour. Au deuxième passage, c'est mon tour : je bous, je deviens vapeur.",
        "Je remonte avec les autres, dans un mélange de liquide et de vapeur, jusqu'à la bouteille.",
        "Là, la place est grande : le mélange ralentit.",
        "Les gouttes, plus lourdes, retombent dans la nappe. La vapeur, elle, monte doucement.",
        "Je sors par le haut, sèche : pas une goutte ne me suit vers le compresseur.",
        "Ici, pas de surchauffe à régler : c'est la bouteille qui protège le compresseur, et tout l'évaporateur travaille mouillé."
      ],
      question: { q: "Pourquoi n'y a-t-il pas de surchauffe à régler sur un évaporateur noyé ?",
        choix: [["La bouteille retient le liquide : seule la vapeur part au compresseur.", 1],
                ["L'ammoniac ne peut pas surchauffer.", 0],
                ["Le compresseur accepte le liquide.", 0]],
        pourquoi: "Dans la bouteille, le mélange ralentit : les gouttes retombent, la vapeur sort sèche par le haut. C'est la bouteille, et non la surchauffe, qui protège le compresseur. Et l'évaporateur, mouillé sur toute sa surface, échange mieux la chaleur." } },
    { id: "compresseur", num: "4", titre: "Le compresseur ouvert", sous: "on me serre", organe: "compresseur", pres: 2,
      role: "aspirer la vapeur et la comprimer",
      carte: [9, 10.5], puces: [["BP", "basse pression"], ["HP", "haute pression"]],
      phrases: [
        "Voici le compresseur. Celui-ci est à pistons, et il est ouvert : son moteur est dehors, à côté de lui.",
        "Son rôle : aspirer ma vapeur et la comprimer.",
        "Pourquoi le moteur dehors ? Ses bobinages sont en cuivre, et je ronge le cuivre.",
        "L'arbre du moteur entre dans le compresseur par une garniture d'étanchéité : un point à surveiller.",
        "Le piston descend : j'entre avec mes voisines. Il remonte : on nous serre.",
        ["Et je chauffe beaucoup : plus de 100 °C au refoulement, davantage que la plupart des fluides.", "Et je chauffe beaucoup : plus de cent degrés au refoulement, davantage que la plupart des fluides."],
        "Alors on refroidit les culasses du compresseur, souvent avec de l'eau."
      ],
      question: { q: "Pourquoi le moteur d'un compresseur à l'ammoniac est-il souvent à l'extérieur ?",
        choix: [["L'ammoniac attaque le cuivre de ses bobinages.", 1],
                ["Pour qu'il fasse moins de bruit.", 0],
                ["L'ammoniac est trop froid pour lui.", 0]],
        pourquoi: "L'ammoniac attaque le cuivre et ses alliages. Un moteur bobiné en cuivre ne doit pas baigner dedans : il reste dehors, et l'arbre traverse le carter par une garniture d'étanchéité. C'est aussi pour cela que les tuyauteries sont en acier." } },
    { id: "huile", num: "5", titre: "Le séparateur d'huile", sous: "l'huile reste en arrière", organe: "separateurHuile", pres: 2,
      role: "retenir l'huile sortie du compresseur et la lui rendre",
      carte: [10.5, 12.3], puces: [["HP", "haute pression"], ["chaud", "plus de 100 °C"]],
      phrases: [
        "Voici le séparateur d'huile, juste à la sortie du compresseur.",
        "Son rôle : retenir l'huile que le compresseur a crachée avec moi, et la lui rendre.",
        "En sortant, je suis chargée de fines gouttes d'huile.",
        "Avec d'autres fluides, l'huile se mélange et fait le tour avec eux. Moi, je ne me mélange pas à l'huile.",
        "Si elle partait avec moi, elle irait se coller dans les échangeurs, et elle ne reviendrait pas.",
        "Dans le séparateur, je ralentis et je change de direction : les gouttes d'huile tombent au fond.",
        "Un flotteur renvoie l'huile au carter du compresseur. Moi, je continue vers le condenseur."
      ],
      question: { q: "Pourquoi le séparateur d'huile est-il indispensable avec l'ammoniac ?",
        choix: [["L'ammoniac ne se mélange pas à l'huile : elle ne reviendrait pas seule au compresseur.", 1],
                ["L'huile rendrait l'ammoniac inflammable.", 0],
                ["Il sert à refroidir l'ammoniac.", 0]],
        pourquoi: "Avec la plupart des fluides du commerce, l'huile se mélange au fluide et revient au compresseur avec lui. L'ammoniac, lui, ne se mélange pas avec les huiles qu'on emploie : celle qui s'échappe reste dans les échangeurs. Il faut la retenir dès la sortie du compresseur." } },
    { id: "condenseur", num: "6", titre: "Le condenseur évaporatif", sous: "je redeviens liquide", organe: "condenseur", pres: 2,
      role: "rejeter dehors la chaleur, avec de l'air et de l'eau",
      carte: [12.3, 13.5], puces: [["HP", "haute pression"], ["chaud", "+35 °C"]],
      phrases: [
        "Voici le condenseur, sur le toit. Celui-ci est évaporatif : il travaille avec de l'air et de l'eau.",
        "Son rôle : rejeter dehors la chaleur que j'ai prise dans les chambres, et celle de la compression.",
        "Je passe dans un serpentin de tubes. Au-dessus, des rampes arrosent les tubes d'eau.",
        "Un ventilateur fait passer l'air de bas en haut, à travers la pluie.",
        "Une partie de l'eau s'évapore : en s'évaporant, elle emporte ma chaleur. Cela refroidit bien mieux que l'air seul.",
        ["Je refroidis, puis je me condense à 35 °C : des gouttes, puis une nappe de liquide.", "Je refroidis, puis je me condense à trente-cinq degrés : des gouttes, puis une nappe de liquide."],
        "L'eau qui ne s'est pas évaporée retombe dans le bac, et une pompe la renvoie aux rampes.",
        "Cette eau se traite et se surveille, contre le tartre et les bactéries."
      ],
      question: { q: "Dans un condenseur évaporatif, qu'est-ce qui emporte le plus de chaleur ?",
        choix: [["L'eau qui s'évapore sur les tubes.", 1],
                ["L'air seul, sans eau.", 0],
                ["Le bac d'eau, en bas du condenseur.", 0]],
        pourquoi: "L'eau arrosée sur les tubes s'évapore dans le courant d'air : en s'évaporant, elle emporte beaucoup de chaleur. C'est pour cela qu'un condenseur évaporatif condense à une température plus basse qu'un condenseur à air." } },
    { id: "reservoir", num: "7", titre: "Le réservoir haute pression", sous: "et l'air qui s'invite", organe: "reservoir", pres: 2,
      role: "stocker le liquide qui sort du condenseur",
      carte: [13.5, 14.6], puces: [["HP", "haute pression"], ["liq", "liquide"]],
      phrases: [
        "Voici le réservoir haute pression : une grosse bouteille couchée, en acier.",
        "Son rôle : stocker le liquide qui sort du condenseur, avant de l'envoyer vers la basse pression.",
        "J'y tombe, liquide, et je rejoins la nappe.",
        "Au-dessus de nous, une poche de gaz qui ne se condense jamais : de l'air, entré pendant un entretien.",
        "Il prend la place de la vapeur dans le condenseur : la haute pression monte, et le compresseur consomme davantage.",
        "Un purgeur d'air l'aspire et le rejette dehors, à travers de l'eau qui retient l'ammoniac entraîné.",
        "Puis je repars par le fond, toujours liquide, vers le régulateur à flotteur."
      ],
      question: { q: "Que fait l'air dans un circuit à l'ammoniac ?",
        choix: [["Il ne se condense pas et fait monter la haute pression.", 1],
                ["Il se mélange à l'ammoniac et le rend moins toxique.", 0],
                ["Il aide le condenseur à refroidir.", 0]],
        pourquoi: "L'air est un gaz incondensable : il s'accumule là où le fluide se condense et y prend de la place. La haute pression monte, le compresseur consomme plus. Le purgeur d'air le retire." } },
    { id: "flotteur", num: "8", titre: "Le régulateur à flotteur", sous: "il tient le niveau", organe: "flotteur", pres: 2,
      role: "laisser entrer du liquide quand le niveau baisse",
      carte: [14.6, 19], puces: [["HP", "haute pression"], ["BP", "basse pression"]],
      phrases: [
        "Voici le régulateur à flotteur, à côté de la bouteille séparatrice, à la hauteur de son niveau.",
        "Son rôle : laisser entrer du liquide dans la bouteille quand son niveau baisse.",
        "Dedans, une boule creuse flotte sur le liquide, au même niveau que dans la bouteille.",
        "Les évaporateurs ont bu : le niveau descend, la boule descend avec lui. Elle ouvre le pointeau.",
        "Je passe le pointeau : ma pression chute d'un coup. Je me détends.",
        "Une molécule sur six environ se vaporise aussitôt. Avec bien des fluides, c'est près d'une sur trois.",
        "Je tombe dans la bouteille, très froide. La vapeur de détente, elle, monte et part tout droit au compresseur.",
        "Le niveau remonte, la boule remonte, le pointeau se ferme. Me voilà revenue à mon point de départ : le tour est bouclé."
      ],
      question: { q: "Le niveau baisse dans la bouteille séparatrice. Que fait le régulateur à flotteur ?",
        choix: [["Il s'ouvre et laisse entrer du liquide.", 1],
                ["Il se ferme pour garder le liquide.", 0],
                ["Il arrête le compresseur.", 0]],
        pourquoi: "La boule suit le niveau. Quand les évaporateurs ont bu et que le niveau baisse, elle descend et ouvre le pointeau : du liquide entre en se détendant. Quand le niveau remonte, elle referme. Ici, pas de détendeur thermostatique : c'est le niveau qui commande." } },
    { id: "pot-huile", num: "9", titre: "Le pot à huile", sous: "l'huile qui s'est échappée", organe: "potHuile", pres: 2,
      role: "recueillir l'huile au point le plus bas",
      carte: [0.55, 0.55], puces: [["BP", "basse pression"], ["froid", "−10 °C"]],
      phrases: [
        "Voici le pot à huile, sous la bouteille séparatrice, au point le plus bas.",
        "Son rôle : recueillir l'huile qui a échappé au séparateur d'huile.",
        "Quelques gouttes passent toujours. Elles font le tour avec moi, sans se mélanger.",
        "L'huile est plus lourde que moi : dans la bouteille, elle coule au fond, sous la nappe de liquide.",
        "Si elle s'accumulait, elle collerait aux tubes des évaporateurs, et ils feraient moins de froid.",
        "Alors elle descend dans le pot. Pour la vidanger, le technicien isole le pot et le réchauffe : l'ammoniac resté dedans s'évapore et repart dans le circuit.",
        "Puis il purge l'huile, lentement, par une vanne qui se referme toute seule, protégé, et jamais seul.",
        "Cette huile ne retourne pas au compresseur : elle part au recyclage."
      ],
      question: { q: "Où s'accumule l'huile dans une installation à l'ammoniac ?",
        choix: [["Aux points bas, sous le liquide : l'huile est plus lourde que l'ammoniac.", 1],
                ["Tout en haut, sur le liquide : l'huile est plus légère.", 0],
                ["Nulle part : elle se mélange à l'ammoniac.", 0]],
        pourquoi: "L'huile est plus lourde que l'ammoniac liquide et ne s'y mélange pas : elle coule au fond des bouteilles et des échangeurs. On la recueille au point le plus bas, dans un pot à huile, puis on la purge en suivant la procédure du site." } },
    { id: "fuite", num: "10", titre: "La fuite", sous: "on me sent tout de suite",
      carte: [9.5, 9.5], puces: [["fuite", "fuite"]],
      phrases: [
        "Un jour, la garniture du compresseur fuit. Ma voisine s'échappe dans la salle des machines.",
        ["Pour le climat, ce n'est pas grave : mon PRP vaut 0. Pour les personnes, si.", "Pour le climat, ce n'est pas grave : mon P R P vaut zéro. Pour les personnes, si."],
        ["Je suis toxique, et je peux brûler, lentement : je suis classée B2L.", "Je suis toxique, et je peux brûler, lentement : je suis classée B deux L."],
        "Mon odeur piquante se sent très tôt, bien avant le danger. Mais l'odeur ne remplace pas le détecteur.",
        "En vapeur, je suis plus légère que l'air : je monte. Les détecteurs et l'extraction d'air sont placés en hauteur.",
        "Mais une fuite de liquide forme un brouillard très froid, qui peut rester au ras du sol.",
        "Alors on alerte, on évacue en remontant le vent, et on n'intervient jamais seul, ni sans protection respiratoire.",
        "Sur ce circuit, seuls des frigoristes formés à l'ammoniac, et équipés, interviennent."
      ],
      question: { q: "Une fuite de vapeur d'ammoniac dans une salle des machines : où va-t-elle d'abord ?",
        choix: [["Vers le haut : la vapeur d'ammoniac est plus légère que l'air.", 1],
                ["Vers le sol : elle est plus lourde que l'air.", 0],
                ["Nulle part : elle reste sur place.", 0]],
        pourquoi: "La vapeur d'ammoniac est plus légère que l'air : elle monte. Les détecteurs et l'extraction sont placés en hauteur. Attention : une fuite de liquide forme un brouillard froid qui peut rester au sol. C'est l'inverse du CO₂, qui descend." } },
    { id: "resume", num: "", titre: "Le tour en entier", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le tour.",
        "De la bouteille séparatrice, je descends par mon poids dans l'évaporateur noyé, et j'y bous.",
        "Je remonte à la bouteille : le liquide y reste, la vapeur sèche part au compresseur.",
        "On me comprime ; le séparateur d'huile garde l'huile en arrière.",
        "Dans le condenseur évaporatif, je redeviens liquide ; le réservoir me garde.",
        "Le flotteur me détend et me rend à la bouteille : et le tour recommence.",
        "Bouillir, comprimer, condenser, détendre : le voyage ne change pas. C'est mon caractère qui change le circuit."
      ],
      question: { q: "Dans quel ordre l'ammoniac fait-il le tour ?",
        choix: [["Bouillir, comprimer, condenser, détendre.", 1],
                ["Comprimer, bouillir, détendre, condenser.", 0],
                ["Condenser, détendre, comprimer, bouillir.", 0]],
        pourquoi: "L'ammoniac bout dans l'évaporateur noyé et remonte à la bouteille séparatrice, qui ne laisse partir que la vapeur. Le compresseur la comprime, le condenseur évaporatif la liquéfie, et le flotteur la détend pour la rendre à la bouteille. Puis tout recommence." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "CO₂ et ammoniac : deux comportements inverses", h: "../f/a-co2-nh3-compare/" },
    { t: "CO₂ et ammoniac : reconnaître, puis s'arrêter", h: "../f/a-co2-nh3-deux-risques/" },
    { t: "Les classes de sécurité", h: "../f/a-classes-securite/" },
    { t: "Les compresseurs", h: "../f/a-compresseurs/" },
    { t: "Le séparateur d'huile", h: "../packs/fluides/res/separateur-huile-pedagogique/" },
    { t: "Les trois zones du condenseur", h: "../f/a-condenseur-trois-zones/" }
  ]
};

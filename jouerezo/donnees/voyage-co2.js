/* =====================================================================
   voyage-co2.js — le récit de « Voyage dans tous ses états », édition CO₂
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage.js (une source pour le module,
   le film, la série et le livret), pour une centrale CO₂ transcritique
   de supermarché avec bouteille intermédiaire. Chargé À LA PLACE de
   voyage.js par voyage-co2.html ; `dossier` dit où sont ses voix.
   FIL ROUGE : le titre devient littéral — la molécule traverse ses quatre
   états : vapeur, supercritique, liquide, et solide (neige carbonique).
   CHIFFRES ET MOTS : alignés sur la ligne CO₂ / R744 d'inerweb.fr, relue
   par Franck le 20/08/2026 (packs/fluides/res/co2-r744/RELECTURE-METIER.md) :
   point critique 31,0 °C / 73,8 bar ; point triple −56,6 °C / 5,18 bar ;
   ≈ 57 bar à l'arrêt à 20 °C ; « détendeur haute pression », « vapeur de
   détente », « bouteille intermédiaire », « groupe de maintien ». Point de
   fonctionnement d'illustration : évaporation −10 °C (≈ 26 bar), HP 90 bar,
   sortie du refroidisseur 35 °C, bouteille ≈ 35 bar (≈ 0 °C).
   DROIT : comme l'original — l'idée, jamais le texte du livre.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-co2-scenes-*.js) : ajouter une phrase décale tout.
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "le CO₂ transcritique raconté par une molécule",
  edition: "CO₂",
  dossier: "voyage-co2",
  film: "../voyage/co2.html", livret: "../voyage/voyage-dans-tous-ses-etats-co2.pdf", // liens « Le film » et « Le livret » du module en ligne
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid et de la climatisation, après le circuit de base",
    notions: [["Le point critique et le fluide supercritique", "3, 4"],
              ["Le refroidisseur de gaz : refroidir sans condenser", "4"],
              ["La haute pression réglée par le détendeur HP", "5"],
              ["La vapeur de détente : bouteille et vanne de gaz", "6, 7"],
              ["Deux détendeurs, deux missions", "5, 8"],
              ["La pression à l'arrêt, le groupe de maintien", "9"],
              ["Les risques : l'air remplacé, la neige carbonique", "10, 11"],
              ["Les quatre états du CO₂", "le tour"]],
    usage: "Ce voyage suppose connu le circuit de base (le premier « Voyage dans tous ses états »). Il se regarde d'un trait ou en trois temps : la haute pression et le point critique (1 à 5), la bouteille et le retour (6 à 8), l'arrêt et les risques (9 à 11). Les chiffres sont des valeurs d'illustration : la plaque et la documentation de l'installation font foi. Ce voyage ouvre le sujet sans remplacer le cours ni les travaux pratiques."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule de CO₂ dans la centrale transcritique d'un supermarché : le point critique, le refroidisseur de gaz qui refroidit sans condenser, le détendeur haute pression, la bouteille intermédiaire et la vapeur de détente, puis la pression à l'arrêt, la fuite et la neige carbonique.",
  /* livret et couverture (outils communs, RECIT=voyage-co2) : instants montrés par chapitre [phrase, avancée], image de couverture */
  moments: { intro: [[7, 0.9]], evaporateur: [[3, 0.7], [5, 0.7]], compresseur: [[4, 0.7], [6, 0.8]], critique: [[1, 0.8], [3, 0.8], [5, 0.7]],
    refroidisseur: [[4, 0.7], [7, 0.8]], "detendeur-hp": [[4, 0.8], [6, 0.7]], bouteille: [[3, 0.8], [6, 0.7]], "gaz-detente": [[3, 0.8], [5, 0.8]],
    detendeur: [[3, 0.8], [6, 0.8]], arret: [[1, 0.8], [3, 0.7], [4, 0.8]], fuite: [[2, 0.8], [4, 0.8], [5, 0.8]], neige: [[2, 0.8], [3, 0.8], [5, 0.8]], resume: [[0, 0.95]] },
  illustration: "intro&k=4&f=0.97",
  lireLivret: "Liquide : nappe. Vapeur : molécules séparées. Supercritique : volume plein. Solide : cristaux.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "une molécule de CO₂", carte: null,
      phrases: [
        ["Bonjour. Je suis une molécule de dioxyde de carbone : du CO₂.", "Bonjour. Je suis une molécule de dioxyde de carbone : du C O deux."],
        ["Dans le métier, on m'appelle R744. Mon PRP vaut 1 : c'est moi, la référence.", "Dans le métier, on m'appelle R sept cent quarante-quatre. Mon P R P vaut un : c'est moi, la référence."],
        "On me faisait déjà travailler dans les machines frigorifiques il y a plus de cent ans. On m'a mise de côté, puis on est revenu me chercher.",
        "J'habite le circuit d'une chambre froide, dans un supermarché.",
        "Mon voyage ressemble à celui des autres fluides, avec deux caractères bien à moi.",
        "Je travaille sous de très fortes pressions : plusieurs dizaines de bar, parfois plus de cent.",
        ["Et au-dessus de 31 °C, je ne sais plus me condenser.", "Et au-dessus de trente et un degrés, je ne sais plus me condenser."],
        "Suivez-moi : je vais traverser tous mes états."
      ] },
    { id: "evaporateur", num: "1", titre: "L'évaporateur", sous: "je prends la chaleur", organe: "evaporateur", pres: 2,
      role: "prend la chaleur de la chambre froide",
      carte: [0, 2], puces: [["BP", "≈ 26 bar"], ["froid", "−10 °C"]],
      phrases: [
        "Voici l'évaporateur, accroché dans la chambre froide : des tubes, des ailettes et des ventilateurs.",
        "Son rôle : prendre la chaleur de la chambre.",
        ["J'y entre très froide, à −10 °C, presque toute liquide.", "J'y entre très froide, à moins dix degrés, presque toute liquide."],
        "Ma pression est pourtant déjà de 26 bar environ : plus que la haute pression de bien des circuits classiques.",
        "L'air de la chambre est plus chaud que moi : je lui prends sa chaleur.",
        "Alors je bous : des bulles naissent en moi, et je deviens vapeur.",
        "Je me réchauffe encore un peu : c'est la surchauffe. Aucune goutte de liquide ne doit arriver au compresseur."
      ],
      question: { q: "À −10 °C dans l'évaporateur, quelle est à peu près la pression du CO₂ ?",
        choix: [["Environ 26 bar.", 1],
                ["Environ 2 bar.", 0],
                ["Environ 120 bar.", 0]],
        pourquoi: "Le CO₂ travaille à de fortes pressions, même du côté froid : environ 26 bar à −10 °C. C'est déjà plus que la haute pression de bien des circuits aux fluides classiques." } },
    { id: "compresseur", num: "2", titre: "Le compresseur", sous: "on me serre très fort", organe: "compresseur", pres: 2,
      role: "aspire la vapeur et la comprime",
      carte: [2, 5], puces: [["BP", "26 bar"], ["HP", "90 bar"]],
      phrases: [
        ["Voici le compresseur : c'est le cœur du circuit. Celui-ci est à pistons, comme la plupart des compresseurs au CO₂.", "Voici le compresseur : c'est le cœur du circuit. Celui-ci est à pistons, comme la plupart des compresseurs au C O deux."],
        "Son rôle : aspirer ma vapeur et la comprimer.",
        "Le piston descend : le clapet d'aspiration s'ouvre, j'entre avec d'autres molécules de vapeur.",
        "Le piston remonte : on nous serre.",
        "Ma pression passe de 26 à 90 bar environ : plus de trois fois plus.",
        ["Et je chauffe : je sors à plus de 100 °C.", "Et je chauffe : je sors à plus de cent degrés."],
        "Ici, les tubes sont fins, mais leurs parois sont épaisses : je prends peu de place, mais je pousse fort.",
        "Comme pour tous les fluides : jamais de liquide ici, il ne se comprime pas."
      ],
      question: { q: "Sur une centrale au CO₂, les tuyauteries sont plutôt…",
        choix: [["Fines, avec des parois épaisses.", 1],
                ["Larges, avec des parois minces.", 0],
                ["Larges et épaisses, pour ralentir le fluide.", 0]],
        pourquoi: "Le CO₂ transporte beaucoup de froid dans peu de volume : les tubes sont fins. Mais il travaille sous très forte pression : les parois sont épaisses." } },
    { id: "critique", num: "3", titre: "Le point critique", sous: "ni liquide, ni vapeur",
      carte: [5, 5.6], puces: [["chaud", "31 °C"], ["HP", "73,8 bar"]],
      phrases: [
        "Avant d'entrer dans le refroidisseur, une leçon de physique, en accéléré.",
        "Voici un tube de verre épais, fermé, avec du CO₂ dedans : du liquide en bas, de la vapeur en haut.",
        "Chauffons-le doucement. Le liquide gonfle, la vapeur devient de plus en plus serrée.",
        ["À 31 °C et 73,8 bar, la limite entre les deux disparaît : plus de surface, plus de bulles.", "À trente et un degrés et soixante-treize virgule huit bar, la limite entre les deux disparaît : plus de surface, plus de bulles."],
        "Au-dessus, je ne suis ni liquide, ni vapeur : je suis un fluide supercritique.",
        "Je suis dense comme un liquide, et je remplis tout comme un gaz.",
        ["C'est le point critique. Pour bien des fluides, il est vers 70 °C ou plus. Pour moi, il est à 31 °C : on le dépasse tous les étés.", "C'est le point critique. Pour bien des fluides, il est vers soixante-dix degrés ou plus. Pour moi, il est à trente et un degrés : on le dépasse tous les étés."]
      ],
      question: { q: "Au-dessus de 31 °C et 73,8 bar, que devient le CO₂ ?",
        choix: [["Un fluide supercritique : ni liquide, ni vapeur.", 1],
                ["Un solide.", 0],
                ["Un liquide très chaud.", 0]],
        pourquoi: "Au-dessus du point critique, la limite entre liquide et vapeur disparaît. Le fluide ne peut plus se condenser : on dit qu'il est supercritique." } },
    { id: "refroidisseur", num: "4", titre: "Le refroidisseur de gaz", sous: "je refroidis sans me condenser", organe: "refroidisseur", pres: 2,
      role: "rejette dehors la chaleur du fluide",
      carte: [5.6, 7.6], puces: [["HP", "90 bar"], ["chaud", "sortie 35 °C"]],
      phrases: [
        "Voici le refroidisseur de gaz, posé dehors, souvent sur le toit. Il ressemble à un condenseur : des tubes, des ailettes, des ventilateurs.",
        "Son rôle : rejeter dehors la chaleur que j'ai prise dans la chambre, et celle de la compression.",
        ["J'entre à plus de 100 °C, à 90 bar : bien au-dessus du point critique.", "J'entre à plus de cent degrés, à quatre-vingt-dix bar : bien au-dessus du point critique."],
        ["L'air du dehors, à 30 °C, traverse les ailettes et emporte ma chaleur.", "L'air du dehors, à trente degrés, traverse les ailettes et emporte ma chaleur."],
        "Je refroidis, je deviens plus dense… mais je ne me condense pas : ni gouttes, ni nappe de liquide.",
        ["Je sors vers 35 °C, toujours supercritique.", "Je sors vers trente-cinq degrés, toujours supercritique."],
        "Ici, on ne parle plus de sous-refroidissement : on surveille ma température de sortie.",
        "L'hiver, quand l'air est frais, je repasse sous le point critique : l'échangeur redevient un vrai condenseur."
      ],
      question: { q: "En été, que se passe-t-il dans le refroidisseur de gaz ?",
        choix: [["Le CO₂ refroidit sans se condenser.", 1],
                ["Le CO₂ se condense en liquide.", 0],
                ["Le CO₂ se réchauffe.", 0]],
        pourquoi: "Au-dessus de 31 °C et 73,8 bar, le CO₂ ne peut plus se condenser : il perd sa chaleur en restant supercritique. C'est pour cela qu'on parle de refroidisseur de gaz. L'hiver, le même échangeur condense : il redevient un condenseur." } },
    { id: "detendeur-hp", num: "5", titre: "Le détendeur haute pression", sous: "il choisit la haute pression", organe: "detendeurHP", pres: 2,
      role: "tient la haute pression et détend le fluide",
      carte: [7.6, 9.2], puces: [["HP", "90 bar"], ["BP", "35 bar"]],
      phrases: [
        "Voici le détendeur haute pression : une vanne motorisée, pilotée par le régulateur de la centrale.",
        "Son rôle : tenir la haute pression à la bonne valeur, et me détendre.",
        "Sur une machine classique, la haute pression dépend de la condensation. Chez moi, c'est un réglage.",
        "Le régulateur lit ma température à la sortie du refroidisseur, et calcule la meilleure haute pression.",
        "Trop basse, la machine ne fait presque plus de froid. Trop haute, le compresseur consomme pour rien.",
        "Je passe le pointeau : ma pression chute de 90 à 35 bar environ.",
        "Je repasse sous le point critique. D'un coup, plus d'un tiers d'entre nous se vaporise : c'est la vapeur de détente.",
        ["Moi, je deviens liquide, vers 0 °C.", "Moi, je deviens liquide, vers zéro degré."]
      ],
      question: { q: "Qui fixe la haute pression d'une centrale CO₂ transcritique ?",
        choix: [["Le régulateur, par le détendeur haute pression.", 1],
                ["La température de condensation.", 0],
                ["Le technicien, en ajoutant du fluide.", 0]],
        pourquoi: "Au-dessus du point critique, il n'y a plus de condensation pour fixer la haute pression. Le régulateur la calcule et le détendeur haute pression la tient. Jamais la faire baisser par réflexe : trop basse, le froid s'effondre." } },
    { id: "bouteille", num: "6", titre: "La bouteille intermédiaire", sous: "on se sépare", organe: "bouteille", pres: 2,
      role: "sépare le liquide de la vapeur de détente",
      carte: [9.2, 10.4], puces: [["BP", "35 bar"], ["liq", "liquide en bas"]],
      phrases: [
        "Voici la bouteille intermédiaire, qu'on appelle aussi bouteille flash : un réservoir debout, aux parois épaisses.",
        "Son rôle : séparer le liquide de la vapeur de détente.",
        "J'arrive en mélange : du liquide, et beaucoup de vapeur.",
        "Le liquide tombe au fond : c'est une nappe, calme. J'y plonge.",
        "La vapeur, elle, reste en haut de la bouteille.",
        "Par le bas, le liquide part vers le détendeur de la chambre froide.",
        "Par le haut, la vapeur prend un autre chemin. Ma voisine en fait partie : suivons-la un instant."
      ],
      question: { q: "À quoi sert la bouteille intermédiaire ?",
        choix: [["À séparer le liquide de la vapeur de détente.", 1],
                ["À filtrer l'huile du compresseur.", 0],
                ["À augmenter la pression.", 0]],
        pourquoi: "Après le détendeur haute pression, le fluide est un mélange. Dans la bouteille, le liquide tombe au fond et part vers le détendeur ; la vapeur reste en haut et prend un autre chemin." } },
    { id: "gaz-detente", num: "7", titre: "La vanne de gaz de détente", sous: "un raccourci pour la vapeur", organe: "vanneGaz", pres: 2,
      role: "renvoie la vapeur de détente vers le compresseur",
      carte: [10, 10], puces: [["BP", "35 bar"], ["BP", "26 bar"]],
      phrases: [
        "Voici la vanne de gaz de détente : elle aussi est motorisée, pilotée par le régulateur.",
        "Son rôle : renvoyer la vapeur de détente vers le compresseur.",
        "Ma voisine sort par le haut de la bouteille, en vapeur.",
        "Si elle continuait avec moi jusqu'à l'évaporateur, elle n'y ferait aucun froid : elle est déjà vapeur.",
        "Elle prendrait de la place dans les tubes, pour rien.",
        "Alors la vanne lui ouvre un raccourci : elle file directement à l'aspiration du compresseur.",
        "Au passage, la vanne tient la pression de la bouteille, autour de 35 bar."
      ],
      question: { q: "Pourquoi la vapeur de détente ne va-t-elle pas dans l'évaporateur ?",
        choix: [["Elle n'y ferait aucun froid : elle est déjà vapeur.", 1],
                ["Elle est trop chaude pour l'évaporateur.", 0],
                ["Elle boucherait l'évaporateur en gelant.", 0]],
        pourquoi: "Dans l'évaporateur, le froid vient du liquide qui bout. La vapeur de détente ne bout plus : elle prendrait de la place sans rien refroidir. La vanne de gaz de détente l'envoie directement au compresseur." } },
    { id: "detendeur", num: "8", titre: "Le détendeur de l'évaporateur", sous: "deux détendeurs, deux missions", organe: "detendeur", pres: 2,
      role: "règle l'entrée du fluide dans l'évaporateur",
      carte: [10.4, 14.4], puces: [["BP", "35 bar"], ["BP", "26 bar"]],
      phrases: [
        "Voici le détendeur de l'évaporateur. Lui aussi est électronique, piloté par le régulateur de la chambre froide.",
        "Son rôle : régler la quantité de fluide qui entre dans l'évaporateur.",
        "Je sors de la bouteille, liquide, à 35 bar.",
        ["Le passage est étroit : ma pression tombe à 26 bar, et ma température à −10 °C.", "Le passage est étroit : ma pression tombe à vingt-six bar, et ma température à moins dix degrés."],
        "Une partie de nous se vaporise déjà : j'entre dans l'évaporateur en mélange froid.",
        "Le régulateur surveille la surchauffe à la sortie de l'évaporateur, avec une sonde de pression et une sonde de température.",
        "Ce détendeur règle la surchauffe ; l'autre règle la haute pression : deux détendeurs, deux missions.",
        "Et me voilà revenue à l'évaporateur : le tour est bouclé."
      ],
      question: { q: "Sur la centrale au CO₂, que règle le détendeur de l'évaporateur ?",
        choix: [["La surchauffe de l'évaporateur.", 1],
                ["La haute pression.", 0],
                ["La pression de la bouteille.", 0]],
        pourquoi: "Le détendeur de l'évaporateur règle la surchauffe de son évaporateur. La haute pression, c'est le détendeur haute pression ; la pression de la bouteille, c'est la vanne de gaz de détente." } },
    { id: "arret", num: "9", titre: "À l'arrêt", sous: "la pression monte",
      carte: [0.5, 0.5], puces: [["HP", "≈ 57 bar partout"]],
      phrases: [
        "Une nuit, la centrale s'arrête.",
        ["Je me réchauffe à la température du local, 20 °C, et ma pression monte avec : 57 bar environ, partout dans le circuit.", "Je me réchauffe à la température du local, vingt degrés, et ma pression monte avec : cinquante-sept bar environ, partout dans le circuit."],
        "Même éteinte, la machine reste sous forte pression.",
        "Beaucoup de centrales ont un petit groupe de maintien : il me garde au froid, pour que la pression n'atteigne pas le tarage des soupapes.",
        "Si le courant est coupé longtemps, ce groupe s'arrête aussi. La soupape s'ouvre et laisse partir du fluide : c'est prévu, pour protéger le circuit.",
        "Mais le local doit alors être ventilé, et surveillé par un détecteur."
      ],
      question: { q: "Une centrale au CO₂ est arrêtée depuis une heure. Le circuit est-il encore sous pression ?",
        choix: [["Oui : environ 57 bar à 20 °C, partout.", 1],
                ["Non : à l'arrêt, la pression tombe.", 0],
                ["Seulement du côté haute pression.", 0]],
        pourquoi: "À l'arrêt, le fluide prend la température du local et sa pression suit : environ 57 bar à 20 °C, dans tout le circuit. Une installation éteinte n'est pas une installation détendue." } },
    { id: "fuite", num: "10", titre: "La fuite", sous: "je prends la place de l'air",
      carte: [2.6, 2.6], puces: [["fuite", "fuite"]],
      phrases: [
        "Un jour, un raccord fuit. Ma voisine s'échappe dans le local.",
        ["Pour le climat, elle pèse peu : son PRP vaut 1.", "Pour le climat, elle pèse peu : son P R P vaut un."],
        "Mais je suis plus lourde que l'air : je descends, et je m'accumule en partie basse.",
        "Je n'ai pas d'odeur, je ne brûle pas : je suis classée A1. Mais je prends la place de l'air qu'on respire.",
        ["Voilà pourquoi le détecteur de CO₂ est posé en bas, et pourquoi le local doit être ventilé.", "Voilà pourquoi le détecteur de C O deux est posé en bas, et pourquoi le local doit être ventilé."],
        "Et une fuite reste une panne : on cherche la cause, on répare, puis on recharge."
      ],
      question: { q: "Où pose-t-on le détecteur de CO₂ dans un local machine ?",
        choix: [["En bas : le CO₂ est plus lourd que l'air.", 1],
                ["Au plafond : le CO₂ monte.", 0],
                ["Nulle part : classé A1, le CO₂ est sans danger.", 0]],
        pourquoi: "Le CO₂ est plus lourd que l'air : il descend et s'accumule en partie basse. Classé A1, il ne brûle pas, mais il prend la place de l'air qu'on respire. « A1 » ne veut pas dire « sans danger »." } },
    { id: "neige", num: "11", titre: "La neige carbonique", sous: "si on me vide trop vite",
      carte: [12.2, 12.2], puces: [["BP", "sous 5,18 bar"], ["froid", "solide"]],
      phrases: [
        "Pour réparer, le technicien doit vider une partie du circuit.",
        "S'il ouvre trop vite, ma pression s'effondre.",
        ["Sous 5,18 bar, je ne peux plus être liquide : c'est mon point triple.", "Sous cinq virgule dix-huit bar, je ne peux plus être liquide : c'est mon point triple."],
        ["Je deviens solide : de la neige carbonique, très froide, jusqu'à −78,5 °C à l'air libre.", "Je deviens solide : de la neige carbonique, très froide, jusqu'à moins soixante-dix-huit degrés et demi à l'air libre."],
        "Cette neige bouche les tubes, bloque les vannes, et brûle la peau par le froid.",
        "La règle : vider lentement, en suivant la procédure du constructeur."
      ],
      question: { q: "Pourquoi faut-il vider lentement un circuit au CO₂ ?",
        choix: [["Pour éviter la neige carbonique, qui bouche le circuit.", 1],
                ["Pour économiser le fluide.", 0],
                ["Parce que le CO₂ est inflammable.", 0]],
        pourquoi: "Une ouverture brutale fait chuter la pression sous 5,18 bar, le point triple : le CO₂ devient solide, bouche le circuit et peut brûler la peau par le froid. On suit la procédure du constructeur." } },
    { id: "resume", num: "", titre: "Tous mes états", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le tour.",
        "Dans l'évaporateur, je bous : de liquide, je deviens vapeur.",
        "Dans le compresseur, on me serre : je deviens supercritique.",
        "Dans le refroidisseur de gaz, je refroidis sans me condenser.",
        "Au détendeur haute pression, je redeviens liquide et vapeur ; la bouteille nous sépare.",
        "Au détendeur de l'évaporateur, je me détends encore : et le tour recommence.",
        "Vapeur, supercritique, liquide, et même solide si on me vide trop vite : j'ai traversé tous mes états."
      ],
      question: { q: "Où le CO₂ devient-il supercritique ?",
        choix: [["Dans le compresseur.", 1],
                ["Dans l'évaporateur.", 0],
                ["Dans la bouteille intermédiaire.", 0]],
        pourquoi: "Le compresseur porte le CO₂ à 90 bar et à plus de 100 °C, au-dessus du point critique : il en sort supercritique. Le refroidisseur de gaz le refroidit sans le condenser, puis le détendeur haute pression le fait redevenir liquide et vapeur." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "La ligne CO₂ / R744", h: "../packs/fluides/res/co2-r744/" },
    { t: "Le point critique", h: "../packs/fluides/res/co2-r744/index.html?e=point-critique" },
    { t: "Le cycle transcritique", h: "../packs/fluides/res/co2-r744/index.html?e=transcritique" },
    { t: "La haute pression optimale", h: "../packs/fluides/res/co2-r744/index.html?e=hp-optimale" },
    { t: "Le point triple", h: "../packs/fluides/res/co2-r744/index.html?e=point-triple" },
    { t: "Sécurité R744", h: "../packs/fluides/res/co2-r744/index.html?e=securite" },
    { t: "La centrale booster", h: "../packs/fluides/res/co2-r744/index.html?e=booster" }
  ]
};

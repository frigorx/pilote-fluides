/* =====================================================================
   voyage-bietage.js — le récit de « Voyage dans tous ses états », édition
   « installation bi-étagée »
   ---------------------------------------------------------------------
   RÔLE : même contrat que donnees/voyage.js (une source pour le module,
   le film et la série), chargé À LA PLACE de voyage.js par
   voyage-bietage.html ; `dossier` dit où sont ses voix. Pas de livret
   (choix de Franck pour la série, 03/10) : `livret: ""`.
   CADRAGE (Franck, 03/10) : projet inerWeb ; AMMONIAC industriel ; bouteille
   intermédiaire OUVERTE (injection totale : la vapeur BP barbote dans le
   liquide, le liquide HP y est détendu par un régulateur à flotteur) ; DEUX
   compresseurs à pistons, ouverts (BP = « booster », HP). Côté BP (Franck,
   03/10, après la recherche sur internet) : le liquide de la bouteille
   intermédiaire est détendu dans une BOUTEILLE BP, d'où une POMPE l'envoie
   à l'évaporateur (« distribution par pompe », comme en vrai) ; la vapeur
   repart de la bouteille BP au compresseur BP. Séparateurs d'huile cités,
   non dessinés.
   FIL ROUGE : la marche est trop haute pour un seul compresseur ; on la
   monte en deux fois, et la bouteille du milieu refroidit tout (la vapeur
   du premier étage ET le liquide qui va à l'évaporateur).
   CHIFFRES (illustration, calcul CoolProp R717, voyage-bietage/calcul-
   diagramme-bietage.py) : évaporation −35 °C, condensation +35 °C ;
   Pi = √(BP × HP) → Tsat(Pi) ≈ −5 °C ; un seul étage : refoulement
   isentropique ≈ 164 °C (dit « plus de 150 °C ») ; deux étages : ≈ 52 °C
   et ≈ 90 °C (non dits) ; vapeur à l'entrée de l'évaporateur : 24 % avec
   un étage (« près d'un quart »), 10 % avec deux (« à peine un dixième ») ;
   le compresseur HP aspire ≈ 1,3 kg par kg aspiré au BP, mais un volume
   ≈ 2,7 fois plus petit (vapeur à −35 °C ≈ 3,5 fois plus étalée qu'à Pi).
   Les « un quart / un dixième » sont la vapeur formée au détendeur BP : avec
   la bouteille BP, l'évaporateur reçoit toujours du liquide.
   Aucune pression chiffrée (piège relatif / absolu).
   SOURCES : le fonds de Franck n'a RIEN sur le bi-étagé frigorifique (la
   « bouteille d'injection Thermador », fiche WA10, est un pot d'injection
   de glycol pour un circuit d'eau) ; seule voisine : la station CO₂
   « La centrale booster ». Sources trouvées sur internet le 03/10 (dossier
   ICPE « installations à l'ammoniac », manuels RETA, IIF, brevets) : voir
   voyage-bietage/SOURCES-WEB.md. À l'arrêt « BP d'abord » : non écrit dans
   les sources, gardé (logique inverse du démarrage), dit comme une règle :
   « le BP ne tourne jamais sans le HP ». RÉCIT VALIDÉ PAR DÉLÉGATION (Franck,
   03/10 : « je me souviens plus… ce sera à toi de juger »).
   DROIT : comme l'original — l'idée, jamais le texte du livre.
   PIÈGE : l'ORDRE des phrases porte les gestes des scènes
   (moteur/voyage-bietage-scenes-*.js) : ajouter une phrase décale tout.
   CARTE : rangs de D.CIRCUIT_PTS (moteur/voyage-bietage-dessin.js) :
   0 bouteille BP (liquide) · 1 coin · 2 pompe · 3 évaporateur · 4-5 retour ·
   6 entrée du retour dans la bouteille BP · 7 sa vapeur · 8 sa sortie haute ·
   9 coin · 10 compresseur BP · 11 coin · 12 entrée dans la bouteille
   intermédiaire (tube plongeur) · 13 sous le liquide · 14 haut de la
   bouteille · 15 sortie haute · 16 coin · 17 compresseur HP · 18 coin ·
   19 condenseur · 20 réservoir · 21 coin · 22 flotteur · 23 coin · 24 entrée
   du liquide dans la bouteille intermédiaire · 25 son liquide · 26 sortie
   basse · 27 coin · 28 détendeur · 29 coin · 30 entrée dans la bouteille BP ·
   31 = 0.
   DIAGRAMME : `diag: [w0, w1]` = position sur le cycle de donnees/voyage-
   bietage-diagramme.js (0 liquide de la bouteille BP, envoyé à l'évaporateur ·
   1 vapeur sèche, sortie de la bouteille BP · 2 refoulement BP · 3 vapeur
   refroidie dans la bouteille intermédiaire · 4 refoulement HP · 5 début de
   condensation · 6 fin de condensation · 7 après le flotteur · 8 liquide
   refroidi de la bouteille intermédiaire · 9 après le détendeur, arrivée dans
   la bouteille BP · 10 = 0) ; `calques: { id: k }` =
   calque montré à partir de la phrase k (pi : la ligne de la pression
   intermédiaire, montrée dès le chapitre 3 et ensuite toujours).
   ===================================================================== */
window.VOYAGE_RECIT = {
  titre: "Voyage dans tous ses états",
  sousTitre: "l'installation bi-étagée racontée par une molécule",
  edition: "installation bi-étagée",
  dossier: "voyage-bietage",
  film: "../voyage/bietage.html", livret: "", // pas de livret pour cette édition : le module n'affiche pas le bouton
  voix: { nom: "fr-FR-RemyMultilingualNeural", debit: "-5%" },
  enseignant: {
    public: "toutes les formations du froid, après le circuit de base : une porte vers le froid industriel à très basse température",
    notions: [["Pourquoi deux étages : refoulement trop chaud, compresseur qui aspire mal", "1"],
              ["L'évaporateur alimenté par pompe depuis la bouteille BP ; le premier étage (compresseur BP, le plus gros)", "2, 3"],
              ["La bouteille intermédiaire ouverte : la vapeur y barbote et s'y refroidit", "4"],
              ["La pression intermédiaire : partager le travail", "5"],
              ["Le deuxième étage (compresseur HP)", "6, 7"],
              ["La détente en deux fois : flotteur, vapeur de détente, liquide refroidi", "8, 9"],
              ["Le gain lu sur le diagramme enthalpique", "10"],
              ["Ce que le technicien surveille : niveau, pression intermédiaire, ordre de marche", "11"]],
    usage: "Ce voyage suppose connu le circuit de base (le premier « Voyage dans tous ses états ») et, de préférence, le voyage de l'ammoniac. Il se regarde d'un trait ou en trois temps : la montée en deux étages (1 à 6), la descente en deux fois (7 à 9), le gain et la surveillance (10, 11). L'installation décrite est un schéma de principe (ammoniac, bouteille intermédiaire ouverte, deux compresseurs, distribution par pompe côté basse pression) ; températures d'illustration : la documentation de l'installation fait foi. Ce voyage ouvre le sujet ; il ne remplace ni le cours, ni les travaux pratiques, ni la formation exigée pour intervenir sur l'ammoniac."
  },
  logoLycee: "",
  resumeFilm: "Suivez une molécule d'ammoniac dans une installation bi-étagée de surgélation : pourquoi un seul compresseur ne suffit pas, le compresseur BP, la bouteille intermédiaire où la vapeur barbote et se refroidit, la pression intermédiaire, le compresseur HP, puis la détente en deux fois et le liquide refroidi, le gain lu sur le diagramme enthalpique et ce que surveille le technicien.",
  creditCourt: "D'après une idée d'André Delalande · inerWeb — F. Henninot, avec l'aide d'une IA · voix de synthèse · CC BY-NC-ND",
  credit: "L'idée de ce parcours vient du souvenir de lecture de « Voyage extraordinaire avec une molécule de Fréon 12 : roman frigorifique », d'André Delalande (1946). Conception pédagogique : F. Henninot — inerWeb. Texte, dessins et animation réalisés avec l'assistance d'une intelligence artificielle ; voix de synthèse. Symboles d'après la planche Éduscol « Le circuit frigorifique » et la collection QElectroTech (CC BY 3.0). Licence CC BY-NC-ND.",
  scenes: [
    { id: "intro", num: "", titre: "Mon voyage", sous: "en deux étages", carte: null,
      phrases: [
        ["Bonjour. Je suis une molécule d'ammoniac : NH₃.", "Bonjour. Je suis une molécule d'ammoniac : N H trois."],
        ["Aujourd'hui, je travaille dans une usine de surgelés : pour congeler, je dois bouillir très froid, vers −35 °C.", "Aujourd'hui, je travaille dans une usine de surgelés : pour congeler, je dois bouillir très froid, vers moins trente-cinq degrés."],
        ["Et pour me condenser, dehors, il faut toujours remonter vers +35 °C.", "Et pour me condenser, dehors, il faut toujours remonter vers trente-cinq degrés."],
        "Entre les deux, la marche est trop haute pour un seul compresseur.",
        ["Alors mon installation la monte en deux fois : deux compresseurs, et une bouteille entre les deux.", "Alors mon installation la monte en deux fois : deux compresseurs, et une bouteille entre les deux."],
        ["Voici mon circuit : l'évaporateur, la bouteille BP, les deux compresseurs, la bouteille intermédiaire, le condenseur, le réservoir et deux détentes.", "Voici mon circuit : l'évaporateur, la bouteille BP, les deux compresseurs, la bouteille intermédiaire, le condenseur, le réservoir et deux détentes."],
        ["À droite, le diagramme enthalpique : à chaque pas, mon point y avance, et dessine mon cycle.", "À droite, le diagramme enthalpique : à chaque pas, mon point y avance, et dessine mon cycle."],
        ["Suivez-moi : on commence par la question qui fâche.", "Suivez-moi : on commence par la question qui fâche."]
      ] },
    { id: "marche", num: "1", titre: "La marche trop haute", sous: "un seul compresseur ?",
      carte: [10, 10], diag: [1, 1], calques: { seul: 2 }, puces: [["BP", "très froid"], ["HP", "condensation"]],
      phrases: [
        "Imaginons d'abord un seul compresseur, qui m'aspirerait très froide et me refoulerait d'un coup à la haute pression.",
        ["L'écart entre les deux pressions est énorme : il faudrait me serrer très fort.", "L'écart entre les deux pressions est énorme : il faudrait me serrer très fort."],
        ["Je sortirais brûlante : plus de 150 °C au refoulement.", "Je sortirais brûlante : plus de cent cinquante degrés au refoulement."],
        "À cette chaleur, l'huile se dégrade, et les clapets souffrent.",
        ["Et le compresseur s'essouffle : à chaque tour, la vapeur restée au fond du cylindre se regonfle, et prend la place de la vapeur fraîche.", "Et le compresseur s'essouffle : à chaque tour, la vapeur restée au fond du cylindre se regonfle, et prend la place de la vapeur fraîche."],
        ["Sur le diagramme, cette grande compression part très loin vers la droite : beaucoup d'énergie, beaucoup de chaleur.", "Sur le diagramme, cette grande compression part très loin vers la droite : beaucoup d'énergie, beaucoup de chaleur."],
        ["La solution : couper la marche en deux.", "La solution : couper la marche en deux."]
      ],
      question: { q: "Pourquoi un seul compresseur ne suffit-il pas pour faire très froid ?",
        choix: [["L'écart de pression est trop grand : la vapeur sortirait brûlante et le compresseur aspirerait mal.", 1],
                ["Un seul compresseur ne peut pas aspirer d'ammoniac.", 0],
                ["Le condenseur serait trop petit.", 0]],
        pourquoi: "Entre une basse pression très basse et la haute pression, l'écart est énorme. Comprimée d'un coup, la vapeur sortirait brûlante (l'huile se dégrade, les clapets souffrent) et le compresseur aspirerait de moins en moins. On coupe donc la marche en deux." } },
    { id: "evaporateur", num: "2", titre: "L'évaporateur", sous: "je bous très froid", organe: "evaporateur", pres: 2,
      role: "prendre la chaleur de l'air du tunnel, pour congeler les produits",
      carte: [0, 8], diag: [0, 1], puces: [["BP", "basse pression"], ["froid", "−35 °C"]],
      phrases: [
        "Voici l'évaporateur, dans le tunnel de surgélation.",
        ["Son rôle : prendre la chaleur de l'air du tunnel, pour congeler les produits.", "Son rôle : prendre la chaleur de l'air du tunnel, pour congeler les produits."],
        ["J'arrive de la bouteille BP, liquide : une pompe m'y aspire, et me pousse dans l'évaporateur.", "J'arrive de la bouteille BP, liquide : une pompe m'y aspire, et me pousse dans l'évaporateur."],
        ["L'air du tunnel me réchauffe : je bous, à très basse pression, vers −35 °C.", "L'air du tunnel me réchauffe : je bous, à très basse pression, vers moins trente-cinq degrés."],
        ["En bouillant, je prends la chaleur de l'air : les produits se congèlent.", "En bouillant, je prends la chaleur de l'air : les produits se congèlent."],
        ["La pompe envoie plus de liquide qu'il n'en faut : je ressors avec du liquide autour de moi, et je retourne à la bouteille BP.", "La pompe envoie plus de liquide qu'il n'en faut : je ressors avec du liquide autour de moi, et je retourne à la bouteille BP."],
        ["Le liquide y retombe. Moi, je pars par le haut, en vapeur : à cette basse pression, un kilo de vapeur prend beaucoup de place.", "Le liquide y retombe. Moi, je pars par le haut, en vapeur : à cette basse pression, un kilo de vapeur prend beaucoup de place."]
      ],
      question: { q: "À la sortie de l'évaporateur, pourquoi la vapeur prend-elle beaucoup de place ?",
        choix: [["Sa pression est très basse.", 1],
                ["Elle est très chaude.", 0],
                ["Elle contient de l'huile.", 0]],
        pourquoi: "Plus la pression est basse, plus un kilo de vapeur prend de place. À très basse pression, la vapeur est très étalée : le compresseur qui l'aspire doit être gros." } },
    { id: "compresseurBP", num: "3", titre: "Le compresseur BP", sous: "le premier étage", organe: "compresseurBP", pres: 2,
      role: "m'aspirer à la basse pression, et me monter jusqu'à la pression intermédiaire",
      carte: [8, 12], diag: [1, 2], calques: { pi: 5 }, puces: [["BP", "basse pression"], ["recup", "intermédiaire"]],
      phrases: [
        "Voici le compresseur BP, le premier étage.",
        ["Son rôle : m'aspirer à la basse pression, et me monter jusqu'à la pression intermédiaire.", "Son rôle : m'aspirer à la basse pression, et me monter jusqu'à la pression intermédiaire."],
        ["C'est le plus gros des deux compresseurs : il doit aspirer une vapeur très étalée.", "C'est le plus gros des deux compresseurs : il doit aspirer une vapeur très étalée."],
        ["Il me serre, mais seulement jusqu'à mi-chemin : la pression intermédiaire.", "Il me serre, mais seulement jusqu'à mi-chemin : la pression intermédiaire."],
        ["Je chauffe, mais raisonnablement : l'écart de pression est petit.", "Je chauffe, mais raisonnablement : l'écart de pression est petit."],
        ["Sur le diagramme, ma première compression s'arrête sur une ligne nouvelle : la pression intermédiaire.", "Sur le diagramme, ma première compression s'arrête sur une ligne nouvelle : la pression intermédiaire."],
        ["On l'appelle aussi le compresseur booster : il pousse le fluide vers l'étage du haut.", "On l'appelle aussi le compresseur booster : il pousse le fluide vers l'étage du haut."]
      ],
      question: { q: "Lequel des deux compresseurs est le plus gros ?",
        choix: [["Le compresseur BP : il aspire une vapeur très étalée.", 1],
                ["Le compresseur HP : il refoule à la plus haute pression.", 0],
                ["Ils sont toujours identiques.", 0]],
        pourquoi: "Le compresseur BP aspire la vapeur à très basse pression : un kilo y prend beaucoup de place. Pour aspirer assez de fluide, il lui faut un gros volume : c'est le plus gros des deux." } },
    { id: "bouteille", num: "4", titre: "La bouteille intermédiaire", sous: "je plonge dans le liquide", organe: "bouteille", pres: 2,
      role: "refroidir la vapeur du premier étage, et le liquide qui part vers l'évaporateur",
      carte: [12, 15], diag: [2, 3], calques: { pi: 0 }, puces: [["recup", "intermédiaire"], ["froid", "vapeur refroidie"]],
      phrases: [
        "Voici la bouteille intermédiaire, entre les deux compresseurs.",
        ["Son rôle : refroidir la vapeur du premier étage, et le liquide qui part vers l'évaporateur.", "Son rôle : refroidir la vapeur du premier étage, et le liquide qui part vers l'évaporateur."],
        "J'y arrive chaude, par un tube qui plonge sous le liquide.",
        ["Je fais des bulles dans le liquide froid de la bouteille : il m'enlève ma chaleur.", "Je fais des bulles dans le liquide froid de la bouteille : il m'enlève ma chaleur."],
        "Pour me refroidir, un peu de ce liquide bout autour de moi, et devient vapeur à son tour.",
        "Je remonte à la surface, refroidie jusqu'à la température du liquide de la bouteille.",
        "Sur le diagramme, mon point recule vers la gauche, sur la pression intermédiaire, jusqu'au bord de la cloche.",
        "Toute cette chaleur enlevée, c'est autant de chaleur en moins au refoulement suivant."
      ],
      question: { q: "Que devient la vapeur du compresseur BP dans la bouteille intermédiaire ?",
        choix: [["Elle fait des bulles dans le liquide et s'y refroidit.", 1],
                ["Elle s'y condense entièrement.", 0],
                ["Elle repart vers l'évaporateur.", 0]],
        pourquoi: "La vapeur chaude du premier étage arrive par un tube qui plonge sous le liquide. Elle y fait des bulles et s'y refroidit jusqu'à la température du liquide ; le peu de liquide qui bout pour la refroidir devient vapeur, et tout repart vers le compresseur HP." } },
    { id: "pression", num: "5", titre: "La pression intermédiaire", sous: "partager le travail",
      carte: [14, 14], diag: [3, 3], calques: { pi: 0 }, puces: [["BP", "basse"], ["recup", "intermédiaire"], ["HP", "haute"]],
      phrases: [
        ["Dans la bouteille, la pression est entre les deux : ni basse, ni haute. C'est la pression intermédiaire.", "Dans la bouteille, la pression est entre les deux : ni basse, ni haute. C'est la pression intermédiaire."],
        "On la choisit pour que les deux compresseurs se partagent le travail à peu près à égalité.",
        ["Chacun multiplie alors ma pression par le même nombre : aucun des deux ne force.", "Chacun multiplie alors ma pression par le même nombre : aucun des deux ne force."],
        ["Elle s'établit toute seule : elle dépend de ce que le compresseur BP envoie, et de ce que le compresseur HP aspire.", "Elle s'établit toute seule : elle dépend de ce que le compresseur BP envoie, et de ce que le compresseur HP aspire."],
        "Si le compresseur HP s'arrête, la vapeur s'accumule dans la bouteille, et la pression intermédiaire monte.",
        ["Sur le diagramme, c'est la ligne du milieu : mon cycle y passe deux fois, en vapeur puis en liquide.", "Sur le diagramme, c'est la ligne du milieu : mon cycle y passe deux fois, en vapeur puis en liquide."]
      ],
      question: { q: "Comment choisit-on la pression intermédiaire ?",
        choix: [["Pour que les deux compresseurs se partagent le travail à peu près à égalité.", 1],
                ["Égale à la haute pression.", 0],
                ["La plus basse possible.", 0]],
        pourquoi: "La pression intermédiaire se choisit pour que chaque compresseur multiplie la pression par le même nombre : les deux étages se partagent le travail, aucun ne force. Elle dépend ensuite de ce que le compresseur BP envoie et de ce que le compresseur HP aspire." } },
    { id: "compresseurHP", num: "6", titre: "Le compresseur HP", sous: "le deuxième étage", organe: "compresseurHP", pres: 2,
      role: "aspirer la vapeur de la bouteille, et la monter jusqu'à la haute pression",
      carte: [15, 18], diag: [3, 4], calques: { pi: 0, seul: 6 }, puces: [["recup", "intermédiaire"], ["HP", "haute pression"]],
      phrases: [
        "Voici le compresseur HP, le deuxième étage.",
        ["Son rôle : aspirer la vapeur de la bouteille, et la monter jusqu'à la haute pression.", "Son rôle : aspirer la vapeur de la bouteille, et la monter jusqu'à la haute pression."],
        "Il m'aspire par le haut de la bouteille, avec toute la vapeur qui s'y est formée.",
        ["Il aspire donc plus de fluide que le compresseur BP : ma vapeur, et celle de la bouteille.", "Il aspire donc plus de fluide que le compresseur BP : ma vapeur, et celle de la bouteille."],
        ["Mais cette vapeur est moins étalée : il peut être plus petit.", "Mais cette vapeur est moins étalée : il peut être plus petit."],
        "Il me serre jusqu'à la haute pression. Je repars chaude, mais bien moins qu'avec un seul étage.",
        ["Sur le diagramme : deux petites compressions, au lieu d'une grande.", "Sur le diagramme : deux petites compressions, au lieu d'une grande."]
      ],
      question: { q: "Pourquoi le compresseur HP aspire-t-il plus de fluide que le compresseur BP ?",
        choix: [["Il aspire aussi la vapeur formée dans la bouteille.", 1],
                ["Il tourne plus vite.", 0],
                ["Il reçoit l'huile du compresseur BP.", 0]],
        pourquoi: "Le compresseur HP aspire la vapeur venue du premier étage, mais aussi toute la vapeur formée dans la bouteille : celle qui a servi à refroidir, et celle de la détente. Cette vapeur, à pression intermédiaire, est moins étalée : il reste plus petit que le compresseur BP." } },
    { id: "condenseur", num: "7", titre: "Je redeviens liquide", sous: "condenseur et réservoir",
      carte: [18, 21], diag: [4, 6], calques: { pi: 0 }, puces: [["HP", "haute pression"], ["liq", "liquide"]],
      phrases: [
        ["Je file au condenseur évaporatif : l'eau et l'air me refroidissent, et je redeviens liquide.", "Je file au condenseur évaporatif : l'eau et l'air me refroidissent, et je redeviens liquide."],
        "Je descends dans le réservoir haute pression, avec les autres molécules liquides.",
        ["Sur ma route, il y a aussi des séparateurs d'huile, au refoulement des compresseurs : le voyage de l'ammoniac les raconte.", "Sur ma route, il y a aussi des séparateurs d'huile, au refoulement des compresseurs : le voyage de l'ammoniac les raconte."],
        "Sur le diagramme, je traverse la cloche de droite à gauche, sur la haute pression.",
        ["Me voici liquide, tiède, à haute pression. Il faut redescendre : en deux fois, aussi.", "Me voici liquide, tiède, à haute pression. Il faut redescendre : en deux fois, aussi."]
      ],
      question: { q: "Où la molécule redevient-elle liquide ?",
        choix: [["Dans le condenseur évaporatif.", 1],
                ["Dans la bouteille intermédiaire.", 0],
                ["Dans le compresseur HP.", 0]],
        pourquoi: "Au condenseur évaporatif, l'eau et l'air emportent sa chaleur : la vapeur haute pression redevient liquide, puis descend dans le réservoir." } },
    { id: "flotteur", num: "8", titre: "Le régulateur à flotteur", sous: "la première détente", organe: "flotteur", pres: 2,
      role: "laisser entrer dans la bouteille juste le liquide qu'il faut, pour tenir son niveau",
      carte: [21, 25], diag: [6, 7], calques: { pi: 0, flash: 4 }, puces: [["HP", "haute"], ["recup", "intermédiaire"]],
      phrases: [
        "Voici le régulateur à flotteur, sur la ligne liquide.",
        ["Son rôle : laisser entrer dans la bouteille juste le liquide qu'il faut, pour tenir son niveau.", "Son rôle : laisser entrer dans la bouteille juste le liquide qu'il faut, pour tenir son niveau."],
        ["Je le traverse, et ma pression tombe d'un coup : de la haute pression à la pression intermédiaire.", "Je le traverse, et ma pression tombe d'un coup : de la haute pression à la pression intermédiaire."],
        ["Une partie de mes voisines se met à bouillir : c'est la vapeur de détente. Moi, je reste liquide.", "Une partie de mes voisines se met à bouillir : c'est la vapeur de détente. Moi, je reste liquide."],
        "Dans la bouteille, le liquide et la vapeur se séparent.",
        ["La vapeur de détente remonte directement au compresseur HP : elle ne passera ni par l'évaporateur, ni par le compresseur BP.", "La vapeur de détente remonte directement au compresseur HP : elle ne passera ni par l'évaporateur, ni par le compresseur BP."],
        "Sur le diagramme, je tombe tout droit, jusqu'à la ligne du milieu."
      ],
      question: { q: "Où va la vapeur de détente formée à l'entrée de la bouteille ?",
        choix: [["Directement au compresseur HP.", 1],
                ["Dans l'évaporateur.", 0],
                ["Au compresseur BP.", 0]],
        pourquoi: "La vapeur de détente se sépare du liquide dans la bouteille et remonte directement au compresseur HP. Elle n'encombre ni l'évaporateur, où elle ne ferait aucun froid, ni le compresseur BP." } },
    { id: "liquide", num: "9", titre: "Le liquide refroidi", sous: "puis la deuxième détente",
      carte: [25, 31], diag: [7, 9], calques: { pi: 0, detenteSeule: 6 }, puces: [["recup", "intermédiaire"], ["BP", "basse pression"]],
      phrases: [
        "Me voici liquide, dans la bouteille intermédiaire.",
        ["Mes voisines qui bouillent prennent leur chaleur au liquide : je me refroidis, de +35 °C jusque vers −5 °C.", "Mes voisines qui bouillent prennent leur chaleur au liquide : je me refroidis, de trente-cinq degrés jusque vers moins cinq."],
        ["C'est le même bain qui a refroidi ma vapeur tout à l'heure : la bouteille sert deux fois.", "C'est le même bain qui a refroidi ma vapeur tout à l'heure : la bouteille sert deux fois."],
        "Par le bas de la bouteille, je pars vers le détendeur, qui me fait tomber à la basse pression, dans la bouteille BP.",
        "Comme j'arrive déjà froide, très peu de mes voisines bouillent en passant.",
        "Avec un seul étage, près d'un quart du liquide se changerait en vapeur au détendeur. Ici, à peine un dixième.",
        ["Sur le diagramme, mon arrivée en basse pression est partie loin vers la gauche : chaque kilo de fluide fera plus de froid.", "Sur le diagramme, mon arrivée en basse pression est partie loin vers la gauche : chaque kilo de fluide fera plus de froid."]
      ],
      question: { q: "Pourquoi le liquide qui sort de la bouteille intermédiaire fait-il plus de froid ?",
        choix: [["Il est déjà froid : très peu se change en vapeur au détendeur.", 1],
                ["Il contient plus d'huile.", 0],
                ["Il est à plus haute pression.", 0]],
        pourquoi: "Dans la bouteille intermédiaire, le liquide s'est refroidi jusqu'à sa température. Au détendeur, très peu de liquide se change en vapeur : presque tout reste liquide pour faire du froid, et chaque kilo aspiré par le compresseur BP a pris plus de chaleur." } },
    { id: "gain", num: "10", titre: "Le gain", sous: "deux marches au lieu d'une",
      carte: [0, 31], diag: [0, 10], calques: { pi: 0, seul: 1, detenteSeule: 5 }, puces: [["chaud", "refoulement ↓"], ["froid", "froid par kilo ↑"]],
      phrases: [
        "Prenons du recul, et regardons mon cycle en entier.",
        ["Un seul étage : une grande compression, et je sortais brûlante.", "Un seul étage : une grande compression, et je sortais brûlante."],
        ["Deux étages : deux petites compressions, et entre les deux, la bouteille qui me refroidit.", "Deux étages : deux petites compressions, et entre les deux, la bouteille qui me refroidit."],
        ["À chaque refoulement, je reste raisonnable : l'huile et les clapets travaillent tranquilles.", "À chaque refoulement, je reste raisonnable : l'huile et les clapets travaillent tranquilles."],
        ["Chaque compresseur aspire mieux : l'écart de pression qu'il franchit est petit.", "Chaque compresseur aspire mieux : l'écart de pression qu'il franchit est petit."],
        ["Et le liquide arrive plus froid au détendeur : moins de vapeur de détente, plus de froid pour la même énergie.", "Et le liquide arrive plus froid au détendeur : moins de vapeur de détente, plus de froid pour la même énergie."],
        "Voilà pourquoi on monte en deux étages quand il faut faire très froid."
      ],
      question: { q: "Quel est le principal gain d'une installation bi-étagée ?",
        choix: [["Des refoulements moins chauds, et plus de froid pour la même énergie.", 1],
                ["Un seul compresseur au lieu de deux.", 0],
                ["Plus besoin de condenseur.", 0]],
        pourquoi: "En deux étages, chaque compresseur franchit un petit écart de pression : les refoulements restent raisonnables et les compresseurs aspirent mieux. La bouteille intermédiaire refroidit la vapeur entre les deux, et le liquide qui part au détendeur : plus de froid pour la même énergie." } },
    { id: "surveillance", num: "11", titre: "Ce que l'on surveille", sous: "l'œil du technicien",
      carte: [14, 14], diag: [3, 3], calques: { pi: 0 }, puces: [["recup", "niveau · Pi"], ["chaud", "refoulements"]],
      phrases: [
        "Pour finir, voyons ce que le technicien surveille sur une installation bi-étagée.",
        ["Le niveau de la bouteille : trop haut, du liquide partirait au compresseur HP. Une sécurité de niveau haut arrête alors les compresseurs.", "Le niveau de la bouteille : trop haut, du liquide partirait au compresseur HP. Une sécurité de niveau haut arrête alors les compresseurs."],
        ["La pression intermédiaire : si elle monte, le compresseur HP est souvent arrêté, ou à la peine.", "La pression intermédiaire : si elle monte, le compresseur HP est souvent arrêté, ou à la peine."],
        ["Les deux températures de refoulement : une par étage.", "Les deux températures de refoulement : une par étage."],
        ["L'ordre de marche : le compresseur BP ne tourne jamais sans le HP. On démarre le HP d'abord ; à l'arrêt, on coupe le BP d'abord.", "L'ordre de marche : le compresseur BP ne tourne jamais sans le HP. On démarre le HP d'abord ; à l'arrêt, on coupe le BP d'abord."],
        ["Et comme dans toute bouteille d'ammoniac, l'huile s'accumule au fond : on la récupère, par un pot à huile.", "Et comme dans toute bouteille d'ammoniac, l'huile s'accumule au fond : on la récupère, par un pot à huile."]
      ],
      question: { q: "Le niveau de liquide monte trop dans la bouteille intermédiaire. Quel est le risque ?",
        choix: [["Du liquide part au compresseur HP : c'est le coup de liquide.", 1],
                ["L'évaporateur gèle.", 0],
                ["La haute pression baisse.", 0]],
        pourquoi: "Le compresseur HP aspire par le haut de la bouteille. Si le niveau monte trop, il aspire du liquide : un liquide ne se comprime pas, c'est le coup de liquide. Une sécurité de niveau haut arrête les compresseurs avant." } },
    { id: "resume", num: "", titre: "Le voyage en deux marches", sous: "l'essentiel à retenir", carte: null,
      phrases: [
        "Pour finir, refaisons le voyage en deux étages.",
        "Je bous très froid, à la basse pression, dans l'évaporateur.",
        ["Le compresseur BP me monte jusqu'à mi-chemin : la pression intermédiaire.", "Le compresseur BP me monte jusqu'à mi-chemin : la pression intermédiaire."],
        ["Dans la bouteille, je fais des bulles dans le liquide : je me refroidis.", "Dans la bouteille, je fais des bulles dans le liquide : je me refroidis."],
        "Le compresseur HP m'emmène à la haute pression, et je me condense.",
        ["Je redescends en deux fois : le flotteur jusqu'à la bouteille intermédiaire, où je me refroidis encore, puis le détendeur jusqu'à la bouteille BP.", "Je redescends en deux fois : le flotteur jusqu'à la bouteille intermédiaire, où je me refroidis encore, puis le détendeur jusqu'à la bouteille BP."],
        ["Deux marches au lieu d'une : moins chaud au refoulement, plus de froid à l'évaporateur.", "Deux marches au lieu d'une : moins chaud au refoulement, plus de froid à l'évaporateur."]
      ],
      question: { q: "Dans quel ordre la vapeur traverse-t-elle l'installation bi-étagée ?",
        choix: [["Compresseur BP, bouteille intermédiaire, compresseur HP.", 1],
                ["Compresseur HP, bouteille intermédiaire, compresseur BP.", 0],
                ["Bouteille intermédiaire, compresseur BP, compresseur HP.", 0]],
        pourquoi: "La vapeur de l'évaporateur est d'abord montée à la pression intermédiaire par le compresseur BP, refroidie dans la bouteille, puis montée à la haute pression par le compresseur HP." } }
  ],
  portes: [
    { t: "Le premier voyage : le circuit de base", h: "../voyage/module.html" },
    { t: "Le voyage de l'ammoniac (régime noyé)", h: "../voyage/module-nh3.html" },
    { t: "Le diagramme enthalpique", h: "../packs/fluides/res/diagramme-enthalpique/" },
    { t: "La centrale booster au CO₂ : deux étages aussi", h: "../packs/fluides/res/co2-r744/index.html?e=booster" }
  ]
};

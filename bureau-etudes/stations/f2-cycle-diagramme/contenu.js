/* Station BE-F2 : le cycle sur le diagramme.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5 à F1 (un cycle à 0 °C et 40 °C est résolu à l'écran ; le cycle à 5 °C
   et 50 °C est la commande du niveau 1), puis commande du niveau 2 sur la maison. Les valeurs de l'exemple (bloc EXEMPLE) et les bornes
   des fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/f2-cycle-diagramme/construire.mjs : le premier vient de
   exemple-data.mjs (CoolProp pour le R32), les secondes de exemple-data.mjs (niveau 1) et de corriges/f2-cycle-diagramme/reference-cycle.json
   (niveau 2, outils/f2-cycle-maison.mjs). Tolérances : ± 5 kJ/kg sur une enthalpie lue, ± 3 % sur un calcul, ± 5 % sur la puissance du
   compresseur, l'EER et le COP. Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes
   et les données de la commande le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

/*EXEMPLE-DEBUT*/
const EX = {
 "phi": "4441",
 "sh": "5",
 "sc": "5",
 "eta": "0,70",
 "repSh": "5 à 10 K",
 "repSc": "4 à 8 K",
 "ecran": {
  "te": "0",
  "tc": "40"
 },
 "th": {
  "p0": "8,1",
  "pk": "24,8",
  "h1": "515",
  "h2s": "560",
  "h2": "560",
  "h3": "276",
  "h4": "276",
  "q0": "239",
  "w": "45",
  "qk": "284",
  "qm": "18,6",
  "Pc": "836",
  "Pk": "5277",
  "EER": "5,31",
  "COP": "6,31",
  "T1": "0",
  "T3": "40"
 },
 "re": {
  "p0": "8,1",
  "pk": "24,8",
  "h1": "521",
  "h2s": "568",
  "h2": "588",
  "h3": "265",
  "h4": "265",
  "q0": "256",
  "w": "67",
  "qk": "323",
  "qm": "17,3",
  "Pc": "1162",
  "Pk": "5603",
  "EER": "3,82",
  "COP": "4,82",
  "T1": "5",
  "T3": "35"
 },
 "n1": {
  "te": "5",
  "tc": "50"
 },
 "maison": {
  "te": "5",
  "tc": "45",
  "t1": "10"
 },
 "ex2": {
  "te": "−5",
  "tc": "35",
  "h3": "265",
  "hl0": "191",
  "h1": "514",
  "quiz": {
   "choices": [
    "h4 = 191 kJ/kg, sur la courbe du liquide saturé, à −5 °C",
    "h4 = 265 kJ/kg, sur l’horizontale de 35 °C",
    "h4 = 265 kJ/kg, à la verticale du point 3, sur l’horizontale de −5 °C",
    "h4 = 514 kJ/kg, sur la courbe de vapeur saturée"
   ],
   "good": 2,
   "explain": "La détente garde l’enthalpie et fait tomber la pression : le point 4 est à 265 kJ/kg, sous le point 3, sur l’horizontale de basse pression, dans la cloche. 191 kJ/kg serait du liquide pur à −5 °C : le fluide a perdu de l’énergie sans raison. Rester à 35 °C oublie la chute de pression. 514 kJ/kg est le point 1, la fin de l’évaporation."
  }
 },
 "ex3": {
  "phi": "2500",
  "h1": "514",
  "h2": "561",
  "h3": "265",
  "quiz": {
   "choices": [
    "EER = 5,30",
    "EER = 6,30",
    "EER = 0,84",
    "EER = 0,19"
   ],
   "good": 0,
   "explain": "q0 = 514 − 265 = 249 kJ/kg ; w = 561 − 514 = 47 kJ/kg ; EER = 249 ÷ 47 = 5,30. 6,30 est le COP, qui compte la chaleur rejetée ; 0,84 divise le froid par la chaleur rejetée ; 0,19 est l’inverse de l’EER. Les 2500 W ne servent pas : le débit se simplifie."
  }
 }
};
/*EXEMPLE-FIN*/

const TH = EX.th, RE = EX.re, X2 = EX.ex2, X3 = EX.ex3, MA = EX.maison;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const altDiagramme = `Diagramme log p-h du R32. En abscisse, l’enthalpie h de 180 à 650 kJ/kg ; en ordonnée, la pression absolue de 6 à 70 bar, en échelle logarithmique. Une cloche en trait épais : à gauche la courbe du liquide saturé, à droite celle de la vapeur saturée, qui se rejoignent au point critique vers 58 bar. À gauche de la cloche, le liquide ; dessous, le mélange de liquide et de vapeur ; à droite, la vapeur. Les isothermes en trait fin marine : horizontales dans la cloche, nommées 0 °C, 10 °C, 20 °C, 30 °C, 40, 50 et 60, avec des pointillés courts tous les 5 °C près des deux courbes ; presque verticales dans le liquide, en pointillé pour 5, 15, 25… °C ; descendantes vers la droite dans la vapeur, où 80, 100, 120, 140 et 160 °C sont nommées au bord du cadre. Les isentropes en tirets verts dans la vapeur, montantes vers la droite. Les titres de vapeur 0,2, 0,4, 0,6 et 0,8 en tirets gris dans la cloche.`;

BE.station({
  code: "BE-F2",
  titre: "Le cycle sur le diagramme",
  ligne: "Frigorifique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bâtiment d’exemple, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Le système est choisi et son fluide aussi : le R32. Vous tracez son cycle sur le diagramme log p-h, vous lisez l’enthalpie des quatre points, puis vous calculez le débit de fluide, la puissance du compresseur, la puissance rejetée au condenseur, l’EER et le COP aux conditions du projet.",
  note: "Le diagramme du R32 est tracé à partir de CoolProp, bibliothèque libre de propriétés des fluides : aucun diagramme d’éditeur n’est recopié. La surchauffe, le sous-refroidissement et le rendement du compresseur sont des données de l’exercice.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Cycle frigorifique du bâtiment d’exemple au R32 : enthalpies, débit, EER et COP",
      delai: "Rendu en fin de séance",
      commande: [
        `La machine du bâtiment d’exemple doit fournir ${EX.phi} W de froid (station T8, avec simultanéité). Fluide : R32. Cycle théorique de l’exercice : évaporation à ${EX.n1.te} °C, condensation à ${EX.n1.tc} °C ; vapeur saturée à l’entrée du compresseur, liquide saturé à la sortie du condenseur, compression isentropique. Suivez les étapes dans l’ordre.`,
        "Étape 1, exercice 1 de la feuille (recto). Nommez les quatre organes du circuit.",
        "Étape 2, exercice 2 de la feuille (recto). Pour chaque point, écrivez entre quels organes il se trouve, son état et sa température.",
        "Étape 3, exercice 3 de la feuille (verso). Tracez le cycle sur le diagramme imprimé : les deux pressions, puis les points 1 à 4 ; placez le point 2 sur la loupe. Reportez la pression et l’enthalpie de chaque point dans le tableau de l’exercice 2.",
        "Étape 4, exercice 4 de la feuille (recto). Calculez l’effet frigorifique, le débit massique, le travail de compression, l’EER et le COP. Vérifiez vos quatre résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Puissance et conditions du cycle", ou: "Cette commande, reprise sur la feuille" },
        { piece: "Diagramme log p-h du R32 et sa loupe", ou: "Verso de la feuille ; écran « Le diagramme log p-h » pour le lire" },
        { piece: "Méthode et exemple résolu", ou: "Écrans « Placer les quatre points » et « Débit, puissances, EER et COP »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Variante de rafraîchissement de la maison : le cycle du multisplit au R32",
      delai: "Rendu en fin de séance",
      commande: `Le multisplit retenu à la station F1 utilise le R32. Il doit fournir la puissance frigorifique de la maison, votre résultat de la station T8 (puissance de la machine, avec simultanéité). Données de l’exercice fixées par le bureau d’études : évaporation à ${MA.te} °C, condensation à ${MA.tc} °C, surchauffe ${EX.sh} K à l’entrée du compresseur, sous-refroidissement ${EX.sc} K à la sortie du condenseur, rendement isentropique du compresseur ${EX.eta}. Tracez le cycle sur le diagramme imprimé, lisez la pression et l’enthalpie des points 1 à 4 et du point 2s, puis calculez le débit massique, la puissance du compresseur, la puissance au condenseur avec son bilan, l’EER et le COP. Comparez la puissance au condenseur à la puissance frigorifique de la station T8. Rédigez la première page de la note de calcul.`,
      pieces: [
        { piece: "Votre feuille de la station T8", ou: "Puissance de la machine, avec simultanéité" },
        { piece: "Votre feuille de la station F1", ou: "Système retenu et fluide" },
        { piece: "Diagramme log p-h du R32 et sa loupe", ou: "Verso de la feuille" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-h2", libelle: "Enthalpie à la sortie du compresseur, h2", unite: "kJ/kg", min: 559, max: 569, indice: "Relisez les écrans « Placer les quatre points » et « La compression réelle » (la parallèle aux isentropes de la loupe) : du point 1, sur la vapeur saturée à 5 °C, suivez une parallèle aux isentropes de la loupe jusqu’à la pression de condensation à 50 °C. Lecture au kJ/kg, à ± 5 kJ/kg près." },
      { id: "n1-q0", libelle: "Effet frigorifique q0", unite: "kJ/kg", min: 212, max: 226, indice: "Effet frigorifique q0 = h1 − h4, avec h4 = h3 : le point 4 est à la verticale du point 3. Au kJ/kg." },
      { id: "n1-qm", libelle: "Débit massique de fluide", unite: "g/s", min: 19.6, max: 21, indice: "Relisez l’écran « Débit, puissances, EER et COP » : qm = Φ0 ÷ q0, avec Φ0 en W et q0 en kJ/kg, donne des g/s. Au dixième." },
      { id: "n1-cop", libelle: "COP du cycle", unite: "", min: 5.28, max: 5.84, indice: "COP = (h2 − h3) ÷ (h2 − h1), au centième. Il dépasse l’EER de 1. Le travail h2 − h1 est petit : relisez h2 sur la loupe." }
    ],
    2: [
      { id: "n2-h2s", libelle: "Enthalpie en fin de compression isentropique, h2s", unite: "kJ/kg", min: 562, max: 572, indice: "Relisez l’écran « La compression réelle » : le point 1 est à p0 sur l’isotherme 10 °C ; de là, une parallèle aux isentropes de la loupe jusqu’à pk. h2s est le point d’arrivée, avant le rendement. Lecture à ± 5 kJ/kg près." },
      { id: "n2-qm", libelle: "Débit massique de fluide", unite: "g/s", min: 26.6, max: 28.4, indice: "qm = Φ0 ÷ (h1 − h4), Φ0 en W (votre puissance de la station T8), en g/s, au dixième. Le point 1 est surchauffé, le point 3 sous-refroidi." },
      { id: "n2-pc", libelle: "Puissance du compresseur", unite: "W", min: 1670, max: 1850, indice: "Pc = qm × (h2 − h1), avec h2 = h1 + (h2s − h1) ÷ ηis, au watt. Une erreur de 2 kJ/kg sur h2s change Pc de près de 5 % : relisez h2s sur la loupe." },
      { id: "n2-eer", libelle: "EER du cycle", unite: "", min: 3.66, max: 4.06, indice: "EER = (h1 − h4) ÷ (h2 − h1), au centième : le froid divisé par le travail réel du compresseur." },
      { id: "n2-cop", libelle: "COP du cycle", unite: "", min: 4.61, max: 5.11, indice: "COP = (h2 − h3) ÷ (h2 − h1), au centième : la chaleur rejetée au condenseur divisée par le travail du compresseur." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-F3", titre: "La machine au réel", href: "../f3-machine-conditions-reelles/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-F1, Besoin et système", href: "../f1-besoin-systeme/index.html", pourquoi: "Le système retenu, son fluide et la puissance à fournir viennent de cette station." },
    { reseau: "Plan thermo-techno", titre: "Diagramme enthalpique interactif", href: "../../../packs/fluides/res/diagramme-enthalpique/", pourquoi: "Vous y suivez les familles de courbes d’un diagramme, une à une." },
    { reseau: "Plan thermo-techno", titre: "Surchauffe et sous-refroidissement", href: "../../../packs/fluides/res/surchauffe-sous-refroidissement-interactif/", pourquoi: "Vous y mesurez la surchauffe et le sous-refroidissement sur une machine, avec des exercices." },
    { reseau: "Bureau d’études", titre: "BE-T8, Été 3 : la synthèse", href: "../t8-ete-air-neuf-synthese/index.html", pourquoi: "La puissance frigorifique de la maison et du bâtiment d’exemple vient de cette station." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Le bureau d’études a choisi le système et son fluide, le R32. Il reste à savoir ce que le fluide fait dans la machine. Vous tracez son cycle sur le diagramme log p-h, en quatre points : l’entrée du compresseur, sa sortie, la sortie du condenseur, la sortie du détendeur. Vous lisez l’enthalpie de chaque point, puis vous calculez le débit de fluide qui donne la puissance frigorifique, la puissance du compresseur, la puissance rejetée dehors, l’EER et le COP. Les réponses s’écrivent sur la feuille A4 recto verso, qui porte le diagramme à son verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Point", "Où", "p (bar)", "θ (°C)", "h (kJ/kg)"], [["1", "", "", "", ""], ["2", "", "", "", ""], ["3", "", "", "", ""], ["4", "", "", "", ""]], "Le tableau des quatre points, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la puissance frigorifique et les conditions du cycle."], ["Le diagramme :", "celui du R32, au verso de la feuille, avec une loupe de la compression."]] },
          { title: "Vous produisez", rows: [["Le cycle :", "les quatre points sur le diagramme, leurs enthalpies dans le tableau."], ["Les calculs :", "débit, puissances, EER, COP. Fourchettes à l’écran Vérifier : ± 5 kJ/kg sur une enthalpie lue, ± 3 % sur un calcul, ± 5 % sur le compresseur, l’EER et le COP."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station F3, la machine aux conditions réelles."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "La puissance frigorifique vient de la station T8 : celle de la machine, avec simultanéité. Le système et le fluide viennent de la station F1. Les propriétés du R32 viennent de CoolProp, une bibliothèque libre de propriétés des fluides : le diagramme de la station est tracé à partir de ses points, rien n’est recopié d’un diagramme d’éditeur. Les enthalpies y sont comptées à partir de 200 kJ/kg pour le liquide saturé à 0 °C, comme sur les diagrammes du commerce. Les températures d’évaporation et de condensation, la surchauffe, le sous-refroidissement et le rendement du compresseur sont fixés par le bureau d’études : ce sont des données de l’exercice. Sur une vraie machine, ils se mesurent ou se lisent dans la notice du constructeur.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Puissance frigorifique à fournir", "Station T8, puissance de la machine avec simultanéité"],
        ["Système et fluide, le R32", "Station F1"],
        ["Pressions, températures, enthalpies du R32", "Le diagramme de la feuille, tracé par CoolProp"],
        ["Évaporation, condensation", "La commande : données de l’exercice"],
        [`Surchauffe ${EX.sh} K, sous-refroidissement ${EX.sc} K`, `La commande : données de l’exercice, dans les repères usuels (surchauffe ${EX.repSh}, sous-refroidissement ${EX.repSc}, HabFluide, chapitre 7)`],
        [`Rendement isentropique ${EX.eta}`, "La commande : donnée de l’exercice"]
      ], "Les données du cycle")
    }),

    BE.ecran({
      id: "quatre-organes", dossier: "methode", kicker: "La méthode, 1", title: "Le circuit et ses quatre organes", level: "comprendre",
      text: "Le fluide tourne en circuit fermé et traverse quatre organes. Dans l’évaporateur, il s’évapore à basse pression en prenant la chaleur de la pièce : c’est la puissance frigorifique. Le compresseur aspire cette vapeur et la refoule à haute pression, plus chaude ; il consomme de l’électricité. Dans le condenseur, la vapeur cède sa chaleur à l’air du dehors et redevient liquide. Le détendeur fait chuter la pression du liquide et dose le fluide qui entre dans l’évaporateur. Les points du cycle se numérotent dans le sens du fluide : 1 à l’entrée du compresseur, 2 à sa sortie, 3 à la sortie du condenseur, 4 à la sortie du détendeur. Côté haute pression, les points 2 et 3 ; côté basse pression, les points 4 et 1.",
      prompt: "Suivez le fluide sur le schéma, du point 1 au point 4, puis continuez.",
      render: () => BE.schema("illustrations/circuit.svg", "Schéma de principe d’un circuit frigorifique, le fluide en orange. En haut, le condenseur, un échangeur à air ventilé ; à droite, le compresseur, un cercle ; en bas, le détendeur thermostatique puis l’évaporateur, un autre échangeur à air ventilé. Des flèches donnent le sens : du compresseur vers le condenseur par le haut, du condenseur vers le détendeur par la gauche, du détendeur vers l’évaporateur, puis de l’évaporateur vers le compresseur. Point 1 entre l’évaporateur et le compresseur, point 2 entre le compresseur et le condenseur, point 3 entre le condenseur et le détendeur, point 4 entre le détendeur et l’évaporateur. Haute pression en haut, basse pression en bas.", "Le sens du fluide donne l’ordre des points : 1, 2, 3, 4.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, les organes", title: "À l’écran : quel organe fait quoi", level: "appliquer", requiresAction: true,
      text: {
        1: "Pour chaque phrase, choisissez l’organe où cela se passe. L’exemple résolu montre la première ligne. Le schéma de l’écran « Le circuit et ses quatre organes » reste votre modèle.",
        2: "Pour chaque phrase, choisissez l’organe où cela se passe."
      },
      prompt: { 1: "Rangez chaque phrase sous un organe, en vous aidant de l’exemple.", 2: "Rangez chaque phrase sous un organe. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Le circuit et ses quatre organes ».", "Demandez-vous si la pression change, et si le fluide prend ou cède de la chaleur.", "Prend la chaleur de la pièce : évaporateur. Cède la chaleur dehors : condenseur. Monte en pression : compresseur. Chute de pression sans échange : détendeur. La surchauffe se gagne à la fin de l’évaporation, le sous-refroidissement à la fin de la condensation (écran « Surchauffe et sous-refroidissement »)."],
        2: ["La méthode est à l’écran « Le circuit et ses quatre organes ».", "Deux questions par phrase : la pression monte, baisse ou reste la même ; le fluide prend ou cède de la chaleur.", "La surchauffe se gagne à la fin de l’évaporation, le sous-refroidissement à la fin de la condensation."]
      },
      ...BE.parNiveau({
        1: BE.tri([
          { text: "La vapeur passe de la basse à la haute pression", good: 0, why: "Le compresseur aspire la vapeur à basse pression et la refoule à haute pression." },
          { text: "Le fluide cède sa chaleur à l’air du dehors et redevient liquide", good: 1, why: "C’est la condensation, à haute pression." },
          { text: "Le liquide passe à la basse pression sans échanger de chaleur", good: 2, why: "Le détendeur fait chuter la pression ; une partie du liquide se vaporise." },
          { text: "Le fluide s’évapore en prenant la chaleur de la pièce", good: 3, why: "C’est l’évaporation, à basse pression : la puissance frigorifique." },
          { text: "Le liquide se refroidit sous sa température de condensation", good: 1, why: "Le sous-refroidissement se gagne en fin de condenseur, avant le détendeur." }
        ], ["Compresseur", "Condenseur", "Détendeur", "Évaporateur"], { text: "La vapeur se réchauffe de quelques degrés au-dessus de sa température d’évaporation", good: 3, why: "La surchauffe se gagne en fin d’évaporateur, avant le compresseur." }),
        2: BE.tri([
          { text: "La vapeur passe de la basse à la haute pression", good: 0, why: "Le compresseur aspire la vapeur à basse pression et la refoule à haute pression." },
          { text: "Le fluide cède sa chaleur à l’air du dehors et redevient liquide", good: 1, why: "C’est la condensation, à haute pression." },
          { text: "Le liquide passe à la basse pression sans échanger de chaleur", good: 2, why: "Le détendeur fait chuter la pression ; une partie du liquide se vaporise." },
          { text: "Le fluide s’évapore en prenant la chaleur de la pièce", good: 3, why: "C’est l’évaporation, à basse pression : la puissance frigorifique." },
          { text: "Le liquide se refroidit sous sa température de condensation", good: 1, why: "Le sous-refroidissement se gagne en fin de condenseur, avant le détendeur." },
          { text: "La vapeur se réchauffe de quelques degrés au-dessus de sa température d’évaporation", good: 3, why: "La surchauffe se gagne en fin d’évaporateur, avant le compresseur." }
        ], ["Compresseur", "Condenseur", "Détendeur", "Évaporateur"])
      })
    }),

    BE.ecran({
      id: "lire-le-diagramme", dossier: "methode", kicker: "La méthode, 2", title: "Le diagramme log p-h", level: "comprendre",
      text: `Le diagramme log p-h porte l’enthalpie h en abscisse, en kJ/kg : l’énergie que contient un kilogramme de fluide. La pression est en ordonnée, en bar absolus, sur une échelle logarithmique : les graduations se resserrent vers le haut. La cloche sépare trois zones : à gauche le liquide, sous la cloche le mélange de liquide et de vapeur, à droite la vapeur. Sa courbe de gauche est le liquide saturé, sa courbe de droite la vapeur saturée. Sous la cloche, une isotherme est horizontale : le fluide change d’état à température et pression constantes. La pression d’évaporation se lit donc à la hauteur de l’isotherme d’évaporation ; les pointillés courts marquent les isothermes de 5 en 5 °C près des deux courbes. Dans la vapeur, les isothermes descendent vers la droite et les isentropes, en tirets verts, montent : une compression sans perte suit une isentrope. Le titre de vapeur dit la part de vapeur dans le mélange : 0,2 signifie 20 % de vapeur. Les manomètres d’une machine affichent une pression relative : ajoutez environ 1 bar pour lire le diagramme.`,
      prompt: "Repérez les trois zones et les quatre familles de courbes, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/diagramme-vierge.svg", altDiagramme, "Diagramme du R32 tracé à partir de CoolProp. Isothermes en °C.")
        + BE.exemple({ text: `Pression d’évaporation à ${EX.ecran.te} °C et de condensation à ${EX.ecran.tc} °C`, answer: `À ${EX.ecran.te} °C, l’isotherme horizontale est à p0 = ${TH.p0} bar ; à ${EX.ecran.tc} °C, à pk = ${TH.pk} bar`, why: "Une température de changement d’état donne une seule pression : on la lit là où l’isotherme traverse la cloche." })
    }),

    BE.ecran({
      id: "placer-les-points", dossier: "methode", kicker: "La méthode, 3", title: "Placer les quatre points", level: "comprendre",
      text: `Commencez par les deux pressions : tracez l’horizontale de basse pression p0 et celle de haute pression pk. Le cycle théorique se place ainsi. Le point 1 est sur la courbe de vapeur saturée, à p0 : la vapeur entre dans le compresseur sans liquide. Du point 1, suivez l’isentrope jusqu’à pk : c’est le point 2, la vapeur chaude refoulée. Le point 3 est sur la courbe de liquide saturé, à pk : le condenseur rend du liquide. La détente ne change pas l’enthalpie : le point 4 est à la verticale du point 3, sur l’horizontale p0, sous la cloche. Lisez l’enthalpie de chaque point sur l’axe du bas, au kJ/kg ; une lecture juste reste à ± 5 kJ/kg près. Le point 2 se lit mieux sur la loupe de la compression. Exemple du bâtiment d’exemple, cycle théorique de l’exercice : évaporation à ${EX.ecran.te} °C, condensation à ${EX.ecran.tc} °C.`,
      prompt: "Suivez le cycle sur le diagramme, du point 1 au point 4, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/cycle-exemple.svg", `Le diagramme du R32 avec le cycle théorique d’exemple en orange. Horizontale basse pression à ${TH.p0} bar, l’isotherme ${EX.ecran.te} °C ; horizontale haute pression à ${TH.pk} bar, l’isotherme ${EX.ecran.tc} °C. Point 1 sur la courbe de vapeur saturée à ${TH.p0} bar, h = ${TH.h1} kJ/kg. Point 2 à ${TH.pk} bar, dans la vapeur, au bout de l’isentrope partie de 1, h = ${TH.h2} kJ/kg. Point 3 sur la courbe de liquide saturé à ${TH.pk} bar, h = ${TH.h3} kJ/kg. Point 4 à la verticale du point 3, sur l’horizontale basse pression, h = ${TH.h4} kJ/kg. Le cycle se ferme de 4 à 1 le long de l’horizontale basse pression.`, "Cycle théorique : 1 et 3 sur la cloche, 2 sur l’isentrope, 4 à la verticale de 3.")
        + BE.exemple({ text: `Cycle théorique : ${EX.ecran.te} °C et ${EX.ecran.tc} °C, R32`, answer: `p0 = ${TH.p0} bar, pk = ${TH.pk} bar ; h1 = ${TH.h1} kJ/kg ; h2 = ${TH.h2} kJ/kg ; h3 = ${TH.h3} kJ/kg ; h4 = h3 = ${TH.h4} kJ/kg`, why: "Le point 4 est sous la cloche : un mélange de liquide et de vapeur, à la même enthalpie que le liquide du point 3." })
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, le point 4", title: "À l’écran : où placer le point 4", level: "appliquer", requiresAction: true,
      text: {
        1: `Un autre cycle d’exemple au R32 évapore à ${X2.te} °C et condense à ${X2.tc} °C. Le point 3, liquide saturé à ${X2.tc} °C, se lit à h3 = ${X2.h3} kJ/kg. Sur le diagramme, le liquide saturé à ${X2.te} °C est à ${X2.hl0} kJ/kg et la vapeur saturée à ${X2.h1} kJ/kg. Où placez-vous le point 4, et quelle est son enthalpie ? L’exemple résolu reste sous vos yeux.`,
        2: `Un autre cycle d’exemple au R32 évapore à ${X2.te} °C et condense à ${X2.tc} °C. Le point 3, liquide saturé à ${X2.tc} °C, se lit à h3 = ${X2.h3} kJ/kg. Sur le diagramme, le liquide saturé à ${X2.te} °C est à ${X2.hl0} kJ/kg et la vapeur saturée à ${X2.h1} kJ/kg. Où placez-vous le point 4, et quelle est son enthalpie ?`
      },
      prompt: { 1: "Choisissez la réponse juste, en vous aidant de l’exemple.", 2: "Choisissez la réponse juste. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Placer les quatre points ».", "Le détendeur fait chuter la pression sans changer l’enthalpie.", `Partez du point 3 et descendez à la verticale jusqu’à l’horizontale de ${X2.te} °C.`],
        2: ["La méthode est à l’écran « Placer les quatre points ».", "Deux questions : à quelle pression est le point 4, et qu’est-ce que la détente garde ?", "La détente se trace à la verticale."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `Cycle d’exemple à ${EX.ecran.te} °C et ${EX.ecran.tc} °C`, answer: `h3 = ${TH.h3} kJ/kg, donc h4 = ${TH.h4} kJ/kg, sur l’horizontale p0 = ${TH.p0} bar`, why: "La détente est verticale sur le diagramme." }), X2.quiz),
        2: avecBloc("", X2.quiz)
      })
    }),

    BE.ecran({
      id: "surchauffe-sous-refroidissement", dossier: "methode", kicker: "La méthode, 4", title: "Surchauffe et sous-refroidissement", level: "comprendre",
      text: `Sur une vraie machine, la vapeur quitte l’évaporateur un peu plus chaude que sa température d’évaporation : c’est la surchauffe, en kelvins. Elle protège le compresseur, qui ne doit aspirer que de la vapeur. Le liquide quitte le condenseur un peu plus froid que sa température de condensation : c’est le sous-refroidissement, qui assure du liquide sans bulles au détendeur. Repères usuels du fonds (HabFluide, chapitre 7) : surchauffe ${EX.repSh}, sous-refroidissement ${EX.repSc}. L’exercice retient ${EX.sh} K et ${EX.sc} K. Sur le diagramme, le point 1 quitte la cloche : il se place à p0, sur l’isotherme θ0 + ${EX.sh} K, dans la vapeur. Le point 3 aussi : il se place à pk, sur l’isotherme θk − ${EX.sc} K, dans le liquide, presque à la verticale du liquide saturé à cette température. Dans le liquide, l’isotherme θ est la verticale qui monte du liquide saturé à θ : la suite de l’horizontale de la cloche, en trait plein de 10 en 10 °C, en pointillé pour 5, 15, 25… °C. Le point 4 reste à la verticale du point 3. L’effet frigorifique h1 − h4 grandit des deux côtés.`,
      prompt: "Comparez les deux tracés sur les deux loupes, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/cycle-avec-sans.svg", `Deux loupes du diagramme du R32, enthalpie en kJ/kg en bas. À gauche, côté liquide, de 255 à 285 kJ/kg : l’horizontale haute pression à ${TH.pk} bar coupe la courbe de liquide saturé au point « 3 sans », à ${TH.h3} kJ/kg, sur l’isotherme ${EX.ecran.tc} °C ; le point « 3 avec » est plus à gauche, à ${RE.h3} kJ/kg, sur l’isotherme ${EX.re.T3} °C, presque verticale dans le liquide. De chaque point, la détente descend à la verticale. À droite, côté vapeur, de 505 à 530 kJ/kg : l’horizontale basse pression à ${TH.p0} bar coupe la courbe de vapeur saturée au point « 1 sans », à ${TH.h1} kJ/kg, sur l’isotherme ${EX.ecran.te} °C ; le point « 1 avec » est plus à droite, à ${RE.h1} kJ/kg, sur l’isotherme ${EX.re.T1} °C. Tirets : le cycle sans surchauffe ni sous-refroidissement ; trait plein : avec.`, `Avec ${EX.sh} K de surchauffe et ${EX.sc} K de sous-refroidissement, le point 1 part à droite et le point 3 à gauche.`)
        + BE.exemple({ text: `Bâtiment d’exemple : ${EX.ecran.te} °C et ${EX.ecran.tc} °C, surchauffe ${EX.sh} K, sous-refroidissement ${EX.sc} K`, answer: `Point 1 à ${TH.p0} bar et ${EX.re.T1} °C : h1 = ${RE.h1} kJ/kg. Point 3 à ${TH.pk} bar et ${EX.re.T3} °C : h3 = h4 = ${RE.h3} kJ/kg. Effet frigorifique ${RE.h1} − ${RE.h3} = ${RE.q0} kJ/kg, contre ${TH.q0} kJ/kg sans`, why: "La surchauffe et le sous-refroidissement déplacent les points 1 et 3 de quelques kJ/kg : la loupe les rend visibles." })
    }),

    BE.ecran({
      id: "compression-reelle", dossier: "methode", kicker: "La méthode, 5", title: "La compression réelle", level: "comprendre",
      text: `Une compression sans perte suivrait l’isentrope partie du point 1 : elle s’arrêterait au point 2s, à pk. Le vrai compresseur s’échauffe et consomme davantage. Le rendement isentropique ηis compare les deux travaux : ηis = (h2s − h1) ÷ (h2 − h1). On en tire h2 = h1 + (h2s − h1) ÷ ηis, avec ηis = ${EX.eta} dans l’exercice. Sur la loupe, les isentropes sont tracées toutes les 0,01 kJ/(kg.K) : placez le point 1, suivez une parallèle aux isentropes voisines jusqu’à pk, et lisez h2s au kJ/kg près. Le travail de compression est une petite différence d’enthalpies : une erreur de 2 kJ/kg sur h2s change le travail de près de 5 %. Le point 2 se place ensuite à pk, à l’enthalpie h2 calculée.`,
      prompt: "Suivez la compression sur la loupe, de 1 à 2s, puis de 1 à 2, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/compression-loupe.svg", `Loupe de la compression sur le diagramme du R32 : enthalpie de 500 à 620 kJ/kg, pression de 7 à 35 bar. Courbe de vapeur saturée à gauche ; isothermes 0, 5, 10, 15 et 20 °C nommées à gauche de la courbe ; isentropes en vert toutes les 0,01 kJ/(kg.K), nommées 2,10, 2,15 et 2,20 en haut. Le cycle d’exemple en orange : point 1 à ${TH.p0} bar et ${RE.h1} kJ/kg ; en tirets, la compression sans perte jusqu’au point 2s, à ${TH.pk} bar et ${RE.h2s} kJ/kg, parallèle aux isentropes ; en trait plein, la compression réelle jusqu’au point 2, à ${TH.pk} bar et ${RE.h2} kJ/kg, plus à droite.`, "Le point 2 réel est à droite du point 2s : le compresseur réel consomme plus.")
        + BE.exemple({ text: `Bâtiment d’exemple : h1 = ${RE.h1} kJ/kg, h2s lu à ${RE.h2s} kJ/kg, ηis = ${EX.eta}`, answer: `h2 = ${RE.h1} + (${RE.h2s} − ${RE.h1}) ÷ ${EX.eta} = ${RE.h2} kJ/kg ; travail w = ${RE.h2} − ${RE.h1} = ${RE.w} kJ/kg`, why: "On divise par le rendement : le travail réel est plus grand que le travail sans perte." })
    }),

    BE.ecran({
      id: "puissances-et-coefficients", dossier: "methode", kicker: "La méthode, 6", title: "Débit, puissances, EER et COP", level: "comprendre",
      text: `L’effet frigorifique q0 = h1 − h4 est la chaleur qu’un kilogramme de fluide prend dans l’évaporateur. Le débit massique qm fait la puissance : qm = Φ0 ÷ q0. Avec Φ0 en W et q0 en kJ/kg, qm sort en g/s ; divisez par 1 000 pour des kg/s. La puissance du compresseur vaut Pc = qm × (h2 − h1), et la puissance rejetée au condenseur Φk = qm × (h2 − h3), en W avec qm en g/s. Le bilan se vérifie : ce qui entre égale ce qui sort, Φk = Φ0 + Pc. L’EER, pour le froid, vaut Φ0 ÷ Pc = (h1 − h4) ÷ (h2 − h1). Le COP, pour la pompe à chaleur, vaut Φk ÷ Pc = (h2 − h3) ÷ (h2 − h1) : il dépasse l’EER de 1 sur le cycle. Un EER ou un COP se cite toujours avec ses températures (HabFluide, chapitre 17). Donnez les enthalpies au kJ/kg, le débit au dixième de g/s, les puissances au watt, l’EER et le COP au centième.`,
      prompt: "Lisez les barres et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/puissances.svg", `Barres horizontales des puissances du cycle d’exemple, avec ${EX.sh} K de surchauffe, ${EX.sc} K de sous-refroidissement et ηis = ${EX.eta}. Puissance frigorifique Φ0 ${EX.phi} W, en bleu. Puissance du compresseur Pc ${RE.Pc} W, en marine, la plus courte. Puissance au condenseur Φk ${RE.Pk} W, en orange, la plus longue : la somme des deux autres.`, "Le condenseur rejette la chaleur prise dans les pièces et l’énergie du compresseur.")
        + BE.exemple({ text: `Bâtiment d’exemple : Φ0 = ${EX.phi} W ; h1 = ${RE.h1}, h2 = ${RE.h2}, h3 = h4 = ${RE.h3} kJ/kg`, answer: `q0 = ${RE.h1} − ${RE.h3} = ${RE.q0} kJ/kg ; qm = ${EX.phi} ÷ ${RE.q0} = ${RE.qm} g/s ; Pc = ${RE.qm} × ${RE.w} = ${RE.Pc} W ; Φk = ${RE.qm} × ${RE.qk} = ${RE.Pk} W, et ${EX.phi} + ${RE.Pc} = ${RE.Pk} W ; EER = ${RE.q0} ÷ ${RE.w} = ${RE.EER} ; COP = ${RE.qk} ÷ ${RE.w} = ${RE.COP}`, why: `Ces coefficients valent pour ${EX.ecran.te} °C et ${EX.ecran.tc} °C. Les puissances sont calculées avec le débit non arrondi.` })
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, l’EER", title: "À l’écran : l’EER d’un cycle", level: "appliquer", requiresAction: true,
      text: {
        1: `Un local d’exemple demande ${X3.phi} W de froid. Son cycle théorique au R32 se lit ainsi : h1 = ${X3.h1} kJ/kg, h2 = ${X3.h2} kJ/kg, h3 = h4 = ${X3.h3} kJ/kg. Quel est l’EER du cycle ? L’exemple résolu reste sous vos yeux.`,
        2: `Un local d’exemple demande ${X3.phi} W de froid. Son cycle théorique au R32 se lit ainsi : h1 = ${X3.h1} kJ/kg, h2 = ${X3.h2} kJ/kg, h3 = h4 = ${X3.h3} kJ/kg. Quel est l’EER du cycle ?`
      },
      prompt: { 1: "Choisissez l’EER juste, en vous aidant de l’exemple.", 2: "Choisissez l’EER juste. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Débit, puissances, EER et COP ».", "EER = effet frigorifique ÷ travail de compression.", `Calculez d’abord h1 − h4, puis h2 − h1.`],
        2: ["La méthode est à l’écran « Débit, puissances, EER et COP ».", "L’EER compte le froid comme utile, le COP la chaleur rejetée.", "Le débit ne change pas l’EER : il se simplifie."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `Exemple : h1 = ${RE.h1}, h2 = ${RE.h2}, h4 = ${RE.h3} kJ/kg`, answer: `EER = (${RE.h1} − ${RE.h3}) ÷ (${RE.h2} − ${RE.h1}) = ${RE.q0} ÷ ${RE.w} = ${RE.EER}`, why: "Froid produit sur travail payé." }), X3.quiz),
        2: avecBloc("", X3.quiz)
      })
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 7", title: "Ce que la note doit dire", level: "comprendre",
      text: "La première page de la note donne l’objet, les données et leur source, les hypothèses de l’exercice, les résultats et la conclusion. Elle cite toujours l’EER et le COP avec leurs températures. Un autre technicien doit pouvoir refaire chaque lecture sur le diagramme. Voici la note du cycle d’exemple, avec surchauffe et sous-refroidissement.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du cycle d’exemple"], [
        ["Objet", "Cycle frigorifique du bâtiment d’exemple au R32"],
        ["Données", `Φ0 = ${EX.phi} W : station T8 ; R32 : station F1 ; diagramme : CoolProp`],
        ["Hypothèses", `Évaporation ${EX.ecran.te} °C, condensation ${EX.ecran.tc} °C, surchauffe ${EX.sh} K, sous-refroidissement ${EX.sc} K, ηis = ${EX.eta} : données de l’exercice`],
        ["Résultats", `h1 ${RE.h1}, h2s ${RE.h2s}, h2 ${RE.h2}, h3 = h4 ${RE.h3} kJ/kg ; qm ${RE.qm} g/s ; Pc ${RE.Pc} W ; Φk ${RE.Pk} W`],
        ["Conclusion", `EER ${RE.EER} et COP ${RE.COP} à ${EX.ecran.te} °C et ${EX.ecran.tc} °C ; le condenseur rejette ${RE.Pk} W, ${RE.Pc} W de plus que la puissance frigorifique`]
      ], "Note de calcul, cycle d’exemple")
    }),

    BE.projet({
      dossier: "projet", kicker: "Le projet, 1",
      aides: {
        1: [
          "La puissance et les températures sont dans la commande et sur la feuille. Le diagramme est au verso de la feuille. La méthode est aux écrans « Placer les quatre points » et « Débit, puissances, EER et COP ».",
          `Tracez l’horizontale à ${EX.n1.te} °C et celle à ${EX.n1.tc} °C, à la hauteur où ces isothermes traversent la cloche. Point 1 sur la vapeur saturée, point 3 sur le liquide saturé, point 4 à la verticale de 3, point 2 au bout de l’isentrope, sur la loupe.`,
          `Sur l’exemple, à ${EX.ecran.te} °C et ${EX.ecran.tc} °C : h1 = ${TH.h1}, h2 = ${TH.h2}, h3 = h4 = ${TH.h3} kJ/kg. Votre cycle condense plus chaud : le point 3 est plus haut et plus à droite.`
        ],
        2: [
          "Puissance frigorifique : votre feuille de la station T8. Conditions du cycle : la commande. Diagramme : le verso de la feuille. Méthode : écrans « Surchauffe et sous-refroidissement », « La compression réelle » et « Débit, puissances, EER et COP ».",
          "Point 1 : à p0, sur l’isotherme θ0 + surchauffe. Point 3 : à pk, sur l’isotherme θk − sous-refroidissement. Point 2s : sur la loupe, parallèle aux isentropes, à pk. Point 2 : h2 = h1 + (h2s − h1) ÷ ηis.",
          `Commencez par les deux pressions : l’isotherme ${MA.te} °C et l’isotherme ${MA.tc} °C, au pointillé de 5 °C, là où elles traversent la cloche. Puis le point 1, à ${MA.t1} °C dans la vapeur.`
        ]
      }
    }),

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

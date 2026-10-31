/* Station BE-T2 : Les parois, de la coupe au coefficient U.
   Méthode sur les parois du bureau d'exemple de la station T1 (qui n'est pas une pièce de la maison), puis commande sur la maison.
   Les valeurs du bureau d'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/t2-parois-coefficient-u/construire.mjs : le premier vient de exemple-data.mjs, les secondes de corrige-u-parois.json (tolérance 2 %). */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";
const COUPE_MUR = "illustrations/coupe-mur-exemple.svg", COUPE_SURF = "illustrations/coupe-mur-surfaces.svg", COUPE_PLAFOND = "illustrations/coupe-plafond-comble.svg", COUPE_MC = "illustrations/coupe-mur-local-technique.svg";

/*EXEMPLE-DEBUT*/
const EX = {
 "MA": {
  "id": "MA",
  "nom": "Mur extérieur du bureau (MA et MB)",
  "cote": "extérieur",
  "flux": "horizontal",
  "Rsi": "0,13",
  "Rse": "0,04",
  "somme": "3,093",
  "Rt": "3,263",
  "U": "0,31",
  "U3": "0,306",
  "couches": [
   {
    "court": "Plaque de plâtre",
    "nom": "Plaque de plâtre standard (750 à 900 kg/m³)",
    "e_mm": "15",
    "e_m": "0,015",
    "e_cm": "1,5",
    "lambda": "0,25",
    "Rdonne": null,
    "R": "0,060",
    "source": "Th-Bât Matériaux, § 2.3, p. 12"
   },
   {
    "court": "Laine de roche",
    "nom": "Laine de roche certifiée",
    "e_mm": "100",
    "e_m": "0,100",
    "e_cm": "10",
    "lambda": "0,034",
    "Rdonne": null,
    "R": "2,941",
    "source": "certificat ACERMI du produit, valeur d’exercice"
   },
   {
    "court": "Béton plein",
    "nom": "Béton plein (2 300 à 2 600 kg/m³)",
    "e_mm": "160",
    "e_m": "0,160",
    "e_cm": "16",
    "lambda": "2,00",
    "Rdonne": null,
    "R": "0,080",
    "source": "Th-Bât Matériaux, § 2.2.1.1, p. 7"
   },
   {
    "court": "Enduit",
    "nom": "Enduit au mortier de ciment (1 800 à 2 000 kg/m³)",
    "e_mm": "15",
    "e_m": "0,015",
    "e_cm": "1,5",
    "lambda": "1,3",
    "Rdonne": null,
    "R": "0,012",
    "source": "Th-Bât Matériaux, § 2.9.2, p. 28"
   }
  ]
 },
 "MA_DEFAUT": {
  "id": "MA-défaut",
  "nom": "Mur extérieur du bureau (MA et MB)",
  "cote": "extérieur",
  "flux": "horizontal",
  "Rsi": "0,13",
  "Rse": "0,04",
  "somme": "2,533",
  "Rt": "2,703",
  "U": "0,37",
  "U3": "0,370",
  "couches": [
   {
    "court": "Plaque de plâtre",
    "nom": "Plaque de plâtre standard (750 à 900 kg/m³)",
    "e_mm": "15",
    "e_m": "0,015",
    "e_cm": "1,5",
    "lambda": "0,25",
    "Rdonne": null,
    "R": "0,060",
    "source": "Th-Bât Matériaux, § 2.3, p. 12"
   },
   {
    "court": "Laine de roche",
    "nom": "Laine de roche sans certificat (40 à 100 kg/m³)",
    "e_mm": "100",
    "e_m": "0,100",
    "e_cm": "10",
    "lambda": "0,042",
    "Rdonne": null,
    "R": "2,381",
    "source": "Th-Bât Matériaux, § 1.3.1 et § 2.6, p. 17 et 18"
   },
   {
    "court": "Béton plein",
    "nom": "Béton plein (2 300 à 2 600 kg/m³)",
    "e_mm": "160",
    "e_m": "0,160",
    "e_cm": "16",
    "lambda": "2,00",
    "Rdonne": null,
    "R": "0,080",
    "source": "Th-Bât Matériaux, § 2.2.1.1, p. 7"
   },
   {
    "court": "Enduit",
    "nom": "Enduit au mortier de ciment (1 800 à 2 000 kg/m³)",
    "e_mm": "15",
    "e_m": "0,015",
    "e_cm": "1,5",
    "lambda": "1,3",
    "Rdonne": null,
    "R": "0,012",
    "source": "Th-Bât Matériaux, § 2.9.2, p. 28"
   }
  ]
 },
 "MC": {
  "id": "MC",
  "nom": "Mur du bureau sur le local technique (MC)",
  "cote": "local non chauffé",
  "flux": "horizontal",
  "Rsi": "0,13",
  "Rse": "0,13",
  "somme": "1,606",
  "Rt": "1,866",
  "U": "0,54",
  "U3": "0,536",
  "couches": [
   {
    "court": "Plaque de plâtre",
    "nom": "Plaque de plâtre standard (750 à 900 kg/m³)",
    "e_mm": "18",
    "e_m": "0,018",
    "e_cm": "1,8",
    "lambda": "0,25",
    "Rdonne": null,
    "R": "0,072",
    "source": "Th-Bât Matériaux, § 2.3, p. 12"
   },
   {
    "court": "Polystyrène expansé",
    "nom": "Polystyrène expansé sans certificat (15 à 19 kg/m³)",
    "e_mm": "60",
    "e_m": "0,060",
    "e_cm": "6",
    "lambda": "0,044",
    "Rdonne": null,
    "R": "1,364",
    "source": "Th-Bât Matériaux, § 1.3.1 et § 2.6, p. 17 et 18"
   },
   {
    "court": "Bloc creux",
    "nom": "Bloc creux en béton de 15 cm",
    "e_mm": "150",
    "e_m": "0,150",
    "e_cm": "15",
    "lambda": null,
    "Rdonne": "0,17",
    "R": "0,17",
    "source": "fiche du fabricant, valeur d’exercice"
   }
  ]
 },
 "PL": {
  "id": "PL",
  "nom": "Plafond du bureau sous combles perdus",
  "cote": "local non chauffé",
  "flux": "ascendant",
  "Rsi": "0,10",
  "Rse": "0,10",
  "somme": "4,524",
  "Rt": "4,724",
  "U": "0,21",
  "U3": "0,212",
  "couches": [
   {
    "court": "Plaque de plâtre",
    "nom": "Plaque de plâtre standard (750 à 900 kg/m³)",
    "e_mm": "15",
    "e_m": "0,015",
    "e_cm": "1,5",
    "lambda": "0,25",
    "Rdonne": null,
    "R": "0,060",
    "source": "Th-Bât Matériaux, § 2.3, p. 12"
   },
   {
    "court": "Laine soufflée",
    "nom": "Laine soufflée sur plancher de comble, sans certificat",
    "e_mm": "250",
    "e_m": "0,250",
    "e_cm": "25",
    "lambda": "0,056",
    "Rdonne": null,
    "R": "4,464",
    "source": "Th-Bât Matériaux, § 1.3.1 et § 2.6, p. 17 et 18"
   }
  ]
 },
 "bloc": {
  "e_mm": "250",
  "e_cm": "25",
  "e_m": "0,250",
  "R": "0,26"
 },
 "cert": {
  "R_cert": "2,941",
  "R_defaut": "2,381",
  "U_cert": "0,31",
  "U_defaut": "0,37"
 },
 "sansSurf": {
  "U": "0,32"
 },
 "ex1": {
  "choices": [
   "Plâtre 72,000 ; polystyrène 1 363,636 ; bloc 0,17",
   "Plâtre 0,072 ; polystyrène 1,364 ; bloc 0,882",
   "Plâtre 0,072 ; polystyrène 1,364 ; bloc 0,17",
   "Plâtre 13,889 ; polystyrène 0,733 ; bloc 0,17"
  ],
  "good": 2,
  "explain": "18 mm font 0,018 m : 0,018 ÷ 0,25 = 0,072. 60 mm font 0,060 m : 0,060 ÷ 0,044 = 1,364. Le bloc creux garde le R donné par sa fiche, 0,17. La première autre ligne oublie la conversion des millimètres, la deuxième divise l’épaisseur du bloc par son R, la dernière divise λ par e."
 },
 "ex2": {
  "choices": [
   "0,56",
   "0,54",
   "0,62",
   "1,87"
  ],
  "good": 1,
  "explain": "Sur un local non chauffé, Rsi vaut 0,13 des deux côtés : Rt = 0,13 + 0,072 + 1,364 + 0,17 + 0,13 = 1,866, donc U = 1 ÷ 1,866 = 0,54. 0,56 prend Rse = 0,04 côté local non chauffé, 0,62 oublie Rsi et Rse, 1,87 donne Rt sans l’inverser."
 },
 "tri": {
  "labels": [
   "0,13 et 0,04",
   "0,13 et 0,13",
   "0,10 et 0,10",
   "0,10 et 0,04",
   "0,17 et 0,04"
  ],
  "exemple": {
   "text": "Toiture-terrasse isolée, sur l’extérieur",
   "good": 3,
   "why": "Flux montant, paroi sur l’extérieur : deuxième ligne du tableau X."
  },
  "lignes": [
   {
    "text": "Mur extérieur d’un local, paroi verticale",
    "good": 0,
    "why": "Flux horizontal, paroi sur l’extérieur : première ligne du tableau X.",
    "bad": "Cherchez le sens du flux : il est horizontal à travers un mur."
   },
   {
    "text": "Mur donnant sur un garage non chauffé",
    "good": 1,
    "why": "Flux horizontal, local non chauffé : Rsi des deux côtés (note 2).",
    "bad": "Une paroi sur un local non chauffé prend Rsi des deux côtés."
   },
   {
    "text": "Plafond sous combles perdus",
    "good": 2,
    "why": "Flux montant, combles non chauffés : Rsi des deux côtés.",
    "bad": "La chaleur monte, et des combles perdus ne sont pas chauffés."
   },
   {
    "text": "Plancher d’un étage au-dessus d’un porche ouvert",
    "good": 4,
    "why": "Flux descendant, passage ouvert traité comme l’extérieur : troisième ligne du tableau X.",
    "bad": "La chaleur descend, et un porche ouvert compte comme l’extérieur."
   }
  ]
 },
 "pages": {
  "P1": 1,
  "P2": 1,
  "P3": 1,
  "P4": 2,
  "menuiseries": 2
 }
};
/*EXEMPLE-FIN*/

/* Les couches d'une paroi du bureau d'exemple, comme un CCTP les donne (sans aucun R). */
const extraitCctp = (P, legende) => tableau(["Couche", "Épaisseur (mm)", "λ ou R donné", "Source"], P.couches.map(c => [c.nom, c.e_mm, c.Rdonne ? `R ${c.Rdonne}` : `λ ${c.lambda}`, c.source]), legende);
/* La même paroi, résolue : une ligne par couche ; avec surfaces, Rsi et Rse, Rt et U en plus. */
const tableauResolu = (P, legende, avecSurfaces = true) => tableau(["Couche", "e (mm)", "e (m)", "λ ou R donné", "R (m².K/W)"], [
  ...(avecSurfaces ? [["Rsi", "", "", "", P.Rsi]] : []),
  ...P.couches.map(c => [c.court, c.e_mm, c.e_m, c.Rdonne ? `R ${c.Rdonne}` : c.lambda, c.R]),
  ...(avecSurfaces ? [
    [P.Rse === P.Rsi && P.cote !== "extérieur" ? "Rsi, côté local non chauffé" : "Rse", "", "", "", P.Rse],
    ["Rt = Rsi + somme des R + Rse", "", "", "", P.Rt],
    ["U = 1 ÷ Rt, en W/(m².K)", "", "", "", P.U]
  ] : [])
], legende);
/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans l'exemple au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const figureMC = () => BE.schema(COUPE_MC, `Coupe du mur MC du bureau d’exemple : plaque de plâtre de ${EX.MC.couches[0].e_mm} mm, polystyrène expansé de ${EX.MC.couches[1].e_mm} mm, bloc creux de ${EX.MC.couches[2].e_mm} mm, de la pièce chauffée à gauche vers le local technique non chauffé à droite.`, "Le mur MC du bureau d’exemple : trois couches, de l’intérieur vers le local technique non chauffé.");
const exempleCouches = () => BE.exemple({ text: "Mur extérieur du bureau d’exemple : R de chaque couche", answer: `${EX.MA.couches.map(c => c.R).join(" ; ")} m².K/W`, why: "Pour chaque couche : millimètres en mètres, puis e ÷ λ. R s’écrit au millième." }) + tableauResolu(EX.MA, "", false);
const exempleMur = () => BE.exemple({ text: "Mur extérieur du bureau d’exemple, couche par couche", answer: `Rt = ${EX.MA.Rt}, U = ${EX.MA.U} W/(m².K)`, why: "Même méthode : R de chaque couche, Rsi et Rse, somme, inverse." }) + tableauResolu(EX.MA);

/* Écran « À vous, le projet » : la commande du moteur, suivie du lien vers l'extrait de CCTP du dossier. */
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: ["L’extrait de CCTP de la maison s’ouvre par le lien en bas de la commande. Les trois parois de la feuille y sont décrites, couche par couche, du local chauffé vers l’autre face.", "Pour chaque couche : e en mètres, puis R = e ÷ λ, ou R donné à recopier. Pour chaque paroi : Rsi et Rse du tableau X, Rt = Rsi + somme des R + Rse, U = 1 ÷ Rt.", `Sur le mur d’exemple, la plaque de plâtre de ${EX.MA.couches[0].e_mm} mm donne e = ${EX.MA.couches[0].e_m} m, puis R = ${EX.MA.couches[0].e_m} ÷ ${EX.MA.couches[0].lambda} = ${EX.MA.couches[0].R}. Remplissez de même la première couche de P1.`],
    2: ["L’extrait de CCTP s’ouvre par le lien en bas de la commande. Chaque paroi y a son tableau de couches, la phrase du Ue est sous le plancher sur terre-plein, les menuiseries ont leur tableau.", "Repérez d’abord les parois qui se calculent couche par couche (écran « Le plancher sur terre-plein »), puis, pour chacune, les R des couches, Rsi et Rse, Rt et U. Vérifiez que vous n’avez oublié ni Rsi ni Rse.", "Sur le mur d’exemple, on liste d’abord ses couches, puis on écrit une ligne par couche. Listez les parois du CCTP avant de calculer."]
  }
});
const rendreCommande = ecranProjet.render;
ecranProjet.render = () => rendreCommande() + BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Deux pages, à imprimer en A4 portrait" }]);

BE.station({
  code: "BE-T2",
  titre: "Les parois : de la coupe au coefficient U",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Maison de deux niveaux, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Maison de deux niveaux, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Après le relevé des surfaces, un bureau d’études cherche le coefficient U de chaque paroi. Vous apprenez la méthode sur les parois d’un bureau d’exemple, puis vous la faites sur la maison à partir de son CCTP.",
  note: "Les valeurs de produit de cette station (isolant certifié, blocs creux, menuiseries) sont des valeurs d’exercice. Les valeurs des matériaux courants viennent des règles Th-Bât 2017, avec leur source.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et chaleur perdue" },
    { id: "methode", label: "La méthode", note: "sur un bureau d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, CCTP et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Coefficient U de trois parois de la maison de deux niveaux, zone H3, avant le calcul des déperditions",
      delai: "Rendu en fin de séance",
      commande: [
        "Le maître d’ouvrage fait étudier la maison de deux niveaux de la station T1. Avant tout calcul de déperditions, vous établissez le coefficient U de ses parois. Suivez les étapes dans l’ordre.",
        "Étape 1. Ouvrez l’extrait de CCTP. Pour chaque paroi de la feuille (P1, P2, P3), lisez chaque couche : épaisseur en millimètres, λ ou R donné.",
        "Étape 2. Écrivez chaque épaisseur en mètres, puis calculez la résistance R de chaque couche.",
        "Étape 3. Choisissez Rsi et Rse de chaque paroi dans le tableau X, puis calculez Rt et U.",
        "Étape 4. Au verso, recopiez le Ue du plancher sur terre-plein, le Uw des fenêtres et le Ud des portes, avec la page du CCTP. Vérifiez ensuite vos trois U à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: `Page ${EX.pages ? EX.pages.P1 : 1} : P1 mur extérieur, P2 mur sur le garage, P3 plafond sous combles. Page ${EX.pages ? EX.pages.P4 : 2} : plancher sur terre-plein avec son Ue, menuiseries avec Uw et Ud.` },
        { piece: "Tableau X des résistances superficielles", ou: "Écran « Les résistances superficielles Rsi et Rse » de cette station" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Coefficient U des parois de la maison de deux niveaux, zone H3, avant le calcul des déperditions",
      delai: "Rendu en fin de séance",
      commande: "Le maître d’ouvrage fait étudier la maison de deux niveaux de la station T1. Avant tout calcul de déperditions, établissez à partir de l’extrait de CCTP le coefficient U de chaque paroi qui se calcule couche par couche. Rendez le tableau des couches et le U de chaque paroi, avec la source de chaque donnée. Relevez aussi les valeurs que le CCTP donne directement : Ue du plancher sur terre-plein, Uw des fenêtres, Ud des portes.",
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Deux pages : les parois par lot, le plancher sur terre-plein avec son Ue, les menuiseries avec Uw et Ud." },
        { piece: "Tableau X des résistances superficielles", ou: "Écran « Les résistances superficielles Rsi et Rse » de cette station" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-p1", libelle: "U de P1, mur extérieur", unite: "W/(m².K)", min: 0.332, max: 0.346, indice: "Relisez les écrans « La résistance d’une couche » et « Quand le R est donné » : épaisseurs en mètres, R donné à recopier. Puis « La résistance totale et le coefficient U » : Rsi et Rse comprises, U est l’inverse de Rt." },
      { id: "n1-p2", libelle: "U de P2, mur sur le garage", unite: "W/(m².K)", min: 0.322, max: 0.336, indice: "Un mur sur un local non chauffé prend Rsi des deux côtés. Relisez l’écran « Les résistances superficielles Rsi et Rse », puis la somme de Rt." },
      { id: "n1-p3", libelle: "U de P3, plafond sous combles", unite: "W/(m².K)", min: 0.145, max: 0.151, indice: "Relisez l’écran « Le plafond sous comble : le flux monte » : flux montant, Rsi des deux côtés. Contrôlez aussi la conversion de l’épaisseur en mètres." }
    ],
    2: [
      { id: "n2-p1", libelle: "U de P1, mur extérieur", unite: "W/(m².K)", min: 0.332, max: 0.346, indice: "Relisez les écrans « La résistance d’une couche » et « Quand le R est donné » : épaisseurs en mètres, R donné à recopier. Puis « La résistance totale et le coefficient U » : Rsi et Rse comprises, U est l’inverse de Rt." },
      { id: "n2-p2", libelle: "U de P2, mur sur le garage", unite: "W/(m².K)", min: 0.322, max: 0.336, indice: "Un mur sur un local non chauffé prend Rsi des deux côtés. Relisez l’écran « Les résistances superficielles Rsi et Rse », puis la somme de Rt." },
      { id: "n2-p3", libelle: "U de P3, plafond sous combles", unite: "W/(m².K)", min: 0.145, max: 0.151, indice: "Relisez l’écran « Le plafond sous comble : le flux monte » : flux montant, Rsi des deux côtés. Contrôlez aussi la conversion de l’épaisseur en mètres." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T3", titre: "Déperditions d’un local par les parois", href: "../t3-deperditions-local/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Parois et écarts de température", href: "../../../aerorezo/stations/transmission/index.html", pourquoi: "Cette page explique pourquoi une paroi laisse passer la chaleur selon son U et l’écart de température." },
    { reseau: "AéroRézo", titre: "Déperditions d’une pièce", href: "../../../aerorezo/stations/deperditions-piece/index.html", pourquoi: "Cette page applique le U des parois au calcul des déperditions d’une pièce." },
    { reseau: "Bureau d’études", titre: "BE-T1, Surfaces et volumes du projet", href: "../t1-surfaces-volumes/index.html", pourquoi: "Les surfaces relevées à la station T1 se multiplient par les U calculés ici." },
    { reseau: "inerWeb BE, ligne Lire les plans", titre: "Le dossier technique", href: "../../../plan/gares/g03-dossier-technique/index.html", pourquoi: "Cette gare présente les documents d’un dossier technique, dont le CCTP." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/2-lire-le-cctp.webp", imageAlt: "Un technicien de bureau d’études lit un cahier de plusieurs pages en suivant une ligne du doigt, un surligneur orange dans l’autre main. Sur le bureau : une calculatrice, un crayon et une feuille avec un tableau vide. À l’écran : une coupe de mur faite de quatre bandes parallèles.",
      text: "Vous recevez la commande d’un bureau d’études : établir le coefficient U de chaque paroi de la maison. Vous partez de l’extrait de CCTP du dossier, qui décrit les couches de chaque paroi. Vous rendez un tableau, une ligne par couche, avec le U de la paroi en bas. Les réponses s’écrivent sur la feuille A4 recto verso. L’écran explique chaque geste, la feuille reçoit vos résultats.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Vous recevez", rows: [["La commande :", "calculer le U des parois de la maison."], ["Le dossier :", "un extrait de CCTP, avec les couches de chaque paroi aux pages 1 et 2."]] },
        { title: "Vous produisez", rows: [["Le tableau :", "une ligne par couche, avec e, λ et R."], ["Le résultat :", "Rsi, Rse, Rt et le U de chaque paroi, puis les valeurs lues au CCTP."]] },
        { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T3, les déperditions d’un local."]] }
      ])
    }),

    BE.ecran({
      id: "d-ou-vient-la-chaleur", dossier: "prise", kicker: "Prise en main, 2", title: "D’où vient la chaleur perdue", level: "comprendre",
      text: "Une paroi laisse passer d’autant plus de chaleur que sa surface est grande, que l’écart de température est fort et que son coefficient U est élevé. Le coefficient U se note en W/(m².K) : c’est la puissance qui traverse 1 m² de paroi pour 1 K d’écart entre les deux faces. Vous avez relevé les surfaces à la station T1. Cette station calcule le U de chaque paroi. La station T3 multipliera ensuite U, surface et écart de température.",
      prompt: "Lisez la formule des déperditions d’une paroi, puis continuez.",
      render: () => tableau(["Formule", "Unités"], [["Déperdition d’une paroi = U × S × ΔT", "W = W/(m².K) × m² × K"]])
        + BE.cartes([
          { title: "S, la surface", rows: [["Relevée :", "à la station T1, par paroi."]] },
          { title: "U, le coefficient", rows: [["Calculé :", "dans cette station, couche par couche."]] },
          { title: "ΔT, l’écart", rows: [["Choisi :", "à la station T3, d’après les températures de chaque côté."]] }
        ])
        + BE.renvoi('Les surfaces viennent de <a href="../t1-surfaces-volumes/index.html">la station T1</a>.')
    }),

    BE.ecran({
      id: "lire-une-composition", dossier: "methode", kicker: "La méthode, 1", title: "Lire une composition dans le CCTP", level: "comprendre",
      text: "Le CCTP, cahier des clauses techniques particulières, est la pièce du dossier qui décrit chaque ouvrage. Il décrit chaque paroi couche par couche, du local chauffé vers l’autre face : l’extérieur, ou un local non chauffé. Le doublage est l’isolant et la plaque de plâtre posés contre la face intérieure du mur. Pour chaque couche, il donne le matériau, l’épaisseur en millimètres, puis une valeur qui dit si la couche isole : la conductivité thermique λ, ou directement la résistance thermique R. Le tableau ci-dessous est un extrait de CCTP du bureau d’exemple. Les calculs se font en mètres : 100 mm s’écrivent 0,100 m.",
      prompt: "Repérez la couche d’isolant dans l’extrait, puis lisez l’exemple.",
      render: () => extraitCctp(EX.MA, "Extrait de CCTP, mur extérieur du bureau d’exemple")
        + BE.schema(COUPE_MUR, "Coupe du mur extérieur du bureau d’exemple : plaque de plâtre de 15 mm, laine de roche de 100 mm, béton plein de 160 mm, enduit de 15 mm, de l’intérieur à gauche vers l’extérieur à droite.", "Coupe du mur extérieur du bureau d’exemple : quatre couches, de l’intérieur vers l’extérieur.")
        + BE.exemple({ text: `Laine de roche, épaisseur lue au CCTP : ${EX.MA.couches[1].e_mm} mm`, answer: `e = ${EX.MA.couches[1].e_m} m`, why: "On divise les millimètres par 1 000 pour obtenir des mètres." })
    }),

    BE.ecran({
      id: "resistance-d-une-couche", dossier: "methode", kicker: "La méthode, 2", title: "La résistance d’une couche", level: "comprendre",
      text: "Chaque couche freine la chaleur. Sa résistance thermique R se calcule en divisant son épaisseur e, en mètres, par la conductivité thermique λ de son matériau : R = e ÷ λ. R se note en m².K/W, λ en W/(m.K). Plus R est grand, plus la couche freine. La conductivité des matériaux courants se lit dans les règles Th-Bât, fascicule Matériaux.",
      prompt: "Lisez l’exemple résolu et le tableau des conductivités, puis continuez.",
      render: () => BE.exemple({ text: `Plaque de plâtre de ${EX.MA.couches[0].e_mm} mm : e = ${EX.MA.couches[0].e_m} m, λ = ${EX.MA.couches[0].lambda} W/(m.K)`, answer: `R = ${EX.MA.couches[0].e_m} ÷ ${EX.MA.couches[0].lambda} = ${EX.MA.couches[0].R} m².K/W`, why: "Millimètres convertis en mètres, puis division. R s’écrit au millième." })
        + tableau(["Matériau", "Masse volumique (kg/m³)", "λ (W/(m.K))", "Source"], [
          ["Plaque de plâtre standard", "750 à 900", "0,25", "Th-Bât Matériaux, § 2.3, p. 12"],
          ["Béton plein", "2 300 à 2 600", "2,00", "Th-Bât Matériaux, § 2.2.1.1, p. 7"],
          ["Béton plein", "2 000 à 2 300", "1,65", "Th-Bât Matériaux, § 2.2.1.1, p. 7"],
          ["Mortier d’enduit de ciment", "1 800 à 2 000", "1,3", "Th-Bât Matériaux, § 2.9.2, p. 28"],
          ["Mortier d’enduit de ciment", "plus de 2 000", "1,8", "Th-Bât Matériaux, § 2.9.2, p. 28"]
        ], "Conductivités des matériaux courants")
        + BE.alerte("<strong>Piège.</strong> Une épaisseur laissée en millimètres donne un R mille fois trop grand.")
    }),

    BE.ecran({
      id: "bloc-creux", dossier: "methode", kicker: "La méthode, 3", title: "Quand le R est donné", level: "comprendre",
      image: "illustrations/1-mur-ouvert-couches.webp", imageAlt: "Coupe d’un mur extérieur ouverte par étages, de la pièce chauffée à gauche vers le jardin à droite : une plaque de plâtre, une épaisse couche d’isolant gris, un mur de blocs creux dont on voit les alvéoles, puis un enduit mince. Une ligne orange ondulée part du radiateur, traverse le mur et s’amincit dans l’isolant.",
      text: `Certaines couches n’ont pas de λ. Un bloc creux de béton contient des alvéoles d’air : sa résistance se mesure sur le bloc entier, et la fiche du fabricant donne R directement. Vous recopiez alors R dans le tableau et vous ne divisez rien. Exemple : un bloc creux de ${EX.bloc.e_cm} cm dont la fiche annonce R = ${EX.bloc.R} m².K/W. La ligne du tableau porte e = ${EX.bloc.e_m} m, R = ${EX.bloc.R}, et rien dans la colonne λ.`,
      prompt: "Lisez l’exemple résolu. Dans un CCTP, repérez ensuite la colonne « λ ou R » : un R s’y recopie.",
      render: () => BE.exemple({ text: `Bloc creux de ${EX.bloc.e_cm} cm, fiche du fabricant : R = ${EX.bloc.R} m².K/W`, answer: `R de la couche = ${EX.bloc.R} m².K/W`, why: "Le R est donné : il se recopie, sans division." })
        + tableau(["Ce que le CCTP écrit", "Ce que vous faites"], [
          ["λ 0,25", "Diviser l’épaisseur en mètres par λ : R = e ÷ λ."],
          [`R ${EX.bloc.R}`, "Recopier R dans la colonne R."]
        ])
        + BE.alerte("<strong>Limite.</strong> La valeur du bloc creux est une valeur d’exercice. Sur un vrai projet, elle vient de la fiche du fabricant.")
    }),

    BE.ecran({
      id: "certifie-ou-defaut", dossier: "methode", kicker: "La méthode, 4", title: "Valeur certifiée ou valeur par défaut", level: "comprendre",
      text: `Pour un isolant, le CCTP cite d’abord le certificat du produit (certificat ACERMI), qui donne λ. Sans certificat, les règles Th-Bât fournissent une valeur par défaut, plus élevée, donc moins favorable : vous la prenez et vous écrivez que c’est une hypothèse. Pour ${EX.MA.couches[1].e_mm} mm de laine de roche, λ = ${EX.MA.couches[1].lambda} avec certificat (valeur d’exercice) donne R = ${EX.cert.R_cert}. Sans certificat, λ = ${EX.MA_DEFAUT.couches[1].lambda} donne R = ${EX.cert.R_defaut}.`,
      prompt: "Lisez le tableau des valeurs par défaut, puis l’exemple.",
      render: () => tableau(["Isolant sans certificat", "Masse volumique (kg/m³)", "λ par défaut (W/(m.K))", "Source"], [
        ["Laine de verre", "15 à 20", "0,044", "Th-Bât Matériaux, § 1.3.1 et § 2.6, p. 17 et 18"],
        ["Laine de roche", "40 à 100", "0,042", "Th-Bât Matériaux, § 1.3.1 et § 2.6, p. 17 et 18"],
        ["Polystyrène expansé", "15 à 19", "0,044", "Th-Bât Matériaux, § 1.3.1 et § 2.6, p. 17 et 18"],
        ["Laine soufflée sur plancher de comble", "selon le procédé", "0,056", "Th-Bât Matériaux, § 1.3.1 et § 2.6, p. 17 et 18"]
      ], "Valeurs par défaut des isolants")
        + BE.exemple({ text: "Laine de roche de 100 mm : avec puis sans certificat", answer: `R = ${EX.cert.R_cert}, puis R = ${EX.cert.R_defaut}`, why: `Dans le mur extérieur du bureau d’exemple, U passe de ${EX.cert.U_cert} à ${EX.cert.U_defaut} W/(m².K) : le certificat compte.` })
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, R des couches", title: "Exercice : la résistance de chaque couche", level: "appliquer", requiresAction: true,
      text: {
        1: `Le mur du bureau d’exemple qui donne sur le local technique non chauffé (repère MC) compte trois couches, de l’intérieur vers l’extérieur : une plaque de plâtre standard de ${EX.MC.couches[0].e_mm} mm, du polystyrène expansé de ${EX.MC.couches[1].e_mm} mm sans certificat, un bloc creux de ${EX.MC.couches[2].e_cm} cm dont la fiche du fabricant donne R = ${EX.MC.couches[2].Rdonne} m².K/W. L’exemple du mur extérieur reste sous vos yeux : refaites les mêmes gestes.`,
        2: `Le mur du bureau d’exemple qui donne sur le local technique non chauffé (repère MC) compte trois couches, de l’intérieur vers l’extérieur : une plaque de plâtre standard de ${EX.MC.couches[0].e_mm} mm, du polystyrène expansé de ${EX.MC.couches[1].e_mm} mm sans certificat, un bloc creux de ${EX.MC.couches[2].e_cm} cm dont la fiche du fabricant donne R = ${EX.MC.couches[2].Rdonne} m².K/W. Calculez sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne les trois résistances, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne les trois résistances. Cette question est à faire seul." },
      aides: {
        1: ["Les épaisseurs sont dans l’énoncé. Le λ du polystyrène sans certificat se lit dans le tableau de l’écran « Valeur certifiée ou valeur par défaut ».", "R = e ÷ λ, avec e en mètres. La couche dont le R est donné se recopie sans calcul.", `Sur le mur d’exemple, la plaque de plâtre de ${EX.MA.couches[0].e_mm} mm donne e = ${EX.MA.couches[0].e_m} m, puis ${EX.MA.couches[0].e_m} ÷ ${EX.MA.couches[0].lambda} = ${EX.MA.couches[0].R}. Faites de même avec la plaque de ${EX.MC.couches[0].e_mm} mm.`],
        2: ["Relisez l’énoncé : il donne les épaisseurs en millimètres et dit quelle couche a un R donné. Le λ du polystyrène sans certificat se lit à l’écran sur les valeurs par défaut.", "Convertissez chaque épaisseur en mètres, puis divisez par λ. Une couche qui porte un R donné ne se divise pas.", `Sur un autre mur, une plaque de plâtre de ${EX.MA.couches[0].e_mm} mm donne ${EX.MA.couches[0].e_m} ÷ ${EX.MA.couches[0].lambda} = ${EX.MA.couches[0].R}. Écrivez la même division pour la plaque de ${EX.MC.couches[0].e_mm} mm.`]
      },
      ...BE.parNiveau({
        1: avecBloc(figureMC() + exempleCouches(), EX.ex1),
        2: avecBloc(figureMC(), EX.ex1)
      })
    }),

    BE.ecran({
      id: "resistances-superficielles", dossier: "methode", kicker: "La méthode, 5", title: "Les résistances superficielles Rsi et Rse", level: "comprendre",
      text: "Contre chaque face d’une paroi, une fine couche d’air immobile freine encore la chaleur : c’est la résistance superficielle. Rsi est celle de la face intérieure, Rse celle de la face extérieure. Leurs valeurs se lisent dans le tableau X des règles Th-Bât, fascicule Parois opaques, § 3.1.1.3, p. 14. Elles dépendent du sens du flux de chaleur. Si la paroi donne sur un local non chauffé, on prend Rsi des deux côtés (note 2 du tableau).",
      prompt: "Lisez le tableau X, puis la coupe avec ses deux couches d’air.",
      render: () => tableau(["Paroi", "Sens du flux", "Rsi", "Rse"], [
        ["Mur, paroi verticale, sur l’extérieur", "horizontal", "0,13", "0,04"],
        ["Plafond ou toiture, sur l’extérieur", "montant", "0,10", "0,04"],
        ["Plancher, sur l’extérieur ou un passage ouvert", "descendant", "0,17", "0,04"],
        ["Paroi sur un local non chauffé", "selon la paroi", "Rsi", "Rsi"]
      ], "Tableau X, Th-Bât Parois opaques, § 3.1.1.3, p. 14 (m².K/W)")
        + BE.schema(COUPE_SURF, "Coupe du mur extérieur du bureau d’exemple avec ses deux couches d’air : Rsi côté intérieur, à gauche, Rse côté extérieur, à droite, de part et d’autre des quatre couches.", "Le mur du bureau d’exemple avec Rsi et Rse, les deux couches d’air qu’on ne voit pas.")
        + BE.exemple({ text: "Mur extérieur du bureau d’exemple, flux horizontal vers l’extérieur", answer: "Rsi = 0,13 et Rse = 0,04", why: "Mur vertical sur l’extérieur : première ligne du tableau X." })
    }),

    BE.ecran({
      id: "resistance-totale-et-u", dossier: "methode", kicker: "La méthode, 6", title: "La résistance totale et le coefficient U", level: "comprendre",
      text: `La résistance totale Rt d’une paroi est la somme de Rsi, des résistances de ses couches et de Rse. Le coefficient U est l’inverse de Rt : U = 1 ÷ Rt. R se calcule au millième, U s’arrondit au centième. Pour le mur extérieur du bureau d’exemple : Rt = ${EX.MA.Rsi} + ${EX.MA.couches.map(c => c.R).join(" + ")} + ${EX.MA.Rse} = ${EX.MA.Rt} m².K/W. Donc U = 1 ÷ ${EX.MA.Rt} = ${EX.MA.U} W/(m².K).`,
      prompt: "Lisez le tableau résolu : une ligne par couche, Rsi et Rse comprises.",
      render: () => tableauResolu(EX.MA, "Mur extérieur du bureau d’exemple, résolu")
        + BE.alerte(`<strong>Piège.</strong> Rsi et Rse oubliées : U passe de ${EX.MA.U} à ${EX.sansSurf.U} W/(m².K).`)
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, U du mur MC", title: "Exercice : le U d’un mur sur local non chauffé", level: "appliquer", requiresAction: true,
      text: {
        1: `Reprenez le mur MC du bureau d’exemple, sur le local technique non chauffé. Les résistances de ses trois couches sont ${EX.MC.couches.map(c => c.R).join(", ")} m².K/W, de l’intérieur vers l’extérieur. Il reste à choisir Rsi et Rse, puis à calculer Rt et U. L’exemple du mur extérieur reste sous vos yeux.`,
        2: `Reprenez le mur MC du bureau d’exemple, sur le local technique non chauffé. Les résistances de ses trois couches sont ${EX.MC.couches.map(c => c.R).join(", ")} m².K/W, de l’intérieur vers l’extérieur. Calculez son coefficient U sans l’exemple.`
      },
      prompt: { 1: "Choisissez le U du mur MC, en vous aidant de l’exemple.", 2: "Choisissez le U du mur MC. Cette question est à faire seul." },
      aides: {
        1: ["Rsi et Rse se lisent dans le tableau X, à l’écran « Les résistances superficielles Rsi et Rse ». La note 2 traite le local non chauffé.", "Rt = Rsi + somme des R + Rse, puis U = 1 ÷ Rt. Sur un local non chauffé, Rsi s’applique des deux côtés.", `Sur le mur extérieur d’exemple, Rt = ${EX.MA.Rsi} + ${EX.MA.somme} + ${EX.MA.Rse}. Écrivez la somme équivalente pour MC, en choisissant Rsi et Rse.`],
        2: ["Le tableau X donne Rsi et Rse. L’énoncé dit de quel côté se trouve le local non chauffé.", "Additionnez Rsi, les trois R et Rse, puis prenez l’inverse. Sur un local non chauffé, Rsi s’applique des deux côtés.", `Sur le mur extérieur d’exemple, Rt s’écrit ${EX.MA.Rsi} + ${EX.MA.somme} + ${EX.MA.Rse}. Écrivez la somme équivalente pour MC.`]
      },
      ...BE.parNiveau({
        1: avecBloc(figureMC() + exempleMur(), EX.ex2),
        2: avecBloc(figureMC(), EX.ex2)
      })
    }),

    BE.ecran({
      id: "plafond-sous-comble", dossier: "methode", kicker: "La méthode, 7", title: "Le plafond sous comble : le flux monte", level: "comprendre",
      image: "illustrations/3-laine-dans-les-combles.webp", imageAlt: "Coupe d’une maison sous toiture : une épaisse couche d’isolant soufflé couvre le sol des combles, avec un piquet de repérage planté dedans, la charpente en bois au-dessus. Sous le plafond, une chambre avec un lit. Des lignes orange ondulées montent de la chambre et s’éteignent dans l’isolant.",
      text: `Dans un plafond sous combles, la chaleur monte : le flux est ascendant et Rsi vaut 0,10. Des combles perdus ne sont pas chauffés : le plafond donne sur un local non chauffé, donc Rsi s’applique aussi côté combles. Le plafond du bureau d’exemple, ici dans un bâtiment d’un seul niveau, compte une plaque de plâtre de ${EX.PL.couches[0].e_mm} mm et ${EX.PL.couches[1].e_mm} mm de laine soufflée sans certificat, λ = ${EX.PL.couches[1].lambda} par défaut. Rt = ${EX.PL.Rsi} + ${EX.PL.couches.map(c => c.R).join(" + ")} + ${EX.PL.Rse} = ${EX.PL.Rt}, donc U = ${EX.PL.U} W/(m².K).`,
      prompt: "Lisez la coupe et l’exemple résolu, puis continuez.",
      render: () => BE.schema(COUPE_PLAFOND, "Coupe du plafond du bureau d’exemple : pièce chauffée en bas, plaque de plâtre de 15 mm, laine soufflée de 250 mm, combles perdus en haut, avec Rsi de chaque côté et le flux montant.", "Le plafond du bureau d’exemple sous des combles perdus : flux montant, Rsi des deux côtés.")
        + BE.exemple({ text: `Plafond du bureau : ${EX.PL.Rsi} + ${EX.PL.couches[0].e_m} ÷ ${EX.PL.couches[0].lambda} + ${EX.PL.couches[1].e_m} ÷ ${EX.PL.couches[1].lambda} + ${EX.PL.Rse}`, answer: `Rt = ${EX.PL.Rt} m².K/W, U = ${EX.PL.U} W/(m².K)`, why: "Flux montant, donc Rsi 0,10 ; combles non chauffés, donc Rsi des deux côtés ; laine soufflée à la valeur par défaut de 0,056." })
        + BE.renvoi("L’écart de température entre la pièce et les combles se traite à la station T3. Ici, vous calculez seulement U.")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, Rsi et Rse", title: "Exercice : choisir Rsi et Rse", level: "appliquer", requiresAction: true,
      text: {
        1: "Pour chaque paroi, choisissez le couple Rsi et Rse à utiliser. La première valeur est Rsi, côté pièce chauffée. La seconde est Rse, côté extérieur ou côté local non chauffé. Un exemple résolu est donné en tête de liste.",
        2: "Pour chaque paroi, choisissez le couple Rsi et Rse à utiliser. La première valeur est Rsi, côté pièce chauffée. La seconde est Rse, côté extérieur ou côté local non chauffé."
      },
      prompt: { 1: "Classez chaque paroi, en vous aidant de l’exemple.", 2: "Classez chaque paroi. Cette question est à faire seul." },
      aides: {
        1: ["L’écran « Les résistances superficielles Rsi et Rse » donne le tableau X et la note sur le local non chauffé.", "Cherchez d’abord le sens du flux de chaleur, puis ce qui se trouve de l’autre côté : l’extérieur ou un local non chauffé.", "Sur un autre cas, une toiture-terrasse sur l’extérieur a un flux montant : Rsi 0,10 et Rse 0,04. Faites de même pour chaque ligne."],
        2: ["Le tableau X et sa note 2 sont à l’écran sur les résistances superficielles.", "Pour chaque paroi, dites le sens du flux, puis ce qui se trouve de l’autre côté. Un local non chauffé donne Rsi des deux côtés.", "Sur un autre cas, une toiture-terrasse sur l’extérieur a un flux montant : Rsi 0,10 et Rse 0,04. Faites de même pour la première ligne."]
      },
      ...BE.parNiveau({
        1: BE.tri(EX.tri.lignes, EX.tri.labels, EX.tri.exemple),
        2: BE.tri(EX.tri.lignes, EX.tri.labels)
      })
    }),

    BE.ecran({
      id: "terre-plein", dossier: "methode", kicker: "La méthode, 8", title: "Le plancher sur terre-plein : le sol isole aussi", level: "comprendre",
      text: "Un plancher posé sur le sol n’a pas le U d’un plancher ordinaire : le sol sous le bâtiment ajoute sa propre résistance, et la forme du plancher compte, par sa surface et son périmètre. Les règles Th-Bât en tirent un coefficient équivalent, noté Ue. Le CCTP donne ce Ue : vous le recopiez avec sa page, vous ne le calculez pas. Un U calculé couche par couche, sans le sol, serait plus grand que Ue.",
      prompt: "Lisez le tableau, puis continuez.",
      render: () => tableau(["Ce que le CCTP donne", "Ce que vous faites"], [
        ["La composition du plancher bas (chape, isolant, dallage)", "La lire. Le plancher n’entre pas dans le calcul couche par couche."],
        ["La phrase qui donne Ue", "Recopier Ue sur la feuille, avec la page du CCTP."]
      ]) + BE.renvoi("Méthode complète : règles Th-Bât, fascicule Parois opaques, § 3.1.2.2. Elle est citée ici, vous ne la calculez pas.")
    }),

    BE.ecran({
      id: "menuiseries", dossier: "methode", kicker: "La méthode, 9", title: "Les menuiseries : Uw et Ud se lisent", level: "comprendre",
      image: "illustrations/4-etiquette-fenetre.webp", imageAlt: "Une fenêtre en PVC à deux vantaux, double vitrage, posée sur un tréteau avant sa pose. Au coin du cadre, une petite découpe montre les deux vitres, la lame d’air entre elles et les chambres creuses du profil. Une étiquette orange est collée sur la vitre. Un mètre ruban est posé sur l’établi.",
      text: "Pour une fenêtre, le CCTP donne un coefficient Uw, celui de la fenêtre entière, cadre compris. Pour une porte, il donne Ud. Vous les recopiez, avec leur page. Le coefficient Ug ne concerne que le vitrage seul : la déperdition d’une fenêtre se calcule avec Uw. Ces valeurs viennent du certificat ou de la fiche du fabricant ; dans la maison, ce sont des valeurs d’exercice.",
      prompt: "Pour calculer la déperdition d’une fenêtre, quel coefficient recopiez-vous du CCTP ?",
      aides: [
        "Le CCTP présente les menuiseries dans un tableau à part, avec une colonne « Coefficient ».",
        "Uw se rapporte à la fenêtre entière, Ug au vitrage seul, Ud à une porte, Ue à un plancher sur le sol.",
        "Une fenêtre neuve porte une étiquette qui donne Ug et Uw. Le coefficient de la fenêtre entière est celui qui porte la lettre w."
      ],
      ...BE.quiz({ choices: ["Ug", "Uw", "Ud", "Ue"], good: 1, explain: "Uw est le coefficient de la fenêtre entière, cadre compris. Ug ne concerne que le vitrage, Ud une porte, Ue un plancher sur le sol." })
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

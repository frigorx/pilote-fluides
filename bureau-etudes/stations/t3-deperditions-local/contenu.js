/* Station BE-T3 : Déperditions d'un local par les parois.
   Méthode sur le bureau d'exemple des stations T1 et T2 (qui n'est pas une pièce de la maison), puis commande sur la maison.
   Les valeurs du bureau d'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/t3-deperditions-local/construire.mjs : le premier vient de exemple-data.mjs, les secondes de corrige-deperditions.json (tolérance 3 %).
   Aucune valeur de la maison n'est écrite dans cette station : seules les bornes des fourchettes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";
const SCHEMA = "illustrations/schema-local-non-chauffe.svg";

/*EXEMPLE-DEBUT*/
const EX = {
 "T": {
  "ti": "19",
  "te": "−7",
  "dT": "26",
  "faux": "12"
 },
 "S": {
  "MA": "13,47",
  "MAbrute": "15,08",
  "Fa": "1,61",
  "MB": "8,58",
  "MC": "6,69",
  "hab": "19,14"
 },
 "U": {
  "MA": "0,31",
  "MC": "0,54",
  "PL": "0,21",
  "Uw": "1,6",
  "Ud": "1,8",
  "Ue": "0,36"
 },
 "exm": {
  "MB": {
   "UA": "2,66",
   "phi": "69"
  },
  "FEN": {
   "l": "0,90",
   "h": "1,20",
   "A": "1,08",
   "UA": "1,73",
   "phi": "45"
  }
 },
 "ex1": {
  "choices": [
   "Mur MA : 121 W ; fenêtre Fa : 67 W",
   "Mur MA : 109 W ; fenêtre Fa : 67 W",
   "Mur MA : 50 W ; fenêtre Fa : 31 W",
   "Mur MA : 109 W ; fenêtre Fa : 13 W"
  ],
  "good": 1,
  "explain": "Mur MA : 0,31 × 13,47 = 4,18 W/K, puis 4,18 × 26 = 109 W. Fenêtre Fa : 1,6 × 1,61 = 2,58 W/K, puis 2,58 × 26 = 67 W. A compte le mur en surface brute (15,08 m²), C prend un écart de 12 K parce que θe est additionnée au lieu d’être retranchée, D calcule la fenêtre avec le U du mur au lieu de Uw."
 },
 "ex2": {
  "choices": [
   "0,90",
   "0,85",
   "1,00",
   "0,95"
  ],
  "good": 1,
  "explain": "Aiu ÷ Aue = 18,00 ÷ 7,50 = 2,40 : ligne « 2,00 < … ≤ 2,50 ». Un parking privé a Uv,ue = 3 au tableau VI. Aiu isolée et Aue non isolée : tableau II, colonne 3,0, soit 0,85. 0,90 lit la colonne 9,00, 1,00 traite le parking comme l’extérieur, 0,95 divise Aue par Aiu au lieu de Aiu par Aue."
 },
 "tri": {
  "labels": [
   "Tableau II",
   "Tableau III",
   "Tableau IV",
   "Tableau V"
  ],
  "exemple": {
   "text": "Local de stockage dont toutes les parois, vers les locaux chauffés et vers l’extérieur, sont isolées",
   "good": 3,
   "why": "Aiu isolée et Aue isolée : tableau V, p. 22."
  },
  "lignes": [
   {
    "text": "Garage dont le mur vers la maison est isolé et dont les parois vers l’extérieur ne le sont pas",
    "good": 0,
    "why": "Aiu isolée, Aue non isolée : tableau II, p. 19.",
    "bad": "Cherchez d’abord si les parois côté volume chauffé sont isolées, puis si celles côté extérieur le sont."
   },
   {
    "text": "Cellier dont aucune paroi n’est isolée",
    "good": 1,
    "why": "Aiu non isolée, Aue non isolée : tableau III, p. 20.",
    "bad": "Cherchez d’abord si les parois côté volume chauffé sont isolées, puis si celles côté extérieur le sont."
   },
   {
    "text": "Local technique dont les parois vers l’extérieur sont isolées et dont le mur vers le bureau ne l’est pas",
    "good": 2,
    "why": "Aiu non isolée, Aue isolée : tableau IV, p. 21.",
    "bad": "Cherchez d’abord si les parois côté volume chauffé sont isolées, puis si celles côté extérieur le sont."
   },
   {
    "text": "Véranda accolée à un salon dont le mur est isolé",
    "good": 0,
    "why": "La surface Aue d’une véranda est toujours considérée comme non isolée, donc Aiu isolée et Aue non isolée : tableau II, p. 19.",
    "bad": "Une règle des tableaux II à V traite les vérandas : relisez-la à l’écran « Lire b dans le tableau »."
   }
  ]
 },
 "lt": {
  "Aiu": "8,58",
  "Aue": "5,72",
  "ratio": "1,50",
  "tableau": "II",
  "ligne": "1,25 < … ≤ 2,00",
  "uv": "3",
  "b": "0,90"
 },
 "com": {
  "Aiu": "40,00",
  "Aue": "48,0",
  "Ao": "0,25",
  "Ac": "42,0",
  "aoac": "0,006",
  "uv": "9",
  "ratio": "0,83",
  "tableau": "II",
  "ligne": "0,75 < … ≤ 1,00",
  "b": "0,95"
 },
 "pk": {
  "Aiu": "18,00",
  "Aue": "7,50",
  "ratio": "2,40",
  "ligne": "2,00 < … ≤ 2,50",
  "uv": "3",
  "b": "0,85"
 },
 "mc": {
  "UAb": "3,25"
 },
 "lignes": [
  {
   "nom": "MA, mur nord (extérieur)",
   "A": "13,47",
   "coef": "U de MA",
   "U": "0,31",
   "b": "1,00",
   "UAb": "4,18"
  },
  {
   "nom": "Fa, fenêtre nord",
   "A": "1,61",
   "coef": "Uw",
   "U": "1,6",
   "b": "1,00",
   "UAb": "2,58"
  },
  {
   "nom": "MB, mur est (extérieur)",
   "A": "8,58",
   "coef": "U de MA",
   "U": "0,31",
   "b": "1,00",
   "UAb": "2,66"
  },
  {
   "nom": "MC, mur ouest sur le local technique",
   "A": "6,69",
   "coef": "U de MC",
   "U": "0,54",
   "b": "0,90",
   "UAb": "3,25"
  },
  {
   "nom": "Pn, porte vers le local technique",
   "A": "1,89",
   "coef": "Ud",
   "U": "1,8",
   "b": "0,90",
   "UAb": "3,06"
  },
  {
   "nom": "Plancher bas sur terre-plein",
   "A": "19,14",
   "coef": "Ue",
   "U": "0,36",
   "b": "1,00",
   "UAb": "6,89"
  },
  {
   "nom": "Plafond sous comble",
   "A": "19,14",
   "coef": "U de PL",
   "U": "0,21",
   "b": "0,95",
   "UAb": "3,82"
  }
 ],
 "H": "26,44",
 "phi": "687",
 "ratio": "35,9",
 "sansPlancher": "508",
 "ecartPlancher": "179",
 "tabII": [
  [
   "≤ 0,25",
   "0,95",
   "0,95",
   "1,00",
   "1,00",
   "1,00",
   "1,00"
  ],
  [
   "0,25 < … ≤ 0,50",
   "0,95",
   "0,95",
   "0,95",
   "0,95",
   "1,00",
   "1,00"
  ],
  [
   "0,50 < … ≤ 0,75",
   "0,90",
   "0,95",
   "0,95",
   "0,95",
   "0,95",
   "1,00"
  ],
  [
   "0,75 < … ≤ 1,00",
   "0,85",
   "0,90",
   "0,90",
   "0,95",
   "0,95",
   "0,95"
  ],
  [
   "1,00 < … ≤ 1,25",
   "0,85",
   "0,90",
   "0,90",
   "0,90",
   "0,95",
   "0,95"
  ],
  [
   "1,25 < … ≤ 2,00",
   "0,80",
   "0,80",
   "0,85",
   "0,90",
   "0,90",
   "0,95"
  ],
  [
   "2,00 < … ≤ 2,50",
   "0,75",
   "0,80",
   "0,80",
   "0,85",
   "0,90",
   "0,90"
  ],
  [
   "2,50 < … ≤ 3,00",
   "0,70",
   "0,75",
   "0,80",
   "0,85",
   "0,90",
   "0,90"
  ],
  [
   "3,00 < … ≤ 3,50",
   "0,65",
   "0,75",
   "0,75",
   "0,80",
   "0,85",
   "0,90"
  ],
  [
   "3,50 < … ≤ 4,00",
   "0,65",
   "0,70",
   "0,75",
   "0,80",
   "0,85",
   "0,90"
  ],
  [
   "4,00 < … ≤ 6,00",
   "0,55",
   "0,60",
   "0,65",
   "0,70",
   "0,80",
   "0,85"
  ],
  [
   "6,00 < … ≤ 8,00",
   "0,45",
   "0,55",
   "0,60",
   "0,65",
   "0,75",
   "0,80"
  ],
  [
   "8,00 < … ≤ 10,0",
   "0,40",
   "0,50",
   "0,50",
   "0,60",
   "0,70",
   "0,75"
  ],
  [
   "10,0 < … ≤ 25,0",
   "0,35",
   "0,40",
   "0,45",
   "0,50",
   "0,60",
   "0,70"
  ],
  [
   "25,0 < … ≤ 50,0",
   "0,20",
   "0,25",
   "0,30",
   "0,35",
   "0,45",
   "0,50"
  ],
  [
   "50,0 <",
   "0,10",
   "0,15",
   "0,15",
   "0,20",
   "0,25",
   "0,30"
  ]
 ],
 "pages": {
  "P4": 2,
  "menuiseries": 2,
  "conditions": 3
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec les exemples résolus sous les yeux au niveau 1, sans eux au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exemplesParoi = () => BE.exemple({ text: `Mur MB du bureau d’exemple : U = ${EX.U.MA}, A = ${EX.S.MB} m², ΔT = ${EX.T.dT} K`, answer: `U × A = ${EX.exm.MB.UA} W/K ; Φ = ${EX.exm.MB.UA} × ${EX.T.dT} = ${EX.exm.MB.phi} W`, why: "Le mur MB n’a pas de baie : sa surface nette est sa surface brute. U × A s’écrit au centième de W/K, Φ au watt." })
  + BE.exemple({ text: `Fenêtre de ${EX.exm.FEN.l} m sur ${EX.exm.FEN.h} m, de même type que Fa : Uw = ${EX.U.Uw} W/(m².K), A = ${EX.exm.FEN.A} m²`, answer: `U × A = ${EX.exm.FEN.UA} W/K ; Φ = ${EX.exm.FEN.UA} × ${EX.T.dT} = ${EX.exm.FEN.phi} W`, why: "La baie se calcule à part, avec la surface de son ouverture et son propre coefficient." });
const exempleLocalTechnique = () => BE.exemple({ text: `Local technique du bureau d’exemple : Aiu = ${EX.lt.Aiu} m², Aue = ${EX.lt.Aue} m², tertiaire, autres dépendances`, answer: `Tableau ${EX.lt.tableau}, Uv,ue = ${EX.lt.uv}, Aiu ÷ Aue = ${EX.lt.ratio}, ligne « ${EX.lt.ligne} », b = ${EX.lt.b}`, why: `Aiu isolée et Aue non isolée : tableau ${EX.lt.tableau}. Autres dépendances : Uv,ue = ${EX.lt.uv} au tableau VI. Dans le tableau ${EX.lt.tableau}, la ligne « ${EX.lt.ligne} » et la colonne ${EX.lt.uv === 3 ? "3,0" : EX.lt.uv} donnent ${EX.lt.b}.` });

/* Écran « À vous, le projet » : la commande du moteur, suivie du lien vers l'extrait de CCTP du dossier. */
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `La page ${EX.pages.conditions} de l’extrait de CCTP donne θi, θe et, pour le garage, Aue, l’isolation et le type de local. Aiu se lit sur votre relevé de la station T1 : surface brute de tous les murs de la maison qui donnent sur le garage, pas seulement ceux du séjour.`,
      "Φ = H × ΔT, avec H somme des U × A × b. Le b du garage se lit dans le tableau choisi d’après l’isolation (écran « Lire b dans le tableau »), avec Uv,ue du tableau VI et Aiu ÷ Aue. Un mur sur l’extérieur ou le sol prend b = 1.",
      `Sur le local technique d’exemple, Aiu ÷ Aue = ${EX.lt.Aiu} ÷ ${EX.lt.Aue} = ${EX.lt.ratio} : tableau ${EX.lt.tableau}, ligne « ${EX.lt.ligne} », colonne 3,0. Écrivez la même division pour le garage.`
    ],
    2: [
      `La page ${EX.pages.conditions} de l’extrait de CCTP donne θi, θe et, pour le garage et le comble, Aue, l’isolation, le type de local et la ventilation du comble. Aiu se lit sur votre relevé de la station T1, pour toute la maison. Uw, Ud et Ue sont à la page ${EX.pages.menuiseries}.`,
      "Listez d’abord les parois et les baies de chaque pièce, sans oublier le plancher bas ni le plafond. Le b du garage et celui du comble se lisent avec le même geste : tableau, Uv,ue, Aiu ÷ Aue. Pour le comble, Ao ÷ Ac donne Uv,ue.",
      `Sur le comble d’exemple, Ao ÷ Ac = ${EX.com.Ao} ÷ ${EX.com.Ac} = ${EX.com.aoac} : fortement ventilé, Uv,ue = ${EX.com.uv}. Écrivez le même calcul avec les données du comble de la maison.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensCctp = () => BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: `Trois pages : parois et menuiseries aux pages 1 et 2, températures et locaux non chauffés à la page ${EX.pages.conditions}` }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensCctp(); };

BE.station({
  code: "BE-T3",
  titre: "Déperditions d’un local par les parois",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Séjour-cuisine de la maison, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Entrée et chambre 1 de la maison, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Après les surfaces et les coefficients U, un bureau d’études calcule ce que chaque pièce perd par ses parois. Vous apprenez la méthode sur un bureau d’exemple, puis vous la faites sur des pièces de la maison à partir de vos résultats et du CCTP.",
  note: "Les températures de calcul, les valeurs de produit du bureau d’exemple et les surfaces des locaux non chauffés sont des valeurs d’exercice. Les coefficients b et Uv,ue viennent des règles Th-Bât 2017, fascicule Généralités, avec leur source.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bureau d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, CCTP et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Déperditions du séjour-cuisine de la maison de deux niveaux, zone H3, par ses parois",
      delai: "Rendu en fin de séance",
      commande: [
        "Le maître d’ouvrage fait étudier la maison de deux niveaux des stations T1 et T2. Vous avez les surfaces de chaque paroi et le coefficient U de chacune. Vous calculez maintenant ce que le séjour-cuisine perd par ses parois. Suivez les étapes dans l’ordre.",
        `Étape 1. Ouvrez la page ${EX.pages.conditions} du CCTP : relevez θi et θe, puis calculez ΔT.`,
        "Étape 2. Au recto de la feuille, chaque ligne porte un repère et son coefficient. Écrivez A (votre relevé de la station T1), U (votre station T2 ou le CCTP) et b.",
        `Étape 3. Au verso, établissez b du garage : Aiu de votre relevé de la station T1 (tous les murs de la maison sur le garage), Aue de la page ${EX.pages.conditions} du CCTP, le tableau, Uv,ue, puis b. Reportez-le sur les lignes qui donnent sur le garage.`,
        "Étape 4. Calculez chaque U × A × b, puis H, Φ et le ratio en W par m². Vérifiez Φ à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Vos résultats des stations T1 et T2", ou: "Vos feuilles : surfaces nettes, surfaces des baies, surface brute des murs sur le garage, surface habitable, coefficients U" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: `Page ${EX.pages.conditions} : températures, garage. Page ${EX.pages.menuiseries} : Uw, Ud et Ue.` },
        { piece: "Tableaux II et VI des règles Th-Bât", ou: "Écran « Lire b dans le tableau » de cette station" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Déperditions de l’entrée et de la chambre 1 de la maison de deux niveaux, zone H3, par leurs parois",
      delai: "Rendu en fin de séance",
      commande: `Le maître d’ouvrage fait étudier la maison de deux niveaux des stations T1 et T2. À partir de vos surfaces, de vos coefficients U et de l’extrait de CCTP, établissez les déperditions de l’entrée et de la chambre 1 par leurs parois. Rendez, pour chaque pièce, le tableau d’une ligne par paroi et par baie, le b du garage et celui du comble avec leur justification, H, Φ et le ratio en W par m², avec la source de chaque donnée. Les températures de calcul et les locaux non chauffés sont à la page ${EX.pages.conditions} du CCTP.`,
      pieces: [
        { piece: "Vos résultats des stations T1 et T2", ou: "Vos feuilles de relevé et de coefficients U" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: `Trois pages : parois et menuiseries (pages 1 et 2), températures et locaux non chauffés (page ${EX.pages.conditions}).` },
        { piece: "Tableaux II et VI des règles Th-Bât", ou: "Écran « Lire b dans le tableau » de cette station" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-sej", libelle: "Φ du séjour-cuisine par ses parois", unite: "W", min: 964, max: 1024, indice: "Relisez l’écran « Le tableau des déperditions d’une pièce » : une ligne par paroi et par baie, plancher bas compris, mur en surface nette. Contrôlez ΔT à l’écran « L’écart de température », puis le b du garage à l’écran « Lire b dans le tableau »." }
    ],
    2: [
      { id: "n2-ent", libelle: "Φ de l’entrée par ses parois", unite: "W", min: 337, max: 359, indice: "Relisez l’écran « Le tableau des déperditions d’une pièce » : chaque porte et le plancher bas ont leur ligne. Les parois sur le garage prennent le b du garage (écran « Lire b dans le tableau »). Contrôlez ΔT à l’écran « L’écart de température »." },
      { id: "n2-ch1", libelle: "Φ de la chambre 1 par ses parois", unite: "W", min: 256, max: 272, indice: "Relisez l’écran « Le comble : fortement, faiblement ou très faiblement ventilé » : Ao ÷ Ac donne Uv,ue, puis b du comble pour la ligne du plafond. Contrôlez les baies retirées des murs et ΔT." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T4", titre: "Déperditions par l’air : renouvellement et infiltrations", href: "../t4-deperditions-air/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Déperditions d’une pièce", href: "../../../aerorezo/stations/deperditions-piece/index.html", pourquoi: "Vous y trouvez le calcul des déperditions d’une pièce, que vous appliquez ici aux pièces d’une maison." },
    { reseau: "AéroRézo", titre: "Parois et écarts de température", href: "../../../aerorezo/stations/transmission/index.html", pourquoi: "Cette page explique pourquoi une paroi laisse passer la chaleur selon son U et l’écart de température." },
    { reseau: "Bureau d’études", titre: "BE-T2, Les parois : de la coupe au coefficient U", href: "../t2-parois-coefficient-u/index.html", pourquoi: "Les coefficients U, Uw, Ud et Ue que vous multipliez ici se calculent ou se lisent à cette station." },
    { reseau: "Bureau d’études", titre: "BE-T4, Déperditions par l’air", href: "../t4-deperditions-air/index.html", pourquoi: "Cette station ajoute le renouvellement d’air aux déperditions des parois." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/3-tableau-des-deperditions.webp", imageAlt: "Un technicien de bureau d’études, de trois quarts, est assis à son bureau et tient un crayon au-dessus d’une feuille quadrillée vide. À sa droite, une calculatrice et un petit plan imprimé d’une maison dont une seule pièce est coloriée en orange. Derrière lui, un écran affiche le même plan, en traits simples.",
      text: "Vous recevez la commande d’un bureau d’études : calculer ce que chaque pièce de la maison perd par ses parois. Vous reprenez vos résultats des stations T1 (les surfaces) et T2 (les coefficients U), et vous y ajoutez les températures de calcul et les locaux non chauffés. Vous rendez, pour chaque pièce, un tableau d’une ligne par paroi et par baie. H, la somme des lignes, se note en W/K. Φ, la puissance perdue, se note en W. Les réponses s’écrivent sur la feuille A4 recto verso. L’écran explique chaque geste, la feuille reçoit vos résultats.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Paroi ou baie", "A (m²)", "U", "b", "U × A × b (W/K)"], [
        ["Une ligne par paroi et par baie", "", "", "", ""],
        ["…", "", "", "", ""],
        ["H, somme des lignes (W/K)", "", "", "", ""],
        ["ΔT = θi − θe (K)", "", "", "", ""],
        ["Φ = H × ΔT (W)", "", "", "", ""]
      ], "Le tableau d’une pièce, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "calculer les déperditions d’une ou de deux pièces par leurs parois."], ["Le dossier :", "vos résultats de T1 et T2, et la page 3 du CCTP pour les températures et les locaux non chauffés."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "une ligne par paroi et par baie, avec A, U, b et U × A × b."], ["Le résultat :", "H, Φ et les W par m². À l’écran Vérifier, Φ doit tomber dans une fourchette de ± 3 %."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T4, les déperditions par l’air."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Un tableau de déperditions rassemble des données de plusieurs origines. Les surfaces viennent de votre relevé de la station T1. Les coefficients U viennent de vos calculs de la station T2, ou du CCTP quand il les donne directement : Uw, Ud et Ue. Les températures de calcul (θi à l’intérieur, θe à l’extérieur) et les locaux non chauffés viennent de la page 3 du CCTP. Vous reprenez donc vos propres résultats : une erreur de T1 ou de T2 se retrouve dans les déperditions. Vérifiez-les d’abord à la fourchette de chaque station.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "D’où elle vient", "Où la lire"], [
        ["Surface nette d’un mur, surface d’une baie, surface habitable", "Votre relevé", "Station T1, votre feuille"],
        ["Aiu d’un local non chauffé", "Votre relevé", "Station T1 : surface brute des murs sur le local non chauffé, ou surface du plafond sous comble"],
        ["U d’une paroi opaque", "Votre calcul", "Station T2, votre feuille"],
        ["Uw, Ud, Ue", "Le CCTP", `Page ${EX.pages.menuiseries} de l’extrait de CCTP`],
        ["θi et θe", "Le CCTP", `Page ${EX.pages.conditions}, valeurs d’exercice`],
        ["Aue, isolation, type et ventilation d’un local non chauffé", "Le CCTP", `Page ${EX.pages.conditions}`],
        ["b et Uv,ue", "Les règles Th-Bât", "Tableaux II à VI, écran « Lire b dans le tableau »"]
      ], "Les données d’un tableau de déperditions")
        + BE.renvoi('Les surfaces viennent de <a href="../t1-surfaces-volumes/index.html">la station T1</a>, les coefficients U de <a href="../t2-parois-coefficient-u/index.html">la station T2</a>.')
    }),

    BE.ecran({
      id: "ecart-de-temperature", dossier: "methode", kicker: "La méthode, 1", title: "L’écart de température ΔT", level: "comprendre",
      text: "Une paroi laisse passer la chaleur parce que ses deux faces n’ont pas la même température. L’écart de température ΔT est la température intérieure θi moins la température extérieure θe, en kelvins : un écart de 1 K vaut un écart de 1 °C. θe est la température extérieure de base, la température froide retenue pour le lieu avec laquelle on calcule. Elle peut être négative : on retranche alors un nombre négatif. Pour la maison, les deux températures se lisent au CCTP, page 3 ; ce sont des valeurs d’exercice. L’exemple qui suit est celui du bureau d’exemple, avec 19 °C et −7 °C.",
      prompt: "Lisez l’exemple résolu et le piège, puis continuez.",
      render: () => BE.exemple({ text: `Bureau d’exemple : θi = ${EX.T.ti} °C et θe = ${EX.T.te} °C, valeurs d’exercice`, answer: `ΔT = ${EX.T.ti} − (${EX.T.te}) = ${EX.T.dT} K`, why: "Retrancher −7 revient à ajouter 7. Le résultat s’écrit en kelvins." })
        + BE.alerte(`<strong>Piège.</strong> Écrire ${EX.T.ti} − 7 donne ${EX.T.faux} K au lieu de ${EX.T.dT} K : toute la déperdition en est réduite d’autant.`)
    }),

    BE.ecran({
      id: "deperdition-paroi-exterieure", dossier: "methode", kicker: "La méthode, 2", title: "La déperdition d’une paroi sur l’extérieur", level: "comprendre",
      text: "La déperdition Φ d’une paroi sur l’extérieur se calcule par Φ = U × A × ΔT. U se note en W/(m².K), A en m², ΔT en K, donc Φ en W. Pour un mur, A est la surface nette : la surface brute moins les baies, relevée à la station T1. Une baie est une ouverture dans un mur : fenêtre, porte-fenêtre ou porte. Chaque baie se calcule à part, avec la surface de son ouverture et son propre coefficient : Uw pour une fenêtre, Ud pour une porte, lus au CCTP.",
      prompt: "Lisez les deux exemples résolus, puis continuez.",
      render: () => tableau(["Formule", "Unités"], [["Φ = U × A × ΔT", "W = W/(m².K) × m² × K"]])
        + exemplesParoi()
        + BE.renvoi("La somme des U × A de toutes les parois est la base de la formule 3 des règles Th-Bât (fascicule Généralités, § 4.3, p. 16). Elle prend pour les fenêtres et les portes les dimensions de l’ouverture.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, Φ d’une paroi", title: "Exercice : la déperdition d’un mur et de sa fenêtre", level: "appliquer", requiresAction: true,
      text: {
        1: `Le mur MA du bureau d’exemple est orienté au nord. Sa surface nette est de ${EX.S.MA} m² et son coefficient U de ${EX.U.MA} W/(m².K). Il porte la fenêtre Fa : ${EX.S.Fa} m², Uw = ${EX.U.Uw} W/(m².K), valeur d’exercice. L’écart de température est celui de l’écran « L’écart de température » : ${EX.T.dT} K. Les exemples résolus restent sous vos yeux : refaites les mêmes gestes.`,
        2: `Le mur MA du bureau d’exemple est orienté au nord. Sa surface nette est de ${EX.S.MA} m² et son coefficient U de ${EX.U.MA} W/(m².K). Il porte la fenêtre Fa : ${EX.S.Fa} m², Uw = ${EX.U.Uw} W/(m².K), valeur d’exercice. L’écart de température est celui de l’écran « L’écart de température » : ${EX.T.dT} K. Calculez sans les exemples.`
      },
      prompt: { 1: "Choisissez la ligne qui donne les deux déperditions, en vous aidant des exemples.", 2: "Choisissez la ligne qui donne les deux déperditions. Cette question est à faire seul." },
      aides: {
        1: ["Surfaces, U et Uw sont dans l’énoncé. La formule est à l’écran « La déperdition d’une paroi sur l’extérieur », ΔT est donné.", "Φ = U × A × ΔT : une ligne pour le mur en surface nette, une ligne pour la fenêtre avec son Uw. Écrivez U × A au centième de W/K, puis multipliez par ΔT, au watt.", `Sur le mur MB d’exemple : ${EX.U.MA} × ${EX.S.MB} = ${EX.exm.MB.UA} W/K, puis ${EX.exm.MB.UA} × ${EX.T.dT} = ${EX.exm.MB.phi} W. Faites le même calcul avec la surface nette de MA.`],
        2: ["L’énoncé donne surfaces et coefficients. Les formules sont aux écrans « L’écart de température » et « La déperdition d’une paroi sur l’extérieur ».", "Une ligne pour le mur, en surface nette, avec son U. Une ligne pour la fenêtre, avec son Uw. Pour chacune, U × A, puis le produit par ΔT.", `Sur un autre mur de ${EX.S.MB} m² et de U ${EX.U.MA}, on écrit ${EX.U.MA} × ${EX.S.MB} = ${EX.exm.MB.UA} W/K, puis ${EX.exm.MB.UA} × ${EX.T.dT} = ${EX.exm.MB.phi} W. Écrivez les deux mêmes lignes pour MA et Fa.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exemplesParoi(), EX.ex1),
        2: BE.quiz(EX.ex1)
      })
    }),

    BE.ecran({
      id: "local-non-chauffe-et-b", dossier: "methode", kicker: "La méthode, 3", title: "Le local non chauffé et le coefficient b", level: "comprendre",
      image: "illustrations/1-garage-accole.webp", imageAlt: "Coupe d’une maison en hiver, vue de côté. À droite, le salon chauffé, avec un canapé, une plante et un radiateur, sous une chambre. Au milieu, le garage non chauffé, avec une voiture et une porte sectionnelle fermée. À gauche, un arbre sans feuilles sur un sol givré. Des lignes orange ondulées sortent du salon, traversent le mur commun et s’éteignent dans le garage. Quelques lignes bleues plus pâles sortent du garage vers l’extérieur.",
      text: "Un garage non chauffé, accolé à la maison, reçoit de la chaleur par le mur qu’il partage avec une pièce chauffée et en perd par ses autres parois. Il est donc moins froid que l’extérieur, et la paroi entre la pièce et le garage perd moins qu’une paroi sur l’extérieur. Le coefficient de réduction b tient compte de cet écart de température entre le local non chauffé et l’extérieur. C’est un nombre entre 0 et 1 qui multiplie la déperdition : Φ = U × A × b × ΔT. Plus le local non chauffé ressemble à l’extérieur, plus b se rapproche de 1.",
      prompt: "Lisez le tableau des valeurs de b, puis continuez.",
      render: () => tableau(["Paroi", "Valeur de b", "Source"], [
        ["Sur l’extérieur", "b = 1", "Th-Bât Généralités, § 4, p. 17"],
        ["En contact avec le sol", "b = 1", "Th-Bât Généralités, § 4, p. 17"],
        ["Sur un local non chauffé, valeur par défaut", "entre 0 et 1, lue dans un tableau (écran suivant)", "Th-Bât Généralités, § 5.2.1, p. 19 à 22"],
        ["Sur un local non chauffé, calcul complet", "b = Due ÷ (Due + Diu)", "Th-Bât Généralités, § 5.1, p. 17"]
      ], "Le coefficient b selon la paroi")
        + BE.renvoi("Dans la formule 4, Due est la déperdition du local non chauffé vers l’extérieur et Diu celle du volume chauffé vers le local non chauffé, en W/K. Cette formule est citée ici, vous ne la calculez pas. En l’absence de justification particulière, les règles donnent des valeurs par défaut, que vous lisez à l’écran suivant.")
    }),

    BE.ecran({
      id: "lire-b-dans-le-tableau", dossier: "methode", kicker: "La méthode, 4", title: "Lire b dans le tableau", level: "comprendre",
      text: "Pour un local non chauffé, vous lisez b en quatre gestes. D’abord, relevez Aiu, la surface des parois entre le volume chauffé et le local non chauffé : toutes les parois des pièces chauffées qui touchent ce local, portes comprises, pas seulement celles de la pièce étudiée. Relevez aussi Aue, la surface des parois entre le local non chauffé et l’extérieur. Ensuite, dites si chacun de ces ensembles de parois est isolé, ce qui choisit le tableau de II à V. Puis lisez Uv,ue, qui exprime la ventilation du local, dans le tableau VI d’après son type. Enfin, calculez Aiu ÷ Aue, repérez la ligne du tableau et lisez b dans la colonne de Uv,ue.",
      prompt: "Lisez le schéma, les tableaux II et VI, puis l’exemple résolu.",
      render: () => BE.schema(SCHEMA, "Schéma de principe en trois zones côte à côte : le volume chauffé, le local non chauffé et l’extérieur. Une paroi repérée Aiu sépare le volume chauffé du local non chauffé. Une paroi repérée Aue sépare le local non chauffé de l’extérieur. Une flèche indique que la chaleur va du plus chaud au plus froid.", "Aiu et Aue : les deux ensembles de parois d’un local non chauffé.")
        + tableau(["Tableau", "Aiu, côté volume chauffé", "Aue, côté extérieur", "Page"], [
          ["II", "isolée", "non isolée", "p. 19"],
          ["III", "non isolée", "non isolée", "p. 20"],
          ["IV", "non isolée", "isolée", "p. 21"],
          ["V", "isolée", "isolée", "p. 22"]
        ], "Quel tableau lire, d’après l’isolation (Th-Bât Généralités, § 5.2.1)")
        + BE.alerte("<strong>Limite.</strong> Dans les tableaux II à V, la surface Aue d’une véranda est toujours considérée comme non isolée (Th-Bât Généralités, § 5.2.1, p. 18). Une paroi est dite isolée quand le CCTP y prévoit un isolant.")
        + tableau(["Aiu ÷ Aue", "0,0", "0,3", "1,5", "3,0", "7,00", "9,00"], EX.tabII, "Tableau II (Aiu isolée, Aue non isolée) : valeur de b selon Aiu ÷ Aue (lignes) et Uv,ue en W/(m².K) (colonnes). Th-Bât Généralités, § 5.2.1, p. 19")
        + tableau(["Local non chauffé", "Uv,ue"], [
          ["Maison individuelle, garage", "3"],
          ["Maison individuelle, cellier", "3"],
          ["Maison individuelle, véranda", "3"],
          ["Maison individuelle, comble fortement ventilé (Ao ÷ Ac : plus de 0,003)", "9"],
          ["Maison individuelle, comble faiblement ventilé (Ao ÷ Ac : de 0,0003 à 0,003)", "3"],
          ["Maison individuelle, comble très faiblement ventilé (Ao ÷ Ac : moins de 0,0003)", "0,3"],
          ["Tertiaire, locaux fortement ventilés (parking public, hall de gare)", "9"],
          ["Tertiaire, parking privé", "3"],
          ["Tertiaire, autres dépendances", "3"]
        ], "Tableau VI : valeurs par défaut de Uv,ue en W/(m².K). Th-Bât Généralités, § 5.2.2, p. 23")
        + BE.renvoi("Le tableau VI imprime l’unité W/(m.K) : c’est une coquille du fascicule. L’unité de Uv,ue est W/(m².K), comme dans l’en-tête des tableaux II à V. Autre coquille : la page 21 est titrée « Tableau VI » alors que c’est le tableau IV, comme le rappelle le tableau de la page 18.")
        + BE.alerte("<strong>Piège.</strong> Aiu compte les parois de toutes les pièces chauffées qui touchent le local non chauffé. Avec les seules parois de la pièce étudiée, le rapport Aiu ÷ Aue est trop petit : on lit parfois une autre ligne du tableau, donc un autre b.")
        + BE.alerte("<strong>Piège.</strong> Une ligne du tableau se lit « supérieur à la valeur de la ligne précédente, inférieur ou égal à la sienne » : un rapport de 2,00 se lit sur la ligne « 1,25 < … ≤ 2,00 ».")
        + exempleLocalTechnique()
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, b d’un local non chauffé", title: "Exercice : le b d’un parking privé", level: "appliquer", requiresAction: true,
      text: {
        1: `Le bâtiment du bureau d’exemple compte aussi un parking privé non chauffé, sous des locaux chauffés. Ses parois vers les locaux chauffés sont isolées, celles vers l’extérieur ne le sont pas. Aiu = ${EX.pk.Aiu} m² et Aue = ${EX.pk.Aue} m². Cherchez b dans les tableaux. L’exemple du local technique reste sous vos yeux.`,
        2: `Le bâtiment du bureau d’exemple compte aussi un parking privé non chauffé, sous des locaux chauffés. Ses parois vers les locaux chauffés sont isolées, celles vers l’extérieur ne le sont pas. Aiu = ${EX.pk.Aiu} m² et Aue = ${EX.pk.Aue} m². Cherchez b dans les tableaux, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le b du parking, en vous aidant de l’exemple.", 2: "Choisissez le b du parking. Cette question est à faire seul." },
      aides: {
        1: ["Surfaces et isolation sont dans l’énoncé. Le tableau II et le tableau VI sont à l’écran « Lire b dans le tableau ».", "Aiu isolée et Aue non isolée désignent un tableau. Uv,ue se lit au tableau VI d’après le type du local. Divisez Aiu par Aue, repérez la ligne, lisez la colonne de Uv,ue.", `Sur le local technique d’exemple : ${EX.lt.Aiu} ÷ ${EX.lt.Aue} = ${EX.lt.ratio}, ligne « ${EX.lt.ligne} », colonne 3,0. Faites la même division avec ${EX.pk.Aiu} et ${EX.pk.Aue}.`],
        2: ["Surfaces et isolation sont dans l’énoncé. Les tableaux II et VI sont à l’écran « Lire b dans le tableau ».", "Dites quel tableau correspond à l’isolation des deux côtés, puis lisez Uv,ue d’après le type du local. Calculez Aiu ÷ Aue, repérez la ligne, lisez la colonne.", `Sur un autre local, Aiu ÷ Aue = ${EX.lt.Aiu} ÷ ${EX.lt.Aue} = ${EX.lt.ratio} se lit sur la ligne « ${EX.lt.ligne} ». Écrivez la division pour le parking.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleLocalTechnique(), EX.ex2),
        2: BE.quiz(EX.ex2)
      })
    }),

    BE.ecran({
      id: "comble", dossier: "methode", kicker: "La méthode, 5", title: "Le comble : fortement, faiblement ou très faiblement ventilé", level: "comprendre",
      image: "illustrations/2-comble-ventile.webp", imageAlt: "Coupe d’un comble perdu sous une toiture en tuiles, au-dessus d’une chambre. Une épaisse couche d’isolant couvre le plancher du comble. Dessous, la chambre porte un lit, deux tables de chevet, une porte et une fenêtre. Trois petites grilles de ventilation sont colorées en orange : une sous chaque bas de versant et une en haut du pignon. Des lignes bleues ondulées entrent par les grilles du bas, traversent le comble vide sous la charpente et sortent par la grille du haut.",
      text: "Un comble perdu est un local non chauffé, au-dessus du plafond de la maison. Il est ventilé par des orifices : plus l’air s’y renouvelle, plus il ressemble à l’extérieur. Les règles Th-Bât classent le comble d’après Ao ÷ Ac, où Ao est la surface totale des orifices de ventilation du comble et Ac la surface du comble, en m². Plus de 0,003 : fortement ventilé, Uv,ue vaut 9. De 0,0003 à 0,003 : faiblement ventilé, Uv,ue vaut 3. Moins de 0,0003 : très faiblement ventilé, Uv,ue vaut 0,3. Pour b, Aiu est la surface du plafond sous le comble.",
      prompt: "Lisez le tableau des trois cas, puis les deux exemples résolus.",
      render: () => tableau(["Ao ÷ Ac", "Comble", "Uv,ue"], [
        ["plus de 0,003", "fortement ventilé", "9"],
        ["de 0,0003 à 0,003", "faiblement ventilé", "3"],
        ["moins de 0,0003", "très faiblement ventilé", "0,3"]
      ], "Tableau VI, lignes du comble d’une maison individuelle. Th-Bât Généralités, § 5.2.2, p. 23 ; Ao et Ac définis p. 24")
        + BE.exemple({ text: `Comble du bâtiment d’exemple : Ao = ${EX.com.Ao} m², Ac = ${EX.com.Ac} m²`, answer: `Ao ÷ Ac = ${EX.com.Ao} ÷ ${EX.com.Ac} = ${EX.com.aoac} : fortement ventilé, Uv,ue = ${EX.com.uv}`, why: `${EX.com.aoac} est au-dessus de 0,003.` })
        + BE.exemple({ text: `Même comble : Aiu = ${EX.com.Aiu} m² (plafond du bâtiment sous le comble), Aue = ${EX.com.Aue} m², parois côté pièce isolées, côté extérieur non isolées`, answer: `Aiu ÷ Aue = ${EX.com.ratio}, tableau ${EX.com.tableau}, ligne « ${EX.com.ligne} », colonne ${EX.com.uv === 9 ? "9,00" : EX.com.uv} : b = ${EX.com.b}`, why: "Même geste que pour le local technique : isolation, tableau, Uv,ue, rapport, ligne, colonne." })
        + BE.renvoi("Le tableau VI écrit des inégalités strictes et ne classe pas une valeur égale à 0,0003 ou à 0,003. Cette station la range dans « faiblement ventilé ».")
        + BE.alerte("<strong>Hypothèse d’exercice.</strong> Le tableau VI ne donne les lignes « comble » que pour l’habitation. Pour le comble du bâtiment d’exemple, on prend les mêmes lignes.")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, le bon tableau", title: "Exercice : choisir le tableau de b", level: "appliquer", requiresAction: true,
      text: {
        1: "Pour chaque local non chauffé, choisissez le tableau de b d’après l’isolation de ses parois, côté volume chauffé (Aiu) et côté extérieur (Aue). Une paroi est isolée quand le CCTP y prévoit un isolant. Un exemple résolu est donné en tête de liste.",
        2: "Pour chaque local non chauffé, choisissez le tableau de b d’après l’isolation de ses parois, côté volume chauffé (Aiu) et côté extérieur (Aue). Une paroi est isolée quand le CCTP y prévoit un isolant."
      },
      prompt: { 1: "Classez chaque local, en vous aidant de l’exemple.", 2: "Classez chaque local. Cette question est à faire seul." },
      aides: {
        1: ["Les quatre tableaux et leur cas d’isolation sont dans le premier tableau de l’écran « Lire b dans le tableau ».", "Pour chaque local, cherchez d’abord si les parois côté volume chauffé sont isolées, puis si celles côté extérieur le sont. Les deux réponses désignent un seul tableau.", "Sur un autre local, des parois toutes isolées relèvent du tableau V. Faites de même pour la première ligne."],
        2: ["Les quatre tableaux et leur cas d’isolation sont dans le premier tableau de l’écran « Lire b dans le tableau », avec la règle sur les vérandas.", "Pour chaque local, dites si Aiu est isolée, puis si Aue l’est. Les deux réponses désignent un seul tableau.", "Sur un autre local, des parois toutes isolées relèvent du tableau V. Faites de même pour la première ligne."]
      },
      ...BE.parNiveau({
        1: BE.tri(EX.tri.lignes, EX.tri.labels, EX.tri.exemple),
        2: BE.tri(EX.tri.lignes, EX.tri.labels)
      })
    }),

    BE.ecran({
      id: "tableau-d-une-piece", dossier: "methode", kicker: "La méthode, 6", title: "Le tableau des déperditions d’une pièce", level: "comprendre",
      text: "Pour une pièce, vous faites un tableau d’une ligne par paroi qui donne sur l’extérieur, sur le sol, sur un local non chauffé ou sous un comble, et d’une ligne par baie. Chaque ligne donne U × A × b en W/K, au centième. La somme des lignes est H, le coefficient de déperdition de la pièce par ses parois, en W/K. La puissance perdue est Φ = H × ΔT, en W. Le plancher intermédiaire et les cloisons entre pièces chauffées ne comptent pas : leurs deux faces ont la même température.",
      prompt: "Lisez le tableau de ce qui compte, puis l’exemple de ligne.",
      render: () => tableau(["Paroi de la pièce", "Elle compte ?", "Coefficient", "b"], [
        ["Mur sur l’extérieur", "oui", "U du mur", "1"],
        ["Fenêtre ou porte sur l’extérieur", "oui", "Uw ou Ud", "1"],
        ["Mur ou porte sur un local non chauffé", "oui", "U du mur ou Ud", "lu dans le tableau"],
        ["Plancher bas sur le sol", "oui", "Ue", "1"],
        ["Plafond sous comble", "oui", "U du plafond", "lu dans le tableau"],
        ["Plancher entre deux pièces chauffées", "non", "", ""],
        ["Cloison entre deux pièces chauffées", "non", "", ""]
      ], "Ce qui compte dans le tableau d’une pièce")
        + BE.exemple({ text: `Mur MC du bureau d’exemple, sur le local technique : U = ${EX.U.MC}, A = ${EX.S.MC} m², b = ${EX.lt.b}`, answer: `U × A × b = ${EX.U.MC} × ${EX.S.MC} × ${EX.lt.b} = ${EX.mc.UAb} W/K`, why: "La ligne s’écrit au centième de W/K. Le b du local technique est celui de l’écran « Lire b dans le tableau »." })
    }),

    BE.ecran({
      id: "exemple-complet", dossier: "methode", kicker: "La méthode, 7", title: "Exemple résolu complet : le bureau d’exemple", level: "comprendre",
      text: `Voici le tableau complet du bureau d’exemple, avec θi = ${EX.T.ti} °C et θe = ${EX.T.te} °C, soit ΔT = ${EX.T.dT} K. Le mur sud, entre le bureau et le couloir chauffé, ne compte pas. Le mur MC et sa porte Pn donnent sur le local technique non chauffé. Le plancher bas est sur le sol et le plafond est sous un comble perdu. H est la somme des lignes, puis Φ = H × ΔT.`,
      prompt: "Suivez le tableau ligne par ligne, puis lisez les trois dernières lignes.",
      render: () => tableau(["Paroi ou baie", "A (m²)", "Coefficient", "U", "b", "U × A × b (W/K)"], [
        ...EX.lignes.map(l => [l.nom, l.A, l.coef, l.U, l.b, l.UAb]),
        ["H, somme des lignes (W/K)", "", "", "", "", EX.H],
        [`Φ = H × ΔT = ${EX.H} × ${EX.T.dT} (W)`, "", "", "", "", EX.phi],
        [`Φ ÷ surface habitable de ${EX.S.hab} m² (W/m²)`, "", "", "", "", EX.ratio]
      ], "Déperditions du bureau d’exemple par ses parois")
        + BE.alerte(`<strong>Piège.</strong> Le plancher bas oublié retire ${EX.ecartPlancher} W : Φ passe de ${EX.phi} à ${EX.sansPlancher} W.`)
        + BE.renvoi("Les valeurs du bureau d’exemple (Uw, Ud, Ue, Aue du local technique, Ao et Ac du comble) sont des valeurs d’exercice.")
    }),

    BE.ecran({
      id: "ratio-w-par-m2", dossier: "methode", kicker: "La méthode, 8", title: "Le ratio en W par m²", level: "comprendre",
      text: `Φ divisé par la surface habitable de la pièce donne un ratio en W par m². Ce ratio sert de repère : on compare les pièces entre elles et on repère une erreur grossière. Une pièce qui s’écarte nettement des autres appelle une vérification : paroi oubliée, signe de ΔT, surface brute au lieu de la surface nette. La puissance à installer se décide à la station T5.`,
      prompt: "Lisez l’exemple résolu, puis continuez.",
      render: () => BE.exemple({ text: `Bureau d’exemple : Φ = ${EX.phi} W, surface habitable ${EX.S.hab} m²`, answer: `${EX.phi} ÷ ${EX.S.hab} = ${EX.ratio} W/m²`, why: "Le résultat s’écrit au dixième. Un seul ratio ne prouve rien : il prend son sens quand on le compare à celui des autres pièces du même bâtiment." })
        + BE.alerte("<strong>Limite.</strong> Ce ratio ne compte ni les ponts thermiques ni le renouvellement d’air. Il compare des pièces calculées avec les mêmes températures.")
    }),

    BE.ecran({
      id: "ce-qui-manque", dossier: "methode", kicker: "La méthode, 9", title: "Ce qui manque encore", level: "comprendre",
      text: "Le tableau de cette station ne compte que la transmission par les parois et les baies. Il manque encore deux postes. Le renouvellement d’air, c’est-à-dire l’air froid qui entre et l’air chaud qui sort, se calcule à la station T4. Les ponts thermiques, c’est-à-dire les liaisons où la chaleur passe davantage, par exemple entre un plancher et un mur, s’ajoutent au bilan de la station T5. La puissance à installer se décide à la station T5, après ces deux postes.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Dans cette station", rows: [["La transmission :", "la chaleur qui traverse les parois et les baies, avec b pour les locaux non chauffés."]] },
        { title: "À la station T4", rows: [["Le renouvellement d’air :", "l’air neuf et les infiltrations."]] },
        { title: "À la station T5", rows: [["Les ponts thermiques :", "ajoutés au bilan."], ["La puissance à installer :", "choisie sur le bilan complet."]] }
      ])
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

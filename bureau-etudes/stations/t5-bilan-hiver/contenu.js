/* Station BE-T5 : Le bilan d'hiver.
   Méthode sur un petit bâtiment de bureaux d'exemple (le bureau d'exemple des stations T1 à T3, une salle de réunion, des sanitaires),
   puis commande sur la maison. Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites
   par outils/stations/t5-bilan-hiver/construire.mjs : le premier vient de exemple-data.mjs, les secondes de
   corriges/t5-bilan-hiver/reference-bilan-hiver.json (outils/t5-bilan-maison.mjs, tolérance 3 %).
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes et les données de la commande le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "T": {
  "ti": "19",
  "te": "−7",
  "dT": "26"
 },
 "locaux": [
  {
   "nom": "Bureau",
   "hab": "19,14",
   "H": "26,44",
   "qv": "48,13",
   "phi": "825",
   "air": "425",
   "local": "1250",
   "ratio": "65,3"
  },
  {
   "nom": "Salle de réunion",
   "hab": "24,60",
   "H": "30,95",
   "qv": "61,87",
   "phi": "966",
   "air": "547",
   "local": "1513",
   "ratio": "61,5"
  },
  {
   "nom": "Sanitaires",
   "hab": "6,20",
   "H": "7,47",
   "qv": "0",
   "phi": "233",
   "air": "0",
   "local": "233",
   "ratio": "37,6"
  }
 ],
 "fam": [
  {
   "nom": "Murs extérieurs, surface nette",
   "A": "54,25",
   "U": "0,31",
   "b": "1,00",
   "UAb": "16,82"
  },
  {
   "nom": "Fenêtres",
   "A": "8,61",
   "U": "1,6",
   "b": "1,00",
   "UAb": "13,78"
  },
  {
   "nom": "Mur sur le local technique",
   "A": "6,69",
   "U": "0,54",
   "b": "0,90",
   "UAb": "3,25"
  },
  {
   "nom": "Porte vers le local technique",
   "A": "1,89",
   "U": "1,8",
   "b": "0,90",
   "UAb": "3,06"
  },
  {
   "nom": "Plancher bas",
   "A": "49,94",
   "U": "0,36",
   "b": "1,00",
   "UAb": "17,98"
  },
  {
   "nom": "Plafond sous comble",
   "A": "49,94",
   "U": "0,21",
   "b": "0,95",
   "UAb": "9,96"
  }
 ],
 "hab": "49,94",
 "Hpieces": "64,86",
 "Hfam": "64,85",
 "ecartSommes": "0,01",
 "pontsPc": "20",
 "pontsDec": "0,20",
 "qv": "110",
 "relPc": "15",
 "relDec": "0,15",
 "Hp": "64,86",
 "Hpt": "12,97",
 "HpHpt": "77,83",
 "Hair": "37,40",
 "H": "115,23",
 "phiAir": "972",
 "base": "2996",
 "rel": "449",
 "P": "3445",
 "PkW": "3,5",
 "PkWbas": "3,4",
 "sommeLocaux": "2996",
 "sansAir": "2024",
 "ratio": "60,0",
 "part": {
  "parois": "56 %",
  "ponts": "11 %",
  "air": "32 %"
 },
 "ex1": {
  "Hp": "54,20",
  "Hair": "20,40",
  "pontsPc": "20",
  "pontsDec": "0,20",
  "quiz": {
   "choices": [
    "H ponts = 10,84 W/K ; H parois + H ponts = 54,20 W/K",
    "H ponts = 10,84 W/K ; H parois + H ponts = 65,04 W/K",
    "H ponts = 14,92 W/K ; H parois + H ponts = 69,12 W/K",
    "H ponts = 1,08 W/K ; H parois + H ponts = 55,28 W/K"
   ],
   "good": 1,
   "explain": "0,20 × 54,20 = 10,84 W/K, puis 54,20 + 10,84 = 65,04 W/K. A oublie d’ajouter H ponts à H parois, C applique le forfait à H parois + H air, D lit 20 % comme 0,02."
  }
 },
 "ex2": {
  "qv": "75",
  "quiz": {
   "choices": [
    "H air = 25,50 W/K ; Φ air = 25,50 W",
    "H air = 25,50 W/K ; Φ air = 663 W",
    "H air = 25,50 W/K ; Φ air = 306 W",
    "H air = 90,00 W/K ; Φ air = 2340 W"
   ],
   "good": 1,
   "explain": "0,34 × 75 = 25,50 W/K, puis 25,50 × 26 = 663 W. A s’arrête au coefficient sans multiplier par ΔT, C prend ΔT = 12 K en additionnant θe au lieu de la retrancher, D multiplie le débit par 1,2 au lieu de 0,34."
  }
 },
 "ex3": {
  "base": "2840",
  "relPc": "15",
  "relDec": "0,15",
  "quiz": {
   "choices": [
    "Relance 426 W ; puissance 3266 W, soit 3,2 kW",
    "Relance 426 W ; puissance 3266 W, soit 3,3 kW",
    "Pas de relance ; puissance 2840 W, soit 2,9 kW",
    "Relance 852 W ; puissance 3692 W, soit 3,7 kW"
   ],
   "good": 1,
   "explain": "0,15 × 2840 = 426 W, puis 2840 + 426 = 3266 W, arrondi au dixième de kW au-dessus : 3,3 kW. A arrondit en dessous, C oublie la relance, D compte la relance deux fois."
  }
 },
 "maison": {
  "pontsPc": "15",
  "relPc": "10"
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exemplePonts = () => BE.exemple({ text: `Bâtiment d’exemple : H parois = ${EX.Hp} W/K, forfait des ponts thermiques ${EX.pontsPc} %`, answer: `H ponts = ${EX.pontsDec} × ${EX.Hp} = ${EX.Hpt} W/K ; H parois + H ponts = ${EX.HpHpt} W/K`, why: "Le forfait s’applique à H parois seulement, jamais à l’air. Le résultat s’écrit au centième de W/K." });
const exempleAir = () => BE.exemple({ text: `Bâtiment d’exemple : qv = ${EX.qv} m³/h, ΔT = ${EX.T.dT} K`, answer: `H air = 0,34 × ${EX.qv} = ${EX.Hair} W/K ; Φ air = ${EX.Hair} × ${EX.T.dT} = ${EX.phiAir} W`, why: "0,34 Wh/(m³.K) multiplié par un débit en m³/h donne des W/K. Le débit reste en m³/h." });
const exempleRelance = () => BE.exemple({ text: `Bâtiment d’exemple : Φ base = ${EX.base} W, relance ${EX.relPc} %`, answer: `relance = ${EX.relDec} × ${EX.base} = ${EX.rel} W ; P = ${EX.base} + ${EX.rel} = ${EX.P} W, soit ${EX.PkW} kW à installer`, why: "La puissance à installer s’arrondit au dixième de kW au-dessus, jamais en dessous." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Les surfaces sont les totaux de la maison de votre feuille de la station T1. Les U viennent de la station T2, Uw et Ud de la page 2 du CCTP, les b du garage et du comble de votre feuille de la station T3. H air vient de votre feuille de la station T4. Le forfait des ponts thermiques et la relance sont dans la commande ci-dessus.",
      "Une ligne par famille de parois : U × A × b, au centième de W/K. H parois est leur somme. Ensuite, dans l’ordre : H ponts, H air, H, Φ base, relance, puissance à installer (écrans « Les quatre postes du bilan » à « La relance après l’allure réduite »).",
      `Sur le bâtiment d’exemple, la ligne des murs extérieurs s’écrit ${EX.fam[0].U} × ${EX.fam[0].A} × 1 = ${EX.fam[0].UAb} W/K. Pour la maison, les fenêtres se comptent sans la porte d’entrée : retirez sa surface du total des baies de vos murs extérieurs.`
    ],
    2: [
      "Les H parois de l’entrée et de la chambre 1 sont sur votre feuille de la station T3. Les autres pièces se calculent de la même façon, avec vos surfaces de la station T1, vos U de la station T2 et les b de T3. H air vient de la station T4, le forfait des ponts et la relance de la commande.",
      "Faites le tableau d’une pièce (méthode de la station T3) pour chaque pièce chauffée, puis le tableau local par local avec la part d’air de chaque pièce (écran « Le ratio en W par m² du bâtiment »). Contrôlez la somme par familles de parois (écran « Additionner les parois : par local ou par familles »), puis finissez le bilan.",
      `Sur le bâtiment d’exemple, la somme par locaux donne ${EX.Hpieces} W/K et la somme par familles ${EX.Hfam} W/K : l’écart vient des arrondis. Faites le même contrôle sur la maison avant d’ajouter les ponts et l’air.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensCctp = () => BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Températures de calcul et locaux non chauffés à la page 3, menuiseries à la page 2, ventilation dans les pages suivantes" }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensCctp(); };

BE.station({
  code: "BE-T5",
  titre: "Le bilan d’hiver",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison entière, par familles de parois, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison entière, local par local, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Vous avez les déperditions des pièces par leurs parois et celles du renouvellement d’air. Le bilan d’hiver les rassemble pour tout le bâtiment, ajoute les ponts thermiques et la relance, et donne la puissance à installer. Vous apprenez la méthode sur un petit bâtiment d’exemple, puis vous la faites sur la maison.",
  note: "Les températures de calcul, le forfait des ponts thermiques, la surpuissance de relance et les valeurs du bâtiment d’exemple sont des valeurs d’exercice. La formule des ponts thermiques vient des règles Th-Bât 2017, fascicule Généralités.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, CCTP et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Bilan d’hiver de la maison de deux niveaux et puissance à installer",
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage veut connaître la puissance de chauffage à installer dans la maison des stations T1 à T4. Données de l’exercice fixées par le bureau d’études : ponts thermiques comptés en forfait, ${EX.maison.pontsPc} % de H parois ; surpuissance de relance après l’allure réduite de nuit, ${EX.maison.relPc} % de Φ base. Suivez les étapes dans l’ordre.`,
        "Étape 1. Au recto de la feuille, une ligne par famille de parois de toute la maison. Écrivez A (totaux de votre feuille de la station T1), U et b (stations T2 et T3, page 2 du CCTP), puis U × A × b. Additionnez : H parois.",
        "Étape 2. Au verso, ajoutez H ponts (forfait de la commande) et H air (votre résultat de la station T4). Calculez H, puis Φ base = H × ΔT avec les températures de la page 3 du CCTP.",
        "Étape 3. Ajoutez la relance, arrondissez la puissance à installer au dixième de kW au-dessus, calculez le ratio en W par m², puis écrivez les trois lignes de la note de calcul. Vérifiez Φ base et la puissance à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Vos résultats des stations T1 à T4", ou: "Totaux de la maison (T1), coefficients U (T2), b du garage et du comble (T3), H air (T4)" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 3 : températures. Page 2 : Uw et Ud." },
        { piece: "Forfait des ponts thermiques et relance", ou: "Cette commande, données de l’exercice" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Bilan d’hiver local par local de la maison de deux niveaux, puissance à installer et note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le maître d’ouvrage veut connaître la puissance de chauffage à installer dans la maison des stations T1 à T4. Données de l’exercice fixées par le bureau d’études : ponts thermiques comptés en forfait, ${EX.maison.pontsPc} % de H parois ; surpuissance de relance après l’allure réduite de nuit, ${EX.maison.relPc} % de Φ base. Établissez le bilan local par local des huit pièces chauffées (détail de chaque pièce sur une feuille quadrillée jointe, part d’air de chaque pièce reprise de la station T4), contrôlez H parois par familles de parois, puis rendez Φ base, la puissance à installer arrondie et la première page de la note de calcul, avec la source de chaque donnée.`,
      pieces: [
        { piece: "Vos résultats des stations T1 à T4", ou: "Surfaces des pièces (T1), coefficients U (T2), b et tableaux de l’entrée et de la chambre 1 (T3), part d’air de chaque pièce et H air (T4)" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 3 : températures et locaux non chauffés. Page 2 : Uw, Ud et Ue." },
        { piece: "Forfait des ponts thermiques et relance", ou: "Cette commande, données de l’exercice" },
        { piece: "Feuille réponse niveau 2 et une feuille quadrillée", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-base", libelle: "Φ base de la maison", unite: "W", min: 3474, max: 3690, indice: "Relisez l’écran « Les quatre postes du bilan » : H parois, H ponts et H air s’additionnent avant de multiplier par ΔT. Contrôlez le forfait des ponts (écran « Les ponts thermiques ») et ΔT, page 3 du CCTP." },
      { id: "n1-p", libelle: "Puissance à installer, en W", unite: "W", min: 3821, max: 4059, indice: "Relisez l’écran « La relance après l’allure réduite » : la relance est un pourcentage de Φ base, ajouté à Φ base. Écrivez la puissance en W, avant l’arrondi ou arrondie au dixième de kW au-dessus." }
    ],
    2: [
      { id: "n2-hp", libelle: "H parois de la maison, somme des huit pièces", unite: "W/K", min: 95.06, max: 100.96, indice: "Relisez l’écran « Additionner les parois : par local ou par familles » : les huit pièces chauffées, chacune avec son tableau de la station T3, ni le garage ni le comble. Comparez avec la somme par familles." },
      { id: "n2-p", libelle: "Puissance à installer, en W", unite: "W", min: 3822, max: 4060, indice: "Relisez l’écran « La relance après l’allure réduite » : la relance est un pourcentage de Φ base, ajouté à Φ base. Écrivez la puissance en W, avant l’arrondi ou arrondie au dixième de kW au-dessus." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T6", titre: "Été 1 : le soleil", href: "../t6-ete-vitrages-soleil/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-T3, Déperditions d’un local par les parois", href: "../t3-deperditions-local/index.html", pourquoi: "Le tableau d’une pièce et le coefficient b que vous reprenez ici viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-T4, Déperditions par l’air", href: "../t4-deperditions-air/index.html", pourquoi: "H air, que vous ajoutez au bilan, se calcule à cette station." },
    { reseau: "AéroRézo", titre: "Déperditions d’une pièce", href: "../../../aerorezo/stations/deperditions-piece/index.html", pourquoi: "Vous y trouvez le calcul des déperditions d’une pièce, parois et air." },
    { reseau: "Bureau d’études", titre: "BE-T9, La machine", href: "../t9-machine-puissance-choix/index.html", pourquoi: "La puissance à installer trouvée ici sert au choix de la pompe à chaleur." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/1-technicien-classeur.webp", imageAlt: "Un technicien de bureau d’études, debout devant son bureau, glisse un tableau imprimé dans la quatrième section d’un gros classeur ouvert. Les trois premières sections contiennent déjà des feuilles, une pile de tableaux attend à côté. Le dernier intercalaire, vide, porte un onglet orange. Au mur, le plan d’un petit bâtiment.",
      text: "Vous recevez la commande d’un bureau d’études : trouver la puissance de chauffage à installer dans la maison. Vous rassemblez les déperditions par les parois de toute la maison (station T3) et celles du renouvellement d’air (station T4). Vous y ajoutez les ponts thermiques et une surpuissance de relance. Le tableau du bilan se remplit de haut en bas : chaque ligne reprend la précédente. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Poste du bilan", "Unité"], [
        ["H parois, somme des U × A × b", "W/K"],
        ["H ponts, ponts thermiques", "W/K"],
        ["H air, renouvellement d’air", "W/K"],
        ["H, somme des trois", "W/K"],
        ["Φ base = H × ΔT", "W"],
        ["Relance", "W"],
        ["Puissance à installer", "kW"]
      ], "Le tableau du bilan d’hiver, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la puissance à installer dans la maison."], ["Le dossier :", "vos résultats des stations T1 à T4, le CCTP, deux données de l’exercice."]] },
          { title: "Vous produisez", rows: [["Le bilan :", "H parois, H ponts, H air, Φ base, relance."], ["Le résultat :", "la puissance à installer, le ratio en W par m², la note de calcul. Fourchette de ± 3 % à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T6, le bilan d’été."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Le bilan d’hiver réutilise vos résultats des stations précédentes : surfaces de T1, coefficients U de T2, coefficients b et tableaux des pièces de T3, renouvellement d’air de T4. Les températures de calcul sont à la page 3 du CCTP. Deux données sont fixées par la commande du bureau d’études : le forfait des ponts thermiques et la surpuissance de relance. Une erreur dans une station précédente se retrouve dans la puissance à installer : contrôlez d’abord vos résultats à la fourchette de chaque station.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Surfaces des parois, des baies, surface habitable", "Votre feuille de la station T1"],
        ["U des parois opaques", "Votre feuille de la station T2"],
        ["Uw, Ud, Ue", "Page 2 du CCTP"],
        ["b du garage et du comble, tableaux des pièces", "Votre feuille de la station T3"],
        ["H air et part d’air de chaque pièce", "Votre feuille de la station T4"],
        ["θi et θe", "Page 3 du CCTP, valeurs d’exercice"],
        ["Forfait des ponts thermiques, relance", "La commande de cette station, données de l’exercice"]
      ], "Les données du bilan d’hiver")
        + BE.renvoi('Le tableau d’une pièce se fait à <a href="../t3-deperditions-local/index.html">la station T3</a>, H air à <a href="../t4-deperditions-air/index.html">la station T4</a>.')
    }),

    BE.ecran({
      id: "quatre-postes", dossier: "methode", kicker: "La méthode, 1", title: "Les quatre postes du bilan", level: "comprendre",
      text: "Le bilan d’hiver additionne trois coefficients de déperdition, en W/K : H parois, la transmission par les parois et les baies ; H ponts, la transmission par les ponts thermiques ; H air, le renouvellement d’air. Leur somme H, multipliée par l’écart de température ΔT, donne Φ base, la puissance perdue par le bâtiment par le froid de base. Le quatrième poste, la relance, s’ajoute à Φ base pour remonter en température après l’allure réduite de la nuit. On obtient la puissance à installer. Les H s’écrivent au centième de W/K, les puissances en watts entiers (0,5 W et plus s’arrondit au watt du dessus), le ratio au dixième, la puissance à installer au dixième de kW au-dessus.",
      prompt: "Suivez les flèches du schéma, lisez les formules et leurs unités, puis continuez.",
      render: () => BE.schema("illustrations/schema-quatre-postes.svg", "Schéma de principe. Une maison en coupe, avec un radiateur dans la pièce. Dehors, la température est θe ; dedans, θi. Trois flèches orange sortent de la maison. Deux flèches traversent le mur et la fenêtre vers la droite : H parois, parois et baies. Une flèche part du coin entre le mur et le plancher, marqué d’un cercle en pointillé : H ponts, ponts thermiques. Une flèche sort par le toit : H air, renouvellement d’air ; en face, une flèche en pointillé fait entrer l’air neuf à θe. Sous la maison : ΔT = θi − θe, l’écart de température. En bas, trois cases reliées par des flèches : H = H parois + H ponts + H air ; la flèche × ΔT mène à Φ base, en W ; la flèche + relance mène à la puissance à installer.", "Trois flux sortent de la maison. Leur somme H, multipliée par ΔT, donne Φ base ; la relance s’y ajoute.")
        + tableau(["Étape", "Formule", "Unité"], [
        ["1", "H = H parois + H ponts + H air", "W/K"],
        ["2", "ΔT = θi − θe", "K"],
        ["3", "Φ base = H × ΔT", "W"],
        ["4", "Relance = forfait × Φ base", "W"],
        ["5", "Puissance à installer = Φ base + relance", "W, puis kW"]
      ], "Le bilan d’hiver en cinq étapes")
        + BE.renvoi("H parois et H ponts forment la transmission du bâtiment : règles Th-Bât 2017, fascicule Généralités, § 4.3, formule 3, p. 16 et 17.")
    }),

    BE.ecran({
      id: "deux-sommes", dossier: "methode", kicker: "La méthode, 2", title: "Additionner les parois : par local ou par familles", level: "comprendre",
      text: `H parois se calcule de deux façons. Par local : on reprend le tableau de chaque pièce chauffée (station T3) et on additionne les H des pièces. Par familles de parois : on additionne les surfaces de toutes les parois de même nature (tous les murs extérieurs, toutes les fenêtres…) et on fait une ligne U × A × b par famille. b vaut 1 pour une paroi sur l’extérieur ou sur le sol, porte d’entrée et plancher bas compris ; une paroi sur un local non chauffé prend le b de ce local (station T3). La somme par local donne le détail pièce par pièce, utile pour choisir chaque émetteur. La somme par familles va plus vite et sert de contrôle. Les deux donnent le même total, aux arrondis près. Le bâtiment d’exemple compte trois locaux chauffés, avec θi = ${EX.T.ti} °C et θe = ${EX.T.te} °C, valeurs d’exercice.`,
      prompt: "Suivez les deux chemins du schéma, comparez les deux tableaux du bâtiment d’exemple, puis continuez.",
      render: () => BE.schema("illustrations/schema-deux-sommes.svg", `Schéma de principe, bâtiment d’exemple, en W/K. À gauche, « Par local » : trois cases, ${EX.locaux.map(l => `${l.nom} ${l.H}`).join(", ")}, puis la somme par locaux, ${EX.Hpieces}. À droite, « Par familles de parois » : six cases, ${EX.fam.map(f => `${f.nom.toLowerCase()} ${f.UAb}`).join(", ")}, puis la somme par familles, ${EX.Hfam}. Une accolade orange sous les deux sommes : même total, aux arrondis près, écart de ${EX.ecartSommes} W/K.`, "Deux chemins, un seul H parois : la somme par familles contrôle la somme par locaux.")
        + tableau(["Local chauffé", "Surface habitable (m²)", "H parois (W/K)"], [
        ...EX.locaux.map(l => [l.nom, l.hab, l.H]),
        ["Somme par locaux", EX.hab, EX.Hpieces]
      ], "Par local : le H de chaque pièce vient de son tableau (station T3)")
        + tableau(["Famille de parois", "A (m²)", "U", "b", "U × A × b (W/K)"], [
          ...EX.fam.map(f => [f.nom, f.A, f.U, f.b, f.UAb]),
          ["Somme par familles", "", "", "", EX.Hfam]
        ], "Par familles : une ligne par nature de paroi")
        + BE.renvoi(`L’écart de ${EX.ecartSommes} W/K vient des lignes arrondies au centième. Un écart de plusieurs W/K signale une paroi oubliée ou comptée deux fois.`)
    }),

    BE.ecran({
      id: "ponts-thermiques", dossier: "methode", kicker: "La méthode, 3", title: "Les ponts thermiques", level: "comprendre",
      text: `Un pont thermique est un endroit de l’enveloppe où la chaleur passe davantage qu’à travers la paroi courante : la liaison d’un plancher avec un mur, le tour d’une fenêtre, un angle. Les règles Th-Bât les ajoutent à la transmission par une somme de ψ × l : Σ veut dire « somme de ». ψ, en W/(m.K), est le coefficient du pont thermique de la liaison, l est sa longueur en mètres ; χ, en W/K, est le coefficient d’un pont thermique ponctuel. Ce calcul détaillé demande la valeur de ψ de chaque liaison, donnée par un autre fascicule des règles. Quand le projet ne la fournit pas encore, le bureau d’études compte les ponts thermiques en forfait, un pourcentage de H parois fixé par la commande. Le bâtiment d’exemple prend ${EX.pontsPc} %, valeur d’exercice.`,
      prompt: "Regardez sur le schéma où la chaleur contourne l’isolant, lisez l’exemple résolu et les sources, puis continuez.",
      render: () => BE.schema("illustrations/schema-pont-thermique.svg", "Schéma de principe : coupe d’un mur en béton isolé par l’intérieur, à l’endroit où un plancher en béton le rejoint. Le local chauffé, à θi, est à gauche ; dehors, à θe, à droite. Dans le mur, l’isolant est du côté du local et le béton du côté du dehors. Le plancher en béton traverse l’isolant et touche le mur en béton. Une flèche orange fine traverse le mur au-dessus du plancher : paroi courante, l’isolant freine. Trois flèches orange épaisses traversent le plancher puis le béton du mur : pont thermique, le flux passe par le béton et contourne l’isolant. En bas : chaque liaison compte ψ × l, ψ en W/(m.K), l sa longueur en m.", "Au plancher, la chaleur passe par le béton et contourne l’isolant : c’est un pont thermique.")
        + tableau(["Ce que disent les règles Th-Bât", "Source"], [
        ["La transmission du bâtiment compte les parois (Σ U × A × b), les liaisons (Σ ψ × l × b) et les points singuliers (Σ χ × b)", "Généralités, § 4.3, formule 3, p. 16 et 17"],
        ["Une liaison dont ψ est inférieur à 0,03 W/(m.K) peut être négligée", "Généralités, § 3.4, p. 13"],
        ["Une liaison dont une paroi donne sur l’extérieur ou le sol est comptée sur l’extérieur", "Généralités, § 3.4, p. 13"]
      ], "Les ponts thermiques dans les règles Th-Bât")
        + exemplePonts()
        + BE.alerte("<strong>Piège.</strong> Le forfait multiplie H parois. Appliqué à H parois + H air, il compte des ponts thermiques sur l’air, ce qui n’a pas de sens.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, les ponts thermiques", title: "Exercice : ajouter les ponts thermiques", level: "appliquer", requiresAction: true,
      text: {
        1: `Un atelier d’exemple a H parois = ${EX.ex1.Hp} W/K et H air = ${EX.ex1.Hair} W/K. La commande compte les ponts thermiques en forfait de ${EX.ex1.pontsPc} % de H parois. Calculez H ponts, puis H parois + H ponts. L’exemple résolu reste sous vos yeux : refaites le même geste.`,
        2: `Un atelier d’exemple a H parois = ${EX.ex1.Hp} W/K et H air = ${EX.ex1.Hair} W/K. La commande compte les ponts thermiques en forfait de ${EX.ex1.pontsPc} % de H parois. Calculez H ponts, puis H parois + H ponts, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne H ponts et H parois + H ponts, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne H ponts et H parois + H ponts. Cette question est à faire seul." },
      aides: {
        1: ["Les valeurs sont dans l’énoncé. La méthode est à l’écran « Les ponts thermiques », dans l’exemple résolu.", `H ponts = forfait × H parois, avec le forfait écrit en nombre décimal : ${EX.ex1.pontsPc} % s’écrit ${EX.ex1.pontsDec}. H air n’entre pas dans ce calcul.`, `Sur le bâtiment d’exemple : ${EX.pontsDec} × ${EX.Hp} = ${EX.Hpt} W/K, puis ${EX.Hp} + ${EX.Hpt} = ${EX.HpHpt} W/K. Faites les deux mêmes lignes avec H parois de l’atelier.`],
        2: ["L’énoncé donne tout. La méthode est à l’écran « Les ponts thermiques ».", "Le forfait multiplie H parois seul. Écrivez le pourcentage en nombre décimal, puis ajoutez le résultat à H parois.", `Pour un forfait de ${EX.ex1.pontsPc} %, on multiplie par ${EX.ex1.pontsDec}. Commencez par ${EX.ex1.pontsDec} × ${EX.ex1.Hp}.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exemplePonts(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),

    BE.ecran({
      id: "air", dossier: "methode", kicker: "La méthode, 4", title: "Le renouvellement d’air dans le bilan", level: "comprendre",
      text: `L’air neuf qui entre dans le bâtiment arrive à la température extérieure et doit être chauffé jusqu’à θi. La station T4 calcule son coefficient : H air = 0,34 × qv, avec qv le débit d’air neuf en m³/h et 0,34 en Wh/(m³.K). Le résultat est en W/K, comme H parois. La station T4 partage aussi qv entre les pièces principales, où l’air neuf entre : le séjour, cuisine ouverte comprise, et les chambres. Les pièces de service et les circulations reçoivent 0. Dans le bilan, vous reprenez de votre feuille de la station T4 la part d’air de chaque pièce et H air du bâtiment, leur somme : il se compte une seule fois. Le bâtiment d’exemple a qv = ${EX.qv} m³/h. Le débit de cet exemple, partagé au prorata du volume par la station T4 (${EX.locaux[0].qv} m³/h au bureau, ${EX.locaux[1].qv} m³/h à la salle de réunion), est une valeur d’exercice, plus faible que le minimum du Code du travail (art. R. 4222-6) : 30 m³/h par occupant en salle de réunion, soit 240 m³/h pour huit personnes. Le bâtiment du projet tertiaire applique ce minimum.`,
      prompt: "Suivez le chemin de l’air sur le schéma, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-chemin-air.svg", "Schéma de principe. À gauche, l’extérieur : une flèche « air neuf à θe » entre dans le rectangle des pièces principales, séjour et chambres, avec leurs entrées d’air. Une flèche descend vers le rectangle des pièces de service, cuisine, salle d’eau et WC, avec la mention « air de transfert, déjà à θi ». Une flèche sort des pièces de service vers la droite : « air rejeté par la VMC ».", "Le chemin de l’air, repris de la station T4 : l’air neuf n’entre que dans les pièces principales.")
        + tableau(["Formule", "Unités"], [["H air = 0,34 × qv", "W/K = Wh/(m³.K) × m³/h"], ["Φ air = H air × ΔT", "W = W/K × K"]])
        + exempleAir()
        + tableau(["Local", "Part de qv (m³/h)", "Φ air du local (W)"], EX.locaux.map(l => [l.nom, l.qv, l.air]), "Part d’air des locaux du bâtiment d’exemple (station T4)")
        + BE.renvoi(`La somme des parts, ${EX.locaux.map(l => l.air).join(" + ")} W, redonne Φ air du bâtiment à l’arrondi près. Le coefficient 0,34 vient des règles Th-Bât, fascicule Généralités, § 5.1, p. 18.`)
        
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, l’air", title: "Exercice : le renouvellement d’air d’un atelier", level: "appliquer", requiresAction: true,
      text: {
        1: `L’atelier d’exemple reçoit qv = ${EX.ex2.qv} m³/h d’air neuf. L’écart de température est celui du bâtiment d’exemple, ΔT = ${EX.T.dT} K. Calculez H air, puis Φ air. L’exemple résolu reste sous vos yeux.`,
        2: `L’atelier d’exemple reçoit qv = ${EX.ex2.qv} m³/h d’air neuf. L’écart de température est celui du bâtiment d’exemple, ΔT = ${EX.T.dT} K. Calculez H air, puis Φ air, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne H air et Φ air, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne H air et Φ air. Cette question est à faire seul." },
      aides: {
        1: ["qv et ΔT sont dans l’énoncé. La formule est à l’écran « Le renouvellement d’air dans le bilan ».", "H air = 0,34 × qv, avec qv en m³/h : le résultat est en W/K. Φ air = H air × ΔT : le résultat est en W.", `Sur le bâtiment d’exemple : 0,34 × ${EX.qv} = ${EX.Hair} W/K, puis ${EX.Hair} × ${EX.T.dT} = ${EX.phiAir} W. Faites les deux mêmes lignes avec ${EX.ex2.qv} m³/h.`],
        2: ["Les formules sont à l’écran « Le renouvellement d’air dans le bilan ».", "Deux lignes : le coefficient H air en W/K, puis la puissance Φ air en W.", `Commencez par 0,34 × ${EX.ex2.qv}, sans convertir le débit.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleAir(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "phi-base", dossier: "methode", kicker: "La méthode, 5", title: "Exemple résolu : Φ base du bâtiment d’exemple", level: "comprendre",
      text: `Voici le bilan du bâtiment d’exemple jusqu’à Φ base. H parois est la somme par locaux de l’écran « Additionner les parois ». H ponts vient du forfait de ${EX.pontsPc} %, H air de qv = ${EX.qv} m³/h. Φ base est la puissance que le bâtiment perd par le froid de base, θe = ${EX.T.te} °C, quand l’intérieur est à ${EX.T.ti} °C. La dernière colonne donne la part de chaque poste : elle montre où la chaleur s’en va.`,
      prompt: "Suivez le tableau ligne par ligne, regardez la barre du schéma, puis lisez le piège.",
      render: () => tableau(["Poste", "Calcul", "Valeur", "Part de Φ base"], [
        ["H parois (W/K)", "somme par locaux", EX.Hp, EX.part.parois],
        ["H ponts (W/K)", `${EX.pontsDec} × ${EX.Hp}`, EX.Hpt, EX.part.ponts],
        ["H air (W/K)", `0,34 × ${EX.qv}`, EX.Hair, EX.part.air],
        ["H (W/K)", `${EX.Hp} + ${EX.Hpt} + ${EX.Hair}`, EX.H, ""],
        ["ΔT (K)", `${EX.T.ti} − (${EX.T.te})`, EX.T.dT, ""],
        ["Φ base (W)", `${EX.H} × ${EX.T.dT}`, EX.base, "100 %"]
      ], "Bilan du bâtiment d’exemple jusqu’à Φ base")
        + BE.schema("illustrations/schema-parts-phi-base.svg", `Schéma de principe, bâtiment d’exemple, ΔT = ${EX.T.dT} K. Une barre horizontale représente Φ base, ${EX.base} W. Elle est coupée en trois parts : H parois, ${EX.part.parois} ; H ponts, ${EX.part.ponts}, la part étroite du milieu ; H air, ${EX.part.air}. Sous la barre, une accolade pour H parois et H ponts : ${EX.sansAir} W sans H air ; une accolade pour H air : Φ air = ${EX.phiAir} W ; une accolade sous toute la barre : Φ base = ${EX.base} W.`, "La chaleur se partage en trois parts. Les parts sont arrondies : leur somme fait 99 %.")
        + BE.alerte(`<strong>Piège.</strong> Sans H air, Φ base tombe de ${EX.base} W à ${EX.sansAir} W : le renouvellement d’air pèse autant qu’une famille entière de parois.`)
    }),

    BE.ecran({
      id: "relance", dossier: "methode", kicker: "La méthode, 6", title: "La relance après l’allure réduite", level: "comprendre",
      text: "La nuit, la consigne descend à l’allure réduite : la maison du projet passe de 20 °C à 17 °C (station E2). Le matin, l’installation doit remonter à 20 °C en un temps raisonnable : il lui faut une puissance de plus que Φ base, la surpuissance de relance. Le bureau d’études la compte en forfait, un pourcentage de Φ base fixé par la commande. On ajoute la relance à Φ base, puis on arrondit la puissance à installer au dixième de kW au-dessus.",
      prompt: "Suivez les deux courbes du schéma, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-relance.svg", "Schéma de principe sur 24 heures, sans échelle : deux graphiques l’un sous l’autre, découpés en quatre périodes, confort, allure réduite, relance, confort. En haut, la température dans la maison : 20 °C en confort ; elle descend lentement jusqu’à 17 °C pendant l’allure réduite, reste à 17 °C, puis remonte vite à 20 °C pendant la relance. En bas, la puissance de chauffage : égale à Φ base en confort, elle tombe très bas quand l’allure réduite commence, remonte à un niveau moyen pour tenir 17 °C, puis dépasse Φ base pendant la relance, dans une case orange : Φ base + relance, c’est la puissance à installer. Elle revient à Φ base quand 20 °C est retrouvé.", "La nuit, le chauffage baisse ; le matin, il dépasse Φ base le temps de la relance.")
        + exempleRelance()
        + BE.alerte(`<strong>Piège.</strong> Arrondir en dessous donne une installation trop juste par le froid de base : ${EX.P} W s’arrondit à ${EX.PkW} kW, pas à ${EX.PkWbas} kW.`)
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, la puissance à installer", title: "Exercice : de Φ base à la puissance à installer", level: "appliquer", requiresAction: true,
      image: "illustrations/2-atelier-froid-relance.webp", imageAlt: "Un atelier froid très tôt le matin, sans personne. Une lumière bleu pâle entre par de hautes fenêtres givrées. Sous elles, trois radiateurs à eau le long du mur : le plus proche commence à chauffer, des lignes ondulées orange montent de lui. Deux établis, un panneau d’outils et un thermomètre à cadran dont l’aiguille est basse.",
      text: {
        1: `L’atelier d’exemple a Φ base = ${EX.ex3.base} W. La commande fixe la relance à ${EX.ex3.relPc} % de Φ base. Calculez la relance, puis la puissance à installer arrondie au dixième de kW au-dessus. L’exemple résolu reste sous vos yeux.`,
        2: `L’atelier d’exemple a Φ base = ${EX.ex3.base} W. La commande fixe la relance à ${EX.ex3.relPc} % de Φ base. Calculez la puissance à installer arrondie au dixième de kW au-dessus, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la puissance à installer, en vous aidant de l’exemple.", 2: "Choisissez la puissance à installer. Cette question est à faire seul." },
      aides: {
        1: ["Φ base et le forfait sont dans l’énoncé. La méthode est à l’écran « La relance après l’allure réduite ».", `Relance = ${EX.ex3.relDec} × Φ base. Puissance = Φ base + relance, en W, puis en kW arrondis au dixième au-dessus.`, `Sur le bâtiment d’exemple : ${EX.relDec} × ${EX.base} = ${EX.rel} W, ${EX.base} + ${EX.rel} = ${EX.P} W, soit ${EX.PkW} kW. Faites les mêmes lignes avec ${EX.ex3.base} W.`],
        2: ["La méthode est à l’écran « La relance après l’allure réduite ».", "Trois lignes : la relance en W, la puissance en W, la puissance arrondie en kW.", `Commencez par ${EX.ex3.relDec} × ${EX.ex3.base}.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleRelance(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "ce-qui-ne-compte-pas", dossier: "methode", kicker: "La méthode, 7", title: "Ce qui ne compte pas dans le bilan d’hiver", level: "comprendre",
      image: "illustrations/3-maison-nuit-hiver.webp", imageAlt: "Une maison à deux niveaux vue de dehors, la nuit en hiver, dans un jardin sous la neige. Un garage est accolé à droite. Toutes les fenêtres sont sombres : personne, aucune lampe, aucun soleil. Quelques lignes ondulées orange sortent par les murs et le toit de la partie chauffée, à gauche ; le garage et le comble n’en ont pas.",
      text: "Le bilan d’hiver se calcule pour le cas le plus défavorable : la nuit par le froid de base, sans soleil, sans occupants, sans appareils allumés. Ces apports de chaleur, dits gratuits, ne se retranchent pas de la puissance à installer : ils comptent au bilan d’été et à l’énergie consommée sur l’année. Les locaux non chauffés, comme le garage et le comble, n’ont pas de ligne dans le tableau local par local : ils agissent seulement par le coefficient b des parois qui les touchent.",
      prompt: "Lisez les deux cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Compte dans le bilan", rows: [["Les parois et les baies :", "H parois, avec b pour les locaux non chauffés."], ["Les ponts thermiques :", "H ponts."], ["L’air neuf :", "H air de la station T4."], ["La relance :", "le forfait de la commande."]] },
        { title: "Ne compte pas", rows: [["Le soleil, les occupants, les appareils :", "apports gratuits, au bilan d’été (stations T6 à T8)."], ["Le garage et le comble :", "pas de ligne, seulement leur b."], ["Les planchers et cloisons entre pièces chauffées :", "même température des deux côtés."]] }
      ])
    }),

    BE.ecran({
      id: "ratio-batiment", dossier: "methode", kicker: "La méthode, 8", title: "Le ratio en W par m² du bâtiment", level: "comprendre",
      text: `Φ base divisé par la surface habitable du bâtiment donne un ratio en W par m². Il sert à repérer une erreur grossière, et à comparer des pièces entre elles dans le tableau local par local. Dans ce tableau, Φ du local est la somme de (H parois + H ponts) × ΔT et de sa part d’air de la station T4 ; la somme des Φ des locaux redonne Φ base à l’arrondi près. Une pièce dont le ratio s’écarte nettement des autres se vérifie : paroi oubliée, baie comptée deux fois, mauvais b, part d’air oubliée.`,
      prompt: "Lisez l’exemple résolu et le tableau des locaux, puis continuez.",
      render: () => BE.exemple({ text: `Bâtiment d’exemple : Φ base = ${EX.base} W, surface habitable ${EX.hab} m²`, answer: `${EX.base} ÷ ${EX.hab} = ${EX.ratio} W/m²`, why: "Le ratio s’écrit au dixième. Il compare des bâtiments ou des pièces calculés avec les mêmes températures." })
        + tableau(["Local", "(H parois + H ponts) × ΔT (W)", "Φ air (W)", "Φ du local (W)", "Ratio (W/m²)"], [...EX.locaux.map(l => [l.nom, l.phi, l.air, l.local, l.ratio]), ["Somme des locaux", "", "", EX.sommeLocaux, ""]], "Le tableau local par local du bâtiment d’exemple")
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 9", title: "La première page de la note de calcul", level: "comprendre",
      text: "Le bureau d’études rend son bilan dans une note de calcul. Sa première page donne à un lecteur de quoi refaire le calcul : l’objet, les données d’entrée avec leur source, les hypothèses, la méthode, les résultats. Une hypothèse est une valeur choisie faute de donnée, comme le forfait des ponts thermiques : elle s’écrit comme telle. Voici la première page de la note du bâtiment d’exemple, en six lignes.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Bilan d’hiver et puissance de chauffage à installer, petit bâtiment de bureaux de plain-pied, trois locaux chauffés"],
        ["Données d’entrée", `θi = ${EX.T.ti} °C et θe = ${EX.T.te} °C (valeurs d’exercice) ; surfaces, U et b des stations T1 à T3 ; qv = ${EX.qv} m³/h (station T4)`],
        ["Hypothèses", `Ponts thermiques : forfait de ${EX.pontsPc} % de H parois ; relance : ${EX.relPc} % de Φ base (données de l’exercice)`],
        ["Méthode", "H = H parois + H ponts + H air ; Φ base = H × ΔT ; puissance = Φ base + relance (règles Th-Bât, Généralités, § 4.3)"],
        ["Résultats", `H = ${EX.H} W/K ; Φ base = ${EX.base} W ; ${EX.ratio} W/m²`],
        ["Puissance à installer", `${EX.PkW} kW`]
      ], "Première page de la note de calcul, bâtiment d’exemple")
        + BE.renvoi("La note complète du projet s’assemble à la station R5, « La note de calcul ».")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

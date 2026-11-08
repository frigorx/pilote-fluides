/* Station BE-F3 : la machine au réel.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5 à F2 (la salle de réunion et ses trois unités sont résolues à l'écran ;
   le bâtiment entier et ses deux unités sont la commande du niveau 1), puis commande du niveau 2 sur la maison et volet tertiaire (le groupe
   d'eau glacée du bâtiment de bureaux, feuille à part). Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc
   FOURCHETTES) sont écrites par outils/stations/f3-machine-conditions-reelles/construire.mjs, à partir d'exemple-data.mjs (CoolProp pour le
   R32) et de corriges/f3-machine-conditions-reelles/reference-machine-reel.json (outils/f3-machine-maison.mjs). Tolérances : ± 3 % sur un
   calcul, ± 0,3 % sur un coefficient lu dans le tableau. Aucune valeur calculée de la maison ni du bâtiment tertiaire n'est écrite dans
   cette station : seules les bornes des fourchettes, les catalogues de l'exercice et les données des commandes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

/*EXEMPLE-DEBUT*/
const EX = {
 "rep": {
  "ext": "35",
  "int": "27"
 },
 "ecarts": {
  "ev": "21",
  "co": "12"
 },
 "pointe": "40",
 "site": {
  "ext": "32",
  "int": "26"
 },
 "int": [
  "25",
  "26",
  "27"
 ],
 "table": [
  {
   "ext": "25",
   "C": [
    "1,017",
    "1,050",
    "1,084"
   ]
  },
  {
   "ext": "30",
   "C": [
    "0,978",
    "1,010",
    "1,042"
   ]
  },
  {
   "ext": "32",
   "C": [
    "0,962",
    "0,994",
    "1,026"
   ]
  },
  {
   "ext": "33",
   "C": [
    "0,954",
    "0,985",
    "1,017"
   ]
  },
  {
   "ext": "35",
   "C": [
    "0,938",
    "0,969",
    "1,000"
   ]
  },
  {
   "ext": "38",
   "C": [
    "0,914",
    "0,943",
    "0,974"
   ]
  },
  {
   "ext": "40",
   "C": [
    "0,897",
    "0,926",
    "0,956"
   ]
  },
  {
   "ext": "43",
   "C": [
    "0,871",
    "0,900",
    "0,929"
   ]
  },
  {
   "ext": "46",
   "C": [
    "0,845",
    "0,873",
    "0,901"
   ]
  }
 ],
 "cyc": {
  "te": "5",
  "tc32": "44",
  "tc40": "52",
  "h1": "522",
  "h3_32": "273",
  "h3_40": "290",
  "e32": "249",
  "e40": "232",
  "baisse": "6,8"
 },
 "courbe": [
  {
   "t": "25",
   "P": "3780"
  },
  {
   "t": "30",
   "P": "3636"
  },
  {
   "t": "32",
   "P": "3578"
  },
  {
   "t": "33",
   "P": "3546"
  },
  {
   "t": "35",
   "P": "3488"
  },
  {
   "t": "38",
   "P": "3395"
  },
  {
   "t": "40",
   "P": "3334"
  },
  {
   "t": "43",
   "P": "3240"
  },
  {
   "t": "46",
   "P": "3143"
  }
 ],
 "ecran": {
  "besoin": "3449",
  "m": [
   {
    "nom": "UE 34",
    "P": "3400",
    "lim": "−10 à +46",
    "Pr": "3380",
    "part": "98,0"
   },
   {
    "nom": "UE 36",
    "P": "3600",
    "lim": "−10 à +43",
    "Pr": "3578",
    "part": "103,7"
   },
   {
    "nom": "UE 40",
    "P": "4000",
    "lim": "−10 à +46",
    "Pr": "3976",
    "part": "115,3"
   }
  ],
  "ret": "UE 36",
  "min": "3470",
  "Pretrep": "3600",
  "Pret": "3578",
  "C": "0,994",
  "Cp": "0,926",
  "Pp": "3334",
  "perte": "6,8",
  "lim1": "+43"
 },
 "n1": {
  "besoin": "4441",
  "m": [
   {
    "nom": "UE 45",
    "P": "4450",
    "lim": "−10 à +46"
   },
   {
    "nom": "UE 52",
    "P": "5200",
    "lim": "−10 à +46"
   }
  ]
 },
 "maison": {
  "m": [
   {
    "nom": "MS 68",
    "P": "6800",
    "lim": "−10 à +46"
   },
   {
    "nom": "MS 71",
    "P": "7100",
    "lim": "−5 à +38"
   },
   {
    "nom": "MS 80",
    "P": "8000",
    "lim": "−10 à +46"
   }
  ]
 },
 "ter": {
  "regime": "7/12",
  "depart": "7",
  "retour": "12",
  "glycol": "monopropylène glycol à 30 %",
  "rep": {
   "air": "35",
   "eau": "7/12"
  },
  "ecartEau": "5",
  "glycolK": "1",
  "Cg": "0,968",
  "Cair": "1,026",
  "ext": "32",
  "table": [
   {
    "ext": "25",
    "C": "1,084"
   },
   {
    "ext": "30",
    "C": "1,043"
   },
   {
    "ext": "32",
    "C": "1,026"
   },
   {
    "ext": "33",
    "C": "1,017"
   },
   {
    "ext": "35",
    "C": "1,000"
   },
   {
    "ext": "38",
    "C": "0,974"
   },
   {
    "ext": "40",
    "C": "0,956"
   },
   {
    "ext": "43",
    "C": "0,929"
   },
   {
    "ext": "46",
    "C": "0,901"
   }
  ],
  "noyau": {
   "besoin": "5125",
   "m": [
    {
     "nom": "GE 50",
     "P": "5000",
     "Pe": "5130",
     "Pg": "4966"
    },
    {
     "nom": "GE 60",
     "P": "6000",
     "Pe": "6156",
     "Pg": "5959"
    }
   ],
   "ret": "GE 60"
  },
  "m": [
   {
    "nom": "GE 97",
    "P": "9700",
    "lim": "−10 à +46",
    "qv": "1,66"
   },
   {
    "nom": "GE 112",
    "P": "11200",
    "lim": "−10 à +46",
    "qv": "1,92"
   },
   {
    "nom": "GE 130",
    "P": "13000",
    "lim": "−10 à +46",
    "qv": "2,23"
   }
  ],
  "commande": "Le bâtiment de bureaux demande 9900 W de froid à l’heure de pointe, 14 h, avec simultanéité (dossier du bâtiment). Conditions : 32 °C dehors (extrait de CCTP, page 1). Production : groupe d’eau glacée air/eau au sol, façade nord, régime 7/12, eau glycolée, monopropylène glycol à 30 %, un étage (extrait de CCTP, page 3). Fluide du groupe : R32 (donnée de l’exercice). Le catalogue de l’exercice propose trois groupes : GE 97, GE 112, GE 130. Pointe d’été à tenir : 40 °C dehors (donnée de l’exercice ; la température du comble, à la page 1 du CCTP, n’est pas celle de l’air du dehors). Corrigez chacun à la température du dehors, puis au glycol, et vérifiez que sa plage contient la pointe. Retenez le plus petit qui couvre le besoin et tient la pointe, et relevez son débit d’eau au repère, pour la station F5. Justifiez votre choix en une demi-page."
 },
 "ex1": {
  "P": "5000",
  "ext": "38",
  "int": "25",
  "quiz": {
   "choices": [
    "5000 W",
    "4570 W",
    "4870 W",
    "5470 W"
   ],
   "good": 1,
   "explain": "Ligne 38 °C, colonne 25 °C : le coefficient vaut 0,914 ; 5000 × 0,914 = 4570 W. 5000 W est la puissance de repère, sans correction. 4870 W prend la colonne 27 °C, celle du repère, au lieu du dedans du local. 5470 W divise par le coefficient au lieu de multiplier."
  }
 },
 "ex2": {
  "besoin": "2800",
  "ext": "30",
  "int": "26",
  "pointe": "43",
  "C": "1,010",
  "m": [
   {
    "nom": "UE 26",
    "P": "2600",
    "lim": "−10 à +46"
   },
   {
    "nom": "UE 28",
    "P": "2800",
    "lim": "−10 à +40"
   },
   {
    "nom": "UE 32",
    "P": "3200",
    "lim": "−10 à +46"
   }
  ],
  "quiz": {
   "choices": [
    "UE 26 : 2626 W au réel",
    "UE 28 : 2828 W au réel, la plus petite qui couvre le besoin",
    "UE 32 : 3232 W au réel, et 43 °C est dans sa plage",
    "UE 28 : sa puissance de repère égale le besoin"
   ],
   "good": 2,
   "explain": "UE 26 donne 2626 W au réel : moins que les 2800 W du local. UE 28 couvre le besoin avec 2828 W, mais sa plage s’arrête à +40 °C : un jour à 43 °C, elle s’arrête en sécurité. Sa puissance de repère ne compte pas non plus. UE 32 donne 3232 W et tient jusqu’à +46 °C : c’est la plus petite qui remplit les deux conditions."
  }
 },
 "ex3": {
  "P": "8000",
  "ext": "30",
  "Cair": "1,043",
  "Cg": "0,968",
  "quiz": {
   "choices": [
    "8344 W",
    "7744 W",
    "8000 W",
    "8077 W"
   ],
   "good": 3,
   "explain": "8000 × 1,043 = 8344 W en eau pure, puis × 0,968 = 8077 W avec le glycol. 8344 W oublie le glycol ; 7744 W oublie la correction du dehors, qui fait gagner ici ; 8000 W ne corrige rien."
  }
 },
 "pac4": {
  "froid": "3600",
  "cond": "35 °C dehors, eau à 7 °C",
  "part": "53",
  "cat": [
   "2480",
   "2800",
   "3000",
   "3200",
   "3280",
   "4000",
   "4400"
  ],
  "Pm2": "3200",
  "Pp2": "3280",
  "P7": "4000",
  "gain1": "80",
  "gain2": "720"
 }
};
/*EXEMPLE-FIN*/

const E = EX.ecran, N1 = EX.n1, MA = EX.maison, T = EX.ter, X1 = EX.ex1, X2 = EX.ex2, X3 = EX.ex3;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const coefTable = () => tableau(["Dehors (°C)", ...EX.int.map(t => `${t} °C dedans`)], EX.table.map(l => [l.ext, ...l.C]), `Coefficient de correction de la gamme de l’exercice (repère : ${EX.rep.ext} °C dehors, ${EX.rep.int} °C dedans)`);
const catalogue = (liste, legende) => tableau(["Machine", `Puissance de repère (W)`, "Plage en froid, dehors (°C)"], liste.map(m => [m.nom, m.P, m.lim]), legende);
const catGroupes = (liste, legende) => tableau(["Groupe", "Puissance de repère (W)", "Plage, air (°C)", "Débit d’eau au repère (m³/h)"], liste.map(m => [m.nom, m.P, m.lim, m.qv]), legende);
const coefAir = () => tableau(["Dehors (°C)", "Coefficient C_air"], T.table.map(l => [l.ext, l.C]), `Groupes d’eau glacée : coefficient selon l’air du dehors, eau ${T.regime} (repère ${T.rep.air} °C). Eau glycolée : multipliez aussi par C_glycol = ${T.Cg}.`);

const ecranProjet = BE.projet({
    dossier: "projet", kicker: "Le projet, 1",
    aides: {
      1: [
        "Le besoin et les conditions sont dans la commande et sur la feuille. Le catalogue et le tableau des coefficients sont ci-dessous et au verso de la feuille. La méthode est aux écrans « Lire le coefficient et corriger » et « Choisir sur la puissance au réel ».",
        `Ligne ${EX.site.ext} °C, colonne ${EX.site.int} °C : c’est C. Puis, pour chaque unité, P réel = P repère × C et part = P réel ÷ besoin × 100.`,
        `Sur l’exemple, la salle de réunion : C = ${E.C}, ${E.Pretrep} × ${E.C} = ${E.Pret} W. Votre besoin est celui du bâtiment entier, ${N1.besoin} W.`
      ],
      2: [
        "Besoin : votre feuille de la station T8. Conditions : votre feuille de la station F1. Évaporation et condensation : votre feuille de la station F2. Catalogue : ci-dessous. Méthode : écrans « Lire le coefficient et corriger », « Choisir sur la puissance au réel » et « Les limites de fonctionnement » ; pour le tertiaire, « Le glycol se compte deux fois ».",
        "Puissance de repère à demander = besoin ÷ C, arrondie au watt supérieur (exemple résolu à l’écran « Choisir sur la puissance au réel »). Puis chaque unité au réel, sa plage, la plus petite qui convient, et sa puissance le jour de pointe.",
        "Commencez par les écarts : dedans − évaporation et condensation − dehors, sur votre feuille de F2. S’ils valent ceux du catalogue, le tableau des coefficients s’applique."
      ]
    }
  });
const rendreCommande = ecranProjet.render;
const blocNiveau = n => n === 1
  ? `<h3>Le catalogue de l’exercice</h3>` + catalogue(N1.m, `Catalogue de l’exercice, repère ${EX.rep.ext} °C dehors et ${EX.rep.int} °C dedans`) + coefTable()
  : `<h3>Le catalogue de l’exercice</h3>` + catalogue(MA.m, `Catalogue de l’exercice, repère ${EX.rep.ext} °C dehors et ${EX.rep.int} °C dedans`) + coefTable()
    + `<div class="commande"><div class="commande-entete"><span class="tag">Commande du bureau d’études</span><span class="commande-volet">Volet tertiaire, feuille à part</span></div><div class="commande-corps"><p>${BE.esc(T.commande)}</p></div>`
    + `<p class="commande-actions"><a class="primary-button lien-feuille" href="feuille-N2-tertiaire.html" target="_blank" rel="noopener">Remplir la feuille du volet tertiaire, puis l’imprimer</a></p></div>`
    + catGroupes(T.m, `Catalogue de l’exercice : groupes d’eau glacée, repère air ${T.rep.air} °C, eau ${T.rep.eau}`) + coefAir()
    + BE.liens([{ href: "../../fil-rouge/tertiaire/cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment de bureaux", note: "Conditions d’été page 1, production de froid page 3" }]);
ecranProjet.render = () => { const html = rendreCommande(); if (html.includes("partie-reservee")) return html; return html + blocNiveau(html.includes("niveau autonome") ? 2 : 1); };

BE.station({
  code: "BE-F3",
  titre: "La machine au réel",
  ligne: "Frigorifique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bâtiment d’exemple, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, puis le bâtiment de bureaux", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Un catalogue donne la puissance d’une machine à des conditions de repère. Le projet a les siennes : la température du dehors et celle du dedans, ou celle de l’eau glacée. Vous corrigez la puissance du catalogue aux conditions réelles, vous vérifiez les limites de fonctionnement, puis vous retenez la machine qui couvre le besoin.",
  note: "Les catalogues de la station sont fictifs, sans marque : ils sont tirés d’un cycle du R32 calculé par CoolProp, bibliothèque libre de propriétés des fluides. Leurs conditions de repère, les écarts de température du cycle et la pointe d’été à tenir sont des données de l’exercice.",

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
      objet: "Choisir l’unité extérieure du bâtiment d’exemple aux conditions réelles",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bâtiment d’exemple entier doit recevoir ${N1.besoin} W de froid (station T8, avec simultanéité), à ${EX.site.ext} °C dehors et ${EX.site.int} °C dedans. Pointe d’été à tenir : ${EX.pointe} °C (donnée de l’exercice). Deux unités extérieures du catalogue de l’exercice sont possibles : ${N1.m[0].nom} et ${N1.m[1].nom}. Suivez les étapes dans l’ordre.`,
        "Étape 1, exercice 1 de la feuille (recto). Relevez dans le catalogue (verso de la feuille, ou ci-dessous) la puissance de repère et la plage de chaque unité, et les conditions de repère.",
        "Étape 2, exercice 2 de la feuille (recto). Lisez le coefficient de correction à la ligne du dehors et à la colonne du dedans du projet.",
        "Étape 3, exercice 3 de la feuille (recto). Calculez la puissance au réel de chaque unité, au watt, et la part du besoin qu’elle couvre, au dixième de %.",
        "Étape 4, exercice 4 de la feuille (verso). Retenez une unité et justifiez en deux lignes. Vérifiez vos résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Besoin et conditions", ou: "Cette commande, reprise sur la feuille" },
        { piece: "Catalogue de l’exercice et coefficients", ou: "Ci-dessous, et au verso de la feuille ; écran « Lire le coefficient et corriger »" },
        { piece: "Méthode et exemple résolu", ou: "Écrans « Lire le coefficient et corriger » et « Choisir sur la puissance au réel »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Variante de rafraîchissement de la maison : l’unité extérieure du multisplit au réel",
      delai: "Rendu en fin de séance",
      commande: `Le multisplit au R32 retenu à la station F1 doit fournir la puissance frigorifique de la maison, votre résultat de la station T8 (avec simultanéité), aux conditions d’été de la station F1. Reprenez sur votre feuille de la station F2 l’évaporation et la condensation du cycle, et vérifiez les deux écarts du catalogue (dedans − évaporation = ${EX.ecarts.ev} K, condensation − dehors = ${EX.ecarts.co} K). Le catalogue de l’exercice propose trois unités extérieures : ${MA.m.map(m => m.nom).join(", ")}. Pointe d’été à tenir : ${EX.pointe} °C (donnée de l’exercice). Lisez le coefficient du projet, calculez la puissance de repère qu’il faudrait au moins demander, corrigez les trois unités, vérifiez leur plage, retenez-en une et donnez sa puissance le jour de pointe. Rédigez la première page de la note de calcul. Puis traitez le volet tertiaire, ci-dessous, sur sa feuille à part.`,
      pieces: [
        { piece: "Votre feuille de la station F2", ou: "Évaporation et condensation du cycle, fluide" },
        { piece: "Votre feuille de la station F1", ou: "Conditions d’été, système retenu" },
        { piece: "Votre feuille de la station T8", ou: "Puissance de la machine, avec simultanéité" },
        { piece: "Catalogue de l’exercice et coefficients", ou: "Ci-dessous, et sur la feuille : catalogue au recto, coefficients au verso" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-c", libelle: "Coefficient de correction au site", unite: "", min: 0.991, max: 0.997, indice: "Relisez l’écran « Lire le coefficient et corriger » : ligne de la température du dehors du projet, colonne de celle du dedans. Au millième, tel qu’écrit dans le tableau." },
      { id: "n1-ue45", libelle: "Puissance au réel de l’UE 45", unite: "W", min: 4290, max: 4556, indice: "Relisez l’écran « Lire le coefficient et corriger » : P réel = P repère × C, avec C lu à la ligne du dehors et à la colonne du dedans du projet. Au watt." },
      { id: "n1-ret", libelle: "Puissance au réel de l’unité retenue", unite: "W", min: 5013, max: 5325, indice: "Relisez l’écran « Choisir sur la puissance au réel » : la plus petite unité dont la puissance au réel couvre le besoin. Donnez sa puissance au réel, au watt." },
      { id: "n1-part", libelle: "Part du besoin couverte par l’unité retenue", unite: "%", min: 112.9, max: 119.9, indice: "Part = P réel ÷ besoin × 100, au dixième de %, pour l’unité retenue. Le besoin est celui du bâtiment entier." }
    ],
    2: [
      { id: "n2-c", libelle: "Coefficient de correction du projet", unite: "", min: 0.982, max: 0.988, indice: "Ligne de la température du dehors du projet, colonne de celle du dedans (station F1). Au millième, tel qu’écrit dans le tableau." },
      { id: "n2-min", libelle: "Puissance de repère à demander au moins", unite: "W", min: 6793, max: 7103, indice: "Relisez l’écran « Choisir sur la puissance au réel » : puissance de repère à demander = besoin ÷ C, arrondie au watt supérieur ; on divise, car la machine perd au réel. Le besoin est votre puissance de la station T8." },
      { id: "n2-ret", libelle: "Puissance au réel de l’unité retenue", unite: "W", min: 7643, max: 8117, indice: "Relisez les écrans « Choisir sur la puissance au réel » et « Les limites de fonctionnement » : la plus petite unité qui couvre le besoin au réel ET dont la plage contient la pointe d’été. Sa puissance au réel, au watt." },
      { id: "n2-part", libelle: "Part du besoin couverte par l’unité retenue", unite: "%", min: 112.5, max: 119.5, indice: "Part = P réel ÷ besoin × 100, au dixième de %, pour l’unité retenue." },
      { id: "n2-pointe", libelle: "Puissance de l’unité retenue le jour de pointe", unite: "W", min: 7185, max: 7631, indice: "Puissance de l’unité retenue le jour de pointe : P repère × C, avec C lu à la ligne de la pointe d’été et à la colonne du dedans. Au watt." },
      { id: "t-reel", libelle: "Tertiaire : puissance au réel du groupe retenu, avec glycol", unite: "W", min: 10789, max: 11457, indice: "Relisez l’écran « Le glycol se compte deux fois » : P réel = P repère × C_air × C_glycol, pour le groupe retenu. Au watt." },
      { id: "t-part", libelle: "Tertiaire : part du besoin couverte par le groupe retenu", unite: "%", min: 109, max: 115.8, indice: "Part = P réel ÷ besoin × 100, au dixième de %, pour le groupe retenu, avec le glycol." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-F4", titre: "Liaisons et charge", href: "../f4-liaisons-charge/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-F2, Le cycle sur le diagramme", href: "../f2-cycle-diagramme/index.html", pourquoi: "L’évaporation, la condensation et les écarts du cycle viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-T9, La machine", href: "../t9-machine-puissance-choix/index.html", pourquoi: "La correction au site d’une pompe à chaleur et le catalogue de la PAC 4 viennent de cette station." },
    { reseau: "CartoClim", titre: "Groupe d’eau glacée et ventilo-convecteurs", href: "../../../cartoclim/stations/3-8-eau-glacee/index.html", pourquoi: "Le groupe, son circuit d’eau et ses émetteurs y sont montrés." },
    { reseau: "CartoClim", titre: "La PAC air/eau : haute, moyenne et basse température", href: "../../../cartoclim/stations/3-7-pac-air-eau/index.html", pourquoi: "Le dégivrage y est montré." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "La station F1 a retenu un multisplit au R32 et la station F2 a tracé son cycle. Il reste à choisir la machine dans un catalogue. Le catalogue donne une puissance à des conditions de repère, qui ne sont pas celles du projet. Vous lisez un coefficient de correction, vous calculez la puissance au réel de chaque machine, vous vérifiez qu’elle fonctionne encore un jour de forte chaleur, puis vous retenez la plus petite qui couvre le besoin. Au niveau 2, vous faites aussi le travail pour le groupe d’eau glacée du bâtiment de bureaux. Les réponses s’écrivent sur les feuilles A4.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Machine", "Repère (W)", "Coefficient", "Au réel (W)", "Couvre ?"], [["", "", "", "", ""], ["", "", "", "", ""]], "Le tableau à remplir, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "le besoin, les conditions du projet, la pointe d’été."], ["Le catalogue :", "puissances de repère, plages, tableau des coefficients."]] },
          { title: "Vous produisez", rows: [["Les calculs :", "la puissance au réel de chaque machine et la part du besoin couverte."], ["Le choix :", "la machine retenue, justifiée. Fourchettes à l’écran Vérifier : ± 3 % sur un calcul, ± 0,3 % sur un coefficient lu."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station F4, les liaisons et la charge ; la station F5 pour l’eau glacée."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: `Le besoin vient de la station T8, avec simultanéité. Les conditions d’été viennent des stations E1, E2 et F1. L’évaporation et la condensation viennent de la station F2. Les catalogues de la station sont fictifs et sans marque : aucune page de fabricant n’est recopiée. Ils sont tirés d’un cycle du R32 calculé par CoolProp, bibliothèque libre de propriétés des fluides, avec les écarts de F2 : évaporation ${EX.ecarts.ev} K sous la température du dedans, condensation ${EX.ecarts.co} K au-dessus de celle du dehors. Les conditions de repère, ${EX.rep.ext} °C dehors et ${EX.rep.int} °C dedans, et la pointe d’été de ${EX.pointe} °C sont des données de l’exercice. Sur un vrai projet, vous lisez ces valeurs sur la page du constructeur.`,
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Besoin de froid", "Station T8, puissance de la machine avec simultanéité"],
        ["Conditions d’été, dehors et dedans", "Station F1 (stations E1 et E2)"],
        ["Évaporation, condensation, R32", "Station F2"],
        ["Catalogue, plages, coefficients", "Le catalogue de l’exercice, fictif, tiré de CoolProp"],
        [`Conditions de repère ${EX.rep.ext} °C et ${EX.rep.int} °C`, "Donnée de l’exercice"],
        [`Pointe d’été ${EX.pointe} °C`, "Donnée de l’exercice"],
        ["Bâtiment de bureaux : besoin, eau glacée, glycol", "Dossier du bâtiment, extrait de CCTP (pages 1 et 3)"]
      ], "Les données de la station")
    }),

    BE.ecran({
      id: "catalogue-repere", dossier: "methode", kicker: "La méthode, 1", title: "La puissance du catalogue et ses conditions", level: "comprendre",
      text: `Un catalogue donne la puissance frigorifique d’une machine à des conditions fixées, que la station appelle conditions de repère. Dans le catalogue de l’exercice, c’est ${EX.rep.ext} °C dehors et ${EX.rep.int} °C dedans. Le chiffre de la plaque ou de la première ligne du catalogue n’est vrai qu’à ces conditions. Le catalogue donne aussi la plage de fonctionnement en froid : les températures du dehors entre lesquelles la machine marche. Exemple du bâtiment d’exemple : sa salle de réunion demande ${E.besoin} W, à ${EX.site.ext} °C dehors et ${EX.site.int} °C dedans. Le catalogue propose trois unités. Relevez d’abord, pour chacune, sa puissance de repère et sa plage.`,
      prompt: "Lisez le catalogue d’exemple et l’exemple résolu, puis continuez.",
      render: () => catalogue(E.m, `Catalogue de l’exercice, repère ${EX.rep.ext} °C dehors et ${EX.rep.int} °C dedans`)
        + BE.exemple({ text: `Ce que dit la ligne de l’${E.m[1].nom}`, answer: `${E.m[1].P} W de froid à ${EX.rep.ext} °C dehors et ${EX.rep.int} °C dedans ; elle fonctionne en froid de ${E.m[1].lim} °C dehors`, why: "Une puissance de catalogue se cite toujours avec ses conditions de repère." })
    }),

    BE.ecran({
      id: "pourquoi-la-puissance-change", dossier: "methode", kicker: "La méthode, 2", title: "Pourquoi la puissance change", level: "comprendre",
      text: `Le compresseur aspire le même volume de vapeur à chaque tour. La puissance dépend donc de ce qu’un mètre cube aspiré emporte de froid. Quand il fait plus chaud dehors, la condensation monte : le liquide arrive plus chaud au détendeur, le point 3 part à droite sur le diagramme et l’effet frigorifique h1 − h4 baisse. Quand le dedans est plus frais, l’évaporation descend : la vapeur aspirée est moins dense, le compresseur en déplace moins de kilogrammes. Le schéma montre le cycle du bâtiment d’exemple à ${EX.site.ext} °C et à ${EX.pointe} °C dehors, ${EX.site.int} °C dedans. À ${EX.pointe} °C, la condensation passe de ${EX.cyc.tc32} à ${EX.cyc.tc40} °C.`,
      prompt: "Comparez les deux cycles sur le diagramme, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/cycle-deux-temperatures.svg", `Loupe du diagramme log p-h du R32 : enthalpie de 250 à 600 kJ/kg en bas, pression de 8 à 40 bar à gauche, en échelle logarithmique. La cloche en trait épais marine. Deux cycles partent du même point 1, à ${EX.cyc.te} °C d’évaporation. En tirets marine, le cycle à ${EX.site.ext} °C dehors : condensation à ${EX.cyc.tc32} °C, points 2, 3 et 4. En trait plein orange, le cycle à ${EX.pointe} °C dehors : condensation à ${EX.cyc.tc40} °C, plus haut, points 2′, 3′ et 4′ plus à droite. Sous le diagramme, deux flèches donnent l’effet frigorifique : ${EX.cyc.e32} kJ/kg à ${EX.site.ext} °C, ${EX.cyc.e40} kJ/kg à ${EX.pointe} °C.`, "Plus chaud dehors : la condensation monte, l’effet frigorifique baisse.")
        + BE.exemple({ text: `Bâtiment d’exemple, ${EX.site.int} °C dedans : effet frigorifique à ${EX.site.ext} °C et à ${EX.pointe} °C dehors`, answer: `h1 − h4 = ${EX.cyc.h1} − ${EX.cyc.h3_32} = ${EX.cyc.e32} kJ/kg à ${EX.site.ext} °C ; ${EX.cyc.h1} − ${EX.cyc.h3_40} = ${EX.cyc.e40} kJ/kg à ${EX.pointe} °C, soit ${EX.cyc.baisse} % de moins`, why: "Le point 1 ne bouge pas : seul le dehors a changé. Le compresseur aspire autant de vapeur, chaque kilogramme emporte moins de froid." })
    }),

    BE.ecran({
      id: "coefficient-correction", dossier: "methode", kicker: "La méthode, 3", title: "Lire le coefficient et corriger", level: "comprendre",
      text: `Le catalogue donne un tableau de coefficients. Cherchez la ligne de la température du dehors et la colonne de celle du dedans : le nombre à leur croisement est le coefficient C. La puissance au réel vaut la puissance de repère multipliée par C : P réel = P repère × C. Donnez C au millième, comme dans le tableau, et la puissance au watt. À ${EX.rep.ext} °C dehors et ${EX.rep.int} °C dedans, C vaut 1 : ce sont les conditions de repère. Un dedans plus frais fait baisser C, un dehors plus frais le fait monter. Le graphique montre la puissance au réel de l’${E.ret} selon le dehors, avec le besoin de la salle de réunion.`,
      prompt: "Lisez le tableau des coefficients, le graphique et l’exemple résolu, puis continuez.",
      render: () => coefTable()
        + BE.schema("illustrations/puissance-selon-dehors.svg", `Graphique. En abscisse, la température extérieure de 25 à 45 °C ; en ordonnée, la puissance de 3000 à 3900 W. Une ligne bleue descend de ${EX.courbe[0].P} W à 25 °C jusqu’à ${EX.courbe[EX.courbe.length - 1].P} W à 46 °C : la puissance au réel de l’${E.ret}, ${EX.site.int} °C dedans, un point par ligne du catalogue. Une droite horizontale en tirets marine à ${E.besoin} W : le besoin de la salle de réunion. Un rond orange à ${EX.site.ext} °C, sur la ligne bleue, à ${E.Pret} W : la lecture au site. La ligne bleue croise le besoin un peu au-delà de 35 °C.`, "La puissance baisse quand le dehors chauffe.")
        + BE.exemple({ text: `${E.ret}, ${E.Pretrep} W au repère ; salle de réunion à ${EX.site.ext} °C dehors et ${EX.site.int} °C dedans`, answer: `Ligne ${EX.site.ext} °C, colonne ${EX.site.int} °C : C = ${E.C}. P réel = ${E.Pretrep} × ${E.C} = ${E.Pret} W`, why: "Ici, le dehors plus frais que le repère compense presque le dedans plus frais. Un jour de pointe, ce n’est plus vrai." })
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, la correction", title: "À l’écran : corriger une puissance", level: "appliquer", requiresAction: true,
      text: {
        1: `Une unité extérieure donne ${X1.P} W au repère. Elle travaille à ${X1.ext} °C dehors et ${X1.int} °C dedans. Quelle est sa puissance au réel ? Le tableau des coefficients est à l’écran « Lire le coefficient et corriger ». L’exemple résolu reste sous vos yeux.`,
        2: `Une unité extérieure donne ${X1.P} W au repère. Elle travaille à ${X1.ext} °C dehors et ${X1.int} °C dedans. Quelle est sa puissance au réel ?`
      },
      prompt: { 1: "Choisissez la réponse juste, en vous aidant de l’exemple.", 2: "Choisissez la réponse juste. Cette question est à faire seul." },
      aides: {
        1: ["Le tableau des coefficients est à l’écran « Lire le coefficient et corriger ».", "Ligne du dehors, colonne du dedans ; puis P réel = P repère × C.", `Ligne ${X1.ext} °C, colonne ${X1.int} °C. Multipliez ${X1.P} W par ce nombre.`],
        2: ["Le tableau des coefficients est à l’écran « Lire le coefficient et corriger ».", "Deux températures donnent une case du tableau.", "On multiplie la puissance de repère par le coefficient : on ne divise pas."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `${E.ret} à ${EX.site.ext} °C dehors et ${EX.site.int} °C dedans`, answer: `C = ${E.C} ; ${E.Pretrep} × ${E.C} = ${E.Pret} W`, why: "Le coefficient se lit à la ligne du dehors et à la colonne du dedans." }), X1.quiz),
        2: avecBloc("", X1.quiz)
      })
    }),

    BE.ecran({
      id: "choisir-la-machine", dossier: "methode", kicker: "La méthode, 4", title: "Choisir sur la puissance au réel", level: "comprendre",
      text: `Corrigez chaque machine du catalogue avec le même coefficient, puis comparez sa puissance au réel au besoin. La part du besoin couverte vaut P réel ÷ besoin × 100, au dixième de %, avec la puissance au réel déjà arrondie au watt. Retenez la plus petite machine dont la puissance au réel couvre le besoin, à 100 % ou plus. Une machine dont la puissance de repère égale ou dépasse un peu le besoin peut manquer au réel : choisissez toujours sur la puissance au réel. Une machine bien plus grosse que le besoin coûte plus et marche par à-coups. Pour demander une machine, la puissance de repère à demander au moins vaut besoin ÷ C : on divise, car la machine perd au réel. Arrondissez-la au watt supérieur : au watt le plus proche, elle pourrait manquer le besoin de quelques dixièmes de watt. Les barres montrent les trois unités de la salle de réunion.`,
      prompt: "Lisez les barres et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/barres-trois-machines.svg", `Barres horizontales, deux par machine : en pointillé, la puissance de repère ; en marine, la puissance au réel à ${EX.site.ext} °C dehors et ${EX.site.int} °C dedans. ${E.m.map(m => `${m.nom} : ${m.P} W au repère, ${m.Pr} W au réel`).join(" ; ")}. Un trait vertical orange marque le besoin de la salle de réunion, ${E.besoin} W : la barre au réel de l’${E.m[0].nom} s’arrête avant, celles de l’${E.m[1].nom} et de l’${E.m[2].nom} le dépassent.`, "On compare la barre au réel au besoin, jamais la barre du repère.")
        + BE.exemple({ text: `Salle de réunion : ${E.besoin} W ; C = ${E.C}`, answer: `${E.m.map(m => `${m.nom} : ${m.P} × ${E.C} = ${m.Pr} W, ${m.part} %`).join(" ; ")}. Retenue : l’${E.ret}, la plus petite qui couvre le besoin. Repère à demander au moins : ${E.besoin} ÷ ${E.C} = ${E.min} W, arrondi au watt supérieur`, why: `L’${E.m[2].nom} couvre aussi, mais elle est plus grosse que nécessaire.` })
    }),

    BE.ecran({
      id: "limites-de-fonctionnement", dossier: "methode", kicker: "La méthode, 5", title: "Les limites de fonctionnement", level: "comprendre",
      text: `Le catalogue donne la plage de fonctionnement en froid, en température du dehors. Hors de sa plage, la machine s’arrête en sécurité : elle protège son compresseur. Les conditions de calcul ne suffisent pas : la température la plus haute que le site connaît un jour de forte chaleur doit aussi tenir dans la plage. La station l’appelle pointe d’été ; pour le bâtiment d’exemple, la maison et le bâtiment de bureaux, l’exercice la fixe à ${EX.pointe} °C. Ce jour-là, la machine marche encore, avec moins de puissance : lisez son coefficient à la ligne de la pointe. Le schéma montre les plages de trois machines d’un autre local, celles de l’exercice à l’écran 2, avec une pointe à ${X2.pointe} °C.`,
      prompt: "Lisez les plages sur le schéma et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/limites.svg", `Trois barres horizontales sur une échelle de température extérieure de −15 à 50 °C. ${X2.m.map(m => `${m.nom} : de ${m.lim} °C`).join(" ; ")}. Un trait pointillé marine à ${X2.ext} °C, les conditions de calcul, et un trait orange à ${X2.pointe} °C, la pointe d’été. Le trait orange tombe dans les barres de l’${X2.m[0].nom} et de l’${X2.m[2].nom}, en dehors de celle de l’${X2.m[1].nom}, tracée en tirets.`, "La pointe d’été doit tomber dans la plage de la machine.")
        + BE.exemple({ text: `${E.ret} de la salle de réunion, plage ${E.m[1].lim} °C ; pointe ${EX.pointe} °C`, answer: `${EX.pointe} °C est dans la plage : la machine tient. Le jour de pointe, C = ${E.Cp} (ligne ${EX.pointe} °C, colonne ${EX.site.int} °C) : ${E.Pretrep} × ${E.Cp} = ${E.Pp} W`, why: `Elle perd ${E.perte} % par rapport aux conditions de calcul : ce jour-là, la pièce monte de quelques degrés.` })
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, le choix", title: "À l’écran : quelle machine retenir", level: "appliquer", requiresAction: true,
      text: {
        1: `Un local demande ${X2.besoin} W, à ${X2.ext} °C dehors et ${X2.int} °C dedans : C = ${X2.C}. Pointe d’été à tenir : ${X2.pointe} °C. Catalogue : ${X2.m.map(m => `${m.nom}, ${m.P} W, plage ${m.lim} °C`).join(" ; ")}. Quelle machine retenez-vous ? Le schéma de l’écran « Les limites de fonctionnement » montre leurs plages. L’exemple résolu reste sous vos yeux.`,
        2: `Un local demande ${X2.besoin} W, à ${X2.ext} °C dehors et ${X2.int} °C dedans : C = ${X2.C}. Pointe d’été à tenir : ${X2.pointe} °C. Catalogue : ${X2.m.map(m => `${m.nom}, ${m.P} W, plage ${m.lim} °C`).join(" ; ")}. Quelle machine retenez-vous ?`
      },
      prompt: { 1: "Choisissez la réponse juste, en vous aidant de l’exemple.", 2: "Choisissez la réponse juste. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est aux écrans « Choisir sur la puissance au réel » et « Les limites de fonctionnement ».", "Deux conditions : la puissance au réel couvre le besoin, la pointe tombe dans la plage.", `Calculez P × ${X2.C} pour chaque machine, puis regardez si ${X2.pointe} °C est dans sa plage.`],
        2: ["La méthode est aux écrans « Choisir sur la puissance au réel » et « Les limites de fonctionnement ».", "Deux conditions, et la plus petite machine qui les remplit.", "Une machine qui couvre le besoin peut s’arrêter un jour de pointe."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `Salle de réunion, ${E.besoin} W, pointe ${EX.pointe} °C`, answer: `${E.m[0].nom} : ${E.m[0].Pr} W, trop court. ${E.m[1].nom} : ${E.m[1].Pr} W, plage jusqu’à ${E.lim1} °C : retenue`, why: "La plus petite machine qui couvre le besoin et tient la pointe." }), X2.quiz),
        2: avecBloc("", X2.quiz)
      })
    }),

    BE.ecran({
      id: "degivrage", dossier: "methode", kicker: "La méthode, 6", title: "Le dégivrage, en mode chaud", level: "comprendre",
      text: `En hiver, une pompe à chaleur air/eau prend sa chaleur dans l’air du dehors. Par temps froid et humide, son échangeur extérieur se couvre de givre : la machine inverse son cycle quelques minutes pour le fondre (station CartoClim « La PAC air/eau », reprise par la station T9). Le dégivrage concerne donc le mode chaud. En froid, l’échangeur du dehors est le condenseur : il est chaud et ne givre pas. Le catalogue de la PAC 4 de la station T9 le montre : sa courbe de chauffage s’aplatit entre −2 et +2 °C, là où le givre se forme le plus. La même PAC 4 ne donne que ${EX.pac4.froid} W de froid à ${EX.pac4.cond} : ${EX.pac4.part} % du besoin d’été de la maison. C’est pourquoi la station F1 a retenu un multisplit pour rafraîchir.`,
      prompt: "Lisez la courbe et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/degivrage-pac4.svg", `Graphique de la station T9. En abscisse, la température extérieure de −15 à 17 °C ; en ordonnée, la puissance de chauffage de 0 à 4500 W. La courbe rouge de la PAC 4, eau à 45 °C, monte de ${EX.pac4.cat[0]} W à −15 °C jusqu’à ${EX.pac4.cat[EX.pac4.cat.length - 1]} W à 12 °C, un point par ligne du catalogue. Une bande bleu clair entre −2 et +2 °C : la courbe y est presque à plat, ${EX.pac4.Pm2} W puis ${EX.pac4.Pp2} W.`, "Le dégivrage aplatit la courbe de chauffage entre −2 et +2 °C.")
        + BE.exemple({ text: "PAC 4, catalogue de chauffage de la station T9", answer: `De −2 à +2 °C : ${EX.pac4.Pm2} puis ${EX.pac4.Pp2} W, ${EX.pac4.gain1} W de plus pour 4 K. De +2 à +7 °C : ${EX.pac4.Pp2} puis ${EX.pac4.P7} W, ${EX.pac4.gain2} W de plus pour 5 K`, why: "Les puissances du catalogue sont des moyennes, dégivrages compris : le temps passé à dégivrer est perdu pour le chauffage." })
    }),

    BE.ecran({
      id: "groupe-eau-glacee", dossier: "methode", kicker: "La méthode, 7", title: "Le groupe d’eau glacée", level: "comprendre",
      text: `Dans le bâtiment de bureaux, un groupe d’eau glacée, posé au sol dehors, façade nord, refroidit de l’eau (extrait de CCTP, page 3) : c’est l’eau qui porte le froid jusqu’aux locaux ; le CCTP l’appelle fluide caloporteur. L’eau part à ${T.depart} °C vers les ventilo-convecteurs et la batterie froide de la CTA (centrale de traitement d’air), et revient à ${T.retour} °C : c’est le régime ${T.regime} (station CartoClim « Groupe d’eau glacée et ventilo-convecteurs »). Le groupe est dehors : l’hiver, à l’arrêt, l’eau du circuit pourrait y geler. Le CCTP demande donc de l’eau glycolée, ${T.glycol} (MPG en abrégé), qui gèle plus bas que l’eau. Le catalogue d’un groupe donne sa puissance à l’air du dehors et à l’eau de repère : ${T.rep.air} °C et eau ${T.rep.eau}, dans l’exercice. L’évaporation est ${T.ecartEau} K sous l’eau qui sort, donnée de l’exercice.`,
      prompt: "Suivez l’eau sur le schéma, lisez le catalogue des groupes, puis continuez.",
      render: () => BE.schema("illustrations/groupe-eau-glacee.svg", `Schéma de principe. À gauche, dehors, façade nord, le groupe d’eau glacée posé au sol. Un mur en tirets sépare le dehors du bâtiment. Le départ, en trait plein bleu, part du groupe vers la droite à ${T.depart} °C ; le retour, en tirets bleus, revient au groupe à ${T.retour} °C en passant par la pompe. Deux ventilo-convecteurs et la batterie froide de la CTA sont branchés entre le départ et le retour. Sous le schéma : eau glycolée, ${T.glycol} ; régime ${T.regime}.`, `Le groupe refroidit l’eau, l’eau refroidit les locaux.`)
        + coefAir()
    }),

    BE.ecran({
      id: "glycol-deux-fois", dossier: "methode", kicker: "La méthode, 8", title: "Le glycol se compte deux fois", level: "comprendre",
      text: `Avec de l’eau glycolée, l’évaporation descend d’${T.glycolK} K pour sortir la même eau (donnée de l’exercice) : le groupe perd de la puissance. Corrigez donc deux fois : P réel = P repère × C_air × C_glycol. C_air se lit dans le tableau des groupes, à la ligne du dehors ; C_glycol vaut ${T.Cg} pour le ${T.glycol}. Le glycol se compte une seconde fois à la station F5 : il demande plus de débit d’eau que de l’eau pure. Exemple : le noyau du bâtiment de bureaux, le bureau et la salle de réunion, demande ${T.noyau.besoin} W à ${T.ext} °C dehors. Les barres montrent deux groupes du catalogue, ${T.noyau.m.map(g => g.nom).join(" et ")}.`,
      prompt: "Lisez les barres et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/barres-glycol.svg", `Barres horizontales, trois par groupe : en pointillé, la puissance de repère ; en bleu clair, au réel avec de l’eau pure ; en marine, au réel avec de l’eau glycolée. ${T.noyau.m.map(g => `${g.nom} : ${g.P}, ${g.Pe} et ${g.Pg} W`).join(" ; ")}. Un trait vertical orange marque le besoin du noyau, ${T.noyau.besoin} W : la barre glycolée du ${T.noyau.m[0].nom} s’arrête avant, celle du ${T.noyau.m[1].nom} le dépasse.`, "Avec l’eau pure, le premier groupe passerait ; avec le glycol, il manque.")
        + BE.exemple({ text: `Noyau : ${T.noyau.besoin} W ; ${T.ext} °C dehors ; C_air = ${T.Cair}, C_glycol = ${T.Cg}`, answer: `${T.noyau.m.map(g => `${g.nom} : ${g.P} × ${T.Cair} = ${g.Pe} W en eau pure, × ${T.Cg} = ${g.Pg} W avec glycol`).join(" ; ")}. Retenu : le ${T.noyau.ret}`, why: `Oublier le glycol ferait retenir le ${T.noyau.m[0].nom}, trop court.` })
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, le glycol", title: "À l’écran : un groupe à l’eau glycolée", level: "appliquer", requiresAction: true,
      text: {
        1: `Un groupe d’eau glacée donne ${X3.P} W au repère. Il travaille à ${X3.ext} °C dehors, avec de l’eau glycolée : C_air = ${X3.Cair}, C_glycol = ${X3.Cg}. Quelle est sa puissance au réel ? L’exemple résolu reste sous vos yeux.`,
        2: `Un groupe d’eau glacée donne ${X3.P} W au repère. Il travaille à ${X3.ext} °C dehors, avec de l’eau glycolée : C_air = ${X3.Cair}, C_glycol = ${X3.Cg}. Quelle est sa puissance au réel ?`
      },
      prompt: { 1: "Choisissez la réponse juste, en vous aidant de l’exemple.", 2: "Choisissez la réponse juste. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Le glycol se compte deux fois ».", "P réel = P repère × C_air × C_glycol.", `${X3.P} × ${X3.Cair}, puis multipliez le résultat par ${X3.Cg}.`],
        2: ["La méthode est à l’écran « Le glycol se compte deux fois ».", "Deux coefficients, deux multiplications.", "Le dehors plus frais que le repère fait gagner ; le glycol fait perdre."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `${T.noyau.m[1].nom}, ${T.ext} °C dehors, eau glycolée`, answer: `${T.noyau.m[1].P} × ${T.Cair} × ${T.Cg} = ${T.noyau.m[1].Pg} W`, why: "Les deux coefficients se multiplient." }), X3.quiz),
        2: avecBloc("", X3.quiz)
      })
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 9", title: "Ce que la note doit dire", level: "comprendre",
      text: "La première page de la note donne l’objet, les données et leur source, les hypothèses de l’exercice, les résultats et la conclusion. Elle cite toujours une puissance avec ses conditions : celles du repère et celles du projet. Un autre technicien doit pouvoir refaire chaque lecture dans le catalogue. Voici la note de la salle de réunion du bâtiment d’exemple.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul, salle de réunion"], [
        ["Objet", "Unité extérieure de la salle de réunion du bâtiment d’exemple, au R32"],
        ["Données", `Besoin ${E.besoin} W : station T8 ; ${EX.site.ext} °C dehors, ${EX.site.int} °C dedans ; catalogue de l’exercice`],
        ["Hypothèses", `Repère ${EX.rep.ext} °C et ${EX.rep.int} °C ; écarts du cycle ${EX.ecarts.ev} K et ${EX.ecarts.co} K (station F2) ; pointe ${EX.pointe} °C : données de l’exercice`],
        ["Résultats", `C = ${E.C} ; repère à demander au moins ${E.min} W ; ${E.m.map(m => `${m.nom} ${m.Pr} W (${m.part} %)`).join(", ")}`],
        ["Conclusion", `${E.ret} retenue : ${E.Pret} W au réel, plage jusqu’à ${E.lim1} °C ; ${E.Pp} W le jour de pointe, à ${EX.pointe} °C`]
      ], "Note de calcul, exemple")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

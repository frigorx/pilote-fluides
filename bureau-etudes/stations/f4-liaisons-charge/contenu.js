/* Station BE-F4 : liaisons et charge.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5 à F3 (la salle de réunion seule, avec l'UE 36, est résolue à l'écran ;
   le bâtiment entier et son multisplit UE 52 sont la commande du niveau 1), puis commande du niveau 2 sur la maison, avec la fiche F-Gaz
   du groupe d'eau glacée du bâtiment de bureaux. Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES)
   sont écrites par outils/stations/f4-liaisons-charge/construire.mjs, à partir d'exemple-data.mjs et de
   corriges/f4-liaisons-charge/reference-charge.json (outils/f4-charge-maison.mjs). Aucune valeur calculée de la maison ni du bâtiment
   tertiaire n'est écrite dans cette station : seules les bornes des fourchettes, la notice et le catalogue de l'exercice le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

/*EXEMPLE-DEBUT*/
const EX = {
 "notice": {
  "lignes": [
   {
    "P": "jusqu’à 2800",
    "liq": "6,35",
    "gaz": "9,52",
    "po": "1/4 et 3/8"
   },
   {
    "P": "de 2801 à 5000",
    "liq": "6,35",
    "gaz": "12,7",
    "po": "1/4 et 1/2"
   },
   {
    "P": "de 5001 à 7100",
    "liq": "9,52",
    "gaz": "15,88",
    "po": "3/8 et 5/8"
   }
  ],
  "gpm": [
   {
    "d": "6,35",
    "g": "20"
   },
   {
    "d": "9,52",
    "g": "50"
   }
  ],
  "isolant": "9"
 },
 "limite": "0,13",
 "prp": "675",
 "tkg": "0,675",
 "seuil_kg": "7,41",
 "seuils": [
  {
   "t": "5",
   "mois": "12"
  },
  {
   "t": "50",
   "mois": "6"
  },
  {
   "t": "500",
   "mois": "3"
  }
 ],
 "lim": {
  "L": "25",
  "Ltot": "60",
  "H": "15",
  "ui": "4",
  "monoL": "20",
  "monoH": "10"
 },
 "ecran": {
  "local": "Salle de réunion",
  "P": "3449",
  "L": "8,3",
  "montee": "2,35",
  "haut": "5,3",
  "descente": "0,65",
  "H": "1,7",
  "zUE": "0,5",
  "zUI": "2,2",
  "machine": "UE 36",
  "usine": "0,900",
  "incluse": "7",
  "audela": "1,3",
  "gpm": "20",
  "add": "26",
  "addkg": "0,026",
  "total": "0,926",
  "teq": "0,63",
  "V": "63,96",
  "dims": {
   "l": "6,0",
   "w": "4,1",
   "h": "2,60"
  },
  "c": "0,014",
  "cmax": "8,31",
  "part": "10,8",
  "liq": "6,35",
  "gaz": "12,7",
  "po": "1/4 et 1/2",
  "margeL": "11,7"
 },
 "n1": {
  "machine": "UE 52",
  "usine": "1,500",
  "incluse": "15",
  "u": [
   {
    "nom": "Salle de réunion",
    "P": "3449",
    "L": "8,3"
   },
   {
    "nom": "Bureau",
    "P": "1127",
    "L": "10,4"
   }
  ],
  "H": "1,7"
 },
 "cat": {
  "maison": [
   {
    "nom": "MS 68",
    "usine": "1,7",
    "incluse": "30"
   },
   {
    "nom": "MS 71",
    "usine": "1,9",
    "incluse": "30"
   },
   {
    "nom": "MS 80",
    "usine": "2,1",
    "incluse": "40"
   }
  ],
  "groupes": [
   {
    "nom": "GE 97",
    "usine": "2,2"
   },
   {
    "nom": "GE 112",
    "usine": "2,6"
   },
   {
    "nom": "GE 130",
    "usine": "3,0"
   }
  ]
 },
 "ech": {
  "quiz": {
   "choices": [
    "A3 : très inflammable, comme le R290",
    "A1 : ni toxique ni inflammable",
    "A2L : faiblement inflammable",
    "B2L : plus toxique et faiblement inflammable"
   ],
   "good": 2,
   "explain": "Le R32 est classé A2L : faible toxicité, faiblement inflammable. Le R290, le propane, est A3, très inflammable : le confondre avec le R32, c’est se tromper de limite de charge. Un fluide A1 ne propage pas la flamme ; un fluide B2L, comme l’ammoniac, est plus toxique."
  }
 },
 "ex1": {
  "L": "16",
  "incluse": "7",
  "gpm": "20",
  "quiz": {
   "choices": [
    "320 g",
    "180 g",
    "450 g",
    "460 g"
   ],
   "good": 1,
   "explain": "(16 − 7) × 20 = 180 g : on ne pèse que la longueur au-delà de celle incluse. 320 g compte toute la liaison, comme si la charge d’usine ne couvrait rien. 450 g prend 50 g/m, la valeur d’une liaison liquide de 9,52 mm. 460 g ajoute la longueur incluse au lieu de la retirer."
  }
 },
 "ex2": {
  "charge": "2,9",
  "pieces": [
   {
    "nom": "Le séjour",
    "V": "60"
   },
   {
    "nom": "La chambre",
    "V": "32"
   },
   {
    "nom": "Le bureau",
    "V": "20"
   }
  ],
  "quiz": {
   "choices": [
    "Le séjour : 0,048 kg/m³, la charge convient",
    "Les trois pièces ensemble : 0,026 kg/m³, la charge convient",
    "Le bureau : 0,145 kg/m³, la charge convient, car le R32 est peu inflammable",
    "Le bureau : 0,145 kg/m³, au-dessus de 0,13 : la charge ne convient pas"
   ],
   "good": 3,
   "explain": "Le local qui compte est le plus petit : la même fuite y donne la plus forte concentration. 2,9 ÷ 20 = 0,145 kg/m³, au-dessus de la limite de l’exercice. Le séjour donne 0,048 kg/m³ : il ne dit rien du bureau. Les trois pièces ne s’additionnent pas : la fuite reste dans la pièce où elle se produit. La classe A2L ne lève pas la limite, elle sert à la fixer."
  }
 },
 "ex3": {
  "charge": "3,0",
  "PRP": "2088",
  "fluide": "R410A",
  "quiz": {
   "choices": [
    "6,26 t éq. CO₂ : contrôle au moins tous les 12 mois",
    "2,03 t éq. CO₂ : pas de contrôle périodique",
    "3,0 kg, moins de 5 : pas de contrôle périodique",
    "6,26 t éq. CO₂ : contrôle au moins tous les 6 mois"
   ],
   "good": 0,
   "explain": "3,0 × 2088 ÷ 1 000 = 6,26 t éq. CO₂ : le premier seuil de 5 t est dépassé, le palier suivant commence à 50 t. 2,03 t prend le PRP du R32, pas celui du R410A. Les seuils se comptent en tonnes équivalent CO₂, jamais en kilogrammes de fluide."
  }
 }
};
/*EXEMPLE-FIN*/

const E = EX.ecran, N1 = EX.n1, X1 = EX.ex1, X2 = EX.ex2, X3 = EX.ex3;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const notice = () => tableau(["Puissance de la pièce (W)", "Liquide (mm)", "Gaz (mm)", "Pouces"], EX.notice.lignes.map(l => [l.P, l.liq, l.gaz, l.po]), "Notice de l’exercice, fictive et sans marque : diamètres des liaisons")
  + tableau(["Liaison liquide (mm)", "Charge additionnelle (g/m)"], EX.notice.gpm.map(g => [g.d, g.g]), `Au-delà de la longueur incluse ; isolant d’au moins ${EX.notice.isolant} mm sur chaque tube`);
const catalogue = () => tableau(["Machine", "Charge d’usine (kg)", "Longueur incluse (m)"], [...EX.cat.maison.map(m => [m.nom, m.usine, m.incluse]), ...EX.cat.groupes.map(g => [g.nom, g.usine, "monobloc, sans liaison"])], "Catalogue de l’exercice (station F3) : charge de fluide en usine");
const ficheFgaz = (titre, lignes) => tableau(["Rubrique", titre], lignes, "Fiche F-Gaz de l’équipement, modèle de la station");

const ecranProjet = BE.projet({
    dossier: "projet", kicker: "Le projet, 1",
    aides: {
      1: [
        "Les données sont dans la commande et sur la feuille. La notice est ci-dessous et au verso de la feuille. La méthode est aux écrans « Relever les liaisons », « Lire les diamètres », « Charge d’usine et charge additionnelle » et « Tonnes équivalent CO₂ et contrôle ».",
        "Additionnez les deux liaisons, retirez la longueur incluse, multipliez par les grammes par mètre de la liaison liquide. Ajoutez à la charge d’usine, puis multipliez par le PRP et divisez par 1 000.",
        `Sur l’exemple, la salle seule : (${E.L} − ${E.incluse}) × ${E.gpm} = ${E.add} g ; ${E.usine} + ${E.addkg} = ${E.total} kg ; ${E.total} × ${EX.prp} ÷ 1 000 = ${E.teq} t. Votre machine est l’${N1.machine}, avec deux liaisons.`
      ],
      2: [
        "Liaisons, dénivelé et puissance de chaque pièce : votre feuille de la station F1. Volumes : votre feuille de la station T1. Machine retenue : votre feuille de la station F3. Notice et catalogue : ci-dessous. Méthode : tous les écrans de la méthode, dans l’ordre.",
        "La concentration se calcule dans le plus petit des quatre locaux, avec toute la charge du multisplit. La charge maximale admise vaut la limite de l’exercice multipliée par le volume de ce local.",
        "Le groupe d’eau glacée n’a pas de liaison : sa charge totale est sa charge d’usine. Sa fiche F-Gaz se remplit comme celle de la maison, sans concentration à vérifier."
      ]
    }
  });
const rendreCommande = ecranProjet.render;
const blocNiveau = n => n === 1
  ? `<h3>La notice de l’exercice</h3>` + notice() + BE.schema("illustrations/plan-liaisons-exemple.svg", `Plan du bâtiment d’exemple, le même qu’à l’écran « Relever les liaisons ». Liaison de la salle de réunion : ${N1.u[0].L} m. Liaison du bureau : ${N1.u[1].L} m. Dénivelé ${N1.H} m.`, "Les deux liaisons du bâtiment d’exemple, station F1.")
  : `<h3>La notice et le catalogue de l’exercice</h3>` + notice() + catalogue();
ecranProjet.render = () => { const html = rendreCommande(); if (html.includes("partie-reservee")) return html; return html + blocNiveau(html.includes("niveau autonome") ? 2 : 1); };

BE.station({
  code: "BE-F4",
  titre: "Liaisons et charge",
  ligne: "Frigorifique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bâtiment d’exemple, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, puis le groupe du bâtiment de bureaux", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "La machine est choisie. Il reste à la raccorder et à la charger : relever chaque liaison, lire ses diamètres dans la notice, calculer la charge de fluide à peser, vérifier si la fuite de toute cette charge dans la plus petite pièce reste sous la limite, puis compter les tonnes équivalent CO₂ et remplir la fiche F-Gaz.",
  note: `La notice de la station est fictive, sans marque. La limite de concentration de ${EX.limite} kg/m³ est une valeur de l’exercice, pas celle de la norme : sur un vrai projet, la charge maximale se calcule avec la norme NF EN 378 en vigueur et se recoupe avec la notice de l’appareil.`,

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
      objet: "Les liaisons et la charge du multisplit du bâtiment d’exemple",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bâtiment d’exemple entier est rafraîchi par le multisplit ${N1.machine} au R32, retenu à la station F3 : une unité dans la salle de réunion (${N1.u[0].P} W), une dans le bureau (${N1.u[1].P} W). Notice : charge d’usine ${N1.usine} kg pour ${N1.incluse} m de liaison. Les liaisons sont celles de la station F1, exemple : ${N1.u[0].L} m et ${N1.u[1].L} m, dénivelé ${N1.H} m. Suivez les étapes dans l’ordre.`,
        `Étape 1, exercice 1 de la feuille (recto). Relevez les deux liaisons, leur total et le dénivelé ; comparez-les aux limites du multisplit : ${EX.lim.L} m par unité, ${EX.lim.Ltot} m en tout, ${EX.lim.H} m de dénivelé.`,
        "Étape 2, exercice 2 de la feuille (recto). Lisez dans la notice (verso, ou ci-dessous) les diamètres liquide et gaz de chaque unité.",
        "Étape 3, exercice 3 de la feuille (recto, en bas). Calculez la longueur au-delà de l’incluse, la charge additionnelle au gramme et la charge totale au gramme près.",
        `Étape 4, exercice 4 de la feuille (verso). Calculez les tonnes équivalent CO₂ (PRP du R32 : ${EX.prp}) et dites si un contrôle d’étanchéité périodique est imposé. Vérifiez vos résultats à l’écran Vérifier.`
      ],
      pieces: [
        { piece: "Machine, liaisons, limites", ou: "Cette commande, reprise sur la feuille" },
        { piece: "Notice de l’exercice", ou: "Ci-dessous, et au verso de la feuille ; écran « Lire les diamètres »" },
        { piece: "Méthode et exemples résolus", ou: "Écrans de la méthode, sur la salle de réunion seule" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Variante de rafraîchissement de la maison : liaisons, charge et fiches F-Gaz",
      delai: "Rendu en fin de séance",
      commande: `Le multisplit au R32 retenu à la station F3 rafraîchit les quatre pièces de la maison. Reprenez sur votre feuille de la station F1 la liaison de chaque unité, la plus longue, le dénivelé et la puissance de chaque pièce ; sur votre feuille de la station T1, le volume des quatre pièces ; dans le catalogue ci-dessous, la charge d’usine et la longueur incluse de votre machine. Vérifiez les limites du multisplit (${EX.lim.L} m par unité, ${EX.lim.Ltot} m en tout, ${EX.lim.H} m de dénivelé), lisez les diamètres, calculez la charge totale, puis la concentration dans le local le plus défavorable, à comparer à la limite de l’exercice : ${EX.limite} kg/m³ (valeur fictive, pas celle de la norme). Calculez les tonnes équivalent CO₂ (PRP ${EX.prp}) et remplissez la fiche F-Gaz de la maison. Volet tertiaire : remplissez aussi la fiche F-Gaz du groupe d’eau glacée au R32 retenu à la station F3 pour le bâtiment de bureaux du volet tertiaire, posé au sol dehors. Ce bâtiment de bureaux n’est pas le bâtiment d’exemple de la méthode : le groupe ne rafraîchit pas la salle de réunion ni le bureau. Rédigez enfin la première page de la note de calcul.`,
      pieces: [
        { piece: "Votre feuille de la station F1", ou: "Liaisons, dénivelé, puissance de chaque pièce" },
        { piece: "Votre feuille de la station T1", ou: "Volume des pièces climatisées" },
        { piece: "Votre feuille de la station F3", ou: "Machine retenue pour la maison, groupe retenu pour les bureaux" },
        { piece: "Notice et catalogue de l’exercice", ou: "Ci-dessous, et au verso de la feuille" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-L", libelle: "Longueur totale des deux liaisons", unite: "m", min: 18.1, max: 19.3, indice: "Relisez l’écran « Relever les liaisons » : chaque unité intérieure a sa liaison, comptée depuis l’unité extérieure ; additionnez les deux. Au dixième de mètre." },
      { id: "n1-add", libelle: "Charge additionnelle", unite: "g", min: 71, max: 77, indice: "Relisez l’écran « Charge d’usine et charge additionnelle » : (longueur totale − longueur incluse) × g/m de la liaison liquide. Au gramme." },
      { id: "n1-tot", libelle: "Charge totale de l’UE 52", unite: "kg", min: 1.526, max: 1.622, indice: "Charge totale = charge d’usine + charge additionnelle, les deux en kilogrammes. Au gramme près, soit trois décimales en kg." },
      { id: "n1-teq", libelle: "Tonnes équivalent CO₂", unite: "t", min: 1.02, max: 1.1, indice: "Relisez l’écran « Tonnes équivalent CO₂ et contrôle » : charge totale (kg) × PRP ÷ 1 000. Au centième de tonne." }
    ],
    2: [
      { id: "n2-L", libelle: "Longueur totale des quatre liaisons", unite: "m", min: 45.5, max: 50.3, indice: "Additionnez les quatre liaisons de votre feuille de la station F1, montées et descentes comprises. Au dixième de mètre." },
      { id: "n2-gaz", libelle: "Diamètre de la liaison gaz du séjour-cuisine", unite: "mm", min: 12.6, max: 12.8, indice: "Relisez l’écran « Lire les diamètres » : la ligne de la notice qui contient la puissance de la pièce (votre feuille de la station F1). En millimètres, comme dans la notice." },
      { id: "n2-add", libelle: "Charge additionnelle du multisplit", unite: "g", min: 110, max: 206, indice: "(longueur totale − longueur incluse de votre machine) × g/m de la liaison liquide. Au gramme. La fourchette suit l’écart permis sur vos longueurs de F1." },
      { id: "n2-tot", libelle: "Charge totale du multisplit", unite: "kg", min: 2.19, max: 2.326, indice: "Charge d’usine de votre machine (catalogue de l’exercice) + charge additionnelle, en kilogrammes, à trois décimales." },
      { id: "n2-c", libelle: "Concentration dans le local le plus défavorable", unite: "kg/m³", min: 0.14, max: 0.15, indice: "Relisez l’écran « La concentration dans le local » : charge totale ÷ volume du plus petit local climatisé (votre feuille de la station T1). Au millième." },
      { id: "n2-max", libelle: "Charge maximale admise dans ce local", unite: "kg", min: 1.95, max: 2.09, indice: "Charge maximale admise dans ce local = limite de l’exercice × volume du local. Au centième de kilogramme." },
      { id: "n2-teq", libelle: "Tonnes équivalent CO₂ du multisplit", unite: "t", min: 1.47, max: 1.57, indice: "Charge totale (kg) × PRP du R32 ÷ 1 000. Au centième de tonne." },
      { id: "t-teq", libelle: "Tertiaire : tonnes équivalent CO₂ du groupe", unite: "t", min: 1.7, max: 1.82, indice: "Tertiaire : charge d’usine du groupe retenu à la station F3 (catalogue de l’exercice) × PRP ÷ 1 000. Au centième de tonne." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-F5", titre: "L’eau glacée", href: "../f5-eau-glacee/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-F1, Besoin et système", href: "../f1-besoin-systeme/index.html", pourquoi: "Le tracé des liaisons, leurs longueurs et les limites du multisplit viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-F3, La machine au réel", href: "../f3-machine-conditions-reelles/index.html", pourquoi: "La machine retenue et sa charge d’usine viennent de cette station." },
    { reseau: "CartoClim", titre: "Les liaisons frigorifiques : longueur, dénivelé, isolant", href: "../../../cartoclim/stations/4-2-liaisons-frigorifiques/index.html", pourquoi: "La pose des liaisons, l’isolant et l’appoint pesé y sont montrés." },
    { reseau: "Législation", titre: "NF EN 378, classes et charges", href: "../../../legislation/stations/en-378/index.html", pourquoi: "La classe du fluide, la catégorie d’accès, l’emplacement et la concentration y sont expliqués." },
    { reseau: "Législation", titre: "F-Gaz 3, le règlement (UE) 2024/573", href: "../../../legislation/stations/fgaz-3/index.html", pourquoi: "Le PRP, les tonnes équivalent CO₂ et les seuils de contrôle y sont expliqués." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "La station F1 a tracé les liaisons, la station F3 a retenu la machine. Avant la pose, le bureau d’études doit dire quel tube poser, combien de fluide peser et si la pièce la plus petite supporte une fuite de toute la charge. Il compte aussi les tonnes équivalent CO₂, qui décident du contrôle d’étanchéité, et il remplit la fiche F-Gaz de l’équipement. Au niveau 2, vous faites aussi la fiche du groupe d’eau glacée du bâtiment de bureaux du volet tertiaire (station F3), qui n’est pas le bâtiment d’exemple. Les réponses s’écrivent sur les feuilles A4.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Liaison (m)", "Diamètres (mm)", "Charge (kg)", "Concentration (kg/m³)", "t éq. CO₂"], [["", "", "", "", ""], ["", "", "", "", ""]], "Le tableau à remplir, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la machine retenue, les liaisons, les volumes."], ["La notice :", "diamètres, longueur incluse, grammes par mètre."]] },
          { title: "Vous produisez", rows: [["Les calculs :", "charge additionnelle et totale, concentration, tonnes équivalent CO₂."], ["Les fiches F-Gaz :", "une par équipement. Fourchettes à l’écran Vérifier : ± 3 % sur un calcul, ± 5 % sur une longueur mesurée au plan."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station R1 pour la maison ; la station F5 pour l’eau glacée du bâtiment de bureaux."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: `Les liaisons et les limites du multisplit viennent de la station F1, la machine et sa charge d’usine de la station F3, les volumes des pièces de la station T1. La notice de la station est fictive, sans marque : aucune page de fabricant n’est recopiée. La limite de concentration, ${EX.limite} kg/m³, est une valeur de l’exercice : la norme NF EN 378 est payante et sa limite dépend de la classe du fluide, du local et de l’emplacement. Sur un vrai projet, la charge maximale se calcule avec la norme en vigueur et se recoupe avec la notice. Le PRP du R32 et les seuils du contrôle d’étanchéité viennent du règlement F-Gaz (station Législation « F-Gaz 3 »).`,
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Liaisons, dénivelé, limites du multisplit", "Station F1"],
        ["Machine retenue, charge d’usine, longueur incluse", "Station F3, catalogue de l’exercice"],
        ["Volume des pièces", "Station T1"],
        ["Diamètres, grammes par mètre, isolant", "Notice de l’exercice, fictive"],
        [`Limite de concentration ${EX.limite} kg/m³`, "Donnée de l’exercice, pas la valeur de la norme"],
        [`PRP du R32 : ${EX.prp}`, "Législation « F-Gaz 3 », écran 3"],
        ["Seuils 5, 50 et 500 t ; 12, 6 et 3 mois", "Législation « F-Gaz 3 », écran 5 ; HabFluide, chapitre 4"]
      ], "Les données de la station")
    }),

    BE.ecran({
      id: "echauffement", dossier: "prise", kicker: "Prise en main, 3, facultatif", title: "Échauffement : la classe du R32", level: "comprendre",
      text: "Cet écran est facultatif : passez-le si vous êtes à l’aise. La station F2 a retenu le R32 pour la maison. Sa classe de sécurité décide de la limite de charge dans une pièce : il faut la connaître avant de calculer. Rappel de la station Législation « NF EN 378 » : la lettre dit la toxicité, A faible, B plus élevée ; le chiffre dit l’inflammabilité, de 1 (pas de flamme) à 3 (très inflammable), avec 2L pour faiblement inflammable. La classe du R32 est écrite sur votre feuille de la station F2.",
      prompt: "Répondez si vous le souhaitez, puis continuez.",
      ...avecBloc("", EX.ech.quiz)
    }),

    BE.ecran({
      id: "relever-les-liaisons", dossier: "methode", kicker: "La méthode, 1", title: "Relever les liaisons", level: "comprendre",
      text: `Chaque unité intérieure a sa liaison : un tube liquide et un tube gaz, posés côte à côte, comptés depuis l’unité extérieure. Sa longueur est le chemin réel du tube : le trajet au plan, plus la montée et la descente, coudes compris. La station F1 l’a mesurée sur le plan. Sur le bâtiment d’exemple, la liaison de la salle de réunion monte de ${E.montee} m dans le local technique, court ${E.haut} m sur le plancher du comble et descend de ${E.descente} m vers l’unité : ${E.L} m en tout. Comparez ensuite chaque longueur aux limites de la notice. Pour un monosplit de l’exercice : ${EX.lim.monoL} m au plus et ${EX.lim.monoH} m de dénivelé ; pour un multisplit : ${EX.lim.L} m par unité, ${EX.lim.Ltot} m en tout, ${EX.lim.H} m de dénivelé (station F1).`,
      prompt: "Suivez les deux liaisons sur le plan, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/plan-liaisons-exemple.svg", `Plan du bâtiment d’exemple, de plain-pied : la salle de réunion au sud, les sanitaires à l’est, le bureau et le local technique au nord. L’unité extérieure est posée contre la façade nord du local technique. Deux liaisons en partent. En trait plein orange, celle de la salle de réunion : elle longe le local technique vers le sud jusqu’au mur de la salle et tourne vers l’est jusqu’à l’unité murale de la salle. En tirets marine, celle du bureau : même départ, puis vers l’est jusqu’à l’unité murale posée contre le mur est du bureau. Sous le plan : salle de réunion ${E.L} m (montée ${E.montee} m, comble ${E.haut} m, descente ${E.descente} m) ; bureau ${N1.u[1].L} m ; dénivelé ${E.H} m.`, "Une liaison par unité intérieure, comptée depuis l’unité extérieure.")
        + BE.exemple({ text: `Salle de réunion seule, monosplit ${E.machine}`, answer: `${E.montee} + ${E.haut} + ${E.descente} = ${E.L} m ; dénivelé ${E.zUI} − ${E.zUE} = ${E.H} m. Limites du monosplit : ${EX.lim.monoL} m et ${EX.lim.monoH} m : tenues, marge ${E.margeL} m sur la longueur`, why: "La longueur se compte sur le chemin du tube, pas à vol d’oiseau sur le plan." })
    }),

    BE.ecran({
      id: "denivele-huile", dossier: "methode", kicker: "La méthode, 2", title: "Le dénivelé et l’huile", level: "comprendre",
      text: `Le dénivelé est la différence de hauteur entre les raccords de l’unité extérieure et ceux de l’unité intérieure la plus éloignée en hauteur. Dans la maison, les liaisons de l’étage montent dans le coffre jusqu’aux combles, puis redescendent vers les chambres. Le compresseur perd un peu d’huile, que le fluide emporte dans tout le circuit. Cette huile doit revenir au compresseur avec le gaz. Sur une grande hauteur, elle peut rester dans la partie qui monte et le compresseur manque d’huile. C’est pourquoi la notice fixe un dénivelé maximal, ${EX.lim.H} m pour le multisplit de l’exercice. Le schéma montre le principe, sans valeur.`,
      prompt: "Repérez le dénivelé H sur la coupe, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/coupe-denivele.svg", "Coupe de principe d’une maison à étage, sans valeur. À gauche, dehors, l’unité extérieure posée au sol. La liaison orange traverse la façade, monte dans un coffre vertical jusqu’aux combles, court sur le plancher des combles, puis descend à travers le plafond jusqu’à l’unité intérieure murale de l’étage. Deux chevrons sur le coffre montrent le sens du retour de l’huile vers le compresseur. À droite, une double flèche H relie la hauteur des raccords de l’unité extérieure à celle de l’unité intérieure : c’est le dénivelé.", "Le dénivelé se mesure entre les raccords des deux unités.")
        + BE.exemple({ text: "Bâtiment d’exemple, de plain-pied", answer: `Raccords de l’unité extérieure à ${E.zUE} m, des unités intérieures à ${E.zUI} m : dénivelé ${E.H} m, loin des ${EX.lim.monoH} m du monosplit`, why: "La montée au comble allonge la liaison mais ne change pas le dénivelé : seules comptent les hauteurs des raccords." })
    }),

    BE.ecran({
      id: "lire-les-diametres", dossier: "methode", kicker: "La méthode, 3", title: "Lire les diamètres", level: "comprendre",
      text: `La notice donne le diamètre des deux tubes de chaque liaison selon la puissance de l’unité intérieure. La station prend la puissance demandée par la pièce, celle de la station F1. Le tube liquide est le plus fin : le fluide y est liquide, dense. Le tube gaz est plus gros : la vapeur aspirée prend plus de place. Les diamètres sont des diamètres extérieurs de tube cuivre frigorifique, en millimètres, avec leur nom en pouces. Les deux tubes reçoivent un isolant d’au moins ${EX.notice.isolant} mm, sans interruption aux raccords (CartoClim « Les liaisons frigorifiques »). Dans un multisplit, chaque unité a ses deux diamètres.`,
      prompt: "Lisez la notice et l’exemple résolu, puis continuez.",
      render: () => notice()
        + BE.exemple({ text: `Salle de réunion, ${E.P} W`, answer: `Ligne « ${EX.notice.lignes[1].P} W » : liquide ${E.liq} mm, gaz ${E.gaz} mm (${E.po} pouce)`, why: "On cherche la ligne qui contient la puissance de la pièce, puis on lit les deux colonnes de cette ligne." })
    }),

    BE.ecran({
      id: "charge-additionnelle", dossier: "methode", kicker: "La méthode, 4", title: "Charge d’usine et charge additionnelle", level: "comprendre",
      text: `L’unité extérieure arrive chargée en usine. Cette charge d’usine suffit pour une longueur de liaison donnée par la notice : la longueur incluse. Au-delà, il faut ajouter du fluide, pesé sur une balance de charge à la mise en service (CartoClim « Les liaisons frigorifiques »). La charge additionnelle vaut (longueur totale − longueur incluse) × grammes par mètre de la liaison liquide, car c’est le tube liquide qui retient le plus de fluide. Dans un multisplit, la longueur totale est la somme des liaisons de toutes les unités. Si la liaison est plus courte que la longueur incluse, rien ne s’ajoute. Charge totale = charge d’usine + charge additionnelle. Le schéma montre la liaison de la salle de réunion et l’${E.machine}.`,
      prompt: "Lisez les deux barres et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/barres-charge.svg", `Deux barres horizontales. La première représente la liaison de ${E.L} m : ${E.incluse} m en bleu clair, la longueur incluse, puis ${E.audela} m en orange, au-delà. La seconde représente la charge : ${E.usine} kg en marine, la charge d’usine, puis une petite part orange de ${E.add} g, la charge additionnelle. Sous les barres : additionnelle ${E.audela} m × ${E.gpm} g/m = ${E.add} g ; totale ${E.usine} + ${E.addkg} = ${E.total} kg.`, "On ne pèse que la longueur au-delà de celle incluse.")
        + BE.exemple({ text: `${E.machine} : ${E.usine} kg pour ${E.incluse} m ; liaison ${E.L} m, liquide ${E.liq} mm`, answer: `(${E.L} − ${E.incluse}) × ${E.gpm} = ${E.add} g ; charge totale ${E.usine} + ${E.addkg} = ${E.total} kg`, why: "La charge additionnelle se donne au gramme : c’est ce que la balance affiche." })
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, la charge additionnelle", title: "À l’écran : combien de fluide ajouter", level: "appliquer", requiresAction: true,
      text: {
        1: `Un split a une liaison de ${X1.L} m, tube liquide de 6,35 mm. Sa notice : longueur incluse ${X1.incluse} m, ${X1.gpm} g/m au-delà. Quelle charge additionnelle pesez-vous ? L’exemple résolu reste sous vos yeux.`,
        2: `Un split a une liaison de ${X1.L} m, tube liquide de 6,35 mm. Sa notice : longueur incluse ${X1.incluse} m, ${X1.gpm} g/m au-delà. Quelle charge additionnelle pesez-vous ?`
      },
      prompt: { 1: "Choisissez la réponse juste, en vous aidant de l’exemple.", 2: "Choisissez la réponse juste. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Charge d’usine et charge additionnelle ».", "Retirez d’abord la longueur incluse, puis multipliez par les grammes par mètre.", `(${X1.L} − ${X1.incluse}) × ${X1.gpm}.`],
        2: ["La méthode est à l’écran « Charge d’usine et charge additionnelle ».", "La charge d’usine couvre déjà une partie de la liaison.", "Le diamètre du tube liquide donne les grammes par mètre."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `${E.machine}, liaison ${E.L} m`, answer: `(${E.L} − ${E.incluse}) × ${E.gpm} = ${E.add} g`, why: "Seule la longueur au-delà de l’incluse se pèse." }), X1.quiz),
        2: avecBloc("", X1.quiz)
      })
    }),

    BE.ecran({
      id: "concentration-local", dossier: "methode", kicker: "La méthode, 5", title: "La concentration dans le local", level: "comprendre",
      text: `Si toute la charge fuit dans une pièce, le fluide s’y répand. La concentration vaut la masse de fluide divisée par le volume du local, en kg/m³ (station Législation « NF EN 378 »). Elle ne doit pas dépasser une limite qui dépend de la classe du fluide (A2L pour le R32), de la catégorie d’accès du local (a : n’importe qui y entre, comme dans un logement ou un bureau), de l’emplacement et de la taille du local. Le local qui compte est le plus petit des locaux où se trouve une unité intérieure (pas le coffre, ni les combles, ni le garage, où passent seulement les liaisons) : la même fuite y donne la plus forte concentration. La charge maximale admise vaut la limite multipliée par ce volume. Dans la station, la limite est de ${EX.limite} kg/m³ : valeur fictive, pas celle de la norme. Sur un vrai projet, elle se calcule avec la norme en vigueur et se recoupe avec la notice : jamais à l’estime.`,
      prompt: "Lisez le schéma et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/local-fuite.svg", `La salle de réunion dessinée en volume : ${E.dims.l} m de long, ${E.dims.w} m de profondeur, ${E.dims.h} m de haut. Une unité murale est posée sur le mur du fond. Des points orange remplissent tout le volume : le fluide d’une fuite qui s’y répand. Sous le dessin : V = ${E.dims.l} × ${E.dims.w} × ${E.dims.h} = ${E.V} m³ ; toute la charge s’échappe, m = ${E.total} kg ; c = m ÷ V = ${E.c} kg/m³.`, "La même fuite donne une concentration plus forte dans un petit local.")
        + BE.exemple({ text: `Salle de réunion, ${E.V} m³ ; ${E.machine} chargée à ${E.total} kg`, answer: `c = ${E.total} ÷ ${E.V} = ${E.c} kg/m³, sous ${EX.limite} kg/m³. Charge maximale admise : ${EX.limite} × ${E.V} = ${E.cmax} kg`, why: `La concentration atteint ${E.part} % de la limite de l’exercice : la charge convient. Si elle dépassait, il faudrait réduire la charge, changer d’emplacement, passer en système indirect, ajouter détection et ventilation, ou changer de fluide (station Législation « NF EN 378 »).` })
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, le local qui compte", title: "À l’écran : quelle pièce vérifier", level: "appliquer", requiresAction: true,
      text: {
        1: `Un multisplit au R32 chargé à ${X2.charge} kg dessert trois pièces : ${X2.pieces.map(p => `${p.nom.toLowerCase()}, ${p.V} m³`).join(" ; ")}. Limite de l’exercice : ${EX.limite} kg/m³. Quelle vérification est juste ? L’exemple résolu reste sous vos yeux.`,
        2: `Un multisplit au R32 chargé à ${X2.charge} kg dessert trois pièces : ${X2.pieces.map(p => `${p.nom.toLowerCase()}, ${p.V} m³`).join(" ; ")}. Limite de l’exercice : ${EX.limite} kg/m³. Quelle vérification est juste ?`
      },
      prompt: { 1: "Choisissez la réponse juste, en vous aidant de l’exemple.", 2: "Choisissez la réponse juste. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La concentration dans le local ».", "Le local qui compte est le plus petit : toute la charge peut y fuir.", `Divisez ${X2.charge} kg par le plus petit volume, puis comparez à ${EX.limite}.`],
        2: ["La méthode est à l’écran « La concentration dans le local ».", "Toute la charge, dans un seul local.", "La classe du fluide entre dans la limite ; elle ne la supprime pas."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `Salle de réunion, ${E.V} m³, ${E.total} kg`, answer: `${E.total} ÷ ${E.V} = ${E.c} kg/m³, sous ${EX.limite}`, why: "Toute la charge, divisée par le volume du local." }), X2.quiz),
        2: avecBloc("", X2.quiz)
      })
    }),

    BE.ecran({
      id: "tonnes-co2-controle", dossier: "methode", kicker: "La méthode, 6", title: "Tonnes équivalent CO₂ et contrôle", level: "comprendre",
      text: `Le règlement F-Gaz compte un fluide par son effet sur le climat : tonnes équivalent CO₂ = charge (kg) × PRP ÷ 1 000. Le PRP du R32 vaut ${EX.prp} : un kilogramme de R32 pèse ${EX.tkg} t équivalent CO₂ (station Législation « F-Gaz 3 »). Cette valeur, et jamais le poids seul, décide du contrôle d’étanchéité périodique : à partir de 5 t, puis de 50 t et de 500 t, les contrôles se rapprochent. Les périodicités habituelles sont de 12, 6 et 3 mois (HabFluide, chapitre 4) : vérifiez-les sur le texte en vigueur. Avec le R32, le seuil de 5 t est atteint à ${EX.seuil_kg} kg. L’échelle place la salle de réunion.`,
      prompt: "Lisez l’échelle des seuils et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/echelle-fgaz.svg", `Une échelle horizontale des tonnes équivalent CO₂, de 0,1 à 1 000 t, en échelle logarithmique. Quatre zones : sous 5 t, aucun palier ; de 5 à 50 t, contrôle tous les 12 mois ; de 50 à 500 t, tous les 6 mois ; au-delà de 500 t, tous les 3 mois. Un rond orange place la salle de réunion et son ${E.machine} à ${E.teq} t, dans la première zone. Sous l’échelle : R32, ${EX.tkg} t par kilogramme ; 5 t à ${EX.seuil_kg} kg.`, "Les seuils se lisent en tonnes équivalent CO₂.")
        + BE.exemple({ text: `${E.machine}, ${E.total} kg de R32`, answer: `${E.total} × ${EX.prp} ÷ 1 000 = ${E.teq} t équivalent CO₂ : sous 5 t, aucun contrôle périodique n’est imposé par ces seuils`, why: "La fiche d’intervention reste due à chaque opération sur le circuit, dès la mise en service." })
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, le seuil F-Gaz", title: "À l’écran : contrôle ou pas", level: "appliquer", requiresAction: true,
      text: {
        1: `Une ancienne climatisation contient ${X3.charge} kg de ${X3.fluide}, de PRP ${X3.PRP}. Combien de tonnes équivalent CO₂, et quel contrôle d’étanchéité ? L’exemple résolu reste sous vos yeux.`,
        2: `Une ancienne climatisation contient ${X3.charge} kg de ${X3.fluide}, de PRP ${X3.PRP}. Combien de tonnes équivalent CO₂, et quel contrôle d’étanchéité ?`
      },
      prompt: { 1: "Choisissez la réponse juste, en vous aidant de l’exemple.", 2: "Choisissez la réponse juste. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Tonnes équivalent CO₂ et contrôle ».", "Charge × PRP ÷ 1 000, puis cherchez le palier sur l’échelle.", `${X3.charge} × ${X3.PRP} ÷ 1 000, à comparer à 5, 50 et 500.`],
        2: ["La méthode est à l’écran « Tonnes équivalent CO₂ et contrôle ».", "Le PRP est celui du fluide de l’appareil.", "Les seuils sont en tonnes équivalent CO₂."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `${E.machine}, ${E.total} kg de R32`, answer: `${E.total} × ${EX.prp} ÷ 1 000 = ${E.teq} t`, why: "On multiplie la charge par le PRP du fluide, puis on divise par 1 000." }), X3.quiz),
        2: avecBloc("", X3.quiz)
      })
    }),

    BE.ecran({
      id: "groupe-monobloc", dossier: "methode", kicker: "La méthode, 7", title: "Le groupe monobloc, dehors", level: "comprendre",
      text: "Un split ou un multisplit est un système direct : le fluide frigorigène va jusque dans les pièces, par les liaisons. Le groupe d’eau glacée du bâtiment de bureaux du volet tertiaire (station F3, pas le bâtiment d’exemple) est un groupe monobloc, posé au sol dehors (station F3) : tout le circuit de fluide est dans l’appareil, chargé en usine. Aucune liaison frigorifique n’est posée sur le chantier, rien ne s’ajoute à la charge. C’est l’eau glycolée qui entre dans le bâtiment : système indirect. Un système entièrement dehors est rangé dans la classe d’emplacement III (station Législation « NF EN 378 ») : aucune concentration ne se vérifie dans un local occupé. Le groupe reste un équipement au R32 : ses tonnes équivalent CO₂ se comptent, sa fiche F-Gaz se remplit et la fiche d’intervention est due à la mise en service.",
      prompt: "Comparez les deux schémas, puis continuez.",
      render: () => BE.schema("illustrations/direct-indirect.svg", "Deux schémas côte à côte. À gauche, « Split : système direct » : une unité extérieure dehors, un mur en tirets, et une liaison orange qui traverse le mur jusqu’à une unité murale dans la pièce ; le fluide frigorigène entre dans la pièce. À droite, « Groupe : système indirect » : un groupe d’eau glacée dehors, un mur en tirets, et deux tubes d’eau bleus, l’un plein, l’autre en tirets, qui traversent le mur jusqu’à un ventilo-convecteur dans le local ; le fluide reste dehors, l’eau glycolée entre.", "Direct : le fluide entre. Indirect : l’eau entre, le fluide reste dehors.")
    }),

    BE.ecran({
      id: "fiche-fgaz", dossier: "methode", kicker: "La méthode, 8", title: "La fiche F-Gaz de l’équipement", level: "comprendre",
      text: "Le bureau d’études remet au client, pour chaque équipement, une fiche qui rassemble ce que demandent les textes : le fluide et sa classe, la charge totale, les tonnes équivalent CO₂, le contrôle d’étanchéité, le système et la concentration vérifiée. Elle prépare le registre de l’équipement que tiendra l’exploitant. À chaque opération sur le circuit, dès la mise en service, l’entreprise remplit une fiche d’intervention, gardée cinq ans ; au-delà de 5 t équivalent CO₂, le détenteur la signe aussi (station Législation « Traçabilité des fluides »). Voici la fiche de la salle de réunion.",
      prompt: "Lisez la fiche d’exemple, puis continuez.",
      render: () => ficheFgaz("Salle de réunion, monosplit", [
        ["Équipement", `${E.machine}, une unité murale`],
        ["Fluide et classe", "R32, A2L"],
        ["Charge totale", `${E.usine} + ${E.addkg} = ${E.total} kg`],
        ["Tonnes équivalent CO₂", `${E.total} × ${EX.prp} ÷ 1 000 = ${E.teq} t`],
        ["Contrôle d’étanchéité périodique", "aucun palier : sous 5 t"],
        ["Système, emplacement", "direct ; unité extérieure dehors, unité dans la salle"],
        ["Concentration vérifiée", `${E.c} kg/m³ dans ${E.V} m³, sous ${EX.limite} kg/m³`],
        ["Fiche d’intervention", "à la mise en service, puis à chaque opération"]
      ])
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 9", title: "Ce que la note doit dire", level: "comprendre",
      text: "La première page de la note donne l’objet, les données et leur source, les hypothèses de l’exercice, les résultats et la conclusion. Elle dit d’où vient chaque longueur et chaque volume, et elle cite la limite de concentration avec sa source : ici, une valeur fictive de l’exercice. Un autre technicien doit pouvoir refaire chaque calcul. Voici la note de la salle de réunion du bâtiment d’exemple.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul, salle de réunion"], [
        ["Objet", `Liaison et charge du monosplit ${E.machine} de la salle de réunion, R32`],
        ["Données", `Liaison ${E.L} m, dénivelé ${E.H} m : station F1 ; ${E.P} W ; volume ${E.V} m³ : station T1 ; notice de l’exercice`],
        ["Hypothèses", `Notice fictive (${E.usine} kg pour ${E.incluse} m, ${E.gpm} g/m) ; limite ${EX.limite} kg/m³ : valeur fictive de l’exercice ; PRP ${EX.prp}`],
        ["Résultats", `Liquide ${E.liq} mm, gaz ${E.gaz} mm ; additionnelle ${E.add} g ; totale ${E.total} kg ; ${E.c} kg/m³ ; ${E.teq} t`],
        ["Conclusion", `Limites tenues ; peser ${E.add} g à la mise en service ; concentration à ${E.part} % de la limite ; sous 5 t, pas de contrôle périodique`]
      ], "Note de calcul, exemple")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

/* Station BE-H2 : Les émetteurs.
   Méthode sur le petit bâtiment de bureaux des stations T5 et H1 (bureau, salle de réunion, sanitaires), puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/h2-emetteurs/construire.mjs : le premier vient de exemple-data.mjs, les secondes de
   corriges/h2-emetteurs/reference-emetteurs.json (outils/h2-emetteurs-maison.mjs, tolérance 3 %).
   La maison n'apparaît que par les données de la commande (puissance de chaque émetteur reprise de H1, régimes, air, surface)
   et les bornes des fourchettes. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "ti": "19",
 "n": "1,3",
 "dtn": "50",
 "cat": {
  "dep": "75",
  "ret": "65",
  "air": "20"
 },
 "reg": {
  "dep": "50",
  "ret": "40",
  "moy": "45",
  "dT": "10",
  "dTm": "26",
  "f": "0,427"
 },
 "catalogue": [
  {
   "L": "400",
   "P": "770"
  },
  {
   "L": "600",
   "P": "1150"
  },
  {
   "L": "800",
   "P": "1540"
  },
  {
   "L": "1000",
   "P": "1920"
  },
  {
   "L": "1200",
   "P": "2300"
  },
  {
   "L": "1400",
   "P": "2690"
  },
  {
   "L": "1600",
   "P": "3070"
  },
  {
   "L": "1800",
   "P": "3460"
  },
  {
   "L": "2000",
   "P": "3840"
  }
 ],
 "locaux": [
  {
   "nom": "Bureau",
   "P": "1356",
   "need": "3176",
   "nb": "1",
   "L": "1800",
   "P50": "3460",
   "P50t": "3460",
   "reel": "1477",
   "choix": "1 × 1800 mm"
  },
  {
   "nom": "Salle de réunion",
   "P": "1823",
   "need": "4269",
   "nb": "2",
   "L": "1200",
   "P50": "2300",
   "P50t": "4600",
   "reel": "1964",
   "choix": "2 × 1200 mm"
  },
  {
   "nom": "Sanitaires",
   "P": "268",
   "need": "628",
   "nb": "1",
   "L": "400",
   "P50": "770",
   "P50t": "770",
   "reel": "329",
   "choix": "1 × 400 mm"
  }
 ],
 "table": [
  {
   "reg": "70/60",
   "dTm": "46",
   "f": "0,897",
   "P": "1722"
  },
  {
   "reg": "55/45",
   "dTm": "31",
   "f": "0,537",
   "P": "1031"
  },
  {
   "reg": "50/40",
   "dTm": "26",
   "f": "0,427",
   "P": "820"
  },
  {
   "reg": "45/40",
   "dTm": "23,5",
   "f": "0,375",
   "P": "720"
  },
  {
   "reg": "45/35",
   "dTm": "21",
   "f": "0,324",
   "P": "622"
  },
  {
   "reg": "35/30",
   "dTm": "13,5",
   "f": "0,182",
   "P": "349"
  }
 ],
 "rad": {
  "L": "1000",
  "P": "1920"
 },
 "courbe": [
  {
   "x": "13,5",
   "s": "35/30 : 0,182"
  },
  {
   "x": "26",
   "s": "50/40 : 0,427"
  },
  {
   "x": "41",
   "s": "65/55 : 0,773"
  },
  {
   "x": "50",
   "s": "Catalogue : 1,000"
  }
 ],
 "logTable": [
  {
   "reg": "50/40",
   "a": "26",
   "l": "25,7",
   "e": "1,2 %"
  },
  {
   "reg": "45/40",
   "a": "23,5",
   "l": "23,4",
   "e": "0,4 %"
  },
  {
   "reg": "45/35",
   "a": "21",
   "l": "20,6",
   "e": "1,9 %"
  },
  {
   "reg": "55/35",
   "a": "26",
   "l": "24,7",
   "e": "5,3 %"
  }
 ],
 "variante": {
  "dep": "45",
  "ret": "35",
  "dTm": "21",
  "f": "0,324",
  "need": "4185",
  "hausse": "32"
 },
 "plancher": {
  "nom": "Salle de réunion",
  "P": "1823",
  "S": "24,60",
  "dens": "74,1",
  "k": "6,5",
  "dTm": "11,4",
  "moy": "30,4"
 },
 "ex1": {
  "dep": "55",
  "ret": "45",
  "ti": "20",
  "moy": "50",
  "dTm": "30",
  "quiz": {
   "choices": [
    "10 K",
    "30 K",
    "35 K",
    "50 K"
   ],
   "good": 1,
   "explain": "Moyenne de l’eau : (55 + 45) ÷ 2 = 50 °C ; écart moyen : 50 − 20 = 30 K. A donne ΔT de l’eau, départ moins retour ; C prend le départ au lieu de la moyenne ; D oublie de retrancher la température de l’air."
  }
 },
 "ex2": {
  "P": "900",
  "dep": "50",
  "ret": "40",
  "ti": "20",
  "dTm": "25",
  "f": "0,406",
  "need": "2217",
  "quiz": {
   "choices": [
    "365 W",
    "2217 W",
    "1800 W",
    "1748 W"
   ],
   "good": 1,
   "explain": "Écart moyen : (50 + 40) ÷ 2 − 20 = 25 K ; coefficient : (25 ÷ 50)^1,3 = 0,406 ; 900 ÷ 0,406 = 2217 W. A multiplie au lieu de diviser, C oublie l’exposant 1,3, D prend le départ au lieu de la moyenne de l’eau."
  }
 },
 "ex3": {
  "P": "600",
  "dep": "45",
  "ret": "40",
  "ti": "21",
  "dTm": "21,5",
  "f": "0,334",
  "need": "1796",
  "L": "1000",
  "P50": "1920",
  "quiz": {
   "choices": [
    "400 mm, 770 W",
    "1000 mm, 1920 W",
    "800 mm, 1540 W",
    "1200 mm, 2300 W"
   ],
   "good": 1,
   "explain": "Écart moyen 21,5 K, coefficient 0,334 ; 600 ÷ 0,334 = 1796 W du catalogue. Le plus petit radiateur qui les donne : 1000 mm, 1920 W. A compare le catalogue aux 600 W sans corriger, C est trop petit (1540 W < 1796 W), D suffit aussi mais il est plus grand que nécessaire."
  }
 },
 "maison": {
  "dep": "45",
  "ret": "40",
  "vdep": "45",
  "vret": "35",
  "ti": "20",
  "nbSej": "2",
  "k": "6,5",
  "pieces": [
   {
    "nom": "Séjour-cuisine",
    "niveau": "rez-de-chaussée",
    "P": "1709",
    "S": "38,68"
   },
   {
    "nom": "Entrée",
    "niveau": "rez-de-chaussée",
    "P": "441",
    "S": "10,19"
   },
   {
    "nom": "WC",
    "niveau": "rez-de-chaussée",
    "P": "61",
    "S": "1,92"
   },
   {
    "nom": "Chambre 1",
    "niveau": "étage",
    "P": "476",
    "S": "12,24"
   },
   {
    "nom": "Chambre 2",
    "niveau": "étage",
    "P": "502",
    "S": "12,60"
   },
   {
    "nom": "Palier",
    "niveau": "étage",
    "P": "292",
    "S": "7,35"
   },
   {
    "nom": "Chambre 3",
    "niveau": "étage",
    "P": "249",
    "S": "8,51"
   },
   {
    "nom": "Salle d'eau",
    "niveau": "étage",
    "P": "213",
    "S": "6,66"
   }
  ]
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const B0 = () => EX.locaux[0];
const exempleEcart = () => BE.exemple({ text: `Bureau du bâtiment d’exemple : régime ${EX.reg.dep}/${EX.reg.ret}, air à ${EX.ti} °C`, answer: `Moyenne de l’eau : (${EX.reg.dep} + ${EX.reg.ret}) ÷ 2 = ${EX.reg.moy} °C ; écart moyen : ${EX.reg.moy} − ${EX.ti} = ${EX.reg.dTm} K`, why: "On fait la moyenne du départ et du retour, puis on retranche la température de l’air de la pièce." });
const exempleCoef = () => BE.exemple({ text: `Bureau : émetteur de ${B0().P} W (station H1), écart moyen ${EX.reg.dTm} K`, answer: `Coefficient : (${EX.reg.dTm} ÷ 50) puissance 1,3 = ${EX.reg.f} ; catalogue nécessaire : ${B0().P} ÷ ${EX.reg.f} = ${B0().need} W`, why: "On divise par le coefficient : le radiateur doit afficher au catalogue plus que ce qu’il donnera dans la pièce." });
const exempleChoix = () => BE.exemple({ text: `Bureau : catalogue nécessaire ${B0().need} W`, answer: `Plus petite longueur qui suffit : ${B0().L} mm, ${B0().P50} W ; au régime : ${B0().P50} × ${EX.reg.f} = ${B0().reel} W, au moins ${B0().P} W`, why: `La longueur du dessous, ${EX.catalogue[EX.catalogue.findIndex(c => c.L === B0().L) - 1].L} mm, donne ${EX.catalogue[EX.catalogue.findIndex(c => c.L === B0().L) - 1].P} W : trop peu.` });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "La puissance de chaque émetteur est imprimée en gras sur la feuille et rappelée dans le tableau sous la commande. Le régime et l’air des pièces sont dans la commande, le catalogue au verso de la feuille.",
      "Dans l’ordre : écart moyen et coefficient (écrans « L’écart moyen entre l’eau et l’air » et « Corriger la puissance du catalogue ») ; catalogue nécessaire de chaque pièce ; choix dans le catalogue (écran « Choisir le radiateur »).",
      `La ligne grisée de la feuille montre le geste sur le bureau d’exemple : ${B0().P} ÷ ${EX.reg.f} = ${B0().need} W, puis ${B0().L} mm. Pour la maison, le régime est ${EX.maison.dep}/${EX.maison.ret} et l’air à ${EX.maison.ti} °C : calculez d’abord son coefficient.`
    ],
    2: [
      "La puissance de chaque émetteur et la surface du séjour-cuisine sont dans le tableau sous la commande. Le catalogue est au verso de la feuille et à l’écran « La puissance du catalogue ».",
      "Faites les deux coefficients (écran « Moyenne arithmétique ou logarithmique »), le tableau des huit pièces aux deux régimes, puis le plancher du séjour (écran « Le plancher chauffant »). Ce que change la variante est à l’écran « Le régime change la taille des émetteurs ».",
      `Commencez par les écarts de l’eau à l’air : ${EX.maison.dep} − ${EX.maison.ti} et ${EX.maison.ret} − ${EX.maison.ti} pour le projet, puis la même chose pour ${EX.maison.vdep}/${EX.maison.vret}.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const donneesH1 = () => tableau(["Pièce", "Niveau", "Puissance de l’émetteur (W)", "Surface habitable (m²)"], [
  ...EX.maison.pieces.map(p => [p.nom, p.niveau, p.P, p.S]),
  ["Air des pièces (station T5)", "", "", `${EX.maison.ti} °C`]
], "Données reprises des stations H1, T5 et T1")
  + BE.schema("illustrations/schema-radiateurs-maison.svg", `Schéma de principe du circuit de la maison, à compléter. En bas à gauche, la pompe à chaleur air/eau du garage et la pompe de circulation sur le départ, en rouge, à ${EX.maison.dep} °C ; le retour, en bleu, à ${EX.maison.ret} °C. En haut, la branche de l’étage : chambres 1, 2 et 3, salle d’eau, palier. Au-dessous, la branche du rez-de-chaussée : deux radiateurs au séjour-cuisine, entrée, WC. Sous chaque radiateur, une longueur à choisir dans le catalogue.`, "Les radiateurs de la maison : les longueurs se choisissent sur la feuille.")
  + BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Générateur et émetteurs à la page 4" }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + donneesH1(); };

BE.station({
  code: "BE-H2",
  titre: "Les émetteurs",
  ligne: "Hydraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison, pièce par pièce, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, deux régimes, variante en plancher chauffant, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Un catalogue de radiateurs donne des puissances pour une eau très chaude. Avec une pompe à chaleur, l’eau est plus tiède : le même radiateur donne beaucoup moins. Vous corrigez la puissance du catalogue selon l’écart moyen entre l’eau et l’air, puis vous choisissez le radiateur de chaque pièce. Vous apprenez la méthode sur le petit bâtiment de bureaux des stations T5 et H1, puis vous la faites sur la maison.",
  note: "Le catalogue de radiateurs, l’exposant 1,3, la loi du plancher chauffant et les valeurs du bâtiment d’exemple sont des données de l’exercice, écrites pour cette station : aucun catalogue de fabricant.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, données et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Radiateur de chaque pièce de la maison de deux niveaux, au régime de la pompe à chaleur",
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage veut connaître les radiateurs à poser dans la maison des stations T1 à H1. Régime ${EX.maison.dep}/${EX.maison.ret} (station H1), air des pièces à ${EX.maison.ti} °C (station T5). Données de l’exercice : le catalogue au verso de la feuille ; deux radiateurs identiques dans le séjour-cuisine, un dans chaque autre pièce. Prenez l’écart moyen arithmétique. Suivez les étapes dans l’ordre.`,
        "Étape 1. Au recto de la feuille, écrivez le régime, la température moyenne de l’eau, l’air de la pièce, l’écart moyen et le coefficient, avec l’endroit où vous les avez lus.",
        "Étape 2. La puissance de l’émetteur de chaque pièce est imprimée sur la feuille (tableau ci-dessous). Calculez la puissance du catalogue nécessaire de chaque pièce.",
        "Étape 3. Au verso, choisissez dans le catalogue le radiateur de chaque pièce et contrôlez sa puissance au régime. Écrivez les trois lignes de la note de calcul, puis vérifiez le coefficient et le catalogue nécessaire au séjour-cuisine à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Puissance de l’émetteur de chaque pièce", ou: "Station H1 : dans le tableau ci-dessous et en gras sur la feuille" },
        { piece: "Régime, air des pièces", ou: "Cette commande (stations H1 et T5)" },
        { piece: "Catalogue de radiateurs de l’exercice", ou: "Au verso de la feuille, et à l’écran « La puissance du catalogue »" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : pompe à chaleur air/eau et radiateurs basse température" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Émetteurs de la maison de deux niveaux : radiateurs aux deux régimes, variante en plancher chauffant dans le séjour-cuisine, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le maître d’ouvrage veut connaître les radiateurs de la maison des stations T1 à H1, et ce que changerait le régime de la variante. Régime du projet ${EX.maison.dep}/${EX.maison.ret}, variante ${EX.maison.vdep}/${EX.maison.vret} (station H1) ; air des pièces à ${EX.maison.ti} °C (station T5). Données de l’exercice : le catalogue de radiateurs au verso de la feuille ; deux radiateurs identiques au séjour-cuisine ; un plancher chauffant qui donne ${EX.maison.k} W/m² par kelvin d’écart moyen entre l’eau et l’air. Avec l’écart moyen logarithmique, calculez le catalogue nécessaire et choisissez le radiateur de chaque pièce aux deux régimes. Étudiez ensuite le séjour-cuisine en plancher chauffant : quelle température moyenne de l’eau il demande. Rédigez la première page de la note de calcul, avec ce que la variante change. Citez la source de chaque donnée.`,
      pieces: [
        { piece: "Puissance de l’émetteur de chaque pièce, surface du séjour-cuisine", ou: "Stations H1 et T1, rappelées dans le tableau ci-dessous" },
        { piece: "Régimes, air des pièces", ou: "Cette commande (stations H1 et T5)" },
        { piece: "Catalogue de radiateurs, loi du plancher", ou: "Cette commande et le verso de la feuille, données de l’exercice" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : pompe à chaleur air/eau, radiateurs basse température" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "h2-n1-coef", libelle: "Coefficient de correction au régime du projet", unite: "", min: 0.343, max: 0.365, indice: "Relisez l’écran « L’écart moyen entre l’eau et l’air » : moyenne de l’eau, (départ + retour) ÷ 2, moins la température de l’air de la pièce. Puis l’écran « Corriger la puissance du catalogue » : coefficient = (écart moyen ÷ 50) puissance 1,3, au millième." },
      { id: "h2-n1-sejour", libelle: "Puissance du catalogue nécessaire au séjour-cuisine, deux radiateurs ensemble", unite: "W", min: 4683, max: 4973, indice: "Relisez l’écran « Corriger la puissance du catalogue » : la puissance de l’émetteur du séjour-cuisine (station H1) divisée par le coefficient. La valeur demandée est celle de la pièce entière, pour ses deux radiateurs ensemble." }
    ],
    2: [
      { id: "h2-n2-variante", libelle: "Somme des puissances du catalogue nécessaires au régime de la variante", unite: "W", min: 12921, max: 13721, indice: "Relisez l’écran « Moyenne arithmétique ou logarithmique » pour l’écart moyen de la variante, puis additionnez les puissances du catalogue nécessaires des huit pièces : chaque puissance de l’émetteur divisée par le coefficient de la variante." },
      { id: "h2-n2-plancher", libelle: "Écart moyen eau-air nécessaire au plancher du séjour-cuisine", unite: "K", min: 6.5, max: 7.1, indice: "Relisez l’écran « Le plancher chauffant » : la puissance de l’émetteur du séjour-cuisine divisée par sa surface donne des W/m², puis divisée par 6,5 W/m² par kelvin, l’écart moyen nécessaire, au dixième." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-H3", titre: "Le réseau d’eau", href: "../h3-reseau-eau/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-H1, Puissance et débit", href: "../h1-puissance-debit-regime/index.html", pourquoi: "La puissance de chaque émetteur et les régimes d’eau viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-T5, Le bilan d’hiver", href: "../t5-bilan-hiver/index.html", pourquoi: "La température de l’air des pièces et le besoin de chaque pièce viennent du bilan d’hiver." },
    { reseau: "HydroMétro", titre: "Plancher chauffant", href: "../../../hydrometro/stations/plancher/index.html", pourquoi: "Les boucles, le collecteur et leur réglage sur une installation réelle." },
    { reseau: "HydroMétro", titre: "Bitube", href: "../../../hydrometro/stations/bitube/index.html", pourquoi: "Le réseau qui alimente les radiateurs, départ et retour séparés." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : choisir l’émetteur de chaque pièce de la maison. La station H1 a donné la puissance que chaque émetteur doit fournir. Un catalogue donne la puissance de chaque radiateur, mais pour une eau bien plus chaude que celle d’une pompe à chaleur. Vous corrigez donc le catalogue au régime réel, puis vous choisissez la longueur de chaque radiateur. Le tableau se remplit de haut en bas. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Ligne du tableau", "Unité"], [
        ["Puissance de l’émetteur de chaque pièce (station H1)", "W"],
        ["Écart moyen entre l’eau et l’air", "K"],
        ["Coefficient de correction", "sans unité"],
        ["Puissance du catalogue nécessaire", "W"],
        ["Radiateur choisi : nombre et longueur", "mm"],
        ["Puissance du radiateur choisi, au régime", "W"]
      ], "Le tableau des émetteurs, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "les radiateurs de la maison."], ["Le dossier :", "la puissance de chaque émetteur (H1), l’air des pièces (T5), le catalogue de l’exercice."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "catalogue nécessaire et radiateur de chaque pièce."], ["Le résultat :", "le coefficient, le catalogue nécessaire au séjour, la note de calcul. Fourchette de ± 3 % à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station H3, le réseau d’eau."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "La puissance de chaque émetteur vient de la station H1 : le Φ du local de la station T5, plus la relance. Le régime d’eau vient aussi de H1. La température de l’air des pièces vient du bilan d’hiver, station T5. Le CCTP, page 4, donne des radiateurs basse température sur une pompe à chaleur air/eau, sans marque ni modèle. Le catalogue de radiateurs, son exposant et la loi du plancher chauffant sont des données de l’exercice, écrites pour cette station.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Puissance de l’émetteur de chaque pièce", "Station H1, rappelée dans la commande"],
        ["Régime d’eau du projet et de la variante", "Station H1, données de l’exercice"],
        ["Température de l’air des pièces", "Station T5"],
        ["Type de générateur et d’émetteurs", "Page 4 du CCTP"],
        ["Catalogue, exposant, loi du plancher", "La commande de cette station, données de l’exercice"]
      ], "Les données des émetteurs")
        + BE.renvoi('La puissance de chaque émetteur se calcule à <a href="../h1-puissance-debit-regime/index.html">la station H1</a>.')
    }),

    BE.ecran({
      id: "familles", dossier: "methode", kicker: "La méthode, 1", title: "Trois familles d’émetteurs", level: "comprendre",
      text: "L’émetteur cède à la pièce la chaleur que l’eau apporte. Le radiateur chauffe l’air qui le touche ; cet air monte et fait le tour de la pièce. Le plancher chauffant cache des tubes dans la dalle : tout le sol devient émetteur, à peine plus chaud que la pièce. Le ventilo-convecteur souffle l’air sur une batterie à ailettes : il donne beaucoup de puissance pour sa taille, il chauffe avec de l’eau chaude et il refroidit avec de l’eau glacée. Plus la surface d’échange est grande, plus l’eau peut rester tiède pour la même puissance.",
      prompt: "Regardez les trois symboles et lisez le tableau, puis continuez.",
      render: () => BE.schema("illustrations/schema-familles.svg", "Trois symboles côte à côte. À gauche, un radiateur à eau : il chauffe l’air qui le touche. Au milieu, un plancher chauffant, des tubes en spirale noyés dans la dalle. À droite, un ventilo-convecteur : un ventilateur souffle l’air sur une batterie à ailettes.", "Le radiateur, le plancher chauffant, le ventilo-convecteur.")
        + tableau(["Émetteur", "Surface d’échange", "Eau qu’il accepte"], [
          ["Radiateur", "moyenne", "chaude ou tiède, avec un radiateur plus grand quand elle est tiède"],
          ["Plancher chauffant", "tout le sol", "tiède"],
          ["Ventilo-convecteur", "petite, l’air est soufflé", "chaude, tiède ou glacée"]
        ], "Les trois familles, comparées")
    }),

    BE.ecran({
      id: "catalogue", dossier: "methode", kicker: "La méthode, 2", title: "La puissance du catalogue", level: "comprendre",
      text: `Un catalogue de radiateurs donne, pour chaque modèle et chaque longueur, une puissance mesurée dans des conditions fixées : eau à ${EX.cat.dep} °C au départ et ${EX.cat.ret} °C au retour, air à ${EX.cat.air} °C. L’eau y est en moyenne à 70 °C, soit ${EX.dtn} K au-dessus de l’air : c’est l’écart moyen de ${EX.dtn} K du catalogue. Les catalogues réels écrivent ces conditions en tête du tableau. La station utilise un catalogue écrit pour l’exercice : un radiateur à panneaux de 600 mm de haut, en neuf longueurs.`,
      prompt: "Lisez le catalogue de l’exercice, puis continuez.",
      render: () => tableau(["Longueur (mm)", "Puissance à 50 K (W)"], EX.catalogue.map(c => [c.L, c.P]), `Catalogue de l’exercice : radiateur à panneaux, hauteur 600 mm, exposant n = ${EX.n}`)
        + BE.alerte(`<strong>Piège.</strong> La puissance du catalogue n’est pas celle que le radiateur donnera dans la maison : l’eau de la pompe à chaleur est bien moins chaude que ${EX.cat.dep}/${EX.cat.ret}.`)
    }),

    BE.ecran({
      id: "ecart-moyen", dossier: "methode", kicker: "La méthode, 3", title: "L’écart moyen entre l’eau et l’air", level: "comprendre",
      text: `Un radiateur donne d’autant plus de chaleur que son eau est chaude par rapport à l’air de la pièce. On compte cet écart avec la température moyenne de l’eau dans le radiateur, entre le départ et le retour. L’écart moyen vaut (départ + retour) ÷ 2 − θi, en kelvins. Il est différent de ΔT de l’eau, départ moins retour, qui servait au débit à la station H1. Le bâtiment d’exemple fonctionne en ${EX.reg.dep}/${EX.reg.ret}, avec l’air des bureaux à ${EX.ti} °C (station T5).`,
      prompt: "Lisez le schéma et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-ecart.svg", `Échelle des températures. En haut, le départ à ${EX.reg.dep} °C, en rouge ; la moyenne de l’eau à ${EX.reg.moy} °C, en pointillé ; le retour à ${EX.reg.ret} °C, en bleu ; en bas, l’air de la pièce à ${EX.ti} °C. Une flèche entre départ et retour : ΔT de l’eau ${EX.reg.dT} K. Une flèche entre la moyenne de l’eau et l’air : écart moyen ${EX.reg.dTm} K.`, "L’écart moyen se compte de la moyenne de l’eau à l’air de la pièce.")
        + exempleEcart()
        + BE.alerte(`<strong>Piège.</strong> Prendre ΔT de l’eau, ${EX.reg.dT} K, ou le départ seul, ${EX.reg.dep} − ${EX.ti} K. L’écart moyen part de la moyenne de l’eau.`)
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, l’écart moyen", title: "Exercice : l’écart moyen", level: "appliquer", requiresAction: true,
      text: {
        1: `Un radiateur fonctionne au régime ${EX.ex1.dep}/${EX.ex1.ret}, dans une pièce à ${EX.ex1.ti} °C. Calculez la température moyenne de l’eau, puis l’écart moyen entre l’eau et l’air. L’exemple résolu reste sous vos yeux : refaites le même geste.`,
        2: `Un radiateur fonctionne au régime ${EX.ex1.dep}/${EX.ex1.ret}, dans une pièce à ${EX.ex1.ti} °C. Calculez l’écart moyen arithmétique entre l’eau et l’air, sans l’exemple.`
      },
      prompt: { 1: "Choisissez l’écart moyen, en vous aidant de l’exemple.", 2: "Choisissez l’écart moyen. Cette question est à faire seul." },
      aides: {
        1: ["Le régime et l’air sont dans l’énoncé. La méthode est à l’écran « L’écart moyen entre l’eau et l’air ».", "Deux lignes : la moyenne de l’eau, (départ + retour) ÷ 2, puis cette moyenne moins l’air de la pièce.", `Sur l’exemple : (${EX.reg.dep} + ${EX.reg.ret}) ÷ 2 = ${EX.reg.moy} °C, puis ${EX.reg.moy} − ${EX.ti} = ${EX.reg.dTm} K. Faites les mêmes lignes avec ${EX.ex1.dep}/${EX.ex1.ret} et ${EX.ex1.ti} °C.`],
        2: ["La méthode est à l’écran « L’écart moyen entre l’eau et l’air ».", "La moyenne de l’eau d’abord, l’air de la pièce ensuite.", `Commencez par (${EX.ex1.dep} + ${EX.ex1.ret}) ÷ 2.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleEcart(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),

    BE.ecran({
      id: "coefficient", dossier: "methode", kicker: "La méthode, 4", title: "Corriger la puissance du catalogue", level: "comprendre",
      text: `La puissance d’un radiateur ne suit pas l’écart moyen en ligne droite. La méthode de la station l’écrit : puissance au régime = puissance du catalogue × (écart moyen ÷ ${EX.dtn}) puissance n. L’exposant n dépend du radiateur ; celui du catalogue de l’exercice vaut ${EX.n}. Le coefficient (écart moyen ÷ ${EX.dtn}) puissance n s’arrondit au millième. Pour trouver le radiateur, on part du besoin de la pièce : puissance du catalogue nécessaire = puissance de l’émetteur ÷ coefficient. Sur la calculatrice, la touche puissance s’écrit x^y ou ^.`,
      prompt: "Lisez la courbe, le tableau et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-courbe.svg", `Courbe du coefficient en fonction de l’écart moyen, de 0 à 55 K. Elle vaut 1 à 50 K et descend vite en dessous. Quatre points, air à ${EX.ti} °C : ${EX.courbe.map(x => `écart ${x.x} K, ${x.s}`).join(" ; ")}.`, "Sous 50 K d’écart moyen, le radiateur donne moins que son catalogue.")
        + tableau(["Régime", "Écart moyen (K)", "Coefficient", `Radiateur de ${EX.rad.L} mm (W)`], EX.table.map(x => [x.reg, x.dTm, x.f, x.P]), `Le radiateur de ${EX.rad.L} mm du catalogue, ${EX.rad.P} W à 50 K, à six régimes, air à ${EX.ti} °C`)
        + exempleCoef()
        + BE.schema("illustrations/schema-correction.svg", `Trois cases reliées par des flèches. Émetteur du bureau, ${B0().P} W. Divisé par le coefficient (${EX.reg.dTm} ÷ 50) puissance 1,3, égal à ${EX.reg.f}. Catalogue nécessaire, ${B0().need} W. Dessous : catalogue ${B0().L} mm, ${B0().P50} W à 50 K ; au régime ${EX.reg.dep}/${EX.reg.ret}, ${B0().P50} × ${EX.reg.f} = ${B0().reel} W.`, "Du besoin de la pièce au catalogue, puis le contrôle au régime.")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, le catalogue nécessaire", title: "Exercice : la puissance du catalogue", level: "appliquer", requiresAction: true,
      text: {
        1: `Une chambre demande un émetteur de ${EX.ex2.P} W, au régime ${EX.ex2.dep}/${EX.ex2.ret}, air à ${EX.ex2.ti} °C. Le radiateur a un exposant de 1,3. Calculez l’écart moyen, le coefficient, puis la puissance du catalogue nécessaire. L’exemple résolu reste sous vos yeux.`,
        2: `Une chambre demande un émetteur de ${EX.ex2.P} W, au régime ${EX.ex2.dep}/${EX.ex2.ret}, air à ${EX.ex2.ti} °C. Le radiateur a un exposant de 1,3. Calculez la puissance du catalogue nécessaire, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la puissance du catalogue nécessaire, en vous aidant de l’exemple.", 2: "Choisissez la puissance du catalogue nécessaire. Cette question est à faire seul." },
      aides: {
        1: ["La puissance, le régime et l’air sont dans l’énoncé. La méthode est à l’écran « Corriger la puissance du catalogue ».", "Trois lignes : écart moyen, coefficient (écart ÷ 50) puissance 1,3 au millième, puis la puissance divisée par le coefficient.", `Sur l’exemple : (${EX.reg.dTm} ÷ 50) puissance 1,3 = ${EX.reg.f}, puis ${B0().P} ÷ ${EX.reg.f} = ${B0().need} W.`],
        2: ["La méthode est à l’écran « Corriger la puissance du catalogue ».", "L’écart moyen, puis le coefficient, puis une division.", `L’écart moyen vaut ${EX.ex2.dTm} K.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleCoef(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "choisir", dossier: "methode", kicker: "La méthode, 5", title: "Choisir le radiateur dans le catalogue", level: "comprendre",
      text: "On prend la plus petite longueur du catalogue dont la puissance à 50 K atteint au moins la puissance du catalogue nécessaire. Une longueur plus grande chaufferait aussi, mais coûterait plus et prendrait plus de mur. Une grande pièce reçoit deux radiateurs identiques : chacun donne la moitié. Pour contrôler, on multiplie la puissance du catalogue du radiateur choisi par le coefficient : le résultat doit atteindre la puissance de l’émetteur. La salle de réunion du bâtiment d’exemple a deux radiateurs, valeur d’exercice.",
      prompt: "Suivez le tableau du bâtiment d’exemple, puis continuez.",
      render: () => tableau(["Local", "Émetteur, H1 (W)", `Catalogue nécessaire (W)`, "Choix", "Catalogue du choix (W)", `Au régime ${EX.reg.dep}/${EX.reg.ret} (W)`],
        EX.locaux.map(l => [l.nom, l.P, l.need, l.choix, l.P50t, l.reel]), `Radiateurs du bâtiment d’exemple, coefficient ${EX.reg.f}`)
        + exempleChoix()
        + BE.alerte("<strong>Piège.</strong> Chercher dans le catalogue la puissance de l’émetteur sans la corriger : le radiateur choisi est deux à trois fois trop petit.")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, le choix", title: "Exercice : choisir le radiateur", level: "appliquer", requiresAction: true,
      text: {
        1: `Une salle d’eau demande un émetteur de ${EX.ex3.P} W, au régime ${EX.ex3.dep}/${EX.ex3.ret}, air à ${EX.ex3.ti} °C, avec le radiateur du catalogue de l’exercice. Calculez le coefficient, le catalogue nécessaire, puis choisissez la longueur. L’exemple résolu reste sous vos yeux.`,
        2: `Une salle d’eau demande un émetteur de ${EX.ex3.P} W, au régime ${EX.ex3.dep}/${EX.ex3.ret}, air à ${EX.ex3.ti} °C, avec le radiateur du catalogue de l’exercice. Choisissez la longueur du radiateur, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le radiateur, en vous aidant de l’exemple.", 2: "Choisissez le radiateur. Cette question est à faire seul." },
      aides: {
        1: ["La puissance, le régime et l’air sont dans l’énoncé ; le catalogue est à l’écran « La puissance du catalogue ».", "Écart moyen, coefficient, catalogue nécessaire, puis la plus petite longueur qui l’atteint.", `Sur l’exemple : ${B0().need} W nécessaires, donc ${B0().L} mm, ${B0().P50} W.`],
        2: ["La méthode est aux écrans « Corriger la puissance du catalogue » et « Choisir le radiateur dans le catalogue ».", "Le catalogue nécessaire d’abord, la longueur ensuite.", `L’écart moyen vaut ${EX.ex3.dTm} K, le coefficient ${EX.ex3.f}.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleChoix(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "logarithmique", dossier: "methode", kicker: "La méthode, 6", title: "Moyenne arithmétique ou logarithmique", level: "comprendre",
      text: "L’eau ne se refroidit pas en ligne droite dans le radiateur : elle perd vite sa chaleur à l’entrée, plus lentement vers la sortie. L’écart moyen logarithmique en tient compte : (départ − retour) ÷ ln((départ − θi) ÷ (retour − θi)), au dixième de kelvin. Il est toujours un peu plus petit que l’écart arithmétique. Quand le départ et le retour sont proches, les deux se valent ; quand ΔT de l’eau grandit, l’écart grandit aussi. Les exemples et les exercices de la méthode prennent l’écart arithmétique. Au projet, le niveau 1 prend l’écart arithmétique, le niveau 2 l’écart logarithmique.",
      prompt: "Comparez les deux colonnes du tableau, puis continuez.",
      render: () => tableau(["Régime", "Arithmétique (K)", "Logarithmique (K)", "L’arithmétique dépasse de"], EX.logTable.map(x => [x.reg, x.a, x.l, x.e]), `Écart moyen à quatre régimes, air à ${EX.ti} °C ; dernière colonne : (arithmétique − logarithmique) ÷ logarithmique`)
        + BE.renvoi(`ln se lit sur la calculatrice. Exemple au régime 50/40, air à ${EX.ti} °C : (50 − 40) ÷ ln(${50 - EX.ti} ÷ ${40 - EX.ti}) = ${EX.logTable[0].l} K, arrondi au dixième.`)
    }),

    BE.ecran({
      id: "regime-taille", dossier: "methode", kicker: "La méthode, 7", title: "Le régime change la taille des émetteurs", level: "comprendre",
      text: `Une eau moins chaude en moyenne donne un écart moyen plus petit, donc un coefficient plus petit : il faut plus de catalogue pour la même pièce. Le bureau d’exemple passé au régime ${EX.variante.dep}/${EX.variante.ret} a un écart moyen arithmétique de ${EX.variante.dTm} K et un coefficient de ${EX.variante.f} : son catalogue nécessaire monte à ${EX.variante.need} W, ${EX.variante.hausse} % de plus qu’au régime ${EX.reg.dep}/${EX.reg.ret}. En échange, le débit d’eau baisse quand ΔT de l’eau grandit (station H1) ; et quand le départ baisse, la pompe à chaleur produit une eau moins chaude. Le choix du régime se fait donc avec les émetteurs, le réseau et le générateur ensemble.`,
      prompt: "Lisez le tableau, puis continuez.",
      render: () => tableau(["Bureau d’exemple", `Régime ${EX.reg.dep}/${EX.reg.ret}`, `Régime ${EX.variante.dep}/${EX.variante.ret}`], [
        ["Écart moyen (K)", EX.reg.dTm, EX.variante.dTm],
        ["Coefficient", EX.reg.f, EX.variante.f],
        ["Catalogue nécessaire (W)", B0().need, EX.variante.need]
      ], `Le même bureau, émetteur de ${B0().P} W, à deux régimes, écart moyen arithmétique`)
        + BE.alerte("<strong>Piège.</strong> Garder les radiateurs choisis pour un régime et baisser la température de l’eau : la pièce n’atteint plus sa température par grand froid.")
    }),

    BE.ecran({
      id: "plancher", dossier: "methode", kicker: "La méthode, 8", title: "Le plancher chauffant", level: "comprendre",
      text: `Le plancher chauffant se choisit par sa surface : celle de la pièce. On cherche la puissance que chaque mètre carré doit donner, la densité, en W/m² : puissance de l’émetteur ÷ surface. Le plancher de l’exercice donne ${EX.plancher.k} W/m² par kelvin d’écart moyen entre l’eau et l’air, donnée de l’exercice. L’écart moyen nécessaire vaut donc densité ÷ ${EX.plancher.k}, au dixième. La température moyenne de l’eau vaut l’air de la pièce plus cet écart. Le raccordement d’un plancher au circuit des radiateurs se traite avec le réseau (station H3) : ici, on ne cherche que la température moyenne de l’eau. Exemple : la ${EX.plancher.nom.toLowerCase()} du bâtiment d’exemple, ${EX.plancher.P} W sur ${EX.plancher.S} m², valeurs d’exercice.`,
      prompt: "Suivez le schéma de l’exemple, puis continuez.",
      render: () => BE.schema("illustrations/schema-plancher.svg", `Trois cases reliées par des flèches. Émetteur de ${EX.plancher.P} W divisé par ${EX.plancher.S} m², égal à ${EX.plancher.dens} W/m². Divisé par ${EX.plancher.k} W/m² par kelvin, écart moyen ${EX.plancher.dTm} K. Eau en moyenne : ${EX.ti} + ${EX.plancher.dTm} = ${EX.plancher.moy} °C. Dessous : radiateurs du même bâtiment, eau à ${EX.reg.moy} °C en moyenne.`, "Le plancher demande une eau bien moins chaude que les radiateurs.")
        + BE.exemple({ text: `${EX.plancher.nom} : ${EX.plancher.P} W, ${EX.plancher.S} m², air à ${EX.ti} °C`, answer: `${EX.plancher.P} ÷ ${EX.plancher.S} = ${EX.plancher.dens} W/m² ; ${EX.plancher.dens} ÷ ${EX.plancher.k} = ${EX.plancher.dTm} K ; eau à ${EX.ti} + ${EX.plancher.dTm} = ${EX.plancher.moy} °C en moyenne`, why: "Toute la surface du sol chauffe : une eau à peine plus chaude que la pièce suffit." })
        + BE.renvoi('Les boucles, le collecteur et leur réglage se voient à la station HydroMétro <a href="../../../hydrometro/stations/plancher/index.html">Plancher chauffant</a>.')
    }),

    BE.ecran({
      id: "ventilo", dossier: "methode", kicker: "La méthode, 9", title: "Le ventilo-convecteur", level: "comprendre",
      text: "Le ventilo-convecteur pousse l’air de la pièce sur une batterie à ailettes avec un ventilateur. Son catalogue donne la puissance pour un régime d’eau et une vitesse du ventilateur : on la lit directement au régime du projet, quand il y figure. Il donne beaucoup de puissance pour peu de place, et le même appareil sert à refroidir en été avec de l’eau glacée (station F5). En échange, il fait du bruit, il demande une alimentation électrique et, en froid, une évacuation des condensats. La maison du projet n’a pas de climatisation (CCTP, page 4) : la commande ne le retient pas.",
      prompt: "Relisez la troisième famille sur le schéma, puis continuez.",
      render: () => BE.schema("illustrations/schema-familles.svg", "Trois symboles côte à côte : radiateur, plancher chauffant, ventilo-convecteur. Le ventilo-convecteur, à droite, montre un ventilateur au-dessus d’une batterie à ailettes.", "À droite, le ventilo-convecteur : le ventilateur souffle l’air sur la batterie.")
        + tableau(["Émetteur", "Ce que donne son catalogue", "Ce que vous calculez"], [
          ["Radiateur", "puissance à 50 K", "le coefficient, puis la longueur"],
          ["Plancher chauffant", "W/m² par kelvin d’écart", "la densité, puis l’écart moyen de l’eau"],
          ["Ventilo-convecteur", "puissance au régime et à la vitesse", "le modèle qui donne la puissance à la vitesse choisie"]
        ], "Trois catalogues, trois lectures")
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 10", title: "La note de calcul des émetteurs", level: "comprendre",
      text: "La note de calcul donne à un lecteur de quoi refaire le choix : l’objet, les données d’entrée avec leur source, les hypothèses, la méthode, les résultats. Le catalogue employé, l’exposant et le nombre de radiateurs d’une pièce sont des hypothèses : elles s’écrivent comme telles. La note du bâtiment d’exemple tient en six lignes.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Choix des radiateurs, petit bâtiment de bureaux de plain-pied, trois locaux, pompe à chaleur"],
        ["Données d’entrée", `Puissance des émetteurs : station H1 ; air des bureaux ${EX.ti} °C : station T5`],
        ["Hypothèses", `Régime ${EX.reg.dep}/${EX.reg.ret} ; catalogue de l’exercice, n = ${EX.n} ; deux radiateurs en salle de réunion ; écart moyen arithmétique`],
        ["Méthode", "Catalogue nécessaire = puissance de l’émetteur ÷ (écart moyen ÷ 50) puissance n ; plus petite longueur qui suffit"],
        ["Résultats", EX.locaux.map(l => `${l.nom.toLowerCase()} ${l.choix}`).join(", ")],
        ["Contrôle", EX.locaux.map(l => `${l.reel} W pour ${l.P} W`).join(" ; ")]
      ], "Première page de la note de calcul, bâtiment d’exemple")
        + BE.renvoi("La note complète du projet s’assemble à la station R5, « La note de calcul ».")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

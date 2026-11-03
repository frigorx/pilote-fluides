/* Station BE-R1 : Réguler le chauffage.
   Méthode sur le petit bâtiment de bureaux des stations T5 à H5 (bureau, salle de réunion, sanitaires), puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/r1-reguler-chauffage/construire.mjs : le premier vient de exemple-data.mjs, les secondes de
   corriges/r1-reguler-chauffage/reference-regulation.json (outils/r1-regulation-maison.mjs ; ± 3 % sur un calcul, ± 1 K sur une
   température lue sur la courbe).
   La maison n'apparaît que par les données de la commande (régime de H1 et H5, température de base et semaine de relevés de E1,
   consignes de E2) et les bornes des fourchettes. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";
const GARE5 = "../../../plan/gares/cvcr5-synoptique-regulation/index.html";

/*EXEMPLE-DEBUT*/
const EX = {
 "nc": "18",
 "seuil": "18",
 "ex": {
  "base": "−7",
  "amb": "19",
  "dep": "50",
  "ret": "40",
  "dDep": "31",
  "dExt": "25",
  "pente": "1,24",
  "H": "115,23",
  "P": [
   {
    "te": "−7",
    "P": "2996"
   },
   {
    "te": "0",
    "P": "2189"
   },
   {
    "te": "10",
    "P": "1037"
   }
  ],
  "lect": [
   {
    "te": "0",
    "dep": "41,3",
    "calc": "19 + 1,24 × 18 = 41,3 °C"
   },
   {
    "te": "10",
    "dep": "28,9",
    "calc": "19 + 1,24 × 8 = 28,9 °C"
   }
  ],
  "reduit": "15",
  "dec": "−4",
  "lectRed": [
   {
    "te": "0",
    "dep": "41,3",
    "red": "37,3"
   },
   {
    "te": "10",
    "dep": "28,9",
    "red": "24,9"
   }
  ],
  "avril": [
   {
    "jour": "lundi",
    "tmin": "9",
    "tmax": "17",
    "moy": "13",
    "chauffe": true,
    "dep": "25,2"
   },
   {
    "jour": "mardi",
    "tmin": "12",
    "tmax": "22",
    "moy": "17",
    "chauffe": true,
    "dep": "20,2"
   },
   {
    "jour": "mercredi",
    "tmin": "14",
    "tmax": "24",
    "moy": "19",
    "chauffe": false,
    "dep": ""
   },
   {
    "jour": "jeudi",
    "tmin": "13",
    "tmax": "22",
    "moy": "17,5",
    "chauffe": true,
    "dep": "19,6"
   },
   {
    "jour": "vendredi",
    "tmin": "15",
    "tmax": "25",
    "moy": "20",
    "chauffe": false,
    "dep": ""
   }
  ],
  "pl": {
   "dep": "35",
   "ret": "30",
   "prod": "50",
   "pente": "0,64",
   "te": "0",
   "dep0": "30,5"
  }
 },
 "ent1": {
  "base": "−8",
  "dep": "55",
  "amb": "20",
  "te": "4",
  "pente": "1,35",
  "depart": "38,9",
  "quiz": {
   "choices": [
    "40,0 °C",
    "38,9 °C",
    "30,4 °C",
    "49,7 °C"
   ],
   "good": 1,
   "explain": "Pente : (55 − 20) ÷ (18 − (−8)) = 35 ÷ 26 = 1,35. Départ : 20 + 1,35 × (18 − 4) = 20 + 1,35 × 14 = 38,9 °C. Prendre 20 °C au lieu de 18 °C pour le non-chauffage donne 40,0 °C ; diviser à l’envers donne 30,4 °C ; ajouter 4 au lieu de le retrancher donne 49,7 °C."
  }
 },
 "ent2": {
  "reduit": "16",
  "dec": "−4",
  "tmin": "13",
  "tmax": "25",
  "moy": "19",
  "quiz": {
   "choices": [
    "38,9 °C la nuit ; ce jour-là, chauffage arrêté",
    "34,9 °C la nuit ; ce jour-là, chauffage en marche",
    "33,5 °C la nuit ; ce jour-là, chauffage arrêté",
    "34,9 °C la nuit ; ce jour-là, chauffage arrêté"
   ],
   "good": 3,
   "explain": "La nuit, la droite descend de l’écart de consigne : 16 − 20 = −4 K, donc 38,9 − 4 = 34,9 °C. Le jour de printemps : moyenne (13 + 25) ÷ 2 = 19 °C, au moins le seuil de 18 °C : arrêt. Garder le départ de jour oublie le réduit ; regarder la température la plus basse au lieu de la moyenne fait chauffer pour rien ; multiplier le décalage par la pente baisse trop."
  }
 },
 "ent3": {
  "labels": [
   "Mesure une température",
   "Compare et commande",
   "Est commandé"
  ],
  "lignes": [
   {
    "text": "Sonde extérieure SE1",
    "good": 0
   },
   {
    "text": "Pompe de circulation",
    "good": 2
   },
   {
    "text": "Régulateur RG1",
    "good": 1
   },
   {
    "text": "Thermostat d’ambiance SA1",
    "good": 0
   },
   {
    "text": "Moteur de la vanne trois voies",
    "good": 2
   },
   {
    "text": "Sonde de départ SD1",
    "good": 0
   }
  ],
  "lignesN2": [
   {
    "text": "Appareil A",
    "good": 0
   },
   {
    "text": "Pompe de circulation",
    "good": 2
   },
   {
    "text": "Appareil D",
    "good": 1
   },
   {
    "text": "Appareil C",
    "good": 0
   },
   {
    "text": "Moteur de la vanne trois voies",
    "good": 2
   },
   {
    "text": "Appareil B",
    "good": 0
   }
  ],
  "exemple": {
   "text": "La pompe à chaleur, sur le schéma du bâtiment d’exemple",
   "good": 2,
   "why": "Un trait mixte part de RG1 et arrive à la pompe à chaleur : elle est commandée."
  }
 },
 "maison": {
  "base": "−5",
  "dep": "45",
  "ret": "40",
  "amb": "20",
  "reduit": "17",
  "horaires": "confort de 6 h à 22 h, réduit de 22 h à 6 h",
  "jours": [
   {
    "jour": "lundi",
    "tmin": "3",
    "tmax": "11"
   },
   {
    "jour": "mardi",
    "tmin": "2",
    "tmax": "10"
   },
   {
    "jour": "mercredi",
    "tmin": "5",
    "tmax": "13"
   },
   {
    "jour": "jeudi",
    "tmin": "4",
    "tmax": "12"
   },
   {
    "jour": "vendredi",
    "tmin": "1",
    "tmax": "9"
   },
   {
    "jour": "samedi",
    "tmin": "6",
    "tmax": "14"
   },
   {
    "jour": "dimanche",
    "tmin": "7",
    "tmax": "15"
   }
  ],
  "mai": [
   {
    "jour": "jour 1",
    "tmin": "10",
    "tmax": "20"
   },
   {
    "jour": "jour 2",
    "tmin": "13",
    "tmax": "24"
   },
   {
    "jour": "jour 3",
    "tmin": "15",
    "tmax": "27"
   }
  ]
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const X = () => EX.ex;
const figLoi = () => BE.schema("illustrations/loi-eau-exemple.svg", `Graphique : température extérieure en abscisse, de −10 à 20 °C ; température de départ en ordonnée, de 15 à 55 °C. Une droite rouge descend du point froid (${X().base} °C ; ${X().dep} °C) au point doux (${EX.nc} °C ; ${X().amb} °C) : c’est la loi d’eau du bâtiment d’exemple. Plus il fait froid dehors, plus l’eau part chaude.`, "La loi d’eau : une droite qui passe par deux points.");
const figPente = () => BE.schema("illustrations/loi-eau-pente.svg", `La loi d’eau du bâtiment d’exemple et le triangle de sa pente : un trait horizontal en pointillé va du point froid jusqu’à l’aplomb du point doux, ${X().dExt} K ; un trait vertical descend de là au point doux, ${X().dDep} K. Pente : ${X().dDep} ÷ ${X().dExt} = ${X().pente}.`, "La pente : l’écart vertical divisé par l’écart horizontal.");
const figLecture = () => BE.schema("illustrations/loi-eau-lecture.svg", `La loi d’eau du bâtiment d’exemple et deux lectures en pointillé orange : de ${X().lect[0].te} °C sur l’axe horizontal, on monte jusqu’à la droite et on lit ${X().lect[0].dep} °C sur l’axe vertical ; de ${X().lect[1].te} °C, on lit ${X().lect[1].dep} °C.`, "Lire un départ : monter jusqu’à la droite, puis lire à gauche.");
const exempleDepart = () => BE.exemple({ text: `Bâtiment d’exemple, pente ${X().pente}, ambiance ${X().amb} °C, par ${X().lect[0].te} °C dehors`, answer: `${X().amb} + ${X().pente} × (${EX.nc} − ${X().lect[0].te}) = ${X().lect[0].dep} °C`, why: `On part du point doux (${EX.nc} °C ; ${X().amb} °C) : chaque kelvin plus froid que ${EX.nc} °C ajoute ${X().pente} K au départ.` });
const exempleReduit = () => BE.exemple({ text: `Bâtiment d’exemple la nuit, ${X().reduit} °C au lieu de ${X().amb} °C, par ${X().lectRed[0].te} °C dehors`, answer: `décalage ${X().reduit} − ${X().amb} = ${X().dec} K ; ${X().lectRed[0].dep} ${X().dec.replace("−", "− ")} = ${X().lectRed[0].red} °C`, why: "La pente ne change pas : toute la droite descend de l’écart de consigne." });
const figSchemaEx = () => BE.schema("illustrations/schema-regulation-exemple.svg", "Schéma de régulation du local technique du bâtiment d’exemple. En bas à gauche, la pompe à chaleur air/eau ; le départ en rouge passe la soupape, la vanne, la pompe, puis la sonde de départ SD1 avant le collecteur des quatre radiateurs ; le retour en bleu passe le ballon tampon, le vase, le manomètre et le remplissage. En haut à gauche, dehors, la sonde extérieure SE1 ; au milieu, le régulateur RG1 ; en haut à droite, le thermostat d’ambiance SA1 du bureau. Trois liaisons de mesure en pointillé vont de SE1, SD1 et SA1 vers RG1 ; deux liaisons de commande en trait mixte partent de RG1, l’une vers la pompe, l’autre vers la pompe à chaleur.", "Le schéma de principe de la station H5, avec la régulation.");

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Le régime, la température de base, les consignes et la semaine de janvier sont dans le tableau sous la commande et en gras sur la feuille.",
      "Dans l’ordre : la pente (écran « La pente de la loi d’eau ») ; le tracé et la lecture (écran « Lire un départ ») ; le samedi, le réduit et l’arrêt d’été (écrans « Le réduit de nuit » et « L’arrêt d’été ») ; le schéma (écrans « Les sondes et le régulateur » et « Le schéma de régulation »).",
      "Point froid : la température de base et le départ du régime. Point doux : 18 °C dehors et la consigne d’ambiance."
    ],
    2: [
      "Le régime vient des stations H1 et H5, la température de base et la semaine de la station E1, les consignes de la station E2 : tous sont rappelés sous la commande.",
      "Loi d’eau et réduit sur la grille, départ de trois jours, arrêt d’été, schéma de régulation à compléter, note de calcul.",
      "Commencez par les deux points de la droite et la pente, au centième."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const donneesMaison = () => tableau(["Jour de janvier", "Tmin (°C)", "Tmax (°C)"], EX.maison.jours.map(j => [j.jour, j.tmin, j.tmax]), "La semaine de relevés de la maison, station E1 (valeurs d’exercice)")
  + tableau(["Jour de mai", "Tmin (°C)", "Tmax (°C)"], EX.maison.mai.map(j => [j.jour, j.tmin, j.tmax]), "Trois jours de mai, pour l’arrêt d’été (données de l’exercice)")
  + BE.schema("illustrations/schema-maison-principe.svg", "Schéma de principe de la chaufferie de la maison, station H5 : pompe à chaleur air/eau au garage, soupape, vanne et pompe sur le départ, à 45 °C ; colonne, collecteur de l’étage (lignes 4 à 8) et collecteur du rez-de-chaussée (lignes 9 à 12, le séjour en 9 et 10) ; retour à 40 °C par le ballon tampon, le vase, le manomètre, le remplissage et une vanne. Aucune sonde ni régulateur n’y est encore dessiné.", "Le schéma de principe de la maison (station H5), avant la régulation.")
  + BE.renvoi(`Régime ${EX.maison.dep}/${EX.maison.ret} (stations H1 et H5). Température de base ${EX.maison.base} °C (station E1, page 3 du CCTP). Consigne ${EX.maison.amb} °C, réduit ${EX.maison.reduit} °C la nuit, ${EX.maison.horaires} (station E2). Pompe à chaleur air/eau au garage (page 4 du CCTP). Données de l’exercice : non-chauffage et arrêt d’été à ${EX.nc} °C, moyenne du jour comme température extérieure, trois jours de mai.`)
  + BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Température de base page 3, pompe à chaleur page 4" }, { href: DOSSIER + "plans.html", title: "Les plans de la maison", note: "Façade nord, séjour, garage" }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + donneesMaison(); };

BE.station({
  code: "BE-R1",
  titre: "Réguler le chauffage",
  ligne: "Régulation et énergie",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, loi d’eau, schéma de régulation et note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "La station H5 a tracé le schéma de principe de la chaufferie. Il reste à dire à quelle température l’eau part selon le temps qu’il fait, et qui le décide. Vous réglez la loi d’eau de la pompe à chaleur, sa courbe de nuit et son arrêt d’été, puis vous posez les sondes, le régulateur et leurs liaisons sur le schéma. Vous apprenez la méthode sur le petit bâtiment de bureaux des stations T5 à H5, puis vous la faites sur la maison.",
  note: "La formule de la pente et la température de non-chauffage de 18 °C viennent d’une fiche mémento du fonds du professeur. L’arrêt d’été sur la moyenne du jour, le réduit des bureaux et les trois jours de mai sont des données de l’exercice.",

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
      objet: "Loi d’eau, réduit de nuit, arrêt d’été et lecture du schéma de régulation de la maison",
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage veut que le chauffage de la maison des stations T1 à H5 suive le temps qu’il fait. Régime ${EX.maison.dep}/${EX.maison.ret} (stations H1 et H5) ; température de base ${EX.maison.base} °C (station E1) ; consigne ${EX.maison.amb} °C le jour, ${EX.maison.reduit} °C la nuit (station E2) ; non-chauffage et arrêt d’été à ${EX.nc} °C (données de l’exercice). Tout est sous la commande et en gras sur la feuille. Suivez les étapes dans l’ordre.`,
        "Étape 1. Au recto de la feuille, calculez la pente de la loi d’eau, au centième. Étape 2. Placez les deux points sur la grille, tracez la droite et lisez le départ pour 0 °C dehors.",
        "Étape 3. Au verso, calculez le départ d’un samedi de janvier, de jour puis de nuit, et dites si la pompe à chaleur chauffe ce jour-là.",
        "Étape 4. Nommez chaque repère du schéma de régulation, dites ce que fait une vanne trois voies et pourquoi la maison n’en a pas, puis vérifiez les trois cases en trait double à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Régime, température de base, consignes, semaine de janvier", ou: "Stations H1, H5, E1, E2, rappelés sous la commande et en gras sur la feuille" },
        { piece: "Les deux points de la droite, la pente", ou: "Écrans « La loi d’eau » et « La pente de la loi d’eau »" },
        { piece: "Le départ du jour, le réduit, l’arrêt d’été", ou: "Écrans « Lire un départ », « Le réduit de nuit », « L’arrêt d’été »" },
        { piece: "Symboles et repères du schéma", ou: "Écrans « Les sondes et le régulateur » et « Le schéma de régulation »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Loi d’eau, réduit, arrêt d’été et schéma de régulation de la maison, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le maître d’ouvrage veut la régulation du chauffage de la maison des stations T1 à H5. Reprenez le régime des stations H1 et H5, la température de base et la semaine de relevés de la station E1, les consignes de la station E2. Pièce de référence : le séjour. Données de l’exercice : non-chauffage et arrêt d’été à ${EX.nc} °C sur la moyenne du jour, trois jours de mai. Établissez la loi d’eau de la pompe à chaleur (deux points, pente au centième) et tracez-la sur la grille avec la courbe du réduit de nuit. Calculez le départ du vendredi, du jeudi et du dimanche de la semaine de janvier, de jour et de nuit, au dixième, et dites quels jours de mai la pompe à chaleur chauffe. Complétez le schéma de régulation sur le schéma de principe de la station H5 : sondes, régulateur, liaisons et repères. Rédigez la première page de la note de calcul. Citez la source de chaque donnée.`,
      pieces: [
        { piece: "Régime, température de base, consignes", ou: "Vos feuilles des stations H1, E1, E2, rappelés sous la commande" },
        { piece: "Semaine de janvier, trois jours de mai", ou: "Tableaux sous la commande" },
        { piece: "Loi d’eau, réduit, arrêt d’été", ou: "Écrans de la méthode, de « La loi d’eau » à « L’arrêt d’été »" },
        { piece: "Symboles, repères et traits du schéma", ou: "Écrans « Les sondes et le régulateur » et « Le schéma de régulation »" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso, avec une feuille quadrillée pour le détail" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "r1-n1-pente", libelle: "Pente de la loi d’eau de la maison", unite: "", min: 1.05, max: 1.13, indice: "Relisez l’écran « La pente de la loi d’eau » : (départ du régime − consigne) ÷ (18 − température de base), au centième. Le départ, pas le retour ; 18 °C, pas 20 °C." },
      { id: "r1-n1-dep-sam", libelle: "Départ demandé le samedi, de jour", unite: "°C", min: 27.8, max: 29.6, indice: "Relisez l’écran « Lire un départ » : la moyenne du jour, (Tmin + Tmax) ÷ 2, puis consigne + pente × (18 − moyenne), au dixième." },
      { id: "r1-n1-dep0-lu", libelle: "Départ lu sur votre courbe pour 0 °C dehors", unite: "°C", min: 38.6, max: 40.6, indice: "Relisez l’écran « Lire un départ » : sur votre droite tracée par les deux points, partez de 0 °C, montez jusqu’à la droite, lisez à gauche, au degré près." }
    ],
    2: [
      { id: "r1-n2-pente", libelle: "Pente de la loi d’eau de la maison", unite: "", min: 1.05, max: 1.13, indice: "Relisez l’écran « La pente de la loi d’eau » : (départ du régime − consigne) ÷ (18 − température de base), au centième. Le départ, pas le retour ; 18 °C, pas 20 °C." },
      { id: "r1-n2-dep-ven", libelle: "Départ demandé le vendredi, de jour", unite: "°C", min: 33.1, max: 35.3, indice: "Relisez l’écran « Lire un départ » : la moyenne du jour, (Tmin + Tmax) ÷ 2, puis consigne + pente × (18 − moyenne), au dixième." },
      { id: "r1-n2-red-dim", libelle: "Départ demandé le dimanche, la nuit", unite: "°C", min: 24.4, max: 24.8, indice: "Relisez l’écran « Le réduit de nuit » : le départ de jour du dimanche, puis le décalage, réduit − confort, en kelvins." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-R4", titre: "L’énergie sur l’année", href: "../r4-energie-annee/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-H5, Équilibrage, schéma", href: "../h5-equilibrage-schema/index.html", pourquoi: "Le schéma de principe de la chaufferie, sur lequel on pose la régulation." },
    { reseau: "Bureau d’études", titre: "BE-E1, Le climat du site", href: "../e1-climat-site/index.html", pourquoi: "La température de base, la semaine de relevés et la moyenne du jour." },
    { reseau: "Bureau d’études", titre: "BE-E2, Les conditions intérieures", href: "../e2-conditions-interieures/index.html", pourquoi: "La consigne d’hiver, le réduit et ses horaires." },
    { reseau: "Lire les plans", titre: "CVC-R 5, Le synoptique de régulation", href: GARE5, pourquoi: "Sondes, régulateur, liaisons de mesure et de commande sur le même dessin." },
    { reseau: "HydroMétro", titre: "Vanne trois voies", href: "../../../hydrometro/stations/v3v/index.html", pourquoi: "Les trois voies et le mélange." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : régler le chauffage de la maison pour que l’eau parte plus chaude quand il fait froid et moins chaude quand il fait doux, baisser la nuit, arrêter l’été, puis dessiner qui mesure et qui commande. La station H5 a donné le schéma de principe de la chaufferie. Vous calculez la loi d’eau de la pompe à chaleur et vous posez la régulation sur le schéma. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Ce que vous trouvez", "Unité"], [
        ["Les deux points de la loi d’eau", "°C"],
        ["La pente de la loi d’eau", "sans unité (K par K)"],
        ["Le départ demandé un jour donné, de jour et de nuit", "°C"],
        ["L’arrêt d’été : les jours où la pompe à chaleur ne chauffe pas", "oui ou non"],
        ["Le schéma de régulation", "symboles, repères, liaisons"]
      ], "Le tableau à remplir, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la régulation du chauffage de la maison."], ["Le dossier :", "le régime (H1, H5), le climat (E1), les consignes (E2), le schéma (H5)."]] },
          { title: "Vous produisez", rows: [["La feuille :", "la loi d’eau tracée, les départs, le schéma de régulation."], ["Le contrôle :", "trois résultats à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station R4, l’énergie sur l’année."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Le régime vient des stations H1 et H5, la température de base et la semaine de relevés de la station E1, la consigne et le réduit de la station E2, le coefficient H du bâtiment de la station T5. La formule de la pente et la température de non-chauffage viennent d’une fiche mémento du fonds du professeur. Le rôle des sondes et les traits du schéma viennent de la gare « Le synoptique de régulation » de la ligne Lire les plans. Aucun document de fabricant n’est utilisé.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Régime de l’eau, départ et retour", "Stations H1 et H5"],
        ["Température de base, semaine de relevés, moyenne du jour", "Station E1"],
        ["Consigne d’hiver, réduit de nuit et ses horaires", "Station E2"],
        ["Coefficient H du bâtiment, puissance de base", "Station T5"],
        ["Schéma de principe de la chaufferie", "Station H5"],
        ["Pente = Δθ départ ÷ Δθ extérieur ; non-chauffage à 18 °C", "Fiche mémento « Calcul de la pente de chauffage », fonds du professeur"],
        ["Allures confort, réduit, hors gel, arrêt", "Code de l’énergie, article R. 241-31-1 (station E2)"],
        ["Sondes, régulateur, liaisons de mesure et de commande", "Gare « Le synoptique de régulation », ligne Lire les plans"],
        ["Arrêt d’été sur la moyenne du jour, réduit des bureaux, jours de mai", "Cette station, données de l’exercice"]
      ], "Les données de la station")
        + BE.renvoi('La semaine de relevés et la moyenne du jour se calculent à <a href="../e1-climat-site/index.html">la station E1</a>.')
    }),

    BE.ecran({
      id: "pourquoi-loi-eau", dossier: "methode", kicker: "La méthode, 1", title: "Pourquoi une loi d’eau", level: "comprendre",
      text: `La station T5 a calculé la puissance de base, celle du jour le plus froid. Le reste de l’hiver, il fait moins froid et le bâtiment perd moins : la puissance utile suit l’écart entre l’intérieur et l’extérieur, Φ = H × (θi − θe), avec le H de la station T5. Dans le bâtiment d’exemple, H = ${X().H} W/K et θi = ${X().amb} °C : ${X().P.map(p => `${p.P} W par ${p.te} °C`).join(", ")}. Des radiateurs alimentés tout l’hiver à ${X().dep} °C donneraient trop par temps doux. On baisse donc la température de l’eau quand il fait plus doux : la loi d’eau, réglée dans le régulateur, donne la température de départ selon la température extérieure.`,
      prompt: "Suivez la droite de la puissance, puis continuez.",
      render: () => BE.schema("illustrations/puissance-exemple.svg", `Graphique : température extérieure en abscisse, de −10 à 20 °C ; puissance utile en ordonnée, de 0 à 3500 W. Une droite descend de ${X().P[0].P} W par ${X().P[0].te} °C à ${X().P[2].P} W par ${X().P[2].te} °C ; les trois points sont marqués. Plus il fait doux, moins le bâtiment demande.`, "La puissance utile baisse quand il fait plus doux.")
        + tableau(["Température extérieure", "Puissance utile = H × (θi − θe)"], X().P.map(p => [`${p.te} °C`, `${X().H} × (${X().amb} − ${p.te.replace("−", "(−") + (p.te.startsWith("−") ? ")" : "")}) = ${p.P} W`]), "Bâtiment d’exemple, H de la station T5")
    }),

    BE.ecran({
      id: "loi-eau", dossier: "methode", kicker: "La méthode, 2", title: "La loi d’eau", level: "comprendre",
      text: `La loi d’eau est une droite. Elle passe par deux points. Le point froid : par la température de base, l’eau part à la température de départ du régime, celle qui a servi à choisir les radiateurs. Le point doux : à ${EX.nc} °C dehors, il n’est plus nécessaire de chauffer, et l’eau part à la température d’ambiance voulue. La fiche mémento « Calcul de la pente de chauffage » du fonds du professeur donne ces deux points et la température extérieure de non-chauffage, ${EX.nc} °C. Dans le bâtiment d’exemple : base ${X().base} °C, régime ${X().dep}/${X().ret}, ambiance ${X().amb} °C.`,
      prompt: "Repérez les deux points sur la droite, puis continuez.",
      render: () => figLoi()
        + tableau(["Point", "Température extérieure", "Départ"], [["Point froid", `${X().base} °C (base, station E1)`, `${X().dep} °C (régime, station H1)`], ["Point doux", `${EX.nc} °C (non-chauffage)`, `${X().amb} °C (ambiance)`]], "Les deux points de la loi d’eau du bâtiment d’exemple")
        + BE.alerte(`<strong>Piège.</strong> Prendre la température de retour (${X().ret} °C) pour le point froid : le départ commande l’émission des radiateurs, c’est lui qui suit la loi d’eau.`)
    }),

    BE.ecran({
      id: "pente", dossier: "methode", kicker: "La méthode, 3", title: "La pente de la loi d’eau", level: "comprendre",
      text: `La pente dit de combien le départ monte quand il fait 1 K plus froid dehors. La fiche mémento la calcule ainsi : pente = Δθ départ ÷ Δθ extérieur = (départ du régime − ambiance) ÷ (${EX.nc} − base). On l’écrit au centième. Dans le bâtiment d’exemple : (${X().dep} − ${X().amb}) ÷ (${EX.nc} − (${X().base})) = ${X().dDep} ÷ ${X().dExt} = ${X().pente}. Chaque kelvin de froid en plus demande ${X().pente} K de plus au départ. Sur la courbe, on lit la pente entre deux points de la droite : l’écart vertical divisé par l’écart horizontal. Un plancher chauffant, à eau tiède, a une pente plus faible que des radiateurs.`,
      prompt: "Suivez le triangle de la pente et l’exemple résolu, puis continuez.",
      render: () => figPente()
        + BE.exemple({ text: `Bâtiment d’exemple : (${X().base} °C ; ${X().dep} °C) et (${EX.nc} °C ; ${X().amb} °C)`, answer: `pente = (${X().dep} − ${X().amb}) ÷ (${EX.nc} + ${X().base.replace("−", "")}) = ${X().dDep} ÷ ${X().dExt} = ${X().pente}`, why: `Retrancher une température négative revient à l’ajouter : ${EX.nc} − (${X().base}) = ${X().dExt}.` })
        + BE.alerte(`<strong>Piège.</strong> Diviser à l’envers (${X().dExt} ÷ ${X().dDep}), ou prendre 20 °C au lieu de ${EX.nc} °C pour le non-chauffage : la droite ne passe plus par les bons points.`)
    }),

    BE.ecran({
      id: "depart", dossier: "methode", kicker: "La méthode, 4", title: "Lire un départ", level: "comprendre",
      text: `Le régulateur calcule le départ demandé pour la température extérieure du moment : départ = ambiance + pente × (${EX.nc} − θe), au dixième de degré, avec la pente arrondie au centième. Pour l’exercice, θe est la moyenne du jour, (Tmin + Tmax) ÷ 2, comme à la station E1. Sur la courbe, on part de θe sur l’axe horizontal, on monte jusqu’à la droite, puis on lit le départ sur l’axe vertical, au degré près. Dans le bâtiment d’exemple : par ${X().lect[0].te} °C, ${X().lect[0].calc} ; par ${X().lect[1].te} °C, ${X().lect[1].calc}.`,
      prompt: "Suivez les deux lectures en orange et l’exemple résolu, puis continuez.",
      render: () => figLecture() + exempleDepart()
        + BE.alerte("<strong>Piège.</strong> Prendre la température la plus basse du jour au lieu de la moyenne : le départ sort trop chaud tout le jour.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, la pente et le départ", title: "Entraînement : un départ", level: "appliquer", requiresAction: true,
      text: {
        1: `Une installation a une température de base de ${EX.ent1.base} °C, un départ de ${EX.ent1.dep} °C par la base et une consigne de ${EX.ent1.amb} °C. Quel départ le régulateur demande-t-il par ${EX.ent1.te} °C dehors ? L’exemple résolu reste sous vos yeux.`,
        2: `Une installation a une température de base de ${EX.ent1.base} °C, un départ de ${EX.ent1.dep} °C par la base et une consigne de ${EX.ent1.amb} °C. Donnez le départ demandé par ${EX.ent1.te} °C dehors, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le départ, en vous aidant de l’exemple.", 2: "Choisissez le départ. Cette question est à faire seul." },
      aides: {
        1: ["La pente est à l’écran « La pente de la loi d’eau », le départ à l’écran « Lire un départ ».", "La pente d’abord, au centième, puis le départ, au dixième.", `Pente : ${EX.ent1.pente}.`],
        2: ["La méthode est aux écrans « La loi d’eau », « La pente de la loi d’eau » et « Lire un départ ».", "Deux étapes : la pente, puis le départ.", `Pente : ${EX.ent1.pente}.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleDepart(), EX.ent1.quiz),
        2: BE.quiz(EX.ent1.quiz)
      })
    }),

    BE.ecran({
      id: "reduit", dossier: "methode", kicker: "La méthode, 5", title: "Le réduit de nuit", level: "comprendre",
      text: `La nuit, la consigne d’ambiance baisse : c’est l’allure réduite, l’une des quatre allures que le Code de l’énergie demande de pouvoir programmer (article R. 241-31-1, station E2). Le régulateur garde la pente et décale toute la droite vers le bas. Ce décalage parallèle, en kelvins, se lit entre les deux droites, à n’importe quelle température extérieure. Dans cette station, il vaut l’écart de consigne, réduit − confort (simplification de l’exercice ; un vrai régulateur peut baisser davantage). Le bâtiment d’exemple passe la nuit et le week-end à ${X().reduit} °C au lieu de ${X().amb} °C (donnée de l’exercice) : décalage ${X().reduit} − ${X().amb} = ${X().dec} K. Le même décalage, vers le haut, sert au réglage : une pièce qui reste trop fraîche par tous les temps fait remonter la droite.`,
      prompt: "Mesurez l’écart entre les deux droites, puis lisez l’exemple résolu.",
      render: () => BE.schema("illustrations/loi-eau-reduit.svg", `La loi d’eau du bâtiment d’exemple en rouge, de jour, et la même droite en bleu pointillé, ${X().dec.replace("−", "")} K plus bas, la nuit. Une double flèche entre les deux droites porte « ${X().dec} K ». Les deux droites sont parallèles : même pente.`, "La nuit, toute la droite descend : même pente, autre hauteur.")
        + exempleReduit()
        + tableau(["Température extérieure", "Départ de jour", "Départ de nuit"], X().lectRed.map(l => [`${l.te} °C`, `${l.dep} °C`, `${l.red} °C`]), "Bâtiment d’exemple, jour et nuit")
    }),

    BE.ecran({
      id: "arret-ete", dossier: "methode", kicker: "La méthode, 6", title: "L’arrêt d’été", level: "comprendre",
      text: `Quand il fait doux, la pompe à chaleur et la pompe n’ont plus à tourner. Le régulateur les arrête à partir d’un seuil de température extérieure : c’est l’arrêt d’été. Dans cette station, il regarde la moyenne du jour et coupe dès qu’elle atteint ${EX.seuil} °C, la température de non-chauffage de la fiche (donnée de l’exercice pour la moyenne du jour). Ces jours-là, la station E1 ne comptait aucun degré-jour. Le schéma montre une semaine d’avril du bâtiment d’exemple : deux jours coupés, trois jours chauffés.`,
      prompt: "Comparez chaque barre au seuil, puis continuez.",
      render: () => BE.schema("illustrations/arret-ete-exemple.svg", `Cinq barres, une par jour d’une semaine d’avril du bâtiment d’exemple, hautes comme la moyenne du jour : ${X().avril.map(j => `${j.jour} ${j.moy} °C`).join(", ")}. Une ligne orange en pointillé marque le seuil de ${EX.seuil} °C. Les jours à ${EX.seuil} °C ou plus sont en orange, « arrêt » ; les autres en bleu, « chauffe ».`, `À partir de ${EX.seuil} °C de moyenne : arrêt.`)
        + tableau(["Jour", "Tmin", "Tmax", "Moyenne", "Chauffage", "Départ"], X().avril.map(j => [j.jour, `${j.tmin} °C`, `${j.tmax} °C`, `${j.moy} °C`, j.chauffe ? "en marche" : "arrêté", j.dep ? `${j.dep} °C` : "–"]), "Bâtiment d’exemple, semaine d’avril (valeurs d’exercice)")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, la nuit et l’été", title: "Entraînement : le réduit et l’arrêt d’été", level: "appliquer", requiresAction: true,
      text: {
        1: `Même installation qu’à l’entraînement 1. La nuit, la consigne passe de ${EX.ent1.amb} à ${EX.ent2.reduit} °C. Quel départ le régulateur demande-t-il la nuit par ${EX.ent1.te} °C dehors ? Un jour de printemps à ${EX.ent2.tmin} °C au plus bas et ${EX.ent2.tmax} °C au plus haut, le chauffage tourne-t-il ? L’exemple résolu reste sous vos yeux.`,
        2: `Même installation qu’à l’entraînement 1. La nuit, la consigne passe de ${EX.ent1.amb} à ${EX.ent2.reduit} °C. Donnez le départ de nuit par ${EX.ent1.te} °C dehors, et dites si le chauffage tourne un jour à ${EX.ent2.tmin} °C au plus bas et ${EX.ent2.tmax} °C au plus haut, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["Le réduit est à l’écran « Le réduit de nuit », le seuil à l’écran « L’arrêt d’été ».", "Le départ de jour de l’entraînement 1, puis le décalage ; la moyenne du jour, puis le seuil.", `Décalage : ${EX.ent2.dec} K ; moyenne du jour : ${EX.ent2.moy} °C.`],
        2: ["La méthode est aux écrans « Le réduit de nuit » et « L’arrêt d’été ».", "Le décalage, puis la moyenne du jour.", `Moyenne du jour : ${EX.ent2.moy} °C.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleReduit(), EX.ent2.quiz),
        2: BE.quiz(EX.ent2.quiz)
      })
    }),

    BE.ecran({
      id: "sondes-regulateur", dossier: "methode", kicker: "La méthode, 7", title: "Les sondes et le régulateur", level: "comprendre",
      text: "Une régulation fait trois choses : une sonde mesure, le régulateur compare à la consigne, puis il commande un appareil. Une loi d’eau demande trois mesures. La sonde extérieure donne θe : on la pose dehors, sur la façade nord, à l’ombre, loin d’une fenêtre ou d’une sortie d’air ; au soleil, elle croirait qu’il fait doux et ferait partir l’eau trop froide. La sonde de départ, sur le départ après la pompe, vérifie que l’eau part à la température demandée. Le thermostat d’ambiance, dans la pièce de référence, mesure la température de la pièce et la transmet au régulateur avec la consigne ; c’est le régulateur qui compare : si elle reste sous la consigne, le régulateur remonte la droite d’un décalage ; si elle la dépasse, il la baisse. Le régulateur d’une pompe à chaleur est intégré à l’appareil : il commande la puissance du compresseur et la marche de la pompe. Sur un schéma, une liaison de mesure se trace en pointillé, flèche vers le régulateur ; une liaison de commande en trait mixte, un trait et un point, flèche vers l’appareil commandé.",
      prompt: "Lisez les symboles et les deux sortes de traits, puis continuez.",
      render: () => BE.schema("illustrations/legende-regulation.svg", "Les symboles du schéma de régulation, avec leur nom : le régulateur, un boîtier à cadran ; la sonde extérieure, un petit boîtier et sa tige ; la sonde sur un tube, plongée dans le tuyau ; le thermostat d’ambiance, un boîtier mural marqué T ; la vanne trois voies et son moteur. Puis les deux traits : la liaison de mesure en pointillé, la liaison de commande en trait mixte, chacune avec sa flèche.", "Les symboles et les traits de la régulation.")
        + BE.renvoi(`Mesurer, comparer, commander, sur la maison et ses repères SE1, SD1, SA1, RG1 : <a href="${GARE5}">la gare « Le synoptique de régulation »</a> de la ligne Lire les plans.`)
    }),

    BE.ecran({
      id: "schema-regulation", dossier: "methode", kicker: "La méthode, 8", title: "Le schéma de régulation", level: "comprendre",
      text: "Le schéma de régulation reprend le schéma de principe de la station H5 et y ajoute les sondes, le régulateur et les liaisons. Chaque appareil porte un repère : SE pour la sonde extérieure, SD pour la sonde de départ, SA pour le thermostat d’ambiance, RG pour le régulateur, suivis d’un numéro. Dans le bâtiment d’exemple, SE1 est dehors, au nord ; SD1 sur le départ, après la pompe ; SA1 dans le bureau, la pièce de référence ; RG1 dans la pompe à chaleur. Sur le schéma, on dessine RG1 à part, hors du boîtier de la pompe à chaleur, pour voir ses liaisons : la commande vers la pompe à chaleur se trace donc quand même. Trois liaisons de mesure arrivent à RG1, deux liaisons de commande en partent, vers la pompe et vers la pompe à chaleur. Aucun repère ni aucun texte ne se pose sur un trait.",
      prompt: "Suivez chaque liaison jusqu’à sa flèche, puis continuez.",
      render: () => figSchemaEx()
        + tableau(["Repère", "Appareil", "Place", "Liaison"], [["SE1", "Sonde extérieure", "Dehors, façade nord, à l’ombre", "Mesure, vers RG1"], ["SD1", "Sonde de départ", "Sur le départ, après la pompe", "Mesure, vers RG1"], ["SA1", "Thermostat d’ambiance", "Bureau, pièce de référence", "Mesure, vers RG1"], ["RG1", "Régulateur", "Intégré à la pompe à chaleur", "Commande la pompe à chaleur et la pompe"]], "Les repères du schéma du bâtiment d’exemple")
    }),

    BE.ecran({
      id: "vanne-trois-voies", dossier: "methode", kicker: "La méthode, 9", title: "La vanne trois voies sur sa loi d’eau", level: "comprendre",
      text: `Dans le bâtiment d’exemple agrandi de la station H5, la salle chauffée par le sol veut de l’eau à ${X().pl.dep} °C par ${X().base} °C, et la production en donne à ${X().pl.prod} °C. Ce circuit a sa propre loi d’eau, avec les mêmes règles : (${X().base} °C ; ${X().pl.dep} °C) et (${EX.nc} °C ; ${X().amb} °C), pente (${X().pl.dep} − ${X().amb}) ÷ ${X().dExt} = ${X().pl.pente}. Un second régulateur, RG2, lit la sonde extérieure et la sonde de départ du plancher, SD2, posée après la vanne et sa pompe. Il commande le moteur de la vanne trois voies : il ouvre davantage la voie A, l’eau chaude, quand le départ est sous la loi d’eau, et la voie B, le retour, quand il la dépasse. Par ${X().pl.te} °C, il vise ${X().amb} + ${X().pl.pente} × ${Number(EX.nc) - Number(X().pl.te)} = ${X().pl.dep0} °C. La maison n’a qu’un circuit de radiateurs, à une seule température : la pompe à chaleur fait elle-même le départ de sa loi d’eau, sans vanne trois voies (station H5).`,
      prompt: "Suivez la mesure jusqu’à RG2, puis la commande jusqu’au moteur de la vanne.",
      render: () => BE.schema("illustrations/v3v-regulee.svg", `La vanne trois voies du plancher et sa régulation. À gauche, la voie A amène l’eau chaude à ${X().pl.prod} °C ; en bas, la voie B ramène le retour du plancher à ${X().pl.ret} °C ; à droite, la voie AB part vers la pompe puis vers le plancher. Après la pompe, la sonde de départ SD2. En haut, le régulateur RG2 reçoit en pointillé la mesure de SD2 et celle de la sonde extérieure SE1 ; il commande en trait mixte le moteur de la vanne.`, "RG2 règle le mélange pour suivre la loi d’eau du plancher.")
        + BE.renvoi('Les voies A, B et AB sur le corps d’une vanne : <a href="../../../hydrometro/stations/v3v/index.html">la station HydroMétro « Vanne trois voies »</a>.')
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, le schéma", title: "Entraînement : qui mesure, qui commande", level: "appliquer", requiresAction: true,
      text: {
        1: "Sur les schémas du bâtiment d’exemple, que fait chaque appareil ? Classez-les : il mesure une température, il compare et commande, ou il est commandé. L’exemple résolu montre le premier.",
        2: "Sur le schéma du bâtiment d’exemple, les appareils de la régulation sont repérés par des lettres ; le moteur de la vanne trois voies est sur le schéma de l’écran « La vanne trois voies sur sa loi d’eau ». Reconnaissez l’appareil de chaque lettre, puis classez-le : il mesure une température, il compare et commande, ou il est commandé."
      },
      prompt: { 1: "Classez chaque appareil.", 2: "Classez chaque appareil. Cette question est à faire seul." },
      aides: {
        1: ["Les rôles sont à l’écran « Les sondes et le régulateur ».", "Suivez chaque trait jusqu’à sa flèche : le pointillé part d’une sonde, le trait mixte part du régulateur.", "Ce qui reçoit une flèche en trait mixte est commandé."],
        2: ["Les symboles sont à l’écran « Les sondes et le régulateur ».", "Reconnaissez d’abord chaque symbole, puis regardez si un pointillé en part ou si un trait mixte y arrive.", "Le boîtier à cadran reçoit toutes les mesures : c’est le régulateur."]
      },
      ...BE.parNiveau({
        1: { render: item => figSchemaEx() + BE.tri(EX.ent3.lignes, EX.ent3.labels, EX.ent3.exemple).render(item), wire: item => BE.tri(EX.ent3.lignes, EX.ent3.labels, EX.ent3.exemple).wire(item) },
        2: { render: item => BE.schema("illustrations/schema-regulation-exemple-reperes.svg", "Le schéma de régulation du bâtiment d’exemple, sans les noms : les appareils de la régulation sont repérés par des lettres, A en haut à gauche, dehors ; B sur le départ, après la pompe ; C en haut à droite ; D au milieu, où arrivent les pointillés ; E près d’un trait pointillé ; F près d’un trait mixte.", "Les appareils repérés par des lettres.") + BE.tri(EX.ent3.lignesN2, EX.ent3.labels).render(item), wire: item => BE.tri(EX.ent3.lignesN2, EX.ent3.labels).wire(item) }
      })
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 10", title: "La note de calcul", level: "comprendre",
      text: "La note de calcul donne à un lecteur de quoi refaire les réglages : l’objet, les données avec leur source, les hypothèses et la méthode, les résultats. Le non-chauffage à 18 °C, l’arrêt d’été sur la moyenne du jour et la courbe de nuit descendue de l’écart de consigne sont des hypothèses : elles s’écrivent comme telles. La note du bâtiment d’exemple tient en quatre lignes, une par rubrique ; la feuille du niveau 2 reprend les mêmes rubriques.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Loi d’eau, réduit, arrêt d’été et schéma de régulation d’un petit bâtiment de bureaux de plain-pied, pompe à chaleur air/eau"],
        ["Données et sources", "Régime : station H1 ; base : station E1 ; ambiance : station T5 ; schéma : station H5 ; non-chauffage 18 °C : fiche du fonds ; réduit 15 °C : exercice"],
        ["Hypothèses et méthode", `Droite par (${X().base} ; ${X().dep}) et (${EX.nc} ; ${X().amb}) ; pente au centième ; θe = moyenne du jour ; nuit : décalage de l’écart de consigne ; arrêt dès ${EX.seuil} °C de moyenne`],
        ["Résultats", `Pente ${X().pente} ; départ ${X().lect[0].dep} °C par ${X().lect[0].te} °C, ${X().lectRed[0].red} °C la nuit ; arrêt dès ${EX.seuil} °C ; SE1, SD1, SA1, RG1 ; pas de vanne trois voies sur les radiateurs`]
      ], "Première page de la note de calcul, bâtiment d’exemple")
        + BE.renvoi("La note complète du projet s’assemble à la station R5, « La note de calcul ».")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

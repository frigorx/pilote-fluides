/* Station BE-H4 : Pompe, vase, soupape.
   Méthode sur le petit bâtiment de bureaux des stations T5, H1, H2 et H3 (bureau, salle de réunion, sanitaires), puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/h4-pompe-vase-soupape/construire.mjs : le premier vient de exemple-data.mjs, les secondes de
   corriges/h4-pompe-vase-soupape/reference-pompe.json (outils/h4-pompe-maison.mjs ; ± 5 % sur une lecture de courbe, ± 3 % sur un calcul).
   La maison n'apparaît que par les données de la commande (point demandé, tubes et longueurs repris de H3, radiateurs repris de H2,
   données de l'exercice) et les bornes des fourchettes. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "sections": [
  {
   "nom": "12 × 1",
   "di": "10",
   "S": "78,5"
  },
  {
   "nom": "14 × 1",
   "di": "12",
   "S": "113,1"
  },
  {
   "nom": "16 × 1",
   "di": "14",
   "S": "153,9"
  },
  {
   "nom": "18 × 1",
   "di": "16",
   "S": "201,1"
  },
  {
   "nom": "22 × 1",
   "di": "20",
   "S": "314,2"
  }
 ],
 "rho": "990",
 "g": "9,81",
 "radL": "5,0",
 "pacEx": "4,0",
 "tarage": "3",
 "surp": "2",
 "marge": "0,5",
 "hRad": "0,75",
 "hVase": "0,30",
 "serie": "8, 12, 18, 25, 35, 50, 80",
 "dilatation": [
  {
   "T": "40",
   "e": "0,75"
  },
  {
   "T": "45",
   "e": "0,96"
  },
  {
   "T": "50",
   "e": "1,18"
  },
  {
   "T": "55",
   "e": "1,42"
  },
  {
   "T": "60",
   "e": "1,68"
  },
  {
   "T": "70",
   "e": "2,24"
  },
  {
   "T": "80",
   "e": "2,87"
  }
 ],
 "thbat": "3,09",
 "e80": "2,87",
 "ex": {
  "Qd": "0,30",
  "Hd": "1,72",
  "qd": "297",
  "K": "19,11",
  "points": [
   {
    "Q": "0,1",
    "H": "0,19"
   },
   {
    "Q": "0,2",
    "H": "0,76"
   },
   {
    "Q": "0,3",
    "H": "1,72"
   },
   {
    "Q": "0,4",
    "H": "3,06"
   },
   {
    "Q": "0,5",
    "H": "4,78"
   }
  ],
  "vitesses": [
   {
    "v": "V1",
    "Q": "0,32",
    "H": "1,94",
    "P": "12"
   },
   {
    "v": "V2",
    "Q": "0,39",
    "H": "2,91",
    "P": "22"
   },
   {
    "v": "V3",
    "Q": "0,45",
    "H": "3,88",
    "P": "36"
   }
  ],
  "v": "V1",
  "Q": "0,32",
  "H": "1,94",
  "P": "12",
  "phyd": "1,7",
  "eta": "14",
  "tubes": [
   {
    "n": "1",
    "nom": "Commun : pompe à chaleur → collecteur",
    "tube": "16 × 1",
    "S": "153,9",
    "L": "4,0",
    "V": "0,62"
   },
   {
    "n": "2",
    "nom": "Ligne du bureau",
    "tube": "12 × 1",
    "S": "78,5",
    "L": "14,0",
    "V": "1,10"
   },
   {
    "n": "3",
    "nom": "Ligne réunion 1",
    "tube": "12 × 1",
    "S": "78,5",
    "L": "18,0",
    "V": "1,41"
   },
   {
    "n": "4",
    "nom": "Ligne réunion 2",
    "tube": "12 × 1",
    "S": "78,5",
    "L": "26,0",
    "V": "2,04"
   },
   {
    "n": "5",
    "nom": "Ligne des sanitaires",
    "tube": "12 × 1",
    "S": "78,5",
    "L": "22,0",
    "V": "1,73"
   }
  ],
  "rad": [
   {
    "nom": "Bureau",
    "nb": "1",
    "L": "1,80",
    "V": "9,00"
   },
   {
    "nom": "Salle de réunion",
    "nb": "2",
    "L": "1,20",
    "V": "12,00"
   },
   {
    "nom": "Sanitaires",
    "nb": "1",
    "L": "0,40",
    "V": "2,00"
   }
  ],
  "vol": {
   "tubes": "6,90",
   "rad": "23,00",
   "pac": "4,00",
   "total": "33,90"
  },
  "Tmax": "50",
  "e": "1,18",
  "Ve": "0,40",
  "Hs": "0,45",
  "Hs10": "0,045",
  "Pg": "0,5",
  "Vn": "0,64",
  "vase": "8",
  "Pr": "0,55",
  "ctrl": "2,55",
  "dep": "50",
  "ret": "40"
 },
 "ent1": {
  "Q": "0,50",
  "H": "3,20",
  "K": "12,80",
  "kpts": "0,4 m³/h → 2,05 m ; 0,6 m³/h → 4,61 m",
  "v": "V3",
  "Qr": "0,55",
  "Hr": "3,82",
  "Qav": "0,47",
  "vav": "V2",
  "quiz": {
   "choices": [
    "V2, environ 0,47 m³/h et 2,87 m",
    "V3, environ 0,50 m³/h et 3,85 m",
    "V3, environ 0,55 m³/h et 3,82 m",
    "V2, environ 0,50 m³/h et 2,85 m"
   ],
   "good": 2,
   "explain": "K = 3,20 ÷ 0,50² = 12,80. La courbe du réseau coupe V2 à 0,47 m³/h, sous le débit demandé : V2 ne suffit pas. Elle coupe V3 à 0,55 m³/h et 3,82 m. B et D lisent la pompe au débit demandé au lieu du croisement des deux courbes."
  }
 },
 "ent2": {
  "V": "150",
  "T": "55",
  "e": "1,42",
  "Ve": "2,13",
  "quiz": {
   "choices": [
    "2,13 L",
    "1,77 L",
    "213,00 L",
    "2,52 L"
   ],
   "good": 0,
   "explain": "À 55 °C, la table donne 1,42 % ; 150 × 1,42 ÷ 100 = 2,13 L. B lit la table à 50 °C, C oublie de diviser par 100, D lit la table à 60 °C."
  }
 },
 "ent3": {
  "V": "400",
  "T": "70",
  "Hs": "9",
  "e": "2,24",
  "Ve": "8,96",
  "Pg": "1,0",
  "Vn": "17,92",
  "vase": "18",
  "quiz": {
   "choices": [
    "13,44 L, vase de 18 L",
    "17,07 L, vase de 18 L",
    "8,96 L, vase de 12 L",
    "17,92 L, vase de 18 L"
   ],
   "good": 3,
   "explain": "Ve = 400 × 2,24 ÷ 100 = 8,96 L ; gonflage 9 ÷ 10 = 0,9 bar, porté au pas de 0,5 : 1,0 bar ; Vn = 8,96 × (3 + 1) ÷ (3 − 1,0) = 17,92 L ; le premier vase de la série au-dessus : 18 L. A garde les pressions du manomètre (oublie le + 1), B prend le gonflage sans le pas de 0,5 bar, C prend le volume de dilatation pour le vase."
  }
 },
 "maison": {
  "Qd": "0,68",
  "Hd": "2,24",
  "qd": "681",
  "dep": "45",
  "ret": "40",
  "troncons": [
   {
    "n": "1",
    "nom": "Commun",
    "tube": "22 × 1",
    "L": "3,0"
   },
   {
    "n": "2",
    "nom": "Branche du rez-de-chaussée",
    "tube": "18 × 1",
    "L": "6,0"
   },
   {
    "n": "3",
    "nom": "Branche de l’étage",
    "tube": "16 × 1",
    "L": "14,0"
   },
   {
    "n": "4",
    "nom": "Chambre 1",
    "tube": "12 × 1",
    "L": "9,0"
   },
   {
    "n": "5",
    "nom": "Chambre 2",
    "tube": "12 × 1",
    "L": "18,0"
   },
   {
    "n": "6",
    "nom": "Palier",
    "tube": "12 × 1",
    "L": "4,0"
   },
   {
    "n": "7",
    "nom": "Chambre 3",
    "tube": "12 × 1",
    "L": "13,0"
   },
   {
    "n": "8",
    "nom": "Salle d'eau",
    "tube": "12 × 1",
    "L": "17,0"
   },
   {
    "n": "9",
    "nom": "Séjour 1",
    "tube": "14 × 1",
    "L": "18,0"
   },
   {
    "n": "10",
    "nom": "Séjour 2",
    "tube": "14 × 1",
    "L": "12,0"
   },
   {
    "n": "11",
    "nom": "Entrée",
    "tube": "12 × 1",
    "L": "7,0"
   },
   {
    "n": "12",
    "nom": "WC",
    "tube": "12 × 1",
    "L": "8,0"
   }
  ],
  "rad": [
   {
    "nom": "Séjour-cuisine",
    "nb": "2",
    "L": "1400"
   },
   {
    "nom": "Entrée",
    "nb": "1",
    "L": "800"
   },
   {
    "nom": "WC",
    "nb": "1",
    "L": "400"
   },
   {
    "nom": "Chambre 1",
    "nb": "1",
    "L": "800"
   },
   {
    "nom": "Chambre 2",
    "nb": "1",
    "L": "800"
   },
   {
    "nom": "Palier",
    "nb": "1",
    "L": "600"
   },
   {
    "nom": "Chambre 3",
    "nb": "1",
    "L": "400"
   },
   {
    "nom": "Salle d'eau",
    "nb": "1",
    "L": "400"
   }
  ],
  "pac": "5,0",
  "etage": "2,70",
  "hRad": "0,75",
  "hVase": "0,30",
  "organes": "Au garage, au pied de la pompe à chaleur : soupape sur le départ, en sortie de la pompe à chaleur et avant la pompe ; vase, manomètre et robinet de remplissage sur le retour, avant la pompe à chaleur. Raccord du vase et manomètre à 0,30 m au-dessus du sol du garage, de plain-pied avec le rez-de-chaussée."
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const X = () => EX.ex;
const figPompe = () => BE.schema("illustrations/courbe-pompe.svg", "Graphique de la pompe de l’exercice. En haut, la hauteur H en mètres, de 0 à 4,5, selon le débit Q en m³/h, de 0 à 1,2 : trois courbes descendantes, V1 qui part de 2 m, V2 de 3 m, V3 de 4 m. En bas, la puissance absorbée en watts, de 0 à 60 : trois droites montantes, V1 la plus basse, V3 la plus haute. Quadrillage tous les 0,05 m³/h, tous les 0,1 m et tous les 5 W.", "La pompe de l’exercice : trois vitesses.");
const figPoint = () => BE.schema("illustrations/courbe-pompe-exemple.svg", `Le graphique de la pompe avec la courbe du réseau du bâtiment d’exemple, en orange, qui part de zéro et monte de plus en plus vite. Le point demandé, ${X().Qd} m³/h et ${X().Hd} m, est sur cette courbe, sous la courbe V1. La courbe du réseau coupe V1 à ${X().Q} m³/h et ${X().H} m : c’est le point de fonctionnement. Des pointillés orange le relient à l’axe du débit, à l’axe des hauteurs, puis, en descendant, à la droite de puissance V1, lue à ${X().P} W.`, "Le point de fonctionnement est au croisement des deux courbes.");
const exemplePoint = () => BE.exemple({ text: `Bâtiment d’exemple : point demandé ${X().Qd} m³/h et ${X().Hd} m (station H3)`, answer: `K = ${X().Hd} ÷ ${X().Qd}² = ${X().K} ; la courbe du réseau coupe ${X().v} à ${X().Q} m³/h et ${X().H} m, au-dessus du débit demandé : ${X().v} suffit`, why: "On essaie la plus petite vitesse ; on passe à la suivante tant que son point de fonctionnement reste sous le débit demandé." });
const exempleDilatation = () => BE.exemple({ text: `Bâtiment d’exemple : ${X().vol.total} L d’eau, départ à ${X().Tmax} °C`, answer: `e = ${X().e} % ; Ve = ${X().vol.total} × ${X().e} ÷ 100 = ${X().Ve} L`, why: "La table donne le volume gagné par l’eau remplie à 10 °C, en pour cent : on divise par 100." });
const exempleVase = () => BE.exemple({ text: `Bâtiment d’exemple : Ve = ${X().Ve} L, gonflage ${X().Pg} bar, soupape 3 bar`, answer: `Vn = ${X().Ve} × (3 + 1) ÷ (3 − ${X().Pg}) = ${X().Vn} L ; premier vase de la série au-dessus : ${X().vase} L`, why: "L’azote suit la loi des gaz avec les pressions absolues : on ajoute 1 bar à chaque pression du manomètre ; leur différence ne change pas." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Le point demandé (station H3) est en gras sur la feuille. Les longueurs des tubes et des radiateurs aussi. Les hauteurs de la maison sont sur le schéma sous la commande.",
      "Dans l’ordre : la courbe du réseau et la vitesse (écran « Le point de fonctionnement ») ; le volume d’eau (écran du même nom) ; la dilatation, le gonflage et le volume du vase (écrans « La dilatation de l’eau », « La hauteur statique et le gonflage », « Le volume du vase ») ; le remplissage et la soupape (écran « Remplissage et soupape »).",
      `K = H ÷ Q², au centième, comme sur l’exemple : ${X().Hd} ÷ ${X().Qd}² = ${X().K}. Placez ensuite les six points du tableau sur le graphique.`
    ],
    2: [
      "Le point demandé, les tubes et les longueurs aller-retour viennent de votre feuille de H3, rappelés dans le tableau sous la commande ; les radiateurs, de H2 ; les hauteurs, du schéma.",
      "Point de fonctionnement et puissance ; volume d’eau tronçon par tronçon, radiateurs et pompe à chaleur ; dilatation, gonflage, vase ; remplissage et soupape ; note de calcul.",
      "Commencez par K = H ÷ Q² et quatre ou cinq points de la courbe du réseau, entre 0,2 et 0,9 m³/h."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const donneesMaison = () => tableau(["N°", "Tronçon", "Tube (H3)", "Longueur aller-retour (m)"], EX.maison.troncons.map(t => [t.n, t.nom, t.tube, t.L]), "Les tronçons de la maison, repris de la station H3")
  + tableau(["Pièce", "Radiateurs (H2)", "Longueur d’un radiateur (mm)"], EX.maison.rad.map(r => [r.nom, r.nb, r.L]), "Les radiateurs de la maison, repris de la station H2")
  + BE.schema("../h3-reseau-eau/illustrations/schema-reseau-maison.svg", "Schéma de principe du réseau de la maison, de la station H3 : pompe à chaleur et pompe au garage, tronçon 1, branche du rez-de-chaussée (2) et collecteur sous l’escalier, branche de l’étage (3) et collecteur sur le palier, une ligne par radiateur, numérotées de 4 à 12, avec leur longueur à l’aller.", "Le réseau de la maison (station H3) : numéros des tronçons.")
  + BE.schema("illustrations/hauteur-maison.svg", `Coupe de principe de la maison. À gauche, le garage, de plain-pied avec le rez-de-chaussée, et le vase sur le retour, son raccord à ${EX.maison.hVase} m au-dessus du sol. Le sol de l’étage est à ${EX.maison.etage} m au-dessus du sol du rez-de-chaussée. Un radiateur de l’étage a son haut à ${EX.maison.hRad} m au-dessus du sol de l’étage. La hauteur statique Hs, du raccord du vase au haut de ce radiateur, est marquée d’un point d’interrogation : à calculer.`, "Les hauteurs de la maison : Hs est à calculer.")
  + BE.renvoi(`Point demandé (station H3) : ${EX.maison.Qd} m³/h (${EX.maison.qd} L/h) sous ${EX.maison.Hd} m. Régime ${EX.maison.dep}/${EX.maison.ret}. Données de l’exercice : pompe à chaleur ${EX.maison.pac} L ; radiateurs de 600 mm de haut, haut à ${EX.maison.hRad} m du sol, ${EX.radL} L par mètre ; ${EX.maison.organes} Sol de l’étage à ${EX.maison.etage} m : la valeur du schéma des hauteurs ci-dessus sert au calcul ; les plans de la maison donnent la même.`)
  + BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Pompe à chaleur air/eau au garage, page 4" }, { href: DOSSIER + "plans.html", title: "Les plans de la maison", note: "Niveaux et hauteurs" }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + donneesMaison(); };

BE.station({
  code: "BE-H4",
  titre: "Pompe, vase, soupape",
  ligne: "Hydraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, tronçon par tronçon et note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "La station H3 a donné le point que la pompe doit tenir : un débit et une hauteur. Vous choisissez la vitesse de la pompe sur sa courbe et vous lisez sa puissance. Vous comptez l’eau de l’installation pour dimensionner le vase d’expansion, puis vous fixez la pression de gonflage, la pression de remplissage et la soupape. Vous apprenez la méthode sur le petit bâtiment de bureaux des stations T5 à H3, puis vous la faites sur la maison.",
  note: "La pompe de l’exercice, la table de dilatation, les contenances, la série des vases et les hauteurs du vase et des radiateurs sont des données de l’exercice, écrites pour cette station. Les règles de la soupape, du gonflage, du remplissage et du volume du vase viennent d’une fiche du fonds du professeur, la méthode du point de fonctionnement de ses cours sur les pompes.",

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
      objet: "Vitesse et point de fonctionnement de la pompe, volume d’eau, vase d’expansion, remplissage et soupape de la maison",
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage veut savoir comment régler la pompe de la maison des stations T1 à H3, quel vase poser et à quelle pression remplir l’installation. Régime ${EX.maison.dep}/${EX.maison.ret}. Le point demandé, les tubes et les longueurs viennent de la station H3, les radiateurs de la station H2 ; les autres données sont sous la commande. Suivez les étapes dans l’ordre.`,
        "Étape 1. Au recto de la feuille, calculez K, complétez le tableau de la courbe du réseau, tracez-la sur le graphique de la pompe et lisez la vitesse, le point de fonctionnement et la puissance absorbée.",
        "Étape 2. Au verso, calculez le volume d’eau de l’installation : les longueurs sont imprimées en gras.",
        "Étape 3. Calculez la dilatation, la hauteur statique, le gonflage et le volume minimal du vase, choisissez le vase. Étape 4. Calculez le remplissage et contrôlez la soupape, puis vérifiez les trois cases en trait double à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Point demandé, tubes et longueurs", ou: "Station H3, rappelés en gras sur la feuille et sous la commande" },
        { piece: "Radiateurs de chaque pièce", ou: "Station H2, rappelés sous la commande ; longueur totale en gras sur la feuille" },
        { piece: "Courbes de la pompe", ou: "Recto de la feuille, et l’écran « Le point de fonctionnement »" },
        { piece: "Table de dilatation, série des vases, règles de pression", ou: "Écrans de la méthode" },
        { piece: "Hauteurs de la maison", ou: "Le schéma sous la commande ; plans de la maison" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Pompe, vase d’expansion et soupape de la maison de deux niveaux, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le maître d’ouvrage veut le choix de la pompe, du vase et de la soupape du chauffage de la maison des stations T1 à H3. Régime ${EX.maison.dep}/${EX.maison.ret}. Reprenez le point demandé, les tubes et les longueurs aller-retour de votre feuille de la station H3, les radiateurs de la station H2. Données de l’exercice : la pompe de la station, la table de dilatation, la série des vases, la pompe à chaleur (${EX.maison.pac} L) et les hauteurs du schéma. Donnez la vitesse de la pompe, son point de fonctionnement, sa puissance absorbée et son rendement. Calculez le volume d’eau tronçon par tronçon, puis celui des radiateurs et de la pompe à chaleur. Dimensionnez le vase, donnez la pression de gonflage et de remplissage, contrôlez la soupape. Rédigez la première page de la note de calcul. Citez la source de chaque donnée.`,
      pieces: [
        { piece: "Point demandé, tubes et longueurs", ou: "Votre feuille de la station H3, rappelés sous la commande" },
        { piece: "Radiateurs de chaque pièce", ou: "Station H2, rappelés sous la commande" },
        { piece: "Courbes de la pompe", ou: "Recto de la feuille, et l’écran « Le point de fonctionnement »" },
        { piece: "Table de dilatation, série des vases, règles de pression", ou: "Écrans de la méthode" },
        { piece: "Hauteurs de la maison", ou: "Le schéma sous la commande ; plans de la maison" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso, avec une feuille quadrillée pour le détail" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "h4-n1-q", libelle: "Débit au point de fonctionnement de la pompe", unite: "m³/h", min: 0.7, max: 0.78, indice: "Relisez l’écran « Le point de fonctionnement » : tracez la courbe du réseau H = K × Q² par le point demandé, puis lisez le débit là où elle coupe la courbe de la vitesse retenue, la plus petite qui donne au moins le débit demandé." },
      { id: "h4-n1-vn", libelle: "Volume minimal du vase, avant le choix dans la série", unite: "L", min: 0.8, max: 0.86, indice: "Relisez l’écran « Le volume du vase » : Ve = e × volume d’eau ; Vn = Ve × (3 + 1) ÷ (3 − pression de gonflage), pressions en bar. Résultat en litres, au centième, avant de choisir le vase de la série." },
      { id: "h4-n1-pr", libelle: "Pression de remplissage au manomètre", unite: "bar", min: 0.79, max: 0.84, indice: "Relisez l’écran « Remplissage et soupape » : hauteur statique ÷ 10 + 0,5 bar, la hauteur statique allant du raccord du vase au haut du radiateur le plus haut." }
    ],
    2: [
      { id: "h4-n2-q", libelle: "Débit au point de fonctionnement de la pompe", unite: "m³/h", min: 0.7, max: 0.78, indice: "Relisez l’écran « Le point de fonctionnement » : tracez la courbe du réseau H = K × Q² par le point demandé, puis lisez le débit là où elle coupe la courbe de la vitesse retenue, la plus petite qui donne au moins le débit demandé." },
      { id: "h4-n2-p", libelle: "Puissance absorbée par la pompe", unite: "W", min: 27, max: 31, indice: "Relisez l’écran « La puissance absorbée et le rendement » : lisez la courbe de puissance de la vitesse retenue au débit du point de fonctionnement, à l’unité." },
      { id: "h4-n2-v", libelle: "Volume d’eau de l’installation", unite: "L", min: 52, max: 55.3, indice: "Relisez l’écran « Le volume d’eau de l’installation » : tubes (S × longueur aller-retour ÷ 1 000), radiateurs (5,0 L par mètre), pompe à chaleur. Résultat en litres, au centième." },
      { id: "h4-n2-vn", libelle: "Volume minimal du vase, avant le choix dans la série", unite: "L", min: 0.8, max: 0.86, indice: "Relisez l’écran « Le volume du vase » : Ve = e × volume d’eau ; Vn = Ve × (3 + 1) ÷ (3 − pression de gonflage), pressions en bar. Résultat en litres, au centième, avant de choisir le vase de la série." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-H5", titre: "Équilibrage, schéma", href: "../h5-equilibrage-schema/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-H3, Le réseau d’eau", href: "../h3-reseau-eau/index.html", pourquoi: "Le point demandé à la pompe, les tubes et leurs longueurs viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-H2, Les émetteurs", href: "../h2-emetteurs/index.html", pourquoi: "Le nombre et la longueur des radiateurs viennent du choix des émetteurs." },
    { reseau: "HydroMétro", titre: "Circulateur", href: "../../../hydrometro/stations/circulateur/index.html", pourquoi: "Le point de fonctionnement qui bouge avec la vitesse et les vannes, sur l’installation." },
    { reseau: "HydroMétro", titre: "Vase d’expansion", href: "../../../hydrometro/stations/vase/index.html", pourquoi: "La membrane qui absorbe la dilatation de l’eau, vue en coupe." },
    { reseau: "HydroMétro", titre: "Sécurité", href: "../../../hydrometro/stations/securite/index.html", pourquoi: "La chaîne de protection : soupape, vase, manomètre." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : choisir la pompe du chauffage, le vase d’expansion et la soupape de sécurité, puis dire à quelle pression remplir l’installation. La station H3 a donné le point que la pompe doit tenir : un débit et une hauteur manométrique. Vous placez ce point sur la courbe de la pompe, vous comptez l’eau de l’installation pour le vase, puis vous calculez les pressions. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Ce que vous trouvez", "Unité"], [
        ["Vitesse de la pompe et point de fonctionnement", "m³/h, m"],
        ["Puissance absorbée par la pompe", "W"],
        ["Volume d’eau de l’installation", "L"],
        ["Volume du vase d’expansion", "L"],
        ["Pressions de gonflage et de remplissage", "bar"],
        ["Tarage de la soupape", "bar"]
      ], "Le tableau à remplir, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la pompe, le vase et la soupape de la maison."], ["Le dossier :", "le point demandé et les tubes (H3), les radiateurs (H2), les hauteurs."]] },
          { title: "Vous produisez", rows: [["La feuille :", "le point de fonctionnement, le volume d’eau, le vase, les pressions."], ["Le contrôle :", "trois résultats à l’écran Vérifier (quatre au niveau 2), à ± 5 % pour une lecture de courbe, ± 3 % pour un calcul."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station H5, l’équilibrage et le schéma de la chaufferie."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Le point demandé à la pompe, les tubes et leurs longueurs viennent de la station H3 ; les radiateurs, de la station H2. Le CCTP, page 4, place la pompe à chaleur air/eau au garage. Les règles de la soupape, du gonflage, du remplissage et du volume du vase viennent d’une fiche du fonds du professeur, la méthode du point de fonctionnement de ses cours sur les pompes. La pompe elle-même, la table de dilatation, les contenances et la série des vases sont des données de l’exercice : aucun document de fabricant n’est utilisé.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Point demandé (débit, hauteur), tubes et longueurs aller-retour", "Station H3"],
        ["Nombre et longueur des radiateurs", "Station H2"],
        ["Pompe à chaleur au garage", "Page 4 du CCTP"],
        ["Altitude du sol de l’étage", "Schéma des hauteurs, à l’écran du projet (repris des plans de la maison)"],
        ["Point de fonctionnement, puissance transmise à l’eau", "Cours « 7 Pompes » et « Calcul de la hauteur manométrique totale », fonds du professeur ; station HydroMétro « Circulateur »"],
        ["Soupape de 3 bar, gonflage, remplissage, volume du vase", "Fiche n° 28 « Pression et vase d’expansion », fonds du professeur, § 1-4, 2-4 et 3"],
        ["Masse volumique de l’eau à 10, 40 et 80 °C", "Règles Th-Bât 2017, fascicule Matériaux, § 2.9.8, p. 29"],
        ["Pompe de l’exercice, table de dilatation, contenances, série des vases, hauteurs du vase et des radiateurs", "Cette station, données de l’exercice"]
      ], "Les données de la station")
        + BE.renvoi('Le point demandé se calcule à <a href="../h3-reseau-eau/index.html">la station H3</a>.')
    }),

    BE.ecran({
      id: "point-demande", dossier: "methode", kicker: "La méthode, 1", title: "La courbe du réseau", level: "comprendre",
      text: `La station H3 a donné, pour le bâtiment d’exemple, la hauteur manométrique du circuit le plus défavorisé, pompe à chaleur comprise : ${X().Hd} m au débit du circuit, ${X().qd} L/h, soit ${X().Qd} m³/h. C’est le point demandé. Si le débit change, la perte de charge du réseau change avec lui, à peu près comme le carré du débit : c’est la courbe du réseau, H = K × Q². On calcule K au point demandé, K = H ÷ Q², au centième. On calcule ensuite H pour quelques débits et on trace la courbe point par point, à partir de zéro, sur le graphique de la pompe.`,
      prompt: "Suivez le calcul de K et le tableau, puis repérez la courbe orange sur le schéma.",
      render: () => tableau(["Q (m³/h)", ...X().points.map(p => p.Q)], [["H = " + X().K + " × Q² (m)", ...X().points.map(p => p.H)]], `Bâtiment d’exemple : K = ${X().Hd} ÷ ${X().Qd}² = ${X().K}`)
        + BE.schema("illustrations/courbe-reseau-exemple.svg", `Le graphique de la pompe de l’exercice, avec la courbe du réseau du bâtiment d’exemple en orange : elle part de zéro et monte de plus en plus vite. Le point demandé, ${X().Qd} m³/h et ${X().Hd} m, est marqué sur cette courbe.`, "La courbe du réseau passe par zéro et par le point demandé.")
        + BE.alerte("<strong>Piège.</strong> Tracer une droite entre zéro et le point demandé : la perte de charge croît comme le carré du débit, la courbe se relève.")
    }),

    BE.ecran({
      id: "point-de-fonctionnement", dossier: "methode", kicker: "La méthode, 2", title: "Le point de fonctionnement", level: "comprendre",
      text: `La courbe d’une pompe donne la hauteur qu’elle fournit selon le débit, une courbe par vitesse. La pompe de l’exercice a trois vitesses, V1, V2 et V3 : ses courbes ont été écrites pour la station, sans fabricant. La pompe et le réseau s’accordent là où leurs courbes se croisent : c’est le point de fonctionnement. On retient la plus petite vitesse dont le point de fonctionnement donne au moins le débit demandé : plus forte, elle consomme et fait du bruit pour rien ; plus faible, les radiateurs du bout manquent d’eau. Lisez le débit au centième de m³/h, la hauteur au centième de mètre, sur le quadrillage : 0,05 m³/h et 0,1 m par carreau.`,
      prompt: "Suivez les pointillés orange sur le schéma et lisez l’exemple résolu, puis continuez.",
      render: () => figPoint() + exemplePoint()
        + BE.alerte(`<strong>Piège.</strong> Recopier le débit demandé comme point de fonctionnement : la pompe en ${X().v} donne un peu plus, ${X().Q} m³/h. La station H5 réglera les débits de chaque radiateur.`)
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, la vitesse", title: "Entraînement : la vitesse et le point", level: "appliquer", requiresAction: true,
      text: {
        1: `Un réseau demande ${EX.ent1.Q} m³/h sous ${EX.ent1.H} m. Avec la pompe de l’exercice, quelle vitesse retenez-vous, et où est le point de fonctionnement ? L’exemple résolu reste sous vos yeux.`,
        2: `Un réseau demande ${EX.ent1.Q} m³/h sous ${EX.ent1.H} m. Choisissez la vitesse de la pompe de l’exercice et son point de fonctionnement, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la vitesse et le point, en vous aidant de l’exemple.", 2: "Choisissez la vitesse et le point. Cette question est à faire seul." },
      aides: {
        1: ["Les courbes de la pompe sont sur le schéma ; la méthode à l’écran « Le point de fonctionnement ».", `K = ${EX.ent1.H} ÷ ${EX.ent1.Q}² = ${EX.ent1.K} ; deux points de la courbe du réseau : ${EX.ent1.kpts}.`, `La courbe du réseau coupe ${EX.ent1.vav} à ${EX.ent1.Qav} m³/h : est-ce au moins ${EX.ent1.Q} m³/h ?`],
        2: ["La méthode est à l’écran « Le point de fonctionnement ».", "K = H ÷ Q², puis quelques points de H = K × Q², puis le croisement avec chaque vitesse.", `K = ${EX.ent1.K}.`]
      },
      ...BE.parNiveau({
        1: avecBloc(figPompe() + exemplePoint(), EX.ent1.quiz),
        2: avecBloc(figPompe(), EX.ent1.quiz)
      })
    }),

    BE.ecran({
      id: "puissance", dossier: "methode", kicker: "La méthode, 3", title: "La puissance absorbée et le rendement", level: "comprendre",
      text: `Sous les courbes de hauteur, les droites de puissance donnent ce que la pompe prend au réseau électrique, pour chaque vitesse : on la lit au débit du point de fonctionnement, à l’unité. La puissance transmise à l’eau vaut P = ρ × g × Q × H, avec ρ = 990 kg/m³ (eau vers 40 °C, règles Th-Bât), g = 9,81 m/s², Q en m³/s (m³/h ÷ 3 600) et H en mètres ; on l’arrondit au dixième. Le rendement est le rapport des deux, transmise ÷ absorbée, en pour cent à l’unité. Un petit circulateur de chauffage a un rendement faible : l’énergie perdue chauffe surtout l’eau pompée.`,
      prompt: "Suivez la lecture de la puissance sur le schéma et le calcul, puis continuez.",
      render: () => figPoint() + BE.exemple({ text: `Bâtiment d’exemple, ${X().v} : ${X().Q} m³/h et ${X().H} m`, answer: `P absorbée lue : ${X().P} W ; P transmise = 990 × 9,81 × (${X().Q} ÷ 3 600) × ${X().H} = ${X().phyd} W ; rendement = ${X().phyd} ÷ ${X().P} = ${X().eta} %`, why: "La puissance se lit au débit du point de fonctionnement, sur la droite de la vitesse retenue." })
        + tableau(["Vitesse", "Q au point (m³/h)", "H au point (m)", "P absorbée (W)"], X().vitesses.map(v => [v.v, v.Q, v.H, v.P]), "Les trois points de fonctionnement du bâtiment d’exemple")
    }),

    BE.ecran({
      id: "volume-eau", dossier: "methode", kicker: "La méthode, 4", title: "Le volume d’eau de l’installation", level: "comprendre",
      text: `Le vase se calcule sur toute l’eau de l’installation : tubes, radiateurs et générateur. Dans un tube, le volume vaut section intérieure × longueur : V (L) = S (mm²) × L (m) ÷ 1 000, avec la section intérieure du tableau ci-dessous (station H3) et la longueur aller-retour. Les radiateurs de l’exercice contiennent ${EX.radL} L par mètre de longueur ; la pompe à chaleur de l’exemple, ${EX.pacEx} L : deux données de l’exercice. On arrondit chaque volume au centième de litre.`,
      prompt: "Lisez les deux tableaux et le schéma, puis continuez.",
      render: () => tableau(["Tube cuivre", ...EX.sections.map(t => t.nom)], [["d intérieur (mm)", ...EX.sections.map(t => t.di)], ["S (mm²)", ...EX.sections.map(t => t.S)]], "Sections intérieures des tubes (station H3)")
        + tableau(["N°", "Tronçon", "Tube", "S (mm²)", "L aller-retour (m)", "V (L)"], X().tubes.map(t => [t.n, t.nom, t.tube, t.S, t.L, t.V]), "Les tubes du bâtiment d’exemple (station H3)")
        + tableau(["Local", "Radiateurs", "Longueur (m)", "V (L)"], X().rad.map(r => [r.nom, r.nb, r.L, r.V]), `Les radiateurs (station H2), ${EX.radL} L par mètre`)
        + BE.schema("illustrations/volume-exemple.svg", `Trois barres horizontales. Tubes : ${X().vol.tubes} L. Radiateurs : ${X().vol.rad} L, la plus longue. Pompe à chaleur : ${X().vol.pac} L. Total : ${X().vol.total} L.`, "Les radiateurs portent l’essentiel de l’eau.")
        + BE.exemple({ text: "Bâtiment d’exemple", answer: `${X().vol.tubes} + ${X().vol.rad} + ${X().vol.pac} = ${X().vol.total} L`, why: "Le départ et le retour d’un tube sont pleins d’eau : on prend la longueur aller-retour." })
    }),

    BE.ecran({
      id: "dilatation", dossier: "methode", kicker: "La méthode, 5", title: "La dilatation de l’eau", level: "comprendre",
      text: `On remplit l’installation d’eau froide, vers 10 °C. En chauffant, l’eau prend de la place : son volume augmente d’un pourcentage e, lu dans la table à la température la plus haute de l’eau, celle du départ. Le volume de dilatation vaut Ve = e × V ÷ 100, au centième de litre. La table est une donnée de l’exercice. Elle recoupe les règles Th-Bât, qui donnent 1 000 kg/m³ à 10 °C et 970 kg/m³ à 80 °C : 1 000 ÷ 970 − 1 = ${EX.thbat} % entre 10 et 80 °C, la table donne ${EX.e80} %, car Th-Bât arrondit la masse volumique à 10 kg/m³ près.`,
      prompt: "Lisez la table, la courbe et l’exemple résolu, puis continuez.",
      render: () => tableau(["Température de départ (°C)", ...EX.dilatation.map(d => d.T)], [["Dilatation e (%)", ...EX.dilatation.map(d => d.e)]], "Dilatation de l’eau remplie à 10 °C, table de l’exercice")
        + BE.schema("illustrations/dilatation.svg", `Courbe de la dilatation de l’eau, en pour cent, selon la température maximale, de 10 à 80 °C : elle part de zéro et monte de plus en plus vite jusqu’à ${EX.e80} % à 80 °C. Le point du bâtiment d’exemple, ${X().Tmax} °C et ${X().e} %, est marqué en orange.`, "L’eau chaude prend de la place.")
        + exempleDilatation()
        + BE.alerte("<strong>Piège.</strong> Lire la table à la température de retour : le vase doit avaler l’eau la plus chaude.")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, la dilatation", title: "Entraînement : le volume de dilatation", level: "appliquer", requiresAction: true,
      text: {
        1: `Une installation contient ${EX.ent2.V} L d’eau ; l’eau part à ${EX.ent2.T} °C au plus. Calculez le volume de dilatation. L’exemple résolu reste sous vos yeux.`,
        2: `Une installation contient ${EX.ent2.V} L d’eau ; l’eau part à ${EX.ent2.T} °C au plus. Calculez le volume de dilatation, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le volume de dilatation, en vous aidant de l’exemple.", 2: "Choisissez le volume de dilatation. Cette question est à faire seul." },
      aides: {
        1: ["La table de dilatation est à l’écran « La dilatation de l’eau ».", "Lisez e à la température de départ, puis Ve = V × e ÷ 100.", `À ${EX.ent2.T} °C, la table donne ${EX.ent2.e} %.`],
        2: ["La méthode est à l’écran « La dilatation de l’eau ».", "La table d’abord, la multiplication ensuite.", `e = ${EX.ent2.e} %.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleDilatation(), EX.ent2.quiz),
        2: BE.quiz(EX.ent2.quiz)
      })
    }),

    BE.ecran({
      id: "vase-membrane", dossier: "methode", kicker: "La méthode, 6", title: "Le vase d’expansion à membrane", level: "comprendre",
      text: "Le vase est une cuve d’acier coupée en deux par une membrane : d’un côté l’eau de l’installation, de l’autre de l’azote. On gonfle l’azote à la pression de gonflage avant de remplir. Au remplissage, la pression de l’installation dépasse un peu le gonflage : un peu d’eau entre et décolle la membrane de la coque. En chauffant, l’eau dilatée entre dans le vase et comprime l’azote : la pression monte, sans atteindre celle qui ouvre la soupape. Le vase se pose sur le retour, partie la plus froide, près du générateur (fiche n° 28).",
      prompt: "Comparez les trois vases du schéma, puis continuez.",
      render: () => BE.schema("illustrations/vase-coupe.svg", `Trois vases en coupe, côte à côte. Chacun a une valve de gonflage en haut et un raccord à l’installation en bas ; une membrane noire sépare l’azote, en haut, de l’eau, en bas. Premier vase, gonflé avant remplissage, à ${X().Pg} bar : l’azote occupe tout. Deuxième, rempli à froid, à ${X().Pr} bar : un peu d’eau au fond. Troisième, à chaud : l’eau dilatée occupe le tiers du bas, l’azote est comprimé, la pression est plus haute mais reste sous 3 bar.`, "La membrane sépare l’eau de l’azote ; l’azote absorbe la dilatation.")
        + BE.renvoi('Le vase vu de près, en animation : <a href="../../../hydrometro/stations/vase/index.html">la station HydroMétro « Vase d’expansion »</a>.')
    }),

    BE.ecran({
      id: "gonflage", dossier: "methode", kicker: "La méthode, 7", title: "La hauteur statique et le gonflage", level: "comprendre",
      text: `L’eau pèse : en bas de l’installation, la pression vaut celle du haut plus le poids de la colonne d’eau, environ 0,1 bar par mètre. La hauteur statique Hs va du raccord du vase, où se trouve aussi le manomètre, au haut du radiateur le plus haut. La fiche n° 28 donne la pression de gonflage du vase : Pg = Hs ÷ 10, en bar, choisie au pas de 0,5 bar au-dessus (0,5 ; 1 ; 1,5…), sans descendre sous 0,5 bar. Données de l’exercice : radiateurs de 600 mm de haut posés à 150 mm du sol, soit leur haut à ${EX.hRad} m ; raccord du vase à ${EX.hVase} m du sol.`,
      prompt: "Lisez la coupe et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/hauteur-exemple.svg", `Coupe de principe du bâtiment d’exemple, de plain-pied. Le vase, au local technique, a son raccord à ${EX.hVase} m du sol. Le haut du radiateur est à ${EX.hRad} m du sol. La hauteur statique, du raccord au haut du radiateur, vaut ${X().Hs} m.`, "Hs : du raccord du vase au haut du radiateur le plus haut.")
        + BE.exemple({ text: "Bâtiment d’exemple, de plain-pied", answer: `Hs = ${EX.hRad} − ${EX.hVase} = ${X().Hs} m ; ${X().Hs} ÷ 10 = ${X().Hs10} bar, porté au pas de 0,5 : Pg = ${X().Pg} bar`, why: "Le gonflage tient la membrane décollée même en haut de l’installation." })
        + BE.alerte("<strong>Piège.</strong> Mesurer Hs depuis le sol, ou s’arrêter au sol de l’étage : on part du raccord du vase et on monte jusqu’au haut du radiateur.")
    }),

    BE.ecran({
      id: "volume-vase", dossier: "methode", kicker: "La méthode, 8", title: "Le volume du vase", level: "comprendre",
      text: `L’azote suit la loi des gaz : à température constante, pression × volume reste constant, avec les pressions absolues (celle du manomètre plus 1 bar). Le vase doit avaler Ve sans que la pression dépasse celle qui ouvre la soupape, 3 bar. La fiche n° 28 en tire le volume minimal du vase : Vn = Ve × (3 + 1) ÷ (3 − Pg), au centième de litre, avec Ve déjà arrondi au centième. On choisit ensuite le premier vase de la série qui le dépasse : ${EX.serie} L (série de l’exercice). Dans une petite installation, le plus petit vase de la série dépasse de loin le volume minimal : c’est normal, aucun vase plus petit n’est proposé.`,
      prompt: "Suivez les trois cases du schéma et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/vase-volume.svg", `Trois cases reliées par des flèches. Dilatation : ${X().vol.total} L × ${X().e} %, Ve = ${X().Ve} L. Fois (3 + 1), divisé par (3 − ${X().Pg}) : Vn = ${X().Vn} L. Série : premier vase au-dessus, ${X().vase} L.`, "Du volume de dilatation au vase de la série.")
        + exempleVase()
        + BE.alerte("<strong>Piège.</strong> Mettre les pressions du manomètre dans la formule : sans le + 1 bar, le vase sort trop petit.")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, le vase", title: "Entraînement : le volume du vase", level: "appliquer", requiresAction: true,
      text: {
        1: `Une installation contient ${EX.ent3.V} L d’eau ; l’eau part à ${EX.ent3.T} °C au plus ; le haut de l’installation est à ${EX.ent3.Hs} m au-dessus du raccord du vase ; soupape de 3 bar. Calculez le volume minimal du vase et choisissez-le dans la série. L’exemple résolu reste sous vos yeux.`,
        2: `Une installation contient ${EX.ent3.V} L d’eau ; l’eau part à ${EX.ent3.T} °C au plus ; le haut de l’installation est à ${EX.ent3.Hs} m au-dessus du raccord du vase ; soupape de 3 bar. Dimensionnez le vase, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le volume et le vase, en vous aidant de l’exemple.", 2: "Choisissez le volume et le vase. Cette question est à faire seul." },
      aides: {
        1: ["La table de dilatation est à l’écran « La dilatation de l’eau », le gonflage à l’écran « La hauteur statique et le gonflage », la formule à l’écran « Le volume du vase ».", "Ve = V × e ÷ 100 ; Pg = Hs ÷ 10 au pas de 0,5 bar ; Vn = Ve × 4 ÷ (3 − Pg).", `Ve = ${EX.ent3.Ve} L ; Pg = ${EX.ent3.Pg} bar.`],
        2: ["La méthode est aux écrans « La dilatation de l’eau », « La hauteur statique et le gonflage » et « Le volume du vase ».", "Trois étapes : Ve, Pg, Vn, puis la série.", `Ve = ${EX.ent3.Ve} L.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleVase(), EX.ent3.quiz),
        2: BE.quiz(EX.ent3.quiz)
      })
    }),

    BE.ecran({
      id: "remplissage-soupape", dossier: "methode", kicker: "La méthode, 9", title: "Remplissage et soupape", level: "comprendre",
      text: `On remplit l’installation à froid, en lisant le manomètre. Pour que le haut de l’installation reste sous pression, la fiche n° 28 donne la pression de remplissage au manomètre : Hs ÷ 10 + 0,5 bar, au centième, un 5 arrondi au-dessus (0,545 donne 0,55) ; elle dépasse un peu le gonflage. La soupape limite la pression : une soupape de 3 bar convient dans une installation individuelle si remplissage + 2 bar ≤ 3 bar, les 2 bar couvrant la montée due au chauffage avec un petit vase. Elle se monte en sortie de la pompe à chaleur, sans vanne d’isolement entre les deux. Montée après la pompe, il faudrait ajouter la hauteur de la pompe.`,
      prompt: "Suivez les trois cases du schéma et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/remplissage-soupape.svg", `Trois cases reliées par des flèches. Remplissage : ${X().Hs} ÷ 10 + 0,5 = ${X().Pr} bar. Plus 2 bar au chauffage : ${X().ctrl} bar. Soupape : ${X().ctrl} est sous 3 bar, tarage 3 bar.`, "Le remplissage, puis le contrôle de la soupape.")
        + BE.exemple({ text: `Bâtiment d’exemple : Hs = ${X().Hs} m`, answer: `Remplissage = ${X().Hs} ÷ 10 + 0,5 = ${X().Pr} bar ; ${X().Pr} + 2 = ${X().ctrl} bar ≤ 3 bar : soupape de 3 bar`, why: "La soupape ne doit pas s’ouvrir en marche normale : elle protège contre un défaut." })
        + tableau(["Pression", "Règle", "Bâtiment d’exemple"], [
          ["Gonflage du vase", "Hs ÷ 10, par pas de 0,5 bar", `${X().Pg} bar`],
          ["Remplissage, au manomètre", "Hs ÷ 10 + 0,5 bar", `${X().Pr} bar`],
          ["Tarage de la soupape", "3 bar si remplissage + 2 ≤ 3", "3 bar"]
        ], "Les trois pressions de l’installation")
    }),

    BE.ecran({
      id: "position", dossier: "methode", kicker: "La méthode, 10", title: "Où poser la pompe, le vase et la soupape", level: "comprendre",
      text: "Le schéma reprend le circuit du bâtiment d’exemple de la station H3. Sur le départ, en sortie de la pompe à chaleur : la soupape, sans vanne, puis la pompe, qui pousse l’eau vers le collecteur. Sur le retour, partie la plus froide, avant la pompe à chaleur : le vase, le manomètre à côté de lui, et le robinet de remplissage. Le manomètre est à la hauteur du vase : la pression qu’il lit est celle des règles de gonflage et de remplissage.",
      prompt: "Suivez le départ puis le retour sur le schéma, puis continuez.",
      render: () => BE.schema("illustrations/circuit-organes.svg", `Schéma de principe du circuit du bâtiment d’exemple. En bas à gauche, la pompe à chaleur. Le départ, en rouge, monte puis va vers la droite : la soupape de 3 bar sur un piquage vers le haut, puis la pompe, puis le tronçon 1 jusqu’au collecteur. Du collecteur partent quatre lignes vers les radiateurs : ${X().tubes.slice(1).map(t => `${t.n}, ${t.nom.replace("Ligne ", "")}`).join(" ; ")}. Le retour, en bleu, revient le long du bas : le vase sur un piquage vers le haut, le manomètre, puis le robinet de remplissage sur un piquage vers le bas, avant la pompe à chaleur.`, "La soupape au départ, le vase et le manomètre au retour.")
        + BE.renvoi('La chaîne de protection sur une installation : <a href="../../../hydrometro/stations/securite/index.html">la station HydroMétro « Sécurité »</a>.')
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 11", title: "La note de calcul", level: "comprendre",
      text: "La note de calcul donne à un lecteur de quoi refaire le choix : l’objet, les données avec leur source, les hypothèses et la méthode, les résultats. La pompe de l’exercice, la table de dilatation et les contenances sont des hypothèses : elles s’écrivent comme telles. La note du bâtiment d’exemple tient en quatre lignes, une par rubrique ; la feuille du niveau 2 reprend les mêmes rubriques.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Pompe, vase d’expansion et soupape du chauffage d’un petit bâtiment de bureaux de plain-pied, quatre radiateurs, pompe à chaleur"],
        ["Données et sources", "Point demandé et tubes : station H3 ; radiateurs : station H2 ; règles de la soupape et des pressions : fiche n° 28 ; pompe, dilatation, contenances, série : exercice"],
        ["Hypothèses et méthode", `Régime ${X().dep}/${X().ret}, eau remplie à 10 °C ; H = K × Q² ; Ve = e × V ; Vn = Ve × 4 ÷ (3 − Pg) ; remplissage Hs ÷ 10 + 0,5 bar`],
        ["Résultats", `Pompe en ${X().v}, ${X().Q} m³/h sous ${X().H} m, ${X().P} W ; ${X().vol.total} L d’eau ; vase de ${X().vase} L gonflé à ${X().Pg} bar ; remplissage ${X().Pr} bar ; soupape 3 bar`]
      ], "Première page de la note de calcul, bâtiment d’exemple")
        + BE.renvoi("La note complète du projet s’assemble à la station R5, « La note de calcul ».")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

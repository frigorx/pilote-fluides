/* Station BE-H3 : Le réseau d'eau.
   Méthode sur le petit bâtiment de bureaux des stations T5, H1 et H2 (bureau, salle de réunion, sanitaires), puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/h3-reseau-eau/construire.mjs : le premier vient de exemple-data.mjs, les secondes de
   corriges/h3-reseau-eau/reference-reseau.json (outils/h3-reseau-maison.mjs, tolérance 3 %).
   La maison n'apparaît que par les données de la commande (débits des radiateurs repris de H1, tracé, longueurs, singularités,
   pompe à chaleur) et les bornes des fourchettes. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "rho": "990",
 "g": "9,81",
 "nu": "0,66",
 "exposant": "1,75",
 "zLigne": "15,5",
 "tubes": [
  {
   "nom": "12 × 1",
   "di": "10",
   "S": "78,5",
   "vmax": "0,50",
   "R100": "229"
  },
  {
   "nom": "14 × 1",
   "di": "12",
   "S": "113,1",
   "vmax": "0,50",
   "R100": "96,3"
  },
  {
   "nom": "16 × 1",
   "di": "14",
   "S": "153,9",
   "vmax": "0,60",
   "R100": "46,3"
  },
  {
   "nom": "18 × 1",
   "di": "16",
   "S": "201,1",
   "vmax": "0,60",
   "R100": "24,6"
  },
  {
   "nom": "22 × 1",
   "di": "20",
   "S": "314,2",
   "vmax": "0,80",
   "R100": "8,51"
  }
 ],
 "zeta": [
  {
   "nom": "Coude à 90°",
   "z": "1,0"
  },
  {
   "nom": "Té, en dérivation",
   "z": "1,5"
  },
  {
   "nom": "Té, en passage direct",
   "z": "0,5"
  },
  {
   "nom": "Vanne d’isolement ouverte",
   "z": "0,5"
  },
  {
   "nom": "Piquage de collecteur (départ ou retour d’une ligne)",
   "z": "1,5"
  },
  {
   "nom": "Robinet thermostatique du radiateur",
   "z": "8,0"
  },
  {
   "nom": "Radiateur",
   "z": "2,5"
  },
  {
   "nom": "Té de réglage du radiateur",
   "z": "2,0"
  }
 ],
 "reg": {
  "dep": "50",
  "ret": "40"
 },
 "reseau": [
  {
   "n": "1",
   "nom": "Commun : pompe à chaleur → collecteur",
   "q": "297",
   "L": "2,0",
   "LAR": "4,0",
   "sing": "2 vannes, 4 coudes",
   "tube": "16 × 1",
   "S": "153,9",
   "v": "0,54",
   "vmax": "0,60",
   "R": "311",
   "lin": "1244",
   "sz": "5,0",
   "pd": "144,3",
   "Z": "722",
   "dp": "1966"
  },
  {
   "n": "2",
   "nom": "Ligne du bureau",
   "q": "117",
   "L": "7,0",
   "LAR": "14,0",
   "sing": "ligne de radiateur, 6 coudes",
   "tube": "12 × 1",
   "S": "78,5",
   "v": "0,41",
   "vmax": "0,50",
   "R": "301",
   "lin": "4214",
   "sz": "21,5",
   "pd": "83,2",
   "Z": "1789",
   "dp": "6003"
  },
  {
   "n": "3",
   "nom": "Ligne réunion 1",
   "q": "78,5",
   "L": "9,0",
   "LAR": "18,0",
   "sing": "ligne de radiateur, 8 coudes",
   "tube": "12 × 1",
   "S": "78,5",
   "v": "0,28",
   "vmax": "0,50",
   "R": "150",
   "lin": "2700",
   "sz": "23,5",
   "pd": "38,8",
   "Z": "912",
   "dp": "3612"
  },
  {
   "n": "4",
   "nom": "Ligne réunion 2",
   "q": "78,5",
   "L": "13,0",
   "LAR": "26,0",
   "sing": "ligne de radiateur, 8 coudes",
   "tube": "12 × 1",
   "S": "78,5",
   "v": "0,28",
   "vmax": "0,50",
   "R": "150",
   "lin": "3900",
   "sz": "23,5",
   "pd": "38,8",
   "Z": "912",
   "dp": "4812"
  },
  {
   "n": "5",
   "nom": "Ligne des sanitaires",
   "q": "23",
   "L": "11,0",
   "LAR": "22,0",
   "sing": "ligne de radiateur, 6 coudes",
   "tube": "12 × 1",
   "S": "78,5",
   "v": "0,08",
   "vmax": "0,50",
   "R": "17",
   "lin": "374",
   "sz": "21,5",
   "pd": "3,2",
   "Z": "69",
   "dp": "443"
  }
 ],
 "circuits": [
  {
   "nom": "bureau",
   "troncons": "1 + 2",
   "dp": "7969"
  },
  {
   "nom": "réunion 1",
   "troncons": "1 + 3",
   "dp": "5578"
  },
  {
   "nom": "réunion 2",
   "troncons": "1 + 4",
   "dp": "6778"
  },
  {
   "nom": "sanitaires",
   "troncons": "1 + 5",
   "dp": "2409"
  }
 ],
 "pire": {
  "nom": "bureau",
  "dp": "7969",
  "kPa": "7,97"
 },
 "longue": {
  "nom": "réunion 2",
  "L": "13,0",
  "dp": "6778"
 },
 "hmt": {
  "pac": "8000",
  "total": "15969",
  "kPa": "16,0",
  "m": "1,64"
 },
 "re": {
  "tube": "14 × 1",
  "d": "12",
  "dm": "0,012",
  "S": "113,1",
  "Sm2": "0,000 113 1",
  "nu": "0,000 000 66",
  "v": "0,2456",
  "Re": "4465",
  "lambda": "0,0387",
  "R": "96,3"
 },
 "ex1": {
  "q": "160",
  "tube": "14 × 1",
  "v": "0,39",
  "S": "113,1",
  "quiz": {
   "choices": [
    "12 × 1, 0,57 m/s",
    "14 × 1, 0,39 m/s",
    "16 × 1, 0,29 m/s",
    "14 × 1, 1,41 m/s"
   ],
   "good": 1,
   "explain": "160 ÷ (3,6 × 113,1) = 0,39 m/s, sous les 0,50 m/s du 14 × 1. A dépasse la vitesse maximale du 12 × 1 (0,50 m/s) ; C convient mais il est plus gros que nécessaire ; D oublie le facteur 3,6 des unités."
  }
 },
 "ex2": {
  "tube": "14 × 1",
  "q": "120",
  "L": "8",
  "LAR": "16",
  "R100": "96,3",
  "R": "132",
  "lin": "2112",
  "quiz": {
   "choices": [
    "1056 Pa",
    "2112 Pa",
    "1856 Pa",
    "1541 Pa"
   ],
   "good": 1,
   "explain": "R = 96,3 × (120 ÷ 100) puissance 1,75 = 132 Pa/m ; longueur aller-retour 16 m ; 132 × 16 = 2112 Pa. A oublie le retour, C oublie la puissance 1,75, D garde R à 100 L/h sans le corriger."
  }
 },
 "ex3": {
  "tube": "12 × 1",
  "q": "90",
  "coudes": "6",
  "v": "0,32",
  "sz": "21,5",
  "pd": "50,7",
  "Z": "1090",
  "quiz": {
   "choices": [
    "786 Pa",
    "1090 Pa",
    "2180 Pa",
    "51 Pa"
   ],
   "good": 1,
   "explain": "v = 90 ÷ (3,6 × 78,5) = 0,32 m/s ; ρv²/2 = 990 × 0,32² ÷ 2 = 50,7 Pa ; Σζ = 15,5 + 6 coudes = 21,5 ; Z = 21,5 × 50,7 = 1090 Pa. A oublie les coudes, C oublie de diviser par 2, D oublie Σζ."
  }
 },
 "maison": {
  "dep": "45",
  "ret": "40",
  "pac": "10000",
  "troncons": [
   {
    "n": "1",
    "nom": "Commun",
    "parcours": "dans le garage",
    "q": "",
    "L": "1,5",
    "sing": "2 vannes, 2 coudes"
   },
   {
    "n": "2",
    "nom": "Branche du rez-de-chaussée",
    "parcours": "traverse le mur du garage, longe l’entrée jusqu’au placard sous l’escalier",
    "q": "",
    "L": "3,0",
    "sing": "2 tés en passage direct, 2 vannes, 4 coudes"
   },
   {
    "n": "3",
    "nom": "Branche de l’étage",
    "parcours": "traverse le mur du garage, monte en gaine dans l’entrée le long de l’escalier jusqu’au palier",
    "q": "",
    "L": "7,0",
    "sing": "2 tés en dérivation, 2 vannes, 8 coudes"
   },
   {
    "n": "4",
    "nom": "Chambre 1",
    "parcours": "du palier à la fenêtre sud",
    "q": "82",
    "L": "4,5",
    "sing": "ligne de radiateur, 6 coudes"
   },
   {
    "n": "5",
    "nom": "Chambre 2",
    "parcours": "passe sous la chambre 1 jusqu’à la fenêtre sud",
    "q": "87",
    "L": "9,0",
    "sing": "ligne de radiateur, 8 coudes"
   },
   {
    "n": "6",
    "nom": "Palier",
    "parcours": "sous la fenêtre ouest du palier",
    "q": "50",
    "L": "2,0",
    "sing": "ligne de radiateur, 4 coudes"
   },
   {
    "n": "7",
    "nom": "Chambre 3",
    "parcours": "du palier à la fenêtre nord",
    "q": "43",
    "L": "6,5",
    "sing": "ligne de radiateur, 6 coudes"
   },
   {
    "n": "8",
    "nom": "Salle d'eau",
    "parcours": "passe sous la chambre 3 jusqu’au mur est",
    "q": "37",
    "L": "8,5",
    "sing": "ligne de radiateur, 6 coudes"
   },
   {
    "n": "9",
    "nom": "Séjour 1",
    "parcours": "sous la fenêtre sud du séjour",
    "q": "147,5 = 295 ÷ 2 (H2)",
    "L": "9,0",
    "sing": "ligne de radiateur, 8 coudes"
   },
   {
    "n": "10",
    "nom": "Séjour 2",
    "parcours": "sous la fenêtre est de la cuisine",
    "q": "147,5 = 295 ÷ 2 (H2)",
    "L": "6,0",
    "sing": "ligne de radiateur, 6 coudes"
   },
   {
    "n": "11",
    "nom": "Entrée",
    "parcours": "sous la fenêtre ouest de l’entrée",
    "q": "76",
    "L": "3,5",
    "sing": "ligne de radiateur, 4 coudes"
   },
   {
    "n": "12",
    "nom": "WC",
    "parcours": "sous la fenêtre nord du WC",
    "q": "11",
    "L": "4,0",
    "sing": "ligne de radiateur, 6 coudes"
   }
  ],
  "collecteurs": {
   "RDC": "Collecteur du rez-de-chaussée, placard sous l’escalier de l’entrée",
   "ETG": "Collecteur de l’étage, sur le palier"
  },
  "passage": "Lignes dans la chape : plancher bas au rez-de-chaussée, plancher de l’étage à l’étage. La ligne de la chambre 2 passe sous la chambre 1, celle de la salle d’eau sous la chambre 3."
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const T1 = () => EX.reseau[0], BU = () => EX.reseau[1];
const tubesTable = () => tableau(["Tube cuivre", "d intérieur (mm)", "S (mm²)", "v max (m/s)", "R à 100 L/h (Pa/m)"], EX.tubes.map(t => [t.nom, t.di, t.S, t.vmax, t.R100]), "Tubes de l’exercice, eau vers 40 °C");
const exempleVitesse = () => BE.exemple({ text: `Ligne du bureau du bâtiment d’exemple : ${BU().q} L/h`, answer: `En ${BU().tube} : ${BU().q} ÷ (3,6 × ${BU().S}) = ${BU().v} m/s, sous les ${BU().vmax} m/s permis : le ${BU().tube} suffit`, why: "On essaie le plus petit tube de la série, puis le suivant tant que la vitesse dépasse la vitesse maximale." });
const exempleLineaire = () => BE.exemple({ text: `Ligne du bureau : ${BU().tube}, ${BU().q} L/h, ${BU().L} m à l’aller`, answer: `R = ${EX.tubes[0].R100} × (${BU().q} ÷ 100) puissance 1,75 = ${BU().R} Pa/m ; longueur aller-retour ${BU().LAR} m ; ${BU().R} × ${BU().LAR} = ${BU().lin} Pa`, why: "Le départ et le retour ont la même longueur et le même débit : on double la longueur à l’aller." });
const exempleSing = () => BE.exemple({ text: `Ligne du bureau : ${BU().sing}, v = ${BU().v} m/s`, answer: `Σζ = ${EX.zLigne} + 6 × 1,0 = ${BU().sz} ; ρv²/2 = 990 × ${BU().v}² ÷ 2 = ${BU().pd} Pa ; Z = ${BU().sz} × ${BU().pd} = ${BU().Z} Pa`, why: "Chaque singularité freine l’eau d’autant plus qu’elle va vite : ζ multiplie la pression dynamique ρv²/2." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Le tracé, la longueur à l’aller et les singularités de chaque tronçon sont dans le tableau sous la commande et sur le schéma. Le débit de chaque tronçon et la longueur aller-retour sont imprimés en gras sur la feuille.",
      "Dans l’ordre : le tube et la vitesse (écran « Le diamètre et la vitesse ») ; R et la perte linéaire (écran « Les pertes de charge linéaires ») ; ρv²/2 et Z (écran « Les pertes de charge singulières ») ; le circuit le plus défavorisé (écran du même nom).",
      `La ligne grisée de la feuille montre le geste sur le bureau d’exemple : ${BU().q} L/h en ${BU().tube}, ${BU().v} m/s ; R ${BU().R} Pa/m ; ${BU().dp} Pa en tout. Faites les mêmes colonnes pour les tronçons 1 et 3, puis pour les cinq lignes de l’étage.`
    ],
    2: [
      "Les débits des radiateurs sont dans le tableau sous la commande (station H1) ; le tracé, les longueurs, les singularités et la perte de charge de la pompe à chaleur aussi.",
      "Débit de chaque tronçon, tube et vitesse, pertes linéaires et singulières, puis un circuit par radiateur : tronçon commun, branche, ligne. Le plus grand donne la hauteur manométrique, avec la pompe à chaleur.",
      "Commencez par les débits des tronçons 1, 2 et 3 : additionnez les lignes qu’ils alimentent. Au séjour, chaque radiateur porte la moitié du débit de la pièce."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const donneesReseau = () => tableau(["N°", "Tronçon", "Parcours", "Débit de la ligne (L/h)", "Aller (m)", "Singularités, aller et retour"],
  EX.maison.troncons.map(t => [t.n, t.nom, t.parcours, t.q || "somme des lignes", t.L, t.sing]), "Le réseau de la maison, données de l’exercice (débits des lignes : station H1 ; au séjour, débit de la pièce partagé entre ses deux radiateurs : station H2)")
  + BE.schema("illustrations/schema-reseau-maison.svg", `Schéma de principe du réseau de la maison. En bas à gauche, la pompe à chaleur air/eau du garage et la pompe de circulation sur le départ, en rouge, à ${EX.maison.dep} °C ; le retour, en bleu, à ${EX.maison.ret} °C. Le tronçon 1 monte jusqu’à un té. Le tronçon 2 va au collecteur du rez-de-chaussée, sous l’escalier, qui alimente les lignes 9 à 12 : séjour 1, séjour 2, entrée, WC. Le tronçon 3 monte au collecteur de l’étage, sur le palier, qui alimente les lignes 4 à 8 : chambre 1, chambre 2, palier, chambre 3, salle d’eau. Chaque ligne porte son numéro, sa pièce et sa longueur à l’aller.`, "Le réseau de la maison : numéros des tronçons et longueurs à l’aller.")
  + BE.renvoi(`${EX.maison.collecteurs.RDC} ; ${EX.maison.collecteurs.ETG.toLowerCase()}. ${EX.maison.passage} Perte de charge de la pompe à chaleur au débit du circuit : ${EX.maison.pac} Pa, donnée de l’exercice.`)
  + BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Pompe à chaleur au garage et radiateurs à la page 4" }, { href: DOSSIER + "plans.html", title: "Les plans de la maison", note: "Pièces et niveaux, pour suivre le tracé" }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + donneesReseau(); };

BE.station({
  code: "BE-H3",
  titre: "Le réseau d’eau",
  ligne: "Hydraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison, branche de l’étage, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, tout le réseau et la hauteur de la pompe, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "L’eau chaude part de la pompe à chaleur, va à chaque radiateur et revient. Vous choisissez le tube de chaque tronçon d’après sa vitesse, vous calculez ce que l’eau perd en frottant dans les tubes et en passant les coudes et les robinets, puis vous trouvez le circuit le plus défavorisé : celui que la pompe doit vaincre. Vous apprenez la méthode sur le petit bâtiment de bureaux des stations T5, H1 et H2, puis vous la faites sur la maison.",
  note: "Le tracé des réseaux, les coefficients des singularités, la table des pertes linéaires et la perte de charge de la pompe à chaleur sont des données de l’exercice, écrites pour cette station. Les vitesses maximales viennent d’une fiche du Centre d’information du cuivre, la masse volumique de l’eau des règles Th-Bât.",

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
      objet: "Tube, vitesse et pertes de charge de la branche de l’étage de la maison, et son circuit le plus défavorisé",
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage veut savoir quels tubes poser à l’étage de la maison des stations T1 à H2, et quelle perte de charge la pompe devra vaincre pour l’étage. Régime ${EX.maison.dep}/${EX.maison.ret} (station H1). Données de l’exercice : le tracé, les longueurs et les singularités du tableau ci-dessous ; les tubes, les vitesses maximales, les R à 100 L/h et les ζ de la station. Suivez les étapes dans l’ordre.`,
        "Étape 1. Au recto de la feuille, choisissez le tube du tronçon commun (1), de la branche de l’étage (3) et des cinq lignes de l’étage (4 à 8), et calculez leur vitesse. Les débits sont imprimés en gras.",
        "Étape 2. Au verso, calculez pour ces sept tronçons R, la perte linéaire, ρv²/2, la perte singulière Z et le total. La longueur aller-retour et Σζ sont imprimés en gras.",
        "Étape 3. Trouvez la ligne la plus défavorisée de l’étage et la perte de son circuit, tronçons 1 et 3 compris. Écrivez les trois lignes de la note de calcul, puis vérifiez le tronçon 3 et le circuit à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Tracé, longueurs, singularités", ou: "Le tableau et le schéma ci-dessous, données de l’exercice" },
        { piece: "Débit de chaque radiateur", ou: "Station H1, dans le tableau ci-dessous ; débits des tronçons en gras sur la feuille" },
        { piece: "Tubes, vitesses maximales, R à 100 L/h, ζ", ou: "Écrans « Le diamètre et la vitesse » et « Les pertes de charge singulières », et le recto de la feuille" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : pompe à chaleur air/eau au garage, radiateurs" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Réseau d’eau de la maison de deux niveaux : tubes, pertes de charge, circuit le plus défavorisé, hauteur manométrique de la pompe, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le maître d’ouvrage veut le dimensionnement du réseau de chauffage de la maison des stations T1 à H2. Régime ${EX.maison.dep}/${EX.maison.ret} et débit de chaque radiateur : station H1 ; deux radiateurs au séjour-cuisine : station H2. Données de l’exercice : le tracé, les longueurs et les singularités du tableau ci-dessous ; les tubes, les vitesses maximales, les R à 100 L/h et les ζ de la station ; la perte de charge de la pompe à chaleur, ${EX.maison.pac} Pa au débit du circuit. Pour chacun des douze tronçons, donnez le débit, le tube, la vitesse et la perte de charge. Trouvez le circuit le plus défavorisé de chaque niveau et de toute la maison, puis calculez la hauteur manométrique que la pompe devra fournir, avec le débit du circuit ; la station H4 choisira la pompe d’après ce point. Rédigez la première page de la note de calcul. Citez la source de chaque donnée.`,
      pieces: [
        { piece: "Tracé, longueurs, singularités, pompe à chaleur", ou: "Le tableau et le schéma ci-dessous, données de l’exercice" },
        { piece: "Débit de chaque radiateur", ou: "Station H1, rappelée dans le tableau ci-dessous" },
        { piece: "Tubes, vitesses maximales, R à 100 L/h, ζ", ou: "Écrans « Le diamètre et la vitesse » et « Les pertes de charge singulières »" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : pompe à chaleur air/eau au garage, radiateurs" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso, avec une feuille quadrillée pour le détail" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "h3-n1-t3", libelle: "Perte de charge du tronçon 3, branche de l’étage", unite: "Pa", min: 5957, max: 6327, indice: "Relisez l’écran « Le circuit d’un émetteur » : perte linéaire = R × longueur aller-retour, avec R = R à 100 L/h × (débit ÷ 100) puissance 1,75 ; perte singulière = Σζ × ρv²/2 ; le tronçon 3 porte le débit de toute la branche de l’étage." },
      { id: "h3-n1-circuit", libelle: "Perte de charge du circuit le plus défavorisé de l’étage", unite: "kPa", min: 11.39, max: 12.11, indice: "Relisez l’écran « Le circuit le plus défavorisé » : additionnez le tronçon commun, la branche de l’étage et la ligne du radiateur ; prenez le plus grand des cinq circuits de l’étage. Donnez le résultat en kPa (Pa ÷ 1000)." }
    ],
    2: [
      { id: "h3-n2-rdc", libelle: "Perte de charge du circuit le plus défavorisé du rez-de-chaussée", unite: "kPa", min: 8.31, max: 8.83, indice: "Relisez l’écran « Le circuit le plus défavorisé » : pour chaque radiateur du rez-de-chaussée, tronçon commun + branche du rez-de-chaussée + sa ligne. Le plus grand, en kPa." },
      { id: "h3-n2-hmt", libelle: "Hauteur manométrique à fournir par la pompe", unite: "m", min: 2.17, max: 2.31, indice: "Relisez l’écran « La hauteur manométrique » : le circuit le plus défavorisé de toute la maison, plus la pompe à chaleur, en pascals, divisé par ρ × g = 990 × 9,81. Résultat en mètres, au centième." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-H4", titre: "Pompe, vase, soupape", href: "../h4-pompe-vase-soupape/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-H1, Puissance et débit", href: "../h1-puissance-debit-regime/index.html", pourquoi: "Le débit de chaque radiateur et le régime d’eau viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-H2, Les émetteurs", href: "../h2-emetteurs/index.html", pourquoi: "Le nombre de radiateurs de chaque pièce vient du choix des émetteurs." },
    { reseau: "HydroMétro", titre: "Pertes de charge", href: "../../../hydrometro/stations/pertes/index.html", pourquoi: "La perte de charge d’un réseau réel et le point de fonctionnement, sur l’installation." },
    { reseau: "HydroMétro", titre: "Bitube", href: "../../../hydrometro/stations/bitube/index.html", pourquoi: "Le réseau départ et retour séparés qui alimente les radiateurs." },
    { reseau: "HydroMétro", titre: "Monotube", href: "../../../hydrometro/stations/monotube/index.html", pourquoi: "L’autre façon de raccorder les radiateurs, en série sur une boucle." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : dimensionner le réseau qui porte l’eau chaude de la pompe à chaleur aux radiateurs. La station H1 a donné le débit de chaque radiateur. Pour chaque tronçon du réseau, vous choisissez un tube d’après la vitesse de l’eau, puis vous calculez la perte de charge. Le circuit le plus défavorisé donne ce que la pompe doit fournir. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Ligne du tableau, pour chaque tronçon", "Unité"], [
        ["Débit", "L/h"],
        ["Tube choisi et vitesse de l’eau", "m/s"],
        ["Perte de charge linéaire, dans les tubes", "Pa"],
        ["Perte de charge singulière, aux coudes, robinets, radiateurs", "Pa"],
        ["Perte de charge du tronçon", "Pa"],
        ["Circuit le plus défavorisé, hauteur manométrique", "kPa, m"]
      ], "Le tableau du réseau, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "le réseau de chauffage de la maison."], ["Le dossier :", "les débits (H1), le tracé, les longueurs, les singularités."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "tube, vitesse et perte de charge de chaque tronçon."], ["Le résultat :", "le circuit le plus défavorisé, la note de calcul. Fourchette de ± 3 % à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station H4, la pompe, le vase, la soupape."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Le débit de chaque radiateur et le régime d’eau viennent de la station H1 ; le nombre de radiateurs par pièce, de la station H2. Le CCTP, page 4, place la pompe à chaleur air/eau dans le garage, sans dessiner le réseau. Le tracé, les longueurs et les singularités sont donc des données de l’exercice, écrites d’après les plans. La masse volumique de l’eau vient des règles Th-Bât, les vitesses maximales d’une fiche du Centre d’information du cuivre. La table des pertes linéaires et les ζ sont des données de l’exercice.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Débit de chaque radiateur, régime d’eau", "Station H1"],
        ["Nombre de radiateurs par pièce", "Station H2"],
        ["Pompe à chaleur au garage, radiateurs", "Page 4 du CCTP"],
        ["Tracé, longueurs, singularités, pompe à chaleur", "La commande de cette station, données de l’exercice"],
        ["Masse volumique de l’eau à 40 °C, 990 kg/m³", "Règles Th-Bât 2017, fascicule Matériaux, § 2.9.8, p. 29"],
        ["Tubes de cuivre et vitesses maximales", "Fiche pratique n° 22 du Centre d’information du cuivre et du CCCA-BTP, § 2"],
        ["Table des pertes linéaires, ζ des singularités", "Cette station, données de l’exercice"]
      ], "Les données du réseau")
        + BE.renvoi('Le débit de chaque radiateur se calcule à <a href="../h1-puissance-debit-regime/index.html">la station H1</a>.')
    }),

    BE.ecran({
      id: "trace", dossier: "methode", kicker: "La méthode, 1", title: "Le tracé du réseau", level: "comprendre",
      text: `Le réseau est bitube : un tube de départ porte l’eau chaude, un tube de retour la ramène. Dans le bâtiment d’exemple, la pompe à chaleur et sa pompe de circulation sont dans le local technique. Le tronçon commun mène l’eau à un collecteur ; de là, chaque radiateur a sa ligne, départ et retour. On numérote les tronçons sur le schéma : 1 pour le tronçon commun, puis une ligne par radiateur. La salle de réunion a deux radiateurs, donc deux lignes. Le schéma donne la longueur à l’aller ; le retour suit le même chemin, avec la même longueur.`,
      prompt: "Suivez l’eau sur le schéma, du départ au retour, puis continuez.",
      render: () => BE.schema("illustrations/schema-reseau-exemple.svg", `Schéma de principe du bâtiment d’exemple. En bas à gauche, la pompe à chaleur et la pompe de circulation. Le tronçon 1, départ en rouge et retour en bleu, ${T1().L} m, monte au collecteur du local technique. Du collecteur partent quatre lignes, chacune vers un radiateur : ${EX.reseau.slice(1).map(t => `${t.n}, ${t.nom.replace("Ligne ", "")}, ${t.L} m`).join(" ; ")}.`, "Un tronçon commun, un collecteur, une ligne par radiateur.")
        + tableau(["N°", "Tronçon", "Longueur à l’aller (m)", "Longueur aller-retour (m)"], EX.reseau.map(t => [t.n, t.nom, t.L, t.LAR]), "Les tronçons du bâtiment d’exemple")
        + BE.alerte("<strong>Piège.</strong> Compter la longueur à l’aller seulement : l’eau fait l’aller et le retour, la perte de charge aussi.")
    }),

    BE.ecran({
      id: "debits", dossier: "methode", kicker: "La méthode, 2", title: "Le débit de chaque tronçon", level: "comprendre",
      text: `Une ligne porte le débit de son radiateur, donné par la station H1. Un tronçon qui alimente plusieurs radiateurs porte la somme de leurs débits. Dans le bâtiment d’exemple, la salle de réunion demande ${EX.reseau[2].q} + ${EX.reseau[3].q} L/h, réparties sur ses deux radiateurs identiques : chaque ligne porte la moitié. Le tronçon commun porte tout le débit du circuit, ${T1().q} L/h. Contrôlez toujours : la somme des lignes d’un collecteur redonne le débit du tronçon qui l’alimente.`,
      prompt: "Faites la somme des lignes, puis continuez.",
      render: () => tableau(["N°", "Tronçon", "Débit (L/h)", "D’où vient-il"], EX.reseau.map((t, i) => [t.n, t.nom, t.q, i ? "station H1" : `somme : ${EX.reseau.slice(1).map(x => x.q).join(" + ")}`]), `Débits du bâtiment d’exemple, régime ${EX.reg.dep}/${EX.reg.ret}`)
    }),

    BE.ecran({
      id: "diametre-vitesse", dossier: "methode", kicker: "La méthode, 3", title: "Le diamètre et la vitesse", level: "comprendre",
      text: `Un tube de cuivre se désigne par son diamètre extérieur et son épaisseur : 12 × 1 a un diamètre intérieur de 10 mm. La vitesse de l’eau vaut débit ÷ section : en unités pratiques, v (m/s) = q (L/h) ÷ (3,6 × S), avec S en mm² ; on arrondit v au centième. Trop vite, l’eau fait du bruit et use le réseau. La fiche n° 22 du Centre d’information du cuivre donne des vitesses maximales en chauffage : 0,50 m/s en 14 × 1, 0,60 en 18 × 1, 0,80 en 25 × 1. Les autres tubes de l’exercice prennent celle du tube de la fiche juste au-dessus. On choisit le plus petit tube dont la vitesse ne dépasse pas sa vitesse maximale.`,
      prompt: "Lisez le tableau des tubes, le schéma et l’exemple résolu, puis continuez.",
      render: () => tubesTable()
        + BE.schema("illustrations/schema-vitesse.svg", `Trois cases reliées par des flèches. Débit de la ligne du bureau, ${BU().q} L/h. Divisé par 3,6 × S, en ${BU().tube}, S = ${BU().S} mm², égal à ${BU().v} m/s. Comparé à la vitesse maximale, ${BU().vmax} m/s : le ${BU().tube} suffit. Dessous : tronçon commun, ${T1().q} L/h, ${T1().tube}, ${T1().v} m/s.`, "Du débit à la vitesse, puis au tube.")
        + exempleVitesse()
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, le tube", title: "Exercice : le tube et la vitesse", level: "appliquer", requiresAction: true,
      text: {
        1: `Une ligne de radiateur porte ${EX.ex1.q} L/h. Avec les tubes de l’exercice, choisissez le tube et calculez la vitesse. L’exemple résolu reste sous vos yeux : refaites le même geste.`,
        2: `Une ligne de radiateur porte ${EX.ex1.q} L/h. Choisissez le tube de l’exercice et sa vitesse, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le tube et la vitesse, en vous aidant de l’exemple.", 2: "Choisissez le tube et la vitesse. Cette question est à faire seul." },
      aides: {
        1: ["Le débit est dans l’énoncé, le tableau des tubes à l’écran « Le diamètre et la vitesse ».", "Essayez le 12 × 1 : q ÷ (3,6 × S). Si la vitesse dépasse 0,50 m/s, passez au tube suivant.", `Sur l’exemple : ${BU().q} ÷ (3,6 × ${BU().S}) = ${BU().v} m/s. Faites le même calcul avec ${EX.ex1.q} L/h.`],
        2: ["La méthode est à l’écran « Le diamètre et la vitesse ».", "Le plus petit tube d’abord, puis le suivant si la vitesse est trop forte.", `En 12 × 1 : ${EX.ex1.q} ÷ (3,6 × 78,5).`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleVitesse(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),

    BE.ecran({
      id: "pertes-lineaires", dossier: "methode", kicker: "La méthode, 4", title: "Les pertes de charge linéaires", level: "comprendre",
      text: `En frottant sur la paroi du tube, l’eau perd de la pression tout au long du chemin : c’est la perte de charge linéaire. On la donne par mètre de tube, R, en Pa/m. La station donne R à 100 L/h pour chaque tube ; à un autre débit, R = R à 100 L/h × (q ÷ 100) puissance ${EX.exposant}. La perte linéaire du tronçon vaut R × longueur aller-retour. On arrondit R et la perte linéaire à l’unité. Doubler le débit multiplie R par 3,4 : un tube trop fin coûte vite cher en pression.`,
      prompt: "Lisez la courbe et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-lineaire.svg", `Courbe de R en fonction du débit, de 0 à 200 L/h, pour le 12 × 1 et le 14 × 1. Les deux courbes montent de plus en plus vite. En 12 × 1, R vaut ${EX.tubes[0].R100} Pa/m à 100 L/h et environ 3,4 fois plus à 200 L/h. Le 14 × 1 reste bien en dessous.`, "R croît plus vite que le débit.")
        + exempleLineaire()
        + BE.alerte("<strong>Piège.</strong> Multiplier R à 100 L/h par q ÷ 100 sans la puissance 1,75 : la perte est sous-estimée dès que le débit dépasse 100 L/h.")
    }),

    BE.ecran({
      id: "table-r", dossier: "methode", kicker: "La méthode, 5", title: "D’où vient la table des R", level: "comprendre",
      text: `La table de l’exercice est calculée par la formule de Darcy-Weisbach : R = λ ÷ d × ρv² ÷ 2, avec d le diamètre intérieur en mètres. Le coefficient de frottement λ dépend du nombre de Reynolds, Re = v × d ÷ ν. Pour un tube lisse comme le cuivre, la loi de Blasius donne λ = 0,3164 ÷ Re puissance 0,25 : R varie alors comme le débit puissance 1,75. La viscosité ν de l’eau vers 40 °C, ${EX.nu} mm²/s, est une donnée de l’exercice ; ρ = 990 kg/m³ vient des règles Th-Bât. Un logiciel de bureau d’études fait ce calcul pour chaque tronçon.`,
      prompt: "Suivez le calcul de R à 100 L/h en 14 × 1, puis continuez.",
      render: () => tableau(["Ligne", "Calcul", "Résultat"], [
        ["Vitesse à 100 L/h", `100 ÷ 3 600 000 m³/s ÷ ${EX.re.Sm2} m² (section intérieure ${EX.re.S} mm², diamètre intérieur ${EX.re.d} mm)`, `${EX.re.v} m/s`],
        ["Nombre de Reynolds", `${EX.re.v} × ${EX.re.dm} ÷ ${EX.re.nu}`, EX.re.Re],
        ["Coefficient de frottement", `0,3164 ÷ ${EX.re.Re} puissance 0,25`, EX.re.lambda],
        ["R à 100 L/h", `${EX.re.lambda} ÷ ${EX.re.dm} × 990 × ${EX.re.v}² ÷ 2`, `${EX.re.R} Pa/m`]
      ], `Le R à 100 L/h du ${EX.re.tube} : chaque ligne reprend le résultat affiché de la ligne d’avant`)
        + BE.renvoi("Aux très petits débits, l’eau coule sans tourbillons et la loi de Blasius surestime un peu R : l’erreur reste du côté de la sécurité.")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, la perte linéaire", title: "Exercice : la perte de charge linéaire", level: "appliquer", requiresAction: true,
      text: {
        1: `Une ligne en ${EX.ex2.tube} porte ${EX.ex2.q} L/h sur ${EX.ex2.L} m à l’aller. Calculez R, puis la perte linéaire de la ligne. L’exemple résolu reste sous vos yeux.`,
        2: `Une ligne en ${EX.ex2.tube} porte ${EX.ex2.q} L/h sur ${EX.ex2.L} m à l’aller. Calculez sa perte linéaire, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la perte linéaire, en vous aidant de l’exemple.", 2: "Choisissez la perte linéaire. Cette question est à faire seul." },
      aides: {
        1: [`R à 100 L/h du ${EX.ex2.tube} est dans le tableau des tubes, à l’écran « Le diamètre et la vitesse ».`, "R = R à 100 L/h × (q ÷ 100) puissance 1,75, puis R × longueur aller-retour.", `Sur l’exemple : ${EX.tubes[0].R100} × (${BU().q} ÷ 100) puissance 1,75 = ${BU().R} Pa/m. Ici, R à 100 L/h vaut ${EX.ex2.R100} Pa/m.`],
        2: ["La méthode est à l’écran « Les pertes de charge linéaires ».", "R d’abord, la longueur aller-retour ensuite.", `R à 100 L/h du ${EX.ex2.tube} : ${EX.ex2.R100} Pa/m.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleLineaire(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "pertes-singulieres", dossier: "methode", kicker: "La méthode, 6", title: "Les pertes de charge singulières", level: "comprendre",
      text: `Chaque coude, té, vanne, robinet ou radiateur trouble l’écoulement : l’eau y perd de la pression d’un coup. On l’écrit Z = Σζ × ρv²/2, où ρv²/2 est la pression dynamique, en pascals, et ζ un coefficient propre à chaque singularité. On calcule ρv²/2 avec v au centième et on l’arrondit au dixième ; on arrondit Z à l’unité. On compte les singularités à l’aller et au retour ensemble. Une ligne de radiateur en a toujours cinq fixes : deux piquages de collecteur, le robinet thermostatique, le radiateur, le té de réglage, soit ${EX.zLigne}, plus ses coudes. Les ζ de l’exercice sont dans le tableau.`,
      prompt: "Lisez le schéma, le tableau et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-singularites.svg", `Une ligne de radiateur. À gauche, le collecteur. Le départ, en rouge, sort par un piquage (1,5), passe le robinet thermostatique (8,0) et entre dans le radiateur (2,5). Le retour, en bleu, sort du radiateur, passe un coude (1,0) et le té de réglage (2,0), et rentre au collecteur par un piquage (1,5). Total des singularités fixes : ${EX.zLigne}, plus 1,0 par coude.`, "Les singularités d’une ligne de radiateur et leur ζ.")
        + tableau(["Singularité", "ζ"], EX.zeta.map(z => [z.nom, z.z]), "Coefficients ζ de l’exercice")
        + exempleSing()
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, la perte singulière", title: "Exercice : la perte de charge singulière", level: "appliquer", requiresAction: true,
      text: {
        1: `Une ligne de radiateur en ${EX.ex3.tube} porte ${EX.ex3.q} L/h ; elle compte ${EX.ex3.coudes} coudes. Calculez la vitesse, Σζ, ρv²/2 puis la perte singulière Z. L’exemple résolu reste sous vos yeux.`,
        2: `Une ligne de radiateur en ${EX.ex3.tube} porte ${EX.ex3.q} L/h ; elle compte ${EX.ex3.coudes} coudes. Calculez sa perte singulière, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la perte singulière, en vous aidant de l’exemple.", 2: "Choisissez la perte singulière. Cette question est à faire seul." },
      aides: {
        1: ["Les ζ sont à l’écran « Les pertes de charge singulières », la section du tube à l’écran « Le diamètre et la vitesse ».", `Quatre lignes : v = q ÷ (3,6 × S) au centième ; Σζ = ${EX.zLigne} + coudes ; ρv²/2 avec ρ = 990 ; Z = Σζ × ρv²/2.`, `Sur l’exemple : Σζ = ${BU().sz}, ρv²/2 = ${BU().pd} Pa, Z = ${BU().Z} Pa.`],
        2: ["La méthode est à l’écran « Les pertes de charge singulières ».", "La vitesse, puis Σζ, puis la pression dynamique.", `La vitesse vaut ${EX.ex3.v} m/s.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleSing(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "circuit", dossier: "methode", kicker: "La méthode, 7", title: "Le circuit d’un émetteur", level: "comprendre",
      text: `La perte d’un tronçon est la somme de sa perte linéaire et de sa perte singulière. L’eau qui va au radiateur du bureau traverse le tronçon commun 1, puis la ligne 2 : la perte de son circuit vaut ${T1().dp} + ${BU().dp} = ${EX.circuits[0].dp} Pa. Le tableau donne chaque colonne pour les cinq tronçons du bâtiment d’exemple. La feuille réponse reprend les mêmes colonnes. Quand un té partage le tronçon commun entre plusieurs collecteurs, chaque collecteur a sa branche, et le circuit d’un radiateur additionne le tronçon commun, la branche de son collecteur et sa ligne. Exemple, pour un radiateur de l’étage : circuit = tronçon commun + branche de l’étage + ligne du radiateur.`,
      prompt: "Suivez une ligne du tableau de gauche à droite, puis continuez.",
      render: () => tableau(["N°", "q (L/h)", "Tube", "v (m/s)", "R (Pa/m)", "L aller-retour (m)", "Linéaire (Pa)", "Σζ", "ρv²/2 (Pa)", "Z (Pa)", "Total (Pa)"],
        EX.reseau.map(t => [t.n, t.q, t.tube, t.v, t.R, t.LAR, t.lin, t.sz, t.pd, t.Z, t.dp]), `Pertes de charge du bâtiment d’exemple, régime ${EX.reg.dep}/${EX.reg.ret}`)
        + tableau(["Circuit du radiateur", "Tronçons", "Perte (Pa)"], EX.circuits.map(c => [c.nom, c.troncons, c.dp]), "Un circuit par radiateur")
    }),

    BE.ecran({
      id: "plus-defavorise", dossier: "methode", kicker: "La méthode, 8", title: "Le circuit le plus défavorisé", level: "comprendre",
      text: `La pompe pousse l’eau dans tous les circuits à la fois. Elle doit fournir au moins la perte du circuit le plus défavorisé : celui qui a la plus grande perte de charge. Les autres circuits perdent moins ; on les freinera au réglage pour que chaque radiateur reçoive son débit (station H5). Dans le bâtiment d’exemple, la ligne la plus longue est celle de la ${EX.longue.nom}, ${EX.longue.L} m ; pourtant le circuit du ${EX.pire.nom} perd plus, ${EX.pire.dp} Pa : son débit est plus fort dans le même tube. La perte d’un circuit se donne aussi en kilopascals, au centième : 1 kPa = 1 000 Pa, donc ${EX.pire.dp} Pa ÷ 1 000 = ${EX.pire.kPa} kPa.`,
      prompt: "Repérez le circuit surligné sur le schéma, puis continuez.",
      render: () => BE.schema("illustrations/schema-defavorise-exemple.svg", `Le même schéma du bâtiment d’exemple, avec le circuit du ${EX.pire.nom} surligné en orange : tronçon commun 1 et ligne 2. Sa perte, ${EX.pire.dp} Pa, est la plus grande des quatre circuits.`, "Le circuit le plus défavorisé n’est pas forcément le plus long.")
        + BE.alerte(`<strong>Piège.</strong> Prendre la ligne la plus longue sans calculer : ici, le circuit de la ${EX.longue.nom} perd ${EX.longue.dp} Pa, moins que celui du ${EX.pire.nom}.`)
    }),

    BE.ecran({
      id: "hauteur", dossier: "methode", kicker: "La méthode, 9", title: "La hauteur manométrique", level: "comprendre",
      text: `La pompe doit vaincre le circuit le plus défavorisé et la perte de charge du générateur, donnée par son fabricant : ${EX.hmt.pac} Pa pour la pompe à chaleur du bâtiment d’exemple, donnée de l’exercice. Les pompes se choisissent en hauteur manométrique, en mètres de colonne d’eau : H = perte totale (Pa) ÷ (ρ × g), avec g = 9,81 m/s². On l’écrit au centième, avec le débit du circuit : la station H4 place ce point sur la courbe de la pompe.`,
      prompt: "Suivez les trois cases du schéma, puis continuez.",
      render: () => BE.schema("illustrations/schema-hmt.svg", `Trois cases reliées par des flèches. Circuit le plus défavorisé, le ${EX.pire.nom}, ${EX.pire.dp} Pa. Plus la pompe à chaleur, ${EX.hmt.pac} Pa, égal ${EX.hmt.total} Pa. Divisé par ρ × g, 990 × 9,81, égal ${EX.hmt.m} m. Dessous : au débit du circuit, ${T1().q} L/h.`, "De la perte du circuit à la hauteur de la pompe.")
        + BE.exemple({ text: `Bâtiment d’exemple : circuit du ${EX.pire.nom} ${EX.pire.dp} Pa, pompe à chaleur ${EX.hmt.pac} Pa`, answer: `${EX.pire.dp} + ${EX.hmt.pac} = ${EX.hmt.total} Pa, soit ${EX.hmt.kPa} kPa ; H = ${EX.hmt.total} ÷ (990 × 9,81) = ${EX.hmt.m} m à ${T1().q} L/h`, why: "La pompe fait circuler l’eau dans le générateur aussi : sa perte s’ajoute à celle du réseau." })
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 10", title: "La note de calcul du réseau", level: "comprendre",
      text: "La note de calcul donne à un lecteur de quoi refaire le dimensionnement : l’objet, les données avec leur source, les hypothèses et la méthode, les résultats. Le tracé, les longueurs, les ζ et la table des R sont des hypothèses : elles s’écrivent comme telles. La note du bâtiment d’exemple tient en quatre lignes, une par rubrique. Les feuilles réponse reprennent les mêmes rubriques ; le niveau 1 laisse l’objet, déjà écrit dans la commande.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Réseau de chauffage bitube à collecteur, petit bâtiment de bureaux de plain-pied, cinq radiateurs, pompe à chaleur"],
        ["Données et sources", "Débits des radiateurs : station H1 ; deux radiateurs en salle de réunion : station H2 ; ρ = 990 kg/m³ : Th-Bât ; vitesses maximales : fiche du cuivre"],
        ["Hypothèses et méthode", `Régime ${EX.reg.dep}/${EX.reg.ret} ; tracé, table R, ζ et pompe à chaleur ${EX.hmt.pac} Pa de l’exercice ; longueurs aller-retour ; v = q ÷ (3,6 × S) ; R = R100 × (q ÷ 100) puissance 1,75 ; Z = Σζ × ρv²/2`],
        ["Résultats", `Tronçon commun ${T1().tube}, lignes ${BU().tube} ; circuit le plus défavorisé : ${EX.pire.nom}, ${EX.pire.kPa} kPa ; hauteur manométrique ${EX.hmt.m} m à ${T1().q} L/h, pour choisir la pompe à la station H4`]
      ], "Première page de la note de calcul, bâtiment d’exemple")
        + BE.renvoi("La note complète du projet s’assemble à la station R5, « La note de calcul ».")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

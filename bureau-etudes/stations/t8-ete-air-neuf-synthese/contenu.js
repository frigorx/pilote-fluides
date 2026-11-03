/* Station BE-T8 : Été 3, l'air neuf et la synthèse.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5, T6 et T7 (salle de réunion et sanitaires résolus à l'écran ; le bureau est
   la commande du niveau 1), puis commande du niveau 2 sur la maison. Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc
   FOURCHETTES) sont écrites par outils/stations/t8-ete-air-neuf-synthese/construire.mjs : le premier vient de exemple-data.mjs, les secondes de
   exemple-data.mjs (niveau 1) et de corriges/t8-ete-air-neuf-synthese/reference-synthese.json (niveau 2, outils/t8-synthese-maison.mjs), tolérance 3 % (2 % pour la puissance du bureau, n1-p).
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes et les données de la commande le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "te": "32",
 "hre": "40",
 "ti": "26",
 "hri": "50",
 "dT": "6",
 "ext": {
  "x": "11,9",
  "h": "63"
 },
 "int": {
  "x": "10,5",
  "h": "53"
 },
 "dx": "1,4",
 "dh": "10",
 "coef": "0,34",
 "rho": "1,2",
 "cp": "1,006",
 "cpEq": "0,335",
 "lv": "2 501",
 "actS": "70",
 "actL": "50",
 "heures": [
  "8",
  "10",
  "12",
  "14",
  "16"
 ],
 "h7": "16",
 "locaux": [
  {
   "nom": "Salle de réunion",
   "n": "8",
   "qv": "70",
   "qm": "0,0233",
   "anS": "143",
   "anL": "82",
   "anSomme": "225",
   "anEnth": "233",
   "soleil": [
    "371",
    "684",
    "799",
    "1404",
    "1487"
   ],
   "parois": "307",
   "internes": "1057",
   "latT7": "400",
   "latent": "482",
   "sens": [
    "1878",
    "2191",
    "2306",
    "2911",
    "2994"
   ],
   "tot": [
    "2360",
    "2673",
    "2788",
    "3393",
    "3476"
   ],
   "pointe": "16",
   "maxT": "3476"
  },
  {
   "nom": "Sanitaires",
   "n": "0",
   "qv": "0",
   "qm": "0,0000",
   "anS": "0",
   "anL": "0",
   "anSomme": "0",
   "anEnth": "0",
   "soleil": [
    "197",
    "146",
    "41",
    "38",
    "30"
   ],
   "parois": "54",
   "internes": "50",
   "latT7": "0",
   "latent": "0",
   "sens": [
    "301",
    "250",
    "145",
    "142",
    "134"
   ],
   "tot": [
    "301",
    "250",
    "145",
    "142",
    "134"
   ],
   "pointe": "8",
   "maxT": "301"
  }
 ],
 "reuEcart": "3,6",
 "bat": {
  "soleil": [
   "647",
   "931",
   "948",
   "1543",
   "1596"
  ],
  "sens": [
   "3105",
   "3389",
   "3406",
   "4001",
   "4054"
  ],
  "lat": "629",
  "tot": [
   "3734",
   "4018",
   "4035",
   "4630",
   "4683"
  ],
  "pointe": "16",
  "maxSomme": "4683",
  "sansS": "4250",
  "sansT": "4879",
  "corrS": "140",
  "corrL": "100",
  "comptes": "10",
  "max": "8",
  "avecS": "3914",
  "avecL": "529",
  "avecT": "4443",
  "partS": "88",
  "Cs": "0,91",
  "PkW": "4,5"
 },
 "n1": {
  "qv": "40",
  "soleil": [
   "79",
   "101",
   "108",
   "101",
   "79"
  ],
  "parois": "172",
  "internes": "593",
  "latT7": "100"
 },
 "ex1": {
  "qv": "120",
  "quiz": {
   "choices": [
    "Sensible 385 W ; latent 0 W",
    "Sensible 1306 W ; latent 140 W",
    "Sensible 245 W ; latent 140 W",
    "Sensible 245 W ; latent 1190 W"
   ],
   "good": 2,
   "explain": "Sensible : 0,34 × 120 × 6 = 245 W. Latent : qm = 1,2 × 120 ÷ 3 600 = 0,0400 kg/s, Δx = 11,9 − 10,5 = 1,4 g/kg, 0,0400 × 1,4 × 2 501 = 140 W. A met le latent dans le sensible, B prend θe au lieu de l’écart, D prend le x du dehors au lieu de Δx."
  }
 },
 "ex2": {
  "qv": "200",
  "ext": {
   "t": "35",
   "hr": "40"
  },
  "int": {
   "t": "26",
   "hr": "50"
  },
  "quiz": {
   "choices": [
    "Δh ≈ 18 kJ/kg ; Φ ≈ 1200 W",
    "Δh ≈ 9 kJ/kg ; Φ ≈ 600 W",
    "Δh ≈ 18 kJ/kg ; Φ ≈ 1000 W",
    "Δh ≈ 71 kJ/kg ; Φ ≈ 4740 W"
   ],
   "good": 0,
   "explain": "Lectures : h ≈ 71 kJ/kg au point P, h ≈ 53 kJ/kg au point I, Δh ≈ 18 kJ/kg. qm = 1,2 × 200 ÷ 3 600 = 0,0667 kg/s ; Φ = 0,0667 × 18 × 1 000 ≈ 1200 W, à ± 5 % selon la lecture. B prend l’écart des températures pour Δh, C oublie la masse volumique dans qm, D prend le h du dehors seul. Pour comparer, le sensible seul vaut 0,34 × 200 × 9 = 612 W."
  }
 },
 "ex3": {
  "A": {
   "nom": "Bureau est",
   "soleil": [
    "900",
    "700",
    "200",
    "150",
    "120"
   ]
  },
  "B": {
   "nom": "Bureau ouest",
   "soleil": [
    "120",
    "150",
    "200",
    "700",
    "900"
   ]
  },
  "sens": "500",
  "lat": "100",
  "quiz": {
   "choices": [
    "Somme des maximums 3000 W ; maximum de la somme 3000 W",
    "Somme des maximums 2220 W ; maximum de la somme 2220 W",
    "Somme des maximums 3000 W ; maximum de la somme 1600 W",
    "Somme des maximums 3000 W ; maximum de la somme 2220 W"
   ],
   "good": 3,
   "explain": "Chaque bureau atteint 1500 W à sa pointe : somme des maximums 1500 + 1500 = 3000 W. Heure par heure, la somme vaut 2220 W à 8 h, 2050 W à 10 h, 1600 W à 12 h, 2050 W à 14 h, 2220 W à 16 h : maximum 2220 W. Cs = 2220 ÷ 3000 = 0,74. A croit que les deux pointes arrivent ensemble, B prend la même valeur deux fois, C prend la plus petite somme."
  }
 },
 "maison": {
  "h": "10",
  "te": "33",
  "hre": "40",
  "ti": "26",
  "hri": "50",
  "famille": "4"
 }
};
/*EXEMPLE-FIN*/

const REU = EX.locaux[0], SAN = EX.locaux[1], B = EX.bat, H = EX.heures;
const iP = H.indexOf(B.pointe), iR = H.indexOf(REU.pointe);
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const tableauPoints = () => tableau(["Point", "θ (°C)", "HR (%)", "x (g/kg)", "h (kJ/kg)"], [["E, air extérieur d’été", EX.te, EX.hre, EX.ext.x, EX.ext.h], ["I, air intérieur", EX.ti, EX.hri, EX.int.x, EX.int.h]], "Bâtiment d’exemple : les deux airs, lus sur le diagramme de la station A1");
const exempleSens = () => BE.exemple({ text: `Salle de réunion d’exemple : ${REU.qv} m³/h d’air neuf, θe = ${EX.te} °C, θi = ${EX.ti} °C`, answer: `Φs = ${EX.coef} × ${REU.qv} × (${EX.te} − ${EX.ti}) = ${EX.coef} × ${REU.qv} × ${EX.dT} = ${REU.anS} W`, why: "Le débit en m³/h, l’écart en K, le résultat au watt. C’est la formule des déperditions par l’air de la station T4, avec l’écart d’été." });
const exempleLat = () => BE.exemple({ text: `Même salle, même débit : x = ${EX.ext.x} g/kg dehors, ${EX.int.x} g/kg dedans`, answer: `qm = ${EX.rho} × ${REU.qv} ÷ 3 600 = ${REU.qm} kg/s ; Δx = ${EX.ext.x} − ${EX.int.x} = ${EX.dx} g/kg ; Φl = ${REU.qm} × ${EX.dx} × ${EX.lv} = ${REU.anL} W`, why: "qm au dix-millième de kg/s, Δx au dixième de g/kg, Φl au watt. Le latent s’écrit dans sa propre colonne." });
const exempleEnth = () => BE.exemple({ text: `Même salle : h = ${EX.ext.h} kJ/kg dehors, ${EX.int.h} kJ/kg dedans`, answer: `Φ = qm × Δh × 1 000 = ${REU.qm} × (${EX.ext.h} − ${EX.int.h}) × 1 000 = ${REU.qm} × ${EX.dh} × 1 000 = ${REU.anEnth} W ; par la somme : ${REU.anS} + ${REU.anL} = ${REU.anSomme} W ; écart (${REU.anEnth} − ${REU.anSomme}) ÷ ${REU.anSomme} = ${EX.reuEcart} %`, why: "Les deux lectures donnent le même ordre de grandeur. La somme sensible plus latent sert au bilan ; la lecture par les enthalpies la contrôle." });
const lignePostes = (l, i) => [l.nom, l.soleil[i], l.parois, l.internes, l.anS, l.sens[i], l.latent, l.tot[i]];
const tableauPostes = () => tableau(["Local", "Soleil (W)", "Parois (W)", "Internes (W)", "Air neuf (W)", "Sensible (W)", "Latent (W)", "Total (W)"], [REU, SAN].map(l => lignePostes(l, iR)), `Bâtiment d’exemple à ${REU.pointe} h solaires : les quatre postes, en W`);
const tableauHeures = () => tableau(["Heure solaire", ...H.map(h => `${h} h`)], [["Soleil du bâtiment (W)", ...B.soleil], ["Sensible (W)", ...B.sens], ["Latent (W)", ...H.map(() => B.lat)], ["Total (W)", ...B.tot]], "Bâtiment d’exemple : la somme des trois locaux, bureau du niveau 1 compris, heure par heure");
const ex3Table = () => tableau(["Local", ...H.map(h => `${h} h`)], [[`${EX.ex3.A.nom}, soleil (W)`, ...EX.ex3.A.soleil], [`${EX.ex3.B.nom}, soleil (W)`, ...EX.ex3.B.soleil]], `Chaque bureau : parois et internes ${EX.ex3.sens} W, latent ${EX.ex3.lat} W, à toute heure`);

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Toutes les données du bureau sont dans la commande ci-dessus et sur la feuille : son débit d’air neuf, le soleil de sa fenêtre à chaque heure, ses parois et ses apports internes. Les deux airs sont au tableau de l’écran « L’air neuf apporte de l’eau ».",
      "Exercice 1 de la feuille : 0,34 × qv × écart pour le sensible, puis qm × Δx × 2 501 pour le latent. Exercice 2 : une ligne par heure, le soleil change, le reste ne change pas. Exercice 3 : l’heure où le total est le plus grand.",
      `Sur l’exemple, la salle de réunion donne ${REU.anS} W et ${REU.anL} W d’air neuf, et son total le plus grand arrive à ${REU.pointe} h : ${REU.maxT} W. Le bureau n’a qu’une fenêtre au nord : son heure de pointe n’est pas celle de la salle.`
    ],
    2: [
      `Débit de base de chaque pièce principale : votre feuille de la station A2. Points C et D (x et h) : votre feuille de la station A1. Soleil de chaque pièce à chaque heure, somme de la maison par heure : station T6. Sensible et latent de chaque pièce : station T7. Famille de ${EX.maison.famille} personnes : station E2.`,
      "Air neuf : le débit de base, pas le débit de pointe, qui ne dure que le temps de la cuisine ou de la douche. Seules les pièces principales reçoivent l’air du dehors ; l’entrée, le WC, le palier et la salle d’eau reçoivent l’air qui a traversé la maison, déjà à 26 °C. Pour chaque pièce, le total à 10 h, puis le total à sa propre heure de pointe (station T6) : la somme de ces maximums est la puissance sans simultanéité.",
      `Machine : la somme de la maison heure par heure, l’heure du plus grand total, puis les occupants comptés une fois (la station T7 a compté chaque pièce pleine). Sur l’exemple : ${B.sansT} W sans simultanéité, ${B.avecT} W avec, Cs = ${B.Cs}.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensDossier = () => BE.liens([
  { href: DOSSIER + "plans-maison.pdf", title: "Les plans de la maison", note: "Pièces et orientations" },
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Page 4 : ventilation et pas de climatisation" }
]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensDossier(); };

BE.station({
  code: "BE-T8",
  titre: "Été 3 : la synthèse",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bureau du bâtiment d’exemple, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison entière, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "L’air neuf entre chaud et humide en été : il apporte de la chaleur sensible et de la chaleur latente. Vous les calculez avec le diagramme de l’air humide, puis vous additionnez les quatre postes du bilan d’été, heure par heure, local par local. Vous obtenez la puissance frigorifique de chaque local et celle de la machine, en tenant compte de ce qui n’arrive pas en même temps.",
  note: "Les conditions d’air de l’exemple, la règle de simultanéité et les apports gardés constants sur la journée sont des données de l’exercice. Le coefficient 0,34 vient des règles Th-Bât ; les formules de l’air humide, de la station A1.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, plans et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Air neuf et puissance frigorifique du bureau du bâtiment d’exemple",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études termine le bilan d’été du petit bâtiment de bureaux d’exemple. Les écrans ont traité la salle de réunion et les sanitaires ; il reste le bureau. Données : air neuf du bureau ${EX.n1.qv} m³/h ; air extérieur ${EX.te} °C à ${EX.hre} % (x = ${EX.ext.x} g/kg, h = ${EX.ext.h} kJ/kg) ; air intérieur ${EX.ti} °C à ${EX.hri} % (x = ${EX.int.x} g/kg, h = ${EX.int.h} kJ/kg). Soleil de la fenêtre nord Fa (station T6, exemple), en W : ${H.map((h, i) => `${h} h ${EX.n1.soleil[i]}`).join(", ")}. Parois ${EX.n1.parois} W, apports internes ${EX.n1.internes} W sensible et ${EX.n1.latT7} W latent (station T7, exemple), gardés à toute heure. Suivez les étapes dans l’ordre.`,
        "Étape 1, exercice 1 de la feuille. L’air neuf du bureau : sensible, puis latent, puis la seconde lecture par les enthalpies et son écart.",
        "Étape 2, exercice 2 de la feuille. Le tableau du bureau heure par heure : soleil, parois, internes, air neuf, sensible, latent, total.",
        "Étape 3, exercice 3 de la feuille. L’heure de pointe du bureau, sa puissance frigorifique, la part sensible et les trois lignes de la note. Vérifiez vos trois résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Données du bureau", ou: "Cette commande, reprise sur la feuille" },
        { piece: "Les deux airs et leurs lectures", ou: "Écran « L’air neuf apporte de l’eau » et diagramme de la station A1" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Synthèse du bilan d’été de la maison : air neuf, puissance par pièce et puissance de la machine",
      delai: "Rendu en fin de séance",
      commande: `Le CCTP ne prévoit pas de climatisation (page 4) : le bureau d’études chiffre ce qu’une machine devrait retirer pour tenir ${EX.maison.ti} °C. Il vous demande la synthèse du bilan d’été. Air extérieur : ${EX.maison.te} °C à ${EX.maison.hre} % (station E1) ; air intérieur : ${EX.maison.ti} °C à ${EX.maison.hri} % (stations E2 et A1) ; x et h des deux airs : votre feuille de la station A1. Air neuf : le débit de base de chaque pièce principale, station A2 ; c’est le débit qui tourne toute la journée, le débit de pointe ne dure que le temps de la cuisine ou de la douche. Données de l’exercice fixées par le bureau d’études : les parois, les apports internes et l’air neuf gardent leur valeur de ${EX.maison.h} h toute la journée ; la famille compte ${EX.maison.famille} personnes. Établissez l’air neuf des pièces principales (sensible, latent et seconde lecture), le tableau des huit pièces à ${EX.maison.h} h et à leur propre heure de pointe, la somme de la maison heure par heure, la puissance sans et avec simultanéité, le coefficient de simultanéité, la part sensible, puis rendez la première page de la note de calcul, avec la source de chaque donnée.`,
      pieces: [
        { piece: "Vos feuilles des stations T6, T7, A1, A2 et E2", ou: "Soleil par pièce et par heure ; sensible et latent par pièce ; points C et D ; débits de base ; famille" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : ventilation, et pas de climatisation" },
        { piece: "Conditions et hypothèses", ou: "Cette commande, données de l’exercice" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-ans", libelle: "Apport sensible de l’air neuf du bureau", unite: "W", min: 79, max: 85, indice: "Relisez l’écran « L’air neuf en été : le sensible » : 0,34 × qv × (θe − θi), avec l’écart des températures, au watt." },
      { id: "n1-anl", libelle: "Apport latent de l’air neuf du bureau", unite: "W", min: 45, max: 49, indice: "Relisez l’écran « L’air neuf apporte de l’eau » : qm = 1,2 × qv ÷ 3 600 au dix-millième, Δx = x dehors − x dedans, puis qm × Δx × 2 501." },
      { id: "n1-p", libelle: "Puissance frigorifique du bureau à son heure de pointe, sensible et latent", unite: "W", min: 1079, max: 1125, indice: "Relisez l’écran « La somme heure par heure » : une ligne par heure, soleil + parois + internes + air neuf + latent, puis le plus grand total. Le bureau a sa propre heure de pointe." }
    ],
    2: [
      { id: "n2-sans", libelle: "Puissance frigorifique sans simultanéité, somme des maximums des pièces", unite: "W", min: 7860, max: 8348, indice: "Relisez l’écran « La simultanéité » : pour chaque pièce, son plus grand total, à sa propre heure de pointe (station T6), puis la somme des huit pièces." },
      { id: "n2-avec", libelle: "Puissance frigorifique de la machine, avec simultanéité", unite: "W", min: 6589, max: 6997, indice: "Relisez l’écran « La simultanéité » : la somme de la maison heure par heure, le plus grand total, puis les occupants comptés une seule fois." },
      { id: "n2-lat", libelle: "Latent de la machine, avec simultanéité", unite: "W", min: 346, max: 368, indice: "Latent de la machine : occupants (station T7) et air neuf des pièces principales, puis les personnes comptées en trop retirées." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T9", titre: "La machine", href: "../t9-machine-puissance-choix/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-T6, Été 1 : le soleil", href: "../t6-ete-vitrages-soleil/index.html", pourquoi: "Le soleil de chaque pièce, heure par heure, et la différence entre la pointe et la somme des maximums viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-T7, Été 2 : apports internes", href: "../t7-ete-apports-internes/index.html", pourquoi: "Les parois et les apports internes de chaque pièce, sensible et latent, viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-A1, L’air humide", href: "../a1-air-humide/index.html", pourquoi: "Le diagramme, les points de l’air d’été et les formules de x et de h viennent de cette station." },
    { reseau: "AéroRézo", titre: "Air neuf et sélection", href: "../../../aerorezo/stations/air-neuf-selection/index.html", pourquoi: "Vous y voyez pourquoi l’air extérieur doit être traité avant d’entrer." },
    { reseau: "Bureau d’études", titre: "BE-T9, La machine", href: "../t9-machine-puissance-choix/index.html", pourquoi: "La puissance trouvée ici sert à choisir la machine et à corriger sa puissance aux conditions du site." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : terminer le bilan d’été. Il manque l’air neuf, puis la somme. L’air neuf entre plus chaud et plus humide que l’air de la pièce : il apporte de la chaleur sensible et de la chaleur latente. Vous additionnez ensuite, local par local et heure par heure, le soleil des vitrages, les parois, les apports internes et l’air neuf. Vous en tirez la puissance frigorifique de chaque local et celle de la machine qui les sert tous. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Local", "Soleil", "Parois", "Internes", "Air neuf", "Sensible", "Latent", "Total"], [["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["Bâtiment", "", "", "", "", "", "", ""]], "Le tableau de la synthèse, vide (en W)")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "l’air neuf et la puissance frigorifique."], ["Le dossier :", "vos feuilles des stations T6, T7, A1, A2 et E2."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "les quatre postes de chaque local, heure par heure."], ["Le résultat :", "la puissance de chaque local et celle de la machine. Fourchette de ± 3 % à l’écran Vérifier (± 2 % pour la puissance du bureau)."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T9, le choix de la machine."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: `Tout vient des stations que vous avez faites. Le soleil des vitrages de chaque local, heure par heure, est à la station T6. Les parois et les apports internes, sensible et latent, sont à la station T7 : elle les a calculés à l’heure de pointe du soleil. Le débit d’air neuf de chaque local est à la station A2 pour la maison, à la station T5 pour le bâtiment d’exemple. Les deux airs, leur humidité absolue x et leur enthalpie h se lisent sur le diagramme de la station A1. Le coefficient 0,34 vient des règles Th-Bât, comme à la station T4. Le bureau d’études fixe deux hypothèses de l’exercice : les parois, les apports internes et l’air neuf gardent la même valeur toute la journée ; les occupants d’un bâtiment se comptent une seule fois pour la machine.`,
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Soleil des vitrages, par local et par heure", "Station T6"],
        ["Parois, apports internes, sensible et latent", "Station T7"],
        ["Débit d’air neuf de chaque local", "Station A2 (maison), station T5 (exemple)"],
        ["θ, HR, x et h de l’air dehors et dedans", "Stations E1 et E2, diagramme de la station A1"],
        ["Coefficient 0,34 Wh/(m³.K)", "Règles Th-Bât, Généralités, page 18 (station T4)"],
        ["Apports constants sur la journée, occupants comptés une fois", "La commande, données de l’exercice"]
      ], "Les données de la synthèse")
    }),

    BE.ecran({
      id: "air-neuf-sensible", dossier: "methode", kicker: "La méthode, 1", title: "L’air neuf en été : le sensible", level: "comprendre",
      text: `Un local reçoit de l’air neuf en permanence, par une entrée d’air ou une bouche de soufflage. En été, cet air entre à θe et doit être ramené à θi. La chaleur à lui retirer pour baisser sa température est l’apport sensible de l’air neuf : Φs = 0,34 × qv × (θe − θi), avec qv en m³/h. C’est la formule de la station T4, avec l’écart d’été. Le 0,34 vient de la masse volumique et de la capacité thermique de l’air : qm × cp × Δθ, avec qm = ${EX.rho} × qv ÷ 3 600 en kg/s et cp = ${EX.cp} kJ/(kg.K), donne ${EX.rho} × ${EX.cp} × 1 000 ÷ 3 600 = ${EX.cpEq}, arrondi à 0,34. Seuls les locaux qui reçoivent l’air du dehors ont cet apport. Un local traversé par de l’air qui vient d’une autre pièce, déjà à θi, n’en a pas : ici, les sanitaires.`,
      prompt: "Suivez l’air sur le schéma, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-air-neuf.svg", `Schéma de principe : coupe d’un local en été. À gauche, dehors, l’air est à ${EX.te} °C et ${EX.hre} %. Il entre par une entrée d’air, flèche orange. Dans le local, l’air est tenu à ${EX.ti} °C et ${EX.hri} %. À droite, l’air sort par une bouche d’extraction vers les sanitaires. Sous le local, deux cases : le sensible, 0,34 × qv × (θe − θi), la chaleur à retirer pour baisser la température de l’air ; le latent, qm × Δx × 2 501, la chaleur à retirer pour sécher l’air.`, "L’air neuf entre chaud et humide : on lui retire du sensible et du latent.") + exempleSens()
    }),

    BE.ecran({
      id: "air-neuf-latent", dossier: "methode", kicker: "La méthode, 2", title: "L’air neuf apporte de l’eau", level: "comprendre",
      text: `L’air du dehors contient plus de vapeur d’eau que l’air de la pièce. Pour le ramener à l’humidité du dedans, la machine doit condenser cette eau : c’est l’apport latent de l’air neuf. Il se calcule avec l’humidité absolue x, lue sur le diagramme de la station A1 : Φl = qm × Δx × ${EX.lv}. qm est le débit d’air en kg/s, ${EX.rho} × qv ÷ 3 600, au dix-millième. Δx = x dehors − x dedans, en g/kg, au dixième. ${EX.lv} J/g est la chaleur qu’il faut pour vaporiser un gramme d’eau, le nombre 2 501 de la formule de h à la station A1 : un gramme d’eau à condenser demande autant de chaleur à retirer. Le résultat est en watts. Sur le diagramme, l’air neuf part du point E et doit arriver au point I : le trait horizontal baisse la température, c’est le sensible ; le trait vertical retire l’eau, c’est le latent.`,
      prompt: "Suivez les deux traits du diagramme, lisez le tableau et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/diagramme-air-neuf.svg", `Diagramme de l’air humide de la station A1. En abscisse la température sèche, en ordonnée l’humidité absolue x. Point E, air extérieur de l’exemple, ${EX.te} °C et ${EX.hre} %, à x = ${EX.ext.x} g/kg. Point I, air intérieur, ${EX.ti} °C et ${EX.hri} %, à x = ${EX.int.x} g/kg. Un trait horizontal part de E vers la gauche jusqu’à ${EX.ti} °C : la part sensible, la température baisse à x constant. Puis un trait vertical descend jusqu’à I : la part latente, l’eau retirée, Δx = ${EX.dx} g/kg.`, "Horizontal : le sensible. Vertical : le latent.") + tableauPoints() + exempleLat()
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, l’air neuf", title: "À l’écran : l’air neuf d’un bureau paysager", level: "appliquer", requiresAction: true,
      text: {
        1: `Un bureau paysager d’exemple reçoit ${EX.ex1.qv} m³/h d’air neuf. Les deux airs sont ceux de l’exemple : ${EX.te} °C et x = ${EX.ext.x} g/kg dehors, ${EX.ti} °C et x = ${EX.int.x} g/kg dedans. Calculez le sensible et le latent de cet air neuf. Les exemples résolus restent sous vos yeux.`,
        2: `Un bureau paysager d’exemple reçoit ${EX.ex1.qv} m³/h d’air neuf. Les deux airs sont ceux de l’exemple : ${EX.te} °C et x = ${EX.ext.x} g/kg dehors, ${EX.ti} °C et x = ${EX.int.x} g/kg dedans. Calculez le sensible et le latent de cet air neuf, sans les exemples.`
      },
      prompt: { 1: "Choisissez la ligne qui donne le sensible et le latent, en vous aidant des exemples.", 2: "Choisissez la ligne qui donne le sensible et le latent. Cette question est à faire seul." },
      aides: {
        1: ["Le débit et les deux airs sont dans l’énoncé. Les méthodes sont aux écrans « L’air neuf en été : le sensible » et « L’air neuf apporte de l’eau ».", `Sensible : 0,34 × qv × (θe − θi). Latent : qm = ${EX.rho} × qv ÷ 3 600, puis qm × Δx × ${EX.lv}.`, `Dans l’exemple : ${EX.coef} × ${REU.qv} × ${EX.dT} = ${REU.anS} W et ${REU.qm} × ${EX.dx} × ${EX.lv} = ${REU.anL} W. Faites de même avec ${EX.ex1.qv} m³/h.`],
        2: ["Les méthodes sont aux écrans « L’air neuf en été : le sensible » et « L’air neuf apporte de l’eau ».", "Deux calculs, deux résultats : ne les additionnez pas.", "Le latent se calcule avec la différence des x, pas avec le x du dehors seul."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleSens() + exempleLat(), EX.ex1.quiz),
        2: avecBloc("", EX.ex1.quiz)
      })
    }),

    BE.ecran({
      id: "deux-lectures", dossier: "methode", kicker: "La méthode, 3", title: "Deux lectures du diagramme", level: "comprendre",
      text: `Le diagramme donne une seconde lecture de l’air neuf, par l’enthalpie h : la chaleur contenue dans un kilogramme d’air sec et sa vapeur. Lisez h au point E et au point I, sur les droites en tirets : Φ = qm × (h dehors − h dedans) × 1 000, en watts, sensible et latent ensemble. Cette lecture contrôle la première : sensible plus latent doit donner presque la même chose. Les deux s’écartent un peu, parce que 0,34 est arrondi, que la vapeur aussi se refroidit, et que h se lit au kJ/kg près. L’écart se calcule sur la somme : (lecture par h − somme) ÷ somme × 100 ; il peut être positif ou négatif. Pour le bilan, gardez le sensible et le latent séparés : la machine les traite différemment. Une valeur lue sur le diagramme se donne à ± 5 % : un kJ/kg de lecture sur chaque point pèse quelques pour cent de Δh.`,
      prompt: "Suivez les lectures de h sur le diagramme, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/diagramme-enthalpies.svg", `Diagramme de l’air humide de la station A1, avec les mêmes points E et I. Depuis chacun, un trait en tirets suit la droite d’enthalpie constante jusqu’à l’échelle des h : h = ${EX.ext.h} kJ/kg pour E, h = ${EX.int.h} kJ/kg pour I. L’écart Δh = ${EX.dh} kJ/kg contient le sensible et le latent.`, "Les droites en tirets portent l’enthalpie h, en kJ/kg.") + exempleEnth()
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, la lecture par les enthalpies", title: "À l’écran : lire h sur le diagramme", level: "appliquer", requiresAction: true,
      text: {
        1: `Un local d’exemple reçoit ${EX.ex2.qv} m³/h d’air neuf. Dehors : ${EX.ex2.ext.t} °C à ${EX.ex2.ext.hr} %, point P sur le diagramme. Dedans : ${EX.ex2.int.t} °C à ${EX.ex2.int.hr} %, point I. Lisez h aux deux points, puis calculez Φ = qm × Δh × 1 000. L’exemple résolu reste sous vos yeux.`,
        2: `Un local d’exemple reçoit ${EX.ex2.qv} m³/h d’air neuf. Dehors : ${EX.ex2.ext.t} °C à ${EX.ex2.ext.hr} %, point P sur le diagramme. Dedans : ${EX.ex2.int.t} °C à ${EX.ex2.int.hr} %, point I. Lisez h aux deux points, puis calculez Φ = qm × Δh × 1 000, sans l’exemple.`
      },
      prompt: { 1: "Lisez h aux points P et I, puis choisissez la ligne juste, en vous aidant de l’exemple.", 2: "Lisez h aux points P et I, puis choisissez la ligne juste. Cette question est à faire seul." },
      aides: {
        1: ["Le diagramme est sous l’énoncé. La méthode est à l’écran « Deux lectures du diagramme ».", `Suivez la droite en tirets qui passe par chaque point jusqu’à l’échelle des h, en haut à gauche. qm = ${EX.rho} × ${EX.ex2.qv} ÷ 3 600.`, `Dans l’exemple : ${REU.qm} × ${EX.dh} × 1 000 = ${REU.anEnth} W. Une lecture au kJ/kg près suffit : les choix sont assez éloignés.`],
        2: ["La méthode est à l’écran « Deux lectures du diagramme ».", "qm en kg/s, Δh en kJ/kg : le produit est en kW, × 1 000 pour des watts.", "Les droites d’enthalpie sont les tirets obliques : épais tous les 10 kJ/kg, fins tous les 5. Les verticales donnent les températures."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.schema("illustrations/diagramme-exercice-2.svg", `Diagramme de l’air humide de la station A1 avec deux points sans lecture : P à ${EX.ex2.ext.t} °C et ${EX.ex2.ext.hr} %, I à ${EX.ex2.int.t} °C et ${EX.ex2.int.hr} %.`, "Lisez h aux points P et I.") + exempleEnth(), EX.ex2.quiz),
        2: avecBloc(BE.schema("illustrations/diagramme-exercice-2.svg", `Diagramme de l’air humide de la station A1 avec deux points sans lecture : P à ${EX.ex2.ext.t} °C et ${EX.ex2.ext.hr} %, I à ${EX.ex2.int.t} °C et ${EX.ex2.int.hr} %.`, "Lisez h aux points P et I."), EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "quatre-postes", dossier: "methode", kicker: "La méthode, 4", title: "Les quatre postes d’un local", level: "comprendre",
      text: `Le bilan d’été d’un local additionne quatre postes de chaleur sensible : le soleil des vitrages (station T6), les parois (station T7), les apports internes, occupants, éclairage et appareils (station T7), et l’air neuf (cette station). Le latent a deux sources : les occupants (station T7) et l’air neuf. Le total du local, sensible plus latent, est la puissance frigorifique qu’un appareil doit retirer pour tenir ${EX.ti} °C. Le tableau montre la salle de réunion et les sanitaires de l’exemple à ${REU.pointe} h solaires. Le bureau, troisième local, est la commande du niveau 1.`,
      prompt: "Regardez les colonnes du schéma, suivez la ligne de la salle de réunion, puis continuez.",
      render: () => BE.schema("illustrations/schema-postes-locaux.svg", `Schéma en colonnes : les postes de deux locaux de l’exemple à ${REU.pointe} h. Salle de réunion : soleil ${REU.soleil[iR]} W, parois ${REU.parois} W, internes ${REU.internes} W, air neuf ${REU.anS} W, latent ${REU.latent} W, total ${REU.tot[iR]} W. Sanitaires : soleil ${SAN.soleil[iR]} W, parois ${SAN.parois} W, internes ${SAN.internes} W, pas d’air neuf, pas de latent, total ${SAN.tot[iR]} W. Chaque poste est une couche de la colonne ; la hauteur est le total.`, "Chaque couche est un poste ; la hauteur de la colonne est la puissance du local.") + tableauPostes()
        + BE.alerte(`<strong>Piège.</strong> Le soleil des vitrages et les parois ne se comptent qu’une fois : le soleil est à la station T6, les fenêtres n’ont dans les parois que l’écart de l’air.`)
    }),

    BE.ecran({
      id: "heure-de-pointe", dossier: "methode", kicker: "La méthode, 5", title: "La somme heure par heure", level: "comprendre",
      text: `Le soleil change d’heure en heure ; pour l’exercice, les parois, les apports internes et l’air neuf gardent leur valeur de l’heure de pointe de la station T7. Pour chaque heure, additionnez les quatre postes et le latent : vous obtenez une ligne de totaux. La puissance d’un local est le plus grand total de sa ligne, à son heure de pointe. Pour le bâtiment, faites la somme des locaux heure par heure : sa puissance est le plus grand total de cette somme. C’est le maximum de la somme, et non la somme des maximums de chaque local : les locaux n’ont pas leur pointe à la même heure. Le bâtiment d’exemple atteint ${B.maxSomme} W à ${B.pointe} h ; la somme des maximums de ses trois locaux vaut ${B.sansT} W. Ces totaux du bâtiment contiennent le bureau de la commande du niveau 1 : faites d’abord votre calcul du bureau, puis servez-vous de ces totaux pour le contrôler.`,
      prompt: "Lisez la courbe, puis le tableau des heures, et continuez.",
      render: () => BE.schema("illustrations/schema-somme-horaire.svg", `Courbe du total du bâtiment d’exemple, heure par heure : ${H.map((h, i) => `${h} h, ${B.tot[i]} W`).join(" ; ")}. Le point le plus haut, à ${B.pointe} h, est entouré : c’est l’heure de pointe du bâtiment. Une ligne en tirets, plus haut, marque la somme des maximums des trois locaux, ${B.sansT} W, que le bâtiment n’atteint à aucune heure.`, "Le plus haut point de la courbe est la pointe du bâtiment.") + tableauHeures()
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, deux bureaux", title: "À l’écran : un bureau à l’est, un bureau à l’ouest", level: "appliquer", requiresAction: true,
      text: {
        1: `Deux bureaux d’exemple sont servis par la même machine. Le tableau donne le soleil de chacun à chaque heure ; chacun a aussi ${EX.ex3.sens} W de parois et d’internes et ${EX.ex3.lat} W de latent, à toute heure. Trouvez la somme des maximums des deux bureaux, puis le maximum de leur somme. L’écran « La somme heure par heure » reste votre modèle.`,
        2: `Deux bureaux d’exemple sont servis par la même machine. Le tableau donne le soleil de chacun à chaque heure ; chacun a aussi ${EX.ex3.sens} W de parois et d’internes et ${EX.ex3.lat} W de latent, à toute heure. Trouvez la somme des maximums des deux bureaux, puis le maximum de leur somme.`
      },
      prompt: { 1: "Choisissez la ligne juste, en vous aidant de l’écran « La somme heure par heure ».", 2: "Choisissez la ligne juste. Cette question est à faire seul." },
      aides: {
        1: ["Le soleil est dans le tableau, le reste dans l’énoncé. La méthode est à l’écran « La somme heure par heure ».", `Maximum d’un bureau : son plus grand soleil + ${EX.ex3.sens} + ${EX.ex3.lat}. Somme des deux, à chaque heure : soleil est + soleil ouest + 2 × (${EX.ex3.sens} + ${EX.ex3.lat}).`, "Le bureau est a sa pointe le matin, le bureau ouest le soir : à aucune heure les deux ne sont au plus haut."],
        2: ["La méthode est à l’écran « La somme heure par heure ».", "Deux nombres : la somme des maximums, puis le plus grand total de la somme heure par heure.", "Faites la ligne des sommes, heure par heure, avant de chercher le plus grand."]
      },
      ...BE.parNiveau({
        1: avecBloc(ex3Table(), EX.ex3.quiz),
        2: avecBloc(ex3Table(), EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "simultaneite", dossier: "methode", kicker: "La méthode, 6", title: "La simultanéité", level: "comprendre",
      text: `Chaque local se calcule plein, à son heure de pointe : tous ses occupants, son éclairage, ses appareils. C’est la puissance de l’appareil qui le sert. La machine qui sert tout le bâtiment ne voit jamais tout cela en même temps. D’abord, les locaux n’ont pas leur pointe à la même heure : la somme heure par heure le montre. Ensuite, une personne ne peut pas être dans deux locaux : le bâtiment d’exemple compte ${B.comptes} places dans ses locaux pour ${B.max} personnes au plus. Pour la machine, prenez le maximum de la somme, puis retirez les personnes comptées en trop : ${B.comptes - B.max} × ${EX.actS} = ${B.corrS} W de sensible et ${B.comptes - B.max} × ${EX.actL} = ${B.corrL} W de latent. Le coefficient de simultanéité Cs compare les deux puissances : Cs = puissance de la machine ÷ somme des maximums des locaux, au centième. Pour l’exercice, le bureau d’études retient cette règle ; les guides professionnels donnent des coefficients tout faits, que cette station ne reprend pas.`,
      prompt: "Comparez les trois colonnes du schéma, puis continuez.",
      render: () => BE.schema("illustrations/schema-simultaneite.svg", `Schéma en trois colonnes, bâtiment d’exemple. Première colonne, la somme des maximums des trois locaux : ${B.sansT} W. Deuxième, le maximum de la somme heure par heure, à ${B.pointe} h : ${B.maxSomme} W. Troisième, le même maximum avec les occupants comptés une fois : ${B.avecT} W, la puissance de la machine. Sous les colonnes : Cs = ${B.avecT} ÷ ${B.sansT} = ${B.Cs}.`, "La machine voit moins que la somme des locaux : Cs le mesure.")
        + tableau(["Ligne", "Sensible (W)", "Latent (W)", "Total (W)"], [
          ["Somme des maximums des locaux", B.sansS, B.lat, B.sansT],
          [`Maximum de la somme, à ${B.pointe} h`, B.sens[iP], B.lat, B.maxSomme],
          [`Occupants comptés une fois (− ${B.comptes - B.max} personnes)`, `− ${B.corrS}`, `− ${B.corrL}`, `− ${Number(B.corrS) + Number(B.corrL)}`],
          ["Machine, avec simultanéité", B.avecS, B.avecL, B.avecT]
        ], `Bâtiment d’exemple, bureau du niveau 1 compris : Cs = ${B.avecT} ÷ ${B.sansT} = ${B.Cs}`)
    }),

    BE.ecran({
      id: "puissance-a-retenir", dossier: "methode", kicker: "La méthode, 7", title: "La puissance à retenir", level: "comprendre",
      text: `La puissance frigorifique se donne en sensible, en latent et en total. La part sensible, sensible ÷ total × 100 au pour cent, dit quel air la machine doit souffler : beaucoup de sensible demande un air froid mais peu séché. Pour la machine du bâtiment d’exemple : ${B.avecS} ÷ ${B.avecT} × 100 = ${B.partS} %. La puissance se reporte en kW, arrondie au dixième vers le haut : ${B.avecT} W donnent ${B.PkW} kW. La station T9 choisit la machine avec ce nombre, puis corrige sa puissance aux conditions du site. Chaque local garde sa propre puissance pour choisir son appareil intérieur ou sa bouche. Comparez enfin avec la puissance d’hiver de la station T5 : la machine doit tenir les deux.`,
      prompt: "Lisez les deux cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Pour chaque local", rows: [["Sa puissance :", "le plus grand total de sa ligne, à son heure de pointe."], ["Elle sert à :", "choisir l’appareil intérieur ou la bouche du local."]] },
        { title: "Pour la machine", rows: [["Sa puissance :", "le maximum de la somme, occupants comptés une fois."], ["Elle se donne :", "sensible, latent, total, part sensible, kW au dixième vers le haut."], ["Elle sert à :", "la station T9, avec la puissance d’hiver de la station T5."]] }
      ])
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 8", title: "Ce que la note de calcul doit dire", level: "comprendre",
      text: "La note de calcul dit les deux airs et leur source, les débits, l’heure de pointe, les hypothèses de l’exercice, et elle donne la puissance de chaque local, la puissance de la machine, le coefficient de simultanéité et la part sensible. Un autre technicien doit pouvoir refaire le calcul. Voici la note du bâtiment d’exemple.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Synthèse du bilan d’été, petit bâtiment de bureaux de plain-pied, trois locaux"],
        ["Données d’entrée", `Soleil : station T6 ; parois et internes : station T7 ; débits : station T5 ; x et h : diagramme de la station A1 ; 0,34 : Th-Bât, Généralités, p. 18`],
        ["Hypothèses", `Dehors ${EX.te} °C et ${EX.hre} %, dedans ${EX.ti} °C et ${EX.hri} % ; apports constants de ${H[0]} h à ${H[H.length - 1]} h ; ${B.max} personnes au plus (données de l’exercice)`],
        ["Méthode", "0,34 × qv × Δθ ; qm × Δx × 2 501, contrôlé par qm × Δh ; somme heure par heure ; machine au maximum de la somme, occupants comptés une fois"],
        ["Résultats", `Salle de réunion ${REU.maxT} W à ${REU.pointe} h ; machine ${B.avecS} W sensible, ${B.avecL} W latent, ${B.avecT} W (${B.PkW} kW) à ${B.pointe} h ; Cs = ${B.Cs} ; part sensible ${B.partS} %`]
      ], "Note de calcul, bâtiment d’exemple")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

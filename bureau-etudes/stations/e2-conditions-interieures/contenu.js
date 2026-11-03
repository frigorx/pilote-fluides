/* Station BE-E2 : Les conditions intérieures.
   Méthode sur l'appartement d'exemple (qui n'est pas la maison du projet), puis commande sur la maison (niveau 1) et sur une maison de plain-pied (niveau 2).
   Les valeurs de l'appartement (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/e2-conditions-interieures/construire.mjs : le premier vient de exemple-data.mjs (débits lus dans les tableaux des articles 3 et 4),
   les secondes de corrige-conditions.json (niveau 1) et de exemple-data.mjs (niveau 2). Tolérance nulle : un débit réglementaire se lit dans un tableau.
   Aucun débit de la maison n'est écrit dans cette station en dehors des bornes des fourchettes. */
const tableau = (entetes, lignes, legende) => `<div style="width:0;min-width:100%;overflow-x:auto"><table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const DOSSIER = "../../fil-rouge/maison/";
const niveauCourant = () => Number(new URLSearchParams(location.search).get("niveau")) || 1;

/*EXEMPLE-DEBUT*/
const EX = {
 "app": {
  "nom": "Appartement d’exemple",
  "hiver": "19",
  "reduit": "16",
  "tol": "1",
  "ete": "26",
  "hr": "40 à 60 %",
  "confortDe": "7 h",
  "confortA": "23 h",
  "pp": "3",
  "ligne": "3",
  "cuisine": "105",
  "sdb": "30",
  "total": "135",
  "rTotal": "75",
  "rCuisine": "45",
  "occTotal": "2",
  "occTexte": "séjour 2 (soirée et repas), chambre a 1 (nuit), chambre b 1 (nuit), les autres pièces 0",
  "sdbEtWc": "150",
  "types": [
   [
    "Séjour",
    "pièce principale",
    "le séjour"
   ],
   [
    "Chambre A",
    "pièce principale",
    "le sommeil"
   ],
   [
    "Chambre B",
    "pièce principale",
    "le sommeil"
   ],
   [
    "Cuisine",
    "pièce de service",
    "la cuisine"
   ],
   [
    "Salle de bains avec WC",
    "pièce de service",
    "salle d’eau et WC dans la même pièce : une seule pièce de service"
   ],
   [
    "Entrée",
    "circulation",
    "ni séjour, ni sommeil, ni pièce de service"
   ]
  ],
  "locaux": [
   [
    "Séjour",
    "principale",
    "19",
    "16",
    "26",
    "40 à 60 %",
    "2 (soirée et repas)",
    "entrée d’air",
    "CCTP, R. 241-30, exercice"
   ],
   [
    "Chambre A",
    "principale",
    "19",
    "16",
    "26",
    "40 à 60 %",
    "1 (nuit)",
    "entrée d’air",
    "CCTP, R. 241-30, exercice"
   ],
   [
    "Chambre B",
    "principale",
    "19",
    "16",
    "26",
    "40 à 60 %",
    "1 (nuit)",
    "entrée d’air",
    "CCTP, R. 241-30, exercice"
   ],
   [
    "Cuisine",
    "service",
    "19",
    "16",
    "/",
    "40 à 60 %",
    "0 (passage)",
    "extraction 105 m³/h",
    "CCTP, art. 3 ligne 3, exercice"
   ],
   [
    "Salle de bains avec WC",
    "service",
    "19",
    "16",
    "/",
    "40 à 60 %",
    "0 (passage)",
    "extraction 30 m³/h",
    "CCTP, art. 3 ligne 3, exercice"
   ],
   [
    "Entrée",
    "circulation",
    "19",
    "16",
    "/",
    "40 à 60 %",
    "0 (passage)",
    "air de transit",
    "CCTP, exercice"
   ]
  ]
 },
 "art3": {
  "entetes": [
   "Cuisine",
   "Salle de bains ou de douches",
   "Autre salle d’eau",
   "WC unique",
   "WC multiples"
  ],
  "lignes": [
   [
    "1",
    "75",
    "15",
    "15",
    "15",
    "15"
   ],
   [
    "2",
    "90",
    "15",
    "15",
    "15",
    "15"
   ],
   [
    "3",
    "105",
    "30",
    "15",
    "15",
    "15"
   ],
   [
    "4",
    "120",
    "30",
    "15",
    "30",
    "15"
   ],
   [
    "5 et plus",
    "135",
    "30",
    "15",
    "30",
    "15"
   ]
  ]
 },
 "art4": {
  "entetes": [
   "1",
   "2",
   "3",
   "4",
   "5",
   "6",
   "7 et plus"
  ],
  "lignes": [
   [
    "Débit total minimal (m³/h)",
    "35",
    "60",
    "75",
    "90",
    "105",
    "120",
    "135"
   ],
   [
    "Débit minimal en cuisine (m³/h)",
    "20",
    "30",
    "45",
    "45",
    "45",
    "45",
    "45"
   ]
  ]
 },
 "ex1": {
  "choices": [
   "3 pièces principales",
   "4 pièces principales",
   "5 pièces principales",
   "8 pièces principales"
  ],
  "good": 1,
  "explain": "Les pièces principales sont le séjour et les trois chambres : 1 + 3 = 4. La cuisine, la salle de bains, le WC et le cellier sont des pièces de service : elles ne comptent pas. 3 oublie le séjour, 5 compte la cuisine, 8 compte toutes les pièces."
 },
 "ex2": {
  "choices": [
   "15 m³/h",
   "30 m³/h",
   "45 m³/h",
   "90 m³/h"
  ],
  "good": 0,
  "explain": "Deux pièces principales : ligne « 2 ». La salle de bains qui contient un WC est une seule pièce de service : colonne « salle de bains ou de douches », soit 15 m³/h. 30 m³/h ajoute un WC que la salle de bains contient déjà, 45 m³/h additionne trois colonnes, 90 m³/h lit la colonne « cuisine »."
 },
 "tri": {
  "labels": [
   "Un texte l’impose",
   "Le CCTP l’impose",
   "Le bureau d’études le choisit"
  ],
  "exemple": {
   "text": "La température d’inoccupation de 8 °C au plus à partir de 48 h",
   "good": 0,
   "why": "Code de l’énergie, art. R. 241-27 : un texte fixe la valeur."
  },
  "lignes": [
   {
    "text": "Le débit extrait de la cuisine de l’appartement",
    "good": 0,
    "why": "Arrêté du 24 mars 1982 relatif à l’aération des logements, modifié par l’arrêté du 28 octobre 1983, art. 3, d’après le nombre de pièces principales.",
    "bad": "Cherchez qui fixe la valeur : un texte officiel, le CCTP du logement, ou personne. Relisez les trois origines au début du texte de l’écran."
   },
   {
    "text": "Le seuil de 26 °C au-dessus duquel un refroidissement peut fonctionner",
    "good": 0,
    "why": "Code de l’énergie, art. R. 241-30 : un texte fixe le seuil.",
    "bad": "Cherchez qui fixe la valeur : un texte officiel, le CCTP du logement, ou personne. Relisez les trois origines au début du texte de l’écran."
   },
   {
    "text": "La consigne d’hiver de l’appartement, demandée par le propriétaire",
    "good": 1,
    "why": "Le propriétaire la demande et le CCTP l’écrit : le bureau d’études la reprend. Aucun texte ne la fixe.",
    "bad": "Cherchez qui fixe la valeur : un texte officiel, le CCTP du logement, ou personne. Relisez les trois origines au début du texte de l’écran."
   },
   {
    "text": "Le système de ventilation de l’appartement : une VMC hygroréglable",
    "good": 1,
    "why": "Le CCTP décrit le système : le bureau d’études le reprend.",
    "bad": "Cherchez qui fixe la valeur : un texte officiel, le CCTP du logement, ou personne. Relisez les trois origines au début du texte de l’écran."
   },
   {
    "text": "Le repère d’humidité de 40 à 60 %",
    "good": 2,
    "why": "Aucun texte et aucun CCTP ne l’impose : le bureau d’études le choisit, le note comme hypothèse et le justifie.",
    "bad": "Cherchez qui fixe la valeur : un texte officiel, le CCTP du logement, ou personne. Relisez les trois origines au début du texte de l’écran."
   },
   {
    "text": "Les horaires de confort, de 7 h à 23 h",
    "good": 2,
    "why": "Aucun texte ne les fixe : le bureau d’études les choisit avec le maître d’ouvrage et les note.",
    "bad": "Cherchez qui fixe la valeur : un texte officiel, le CCTP du logement, ou personne. Relisez les trois origines au début du texte de l’écran."
   }
  ],
  "tableau": [
   [
    "La limite de chauffage de 19 °C en moyenne (Code de l’énergie, art. R. 241-26)",
    "Le nombre d’occupants de l’appartement",
    "La tolérance de ± 1 K"
   ],
   [
    "Les températures d’inoccupation (Code de l’énergie, art. R. 241-27)",
    "Les pièces où l’air est extrait",
    "L’allure réduite de 16 °C la nuit"
   ],
   [
    "Le débit total minimal avec réglage individuel (arrêté de 1982, art. 4)",
    "",
    "La répartition des occupants entre les pièces"
   ]
  ]
 },
 "n1": {
  "hiver": "20",
  "reduit": "17",
  "tol": "1",
  "ete": "26",
  "hr": "40 à 60 %",
  "confort": "de 6 h à 22 h",
  "reduitH": "de 22 h à 6 h",
  "occ": "séjour : 4, chambre 1 : 2, chambre 2 : 1, chambre 3 : 1"
 },
 "n2": {
  "occupants": "5",
  "adultes": "2",
  "enfants": "3",
  "hiver": "20",
  "reduit": "17",
  "tol": "1",
  "ete": "26",
  "hr": "40 à 60 %",
  "confort": "de 6 h à 22 h",
  "reduitH": "de 22 h à 6 h",
  "occ": "séjour : 5, chambre des parents : 2, chacune des trois chambres d’enfants : 1"
 },
 "tert": {
  "travail": [
   [
    "Bureaux et locaux sans travail physique",
    "25"
   ],
   [
    "Locaux de restauration, de vente, de réunion",
    "30"
   ],
   [
    "Ateliers et locaux avec travail physique léger",
    "45"
   ],
   [
    "Autres ateliers et locaux",
    "60"
   ]
  ],
  "rsd": [
   [
    "Enseignement maternel, primaire et secondaire du premier cycle",
    "15"
   ],
   [
    "Enseignement secondaire du second cycle et universitaire",
    "18"
   ],
   [
    "Bureaux et locaux assimilés",
    "18"
   ],
   [
    "Locaux de réunions",
    "18"
   ],
   [
    "Locaux de vente",
    "22"
   ],
   [
    "Locaux de restauration",
    "22"
   ],
   [
    "Hébergement",
    "18"
   ]
  ],
  "hebergement": "chambres de moins de trois personnes : 30 m³/h par local",
  "bureauCT": "25",
  "bureauRSD": "18"
 },
 "pages": {
  "theta": 3,
  "ventilation": 4,
  "famille": 5
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const ENTETES_LOCAUX = ["Local", "Type", "θ hiv.", "θ réd.", "θ été", "HR", "Occ.", "Air", "Source"];
const LEGENDE_COLONNES = "θ hiv., θ réd., θ été : températures d’hiver, réduite et d’été, en °C ; HR : humidité relative, en % ; Occ. : occupants.";
const exemplePieces = () => BE.exemple({ text: `${EX.app.nom} : un séjour, deux chambres, une cuisine fermée, une salle de bains avec WC, une entrée`, answer: `${EX.app.pp} pièces principales (le séjour et les deux chambres) ; 2 pièces de service ; l’entrée est une circulation`, why: "La cuisine, la salle de bains et son WC sont des pièces de service : elles ne comptent pas dans les pièces principales. La salle de bains qui contient un WC reste une seule pièce." });
const exempleLecture = () => BE.exemple({ text: `${EX.app.nom} : ${EX.app.pp} pièces principales, une cuisine, une salle de bains avec WC`, answer: `Ligne ${EX.app.ligne} : cuisine ${EX.app.cuisine} + salle de bains ${EX.app.sdb} = ${EX.app.total} m³/h`, why: "La salle de bains avec WC est une seule pièce de service : on lit la colonne « salle de bains ou de douches » et on n’ajoute pas de WC." });

/* Écran « À vous, le projet » : la commande du moteur, suivie du lien vers l'extrait de CCTP de la maison (niveau 1 seulement). */
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Les locaux sont dans la liste de la feuille. La page ${EX.pages.theta} du CCTP donne θ hiver, la page ${EX.pages.ventilation} les pièces principales, les pièces de service et le système de ventilation, la page ${EX.pages.famille} les occupants. Les autres valeurs sont dans la commande, qui les donne comme hypothèses du bureau d’études.`,
      "Un type par local : pièce principale (séjour ou sommeil), pièce de service (cuisine, salle d’eau, WC), circulation ou non chauffé. L’article 3 se lit avec une ligne, celle du nombre de pièces principales, et une colonne par pièce de service. L’article 4 se lit avec le même nombre de pièces principales.",
      `Dans l’appartement d’exemple, la cuisine est une pièce de service : la ligne de ${EX.app.pp} pièces principales et la colonne « cuisine » donnent son débit. Faites le même geste pour la cuisine de la maison : comptez les pièces principales, repérez la ligne, lisez la colonne.`
    ],
    2: [
      "La commande décrit toute la maison : les locaux, les occupants, la ventilation. Les débits se lisent dans les tableaux des articles 3 et 4, aux écrans « Lire le tableau de l’article 3 » et « Les débits réduits de l’article 4 ».",
      "Listez d’abord les locaux, donnez un type à chacun et comptez les pièces principales. Chaque pièce de service prend sa colonne ; deux WC séparés prennent la colonne des WC multiples. Avant de lire l’article 4, cherchez si les bouches ont un dispositif de réglage individuel.",
      `Dans l’appartement d’exemple, le séjour et deux chambres font ${EX.app.pp} pièces principales, donc la ligne ${EX.app.ligne} ; la salle de bains avec WC lit une seule colonne. Écrivez la même suite de gestes pour la maison de plain-pied.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensMaison = () => BE.liens([
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: `Page ${EX.pages.theta} : températures. Page ${EX.pages.ventilation} : ventilation. Page ${EX.pages.famille} : la famille.` }
]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") || niveauCourant() !== 1 ? html : html + liensMaison(); };

BE.station({
  code: "BE-E2",
  titre: "Les conditions intérieures",
  ligne: "Données d’entrée",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Maison de deux niveaux, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Maison de plain-pied, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Avant de calculer, un bureau d’études écrit ce que chaque pièce doit offrir : sa température, son humidité, ses occupants et l’air qui la traverse. Vous apprenez à établir ce tableau des locaux sur un appartement d’exemple, puis vous le faites sur une maison, à partir du CCTP et des textes officiels.",
  note: "Les consignes de l’appartement, le repère d’humidité, la tolérance, les horaires et la répartition des occupants sont des valeurs d’exercice. Les débits d’air viennent de l’arrêté du 24 mars 1982, les limites de température du Code de l’énergie.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un appartement d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, CCTP et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Tableau des locaux et débits d’air de la maison de deux niveaux",
      delai: "Rendu en fin de séance",
      commande: [
        "Le maître d’ouvrage fait étudier la maison de deux niveaux des stations T1 à T3. Avant les calculs de besoins, vous établissez le tableau des locaux : température, humidité, occupants et air de chaque pièce, avec la source de chaque valeur. Suivez les étapes dans l’ordre.",
        `Étape 1. Au recto de la feuille, les locaux sont écrits. Avec la liste des locaux de la feuille et la page ${EX.pages.ventilation} du CCTP, écrivez le type de chaque local : principale, service, circulation ou non chauffé (écran « Pièces principales et pièces de service »). Le garage, non chauffé, ne reçoit ni consigne ni débit : sa ligne est remplie, avec « / ». Le comble perdu n’est pas un local : il n’entre pas dans le tableau.`,
        `Étape 2. Écrivez θ hiver (page ${EX.pages.theta} du CCTP), puis θ réduit, θ été, humidité et occupants avec les hypothèses du bureau d’études ci-dessous. Écrivez la source de chaque valeur : « hypothèse BE » pour ces hypothèses.`,
        `Hypothèses du bureau d’études (valeurs d’exercice, à écrire dans la colonne Source comme « hypothèse BE ») : allure confort ${EX.n1.confort}, allure réduite ${EX.n1.reduitH}, à ${EX.n1.reduit} °C ; tolérance de ± ${EX.n1.tol} K ; humidité relative de ${EX.n1.hr} ; occupants : ${EX.n1.occ}.`,
        `Température d’été de ${EX.n1.ete} °C dans les pièces principales : Code de l’énergie, art. R. 241-30.`,
        "Étape 3. Écrivez dans la colonne « air » : entrée d’air pour une pièce principale, extraction pour une pièce de service, avec le débit lu au verso.",
        `Étape 4. Au verso, remplissez le bloc ventilation : comptez les pièces principales, lisez chaque débit dans le tableau de l’article 3 (écran « Lire le tableau de l’article 3 »), puis le total, et lisez les débits réduits à l’article 4. Le CCTP donne ses débits à la page ${EX.pages.ventilation} : écrivez dans « Où je l’ai lu » la colonne et la ligne que vous avez lues.`,
        "Étape 5. Classez trois données : imposée par un texte, imposée par le CCTP ou choisie par le bureau d’études. Reportez ensuite vos deux totaux à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Liste des locaux", ou: "Recto de la feuille réponse niveau 1." },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: `Page ${EX.pages.theta} : températures. Page ${EX.pages.ventilation} : ventilation. Page ${EX.pages.famille} : les occupants.` },
        { piece: "Tableaux des articles 3 et 4 de l’arrêté de 1982", ou: "Écrans « Lire le tableau de l’article 3 » et « Les débits réduits de l’article 4 » de cette station" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Tableau des locaux et débit d’air d’une maison de plain-pied",
      delai: "Rendu en fin de séance",
      commande: [
        `Un maître d’ouvrage fait construire une maison de plain-pied. Elle comprend un séjour, quatre chambres, une cuisine fermée, une salle de bains (baignoire), une salle d’eau (lavabo, lave-linge, sans douche), deux WC séparés, un dégagement et un cellier non chauffé, qui se note « non chauffé » dans le tableau. Elle est occupée par ${EX.n2.occupants} personnes : ${EX.n2.adultes} adultes et ${EX.n2.enfants} enfants. La commande demande une consigne d’hiver de ${EX.n2.hiver} °C dans les pièces chauffées. La ventilation est une VMC simple flux autoréglable : ses bouches ont un débit fixe, sans dispositif de réglage individuel.`,
        `Hypothèses du bureau d’études (valeurs d’exercice, à écrire dans la colonne Source comme « hypothèse BE ») : allure confort ${EX.n2.confort}, allure réduite ${EX.n2.reduitH}, à ${EX.n2.reduit} °C ; tolérance de ± ${EX.n2.tol} K ; humidité relative de ${EX.n2.hr} ; occupants : ${EX.n2.occ}.`,
        `Température d’été de ${EX.n2.ete} °C dans les pièces principales : Code de l’énergie, art. R. 241-30.`,
        "Rendez le tableau des locaux de la maison, avec la source de chaque valeur. Rendez aussi le nombre de pièces principales, le débit à atteindre de chaque pièce de service avec la colonne et la ligne lues, le débit total à atteindre, et dites si les débits réduits de l’article 4 s’appliquent, avec la raison. Classez trois données : imposée par un texte, imposée par le CCTP ou choisie par le bureau d’études."
      ],
      pieces: [
        { piece: "La commande ci-dessus", ou: "Elle décrit la maison de plain-pied : locaux, occupants, consigne, ventilation." },
        { piece: "Tableaux des articles 3 et 4 de l’arrêté de 1982", ou: "Écrans « Lire le tableau de l’article 3 » et « Les débits réduits de l’article 4 » de cette station" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "e2-n1-total", libelle: "Débit total extrait à atteindre de la maison", unite: "m³/h", min: 180, max: 180, indice: "Relisez l’écran « Pièces principales et pièces de service » pour le nombre de pièces principales, puis l’écran « Lire le tableau de l’article 3 » : une ligne, une colonne par pièce de service, puis la somme des débits." },
      { id: "e2-n1-reduit", libelle: "Débit total minimal avec les débits réduits", unite: "m³/h", min: 90, max: 90, indice: "Relisez l’écran « Les débits réduits de l’article 4 » : le tableau se lit avec le nombre de pièces principales, et la valeur à écrire est le débit total minimal de la ligne, pas la somme des débits de l’article 3." }
    ],
    2: [
      { id: "e2-n2-total", libelle: "Débit total extrait à atteindre de la maison de plain-pied", unite: "m³/h", min: 210, max: 210, indice: "Relisez l’écran « Lire le tableau de l’article 3 » : comptez les pièces principales, lisez une colonne par pièce de service, avec la colonne « WC multiples » dès deux WC séparés, puis additionnez." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T1", titre: "Surfaces et volumes du projet", href: "../t1-surfaces-volumes/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Pourquoi ventiler ?", href: "../../../aerorezo/stations/besoin-air/index.html", pourquoi: "Vous y trouvez pourquoi on ventile un logement, ce que la station applique ici avec les débits de l’arrêté de 1982." },
    { reseau: "AéroRézo", titre: "L’humidité relative", href: "../../../aerorezo/stations/hygrometrie/index.html", pourquoi: "Cette page explique l’humidité relative dont le tableau des locaux note le repère de confort." },
    { reseau: "Bureau d’études", titre: "BE-T4, Déperditions par l’air", href: "../t4-deperditions-air/index.html", pourquoi: "Cette station calcule les déperditions par le renouvellement d’air, à partir des débits de votre tableau." },
    { reseau: "Bureau d’études", titre: "BE-A2, Les débits du projet", href: "../a2-debits-projet/index.html", pourquoi: "Cette station reprend vos débits pour établir ceux de chaque local et l’équilibre du bâtiment." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/1-tableau-des-locaux.webp", imageAlt: "Un technicien de bureau d’études, assis à son bureau, remplit au stylo un tableau quadrillé posé devant lui. Les premières lignes portent un pictogramme : un canapé, un lit, une casserole, une douche. Derrière le tableau, deux plans de logement imprimés, dont l’un avec une pièce coloriée en orange. À gauche, un thermomètre et un pot de crayons.",
      text: "Vous recevez la commande d’un bureau d’études : établir le tableau des locaux d’un logement. Pour chaque pièce, il dit la température à maintenir, l’humidité visée, le nombre d’occupants et l’air qui y entre ou qui en sort. Vous reprenez les données du CCTP et des textes officiels, et vous écrivez la source de chacune. Ce tableau sert de point de départ aux calculs des stations suivantes : les déperditions, les débits d’air, les apports. Les réponses s’écrivent sur la feuille A4 recto verso. L’écran explique chaque geste, la feuille reçoit vos résultats.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(ENTETES_LOCAUX, [
        ["Un local par ligne", "", "", "", "", "", "", "", ""],
        ["…", "", "", "", "", "", "", "", ""]
      ], `Le tableau des locaux, vide. ${LEGENDE_COLONNES}`)
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "établir le tableau des locaux d’un logement, avec les débits d’air."], ["Le dossier :", "les plans, le CCTP et les textes cités dans cette station."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "une ligne par local, avec le type, les températures, l’humidité, les occupants, l’air et la source."], ["Le résultat :", "le débit total extrait à atteindre. À l’écran Vérifier, il doit être exact, car il se lit dans un tableau."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T1, les surfaces et volumes du projet."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Le tableau des locaux rassemble des données de trois origines. Le CCTP donne ce que le maître d’ouvrage a décidé : la température de calcul, le système de ventilation, les occupants. Les textes officiels donnent ce qui s’impose à tous : les débits d’air par pièce de service, la limite de température de chauffage, le seuil du refroidissement. Le reste, le bureau d’études le choisit avec le maître d’ouvrage et l’écrit comme hypothèse : la tolérance, l’allure réduite, les horaires, le repère d’humidité, la répartition des occupants. Chaque valeur du tableau porte sa source. Une valeur que la commande vous donne comme hypothèse du bureau d’études reste un choix du bureau d’études. Une valeur que le CCTP ou le maître d’ouvrage impose relève du CCTP. Une valeur d’un texte relève du texte.",
      prompt: "Suivez les flèches du schéma, lisez le tableau des origines, puis continuez.",
      render: () => BE.schema("illustrations/schema-origines-donnees.svg", "Schéma de principe. À gauche, trois cases l’une sous l’autre. Première case : un texte officiel, loi, décret, arrêté, la valeur s’impose. Deuxième case : le CCTP, le maître d’ouvrage a décidé, on le reprend. Troisième case : le bureau d’études, ni texte ni CCTP, il choisit et justifie ; sa flèche est orange. Une flèche part de chaque case vers une grande case à droite, le tableau des locaux : chaque valeur porte sa source.", "Une donnée du tableau vient d’un texte, du CCTP ou d’un choix du bureau d’études, et le tableau en garde la source.") + tableau(["Donnée", "D’où elle vient", "Où la lire"], [
        ["Température de calcul d’hiver", "Le CCTP", `Page ${EX.pages.theta}, valeur d’exercice`],
        ["Système de ventilation et pièces où l’air est extrait", "Le CCTP", `Page ${EX.pages.ventilation}`],
        ["Nombre d’occupants", "Le CCTP", `Page ${EX.pages.famille}`],
        ["Débits extraits à atteindre et débits réduits", "Un texte", "Arrêté du 24 mars 1982 modifié, art. 3 et 4 (écrans de méthode)"],
        ["Limite de chauffage, inoccupation, seuil de 26 °C, quatre allures", "Un texte", "Code de l’énergie, art. R. 241-26, R. 241-27, R. 241-30 et R. 241-31-1"],
        ["Tolérance, allure réduite, horaires, repère d’humidité, répartition des occupants", "Le bureau d’études, avec le maître d’ouvrage", "La commande de l’écran « À vous, le projet », qui les donne comme hypothèses du bureau d’études"]
      ], "Les données du tableau des locaux")
        + BE.renvoi("Les valeurs d’été, d’humidité, de tolérance et d’horaires ne sont pas encore écrites au CCTP de la maison. La commande les donne comme hypothèses du bureau d’études, avec leur source.")
        + BE.renvoi("Vocabulaire. CCTP : cahier des clauses techniques particulières, le document qui dit ce que le maître d’ouvrage commande. Maître d’ouvrage : celui qui commande et paie les travaux. θ : le symbole de la température. K : le kelvin, un écart de 1 K vaut un écart de 1 °C.")
    }),

    BE.ecran({
      id: "pieces-principales-et-de-service", dossier: "methode", kicker: "La méthode, 1", title: "Pièces principales et pièces de service", level: "comprendre",
      text: "Le tableau de l’arrêté de 1982 se lit d’après le nombre de pièces principales du logement. Le Code de la construction et de l’habitation (art. R. 111-1-1) distingue les pièces principales, destinées au séjour ou au sommeil, et les pièces de service : cuisines, salles d’eau, cabinets d’aisance, buanderies, débarras, séchoirs, celliers. Un séjour et une chambre sont des pièces principales. Une cuisine, une salle de bains, un WC et un cellier sont des pièces de service. Une entrée ou un dégagement est une circulation : ni une pièce principale, ni une pièce de service. Un local non chauffé se classe « non chauffé », quel que soit son nom : un cellier non chauffé est « non chauffé ». Ce geste remplit la colonne « type » du tableau des locaux de la feuille.",
      prompt: "Regardez le plan, lisez le tableau des types, puis l’exemple résolu.",
      render: () => BE.schema("illustrations/schema-plan-types.svg", `Schéma de principe : le plan de l’appartement d’exemple, six cases. En haut, trois pièces principales en bleu clair : le séjour, la chambre A et la chambre B. En bas, la cuisine, en orange clair, pièce de service ; l’entrée, en gris, circulation ; la salle de bains avec WC, en orange clair, pièce de service. Une légende donne les trois couleurs. À droite : pièces principales, ${EX.app.pp}, séjour, chambre A, chambre B.`, "Le séjour et les chambres sont des pièces principales, la cuisine et la salle de bains des pièces de service, l’entrée une circulation.") + tableau(["Local de l’appartement", "Type", "Pourquoi"], EX.app.types, "Le type de chaque local de l’appartement d’exemple")
        + exemplePieces()
        + BE.alerte("<strong>Piège.</strong> La cuisine est une pièce de service, même ouverte sur le séjour : on ne la compte pas parmi les pièces principales.")
        + BE.renvoi("Code de la construction et de l’habitation, art. R. 111-1-1 : un logement comprend des pièces principales destinées au séjour ou au sommeil, et des pièces de service.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, les pièces principales", title: "Exercice : compter les pièces principales", level: "appliquer", requiresAction: true,
      text: {
        1: "Un logement comprend un séjour, trois chambres, une cuisine, une salle de bains, un WC et un cellier. Comptez ses pièces principales, avec la définition de l’écran « Pièces principales et pièces de service ». L’exemple résolu reste sous vos yeux : refaites le même geste.",
        2: "Un logement comprend un séjour, trois chambres, une cuisine, une salle de bains, un WC et un cellier. Comptez ses pièces principales, avec la définition de l’écran « Pièces principales et pièces de service ». Comptez sans l’exemple."
      },
      prompt: { 1: "Choisissez le bon nombre, en vous aidant de l’exemple.", 2: "Choisissez le bon nombre. Cette question est à faire seul." },
      aides: {
        1: ["La liste des pièces est dans l’énoncé. La définition est à l’écran « Pièces principales et pièces de service ».", "Une pièce principale sert au séjour ou au sommeil. Rangez chaque pièce de la liste dans une catégorie, puis comptez celles de la première.", `Dans l’appartement d’exemple, le séjour et les deux chambres servent au séjour ou au sommeil : ${EX.app.pp} pièces principales. La cuisine, la salle de bains et l’entrée n’en font pas partie. Écrivez la même liste pour le logement de l’exercice.`],
        2: ["La liste des pièces est dans l’énoncé. La définition est à l’écran « Pièces principales et pièces de service ».", "Une pièce principale sert au séjour ou au sommeil. Rangez chaque pièce de la liste dans une catégorie, puis comptez celles de la première.", `Dans un autre logement, un séjour et deux chambres font ${EX.app.pp} pièces principales : la cuisine et la salle de bains n’en font pas partie. Écrivez la même liste pour le logement de l’exercice.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exemplePieces(), EX.ex1),
        2: BE.quiz(EX.ex1)
      })
    }),

    BE.ecran({
      id: "temperature-d-hiver", dossier: "methode", kicker: "La méthode, 2", title: "La température d’hiver", level: "comprendre",
      image: "illustrations/2-thermostat-famille.webp", imageAlt: "Coupe d’un logement en hiver. Dans le séjour, deux adultes sont assis sur un canapé et deux enfants jouent sur un tapis. Au mur, un thermostat rond orange. À droite, un radiateur sous une fenêtre qui donne sur un paysage de neige.",
      text: `Un dossier parle de plusieurs températures d’hiver, qu’il faut garder séparées. La consigne de calcul est la température que le bureau d’études vise pour dimensionner le chauffage : elle s’écrit au CCTP. Dans la maison du niveau 1, elle est de ${EX.n1.hiver} °C, un choix de conception qui ne vient d’aucun texte. La limite d’exploitation vient du Code de l’énergie : le chauffage d’un logement est limité à 19 °C en moyenne (art. R. 241-26). En cas d’inoccupation, le même code fixe 16 °C au plus de 24 h à moins de 48 h, et 8 °C au plus à partir de 48 h (art. R. 241-27). La tolérance dit de combien la température réelle peut s’écarter de la consigne. La régulation par pièce propose au moins quatre allures : confort, réduit, hors gel, arrêt (art. R. 241-31-1, obligatoire pour les permis déposés à partir du 1er janvier 2027). Ce geste remplit les colonnes « θ hiv. » et « θ réd. » de la feuille.`,
      prompt: "Lisez le tableau des allures, puis l’exemple résolu.",
      render: () => tableau(["Allure", "Ce que c’est"], [
        ["Confort", "La consigne de calcul, quand le logement est occupé"],
        ["Réduit", "Une température plus basse, par exemple la nuit : le bureau d’études la choisit"],
        ["Hors gel", "La température la plus basse, qui protège l’installation du gel pendant une longue absence"],
        ["Arrêt", "Le chauffage coupé"]
      ], "Les quatre allures de la régulation par pièce (Code de l’énergie, art. R. 241-31-1)")
        + BE.exemple({ text: `${EX.app.nom} : le propriétaire demande ${EX.app.hiver} °C, avec une tolérance de ± ${EX.app.tol} K ; le bureau d’études choisit un réduit de ${EX.app.reduit} °C de ${EX.app.confortA} à ${EX.app.confortDe}`, answer: `θ hiver = ${EX.app.hiver} °C ; θ réduit = ${EX.app.reduit} °C`, why: `${EX.app.hiver} °C est la consigne de calcul, écrite au CCTP du logement. Le réduit de ${EX.app.reduit} °C est un choix du bureau d’études pour le logement occupé : il ne se confond pas avec les 16 °C du Code de l’énergie, qui visent l’inoccupation.` })
        + BE.alerte("<strong>Piège.</strong> La limite de 19 °C en moyenne concerne l’exploitation du chauffage. Elle ne remplace pas la consigne de calcul du CCTP, que vous recopiez telle qu’elle est écrite.")
    }),

    BE.ecran({
      id: "ete-et-humidite", dossier: "methode", kicker: "La méthode, 3", title: "L’été et l’humidité", level: "comprendre",
      text: "En été, le Code de l’énergie ne fixe pas de température à atteindre. Il fixe un seuil : un système de refroidissement ne doit fonctionner que lorsque la température intérieure dépasse 26 °C (art. R. 241-30, en vigueur depuis le 1er juillet 2007). Le bureau d’études retient ce 26 °C comme température d’été des pièces principales pour le bilan d’été (stations T6 à T8). Pour l’humidité, aucun texte ne l’impose dans un logement. Le bureau d’études note un repère de confort, de 40 à 60 % d’humidité relative, qui est une valeur d’exercice. Ce geste remplit les colonnes « θ été » et « HR » de la feuille.",
      prompt: "Regardez le schéma, lisez le tableau, puis l’exemple résolu.",
      render: () => BE.schema("illustrations/schema-seuil-ete.svg", `Schéma de principe, en deux parties. En haut, une échelle de température intérieure de 18 à 30 °C, coupée à ${EX.app.ete} °C par un trait orange : le seuil. À gauche du seuil, case grise : le refroidissement ne fonctionne pas. À droite, case orange clair : il peut fonctionner. En bas, une échelle d’humidité relative de 0 à 100 % : la zone de ${EX.app.hr} est colorée en bleu clair, c’est le repère, une valeur d’exercice qu’aucun texte n’impose.`, `En été, ${EX.app.ete} °C est un seuil au-dessus duquel un refroidissement peut fonctionner ; l’humidité n’a qu’un repère.`) + tableau(["Donnée", "Valeur", "Source"], [
        ["Seuil de fonctionnement d’un refroidissement", "au-dessus de 26 °C", "Code de l’énergie, art. R. 241-30"],
        ["Température d’été retenue pour les pièces principales", "26 °C", "Code de l’énergie, art. R. 241-30, reprise comme repère"],
        ["Humidité relative visée", `${EX.app.hr}`, "Valeur d’exercice : aucun texte ne l’impose dans un logement"]
      ], "L’été et l’humidité dans le tableau des locaux")
        + BE.exemple({ text: `${EX.app.nom} : trois pièces principales, une cuisine, une salle de bains avec WC, une entrée`, answer: `θ été = ${EX.app.ete} °C dans les trois pièces principales ; humidité ${EX.app.hr} dans toutes les pièces chauffées`, why: "La température d’été ne se note que pour les pièces principales. L’humidité se note pour toutes les pièces chauffées, avec la mention « valeur d’exercice »." })
        + BE.renvoi('L’humidité relative est expliquée par <a href="../../../aerorezo/stations/hygrometrie/index.html">AéroRézo, « L’humidité relative »</a> ; elle se lit sur le diagramme de l’air humide à <a href="../a1-air-humide/index.html">la station A1</a>.')
    }),

    BE.ecran({
      id: "l-air-qui-entre-et-sort", dossier: "methode", kicker: "La méthode, 4", title: "L’air qui entre et l’air qui sort", level: "comprendre",
      image: "illustrations/3-air-entre-et-sort.webp", imageAlt: "Coupe d’une maison de deux niveaux. Des filets d’air bleus entrent par des entrées d’air au-dessus des fenêtres de la chambre et du séjour, traversent la circulation entre les pièces, puis sont repris par des bouches au plafond de la salle de bains, de la cuisine et du WC. Des gaines relient ces bouches à un ventilateur orange posé en toiture.",
      text: "Un logement se ventile pour évacuer l’humidité, les odeurs et les polluants que produisent les occupants et leurs activités, surtout en cuisine, en salle de bains et aux WC. L’air neuf entre dans les pièces principales par les entrées d’air, traverse le logement par les circulations et sort par les pièces de service, où des bouches d’extraction le reprennent. C’est le principe d’une VMC, une ventilation mécanique contrôlée, dite simple flux quand seule l’extraction est mécanique. L’arrêté du 24 mars 1982 fixe le débit que chaque pièce de service doit pouvoir extraire, d’après le nombre de pièces principales. Ce geste remplit la colonne « air » du tableau des locaux.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "L’air entre", rows: [["Où :", "dans les pièces principales, séjour et chambres."], ["Comment :", "par des entrées d’air dans les fenêtres ou les murs."]] },
        { title: "L’air traverse", rows: [["Où :", "dans les circulations, entrée, dégagement, palier."], ["Comment :", "par un passage sous les portes intérieures."]] },
        { title: "L’air sort", rows: [["Où :", "dans les pièces de service, cuisine, salle de bains, WC."], ["Comment :", "par des bouches d’extraction reliées au ventilateur."]] }
      ])
        + BE.renvoi('La théorie est à <a href="../../../aerorezo/stations/besoin-air/index.html">AéroRézo, « Pourquoi ventiler ? »</a>.')
    }),

    BE.ecran({
      id: "lire-le-tableau-de-l-article-3", dossier: "methode", kicker: "La méthode, 5", title: "Lire le tableau de l’article 3", level: "comprendre",
      text: "L’article 3 de l’arrêté du 24 mars 1982, modifié par l’arrêté du 28 octobre 1983, donne les débits que les bouches d’extraction doivent pouvoir atteindre, simultanément ou non, dans chaque pièce de service. Le tableau se lit en quatre gestes. Comptez les pièces principales. Repérez la ligne qui porte ce nombre, la dernière valant pour cinq pièces et plus. Repérez la colonne de chaque pièce de service et lisez le débit au croisement. Additionnez les débits des pièces de service : le total est le débit à atteindre, en m³/h. Ce geste remplit le bloc « ventilation » de la feuille.",
      prompt: "Lisez le tableau, l’exemple résolu et les trois pièges.",
      render: () => tableau(["Pièces principales", ...EX.art3.entetes], EX.art3.lignes, "Arrêté du 24 mars 1982 modifié, article 3 : débits extraits à atteindre, en m³/h. La colonne « salle de bains ou de douches » vaut avec ou sans cabinet d’aisances dans la même pièce (Légifrance, lu le 31/10/2026)")
        + exempleLecture()
        + BE.alerte("<strong>Piège.</strong> Une salle de bains qui contient un WC est une seule pièce de service. On lit la colonne « salle de bains ou de douches » et on n’ajoute pas de WC.")
        + BE.alerte("<strong>Piège.</strong> Dès que le logement compte deux WC séparés ou plus, chaque WC se lit dans la colonne « WC multiples ».")
        + BE.alerte("<strong>Piège.</strong> La colonne « autre salle d’eau » vaut pour une pièce d’eau sans baignoire ni douche. Une salle d’eau avec douche se lit dans la colonne « salle de bains ou de douches ».")
        + BE.renvoi("Le tableau ne donne aucune colonne pour un cellier, une buanderie ou un débarras : l’arrêté ne leur attribue aucun débit. Ces locaux n’ajoutent rien au total.")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, lire l’article 3", title: "Exercice : le débit d’une salle de bains avec WC", level: "appliquer", requiresAction: true,
      text: {
        1: "Un logement de deux pièces principales compte un séjour, une chambre, une cuisine et une salle de bains qui contient un WC. Cherchez dans le tableau de l’article 3 le débit que la bouche de la salle de bains doit pouvoir extraire. L’exemple résolu reste sous vos yeux : refaites le même geste.",
        2: "Un logement de deux pièces principales compte un séjour, une chambre, une cuisine et une salle de bains qui contient un WC. Cherchez dans le tableau de l’article 3 le débit que la bouche de la salle de bains doit pouvoir extraire. Cherchez sans l’exemple."
      },
      prompt: { 1: "Choisissez le bon débit, en vous aidant de l’exemple.", 2: "Choisissez le bon débit. Cette question est à faire seul." },
      aides: {
        1: ["Le nombre de pièces principales est dans l’énoncé. Le tableau est à l’écran « Lire le tableau de l’article 3 ».", "Repérez la ligne du nombre de pièces principales. La salle de bains qui contient un WC est une seule pièce de service : cherchez la colonne qui porte son nom.", `Dans l’appartement d’exemple, la ligne de ${EX.app.pp} pièces principales et la colonne « salle de bains ou de douches » donnent le débit de la salle de bains avec WC. Faites la même lecture sur la ligne de 2 pièces principales.`],
        2: ["Le nombre de pièces principales est dans l’énoncé. Le tableau est à l’écran « Lire le tableau de l’article 3 ».", "Repérez la ligne du nombre de pièces principales, puis la colonne de la salle de bains. Une salle de bains qui contient un WC reste une seule pièce de service.", `Dans un autre logement de ${EX.app.pp} pièces principales, on lit la ligne ${EX.app.ligne} et une seule colonne pour la salle de bains avec WC. Faites la même lecture sur la ligne de 2 pièces principales.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleLecture(), EX.ex2),
        2: BE.quiz(EX.ex2)
      })
    }),

    BE.ecran({
      id: "debits-reduits", dossier: "methode", kicker: "La méthode, 6", title: "Les débits réduits de l’article 4", level: "comprendre",
      text: "L’article 4 autorise une réduction du débit total extrait, à une condition : le logement a des dispositifs individuels de réglage, comme les bouches d’une VMC hygroréglable, dont le débit suit l’humidité de la pièce. Le débit total peut alors descendre jusqu’au débit total minimal du tableau, lu avec le nombre de pièces principales, sans que la cuisine passe sous son minimal. Sans dispositif de réglage, les débits de l’article 3 restent à atteindre. L’article 4 donne aussi un second tableau, « en tout état de cause », de 10 à 35 m³/h : cette station ne s’en sert pas. Ce geste remplit les lignes « total réduit » et « cuisine réduite » du bloc ventilation.",
      prompt: "Regardez le schéma, lisez le tableau, l’exemple résolu et l’alerte.",
      render: () => BE.schema("illustrations/schema-debits-reduits.svg", `Schéma de principe, en m³/h, pour l’appartement d’exemple. En haut, le total extrait : une longue barre grise, article 3, ${EX.app.total} ; dessous, une barre plus courte en bleu, article 4, minimum ${EX.app.rTotal}, prolongée par un cadre en pointillé : selon l’humidité. Plus bas, la cuisine : une barre grise, article 3, ${EX.app.cuisine} ; dessous, une barre bleue, minimum ${EX.app.rCuisine}, prolongée par un cadre en pointillé : selon l’humidité. En bas : avec une bouche hygroréglable, la bouche ajuste son débit à l’humidité de la pièce et l’article 4 s’applique ; avec une bouche autoréglable, le débit est constant, sans réduction.`, `Avec des bouches hygroréglables, le total peut descendre de ${EX.app.total} à ${EX.app.rTotal} m³/h et la cuisine de ${EX.app.cuisine} à ${EX.app.rCuisine} m³/h.`) + tableau(["Nombre de pièces principales", ...EX.art4.entetes], EX.art4.lignes, "Arrêté du 24 mars 1982 modifié, article 4 : débits réduits, en m³/h")
        + BE.exemple({ text: `${EX.app.nom} : ${EX.app.pp} pièces principales, VMC simple flux hygroréglable`, answer: `Colonne « ${EX.app.pp} pièces principales », ligne « Débit total minimal » : ${EX.app.rTotal} m³/h ; ligne « Débit minimal en cuisine » : ${EX.app.rCuisine} m³/h au moins`, why: `La VMC est hygroréglable : l’article 4 s’applique. Le débit total à atteindre de ${EX.app.total} m³/h peut descendre jusqu’à ${EX.app.rTotal} m³/h, la cuisine restant à ${EX.app.rCuisine} m³/h au moins.` })
        + BE.alerte("<strong>Alerte.</strong> Une VMC autoréglable a des bouches à débit fixe, sans dispositif de réglage individuel. L’article 4 ne s’applique pas : les débits de l’article 3 restent à atteindre.")
        + BE.renvoi("Hygroréglable : la bouche ajuste son débit à l’humidité de la pièce. Autoréglable : la bouche garde un débit constant.")
    }),

    BE.ecran({
      id: "occupation-et-horaires", dossier: "methode", kicker: "La méthode, 7", title: "Occupation et horaires", level: "comprendre",
      text: "Le tableau note qui occupe chaque pièce et quand. Le bureau d’études le choisit avec le maître d’ouvrage et l’écrit, parce que les stations suivantes s’en servent : les occupants produisent des apports de chaleur en été (station T7) et, dans un bâtiment tertiaire, ils fixent le débit d’air neuf (station A2). Les horaires disent quand chaque allure de chauffage s’applique : confort le jour, réduit la nuit. Pour un logement, on répartit les occupants : chacun est au séjour le soir et dans sa chambre la nuit. Ce geste remplit la colonne « Occ. » de la feuille. Les horaires s’écrivent dans le cadre « Hypothèses ».",
      prompt: "Regardez les deux schémas, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-horaires-allures.svg", `Schéma de principe : la température de consigne sur 24 h, de 0 h à 24 h. De 0 h à ${EX.app.confortDe}, la courbe reste à ${EX.app.reduit} °C : allure réduite. À ${EX.app.confortDe}, elle monte à ${EX.app.hiver} °C et y reste en orange jusqu’à ${EX.app.confortA} : allure confort, avec une bande bleu clair de tolérance, ± ${EX.app.tol} K. À ${EX.app.confortA}, elle redescend à ${EX.app.reduit} °C. Sous le schéma : la consigne de calcul de ${EX.app.hiver} °C est écrite au CCTP ; le réduit de ${EX.app.reduit} °C est un choix du bureau d’études.`, `Confort de ${EX.app.confortDe} à ${EX.app.confortA}, réduit le reste de la journée.`)
        + BE.schema("illustrations/schema-occupants-plan.svg", `Schéma de principe : deux fois le plan du séjour et des deux chambres. À gauche, soirée et repas : les ${EX.app.occTotal} occupants, deux points, sont au séjour. À droite, la nuit : un point dans la chambre A, un point dans la chambre B. Dessous : chaque occupant compte une fois, ${EX.app.occTotal} occupants en tout.`, "Le soir, les occupants sont au séjour ; la nuit, chacun est dans sa chambre.")
        + BE.exemple({ text: `${EX.app.nom} : ${EX.app.occTotal} occupants, qui dorment chacun dans une chambre ; confort de ${EX.app.confortDe} à ${EX.app.confortA}`, answer: EX.app.occTexte, why: `Chaque occupant compte au séjour le soir et dans sa chambre la nuit. Le confort va de ${EX.app.confortDe} à ${EX.app.confortA} : le réduit de ${EX.app.reduit} °C s’applique le reste de la journée.` })
        + BE.alerte("<strong>Hypothèse.</strong> Aucun texte ne répartit les occupants ni ne fixe les horaires. Le bureau d’études les note comme hypothèses, avec leur source.")
    }),

    BE.ecran({
      id: "impose-ou-choisi", dossier: "methode", kicker: "Exercice 3, imposé ou choisi", title: "Imposé ou choisi ?", level: "appliquer", requiresAction: true,
      text: {
        1: "Chaque donnée du tableau a une origine. Un texte l’impose quand une loi, un décret ou un arrêté fixe la valeur : le bureau d’études n’a pas le choix. Le CCTP l’impose quand le maître d’ouvrage l’a écrite dans la commande : le bureau d’études la reprend. Le bureau d’études la choisit quand ni l’un ni l’autre ne la donne : il la décide, la note comme hypothèse et la justifie. Le tableau ci-dessous classe des données de l’appartement. Classez ensuite chaque carte. Un exemple résolu est donné en tête de liste. Une valeur que la commande vous donne comme hypothèse du bureau d’études reste un choix du bureau d’études. Une valeur que le CCTP ou le maître d’ouvrage impose relève du CCTP. Une valeur d’un texte relève du texte. Ce geste remplit le bloc « Imposé ou choisi ? » de la feuille.",
        2: "Chaque donnée du tableau a une origine. Un texte l’impose quand une loi, un décret ou un arrêté fixe la valeur : le bureau d’études n’a pas le choix. Le CCTP l’impose quand le maître d’ouvrage l’a écrite dans la commande : le bureau d’études la reprend. Le bureau d’études la choisit quand ni l’un ni l’autre ne la donne : il la décide, la note comme hypothèse et la justifie. Le tableau ci-dessous classe des données de l’appartement. Classez ensuite chaque carte. Une valeur que la commande vous donne comme hypothèse du bureau d’études reste un choix du bureau d’études. Une valeur que le CCTP ou le maître d’ouvrage impose relève du CCTP. Une valeur d’un texte relève du texte. Ce geste remplit le bloc « Imposé ou choisi ? » de la feuille."
      },
      prompt: { 1: "Classez chaque carte, en vous aidant de l’exemple.", 2: "Classez chaque carte. Cette question est à faire seul." },
      aides: {
        1: ["Les trois origines sont décrites dans le texte, et le tableau juste au-dessus des cartes classe des exemples.", "Pour chaque carte, cherchez qui fixe la valeur : une loi ou un arrêté, le CCTP du logement, ou personne, et le bureau d’études décide.", "Sur une autre donnée, le nombre d’occupants est écrit dans la commande : il relève de la colonne du CCTP. Faites de même pour la première carte, en cherchant si un arrêté la fixe."],
        2: ["Les trois origines sont décrites dans le texte, et le tableau juste au-dessus des cartes classe des exemples.", "Pour chaque carte, cherchez qui fixe la valeur : une loi ou un arrêté, le CCTP du logement, ou personne, et le bureau d’études décide.", "Sur une autre donnée, la limite de 19 °C en moyenne est fixée par le Code de l’énergie : première colonne. Faites de même pour la première carte."]
      },
      ...(() => {
        const act = BE.parNiveau({
          1: BE.tri(EX.tri.lignes, EX.tri.labels, EX.tri.exemple),
          2: BE.tri(EX.tri.lignes, EX.tri.labels)
        });
        return { render: item => tableau(EX.tri.labels, EX.tri.tableau, "Imposé ou choisi : des données de l’appartement d’exemple") + act.render(item), wire: act.wire };
      })()
    }),

    BE.ecran({
      id: "exemple-complet", dossier: "methode", kicker: "La méthode, 8", title: "Exemple résolu complet : l’appartement", level: "comprendre",
      text: "Voici le tableau des locaux de l’appartement d’exemple, toutes les colonnes remplies. Les trois pièces principales ont une entrée d’air et une température d’été. La cuisine et la salle de bains avec WC sont des pièces de service : elles extraient l’air. L’entrée est une circulation. Au-dessous, le bloc ventilation donne le total à atteindre et les débits réduits, lus aux articles 3 et 4. Ce tableau montre comment se remplit le tableau des locaux de la feuille.",
      prompt: "Suivez le tableau ligne par ligne, puis lisez le bloc ventilation.",
      render: () => tableau(ENTETES_LOCAUX, EX.app.locaux, `Tableau des locaux de l’appartement d’exemple. ${LEGENDE_COLONNES} Débits en m³/h.`)
        + tableau(["Donnée", "Valeur", "Où elle se lit"], [
          ["Pièces principales", EX.app.pp, "Séjour, chambre A et chambre B"],
          ["Cuisine", `${EX.app.cuisine} m³/h`, `Article 3, ligne ${EX.app.ligne}, colonne « cuisine »`],
          ["Salle de bains avec WC", `${EX.app.sdb} m³/h`, `Article 3, ligne ${EX.app.ligne}, colonne « salle de bains ou de douches »`],
          ["Total à atteindre", `${EX.app.cuisine} + ${EX.app.sdb} = ${EX.app.total} m³/h`, "Somme des pièces de service"],
          ["Total minimal réduit", `${EX.app.rTotal} m³/h`, `Article 4, colonne « ${EX.app.pp} pièces principales », ligne « Débit total minimal » (VMC hygroréglable)`],
          ["Cuisine réduite", `${EX.app.rCuisine} m³/h au moins`, `Article 4, colonne « ${EX.app.pp} pièces principales », ligne « Débit minimal en cuisine »`]
        ], "Le bloc ventilation de l’appartement d’exemple")
        + BE.renvoi("Sources du tableau : la consigne d’hiver vient du CCTP du logement, la température d’été du Code de l’énergie (art. R. 241-30), les débits de l’arrêté de 1982 (art. 3) ; le reste est une valeur d’exercice.")
        + BE.alerte(`<strong>Piège.</strong> La salle de bains avec WC lue sur deux lignes donne ${EX.app.sdbEtWc} m³/h au lieu de ${EX.app.total} m³/h.`)
        + BE.renvoi("Les consignes de l’appartement, l’humidité, la tolérance, les horaires et les occupants sont des valeurs d’exercice.")
    }),

    BE.ecran({
      id: "batiment-tertiaire", dossier: "methode", kicker: "La méthode, 9", title: "Et dans un bâtiment tertiaire", level: "comprendre",
      text: `Dans un bâtiment tertiaire, l’air neuf se compte par occupant. Deux textes s’appliquent selon le local. Pour les locaux de travail, le Code du travail (art. R. 4222-6) fixe le débit minimal d’air neuf par occupant en ventilation mécanique. Pour un établissement recevant du public, le règlement sanitaire départemental (art. 64.1, texte type ; le RSD du département s’applique) fixe un débit par occupant selon l’usage du local. Les deux textes donnent des valeurs différentes pour un bureau : ${EX.tert.bureauCT} m³/h par occupant au Code du travail, ${EX.tert.bureauRSD} m³/h au règlement. Le bureau d’études retient le texte qui s’applique au local, et la valeur la plus exigeante quand les deux s’appliquent. Le niveau 3, dans la partie réservée aux classes, le fait sur un bâtiment tertiaire.`,
      prompt: "Lisez les deux tableaux, puis continuez.",
      render: () => tableau(["Local de travail", "Air neuf (m³/h par occupant)"], EX.tert.travail, "Code du travail, art. R. 4222-6 : débit minimal d’air neuf par occupant, ventilation mécanique")
        + tableau(["Local", "Air neuf (m³/h par occupant)"], EX.tert.rsd, `Règlement sanitaire départemental type, art. 64.1 : locaux à pollution non spécifique, interdiction de fumer. Hébergement : ${EX.tert.hebergement}`)
        + BE.renvoi("Cette partie est citée sans exercice : aucun débit de ces tableaux n’est demandé dans les niveaux 1 et 2.")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

/* Station BE-R3 : La supervision.
   Méthode sur la CTA du bâtiment de bureaux (le bâtiment d'exemple des stations T5 à T8, agrandi en bâtiment tertiaire), puis
   commande sur le noyau (niveau 1 : la CTA, les ventilo-convecteurs du bureau et de la salle de réunion) et sur le bâtiment entier
   (niveau 2). Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/r3-supervision/construire.mjs, depuis corriges/r3-supervision/reference-supervision.json
   (outils/r3-supervision-tertiaire.mjs). Le bâtiment n'apparaît que par la liste des points du CCTP (lot 6) et les valeurs des
   synoptiques, données de l'exercice. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/tertiaire/";

/*EXEMPLE-DEBUT*/
const EX = {
 "lot6": [
  {
   "id": "CTA",
   "nom": "Centrale de traitement d'air",
   "locaux": 1,
   "lignes": [
    [
     "Mesures",
     "température d'air neuf, température de soufflage, température de reprise, teneur en CO₂ de la salle de réunion"
    ],
    [
     "États",
     "marche du ventilateur de soufflage, marche du ventilateur de reprise"
    ],
    [
     "Commandes",
     "marche et arrêt, vitesse des ventilateurs, vanne de la batterie chaude, vanne de la batterie froide, registre de la salle de réunion"
    ],
    [
     "Alarmes",
     "défaut d'un ventilateur, filtre encrassé, antigel"
    ],
    [
     "Consignes",
     "température de soufflage, teneur en CO₂"
    ]
   ]
  },
  {
   "id": "GEG",
   "nom": "Groupe de production d'eau glacée",
   "locaux": 1,
   "lignes": [
    [
     "Mesures",
     "température de départ, température de retour"
    ],
    [
     "États",
     "marche"
    ],
    [
     "Commandes",
     "marche et arrêt"
    ],
    [
     "Alarmes",
     "défaut général"
    ],
    [
     "Consignes",
     "température de départ"
    ]
   ]
  },
  {
   "id": "PAC",
   "nom": "Pompe à chaleur",
   "locaux": 1,
   "lignes": [
    [
     "Mesures",
     "température de départ, température de retour"
    ],
    [
     "États",
     "marche"
    ],
    [
     "Commandes",
     "marche et arrêt"
    ],
    [
     "Alarmes",
     "défaut général"
    ],
    [
     "Consignes",
     "température de départ"
    ]
   ]
  },
  {
   "id": "PEG",
   "nom": "Pompe du circuit d'eau glacée",
   "locaux": 1,
   "lignes": [
    [
     "États",
     "marche"
    ],
    [
     "Commandes",
     "marche et arrêt"
    ],
    [
     "Alarmes",
     "défaut"
    ]
   ]
  },
  {
   "id": "VC",
   "nom": "Ventilo-convecteurs (un par local)",
   "locaux": 4,
   "par": [
    "Bureau",
    "Salle de réunion",
    "Plateau de bureaux",
    "Accueil et circulation"
   ],
   "lignes": [
    [
     "Mesures",
     "température du local"
    ],
    [
     "États",
     "marche"
    ],
    [
     "Commandes",
     "mode confort ou réduit"
    ],
    [
     "Consignes",
     "température du local"
    ]
   ]
  }
 ],
 "methode": {
  "comptes": {
   "points": 16,
   "mesures": 4,
   "etats": 2,
   "commandes": 5,
   "alarmes": 3,
   "consignes": 2,
   "E_TOR": 5,
   "E_ANA": 4,
   "S_TOR": 1,
   "S_ANA": 4,
   "LOG": 2
  },
  "points": [
   {
    "lib": "Température d'air neuf",
    "type": "mesure",
    "cl": "Entrée analogique"
   },
   {
    "lib": "Température de soufflage",
    "type": "mesure",
    "cl": "Entrée analogique"
   },
   {
    "lib": "Température de reprise",
    "type": "mesure",
    "cl": "Entrée analogique"
   },
   {
    "lib": "Teneur en CO₂ de la salle de réunion",
    "type": "mesure",
    "cl": "Entrée analogique"
   },
   {
    "lib": "Marche du ventilateur de soufflage",
    "type": "état",
    "cl": "Entrée tout ou rien"
   },
   {
    "lib": "Marche du ventilateur de reprise",
    "type": "état",
    "cl": "Entrée tout ou rien"
   },
   {
    "lib": "Marche et arrêt",
    "type": "commande",
    "cl": "Sortie tout ou rien"
   },
   {
    "lib": "Vitesse des ventilateurs",
    "type": "commande",
    "cl": "Sortie analogique"
   },
   {
    "lib": "Vanne de la batterie chaude",
    "type": "commande",
    "cl": "Sortie analogique"
   },
   {
    "lib": "Vanne de la batterie froide",
    "type": "commande",
    "cl": "Sortie analogique"
   },
   {
    "lib": "Registre de la salle de réunion",
    "type": "commande",
    "cl": "Sortie analogique"
   },
   {
    "lib": "Défaut d'un ventilateur",
    "type": "alarme",
    "cl": "Entrée tout ou rien"
   },
   {
    "lib": "Filtre encrassé",
    "type": "alarme",
    "cl": "Entrée tout ou rien"
   },
   {
    "lib": "Antigel",
    "type": "alarme",
    "cl": "Entrée tout ou rien"
   },
   {
    "lib": "Température de soufflage",
    "type": "consigne",
    "cl": "Logiciel"
   },
   {
    "lib": "Teneur en CO₂",
    "type": "consigne",
    "cl": "Logiciel"
   }
  ]
 },
 "ex": {
  "moment": "Lundi 10 h 15, hiver",
  "an": "4,0 °C",
  "souf": "18,8 °C",
  "rep": "21,2 °C",
  "co2": "760 ppm",
  "bc": "35 %",
  "reg": "30 %",
  "consSouf": "19,0 °C",
  "consCO2": "1 000 ppm",
  "ecartSouf": "-0,2"
 },
 "eg": {
  "moment": "Mardi 15 h, été",
  "dep": "7,2",
  "ret": "12,4",
  "cons": "7,0",
  "dT": "5,2",
  "ecart": "0,2",
  "regime": "7/12"
 },
 "hist": [
  {
   "date": "lundi 07:31",
   "alarme": "filtre encrassé",
   "evenement": "apparition"
  },
  {
   "date": "lundi 07:44",
   "alarme": "filtre encrassé",
   "evenement": "acquittement"
  },
  {
   "date": "lundi 14:20",
   "alarme": "filtre encrassé",
   "evenement": "disparition"
  }
 ],
 "horaires": {
  "jours": "lundi au vendredi",
  "debut": "7 h 30",
  "fin": "19 h"
 },
 "seuil": "2",
 "ent1": {
  "labels": [
   "Entrée TOR",
   "Entrée ANA",
   "Sortie TOR",
   "Sortie ANA",
   "Logiciel"
  ],
  "exemple": {
   "text": "Température de l'air soufflé (mesure)",
   "good": 1,
   "why": "Une mesure vient d’une sonde : l’automate la reçoit comme une valeur, sur une entrée analogique."
  },
  "lignes": [
   {
    "text": "Marche (état)",
    "good": 0
   },
   {
    "text": "Marche et arrêt (commande, deux positions)",
    "good": 2
   },
   {
    "text": "Vanne de la batterie (commande, de 0 à 100 %)",
    "good": 3
   },
   {
    "text": "Défaut (alarme)",
    "good": 0
   },
   {
    "text": "Température de l'air soufflé (consigne)",
    "good": 4
   }
  ]
 },
 "ent2": {
  "moment": "Jeudi 8 h 40, hiver",
  "souf": "12,4 °C",
  "cons": "19,0 °C",
  "bc": "100 %",
  "co2": "540 ppm",
  "quiz": {
   "choices": [
    "La batterie chaude : sa vanne ouverte à 100 % prouve qu’elle est en panne",
    "Le ventilateur de reprise : commandé en marche, il est à l’arrêt, et l’alarme de défaut le confirme",
    "La salle de réunion : à 540 ppm, le registre devrait être fermé",
    "Aucune : la CTA est commandée en marche et son ventilateur de soufflage tourne"
   ],
   "good": 1,
   "explain": "La CTA est commandée en marche ; le retour de marche du ventilateur de reprise dit « arrêt » : la commande et l’état ne concordent pas, et l’alarme de défaut d’un ventilateur est rouge. Sans air repris, le récupérateur ne réchauffe plus l’air neuf : la vanne de la batterie chaude s’ouvre en grand, et le soufflage reste à 12,4 °C pour 19,0 °C. La vanne ouverte en grand découle de ce défaut. Le registre de la salle reste à son débit de veille quand le CO₂ est bas : c’est normal."
  }
 },
 "ent3": {
  "n": "5",
  "par": "4",
  "quiz": {
   "choices": [
    "4 points : un ventilo-convecteur se compte une fois, quel que soit le nombre de locaux",
    "15 points : les consignes ne sont pas des points",
    "20 points : 5 entrées analogiques, 5 entrées tout ou rien, 5 sorties tout ou rien, 5 consignes",
    "20 points : 5 entrées analogiques, 10 entrées tout ou rien, 5 consignes"
   ],
   "good": 2,
   "explain": "Chaque ventilo-convecteur porte 4 points : une mesure (entrée analogique), un état (entrée tout ou rien), une commande à deux positions (sortie tout ou rien) et une consigne (logiciel). Le CCTP les demande pour chaque local : 5 × 4 = 20. La consigne compte : la supervision l’affiche et l’exploitant la règle, même si elle n’a ni entrée ni sortie. La commande de mode part de l’automate : c’est une sortie."
  }
 },
 "n1": {
  "moment": "Mercredi 9 h 30, hiver"
 },
 "n2": {
  "moment": "Mardi 10 h 30, été"
 },
 "consigne": {
  "co2": "1 000",
  "soufH": "19",
  "soufE": "17"
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const X = () => EX.ex;
const M = () => EX.methode.comptes;
const figCTA = () => BE.schema("illustrations/synoptique-cta-exemple.svg", `Synoptique de la CTA, ${X().moment}. En haut, la ligne des consignes : soufflage ${X().consSouf}, CO₂ ${X().consCO2}. Deux gaines horizontales. En haut, l’air repris des locaux va de droite à gauche : sonde de reprise (cadre ${X().rep}), filtre, ventilateur de reprise, récupérateur à plaques, registre, rejet. En bas, l’air neuf va de gauche à droite : registre, sonde d’air neuf (cadre ${X().an}), filtre, récupérateur, batterie chaude BC (vanne ${X().bc}), batterie froide BF (vanne 0 %), ventilateur de soufflage (vitesse en pointillé), sonde de soufflage (cadre ${X().souf}). Les deux ventilateurs ont un rond vert : en marche ; la CTA est commandée en marche. Salle de réunion : CO₂ ${X().co2}, registre ${X().reg}. Trois alarmes, ronds gris : aucune n’est active. En bas, la légende des cadres.`, "Cadre plein : une mesure. Cadre en pointillé : une commande.");
const exempleCTA = () => BE.exemple({ text: `CTA du bâtiment d’exemple, ${M().points} points au lot 6 du CCTP`, answer: `${M().E_TOR} entrées tout ou rien, ${M().E_ANA} analogiques ; ${M().S_TOR} sortie tout ou rien, ${M().S_ANA} analogiques ; ${M().LOG} logiciel (consignes)`, why: "Les deux états et les trois alarmes arrivent par des contacts ; les quatre mesures par des sondes ; seule la marche et arrêt n’a que deux positions ; les deux consignes sont des réglages." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "La liste des points est sous la commande, telle que le CCTP l’écrit au lot 6. Le synoptique du noyau est sous la liste et au verso de la feuille.",
      "Dans l’ordre : classer dix points (écran « Entrées et sorties »), compter les points du noyau (écran « Ce que le CCTP demande au lot GTB »), lire le synoptique (écran « Lire un synoptique »), traiter l’alarme (écran « Les alarmes »).",
      "La colonne CTA de l’exercice 2 est l’exemple de la méthode. Il reste deux ventilo-convecteurs, de quatre points chacun."
    ],
    2: [
      "La liste des points est sous la commande, telle que le CCTP l’écrit au lot 6. La vue d’ensemble est sous la liste et au recto de la feuille.",
      "Synoptique et anomalies, tableau des points, lot GTB, note de calcul.",
      "Pour chaque équipement : la commande et l’état, la mesure et sa consigne, le mode et les horaires, les alarmes."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const lot6 = () => tableau(["Équipement", "Ce que la supervision affiche ou commande"], EX.lot6.map(e => [e.par ? `${e.nom} : ${e.par.join(", ")}` : e.nom, e.lignes.map(l => `${l[0]} : ${l[1]}.`).join(" ")]), "CCTP, page 4, lot 6, Gestion technique du bâtiment (valeurs d’exercice)");
const donneesProjet = BE.parNiveau({
  1: { render: () => lot6() + BE.schema("illustrations/synoptique-noyau.svg", `Synoptique du noyau, ${EX.n1.moment}. En haut, la CTA dessinée comme à l’écran « Lire un synoptique », avec ses valeurs du moment dans des cadres. En bas, le tableau des ventilo-convecteurs du bureau et de la salle de réunion : état, mesure, consigne, mode. Les valeurs se lisent sur la figure ou sur la feuille, au verso.`, "Le synoptique du noyau, à lire.") },
  2: { render: () => lot6() + BE.schema("illustrations/synoptique-batiment.svg", `Vue d’ensemble du bâtiment, ${EX.n2.moment}. En haut, le circuit d’eau glacée : groupe, pompe, départ et retour avec leurs valeurs et la consigne de départ. Puis la pompe à chaleur, la CTA, et le tableau des quatre ventilo-convecteurs : état, mesure, consigne, mode. Les valeurs se lisent sur la figure ou sur la feuille, au recto.`, "La vue d’ensemble du bâtiment, à lire. Ventilo-convecteurs : la colonne Consigne donne la consigne de confort du local, quel que soit le mode.") }
});
ecranProjet.render = item => { const html = rendreCommande(item); return html.includes("partie-reservee") ? html : html + donneesProjet.render(item)
  + BE.renvoi(`Consignes du CCTP : soufflage ${EX.consigne.soufH} °C l’hiver et ${EX.consigne.soufE} °C l’été, CO₂ ${EX.consigne.co2} ppm, départs aux régimes de production, locaux aux températures des conditions de calcul. Horaires : ${EX.horaires.jours}, ${EX.horaires.debut} à ${EX.horaires.fin}. Écart à signaler : plus de ${EX.seuil} K (donnée de l’exercice).`)
  + BE.liens([{ href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment de bureaux", note: "Lot 6, Gestion technique du bâtiment, page 4" }]); };

BE.station({
  code: "BE-R3",
  titre: "La supervision",
  ligne: "Régulation et énergie",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bâtiment de bureaux, le noyau, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Le bâtiment de bureaux entier, liste des points, synoptique et note, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "La station R2 a écrit la séquence de régulation de la CTA. Un exploitant suit l’installation depuis un poste de supervision : il lit les mesures, les états et les alarmes, il règle les consignes et les horaires. Vous apprenez à classer les points que le CCTP demande au lot GTB, à lire un synoptique et à y trouver une anomalie. Vous lisez la supervision, vous ne la concevez pas. La méthode se fait sur la CTA du bâtiment de bureaux, puis vous la faites sur le noyau et sur le bâtiment entier.",
  note: "La liste des points vient du CCTP du bâtiment de bureaux, lot 6 ; c’est une liste d’exercice. Les valeurs affichées sur les synoptiques, l’historique et les équipements des entraînements sont des données de l’exercice, écrites pour cette station.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur la CTA du bâtiment" },
    { id: "projet", label: "Le projet", note: "commande, données et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Liste des points classés et lecture du synoptique du noyau du bâtiment de bureaux",
      delai: "Rendu en fin de séance",
      commande: [
        "Le maître d’ouvrage veut vérifier ce que la supervision montrera du noyau du bâtiment de bureaux : la CTA, les ventilo-convecteurs du bureau et de la salle de réunion. La liste des points est au lot 6 du CCTP, page 4, recopiée sous la commande. Suivez les étapes dans l’ordre.",
        "Étape 1. Au recto de la feuille, classez dix points : leur sorte, puis entrée ou sortie, tout ou rien ou analogique.",
        "Étape 2. Comptez les points du noyau, par sorte puis par entrée ou sortie. La colonne CTA reprend l’exemple de la méthode.",
        "Étape 3. Au verso, lisez cinq valeurs du synoptique, puis traitez l’alarme active. Reportez les trois cases en trait double à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Liste des points (lot 6)", ou: "CCTP, page 4, recopiée sous la commande" },
        { piece: "Synoptique du noyau", ou: "Sous la liste et au verso de la feuille" },
        { piece: "Classement des points", ou: "Écran « Entrées et sorties »" },
        { piece: "Lecture des valeurs et des voyants", ou: "Écran « Lire un synoptique »" },
        { piece: "Alarmes et acquittement", ou: "Écran « Les alarmes »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Liste des points classés du bâtiment de bureaux, lecture de la vue d’ensemble, note de calcul",
      delai: "Rendu en fin de séance",
      commande: "Le maître d’ouvrage veut vérifier la supervision du bâtiment de bureaux avant la réception du lot GTB. Lisez la vue d’ensemble du bâtiment au moment indiqué : trouvez les deux anomalies, dites ce que vous lisez et pourquoi c’en est une, et donnez l’écart entre le départ d’eau glacée et sa consigne. Dressez le tableau des points du lot 6 du CCTP, classés par sorte et par entrée ou sortie, équipement par équipement. Dites ce que le CCTP demande au lot GTB, avec ses horaires, et ce que fait le bureau d’études. Rédigez la première page de la note de calcul. Citez la source de chaque donnée.",
      pieces: [
        { piece: "Liste des points (lot 6) et horaires", ou: "CCTP, pages 4 et 2, recopiée sous la commande" },
        { piece: "Vue d’ensemble du bâtiment", ou: "Sous la liste et au recto de la feuille" },
        { piece: "Consignes", ou: "CCTP, rappelées sous la commande" },
        { piece: "Méthode", ou: "Écrans de la méthode, de « La chaîne de la supervision » à « La note de calcul »" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "r3-n1-points", libelle: "Nombre de points du noyau", unite: "", min: 24, max: 24, indice: "Relisez l’écran « Ce que le CCTP demande au lot GTB » : chaque élément de la liste du lot 6, séparé par une virgule, est un point, consignes comprises, et les ventilo-convecteurs se comptent une fois par local. Le compte est exact." },
      { id: "r3-n1-etor", libelle: "Nombre d’entrées tout ou rien du noyau", unite: "", min: 7, max: 7, indice: "Relisez l’écran « Entrées et sorties » : les états et les alarmes arrivent sur des entrées tout ou rien ; une commande est une sortie. Le compte est exact." },
      { id: "r3-n1-souffle", libelle: "Température de soufflage lue", unite: "°C", min: 19.3, max: 20.3, indice: "Relisez l’écran « Lire un synoptique » : la température de soufflage est dans le cadre plein sous la sonde, à droite du ventilateur ; la consigne est écrite en haut. À 0,5 K près." }
    ],
    2: [
      { id: "r3-n2-points", libelle: "Nombre de points du bâtiment", unite: "", min: 47, max: 47, indice: "Relisez l’écran « Ce que le CCTP demande au lot GTB » : chaque élément de la liste du lot 6, séparé par une virgule, est un point, consignes comprises, et les ventilo-convecteurs se comptent une fois par local. Le compte est exact." },
      { id: "r3-n2-etor", libelle: "Nombre d’entrées tout ou rien du bâtiment", unite: "", min: 15, max: 15, indice: "Relisez l’écran « Entrées et sorties » : les états et les alarmes arrivent sur des entrées tout ou rien ; une commande est une sortie. Le compte est exact." },
      { id: "r3-n2-stor", libelle: "Nombre de sorties tout ou rien du bâtiment", unite: "", min: 8, max: 8, indice: "Relisez l’écran « Entrées et sorties » : une commande à deux positions (marche et arrêt, confort ou réduit) est une sortie tout ou rien ; vitesse, vannes et registre sont des sorties analogiques. Le compte est exact." },
      { id: "r3-n2-ecart", libelle: "Écart entre le départ d’eau glacée et sa consigne", unite: "K", min: 4.1, max: 5.1, indice: "Relisez l’écran « Le circuit d’eau glacée » : écart = température de départ lue − consigne de départ, en kelvins, au dixième. À 0,5 K près." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-R4", titre: "L’énergie sur l’année", href: "../r4-energie-annee/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-R2, Réguler la CTA", href: "../r2-reguler-cta/index.html", pourquoi: "Les sondes, les organes commandés et la séquence que le synoptique montre." },
    { reseau: "Bureau d’études", titre: "BE-R4, L’énergie sur l’année", href: "../r4-energie-annee/index.html", pourquoi: "La suite de la ligne : ce que l’installation consomme sur une année." },
    { reseau: "Pilote Fluides", titre: "La chaîne d’énergie et d’information", href: "../../../packs/fluides/res/chaine-energie-information-interactif/index.html", pourquoi: "Acquérir, traiter, communiquer : les trois maillons de l’information." },
    { reseau: "inerWeb Plan", titre: "CVC-R 5, Le synoptique de régulation", href: "../../../plan/gares/cvcr5-synoptique-regulation/index.html", pourquoi: "Sondes, régulateur, liaisons de mesure et de commande sur un synoptique de chauffage." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : vérifier ce que la supervision du bâtiment de bureaux montrera, et la lire. Le CCTP donne au lot 6 la liste des points de chaque équipement. Vous classez ces points, vous les comptez, puis vous lisez un synoptique : les valeurs, les voyants, les alarmes. Vous cherchez ce qui ne va pas. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Ce que vous trouvez", "Où"], [
        ["La sorte de chaque point : mesure, état, commande, alarme, consigne", "Lot 6 du CCTP"],
        ["Entrée ou sortie, tout ou rien ou analogique", "Écran « Entrées et sorties »"],
        ["Le nombre de points, par équipement", "Lot 6 du CCTP"],
        ["Les valeurs lues et les anomalies du synoptique", "Synoptique"],
        ["Ce que le CCTP demande au lot GTB", "CCTP, page 4"]
      ], "Le tableau à remplir, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la liste des points et le synoptique du bâtiment."], ["Le dossier :", "le CCTP du bâtiment de bureaux, lot 6."]] },
          { title: "Vous produisez", rows: [["La feuille :", "les points classés, les valeurs lues, les anomalies."], ["Le contrôle :", "les comptes exacts et les valeurs lues, à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station R4, l’énergie sur l’année."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "La liste des points vient du CCTP du bâtiment de bureaux, lot 6, page 4 : pour chaque équipement, ce que la supervision affiche ou commande. Le maître d’ouvrage la choisit ; ici, c’est une liste d’exercice. Les consignes viennent du CCTP : soufflage et batteries page 3, CO₂ page 4, températures des locaux page 1. Les horaires sont ceux de l’occupation, page 2. Les valeurs affichées sur les synoptiques sont des données de l’exercice : elles décrivent un moment de la vie du bâtiment.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Liste des points de chaque équipement", "CCTP, page 4, lot 6"],
        ["Ce que fait le lot GTB : afficher, horodater, alarmer", "CCTP, page 4, lot 6"],
        ["Horaires d’occupation", "CCTP, page 2"],
        [`Consignes de soufflage (${EX.consigne.soufH} et ${EX.consigne.soufE} °C) et régimes de production`, "CCTP, page 3"],
        [`Consigne de CO₂ (${EX.consigne.co2} ppm), sonde en 0-10 V`, "CCTP, page 4, lot 5"],
        ["Valeurs des synoptiques, historique, écart à signaler", "Cette station, données de l’exercice"],
        ["Acquérir, traiter, communiquer", "Cours inerWeb « La chaîne d’énergie et d’information »"]
      ], "Les données de la station")
        + BE.renvoi('Les sondes et les organes de la CTA se placent à <a href="../r2-reguler-cta/index.html">la station R2</a>.')
    }),

    BE.ecran({
      id: "chaine", dossier: "methode", kicker: "La méthode, 1", title: "La chaîne de la supervision", level: "comprendre",
      text: "Une sonde mesure la température de soufflage : elle acquiert l’information. L’automate de la CTA, posé dans son armoire, compare cette mesure à la consigne et décide : il traite. Il commande les appareils, par exemple le ventilateur ou la vanne d’une batterie. Le poste de supervision est relié aux automates par un réseau : il affiche les valeurs, horodate les événements (il note la date et l’heure de chacun) et alarme l’exploitant ; il communique. L’exploitant y règle les consignes et les horaires, qui redescendent vers l’automate. La supervision ne remplace pas la régulation : si le poste s’arrête, l’automate continue de régler la CTA et de la protéger.",
      prompt: "Suivez la mesure, puis la commande, sur le schéma.",
      render: () => BE.schema("illustrations/chaine.svg", "Trois colonnes. Acquérir : la sonde de soufflage, reliée en pointillé à l’automate. Traiter : l’automate de la CTA, qui commande le ventilateur de soufflage par un trait mixte vers le bas, marqué Agir. Communiquer : le poste de supervision, relié à l’automate par deux flèches de réseau, une dans chaque sens ; il affiche, horodate et alarme. En bas, la légende : pointillé pour une mesure, trait mixte pour une commande, trait plein pour le réseau.", "La sonde acquiert, l’automate traite, le poste communique.")
        + BE.alerte("<strong>Piège.</strong> Croire que la supervision règle la CTA : elle montre et elle transmet des réglages, l’automate régule et protège sur place.")
        + BE.renvoi('Les trois maillons de l’information, sur une chambre froide : <a href="../../../packs/fluides/res/chaine-energie-information-interactif/index.html">le cours « La chaîne d’énergie et d’information »</a>.')
    }),

    BE.ecran({
      id: "sortes-de-points", dossier: "methode", kicker: "La méthode, 2", title: "Les cinq sortes de points", level: "comprendre",
      text: "Un point est une information que la supervision affiche ou envoie. Il y en a cinq sortes. Une mesure est une valeur lue par une sonde : une température, une teneur en CO₂. Un état dit si un appareil tourne ou non : il vient d’un contact de l’appareil. Une commande est un ordre de l’automate vers un appareil : marche, position d’une vanne. Une alarme signale un défaut : elle vient d’un contact de défaut. Une consigne est la valeur à tenir, réglée par l’exploitant. Le lot 6 du CCTP range les points de chaque équipement dans ces cinq sortes.",
      prompt: "Lisez les cinq lignes du schéma et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/cinq-sortes.svg", `Un tableau de cinq lignes. Mesure : un cadre plein ${X().souf}, vient d’une sonde. État : un rond vert « marche », vient d’un contact de l’appareil. Commande : un cadre en pointillé ${X().bc}, va de l’automate vers l’appareil. Alarme : un rond rouge « filtre », vient d’un contact de défaut. Consigne : « consigne ${X().consSouf} », réglée par l’exploitant au clavier.`, "Chaque sorte a sa façon d’apparaître sur le synoptique.")
        + BE.exemple({ text: "La teneur en CO₂ de la salle de réunion, deux fois dans le lot 6", answer: `en mesures : la valeur lue par la sonde ; en consignes : la valeur à tenir, ${EX.consigne.co2} ppm`, why: "Le même mot désigne deux points : ce que la salle contient, et ce qu’elle doit contenir au plus." })
        + BE.alerte("<strong>Piège.</strong> Prendre une consigne pour une mesure : la consigne ne bouge que si l’exploitant la change ; la mesure suit la salle.")
    }),

    BE.ecran({
      id: "entrees-sorties", dossier: "methode", kicker: "La méthode, 3", title: "Entrées et sorties", level: "comprendre",
      text: "L’automate reçoit des entrées et envoie des sorties. Une entrée tout ou rien (TOR) n’a que deux états, ouvert ou fermé : c’est le cas des états et des alarmes. Une entrée analogique (ANA) porte une valeur : c’est le cas des mesures, par exemple la sonde de CO₂ qui donne 0 à 10 V (CCTP, page 4). Une commande à deux positions, marche et arrêt ou confort et réduit, est une sortie tout ou rien. Une commande de 0 à 100 % est une sortie analogique : la vitesse des ventilateurs, les vannes des batteries, le registre de la salle. Une consigne n’a ni entrée ni sortie : sa classe est « logiciel », une valeur gardée par l’automate.",
      prompt: "Suivez les entrées à gauche, les sorties à droite, puis lisez le tableau de la CTA.",
      render: () => BE.schema("illustrations/entrees-sorties.svg", "L’automate au centre. À gauche, ses entrées : tout ou rien, le retour de marche et le filtre encrassé ; analogiques, la sonde de soufflage et la sonde de CO₂. À droite, ses sorties : tout ou rien, la marche et arrêt ; analogiques, la vanne de batterie et la vitesse. Au centre de l’automate, un cadre en pointillé : le logiciel, avec les consignes et les horaires. En bas, le poste de supervision, relié par le réseau.", "TOR : deux états. ANA : une valeur.")
        + tableau(["Point de la CTA", "Sorte", "Classe"], EX.methode.points.map(p => [p.lib, p.type, p.cl]), "Les points de la CTA, lot 6 du CCTP, classés")
        + exempleCTA()
        + BE.alerte("<strong>Piège.</strong> Prendre un état pour une commande. « Marche du ventilateur de soufflage » est un état : un contact dit s’il tourne. « Marche et arrêt » est la commande : l’ordre de tourner.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, le classement", title: "Entraînement : classer des points", level: "appliquer", requiresAction: true,
      text: {
        1: "Un autre bâtiment a un rideau d’air chaud à sa porte d’entrée. Sa liste porte six points. Classez chacun : entrée ou sortie, tout ou rien ou analogique, ou logiciel. L’exemple résolu montre le premier.",
        2: "Un autre bâtiment a un rideau d’air chaud à sa porte d’entrée. Classez ses points : entrée ou sortie, tout ou rien ou analogique, ou logiciel."
      },
      prompt: { 1: "Classez chaque point.", 2: "Classez chaque point. Cette question est à faire seul." },
      aides: {
        1: ["Les règles sont à l’écran « Entrées et sorties ».", "Regardez d’abord la sorte, écrite entre parenthèses ; puis, pour une commande, le nombre de positions.", "Une alarme arrive comme un état : par un contact, sur une entrée tout ou rien."],
        2: ["La méthode est à l’écran « Entrées et sorties ».", "Mesure, état, alarme : entrées. Commande : sortie. Consigne : logiciel.", "La vanne de la batterie se règle de 0 à 100 % : sortie analogique."]
      },
      ...BE.parNiveau({
        1: { render: item => BE.tri(EX.ent1.lignes, EX.ent1.labels, EX.ent1.exemple).render(item), wire: item => BE.tri(EX.ent1.lignes, EX.ent1.labels, EX.ent1.exemple).wire(item) },
        2: { render: item => BE.tri(EX.ent1.lignes, EX.ent1.labels).render(item), wire: item => BE.tri(EX.ent1.lignes, EX.ent1.labels).wire(item) }
      })
    }),

    BE.ecran({
      id: "synoptique", dossier: "methode", kicker: "La méthode, 4", title: "Lire un synoptique", level: "comprendre",
      text: `Un synoptique est l’écran de supervision d’un équipement : son schéma de principe, avec les valeurs du moment posées à côté des symboles. Les sections de la CTA sont celles du CCTP, page 3, dans l’ordre de l’air. Une mesure s’affiche dans un cadre plein, près de sa sonde ; une commande dans un cadre en pointillé, près de l’appareil commandé. Un rond vert dit qu’un appareil tourne, un rond gris qu’il est à l’arrêt ou qu’une alarme est éteinte, un rond rouge qu’une alarme est active. Les consignes s’écrivent en haut. On lit chaque valeur avec son unité, puis on la compare à sa consigne.`,
      prompt: "Lisez les symboles, puis les valeurs du synoptique et l’exemple résolu.",
      render: () => BE.schema("illustrations/legende-symboles.svg", "Les symboles du synoptique avec leur nom : registre, filtre, récupérateur à plaques, batterie (BC chaude, BF froide), ventilateur, sonde de température, groupe d’eau glacée, pompe.", "Les symboles du synoptique.")
        + figCTA()
        + BE.exemple({ text: `Synoptique de la CTA, ${X().moment}`, answer: `air neuf ${X().an} ; soufflage ${X().souf} pour une consigne de ${X().consSouf}, soit ${X().ecartSouf} K ; reprise ${X().rep} ; CO₂ ${X().co2} ; vanne de la batterie chaude ${X().bc}`, why: "Chaque valeur se lit dans le cadre de sa sonde ou de son appareil ; l’écart au soufflage est faible, la vanne de la batterie chaude est en partie ouverte : la CTA tient sa consigne." })
    }),

    BE.ecran({
      id: "eau-glacee", dossier: "methode", kicker: "La méthode, 5", title: "Le circuit d’eau glacée", level: "comprendre",
      text: `Le groupe de production d’eau glacée refroidit l’eau glycolée ; la pompe du circuit l’envoie vers la batterie froide de la CTA et les ventilo-convecteurs, puis l’eau revient au groupe. Le régime du CCTP est ${EX.eg.regime} : départ à ${EX.eg.regime.split("/")[0]} °C, retour à ${EX.eg.regime.split("/")[1]} °C. La consigne de départ est donc ${EX.eg.cons} °C. Sur le synoptique, on lit la température de départ et celle de retour, la marche du groupe et de la pompe, leurs commandes et leurs alarmes. L’écart entre le départ et sa consigne dit si le groupe tient sa consigne : écart (K) = départ lu − consigne, au dixième.`,
      prompt: "Suivez le départ et le retour sur le synoptique, puis l’exemple résolu.",
      render: () => BE.schema("illustrations/synoptique-eau-glacee.svg", `Synoptique du circuit d’eau glacée, ${EX.eg.moment}. À gauche, le groupe d’eau glacée, en marche, commandé en marche, rond de défaut gris. Le départ, trait bleu, part du groupe vers la droite et passe par la pompe, en marche ; cadre du départ ${EX.eg.dep}, consigne ${EX.eg.cons} °C. Le retour, en pointillé, revient de la droite vers le groupe ; cadre du retour ${EX.eg.ret}. La pompe est commandée en marche, rond de défaut gris. En bas à droite : vers la CTA et les ventilo-convecteurs.`, "Le départ, le retour et la consigne de départ.")
        + BE.exemple({ text: `Circuit d’eau glacée, ${EX.eg.moment}`, answer: `départ ${EX.eg.dep} °C, consigne ${EX.eg.cons} °C : écart ${EX.eg.ecart} K ; retour ${EX.eg.ret} °C : l’eau prend ${EX.eg.dT} K dans les batteries`, why: `L’écart au départ reste sous ${EX.seuil} K : le groupe tient sa consigne.` })
        + BE.alerte(`<strong>Piège.</strong> Comparer le retour à la consigne de départ : la consigne porte sur le départ, le retour monte selon ce que les batteries prennent.`)
    }),

    BE.ecran({
      id: "horaires", dossier: "methode", kicker: "La méthode, 6", title: "Les horaires", level: "comprendre",
      text: `Le lot 6 du CCTP reprend les horaires de l’occupation : ${EX.horaires.jours}, de ${EX.horaires.debut} à ${EX.horaires.fin} (CCTP, page 2). Pendant l’occupation, la CTA est commandée en marche et les ventilo-convecteurs en mode confort : ils tiennent la consigne du local. Hors occupation, la CTA est arrêtée et les ventilo-convecteurs passent en mode réduit, une consigne plus basse l’hiver et plus haute l’été. L’exploitant règle ces horaires au poste de supervision ; l’automate les garde dans son logiciel. Un mode qui ne suit pas les horaires est une anomalie.`,
      prompt: "Lisez la semaine du schéma, puis continuez.",
      render: () => BE.schema("illustrations/horaires.svg", `Sept lignes, de lundi à dimanche, sur une échelle de 0 à 24 heures. Du lundi au vendredi, une barre bleue de ${EX.horaires.debut} à ${EX.horaires.fin} : occupé, CTA en marche, ventilo-convecteurs en confort. Le reste du temps et le week-end, en gris clair : inoccupé, CTA arrêtée, ventilo-convecteurs en réduit.`, "Les horaires de l’occupation pilotent la CTA et les modes.")
        + BE.exemple({ text: `Ventilo-convecteur du bureau, lundi à 6 h 45`, answer: "mode réduit : normal, le bureau n’est pas encore occupé", why: `L’occupation commence à ${EX.horaires.debut}.` })
    }),

    BE.ecran({
      id: "anomalie", dossier: "methode", kicker: "La méthode, 7", title: "Trouver une anomalie", level: "comprendre",
      text: `Une anomalie se lit dans un écart entre deux points. La commande et l’état : la CTA est commandée en marche, le retour de marche d’un ventilateur dit « arrêt » ; le ventilateur ne tourne pas. La mesure et sa consigne : une température s’éloigne de plus de ${EX.seuil} K de sa consigne, l’appareil étant en marche (écart d’exercice). Le mode et les horaires : un ventilo-convecteur en réduit pendant l’occupation. Une alarme active est aussi une anomalie. On parcourt chaque équipement dans cet ordre, puis on cherche la cause : un défaut en entraîne souvent d’autres. L’anomalie d’origine est celle qui explique les autres. Sur la CTA, par exemple, le récupérateur réchauffe l’air neuf avec l’air repris : sans air repris, il ne réchauffe plus rien, la vanne de la batterie chaude s’ouvre en grand et le soufflage reste loin de sa consigne. L’écart au soufflage est alors une conséquence.`,
      prompt: "Lisez les deux cas du schéma et le tableau, puis continuez.",
      render: () => BE.schema("illustrations/commande-etat.svg", "L’automate envoie au ventilateur la commande de marche, en trait mixte ; le ventilateur renvoie son état, le retour de marche, en pointillé. Sur le synoptique : commande marche et rond vert « marche », tout va bien ; commande marche et rond gris « arrêt », défaut à chercher.", "La commande demande, l’état répond.")
        + tableau(["Ce que vous comparez", "Normal", "Anomalie"], [
          ["La commande et l’état", "commande marche, état marche", "commande marche, état arrêt"],
          ["La mesure et sa consigne", `écart de ${EX.seuil} K au plus`, `écart de plus de ${EX.seuil} K, appareil en marche`],
          ["Le mode et les horaires", "confort pendant l’occupation, réduit hors occupation", "réduit pendant l’occupation"],
          ["Les alarmes", "ronds gris", "rond rouge"]
        ], "Quatre comparaisons, pour chaque équipement")
        + BE.exemple({ text: `Synoptique de la CTA, ${X().moment}`, answer: "aucune anomalie", why: `Commandée en marche, les deux ventilateurs tournent ; soufflage ${X().souf} pour ${X().consSouf} ; aucune alarme.` })
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, un défaut", title: "Entraînement : la CTA en défaut", level: "appliquer", requiresAction: true,
      text: {
        1: `Voici le synoptique de la CTA, ${EX.ent2.moment}. Le soufflage est à ${EX.ent2.souf} pour une consigne de ${EX.ent2.cons}. Où est l’anomalie d’origine ? Le tableau de l’écran « Trouver une anomalie » reste sous vos yeux.`,
        2: `Voici le synoptique de la CTA, ${EX.ent2.moment}. Trouvez l’anomalie d’origine, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant du tableau.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["Les quatre comparaisons sont à l’écran « Trouver une anomalie ».", "Comparez d’abord la commande de la CTA à l’état de chaque ventilateur.", "Regardez le rond du ventilateur de reprise et la ligne des alarmes."],
        2: ["La méthode est à l’écran « Trouver une anomalie ».", "Commande et état, mesure et consigne, alarmes.", "Une vanne grande ouverte peut être la conséquence d’un autre défaut."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.schema("illustrations/synoptique-cta-defaut.svg", `Synoptique de la CTA, ${EX.ent2.moment}. Commande : marche. Ventilateur de soufflage : rond vert, marche. Ventilateur de reprise : rond gris, arrêt. Soufflage ${EX.ent2.souf} pour une consigne de ${EX.ent2.cons} ; vanne de la batterie chaude ${EX.ent2.bc}. Salle de réunion : CO₂ ${EX.ent2.co2}. Alarmes : défaut de ventilateur en rouge, filtre encrassé et antigel en gris.`, "La CTA, un matin d’hiver.") + tableau(["Ce que vous comparez", "Normal", "Anomalie"], [["La commande et l’état", "commande marche, état marche", "commande marche, état arrêt"], ["Les alarmes", "ronds gris", "rond rouge"]], "Rappel de l’écran « Trouver une anomalie »"), EX.ent2.quiz),
        2: avecBloc(BE.schema("illustrations/synoptique-cta-defaut.svg", `Synoptique de la CTA, ${EX.ent2.moment}. Commande : marche. Ventilateur de soufflage : rond vert, marche. Ventilateur de reprise : rond gris, arrêt. Soufflage ${EX.ent2.souf} pour une consigne de ${EX.ent2.cons} ; vanne de la batterie chaude ${EX.ent2.bc}. Salle de réunion : CO₂ ${EX.ent2.co2}. Alarmes : défaut de ventilateur en rouge, filtre encrassé et antigel en gris.`, "La CTA, un matin d’hiver."), EX.ent2.quiz)
      })
    }),

    BE.ecran({
      id: "alarmes", dossier: "methode", kicker: "La méthode, 8", title: "Les alarmes", level: "comprendre",
      text: "Une alarme apparaît quand un contact de défaut se ferme : le rond passe au rouge clignotant et le poste horodate l’apparition. L’exploitant l’acquitte : il dit qu’il l’a vue, le rond reste rouge, fixe. L’alarme disparaît quand la cause est traitée, par exemple quand le filtre est changé : le rond s’éteint. L’historique garde les trois dates ; il sert à suivre les pannes et les interventions. Certaines alarmes sont aussi des sécurités de l’équipement : l’antigel de la batterie chaude agit dans l’automate de la CTA, même si le poste de supervision est arrêté.",
      prompt: "Suivez les trois moments de l’alarme, puis lisez l’historique.",
      render: () => BE.schema("illustrations/alarme.svg", `Une ligne du temps. Apparition à ${EX.hist[0].date.split(" ")[1].replace(":", " h ")} : rond rouge clignotant. Acquittement à ${EX.hist[1].date.split(" ")[1].replace(":", " h ")} : rond rouge fixe. Disparition à ${EX.hist[2].date.split(" ")[1].replace(":", " h ")} : rond éteint. Dessous, l’historique des alarmes de la CTA : trois lignes, date, alarme « filtre encrassé », événement.`, "Apparition, acquittement, disparition : trois lignes dans l’historique.")
        + BE.exemple({ text: "Filtre encrassé, lundi", answer: "acquitté à 7 h 44, disparu à 14 h 20 après le changement du filtre", why: "L’acquittement ne change rien au filtre ; l’alarme ne disparaît qu’avec la cause." })
        + BE.alerte("<strong>Piège.</strong> Croire qu’acquitter répare : l’alarme reste active tant que la cause est là.")
    }),

    BE.ecran({
      id: "cctp-gtb", dossier: "methode", kicker: "La méthode, 9", title: "Ce que le CCTP demande au lot GTB", level: "comprendre",
      text: "Le lot 6 du CCTP fixe ce que l’entreprise de gestion technique du bâtiment (GTB) doit fournir : une supervision en lecture, qui affiche, horodate et alarme les points de la liste, aux horaires de l’occupation. « En lecture » : le poste montre les points, commandes comprises ; les ordres et la régulation restent dans l’automate ; l’exploitant n’y règle que les consignes et les horaires. Le bureau d’études ne conçoit pas la GTB : il lit la liste, la vérifie avec l’installation et la reporte dans sa note. Pour compter, chaque élément de la liste, séparé par une virgule, est un point : « Mesures : température d’air neuf, température de soufflage » fait deux points. Un équipement écrit « un par local » se compte une fois par local : ses points se multiplient par le nombre de locaux. Les consignes comptent : la supervision les affiche et l’exploitant les règle.",
      prompt: "Lisez la liste du CCTP et l’exemple résolu, puis continuez.",
      render: () => lot6()
        + exempleCTA()
        + BE.alerte("<strong>Piège.</strong> Compter les ventilo-convecteurs une seule fois : le CCTP en demande un par local, chacun avec ses quatre points.")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, compter", title: "Entraînement : compter des points", level: "appliquer", requiresAction: true,
      text: {
        1: `Un bâtiment voisin a ${EX.ent3.n} ventilo-convecteurs, chacun avec les ${EX.ent3.par} points du CCTP du bâtiment de bureaux. Combien de points, et de quelles classes ? L’exemple résolu reste sous vos yeux.`,
        2: `Un bâtiment voisin a ${EX.ent3.n} ventilo-convecteurs, chacun avec les ${EX.ent3.par} points du CCTP du bâtiment de bureaux. Comptez ses points et leurs classes, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["Les points d’un ventilo-convecteur sont au lot 6, à l’écran « Ce que le CCTP demande au lot GTB ».", "Un ventilo-convecteur : une mesure, un état, une commande, une consigne. Puis multipliez.", "La commande de mode a deux positions : sortie tout ou rien."],
        2: ["La méthode est aux écrans « Entrées et sorties » et « Ce que le CCTP demande au lot GTB ».", "Les points d’un appareil, puis le nombre d’appareils.", "Les consignes comptent."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleCTA(), EX.ent3.quiz),
        2: BE.quiz(EX.ent3.quiz)
      })
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 10", title: "La note de calcul", level: "comprendre",
      text: "La note de calcul donne à un lecteur de quoi refaire la liste : l’objet, les données avec leur source, les hypothèses et la méthode, les résultats. La liste du lot 6 et les valeurs du synoptique sont des données d’exercice : elles s’écrivent comme telles. La note de la CTA tient en quatre lignes, une par rubrique ; la feuille du niveau 2 reprend les mêmes rubriques.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul de la CTA"], [
        ["Objet", "Liste des points de supervision de la CTA du bâtiment de bureaux et lecture de son synoptique"],
        ["Données et sources", "CCTP, page 4, lot 6 (points) ; consignes : CCTP, pages 3 et 4 ; synoptique : exercice"],
        ["Hypothèses et méthode", "chaque élément de la liste du lot 6 = un point ; mesure E ANA, état et alarme E TOR, commande S TOR ou S ANA, consigne : logiciel"],
        ["Résultats", `${M().points} points : ${M().E_TOR} E TOR, ${M().E_ANA} E ANA, ${M().S_TOR} S TOR, ${M().S_ANA} S ANA, ${M().LOG} logiciel ; ${X().moment} : aucune anomalie`]
      ], "Première page de la note de calcul, la CTA")
        + BE.renvoi("La note complète du projet s’assemble à la station R5, « La note de calcul ».")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

/* Station BE-R4 : l'énergie sur l'année.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5 à T9 (année moyenne, PAC 3,5 des écrans de T9), commande du niveau 1
   sur le même bâtiment (année dernière, PAC 3), commande du niveau 2 sur la maison. Les valeurs de l'exemple (bloc EXEMPLE) et les bornes
   des fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/r4-energie-annee/construire.mjs : le premier vient de exemple-data.mjs,
   les secondes de exemple-data.mjs (niveau 1) et de corriges/r4-energie-annee/reference-energie.json (niveau 2, outils/r4-energie-maison.mjs).
   Aucune valeur calculée de la maison ni de la commande du niveau 1 n'est écrite dans cette station : seules les bornes des fourchettes et
   les données des commandes le sont. Prix, facteurs d'émission, SCOP, rendements et heures : données de l'exercice. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "dju": {
  "mois": [
   "Janv.",
   "Févr.",
   "Mars",
   "Avril",
   "Mai",
   "Juin",
   "Juil.",
   "Août",
   "Sept.",
   "Oct.",
   "Nov.",
   "Déc."
  ],
  "v": [
   "400",
   "340",
   "290",
   "200",
   "90",
   "20",
   "0",
   "0",
   "30",
   "150",
   "290",
   "390"
  ],
  "tot": "2200"
 },
 "H": "115,23",
 "c": "0,8",
 "Q": "4867",
 "unJourWh": "27655",
 "pacNom": "PAC 3,5",
 "eau": "50",
 "cop7": "2,8",
 "biv": "−4,8",
 "periodes": [
  {
   "nom": "Plein hiver",
   "mois": "décembre à février",
   "cop": "2,3",
   "q": "2500",
   "e": "1087"
  },
  {
   "nom": "Mi-saison",
   "mois": "mars, avril, octobre, novembre",
   "cop": "3,0",
   "q": "2057",
   "e": "686"
  },
  {
   "nom": "Doux",
   "mois": "mai, juin, septembre",
   "cop": "3,4",
   "q": "310",
   "e": "91"
  }
 ],
 "saison": {
  "q": "4867",
  "e": "1864"
 },
 "scop": "2,6",
 "partPc": "3",
 "pac": {
  "appoint": "146",
  "chaleur": "4721",
  "machine": "1816",
  "elec": "1962"
 },
 "rend": "0,90",
 "gaz": "5408",
 "flux": {
  "el": "38",
  "air": "62",
  "gz": "111",
  "pe": "11"
 },
 "ecs": {
  "jour": "1,2",
  "jours": "250",
  "kWh": "300"
 },
 "vent": {
  "W": "40",
  "h": "2600",
  "kWh": "104"
 },
 "ete": {
  "P": "4443",
  "h": "400",
  "seer": "4,5",
  "froid": "1777",
  "elec": "395"
 },
 "prix": {
  "elec": "0,25",
  "gaz": "0,12"
 },
 "fe": {
  "elec": "0,08",
  "gaz": "0,23"
 },
 "A": {
  "chauffage": "1962",
  "ecs": "300",
  "ventilation": "104",
  "ete": "395",
  "elec": "2761",
  "gaz": "0",
  "cout_elec": "690",
  "cout_gaz": "0",
  "cout": "690",
  "co2_elec": "221",
  "co2_gaz": "0",
  "co2": "221"
 },
 "B": {
  "chauffage": "5408",
  "ecs": "300",
  "ventilation": "104",
  "ete": "395",
  "gaz": "5408",
  "elec": "799",
  "cout_elec": "200",
  "cout_gaz": "649",
  "cout": "849",
  "co2_elec": "64",
  "co2_gaz": "1244",
  "co2": "1308"
 },
 "eco": "159",
 "surcout": "3000",
 "retour": "18,9",
 "rapportCo2": "6",
 "ex1": {
  "H": "80",
  "dju": "1800",
  "c": "0,9",
  "quiz": {
   "choices": [
    "3456 kWh",
    "130 kWh",
    "3110 kWh",
    "3840 kWh"
   ],
   "good": 2,
   "explain": "Q = 80 × 1800 × 24 ÷ 1000 × 0,9 = 3110 kWh. 3456 kWh oublie le coefficient c ; 130 kWh oublie les 24 heures du jour ; 3840 kWh divise par c au lieu de multiplier."
  }
 },
 "ex2": {
  "Q": "6000",
  "scop": "3,0",
  "cop": "3,4",
  "partPc": "4",
  "quiz": {
   "choices": [
    "2160 kWh",
    "2000 kWh",
    "1920 kWh",
    "1934 kWh"
   ],
   "good": 0,
   "explain": "Appoint : 6000 × 4 ÷ 100 = 240 kWh ; machine : 5760 ÷ 3,0 = 1920 kWh ; total 2160 kWh. 2000 kWh divise aussi l’appoint par le SCOP ; 1920 kWh oublie l’appoint ; 1934 kWh prend le COP de tête au lieu du SCOP."
  }
 },
 "ex3": {
  "P": "5000",
  "h": "300",
  "seer": "5,0",
  "quiz": {
   "choices": [
    "1500 kWh",
    "7500 kWh",
    "300000 kWh",
    "300 kWh"
   ],
   "good": 3,
   "explain": "Froid : 5000 × 300 ÷ 1000 = 1500 kWh ; électricité : 1500 ÷ 5,0 = 300 kWh. 1500 kWh est le froid, pas l’électricité ; 7500 kWh multiplie par le SEER ; 300000 kWh oublie de passer des wattheures aux kWh."
  }
 },
 "ex4": {
  "surcout": "5000",
  "cA": "700",
  "cB": "1100",
  "quiz": {
   "choices": [
    "7,1 ans",
    "12,5 ans",
    "4,5 ans",
    "0,08 an"
   ],
   "good": 1,
   "explain": "Économie : 1100 − 700 = 400 € par an ; retour : 5000 ÷ 400 = 12,5 ans. 7,1 et 4,5 ans divisent le surcoût par le coût d’une seule solution ; 0,08 an divise l’économie par le surcoût."
  }
 },
 "n1": {
  "dju": [
   "450",
   "380",
   "320",
   "210",
   "100",
   "30",
   "0",
   "0",
   "40",
   "170",
   "300",
   "420"
  ],
  "machine": "PAC 3",
  "cop7": "2,9",
  "scop": "2,7",
  "partPc": "5",
  "rend": "0,90"
 },
 "maison": {
  "machine": "PAC 4",
  "cop7": "3,1",
  "c": "0,85",
  "scop": "3,3",
  "partPc": "2",
  "rendCh": "0,95",
  "rendEcs": "0,85",
  "jours": "365",
  "heures": "300",
  "seer": "6,0",
  "prix": {
   "elec": "0,25",
   "gaz": "0,12"
  },
  "fe": {
   "elec": "0,08",
   "gaz": "0,23"
  },
  "surcout": "4000"
 }
};
/*EXEMPLE-FIN*/

const A = EX.A, B = EX.B, P = EX.pac, M = EX.maison;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const tableDju = (mois, valeurs, legende) => tableau(["Mois", ...mois.slice(0, 6)], [["DJU", ...valeurs.slice(0, 6)]], legende) + tableau(["Mois", ...mois.slice(6)], [["DJU", ...valeurs.slice(6)]]);

const exempleDju = () => BE.exemple({ text: "Bâtiment d’exemple, année moyenne du site : les DJU des douze mois", answer: `${EX.dju.v.join(" + ")} = ${EX.dju.tot} DJU`, why: "Les DJU de l’année sont la somme des DJU de ses mois, base 18 °C. Juillet et août comptent pour 0 : il n’y a rien à chauffer." });
const exempleBesoin = () => BE.exemple({ text: `Bâtiment d’exemple : H = ${EX.H} W/K (station T5), ${EX.dju.tot} DJU, c = ${EX.c} (donnée de l’exercice : bureaux fermés la nuit et le week-end)`, answer: `Q = ${EX.H} × ${EX.dju.tot} × 24 ÷ 1000 × ${EX.c} = ${EX.Q} kWh`, why: "Le besoin se donne au kWh. Il compte la chaleur à donner aux locaux, quelle que soit la machine qui la produit." });
const exempleScop = () => BE.exemple({ text: `${EX.pacNom} des écrans de la station T9, eau à ${EX.eau} °C : la chaleur de l’année, ${EX.Q} kWh, partagée en trois périodes au prorata de leurs DJU (${EX.periodes.map(p => `${p.nom.toLowerCase()} : ${p.mois}`).join(" ; ")})`, answer: `Électricité : ${EX.periodes.map(p => `${p.q} ÷ ${p.cop} = ${p.e}`).join(" ; ")}. Total ${EX.saison.e} kWh. SCOP = ${EX.saison.q} ÷ ${EX.saison.e} = ${EX.scop}`, why: `Le SCOP de l’exemple, ${EX.scop}, tombe sous le COP du catalogue, ${EX.cop7} à +7 °C : l’hiver du site est rude et l’eau part à ${EX.eau} °C. Les COP de chaque période sont des données de l’exercice.` });
const exemplePac = () => BE.exemple({ text: `Bâtiment d’exemple : Q = ${EX.Q} kWh, SCOP ${EX.scop}, appoint ${EX.partPc} % de la chaleur de l’année (donnée de l’exercice)`, answer: `Appoint : ${EX.Q} × ${EX.partPc} ÷ 100 = ${P.appoint} kWh. Machine : (${EX.Q} − ${P.appoint}) ÷ ${EX.scop} = ${P.machine} kWh. Électricité du chauffage : ${P.appoint} + ${P.machine} = ${P.elec} kWh`, why: "Chaque grandeur se donne au kWh. L’appoint est une résistance : 1 kWh d’électricité pour 1 kWh de chaleur, sans le SCOP." });
const exempleGaz = () => BE.exemple({ text: `Même bâtiment, chaudière gaz à condensation, rendement saisonnier ${EX.rend} sur le PCI (donnée de l’exercice)`, answer: `Gaz = ${EX.Q} ÷ ${EX.rend} = ${EX.gaz} kWh PCI`, why: "Le rendement est plus petit que 1 : la chaudière brûle plus de gaz qu’elle ne donne de chaleur. La pompe à chaleur, elle, consomme moins d’électricité qu’elle ne donne de chaleur." });
const exemplePostes = () => BE.exemple({ text: `Bâtiment d’exemple : eau chaude ${EX.ecs.jour} kWh par jour ouvré, ${EX.ecs.jours} jours ; caisson ${EX.vent.W} W, ${EX.vent.h} h ; été ${EX.ete.P} W (station T8), ${EX.ete.h} h, SEER ${EX.ete.seer} (données de l’exercice)`, answer: `Eau chaude : ${EX.ecs.jour} × ${EX.ecs.jours} = ${EX.ecs.kWh} kWh. Ventilation : ${EX.vent.W} × ${EX.vent.h} ÷ 1000 = ${EX.vent.kWh} kWh. Été : ${EX.ete.P} × ${EX.ete.h} ÷ 1000 = ${EX.ete.froid} kWh de froid, ÷ ${EX.ete.seer} = ${EX.ete.elec} kWh. Total : ${A.chauffage} + ${A.ecs} + ${A.ventilation} + ${A.ete} = ${A.elec} kWh`, why: "Chaque poste au kWh. Le total se lit d’un coup d’œil sur les barres : le chauffage pèse le plus." });
const exempleCout = () => BE.exemple({ text: `Bâtiment d’exemple, les deux solutions : prix ${EX.prix.elec} € par kWh d’électricité et ${EX.prix.gaz} € par kWh PCI de gaz ; facteurs ${EX.fe.elec} et ${EX.fe.gaz} kg de CO2 par kWh (données de l’exercice)`, answer: `Pompe à chaleur : ${A.elec} × ${EX.prix.elec} = ${A.cout} € ; ${A.elec} × ${EX.fe.elec} = ${A.co2} kg. Chaudière : ${B.gaz} × ${EX.prix.gaz} + ${B.elec} × ${EX.prix.elec} = ${B.cout_gaz} + ${B.cout_elec} = ${B.cout} € ; ${B.gaz} × ${EX.fe.gaz} + ${B.elec} × ${EX.fe.elec} = ${B.co2_gaz} + ${B.co2_elec} = ${B.co2} kg`, why: "Le coût se donne à l’euro, les émissions au kilo. Chaque énergie se multiplie par son prix et par son facteur, puis on additionne." });
const exempleRetour = () => BE.exemple({ text: `Bâtiment d’exemple : la pompe à chaleur coûte ${EX.surcout} € de plus à poser que la chaudière, aides déduites (donnée de l’exercice)`, answer: `Économie : ${B.cout} − ${A.cout} = ${EX.eco} € par an. Temps de retour : ${EX.surcout} ÷ ${EX.eco} = ${EX.retour} ans`, why: "Le temps de retour se donne au dixième d’année. Il ne compte ni la hausse des prix, ni l’entretien : c’est un ordre de grandeur pour comparer." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Toutes les données sont dans la commande et sur la feuille : les DJU de l’année dernière mois par mois, H = ${EX.H} W/K, c = ${EX.c}, la ${EX.n1.machine} (SCOP ${EX.n1.scop}, appoint ${EX.n1.partPc} %), la chaudière (rendement ${EX.n1.rend}), les prix et les facteurs d’émission des écrans.`,
      "Exercice 1 : la somme des douze mois. Exercice 2 : H × DJU × 24 ÷ 1000 × c. Exercice 3 : l’appoint, puis la machine avec le SCOP, puis leur somme. Exercice 4 : besoin ÷ rendement. Exercice 5 : chaque énergie × son prix, × son facteur ; puis la phrase de conclusion.",
      `Sur l’exemple des écrans : ${EX.dju.tot} DJU, ${EX.Q} kWh de besoin, ${P.elec} kWh d’électricité pour la pompe à chaleur, ${EX.gaz} kWh PCI de gaz. L’année dernière est plus froide : tous ces nombres montent.`
    ],
    2: [
      "DJU : votre feuille de la station E1. H total : votre feuille de la station T5. Machine retenue : votre feuille de la station T9. Eau chaude : votre feuille de la station H6. Ventilation : votre feuille de la station A4. Puissance d’été : votre feuille de la station T8. Les données de l’exercice sont dans la commande.",
      "Le chauffage d’abord (besoin, puis pompe à chaleur avec son appoint, puis chaudière). Puis l’eau chaude : un jour × 365 ; en gaz, la chaleur d’un jour compte aussi les pertes du ballon. Puis la ventilation et l’été. Le tableau de l’exercice 4 range tout par poste et par énergie.",
      `Le temps de retour compare le coût total des deux solutions, pas le chauffage seul. Sur l’exemple : ${B.cout} − ${A.cout} = ${EX.eco} € par an, ${EX.surcout} ÷ ${EX.eco} = ${EX.retour} ans.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensDossier = () => BE.liens([
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Page 4 : chauffage par pompe à chaleur, pas de climatisation ; page 5 : eau chaude" }
]);
const donneesProjet = BE.parNiveau({
  1: { render: () => tableDju(EX.dju.mois, EX.n1.dju, "Commande du niveau 1 : DJU de l’année dernière, mois par mois, base 18 °C (données de l’exercice)") },
  2: { render: () => tableau(["Donnée de l’exercice", "Valeur"], [
    ["Coefficient d’apports et d’intermittence c", M.c],
    [`SCOP de la ${M.machine}, eau à 45 °C`, M.scop],
    ["Part de la chaleur de l’année donnée par l’appoint", `${M.partPc} %`],
    ["Chaudière à condensation : rendement en chauffage ; en eau chaude", `${M.rendCh} ; ${M.rendEcs}`],
    ["Eau chaude : jours par an", M.jours],
    ["Été : heures à pleine puissance ; SEER du multisplit", `${M.heures} h ; ${M.seer}`],
    ["Prix : électricité ; gaz", `${M.prix.elec} € par kWh ; ${M.prix.gaz} € par kWh PCI`],
    ["Émissions : électricité ; gaz", `${M.fe.elec} ; ${M.fe.gaz} kg de CO2 par kWh`],
    ["Surcoût de la pompe à chaleur, aides déduites", `${M.surcout} €`]
  ], "Commande du niveau 2 : données de l’exercice") + liensDossier() }
});
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + donneesProjet.render(); };

BE.station({
  code: "BE-R4",
  titre: "L’énergie sur l’année",
  ligne: "Régulation et énergie",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bâtiment d’exemple, l’année dernière, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, tous les postes, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire : la récupération de chaleur d’une centrale de traitement d’air, roue contre plaques, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "La machine est choisie : il reste à chiffrer ce qu’elle consomme sur une année, et ce que cela coûte. Les degrés-jours donnent le besoin de chauffage de l’année. Le SCOP, le rendement de la pompe à chaleur sur toute une saison, donne l’électricité. Vous ajoutez l’eau chaude, la ventilation et l’été, puis vous comparez à une chaudière gaz : coût, émissions de CO2, temps de retour du surcoût.",
  note: "Les SCOP, les rendements, les heures d’été, les prix, les facteurs d’émission et le surcoût sont des données de l’exercice : aucun tarif réel, aucun facteur réglementaire. Les indicateurs de la RE2020 et du DPE se lisent ici, sans valeur réglementaire.",

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
      objet: `Énergie, coût et émissions de l’année dernière : la ${EX.n1.machine} contre une chaudière gaz, bâtiment d’exemple`,
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage du petit bâtiment de bureaux d’exemple a posé la ${EX.n1.machine} de la station T9 (niveau 1, COP ${EX.n1.cop7} à +7 °C, eau à ${EX.eau} °C comme l’exemple des écrans, déjà comptée dans le SCOP donné plus bas). L’année dernière a été plus froide que l’année moyenne des écrans. Il veut savoir ce que le chauffage lui a coûté, et ce qu’il aurait payé avec une chaudière gaz à condensation. Données : les DJU de l’année dernière, mois par mois, sous cette commande et sur la feuille ; H = ${EX.H} W/K (station T5, exemple) ; c = ${EX.c} ; SCOP de la ${EX.n1.machine} : ${EX.n1.scop} ; appoint : ${EX.n1.partPc} % de la chaleur de l’année ; chaudière : rendement ${EX.n1.rend} sur le PCI ; prix et facteurs d’émission des écrans (toutes données de l’exercice). Le chauffage seul est compté. Suivez les étapes dans l’ordre.`,
        "Étape 1, exercice 1 de la feuille. Les DJU de l’année dernière : la somme des douze mois.",
        "Étape 2, exercice 2 de la feuille. Le besoin de chauffage de l’année.",
        `Étape 3, exercice 3 de la feuille. L’électricité de la ${EX.n1.machine} : l’appoint, la machine, leur somme.`,
        "Étape 4, exercice 4 de la feuille. Le gaz de la chaudière, en kWh PCI.",
        "Étape 5, exercice 5 de la feuille. Le coût et les émissions des deux solutions, puis votre conclusion : laquelle a coûté le moins. Vérifiez vos cinq résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "DJU de l’année dernière", ou: "Sous cette commande, et sur la feuille" },
        { piece: "H du bâtiment d’exemple, c, prix, facteurs", ou: "Cette commande ; écrans « Le besoin de chauffage de l’année » et « Le coût et les émissions »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Énergie de l’année de la maison, par poste ; coût, émissions et temps de retour contre une chaudière gaz",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études vous demande l’énergie de l’année de la maison, poste par poste, avec la pompe à chaleur retenue à la station T9 (la ${M.machine}, COP ${M.cop7} à +7 °C) et le chauffe-eau thermodynamique de la station H6. Il la compare à une chaudière gaz à condensation qui ferait le chauffage et l’eau chaude, avec un ballon. Chauffage : DJU de votre feuille de la station E1, H total de votre feuille de la station T5. Eau chaude : votre feuille de la station H6 (énergie d’un jour, pertes du ballon, électricité d’un jour). Ventilation : énergie de l’année de votre feuille de la station A4. Été : la variante de climatisation de la station F1 (le CCTP n’en demande pas), avec la puissance frigorifique de votre feuille de la station T8. Les données de l’exercice sont sous cette commande. Rendez le total par poste et par énergie, le coût et les émissions des deux solutions, le temps de retour du surcoût et la première page de la note, avec la source de chaque donnée.`,
      pieces: [
        { piece: "Vos feuilles des stations E1, T5, T9, H6, A4 et T8", ou: "DJU ; H total ; machine ; eau chaude ; ventilation ; puissance d’été" },
        { piece: "Données de l’exercice", ou: "Sous cette commande" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : chauffage, pas de climatisation ; page 5 : eau chaude" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-besoin", libelle: "Besoin de chauffage de l’année dernière", unite: "kWh", min: 5193, max: 5515, indice: "Relisez l’écran « Le besoin de chauffage de l’année » : H × DJU × 24 ÷ 1000, puis × c." },
      { id: "n1-elec", libelle: "Électricité de chauffage de la PAC 3, appoint compris", unite: "kWh", min: 2087, max: 2217, indice: "Relisez l’écran « L’électricité de la pompe à chaleur » : l’appoint, puis le reste ÷ SCOP (pas le COP de tête), puis la somme." },
      { id: "n1-gaz", libelle: "Gaz de la chaudière", unite: "kWh PCI", min: 5770, max: 6128, indice: "Relisez l’écran « La chaudière gaz » : besoin ÷ rendement, en kWh PCI." },
      { id: "n1-cout", libelle: "Coût de l’année avec la pompe à chaleur", unite: "€", min: 521, max: 555, indice: "Relisez l’écran « Le coût et les émissions » : les kWh d’électricité × le prix de l’électricité." },
      { id: "n1-co2", libelle: "Émissions de l’année avec la chaudière gaz", unite: "kg de CO2", min: 1326, max: 1410, indice: "Relisez l’écran « Le coût et les émissions » : chaque énergie × son facteur d’émission, puis la somme." }
    ],
    2: [
      { id: "n2-besoin", libelle: "Besoin de chauffage de la maison", unite: "kWh", min: 4253, max: 4517, indice: "Relisez l’écran « Le besoin de chauffage de l’année » : H × DJU × 24 ÷ 1000, puis × c." },
      { id: "n2-elec", libelle: "Électricité de chauffage de la pompe à chaleur, appoint compris", unite: "kWh", min: 1348, max: 1432, indice: "Relisez l’écran « L’électricité de la pompe à chaleur » : l’appoint, puis le reste ÷ SCOP (pas le COP de tête), puis la somme." },
      { id: "n2-total", libelle: "Électricité de l’année, tous postes, solution pompe à chaleur", unite: "kWh", min: 2572, max: 2732, indice: "Relisez l’écran « L’eau chaude, la ventilation et l’été » : chauffage + eau chaude + ventilation + été, en électricité." },
      { id: "n2-cout", libelle: "Coût de l’année, solution pompe à chaleur", unite: "€", min: 643, max: 683, indice: "Relisez l’écran « Le coût et les émissions » : les kWh d’électricité × le prix de l’électricité." },
      { id: "n2-co2", libelle: "Émissions de l’année, solution chaudière gaz", unite: "kg de CO2", min: 1716, max: 1824, indice: "Relisez l’écran « Le coût et les émissions » : chaque énergie × son facteur d’émission, puis la somme." },
      { id: "n2-retour", libelle: "Temps de retour du surcoût", unite: "ans", min: 11, max: 11.8, indice: "Relisez l’écran « Le temps de retour » : surcoût ÷ économie, l’économie prise sur le coût total des deux solutions." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-R5", titre: "La note de calcul", href: "../r5-note-de-calcul/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-E1, Le climat du site", href: "../e1-climat-site/index.html", pourquoi: "Les degrés-jours de l’année et leur calcul jour par jour viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-T5, Le bilan d’hiver", href: "../t5-bilan-hiver/index.html", pourquoi: "Le coefficient H total du bâtiment vient de cette station." },
    { reseau: "Bureau d’études", titre: "BE-T9, La machine", href: "../t9-machine-puissance-choix/index.html", pourquoi: "La machine retenue, son COP à +7 °C, son point de bivalence et son appoint viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-H6, L’eau chaude sanitaire", href: "../h6-eau-chaude-sanitaire/index.html", pourquoi: "L’énergie d’un jour d’eau chaude et le chauffe-eau thermodynamique viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-A4, Ventilateur, caisson", href: "../a4-ventilateur-caisson/index.html", pourquoi: "L’énergie de l’année du caisson de ventilation vient de cette station." },
    { reseau: "Bureau d’études", titre: "BE-F1, Besoin et système", href: "../f1-besoin-systeme/index.html", pourquoi: "La variante de climatisation de la maison vient de cette station." },
    { reseau: "Habilitation Fluide", titre: "Bilan thermique et performance énergétique", href: "../../../packs/fluides/res/bilan-thermique-performance-interactif/index.html", pourquoi: "COP, EER, SCOP et SEER, et le calcul de l’électricité : énergie utile ÷ performance saisonnière." },
    { reseau: "RézoTools", titre: "COP / EER : coût", href: "../../../rezotools/calculettes/cop.html", pourquoi: "Une calculette du rendement et du coût d’une machine." },
    { reseau: "Législation", titre: "La RE2020", href: "../../../legislation/stations/thermique-re2020/index.html", pourquoi: "Les six indicateurs : Bbio, Cep, Cep,nr, Ic énergie, Ic construction, DH." },
    { reseau: "Législation", titre: "Le DPE", href: "../../../legislation/stations/thermique-dpe/index.html", pourquoi: "L’étiquette de A à G : énergie et gaz à effet de serre." },
    { reseau: "Législation", titre: "Les CEE", href: "../../../legislation/stations/thermique-cee/index.html", pourquoi: "Les aides qui réduisent le surcoût d’une pompe à chaleur." },
    { reseau: "Législation", titre: "Le TEWI", href: "../../../legislation/stations/impact-tewi/index.html", pourquoi: "La part indirecte : l’énergie consommée, convertie en CO2." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : chiffrer l’énergie d’une année. La machine est choisie à la station T9. Vous calculez le besoin de chauffage de l’année avec les degrés-jours, puis l’électricité que la pompe à chaleur consomme pour le couvrir, avec son rendement de saison, le SCOP. Vous ajoutez l’eau chaude, la ventilation et l’été. Vous comparez enfin à une chaudière gaz : le coût de l’année, les émissions de CO2 et le temps qu’il faut pour rembourser le surcoût de la pompe à chaleur. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Vous recevez", rows: [["La commande :", "chiffrer l’énergie de l’année et comparer deux solutions."], ["Le dossier :", "vos feuilles des stations E1, T5, T9, H6, A4 et T8, et des données de l’exercice."]] },
        { title: "Vous produisez", rows: [["Le tableau :", "l’énergie de chaque poste, pour chaque solution."], ["Les résultats :", "besoin, électricité, gaz, coût, émissions, temps de retour. Fourchettes à l’écran Vérifier : ± 3 %."]] },
        { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station R5, la note de calcul du projet."]] }
      ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les grandeurs du bâtiment viennent des stations que vous avez faites. Les degrés-jours de l’année sont à la station E1. Le coefficient H total, en W/K, est à la station T5. La machine retenue est à la station T9. L’énergie d’un jour d’eau chaude est à la station H6, celle du caisson de ventilation à la station A4, la puissance d’été à la station T8 : la puissance frigorifique du bilan d’été, pas le froid de la pompe à chaleur donné à la station T9. Le reste est donné par la commande, comme données de l’exercice : le SCOP, la part d’appoint, les rendements de la chaudière, les heures d’été et le SEER, les prix, les facteurs d’émission et le surcoût. Sur un vrai projet, le SCOP et le SEER se lisent chez le fabricant, les prix sur le contrat du client, les facteurs d’émission dans la méthode réglementaire en vigueur.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Degrés-jours de l’année, base 18 °C", "Station E1"],
        ["Coefficient H total (W/K)", "Station T5"],
        ["Machine retenue, COP à +7 °C", "Station T9"],
        ["Eau chaude : énergie d’un jour, pertes du ballon", "Station H6"],
        ["Ventilation : énergie de l’année", "Station A4"],
        ["Puissance frigorifique d’été, celle du bilan d’été (pas le froid de la pompe à chaleur)", "Station T8 ; variante de la station F1"],
        ["SCOP, part d’appoint en %, rendements, SEER, heures, prix, facteurs, surcoût", "La commande, données de l’exercice"]
      ], "Les données de l’énergie sur l’année")
    }),

    BE.ecran({
      id: "degres-jours", dossier: "methode", kicker: "La méthode, 1", title: "Les degrés-jours de l’année", level: "comprendre",
      text: `La station E1 a compté les degrés-jours d’un jour : 18 °C moins la température moyenne du jour, quand ce nombre est positif, sinon 0. Les degrés-jours d’un mois sont la somme de ses jours, ceux de l’année la somme de ses mois. La courbe a la forme des saisons : haute en hiver, nulle en juillet et en août, quand il n’y a rien à chauffer. Plus l’hiver est froid, plus la somme est grande, et plus le bâtiment demande de chaleur. Pour le bâtiment d’exemple, l’année moyenne du site compte ${EX.dju.tot} DJU (donnée de l’exercice). Une année plus froide en compte davantage : la facture suit.`,
      prompt: "Suivez la courbe d’un mois à l’autre, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/degres-jours-mois.svg", `Graphique : en abscisse les douze mois, de janvier à décembre ; en ordonnée les DJU du mois, de 0 à 450. La courbe du bâtiment d’exemple relie ${EX.dju.mois.map((m, i) => `${m} ${EX.dju.v[i]}`).join(", ")}. Elle est haute en hiver, nulle en juillet et en août. Sous le graphique, la valeur de chaque mois. Total : ${EX.dju.tot} DJU.`, "Les DJU du bâtiment d’exemple, mois par mois : la forme des saisons.")
        + tableDju(EX.dju.mois, EX.dju.v, "Bâtiment d’exemple : DJU de l’année moyenne, base 18 °C (données de l’exercice)") + exempleDju()
    }),

    BE.ecran({
      id: "besoin-annuel", dossier: "methode", kicker: "La méthode, 2", title: "Le besoin de chauffage de l’année", level: "comprendre",
      text: `Le coefficient H total de la station T5 dit combien de watts le bâtiment perd par degré d’écart. Un jour qui compte 10 DJU, il perd H × 10 watts pendant 24 heures : H × 10 × 24 wattheures. Sur l’année, le besoin vaut H × DJU × 24 ÷ 1000, en kWh. Ce calcul compte le bâtiment chauffé jour et nuit, sans aide. Un coefficient c le corrige, donné par l’exercice : il compte les apports gratuits du soleil, des occupants et des appareils, et l’intermittence, quand le chauffage baisse la nuit ou le week-end. Pour les bureaux d’exemple, fermés la nuit et le week-end, c = ${EX.c}. Sur un vrai projet, le besoin se tire de l’étude thermique, heure par heure.`,
      prompt: "Lisez le schéma d’un jour, puis l’exemple résolu, et continuez.",
      render: () => BE.schema("illustrations/un-jour-de-chauffage.svg", `Schéma de principe : un axe des températures, de 0 à 20 °C. Une ligne en tirets marque la base, 18 °C ; une ligne pleine la moyenne d’un jour, 8 °C. Entre les deux, une flèche orange : 10 DJU. Sous le schéma : un jour, 18 − 8 = 10 DJU ; chaleur du jour, H × 10 × 24 = ${EX.H} × 240 = ${EX.unJourWh} Wh ; l’année, H × DJU × 24 ÷ 1000, en kWh, puis × c.`, "Un degré-jour, c’est un degré d’écart pendant 24 heures.") + exempleBesoin()
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, le besoin", title: "À l’écran : le besoin d’un autre bâtiment", level: "appliquer", requiresAction: true,
      text: {
        1: `Un autre bâtiment d’exemple perd ${EX.ex1.H} W/K. Son site compte ${EX.ex1.dju} DJU dans l’année, et l’exercice donne c = ${EX.ex1.c}. Calculez son besoin de chauffage de l’année. L’exemple résolu reste sous vos yeux.`,
        2: `Un autre bâtiment d’exemple perd ${EX.ex1.H} W/K. Son site compte ${EX.ex1.dju} DJU dans l’année, et l’exercice donne c = ${EX.ex1.c}. Calculez son besoin de chauffage de l’année.`
      },
      prompt: { 1: "Choisissez le besoin, en vous aidant de l’exemple.", 2: "Choisissez le besoin. Cette question est à faire seul." },
      aides: {
        1: ["H, les DJU et c sont dans l’énoncé. La méthode est à l’écran « Le besoin de chauffage de l’année ».", "Multipliez H par les DJU et par 24 heures, divisez par 1000 pour passer en kWh.", `Dans l’exemple : ${EX.H} × ${EX.dju.tot} × 24 ÷ 1000 × ${EX.c} = ${EX.Q} kWh. Faites de même.`],
        2: ["La méthode est à l’écran « Le besoin de chauffage de l’année ».", "Un DJU dure 24 heures.", "Le coefficient c multiplie le résultat."]
      },
      ...BE.parNiveau({ 1: avecBloc(exempleBesoin(), EX.ex1.quiz), 2: avecBloc("", EX.ex1.quiz) })
    }),

    BE.ecran({
      id: "cop-et-scop", dossier: "methode", kicker: "La méthode, 3", title: "Le COP d’un point, le SCOP d’une année", level: "comprendre",
      text: `Le catalogue de la station T9 donne le COP à +7 °C dehors : chaleur donnée ÷ électricité consommée, un jour doux, à pleine charge. Sur une année, la machine travaille aussi par grand froid, avec des dégivrages, et par temps doux, à petite charge. Le SCOP, coefficient de performance saisonnier, compte toute la saison : chaleur de l’année ÷ électricité de l’année (Habilitation Fluide, « Bilan thermique et performance énergétique »). Le schéma découpe l’année de l’exemple en trois périodes. L’hiver pèse lourd : c’est là que le bâtiment demande le plus, et que la machine rend le moins. Le SCOP de l’exemple tombe sous le COP de tête, le COP du catalogue à +7 °C ; dans un climat doux et avec une eau moins chaude, il peut passer au-dessus. L’électricité de l’année se calcule toujours avec le SCOP, jamais avec le COP de tête.`,
      prompt: "Comparez la chaleur et l’électricité de chaque période, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/cop-et-scop.svg", `Graphique en barres, trois périodes de l’année du bâtiment d’exemple. Pour chacune, une barre claire, la chaleur donnée, et une barre foncée, l’électricité consommée. ${EX.periodes.map(p => `${p.nom} : COP ${p.cop}, ${p.q} kWh de chaleur, ${p.e} kWh d’électricité`).join(". ")}. Sous le graphique : année, ${EX.saison.q} ÷ ${EX.saison.e} = SCOP ${EX.scop} ; catalogue, COP ${EX.cop7} à +7 °C, un seul point de l’année.`, "Le SCOP : la chaleur de toute l’année divisée par l’électricité de toute l’année.")
        + exempleScop()
        + BE.alerte("<strong>Piège.</strong> Sur une étiquette énergie, le nombre de kWh par an est déjà une consommation d’électricité. Le rediviser par le SCOP compterait deux fois l’avantage de la machine (Habilitation Fluide, même module).")
    }),

    BE.ecran({
      id: "consommation-pac", dossier: "methode", kicker: "La méthode, 4", title: "L’électricité de la pompe à chaleur", level: "comprendre",
      text: `Sous le point de bivalence de la station T9, l’appoint électrique complète la machine. Une résistance donne 1 kWh de chaleur pour 1 kWh d’électricité. La part de la chaleur de l’année que l’appoint fournit dépend des heures froides du site ; l’exercice la donne : ${EX.partPc} % pour l’exemple, dont le point de bivalence tombe vers ${EX.biv} °C (station T9). Le calcul se fait en trois lignes. L’appoint : besoin × part. La machine : le reste du besoin ÷ SCOP. L’électricité du chauffage : la somme des deux. Plus le point de bivalence est bas, plus la part d’appoint est petite.`,
      prompt: "Lisez les trois lignes de l’exemple résolu, puis continuez.",
      render: () => tableau(["Ligne", "Calcul", "Bâtiment d’exemple"], [
        ["Appoint (kWh)", "besoin × part d’appoint", `${EX.Q} × ${EX.partPc} ÷ 100 = ${P.appoint}`],
        ["Machine (kWh)", "(besoin − appoint) ÷ SCOP", `${P.chaleur} ÷ ${EX.scop} = ${P.machine}`],
        ["Électricité du chauffage (kWh)", "appoint + machine", `${P.appoint} + ${P.machine} = ${P.elec}`]
      ], `${EX.pacNom}, bâtiment d’exemple, année moyenne`) + exemplePac()
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, la pompe à chaleur", title: "À l’écran : l’électricité d’une pompe à chaleur", level: "appliquer", requiresAction: true,
      text: {
        1: `Un bâtiment demande ${EX.ex2.Q} kWh de chauffage dans l’année. Sa pompe à chaleur a un COP de ${EX.ex2.cop} à +7 °C et un SCOP de ${EX.ex2.scop} ; l’appoint donne ${EX.ex2.partPc} % de la chaleur de l’année. Calculez l’électricité du chauffage. Le tableau en trois lignes reste votre modèle.`,
        2: `Un bâtiment demande ${EX.ex2.Q} kWh de chauffage dans l’année. Sa pompe à chaleur a un COP de ${EX.ex2.cop} à +7 °C et un SCOP de ${EX.ex2.scop} ; l’appoint donne ${EX.ex2.partPc} % de la chaleur de l’année. Calculez l’électricité du chauffage.`
      },
      prompt: { 1: "Choisissez l’électricité du chauffage, en vous aidant du tableau.", 2: "Choisissez l’électricité du chauffage. Cette question est à faire seul." },
      aides: {
        1: ["Le besoin, le SCOP et la part d’appoint sont dans l’énoncé. La méthode est à l’écran « L’électricité de la pompe à chaleur ».", `L’appoint d’abord : ${EX.ex2.Q} × ${EX.ex2.partPc} ÷ 100.`, `Le reste du besoin se divise par le SCOP, ${EX.ex2.scop}, pas par le COP de tête. Puis ajoutez l’appoint.`],
        2: ["La méthode est à l’écran « L’électricité de la pompe à chaleur ».", "Deux nombres de performance sont donnés : un seul vaut pour l’année.", "L’appoint ne se divise par rien."]
      },
      ...BE.parNiveau({ 1: avecBloc(exemplePac(), EX.ex2.quiz), 2: avecBloc("", EX.ex2.quiz) })
    }),

    BE.ecran({
      id: "chaudiere-gaz", dossier: "methode", kicker: "La méthode, 5", title: "La chaudière gaz", level: "comprendre",
      text: `Pour comparer, le bureau d’études chiffre aussi une chaudière gaz à condensation. Son rendement saisonnier, chaleur donnée ÷ gaz brûlé, est plus petit que 1 : une part de l’énergie part dans les fumées. Le gaz se compte en kWh PCI, la chaleur que donne la combustion sans la vapeur d’eau des fumées. La facture compte le gaz en kWh PCS, un peu plus grands : l’exercice donne un prix ramené au kWh PCI. Gaz de l’année = besoin ÷ rendement. Si la chaudière fait aussi l’eau chaude, son énergie se divise par le rendement d’eau chaude, plus petit : l’eau chaude se fait à 55 °C, la chaudière condense moins. Son ballon perd de la chaleur comme celui de la station H6 : on garde les pertes du ballon de H6. Gaz de l’eau chaude = (énergie d’un jour + pertes du ballon) × jours ÷ 1000 ÷ rendement d’eau chaude, en kWh PCI. Le schéma compare les deux solutions pour 100 kWh de chaleur.`,
      prompt: "Comparez les deux barres du schéma, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/flux-pac-gaz.svg", `Schéma en deux rangées, pour 100 kWh de chaleur dans l’eau. Rangée 1, une unité extérieure de pompe à chaleur, SCOP ${EX.scop} : une barre de ${EX.flux.el} kWh d’électricité, foncée, et de ${EX.flux.air} kWh pris à l’air du dehors, claire. Rangée 2, une chaudière murale, rendement ${EX.rend} : une barre de 100 kWh de chaleur et ${EX.flux.pe} kWh de pertes en orange ; gaz brûlé, 100 ÷ ${EX.rend} = ${EX.flux.gz} kWh PCI.`, "La pompe à chaleur prend l’essentiel de sa chaleur dehors ; la chaudière en perd une part.") + exempleGaz()
    }),

    BE.ecran({
      id: "autres-postes", dossier: "methode", kicker: "La méthode, 6", title: "L’eau chaude, la ventilation et l’été", level: "comprendre",
      text: `Trois postes s’ajoutent au chauffage. L’eau chaude : l’électricité d’un jour de la station H6 × le nombre de jours de l’année. Avec un chauffe-eau thermodynamique, l’électricité d’un jour est plus petite que l’énergie d’un jour : la station H6 a déjà divisé la chaleur, pertes du ballon comprises, par le COP du chauffe-eau ; on ne la redivise pas. Avec un chauffe-eau électrique, l’énergie et l’électricité d’un jour sont égales. La ventilation : l’énergie de l’année du caisson, à la station A4. L’été, si le froid est installé : la puissance frigorifique de la station T8 × les heures de marche à pleine puissance, ÷ 1000, donne le froid de l’année en kWh ; divisé par le SEER, l’efficacité de la machine sur l’été, il donne l’électricité. Les heures et le SEER sont des données de l’exercice. Pour les bureaux d’exemple, l’eau chaude vient d’un petit chauffe-eau électrique et le froid est une option que le maître d’ouvrage fait chiffrer.`,
      prompt: "Comparez les barres des postes, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/postes-exemple.svg", `Graphique en barres horizontales, électricité de l’année du bâtiment d’exemple, solution pompe à chaleur : chauffage ${A.chauffage} kWh, en orange ; eau chaude ${A.ecs} kWh ; ventilation ${A.ventilation} kWh ; été, en option, ${A.ete} kWh. Total ${A.elec} kWh.`, "Le chauffage pèse le plus : c’est lui qu’on soigne d’abord.") + exemplePostes()
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, l’été", title: "À l’écran : l’électricité d’un été", level: "appliquer", requiresAction: true,
      text: {
        1: `Un bâtiment demande ${EX.ex3.P} W de froid à la pointe. L’exercice donne ${EX.ex3.h} heures de marche à pleine puissance sur l’été, et un SEER de ${EX.ex3.seer}. Calculez l’électricité de l’été. L’exemple résolu reste sous vos yeux.`,
        2: `Un bâtiment demande ${EX.ex3.P} W de froid à la pointe. L’exercice donne ${EX.ex3.h} heures de marche à pleine puissance sur l’été, et un SEER de ${EX.ex3.seer}. Calculez l’électricité de l’été.`
      },
      prompt: { 1: "Choisissez l’électricité de l’été, en vous aidant de l’exemple.", 2: "Choisissez l’électricité de l’été. Cette question est à faire seul." },
      aides: {
        1: ["La puissance, les heures et le SEER sont dans l’énoncé. La méthode est à l’écran « L’eau chaude, la ventilation et l’été ».", "Le froid de l’année d’abord : puissance × heures ÷ 1000, en kWh.", `Puis divisez par le SEER. Dans l’exemple : ${EX.ete.froid} ÷ ${EX.ete.seer} = ${EX.ete.elec} kWh.`],
        2: ["La méthode est à l’écran « L’eau chaude, la ventilation et l’été ».", "Passez des watts aux kWh avant tout.", "Le SEER divise le froid : la machine donne plus de froid qu’elle ne consomme d’électricité."]
      },
      ...BE.parNiveau({ 1: avecBloc(exemplePostes(), EX.ex3.quiz), 2: avecBloc("", EX.ex3.quiz) })
    }),

    BE.ecran({
      id: "cout-emissions", dossier: "methode", kicker: "La méthode, 7", title: "Le coût et les émissions", level: "comprendre",
      text: `Rangez d’abord chaque poste par énergie : électricité ou gaz. Le coût de l’année vaut, pour chaque énergie, kWh × prix, puis la somme. Les émissions de CO2 valent kWh × facteur d’émission, puis la somme : c’est la part indirecte du TEWI et l’idée de l’indicateur Ic énergie de la RE2020 (stations Législation « Le TEWI » et « La RE2020 »). Les prix et les facteurs sont des données de l’exercice, les mêmes pour l’exemple et la maison : ${EX.prix.elec} € et ${EX.fe.elec} kg de CO2 par kWh d’électricité, ${EX.prix.gaz} € et ${EX.fe.gaz} kg par kWh PCI de gaz. Les abonnements ne sont pas comptés. Un poste qui ne change pas d’une solution à l’autre, comme la ventilation et l’été, s’ajoute aux deux : il ne change pas l’écart.`,
      prompt: "Comparez les barres des deux solutions, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/comparaison-exemple.svg", `Deux graphiques en barres, bâtiment d’exemple. Coût de l’année : pompe à chaleur ${A.cout} €, chaudière gaz ${B.cout} €. Émissions de l’année : pompe à chaleur ${A.co2} kg de CO2, chaudière gaz ${B.co2} kg. Les barres du gaz sont en orange. Sous les graphiques : économie de la pompe à chaleur, ${B.cout} − ${A.cout} = ${EX.eco} € par an.`, "La pompe à chaleur coûte un peu moins et émet bien moins.")
        + tableau(["Solution", "Électricité (kWh)", "Gaz (kWh PCI)", "Coût (€)", "CO2 (kg)"], [["Pompe à chaleur", A.elec, "0", A.cout, A.co2], ["Chaudière gaz", B.elec, B.gaz, B.cout, B.co2]], "Bâtiment d’exemple, année moyenne") + exempleCout()
    }),

    BE.ecran({
      id: "temps-de-retour", dossier: "methode", kicker: "La méthode, 8", title: "Le temps de retour", level: "comprendre",
      text: `La pompe à chaleur coûte plus cher à poser que la chaudière ; elle coûte moins cher chaque année. Le temps de retour dit en combien d’années l’économie rembourse le surcoût : surcoût ÷ économie de l’année. L’économie se calcule sur le coût total des deux solutions. Le surcoût est une donnée de l’exercice, aides déduites (station Législation « Les CEE » pour les aides). Pour l’exemple, l’économie est petite et le retour long ; les émissions sont divisées par ${EX.rapportCo2}. Le bureau d’études donne les deux au maître d’ouvrage : le choix se fait sur le coût, sur le CO2, et sur ce que le CCTP demande.`,
      prompt: "Repérez le croisement sur le graphique, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/temps-de-retour.svg", `Graphique : en abscisse les années, de 0 à 25 ; en ordonnée les euros, de 0 à 4000. Une droite part de 0 et monte de ${EX.eco} € par an : l’économie cumulée. Une ligne horizontale en tirets à ${EX.surcout} € : le surcoût. Elles se croisent en un point orange, vers ${EX.retour} ans.`, "Le temps de retour : là où l’économie cumulée rattrape le surcoût.") + exempleRetour()
    }),

    BE.ecran({
      id: "exercice-4", dossier: "methode", kicker: "Exercice à l’écran 4, le retour", title: "À l’écran : un temps de retour", level: "appliquer", requiresAction: true,
      text: {
        1: `Une solution coûte ${EX.ex4.surcout} € de plus à poser. Elle coûte ${EX.ex4.cA} € par an, contre ${EX.ex4.cB} € par an pour l’autre. Calculez le temps de retour. L’exemple résolu reste sous vos yeux.`,
        2: `Une solution coûte ${EX.ex4.surcout} € de plus à poser. Elle coûte ${EX.ex4.cA} € par an, contre ${EX.ex4.cB} € par an pour l’autre. Calculez le temps de retour.`
      },
      prompt: { 1: "Choisissez le temps de retour, en vous aidant de l’exemple.", 2: "Choisissez le temps de retour. Cette question est à faire seul." },
      aides: {
        1: ["Le surcoût et les deux coûts sont dans l’énoncé. La méthode est à l’écran « Le temps de retour ».", "L’économie de l’année d’abord : la différence des deux coûts.", `Puis surcoût ÷ économie. Dans l’exemple : ${EX.surcout} ÷ ${EX.eco} = ${EX.retour} ans.`],
        2: ["La méthode est à l’écran « Le temps de retour ».", "Le surcoût se rembourse par l’économie, pas par le coût d’une solution.", "Le résultat est un nombre d’années."]
      },
      ...BE.parNiveau({ 1: avecBloc(exempleRetour(), EX.ex4.quiz), 2: avecBloc("", EX.ex4.quiz) })
    }),

    BE.ecran({
      id: "indicateurs", dossier: "methode", kicker: "La méthode, 9", title: "Lire les indicateurs RE2020 et le DPE", level: "comprendre",
      text: "Votre calcul éclaire les indicateurs de l’étude réglementaire, sans la remplacer. La RE2020 en compte six (station Législation « La RE2020 »). Le Bbio juge le bâti seul : changer la machine ne le change pas. Le Cep compte l’énergie primaire de cinq usages : chauffage, refroidissement, eau chaude, éclairage, auxiliaires ; le Cep,nr n’en garde que la part non renouvelable. L’Ic énergie convertit les consommations en CO2 sur la vie du bâtiment ; l’Ic construction compte les matériaux et le chantier ; le DH, les degrés-heures d’inconfort d’été. Le DPE classe un logement de A à G sur l’énergie et sur les gaz à effet de serre : le moins bon des deux l’emporte (station « Le DPE »). Tous se calculent par une méthode conventionnelle : un client qui les compare à sa facture ne retrouve pas le même nombre. La station ne donne aucun seuil : il se lit dans le texte en vigueur pour le projet.",
      prompt: "Lisez le tableau ligne par ligne, puis continuez.",
      render: () => tableau(["Indicateur", "Ce qu’il mesure", "Ce que la station en approche"], [
        ["Bbio", "Les besoins du bâti : enveloppe, orientation, isolation", "Rien : la station part de H, déjà fixé"],
        ["Cep, Cep,nr", "L’énergie primaire de cinq usages", "Les postes de la station, en énergie finale, sans l’éclairage"],
        ["Ic énergie", "Le CO2 des consommations, sur la vie du bâtiment", "Les émissions d’une année"],
        ["Ic construction", "Le CO2 des matériaux et du chantier", "Rien"],
        ["DH", "L’inconfort d’été, en degrés-heures", "Rien : la station compte l’électricité de l’été"],
        ["DPE, étiquettes A à G", "Énergie et gaz à effet de serre d’un logement", "Les deux grandeurs, sans la méthode du DPE"]
      ], "Indicateurs réglementaires, en lecture, sans valeur")
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 10", title: "La note de l’énergie", level: "comprendre",
      text: "La note dit les données et leur source, le besoin de chauffage, l’électricité de chaque poste, le gaz de la solution de comparaison, le coût, les émissions et le temps de retour, puis la conclusion. Un autre technicien doit pouvoir refaire chaque ligne. Les données de l’exercice sont écrites comme telles. Voici la note du bâtiment d’exemple. Sur la feuille du niveau 2, la note est abrégée en deux rubriques : « Sources » dit d’où vient chaque donnée, une par ligne, données de l’exercice comprises ; « Conclusion » reprend le coût, les émissions et le retour, et dit quelle solution l’emporte.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de l’énergie du bâtiment d’exemple"], [
        ["Objet", "Énergie de l’année, petit bâtiment de bureaux de plain-pied, année moyenne"],
        ["Données", `H = ${EX.H} W/K (station T5) ; ${EX.dju.tot} DJU ; c = ${EX.c}, SCOP ${EX.scop}, appoint ${EX.partPc} %, rendement ${EX.rend} (exercice)`],
        ["Chauffage", `Besoin ${EX.Q} kWh ; pompe à chaleur ${P.elec} kWh d’électricité ; chaudière ${EX.gaz} kWh PCI de gaz`],
        ["Autres postes", `Eau chaude ${A.ecs} kWh, ventilation ${A.ventilation} kWh, été en option ${A.ete} kWh (exercice)`],
        ["Coût et CO2", `Pompe à chaleur ${A.cout} € et ${A.co2} kg ; chaudière ${B.cout} € et ${B.co2} kg par an`],
        ["Retour", `${EX.surcout} ÷ ${EX.eco} = ${EX.retour} ans`],
        ["Conclusion", `La pompe à chaleur coûte un peu moins et émet ${EX.rapportCo2} fois moins ; son surcoût se rembourse lentement`]
      ], "Note de l’énergie, bâtiment d’exemple")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

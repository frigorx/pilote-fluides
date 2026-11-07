/* Station BE-A6 : CTA 2 : sélectionner.
   Volet tertiaire : le bâtiment de bureaux du fil rouge tertiaire (fil-rouge/tertiaire/). Méthode sur le bâtiment d'exemple, mais un autre
   cas que les niveaux : la salle de réunion seule avec sa propre centrale, deux récupérateurs de l'exercice (η = 0,60 et 0,75) ; niveau 1 sur
   le noyau (bureau et salle de réunion) ; niveau 2 sur le bâtiment entier. Les valeurs de l'exemple (bloc EXEMPLE), les données des
   commandes et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/a6-cta-selectionner/construire.mjs, depuis
   exemple-data.mjs, fil-rouge/tertiaire/ (donnees-tertiaire.json, cctp-tertiaire.json, cctp-ajout-a6.json) et
   corriges/a6-cta-selectionner/reference-selection.json (outils/a6-cta-tertiaire.mjs). Les figures de illustrations/ sont tracées par le
   même outil (schema.mjs). Aucune valeur calculée des niveaux 1 et 2 n'est écrite dans cette station : seules les bornes des fourchettes
   et les données des commandes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/tertiaire/";
/*EXEMPLE-DEBUT*/
const EX = {
 "d": {
  "te": "−7",
  "ti": "19",
  "ts": "19",
  "dju": "2 400",
  "jours": 5,
  "debut": "7 h 30",
  "fin": "19 h",
  "parJour": "11,5",
  "heures": "57,5",
  "part": "0,342",
  "qN1": "290",
  "qN2": "440",
  "etaP": "0,54",
  "etaR": "0,78",
  "maint": "0,90",
  "degag": "0,50",
  "passage": "0,90",
  "Llt": "5,87",
  "llt": "3,17"
 },
 "ex": {
  "qv": "240",
  "etaP": "0,60",
  "etaR": "0,75",
  "t2P": "8,6",
  "t2R": "12,5",
  "PbcP": "849",
  "PbcR": "530",
  "PbcSans": "2 122",
  "sans": "1 609",
  "Ep": "965",
  "Er": "1 207",
  "ecart": "242",
  "tP": "P-300",
  "tR": "R-300",
  "dimP": "2,20 × 0,80 × 1,10 m",
  "dimR": "1,80 × 0,85 × 1,10 m",
  "LP": "2,20",
  "lP": "0,80",
  "longP": "3,20",
  "passageP": "1,47",
  "passageR": "1,42"
 },
 "cat": [
  [
   "P-300",
   "échangeur à plaques",
   "300",
   "2,20 × 0,80 × 1,10"
  ],
  [
   "P-500",
   "échangeur à plaques",
   "500",
   "2,60 × 0,90 × 1,20"
  ],
  [
   "P-800",
   "échangeur à plaques",
   "800",
   "3,00 × 1,00 × 1,40"
  ],
  [
   "R-300",
   "roue",
   "300",
   "1,80 × 0,85 × 1,10"
  ],
  [
   "R-500",
   "roue",
   "500",
   "2,10 × 1,10 × 1,10"
  ],
  [
   "R-800",
   "roue",
   "800",
   "2,40 × 1,30 × 1,30"
  ]
 ],
 "ex1": {
  "te": "−5",
  "ti": "20",
  "eta": "0,70",
  "quiz": {
   "choices": [
    "12,5 °C",
    "17,5 °C",
    "9 °C",
    "10,5 °C"
   ],
   "good": 0,
   "explain": "L’écart entre la reprise et le dehors vaut 25 K ; le récupérateur en rend 0,70 × 25 = 17,5 K, en partant de −5 °C : 12,5 °C. 17,5 °C oublie de partir de la température du dehors ; 9 °C prend η × θ reprise au lieu de l’écart ; 10,5 °C additionne les deux températures."
  }
 },
 "ex2": {
  "qv": "500",
  "eta": "0,70",
  "dju": "2 000",
  "heures": "50",
  "quiz": {
   "choices": [
    "5 712 kWh",
    "1 700 kWh",
    "2 429 kWh",
    "70,8 kWh"
   ],
   "good": 1,
   "explain": "0,34 × 500 × 0,70 × 2 000 × 24 × 50 ÷ 168 ÷ 1 000 = 1 700 kWh. 5 712 kWh compte toute la semaine, centrale arrêtée comprise ; 2 429 kWh oublie l’efficacité (c’est l’énergie sans récupérateur) ; 70,8 kWh oublie le 24 des degrés-heures."
  }
 },
 "ex3": {
  "prof": "2,80",
  "l": "1,10",
  "maint": "0,90",
  "pass": "0,90",
  "quiz": {
   "choices": [
    "Oui : il reste 0,80 m, cela suffit",
    "Non : il manque 1,10 m",
    "Non : il ne reste que 0,80 m de passage",
    "Oui : il reste 1,70 m"
   ],
   "good": 2,
   "explain": "2,80 − (1,10 + 0,90) = 0,80 m, moins que les 0,90 m exigés : la centrale ne tient pas. 1,70 m oublie la place de maintenance ; 0,80 m ne suffit pas, puisque le passage doit faire au moins 0,90 m ; « il manque 1,10 m » confond le manque avec la largeur de la centrale."
  }
 },
 "img": {
  "recup": "illustrations/recuperateurs.svg",
  "semaine": "illustrations/semaine.svg",
  "energies": "illustrations/energies-exemple.svg",
  "implantation": "illustrations/local-technique.svg",
  "clapet": "illustrations/clapet.svg"
 }
};
/*EXEMPLE-FIN*/

const d = EX.d, X = EX.ex;
/* Une figure s'ouvre en grand d'un toucher (au téléphone, le doigt l'agrandit ensuite). */
const figure = (src, alt, legende) => `<figure class="schema"><a href="${BE.esc(src)}" target="_blank" rel="noopener"><img src="${BE.esc(src)}" alt="${BE.esc(alt)}"></a><figcaption>${BE.esc(legende.replace(/\.?$/, "."))} Touchez la figure pour l’ouvrir en grand.</figcaption></figure>`;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const figRecup = () => figure(EX.img.recup, "Deux récupérateurs côte à côte. À gauche, l’échangeur à plaques : un carré posé sur sa pointe, quadrillé de plaques fines ; l’air neuf, en trait bleu plein, le traverse de gauche à droite ; l’air extrait, en tirets gris, le traverse de haut en bas ; les deux airs se croisent sans se toucher. Un petit symbole de récupérateur en perspective est posé en haut à gauche. À droite, la roue : un disque coupé en deux par un trait horizontal ; l’air extrait traverse la moitié haute de droite à gauche, l’air neuf la moitié basse de gauche à droite ; une flèche orange en arc au-dessus montre que la roue tourne et passe d’un air à l’autre.", "L’échangeur à plaques sépare les deux airs ; la roue tourne et passe d’un air à l’autre");
const exempleTemperature = () => BE.exemple({ text: `Salle de réunion seule, ${X.qv} m³/h, ${d.te} °C dehors, reprise à ${d.ti} °C, soufflage à ${d.ts} °C ; récupérateurs : autres appareils, valeurs d’exercice`, answer: `plaques, η = ${X.etaP} : θ = ${d.te} + ${X.etaP} × (${d.ti} − (${d.te})) = ${X.t2P} °C, batterie ${X.PbcP} W ; roue, η = ${X.etaR} : θ = ${X.t2R} °C, batterie ${X.PbcR} W`, why: `Batterie chaude = 0,34 × ${X.qv} × (${d.ts} − θ après récupérateur). Sans récupérateur, elle fournirait 0,34 × ${X.qv} × (${d.ts} − (${d.te})) = ${X.PbcSans} W.` });
const exempleEnergie = () => BE.exemple({ text: `Salle de réunion seule, ${X.qv} m³/h, ${d.dju} DJU, ${d.heures} h sur 168 h ; récupérateurs : autres appareils, valeurs d’exercice`, answer: `sans récupérateur : 0,34 × ${X.qv} × ${d.dju} × 24 × ${d.heures} ÷ 168 ÷ 1 000 = ${X.sans} kWh ; plaques : ${X.sans} × ${X.etaP} = ${X.Ep} kWh ; roue : ${X.sans} × ${X.etaR} = ${X.Er} kWh ; écart ${X.Er} − ${X.Ep} = ${X.ecart} kWh`, why: "On calcule une fois l’énergie sans récupérateur, puis on la multiplie par l’efficacité de chaque récupérateur." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Le débit du noyau (bureau et salle de réunion) est dans la commande : ${d.qN1} m³/h. Les efficacités sont celles du CCTP : ${d.etaP} pour les plaques, ${d.etaR} pour la roue. Les DJU et les horaires sont dans la commande.`,
      "Exercice 1 de la feuille : écrans « La centrale ne marche que pendant l’occupation » et « L’énergie récupérée sur l’année ». Exercice 2 : même écran. Exercice 3 : écran « Comparer les deux centrales ». Exercice 4 : écran « La justification écrite ».",
      `Sur l’exemple, l’énergie sans récupérateur vaut 0,34 × ${X.qv} × ${d.dju} × 24 × ${d.heures} ÷ 168 ÷ 1 000. Gardez la même ligne avec le débit du noyau, puis multipliez par chaque efficacité.`
    ],
    2: [
      `Le débit d’air neuf du bâtiment entier, ${d.qN2} m³/h, est dans vos résultats de la station A5, avec la température après les plaques et la batterie chaude à la température de base. Les efficacités sont dans le CCTP du bâtiment. Le catalogue est à l’écran « Sélectionner sur catalogue » ; le local technique est sur le plan du rez-de-chaussée.`,
      "Cinq gestes déjà vus : la roue à la température de base, l’énergie de l’année, la taille sur catalogue et l’encombrement, les clapets coupe-feu, la justification écrite.",
      "Commencez par l’énergie sans récupérateur du bâtiment entier : les deux énergies récupérées en découlent."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensProjet = n => BE.liens(n === 1 ? [
  { href: EX.img.semaine, title: "La semaine d’occupation", note: "Les heures où la centrale marche" },
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment", note: "Ventilation, centrale, horaires d’occupation" }
] : [
  { href: DOSSIER + "plans-tertiaire.pdf", title: "Les plans du bâtiment de bureaux", note: "Le local technique au plan du rez-de-chaussée" },
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment", note: "Ventilation, centrale, horaires d’occupation" },
  { href: EX.img.implantation, title: "Le local technique, cotes du plan", note: "La figure de l’exemple, à refaire avec votre taille de centrale" }
]);
ecranProjet.render = () => { const html = rendreCommande(); if (html.includes("partie-reservee")) return html; return html + liensProjet(html.includes("niveau autonome") ? 2 : 1); };

BE.station({
  code: "BE-A6",
  titre: "CTA 2 : sélectionner",
  ligne: "Aéraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le noyau du bâtiment de bureaux (bureau et salle de réunion) : énergie des deux centrales, tableau de comparaison, choix en trois phrases, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Le bâtiment de bureaux entier : roue à la température de base, énergie de l’année, taille et encombrement, clapets coupe-feu, choix justifié, note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "La centrale de traitement d’air du bâtiment de bureaux est composée (station A5). Le CCTP prévoit un échangeur à plaques et demande au bureau d’études de le comparer à une roue de récupération. Vous calculez l’énergie que chacun récupère sur l’année, vous comparez ce que l’efficacité ne dit pas (odeurs, humidité, entretien), vous vérifiez la place dans le local technique, vous repérez les clapets coupe-feu et vous justifiez le choix par écrit. Vous apprenez la méthode sur la salle de réunion seule, puis vous la faites sur le noyau du bâtiment et sur le bâtiment entier.",
  note: "Les degrés-jours (2 400), le catalogue des centrales, la place de maintenance et le degré coupe-feu des murs du local technique sont des données de l’exercice : ce ne sont pas des appareils du commerce. Le catalogue du fabricant donne ces tailles et ces dimensions ; vous les lirez de la même façon. La règle du clapet coupe-feu vient de la station « Clapets coupe-feu » de la Législation.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur la salle de réunion seule" },
    { id: "projet", label: "Le projet", note: "commande, plans et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Le noyau du bâtiment de bureaux : comparer la centrale à plaques et la centrale à roue",
      delai: "Rendu en fin de séance",
      commande: [
        `Le noyau du bâtiment (bureau et salle de réunion) reçoit ${d.qN1} m³/h d’air neuf. Le CCTP prévoit un échangeur à plaques d’efficacité ${d.etaP} et demande de le comparer à une roue d’efficacité ${d.etaR}. L’air extrait des sanitaires passe par la centrale : le maître d’ouvrage ne veut aucune odeur de l’air extrait dans l’air neuf. Données : horaires du CCTP, ${d.jours} jours de ${d.debut} à ${d.fin} ; ${d.dju} degrés-jours par an (donnée de l’exercice). Suivez les étapes dans l’ordre.`,
        "Étape 1. Calculez la part d’occupation, puis l’énergie que la batterie chaude fournirait sur l’année sans récupérateur.",
        "Étape 2. Calculez l’énergie récupérée sur l’année par les plaques, puis par la roue, et leur écart.",
        "Étape 3. Remplissez le tableau de comparaison, puis écrivez votre choix en trois phrases. Vérifiez les deux énergies et leur écart à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Débit, efficacités, horaires, DJU", ou: "Dans la commande" },
        { piece: "Extrait de CCTP du bâtiment", ou: "Lien ci-dessous" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "La centrale du bâtiment de bureaux : comparer, sélectionner, implanter, justifier",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études sélectionne la centrale du bâtiment de bureaux entier. Données : vos résultats de la station A5 (débit d’air neuf du bâtiment entier, ${d.qN2} m³/h ; température après les plaques et batterie chaude à ${d.te} °C) et le CCTP du bâtiment (récupérateur de base et variante, horaires d’occupation). L’air extrait des sanitaires passe par la centrale : le maître d’ouvrage ne veut aucune odeur de l’air extrait dans l’air neuf. Données de l’exercice : ${d.dju} degrés-jours par an ; le catalogue de l’écran « Sélectionner sur catalogue » ; une place de maintenance de ${d.maint} m devant les portes de visite, ${d.degag} m à chaque bout, un passage d’au moins ${d.passage} m ; les murs du local technique sur l’accueil (M12) et sur le bureau (M11) sont coupe-feu une heure. Le réseau quitte le local par six traversées : prise d’air neuf et rejet par la façade nord (M09) ; soufflage de l’accueil, du plateau et de la salle de réunion et reprise de l’accueil par M12 ; soufflage du bureau et extraction des sanitaires par M11. Calculez la température après la roue et sa batterie chaude, l’énergie de l’année des deux centrales, choisissez la taille de chacune et vérifiez qu’elle tient dans le local technique, repérez les clapets coupe-feu, puis justifiez votre choix et rédigez la première page de la note de calcul.`,
      pieces: [
        { piece: "Vos résultats de la station A5", ou: "Débit d’air neuf du bâtiment entier, température après les plaques et batterie chaude à la température de base" },
        { piece: "Extrait de CCTP et plans du bâtiment", ou: "Liens ci-dessous ; local technique au plan du rez-de-chaussée" },
        { piece: "Catalogue des centrales", ou: "Écran « Sélectionner sur catalogue »" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },
  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-Ep", libelle: "Énergie récupérée sur l’année par les plaques, en kWh", unite: "kWh", min: 1018, max: 1082, indice: "Relisez les écrans « La centrale ne marche que pendant l’occupation » et « L’énergie récupérée sur l’année » : 0,34 × qv × η × DJU × 24 × heures d’occupation ÷ 168 ÷ 1 000, avec l’efficacité des plaques." },
      { id: "n1-Er", libelle: "Énergie récupérée sur l’année par la roue, en kWh", unite: "kWh", min: 1470, max: 1562, indice: "Relisez l’écran « L’énergie récupérée sur l’année » : la même ligne, avec l’efficacité de la roue." },
      { id: "n1-ecart", libelle: "Écart roue moins plaques, en kWh", unite: "kWh", min: 452, max: 481, indice: "Relisez l’écran « L’énergie récupérée sur l’année » : énergie de la roue moins énergie des plaques, pas énergie sans récupérateur." }
    ],
    2: [
      { id: "n2-theta", libelle: "Température de l’air neuf après la roue à la température de base, en °C", unite: "°C", min: 12.78, max: 13.78, indice: "Relisez l’écran « La température après le récupérateur » : θe + η × (θ reprise − θe), en partant de la température du dehors." },
      { id: "n2-Pbc", libelle: "Batterie chaude avec la roue à la température de base, en W", unite: "W", min: 830, max: 882, indice: "Relisez l’écran « La température après le récupérateur » : 0,34 × qv × (θ soufflage − θ après la roue), avec le débit du bâtiment entier." },
      { id: "n2-Ep", libelle: "Énergie récupérée sur l’année par les plaques, en kWh", unite: "kWh", min: 1544, max: 1641, indice: "Relisez les écrans « La centrale ne marche que pendant l’occupation » et « L’énergie récupérée sur l’année » : 0,34 × qv × η × DJU × 24 × heures d’occupation ÷ 168 ÷ 1 000, avec l’efficacité des plaques." },
      { id: "n2-Er", libelle: "Énergie récupérée sur l’année par la roue, en kWh", unite: "kWh", min: 2231, max: 2370, indice: "Relisez l’écran « L’énergie récupérée sur l’année » : la même ligne, avec l’efficacité de la roue." }
    ]
  },
  /*FOURCHETTES-FIN*/
  suivante: { code: "BE-H1", titre: "Puissance et débit", href: "../h1-puissance-debit-regime/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Récupération d’énergie", href: "../../../aerorezo/stations/recuperation/index.html", pourquoi: "L’efficacité d’un récupérateur, ce qu’elle dit et ce qu’elle ne dit pas." },
    { reseau: "Législation", titre: "Clapets coupe-feu", href: "../../../legislation/stations/incendie-clapets-coupe-feu/index.html", pourquoi: "Le clapet rétablit le degré de la paroi traversée par une gaine." },
    { reseau: "Législation", titre: "Désenfumage", href: "../../../legislation/stations/incendie-desenfumage/index.html", pourquoi: "Le lot ventilation touche au lot sécurité incendie." },
    { reseau: "Bureau d’études", titre: "BE-A5, CTA 1 : composer", href: "../a5-cta-composer/index.html", pourquoi: "La température après le récupérateur et la batterie chaude viennent de cette station." }
  ],
  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "La centrale de traitement d’air du bâtiment de bureaux récupère la chaleur de l’air extrait pour réchauffer l’air neuf. Le CCTP prévoit un échangeur à plaques et propose une roue en variante. Le bureau d’études compare les deux centrales : l’énergie récupérée sur l’année, ce que l’efficacité ne dit pas, la place dans le local technique. Il repère aussi les clapets coupe-feu, puis il justifie la sélection par écrit. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Critère", "Plaques", "Roue"], [
        ["Énergie récupérée sur l’année (kWh)", "", ""],
        ["Les deux airs", "", ""],
        ["Humidité", "", ""],
        ["Entretien", "", ""],
        ["Air extrait, odeurs", "", ""],
        ["Place dans le local technique (niveau 2)", "", ""]
      ], "La comparaison des deux centrales, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la centrale du bâtiment de bureaux."], ["Le dossier :", "le CCTP, les plans, vos résultats de la station A5, un catalogue de l’exercice."]] },
          { title: "Vous produisez", rows: [["Le calcul :", "l’énergie de l’année des deux centrales."], ["Le choix :", "la centrale retenue, sa taille, sa place, les clapets, la justification."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "l’énergie épargnée, reprise pour le bilan de l’année."]] }
        ])
    }),
    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les deux récupérateurs et leurs efficacités, les horaires d’occupation et l’extraction des sanitaires sont dans le CCTP du bâtiment de bureaux. Le débit d’air neuf du noyau est donné par la commande du niveau 1 ; celui du bâtiment entier, la température après le récupérateur et la batterie chaude viennent de vos résultats de la station A5. Les degrés-jours, le catalogue, la place de maintenance et le degré coupe-feu des murs du local technique sont des données de l’exercice. Les dimensions du local technique se lisent sur le plan du rez-de-chaussée.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Efficacités des récupérateurs", "CCTP du bâtiment (centrale)"],
        ["Débit d’air neuf : noyau ; bâtiment entier", "Commande du niveau 1 ; vos résultats de la station A5"],
        [`Horaires : ${d.jours} jours, de ${d.debut} à ${d.fin}`, "CCTP du bâtiment (occupation)"],
        ["Température après le récupérateur, batterie chaude", "Vos résultats de la station A5"],
        [`Degrés-jours : ${d.dju} par an`, "Donnée de l’exercice"],
        ["Catalogue, place de maintenance, murs coupe-feu", "Donnée de l’exercice"],
        ["Local technique : longueur et largeur", "Plan du rez-de-chaussée"]
      ], "Les données de la sélection")
        + BE.renvoi('La centrale a été composée à <a href="../a5-cta-composer/index.html">la station A5</a>.')
    }),
    BE.ecran({
      id: "deux-recuperateurs", dossier: "methode", kicker: "La méthode, 1", title: "Deux récupérateurs : les plaques et la roue", level: "comprendre",
      text: "Dans l’échangeur à plaques, l’air neuf et l’air extrait passent dans des canaux voisins, séparés par des plaques minces. Ils se croisent sans se toucher : la chaleur traverse la plaque, l’air ne la traverse pas. La roue de récupération est un disque garni d’un remplissage fin, qui tourne lentement. Une moitié est dans l’air extrait : elle se réchauffe. En tournant, elle passe dans l’air neuf et lui rend sa chaleur. La roue récupère davantage, mais elle passe d’un air à l’autre : c’est là que se joue la comparaison.",
      prompt: "Suivez les deux airs sur chaque récupérateur, puis continuez.",
      render: () => figRecup()
        + BE.renvoi('L’efficacité d’un récupérateur est présentée dans AéroRézo, <a href="../../../aerorezo/stations/recuperation/index.html">« Récupération d’énergie »</a>.')
    }),
    BE.ecran({
      id: "temperature-apres-recuperateur", dossier: "methode", kicker: "La méthode, 2", title: "La température après le récupérateur", level: "comprendre",
      text: `La station A5 l’a établi : l’efficacité d’un récupérateur dit quelle part de l’écart entre la reprise et le dehors il rend à l’air neuf. Température après le récupérateur = θe + η × (θ reprise − θe). La batterie chaude complète jusqu’à la température de soufflage : P = 0,34 × qv × (θ soufflage − θ après récupérateur), en watts, avec qv en m³/h. Pour comparer deux centrales, on refait ce calcul avec chaque efficacité. Exemple : la salle de réunion seule, ${X.qv} m³/h, avec deux récupérateurs de l’exercice, η = ${X.etaP} pour les plaques et η = ${X.etaR} pour la roue : autres appareils, valeurs d’exercice. Ce geste sert à l’exercice 1 de la feuille du niveau 2.`,
      prompt: "Lisez la formule et l’exemple résolu, puis continuez.",
      render: () => tableau(["Récupérateur", "θ après récupérateur (°C)", "Batterie chaude (W)"], [
        ["Aucun", String(d.te), X.PbcSans],
        [`Plaques, η = ${X.etaP}`, X.t2P, X.PbcP],
        [`Roue, η = ${X.etaR}`, X.t2R, X.PbcR]
      ], `Salle de réunion seule, ${X.qv} m³/h, à ${d.te} °C dehors`) + exempleTemperature()
    }),
    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, la température", title: "Entraînement : la température après le récupérateur", level: "appliquer", requiresAction: true,
      text: {
        1: `Dehors, il fait ${EX.ex1.te} °C ; la reprise est à ${EX.ex1.ti} °C ; l’efficacité vaut ${EX.ex1.eta}. Quelle est la température de l’air neuf après le récupérateur ? L’exemple résolu reste sous vos yeux.`,
        2: `Dehors, il fait ${EX.ex1.te} °C ; la reprise est à ${EX.ex1.ti} °C ; l’efficacité vaut ${EX.ex1.eta}. Quelle est la température de l’air neuf après le récupérateur ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La température après le récupérateur ».", "Calculez d’abord l’écart entre la reprise et le dehors, puis prenez-en la part η.", `Sur l’exemple : ${d.te} + ${X.etaP} × (${d.ti} − (${d.te})) = ${X.t2P} °C.`],
        2: ["La méthode est à l’écran « La température après le récupérateur ».", "L’écart se compte depuis la température du dehors.", "θ = θe + η × (θ reprise − θe)."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleTemperature(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),
    BE.ecran({
      id: "heures-d-occupation", dossier: "methode", kicker: "La méthode, 3", title: "La centrale ne marche que pendant l’occupation", level: "comprendre",
      text: `La centrale souffle de l’air neuf quand les bureaux sont occupés. Le reste du temps, elle s’arrête, et le récupérateur ne récupère rien. Le CCTP donne les horaires : ${d.jours} jours par semaine, de ${d.debut} à ${d.fin}, soit ${d.parJour} h par jour et ${d.heures} h par semaine. Une semaine compte 7 × 24 = 168 h. La part d’occupation vaut ${d.heures} ÷ 168 = ${d.part}. L’énergie de l’année se compte sur cette part seulement. Ce geste sert à l’exercice 1 de la feuille du niveau 1.`,
      prompt: "Comptez les heures pleines sur la figure, puis continuez.",
      render: () => figure(EX.img.semaine, `Une semaine en sept lignes, du lundi au dimanche ; chaque ligne va de 0 h à 24 h. Du lundi au vendredi, une bande bleue pleine va de ${d.debut} à ${d.fin} ; le samedi et le dimanche restent vides. Deux traits orange marquent ${d.debut} et ${d.fin} sous l’axe. Sous la figure : la centrale marche ${d.jours} jours × ${d.parJour} h = ${d.heures} h ; part d’occupation ${d.heures} ÷ 168 = ${d.part}.`, `La centrale marche ${d.heures} h sur les 168 h de la semaine`)
    }),
    BE.ecran({
      id: "energie-de-l-annee", dossier: "methode", kicker: "La méthode, 4", title: "L’énergie récupérée sur l’année", level: "comprendre",
      text: `Les degrés-jours unifiés, ou DJU, mesurent le froid d’une année (station E1) : chaque jour, l’écart entre 18 °C et la température moyenne du dehors, additionné sur l’année. Multipliés par 24, ils donnent des degrés-heures. Sans récupérateur, la batterie chaude fournirait sur l’année : énergie = 0,34 × qv × DJU × 24 × part d’occupation ÷ 1 000, en kWh. Le récupérateur en reprend la part η : énergie récupérée = 0,34 × qv × η × DJU × 24 × part d’occupation ÷ 1 000. Ici, ${d.dju} DJU, donnée de l’exercice. La méthode prend les degrés-heures répartis également sur la journée et le débit nominal de la centrale sur toutes les heures d’occupation, même quand la salle de réunion est en veille : elle donne un ordre de grandeur. Ce geste sert aux exercices 1 et 2 des feuilles.`,
      prompt: "Lisez la figure et l’exemple résolu, puis continuez.",
      render: () => figure(EX.img.energies, `Trois barres horizontales pour la salle de réunion seule, ${X.qv} m³/h. Sans récupérateur : une barre claire de ${X.sans} kWh. Plaques, η = ${X.etaP} : une barre bleue de ${X.Ep} kWh récupérés, prolongée en clair jusqu’à ${X.sans} kWh. Roue, η = ${X.etaR} : une barre bleue de ${X.Er} kWh récupérés, prolongée en clair. Le bleu est l’énergie récupérée sur l’année, le clair ce que la batterie chaude fournit encore.`, `Salle de réunion seule : la roue récupère ${X.ecart} kWh de plus par an que les plaques`)
        + exempleEnergie()
    }),
    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, l’énergie", title: "Entraînement : l’énergie de l’année", level: "appliquer", requiresAction: true,
      text: {
        1: `Une centrale souffle ${EX.ex2.qv} m³/h d’air neuf, ${EX.ex2.heures} h par semaine ; son récupérateur a une efficacité de ${EX.ex2.eta} ; le site compte ${EX.ex2.dju} DJU par an. Quelle énergie récupère-t-il sur l’année ? L’exemple résolu reste sous vos yeux.`,
        2: `Une centrale souffle ${EX.ex2.qv} m³/h d’air neuf, ${EX.ex2.heures} h par semaine ; son récupérateur a une efficacité de ${EX.ex2.eta} ; le site compte ${EX.ex2.dju} DJU par an. Quelle énergie récupère-t-il sur l’année ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez l’énergie, en vous aidant de l’exemple.", 2: "Choisissez l’énergie. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « L’énergie récupérée sur l’année ».", "N’oubliez ni le 24 des degrés-heures, ni la part d’occupation.", `Sur l’exemple : 0,34 × ${X.qv} × ${d.dju} × 24 × ${d.heures} ÷ 168 ÷ 1 000 = ${X.sans} kWh, puis × η.`],
        2: ["La méthode est à l’écran « L’énergie récupérée sur l’année ».", "Degrés-heures et part d’occupation.", "Énergie = 0,34 × qv × η × DJU × 24 × part d’occupation ÷ 1 000."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleEnergie(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),
    BE.ecran({
      id: "comparer-les-centrales", dossier: "methode", kicker: "La méthode, 5", title: "Comparer les deux centrales", level: "comprendre",
      text: "L’efficacité ne dit pas tout. Dans la roue, une petite part de l’air extrait reste dans le remplissage et passe dans l’air neuf : si l’air extrait vient des sanitaires, ses odeurs peuvent revenir dans les bureaux. La roue transfère aussi une part de l’humidité de l’air extrait : l’hiver, l’air soufflé est un peu moins sec. L’échangeur à plaques sépare les deux airs. L’entretien diffère : l’échangeur à plaques n’a pas de pièce qui tourne, il se sort pour être nettoyé ; la roue a un moteur, une courroie et des joints à brosse à surveiller (les brosses frottent sur la roue et limitent le passage d’air d’une moitié à l’autre). Enfin, chaque centrale doit tenir dans le local technique. On range ces critères dans un tableau, puis on décide avec ce que demande le maître d’ouvrage. Ce geste sert à l’exercice 3 de la feuille du niveau 1.",
      prompt: "Lisez le tableau des critères de l’exemple, puis continuez.",
      render: () => tableau(["Critère", `Plaques, η = ${X.etaP}`, `Roue, η = ${X.etaR}`], [
        ["Énergie récupérée sur l’année", `${X.Ep} kWh`, `${X.Er} kWh`],
        ["Les deux airs", "séparés par les plaques", "une petite part de l’air extrait revient dans l’air neuf"],
        ["Humidité", "aucun transfert", "une part revient dans l’air neuf"],
        ["Entretien", "pas de pièce qui tourne ; échangeur à nettoyer", "moteur, courroie, joints à brosse ; roue à nettoyer"],
        ["Air extrait, odeurs", "de la salle seule", "de la salle seule : aucune odeur à craindre"],
        ["Place dans le local technique", `tient : passage ${X.passageP} m`, `tient : passage ${X.passageR} m`]
      ], "Salle de réunion seule : les critères des deux centrales") + figRecup()
    }),
    BE.ecran({
      id: "selectionner-sur-catalogue", dossier: "methode", kicker: "La méthode, 6", title: "Sélectionner sur catalogue", level: "comprendre",
      text: "Un catalogue de centrales donne, pour chaque taille, le débit maximal d’air neuf et les dimensions hors tout : longueur, largeur, hauteur. On retient la plus petite taille dont le débit maximal atteint le débit demandé. Le tableau ci-dessous est un catalogue de l’exercice, sans marque. Le catalogue du fabricant donne ces tailles et ces dimensions ; vous les lirez de la même façon, et vous citerez la page lue dans la note de calcul. Ce geste sert à l’exercice 3 de la feuille du niveau 2.",
      prompt: "Retrouvez dans le tableau la taille de l’exemple, puis continuez.",
      render: () => tableau(["Taille", "Récupérateur", "Débit maximal (m³/h)", "L × l × h (m)"], EX.cat, "Catalogue de l’exercice, deux gammes de centrales")
        + BE.exemple({ text: `Salle de réunion seule, ${X.qv} m³/h`, answer: `${X.tP} pour les plaques (${X.dimP}), ${X.tR} pour la roue (${X.dimR})`, why: `La taille 300 est la plus petite dont le débit maximal atteint ${X.qv} m³/h.` })
    }),
    BE.ecran({
      id: "encombrement", dossier: "methode", kicker: "La méthode, 7", title: "La place dans le local technique", level: "comprendre",
      text: `La centrale se pose contre la façade nord du local technique, par où passent la prise d’air neuf et le rejet ; ses portes de visite regardent l’intérieur du local. Devant les portes, il faut une place de maintenance libre : ${d.maint} m sur toute la longueur, pour ouvrir, sortir les filtres et l’échangeur. À chaque bout, ${d.degag} m pour raccorder les gaines. Entre la place de maintenance et le mur d’en face, un passage d’au moins ${d.passage} m reste libre jusqu’aux portes. On vérifie deux choses : longueur de la centrale + 2 × ${d.degag} ≤ longueur du local ; largeur du local − (largeur de la centrale + ${d.maint}) ≥ ${d.passage}. Ces trois valeurs sont des données de l’exercice ; la notice du fabricant les donne sur un vrai projet. Le local mesure ${d.Llt} × ${d.llt} m (plan du rez-de-chaussée). Ce geste sert à l’exercice 3 de la feuille du niveau 2.`,
      prompt: "Retrouvez sur le plan la place de maintenance et le passage, puis lisez l’exemple.",
      render: () => figure(EX.img.implantation, `Plan du local technique, nord en haut, ${d.Llt} m de long et ${d.llt} m de large, cotes à l’extérieur des murs. Les murs sont gris ; trois portes, à l’ouest, au sud et à l’est, avec leur battant en tirets. La centrale ${X.tP}, rectangle bleu clair, est collée au mur nord, au milieu. Deux petits rectangles en tirets la prolongent à chaque bout : ${d.degag} m pour raccorder les gaines. Devant elle, un rectangle en tirets marque la place de maintenance de ${d.maint} m. Une cote orange descend de la place de maintenance jusqu’au mur sud : passage ${X.passageP} m.`, `Salle de réunion seule, centrale ${X.tP} : il reste ${X.passageP} m de passage`)
        + BE.exemple({ text: `Centrale ${X.tP}, ${X.dimP}`, answer: `longueur ${X.LP} + 2 × ${d.degag} = ${X.longP} m ≤ ${d.Llt} m ; passage ${d.llt} − (${X.lP} + ${d.maint}) = ${X.passageP} m ≥ ${d.passage} m : elle tient`, why: `La centrale ${X.tR} (${X.dimR}) tient aussi : passage ${X.passageR} m.` })
    }),
    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, la place", title: "Entraînement : la centrale tient-elle ?", level: "appliquer", requiresAction: true,
      text: {
        1: `Un local technique a ${EX.ex3.prof} m de largeur. La centrale a ${EX.ex3.l} m de largeur ; il faut ${EX.ex3.maint} m de maintenance devant elle et un passage d’au moins ${EX.ex3.pass} m. Tient-elle ? L’exemple résolu reste sous vos yeux.`,
        2: `Un local technique a ${EX.ex3.prof} m de largeur. La centrale a ${EX.ex3.l} m de largeur ; il faut ${EX.ex3.maint} m de maintenance devant elle et un passage d’au moins ${EX.ex3.pass} m. Tient-elle ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La place dans le local technique ».", "Additionnez la largeur de la centrale et la place de maintenance, puis retirez-les de la largeur du local.", `Sur l’exemple : ${d.llt} − (${X.lP} + ${d.maint}) = ${X.passageP} m.`],
        2: ["La méthode est à l’écran « La place dans le local technique ».", "Le passage se compte après la place de maintenance.", "Passage = largeur du local − (largeur de la centrale + maintenance)."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `Centrale ${X.tP}`, answer: `passage ${d.llt} − (${X.lP} + ${d.maint}) = ${X.passageP} m`, why: `Il faut au moins ${d.passage} m.` }), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),
    BE.ecran({
      id: "clapets-coupe-feu", dossier: "methode", kicker: "La méthode, 8", title: "Les clapets coupe-feu aux traversées", level: "comprendre",
      text: "Une gaine qui traverse un mur coupe-feu ouvre un chemin au feu et aux fumées. Le degré coupe-feu d’un mur est la durée pendant laquelle il arrête le feu, par exemple une heure. Le clapet coupe-feu rétablit le degré du mur : il a le même degré coupe-feu que le mur, il se pose au droit du mur, calfeutré, et son mécanisme reste accessible ; il se ferme seul en cas de feu, et son fonctionnement se vérifie chaque année. Le bureau d’études repère chaque traversée sur le plan et compte les clapets. Une gaine qui sort par la façade, comme la prise d’air neuf ou le rejet, ne traverse pas un mur coupe-feu : on n’y pose aucun clapet. Dans le bâtiment de bureaux, les murs du local technique sur l’accueil et sur le bureau sont coupe-feu une heure : donnée de l’exercice. Ce geste sert à l’exercice 4 de la feuille du niveau 2.",
      prompt: "Comparez les deux traversées de la figure, puis continuez.",
      render: () => figure(EX.img.clapet, "Deux gaines vues de côté. À gauche, une gaine horizontale traverse un mur gris coupe-feu ; au droit du mur, un clapet, un boîtier bleu clair avec sa lame en diagonale ; des flèches bleues montrent l’air qui passe. Sous elle : mur coupe-feu, un clapet au droit du mur. À droite, une gaine traverse la façade et sort dehors par une grille, sans clapet. Sous elle : façade, aucun clapet.", "Un clapet au droit du mur coupe-feu, aucun sur la façade")
        + BE.renvoi('Le clapet coupe-feu est présenté dans la Législation, <a href="../../../legislation/stations/incendie-clapets-coupe-feu/index.html">« Clapets coupe-feu »</a>.')
    }),
    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 9", title: "La justification écrite", level: "comprendre",
      text: "Le choix se justifie en trois phrases : ce que chaque centrale récupère, ce qui départage les deux, la centrale retenue. La première page de la note de calcul reprend l’objet, les hypothèses et leurs sources, les résultats, le choix et ce que l’on transmet pour la suite. Chaque valeur cite son origine : le CCTP pour les débits et les horaires, la station A5 pour les températures, la commande pour les degrés-jours, la page du catalogue pour la taille. Un lecteur doit pouvoir refaire le choix sans vous. Dans l’exemple, la salle de réunion n’envoie aucune odeur dans la centrale : rien n’écarte la roue, qui récupère le plus. Ce geste sert à l’exercice 4 de la feuille du niveau 1 et à l’exercice 5 du niveau 2.",
      prompt: "Lisez la justification et la note de l’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Contenu"], [
        ["Choix en trois phrases", `Les plaques récupèrent ${X.Ep} kWh par an, la roue ${X.Er} kWh. L’air repris vient de la salle seule : aucune odeur ne peut revenir, et la roue rend aussi un peu d’humidité l’hiver. La roue ${X.tR} est retenue ; elle tient dans le local technique.`],
        ["Objet", "Centrale de la salle de réunion seule (cas de la méthode)."],
        ["Hypothèses et sources", `${X.qv} m³/h (CCTP) ; η = ${X.etaP} et ${X.etaR} (exercice) ; ${d.dju} DJU (exercice) ; ${d.heures} h sur 168 h (CCTP) ; catalogue de l’exercice.`],
        ["Résultats", `Sans récupérateur ${X.sans} kWh ; plaques ${X.Ep} kWh ; roue ${X.Er} kWh ; batterie chaude à ${d.te} °C : ${X.PbcR} W avec la roue.`],
        ["Pour la suite", "Énergie épargnée par an, pour le bilan de l’année ; récupérateur et température après lui, pour la régulation."]
      ], "Salle de réunion seule : justification et première page de la note")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

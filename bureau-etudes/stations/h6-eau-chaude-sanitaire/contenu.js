/* Station BE-H6 : L’eau chaude sanitaire.
   Méthode sur l’appartement d’exemple (qui n’est pas la maison), puis commande sur la maison.
   Les valeurs de l’appartement et des exercices (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/h6-eau-chaude-sanitaire/construire.mjs : le premier vient de exemple-data.mjs et de donnees-h6.json, les secondes de corrige-ecs.json (tolérance 3 %).
   Aucun résultat de la maison n’est écrit dans cette station : seules les bornes des fourchettes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "ap": {
  "n": "3",
  "lpp": "40",
  "tf": "12",
  "tu": "40",
  "ts": "60",
  "Vb": "100",
  "P": "1 500",
  "cop": "2,8",
  "V40": "120",
  "dT": "28",
  "dTs": "48",
  "E": "3 908",
  "Ekwh": "3,9",
  "Vs": "70",
  "Vb40": "171",
  "Ech": "5 582",
  "th": "3,72",
  "thm": "3 h 43 min",
  "thfrac": "0,72",
  "thmin": "43",
  "Pel": "536",
  "pV": "40",
  "pMin": "10",
  "Vps": "23,3",
  "Ep": "1 303",
  "Pinst": "7 818",
  "trH": "0,87",
  "trMin": "52",
  "hc": "5",
  "Phc": "1 116",
  "tubeL": "20",
  "tubeD": "12",
  "tubeDm": "0,012",
  "Vtube": "2,26",
  "dExt": "14",
  "VtubeExt": "3,08"
 },
 "piege": {
  "ekwh": "5,6",
  "exces": "43",
  "inv": "206",
  "thelec": "10 h 25 min",
  "pointeMinutes": "130"
 },
 "ex1": {
  "n": "2",
  "lpp": "50",
  "tf": "10",
  "quiz": {
   "choices": [
    "4 652 Wh, soit 4,7 kWh",
    "3 489 Wh, soit 3,5 kWh",
    "3 000 Wh, soit 3,0 kWh",
    "1 745 Wh, soit 1,7 kWh"
   ],
   "good": 1,
   "explain": "V40 = 2 × 50 = 100 L. E = 100 × 1,163 × (40 − 10) = 3 489 Wh, soit 3,5 kWh. A oublie l’eau froide (écart de 40 K au lieu de 30 K), C oublie la constante 1,163, D ne compte que les litres d’une seule personne."
  }
 },
 "ex2": {
  "V40": "160",
  "tf": "12",
  "ts": "60",
  "Vb": "100",
  "quiz": {
   "choices": [
    "224,0 L : le ballon de 100 L ne suffit pas",
    "106,7 L : le ballon de 100 L ne suffit pas",
    "93,3 L : le ballon de 100 L suffit",
    "274,3 L : le ballon de 100 L ne suffit pas"
   ],
   "good": 2,
   "explain": "V stock = 160 × (40 − 12) ÷ (60 − 12) = 93,3 L : le ballon de 100 L suffit. A divise par 60 − 40 au lieu de 60 − 12, B oublie l’eau froide dans les deux écarts, D écrit la fraction à l’envers."
  }
 },
 "ex3": {
  "Vb": "150",
  "tf": "12",
  "ts": "60",
  "P": "1 500",
  "cop": "2,8",
  "quiz": {
   "choices": [
    "15,62 h, soit 15 h 37 min",
    "5,58 h, soit 5 h 58 min",
    "5,58 h, soit 5 h 35 min",
    "6,98 h, soit 6 h 59 min"
   ],
   "good": 2,
   "explain": "E = 150 × 1,163 × (60 − 12) = 8 374 Wh ; t = 8 374 ÷ 1 500 = 5,58 h, soit 5 h 35 min (0,58 × 60 = 35). A divise par la puissance électrique (1 500 ÷ 2,8 = 536 W) au lieu de la puissance thermique, B lit les centièmes d’heure comme des minutes, D oublie l’eau froide (écart de 60 K au lieu de 48 K)."
  }
 },
 "mo": {
  "Ppac": "1 800",
  "cop": "3,0",
  "hc": "8",
  "tubeL": "12",
  "tubeD": "14",
  "tubeExt": "16",
  "matiere": "cuivre 14/16"
 },
 "pages": {
  "ecs": 5,
  "total": 5
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l’exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exBesoin = () => BE.exemple({ text: `Appartement d’exemple de la station H6 : ${EX.ap.n} personnes, ${EX.ap.lpp} L par personne et par jour à 40 °C (valeurs d’exercice)`, answer: `V40 = ${EX.ap.n} × ${EX.ap.lpp} = ${EX.ap.V40} L par jour`, why: "Le résultat s’écrit en litres par jour, avec la température de l’usage." });
const exEnergie = () => BE.exemple({ text: `Appartement d’exemple de la station H6 : V40 = ${EX.ap.V40} L par jour, eau froide ${EX.ap.tf} °C, eau utilisée à 40 °C`, answer: `E = ${EX.ap.V40} × 1,163 × (40 − ${EX.ap.tf}) = ${EX.ap.E} Wh, soit ${EX.ap.Ekwh} kWh`, why: `L’écart de température, ${EX.ap.dT} K, se calcule d’abord. Le résultat s’écrit en Wh, puis en kWh en divisant par 1 000.` });
const exVolume = () => BE.exemple({ text: `Appartement d’exemple de la station H6 : V40 = ${EX.ap.V40} L par jour, eau froide ${EX.ap.tf} °C, stockage à ${EX.ap.ts} °C`, answer: `V stock = ${EX.ap.V40} × (40 − ${EX.ap.tf}) ÷ (${EX.ap.ts} − ${EX.ap.tf}) = ${EX.ap.Vs} L`, why: "Le volume équivalent est plus petit que V40, puisque l’eau stockée est plus chaude que l’eau d’usage." });
const exBallon = () => BE.exemple({ text: `Appartement d’exemple de la station H6 : ballon de ${EX.ap.Vb} L, besoin équivalent de ${EX.ap.Vs} L à ${EX.ap.ts} °C`, answer: `${EX.ap.Vb} L ≥ ${EX.ap.Vs} L : le ballon suffit. Plein, il donne ${EX.ap.Vb} × (${EX.ap.ts} − ${EX.ap.tf}) ÷ (40 − ${EX.ap.tf}) = ${EX.ap.Vb40} L à 40 °C, pour un besoin de ${EX.ap.V40} L`, why: "Le ballon plein couvre le besoin d’une journée, avec une réserve." });
const exChauffe = () => BE.exemple({ text: `Appartement d’exemple de la station H6 : ballon de ${EX.ap.Vb} L, eau froide ${EX.ap.tf} °C, stockage à ${EX.ap.ts} °C, pompe à chaleur de ${EX.ap.P} W thermiques`, answer: `E = ${EX.ap.Vb} × 1,163 × (${EX.ap.ts} − ${EX.ap.tf}) = ${EX.ap.Ech} Wh ; t = ${EX.ap.Ech} ÷ ${EX.ap.P} = ${EX.ap.th} h, soit ${EX.ap.thm}`, why: `La partie décimale se convertit en minutes : ${EX.ap.thfrac} h × 60 = ${EX.ap.thmin} min.` });

/* Écran « À vous, le projet » : la commande du moteur, suivie du lien vers l’extrait de CCTP du dossier. */
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `La page ${EX.pages.ecs} de l’extrait de CCTP donne les occupants, les litres par personne et par jour à 40 °C, l’eau froide, la consigne et le volume du ballon, les températures de l’arrêté. La puissance thermique et le COP de la pompe à chaleur sont dans la commande, au-dessus.`,
      "Suivez les blocs de la feuille dans l’ordre : V40 = n × l, puis l’énergie par jour, le volume équivalent, le ballon, l’énergie de la chauffe complète, le temps et la puissance électrique. Dans la colonne « Source ou calcul », écrivez la page ou l’écran de chaque donnée.",
      `Sur l’appartement d’exemple de la station H6, V40 = ${EX.ap.n} × ${EX.ap.lpp} = ${EX.ap.V40} L par jour. Écrivez la même ligne avec les occupants et les litres du CCTP.`
    ],
    2: [
      `La page ${EX.pages.ecs} de l’extrait de CCTP donne les besoins, la pointe, les températures et le ballon. Les données du maître d’ouvrage sont dans la commande, au-dessus : pompe à chaleur, heures creuses, tube le plus long.`,
      "Reprenez les gestes des écrans dans l’ordre : besoin et énergie, volume équivalent et ballon, chauffe, pointe, heures creuses, tube. Pour la pointe, additionnez les volumes des douches et prenez la durée de l’ensemble. Écrivez vos hypothèses et vos sources dans la note de calcul.",
      `Sur l’appartement d’exemple de la station H6, une douche de ${EX.ap.pV} L à 40 °C donne ${EX.ap.Vps} L à ${EX.ap.ts} °C. Écrivez le même calcul pour la pointe du CCTP.`
    ],
    3: []
  }
});
const rendreCommande = ecranProjet.render;
const liensCctp = () => BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: `Cinq pages ; l’eau chaude sanitaire est à la page ${EX.pages.ecs}` }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensCctp(); };

BE.station({
  code: "BE-H6",
  titre: "L’eau chaude sanitaire",
  ligne: "Hydraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Chauffe-eau de la maison, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Chauffe-eau de la maison, avec la pointe et le tube, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Un bureau d’études qui équipe un logement en eau chaude calcule le besoin de la famille, l’énergie pour chauffer cette eau, le volume du ballon et le temps de chauffe, puis vérifie les températures de l’arrêté. Vous apprenez la méthode sur un appartement d’exemple, puis vous la faites sur le chauffe-eau de la maison à partir du CCTP.",
  note: "Les besoins, les températures de l’eau, la pompe à chaleur, le tube et les heures creuses de l’appartement et de la maison sont des valeurs d’exercice. La constante de l’eau est une constante physique. Les températures viennent de l’arrêté du 23 juin 1978 modifié, art. 36.",

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
      objet: "Note de calcul d’eau chaude sanitaire de la maison : besoins, énergie, ballon, chauffe et températures",
      delai: "Rendu en fin de séance",
      commande: [
        "Le maître d’ouvrage fait étudier l’eau chaude sanitaire de la maison. Le CCTP prévoit un chauffe-eau thermodynamique. Vous vérifiez que son ballon couvre le besoin de la famille et vous calculez son temps de chauffe. Suivez les étapes dans l’ordre.",
        `Étape 1. Ouvrez la page ${EX.pages.ecs} du CCTP : relevez les occupants, les litres par personne et par jour à 40 °C et l’eau froide. Calculez V40, puis l’énergie utile par jour en Wh et en kWh.`,
        "Étape 2. Relevez la consigne et le volume du ballon. Calculez le volume équivalent à la température de stockage, puis dites si le ballon suffit et ce qu’il donne à 40 °C.",
        `Étape 3. Avec la puissance thermique et le COP des données du maître d’ouvrage, calculez l’énergie de la chauffe complète du ballon, le temps de chauffe en heures et en minutes, et la puissance électrique absorbée.`,
        `Étape 4. Relevez les températures de l’arrêté et la consigne du CCTP (page ${EX.pages.ecs}), puis reportez vos deux résultats à l’écran Vérifier.`,
        `Données du maître d’ouvrage (valeurs d’exercice ; sur un vrai projet, la fiche du fabricant) : pompe à chaleur de ${EX.mo.Ppac} W thermiques, COP ${EX.mo.cop} à l’air du garage.`
      ],
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: `Page ${EX.pages.ecs} : occupants, besoin journalier, eau froide, consigne et volume du ballon, températures de l’arrêté` },
        { piece: "Données du maître d’ouvrage", ou: "Cette commande : puissance thermique et COP de la pompe à chaleur" },
        { piece: "Constante de l’eau et formules", ou: "Écrans « L’énergie pour chauffer l’eau » à « Le chauffe-eau thermodynamique »" },
        { piece: "Arrêté du 23 juin 1978 modifié, art. 36", ou: "Écran « Les températures de l’arrêté »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Note de calcul d’eau chaude sanitaire de la maison, avec la pointe du soir, les heures creuses et le tube le plus long",
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage fait étudier l’eau chaude sanitaire de la maison. À partir de la page ${EX.pages.ecs} du CCTP et des données ci-dessous, établissez la note de calcul du chauffe-eau thermodynamique : besoin journalier et énergie utile, volume équivalent et ballon, chauffe complète et puissance électrique, pointe du soir (volumes, énergie, puissance en instantané, temps de remontée), réchauffage en heures creuses, tube le plus long et bouclage, températures de l’arrêté. Rendez un tableau par bloc et, en bas de page, une note de calcul : vos hypothèses et la source de chaque donnée.`,
        `Données du maître d’ouvrage (valeurs d’exercice ; sur un vrai projet, la fiche du fabricant et le plan de plomberie) : pompe à chaleur de ${EX.mo.Ppac} W thermiques, COP ${EX.mo.cop} à l’air du garage. Réchauffage en heures creuses : ${EX.mo.hc} h par nuit. Tube le plus long : de la sortie du mitigeur, au garage, jusqu’à la douche de la salle d’eau, à l’étage, soit ${EX.mo.tubeL} m de ${EX.mo.matiere} : ${EX.mo.tubeD} mm de diamètre intérieur, ${EX.mo.tubeExt} mm de diamètre extérieur.`
      ],
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: `Page ${EX.pages.ecs} : occupants, besoin journalier, pointe, eau froide, consigne et volume du ballon, températures de l’arrêté` },
        { piece: "Données du maître d’ouvrage", ou: "Cette commande : pompe à chaleur, COP, heures creuses, tube le plus long" },
        { piece: "Constante de l’eau et formules", ou: "Écrans « L’énergie pour chauffer l’eau » à « Les légionelles et le bouclage »" },
        { piece: "Arrêté du 23 juin 1978 modifié, art. 36", ou: "Écran « Les températures de l’arrêté »" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "h6-n1-energie", libelle: "Énergie utile par jour du logement", unite: "kWh", min: 5.6, max: 6, indice: "Relisez l’écran « L’énergie pour chauffer l’eau » : V40 = n × l, puis E = V × 1,163 × (40 − θ froide) en Wh, divisée par 1 000 pour les kWh. Contrôlez l’eau froide à la page 5 du CCTP." },
      { id: "h6-n1-chauffe", libelle: "Temps de chauffe complète du ballon, en heures décimales (3,5 pour 3 h 30)", unite: "h", min: 5, max: 5.4, indice: "Relisez l’écran « Le chauffe-eau thermodynamique » : l’énergie du ballon plein se calcule de l’eau froide à la température de stockage, puis se divise par la puissance thermique de la pompe à chaleur, pas par la puissance électrique. Écrivez le temps en heures décimales." }
    ],
    2: [
      { id: "h6-n2-pointe", libelle: "Puissance qu’il faudrait en instantané pour la pointe du soir", unite: "W", min: 6768, max: 7188, indice: "Relisez l’écran « La pointe du soir » : le volume de la pointe est la somme des douches, la durée est celle de l’ensemble, en heures (minutes ÷ 60). Contrôlez l’énergie, calculée de l’eau froide à 40 °C." },
      { id: "h6-n2-remontee", libelle: "Temps de remontée du ballon après la pointe", unite: "min", min: 75, max: 81, indice: "Relisez l’écran « La pointe du soir » : le temps de remontée est l’énergie de la pointe divisée par la puissance thermique de la pompe à chaleur, puis converti en minutes." },
      { id: "h6-n2-tube", libelle: "Volume du tube le plus long", unite: "L", min: 1.79, max: 1.91, indice: "Relisez l’écran « Les légionelles et le bouclage » : le diamètre à prendre est le diamètre intérieur, converti en mètres, dans V = π ÷ 4 × d² × L × 1 000." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-F1", titre: "Besoin et système", href: "../f1-besoin-systeme/index.html" },
  correspondances: [
    { reseau: "HydroMétro", titre: "Dimensionner une distribution d’eau sanitaire", href: "../../../hydrometro/stations/sanitaire-distribution/index.html", pourquoi: "Vous y trouvez le dimensionnement d’un réseau d’eau chaude et froide, dont le tube le plus long et le bouclage." },
    { reseau: "HydroMétro", titre: "Boucle", href: "../../../hydrometro/stations/boucle/index.html", pourquoi: "Cette page explique le bouclage : retour, pompe et calorifuge." },
    { reseau: "HydroMétro", titre: "Puissance", href: "../../../hydrometro/stations/puissance/index.html", pourquoi: "La puissance d’un échange de chaleur avec l’eau y est calculée, avec la constante de l’eau." },
    { reseau: "HydroMétro", titre: "Énergie", href: "../../../hydrometro/stations/energie/index.html", pourquoi: "L’énergie pour chauffer un volume d’eau y est calculée, en wattheures." },
    { reseau: "CartoClim", titre: "Le chauffe-eau thermodynamique", href: "../../../cartoclim/stations/3-8-chauffe-eau-thermo/index.html", pourquoi: "Le principe du chauffe-eau thermodynamique y est expliqué : la pompe à chaleur prend la chaleur de l’air et la donne à l’eau." },
    { reseau: "Bureau d’études", titre: "BE-F1, Besoin et système", href: "../f1-besoin-systeme/index.html", pourquoi: "La station suivante de la ligne reprend le besoin du bâtiment pour choisir le système." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/1-douche-du-soir.webp", imageAlt: "Dessin de mise en situation : une salle d’eau dont la fenêtre montre la nuit et la lune. Une adulte en peignoir règle la douche, d’où l’eau chaude coule en dégageant de la vapeur. Un enfant en pyjama, une serviette à la main, attend son tour. C’est la pointe du soir : plusieurs douches se suivent.",
      text: "Vous recevez la commande d’un bureau d’études : établir la note de calcul d’eau chaude d’un logement. Vous calculez le besoin de la famille en litres par jour, l’énergie qu’il faut pour chauffer cette eau, le volume du ballon qui couvre ce besoin, le temps que met la pompe à chaleur à le chauffer, et vous relevez les températures de l’arrêté. Au niveau autonome, vous ajoutez la pointe du soir, le réchauffage en heures creuses et le tube le plus long. Les réponses s’écrivent sur la feuille A4 recto verso. L’écran explique chaque geste, la feuille reçoit vos résultats.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Grandeur", "Mon résultat", "Unité"], [
        ["Besoin journalier à 40 °C", "", "L par jour"],
        ["Énergie utile par jour", "", "Wh, puis kWh"],
        ["Volume équivalent à la température de stockage", "", "L"],
        ["Le ballon suffit-il ?", "", "oui ou non"],
        ["Temps de chauffe complète du ballon", "", "h et min"],
        ["Puissance électrique absorbée", "", "W"]
      ], "La note de calcul du niveau guidé, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la note de calcul d’eau chaude d’un logement."], ["Le dossier :", "la page 5 du CCTP, les données du maître d’ouvrage et l’arrêté du 23 juin 1978 modifié."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "besoins, énergie, volume du ballon, temps de chauffe et températures."], ["Le résultat :", "à l’écran Vérifier, vos résultats doivent tomber dans une fourchette de ± 3 %."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station F1, le besoin et le système."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: `Une note d’eau chaude rassemble des données de plusieurs origines. La famille, les litres par personne, l’eau froide, la consigne du ballon, son volume et la pointe du soir se lisent à la page ${EX.pages.ecs} du CCTP. La pompe à chaleur, les heures creuses et le tube le plus long sont des données du maître d’ouvrage : la commande les donne, avec leur source. La constante de l’eau est une constante physique. Les températures à respecter viennent de l’arrêté du 23 juin 1978 modifié. Sur la feuille, chaque valeur porte l’endroit où vous l’avez lue.`,
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "D’où elle vient", "Où la lire"], [
        ["Occupants, litres par personne et par jour à 40 °C", "Le CCTP", `Page ${EX.pages.ecs}, lignes « Occupants » et « Besoin journalier »`],
        ["Eau froide, consigne du ballon", "Le CCTP", `Page ${EX.pages.ecs}, lignes « Eau froide » et « Consigne du ballon »`],
        ["Volume du ballon, type de production", "Le CCTP", `Page ${EX.pages.ecs}, ligne « Production »`],
        ["Pointe du soir (niveau autonome)", "Le CCTP", `Page ${EX.pages.ecs}, ligne « Pointe »`],
        ["Puissance thermique et COP de la pompe à chaleur, heures creuses, tube le plus long", "Le maître d’ouvrage", "La commande, écran « À vous, le projet »"],
        ["Constante de l’eau", "Constante physique", "Écran « L’énergie pour chauffer l’eau » ; HydroMétro « Puissance » et « Énergie »"],
        ["Températures à respecter", "L’arrêté du 23 juin 1978 modifié, art. 36", "Écran « Les températures de l’arrêté »"]
      ], "Les données d’une note d’eau chaude")
        + BE.renvoi("Les besoins, les températures de l’eau et les données du maître d’ouvrage sont des valeurs d’exercice. Sur un vrai projet, la puissance et le COP se lisent sur la fiche du fabricant, et le tube se relève sur le plan de plomberie.")
    }),

    BE.ecran({
      id: "besoin-journalier", dossier: "methode", kicker: "La méthode, 1", title: "Le besoin journalier à 40 °C", level: "comprendre",
      text: `Le besoin en eau chaude se compte en litres par jour. Un guide de dimensionnement donne un nombre de litres par personne et par jour, à une température d’usage de 40 °C : c’est la température de l’eau que l’on reçoit à la douche ou au lavabo. Le besoin journalier V40 est le nombre d’occupants n multiplié par les litres par personne l, en litres par jour. Un nombre de litres ne dit rien sans sa température : 40 L à 40 °C et 40 L à 60 °C ne demandent pas la même énergie. Pour la maison, n et l se lisent à la page ${EX.pages.ecs} du CCTP, lignes « Occupants » et « Besoin journalier ». Ce geste sert le bloc « Besoins et énergie par jour » de la feuille.`,
      prompt: "Regardez le schéma, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-besoin-journalier.svg", `Schéma de principe, appartement d’exemple, à 40 °C. Trois silhouettes de personnes, chacune avec « ${EX.ap.lpp} L » dessous. Une accolade les réunit : « ${EX.ap.n} personnes × ${EX.ap.lpp} L par personne et par jour ». Un signe égal mène à un cadre orange : V40, ${EX.ap.V40} L par jour. Dessous : V40 = n × l = ${EX.ap.n} × ${EX.ap.lpp} = ${EX.ap.V40} L par jour, puis : ${EX.ap.lpp} L à 40 °C et ${EX.ap.lpp} L à 60 °C ne demandent pas la même énergie.`, "Chaque personne compte ses litres à 40 °C : n personnes × l litres donnent V40 par jour.")
        + tableau(["Formule", "Unités"], [["V40 = n × l", "L par jour = personnes × L par personne et par jour"]])
        + exBesoin()
    }),

    BE.ecran({
      id: "energie-pour-chauffer-l-eau", dossier: "methode", kicker: "La méthode, 2", title: "L’énergie pour chauffer l’eau", level: "comprendre",
      text: "Chauffer un litre d’eau d’un kelvin demande 1,163 Wh. C’est la constante de l’eau : 4 185 J par kilogramme et par kelvin, avec 1 kg par litre (HydroMétro, stations « Puissance » et « Énergie »). L’énergie E se calcule en wattheures par E = V × 1,163 × (θ chaude − θ froide), où V est le volume en litres, θ chaude la température de l’eau utilisée et θ froide celle de l’eau du réseau. Un écart de 1 K vaut un écart de 1 °C. On divise ensuite par 1 000 pour passer en kilowattheures. Ce calcul remplit le bloc « Besoins et énergie par jour » de la feuille.",
      prompt: "Regardez l’écart sur le schéma, lisez l’exemple résolu et le piège, puis continuez.",
      render: () => BE.schema("illustrations/schema-energie-eau.svg", `Schéma de principe, appartement d’exemple. À gauche, une échelle de température : 40 °C en haut, ${EX.ap.tf} °C en bas. Une accolade orange relie les deux : l’eau froide du réseau en bas, l’eau utilisée en haut, ΔT = ${EX.ap.dT} K, c’est-à-dire 40 − ${EX.ap.tf}. À droite, quatre cases : V40 = ${EX.ap.V40} L, × 1,163 Wh/(L.K), × ΔT = ${EX.ap.dT} K, puis, cadrée en orange, E = ${EX.ap.E} Wh, soit ${EX.ap.Ekwh} kWh. Dessous : oublier l’eau froide, c’est compter 40 K au lieu de ${EX.ap.dT} K, soit ${EX.piege.exces} % d’énergie en trop.`, "L’énergie se calcule sur l’écart entre l’eau froide du réseau et l’eau utilisée, pas sur 40 °C.")
        + tableau(["Formule", "Unités"], [["E = V × 1,163 × (θ chaude − θ froide)", "Wh = L × Wh/(L.K) × K"]])
        + exEnergie()
        + BE.alerte(`<strong>Piège.</strong> Oublier l’eau froide : écrire un écart de 40 K au lieu de ${EX.ap.dT} K donne ${EX.piege.ekwh} kWh au lieu de ${EX.ap.Ekwh} kWh, soit ${EX.piege.exces} % de trop.`)
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, énergie par jour", title: "Exercice : l’énergie d’un logement de deux personnes", level: "appliquer", requiresAction: true,
      text: {
        1: `Un logement de ${EX.ex1.n} personnes consomme ${EX.ex1.lpp} L par personne et par jour à 40 °C. L’eau froide est à ${EX.ex1.tf} °C. Calculez l’énergie utile par jour. L’exemple de l’appartement reste sous vos yeux : refaites les mêmes gestes.`,
        2: `Un logement de ${EX.ex1.n} personnes consomme ${EX.ex1.lpp} L par personne et par jour à 40 °C. L’eau froide est à ${EX.ex1.tf} °C. Calculez l’énergie utile par jour, sans l’exemple.`
      },
      prompt: { 1: "Choisissez l’énergie par jour, en vous aidant de l’exemple.", 2: "Choisissez l’énergie par jour. Cette question est à faire seul." },
      aides: {
        1: ["L’énoncé donne le nombre de personnes, les litres par personne et les deux températures. La formule est à l’écran « L’énergie pour chauffer l’eau ».", "Calculez V40 = n × l, puis l’écart entre 40 °C et l’eau froide, puis E = V × 1,163 × ΔT en Wh. Divisez par 1 000 pour passer en kWh.", `Sur l’appartement d’exemple de la station H6, V40 = ${EX.ap.n} × ${EX.ap.lpp} = ${EX.ap.V40} L et l’écart vaut 40 − ${EX.ap.tf} = ${EX.ap.dT} K. Écrivez les mêmes deux lignes pour ce logement.`],
        2: ["L’énoncé donne tout. Les formules sont aux écrans « Le besoin journalier à 40 °C » et « L’énergie pour chauffer l’eau ».", "Cherchez d’abord le volume d’eau chaude par jour, puis l’écart de température entre l’eau froide et 40 °C, puis l’énergie.", `Sur un logement de ${EX.ap.n} personnes à ${EX.ap.lpp} L chacune, V40 = ${EX.ap.n} × ${EX.ap.lpp} = ${EX.ap.V40} L. Écrivez le même produit avec les données de l’énoncé.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exEnergie(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),

    BE.ecran({
      id: "volume-equivalent", dossier: "methode", kicker: "La méthode, 3", title: "Le volume équivalent au stockage", level: "comprendre",
      image: "illustrations/2-ballon-et-mitigeur.webp", imageAlt: "Schéma de mise en situation : un ballon d’eau chaude, plus foncé en haut et plus clair en bas. Un tuyau part du haut du ballon et un autre du bas, tous deux vers un mitigeur orange. Du mitigeur, un tuyau mène à un robinet, dont l’eau mitigée coule sur une main.",
      text: "Un ballon stocke l’eau plus chaude que 40 °C. Au robinet, un mitigeur mélange cette eau chaude avec de l’eau froide pour arriver à 40 °C. Un litre stocké à 60 °C donne donc plus d’un litre à 40 °C, et le ballon peut être plus petit que le besoin. Le volume équivalent à la température de stockage est le volume qui, mitigé, donne le besoin V40. Il se calcule par V stock = V40 × (40 − θ froide) ÷ (θ stock − θ froide). Le haut de la fraction est l’écart entre l’usage et l’eau froide, le bas est l’écart entre le stockage et l’eau froide. Ce geste sert le bloc « Volume et ballon » de la feuille.",
      prompt: "Lisez l’exemple résolu et le piège, puis continuez.",
      render: () => tableau(["Formule", "Unités"], [["V stock = V40 × (40 − θ froide) ÷ (θ stock − θ froide)", "L = L × K ÷ K"]])
        + exVolume()
        + BE.alerte(`<strong>Piège.</strong> Une fraction à l’envers donne ${EX.piege.inv} L au lieu de ${EX.ap.Vs} L : le volume équivalent est toujours plus petit que V40 quand le stockage est plus chaud que l’usage.`)
    }),

    BE.ecran({
      id: "choisir-le-ballon", dossier: "methode", kicker: "La méthode, 4", title: "Choisir le ballon", level: "comprendre",
      text: "Le ballon doit contenir au moins le volume équivalent de la journée. C’est la règle de cette station ; sur un vrai projet, le fabricant donne un profil de soutirage, c’est-à-dire la série de puisages d’une journée type (heures et volumes) que son appareil sait fournir, et c’est ce profil qui décide. On peut aussi demander ce que donne un ballon plein : la même formule, à l’envers, donne son volume à 40 °C, V40 du ballon = V ballon × (θ stock − θ froide) ÷ (40 − θ froide). Ce volume se compare au besoin de la journée. Ce geste sert le bloc « Volume et ballon » de la feuille.",
      prompt: "Lisez l’exemple résolu, puis continuez.",
      render: () => tableau(["Formule", "Unités"], [["V40 du ballon = V ballon × (θ stock − θ froide) ÷ (40 − θ froide)", "L = L × K ÷ K"]])
        + exBallon()
        + BE.alerte("<strong>Limite.</strong> Ce calcul suppose le ballon plein et chaud au début de la journée. Il ne dit rien de la pointe du soir, traitée à l’écran « La pointe du soir ».")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, volume équivalent", title: "Exercice : le volume équivalent d’un besoin de 160 L", level: "appliquer", requiresAction: true,
      text: {
        1: `Un logement a besoin de ${EX.ex2.V40} L par jour à 40 °C. L’eau froide est à ${EX.ex2.tf} °C, le ballon stocke à ${EX.ex2.ts} °C et fait ${EX.ex2.Vb} L. Cherchez le volume équivalent à ${EX.ex2.ts} °C et dites si le ballon suffit. L’exemple de l’appartement reste sous vos yeux.`,
        2: `Un logement a besoin de ${EX.ex2.V40} L par jour à 40 °C. L’eau froide est à ${EX.ex2.tf} °C, le ballon stocke à ${EX.ex2.ts} °C et fait ${EX.ex2.Vb} L. Cherchez le volume équivalent à ${EX.ex2.ts} °C et dites si le ballon suffit, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le volume équivalent et le verdict, en vous aidant de l’exemple.", 2: "Choisissez le volume équivalent et le verdict. Cette question est à faire seul." },
      aides: {
        1: ["L’énoncé donne le besoin, les trois températures et le volume du ballon. La formule est à l’écran « Le volume équivalent au stockage ».", "V stock = V40 × (40 − θ froide) ÷ (θ stock − θ froide). Comparez ensuite le résultat au volume du ballon.", `Sur l’appartement d’exemple de la station H6, les deux écarts valent 40 − ${EX.ap.tf} = ${EX.ap.dT} K et ${EX.ap.ts} − ${EX.ap.tf} = ${EX.ap.dTs} K, donc ${EX.ap.V40} × ${EX.ap.dT} ÷ ${EX.ap.dTs}. Écrivez les deux écarts de ce logement.`],
        2: ["L’énoncé donne le besoin, les températures et le ballon. Les formules sont aux écrans « Le volume équivalent au stockage » et « Choisir le ballon ».", "Deux écarts de température interviennent : l’un du côté de l’usage, l’autre du côté du stockage. Cherchez lequel est au haut de la fraction.", `Sur l’appartement d’exemple de la station H6, on écrit d’abord 40 − ${EX.ap.tf}, puis ${EX.ap.ts} − ${EX.ap.tf}. Écrivez les deux écarts de ce logement.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exVolume(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "chauffe-eau-thermodynamique", dossier: "methode", kicker: "La méthode, 5", title: "Le chauffe-eau thermodynamique", level: "comprendre",
      image: "illustrations/3-chauffe-eau-garage.webp", imageAlt: "Coupe d’un garage avec une voiture, une porte sectionnelle, une étagère et un établi. À droite, un chauffe-eau thermodynamique : un ballon blanc surmonté d’un bloc orange, la pompe à chaleur, avec des flèches bleues d’air qui entrent de chaque côté. Deux tuyaux montent vers l’étage, où l’on voit une chambre.",
      text: "Un chauffe-eau thermodynamique est un ballon chauffé par une pompe à chaleur. Elle prend de la chaleur à l’air du garage et la donne à l’eau (CartoClim, « Le chauffe-eau thermodynamique »). La puissance thermique P est la puissance que la pompe à chaleur donne à l’eau, en watts. Le COP est le rapport entre cette puissance et la puissance électrique absorbée : P électrique = P thermique ÷ COP. Pour chauffer le ballon plein de l’eau froide à la température de stockage, l’énergie est E = V ballon × 1,163 × (θ stock − θ froide), et le temps de chauffe t = E ÷ P, en heures. Les heures creuses sont les heures de nuit où le contrat d’électricité coûte moins cher : réchauffer tout le ballon pendant leur durée demande la puissance E ÷ durée, et la pompe à chaleur suffit si elle donne au moins cette puissance. Ce geste sert les blocs « Chauffe du ballon » et « Heures creuses » de la feuille.",
      prompt: "Regardez le schéma, lisez les trois exemples résolus et le piège, puis continuez.",
      render: () => BE.schema("illustrations/schema-cop-pompe.svg", `Schéma de principe, pompe à chaleur de l’exemple, COP ${EX.ap.cop}. Au centre, une case : pompe à chaleur. À gauche, deux flèches entrent : une flèche en pointillé, la chaleur de l’air, et une flèche pleine et fine, l’électricité, ${EX.ap.Pel} W. À droite, une flèche orange épaisse sort : la chaleur donnée à l’eau, P thermique ${EX.ap.P} W. Dessous : P électrique = P thermique ÷ COP, soit ${EX.ap.P} ÷ ${EX.ap.cop} = ${EX.ap.Pel} W. Puis, pour un ballon de ${EX.ap.Vb} L : E = ${EX.ap.Ech} Wh et t = ${EX.ap.Ech} ÷ ${EX.ap.P} = ${EX.ap.th} h, soit ${EX.ap.thm}.`, "La pompe à chaleur prend la chaleur de l’air et un peu d’électricité, et donne à l’eau la puissance thermique.")
        + tableau(["Grandeur", "Formule"], [
        ["Énergie de la chauffe complète (Wh)", "E = V ballon × 1,163 × (θ stock − θ froide)"],
        ["Temps de chauffe (h)", "t = E ÷ P thermique, puis la partie décimale × 60 pour les minutes"],
        ["Puissance électrique absorbée (W)", "P électrique = P thermique ÷ COP"],
        ["Puissance nécessaire en heures creuses (W)", "P = E ÷ durée des heures creuses (h)"]
      ], "Les formules du chauffe-eau thermodynamique")
        + exChauffe()
        + BE.exemple({ text: `Même appartement, COP de ${EX.ap.cop}`, answer: `P électrique = ${EX.ap.P} ÷ ${EX.ap.cop} = ${EX.ap.Pel} W`, why: "La puissance électrique est plus petite que la puissance thermique : la pompe à chaleur prend le reste de la chaleur à l’air." })
        + BE.exemple({ text: `Même appartement, heures creuses de ${EX.ap.hc} h par nuit (valeur d’exercice)`, answer: `P nécessaire = ${EX.ap.Ech} ÷ ${EX.ap.hc} = ${EX.ap.Phc} W, inférieure à ${EX.ap.P} W : la pompe à chaleur suffit`, why: "Si la puissance nécessaire dépassait celle de la pompe à chaleur, les heures creuses ne suffiraient pas à chauffer tout le ballon." })
        + BE.alerte(`<strong>Piège.</strong> Le temps de chauffe se calcule avec la puissance thermique. Avec la puissance électrique, on trouve ${EX.piege.thelec} au lieu de ${EX.ap.thm}.`)
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, temps de chauffe", title: "Exercice : le temps de chauffe d’un ballon de 150 L", level: "appliquer", requiresAction: true,
      text: {
        1: `Un ballon de ${EX.ex3.Vb} L se chauffe de ${EX.ex3.tf} °C à ${EX.ex3.ts} °C avec une pompe à chaleur de ${EX.ex3.P} W thermiques, de COP ${EX.ex3.cop}. Calculez le temps de chauffe complet. L’exemple de l’appartement reste sous vos yeux.`,
        2: `Un ballon de ${EX.ex3.Vb} L se chauffe de ${EX.ex3.tf} °C à ${EX.ex3.ts} °C avec une pompe à chaleur de ${EX.ex3.P} W thermiques, de COP ${EX.ex3.cop}. Calculez le temps de chauffe complet, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le temps de chauffe, en vous aidant de l’exemple.", 2: "Choisissez le temps de chauffe. Cette question est à faire seul." },
      aides: {
        1: ["L’énoncé donne le volume du ballon, les températures, la puissance thermique et le COP. Les formules sont à l’écran « Le chauffe-eau thermodynamique ».", "Calculez l’énergie du ballon plein, puis divisez par la puissance thermique pour avoir des heures. Convertissez la partie décimale en minutes.", `Sur l’appartement d’exemple de la station H6, E = ${EX.ap.Vb} × 1,163 × (${EX.ap.ts} − ${EX.ap.tf}). Écrivez le même produit avec le volume du ballon de l’énoncé.`],
        2: ["L’énoncé donne tout. Les formules sont à l’écran « Le chauffe-eau thermodynamique ».", "L’eau passe de θ froide à θ stock. La pompe à chaleur donne sa puissance thermique à l’eau : le COP ne sert qu’au calcul de la puissance électrique.", `Sur l’appartement d’exemple de la station H6, ${EX.ap.thfrac} h vaut ${EX.ap.thfrac} × 60 = ${EX.ap.thmin} min. Faites la même conversion sur votre durée.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exChauffe(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "la-pointe", dossier: "methode", kicker: "La méthode, 6", title: "La pointe du soir", level: "comprendre",
      text: "Le soir, plusieurs douches se suivent : c’est la pointe. Un chauffe-eau instantané devrait chauffer l’eau au moment où elle coule. La puissance qu’il faudrait est P = E ÷ t, où E est l’énergie de la pointe et t sa durée en heures. Le ballon évite cette puissance : il a stocké la chaleur avant. L’énergie de la pointe se calcule comme celle du besoin journalier, avec le volume à 40 °C de la pointe. On arrondit cette énergie au wattheure avant de la diviser par la durée. Pour savoir ce que le ballon doit fournir, on traduit ce volume en volume à la température de stockage, par la formule du volume équivalent. Le temps de remontée est le temps que met la pompe à chaleur à remettre dans le ballon l’énergie puisée. Si plusieurs douches se suivent, le volume de la pointe est la somme de leurs volumes et la durée est celle de l’ensemble. Ce geste sert le bloc « La pointe du soir » de la feuille du niveau autonome.",
      prompt: "Regardez le schéma, lisez les formules, puis l’exemple résolu et le piège.",
      render: () => BE.schema("illustrations/schema-pointe-du-soir.svg", `Schéma de principe : une douche de ${EX.ap.pV} L à 40 °C en ${EX.ap.pMin} minutes. En haut, deux barres de puissance à la même échelle : un chauffe-eau instantané demanderait ${EX.ap.Pinst} W, barre longue ; la pompe à chaleur du ballon donne ${EX.ap.P} W, barre courte. Dessous : E = ${EX.ap.Ep} Wh ; ${EX.ap.Ep} ÷ (${EX.ap.pMin} ÷ 60) = ${EX.ap.Pinst} W. Plus bas, une barre de temps : la douche, ${EX.ap.pMin} min, puis la remontée du ballon, ${EX.ap.trMin} min. Remontée : ${EX.ap.Ep} ÷ ${EX.ap.P} = ${EX.ap.trH} h, soit ${EX.ap.trMin} min. Le ballon a stocké la chaleur avant la pointe.`, "Le ballon évite la grosse puissance de l’instantané : il a stocké la chaleur avant, et la remonte ensuite.")
        + tableau(["Grandeur", "Formule"], [
        ["Énergie de la pointe (Wh)", "E = V40 de la pointe × 1,163 × (40 − θ froide)"],
        ["Puissance qu’il faudrait en instantané (W)", "P = E ÷ t, avec t en heures (minutes ÷ 60)"],
        ["Temps de remontée (h)", "t = E ÷ P thermique de la pompe à chaleur, puis × 60 pour les minutes"]
      ], "Les formules de la pointe")
        + tableau(["Étape", "Calcul de l’appartement", "Résultat"], [
          ["Volume de la pointe à 40 °C", `une douche de ${EX.ap.pV} L`, `${EX.ap.pV} L`],
          ["Volume à la température de stockage", `${EX.ap.pV} × (40 − ${EX.ap.tf}) ÷ (${EX.ap.ts} − ${EX.ap.tf})`, `${EX.ap.Vps} L`],
          ["Énergie de la pointe", `${EX.ap.pV} × 1,163 × (40 − ${EX.ap.tf})`, `${EX.ap.Ep} Wh`],
          [`Puissance qu’il faudrait en instantané, en ${EX.ap.pMin} minutes`, `${EX.ap.Ep} ÷ (${EX.ap.pMin} ÷ 60)`, `${EX.ap.Pinst} W`],
          ["Temps de remontée du ballon", `${EX.ap.Ep} ÷ ${EX.ap.P} = ${EX.ap.trH} h, soit ${EX.ap.trH} × 60`, `${EX.ap.trMin} min`]
        ], `Exemple résolu : la pointe de l’appartement, une douche de ${EX.ap.pV} L à 40 °C en ${EX.ap.pMin} minutes`)
        + BE.alerte(`<strong>Piège.</strong> Une durée en minutes se convertit en heures : ${EX.ap.pMin} minutes valent ${EX.ap.pMin} ÷ 60 h. Avec ${EX.ap.pMin} comme si c’étaient ${EX.ap.pMin} heures, on trouve ${EX.piege.pointeMinutes} W au lieu de ${EX.ap.Pinst} W.`)
        + BE.alerte("<strong>Limite.</strong> Ce calcul suppose le ballon plein et chaud au début de la pointe.")
    }),

    BE.ecran({
      id: "temperatures-arrete", dossier: "methode", kicker: "La méthode, 7", title: "Les températures de l’arrêté", level: "comprendre",
      text: "L’arrêté du 23 juin 1978 modifié, art. 36, fixe les températures de l’eau chaude sanitaire d’un logement. Aux points de puisage des pièces destinées à la toilette, l’eau ne dépasse pas 50 °C. Aux autres points, elle ne dépasse pas 60 °C. Quand le volume d’eau entre la production et le point de puisage le plus éloigné dépasse 3 L, l’eau reste à 50 °C au moins en tout point du réseau, hors les tubes finaux de 3 L au plus. Un tube final est le dernier tube, celui qui part du réseau pour alimenter un seul point de puisage. À la sortie du stockage, l’arrêté demande 55 °C au moins dès 400 L de volume stocké, ou une montée quotidienne en température. Sous 400 L, la température de stockage est un choix du CCTP. Un mitigeur thermostatique, placé en sortie du ballon ou au point de puisage, mélange eau chaude et eau froide pour tenir la température d’usage. Les maxima limitent le risque de brûlure, les minima limitent celui des légionelles. Cet écran sert le bloc « Températures de l’arrêté » de la feuille.",
      prompt: "Repérez chaque température sur le schéma, lisez le tableau des quatre températures, puis continuez.",
      render: () => BE.schema("illustrations/schema-temperatures-arrete.svg", "Schéma de principe : une échelle de température verticale de 40 à 70 °C. À 70 °C, une montée du jour : 70 °C pendant 2 min. À 65 °C : 65 °C pendant 30 min. À 60 °C : 60 °C au plus aux autres points, et montée du jour de 60 °C pendant 1 h. À 55 °C : à la sortie du stockage dès 400 L, 55 °C au moins. À 50 °C : aux points de toilette, 50 °C au plus ; dans un réseau de plus de 3 L, 50 °C au moins. À 40 °C : douche et lavabo, l’eau d’usage. Les points orange marquent la montée quotidienne en température. Les maxima protègent contre les brûlures, les minima contre les légionelles.", "Les maxima évitent les brûlures, les minima freinent les légionelles : tout se lit sur la même échelle.")
        + tableau(["Où", "Température", "Contre quel risque", "Source"], [
        ["Points de puisage des pièces destinées à la toilette", "50 °C au plus", "Brûlure", "arrêté du 23 juin 1978 modifié, art. 36"],
        ["Autres points de puisage", "60 °C au plus", "Brûlure", "arrêté du 23 juin 1978 modifié, art. 36"],
        ["Réseau dont le volume dépasse 3 L entre la production et le point le plus éloigné", "50 °C au moins en tout point, hors tubes finaux de 3 L au plus", "Légionelles", "arrêté du 23 juin 1978 modifié, art. 36"],
        ["Sortie du stockage dès 400 L", "55 °C au moins, ou montée quotidienne : 60 °C une heure, 65 °C une demi-heure ou 70 °C deux minutes", "Légionelles", "arrêté du 23 juin 1978 modifié, art. 36"]
      ], "Les températures de l’eau chaude sanitaire d’un logement")
        + BE.renvoi("La règle du métier : de l’eau chaude au stockage, de l’eau mitigée au robinet, et pas d’eau tiède qui dort dans le réseau. Le texte complet de l’arrêté est sur Légifrance, texte consolidé lu le 31/10/2026.")
    }),

    BE.ecran({
      id: "legionelles-bouclage", dossier: "methode", kicker: "La méthode, 8", title: "Les légionelles et le bouclage", level: "comprendre",
      text: "Les légionelles sont des bactéries qui se développent dans une eau tiède qui ne bouge pas. L’arrêté agit de deux façons : il garde l’eau chaude partout où elle circule et il limite l’eau tiède qui stagne. Un réseau dont le volume dépasse 3 L entre la production et le point de puisage le plus éloigné doit donc garder 50 °C au moins en tout point, hors les tubes finaux (écran « Les températures de l’arrêté »). On y arrive par un bouclage : un tube de retour ramène l’eau du bout du réseau vers le ballon, une pompe la fait circuler et un calorifuge, l’isolant posé autour des tubes, limite les pertes. Dans un réseau court, l’eau du tube est renouvelée à chaque puisage et le CCTP n’y prévoit pas de bouclage. Le volume du tube le plus long se calcule par V = π ÷ 4 × d² × L × 1 000, avec le diamètre intérieur d en mètres, la longueur L en mètres et V en litres. π (pi) vaut environ 3,14 ; la touche π de la calculatrice donne sa valeur complète. Dans cette station, le trajet se compte depuis la sortie du mitigeur, placé en sortie du ballon. Le diamètre à prendre est le diamètre intérieur, celui par où l’eau passe. Ce geste sert le bloc « Le tube le plus long » de la feuille du niveau autonome.",
      prompt: "Regardez le schéma, lisez l’exemple résolu et le piège, puis continuez.",
      render: () => BE.schema("illustrations/schema-bouclage.svg", `Schéma de principe. En haut, un ballon à gauche. Un mitigeur sort du ballon et un tube orange, l’aller, part vers la droite, à 50 °C au moins. Trois petits tubes finaux, de 3 L au plus, montent de l’aller vers trois robinets. Au bout, le tube redescend et revient vers le ballon : c’est le retour, en pointillés, avec une pompe près du ballon. Un calorifuge, isolant, entoure les tubes. En bas, le tube le plus long de l’exemple : diamètre intérieur ${EX.ap.tubeD} mm et longueur ${EX.ap.tubeL} m donnent V = ${EX.ap.Vtube} L, sous 3 L : pas de bouclage. Formule : V = π ÷ 4 × d² × L × 1 000, d et L en m.`, "Le bouclage ramène l’eau du bout du réseau vers le ballon ; un réseau court, sous 3 L, n’en a pas besoin.")
        + tableau(["Formule", "Unités"], [["V = π ÷ 4 × d² × L × 1 000", "L = m² × m × 1 000"]])
        + BE.exemple({ text: `Appartement d’exemple de la station H6 : tube le plus long de ${EX.ap.tubeL} m, diamètre intérieur ${EX.ap.tubeD} mm (valeurs d’exercice)`, answer: `d = ${EX.ap.tubeD} mm = ${EX.ap.tubeDm} m ; V = π ÷ 4 × ${EX.ap.tubeDm}² × ${EX.ap.tubeL} × 1 000 = ${EX.ap.Vtube} L`, why: `${EX.ap.Vtube} L est sous 3 L : pas de bouclage.` })
        + BE.alerte(`<strong>Piège.</strong> Le diamètre extérieur d’un tube est plus grand que son diamètre intérieur : pour une paroi de 1 mm, un tube de ${EX.ap.tubeD} mm intérieur mesure ${EX.ap.dExt} mm à l’extérieur. Avec ${EX.ap.dExt} mm, on trouve ${EX.ap.VtubeExt} L et on conclut à tort que le tube dépasse 3 L.`)
        + BE.renvoi("HydroMétro détaille le bouclage et le dimensionnement d’un réseau : stations « Boucle » et « Dimensionner une distribution d’eau sanitaire ».")
    }),

    BE.ecran({
      id: "et-en-tertiaire", dossier: "methode", kicker: "La méthode, 9", title: "Et en tertiaire", level: "comprendre",
      text: "Dans un bâtiment tertiaire, les besoins sont plus grands et plus concentrés. La production est souvent semi-instantanée : un échangeur puissant chauffe l’eau au moment du puisage, avec un petit ballon tampon qui absorbe la pointe. Le réseau est long : dès qu’il dépasse 3 L, il doit garder 50 °C au moins en tout point hors les tubes finaux, ce qui demande un bouclage. Dès 400 L stockés, la sortie du stockage tient 55 °C au moins, ou l’eau monte chaque jour en température (écran « Les températures de l’arrêté »). Le niveau 3 de cette station dimensionne ce cas, sur un bâtiment tertiaire, dans la partie réservée aux classes. Le CCTP de la maison fait les choix d’un logement : un chauffe-eau thermodynamique sur l’air du garage, un mitigeur thermostatique en sortie, et pas de bouclage parce que le tube est court.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Le logement, dans la maison", rows: [["La production :", "un chauffe-eau thermodynamique et son ballon."], ["Le réseau :", "court, sans bouclage."]] },
        { title: "Le tertiaire, la production", rows: [["La production :", "semi-instantanée, avec un échangeur puissant."], ["Le stockage :", "un petit ballon tampon pour la pointe."]] },
        { title: "Le tertiaire, le réseau", rows: [["Le bouclage :", "dès que le réseau dépasse 3 L."], ["Les 55 °C :", "à la sortie du stockage dès 400 L, ou une montée quotidienne en température."]] }
      ])
        + BE.renvoi("Le niveau 3 se travaille dans la partie réservée aux classes : votre enseignant donne le code de séance.")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

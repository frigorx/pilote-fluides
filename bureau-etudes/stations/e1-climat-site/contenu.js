/* Station BE-E1 : Le climat du site.
   Méthode sur un site d'exemple (Pau) et un site de montagne d'exemple, puis commande sur la maison (niveau 1) et sur un second site (niveau 2).
   Les valeurs d'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/e1-climat-site/construire.mjs : le premier vient de exemple-data.mjs (donnees-e1.json), les secondes de corrige-climat.json
   (θe exacte, DJU à ± 3 %). Aucune valeur du projet n'est écrite dans cette station : seules les bornes des fourchettes le sont,
   et le relevé dossier/releve-climat.html, qui est le document du stagiaire. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";
const RELEVE = "dossier/releve-climat.html";

/*EXEMPLE-DEBUT*/
const EX = {
 "seuil": "200",
 "tranche": "200",
 "parTranche": "−2",
 "parTrancheAbs": "2",
 "src": {
  "zones": "arrêté du 26 octobre 2010 (RT 2012), article 2 et annexe I",
  "en12831": "NF EN 12831-1 et son annexe nationale"
 },
 "lien": "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000022959397",
 "lignes": [
  {
   "dep": "75",
   "nom": "Paris",
   "zone": "H1a"
  },
  {
   "dep": "69",
   "nom": "Rhône",
   "zone": "H1c"
  },
  {
   "dep": "33",
   "nom": "Gironde",
   "zone": "H2c"
  },
  {
   "dep": "64",
   "nom": "Pyrénées-Atlantiques",
   "zone": "H2c"
  }
 ],
 "pau": {
  "dep": "64",
  "depNom": "Pyrénées-Atlantiques",
  "zone": "H2c",
  "alt": "200",
  "ref": "−5",
  "corr": "0",
  "theta": "−5",
  "ete": "35",
  "hr": "40",
  "dju": "2100"
 },
 "mont": {
  "alt": "850",
  "ref": "−5",
  "reste": "650",
  "ratio": "3,25",
  "entieres": "3",
  "tranches": "4",
  "corr": "−8",
  "theta": "−13"
 },
 "ex1": {
  "choices": [
   "H1a",
   "H1b",
   "H1c",
   "H2c"
  ],
  "good": 2,
  "explain": "La ligne 69 Rhône donne H1c. H1a est la zone de Paris (75), la ligne du dessus. H1b est une zone qui existe, mais aucune des quatre lignes ne la porte. H2c est celle de la Gironde (33) et des Pyrénées-Atlantiques (64), les deux lignes du dessous."
 },
 "ex2": {
  "alt": "450",
  "ref": "−4"
 },
 "ex2q": {
  "choices": [
   "−4 °C",
   "−6 °C",
   "−8 °C",
   "−12 °C"
  ],
  "good": 2,
  "explain": "(450 − 200) ÷ 200 = 1,25, soit 2 tranches entamées ; correction 2 × (−2) = −4 K ; θe retenue = −4 + (−4) = −8 °C. −4 °C oublie la correction. −6 °C ne compte que les tranches entières (1) : la seconde est entamée, elle compte aussi. −12 °C compte une tranche tous les 100 m depuis 0 m, soit 4 tranches, au lieu de partir de 200 m par tranches de 200 m."
 },
 "ex3q": {
  "choices": [
   "10 DJU",
   "11 DJU",
   "19 DJU",
   "5,5 DJU"
  ],
  "good": 1,
  "explain": "jour A : moyenne 7 °C, DJU 11. jour B : moyenne 19 °C, au-dessus de 18 °C, DJU 0. Somme : 11. 10 DJU compte le jour B en négatif (18 − 19 = −1). 19 DJU prend Tmin pour la moyenne de chaque jour. 5,5 DJU divise la somme par deux jours au lieu de la garder."
 },
 "trois": {
  "lignes": [
   {
    "jour": "jour 1",
    "tmin": "2",
    "tmax": "10",
    "moy": "6",
    "dju": "12"
   },
   {
    "jour": "jour 2",
    "tmin": "−1",
    "tmax": "7",
    "moy": "3",
    "dju": "15"
   },
   {
    "jour": "jour 3",
    "tmin": "11",
    "tmax": "26",
    "moy": "18,5",
    "dju": "0"
   }
  ],
  "total": "27",
  "tempere": {
   "jour": "jour 3",
   "moy": "18,5",
   "negatif": "−0,5"
  }
 },
 "deux": {
  "A": {
   "jour": "jour A",
   "tmin": "4",
   "tmax": "10",
   "moy": "7",
   "dju": "11"
  },
  "B": {
   "jour": "jour B",
   "tmin": "13",
   "tmax": "25",
   "moy": "19",
   "dju": "0"
  }
 },
 "cout": {
  "ti": "19",
  "te": "−5",
  "teFausse": "−8",
  "dT": "24",
  "dTFaux": "27",
  "pour100": "12,5"
 },
 "tableauPau": [
  [
   "Département",
   "64 Pyrénées-Atlantiques",
   "Dossier d’exemple de la station D0 (atelier à Pau)"
  ],
  [
   "Zone climatique",
   "H2c",
   "Annexe I de l’arrêté du 26 octobre 2010, ligne 64"
  ],
  [
   "Altitude",
   "200 m",
   "Dossier d’exemple de la station D0"
  ],
  [
   "θe de référence",
   "−5 °C",
   "CCTP d’une affaire réelle de Jurançon, valeur d’exercice"
  ],
  [
   "Correction d’altitude",
   "0 K",
   "Règle d’exercice : 200 m n’est pas au-dessus de 200 m"
  ],
  [
   "θe retenue",
   "−5 °C",
   "θe de référence + correction"
  ],
  [
   "Été : température et HR",
   "35 °C ; 40 %",
   "Même CCTP, valeurs d’exercice"
  ],
  [
   "DJU annuel, base 18 °C",
   "2100",
   "Relevé d’exercice, valeur d’exercice"
  ],
  [
   "DJU des trois jours",
   "27",
   "Méthode simplifiée de la moyenne, relevé d’exercice (écran « Les degrés-jours unifiés »)"
  ]
 ]
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exempleZone = () => BE.exemple({ text: `Site d’exemple : Pau, département ${EX.pau.dep} ${EX.pau.depNom}`, answer: `Ligne ${EX.pau.dep} de l’annexe I : zone ${EX.pau.zone}`, why: "On cherche le numéro du département, on lit la zone à droite, puis on écrit la zone avec la ligne lue." });
const exempleAltitude = () => BE.exemple({ text: `Site de montagne d’exemple : ${EX.mont.alt} m, θe de référence ${EX.mont.ref} °C`, answer: `θe retenue = ${EX.mont.theta} °C`, why: `${EX.mont.alt} − ${EX.seuil} = ${EX.mont.reste} m ; ${EX.mont.reste} ÷ ${EX.tranche} = ${EX.mont.ratio}, soit ${EX.mont.tranches} tranches entamées ; correction ${EX.mont.tranches} × (${EX.parTranche}) = ${EX.mont.corr} K ; θe retenue = ${EX.mont.ref} + (${EX.mont.corr}) = ${EX.mont.theta} °C.` });
const exempleJour = () => BE.exemple({ text: `Site d’exemple, ${EX.trois.lignes[0].jour} : Tmin = ${EX.trois.lignes[0].tmin} °C, Tmax = ${EX.trois.lignes[0].tmax} °C`, answer: `Moyenne (${EX.trois.lignes[0].tmin} + ${EX.trois.lignes[0].tmax}) ÷ 2 = ${EX.trois.lignes[0].moy} °C ; DJU = 18 − ${EX.trois.lignes[0].moy} = ${EX.trois.lignes[0].dju}`, why: "La moyenne est sous 18 °C : le DJU du jour est l’écart à 18 °C." });

/* Écran « À vous, le projet » : la commande du moteur, suivie des liens vers les documents du dossier. */
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Plan de masse : page 4 des plans, ville, altitude et zone. θe : page 3 du CCTP, tableau « Conditions de calcul ». Département, conditions d’été, DJU annuel et semaine de janvier : relevé climatique, bloc de la maison. Zone : extrait de l’annexe I joint au relevé, ou Légifrance.",
      "Zone : lisez-la sur le plan, puis cherchez le département à l’annexe I et comparez. θe retenue = θe de référence + correction, et la correction est nulle quand l’altitude ne dépasse pas 200 m. DJU d’un jour : 18 moins la moyenne de Tmin et de Tmax, si le résultat est positif, sinon 0. Total : somme des sept jours.",
      `Sur le site d’exemple, ${EX.trois.lignes[0].jour} donne (${EX.trois.lignes[0].tmin} + ${EX.trois.lignes[0].tmax}) ÷ 2 = ${EX.trois.lignes[0].moy}, puis 18 − ${EX.trois.lignes[0].moy} = ${EX.trois.lignes[0].dju}. Écrivez le même calcul pour la première ligne de votre tableau des sept jours.`
    ],
    2: [
      "Département, altitude, θe de référence, conditions d’été, DJU annuel et semaine d’octobre : relevé climatique, deuxième bloc. Zone : extrait de l’annexe I joint au relevé, ou annexe I sur Légifrance. Correction : règle d’exercice de l’écran « La correction d’altitude ».",
      "Zone : numéro du département, puis ligne de l’annexe I. Tranches : altitude moins 200 m, divisé par 200, arrondi au nombre entier supérieur. Correction : tranches × (−2 K). θe retenue = référence + correction. DJU : une moyenne au-dessus de 18 °C donne 0 ; total = somme des sept jours.",
      `Sur le site de montagne d’exemple : ${EX.mont.alt} − ${EX.seuil} = ${EX.mont.reste} ; ${EX.mont.reste} ÷ ${EX.tranche} = ${EX.mont.ratio} ; ${EX.mont.tranches} tranches ; ${EX.mont.corr} K. Écrivez les mêmes lignes avec l’altitude de votre site, puis ajoutez la correction à la référence.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensDossier = () => BE.liens([
  { href: RELEVE, title: "Le relevé climatique du bureau d’études", note: "Une page : département, altitude, θe de référence du second site, conditions d’été, DJU annuel et deux semaines de températures" },
  { href: DOSSIER + "plans-maison.pdf", title: "Les plans de la maison", note: "Page 4 : plan de masse. Page 3 : cartouche de la coupe" },
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Page 3 : conditions de calcul, avec θe" }
]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensDossier(); };

BE.station({
  code: "BE-E1",
  titre: "Le climat du site",
  ligne: "Données d’entrée",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Climat de la maison, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Climat d’un second site, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Avant de calculer une déperdition, un bureau d’études établit le climat du site : la zone, la température extérieure de base, les conditions d’été et les degrés-jours unifiés. Vous apprenez à lire chaque donnée avec sa source sur un site d’exemple, puis vous établissez le climat de la maison et d’un second site.",
  note: "Les valeurs de cette station sont des valeurs d’exercice, sauf la zone climatique, lue à l’annexe I de l’arrêté du 26 octobre 2010. La norme NF EN 12831-1 et son annexe nationale sont citées, jamais reproduites.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et sources" },
    { id: "methode", label: "La méthode", note: "sur un site d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, relevé et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Climat du site de la maison de deux niveaux : zone, θe, conditions d’été, DJU annuel et DJU d’une semaine de janvier",
      delai: "Rendu en fin de séance",
      commande: [
        "Le maître d’ouvrage fait étudier la maison de deux niveaux des stations D0 à T3. Avant de calculer la puissance du chauffage, vous établissez le climat de son site. Suivez les étapes dans l’ordre. Les étapes 1 à 4 remplissent le tableau du site, au recto de la feuille. L’étape 5 remplit le tableau des sept jours, au verso.",
        "Étape 1. Ouvrez la page 4 des plans, le plan de masse : relevez la zone climatique et l’altitude écrites sur le plan. Dans la colonne « Où je l’ai lue », écrivez « plans, page 4 ».",
        "Étape 2. Ouvrez le relevé climatique, bloc de la maison : relevez le département, avec son numéro. Vérifiez la zone à l’extrait de l’annexe I joint au relevé, ou sur Légifrance (lien à l’écran « La zone climatique ») : cherchez ce numéro et comparez la zone de la ligne avec celle du plan.",
        "Étape 3. Ouvrez la page 3 du CCTP, tableau « Conditions de calcul » : relevez θe. Calculez la correction d’altitude avec la règle de l’écran « La correction d’altitude », puis θe retenue.",
        "Étape 4. Dans le relevé climatique, relevez la température et l’humidité relative d’été, puis le DJU annuel.",
        "Étape 5. Dans le relevé climatique, recopiez Tmin et Tmax des sept jours de la semaine de janvier au verso de la feuille. Calculez la moyenne et le DJU de chaque jour, puis leur somme. Vérifiez θe retenue et la somme à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Page 4 : plan de masse, zone et altitude. Page 3 : cartouche de la coupe." },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 3 : conditions de calcul, θe." },
        { piece: "Relevé climatique du bureau d’études", ou: "Bloc de la maison : département, conditions d’été, DJU annuel, semaine de janvier." },
        { piece: "Annexe I de l’arrêté du 26 octobre 2010", ou: "Extrait de deux lignes joint au relevé climatique, ou Légifrance (lien à l’écran « La zone climatique »)." },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Climat d’un second site : zone, θe avec correction d’altitude, conditions d’été, DJU annuel et DJU d’une semaine d’octobre",
      delai: "Rendu en fin de séance",
      commande: "Le maître d’ouvrage étudie un second bâtiment, sur un autre site que la maison. À partir du relevé climatique et de l’annexe I de l’arrêté du 26 octobre 2010 (extrait joint au relevé, ou Légifrance), établissez le climat de ce site. Rendez le tableau du site avec la source de chaque valeur, le calcul de la correction d’altitude avec la règle d’exercice de l’écran « La correction d’altitude », le tableau des sept jours de la semaine d’octobre avec leur somme, et une ligne qui dit ce que vous feriez sur un vrai projet pour θe. Le deuxième bloc du relevé climatique donne le département, l’altitude, la θe de référence, les conditions d’été, le DJU annuel et la semaine.",
      pieces: [
        { piece: "Relevé climatique du bureau d’études", ou: "Deuxième bloc : département, altitude, θe de référence, conditions d’été, DJU annuel, semaine d’octobre." },
        { piece: "Annexe I de l’arrêté du 26 octobre 2010", ou: "Extrait de deux lignes joint au relevé climatique, ou Légifrance (lien à l’écran « La zone climatique »)." },
        { piece: "Règle d’exercice de correction d’altitude", ou: "Écran « La correction d’altitude » de cette station" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-theta", libelle: "θe retenue de la maison", unite: "°C", min: -5, max: -5, indice: "Lisez θe à la page 3 du CCTP, tableau « Conditions de calcul », puis appliquez la règle de l’écran « La correction d’altitude » à l’altitude du plan de masse. Écrivez le signe moins avec la touche tiret du clavier, par exemple -3,5." },
      { id: "n1-dju", libelle: "DJU de la semaine de janvier de la maison", unite: "DJU", min: 67.9, max: 72.1, indice: "Relisez l’écran « Les degrés-jours unifiés (DJU) » : pour chaque jour 18 − (Tmin + Tmax) ÷ 2, et 0 quand la moyenne dépasse 18 °C. Contrôlez que les sept jours sont comptés, puis additionnez." }
    ],
    2: [
      { id: "n2-theta", libelle: "θe retenue du second site", unite: "°C", min: -11, max: -11, indice: "Relisez l’écran « La correction d’altitude » : θe retenue = θe de référence + correction. Écrivez le signe moins avec la touche tiret du clavier, par exemple -3,5 : le tiret typographique « − » n’est pas lu. Lisez θe de référence à la bonne page (écran « Lire le relevé climatique »)." },
      { id: "n2-dju", libelle: "DJU de la semaine d’octobre du second site", unite: "DJU", min: 42.1, max: 44.9, indice: "Relisez l’écran « Les degrés-jours unifiés (DJU) » : pour chaque jour 18 − (Tmin + Tmax) ÷ 2, et 0 quand la moyenne dépasse 18 °C. Contrôlez que les sept jours sont comptés, puis additionnez." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-E2", titre: "Conditions intérieures", href: "../e2-conditions-interieures/index.html" },
  correspondances: [
    { reseau: "Législation", titre: "La RE2020", href: "../../../legislation/stations/thermique-re2020/index.html", pourquoi: "Cette gare présente les six indicateurs de la RE2020 et ses zones climatiques, qui servent à l’étude réglementaire du site." },
    { reseau: "Législation", titre: "Le confort d’été", href: "../../../legislation/stations/thermique-confort-ete/index.html", pourquoi: "La RE2020 mesure le confort d’été en degrés-heures : cette gare l’explique, là où la station E1 ne donne que les conditions de base d’été." },
    { reseau: "Bureau d’études", titre: "BE-D0, Le dossier projet", href: "../d0-dossier-projet/index.html", pourquoi: "La carte d’identité du bâtiment porte la ligne « lieu » que vous complétez ici avec la zone, l’altitude et θe." },
    { reseau: "Bureau d’études", titre: "BE-E2, Conditions intérieures", href: "../e2-conditions-interieures/index.html", pourquoi: "Cette station donne les températures intérieures de calcul, l’autre moitié de l’écart de température." },
    { reseau: "AéroRézo", titre: "Parois et écarts de température", href: "../../../aerorezo/stations/transmission/index.html", pourquoi: "Cette page explique pourquoi l’écart entre l’intérieur et θe commande la chaleur qui traverse une paroi." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/1-le-site-et-son-climat.webp", imageAlt: "Une maison sur son terrain, avec à côté un panneau de ville sans texte et un thermomètre. Au-dessus, le soleil d’un côté et un nuage de neige de l’autre. Une technicienne note quelque chose sur un carnet.",
      text: "Vous recevez la commande d’un bureau d’études : établir le climat du site d’un bâtiment. Le climat du site tient en un tableau : la zone climatique, le département et l’altitude, la température extérieure de base θe avec sa correction d’altitude, la température et l’humidité relative (HR) extérieures d’été, et les degrés-jours unifiés (DJU), qui servent à estimer la consommation de chauffage. Chaque valeur s’écrit avec sa source. Vous rendez ce tableau et le calcul des DJU d’une semaine sur la feuille A4 recto verso. L’écran explique chaque geste, la feuille reçoit vos résultats.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Donnée", "Valeur", "Source"], [
        ["Zone climatique", "", ""],
        ["Département", "", ""],
        ["Altitude (m)", "", ""],
        ["θe de référence (°C)", "", ""],
        ["Correction d’altitude (K)", "", ""],
        ["θe retenue (°C)", "", ""],
        ["Été : température (°C)", "", ""],
        ["Été : HR (%)", "", ""],
        ["DJU, base 18 °C", "", ""]
      ], "Le tableau du climat du site, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["Le dossier :", "le plan de masse (page 4 des plans), le cahier des clauses techniques particulières (CCTP, page 3) et un relevé climatique du bureau d’études."], ["La commande :", "établir le climat du site."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "chaque valeur avec la page ou le texte où vous l’avez lue."], ["Le calcul :", "les DJU d’une semaine, jour par jour. À l’écran Vérifier, θe doit être exacte et les DJU tomber dans une fourchette de ± 3 %, arrondie au dixième vers l’extérieur."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station E2, les conditions intérieures."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-chiffres", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les chiffres", level: "comprendre",
      text: "Le climat du site rassemble quatre données, et chacune a sa source. La zone climatique se lit dans l’arrêté du 26 octobre 2010 (réglementation thermique 2012, RT 2012) ; la réglementation environnementale 2020 (RE2020) reprend le même découpage. La température extérieure de base θe se lit dans la norme NF EN 12831-1 et son annexe nationale, ou dans le CCTP du projet. Les conditions d’été viennent du CCTP ou des bases climatiques du bureau d’études. Les degrés-jours unifiés viennent de Météo-France. Une valeur sans source officielle lisible porte la mention « valeur d’exercice » : c’est le cas des valeurs de cette station, sauf la zone.",
      prompt: "Lisez le tableau des quatre sources, puis continuez.",
      render: () => tableau(["Donnée", "Source", "Où la lire"], [
        ["Zone climatique", EX.src.zones, "Légifrance, annexe I : une ligne par département"],
        ["Température extérieure de base θe", EX.src.en12831, "Un tableau par département, une colonne selon la tranche d’altitude. Document payant, cité ici et jamais reproduit. Sur un projet, le CCTP donne en général la valeur retenue."],
        ["Température et HR d’été", "CCTP ou bases climatiques du bureau d’études", "Relevé climatique fourni pour le projet"],
        ["DJU", "Météo-France", "Publications de Météo-France, ou calcul sur un relevé de températures"]
      ], "Les quatre données du climat du site et leurs sources")
        + BE.renvoi('Les zones de la RE2020 sont aussi décrites dans <a href="../../../legislation/stations/thermique-re2020/index.html">la gare « La RE2020 »</a> du réseau Législation.')
    }),

    BE.ecran({
      id: "la-zone-climatique", dossier: "methode", kicker: "La méthode, 1", title: "La zone climatique", level: "comprendre",
      text: "La France métropolitaine est découpée en huit zones climatiques : H1a, H1b, H1c, H2a, H2b, H2c, H2d et H3. La zone d’un site se lit par département, à l’annexe I de l’arrêté du 26 octobre 2010 (article 2). La RE2020 reprend ce découpage. Pour lire une zone : repérez le numéro du département du site, ouvrez l’annexe I sur Légifrance, cherchez ce numéro dans la liste et lisez la zone à droite. Le tableau ci-dessous montre quatre lignes de l’annexe pour apprendre à les lire. Pour la maison, la zone est déjà écrite sur le plan de masse, comme à la station D0 : vous la vérifiez à la table, en cherchant le département de la maison et en comparant : le relevé climatique joint un extrait de l’annexe I, et Légifrance donne la liste entière.",
      prompt: "Lisez l’exemple résolu et les quatre lignes, puis ouvrez le lien de l’annexe I.",
      render: () => tableau(["Groupe", "Zones"], [["H1", "H1a, H1b, H1c"], ["H2", "H2a, H2b, H2c, H2d"], ["H3", "H3"]], "Les huit zones climatiques, par groupe")
        + exempleZone()
        + tableau(["Département", "Zone"], EX.lignes.map(l => [`${l.dep} ${l.nom}`, l.zone]), "Quatre lignes de l’annexe I de l’arrêté du 26 octobre 2010, lues sur Légifrance")
        + BE.liens([{ href: EX.lien, title: "Arrêté du 26 octobre 2010, sur Légifrance", note: "Annexe I : la zone de chaque département. Ouvrez-la pour lire vous-même la ligne de votre site." }])
        + BE.alerte("<strong>Limite.</strong> Quatre lignes ne suffisent pas pour un projet : lisez toujours la ligne de votre département à l’annexe I.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, la zone", title: "Exercice : lire la zone d’un département", level: "appliquer", requiresAction: true,
      text: {
        1: "Un site est situé dans le Rhône, département 69. Lisez sa zone dans le tableau de l’écran « La zone climatique » : une zone se lit, elle ne se devine pas. L’exemple résolu reste sous vos yeux.",
        2: "Un site est situé dans le Rhône, département 69. Lisez sa zone dans le tableau de l’écran « La zone climatique » : une zone se lit, elle ne se devine pas."
      },
      prompt: { 1: "Choisissez la zone, en vous aidant de l’exemple.", 2: "Choisissez la zone. Cette question est à faire seul." },
      aides: [
        "Le tableau des quatre lignes est à l’écran « La zone climatique », sous les huit zones.",
        "Repérez le numéro du département dans la colonne de gauche, puis lisez la zone sur la même ligne.",
        `Pour le département ${EX.pau.dep}, la ligne donne ${EX.pau.zone}. Faites le même geste avec le numéro du Rhône.`
      ],
      ...BE.parNiveau({
        1: avecBloc(exempleZone(), EX.ex1),
        2: BE.quiz(EX.ex1)
      })
    }),

    BE.ecran({
      id: "temperature-de-base", dossier: "methode", kicker: "La méthode, 2", title: "La température extérieure de base θe", level: "comprendre",
      text: "La température extérieure de base, notée θe, est la température extérieure retenue pour calculer les déperditions et la puissance du chauffage. On la fixe par convention pour chaque lieu. Elle se lit dans la norme NF EN 12831-1 et son annexe nationale : un tableau par département, avec une colonne selon la tranche d’altitude. Cette norme est payante : elle est citée ici et jamais reproduite. Sur un projet, le CCTP donne en général la valeur retenue par le bureau d’études. La moyenne d’hiver est plus douce que θe, et le record de froid plus sévère : aucun des deux ne sert de θe. Pour la maison, le CCTP donne θe à la page 3 avec la mention « valeur d’exercice » : sur un vrai projet, elle se lirait dans l’annexe nationale. Vous la reprenez telle quelle, avec sa source.",
      prompt: "Lisez l’exemple résolu et le piège, puis continuez.",
      render: () => BE.exemple({ text: `Site d’exemple : Pau, département ${EX.pau.dep}, zone ${EX.pau.zone}, altitude ${EX.pau.alt} m`, answer: `θe = ${EX.pau.ref} °C`, why: "Valeur d’exercice reprise du CCTP d’une affaire réelle de Jurançon, dans le même département. Elle s’écrit avec son signe moins, son unité et sa source." })
        + BE.alerte("<strong>Piège.</strong> Prendre la moyenne d’hiver sous-dimensionne le chauffage, prendre le record de froid le surdimensionne. θe est la valeur lue dans la norme ou donnée par le CCTP.")
    }),

    BE.ecran({
      id: "correction-d-altitude", dossier: "methode", kicker: "La méthode, 3", title: "La correction d’altitude", level: "comprendre",
      image: "illustrations/2-plus-haut-plus-froid.webp", imageAlt: "Une vallée enneigée avec une maison en bas et une autre en haut d’une pente. Chaque maison a son thermomètre : celui de la maison du haut indique une température plus basse et il est coloré en orange.",
      text: `Plus un site est haut, plus il fait froid : la θe d’un département vaut pour une altitude donnée, et elle baisse au-dessus. Sur un vrai projet, la correction se lit dans la colonne de l’annexe nationale qui correspond à la tranche d’altitude. Dans cette station, une règle d’exercice la remplace : au-dessus de ${EX.seuil} m, θe baisse de ${EX.parTrancheAbs} K par tranche de ${EX.tranche} m entamée. Le kelvin (K) mesure un écart : 1 K d’écart vaut 1 °C d’écart. Pour compter les tranches, retranchez ${EX.seuil} m à l’altitude, divisez par ${EX.tranche} et arrondissez au nombre entier supérieur. Jusqu’à ${EX.seuil} m, il n’y a aucune correction.`,
      prompt: "Lisez les deux exemples résolus et le piège, puis continuez.",
      render: () => tableau(["Étape", "Calcul"], [
        ["Tranches entamées", `(altitude − ${EX.seuil} m) ÷ ${EX.tranche} m, arrondi au nombre entier supérieur`],
        ["Correction (K)", `tranches × (${EX.parTranche} K)`],
        ["θe retenue (°C)", "θe de référence + correction"]
      ], "La règle d’exercice de correction d’altitude")
        + BE.exemple({ text: `Site d’exemple : Pau, altitude ${EX.pau.alt} m, θe de référence ${EX.pau.ref} °C`, answer: `Aucune correction : θe retenue = ${EX.pau.theta} °C`, why: `${EX.pau.alt} m n’est pas au-dessus de ${EX.seuil} m : zéro tranche.` })
        + exempleAltitude()
        + BE.alerte(`<strong>Piège.</strong> Corriger un site qui ne dépasse pas ${EX.seuil} m, ou compter les tranches entières : ${EX.mont.reste} ÷ ${EX.tranche} = ${EX.mont.ratio} donne ${EX.mont.entieres} tranches entières, mais la tranche suivante est entamée et compte.`)
        + BE.renvoi("Sur un vrai projet, la correction se lit dans le tableau de l’annexe nationale : elle ne se calcule pas par une règle de trois. La règle de cette station est une valeur d’exercice.")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, θe retenue", title: "Exercice : θe d’un site en altitude", level: "appliquer", requiresAction: true,
      text: {
        1: `Un site de montagne est à ${EX.ex2.alt} m. La θe de référence de son département, pour ${EX.seuil} m ou moins, est ${EX.ex2.ref} °C. Appliquez la règle d’exercice : quelle est θe retenue ? Les exemples résolus de l’écran « La correction d’altitude » restent sous vos yeux.`,
        2: `Un site de montagne est à ${EX.ex2.alt} m. La θe de référence de son département, pour ${EX.seuil} m ou moins, est ${EX.ex2.ref} °C. Appliquez la règle d’exercice : quelle est θe retenue ?`
      },
      prompt: { 1: "Choisissez θe retenue, en vous aidant des exemples.", 2: "Choisissez θe retenue. Cette question est à faire seul." },
      aides: [
        "La règle d’exercice est à l’écran « La correction d’altitude » ; l’altitude et la référence sont dans l’énoncé.",
        `Retranchez ${EX.seuil} m à l’altitude, divisez par ${EX.tranche} et arrondissez au nombre entier supérieur : c’est le nombre de tranches entamées. Multipliez par ${EX.parTranche} K, puis ajoutez à la référence.`,
        `Sur le site de montagne d’exemple : ${EX.mont.alt} − ${EX.seuil} = ${EX.mont.reste} ; ${EX.mont.reste} ÷ ${EX.tranche} = ${EX.mont.ratio} ; ${EX.mont.tranches} tranches ; ${EX.mont.corr} K. Écrivez les mêmes lignes avec ${EX.ex2.alt} m.`
      ],
      ...BE.parNiveau({
        1: avecBloc(exempleAltitude(), EX.ex2q),
        2: BE.quiz(EX.ex2q)
      })
    }),

    BE.ecran({
      id: "conditions-d-ete", dossier: "methode", kicker: "La méthode, 4", title: "Les conditions d’été", level: "comprendre",
      text: "Le bilan d’été demande deux données : la température extérieure de base d’été et l’humidité relative (HR) extérieure de base d’été. Elles se lisent au CCTP ou dans les bases climatiques du bureau d’études. Elles servent au bilan d’été des stations T6 à T8. Un CCTP donne souvent une HR d’hiver et une HR d’été : lisez la ligne d’été. La RE2020 mesure le confort d’été autrement, en degrés-heures (DH) : la gare « Le confort d’été » du réseau Législation l’explique.",
      prompt: "Lisez l’exemple résolu, puis continuez.",
      render: () => BE.exemple({ text: `Site d’exemple : Pau, conditions d’été du CCTP`, answer: `${EX.pau.ete} °C et HR ${EX.pau.hr} %`, why: "Valeurs d’exercice reprises du CCTP d’une affaire réelle de Jurançon. Elles s’écrivent avec leur unité et leur source." })
        + BE.renvoi('Pour les degrés-heures, voir <a href="../../../legislation/stations/thermique-confort-ete/index.html">la gare « Le confort d’été »</a> du réseau Législation.')
    }),

    BE.ecran({
      id: "degres-jours-unifies", dossier: "methode", kicker: "La méthode, 5", title: "Les degrés-jours unifiés (DJU)", level: "comprendre",
      image: "illustrations/3-les-degres-jours.webp", imageAlt: "Un calendrier mural dont les cases sont vides, avec de petits traits qui suggèrent un thermomètre dans chaque case. À côté, un radiateur. Une technicienne additionne des nombres sur une feuille.",
      text: "Les degrés-jours unifiés (DJU) mesurent le froid d’une période par rapport à une température de base de 18 °C. Pour chaque jour, on prend la moyenne de la température minimale (Tmin) et de la température maximale (Tmax). Quand cette moyenne est sous 18 °C, le DJU du jour est l’écart à 18 °C. Quand elle est au-dessus, le DJU du jour vaut 0. Le DJU d’une période est la somme des DJU de ses jours. Météo-France publie les DJU, dont le DJU annuel, somme de toute l’année. Ils servent à estimer une consommation de chauffage, jamais une puissance : la puissance vient de θe. Dans cette station, la méthode est simplifiée, par la moyenne : c’est une valeur d’exercice.",
      prompt: "Lisez la formule, l’exemple résolu des trois jours et le piège, puis continuez.",
      render: () => tableau(["Formule", "Unité"], [
        ["DJU du jour = 18 − (Tmin + Tmax) ÷ 2, si ce nombre est positif, sinon 0", "degré-jour (°C.j)"],
        ["DJU d’une période = somme des DJU de ses jours", "degré-jour (°C.j)"]
      ], "Le calcul des DJU, base 18 °C")
        + exempleJour()
        + tableau(["Jour", "Tmin (°C)", "Tmax (°C)", "Moyenne (°C)", "DJU"], [
          ...EX.trois.lignes.map(l => [l.jour, l.tmin, l.tmax, l.moy, l.dju]),
          ["Total des trois jours", "", "", "", EX.trois.total]
        ], "Trois jours du site d’exemple, valeurs d’exercice")
        + BE.alerte(`<strong>Piège.</strong> La moyenne du ${EX.trois.tempere.jour} est ${EX.trois.tempere.moy} °C, au-dessus de 18 °C : 18 − ${EX.trois.tempere.moy} donne ${EX.trois.tempere.negatif}, et on écrit 0. Un jour tempéré ne retire jamais rien au total.`)
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, les DJU", title: "Exercice : les DJU de deux jours", level: "appliquer", requiresAction: true,
      text: {
        1: `Deux jours du site d’exemple : le ${EX.deux.A.jour}, Tmin ${EX.deux.A.tmin} °C et Tmax ${EX.deux.A.tmax} °C ; le ${EX.deux.B.jour}, Tmin ${EX.deux.B.tmin} °C et Tmax ${EX.deux.B.tmax} °C. Calculez le DJU de chaque jour, puis leur somme. L’exemple résolu reste sous vos yeux.`,
        2: `Deux jours du site d’exemple : le ${EX.deux.A.jour}, Tmin ${EX.deux.A.tmin} °C et Tmax ${EX.deux.A.tmax} °C ; le ${EX.deux.B.jour}, Tmin ${EX.deux.B.tmin} °C et Tmax ${EX.deux.B.tmax} °C. Calculez le DJU de chaque jour, puis leur somme.`
      },
      prompt: { 1: "Choisissez la somme des deux DJU, en vous aidant de l’exemple.", 2: "Choisissez la somme des deux DJU. Cette question est à faire seul." },
      aides: [
        "Les deux jours sont dans l’énoncé, la formule à l’écran « Les degrés-jours unifiés (DJU) ».",
        "Pour chaque jour : moyenne de Tmin et de Tmax, puis 18 moins la moyenne. Si le résultat est négatif, écrivez 0. Additionnez ensuite les deux jours.",
        `Sur le ${EX.trois.lignes[1].jour} de l’exemple (Tmin ${EX.trois.lignes[1].tmin} °C, Tmax ${EX.trois.lignes[1].tmax} °C) : moyenne ${EX.trois.lignes[1].moy}, DJU ${EX.trois.lignes[1].dju}. Faites les mêmes lignes pour chacun des deux jours.`
      ],
      ...BE.parNiveau({
        1: avecBloc(exempleJour(), EX.ex3q),
        2: BE.quiz(EX.ex3q)
      })
    }),

    BE.ecran({
      id: "le-releve-climatique", dossier: "methode", kicker: "La méthode, 6", title: "Lire le relevé climatique", level: "comprendre",
      text: "Pour le projet, le bureau d’études vous fournit une page : le relevé climatique. Elle porte un bloc par site. Chaque bloc donne le département, l’altitude, les conditions d’été, le DJU annuel et une semaine de températures, avec Tmin et Tmax de chaque jour. La θe de référence figure dans le bloc du second site ; pour la maison, elle se lit au CCTP, page 3. Le relevé donne le DJU annuel, mais ni la moyenne de chaque jour, ni les DJU journaliers, ni le total de la semaine : vous les calculez. Dans la colonne « Où je l’ai lue » de la feuille, écrivez « relevé climatique » et le nom du bloc.",
      prompt: "Lisez le tableau des rubriques du relevé, puis continuez.",
      render: () => tableau(["Rubrique du relevé", "Ce que vous y lisez", "Où la reporter"], [
        ["Département et altitude", "Le numéro et le nom du département, l’altitude en mètres", "Lignes « Département » et « Altitude » du tableau du site"],
        ["θe de référence", "La température de base du département, sans correction d’altitude (second site seulement)", "Ligne « θe de référence »"],
        ["Conditions d’été", "La température et la HR extérieures d’été", "Deux lignes « Été »"],
        ["DJU annuel", "La somme des DJU de l’année, base 18 °C", "Ligne « DJU »"],
        ["Une semaine de températures", "Tmin et Tmax des sept jours", "Tableau des sept jours, au verso de la feuille"]
      ], "Les rubriques du relevé climatique et leur place sur la feuille")
        + BE.renvoi("Toutes les valeurs du relevé sont des valeurs d’exercice : écrivez-le dans la colonne de la source.")
    }),

    BE.ecran({
      id: "tableau-du-site-d-exemple", dossier: "methode", kicker: "La méthode, 7", title: "Le tableau du site d’exemple", level: "comprendre",
      text: "Le tableau complet du site d’exemple, Pau, suit, avec la source de chaque ligne. Il sert de modèle à votre feuille : une valeur, puis l’endroit où vous l’avez lue.",
      prompt: "Suivez le tableau ligne par ligne, puis lisez la colonne des sources.",
      render: () => tableau(["Donnée", "Valeur", "Source"], EX.tableauPau, "Le climat du site d’exemple")
        + BE.renvoi("Les valeurs d’exercice sont dites comme telles dans la colonne des sources. Seule la zone a une source officielle lisible.")
    }),

    BE.ecran({
      id: "ce-que-coute-une-erreur", dossier: "methode", kicker: "La méthode, 8", title: "Ce qu’une erreur coûte ensuite", level: "comprendre",
      text: "Une erreur de climat se retrouve dans toutes les stations qui suivent. Une θe trop froide surdimensionne le chauffage. Une zone fausse fausse l’étude réglementaire. Des DJU pris pour une puissance donnent une installation mal choisie. L’exemple chiffre le premier cas. H est le coefficient de déperdition d’une pièce, en W/K, et Φ la puissance perdue, en W : Φ = H × ΔT, donc la déperdition est proportionnelle à l’écart de température ΔT.",
      prompt: "Lisez l’exemple et les trois cartes, puis continuez.",
      render: () => BE.exemple({ text: `Même pièce que pour Pau, θi = ${EX.cout.ti} °C (valeur d’exercice) : θe = ${EX.cout.te} °C ou θe = ${EX.cout.teFausse} °C`, answer: `ΔT = ${EX.cout.dT} K ou ${EX.cout.dTFaux} K : Φ grandit de ${EX.cout.pour100} %`, why: `Φ = H × ΔT (station T3) : avec le même H, un écart de ${EX.cout.dTFaux} K au lieu de ${EX.cout.dT} K donne ${EX.cout.pour100} % de déperdition en plus, donc une puissance de chauffage trop forte.` })
        + BE.cartes([
          { title: "θe trop froide", rows: [["Conséquence :", "écart de température trop grand, déperditions et puissance du chauffage trop fortes."], ["Où ça se voit :", "station T5, la puissance à installer."]] },
          { title: "Zone fausse", rows: [["Conséquence :", "les calculs de la RE2020 partent d’un mauvais climat, l’étude réglementaire est fausse."], ["Où ça se voit :", "gare « La RE2020 », réseau Législation."]] },
          { title: "DJU pris pour une puissance", rows: [["Conséquence :", "un DJU annuel élevé dit qu’il faut chauffer longtemps, il ne dit pas avec quelle puissance."], ["Où ça se voit :", "la puissance vient de θe, station T5."]] }
        ])
    }),

    ecranProjet,

    BE.fourchette({
      dossier: "projet", kicker: "Vérifier",
      text: "Reportez ici vos résultats. Chaque réponse vous dit seulement si vous êtes dans la fourchette attendue, sans donner la valeur. Pour une température négative, écrivez le signe moins avec la touche tiret du clavier, par exemple -3,5 : le tiret typographique « − » n’est pas lu."
    }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

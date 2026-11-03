/* Station BE-T9 : la machine, puissance et choix.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5 à T8 avec la PAC 3,5 de l'exercice (la PAC 3 est la commande du niveau 1),
   puis commande du niveau 2 sur la maison, avec deux machines de l'exercice. Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des
   fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/t9-machine-puissance-choix/construire.mjs : le premier vient de exemple-data.mjs,
   les secondes de exemple-data.mjs (niveau 1) et de corriges/t9-machine-puissance-choix/reference-machine.json (niveau 2, outils/t9-machine-maison.mjs).
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes et les données de la commande le sont.
   Aucun document de fabricant : les catalogues sont des données de l'exercice. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "ti": "19",
 "tb": "−7",
 "tnc": "15",
 "eau": "50",
 "phi": "2996",
 "H": "115,23",
 "ecartD": "22",
 "pente": "136,2",
 "b0": "2043",
 "T": [
  "−15",
  "−10",
  "−7",
  "−2",
  "+2",
  "+7",
  "+12"
 ],
 "m": {
  "nom": "PAC 3,5",
  "P": [
   "2170",
   "2450",
   "2630",
   "2800",
   "2870",
   "3500",
   "3850"
  ],
  "cop": "2,8",
  "froid": "3200",
  "eer": "2,9",
  "p7": "3500"
 },
 "exm": {
  "pb": "2630",
  "pRatio": "75",
  "biv": "−4,8",
  "bivP": "2703",
  "app": "366",
  "appKW": "1",
  "couv": "88",
  "gainM": "34",
  "deg": "2,2"
 },
 "site": {
  "t": "−5",
  "P": "2698",
  "bas": "−7",
  "haut": "−2",
  "Pbas": "2630",
  "Phaut": "2800",
  "ecart": "2",
  "pas": "5"
 },
 "ete": {
  "tot": "4443",
  "kW": "4,5",
  "couv": "72"
 },
 "n1": {
  "nom": "PAC 3",
  "P": [
   "1860",
   "2100",
   "2250",
   "2400",
   "2460",
   "3000",
   "3300"
  ],
  "cop": "2,9"
 },
 "ex1": {
  "quiz": {
   "choices": [
    "Pompe à chaleur air/eau et radiateurs",
    "Groupe d’eau glacée et ventilo-convecteurs",
    "Détente directe : une unité extérieure, une unité intérieure par bureau",
    "Chaudière gaz et radiateurs"
   ],
   "good": 2,
   "explain": "Sans réseau d’eau, la détente directe porte le fluide frigorigène jusqu’à une unité dans chaque bureau, qui chauffe ou rafraîchit l’air, avec un réglage par bureau. La pompe à chaleur air/eau et la chaudière demandent un réseau d’eau, et des radiateurs ne rafraîchissent pas ; le groupe d’eau glacée froid seul ne chauffe pas et demande lui aussi un réseau d’eau."
  }
 },
 "ex2": {
  "t": "−4",
  "bas": "−7",
  "haut": "−2",
  "Pbas": "3600",
  "Phaut": "4000",
  "quiz": {
   "choices": [
    "3600 W",
    "3840 W",
    "4000 W",
    "3760 W"
   ],
   "good": 1,
   "explain": "−4 °C est à 3 degrés de −7 °C, sur un écart de 5 : P = 3600 + (4000 − 3600) × 3 ÷ 5 = 3840 W. 3600 W garde la ligne la plus froide sans corriger, 4000 W prend la ligne la plus chaude, 3760 W compte les degrés depuis la ligne chaude."
  }
 },
 "ex3": {
  "tb": "−8",
  "tnc": "16",
  "phi": "6000",
  "nom": "PAC 6",
  "P": [
   "3720",
   "4200",
   "4500",
   "4800",
   "4920",
   "6000",
   "6600"
  ],
  "quiz": {
   "choices": [
    "Bivalence vers −3 °C ; appoint 1500 W",
    "Bivalence vers −8 °C ; appoint 0 W",
    "Bivalence vers +2 °C ; appoint 1600 W",
    "Bivalence vers −3 °C ; appoint 1600 W"
   ],
   "good": 3,
   "explain": "Sur le graphique, la courbe de la PAC 6 croise la droite vers −3 °C. À −8 °C, entre les lignes −10 et −7 °C du catalogue, la machine donne 4200 + (4500 − 4200) × 2 ÷ 3 = 4400 W ; l’appoint vaut 6000 − 4400 = 1600 W. 1500 W prend la ligne −7 °C sans corriger ; −8 °C est la température de base, pas le croisement ; +2 °C est le coude du dégivrage."
  }
 },
 "maison": {
  "tb": "−5",
  "ti": "20",
  "tnc": "16",
  "eau": "45",
  "machines": [
   {
    "nom": "PAC 4",
    "P": [
     "2480",
     "2800",
     "3000",
     "3200",
     "3280",
     "4000",
     "4400"
    ],
    "cop": "3,1",
    "froid": "3600",
    "eer": "2,8"
   },
   {
    "nom": "PAC 7",
    "P": [
     "4340",
     "4900",
     "5250",
     "5600",
     "5740",
     "7000",
     "7700"
    ],
    "cop": "3",
    "froid": "6900",
    "eer": "2,7"
   }
  ],
  "regle": "la plus petite des deux machines dont le point de bivalence est sous 0 °C ; l’appoint électrique couvre l’écart à la température de base, arrondi au kW au-dessus."
 }
};
/*EXEMPLE-FIN*/

const M = EX.m, E = EX.exm, S = EX.site;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const catalogue = (machines, legende) => tableau(["θe dehors (°C)", ...EX.T], machines.map(m => [`${m.nom} (W)`, ...m.P]), legende);
const tableCriteres = () => tableau(["Critère", "Pompe à chaleur air/eau", "Groupe d’eau glacée", "Détente directe", "Bâtiment d’exemple"], [
  ["Chauffe l’eau des émetteurs", "oui", "non (froid seul)", "non", "demandé : émetteurs à eau, départ " + EX.eau + " °C"],
  ["Rafraîchit l’été", "oui si réversible, avec ventilo-convecteurs ou plancher", "oui, avec ventilo-convecteurs", "oui", "non demandé"],
  ["Ce qui entre dans les locaux", "de l’eau", "de l’eau", "le fluide frigorigène", "réseau d’eau existant"],
  ["Ce qu’il faut poser", "unité dehors, module en local technique", "groupe dehors, et une autre machine pour l’hiver", "unité dehors, une unité dans chaque local", "un local technique"],
  ["Famille retenue", "oui", "non", "non", "pompe à chaleur air/eau"]
], "Bâtiment d’exemple : le tableau des critères, rempli");
const exempleCatalogue = () => BE.exemple({ text: `${M.nom} de l’exercice, eau à ${EX.eau} °C ; bâtiment d’exemple, température de base ${EX.tb} °C`, answer: `À +7 °C : ${M.p7} W et COP ${M.cop}. À ${EX.tb} °C : ligne ${EX.tb} °C du catalogue, ${E.pb} W, soit ${E.pb} ÷ ${M.p7} × 100 = ${E.pRatio} % de la puissance de tête de catalogue.`, why: "La puissance affichée en tête de catalogue est celle de +7 °C. Au froid de la base, la machine donne moins : c’est cette valeur qui compte pour le bâtiment." });
const exempleSite = () => BE.exemple({ text: `Même machine, sur un site dont la température de base est ${S.t} °C`, answer: `Lignes ${S.bas} °C (${S.Pbas} W) et ${S.haut} °C (${S.Phaut} W). ${S.t} °C est à ${S.ecart} degrés de ${S.bas} °C, sur un écart de ${S.pas} : P = ${S.Pbas} + (${S.Phaut} − ${S.Pbas}) × ${S.ecart} ÷ ${S.pas} = ${S.P} W`, why: "Le résultat se donne au watt. La ligne la plus froide seule sous-estime la machine ; la ligne la plus chaude la surestime." });
const exempleDroite = () => BE.exemple({ text: `Bâtiment d’exemple : H = ${EX.H} W/K (station T5), θi = ${EX.ti} °C, θb = ${EX.tb} °C, θnc = ${EX.tnc} °C (donnée de l’exercice)`, answer: `Point de base : ${EX.H} × (${EX.ti} − (${EX.tb})) = ${EX.phi} W à ${EX.tb} °C. Point de non-chauffage : 0 W à ${EX.tnc} °C. Pente : ${EX.phi} ÷ ${EX.ecartD} = ${EX.pente} W/K. Besoin à 0 °C : ${EX.phi} × ${EX.tnc} ÷ ${EX.ecartD} = ${EX.b0} W.`, why: "Deux points suffisent pour tracer une droite. La pente sert de contrôle : chaque degré plus doux retire la même puissance." });
const exempleBiv = () => BE.exemple({ text: `${M.nom} et besoins du bâtiment d’exemple, sur le même graphique`, answer: `Lecture à la règle : point de bivalence vers ${E.biv} °C et ${E.bivP} W. Contrôle par le calcul, entre les lignes ${EX.T[2]} et ${EX.T[3]} °C : la machine gagne ${E.gainM} W par degré, le besoin perd ${EX.pente} W par degré ; l’écart de ${E.app} W à ${EX.tb} °C se referme en ${E.app} ÷ (${E.gainM} + ${EX.pente}) = ${E.deg} degrés, soit vers ${E.biv} °C.`, why: "La lecture se donne au demi-degré près. Le calcul n’est qu’un contrôle : il vaut seulement entre deux lignes du catalogue." });
const exempleApp = () => BE.exemple({ text: `${M.nom}, bâtiment d’exemple, à la température de base ${EX.tb} °C`, answer: `Appoint = ${EX.phi} − ${E.pb} = ${E.app} W ; appoint à installer : ${E.appKW} kW. Part couverte par la machine à ${EX.tb} °C : ${E.pb} ÷ ${EX.phi} × 100 = ${E.couv} %.`, why: "L’appoint se calcule là où l’écart est le plus grand, à la température de base. Il s’arrondit au kW au-dessus (donnée de l’exercice)." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Toutes les données sont dans la commande et sur la feuille : le catalogue de la ${EX.n1.nom}, les besoins du bâtiment d’exemple (${EX.phi} W à ${EX.tb} °C, nuls à ${EX.tnc} °C) et la variante du maître d’ouvrage. Le tableau des critères est à l’écran « Choisir la famille par les critères ».`,
      "Exercice 1 : la ligne du catalogue à la température de base. Exercice 2 : les deux points de la droite, la droite tracée à la règle sur le graphique, puis le croisement. Exercice 3 : besoin de base moins puissance de la machine. Exercice 4 : une ligne du tableau des critères à la fois. Exercice 5 : les trois lignes de note, sur le modèle de l’écran « La justification écrite ».",
      `Sur l’exemple, la ${M.nom} donne ${E.pb} W à ${EX.tb} °C, son point de bivalence tombe vers ${E.biv} °C et l’appoint vaut ${E.app} W. La ${EX.n1.nom} est plus petite : son point de bivalence est plus haut, son appoint plus grand.`
    ],
    2: [
      `Déperditions de base, sans la relance : votre feuille de la station T5. Puissance frigorifique de la machine : votre feuille de la station T8. θb et θi : CCTP page 3. Départ d’eau ${EX.maison.eau} °C : station H1. θnc, catalogues et règle de choix : la commande.`,
      `La température de base de la maison, ${EX.maison.tb} °C, n’est pas une ligne du catalogue : corrigez la puissance entre les lignes ${EX.T[2]} et ${EX.T[3]} °C, comme à l’écran « Corriger la puissance au site ». Le point de bivalence se lit sur le graphique de la feuille, pour chaque machine.`,
      `Appliquez la règle de choix de la commande, puis vérifiez l’été avec la puissance frigorifique de la machine retenue. Sur l’exemple : ${E.pb} W à la base, point de bivalence vers ${E.biv} °C, appoint ${E.app} W, ${EX.ete.couv} % du froid demandé.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensDossier = () => BE.liens([
  { href: DOSSIER + "plans-maison.pdf", title: "Les plans de la maison", note: "Le garage et ses murs" },
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Page 3 : températures de calcul ; page 4 : chauffage et pas de climatisation" }
]);
const cataloguesProjet = BE.parNiveau({
  1: { render: () => catalogue([EX.n1], `Catalogue de l’exercice, eau à ${EX.eau} °C : puissance de chauffage selon la température du dehors, dégivrages compris`) },
  2: { render: () => catalogue(EX.maison.machines, `Catalogue de l’exercice, eau à ${EX.maison.eau} °C : puissance de chauffage selon la température du dehors, dégivrages compris`)
    + tableau(["Machine", "COP à +7 °C, eau à " + EX.maison.eau + " °C", "Froid à 35 °C, eau à 7 °C (W)", "EER à 35 °C"], EX.maison.machines.map(m => [m.nom, m.cop, m.froid, m.eer]), "Catalogue de l’exercice : rendement et froid") + liensDossier() }
});
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + cataloguesProjet.render(); };

BE.station({
  code: "BE-T9",
  titre: "La machine",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bâtiment d’exemple et une autre machine, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison et deux machines, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Avec les deux bilans, vous choisissez la machine. D’abord la famille : pompe à chaleur air/eau, groupe d’eau glacée ou détente directe. Puis la puissance que la machine donne au froid du site, lue dans son catalogue et corrigée. Sur un même graphique, la courbe de la machine croise la droite des besoins du bâtiment : c’est le point de bivalence. Sous ce point, un appoint complète. Vous vérifiez l’été avec la même machine, puis vous justifiez le choix par écrit.",
  note: "Les catalogues des machines sont des données de l’exercice, sans document de fabricant. La température de non-chauffage, la règle de choix et l’arrondi de l’appoint sont aussi des données de l’exercice. Les familles et le dégivrage viennent des stations CartoClim.",

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
      objet: `Puissance, point de bivalence et appoint de la ${EX.n1.nom} sur le bâtiment d’exemple ; famille d’une variante`,
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études choisit la machine du petit bâtiment de bureaux d’exemple. Les écrans ont traité la ${M.nom} ; un fournisseur propose une machine plus petite, la ${EX.n1.nom} (catalogue de l’exercice, eau à ${EX.eau} °C, COP ${EX.n1.cop} à +7 °C), dont le catalogue est sous cette commande et sur la feuille. Besoins du bâtiment : ${EX.phi} W à la température de base ${EX.tb} °C (station T5, exemple, sans la relance), nuls à ${EX.tnc} °C (donnée de l’exercice). Le maître d’ouvrage demande aussi l’avis du bureau d’études sur une variante : garder une chaudière pour l’hiver et rafraîchir les bureaux l’été par des ventilo-convecteurs à eau. Suivez les étapes dans l’ordre.`,
        "Étape 1, exercice 1 de la feuille. La puissance de la machine à la température de base, lue dans le catalogue.",
        "Étape 2, exercice 2 de la feuille. Les deux points de la droite des besoins, la droite tracée à la règle sur le graphique, le point de bivalence lu.",
        "Étape 3, exercice 3 de la feuille. L’appoint, l’appoint à installer et la part couverte par la machine.",
        "Étape 4, exercice 4 de la feuille. La famille de la variante, avec le tableau des critères.",
        "Étape 5, exercice 5 de la feuille. Les trois lignes de la note. Vérifiez vos trois résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: `Catalogue de la ${EX.n1.nom}`, ou: "Sous cette commande, et sur la feuille" },
        { piece: "Besoins du bâtiment d’exemple", ou: "Cette commande ; écran « La droite des besoins »" },
        { piece: "Tableau des critères", ou: "Écran « Choisir la famille par les critères »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Choix de la machine de la maison : famille, puissance corrigée, point de bivalence, appoint, été, justification",
      delai: "Rendu en fin de séance",
      commande: `Le CCTP de la maison (page 4) prévoit un chauffage central par pompe à chaleur air/eau installée au garage, des radiateurs à eau basse température et aucune climatisation. Le bureau d’études vous demande de confirmer la famille par les critères, de choisir la machine entre la ${EX.maison.machines[0].nom} et la ${EX.maison.machines[1].nom} du catalogue de l’exercice (eau à ${EX.maison.eau} °C, sous cette commande), et de justifier le choix par écrit. Besoins d’hiver : les déperditions de base de votre feuille de la station T5, sans la relance, à la température de base de ${EX.maison.tb} °C (CCTP page 3, station E1), pour θi = ${EX.maison.ti} °C. Température de non-chauffage : ${EX.maison.tnc} °C (donnée de l’exercice). Besoin d’été : la puissance frigorifique de la machine, avec simultanéité, de votre feuille de la station T8. Départ d’eau : ${EX.maison.eau} °C, régime de la station H1. Règle du bureau d’études (donnée de l’exercice) : ${EX.maison.regle} Établissez la puissance corrigée de chaque machine à ${EX.maison.tb} °C, son point de bivalence et son appoint, choisissez, vérifiez l’été avec la même machine, puis rendez la première page de la note, avec la source de chaque donnée.`,
      pieces: [
        { piece: "Vos feuilles des stations T5, T8, E1 et H1", ou: "Déperditions de base ; puissance frigorifique de la machine ; température de base ; régime d’eau" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 3 : températures de calcul ; page 4 : chauffage, garage, pas de climatisation" },
        { piece: "Catalogue des deux machines", ou: "Sous cette commande, et sur la feuille" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-pb", libelle: "Puissance de la PAC 3 à la température de base", unite: "W", min: 2182, max: 2318, indice: "Relisez l’écran « La puissance change avec le dehors » : la ligne du catalogue à la température de base, pas la puissance de tête à +7 °C." },
      { id: "n1-biv", libelle: "Point de bivalence de la PAC 3, température lue", unite: "°C", min: -3.1, max: -2, indice: "Relisez l’écran « Le point de bivalence » : la droite passe par le besoin de base à θb et par 0 W à θnc ; lisez la température au croisement avec la courbe, au demi-degré." },
      { id: "n1-app", libelle: "Appoint à la température de base", unite: "W", min: 723, max: 769, indice: "Relisez l’écran « L’appoint » : besoin de base, sans la relance, moins la puissance de la machine à la température de base." }
    ],
    2: [
      { id: "n2-pb", libelle: "Puissance corrigée de la machine retenue à la température de base", unite: "W", min: 3018, max: 3142, indice: "Relisez l’écran « Corriger la puissance au site » : la base de la maison tombe entre deux lignes du catalogue ; partez de la ligne froide et comptez les degrés." },
      { id: "n2-biv", libelle: "Point de bivalence de la machine retenue, température lue", unite: "°C", min: -3.2, max: -2.1, indice: "Relisez l’écran « Le point de bivalence » : la droite passe par le besoin de base à θb et par 0 W à θnc ; lisez la température au croisement avec la courbe, au demi-degré." },
      { id: "n2-app", libelle: "Appoint de la machine retenue à la température de base", unite: "W", min: 487, max: 519, indice: "Relisez l’écran « L’appoint » : besoin de base, sans la relance, moins la puissance de la machine à la température de base." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-R4", titre: "L’énergie sur l’année", href: "../r4-energie-annee/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-T5, Le bilan d’hiver", href: "../t5-bilan-hiver/index.html", pourquoi: "Les déperditions de base et le coefficient H du bâtiment viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-T8, Été 3 : la synthèse", href: "../t8-ete-air-neuf-synthese/index.html", pourquoi: "La puissance frigorifique de la machine, avec simultanéité, vient de cette station." },
    { reseau: "Bureau d’études", titre: "BE-H1, Puissance et débit", href: "../h1-puissance-debit-regime/index.html", pourquoi: "Le régime d’eau des émetteurs fixe la température d’eau à lire dans le catalogue." },
    { reseau: "CartoClim", titre: "La PAC air/eau : haute, moyenne et basse température", href: "../../../cartoclim/stations/3-7-pac-air-eau/index.html", pourquoi: "Les deux parties de la machine, le dégivrage, l’appoint électrique et la température de l’eau y sont montrés." },
    { reseau: "CartoClim", titre: "Groupe d’eau glacée et ventilo-convecteurs", href: "../../../cartoclim/stations/3-8-eau-glacee/index.html", pourquoi: "La famille du froid par l’eau, et ses émetteurs." },
    { reseau: "CartoClim", titre: "Le DRV : un réseau de fluide à débit variable", href: "../../../cartoclim/stations/3-5-drv/index.html", pourquoi: "La détente directe : le fluide va jusqu’au local." },
    { reseau: "Législation", titre: "PAC & voisinage", href: "../../../legislation/stations/acoustique-pac-voisinage/index.html", pourquoi: "Où poser l’unité extérieure sans gêner les voisins." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : choisir la machine du bâtiment. Vous avez ses deux bilans : la puissance d’hiver de la station T5 et la puissance frigorifique de la station T8. Vous choisissez d’abord la famille de machine. Vous lisez ensuite dans un catalogue la puissance que la machine donne quand il fait froid dehors, et vous la corrigez à la température de base du site. Vous tracez les besoins du bâtiment sur le même graphique : le croisement donne le point de bivalence, et l’écart à la température de base donne l’appoint. Vous vérifiez ce que la même machine donne en été, puis vous justifiez le choix par écrit. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Vous recevez", rows: [["La commande :", "choisir la machine et justifier."], ["Le dossier :", "vos feuilles des stations T5, T8, E1 et H1, un catalogue de l’exercice."]] },
        { title: "Vous produisez", rows: [["Le graphique :", "la courbe de la machine, la droite des besoins, leur croisement."], ["Les résultats :", "puissance à la température de base, point de bivalence, appoint. Fourchettes à l’écran Vérifier : ± 3 % sur une puissance calculée, ± 0,5 °C sur le point de bivalence lu."]] },
        { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station R4, l’énergie consommée sur l’année."]] }
      ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les besoins viennent des stations que vous avez faites. Les déperditions de base sont à la station T5 : la ligne avant la surpuissance de relance. La puissance frigorifique de la machine est à la station T8. La température de base et la température intérieure sont au CCTP, page 3, et à la station E1. La température de l’eau au départ vient du régime des émetteurs, à la station H1. Les machines sont fictives : leurs catalogues sont des données de l’exercice, écrits pour la station. Sur un vrai projet, ces chiffres se lisent dans la documentation du fabricant, à la température d’eau du projet. Le bureau d’études fixe aussi trois données de l’exercice : la température de non-chauffage, la règle de choix entre deux machines et l’arrondi de l’appoint.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Déperditions de base, sans la relance ; coefficient H", "Station T5"],
        ["Puissance frigorifique de la machine", "Station T8"],
        ["Température de base, température intérieure", "CCTP page 3, station E1"],
        ["Température de l’eau au départ", "Station H1 (régime des émetteurs)"],
        ["Catalogue des machines : puissance, COP, froid, EER", "La commande, données de l’exercice"],
        ["Température de non-chauffage, règle de choix, arrondi de l’appoint", "La commande, données de l’exercice"]
      ], "Les données du choix de la machine")
    }),

    BE.ecran({
      id: "trois-familles", dossier: "methode", kicker: "La méthode, 1", title: "Trois familles de machines", level: "comprendre",
      text: "Trois familles de machines produisent la chaleur ou le froid d’un bâtiment. La pompe à chaleur air/eau prend la chaleur de l’air du dehors et chauffe de l’eau ; cette eau va aux radiateurs ou au plancher chauffant. Réversible, elle refroidit aussi l’eau l’été, pour un plancher rafraîchissant ou des ventilo-convecteurs ; des radiateurs, eux, ne rafraîchissent pas. Le groupe d’eau glacée produit de l’eau froide pour des ventilo-convecteurs ou les batteries d’une centrale de traitement d’air ; froid seul, il laisse le chauffage à une autre machine. Un groupe réversible, qui chauffe aussi, est une pompe à chaleur air/eau. La détente directe, split ou DRV, porte le fluide frigorigène jusqu’à une unité intérieure dans chaque local, qui chauffe ou refroidit l’air ; elle ne produit pas d’eau. Les stations CartoClim « La PAC air/eau », « Groupe d’eau glacée et ventilo-convecteurs » et « Le DRV » montrent chaque famille.",
      prompt: "Suivez ce qui passe le mur dans chaque famille, puis continuez.",
      render: () => BE.schema("illustrations/schema-trois-familles.svg", "Schéma de principe en trois rangées, dehors à gauche d’un mur en tirets, le bâtiment à droite. Rangée 1, pompe à chaleur air/eau : une unité extérieure, deux liaisons de fluide frigorigène jusqu’à un module intérieur, puis un départ d’eau rouge et un retour bleu jusqu’à un radiateur. Rangée 2, groupe d’eau glacée : le groupe dehors, deux tubes d’eau froide jusqu’à un ventilo-convecteur ; le chauffage vient d’ailleurs. Rangée 3, détente directe : une unité extérieure, deux liaisons de fluide jusqu’à une unité murale dans le local, sans eau.", "Ce qui entre dans le bâtiment : de l’eau chaude, de l’eau froide ou le fluide frigorigène.")
    }),

    BE.ecran({
      id: "choisir-la-famille", dossier: "methode", kicker: "La méthode, 2", title: "Choisir la famille par les critères", level: "comprendre",
      text: `Le choix part des émetteurs, du bilan d’été et de la place. Des émetteurs à eau chaude demandent une machine qui chauffe de l’eau. Un froid demandé au CCTP demande une machine qui refroidit, et des émetteurs qui rafraîchissent. La place compte aussi : une unité dehors, un module dans un local technique, ou une unité dans chaque local. Le tableau croise ces critères pour le bâtiment d’exemple : émetteurs à eau, départ à ${EX.eau} °C (station H1), aucune climatisation demandée par le maître d’ouvrage (donnée de l’exercice), un local technique. La pompe à chaleur air/eau est la seule famille qui répond à chaque ligne. Lisez le tableau ligne par ligne, puis colonne par colonne.`,
      prompt: "Lisez le tableau ligne par ligne, puis continuez.",
      render: () => tableCriteres()
        + BE.alerte("<strong>Piège.</strong> Le bilan d’été le plus fort ne décide pas seul : si le CCTP ne demande pas de froid, la machine se choisit sur l’hiver, et le bilan d’été sert de vérification.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, la famille", title: "À l’écran : des bureaux sans réseau d’eau", level: "appliquer", requiresAction: true,
      text: {
        1: "Un petit immeuble de bureaux d’exemple n’a aucun réseau d’eau de chauffage. Le maître d’ouvrage veut chauffer l’hiver et rafraîchir l’été chaque bureau, avec un réglage bureau par bureau. Choisissez la famille. Le tableau des critères reste votre modèle.",
        2: "Un petit immeuble de bureaux d’exemple n’a aucun réseau d’eau de chauffage. Le maître d’ouvrage veut chauffer l’hiver et rafraîchir l’été chaque bureau, avec un réglage bureau par bureau. Choisissez la famille."
      },
      prompt: { 1: "Choisissez la famille, en vous aidant du tableau des critères.", 2: "Choisissez la famille. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est aux écrans « Trois familles de machines » et « Choisir la famille par les critères ».", "Reprenez les lignes du tableau : chauffer, rafraîchir, ce qui entre dans les locaux.", "Sans réseau d’eau, il faut une famille qui n’apporte pas d’eau dans les bureaux."],
        2: ["La méthode est à l’écran « Choisir la famille par les critères ».", "Le chaud et le froid sont demandés dans chaque bureau.", "Regardez ce que chaque famille fait entrer dans les locaux."]
      },
      ...BE.parNiveau({ 1: avecBloc(tableCriteres(), EX.ex1.quiz), 2: avecBloc("", EX.ex1.quiz) })
    }),

    BE.ecran({
      id: "puissance-catalogue", dossier: "methode", kicker: "La méthode, 3", title: "La puissance change avec le dehors", level: "comprendre",
      text: `Une pompe à chaleur air/eau prend sa chaleur dans l’air du dehors. Plus il fait froid dehors, moins elle en trouve : sa puissance baisse. Plus l’eau demandée est chaude, plus la puissance et le rendement baissent aussi (station CartoClim « La PAC air/eau »). Le catalogue donne donc une puissance pour chaque température du dehors, à une température d’eau donnée. La puissance de tête de catalogue est celle de +7 °C dehors. Le COP, chaleur donnée ÷ électricité consommée, se donne aux mêmes conditions. Par temps froid et humide, l’échangeur du dehors se couvre de givre : la machine inverse son cycle quelques minutes pour le fondre, et prend cette chaleur sur l’eau (même station). Les puissances du catalogue de l’exercice sont des moyennes, dégivrages compris : la courbe s’aplatit entre −2 et +2 °C. Lisez la ligne du catalogue à la température d’eau du projet : ${EX.eau} °C pour le bâtiment d’exemple, le départ de ses émetteurs (station H1).`,
      prompt: "Suivez la courbe, lisez le catalogue et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/courbe-machine.svg", `Graphique : en abscisse la température extérieure, de −15 à +17 °C ; en ordonnée la puissance de chauffage, de 0 à 4500 W. La courbe de la ${M.nom} de l’exercice, eau à ${EX.eau} °C, relie les points du catalogue : ${EX.T.map((t, i) => `${M.P[i]} W à ${t} °C`).join(", ")}. Une bande claire entre −2 et +2 °C marque le palier du dégivrage.`, "La puissance monte avec la température du dehors ; elle s’aplatit là où la machine dégivre.")
        + catalogue([M], `Catalogue de l’exercice, eau à ${EX.eau} °C, dégivrages compris ; COP ${M.cop} à +7 °C`) + exempleCatalogue()
    }),

    BE.ecran({
      id: "corriger-au-site", dossier: "methode", kicker: "La méthode, 4", title: "Corriger la puissance au site", level: "comprendre",
      text: "La température de base d’un site tombe rarement sur une ligne du catalogue. Entre les deux lignes qui l’encadrent, la puissance se corrige par une règle de trois : P = P de la ligne froide + (P de la ligne chaude − P de la ligne froide) × (θb − θ de la ligne froide) ÷ (θ de la ligne chaude − θ de la ligne froide). La courbe est prise droite entre deux lignes du catalogue, comme sur le schéma. Le résultat est la puissance corrigée aux conditions du site : c’est elle qui se compare au besoin du bâtiment.",
      prompt: "Suivez le point entre les deux lignes, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-interpolation.svg", `Graphique agrandi entre −8 et −1 °C. La droite de la ${M.nom} relie ${S.Pbas} W à ${S.bas} °C et ${S.Phaut} W à ${S.haut} °C. Un trait vertical en pointillés à ${S.t} °C coupe cette droite en un point orange : ${S.P} W.`, "Entre deux lignes du catalogue, la puissance se lit sur la droite qui les joint.") + exempleSite()
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, la correction", title: "À l’écran : corriger une puissance", level: "appliquer", requiresAction: true,
      text: {
        1: `Le catalogue d’une machine d’exemple donne ${EX.ex2.Pbas} W à ${EX.ex2.bas} °C et ${EX.ex2.Phaut} W à ${EX.ex2.haut} °C, à la température d’eau du projet. La température de base du site est ${EX.ex2.t} °C. Corrigez la puissance. L’exemple résolu reste sous vos yeux.`,
        2: `Le catalogue d’une machine d’exemple donne ${EX.ex2.Pbas} W à ${EX.ex2.bas} °C et ${EX.ex2.Phaut} W à ${EX.ex2.haut} °C, à la température d’eau du projet. La température de base du site est ${EX.ex2.t} °C. Corrigez la puissance, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la puissance corrigée, en vous aidant de l’exemple.", 2: "Choisissez la puissance corrigée. Cette question est à faire seul." },
      aides: {
        1: ["Les deux lignes du catalogue et la température de base sont dans l’énoncé. La méthode est à l’écran « Corriger la puissance au site ».", `Comptez les degrés entre ${EX.ex2.bas} °C et ${EX.ex2.t} °C, puis l’écart entre les deux lignes.`, `Dans l’exemple : ${S.Pbas} + (${S.Phaut} − ${S.Pbas}) × ${S.ecart} ÷ ${S.pas} = ${S.P} W. Faites de même.`],
        2: ["La méthode est à l’écran « Corriger la puissance au site ».", "La puissance corrigée est entre les deux lignes du catalogue.", "Partez toujours de la ligne la plus froide et comptez les degrés vers le site."]
      },
      ...BE.parNiveau({ 1: avecBloc(exempleSite(), EX.ex2.quiz), 2: avecBloc("", EX.ex2.quiz) })
    }),

    BE.ecran({
      id: "droite-des-besoins", dossier: "methode", kicker: "La méthode, 5", title: "La droite des besoins", level: "comprendre",
      text: `À la température de base, le bâtiment demande ses déperditions de base : H × (θi − θb), la ligne de la station T5 avant la relance. Pour l’exercice, la machine tourne sans abaissement de nuit : la relance n’est pas comptée. Quand il fait plus doux, le besoin baisse. À la température de non-chauffage θnc, les apports des occupants et du soleil suffisent : le besoin de chauffage devient nul. Pour le bâtiment d’exemple, θnc = ${EX.tnc} °C (donnée de l’exercice ; sur un vrai projet, elle vient de l’étude thermique). Entre ces deux points, le besoin suit une droite. Sa pente, en W par degré, vaut le besoin de base divisé par l’écart θnc − θb.`,
      prompt: "Repérez les deux points de la droite, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/droite-besoins.svg", `Graphique : en abscisse la température extérieure, en ordonnée la puissance. Une droite en tirets part de ${EX.phi} W à ${EX.tb} °C, point marqué, et descend jusqu’à 0 W à ${EX.tnc} °C, point marqué ; au-delà, le besoin reste nul. Un trait vertical en pointillés marque la température de base, ${EX.tb} °C.`, "Deux points suffisent : le besoin de base à θb, zéro à θnc.") + exempleDroite()
    }),

    BE.ecran({
      id: "point-de-bivalence", dossier: "methode", kicker: "La méthode, 6", title: "Le point de bivalence", level: "comprendre",
      text: "Tracez sur le même graphique la courbe de la machine et la droite des besoins. À gauche du croisement, il fait plus froid : la droite passe au-dessus de la courbe, la machine ne suffit pas seule. À droite, la machine donne plus que le besoin : elle réduit sa vitesse ou s’arrête par moments. Le croisement est le point de bivalence. Lisez-le à la règle : la température sur l’axe du bas, au demi-degré, et la puissance sur l’axe de gauche. Si la machine donne déjà plus que le besoin à la température de base, prolongez la droite à gauche de θb : le croisement tombe plus froid que la base. Une lecture de graphique se donne à ± 0,5 °C sur la température, à ± 5 % sur une puissance.",
      prompt: "Repérez le croisement sur le graphique, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/bivalence-exemple.svg", `Graphique : la courbe de la ${M.nom} monte de gauche à droite ; la droite des besoins du bâtiment d’exemple descend de ${EX.phi} W à ${EX.tb} °C jusqu’à 0 W à ${EX.tnc} °C. Elles se croisent en un point orange, vers ${E.biv} °C et ${E.bivP} W ; un trait en pointillés descend de ce point jusqu’à l’axe des températures.`, "Le point de bivalence : là où la machine rattrape le besoin.") + exempleBiv()
    }),

    BE.ecran({
      id: "appoint", dossier: "methode", kicker: "La méthode, 7", title: "L’appoint", level: "comprendre",
      text: `Sous le point de bivalence, la machine ne suffit pas : un appoint fournit le reste. Ici, c’est une résistance électrique dans le module hydraulique, prévue pour les grands froids (station CartoClim « La PAC air/eau ») ; sur un remplacement, une chaudière gardée peut prendre le relais. L’appoint se dimensionne à la température de base, là où l’écart est le plus grand : appoint = besoin de base − puissance corrigée de la machine à θb. Si la machine donne plus que le besoin à θb, l’appoint vaut 0 W, jamais un nombre négatif. Une résistance donne 1 kW de chaleur par kW d’électricité ; la ${M.nom} en donne ${M.cop} à +7 °C. Plus le point de bivalence est bas, moins l’appoint tourne dans l’année : la station R4 le chiffrera. Le bureau d’études arrondit l’appoint à installer au kW au-dessus (donnée de l’exercice).`,
      prompt: "Repérez l’appoint en orange sur le graphique, lisez l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/appoint-exemple.svg", `Même graphique. À ${EX.tb} °C, un trait orange vertical relie la courbe de la machine, ${E.pb} W, à la droite des besoins, ${EX.phi} W : c’est l’appoint, ${E.app} W. Une zone orange claire, entre la droite et la courbe, va de ${EX.tb} °C jusqu’au point de bivalence, vers ${E.biv} °C : la zone où la machine ne suffit pas seule.`, "L’appoint est l’écart entre le besoin et la machine, à la température de base.") + exempleApp()
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, bivalence et appoint", title: "À l’écran : un autre bâtiment", level: "appliquer", requiresAction: true,
      text: {
        1: `Un autre bâtiment d’exemple demande ${EX.ex3.phi} W à sa température de base, ${EX.ex3.tb} °C, et rien à ${EX.ex3.tnc} °C. Sa machine est la ${EX.ex3.nom} de l’exercice : son catalogue est sous l’énoncé, la courbe et la droite sont tracées. Lisez le point de bivalence, puis calculez l’appoint. Les exemples résolus restent votre modèle.`,
        2: `Un autre bâtiment d’exemple demande ${EX.ex3.phi} W à sa température de base, ${EX.ex3.tb} °C, et rien à ${EX.ex3.tnc} °C. Sa machine est la ${EX.ex3.nom} de l’exercice : son catalogue est sous l’énoncé, la courbe et la droite sont tracées. Lisez le point de bivalence, puis calculez l’appoint.`
      },
      prompt: { 1: "Choisissez la ligne juste, en vous aidant des exemples.", 2: "Choisissez la ligne juste. Cette question est à faire seul." },
      aides: {
        1: ["Le graphique et le catalogue sont sous l’énoncé. Les méthodes sont aux écrans « Corriger la puissance au site », « Le point de bivalence » et « L’appoint ».", `${EX.ex3.tb} °C n’est pas une ligne du catalogue : la puissance à la base se corrige entre les lignes ${EX.T[1]} et ${EX.T[2]} °C.`, `Le point de bivalence se lit au croisement, pas à la température de base. Dans l’exemple : ${EX.phi} − ${E.pb} = ${E.app} W.`],
        2: ["Les méthodes sont aux écrans « Le point de bivalence » et « L’appoint ».", "L’appoint se calcule avec la puissance corrigée à la température de base.", "La courbe a un coude vers +2 °C : ce n’est pas le croisement."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.schema("illustrations/exercice-3.svg", `Graphique : la courbe de la ${EX.ex3.nom} et la droite des besoins d’un autre bâtiment, de ${EX.ex3.phi} W à ${EX.ex3.tb} °C jusqu’à 0 W à ${EX.ex3.tnc} °C. Un trait en pointillés marque ${EX.ex3.tb} °C. Aucune lecture n’est portée.`, "Lisez le croisement, puis calculez l’appoint.") + catalogue([EX.ex3], "Catalogue de l’exercice, eau à 45 °C") + exempleApp(), EX.ex3.quiz),
        2: avecBloc(BE.schema("illustrations/exercice-3.svg", `Graphique : la courbe de la ${EX.ex3.nom} et la droite des besoins d’un autre bâtiment, de ${EX.ex3.phi} W à ${EX.ex3.tb} °C jusqu’à 0 W à ${EX.ex3.tnc} °C. Un trait en pointillés marque ${EX.ex3.tb} °C. Aucune lecture n’est portée.`, "Lisez le croisement, puis calculez l’appoint.") + catalogue([EX.ex3], "Catalogue de l’exercice, eau à 45 °C"), EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "bilan-d-ete", dossier: "methode", kicker: "La méthode, 8", title: "Vérifier l’été avec la même machine", level: "comprendre",
      text: `La station T8 a donné la puissance frigorifique du bâtiment. Une pompe à chaleur air/eau réversible peut produire de l’eau froide : le catalogue de l’exercice donne sa puissance frigorifique à 35 °C dehors avec une eau à 7 °C, et son EER, froid donné ÷ électricité consommée. Comparez cette puissance à celle de la station T8, en pour cent. Le besoin de la station T8 est calculé à la température d’été du site, plus douce que 35 °C : la comparaison est prudente. Pour le bâtiment d’exemple, la ${M.nom} donne ${M.froid} W de froid pour ${EX.ete.tot} W demandés : ${M.froid} ÷ ${EX.ete.tot} × 100 = ${EX.ete.couv} %. Elle ne tiendrait pas l’été. Le maître d’ouvrage ne demande pas de climatisation, et ses émetteurs à eau chaude ne rafraîchissent pas : la machine se choisit sur l’hiver. Une machine choisie sur l’été serait bien plus grosse que le besoin d’hiver : elle tournerait par cycles courts, mauvais pour le compresseur (station CartoClim « La PAC air/eau »). Si le froid était demandé un jour, il faudrait d’autres émetteurs et une autre machine : c’est le sujet de la station F1.`,
      prompt: "Comparez les colonnes d’hiver et d’été, puis continuez.",
      render: () => BE.schema("illustrations/schema-ete-hiver.svg", `Schéma en colonnes, bâtiment d’exemple. Hiver, à ${EX.tb} °C : besoin ${EX.phi} W, machine ${E.pb} W, soit ${E.couv} %. Été, à 35 °C : besoin ${EX.ete.tot} W (station T8), machine ${M.froid} W de froid, soit ${EX.ete.couv} %.`, "La même machine, comparée aux deux bilans.")
        + tableau(["Saison", "Besoin (W)", "Machine (W)", "Part couverte"], [[`Hiver, à ${EX.tb} °C`, EX.phi, E.pb, `${E.couv} %`], ["Été, à 35 °C", EX.ete.tot, M.froid, `${EX.ete.couv} %`]], `${M.nom} et bâtiment d’exemple ; EER ${M.eer} à 35 °C`)
    }),

    BE.ecran({
      id: "machine-au-garage", dossier: "methode", kicker: "La méthode, 9", title: "Où se pose la machine", level: "comprendre",
      text: "Le CCTP de la maison place la pompe à chaleur au garage (page 4). Une pompe à chaleur air/eau prend sa chaleur dans l’air du dehors : son unité extérieure reste dehors. Le bureau d’études retient une machine en deux parties, un bibloc (donnée de l’exercice) : l’unité extérieure sur plots, dehors, contre le mur ouest du garage ; le module hydraulique au garage, contre le mur M03 qui sépare le garage de la maison, avec l’appoint électrique. Les liaisons frigorifiques traversent le mur ouest. Le départ et le retour d’eau traversent le mur M03 vers le collecteur du rez-de-chaussée, sous l’escalier (station H3). L’unité extérieure rejette l’eau du dégivrage : son évacuation se prévoit. Le garage reçoit aussi le chauffe-eau thermodynamique de la station H6. Ce plan sert au niveau 2 : la place au garage est un des critères du choix de la famille.",
      prompt: "Suivez les numéros du plan, puis continuez.",
      render: () => BE.schema("illustrations/garage-machine.svg", "Plan du garage de la maison, sans échelle. À gauche, dehors côté ouest, l’unité extérieure sur plots, numéro 1, avec sous elle l’évacuation de l’eau de dégivrage, numéro 6. Deux liaisons frigorifiques, numéro 2, traversent le mur ouest jusqu’au module hydraulique posé contre le mur M03, numéro 3. Du module, un départ d’eau rouge et un retour bleu, numéro 4, traversent le mur M03 vers le collecteur de la maison. Au sud du garage, le chauffe-eau thermodynamique, numéro 5. La porte de garage PG1 est au nord.", "La machine de la maison : dehors, au garage, puis vers les radiateurs.")
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 10", title: "La justification écrite", level: "comprendre",
      text: "La note dit la famille et ses critères, les besoins et leur source, la machine et sa puissance corrigée, le point de bivalence, l’appoint, la vérification d’été et la raison du choix. Un autre technicien doit pouvoir refaire le calcul et comprendre pourquoi cette machine a été retenue plutôt qu’une autre. Voici la note du bâtiment d’exemple. Sur les feuilles, la note est abrégée. « Hypothèses » reprend les données de l’exercice, comme θnc, le besoin sans relance et la température d’eau. « Sources » dit d’où vient chaque donnée, comme les parenthèses des lignes Besoins et Machine. « Données » regroupe les lignes Besoins et Machine. « Résultats » regroupe la puissance de la machine, le point de bivalence, l’appoint et l’été.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Choix de la machine de chauffage, petit bâtiment de bureaux de plain-pied"],
        ["Famille", `Pompe à chaleur air/eau : émetteurs à eau à ${EX.eau} °C (station H1), aucune climatisation demandée, local technique disponible`],
        ["Besoins", `${EX.phi} W à ${EX.tb} °C (station T5, sans relance), nuls à ${EX.tnc} °C (donnée de l’exercice) ; été ${EX.ete.tot} W (station T8)`],
        ["Machine", `${M.nom} de l’exercice, eau à ${EX.eau} °C : ${M.p7} W et COP ${M.cop} à +7 °C ; ${E.pb} W à ${EX.tb} °C`],
        ["Bivalence et appoint", `Point de bivalence vers ${E.biv} °C ; appoint ${E.app} W à ${EX.tb} °C, ${E.appKW} kW installé ; la machine couvre ${E.couv} % du besoin de base`],
        ["Été", `${M.froid} W de froid à 35 °C, ${EX.ete.couv} % du besoin : sans objet, pas de climatisation demandée`],
        ["Choix", "La machine tient l’hiver avec un petit appoint, sans être surdimensionnée"]
      ], "Note de calcul, bâtiment d’exemple")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

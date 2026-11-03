/* Station BE-H1 : Puissance et débit.
   Méthode sur le petit bâtiment de bureaux de la station T5 (bureau, salle de réunion, sanitaires), puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/h1-puissance-debit-regime/construire.mjs : le premier vient de exemple-data.mjs, les secondes de
   corriges/h1-puissance-debit-regime/reference-debits.json (outils/h1-debits-maison.mjs, tolérance 3 %).
   La maison n'apparaît que par les données de la commande (Φ du local repris de T5, régime, relance) et les bornes des fourchettes. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "reg": {
  "dep": "50",
  "ret": "40",
  "dT": "10",
  "div": "11,6"
 },
 "coef": "1,16",
 "cp": "4 190",
 "rho10": "1 000",
 "rho40": "990",
 "coefCalc": "1,164",
 "coef40": "1,15",
 "relPc": "15",
 "relDec": "0,15",
 "locaux": [
  {
   "nom": "Bureau",
   "phi": "1179",
   "rel": "177",
   "P": "1356",
   "q": "117"
  },
  {
   "nom": "Salle de réunion",
   "phi": "1585",
   "rel": "238",
   "P": "1823",
   "q": "157"
  },
  {
   "nom": "Sanitaires",
   "phi": "233",
   "rel": "35",
   "P": "268",
   "q": "23"
  }
 ],
 "Ptot": "3447",
 "circuit": "297",
 "controle": "297",
 "m3": "0,297",
 "Pinst": "3500",
 "PkW": "3,5",
 "Pav": "3445",
 "qpac": "302",
 "rad": {
  "P": "1000",
  "q": "86",
  "m3": "0,086",
  "kgs": "0,0239",
  "ls": "0,0239"
 },
 "dtTable": [
  {
   "reg": "45/40",
   "dT": "5",
   "div": "5,8",
   "q": "172"
  },
  {
   "reg": "50/40",
   "dT": "10",
   "div": "11,6",
   "q": "86"
  },
  {
   "reg": "55/40",
   "dT": "15",
   "div": "17,4",
   "q": "57"
  },
  {
   "reg": "60/40",
   "dT": "20",
   "div": "23,2",
   "q": "43"
  }
 ],
 "ex1": {
  "P": "1400",
  "dep": "55",
  "ret": "45",
  "dT": "10",
  "div": "11,6",
  "q": "121",
  "quiz": {
   "choices": [
    "140 L/h",
    "121 L/h",
    "22 L/h",
    "16240 L/h"
   ],
   "good": 1,
   "explain": "ΔT = 55 − 45 = 10 K, puis 1400 ÷ (1,16 × 10) = 1400 ÷ 11,6 = 121 L/h. A oublie le coefficient 1,16, C prend la température de départ pour ΔT, D multiplie au lieu de diviser."
  }
 },
 "ex2": {
  "P": "900",
  "av": "45/40",
  "ap": "45/35",
  "d1": "5",
  "d2": "10",
  "q1": "155",
  "q2": "78",
  "quiz": {
   "choices": [
    "155 L/h, puis 155 L/h : le départ ne change pas",
    "155 L/h au régime 45/40, puis 78 L/h au régime 45/35",
    "155 L/h, puis 310 L/h",
    "155 L/h, puis 22 L/h"
   ],
   "good": 1,
   "explain": "ΔT passe de 5 K à 10 K. 900 ÷ 5,8 = 155 L/h, puis 900 ÷ 11,6 = 78 L/h : l’écart double, le débit est divisé par deux. A regarde la température de départ au lieu de ΔT, C multiplie par deux au lieu de diviser, D prend la température de retour, 35 °C, pour ΔT."
  }
 },
 "ex3": {
  "relPc": "15",
  "relDec": "0,15",
  "dep": "50",
  "ret": "40",
  "dT": "10",
  "div": "11,6",
  "pieces": [
   {
    "nom": "Bureau A",
    "phi": "1000",
    "rel": "150",
    "P": "1150",
    "q": "99"
   },
   {
    "nom": "Bureau B",
    "phi": "600",
    "rel": "90",
    "P": "690",
    "q": "59"
   }
  ],
  "tot": "158",
  "quiz": {
   "choices": [
    "138 L/h, soit 0,138 m³/h",
    "158 L/h, soit 0,158 m³/h",
    "158 L/h, soit 1,58 m³/h",
    "32 L/h, soit 0,032 m³/h"
   ],
   "good": 1,
   "explain": "1000 + 150 = 1150 W, 1150 ÷ 11,6 = 99 L/h ; 600 + 90 = 690 W, 690 ÷ 11,6 = 59 L/h. La branche transporte 99 + 59 = 158 L/h, soit 0,158 m³/h. A oublie la relance, C divise par 100 au lieu de 1 000, D prend la température de départ pour ΔT."
  }
 },
 "glacee": {
  "P": "3500",
  "dep": "7",
  "ret": "12",
  "dT": "5",
  "div": "5,8",
  "q": "603"
 },
 "maison": {
  "dep": "45",
  "ret": "40",
  "vdep": "45",
  "vret": "35",
  "relPc": "10",
  "PkW": "4,0",
  "pieces": [
   {
    "nom": "Séjour-cuisine",
    "niveau": "rez-de-chaussée",
    "phi": "1554"
   },
   {
    "nom": "Entrée",
    "niveau": "rez-de-chaussée",
    "phi": "401"
   },
   {
    "nom": "WC",
    "niveau": "rez-de-chaussée",
    "phi": "55"
   },
   {
    "nom": "Chambre 1",
    "niveau": "étage",
    "phi": "433"
   },
   {
    "nom": "Chambre 2",
    "niveau": "étage",
    "phi": "456"
   },
   {
    "nom": "Palier",
    "niveau": "étage",
    "phi": "265"
   },
   {
    "nom": "Chambre 3",
    "niveau": "étage",
    "phi": "226"
   },
   {
    "nom": "Salle d'eau",
    "niveau": "étage",
    "phi": "194"
   }
  ]
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exempleRegime = () => BE.exemple({ text: `Bâtiment d’exemple : régime ${EX.reg.dep}/${EX.reg.ret}`, answer: `ΔT = ${EX.reg.dep} − ${EX.reg.ret} = ${EX.reg.dT} K`, why: "On retranche la température de retour de celle de départ. Le résultat est un écart, en kelvins." });
const exempleFormule = () => BE.exemple({ text: `Radiateur de ${EX.rad.P} W, régime ${EX.reg.dep}/${EX.reg.ret}`, answer: `ΔT = ${EX.reg.dT} K ; 1,16 × ${EX.reg.dT} = ${EX.reg.div} ; qv = ${EX.rad.P} ÷ ${EX.reg.div} = ${EX.rad.q} L/h`, why: "Calculez d’abord le diviseur 1,16 × ΔT, puis divisez la puissance en watts. Le débit s’écrit au litre par heure." });
const exempleRegimes = () => BE.exemple({ text: `Radiateur de ${EX.rad.P} W, au régime ${EX.dtTable[0].reg}, puis au régime ${EX.dtTable[1].reg}`, answer: `${EX.rad.P} ÷ ${EX.dtTable[0].div} = ${EX.dtTable[0].q} L/h ; ${EX.rad.P} ÷ ${EX.dtTable[1].div} = ${EX.dtTable[1].q} L/h`, why: `ΔT passe de ${EX.dtTable[0].dT} K à ${EX.dtTable[1].dT} K : le débit est divisé par deux.` });
const exempleBureau = () => BE.exemple({ text: `${EX.locaux[0].nom} du bâtiment d’exemple : Φ du local ${EX.locaux[0].phi} W, relance ${EX.relPc} %, régime ${EX.reg.dep}/${EX.reg.ret}`, answer: `relance ${EX.relDec} × ${EX.locaux[0].phi} = ${EX.locaux[0].rel} W ; ${EX.locaux[0].phi} + ${EX.locaux[0].rel} = ${EX.locaux[0].P} W ; ${EX.locaux[0].P} ÷ ${EX.reg.div} = ${EX.locaux[0].q} L/h`, why: "La relance s’ajoute au Φ du local avant de diviser. Le débit d’une branche est la somme des débits de ses pièces ; 1 m³/h = 1 000 L/h." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Le Φ du local de chaque pièce est imprimé en gras sur la feuille et rappelé dans le tableau sous la commande. Le régime et la relance sont dans la commande, la puissance à installer dans le même tableau.",
      "Dans l’ordre : ΔT et diviseur (écrans « Le régime d’eau » et « La puissance que l’eau transporte ») ; relance et puissance de l’émetteur (écran « La puissance de chaque émetteur ») ; débit de chaque pièce, puis du circuit (écran « Du besoin de chaque pièce au débit du circuit ») ; pompe à chaleur (écran « Le débit de la pompe à chaleur »).",
      `La ligne grisée de la feuille montre le geste sur le bureau d’exemple : ${EX.locaux[0].phi} + ${EX.locaux[0].rel} = ${EX.locaux[0].P} W, puis ${EX.locaux[0].P} ÷ ${EX.reg.div} = ${EX.locaux[0].q} L/h. Pour la maison, le régime est ${EX.maison.dep}/${EX.maison.ret} : calculez d’abord son diviseur.`
    ],
    2: [
      "Le Φ du local de chaque pièce et la puissance à installer viennent de la station T5 (tableau sous la commande). Le niveau de chaque pièce, pour les branches, se lit dans le même tableau. Cp et la masse volumique de l’eau sont à l’écran « Écrire le débit dans la bonne unité ».",
      "Faites le tableau des huit pièces aux deux régimes, puis les deux branches et le circuit (somme des débits). Le débit massique se calcule avec la formule de base de l’écran « Écrire le débit dans la bonne unité ». Ce que change la variante est à l’écran « Le régime change le débit ».",
      `Commencez par les deux diviseurs : 1,16 × ΔT pour ${EX.maison.dep}/${EX.maison.ret}, puis pour ${EX.maison.vdep}/${EX.maison.vret}. Chaque débit de la variante vaut alors la moitié du débit du projet, aux arrondis près : vérifiez-le ligne par ligne.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const donneesT5 = () => tableau(["Pièce", "Niveau", "Φ du local (W)"], [
  ...EX.maison.pieces.map(p => [p.nom, p.niveau, p.phi]),
  ["Puissance à installer de la maison", "", `${EX.maison.PkW} kW`]
], "Données reprises de la station T5, tableau local par local")
  + BE.schema("illustrations/schema-circuit-maison.svg", `Schéma de principe du circuit de la maison, à compléter. En bas à gauche, la pompe à chaleur air/eau du garage et la pompe de circulation sur le départ, en rouge, à ${EX.maison.dep} °C ; le retour, en bleu, à ${EX.maison.ret} °C. En haut, la branche de l’étage : chambres 1, 2 et 3, salle d’eau, palier. Au-dessous, la branche du rez-de-chaussée : séjour-cuisine, entrée, WC. Sous chaque radiateur, pour chaque branche et pour le circuit, un débit à calculer en L/h.`, "Le circuit de la maison : les débits se calculent sur la feuille.")
  + BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Générateur et émetteurs à la page 4 ; le régime d’eau n’y est pas" }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + donneesT5(); };

BE.station({
  code: "BE-H1",
  titre: "Puissance et débit",
  ligne: "Hydraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison, pièce par pièce, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, branches, variante de régime, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Le bilan d’hiver donne la puissance de chaque pièce. L’eau du chauffage la transporte de la pompe à chaleur aux émetteurs. Vous calculez le débit d’eau de chaque pièce, du circuit et du générateur, selon le régime de température de l’eau. Vous apprenez la méthode sur le petit bâtiment de bureaux de la station T5, puis vous la faites sur la maison.",
  note: "Les régimes d’eau, la relance et les valeurs du bâtiment d’exemple sont des valeurs d’exercice. La capacité thermique et la masse volumique de l’eau viennent des règles Th-Bât 2017, fascicule Matériaux.",

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
      objet: "Débit d’eau de chaque pièce, du circuit et de la pompe à chaleur de la maison de deux niveaux",
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage veut connaître les débits d’eau du chauffage de la maison des stations T1 à T5, pour choisir les émetteurs et le réseau. Données de l’exercice fixées par le bureau d’études : régime ${EX.maison.dep}/${EX.maison.ret} (le CCTP, page 4, ne donne pas de régime) ; relance de chaque pièce, ${EX.maison.relPc} % de son Φ du local, comme à la station T5. Suivez les étapes dans l’ordre.`,
        "Étape 1. Au recto de la feuille, écrivez le régime, ΔT de l’eau et le diviseur 1,16 × ΔT, avec l’endroit où vous les avez lus.",
        "Étape 2. Le Φ du local de chaque pièce est imprimé sur la feuille (tableau ci-dessous). Calculez la relance de la pièce, la puissance de son émetteur, puis son débit d’eau.",
        "Étape 3. Au verso, additionnez les débits des pièces : c’est le débit du circuit. Contrôlez-le, écrivez-le en m³/h, puis calculez le débit de la pompe à chaleur avec la puissance à installer. Écrivez les trois lignes de la note de calcul, puis vérifiez le débit du séjour-cuisine et celui du circuit à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Φ du local de chaque pièce, puissance à installer", ou: "Station T5 : les Φ dans le tableau ci-dessous et sur la feuille, la puissance à installer dans le tableau ci-dessous" },
        { piece: "Régime et relance", ou: "Cette commande, données de l’exercice" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : pompe à chaleur air/eau et radiateurs basse température" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Débits d’eau de la maison de deux niveaux : pièces, branches, circuit, pompe à chaleur, variante de régime et note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le maître d’ouvrage veut connaître les débits d’eau du chauffage de la maison des stations T1 à T5, et ce que changerait un autre régime. Données de l’exercice fixées par le bureau d’études : régime du projet ${EX.maison.dep}/${EX.maison.ret}, variante à étudier ${EX.maison.vdep}/${EX.maison.vret} ; relance de chaque pièce, ${EX.maison.relPc} % de son Φ du local (station T5) ; une branche par niveau, depuis la pompe à chaleur du garage. Calculez le débit de chaque pièce et de chaque branche aux deux régimes, le débit du circuit en L/h, en m³/h et en kg/s, le débit de la pompe à chaleur, puis rédigez la première page de la note de calcul, avec ce que la variante change pour le réseau et pour les émetteurs. Citez la source de chaque donnée.`,
      pieces: [
        { piece: "Φ du local de chaque pièce, niveau, puissance à installer", ou: "Station T5, rappelés dans le tableau ci-dessous" },
        { piece: "Régimes, relance, branches", ou: "Cette commande, données de l’exercice" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : pompe à chaleur air/eau dans le garage, radiateurs basse température" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "h1-n1-sejour", libelle: "Débit d’eau du séjour-cuisine", unite: "L/h", min: 286, max: 304, indice: "Relisez l’écran « La puissance de chaque émetteur » (Φ du local plus sa relance), puis l’écran « La puissance que l’eau transporte » : le débit est la puissance divisée par 1,16 × ΔT, avec ΔT = départ moins retour, pris dans le régime de la commande." },
      { id: "h1-n1-circuit", libelle: "Débit d’eau du circuit", unite: "L/h", min: 660, max: 702, indice: "Relisez l’écran « Du besoin de chaque pièce au débit du circuit » : le circuit transporte la somme des débits des huit pièces, relance comprise. Contrôlez avec la somme des puissances divisée par 1,16 × ΔT." }
    ],
    2: [
      { id: "h1-n2-pac", libelle: "Débit d’eau de la pompe à chaleur, régime du projet", unite: "L/h", min: 669, max: 711, indice: "Relisez l’écran « Le débit de la pompe à chaleur » : la puissance à installer de la station T5, en W, divisée par 1,16 × ΔT du régime du projet." },
      { id: "h1-n2-variante", libelle: "Débit d’eau du circuit au régime de la variante", unite: "L/h", min: 327, max: 349, indice: "Relisez l’écran « Le régime change le débit » : avec le régime de la variante, ΔT change, et le débit de chaque pièce avec lui. Additionnez les débits des huit pièces." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-H2", titre: "Les émetteurs", href: "../h2-emetteurs/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-T5, Le bilan d’hiver", href: "../t5-bilan-hiver/index.html", pourquoi: "Le Φ du local de chaque pièce, la relance et la puissance à installer viennent de cette station." },
    { reseau: "HydroMétro", titre: "Puissance", href: "../../../hydrometro/stations/puissance/index.html", pourquoi: "La même formule, avec le débit en m³/h et la puissance en kW, appliquée aux relevés d’une installation." },
    { reseau: "HydroMétro", titre: "Écart ΔT", href: "../../../hydrometro/stations/delta-t/index.html", pourquoi: "Lire le départ et le retour d’un émetteur sur une installation en marche." },
    { reseau: "HydroMétro", titre: "Débit", href: "../../../hydrometro/stations/debit/index.html", pourquoi: "Mesurer le débit d’eau d’un circuit." },
    { reseau: "HydroMétro", titre: "Énergie", href: "../../../hydrometro/stations/energie/index.html", pourquoi: "L’énergie que l’eau emporte et rend." },
    { reseau: "RézoTools", titre: "Débit d’eau, puissance et ΔT", href: "../../../rezotools/calculettes/water-flow.html", pourquoi: "Vérifier un calcul posé sur la feuille : la calculette donne le troisième terme quand on lui en donne deux." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : trouver le débit d’eau que le chauffage de la maison doit faire circuler. Chaque pièce perd une puissance, calculée au bilan d’hiver (station T5). L’eau chaude part de la pompe à chaleur, cède cette puissance dans l’émetteur de la pièce et revient plus froide. Le débit dépend de la puissance et de l’écart de température entre le départ et le retour de l’eau, fixé par le régime d’eau. Le tableau se remplit de haut en bas. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Ligne du tableau", "Unité"], [
        ["Φ du local de chaque pièce (station T5)", "W"],
        ["Relance de la pièce", "W"],
        ["Puissance de l’émetteur", "W"],
        ["Débit d’eau de la pièce", "L/h"],
        ["Débit du circuit", "L/h, puis m³/h"],
        ["Débit de la pompe à chaleur", "L/h"]
      ], "Le tableau des débits, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "les débits d’eau du chauffage de la maison."], ["Le dossier :", "le Φ de chaque pièce et la puissance de T5, le CCTP, le régime d’eau de la commande."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "puissance de chaque émetteur, débit de chaque pièce."], ["Le résultat :", "le débit du circuit et celui de la pompe à chaleur, la note de calcul. Fourchette de ± 3 % à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station H2, les émetteurs."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les puissances viennent du bilan d’hiver, station T5 : le Φ du local de chaque pièce, dans le tableau local par local, la relance et la puissance à installer. Le CCTP, page 4, donne le générateur, une pompe à chaleur air/eau dans le garage, et les émetteurs, des radiateurs basse température dans toutes les pièces chauffées. Il ne donne pas le régime d’eau : la commande le fixe, comme donnée de l’exercice. La capacité thermique et la masse volumique de l’eau viennent des règles Th-Bât, fascicule Matériaux.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Φ du local de chaque pièce", "Station T5, tableau local par local, rappelé dans la commande"],
        ["Relance, puissance à installer", "Station T5"],
        ["Générateur et émetteurs", "Page 4 du CCTP"],
        ["Régime d’eau", "La commande de cette station, donnée de l’exercice"],
        ["Capacité thermique et masse volumique de l’eau", "Règles Th-Bât 2017, fascicule Matériaux, § 2.9.8, p. 29"]
      ], "Les données des débits")
        + BE.renvoi('Le tableau local par local se fait à <a href="../t5-bilan-hiver/index.html">la station T5</a>.')
    }),

    BE.ecran({
      id: "regime", dossier: "methode", kicker: "La méthode, 1", title: "Le régime d’eau", level: "comprendre",
      text: `Le régime d’eau s’écrit avec deux températures. La température de départ est celle de l’eau qui quitte le générateur vers les émetteurs ; la température de retour, celle de l’eau qui revient au générateur. Un régime ${EX.reg.dep}/${EX.reg.ret} veut dire ${EX.reg.dep} °C au départ et ${EX.reg.ret} °C au retour. L’écart entre les deux, ΔT de l’eau, se compte en kelvins (K) : un écart de 1 °C vaut 1 K. Il dit de combien l’eau se refroidit en traversant les émetteurs. Le régime se lit au CCTP du projet ; quand le CCTP ne le donne pas, le bureau d’études le choisit et l’écrit comme hypothèse. Le bâtiment d’exemple de cette station fonctionne en ${EX.reg.dep}/${EX.reg.ret}, valeur d’exercice.`,
      prompt: "Lisez l’exemple résolu et le piège, puis continuez.",
      render: () => exempleRegime()
        + BE.alerte("<strong>Piège.</strong> La station T5 utilise un autre ΔT, celui de l’air : θi − θe, l’écart entre l’intérieur et l’extérieur. Pour le débit d’eau, seul compte l’écart entre le départ et le retour de l’eau.")
        + BE.schema("illustrations/schema-regime-eau.svg", `Schéma de principe d’une boucle d’eau. À gauche, le générateur. À droite, un radiateur, l’émetteur. Une flèche rouge part du générateur vers le radiateur : c’est le départ, à ${EX.reg.dep} °C. Une flèche bleue revient du radiateur vers le générateur : c’est le retour, à ${EX.reg.ret} °C. Sous le dessin : ΔT = départ − retour = ${EX.reg.dep} − ${EX.reg.ret} = ${EX.reg.dT} K, l’eau se refroidit de ${EX.reg.dT} K en traversant l’émetteur.`, "Le départ est l’eau qui quitte le générateur, le retour celle qui revient : leur écart est ΔT.")
    }),

    BE.ecran({
      id: "formule", dossier: "methode", kicker: "La méthode, 2", title: "La puissance que l’eau transporte", level: "comprendre",
      text: `Un litre d’eau qui se refroidit de 1 K cède 1,16 Wh. Un débit de qv litres par heure qui se refroidit de ΔT cède donc, chaque heure, qv × 1,16 × ΔT wattheures, soit une puissance de qv × 1,16 × ΔT watts. La formule se lit dans les deux sens : Φ = qv × 1,16 × ΔT donne la puissance d’un débit connu ; qv = Φ ÷ (1,16 × ΔT) donne le débit qu’il faut pour transporter une puissance. Le coefficient 1,16 vient de la capacité thermique massique de l’eau, ${EX.cp} J/(kg.K), et de sa masse volumique, 1 kg par litre : 1 × ${EX.cp} ÷ 3 600 = ${EX.coefCalc} Wh/(L.K), écrit 1,16. Les débits s’écrivent au litre par heure, les puissances au watt.`,
      prompt: "Lisez les formules et l’exemple résolu, puis continuez.",
      render: () => tableau(["Formule", "Unités"], [
        ["Φ = qv × 1,16 × ΔT", "W = L/h × Wh/(L.K) × K"],
        ["qv = Φ ÷ (1,16 × ΔT)", "L/h = W ÷ (Wh/(L.K) × K)"]
      ], "La puissance transportée par l’eau")
        + exempleFormule()
        + BE.schema("illustrations/schema-debit-ecart.svg", `Schéma de principe en trois cases reliées par des flèches. Première case : puissance de l’émetteur, ${EX.rad.P} W. Deuxième case : divisée par 1,16 × ΔT, avec ΔT = ${EX.reg.dep} − ${EX.reg.ret} = ${EX.reg.dT} K, soit divisée par ${EX.reg.div}. Troisième case : débit d’eau de l’émetteur, ${EX.rad.q} L/h. Sous les cases : au régime ${EX.dtTable[0].reg}, ΔT = ${EX.dtTable[0].dT} K, ${EX.rad.P} ÷ ${EX.dtTable[0].div} = ${EX.dtTable[0].q} L/h.`, "La puissance divisée par 1,16 × ΔT donne le débit.")
        + BE.renvoi(`Eau à 10 °C : masse volumique ${EX.rho10} kg/m³, capacité thermique massique ${EX.cp} J/(kg.K). Règles Th-Bât 2017, fascicule Matériaux, § 2.9.8 « Eau », p. 29.`)
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, le débit d’un émetteur", title: "Exercice : le débit d’un émetteur", level: "appliquer", requiresAction: true,
      text: {
        1: `Un radiateur doit donner ${EX.ex1.P} W. L’installation fonctionne au régime ${EX.ex1.dep}/${EX.ex1.ret}. Calculez ΔT de l’eau, puis le débit d’eau du radiateur en L/h. L’exemple résolu reste sous vos yeux : refaites le même geste.`,
        2: `Un radiateur doit donner ${EX.ex1.P} W. L’installation fonctionne au régime ${EX.ex1.dep}/${EX.ex1.ret}. Calculez le débit d’eau du radiateur en L/h, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le débit du radiateur, en vous aidant de l’exemple.", 2: "Choisissez le débit du radiateur. Cette question est à faire seul." },
      aides: {
        1: ["La puissance et le régime sont dans l’énoncé. La méthode est à l’écran « La puissance que l’eau transporte », dans l’exemple résolu.", "ΔT = départ − retour. Le diviseur vaut 1,16 × ΔT. Le débit vaut la puissance divisée par le diviseur.", `Sur l’exemple : ${EX.rad.P} ÷ (1,16 × ${EX.reg.dT}) = ${EX.rad.P} ÷ ${EX.reg.div} = ${EX.rad.q} L/h. Faites les mêmes lignes avec ${EX.ex1.P} W et ΔT = ${EX.ex1.dep} − ${EX.ex1.ret}.`],
        2: ["La formule est à l’écran « La puissance que l’eau transporte ».", "Deux lignes : ΔT de l’eau, puis le débit, qv = Φ ÷ (1,16 × ΔT).", `Commencez par ΔT = ${EX.ex1.dep} − ${EX.ex1.ret}.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleFormule(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),

    BE.ecran({
      id: "unites", dossier: "methode", kicker: "La méthode, 3", title: "Écrire le débit dans la bonne unité", level: "comprendre",
      text: `Le bureau d’études écrit le débit d’un émetteur en litres par heure (L/h). Une courbe de pompe se lit souvent en mètres cubes par heure (m³/h) : 1 m³/h = 1 000 L/h. Un calcul de physique demande le débit massique, en kilogrammes par seconde (kg/s) : on multiplie les L/h par la masse volumique, 1 kg par litre, et on divise par 3 600 secondes. La formule de base s’écrit alors Φ = qm × Cp × ΔT, avec qm en kg/s, Cp = ${EX.cp} J/(kg.K) et Φ en W. Elle donne le même débit que la formule pratique, aux arrondis près.`,
      prompt: "Lisez le tableau des unités et la note sur la masse volumique, puis continuez.",
      render: () => tableau(["Unité", "Conversion", `Radiateur de ${EX.rad.P} W, ${EX.reg.dep}/${EX.reg.ret}`], [
        ["L/h", "qv = Φ ÷ (1,16 × ΔT)", EX.rad.q],
        ["m³/h", "L/h ÷ 1 000", EX.rad.m3],
        ["L/s", "L/h ÷ 3 600", EX.rad.ls],
        ["kg/s", `qm = Φ ÷ (Cp × ΔT) = ${EX.rad.P} ÷ (${EX.cp} × ${EX.reg.dT})`, EX.rad.kgs]
      ], "Le même débit en quatre unités")
        + BE.renvoi(`À 40 °C, l’eau a une masse volumique de ${EX.rho40} kg/m³ (Th-Bât, fascicule Matériaux, § 2.9.8) : le coefficient devient 0,99 × ${EX.cp} ÷ 3 600 = ${EX.coef40}. L’écart, environ 1 %, reste sous la précision du calcul : le bureau d’études garde 1,16. La station H6 écrit 1,163 : arrondi au centième, c’est le même 1,16.`)
    }),

    BE.ecran({
      id: "regime-debit", dossier: "methode", kicker: "La méthode, 4", title: "Le régime change le débit", level: "comprendre",
      text: "À puissance égale, le débit varie à l’inverse de ΔT : un écart deux fois plus grand demande un débit deux fois plus petit. Le niveau des températures n’entre pas dans le débit : les régimes 35/30 et 45/40 ont le même ΔT, 5 K, donc le même débit. Le choix du régime a deux effets, traités aux stations suivantes. Un débit plus petit demande des tubes plus petits ou une pompe moins puissante (stations H3 et H4). Une eau moins chaude en moyenne dans l’émetteur, (départ + retour) ÷ 2, demande un émetteur plus grand pour la même puissance (station H2).",
      prompt: "Comparez les lignes du tableau, puis lisez le piège.",
      render: () => tableau(["Régime", "ΔT (K)", "Diviseur 1,16 × ΔT", `Débit pour ${EX.rad.P} W (L/h)`], EX.dtTable.map(x => [x.reg, x.dT, x.div, x.q]), "Le même radiateur à quatre régimes (valeurs d’exercice)")
        + BE.alerte("<strong>Piège.</strong> Comparer deux régimes par leur température de départ : 45/40 et 45/35 partent tous deux à 45 °C, et le second demande un débit deux fois plus petit.")
        + BE.schema("illustrations/schema-regimes-debit.svg", `Schéma de principe en quatre barres horizontales, pour un émetteur de ${EX.rad.P} W. ${EX.dtTable.map(x => `Régime ${x.reg}, ΔT ${x.dT} K : ${x.q} L/h`).join(". ")}. Plus ΔT est grand, plus la barre est courte : un ΔT deux fois plus grand donne un débit deux fois plus petit.`, "À puissance égale, plus l’écart de température est grand, plus le débit est petit.")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, le régime", title: "Exercice : changer de régime", level: "appliquer", requiresAction: true,
      text: {
        1: `Une chambre demande ${EX.ex2.P} W. Calculez son débit d’eau au régime ${EX.ex2.av}, puis au régime ${EX.ex2.ap}. L’exemple résolu reste sous vos yeux.`,
        2: `Une chambre demande ${EX.ex2.P} W. Calculez son débit d’eau au régime ${EX.ex2.av}, puis au régime ${EX.ex2.ap}, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne les deux débits, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne les deux débits. Cette question est à faire seul." },
      aides: {
        1: ["La puissance et les deux régimes sont dans l’énoncé. La méthode est à l’écran « Le régime change le débit ».", "Un ΔT par régime, départ moins retour. Puis un débit par régime : la puissance divisée par 1,16 × ΔT.", `Sur l’exemple : ${EX.rad.P} ÷ ${EX.dtTable[0].div} = ${EX.dtTable[0].q} L/h, puis ${EX.rad.P} ÷ ${EX.dtTable[1].div} = ${EX.dtTable[1].q} L/h. Faites les mêmes lignes avec ${EX.ex2.P} W.`],
        2: ["La méthode est à l’écran « Le régime change le débit ».", "Les deux régimes partent à la même température : seul ΔT compte.", `Commencez par les deux ΔT : ${EX.ex2.d1} K et ${EX.ex2.d2} K.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleRegimes(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "puissance-emetteur", dossier: "methode", kicker: "La méthode, 5", title: "La puissance de chaque émetteur", level: "comprendre",
      text: `Le bilan d’hiver donne, pour chaque pièce, le Φ du local : la puissance perdue par le froid de base, parois, ponts thermiques et part d’air compris (station T5, tableau local par local). Le matin, après l’allure réduite de la nuit, chaque pièce doit aussi remonter en température : son émetteur assure sa part de la relance. Dans cette station, la relance d’une pièce est le forfait de la station T5 appliqué à son Φ du local, arrondi au watt (0,5 W et plus s’arrondit au watt du dessus). La puissance de l’émetteur est la somme des deux. La somme des émetteurs redonne alors la puissance de T5 avant l’arrondi, à quelques watts près. Le bâtiment d’exemple de T5 a une relance de ${EX.relPc} %, valeur d’exercice.`,
      prompt: "Suivez le tableau du bâtiment d’exemple, puis lisez le piège.",
      render: () => tableau(["Local", "Φ du local, T5 (W)", `Relance ${EX.relPc} % (W)`, "Puissance de l’émetteur (W)"], [
        ...EX.locaux.map(l => [l.nom, l.phi, l.rel, l.P]),
        ["Somme des émetteurs", "", "", EX.Ptot]
      ], "Puissance des émetteurs du bâtiment d’exemple")
        + BE.renvoi(`Puissance de T5 avant l’arrondi : ${EX.Pav} W ; somme des émetteurs : ${EX.Ptot} W. L’écart vient des arrondis de chaque ligne.`)
        + BE.alerte("<strong>Piège.</strong> Sans la relance, chaque émetteur est trop petit pour remonter sa pièce le matin, et le circuit ne transporte plus la puissance de la pompe à chaleur.")
        + BE.schema("illustrations/schema-puissance-emetteur.svg", `Schéma de principe en trois barres horizontales, une par local du bâtiment d’exemple. Chaque barre a une grande part bleu pâle, le Φ du local, et une petite part orange, la relance de ${EX.relPc} %. ${EX.locaux.map(l => `${l.nom} : ${l.phi} + ${l.rel} = ${l.P} W`).join(". ")}. La somme des émetteurs est de ${EX.Ptot} W.`, "La puissance de l’émetteur est le Φ du local plus sa part de relance.")
    }),

    BE.ecran({
      id: "debit-pieces", dossier: "methode", kicker: "La méthode, 6", title: "Du besoin de chaque pièce au débit du circuit", level: "comprendre",
      text: "Chaque émetteur reçoit le débit qui transporte sa puissance : qv = puissance de l’émetteur ÷ (1,16 × ΔT), au litre par heure. Un tronçon de tube qui alimente plusieurs émetteurs transporte la somme de leurs débits. Le tronçon qui part du générateur alimente tout le circuit : son débit est la somme des débits de toutes les pièces. Pour contrôler, divisez la somme des puissances des émetteurs par 1,16 × ΔT : le résultat tombe à 1 ou 2 L/h de la somme, à cause des arrondis. Cette règle de la somme sert à dimensionner chaque tronçon du réseau (station H3).",
      prompt: "Suivez le tableau du bâtiment d’exemple, puis continuez.",
      render: () => tableau(["Local", "Puissance de l’émetteur (W)", "Calcul", "Débit (L/h)"], [
        ...EX.locaux.map(l => [l.nom, l.P, `${l.P} ÷ ${EX.reg.div}`, l.q]),
        ["Circuit, somme des débits", EX.Ptot, EX.locaux.map(l => l.q).join(" + "), EX.circuit]
      ], `Débits du bâtiment d’exemple, régime ${EX.reg.dep}/${EX.reg.ret}`)
        + BE.schema("illustrations/schema-circuit-exemple.svg", `Schéma de principe du circuit du bâtiment d’exemple. En bas à gauche, la pompe à chaleur et la pompe de circulation sur le départ, en rouge, à ${EX.reg.dep} °C ; le retour, en bleu, à ${EX.reg.ret} °C. Une branche alimente trois radiateurs : ${EX.locaux.map(l => `${l.nom.toLowerCase()} ${l.q} L/h`).join(", ")}. Le circuit transporte ${EX.circuit} L/h.`, "Chaque radiateur prend le débit de sa puissance ; le tronçon commun transporte la somme.")
        + BE.renvoi(`Contrôle : ${EX.Ptot} ÷ ${EX.reg.div} = ${EX.controle} L/h. Le circuit transporte ${EX.circuit} L/h, soit ${EX.m3} m³/h.`)
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, une branche", title: "Exercice : le débit d’une branche", level: "appliquer", requiresAction: true,
      text: {
        1: `Une branche alimente deux bureaux : Φ du local ${EX.ex3.pieces[0].phi} W et ${EX.ex3.pieces[1].phi} W. La relance est de ${EX.ex3.relPc} %, le régime ${EX.ex3.dep}/${EX.ex3.ret}. Calculez la puissance de chaque émetteur et son débit, puis le débit de la branche en L/h et en m³/h. L’exemple résolu reste sous vos yeux.`,
        2: `Une branche alimente deux bureaux : Φ du local ${EX.ex3.pieces[0].phi} W et ${EX.ex3.pieces[1].phi} W. La relance est de ${EX.ex3.relPc} %, le régime ${EX.ex3.dep}/${EX.ex3.ret}. Calculez le débit de la branche en L/h et en m³/h, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le débit de la branche, en vous aidant de l’exemple.", 2: "Choisissez le débit de la branche. Cette question est à faire seul." },
      aides: {
        1: ["Les deux Φ du local, la relance et le régime sont dans l’énoncé. La méthode est aux écrans « La puissance de chaque émetteur » et « Du besoin de chaque pièce au débit du circuit ».", `Pour chaque bureau : relance = ${EX.ex3.relDec} × Φ du local, puissance = Φ du local + relance, débit = puissance ÷ ${EX.ex3.div}. La branche transporte la somme des deux débits.`, `Sur l’exemple : ${EX.locaux[0].phi} + ${EX.locaux[0].rel} = ${EX.locaux[0].P} W, puis ${EX.locaux[0].P} ÷ ${EX.reg.div} = ${EX.locaux[0].q} L/h. Faites la même ligne pour chacun des deux bureaux, puis additionnez.`],
        2: ["La méthode est aux écrans « La puissance de chaque émetteur » et « Du besoin de chaque pièce au débit du circuit ».", "Trois gestes par bureau : relance, puissance de l’émetteur, débit. Puis la somme, et la conversion en m³/h.", `Commencez par ${EX.ex3.relDec} × ${EX.ex3.pieces[0].phi}.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleBureau(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "generateur", dossier: "methode", kicker: "La méthode, 7", title: "Le débit de la pompe à chaleur", level: "comprendre",
      text: "Le générateur se choisit à la puissance à installer de la station T5, arrondie au dixième de kW au-dessus. Le débit d’eau qui le traverse se calcule avec la même formule et le même ΔT. Il est un peu plus grand que la somme des débits des émetteurs, à cause de cet arrondi. La fiche du fabricant de la pompe à chaleur donne le débit d’eau de la machine ; la pompe du circuit se choisit à la station H4.",
      prompt: "Lisez l’exemple résolu et le piège, puis continuez.",
      render: () => BE.exemple({ text: `Bâtiment d’exemple : puissance à installer ${EX.PkW} kW (station T5), régime ${EX.reg.dep}/${EX.reg.ret}`, answer: `${EX.PkW} kW = ${EX.Pinst} W ; qv = ${EX.Pinst} ÷ ${EX.reg.div} = ${EX.qpac} L/h, pour ${EX.circuit} L/h dans les émetteurs`, why: "La puissance s’écrit en watts avant de diviser par 1,16 × ΔT." })
        + BE.alerte("<strong>Piège.</strong> Prendre Φ base de la station T5 pour la pompe à chaleur oublie la relance : le débit calculé est trop petit.")
    }),

    BE.ecran({
      id: "eau-glacee", dossier: "methode", kicker: "La méthode, 8", title: "Le même calcul en eau glacée", level: "comprendre",
      text: `En climatisation par eau glacée, l’eau part froide et revient réchauffée : elle prend la chaleur de l’air dans une batterie froide ou un ventilo-convecteur. Le régime s’écrit de la même façon, départ puis retour, par exemple ${EX.glacee.dep}/${EX.glacee.ret}, valeur d’exercice. ΔT se compte alors retour moins départ. La formule ne change pas. La maison du projet n’a pas de climatisation (CCTP, page 4) : la station F5 traite le circuit d’eau glacée.`,
      prompt: "Lisez l’exemple résolu, puis continuez.",
      render: () => BE.exemple({ text: `Batterie froide de ${EX.glacee.P} W, régime ${EX.glacee.dep}/${EX.glacee.ret}`, answer: `ΔT = ${EX.glacee.ret} − ${EX.glacee.dep} = ${EX.glacee.dT} K ; qv = ${EX.glacee.P} ÷ ${EX.glacee.div} = ${EX.glacee.q} L/h`, why: "La température de retour est la plus haute : on la met en premier pour que ΔT reste positif." })
        + BE.schema("illustrations/schema-eau-glacee.svg", `Schéma de principe d’une boucle d’eau glacée. À gauche, le groupe d’eau glacée. À droite, une batterie froide. Une flèche bleue va du groupe vers la batterie : le départ, à ${EX.glacee.dep} °C. Une flèche orange revient de la batterie vers le groupe : le retour, à ${EX.glacee.ret} °C. L’eau prend la chaleur de l’air. Sous le dessin : ΔT = retour − départ = ${EX.glacee.ret} − ${EX.glacee.dep} = ${EX.glacee.dT} K ; batterie de ${EX.glacee.P} W : ${EX.glacee.P} ÷ ${EX.glacee.div} = ${EX.glacee.q} L/h.`, "En eau glacée, l’eau part froide et revient réchauffée par l’air.")
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 9", title: "La note de calcul des débits", level: "comprendre",
      text: "La note de calcul donne à un lecteur de quoi refaire les débits : l’objet, les données d’entrée avec leur source, les hypothèses, la méthode, les résultats. Un régime choisi faute de CCTP et la relance de chaque pièce sont des hypothèses : elles s’écrivent comme telles. La note du bâtiment d’exemple tient en six lignes.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Débits d’eau du chauffage, petit bâtiment de bureaux de plain-pied, trois locaux, pompe à chaleur"],
        ["Données d’entrée", "Φ du local et puissance à installer : station T5 ; capacité thermique et masse volumique de l’eau : Th-Bât, fascicule Matériaux, § 2.9.8"],
        ["Hypothèses", `Régime ${EX.reg.dep}/${EX.reg.ret} ; relance ${EX.relPc} % du Φ du local (valeurs d’exercice)`],
        ["Méthode", "Puissance de l’émetteur = Φ du local + relance ; qv = puissance ÷ (1,16 × ΔT) ; circuit = somme des débits"],
        ["Résultats", `${EX.locaux.map(l => `${l.nom.toLowerCase()} ${l.q} L/h`).join(", ")} ; circuit ${EX.circuit} L/h, soit ${EX.m3} m³/h`],
        ["Pompe à chaleur", `${EX.PkW} kW, ${EX.qpac} L/h`]
      ], "Première page de la note de calcul, bâtiment d’exemple")
        + BE.renvoi("La note complète du projet s’assemble à la station R5, « La note de calcul ».")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

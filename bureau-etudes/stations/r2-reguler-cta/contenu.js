/* Station BE-R2 : Réguler la CTA.
   Méthode sur le noyau du bâtiment de bureaux du projet (le bureau et la salle de réunion) ; niveau 1 sur le même noyau, à d'autres
   valeurs ; niveau 2 sur le bâtiment entier. Les valeurs de la méthode (bloc EXEMPLE), les données des commandes et les bornes des
   fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/r2-reguler-cta/construire.mjs, depuis exemple-data.mjs,
   fil-rouge/tertiaire/cctp-ajout-r2.json et corriges/r2-reguler-cta/reference-regulation-cta.json (outils/r2-regulation-tertiaire.mjs).
   Les figures de illustrations/ sont tracées par le même outil (schema.mjs).
   Aucune valeur calculée du niveau 1 ni du niveau 2 n'est écrite dans cette station : seules les bornes des fourchettes et les
   données des commandes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/tertiaire/";
const GARE5 = "../../../plan/gares/cvcr5-synoptique-regulation/index.html";

/*EXEMPLE-DEBUT*/
const EX = {
 "d": {
  "plage": [
   0,
   2000
  ],
  "consigne": "1000",
  "tsH": "19",
  "tsE": "17",
  "trH": "19",
  "trE": "26",
  "eta": "0,54",
  "type": "échangeur à plaques",
  "bas": "800",
  "haut": "1000",
  "veille": "72",
  "max": "240",
  "saison": "15",
  "antigel": "5",
  "qn": "290",
  "debut": "7 h 30",
  "fin": "19 h",
  "jours": "lundi au vendredi",
  "cmdV": [
   "3,5",
   "4,6",
   "5,5"
  ],
  "cmdTe": [
   "−7",
   "0",
   "10"
  ],
  "cmdPpm": [
   "800",
   "1 000",
   "1 200"
  ],
  "cmdTe1": "0",
  "veillePc": "30",
  "rec": [
   0,
   30
  ],
  "bc": [
   30,
   100
  ],
  "neutre": [
   0,
   10
  ],
  "bf": [
   10,
   100
  ]
 },
 "m": {
  "te": "−7",
  "t2": "7,04",
  "P": "1 179,26",
  "sans": "2 563,6",
  "rec": "1 384,34",
  "ppm": "600",
  "V": "3,0",
  "V2": "6,5",
  "ppm2": "1 300",
  "rppm": "900",
  "rq": "156",
  "dT1": "26",
  "dT2": "11,96",
  "part": "54"
 },
 "organes": [
  [
   "1",
   "Registre d’air neuf motorisé"
  ],
  [
   "2",
   "Filtre d’air neuf"
  ],
  [
   "3",
   "Récupérateur à plaques"
  ],
  [
   "4",
   "By-pass motorisé du récupérateur"
  ],
  [
   "5",
   "Batterie chaude à eau et sa vanne"
  ],
  [
   "6",
   "Batterie froide à eau glacée et sa vanne"
  ],
  [
   "7",
   "Ventilateur de soufflage"
  ],
  [
   "8",
   "Filtre de reprise"
  ],
  [
   "9",
   "Ventilateur de reprise"
  ],
  [
   "10",
   "Registre de rejet motorisé"
  ],
  [
   "11",
   "Registre motorisé de la salle de réunion"
  ]
 ],
 "sondes": [
  [
   "A",
   "Sonde de température d’air neuf",
   "Compare l’air neuf à la reprise : by-pass en été, choix de la saison"
  ],
  [
   "B",
   "Thermostat antigel",
   "Sécurité : arrête la CTA et ouvre la vanne de la batterie chaude"
  ],
  [
   "C",
   "Sonde de température de soufflage",
   "Règle le by-pass et les vannes des batteries"
  ],
  [
   "D",
   "Sonde de température de reprise",
   "Corrige la consigne de soufflage ; comparée à l’air neuf"
  ],
  [
   "E",
   "Sonde de CO₂ de la salle de réunion",
   "Règle le registre de la salle de réunion"
  ]
 ],
 "ex2": {
  "qv": "1000",
  "eta": "0,60",
  "te": "0",
  "tr": "20",
  "ts": "18",
  "quiz": {
   "choices": [
    "6 120 W",
    "2 040 W",
    "2 720 W",
    "4 080 W"
   ],
   "good": 1,
   "explain": "Après le récupérateur : 0 + 0,60 × (20 − 0) = 12 °C ; la batterie chauffe de 12 à 18 °C : 0,34 × 1 000 × (18 − 12) = 2 040 W. 6 120 W oublie le récupérateur, 2 720 W chauffe jusqu’à la reprise au lieu du soufflage, 4 080 W est la part du récupérateur."
  }
 },
 "ex4": {
  "min": "0",
  "max": "5 000",
  "V": "2",
  "quiz": {
   "choices": [
    "400 ppm",
    "1 000 ppm",
    "2 500 ppm",
    "10 000 ppm"
   ],
   "good": 1,
   "explain": "2 V sur 10 V, c’est 20 % de l’étendue : 0,2 × 5 000 = 1 000 ppm. 400 ppm prend la plage de la sonde du projet au lieu de celle-ci, 2 500 ppm est le milieu de la plage (5 V), 10 000 ppm oublie de diviser par 10 V."
  }
 },
 "ordre": {
  "items": [
   "À 7 h 30 : registres d’air neuf et de rejet ouverts, puis ventilateurs en marche.",
   "L’air extérieur est plus chaud que la reprise : le by-pass se ferme, le récupérateur refroidit l’air neuf.",
   "L’air reste au-dessus de 17 °C : la vanne de la batterie froide s’ouvre.",
   "La sonde de soufflage règle la vanne pour tenir 17 °C.",
   "À 19 h : ventilateurs arrêtés, registres et vannes fermés ; l’antigel reste surveillé."
  ],
  "indices": [
   "La CTA démarre d’abord : registres, puis ventilateurs.",
   "Avant la batterie, la fraîcheur gratuite : comparez l’air extérieur à la reprise.",
   "Le récupérateur ne suffit pas : quel organe s’ouvre ensuite côté froid ?",
   "Une fois la vanne ouverte, une sonde la règle en continu.",
   "La journée finit par l’arrêt aux horaires."
  ]
 },
 "img": {
  "cta": "illustrations/cta-regulation.svg",
  "reperes": "illustrations/cta-reperes.svg",
  "vierge": "illustrations/cta-vierge.svg",
  "pid": "illustrations/pid.svg",
  "temp": "illustrations/temperatures-hiver.svg",
  "seq": "illustrations/sequenceur.svg",
  "jour": "illustrations/journee.svg",
  "co2": "illustrations/sonde-co2.svg",
  "reg": "illustrations/registre-salle.svg"
 }
};
/*EXEMPLE-FIN*/

const d = EX.d, m = EX.m;
/* Une figure s'ouvre en grand d'un toucher (au téléphone, le doigt l'agrandit ensuite). */
const figure = (src, alt, legende) => `<figure class="schema"><a href="${BE.esc(src)}" target="_blank" rel="noopener"><img src="${BE.esc(src)}" alt="${BE.esc(alt)}"></a><figcaption>${BE.esc(legende.replace(/\.?$/, "."))} Touchez la figure pour l’ouvrir en grand.</figcaption></figure>`;
const avecBloc = (html, a) => ({ quiz: a.quiz, render: item => html + a.render(item), wire: a.wire });
const altCta = (sondes) => `Schéma de principe de la CTA, dans le local technique. En bas, de gauche à droite, l’air neuf entre par la prise d’air, traverse le registre d’air neuf motorisé (1), le filtre (2), le récupérateur à plaques (3, un grand carré barré de ses deux diagonales, qui croise aussi la ligne du haut), la batterie chaude (5, signe plus), la batterie froide (6, signe moins) et le ventilateur de soufflage (7), puis part vers les locaux ; une branche descend vers la salle de réunion par un registre motorisé (11). Sous le récupérateur, un by-pass muni d’un registre motorisé (4) le contourne. En haut, de droite à gauche, l’air repris des locaux traverse le filtre de reprise (8), le ventilateur de reprise (9), le récupérateur, puis le registre de rejet motorisé (10) et sort dehors. ${sondes}`;
const tabSondes = () => tableau(["Lettre", "Sonde", "Elle règle ou surveille"], EX.sondes, "Les cinq sondes de la CTA ; la sonde d’air neuf est une donnée de l’exercice, le CCTP ne la liste pas");
const tabOrganes = () => tableau(["Repère", "Organe"], EX.organes, "Les organes de la CTA, dans l’ordre de l’air ; le by-pass 4 est une donnée de l’exercice, le CCTP ne le cite pas ; les vannes des batteries 5 et 6 ne sont pas dessinées, la commande en trait mixte va à la batterie");
const exempleRecup = () => BE.exemple({ text: `Noyau : ${d.qn} m³/h d’air neuf, ${m.te} °C dehors, reprise à ${d.trH} °C, soufflage à ${d.tsH} °C, plaques η = ${d.eta}`, answer: `θ après récupérateur = ${m.te} + ${d.eta} × (${d.trH} − (${m.te})) = ${m.t2} °C ; P = 0,34 × ${d.qn} × (${d.tsH} − ${m.t2}) = ${m.P} W`, why: `Sans récupérateur, la batterie fournirait 0,34 × ${d.qn} × ${m.dT1} = ${m.sans} W : le récupérateur en apporte ${m.rec} W sans énergie à acheter, ${m.part} % de l’écart de température.` });
const exempleSonde = () => BE.exemple({ text: `Sonde du CCTP, ${d.plage[0]} à 2 000 ppm en 0-10 V : quelle tension à ${m.ppm} ppm ? Quelle teneur pour ${m.V2} V ?`, answer: `10 × ${m.ppm} ÷ 2 000 = ${m.V} V ; ${m.V2} ÷ 10 × 2 000 = ${m.ppm2} ppm`, why: "La tension est proportionnelle à la teneur : chaque volt vaut 2 000 ÷ 10 = 200 ppm." });
const exempleRegistre = () => BE.exemple({ text: `Salle de réunion : la sonde lit ${m.rppm} ppm`, answer: `${m.rppm} ppm est entre ${d.bas} et ${d.haut.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ppm : q = ${d.veille} + (${d.max} − ${d.veille}) × (${m.rppm} − ${d.bas}) ÷ (${d.haut} − ${d.bas}) = ${m.rq} m³/h`, why: "Sous le seuil bas, le débit reste à la veille ; au-dessus du seuil haut, il reste au débit réglementaire. On lit aussi la valeur sur la figure, traits de lecture à l’appui." });
const lignesTri = [
  { text: "Sonde de température de reprise", good: 1, why: "Elle mesure l’air qui revient des locaux : s’ils sont trop chauds ou trop froids, le régulateur décale la consigne de soufflage.", bad: "Relisez l’écran « Les sondes et le régulateur » : cette sonde mesure l’air qui revient des locaux." },
  { text: "Thermostat antigel", good: 3, why: "Il protège la batterie chaude du gel : arrêt de la CTA, vanne de la batterie chaude grande ouverte, alarme.", bad: "Relisez l’écran « Horaires, arrêt et antigel » : ce thermostat est une sécurité." },
  { text: "Sonde de température de soufflage", good: 0, why: "Elle mesure l’air qui part vers les locaux : le régulateur règle le by-pass et les vannes des batteries pour tenir la consigne de soufflage.", bad: "Relisez l’écran « Les sondes et le régulateur » : cette sonde est juste après le ventilateur de soufflage." },
  { text: "Sonde de CO₂ de la salle de réunion", good: 2, why: "Elle règle le débit d’air neuf de la salle par son registre ; la température de la salle ne dépend pas d’elle.", bad: "Relisez l’écran « Les sondes et le régulateur » : la teneur en CO₂ dit combien de personnes respirent dans la salle." }
];
/* Le moteur ne mélange pas les lignes d’un tri : elles sont rangées pour que la bonne réponse ne suive pas la diagonale des boutons. */
const labelsTri = ["Les batteries", "La consigne de soufflage", "Le débit de la salle", "La sécurité antigel"];
const triAvec = (html) => { const t = BE.tri(lignesTri, labelsTri); return { render: item => html + t.render(item), wire: t.wire }; };

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Le débit du noyau, ${d.qn} m³/h, est dans la commande. Le CCTP donne la sonde de CO₂ (page 4), la consigne de soufflage et le récupérateur (page 3), la température des locaux (page 1) et les horaires (page 2).`,
      "Exercice 1 de la feuille : écran « Les sondes et le régulateur ». Exercice 2 : écran « La sonde de CO₂ en 0-10 V ». Exercice 3 : écrans « Le séquenceur : hiver et été » et « Horaires, arrêt et antigel ». Exercice 4 : écran « Le récupérateur d’abord, puis la batterie ». Les lettres A à E du schéma de la feuille ne sont pas celles de l’écran : reconnaissez chaque sonde à sa place sur le schéma.",
      `Sur l’exemple, à ${m.te} °C, l’air sort du récupérateur à ${m.t2} °C. Faites le même calcul à ${d.cmdTe1} °C dehors, avec le même débit.`
    ],
    2: [
      "Le débit d’air neuf du bâtiment est votre résultat de la station A5. Le CCTP donne le reste ; la loi du registre et les seuils sont à l’écran « Le débit de la salle de réunion ».",
      "Cinq gestes déjà vus : les sondes et les liaisons, la batterie chaude après le récupérateur, la tension passée en teneur puis en débit, la séquence écrite par rubriques, la note de calcul.",
      "Pour le registre, passez d’abord chaque tension en teneur, puis regardez si la teneur est sous le seuil bas, entre les deux seuils ou au-dessus du seuil haut."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensProjet = n => BE.liens(n === 1 ? [
  { href: EX.img.reperes, title: "Le schéma de la CTA, sondes A à E", note: "Le même qu’au recto de la feuille réponse, à ouvrir en grand" },
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment de bureaux", note: "Pages 1 à 4 : conditions, horaires, CTA, régulation" }
] : [
  { href: EX.img.vierge, title: "Le schéma de la CTA sans régulation", note: "Le même qu’au recto de la feuille réponse, à ouvrir en grand" },
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment de bureaux", note: "Pages 1 à 4 : conditions, horaires, CTA, régulation" },
  { href: DOSSIER + "plans-tertiaire.pdf", title: "Les plans du bâtiment de bureaux", note: "Facultatif : situer les locaux, la salle de réunion et le local technique" }
]);
ecranProjet.render = () => { const html = rendreCommande(); if (html.includes("partie-reservee")) return html; return html + liensProjet(html.includes("niveau autonome") ? 2 : 1); };

BE.station({
  code: "BE-R2",
  titre: "Réguler la CTA",
  ligne: "Régulation et énergie",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le noyau du bâtiment de bureaux : sondes, tensions de la sonde de CO₂, séquence d’hiver, batterie chaude, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Le bâtiment de bureaux entier : schéma de régulation, batterie chaude à trois températures, registre de la salle, séquence écrite, note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "La CTA du bâtiment de bureaux est composée : ses sections, ses débits et ses températures de soufflage sont connus. Le bureau d’études écrit maintenant sa régulation : où placer les sondes, ce que chacune commande, dans quel ordre s’ouvrent le récupérateur et les batteries en hiver et en été, quand la CTA s’arrête, comment le débit de la salle de réunion suit la teneur en CO₂. Vous apprenez la méthode sur le noyau du bâtiment, le bureau et la salle de réunion, puis vous la faites seul sur tout le bâtiment.",
  note: "Le bâtiment de bureaux et son CCTP sont fictifs : inerWeb les a écrits pour le réseau. Le by-pass du récupérateur, la sonde de température d’air neuf, les seuils du registre de la salle, le seuil de saison, les plages du séquenceur et le seuil de l’antigel sont des données de l’exercice ; sur un vrai projet, ils se lisent dans le CCTP du lot régulation. Les actions P, PI et PID sont présentées en notion, sans réglage chiffré.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur le noyau du bâtiment" },
    { id: "projet", label: "Le projet", note: "commande, schéma et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Le noyau du bâtiment de bureaux : les sondes, la sonde de CO₂, la séquence d’hiver et la batterie chaude",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études écrit la régulation de la CTA du bâtiment de bureaux. Vous travaillez sur le noyau : le bureau et la salle de réunion, ${d.qn} m³/h d’air neuf (station A5). Données : l’extrait de CCTP, pages 1 à 4. Suivez les étapes dans l’ordre.`,
        "Étape 1. Sur le schéma de la feuille réponse, nommez les sondes A à E et dites ce que chacune règle ou surveille. Ces lettres ne sont pas celles de l’écran : reconnaissez chaque sonde à sa place.",
        `Étape 2. Calculez la tension que la sonde de CO₂ envoie à ${d.cmdPpm.join(", ").replace(/, ([^,]*)$/, " et $1")} ppm.`,
        "Étape 3. Rangez les étapes d’une journée d’hiver et dites ce qui commande chacune.",
        `Étape 4. Un matin à ${d.cmdTe1} °C dehors, calculez la température de l’air après le récupérateur, puis la puissance de la batterie chaude. Vérifiez la tension à 1 200 ppm, cette température et cette puissance à l’écran Vérifier.`
      ],
      pieces: [
        { piece: "Extrait de CCTP", ou: "Lien ci-dessous, pages 1 à 4" },
        { piece: "Schéma de la CTA, sondes A à E", ou: "Au recto de la feuille réponse, et lien ci-dessous" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "La régulation de la CTA du bâtiment de bureaux : schéma, batterie chaude, registre de la salle, séquence écrite, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études écrit la régulation de la CTA de tout le bâtiment de bureaux (CCTP, lots 3 et 5). Données : vos résultats de la station A5, dont le débit d’air neuf du bâtiment, au plus, salle de réunion grande ouverte ; l’extrait de CCTP, pages 1 à 4. Données de l’exercice : la loi du registre de la salle de réunion, à l’écran « Le débit de la salle de réunion » ; la sonde de CO₂ de la salle envoie tour à tour ${d.cmdV.join(" V, ").replace(/, ([^,]*)$/, " et $1")} V ; trois températures extérieures, ${d.cmdTe.join(" °C, ").replace(/, ([^,]*)$/, " et $1")} °C. Complétez le schéma de régulation de la CTA : sondes, régulateur, mesures et commandes. Calculez la puissance de la batterie chaude aux trois températures. Pour chaque tension, calculez la teneur en CO₂ et le débit du registre. Écrivez la séquence complète, hiver et été, puis la première page de la note de calcul.`,
      pieces: [
        { piece: "Vos résultats de la station A5", ou: "Débit d’air neuf du bâtiment" },
        { piece: "Extrait de CCTP ; plans (facultatifs)", ou: "Liens ci-dessous" },
        { piece: "Schéma de la CTA sans régulation", ou: "Au recto de la feuille réponse, et lien ci-dessous" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },
  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-V", libelle: "Tension envoyée par la sonde de CO₂ à 1 200 ppm, en V", unite: "V", min: 5.9, max: 6.1, indice: "Relisez l’écran « La sonde de CO₂ en 0-10 V » : la tension est proportionnelle à la teneur, 10 V pour toute la plage de la sonde (page 4 du CCTP)." },
      { id: "n1-t2", libelle: "Température de l’air après le récupérateur, à 0 °C dehors, en °C", unite: "°C", min: 10.06, max: 10.46, indice: "Relisez l’écran « Le récupérateur d’abord, puis la batterie » : θ après récupérateur = θe + η × (θ reprise − θe), avec l’efficacité du récupérateur de base et la reprise à la température des locaux." },
      { id: "n1-P", libelle: "Puissance de la batterie chaude du noyau, à 0 °C dehors, en W", unite: "W", min: 835.91, max: 887.62, indice: "Relisez l’écran « Le récupérateur d’abord, puis la batterie » : P = 0,34 × qv × (θ soufflage − θ après récupérateur), avec le débit du noyau donné par la commande." }
    ],
    2: [
      { id: "n2-ppm", libelle: "Teneur en CO₂ lue à 3,5 V, en ppm", unite: "ppm", min: 680, max: 720, indice: "Relisez l’écran « La sonde de CO₂ en 0-10 V » : la teneur vaut la tension lue ÷ 10 V × l’étendue de la sonde." },
      { id: "n2-q", libelle: "Débit du registre de la salle à 4,6 V, en m³/h", unite: "m³/h", min: 167.61, max: 177.99, indice: "Relisez l’écran « Le débit de la salle de réunion » : passez d’abord la tension en teneur, puis placez la teneur sur la loi du registre (veille sous le seuil bas, droite entre les deux seuils)." },
      { id: "n2-P7", libelle: "Puissance de la batterie chaude du bâtiment, à −7 °C dehors, en W", unite: "W", min: 1735.53, max: 1842.9, indice: "Relisez l’écran « Le récupérateur d’abord, puis la batterie » : même calcul qu’au niveau 1, avec le débit d’air neuf du bâtiment (vos résultats de la station A5) et la température extérieure de la ligne." },
      { id: "n2-P0", libelle: "Puissance de la batterie chaude du bâtiment, à 0 °C dehors, en W", unite: "W", min: 1268.27, max: 1346.73, indice: "Relisez l’écran « Le récupérateur d’abord, puis la batterie » : même calcul qu’au niveau 1, avec le débit d’air neuf du bâtiment (vos résultats de la station A5) et la température extérieure de la ligne." },
      { id: "n2-P10", libelle: "Puissance de la batterie chaude du bâtiment, à 10 °C dehors, en W", unite: "W", min: 600.76, max: 637.93, indice: "Relisez l’écran « Le récupérateur d’abord, puis la batterie » : même calcul qu’au niveau 1, avec le débit d’air neuf du bâtiment (vos résultats de la station A5) et la température extérieure de la ligne." }
    ]
  },
  /*FOURCHETTES-FIN*/
  suivante: { code: "BE-R3", titre: "La supervision", href: "../r3-supervision/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-A5, CTA 1 : composer", href: "../a5-cta-composer/index.html", pourquoi: "Les sections de la CTA, ses débits et le calcul du récupérateur et des batteries." },
    { reseau: "Bureau d’études", titre: "BE-R1, Réguler le chauffage", href: "../r1-reguler-chauffage/index.html", pourquoi: "Sonde, régulateur, vanne : la boucle de régulation sur le chauffage." },
    { reseau: "Lire les plans", titre: "CVC-R 5, Le synoptique de régulation", href: GARE5, pourquoi: "Sondes, régulateur, liaisons de mesure et de commande sur le même dessin." },
    { reseau: "AéroRézo", titre: "Humidifier, déshumidifier, réguler", href: "../../../aerorezo/stations/humidifier-reguler/index.html", pourquoi: "La boucle d’une centrale : mesure, consigne, action, nouvelle mesure." },
    { reseau: "AéroRézo", titre: "Récupération d’énergie", href: "../../../aerorezo/stations/recuperation/index.html", pourquoi: "L’efficacité d’un récupérateur, mesurée sur trois températures." }
  ],
  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Une centrale de traitement d’air, ou CTA, prend l’air neuf dehors, le filtre, le réchauffe ou le refroidit, puis le souffle dans les bureaux. Sa régulation décide à chaque instant ce qui s’ouvre et ce qui se ferme : registres, récupérateur, batteries, ventilateurs. Le bureau d’études l’écrit sous la forme d’une séquence de régulation : les sondes et le régulateur, ce que chaque sonde commande, l’ordre des actions en hiver et en été, les horaires et les sécurités. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Rubrique", "Ce que vous écrivez"], [
        ["Schéma", ""], ["Hiver", ""], ["Été", ""], ["Salle de réunion", ""], ["Sécurités", ""]
      ], "La séquence de régulation de la CTA, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la régulation de la CTA."], ["Le dossier :", "le CCTP (sections, sonde, consignes, horaires), les débits de la station A5."]] },
          { title: "Vous produisez", rows: [["Le schéma :", "sondes, régulateur, mesures et commandes."], ["La séquence :", "hiver, été, salle de réunion, sécurités ; la batterie chaude et le débit de la salle, vérifiés à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la liste des sondes et des organes, reprise sur la supervision."]] }
        ])
    }),
    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les sections de la CTA, son récupérateur et ses températures de soufflage sont à la page 3 de l’extrait de CCTP. Ce que mesure la régulation, la consigne de CO₂ et la plage de la sonde sont à la page 4. Les horaires d’occupation et le débit de veille de la salle de réunion sont à la page 2, la température des locaux à la page 1. Les débits d’air neuf viennent de la station A5. Le CCTP ne cite ni le by-pass du récupérateur ni, dans sa liste des mesures, la sonde de température d’air neuf : vous pouvez les placer, ce sont des données de l’exercice, comme les seuils du registre de la salle, le seuil de saison, les plages du séquenceur et le seuil de l’antigel, dites comme telles à chaque écran.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        [`Sections de la CTA ; récupérateur de base, ${d.type}, η = ${d.eta} ; soufflage ${d.tsH} °C l’hiver, ${d.tsE} °C l’été`, "CCTP, page 3"],
        ["Ce que mesure la régulation ; sonde de CO₂ de 0 à 2 000 ppm en 0-10 V ; consigne de 1 000 ppm", "CCTP, page 4"],
        [`Horaires : du ${d.jours}, de ${d.debut} à ${d.fin} ; débit de veille de la salle, ${d.veillePc} % du débit réglementaire`, "CCTP, page 2"],
        [`Température des locaux, ${d.trH} °C l’hiver, ${d.trE} °C l’été ; température de base, ${m.te} °C`, "CCTP, page 1"],
        [`Débits d’air neuf, au plus : noyau ${d.qn} m³/h ; bâtiment, votre résultat de la station A5`, "Station A5 ; le noyau, dans la commande du niveau 1"],
        [`By-pass du récupérateur, sonde d’air neuf, seuils du registre (${d.bas} et ${d.haut} ppm), seuil de saison (${d.saison} °C), séquenceur, antigel (${d.antigel} °C)`, "Données de l’exercice"]
      ], "Les données de la régulation de la CTA")
        + BE.renvoi('Les sections et les débits de la CTA ont été établis à <a href="../a5-cta-composer/index.html">la station A5</a>.')
    }),
    BE.ecran({
      id: "sondes-regulateur", dossier: "methode", kicker: "La méthode, 1", title: "Les sondes et le régulateur", level: "comprendre",
      text: "Une boucle de régulation compte trois parties : une sonde qui mesure, un régulateur qui compare la mesure à une consigne, un organe qui agit, comme une vanne, un registre ou un ventilateur. La CTA du projet porte cinq sondes. La sonde d’air neuf, à la prise d’air, mesure la température du dehors. Le thermostat antigel est placé juste après la batterie chaude. La sonde de soufflage, après le ventilateur, mesure l’air qui part vers les locaux : elle règle le by-pass et les vannes des batteries. La sonde de reprise mesure l’air qui revient des locaux : elle corrige la consigne de soufflage quand les locaux sont trop chauds ou trop froids. La sonde de CO₂, au mur de la salle de réunion, règle le débit d’air neuf de la salle ; la température de la salle ne dépend pas d’elle. Sur le schéma, une mesure va de la sonde au régulateur en pointillé ; une commande va du régulateur à l’organe en trait mixte. La figure trace la boucle de soufflage ; les autres liaisons se tracent de la même façon. Ce geste sert à l’exercice 1 de la feuille.",
      prompt: "Repérez les cinq sondes sur le schéma, puis suivez la boucle de soufflage, de la sonde aux trois organes commandés.",
      render: () => figure(EX.img.cta, altCta("Cinq sondes, repérées par une lettre : A, la sonde d’air neuf à la prise d’air ; B, le thermostat antigel, sous la ligne, juste après la batterie chaude ; C, la sonde de soufflage, après le ventilateur ; D, la sonde de reprise, sur la gaine de reprise avant la CTA ; E, la sonde de CO₂, au mur de la salle de réunion. Sous la CTA, le régulateur. Une liaison en pointillé orange va de la sonde de soufflage au régulateur ; trois liaisons en trait mixte rouge vont du régulateur au by-pass, à la vanne de la batterie chaude et à la vanne de la batterie froide."), "La CTA du projet : cinq sondes et la boucle de soufflage, mesure en pointillé, commandes en trait mixte")
        + tabSondes() + tabOrganes()
        + BE.renvoi('La boucle sonde, régulateur, vanne est vue sur le chauffage à <a href="../r1-reguler-chauffage/index.html">la station R1</a>, et sur un synoptique à <a href="' + GARE5 + '">la gare CVC-R 5</a> de la ligne Lire les plans.')
    }),
    BE.ecran({
      id: "tout-ou-rien-pid", dossier: "methode", kicker: "La méthode, 2", title: "Tout ou rien, P, PI, PID", level: "comprendre",
      text: "Le régulateur agit de plusieurs façons. En tout ou rien, l’organe est ouvert ou fermé : la température monte et descend autour de la consigne. Le thermostat antigel et les registres d’air neuf et de rejet travaillent ainsi. En action proportionnelle, notée P, l’ouverture suit l’écart entre la mesure et la consigne : plus l’écart est grand, plus la vanne s’ouvre. La température se stabilise, avec un petit écart qui reste. L’action intégrale, notée I, ajoute de l’ouverture tant qu’un écart dure : en PI, l’écart finit par s’annuler. L’action dérivée, notée D, réagit à la vitesse à laquelle l’écart change et freine les dépassements. Une vanne de batterie se règle en PI ou en PID. Le registre de la salle de réunion, entre ses deux seuils, suit une action proportionnelle. Le réglage chiffré de ces actions se fait à la mise en service : la station n’en donne aucun.",
      prompt: "Comparez les trois courbes : où la température se stabilise-t-elle, par rapport à la consigne ?",
      render: () => figure(EX.img.pid, "Trois graphiques de principe, la température en fonction du temps, avec la consigne en tirets. Tout ou rien : la température monte, puis oscille en dents de scie autour de la consigne. Proportionnelle : la température monte et se stabilise un peu sous la consigne ; un trait vertical marque l’écart qui reste. Proportionnelle et intégrale : la température monte, dépasse un peu, puis se stabilise sur la consigne.", "Tout ou rien, P et PI : la réponse de la boucle, sans chiffre")
    }),
    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, qui règle quoi", title: "Entraînement : qui règle quoi", level: "appliquer", requiresAction: true,
      text: {
        1: "Pour chaque sonde, choisissez ce qu’elle règle ou surveille. Le tableau des sondes reste sous vos yeux.",
        2: "Pour chaque sonde, choisissez ce qu’elle règle ou surveille. Sans le tableau."
      },
      prompt: { 1: "Choisissez une réponse pour chaque ligne, en vous aidant du tableau.", 2: "Choisissez une réponse pour chaque ligne. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Les sondes et le régulateur ».", "Demandez-vous où est la sonde : dans l’air soufflé, dans l’air repris, dans la salle, après la batterie chaude.", "La sonde de soufflage commande les batteries ; la sonde de CO₂, le registre de la salle."],
        2: ["La méthode est à l’écran « Les sondes et le régulateur ».", "La place de la sonde dit ce qu’elle mesure.", "Une seule sonde est une sécurité."]
      },
      ...BE.parNiveau({
        1: triAvec(tabSondes()),
        2: BE.tri(lignesTri, labelsTri)
      })
    }),
    BE.ecran({
      id: "recuperateur-puis-batterie", dossier: "methode", kicker: "La méthode, 3", title: "Le récupérateur d’abord, puis la batterie", level: "comprendre",
      text: `En hiver, l’air neuf arrive froid. Le récupérateur à plaques lui passe une partie de la chaleur de l’air repris, sans énergie à acheter : la séquence s’en sert en premier. Son efficacité η dit quelle part de l’écart entre la reprise et l’air neuf il rattrape : θ après récupérateur = θe + η × (θ reprise − θe). La batterie chaude complète ensuite jusqu’à la consigne de soufflage : P = 0,34 × qv × (θ soufflage − θ après récupérateur), en W, avec qv en m³/h ; 0,34 vaut ρ × cp ÷ 3 600 (station T4). En hiver, l’air repris est à la température des locaux, ${d.trH} °C (CCTP page 1) ; le récupérateur de base est un ${d.type}, η = ${d.eta} (CCTP page 3). Plus il fait doux dehors, moins la batterie chaude travaille. Ce geste sert à l’exercice 4 de la feuille du niveau 1 et à l’exercice 2 du niveau 2.`,
      prompt: "Suivez les deux flèches de la figure, puis lisez l’exemple résolu.",
      render: () => figure(EX.img.temp, `Une échelle de température de −10 à 20 °C. Une flèche orange va de ${m.te} °C à ${m.t2} °C : le récupérateur. Une flèche bleu marine va de ${m.t2} °C à ${d.tsH} °C : la batterie chaude.`, `Noyau, ${m.te} °C dehors : le récupérateur réchauffe l’air neuf jusqu’à ${m.t2} °C, la batterie chaude fait le reste`)
        + exempleRecup()
    }),
    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, la batterie chaude", title: "Entraînement : la batterie chaude", level: "appliquer", requiresAction: true,
      text: {
        1: `Une autre CTA souffle ${EX.ex2.qv.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} m³/h d’air neuf à ${EX.ex2.ts} °C. L’air repris est à ${EX.ex2.tr} °C, il fait ${EX.ex2.te} °C dehors, son récupérateur a une efficacité de ${EX.ex2.eta}. Quelle puissance donne la batterie chaude ? L’exemple résolu reste sous vos yeux.`,
        2: `Une autre CTA souffle ${EX.ex2.qv.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} m³/h d’air neuf à ${EX.ex2.ts} °C. L’air repris est à ${EX.ex2.tr} °C, il fait ${EX.ex2.te} °C dehors, son récupérateur a une efficacité de ${EX.ex2.eta}. Quelle puissance donne la batterie chaude ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la puissance, en vous aidant de l’exemple.", 2: "Choisissez la puissance. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Le récupérateur d’abord, puis la batterie ».", "Calculez d’abord la température après le récupérateur.", `Sur l’exemple : ${m.te} + ${d.eta} × (${d.trH} − (${m.te})) = ${m.t2} °C, puis 0,34 × ${d.qn} × (${d.tsH} − ${m.t2}).`],
        2: ["La méthode est à l’écran « Le récupérateur d’abord, puis la batterie ».", "Température après le récupérateur d’abord.", "P = 0,34 × qv × (θ soufflage − θ après récupérateur)."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleRecup(), BE.quiz(EX.ex2.quiz)),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),
    BE.ecran({
      id: "sequenceur", dossier: "methode", kicker: "La méthode, 4", title: "Le séquenceur : hiver et été", level: "comprendre",
      text: `La sonde de soufflage commande trois organes l’un après l’autre : c’est le séquenceur. Quand il faut du chaud, le régulateur ferme d’abord le by-pass, pour que tout l’air neuf traverse le récupérateur ; s’il manque encore de la chaleur, il ouvre la vanne de la batterie chaude. Quand il faut du froid, le by-pass s’ouvre, l’air neuf passe seul, puis la vanne de la batterie froide s’ouvre. Les deux batteries ne sont jamais ouvertes ensemble. En été, une comparaison s’ajoute : si l’air extérieur est plus frais que l’air repris, le by-pass reste ouvert et l’air neuf rafraîchit les locaux sans dépense ; s’il est plus chaud, le by-pass se ferme et le récupérateur refroidit l’air neuf avec l’air repris, avant la batterie froide. Un air extérieur frais mais très humide se surveille aussi ; la station s’en tient à la température. La consigne de soufflage change avec la saison : ${d.tsH} °C sous ${d.saison} °C dehors, ${d.tsE} °C au-dessus. Le by-pass du récupérateur, le seuil de saison et les plages du séquenceur sont des données de l’exercice. Ce geste sert à l’exercice 3 de la feuille du niveau 1 et à l’exercice 4 du niveau 2.`,
      prompt: "Partez du milieu de la figure et allez vers la gauche : quel organe s’ouvre en premier ? Puis vers la droite.",
      render: () => figure(EX.img.seq, `Graphique : en bas, le besoin, de grand besoin de chaud à gauche à grand besoin de froid à droite, le milieu sans besoin ; à gauche, l’ouverture de 0 à 100 %. En orange, le récupérateur : à 0 au milieu, il monte à 100 % sur les ${d.rec[1]} premiers pour cent du besoin de chaud, puis reste à 100 %. En rouge, la batterie chaude : fermée jusqu’à ${d.bc[0]} % du besoin de chaud, elle s’ouvre jusqu’à 100 % au bout. Côté froid, de 0 à ${d.neutre[1]} %, by-pass ouvert, rien ne s’ouvre ; en bleu, la batterie froide s’ouvre de ${d.bf[0]} à 100 % du besoin de froid.`, "Le séquenceur : le récupérateur d’abord, puis la batterie chaude ; côté froid, le by-pass, puis la batterie froide")
        + tableau(["Organe", "Plage du signal du régulateur"], [
          ["Récupérateur (by-pass qui se ferme)", `${d.rec[0]} à ${d.rec[1]} % du besoin de chaud`],
          ["Batterie chaude", `${d.bc[0]} à ${d.bc[1]} % du besoin de chaud`],
          ["By-pass ouvert, air neuf seul", `${d.neutre[0]} à ${d.neutre[1]} % du besoin de froid`],
          ["Batterie froide", `${d.bf[0]} à ${d.bf[1]} % du besoin de froid`]
        ], "Les plages du séquenceur, données de l’exercice")
    }),
    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, une matinée d’été", title: "Entraînement : l’ordre de la séquence en été", level: "appliquer", requiresAction: true,
      text: {
        1: `Un jour d’été, il fait 30 °C dehors à l’ouverture, l’air repris est à ${d.trE} °C. Rangez les actions de la CTA dans l’ordre. Le séquenceur reste sous vos yeux.`,
        2: `Un jour d’été, il fait 30 °C dehors à l’ouverture, l’air repris est à ${d.trE} °C. Rangez les actions de la CTA dans l’ordre. Sans la figure.`
      },
      prompt: { 1: "Cliquez sur les actions dans l’ordre, en vous aidant de la figure.", 2: "Cliquez sur les actions dans l’ordre. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est aux écrans « Le séquenceur : hiver et été » et « Horaires, arrêt et antigel ».", "Rien ne se règle avant que la CTA ne démarre.", "L’air extérieur est plus chaud que la reprise : le by-pass se ferme."],
        2: ["La méthode est aux écrans « Le séquenceur : hiver et été » et « Horaires, arrêt et antigel ».", "Démarrage, récupérateur, batterie, réglage, arrêt.", "Comparez l’air extérieur à la reprise."]
      },
      ...BE.parNiveau({
        1: (() => { const o = BE.ordre(EX.ordre.items, EX.ordre.indices); return { render: item => figure(EX.img.seq, "Le séquenceur de la méthode, rappelé ici.", "Le séquenceur, pour vous aider. Côté froid, le by-pass ne reste ouvert que si l’air extérieur est plus frais que la reprise ; plus chaud, il se ferme") + o.render(item), wire: o.wire }; })(),
        2: BE.ordre(EX.ordre.items, EX.ordre.indices)
      })
    }),
    BE.ecran({
      id: "marche-arret-antigel", dossier: "methode", kicker: "La méthode, 5", title: "Horaires, arrêt et antigel", level: "comprendre",
      text: `La CTA suit le scénario d’occupation du CCTP : du ${d.jours}, de ${d.debut} à ${d.fin}. À l’heure d’ouverture, les registres d’air neuf et de rejet s’ouvrent, puis les ventilateurs démarrent. Hors horaires, la CTA est arrêtée : ventilateurs arrêtés, registres et vannes fermés ; on ne paie ni l’air neuf ni sa chaleur quand personne n’est là. Le thermostat antigel reste surveillé jour et nuit : si l’air descend sous ${d.antigel} °C juste après la batterie chaude, il arrête les ventilateurs, ferme les registres et ouvre en grand la vanne de la batterie chaude, pour que l’eau ne gèle pas dans les tubes, et il donne une alarme. Un pressostat mesure la différence de pression de part et d’autre d’un filtre : plus le filtre s’encrasse, plus elle monte. Les pressostats des filtres et le contrôle des ventilateurs donnent des alarmes ; la station ne les place pas sur le schéma. Le seuil de ${d.antigel} °C et ces actions sont des données de l’exercice. Ce geste sert à l’exercice 3 de la feuille du niveau 1 et à l’exercice 4 du niveau 2.`,
      prompt: "Lisez la journée sur la figure : quand la CTA tourne-t-elle, quand l’antigel est-il surveillé ?",
      render: () => figure(EX.img.jour, `Une journée de 0 à 24 h. Barre du haut, la CTA : en marche de ${d.debut} à ${d.fin}, arrêtée avant et après. Barre du bas, l’antigel : surveillé de 0 à 24 h.`, `Une journée de la CTA : en marche aux horaires du CCTP, antigel surveillé jour et nuit`)
    }),
    BE.ecran({
      id: "sonde-co2", dossier: "methode", kicker: "La méthode, 6", title: "La sonde de CO₂ en 0-10 V", level: "comprendre",
      text: "La teneur en CO₂ de l’air dit combien de personnes respirent dans la salle ; elle se compte en ppm, parties par million. La sonde du CCTP mesure de 0 à 2 000 ppm et envoie au régulateur une tension de 0 à 10 V, proportionnelle à la teneur : 0 V pour 0 ppm, 10 V pour 2 000 ppm. Chaque volt vaut donc 2 000 ÷ 10 = 200 ppm. Tension = teneur ÷ 2 000 × 10 ; teneur = tension ÷ 10 × 2 000. On peut aussi lire la tension sur la droite de la figure, au dixième de volt. Ce geste sert à l’exercice 2 du niveau 1 et à l’exercice 3 du niveau 2.",
      prompt: "Suivez les traits de lecture sur la figure, puis lisez l’exemple résolu.",
      render: () => figure(EX.img.co2, `Graphique : la teneur en CO₂ en bas, de 0 à 2 000 ppm, grille tous les 100 ppm ; la tension à gauche, de 0 à 10 V, grille tous les 0,5 V. Une droite orange part de zéro et monte jusqu’à 10 V à 2 000 ppm. Des traits de lecture partent de ${m.ppm} ppm et arrivent à ${m.V} V.`, `La sonde de CO₂ du CCTP : la tension suit la teneur, ${m.ppm} ppm donne ${m.V} V`)
        + exempleSonde()
    }),
    BE.ecran({
      id: "exercice-4", dossier: "methode", kicker: "Entraînement 4, le signal 0-10 V", title: "Entraînement : le signal d’une sonde", level: "appliquer", requiresAction: true,
      text: {
        1: `Une autre sonde mesure de ${EX.ex4.min} à ${EX.ex4.max} ppm en 0-10 V. Elle envoie ${EX.ex4.V} V. Quelle teneur lit le régulateur ? L’exemple résolu reste sous vos yeux.`,
        2: `Une autre sonde mesure de ${EX.ex4.min} à ${EX.ex4.max} ppm en 0-10 V. Elle envoie ${EX.ex4.V} V. Quelle teneur lit le régulateur ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la teneur, en vous aidant de l’exemple.", 2: "Choisissez la teneur. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La sonde de CO₂ en 0-10 V ».", "Prenez la plage de cette sonde, donnée dans l’énoncé.", "Teneur = tension ÷ 10 × étendue de la sonde."],
        2: ["La méthode est à l’écran « La sonde de CO₂ en 0-10 V ».", "Combien vaut un volt pour cette sonde ?", "Teneur = tension ÷ 10 × étendue."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleSonde(), BE.quiz(EX.ex4.quiz)),
        2: BE.quiz(EX.ex4.quiz)
      })
    }),
    BE.ecran({
      id: "registre-salle", dossier: "methode", kicker: "La méthode, 7", title: "Le débit de la salle de réunion", level: "comprendre",
      text: `La salle de réunion reçoit huit personnes au plus, mais elle reste souvent vide. Son débit d’air neuf suit la teneur en CO₂, par un registre motorisé sur sa gaine (CCTP page 2). Le débit réglementaire vaut ${d.max} m³/h, 30 m³/h par personne (Code du travail, station E2) ; le débit de veille en vaut ${d.veillePc} %, soit ${d.veille} m³/h (CCTP page 2). La loi du registre est une donnée de l’exercice : sous ${d.bas} ppm, le registre reste à la veille ; à partir de 1 000 ppm, la consigne du CCTP, il est grand ouvert ; entre les deux, le débit suit une droite, q = ${d.veille} + (${d.max} − ${d.veille}) × (C − ${d.bas}) ÷ (${d.haut} − ${d.bas}), avec C la teneur en ppm. Cette bande de 200 ppm est une action proportionnelle. Le régulateur passe la tension de la sonde en teneur, puis la teneur en débit. Quand le registre de la salle se ferme, le débit d’air neuf de la CTA baisse : le débit du bâtiment des exercices est donc le débit au plus, salle grande ouverte. Ce qui règle la vitesse des ventilateurs, variable au CCTP, est hors de la station. Ce geste sert à l’exercice 3 du niveau 2.`,
      prompt: "Suivez les traits de lecture sur la figure, puis lisez l’exemple résolu.",
      render: () => figure(EX.img.reg, `Graphique : la teneur en CO₂ en bas, de 0 à 1 400 ppm ; le débit à gauche, de 0 à 260 m³/h. Une ligne orange reste à ${d.veille} m³/h jusqu’à ${d.bas} ppm, monte en droite jusqu’à ${d.max} m³/h à 1 000 ppm, puis reste à ${d.max} m³/h. Des traits de lecture partent de ${m.rppm} ppm et arrivent à ${m.rq} m³/h.`, `La loi du registre de la salle, donnée de l’exercice : ${m.rppm} ppm donne ${m.rq} m³/h`)
        + exempleRegistre()
    }),
    BE.ecran({
      id: "sequence-ecrite", dossier: "methode", kicker: "La méthode, 8", title: "La séquence écrite et la note", level: "comprendre",
      text: "La séquence se rédige par rubriques, une ou deux phrases chacune : marche et arrêt, hiver, été, salle de réunion, sécurités. Chaque phrase dit ce qui se passe, ce qui le commande et la consigne. La première page de la note de calcul dit l’objet, les hypothèses avec leurs sources et ce que l’on transmet pour la suite : la liste des sondes, des organes commandés, des consignes et des horaires sert à la supervision (station R3). L’exemple remplit la rubrique « Marche et arrêt » ; les autres rubriques se rédigent avec les écrans de la méthode. Ce geste sert aux exercices 4 et 5 de la feuille du niveau 2.",
      prompt: "Lisez la rubrique remplie, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Séquence"], [
        ["Marche et arrêt", `Du ${d.jours}, de ${d.debut} à ${d.fin} : les registres d’air neuf et de rejet s’ouvrent, puis les ventilateurs démarrent. Hors horaires, la CTA est arrêtée, registres et vannes fermés.`],
        ["Hiver", "À écrire : consigne, ordre du récupérateur et de la batterie chaude, sonde qui commande."],
        ["Été", "À écrire : consigne, by-pass selon l’air extérieur et la reprise, batterie froide."],
        ["Salle de réunion", "À écrire : sonde, loi du registre."],
        ["Sécurités", "À écrire : antigel et alarmes."]
      ], "La séquence de régulation : la première rubrique remplie")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

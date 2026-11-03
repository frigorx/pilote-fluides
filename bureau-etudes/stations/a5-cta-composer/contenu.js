/* Station BE-A5 : CTA 1 : composer.
   Volet tertiaire : le bâtiment de bureaux du fil rouge tertiaire (fil-rouge/tertiaire/). Méthode sur le noyau du bâtiment (le
   bureau et la salle de réunion, bâtiment d'exemple des stations T5 à T8), avec l'échangeur à plaques de la base du CCTP ; niveau 1
   sur le même noyau avec la roue de la variante ; niveau 2 sur le bâtiment entier avec les plaques. Les valeurs de l'exemple (bloc
   EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/a5-cta-composer/construire.mjs, depuis
   corriges/a5-cta-composer/reference-cta.json (outils/a5-cta-tertiaire.mjs) et exemple-data.mjs. Les figures de illustrations/ sont
   tracées par le même outil (schema.mjs). Aucune valeur calculée du niveau 1 ni du niveau 2 n'est écrite dans cette station : seules
   les bornes des fourchettes et les données des commandes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/tertiaire/";

/*EXEMPLE-DEBUT*/
const EX = {
 "d": {
  "nBUR": "2",
  "nREU": "8",
  "tBUR": "25",
  "tREU": "30",
  "qBUR": "50",
  "qREU": "240",
  "qN": "290",
  "qBat": "440",
  "etaP": "0,54",
  "etaR": "0,78",
  "hiv": {
   "te": "−7",
   "hr": "90",
   "tr": "19",
   "ts": "19"
  },
  "ete": {
   "te": "32",
   "hr": "40",
   "tr": "26",
   "ts": "17"
  },
  "int": {
   "hr": "50",
   "x": "10,5"
  },
  "batP": "9,9",
  "batH": "14"
 },
 "m": {
  "qm": "0,0967",
  "h": {
   "x": "2,0",
   "hE": "−2",
   "t2": "7,04",
   "h2": "12",
   "h3": "24",
   "hrS": "15",
   "Pbc": "1 179",
   "PbcLu": "1 160",
   "PbcEx": "1 167",
   "ecartLu": "−1,6",
   "ecartEx": "−1,0",
   "Psans": "2 564",
   "Precup": "1 384",
   "dT": "11,96",
   "dTsans": "26"
  },
  "e": {
   "x": "11,9",
   "hE": "63",
   "rosee": "16,7",
   "t2": "28,76",
   "h2": "59",
   "h3": "47",
   "hrS": "98",
   "Pbf": "1 160",
   "PbfLu": "1 160",
   "PbfEx": "1 169",
   "ecartEx": "0,8",
   "Psans": "1 479",
   "PsansEx": "1 491",
   "Precup": "319",
   "dT": "11,76",
   "dTsans": "15"
  }
 },
 "ex1": {
  "items": [
   "Prise d’air neuf et son registre",
   "Filtre d’air neuf",
   "Récupérateur",
   "Batterie chaude",
   "Batterie froide",
   "Ventilateur de soufflage"
  ],
  "aides": [
   "L’air neuf entre d’abord par la prise d’air et son registre.",
   "Le filtre vient avant ce qu’il protège : le récupérateur et les batteries.",
   "Le récupérateur prend la chaleur de l’air repris avant que les batteries travaillent.",
   "Dans l’ordre du CCTP, la batterie chaude vient avant la batterie froide.",
   "La batterie froide vient juste avant le ventilateur.",
   "Le ventilateur de soufflage pousse l’air dans les gaines, en dernier."
  ]
 },
 "ex2": {
  "te": "2",
  "tr": "20",
  "eta": "0,60",
  "quiz": {
   "choices": [
    "12,0 °C",
    "14,0 °C",
    "12,8 °C",
    "9,2 °C"
   ],
   "good": 2,
   "explain": "2 + 0,60 × (20 − 2) = 2 + 10,8 = 12,8 °C. 12,0 °C applique l’efficacité à l’air repris seul ; 14,0 °C oublie de retirer θe de l’écart ; 9,2 °C est la température de l’air repris à sa sortie, côté rejet, quand les deux débits sont égaux."
  }
 },
 "ex3": {
  "qv": "1 000",
  "te": "−5",
  "t2": "10",
  "ts": "20",
  "quiz": {
   "choices": [
    "8 500 W",
    "5 100 W",
    "0,94 W",
    "3 400 W"
   ],
   "good": 3,
   "explain": "0,34 × 1 000 × (20 − 10) = 3 400 W. 8 500 W part de l’air extérieur, comme s’il n’y avait pas de récupérateur ; 5 100 W est ce que fournit le récupérateur, de −5 à 10 °C ; 0,94 W divise par 3 600, alors que le 0,34 tient déjà compte des heures."
  }
 },
 "ex4": {
  "te": "30",
  "rosee": "18",
  "ts": "15",
  "quiz": {
   "choices": [
    "Oui : à 15 °C, sous sa rosée de 18 °C, l’air dépose de l’eau sur la batterie",
    "Non : une batterie froide ne change jamais l’humidité absolue de l’air",
    "Non : il faudrait souffler sous 0 °C pour que l’eau se dépose",
    "Oui, parce que l’humidité relative monte quand l’air refroidit"
   ],
   "good": 0,
   "explain": "La batterie descend l’air à 15 °C, sous sa rosée de 18 °C : la vapeur se dépose en eau sur les ailettes, x baisse, l’air sort plus sec. Une batterie qui reste au-dessus de la rosée ne change pas x ; l’eau se dépose dès la rosée, bien au-dessus de 0 °C ; l’humidité relative qui monte ne retire aucune eau tant que l’air reste au-dessus de sa rosée."
  }
 },
 "img": {
  "principe": "illustrations/principe-cta.svg",
  "melange": "illustrations/melange.svg",
  "recup": "illustrations/recuperateur.svg",
  "diagHiver": "illustrations/diagramme-hiver.svg",
  "diagEte": "illustrations/diagramme-ete.svg",
  "diagVierge": "illustrations/diagramme-vierge.svg",
  "barresHiver": "illustrations/barres-hiver.svg",
  "barresEte": "illustrations/barres-ete.svg"
 }
};
/*EXEMPLE-FIN*/

const d = EX.d, H = EX.m.h, E = EX.m.e;
/* Une figure s'ouvre en grand d'un toucher (au téléphone, le doigt l'agrandit ensuite). */
const figure = (src, alt, legende) => `<figure class="schema"><a href="${BE.esc(src)}" target="_blank" rel="noopener"><img src="${BE.esc(src)}" alt="${BE.esc(alt)}"></a><figcaption>${BE.esc(legende.replace(/\.?$/, "."))} Touchez la figure pour l’ouvrir en grand.</figcaption></figure>`;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const altDiagramme = "Diagramme de l’air humide : la température sèche en bas, de −10 à 40 °C ; l’humidité absolue x à droite, de 0 à 20 g/kg d’air sec ; la courbe épaisse de saturation, à 100 %, à gauche ; les courbes d’humidité relative de 10 à 90 % ; les droites d’enthalpie en tirets, qui descendent vers la droite, notées de 0 à 70 kJ/kg au bord de la saturation.";
const liensCctp = () => BE.liens([
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment", note: "Conditions de calcul page 1, occupation et ventilation page 2, CTA page 3" },
  { href: DOSSIER + "plans-tertiaire.pdf", title: "Les plans du bâtiment", note: "Les locaux et le local technique de la CTA" }
]);
const exempleDebit = () => BE.exemple({ text: `Noyau du bâtiment : ${d.nBUR} occupants dans le bureau, ${d.nREU} dans la salle de réunion (CCTP page 2)`, answer: `${d.nBUR} × ${d.tBUR} + ${d.nREU} × ${d.tREU} = ${d.qBUR} + ${d.qREU} = ${d.qN} m³/h d’air neuf, soufflés par la CTA`, why: "Sans recyclage, la CTA souffle l’air neuf et rien d’autre : son débit est la somme des débits d’air neuf des locaux qu’elle dessert." });
const exempleRecup = () => BE.exemple({ text: `Noyau, échangeur à plaques η = ${d.etaP} : hiver ${d.hiv.te} °C dehors et ${d.hiv.tr} °C repris ; été ${d.ete.te} °C dehors et ${d.ete.tr} °C repris`, answer: `hiver : θ2 = ${d.hiv.te} + ${d.etaP} × (${d.hiv.tr} − (${d.hiv.te})) = ${H.t2} °C ; été : θ2 = ${d.ete.te} + ${d.etaP} × (${d.ete.tr} − ${d.ete.te}) = ${E.t2} °C`, why: "La même formule sert aux deux saisons. L’été, l’écart (θ reprise − θe) est négatif : l’air neuf se refroidit." });
const exempleHiver = () => BE.exemple({ text: `Noyau, l’hiver : E à ${d.hiv.te} °C et ${d.hiv.hr} %, 2 à ${H.t2} °C, S à ${d.hiv.ts} °C`, answer: `x ≈ ${H.x} g/kg en E, en 2 et en S ; h ≈ ${H.hE} kJ/kg en E, ${H.h2} en 2, ${H.h3} en S ; humidité relative en S vers ${H.hrS} %`, why: "Les h se lisent au kJ/kg près sur les droites en tirets. L’humidité relative de S se lit entre les courbes de 10 et de 20 %." });
const exempleChaude = () => BE.exemple({ text: `Noyau : ${d.qN} m³/h, de ${H.t2} °C à ${d.hiv.ts} °C`, answer: `P = 0,34 × ${d.qN} × (${d.hiv.ts} − ${H.t2}) = ${H.Pbc} W ; recoupement : qm = 1,2 × ${d.qN} ÷ 3 600 = ${EX.m.qm} kg/s, P = ${EX.m.qm} × (${H.h3} − ${H.h2}) ≈ ${H.PbcLu} W ; sans récupérateur : 0,34 × ${d.qN} × ${H.dTsans} = ${H.Psans} W`, why: `Écart entre les deux calculs : ${H.ecartLu} % avec des h lus au kJ/kg près, ${H.ecartEx} % avec des h calculés. Le récupérateur reprend ${H.Precup} W à l’air rejeté.` });
const exempleEte = () => BE.exemple({ text: `Noyau, l’été : E à ${d.ete.te} °C et ${d.ete.hr} %, 2 à ${E.t2} °C, S à ${d.ete.ts} °C`, answer: `x ≈ ${E.x} g/kg ; rosée de E vers ${E.rosee} °C ; h ≈ ${E.hE} kJ/kg en E, ${E.h2} en 2, ${E.h3} en S ; humidité relative en S vers ${E.hrS} %`, why: `S, à ${d.ete.ts} °C, reste au-dessus de la rosée : l’air garde son eau, et la batterie ne fait que le refroidir.` });
const exempleFroide = () => BE.exemple({ text: `Noyau : ${d.qN} m³/h, de ${E.t2} °C à ${d.ete.ts} °C, au-dessus de la rosée`, answer: `P = 0,34 × ${d.qN} × (${E.t2} − ${d.ete.ts}) = ${E.Pbf} W ; recoupement : ${EX.m.qm} × (${E.h2} − ${E.h3}) ≈ ${E.PbfLu} W ; sans récupérateur : 0,34 × ${d.qN} × ${E.dTsans} = ${E.Psans} W`, why: `Avec des h calculés, qm × Δh donne ${E.PbfEx} W, à ${E.ecartEx} % du 0,34. Le récupérateur épargne ${E.Precup} W à la batterie froide.` });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Le débit du noyau est celui de l’exemple. L’efficacité de la roue, η = ${d.etaR}, est à la page 3 du CCTP ; l’air extérieur et les températures intérieures à la page 1. Le diagramme vierge est au verso de la feuille réponse.`,
      "Exercice 1 de la feuille : écrans « La CTA et ses sections » et « Mélange ou air neuf seul ». Exercice 2 : écran « L’efficacité du récupérateur ». Exercice 3 : écrans « L’hiver sur le diagramme » et « La batterie chaude ». Exercice 4 : écrans « L’été sur le diagramme » et « La batterie froide ».",
      `Sur l’exemple, avec les plaques, l’air sort du récupérateur à ${H.t2} °C l’hiver et ${E.t2} °C l’été. Avec la roue, refaites les mêmes calculs avec η = ${d.etaR} : la batterie chaude travaille moins.`
    ],
    2: [
      "Les données sont dans le CCTP du bâtiment : occupants et catégorie de chaque local page 2, CTA page 3, conditions de calcul page 1. Le débit d’air neuf par occupant est à l’écran « Mélange ou air neuf seul ».",
      "Cinq gestes déjà vus : les sections et le débit, l’efficacité du récupérateur, l’hiver puis l’été sur le diagramme, les deux batteries avec et sans récupérateur. Rédigez enfin la première page de la note.",
      "Commencez par le débit : additionnez le débit d’air neuf de chaque local, les sanitaires à zéro. C’est lui qui change par rapport à l’exemple."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensProjet = n => BE.liens(n === 1 ? [
  { href: EX.img.diagVierge, title: "Le diagramme de l’air humide vierge", note: "Le même qu’au verso de la feuille réponse, à ouvrir en grand" },
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment", note: "Air extérieur page 1, CTA et roue page 3" }
] : [
  { href: EX.img.diagVierge, title: "Le diagramme de l’air humide vierge, à imprimer", note: "Une page A4 : tracez-y l’hiver et l’été" },
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment", note: "Pages 1 à 3" },
  { href: DOSSIER + "plans-tertiaire.pdf", title: "Les plans du bâtiment", note: "Les locaux et le local technique" }
]);
ecranProjet.render = () => { const html = rendreCommande(); if (html.includes("partie-reservee")) return html; return html + liensProjet(html.includes("niveau autonome") ? 2 : 1); };

BE.station({
  code: "BE-A5",
  titre: "CTA 1 : composer",
  ligne: "Aéraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le noyau du bâtiment de bureaux, avec la roue de la variante : sections, débit, récupérateur, hiver et été sur le diagramme, batteries, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Le bâtiment de bureaux entier : schéma de principe, débit, récupérateur, batteries avec et sans récupérateur, note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Le bâtiment de bureaux du projet est ventilé par une centrale de traitement d’air, la CTA, placée dans le local technique. Le bureau d’études la compose : il range ses sections dans l’ordre de l’air, trace sur le diagramme de l’air humide ce que devient l’air neuf l’hiver et l’été, calcule la température à la sortie du récupérateur et la puissance des batteries chaude et froide. Vous apprenez la méthode sur le noyau du bâtiment, le bureau et la salle de réunion, puis vous la refaites avec la roue, puis seul sur le bâtiment entier.",
  note: "Le bâtiment de bureaux et son CCTP sont des données d’exercice écrites pour le réseau. Les débits d’air neuf suivent le Code du travail (art. R. 4222-6). Les efficacités des récupérateurs, les températures de soufflage et l’air extérieur sont des valeurs d’exercice du CCTP ; la roue est comptée sans transfert d’humidité. Le diagramme de l’air humide et ses formules sont ceux de la station A1.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur le noyau du bâtiment" },
    { id: "projet", label: "Le projet", note: "commande, CCTP et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "La CTA du noyau avec la variante du CCTP : une roue à la place de l’échangeur à plaques",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études a composé la CTA du noyau avec l’échangeur à plaques (écrans de la méthode). Le CCTP propose une variante : une roue, d’efficacité η = ${d.etaR} (page 3). Donnée de l’exercice : la roue est comptée en sensible seul, comme les plaques ; l’air repris est à la température intérieure. Le débit, l’air extérieur et le soufflage ne changent pas. Suivez les étapes dans l’ordre.`,
        "Étape 1. Écrivez les sections de l’air neuf dans l’ordre, dites s’il y a recyclage ou humidification, et posez le calcul du débit soufflé.",
        `Étape 2. Calculez la température de l’air neuf à la sortie de la roue, l’hiver puis l’été.`,
        "Étape 3. Tracez E, 2 et S l’hiver sur le diagramme du verso, lisez x, les h et l’humidité relative de l’air soufflé, puis calculez la batterie chaude et recoupez-la.",
        "Étape 4. Tracez E, 2 et S l’été, lisez la rosée de E et les h, dites si la batterie sèche l’air, puis calculez la batterie froide et recoupez-la. Vérifiez vos cinq résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Extrait de CCTP du bâtiment", ou: "Lien ci-dessous : page 1 et page 3" },
        { piece: "Diagramme de l’air humide vierge", ou: "Au verso de la feuille réponse, et lien ci-dessous" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "La CTA du bâtiment entier : schéma de principe, débit, récupérateur, batteries, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études compose la CTA de tout le bâtiment de bureaux, avec l’échangeur à plaques de la base du CCTP (page 3). Données : le CCTP, pages 1 à 3 (conditions de calcul, occupants et catégorie de chaque local, sections, récupérateur, soufflage) ; le débit minimal d’air neuf par occupant du Code du travail. Données de l’exercice : l’air repris est à la température intérieure ; ρ = 1,2 kg/m³. Nommez les sections du schéma de principe et calculez le débit soufflé. Tracez l’hiver et l’été sur le diagramme vierge. Calculez la température après le récupérateur, la batterie chaude et la batterie froide, chacune recoupée par le diagramme, puis ce qu’elles seraient sans récupérateur. Dites si l’air soufflé est sec l’hiver et si la batterie froide sèche l’air l’été. Rédigez la première page de la note de calcul.`,
      pieces: [
        { piece: "Extrait de CCTP du bâtiment", ou: "Lien ci-dessous, pages 1 à 3" },
        { piece: "Diagramme de l’air humide vierge", ou: "Lien ci-dessous, une page A4 à imprimer" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },
  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-t2h", libelle: "Température de l’air neuf après la roue, l’hiver, en °C", unite: "°C", min: 12.78, max: 13.78, indice: "Relisez l’écran « L’efficacité du récupérateur » : θ2 = θe + η × (θ reprise − θe), avec l’air extérieur d’hiver, l’air repris à 19 °C et l’efficacité de la roue." },
      { id: "n1-pbc", libelle: "Puissance de la batterie chaude, en W", unite: "W", min: 547, max: 581, indice: "Relisez l’écran « La batterie chaude » : P = 0,34 × qv × (θ soufflage − θ2), avec θ2 la température après le récupérateur, pas l’air extérieur." },
      { id: "n1-t2e", libelle: "Température de l’air neuf après la roue, l’été, en °C", unite: "°C", min: 26.82, max: 27.82, indice: "Relisez l’écran « L’efficacité du récupérateur » : la même formule l’été, avec l’air extérieur à 32 °C et l’air repris à 26 °C ; θ2 tombe entre les deux." },
      { id: "n1-h2e", libelle: "Enthalpie de l’air neuf après la roue, l’été, lue sur le diagramme, en kJ/kg", unite: "kJ/kg", min: 55.8, max: 59.9, indice: "Relisez l’écran « L’été sur le diagramme » : placez 2 sur l’horizontale de E, à la température après le récupérateur, puis lisez h sur les droites en tirets." },
      { id: "n1-pbf", libelle: "Puissance de la batterie froide, en W", unite: "W", min: 994, max: 1057, indice: "Relisez l’écran « La batterie froide » : P = 0,34 × qv × (θ2 − θ soufflage) tant que l’air reste au-dessus de sa rosée ; qm × Δh le recoupe." }
    ],
    2: [
      { id: "n2-pbc", libelle: "Puissance de la batterie chaude du bâtiment, en W", unite: "W", min: 1735, max: 1843, indice: "Relisez les écrans « Mélange ou air neuf seul » et « La batterie chaude » : le débit est celui du bâtiment entier, la somme des débits d’air neuf de chaque local ; P = 0,34 × qv × (θ soufflage − θ2)." },
      { id: "n2-pbf", libelle: "Puissance de la batterie froide du bâtiment, en W", unite: "W", min: 1720, max: 1827, indice: "Relisez les écrans « Mélange ou air neuf seul » et « La batterie froide » : débit du bâtiment entier ; P = 0,34 × qv × (θ2 − θ soufflage)." },
      { id: "n2-psh", libelle: "Puissance de la batterie chaude sans récupérateur, en W", unite: "W", min: 3772, max: 4007, indice: "Relisez l’écran « La batterie chaude » : sans récupérateur, la batterie porte l’air de la température extérieure d’hiver à celle du soufflage." },
      { id: "n2-pse", libelle: "Puissance de la batterie froide sans récupérateur, en W", unite: "W", min: 2194, max: 2330, indice: "Relisez l’écran « La batterie froide » : sans récupérateur, la batterie descend l’air de 32 °C à 17 °C ; reportez le calcul 0,34 × qv × Δθ." }
    ]
  },
  /*FOURCHETTES-FIN*/
  suivante: { code: "BE-A6", titre: "CTA 2 : sélectionner", href: "../a6-cta-selectionner/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Architecture d’une CTA", href: "../../../aerorezo/stations/architecture-cta/index.html", pourquoi: "Les sections d’une centrale et leur ordre." },
    { reseau: "AéroRézo", titre: "Mélange et filtration", href: "../../../aerorezo/stations/melange-filtration/index.html", pourquoi: "Le caisson de mélange et les filtres." },
    { reseau: "AéroRézo", titre: "Batteries chaude et froide", href: "../../../aerorezo/stations/batteries/index.html", pourquoi: "Ce que fait une batterie à l’air, sur le diagramme." },
    { reseau: "AéroRézo", titre: "Récupération d’énergie", href: "../../../aerorezo/stations/recuperation/index.html", pourquoi: "L’efficacité d’un récupérateur, relevée au bon endroit." },
    { reseau: "AéroRézo", titre: "Humidifier et réguler", href: "../../../aerorezo/stations/humidifier-reguler/index.html", pourquoi: "L’humidification que le CCTP du projet ne prévoit pas." },
    { reseau: "Bureau d’études", titre: "BE-A1, L’air humide", href: "../a1-air-humide/index.html", pourquoi: "Le diagramme, ses lectures et Φ = qm × Δh." }
  ],
  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Le bâtiment de bureaux du projet est ventilé en double flux par une centrale de traitement d’air, la CTA, placée dans le local technique. Elle prend l’air neuf dehors, le filtre, le réchauffe ou le refroidit et le souffle dans les locaux ; elle reprend l’air des locaux et le rejette dehors, après lui avoir pris sa chaleur. Le bureau d’études compose la CTA : il range ses sections dans l’ordre de l’air, trace sur le diagramme de l’air humide ce que devient l’air neuf l’hiver et l’été, calcule la température à la sortie du récupérateur et la puissance des deux batteries. Il dessine le schéma de principe pour le dossier. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Saison", "Après le récupérateur (°C)", "Batterie", "Puissance (W)"], [
        ["Hiver", "", "chaude", ""],
        ["Été", "", "froide", ""]
      ], "La CTA du projet, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "la CTA du bâtiment."], ["Le dossier :", "le CCTP et ses conditions de calcul, les débits d’air neuf, le diagramme de l’air humide."]] },
          { title: "Vous produisez", rows: [["Le schéma :", "les sections dans l’ordre de l’air."], ["Les résultats :", "l’air après le récupérateur, les deux batteries. Vérification à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "comparer deux centrales, à la station A6."]] }
        ])
    }),
    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Le CCTP du bâtiment donne presque tout : les conditions de calcul à la page 1, les occupants de chaque local à la page 2, la CTA à la page 3 (ses sections, l’absence de recyclage et d’humidification, les deux récupérateurs, les températures de soufflage). Le débit d’air neuf par occupant vient du Code du travail. Deux données sont propres à l’exercice : la roue est comptée sans transfert d’humidité, et l’air repris entre dans le récupérateur à la température intérieure. Le diagramme de l’air humide est celui de la station A1, la formule 0,34 × qv × Δθ celle de la station T4.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        [`Air extérieur : ${d.hiv.te} °C et ${d.hiv.hr} % l’hiver, ${d.ete.te} °C et ${d.ete.hr} % l’été`, "CCTP page 1, valeurs d’exercice"],
        [`Air intérieur : ${d.hiv.tr} °C l’hiver, ${d.ete.tr} °C et ${d.int.hr} % l’été`, "CCTP page 1, valeurs d’exercice"],
        ["Occupants et catégorie de chaque local", "CCTP page 2"],
        [`Air neuf : ${d.tBUR} m³/h par occupant en bureau, ${d.tREU} en salle de réunion`, "Code du travail, art. R. 4222-6 (station E2)"],
        ["Sections, pas de recyclage, pas d’humidification", "CCTP page 3"],
        [`Récupérateur : plaques η = ${d.etaP} (base), roue η = ${d.etaR} (variante)`, "CCTP page 3, valeurs d’exercice"],
        [`Soufflage : ${d.hiv.ts} °C l’hiver, ${d.ete.ts} °C l’été`, "CCTP page 3, valeurs d’exercice"],
        ["Roue sans transfert d’humidité ; air repris à la température intérieure", "Données de l’exercice"],
        ["Diagramme de l’air humide ; ρ = 1,2 kg/m³", "Station A1"],
        ["P = 0,34 × qv × Δθ", "Station T4 (règles Th-Bât)"]
      ], "Les données de la CTA")
        + liensCctp()
    }),
    BE.ecran({
      id: "les-sections", dossier: "methode", kicker: "La méthode, 1", title: "La CTA et ses sections", level: "comprendre",
      text: "Une CTA est une suite de sections que l’air traverse dans un ordre fixé. Le CCTP les donne à la page 3, dans l’ordre de l’air. L’air neuf entre par la prise d’air et son registre, un volet motorisé qui se ferme à l’arrêt. Le filtre arrête les poussières avant qu’elles n’encrassent le récupérateur et les batteries. Le récupérateur lui passe une partie de la chaleur de l’air repris. La batterie chaude, parcourue par l’eau chaude de la pompe à chaleur, le réchauffe l’hiver ; la batterie froide, parcourue par l’eau glacée du groupe, le refroidit l’été. Le ventilateur de soufflage le pousse dans les gaines. L’air repris dans les locaux traverse son filtre, son ventilateur et le récupérateur, puis sort par le rejet et son registre. Le schéma de principe dessine ces sections avec leurs symboles, sans échelle ; il fait partie du dossier rendu. Ce geste sert à l’exercice 1 de la feuille.",
      prompt: "Suivez l’air neuf sur le schéma, de la prise d’air au soufflage, puis l’air repris jusqu’au rejet.",
      render: () => figure(EX.img.principe, "Schéma de principe de la CTA, sur deux étages dans un caisson. En bas, l’air neuf entre à gauche et traverse dans l’ordre : 1, la prise d’air neuf et son registre, un carré barré d’un volet ; 2, le filtre d’air neuf, un rectangle en zigzag ; 3, le récupérateur, un échangeur à plaques à cheval sur les deux étages ; 4, la batterie chaude et 5, la batterie froide, deux rectangles barrés d’une diagonale ; 6, le ventilateur de soufflage ; il sort à droite vers le soufflage. En haut, l’air repris entre à droite et traverse : 7, la reprise et son filtre ; 8, le ventilateur de reprise ; le récupérateur ; 9, le rejet et son registre ; il sort à gauche. Une légende nomme les neuf sections.", "Le schéma de principe de la CTA du projet : neuf sections, dans l’ordre du CCTP")
        + BE.renvoi('Les sections d’une centrale sont présentées dans AéroRézo, <a href="../../../aerorezo/stations/architecture-cta/index.html">« Architecture d’une CTA »</a>.')
    }),
    BE.ecran({
      id: "melange-ou-air-neuf", dossier: "methode", kicker: "La méthode, 2", title: "Mélange ou air neuf seul : le débit", level: "comprendre",
      text: `Beaucoup de CTA recyclent une partie de l’air repris : un caisson de mélange, avec ses registres, l’ajoute à l’air neuf avant les batteries. Le CCTP du projet l’exclut : pas de recyclage, la CTA traite de l’air neuf seul. Le débit soufflé est donc le débit d’air neuf, la somme des débits des locaux. On la prend sans foisonnement : chaque local peut être plein. Le CCTP note que tous ne le sont pas en même temps et que le débit de la salle de réunion varie avec sa présence ; la CTA se dimensionne quand même sur la somme des débits pleins. Chacun se calcule par ses occupants, au minimum du Code du travail (art. R. 4222-6) : ${d.tBUR} m³/h par occupant dans un bureau, ${d.tREU} m³/h dans une salle de réunion ; un local sans occupant, comme les sanitaires, n’en reçoit pas. La charge d’été des locaux ne fixe pas ce débit : ce sont les ventilo-convecteurs qui la tiennent, les appareils de chaque local qui chauffent ou refroidissent son air. Le CCTP ne prévoit pas non plus d’humidification ; l’écran « L’hiver sur le diagramme » montre ce qui en découle. Ce geste sert à l’exercice 1 de la feuille.`,
      prompt: "Repérez sur la figure ce que le projet n’a pas, puis lisez l’exemple résolu.",
      render: () => figure(EX.img.melange, "Une CTA à recyclage, vue en principe : l’air neuf arrive à gauche, passe un registre et entre dans un caisson de mélange, un rectangle vide. L’air repris recyclé arrive par le haut, passe un autre registre et entre dans le même caisson. Le mélange repart à droite, vers le filtre et les batteries.", "Une CTA à recyclage mélange l’air repris à l’air neuf ; la CTA du projet n’a pas ce caisson")
        + exempleDebit()
    }),
    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, les sections", title: "Entraînement : l’ordre de l’air neuf", level: "appliquer", requiresAction: true,
      text: {
        1: "Rangez les sections que traverse l’air neuf, de la prise d’air au soufflage. Touchez d’abord la première, puis la suivante. Le schéma de l’écran « La CTA et ses sections » vous aide.",
        2: "Rangez les sections que traverse l’air neuf, de la prise d’air au soufflage. Touchez d’abord la première, puis la suivante. Sans le schéma."
      },
      prompt: { 1: "Touchez les sections dans l’ordre de l’air.", 2: "Touchez les sections dans l’ordre de l’air. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La CTA et ses sections ».", "Le filtre protège tout ce qui vient après lui.", "Récupérateur, puis batterie chaude, puis batterie froide, puis ventilateur."],
        2: ["La méthode est à l’écran « La CTA et ses sections ».", "Le filtre protège tout ce qui vient après lui.", "L’ordre du CCTP, page 3."]
      },
      ...BE.ordre(EX.ex1.items, EX.ex1.aides)
    }),
    BE.ecran({
      id: "le-recuperateur", dossier: "methode", kicker: "La méthode, 3", title: "L’efficacité du récupérateur", level: "comprendre",
      text: `Le récupérateur fait passer la chaleur de l’air repris à l’air neuf, sans les mélanger. Dans un échangeur à plaques, les deux airs coulent de part et d’autre de minces plaques ; dans une roue, une masse qui tourne se charge de chaleur dans un air et la rend à l’autre. Son efficacité η dit la part de l’écart de température qu’il rattrape, côté air neuf : θ2 = θe + η × (θ reprise − θe), avec θe l’air extérieur, θ reprise l’air repris et θ2 l’air neuf à sa sortie. L’air repris est à ${d.hiv.tr} °C l’hiver et à ${d.ete.tr} °C l’été. L’été, le récupérateur ne sert que si l’air extérieur est plus chaud que la reprise : à ${d.ete.te} °C dehors, il refroidit l’air neuf de quelques degrés ; plus frais que ${d.ete.tr} °C dehors, il le réchaufferait, et on le met hors service (station R2). Ici les deux récupérateurs sont comptés en sensible seul : ils ne changent pas l’humidité de l’air. Le transfert d’humidité d’une roue est vu à la station A6. Ce geste sert à l’exercice 2 de la feuille.`,
      prompt: "Lisez les quatre airs sur la figure, puis l’exemple résolu.",
      render: () => figure(EX.img.recup, `Le récupérateur, un échangeur à plaques à quatre piquages. En bas, l’air neuf entre à gauche à ${d.hiv.te} °C et sort à droite à ${H.t2} °C, vers la batterie. En haut, l’air repris entre à droite à ${d.hiv.tr} °C et sort à gauche, rejeté dehors. Sous l’échangeur : η = ${d.etaP}, et le calcul de θ2.`, `Noyau, l’hiver : l’échangeur à plaques réchauffe l’air neuf de ${d.hiv.te} °C à ${H.t2} °C`)
        + exempleRecup()
        + BE.renvoi('L’efficacité d’un récupérateur est présentée dans AéroRézo, <a href="../../../aerorezo/stations/recuperation/index.html">« Récupération d’énergie »</a>.')
    }),
    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, le récupérateur", title: "Entraînement : la sortie du récupérateur", level: "appliquer", requiresAction: true,
      text: {
        1: `Un récupérateur d’efficacité ${EX.ex2.eta} reçoit de l’air neuf à ${EX.ex2.te} °C et de l’air repris à ${EX.ex2.tr} °C. À quelle température sort l’air neuf ? L’exemple résolu reste sous vos yeux.`,
        2: `Un récupérateur d’efficacité ${EX.ex2.eta} reçoit de l’air neuf à ${EX.ex2.te} °C et de l’air repris à ${EX.ex2.tr} °C. À quelle température sort l’air neuf ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la température, en vous aidant de l’exemple.", 2: "Choisissez la température. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « L’efficacité du récupérateur ».", "Calculez d’abord l’écart θ reprise − θe.", `Sur l’exemple : ${d.hiv.te} + ${d.etaP} × (${d.hiv.tr} − (${d.hiv.te})) = ${H.t2} °C.`],
        2: ["La méthode est à l’écran « L’efficacité du récupérateur ».", "L’efficacité multiplie l’écart entre l’air repris et l’air extérieur.", "θ2 = θe + η × (θ reprise − θe)."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleRecup(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),
    BE.ecran({
      id: "hiver-diagramme", dossier: "methode", kicker: "La méthode, 4", title: "L’hiver sur le diagramme", level: "comprendre",
      text: `L’hiver, l’air neuf traverse le récupérateur, puis la batterie chaude. Aucun des deux ne lui ajoute ni ne lui retire d’eau : x ne change pas, et l’évolution est une horizontale sur le diagramme (station A1). On place E, l’air extérieur à ${d.hiv.te} °C et ${d.hiv.hr} %, et on lit x à droite. On suit l’horizontale jusqu’à 2, à la température de sortie du récupérateur, puis jusqu’à S, l’air soufflé à ${d.hiv.ts} °C. On lit h en chaque point sur les droites en tirets, au kJ/kg près : h est l’enthalpie, la chaleur que porte 1 kg d’air sec. En S, l’humidité relative tombe vers ${H.hrS} % : l’air soufflé est très sec. Le CCTP ne prévoit pas d’humidification : le bureau d’études constate cet air sec et le signale dans sa note, sans dimensionner d’humidificateur ici. Ce geste sert à l’exercice 3 de la feuille.`,
      prompt: "Suivez E, 2 et S sur le diagramme, puis lisez l’exemple résolu.",
      render: () => figure(EX.img.diagHiver, `${altDiagramme} En bas du diagramme, trois points orange sur une même horizontale, vers x = ${H.x} g/kg : E à ${d.hiv.te} °C, 2 à ${H.t2} °C, S à ${d.hiv.ts} °C, reliés par deux flèches vers la droite. Deux traits pointillés partent de 2 et de S le long des droites d’enthalpie, vers leurs valeurs, environ ${H.h2} et ${H.h3} kJ/kg.`, "Noyau, l’hiver : E, puis 2 après le récupérateur, puis S après la batterie chaude, sur une horizontale")
        + exempleHiver()
    }),
    BE.ecran({
      id: "batterie-chaude", dossier: "methode", kicker: "La méthode, 5", title: "La batterie chaude", level: "comprendre",
      text: `La batterie chaude porte l’air neuf de la sortie du récupérateur à la température de soufflage. Sa puissance se calcule comme à la station T4 : P = 0,34 × qv × Δθ, en W, avec qv en m³/h et Δθ en K. Le diagramme la recoupe : P = qm × Δh, avec qm = 1,2 × qv ÷ 3 600 en kg/s et Δh en kJ/kg, ce qui donne des kW (station A1). Avec des h calculés, les deux calculs s’écartent d’environ 1 % : le 0,34 arrondit la chaleur de l’air. Avec des h lus au kJ/kg près, l’écart monte à quelques pour cent quand Δh est petit, comme avec la roue : ce n’est pas une erreur. On reporte le résultat du 0,34 ; qm × Δh le vérifie. Quand l’air est soufflé à la température du local, comme ici l’hiver, P = 0,34 × qv × (1 − η) × (θi − θe) : on retrouve le (1 − η) de la station T4. Sans récupérateur, la batterie devrait porter l’air de ${d.hiv.te} °C à ${d.hiv.ts} °C ; la différence est la puissance reprise à l’air rejeté. Ce geste sert à l’exercice 3 de la feuille.`,
      prompt: "Comparez les deux barres, puis lisez l’exemple résolu.",
      render: () => figure(EX.img.barresHiver, `Deux barres de même longueur. La première, bleu foncé, est la batterie chaude sans récupérateur, ${H.Psans} W. La seconde est partagée : une part orange, la batterie chaude avec l’échangeur à plaques, ${H.Pbc} W ; une part grise, la chaleur reprise à l’air rejeté, ${H.Precup} W.`, `Noyau, l’hiver : avec l’échangeur à plaques, la batterie chaude tombe de ${H.Psans} W à ${H.Pbc} W`)
        + exempleChaude()
    }),
    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, la batterie chaude", title: "Entraînement : la puissance de la batterie chaude", level: "appliquer", requiresAction: true,
      text: {
        1: `Une CTA souffle ${EX.ex3.qv} m³/h d’air neuf. Dehors, il fait ${EX.ex3.te} °C ; l’air sort du récupérateur à ${EX.ex3.t2} °C et doit être soufflé à ${EX.ex3.ts} °C. Quelle est la puissance de la batterie chaude ? L’exemple résolu reste sous vos yeux.`,
        2: `Une CTA souffle ${EX.ex3.qv} m³/h d’air neuf. Dehors, il fait ${EX.ex3.te} °C ; l’air sort du récupérateur à ${EX.ex3.t2} °C et doit être soufflé à ${EX.ex3.ts} °C. Quelle est la puissance de la batterie chaude ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la puissance, en vous aidant de l’exemple.", 2: "Choisissez la puissance. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La batterie chaude ».", "La batterie part de la sortie du récupérateur.", `Sur l’exemple : 0,34 × ${d.qN} × (${d.hiv.ts} − ${H.t2}) = ${H.Pbc} W.`],
        2: ["La méthode est à l’écran « La batterie chaude ».", "Δθ va de la sortie du récupérateur au soufflage.", "P = 0,34 × qv × Δθ, en W."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleChaude(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),
    BE.ecran({
      id: "ete-diagramme", dossier: "methode", kicker: "La méthode, 6", title: "L’été sur le diagramme", level: "comprendre",
      text: `L’été, l’air neuf entre à ${d.ete.te} °C et ${d.ete.hr} % : c’est E. Le récupérateur le refroidit jusqu’à 2, la batterie froide jusqu’à S, à ${d.ete.ts} °C. On lit d’abord la rosée de E : depuis E, l’horizontale vers la gauche jusqu’à la courbe de saturation, puis la température en bas. Une batterie ne sèche l’air que si elle le descend sous sa rosée : la vapeur se dépose alors en eau sur ses ailettes. À ${d.ete.ts} °C, l’air reste au-dessus de sa rosée, vers ${E.rosee} °C. L’écart est petit, moins d’un demi-degré : sur le diagramme imprimé, S paraît posé sur la courbe de saturation, et la lecture seule ne tranche pas. On retient la rosée donnée ici : la batterie froide ne retire pas d’eau ; soufflé un degré plus froid, l’air en perdrait. Ici, x ne change pas, et S arrive tout près de la saturation, vers ${E.hrS} %. L’air soufflé garde ${E.x} g/kg, quand l’air des locaux, à ${d.ete.tr} °C et ${d.int.hr} %, en a ${d.int.x} : cette eau de l’air neuf entre dans les locaux, et ce sont les ventilo-convecteurs qui la retirent. Le CCTP fixe ce soufflage à ${d.ete.ts} °C ; la station ne le change pas. Ce geste sert à l’exercice 4 de la feuille.`,
      prompt: "Suivez E, 2 et S sur le diagramme, repérez la rosée de E, puis lisez l’exemple résolu.",
      render: () => figure(EX.img.diagEte, `${altDiagramme} Trois points orange sur une même horizontale, vers x = ${E.x} g/kg : E à ${d.ete.te} °C, sur la courbe de 40 %, 2 à ${E.t2} °C, S à ${d.ete.ts} °C, tout près de la courbe de saturation ; deux flèches vers la gauche les relient. Depuis E, un trait pointillé file à gauche jusqu’à la saturation puis descend vers ${E.rosee} °C : la rosée. Deux traits pointillés partent de 2 et de S le long des droites d’enthalpie, environ ${E.h2} et ${E.h3} kJ/kg.`, "Noyau, l’été : E, puis 2 après le récupérateur, puis S après la batterie froide, au-dessus de la rosée")
        + exempleEte()
    }),
    BE.ecran({
      id: "batterie-froide", dossier: "methode", kicker: "La méthode, 7", title: "La batterie froide", level: "comprendre",
      text: `Tant que l’air reste au-dessus de sa rosée, la batterie froide ne lui retire que de la chaleur sensible. Sa puissance se calcule comme celle de la batterie chaude : P = 0,34 × qv × (θ2 − θ soufflage), en W. Le diagramme la recoupe par qm × (h en 2 − h en S). Sur un petit Δh, une lecture au kJ/kg près pèse quelques pour cent : on reporte le 0,34. Sans récupérateur, la batterie partirait de ${d.ete.te} °C. Pour situer la CTA : la charge d’été du bâtiment entier vaut ${d.batP} kW à ${d.batH} h (station T8). La batterie froide de la CTA ne traite que l’air neuf ; les ventilo-convecteurs de chaque local tiennent les apports du soleil, des parois, des occupants et des appareils. Ce geste sert à l’exercice 4 de la feuille.`,
      prompt: "Comparez les deux barres, puis lisez l’exemple résolu.",
      render: () => figure(EX.img.barresEte, `Deux barres de même longueur. La première, bleu foncé, est la batterie froide sans récupérateur, ${E.Psans} W. La seconde est partagée : une part orange, la batterie froide avec l’échangeur à plaques, ${E.Pbf} W ; une part grise, ce que le récupérateur épargne à la batterie froide, ${E.Precup} W.`, `Noyau, l’été : avec l’échangeur à plaques, la batterie froide tombe de ${E.Psans} W à ${E.Pbf} W`)
        + exempleFroide()
        + BE.renvoi('Les batteries sur le diagramme sont présentées dans AéroRézo, <a href="../../../aerorezo/stations/batteries/index.html">« Batteries chaude et froide »</a>.')
    }),
    BE.ecran({
      id: "exercice-4", dossier: "methode", kicker: "Entraînement 4, la rosée", title: "Entraînement : la batterie sèche-t-elle l’air ?", level: "appliquer", requiresAction: true,
      text: {
        1: `Une CTA reçoit de l’air neuf à ${EX.ex4.te} °C, dont la rosée se lit à ${EX.ex4.rosee} °C. La batterie froide le souffle à ${EX.ex4.ts} °C. Sèche-t-elle l’air ? L’exemple résolu reste sous vos yeux.`,
        2: `Une CTA reçoit de l’air neuf à ${EX.ex4.te} °C, dont la rosée se lit à ${EX.ex4.rosee} °C. La batterie froide le souffle à ${EX.ex4.ts} °C. Sèche-t-elle l’air ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « L’été sur le diagramme ».", "Comparez la température de soufflage à la rosée.", `Sur l’exemple, ${d.ete.ts} °C reste au-dessus de ${E.rosee} °C : l’air garde son eau.`],
        2: ["La méthode est à l’écran « L’été sur le diagramme ».", "Une batterie ne sèche l’air que sous sa rosée.", "Soufflage plus froid que la rosée : de l’eau se dépose."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleEte(), EX.ex4.quiz),
        2: BE.quiz(EX.ex4.quiz)
      })
    }),
    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 8", title: "La note de calcul", level: "comprendre",
      text: "La première page de la note de calcul dit en quelques lignes ce qui a été composé, avec quoi et ce qui en sort : l’objet et la composition de la CTA, avec son schéma de principe ; les hypothèses et leurs sources ; les résultats, avec et sans récupérateur ; ce que l’on transmet pour la suite, y compris ce que l’on a constaté sur l’humidité. Chaque valeur cite son origine : le CCTP et sa page, le Code du travail, la station du diagramme. Un lecteur doit pouvoir refaire le calcul sans vous. Ce geste sert à l’exercice 4 de la feuille du niveau 2.",
      prompt: "Lisez la première page de la note du noyau, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Contenu"], [
        ["Objet et composition", `CTA à air neuf seul du noyau, neuf sections du CCTP (page 3), échangeur à plaques η = ${d.etaP}, sans humidification ; schéma de principe joint.`],
        ["Hypothèses et sources", `${d.qN} m³/h d’air neuf (Code du travail) ; ${d.hiv.te} °C et ${d.hiv.hr} %, ${d.ete.te} °C et ${d.ete.hr} % dehors (CCTP p. 1) ; soufflage ${d.hiv.ts} et ${d.ete.ts} °C (p. 3) ; air repris à ${d.hiv.tr} et ${d.ete.tr} °C.`],
        ["Résultats", `Après le récupérateur : ${H.t2} °C l’hiver, ${E.t2} °C l’été. Batterie chaude ${H.Pbc} W (${H.Psans} W sans récupérateur) ; batterie froide ${E.Pbf} W (${E.Psans} W sans).`],
        ["Pour la suite", `Air soufflé vers ${H.hrS} % l’hiver ; l’été, l’eau de l’air neuf passe aux ventilo-convecteurs. Base et variante à comparer (A6) ; réglages de la CTA (R2).`]
      ], "Noyau du bâtiment : première page de la note de calcul")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

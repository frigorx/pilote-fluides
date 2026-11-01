/* Station BE-A1 : L'air humide.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T1 à T5, puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE), les données de la commande et les bornes des fourchettes (bloc FOURCHETTES)
   sont écrites par outils/stations/a1-air-humide/construire.mjs, depuis exemple-data.mjs et
   corriges/a1-air-humide/reference-air-humide.json (outils/a1-air-humide-maison.mjs).
   Les diagrammes de illustrations/ sont tracés par le même outil, à partir des formules de l'air humide.
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes et les données de la commande le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "I": {
  "t": "19",
  "hr": "45",
  "x": "6,1",
  "h": "35",
  "r": "6,8"
 },
 "E": {
  "t": "−7",
  "hr": "90",
  "x": "2,0",
  "h": "−2",
  "r": "−8,4"
 },
 "C": {
  "t": "35",
  "hr": "40",
  "x": "14,1",
  "h": "71",
  "r": "19,4"
 },
 "D": {
  "t": "26",
  "hr": "55",
  "x": "11,6",
  "h": "56",
  "r": "16,3"
 },
 "qv": "110",
 "qm": "0,0367",
 "ch": {
  "t1": "19",
  "h0": "−2",
  "h1": "24",
  "dh": "26",
  "hr1": "15",
  "phi": "0,95",
  "phiW": "950",
  "phiExact": "0,96",
  "phi034": "972",
  "dT": "26"
 },
 "fr": {
  "ts": "12",
  "xs": "8,7",
  "hs": "34",
  "dh": "37",
  "dx": "5,4",
  "eau": "0,71",
  "phi": "1,36"
 },
 "surfaces": [
  {
   "nom": "face intérieure du vitrage du bureau",
   "t": "10",
   "buee": false
  },
  {
   "nom": "linteau de la fenêtre de la salle de réunion",
   "t": "5",
   "buee": true
  }
 ],
 "surfaceLimite": "13",
 "psS": "1498",
 "psI": "2197",
 "xsS": "9,3",
 "hrLimite": "68",
 "ex1": {
  "t": "25",
  "hr": "40",
  "quiz": {
   "choices": [
    "x ≈ 20,1 g/kg ; h ≈ 76 kJ/kg",
    "x ≈ 7,9 g/kg ; h ≈ 45 kJ/kg",
    "x ≈ 7,9 g/kg ; h ≈ 25 kJ/kg",
    "x ≈ 3,9 g/kg ; h ≈ 35 kJ/kg"
   ],
   "good": 1,
   "explain": "Le point est à la croisée de la verticale 25 °C et de la courbe 40 %. On lit x à droite sur l’horizontale : 7,9 g/kg ; h en suivant les tirets jusqu’à l’échelle : 45 kJ/kg. A place le point sur la saturation, C prend la température pour l’enthalpie, D place le point sur la courbe 20 %."
  }
 },
 "ex2": {
  "t": "22",
  "hr": "55",
  "s1": "15",
  "s2": "11",
  "quiz": {
   "choices": [
    "Buée sur les deux surfaces : elles sont plus froides que l’air à 22 °C",
    "Rosée ≈ 12,5 °C : buée sur la surface à 11 °C seulement",
    "Rosée ≈ 12,5 °C : buée sur la surface à 15 °C seulement",
    "Aucune buée : 55 % reste sous 100 %"
   ],
   "good": 1,
   "explain": "Depuis le point, l’horizontale vers la gauche coupe la saturation à 12,5 °C. Une surface plus froide que 12,5 °C se couvre d’eau : celle à 11 °C. A compare la surface à l’air, C inverse la comparaison, D compare des pourcentages."
  }
 },
 "ex3": {
  "t0": "0",
  "hr0": "80",
  "t1": "22",
  "qv": "200",
  "qm": "0,0667",
  "quiz": {
   "choices": [
    "HR ≈ 80 % ; Φ ≈ 1,47 kW",
    "HR ≈ 18 % ; Φ ≈ 1,47 kW",
    "HR ≈ 18 % ; Φ ≈ 1,22 kW",
    "HR ≈ 18 % ; Φ ≈ 5280 kW"
   ],
   "good": 1,
   "explain": "x reste 3,0 g/kg : à 22 °C, le point tombe vers 18 %. Δh ≈ 30 − 8 = 22 kJ/kg ; qm = 1,2 × 200 ÷ 3 600 = 0,0667 kg/s ; Φ ≈ 0,0667 × 22 = 1,47 kW. A garde l’humidité relative de départ, C oublie la masse volumique, D oublie de diviser par 3 600."
  }
 },
 "maison": {
  "hrInt": "50",
  "hrExt": "90",
  "eteT": "33",
  "eteHR": "40",
  "tiEte": "26",
  "surfaces": [
   {
    "nom": "face intérieure du vitrage du séjour",
    "t": "14"
   },
   {
    "nom": "angle du mur nord derrière l’armoire de la chambre 1",
    "t": "8"
   }
  ],
  "surfaceN2": "12",
  "sortie": "14"
 },
 "img": {
  "vierge": "illustrations/diagramme-vierge.svg",
  "point": "illustrations/exemple-point.svg",
  "rosee": "illustrations/exemple-rosee.svg",
  "chauffage": "illustrations/exemple-chauffage.svg",
  "froid": "illustrations/exemple-froid.svg",
  "bureau": "illustrations/exemple-bureau.svg"
 }
};
/*EXEMPLE-FIN*/

const M = EX.maison;
/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. Le diagramme vierge reste affiché aux deux niveaux. */
/* Un diagramme s'ouvre en grand d'un toucher (au téléphone, le doigt l'agrandit ensuite). */
const figure = (src, alt, legende) => `<figure class="schema"><a href="${BE.esc(src)}" target="_blank" rel="noopener"><img src="${BE.esc(src)}" alt="${BE.esc(alt)}"></a><figcaption>${BE.esc(legende.replace(/\.?$/, "."))} Touchez le diagramme pour l’ouvrir en grand.</figcaption></figure>`;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const vierge = () => figure(EX.img.vierge, "Diagramme de l’air humide vierge : températures de −10 à 40 °C en bas, humidité absolue de 0 à 25 g/kg à droite, courbes d’humidité relative de 10 en 10 %, droites d’enthalpie en tirets.", "Le diagramme de la feuille réponse.");
const exemplePoint = () => BE.exemple({ text: `Air intérieur d’hiver du bâtiment d’exemple, ${EX.I.t} °C et ${EX.I.hr} %`, answer: `x ≈ ${EX.I.x} g/kg ; h ≈ ${EX.I.h} kJ/kg`, why: "Le point est à mi-chemin des courbes 40 et 50 %. x se lit au dixième de g/kg, h au kJ/kg, en estimant entre deux tirets." });
const exempleRosee = () => BE.exemple({ text: `Air à ${EX.I.t} °C et ${EX.I.hr} % ; ${EX.surfaces[0].nom} à ${EX.surfaces[0].t} °C ; ${EX.surfaces[1].nom} à ${EX.surfaces[1].t} °C`, answer: `rosée ≈ ${EX.I.r} °C : pas de buée sur le vitrage, buée sur le linteau`, why: `${EX.surfaces[0].t} °C est au-dessus de la rosée, ${EX.surfaces[1].t} °C en dessous. On compare deux températures.` });
const exempleChauffage = () => BE.exemple({ text: `Air extérieur B à ${EX.E.t} °C et ${EX.E.hr} %, chauffé à ${EX.ch.t1} °C`, answer: `x reste ≈ ${EX.E.x} g/kg ; point E : HR ≈ ${EX.ch.hr1} %, h ≈ ${EX.ch.h1} kJ/kg ; Δh ≈ ${EX.ch.h1} − (${EX.ch.h0}) = ${EX.ch.dh} kJ/kg`, why: "La flèche est horizontale. Δh est l’énergie donnée à chaque kilogramme d’air sec." });
const exemplePuissance = () => BE.exemple({ text: `Bâtiment d’exemple : qv = ${EX.qv} m³/h, Δh ≈ ${EX.ch.dh} kJ/kg`, answer: `qm = 1,2 × ${EX.qv} ÷ 3 600 = ${EX.qm} kg/s ; Φ = ${EX.qm} × ${EX.ch.dh} ≈ ${EX.ch.phi} kW, soit ${EX.ch.phiW} W`, why: `La formule de la station T4 donne 0,34 × ${EX.qv} × ${EX.ch.dT} = ${EX.ch.phi034} W. L’écart vient de la lecture de h au kJ/kg près.` });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "θi et θe sont à la page 3 du CCTP, le débit total réduit d’air neuf à la page 4. L’air d’été, les humidités et les températures des surfaces sont dans la commande ci-dessus.",
      "Pour chaque point : la verticale de θ, la courbe de HR, puis x à droite, h sur les tirets, la rosée à gauche sur la saturation (écrans « Placer un point, lire x et h » et « Le point de rosée et la buée »). Pour l’air neuf : flèche horizontale de B jusqu’à θi, puis Φ = qm × Δh en kW, × 1 000 en W (écrans « Chauffer l’air : x ne change pas » et « Lire une puissance : Φ = qm × Δh »).",
      `Sur le bâtiment d’exemple, l’air intérieur à ${EX.I.t} °C et ${EX.I.hr} % donne x ≈ ${EX.I.x} g/kg et une rosée ≈ ${EX.I.r} °C. Faites la même lecture pour le point A de la maison, puis comparez la rosée de A aux deux surfaces.`
    ],
    2: [
      "Le CCTP donne θi, θe (page 3) et le débit d’air neuf (page 4). La commande donne l’air d’été, les humidités, la surface froide et la sortie de la batterie.",
      "Quatre gestes déjà vus : placer un point, la rosée et l’humidité à ne pas dépasser, le chauffage à x constant, le refroidissement par la rosée puis la saturation. Chaque puissance vaut qm × Δh en kW (× 1 000 en W), l’eau retirée qm × Δx.",
      `Sur le bâtiment d’exemple, une surface à ${EX.surfaceLimite} °C donne x ≈ ${EX.xsS} g/kg sur la saturation, soit environ ${EX.hrLimite} % à ${EX.I.t} °C. Faites le même geste avec la surface froide de la maison et l’air à θi.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensCctp = () => BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Températures de calcul à la page 3, ventilation et débit total réduit à la page 4" }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensCctp(); };

BE.station({
  code: "BE-A1",
  titre: "L’air humide",
  ligne: "Aéraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison : quatre points, la buée, le chauffage de l’air neuf, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison : humidité limite, chauffage et refroidissement de l’air neuf, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Le diagramme de l’air humide est l’outil du bureau d’études pour tout ce qui touche à l’humidité : la buée sur une paroi froide, l’air neuf trop sec en hiver, l’eau qui coule d’une batterie froide en été. Vous apprenez à y placer un air et à y lire ses grandeurs sur un bâtiment de bureaux d’exemple, puis vous le faites sur les airs de la maison.",
  note: "Le diagramme de cette station est tracé par le calcul, pour la pression atmosphérique normale, avec des formules publiées : pression de vapeur saturante de Tetens (constantes de Murray, 1967), humidité absolue et enthalpie de l’ASHRAE Handbook Fundamentals, chapitre 1. Les humidités, les températures de surface, la sortie de batterie et les valeurs du bâtiment d’exemple sont des valeurs d’exercice.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, CCTP et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "L’air humide de la maison : quatre points, la buée, le chauffage de l’air neuf",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études prépare le traitement de l’air de la maison des stations E1 et E2. Données de l’exercice : l’air intérieur est à ${M.hrInt} % d’humidité relative, en hiver comme en été ; l’air extérieur d’hiver est à ${M.hrExt} %. Masse volumique de l’air : 1,2 kg/m³. Suivez les étapes dans l’ordre.`,
        `Étape 1. Placez sur le diagramme, au verso de la feuille, les quatre airs de la maison : A, l’air intérieur d’hiver, à θi (page 3 du CCTP) ; B, l’air extérieur d’hiver, à θe (page 3 du CCTP) ; C, l’air extérieur d’été, ${M.eteT} °C et ${M.eteHR} % (station E1, valeur d’exercice) ; D, l’air intérieur d’été, ${M.tiEte} °C (station E2). Au recto, écrivez x, h et la rosée de chacun.`,
        `Étape 2. Par le froid de base (θe, page 3 du CCTP), la ${M.surfaces[0].nom} est à ${M.surfaces[0].t} °C et l’${M.surfaces[1].nom} à ${M.surfaces[1].t} °C (données de l’exercice). Comparez chaque surface à la rosée de A et dites où la buée apparaît.`,
        "Étape 3. L’air neuf entre au point B et il est chauffé à θi. Tracez la flèche au verso, appelez E son point d’arrivée, lisez Δh, puis calculez Φ avec le débit total réduit de la VMC hygroréglable, page 4 du CCTP : c’est le débit d’air neuf retenu à la station T4. Vérifiez x et la rosée de A, puis Φ, à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 3 : θi et θe. Page 4 : débit total réduit d’air neuf." },
        { piece: "Cette commande", ou: "Humidités, air d’été (station E1), été intérieur (station E2), températures des deux surfaces" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso ; le diagramme est au verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "L’air humide de la maison : quatre points, humidité limite, chauffage et refroidissement de l’air neuf",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études prépare le traitement de l’air de la maison des stations E1 et E2. Données de l’exercice : air intérieur à ${M.hrInt} % d’humidité relative, hiver comme été ; air extérieur d’hiver à ${M.hrExt} % ; air extérieur d’été ${M.eteT} °C et ${M.eteHR} % (station E1) ; air intérieur d’été ${M.tiEte} °C (station E2) ; masse volumique de l’air 1,2 kg/m³ ; θi et θe se lisent au CCTP page 3, le débit d’air neuf page 4 (débit total réduit de la VMC hygroréglable, retenu à la station T4). Placez les quatre airs A à D (dedans et dehors, hiver et été) et donnez x, h et la rosée de chacun, avec la source de θ et de HR. Le pont thermique le plus froid de la maison a une face intérieure à ${M.surfaceN2} °C par le froid de base : donnez l’humidité relative intérieure à ne pas dépasser. Calculez la puissance pour chauffer l’air neuf jusqu’à θi. Enfin, le maître d’ouvrage étudie une variante d’été : l’air neuf C traverse une batterie froide et en sort saturé (100 %) à ${M.sortie} °C. Donnez la rosée de C, l’eau retirée en kg/h et la puissance de la batterie. Rendez la feuille réponse, diagramme compris.`,
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Pages 3 et 4" },
        { piece: "Cette commande", ou: "Données de l’exercice et stations E1, E2" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso ; le diagramme est au verso" }
      ]
    }
  },
  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-x", libelle: "Humidité absolue x de l’air intérieur d’hiver, en g/kg d’air sec", unite: "g/kg", min: 6.9, max: 7.6, indice: "Relisez l’écran « Placer un point, lire x et h » : le point est à la croisée de la verticale de la température et de la courbe d’humidité relative ; x se lit à droite, sur l’horizontale qui passe par le point." },
      { id: "n1-rosee", libelle: "Point de rosée de l’air intérieur d’hiver, en °C", unite: "°C", min: 8.7, max: 9.8, indice: "Relisez l’écran « Le point de rosée et la buée » : depuis le point, suivez l’horizontale vers la gauche jusqu’à la courbe épaisse de saturation, puis descendez sur l’échelle des températures." },
      { id: "n1-phi", libelle: "Puissance pour chauffer l’air neuf, en W", unite: "W", min: 720, max: 796, indice: "Relisez les écrans « Chauffer l’air : x ne change pas » et « Lire une puissance : Φ = qm × Δh » : x reste constant pendant le chauffage ; Φ = qm × Δh en kW, avec qm = 1,2 × qv ÷ 3 600 en kg/s. Multipliez par 1 000 pour écrire Φ en W." }
    ],
    2: [
      { id: "n2-hr", libelle: "Humidité relative intérieure à ne pas dépasser, en %", unite: "%", min: 58, max: 62, indice: "Relisez l’écran « Le point de rosée et la buée », partie « humidité à ne pas dépasser » : à la température de la surface, montez jusqu’à la saturation, lisez x, puis cherchez l’humidité relative de l’air intérieur qui a ce x." },
      { id: "n2-chaud", libelle: "Puissance pour chauffer l’air neuf, en W", unite: "W", min: 720, max: 796, indice: "Relisez les écrans « Chauffer l’air : x ne change pas » et « Lire une puissance : Φ = qm × Δh » : x reste constant pendant le chauffage ; Φ = qm × Δh en kW, avec qm = 1,2 × qv ÷ 3 600 en kg/s. Multipliez par 1 000 pour écrire Φ en W." },
      { id: "n2-froid", libelle: "Puissance de la batterie froide de la variante d’été, en W", unite: "W", min: 746, max: 826, indice: "Relisez l’écran « Refroidir l’air : la rosée, puis l’eau » : l’air suit l’horizontale jusqu’à la saturation, puis la courbe de saturation jusqu’à la sortie de la batterie. Δh = h d’entrée − h de sortie ; Φ = qm × Δh en kW, multiplié par 1 000 pour l’écrire en W." }
    ]
  },
  /*FOURCHETTES-FIN*/
  suivante: { code: "BE-A2", titre: "Les débits du projet", href: "../a2-debits-projet/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "L’humidité relative", href: "../../../aerorezo/stations/hygrometrie/index.html", pourquoi: "Elle explique l’humidité relative et la saturation : à faire avant le diagramme si la notion est nouvelle." },
    { reseau: "AéroRézo", titre: "Point de rosée et air humide", href: "../../../aerorezo/stations/rosee-psychro/index.html", pourquoi: "Vous y faites varier la température et l’humidité d’un air devant une paroi froide jusqu’à voir la buée." },
    { reseau: "Bureau d’études", titre: "BE-E2, Les conditions intérieures", href: "../e2-conditions-interieures/index.html", pourquoi: "Les températures et le repère d’humidité de la maison viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-T4, Déperditions par l’air", href: "../t4-deperditions-air/index.html", pourquoi: "La puissance de l’air neuf s’y calcule par 0,34 × qv × ΔT : comparez-la avec celle du diagramme." }
  ],
  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Le bureau d’études connaît la température et l’humidité de chaque air de la maison : l’air intérieur et l’air extérieur, en hiver et en été. Vous placez ces quatre airs sur le diagramme de l’air humide et vous y lisez, pour chacun, l’humidité absolue, l’enthalpie et le point de rosée. Puis vous tracez ce que devient l’air neuf quand on le chauffe, et vous en tirez une puissance. Ces lectures servent au risque de buée, au chauffage de l’air neuf, puis au bilan d’été et à la centrale de traitement d’air. Les réponses s’écrivent sur la feuille A4 recto verso, qui porte le diagramme au verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Point", "θ (°C)", "HR (%)", "x (g/kg)", "h (kJ/kg)", "Rosée (°C)"], [
        ["A, intérieur d’hiver", "", "", "", "", ""],
        ["B, extérieur d’hiver", "", "", "", "", ""],
        ["C, extérieur d’été", "", "", "", "", ""],
        ["D, intérieur d’été", "", "", "", "", ""]
      ], "Le tableau des quatre airs de la maison, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "les quatre airs de la maison."], ["Le dossier :", "le CCTP, vos résultats des stations E1 et E2, des données de l’exercice."]] },
          { title: "Vous produisez", rows: [["Le diagramme :", "les quatre points et la flèche du chauffage."], ["Les résultats :", "x, h, rosée, la buée, la puissance de l’air neuf. Vérification à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station A2, les débits du projet."]] }
        ])
    }),
    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Pour placer un air sur le diagramme, il faut deux grandeurs : sa température sèche et son humidité relative. Les températures de calcul d’hiver sont au CCTP, page 3. L’air extérieur d’été vient de la station E1, la température intérieure d’été de la station E2. Aucun texte n’impose l’humidité d’un logement : la commande fixe les humidités, comme données de l’exercice. Le froid de base est le jour où l’air extérieur est à la température de base θe : les températures de surface de la commande sont celles de ce jour-là. Pour une puissance, il faut en plus le débit d’air neuf, au CCTP page 4, et la masse volumique de l’air.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Température intérieure θi et extérieure θe d’hiver", "Page 3 du CCTP"],
        ["Air extérieur d’été, température et humidité", "Station E1, valeur d’exercice reprise par la commande"],
        ["Température intérieure d’été", "Station E2 (Code de l’énergie, art. R. 241-30), reprise par la commande"],
        ["Humidités relatives de l’air intérieur et de l’air extérieur d’hiver", "La commande, données de l’exercice (repère de confort de 40 à 60 % : station E2)"],
        ["Débit d’air neuf qv", "Page 4 du CCTP, débit total réduit de la VMC hygroréglable (celui de la station T4)"],
        ["Masse volumique de l’air, 1,2 kg/m³", "La commande, donnée de l’exercice"]
      ], "Les données de l’air humide de la maison")
        + BE.renvoi('Les conditions intérieures se décident à <a href="../e2-conditions-interieures/index.html">la station E2</a>, le climat du site à <a href="../e1-climat-site/index.html">la station E1</a>.')
    }),
    BE.ecran({
      id: "air-sec-et-vapeur", dossier: "methode", kicker: "La méthode, 1", title: "De l’air sec et de la vapeur d’eau", level: "comprendre",
      text: "L’air que l’on traite est un mélange d’air sec et de vapeur d’eau invisible. La température sèche θ, en °C, est celle que lit un thermomètre ordinaire. L’humidité absolue x dit combien d’eau l’air porte, en grammes d’eau par kilogramme d’air sec (g/kg) : on compte par kilogramme d’air sec parce que cette masse ne change pas quand l’air gagne ou perd de l’eau. L’humidité relative HR, en %, compare la vapeur présente au maximum que l’air peut porter à sa température ; à 100 %, l’air est saturé. L’enthalpie h, en kJ par kilogramme d’air sec, est l’énergie que porte l’air, chaleur de sa vapeur comprise. Le point de rosée θr est la température à laquelle l’air, refroidi sans perdre d’eau, devient saturé.",
      prompt: "Lisez le tableau des cinq grandeurs, puis continuez.",
      render: () => tableau(["Grandeur", "Symbole", "Unité", "Ce qu’elle dit"], [
        ["Température sèche", "θ", "°C", "La température lue au thermomètre"],
        ["Humidité absolue", "x", "g/kg d’air sec", "La masse d’eau portée par l’air"],
        ["Humidité relative", "HR", "%", "La part du maximum possible à cette température"],
        ["Enthalpie", "h", "kJ/kg d’air sec", "L’énergie portée par l’air, vapeur comprise"],
        ["Point de rosée", "θr", "°C", "La température où l’air refroidi devient saturé"]
      ], "Les cinq grandeurs de l’air humide")
        + BE.renvoi('L’humidité relative est expliquée dans AéroRézo, <a href="../../../aerorezo/stations/hygrometrie/index.html">« L’humidité relative »</a>.')
    }),
    BE.ecran({
      id: "lire-le-diagramme", dossier: "methode", kicker: "La méthode, 2", title: "Le diagramme de l’air humide", level: "comprendre",
      text: "Le diagramme rassemble ces grandeurs pour la pression atmosphérique normale, 101 325 Pa. La température sèche se lit en bas, sur les verticales, de 1 en 1 °C. L’humidité absolue se lit à droite, sur les horizontales, de 1 en 1 g/kg. Les courbes pleines sont les courbes d’humidité relative, de 10 en 10 % ; la courbe épaisse, à gauche, est la saturation, 100 %. Les lignes en tirets relient les airs de même enthalpie : leur valeur est écrite au-dessus de la saturation, de 10 en 10 kJ/kg, avec une ligne fine tous les 5 kJ/kg. Au-dessus de la saturation, l’air ne peut pas exister : la vapeur en trop se change en eau.",
      prompt: "Repérez sur le diagramme les deux échelles, une courbe d’humidité relative et une ligne d’enthalpie, puis continuez.",
      render: () => vierge()
        + tableau(["Grandeur", "Où elle se lit sur le diagramme"], [
          ["θ", "En bas, verticales de 1 en 1 °C"],
          ["x", "À droite, horizontales de 1 en 1 g/kg"],
          ["HR", "Courbes pleines de 10 en 10 %, saturation en trait épais"],
          ["h", "Lignes en tirets, valeur au-dessus de la saturation"],
          ["θr", "Sur la saturation, à la hauteur du point (écran « Le point de rosée et la buée »)"]
        ], "Lire le diagramme")
        + BE.renvoi("Ce diagramme est tracé par le calcul. pv est la pression de la vapeur dans l’air, ps(θ) la plus grande possible à θ : ps = 610,78 × exp(17,27 θ ÷ (θ + 237,3)), en Pa (Tetens, constantes de Murray, 1967) ; HR (%) = 100 × pv ÷ ps. x = 0,622 × pv ÷ (p − pv), en kg/kg, avec p = 101 325 Pa ; h = 1,006 θ + x (2 501 + 1,86 θ), en kJ/kg, x en kg/kg (7,3 g/kg s’écrit 0,0073 kg/kg) : ASHRAE Handbook Fundamentals, chapitre 1. C’est le diagramme de la feuille réponse.")
    }),
    BE.ecran({
      id: "placer-un-point", dossier: "methode", kicker: "La méthode, 3", title: "Placer un point, lire x et h", level: "comprendre",
      text: "Un air se place avec deux grandeurs connues, en général sa température sèche et son humidité relative. Prenez la verticale de la température et montez jusqu’à la courbe de l’humidité relative : le point est à leur croisée. Entre deux courbes, placez-le à l’estime ; 45 % est à mi-chemin des courbes 40 et 50 %. Depuis le point, suivez l’horizontale vers la droite : vous lisez x. Suivez ensuite la ligne d’enthalpie qui passe par le point, parallèle aux tirets voisins, jusqu’à l’échelle au-dessus de la saturation : vous lisez h. L’exemple résolu porte sur l’air intérieur d’hiver du bâtiment de bureaux d’exemple. Ce geste sert à l’exercice 1 de la feuille.",
      prompt: "Suivez les deux lectures sur le diagramme de l’exemple, puis continuez.",
      render: () => figure(EX.img.point, `Le point A, ${EX.I.t} °C et ${EX.I.hr} %, avec en pointillés l’horizontale vers l’échelle de x et la ligne d’enthalpie vers son échelle.`, "Lecture de x et de h sur le point A du bâtiment d’exemple")
        + exemplePoint()
    }),
    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, lire un point", title: "Exercice : lire un point", level: "appliquer", requiresAction: true,
      text: {
        1: `Un air est à ${EX.ex1.t} °C et ${EX.ex1.hr} % d’humidité relative. Placez-le sur le diagramme et lisez x et h. L’exemple résolu reste sous vos yeux : refaites les deux mêmes lectures.`,
        2: `Un air est à ${EX.ex1.t} °C et ${EX.ex1.hr} % d’humidité relative. Placez-le sur le diagramme et lisez x et h, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne x et h, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne x et h. Cette question est à faire seul." },
      aides: {
        1: ["Le diagramme est ci-dessous, la méthode à l’écran « Placer un point, lire x et h ».", `Verticale de ${EX.ex1.t} °C, courbe ${EX.ex1.hr} % : le point. Puis l’horizontale vers la droite pour x, la ligne en tirets vers l’échelle du haut pour h.`, `Sur l’exemple, ${EX.I.t} °C et ${EX.I.hr} % donnent x ≈ ${EX.I.x} g/kg et h ≈ ${EX.I.h} kJ/kg. Votre point est plus à droite et sur une courbe plus basse.`],
        2: ["La méthode est à l’écran « Placer un point, lire x et h ».", "Le point est à la croisée de la verticale de θ et de la courbe de HR, jamais sur la saturation.", `Commencez par la verticale de ${EX.ex1.t} °C.`]
      },
      ...BE.parNiveau({
        1: avecBloc(vierge() + exemplePoint(), EX.ex1.quiz),
        2: avecBloc(vierge(), EX.ex1.quiz)
      })
    }),
    BE.ecran({
      id: "point-de-rosee", dossier: "methode", kicker: "La méthode, 4", title: "Le point de rosée et la buée", level: "comprendre",
      text: `Refroidissez un air sans lui retirer d’eau : x ne change pas, et le point glisse vers la gauche sur son horizontale. Il touche la saturation à une température, le point de rosée θr ; lisez-la en descendant à la verticale de ce point de contact. Une surface plus froide que θr se couvre d’eau : buée sur une vitre, moisissure dans un angle de mur, gouttes sous une gaine froide. Les surfaces les plus froides d’une pièce sont les ponts thermiques, endroits de la paroi où la chaleur passe davantage : un angle, un linteau (le dessus d’une fenêtre), le tour d’une menuiserie. On compare deux températures, celle de la surface et la rosée de l’air. Le même geste, fait dans l’autre sens, donne l’humidité relative à ne pas dépasser devant une surface froide : à la température de la surface, montez jusqu’à la saturation et lisez x ; à la température de l’air, ce x tombe sur une courbe d’humidité relative. Au-delà, la surface mouille. Ce geste sert à l’exercice 2 de la feuille.`,
      prompt: "Lisez les deux exemples résolus, puis continuez.",
      render: () => figure(EX.img.rosee, `Le point A, ${EX.I.t} °C et ${EX.I.hr} %, avec en pointillés l’horizontale vers la gauche jusqu’à la saturation, puis la verticale vers la température de rosée.`, "Lecture du point de rosée sur le point A du bâtiment d’exemple")
        + exempleRosee()
        + BE.exemple({ text: `Humidité à ne pas dépasser dans le bureau à ${EX.I.t} °C, devant une surface à ${EX.surfaceLimite} °C`, answer: `à ${EX.surfaceLimite} °C sur la saturation, x ≈ ${EX.xsS} g/kg ; à ${EX.I.t} °C, ce x est sur la courbe ≈ ${EX.hrLimite} %`, why: "Au-dessus de cette humidité relative, la rosée de l’air passe au-dessus de la température de la surface." })
        + BE.renvoi('Faites varier l’air devant une paroi froide dans AéroRézo, <a href="../../../aerorezo/stations/rosee-psychro/index.html">« Point de rosée et air humide »</a>.')
    }),
    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, la buée", title: "Exercice : la rosée et la buée", level: "appliquer", requiresAction: true,
      text: {
        1: `Un local est à ${EX.ex2.t} °C et ${EX.ex2.hr} % d’humidité relative. Deux surfaces sont à ${EX.ex2.s1} °C et ${EX.ex2.s2} °C. Lisez la rosée de l’air et dites quelle surface se couvre de buée. L’exemple résolu reste sous vos yeux.`,
        2: `Un local est à ${EX.ex2.t} °C et ${EX.ex2.hr} % d’humidité relative. Deux surfaces sont à ${EX.ex2.s1} °C et ${EX.ex2.s2} °C. Lisez la rosée de l’air et dites quelle surface se couvre de buée, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la bonne réponse, en vous aidant de l’exemple.", 2: "Choisissez la bonne réponse. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Le point de rosée et la buée ».", "Placez le point, suivez son horizontale vers la gauche jusqu’à la courbe épaisse, descendez sur l’échelle des températures : c’est la rosée. Comparez chaque surface à cette température.", `Sur l’exemple, la rosée vaut ≈ ${EX.I.r} °C : la surface à ${EX.surfaces[0].t} °C reste sèche, celle à ${EX.surfaces[1].t} °C mouille.`],
        2: ["La méthode est à l’écran « Le point de rosée et la buée ».", "La buée se décide en comparant deux températures.", `Placez d’abord le point ${EX.ex2.t} °C et ${EX.ex2.hr} %.`]
      },
      ...BE.parNiveau({
        1: avecBloc(vierge() + exempleRosee(), EX.ex2.quiz),
        2: avecBloc(vierge(), EX.ex2.quiz)
      })
    }),
    BE.ecran({
      id: "chauffer-l-air", dossier: "methode", kicker: "La méthode, 5", title: "Chauffer l’air : x ne change pas", level: "comprendre",
      text: `Une batterie chaude, échangeur à ailettes traversé par l’air, ou un radiateur donnent de la chaleur à l’air sans lui donner d’eau. x reste le même : sur le diagramme, le point glisse vers la droite sur son horizontale, jusqu’à la nouvelle température. Il traverse les courbes d’humidité relative, et HR baisse : l’air neuf chauffé en hiver est sec. Sur la feuille, l’évolution se trace par une flèche, du point de départ au point d’arrivée, et le point d’arrivée reçoit une lettre. Δh, la différence d’enthalpie entre l’arrivée et le départ, est l’énergie donnée à chaque kilogramme d’air sec. L’exemple résolu chauffe l’air extérieur d’hiver du bâtiment d’exemple jusqu’à ${EX.ch.t1} °C. Ce geste sert à l’exercice 3 de la feuille.`,
      prompt: "Suivez la flèche et l’exemple résolu, puis continuez.",
      render: () => figure(EX.img.chauffage, `Le point B, ${EX.E.t} °C et ${EX.E.hr} %, et la flèche horizontale jusqu’au point E à ${EX.ch.t1} °C, avec les deux lectures de l’enthalpie.`, "Chauffage de l’air extérieur du bâtiment d’exemple, de B à E")
        + exempleChauffage()
    }),
    BE.ecran({
      id: "puissance", dossier: "methode", kicker: "La méthode, 6", title: "Lire une puissance : Φ = qm × Δh", level: "comprendre",
      text: "Δh est l’énergie donnée à chaque kilogramme d’air sec. Pour une puissance, il faut la masse d’air qui passe chaque seconde, le débit massique qm. Le débit d’air qv est donné en m³/h ; qm = ρ × qv ÷ 3 600, en kg/s, avec ρ = 1,2 kg/m³, la masse volumique de l’air retenue pour l’exercice. Alors Φ = qm × Δh, en kW, puisque des kg/s multipliés par des kJ/kg donnent des kJ/s ; multipliez par 1 000 pour l’écrire en W (1 kW = 1 000 W). La station T4 calcule la puissance de l’air neuf par 0,34 × qv × ΔT : pour un chauffage, les deux méthodes donnent presque la même valeur, car l’eau de l’air ne change pas. Le diagramme devient indispensable quand x change, en refroidissement ou en humidification.",
      prompt: "Lisez les formules et l’exemple résolu, puis continuez.",
      render: () => tableau(["Formule", "Unités"], [
        ["qm = ρ × qv ÷ 3 600", "kg/s = kg/m³ × m³/h ÷ s/h"],
        ["Φ = qm × Δh", "kW = kg/s × kJ/kg"],
        ["Φ en W = Φ en kW × 1 000", "1 kW = 1 000 W"],
        ["Eau retirée = qm × Δx × 3 600 ÷ 1 000", "kg/h, Δx en g/kg"]
      ], "Les puissances lues sur le diagramme")
        + exemplePuissance()
        + BE.renvoi("ρ = 1,2 kg/m³ est une donnée de l’exercice ; elle correspond au coefficient 0,34 Wh/(m³.K) des règles Th-Bât (Généralités, § 5.1, p. 18), utilisé à la station T4.")
    }),
    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, le chauffage", title: "Exercice : chauffer l’air neuf", level: "appliquer", requiresAction: true,
      text: {
        1: `De l’air extérieur à ${EX.ex3.t0} °C et ${EX.ex3.hr0} % est chauffé à ${EX.ex3.t1} °C ; qv = ${EX.ex3.qv} m³/h. Lisez son humidité relative après le chauffage, puis calculez Φ. Les deux exemples résolus restent sous vos yeux.`,
        2: `De l’air extérieur à ${EX.ex3.t0} °C et ${EX.ex3.hr0} % est chauffé à ${EX.ex3.t1} °C ; qv = ${EX.ex3.qv} m³/h. Lisez son humidité relative après le chauffage, puis calculez Φ, sans les exemples.`
      },
      prompt: { 1: "Choisissez la ligne qui donne HR et Φ, en vous aidant des exemples.", 2: "Choisissez la ligne qui donne HR et Φ. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est aux écrans « Chauffer l’air : x ne change pas » et « Lire une puissance : Φ = qm × Δh ».", "Flèche horizontale du point de départ jusqu’à la verticale de la température d’arrivée ; HR se lit sur les courbes, Δh entre les deux lignes d’enthalpie. Puis qm = 1,2 × qv ÷ 3 600 et Φ = qm × Δh.", `Sur l’exemple : Δh ≈ ${EX.ch.dh} kJ/kg, qm = 1,2 × ${EX.qv} ÷ 3 600 = ${EX.qm} kg/s, Φ ≈ ${EX.ch.phi} kW. Faites les mêmes lignes avec ${EX.ex3.qv} m³/h.`],
        2: ["Les méthodes sont aux écrans « Chauffer l’air : x ne change pas » et « Lire une puissance : Φ = qm × Δh ».", "x reste constant ; la puissance demande le débit massique, en kg/s.", `Commencez par placer ${EX.ex3.t0} °C et ${EX.ex3.hr0} %, puis tracez l’horizontale.`]
      },
      ...BE.parNiveau({
        1: avecBloc(vierge() + exempleChauffage() + exemplePuissance(), EX.ex3.quiz),
        2: avecBloc(vierge(), EX.ex3.quiz)
      })
    }),
    BE.ecran({
      id: "refroidir-l-air", dossier: "methode", kicker: "La méthode, 7", title: "Refroidir l’air : la rosée, puis l’eau", level: "comprendre",
      text: `Une batterie froide refroidit l’air. Tant que l’air reste au-dessus de sa rosée, il suit son horizontale vers la gauche. Arrivé à la rosée, il est saturé ; s’il refroidit encore, il reste à 100 % et descend le long de la saturation, et la vapeur en trop se dépose en eau sur les ailettes : c’est la déshumidification. Dans cette station, on admet que l’air sort de la batterie saturé, à la température donnée ; sur une vraie batterie, il sort un peu sous 100 %. L’eau retirée vaut qm × Δx, la puissance de la batterie qm × Δh, avec Δh = h d’entrée − h de sortie. L’exemple résolu refroidit l’air extérieur d’été du bâtiment d’exemple jusqu’à ${EX.fr.ts} °C. Ce geste sert à l’exercice 4 de la feuille du niveau 2.`,
      prompt: "Suivez le chemin de l’air et l’exemple résolu, puis continuez.",
      render: () => figure(EX.img.froid, `Le point C, ${EX.C.t} °C et ${EX.C.hr} %, la flèche horizontale jusqu’à la saturation puis le long de la saturation jusqu’au point S à ${EX.fr.ts} °C.`, "Refroidissement de l’air extérieur d’été du bâtiment d’exemple, de C à S")
        + BE.exemple({ text: `Air C à ${EX.C.t} °C et ${EX.C.hr} %, sortie S saturée à ${EX.fr.ts} °C, qm = ${EX.qm} kg/s`, answer: `rosée de C ≈ ${EX.C.r} °C ; S : x ≈ ${EX.fr.xs} g/kg, h ≈ ${EX.fr.hs} kJ/kg ; eau ≈ ${EX.qm} × 3 600 × ${EX.fr.dx} ÷ 1 000 = ${EX.fr.eau} kg/h ; Φ ≈ ${EX.qm} × ${EX.fr.dh} = ${EX.fr.phi} kW`, why: `x de C ≈ ${EX.C.x} g/kg et h de C ≈ ${EX.C.h} kJ/kg. L’eau retirée part par le bac et l’évacuation des condensats de la batterie.` })
    }),
    BE.ecran({
      id: "bureau-complet", dossier: "methode", kicker: "La méthode, 8", title: "Exemple résolu : les quatre airs du bâtiment d’exemple", level: "comprendre",
      text: "Le tableau des quatre airs du bâtiment d’exemple, tel qu’il est attendu sur la feuille, avec les mêmes lettres que pour la maison : chaque air avec la source de sa température et de son humidité (ici la commande du bâtiment d’exemple), puis x, h et la rosée lus sur le diagramme. Les deux airs d’hiver encadrent le chauffage de l’air neuf, les deux airs d’été son refroidissement. En été, la rosée de l’air intérieur dit à partir de quelle température une gaine ou une batterie froide se couvre de gouttes. Les valeurs de ce bâtiment sont des valeurs d’exercice.",
      prompt: "Comparez le tableau et le diagramme, puis continuez vers le projet.",
      render: () => tableau(["Air", "θ (°C)", "HR (%)", "x (g/kg)", "h (kJ/kg)", "Rosée (°C)", "Source de θ et HR"], [
        ["A, intérieur d’hiver", EX.I.t, EX.I.hr, EX.I.x, EX.I.h, EX.I.r, "Commande, valeur d’exercice"],
        ["B, extérieur d’hiver", EX.E.t, EX.E.hr, EX.E.x, EX.E.h, EX.E.r, "Commande, valeur d’exercice"],
        ["C, extérieur d’été", EX.C.t, EX.C.hr, EX.C.x, EX.C.h, EX.C.r, "Commande, valeur d’exercice"],
        ["D, intérieur d’été", EX.D.t, EX.D.hr, EX.D.x, EX.D.h, EX.D.r, "Commande, valeur d’exercice"]
      ], "Les quatre airs du bâtiment d’exemple")
        + figure(EX.img.bureau, "Les quatre points A, B, C et D du bâtiment d’exemple placés sur le diagramme.", "Les quatre airs du bâtiment d’exemple sur le diagramme")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

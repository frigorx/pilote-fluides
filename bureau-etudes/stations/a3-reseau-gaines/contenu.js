/* Station BE-A3 : Le réseau de gaines.
   Méthode sur le logement d'exemple de la station A2 (plain-pied, trois pièces principales), puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE), les données de la commande et les bornes des fourchettes (bloc FOURCHETTES)
   sont écrites par outils/stations/a3-reseau-gaines/construire.mjs, depuis exemple-data.mjs, fil-rouge/maison/cctp-ajout-a3.json
   et corriges/a3-reseau-gaines/reference-gaines.json (outils/a3-gaines-maison.mjs).
   Les figures de illustrations/ (plans du réseau, abaque, barres, tronçon) sont tracées par le même outil (schema.mjs).
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes, les données de la
   commande et le tracé (longueurs et coudes, données de l'exercice) le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "d": {
  "diam": "80, 100, 125, 160 et 200",
  "vmax": "3",
  "eps": "0,15",
  "rho": "1,2",
  "nu": "1,5",
  "zc": "0,3",
  "zs": "1",
  "pb": "80"
 },
 "pp": "3",
 "troncons": [
  {
   "id": 1,
   "nom": "Cuisine",
   "L": "3,40",
   "coudes": 1,
   "sortie": false,
   "D": "125",
   "zeta": "0,3",
   "p": {
    "q": "105",
    "S": "0,01227",
    "v": "2,38",
    "j": "0,77",
    "lin": "2,62",
    "pd": "3,40",
    "sing": "1,02",
    "dp": "3,64"
   },
   "b": {
    "q": "45",
    "v": "1,02",
    "j": "0,17",
    "lin": "0,58",
    "pd": "0,62",
    "sing": "0,19",
    "dp": "0,77"
   }
  },
  {
   "id": 2,
   "nom": "Salle de bains",
   "L": "3,00",
   "coudes": 2,
   "sortie": false,
   "D": "80",
   "zeta": "0,6",
   "p": {
    "q": "30",
    "S": "0,00503",
    "v": "1,66",
    "j": "0,71",
    "lin": "2,13",
    "pd": "1,65",
    "sing": "0,99",
    "dp": "3,12"
   },
   "b": {
    "q": "15",
    "v": "0,83",
    "j": "0,21",
    "lin": "0,63",
    "pd": "0,41",
    "sing": "0,25",
    "dp": "0,88"
   }
  },
  {
   "id": 3,
   "nom": "WC",
   "L": "2,70",
   "coudes": 2,
   "sortie": false,
   "D": "80",
   "zeta": "0,6",
   "p": {
    "q": "15",
    "S": "0,00503",
    "v": "0,83",
    "j": "0,21",
    "lin": "0,57",
    "pd": "0,41",
    "sing": "0,25",
    "dp": "0,82"
   },
   "b": {
    "q": "15",
    "v": "0,83",
    "j": "0,21",
    "lin": "0,57",
    "pd": "0,41",
    "sing": "0,25",
    "dp": "0,82"
   }
  },
  {
   "id": 4,
   "nom": "Rejet",
   "L": "1,00",
   "coudes": 1,
   "sortie": true,
   "D": "160",
   "zeta": "1,3",
   "p": {
    "q": "150",
    "S": "0,02011",
    "v": "2,07",
    "j": "0,44",
    "lin": "0,44",
    "pd": "2,57",
    "sing": "3,34",
    "dp": "3,78"
   },
   "b": {
    "q": "75",
    "v": "1,04",
    "j": "0,13",
    "lin": "0,13",
    "pd": "0,65",
    "sing": "0,85",
    "dp": "0,98"
   }
  }
 ],
 "pointe": {
  "pire": 1,
  "nomPire": "Cuisine",
  "reseau": "7,42",
  "caisson": "87,42",
  "q": "150",
  "piquages": [
   {
    "id": 1,
    "nom": "Cuisine",
    "dp": "3,64",
    "piquage": "83,64"
   },
   {
    "id": 2,
    "nom": "Salle de bains",
    "dp": "3,12",
    "piquage": "83,12"
   },
   {
    "id": 3,
    "nom": "WC",
    "dp": "0,82",
    "piquage": "80,82"
   }
  ]
 },
 "base": {
  "pire": 2,
  "nomPire": "Salle de bains",
  "reseau": "1,86",
  "caisson": "81,86",
  "q": "75",
  "piquages": [
   {
    "id": 1,
    "nom": "Cuisine",
    "dp": "0,77",
    "piquage": "80,77"
   },
   {
    "id": 2,
    "nom": "Salle de bains",
    "dp": "0,88",
    "piquage": "80,88"
   },
   {
    "id": 3,
    "nom": "WC",
    "dp": "0,82",
    "piquage": "80,82"
   }
  ]
 },
 "ex1": {
  "q": "75",
  "quiz": {
   "choices": [
    "Ø80 mm, 4,14 m/s",
    "Ø100 mm, 2,65 m/s",
    "Ø125 mm, 1,70 m/s",
    "Ø100 mm, 0,66 m/s"
   ],
   "good": 1,
   "explain": "En Ø80, l’air irait à 4,14 m/s, plus que 3 m/s : trop petit. Le diamètre juste au-dessus, Ø100, donne S = π × 0,100² ÷ 4 = 0,00785 m² et v = 75 ÷ 3 600 ÷ 0,00785 = 2,65 m/s. 4,14 m/s garde le diamètre trop petit, 1,70 m/s prend un diamètre de plus que nécessaire, 0,66 m/s oublie le « ÷ 4 » de la section."
  }
 },
 "ex2": {
  "q": "75",
  "D": "100",
  "L": "8,0",
  "coudes": 2,
  "quiz": {
   "choices": [
    "10,0 Pa",
    "12,5 Pa",
    "3,8 Pa",
    "15,1 Pa"
   ],
   "good": 1,
   "explain": "Sur l’abaque, 75 m³/h en Ø100 donnent j ≈ 1,25 Pa/m, soit 1,25 × 8,0 = 10,0 Pa de perte linéaire. v = 2,65 m/s, Pd = 1,2 × 2,65² ÷ 2 = 4,21 Pa ; 2 coudes, Σζ = 0,6, perte singulière 0,6 × 4,21 = 2,5 Pa. Total 12,5 Pa. 10,0 Pa oublie les coudes, 3,8 Pa oublie la longueur, 15,1 Pa prend ρ × v² sans le ÷ 2 : 10,0 + 0,6 × 8,43 = 15,1 Pa."
  }
 },
 "ex3": {
  "gaines": [
   "6,0",
   "9,5",
   "4,0"
  ],
  "rejet": "5,0",
  "quiz": {
   "choices": [
    "104,5 Pa",
    "94,5 Pa",
    "89,5 Pa",
    "14,5 Pa"
   ],
   "good": 1,
   "explain": "Les trois bouches demandent 80 Pa ; la gaine la plus chargée, 9,5 Pa, fait le tronçon le plus défavorisé : 80 + 9,5 = 89,5 Pa au piquage. Le caisson fournit aussi le rejet : 89,5 + 5,0 = 94,5 Pa. 104,5 Pa additionne les trois gaines, 89,5 Pa oublie le rejet, 14,5 Pa oublie la bouche."
  }
 },
 "df": [
  {
   "nom": "Séjour",
   "q": "81,2",
   "D": "100",
   "v": "2,87",
   "vPetit": "4,49"
  },
  {
   "nom": "Chambre 1",
   "q": "36,2",
   "D": "80",
   "v": "2,00",
   "vPetit": null
  },
  {
   "nom": "Chambre 2",
   "q": "32,6",
   "D": "80",
   "v": "1,80",
   "vPetit": null
  }
 ],
 "img": {
  "logement": "illustrations/plan-logement.svg",
  "maison": "illustrations/plan-maison.svg",
  "abaque": "illustrations/abaque.svg",
  "abaqueEx": "illustrations/abaque-exemple.svg",
  "barres": "illustrations/barres-logement.svg",
  "troncon": "illustrations/troncon.svg",
  "doubleFlux": "../a2-debits-projet/illustrations/schema-logement-double-flux.svg"
 }
};
/*EXEMPLE-FIN*/

const T = EX.troncons, C = T[0], R4 = T[3], d = EX.d;
const coudes = n => `${n} coude${n > 1 ? "s" : ""}`;
/* Une figure s'ouvre en grand d'un toucher (au téléphone, le doigt l'agrandit ensuite). */
const figure = (src, alt, legende) => `<figure class="schema"><a href="${BE.esc(src)}" target="_blank" rel="noopener"><img src="${BE.esc(src)}" alt="${BE.esc(alt)}"></a><figcaption>${BE.esc(legende.replace(/\.?$/, "."))} Touchez la figure pour l’ouvrir en grand.</figcaption></figure>`;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const planLogement = () => figure(EX.img.logement, "Plan du logement d’exemple vu des combles : caisson d’extraction au-dessus du dégagement, trois gaines numérotées 1 à 3 depuis les bouches de la cuisine, de la salle de bains et du WC jusqu’aux piquages du caisson, tronçon 4 du rejet jusqu’à la sortie de toiture. Chaque coude porte un rond numéroté le long de sa gaine : un au-dessus de chaque bouche, un à chaque angle, un au pied de la sortie de toiture. Légende : longueur et nombre de coudes de chaque tronçon.", "Logement d’exemple : le réseau de gaines dans les combles. Les carrés orange numérotent les tronçons ; les ronds bleus, les coudes de chaque gaine, depuis la bouche. Une bouche au plafond dont la gaine part à l’horizontale a un coude juste au-dessus d’elle");
const figTroncon = () => figure(EX.img.troncon, "Coupe de principe d’un tronçon : le caisson d’extraction, la gaine horizontale de longueur L et de diamètre D où l’air circule au débit q et à la vitesse v, un coude à 90°, la bouche d’extraction en bas, et au-dessus du caisson le rejet par une sortie de toiture.", "Les grandeurs d’un tronçon : l’air va de la bouche au caisson, puis dehors par le rejet");
const tableTroncons = () => tableau(["Tronçon", "De la bouche au caisson", "L (m)", "Coudes à 90°"], T.map(t => [String(t.id), t.sortie ? "Du caisson à la sortie de toiture" : `${t.nom}`, t.L, `${t.coudes}${t.sortie ? " et la sortie de toiture" : ""}`]), "Logement d’exemple : les tronçons, données du tracé");
const exempleSection = () => BE.exemple({ text: `Gaine de la cuisine du logement d’exemple : ${C.p.q} m³/h en pointe ; diamètres ${d.diam} mm ; ${d.vmax} m/s au plus`, answer: `Ø100 donnerait plus de ${d.vmax} m/s ; Ø${C.D} : S = π × 0,125² ÷ 4 = ${C.p.S} m², v = ${C.p.q} ÷ 3 600 ÷ ${C.p.S} = ${C.p.v} m/s`, why: "On prend le plus petit diamètre de la série où la vitesse reste sous la vitesse maximale, puis on recalcule la vitesse dans ce diamètre." });
const exempleLineaire = () => BE.exemple({ text: `Gaine de la cuisine : ${C.p.q} m³/h en Ø${C.D}, longueur ${C.L} m`, answer: `sur l’abaque, j = ${C.p.j} Pa/m ; Δp linéaire = ${C.p.j} × ${C.L} = ${C.p.lin} Pa`, why: "Partez du débit à gauche, suivez l’horizontale jusqu’à la droite du diamètre, descendez lire j en bas." });
const exempleSinguliere = () => BE.exemple({ text: `Gaine de la cuisine : v = ${C.p.v} m/s, ${coudes(C.coudes)}`, answer: `Pd = ${d.rho} × ${C.p.v}² ÷ 2 = ${C.p.pd} Pa ; Σζ = ${C.zeta} ; Δp singulière = ${C.zeta} × ${C.p.pd} = ${C.p.sing} Pa ; gaine : ${C.p.lin} + ${C.p.sing} = ${C.p.dp} Pa`, why: "Chaque coude coûte une fraction de la pression dynamique ; on additionne les ζ du tronçon, puis on multiplie une seule fois." });
const exempleCaisson = () => BE.exemple({ text: `Logement d’exemple en pointe : gaine de la ${EX.pointe.nomPire.toLowerCase()} ${T[EX.pointe.pire - 1].p.dp} Pa, la plus chargée ; rejet ${R4.p.dp} Pa ; bouche ${d.pb} Pa`, answer: `${d.pb} + ${T[EX.pointe.pire - 1].p.dp} + ${R4.p.dp} = ${EX.pointe.caisson} Pa à ${EX.pointe.q} m³/h`, why: "Le caisson doit amener sa pression à la bouche la plus difficile à servir ; les autres reçoivent un peu plus que leurs 80 Pa." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Les débits de pointe des bouches sont à la page 4 du CCTP (ce sont aussi vos résultats de la station A2). Les longueurs et les coudes sont sur le schéma de la maison ci-dessous. Les diamètres, la vitesse maximale, les ζ et la pression de la bouche sont dans la commande.",
      "Exercice 1 de la feuille : écran « Section et vitesse ». Exercice 2 de la feuille : écrans « Les pertes linéaires : lire l’abaque » et « Les pertes singulières ». Exercice 3 de la feuille : écran « Le tronçon le plus défavorisé ».",
      `Sur le logement d’exemple, la gaine de la cuisine perd ${C.p.lin} + ${C.p.sing} = ${C.p.dp} Pa. Faites le même calcul pour chaque gaine de la maison, puis comparez les pressions au piquage : la gaine la plus longue n’est pas forcément la plus défavorisée.`
    ],
    2: [
      "Les débits de base et de pointe de chaque bouche, et ceux du soufflage en double flux, sont vos résultats de la station A2. Le tracé est sur le schéma de la maison ; les données des conduits sont dans la commande.",
      "Cinq gestes déjà vus : diamètre et vitesse, pertes linéaires sur l’abaque, pertes singulières, tronçon le plus défavorisé, pression du caisson. Refaites-les en base avec les diamètres de la pointe.",
      "En base, la salle d’eau garde son débit de pointe alors que la cuisine et le WC baissent : regardez quel tronçon devient le plus défavorisé."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensProjet = () => BE.liens([
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Système de ventilation et débits à la page 4" },
  { href: EX.img.abaque, title: "L’abaque des pertes de charge linéaires", note: "À ouvrir en grand ou à imprimer en A4" }
]);
const planMaison = () => figure(EX.img.maison, "Plan de la moitié nord de l’étage de la maison vu des combles : caisson d’extraction au-dessus du palier ; tronçon 1, gaine de la cuisine, qui monte tout droit de sa bouche dans un coffrage à l’angle de la salle d’eau ; tronçon 2, gaine de la salle d’eau depuis sa bouche au plafond ; tronçon 3, gaine du WC, qui part de la bouche au plafond du WC au rez-de-chaussée en tirets et monte dans le même coffrage ; tronçon 4, rejet vers la sortie de toiture. Chaque coude porte un rond numéroté le long de sa gaine. Légende : longueur et nombre de coudes de chaque tronçon.", "Maison d’étude : le réseau de gaines dans les combles, sur la moitié nord de l’étage. Chaque rond bleu est un coude, numéroté le long de sa gaine depuis la bouche : au-dessus d’une bouche au plafond, au pied et en haut d’une montée, à chaque angle. La bouche de la cuisine est juste sous sa montée, dessinée à côté : sa gaine monte tout droit, sans coude au pied. À l’étage, la salle d’eau ne touche pas le palier ; les gaines passent donc dans les combles, au-dessus de la chambre 3, et ne descendent dans aucune chambre. Tracé, longueurs et coudes : données de l’exercice");
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + planMaison() + liensProjet(); };

BE.station({
  code: "BE-A3",
  titre: "Le réseau de gaines",
  ligne: "Aéraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison : diamètre, vitesse et pertes de charge des gaines d’extraction en pointe, tronçon le plus défavorisé, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison : tout le réseau en base et en pointe, pression du caisson, variante double flux, note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Les débits de chaque bouche sont fixés. Le bureau d’études trace maintenant les gaines jusqu’au caisson, choisit leur diamètre, calcule ce que l’air perd en pression le long du chemin et trouve le tronçon le plus difficile à servir. C’est lui qui dit quelle pression le caisson doit fournir. Vous apprenez la méthode sur le logement d’exemple de la station A2, puis vous la faites sur la maison.",
  note: "Les formules sont celles de la mécanique des fluides (débit et section, perte linéaire de Darcy-Weisbach avec le coefficient de Colebrook-White, perte singulière). Le tracé du réseau, la série de diamètres, la vitesse maximale, la rugosité des conduits, les coefficients ζ et la pression des bouches sont des données de l’exercice ; sur un vrai projet, elles viennent de la documentation des fabricants et de l’avis technique du système.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un logement d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, schéma et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Les gaines d’extraction de la VMC de la maison : diamètre, vitesse, pertes de charge et tronçon le plus défavorisé",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études prépare le choix du caisson de la VMC de la maison (station A4). Il lui faut le réseau de gaines au débit de pointe. Données de l’exercice : diamètres ${d.diam} mm ; vitesse maximale ${d.vmax} m/s ; coude à 90° ζ = ${d.zc} ; sortie de toiture ζ = ${d.zs} ; chaque bouche demande ${d.pb} Pa au moins ; ρ = ${d.rho} kg/m³. Le tracé, les longueurs et les coudes sont sur le schéma ci-dessous : chaque coude y porte un rond numéroté, comptez-les. Suivez les étapes dans l’ordre.`,
        "Étape 1. Relevez le débit de pointe de chaque bouche (page 4 du CCTP). Pour la cuisine, la salle d’eau et le WC, choisissez le diamètre et calculez la section et la vitesse.",
        "Étape 2. Repérez sur le schéma la gaine la plus longue. Calculez sa perte de charge linéaire avec l’abaque, puis sa perte singulière, et additionnez.",
        "Étape 3. Faites le même calcul pour les deux autres gaines, ajoutez la pression de la bouche et trouvez le tronçon le plus défavorisé. Vérifiez la vitesse de la cuisine, la gaine la plus longue et la gaine du tronçon le plus défavorisé à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : système de ventilation, débits extraits" },
        { piece: "Schéma de la maison", ou: "Ci-dessous, et au verso de la feuille réponse" },
        { piece: "Abaque des pertes linéaires", ou: "Lien ci-dessous, à ouvrir en grand" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Le réseau de gaines de la VMC de la maison : base et pointe, tronçon le plus défavorisé, pression du caisson, variante double flux, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études prépare le choix du caisson de la VMC de la maison (station A4). Données : vos résultats de la station A2 (débits de base et de pointe de chaque bouche) et le schéma de la maison ci-dessous (tracé, longueurs, coudes numérotés). Données de l’exercice : diamètres ${d.diam} mm ; vitesse maximale ${d.vmax} m/s ; coude à 90° ζ = ${d.zc} ; sortie de toiture ζ = ${d.zs} ; bouche ${d.pb} Pa au moins ; ρ = ${d.rho} kg/m³. Dimensionnez les quatre tronçons au débit de pointe, puis calculez leur vitesse et leur perte de charge en pointe et en base. Trouvez le tronçon le plus défavorisé dans chaque régime et la pression que le caisson doit fournir, avec son débit. Le maître d’ouvrage étudie une variante en double flux : calculez le diamètre et la vitesse de la gaine de soufflage du séjour-cuisine en pointe, puis dites en deux phrases, sans calcul, ce qui change pour le réseau et pour le caisson (le tracé du soufflage n’est pas donné). Rédigez la première page de la note de calcul.`,
      pieces: [
        { piece: "Vos résultats de la station A2", ou: "Tableau des bouches : base et pointe, entrées d’air" },
        { piece: "Schéma de la maison", ou: "Ci-dessous" },
        { piece: "Abaque des pertes linéaires", ou: "Lien ci-dessous" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },
  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-vitesse", libelle: "Vitesse de l’air dans la gaine de la cuisine, débit de pointe, en m/s", unite: "m/s", min: 2.63, max: 2.8, indice: "Relisez l’écran « Section et vitesse » : prenez le plus petit diamètre de la série où l’air ne dépasse pas la vitesse maximale, S = π × D² ÷ 4 avec D en mètres, puis v = q ÷ 3 600 ÷ S, au débit de pointe." },
      { id: "n1-wc", libelle: "Perte de charge de la gaine la plus longue, débit de pointe, en Pa", unite: "Pa", min: 9.27, max: 10.26, indice: "Relisez les écrans « Les pertes linéaires : lire l’abaque » et « Les pertes singulières » : j lu sur l’abaque × longueur du tronçon, plus Σζ × ρ × v² ÷ 2 ; comptez les coudes numérotés du schéma, au rez-de-chaussée comme dans les combles." },
      { id: "n1-defav", libelle: "Perte de charge de la gaine du tronçon le plus défavorisé, débit de pointe, en Pa", unite: "Pa", min: 10.35, max: 11.45, indice: "Relisez l’écran « Le tronçon le plus défavorisé » : calculez la perte de charge des trois gaines, ajoutez la pression de la bouche ; le tronçon le plus défavorisé est celui qui demande la plus forte pression au piquage, pas forcément le plus long." }
    ],
    2: [
      { id: "n2-pointe", libelle: "Perte de charge du réseau en pointe, tronçon le plus défavorisé et rejet, sans la bouche, en Pa", unite: "Pa", min: 15.51, max: 17.15, indice: "Relisez l’écran « La pression que le caisson doit fournir » : perte de charge de la gaine du tronçon le plus défavorisé plus celle du rejet (coude et sortie de toiture compris), sans la bouche, au débit de pointe." },
      { id: "n2-base", libelle: "Perte de charge du réseau en base, tronçon le plus défavorisé et rejet, sans la bouche, en Pa", unite: "Pa", min: 6.1, max: 6.75, indice: "Relisez l’écran « Base et pointe » : refaites les vitesses et les pertes au débit de base, avec les diamètres choisis en pointe ; le tronçon le plus défavorisé peut changer ; le rejet passe le débit total de base." },
      { id: "n2-df", libelle: "Double flux : vitesse dans la gaine de soufflage du séjour-cuisine, débit de pointe, en m/s", unite: "m/s", min: 2.12, max: 2.26, indice: "Relisez l’écran « Le réseau de soufflage du double flux » : débit de pointe soufflé dans le séjour-cuisine (vos résultats de la station A2), plus petit diamètre de la série sous la vitesse maximale, puis v = q ÷ 3 600 ÷ S." }
    ]
  },
  /*FOURCHETTES-FIN*/
  suivante: { code: "BE-A4", titre: "Le ventilateur et le caisson", href: "../a4-ventilateur-caisson/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Débit, vitesse, section", href: "../../../aerorezo/stations/debit-vitesse/index.html", pourquoi: "Le lien entre débit, vitesse et section : à faire avant si la notion est nouvelle." },
    { reseau: "AéroRézo", titre: "Sections circulaires et rectangulaires", href: "../../../aerorezo/stations/sections/index.html", pourquoi: "Choisir un diamètre dans une série, puis recalculer la vitesse." },
    { reseau: "AéroRézo", titre: "Choisir les conduits", href: "../../../aerorezo/stations/conduits/index.html", pourquoi: "Rond, rectangulaire ou flexible : ce que chacun coûte en place et en pertes." },
    { reseau: "AéroRézo", titre: "Pertes de charge linéaires", href: "../../../aerorezo/stations/pertes-lineaires/index.html", pourquoi: "La perte au mètre, à multiplier par la longueur posée sur le chantier." },
    { reseau: "AéroRézo", titre: "Accidents de parcours", href: "../../../aerorezo/stations/pertes-singulieres/index.html", pourquoi: "Les pertes singulières des coudes, tés et réductions." },
    { reseau: "AéroRézo", titre: "Étudier un réseau VMC", href: "../../../aerorezo/stations/dimensionner-vmc/index.html", pourquoi: "Le réseau d’une VMC, de la bouche au caisson." },
    { reseau: "Bureau d’études", titre: "BE-A2, Les débits du projet", href: "../a2-debits-projet/index.html", pourquoi: "Le débit de chaque bouche, en base et en pointe, vient de cette station." }
  ],
  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Une VMC, ventilation mécanique contrôlée, aspire l’air des pièces de service par des bouches reliées par des gaines à un caisson, qui le rejette dehors. Chaque mètre de gaine et chaque coude font perdre de la pression à l’air : c’est la perte de charge. Le bureau d’études choisit le diamètre de chaque gaine, calcule ses pertes de charge, trouve le tronçon le plus défavorisé et en déduit la pression que le caisson doit fournir. Ce point de fonctionnement, un débit sous une pression, sert à choisir le caisson (station A4). Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Tronçon", "Diamètre (mm)", "Vitesse (m/s)", "Perte de charge (Pa)"], [
        ["Gaine de la cuisine", "", "", ""],
        ["Gaine de la salle d’eau", "", "", ""],
        ["Gaine du WC", "", "", ""],
        ["Rejet", "", "", ""]
      ], "Le réseau de la maison, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "le réseau de gaines de la VMC de la maison."], ["Le dossier :", "les débits de la station A2, le schéma du tracé, l’abaque, des données de l’exercice."]] },
          { title: "Vous produisez", rows: [["Le réseau :", "diamètre, vitesse et perte de charge de chaque gaine."], ["Le résultat :", "le tronçon le plus défavorisé et la pression du caisson. Vérification à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station A4, le ventilateur et le caisson."]] }
        ])
    }),
    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Le débit de chaque bouche, en base et en pointe, vient de la station A2 ; les débits de pointe sont aussi à la page 4 du CCTP, le cahier des clauses techniques particulières de la maison. Le tracé du réseau, c’est-à-dire la place du caisson, le chemin des gaines, leurs longueurs et leurs coudes, est donné par un schéma. La série de diamètres, la vitesse maximale, la rugosité des conduits, les coefficients des coudes et la pression des bouches sont des données de l’exercice : sur un vrai projet, elles viennent de la documentation des fabricants et de l’avis technique du système.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Débit de chaque bouche, base et pointe", "Vos résultats de la station A2 ; pointe : page 4 du CCTP"],
        ["Tracé, longueurs, coudes", "Le schéma de la maison, écran « Le projet » et feuille réponse"],
        [`Diamètres ${d.diam} mm`, "Donnée de l’exercice"],
        [`Vitesse maximale ${d.vmax} m/s`, "Donnée de l’exercice (confort acoustique en logement)"],
        [`ζ : coude ${d.zc}, sortie de toiture ${d.zs}`, "Donnée de l’exercice"],
        [`Bouche : ${d.pb} Pa au moins`, "Donnée de l’exercice"],
        [`Pertes linéaires : abaque, rugosité ${d.eps} mm`, "Tracé par le calcul, à l’écran « Les pertes linéaires : lire l’abaque »"]
      ], "Les données du réseau de la maison")
        + BE.renvoi('Les débits des bouches ont été établis à <a href="../a2-debits-projet/index.html">la station A2</a>.')
    }),
    BE.ecran({
      id: "trace-du-reseau", dossier: "methode", kicker: "La méthode, 1", title: "Le tracé du réseau", level: "comprendre",
      text: "Dans une maison, le réseau d’une VMC se monte souvent en étoile : chaque bouche d’extraction a sa propre gaine, raccordée à un piquage du caisson, c’est-à-dire à l’une de ses entrées. Le caisson rejette ensuite l’air dehors par une sortie de toiture. On découpe le réseau en tronçons : une portion de gaine où le débit et le diamètre ne changent pas. Ici, une gaine par bouche, plus le rejet. Pour chaque tronçon, on relève sur le tracé sa longueur et ses accidents de parcours, ici des coudes à 90°. Un coude se trouve à chaque changement de direction : au-dessus d’une bouche au plafond quand la gaine part à l’horizontale, au pied et en haut d’une montée, à chaque angle. Sur les plans de la station, chaque coude porte un rond numéroté le long de sa gaine. Dans des combles non chauffés, les gaines sont isolées. Le logement d’exemple est celui de la station A2 : le caisson est au-dessus du dégagement, les gaines courent dans les combles.",
      prompt: "Suivez chaque tronçon sur le plan, de la bouche au piquage, puis continuez.",
      render: () => planLogement() + tableTroncons()
        + BE.renvoi('Le réseau d’une VMC est présenté dans AéroRézo, <a href="../../../aerorezo/stations/dimensionner-vmc/index.html">« Étudier un réseau VMC »</a>.')
    }),
    BE.ecran({
      id: "section-et-vitesse", dossier: "methode", kicker: "La méthode, 2", title: "Section et vitesse", level: "comprendre",
      text: `Le débit d’une gaine est connu : celui de sa bouche. La vitesse de l’air dans la gaine dépend de sa section : v = q ÷ 3 600 ÷ S, avec q en m³/h, S en m² et v en m/s. La section d’une gaine ronde vaut S = π × D² ÷ 4, avec D en mètres. Une gaine trop petite fait aller l’air vite : elle fait du bruit et perd beaucoup de pression. Une gaine trop grosse coûte cher et prend de la place. On prend donc, dans la série des diamètres disponibles, le plus petit où la vitesse ne dépasse pas la vitesse maximale, ici ${d.vmax} m/s. Le diamètre se choisit au débit de pointe, le plus fort. Ce geste sert à l’exercice 1 de la feuille du niveau 1.`,
      prompt: "Lisez les formules et l’exemple résolu, puis continuez.",
      render: () => figTroncon()
        + tableau(["Formule", "Unités"], [["S = π × D² ÷ 4", "m² ; D en m (125 mm = 0,125 m)"], ["v = q ÷ 3 600 ÷ S", "m/s ; q en m³/h"]], "Section et vitesse")
        + tableau(["Tronçon", "q pointe (m³/h)", "Ø (mm)", "S (m²)", "v (m/s)"], T.map(t => [`${t.id} ${t.nom}`, t.p.q, t.D, t.p.S, t.p.v]), "Logement d’exemple : diamètres et vitesses en pointe")
        + exempleSection()
        + BE.renvoi('Le choix dans une série est repris dans AéroRézo, <a href="../../../aerorezo/stations/sections/index.html">« Sections circulaires et rectangulaires »</a>.')
    }),
    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, le diamètre", title: "Entraînement : le diamètre d’une gaine", level: "appliquer", requiresAction: true,
      text: {
        1: `Une gaine extrait ${EX.ex1.q} m³/h. Diamètres disponibles : ${d.diam} mm ; l’air ne doit pas dépasser ${d.vmax} m/s. Quel diamètre retenez-vous, et quelle est la vitesse de l’air ? L’exemple résolu reste sous vos yeux.`,
        2: `Une gaine extrait ${EX.ex1.q} m³/h. Diamètres disponibles : ${d.diam} mm ; l’air ne doit pas dépasser ${d.vmax} m/s. Quel diamètre retenez-vous, et quelle est la vitesse de l’air ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Section et vitesse ».", "Essayez les diamètres dans l’ordre, du plus petit au plus grand ; arrêtez-vous au premier où la vitesse ne dépasse pas la vitesse maximale.", `Sur l’exemple, ${C.p.q} m³/h en Ø${C.D} donnent ${C.p.v} m/s.`],
        2: ["La méthode est à l’écran « Section et vitesse ».", "D en mètres dans la formule de la section.", "v = q ÷ 3 600 ÷ S."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleSection(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),
    BE.ecran({
      id: "pertes-lineaires", dossier: "methode", kicker: "La méthode, 3", title: "Les pertes linéaires : lire l’abaque", level: "comprendre",
      text: `Le long d’une gaine droite, l’air frotte sur la paroi et perd de la pression à chaque mètre : c’est la perte de charge linéaire, notée j, en pascals par mètre. Elle se lit sur un abaque : partez du débit, sur l’échelle de gauche, suivez l’horizontale jusqu’à la droite du diamètre, puis descendez lire j sur l’échelle du bas. Les deux échelles sont logarithmiques : entre 0,5 et 1, les traits valent 0,6, 0,7, 0,8 et 0,9. La perte du tronçon vaut j × L, avec L sa longueur. L’abaque montre aussi les droites de vitesse : à droite de la droite des ${d.vmax} m/s, l’air va trop vite. Il est tracé par le calcul pour des conduits ronds en acier galvanisé (rugosité ${d.eps} mm) et de l’air à ${d.rho} kg/m³. Ce geste sert à l’exercice 2 de la feuille du niveau 1.`,
      prompt: "Suivez la lecture de l’exemple sur l’abaque, puis continuez.",
      render: () => figure(EX.img.abaqueEx, `Abaque des pertes de charge linéaires des conduits circulaires : débit q en m³/h à gauche, de 10 à 500, perte linéaire j en Pa/m en bas, de 0,1 à 5, échelles logarithmiques ; droites des diamètres 80 à 200 mm et droites des vitesses 2 et 3 m/s. Lecture de l’exemple en orange : ${C.p.q} m³/h sur la droite Ø${C.D} donne j = ${C.p.j} Pa/m.`, `Lecture de l’exemple : ${C.p.q} m³/h en Ø${C.D}, j = ${C.p.j} Pa/m`)
        + exempleLineaire()
        + BE.liens([{ href: EX.img.abaque, title: "L’abaque sans la lecture de l’exemple", note: "À ouvrir en grand ou à imprimer en A4" }])
        + BE.renvoi('Pour qui veut le calcul : j = λ ÷ D × ρ × v² ÷ 2 (Darcy-Weisbach), λ par la formule de Colebrook-White. La perte au mètre est expliquée dans AéroRézo, <a href="../../../aerorezo/stations/pertes-lineaires/index.html">« Pertes de charge linéaires »</a>.')
    }),
    BE.ecran({
      id: "pertes-singulieres", dossier: "methode", kicker: "La méthode, 4", title: "Les pertes singulières", level: "comprendre",
      text: `Dans un coude, l’air change de direction, tourbillonne et perd de la pression d’un coup : c’est une perte de charge singulière. Elle vaut Δp = ζ × Pd, où ζ (zêta) est un coefficient sans unité qui dépend de la forme de la pièce, et Pd = ρ × v² ÷ 2 la pression dynamique de l’air dans le tronçon. Ici, un coude à 90° vaut ζ = ${d.zc} ; la sortie de toiture, où l’air quitte le réseau, vaut ζ = ${d.zs}. On additionne les ζ du tronçon, puis on multiplie par Pd. La perte de charge de la gaine est la somme de ses pertes linéaire et singulière. Comptez tous les coudes du tracé, y compris ceux qui ne se voient pas en plan : sur les plans de la station, chacun porte un rond numéroté. Ce geste sert aussi à l’exercice 2 de la feuille du niveau 1.`,
      prompt: "Lisez le tableau des coefficients et l’exemple résolu, puis continuez.",
      render: () => tableau(["Accident de parcours", "ζ", "Source"], [["Coude à 90°", d.zc, "Donnée de l’exercice"], ["Sortie de toiture", d.zs, "Donnée de l’exercice"]], "Les coefficients ζ de la station")
        + exempleSinguliere()
        + figTroncon()
        + BE.renvoi('Les coudes, tés et réductions sont présentés dans AéroRézo, <a href="../../../aerorezo/stations/pertes-singulieres/index.html">« Accidents de parcours »</a>.')
    }),
    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, les pertes", title: "Entraînement : les pertes d’un tronçon", level: "appliquer", requiresAction: true,
      text: {
        1: `Un tronçon en Ø${EX.ex2.D} transporte ${EX.ex2.q} m³/h sur ${EX.ex2.L} m, avec ${coudes(EX.ex2.coudes)} à 90°. Quelle est sa perte de charge, linéaire et singulière ? Lisez j sur l’abaque. L’exemple résolu reste sous vos yeux.`,
        2: `Un tronçon en Ø${EX.ex2.D} transporte ${EX.ex2.q} m³/h sur ${EX.ex2.L} m, avec ${coudes(EX.ex2.coudes)} à 90°. Quelle est sa perte de charge, linéaire et singulière ? Lisez j sur l’abaque. Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la perte de charge, en vous aidant de l’exemple.", 2: "Choisissez la perte de charge. Cette question est à faire seul." },
      aides: {
        1: ["L’abaque est à l’écran « Les pertes linéaires : lire l’abaque », les ζ à l’écran « Les pertes singulières ».", "Calculez d’abord la vitesse dans le Ø100, puis Pd = ρ × v² ÷ 2.", `Sur l’exemple : ${C.p.lin} + ${C.p.sing} = ${C.p.dp} Pa.`],
        2: ["L’abaque est à l’écran « Les pertes linéaires : lire l’abaque ».", "Perte linéaire : j × L.", "Perte singulière : Σζ × ρ × v² ÷ 2."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleLineaire() + exempleSinguliere(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),
    BE.ecran({
      id: "troncon-plus-defavorise", dossier: "methode", kicker: "La méthode, 5", title: "Le tronçon le plus défavorisé", level: "comprendre",
      text: `Chaque bouche demande une pression pour fonctionner, ici ${d.pb} Pa au moins. Le caisson doit donc fournir, au piquage d’une gaine, la pression de la bouche plus la perte de charge de la gaine. Le tronçon le plus défavorisé est celui qui demande la plus forte pression au piquage. Ce n’est pas forcément le plus long : un fort débit et des coudes comptent autant que les mètres. Comme toutes les bouches demandent la même pression, il suffit de comparer les pertes de charge des gaines. Les autres gaines reçoivent un peu trop de pression : leurs bouches s’en accommodent. Ce geste sert à l’exercice 3 de la feuille du niveau 1.`,
      prompt: "Comparez les trois gaines du logement d’exemple, puis continuez.",
      render: () => tableau(["Tronçon", "Δp linéaire (Pa)", "Δp singulière (Pa)", "Δp gaine (Pa)", "Piquage (Pa)"], EX.pointe.piquages.map(g => { const t = T[g.id - 1]; return [`${g.id} ${g.nom}`, t.p.lin, t.p.sing, g.dp, g.piquage]; }), "Logement d’exemple en pointe : pression au piquage = bouche + gaine")
        + figure(EX.img.barres, `Barres de la perte de charge de chaque gaine du logement d’exemple : cuisine ${T[0].p.dp} Pa en pointe et ${T[0].b.dp} Pa en base, salle de bains ${T[1].p.dp} et ${T[1].b.dp} Pa, WC ${T[2].p.dp} et ${T[2].b.dp} Pa.`, "Logement d’exemple : perte de charge de chaque gaine, sans la bouche, en pointe et en base")
        + BE.exemple({ text: "Logement d’exemple en pointe", answer: `la gaine de la ${EX.pointe.nomPire.toLowerCase()} demande ${EX.pointe.piquages[EX.pointe.pire - 1].piquage} Pa au piquage : c’est le tronçon le plus défavorisé`, why: "Elle a le plus fort débit, donc la plus forte vitesse ; la gaine de la salle de bains a un coude de plus, mais moins de débit." })
    }),
    BE.ecran({
      id: "pression-du-caisson", dossier: "methode", kicker: "La méthode, 6", title: "La pression que le caisson doit fournir", level: "comprendre",
      text: "Le caisson aspire l’air des gaines et le pousse dans le rejet. Il doit donc fournir la pression au piquage du tronçon le plus défavorisé, plus la perte de charge du rejet, coude et sortie de toiture compris. Le rejet transporte le débit total : la somme des bouches. Le débit total et cette pression forment le point de fonctionnement que l’on demande au caisson ; on le place sur sa courbe à la station A4. La perte de charge du réseau, sans la bouche, est la part que le tracé et les diamètres coûtent : c’est elle que l’on réduit en raccourcissant une gaine ou en ôtant un coude. Ce geste sert à l’exercice 2 de la feuille du niveau 2.",
      prompt: "Lisez le tableau et l’exemple résolu, puis continuez.",
      render: () => tableau(["Ligne", "Logement d’exemple, pointe"], [
        ["Bouche", `${d.pb} Pa`],
        [`Gaine la plus chargée (${EX.pointe.nomPire.toLowerCase()})`, `${T[EX.pointe.pire - 1].p.dp} Pa`],
        [`Rejet : ${R4.p.q} m³/h en Ø${R4.D}, ${R4.L} m, un coude et la sortie`, `${R4.p.lin} + ${R4.p.sing} = ${R4.p.dp} Pa`],
        ["Perte de charge du réseau, sans la bouche", `${EX.pointe.reseau} Pa`],
        ["Pression que le caisson doit fournir", `${EX.pointe.caisson} Pa à ${EX.pointe.q} m³/h`]
      ], "Du tronçon le plus défavorisé au caisson")
        + exempleCaisson()
        + planLogement()
    }),
    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, le caisson", title: "Entraînement : la pression du caisson", level: "appliquer", requiresAction: true,
      text: {
        1: `Un réseau en étoile a trois gaines : ${EX.ex3.gaines.join(" Pa, ")} Pa de perte de charge. Chaque bouche demande ${d.pb} Pa ; le rejet perd ${EX.ex3.rejet} Pa. Quelle pression le caisson doit-il fournir ? L’exemple résolu reste sous vos yeux.`,
        2: `Un réseau en étoile a trois gaines : ${EX.ex3.gaines.join(" Pa, ")} Pa de perte de charge. Chaque bouche demande ${d.pb} Pa ; le rejet perd ${EX.ex3.rejet} Pa. Quelle pression le caisson doit-il fournir ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la pression, en vous aidant de l’exemple.", 2: "Choisissez la pression. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La pression que le caisson doit fournir ».", "Une seule gaine compte : celle qui demande la plus forte pression au piquage.", `Sur l’exemple : ${d.pb} + ${T[EX.pointe.pire - 1].p.dp} + ${R4.p.dp} = ${EX.pointe.caisson} Pa.`],
        2: ["La méthode est à l’écran « La pression que le caisson doit fournir ».", "Les gaines ne s’additionnent pas entre elles.", "Bouche + gaine la plus chargée + rejet."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleCaisson(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),
    BE.ecran({
      id: "base-et-pointe", dossier: "methode", kicker: "La méthode, 7", title: "Base et pointe", level: "comprendre",
      text: "Une VMC hygroréglable passe la plupart du temps au débit de base et monte au débit de pointe quand on cuisine ou qu’on se douche (station A2). Les diamètres se choisissent au débit de pointe, une fois pour toutes. En base, on garde ces diamètres et on refait les vitesses et les pertes de charge avec les débits de base. Toutes les pertes baissent, mais pas toutes autant : une bouche qui garde son débit en base garde aussi sa perte de charge. Le tronçon le plus défavorisé peut donc changer d’un régime à l’autre, et le caisson doit tenir les deux points de fonctionnement. Le rejet passe le débit total de base. Ce geste sert à l’exercice 1 de la feuille du niveau 2.",
      prompt: "Comparez les deux régimes du logement d’exemple, puis continuez.",
      render: () => tableau(["Tronçon", "Ø", "q base", "v base (m/s)", "j (Pa/m)", "Δp base (Pa)"], T.map(t => [`${t.id} ${t.nom}`, t.D, t.b.q, t.b.v, t.b.j, t.b.dp]), "Logement d’exemple en base, diamètres de la pointe")
        + figure(EX.img.barres, `Barres de la perte de charge de chaque gaine du logement d’exemple, en pointe et en base : en base, la salle de bains passe devant la cuisine.`, "En base, le tronçon le plus défavorisé change : la salle de bains garde une partie de son débit, la cuisine baisse beaucoup")
        + BE.exemple({ text: "Logement d’exemple en base", answer: `la gaine de la ${EX.base.nomPire.toLowerCase()} devient la plus défavorisée ; caisson : ${d.pb} + ${T[EX.base.pire - 1].b.dp} + ${R4.b.dp} = ${EX.base.caisson} Pa à ${EX.base.q} m³/h`, why: `En pointe, c’était la ${EX.pointe.nomPire.toLowerCase()} : ${EX.pointe.caisson} Pa à ${EX.pointe.q} m³/h. Les deux points vont à la station A4.` })
    }),
    BE.ecran({
      id: "reseau-de-soufflage", dossier: "methode", kicker: "La méthode, 8", title: "Le réseau de soufflage du double flux", level: "comprendre",
      text: "En double flux, un second réseau souffle l’air neuf dans les pièces principales par des bouches de soufflage (station A2). Il se dimensionne avec la même méthode : débit de chaque bouche de soufflage, diamètre sous la vitesse maximale, pertes linéaires et singulières, tronçon le plus défavorisé. Le caisson double flux a deux ventilateurs : chacun doit fournir la pression de son réseau, à son débit. Les gaines de soufflage passent aussi dans les combles et sont isolées. Ce geste sert à l’exercice 3 de la feuille du niveau 2 : un calcul, le diamètre et la vitesse d’une gaine de soufflage ; puis deux phrases, sans calcul, sur ce qui change pour le réseau et pour le caisson.",
      prompt: "Lisez les diamètres du soufflage du logement d’exemple, puis continuez vers la note de calcul.",
      render: () => figure(EX.img.doubleFlux, "Schéma de principe du logement d’exemple en double flux, repris de la station A2, avec les débits de base : caisson double flux dans les combles, gaine de soufflage vers les bouches du séjour et des deux chambres, gaine d’extraction des pièces de service.", "Logement d’exemple en double flux (station A2) : à gauche, la gaine de soufflage ; à droite, la gaine d’extraction. Les débits écrits sur ce schéma sont les débits de base ; le tableau ci-dessous donne les débits de pointe, ceux qui servent à choisir les diamètres")
        + tableau(["Bouche de soufflage", "q pointe (m³/h)", "Ø (mm)", "v (m/s)"], EX.df.map(s => [s.nom, s.q, s.D, s.v]), "Logement d’exemple : soufflage en pointe")
        + BE.exemple({ text: `Soufflage du séjour du logement d’exemple : ${EX.df[0].q} m³/h en pointe`, answer: `Ø${EX.df[0].D} : v = ${EX.df[0].v} m/s, sous ${d.vmax} m/s${EX.df[0].vPetit ? ` (le Ø80 donnerait ${EX.df[0].vPetit} m/s)` : ""}`, why: "Le débit soufflé dans une pièce principale est celui de son entrée d’air en simple flux, au prorata du volume (station A2)." })
    }),
    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 9", title: "La note de calcul", level: "comprendre",
      text: "La première page de la note de calcul dit en quelques lignes ce qui a été calculé, avec quoi et ce qui en sort : l’objet, les hypothèses et leurs sources, les résultats, et ce que l’on transmet pour choisir le caisson. Chaque valeur cite son origine : la station A2 pour les débits, le schéma pour le tracé, la commande pour les données de l’exercice, l’abaque pour les pertes linéaires. Un lecteur doit pouvoir refaire le calcul sans vous. Ce geste sert à l’exercice 4 de la feuille du niveau 2.",
      prompt: "Lisez la première page de la note du logement d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Contenu"], [
        ["Objet", `Réseau de gaines de la VMC simple flux du logement d’exemple, en étoile, caisson dans les combles.`],
        ["Hypothèses et sources", `Débits de la station A2 ; tracé du schéma ; diamètres, ${d.vmax} m/s au plus, ζ et bouche ${d.pb} Pa : données de l’exercice ; abaque acier galvanisé.`],
        ["Résultats", `Cuisine Ø${T[0].D}, salle de bains et WC Ø${T[1].D}, rejet Ø${R4.D} ; plus défavorisé : ${EX.pointe.nomPire.toLowerCase()} en pointe, ${EX.base.nomPire.toLowerCase()} en base.`],
        ["Pour le caisson", `${EX.pointe.q} m³/h sous ${EX.pointe.caisson} Pa en pointe ; ${EX.base.q} m³/h sous ${EX.base.caisson} Pa en base (station A4).`]
      ], "Logement d’exemple : première page de la note de calcul")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

/* Station BE-A4 : Ventilateur, caisson.
   Méthode sur le logement d'exemple des stations A2 et A3 (plain-pied, trois pièces principales), avec le caisson A ; niveau 1 sur
   le même logement avec le caisson B ; niveau 2 sur la maison. Les valeurs de l'exemple (bloc EXEMPLE), les données de la commande
   et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/a4-ventilateur-caisson/construire.mjs, depuis
   exemple-data.mjs, fil-rouge/maison/cctp-ajout-a4.json et corriges/a4-ventilateur-caisson/reference-ventilateur.json
   (outils/a4-ventilateur-maison.mjs). Les figures de illustrations/ sont tracées par le même outil (schema.mjs).
   Aucune valeur calculée de la maison ni du niveau 1 n'est écrite dans cette station : seules les bornes des fourchettes et les
   données des commandes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "d": {
  "etaA": "0,25",
  "etaB": "0,35",
  "A": [
   "122",
   "137",
   "152"
  ],
  "B": [
   "141",
   "156",
   "171"
  ]
 },
 "lg": {
  "qp": "150",
  "pp": "87,42",
  "qb": "75",
  "pb": "81,86"
 },
 "reseau100": "38,85",
 "reseauEx": [
  {
   "q": "100",
   "calcul": "87,42 × (100 ÷ 150)²",
   "dp": "38,85"
  },
  {
   "q": "200",
   "calcul": "87,42 × (200 ÷ 150)²",
   "dp": "155,41"
  }
 ],
 "posA": [
  {
   "n": 1,
   "pointe": "79",
   "base": "111",
   "okP": false,
   "okB": true
  },
  {
   "n": 2,
   "pointe": "94",
   "base": "126",
   "okP": true,
   "okB": true
  },
  {
   "n": 3,
   "pointe": "109",
   "base": "141",
   "okP": true,
   "okB": true
  }
 ],
 "exA": {
  "position": 2,
  "q": "154",
  "dp": "92",
  "cp": "94",
  "cb": "126",
  "reserveP": "6,58",
  "reserveB": "44,14",
  "P": "15,74",
  "Pb": "10,50",
  "Pspec": "0,10",
  "utile": "3,94",
  "perte": "11,80"
 },
 "ex1": {
  "q1": "200",
  "dp1": "100",
  "q2": "100",
  "quiz": {
   "choices": [
    "50 Pa",
    "25 Pa",
    "100 Pa",
    "12,5 Pa"
   ],
   "good": 1,
   "explain": "Le débit est divisé par 2 ; la pression, par 4 : 100 × (100 ÷ 200)² = 25 Pa. 50 Pa suppose une pression proportionnelle au débit, 100 Pa une pression qui ne change pas, 12,5 Pa élève le rapport au cube."
  }
 },
 "ex2": {
  "qp": "160",
  "pp": "90",
  "qb": "80",
  "pb": "85",
  "lignes": [
   [
    "Position 1",
    "84",
    "112"
   ],
   [
    "Position 2",
    "99",
    "127"
   ],
   [
    "Position 3",
    "114",
    "142"
   ]
  ],
  "quiz": {
   "choices": [
    "La position 1",
    "La position 2",
    "La position 3",
    "Aucune des trois"
   ],
   "good": 1,
   "explain": "La position 1 donne 84 Pa à 160 m³/h, moins que 90 Pa : elle tient la base, pas la pointe. La position 2 donne 99 et 127 Pa, au-dessus des deux points : c’est la plus petite qui convient. La position 3 conviendrait aussi, mais elle ferait plus de bruit et consommerait plus. « Aucune des trois » oublie que la position 2 tient les deux points."
  }
 },
 "ex3": {
  "q": "144",
  "dp": "100",
  "eta": "0,25",
  "quiz": {
   "choices": [
    "4 W",
    "16 W",
    "1 W",
    "57 600 W"
   ],
   "good": 1,
   "explain": "144 ÷ 3 600 = 0,04 m³/s ; 0,04 × 100 = 4 W donnés à l’air ; ÷ 0,25 : 16 W absorbés. 4 W oublie le rendement, 1 W multiplie par le rendement au lieu de diviser, le dernier garde le débit en m³/h."
  }
 },
 "img": {
  "caisson": "illustrations/caisson-coupe.svg",
  "courbesA": "illustrations/courbes-a.svg",
  "courbesB": "illustrations/courbes-b.svg",
  "courbesAB": "illustrations/courbes-caissons.svg",
  "reseauEx": "illustrations/reseau-exemple.svg",
  "pointEx": "illustrations/point-exemple.svg",
  "puissance": "illustrations/puissance.svg",
  "implantation": "illustrations/implantation-comble.svg"
 }
};
/*EXEMPLE-FIN*/

const d = EX.d, L = EX.lg, A = EX.exA;
/* Une figure s'ouvre en grand d'un toucher (au téléphone, le doigt l'agrandit ensuite). */
const figure = (src, alt, legende) => `<figure class="schema"><a href="${BE.esc(src)}" target="_blank" rel="noopener"><img src="${BE.esc(src)}" alt="${BE.esc(alt)}"></a><figcaption>${BE.esc(legende.replace(/\.?$/, "."))} Touchez la figure pour l’ouvrir en grand.</figcaption></figure>`;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const altCourbes = (id, liste) => `Graphique débit-pression : le débit q en m³/h en bas, de 0 à 350 ; la pression Δp en Pa à gauche, de 0 à 180 ; grille fine tous les 10 m³/h et tous les 5 Pa. Trois courbes du caisson ${id}, une par position, qui partent à gauche de ${liste} Pa et descendent vers la droite : plus le débit est fort, moins le caisson donne de pression.`;
const figPoint = () => figure(EX.img.pointEx, `${altCourbes("A", d.A.join(", "))} En orange, la parabole du réseau du logement d’exemple, qui part de zéro et monte de plus en plus vite. Un carré marque le point demandé en pointe, ${L.qp} m³/h sous ${L.pp} Pa ; un losange, le point demandé en base, ${L.qb} m³/h sous ${L.pb} Pa. Un rond orange marque le croisement de la parabole et de la courbe A${A.position}, lu à ${A.q} m³/h sous ${A.dp} Pa, avec ses traits de lecture jusqu’aux deux axes.`, `Logement d’exemple, caisson A : la parabole du réseau croise la courbe A${A.position} au point de fonctionnement, lu à ${A.q} m³/h sous ${A.dp} Pa`);
const exempleReseau = () => BE.exemple({ text: `Logement d’exemple : le caisson doit fournir ${L.pp} Pa à ${L.qp} m³/h en pointe. Quelle pression le réseau demande-t-il à 100 m³/h ?`, answer: `Δp = ${L.pp} × (100 ÷ ${L.qp})² = ${EX.reseau100} Pa`, why: "Deux fois moins de débit demande quatre fois moins de pression : la perte de charge varie comme le carré du débit." });
const exemplePoint = () => BE.exemple({ text: `Logement d’exemple, caisson A en position ${A.position}`, answer: `la parabole du réseau croise la courbe A${A.position} vers ${A.q} m³/h et ${A.dp} Pa : c’est le point de fonctionnement en pointe`, why: `Lu à la règle sur la figure, à 2 m³/h et à 1 Pa près. Le débit lu dépasse un peu les ${L.qp} m³/h demandés : le caisson a de la marge.` });
const exemplePosition = () => BE.exemple({ text: `Logement d’exemple, caisson A : pointe ${L.qp} m³/h sous ${L.pp} Pa, base ${L.qb} m³/h sous ${L.pb} Pa`, answer: `A1 donne ${EX.posA[0].pointe} Pa à ${L.qp} m³/h, moins que ${L.pp} Pa : refusée, même si elle tient la base. A${A.position} donne ${A.cp} Pa en pointe et ${A.cb} Pa en base : retenue. Réserves : ${A.cp} − ${L.pp} = ${A.reserveP} Pa en pointe, ${A.cb} − ${L.pb} = ${A.reserveB} Pa en base`, why: "On prend la plus petite position qui passe au-dessus des deux points. La position au-dessus tiendrait aussi, mais elle ferait plus de bruit et consommerait plus." });
const exemplePuissance = () => BE.exemple({ text: `Logement d’exemple, caisson A en position ${A.position}, rendement global η = ${d.etaA}`, answer: `pointe : P = ${A.q} ÷ 3 600 × ${A.dp} ÷ ${d.etaA} = ${A.P} W ; base : P = ${L.qb} ÷ 3 600 × ${A.cb} ÷ ${d.etaA} = ${A.Pb} W`, why: `Le débit passe en m³/s (÷ 3 600) pour que le produit débit × pression donne des watts. Puissance spécifique en pointe : ${A.P} ÷ ${A.q} = ${A.Pspec} W par m³/h.` });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Les deux points demandés du logement d’exemple sont dans la commande : ${L.qp} m³/h sous ${L.pp} Pa en pointe, ${L.qb} m³/h sous ${L.pb} Pa en base. Les courbes du caisson B sont au verso de la feuille réponse ; son rendement est dans la commande.`,
      "Exercice 1 de la feuille : écran « La courbe du réseau ». Exercice 2 : écran « Choisir la position : pointe et base » ; avec le caisson B, plusieurs positions peuvent tenir les deux points, gardez alors la plus petite (au niveau 2, certaines positions sont refusées). Exercice 3 : écran « Le point de fonctionnement ». Exercice 4 : écran « La puissance absorbée ».",
      `Sur l’exemple, avec le caisson A, la courbe A${A.position} croise la parabole vers ${A.q} m³/h et ${A.dp} Pa. Tracez la même parabole sur les courbes du caisson B, puis lisez son croisement avec la position que vous retenez.`
    ],
    2: [
      "Les deux points demandés au caisson sont vos résultats de la station A3 : débit et pression en pointe, débit et pression en base. Les courbes des caissons A et B sont sur la page à imprimer ; leurs rendements sont dans la commande.",
      "Quatre gestes déjà vus : la parabole du réseau, le choix de la position sur les deux points, le point de fonctionnement, la puissance absorbée. Faites-les pour chaque caisson avant de choisir.",
      "Commencez par lire, pour chaque position des deux caissons, la pression que la courbe donne au débit de pointe : la plupart des positions tombent déjà sous le point demandé."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensProjet = n => BE.liens(n === 1 ? [
  { href: EX.img.courbesB, title: "Les courbes du caisson B", note: "Les mêmes qu’au verso de la feuille réponse, à ouvrir en grand" }
] : [
  { href: EX.img.courbesAB, title: "Les courbes des caissons A et B, à imprimer", note: "Une page A4 : tracez-y la parabole du réseau de la maison" },
  { href: "../a3-reseau-gaines/illustrations/plan-maison.svg", title: "Le réseau de gaines de la maison (station A3)", note: "Place du caisson et du rejet dans les combles" },
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Système de ventilation à la page 4" }
]);
ecranProjet.render = () => { const html = rendreCommande(); if (html.includes("partie-reservee")) return html; return html + liensProjet(html.includes("niveau autonome") ? 2 : 1); };

BE.station({
  code: "BE-A4",
  titre: "Ventilateur, caisson",
  ligne: "Aéraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le logement d’exemple : courbe du réseau, position du caisson B, point de fonctionnement et puissance absorbée, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison : choix entre deux caissons, position, points de fonctionnement en pointe et en base, réserves, puissances, note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Le réseau de gaines est dimensionné : il demande au caisson un débit sous une pression, en pointe et en base. Le bureau d’études choisit maintenant le caisson sur sa courbe débit-pression, règle sa position, lit le point où il fonctionnera et calcule la puissance qu’il absorbe. Il prévoit aussi ce qui limite le bruit. Vous apprenez la méthode sur le logement d’exemple des stations A2 et A3, puis vous la faites seul sur la maison.",
  note: "Les deux caissons A et B, leurs courbes et leurs rendements sont des données de l’exercice, tracées par la station : ce ne sont pas des appareils du commerce. Le catalogue du fabricant donne ces courbes ; vous les lirez de la même façon. La loi du réseau (la perte de charge varie comme le carré du débit) et la puissance absorbée (débit × pression ÷ rendement) viennent de la mécanique des fluides. Le bruit est traité en notion, sans chiffre.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un logement d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, courbes et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Le logement d’exemple : vérifier un second caisson, le caisson B",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études a choisi le caisson A pour le logement d’exemple (écrans de la méthode). Il veut comparer avec le caisson B. Le réseau demande au caisson ${L.qp} m³/h sous ${L.pp} Pa en pointe, ${L.qb} m³/h sous ${L.pb} Pa en base (station A3). Données de l’exercice : les courbes du caisson B, au verso de la feuille réponse ; son rendement global, η = ${d.etaB}. Suivez les étapes dans l’ordre.`,
        `Étape 1. Calculez la pression que le réseau demande à 50, 120 et 200 m³/h (100 m³/h est l’exemple de la feuille), puis tracez sa parabole sur les courbes du caisson B, au verso.`,
        `Étape 2. Lisez, pour chaque position du caisson B, la pression que la courbe donne à ${L.qp} m³/h et à ${L.qb} m³/h. Retenez la plus petite position qui passe au-dessus des deux points.`,
        "Étape 3. Lisez le point de fonctionnement en pointe, au croisement de la parabole et de la courbe retenue, puis calculez la puissance absorbée. Vérifiez la pression de la courbe au débit de pointe, la pression au point de fonctionnement et la puissance à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Courbes du caisson B", ou: "Au verso de la feuille réponse, et lien ci-dessous" },
        { piece: "Points demandés au caisson", ou: "Dans la commande (station A3, logement d’exemple)" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Le caisson de la VMC de la maison : choix, réglage, points de fonctionnement, puissance absorbée, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études choisit le caisson d’extraction de la VMC simple flux hygroréglable de la maison (CCTP page 4). Données : vos résultats de la station A3, le débit et la pression que le réseau demande au caisson en pointe et en base. Données de l’exercice : les courbes des caissons A et B, sur la page à imprimer ; leurs rendements globaux, η = ${d.etaA} pour le caisson A et η = ${d.etaB} pour le caisson B. Tracez la parabole du réseau de la maison. Pour chaque position des deux caissons, lisez la pression au débit de pointe et au débit de base, puis retenez le caisson et la plus petite position qui passe au-dessus des deux points. Lisez le point de fonctionnement en pointe et la pression de la courbe en base, calculez les réserves de pression et la puissance absorbée dans les deux régimes. Dites ce que vous prévoyez contre le bruit, puis rédigez la première page de la note de calcul.`,
      pieces: [
        { piece: "Vos résultats de la station A3", ou: "Débit et pression demandés au caisson, en pointe et en base" },
        { piece: "Courbes des caissons A et B", ou: "Lien ci-dessous, une page A4 à imprimer" },
        { piece: "Le réseau de gaines de la maison", ou: "Lien ci-dessous (station A3)" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },
  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-courbe", libelle: "Pression donnée par la courbe retenue du caisson B au débit de pointe, en Pa", unite: "Pa", min: 99.75, max: 110.25, indice: "Relisez l’écran « Lire la courbe d’un caisson » : partez du débit de pointe en bas, montez jusqu’à la courbe de la position retenue, lisez la pression à gauche." },
      { id: "n1-dp", libelle: "Pression au point de fonctionnement en pointe, en Pa", unite: "Pa", min: 94.87, max: 104.87, indice: "Relisez l’écran « Le point de fonctionnement » : tracez la parabole du réseau sur les courbes du caisson, puis lisez la pression au croisement avec la courbe retenue." },
      { id: "n1-P", libelle: "Puissance absorbée en pointe, en W", unite: "W", min: 12.07, max: 13.35, indice: "Relisez l’écran « La puissance absorbée » : P = q ÷ 3 600 × Δp ÷ η, avec le débit et la pression lus au point de fonctionnement et le rendement du caisson." }
    ],
    2: [
      { id: "n2-dp", libelle: "Pression au point de fonctionnement en pointe, en Pa", unite: "Pa", min: 97.36, max: 106.5, indice: "Relisez les écrans « Choisir la position : pointe et base » et « Le point de fonctionnement » : le caisson et la position doivent tenir les deux points ; la pression se lit au croisement de la parabole et de la courbe retenue." },
      { id: "n2-base", libelle: "Pression donnée par la courbe retenue au débit de base, en Pa", unite: "Pa", min: 135.88, max: 150.2, indice: "Relisez l’écran « Choisir la position : pointe et base » : en base, le point de fonctionnement remonte sur la courbe retenue jusqu’au débit de base ; lisez-y la pression." },
      { id: "n2-Pp", libelle: "Puissance absorbée en pointe, en W", unite: "W", min: 14.12, max: 15.61, indice: "Relisez l’écran « La puissance absorbée » : au point de fonctionnement en pointe, P = q ÷ 3 600 × Δp ÷ η, avec le débit et la pression lus au croisement (pas le point demandé) et le rendement du caisson retenu." },
      { id: "n2-Pb", libelle: "Puissance absorbée en base, en W", unite: "W", min: 9.7, max: 10.73, indice: "Relisez l’écran « La puissance absorbée » : en base, le débit de base et la pression lue sur la courbe à ce débit, avec le rendement du caisson retenu." }
    ]
  },
  /*FOURCHETTES-FIN*/
  suivante: { code: "BE-A5", titre: "La CTA", href: "../a5-cta-composer/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Ventilateur et équilibrage", href: "../../../aerorezo/stations/ventilateur-equilibrage/index.html", pourquoi: "La courbe du ventilateur, celle du réseau et leur croisement." },
    { reseau: "AéroRézo", titre: "Pressions dans un réseau", href: "../../../aerorezo/stations/pressions-reseau/index.html", pourquoi: "Pression statique, dynamique et totale le long d’un réseau." },
    { reseau: "AéroRézo", titre: "Étudier un réseau VMC", href: "../../../aerorezo/stations/dimensionner-vmc/index.html", pourquoi: "Le réseau d’une VMC, de la bouche au caisson." },
    { reseau: "Bureau d’études", titre: "BE-A3, Le réseau de gaines", href: "../a3-reseau-gaines/index.html", pourquoi: "Le débit et la pression demandés au caisson viennent de cette station." }
  ],
  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Le caisson d’une VMC contient un ventilateur qui aspire l’air des gaines et le rejette dehors. La station A3 a dit ce que le réseau lui demande : un débit sous une pression, en pointe et en base. Le bureau d’études choisit le caisson qui tient ces deux points sur sa courbe, règle sa position, lit son point de fonctionnement et calcule la puissance qu’il absorbe. Il prévoit aussi la pose qui limite le bruit. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Régime", "Débit (m³/h)", "Pression (Pa)", "Puissance absorbée (W)"], [
        ["Pointe, point de fonctionnement", "", "", ""],
        ["Base", "", "", ""]
      ], "Le caisson retenu et sa position, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "le caisson de la VMC."], ["Le dossier :", "les points demandés par le réseau (station A3), les courbes de deux caissons, leurs rendements."]] },
          { title: "Vous produisez", rows: [["Le choix :", "le caisson, sa position, ses points de fonctionnement."], ["Le résultat :", "les réserves de pression et la puissance absorbée. Vérification à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la puissance de l’année, reprise pour le bilan d’énergie."]] }
        ])
    }),
    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Le débit et la pression que le réseau demande au caisson viennent de la station A3, en pointe et en base, bouche comprise. Le système de ventilation, une VMC simple flux hygroréglable, est à la page 4 du CCTP. Les courbes des deux caissons A et B et leurs rendements sont des données de l’exercice : la station les trace, ce ne sont pas des appareils du commerce. Sur un vrai projet, le catalogue du fabricant donne ces courbes ; vous les lirez de la même façon.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Débit et pression demandés, pointe et base", "Station A3 ; logement d’exemple : écrans de A3 et commande du niveau 1"],
        ["Système de ventilation", "CCTP de la maison, page 4"],
        ["Courbes des caissons A et B", "Donnée de l’exercice, tracée par la station"],
        [`Rendement global : A ${d.etaA}, B ${d.etaB}`, "Donnée de l’exercice"],
        ["Bruit", "Notion, sans chiffre"]
      ], "Les données du choix du caisson")
        + BE.renvoi('Le débit et la pression demandés ont été établis à <a href="../a3-reseau-gaines/index.html">la station A3</a>.')
    }),
    BE.ecran({
      id: "le-caisson", dossier: "methode", kicker: "La méthode, 1", title: "Le caisson d’extraction", level: "comprendre",
      text: "Le caisson est une boîte isolée posée dans les combles. Les gaines des bouches arrivent sur ses piquages, c’est-à-dire ses entrées. À l’intérieur, un ventilateur centrifuge, entraîné par un moteur électrique, aspire l’air et le pousse vers le rejet, qui sort par le toit. Un sélecteur à plusieurs positions règle la vitesse du moteur ; on le règle une fois pour toutes à la mise en service. Le caisson repose sur des plots antivibratiles, des petits supports souples qui empêchent ses vibrations de passer dans la charpente.",
      prompt: "Suivez le chemin de l’air sur le schéma, des piquages au rejet, puis continuez.",
      render: () => figure(EX.img.caisson, "Coupe de principe d’un caisson d’extraction : une boîte isolée ; à gauche, trois piquages où arrivent les gaines, avec une flèche orange d’air qui entre ; au centre, le ventilateur centrifuge ; à côté, le moteur ; à droite, le rejet vers le toit, avec une flèche orange d’air qui sort ; sous la boîte, deux plots antivibratiles posés sur un support.", "Le caisson en coupe : l’air entre par les piquages, traverse le ventilateur et sort par le rejet")
        + BE.renvoi('Le ventilateur et son réseau sont présentés dans AéroRézo, <a href="../../../aerorezo/stations/ventilateur-equilibrage/index.html">« Ventilateur et équilibrage »</a>.')
    }),
    BE.ecran({
      id: "courbe-du-caisson", dossier: "methode", kicker: "La méthode, 2", title: "Lire la courbe d’un caisson", level: "comprendre",
      text: `La courbe d’un caisson dit quelle pression son ventilateur donne à l’air pour chaque débit. Le débit est en bas, en m³/h ; la pression à gauche, en Pa. Plus le débit est fort, moins le caisson donne de pression : la courbe descend vers la droite. Chaque position du sélecteur a sa courbe ; la position la plus haute est au-dessus. Pour lire une pression, partez du débit en bas, montez jusqu’à la courbe, puis allez à gauche lire la pression. La grille fine vaut 10 m³/h et 5 Pa : on lit à 1 Pa près en partageant le carreau à l’œil. Les courbes A1, A2, A3 sont celles du caisson A de l’exercice. Le catalogue du fabricant donne ces courbes ; vous les lirez de la même façon.`,
      prompt: "Lisez la pression de la courbe A1 à 150 m³/h sur la figure, puis comparez avec l’exemple.",
      render: () => figure(EX.img.courbesA, altCourbes("A", d.A.join(", ")), "Caisson A, donnée de l’exercice : une courbe par position du sélecteur")
        + BE.exemple({ text: `Caisson A, position 1 : quelle pression à ${L.qp} m³/h ?`, answer: `en partant de ${L.qp} m³/h en bas, on rencontre la courbe A1 vers ${EX.posA[0].pointe} Pa`, why: "Lu à la règle sur la figure, au pascal près." })
        + BE.liens([{ href: EX.img.courbesB, title: "Les courbes du caisson B", note: "Même lecture, autre caisson de l’exercice" }])
    }),
    BE.ecran({
      id: "courbe-du-reseau", dossier: "methode", kicker: "La méthode, 3", title: "La courbe du réseau", level: "comprendre",
      text: `Le réseau aussi a sa courbe. Sa perte de charge varie comme le carré du débit : deux fois plus de débit demande quatre fois plus de pression. Elle passe par le point demandé en pointe, bouche comprise, et par zéro à débit nul : c’est une parabole. On calcule quelques points avec Δp = Δp pointe × (q ÷ q pointe)², puis on les relie. Pour le logement d’exemple, le point de pointe est ${L.qp} m³/h sous ${L.pp} Pa. Ce geste sert à l’exercice 1 de la feuille.`,
      prompt: "Lisez la formule, le tableau et l’exemple résolu, puis continuez.",
      render: () => tableau(["q (m³/h)", "Calcul posé", "Δp (Pa)"], EX.reseauEx.map(p => [p.q, p.calcul, p.dp]), "Logement d’exemple : deux points de la parabole")
        + figure(EX.img.reseauEx, `Graphique débit-pression vide de courbe de caisson : la parabole orange du réseau du logement d’exemple part de zéro, passe par le point demandé en pointe, ${L.qp} m³/h sous ${L.pp} Pa, marqué d’un carré, et monte de plus en plus vite vers la droite.`, "Logement d’exemple : la parabole du réseau passe par zéro et par le point de pointe")
        + exempleReseau()
    }),
    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, la courbe du réseau", title: "Entraînement : la loi du réseau", level: "appliquer", requiresAction: true,
      text: {
        1: `Un réseau demande ${EX.ex1.dp1} Pa à ${EX.ex1.q1} m³/h. Quelle pression demande-t-il à ${EX.ex1.q2} m³/h ? L’exemple résolu reste sous vos yeux.`,
        2: `Un réseau demande ${EX.ex1.dp1} Pa à ${EX.ex1.q1} m³/h. Quelle pression demande-t-il à ${EX.ex1.q2} m³/h ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La courbe du réseau ».", "Calculez d’abord le rapport des débits, puis élevez-le au carré.", `Sur l’exemple : ${L.pp} × (100 ÷ ${L.qp})² = ${EX.reseau100} Pa.`],
        2: ["La méthode est à l’écran « La courbe du réseau ».", "La perte de charge varie comme le carré du débit.", "Δp = Δp connu × (q ÷ q connu)²."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleReseau(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),
    BE.ecran({
      id: "point-de-fonctionnement", dossier: "methode", kicker: "La méthode, 4", title: "Le point de fonctionnement", level: "comprendre",
      text: `Posé sur un réseau, un caisson fonctionne là où sa courbe croise celle du réseau : le ventilateur donne la pression que le réseau demande à ce débit. C’est le point de fonctionnement. On trace la parabole sur les courbes du caisson, puis on lit le croisement : le débit en descendant vers le bas, la pression en allant à gauche. Lu à la règle, il se donne à 2 m³/h et à 1 Pa près ; la station accepte une lecture à 5 % près. Ce geste sert à l’exercice 3 de la feuille.`,
      prompt: "Suivez les traits de lecture sur la figure, puis lisez l’exemple résolu.",
      render: () => figPoint() + exemplePoint()
    }),
    BE.ecran({
      id: "choisir-la-position", dossier: "methode", kicker: "La méthode, 5", title: "Choisir la position : pointe et base", level: "comprendre",
      text: `Une VMC hygroréglable passe la plupart du temps en base et monte en pointe quand on cuisine ou qu’on se douche. En base, les bouches se ferment en partie : le réseau devient plus résistant, sa parabole se redresse, et le point de fonctionnement remonte le long de la courbe du caisson jusqu’au débit de base. La courbe retenue doit donc passer au-dessus du point demandé en pointe et au-dessus du point demandé en base. On lit, pour chaque position, la pression au débit de pointe et au débit de base, et on retient la plus petite position qui tient les deux. La réserve de pression est ce que la courbe donne en plus du point demandé, au même débit : pression de la courbe au débit demandé moins pression demandée, et non la pression lue au point de fonctionnement. Une position trop haute fait plus de bruit et consomme plus. Ce geste sert à l’exercice 2 de la feuille.`,
      prompt: "Lisez le tableau des trois positions du caisson A, puis l’exemple résolu.",
      render: () => tableau(["Position", `À ${L.qp} m³/h (Pa)`, `Au-dessus de ${L.pp} ?`, `À ${L.qb} m³/h (Pa)`, `Au-dessus de ${L.pb} ?`], EX.posA.map(p => [`A${p.n}`, p.pointe, p.okP ? "oui" : "non", p.base, p.okB ? "oui" : "non"]), "Logement d’exemple, caisson A : pressions lues sur les courbes")
        + figPoint() + exemplePosition()
    }),
    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, la position", title: "Entraînement : la position d’un caisson", level: "appliquer", requiresAction: true,
      text: {
        1: `Un caisson C a trois positions. Le réseau lui demande ${EX.ex2.qp} m³/h sous ${EX.ex2.pp} Pa en pointe, ${EX.ex2.qb} m³/h sous ${EX.ex2.pb} Pa en base. Le tableau donne les pressions lues sur ses courbes. Quelle position retenez-vous ? L’exemple résolu reste sous vos yeux.`,
        2: `Un caisson C a trois positions. Le réseau lui demande ${EX.ex2.qp} m³/h sous ${EX.ex2.pp} Pa en pointe, ${EX.ex2.qb} m³/h sous ${EX.ex2.pb} Pa en base. Le tableau donne les pressions lues sur ses courbes. Quelle position retenez-vous ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la position, en vous aidant de l’exemple.", 2: "Choisissez la position. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Choisir la position : pointe et base ».", "Une position doit tenir les deux points : la pointe et la base.", `Sur l’exemple, A1 tient la base mais pas la pointe : on a retenu A${A.position}.`],
        2: ["La méthode est à l’écran « Choisir la position : pointe et base ».", "Comparez chaque pression lue au point demandé du même débit.", "La plus petite position qui tient les deux."]
      },
      ...BE.parNiveau({
        1: avecBloc(tableau(["Position", `À ${EX.ex2.qp} m³/h (Pa)`, `À ${EX.ex2.qb} m³/h (Pa)`], EX.ex2.lignes, "Caisson C : pressions lues sur ses courbes") + exemplePosition(), EX.ex2.quiz),
        2: avecBloc(tableau(["Position", `À ${EX.ex2.qp} m³/h (Pa)`, `À ${EX.ex2.qb} m³/h (Pa)`], EX.ex2.lignes, "Caisson C : pressions lues sur ses courbes"), EX.ex2.quiz)
      })
    }),
    BE.ecran({
      id: "puissance-absorbee", dossier: "methode", kicker: "La méthode, 6", title: "La puissance absorbée", level: "comprendre",
      text: `L’air reçoit du ventilateur une puissance égale au débit multiplié par la pression : q ÷ 3 600 × Δp, en watts, avec q en m³/h et Δp en Pa. Le moteur et le ventilateur en perdent une partie en chaleur et en bruit. Le rendement global η du caisson dit la part qui arrive à l’air. La puissance absorbée, celle que le moteur prend au réseau électrique, vaut donc P = q ÷ 3 600 × Δp ÷ η. On la calcule au point de fonctionnement en pointe et en base. Divisée par le débit, elle donne la puissance spécifique, en W par m³/h : elle sert à comparer deux caissons quand tous les deux tiennent les points demandés ; un caisson écarté n’a pas à être calculé. Ici, le rendement est une donnée de l’exercice, pris le même dans les deux régimes. Ce geste sert à l’exercice 4 de la feuille.`,
      prompt: "Lisez la figure et l’exemple résolu, puis continuez.",
      render: () => figure(EX.img.puissance, `Deux barres. La première, bleue, est la puissance absorbée par le moteur, ${A.P} W. La seconde est partagée : une part orange, ${A.utile} W, donnée à l’air, égale au débit en m³/s multiplié par la pression ; le reste, ${A.perte} W, perdu en chaleur et en bruit. Rendement global ${d.etaA}.`, `Logement d’exemple, caisson A en pointe : sur ${A.P} W absorbés, ${A.utile} W vont à l’air`)
        + exemplePuissance()
    }),
    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, la puissance", title: "Entraînement : la puissance absorbée", level: "appliquer", requiresAction: true,
      text: {
        1: `Un caisson fonctionne à ${EX.ex3.q} m³/h sous ${EX.ex3.dp} Pa ; son rendement global vaut ${EX.ex3.eta}. Quelle puissance absorbe-t-il ? L’exemple résolu reste sous vos yeux.`,
        2: `Un caisson fonctionne à ${EX.ex3.q} m³/h sous ${EX.ex3.dp} Pa ; son rendement global vaut ${EX.ex3.eta}. Quelle puissance absorbe-t-il ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la puissance, en vous aidant de l’exemple.", 2: "Choisissez la puissance. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La puissance absorbée ».", "Passez d’abord le débit en m³/s.", `Sur l’exemple : ${A.q} ÷ 3 600 × ${A.dp} ÷ ${d.etaA} = ${A.P} W.`],
        2: ["La méthode est à l’écran « La puissance absorbée ».", "Débit en m³/s.", "P = q ÷ 3 600 × Δp ÷ η."]
      },
      ...BE.parNiveau({
        1: avecBloc(exemplePuissance(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),
    BE.ecran({
      id: "le-bruit", dossier: "methode", kicker: "La méthode, 7", title: "Le bruit du caisson", level: "comprendre",
      text: "Un caisson fait du bruit de deux façons. Son bruit passe dans l’air des gaines jusqu’aux bouches ; ses vibrations passent dans la charpente. On mesure le niveau sonore en décibels A, notés dB(A) : l’échelle suit la sensibilité de l’oreille. Le catalogue du fabricant donne ce niveau pour chaque position. Pour le limiter, on pose le caisson sur des plots antivibratiles ; on le raccorde aux gaines par des manchettes souples, de courts conduits souples qui coupent la transmission des vibrations ; on peut ajouter un piège à son, un tronçon garni d’isolant qui absorbe le bruit dans la gaine. On garde aussi des vitesses d’air faibles dans les gaines (station A3) et la plus petite position qui convient. La station ne donne aucun chiffre réglementaire.",
      prompt: "Repérez sur la figure les plots, les manchettes souples et le piège à son, puis continuez.",
      render: () => figure(EX.img.implantation, "Coupe des combles : le toit à deux pentes, coupé aux bords de la figure ; l’isolant posé sur le plancher, au-dessus du plafond de l’étage. Le caisson repose sur deux plots antivibratiles posés sur une planche. À gauche, une manchette souple le relie à une gaine isolée qui descend à travers le plancher jusqu’à une bouche d’extraction au plafond, avec une flèche orange d’air qui monte. À droite, une autre manchette souple, un coude, une gaine qui monte, traverse un piège à son et sort par la sortie de toiture.", "Le caisson dans les combles : plots antivibratiles, manchettes souples, gaines isolées, piège à son sur le rejet")
        + BE.renvoi('Le confort acoustique est présenté dans les stations de la Législation sur le bruit, par exemple <a href="../../../legislation/stations/acoustique-traiter-le-bruit/index.html">« Traiter le bruit »</a>.')
    }),
    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 8", title: "La note de calcul", level: "comprendre",
      text: "La première page de la note de calcul dit en quelques lignes ce qui a été choisi, avec quoi et ce qui en sort : l’objet, les hypothèses et leurs sources, les résultats, ce qui est prévu contre le bruit, et ce que l’on transmet pour la suite. Chaque valeur cite son origine : la station A3 pour les points demandés, la page des courbes pour le caisson, la commande pour les rendements. Un lecteur doit pouvoir refaire le choix sans vous. Ce geste sert à l’exercice 5 de la feuille du niveau 2.",
      prompt: "Lisez la première page de la note du logement d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Contenu"], [
        ["Objet", "Caisson d’extraction de la VMC simple flux du logement d’exemple."],
        ["Hypothèses et sources", `Points demandés de la station A3 : ${L.qp} m³/h sous ${L.pp} Pa, ${L.qb} m³/h sous ${L.pb} Pa ; courbes et rendement du caisson A : données de l’exercice.`],
        ["Résultats", `Caisson A, position ${A.position} ; pointe ${A.q} m³/h sous ${A.dp} Pa, ${A.P} W ; base ${A.cb} Pa, ${A.Pb} W ; réserves ${A.reserveP} et ${A.reserveB} Pa.`],
        ["Bruit", "Plots antivibratiles, manchettes souples, piège à son sur le rejet."],
        ["Pour la suite", "Puissances en pointe et en base, pour l’énergie de l’année."]
      ], "Logement d’exemple : première page de la note de calcul")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

/* Station BE-F5 : L’eau glacée.
   Volet tertiaire seul : le bâtiment de bureaux du fil rouge tertiaire (fil-rouge/tertiaire/). Méthode sur le noyau du bâtiment (le
   bureau et la salle de réunion), tenu à l’eau pure avec un groupe d’exemple à deux étages ; niveau 1 sur le même noyau avec l’eau
   glycolée et le groupe à un étage du CCTP ; niveau 2 sur le bâtiment entier. Les valeurs de l’exemple (bloc EXEMPLE) et les bornes des
   fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/f5-eau-glacee/construire.mjs, depuis
   corriges/f5-eau-glacee/reference-eau-glacee.json (outils/f5-eau-glacee-tertiaire.mjs). Les figures de illustrations/ sont tracées par
   le même outil (schema.mjs). Aucune valeur calculée du niveau 1 ni du niveau 2 n’est écrite dans cette station : seules les bornes des
   fourchettes et les données des commandes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/tertiaire/";

/*EXEMPLE-DEBUT*/
const EX = {
 "d": {
  "regime": "7/12",
  "tD": 7,
  "tR": 12,
  "dT": 5,
  "tm": "9,5",
  "dem": 6,
  "cycle": 10,
  "tmin": 5,
  "ecart": 2,
  "gN": "GE 60",
  "gB": "GE 112",
  "besoinN": "5 125",
  "besoinB": "9 900",
  "besoinBUR": "1 133",
  "PgNeau": "6 156",
  "PgNg": "5 959",
  "PgBg": "11 123",
  "eau": {
   "rho": "999,8",
   "cp": "4,196",
   "cpJ": "4 196",
   "c": "1,165",
   "rho10": "999,7",
   "rho40": "992,3",
   "e": "0,75"
  },
  "mpg": {
   "rho": "1 028,2",
   "cp": "3,829",
   "cpJ": "3 829",
   "c": "1,094",
   "rho10": "1 028,0",
   "rho40": "1 013,4",
   "e": "1,44"
  },
  "visco": "3,4",
  "coefP": "1,3",
  "vc": "1,5",
  "cta": "4",
  "vGN": "3",
  "vGB": "5",
  "tuyN": "30",
  "tuyB": "55",
  "nvcN": 3,
  "pN": {
   "Q": "1,0",
   "H": "3,0"
  },
  "pB": {
   "Q": "2,0",
   "H": "4,5"
  },
  "A": "0,8",
  "vit": [
   {
    "n": 1,
    "H0": "3,5",
    "P0": "20",
    "B": "15"
   },
   {
    "n": 2,
    "H0": "6,0",
    "P0": "35",
    "B": "25"
   },
   {
    "n": 3,
    "H0": "8,5",
    "P0": "55",
    "B": "35"
   }
  ],
  "ballons": "100, 150, 200, 300, 400, 500, 750, 1 000",
  "vases": "8, 12, 18, 25, 35, 50, 80",
  "hHaut": "2,90",
  "hVase": "0,30",
  "Hs": "2,60",
  "Pg": "0,5",
  "tarage": "3",
  "remp": "10",
  "tmax": "40",
  "regle": "20"
 },
 "m": {
  "Pkw": "5,125",
  "qv": "0,880",
  "qv116": "0,884",
  "rq": "106,5",
  "rqPlus": "6,5",
  "coefPpc": 30,
  "bur": {
   "P": "1,133",
   "qvE": "0,195",
   "qvG": "0,207"
  },
  "Pet": "3 078",
  "vminM3": "0,1101",
  "vmin": "110,1",
  "res": "37,5",
  "vaj": "72,6",
  "ballon": "100",
  "regleEt": "61,6",
  "K": "3,0",
  "Hd": "2,32",
  "vit": 1,
  "Q": "0,96",
  "H": "2,8",
  "P": "34,4",
  "Vt": "137,5",
  "Ve": "1,03",
  "Vn": "1,65",
  "vase": "8",
  "remp": "0,76",
  "sansN": 9,
  "avecN": 2
 },
 "ex1": {
  "P": "7 000",
  "quiz": {
   "choices": [
    "1,207 m³/h",
    "1,066 m³/h",
    "1,280 m³/h",
    "1,202 m³/h"
   ],
   "good": 2,
   "explain": "7,0 ÷ (1,094 × 5) = 1,280 m³/h. 1,207 m³/h prend le 1,16 de l’eau ; 1,202 m³/h prend le coefficient de l’eau à 9,5 °C ; 1,066 m³/h compte 6 K d’écart, le régime 6/12, et non 5 K."
  }
 },
 "ex2": {
  "besoin": "6 000",
  "etage": "8 000",
  "reseau": "60",
  "quiz": {
   "choices": [
    "244,8 L",
    "168,6 L",
    "304,8 L",
    "549,6 L"
   ],
   "good": 0,
   "explain": "8 000 × 300 ÷ (1 028,2 × 3 829 × 2) = 0,3048 m³, soit 304,8 L ; moins 60 L déjà là : 244,8 L. 168,6 L part du besoin du bâtiment au lieu de l’étage ; 304,8 L oublie l’eau déjà là ; 549,6 L prend 10 min de marche, le cycle entier."
  }
 },
 "ex3": {
  "quiz": {
   "choices": [
    "Il sépare la boucle du groupe de celle des émetteurs, comme une bouteille de découplage",
    "Il ne sert à rien : un ballon en série ne compte pas dans le volume",
    "Il remplace le vase d’expansion",
    "Il ajoute de l’eau au circuit, donc de l’inertie, sans découpler les débits"
   ],
   "good": 3,
   "explain": "Un seul débit le traverse : il ajoute de l’inertie au circuit. Pour séparer deux boucles, il faudrait quatre piquages et deux pompes. Son eau compte dans le volume, on le pose pour elle. Le vase absorbe la dilatation : le ballon ne le remplace pas."
  }
 },
 "ex4": {
  "H0": "2,0",
  "Q0": "1,0",
  "Q": "1,2",
  "quiz": {
   "choices": [
    "2,88 m",
    "3,74 m",
    "3,12 m",
    "2,60 m"
   ],
   "good": 1,
   "explain": "K = 2,0 ÷ 1,0² = 2,0 ; au glycol 2,0 × 1,3 = 2,60 ; H = 2,60 × 1,2² = 3,74 m. 2,88 m oublie le glycol ; 3,12 m fait monter la perte comme le débit, pas comme son carré ; 2,60 m garde le débit de 1,0 m³/h."
  }
 },
 "ex5": {
  "V": "300",
  "quiz": {
   "choices": [
    "2,25 L",
    "1,44 L",
    "4,32 L",
    "43,2 L"
   ],
   "good": 2,
   "explain": "Ve = 300 × 1,44 ÷ 100 = 4,32 L. 2,25 L prend la dilatation de l’eau ; 1,44 L prend le pourcentage pour un volume ; 43,2 L divise par 10 au lieu de 100."
  }
 },
 "img": {
  "circuit": "illustrations/circuit-principe.svg",
  "cycles": "illustrations/cycles-heure.svg",
  "barresGlycol": "illustrations/barres-glycol.svg",
  "barresVolume": "illustrations/barres-volume.svg",
  "pompe": "illustrations/pompe-exemple.svg",
  "pompeVierge": "illustrations/pompe-vierge.svg",
  "piquages": "illustrations/piquages.svg"
 }
};
/*EXEMPLE-FIN*/

const d = EX.d, m = EX.m;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exempleDebit = () => BE.exemple({ text: `Noyau du bâtiment, à l’eau pure : ${d.besoinN} W, régime ${d.regime} (Δθ = ${d.dT} K)`, answer: `qv = ${m.Pkw} ÷ (${d.eau.c} × ${d.dT}) = ${m.qv} m³/h ; avec 1,16 : ${m.Pkw} ÷ (1,16 × ${d.dT}) = ${m.qv116} m³/h`, why: `Le coefficient ${d.eau.c} vient de l’eau à ${d.tm} °C (ρ = ${d.eau.rho} kg/m³, cp = ${d.eau.cp} kJ/(kg.K)) ; 1,16 est la valeur ronde de la règle. L’écart entre les deux reste sous 1 %. Débit au millième de m³/h.` });
const exempleGlycol = () => BE.exemple({ text: `Le bureau seul, ${d.besoinBUR} W, régime ${d.regime}`, answer: `eau : ${m.bur.P} ÷ (${d.eau.c} × ${d.dT}) = ${m.bur.qvE} m³/h ; eau glycolée : ${m.bur.P} ÷ (${d.mpg.c} × ${d.dT}) = ${m.bur.qvG} m³/h, soit ${m.rqPlus} % de plus, le rapport des coefficients ${d.eau.c} ÷ ${d.mpg.c} (les deux débits arrondis au millième donnent un peu moins)`, why: `Coefficient du glycol : ${d.mpg.rho} × ${d.mpg.cp} ÷ 3 600 = ${d.mpg.c}, au millième. Le mélange porte moins de chaleur par m³ et par degré : pour la même puissance, il faut plus de débit.` });
const exempleVolume = () => BE.exemple({ text: `Noyau, groupe d’exemple ${d.gN} à deux étages, à l’eau pure : ${d.PgNeau} W au réel pour toute la machine`, answer: `étage : ${d.PgNeau} ÷ 2 = ${m.Pet} W ; V = ${m.Pet} × ${d.tmin} × 60 ÷ (${d.eau.rho} × ${d.eau.cpJ} × ${d.ecart}) = ${m.vminM3} m³, soit ${m.vmin} L`, why: `La durée se compte en secondes (${d.tmin} min = ${d.tmin * 60} s), cp en J/(kg.K). Volume au dixième de litre. La puissance du calcul est celle d’un étage, pas le besoin du noyau (${d.besoinN} W).` });
const exempleReseau = () => BE.exemple({ text: `Noyau : ${d.tuyN} L de tubes, ${d.nvcN} ventilo-convecteurs de ${d.vc} L, groupe de ${d.vGN} L ; volume minimal ${m.vmin} L`, answer: `eau déjà là : ${d.tuyN} + ${d.nvcN} × ${d.vc} + ${d.vGN} = ${m.res} L ; à ajouter : ${m.vmin} − ${m.res} = ${m.vaj} L ; ballon de la série : ${m.ballon} L`, why: `La règle d’exercice de la station H5, ${d.regle} L par kW, donnerait ${m.regleEt} L pour l’étage de ${m.Pet} W : elle ne connaît ni la durée de marche, ni l’écart admis, ni l’eau déjà là. Le calcul tient compte des trois.` });
const exemplePompe = () => BE.exemple({ text: `Noyau à l’eau pure : ${d.pN.H} m à ${d.pN.Q} m³/h (donnée de l’exercice, imprimée sur la feuille) ; débit demandé ${m.qv} m³/h`, answer: `K = ${d.pN.H} ÷ ${d.pN.Q}² = ${m.K} ; point demandé : ${m.K} × ${m.qv}² = ${m.Hd} m ; vitesse ${m.vit} : point lu vers ${m.Q} m³/h et ${m.H} m ; puissance absorbée ${m.P} W`, why: `La vitesse ${m.vit} est la plus petite qui donne au moins ${m.qv} m³/h. Le point se lit au croisement des deux courbes : Q au centième, H au dixième. La puissance absorbée se calcule sur la ligne de la vitesse, au débit lu.` });
const exempleVase = () => BE.exemple({ text: `Noyau à l’eau pure : ${m.res} L dans le réseau, ballon de ${m.ballon} L ; de ${d.remp} à ${d.tmax} °C`, answer: `V = ${m.res} + ${m.ballon} = ${m.Vt} L ; e = ${d.eau.rho10} ÷ ${d.eau.rho40} − 1 = ${d.eau.e} % ; Ve = ${m.Vt} × ${d.eau.e} % = ${m.Ve} L ; gonflage ${d.Pg} bar ; Vn = ${m.Ve} × (${d.tarage} + 1) ÷ (${d.tarage} − ${d.Pg}) = ${m.Vn} L ; vase de ${m.vase} L`, why: `Le ballon fait partie de l’eau du circuit : il se dilate aussi. Le gonflage vient de la hauteur au-dessus du vase, ${d.Hs} m, comptée par pas de 0,5 bar. Remplissage : ${d.Hs} ÷ 10 + 0,5 = ${m.remp} bar.` });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Les puissances sont dans la commande : le besoin du noyau, ${d.besoinN} W, et le groupe ${d.gN} à un étage, ${d.PgNg} W au réel avec le glycol (station F3). Les propriétés du glycol, les volumes d’eau, les pertes de charge et la pompe sont dans la feuille et à l’écran « D’où viennent les données ».`,
      "Exercice 1 de la feuille : écrans « Le débit d’eau » et « Le glycol change le débit ». Exercice 2 : écrans « Le volume minimal » et « L’eau déjà là compte ». Exercice 3 : écran « La pompe sur sa courbe ».",
      `Sur l’exemple, à l’eau pure et à deux étages : ${m.qv} m³/h, ${m.vmin} L de volume minimal, vitesse ${m.vit}. Avec le glycol et un seul étage, refaites les mêmes gestes : le débit monte, l’étage double, et la pompe change de vitesse.`
    ],
    2: [
      `Les données sont dans le CCTP du bâtiment (page 3, production de froid et émission) et sur la feuille réponse, cadre « Commande du bureau d’études » ; le besoin du bâtiment, ${d.besoinB} W, et le groupe retenu ${d.gB}, ${d.PgBg} W au réel avec le glycol, viennent de la station F3.`,
      "Six gestes déjà vus : le schéma de principe, le débit au glycol, le volume tampon avec l’eau déjà là, la pompe sur sa courbe, le vase, la note. Les écrans de la méthode les montrent sur le noyau, à l’eau pure.",
      `Commencez par compter l’eau déjà là : les tubes, tous les ventilo-convecteurs de chaque local (leur nombre par local est sur la feuille), la batterie froide de la CTA et le groupe. C’est elle qui change le plus par rapport à l’exemple.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensProjet = n => BE.liens(n === 1 ? [
  { href: EX.img.pompeVierge, title: "Les courbes de la pompe de l’exercice", note: "Les mêmes qu’au verso de la feuille réponse, à ouvrir en grand" },
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment", note: "Production de froid et émission, page 3" }
] : [
  { href: EX.img.pompeVierge, title: "Les courbes de la pompe de l’exercice", note: "Les mêmes qu’au verso de la feuille réponse" },
  { href: DOSSIER + "cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment", note: "Production de froid et émission, page 3" },
  { href: DOSSIER + "plans-tertiaire.pdf", title: "Les plans du bâtiment", note: "Pour situer les locaux ; le nombre d’appareils est sur la feuille" }
]);
ecranProjet.render = () => { const html = rendreCommande(); if (html.includes("partie-reservee")) return html; return html + liensProjet(html.includes("niveau autonome") ? 2 : 1); };

BE.station({
  code: "BE-F5",
  titre: "L’eau glacée",
  ligne: "Frigorifique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le noyau du bâtiment de bureaux, à l’eau glycolée : débit, volume tampon, pompe sur sa courbe, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Le bâtiment de bureaux entier : schéma de principe, débit, volume tampon, pompe, vase, note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Le bâtiment de bureaux du projet est refroidi par un groupe d’eau glacée posé dehors, façade nord. L’eau glycolée qu’il produit part vers les ventilo-convecteurs des bureaux et la batterie froide de la CTA, puis revient au groupe. Le bureau d’études dimensionne ce circuit : le débit, le ballon tampon qui empêche le groupe de démarrer trop souvent, la pompe et le vase. Vous apprenez la méthode sur le noyau du bâtiment, à l’eau pure, puis vous la refaites avec le glycol, puis seul sur le bâtiment entier.",
  note: "Le bâtiment de bureaux et son CCTP sont des données d’exercice écrites pour le réseau. Les propriétés de l’eau et de l’eau glycolée viennent de CoolProp, bibliothèque libre de propriétés des fluides. Les volumes d’eau, les pertes de charge, la pompe, la durée minimale de marche, l’écart admis et les séries de ballons et de vases sont des données de l’exercice. La pompe sur sa courbe et le vase suivent la méthode de la station H4.",

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
      objet: "Le circuit d’eau glacée du noyau, à l’eau glycolée du CCTP, avec le groupe à un étage",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études a calculé le circuit du noyau à l’eau pure, avec un groupe d’exemple à deux étages (écrans de la méthode). Le CCTP du projet demande de l’eau glycolée, monopropylène glycol à 30 %, et un groupe à un seul étage : le ${d.gN}, ${d.PgNg} W au réel avec le glycol (station F3). Le besoin du noyau reste ${d.besoinN} W. Suivez les étapes dans l’ordre ; toutes les données sont imprimées sur la feuille.`,
        "Étape 1, exercice 1 de la feuille. Calculez le coefficient du glycol, puis le débit d’eau glycolée du noyau, et comparez-le au débit à l’eau de l’exemple.",
        "Étape 2, exercice 2 de la feuille. Calculez le volume minimal avec la puissance de l’étage et les propriétés du glycol, comptez l’eau déjà là, déduisez le volume à ajouter et choisissez le ballon de la série.",
        "Étape 3, exercice 3 de la feuille. Calculez K à l’eau puis au glycol, le point demandé, tracez la courbe du réseau sur les courbes de la pompe du verso, choisissez la vitesse et lisez le point de fonctionnement. Vérifiez vos quatre résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso : données au recto, courbes de la pompe au verso" },
        { piece: "Extrait de CCTP du bâtiment", ou: "Lien ci-dessous : production de froid, page 3" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Le circuit d’eau glacée du bâtiment entier : schéma de principe, débit, volume tampon, pompe, vase, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études dimensionne le circuit d’eau glacée de tout le bâtiment de bureaux. Données : le CCTP (page 3 : groupe dehors façade nord, régime ${d.regime}, monopropylène glycol à 30 %, un étage, ${d.dem} démarrages par heure au plus, ventilo-convecteurs dans le bureau, la salle de réunion, le plateau et l’accueil) ; le besoin du bâtiment, ${d.besoinB} W, et le groupe retenu ${d.gB}, ${d.PgBg} W au réel avec le glycol (station F3) ; les données de l’exercice imprimées sur la feuille (propriétés CoolProp, volumes d’eau, pertes de charge, pompe, séries). Le ballon se pose en série sur le retour, à deux piquages. Nommez les organes du schéma de principe. Calculez le débit d’eau glycolée, le volume tampon en comptant toute l’eau déjà là, le point de fonctionnement de la pompe et sa puissance absorbée, puis le vase. Rédigez la première page de la note de calcul.`,
      pieces: [
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" },
        { piece: "Extrait de CCTP du bâtiment", ou: "Lien ci-dessous, page 3" },
        { piece: "Plans du bâtiment", ou: "Lien ci-dessous, pour situer les locaux (le nombre d’appareils est sur la feuille)" }
      ]
    }
  },
  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-qv", libelle: "Débit d’eau glycolée du noyau, en m³/h", unite: "m³/h", min: 0.908, max: 0.966, indice: "Relisez l’écran « Le glycol change le débit » : qv = P ÷ (c × Δθ), P en kW, avec le coefficient du glycol 1,094 et Δθ = 5 K." },
      { id: "n1-vmin", libelle: "Volume minimal d’eau du noyau, en L", unite: "L", min: 220.1, max: 233.9, indice: "Relisez l’écran « Le volume minimal » : la puissance est celle de l’étage, toute la machine pour un groupe à un étage ; ρ et cp du glycol ; t en secondes." },
      { id: "n1-vaj", libelle: "Volume à ajouter par le ballon, en L", unite: "L", min: 183.8, max: 195.2, indice: "Relisez l’écran « L’eau déjà là compte » : retirez du volume minimal l’eau des tubes, des ventilo-convecteurs et du groupe." },
      { id: "n1-qop", libelle: "Débit au point de fonctionnement de la pompe, lu, en m³/h", unite: "m³/h", min: 1.07, max: 1.19, indice: "Relisez l’écran « La pompe sur sa courbe » : K à l’eau × le coefficient du glycol ; la plus petite vitesse qui donne au moins le débit demandé ; lisez Q au croisement." }
    ],
    2: [
      { id: "n2-qv", libelle: "Débit d’eau glycolée du bâtiment, en m³/h", unite: "m³/h", min: 1.755, max: 1.865, indice: "Relisez l’écran « Le glycol change le débit » : qv = P ÷ (c × Δθ), P en kW, avec le coefficient du glycol 1,094 et Δθ = 5 K." },
      { id: "n2-vaj", libelle: "Volume à ajouter par le ballon, en L", unite: "L", min: 345.8, max: 352.8, indice: "Relisez l’écran « L’eau déjà là compte » : comptez les tubes du bâtiment, chaque ventilo-convecteur de chaque local, la batterie froide de la CTA et le groupe." },
      { id: "n2-qop", libelle: "Débit au point de fonctionnement de la pompe, lu, en m³/h", unite: "m³/h", min: 1.84, max: 2.04, indice: "Relisez l’écran « La pompe sur sa courbe » : K à l’eau × le coefficient du glycol ; la plus petite vitesse qui donne au moins le débit demandé ; lisez Q au croisement." },
      { id: "n2-vn", libelle: "Volume minimal du vase, en L", unite: "L", min: 10.6, max: 11.26, indice: "Relisez l’écran « Le vase d’un circuit glycolé » : volume du réseau plus le ballon retenu, dilatation du glycol, gonflage arrondi au pas de 0,5 bar supérieur, Vn = Ve × 4 ÷ (3 − gonflage)." }
    ]
  },
  /*FOURCHETTES-FIN*/
  suivante: null,
  correspondances: [
    { reseau: "CartoClim", titre: "Groupe d’eau glacée et ventilo-convecteurs", href: "../../../cartoclim/stations/3-8-eau-glacee/index.html", pourquoi: "Le groupe, le circuit d’eau et les émetteurs ; le régime 6/12 que l’on rencontre souvent." },
    { reseau: "HydroMétro", titre: "Volume tampon", href: "../../../hydrometro/stations/tampon/index.html", pourquoi: "Ce que le raccordement d’un ballon lui fait faire ; volume nominal et volume utile." },
    { reseau: "HydroMétro", titre: "Découplage hydraulique", href: "../../../hydrometro/stations/decouplage/index.html", pourquoi: "Deux boucles et deux pompes autour d’un volume commun." },
    { reseau: "Bureau d’études", titre: "BE-H4, Pompe, vase, soupape", href: "../h4-pompe-vase-soupape/index.html", pourquoi: "La pompe sur sa courbe et le vase, sur la maison." },
    { reseau: "Bureau d’études", titre: "BE-F3, La machine au réel", href: "../f3-machine-conditions-reelles/index.html", pourquoi: "Le groupe retenu et sa puissance au réel avec le glycol." }
  ],
  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Le groupe d’eau glacée du bâtiment de bureaux est posé dehors, façade nord. Il refroidit de l’eau glycolée qui part vers les ventilo-convecteurs et la batterie froide de la CTA, puis revient. Le bureau d’études dimensionne ce circuit : le débit d’eau glycolée, le ballon tampon qui évite au groupe de démarrer trop souvent, la pompe sur sa courbe et le vase. Il dessine le schéma de principe et rédige la note de calcul. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Grandeur", "Valeur", "Unité"], [
        ["Débit d’eau glycolée", "", "m³/h"],
        ["Volume tampon à ajouter et ballon retenu", "", "L"],
        ["Pompe : vitesse et point de fonctionnement", "", "m³/h et m"],
        ["Vase d’expansion (niveau 2)", "", "L"]
      ], "Le circuit d’eau glacée du projet, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "le circuit d’eau glacée du bâtiment."], ["Le dossier :", "le CCTP, le groupe retenu à la station F3, les données de l’exercice."]] },
          { title: "Vous produisez", rows: [["Le schéma :", "les organes du circuit, dans l’ordre."], ["Les résultats :", "débit, ballon, pompe, vase. Vérification à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la note de calcul du bâtiment, à la station R5."]] }
        ])
    }),
    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: `Le CCTP du bâtiment donne le système : groupe d’eau glacée dehors, régime ${d.regime}, eau glycolée à 30 %, un seul étage, ${d.dem} démarrages par heure au plus, ventilo-convecteurs dans quatre locaux. La station F3 a retenu le groupe et calculé sa puissance au réel avec le glycol. Les propriétés de l’eau et du glycol viennent de CoolProp, à ${d.tm} °C, la température moyenne du régime. Le reste est propre à l’exercice et le dit : volumes d’eau, pertes de charge, pompe, durée minimale de marche, écart admis, séries. Le CCTP dit « 30 % » sans dire en masse ou en volume : l’exercice le prend en masse.`,
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        [`Régime ${d.regime}, glycol à 30 %, un étage, ${d.dem} démarrages par heure`, "CCTP page 3, valeurs d’exercice"],
        [`Besoin : noyau ${d.besoinN} W, bâtiment ${d.besoinB} W`, "Bilan d’été du bâtiment (stations T8 et F3)"],
        [`Groupes : ${d.gN} (noyau) et ${d.gB} (bâtiment), au réel avec le glycol`, "Station F3"],
        [`Eau à ${d.tm} °C : ρ = ${d.eau.rho} kg/m³, cp = ${d.eau.cp} kJ/(kg.K)`, "CoolProp"],
        [`Glycol à 30 % : ρ = ${d.mpg.rho} kg/m³, cp = ${d.mpg.cp} kJ/(kg.K), ${d.visco} fois plus visqueux`, "CoolProp, monopropylène glycol en masse"],
        [`Marche minimale ${d.tmin} min, écart admis ${d.ecart} K`, "Données de l’exercice"],
        ["Volumes d’eau, pertes de charge, pompe, séries de ballons et de vases", "Données de l’exercice, imprimées sur la feuille"]
      ], "Les données du circuit d’eau glacée")
    }),
    BE.ecran({
      id: "le-circuit", dossier: "methode", kicker: "La méthode, 1", title: "Le circuit d’eau glacée", level: "comprendre",
      text: `Le groupe d’eau glacée refroidit l’eau du circuit dans son évaporateur. La pompe l’envoie à ${d.tD} °C vers les émetteurs : les ventilo-convecteurs des bureaux et la batterie froide de la CTA (centrale de traitement d’air), montés en parallèle entre le départ et le retour. L’eau revient à ${d.tR} °C. Sur le départ, près du groupe, la soupape protège le circuit d’une pression trop forte et le vase d’expansion absorbe la dilatation de l’eau. Le ballon tampon ajoute un volume d’eau au circuit : ici, en série sur le retour. Ce geste sert à l’exercice 1 de la feuille du niveau 2.`,
      prompt: "Suivez l’eau sur le schéma, du groupe au groupe.",
      render: () => BE.schema(EX.img.circuit, `Schéma de principe. À gauche, dehors, façade nord, le groupe d’eau glacée posé au sol. Un mur en tirets sépare le dehors du bâtiment. Le départ, en trait plein, monte du groupe et file vers la droite ; il porte la soupape puis le vase, chacun sur un piquage vers le haut, puis la pompe. Deux ventilo-convecteurs et la batterie froide de la CTA descendent du départ vers le retour, en tirets. Le retour revient vers la gauche, traverse le ballon tampon, en série, et rentre dans le groupe. Départ ${d.tD} °C, retour ${d.tR} °C.`, "Le circuit d’eau glacée du projet : groupe, soupape, vase, pompe, émetteurs, ballon tampon")
        + BE.renvoi('Le groupe d’eau glacée et ses ventilo-convecteurs sont présentés dans CartoClim, <a href="../../../cartoclim/stations/3-8-eau-glacee/index.html">« Groupe d’eau glacée et ventilo-convecteurs »</a>.')
    }),
    BE.ecran({
      id: "le-debit", dossier: "methode", kicker: "La méthode, 2", title: "Le débit d’eau", level: "comprendre",
      text: `La puissance portée par l’eau vaut P = qv × c × Δθ, avec P en kW, qv en m³/h et Δθ l’écart entre le retour et le départ, en K. Le coefficient c vaut ρ × cp ÷ 3 600 : pour l’eau, la règle prend 1,16. Le régime du projet est ${d.regime} : l’eau part à ${d.tD} °C et revient à ${d.tR} °C, Δθ = ${d.dT} K. CartoClim cite le régime 6/12, que l’on rencontre souvent : les deux se lisent de la même façon, et le projet suit son CCTP. Le débit se calcule sur le besoin des locaux servis, au millième de m³/h. Le débit du catalogue du groupe, relevé à la station F3, ne sert pas ici : il vaut pour la machine à sa puissance, à l’eau pure, alors que le circuit ne transporte que ce que les locaux demandent. Ce geste sert à l’exercice 1 de la feuille.`,
      prompt: "Lisez l’exemple résolu sur le noyau, à l’eau pure.",
      render: () => exempleDebit()
    }),
    BE.ecran({
      id: "le-glycol", dossier: "methode", kicker: "La méthode, 3", title: "Le glycol change le débit", level: "comprendre",
      text: `Le groupe est dehors : l’hiver, l’eau gèlerait dans son échangeur. Le CCTP demande de l’eau glycolée, du monopropylène glycol (MPG) à 30 % : un antigel que l’on dilue dans l’eau, de 20 à 50 % selon la protection voulue. À ${d.tm} °C, le mélange a une masse volumique de ${d.mpg.rho} kg/m³ et une capacité thermique massique de ${d.mpg.cp} kJ/(kg.K) : son coefficient vaut ${d.mpg.c} au lieu de ${d.eau.c}. Pour la même puissance, le débit monte de ${m.rqPlus} %. Le mélange est aussi ${d.visco} fois plus visqueux : à débit égal, les pertes de charge montent de ${m.coefPpc} % (coefficient de l’exercice). Il se dilate presque deux fois plus que l’eau. Le schéma compare les trois. Ce geste sert à l’exercice 1 de la feuille.`,
      prompt: "Lisez les barres, puis l’exemple résolu sur le bureau seul.",
      render: () => BE.schema(EX.img.barresGlycol, `Barres horizontales, deux par ligne : en bleu clair l’eau pure, en marine l’eau glycolée à 30 %. Débit pour la même puissance : 100 % et ${m.rq} %. Pertes de charge au même débit : 100 % et ${m.coefPpc + 100} %. Dilatation de 10 à 40 °C : ${d.eau.e} % et ${d.mpg.e} %.`, "Ce que le glycol change, comparé à l’eau")
        + exempleGlycol()
        + BE.renvoi("Le rôle du glycol et ses précautions sont dans le cours « L’eau glycolée » du fonds de technologie du froid.")
    }),
    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, le débit", title: "À l’écran : un groupe au glycol", level: "appliquer", requiresAction: true,
      text: {
        1: `Un circuit au régime ${d.regime}, à l’eau glycolée à 30 %, porte ${EX.ex1.P} W. Quel débit faut-il ? L’exemple résolu reste sous vos yeux.`,
        2: `Un circuit au régime ${d.regime}, à l’eau glycolée à 30 %, porte ${EX.ex1.P} W. Quel débit faut-il ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez le débit, en vous aidant de l’exemple.", 2: "Choisissez le débit. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est aux écrans « Le débit d’eau » et « Le glycol change le débit ».", `Le coefficient du glycol vaut ${d.mpg.c} ; Δθ vaut ${d.dT} K au régime ${d.regime}.`, `qv = P (kW) ÷ (${d.mpg.c} × ${d.dT}).`],
        2: ["La méthode est à l’écran « Le glycol change le débit ».", "Prenez le coefficient du mélange de glycol.", "qv = P ÷ (c × Δθ), P en kW."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleGlycol(), EX.ex1.quiz),
        2: BE.quiz(EX.ex1.quiz)
      })
    }),
    BE.ecran({
      id: "pourquoi-un-ballon", dossier: "methode", kicker: "La méthode, 4", title: "Pourquoi un ballon tampon", level: "comprendre",
      text: `Le compresseur du groupe s’use à chaque démarrage : le CCTP en permet ${d.dem} par heure au plus, soit un cycle de marche et d’arrêt de ${d.cycle} min au moins. Le groupe démarre quand l’eau s’est réchauffée de l’écart admis, ${d.ecart} K ici, et s’arrête quand il l’a refroidie d’autant. Avec peu d’eau, ces ${d.ecart} K passent vite : le groupe court après sa consigne. Le schéma le montre sur l’exemple, quand le noyau demande la moitié d’un étage : ${m.sansN} démarrages en une heure avec les ${m.res} L du réseau seul, ${m.avecN} avec le ballon. Le ballon tampon ajoute l’eau qui manque.`,
      prompt: "Comptez les démarrages sur les deux tracés.",
      render: () => BE.schema(EX.img.cycles, `Deux tracés sur une heure, de 0 à 60 min. En haut, sans ballon : l’écart de l’eau à sa consigne monte de 0 à ${d.ecart} K puis redescend, en dents de scie serrées ; le groupe marche par courtes bandes orange ; ${m.sansN} démarrages. En bas, avec le ballon de ${m.ballon} L : les dents sont larges, ${m.avecN} démarrages.`, `Exemple, groupe à la moitié d’un étage : ${m.sansN} démarrages sans ballon, ${m.avecN} avec`)
        + BE.renvoi('Le rôle d’un ballon et son raccordement sont présentés dans HydroMétro, <a href="../../../hydrometro/stations/tampon/index.html">« Volume tampon »</a>.')
    }),
    BE.ecran({
      id: "volume-minimal", dossier: "methode", kicker: "La méthode, 5", title: "Le volume minimal", level: "comprendre",
      text: `Le volume d’eau doit laisser au groupe le temps de tourner au moins sa durée minimale de marche, même quand le bâtiment ne demande presque rien : V = P × t ÷ (ρ × cp × Δθa), avec V en m³, P en W, t en s, ρ en kg/m³, cp en J/(kg.K) et Δθa l’écart admis, en K. La puissance P est celle d’un étage du groupe, le plus petit pas de puissance qu’il sait faire. Un groupe à un étage met toute sa puissance d’un coup : l’étage, c’est toute la machine. Le besoin du bâtiment ne sert pas ici. Avec du glycol, ρ et cp sont ceux du mélange. Données de l’exercice : t = ${d.tmin} min, la moitié du cycle de ${d.cycle} min ; Δθa = ${d.ecart} K. Ce geste sert à l’exercice 2 de la feuille.`,
      prompt: "Lisez l’exemple résolu : le groupe d’exemple a deux étages.",
      render: () => exempleVolume()
    }),
    BE.ecran({
      id: "eau-deja-la", dossier: "methode", kicker: "La méthode, 6", title: "L’eau déjà là compte", level: "comprendre",
      text: `Le volume minimal compte toute l’eau qui circule : celle des tubes, des émetteurs et du groupe en fait déjà partie. Le ballon ne fournit que ce qui manque. On additionne l’eau déjà là, on la retire du volume minimal, puis on prend dans la série le premier ballon au-dessus du volume à ajouter. Un ballon de 100 L ne rend pas forcément 100 L utiles : c’est son volume nominal. Le volume utile est l’eau du ballon qui circule avec le reste du circuit ; l’eau qui reste immobile dans un coin, loin des piquages, ne compte pas. La marge de la série couvre l’écart. Le schéma met les trois volumes de l’exemple côte à côte. Ce geste sert à l’exercice 2 de la feuille.`,
      prompt: "Lisez les trois barres, puis l’exemple résolu.",
      render: () => BE.schema(EX.img.barresVolume, `Trois barres horizontales. En haut, en pointillé, le volume minimal de l’exemple, ${m.vmin} L. Au milieu, la même longueur coupée en deux : en bleu clair l’eau déjà là, ${m.res} L ; en marine l’eau à ajouter, ${m.vaj} L. En bas, en orange, le ballon de la série, ${m.ballon} L, un peu plus long que le volume à ajouter.`, "Exemple : le volume minimal, l’eau déjà là et le ballon")
        + exempleReseau()
    }),
    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, le ballon", title: "À l’écran : quel volume ajouter", level: "appliquer", requiresAction: true,
      text: {
        1: `Un bâtiment demande ${EX.ex2.besoin} W. Son groupe, à un étage, donne ${EX.ex2.etage} W. Le circuit, à l’eau glycolée à 30 %, contient déjà ${EX.ex2.reseau} L. Marche minimale ${d.tmin} min, écart admis ${d.ecart} K. Quel volume faut-il ajouter ? L’exemple résolu reste sous vos yeux.`,
        2: `Un bâtiment demande ${EX.ex2.besoin} W. Son groupe, à un étage, donne ${EX.ex2.etage} W. Le circuit, à l’eau glycolée à 30 %, contient déjà ${EX.ex2.reseau} L. Marche minimale ${d.tmin} min, écart admis ${d.ecart} K. Quel volume faut-il ajouter ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez le volume, en vous aidant de l’exemple.", 2: "Choisissez le volume. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est aux écrans « Le volume minimal » et « L’eau déjà là compte ».", "Un étage : toute la machine. Le besoin du bâtiment ne sert pas.", `V = ${EX.ex2.etage} × ${d.tmin * 60} ÷ (${d.mpg.rho} × ${d.mpg.cpJ} × ${d.ecart}), en m³, puis retirez l’eau déjà là.`],
        2: ["La méthode est à l’écran « Le volume minimal ».", "Quelle puissance démarre d’un coup ?", "Volume minimal moins l’eau déjà là."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleVolume(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),
    BE.ecran({
      id: "deux-ou-quatre-piquages", dossier: "methode", kicker: "La méthode, 7", title: "Deux ou quatre piquages", level: "comprendre",
      text: "Le service que rend un ballon dépend de son raccordement. En série sur le retour, avec deux piquages, un seul débit le traverse : il ajoute de l’eau au circuit, donc de l’inertie, mais il ne sépare rien. À quatre piquages, il relie deux boucles, chacune avec sa pompe : la boucle du groupe et celle des émetteurs. Il peut alors ajouter de l’inertie et découpler les deux débits ; il faut encore le vérifier par les débits et les températures. Le projet le pose en série sur le retour.",
      prompt: "Comparez les deux montages sur le schéma.",
      render: () => BE.schema(EX.img.piquages, "Deux montages côte à côte. À gauche, en série : un tube entre dans le ballon par un piquage du haut et ressort par un piquage du bas, un seul débit le traverse ; inertie, sans découplage. À droite, à quatre piquages : à gauche du ballon la boucle du groupe, en orange ; à droite celle des émetteurs, en bleu ; deux boucles, deux pompes, autour d’un volume commun ; inertie et découplage possibles.", "Le ballon en série ou à quatre piquages")
        + BE.renvoi('Les deux montages sont animés dans HydroMétro, <a href="../../../hydrometro/stations/tampon/index.html">« Volume tampon »</a> et <a href="../../../hydrometro/stations/decouplage/index.html">« Découplage hydraulique »</a>.')
    }),
    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, le raccordement", title: "À l’écran : ce que fait le ballon du projet", level: "appliquer", requiresAction: true,
      text: "Le ballon du projet est posé en série sur le retour, avec deux piquages raccordés. Que fait-il ?",
      prompt: "Choisissez la phrase juste.",
      aides: [
        "La méthode est à l’écran « Deux ou quatre piquages ».",
        "Comptez les boucles et les pompes du montage.",
        "Un seul débit le traverse."
      ],
      ...BE.quiz(EX.ex3.quiz)
    }),
    BE.ecran({
      id: "la-pompe", dossier: "methode", kicker: "La méthode, 8", title: "La pompe sur sa courbe", level: "comprendre",
      text: `La méthode est celle de la station H4. Les données de l’exercice, imprimées sur la feuille (le CCTP n’en parle pas), donnent une perte de charge du circuit à l’eau pure, pour un débit : la courbe du réseau passe par ce point, H = K × Q², avec K = H ÷ Q², au millième. Au glycol, plus visqueux, le réseau perd ${m.coefPpc} % de plus au même débit : K est multiplié par ${d.coefP}. Le point demandé est sur la courbe du réseau, au débit calculé. On garde la plus petite vitesse de la pompe dont le point de fonctionnement, au croisement des deux courbes, donne au moins ce débit. La puissance absorbée vaut P0 + B × Q sur la ligne de la vitesse, Q lu. Ce geste sert à l’exercice 3 de la feuille.`,
      prompt: "Lisez le point sur la figure, puis l’exemple résolu.",
      render: () => BE.schema(EX.img.pompe, `Graphique. En abscisse le débit Q de 0 à 2,4 m³/h ; en ordonnée la hauteur H de 0 à 9 m. Trois courbes de la pompe, qui descendent : vitesse 1 depuis ${d.vit[0].H0} m, vitesse 2 depuis ${d.vit[1].H0} m, vitesse 3 depuis ${d.vit[2].H0} m. La courbe orange du réseau de l’exemple, à l’eau, monte depuis zéro ; elle croise la vitesse ${m.vit} vers ${m.Q} m³/h et ${m.H} m, point marqué et repéré sur les deux axes.`, "La pompe de l’exercice et le réseau de l’exemple, à l’eau")
        + tableau(["Vitesse", "H0 (m)", "A", "P0 (W)", "B (W par m³/h)"], d.vit.map(v => [String(v.n), v.H0, d.A, v.P0, v.B]), "La pompe de l’exercice : H = H0 − A × Q², P = P0 + B × Q")
        + exemplePompe()
    }),
    BE.ecran({
      id: "exercice-4", dossier: "methode", kicker: "Exercice à l’écran 4, les pertes au glycol", title: "À l’écran : le réseau au glycol", level: "appliquer", requiresAction: true,
      text: {
        1: `Un réseau perd ${EX.ex4.H0} m à ${EX.ex4.Q0} m³/h à l’eau pure. On le remplit d’eau glycolée (pertes de charge × ${d.coefP} au même débit) et on y fait passer ${EX.ex4.Q} m³/h. Combien perd-il ? L’exemple résolu reste sous vos yeux.`,
        2: `Un réseau perd ${EX.ex4.H0} m à ${EX.ex4.Q0} m³/h à l’eau pure. On le remplit d’eau glycolée (pertes de charge × ${d.coefP} au même débit) et on y fait passer ${EX.ex4.Q} m³/h. Combien perd-il ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez la hauteur, en vous aidant de l’exemple.", 2: "Choisissez la hauteur. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La pompe sur sa courbe ».", "K à l’eau, puis × le coefficient du glycol.", `H = K × ${d.coefP} × Q², avec K = ${EX.ex4.H0} ÷ ${EX.ex4.Q0}².`],
        2: ["La méthode est à l’écran « La pompe sur sa courbe ».", "Le débit compte au carré.", "H = K × Q², avec le K du glycol."]
      },
      ...BE.parNiveau({
        1: avecBloc(exemplePompe(), EX.ex4.quiz),
        2: BE.quiz(EX.ex4.quiz)
      })
    }),
    BE.ecran({
      id: "le-vase", dossier: "methode", kicker: "La méthode, 9", title: "Le vase d’un circuit glycolé", level: "comprendre",
      text: `La méthode du vase est celle de la station H4 ; seule la dilatation change. Le volume d’eau compte tout le circuit, ballon compris. Rempli à ${d.remp} °C, le circuit peut monter à ${d.tmax} °C l’été, groupe à l’arrêt (donnée de l’exercice). La dilatation vaut e = ρ à ${d.remp} °C ÷ ρ à ${d.tmax} °C − 1 : ${d.eau.e} % pour l’eau, ${d.mpg.e} % pour le glycol à 30 % (CoolProp). Volume de dilatation : Ve = V × e. Gonflage : la hauteur du point le plus haut au-dessus du vase, ÷ 10, arrondie au pas de 0,5 bar supérieur. Volume minimal du vase : Vn = Ve × (3 + 1) ÷ (3 − gonflage), avec la soupape de 3 bar ; puis le vase de la série. Ce geste sert à l’exercice 5 de la feuille du niveau 2.`,
      prompt: "Lisez l’exemple résolu, à l’eau pure.",
      render: () => tableau(["Donnée de l’exercice", "Valeur"], [
        [`Masse volumique de l’eau à ${d.remp} et à ${d.tmax} °C`, `${d.eau.rho10} et ${d.eau.rho40} kg/m³`],
        [`Masse volumique du glycol à 30 % à ${d.remp} et à ${d.tmax} °C`, `${d.mpg.rho10} et ${d.mpg.rho40} kg/m³`],
        ["Point le plus haut, raccord du vase", `${d.hHaut} m et ${d.hVase} m au-dessus du sol`],
        ["Série des vases", `${d.vases} L`]
      ], "Pour le vase")
        + exempleVase()
        + BE.renvoi('Le vase et la soupape sont repris de la station <a href="../h4-pompe-vase-soupape/index.html">BE-H4 « Pompe, vase, soupape »</a>.')
    }),
    BE.ecran({
      id: "exercice-5", dossier: "methode", kicker: "Exercice à l’écran 5, la dilatation", title: "À l’écran : le volume de dilatation", level: "appliquer", requiresAction: true,
      text: {
        1: `Un circuit d’eau glycolée à 30 % contient ${EX.ex5.V} L en tout. Rempli à ${d.remp} °C, il peut monter à ${d.tmax} °C. Quel est son volume de dilatation ? L’exemple résolu reste sous vos yeux.`,
        2: `Un circuit d’eau glycolée à 30 % contient ${EX.ex5.V} L en tout. Rempli à ${d.remp} °C, il peut monter à ${d.tmax} °C. Quel est son volume de dilatation ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez le volume, en vous aidant de l’exemple.", 2: "Choisissez le volume. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Le vase d’un circuit glycolé ».", `Prenez la dilatation du glycol, ${d.mpg.e} %, pas celle de l’eau.`, `Ve = ${EX.ex5.V} × ${d.mpg.e} ÷ 100.`],
        2: ["La méthode est à l’écran « Le vase d’un circuit glycolé ».", "Quel liquide remplit le circuit ?", "Ve = V × e."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleVase(), EX.ex5.quiz),
        2: BE.quiz(EX.ex5.quiz)
      })
    }),
    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 10", title: "La note de calcul", level: "comprendre",
      text: "La première page de la note de calcul dit en quelques lignes ce qui a été dimensionné, avec quoi et ce qui en sort : l’objet et le schéma de principe ; les hypothèses et leurs sources ; les résultats ; ce que l’on transmet pour la suite. Chaque valeur cite son origine : le CCTP et sa page, la station F3, CoolProp, une donnée de l’exercice. Un lecteur doit pouvoir refaire le calcul sans vous. Ce geste sert à l’exercice 6 de la feuille du niveau 2.",
      prompt: "Lisez la première page de la note de l’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Contenu"], [
        ["Objet et schéma", `Circuit d’eau glacée du noyau, à l’eau pure, groupe d’exemple ${d.gN} à deux étages ; ballon en série sur le retour ; schéma de principe joint.`],
        ["Hypothèses et sources", `Besoin ${d.besoinN} W (bilan d’été) ; régime ${d.regime} (CCTP p. 3) ; eau ρ = ${d.eau.rho}, cp = ${d.eau.cp} (CoolProp) ; ${d.tmin} min et ${d.ecart} K, volumes, pertes de charge, pompe (exercice).`],
        ["Résultats", `Débit ${m.qv} m³/h ; ballon de ${m.ballon} L (${m.vaj} L à ajouter) ; pompe en vitesse ${m.vit}, ${m.Q} m³/h et ${m.H} m, ${m.P} W ; vase de ${m.vase} L, gonflage ${d.Pg} bar.`],
        ["Pour la suite", "Avec le glycol du projet, débit, ballon, pompe et vase changent tous : à refaire."]
      ], "Noyau du bâtiment, à l’eau pure : première page de la note de calcul")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

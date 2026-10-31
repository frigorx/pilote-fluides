/* Station BE-P5b : Coupes et sections.
   Méthode sur des pièces d'atelier (bloc percé, cale en L, support en U, plaque à deux trous) et sur un mur doublé, puis lecture de la coupe A-A de la maison d'étude.
   Toutes les valeurs liées aux dessins et à la maison (bloc FAITS) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/p5b-coupes-et-sections/construire.mjs à partir de faits.json : rien n'est tapé à la main hors de ces deux blocs.
   Les dimensions des pièces et les épaisseurs du mur doublé sont des valeurs d'exercice. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";
const IL = "illustrations/";
const GARES = "../../../plan/gares/";
const fig = (nom, alt, legende) => BE.schema(`${IL}${nom}.svg`, alt, legende || "");

/*FAITS-DEBUT*/
const FA = {
 "carreau": "5",
 "bloc": {
  "dims": "60 × 40 × 30 mm",
  "d": "16",
  "x": "20",
  "y": "20",
  "r": "8",
  "vg": "12",
  "vd": "28",
  "zg": "12",
  "zd": "32"
 },
 "cale": {
  "dims": "60 × 40 × 36 mm",
  "d": "10"
 },
 "gaine": {
  "dims": "300 × 60 × 40 mm",
  "sect": "60 × 40",
  "ep": "4"
 },
 "plaque": {
  "dims": "80 × 40 × 24 mm",
  "d1": "10",
  "d2": "14",
  "zones": "3"
 },
 "mur": {
  "beton": "20",
  "isolant": "10",
  "platre": "1,3",
  "total": "31,3"
 },
 "sens": {
  "talonA": "à gauche",
  "talonB": "à droite",
  "trouA": "à droite du talon",
  "trouB": "à gauche du talon"
 },
 "p1": {
  "dims": "60 × 40 × 30 mm, trou débouchant vertical Ø 16 mm à 45 mm du bord gauche et 20 mm du bord avant"
 },
 "p2": {
  "dims": "80 × 40 × 24 mm, trou Ø 12 mm en x = 20 et y = 28, trou Ø 8 mm en x = 60 et y = 12 (cotes depuis le bord gauche et le bord avant)"
 },
 "mai": {
  "pRdc": "1",
  "pCoupe": "3",
  "chaine": [
   "0,30",
   "3,00",
   "0,30",
   "7,00",
   "0,30",
   "10,90"
  ],
  "somme": "10,90"
 },
 "ex1": {
  "choices": [
   "Coupe A",
   "Coupe B",
   "Coupe C",
   "Coupe D"
  ],
  "good": 2,
  "explain": "La coupe C est juste : un vide blanc de 16 mm, qui est le trou, entre deux zones hachurées de 12 mm et de 32 mm. La coupe B hachure le vide du trou comme la matière. La coupe D n’a aucune hachure : la matière coupée ne se distingue pas du vide. La coupe A place le trou au mauvais endroit : sa vue de dessus ne correspond pas."
 },
 "ex2": {
  "labels": [
   "coupe A-A",
   "coupe B-B"
  ],
  "exemple": {
   "text": "Les flèches de la trace pointent vers le haut de la vue de dessus",
   "good": 0,
   "why": "Le regard va vers le fond : c’est la coupe A-A, celle où l’observateur est devant la pièce."
  },
  "lignes": [
   {
    "text": "Le talon est à gauche",
    "good": 0,
    "why": "Avec le regard vers le fond, le talon de la vue de dessus se retrouve du même côté sur la coupe : c’est la coupe A-A.",
    "bad": "Relisez le tableau de l’écran « Le sens d’observation » : une ligne par coupe, avec la place du talon."
   },
   {
    "text": "Le trou est à gauche du talon",
    "good": 1,
    "why": "Quand on regarde vers l’avant, tout est inversé par rapport à A-A : c’est la coupe B-B.",
    "bad": "Relisez le tableau de l’écran « Le sens d’observation » : une ligne par coupe, avec la place du trou."
   },
   {
    "text": "L’observateur est devant la pièce",
    "good": 0,
    "why": "Devant la pièce, il regarde vers le fond : c’est la coupe A-A.",
    "bad": "Un observateur devant la pièce regarde vers le fond. Cherchez la coupe dont les flèches pointent vers le fond."
   },
   {
    "text": "L’observateur est derrière la pièce",
    "good": 1,
    "why": "Derrière la pièce, il regarde vers l’avant : c’est la coupe B-B.",
    "bad": "Un observateur derrière la pièce regarde vers l’avant. Cherchez la coupe dont les flèches pointent vers l’avant."
   }
  ]
 },
 "ex3": {
  "labels": [
   "Béton",
   "Isolant",
   "Bois",
   "Plâtre",
   "Terre"
  ],
  "exemple": {
   "text": "La couche de côté extérieur, la plus épaisse, de la coupe du mur doublé",
   "good": 0,
   "why": "On la reconnaît à ses traits obliques continus, et son épaisseur se lit sur la cote placée à côté."
  },
  "lignes": [
   {
    "text": "Petits points serrés",
    "good": 3,
    "why": "Les petits points désignent le plâtre.",
    "bad": "Comparez la forme du motif décrit avec les cinq formes de la figure et du premier tableau de l’écran « Les hachures disent le matériau »."
   },
   {
    "text": "Tirets obliques, inclinés en sens inverse du béton",
    "good": 4,
    "why": "Les tirets obliques désignent la terre.",
    "bad": "Comparez la forme du motif décrit avec les cinq formes de la figure et du premier tableau de l’écran « Les hachures disent le matériau »."
   },
   {
    "text": "Vagues régulières",
    "good": 1,
    "why": "Les vagues désignent l’isolant.",
    "bad": "Comparez la forme du motif décrit avec les cinq formes de la figure et du premier tableau de l’écran « Les hachures disent le matériau »."
   },
   {
    "text": "Traits fins obliques et continus, à 45°",
    "good": 0,
    "why": "Les traits obliques continus désignent le béton.",
    "bad": "Comparez la forme du motif décrit avec les cinq formes de la figure et du premier tableau de l’écran « Les hachures disent le matériau »."
   },
   {
    "text": "Traits horizontaux avec de courts traits",
    "good": 2,
    "why": "Les traits horizontaux avec de courts traits désignent le bois.",
    "bad": "Comparez la forme du motif décrit avec les cinq formes de la figure et du premier tableau de l’écran « Les hachures disent le matériau »."
   }
  ]
 }
};
/*FAITS-FIN*/

const ALT = {
  principe: "Le bloc percé en trois dessins. En bas, la vue de dessus : un rectangle avec le trou en cercle et, par le centre du trou, la trace du plan de coupe en trait mixte fin, avec une flèche et la lettre A à chaque bout, les flèches pointant vers le haut. Au-dessus, la coupe A-A : deux zones hachurées séparées par un vide blanc. À droite, la vue de face sans coupe, où le trou se lit par deux traits cachés.",
  sens: "La cale en L percée vue de dessus, avec une trace en trait mixte fin repérée A côté bas et B côté haut à chaque bout. Au-dessus, la coupe A-A à gauche, regard vers le fond : le talon est à gauche et le trou à droite du talon. À droite, la coupe B-B, regard vers l’avant : le talon est à droite et le trou à gauche du talon.",
  hachures: "Cinq carrés hachurés : béton en traits obliques, isolant en vagues, bois en traits horizontaux, plâtre en petits points, terre en tirets obliques. En dessous, la coupe horizontale d’un mur doublé, avec trois couches de l’extérieur vers l’intérieur : béton, isolant, plaque de plâtre, chacune avec son épaisseur.",
  section: "Support de gaine en U vu de face, avec la trace de la section en axe mixte fin et la lettre B aux deux bouts. Sur la vue, la section rabattue : un U hachuré au contour fin. À droite, la section B-B sortie : le même U hachuré, en trait fort.",
  brisee: "Plaque à deux trous. En bas, la vue de dessus avec la trace A-A en escalier, aux angles renforcés, qui passe par l’axe de chaque trou. Au-dessus à gauche, la coupe A-A brisée : deux vides blancs entre trois zones hachurées. À droite, la coupe par un plan simple, où un seul trou apparaît.",
  quatre: "Quatre coupes A-A du bloc percé, côte à côte, repérées A à D. Une seule montre un vide blanc entre deux zones hachurées, à la place du trou de la vue de dessus ; parmi les trois autres, l’une hachure le vide du trou comme la matière, l’autre n’a aucune hachure, la dernière place le vide au mauvais endroit.",
  projet1: "Trois vues du bloc percé du projet : la vue de face, la vue de dessus avec la trace du plan de coupe A-A, la vue de gauche. Le trou se lit par des traits cachés sur les vues de face et de gauche.",
  projet2: "Trois vues de la plaque du projet : la vue de face, la vue de dessus avec la trace brisée du plan de coupe A-A, la vue de gauche. Les deux trous se lisent par des traits cachés sur les vues de face et de gauche.",
  plan: "Plan du rez-de-chaussée de la maison d’étude : le garage à gauche, le séjour-cuisine en bas à droite, l’entrée et le WC en haut. Une trace en trait mixte fin repérée A à chaque extrémité traverse le garage et le séjour-cuisine, avec une flèche à chaque bout.",
  coupe: "Coupe A-A de la maison d’étude : le garage non chauffé à gauche et le séjour-cuisine à droite au rez-de-chaussée, les chambres 1 et 2 à l’étage, les combles perdus non chauffés sous la toiture à deux pentes. Les murs et les planchers coupés sont pochés en gris. Des chaînes de cotes en mètres courent à gauche et en dessous."
};

/* Un exercice avec une figure sous les yeux : la figure s'ajoute au rendu de l'activité. */
const avecFigure = (html, act) => ({ ...act, render: item => html + act.render(item) });

/* Écran « À vous, le projet » : la commande du moteur, complétée par la figure du niveau (niveaux 1 et 2) ou par les plans (niveau 3). */
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet",
  text: {
    1: "Vous recevez une commande de bureau d’études. Suivez les quatre étapes dans l’ordre, sur la feuille réponse du niveau 1. La figure du projet est sous la commande.",
    2: "Vous recevez une commande de bureau d’études. Traitez-la sur la feuille réponse du niveau 2, sans étapes imposées. La figure du projet est sous la commande.",
    3: "Vous recevez une commande de bureau d’études : lire la coupe A-A de la maison d’étude. Vos réponses s’écrivent à l’écran Vérifier, et la trace sur papier libre."
  },
  prompt: {
    1: "Ouvrez la feuille réponse, puis suivez les étapes.",
    2: "Ouvrez la feuille réponse, puis traitez la commande.",
    3: "Ouvrez les plans de la maison, puis traitez la commande."
  },
  aides: {
    1: [
      "La trace du plan de coupe est sur la vue de dessus de la figure du projet. Les dimensions du bloc et du trou sont dans la commande. Les règles de dessin sont à l’écran « Ce qu’on dessine dans une coupe ».",
      "Le plan passe par l’axe du trou : le vide de la coupe a la largeur du trou et commence un rayon avant l’axe. La matière de chaque côté se hachure à 45°. Comptez les zones hachurées une fois le vide placé.",
      `Sur le bloc d’exemple, le trou de ${FA.bloc.d} mm est à ${FA.bloc.x} mm du bord gauche : le vide commence à ${FA.bloc.vg} mm, soit ${FA.bloc.x} − ${FA.bloc.r}. Faites le même calcul avec la position du trou du projet.`
    ],
    2: [
      "La trace brisée est sur la vue de dessus de la figure du projet. Les diamètres et les positions des deux trous sont dans la commande. Les règles sont aux écrans « Ce qu’on dessine dans une coupe » et « La coupe brisée ».",
      "Chaque trou que la trace traverse par son axe donne un vide de la largeur de son diamètre. Dessinez la coupe comme si les deux tronçons de la trace faisaient un seul plan, hachurez la matière et ne dessinez pas les marches.",
      `Sur la plaque d’exemple, les trous de ${FA.plaque.d1} mm et de ${FA.plaque.d2} mm donnent deux vides de ${FA.plaque.d1} mm et de ${FA.plaque.d2} mm, séparés par une zone hachurée. Écrivez la même liste pour la plaque du projet.`
    ],
    3: [
      `Les plans sont dans le PDF de la maison : la page ${FA.mai.pCoupe} pour la coupe, la page ${FA.mai.pRdc} pour le rez-de-chaussée. Les cotes de hauteur sont à gauche de la coupe, en mètres.`,
      "La hauteur sous plafond va du sol d’une pièce à son plafond. L’épaisseur d’un plancher est la cote de la bande grise entre deux pièces superposées. La hauteur totale va du sol au point le plus haut. Chaque pièce porte son nom dans la coupe, avec « non chauffé » quand c’est le cas.",
      `Sur la chaîne du bas de la coupe, les cotes s’additionnent : ${FA.mai.chaine.slice(0, -1).join(" + ")} donne ${FA.mai.somme}. Faites la même addition sur la chaîne de gauche pour contrôler la cote totale.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensPlans = () => BE.liens([{ href: DOSSIER + "plans-maison.pdf", title: "Les plans de la maison d’étude", note: `Page ${FA.mai.pRdc} : rez-de-chaussée, avec la trace de la coupe. Page ${FA.mai.pCoupe} : coupe A-A` }]);
ecranProjet.render = () => {
  let html = rendreCommande();
  const n = Number((html.match(/Niveau (\d)/) || [])[1]);
  if (n === 1) return html + fig("projet-N1-trois-vues", ALT.projet1, "La figure du projet, niveau 1");
  if (n === 2) return html + fig("projet-N2-trois-vues", ALT.projet2, "La figure du projet, niveau 2");
  if (n === 3) {
    html = html.replace(/<p class="commande-actions">[\s\S]*?<\/p>/, "");
    return html + liensPlans();
  }
  return html;
};

BE.station({
  code: "BE-P5b",
  titre: "Coupes et sections",
  ligne: "Lire les plans",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Bloc percé, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Plaque à deux trous, coupe brisée", partie: "publique" },
    { n: 3, nom: "professionnel", batiment: "La coupe A-A de la maison d’étude", partie: "publique" }
  ],
  intro: "Une coupe montre l’intérieur d’une pièce ou d’un bâtiment. Vous apprenez à tracer un plan de coupe, à dessiner une coupe hachurée et à choisir le bon sens de regard, puis vous lisez la coupe d’une maison.",
  note: "Les dimensions des pièces et les épaisseurs du mur doublé sont des valeurs d’exercice. Les cotes de la maison viennent de ses plans, dans le dossier de la station.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et raison d’être" },
    { id: "methode", label: "La méthode", note: "de la trace à la lecture" },
    { id: "projet", label: "Le projet", note: "commande et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Coupe A-A d’un bloc percé, pour le dossier de fabrication",
      delai: "Rendu en fin de séance",
      commande: [
        `Un atelier vous remet un bloc percé et demande sa coupe A-A. Dimensions : ${FA.p1.dims}.`,
        "Étape 1. Sur la figure du projet, trouvez la trace du plan de coupe sur la vue de dessus et relevez le sens des flèches.",
        `Étape 2. Dans le cadre quadrillé de la feuille, dessinez le contour de la coupe en vraie grandeur : un carreau vaut ${FA.carreau} mm.`,
        "Étape 3. Placez le vide du trou, hachurez la matière coupée à 45° et nommez la coupe.",
        "Étape 4. Écrivez dans les cases la distance du bord gauche au vide, la largeur du vide et le nombre de zones hachurées, puis vérifiez-les à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Les trois vues du bloc du projet", ou: "Sous cette commande, à l’écran « À vous, le projet »" },
        { piece: "Les règles de dessin", ou: "Écrans « Le plan de coupe » et « Ce qu’on dessine dans une coupe »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Coupe brisée A-A d’une plaque à deux trous, pour le dossier de fabrication",
      delai: "Rendu en fin de séance",
      commande: `Un atelier vous remet une plaque à deux trous et demande sa coupe A-A, tracée en plan brisé pour passer par l’axe de chaque trou. Dimensions : ${FA.p2.dims}. Dessinez la coupe en vraie grandeur dans le cadre quadrillé (un carreau vaut ${FA.carreau} mm), hachurez-la et nommez-la. Écrivez dans les cases le nombre de vides, la largeur du grand vide et le nombre de zones hachurées, avec la source de chaque donnée.`,
      pieces: [
        { piece: "Les trois vues de la plaque du projet", ou: "Sous cette commande, à l’écran « À vous, le projet »" },
        { piece: "Les règles de dessin", ou: "Écrans « Ce qu’on dessine dans une coupe » et « La coupe brisée »" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    3: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau professionnel",
      objet: "Lecture de la coupe A-A de la maison d’étude",
      delai: "Rendu en fin de séance",
      commande: [
        "Le bureau d’études reprend les plans de la maison d’étude. Il vous demande de lire sa coupe A-A, puis de retrouver sa trace sur le plan du rez-de-chaussée.",
        `Étape 1. Sur la page ${FA.mai.pCoupe} du PDF des plans, lisez la hauteur sous plafond, l’épaisseur du plancher entre les deux niveaux et la hauteur totale jusqu’au faîtage. Notez chaque cote avec sa position sur la coupe.`,
        "Étape 2. Comptez les pièces chauffées que la coupe traverse. Une pièce marquée « non chauffé » ne se compte pas.",
        `Étape 3. Sur la page ${FA.mai.pRdc}, retrouvez la trace de la coupe A-A. Sur papier libre, redessinez le contour du rez-de-chaussée et la trace, avec ses flèches et ses lettres.`,
        "Étape 4. Reportez vos résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Les plans de la maison d’étude", ou: `PDF ci-dessous : page ${FA.mai.pRdc}, rez-de-chaussée ; page ${FA.mai.pCoupe}, coupe A-A` },
        { piece: "La méthode de lecture", ou: "Écran « Lire la coupe d’un plan d’architecte »" },
        { piece: "Papier libre", ou: "Pour la trace sur le plan du rez-de-chaussée" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-vide", libelle: "Largeur du vide de la coupe A-A", unite: "mm", min: 16, max: 16, indice: "Relisez l’écran « Ce qu’on dessine dans une coupe » : le vide est la place du trou, et le plan passe par son axe. Relisez les dimensions de la commande." },
      { id: "n1-pos", libelle: "Distance du bord gauche de la coupe au vide", unite: "mm", min: 37, max: 37, indice: "Relisez les dimensions de la commande : la position du trou est donnée à son axe, et le vide commence un rayon avant l’axe. Relisez aussi l’écran « Le sens d’observation » : un sens de regard inversé change le côté du vide." },
      { id: "n1-zones", libelle: "Nombre de zones hachurées", unite: "", min: 2, max: 2, indice: "Relisez l’écran « Ce qu’on dessine dans une coupe » : le vide blanc sépare la matière en zones. Comptez celles de votre dessin de chaque côté du vide." }
    ],
    2: [
      { id: "n2-vides", libelle: "Nombre de vides de la coupe brisée", unite: "", min: 2, max: 2, indice: "Relisez l’écran « La coupe brisée » : chaque trou que la trace traverse par son axe donne un vide." },
      { id: "n2-grand", libelle: "Largeur du grand vide", unite: "mm", min: 12, max: 12, indice: "Relisez l’écran « La coupe brisée » : un vide a la largeur du diamètre du trou, quand le plan passe par son axe. Comparez les deux trous de la commande." },
      { id: "n2-zones", libelle: "Nombre de zones hachurées", unite: "", min: 3, max: 3, indice: "Relisez l’écran « Ce qu’on dessine dans une coupe » : la matière se compte entre les vides et de chaque côté. Les marches du plan ne font pas de zone." }
    ],
    3: [
      { id: "n3-hsp", libelle: "Hauteur sous plafond", unite: "m", min: 2.5, max: 2.5, indice: "Relisez l’écran « Lire la coupe d’un plan d’architecte » : les hauteurs se lisent sur les chaînes de cotes de la coupe, en mètres. La réponse s’écrit en mètres, comme la cote (par exemple 2,50)." },
      { id: "n3-pla", libelle: "Épaisseur du plancher entre les deux niveaux", unite: "m", min: 0.2, max: 0.2, indice: "Relisez l’écran « Lire la coupe d’un plan d’architecte » : l’épaisseur d’un plancher est la cote de la bande grise entre deux pièces superposées. La réponse s’écrit en mètres, comme la cote (par exemple 2,50)." },
      { id: "n3-fai", libelle: "Hauteur totale jusqu’au faîtage", unite: "m", min: 6.6, max: 6.6, indice: "Relisez l’écran « Lire la coupe d’un plan d’architecte » : la hauteur totale est la cote qui va du sol au point le plus haut, en mètres." },
      { id: "n3-pieces", libelle: "Nombre de pièces chauffées traversées par la coupe", unite: "", min: 3, max: 3, indice: "Relisez l’écran « Lire la coupe d’un plan d’architecte » : chaque pièce traversée est nommée dans la coupe, avec la mention « non chauffé » quand c’est le cas." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "P6", titre: "Les échelles", href: "../../../plan/gares/g06-les-echelles/index.html" },
  correspondances: [
    { reseau: "Lire les plans", titre: "Gare 4, Les types de plans", href: GARES + "g04-types-de-plans/index.html", pourquoi: "Le plan d’un étage est une coupe horizontale, et la coupe verticale se repère sur lui par sa trace." },
    { reseau: "Lire les plans", titre: "Gare 5, Les conventions graphiques", href: GARES + "g05-conventions/index.html", pourquoi: "Les traits et les hachures de cette station y sont aussi présentés, avec la lecture de la légende." },
    { reseau: "Bureau d’études", titre: "BE-P2b, Traits cachés et vues", href: "../p2b-traits-caches-et-vues/index.html", pourquoi: "Les traits cachés d’une vue disparaissent dans une coupe : cette station montre d’où ils viennent." },
    { reseau: "Bureau d’études", titre: "BE-T2, Les parois : de la coupe au coefficient U", href: "../t2-parois-coefficient-u/index.html", pourquoi: "La coupe d’une paroi donne ses couches, dont le coefficient U se calcule à cette station." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/1-coupe-sur-chantier.webp", imageAlt: "Sur un chantier, un technicien tient un plan imprimé où une ligne de coupe est tracée. Devant lui, une paroi ouverte montre ses couches et une gaine à l’intérieur du mur.",
      text: "Un bureau d’études rend souvent deux choses : une coupe dessinée par le technicien, et la lecture d’une coupe déjà tracée sur un plan. Dans cette station, vous dessinez la coupe d’une pièce d’atelier, avec son plan de coupe et ses hachures, puis vous lisez la coupe d’une vraie maison. Les niveaux 1 et 2 se répondent sur la feuille A4 recto verso. Le niveau 3 se répond à l’écran Vérifier et sur papier libre. L’écran explique chaque geste, le papier reçoit vos dessins.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Vous recevez", rows: [["Une pièce :", "trois vues d’un bloc ou d’une plaque, avec la trace de son plan de coupe."], ["Un plan :", "la maison d’étude, avec la trace de sa coupe A-A au rez-de-chaussée."]] },
        { title: "Vous produisez", rows: [["Une coupe :", "dessinée dans un cadre quadrillé, hachurée et nommée."], ["Une lecture :", "des hauteurs, une épaisseur et un nombre de pièces, relevés sur la coupe de la maison."]] },
        { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la gare 6, sur les échelles."]] }
      ])
    }),

    BE.ecran({
      id: "pourquoi-couper", dossier: "prise", kicker: "Prise en main, 2", title: "Pourquoi couper", level: "comprendre",
      text: "Les vues de la gare 2 montrent l’extérieur d’un objet. Quand l’intérieur compte, par exemple un trou dans une pièce, une gaine dans un mur ou les niveaux d’une maison, les vues ne suffisent plus : les parties cachées se dessinent en traits interrompus, et ces traits s’accumulent vite. On coupe alors l’objet par la pensée, on retire une partie et on regarde ce qui reste. La matière que le plan de coupe a tranchée se hachure, ce qui est vide reste blanc. Un plan d’étage est déjà une coupe, horizontale, faite à environ 1 m du sol (gare 4).",
      prompt: "Lisez le tableau, puis continuez.",
      render: () => tableau(["Ce que l’on veut voir", "Sur une vue", "Sur une coupe"], [
        ["Un trou dans une pièce", "deux traits cachés", "un vide blanc entre deux zones hachurées"],
        ["Une gaine dans un mur", "un trait interrompu derrière la paroi", "la gaine et chaque couche du mur, avec son épaisseur"],
        ["Les niveaux d’une maison", "les façades, sans les planchers", "les planchers, les hauteurs sous plafond, la toiture"]
      ], "Ce que montrent une vue et une coupe")
        + BE.renvoi(`Les vues sont présentées à <a href="${GARES}g02-les-vues/index.html">la gare 2</a>, les types de plans à <a href="${GARES}g04-types-de-plans/index.html">la gare 4</a>.`)
    }),

    BE.ecran({
      id: "le-plan-de-coupe", dossier: "methode", kicker: "La méthode, 1", title: "Le plan de coupe", level: "comprendre",
      text: "Le plan de coupe est le plan imaginaire qui tranche la pièce. On le repère sur une vue, souvent la vue de dessus, par sa trace : un trait mixte fin, dont les extrémités sont renforcées en trait fort. À chaque extrémité, une flèche indique le sens du regard, et une lettre majuscule nomme la coupe. Les deux lettres sont identiques : la coupe s’appelle alors A-A et se dessine ailleurs sur la feuille, avec ce nom en titre. Sur la figure, la trace passe par l’axe du trou et les flèches pointent vers le haut de la vue de dessus.",
      prompt: "Lisez la figure et le tableau, puis l’exemple résolu.",
      render: () => fig("1-principe-coupe-aa", ALT.principe, "Le bloc percé : vue de dessus avec la trace du plan de coupe, coupe A-A, vue de face sans coupe")
        + tableau(["Élément de la trace", "Dessin", "Rôle"], [
          ["La trace", "trait mixte fin", "dit où l’on coupe"],
          ["Les extrémités", "courts traits forts", "marquent les bords du plan"],
          ["Les flèches", "perpendiculaires à la trace, côté regard", "disent de quel côté on regarde"],
          ["Les lettres", "une par bout, identiques", "nomment la coupe : A-A"]
        ], "Les quatre éléments d’une trace de plan de coupe")
        + BE.exemple({ text: `Bloc d’exemple (${FA.bloc.dims}) : le trou de ${FA.bloc.d} mm est à ${FA.bloc.y} mm du bord avant`, answer: `plan de coupe à ${FA.bloc.y} mm du bord avant, trace en trait mixte fin sur la vue de dessus, lettres A, flèches vers le fond`, why: "Le plan passe par l’axe du trou : la coupe montre le trou dans toute sa largeur." })
    }),

    BE.ecran({
      id: "ce-qu-on-dessine", dossier: "methode", kicker: "La méthode, 2", title: "Ce qu’on dessine dans une coupe", level: "comprendre",
      text: "Dans une coupe, vous dessinez ce que l’on voit en regardant dans le sens des flèches, une fois retirée la partie située devant le plan. La matière que le plan a tranchée se hachure : des traits fins à 45°, régulièrement espacés. Le vide reste blanc, et le trou n’est donc pas hachuré. Ce qui se trouve derrière le plan et reste visible se dessine en trait fort. On ne trace aucun trait caché, puisque l’intérieur est ouvert.",
      prompt: "Lisez le tableau, puis l’exemple résolu.",
      render: () => fig("1-principe-coupe-aa", ALT.principe, "La coupe A-A du bloc, au-dessus de sa vue de dessus, à côté de la vue de face sans coupe")
        + tableau(["Ce que vous dessinez", "Trait ou motif"], [
          ["La matière coupée", "hachures fines à 45°"],
          ["Le contour de la matière coupée", "trait fort"],
          ["Le vide, par exemple un trou", "blanc, sans hachures"],
          ["Ce qui est visible derrière le plan", "trait fort"],
          ["Ce qui est caché", "aucun trait"]
        ], "Le dessin d’une coupe")
        + BE.exemple({ text: "Le bloc d’exemple, vue de face sans coupe, puis coupe A-A", answer: `vue de face : deux traits cachés ; coupe A-A : un vide de ${FA.bloc.d} mm entre deux zones hachurées de ${FA.bloc.zg} mm et de ${FA.bloc.zd} mm`, why: "La vue de face signale le trou par deux traits cachés. La coupe le montre par un vide blanc et les traits cachés disparaissent." })
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, quelle coupe est juste", title: "Exercice : quelle coupe A-A est juste ?", level: "appliquer", requiresAction: true,
      text: {
        1: `Le bloc d’exemple (${FA.bloc.dims}, trou de ${FA.bloc.d} mm à ${FA.bloc.x} mm du bord gauche) est coupé par un plan qui passe par l’axe du trou. Quatre coupes A-A sont dessinées, de A à D, et une seule est juste. La figure du plan de coupe reste sous vos yeux.`,
        2: `Le bloc d’exemple (${FA.bloc.dims}, trou de ${FA.bloc.d} mm à ${FA.bloc.x} mm du bord gauche) est coupé par un plan qui passe par l’axe du trou. Quatre coupes A-A sont dessinées, de A à D, et une seule est juste. Répondez sans la figure du plan de coupe.`
      },
      prompt: { 1: "Choisissez la coupe juste, en vous aidant de la figure.", 2: "Choisissez la coupe juste. Cette question est à faire seul." },
      aides: {
        1: [
          "Les quatre coupes sont sur la figure de l’exercice. Les règles sont aux écrans « Le plan de coupe » et « Ce qu’on dessine dans une coupe ».",
          "Pour chaque coupe, regardez si le vide du trou est blanc, si la matière de chaque côté est hachurée et si le vide est à la place du trou.",
          "Sur une pièce pleine, sans trou, la coupe est une seule zone hachurée, sans vide. Ici, cherchez les coupes qui ont un vide blanc, puis vérifiez sa place."
        ],
        2: [
          "Les quatre coupes sont sur la figure de l’exercice. Les règles sont aux écrans « Le plan de coupe » et « Ce qu’on dessine dans une coupe ».",
          "Pour chaque coupe, vérifiez la matière, le vide et la place du vide avant de choisir.",
          "Sur une pièce pleine, la coupe est une seule zone hachurée. Éliminez d’abord les coupes qui n’ont pas de vide blanc ou pas de hachures."
        ]
      },
      ...BE.parNiveau({
        1: avecFigure(fig("1-principe-coupe-aa", ALT.principe, "Rappel : le plan de coupe et la coupe du bloc d’exemple") + fig("6-exercice-quatre-coupes", ALT.quatre, "Les quatre coupes A-A proposées"), BE.quiz(FA.ex1)),
        2: avecFigure(fig("6-exercice-quatre-coupes", ALT.quatre, "Les quatre coupes A-A proposées"), BE.quiz(FA.ex1))
      })
    }),

    BE.ecran({
      id: "sens-d-observation", dossier: "methode", kicker: "La méthode, 3", title: "Le sens d’observation", level: "comprendre",
      text: "Un même plan de coupe donne deux coupes, selon le côté d’où l’on regarde. Les flèches de la trace indiquent le sens du regard : on garde la partie vers laquelle elles pointent, et on la voit comme si l’on se tenait de l’autre côté du plan. Sur la figure, la cale en L est coupée par un seul plan. Avec les flèches de A-A vers le fond de la vue de dessus, l’observateur est devant la pièce. Avec les flèches de B-B vers l’avant, il est derrière. Les deux coupes sont symétriques.",
      prompt: "Lisez la figure, le tableau, puis l’exemple résolu.",
      render: () => fig("2-sens-d-observation", ALT.sens, "La cale en L percée : un seul plan, deux sens de regard")
        + tableau(["Coupe", "Flèches vers", "Observateur", "Talon", "Trou"], [
          ["A-A", "le fond", "devant la pièce", FA.sens.talonA, FA.sens.trouA],
          ["B-B", "l’avant", "derrière la pièce", FA.sens.talonB, FA.sens.trouB]
        ], "Deux sens de regard, deux coupes")
        + BE.exemple({ text: `Cale en L percée, dont le talon est la partie haute, à gauche sur la vue de dessus (${FA.cale.dims}, trou de ${FA.cale.d} mm), coupe A-A, flèches vers le fond de la vue de dessus`, answer: `observateur devant la pièce, talon ${FA.sens.talonA}, trou ${FA.sens.trouA}`, why: `Le regard va vers le fond et la partie gardée est derrière le plan. Le talon est ${FA.sens.talonA} sur la vue de dessus, donc aussi ${FA.sens.talonA} de l’observateur.` })
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, le sens du regard", title: "Exercice : A-A ou B-B", level: "appliquer", requiresAction: true,
      text: {
        1: "Pour chaque phrase, dites si elle décrit la coupe A-A (regard vers le fond) ou la coupe B-B (regard vers l’avant) de la cale en L percée. Un exemple résolu est donné en tête de liste.",
        2: "Pour chaque phrase, dites si elle décrit la coupe A-A (regard vers le fond) ou la coupe B-B (regard vers l’avant) de la cale en L percée."
      },
      prompt: { 1: "Classez chaque phrase, en vous aidant de l’exemple.", 2: "Classez chaque phrase. Cette question est à faire seul." },
      aides: {
        1: [
          "La figure et le tableau de l’écran « Le sens d’observation » donnent une ligne par coupe.",
          "Cherchez d’abord où pointent les flèches de la trace, puis où se trouve l’observateur, puis de quel côté du talon se place le trou.",
          "Sur la vue de dessus, un observateur qui se tient devant la pièce regarde vers le fond : c’est le sens de la coupe A-A. Placez les autres phrases par rapport à lui."
        ],
        2: [
          "La figure et le tableau de l’écran « Le sens d’observation » donnent une ligne par coupe.",
          "Pour chaque phrase, partez de la place de l’observateur, puis déduisez le côté du talon et celui du trou.",
          "Un observateur devant la pièce regarde vers le fond : c’est le sens de la coupe A-A. Placez les autres phrases par rapport à lui."
        ]
      },
      ...BE.parNiveau({
        1: avecFigure(fig("2-sens-d-observation", ALT.sens, "La cale en L percée"), BE.tri(FA.ex2.lignes, FA.ex2.labels, FA.ex2.exemple)),
        2: avecFigure(fig("2-sens-d-observation", ALT.sens, "La cale en L percée"), BE.tri(FA.ex2.lignes, FA.ex2.labels))
      })
    }),

    BE.ecran({
      id: "hachures-materiaux", dossier: "methode", kicker: "La méthode, 4", title: "Les hachures disent le matériau", level: "comprendre",
      text: `Chaque matériau coupé a son motif de hachures : le béton en traits obliques, l’isolant en vagues, le bois en traits horizontaux, le plâtre en petits points, la terre en tirets obliques. Ces motifs sont des habitudes du métier, qu’un cabinet peut remplacer par d’autres. La légende du plan donne alors le sens de chaque motif : lisez-la avant de conclure. Le mur doublé de la figure se lit couche par couche, de l’extérieur vers l’intérieur : béton de ${FA.mur.beton} cm, isolant de ${FA.mur.isolant} cm, plaque de plâtre de ${FA.mur.platre} cm, soit ${FA.mur.total} cm en tout.`,
      prompt: "Lisez la figure et les tableaux, puis l’exemple résolu.",
      render: () => fig("3-hachures-materiaux", ALT.hachures, "Cinq motifs de hachures et la coupe horizontale d’un mur doublé")
        + tableau(["Matériau", "Motif"], [
          ["Béton", "traits fins obliques et continus, à 45°"],
          ["Isolant", "vagues régulières"],
          ["Bois", "traits horizontaux avec de courts traits"],
          ["Plâtre", "petits points serrés"],
          ["Terre", "tirets obliques, inclinés en sens inverse du béton"]
        ], "Les cinq motifs de la figure")
        + tableau(["Couche, de l’extérieur vers l’intérieur", "Matériau", "Épaisseur"], [
          ["1", "béton", `${FA.mur.beton} cm`],
          ["2", "isolant", `${FA.mur.isolant} cm`],
          ["3", "plaque de plâtre", `${FA.mur.platre} cm`],
          ["Total", "", `${FA.mur.total} cm`]
        ], "Le mur doublé, en coupe horizontale")
        + BE.exemple({ text: "Dans la coupe du mur doublé, la couche hachurée en vagues", answer: `isolant, ${FA.mur.isolant} cm, entre le béton et la plaque de plâtre`, why: "Le motif désigne le matériau, la cote placée à côté de la couche donne son épaisseur." })
        + BE.renvoi(`Les traits et les motifs sont aussi présentés à <a href="${GARES}g05-conventions/index.html">la gare 5</a>.`)
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, les motifs", title: "Exercice : du motif au matériau", level: "appliquer", requiresAction: true,
      text: {
        1: "Chaque ligne décrit un motif de hachures. Choisissez le matériau qu’il désigne quand la légende du plan ne dit rien d’autre. Un exemple résolu est donné en tête de liste.",
        2: "Chaque ligne décrit un motif de hachures. Choisissez le matériau qu’il désigne quand la légende du plan ne dit rien d’autre."
      },
      prompt: { 1: "Classez chaque motif, en vous aidant de l’exemple.", 2: "Classez chaque motif. Cette question est à faire seul." },
      aides: {
        1: [
          "Les cinq motifs sont sur la figure et dans le premier tableau de l’écran « Les hachures disent le matériau ».",
          "Comparez la forme du motif décrit avec les cinq formes de la figure : obliques, vagues, traits horizontaux, points, tirets.",
          "Des traits obliques continus à 45° désignent le béton. Cherchez ensuite le motif décrit dans la liste et comparez avec la figure."
        ],
        2: [
          "Les cinq motifs sont sur la figure et dans le premier tableau de l’écran « Les hachures disent le matériau ».",
          "Comparez la forme du motif décrit avec les cinq formes de la figure.",
          "Commencez par les motifs qui ne se ressemblent à aucun autre, puis traitez ceux qui restent."
        ]
      },
      ...BE.parNiveau({
        1: avecFigure(fig("3-hachures-materiaux", ALT.hachures, "Rappel : les cinq motifs"), BE.tri(FA.ex3.lignes, FA.ex3.labels, FA.ex3.exemple)),
        2: BE.tri(FA.ex3.lignes, FA.ex3.labels)
      })
    }),

    BE.ecran({
      id: "section-rabattue-et-sortie", dossier: "methode", kicker: "La méthode, 5", title: "Section rabattue, section sortie", level: "comprendre",
      text: `Une section est une coupe qui ne dessine que la matière tranchée, sans rien de ce qui se trouve derrière. Elle montre la forme d’une pièce longue, comme ce support de gaine en U de ${FA.gaine.dims}. Rabattue, la section se dessine sur la vue, autour de la trace, avec un contour fin et des hachures. Sortie, elle se dessine à côté de la vue, en trait fort, et prend le nom de ses lettres : section B-B. Dans les deux cas, la trace est un axe mixte fin avec la lettre B à chaque bout.`,
      prompt: "Lisez la figure et le tableau, puis l’exemple résolu.",
      render: () => fig("4-section-rabattue-et-sortie", ALT.section, "Le support de gaine en U : section rabattue et section sortie")
        + tableau(["", "Section rabattue", "Section sortie"], [
          ["Où", "sur la vue, autour de la trace", "à côté de la vue"],
          ["Contour", "trait fin", "trait fort"],
          ["Hachures", "oui", "oui"],
          ["Nom", "repérée par la trace", "section B-B"]
        ], "Deux façons de dessiner une section")
        + BE.exemple({ text: `Section B-B du support en U (${FA.gaine.sect} mm, épaisseur ${FA.gaine.ep} mm)`, answer: `trois bandes hachurées de ${FA.gaine.ep} mm : le fond et deux ailes`, why: "La section ne montre que la matière coupée : le vide du U reste blanc et rien de la longueur du support n’est dessiné." })
    }),

    BE.ecran({
      id: "coupe-brisee", dossier: "methode", kicker: "La méthode, 6", title: "La coupe brisée", level: "comprendre",
      text: `Quand un seul plan ne passe pas par tout ce que l’on veut montrer, le plan de coupe fait des marches : c’est une coupe brisée à plans parallèles. Sur la plaque à deux trous (${FA.plaque.dims}), les axes des trous ne sont pas alignés : un plan simple n’en montre qu’un. La trace fait une marche, ses angles sont renforcés en trait fort, et les flèches et les lettres sont aux deux bouts, comme pour une coupe simple. La coupe se dessine comme si les plans n’en faisaient qu’un : les marches ne s’y voient pas.`,
      prompt: "Lisez la figure, puis l’exemple résolu.",
      render: () => fig("5-coupe-brisee", ALT.brisee, "La plaque à deux trous : coupe brisée et coupe par un plan simple")
        + BE.exemple({ text: `Plaque d’exemple : trous de ${FA.plaque.d1} mm et de ${FA.plaque.d2} mm, axes non alignés`, answer: `coupe brisée A-A : deux vides, de ${FA.plaque.d1} mm et de ${FA.plaque.d2} mm, entre ${FA.plaque.zones} zones hachurées`, why: "Chaque tronçon de la trace passe par l’axe d’un trou, et chaque trou donne un vide de la largeur de son diamètre." })
    }),

    BE.ecran({
      id: "lire-la-coupe-du-plan", dossier: "methode", kicker: "La méthode, 7", title: "Lire la coupe d’un plan d’architecte", level: "comprendre",
      image: "illustrations/2-lire-la-coupe-du-plan.webp", imageAlt: "Sur une table, la coupe A-A du plan d’une maison avec un doigt posé sur une chaîne de cotes, à côté du plan du rez-de-chaussée où la trace de la coupe est tracée.",
      text: "Une coupe de plan se lit comme celle d’une pièce, en cinq gestes. Premier geste : trouver la trace sur le plan du rez-de-chaussée, deux lettres A reliées par un trait mixte fin. Deuxième geste : lire le sens. Les flèches pointent vers le haut du plan et le nord est en haut de tous les plans : on regarde donc vers le nord. Troisième geste : lire les pièces traversées, dont le nom est écrit dans la coupe, avec la mention « non chauffé » quand c’est le cas. Quatrième geste : lire les hauteurs sur les chaînes de cotes, en mètres. Cinquième geste : reconnaître la matière coupée. Sur cette coupe, elle est pochée en gris uni, sans hachures.",
      prompt: "Parcourez le plan, puis la coupe, puis l’exemple résolu.",
      render: () => BE.schema(DOSSIER + "svg/plan-rdc.svg", ALT.plan, "Le plan du rez-de-chaussée, avec la trace de la coupe A-A")
        + BE.schema(DOSSIER + "svg/coupe-a-a.svg", ALT.coupe, "La coupe A-A de la maison d’étude")
        + tableau(["Geste", "Où le faire", "Ce que l’on lit"], [
          ["1. Trouver la trace", "plan du rez-de-chaussée", "deux lettres A reliées par un trait mixte fin"],
          ["2. Lire le sens", "flèches de la trace, nord du plan", "la direction du regard"],
          ["3. Lire les pièces", "noms écrits dans la coupe", "les pièces traversées, chauffées ou non"],
          ["4. Lire les hauteurs", "chaînes de cotes de la coupe", "hauteurs et épaisseurs, en mètres"],
          ["5. Reconnaître la matière", "murs et planchers de la coupe", "un poché gris, une convention à côté des hachures"]
        ], "Les cinq gestes de lecture")
        + BE.exemple({ text: `Chaîne de cotes du bas de la coupe : ${FA.mai.chaine.join(" ; ")}`, answer: `${FA.mai.chaine.slice(0, -1).join(" + ")} = ${FA.mai.somme}`, why: "La dernière cote est la cote totale : une chaîne de cotes se contrôle par une addition. Le garage et le séjour-cuisine se lisent sur les cotes de leur largeur." })
        + BE.alerte("<strong>Limite.</strong> Le plan de la maison n’a pas de légende des motifs. Le gris uni y désigne la matière coupée : une légende de plan devrait préciser cette convention.")
        + liensPlans()
    }),

    BE.ecran({
      id: "les-pieges", dossier: "methode", kicker: "La méthode, 8", title: "Les pièges", level: "comprendre",
      text: "Cinq erreurs reviennent quand on dessine une coupe. Chacune se repère sur la feuille du stagiaire et se corrige par une règle de cette station.",
      prompt: "Lisez le tableau, puis continuez.",
      render: () => tableau(["Erreur", "Ce que l’on voit", "Comment l’éviter"], [
        ["Vide hachuré", "le trou est rempli de hachures comme la matière", "hachurer la matière que le plan a tranchée, jamais le vide"],
        ["Hachures oubliées", "le contour est fermé et l’intérieur reste blanc", "hachurer chaque zone de matière coupée"],
        ["Flèches dans le mauvais sens", "la coupe est la symétrique de celle que l’on attend", "partir du sens des flèches et vérifier la place du talon ou du trou"],
        ["Trait caché dans une coupe", "des traits interrompus traversent la coupe", "les retirer : l’intérieur est ouvert"],
        ["Lettres absentes", "la trace n’est pas nommée et la coupe n’a pas de titre", "mettre une lettre à chaque bout de la trace et reprendre les lettres dans le titre, par exemple A-A"]
      ], "Les cinq erreurs les plus fréquentes")
        + BE.alerte("<strong>Piège.</strong> Le plan d’un étage est une coupe horizontale : il ne se lit pas comme une vue de dessus (gare 4).")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

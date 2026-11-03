/* Station BE-A2 : Les débits du projet.
   Méthode sur un petit logement d'exemple de plain-pied, puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE), les données de la commande et les bornes des fourchettes (bloc FOURCHETTES)
   sont écrites par outils/stations/a2-debits-projet/construire.mjs, depuis exemple-data.mjs et
   corriges/a2-debits-projet/reference-debits.json (outils/a2-debits-maison.mjs).
   Les schémas de illustrations/ sont tracés par le même outil (schema.mjs), avec les symboles du fonds.
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes et les données de la commande le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "art3": [
  [
   "1",
   "75",
   "15",
   "15",
   "15"
  ],
  [
   "2",
   "90",
   "15",
   "15",
   "15"
  ],
  [
   "3",
   "105",
   "30",
   "15",
   "15"
  ],
  [
   "4",
   "120",
   "30",
   "15",
   "30"
  ],
  [
   "5 et plus",
   "135",
   "30",
   "15",
   "30"
  ]
 ],
 "art4": [
  [
   "1",
   "35",
   "20"
  ],
  [
   "2",
   "60",
   "30"
  ],
  [
   "3",
   "75",
   "45"
  ],
  [
   "4",
   "90",
   "45"
  ],
  [
   "5",
   "105",
   "45"
  ],
  [
   "6",
   "120",
   "45"
  ],
  [
   "7",
   "135",
   "45"
  ]
 ],
 "pp": "3",
 "H": "2,50",
 "pieces": [
  {
   "id": "SEJ",
   "nom": "Séjour",
   "S": "26,88",
   "V": "67,2",
   "role": "principale"
  },
  {
   "id": "CUI",
   "nom": "Cuisine",
   "S": "8,32",
   "V": "20,8",
   "role": "service"
  },
  {
   "id": "WC",
   "nom": "WC",
   "S": "1,92",
   "V": "4,8",
   "role": "service"
  },
  {
   "id": "DEG",
   "nom": "Dégagement",
   "S": "12,80",
   "V": "32,0",
   "role": "circulation"
  },
  {
   "id": "CH1",
   "nom": "Chambre 1",
   "S": "12,00",
   "V": "30,0",
   "role": "principale"
  },
  {
   "id": "CH2",
   "nom": "Chambre 2",
   "S": "10,80",
   "V": "27,0",
   "role": "principale"
  },
  {
   "id": "SDB",
   "nom": "Salle de bains",
   "S": "6,00",
   "V": "15,0",
   "role": "service"
  }
 ],
 "V": "196,8",
 "VP": "124,2",
 "service": [
  {
   "nom": "Cuisine",
   "pointe": "105",
   "base": "45"
  },
  {
   "nom": "WC",
   "pointe": "15",
   "base": "15"
  },
  {
   "nom": "Salle de bains",
   "pointe": "30",
   "base": "15"
  }
 ],
 "pointe": "150",
 "base": "75",
 "minTot": "75",
 "minCui": "45",
 "principales": [
  {
   "nom": "Séjour",
   "V": "67,2",
   "base": "40,6",
   "pointe": "81,2"
  },
  {
   "nom": "Chambre 1",
   "V": "30,0",
   "base": "18,1",
   "pointe": "36,2"
  },
  {
   "nom": "Chambre 2",
   "V": "27,0",
   "base": "16,3",
   "pointe": "32,6"
  }
 ],
 "n": {
  "base": "0,38",
  "pointe": "0,76",
  "piece": "0,60"
 },
 "ex1": {
  "pp": "2",
  "quiz": {
   "choices": [
    "150 m³/h",
    "120 m³/h",
    "90 m³/h",
    "60 m³/h"
   ],
   "good": 1,
   "explain": "Un T2 a deux pièces principales, le séjour et la chambre. Ligne « 2 » de l’article 3 : cuisine 90, salle de bains 15, WC 15, soit 120 m³/h. A compte la cuisine comme une pièce principale (ligne 3), C ne garde que la cuisine, D prend le minimum de l’article 4."
  }
 },
 "ex2": {
  "base": "60",
  "vs": "50",
  "vc": "30",
  "vl": "110",
  "quiz": {
   "choices": [
    "30,0 m³/h",
    "22,5 m³/h",
    "45,0 m³/h",
    "16,4 m³/h"
   ],
   "good": 1,
   "explain": "Somme des volumes des pièces principales : 50 + 30 = 80 m³. Entrée d’air de la chambre : 60 × 30 ÷ 80 = 22,5 m³/h. A partage en deux parts égales, C part du débit de pointe, D divise par le volume de tout le logement."
  }
 },
 "ex3": {
  "base": "60",
  "vl": "110",
  "quiz": {
   "choices": [
    "1,09 vol/h",
    "0,55 vol/h",
    "1,83 vol/h",
    "0,75 vol/h"
   ],
   "good": 1,
   "explain": "n = qv ÷ V = 60 ÷ 110 = 0,55 vol/h. A prend le débit de pointe, C divise le volume par le débit, D ne garde que le volume des pièces principales."
  }
 },
 "maison": {
  "base": {
   "CUI": 45,
   "SDE": 30,
   "WC": 15
  },
  "pp": 4
 },
 "img": {
  "logement": "illustrations/schema-logement.svg",
  "double": "illustrations/schema-logement-double-flux.svg",
  "maison": "illustrations/schema-maison.svg"
 }
};
/*EXEMPLE-FIN*/

const M = EX.maison;
/* Un schéma s'ouvre en grand d'un toucher (au téléphone, le doigt l'agrandit ensuite). */
const figure = (src, alt, legende) => `<figure class="schema"><a href="${BE.esc(src)}" target="_blank" rel="noopener"><img src="${BE.esc(src)}" alt="${BE.esc(alt)}"></a><figcaption>${BE.esc(legende.replace(/\.?$/, "."))} Touchez le schéma pour l’ouvrir en grand.</figcaption></figure>`;
const LEGENDE = "Flèches orange : le chemin de l’air. Trait bleu au-dessus d’une flèche : une porte, l’air passe dessous (détalonnage). Tirets bleus : les gaines jusqu’au caisson.";
/* Schémas des notions (outils/stations/a2-debits-projet/schema.mjs, valeurs lues dans le bloc EXEMPLE ci-dessus). */
const figurePieces = () => figure("illustrations/schema-pieces-principales.svg", `Schéma des pièces du logement d’exemple rangées en trois colonnes. Première colonne, les pièces principales, que l’on compte : séjour, chambre 1 et chambre 2. Deuxième colonne, les pièces de service, une bouche d’extraction chacune : cuisine, WC et salle de bains. Troisième colonne, la circulation, où l’air passe : le dégagement. Une flèche orange part des pièces principales vers la phrase « On compte ${EX.pp} pièces principales : on lit la ligne ${EX.pp} du tableau », suivie de « Même ouverte sur le séjour, la cuisine est une pièce de service ».`, "Les pièces du logement d’exemple : on compte les pièces principales, la cuisine n’en fait jamais partie");
const figureBasePointe = () => figure("illustrations/schema-base-pointe.svg", `Schéma en barres du débit de base, en bleu, et du débit de pointe, en orange, de chaque bouche du logement d’exemple, en m³/h. Cuisine : base ${EX.service[0].base}, pointe ${EX.service[0].pointe}. WC : base ${EX.service[1].base}, pointe ${EX.service[1].pointe}. Salle de bains : base ${EX.service[2].base}, pointe ${EX.service[2].pointe}. Total : base ${EX.base}, pointe ${EX.pointe}. Un trait en tirets marque le minimum de la cuisine, ${EX.minCui}, et le minimum du total, ${EX.minTot} : les barres de base les atteignent sans descendre dessous.`, "Le débit de base est plus bas que le débit de pointe, mais il ne descend pas sous les deux minimums de l’article 4");
const figureEquilibre = () => figure("illustrations/schema-equilibre.svg", `Schéma de l’équilibre du logement d’exemple en débit de base, en m³/h. À gauche, une colonne d’entrées d’air de ${EX.base} au total : ${EX.principales.map(p => `${p.nom.toLowerCase()} ${p.base}`).join(", ")}. À droite, une colonne de bouches d’extraction de même hauteur, ${EX.base} au total : ${EX.service.map(b => `${b.nom.toLowerCase()} ${b.base}`).join(", ")}. Une flèche orange traverse le logement d’une colonne à l’autre, avec la mention « entre = sort ».`, "Ce qui entre par les entrées d’air égale ce qui sort par les bouches : les deux colonnes ont la même hauteur");
const figureTaux = () => figure("illustrations/schema-taux.svg", `Schéma du taux de renouvellement du logement d’exemple en débit de base. Un logement de ${EX.V} m³ reçoit ${EX.base} m³/h d’air neuf, par une flèche orange à gauche, et en extrait ${EX.base} m³/h, par une flèche orange à droite. Dessous, une barre représente le volume du logement : sa partie colorée, ${EX.n.base} de la barre, est l’air remplacé en une heure. Formule écrite sous la barre : n = qv ÷ V = ${EX.base} ÷ ${EX.V} = ${EX.n.base} vol/h.`, "Chaque heure, une part du volume du logement est remplacée : c’est le taux de renouvellement");
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const tableArt3 = () => tableau(["Pièces principales", "Cuisine", "Salle de bains ou de douches", "Autre salle d’eau", "WC unique"], EX.art3, "Arrêté du 24 mars 1982, article 3 : débits extraits à atteindre, en m³/h");
const tableArt4 = () => tableau(["Pièces principales", "Débit total minimal", "Débit minimal en cuisine"], EX.art4, "Arrêté du 24 mars 1982, article 4 : débits réduits par un dispositif de réglage, en m³/h");
const schemaLogement = () => figure(EX.img.logement, "Schéma de principe du logement d’exemple : entrées d’air du séjour et des deux chambres, flèches vers le dégagement sous les portes, puis vers la cuisine, la salle de bains et le WC, bouches d’extraction reliées par des gaines au caisson d’extraction des combles, rejet en toiture. Débits de base écrits dans chaque pièce.", `Logement d’exemple en simple flux, débits de base. ${LEGENDE}`);
const exemplePointe = () => BE.exemple({ text: `Logement d’exemple : ${EX.pp} pièces principales (séjour et deux chambres), cuisine, salle de bains, WC`, answer: `ligne ${EX.pp} de l’article 3 : ${EX.service.map(b => `${b.nom.toLowerCase()} ${b.pointe}`).join(", ")} ; total ${EX.pointe} m³/h`, why: "On lit une seule ligne, celle du nombre de pièces principales, et une colonne par pièce de service." });
const exempleEquilibre = () => BE.exemple({ text: `Débit de base ${EX.base} m³/h ; volumes des pièces principales : ${EX.principales.map(p => `${p.nom.toLowerCase()} ${p.V}`).join(", ")} m³ (somme ${EX.VP} m³)`, answer: `${EX.principales.map(p => `${p.nom.toLowerCase()} ${EX.base} × ${p.V} ÷ ${EX.VP} = ${p.base}`).join(" ; ")} m³/h`, why: `Contrôle : la somme des entrées d’air retombe sur ${EX.base} m³/h, le total extrait.` });
const exempleTaux = () => BE.exemple({ text: `Logement d’exemple : V = ${EX.V} m³ ; ${EX.base} m³/h en base, ${EX.pointe} m³/h en pointe`, answer: `n = ${EX.base} ÷ ${EX.V} = ${EX.n.base} vol/h en base ; ${EX.pointe} ÷ ${EX.V} = ${EX.n.pointe} vol/h en pointe`, why: "Le volume est celui de tout le logement chauffé, circulations et pièces de service comprises." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Les débits extraits et le système de ventilation sont à la page 4 du CCTP, les volumes dans vos résultats de la station T1. Les débits de base de chaque bouche sont dans la commande ci-dessus.",
      "Exercice 1 : la ligne de l’article 3 du nombre de pièces principales de la maison (écran « Les débits extraits : lire l’arrêté »). Exercice 2 : débit total de base × V de la pièce ÷ somme des V des pièces principales (écran « L’équilibre : ce qui entre égale ce qui sort »). Exercice 3 : n = qv ÷ V (écran « Le taux de renouvellement »).",
      `Sur le logement d’exemple, la chambre 1 de ${EX.principales[1].V} m³ reçoit ${EX.base} × ${EX.principales[1].V} ÷ ${EX.VP} = ${EX.principales[1].base} m³/h. Faites le même calcul pour chaque pièce principale de la maison : le séjour-cuisine compte comme une pièce principale.`
    ],
    2: [
      "Le CCTP donne, page 4, le nombre de pièces principales, le système et les débits ; la station T1 donne les volumes ; la commande donne les débits de base et la variante double flux.",
      "Quatre gestes déjà vus : lire l’arrêté, partager l’air neuf au prorata du volume, faire l’équilibre (au total puis niveau par niveau), dresser le tableau des bouches. Chaque débit écrit dans la note cite sa source.",
      "À l’étage, seule la salle d’eau extrait de l’air : comparez ce qui entre par les trois chambres à ce qu’elle extrait. Le reste passe au rez-de-chaussée par l’escalier ouvert."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensCctp = () => BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Ventilation, pièces principales et débits à la page 4" }]);
const schemaMaison = () => figure(EX.img.maison, "Schéma de principe de la maison : à l’étage, entrées d’air EA2 à EA4 des trois chambres, passage sous les portes vers le palier, bouche BE2 de la salle d’eau ; l’air descend l’escalier ; au rez-de-chaussée, entrée d’air EA1 du séjour-cuisine, bouche BE1 du coin cuisine, passage par l’entrée vers la bouche BE3 du WC ; gaines vers le caisson d’extraction des combles et rejet en toiture.", `Maison d’étude : trajet de l’air en simple flux, sens de l’air en débit de base. ${LEGENDE}`);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + schemaMaison() + liensCctp(); };

BE.station({
  code: "BE-A2",
  titre: "Les débits du projet",
  ligne: "Aéraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison : débits des pièces de service, entrées d’air, taux de renouvellement, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison : base et pointe, variante double flux, tableau des bouches, note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Avant de tracer les gaines, le bureau d’études fixe le débit d’air de chaque pièce : ce que chaque bouche extrait, ce que chaque entrée d’air laisse entrer, et le chemin que prend l’air entre les deux. Vous apprenez à lire le texte qui fixe ces débits et à équilibrer un logement sur un logement d’exemple, puis vous le faites sur la maison.",
  note: "Les débits extraits viennent de l’arrêté du 24 mars 1982 relatif à l’aération des logements, modifié, articles 3 et 4, cités à la page 4 du CCTP de la maison. Le partage des débits de base entre les bouches, le logement d’exemple et ses volumes sont des valeurs d’exercice ; sur un vrai projet, les débits d’une VMC hygroréglable viennent de l’avis technique du système.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un logement d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, CCTP et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Les débits de la VMC de la maison : pièces de service, entrées d’air, taux de renouvellement",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études prépare le réseau de gaines de la VMC de la maison (station A3). Il lui faut d’abord le débit de chaque bouche. Données de l’exercice : en débit de base, la cuisine extrait ${M.base.CUI} m³/h, la salle d’eau ${M.base.SDE} m³/h et le WC ${M.base.WC} m³/h. Suivez les étapes dans l’ordre.`,
        "Étape 1. À la page 4 du CCTP, relevez le nombre de pièces principales et le débit de pointe de chaque pièce de service (article 3). Écrivez aussi les débits de base de la commande, puis les deux totaux.",
        "Étape 2. L’air neuf entre par les pièces principales. Avec les volumes de la station T1, partagez le débit total de base entre elles au prorata de leur volume. Vérifiez que la somme des entrées d’air égale le total extrait.",
        "Étape 3. Calculez le taux de renouvellement de la maison en base et en pointe, avec son volume chauffé (station T1). Vérifiez le débit de pointe, l’entrée d’air du séjour-cuisine et le taux de base à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : pièces principales, système, débits extraits et débits réduits" },
        { piece: "Vos résultats de la station T1", ou: "Volume de chaque pièce et volume chauffé de la maison" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso ; le schéma de la maison est au verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Les débits de la VMC de la maison : base et pointe, variante double flux, tableau des bouches, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études prépare le réseau de gaines de la VMC de la maison (station A3). Données : page 4 du CCTP (pièces principales, système, débits) et volumes de la station T1. Données de l’exercice : débits de base de la cuisine ${M.base.CUI} m³/h, de la salle d’eau ${M.base.SDE} m³/h et du WC ${M.base.WC} m³/h. Donnez les débits de base et de pointe de chaque bouche d’extraction, avec la ligne du texte, et vérifiez les débits de base avec l’article 4. Le maître d’ouvrage étudie une variante en double flux : donnez le débit soufflé dans la chambre 1 en base, justifiez votre partage, et dites ce qui change par rapport au simple flux. Dressez le tableau des bouches de la maison en simple flux, avec les repères du schéma, et faites l’équilibre de l’étage : quel débit d’air descend l’escalier en base ? Calculez le taux de renouvellement de la maison en pointe. Rédigez la première page de la note de calcul.`,
      pieces: [
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4" },
        { piece: "Vos résultats de la station T1", ou: "Volumes des pièces et de la maison" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },
  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-pointe", libelle: "Débit total extrait de pointe de la maison, en m³/h", unite: "m³/h", min: 174, max: 186, indice: "Relisez l’écran « Les débits extraits : lire l’arrêté » : comptez les pièces principales (page 4 du CCTP), prenez cette ligne de l’article 3 et additionnez la cuisine, la salle d’eau et le WC." },
      { id: "n1-sejour", libelle: "Entrée d’air du séjour-cuisine, débit de base, en m³/h", unite: "m³/h", min: 46.8, max: 49.8, indice: "Relisez l’écran « L’équilibre : ce qui entre égale ce qui sort » : le débit de base se partage entre les pièces principales au prorata de leur volume, débit total × volume de la pièce ÷ somme des volumes des pièces principales." },
      { id: "n1-taux", libelle: "Taux de renouvellement de la maison, débit de base, en vol/h", unite: "vol/h", min: 0.34, max: 0.37, indice: "Relisez l’écran « Le taux de renouvellement » : n = qv ÷ V, avec le débit total en m³/h et le volume chauffé de toute la maison (station T1), en m³." }
    ],
    2: [
      { id: "n2-ch1", libelle: "Double flux : soufflage de la chambre 1, débit de base, en m³/h", unite: "m³/h", min: 14.8, max: 15.8, indice: "Relisez les écrans « L’équilibre : ce qui entre égale ce qui sort » et « Simple flux, double flux » : en double flux, la bouche de soufflage d’une pièce principale reçoit la même part que son entrée d’air, au prorata du volume, sur le débit de base." },
      { id: "n2-taux", libelle: "Taux de renouvellement de la maison, débit de pointe, en vol/h", unite: "vol/h", min: 0.69, max: 0.74, indice: "Relisez l’écran « Le taux de renouvellement » : n = qv ÷ V, avec le débit total en m³/h et le volume chauffé de toute la maison (station T1), en m³." },
      { id: "n2-escalier", libelle: "Air qui descend l’escalier, débit de base, en m³/h", unite: "m³/h", min: 11.3, max: 12.1, indice: "Relisez l’écran « Le tableau des bouches » : à l’étage, l’air qui entre par les chambres et n’est pas extrait par la salle d’eau descend l’escalier ; vérifiez-le au rez-de-chaussée." }
    ]
  },
  /*FOURCHETTES-FIN*/
  suivante: { code: "BE-A3", titre: "Le réseau de gaines", href: "../a3-reseau-gaines/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Le besoin d’air", href: "../../../aerorezo/stations/besoin-air/index.html", pourquoi: "Elle dit pourquoi un logement doit renouveler son air : à faire avant si la notion est nouvelle." },
    { reseau: "AéroRézo", titre: "Simple flux", href: "../../../aerorezo/stations/simple-flux/index.html", pourquoi: "Le principe du balayage, des entrées d’air aux bouches d’extraction." },
    { reseau: "AéroRézo", titre: "Double flux", href: "../../../aerorezo/stations/double-flux/index.html", pourquoi: "Le caisson à deux ventilateurs et son échangeur." },
    { reseau: "AéroRézo", titre: "L’hygroréglable", href: "../../../aerorezo/stations/hygroreglable/index.html", pourquoi: "Pourquoi le débit varie entre la base et la pointe." },
    { reseau: "Bureau d’études", titre: "BE-T4, Déperditions par l’air", href: "../t4-deperditions-air/index.html", pourquoi: "Le débit d’air neuf de chaque pièce principale y sert au calcul des déperditions : vos entrées d’air de base doivent retomber sur les mêmes valeurs." }
  ],
  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Une VMC, ventilation mécanique contrôlée, extrait l’air vicié dans les pièces de service, la cuisine, la salle d’eau et le WC. L’air neuf entre par les pièces principales, le séjour et les chambres. Le bureau d’études fixe le débit de chaque bouche, en base et en pointe, vérifie que l’air qui entre égale l’air qui sort, et suit le chemin de l’air d’une pièce à l’autre. Ces débits servent ensuite à tracer et à calculer le réseau de gaines (station A3). Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Bouche", "Local", "Débit de base (m³/h)", "Débit de pointe (m³/h)"], [
        ["Entrées d’air", "Séjour et chambres", "", ""],
        ["Bouches d’extraction", "Cuisine, salle d’eau, WC", "", ""],
        ["Total", "Toute la maison", "", ""]
      ], "Les débits de la maison, vides")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "les débits de la VMC de la maison."], ["Le dossier :", "le CCTP, vos volumes de la station T1, des données de l’exercice."]] },
          { title: "Vous produisez", rows: [["Les débits :", "de chaque bouche et de chaque entrée d’air."], ["Les contrôles :", "l’équilibre et le taux de renouvellement. Vérification à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station A3, le réseau de gaines."]] }
        ])
    }),
    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les débits d’air d’un logement sont fixés par un texte : l’arrêté du 24 mars 1982 relatif à l’aération des logements. Le CCTP de la maison, son cahier des clauses techniques particulières, le cite à la page 4, avec le système retenu, une VMC simple flux hygroréglable, et le nombre de pièces principales. Les volumes des pièces viennent de vos résultats de la station T1. Le partage du débit de base entre les bouches est une donnée de l’exercice : sur un vrai projet, il vient de l’avis technique du système choisi. La station T4 a déjà retenu le débit d’air neuf de la maison ; vous allez le retrouver.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Nombre de pièces principales, système de ventilation", "Page 4 du CCTP"],
        ["Débits de pointe de chaque pièce de service", "Page 4 du CCTP, arrêté du 24 mars 1982, article 3"],
        ["Débit total minimal et minimum de la cuisine", "Page 4 du CCTP, arrêté du 24 mars 1982, article 4"],
        ["Débits de base de chaque bouche", "La commande, données de l’exercice"],
        ["Volume de chaque pièce et volume chauffé", "Vos résultats de la station T1"]
      ], "Les données des débits de la maison")
        + BE.renvoi('Le débit d’air neuf de chaque pièce principale a servi aux déperditions à <a href="../t4-deperditions-air/index.html">la station T4</a>.')
    }),
    BE.ecran({
      id: "trajet-de-l-air", dossier: "methode", kicker: "La méthode, 1", title: "Le trajet de l’air dans un logement", level: "comprendre",
      text: "En ventilation simple flux, un seul ventilateur, le caisson d’extraction, aspire l’air dans les pièces de service par des bouches d’extraction et le rejette dehors. Le logement se met très légèrement en dépression, et l’air neuf entre par les entrées d’air posées dans les pièces principales, en général au-dessus des fenêtres. Il traverse le logement : il passe sous les portes, que l’on a détalonnées, c’est-à-dire raccourcies en bas, vers les circulations, puis vers les pièces de service. On appelle ce passage d’air le balayage : l’air va des pièces les moins polluées vers les plus humides. Le schéma suit ce chemin sur le logement d’exemple, avec le débit de base de chaque pièce.",
      prompt: "Suivez les flèches sur le schéma, de l’entrée d’air au rejet, puis continuez.",
      render: () => schemaLogement()
        + tableau(["Élément", "Où il est", "Ce qu’il fait"], [
          ["Entrée d’air", "Pièces principales, en façade", "Laisse entrer l’air neuf"],
          ["Détalonnage", "Bas des portes intérieures", "Laisse passer l’air d’une pièce à l’autre"],
          ["Bouche d’extraction", "Pièces de service", "Aspire l’air vicié et humide"],
          ["Caisson d’extraction", "Combles", "Le ventilateur qui met le logement en dépression"],
          ["Rejet", "Toiture", "Sort l’air vicié dehors"]
        ], "Les éléments d’une VMC simple flux")
        + BE.renvoi('Le principe du balayage est expliqué dans AéroRézo, <a href="../../../aerorezo/stations/simple-flux/index.html">« Simple flux »</a>.')
    }),
    BE.ecran({
      id: "debits-extraits", dossier: "methode", kicker: "La méthode, 2", title: "Les débits extraits : lire l’arrêté", level: "comprendre",
      text: "L’article 3 de l’arrêté donne, pour chaque pièce de service, le débit que sa bouche doit pouvoir atteindre. Il dépend du nombre de pièces principales du logement : comptez d’abord le séjour et les chambres. La cuisine, la salle de bains ou la salle d’eau et le WC sont des pièces de service, même quand la cuisine est ouverte sur le séjour. Prenez la ligne de ce nombre et lisez une valeur par pièce de service, puis additionnez. Ces débits peuvent être atteints ensemble ou non : ce sont les débits de pointe, ceux qui servent à choisir les bouches et le caisson. L’exemple porte sur le logement d’exemple. Ce geste sert à l’exercice 1 de la feuille du niveau 1.",
      prompt: "Lisez la ligne du logement d’exemple dans le tableau, puis continuez.",
      render: () => figurePieces() + tableArt3() + exemplePointe()
        + BE.renvoi("Le texte complet est sur Légifrance : arrêté du 24 mars 1982 relatif à l’aération des logements, modifié par l’arrêté du 28 octobre 1983. Le CCTP de la maison en cite la ligne qui la concerne, page 4.")
    }),
    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, lire l’arrêté", title: "Exercice : les débits d’un T2", level: "appliquer", requiresAction: true,
      text: {
        1: `Un T2 a un séjour, une chambre, une cuisine, une salle de bains et un WC. Quel est son débit total extrait de pointe ? L’exemple résolu reste sous vos yeux : refaites la même lecture.`,
        2: `Un T2 a un séjour, une chambre, une cuisine, une salle de bains et un WC. Quel est son débit total extrait de pointe ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez le débit, en vous aidant de l’exemple.", 2: "Choisissez le débit. Cette question est à faire seul." },
      aides: {
        1: ["Le tableau est à l’écran « Les débits extraits : lire l’arrêté ».", "Comptez les pièces principales : le séjour et la chambre. Puis lisez cette ligne, une colonne par pièce de service.", `Sur l’exemple, ${EX.pp} pièces principales donnent ${EX.pointe} m³/h. Votre logement en a une de moins.`],
        2: ["Le tableau est à l’écran « Les débits extraits : lire l’arrêté ».", "La cuisine n’est pas une pièce principale.", "Additionnez la cuisine, la salle de bains et le WC de la bonne ligne."]
      },
      ...BE.parNiveau({
        1: avecBloc(tableArt3() + exemplePointe(), EX.ex1.quiz),
        2: avecBloc(tableArt3(), EX.ex1.quiz)
      })
    }),
    BE.ecran({
      id: "base-et-pointe", dossier: "methode", kicker: "La méthode, 3", title: "Débit de base et débit de pointe", level: "comprendre",
      text: "Une VMC hygroréglable fait varier ses débits avec l’humidité de l’air : elle extrait peu quand le logement est vide ou sec, plus quand on cuisine ou qu’on prend une douche. L’article 4 de l’arrêté autorise des débits plus bas que ceux de l’article 3, avec deux limites lues sur la ligne du nombre de pièces principales : le débit total extrait ne descend pas sous le débit total minimal, et la cuisine pas sous son débit minimal. Le débit de base est le débit le plus bas de l’installation ; il sert au calcul des déperditions par l’air (station T4). Le débit de pointe est celui de l’article 3 ; il sert au choix des bouches, des gaines et du caisson. Le partage du débit de base entre les bouches se lit dans l’avis technique du système ; dans cette station, la commande le donne. Ce geste sert à l’exercice 1 de la feuille du niveau 2.",
      prompt: "Lisez le tableau et l’exemple résolu, puis continuez.",
      render: () => figureBasePointe() + tableArt4()
        + tableau(["Bouche", "Pointe, art. 3 (m³/h)", "Base, commande (m³/h)"], [...EX.service.map(b => [b.nom, b.pointe, b.base]), ["Total", EX.pointe, EX.base]], "Logement d’exemple : base et pointe")
        + BE.exemple({ text: `Logement d’exemple, ${EX.pp} pièces principales, débits de base de la commande`, answer: `total de base ${EX.base} m³/h ≥ ${EX.minTot} m³/h et cuisine ${EX.service[0].base} m³/h ≥ ${EX.minCui} m³/h : l’article 4 est respecté`, why: "On contrôle le total et la cuisine, sur la ligne du nombre de pièces principales." })
        + BE.renvoi('Le fonctionnement de l’hygroréglable est expliqué dans AéroRézo, <a href="../../../aerorezo/stations/hygroreglable/index.html">« L’hygroréglable »</a>.')
    }),
    BE.ecran({
      id: "equilibre", dossier: "methode", kicker: "La méthode, 4", title: "L’équilibre : ce qui entre égale ce qui sort", level: "comprendre",
      text: "L’air ne s’accumule pas dans un logement : ce qui entre égale ce qui sort. La somme des débits des entrées d’air égale donc la somme des débits extraits. Reste à partager l’air neuf entre les pièces principales. Dans cette station, comme à la station T4, on le partage au prorata du volume : entrée d’air d’une pièce = débit total × volume de la pièce ÷ somme des volumes des pièces principales. Chaque pièce principale reçoit alors le même renouvellement d’air, en volumes par heure. Les pièces de service et les circulations ne reçoivent pas d’air neuf : elles reçoivent l’air de transfert venu des pièces principales. Gardez deux décimales ; la somme des entrées d’air arrondies peut s’écarter du total d’un centième : cet écart vient des arrondis, l’équilibre est juste. Ce geste sert à l’exercice 2 de la feuille du niveau 1.",
      prompt: "Lisez le partage du logement d’exemple, puis continuez.",
      render: () => figureEquilibre() + tableau(["Pièce principale", "V (m³)", "Calcul", "Entrée d’air, base (m³/h)"], [...EX.principales.map(p => [p.nom, p.V, `${EX.base} × ${p.V} ÷ ${EX.VP}`, p.base]), ["Somme", EX.VP, "", EX.base]], "Logement d’exemple : partage du débit de base")
        + exempleEquilibre()
    }),
    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, l’équilibre", title: "Exercice : l’entrée d’air d’une chambre", level: "appliquer", requiresAction: true,
      text: {
        1: `Le T2 de l’exercice précédent extrait ${EX.ex2.base} m³/h en base. Son séjour fait ${EX.ex2.vs} m³, sa chambre ${EX.ex2.vc} m³, tout le logement ${EX.ex2.vl} m³. Quel débit entre par l’entrée d’air de la chambre ? L’exemple résolu reste sous vos yeux.`,
        2: `Le T2 de l’exercice précédent extrait ${EX.ex2.base} m³/h en base. Son séjour fait ${EX.ex2.vs} m³, sa chambre ${EX.ex2.vc} m³, tout le logement ${EX.ex2.vl} m³. Quel débit entre par l’entrée d’air de la chambre ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez le débit, en vous aidant de l’exemple.", 2: "Choisissez le débit. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « L’équilibre : ce qui entre égale ce qui sort ».", "Seules les pièces principales reçoivent l’air neuf : additionnez leurs volumes, puis prenez la part de la chambre.", `Sur l’exemple, la chambre 1 reçoit ${EX.base} × ${EX.principales[1].V} ÷ ${EX.VP} = ${EX.principales[1].base} m³/h.`],
        2: ["La méthode est à l’écran « L’équilibre : ce qui entre égale ce qui sort ».", "Le volume de tout le logement ne sert pas ici.", "Débit total de base × V de la chambre ÷ somme des V des pièces principales."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleEquilibre(), EX.ex2.quiz),
        2: BE.quiz(EX.ex2.quiz)
      })
    }),
    BE.ecran({
      id: "taux-de-renouvellement", dossier: "methode", kicker: "La méthode, 5", title: "Le taux de renouvellement", level: "comprendre",
      text: "Le taux de renouvellement n dit combien de fois par heure l’air du logement est remplacé : n = qv ÷ V, en volumes par heure (vol/h), avec le débit total en m³/h et le volume chauffé en m³. Il sert de contrôle de vraisemblance, comme le ratio en W/m² des déperditions. Dans un local, on parle aussi du taux de brassage : le débit soufflé dans le local divisé par son volume ; avec le partage au prorata du volume, il est le même dans chaque pièce principale. Dans un bâtiment tertiaire traité par une centrale de traitement d’air, le brassage dépasse souvent le renouvellement, parce qu’une partie de l’air est recyclée ; ce cas est traité en partie dédiée. Ce geste sert à l’exercice 3 de la feuille du niveau 1.",
      prompt: "Lisez l’exemple résolu, puis continuez.",
      render: () => figureTaux() + tableau(["Formule", "Unités"], [["n = qv ÷ V", "vol/h = m³/h ÷ m³"], ["Brassage d’une pièce = débit soufflé ÷ V de la pièce", "vol/h"]], "Renouvellement et brassage")
        + exempleTaux()
        + BE.exemple({ text: `Brassage d’une pièce principale du logement d’exemple, en base`, answer: `${EX.base} ÷ ${EX.VP} = ${EX.n.piece} vol/h dans chacune des trois pièces`, why: "Le partage au prorata du volume donne le même brassage partout : c’est ce qui le justifie." })
    }),
    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, le taux", title: "Exercice : le taux d’un T2", level: "appliquer", requiresAction: true,
      text: {
        1: `Le même T2 fait ${EX.ex3.vl} m³ et extrait ${EX.ex3.base} m³/h en base. Quel est son taux de renouvellement de base ? L’exemple résolu reste sous vos yeux.`,
        2: `Le même T2 fait ${EX.ex3.vl} m³ et extrait ${EX.ex3.base} m³/h en base. Quel est son taux de renouvellement de base ? Sans l’exemple.`
      },
      prompt: { 1: "Choisissez le taux, en vous aidant de l’exemple.", 2: "Choisissez le taux. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Le taux de renouvellement ».", "n = qv ÷ V, le débit en m³/h divisé par le volume de tout le logement en m³.", `Sur l’exemple : ${EX.base} ÷ ${EX.V} = ${EX.n.base} vol/h.`],
        2: ["La méthode est à l’écran « Le taux de renouvellement ».", "Divisez le débit par le volume.", "Prenez le volume de tout le logement."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleTaux(), EX.ex3.quiz),
        2: BE.quiz(EX.ex3.quiz)
      })
    }),
    BE.ecran({
      id: "simple-et-double-flux", dossier: "methode", kicker: "La méthode, 6", title: "Simple flux, double flux", level: "comprendre",
      text: "En double flux, le caisson a deux ventilateurs : l’un extrait l’air des pièces de service, l’autre souffle de l’air neuf dans les pièces principales par des bouches de soufflage, qui remplacent les entrées d’air. Les deux flux se croisent dans un échangeur, qui réchauffe l’air neuf avec l’air extrait ; la station T4 en a chiffré le gain. Les débits extraits ne changent pas : le texte les fixe pour les pièces de service. Le caisson souffle autant qu’il extrait, et chaque bouche de soufflage reçoit la part qu’avait son entrée d’air, au prorata du volume. Il faut deux réseaux de gaines au lieu d’un. Ce geste sert à l’exercice 2 de la feuille du niveau 2.",
      prompt: "Comparez ce schéma à celui de l’écran « Le trajet de l’air dans un logement », puis continuez.",
      render: () => figure(EX.img.double, "Schéma de principe du logement d’exemple en double flux : caisson double flux dans les combles avec prise d’air neuf et rejet, gaine de soufflage vers les bouches de soufflage du séjour et des deux chambres, passage sous les portes vers le dégagement puis vers les pièces de service, gaine d’extraction vers le caisson. Débits de base écrits dans chaque pièce.", `Logement d’exemple en double flux, débits de base. À gauche, la gaine de soufflage ; à droite, la gaine d’extraction. ${LEGENDE}`)
        + tableau(["", "Simple flux", "Double flux"], [
          ["Pièces principales", "Entrées d’air", "Bouches de soufflage"],
          ["Pièces de service", "Bouches d’extraction", "Bouches d’extraction, mêmes débits"],
          ["Caisson", "Un ventilateur", "Deux ventilateurs et un échangeur"],
          ["Gaines", "Un réseau", "Deux réseaux"],
          ["Équilibre", "Entrées d’air = extraction", "Soufflage = extraction"]
        ], "Ce qui change entre simple et double flux")
        + BE.renvoi('Le caisson double flux est expliqué dans AéroRézo, <a href="../../../aerorezo/stations/double-flux/index.html">« Double flux »</a>.')
    }),
    BE.ecran({
      id: "tableau-des-bouches", dossier: "methode", kicker: "La méthode, 7", title: "Le tableau des bouches", level: "comprendre",
      text: "Le tableau des bouches rassemble tous les débits du projet, une ligne par bouche ou par entrée d’air : son repère, celui du schéma, le local, le niveau, le type, le débit de base et le débit de pointe. Il est la donnée d’entrée du réseau de gaines. Dans un logement sur deux niveaux, faites aussi l’équilibre niveau par niveau : à un étage, l’air qui entre et n’y est pas extrait passe à l’autre niveau par l’escalier ouvert ; l’autre niveau doit le retrouver. Calculez ce débit avec les entrées d’air non arrondies ; un écart d’un centième vient des arrondis. Le logement d’exemple est de plain-pied : tout passe par le dégagement. Ce geste sert à l’exercice 3 de la feuille du niveau 2.",
      prompt: "Lisez le tableau du logement d’exemple, puis continuez.",
      render: () => tableau(["Repère", "Local", "Type", "Base (m³/h)", "Pointe (m³/h)"], [
        ...EX.principales.map((p, i) => [`EA${i + 1}`, p.nom, "Entrée d’air", p.base, p.pointe]),
        ...EX.service.map((b, i) => [`BE${i + 1}`, b.nom, "Bouche d’extraction", b.base, b.pointe])
      ], "Logement d’exemple : tableau des bouches en simple flux")
        + BE.exemple({ text: "Contrôle du tableau du logement d’exemple", answer: `entrées d’air ${EX.principales.map(p => p.base).join(" + ")} = ${EX.base} m³/h ; extraction ${EX.service.map(b => b.base).join(" + ")} = ${EX.base} m³/h`, why: "Les deux colonnes de base retombent sur le même total : le logement est équilibré." })
    }),
    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 8", title: "La note de calcul", level: "comprendre",
      text: "La note de calcul est le document que le bureau d’études remet avec ses résultats. Sa première page dit en quelques lignes ce qui a été calculé, avec quoi et ce qui en sort : l’objet, les hypothèses et leurs sources, les débits retenus, les contrôles. Chaque valeur cite son origine : le texte et sa ligne, le CCTP et sa page, la station qui a donné les volumes, la commande pour les données de l’exercice. Un lecteur doit pouvoir refaire le calcul sans vous. Ce geste sert à l’exercice 4 de la feuille du niveau 2.",
      prompt: "Lisez la première page de la note du logement d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Contenu"], [
        ["Objet", `Débits de la VMC simple flux hygroréglable du logement d’exemple, ${EX.pp} pièces principales.`],
        ["Hypothèses et sources", `Arrêté du 24 mars 1982, art. 3 et 4, ligne ${EX.pp} ; volumes du relevé, hauteur ${EX.H} m ; débits de base de la commande.`],
        ["Débits retenus", `Extraction ${EX.base} m³/h en base, ${EX.pointe} m³/h en pointe ; entrées d’air au prorata du volume.`],
        ["Contrôles", `Entrées = extractions ; n = ${EX.n.base} vol/h en base, ${EX.n.pointe} en pointe.`]
      ], "Logement d’exemple : première page de la note de calcul")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

/* Station BE-H5 : Équilibrage, schéma.
   Méthode sur le petit bâtiment de bureaux des stations T5 à H4 (bureau, salle de réunion, sanitaires), puis commande sur la maison.
   Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/h5-equilibrage-schema/construire.mjs : le premier vient de exemple-data.mjs, les secondes de
   corriges/h5-equilibrage-schema/reference-equilibrage.json (outils/h5-equilibrage-maison.mjs ; ± 3 % sur un calcul).
   La maison n'apparaît que par les données de la commande (débits repris de H1 et H4, pertes de charge des circuits reprises de H3,
   puissance de la pompe à chaleur reprise de H1, volume d'eau repris de H4) et les bornes des fourchettes. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "te": [
  {
   "pos": "1",
   "kv": "0,05"
  },
  {
   "pos": "2",
   "kv": "0,07"
  },
  {
   "pos": "3",
   "kv": "0,11"
  },
  {
   "pos": "4",
   "kv": "0,17"
  },
  {
   "pos": "5",
   "kv": "0,26"
  },
  {
   "pos": "6",
   "kv": "0,40"
  },
  {
   "pos": "7",
   "kv": "0,54"
  },
  {
   "pos": "8",
   "kv": "0,75"
  },
  {
   "pos": "grand ouvert",
   "kv": "1,20"
  }
 ],
 "lpkw": "20",
 "serie": "25, 30, 40, 50, 60, 80, 100, 150, 200",
 "ex": {
  "dep": "50",
  "ret": "40",
  "max": {
   "nom": "Bureau",
   "dp": "8702"
  },
  "circuits": [
   {
    "id": "BUR",
    "nom": "Bureau",
    "q": "124",
    "dp": "8702",
    "dis": "0",
    "qm3": "",
    "bar": "",
    "rac": "",
    "kv": "",
    "pos": "grand ouvert"
   },
   {
    "id": "REU1",
    "nom": "Réunion 1",
    "q": "75",
    "dp": "5298",
    "dis": "3404",
    "qm3": "0,075",
    "bar": "0,03404",
    "rac": "0,1845",
    "kv": "0,407",
    "pos": "6"
   },
   {
    "id": "REU2",
    "nom": "Réunion 2",
    "q": "75",
    "dp": "6402",
    "dis": "2300",
    "qm3": "0,075",
    "bar": "0,023",
    "rac": "0,1517",
    "kv": "0,494",
    "pos": "7"
   },
   {
    "id": "SAN",
    "nom": "Sanitaires",
    "q": "23",
    "dp": "2409",
    "dis": "6293",
    "qm3": "0,023",
    "bar": "0,06293",
    "rac": "0,2509",
    "kv": "0,092",
    "pos": "3"
   }
  ],
  "reu1": {
   "id": "REU1",
   "nom": "Réunion 1",
   "q": "75",
   "dp": "5298",
   "dis": "3404",
   "qm3": "0,075",
   "bar": "0,03404",
   "rac": "0,1845",
   "kv": "0,407",
   "pos": "6"
  },
  "pac": "3,5",
  "Vmin": "70,00",
  "V": "33,90",
  "manque": "36,10",
  "ballon": "40",
  "pompe": {
   "v": "V1",
   "Q": "0,32",
   "Qd": "0,30"
  },
  "plancher": {
   "dep": "35",
   "ret": "30",
   "prod": "50",
   "part": "25",
   "reste": "75"
  }
 },
 "ent1": {
  "dpMax": "9400",
  "dp": "6900",
  "q": "60",
  "d": "2500",
  "qm3": "0,06",
  "bar": "0,025",
  "rac": "0,1581",
  "kv": "0,380",
  "pos": "6",
  "quiz": {
   "choices": [
    "Kv = 0,228, position 5",
    "Kv = 2,4, grand ouvert",
    "Kv = 0,380, position 6",
    "Kv = 0,196, position 4"
   ],
   "good": 2,
   "explain": "Écart : 9400 − 6900 = 2500 Pa, soit 0,025 bar ; √0,025 = 0,1581 ; Kv = 0,06 ÷ 0,1581 = 0,380 ; le Kv le plus proche dans la table est 0,40 : position 6. Prendre la perte de charge du circuit au lieu de l’écart donne 0,228 ; oublier la racine donne 2,4 ; prendre la perte du circuit le plus défavorisé donne 0,196."
  }
 },
 "ent2": {
  "P": "6,0",
  "V": "75",
  "Vmin": "120",
  "manque": "45",
  "ballon": "50",
  "quiz": {
   "choices": [
    "Il manque 45 L : ballon de 50 L",
    "Ballon de 150 L : il doit contenir les 120 L à lui seul",
    "Ballon de 40 L, le plus proche de 45 L",
    "Aucun ballon : 75 L dépassent 6 × 10 L"
   ],
   "good": 0,
   "explain": "Volume minimal : 6 kW × 20 L = 120 L. L’installation en contient 75 : il manque 120 − 75 = 45 L. On prend le premier ballon de la série qui dépasse 45 L : 50 L. L’eau des tubes et des radiateurs compte déjà, le ballon n’apporte que ce qui manque ; un ballon plus petit que le manque laisse la pompe à chaleur démarrer trop souvent ; la règle est de 20 L par kW, pas 10."
  }
 },
 "ent3": {
  "labels": [
   "Sur le départ",
   "Sur le retour général, avant la pompe à chaleur",
   "Sur la ligne d’un radiateur"
  ],
  "lignes": [
   {
    "text": "Soupape de sécurité",
    "good": 0
   },
   {
    "text": "Ballon tampon",
    "good": 1
   },
   {
    "text": "Té de réglage",
    "good": 2
   },
   {
    "text": "Pompe",
    "good": 0
   },
   {
    "text": "Vase d’expansion",
    "good": 1
   },
   {
    "text": "Robinet de remplissage",
    "good": 1
   }
  ],
  "lignesN2": [
   {
    "text": "Organe A",
    "good": 0
   },
   {
    "text": "Organe G",
    "good": 1
   },
   {
    "text": "Organe F",
    "good": 2
   },
   {
    "text": "Organe C",
    "good": 0
   },
   {
    "text": "Organe H",
    "good": 1
   },
   {
    "text": "Organe J",
    "good": 1
   }
  ],
  "exemple": {
   "text": "Le manomètre, sur le schéma du bâtiment d’exemple",
   "good": 1,
   "why": "Il est sur le retour général, à côté du vase : il lit la pression à la hauteur du vase."
  }
 },
 "maison": {
  "dep": "45",
  "ret": "40",
  "circuits": [
   {
    "n": "4",
    "id": "CH1",
    "nom": "Chambre 1",
    "branche": "Étage",
    "q": "82",
    "dp": "9761"
   },
   {
    "n": "5",
    "id": "CH2",
    "nom": "Chambre 2",
    "branche": "Étage",
    "q": "87",
    "dp": "11750"
   },
   {
    "n": "6",
    "id": "PAL",
    "nom": "Palier",
    "branche": "Étage",
    "q": "50",
    "dp": "7993"
   },
   {
    "n": "7",
    "id": "CH3",
    "nom": "Chambre 3",
    "branche": "Étage",
    "q": "43",
    "dp": "8324"
   },
   {
    "n": "8",
    "id": "SDE",
    "nom": "Salle d'eau",
    "branche": "Étage",
    "q": "37",
    "dp": "8270"
   },
   {
    "n": "9",
    "id": "SEJ1",
    "nom": "Séjour 1",
    "branche": "Rez-de-chaussée",
    "q": "147,5",
    "dp": "8572"
   },
   {
    "n": "10",
    "id": "SEJ2",
    "nom": "Séjour 2",
    "branche": "Rez-de-chaussée",
    "q": "147,5",
    "dp": "7303"
   },
   {
    "n": "11",
    "id": "ENT",
    "nom": "Entrée",
    "branche": "Rez-de-chaussée",
    "q": "76",
    "dp": "5341"
   },
   {
    "n": "12",
    "id": "WC",
    "nom": "WC",
    "branche": "Rez-de-chaussée",
    "q": "11",
    "dp": "3700"
   }
  ],
  "pac": "4,0",
  "V": "53,66",
  "pompe": {
   "v": "V2",
   "Q": "0,74",
   "Qd": "0,68"
  }
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec l'exemple résolu sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const X = () => EX.ex;
const R1 = () => EX.ex.reu1;
const figCircuits = () => BE.schema("illustrations/circuits-exemple.svg", `Quatre barres horizontales, une par circuit du bâtiment d’exemple, longues comme leur perte de charge : ${X().circuits.map(c => `${c.nom.toLowerCase()} ${c.dp} Pa`).join(", ")}. Le ${X().max.nom.toLowerCase()}, le plus long, est le plus défavorisé : son té reste grand ouvert. Chaque autre barre est prolongée jusqu’à la sienne par une partie orange en pointillé, la perte de charge à dissiper : ${X().circuits.filter(c => c.kv).map(c => `${c.nom.toLowerCase()} ${c.dis} Pa`).join(", ")}.`, "En orange : ce que le té de chaque circuit doit dissiper.");
const figTe = () => BE.schema("illustrations/te-reglage.svg", `Le symbole du té de réglage sur un tuyau de retour, puis la table du té de l’exercice : positions 1 à 8 et grand ouvert, Kv ${EX.te.map(t => `${t.pos} : ${t.kv}`).join(" ; ")}. La colonne de la position ${R1().pos} est teintée : pour la réunion 1, Kv = ${R1().kv}, la valeur la plus proche de la table est celle de la position ${R1().pos}.`, "La table du té : on prend le Kv le plus proche.");
const figTeSeul = () => BE.schema("illustrations/te-reglage-table.svg", `La table du té de réglage de l’exercice : positions 1 à 8 et grand ouvert, Kv ${EX.te.map(t => `${t.pos} : ${t.kv}`).join(" ; ")}.`, "Le té de l’exercice.");
const exempleKv = () => BE.exemple({ text: `Bâtiment d’exemple, réunion 1 : ${R1().q} L/h, ${R1().dis} Pa à dissiper`, answer: `Kv = ${R1().qm3} ÷ √${R1().bar} = ${R1().qm3} ÷ ${R1().rac} = ${R1().kv} ; position ${R1().pos}`, why: "Le débit passe en m³/h (÷ 1 000) et la perte de charge en bar (÷ 100 000) avant le calcul." });
const exempleBallon = () => BE.exemple({ text: `Bâtiment d’exemple : pompe à chaleur de ${X().pac} kW, ${X().V} L d’eau (station H4)`, answer: `${X().pac} × ${EX.lpkw} = ${X().Vmin} L au moins ; il manque ${X().Vmin} − ${X().V} = ${X().manque} L ; ballon de ${X().ballon} L`, why: "L’eau des tubes, des radiateurs et de la pompe à chaleur compte déjà : le ballon apporte ce qui manque." });
const figSchemaEx = () => BE.schema("illustrations/schema-exemple.svg", `Schéma de principe du local technique du bâtiment d’exemple. En bas à gauche, la pompe à chaleur air/eau. Le départ, en rouge, monte puis va vers la droite : la soupape sur un piquage vers le haut, une vanne d’isolement, la pompe, puis une vanne avant le collecteur. Du collecteur partent quatre lignes : 2 bureau, 3 réunion 1, 4 réunion 2, 5 sanitaires ; chaque ligne porte un radiateur et, sur son retour, un té de réglage. Un purgeur est posé en haut du collecteur. Le retour, en bleu, quitte le collecteur par une vanne, descend et entre en haut à droite du ballon tampon de ${X().ballon} L, qui porte un purgeur ; il en sort en bas à gauche, passe le vase, le manomètre, le robinet de remplissage sur un piquage vers le bas, une vanne d’isolement, et rentre dans la pompe à chaleur.`, "Le schéma de principe du bâtiment d’exemple.");

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Les débits (station H1) et les pertes de charge des circuits (station H3) sont dans le tableau sous la commande et en gras sur la feuille. La puissance de la pompe à chaleur et le volume d’eau aussi.",
      "Dans l’ordre : le circuit le plus défavorisé et les écarts (écran « La perte de charge à dissiper ») ; le Kv et la position (écrans « Le Kv de réglage » et « La position du té ») ; le ballon (écran « Le ballon tampon ») ; le schéma (écran « Le schéma de principe »).",
      "Cherchez d’abord la plus grande perte de charge des neuf circuits, sur les deux niveaux : son té reste grand ouvert, les autres se règlent sur elle."
    ],
    2: [
      "Les débits viennent de votre feuille de H1 (deux lignes au séjour), les pertes de charge des circuits de H3, la puissance de H1, le volume d’eau de H4 : tous sont rappelés sous la commande.",
      "Tableau d’équilibrage, ballon tampon, schéma de principe à compléter, note de calcul.",
      "Commencez par le circuit le plus défavorisé de toute la maison, puis les huit écarts."
    ]
  }
});
const rendreCommande = ecranProjet.render;
const donneesMaison = () => tableau(["N°", "Circuit", "Niveau", "Débit de la ligne (L/h)", "Perte de charge du circuit (Pa)"], EX.maison.circuits.map(c => [c.n, c.nom, c.branche, c.q, c.dp]), "Les neuf circuits de la maison : débits des stations H1 et H4, pertes de charge de la station H3")
  + BE.schema("../h3-reseau-eau/illustrations/schema-reseau-maison.svg", "Schéma de principe du réseau de la maison, de la station H3 : pompe à chaleur et pompe au garage, tronçon 1, branche du rez-de-chaussée (2) et collecteur sous l’escalier, branche de l’étage (3) et collecteur sur le palier, une ligne par radiateur, numérotées de 4 à 12, avec leur longueur à l’aller.", "Le réseau de la maison (station H3) : numéros des circuits.")
  + BE.renvoi(`Régime ${EX.maison.dep}/${EX.maison.ret}. Pompe à chaleur air/eau au garage, ${EX.maison.pac} kW (stations T5 et H1). Volume d’eau de l’installation : ${EX.maison.V} L (station H4). Pompe retenue en H4 : ${EX.maison.pompe.v}, ${EX.maison.pompe.Q} m³/h pour ${EX.maison.pompe.Qd} m³/h demandés. Données de l’exercice : le té de réglage, ${EX.lpkw} L par kW, la série des ballons.`)
  + BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Pompe à chaleur air/eau au garage, page 4" }, { href: DOSSIER + "plans.html", title: "Les plans de la maison", note: "Garage, escalier, palier" }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + donneesMaison(); };

BE.station({
  code: "BE-H5",
  titre: "Équilibrage, schéma",
  ligne: "Hydraulique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, tableau d’équilibrage, schéma et note de calcul, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "La station H4 a choisi la pompe. Sans réglage, l’eau passe d’abord par les circuits qui la freinent le moins : les radiateurs proches reçoivent trop, les plus loin pas assez. Vous calculez le réglage du té de chaque radiateur, vous vérifiez que la pompe à chaleur a assez d’eau et vous posez un ballon tampon s’il en manque, puis vous tracez le schéma de principe de la chaufferie. Vous apprenez la méthode sur le petit bâtiment de bureaux des stations T5 à H4, puis vous la faites sur la maison.",
  note: "Le té de réglage, la règle de 20 L d’eau par kW et la série des ballons sont des données de l’exercice, écrites pour cette station. La formule du Kv vient de la station HydroMétro « Régler une vanne d’équilibrage », le rôle du ballon tampon d’une fiche du fonds du professeur.",

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
      objet: "Équilibrage des neuf circuits, ballon tampon et lecture du schéma de principe de la chaufferie de la maison",
      delai: "Rendu en fin de séance",
      commande: [
        `Le maître d’ouvrage veut que chaque radiateur de la maison des stations T1 à H4 reçoive son débit, et savoir si la pompe à chaleur a assez d’eau. Régime ${EX.maison.dep}/${EX.maison.ret}. Les débits viennent de la station H1, les pertes de charge des circuits de la station H3, la puissance de la pompe à chaleur de H1, le volume d’eau de H4 ; tout est sous la commande et en gras sur la feuille. Suivez les étapes dans l’ordre.`,
        "Étape 1. Au recto de la feuille, trouvez le circuit le plus défavorisé et calculez la perte de charge à dissiper sur chaque circuit.",
        "Étape 2. Calculez le Kv et la position des tés de la chambre 1 et de l’entrée, avec la table du té imprimée sous le tableau.",
        "Étape 3. Au verso, calculez le volume d’eau qui manque et choisissez le ballon. Étape 4. Nommez les organes repérés sur le schéma de principe, puis vérifiez les trois cases en trait double à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Débits et pertes de charge des circuits", ou: "Stations H1 et H3, rappelés sous la commande et en gras sur la feuille" },
        { piece: "Puissance de la pompe à chaleur, volume d’eau", ou: "Stations H1 et H4, rappelés sous la commande et en gras sur la feuille" },
        { piece: "Table du té de réglage", ou: "Écran « La position du té » et feuille" },
        { piece: "Règle du volume minimal, série des ballons", ou: "Écran « Le ballon tampon »" },
        { piece: "Symboles du schéma", ou: "Écran « Le schéma de principe »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Équilibrage, ballon tampon et schéma de principe de la chaufferie de la maison, note de calcul",
      delai: "Rendu en fin de séance",
      commande: `Le maître d’ouvrage veut l’équilibrage du chauffage de la maison des stations T1 à H4, le volume d’eau de la pompe à chaleur et le schéma de principe de la chaufferie du garage. Régime ${EX.maison.dep}/${EX.maison.ret}. Reprenez les débits de votre feuille de la station H1 (le séjour en deux lignes, station H4), les pertes de charge des circuits de la station H3, la puissance de la pompe à chaleur de H1 et le volume d’eau de H4. Données de l’exercice : le té de réglage de la station, ${EX.lpkw} L par kW, la série des ballons. Dressez le tableau d’équilibrage des neuf circuits : écart à dissiper, Kv, position du té. Dites s’il faut un ballon tampon, de quel volume et où le poser. Complétez le schéma de principe et dites s’il faut une bouteille de découplage ou une vanne trois voies. Rédigez la première page de la note de calcul. Citez la source de chaque donnée.`,
      pieces: [
        { piece: "Débits et pertes de charge des circuits", ou: "Vos feuilles des stations H1 et H3, rappelés sous la commande" },
        { piece: "Puissance de la pompe à chaleur, volume d’eau", ou: "Stations H1 et H4, rappelés sous la commande" },
        { piece: "Table du té de réglage", ou: "Écran « La position du té » et feuille" },
        { piece: "Règle du volume minimal, série des ballons", ou: "Écran « Le ballon tampon »" },
        { piece: "Symboles du schéma", ou: "Écran « Le schéma de principe »" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso, avec une feuille quadrillée pour le détail" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "h5-n1-dp", libelle: "Perte de charge à dissiper sur la ligne de l’entrée", unite: "Pa", min: 6216, max: 6602, indice: "Relisez l’écran « La perte de charge à dissiper » : l’écart se prend au circuit le plus défavorisé de toute la maison, pas à celui du niveau. Résultat en pascals, à l’unité." },
      { id: "h5-n1-kv", libelle: "Kv de réglage du té de la chambre 1", unite: "", min: 0.564, max: 0.6, indice: "Relisez l’écran « Le Kv de réglage » : q en m³/h (L/h ÷ 1 000), Δp à dissiper en bar (Pa ÷ 100 000), Kv = q ÷ √Δp, au millième." },
      { id: "h5-n1-ballon", libelle: "Volume d’eau qui manque, avant le choix du ballon", unite: "L", min: 25.54, max: 27.14, indice: "Relisez l’écran « Le ballon tampon » : 20 L par kW de pompe à chaleur, moins le volume d’eau de l’installation (station H4). Résultat en litres, au centième, avant de choisir le ballon de la série." }
    ],
    2: [
      { id: "h5-n2-kv-sej", libelle: "Kv de réglage du té du séjour 2", unite: "", min: 0.678, max: 0.72, indice: "Relisez l’écran « Le Kv de réglage » : q en m³/h (L/h ÷ 1 000), Δp à dissiper en bar (Pa ÷ 100 000), Kv = q ÷ √Δp, au millième." },
      { id: "h5-n2-kv-pal", libelle: "Kv de réglage du té du palier", unite: "", min: 0.25, max: 0.266, indice: "Relisez l’écran « Le Kv de réglage » : q en m³/h (L/h ÷ 1 000), Δp à dissiper en bar (Pa ÷ 100 000), Kv = q ÷ √Δp, au millième." },
      { id: "h5-n2-ballon", libelle: "Volume d’eau qui manque, avant le choix du ballon", unite: "L", min: 25.54, max: 27.14, indice: "Relisez l’écran « Le ballon tampon » : 20 L par kW de pompe à chaleur, moins le volume d’eau de l’installation (station H4). Résultat en litres, au centième, avant de choisir le ballon de la série." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-R1", titre: "Réguler le chauffage", href: "../r1-reguler-chauffage/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-H3, Le réseau d’eau", href: "../h3-reseau-eau/index.html", pourquoi: "La perte de charge de chaque circuit et le circuit le plus défavorisé viennent de cette station." },
    { reseau: "Bureau d’études", titre: "BE-H4, Pompe, vase, soupape", href: "../h4-pompe-vase-soupape/index.html", pourquoi: "La pompe retenue et le volume d’eau de l’installation viennent de cette station." },
    { reseau: "HydroMétro", titre: "Équilibrage", href: "../../../hydrometro/stations/equilibrage/index.html", pourquoi: "Mesurer, régler, attendre, mesurer de nouveau, sur un banc à trois branches." },
    { reseau: "HydroMétro", titre: "Régler une vanne d’équilibrage", href: "../../../hydrometro/stations/reglage-equilibrage/index.html", pourquoi: "Le préréglage d’une vanne et la formule du Kv." },
    { reseau: "HydroMétro", titre: "Volume tampon", href: "../../../hydrometro/stations/tampon/index.html", pourquoi: "Les raccordements d’un ballon tampon et ce que chacun permet." },
    { reseau: "HydroMétro", titre: "Découplage", href: "../../../hydrometro/stations/decouplage/index.html", pourquoi: "Deux circuits, une zone commune : la bouteille de découplage." },
    { reseau: "HydroMétro", titre: "Vanne trois voies", href: "../../../hydrometro/stations/v3v/index.html", pourquoi: "Les trois voies et le mélange." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous recevez la commande d’un bureau d’études : régler le chauffage de la maison pour que chaque radiateur reçoive son débit, vérifier que la pompe à chaleur a assez d’eau, puis tracer le schéma de principe de la chaufferie. La station H3 a donné la perte de charge de chaque circuit, la station H4 la pompe et le volume d’eau. Vous calculez le réglage du té de chaque radiateur, le ballon tampon s’il en faut un, et vous placez chaque organe sur le schéma. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Ce que vous trouvez", "Unité"], [
        ["Circuit le plus défavorisé", "Pa"],
        ["Perte de charge à dissiper sur chaque circuit", "Pa"],
        ["Kv de réglage et position de chaque té", "sans unité"],
        ["Volume d’eau qui manque, ballon tampon", "L"],
        ["Schéma de principe de la chaufferie", "symboles et noms"]
      ], "Le tableau à remplir, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "l’équilibrage et le schéma de la chaufferie de la maison."], ["Le dossier :", "les débits (H1), les pertes de charge (H3), la pompe et le volume d’eau (H4)."]] },
          { title: "Vous produisez", rows: [["La feuille :", "le tableau d’équilibrage, le ballon, le schéma."], ["Le contrôle :", "trois résultats à l’écran Vérifier, à ± 3 %."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station R1, la régulation posée sur ce schéma."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les débits des radiateurs viennent de la station H1, la perte de charge de chaque circuit de la station H3, la pompe et le volume d’eau de la station H4. Le CCTP, page 4, place la pompe à chaleur air/eau au garage. La formule du Kv vient de la station HydroMétro « Régler une vanne d’équilibrage ». Le té de réglage, la règle du volume minimal et la série des ballons sont des données de l’exercice : aucun document de fabricant n’est utilisé.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Débit de chaque radiateur", "Station H1 (deux lignes au séjour : station H4)"],
        ["Perte de charge de chaque circuit, circuit le plus défavorisé", "Station H3"],
        ["Pompe retenue, volume d’eau de l’installation", "Station H4"],
        ["Puissance de la pompe à chaleur", "Stations T5 et H1"],
        ["Pompe à chaleur au garage", "Page 4 du CCTP"],
        ["Débit d’une vanne : q = Kv × √Δp, q en m³/h, Δp en bar", "Station HydroMétro « Régler une vanne d’équilibrage »"],
        ["Rôle du ballon tampon : limiter les démarrages du compresseur", "Fiche « Ballon tampon », fonds du professeur"],
        ["Raccordements du ballon, bouteille, vanne trois voies", "Stations HydroMétro « Volume tampon », « Découplage », « Vanne trois voies »"],
        ["Té de réglage, 20 L par kW, série des ballons", "Cette station, données de l’exercice"]
      ], "Les données de la station")
        + BE.renvoi('La perte de charge de chaque circuit se calcule à <a href="../h3-reseau-eau/index.html">la station H3</a>.')
    }),

    BE.ecran({
      id: "pourquoi-equilibrer", dossier: "methode", kicker: "La méthode, 1", title: "Pourquoi équilibrer", level: "comprendre",
      text: `La pompe pousse l’eau dans tous les circuits à la fois. Chaque circuit part du collecteur et y revient : l’eau se partage entre eux selon leur résistance. Un circuit court, peu chargé, laisse passer plus que son débit ; le circuit le plus défavorisé, celui de la plus grande perte de charge (station H3), en reçoit moins. Ses radiateurs chauffent mal pendant que les autres reçoivent trop. Équilibrer, c’est freiner les circuits favorisés jusqu’à ce que chacun reçoive son débit. On le fait avec le té de réglage posé sur le retour de chaque radiateur. Dans le bâtiment d’exemple, le ${X().max.nom.toLowerCase()} est le plus défavorisé, à ${X().max.dp} Pa.`,
      prompt: "Comparez les quatre barres du schéma, puis continuez.",
      render: () => figCircuits()
        + BE.renvoi('Mesurer, régler, attendre, mesurer de nouveau, sur un banc : <a href="../../../hydrometro/stations/equilibrage/index.html">la station HydroMétro « Équilibrage »</a>.')
    }),

    BE.ecran({
      id: "perte-a-dissiper", dossier: "methode", kicker: "La méthode, 2", title: "La perte de charge à dissiper", level: "comprendre",
      text: "Le circuit le plus défavorisé fixe la hauteur que la pompe doit fournir : son té reste grand ouvert. Chaque autre circuit doit perdre autant que lui, pour que l’eau ne le préfère plus. Son té doit donc dissiper l’écart : perte de charge à dissiper (Pa) = perte du circuit le plus défavorisé − perte du circuit. On prend le circuit le plus défavorisé de toute l’installation, tous niveaux confondus, et on écrit l’écart à l’unité. La perte du té grand ouvert est déjà comptée dans la perte de chaque circuit (station H3) : l’écart s’ajoute à elle.",
      prompt: "Suivez les parties orange du schéma, le tableau et l’exemple résolu, puis continuez.",
      render: () => figCircuits() + tableau(["Circuit", "Débit (L/h)", "Perte du circuit (Pa)", "À dissiper (Pa)"], X().circuits.map(c => [c.nom, c.q, c.dp, c.kv ? c.dis : "0, grand ouvert"]), "Bâtiment d’exemple, pertes de charge de la station H3")
        + BE.exemple({ text: `Bâtiment d’exemple, réunion 1 : ${R1().dp} Pa ; ${X().max.nom.toLowerCase()} : ${X().max.dp} Pa`, answer: `${X().max.dp} − ${R1().dp} = ${R1().dis} Pa à dissiper`, why: "Les deux circuits partent du même collecteur et y reviennent : à la fin, ils doivent perdre la même pression." })
        + BE.alerte("<strong>Piège.</strong> Prendre le plus défavorisé de chaque niveau : dans une maison à deux collecteurs, le té d’un circuit du rez-de-chaussée se règle aussi sur le circuit le plus défavorisé de l’étage, car la pompe les alimente tous.")
    }),

    BE.ecran({
      id: "kv", dossier: "methode", kicker: "La méthode, 3", title: "Le Kv de réglage", level: "comprendre",
      text: `Le Kv d’une vanne est le débit, en m³/h, qui la traverse quand elle perd 1 bar. La station HydroMétro « Régler une vanne d’équilibrage » donne la relation : q (m³/h) = Kv × √Δp (bar). Pour le té d’un circuit, on connaît le débit à faire passer et la perte de charge à dissiper : Kv = q ÷ √Δp. Les unités se convertissent d’abord : le débit en L/h divisé par 1 000 donne des m³/h ; la perte en Pa divisée par 100 000 donne des bar. On écrit √Δp au dix-millième et Kv au millième.`,
      prompt: "Suivez les trois cases du schéma et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/kv-exemple.svg", `Trois cases reliées par des flèches. Débit : ${R1().q} L/h, soit ${R1().qm3} m³/h. Écart : ${R1().dis} Pa, soit ${R1().bar} bar. Kv = q ÷ √Δp = ${R1().qm3} ÷ ${R1().rac} = ${R1().kv}.`, "Le débit en m³/h, l’écart en bar, puis le Kv.")
        + exempleKv()
        + tableau(["Circuit", "q (m³/h)", "Δp (bar)", "√Δp", "Kv"], X().circuits.filter(c => c.kv).map(c => [c.nom, c.qm3, c.bar, c.rac, c.kv]), "Les trois tés à régler du bâtiment d’exemple")
        + BE.alerte("<strong>Piège.</strong> Garder le débit en L/h ou la perte en pascals : le Kv sort mille fois trop grand, ou trois cents fois trop petit. Oublier la racine donne aussi un Kv faux.")
    }),

    BE.ecran({
      id: "position-te", dossier: "methode", kicker: "La méthode, 4", title: "La position du té", level: "comprendre",
      text: `Un té de réglage se règle par une vis : chaque position laisse passer plus ou moins d’eau, et sa table donne le Kv de chaque position. Le té de l’exercice a huit positions et le grand ouvert ; sa table a été écrite pour la station, sans fabricant. On retient la position dont le Kv est le plus proche du Kv calculé. Si le Kv calculé est plus petit que celui de la position 1, on prend la position 1, le té le plus fermé : le circuit reçoit un peu plus que son débit. Le té du circuit le plus défavorisé reste grand ouvert. Si la pompe donne un peu plus que le débit demandé (station H4 : ${X().pompe.Q} m³/h pour ${X().pompe.Qd} dans le bâtiment d’exemple), les tés gardent la répartition : chaque radiateur reçoit un peu plus, dans la même proportion.`,
      prompt: "Lisez la table du té et la colonne teintée, puis continuez.",
      render: () => figTe()
        + tableau(["Circuit", "Kv calculé", "Position retenue"], X().circuits.map(c => [c.nom, c.kv || "", c.pos]), "Les positions du bâtiment d’exemple")
        + BE.renvoi('Afficher un préréglage et le bloquer, sur une vanne réelle : <a href="../../../hydrometro/stations/reglage-equilibrage/index.html">la station HydroMétro « Régler une vanne d’équilibrage »</a>.')
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Entraînement 1, le té", title: "Entraînement : le réglage d’un té", level: "appliquer", requiresAction: true,
      text: {
        1: `Le circuit le plus défavorisé d’une installation perd ${EX.ent1.dpMax} Pa. Un autre circuit perd ${EX.ent1.dp} Pa pour un débit de ${EX.ent1.q} L/h. Quel Kv donnez-vous à son té, et quelle position ? L’exemple résolu reste sous vos yeux.`,
        2: `Le circuit le plus défavorisé d’une installation perd ${EX.ent1.dpMax} Pa. Un autre circuit perd ${EX.ent1.dp} Pa pour un débit de ${EX.ent1.q} L/h. Donnez le Kv de son té et sa position, sans l’exemple.`
      },
      prompt: { 1: "Choisissez le Kv et la position, en vous aidant de l’exemple.", 2: "Choisissez le Kv et la position. Cette question est à faire seul." },
      aides: {
        1: ["L’écart est à l’écran « La perte de charge à dissiper », le Kv à l’écran « Le Kv de réglage », la table sous la question.", "Écart, puis conversion en bar, puis Kv = q ÷ √Δp, puis la table.", `Écart : ${EX.ent1.d} Pa, soit ${EX.ent1.bar} bar ; q = ${EX.ent1.qm3} m³/h.`],
        2: ["La méthode est aux écrans « La perte de charge à dissiper », « Le Kv de réglage » et « La position du té ».", "Quatre étapes : l’écart, les unités, le Kv, la table.", `Écart : ${EX.ent1.d} Pa.`]
      },
      ...BE.parNiveau({
        1: avecBloc(figTeSeul() + exempleKv(), EX.ent1.quiz),
        2: avecBloc(figTeSeul(), EX.ent1.quiz)
      })
    }),

    BE.ecran({
      id: "ballon", dossier: "methode", kicker: "La méthode, 5", title: "Le ballon tampon", level: "comprendre",
      text: `Une pompe à chaleur qui chauffe trop peu d’eau atteint sa consigne en quelques minutes, s’arrête, puis redémarre peu après. La fiche « Ballon tampon » du fonds du professeur le dit : un réservoir d’eau en plus limite les démarrages et les arrêts du compresseur, qui s’use moins et consomme moins. La pompe à chaleur de l’exercice demande au moins ${EX.lpkw} L d’eau par kW de puissance (donnée de l’exercice). Comparez ce minimum au volume d’eau de l’installation, calculé à la station H4 ; on compte toute l’eau, robinets thermostatiques ouverts. S’il manque de l’eau, on choisit le premier ballon de la série qui dépasse le manque : ${EX.serie} L (série de l’exercice). Volumes au centième de litre.`,
      prompt: "Lisez les trois barres et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/ballon-exemple.svg", `Trois barres horizontales. Minimum : ${X().pac} × 20 = ${X().Vmin} L. Installation : ${X().V} L, station H4. Il manque : ${X().manque} L, en orange. Dessous : ballon de la série au-dessus du manque, ${X().ballon} L.`, "Le ballon apporte l’eau qui manque.")
        + exempleBallon()
        + BE.alerte("<strong>Piège.</strong> Choisir un ballon qui contient à lui seul le volume minimal : l’eau des tubes et des radiateurs compte déjà.")
    }),

    BE.ecran({
      id: "ballon-montage", dossier: "methode", kicker: "La méthode, 6", title: "Où poser le ballon tampon", level: "comprendre",
      text: "Un ballon raccordé par deux piquages, en série sur le retour, est traversé par tout le débit : il ajoute du volume, sans séparer deux circuits. L’eau entre en haut d’un côté et sort en bas de l’autre, pour balayer tout le volume. Un ballon à quatre piquages, entre une pompe de production et une pompe de distribution, peut en plus laisser les deux débits être différents. La station HydroMétro « Volume tampon » le montre. Avec une seule pompe, on pose le ballon en série sur le retour, avant le vase.",
      prompt: "Comparez les deux montages du schéma, puis continuez.",
      render: () => BE.schema("illustrations/ballon-montages.svg", "Deux dessins côte à côte. À gauche, en série : le retour des radiateurs entre en haut à droite du ballon, et ressort en bas à gauche vers la pompe à chaleur ; un seul débit et du volume en plus, sans découplage. À droite, quatre piquages : à gauche du ballon le départ et le retour de la production, à droite ceux des radiateurs ; deux circuits, deux pompes, découplage possible.", "Deux piquages : du volume. Quatre piquages : deux circuits.")
        + BE.renvoi('Trois raccordements, trois lectures : <a href="../../../hydrometro/stations/tampon/index.html">la station HydroMétro « Volume tampon »</a>.')
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Entraînement 2, le ballon", title: "Entraînement : le volume du ballon", level: "appliquer", requiresAction: true,
      text: {
        1: `Une pompe à chaleur de ${EX.ent2.P} kW alimente une installation qui contient ${EX.ent2.V} L d’eau. Faut-il un ballon tampon, et de quel volume ? L’exemple résolu reste sous vos yeux.`,
        2: `Une pompe à chaleur de ${EX.ent2.P} kW alimente une installation qui contient ${EX.ent2.V} L d’eau. Dimensionnez le ballon tampon, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["La règle et la série sont à l’écran « Le ballon tampon ».", `Volume minimal = ${EX.lpkw} × puissance ; puis le manque ; puis la série.`, `Volume minimal : ${EX.ent2.Vmin} L.`],
        2: ["La méthode est à l’écran « Le ballon tampon ».", "Le minimum, le manque, la série.", `Il manque ${EX.ent2.manque} L.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleBallon(), EX.ent2.quiz),
        2: BE.quiz(EX.ent2.quiz)
      })
    }),

    BE.ecran({
      id: "bouteille", dossier: "methode", kicker: "La méthode, 7", title: "La bouteille de découplage", level: "comprendre",
      text: `Supposez qu’on agrandisse le bâtiment d’exemple : une salle chauffée par le sol, en ${X().plancher.dep}/${X().plancher.ret} °C, avec sa propre pompe (donnée de l’exercice). Trois pompes travailleraient alors dans le même réseau, à des débits différents : elles se gêneraient. La bouteille de découplage est un gros tube vertical où se raccordent la production d’un côté, les circuits de l’autre. Sa section est si grande que l’eau n’y perd presque rien : chaque pompe ne voit que son propre circuit. Elle sert dès que plusieurs pompes en série doivent tourner à des débits différents. Le bâtiment d’exemple tel qu’il est, un seul circuit et une seule pompe, n’en a pas besoin.`,
      prompt: "Suivez la production à gauche et les deux circuits à droite, puis continuez.",
      render: () => BE.schema("illustrations/deux-circuits.svg", `Schéma de principe du bâtiment d’exemple agrandi. À gauche, la pompe à chaleur et la pompe 1 alimentent la bouteille de découplage, un cylindre vertical. À droite de la bouteille, deux circuits imbriqués : en haut, la pompe 2 envoie l’eau à ${X().dep} °C aux radiateurs, dont le retour revient en bas de la bouteille ; au milieu, une vanne trois voies puis la pompe 3 alimentent le plancher chauffant en ${X().plancher.dep}/${X().plancher.ret} °C, dont le retour revient à la bouteille et, par une dérivation, à la vanne trois voies.`, "La bouteille sépare la production des circuits.")
        + BE.renvoi('Deux circuits, une zone commune : <a href="../../../hydrometro/stations/decouplage/index.html">la station HydroMétro « Découplage »</a>.')
    }),

    BE.ecran({
      id: "vanne-trois-voies", dossier: "methode", kicker: "La méthode, 8", title: "La vanne trois voies", level: "comprendre",
      text: `Le plancher du bâtiment agrandi veut de l’eau à ${X().plancher.dep} °C, la production en donne à ${X().plancher.prod} °C. La vanne trois voies mélangeuse mélange l’eau chaude, voie A, avec l’eau de retour du plancher, voie B ; le mélange sort par la voie AB. Son moteur tourne le boisseau : plus il ouvre A, plus le mélange est chaud. Le bilan de l’eau donne la part d’eau chaude : (θ mélange − θ retour) ÷ (θ chaud − θ retour) = (${X().plancher.dep} − ${X().plancher.ret}) ÷ (${X().plancher.prod} − ${X().plancher.ret}), soit ${X().plancher.part} %. On pose une vanne trois voies quand un circuit veut une eau moins chaude que la production. Une pompe à chaleur qui ne sert qu’un circuit règle elle-même la température de son eau, par sa loi d’eau (station R1).`,
      prompt: "Suivez les trois voies du schéma, puis continuez.",
      render: () => BE.schema("illustrations/v3v-melange.svg", `La vanne trois voies agrandie. À gauche, voie A : eau chaude à ${X().plancher.prod} °C, ${X().plancher.part} % du débit. En bas, voie B : retour à ${X().plancher.ret} °C, ${X().plancher.reste} % du débit. À droite, voie AB : le mélange à ${X().plancher.dep} °C vers le plancher. En haut, le moteur.`, "Un quart d’eau chaude, trois quarts d’eau de retour.")
        + BE.renvoi('Les voies A, B et AB sur le corps d’une vanne : <a href="../../../hydrometro/stations/v3v/index.html">la station HydroMétro « Vanne trois voies »</a>.')
    }),

    BE.ecran({
      id: "schema-principe", dossier: "methode", kicker: "La méthode, 9", title: "Le schéma de principe", level: "comprendre",
      text: "Le schéma de principe montre le chemin de l’eau et la place de chaque organe, sans échelle ni longueur. Le départ se trace en rouge, le retour en bleu. En sortie de la pompe à chaleur : la soupape, sans vanne entre les deux, puis la vanne d’isolement et la pompe (station H4). Sur le retour, avant la pompe à chaleur : le ballon tampon s’il en faut un, le vase, le manomètre, le robinet de remplissage et la vanne d’isolement. Chaque collecteur porte un purgeur en haut et une vanne sur son départ et sur son retour ; chaque radiateur, son té de réglage sur sa propre ligne, côté retour, et non sur le retour général. Le symbole du ballon a quatre piquages : monté en série, on n’en raccorde que deux, l’entrée en haut et la sortie en bas. Un seul circuit, une seule pompe, une seule température : ni bouteille ni vanne trois voies.",
      prompt: "Lisez les symboles, puis suivez le départ et le retour sur le schéma du bâtiment d’exemple.",
      render: () => BE.schema("illustrations/legende-symboles.svg", "Les douze symboles du schéma, avec leur nom : pompe à chaleur, soupape de sécurité, vanne d’isolement, pompe, ballon tampon, vase d’expansion, manomètre, remplissage (une vanne sur un piquage et une flèche), purgeur, té de réglage, radiateur, vanne trois voies.", "Les symboles du schéma de principe.")
        + figSchemaEx()
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Entraînement 3, le schéma", title: "Entraînement : lire le schéma", level: "appliquer", requiresAction: true,
      text: {
        1: "Sur le schéma du bâtiment d’exemple, où est posé chaque organe ? Classez-les : sur le départ, sur le retour général ou sur la ligne d’un radiateur. L’exemple résolu montre le premier.",
        2: "Sur le schéma du bâtiment d’exemple, les organes sont repérés par des lettres. Reconnaissez l’organe de chaque lettre, puis classez-le : sur le départ, sur le retour général ou sur la ligne d’un radiateur."
      },
      prompt: { 1: "Classez chaque organe.", 2: "Classez chaque organe. Cette question est à faire seul." },
      aides: {
        1: ["Les règles sont à l’écran « Le schéma de principe ».", "Suivez le rouge depuis la pompe à chaleur, puis le bleu depuis le collecteur.", "La soupape est la première sur le départ, le ballon le premier sur le retour."],
        2: ["Les symboles sont à l’écran « Le schéma de principe ».", "Reconnaissez d’abord chaque symbole, puis la couleur du tuyau qui le porte.", "Le té de réglage est sur la ligne de chaque radiateur, côté retour, après lui : il n’est pas sur le retour général."]
      },
      ...BE.parNiveau({
        1: { render: item => figSchemaEx() + BE.tri(EX.ent3.lignes, EX.ent3.labels, EX.ent3.exemple).render(item), wire: item => BE.tri(EX.ent3.lignes, EX.ent3.labels, EX.ent3.exemple).wire(item) },
        2: { render: item => BE.schema("illustrations/schema-exemple-reperes.svg", "Le schéma de principe du bâtiment d’exemple, sans les noms : les organes sont repérés par des lettres de A à J (A soupape, B vanne d’isolement, C pompe, D collecteur, E purgeur, F té de réglage, G ballon tampon, H vase, I manomètre, J remplissage).", "Les organes repérés par des lettres.") + BE.tri(EX.ent3.lignesN2, EX.ent3.labels).render(item), wire: item => BE.tri(EX.ent3.lignesN2, EX.ent3.labels).wire(item) }
      })
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 10", title: "La note de calcul", level: "comprendre",
      text: "La note de calcul donne à un lecteur de quoi refaire les réglages : l’objet, les données avec leur source, les hypothèses et la méthode, les résultats. Le té de l’exercice, la règle des 20 L par kW et la série des ballons sont des hypothèses : elles s’écrivent comme telles. La note du bâtiment d’exemple tient en quatre lignes, une par rubrique ; la feuille du niveau 2 reprend les mêmes rubriques.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Équilibrage des quatre circuits de radiateurs, ballon tampon et schéma de principe d’un petit bâtiment de bureaux de plain-pied, pompe à chaleur air/eau"],
        ["Données et sources", "Débits : station H1 ; pertes des circuits : station H3 ; volume d’eau : station H4 ; té, 20 L par kW, série des ballons : exercice"],
        ["Hypothèses et méthode", `Régime ${X().dep}/${X().ret} ; écart au circuit le plus défavorisé (${X().max.nom.toLowerCase()}) ; Kv = q ÷ √Δp ; position la plus proche ; ${EX.lpkw} L par kW`],
        ["Résultats", `Tés : ${X().circuits.map(c => `${c.nom.toLowerCase()} ${c.kv ? "position " + c.pos : "grand ouvert"}`).join(", ")} ; ballon tampon de ${X().ballon} L en série sur le retour ; ni bouteille ni vanne trois voies`]
      ], "Première page de la note de calcul, bâtiment d’exemple")
        + BE.renvoi("La note complète du projet s’assemble à la station R5, « La note de calcul ».")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

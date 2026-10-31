/* Station BE-D0 : Le dossier projet.
   Méthode sur un dossier d'exemple (un atelier de réparation de vélos avec un bureau, qui n'est pas la maison) et sur un logement d'exemple
   pour la règle du sixième, puis commande sur la maison : remplir la carte d'identité du bâtiment en huit lignes, avec la page de chaque réponse.
   Les valeurs du dossier d'exemple et les extraits (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrits par
   outils/stations/d0-dossier-projet/construire.mjs : les premières viennent de exemple-data.mjs, les secondes de maison.json.
   Aucune valeur de la maison n'est écrite dans cette station : seules les bornes des fourchettes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";
const GARE = "../../../plan/gares/";
const T = {
  prise: "Ce que vous rendez",
  pieces: "Une étude commence par un dossier",
  cartouche: "Lire un cartouche et un plan de masse",
  ex1: "Exercice : où lire l’altitude du terrain",
  plan: "Le plan de niveau et la coupe",
  cctp: "Le CCTP, lot par lot",
  ex2: "Exercice : ranger six données dans leur pièce",
  hypothese: "Écrire une hypothèse quand la donnée manque",
  ex3: "Exercice : reconnaître une hypothèse bien écrite",
  sixieme: "La règle du sixième",
  carte: "Ce que le bureau d’études fait de la carte",
  maquette: "La maquette numérique"
};

/*EXEMPLE-DEBUT*/
const EX = {
 "site": {
  "ville": "Pau",
  "dep": "Pyrénées-Atlantiques",
  "depNum": "64",
  "zone": "H2c",
  "alt": "200",
  "echelle": "1/200",
  "date": "12/03/2026",
  "indice": "B",
  "dateAncienne": "20/02/2026",
  "indiceAncien": "A"
 },
 "carte": [
  [
   "Lieu",
   "ville, zone climatique, altitude"
  ],
  [
   "Usage",
   "type de bâtiment et programme"
  ],
  [
   "Surfaces",
   "surface habitable, en m²"
  ],
  [
   "Niveaux",
   "nombre de niveaux, hauteur sous plafond"
  ],
  [
   "Occupation",
   "nombre de personnes"
  ],
  [
   "Chauffage",
   "générateur et émetteurs"
  ],
  [
   "Ventilation",
   "type de ventilation"
  ],
  [
   "Climatisation",
   "présente ou absente"
  ]
 ],
 "occ": "2 personnes, de 8 h à 18 h, 5 jours sur 7",
 "pieces": {
  "atelier": "85,00",
  "bureau": "15,00",
  "rangement": "12,00",
  "chauffee": "100,00",
  "tout": "112,00",
  "exces": "12"
 },
 "six": {
  "hab": "60,00",
  "total": "9,50",
  "sixieme": "10,00",
  "manque": "0,50",
  "porte": "1,89",
  "totalPorte": "11,39",
  "lignes": [
   [
    "PF1",
    "Porte-fenêtre",
    "1,80",
    "2,15",
    "3,87",
    "oui"
   ],
   [
    "F1",
    "Fenêtre",
    "1,00",
    "1,20",
    "1,20",
    "oui"
   ],
   [
    "F2",
    "Fenêtre",
    "1,80",
    "1,35",
    "2,43",
    "oui"
   ],
   [
    "F3",
    "Fenêtre",
    "2,00",
    "1,00",
    "2,00",
    "oui"
   ],
   [
    "PE",
    "Porte d’entrée pleine",
    "0,90",
    "2,10",
    "1,89",
    "non, porte pleine"
   ]
  ]
 },
 "sources": {
  "six": "arrêté du 26 octobre 2010 relatif aux caractéristiques thermiques et aux exigences de performance énergétique des bâtiments nouveaux (RT 2012), article 20",
  "sixCourt": "arrêté du 26 octobre 2010, article 20",
  "legifrance": "Légifrance, JORFTEXT000022959397, consulté le 31/10/2026"
 },
 "hyp": {
  "suppose": "une extraction mécanique dans le bureau",
  "parce": "le lot plomberie pose une bouche d’extraction",
  "confirmer": "le maître d’ouvrage"
 },
 "questionMO": "Le caisson d’extraction du bureau est-il prévu, et de quel type ? Le calcul du renouvellement d’air en dépend.",
 "ex1": {
  "choices": [
   "Sur le plan de niveau, dans le tableau des pièces",
   "Sur le plan de masse, dans le bloc du lieu",
   "Dans le CCTP, au lot électricité et chauffage",
   "Dans le tableau des menuiseries"
  ],
  "good": 1,
  "explain": "L’altitude (200 m) est écrite dans le bloc du lieu, sur le plan de masse, avec la ville et la zone. Le plan de niveau donne les pièces et leurs surfaces, le CCTP décrit les équipements, le tableau des menuiseries donne la taille des baies."
 },
 "ex3": {
  "choices": [
   "La ventilation du bureau est une extraction mécanique, comme dans tous les bureaux.",
   "Je suppose une extraction mécanique ; à confirmer auprès du maître d’ouvrage.",
   "Je suppose une extraction mécanique dans le bureau parce que le lot plomberie pose une bouche d’extraction ; à confirmer auprès du maître d’ouvrage.",
   "Je suppose une extraction mécanique dans le bureau parce que le lot plomberie pose une bouche d’extraction."
  ],
  "good": 2,
  "explain": "La réponse C porte les trois éléments : ce que je suppose, la raison tirée du dossier (le lot plomberie pose une bouche d’extraction) et la personne qui confirmera. A présente comme un fait ce qui est une supposition. B n’écrit pas la raison. D n’écrit pas qui confirmera."
 },
 "tri": {
  "labels": [
   "Plan de masse",
   "Plan de niveau ou coupe",
   "CCTP",
   "Tableau des menuiseries"
  ],
  "exemple": {
   "text": "L’échelle du plan de masse, 1/200",
   "good": 0,
   "why": "L’échelle est écrite dans le cartouche du plan de masse."
  },
  "lignes": [
   {
    "text": "L’altitude du terrain, 200 m",
    "good": 0,
    "why": "L’altitude est écrite dans le bloc du lieu, sur le plan de masse.",
    "bad": "Demandez-vous quelle pièce du dossier est faite pour porter cette donnée : le lieu au plan de masse, les surfaces au plan de niveau, les équipements au CCTP, les baies au tableau des menuiseries."
   },
   {
    "text": "La surface du bureau, 15,00 m²",
    "good": 1,
    "why": "Les surfaces des pièces sont écrites sur le plan de niveau.",
    "bad": "Demandez-vous quelle pièce du dossier est faite pour porter cette donnée : le lieu au plan de masse, les surfaces au plan de niveau, les équipements au CCTP, les baies au tableau des menuiseries."
   },
   {
    "text": "La hauteur sous plafond, 3,00 m",
    "good": 1,
    "why": "La hauteur sous plafond se lit sur le plan de niveau ou sur la coupe.",
    "bad": "Demandez-vous quelle pièce du dossier est faite pour porter cette donnée : le lieu au plan de masse, les surfaces au plan de niveau, les équipements au CCTP, les baies au tableau des menuiseries."
   },
   {
    "text": "L’occupation du bâtiment, 2 personnes de 8 h à 18 h",
    "good": 2,
    "why": "L’occupation de calcul est écrite dans le CCTP.",
    "bad": "Demandez-vous quelle pièce du dossier est faite pour porter cette donnée : le lieu au plan de masse, les surfaces au plan de niveau, les équipements au CCTP, les baies au tableau des menuiseries."
   },
   {
    "text": "Le type d’émetteur de chauffage, des radiateurs électriques",
    "good": 2,
    "why": "Le chauffage est décrit dans le CCTP.",
    "bad": "Demandez-vous quelle pièce du dossier est faite pour porter cette donnée : le lieu au plan de masse, les surfaces au plan de niveau, les équipements au CCTP, les baies au tableau des menuiseries."
   },
   {
    "text": "La largeur de la porte-fenêtre du bureau, 0,90 m",
    "good": 3,
    "why": "Les dimensions des baies sont écrites dans le tableau des menuiseries.",
    "bad": "Demandez-vous quelle pièce du dossier est faite pour porter cette donnée : le lieu au plan de masse, les surfaces au plan de niveau, les équipements au CCTP, les baies au tableau des menuiseries."
   }
  ]
 },
 "extraits": {
  "masse": "<figure style=\"margin:0 0 10px;border:3px solid var(--navy);border-radius:10px;background:var(--paper);color:var(--ink);overflow:hidden;font-size:15px;line-height:1.35\"><figcaption style=\"padding:4px 10px;background:var(--navy);color:#fff;font-weight:800\">Extrait du plan de masse d’exemple</figcaption><div style=\"display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;padding:10px 14px\">\n<div style=\"flex:1 1 170px;min-height:70px;border:2px dashed var(--muted);border-radius:6px;display:flex;align-items:center;justify-content:center;text-align:center;padding:8px\">Atelier de réparation de vélos, vu de dessus</div>\n<div style=\"flex:0 0 auto;text-align:center\"><strong style=\"font-size:24px\">N ↑</strong><br>nord vers le haut du plan</div>\n<div style=\"flex:0 0 auto\"><strong>Pau</strong><br>Zone H2c<br>Altitude 200 m</div></div>\n<div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));border-top:3px solid var(--navy);background:#eef5fc\"><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Titre</span><strong>Plan de masse</strong></div><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Projet</span><strong>Atelier de réparation de vélos, Pau</strong></div><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Échelle</span><strong>1/200</strong></div><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Date</span><strong>12/03/2026</strong></div><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Indice</span><strong>B, remplace l’indice A du 20/02/2026</strong></div></div></figure>",
  "niveau": "<figure style=\"margin:0 0 10px;border:3px solid var(--navy);border-radius:10px;background:var(--paper);color:var(--ink);overflow:hidden;font-size:15px;line-height:1.35\"><figcaption style=\"padding:4px 10px;background:var(--navy);color:#fff;font-weight:800\">Extrait du plan de niveau d’exemple</figcaption><div style=\"padding:8px 10px\"><table class=\"constat\"><caption>Plan du rez-de-chaussée d’exemple : tableau des pièces</caption><thead><tr><th scope=\"col\">Pièce</th><th scope=\"col\">Surface (m²)</th><th scope=\"col\">Hauteur sous plafond (m)</th><th scope=\"col\">Chauffée</th></tr></thead><tbody><tr><td>Atelier</td><td>85,00</td><td>3,00</td><td>oui</td></tr><tr><td>Bureau</td><td>15,00</td><td>3,00</td><td>oui</td></tr><tr><td>Local de rangement</td><td>12,00</td><td>3,00</td><td>non</td></tr></tbody></table><p style=\"margin:6px 0 0\">Coupe d’exemple : un seul niveau, plafond sous toiture isolée.</p></div>\n<div style=\"display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));border-top:3px solid var(--navy);background:#eef5fc\"><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Titre</span><strong>Plan du rez-de-chaussée</strong></div><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Projet</span><strong>Atelier de réparation de vélos, Pau</strong></div><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Échelle</span><strong>1/50</strong></div><div style=\"padding:6px 10px\"><span style=\"display:block;font-size:15px;color:var(--muted)\">Date et indice</span><strong>12/03/2026, B</strong></div></div></figure>",
  "cctp": "<figure style=\"margin:0 0 10px;border:3px solid var(--navy);border-radius:10px;background:var(--paper);color:var(--ink);overflow:hidden;font-size:15px;line-height:1.35\"><figcaption style=\"padding:4px 10px;background:var(--navy);color:#fff;font-weight:800\">Extrait de CCTP d’exemple, en deux lots</figcaption><div style=\"padding:8px 10px\"><p style=\"margin:0 0 6px\"><strong>Atelier de réparation de vélos, Pau.</strong> Usage : atelier et bureau, bâtiment tertiaire.</p><table class=\"constat\"><caption>Lot 1, Électricité et chauffage</caption><thead><tr><th scope=\"col\">Poste</th><th scope=\"col\">Ce que dit le CCTP</th></tr></thead><tbody><tr><td>Chauffage</td><td>Radiateurs électriques dans l’atelier et dans le bureau.</td></tr><tr><td>Occupation de calcul</td><td>2 personnes, de 8 h à 18 h, 5 jours sur 7.</td></tr><tr><td>Climatisation</td><td>Aucune climatisation.</td></tr></tbody></table><div style=\"height:8px\"></div><table class=\"constat\"><caption>Lot 2, Plomberie et sanitaires</caption><thead><tr><th scope=\"col\">Poste</th><th scope=\"col\">Ce que dit le CCTP</th></tr></thead><tbody><tr><td>Sanitaires</td><td>Un lavabo dans le bureau.</td></tr><tr><td>Air</td><td>Une bouche d’extraction d’air est posée dans le bureau et raccordée à une gaine vers la toiture. Le caisson d’extraction et les entrées d’air ne sont pas décrits dans ce lot.</td></tr></tbody></table></div></figure>"
 }
};
/*EXEMPLE-FIN*/

/* Un exercice avec un bloc d'aide sous les yeux au niveau 1, sans lui au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exempleHypothese = () => BE.exemple({ text: `Dossier d’exemple : le CCTP ne décrit pas la ventilation. Le lot plomberie pose seulement une bouche d’extraction dans le bureau`, answer: `Je suppose ${EX.hyp.suppose} parce que ${EX.hyp.parce} ; à confirmer auprès de ${EX.hyp.confirmer}.`, why: "Les trois parties sont écrites : l’hypothèse, sa raison tirée du dossier et la personne qui confirmera." });

/* Écran « À vous, le projet » : la commande du moteur, suivie des liens vers les pièces du dossier. */
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Les plans sont dans plans-maison.pdf : la page 4 pour le lieu, les pages 1 et 2 pour les surfaces, la page 3 pour les niveaux. L’usage, le chauffage et la climatisation sont dans le complément de CCTP, page 1. La ventilation est à la page 4 du CCTP, l’occupation à la page 5.",
      `Pour chaque ligne, repérez la pièce du dossier qui la porte, notez la page dans la colonne « Où je l’ai lue », puis recopiez ce que le dossier dit, avec ses unités. Si le dossier ne dit rien, écrivez une hypothèse (écran « ${T.hypothese} »).`,
      `Sur le dossier d’exemple, la ligne Lieu s’écrit « ${EX.site.ville}, zone ${EX.site.zone}, altitude ${EX.site.alt} m » avec « plan de masse d’exemple, bloc du lieu » comme source. Écrivez de la même façon la ligne Lieu de la maison, avec sa page.`
    ],
    2: [
      "Les plans sont dans plans-maison.pdf (cinq pages, chacune porte son titre), le CCTP dans cctp-maison.pdf (cinq pages) et son complément dans une page à part. Le tableau des menuiseries est la dernière page des plans.",
      `Pour chaque ligne de la carte, notez la pièce du dossier et la page. Pour la règle du sixième, additionnez les surfaces des fenêtres et des portes-fenêtres (largeur × hauteur de chaque baie), divisez la surface habitable par 6, puis comparez. Une donnée absente devient une question au maître d’ouvrage (écran « ${T.hypothese} »).`,
      `Sur le logement d’exemple de l’écran « ${T.sixieme} », ${EX.six.hab} ÷ 6 = ${EX.six.sixieme} m², à comparer au total des baies. Écrivez la même division avec la surface habitable de la maison.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensDossier = () => BE.liens([
  { href: DOSSIER + "plans-maison.pdf", title: "Les plans de la maison", note: "Cinq pages : plan du rez-de-chaussée, plan de l’étage, coupe, plan de masse, tableau des menuiseries" },
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Cinq pages : parois et menuiseries, conditions de calcul et locaux non chauffés, ventilation, eau chaude sanitaire et occupants" },
  { href: "dossier/cctp-programme.html", title: "Le complément de CCTP", note: "Une page : usage, chauffage, climatisation" }
]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensDossier(); };

BE.station({
  code: "BE-D0",
  titre: "Le dossier projet",
  ligne: "Lire les plans",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Maison d’étude, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Maison d’étude, sans balisage, avec la règle du sixième", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Une étude commence par un dossier : plans d’architecte, descriptif des travaux, parfois une maquette numérique. Vous apprenez à le lire sur un dossier d’exemple, puis vous remplissez la carte d’identité d’une maison en notant, pour chaque réponse, la pièce du dossier et la page où vous l’avez lue.",
  note: "Les valeurs du dossier d’exemple et le programme de la maison (occupation, chauffage, ventilation, climatisation) sont des valeurs d’exercice. La règle du sixième est citée de l’arrêté du 26 octobre 2010, article 20.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et carte vide" },
    { id: "methode", label: "La méthode", note: "sur un dossier d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, dossier et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Carte d’identité du bâtiment de la maison d’étude, avec la page de chaque réponse",
      delai: "Rendu en fin de séance",
      commande: [
        "Le maître d’ouvrage vous confie le dossier de la maison d’étude. Avant toute étude, vous remplissez la carte d’identité du bâtiment. Suivez les étapes dans l’ordre.",
        "Étape 1. Lieu : ouvrez plans-maison.pdf à la page 4, le plan de masse. Écrivez la ville, la zone climatique et l’altitude, puis la page, sur la ligne Lieu du recto de la feuille.",
        "Étape 2. Usage, chauffage, climatisation : ouvrez le complément de CCTP, une page. Une ligne de la carte par rubrique, avec la page.",
        "Étape 3. Occupation et ventilation : ouvrez cctp-maison.pdf. L’occupation est à la page 5, ligne Occupants. La ventilation est à la page 4. Une ligne de la carte pour chacune, avec la page.",
        "Étape 4. Niveaux : ouvrez la coupe, page 3 des plans. Écrivez le nombre de niveaux et la hauteur sous plafond.",
        "Étape 5. Surfaces : au verso de la feuille, lisez la surface de chaque pièce sur les plans, pages 1 et 2, puis additionnez les pièces chauffées.",
        "Étape 6. Hypothèses : si une ligne reste sans réponse, écrivez « Je suppose que… parce que… ; à confirmer auprès de… ». Vérifiez la surface habitable à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Cinq pages : 1 plan du rez-de-chaussée, 2 plan de l’étage, 3 coupe, 4 plan de masse, 5 tableau des menuiseries" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Cinq pages : parois et menuiseries (pages 1 et 2), conditions de calcul et locaux non chauffés (page 3), ventilation (page 4), eau chaude sanitaire et occupants (page 5)" },
        { piece: "Complément de CCTP", ou: "Une page : usage, chauffage, climatisation (lien ci-dessous)" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Carte d’identité du bâtiment de la maison d’étude et contrôle de la règle du sixième",
      delai: "Rendu en fin de séance",
      commande: "Le maître d’ouvrage vous confie le dossier de la maison d’étude. Remplissez la carte d’identité du bâtiment en huit lignes, avec la pièce du dossier et la page de chaque réponse, et calculez la surface habitable. Écrivez trois questions au maître d’ouvrage sur ce que le dossier ne dit pas. Contrôlez ensuite la règle du sixième : tableau des baies vitrées lues au tableau des menuiseries, total, surface habitable divisée par 6, verdict conforme ou non conforme, source citée.",
      pieces: [
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Cinq pages : 1 plan du rez-de-chaussée, 2 plan de l’étage, 3 coupe, 4 plan de masse, 5 tableau des menuiseries" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Cinq pages : parois et menuiseries (pages 1 et 2), conditions de calcul et locaux non chauffés (page 3), ventilation (page 4), eau chaude sanitaire et occupants (page 5)" },
        { piece: "Complément de CCTP", ou: "Une page : usage, chauffage, climatisation (lien ci-dessous)" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-hab", libelle: "Surface habitable de la maison", unite: "m²", min: 97.16, max: 99.14, indice: "Relisez l’écran « Le plan de niveau et la coupe » : seules les pièces chauffées comptent, un local non chauffé est écarté et un palier se lit hors trémie. Vérifiez chaque surface lue, la page qui la porte et l’addition." }
    ],
    2: [
      { id: "n2-hab", libelle: "Surface habitable de la maison", unite: "m²", min: 97.16, max: 99.14, indice: "Relisez l’écran « Le plan de niveau et la coupe » : seules les pièces chauffées comptent, un local non chauffé est écarté et un palier se lit hors trémie. Vérifiez chaque surface lue, la page qui la porte et l’addition." },
      { id: "n2-baies", libelle: "Surface totale des baies vitrées de la maison", unite: "m²", min: 23.76, max: 25.24, indice: "Relisez l’écran « La règle du sixième » : fenêtres et portes-fenêtres seulement, largeur × hauteur lues au tableau des menuiseries, portes pleines exclues. Vérifiez qu’aucune ligne du tableau n’est oubliée ni comptée deux fois." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-E1", titre: "Le climat du site", href: "../e1-climat-site/index.html" },
  correspondances: [
    { reseau: "inerWeb BE, ligne Lire les plans", titre: "Le dossier technique", href: GARE + "g03-dossier-technique/index.html", pourquoi: "Cette gare présente les acteurs et les documents d’un dossier technique, dont le cartouche." },
    { reseau: "inerWeb BE, ligne Lire les plans", titre: "Les types de plans", href: GARE + "g04-types-de-plans/index.html", pourquoi: "Cette gare va du plan de situation au plan de détail." },
    { reseau: "inerWeb BE, ligne Lire les plans", titre: "La maquette BIM", href: GARE + "g09-la-maquette-bim/index.html", pourquoi: "Cette gare montre comment ouvrir une maquette numérique avec BIM Vision." },
    { reseau: "inerWeb BE, ligne Lire les plans", titre: "Le sujet guidé", href: GARE + "g10-le-sujet-guide/index.html", pourquoi: "Cette gare fait lire un sujet réel avec des questions guidées." },
    { reseau: "Législation", titre: "Loi, norme, DTU", href: "../../../legislation/stations/certif-loi-norme-dtu/index.html", pourquoi: "Cette station distingue la nature des références citées dans un CCTP." },
    { reseau: "Bureau d’études", titre: "BE-E1, Le climat du site", href: "../e1-climat-site/index.html", pourquoi: "La ligne Lieu de la carte donne la zone et l’altitude que cette station utilise." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: T.prise, level: "comprendre",
      image: "illustrations/1-le-dossier-sur-la-table.webp", imageAlt: "Un technicien de bureau d’études, debout à une table, se penche sur un grand plan d’architecte étalé et pointe du doigt une pièce coloriée en orange. À côté du plan d’une maison, un plan de masse du terrain, un gros classeur fermé, qui représente le cahier des clauses techniques, un carnet à spirale et un crayon.",
      text: "Vous recevez le dossier d’une maison : des plans d’architecte et un extrait du cahier des clauses techniques particulières (CCTP), le texte qui décrit les travaux lot par lot. Vous remplissez la carte d’identité du bâtiment, en huit lignes. Pour chaque ligne, vous écrivez ce que dit le dossier et l’endroit où vous l’avez lu : la pièce du dossier et la page. Si le dossier ne dit rien, vous écrivez une hypothèse et vous la signalez comme telle. La carte ouvre toute étude : les stations suivantes y prennent leurs données. L’écran explique chaque geste, la feuille reçoit vos réponses.",
      prompt: "Lisez la carte vide et les trois cartes, puis continuez.",
      render: () => tableau(["Ligne de la carte", "Ce que j’écris", "Où je l’ai lue (pièce, page)"], EX.carte.map(l => [l[0], l[1], ""]), "La carte d’identité du bâtiment, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["Le dossier :", "les plans, l’extrait de CCTP et son complément."], ["La commande :", "remplir la carte, avec la page de chaque réponse."]] },
          { title: "Vous produisez", rows: [["La carte :", "huit lignes, chacune avec sa réponse et l’endroit où vous l’avez lue."], ["Le contrôle :", "la surface habitable, et au niveau 2 la règle du sixième. À l’écran Vérifier, la surface doit tomber dans une fourchette de ± 1 %."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station E1, le climat du site."]] }
        ])
    }),

    BE.ecran({
      id: "dossier-pieces", dossier: "methode", kicker: "La méthode, 1", title: T.pieces, level: "comprendre",
      text: "Avant tout calcul, un bureau d’études ouvre le dossier du projet. L’architecte écrit les plans : le plan de masse (le terrain vu de dessus), les plans de niveau, les coupes (le bâtiment tranché verticalement) et les façades. Le CCTP décrit les travaux lot par lot : gros œuvre, menuiseries, chauffage, ventilation, électricité. Le tableau des menuiseries donne la taille de chaque fenêtre et de chaque porte. Le maître d’ouvrage, celui qui commande le bâtiment, fixe le programme : l’usage, l’occupation, les équipements voulus. Quand une maquette numérique existe, appelée BIM (de l’anglais Building Information Modeling), elle rassemble tout cela en trois dimensions.",
      prompt: "Lisez le tableau des pièces du dossier, puis continuez.",
      render: () => tableau(["Pièce du dossier", "Ce qu’elle contient", "Qui l’écrit"], [
        ["Plan de masse", "le terrain vu de dessus, le lieu, l’altitude, le nord", "l’architecte"],
        ["Plan de niveau", "les pièces, leurs surfaces, les murs et les baies", "l’architecte"],
        ["Coupe", "les niveaux, la hauteur sous plafond, le comble", "l’architecte"],
        ["Façades", "l’aspect extérieur et la place des baies", "l’architecte"],
        ["CCTP, lot par lot", "les matériaux, les équipements, l’occupation de calcul", "l’architecte, avec les bureaux d’études de chaque lot"],
        ["Tableau des menuiseries", "la taille de chaque fenêtre et de chaque porte", "l’architecte"],
        ["Programme", "l’usage, l’occupation, les équipements voulus", "le maître d’ouvrage"],
        ["Maquette numérique (BIM)", "le bâtiment en trois dimensions", "l’architecte, quand elle existe"]
      ], "Les pièces d’un dossier de projet")
        + BE.renvoi(`La maison d’étude n’a pas de maquette numérique : on travaille sur ses plans. La gare <a href="${GARE}g09-la-maquette-bim/index.html">La maquette BIM</a> de la ligne Lire les plans explique la maquette, sans que cette station en dépende.`)
    }),

    BE.ecran({
      id: "cartouche-plan-masse", dossier: "methode", kicker: "La méthode, 2", title: T.cartouche, level: "comprendre",
      text: "Chaque plan porte un cartouche, le petit tableau placé en bas de la feuille. Il donne le titre du plan, le projet et son lieu, l’échelle, la date et la version, appelée indice. Le plan de masse montre le terrain vu de dessus : le bâtiment, la rue, le jardin et la flèche du nord. Près du dessin, un bloc écrit le lieu, la zone climatique (une des zones H1, H2 ou H3 de la réglementation thermique, parfois suivie d’une lettre) et l’altitude. Un dossier peut garder deux versions d’un même plan : on lit celle dont l’indice et la date sont les plus récents.",
      prompt: "Lisez l’extrait de plan de masse, le tableau, puis l’exemple résolu.",
      render: () => EX.extraits.masse
        + tableau(["Ce que je cherche", "Où le lire"], [
          ["Titre du plan", "le cartouche"],
          ["Lieu du projet", "le cartouche et le bloc du lieu"],
          ["Zone climatique et altitude", "le bloc du lieu, près de la flèche du nord"],
          ["Échelle", "le cartouche"],
          ["Date et indice", "le cartouche"],
          ["Direction du nord", "la flèche du nord"]
        ], "Où lire chaque information d’un plan de masse")
        + BE.exemple({ text: `Plan de masse d’exemple : un plan d’indice ${EX.site.indiceAncien} du ${EX.site.dateAncienne} et un plan d’indice ${EX.site.indice} du ${EX.site.date}`, answer: `Je lis le plan d’indice ${EX.site.indice}, du ${EX.site.date}`, why: "L’indice et la date les plus récents désignent la version à jour." })
        + BE.alerte("<strong>Piège.</strong> Un plan d’indice ancien peut rester dans le dossier. Un calcul fait sur lui reprend des données périmées : relisez l’indice et la date du cartouche avant de lire quoi que ce soit.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, trouver la pièce", title: T.ex1, level: "appliquer", requiresAction: true,
      text: {
        1: "Le dossier d’exemple est celui de l’atelier de réparation de vélos. L’extrait du plan de masse reste sous vos yeux. Choisissez la pièce du dossier où se lit l’altitude du terrain.",
        2: "Le dossier d’exemple est celui de l’atelier de réparation de vélos. Choisissez, sans l’extrait, la pièce du dossier où se lit l’altitude du terrain."
      },
      prompt: { 1: "Choisissez la pièce du dossier, en vous aidant de l’extrait.", 2: "Choisissez la pièce du dossier. Cette question est à faire seul." },
      aides: {
        1: [`Le plan de masse d’exemple est affiché sous la question. Le tableau « Où lire chaque information » est à l’écran « ${T.cartouche} ».`, "L’altitude décrit le terrain. Cherchez la pièce du dossier qui montre le terrain vu de dessus, puis le bloc qui écrit le lieu.", "Sur ce plan, l’échelle se lit dans le cartouche, en bas de la feuille. Cherchez de la même façon le bloc où sont écrites la ville et la zone."],
        2: [`Le tableau « Où lire chaque information » est à l’écran « ${T.cartouche} ».`, "L’altitude décrit le terrain. Dites quelle pièce du dossier montre le terrain vu de dessus.", "Sur un autre plan de masse, l’échelle se lit dans le cartouche. Posez la même question pour l’altitude : quel bloc écrit le lieu ?"]
      },
      ...BE.parNiveau({
        1: avecBloc(EX.extraits.masse, EX.ex1),
        2: BE.quiz(EX.ex1)
      })
    }),

    BE.ecran({
      id: "plan-niveau-coupe", dossier: "methode", kicker: "La méthode, 3", title: T.plan, level: "comprendre",
      text: "Le plan de niveau montre un niveau du bâtiment vu de dessus : les murs, les pièces, les baies, et pour chaque pièce son nom et sa surface. La coupe tranche le bâtiment verticalement : elle montre les niveaux, la hauteur sous plafond (du sol fini au plafond) et les locaux voisins, comme un comble au-dessus du dernier étage. Un local non chauffé, par exemple un garage ou un comble, ne compte pas dans la surface habitable. Convention de cet exercice : la surface habitable est la somme des surfaces des pièces chauffées, lues sur les plans. Un palier percé d’une trémie d’escalier (l’ouverture du plancher où passe l’escalier) se lit « hors trémie » : on prend la surface écrite.",
      prompt: "Lisez l’extrait de plan de niveau, puis l’exemple résolu.",
      render: () => EX.extraits.niveau
        + BE.exemple({ text: `Dossier d’exemple : atelier ${EX.pieces.atelier} m², bureau ${EX.pieces.bureau} m², local de rangement non chauffé ${EX.pieces.rangement} m²`, answer: `${EX.pieces.atelier} + ${EX.pieces.bureau} = ${EX.pieces.chauffee} m²`, why: "Seules les pièces chauffées comptent : le local de rangement est écarté. L’atelier, qui n’est pas un logement, utilise la même somme sous le nom de surface chauffée." })
        + BE.alerte(`<strong>Piège.</strong> Ajouter le local non chauffé donne ${EX.pieces.tout} m² au lieu de ${EX.pieces.chauffee} m², soit ${EX.pieces.exces} % de trop.`)
        + BE.renvoi("Les volumes se calculent avec la hauteur sous plafond, à la station T1.")
    }),

    BE.ecran({
      id: "cctp", dossier: "methode", kicker: "La méthode, 4", title: T.cctp, level: "comprendre",
      text: "Le CCTP décrit ce que les entreprises construisent et installent, lot par lot : gros œuvre, menuiseries, chauffage, ventilation mécanique contrôlée (VMC), électricité. Pour la carte d’identité, vous y cherchez le chauffage, la ventilation, la climatisation et l’occupation de calcul. Un lot ne parle que de son métier : si la ventilation n’apparaît dans aucun lot, le dossier ne la donne pas. Les références citées (une loi, une norme, un DTU, c’est-à-dire un document technique unifié) sont de natures différentes.",
      prompt: "Lisez l’extrait de CCTP, le tableau des mots du métier, puis les deux exemples résolus.",
      render: () => EX.extraits.cctp
        + tableau(["Mot du CCTP", "Ce que cela veut dire"], [
          ["Générateur", "L’appareil qui produit la chaleur ou l’eau chaude."],
          ["Émetteurs", "Les appareils qui donnent la chaleur aux pièces, comme les radiateurs ou un plancher chauffant."],
          ["Pompe à chaleur air/eau", "Un générateur qui prend de la chaleur dans l’air extérieur et la transmet à l’eau du circuit de chauffage."],
          ["Radiateurs à eau chaude basse température", "Des radiateurs alimentés par une eau chaude à température modérée, moins chaude que celle d’une chaudière classique, adaptée à une pompe à chaleur."],
          ["VMC simple flux hygroréglable", "Ventilation mécanique contrôlée : un ventilateur extrait l’air des pièces de service (cuisine, salle d’eau, WC) et l’air neuf entre par des entrées d’air dans les autres pièces. Simple flux : l’extraction est le seul mouvement d’air commandé. Hygroréglable : les débits varient avec l’humidité de l’air."]
        ], "Les mots du lot chauffage et du lot ventilation")
        + BE.exemple({ text: "Chauffage et occupation du dossier d’exemple", answer: `Radiateurs électriques ; ${EX.occ} ; CCTP, lot 1`, why: "Le chauffage et l’occupation de calcul sont écrits dans le lot 1." })
        + BE.exemple({ text: "Climatisation du dossier d’exemple", answer: "Aucune climatisation ; CCTP, lot 1", why: "Une absence écrite est une réponse : la ligne de la carte reçoit « aucune » et la page." })
        + BE.renvoi('La station <a href="../../../legislation/stations/certif-loi-norme-dtu/index.html">Loi, norme, DTU</a> de la ligne Législation distingue la nature des références d’un CCTP.')
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, ranger les données", title: T.ex2, level: "appliquer", requiresAction: true,
      text: {
        1: "Six données du dossier d’exemple sont à ranger dans la pièce du dossier où elles se lisent. Un exemple résolu ouvre la liste.",
        2: "Six données du dossier d’exemple sont à ranger dans la pièce du dossier où elles se lisent."
      },
      prompt: { 1: "Rangez chaque donnée, en vous aidant de l’exemple.", 2: "Rangez chaque donnée. Cette question est à faire seul." },
      aides: {
        1: [`Les pièces du dossier et leur contenu sont décrites à l’écran « ${T.pieces} ».`, "Pour chaque donnée, dites de quoi elle est un renseignement : le terrain, un local, un équipement, une baie. Chaque renseignement a sa pièce.", "L’exemple de tête de liste range l’échelle au plan de masse, parce qu’elle renseigne sur le dessin du terrain. Posez la même question à la première ligne."],
        2: [`Les pièces du dossier et leur contenu sont décrites à l’écran « ${T.pieces} ».`, "Pour chaque donnée, dites de quoi elle est un renseignement : le terrain, un local, un équipement, une baie. Chaque renseignement a sa pièce.", "Sur un autre dossier, la hauteur d’une fenêtre se lit au tableau des menuiseries, parce que ce tableau liste les baies. Posez la même question à la première ligne."]
      },
      ...BE.parNiveau({
        1: BE.tri(EX.tri.lignes, EX.tri.labels, EX.tri.exemple),
        2: BE.tri(EX.tri.lignes, EX.tri.labels)
      })
    }),

    BE.ecran({
      id: "hypothese", dossier: "methode", kicker: "La méthode, 5", title: T.hypothese, level: "comprendre",
      text: "Un dossier ne dit pas tout. Quand il manque une donnée dont vous avez besoin, vous ne l’inventez pas en silence : vous écrivez une hypothèse en trois parties. La première dit ce que vous supposez, la deuxième la raison tirée du dossier, la troisième la personne qui confirmera. La forme est : « Je suppose que… parce que… ; à confirmer auprès de… ». Au niveau 2, une donnée absente donne aussi une question au maître d’ouvrage. Elle nomme la donnée, dit à quoi elle sert et se répond en une phrase.",
      prompt: "Lisez les deux exemples résolus et le piège, puis continuez.",
      render: () => exempleHypothese()
        + BE.exemple({ text: "Même dossier, la question au maître d’ouvrage", answer: EX.questionMO, why: "La question nomme la donnée absente et dit à quoi elle sert." })
        + BE.alerte("<strong>Piège.</strong> Écrire « la ventilation est mécanique » sans dire que c’est une supposition donne au lecteur une fausse certitude. Il calcule ensuite sur une donnée qu’il croit sûre.")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, l’hypothèse", title: T.ex3, level: "appliquer", requiresAction: true,
      text: {
        1: "Le CCTP du dossier d’exemple ne décrit pas la ventilation du bureau. Quatre formulations sont proposées. Une seule est une hypothèse bien écrite. L’exemple résolu reste sous vos yeux.",
        2: "Le CCTP du dossier d’exemple ne décrit pas la ventilation du bureau. Quatre formulations sont proposées. Une seule est une hypothèse bien écrite."
      },
      prompt: { 1: "Choisissez la bonne formulation, en vous aidant de l’exemple.", 2: "Choisissez la bonne formulation. Cette question est à faire seul." },
      aides: {
        1: [`L’exemple résolu est à l’écran « ${T.hypothese} ».`, "Une hypothèse bien écrite porte trois parties : ce que je suppose, la raison tirée du dossier, la personne qui confirmera.", "Sur un autre dossier, « Je suppose une chaudière au gaz parce que le lot plomberie pose un conduit de fumée ; à confirmer auprès de l’architecte » porte les trois parties. Cherchez-les dans chaque réponse."],
        2: [`La forme d’une hypothèse est à l’écran « ${T.hypothese} ».`, "Cherchez dans chaque réponse les trois parties : ce que je suppose, la raison tirée du dossier, la personne qui confirmera.", "Sur un autre dossier, « Je suppose une chaudière au gaz parce que le lot plomberie pose un conduit de fumée ; à confirmer auprès de l’architecte » porte les trois parties. Cherchez-les dans chaque réponse."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleHypothese(), EX.ex3),
        2: BE.quiz(EX.ex3)
      })
    }),

    BE.ecran({
      id: "regle-du-sixieme", dossier: "methode", kicker: "La méthode, 6", title: T.sixieme, level: "comprendre",
      text: "Pour un logement neuf soumis à la réglementation thermique 2012 (RT 2012), l’arrêté du 26 octobre 2010 demande, à l’article 20, que la surface totale des baies, mesurée en tableau, atteigne au moins le sixième de la surface habitable. Une baie est une ouverture dans un mur. Ici, elle désigne les fenêtres et les portes-fenêtres, et les portes pleines sont exclues du total. Mesurée en tableau signifie que l’on prend la largeur et la hauteur de l’ouverture, comme le tableau des menuiseries les donne. Le niveau 2 contrôle cette règle sur la maison du projet.",
      prompt: "Lisez le tableau et l’exemple résolu, puis continuez.",
      render: () => tableau(["Repère", "Type", "Largeur (m)", "Hauteur (m)", "Surface (m²)", "Compte dans le total ?"], EX.six.lignes, "Baies du logement d’exemple, lues au tableau des menuiseries")
        + BE.exemple({ text: `Logement d’exemple : surface habitable ${EX.six.hab} m², baies vitrées ${EX.six.total} m²`, answer: `${EX.six.hab} ÷ 6 = ${EX.six.sixieme} m² ; ${EX.six.total} < ${EX.six.sixieme} : non conforme, il manque ${EX.six.manque} m² de baie`, why: "Le total des baies se compare au sixième de la surface habitable. Chaque surface de baie s’écrit au centième de m²." })
        + BE.alerte(`<strong>Piège.</strong> Compter la porte d’entrée pleine (${EX.six.porte} m²) porte le total du logement d’exemple à ${EX.six.totalPorte} m² et fait conclure à tort que la règle est respectée.`)
        + BE.renvoi(`Source : ${EX.sources.six}. ${EX.sources.legifrance}.`)
    }),

    BE.ecran({
      id: "la-carte-nourrit", dossier: "methode", kicker: "La méthode, 7", title: T.carte, level: "comprendre",
      image: "illustrations/2-la-carte-nourrit-l-etude.webp", imageAlt: "Une feuille posée au centre, marquée d’une petite maison et de lignes de texte. Quatre traits en partent : vers un thermomètre, un soleil et un nuage en haut à gauche, vers une famille attablée en haut à droite, vers une maison en coupe avec son garage en bas à gauche, vers un radiateur chaud en bas à droite.",
      text: "Chaque ligne de la carte nourrit une station du réseau. Le lieu donne le climat du site, à la station E1. L’usage et l’occupation donnent les conditions intérieures, à la station E2. Les surfaces et les niveaux donnent le relevé des parois et des volumes, à la station T1. Le chauffage envoie vers la ligne Hydraulique, la ventilation vers la ligne Aéraulique, la climatisation vers les lignes Frigorifique et Régulation. Une erreur sur la carte se retrouve dans toutes ces stations.",
      prompt: "Lisez le tableau, puis continuez.",
      render: () => tableau(["Ligne de la carte", "Ce qu’elle nourrit"], [
        ["Lieu", "Station E1, le climat du site"],
        ["Usage et occupation", "Station E2, les conditions intérieures"],
        ["Surfaces et niveaux", "Station T1, surfaces et volumes du projet"],
        ["Chauffage", "Ligne Hydraulique"],
        ["Ventilation", "Ligne Aéraulique"],
        ["Climatisation", "Lignes Frigorifique et Régulation"]
      ], "Ce que chaque ligne de la carte nourrit")
    }),

    BE.ecran({
      id: "maquette-numerique", dossier: "methode", kicker: "La méthode, 8", title: T.maquette, level: "comprendre",
      image: "illustrations/3-la-maquette-projetee.webp", imageAlt: "Une salle de cours. Au mur, une maquette en trois dimensions d’une maison avec son garage est projetée, une pièce coloriée en orange. Un enseignant debout la montre de la main devant quatre adultes assis à des tables, dos au spectateur, devant leurs ordinateurs portables.",
      text: "Quand elle existe, la maquette numérique du bâtiment montre le bâtiment en trois dimensions. On y mesure une longueur ou une surface, on voit les niveaux et on dresse la liste des pièces ou des baies. BIM Vision, un logiciel gratuit sous Windows, ouvre ce type de maquette. Quand les postes de la salle n’autorisent pas l’installation de logiciels, l’enseignant projette la maquette au mur et la classe travaille sur les plans. La maison d’étude n’a pas de maquette dans sa première version : tout se lit sur ses plans et sur son CCTP.",
      prompt: "Lisez le texte et regardez l’image, puis continuez.",
      render: () => BE.renvoi(`La gare <a href="${GARE}g09-la-maquette-bim/index.html">La maquette BIM</a> de la ligne Lire les plans montre comment ouvrir une maquette avec BIM Vision. Cette station n’en dépend pas.`)
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

/* Station BE-T4 : Déperditions par l'air.
   Méthode sur le bâtiment du bureau d'exemple des stations T1 à T3 (qui n'est pas la maison), puis commande sur la maison.
   Les valeurs du bâtiment d'exemple (bloc EXEMPLE) et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par
   outils/stations/t4-deperditions-air/construire.mjs : le premier vient de exemple-data.mjs, les secondes de corriges/t4-deperditions-air/corrige-air.json (tolérance 3 %).
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";
const SCHEMA = "illustrations/schema-chemin-air.svg";
const SCH_FORMULE = "illustrations/schema-formule-air.svg", SCH_INF = "illustrations/schema-infiltrations.svg", SCH_PARTAGE = "illustrations/schema-partage-debit.svg", SCH_PAROIS = "illustrations/schema-parois-air.svg", SCH_REC = "illustrations/schema-recuperateur.svg", SCH_DFX = "illustrations/schema-double-flux-infiltrations.svg";

/*EXEMPLE-DEBUT*/
const EX = {
 "T": {
  "ti": "19",
  "te": "−7",
  "dT": "26"
 },
 "pages": {
  "conditions": 3,
  "ventilation": 4
 },
 "qv": "110",
 "pointe": "150",
 "bouches": "toilettes 60 m³/h et lavabos 50 m³/h",
 "salle": "6,00 × 4,10 × 2,60 m, valeur d’exercice",
 "V": {
  "bureau": "49,76",
  "salle": "63,96",
  "somme": "113,72"
 },
 "form": {
  "q": "30",
  "H": "10,2",
  "phi": "265"
 },
 "inf": {
  "fuites": "20",
  "entrees": "90"
 },
 "part": {
  "q": "48,13",
  "H": "16,36",
  "phi": "425"
 },
 "piece": {
  "Hparois": "26,44",
  "parois": "687",
  "air": "425",
  "Htot": "42,80",
  "total": "1112",
  "part": "38,2"
 },
 "rec": {
  "eta": "0,70",
  "phi": "292"
 },
 "dfx": {
  "eta": "0,70",
  "qinf": "10",
  "qeq": "43,0",
  "phi": "380"
 },
 "ex1": {
  "choices": [
   "1005 W",
   "972 W",
   "0,27 W",
   "449 W"
  ],
  "good": 1,
  "explain": "0,34 × 110 × 26 = 972 W. A multiplie le volume des pièces (113,72 m³) au lieu du débit, C divise par 3 600 alors que le 0,34 contient déjà les heures, D prend ΔT = 19 + (−7) = 12 K au lieu de 26 K.",
  "juste": "972"
 },
 "ex2": {
  "choices": [
   "972 W",
   "425 W",
   "547 W",
   "565 W"
  ],
  "good": 2,
  "explain": "Qv de la salle = 110 × 63,96 ÷ 113,72 = 61,87 m³/h, puis 0,34 × 61,87 × 26 = 547 W. A donne tout le débit à la salle, B est la part du bureau, D multiplie le volume de la salle au lieu de sa part de débit."
 },
 "ex3": {
  "choices": [
   "194 W",
   "902 W",
   "219 W",
   "318 W"
  ],
  "good": 3,
  "explain": "110 × (1 − 0,8) + 14 = 36 m³/h, puis 0,34 × 36 × 26 = 318 W. A oublie les infiltrations, B multiplie le débit par η au lieu de 1 − η, C fait passer les infiltrations par l’échangeur.",
  "eta": "0,80",
  "qinf": "14"
 }
};
/*EXEMPLE-FIN*/

/* Exemples résolus réutilisés : sous les yeux au niveau 1 dans l'exercice, absents au niveau 2. */
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exempleFormule = () => BE.exemple({ text: `Débit d’air neuf de ${EX.form.q} m³/h, θi = ${EX.T.ti} °C, θe = ${EX.T.te} °C, donc ΔT = ${EX.T.dT} K`, answer: `Hv = 0,34 × ${EX.form.q} = ${EX.form.H} W/K ; Φv = ${EX.form.H} × ${EX.T.dT} = ${EX.form.phi} W`, why: "Le débit reste en m³/h et le résultat sort en W : le 0,34 contient déjà la conversion des heures." });
const exemplePartage = () => BE.exemple({ text: `Bureau d’exemple : V = ${EX.V.bureau} m³ ; salle de réunion : V = ${EX.V.salle} m³ ; débit retenu ${EX.qv} m³/h`, answer: `qv du bureau = ${EX.qv} × ${EX.V.bureau} ÷ ${EX.V.somme} = ${EX.part.q} m³/h ; Φv = 0,34 × ${EX.part.q} × ${EX.T.dT} = ${EX.part.phi} W`, why: `La somme ${EX.V.somme} m³ est celle des deux pièces qui reçoivent l’air neuf. Les sanitaires et le coin repas, où l’air est extrait, ne sont pas dans la somme.` });
const exempleDoubleFlux = () => BE.exemple({ text: `Bâtiment d’exemple en double flux : ${EX.qv} m³/h, efficacité ${EX.dfx.eta}, infiltrations ${EX.dfx.qinf} m³/h`, answer: `${EX.qv} × (1 − ${EX.dfx.eta}) + ${EX.dfx.qinf} = ${EX.dfx.qeq} m³/h ; Φv = 0,34 × ${EX.dfx.qeq} × ${EX.T.dT} = ${EX.dfx.phi} W`, why: "L’échangeur ne réduit que l’air qui passe par lui. Les infiltrations entrent par les fuites, à la température extérieure." });

/* Figures de méthode : schémas de principe tracés par outils/stations/t4-deperditions-air/schema.mjs, valeurs du bloc EXEMPLE. */
const figureFormule = () => BE.schema(SCH_FORMULE, `Schéma de principe. À gauche, dehors, une flèche bleue « air neuf, qv = ${EX.form.q} m³/h » à θe = ${EX.T.te} °C entre dans une pièce à θi = ${EX.T.ti} °C, où une flèche orange montre que l’air neuf s’y réchauffe. En dessous, quatre cases reliées par deux signes fois et un signe égal : qv, ${EX.form.q} m³/h ; 0,34, Wh/(m³.K) ; ΔT, ${EX.T.dT} K ; Φv, ${EX.form.phi} W. Deux lignes rappellent ΔT = θi − θe = ${EX.T.ti} − (${EX.T.te}) = ${EX.T.dT} K, puis Hv = 0,34 × ${EX.form.q} = ${EX.form.H} W/K et Φv = ${EX.form.H} × ${EX.T.dT} = ${EX.form.phi} W.`, "L’air neuf entre froid et se réchauffe dans la pièce : le débit, le 0,34 et l’écart de température donnent la puissance.");
const figureInfiltrations = () => BE.schema(SCH_INF, `Schéma de principe, vu de dessus. Un mur sépare dehors, à gauche, et dedans. Dans le mur, une grille d’entrée d’air laisse passer une flèche bleue épaisse : entrée d’air, ${EX.inf.entrees} m³/h. Autour de la fenêtre, deux flèches bleues fines passent par les joints : fuites aux joints, ${EX.inf.fuites} m³/h en tout. De l’autre côté, une flèche foncée sort par une bouche d’extraction : ${EX.qv} m³/h extraits. Sous le dessin : entrées d’air ${EX.inf.entrees} plus fuites ${EX.inf.fuites} égale ${EX.qv} m³/h extraits ; les fuites remplacent une partie des entrées d’air.`, "Tout l’air extrait entre quelque part : par les entrées d’air ou par les fuites, jamais en plus.");
const figurePartage = () => BE.schema(SCH_PARTAGE, `Plan de principe du bâtiment d’exemple, en deux colonnes. À gauche, les pièces principales : le bureau, ${EX.V.bureau} m³, et la salle de réunion, ${EX.V.salle} m³, chacune avec une flèche bleue d’entrée d’air. À droite, les pièces de service, en gris : les sanitaires, côté toilettes et côté lavabos, avec une flèche d’extraction qui sort de chacun (${EX.bouches}). Une flèche d’air de transfert va de chaque pièce principale vers la pièce de service voisine. Sous le plan : la somme des volumes des pièces qui reçoivent l’air neuf, ${EX.V.bureau} + ${EX.V.salle} = ${EX.V.somme} m³, et le débit extrait, donc retenu, ${EX.qv} m³/h.`, "L’air neuf entre par les pièces principales, la VMC l’extrait dans les pièces de service : seules les premières comptent dans la somme des volumes.");
const figureRecuperateur = () => BE.schema(SCH_REC, `Schéma de principe d’un échangeur de VMC double flux, au centre, avec quatre gaines. En haut à gauche, une flèche bleue entre : air neuf, à θe, froid. En haut à droite, une flèche orange entre : air extrait, à θi, chaud. Dans l’échangeur, deux traits se croisent : les deux flux ne se mélangent pas. En bas à droite, une flèche orange sort vers les pièces : air neuf réchauffé. En bas à gauche, une flèche bleue sort vers dehors : air rejeté, refroidi. Sous le dessin : η = ${EX.rec.eta}, il ne reste à chauffer que 1 − η ; Φv = 0,34 × ${EX.qv} × (1 − ${EX.rec.eta}) × ${EX.T.dT} = ${EX.rec.phi} W, au lieu de ${EX.ex1.juste} W sans échangeur.`, "L’air extrait, chaud, réchauffe l’air neuf dans l’échangeur : les deux flux se croisent sans se mélanger.");
const figureDoubleFlux = () => BE.schema(SCH_DFX, `Schéma de principe. En haut, l’air soufflé de ${EX.qv} m³/h part de dehors, passe dans un échangeur d’efficacité η = ${EX.dfx.eta} et arrive dans une grande case « débit à chauffer ». En dessous, les infiltrations de ${EX.dfx.qinf} m³/h arrivent dans la même case sans passer par l’échangeur. La case indique ${EX.dfx.qeq} m³/h. Sous le schéma : débit à chauffer = ${EX.qv} × (1 − ${EX.dfx.eta}) + ${EX.dfx.qinf} = ${EX.dfx.qeq} m³/h, puis Φv = 0,34 × ${EX.dfx.qeq} × ${EX.T.dT} = ${EX.dfx.phi} W.`, "Les infiltrations contournent l’échangeur : elles s’ajoutent au débit qu’il a déjà réduit.");
const figureParoisAir = () => BE.schema(SCH_PAROIS, `Une barre horizontale en deux morceaux, sous un repère « Total : ${EX.piece.total} W ». À gauche, le morceau bleu « Parois : ${EX.piece.parois} W », le plus long ; à droite, le morceau orange « Air : ${EX.piece.air} W ». Un repère sous le morceau orange indique : part de l’air, ${EX.piece.part} %. Deux lignes rappellent Φ total = Φ parois + Φv = ${EX.piece.parois} + ${EX.piece.air} = ${EX.piece.total} W, puis la part de l’air = ${EX.piece.air} ÷ ${EX.piece.total} × 100 = ${EX.piece.part} %.`, `Le bureau d’exemple : ${EX.piece.part} % de ses déperditions viennent de l’air neuf.`);

/* Écran « À vous, le projet » : la commande du moteur, suivie du lien vers l'extrait de CCTP du dossier. */
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      `Page ${EX.pages.conditions} du CCTP : θi et θe. Page ${EX.pages.ventilation} : les débits de la VMC et le débit total minimal. Les volumes des pièces sont sur votre relevé de la station T1, le Φ des parois du séjour-cuisine sur votre feuille de la station T3.`,
      "Retenez le débit total minimal (écran « Quel débit retenir »). Partagez-le entre les quatre pièces principales au prorata de leur volume (écran « Partager le débit entre les pièces »), puis Φv = 0,34 × qv × ΔT.",
      `Sur le bâtiment d’exemple : ${EX.qv} × ${EX.V.bureau} ÷ ${EX.V.somme} = ${EX.part.q} m³/h pour le bureau. Écrivez la même division avec le volume du séjour-cuisine et la somme des volumes des quatre pièces principales de la maison.`
    ],
    2: [
      `Page ${EX.pages.conditions} du CCTP pour les températures, page ${EX.pages.ventilation} pour la ventilation. Volumes : votre relevé de la station T1. Φ des parois de la chambre 1 : votre feuille de la station T3. Efficacité et infiltrations du double flux : dans la commande.`,
      "Classez d’abord chaque pièce : principale (elle reçoit l’air neuf) ou de service et circulation (air de transfert, 0 W). Partagez le débit retenu entre les pièces principales au prorata du volume. Pour la variante, appliquez l’écran « Double flux et infiltrations ».",
      `Sur le bâtiment d’exemple en double flux : ${EX.qv} × (1 − ${EX.dfx.eta}) + ${EX.dfx.qinf} = ${EX.dfx.qeq} m³/h, puis 0,34 × ${EX.dfx.qeq} × ${EX.T.dT} = ${EX.dfx.phi} W. Faites le même calcul avec les données de la maison.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensCctp = () => BE.liens([{ href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: `Températures de calcul à la page ${EX.pages.conditions}, ventilation à la page ${EX.pages.ventilation}` }]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + liensCctp(); };

BE.station({
  code: "BE-T4",
  titre: "Déperditions par l’air",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Séjour-cuisine de la maison, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Toute la maison, pièce par pièce, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "L’air neuf qui entre dans une maison arrive froid et doit être chauffé. Vous apprenez à calculer cette déperdition sur le bâtiment d’un bureau d’exemple, puis vous la calculez pour la maison, pièce par pièce, et vous la comparez à celle des parois.",
  note: "Les températures de calcul, les débits et les volumes du bâtiment d’exemple, les efficacités de récupérateur et les débits d’infiltration sont des valeurs d’exercice. Le coefficient 0,34 vient des règles Th-Bât 2017, fascicule Généralités, avec sa source. Les débits de la maison viennent du CCTP.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et chemin de l’air" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, CCTP et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Déperditions par l’air du séjour-cuisine de la maison de deux niveaux",
      delai: "Rendu en fin de séance",
      commande: [
        "Vous avez calculé à la station T3 ce que le séjour-cuisine perd par ses parois. Vous calculez maintenant ce qu’il perd par l’air neuf, puis vous comparez les deux. Suivez les étapes dans l’ordre.",
        `Étape 1. Page ${EX.pages.conditions} du CCTP : relevez θi et θe, puis calculez ΔT.`,
        `Étape 2. Page ${EX.pages.ventilation} du CCTP : relevez les débits à atteindre et le débit total minimal. Écrivez le débit que vous retenez et pourquoi (écran « Quel débit retenir »).`,
        "Étape 3. Recopiez de votre relevé de la station T1 le volume des quatre pièces principales, faites leur somme, puis calculez la part du débit qui entre par le séjour-cuisine.",
        "Étape 4. Calculez Hv et Φv du séjour-cuisine. Ajoutez le Φ de ses parois (votre feuille de la station T3) et calculez la part de l’air. Vérifiez Φv à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Vos résultats des stations T1 et T3", ou: "Volumes des pièces (T1) ; Φ du séjour-cuisine par ses parois (T3)" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: `Page ${EX.pages.conditions} : températures. Page ${EX.pages.ventilation} : ventilation, débits.` },
        { piece: "La méthode", ou: "Écrans de cette station, en particulier « Partager le débit entre les pièces »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Déperditions par l’air de la maison de deux niveaux, pièce par pièce, et variante double flux",
      delai: "Rendu en fin de séance",
      commande: `Établissez les déperditions par l’air de chaque pièce chauffée de la maison et leur total, avec la VMC simple flux hygroréglable du CCTP (pages ${EX.pages.conditions} et ${EX.pages.ventilation}). Justifiez le débit retenu et le classement de chaque pièce. Pour la chambre 1, ajoutez le Φ de ses parois (votre station T3) et donnez la part de l’air. Le maître d’ouvrage demande enfin une variante : VMC double flux avec un échangeur d’efficacité 0,85 et des infiltrations estimées à 25 m³/h, deux données de l’exercice. Calculez les déperditions par l’air de la maison dans ce cas et comparez. Citez la source de chaque donnée.`,
      pieces: [
        { piece: "Vos résultats des stations T1 et T3", ou: "Volumes de toutes les pièces (T1) ; Φ de la chambre 1 par ses parois (T3)" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: `Page ${EX.pages.conditions} : températures. Page ${EX.pages.ventilation} : ventilation, pièces principales et pièces de service, débits.` },
        { piece: "Données de la variante", ou: "Dans la commande : efficacité 0,85 ; infiltrations 25 m³/h" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-sej", libelle: "Φv du séjour-cuisine (air neuf)", unite: "W", min: 411, max: 437, indice: "Relisez l’écran « Quel débit retenir », puis « Partager le débit entre les pièces » : la somme des volumes est celle des quatre pièces principales seulement. Contrôlez ΔT et la formule à l’écran « La formule de l’air »." }
    ],
    2: [
      { id: "n2-ch1", libelle: "Φv de la chambre 1 (air neuf)", unite: "W", min: 129, max: 139, indice: "Relisez l’écran « Partager le débit entre les pièces » : seules les pièces principales reçoivent l’air neuf, et la chambre 1 n’en reçoit que sa part." },
      { id: "n2-maison", libelle: "Φv de la maison, somme des pièces", unite: "W", min: 742, max: 788, indice: "Relisez l’écran « Quel débit retenir » : le débit permanent, pas la pointe. Puis l’écran « La formule de l’air »." },
      { id: "n2-df", libelle: "Φv de la maison en double flux", unite: "W", min: 317, max: 337, indice: "Relisez l’écran « Double flux et infiltrations » : 1 − η sur le débit soufflé, les infiltrations ajoutées sans échangeur." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T5", titre: "Le bilan d’hiver", href: "../t5-bilan-hiver/index.html" },
  correspondances: [
    { reseau: "AéroRézo", titre: "Air neuf et sélection", href: "../../../aerorezo/stations/air-neuf-selection/index.html", pourquoi: "Cette station explique d’où vient le débit d’air neuf que vous chauffez ici." },
    { reseau: "AéroRézo", titre: "La récupération de chaleur", href: "../../../aerorezo/stations/recuperation/index.html", pourquoi: "Vous y voyez comment un échangeur récupère la chaleur de l’air extrait." },
    { reseau: "AéroRézo", titre: "Déperditions d’une pièce", href: "../../../aerorezo/stations/deperditions-piece/index.html", pourquoi: "Elle additionne déjà parois et air pour une pièce." },
    { reseau: "Bureau d’études", titre: "BE-T3, Déperditions d’un local par les parois", href: "../t3-deperditions-local/index.html", pourquoi: "Le Φ des parois que vous ajoutez ici se calcule à cette station." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/1-technicien-plan-pieces.webp", imageAlt: "Un technicien de bureau d’études, debout devant un grand panneau où est épinglé le plan d’une maison à deux niveaux, colle une petite carte bleu pâle sur chaque pièce chauffée. Une seule pièce, celle que désigne la commande, porte une étiquette orange. Sur le bureau : une calculatrice, un crayon et une feuille avec un tableau vide. Par la fenêtre, un arbre nu sous un ciel d’hiver.",
      text: "Une maison perd de la chaleur par ses parois, vous l’avez calculé à la station T3. Elle en perd aussi par l’air : la ventilation fait entrer de l’air neuf froid, qu’il faut chauffer jusqu’à la température de la pièce. Vous calculez cette déperdition par l’air pièce par pièce. Pour la pièce que désigne la commande, vous l’ajoutez à celle des parois. Les réponses s’écrivent sur la feuille A4 recto verso. L’écran explique chaque geste, la feuille reçoit vos résultats.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Pièce", "qv (m³/h)", "Hv (W/K)", "Φv (W)"], [
        ["Une ligne par pièce", "", "", ""],
        ["…", "", "", ""],
        ["Total", "", "", ""]
      ], "Le tableau des déperditions par l’air, vide") + tableau(["Pièce complète", "Φ parois (W)", "Φv (W)", "Φ total (W)", "Part de l’air"], [["La pièce de la commande", "", "", "", ""]], "La comparaison parois et air, pour la pièce que demande la commande")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "calculer les déperditions par l’air d’une pièce ou de toute la maison."], ["Le dossier :", "les pages 3 et 4 du CCTP, vos volumes de T1, vos résultats de T3."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "le débit d’air neuf de chaque pièce, Hv et Φv."], ["La comparaison :", "parois et air, en W et en pour cent. À l’écran Vérifier, Φv doit tomber dans une fourchette de ± 3 %."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T5, le bilan d’hiver."]] }
        ])
    }),

    BE.ecran({
      id: "chemin-de-l-air", dossier: "prise", kicker: "Prise en main, 2", title: "Le chemin de l’air", level: "comprendre",
      image: "illustrations/2-entree-air-et-bouche.webp", imageAlt: "Coupe de deux pièces voisines d’une maison récente, en hiver, sans personne. À gauche, une chambre avec un lit sous une fenêtre à double vitrage ; tout en haut du cadre de la fenêtre, une longue grille fine d’entrée d’air. Dehors, un arbre nu et un peu de neige. Sous la porte, un jour laisse passer l’air. À droite, au plafond de la salle d’eau, une bouche d’extraction ronde, au-dessus d’un lavabo et d’une douche. Une ligne orange ondulée suit le trajet de l’air : de la grille de la fenêtre, à travers la chambre, sous la porte, jusqu’à la bouche.",
      text: "La maison est ventilée par une VMC simple flux, une ventilation mécanique contrôlée qui extrait l’air avec un seul ventilateur. L’air neuf entre par les entrées d’air, des grilles posées dans les pièces principales : séjour et chambres. Il passe sous les portes vers les pièces de service : cuisine, salle d’eau, WC. Là, les bouches d’extraction le reprennent et la VMC le rejette dehors. L’air neuf arrive à la température extérieure et se réchauffe dans la pièce principale où il entre. Quand il passe dans une pièce de service, il est déjà à la température intérieure.",
      prompt: "Suivez les flèches du schéma, puis lisez le tableau des données.",
      render: () => BE.schema(SCHEMA, "Schéma de principe. À gauche, l’extérieur : une flèche « air neuf à θe » entre dans le rectangle des pièces principales, séjour et chambres, avec leurs entrées d’air. Une flèche descend vers le rectangle des pièces de service, cuisine, salle d’eau et WC, avec la mention « air de transfert, déjà à θi ». Une flèche sort des pièces de service vers la droite : « air rejeté par la VMC ».", "Le chemin de l’air dans une maison en VMC simple flux.")
        + tableau(["Donnée", "Où la lire"], [
          ["θi et θe", `Page ${EX.pages.conditions} du CCTP, valeurs d’exercice`],
          ["Système de ventilation, pièces principales et pièces de service", `Page ${EX.pages.ventilation} du CCTP`],
          ["Débits d’extraction", `Page ${EX.pages.ventilation} du CCTP, d’après l’arrêté du 24 mars 1982`],
          ["Volume de chaque pièce", "Votre relevé de la station T1"],
          ["Φ des parois d’une pièce", "Votre feuille de la station T3"]
        ], "Les données d’un calcul de déperditions par l’air")
    }),

    BE.ecran({
      id: "formule-de-l-air", dossier: "methode", kicker: "La méthode, 1", title: "La formule de l’air", level: "comprendre",
      text: `Pour chauffer un débit d’air de θe à θi, il faut une puissance Φv = 0,34 × qv × ΔT. qv est le débit d’air neuf en m³/h, ΔT = θi − θe en K, Φv sort en W. Le nombre 0,34 se lit en Wh/(m³.K) : c’est l’énergie qu’il faut pour chauffer un mètre cube d’air de 1 K. Comme il contient les heures, le débit reste en m³/h et on ne divise pas par 3 600. Écrivez qv au centième de m³/h, Hv au centième de W/K et Φv au watt, puis reprenez ces valeurs écrites dans le calcul suivant. La somme des qv écrits peut s’écarter du débit retenu de quelques centièmes. Le produit 0,34 × qv se note Hv, en W/K : c’est le pendant, pour l’air, du H des parois de la station T3. Les températures du bâtiment d’exemple sont celles de la station T3 : θi = ${EX.T.ti} °C et θe = ${EX.T.te} °C, valeurs d’exercice.`,
      prompt: "Regardez le schéma, lisez la formule, sa source et l’exemple résolu, puis continuez.",
      render: () => figureFormule() + tableau(["Formule", "Unités", "Source du 0,34"], [
        ["Hv = 0,34 × qv", "W/K = Wh/(m³.K) × m³/h", "Th-Bât Généralités, § 5.1, p. 18"],
        ["Φv = Hv × ΔT = 0,34 × qv × ΔT", "W = W/K × K", ""]
      ])
        + exempleFormule()
        + BE.renvoi("Le même fascicule écrit 0,33 à la formule 6 de la page 17. L’écart est de 3 % : on retient 0,34 dans tout le réseau.")
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, Φv d’un bâtiment", title: "Exercice : la déperdition par l’air du bâtiment d’exemple", level: "appliquer", requiresAction: true,
      text: {
        1: `Le bâtiment du bureau d’exemple est ventilé par une extraction de ${EX.qv} m³/h en tout : ${EX.bouches}. Ses deux pièces principales font ensemble ${EX.V.somme} m³. θi = ${EX.T.ti} °C, θe = ${EX.T.te} °C. Quelle puissance faut-il pour chauffer cet air neuf ? L’exemple résolu reste sous vos yeux : refaites le même geste.`,
        2: `Le bâtiment du bureau d’exemple est ventilé par une extraction de ${EX.qv} m³/h en tout : ${EX.bouches}. Ses deux pièces principales font ensemble ${EX.V.somme} m³. θi = ${EX.T.ti} °C, θe = ${EX.T.te} °C. Quelle puissance faut-il pour chauffer cet air neuf ?`
      },
      prompt: { 1: "Choisissez la bonne puissance, en vous aidant de l’exemple.", 2: "Choisissez la bonne puissance. Cette question est à faire seul." },
      aides: {
        1: ["Le débit, θi et θe sont dans l’énoncé. La formule est à l’écran « La formule de l’air ».", "Φv = 0,34 × qv × ΔT, avec qv en m³/h et ΔT = θi − θe. Le volume du bâtiment ne sert pas ici.", `Exemple : 0,34 × ${EX.form.q} × ${EX.T.dT} = ${EX.form.phi} W. Remplacez ${EX.form.q} par le débit de l’énoncé.`],
        2: ["Le débit, θi et θe sont dans l’énoncé ; la formule est à l’écran « La formule de l’air ».", "Le calcul se fait sur le débit, pas sur le volume. ΔT = θi − θe, avec θe négative.", `Pour ${EX.form.q} m³/h, on écrit 0,34 × ${EX.form.q} × ${EX.T.dT}. Écrivez la même ligne avec le débit de l’énoncé.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleFormule(), EX.ex1),
        2: BE.quiz(EX.ex1)
      })
    }),

    BE.ecran({
      id: "quel-debit-retenir", dossier: "methode", kicker: "La méthode, 2", title: "Quel débit retenir", level: "comprendre",
      image: "illustrations/3-cone-mesure-debit.webp", imageAlt: "Un technicien, debout dans une cuisine vide d’une maison récente, tient à deux mains un cône de mesure en toile orange sur une bouche d’extraction fixée haut sur le mur. Le cône est monté sur un petit boîtier gris à poignée dont l’écran est vide. À ses pieds, une mallette ouverte et un porte-bloc avec une feuille quadrillée de gris. Il est en chemise, sans casque ni gilet.",
      text: `Dans un logement, l’arrêté du 24 mars 1982 fixe les débits d’air extraits. Son article 3 donne, pour chaque pièce de service, le débit que la bouche doit pouvoir atteindre : ces débits sont des pointes, le temps de cuisiner ou de se doucher. Son article 4 autorise, avec une VMC hygroréglable, dont les bouches règlent leur débit selon l’humidité de la pièce, à descendre jusqu’à un débit total minimal, que la ventilation assure en permanence. Dans ce réseau, pour calculer les déperditions par l’air, on retient le débit que la ventilation assure en permanence : le débit total minimal de l’article 4, quand le CCTP prévoit une VMC hygroréglable. C’est un choix de l’exercice : sur un vrai projet, ce débit se lit dans l’avis technique du système. Pour la maison, les deux valeurs sont à la page ${EX.pages.ventilation} du CCTP. Le débit de cet exemple est une valeur d’exercice, plus faible que le minimum du Code du travail (art. R. 4222-6) : 30 m³/h par occupant en salle de réunion, soit 240 m³/h pour huit personnes. Le bâtiment du projet tertiaire applique ce minimum.`,
      prompt: "Lisez le tableau et l’exemple résolu, puis continuez.",
      render: () => tableau(["Débit", "Ce qu’il représente", "Retenu pour les déperditions"], [
        ["Débits à atteindre (art. 3)", "La pointe de chaque bouche, quelques minutes", "Non"],
        ["Débit total minimal (art. 4)", "Le débit assuré en permanence par la VMC hygroréglable", "Oui"]
      ], "Les deux débits du CCTP")
        + BE.exemple({ text: `CCTP d’exemple : bouches qui peuvent atteindre ${EX.pointe} m³/h en pointe ; débit assuré en permanence : ${EX.bouches}, soit ${EX.qv} m³/h (valeurs d’exercice)`, answer: `Débit retenu : ${EX.qv} m³/h`, why: "On retient le débit permanent. La pointe n’entre pas dans le calcul." })
    }),

    BE.ecran({
      id: "infiltrations", dossier: "methode", kicker: "La méthode, 3", title: "Les infiltrations", level: "comprendre",
      text: "Les infiltrations sont l’air qui entre par les défauts d’étanchéité de l’enveloppe : jonctions de menuiseries, passages de gaines, prises électriques. Avec une VMC simple flux, le ventilateur extrait un débit fixé et met la maison en légère dépression : tout l’air extrait doit entrer quelque part, par les entrées d’air ou par les fuites. L’air des infiltrations remplace donc une partie de celui des entrées d’air ; il ne s’ajoute pas au débit extrait. En simple flux, on chauffe le débit extrait, infiltrations comprises. Ce n’est plus vrai en double flux, vu plus loin.",
      prompt: "Regardez le schéma, lisez l’exemple résolu, puis continuez.",
      render: () => figureInfiltrations() + BE.exemple({ text: `Bâtiment d’exemple en simple flux : ${EX.qv} m³/h extraits, dont ${EX.inf.fuites} m³/h entrent par les fuites`, answer: `Entrées d’air : ${EX.qv} − ${EX.inf.fuites} = ${EX.inf.entrees} m³/h ; air neuf à chauffer : ${EX.inf.entrees} + ${EX.inf.fuites} = ${EX.qv} m³/h`, why: "Le débit d’air neuf est celui que la VMC extrait. Les fuites changent le chemin de l’air ; le débit reste celui que la VMC extrait." })
        + BE.alerte("<strong>Piège.</strong> Ajouter les infiltrations au débit d’une VMC simple flux compte deux fois le même air.")
    }),

    BE.ecran({
      id: "partager-le-debit", dossier: "methode", kicker: "La méthode, 4", title: "Partager le débit entre les pièces", level: "comprendre",
      text: "L’air neuf se réchauffe dans les pièces principales, là où il entre. C’est donc là que compte la déperdition par l’air. Le séjour-cuisine compte comme une pièce principale : l’air neuf y entre par le séjour, et la bouche de la cuisine le reprend dans la même pièce. Les pièces de service et les circulations, comme l’entrée ou le palier, reçoivent un air déjà à θi : leur déperdition par l’air vaut 0 W. Pour partager le débit retenu entre les pièces principales, on suit ici une règle de l’exercice : chacune en reçoit une part proportionnelle à son volume. qv de la pièce = qv retenu × volume de la pièce ÷ somme des volumes des pièces principales. La somme des parts redonne le débit retenu.",
      prompt: "Regardez le plan, lisez la formule et l’exemple résolu, puis continuez.",
      render: () => figurePartage() + tableau(["Pièce", "Reçoit", "qv de la pièce"], [
        ["Pièce principale (séjour, chambre, bureau, salle de réunion)", "L’air neuf, à θe", "qv retenu × V pièce ÷ somme des V des pièces principales"],
        ["Pièce de service, circulation", "L’air de transfert, à θi", "0 m³/h d’air neuf, donc Φv = 0 W"]
      ], "Le partage du débit, règle de l’exercice")
        + exemplePartage()
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, la part d’une pièce", title: "Exercice : la part de la salle de réunion", level: "appliquer", requiresAction: true,
      text: {
        1: `Dans le bâtiment d’exemple, l’air neuf entre par le bureau (${EX.V.bureau} m³) et par la salle de réunion (${EX.V.salle} m³, ${EX.salle}). Le débit retenu est de ${EX.qv} m³/h, ΔT = ${EX.T.dT} K. Quelle est la déperdition par l’air de la salle de réunion ? L’exemple du bureau reste sous vos yeux.`,
        2: `Dans le bâtiment d’exemple, l’air neuf entre par le bureau (${EX.V.bureau} m³) et par la salle de réunion (${EX.V.salle} m³, ${EX.salle}). Le débit retenu est de ${EX.qv} m³/h, ΔT = ${EX.T.dT} K. Quelle est la déperdition par l’air de la salle de réunion ?`
      },
      prompt: { 1: "Choisissez la bonne valeur, en vous aidant de l’exemple.", 2: "Choisissez la bonne valeur. Cette question est à faire seul." },
      aides: {
        1: ["Les volumes, le débit et ΔT sont dans l’énoncé. La règle est à l’écran « Partager le débit entre les pièces ».", "D’abord la part de débit de la salle : qv retenu × V de la salle ÷ somme des deux volumes. Ensuite Φv = 0,34 × qv × ΔT.", `Pour le bureau : ${EX.qv} × ${EX.V.bureau} ÷ ${EX.V.somme} = ${EX.part.q} m³/h. Faites la même division avec le volume de la salle.`],
        2: ["L’énoncé donne tout. La règle de partage et la formule sont aux écrans « Partager le débit entre les pièces » et « La formule de l’air ».", "La salle ne reçoit pas tout le débit : seulement sa part, proportionnelle à son volume.", `La somme des deux volumes vaut ${EX.V.somme} m³. La part de la salle est ${EX.qv} × ${EX.V.salle} ÷ ${EX.V.somme}.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exemplePartage(), EX.ex2),
        2: BE.quiz(EX.ex2)
      })
    }),

    BE.ecran({
      id: "piece-complete", dossier: "methode", kicker: "La méthode, 5", title: "La pièce complète : parois et air", level: "comprendre",
      text: "Les déperditions d’une pièce s’additionnent : celles des parois, calculées à la station T3, et celles de l’air. En W/K, H total = H des parois + Hv. En W, Φ total = Φ des parois + Φv, avec le même ΔT. Les ponts thermiques, les liaisons entre parois où la chaleur passe davantage, viendront s’ajouter au bilan de la station T5.",
      prompt: "Lisez le tableau du bureau d’exemple, puis continuez.",
      render: () => tableau(["Poste", "H (W/K)", "Φ (W)"], [
        ["Parois du bureau (station T3)", EX.piece.Hparois, EX.piece.parois],
        ["Air neuf du bureau (écran précédent)", EX.part.H, EX.piece.air],
        ["Total du bureau", EX.piece.Htot, EX.piece.total]
      ], `Bureau d’exemple, ΔT = ${EX.T.dT} K`)
    }),

    BE.ecran({
      id: "parois-contre-air", dossier: "methode", kicker: "La méthode, 6", title: "Comparer parois et air", level: "comprendre",
      text: "La part de l’air dans les déperditions d’une pièce se calcule en pour cent, avec les Φ écrits au watt : Φv ÷ Φ total × 100. Dans une construction récente bien isolée, les parois perdent peu et la part de l’air devient grande. C’est ce qui justifie, sur certains projets, une ventilation avec récupération de chaleur. Comparez la part de l’air entre les pièces d’un même bâtiment : une pièce très différente des autres appelle une vérification.",
      prompt: "Regardez le schéma, lisez l’exemple résolu, puis continuez.",
      render: () => figureParoisAir() + BE.exemple({ text: `Bureau d’exemple : Φv = ${EX.piece.air} W ; Φ total = ${EX.piece.total} W`, answer: `${EX.piece.air} ÷ ${EX.piece.total} × 100 = ${EX.piece.part} %`, why: "Le pourcentage s’écrit au dixième. Il dit quelle part de la puissance de chauffage sert à chauffer l’air neuf." })
    }),

    BE.ecran({
      id: "recuperateur", dossier: "methode", kicker: "La méthode, 7", title: "Le récupérateur", level: "comprendre",
      image: "illustrations/4-caisson-double-flux-comble.webp", imageAlt: "Coupe des combles d’une maison sous un toit de tuiles. Un caisson gris plat de ventilation double flux est posé sur une petite estrade en bois, entre les chevrons et une épaisse couche d’isolant. Quatre gaines rondes isolées partent de ses coins : deux montent vers l’extérieur par le toit, deux descendent à travers le plafond vers une chambre chauffée, où l’on voit deux petites grilles. Une découpe dans la face du caisson montre deux jeux de plaques fines qui se croisent sans se toucher, avec une ligne orange ondulée qui passe d’un flux à l’autre.",
      text: "Une VMC double flux souffle l’air neuf et extrait l’air vicié avec deux ventilateurs. Les deux flux traversent un échangeur sans se mélanger : l’air extrait, chaud, réchauffe l’air neuf avant qu’il entre. L’efficacité η de l’échangeur, un nombre entre 0 et 1 donné par le fabricant, dit quelle part de l’écart de température il récupère. Il ne reste à chauffer que la part 1 − η : Φv = 0,34 × qv × (1 − η) × ΔT.",
      prompt: "Regardez le schéma, lisez l’exemple résolu, puis continuez.",
      render: () => figureRecuperateur() + BE.exemple({ text: `Bâtiment d’exemple en double flux : ${EX.qv} m³/h, efficacité η = ${EX.rec.eta} (valeur d’exercice), ΔT = ${EX.T.dT} K`, answer: `Φv = 0,34 × ${EX.qv} × (1 − ${EX.rec.eta}) × ${EX.T.dT} = ${EX.rec.phi} W`, why: `Sans échangeur, ce débit coûtait ${EX.ex1.juste} W. L’échangeur en récupère la part η.` })
        + BE.renvoi('Le fonctionnement de l’échangeur est expliqué dans la station AéroRézo <a href="../../../aerorezo/stations/recuperation/index.html">« La récupération de chaleur »</a>.')
    }),

    BE.ecran({
      id: "double-flux-infiltrations", dossier: "methode", kicker: "La méthode, 8", title: "Double flux et infiltrations", level: "comprendre",
      text: "En double flux, le soufflage et l’extraction sont équilibrés : la maison n’est plus en dépression. L’air qui entre par les fuites s’ajoute alors au débit soufflé, et il ne passe pas par l’échangeur : il arrive à θe. Le débit à chauffer devient qv × (1 − η) + qinf, où qinf est le débit d’infiltration. Plus l’efficacité η est grande, plus les infiltrations pèsent dans le débit à chauffer : un bâtiment en double flux doit être étanche.",
      prompt: "Regardez le schéma, lisez la formule et l’exemple résolu, puis continuez.",
      render: () => figureDoubleFlux() + tableau(["Ventilation", "Débit à chauffer (m³/h)", "Φv (W)"], [
        ["Simple flux", "qv, infiltrations comprises", "0,34 × qv × ΔT"],
        ["Double flux", "qv × (1 − η) + qinf", "0,34 × (qv × (1 − η) + qinf) × ΔT"]
      ], "Le débit à chauffer selon la ventilation")
        + exempleDoubleFlux()
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, le double flux", title: "Exercice : un autre récupérateur", level: "appliquer", requiresAction: true,
      text: {
        1: `Le bâtiment d’exemple passe à un échangeur d’efficacité η = ${EX.ex3.eta}, avec ${EX.ex3.qinf} m³/h d’infiltrations (valeurs d’exercice). Le débit soufflé reste de ${EX.qv} m³/h, ΔT = ${EX.T.dT} K. Quelle est la déperdition par l’air du bâtiment ? L’exemple résolu reste sous vos yeux.`,
        2: `Le bâtiment d’exemple passe à un échangeur d’efficacité η = ${EX.ex3.eta}, avec ${EX.ex3.qinf} m³/h d’infiltrations (valeurs d’exercice). Le débit soufflé reste de ${EX.qv} m³/h, ΔT = ${EX.T.dT} K. Quelle est la déperdition par l’air du bâtiment ?`
      },
      prompt: { 1: "Choisissez la bonne valeur, en vous aidant de l’exemple.", 2: "Choisissez la bonne valeur. Cette question est à faire seul." },
      aides: {
        1: ["η, qinf, le débit et ΔT sont dans l’énoncé. La formule est à l’écran « Double flux et infiltrations ».", "Débit à chauffer = qv × (1 − η) + qinf. Puis Φv = 0,34 × débit à chauffer × ΔT.", `Exemple : ${EX.qv} × (1 − ${EX.dfx.eta}) + ${EX.dfx.qinf} = ${EX.dfx.qeq} m³/h. Refaites-le avec η = ${EX.ex3.eta} et qinf = ${EX.ex3.qinf}.`],
        2: ["η, qinf, le débit et ΔT sont dans l’énoncé ; la formule est à l’écran « Double flux et infiltrations ».", "L’échangeur réduit le débit soufflé, pas les infiltrations. On multiplie par 1 − η, pas par η.", `Le débit soufflé réduit vaut ${EX.qv} × (1 − ${EX.ex3.eta}). Ajoutez-y les infiltrations, puis appliquez la formule de l’air.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleDoubleFlux(), EX.ex3),
        2: BE.quiz(EX.ex3)
      })
    }),

    BE.ecran({
      id: "ce-qui-reste", dossier: "methode", kicker: "La méthode, 9", title: "Ce qui reste pour le bilan", level: "comprendre",
      text: "Avec les parois de la station T3 et l’air de cette station, chaque pièce a ses deux principaux postes de déperdition. Le bilan d’hiver de la station T5 y ajoute les ponts thermiques, fait le total de la maison et choisit la puissance à installer. Gardez donc votre tableau pièce par pièce : la station T5 le reprend.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Station T3", rows: [["Les parois :", "Φ = H × ΔT, paroi par paroi."]] },
        { title: "Cette station", rows: [["L’air :", "Φv = 0,34 × qv × ΔT, pièce par pièce."]] },
        { title: "Station T5", rows: [["Le bilan :", "ponts thermiques (liaisons entre parois où la chaleur passe davantage), total de la maison, puissance à installer."]] }
      ])
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

/* Station BE-T6 : Été 1, le soleil.
   Méthode sur le petit bâtiment de bureaux d'exemple de la station T5, puis commande sur la maison. Les valeurs de l'exemple (bloc EXEMPLE)
   et les bornes des fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/t6-ete-vitrages-soleil/construire.mjs : le premier vient de
   exemple-data.mjs, les secondes de corriges/t6-ete-vitrages-soleil/reference-soleil.json (outils/t6-soleil-maison.mjs, tolérance 3 %).
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes et les données de la commande le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "heures": [
  "8",
  "10",
  "12",
  "14",
  "16"
 ],
 "or": [
  {
   "k": "S",
   "nom": "Sud"
  },
  {
   "k": "E",
   "nom": "Est"
  },
  {
   "k": "O",
   "nom": "Ouest"
  },
  {
   "k": "N",
   "nom": "Nord"
  }
 ],
 "I": {
  "8": {
   "S": "160",
   "E": "730",
   "O": "110",
   "N": "110"
  },
  "10": {
   "S": "400",
   "E": "540",
   "O": "140",
   "N": "140"
  },
  "12": {
   "S": "490",
   "E": "150",
   "O": "150",
   "N": "150"
  },
  "14": {
   "S": "400",
   "E": "140",
   "O": "540",
   "N": "140"
  },
  "16": {
   "S": "160",
   "E": "110",
   "O": "730",
   "N": "110"
  }
 },
 "sw": {
  "sans": "0,45",
  "int": "0,35",
  "ext": "0,12"
 },
 "par": [
  {
   "nom": "Sud",
   "baies": "Fb",
   "A": "2,40",
   "AS": "1,08",
   "phi": [
    "173",
    "432",
    "529",
    "432",
    "173"
   ]
  },
  {
   "nom": "Est",
   "baies": "Fe",
   "A": "0,60",
   "AS": "0,27",
   "phi": [
    "197",
    "146",
    "41",
    "38",
    "30"
   ]
  },
  {
   "nom": "Ouest",
   "baies": "Fc, Fd",
   "A": "4,00",
   "AS": "1,80",
   "phi": [
    "198",
    "252",
    "270",
    "972",
    "1314"
   ]
  },
  {
   "nom": "Nord",
   "baies": "Fa",
   "A": "1,61",
   "AS": "0,72",
   "phi": [
    "79",
    "101",
    "108",
    "101",
    "79"
   ]
  }
 ],
 "tot": [
  "647",
  "931",
  "948",
  "1543",
  "1596"
 ],
 "pointe": "16",
 "max": "1596",
 "locaux": [
  {
   "nom": "Bureau",
   "phi": [
    "79",
    "101",
    "108",
    "101",
    "79"
   ],
   "pointe": "12",
   "max": "108"
  },
  {
   "nom": "Salle de réunion",
   "phi": [
    "371",
    "684",
    "799",
    "1404",
    "1487"
   ],
   "pointe": "16",
   "max": "1487"
  },
  {
   "nom": "Sanitaires",
   "phi": [
    "197",
    "146",
    "41",
    "38",
    "30"
   ],
   "pointe": "8",
   "max": "197"
  }
 ],
 "sommeMax": "1792",
 "baie": {
  "rep": "Fc",
  "or": "ouest",
  "orNom": "Ouest",
  "h": "16",
  "L": "1,60",
  "H": "1,25",
  "A": "2,00",
  "AS": "0,90",
  "I": "730",
  "phi": "657"
 },
 "masque": {
  "rep": "Fb",
  "or": "sud",
  "h": "12",
  "A": "2,40",
  "Fm": "0,70",
  "I": "490",
  "cas": [
   {
    "nom": "Sans protection, sans masque",
    "Sw": "0,45",
    "Fm": "1",
    "AS": "1,08",
    "phi": "529"
   },
   {
    "nom": "Sous le balcon, sans protection",
    "Sw": "0,45",
    "Fm": "0,70",
    "AS": "0,76",
    "phi": "372"
   },
   {
    "nom": "Store intérieur baissé, sans masque",
    "Sw": "0,35",
    "Fm": "1",
    "AS": "0,84",
    "phi": "412"
   },
   {
    "nom": "Protection extérieure baissée, sans masque",
    "Sw": "0,12",
    "Fm": "1",
    "AS": "0,29",
    "phi": "142"
   }
  ],
  "baisseInt": "22",
  "baisseExt": "73"
 },
 "ex1": {
  "L": "1,50",
  "H": "1,20",
  "A": "1,80",
  "h": "8",
  "quiz": {
   "choices": [
    "A × Sw = 1,80 m² ; Φ = 1314 W",
    "A × Sw = 0,81 m² ; Φ = 591 W",
    "A × Sw = 0,81 m² ; Φ = 89 W",
    "A × Sw = 0,81 m² ; Φ = 437 W"
   ],
   "good": 1,
   "explain": "A = 1,50 × 1,20 = 1,80 m² ; 1,80 × 0,45 = 0,81 m² ; 0,81 × 730 = 591 W. A oublie Sw, C lit I à 16 h, D lit I à 10 h : la façade est reçoit son maximum le matin."
  }
 },
 "ex2": {
  "L": "1,25",
  "H": "1,20",
  "A": "1,50",
  "Fm": "0,70",
  "h": "12",
  "quiz": {
   "choices": [
    "A × Sw × Fm = 0,18 m² ; Φ = 88 W",
    "A × Sw × Fm = 0,13 m² ; Φ = 64 W",
    "A × Sw × Fm = 0,37 m² ; Φ = 181 W",
    "A × Sw × Fm = 0,47 m² ; Φ = 230 W"
   ],
   "good": 1,
   "explain": "1,50 × 0,12 × 0,70 = 0,13 m², puis × 490 = 64 W. A oublie le balcon, C prend le Sw d’un store intérieur, D oublie le store."
  }
 },
 "ex3": {
  "ASE": "1,20",
  "ASO": "0,90",
  "quiz": {
   "choices": [
    "16 h ; Φ = 789 W",
    "8 h ; Φ = 975 W",
    "12 h ; Φ = 315 W",
    "Somme des deux maximums ; Φ = 1533 W"
   ],
   "good": 1,
   "explain": "Sommes : 8 h 975 W, 10 h 774 W, 12 h 315 W, 14 h 654 W, 16 h 789 W. La plus forte est à 8 h. A croit que l’après-midi chauffe toujours plus, C prend midi, D additionne deux maximums qui n’arrivent pas à la même heure."
  }
 },
 "maison": {
  "sw": "0,45",
  "swInt": "0,35",
  "swExt": "0,12",
  "fm": "1"
 }
};
/*EXEMPLE-FIN*/

const H = EX.heures.map(h => h + " h");
/* Le tableau du rayonnement : une ligne par façade, une colonne par heure solaire. */
const tableauI = (legende = "Rayonnement solaire I reçu par une façade verticale, en W/m², ciel clair, juillet (données de l’exercice)") =>
  tableau(["Façade", ...H], EX.or.map(o => [o.nom, ...EX.heures.map(h => EX.I[h][o.k])]), legende);
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const exempleBaie = () => BE.exemple({ text: `Fenêtre ${EX.baie.rep} de la salle de réunion, façade ${EX.baie.or}, ${EX.baie.L} × ${EX.baie.H} m, sans protection ni masque, à ${EX.baie.h} h solaires`, answer: `A = ${EX.baie.A} m² ; A × Sw × Fm = ${EX.baie.A} × ${EX.sw.sans} × 1 = ${EX.baie.AS} m² ; Φ = ${EX.baie.AS} × ${EX.baie.I} = ${EX.baie.phi} W`, why: `I = ${EX.baie.I} W/m² se lit sur la ligne ${EX.baie.orNom}, colonne ${EX.baie.h} h, du tableau du rayonnement. A × Sw × Fm s’écrit au centième de m², Φ au watt.` });
const exempleMasque = () => BE.exemple({ text: `Fenêtre ${EX.masque.rep}, façade ${EX.masque.or}, ${EX.masque.A} m², sous un balcon (Fm = ${EX.masque.Fm}), sans protection, à ${EX.masque.h} h solaires (I = ${EX.masque.I} W/m²)`, answer: `A × Sw × Fm = ${EX.masque.A} × ${EX.sw.sans} × ${EX.masque.Fm} = ${EX.masque.cas[1].AS} m² ; Φ = ${EX.masque.cas[1].AS} × ${EX.masque.I} = ${EX.masque.cas[1].phi} W`, why: `Sans le balcon, la même fenêtre apporte ${EX.masque.cas[0].phi} W. Sw et Fm se multiplient l’un par l’autre.` });
const exempleTableau = () => tableau(["Orientation", "A × Sw (m²)", ...H], [...EX.par.map(l => [l.nom, l.AS, ...l.phi]), ["Somme (W)", "", ...EX.tot]], "Bâtiment d’exemple : apports solaires heure par heure, en W");

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Les baies sont dans le tableau des menuiseries, page 5 des plans : colonnes Repère, Type, Larg., Haut., Pièce et Orient. Sw, Fm et le tableau du rayonnement I sont dans la commande ci-dessus et sur la feuille. Le total nord de la station T1 compte la porte d’entrée : retirez-la.",
      "Une ligne par orientation : A = somme des L × H des fenêtres et portes-fenêtres de cette orientation, puis A × Sw au centième de m². Ensuite, chaque A × Sw multiplié par le I de chaque heure, et la somme de chaque colonne (écrans « Le tableau heure par heure » et « L’heure de pointe »).",
      `Sur le bâtiment d’exemple, la ligne ouest s’écrit A = 2 × 1,60 × 1,25 = ${EX.par[2].A} m², A × Sw = ${EX.par[2].AS} m², puis ${EX.par[2].AS} × ${EX.I["16"].O} = ${EX.par[2].phi[4]} W à 16 h. Pour la maison, la porte d’entrée pleine, la porte de service et la porte du garage n’ont pas de ligne.`
    ],
    2: [
      "Les baies de chaque pièce sont dans le tableau des menuiseries, page 5 des plans : colonnes Pièce, Orient., Larg. et Haut. Sw, Fm et le tableau du rayonnement I sont dans la commande et sur la feuille.",
      "Pour chaque pièce chauffée, une ligne par orientation de ses baies (A × Sw au centième de m²), puis la somme de ses lignes à chaque heure (écran « L’heure de pointe », tableau des locaux). La maison à chaque heure est la somme des pièces ; le calcul par orientation peut en différer de quelques watts, à cause des arrondis des A × Sw. Pour les volets sud baissés, refaites le tableau par orientation avec Sw = 0,12 pour le sud.",
      `Sur le bâtiment d’exemple, la salle de réunion a deux lignes : sud ${EX.par[0].AS} m² et ouest ${EX.par[2].AS} m². Sa somme vaut ${EX.locaux[1].phi[4]} W à 16 h, son heure de pointe. Faites de même pour le séjour-cuisine, qui a des baies sur trois façades.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensDossier = () => BE.liens([
  { href: DOSSIER + "plans-maison.pdf", title: "Les plans de la maison", note: "Tableau des menuiseries à la page 5 : repère, dimensions de tableau, pièce, orientation" },
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Menuiseries à la page 2, volets roulants à la page 4" }
]);
ecranProjet.render = () => { const html = rendreCommande(); return html.includes("partie-reservee") ? html : html + tableauI("Le rayonnement I de la commande, en W/m², heures solaires") + liensDossier(); };

BE.station({
  code: "BE-T6",
  titre: "Été 1 : le soleil",
  ligne: "Thermique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "La maison entière, par orientation, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison pièce par pièce, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "En été, le soleil qui traverse les vitrages chauffe les pièces. Vous calculez cet apport baie par baie, heure par heure, sur une journée claire de juillet. Vous trouvez l’heure de pointe et vous chiffrez l’effet d’une protection solaire. Vous apprenez la méthode sur un petit bâtiment d’exemple, puis vous la faites sur la maison.",
  note: "Le rayonnement solaire, les facteurs solaires des baies et les coefficients de masque sont des données de l’exercice. Sur un vrai projet, ils viennent des données climatiques du projet, de la fiche du fabricant de la menuiserie et du logiciel de calcul des apports.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande, plans et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Apports solaires par les vitrages de la maison, heure de pointe, effet des volets roulants",
      delai: "Rendu en fin de séance",
      commande: [
        `Le CCTP ne prévoit pas de climatisation : le confort d’été repose sur les volets roulants des baies (page 4). Le maître d’ouvrage veut connaître la chaleur que le soleil fait entrer par les vitrages de la maison un jour clair de juillet, volets ouverts, et ce que gagnent les volets baissés, comparés à un store intérieur. Données de l’exercice fixées par le bureau d’études : le rayonnement I du tableau ci-dessous, reproduit sur la feuille ; Sw = ${EX.maison.sw} volets ouverts, ${EX.maison.swInt} avec un store intérieur baissé, ${EX.maison.swExt} volets roulants baissés (protection extérieure) ; Fm = ${EX.maison.fm}, le débord de toit est négligé. Suivez les étapes dans l’ordre.`,
        "Étape 1. Au recto, une ligne par orientation. Dans le tableau des menuiseries (page 5 des plans), relevez les repères des fenêtres et portes-fenêtres de chaque orientation, sans les portes pleines ni la porte du garage. Si vous partez du total de la station T1, retirez-en la porte d’entrée au nord. Calculez A, somme des L × H, puis A × Sw au centième de m².",
        "Étape 2. Au verso, multipliez chaque A × Sw par le I de chaque heure, puis additionnez chaque colonne. Écrivez l’heure de pointe et Φ max.",
        "Étape 3. À l’heure de pointe, refaites la somme avec un store intérieur sur toutes les baies, puis avec les volets roulants baissés sur toutes les baies. Écrivez la baisse en %, puis les trois lignes de la note. Vérifiez Φ max et Φ volets baissés à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Page 5 : tableau des menuiseries, avec l’orientation de chaque baie" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 2 : la menuiserie et son vitrage. Page 4 : volets roulants, pas de climatisation" },
        { piece: "Rayonnement I, Sw et Fm", ou: "Cette commande, données de l’exercice" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Apports solaires par les vitrages de la maison, pièce par pièce, heure de pointe et volets sud baissés",
      delai: "Rendu en fin de séance",
      commande: `Le CCTP ne prévoit pas de climatisation : le confort d’été repose sur les volets roulants des baies (page 4). Le maître d’ouvrage veut connaître, pièce par pièce, la chaleur que le soleil fait entrer par les vitrages de la maison un jour clair de juillet, volets ouverts, puis l’effet des volets baissés sur les seules baies sud. Données de l’exercice fixées par le bureau d’études : le rayonnement I du tableau ci-dessous, reproduit sur la feuille ; Sw = ${EX.maison.sw} volets ouverts, ${EX.maison.swExt} volets roulants baissés (protection extérieure) ; Fm = ${EX.maison.fm}, le débord de toit est négligé. Établissez le tableau heure par heure des huit pièces chauffées (détail des A × Sw sur une feuille quadrillée jointe), l’heure de pointe et le maximum de chaque pièce, puis la maison à son heure de pointe, comparée à la somme des maximums des pièces. Refaites le tableau de la maison avec les volets baissés sur les baies sud seulement, trouvez sa nouvelle heure de pointe, et rendez la première page de la note de calcul, avec la source de chaque donnée.`,
      pieces: [
        { piece: "Plans de la maison (plans-maison.pdf)", ou: "Page 5 : tableau des menuiseries, avec la pièce et l’orientation de chaque baie" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 2 : la menuiserie et son vitrage. Page 4 : volets roulants, pas de climatisation" },
        { piece: "Rayonnement I, Sw et Fm", ou: "Cette commande, données de l’exercice" },
        { piece: "Feuille réponse niveau 2 et une feuille quadrillée", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-max", libelle: "Φ max de la maison, sans protection", unite: "W", min: 3685, max: 3913, indice: "Relisez les écrans « Le tableau heure par heure » et « L’heure de pointe » : une ligne par orientation, A × Sw × I, puis la somme de chaque colonne ; Φ max est la plus forte somme, à une seule heure. Contrôlez que les portes pleines n’ont pas de ligne." },
      { id: "n1-ext", libelle: "Φ à l’heure de pointe, volets roulants baissés sur toutes les baies", unite: "W", min: 983, max: 1045, indice: "Relisez l’écran « Protections solaires et masques » : les volets roulants baissés sont une protection extérieure, Sw = 0,12. Refaites la somme à l’heure de pointe trouvée sans protection." }
    ],
    2: [
      { id: "n2-sej", libelle: "Φ max du séjour-cuisine", unite: "W", min: 2030, max: 2156, indice: "Relisez l’écran « L’heure de pointe » : le séjour-cuisine a des baies sur trois façades ; son maximum est la plus forte somme de ses lignes, à sa propre heure de pointe." },
      { id: "n2-heure", libelle: "Heure de pointe de la maison, volets sud baissés (heure solaire)", unite: "h", min: 8, max: 8, indice: "Relisez l’écran « L’heure de pointe » : avec les volets sud baissés, refaites les cinq colonnes ; la plus forte somme ne tombe plus forcément à la même heure. Écrivez l’heure seule, en heures solaires." },
      { id: "n2-sud", libelle: "Φ max de la maison, volets sud baissés", unite: "W", min: 2401, max: 2551, indice: "Seules les baies sud prennent Sw = 0,12, volets baissés ; les autres gardent 0,45. Refaites les cinq colonnes, puis gardez la plus forte somme." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-T7", titre: "Été 2 : apports internes", href: "../t7-ete-apports-internes/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-T1, Surfaces et volumes", href: "../t1-surfaces-volumes/index.html", pourquoi: "Les baies de chaque orientation que vous reprenez ici ont été relevées à cette station." },
    { reseau: "Bureau d’études", titre: "BE-E1, Le climat du site", href: "../e1-climat-site/index.html", pourquoi: "Les conditions d’été du site se trouvent à cette station." },
    { reseau: "AéroRézo", titre: "Occupants, équipements et soleil", href: "../../../aerorezo/stations/internes-solaires/index.html", pourquoi: "Vous y voyez pourquoi une protection extérieure agit plus qu’un rideau intérieur, et pourquoi on n’additionne pas tous les maximums." },
    { reseau: "Bureau d’études", titre: "BE-T8, Été 3 : la synthèse", href: "../t8-ete-air-neuf-synthese/index.html", pourquoi: "Les apports solaires trouvés ici entrent dans la somme du bilan d’été." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/1-bureau-baie-plein-soleil.webp",
      imageAlt: "Un bureau lumineux dont le mur du fond est une grande baie vitrée. Le soleil de l’après-midi entre par la baie et dessine de larges taches de lumière orange sur le sol et sur un coin de table. Sur la table, un dossier ouvert à un tableau vide, un crayon et une calculatrice. Personne dans la pièce.",
      text: "Vous recevez la commande d’un bureau d’études : chiffrer la chaleur que le soleil fait entrer par les vitrages de la maison, un jour clair de juillet. C’est le premier apport du bilan d’été. Vous calculez l’apport de chaque façade à cinq heures de la journée, vous trouvez l’heure de pointe, l’heure où le soleil apporte le plus, et vous chiffrez ce que change une protection solaire. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez le tableau à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Orientation", "A × Sw (m²)", ...H], [...EX.or.map(o => [o.nom, "", "", "", "", "", ""]), ["Somme (W)", "", "", "", "", "", ""]], "Le tableau des apports solaires, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "les apports solaires de la maison en juillet."], ["Le dossier :", "le tableau des menuiseries, le CCTP, trois données de l’exercice."]] },
          { title: "Vous produisez", rows: [["Le tableau :", "une ligne par orientation, une colonne par heure."], ["Le résultat :", "l’heure de pointe, Φ max, l’effet d’une protection. Fourchette de ± 3 % à l’écran Vérifier."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station T7, les apports internes et les parois."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les baies vitrées de la maison sont dans le tableau des menuiseries, page 5 des plans : repère, largeur et hauteur de tableau, pièce et orientation de chaque baie. La station T1 vous a déjà donné le total des baies de chaque orientation. Ce total compte aussi la porte d’entrée pleine, au nord : retirez-la. La porte de service donne sur le garage : elle n’est pas dans les totaux des murs extérieurs. Les baies ont des volets roulants (page 4 du CCTP). Trois données sont fixées par la commande du bureau d’études : le rayonnement solaire reçu par chaque façade, le facteur solaire des baies et le coefficient de masque. Sur un vrai projet, le rayonnement vient des données climatiques du projet ou du logiciel de calcul des apports, le facteur solaire de la fiche du fabricant de la menuiserie.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Baies : repère, largeur, hauteur, pièce, orientation", "Tableau des menuiseries, page 5 des plans"],
        ["Total des baies de chaque orientation", "Votre feuille de la station T1"],
        ["Vitrage et menuiserie", "Page 2 du CCTP"],
        ["Volets roulants des baies, pas de climatisation", "Page 4 du CCTP"],
        ["Rayonnement solaire I, par façade et par heure", "La commande, données de l’exercice"],
        ["Facteur solaire Sw des baies", "La commande, données de l’exercice"],
        ["Coefficient de masque Fm", "La commande, donnée de l’exercice"]
      ], "Les données des apports solaires")
        + BE.renvoi(`Le tableau des menuiseries de la maison : <a href="${DOSSIER}svg/tableau-menuiseries.svg">ouvrir le tableau des menuiseries</a>.`)
    }),

    BE.ecran({
      id: "soleil-facade", dossier: "methode", kicker: "La méthode, 1", title: "Le soleil sur une façade", level: "comprendre",
      image: "illustrations/3-technicien-boussole-facades.webp",
      imageAlt: "Un technicien de bureau d’études, de profil, se tient sur le terrain devant une maison de plain-pied. Il porte un casque blanc, un gilet de haute visibilité orange et des chaussures de sécurité. D’une main il tient un plan imprimé, de l’autre une boussole, et il regarde les murs. Le soleil est bas à droite : le mur de droite est éclairé, le mur de gauche est à l’ombre.",
      text: "Le soleil se lève à l’est, passe au sud à midi et se couche à l’ouest. Une façade reçoit donc son plus fort rayonnement à une heure qui dépend de son orientation : l’est le matin, le sud autour de midi, l’ouest l’après-midi. La façade nord ne reçoit presque que la lumière du ciel. Le tableau donne le rayonnement solaire I, en W/m², reçu par une façade verticale un jour clair de juillet à la latitude de Marseille. Les heures sont des heures solaires : à 12 h solaires, le soleil est plein sud. En été, l’heure de la montre est en avance sur l’heure solaire. Ce tableau est une donnée de l’exercice. Il sert à l’exemple et à la maison, qui sont à la même latitude.",
      prompt: "Regardez le schéma, lisez le tableau et l’exemple de lecture, puis continuez.",
      render: () => BE.schema("illustrations/schema-soleil-facade.svg", `Schéma du bâtiment d’exemple vu de dessus, le nord en haut. Le trajet du soleil est un demi-cercle en pointillés autour du bâtiment, de l’est à droite jusqu’à l’ouest à gauche, en passant par le sud en bas. À 8 h, le soleil est à l’est : il éclaire la façade est, qui reçoit ${EX.I["8"].E} W/m². À 12 h, il est au sud : la façade sud reçoit ${EX.I["12"].S} W/m². À 16 h, il est à l’ouest : la façade ouest reçoit ${EX.I["16"].O} W/m². Chaque façade éclairée est tracée en orange, avec deux flèches de rayons. La façade nord reste à l’ombre : elle ne reçoit que la lumière du ciel, ${EX.I["12"].N} W/m² au plus.`, "Le soleil éclaire l’est le matin, le sud à midi, l’ouest l’après-midi.")
        + tableauI()
        + BE.exemple({ text: `Façade ouest, à ${EX.baie.h} h solaires`, answer: `I = ${EX.baie.I} W/m²`, why: `Ligne Ouest, colonne ${EX.baie.h} h. À la même heure, la façade est ne reçoit que ${EX.I[EX.baie.h].E} W/m².` })
    }),

    BE.ecran({
      id: "facteur-solaire", dossier: "methode", kicker: "La méthode, 2", title: "Le facteur solaire d’une baie", level: "comprendre",
      text: "Une baie ne laisse pas entrer tout le rayonnement qu’elle reçoit. Le vitrage en renvoie une partie vers l’extérieur et en absorbe une autre, et le cadre est opaque. Le facteur solaire Sw de la baie est la part du rayonnement reçu qui entre dans le local sous forme de chaleur. C’est un nombre sans unité, entre 0 et 1. Il est donné pour la baie entière, menuiserie comprise : il se multiplie par la surface de la baie en dimensions de tableau, la largeur et la hauteur de l’ouverture dans le mur, écrites au tableau des menuiseries. Une protection solaire baissée change le facteur solaire de la baie. Un brise-soleil orientable est un store extérieur à lames réglables.",
      prompt: "Regardez le schéma, lisez les trois valeurs de l’exercice, puis continuez.",
      render: () => BE.schema("illustrations/schema-facteur-solaire.svg", `Coupe d’une baie, le dehors à gauche et le dedans à droite. Le soleil, en haut à gauche, envoie un rayonnement I sur le vitrage, flèche orange. Une partie est renvoyée dehors, flèche bleue qui repart vers la gauche. Une autre partie est absorbée par le vitrage, puis rendue en partie dedans, flèche en pointillés. Le reste entre dans le local, flèche orange qui traverse le vitrage. Le cadre, en haut et en bas du vitrage, est opaque. Sw est la part du rayonnement reçu qui entre dans le local : ${EX.sw.sans} sans protection, soit 45 %.`, "Une baie renvoie une partie du rayonnement, en absorbe une autre et laisse entrer le reste : c’est Sw.")
        + tableau(["Baie à double vitrage, menuiserie PVC", "Sw"], [
        ["Sans protection", EX.sw.sans],
        ["Store intérieur clair baissé", EX.sw.int],
        ["Protection extérieure baissée : volet roulant, store extérieur ou brise-soleil orientable", EX.sw.ext]
      ], "Facteurs solaires de baie, données de l’exercice")
        + BE.renvoi("Sur un vrai projet, Sw se lit sur la fiche du fabricant de la menuiserie et de sa protection.")
    }),

    BE.ecran({
      id: "apport-baie", dossier: "methode", kicker: "La méthode, 3", title: "L’apport solaire d’une baie", level: "comprendre",
      text: "L’apport solaire d’une baie, en watts, est le rayonnement qu’elle reçoit multiplié par son facteur solaire : Φ = A × Sw × Fm × I. A est la surface de la baie, L × H en dimensions de tableau. Fm est le coefficient de masque, expliqué à l’écran suivant : il vaut 1 quand rien ne fait d’ombre à la baie. I est le rayonnement de la façade à l’heure choisie. Calculez d’abord A × Sw × Fm au centième de m² (0,005 et plus au centième du dessus) : c’est la surface qui laisse entrer le soleil. Multipliez-la ensuite par I et arrondissez au watt (0,5 W et plus au watt du dessus).",
      prompt: "Regardez le schéma, lisez la formule et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/schema-apport-baie.svg", `Schéma de la formule de l’apport solaire d’une baie. En haut à gauche, la fenêtre ${EX.baie.rep} de l’exemple, vue de face : ${EX.baie.L} m de large, ${EX.baie.H} m de haut, soit A = ${EX.baie.A} m². Sa partie gauche est colorée en orange : c’est la surface qui laisse entrer le soleil, A × Sw × Fm = ${EX.baie.AS} m². En dessous, cinq cases reliées par des signes : A = ${EX.baie.A} m², Sw = ${EX.sw.sans}, Fm = 1, I = ${EX.baie.I} W/m², et le résultat Φ = ${EX.baie.phi} W, case entourée d’orange. Dernière ligne : fenêtre ${EX.baie.rep} à ${EX.baie.h} h, ${EX.baie.AS} m² × ${EX.baie.I} W/m² = ${EX.baie.phi} W.`, "L’apport Φ est la surface qui laisse entrer le soleil, A × Sw × Fm, multipliée par le rayonnement I.")
        + tableau(["Grandeur", "Unité", "Où la lire"], [
        ["A, surface de la baie = L × H", "m²", "Tableau des menuiseries"],
        ["Sw, facteur solaire de la baie", "sans unité", "Commande ou fiche du fabricant"],
        ["Fm, coefficient de masque", "sans unité", "Commande ou logiciel"],
        ["I, rayonnement reçu par la façade", "W/m²", "Tableau du rayonnement, à l’heure choisie"],
        ["Φ = A × Sw × Fm × I", "W", "Votre calcul"]
      ], "L’apport solaire d’une baie")
        + exempleBaie()
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, l’apport d’une baie", title: "Exercice : l’apport d’une fenêtre est", level: "appliquer", requiresAction: true,
      text: {
        1: `Un atelier d’exemple a une fenêtre est de ${EX.ex1.L} × ${EX.ex1.H} m, sans protection et sans masque (Sw = ${EX.sw.sans}, Fm = 1). Calculez son apport solaire à ${EX.ex1.h} h solaires avec le tableau du rayonnement. L’exemple résolu reste sous vos yeux : refaites le même geste.`,
        2: `Un atelier d’exemple a une fenêtre est de ${EX.ex1.L} × ${EX.ex1.H} m, sans protection et sans masque (Sw = ${EX.sw.sans}, Fm = 1). Calculez son apport solaire à ${EX.ex1.h} h solaires avec le tableau du rayonnement, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne A × Sw et Φ, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne A × Sw et Φ. Cette question est à faire seul." },
      aides: {
        1: ["Les dimensions et Sw sont dans l’énoncé, I dans le tableau du rayonnement sous l’énoncé. La méthode est à l’écran « L’apport solaire d’une baie ».", `A = L × H. A × Sw × Fm au centième de m², puis × I de la ligne Est, colonne ${EX.ex1.h} h.`, `Sur la fenêtre ${EX.baie.rep} de l’exemple : ${EX.baie.A} × ${EX.sw.sans} × 1 = ${EX.baie.AS} m², puis ${EX.baie.AS} × ${EX.baie.I} = ${EX.baie.phi} W. Faites les mêmes lignes avec ${EX.ex1.A} m² et le I de l’est à ${EX.ex1.h} h.`],
        2: ["La méthode est à l’écran « L’apport solaire d’une baie ».", "Trois lignes : A, puis A × Sw × Fm, puis Φ.", `Commencez par ${EX.ex1.L} × ${EX.ex1.H}, puis cherchez I sur la ligne Est du tableau.`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleBaie() + tableauI(), EX.ex1.quiz),
        2: avecBloc(tableauI(), EX.ex1.quiz)
      })
    }),

    BE.ecran({
      id: "protections-masques", dossier: "methode", kicker: "La méthode, 4", title: "Protections solaires et masques", level: "comprendre",
      text: `Deux choses réduisent l’apport d’une baie. La première est une protection solaire baissée, qui change Sw. Placée dehors, comme un volet roulant ou un store extérieur, elle arrête le rayonnement avant la vitre : Sw passe de ${EX.sw.sans} à ${EX.sw.ext}. Placée dedans, elle reçoit un rayonnement déjà entré, s’échauffe et rend sa chaleur à la pièce : Sw ne descend qu’à ${EX.sw.int}. La seconde est un masque, ce qui fait de l’ombre à la baie : un balcon, un auvent, un débord de toit, un bâtiment voisin. Le coefficient de masque Fm est la part du rayonnement qui atteint encore la baie : 1 sans masque, moins de 1 avec. Il se calcule par logiciel à partir de la géométrie ; ici, il est donné. Pour la maison, la commande néglige le débord de toit : Fm = 1.`,
      prompt: "Regardez le schéma, lisez l’exemple résolu et le tableau des quatre cas, puis continuez.",
      render: () => BE.schema("illustrations/schema-protections-masques.svg", `Trois coupes de la même baie, le dehors à gauche et le dedans à droite, avec des flèches orange pour le rayonnement du soleil. Première coupe, protection dehors : un volet ou un store arrête les flèches avant le vitrage ; Sw = ${EX.sw.ext} et l’apport baisse de ${EX.masque.baisseExt} %. Deuxième coupe, protection dedans : les flèches traversent le vitrage et touchent le store, qui s’échauffe et rend de la chaleur dedans, flèches en pointillés ; Sw = ${EX.sw.int} et l’apport ne baisse que de ${EX.masque.baisseInt} %. Troisième coupe, un balcon au-dessus de la baie : il arrête la flèche du haut, la ligne en tirets marque la limite de son ombre sur le vitrage, les autres flèches atteignent le vitrage ; Fm = ${EX.masque.Fm}, contre 1 sans masque.`, "Une protection dehors arrête le soleil avant le vitrage, une protection dedans le laisse entrer, un balcon en retient une partie.")
        + exempleMasque()
        + tableau(["Fenêtre " + EX.masque.rep + ", " + EX.masque.h + " h", "Sw", "Fm", "A × Sw × Fm (m²)", "Φ (W)"], EX.masque.cas.map(c => [c.nom, c.Sw, c.Fm, c.AS, c.phi]), "Une même baie, quatre cas")
        + BE.alerte(`<strong>Piège.</strong> Le store intérieur ne retire que ${EX.masque.baisseInt} % de l’apport de cette baie, la protection extérieure ${EX.masque.baisseExt} %.`)
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, protection et masque", title: "Exercice : une baie protégée sous un balcon", level: "appliquer", requiresAction: true,
      image: "illustrations/2-baie-sous-balcon-store.webp",
      imageAlt: "Le mur sud d’une petite maison à deux niveaux. Un balcon à dalle mince sort du mur à l’étage. Juste dessous, une fenêtre blanche a un store extérieur à lames baissé, en orange. La dalle du balcon jette une ombre nette en bande sombre sur le mur et sur le haut de la fenêtre ; plus bas, le mur est éclairé. Personne sur l’image.",
      text: {
        1: `Une fenêtre sud de ${EX.ex2.L} × ${EX.ex2.H} m est sous un balcon (Fm = ${EX.ex2.Fm}). Son store extérieur est baissé (Sw = ${EX.sw.ext}). Calculez son apport solaire à ${EX.ex2.h} h solaires. L’exemple résolu reste sous vos yeux.`,
        2: `Une fenêtre sud de ${EX.ex2.L} × ${EX.ex2.H} m est sous un balcon (Fm = ${EX.ex2.Fm}). Son store extérieur est baissé (Sw = ${EX.sw.ext}). Calculez son apport solaire à ${EX.ex2.h} h solaires, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la ligne qui donne A × Sw × Fm et Φ, en vous aidant de l’exemple.", 2: "Choisissez la ligne qui donne A × Sw × Fm et Φ. Cette question est à faire seul." },
      aides: {
        1: ["Sw et Fm sont dans l’énoncé, I dans le tableau du rayonnement. La méthode est à l’écran « Protections solaires et masques ».", "A × Sw × Fm : les trois se multiplient, au centième de m². Puis × I de la ligne Sud, colonne 12 h.", `Sur la fenêtre ${EX.masque.rep} de l’exemple : ${EX.masque.A} × ${EX.sw.sans} × ${EX.masque.Fm} = ${EX.masque.cas[1].AS} m², puis × ${EX.masque.I} = ${EX.masque.cas[1].phi} W. Ici, Sw vaut ${EX.sw.ext} : le store est dehors.`],
        2: ["La méthode est à l’écran « Protections solaires et masques ».", "Le store extérieur donne Sw, le balcon donne Fm. Les deux réduisent l’apport : multipliez-les.", `Commencez par ${EX.ex2.L} × ${EX.ex2.H} = ${EX.ex2.A} m².`]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleMasque() + tableauI(), EX.ex2.quiz),
        2: avecBloc(tableauI(), EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "tableau-heures", dossier: "methode", kicker: "La méthode, 5", title: "Le tableau heure par heure", level: "comprendre",
      text: `Pour un local ou un bâtiment, faites une ligne par orientation : la somme des surfaces des baies de cette orientation, puis A × Sw × Fm. Multipliez chaque ligne par le I de chaque heure, puis additionnez les lignes heure par heure. Le tableau montre le bâtiment d’exemple : bureau au nord, salle de réunion au sud et à l’ouest, sanitaires à l’est. Toutes ses baies ont Sw = ${EX.sw.sans}, sans masque. Les portes pleines n’ont pas de ligne : elles ne laissent pas passer le rayonnement.`,
      prompt: "Regardez le schéma, suivez une ligne, puis une colonne du tableau, puis continuez.",
      render: () => BE.schema("illustrations/schema-tableau-heures.svg", `Graphique en colonnes des apports solaires du bâtiment d’exemple, de ${EX.heures[0]} h à ${EX.heures[4]} h, en watts. Chaque colonne est empilée en quatre couches, une par ligne du tableau : sud, est, ouest, nord. La hauteur de la colonne est la somme des couches : ${EX.tot.map((t, i) => `${t} W à ${EX.heures[i]} h`).join(", ")}. Le sud pèse surtout à midi, l’ouest à 14 h et à 16 h.`, "Chaque ligne du tableau est une couche ; la somme des couches donne la colonne de chaque heure.")
        + tableau(["Orientation", "Baies", "A (m²)", "A × Sw (m²)"], EX.par.map(l => [l.nom, l.baies, l.A, l.AS]), "Bâtiment d’exemple : une ligne par orientation")
        + exempleTableau()
        + BE.renvoi(`Lecture de la ligne ouest à 16 h : ${EX.par[2].AS} × ${EX.I["16"].O} = ${EX.par[2].phi[4]} W. La somme de la colonne 16 h est ${EX.tot[4]} W.`)
    }),

    BE.ecran({
      id: "heure-de-pointe", dossier: "methode", kicker: "La méthode, 6", title: "L’heure de pointe", level: "comprendre",
      text: `L’heure de pointe est l’heure où la somme du tableau est la plus forte. Pour le bâtiment d’exemple, c’est ${EX.pointe} h : les fenêtres ouest de la salle de réunion pèsent le plus. Chaque local a sa propre heure de pointe. Additionner les maximums des locaux donne une puissance qui n’arrive jamais, parce qu’à une heure donnée chaque façade ne reçoit pas son maximum. Le bilan du bâtiment se fait à une seule heure, sa pointe. Le bilan d’un local se fait à sa propre pointe, pour choisir l’appareil qui le rafraîchit. La station T8 refait la somme de tous les apports d’été heure par heure : l’heure de pointe du bilan complet peut changer.`,
      prompt: "Regardez le schéma, comparez la somme des maximums et le maximum du bâtiment, puis continuez.",
      render: () => BE.schema("illustrations/schema-heure-de-pointe.svg", `Graphique en colonnes des apports solaires du bâtiment d’exemple, de ${EX.heures[0]} h à ${EX.heures[4]} h, en watts, empilés par local : salle de réunion, sanitaires, bureau. Les totaux sont ${EX.tot.join(" W, ")} W. La colonne de ${EX.pointe} h est entourée d’orange : c’est l’heure de pointe, ${EX.max} W. Une ligne en tirets, plus haute, marque la somme des maximums des locaux, ${EX.sommeMax} W : cette puissance n’arrive jamais.`, "À " + EX.pointe + " h, le bâtiment atteint sa pointe, " + EX.max + " W ; la somme des maximums des locaux, " + EX.sommeMax + " W, n’est jamais atteinte.")
        + tableau(["Local", ...H, "Pointe", "Max (W)"], [...EX.locaux.map(l => [l.nom, ...l.phi, l.pointe + " h", l.max]), ["Bâtiment", ...EX.tot, EX.pointe + " h", EX.max]], "Bâtiment d’exemple : apports solaires par local, en W")
        + BE.alerte(`<strong>Piège.</strong> La somme des maximums des locaux vaut ${EX.sommeMax} W, contre ${EX.max} W pour le bâtiment à ${EX.pointe} h. Le bâtiment se compte à son heure de pointe.`)
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, l’heure de pointe", title: "Exercice : l’heure de pointe d’un local", level: "appliquer", requiresAction: true,
      text: {
        1: `Un local d’exemple a des baies à l’est et à l’ouest. A × Sw × Fm vaut ${EX.ex3.ASE} m² à l’est et ${EX.ex3.ASO} m² à l’ouest. Faites le tableau des cinq heures avec le tableau du rayonnement, puis trouvez son heure de pointe et son apport à cette heure. Le tableau du bâtiment d’exemple reste sous vos yeux.`,
        2: `Un local d’exemple a des baies à l’est et à l’ouest. A × Sw × Fm vaut ${EX.ex3.ASE} m² à l’est et ${EX.ex3.ASO} m² à l’ouest. Trouvez son heure de pointe et son apport à cette heure, sans l’exemple.`
      },
      prompt: { 1: "Choisissez l’heure de pointe et l’apport, en vous aidant de l’exemple.", 2: "Choisissez l’heure de pointe et l’apport. Cette question est à faire seul." },
      aides: {
        1: ["Les deux A × Sw × Fm sont dans l’énoncé, I dans le tableau du rayonnement. La méthode est aux écrans « Le tableau heure par heure » et « L’heure de pointe ».", "Deux lignes, est et ouest, cinq colonnes. Chaque case : A × Sw × Fm × I. Puis la somme de chaque colonne : la plus forte donne l’heure de pointe.", `Dans le tableau de l’exemple, la plus forte somme est ${EX.max} W, à ${EX.pointe} h. Commencez ici par la colonne 8 h : ${EX.ex3.ASE} × ${EX.I["8"].E} pour l’est.`],
        2: ["La méthode est à l’écran « L’heure de pointe ».", "Faites la somme des deux façades à chacune des cinq heures, puis gardez la plus forte.", "N’additionnez pas le maximum de l’est et celui de l’ouest : ils n’arrivent pas à la même heure."]
      },
      ...BE.parNiveau({
        1: avecBloc(exempleTableau() + tableauI(), EX.ex3.quiz),
        2: avecBloc(tableauI(), EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "ce-qui-ne-compte-pas", dossier: "methode", kicker: "La méthode, 7", title: "Ce qui ne compte pas à cette station", level: "comprendre",
      text: "Cette station compte le rayonnement solaire qui entre par les baies vitrées des pièces chauffées. Les autres apports d’été ont leur station. Les murs et les portes pleines reçoivent aussi le soleil, mais ils sont opaques : la chaleur qu’ils absorbent traverse la paroi lentement, et elle se compte avec les parois à la station T7. Le garage n’est pas un local rafraîchi : sa porte n’a pas de ligne.",
      prompt: "Lisez les deux cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Compte à cette station", rows: [["Les fenêtres et portes-fenêtres :", "le rayonnement qui les traverse, A × Sw × Fm × I."], ["Les protections et les masques :", "par Sw et par Fm."]] },
        { title: "Compte ailleurs", rows: [["Les murs, le toit, les portes pleines :", "parois opaques, station T7."], ["La chaleur qui traverse les vitrages par l’écart de température :", "station T7."], ["Les occupants, l’éclairage, les appareils :", "station T7."], ["L’air neuf :", "station T8."]] }
      ])
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 8", title: "Ce que la note de calcul doit dire", level: "comprendre",
      text: "Un apport solaire dépend du jour, de l’heure et des hypothèses. La note de calcul dit le jour et les heures calculés, d’où viennent I, Sw et Fm, et à quelle heure tombe la pointe. Un autre technicien doit pouvoir refaire le calcul. Voici la note du bâtiment d’exemple.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du bâtiment d’exemple"], [
        ["Objet", "Apports solaires par les vitrages, petit bâtiment de bureaux de plain-pied, trois locaux"],
        ["Données d’entrée", "Baies : plans du bâtiment ; I : jour clair de juillet, heures solaires 8 h à 16 h (données de l’exercice)"],
        ["Hypothèses", `Sw = ${EX.sw.sans}, baies sans protection ; Fm = 1, aucun masque (données de l’exercice)`],
        ["Méthode", "Φ = A × Sw × Fm × I, une ligne par orientation, somme heure par heure"],
        ["Résultats", `Heure de pointe ${EX.pointe} h, Φ = ${EX.max} W ; salle de réunion ${EX.locaux[1].max} W à ${EX.locaux[1].pointe} h`]
      ], "Note de calcul, bâtiment d’exemple")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

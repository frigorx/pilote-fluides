/* Station BE-R5 : la note de calcul (terminus du réseau).
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5 à R4 (ses valeurs viennent des modules d'exemple de ces stations),
   commande du niveau 1 sur le même bâtiment (note préremplie : cases vides, sources à retrouver, deux incohérences glissées), commande du
   niveau 2 sur la maison, volet tertiaire sur le bâtiment de bureaux du fil rouge (feuille à part). Les valeurs de l'exemple (bloc EXEMPLE) et
   les bornes des fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/r5-note-de-calcul/construire.mjs : le premier vient de
   exemple-data.mjs, les secondes de exemple-data.mjs (niveau 1) et de corriges/r5-note-de-calcul/reference-note.json (niveau 2 et tertiaire,
   outils/r5-note-maison.mjs et outils/r5-note-tertiaire.mjs). Aucune réponse de la commande du niveau 1, ni valeur de la maison, ni valeur
   du bâtiment de bureaux n'est écrite dans cette station : seules les bornes des fourchettes. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "te": "−7",
 "ti": "19",
 "dju": "2200",
 "c": "0,8",
 "H": "115,23",
 "Hp": "64,86",
 "Hpt": "12,97",
 "Hair": "37,4",
 "qv": "110",
 "base": "2996",
 "pac": "PAC 3,5",
 "pacBase": "2630",
 "appoint": "366",
 "biv": "−4,6",
 "regime": "50/40",
 "pompeQ": "0,30",
 "pompeH": "1,72",
 "loi": {
  "dep": "50",
  "pente": "1,24",
  "confort": "19",
  "reduit": "15",
  "ete": "18"
 },
 "scop": "2,6",
 "nUI": "2",
 "cout": "690",
 "coutGaz": "849",
 "co2": "221",
 "retour": "18,9",
 "ex1": {
  "H": "96,4",
  "quiz": {
   "choices": [
    "H total = 96,4 W/K",
    "Prix de l’électricité : 0,25 € par kWh, tarif réglementaire",
    "H total = 96,4 W/K ; station T5, calcul selon les règles Th-Bât",
    "H total, environ 100 W/K, refait de tête pour aller plus vite"
   ],
   "good": 2,
   "explain": "Une ligne de la note dit sa valeur, son unité, sa station et sa source. Sans station, personne ne peut la relire. Le prix présenté comme un tarif réglementaire est une donnée de l’exercice. Une valeur refaite de tête n’est plus celle de la feuille."
  }
 },
 "ex2": {
  "postes": [
   "1200",
   "450",
   "80",
   "270"
  ],
  "noteDit": "2100",
  "quiz": {
   "choices": [
    "2000 kWh : la note se corrige",
    "2100 kWh : la note a raison",
    "1920 kWh",
    "1730 kWh"
   ],
   "good": 0,
   "explain": "1200 + 450 + 80 + 270 = 2000 kWh. 2100 kWh est l’erreur à signaler ; 1920 kWh oublie la ventilation ; 1730 kWh oublie l’été."
  }
 },
 "ex3": {
  "debit": "450",
  "pompe": "0,40",
  "quiz": {
   "choices": [
    "Oui : 0,40 m³/h font 4000 L/h",
    "Oui : 0,40 est proche de 0,45, l’écart ne compte pas",
    "On ramène le débit de H1 à 400 L/h pour que la note tombe juste",
    "Non : la pompe donne 400 L/h, moins que 450 L/h ; l’écart se signale à la station H4"
   ],
   "good": 3,
   "explain": "0,40 m³/h font 400 L/h, sous les 450 L/h du circuit. La note signale l’écart à la station H4 ; elle ne change jamais la feuille de H1 pour tomber juste."
  }
 },
 "ex4": {
  "quiz": {
   "choices": [
    "H total = parois + ponts thermiques + 0,34 × débit d’air, refait dans la synthèse",
    "Pompe à chaleur air/eau retenue : machine et appoint couvrent toutes les déperditions de base à −5 °C (section Thermique)",
    "La pompe à chaleur est la meilleure solution.",
    "Centrale de traitement d’air à plaques, comme le bâtiment de bureaux"
   ],
   "good": 1,
   "explain": "La synthèse dit le choix, sa raison et la section qui le calcule. Le calcul de H reste dans sa section ; une phrase sans raison ne justifie rien ; la centrale de traitement d’air appartient à la note du bâtiment de bureaux."
  }
 }
};
/*EXEMPLE-FIN*/

const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };

const exempleSource = () => BE.exemple({ text: `Bâtiment d’exemple : la ligne du coefficient H dans la section Thermique`, answer: `H total = ${EX.H} W/K ; station T5 ; calcul selon les règles Th-Bât. Et la ligne du coefficient c : c = ${EX.c} ; station R4 ; donnée de l’exercice`, why: "La valeur, son unité, sa station, sa source. La donnée de l’exercice est dite comme telle : un lecteur sait qu’elle reste à valider." });
const exempleSomme = () => BE.exemple({ text: `Bâtiment d’exemple : la feuille de T5 donne H en trois parts, parois ${EX.Hp} W/K, ponts thermiques ${EX.Hpt} W/K, air ${EX.Hair} W/K, et le total ${EX.H} W/K`, answer: `${EX.Hp} + ${EX.Hpt} + ${EX.Hair} = ${EX.H} W/K : la somme tombe juste, la ligne entre dans la note telle que la feuille la donne`, why: "La note recopie la feuille. Elle refait seulement les sommes : si une somme ne tombe pas, l’écart se signale à la station." });
const exempleCoherence = () => BE.exemple({ text: `Bâtiment d’exemple, à ${EX.te} °C dehors : la machine ${EX.pac} de T9 et les déperditions de base de T5`, answer: `Machine ${EX.pacBase} W + appoint ${EX.appoint} W = ${EX.base} W, les déperditions de base de T5. Loi d’eau de R1 : départ ${EX.loi.dep} °C à ${EX.te} °C ; régime de H1 : ${EX.regime}. Les deux paires se répondent`, why: "Deux lignes qui parlent de la même chose doivent dire la même chose. La note l’écrit : cohérence vérifiée, et entre quelles stations." });
const exempleSynthese = () => BE.exemple({ text: "Bâtiment d’exemple : le bloc « Choix retenus » de la page de synthèse", answer: `Pompe à chaleur ${EX.pac} avec appoint : machine et appoint couvrent les déperditions de base à ${EX.te} °C (section Thermique). Régime ${EX.regime} et loi d’eau de pente ${EX.loi.pente} (sections Eau et Régulation). Pompe à chaleur plutôt que gaz : ${EX.cout} € contre ${EX.coutGaz} € par an, retour en ${EX.retour} ans (section Régulation et énergie)`, why: "Un choix, sa raison, sa section. Les calculs restent dans leur section : le lecteur pressé lit la synthèse, le lecteur qui vérifie suit le renvoi." });

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Tout est sur la feuille : le dossier d’exemple au recto, la note préremplie au verso. Rien ne se calcule, sauf une somme.",
      "Exercice 1 : cherchez chaque ligne dans le dossier ; une ligne qui n’y est pas vient de la commande d’une station, comme donnée de l’exercice. Exercice 2 : cinq cases vides, à recopier du dossier avec son unité. Exercice 3 : comparez le régime et la loi d’eau, puis refaites la somme des postes.",
      `Sur l’exemple des écrans : loi d’eau ${EX.loi.dep} °C à ${EX.te} °C, régime ${EX.regime}. Une note qui écrit un autre régime contredit sa propre loi d’eau.`
    ],
    2: [
      "Vos feuilles des stations E1, E2, T5, T8, T9, A2, A4, H1, H2, H4, H5, H6, F1 à F4, R1 et R4. Chaque ligne de la feuille réponse dit de quelle grandeur il s’agit ; la station se retrouve à l’écran « D’où viennent les données » ; la source se recopie de la feuille de la station quand elle y est écrite ; sinon, écrivez sa sorte : calcul de la station, catalogue de l’exercice, texte cité par le CCTP ou donnée de l’exercice.",
      "Recopiez chaque valeur avec son unité, sa station et sa source ; la seule somme à refaire est celle des postes d’électricité de R4. Puis les cinq cohérences de l’écran « Les cohérences entre lignes », la synthèse et la grille de relecture.",
      `Volet tertiaire : même gabarit, avec le CCTP du bâtiment de bureaux, le dossier du bâtiment (bilans fournis) et vos feuilles A5, A6, F3, F4, F5, R2 et R3. La note des bureaux n’a ni multisplit ni chauffe-eau thermodynamique.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const blocNiveau = n => n === 1 ? "" :
  `<div class="commande"><div class="commande-entete"><span class="tag">Commande du bureau d’études</span><span class="commande-volet">Volet tertiaire, feuille à part</span></div><div class="commande-corps"><p>${BE.esc("Le bureau d’études vous demande aussi la note de calcul du bâtiment de bureaux, bâtiment entier, sur le même gabarit : données et thermique (CCTP ; dossier du bâtiment, bilans fournis du bâtiment entier), air (air neuf du dossier du bâtiment ; stations A5 et A6), eau glacée et froid (stations F3, F4 et F5), régulation et supervision (stations R2 et R3). Rendez les cohérences entre lignes et deux choix de la synthèse.")}</p></div>`
  + `<p class="commande-actions"><a class="primary-button lien-feuille" href="feuille-N2-tertiaire.html" target="_blank" rel="noopener">Remplir la feuille du volet tertiaire, puis l’imprimer</a></p></div>`
  + BE.liens([{ href: "../../fil-rouge/tertiaire/cctp-tertiaire.pdf", title: "L’extrait de CCTP du bâtiment de bureaux", note: "Conditions page 1, débits et horaires page 2, centrale et production page 3, régulation et supervision page 4" },
    { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Conditions de calcul page 3, ventilation page 4, eau chaude page 5" }]);
ecranProjet.render = () => { const html = rendreCommande(); if (html.includes("partie-reservee")) return html; return html + blocNiveau(html.includes("niveau autonome") ? 2 : 1); };

BE.station({
  code: "BE-R5",
  titre: "La note de calcul",
  ligne: "Régulation et énergie",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bâtiment d’exemple : la note préremplie à compléter et à corriger", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, note complète ; volet tertiaire sur feuille à part", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire : la note d’un dossier réel, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Le projet est calculé, ligne par ligne. Il reste à le rendre lisible par un autre : la note de calcul rassemble les résultats de vos feuilles dans un gabarit, chaque valeur avec sa station et sa source. Vous vérifiez que les lignes se répondent, vous écrivez la synthèse d’une page en tête, puis un collègue relit votre note avec une grille.",
  note: "La note relit, elle ne refait pas : chaque valeur vient de la feuille de sa station. Les données de l’exercice de chaque station restent dites comme telles.",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et données" },
    { id: "methode", label: "La méthode", note: "sur un bâtiment d’exemple" },
    { id: "projet", label: "Le projet", note: "commande et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Compléter et corriger la note de calcul du bâtiment d’exemple",
      delai: "Rendu en fin de séance",
      commande: [
        "Un collègue a commencé la note de calcul du petit bâtiment de bureaux d’exemple. Il a laissé cinq cases vides, trois lignes sans leur station, et deux erreurs s’y sont glissées. Le dossier d’exemple, au recto de la feuille, reprend ce que disent les feuilles des stations d’exemple. Suivez les étapes dans l’ordre.",
        "Étape 1, exercice 1 de la feuille. Retrouvez la station de trois lignes, ou dites « donnée de l’exercice ».",
        "Étape 2, exercice 2 de la feuille. Complétez les cinq cases vides, valeur et unité, depuis le dossier.",
        "Étape 3, exercice 3 de la feuille. Trouvez les deux incohérences et écrivez la valeur juste. Vérifiez vos quatre résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Le dossier d’exemple et la note préremplie", ou: "Feuille réponse niveau 1, recto et verso" },
        { piece: "La méthode", ou: "Écrans « Une valeur, sa station, sa source », « Recopier, pas recalculer » et « Les cohérences entre lignes »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "La note de calcul de la maison : sections, cohérences, synthèse, relecture croisée",
      delai: "Rendu en fin de séance",
      commande: "Le bureau d’études remet le dossier de la maison au maître d’ouvrage. Assemblez la note de calcul à partir de vos feuilles : une section par ligne, chaque valeur avec son unité, sa station et sa source ; les cinq cohérences entre lignes ; deux choix de la synthèse avec leur raison et leur section. La feuille réponse porte les lignes clés de chaque section ; les autres lignes de vos feuilles entrent dans la note complète sans se recopier sur la feuille. Échangez ensuite votre feuille avec un collègue et remplissez la grille de relecture de sa note. Rien ne se recalcule, sauf la somme des postes d’électricité. Le volet tertiaire, sous cette commande, se rend sur une feuille à part.",
      pieces: [
        { piece: "Vos feuilles des stations des six lignes", ou: "E1 à R4 : la liste est à l’écran « D’où viennent les données »" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 3 : conditions de calcul ; page 4 : ventilation ; page 5 : eau chaude" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-puissance", libelle: "Puissance de chauffage à installer, case complétée", unite: "W", min: 3341, max: 3549, indice: "Relisez l’écran « Recopier, pas recalculer » : la valeur se recopie depuis la feuille de sa station, avec son unité." },
      { id: "n1-froid", libelle: "Puissance frigorifique du bâtiment, case complétée", unite: "W", min: 4307, max: 4575, indice: "Relisez l’écran « Recopier, pas recalculer » : la puissance du bâtiment entier, avec simultanéité, pas celle d’un local." },
      { id: "n1-depart", libelle: "Incohérence 1 corrigée : température de départ du régime", unite: "°C", min: 48, max: 52, indice: "Relisez l’écran « Les cohérences entre lignes » : la loi d’eau part, à la base, de la température de départ du régime." },
      { id: "n1-elec", libelle: "Incohérence 2 corrigée : électricité de l’année", unite: "kWh", min: 2678, max: 2844, indice: "Relisez l’écran « Recopier, pas recalculer » : refaites la somme des postes ; si elle ne tombe pas juste, la note se corrige." }
    ],
    2: [
      { id: "n2-puissance", libelle: "Maison : puissance de chauffage à installer", unite: "W", min: 3821, max: 4059, indice: "Relisez l’écran « Recopier, pas recalculer » : la valeur se recopie depuis la feuille de sa station, avec son unité." },
      { id: "n2-froid", libelle: "Maison : puissance frigorifique, avec simultanéité", unite: "W", min: 6588, max: 6996, indice: "Relisez l’écran « Recopier, pas recalculer » : la puissance du bâtiment entier, avec simultanéité, pas celle d’un local." },
      { id: "n2-machine", libelle: "Maison : puissance au réel de l’unité extérieure", unite: "W", min: 7643, max: 8117, indice: "Relisez l’écran « Recopier, pas recalculer » : la valeur se recopie depuis la feuille de sa station, avec son unité." },
      { id: "n2-debit", libelle: "Maison : débit du circuit de chauffage", unite: "L/h", min: 659, max: 701, indice: "Relisez l’écran « Recopier, pas recalculer » : la valeur se recopie depuis la feuille de sa station, avec son unité." },
      { id: "n2-elec", libelle: "Maison : électricité de l’année, tous postes", unite: "kWh", min: 2572, max: 2732, indice: "Relisez l’écran « Recopier, pas recalculer » : refaites la somme des postes ; si elle ne tombe pas juste, la note se corrige." },
      { id: "n2-retour", libelle: "Maison : temps de retour du surcoût", unite: "ans", min: 11, max: 11.8, indice: "Relisez l’écran « Recopier, pas recalculer » : le temps de retour de votre feuille de la station R4, au dixième d’année." },
      { id: "t-hiver", libelle: "Tertiaire : puissance de chauffage à installer", unite: "W", min: 9637, max: 10235, indice: "Relisez l’écran « Recopier, pas recalculer » : la valeur se recopie depuis la feuille de sa station, avec son unité." },
      { id: "t-froid", libelle: "Tertiaire : puissance frigorifique du bâtiment, avec simultanéité", unite: "W", min: 9603, max: 10197, indice: "Relisez l’écran « Recopier, pas recalculer » : la puissance du bâtiment entier, avec simultanéité, pas celle d’un local." },
      { id: "t-groupe", libelle: "Tertiaire : puissance au réel du groupe, glycol compris", unite: "W", min: 10789, max: 11457, indice: "Relisez l’écran « Recopier, pas recalculer » : la valeur se recopie depuis la feuille de sa station, avec son unité." },
      { id: "t-debit", libelle: "Tertiaire : débit d’eau glacée", unite: "m³/h", min: 1.75, max: 1.87, indice: "Relisez l’écran « Recopier, pas recalculer » : la valeur se recopie depuis la feuille de sa station, avec son unité." },
      { id: "t-recup", libelle: "Tertiaire : énergie récupérée sur l’année", unite: "kWh", min: 1545, max: 1641, indice: "Relisez l’écran « Recopier, pas recalculer » : la valeur se recopie depuis la feuille de sa station, avec son unité." },
      { id: "t-points", libelle: "Tertiaire : nombre de points de supervision", unite: "points", min: 47, max: 47, indice: "Relisez l’écran « Les cohérences entre lignes » : le total de la liste de la station R3 est la somme des points par équipement." }
    ]
  },
  /*FOURCHETTES-FIN*/

  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-R4, L’énergie sur l’année", href: "../r4-energie-annee/index.html", pourquoi: "La station qui précède : l’énergie, le coût, les émissions et le temps de retour de la note." },
    { reseau: "Bureau d’études", titre: "BE-H5, Équilibrage et schéma", href: "../h5-equilibrage-schema/index.html", pourquoi: "La note de l’eau : les quatre rubriques déjà posées." },
    { reseau: "Bureau d’études", titre: "BE-A2, Les débits du projet", href: "../a2-debits-projet/index.html", pourquoi: "La première note du réseau : objet, données et sources, hypothèses et méthode, résultats." },
    { reseau: "Bureau d’études", titre: "BE-R3, La supervision", href: "../r3-supervision/index.html", pourquoi: "La liste des points du bâtiment de bureaux, reprise dans sa note." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Vous avez fait les stations du projet, chacune sur sa feuille. Le maître d’ouvrage, le bureau de contrôle ou le collègue qui reprendra le dossier n’ont pas vos feuilles : ils lisent la note de calcul. Vous y rassemblez les résultats, chacun avec sa station et sa source. Vous vérifiez que les lignes se répondent. Vous écrivez en tête une synthèse d’une page : les choix et leurs raisons. Un collègue relit ensuite votre note avec une grille. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Vous recevez", rows: [["La commande :", "assembler la note de calcul du projet."], ["Le dossier :", "vos feuilles des six lignes, de la station E1 à la station R4."]] },
        { title: "Vous produisez", rows: [["La note :", "une section par ligne, chaque valeur avec sa station et sa source."], ["La synthèse :", "les choix et leurs raisons, sur une page. Fourchettes à l’écran Vérifier : environ ± 3 % ; les points de supervision se comptent juste."]] },
        { title: "Vous emportez", rows: [["Une fiche :", "le gabarit de la note et la grille de relecture."], ["La suite :", "le terminus du réseau : le dossier se remet."]] }
      ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "La note ne crée aucune valeur : chacune vient de la feuille d’une station. Le schéma montre les six lignes du réseau et leurs stations, qui versent chacune leur résultat dans la note. Le dossier et le climat viennent des stations E1 et E2 ; la thermique, des stations T1 à T9 ; l’air, des stations A1 à A6 ; l’eau, des stations H1 à H6 ; le froid, des stations F1 à F5 ; la régulation et l’énergie, des stations R1 à R4. Pour la maison, la centrale de traitement d’air (A5, A6), l’eau glacée (F5) et la supervision (R2, R3) ne servent pas : elles sont au bâtiment de bureaux. Quand la feuille de la station écrit la source à côté de la valeur, vous la recopiez avec elle ; sinon, vous écrivez sa sorte. Elle est d’une de ces sortes : un calcul de la station, un catalogue de l’exercice, un texte cité par le CCTP, ou une donnée de l’exercice.",
      prompt: "Suivez chaque ligne jusqu’à la note, puis lisez le tableau.",
      render: () => BE.schema("illustrations/chemin-du-projet.svg", "Schéma : six bandes, une par ligne du réseau. Dossier et climat : E1, E2. Thermique : T1 à T9. Air : A1 à A6. Eau : H1 à H6. Froid : F1 à F5. Régulation et énergie : R1 à R4. De chaque bande part une flèche vers un grand cadre orange à droite, « La note de calcul », synthèse en tête. Sous le schéma : chaque valeur garde le nom de sa station et sa source ; la note relit les feuilles, elle ne refait pas les calculs.", "Les six lignes versent leurs résultats dans la note.")
        + tableau(["Section de la note", "Maison", "Bâtiment de bureaux"], [
          ["Dossier et climat", "E1, E2 ; CCTP page 3", "CCTP page 1"],
          ["Thermique", "T5, T8, T9", "T5 et T8 : les bilans du bâtiment entier"],
          ["Air", "A2, A4", "A2, A5, A6"],
          ["Eau", "H1, H2, H4, H5, H6", "F5 (eau glacée)"],
          ["Froid", "F1 à F4 (variante)", "F3, F4"],
          ["Régulation et énergie", "R1, R4", "R2, R3 ; A6 pour l’énergie récupérée"]
        ], "Où lire chaque section")
    }),

    BE.ecran({
      id: "gabarit-de-la-note", dossier: "methode", kicker: "La méthode, 1", title: "Le gabarit de la note", level: "comprendre",
      text: "Les stations A2 et H5 ont déjà posé quatre rubriques : l’objet, les données avec leur source, les hypothèses et la méthode, les résultats. La note du projet garde ces rubriques et en ajoute deux : les choix justifiés, et la synthèse d’une page, placée en tête. Le corps de la note suit les six lignes du projet, une section par ligne. Un lecteur pressé lit la synthèse ; un lecteur qui vérifie descend dans la section et retrouve chaque valeur sur la feuille de sa station.",
      prompt: "Lisez le tableau du gabarit, puis continuez.",
      render: () => tableau(["Rubrique", "Ce qu’elle contient"], [
        ["Synthèse, une page en tête", "Les choix retenus et leurs raisons, les résultats clés, les cohérences vérifiées"],
        ["Objet", "Le projet, le bâtiment, la commande"],
        ["Données et sources", "Chaque donnée avec son unité, sa station, sa source ; les données de l’exercice dites comme telles"],
        ["Hypothèses et méthode", "Les conditions de calcul et la méthode de chaque section"],
        ["Résultats, une section par ligne", "Dossier et climat, thermique, air, eau, froid, régulation et énergie"],
        ["Choix justifiés", "Chaque choix, sa raison, la section qui le calcule"]
      ], "Le gabarit de la note de calcul")
    }),

    BE.ecran({
      id: "valeur-et-source", dossier: "methode", kicker: "La méthode, 2", title: "Une valeur, sa station, sa source", level: "comprendre",
      text: "Chaque ligne de la note dit quatre choses : la grandeur, la valeur avec son unité, la station qui l’a produite, la source. La source est le document qui fonde la valeur : une règle de calcul, un article de texte, un catalogue. Quand la valeur vient de la commande, elle s’écrit « donnée de l’exercice » : un lecteur sait alors qu’elle reste à valider, et ne la prend pas pour une valeur de norme. Une valeur sans source ne va pas dans la note.",
      prompt: "Lisez l’exemple résolu, puis faites l’exercice.",
      render: () => tableau(["Grandeur", "Valeur", "Station", "Source"], [
        ["Coefficient H total", `${EX.H} W/K`, "T5", "Règles Th-Bât"],
        ["Température extérieure de base", `${EX.te} °C`, "T5", "Donnée de l’exercice"],
        ["Coefficient c", EX.c, "R4", "Donnée de l’exercice"]
      ], "Trois lignes du bâtiment d’exemple") + exempleSource()
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, la source", title: "À l’écran : la ligne qui peut entrer", level: "appliquer", requiresAction: true,
      text: {
        1: "Un autre bâtiment d’exemple. Un collègue propose quatre lignes pour sa note. Une seule peut entrer telle quelle. L’exemple résolu reste sous vos yeux.",
        2: "Un autre bâtiment d’exemple. Un collègue propose quatre lignes pour sa note. Une seule peut entrer telle quelle."
      },
      prompt: { 1: "Choisissez la ligne, en vous aidant de l’exemple.", 2: "Choisissez la ligne. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Une valeur, sa station, sa source ».", "Une ligne dit la valeur, l’unité, la station et la source.", `Dans l’exemple : H total = ${EX.H} W/K ; station T5 ; règles Th-Bât. Cherchez la ligne qui dit tout cela.`],
        2: ["La méthode est à l’écran « Une valeur, sa station, sa source ».", "Une donnée de l’exercice ne se présente jamais comme une valeur de norme.", "Une valeur refaite de tête n’est plus celle de la feuille."]
      },
      ...BE.parNiveau({ 1: avecBloc(exempleSource(), EX.ex1.quiz), 2: avecBloc("", EX.ex1.quiz) })
    }),

    BE.ecran({
      id: "recopier-pas-recalculer", dossier: "methode", kicker: "La méthode, 3", title: "Recopier, pas recalculer", level: "comprendre",
      text: "Le résultat d’une station se recopie depuis sa feuille. La note relit, elle ne refait pas : refaire un calcul, c’est risquer une deuxième valeur pour la même grandeur. Recopiez la valeur avec son unité et l’arrondi de la feuille. La note refait une seule chose : les sommes. Quand un total est la somme de plusieurs lignes, refaites l’addition ; si elle ne tombe pas, ne retouchez pas la ligne pour qu’elle tombe juste : l’écart se signale à la station qui l’a produit. La vérification de la station accepte ± 3 % : c’est la marge d’une lecture, pas celle d’un nouveau calcul.",
      prompt: "Lisez l’exemple résolu, puis faites l’exercice.",
      render: () => exempleSomme()
        + BE.alerte("<strong>Piège.</strong> Recopier la puissance d’un seul local au lieu de celle du bâtiment, ou la puissance sans simultanéité au lieu de celle avec : la valeur existe sur la feuille, mais ce n’est pas la bonne ligne.")
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, la somme", title: "À l’écran : un total à contrôler", level: "appliquer", requiresAction: true,
      text: {
        1: `Un autre bâtiment d’exemple. Sa feuille de l’énergie donne quatre postes d’électricité : chauffage ${EX.ex2.postes[0]} kWh, eau chaude ${EX.ex2.postes[1]} kWh, ventilation ${EX.ex2.postes[2]} kWh, été ${EX.ex2.postes[3]} kWh. La note écrit un total de ${EX.ex2.noteDit} kWh. Contrôlez-le. L’exemple résolu reste sous vos yeux.`,
        2: `Un autre bâtiment d’exemple. Sa feuille de l’énergie donne quatre postes d’électricité : chauffage ${EX.ex2.postes[0]} kWh, eau chaude ${EX.ex2.postes[1]} kWh, ventilation ${EX.ex2.postes[2]} kWh, été ${EX.ex2.postes[3]} kWh. La note écrit un total de ${EX.ex2.noteDit} kWh. Contrôlez-le.`
      },
      prompt: { 1: "Choisissez le total, en vous aidant de l’exemple.", 2: "Choisissez le total. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Recopier, pas recalculer ».", "Additionnez les quatre postes.", `Dans l’exemple : ${EX.Hp} + ${EX.Hpt} + ${EX.Hair} = ${EX.H}. Faites de même avec les quatre postes.`],
        2: ["La méthode est à l’écran « Recopier, pas recalculer ».", "Les quatre postes, tous.", "Si la somme ne tombe pas, la note se corrige."]
      },
      ...BE.parNiveau({ 1: avecBloc(exempleSomme(), EX.ex2.quiz), 2: avecBloc("", EX.ex2.quiz) })
    }),

    BE.ecran({
      id: "hypotheses-et-methode", dossier: "methode", kicker: "La méthode, 4", title: "Les hypothèses et la méthode", level: "comprendre",
      text: "Une valeur ne se lit pas sans ses conditions. La rubrique des hypothèses dit, une fois pour toute la note, les températures de calcul, la consigne, les conditions d’été, et les hypothèses de chaque ligne : simultanéité des apports, régime de l’eau, heures de fonctionnement. Elle dit aussi la méthode, en une phrase par section : la station qui l’enseigne suffit. Un lecteur qui change une hypothèse sait ainsi quelles lignes bougent.",
      prompt: "Lisez le tableau du bâtiment d’exemple, puis continuez.",
      render: () => tableau(["Hypothèse", "Bâtiment d’exemple", "Station"], [
        ["Température extérieure de base ; intérieure", `${EX.te} °C ; ${EX.ti} °C`, "T5"],
        ["Été", "Puissance avec simultanéité des apports", "T8"],
        ["Régime de l’eau", EX.regime, "H1"],
        ["Réduit de nuit ; arrêt d’été", `${EX.loi.reduit} °C au lieu de ${EX.loi.confort} °C ; ${EX.loi.ete} °C`, "R1"],
        ["Année de chauffage", `${EX.dju} DJU ; c = ${EX.c} (donnée de l’exercice)`, "R4"]
      ], "Hypothèses du bâtiment d’exemple")
    }),

    BE.ecran({
      id: "coherences", dossier: "methode", kicker: "La méthode, 5", title: "Les cohérences entre lignes", level: "comprendre",
      text: "Certaines lignes parlent de la même chose depuis deux stations : elles doivent dire la même chose. Dans la note de la maison, cinq cohérences se vérifient : la puissance de T5 et la machine de T9 ; le froid de T8 et la machine de F3 ; le débit de H1 et la pompe de H4 ; la loi d’eau de R1 et le régime de H1 ; l’énergie de R4 et la machine de T9. Le bâtiment de bureaux a les siennes, dans le second tableau. Le schéma montre deux de ces cohérences sur le bâtiment d’exemple. Quand deux lignes se contredisent, la note signale l’écart et la station qui doit le reprendre ; elle ne choisit pas sans le dire la valeur qui arrange.",
      prompt: "Comparez les barres de chaque groupe, lisez l’exemple résolu, puis faites l’exercice.",
      render: () => BE.schema("illustrations/coherence-exemple.svg", `Graphique en barres horizontales, bâtiment d’exemple. Premier groupe, hiver à ${EX.te} °C dehors : une barre « déperditions de base (T5) : ${EX.base} W » ; dessous, une barre de même longueur faite de la machine ${EX.pac} (T9), ${EX.pacBase} W, et de l’appoint, ${EX.appoint} W, en orange. Second groupe, l’eau : une barre « débit du circuit (H1) » et une barre « point demandé à la pompe (H4) : ${EX.pompeQ} m³/h », un peu plus longue. Sous le graphique : la seconde barre de chaque groupe atteint la première, les lignes se répondent ; un écart se signale, toujours en le disant.`, "Deux cohérences : la machine et son appoint couvrent la base ; la pompe donne le débit du circuit.")
        + exempleCoherence()
        + tableau(["Cohérence", "Ce qui doit se répondre"], [
          ["T5 et T9", "Machine à la base + appoint ≥ déperditions de base"],
          ["T8 et F3", "Machine de froid au réel ≥ puissance avec simultanéité"],
          ["H1 et H4", "Débit de la pompe ≥ débit du circuit"],
          ["R1 et H1", "Départ de la loi d’eau à la base = départ du régime"],
          ["R4 et T9", "La machine de l’énergie est celle de T9 ; mêmes DJU que E1"]
        ], "Les cinq cohérences de la maison")
        + tableau(["Cohérence", "Ce qui doit se répondre"], [
          ["Dossier du bâtiment et F3", "Groupe au réel, glycol compris ≥ puissance avec simultanéité"],
          ["Dossier du bâtiment et F5", "Le débit de F5 se retrouve avec le froid du bâtiment donné par le dossier, puissance avec simultanéité, et non avec le groupe de F3 : puissance en kW ÷ (coefficient de l’eau glycolée × 5 K), une vérification comme une somme"],
          ["Dossier du bâtiment et A5", "Débit de la centrale = débit d’air neuf"],
          ["R3 : équipements et liste", "Somme des points par équipement = total de la liste"],
          ["F5 : pompe et circuit", "Débit de la pompe ≥ débit d’eau glacée"]
        ], "Les cinq cohérences du bâtiment de bureaux")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, la cohérence", title: "À l’écran : le débit et la pompe", level: "appliquer", requiresAction: true,
      text: {
        1: `Un autre bâtiment d’exemple. Sa feuille de la station H1 donne un débit de circuit de ${EX.ex3.debit} L/h ; sa feuille de la station H4 retient une pompe qui donne ${EX.ex3.pompe} m³/h. La note doit-elle écrire que les deux lignes se répondent ? L’exemple résolu reste sous vos yeux.`,
        2: `Un autre bâtiment d’exemple. Sa feuille de la station H1 donne un débit de circuit de ${EX.ex3.debit} L/h ; sa feuille de la station H4 retient une pompe qui donne ${EX.ex3.pompe} m³/h. La note doit-elle écrire que les deux lignes se répondent ?`
      },
      prompt: { 1: "Choisissez la réponse, en vous aidant de l’exemple.", 2: "Choisissez la réponse. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Les cohérences entre lignes ».", "Mettez les deux débits dans la même unité : 1 m³/h = 1000 L/h.", "Dans l’exemple, la barre de la pompe atteint celle du circuit. Comparez les deux débits."],
        2: ["La méthode est à l’écran « Les cohérences entre lignes ».", "Une seule unité pour comparer.", "La note signale un écart ; elle ne retouche pas une feuille."]
      },
      ...BE.parNiveau({ 1: avecBloc(exempleCoherence(), EX.ex3.quiz), 2: avecBloc("", EX.ex3.quiz) })
    }),

    BE.ecran({
      id: "choix-justifies", dossier: "methode", kicker: "La méthode, 6", title: "Les choix justifiés", level: "comprendre",
      text: "Le projet a fait des choix : la machine, le régime, le caisson, le système de froid, la solution d’énergie. La rubrique des choix justifiés en dresse la liste. Chaque choix s’écrit avec sa raison, en une phrase, et la section qui le calcule. Écrivez une raison chiffrée : « couvre les déperditions de base avec son appoint » se vérifie ; « la meilleure solution » ne se vérifie pas.",
      prompt: "Lisez le tableau des choix du bâtiment d’exemple, puis continuez.",
      render: () => tableau(["Choix", "Raison", "Section"], [
        [`Pompe à chaleur ${EX.pac} avec appoint`, `Machine ${EX.pacBase} W + appoint ${EX.appoint} W = ${EX.base} W à ${EX.te} °C`, "Thermique"],
        [`Régime ${EX.regime}`, `La loi d’eau part de ${EX.loi.dep} °C à la base`, "Eau ; Régulation et énergie"],
        ["Pompe à chaleur plutôt que gaz", `${EX.cout} € contre ${EX.coutGaz} € par an ; ${EX.co2} kg de CO2 ; retour en ${EX.retour} ans`, "Régulation et énergie"]
      ], "Choix justifiés du bâtiment d’exemple")
    }),

    BE.ecran({
      id: "synthese", dossier: "methode", kicker: "La méthode, 7", title: "La synthèse d’une page", level: "comprendre",
      text: "La synthèse ouvre la note et tient sur une page A4, écrite à 14 points. Le schéma montre ses six blocs : l’objet, les choix retenus, les résultats clés, les cohérences vérifiées, les données de l’exercice à faire valider, la relecture. Elle dit les choix et leurs raisons ; chaque choix renvoie à la section qui le calcule. Un résultat clé s’écrit avec sa station. La page se termine par le nom de qui a relu et la date.",
      prompt: "Lisez la page vierge, puis l’exemple résolu, et faites l’exercice.",
      render: () => BE.schema("illustrations/page-de-synthese.svg", "Schéma : une page A4 vierge, titrée « Synthèse de la note de calcul », découpée en six blocs empilés. Objet : le projet, le bâtiment, la commande. Choix retenus, en orange : chaque choix et sa raison. Résultats clés : une valeur par ligne, avec sa station. Cohérences vérifiées : les lignes qui doivent se répondre. Données de l’exercice : à faire valider. Relecture : qui a relu, la date. Sous la page : chaque choix renvoie à la section qui le calcule ; la synthèse dit les choix et leurs raisons ; les calculs restent dans leur section.", "La page de synthèse, en tête de la note : six blocs.")
        + exempleSynthese()
    }),

    BE.ecran({
      id: "exercice-4", dossier: "methode", kicker: "Exercice à l’écran 4, la synthèse", title: "À l’écran : la phrase de la synthèse", level: "appliquer", requiresAction: true,
      text: {
        1: "La note de la maison est presque finie. Quatre phrases sont proposées pour le bloc « Choix retenus » de sa synthèse. Une seule y a sa place. L’exemple résolu reste sous vos yeux.",
        2: "La note de la maison est presque finie. Quatre phrases sont proposées pour le bloc « Choix retenus » de sa synthèse. Une seule y a sa place."
      },
      prompt: { 1: "Choisissez la phrase, en vous aidant de l’exemple.", 2: "Choisissez la phrase. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « La synthèse d’une page ».", "Un choix, sa raison, sa section.", "Dans l’exemple, chaque phrase finit par sa section entre parenthèses."],
        2: ["La méthode est à l’écran « La synthèse d’une page ».", "Les calculs restent dans leur section.", "La note de la maison n’a pas de centrale de traitement d’air."]
      },
      ...BE.parNiveau({ 1: avecBloc(exempleSynthese(), EX.ex4.quiz), 2: avecBloc("", EX.ex4.quiz) })
    }),

    BE.ecran({
      id: "relecture-croisee", dossier: "methode", kicker: "La méthode, 8", title: "La relecture croisée", level: "comprendre",
      text: "Au bureau d’études, une note ne part pas sans relecture. Vous relisez la note d’un collègue avec la grille, et il relit la vôtre. Vous ne la réécrivez pas : vous signalez la ligne en défaut, et son auteur la reprend. La grille pose quatre questions. Chaque valeur cite-t-elle sa station et sa source ? Chaque valeur a-t-elle son unité ? Les cinq cohérences sont-elles vérifiées ? Les données de l’exercice sont-elles dites comme telles ? Le relecteur signe le bloc « Relecture » de la synthèse.",
      prompt: "Lisez la grille, puis continuez.",
      render: () => tableau(["Critère de la grille", "Ce que vous écrivez"], [
        ["Station et source citées", "Oui, ou la ligne qui n’en a pas"],
        ["Unité", "Oui, ou la ligne sans unité"],
        ["Cohérences entre lignes", "Oui, ou les deux lignes qui se contredisent"],
        ["Données de l’exercice", "Oui, ou la ligne présentée comme une norme"]
      ], "La grille de relecture croisée")
    }),

    BE.ecran({
      id: "deux-notes", dossier: "methode", kicker: "La méthode, 9", title: "La maison et le bâtiment de bureaux", level: "comprendre",
      text: "Le projet a deux bâtiments, donc deux notes, sur le même gabarit. Elles ne se mélangent pas. La maison a une pompe à chaleur sur radiateurs, une ventilation simple flux, un chauffe-eau thermodynamique et, en variante, un multisplit. Le bâtiment de bureaux a une centrale de traitement d’air avec récupérateur, un groupe d’eau glacée sur ventilo-convecteurs et une supervision. Une ligne de l’une dans l’autre est une erreur de note, même si sa valeur est juste.",
      prompt: "Lisez les deux tableaux, puis continuez vers le projet.",
      render: () => tableau(["Section", "Maison", "Bâtiment de bureaux"], [
        ["Air", "Ventilation simple flux, caisson", "Centrale de traitement d’air, récupérateur à plaques"],
        ["Eau", "Radiateurs, pompe, ballon tampon ; eau chaude sanitaire", "Eau glacée glycolée, ballon tampon, pompe"],
        ["Froid", "Multisplit au R32, en variante", "Groupe d’eau glacée"],
        ["Régulation et énergie", "Loi d’eau ; énergie de l’année, coût, temps de retour", "Régulation de la centrale ; points de supervision ; énergie récupérée"]
      ], "Ce que contient chaque note")
        + tableau(["Mot de la note", "Ce qu’il veut dire"], [
          ["Simultanéité", "Les locaux n’ont pas leur pointe à la même heure ; la puissance avec simultanéité est celle de l’heure la plus chargée."],
          ["Au réel", "La puissance de la machine aux conditions du projet (températures, fluide) ; le catalogue la donne aux conditions nominales."],
          ["Loi d’eau : départ, pente", "La température de l’eau au départ selon la température dehors. Le départ à la base est celui à θe ; la pente dit de combien de degrés le départ monte quand il fait un degré de moins dehors."],
          ["Récupérateur", "L’échangeur de la centrale qui reprend la chaleur de l’air extrait pour l’air neuf : à plaques, ou roue."],
          ["Point de supervision", "Une information ou une commande que la supervision lit ou envoie : une température, une marche, un défaut."],
          ["Temps de retour du surcoût", "Le nombre d’années que met l’économie de chaque année à rembourser ce que la solution coûte en plus à l’achat."]
        ], "Les mots de la note")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

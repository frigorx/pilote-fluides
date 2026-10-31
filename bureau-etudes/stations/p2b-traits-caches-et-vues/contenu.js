/* Station BE-P2b : Traits cachés et vues (gare 2 bis de la ligne « Lire les plans »).
   Méthode sur un bloc percé, une cale en L, une console d'équerre et un support de gaine en U, puis commande sur la pièce du niveau.
   Les nombres des dessins (comptes de traits cachés, dimensions, positions) sont écrits par
   outils/stations/p2b-traits-caches-et-vues/construire.mjs dans le bloc FAITS, depuis faits.json (écrit par dessins.mjs) ;
   les fourchettes (réponses fermées : nombre de traits interrompus par vue) viennent du même fichier.
   Aucun chiffre de faits.json n'est tapé ailleurs dans ce fichier : les textes les reprennent par FX. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const ILLU = "illustrations/";
const GARE2 = "../../../plan/gares/g02-les-vues/index.html";
const GARE3 = "../../../plan/gares/g03-dossier-technique/index.html";
const GARE5 = "../../../plan/gares/g05-conventions/index.html";

/*FAITS-DEBUT*/
const FX = {
 "cale": {
  "dims": "60 × 40 × 36 mm",
  "description": "base de 60 × 40 × 12 mm, talon de 24 × 40 × 24 mm à l’arrière gauche",
  "cachees": {
   "face": 0,
   "dessus": 0,
   "gauche": 1
  }
 },
 "bloc": {
  "nom": "Bloc percé",
  "dims": "60 × 40 × 30 mm",
  "L": 60,
  "l": 40,
  "h": 30,
  "trou": "Ø 16 mm, débouchant, axe vertical, à 20 mm du bord gauche et 20 mm du bord avant",
  "d": 16,
  "r": 8,
  "x": 20,
  "y": 20,
  "cachees": {
   "face": 2,
   "dessus": 0,
   "gauche": 2
  },
  "bord1": 12,
  "bord2": 28,
  "bordY1": 12,
  "bordY2": 28
 },
 "quatre": {
  "juste": "B",
  "fort": "A",
  "decale": "C",
  "aucun": "D"
 },
 "equerre": {
  "dims": "100 × 40 × 60 mm",
  "L": 100,
  "l": 40,
  "h": 60,
  "trous": "deux Ø 9 mm dans la plaque verticale (entraxe 16 mm, à 48 mm du bas), un Ø 11 mm dans la plaque horizontale à 80 mm de la plaque verticale",
  "ep": 6,
  "d9": 9,
  "entraxe9": 16,
  "haut9": 48,
  "d11": 11,
  "dist11": 80,
  "cachees": {
   "face": 4,
   "dessus": 4,
   "gauche": 3
  }
 },
 "u": {
  "dims": "300 × 60 × 40 mm",
  "L": 300,
  "l": 60,
  "h": 40,
  "ep": 4,
  "d": 12,
  "entraxe": 200,
  "bout": 50,
  "nTrous": 2,
  "cachees": {
   "face": 5,
   "dessus": 0,
   "gauche": 2
  },
  "fond": 1
 },
 "projets": {
  "1": {
   "nom": "Bloc percé du projet",
   "dims": "60 × 40 × 30 mm, trou débouchant vertical Ø 16 mm à 45 mm du bord gauche et 20 mm du bord avant",
   "echelle": "1:1",
   "cachees": {
    "face": 2,
    "dessus": 0,
    "gauche": 2
   }
  },
  "2": {
   "nom": "Console du projet",
   "dims": "plaque verticale 6 × 40 × 50 mm percée d’un trou Ø 9 mm (à 38 mm du bas, au milieu de la largeur) ; plaque horizontale 80 × 40 × 6 mm percée de deux trous Ø 11 mm à 40 et 65 mm de la plaque verticale, au milieu de la largeur",
   "echelle": "1:1",
   "cachees": {
    "face": 6,
    "dessus": 2,
    "gauche": 3
   }
  },
  "3": {
   "nom": "Support de gaine du projet",
   "dims": "profilé U 250 × 60 × 40 mm, épaisseur 4 mm, ouvert vers le haut et aux deux bouts ; trois trous Ø 12 mm dans le fond, dans l’axe, à 25, 125 et 225 mm du bout gauche",
   "echelle": "1:2",
   "cachees": {
    "face": 7,
    "dessus": 0,
    "gauche": 2
   }
  }
 }
};
/*FAITS-FIN*/

/* Petits outils de rédaction : les nombres en toutes lettres et l'accord de « trait interrompu ». */
const NB = n => ["aucun", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"][n];
const traits = n => `${NB(n)} trait${n > 1 ? "s" : ""} interrompu${n > 1 ? "s" : ""}`;
const sansOuAvec = n => (n === 0 ? "sans trait interrompu" : `avec ${traits(n)}`);
const virg = v => String(v).replace(".", ",");
const { cale, bloc, quatre, equerre, u } = FX;

/* Une activité précédée d'un bloc de contenu (figure, exemple résolu) : le bloc reste sous les yeux. */
const avec = (html, act) => ({ render: item => html + act.render(item), wire: item => { if (act.wire) act.wire(item); } });
const fig = (nom, alt, legende) => BE.schema(ILLU + nom, alt, legende);

/* ---- Figures et leur texte alternatif (les comptes viennent de FX) ---- */
const figCale = () => fig("1-cale-trois-vues.svg", `La cale en L en trois vues et en volume. La vue de face montre le L. La vue de dessus montre deux rectangles côte à côte. La vue de gauche montre un rectangle avec ${traits(cale.cachees.gauche)}. À droite, la cale en volume.`, "La cale en L : trois vues et la pièce en volume.");
const figBloc = () => fig("2-bloc-perce-trois-vues.svg", `Le bloc percé en trois vues et en volume. Sur la vue de face, ${traits(bloc.cachees.face)} de part et d’autre d’un axe en trait mixte fin. Sur la vue de dessus, le trou est un cercle avec ses axes en croix. Sur la vue de gauche, ${traits(bloc.cachees.gauche)} de part et d’autre d’un axe. À droite, le bloc en volume, trou visible sur le dessus.`, "Le bloc percé : le trou se voit de dessus, il se devine de face et de gauche.");
const figRappel = () => fig("3-correspondance-des-vues.svg", "Les trois vues du bloc percé reliées par des lignes de rappel fines. Des lignes verticales relient la vue de face à la vue de dessus, des lignes horizontales relient la vue de face à la vue de gauche, et une ligne à 45 degrés relie la vue de dessus à la vue de gauche.", "Les lignes de rappel entre les vues, et la ligne à 45°.");
const figQuatre = () => fig("4-exercice-quatre-vues-de-face.svg", "Quatre vues de face du bloc percé, repérées A, B, C et D, côte à côte. Chacune est un rectangle dont le trou est dessiné d’une façon différente.", "Quatre vues de face du bloc percé : une seule est juste.");
const figConsole = () => fig("5-console-equerre-trois-vues.svg", `La console d’équerre en trois vues cotées et en volume. La vue de face montre un L, plaque verticale à gauche et plaque horizontale en bas, avec la cote ${equerre.L} en haut et la cote ${equerre.h} à gauche. La vue de dessus est un rectangle de cote ${equerre.l} avec un cercle près de l’extrémité droite. La vue de gauche est un rectangle avec deux cercles en haut. À droite, la console en volume.`, "La console d’équerre : trois vues cotées et la pièce en volume.");
const figSupport = () => fig("6-support-gaine-u-trois-vues.svg", `Le support de gaine en U en trois vues cotées. La vue de face, longue, porte la cote ${u.L} et un trait interrompu le long du bas. La vue de dessus montre deux cercles de cote d’entraxe ${u.entraxe}. La vue de gauche montre la section en U, de cotes ${u.l} et ${u.h}.`, "Le support de gaine en U : face, dessus et gauche, cotées.");
const figSupportVolume = () => fig("7-support-gaine-u-volume.svg", "Le support de gaine en U vu en volume : un profilé long, ouvert vers le haut, avec deux trous dans le fond.", "Le support de gaine en U, en volume.");

/* ---- Exercice 1 : quelle vue de face est juste ? ---- */
const LETTRES = ["A", "B", "C", "D"];
const EX1 = {
  choices: LETTRES.map(l => `La vue ${l}`),
  good: LETTRES.indexOf(quatre.juste),
  explain: `La vue ${quatre.juste} est juste : de face, le trou donne ${traits(bloc.cachees.face)} fins, à ${virg(bloc.bord1)} et ${virg(bloc.bord2)} mm du bord gauche, avec son axe en trait mixte fin. La vue ${quatre.fort} dessine ces traits en trait continu fort : on les lirait comme des arêtes que l’on voit. La vue ${quatre.aucun} ne montre aucun trait caché : le trou a disparu de la vue. La vue ${quatre.decale} place le trou plus à droite que sur la pièce.`
};

/* ---- Exercice 2 : où voit-on chaque trou de la console ? ---- */
const VUES3 = ["vue de face", "vue de dessus", "vue de gauche"];
const EX2 = {
  exemple: { text: `Le trou Ø ${bloc.d} du bloc percé, qui le traverse de haut en bas, se voit en cercle`, good: 1, why: "Son axe est vertical : l’œil le regarde dans l’axe depuis le dessus." },
  lignes: [
    { text: `Les deux trous Ø ${equerre.d9} se voient en cercles`, good: 2, why: "Leur axe va de la gauche vers la droite : on les regarde dans l’axe depuis la gauche.", bad: "Cherchez la direction de l’axe de ces trous, puis le côté d’où l’œil la regarde." },
    { text: `Le trou Ø ${equerre.d11} se voit en cercle`, good: 1, why: "Son axe est vertical : on le regarde dans l’axe depuis le dessus.", bad: "Cherchez la direction de l’axe de ce trou, puis le côté d’où l’œil la regarde." },
    { text: "Le profil en L de la console se lit", good: 0, why: "Le profil est dans le plan de la vue de face : on y lit la longueur et la hauteur de la console.", bad: "Le profil en L est une forme de côté, vue dans le plan de la longueur et de la hauteur." },
    { text: "Les deux trous de la plaque verticale donnent quatre traits cachés", good: 1, why: "Vue de dessus, la plaque verticale se voit par sa tranche : chacun de ses deux trous horizontaux y est caché et donne deux arêtes cachées, quatre traits en tout.", bad: "Cherchez la vue où la plaque verticale se voit par sa tranche et où ses deux trous ne se superposent pas." }
  ]
};

/* ---- Exercice 3 : compter les traits interrompus du support ---- */
const EX3 = (() => {
  const juste = u.cachees.face, sansFond = juste - u.fond, avecCercles = juste + u.nTrous, unParTrou = u.nTrous + u.fond;
  const valeurs = [...new Set([juste, sansFond, avecCercles, unParTrou])].sort((a, b) => a - b);
  if (valeurs.length !== 4) throw new Error("exercice 3 : deux choix identiques");
  return {
    q1: {
      choices: valeurs.map(n => `${n} traits interrompus`),
      good: valeurs.indexOf(juste),
      explain: `Le fond du U donne ${traits(u.fond)} sur toute la longueur. Chaque trou qui traverse le fond donne deux traits, soit ${2 * u.nTrous} traits pour ${NB(u.nTrous)} trous. Total : ${u.fond} + ${2 * u.nTrous} = ${juste}. Le choix à ${sansFond} oublie le fond. Le choix à ${avecCercles} ajoute les ${NB(u.nTrous)} cercles de la vue de dessus, qui sont des traits continus. Le choix à ${unParTrou} ne compte qu’un trait par trou.`
    },
    q2: {
      choices: ["La vue de face", "La vue de dessus", "La vue de gauche", "Aucune des trois"],
      good: 1,
      explain: `L’entraxe, ${u.entraxe} mm, se cote sur la vue de dessus, où les trous se voient en cercles. La vue de face ne montre que de petits traits cachés, et la vue de gauche montre le profil en U.`
    }
  };
})();
const exempleTrou = () => BE.exemple({ text: `Bloc percé, vue de face : un trou qui traverse la pièce`, answer: traits(bloc.cachees.face), why: "Un trou qui traverse laisse un trait interrompu de chaque côté : deux traits pour un trou." });

/* Seconde question du niveau 3, dans le même écran : même présentation que le quiz du moteur, sans toucher au moteur. */
let reponse2 = null;
const q2Interieur = () => {
  const q = EX3.q2;
  const boutons = q.choices.map((c, i) => `<button class="choice ${reponse2 === i ? (i === q.good ? "good" : "bad") : ""}" type="button" data-quiz2="${i}" ${reponse2 !== null ? "disabled" : ""}><strong>${String.fromCharCode(65 + i)}.</strong><small>${BE.esc(c)}</small></button>`).join("");
  const retour = reponse2 === null ? "Choisissez une réponse." : `<strong>${reponse2 === q.good ? "Correct." : "À revoir."}</strong> ${BE.esc(q.explain)}`;
  return `<p class="renvoi"><strong>Seconde question.</strong> Quelle vue donne l’entraxe des trous ?</p><div class="cards" style="--cols:2">${boutons}</div><div class="feedback ${reponse2 === null ? "" : reponse2 === q.good ? "good" : "bad"}" id="feedback-2">${retour}</div>`;
};
const q2Brancher = () => {
  document.querySelectorAll("[data-quiz2]").forEach(b => b.addEventListener("click", () => {
    if (reponse2 !== null) return;
    reponse2 = Number(b.dataset.quiz2);
    document.querySelector("#question-2").innerHTML = q2Interieur();
    q2Brancher();
  }));
};
const avecSecondeQuestion = act => ({ render: item => act.render(item) + `<div class="panel" id="question-2">${q2Interieur()}</div>`, wire: item => { act.wire(item); q2Brancher(); } });

/* ---- À vous, le projet ---- */
const P = FX.projets;
const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet",
  prompt: { 1: "Ouvrez la feuille réponse, puis traitez la commande.", 2: "Ouvrez la feuille réponse, puis traitez la commande.", 3: "Prenez une feuille quadrillée ou du papier libre, puis traitez la commande." },
  aides: {
    1: [
      "La pièce et ses dimensions sont dans la commande, avec le volume sous elle. Les écrans « L’arête cachée » et « Les vues se répondent » donnent la méthode.",
      "Commencez par le contour de la vue de face. Un trou qui traverse la pièce laisse deux traits interrompus fins sur les vues où on le regarde de côté, et son axe se trace en trait mixte fin. Reportez les largeurs de la vue de face sur la vue de dessus avec des lignes de rappel.",
      `Sur le bloc de l’exemple, le trou est à ${bloc.x} mm du bord gauche et son rayon est de ${virg(bloc.r)} mm : ses traits de face sont à ${bloc.x} − ${virg(bloc.r)} et ${bloc.x} + ${virg(bloc.r)} mm du bord gauche. Faites le même calcul avec la position du trou de votre pièce.`
    ],
    2: [
      "La commande donne les deux plaques et leurs trous. L’écran « Le code des traits sur une vue » dit comment compter, les écrans « L’arête cachée » et « Les vues se répondent » comment placer.",
      "Pour chaque trou, cherchez la direction de son axe : l’œil qui la regarde voit un cercle, les autres vues montrent des traits interrompus. Une partie de la pièce peut aussi cacher une arête. Quand deux traits se superposent, n’en tracez qu’un.",
      `Sur la console de l’exercice, le trou Ø ${equerre.d11} est à ${equerre.dist11} mm de la plaque verticale : ses deux traits de face sont à ${virg(equerre.dist11 - equerre.d11 / 2)} et ${virg(equerre.dist11 + equerre.d11 / 2)} mm. Faites le même calcul pour chaque trou de votre console.`
    ],
    3: [
      "La commande donne le profilé et ses trous. L’écran « Lire un support d’équipement CVC » dit ce que chaque vue apporte.",
      "La vue de gauche donne la section en U, la vue de dessus l’entraxe et les cercles des trous, la vue de face le fond du U et les trous en traits interrompus. Placez les cotes hors des vues, pour que le texte ne chevauche aucun trait.",
      `Sur le support de l’exercice, le premier trou est à ${u.bout} mm du bout gauche et son diamètre est de ${u.d} mm : ses traits de face sont à ${virg(u.bout - u.d / 2)} et ${virg(u.bout + u.d / 2)} mm du bout. Faites de même pour les trous de votre support.`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const niveauCourant = BE.parNiveau({ 1: { render: () => "1" }, 2: { render: () => "2" }, 3: { render: () => "3" } });
const legendeVolume = { 1: "La pièce du projet, en volume.", 2: "La pièce du projet, en volume.", 3: "La pièce du projet, en volume." };
const altVolume = { 1: "Un bloc avec un trou vertical, vu en volume.", 2: "Une console en deux plaques percées de trous, vue en volume.", 3: "Un profilé en U ouvert vers le haut, percé de trous dans le fond, vu en volume." };
ecranProjet.render = () => {
  let html = rendreCommande();
  const n = niveauCourant.render();
  if (n === "3") html = html.replace(/<p class="commande-actions">[\s\S]*?<\/p>/, '<p class="commande-actions">Ce niveau n’a pas de feuille imprimée : travaillez sur papier libre ou sur une feuille quadrillée.</p>');
  return html + fig(`projet-N${n}-volume.svg`, altVolume[n], legendeVolume[n]);
};

BE.station({
  code: "BE-P2b",
  titre: "Traits cachés et vues",
  ligne: "Lire les plans",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Bloc percé, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "Console d’équerre, sans balisage", partie: "publique" },
    { n: 3, nom: "professionnel", batiment: "Support de gaine en U, trois vues cotées", partie: "publique" }
  ],
  intro: "Un dessinateur de bureau d’études décrit une pièce par ses vues et y place ce que l’on ne voit pas, en traits interrompus fins. Vous apprenez le geste sur un bloc percé et une console, puis vous le faites sur la pièce de votre niveau : un bloc percé, une console d’équerre ou un support de gaine en U.",
  note: "Les dimensions des pièces et les échelles sont des valeurs d’exercice. Le code des traits et le rangement des vues viennent des gares 2 et 5 de la ligne « Lire les plans ».",

  dossiers: [
    { id: "prise", label: "Prise en main", note: "objectif et acquis" },
    { id: "methode", label: "La méthode", note: "vues, traits cachés, support" },
    { id: "projet", label: "Le projet", note: "commande et vérification" },
    { id: "emporter", label: "Emporter", note: "fiche et suite" }
  ],

  projet: {
    1: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau guidé",
      objet: "Les trois vues du bloc percé du projet, avec traits cachés et axes",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études vous remet un bloc percé, que le volume ci-dessous montre : ${P[1].dims}. Vous dessinez ses trois vues sur la feuille réponse, à l’échelle ${P[1].echelle} ${P[1].echelle === "1:2" ? "(1 mm de la pièce fait 0,5 mm sur le papier : une longueur de 60 mm se dessine sur 30 mm, voyez la gare 6 « Les échelles »)" : "(en vraie grandeur : 1 mm de la pièce fait 1 mm sur le papier)"} : un carreau vaut 5 mm. Suivez les étapes dans l’ordre.`,
        "Étape 1. Regardez le volume : repérez le trou, ses côtés, et ce que l’on voit de face.",
        "Étape 2. Dans le cadre « Vue de face » de la feuille, tracez le contour en trait continu fort, puis les arêtes cachées du trou en trait interrompu fin (écran « L’arête cachée »).",
        "Étape 3. Dans le cadre « Vue de dessus », sous la vue de face, tracez la vue avec les mêmes largeurs, aidé de lignes de rappel légères (écran « Les vues se répondent »).",
        "Étape 4. Dans le cadre « Vue de gauche », à droite de la vue de face, reportez les hauteurs de la vue de face et les profondeurs de la vue de dessus par la ligne à 45°.",
        "Étape 5. Ajoutez l’axe du trou en trait mixte fin sur chaque vue où il apparaît (écran « Le code des traits sur une vue »).",
        "Étape 6. Comptez les traits interrompus de chaque vue, notez-les au verso, puis vérifiez à l’écran Vérifier."
      ],
      pieces: [
        { piece: "La pièce en volume et ses dimensions", ou: "Cet écran, commande et figure ci-dessous" },
        { piece: "Les gares 2 et 5", ou: "Écran « Ce que vous savez déjà », liens vers les deux gares" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Les trois vues de la console du projet, avec traits cachés et axes",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études vous remet une console d’équerre, que le volume ci-dessous montre : ${P[2].dims}. Les distances en longueur se mesurent depuis la face extérieure de la plaque verticale. Dessinez ses trois vues sur la feuille réponse, à l’échelle ${P[2].echelle} ${P[2].echelle === "1:2" ? "(1 mm de la pièce fait 0,5 mm sur le papier : une longueur de 60 mm se dessine sur 30 mm, voyez la gare 6 « Les échelles »)" : "(en vraie grandeur : 1 mm de la pièce fait 1 mm sur le papier)"} : un carreau vaut 5 mm. Chaque vue porte ses arêtes cachées en trait interrompu fin et les axes des trous en trait mixte fin. Au verso, notez le nombre de traits interrompus de chaque vue, la source de vos dimensions et vos hypothèses.`,
      pieces: [
        { piece: "La pièce en volume et ses dimensions", ou: "Cet écran, commande et figure ci-dessous" },
        { piece: "La station", ou: "Elle reste ouverte comme ressource pendant la commande" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    3: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau professionnel",
      objet: "Les trois vues cotées du support de gaine du projet, avec traits cachés et axes",
      delai: "Rendu en fin de séance",
      commande: `Le bureau d’études vous remet un support de gaine, que le volume ci-dessous montre : ${P[3].dims}. Dessinez ses trois vues sur papier libre ou sur une feuille quadrillée, à l’échelle ${P[3].echelle} ${P[3].echelle === "1:2" ? "(1 mm de la pièce fait 0,5 mm sur le papier : une longueur de 60 mm se dessine sur 30 mm, voyez la gare 6 « Les échelles »)" : "(en vraie grandeur : 1 mm de la pièce fait 1 mm sur le papier)"}, en les rangeant comme à la gare 2. Chaque vue porte ses arêtes cachées en trait interrompu fin et les axes des trous en trait mixte fin. Ajoutez les cotes qui permettent de fabriquer la pièce, tracées comme sur la figure 6 de l’écran « Lire un support d’équipement CVC » : une ligne de cote fine entre deux lignes d’attache, une flèche à chaque bout, la valeur en millimètres de la pièce (pas du papier) écrite au-dessus, hors des vues, et Ø devant un diamètre : longueur, largeur, hauteur, position et diamètre des trous. Notez le nombre de traits interrompus de chaque vue, la source de vos dimensions et vos hypothèses.`,
      pieces: [
        { piece: "La pièce en volume et ses dimensions", ou: "Cet écran, commande et figure ci-dessous" },
        { piece: "Un exemple de support coté", ou: "Écran « Lire un support d’équipement CVC »" },
        { piece: "Papier", ou: "Papier libre ou feuille quadrillée, format A4" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-face", libelle: "Traits interrompus dessinés sur la vue de face", unite: "traits", min: 2, max: 2, indice: "Relisez l’écran « L’arête cachée » : un trou qui traverse donne deux traits interrompus fins, et une partie de la pièce peut en cacher une autre. Repassez sur la pièce en volume, comptez les tirets de la vue de face sans compter les axes, puis contrôlez avec votre vue de dessus." },
      { id: "n1-dessus", libelle: "Traits interrompus dessinés sur la vue de dessus", unite: "traits", min: 0, max: 0, indice: "Relisez l’écran « L’arête cachée » : de dessus, un trou vertical se voit en cercle, donc sans trait interrompu, mais un trou horizontal laisse deux traits. Regardez la pièce du dessus et cherchez ce que les autres parties cachent." },
      { id: "n1-gauche", libelle: "Traits interrompus dessinés sur la vue de gauche", unite: "traits", min: 2, max: 2, indice: "Relisez l’écran « Les vues se répondent » : les hauteurs de la vue de gauche sont celles de la vue de face. Comptez les tirets de la vue de gauche sans compter les axes, et pensez aux traits qui se superposent : ils n’en font qu’un." }
    ],
    2: [
      { id: "n2-face", libelle: "Traits interrompus dessinés sur la vue de face", unite: "traits", min: 6, max: 6, indice: "Relisez l’écran « L’arête cachée » : un trou qui traverse donne deux traits interrompus fins, et une partie de la pièce peut en cacher une autre. Repassez sur la pièce en volume, comptez les tirets de la vue de face sans compter les axes, puis contrôlez avec votre vue de dessus." },
      { id: "n2-dessus", libelle: "Traits interrompus dessinés sur la vue de dessus", unite: "traits", min: 2, max: 2, indice: "Relisez l’écran « L’arête cachée » : de dessus, un trou vertical se voit en cercle, donc sans trait interrompu, mais un trou horizontal laisse deux traits. Regardez la pièce du dessus et cherchez ce que les autres parties cachent." },
      { id: "n2-gauche", libelle: "Traits interrompus dessinés sur la vue de gauche", unite: "traits", min: 3, max: 3, indice: "Relisez l’écran « Les vues se répondent » : les hauteurs de la vue de gauche sont celles de la vue de face. Comptez les tirets de la vue de gauche sans compter les axes, et pensez aux traits qui se superposent : ils n’en font qu’un." }
    ],
    3: [
      { id: "n3-face", libelle: "Traits interrompus dessinés sur la vue de face", unite: "traits", min: 7, max: 7, indice: "Relisez l’écran « L’arête cachée » : un trou qui traverse donne deux traits interrompus fins, et une partie de la pièce peut en cacher une autre. Repassez sur la pièce en volume, comptez les tirets de la vue de face sans compter les axes, puis contrôlez avec votre vue de dessus." },
      { id: "n3-dessus", libelle: "Traits interrompus dessinés sur la vue de dessus", unite: "traits", min: 0, max: 0, indice: "Relisez l’écran « L’arête cachée » : de dessus, un trou vertical se voit en cercle, donc sans trait interrompu, mais un trou horizontal laisse deux traits. Regardez la pièce du dessus et cherchez ce que les autres parties cachent." },
      { id: "n3-gauche", libelle: "Traits interrompus dessinés sur la vue de gauche", unite: "traits", min: 2, max: 2, indice: "Relisez l’écran « Les vues se répondent » : les hauteurs de la vue de gauche sont celles de la vue de face. Comptez les tirets de la vue de gauche sans compter les axes, et pensez aux traits qui se superposent : ils n’en font qu’un." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "P3", titre: "Le dossier technique", href: GARE3 },
  correspondances: [
    { reseau: "Lire les plans", titre: "Gare 2, Le dé à six faces", href: GARE2, pourquoi: "Vous y trouvez les six vues d’un objet, leur rangement et les alignements, que cette station reprend." },
    { reseau: "Lire les plans", titre: "Gare 5, Conventions graphiques", href: GARE5, pourquoi: "Vous y trouvez le code des traits, dont cette station emploie le trait interrompu et le trait mixte." },
    { reseau: "Bureau d’études", titre: "BE-P5b, Coupes et sections", href: "../p5b-coupes-et-sections/index.html", pourquoi: "Une coupe montre l’intérieur d’une pièce, là où cette station le devine par des traits cachés." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      image: "illustrations/1-dessinateur-support-de-gaine.webp", imageAlt: "Un dessinateur de bureau d’études est assis devant son écran, qui affiche un support de gaine en U. Sur son bureau, une feuille quadrillée avec trois vues d’une pièce et un crayon.",
      text: {
        1: "Un bureau d’études remet au dessinateur une pièce à faire fabriquer. Le dessinateur la décrit par trois vues et y place ce que l’on ne voit pas : les arêtes cachées, en traits interrompus fins. Vous rendez, sur papier, les trois vues d’un bloc percé. Chaque vue porte ses arêtes cachées et l’axe du trou. À la fin, vous comptez les traits interrompus de chaque vue et l’écran vous dit si le compte est bon. L’écran explique chaque geste, la feuille reçoit vos dessins.",
        2: "Un bureau d’études remet au dessinateur une pièce à faire fabriquer. Le dessinateur la décrit par trois vues et y place ce que l’on ne voit pas : les arêtes cachées, en traits interrompus fins. Vous rendez, sur papier, les trois vues d’une console d’équerre, support d’un collier de gaine. Chaque vue porte ses arêtes cachées et les axes des trous. À la fin, vous comptez les traits interrompus de chaque vue et l’écran vous dit si le compte est bon. L’écran explique chaque geste, la feuille reçoit vos dessins.",
        3: "Un bureau d’études remet au dessinateur une pièce à faire fabriquer. Le dessinateur la décrit par trois vues cotées et y place ce que l’on ne voit pas : les arêtes cachées, en traits interrompus fins. Vous rendez, sur papier libre ou quadrillé, les trois vues d’un support de gaine en U, avec ses cotes. Chaque vue porte ses arêtes cachées et les axes des trous. À la fin, vous comptez les traits interrompus de chaque vue et l’écran vous dit si le compte est bon. L’écran explique chaque geste, votre papier reçoit vos dessins."
      },
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Vous recevez", rows: [["La commande :", "une pièce décrite en volume et par ses dimensions."], ["Le dossier :", "les gares 2 et 5 de la ligne « Lire les plans », que vous connaissez."]] },
        { title: "Vous produisez", rows: [["Trois vues :", "face, dessus sous la face, gauche à droite de la face."], ["Sur chaque vue :", "les traits continus forts, les traits interrompus fins et les axes en trait mixte fin."]] },
        { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la gare 3, le dossier technique."]] }
      ])
    }),

    BE.ecran({
      id: "ce-que-vous-savez-deja", dossier: "prise", kicker: "Prise en main, 2", title: "Ce que vous savez déjà", level: "comprendre",
      text: "Deux gares de la ligne « Lire les plans » servent de point de départ. La gare 2, « Le dé à six faces », donne les six vues d’un objet et leur rangement : la vue de dessus se dessine sous la vue de face, la vue de gauche à droite de la vue de face. La gare 5, « Conventions graphiques », donne le code des traits : le trait fort pour ce qui existe, le trait fin pour ce qui habille, le trait interrompu pour ce qui est là sans se voir. Cette station ajoute le geste du dessinateur : placer les arêtes cachées sur chaque vue et choisir les vues utiles.",
      prompt: "Lisez le tableau, ouvrez une gare si un point est flou, puis continuez.",
      render: () => tableau(["Ce que vous savez", "En une ligne", "Où le revoir"], [
        ["Le rangement des vues", "La vue de dessus se dessine sous la vue de face, la vue de gauche à droite de la vue de face.", "Gare 2, « Le dé à six faces »"],
        ["Les alignements", "Mêmes largeurs entre la vue de face et la vue de dessus, mêmes hauteurs entre la vue de face et la vue de gauche.", "Gare 2, « Les vues se répondent »"],
        ["Le code des traits", "Fort : ce qui existe. Fin : ce qui habille. Interrompu : ce qui est là sans se voir.", "Gare 5, « Le code des traits »"]
      ], "Les deux gares que cette station reprend")
        + BE.liens([
          { href: GARE2, title: "Gare 2 : Le dé à six faces", note: "Les six vues, la croix des vues, les alignements" },
          { href: GARE5, title: "Gare 5 : Conventions graphiques", note: "Le code des traits, les hachures, les symboles" }
        ])
    }),

    BE.ecran({
      id: "vues-utiles", dossier: "methode", kicker: "La méthode, 1", title: "Les vues utiles d’une pièce simple", level: "comprendre",
      text: `On dessine le moins de vues possible : celles qui lèvent tout doute sur la forme. La vue de face vient en premier, parce qu’elle montre en général le plus de formes. Les autres s’ajoutent seulement si elles apprennent quelque chose. La cale en L de la figure, ${cale.dims}, en est un exemple. Sa vue de face montre le L, ${sansOuAvec(cale.cachees.face)}. Sa vue de dessus donne la profondeur, ${sansOuAvec(cale.cachees.dessus)}. Sa vue de gauche montre un rectangle et ${traits(cale.cachees.gauche)} : elle n’apprend rien de plus. Deux vues suffisent à décrire cette cale.`,
      prompt: "Lisez la figure et l’exemple résolu, puis continuez.",
      render: () => figCale()
        + BE.exemple({ text: `Cale en L, ${cale.dims} : quelles vues garder ?`, answer: "la vue de face et la vue de dessus", why: `Le L se lit de face, la profondeur se lit de dessus. De gauche, on ne voit qu’un rectangle et ${traits(cale.cachees.gauche)}, le bord de la base caché derrière le talon.` })
    }),

    BE.ecran({
      id: "arete-cachee", dossier: "methode", kicker: "La méthode, 2", title: "L’arête cachée", level: "comprendre",
      text: `Une arête cachée est une arête que l’observateur ne voit pas. Deux cas se rencontrent : elle borde un trou qui traverse la pièce, ou une autre partie de la pièce passe devant elle. On la dessine en trait interrompu fin. Le bloc percé de la figure, ${bloc.dims}, a un trou de Ø ${bloc.d} qui le traverse de haut en bas. De dessus, le trou se voit en cercle. De face, on ne voit que de la matière, et pourtant le trou est là : ses deux bords donnent ${traits(bloc.cachees.face)}. L’axe du trou se trace en trait mixte fin. Sur la cale en L, la vue de gauche porte ${traits(cale.cachees.gauche)} : le bord de la base, caché derrière le talon.`,
      prompt: "Lisez la figure et l’exemple résolu, puis continuez.",
      render: () => figBloc()
        + BE.exemple({ text: `Bloc percé, trou Ø ${bloc.d} dont l’axe est à ${bloc.x} mm du bord gauche`, answer: `${traits(bloc.cachees.face)} sur la vue de face, à ${virg(bloc.bord1)} et ${virg(bloc.bord2)} mm du bord gauche`, why: `Le rayon est de ${virg(bloc.r)} mm : ${bloc.x} − ${virg(bloc.r)} = ${virg(bloc.bord1)} et ${bloc.x} + ${virg(bloc.r)} = ${virg(bloc.bord2)}. L’axe se trace en trait mixte fin à ${bloc.x} mm.` })
    }),

    BE.ecran({
      id: "code-des-traits", dossier: "methode", kicker: "La méthode, 3", title: "Le code des traits sur une vue", level: "comprendre",
      text: "Trois traits suffisent pour une vue de pièce. Le trait continu fort dessine ce que l’on voit. Le trait interrompu fin dessine ce que l’on ne voit pas : une arête cachée. Le trait mixte fin, fait d’un long trait puis d’un court, dessine l’axe d’un trou ou d’une symétrie, et dépasse un peu du contour de chaque côté. Sur une vue, on compte les traits interrompus un par un, sans les axes. Quand deux traits cachés se superposent, on n’en dessine qu’un, et il compte pour un seul.",
      prompt: "Lisez le tableau, puis continuez.",
      render: () => tableau(["Trait", "Ce qu’il dessine", "Sur le bloc percé"], [
        ["Continu fort", "une arête que l’on voit", "le contour de chaque vue, le cercle du trou vu de dessus"],
        ["Interrompu fin", "une arête cachée", "les deux bords du trou sur la vue de face"],
        ["Mixte fin", "l’axe d’un trou ou d’une symétrie", "l’axe du trou, en croix sur la vue de dessus"]
      ], "Le code des traits d’une vue")
        + BE.renvoi(`Le code des traits est détaillé à la <a href="${GARE5}">gare 5</a>.`)
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice 1, la vue de face juste", title: "Exercice : quelle vue de face est juste ?", level: "appliquer", requiresAction: true,
      text: {
        1: `Le bloc percé de l’écran « L’arête cachée », ${bloc.dims}, a un trou de Ø ${bloc.d} qui le traverse de haut en bas, avec son axe à ${bloc.x} mm du bord gauche. Quatre vues de face sont dessinées, une seule est juste. La figure du bloc reste sous vos yeux : regardez le type de chaque trait et la place du trou.`,
        2: `Un bloc percé de ${bloc.dims} a un trou de Ø ${bloc.d} qui le traverse de haut en bas, avec son axe à ${bloc.x} mm du bord gauche. Quatre vues de face sont dessinées, une seule est juste. Choisissez-la sans la figure du bloc.`
      },
      prompt: { 1: "Choisissez la vue de face juste, en vous aidant de la figure du bloc.", 2: "Choisissez la vue de face juste. Cette question est à faire seul." },
      aides: {
        1: [
          "Les quatre vues sont à la figure de l’exercice. Le bloc et son trou sont décrits dans l’énoncé et sur la figure de l’écran « L’arête cachée ».",
          "Un trou qui traverse la pièce donne, vu de face, deux traits interrompus fins, un de chaque côté de son axe en trait mixte fin. Cherchez la vue qui respecte le type de trait et la place du trou.",
          "Sur la cale en L, la vue de gauche porte un trait interrompu : on le reconnaît à ses tirets réguliers. Repérez de même, sur chaque vue, les traits faits de tirets et ceux qui sont continus."
        ],
        2: [
          "Les quatre vues sont à la figure de l’exercice. Le bloc et son trou sont dans l’énoncé. L’écran « Le code des traits sur une vue » dit comment se dessine chaque trait.",
          "Un trou qui traverse la pièce donne, vu de face, deux traits interrompus fins, un de chaque côté de son axe en trait mixte fin. Cherchez la vue qui respecte le type de trait et la place du trou.",
          "Sur un autre bloc dont le trou est centré, les deux traits sont de part et d’autre du milieu, à égale distance de l’axe. Faites le même contrôle sur chaque vue : l’axe est-il au milieu des deux traits, et à la bonne place sur la pièce ?"
        ]
      },
      ...BE.parNiveau({
        1: avec(figBloc() + figQuatre(), BE.quiz(EX1)),
        2: avec(figQuatre(), BE.quiz(EX1))
      })
    }),

    BE.ecran({
      id: "les-vues-se-repondent", dossier: "methode", kicker: "La méthode, 4", title: "Les vues se répondent", level: "comprendre",
      text: `Les vues d’une même pièce se répondent. Pour placer la ligne à 45° : prolongez vers la droite le bord haut de la vue de dessus (le bord arrière de la pièce) et vers le bas le bord gauche de la vue de gauche (le même bord arrière) ; de leur croisement, tracez la ligne à 45° vers le bas et la droite. Chaque profondeur part de la vue de dessus vers la droite, touche cette ligne, puis monte vers la vue de gauche. Les largeurs passent à la verticale de la vue de face à la vue de dessus : les bords du trou, à ${virg(bloc.bord1)} et ${virg(bloc.bord2)} mm du bord gauche, tombent de part et d’autre du cercle de la vue de dessus. Les hauteurs passent à l’horizontale de la vue de face à la vue de gauche. Les profondeurs passent de la vue de dessus à la vue de gauche : on part de la vue de dessus vers la droite, on tourne à la ligne à 45°, puis on monte vers la vue de gauche. Ces lignes de rappel se tracent en trait fin et servent à placer les traits.`,
      prompt: "Lisez la figure et l’exemple résolu, puis continuez.",
      render: () => figRappel()
        + BE.exemple({ text: `Bord gauche du trou, sur la vue de face : à ${virg(bloc.bord1)} mm du bord gauche`, answer: "même position sur la vue de dessus", why: "Une ligne verticale tirée du trait interrompu descend jusqu’au bord gauche du cercle. Mêmes largeurs, mêmes verticales." })
    }),

    BE.ecran({
      id: "choisir-les-vues", dossier: "methode", kicker: "La méthode, 5", title: "Choisir les vues nécessaires", level: "comprendre",
      text: `Une vue est nécessaire quand elle apprend quelque chose que les autres ne disent pas. Pour la cale en L, la vue de face donne le L et la vue de dessus la profondeur : la vue de gauche n’ajoute rien. Pour le bloc percé, la vue de face donne la hauteur et le passage du trou, la vue de dessus donne sa position et son diamètre : la vue de gauche répète la vue de face, avec ${traits(bloc.cachees.gauche)} comme elle. Une pièce plus riche demande plus de vues : la console d’équerre de l’exercice suivant en demande trois, parce que ses deux trous de Ø ${equerre.d9} ne se voient en cercles que sur la vue de gauche.`,
      prompt: "Lisez les deux exemples résolus, puis continuez.",
      render: () => BE.exemple({ text: `Cale en L, ${cale.dims}`, answer: "la vue de face et la vue de dessus", why: `Le L se lit de face, la profondeur de dessus. La vue de gauche montre un rectangle et ${traits(cale.cachees.gauche)} : rien de nouveau.` })
        + BE.exemple({ text: `Bloc percé, ${bloc.dims}, trou de Ø ${bloc.d}`, answer: "la vue de face et la vue de dessus", why: `De dessus, le trou se voit en cercle : position et diamètre. De face, ${traits(bloc.cachees.face)} donnent son passage de haut en bas. La vue de gauche répète la vue de face.` })
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice 2, où voit-on chaque trou", title: "Exercice : trois vues d’une console d’équerre", level: "appliquer", requiresAction: true,
      text: {
        1: `La console d’équerre de la figure porte un collier de gaine. Elle est faite de deux plaques de ${equerre.ep} mm d’épaisseur, une plaque verticale et une plaque horizontale. Dimensions : ${equerre.dims}. Trous : ${equerre.trous}. Pour chaque ligne, choisissez la vue où l’on voit ce qui est écrit. L’exemple résolu est donné en tête de liste.`,
        2: `La console d’équerre de la figure porte un collier de gaine. Elle est faite de deux plaques de ${equerre.ep} mm d’épaisseur, une plaque verticale et une plaque horizontale. Dimensions : ${equerre.dims}. Trous : ${equerre.trous}. Pour chaque ligne, choisissez la vue où l’on voit ce qui est écrit.`
      },
      prompt: { 1: "Classez chaque ligne, en vous aidant de l’exemple.", 2: "Classez chaque ligne. Cette question est à faire seul." },
      aides: [
        "La console est à la figure sous le texte, avec ses trois vues. L’écran « Les vues se répondent » dit comment les vues se rangent.",
        "Un trou se voit en cercle quand l’œil le regarde dans son axe. Vu de côté, il laisse deux traits cachés. Cherchez, pour chaque trou, la direction de son axe.",
        "Sur le bloc percé, le trou vertical se voit en cercle de dessus : son axe est vertical et l’œil regarde vers le bas. Faites le même raisonnement pour les trous de la plaque verticale, dont l’axe va de la gauche vers la droite."
      ],
      ...BE.parNiveau({
        1: avec(figConsole(), BE.tri(EX2.lignes, VUES3, EX2.exemple)),
        2: avec(figConsole(), BE.tri(EX2.lignes, VUES3))
      })
    }),

    BE.ecran({
      id: "lire-un-support", dossier: "methode", kicker: "La méthode, 6", title: "Lire un support d’équipement CVC", level: "comprendre",
      image: "illustrations/2-support-de-gaine-pose.webp", imageAlt: "Un support de gaine en U est suspendu sous un plafond par deux tiges filetées qui traversent les trous de son fond. Une gaine repose dans le U.",
      text: `Un support de gaine en U est un profilé : une barre dont la section, ici en U, est la même sur toute la longueur. Il porte une gaine, suspendu par des tiges filetées qui traversent ses trous. Le dessinateur le décrit par trois vues cotées. La vue de gauche donne la section en U : ${u.l} mm de large, ${u.h} mm de haut, avec une épaisseur de ${u.ep} mm. La vue de dessus donne l’entraxe (la distance entre les axes de deux trous) des deux trous, ${u.entraxe} mm, et leur diamètre, Ø ${u.d}. La vue de face donne la longueur, ${u.L} mm, le fond du U, ${traits(u.fond)} sur toute la longueur, et les trous, ${NB(2 * u.nTrous)} traits interrompus courts. La vue de dessus ne porte aucun trait caché : le U est ouvert vers le haut.`,
      prompt: "Lisez les deux figures, puis continuez.",
      render: () => figSupport() + figSupportVolume()
        + BE.alerte("<strong>Valeurs d’exercice.</strong> Les dimensions de ce support ne sont pas celles d’un support du commerce.")
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice 3, compter les traits cachés", title: "Exercice : les traits interrompus du support", level: "appliquer", requiresAction: true,
      text: {
        1: `Sur la figure du support de gaine en U, ${u.dims}, comptez les traits interrompus de la vue de face. Les axes ne se comptent pas, et les traits qui se superposent comptent pour un. Un exemple résolu reste sous vos yeux.`,
        2: `Sur la figure du support de gaine en U, ${u.dims}, comptez les traits interrompus de la vue de face. Les axes ne se comptent pas, et les traits qui se superposent comptent pour un.`,
        3: `Sur la figure du support de gaine en U, ${u.dims}, comptez les traits interrompus de la vue de face. Les axes ne se comptent pas, et les traits qui se superposent comptent pour un. Une seconde question suit, sur la vue qui donne l’entraxe.`
      },
      prompt: { 1: "Choisissez le bon compte, en vous aidant de l’exemple.", 2: "Choisissez le bon compte. Cette question est à faire seul.", 3: "Répondez aux deux questions. Elles sont à faire seul." },
      aides: [
        "La vue de face est celle du haut sur la figure du support. Les tirets sont les traits interrompus, les traits mixtes sont les axes.",
        "On compte chaque trait interrompu dessiné, même court. Un trou qui traverse le fond donne deux traits. Le fond d’un profilé en U ouvert vers le haut donne un trait sur toute la longueur. Les traits qui se superposent comptent pour un.",
        `Sur le bloc percé, un trou donne ${traits(bloc.cachees.face)} de face. Faites le même décompte pour un trou du support, puis ajoutez ce que donne le fond.`
      ],
      ...BE.parNiveau({
        1: avec(figSupport() + exempleTrou(), BE.quiz(EX3.q1)),
        2: avec(figSupport(), BE.quiz(EX3.q1)),
        3: avecSecondeQuestion(avec(figSupport(), BE.quiz(EX3.q1)))
      })
    }),

    BE.ecran({
      id: "les-pieges", dossier: "methode", kicker: "La méthode, 7", title: "Les pièges", level: "comprendre",
      text: "Cinq erreurs reviennent presque à chaque fois. Le tableau les nomme, dit ce que l’on voit sur une copie et donne le geste juste. Relisez-le avant de rendre votre feuille.",
      prompt: "Lisez le tableau, puis continuez.",
      render: () => tableau(["Piège", "Ce que l’on voit sur la copie", "Le geste juste"], [
        ["Trait caché tracé en trait fort", "Les bords du trou sont continus et épais : on les lit comme des arêtes vues.", "Tracer les arêtes cachées en tirets fins."],
        ["Trait caché oublié", "La vue de face est un rectangle plein : le trou a disparu.", "Chercher, pour chaque trou, la vue où il est de côté."],
        ["Vue de dessus au-dessus de la vue de face", "La vue de dessus est rangée au-dessus.", "Ranger la vue de dessus sous la vue de face."],
        ["Trou décalé d’une vue à l’autre", "Les traits d’une vue ne tombent pas sous le trou d’une autre.", "Tirer les lignes de rappel entre les vues."],
        ["Axe oublié", "Le trou n’a pas de trait mixte fin.", "Tracer l’axe, qui dépasse un peu du contour."]
      ], "Cinq pièges et le geste juste")
        + BE.alerte("<strong>Piège au comptage.</strong> Deux traits cachés qui se superposent comptent pour un. Un axe ne se compte pas parmi les traits interrompus.")
    }),

    ecranProjet,

    BE.fourchette({
      dossier: "projet", kicker: "Vérifier",
      text: "Reportez ici le nombre de traits interrompus de chacune de vos trois vues. Chaque réponse vous dit seulement si le compte est bon, sans donner la valeur.",
      prompt: "Écrivez chaque compte, puis cliquez sur Vérifier."
    }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

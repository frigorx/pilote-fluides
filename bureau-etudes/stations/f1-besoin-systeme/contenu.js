/* Station BE-F1 : besoin et système, le choix entre détente directe et eau glacée.
   Méthode sur le petit bâtiment de bureaux d'exemple des stations T5 à T8 (la salle de réunion est résolue à l'écran ; le bureau et le choix du
   bâtiment sont la commande du niveau 1), puis commande du niveau 2 sur la maison. Les valeurs de l'exemple (bloc EXEMPLE) et les bornes des
   fourchettes (bloc FOURCHETTES) sont écrites par outils/stations/f1-besoin-systeme/construire.mjs : le premier vient de exemple-data.mjs, les
   secondes de exemple-data.mjs (niveau 1) et de corriges/f1-besoin-systeme/reference-systeme.json (niveau 2, outils/f1-systeme-maison.mjs).
   Tolérance : ± 5 % sur une longueur mesurée au plan, ± 3 % sur le dénivelé et les parts.
   Aucune valeur calculée de la maison n'est écrite dans cette station : seules les bornes des fourchettes et les données de la commande le sont. */
const tableau = (entetes, lignes, legende) => `<table class="constat">${legende ? `<caption>${BE.esc(legende)}</caption>` : ""}<thead><tr>${entetes.map(e => `<th scope="col">${BE.esc(e)}</th>`).join("")}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(c => `<td>${BE.esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const DOSSIER = "../../fil-rouge/maison/";

/*EXEMPLE-DEBUT*/
const EX = {
 "loc": {
  "REU": {
   "nom": "Salle de réunion",
   "P": "3476",
   "h": "16"
  },
  "BUR": {
   "nom": "Bureau",
   "P": "1102",
   "h": "12"
  },
  "SAN": {
   "nom": "Sanitaires",
   "P": "301",
   "h": "8"
  }
 },
 "machine": {
  "P": "4443",
  "h": "16",
  "PkW": "4,5"
 },
 "partREU": "78",
 "nUI": "2",
 "reuKW": "3,5",
 "h": {
  "zUE": "0,50",
  "zComble": "2,85",
  "zUI": "2,20",
  "hsp": "2,60",
  "plancher": "0,25",
  "surfaceREU": "24,6"
 },
 "reu": {
  "trace": "(2 ; 7,4) → (2 ; 4,1) → (4 ; 4,1)",
  "segs": [
   "3,3",
   "2,0"
  ],
  "plan": "5,3",
  "montee": "2,35",
  "descente": "0,65",
  "L": "8,3",
  "H": "1,70"
 },
 "bur": {
  "trace": "(2 ; 7,4) → (2 ; 6) → (8 ; 6)"
 },
 "lim": {
  "mono": {
   "ui": "1",
   "L": "3 à 20 m",
   "Ltot": "une seule liaison",
   "H": "10 m au plus",
   "P": "5,0 kW au plus"
  },
  "multi": {
   "ui": "2 à 4",
   "L": "3 à 25 m",
   "Ltot": "60 m au plus",
   "H": "15 m au plus",
   "P": "8,0 kW au plus"
  }
 },
 "regime": "6 °C / 12 °C",
 "ex2": {
  "x": "4",
  "y": "3",
  "zUE": "0,50",
  "zHaut": "3,00",
  "zUI": "2,20",
  "quiz": {
   "choices": [
    "L = 7,0 m",
    "L = 10,3 m",
    "L = 8,3 m",
    "L = 8,7 m"
   ],
   "good": 1,
   "explain": "Plan : 4 + 3 = 7,0 m ; montée 3,00 − 0,50 = 2,50 m ; descente 3,00 − 2,20 = 0,80 m ; L = 7,0 + 2,50 + 0,80 = 10,3 m. 7,0 m oublie la montée et la descente ; 8,3 m prend le plan à vol d’oiseau (5,0 m) ; 8,7 m ajoute le dénivelé (1,70 m) au lieu de la montée et de la descente."
  }
 },
 "ex3": {
  "L": [
   "12",
   "18",
   "27"
  ],
  "H": "6",
  "n": "3",
  "quiz": {
   "choices": [
    "Tout est dans les limites, 57 m pour 60 m au plus",
    "La longueur totale dépasse 60 m",
    "Le dénivelé de 6 m dépasse la limite",
    "La liaison de 27 m dépasse 25 m : le tracé ou la solution change"
   ],
   "good": 3,
   "explain": "12 + 18 + 27 = 57 m, sous les 60 m. Chaque liaison doit rester entre 3 et 25 m : celle de 27 m dépasse. Le dénivelé, 6 m, reste sous 15 m. Vérifier le seul total laisse passer la liaison trop longue ; ajouter le dénivelé au total donne 63 m à tort."
  }
 },
 "maison": {
  "zUE": "0,50",
  "zUI": "2,20",
  "solEtg": "2,70",
  "hsp": "2,50",
  "plancher": "0,20",
  "zCombles": "5,40",
  "fluide": "R32",
  "classe": "A2L"
 }
};
/*EXEMPLE-FIN*/

const REU = EX.loc.REU, BUR = EX.loc.BUR, SAN = EX.loc.SAN, MAC = EX.machine, L1 = EX.lim.mono, LM = EX.lim.multi, MA = EX.maison;
const avecBloc = (html, q) => { const a = BE.quiz(q); return { quiz: q, render: item => html + a.render(item), wire: a.wire }; };
const avecTri = (html, t) => ({ render: item => html + t.render(item), wire: t.wire });
const CRITERES = ["Unités dehors et dedans", "Puissance et limite", "Liaisons et limites", "Fluide dans les pièces", "Maintenance, bruit, place", "Verdict"];
const altPlanExemple = `Plan d’implantation du bâtiment d’exemple, nord en haut, quadrillage d’un mètre, graduations de 0 à 8 m en x et de 0 à 7 m en y. Au sud, la salle de réunion de 0 à 6 m en x et de 0 à 4,1 m en y ; à côté, à l’est, les sanitaires. Au nord, le local technique de 0 à 2,2 m en x, puis le bureau de 2,2 à 8 m, de 4,1 à 7,4 m en y. L’unité extérieure est dehors, contre la façade nord du local technique, à x = 2 m. Trait plein : la liaison de la salle de réunion, ${EX.reu.trace}, jusqu’à l’unité intérieure posée au mur nord de la salle. Tirets : la liaison du bureau, ${EX.bur.trace}, jusqu’à l’unité intérieure posée au mur est du bureau. Les deux liaisons courent ensemble au départ.`;
const planExemple = () => BE.schema("illustrations/plan-exemple.svg", altPlanExemple, "Bâtiment d’exemple : lisez les angles de chaque tracé sur le quadrillage d’un mètre.");
const altPlanMaison = `Plans de la maison, nord en haut, quadrillage d’un mètre, de 0 à 10 m en x et de 0 à 8 m en y. Rez-de-chaussée : le garage à l’ouest, le séjour-cuisine au sud, l’entrée et le WC au nord. L’unité extérieure est dehors, contre la façade ouest du garage, à y = 3 m. Trait plein, à 0,50 m du sol dans le garage : la liaison du séjour-cuisine va tout droit vers l’est jusqu’à son unité, au mur ouest du séjour, à x = 3,6 m ; les liaisons de l’étage longent le garage vers l’est jusqu’à x = 3 m, puis vers le nord jusqu’à y = 4,2 m, et entrent dans un coffre, un carré à x = 4 m et y = 4,2 m, dans l’angle nord-ouest du séjour. Étage : le coffre arrive dans l’angle sud-ouest du palier. Tirets, sur le plancher des combles : vers l’est le long de y = 4,2 m, une liaison descend dans la chambre 1 à x = 5 m, une autre dans la chambre 2 à x = 9 m, au mur nord de chaque chambre ; la troisième tourne au nord à x = 6,4 m et descend dans la chambre 3 à y = 6 m, à son mur ouest. Rectangles pleins : les quatre unités intérieures.`;
const planMaison = () => BE.schema("illustrations/plan-maison.svg", altPlanMaison, "Maison : lisez les angles de chaque tracé sur le quadrillage d’un mètre, au rez-de-chaussée puis à l’étage. Les tirets vont jusqu’au mur où se pose l’unité : comptez aussi ce dernier bout avant la descente. Place des unités et tracé : données de l’exercice.");
const tableauLimites = () => tableau(["Appareil de l’exercice", "Unités intérieures", "Chaque liaison", "Longueur totale", "Dénivelé", "Puissance"], [
  ["Monosplit", L1.ui, L1.L, L1.Ltot, L1.H, L1.P],
  ["Multisplit", LM.ui, LM.L, LM.Ltot, LM.H, LM.P]
], "Les limites des deux appareils de l’exercice (données de l’exercice ; sur un vrai projet, la notice de l’appareil)");

const ecranProjet = BE.projet({
  dossier: "projet", kicker: "Le projet, 1",
  aides: {
    1: [
      "Les puissances sont dans la commande et sur la feuille. Le plan et les hauteurs sont à l’écran « Mesurer une liaison sur le plan », les limites à l’écran « Les limites de l’appareil ».",
      "Exercice 1 : un oui pour chaque local où l’on reste, puis la part au pour cent. Exercice 2 : partez de l’unité extérieure, suivez le trait plein commun puis les tirets ; lisez les angles, additionnez les écarts, puis la montée et la descente. Exercice 3 : comparez chaque chiffre à sa limite. Exercice 4 : trois phrases.",
      `Sur l’exemple, la liaison de la salle de réunion fait ${EX.reu.plan} m au plan, plus ${EX.reu.montee} m de montée et ${EX.reu.descente} m de descente : ${EX.reu.L} m. La liaison du bureau part du même point et va plus loin, jusqu’au mur est.`
    ],
    2: [
      "Puissance de chaque pièce et de la machine : votre feuille de la station T8. Puissance d’hiver : station T5, celle pour laquelle la PAC a été choisie ; sa puissance en froid reste à vérifier. Plan, unité extérieure, coffre et tracé : la figure de cet écran. Hauteurs : la commande. Limites : écran « Les limites de l’appareil ».",
      "Une liaison par unité, mesurée depuis l’unité extérieure : le parcours dans le garage, puis, pour l’étage, la montée dans le coffre jusqu’aux combles, le parcours dans les combles et la descente jusqu’à l’unité. Le dénivelé se prend entre les raccords.",
      `Commencez par la chambre 1 : lisez les angles du tracé au rez-de-chaussée, puis à l’étage. Montée = hauteur des combles − ${MA.zUE} m ; descente = hauteur des combles − (sol de l’étage + ${MA.zUI} m).`
    ]
  }
});
const rendreCommande = ecranProjet.render;
const liensDossier = () => BE.liens([
  { href: DOSSIER + "plans-maison.pdf", title: "Les plans de la maison", note: "Pièces, niveaux, coupe A-A" },
  { href: DOSSIER + "cctp-maison.pdf", title: "L’extrait de CCTP de la maison", note: "Page 4 : chauffage par pompe à chaleur, pas de climatisation" }
]);
ecranProjet.render = () => {
  const html = rendreCommande();
  if (html.includes("partie-reservee")) return html;
  return html + (/commande-volet">Niveau 2/.test(html) ? planMaison() + liensDossier() : planExemple());
};

BE.station({
  code: "BE-F1",
  titre: "Besoin et système",
  ligne: "Frigorifique",
  duree: "2 h",
  niveaux: [
    { n: 1, nom: "guidé", batiment: "Le bâtiment d’exemple, chemin balisé", partie: "publique" },
    { n: 2, nom: "autonome", batiment: "La maison, sans balisage", partie: "publique" },
    { n: 3, nom: "bâtiment tertiaire", batiment: "Bâtiment tertiaire, dans l’espace enseignant", partie: "dediee" }
  ],
  intro: "Le bilan d’été donne la puissance frigorifique de chaque local et celle de la machine. Reste à choisir le système qui la fournit : la détente directe, où le fluide frigorigène va jusque dans la pièce, ou l’eau glacée, où seule de l’eau froide entre dans le bâtiment. Vous comparez les solutions avec une grille de critères : unités, puissance, longueur des liaisons, fluide, maintenance, bruit. Puis vous écrivez le choix, chiffres à l’appui.",
  note: "Les limites des appareils, la place des unités et le tracé des liaisons sont des données de l’exercice : aucune notice de fabricant n’est reprise. La classe du fluide vient de la norme NF EN 378, vue à la station Législation du même nom.",

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
      objet: "Choix du système qui rafraîchit la salle de réunion et le bureau du bâtiment d’exemple",
      delai: "Rendu en fin de séance",
      commande: [
        `Le bureau d’études doit rafraîchir le bâtiment d’exemple. Données : puissances de la station T8 (exemple), salle de réunion ${REU.P} W à ${REU.h} h, bureau ${BUR.P} W à ${BUR.h} h, sanitaires ${SAN.P} W à ${SAN.h} h, machine ${MAC.P} W à ${MAC.h} h, avec simultanéité. Plan ci-dessous : unité extérieure contre la façade nord du local technique, raccords à ${EX.h.zUE} m du sol ; liaisons sur le plancher du comble, à ${EX.h.zComble} m ; raccords des unités intérieures à ${EX.h.zUI} m. Limites des appareils : écran « Les limites de l’appareil ». Le bâtiment n’a ni réseau d’eau ni machine d’eau glacée. Suivez les étapes dans l’ordre.`,
        "Étape 1, exercice 1 de la feuille. Les locaux, les unités intérieures et la part de chaque local dans la puissance de la machine.",
        "Étape 2, exercice 2 de la feuille. La liaison du bureau, tracé en tirets : plan, montée, descente, longueur, dénivelé ; puis la longueur totale des deux liaisons.",
        "Étape 3, exercice 3 de la feuille. La grille de trois solutions : deux monosplits, un multisplit à deux unités, l’eau glacée.",
        "Étape 4, exercice 4 de la feuille. Le choix en trois phrases. Vérifiez vos trois résultats à l’écran Vérifier."
      ],
      pieces: [
        { piece: "Puissances des locaux", ou: "Cette commande, reprise sur la feuille" },
        { piece: "Plan d’implantation et hauteurs", ou: "Figure ci-dessous et écran « Mesurer une liaison sur le plan »" },
        { piece: "Limites des appareils", ou: "Écran « Les limites de l’appareil »" },
        { piece: "Feuille réponse niveau 1", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    },
    2: {
      de: "Bureau d’études (exemple)",
      a: "Technicien d’études, niveau autonome",
      objet: "Variante de rafraîchissement de la maison : choix du système, critères à l’appui",
      delai: "Rendu en fin de séance",
      commande: `Le CCTP ne prévoit pas de climatisation (page 4). Le maître d’ouvrage demande une variante : rafraîchir le séjour-cuisine et les trois chambres. Comparez trois solutions : un multisplit à quatre unités intérieures ; un monosplit pour le seul séjour-cuisine ; l’eau glacée, par des ventilo-convecteurs alimentés par la pompe à chaleur air/eau du garage, supposée réversible (les radiateurs ne rafraîchissent pas). Cette PAC a été choisie pour la puissance d’hiver de la station T5 : sa puissance en froid se lit sur sa notice, elle reste à vérifier (station T9) ; dans la grille, comparez la puissance à fournir à cette puissance d’hiver et écrivez « à vérifier ». Données : vos résultats des stations T8 (puissance de chaque pièce à sa pointe, puissance de la machine avec simultanéité) et T5 (puissance d’hiver). Données de l’exercice fixées par le bureau d’études : unité extérieure au sol contre la façade ouest du garage, raccords à ${MA.zUE} m du sol ; unités intérieures murales, raccords à ${MA.zUI} m au-dessus du sol de leur pièce ; tracé des liaisons sur le plan ci-dessous, à ${MA.zUE} m du sol dans le garage ; la liaison du séjour-cuisine traverse le mur et monte jusqu’aux raccords de son unité ; pour l’étage, les liaisons passent dans un coffre jusqu’au plancher des combles, à ${MA.zCombles} m (sol de l’étage ${MA.solEtg} m, hauteur sous plafond ${MA.hsp} m, plancher ${MA.plancher} m), puis descendent à travers le plafond jusqu’à l’unité ; fluide ${MA.fluide}. Limites des appareils : écran « Les limites de l’appareil ». Établissez les pièces à équiper, la liaison de chaque unité (longueur et dénivelé), la grille des trois solutions, puis le choix et sa justification d’une demi-page, première page de la note de calcul.`,
      pieces: [
        { piece: "Vos feuilles des stations T8 et T5", ou: "Puissance de chaque pièce et de la machine ; puissance d’hiver" },
        { piece: "Plan de la maison avec les liaisons", ou: "Figure ci-dessous ; plans-maison.pdf pour les niveaux" },
        { piece: "Extrait de CCTP (cctp-maison.pdf)", ou: "Page 4 : chauffage par pompe à chaleur, pas de climatisation" },
        { piece: "Feuille réponse niveau 2", ou: "Bouton ci-dessous, à imprimer en A4 recto verso" }
      ]
    }
  },

  /*FOURCHETTES-DEBUT*/
  fourchettes: {
    1: [
      { id: "n1-lbur", libelle: "Longueur de la liaison du bureau", unite: "m", min: 9.8, max: 11, indice: "Relisez l’écran « Mesurer une liaison sur le plan » : la liaison du bureau part de l’unité extérieure sur le trait plein commun, puis suit les tirets. Écarts en x et en y entre ses angles, puis la montée et la descente. Au dixième de mètre." },
      { id: "n1-ltot", libelle: "Longueur totale des liaisons, salle de réunion et bureau", unite: "m", min: 17.7, max: 19.7, indice: "Chaque unité intérieure a sa propre liaison, comptée depuis l’unité extérieure : additionnez la liaison de la salle de réunion et celle du bureau." },
      { id: "n1-part", libelle: "Part du bureau dans la puissance de la machine", unite: "%", min: 24, max: 26, indice: "Relisez l’écran « Les puissances, local par local » : puissance du bureau à sa pointe ÷ puissance de la machine × 100, au pour cent." }
    ],
    2: [
      { id: "n2-ltot", libelle: "Longueur totale des liaisons du multisplit", unite: "m", min: 45.5, max: 50.3, indice: "Relisez l’écran « Mesurer une liaison sur le plan » : pour chaque unité, le parcours dans le garage, la montée, le parcours dans les combles et la descente ; puis la somme des quatre liaisons." },
      { id: "n2-lmax", libelle: "Longueur de la liaison la plus longue", unite: "m", min: 15.1, max: 16.7, indice: "La plus longue des quatre liaisons, mesurée depuis l’unité extérieure, montée et descente comprises." },
      { id: "n2-h", libelle: "Dénivelé le plus grand entre l’unité extérieure et une unité intérieure", unite: "m", min: 4.2, max: 4.6, indice: "Dénivelé = hauteur des raccords de l’unité intérieure la plus haute − hauteur des raccords de l’unité extérieure. Le sol de l’étage est dans la commande." },
      { id: "n2-part", libelle: "Part du séjour-cuisine dans la puissance à fournir", unite: "%", min: 52, max: 57, indice: "Puissance du séjour-cuisine à sa pointe ÷ puissance de la machine avec simultanéité × 100, au pour cent (vos résultats de la station T8)." }
    ]
  },
  /*FOURCHETTES-FIN*/

  suivante: { code: "BE-F2", titre: "Le cycle", href: "../f2-cycle-diagramme/index.html" },
  correspondances: [
    { reseau: "Bureau d’études", titre: "BE-T8, Été 3 : la synthèse", href: "../t8-ete-air-neuf-synthese/index.html", pourquoi: "La puissance de chaque local et celle de la machine viennent de cette station." },
    { reseau: "CartoClim", titre: "Le multisplit : une unité extérieure, plusieurs pièces", href: "../../../cartoclim/stations/3-4-multisplit/index.html", pourquoi: "Vous y voyez le circuit d’un multisplit, ses branches et ses repères." },
    { reseau: "CartoClim", titre: "Groupe d’eau glacée et ventilo-convecteurs", href: "../../../cartoclim/stations/3-8-eau-glacee/index.html", pourquoi: "Vous y suivez la chaleur d’une pièce jusqu’à l’air du dehors, par l’eau glacée." },
    { reseau: "CartoClim", titre: "Les liaisons frigorifiques : longueur, dénivelé, isolant", href: "../../../cartoclim/stations/4-2-liaisons-frigorifiques/index.html", pourquoi: "Vous y voyez la longueur, le dénivelé et l’appoint de fluide d’une liaison." },
    { reseau: "Législation", titre: "NF EN 378", href: "../../../legislation/stations/en-378/index.html", pourquoi: "Les classes de sécurité des fluides, le système direct ou indirect et la charge limitée par le volume du local." },
    { reseau: "Bureau d’études", titre: "BE-F2, Le cycle", href: "../f2-cycle-diagramme/index.html", pourquoi: "Le système retenu ici et son fluide se tracent sur le diagramme." }
  ],

  ecrans: [
    BE.ecran({
      id: "accueil-objectif", dossier: "prise", kicker: "Prise en main, 1", title: "Ce que vous rendez", level: "comprendre",
      text: "Le bilan d’été est fait : vous connaissez la puissance frigorifique de chaque local et celle de la machine. Le bureau d’études doit maintenant choisir le système qui la fournit. Deux familles existent. En détente directe, le fluide frigorigène va de l’unité extérieure jusqu’à l’unité intérieure de chaque pièce : un monosplit sert une pièce, un multisplit plusieurs, un DRV des dizaines de locaux. En eau glacée, une machine refroidit de l’eau, et l’eau va dans les pièces. Vous comparez les solutions avec une grille de critères, chiffres à l’appui, puis vous écrivez le choix et sa justification. Les réponses s’écrivent sur la feuille A4 recto verso.",
      prompt: "Lisez la grille à remplir et les trois cartes, puis continuez.",
      render: () => tableau(["Critère", "Solution 1", "Solution 2", "Solution 3"], CRITERES.map(c => [c, "", "", ""]), "La grille de critères, vide")
        + BE.cartes([
          { title: "Vous recevez", rows: [["La commande :", "les locaux à rafraîchir et les solutions à comparer."], ["Le dossier :", "les puissances de la station T8, le plan, les limites des appareils."]] },
          { title: "Vous produisez", rows: [["La grille :", "chaque solution jugée sur six lignes."], ["Le choix :", "trois phrases, avec les chiffres. Fourchettes à l’écran Vérifier : ± 5 % sur une longueur mesurée au plan, ± 3 % sur le reste."]] },
          { title: "Vous emportez", rows: [["Une fiche :", "la méthode d’un côté, un exemple de l’autre."], ["La suite :", "la station F2, le cycle du fluide sur le diagramme."]] }
        ])
    }),

    BE.ecran({
      id: "d-ou-viennent-les-donnees", dossier: "prise", kicker: "Prise en main, 2", title: "D’où viennent les données", level: "comprendre",
      text: "Les puissances viennent de la station T8 : celle de chaque local, prise à sa propre heure de pointe, et celle de la machine, avec simultanéité. Les pièces, les niveaux et les hauteurs se lisent sur les plans. La place de l’unité extérieure et le tracé des liaisons sont fixés par le bureau d’études dans la commande. Sur un vrai projet, les limites d’un appareil viennent de sa notice : la station donne à la place deux appareils de l’exercice, avec leurs limites dans un tableau. La classe du fluide vient de la norme NF EN 378, vue à la station Législation du même nom.",
      prompt: "Lisez le tableau des origines, puis continuez.",
      render: () => tableau(["Donnée", "Où la lire"], [
        ["Puissance de chaque local, puissance de la machine", "Station T8"],
        ["Pièces, niveaux, hauteurs", "Plans ; station T1 pour le bâtiment d’exemple"],
        ["Place des unités, tracé des liaisons", "La commande, données de l’exercice"],
        ["Limites des appareils", "Écran « Les limites de l’appareil », données de l’exercice"],
        ["Classe du fluide", "Station Législation « NF EN 378 »"],
        [`Régime d’eau glacée, ${EX.regime}`, "CartoClim, « Groupe d’eau glacée et ventilo-convecteurs »"]
      ], "Les données du choix")
    }),

    BE.ecran({
      id: "trois-familles", dossier: "methode", kicker: "La méthode, 1", title: "Détente directe ou eau glacée", level: "comprendre",
      text: `En détente directe, le fluide frigorigène s’évapore dans l’unité intérieure, dans la pièce même. Deux tubes de cuivre, la liaison frigorifique, relient l’unité extérieure à chaque unité intérieure. Un monosplit associe une unité extérieure et une unité intérieure. Un multisplit relie plusieurs unités intérieures, une par pièce, à une seule unité extérieure. Un DRV, à débit de réfrigérant variable, sert des dizaines d’unités sur un même réseau de fluide : on le trouve dans le tertiaire. En eau glacée, le fluide reste enfermé dans la machine, dehors. Elle refroidit de l’eau, autour de 6 °C au départ et de 12 °C au retour, qu’une pompe envoie vers un ventilo-convecteur dans chaque pièce. Une pompe à chaleur air/eau réversible peut produire cette eau. Un radiateur ne rafraîchit pas : il n’a ni ventilateur ni bac pour l’eau qui se condense sur une surface froide.`,
      prompt: "Comparez les trois schémas, puis continuez.",
      render: () => BE.schema("illustrations/schema-familles.svg", "Trois schémas de principe côte à côte, chacun avec une maison et le sol. Monosplit : une unité extérieure posée au sol, reliée par un trait orange, le fluide frigorigène, à une unité murale dans une seule pièce. Multisplit : une unité extérieure, trois traits orange qui montent chacun vers l’unité murale d’une des trois pièces. Eau glacée : un groupe d’eau glacée au sol, deux traits bleus, le départ et le retour d’eau, qui montent vers un ventilo-convecteur dans chacune des trois pièces ; aucun trait orange n’entre dans la maison.", "Orange : le fluide frigorigène. Bleu : l’eau glacée.")
    }),

    BE.ecran({
      id: "puissance-par-local", dossier: "methode", kicker: "La méthode, 2", title: "Les puissances, local par local", level: "comprendre",
      text: "La grille commence par le besoin. Pour chaque local, relevez sa puissance frigorifique à sa propre heure de pointe, station T8 : l’unité intérieure qui le sert doit la fournir. Pour l’ensemble, relevez la puissance de la machine, avec simultanéité : l’unité extérieure, ou la machine d’eau glacée, doit la fournir. Un local où l’on reste reçoit une unité : bureau, salle, séjour, chambre. Un local de service ou de passage n’en reçoit pas : sanitaires, entrée, palier, salle d’eau. Comptez les unités intérieures. Calculez enfin la part de chaque local : sa puissance ÷ puissance de la machine × 100, au pour cent. Elle dit ce qu’un appareil pour ce seul local couvrirait. Les parts ne font pas 100 % une fois additionnées : chaque local est pris à sa pointe, la machine au maximum de la somme.",
      prompt: "Lisez les barres, puis l’exemple résolu, et continuez.",
      render: () => BE.schema("illustrations/schema-puissances.svg", `Barres horizontales des puissances du bâtiment d’exemple, station T8. Salle de réunion ${REU.P} W à ${REU.h} h et bureau ${BUR.P} W à ${BUR.h} h, en bleu marine : locaux avec une unité. Sanitaires ${SAN.P} W à ${SAN.h} h, en gris : sans unité. Machine ${MAC.P} W à ${MAC.h} h, en orange, la plus longue barre.`, "Chaque local à sa pointe, la machine avec simultanéité.")
        + BE.exemple({ text: `Salle de réunion d’exemple : ${REU.P} W à ${REU.h} h ; machine ${MAC.P} W`, answer: `Part = ${REU.P} ÷ ${MAC.P} × 100 = ${EX.partREU} % ; ${EX.nUI} unités intérieures, salle et bureau, aucune aux sanitaires`, why: `Un appareil pour la seule salle couvrirait ${EX.partREU} % du besoin du bâtiment ; le bureau resterait sans froid.` })
    }),

    BE.ecran({
      id: "exercice-1", dossier: "methode", kicker: "Exercice à l’écran 1, les familles", title: "À l’écran : quelle famille pour quel besoin", level: "appliquer", requiresAction: true,
      text: {
        1: "Pour chaque besoin, choisissez la famille qui y répond le mieux. L’exemple résolu montre la première ligne. Le schéma de l’écran « Détente directe ou eau glacée » reste votre modèle.",
        2: "Pour chaque besoin, choisissez la famille qui y répond le mieux."
      },
      prompt: { 1: "Rangez chaque besoin dans une famille, en vous aidant de l’exemple.", 2: "Rangez chaque besoin dans une famille. Cette question est à faire seul." },
      aides: {
        1: ["La méthode est à l’écran « Détente directe ou eau glacée ».", "Comptez les pièces et les unités dehors ; demandez-vous si le fluide entre dans les pièces.", "Une pièce : monosplit. Plusieurs pièces, une unité dehors : multisplit. Pas de fluide dans les pièces : eau glacée."],
        2: ["La méthode est à l’écran « Détente directe ou eau glacée ».", "Deux questions par ligne : combien de pièces pour combien d’unités dehors, et le fluide entre-t-il dans les pièces ?", "Une machine qui produit déjà de l’eau oriente vers l’eau glacée."]
      },
      ...BE.parNiveau({
        1: BE.tri([
          { text: "Trois chambres, une seule place possible dehors pour une unité", good: 1, why: "Une unité extérieure pour plusieurs pièces : c’est le multisplit, dans la limite de son nombre d’unités." },
          { text: "Aucun fluide frigorigène ne doit entrer dans les pièces occupées", good: 2, why: "Avec l’eau glacée, le fluide reste dans la machine, dehors ; seule l’eau entre dans le bâtiment." },
          { text: "Une seule pièce à rafraîchir, l’unité extérieure à quelques mètres", good: 0, why: "Une pièce, une unité dehors et une liaison courte : le monosplit suffit." },
          { text: "Une pompe à chaleur air/eau réversible et un réseau d’eau existent déjà", good: 2, why: "La machine qui refroidit l’eau existe : il reste à poser des ventilo-convecteurs et à isoler le réseau." },
          { text: "Deux pièces voisines, liaisons de 8 et 11 m, peu de place sur la façade", good: 1, why: "Deux liaisons courtes et une seule unité dehors : le multisplit." }
        ], ["Monosplit", "Multisplit", "Eau glacée"], { text: "Le séjour seul, unité extérieure sur la terrasse à 6 m", good: 0, why: "Une pièce, une liaison courte : monosplit." }),
        2: BE.tri([
          { text: "Trois chambres, une seule place possible dehors pour une unité", good: 1, why: "Une unité extérieure pour plusieurs pièces : c’est le multisplit, dans la limite de son nombre d’unités." },
          { text: "Aucun fluide frigorigène ne doit entrer dans les pièces occupées", good: 2, why: "Avec l’eau glacée, le fluide reste dans la machine, dehors ; seule l’eau entre dans le bâtiment." },
          { text: "Une seule pièce à rafraîchir, l’unité extérieure à quelques mètres", good: 0, why: "Une pièce, une unité dehors et une liaison courte : le monosplit suffit." },
          { text: "Une pompe à chaleur air/eau réversible et un réseau d’eau existent déjà", good: 2, why: "La machine qui refroidit l’eau existe : il reste à poser des ventilo-convecteurs et à isoler le réseau." },
          { text: "Deux pièces voisines, liaisons de 8 et 11 m, peu de place sur la façade", good: 1, why: "Deux liaisons courtes et une seule unité dehors : le multisplit." }
        ], ["Monosplit", "Multisplit", "Eau glacée"])
      })
    }),

    BE.ecran({
      id: "mesurer-une-liaison", dossier: "methode", kicker: "La méthode, 3", title: "Mesurer une liaison sur le plan", level: "comprendre",
      text: `La liaison frigorifique se mesure le long des tubes, avec ses détours, et non à vol d’oiseau. Sur le plan, elle suit les axes : lisez les coordonnées de chaque angle du tracé sur le quadrillage d’un mètre, puis additionnez les écarts en x et en y. Ajoutez la montée et la descente, tirées des hauteurs : raccords de l’unité extérieure, passage des tubes, raccords de l’unité intérieure. Sur le bâtiment d’exemple, l’unité extérieure est contre la façade nord du local technique, raccords à ${EX.h.zUE} m du sol. Les liaisons montent dans le local technique jusqu’au plancher du comble, à ${EX.h.zComble} m (hauteur sous plafond ${EX.h.hsp} m et plancher ${EX.h.plancher} m, station T1), courent dans le comble, puis descendent jusqu’aux raccords de l’unité intérieure, à ${EX.h.zUI} m du sol. Chaque unité intérieure a sa propre liaison, comptée depuis l’unité extérieure, même quand deux liaisons courent ensemble. Le dénivelé est la différence de hauteur entre les raccords des deux unités. Donnez chaque longueur au dixième de mètre ; une longueur mesurée au plan se lit à ± 5 %.`,
      prompt: "Suivez le trait plein sur le plan, lisez l’exemple résolu, puis continuez.",
      render: () => planExemple()
        + BE.exemple({ text: `Liaison de la salle de réunion : ${EX.reu.trace}`, answer: `Plan ${EX.reu.segs.join(" + ")} = ${EX.reu.plan} m ; montée ${EX.h.zComble} − ${EX.h.zUE} = ${EX.reu.montee} m ; descente ${EX.h.zComble} − ${EX.h.zUI} = ${EX.reu.descente} m ; L = ${EX.reu.L} m ; dénivelé ${EX.h.zUI} − ${EX.h.zUE} = ${EX.reu.H} m`, why: "Les coordonnées se lisent en mètres, x puis y. Le tracé en tirets, celui du bureau, est la commande du niveau 1." })
    }),

    BE.ecran({
      id: "exercice-2", dossier: "methode", kicker: "Exercice à l’écran 2, la longueur d’une liaison", title: "À l’écran : la longueur d’une liaison", level: "appliquer", requiresAction: true,
      text: {
        1: `Dans un autre local d’exemple, une liaison part de l’unité extérieure, fait ${EX.ex2.x} m vers l’est puis ${EX.ex2.y} m vers le nord dans un comble. Les raccords de l’unité extérieure sont à ${EX.ex2.zUE} m du sol, les tubes passent dans le comble à ${EX.ex2.zHaut} m, les raccords de l’unité intérieure sont à ${EX.ex2.zUI} m. Calculez la longueur L de la liaison. L’exemple résolu reste sous vos yeux.`,
        2: `Dans un autre local d’exemple, une liaison part de l’unité extérieure, fait ${EX.ex2.x} m vers l’est puis ${EX.ex2.y} m vers le nord dans un comble. Les raccords de l’unité extérieure sont à ${EX.ex2.zUE} m du sol, les tubes passent dans le comble à ${EX.ex2.zHaut} m, les raccords de l’unité intérieure sont à ${EX.ex2.zUI} m. Calculez la longueur L de la liaison, sans l’exemple.`
      },
      prompt: { 1: "Choisissez la longueur juste, en vous aidant de l’exemple.", 2: "Choisissez la longueur juste. Cette question est à faire seul." },
      aides: {
        1: ["Les déplacements et les hauteurs sont dans l’énoncé. La méthode est à l’écran « Mesurer une liaison sur le plan ».", "L = parcours au plan + montée + descente.", `Dans l’exemple : ${EX.reu.plan} + ${EX.reu.montee} + ${EX.reu.descente} = ${EX.reu.L} m. Faites de même.`],
        2: ["La méthode est à l’écran « Mesurer une liaison sur le plan ».", "Trois morceaux : le plan, la montée, la descente.", "Le dénivelé ne remplace pas la montée et la descente : les tubes montent plus haut que l’unité intérieure, puis redescendent."]
      },
      ...BE.parNiveau({
        1: avecBloc(BE.exemple({ text: `Liaison de la salle de réunion : plan ${EX.reu.plan} m, comble à ${EX.h.zComble} m`, answer: `L = ${EX.reu.plan} + ${EX.reu.montee} + ${EX.reu.descente} = ${EX.reu.L} m`, why: "Montée depuis les raccords de l’unité extérieure, descente jusqu’aux raccords de l’unité intérieure." }), EX.ex2.quiz),
        2: avecBloc("", EX.ex2.quiz)
      })
    }),

    BE.ecran({
      id: "limites-appareil", dossier: "methode", kicker: "La méthode, 4", title: "Les limites de l’appareil", level: "comprendre",
      text: `L’unité extérieure arrive chargée de fluide pour une certaine longueur de liaison. Plus longue, la liaison demande un appoint de fluide, pesé. La notice de l’appareil fixe une longueur minimale et une longueur maximale pour chaque liaison, une longueur totale pour un multisplit, un dénivelé maximal, le nombre d’unités intérieures et la puissance. Au-delà du maximum ou du dénivelé permis, on ne pose pas : on change le tracé ou la solution. La station n’utilise aucune notice de fabricant : elle donne deux appareils de l’exercice, avec leurs limites au tableau. Pour une solution, vérifiez chaque ligne : chaque liaison, la longueur totale, le dénivelé, le nombre d’unités et la puissance à fournir, en kW arrondis au dixième vers le haut, comme à la station T8.`,
      prompt: "Lisez la coupe, le tableau des limites et l’exemple résolu, puis continuez.",
      render: () => BE.schema("illustrations/coupe-liaison.svg", `Coupe de principe d’une liaison du bâtiment d’exemple. À gauche, l’unité extérieure posée au sol, raccords à ${EX.h.zUE} m. La liaison orange traverse la façade, monte de ${EX.reu.montee} m jusqu’au comble, au-dessus du plafond, court dans le comble, c’est le parcours au plan, puis descend de ${EX.reu.descente} m jusqu’à l’unité intérieure murale, à droite, raccords à ${EX.h.zUI} m. Une double flèche marque le dénivelé H = ${EX.reu.H} m entre les raccords des deux unités. Sous la coupe : L = montée + parcours au plan + descente.`, "La longueur suit les tubes ; le dénivelé se prend entre les raccords.")
        + tableauLimites()
        + BE.exemple({ text: `Salle de réunion seule, en monosplit : L = ${EX.reu.L} m, dénivelé ${EX.reu.H} m, ${REU.P} W`, answer: `Liaison ${EX.reu.L} m, limites ${L1.L} ; dénivelé ${EX.reu.H} m, limite ${L1.H} ; ${EX.reuKW} kW, limite ${L1.P}. Le monosplit convient`, why: "Chaque chiffre se compare à sa propre limite, ligne par ligne." })
    }),

    BE.ecran({
      id: "exercice-3", dossier: "methode", kicker: "Exercice à l’écran 3, les limites", title: "À l’écran : un multisplit dans ses limites ?", level: "appliquer", requiresAction: true,
      text: {
        1: `Un multisplit de l’exercice sert ${EX.ex3.n} pièces. Les liaisons mesurent ${EX.ex3.L.join(" m, ")} m ; le dénivelé est de ${EX.ex3.H} m ; la puissance à fournir est dans la gamme. Que conclut le bureau d’études ? Le tableau des limites est sous l’énoncé.`,
        2: `Un multisplit de l’exercice sert ${EX.ex3.n} pièces. Les liaisons mesurent ${EX.ex3.L.join(" m, ")} m ; le dénivelé est de ${EX.ex3.H} m ; la puissance à fournir est dans la gamme. Que conclut le bureau d’études ?`
      },
      prompt: { 1: "Choisissez la conclusion juste, en vous aidant du tableau.", 2: "Choisissez la conclusion juste. Cette question est à faire seul." },
      aides: {
        1: ["Les limites sont au tableau de l’écran « Les limites de l’appareil », repris sous l’énoncé.", "Vérifiez chaque liaison, puis le total, puis le dénivelé.", `Chaque liaison doit rester entre ${LM.L}.`],
        2: ["Les limites sont à l’écran « Les limites de l’appareil ».", "Une ligne par limite : chaque liaison, le total, le dénivelé.", "Le total peut passer alors qu’une liaison seule dépasse."]
      },
      ...BE.parNiveau({
        1: avecBloc(tableauLimites(), EX.ex3.quiz),
        2: avecBloc("", EX.ex3.quiz)
      })
    }),

    BE.ecran({
      id: "fluide-dans-la-piece", dossier: "methode", kicker: "La méthode, 5", title: "Le fluide dans la pièce", level: "comprendre",
      text: "La norme NF EN 378 classe chaque fluide par deux repères : une lettre pour la toxicité, A pour la plus faible, B pour la plus élevée ; un chiffre pour l’inflammabilité, 1 pour un fluide qui ne propage pas la flamme, 2L pour un fluide faiblement inflammable, puis 2 et 3. Le R32 des appareils de l’exercice est classé A2L (station Législation « NF EN 378 »). En détente directe, le fluide va jusque dans la pièce : la norme parle de système direct. S’il s’échappe dans une pièce, sa concentration vaut la masse de fluide divisée par le volume de la pièce. La charge admissible dépend donc du plus petit local servi. Avec un multisplit, tout le circuit peut se vider par une seule unité : toute la charge compte. La limite se calcule avec la norme et la notice de l’appareil ; la station ne donne aucun chiffre. En eau glacée, le fluide reste dans la machine, dehors : c’est un système indirect, sans fluide dans les pièces.",
      prompt: "Comparez les deux pièces du schéma, puis continuez.",
      render: () => BE.schema("illustrations/schema-fluide-volume.svg", "Deux pièces avec chacune une unité murale et douze points orange, la même charge de fluide échappée. Dans la petite pièce, les points sont serrés : le fluide est plus concentré. Dans la grande pièce, les mêmes points sont espacés : il est plus dilué. Sous les pièces : concentration = masse ÷ volume.", "Même charge, petit volume : la concentration monte.")
    }),

    BE.ecran({
      id: "maintenance-bruit", dossier: "methode", kicker: "La méthode, 6", title: "Maintenance, bruit, place dehors", level: "comprendre",
      text: "Trois critères se jugent sans calcul, mais s’écrivent dans la grille. Pour la maintenance, un circuit de fluide frigorigène se contrôle et se répare par un technicien habilité à manipuler les fluides ; un réseau d’eau glacée se purge, s’équilibre et ne contient pas de fluide frigorigène. Chaque unité intérieure et chaque ventilo-convecteur a un bac à condensats et une évacuation en pente. L’unité extérieure fait du bruit et souffle de l’air chaud ; elle se pose loin des fenêtres des chambres, sur une façade qui la reçoit, avec de l’air autour. Un multisplit ne pose qu’une unité dehors, plusieurs monosplits en posent une par pièce, l’eau glacée garde la machine déjà en place.",
      prompt: "Lisez les trois cartes, puis continuez.",
      render: () => BE.cartes([
        { title: "Détente directe", rows: [["Maintenance :", "un circuit de fluide, un technicien habilité."], ["Condensats :", "une évacuation par unité intérieure."], ["Dehors :", "une unité par monosplit, une seule pour un multisplit."]] },
        { title: "Eau glacée", rows: [["Maintenance :", "un réseau d’eau à purger, pas de fluide dans le bâtiment."], ["Condensats :", "un bac par ventilo-convecteur."], ["Dehors :", "la machine d’eau glacée, ou la pompe à chaleur réversible déjà posée."]] },
        { title: "Pour la grille", rows: [["Écrivez :", "un fait par case, avec son chiffre quand il existe."], ["Verdict :", "convient, à vérifier, ou ne convient pas."]] }
      ])
    }),

    BE.ecran({
      id: "grille-et-choix", dossier: "methode", kicker: "La méthode, 7", title: "La grille et le choix", level: "comprendre",
      text: "La grille met les solutions en colonnes et les critères en lignes. Dans chaque case, écrivez le chiffre ou le fait qui décide : nombre d’unités, puissance et limite, longueur et limite, fluide dans les pièces ou non. La dernière ligne donne le verdict de chaque solution. Le choix s’écrit ensuite en trois phrases : la solution retenue ; les critères qui la font gagner, avec leurs chiffres ; ce qui reste à vérifier et par qui. Plusieurs choix peuvent se défendre : le correcteur en accepte un autre que le sien s’il s’appuie sur les chiffres de la grille. Le tableau montre la grille d’un cas d’exemple : la salle de réunion rafraîchie seule.",
      prompt: "Lisez la grille du cas d’exemple et le choix écrit, puis continuez.",
      render: () => tableau(["Critère", "Monosplit", "Eau glacée, groupe neuf"], [
        [CRITERES[0], "1 dehors, 1 dedans", "1 groupe, 1 ventilo-convecteur"],
        [CRITERES[1], `${EX.reuKW} kW pour ${L1.P}`, "groupe à choisir"],
        [CRITERES[2], `${EX.reu.L} m (${L1.L}) ; ${EX.reu.H} m (${L1.H})`, "pas de liaison ; réseau d’eau isolé à créer"],
        [CRITERES[3], `oui, ${MA.classe}, salle de ${EX.h.surfaceREU} m²`, "non"],
        [CRITERES[4], "1 circuit de fluide ; 1 unité dehors", "pompe, réseau à purger ; 1 groupe dehors"],
        [CRITERES[5], "convient", "trop lourd pour un seul local"]
      ], "Cas d’exemple : la salle de réunion seule")
        + BE.exemple({ text: "Choix pour la salle de réunion seule", answer: `Monosplit : liaison de ${EX.reu.L} m et dénivelé de ${EX.reu.H} m dans ses limites, ${EX.reuKW} kW pour ${L1.P}. L’eau glacée demanderait un groupe et un réseau neufs pour un seul local. Reste à vérifier la charge de fluide pour le volume de la salle, avec la notice.`, why: "Trois phrases : la solution, les chiffres qui décident, ce qui reste à vérifier." })
    }),

    BE.ecran({
      id: "note-de-calcul", dossier: "methode", kicker: "La méthode, 8", title: "Ce que la note doit dire", level: "comprendre",
      text: "La première page de la note donne l’objet, les données et leur source, les hypothèses de l’exercice, les mesures et le choix justifié. Un autre technicien doit pouvoir refaire chaque mesure sur le plan. Voici la note du cas d’exemple.",
      prompt: "Lisez la note d’exemple, puis continuez vers le projet.",
      render: () => tableau(["Rubrique", "Note de calcul du cas d’exemple"], [
        ["Objet", "Rafraîchissement de la salle de réunion du bâtiment d’exemple : choix du système"],
        ["Données", `Puissance ${REU.P} W à ${REU.h} h : station T8 ; plan d’implantation ; hauteurs : station T1`],
        ["Hypothèses", `Unité extérieure contre la façade nord du local technique ; liaisons dans le comble à ${EX.h.zComble} m ; appareils et limites de l’exercice`],
        ["Mesures", `Liaison ${EX.reu.L} m ; dénivelé ${EX.reu.H} m ; part ${EX.partREU} % de la machine`],
        ["Choix", "Monosplit, dans ses limites ; charge de fluide à vérifier avec la notice"]
      ], "Note de calcul, cas d’exemple")
    }),

    ecranProjet,

    BE.fourchette({ dossier: "projet", kicker: "Vérifier" }),
    BE.emporter({ dossier: "emporter", kicker: "Emporter" })
  ]
});

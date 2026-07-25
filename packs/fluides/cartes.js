/* =====================================================================
   PACK « Habilitation fluides frigorigènes » — SOURCE ÉDITORIALE
   ---------------------------------------------------------------------
   Contenu resserré à partir des 14 chapitres de `habilitation-fluide`
   (F. Henninot), arrêté du 21 novembre 2025 · règlement (UE) 2024/573.

   Ce fichier contient la COUCHE PILOTE (`notes_pilote`) : il ne part
   JAMAIS tel quel côté élève. `node build/build.mjs` en produit deux
   sorties : pack.pilote.js (complet) et pack.eleve.js (purgé).

   Règles tenues dans tout le contenu :
   · zéro invention chiffrée — seules valeurs autorisées : surchauffe
     5-10 K, sous-refroidissement 4-8 K, P absolue = P relative + ~1 bar,
     classes NF EN 378 (R-290 = A3, CO₂ = A1, NH₃ = B2L, R-32 et
     R-1234yf = A2L), PRP du CO₂ = 1. Tout le reste : « selon doc
     constructeur / norme, à faire valider » ;
   · azote seul pour toute mise en pression — jamais d'oxygène ni d'air
     comprimé ; consignation électrique systématique ;
   · croix du frigoriste : détendeur GAUCHE · compresseur DROITE ·
     condenseur HAUT · évaporateur BAS.
   ===================================================================== */

export const PACK_META = {
  id: "fluides-habilitation",
  titre: "Habilitation fluides frigorigènes — A1 · A2 · D · E (démonstrateur)",
  version: "0.1",
  type: "habilitation",
  charte: "inerweb-edu",
  // Les catégories d'aptitude visées par ce pack. Sert de filtre au
  // référentiel : le build ne réclame que les codes exigés pour celles-ci
  // (B = CO₂ et C = NH₃ sont hors périmètre, traités en information).
  categories: ["A1", "A2", "D", "E"],
  modes_actifs: ["auto", "test", "pilotage"], // pas d'« évaluation » : cf. README § moteur
  vue_stagiaire: false,
  carte_initiale: "c00",
  base_img: "packs/fluides/res/",
};

export const RESSOURCES = [
  {
    id: "r-arrete",
    titre: "📜 Arrêté du 21 novembre 2025 — attestations d'aptitude (Légifrance)",
    type: "lien",
    global: true,
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053004604",
  },
  {
    id: "r-aida",
    titre: "📘 Le même arrêté, mis en forme par AIDA / INERIS (plus lisible)",
    type: "lien",
    global: true,
    url: "https://aida.ineris.fr/reglementation/arrete-211125-relatif-a-delivrance-attestations-daptitude-prevues-a-larticle-r-543",
  },
  {
    id: "r-enthalpique",
    titre: "📈 Diagramme Enthalpique+ v3.2 — tracer le cycle complet",
    type: "lien",
    global: true,
    url: "https://frigorx.github.io/diagramme-enthalpique/",
  },
  {
    id: "r-symboles",
    titre: "✏ Bibliothèque de symboles frigorifiques + jeux",
    type: "lien",
    global: true,
    url: "https://frigorx.github.io/inerweb-frigolo/outils/symboles-frigorifiques.html",
  },
  {
    id: "r-kp1",
    titre: "🔧 Simulateur — pressostat BP (KP1) : réglage et diagnostic",
    type: "lien",
    url: "https://frigorx.github.io/inerweb-frigolo/outils/kp1-pressostat-bp.html",
  },
  {
    id: "r-kp5",
    titre: "🔧 Simulateur — pressostat HP de sécurité (KP5)",
    type: "lien",
    url: "https://frigorx.github.io/inerweb-frigolo/outils/kp5-pressostat-hp.html",
  },
  {
    id: "r-module-comp",
    titre: "🧩 Module compresseur — leçon interactive complète",
    type: "lien",
    url: "https://frigorx.github.io/inerweb-frigolo/outils/module-compresseur.html",
  },
  {
    id: "r-scroll",
    titre: "🌀 Le compresseur scroll — leçon interactive",
    type: "lien",
    url: "https://frigorx.github.io/inerweb-frigolo/outils/lecon-scroll.html",
  },
  {
    id: "r-echangeurs",
    titre: "♨ Échangeurs — évaporateur et condenseur en interactif",
    type: "lien",
    url: "https://frigorx.github.io/inerweb-frigolo/outils/echangeurs.html",
  },
  {
    id: "r-tp-mano",
    titre: "🧪 TP formatif — pose et dépose des manomètres (2 h, 7 activités)",
    type: "lien",
    url: "https://frigorx.github.io/inerweb-frigolo/outils/tp-manometres-formatif.html",
  },
  {
    id: "r-tp-peser",
    titre: "⚖ TP — inventaire et pesée des bouteilles frigorigènes",
    type: "lien",
    url: "https://frigorx.github.io/inerweb-tp-peser-bouteilles/",
  },
  {
    id: "r-cerfa",
    titre: "📋 inerWeb Fluide — s'entraîner : fiche d'intervention CERFA et BSD",
    type: "lien",
    url: "https://frigorx.github.io/-inerweb-fluid-cerfa-fi-bsd-4/",
  },
  {
    id: "r-fuites",
    titre: "🔎 Schéma : où fuit une installation ?",
    type: "image",
    global: true,
    src: "packs/fluides/res/svg/points-de-fuite.svg",
  },
  {
    id: "r-mollier",
    titre: "📈 FRIGOLO — diagramme log p-h interactif",
    type: "lien",
    global: true,
    url: "https://frigorx.github.io/inerweb-frigolo/outils/frigolo-mollier.html",
  },
  {
    id: "r-fgaz",
    titre: "🎯 Mission F-GAZ — 558 questions d'entraînement",
    type: "lien",
    global: true,
    url: "https://frigorx.github.io/inerweb-fgaz/",
  },
  {
    id: "r-croix",
    titre: "❄ Schéma : la croix du frigoriste",
    type: "image",
    global: true,
    src: "packs/fluides/res/svg/croix-frigoriste.svg",
  },
];

/* --- raccourcis de rédaction ------------------------------------- */
const SOMMAIRE = { vers: "c00", libelle: "↺ Sommaire", sec: true };
const suite = (vers, quoi) => ({ vers, libelle: "Suite ▸ " + quoi });
/* Un schéma se place dans le CORPS et non en `illus` : la charte recadre les
   illustrations de tête (object-fit: cover), ce qui tronquerait le dessin. */
/* Outil interactif embarqué (iframe, même origine — fonctionne en local et sur Pages). */
const outil = (fichier, titre, h) =>
  '<iframe src="packs/fluides/res/outils/' + fichier + '" title="' + titre + '" ' +
  'style="width:100%;height:' + h + 'px;border:0;background:#fff;border-radius:6px" loading="lazy"></iframe>';
const schema = (fichier, alt) =>
  '<img src="packs/fluides/res/svg/' + fichier + '" alt="' + alt + '" ' +
  'style="width:100%;height:auto;display:block;margin:0 0 18px;' +
  'border:1px solid #d7e0e8;border-radius:8px">';

/* Une PHOTO d'atelier, avec sa légende. Elle ne remplace pas le schéma :
   le schéma explique le principe, la photo fait reconnaître l'objet — et
   pour un public FLE ou DYS, reconnaître l'objet vaut trois paragraphes.
   Origine et droits de chaque cliché : res/photos/CATALOGUE.md */
const photo = (fichier, alt, legende) =>
  '<figure style="margin:0 0 18px">' +
  '<img src="packs/fluides/res/photos/' + fichier + '" alt="' + alt + '" ' +
  'style="width:100%;height:auto;display:block;border:1px solid #d7e0e8;border-radius:8px">' +
  (legende
    ? '<figcaption style="font-size:13px;color:#5a6b7d;margin-top:6px;font-style:italic">' +
      legende + '</figcaption>'
    : "") +
  "</figure>";

export const CARTES = [
  /* ==================================================================
     ACCUEIL
     ================================================================== */
  {
    id: "c00",
    type: "accueil",
    titre: "Habilitation fluides frigorigènes",
    corps:
      "<p class=\"lead\">Quatre catégories, un seul référentiel : <b>A1</b> et <b>A2</b> couvrent toute l'activité, " +
      "<b>D</b> la récupération seule, <b>E</b> le contrôle d'étanchéité sans ouvrir le circuit.</p>" +
      "<p>Choisis ton parcours — ou va directement <b>réviser par thème</b> : cet outil est fait " +
      "pour t'accompagner <b>avant</b> la formation, <b>pendant</b> les périodes en entreprise et " +
      "jusqu'à l'épreuve. Chaque question corrigée renvoie vers la fiche à relire. " +
      "Progression conseillée en formation : <b>E → D → A2 → A1</b>.</p>",
    menu_titre: "Choisir un parcours",
    liens: [
      {
        vers: "m-a1",
        icone: "A1",
        titre: "Catégorie A1",
        desc: "Tous équipements, toutes charges, hydrocarbures compris. Épreuve 4 h 15.",
        primaire: true,
      },
      {
        vers: "m-a2",
        icone: "A2",
        titre: "Catégorie A2",
        desc: "Mêmes activités, parc à charge limitée (< 3 kg, < 6 kg si scellé). Épreuve 3 h 55.",
      },
      {
        vers: "m-d",
        icone: "D",
        titre: "Catégorie D",
        desc: "Récupération du fluide uniquement. Épreuve 1 h 30.",
      },
      {
        vers: "m-e",
        icone: "E",
        titre: "Catégorie E",
        desc: "Contrôle d'étanchéité seul, sans accéder au circuit. Épreuve 1 h 30.",
      },
      {
        vers: "m-rev",
        icone: "📚",
        titre: "Réviser par thème",
        desc: "En autonomie : 13 séries corrigées, reliées aux fiches. Avant la formation, pendant le stage, avant l'épreuve.",
      },
      { vers: "m-prat", icone: "🔧", titre: "Préparation pratique", desc: "Le matériel et les gestes, à revoir avant l atelier." },
      {
        vers: "cfin",
        icone: "?",
        titre: "À propos de ce démonstrateur",
        desc: "Ce qu'il montre, ce qu'il ne fait pas encore.",
      },
    ],
    notes_pilote:
      "Page d'entrée à projeter en début de session. Faire choisir le parcours par le stagiaire lui-même : " +
      "beaucoup arrivent en pensant « je viens passer les fluides » sans savoir que la catégorie détermine " +
      "ce qu'ils auront le droit de faire. Deux minutes ici évitent une reconversion mal orientée. " +
      "Rappeler que les durées d'ÉPREUVE sont réglementaires, mais que les durées de FORMATION sont libres.",
  },

  /* ==================================================================
     MENUS DE PARCOURS
     ================================================================== */
  {
    id: "m-a1",
    type: "menu",
    // Entrer par ce menu fixe la catégorie visée : le moteur filtre ensuite
    // les tirages sur les seules compétences exigées en A1 (cf. § lot 4).
    categorie: "A1",
    illus: "img/illu-a1.jpg",
    titre: "Catégorie A1 — tous équipements, toutes charges",
    dc: "Parcours A1",
    corps:
      "<p>Groupes évalués : <b>1, 2, 3, 4, 5, 10, 11</b>, <b>au moins un</b> des groupes composants " +
      "6/7/8/9 tiré au sort le jour de l'épreuve — donc les quatre s'apprennent — et <b>12</b> " +
      "(hydrocarbures), la nouveauté de cette catégorie.</p>" +
      "<p>Formation indicative ≈ 35 h. Épreuve : <b>4 h 15</b>.</p>",
    menu_titre: "Les modules du parcours",
    liens: [
      { vers: "g0", icone: "§", titre: "Ce que la loi vous impose", desc: "G1 — règlement (UE) 2024/573, attestations, registre, DEEE." },
      { vers: "g1a", icone: "1", titre: "Unités, pression, thermodynamique utile", desc: "G1 — le socle de tout le reste." },
      { vers: "g1c", icone: "1", titre: "Familles et codes des fluides", desc: "G1 — CFC, HCFC, HFC, HFO, naturels ; décoder R-134a." },
      { vers: "g1d", icone: "1", titre: "Les organes qui trahissent une fuite", desc: "G1 — voyant, vannes, pressostats : lire les signes." },
      { vers: "g2a", icone: "2", titre: "L'histoire : ozone et climat", desc: "G2 — effet de serre, trou d'ozone, Montréal, Kyoto, Kigali." },
      { vers: "g2", icone: "2", titre: "Impact environnemental et F-Gas", desc: "G2 — PRP, phase-down, ce qui justifie le métier." },
      { vers: "g3", icone: "3", titre: "Contrôles avant mise en service", desc: "G3 — épreuve à l'azote, tirage au vide." },
      { vers: "g4a", icone: "4", titre: "Contrôles d'étanchéité", desc: "G4 — trois fiches : points de fuite, indirecte, directe." },
      { vers: "g5a", icone: "5", titre: "Récupération et charge", desc: "G5 — deux fiches : récupérer, puis charger sans perte." },
      { vers: "g6", icone: "6", titre: "Les quatre composants", desc: "G6 à G9 — huit fiches : le principe, puis les gestes." },
      { vers: "g10", icone: "10", titre: "Tuyauterie et brasage sous azote", desc: "G10 — un joint étanche, sans calamine." },
      { vers: "g11", icone: "11", titre: "Substitution et efficacité", desc: "G11 — choisir un fluide, gagner du rendement." },
      { vers: "g12", icone: "12", titre: "Hydrocarbures", desc: "G12 — spécifique A1 et A2 : le R-290 est A3.", primaire: true },
      { vers: "g12b", icone: "12", titre: "Intervenir sur un circuit hydrocarbure", desc: "G12 — le mode opératoire, étape par étape." },
      { vers: "g13", icone: "ℹ", titre: "CO₂ et NH₃ — information", desc: "G13/G14 — reconnaître, ne pas intervenir." },
      { vers: "ex-ech", icone: "🟢", titre: "Échauffement — niveau 1", desc: "12 questions fondamentales, seuil 60 %. Pour se lancer." },
      { vers: "ex-a1", icone: "📝", titre: "Examen blanc A1", desc: "20 questions tirées de tous les groupes." },
      { vers: "ex-defi", icone: "🔴", titre: "Défi technicien — niveau 2", desc: "15 diagnostics et mises en situation, seuil 80 %." },
      { vers: "c-prog", icone: "📊", titre: "Ma progression", desc: "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur." },
      { vers: "m-prat", icone: "🔧", titre: "Préparation pratique", desc: "Le matériel et les gestes, à revoir avant l atelier." },
      { vers: "c00", icone: "↺", titre: "Retour au sommaire", desc: "Changer de parcours." },
    ],
    notes_pilote:
      "Le point qui surprend toujours : le groupe composant est TIRÉ AU SORT à l'épreuve, donc les quatre " +
      "doivent être travaillés. Le dire dès le premier jour, sinon les stagiaires impasse trois modules sur quatre. " +
      "G12 (hydrocarbures) est la vraie nouveauté d'A1 — c'est là qu'il faut mettre le temps d'atelier.",
  },
  {
    id: "m-a2",
    type: "menu",
    categorie: "A2",
    illus: "img/illu-a2.jpg",
    titre: "Catégorie A2 — mêmes activités, charge limitée",
    dc: "Parcours A2",
    corps:
      "<p>Le référentiel est <b>le même qu'A1</b>. Ce qui change, ce n'est pas le contenu : c'est le " +
      "<b>parc</b>. On travaille sur des équipements de charge <b>&lt; 3 kg</b>, ou <b>&lt; 6 kg</b> " +
      "s'ils sont hermétiquement scellés et étiquetés comme tels : monosplit, PAC air/air, vitrine, " +
      "meuble frigorifique, monobloc.</p>" +
      "<p>Une grande partie de ce parc fonctionne au <b>R-290</b> : le module hydrocarbures est ici " +
      "encore plus central qu'en A1. Formation indicative ≈ 28 h. Épreuve : <b>3 h 55</b>.</p>",
    menu_titre: "Les modules du parcours",
    liens: [
      { vers: "g0", icone: "§", titre: "Ce que la loi vous impose", desc: "G1 — règlement (UE) 2024/573, attestations, registre, DEEE." },
      { vers: "g1a", icone: "1", titre: "Unités, pression, thermodynamique utile", desc: "G1 — insister sur les seuils de charge." },
      { vers: "g1c", icone: "1", titre: "Familles et codes des fluides", desc: "G1 — CFC, HCFC, HFC, HFO, naturels ; décoder R-134a." },
      { vers: "g1d", icone: "1", titre: "Les organes qui trahissent une fuite", desc: "G1 — voyant, vannes, pressostats : lire les signes." },
      { vers: "g2a", icone: "2", titre: "L'histoire : ozone et climat", desc: "G2 — effet de serre, trou d'ozone, Montréal, Kyoto, Kigali." },
      { vers: "g2", icone: "2", titre: "Impact environnemental et F-Gas", desc: "G2 — PRP et tonnes équivalent CO₂." },
      { vers: "g3", icone: "3", titre: "Contrôles avant mise en service", desc: "G3 — sur petits circuits, raccords flare." },
      { vers: "g4a", icone: "4", titre: "Contrôles d'étanchéité", desc: "G4 — trois fiches." },
      { vers: "g5a", icone: "5", titre: "Récupération et charge", desc: "G5 — petites quantités : la pesée devient critique." },
      { vers: "g6", icone: "6", titre: "Les quatre composants", desc: "G6 à G9 — groupes hermétiques, monoblocs." },
      { vers: "g10", icone: "10", titre: "Tuyauterie et brasage sous azote", desc: "G10 — petits diamètres." },
      { vers: "g11", icone: "11", titre: "Substitution et efficacité", desc: "G11 — conception à charge réduite." },
      { vers: "g12", icone: "12", titre: "Hydrocarbures", desc: "G12 — cœur du parc A2 (R-290 en monobloc et PAC).", primaire: true },
      { vers: "g12b", icone: "12", titre: "Intervenir sur un circuit hydrocarbure", desc: "G12 — le mode opératoire, étape par étape." },
      { vers: "ex-ech", icone: "🟢", titre: "Échauffement — niveau 1", desc: "12 questions fondamentales, seuil 60 %. Pour se lancer." },
      { vers: "ex-a2", icone: "📝", titre: "Examen blanc A2", desc: "15 questions tirées de tous les groupes." },
      { vers: "ex-defi", icone: "🔴", titre: "Défi technicien — niveau 2", desc: "15 diagnostics et mises en situation, seuil 80 %." },
      { vers: "c-prog", icone: "📊", titre: "Ma progression", desc: "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur." },
      { vers: "m-prat", icone: "🔧", titre: "Préparation pratique", desc: "Le matériel et les gestes, à revoir avant l atelier." },
      { vers: "c00", icone: "↺", titre: "Retour au sommaire", desc: "Changer de parcours." },
    ],
    notes_pilote:
      "Erreur classique du stagiaire : croire qu'A2 est « A1 au rabais » et donc plus facile. Le référentiel " +
      "est identique — seul le parc change. La limite de charge (3 kg / 6 kg scellé) doit devenir le fil rouge " +
      "de toute la semaine : la faire vérifier sur la plaque signalétique à chaque manipulation d'atelier.",
  },
  {
    id: "m-d",
    type: "menu",
    categorie: "D",
    illus: "img/illu-d.jpg",
    titre: "Catégorie D — récupération seule",
    dc: "Parcours D",
    corps:
      "<p>Une seule activité autorisée : <b>récupérer le fluide</b>. Public type : opérateur de fin de vie, " +
      "filière DEEE, dépanneur qui ne fait que récupérer.</p>" +
      "<p><b>Ne fait pas partie de D</b> : contrôles d'étanchéité (G4), composants (G6 à G9), " +
      "tuyauterie et brasage (G10), épreuves de pression. Du groupe 3, seul le code <b>3.03</b> " +
      "(utiliser une pompe à vide) est dans le champ.</p>" +
      "<p>Formation indicative ≈ 10 h. Épreuve : <b>1 h 30</b>.</p>",
    menu_titre: "Les modules du parcours",
    liens: [
      { vers: "g0", icone: "§", titre: "Ce que la loi vous impose", desc: "G1 — règlement (UE) 2024/573, attestations, registre, DEEE." },
      { vers: "g1a", icone: "1", titre: "Bases : fluides, thermo utile, composants", desc: "G1 partiel — savoir de quoi on parle." },
      { vers: "g1c", icone: "1", titre: "Familles et codes des fluides", desc: "G1 — CFC, HCFC, HFC, HFO, naturels ; décoder R-134a." },
      { vers: "g2a", icone: "2", titre: "L'histoire : ozone et climat", desc: "G2 — effet de serre, trou d'ozone, Montréal, Kyoto, Kigali." },
      { vers: "g2", icone: "2", titre: "Enjeu environnemental", desc: "G2 — pourquoi on ne rejette pas." },
      { vers: "g5a", icone: "5", titre: "Récupérer sans émettre", desc: "G5 — le cœur du métier D.", primaire: true },
      { vers: "g5b", icone: "5", titre: "Peser, stocker, tracer", desc: "G5 — la balance et le registre." },
      { vers: "g3", icone: "3", titre: "Pompe à vide (code 3.03 seul)", desc: "G3 partiel — le seul code du groupe 3 dans le champ D." },
      { vers: "g11", icone: "11", titre: "Substitution — notions", desc: "G11 partiel (11.01 · 11.05)." },
      { vers: "x3", icone: "🕵", titre: "Détective : la bouteille de récupération", desc: "Mise en situation — le niveau maxi est atteint." },
      { vers: "ex-d-ech", icone: "🟢", titre: "Échauffement — niveau 1", desc: "8 questions fondamentales, seuil 60 %." },
      { vers: "ex-d", icone: "📝", titre: "Examen blanc D", desc: "10 questions sur le périmètre D." },
      { vers: "c-prog", icone: "📊", titre: "Ma progression", desc: "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur." },
      { vers: "m-prat", icone: "🔧", titre: "Préparation pratique", desc: "Le matériel et les gestes, à revoir avant l atelier." },
      { vers: "c00", icone: "↺", titre: "Retour au sommaire", desc: "Changer de parcours." },
    ],
    notes_pilote:
      "Parcours court, public souvent éloigné de la technique frigorifique. Ne pas noyer : on n'enseigne pas " +
      "le cycle pour lui-même, mais ce qu'il faut en savoir pour récupérer proprement. Le geste à faire " +
      "répéter jusqu'à l'automatisme : peser le cylindre AVANT, respecter le taux de remplissage, ne jamais " +
      "mélanger deux fluides. La fiche G3 se limite ici à la pompe à vide — ne pas déborder sur l'épreuve de pression.",
  },
  {
    id: "m-e",
    type: "menu",
    categorie: "E",
    illus: "img/illu-e.jpg",
    titre: "Catégorie E — contrôle d'étanchéité, sans ouvrir",
    dc: "Parcours E",
    corps:
      "<p>Une seule activité : le <b>contrôle d'étanchéité</b>, à la condition expresse de " +
      "<b>ne pas accéder au circuit frigorifique</b>. C'est la frontière du métier : " +
      "<b>on contrôle, on n'ouvre pas</b>.</p>" +
      "<p>Le code <b>4.06</b> (méthode directe nécessitant d'intervenir dans le circuit) " +
      "<b>n'est pas de la catégorie E</b>. Le code 4.07, lui, l'est : c'est la méthode directe " +
      "qui reste à l'extérieur.</p>" +
      "<p>Public type : agent de maintenance réalisant les contrôles périodiques. " +
      "Formation indicative ≈ 10 h. Épreuve : <b>1 h 30</b>.</p>",
    menu_titre: "Les modules du parcours",
    liens: [
      { vers: "g0", icone: "§", titre: "Ce que la loi vous impose", desc: "G1 — règlement (UE) 2024/573, attestations, registre, DEEE." },
      { vers: "g1a", icone: "1", titre: "Bases : pression, température, fluides", desc: "G1 partiel — dont la pression absolue." },
      { vers: "g1b", icone: "1", titre: "Lire une table de saturation", desc: "G1 · code 1.03 — indispensable à la méthode indirecte.", primaire: true },
      { vers: "g1c", icone: "1", titre: "Familles et codes des fluides", desc: "G1 — CFC, HCFC, HFC, HFO, naturels ; décoder R-134a." },
      { vers: "g2a", icone: "2", titre: "L'histoire : ozone et climat", desc: "G2 — effet de serre, trou d'ozone, Montréal, Kyoto, Kigali." },
      { vers: "g2", icone: "2", titre: "Enjeu environnemental", desc: "G2 — pourquoi une fuite compte." },
      { vers: "g4a", icone: "4", titre: "Où fuit une installation ?", desc: "G4 — points de fuite et registre." },
      { vers: "g4b", icone: "4", titre: "Méthode indirecte", desc: "G4 — mesurer, comparer, interpréter." },
      { vers: "g4c", icone: "4", titre: "Méthode directe et consignation", desc: "G4 — détecteur, traceur, registre." },
      { vers: "g11", icone: "11", titre: "Substitution — notions", desc: "G11 partiel (11.01)." },
      { vers: "x4", icone: "🕵", titre: "Détective : le contrôle qui tourne mal", desc: "Mise en situation — registre, détecteur, incohérence." },
      { vers: "ex-e-ech", icone: "🟢", titre: "Échauffement — niveau 1", desc: "8 questions fondamentales, seuil 60 %." },
      { vers: "ex-e", icone: "📝", titre: "Examen blanc E", desc: "10 questions sur le périmètre E." },
      { vers: "c-prog", icone: "📊", titre: "Ma progression", desc: "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur." },
      { vers: "m-prat", icone: "🔧", titre: "Préparation pratique", desc: "Le matériel et les gestes, à revoir avant l atelier." },
      { vers: "c00", icone: "↺", titre: "Retour au sommaire", desc: "Changer de parcours." },
    ],
    notes_pilote:
      "La question que pose toujours un stagiaire E : « et si je trouve la fuite, je peux la réparer ? » — " +
      "Non. E autorise le contrôle, pas l'intervention sur le circuit. Faire formuler la frontière par le " +
      "groupe lui-même, elle se retient mieux. Conséquence pédagogique : la méthode indirecte (lecture " +
      "manomètre + table de saturation) est le cœur du parcours, il faut y passer le temps d'atelier.",
  },

  /* ==================================================================
     G1 — LÉGISLATION & THERMODYNAMIQUE ÉLÉMENTAIRE
     ================================================================== */
  {
    id: "m-rev",
    type: "menu",
    titre: "Réviser par thème",
    dc: "Auto-formation · avant, pendant, après",
    corps:
      "<p class=\"lead\">Cet espace est fait pour être utilisé <b>seul</b> : avant la formation pour " +
      "arriver préparé, pendant les périodes de stage pour entretenir, avant l'épreuve pour cibler.</p>" +
      "<p>Chaque série corrige <b>immédiatement</b>, chaque erreur renvoie vers la fiche à relire, " +
      "et le bilan de fin liste tes points faibles. Ton <b>score précédent</b> s'affiche à chaque " +
      "nouvelle tentative : bats-le.</p>",
    menu_titre: "Choisir un thème",
    liens: [
      { vers: "rev-g1", icone: "1", titre: "Les bases : pression, température, cycle", desc: "unités, relation P-T, les quatre organes, le log p-h — 10 questions." },
      { vers: "rev-g2", icone: "2", titre: "Environnement et F-Gas", desc: "PRP, tonnes équivalent CO₂, règlement (UE) 2024/573 — 7 questions." },
      { vers: "rev-g3", icone: "3", titre: "Contrôles avant mise en service", desc: "épreuve azote, tirage au vide — 5 questions." },
      { vers: "rev-g4", icone: "4", titre: "Contrôles d'étanchéité", desc: "registre, méthode indirecte, détecteur — le cœur du parcours E — 10 questions." },
      { vers: "rev-g5", icone: "5", titre: "Récupération, charge, traçabilité", desc: "cylindres, pesée, registre, fin de vie — le cœur du parcours D — 10 questions." },
      { vers: "rev-g6", icone: "6", titre: "Compresseur et circuit d'huile", desc: "principe, sécurités, retour d'huile, diagnostics — 10 questions." },
      { vers: "rev-g7", icone: "7", titre: "Condenseur", desc: "principe, pressostats, incondensables, entretien — 8 questions." },
      { vers: "rev-g8", icone: "8", titre: "Évaporateur", desc: "surchauffe, givrage, dégivrage, diagnostics — 10 questions." },
      { vers: "rev-g9", icone: "9", titre: "Détendeur et accessoires", desc: "TXV, capillaire, filtre, voyant, électrovanne — 10 questions." },
      { vers: "rev-g10", icone: "10", titre: "Tuyauterie et brasage", desc: "balayage azote, alliages, cintrage — 6 questions." },
      { vers: "rev-g11", icone: "11", titre: "Substitution et efficacité", desc: "classes de sécurité, COP, drop-in et retrofit — 10 questions." },
      { vers: "rev-g12", icone: "12", titre: "Hydrocarbures", desc: "R-290, analyse de risques, zéro ignition — 7 questions." },
      { vers: "rev-g13", icone: "13", titre: "CO₂ et NH₃", desc: "reconnaître, respecter les catégories, ne pas intervenir — 9 questions." },
      { vers: "ex-ech", icone: "🟢", titre: "Se tester — Échauffement (niveau 1)", desc: "12 questions fondamentales, tous thèmes, seuil 60 %." },
      { vers: "ex-defi", icone: "🔴", titre: "Se tester — Défi technicien (niveau 2)", desc: "15 diagnostics, tous thèmes, seuil 80 %." },
      { vers: "c-prog", icone: "📊", titre: "Ma progression", desc: "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur." },
      { vers: "c00", icone: "↺", titre: "Retour au sommaire", desc: "Revenir aux parcours." },
    ],
    notes_pilote:
      "Le concept : le stagiaire reçoit le lien AVANT la formation, le garde pendant les périodes " +
      "en entreprise, et révise en fonction de son niveau — c'est un outil de préparation à l'examen, " +
      "pas seulement un support de séance. Les scores restent dans le navigateur de l'élève " +
      "(localStorage) : rien ne remonte, RGPD tranquille. En séance, ouvrir cette page en début de " +
      "semaine et laisser 20 minutes de révision libre : chacun travaille SON point faible.",
  },
  {
    id: "c-prog",
    type: "progression",
    titre: "Ma progression",
    dc: "Auto-formation · où j'en suis",
    liens: [SOMMAIRE],
    notes_pilote:
      "À montrer au stagiaire dès le premier jour : c'est ce qui donne du sens aux séries. " +
      "Insister sur le fait que rien ne remonte — la page ne sert qu'à LUI. En fin de stage, " +
      "faire ouvrir cette page avant l'examen blanc : les compétences rouges disent quoi réviser.",
  },

  /* ==================================================================
     PRÉPARATION PRATIQUE — le matériel et les gestes, AVANT l'atelier
     Ce module ne remplace pas la manipulation : il la prépare. Charte
     FrigorX : préparation de chantier ≤ 1 h, sécurité démontrée et
     imposée — jamais découverte par l'erreur.
     ================================================================== */
  {
    id: "m-prat",
    type: "menu",
    titre: "Préparation pratique — le matériel et les gestes",
    dc: "Avant de toucher au fluide",
    corps:
      "<p>Ce module ne remplace pas l'atelier : il le <b>prépare</b>. On y revoit le matériel et " +
      "l'ordre des gestes <b>avant</b> d'avoir le fluide dans les mains — à quoi sert cet appareil, " +
      "comment il se branche, dans quel ordre on ouvre et on ferme, ce qu'on regarde, ce qu'on note.</p>" +
      "<p>La sécurité s'y <b>démontre et s'impose</b> : on ne découvre jamais un risque par l'erreur.</p>",
    menu_titre: "Les sept préparations",
    liens: [
      { vers: "p1", icone: "1", titre: "Le manifold — lire, brancher, ne pas polluer", desc: "Lire les manomètres, brancher et débrancher sans polluer." },
      { vers: "p2", icone: "2", titre: "La station de récupération — ce que c'est, comment on la branche", desc: "Le groupe de récupération : à quoi il sert, comment on le raccorde." },
      { vers: "p3", icone: "3", titre: "Pompe à vide et vacuomètre — monter, tirer, lire", desc: "Monter la pompe, tirer au vide, lire le vacuomètre — et dans quel ordre arrêter." },
      { vers: "p4", icone: "4", titre: "La bouteille d'azote et son mano-détendeur", desc: "Monter le mano-détendeur, régler, mettre en pression. Azote seul, toujours." },
      { vers: "p5", icone: "5", titre: "L'ordre des vannes — la chorégraphie de l'intervention", desc: "Fermer, laisser stabiliser, desserrer lentement. La chorégraphie qui évite le rejet." },
      { vers: "p6", icone: "6", titre: "La balance et la pesée — avant, après, ce qu'on note", desc: "Peser avant, peser après. Une estimation ne se consigne pas." },
      { vers: "p7", icone: "7", titre: "Préparation de chantier — risques, EPI, zone de travail", desc: "Analyse de risques, EPI, zone balisée : ce qui se fait AVANT le premier geste." },
      { vers: "c00", icone: "↺", titre: "Retour au sommaire", desc: "Changer de parcours." },
    ],
    notes_pilote:
      "À faire passer en préparation de chantier, dans l'heure qui précède le plateau — jamais la " +
      "veille au soir, l'oubli est total. Faire tenir le matériel réel pendant la lecture de la " +
      "fiche : le geste s'ancre par l'objet, pas par l'écran. Les valeurs chiffrées (pression " +
      "d'épreuve, niveau de vide, débit d'azote) restent À FIXER par le formateur depuis son plateau.",
  },
  {
    id: "p1",
    type: "cours",
    titre: "Le manifold — lire, brancher, ne pas polluer",
    dc: "Préparation pratique · codes 5.01 · 4.05",
    minuteur_s: 330,
    corps:
      schema("recuperation.svg", "Le principe de branchement : installation à l arrêt, isolée, flexibles raccordés à l appareil, minimum d émissions à chaque connexion.") +
      "<p>Le <b>manifold</b> (ensemble manométrique) réunit deux manomètres — <b>BP en bleu</b>, <b>HP en rouge</b> — " +
      "et deux vannes, une par côté, qui commandent le passage vers le <b>flexible central jaune</b> : celui qui " +
      "part vers la pompe à vide, la bouteille de récupération, ou une bouteille d'azote équipée de son " +
      "<b>mano-détendeur</b>.</p>" +
      "<ol>" +
      "<li>Consigner électriquement l'installation avant tout branchement.</li>" +
      "<li>Vérifier que les deux vannes du manifold sont fermées.</li>" +
      "<li>Visser le flexible bleu sur le raccord à obus côté basse pression — côté évaporateur, en bas de la croix du frigoriste.</li>" +
      "<li>Visser le flexible rouge sur le raccord à obus côté haute pression — côté condenseur et compresseur, en haut à droite.</li>" +
      "<li>Purger l'air de chaque flexible par un bref coup d'ouverture-fermeture — jamais un rejet prolongé.</li>" +
      "<li>Ouvrir les vannes une par une, jamais les deux ensemble, en surveillant les aiguilles.</li>" +
      "<li>Lire : pression BP, pression HP, température à la pince.</li>" +
      "<li>Refermer les deux vannes du manifold avant toute déconnexion.</li>" +
      "<li>Débrancher en purgeant chaque flexible — minimum d'émission, jamais de rejet volontaire.</li>" +
      "</ol>" +
      "<p>Le manomètre affiche une <b>pression relative</b> : pour obtenir la pression absolue, on ajoute environ " +
      "<b>1 bar</b>. La pince de température et le multimètre servent à la <b>méthode indirecte</b> de contrôle " +
      "d'étanchéité : on compare les valeurs mesurées — surchauffe (plage normale <b>5 à 10 K</b>), " +
      "sous-refroidissement (plage normale <b>4 à 8 K</b>), intensité absorbée — à celles attendues sur la fiche " +
      "constructeur. Un écart qui se creuse alerte, sans avoir ouvert le circuit.</p>",
    blocs: [
      {
        type: "cle",
        t: "Fermé avant, fermé après",
        html:
          "Les deux vannes du manifold restent <b>fermées</b> à chaque branchement et à chaque débranchement. " +
          "Elles ne s'ouvrent qu'une fois les deux flexibles vissés et vérifiés, et se referment avant toute " +
          "déconnexion. C'est ce qui évite le rejet au moment du geste.",
      },
      {
        type: "piege",
        t: "Les deux vannes ouvertes en même temps",
        html:
          "Ouvrir BP et HP <b>ensemble</b> fait communiquer les deux côtés du circuit et fausse la lecture. " +
          "On ouvre <b>une vanne à la fois</b>, on lit, puis l'autre.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Sur la croix du frigoriste, où se branche le flexible bleu (BP) du manifold ?",
      choix: [
        "Côté condenseur, en haut",
        "Côté évaporateur, en bas",
        "Côté compresseur, à droite",
        "Peu importe, les deux flexibles sont interchangeables",
      ],
      bonne: 1,
      explication:
        "Le flexible bleu (BP) se branche côté basse pression, c'est-à-dire côté évaporateur, en bas de la croix du frigoriste. Le flexible rouge (HP) se branche côté haute pression, condenseur et compresseur, en haut à droite.",
      remediation_vers: "p1",
    },
    criteres: [
      { code: "5.01", libelle: "Brancher et débrancher les flexibles du manifold avec un minimum d'émissions", etat: "a_evaluer" },
      { code: "4.05", libelle: "Lire les instruments portables et interpréter les valeurs mesurées", etat: "a_evaluer" },
    ],
    liens: [suite("p2", "La station de récupération — ce que c'est, comment on la branche"), { vers: "m-prat", libelle: "↺ Module pratique", sec: true }, SOMMAIRE],
    notes_pilote:
      "Faire manipuler un manifold hors tension, hors fluide : vannes fermées, on visse, on vérifie, on ouvre " +
      "une vanne à la fois. Faire dire tout haut « BP bleu, évaporateur, en bas » en pointant la croix du " +
      "frigoriste au tableau, avant de brancher pour de vrai. Faire observer une purge courte de flexible " +
      "plutôt qu'un rejet prolongé — c'est le geste qui distingue un professionnel.",
  },
  {
    id: "p2",
    type: "cours",
    titre: "La station de récupération — ce que c'est, comment on la branche",
    dc: "Préparation pratique · codes 5.03",
    minuteur_s: 300,
    corps:
      schema("recuperation.svg", "Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance.") +
      "<p>La <b>station de récupération</b> est un appareil autonome : elle aspire le fluide de l'installation et " +
      "le transfère vers un <b>cylindre dédié</b>, posé sur une balance. Avant tout branchement, l'installation " +
      "est <b>à l'arrêt et isolée</b>.</p>" +
      "<ol>" +
      "<li>Consigner électriquement l'installation à traiter.</li>" +
      "<li>Vérifier l'étiquette du cylindre de récupération : le fluide indiqué doit être exactement celui de l'installation.</li>" +
      "<li>Poser le cylindre sur la balance et noter la masse de départ, avant tout branchement.</li>" +
      "<li>Vannes du groupe fermées, brancher le flexible d'entrée sur le circuit et le flexible de sortie sur le cylindre.</li>" +
      "<li>Mettre le groupe sous tension et le régler selon la fiche du fabricant.</li>" +
      "<li>Ouvrir les vannes dans l'ordre indiqué par le fabricant ; surveiller la pression et la masse affichée.</li>" +
      "<li>En fin de transfert, purger les flexibles avant de débrancher — minimum d'émission.</li>" +
      "<li>Repeser le cylindre, noter la masse récupérée, consigner au registre.</li>" +
      "</ol>" +
      "<p>Le cylindre respecte le <b>taux de remplissage maximal</b> indiqué sur son étiquette : jamais rempli " +
      "à ras. Le liquide se dilate avec la température — un cylindre trop plein est un danger.</p>",
    blocs: [
      {
        type: "cle",
        t: "Peser avant, peser après",
        html:
          "La différence entre la masse de départ et la masse d'arrivée est la <b>seule preuve fiable</b> de ce " +
          "qui a été récupéré. Sans pesée avant, ce nombre n'existe pas.",
      },
      {
        type: "piege",
        t: "Un cylindre, un seul fluide",
        html:
          "Une étiquette qui ne correspond pas exactement au fluide de l'installation : on ne branche pas. " +
          "Mélanger deux fluides rend le contenu du cylindre inutilisable pour le recyclage ou la régénération.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Avant de brancher le cylindre de récupération, quelle vérification est obligatoire ?",
      choix: [
        "Que la balance est éteinte",
        "Que l'étiquette du cylindre correspond exactement au fluide de l'installation",
        "Que le cylindre est déjà à moitié plein",
        "Que le groupe est débranché du secteur",
      ],
      bonne: 1,
      explication:
        "Le fluide indiqué sur l'étiquette du cylindre doit être exactement celui de l'installation. Mélanger deux fluides différents rend le contenu du cylindre inutilisable pour le recyclage ou la régénération.",
      remediation_vers: "p2",
    },
    criteres: [
      { code: "5.03", libelle: "Brancher et débrancher un groupe de récupération avec un minimum d'émissions", etat: "a_evaluer" },
    ],
    liens: [suite("p3", "Pompe à vide et vacuomètre — monter, tirer, lire"), { vers: "m-prat", libelle: "↺ Module pratique", sec: true }, SOMMAIRE],
    notes_pilote:
      "Faire manipuler le groupe hors fluide : reconnaître le cordon secteur, le flexible d'entrée, le flexible " +
      "de sortie, l'ordre des vannes indiqué sur l'appareil. Insister sur la pesée, avant ET après — c'est la " +
      "seule preuve de ce qui a été récupéré. Faire vérifier l'étiquette du cylindre à voix haute avant chaque " +
      "branchement, jamais de mémoire.",
  },
  {
    id: "p3",
    type: "cours",
    titre: "Pompe à vide et vacuomètre — monter, tirer, lire",
    dc: "Préparation pratique · codes 3.03 · 3.04",
    minuteur_s: 330,
    corps:
      "<p>Le <b>tirage au vide</b> retire l'air et l'humidité du circuit avant charge — ce n'est pas du fluide " +
      "qu'on évacue ici, mais de l'air et de la vapeur d'eau : la question du rejet à l'atmosphère ne se pose pas " +
      "à ce stade. La <b>pompe à vide</b> aspire ; le <b>vacuomètre</b> électronique indique jusqu'où on est " +
      "descendu, bien plus finement qu'un manomètre.</p>" +
      "<ol>" +
      "<li>Consigner électriquement l'installation avant tout montage.</li>" +
      "<li>Vérifier le niveau d'huile de la pompe avant de la mettre en service.</li>" +
      "<li>Fermer les deux vannes du manifold.</li>" +
      "<li>Visser le vacuomètre sur le raccord prévu, du côté du circuit — jamais collé directement à la pompe : une lecture prise trop près de la pompe ne reflète pas le vide réel du circuit.</li>" +
      "<li>Brancher la pompe sur le flexible central du manifold.</li>" +
      "<li>Ouvrir les deux vannes du manifold pour tirer sur l'ensemble du circuit.</li>" +
      "<li>Mettre la pompe en marche.</li>" +
      "<li>Observer l'aiguille du vacuomètre descendre.</li>" +
      "<li>Une fois le vide stabilisé — valeur cible selon la fiche constructeur — fermer d'abord la vanne côté circuit, puis seulement ensuite arrêter la pompe.</li>" +
      "<li>Surveiller si le vide remonte, selon la pratique habituelle : une remontée signale une fuite ou de l'humidité résiduelle.</li>" +
      "</ol>" +
      "<p>L'ordre du neuvième geste protège le circuit : si la pompe s'arrête avant que la vanne soit fermée, " +
      "l'huile de la pompe peut être aspirée en sens inverse vers le circuit qu'on vient de mettre sous vide.</p>",
    blocs: [
      {
        type: "cle",
        t: "Isoler avant d'arrêter",
        html:
          "On ferme toujours la vanne côté circuit <b>avant</b> d'arrêter la pompe, jamais l'inverse. C'est " +
          "l'ordre qui protège le circuit d'un retour d'huile.",
      },
      {
        type: "piege",
        t: "Vacuomètre collé à la pompe",
        html:
          "Une lecture prise juste à la sortie de la pompe ne dit rien du vide réel dans le circuit. Le " +
          "vacuomètre se monte du <b>côté circuit</b>.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Dans quel ordre protège-t-on le circuit à la fin d'un tirage au vide ?",
      choix: [
        "Arrêter la pompe, puis fermer la vanne côté circuit",
        "Fermer la vanne côté circuit, puis arrêter la pompe",
        "Ouvrir grand le vacuomètre, puis arrêter la pompe",
        "Débrancher directement la pompe sans toucher aux vannes",
      ],
      bonne: 1,
      explication:
        "On isole toujours le circuit — vanne fermée côté circuit — avant d'arrêter la pompe. Dans l'ordre inverse, l'huile de la pompe peut être aspirée en sens inverse vers le circuit qu'on vient de mettre sous vide.",
      remediation_vers: "p3",
    },
    criteres: [
      { code: "3.03", libelle: "Monter et mettre en service une pompe à vide", etat: "a_evaluer" },
      { code: "3.04", libelle: "Évacuer l'air et l'humidité en tirant au vide, selon la pratique habituelle", etat: "a_evaluer" },
    ],
    liens: [suite("p4", "La bouteille d'azote et son mano-détendeur"), { vers: "m-prat", libelle: "↺ Module pratique", sec: true }, SOMMAIRE],
    notes_pilote:
      "Faire monter le montage sur un poste d'essai, jamais en première fois sur une installation cliente. " +
      "Faire vérifier l'huile de la pompe avant de démarrer — un réflexe qu'on saute facilement. Faire dire " +
      "tout haut « isoler, puis arrêter » avant de le faire réellement : c'est l'ordre qui compte, pas la " +
      "vitesse. Ne donner aucune valeur de vide cible ni de durée : renvoyer systématiquement à la fiche " +
      "constructeur du modèle utilisé en atelier.",
  },
  {
    id: "p4",
    type: "cours",
    titre: "La bouteille d'azote et son mano-détendeur",
    dc: "Préparation pratique · codes 3.01 · 3.02",
    minuteur_s: 300,
    corps:
      schema("epreuve-azote.svg", "Le mano-détendeur monté sur la bouteille d azote sec, raccordé au manifold puis au circuit à éprouver, vanne par vanne — jamais d oxygène ni d air comprimé.") +
      "<p>Une bouteille d'azote ne se branche jamais directement sur un circuit. Entre les deux, il y a toujours un <b>mano-détendeur</b>. Il lit la pression de la bouteille. Il règle la pression envoyée dans le circuit. Sans lui, toute la pression de la bouteille part d'un coup — largement de quoi faire éclater un circuit.</p>" +
      "<p>Le mano-détendeur porte <b>deux cadrans</b>. Le premier indique ce qu'il reste dans la bouteille. Le second indique la pression réglée en sortie, celle qui part vers le circuit. On lit toujours les deux.</p>" +
      "<ol>" +
      "<li>Vérifier que le raccord est <b>propre</b>, sans trace d'huile ni de graisse : l'azote sous pression au contact d'huile est un risque.</li>" +
      "<li>Monter le mano-détendeur sur le robinet de la bouteille. Vérifier que la <b>vis de réglage est desserrée</b> — aucune pression envoyée en sortie.</li>" +
      "<li>Ouvrir <b>lentement</b> le robinet de la bouteille. Lire la pression bouteille sur le premier cadran.</li>" +
      "<li>Raccorder le flexible de sortie au manifold, puis au circuit à éprouver.</li>" +
      "<li>Visser <b>progressivement</b> la vis de réglage. La pression de sortie monte, à lire sur le second cadran, jusqu'à la valeur donnée par la documentation du constructeur ou la norme applicable.</li>" +
      "<li>Une fois la pression atteinte, fermer le robinet de la bouteille. Observer : le cadran de sortie ne doit plus bouger.</li>" +
      "</ol>",
    blocs: [
      {
        type: "piege",
        t: "Geste interdit — sans discussion",
        html:
          "Une bouteille d'azote <b>ne se branche jamais en direct</b> sur un circuit, mano-détendeur absent. " +
          "La mise en pression se fait <b>à l'azote sec, seul</b>. Jamais d'oxygène — explosif au contact de " +
          "l'huile. Jamais d'air comprimé — humide, chargé en oxygène.",
      },
      {
        type: "cle",
        t: "Deux cadrans, deux informations",
        html:
          "Cadran <b>bouteille</b> : ce qu'il reste dedans. Cadran <b>sortie</b> : ce que vous envoyez dans le " +
          "circuit. Un cadran de sortie qui ne tient pas sa pression signale une fuite au raccord — à vérifier " +
          "avant d'aller plus loin.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Vous venez de monter le mano-détendeur sur la bouteille d'azote. Avant d'ouvrir le robinet de la bouteille, dans quelle position doit être la vis de réglage ?",
      choix: [
        "Vissée à fond, pour avoir la pression maximale tout de suite",
        "Desserrée, pour n'envoyer aucune pression en sortie avant d'ouvrir la bouteille",
        "Peu importe, on règle après de toute façon",
        "À mi-course, pour gagner du temps",
      ],
      bonne: 1,
      explication:
        "Vis desserrée : aucune pression envoyée en sortie. On ouvre la bouteille, on lit sa pression, puis on visse progressivement pour monter en pression côté circuit. Ouvrir la bouteille vis déjà serrée enverrait un à-coup de pression incontrôlé.",
      remediation_vers: "p4",
    },
    criteres: [
      { code: "3.01", libelle: "Réaliser une épreuve de pression de résistance", etat: "a_evaluer" },
      { code: "3.02", libelle: "Réaliser une épreuve de pression d'étanchéité", etat: "a_evaluer" },
    ],
    liens: [suite("p5", "L'ordre des vannes — la chorégraphie de l'intervention"), { vers: "m-prat", libelle: "↺ Module pratique", sec: true }, SOMMAIRE],
    notes_pilote:
      "Poser le mano-détendeur démonté sur la table et faire deviner son rôle avant d'expliquer : pourquoi deux " +
      "cadrans, pourquoi une vis. Faire monter le montage par un stagiaire, azote réel si le plateau le permet, " +
      "en insistant sur la vis desserrée AVANT ouverture bouteille — intervenir immédiatement si quelqu'un ouvre " +
      "la bouteille vis serrée, ne pas laisser aller au bout du geste. Rappeler que ces codes ne concernent pas " +
      "la catégorie D : un stagiaire D observe la démonstration mais n'est pas interrogé dessus.",
  },
  {
    id: "p5",
    type: "cours",
    titre: "L'ordre des vannes — la chorégraphie de l'intervention",
    dc: "Préparation pratique · codes 5.01 · 5.02",
    minuteur_s: 420,
    corps:
      schema("recuperation.svg", "Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance — chaque flexible débranché suit le même ordre : fermer, stabiliser, desserrer lentement.") +
      "<p>Un manifold, ce sont des <b>vannes</b>. Les ouvrir et les fermer dans le bon ordre n'est pas un détail. Un mauvais ordre peut lâcher un nuage de fluide au visage, ou libérer un flexible sous pression.</p>" +
      "<p>À la <b>connexion</b>, l'ordre est simple : vannes fermées, on raccorde les flexibles, on chasse l'air resté à l'intérieur par une ouverture brève, puis on ouvre progressivement.</p>" +
      "<p>C'est à la <b>déconnexion</b> que l'ordre compte le plus. Il ne change jamais :</p>" +
      "<ol>" +
      "<li><b>Fermer</b> la vanne, côté circuit puis côté appareil.</li>" +
      "<li><b>Laisser la pression se stabiliser.</b> Observer le manomètre. Tant que l'aiguille bouge encore, on attend.</li>" +
      "<li><b>Desserrer lentement</b> le raccord du flexible, à peine, par petites touches. On écoute. On continue. Jamais d'un coup.</li>" +
      "<li>S'il reste du fluide <b>emprisonné dans le flexible</b>, le récupérer par l'appareil déjà branché. Jamais le laisser partir à l'air libre.</li>" +
      "<li>Déconnecter seulement quand la pression est retombée et confirmée.</li>" +
      "</ol>" +
      "<p>La même logique s'applique pour <b>vider ou remplir un cylindre</b>, en phase liquide comme en phase gazeuse. Une bouteille de réfrigérant a une prise dédiée à chaque phase, ou s'utilise dans un sens précis pour tirer du liquide. On suit toujours le marquage de la bouteille, jamais un raccord forcé.</p>",
    blocs: [
      {
        type: "cle",
        t: "La chorégraphie qui ne change jamais",
        html:
          "<b>Fermer → laisser stabiliser → desserrer lentement.</b> Ce triptyque revient à chaque déconnexion, " +
          "quel que soit l'appareil branché. C'est le geste central de tout ce module : une fois automatique, " +
          "il protège dans toutes les situations.",
      },
      {
        type: "piege",
        t: "Le geste interdit",
        html:
          "Desserrer un raccord <b>encore sous pression</b>, d'un coup. Purger le résidu d'un flexible " +
          "<b>à l'air libre</b> pour aller plus vite. Chaque émission compte, même petite : l'objectif est " +
          "toujours le <b>minimum d'émission</b>, jamais zéro effort.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Vous venez de fermer les deux vannes en fin de récupération. Le manomètre indique encore une pression résiduelle dans le flexible. Que faites-vous ?",
      choix: [
        "Je desserre le raccord d'un coup, la pression restante est faible",
        "J'attends que la pression cesse de bouger sur le manomètre, puis je desserre lentement en récupérant le résidu",
        "Je purge le flexible à l'air libre avant de le ranger",
        "Je tape légèrement sur le raccord pour le débloquer plus vite",
      ],
      bonne: 1,
      explication:
        "On attend que la pression se stabilise. On desserre lentement. Le fluide encore présent dans le flexible se récupère : il n'est pas relâché. Une pression faible reste une pression — le geste brusque et la purge à l'air libre sont tous deux à écarter.",
      remediation_vers: "p5",
    },
    criteres: [
      { code: "5.01", libelle: "Connecter et déconnecter avec un minimum d'émissions", etat: "a_evaluer" },
      { code: "5.02", libelle: "Vider et remplir un cylindre, en phase liquide et gazeuse", etat: "a_evaluer" },
    ],
    liens: [suite("p6", "La balance et la pesée — avant, après, ce qu'on note"), { vers: "m-prat", libelle: "↺ Module pratique", sec: true }, SOMMAIRE],
    notes_pilote:
      "La fiche centrale du module : y passer le temps qu'il faut. Faire manipuler un manifold et des flexibles " +
      "réels (azote ou circuit vide) et faire répéter le triptyque fermer / stabiliser / desserrer jusqu'à ce " +
      "que le geste soit lent par réflexe, pas par consigne. Observer AVANT d'expliquer : laisser un stagiaire " +
      "desserrer à sa vitesse naturelle une première fois — la plupart vont trop vite, et c'est ce constat, pas " +
      "un discours, qui doit amener la correction. Corriger immédiatement un geste brusque, ne jamais laisser " +
      "aller au bout : la sécurité s'impose, elle ne se découvre pas par la sensation d'un jet résiduel.",
  },
  {
    id: "p6",
    type: "cours",
    titre: "La balance et la pesée — avant, après, ce qu'on note",
    dc: "Préparation pratique · codes 5.05 · 5.06",
    minuteur_s: 330,
    corps:
      "<p>La quantité de fluide qui entre ou sort d'un circuit se lit sur une <b>balance</b>, jamais sur un manomètre. Le manomètre dit comment la machine se comporte. La balance dit <b>combien</b> il y a de fluide.</p>" +
      "<p>Avant toute pesée, on choisit une balance <b>adaptée</b> à la quantité attendue. On la pose à plat, stable, vérifiée. Une balance douteuse ne sert à rien : son résultat n'est pas fiable.</p>" +
      "<ol>" +
      "<li>Poser la bouteille sur la balance <b>avant</b> toute opération. Relever le poids. Le noter — pas de mémoire.</li>" +
      "<li>Avant d'ouvrir la moindre vanne, déterminer l'<b>état du fluide</b> attendu : liquide ou gazeux, selon l'opération et la documentation constructeur. Ce choix fixe le sens du remplissage.</li>" +
      "<li>Réaliser l'opération — récupération ou charge — en surveillant la balance pendant que ça se fait, pas seulement à la fin.</li>" +
      "<li>Fermer les vannes, laisser la pression se stabiliser, déconnecter proprement.</li>" +
      "<li>Peser à nouveau, <b>après</b>. Relever ce second poids.</li>" +
      "<li>Calculer l'écart entre les deux pesées. C'est la quantité réelle, pas une estimation.</li>" +
      "<li>Reporter aussitôt le résultat au registre : date, quantité, intervenant.</li>" +
      "</ol>" +
      "<p>Cas particulier : un fluide <b>zéotrope</b>, composé de plusieurs corps, se charge toujours en <b>phase liquide</b>. Le sortir en phase gazeuse changerait sa composition en cours de route.</p>",
    blocs: [
      {
        type: "cle",
        t: "Deux pesées, jamais une",
        html:
          "On pèse <b>avant</b> et <b>après</b>. Sans pesée de départ, le chiffre obtenu n'est qu'une " +
          "<b>estimation</b>. Une estimation ne se consigne pas dans un registre.",
      },
      {
        type: "piege",
        t: "Peser seulement à la fin",
        html:
          "Peser une seule fois, à la fin, et déduire la quantité à vue de nez : c'est le réflexe à corriger " +
          "en premier. Lire une quantité chargée sur un manomètre plutôt que sur la balance ne donne jamais " +
          "un chiffre exploitable non plus.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Vous avez oublié de peser la bouteille avant une récupération, et vous ne l'avez pesée qu'à la fin. Que vaut ce chiffre ?",
      choix: [
        "La quantité récupérée, exactement",
        "La tare de la bouteille",
        "Une estimation qui ne peut pas remplacer une vraie double pesée",
        "Rien, la pesée finale suffit toujours",
      ],
      bonne: 2,
      explication:
        "Sans poids de départ, impossible de connaître la quantité réellement récupérée : ce n'est qu'une estimation. Elle ne se consigne pas comme une mesure au registre. La seule solution est de recommencer, avec une pesée avant et une pesée après.",
      remediation_vers: "p6",
    },
    criteres: [
      { code: "5.05", libelle: "Déterminer l'état du fluide et charger sans perte", etat: "a_evaluer" },
      { code: "5.06", libelle: "Choisir la balance adaptée et peser", etat: "a_evaluer" },
    ],
    liens: [suite("p7", "Préparation de chantier — risques, EPI, zone de travail"), { vers: "m-prat", libelle: "↺ Module pratique", sec: true }, SOMMAIRE],
    notes_pilote:
      "Faire peser un objet neutre (bouteille d'eau, poids étalon) deux fois avant d'expliquer la règle, et " +
      "demander ce qui se passerait si on n'avait que la seconde pesée — laisser le groupe trouver lui-même que " +
      "le premier chiffre est indispensable. Faire remplir une ligne de registre fictive à partir des deux " +
      "pesées relevées. Le réflexe à traquer : le stagiaire qui commence à manipuler avant d'avoir pesé — " +
      "l'arrêter avant le premier geste, pas après.",
  },
  {
    id: "p7",
    type: "cours",
    titre: "Préparation de chantier — risques, EPI, zone de travail",
    dc: "Préparation pratique · codes 12.04 · 12.05",
    minuteur_s: 360,
    corps:
      "<p>Avant de sortir le moindre outil, deux choses se préparent : l'<b>analyse de risques</b> et la <b>zone de travail</b>. Ce n'est pas une formalité à cocher après coup. C'est la première étape du chantier, avant le premier geste technique.</p>" +
      "<p><b>L'analyse de risques</b> se fait dans cet ordre :</p>" +
      "<ol>" +
      "<li>Identifier le fluide en jeu, à partir de la plaque signalétique ou de la documentation : inflammable, sous pression, en espace confiné.</li>" +
      "<li>Repérer les dangers de la <b>zone elle-même</b> : ventilation, sources de chaleur ou d'étincelle à proximité, accès, présence de tiers.</li>" +
      "<li>Éliminer ce qui peut l'être — couper une source de chaleur, dégager un passage.</li>" +
      "<li>Signaler ce qui ne peut pas être éliminé. Si un point bloque vraiment, le chantier n'engage pas tant qu'il n'est pas corrigé.</li>" +
      "</ol>" +
      "<p>Vient ensuite la <b>préparation de la zone</b> :</p>" +
      "<ol>" +
      "<li>Baliser et signaler la zone de travail.</li>" +
      "<li>Dégager une <b>issue</b> utilisable à tout moment de l'intervention.</li>" +
      "<li>Sélectionner les <b>équipements de protection</b> adaptés au fluide et au geste prévu : protection des yeux, gants adaptés au produit et au froid, détecteur de gaz porté si le fluide l'exige.</li>" +
      "<li>Vérifier le matériel avant de l'emporter sur zone. Un flexible douteux ou un détecteur non vérifié <b>ne sort pas</b> de l'atelier.</li>" +
      "<li>Consigner électriquement l'installation avant toute ouverture de circuit.</li>" +
      "</ol>",
    blocs: [
      {
        type: "piege",
        t: "Sécurité imposée, jamais découverte",
        html:
          "On ne teste pas un risque en le vivant. EPI absent, issue condamnée, détecteur en panne : chacun de " +
          "ces points <b>arrête le chantier avant qu'il commence</b>, pas après un premier incident.",
      },
      {
        type: "cle",
        t: "L'ordre qui protège",
        html:
          "Analyser → éliminer ce qui peut l'être → signaler le reste → baliser → s'équiper → vérifier le " +
          "matériel → consigner. Et alors seulement, intervenir.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "En arrivant sur la zone d'intervention, vous constatez que l'issue de secours est encombrée par du matériel stocké. Que faites-vous ?",
      choix: [
        "Je dégage l'issue et je signale le point avant d'engager le chantier",
        "Je commence le travail, je dégagerai l'issue plus tard si besoin",
        "Je note l'anomalie dans mon rapport et je continue normalement",
        "Je demande à un collègue de rester posté devant l'issue pendant l'intervention",
      ],
      bonne: 0,
      explication:
        "Une issue condamnée est un point bloquant de l'analyse de risques. On ne commence pas en espérant que ça n'arrivera pas. On dégage, ou on fait dégager, avant le premier geste technique.",
      remediation_vers: "p7",
    },
    criteres: [
      { code: "12.04", libelle: "Réaliser l'analyse de risques avant le travail", etat: "a_evaluer" },
      { code: "12.05", libelle: "Préparer la zone de travail et choisir les EPI adaptés", etat: "a_evaluer" },
    ],
    liens: [{ vers: "m-prat", libelle: "↺ Module pratique", sec: true }, SOMMAIRE],
    notes_pilote:
      "Avant d'expliquer quoi que ce soit, étaler les EPI disponibles en atelier et faire trouver au groupe " +
      "lequel correspond à quel risque — ne pas les nommer à leur place. Mettre en scène un point bloquant " +
      "crédible (issue encombrée, détecteur déchargé) sans prévenir, et observer : le stagiaire s'arrête-t-il " +
      "de lui-même, ou faut-il l'arrêter ? C'est ce réflexe qu'on cherche à installer. Ces deux codes sont " +
      "spécifiques A1/A2 (réfrigérants inflammables) au référentiel — mais le réflexe d'analyse de risques " +
      "avant intervention vaut pour tous les fluides, à généraliser au-delà de l'épreuve.",
  },
  {
    id: "g0",
    type: "cours",
    titre: "Ce que la loi vous impose",
    dc: "G1 · code 1.00",
    minuteur_s: 360,
    corps:
      "<p>Les fluides frigorigènes peuvent réchauffer le climat s'ils s'échappent dans l'air. Deux niveaux de loi encadrent votre métier : le niveau européen et le niveau français.</p>" +
      "<p>Au niveau européen, le texte de base est le <b>règlement (UE) 2024/573</b>. C'est un <b>règlement</b>, jamais une « directive » : il s'applique directement dans tous les pays de l'Union, sans loi française pour le recopier. Il a remplacé l'ancien règlement 517/2014.</p>" +
      "<p>Au niveau français, l'<b>arrêté du 21 novembre 2025</b> — un texte signé par un ministre — précise comment appliquer ce règlement sur le terrain.</p>" +
      "<p>Pour intervenir sur les fluides, il vous faut une <b>attestation d'aptitude</b> personnelle. Votre entreprise, elle, doit avoir une <b>attestation de capacité</b>. Ce sont deux papiers obligatoires, et ce n'est pas le même.</p>" +
      "<p>Chaque équipement a un <b>registre</b> : un carnet qui garde la trace de chaque intervention (charge, contrôle, fuite, réparation). C'est l'<b>exploitant</b> (le propriétaire ou l'utilisateur de la machine) qui doit le tenir à jour, sur papier ou sur ordinateur.</p>" +
      "<p>Quand l'équipement est trop vieux ou cassé, il part dans la filière <b>DEEE</b> (déchets d'équipements électriques et électroniques). Cette filière s'occupe de la carcasse de la machine, pas du fluide : vous devez le récupérer avant, à part.</p>" +
      "<p>Enfin, l'<b>écoconception</b> : dès la fabrication, les constructeurs doivent concevoir des appareils qui durent plus longtemps et qui polluent moins.</p>",
    blocs: [
      { type: "cle", t: "Ce qu'il faut retenir", html: "<ul><li>Le texte européen est un <b>règlement</b> — (UE) 2024/573 — jamais une « directive ».</li><li><b>Attestation d'aptitude</b> : c'est pour vous, la personne.</li><li><b>Attestation de capacité</b> : c'est pour l'entreprise.</li><li><b>Registre</b> de l'équipement : tenu par l'exploitant, papier ou électronique.</li><li><b>DEEE</b> : la filière de fin de vie de la machine, pas du fluide.</li></ul>" },
      { type: "piege", t: "L'erreur classique", html: "<p>Apprendre par cœur un chiffre précis (seuil, date, délai) vu dans une ancienne fiche. Le régime des fluides a changé avec le <b>règlement (UE) 2024/573</b> et l'<b>arrêté du 21 novembre 2025</b>. Face à un chiffre, réflexe unique : vérifier le texte en vigueur, jamais le deviner.</p>" },
    ],
    question: {
      type: "qcm",
      enonce: "Le règlement (UE) 2024/573, qui encadre les fluides frigorigènes, est...",
      choix: [
        "une directive, que la France doit recopier dans sa propre loi",
        "un règlement, qui s'applique directement dans toute l'Union européenne",
        "une norme technique facultative",
        "une simple recommandation, sans obligation",
      ],
      bonne: 1,
      explication: "C'est un <b>règlement</b>, pas une directive : il s'applique tel quel, tout de suite, dans tous les pays de l'Union européenne. Il a remplacé le règlement 517/2014.",
      remediation_vers: "g0",
    },
    criteres: [
      { code: "1.00", libelle: "Identifier les obligations légales de base liées aux fluides frigorigènes", etat: "a_evaluer" },
    ],
    liens: [suite("g1a", "Unités, pression, thermodynamique utile"), SOMMAIRE],
    notes_pilote: "Partir du concret : demander qui, dans l'entreprise du stagiaire, détient l'attestation de capacité, et qui détient l'attestation d'aptitude. Insister à l'oral sur le mot RÈGLEMENT (jamais « directive ») : confusion fréquente, piège classique à l'examen. Ne pas s'attarder sur des chiffres précis : renvoyer systématiquement au texte en vigueur.",
  },
  {
    id: "g1a",
    type: "cours",
    titre: "Unités, pression, thermodynamique utile",
    dc: "G1 · codes 1.01 · 1.02 · 1.04",
    minuteur_s: 300,
    corps:
      schema("croix-frigoriste.svg", "La croix du frigoriste : détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas.") +
      "<p>Tout le métier tient sur un couple : <b>pression et température vont ensemble</b>. " +
      "Chauffer un fluide enfermé fait monter sa pression ; abaisser sa pression le fait bouillir plus froid. " +
      "C'est cette relation qu'on exploite d'un bout à l'autre du circuit.</p>" +
      "<p>Quatre organes, dans l'ordre du cycle : le <b>compresseur</b> aspire la vapeur basse pression " +
      "et la refoule en haute pression ; le <b>condenseur</b> évacue la chaleur et liquéfie ; " +
      "le <b>détendeur</b> fait chuter la pression ; l'<b>évaporateur</b> absorbe la chaleur du milieu " +
      "à refroidir. Basse pression du côté froid, haute pression du côté chaud.</p>",
    blocs: [
      {
        type: "cle",
        t: "À retenir",
        html:
          "<b>Surchauffe</b> : le fluide sort de l'évaporateur un peu plus chaud que sa température " +
          "d'évaporation — elle protège le compresseur du liquide. Repère : <b>5 à 10 K</b>.<br>" +
          "<b>Sous-refroidissement</b> : le liquide sort du condenseur un peu plus froid que sa " +
          "température de condensation — il garantit du liquide pur au détendeur. Repère : <b>4 à 8 K</b>.",
      },
      {
        type: "piege",
        t: "Le piège des manomètres",
        html:
          "<b>Pression absolue = pression relative + environ 1 bar.</b> Un manomètre de service lit en " +
          "relatif ; les tables de saturation, elles, sont souvent en absolu. Se tromper d'un bar, " +
          "c'est se tromper de plusieurs kelvins sur la température de saturation — et diagnostiquer une " +
          "fuite qui n'existe pas.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Un manomètre branché sur la basse pression indique 3 bar. Quelle est la pression absolue correspondante ?",
      choix: ["Environ 2 bar", "Environ 3 bar", "Environ 4 bar", "On ne peut pas savoir"],
      bonne: 2,
      explication:
        "Pression absolue = pression relative + environ 1 bar. Le manomètre lit en relatif : 3 + 1 = environ 4 bar absolus.",
      remediation_vers: "g1a",
    },
    criteres: [
      { code: "1.01", libelle: "Utiliser les unités normalisées (température, pression, masse, énergie)", etat: "a_evaluer" },
      { code: "1.02", libelle: "Expliquer la thermodynamique élémentaire du froid", etat: "a_evaluer" },
      { code: "1.04", libelle: "Décrire la fonction de chaque composant du circuit", etat: "a_evaluer" },
    ],
    ressources: ["r-croix", "r-mollier"],
    liens: [suite("g1b", "Lire une table de saturation"), SOMMAIRE],
    notes_pilote:
      "Faire lire un manomètre RÉEL et retrouver la température de saturation dans la table : c'est " +
      "l'ancrage de tout le contrôle indirect qui viendra en G4. Tant que ce geste n'est pas acquis, " +
      "inutile d'avancer. Pédagogie de la découverte : faire deviner ce qui se passe si on chauffe une " +
      "bouteille fermée, avant d'énoncer la relation pression-température.",
  },
  {
    id: "g1b",
    type: "cours",
    titre: "Lire un log p-h et une table de saturation",
    dc: "G1 · code 1.03",
    minuteur_s: 300,
    corps:
      schema("lecture-table.svg", "La lecture croisée : manomètre + 1 bar, table de saturation du fluide, sonde de contact.") +
      "<p>Une <b>table de saturation</b> donne, pour un fluide donné, la correspondance entre pression " +
      "et température d'équilibre liquide-vapeur. Elle se lit dans les deux sens : je mesure une pression, " +
      "j'en déduis une température ; je mesure une température, j'en déduis une pression.</p>" +
      "<p>Le <b>diagramme log p-h</b> est la même information, en image : la pression en ordonnée " +
      "(échelle logarithmique), l'enthalpie en abscisse. Sous la cloche, le fluide est un mélange " +
      "liquide + vapeur ; à gauche, il est liquide ; à droite, vapeur.</p>" +
      "<p>C'est l'outil de la <b>méthode indirecte</b> : sans ouvrir le circuit, on compare ce qu'on " +
      "mesure à ce que la table annonce.</p>",
    blocs: [
      {
        type: "cle",
        t: "La méthode en trois gestes",
        html:
          "1. Relever la <b>pression</b> au manomètre (et la convertir en absolu si besoin).<br>" +
          "2. Lire la <b>température de saturation</b> correspondante dans la table du fluide.<br>" +
          "3. Comparer à la <b>température réellement mesurée</b> sur le tube : l'écart, c'est la " +
          "surchauffe (à l'aspiration) ou le sous-refroidissement (en sortie de condenseur).",
      },
      {
        type: "piege",
        t: "Un fluide, une table",
        html:
          "Chaque fluide a sa propre table : la pression lue ne veut rien dire tant qu'on ne sait pas " +
          "<b>quel fluide</b> est dans le circuit. On le vérifie sur la plaque signalétique et dans le " +
          "registre, jamais « à la couleur de la bouteille ».",
      },
      {
        t: "À toi : la réglette P ↔ T",
        html:
          "<p style=\"margin:0 0 10px\">Choisis un fluide, règle la pression lue au manomètre, entre la température du tube : la surchauffe se calcule sous tes yeux. C est exactement le geste de la méthode indirecte.</p>" +
          outil("reglette.html", "Réglette pression-température interactive", 445),
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Sur le diagramme log p-h, que représente l'axe horizontal ?",
      choix: ["La température", "La pression", "L'enthalpie", "Le volume"],
      bonne: 2,
      explication:
        "L'axe horizontal porte l'enthalpie (l'énergie contenue par kilogramme de fluide) ; la pression est en ordonnée, en échelle logarithmique.",
      remediation_vers: "g1b",
    },
    criteres: [
      { code: "1.03", libelle: "Lire et interpréter un diagramme log p-h et une table de saturation", etat: "a_evaluer" },
      { code: "1.06", libelle: "Situer les caractéristiques des fluides de substitution", etat: "a_evaluer" },
    ],
    ressources: ["r-mollier"],
    liens: [suite("g1c", "Familles et codes des fluides"), SOMMAIRE],
    notes_pilote:
      "Fiche indispensable au parcours E : sans elle, la méthode indirecte est du bricolage. " +
      "Utiliser FRIGOLO en projection, puis faire refaire la lecture sur une table papier — le passage " +
      "de l'outil à la table imprimée est ce qui reste le jour de l'épreuve. " +
      "Faire chercher : « la pression est plus basse que la table, qu'est-ce que ça peut vouloir dire ? » " +
      "avant de donner « manque de charge ».",
  },

  /* ==================================================================
     G2 — ENVIRONNEMENT
     ================================================================== */
  {
    id: "g1c",
    type: "cours",
    titre: "Les familles de fluides et leurs codes",
    dc: "G1 · codes 1.06 · 1.07",
    minuteur_s: 420,
    corps:
      schema("familles-fluides.svg", "Les cinq familles : CFC, HCFC, HFC, HFO et naturels, avec leur composition atomique.") +
      "<p>Derrière chaque code se cache une <b>molécule</b>, et trois atomes y décident de tout : " +
      "le <b>chlore</b> détruit l'ozone — c'est lui qui a condamné les CFC puis les HCFC ; " +
      "le <b>fluor</b> rend la molécule stable, donc durable dans l'atmosphère, donc à fort effet " +
      "de serre ; l'<b>hydrogène</b> raccourcit la durée de vie. Les <b>HFC</b> ont éliminé le " +
      "chlore (ozone sauvé), gardé le fluor (climat pénalisé). Les <b>HFO</b> ajoutent une double " +
      "liaison fragile : la molécule casse en quelques jours, PRP ≈ 1. Les <b>naturels</b> — " +
      "propane, isobutane, ammoniac, CO₂ — existent sans chimie de synthèse, chacun avec son " +
      "revers : inflammabilité, toxicité ou pression.</p>" +
      schema("nomenclature.svg", "Décoder R-134a : centaines = carbone moins un, dizaines = hydrogène plus un, unités = fluor. Les séries R-4xx, R-5xx, R-6xx, R-7xx.") +
      "<p>Et le numéro n'est pas un matricule : il <b>décrit la molécule</b>. Centaines + 1 = " +
      "carbone, dizaines − 1 = hydrogène, unités = fluor — les liaisons restantes sont du chlore. " +
      "Les mélanges et les fluides inorganiques ont leurs séries : 4xx, 5xx, 6xx, 7xx.</p>",
    blocs: [
      {
        type: "cle",
        t: "L'astuce du + 90",
        html:
          "Ajoute 90 au code, et tu lis directement C, H, F : " +
          "<b>134 + 90 = 224</b> → C₂H₂F₄ (R-134a). <b>22 + 90 = 112</b> → C·H·F₂… plus un " +
          "<b>chlore</b> pour compléter : CHClF₂ — voilà pourquoi le R-22 est un HCFC interdit. " +
          "<b>290 + 90 = 380</b> → C₃H₈ : le propane, zéro fluor, zéro chlore.",
      },
      {
        type: "piege",
        t: "Le code dit la molécule, pas le danger",
        html:
          "R-32 et R-290 se ressemblent sur l'étiquette — l'un est A2L, l'autre A3. " +
          "La famille chimique dit l'<b>impact environnemental</b> ; la classe NF EN 378 dit le " +
          "<b>risque de manipulation</b>. Il faut les deux lectures, à chaque fois.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Un fluide dont le code commence par R-4 (R-404A, R-407C, R-410A…) est toujours :",
      choix: [
        "Un corps pur de la famille HFO",
        "Un mélange zéotrope de plusieurs fluides",
        "Un fluide naturel",
        "Un fluide contenant du chlore",
      ],
      bonne: 1,
      explication:
        "La série R-4xx désigne les mélanges zéotropes : plusieurs fluides assemblés, avec un glissement de température. La lettre majuscule finale (A, B, C) distingue les proportions du mélange.",
      remediation_vers: "g1c",
    },
    criteres: [
      { code: "1.06", libelle: "Identifier la famille et les caractéristiques d'un fluide", etat: "a_evaluer" },
      { code: "1.07", libelle: "Décoder la nomenclature R-xyz et les séries de mélanges", etat: "a_evaluer" },
    ],
    liens: [suite("g1d", "Les organes qui trahissent une fuite"), SOMMAIRE],
    notes_pilote:
      "Faire décoder AU TABLEAU deux ou trois codes avant de donner la règle : R-32, R-290, " +
      "R-744 — le groupe trouve la logique lui-même, elle se retient dix fois mieux. L'astuce du " +
      "+90 fait mouche à tous les coups. Point d'attention : le R-22 est le meilleur exemple " +
      "pédagogique (le chlore « caché » dans les liaisons restantes explique son interdiction). " +
      "Relier à la carte d'identité interactive : chaque stagiaire décode un fluide puis vérifie.",
  },
  {
    id: "g1d",
    type: "cours",
    titre: "Les organes qui trahissent une fuite",
    dc: "G1 · code 1.05",
    minuteur_s: 420,
    corps:
      schema("points-de-fuite.svg", "Sur le circuit, les organes qui alertent ou protègent avant, pendant et après une fuite.") +
      "<p>Une fuite ne se voit pas toujours de face. Mais plusieurs organes du circuit la " +
      "<b>trahissent</b> : ils changent d'aspect, se mettent en sécurité, ou limitent les " +
      "dégâts. Les repérer, c'est déjà commencer le diagnostic.</p>" +
      "<ul>" +
      "<li><b>a) Les valves.</b> Le <b>robinet à boule</b> et le <b>robinet à soupape</b> " +
      "isolent une portion de circuit ; leur presse-étoupe (la bague qui serre la tige de " +
      "manœuvre) est un point de fuite classique. Le <b>robinet à diaphragme</b> n'a pas cette " +
      "tige : une membrane souple assure l'étanchéité, donc moins d'usure. La <b>vanne " +
      "électromagnétique</b>, dite <b>solénoïde</b>, s'ouvre et se ferme électriquement ; elle " +
      "isole la réserve de fluide en cas d'arrêt. La <b>vanne 4 voies</b> inverse le sens du " +
      "cycle (froid ↔ chaud) : beaucoup de raccords brasés et une pièce mobile interne, donc " +
      "plusieurs points à surveiller.</li>" +
      "<li><b>b) Les contrôles de température et de pression.</b> Le <b>thermostat</b> pilote " +
      "le compresseur selon la température. Le <b>pressostat de régulation</b> fait pareil " +
      "selon la pression : il coupe et relance en fonctionnement normal — à ne pas confondre " +
      "avec le <b>pressostat de sécurité</b>, qui protège contre une pression anormale (détail " +
      "ci-dessous). Un pressostat de régulation qui coupe trop tôt peut signaler un manque de " +
      "charge, donc une fuite.</li>" +
      "<li><b>c) Le voyant liquide et la pastille d'humidité.</b> Le <b>voyant liquide</b> est " +
      "un hublot sur la ligne liquide. En <b>régime stable</b> (l'installation tourne depuis un " +
      "moment), il doit rester net, sans bulle. Des <b>bulles qui persistent</b> montrent un " +
      "manque de charge — souvent une fuite. La <b>pastille d'humidité</b>, intégrée au voyant, " +
      "change de couleur selon l'eau présente dans le circuit ; la grille de lecture est propre " +
      "à chaque fabricant, selon la fiche constructeur.</li>" +
      "<li><b>d) Les contrôles du dégivrage.</b> Ils déclenchent et arrêtent le dégivrage de " +
      "l'évaporateur. Un givre anormal — pas symétrique, ou qui ne part jamais complètement — " +
      "n'est pas toujours un problème de dégivrage : ça peut être un manque de fluide qui prive " +
      "une partie de la batterie.</li>" +
      "<li><b>e) Les protecteurs du système.</b> Protection thermique du compresseur, " +
      "<b>soupape de sécurité</b>, pressostat de sécurité (vu plus haut) : ils empêchent " +
      "qu'une anomalie ne tourne à la casse. Une soupape de sécurité qui s'ouvre relâche " +
      "elle-même du fluide dans l'atmosphère : une fuite volontaire, réglée pour l'urgence, à " +
      "contrôler selon la fiche constructeur.</li>" +
      "<li><b>f) Les instruments de mesure.</b> Un <b>thermomètre</b> à pince ou à contact " +
      "mesure la température réelle d'un tube. Comparé à la table de saturation (revoir " +
      "G1 · code 1.03), l'écart donne la surchauffe ou le sous-refroidissement : c'est la " +
      "méthode indirecte, sans ouvrir le circuit.</li>" +
      "<li><b>g) Les systèmes de contrôle de l'huile.</b> Un <b>voyant d'huile</b> sur le " +
      "compresseur montre le niveau et l'aspect de l'huile. Un niveau qui baisse sans " +
      "explication doit alerter : l'huile se mélange au fluide et s'échappe avec lui par une " +
      "fuite — même logique que la trace d'huile sous un raccord (déjà vue en G4).</li>" +
      "<li><b>h) Les réservoirs.</b> La <b>bouteille de liquide</b> stocke le fluide condensé " +
      "avant le détendeur. Plusieurs raccords (entrée, sortie, vanne de service) : autant de " +
      "points à contrôler. L'isoler avant une intervention limite la quantité de fluide qui " +
      "pourrait fuir.</li>" +
      "<li><b>i) Les séparateurs de liquide et d'huile.</b> Le <b>séparateur de liquide</b>, " +
      "sur l'aspiration, retient le liquide résiduel pour éviter un <b>coup de liquide</b> au " +
      "compresseur (il aspire du liquide au lieu de vapeur : casse immédiate, le liquide ne se " +
      "comprime pas). Le <b>séparateur d'huile</b>, sur le refoulement, retient l'huile " +
      "entraînée par le gaz chaud et la renvoie au compresseur.</li>" +
      "</ul>" +
      "<p>Sur les fluides très inflammables ou toxiques (hydrocarbures, ammoniac) et sur le " +
      "CO₂, qui travaille à haute pression, ces mêmes organes existent mais avec des exigences " +
      "renforcées propres à chaque fluide.</p>",
    blocs: [
      {
        type: "cle",
        t: "Où les trouver sur la croix du frigoriste",
        html:
          "Détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas. " +
          "Le <b>séparateur d'huile</b> se loge juste à la sortie du compresseur, côté droit, " +
          "sur le refoulement. Le <b>réservoir</b> et le <b>voyant liquide</b> se trouvent sur " +
          "la ligne liquide, entre le condenseur (haut) et le détendeur (gauche) — juste avant " +
          "le détendeur. Le <b>séparateur de liquide</b> se loge juste avant l'entrée du " +
          "compresseur, côté droit, sur l'aspiration.",
      },
      {
        type: "piege",
        t: "Deux pressostats, pas un",
        html:
          "Le <b>pressostat de régulation</b> pilote le fonctionnement normal : il coupe et " +
          "relance le compresseur. Le <b>pressostat de sécurité</b> protège contre une " +
          "pression anormale ; il n'est pas fait pour cycler en continu. Les confondre " +
          "désactive une protection sans que ça se voie. Et avant toute intervention sur une " +
          "vanne solénoïde, un thermostat ou un pressostat : <b>consignation électrique</b>, " +
          "ce sont des organes électriques.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Sur une installation en régime stable (pas au démarrage, pas juste après un dégivrage), le voyant liquide laisse voir un défilé continu de bulles. Que faut-il en penser ?",
      choix: [
        "Rien : c'est le fonctionnement normal d'un voyant liquide",
        "Le circuit manque probablement de fluide : une fuite est possible",
        "Le compresseur aspire trop de liquide",
        "Le dégivrage doit se déclencher",
      ],
      bonne: 1,
      explication:
        "En régime stable, un voyant liquide propre montre du liquide plein tube, sans bulle. Des bulles qui persistent trahissent un mélange liquide + vapeur, donc un manque de charge — souvent une fuite. Quelques bulles transitoires au démarrage ou après un dégivrage sont normales ; c'est leur persistance en régime stable qui doit alerter.",
      remediation_vers: "g1d",
    },
    criteres: [
      { code: "1.05", libelle: "Relier chaque organe courant du circuit à son rôle dans la prévention ou la détection d'une fuite", etat: "a_evaluer" },
    ],
    liens: [suite("g2a", "Quarante ans d'histoire : de l'ozone au climat"), SOMMAIRE],
    notes_pilote:
      "Neuf organes d'un coup : les répartir en quatre familles pour ne pas noyer le groupe — " +
      "CE QU'ON VOIT (voyant, pastille), CE QUI PILOTE (thermostat, pressostats, dégivrage), " +
      "CE QUI PROTÈGE (protecteurs, séparateurs) et CE QUI STOCKE (réservoir). Sur une machine " +
      "d'atelier, coffret électrique CONSIGNÉ, faire toucher du doigt chaque organe plutôt que " +
      "projeter une liste. Ce code est déjà interrogé ailleurs dans le pack (voyant liquide, " +
      "vanne solénoïde, vanne 4 voies, pressostat de régulation) sans qu'aucune fiche ne " +
      "l'enseigne : insister particulièrement sur ces quatre-là. Pédagogie de la découverte : " +
      "montrer une photo de voyant avec des bulles et demander « fuite ou pas, et pourquoi » " +
      "avant de donner la réponse.",
  },
  {
    id: "g2a",
    type: "cours",
    titre: "Quarante ans d'histoire : de l'ozone au climat",
    dc: "G2 · code 2.01",
    minuteur_s: 420,
    corps:
      schema("frise-histoire.svg", "Frise : CFC années 1930, trou d'ozone 1985, Montréal 1987, Kyoto 1997, Paris 2015, Kigali 2016, F-Gas III 2024.") +
      "<p>Dans les années 1930, les <b>CFC</b> sont des fluides « miracle » : stables, ni toxiques, " +
      "ni inflammables. Cinquante ans plus tard, la facture arrive : en <b>1985</b>, on découvre le " +
      "<b>trou dans la couche d'ozone</b> au-dessus de l'Antarctique — le chlore des CFC casse " +
      "l'ozone qui filtre les <b>UV-B</b>. En <b>1987</b>, le <b>protocole de Montréal</b> organise " +
      "leur sortie, puis celle des HCFC : la couche se répare, c'est le plus grand succès " +
      "environnemental mondial.</p>" +
      "<p>Mais les remplaçants, les <b>HFC</b>, inoffensifs pour l'ozone, sont de puissants gaz à " +
      "effet de serre. Le combat change de terrain : <b>Kyoto</b> (1997) les inscrit parmi les six " +
      "gaz visés, l'<b>accord de Paris</b> (2015) fixe le cap des +1,5 °C, et l'<b>amendement de " +
      "Kigali</b> (2016) fait entrer les HFC… dans le protocole de Montréal. En Europe, le " +
      "règlement <b>F-Gas</b> traduit tout cela en quotas, interdictions et obligations — celles " +
      "de ton métier.</p>",
    blocs: [
      {
        type: "cle",
        t: "L'effet de serre en deux phrases",
        html:
          "Le rayonnement solaire entre, la Terre renvoie de l'infrarouge, et certains gaz " +
          "(CO₂, vapeur d'eau, méthane…) retiennent cette chaleur. Cet effet est <b>vital</b> — " +
          "sans lui, il ferait environ <b>−18 °C</b> au lieu de +15 : c'est son <b>renforcement</b> " +
          "par nos émissions qui pose problème.",
      },
      {
        type: "piege",
        t: "Ozone et climat : deux problèmes, pas un",
        html:
          "L'<b>ODP</b> mesure l'attaque de l'ozone (affaire de <b>chlore et de brome</b>) ; le " +
          "<b>PRP</b> mesure l'effet de serre. Un HFC a un ODP <b>nul</b> et un PRP <b>énorme</b> : " +
          "excellent élève d'un côté, cancre de l'autre. Ne jamais confondre les deux bulletins.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Pourquoi les HFC, qui ont sauvé la couche d'ozone, sont-ils aujourd'hui visés à leur tour ?",
      choix: [
        "Parce qu'ils contiennent encore un peu de chlore",
        "Parce qu'ils sont de puissants gaz à effet de serre, malgré leur ODP nul",
        "Parce qu'ils sont tous très inflammables",
        "Parce qu'ils sont toxiques pour l'homme",
      ],
      bonne: 1,
      explication:
        "Zéro chlore : l'ozone est tranquille. Mais leur stabilité leur donne un fort pouvoir de réchauffement — d'où Kyoto, Kigali et le phase-down F-Gas. Le problème a changé de terrain, pas de molécules.",
      remediation_vers: "g2a",
    },
    criteres: [
      { code: "2.01", libelle: "Situer l'histoire : couche d'ozone, protocoles, politique climat", etat: "a_evaluer" },
    ],
    liens: [suite("g2", "Le PRP et F-Gas aujourd'hui"), SOMMAIRE],
    notes_pilote:
      "Cette fiche se RACONTE — le miracle, la catastrophe invisible, le sursaut mondial, la " +
      "rechute climatique. Question à lancer avant d'afficher quoi que ce soit : « pourquoi " +
      "a-t-on interdit des fluides techniquement parfaits ? ». Le pivot à faire retenir : " +
      "KIGALI — les HFC, qui ne touchent pas l'ozone, entrent quand même dans Montréal, parce " +
      "que c'est le traité qui fonctionne. Lien direct avec la fiche suivante (PRP, quotas) : " +
      "l'histoire explique la réglementation, la réglementation explique les gestes du métier.",
  },
  {
    id: "g2",
    type: "cours",
    titre: "Impact environnemental et F-Gas",
    dc: "G2 · codes 2.01 · 2.02",
    minuteur_s: 300,
    corps:
      schema("prp-echelle.svg", "Comparaison du PRP : CO2 = 1, R-32 = 675, R-410A = 2088, R-404A = 3922.") +
      "<p>Deux accords internationaux, deux problèmes différents. Le <b>protocole de Montréal</b> (1987) " +
      "visait la <b>couche d'ozone</b> : il a fait disparaître les CFC puis les HCFC. La " +
      "<b>convention climat</b> (Kyoto, Paris) vise le <b>réchauffement</b> : c'est elle qui s'attaque " +
      "aux HFC, dont l'action sur l'ozone est nulle mais l'effet de serre considérable.</p>" +
      "<p>Le <b>PRP</b> (potentiel de réchauffement planétaire, ou GWP) mesure cet effet, " +
      "<b>par kilogramme</b>, en prenant le <b>CO₂ comme étalon : PRP = 1</b>. " +
      "L'impact réel d'une installation, lui, dépend aussi de la charge : c'est la " +
      "<b>tonne équivalent CO₂</b>.</p>" +
      "<p>Le règlement <b>(UE) 2024/573</b> — dit F-Gas III — organise la réduction progressive des " +
      "quantités de HFC mises sur le marché (<i>phase-down</i>), attribue des quotas aux producteurs " +
      "et importateurs, et interdit certains usages.</p>",
    blocs: [
      {
        type: "cle",
        t: "Le calcul qui sert tous les jours",
        html:
          "<b>tonnes éq. CO₂ = charge (kg) × PRP ÷ 1000</b><br>" +
          "C'est cette valeur — pas le poids de fluide — qui déclenche une partie des obligations. " +
          "Deux installations de même charge n'ont pas les mêmes contraintes si les fluides diffèrent.",
      },
      {
        type: "piege",
        t: "ODP et PRP ne se confondent pas",
        html:
          "Un HFC a un <b>ODP nul</b> (il ne détruit pas l'ozone) et pourtant un <b>PRP fort</b>. " +
          "Dire « il ne touche pas l'ozone, donc il est propre » est faux. Et un PRP bas ne veut pas dire " +
          "zéro impact : la question des <b>PFAS</b> se pose désormais sur certains fluides à bas PRP.",
      },
      {
        t: "À toi : la carte d identité du fluide",
        html:
          "<p style=\"margin:0 0 10px\">Choisis un fluide, entre une charge : les tonnes équivalent CO₂ se calculent. Compare deux fluides à charge égale — c est l exercice qui suit.</p>" +
          outil("fiche-fluide.html", "Carte d identité du fluide interactive", 415),
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Une installation contient 15 kg de R-32 (PRP = 675). Quelle est sa charge en tonnes équivalent CO₂ ?",
      choix: ["4,5 t éq. CO₂", "6,75 t éq. CO₂", "10,13 t éq. CO₂", "101,3 t éq. CO₂"],
      bonne: 2,
      explication:
        "15 × 675 ÷ 1000 = 10,13 t éq. CO₂. Le piège classique est d'oublier la division par 1000 et de confondre les kilogrammes avec les tonnes équivalent CO₂.",
      remediation_vers: "g2",
    },
    criteres: [
      { code: "2.01", libelle: "Situer la politique climat internationale et européenne", etat: "a_evaluer" },
      { code: "2.02", libelle: "Expliquer le PRP et les obligations du règlement (UE) 2024/573", etat: "a_evaluer" },
    ],
    liens: [suite("x1", "Exercice : calculer une charge"), SOMMAIRE],
    notes_pilote:
      "Faire calculer l'équivalent CO₂ d'une machine de l'atelier, plaque signalétique en main : " +
      "l'enjeu devient concret en trente secondes. Ne pas asséner les valeurs de PRP — les faire " +
      "chercher sur la fiche du fluide. Relier explicitement à G4 et G5 : si le climat se joue sur les " +
      "fuites, l'étanchéité et la récupération deviennent des gestes écologiques, pas des formalités.",
  },
  {
    id: "x1",
    type: "exercice",
    titre: "Exercice — deux installations, deux impacts",
    dc: "G2 · mise en situation",
    minuteur_s: 420,
    corps:
      "<p>Tu interviens sur deux machines dans le même bâtiment.</p>" +
      "<ul>" +
      "<li><b>Machine A</b> — chambre froide, <b>12 kg</b> de <b>R-404A</b> (PRP = 3922).</li>" +
      "<li><b>Machine B</b> — climatisation, <b>12 kg</b> de <b>R-32</b> (PRP = 675).</li>" +
      "</ul>" +
      "<p>Même charge, même bâtiment, même exploitant. Calcule la charge en tonnes équivalent CO₂ " +
      "de chacune avant de répondre.</p>",
    blocs: [
      {
        type: "cle",
        t: "Rappel de la formule",
        html: "tonnes éq. CO₂ = <b>charge (kg) × PRP ÷ 1000</b>",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "À charge égale (12 kg), quel est le rapport d'impact climatique entre la machine A (R-404A) et la machine B (R-32) ?",
      choix: [
        "Le même impact : la charge est identique",
        "La machine A pèse environ 6 fois plus lourd (47,1 contre 8,1 t éq. CO₂)",
        "La machine B pèse plus lourd, le R-32 est inflammable",
        "On ne peut pas comparer deux fluides différents",
      ],
      bonne: 1,
      explication:
        "A : 12 × 3922 ÷ 1000 = 47,1 t éq. CO₂. B : 12 × 675 ÷ 1000 = 8,1 t éq. CO₂. Soit environ 6 fois plus pour la même quantité de fluide : c'est le PRP qui fait la différence, pas le poids.",
      remediation_vers: "g2",
    },
    criteres: [
      { code: "2.02", libelle: "Calculer une charge en tonnes équivalent CO₂", etat: "a_evaluer" },
    ],
    liens: [suite("g3", "Contrôles avant mise en service"), SOMMAIRE],
    notes_pilote:
      "Exercice à faire au tableau, calculatrice en main, AVANT de donner le résultat. L'effet " +
      "pédagogique tient à la surprise du facteur 6 sur une charge identique. Enchaîner sur la question " +
      "« et si les deux fuient d'un kilo ? » — c'est le meilleur passage vers G4 (étanchéité) : " +
      "la fuite ne se paie pas au kilo, elle se paie au PRP.",
  },

  /* ==================================================================
     G3 — CONTRÔLES AVANT MISE EN SERVICE
     ================================================================== */
  {
    id: "g3",
    type: "cours",
    titre: "Contrôles avant mise en service",
    dc: "G3 · codes 3.01 → 3.05",
    minuteur_s: 360,
    corps:
      schema("epreuve-azote.svg", "Montage de l épreuve de pression : bouteille d azote, manifold, circuit — oxygène et air comprimé barrés.") +
      "<p>Deux épreuves, deux buts, souvent enchaînées. L'<b>épreuve de résistance</b> vérifie que " +
      "l'assemblage tient mécaniquement. L'<b>épreuve d'étanchéité</b> vérifie qu'il ne laisse rien " +
      "passer. Les pressions d'épreuve se prennent <b>sur la documentation constructeur</b> et la " +
      "norme applicable — jamais à l'estime.</p>" +
      "<p>Vient ensuite le <b>tirage au vide</b>. Il ne sert pas à « faire propre » : il extrait " +
      "l'<b>air</b> (incondensable, qui fait monter la haute pression) et l'<b>humidité</b> " +
      "(qui gèle au détendeur et attaque l'huile). Sous vide, l'eau bout à température ambiante — " +
      "c'est exactement ce qu'on cherche.</p>" +
      "<p>Enfin, on <b>consigne</b> : registre et rapport d'essais font partie du geste professionnel.</p>",
    blocs: [
      {
        type: "piege",
        t: "Geste interdit — sans discussion",
        html:
          "Toute mise en pression se fait à l'<b>azote</b>, et à l'azote seulement. " +
          "<b>Jamais d'oxygène</b> — au contact de l'huile du circuit, le mélange est explosif. " +
          "<b>Jamais d'air comprimé</b> — il apporte de l'humidité et contient de l'oxygène. " +
          "Ce geste ne se discute pas et ne se découvre pas : il s'impose.",
      },
      {
        type: "cle",
        t: "Le vide qui remonte",
        html:
          "Après avoir isolé la pompe, on <b>surveille</b> : si le vide remonte, il y a une fuite " +
          "ou de l'humidité résiduelle. Un tirage au vide réussi, c'est un vide qui <b>tient</b>. " +
          "Valeurs cibles et durées : selon doc constructeur, à faire valider.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Vous devez réaliser une épreuve de pression sur un circuit neuf. Quel gaz utilisez-vous ?",
      choix: [
        "De l'air comprimé, c'est le plus disponible en atelier",
        "De l'oxygène, il est déjà sur le chariot de brasage",
        "De l'azote sec",
        "Le fluide frigorigène de l'installation",
      ],
      bonne: 2,
      explication:
        "Azote sec uniquement. L'oxygène en présence d'huile peut provoquer une explosion ; l'air comprimé apporte de l'humidité et de l'oxygène ; le fluide frigorigène ne se rejette jamais à l'atmosphère.",
      remediation_vers: "g3",
    },
    criteres: [
      { code: "3.01", libelle: "Réaliser une épreuve de pression de résistance", etat: "a_evaluer" },
      { code: "3.02", libelle: "Réaliser une épreuve de pression d'étanchéité", etat: "a_evaluer" },
      { code: "3.03", libelle: "Utiliser une pompe à vide", etat: "a_evaluer" },
      { code: "3.04", libelle: "Faire le vide : évacuer l'air et l'humidité", etat: "a_evaluer" },
      { code: "3.05", libelle: "Consigner le registre et rédiger le rapport d'essais", etat: "a_evaluer" },
    ],
    liens: [suite("g4a", "Contrôles d'étanchéité"), SOMMAIRE],
    notes_pilote:
      "Pour la catégorie D, seul le code 3.03 (pompe à vide) est dans le champ : ne pas emmener un " +
      "groupe D sur l'épreuve de pression. Faire monter le montage azote sur un poste d'essai dédié, " +
      "jamais sur une installation client en première approche. L'anecdote qui marque : une bouteille " +
      "mal identifiée, de l'oxygène branché par erreur sur un circuit huilé. Faire lire un vacuomètre " +
      "en direct pendant un tirage réel, et faire chercher « pourquoi le vide remonte-t-il ? ».",
  },

  /* ==================================================================
     G4 — ÉTANCHÉITÉ (3 fiches — cœur de la catégorie E)
     ================================================================== */
  {
    id: "g4a",
    type: "cours",
    titre: "Où fuit une installation ?",
    dc: "G4 · codes 4.01 · 4.02 · 4.03",
    minuteur_s: 300,
    corps:
      schema("points-de-fuite.svg", "Six familles de points de fuite repérées sur un circuit type.") +
      "<p>Une fuite ne sort pas d'un tube plein. Elle sort d'un <b>point d'assemblage</b> ou d'une " +
      "<b>pièce en mouvement</b> : raccords mécaniques (flare, à visser), brasures poreuses ou mal " +
      "pénétrées, presse-étoupes de vannes, joints, raccords vissés des voyants, filtres et pressostats, " +
      "et tout ce qui <b>vibre</b> — compresseur, tuyauteries mal fixées.</p>" +
      "<p>Avant de sortir le moindre instrument, on <b>lit le registre</b> : quelle charge, quel fluide, " +
      "quelles fuites déjà détectées, qu'a-t-on réparé et quand. Un point déjà réparé est un point " +
      "<b>à recontrôler en priorité</b>, pas un point clos.</p>" +
      "<p>Vient ensuite le <b>contrôle visuel et manuel</b>, sans électronique : traces d'huile " +
      "(le fluide entraîne l'huile en fuyant), corrosion, givre anormal, serrage des raccords " +
      "accessibles, état des fixations.</p>",
    blocs: [
      {
        type: "cle",
        t: "L'ordre ne s'invente pas",
        html:
          "<b>Registre → visuel et manuel → méthode indirecte → méthode directe.</b><br>" +
          "Chaque étape oriente la suivante. On ne contrôle jamais à l'aveugle : le registre oriente " +
          "le contrôle avant même d'ouvrir la porte du local technique.",
      },
      {
        type: "piege",
        t: "La trace d'huile",
        html:
          "Une trace d'huile sous un raccord n'est pas une salissure : c'est la <b>signature d'une fuite</b>. " +
          "Le fluide s'échappe, l'huile miscible reste. Inversement, un bac de condensats bouché peut " +
          "<b>masquer</b> une fuite pendant des semaines.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Vous arrivez sur une installation pour un contrôle périodique d'étanchéité. Par quoi commencez-vous ?",
      choix: [
        "Par balayer tous les raccords au détecteur électronique",
        "Par consulter le registre de l'installation",
        "Par mettre le circuit sous pression d'azote",
        "Par relever les pressions au manomètre",
      ],
      bonne: 1,
      explication:
        "Le registre donne la charge, le fluide, l'historique des fuites et des réparations. Il oriente le contrôle : les points déjà réparés sont à revoir en priorité.",
      remediation_vers: "g4a",
    },
    criteres: [
      { code: "4.01", libelle: "Identifier les points de fuite potentiels d'une installation", etat: "a_evaluer" },
      { code: "4.02", libelle: "Consulter et exploiter le registre avant le contrôle", etat: "a_evaluer" },
      { code: "4.03", libelle: "Réaliser un contrôle visuel et manuel", etat: "a_evaluer" },
    ],
    liens: [suite("g4b", "Méthode indirecte"), SOMMAIRE],
    notes_pilote:
      "Pédagogie de la découverte : emmener le groupe devant une machine d'atelier et faire CHERCHER " +
      "les points de fuite avant de donner la liste. Les stagiaires en trouvent la moitié seuls, on " +
      "complète — la liste donnée d'emblée ne se retient pas. Insister sur le registre : c'est le " +
      "réflexe qui distingue le professionnel du bricoleur, et c'est évalué.",
  },
  {
    id: "g4b",
    type: "cours",
    titre: "Méthode indirecte — mesurer et interpréter",
    dc: "G4 · codes 4.04 · 4.05",
    minuteur_s: 360,
    corps:
      schema("lecture-table.svg", "La lecture croisée : manomètre + 1 bar, table de saturation du fluide, sonde de contact.") +
      "<p>La méthode indirecte <b>ne détecte pas la fuite</b> : elle détecte un <b>fonctionnement " +
      "anormal</b> qui la trahit. On relève les <b>pressions</b> (BP et HP) au manomètre et les " +
      "<b>températures</b> au thermomètre de contact, puis on compare à la <b>table de saturation</b> " +
      "du fluide présent.</p>" +
      "<p>Une pression plus basse que la valeur théorique attendue, une <b>surchauffe</b> qui grimpe " +
      "au-delà des 5 à 10 K habituels, un <b>sous-refroidissement</b> qui s'effondre sous les 4 à 8 K : " +
      "autant d'indices convergents d'un manque de charge. Le multimètre complète le tableau " +
      "(intensité absorbée, cohérence électrique).</p>",
    blocs: [
      {
        type: "cle",
        t: "Trois instruments, trois informations",
        html:
          "<b>Manomètre</b> (BP/HP) → écart avec la table de saturation.<br>" +
          "<b>Thermomètre de contact</b> → surchauffe et sous-refroidissement.<br>" +
          "<b>Multimètre</b> → cohérence électrique du compresseur.<br>" +
          "Un seul indice ne conclut rien ; c'est leur <b>convergence</b> qui oriente.",
      },
      {
        type: "piege",
        t: "Relatif ou absolu ?",
        html:
          "Toujours le même piège : ne pas confondre pression <b>relative</b> (lue au manomètre) et " +
          "pression <b>absolue</b> (souvent utilisée dans les tables). Écart : environ 1 bar. " +
          "Et un fluide n'a jamais la table d'un autre.",
      },
      {
        t: "À toi : refais la lecture croisée",
        html:
          "<p style=\"margin:0 0 10px\">Reprends la réglette : pression relative, conversion en absolu, température de saturation, écart avec la mesure. Hors plage → on soupçonne.</p>" +
          outil("reglette.html", "Réglette pression-température interactive", 445),
      },
    ],
    question: {
      type: "qcm",
      enonce: "En quoi consiste la méthode indirecte de contrôle d'étanchéité ?",
      choix: [
        "Utiliser un détecteur électronique le long des raccords",
        "Suivre les paramètres de fonctionnement (pressions, températures, surchauffe)",
        "Mettre le circuit sous pression d'azote",
        "Injecter un traceur UV dans le circuit",
      ],
      bonne: 1,
      explication:
        "La méthode indirecte analyse le fonctionnement : pressions, températures, surchauffe et sous-refroidissement comparés aux valeurs attendues. Elle ne localise pas la fuite, elle la soupçonne.",
      remediation_vers: "g4b",
    },
    criteres: [
      { code: "4.04", libelle: "Mettre en œuvre la méthode indirecte (mesures et tables)", etat: "a_evaluer" },
      { code: "4.05", libelle: "Utiliser les instruments portables et interpréter les mesures", etat: "a_evaluer" },
    ],
    ressources: ["r-mollier", "r-tp-mano"],
    liens: [suite("g4c", "Méthode directe et registre"), SOMMAIRE],
    notes_pilote:
      "Le cœur du parcours E, et le module qui prend le plus de temps d'atelier. Faire manipuler " +
      "manomètre + thermomètre EN BINÔME sur une machine, puis confronter les relevés à une vraie table " +
      "de saturation. Tant que le stagiaire ne sait pas dire « la table annonce X, je mesure Y, donc… », " +
      "la compétence n'est pas acquise. Ne pas accepter un relevé recopié : faire refaire la mesure.",
  },
  {
    id: "g4c",
    type: "cours",
    titre: "Méthode directe et consignation",
    dc: "G4 · codes 4.06 · 4.07 · 4.08 · 4.09",
    minuteur_s: 330,
    corps:
      schema("balayage-detecteur.svg", "La sonde du détecteur longe le raccord lentement ; une alerte se confirme par un second passage.") +
      "<p>La méthode directe <b>localise physiquement</b> la fuite. Pour la catégorie E, elle se " +
      "pratique <b>sans accéder au circuit</b> : c'est le code <b>4.07</b>. Le code 4.06, qui suppose " +
      "d'intervenir dans le circuit, n'est pas dans le champ de la catégorie E.</p>" +
      "<p>En <b>A1</b> et <b>A2</b>, le code <b>4.06</b> s'ajoute : ce sont les méthodes directes qui " +
      "supposent au contraire d'<b>intervenir dans le circuit</b>. On met alors le circuit en pression " +
      "à l'<b>azote</b> pour faire apparaître la fuite à l'eau savonneuse, ou l'on introduit un " +
      "<b>gaz traceur</b> ou un <b>traceur fluorescent</b>. Toutes ces méthodes sont celles du " +
      "règlement <b>(CE) n° 1516/2007</b> : le choix dépend de l'installation, jamais de l'habitude.</p>" +
      "<p>Le <b>détecteur électronique</b> réagit à la présence de molécules de fluide dans l'air : " +
      "on balaie la sonde <b>lentement</b>, le long des points repérés à l'étape visuelle. " +
      "L'<b>eau savonneuse</b> localise par les bulles ; le <b>traceur UV</b> révèle les fuites " +
      "intermittentes ou d'accès difficile. Sensibilité et étalonnage : selon doc constructeur, " +
      "à faire valider.</p>" +
      "<p>Un contrôle non consigné n'a <b>aucune valeur réglementaire</b>. On note : date, méthode, " +
      "points contrôlés, résultat, et en cas de fuite la localisation précise et la suite donnée.</p>",
    blocs: [
      {
        type: "cle",
        t: "Une alerte se confirme",
        html:
          "Le détecteur qui siffle ne conclut rien tout seul. On <b>repasse</b>, ventilateurs à l'arrêt " +
          "si possible — l'air brassé disperse le nuage de fluide et fait sonner l'appareil à côté de " +
          "la vraie fuite. Deux passages concordants, sinon on ne conclut pas.",
      },
      {
        type: "piege",
        t: "L'instrument aussi se contrôle",
        html:
          "Un détecteur non étalonné donne une conformité qui ne vaut rien. Étalonnage périodique selon " +
          "la réglementation applicable, et <b>vérification au gaz de référence avant utilisation</b>. " +
          "Le registre doit pouvoir dire avec quel appareil le contrôle a été fait.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Votre détecteur électronique sonne au niveau d'un raccord, le ventilateur du condenseur tournant à plein régime. Que faites-vous ?",
      choix: [
        "Vous concluez à une fuite et vous la consignez",
        "Vous confirmez par un second passage, ventilateur à l'arrêt si possible",
        "Vous changez le raccord immédiatement",
        "Vous ignorez l'alerte, l'air fausse toujours la mesure",
      ],
      bonne: 1,
      explication:
        "Une alerte se confirme avant d'être conclue. L'air brassé disperse le fluide et peut faire sonner l'appareil loin de la fuite réelle : on repasse dans des conditions plus calmes.",
      remediation_vers: "g4c",
    },
    criteres: [
      { code: "4.06", libelle: "Mettre en œuvre une méthode directe en intervenant dans le circuit", etat: "a_evaluer" },
      { code: "4.07", libelle: "Mettre en œuvre la méthode directe sans intervenir dans le circuit", etat: "a_evaluer" },
      { code: "4.08", libelle: "Utiliser un détecteur électronique de fuites", etat: "a_evaluer" },
      { code: "4.09", libelle: "Consigner le contrôle dans le registre", etat: "a_evaluer" },
    ],
    ressources: ["r-cerfa"],
    liens: [suite("x4", "Détective : le contrôle qui tourne mal"), SOMMAIRE],
    notes_pilote:
      "Insister sur la frontière 4.06 / 4.07 avec un groupe E : elle définit le métier. « Je contrôle, " +
      "je n'ouvre pas. » Faire manipuler le détecteur sur une fuite calibrée d'atelier et faire " +
      "constater qu'un balayage trop rapide passe à côté. Terminer par le remplissage d'un registre " +
      "réel — un contrôle non consigné n'existe pas.",
  },

  /* ==================================================================
     G5 — RÉCUPÉRATION (2 fiches — cœur de la catégorie D)
     ================================================================== */
  {
    id: "x4",
    type: "exercice",
    titre: "Détective — le contrôle qui tourne mal",
    dc: "G4 · mise en situation · parcours E",
    minuteur_s: 420,
    corps:
      "<p>Contrôle périodique d'étanchéité chez un client. Le <b>registre</b> t'apprend qu'une fuite " +
      "a été réparée il y a trois mois sur un raccord flare de la ligne liquide.</p>" +
      "<ul>" +
      "<li>Le contrôle visuel ne montre <b>rien</b> sur le raccord réparé.</li>" +
      "<li>Ton détecteur électronique <b>sonne</b> en passant près du condenseur — ventilateur en marche.</li>" +
      "<li>Sur la machine, la plaque indique un fluide différent de celui noté au registre l'an dernier.</li>" +
      "</ul>",
    blocs: [
      {
        type: "piege",
        t: "Trois indices, trois réflexes",
        html:
          "Un point réparé se <b>recontrôle en priorité</b>, même s'il semble propre. Une alerte détecteur " +
          "près d'un ventilateur en marche <b>se confirme</b> brassage arrêté. Et une incohérence " +
          "plaque/registre se <b>signale</b> — elle change la table de saturation à utiliser.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Le détecteur a sonné près du condenseur, ventilateur en marche. Quelle est la suite correcte ?",
      choix: [
        "Consigner « fuite au condenseur » dans le registre",
        "Arrêter le ventilateur, refaire un passage lent, et recontrôler aussi le raccord réparé",
        "Resserrer tous les raccords du condenseur par précaution",
        "Ignorer l'alerte : l'air brassé fausse toujours le détecteur",
      ],
      bonne: 1,
      explication:
        "L'air brassé disperse le nuage de fluide : l'appareil peut sonner loin de la fuite réelle. On confirme ventilateur à l'arrêt, et le registre a déjà désigné le suspect n° 1 : le point réparé.",
      remediation_vers: "g4c",
    },
    criteres: [
      { code: "4.02", libelle: "Exploiter le registre pour orienter le contrôle", etat: "a_evaluer" },
      { code: "4.08", libelle: "Utiliser le détecteur dans de bonnes conditions", etat: "a_evaluer" },
    ],
    liens: [suite("g5a", "Récupérer sans émettre"), { vers: "g4a", libelle: "↩ Revoir : où fuit une installation ?", sec: true }, SOMMAIRE],
    notes_pilote:
      "Exercice taillé pour le parcours E : tout se joue SANS ouvrir le circuit. Laisser débattre sur " +
      "la proposition « resserrer tous les raccords » — elle paraît professionnelle mais c'est une " +
      "intervention non justifiée, et sur un parcours E on ne touche pas au circuit. L'incohérence " +
      "plaque/registre est le détail que presque personne ne relève : celui qui le voit a le réflexe métier.",
  },
  {
    id: "g5a",
    type: "cours",
    titre: "Récupérer sans émettre",
    dc: "G5 · codes 5.01 → 5.04",
    minuteur_s: 360,
    corps:
      schema("recuperation.svg", "Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance.") +
      "<p>Chaque connexion et chaque déconnexion est un <b>point de fuite</b> : le geste est lent, " +
      "contrôlé, flexibles purgés. Avant de récupérer, on <b>arrête et on isole</b> le système.</p>" +
      "<p>Le <b>groupe de récupération</b> transfère le fluide vers un cylindre prévu pour, en phase " +
      "gazeuse ou liquide selon la situation. Le cylindre respecte un <b>taux de remplissage maximal</b> " +
      "— jamais rempli à ras : le liquide se dilate avec la température, et un cylindre plein est un " +
      "danger. On <b>pèse avant</b>, sinon on ne saura jamais combien on a réellement récupéré.</p>" +
      "<p>L'<b>huile</b> du compresseur est contaminée par nature : elle se récupère à part, comme " +
      "un déchet dangereux. Elle ne se dégaze pas, elle ne se mélange pas au fluide.</p>",
    blocs: [
      {
        type: "cle",
        t: "Récupéré, recyclé, régénéré",
        html:
          "<b>Récupéré</b> : sorti de la machine — c'est un déchet tant qu'il n'a pas été traité.<br>" +
          "<b>Recyclé</b> : nettoyé sommairement — réemploi limité, typiquement sur la même installation " +
          "ou le même exploitant.<br>" +
          "<b>Régénéré</b> : ramené aux spécifications d'un fluide neuf par une filière agréée — " +
          "réutilisable comme du neuf.",
      },
      {
        type: "piege",
        t: "Ne jamais mélanger",
        html:
          "Deux fluides différents dans le même cylindre, et le contenu devient <b>impossible à " +
          "recycler ou à régénérer</b> : il part en destruction, aux frais de l'entreprise. " +
          "Un cylindre, un fluide, une étiquette.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Pourquoi ne remplit-on jamais un cylindre de récupération à ras bord ?",
      choix: [
        "Pour qu'il reste transportable à la main",
        "Parce que le liquide se dilate avec la température : un taux de remplissage maximal doit être respecté",
        "Pour laisser de la place au fluide suivant",
        "Parce que la balance ne mesure pas au-delà",
      ],
      bonne: 1,
      explication:
        "Le fluide liquide se dilate quand la température monte. Un cylindre trop rempli n'a plus de volume d'expansion : le taux de remplissage maximal n'est pas une précaution, c'est une règle de sécurité.",
      remediation_vers: "g5a",
    },
    criteres: [
      { code: "5.01", libelle: "Connecter et déconnecter avec un minimum d'émissions", etat: "a_evaluer" },
      { code: "5.02", libelle: "Vider et remplir un cylindre, en phase liquide et gazeuse", etat: "a_evaluer" },
      { code: "5.03", libelle: "Utiliser un dispositif de récupération", etat: "a_evaluer" },
      { code: "5.04", libelle: "Vidanger l'huile contaminée", etat: "a_evaluer" },
    ],
    ressources: ["r-tp-peser"],
    liens: [suite("g5b", "Peser, stocker, tracer"), SOMMAIRE],
    notes_pilote:
      "Cœur du parcours D : chaque stagiaire branche, purge et pèse lui-même, sans exception. " +
      "L'anecdote qui marque mieux qu'un discours : un cylindre trop rempli laissé au soleil. " +
      "Relier systématiquement à G2 — un geste de récupération soigné est un geste écologique, pas " +
      "une contrainte administrative. Faire chercher sur le log p-h si le fluide observé est " +
      "sous-refroidi, saturé ou surchauffé avant de donner la réponse.",
  },
  {
    id: "g5b",
    type: "cours",
    titre: "Peser, charger, stocker, tracer",
    dc: "G5 · codes 5.05 → 5.09",
    minuteur_s: 330,
    corps:
      schema("recuperation.svg", "Rappel du montage : la bouteille se pèse avant, ne se remplit jamais à ras, ne mélange jamais deux fluides.") +
      "<p>Pour charger, on détermine d'abord l'<b>état du fluide</b> et la <b>quantité prévue</b> " +
      "(plaque signalétique, doc constructeur). La charge se contrôle à la <b>balance</b>, jamais " +
      "« au manomètre » : le manomètre dit comment la machine se comporte, la balance dit combien " +
      "on a mis.</p>" +
      "<p>Cas particulier des <b>mélanges zéotropes</b> : ils se chargent en <b>phase liquide</b>, " +
      "faute de quoi les composants se séparent et la composition du circuit dérive.</p>" +
      "<p>L'<b>huile</b> suit le fluide, et elle en dépend. Les anciens fluides chlorés travaillaient " +
      "avec de l'huile <b>minérale</b> ; les HFC et les HFO demandent une huile de synthèse, le plus " +
      "souvent <b>polyolester (POE)</b>. Les deux ne se mélangent pas : sur un changement de fluide, " +
      "l'huile se change aussi — c'est ce qui distingue un <b>retrofit</b> d'un simple drop-in. " +
      "La POE <b>absorbe l'humidité de l'air</b> très vite : bidon refermé aussitôt, circuit jamais " +
      "laissé ouvert. Le type exact d'huile se lit sur la <b>plaque ou la doc constructeur</b>, " +
      "jamais au jugé.</p>" +
      "<p>Une huile retirée d'un circuit est <b>contaminée</b> : elle contient du fluide dissous. " +
      "Elle ne se jette pas, elle part en <b>déchet dangereux</b> vers une filière agréée, avec son " +
      "bordereau. Pour les <b>hydrocarbures</b>, fluide et huile sont en plus <b>inflammables</b> : " +
      "récipients adaptés et fermés, à l'écart de toute source de chaleur ou d'étincelle, transport " +
      "selon la réglementation applicable et la fiche de données de sécurité.</p>" +
      "<p>Le <b>registre</b> est la preuve légale de toute opération sur le fluide : quantité ajoutée, " +
      "quantité récupérée, date, intervenant. Le rejet volontaire à l'atmosphère est strictement " +
      "interdit et sanctionné.</p>",
    blocs: [
      {
        type: "cle",
        t: "La balance prime",
        html:
          "On pèse <b>avant</b> et <b>après</b>. Sans pesée initiale, la quantité récupérée ou ajoutée " +
          "n'est qu'une estimation — et une estimation ne se consigne pas dans un registre.",
      },
      {
        type: "piege",
        t: "Stockage et transport",
        html:
          "Cylindres arrimés, debout, étiquetés, à l'abri de la chaleur ; les fluides <b>inflammables</b> " +
          "(hydrocarbures, A2L) obéissent en plus aux règles de leur classe. Conditions détaillées : " +
          "selon la réglementation applicable et la fiche de données de sécurité, à faire valider.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Avec quoi contrôle-t-on la quantité de fluide chargée dans une installation ?",
      choix: ["Un manomètre", "Une balance de précision", "Un thermomètre", "Un vacuomètre"],
      bonne: 1,
      explication:
        "La charge se mesure au poids, avec une balance. Les pressions renseignent sur le fonctionnement, pas sur la quantité de fluide présente dans le circuit.",
      remediation_vers: "g5b",
    },
    criteres: [
      { code: "5.05", libelle: "Déterminer l'état du fluide et charger sans perte", etat: "a_evaluer" },
      { code: "5.06", libelle: "Choisir la balance adaptée et peser", etat: "a_evaluer" },
      { code: "5.07", libelle: "Consigner l'opération dans le registre", etat: "a_evaluer" },
      { code: "5.08", libelle: "Appliquer les prescriptions de gestion, stockage et transport", etat: "a_evaluer" },
      { code: "5.09", libelle: "Gérer les hydrocarbures et leurs huiles, y compris contaminés", etat: "a_evaluer" },
    ],
    ressources: ["r-tp-peser", "r-cerfa"],
    liens: [suite("x3", "Détective : la bouteille de récupération"), SOMMAIRE],
    notes_pilote:
      "Le geste à faire répéter : peser AVANT. Beaucoup de stagiaires pèsent après et déduisent — " +
      "c'est faux dès qu'il reste du fluide dans le cylindre. Sur un groupe A2, insister sur la " +
      "précision : sur une charge de 800 g, 50 g d'écart changent le comportement de la machine. " +
      "Faire remplir un registre à chaque manipulation d'atelier, même en exercice.",
  },

  /* ==================================================================
     G6 → G9 — LES COMPOSANTS (tirés au sort à l'épreuve)
     ================================================================== */
  {
    id: "x3",
    type: "exercice",
    titre: "Détective — la bouteille de récupération",
    dc: "G5 · mise en situation · parcours D",
    minuteur_s: 420,
    corps:
      "<p>Récupération sur une chambre froide avant remplacement d'un composant. Tu as pesé la " +
      "bouteille <b>avant</b> de commencer — bon réflexe. La récupération avance, et la balance " +
      "approche du <b>niveau maximal admissible</b> de la bouteille… mais il reste visiblement du " +
      "fluide dans le circuit.</p>" +
      "<p>Sur l'étagère du fourgon : une bouteille de récupération <b>vide</b>, et une bouteille " +
      "<b>entamée</b> qui contient déjà un autre fluide.</p>",
    blocs: [
      {
        type: "cle",
        t: "Ce qui ne se négocie pas",
        html:
          "Le taux de remplissage maximal protège contre la <b>dilatation du liquide</b> : dépassé, " +
          "la bouteille devient dangereuse à la première montée en température. Et un mélange de " +
          "fluides est <b>impossible à recycler ou régénérer</b> : il part en destruction.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "La bouteille atteint son niveau maximal et il reste du fluide à récupérer. Que fais-tu ?",
      choix: [
        "Je complète un peu au-delà du niveau : quelques centaines de grammes ne changent rien",
        "Je bascule sur la bouteille vide, et je pèse celle-ci avant de continuer",
        "Je termine dans la bouteille entamée de l'autre fluide, elle a de la place",
        "J'arrête là : le fluide restant peut rester dans le circuit ouvert",
      ],
      bonne: 1,
      explication:
        "On change de bouteille, on pèse la nouvelle avant, et on continue. Dépasser le niveau est un risque mécanique réel ; mélanger deux fluides condamne le lot ; laisser du fluide dans un circuit qu'on va ouvrir finit à l'atmosphère.",
      remediation_vers: "g5a",
    },
    criteres: [
      { code: "5.02", libelle: "Gérer le remplissage des cylindres en sécurité", etat: "a_evaluer" },
      { code: "5.06", libelle: "Peser à chaque étape", etat: "a_evaluer" },
    ],
    liens: [suite("g6", "Le compresseur"), { vers: "g5a", libelle: "↩ Revoir : récupérer sans émettre", sec: true }, SOMMAIRE],
    notes_pilote:
      "Cœur de cible du parcours D. La proposition « quelques centaines de grammes » fait toujours " +
      "débat — c'est voulu : elle ressemble au bon sens de chantier. Rappeler l'anecdote de la " +
      "bouteille au soleil. En atelier, faire refaire la double pesée : bouteille pleine fermée, " +
      "étiquetée, consignée au registre ; nouvelle bouteille pesée AVANT le premier gramme.",
  },
  {
    id: "g6",
    type: "cours",
    titre: "Le compresseur",
    dc: "G6 · codes 6.01 · 6.03 · 6.05 · 6.07",
    minuteur_s: 300,
    corps:
      schema("compresseurs.svg", "Coupe animée d un compresseur à piston et les quatre technologies : piston, scroll, vis, rotatif.") +
      "<p>Le compresseur est le <b>seul organe actif</b> du cycle : il aspire la vapeur basse pression " +
      "et la refoule en haute pression. Tout le reste est passif.</p>" +
      "<p>Ses points de fuite privilégiés : <b>raccords, vannes de service, presse-étoupe, bornes " +
      "de traversée</b> sur les hermétiques. Ses sécurités — pressostats HP et BP, protection " +
      "thermique — se règlent <b>selon la fiche constructeur</b>, jamais à l'estime.</p>" +
      "<p>L'<b>huile</b> lubrifie, refroidit et assure l'étanchéité interne. Elle circule avec le " +
      "fluide et doit <b>revenir</b> : un retour d'huile défaillant est une cause fréquente de panne " +
      "prématurée, et souvent le premier signe visible d'un problème de conception des lignes.</p>",
    blocs: [
      {
        type: "cle",
        t: "Ce que dit une température de refoulement",
        html:
          "Un refoulement anormalement chaud oriente vers un <b>manque de fluide</b>, une " +
          "<b>surchauffe excessive</b> ou un <b>mauvais retour d'huile</b>. Trois causes, un seul " +
          "symptôme : on croise avec les autres relevés avant de conclure.",
      },
      {
        type: "piege",
        t: "Geste interdit",
        html:
          "<b>Consignation électrique</b> avant toute intervention sur les sécurités ou les raccords " +
          "du compresseur. Et un compresseur à l'arrêt peut rester <b>sous pression</b> longtemps : " +
          "on ne le dépose jamais sans avoir vérifié.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "À quoi sert le réchauffeur de carter d'un compresseur ?",
      choix: [
        "À augmenter la puissance frigorifique",
        "À éviter la migration du fluide dans l'huile pendant les arrêts",
        "À chauffer le local technique",
        "À faire fondre le givre de l'évaporateur",
      ],
      bonne: 1,
      explication:
        "À l'arrêt, le fluide migre vers le point froid et se dissout dans l'huile du carter. Au démarrage, l'huile diluée ne lubrifie plus : le réchauffeur maintient le carter assez chaud pour éviter cette migration.",
      remediation_vers: "g6",
    },
    criteres: [
      { code: "6.01", libelle: "Expliquer le principe du compresseur et ses risques de fuite", etat: "a_evaluer" },
      { code: "6.03", libelle: "Régler les interrupteurs de sécurité et de contrôle", etat: "a_evaluer" },
      { code: "6.05", libelle: "Vérifier le retour d'huile", etat: "a_evaluer" },
      { code: "6.07", libelle: "Rédiger un rapport d'état", etat: "a_evaluer" },
    ],
    ressources: ["r-module-comp", "r-scroll", "r-kp1"],
    liens: [suite("g6b", "Compresseur — installer, régler, vérifier"), SOMMAIRE],
    notes_pilote:
      "Rappeler que le composant est TIRÉ AU SORT à l'épreuve : les quatre modules se travaillent. " +
      "Faire repérer les organes de sécurité sur un compresseur d'atelier, coffret ouvert et CONSIGNÉ. " +
      "Pédagogie de la découverte : faire mesurer une surchauffe anormalement élevée sans donner la " +
      "cause, laisser remonter vers l'hypothèse retour d'huile ou clapet usé.",
  },
  {
    id: "g6b",
    type: "cours",
    titre: "Compresseur — installer, régler, vérifier",
    dc: "G6 · codes 6.02 · 6.04 · 6.06 · 6.08",
    minuteur_s: 330,
    corps:
      schema("compresseurs.svg", "Compresseur en coupe : soupape d'aspiration, cylindre, sortie vers le refoulement.") +
      "<p>Ce cours prolonge la fiche sur le compresseur. Il explique le geste : comment on " +
      "l'<b>installe</b>, comment on <b>règle</b> ses soupapes, comment on le <b>démarre</b>, " +
      "l'<b>arrête</b> et le <b>contrôle</b>.</p>" +
      "<p>Une fois en marche, l'installation ne doit provoquer <b>aucune fuite</b>. Avant la toute " +
      "première mise en service, on teste l'étanchéité de tout le circuit à l'<b>azote</b> — jamais " +
      "à l'oxygène, jamais à l'air comprimé — à la pression indiquée par la norme applicable. Les " +
      "appareils de contrôle et de sécurité (ils surveillent le compresseur et le coupent en cas " +
      "d'anomalie) s'installent <b>en même temps</b> que lui, pas après coup.</p>" +
      "<p>La <b>soupape d'aspiration</b> est le clapet qui laisse entrer la vapeur basse pression " +
      "dans le compresseur à chaque cycle. Son réglage suit <b>toujours</b> la fiche constructeur : " +
      "une soupape mal réglée fait perdre de la puissance, ou abîme le compresseur.</p>" +
      "<p>Au <b>démarrage</b>, on vérifie le niveau d'huile et les vannes, puis on met sous tension. " +
      "Pendant que le compresseur tourne, on relève les pressions, la <b>surchauffe</b> (repère : " +
      "5 à 10 K) et le <b>sous-refroidissement</b> (repère : 4 à 8 K). À l'<b>arrêt</b>, on suit la " +
      "procédure inverse, sans geste brusque.</p>" +
      "<p>Ces bons gestes sont aussi des gestes d'<b>efficacité énergétique</b> : un compresseur " +
      "bien installé, bien réglé et bien entretenu consomme moins et dure plus longtemps.</p>",
    blocs: [
      { type: "cle", t: "Le test qui doit précéder la mise en service",
        html: "Avant de mettre un compresseur neuf sous tension, on vérifie que le circuit ne fuit " +
          "pas, avec un essai à l'<b>azote</b>. Ce n'est qu'après ce contrôle que l'installation " +
          "répond au code 6.02 : « aucune fuite ni aucune émission »." },
      { type: "piege", t: "Geste interdit",
        html: "<b>Consignation électrique</b> (couper et verrouiller l'alimentation) avant toute " +
          "intervention sur les soupapes ou les sécurités. Un réglage de soupape ne s'improvise " +
          "jamais : toujours <b>selon la fiche constructeur</b>, jamais « à l'oreille »." },
    ],
    question: {
      type: "qcm",
      enonce: "Un compresseur vient d'être installé. Avant sa toute première mise en marche, que fait-on ?",
      choix: [
        "On le met sous tension : les défauts se verront bien à l'usage",
        "On teste l'étanchéité de tout le circuit à l'azote",
        "On règle les soupapes d'aspiration au jugé, puis on ajuste en marche",
        "On vérifie seulement le sens de rotation du moteur",
      ],
      bonne: 1,
      explication:
        "Une installation correcte (code 6.02) ne doit provoquer aucune fuite une fois en marche. Le seul moyen de le vérifier avant la mise en service est un essai d'étanchéité à l'azote sur tout le circuit — jamais à l'oxygène, jamais à l'air comprimé.",
      remediation_vers: "g6b",
    },
    criteres: [
      { code: "6.02", libelle: "Installer un compresseur et ses sécurités sans provoquer de fuite", etat: "a_evaluer" },
      { code: "6.04", libelle: "Régler les soupapes d'aspiration selon la fiche constructeur", etat: "a_evaluer" },
      { code: "6.06", libelle: "Démarrer, arrêter et contrôler un compresseur par la mesure", etat: "a_evaluer" },
      { code: "6.08", libelle: "Connaître les leviers d'efficacité énergétique du compresseur", etat: "a_evaluer" },
    ],
    liens: [suite("g7", "Le condenseur"), SOMMAIRE],
    notes_pilote:
      "Carte complémentaire de g6 : ici, le geste plutôt que la théorie. Faire manipuler une vraie " +
      "fiche constructeur pour montrer que le réglage des soupapes (6.04) ne s'invente jamais — " +
      "c'est le réflexe à ancrer, plus utile qu'un chiffre mémorisé. Sur un compresseur d'atelier " +
      "CONSIGNÉ, faire dérouler la procédure complète : contrôle avant mise en marche, relevés en " +
      "fonctionnement, arrêt propre. Le réglage des soupapes (6.04) n'est évalué en pratique qu'en " +
      "catégorie A1 — les stagiaires visant seulement A2 peuvent s'en tenir aux principes. Le code " +
      "6.08 est nouveau et seulement théorique : un temps d'échange suffit (propreté des " +
      "échangeurs, charge correcte, surchauffe bien réglée) plutôt qu'une démonstration. Relier à " +
      "g7 pour la suite du parcours.",
  },
  {
    id: "g7",
    type: "cours",
    titre: "Le condenseur",
    dc: "G7 · codes 7.01 · 7.04 · 7.06 · 7.08",
    minuteur_s: 300,
    corps:
      schema("echangeur-air.svg", "Le condenseur à air : l air ambiant traverse la batterie poussé par le ventilateur et ressort réchauffé.") +
      "<p>Le condenseur <b>évacue vers l'extérieur</b> la chaleur prise dans l'évaporateur, plus celle " +
      "apportée par la compression. La vapeur haute pression s'y refroidit, se liquéfie, puis se " +
      "<b>sous-refroidit</b> : <b>4 à 8 K</b> en sortie, pour garantir du liquide pur au détendeur.</p>" +
      "<p>Sur un condenseur à air, les <b>ventilateurs</b> forcent l'air à travers la batterie. " +
      "Une batterie encrassée, un ventilateur à l'arrêt, et la haute pression monte : la machine " +
      "consomme plus, et le pressostat HP finit par couper.</p>" +
      "<p>Les <b>incondensables</b> (air entré lors d'une intervention mal faite) se purgent " +
      "<b>à l'arrêt</b>, installation froide, avec récupération — jamais fluide en mouvement.</p>",
    blocs: [
      {
        type: "cle",
        t: "Deux pressostats, deux fonctions",
        html:
          "Le pressostat de <b>sécurité</b> coupe le compresseur pour protéger l'installation. " +
          "Le pressostat de <b>régulation</b> pilote le ventilateur pour tenir la pression de " +
          "condensation. Deux rôles, deux réglages — et les valeurs se prennent sur la doc constructeur.",
      },
      {
        type: "piege",
        t: "Propreté = énergie",
        html:
          "Une batterie sale n'est pas un problème esthétique : c'est une haute pression plus élevée, " +
          "un compresseur qui force et une facture qui monte. L'inspection visuelle de la surface " +
          "fait partie du contrôle, pas de l'entretien optionnel.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Le pressostat haute pression déclenche et arrête le compresseur. Quelle cause cherchez-vous en premier ?",
      choix: [
        "Un manque de fluide frigorigène",
        "Un condenseur encrassé, un ventilateur arrêté, ou un excès de charge",
        "Un évaporateur givré",
        "Un manque d'huile",
      ],
      bonne: 1,
      explication:
        "La haute pression monte quand la chaleur n'est plus évacuée : batterie encrassée, ventilateur en panne, débit d'air empêché — ou charge excessive. Un manque de fluide ferait l'inverse.",
      remediation_vers: "g7",
    },
    criteres: [
      { code: "7.01", libelle: "Expliquer le principe du condenseur et ses risques de fuite", etat: "a_evaluer" },
      { code: "7.04", libelle: "Régler les interrupteurs de sécurité et de contrôle", etat: "a_evaluer" },
      { code: "7.06", libelle: "Purger les incondensables", etat: "a_evaluer" },
      { code: "7.08", libelle: "Inspecter la surface d'échange", etat: "a_evaluer" },
    ],
    ressources: ["r-kp5", "r-echangeurs"],
    liens: [suite("g7b", "Condenseur — installer, régler, vérifier"), SOMMAIRE],
    notes_pilote:
      "Faire mesurer HP, BP et sous-refroidissement AVANT de donner la plage attendue, puis confronter " +
      "au repère 4-8 K. La purge des incondensables se fait sur poste dédié, avec récupération, sous " +
      "consigne stricte. Rappeler à chaque séance : jamais d'oxygène ni d'air comprimé pour un contrôle " +
      "d'étanchéité — en présence d'huile, c'est un risque d'explosion.",
  },
  {
    id: "g7b",
    type: "cours",
    titre: "Condenseur — installer, régler, vérifier",
    dc: "G7 · codes 7.02 · 7.03 · 7.05 · 7.07 · 7.09 · 7.10",
    minuteur_s: 420,
    corps:
      schema("echangeur-air.svg", "Schéma d'un condenseur à air, unité extérieure.") +
      "<p>Le <b>condenseur</b> transforme le gaz chaud venu du compresseur en <b>liquide</b>. " +
      "Il rejette la chaleur du local vers l'air extérieur. Sur un climatiseur split, il se trouve " +
      "dans l'<b>unité extérieure</b>, la partie posée dehors.</p>" +
      "<p>Sur la croix du frigoriste, le condenseur est toujours en <b>haut</b> : le compresseur à droite, " +
      "le détendeur à gauche, l'évaporateur en bas.</p>" +
      "<p>C'est un condenseur <b>à air</b> : un ventilateur souffle sur des <b>ailettes</b>, de petites lames " +
      "en métal qui évacuent la chaleur. Il n'y a jamais de tour de refroidissement sur ce type d'appareil.</p>" +
      "<p>Installer, régler et vérifier un condenseur, c'est protéger tout le circuit contre les <b>fuites</b>, " +
      "dès le premier jour et pendant toute sa vie.</p>",
    blocs: [
      { type: "cle", t: "Bien installer l'unité extérieure",
        html: "L'unité extérieure se fixe <b>solidement et de niveau</b>, avec de l'espace autour pour que l'air circule. Le matériel de réglage et de sécurité — pressostats, vannes — doit être en place et accessible. Avant la mise en service, on contrôle l'étanchéité du circuit sous <b>azote</b> (un gaz neutre) — jamais à l'oxygène, jamais à l'air comprimé. Tous les raccords sont vérifiés : zéro fuite dès le démarrage." },
      { type: "cle", t: "Régler le régulateur de pression",
        html: "Le régulateur de pression de sortie du condenseur maintient une pression de condensation correcte, même par temps froid. Il se règle <b>selon la fiche constructeur</b>, jamais à l'estime." },
      { type: "piege", t: "Avant de toucher aux conduites",
        html: "La conduite de <b>refoulement</b> (le tube de gaz chaud entre le compresseur et le condenseur) et la conduite de <b>liquide</b> (juste après le condenseur) s'inspectent après une <b>consignation électrique</b> systématique : couper puis verrouiller l'alimentation. On cherche des traces d'huile, de la corrosion, un isolant abîmé." },
      { type: "cle", t: "Démarrer, mesurer, arrêter",
        html: "Au démarrage, le ventilateur tourne et la pression monte normalement. En fonctionnement, on mesure le <b>sous-refroidissement</b> (entre 4 et 8 K) : hors de cette plage, il signale un défaut de charge. À l'arrêt, on respecte <b>l'ordre donné par la fiche constructeur</b>." },
      { type: "cle", t: "Rédiger le rapport d'état",
        html: "Chaque visite se termine par un <b>rapport écrit</b> : ailettes encrassées, ventilateur bruyant, trace d'huile, pression anormale. Un problème noté tôt évite une fuite demain." },
      { type: "cle", t: "Entretenir pour économiser l'énergie",
        html: "Des <b>ailettes propres</b> et un ventilateur en bon état font consommer moins d'électricité. Un condenseur encrassé fait travailler le compresseur plus fort pour le même résultat." },
    ],
    question: {
      type: "qcm",
      enonce: "Avant d'inspecter les conduites de refoulement et de liquide d'un condenseur, que doit-on faire en premier ?",
      choix: ["Ouvrir le circuit à l'air comprimé", "Faire une consignation électrique", "Démonter le ventilateur", "Régler le régulateur de pression"],
      bonne: 1,
      explication: "On coupe puis on verrouille l'alimentation électrique avant de toucher aux conduites. Cela évite qu'un ventilateur ou un compresseur redémarre pendant l'inspection.",
      remediation_vers: "g7b",
    },
    criteres: [
      { code: "7.02", libelle: "Régler le régulateur de pression du condenseur", etat: "a_evaluer" },
      { code: "7.03", libelle: "Installer un condenseur sans risque de fuite", etat: "a_evaluer" },
      { code: "7.05", libelle: "Inspecter les conduites de refoulement et de liquide", etat: "a_evaluer" },
      { code: "7.07", libelle: "Démarrer, mesurer et arrêter un condenseur", etat: "a_evaluer" },
      { code: "7.09", libelle: "Rédiger un rapport d'état du condenseur", etat: "a_evaluer" },
      { code: "7.10", libelle: "Entretenir un condenseur pour économiser l'énergie", etat: "a_evaluer" },
    ],
    liens: [suite("g8", "L'évaporateur"), SOMMAIRE],
    notes_pilote: "Insister sur la consignation électrique avant toute inspection de conduites, et sur l'azote seul pour contrôler l'étanchéité (jamais d'oxygène). Si un stagiaire confond condenseur à air et tour de refroidissement, revenir à la croix du frigoriste au tableau. Faire rédiger un vrai rapport d'état à l'écrit, même court.",
  },
  {
    id: "g8",
    type: "cours",
    titre: "L'évaporateur",
    dc: "G8 · codes 8.01 · 8.05 · 8.08 · 8.09",
    minuteur_s: 300,
    corps:
      schema("mesure-surchauffe.svg", "La surchauffe se mesure en deux points : manomètre BP vers la table, sonde de contact sur le tube.") +
      "<p>C'est le point <b>froid</b> du circuit : le fluide y absorbe la chaleur du milieu à refroidir " +
      "et se vaporise. En sortie, il doit être <b>entièrement vapeur</b>, avec une <b>surchauffe de " +
      "5 à 10 K</b> — c'est ce qui protège le compresseur du coup de liquide.</p>" +
      "<p>Le <b>givre</b> est normal en froid négatif ; installé durablement, il isole la batterie et " +
      "fait chuter l'échange. D'où les cycles de <b>dégivrage</b> (air, résistance électrique, gaz " +
      "chauds). Un évaporateur qui givre <b>complètement</b> en fonctionnement signale d'abord un " +
      "problème de <b>débit d'air</b> : filtre encrassé, ventilateur arrêté.</p>" +
      "<p>Points de vigilance propres : corrosion, condensats, et le <b>bac</b> — une fuite peut s'y " +
      "dissimuler sous l'eau de dégivrage.</p>",
    blocs: [
      {
        type: "cle",
        t: "Lire la surchauffe",
        html:
          "<b>Surchauffe = température du gaz à l'aspiration − température d'évaporation</b> " +
          "(celle que la table donne pour la BP mesurée).<br>" +
          "Trop élevée → le détendeur n'alimente pas assez, ou il manque du fluide.<br>" +
          "Nulle ou négative, ligne d'aspiration givrée → <b>risque de coup de liquide</b>, on agit tout de suite.",
      },
      {
        type: "piege",
        t: "Deux organes qu'on confond",
        html:
          "Le <b>régulateur de pression d'évaporation</b> protège le produit (il empêche l'évaporateur " +
          "de descendre trop bas). Le <b>pressostat BP</b> protège le compresseur. Fonctions " +
          "différentes, réglages différents.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Une installation présente une surchauffe nulle et la ligne d'aspiration est givrée jusqu'au compresseur. Quelle action prioritaire ?",
      choix: [
        "Ajouter du fluide frigorigène",
        "Réduire l'ouverture du détendeur ou retirer du fluide : il y a risque de coup de liquide",
        "Nettoyer le condenseur",
        "Remplacer le compresseur",
      ],
      bonne: 1,
      explication:
        "Surchauffe nulle = du liquide arrive au compresseur. Le liquide est incompressible : la casse est immédiate. On réduit l'alimentation du détendeur ou on retire de la charge, sans attendre.",
      remediation_vers: "g8",
    },
    criteres: [
      { code: "8.01", libelle: "Expliquer le principe de l'évaporateur et le dégivrage", etat: "a_evaluer" },
      { code: "8.05", libelle: "Vérifier les conduites liquide et aspiration", etat: "a_evaluer" },
      { code: "8.08", libelle: "Réaliser la mise en marche/arrêt et les mesures", etat: "a_evaluer" },
      { code: "8.09", libelle: "Inspecter la surface d'échange et le bac de condensats", etat: "a_evaluer" },
    ],
    ressources: ["r-echangeurs", "r-kp1"],
    liens: [suite("g8b", "Évaporateur — installer, régler, vérifier"), SOMMAIRE],
    notes_pilote:
      "Faire relever la surchauffe sur banc réel : manomètre + sonde de contact, puis calcul. " +
      "C'est le geste le plus discriminant de tout le référentiel composants. Faire observer le " +
      "givrage en direct avant d'expliquer le mécanisme. Anecdote utile : un bac de condensats bouché " +
      "a masqué une fuite pendant des semaines — d'où l'inspection visuelle systématique (8.09).",
  },
  {
    id: "g8b",
    type: "cours",
    titre: "Évaporateur — installer, régler, vérifier",
    dc: "G8 · codes 8.02 · 8.03 · 8.04 · 8.06 · 8.07 · 8.10 · 8.11",
    minuteur_s: 360,
    corps:
      schema("mesure-surchauffe.svg", "Points de contrôle sur l évaporateur en fonctionnement : manomètre basse pression relié à la table, sonde de contact sur le tube d aspiration.") +
      "<p>Sur la <b>croix du frigoriste</b>, l'évaporateur occupe la position <b>basse</b>. Une fois " +
      "installé, il doit fonctionner <b>sans aucune fuite ni émission</b> — c'est vrai pour le tube, " +
      "mais aussi pour tout le matériel de contrôle et de sécurité posé avec lui.</p>" +
      "<p>Deux organes se règlent, pour deux raisons différentes. Le <b>régulateur de pression " +
      "d'évaporation</b> est une soupape mécanique. Elle maintient une pression minimale dans " +
      "l'évaporateur — par exemple pour empêcher un produit de geler, ou pour équilibrer plusieurs " +
      "évaporateurs sur un seul compresseur. Sa mise en service et son réglage suivent <b>toujours " +
      "la fiche constructeur</b>.</p>" +
      "<p>Les <b>interrupteurs de sécurité et de contrôle</b> — les pressostats — protègent la " +
      "machine, pas le produit. Ils coupent l'alimentation électrique du compresseur si la pression " +
      "sort de la plage prévue. Deux organes, deux fonctions, deux réglages : on ne les confond pas.</p>" +
      "<p>Le dégivrage évite que le givre n'isole la batterie. Il peut se faire à l'air, par " +
      "résistance électrique ou par gaz chauds. Quand il se fait <b>à l'air chaud</b>, le conduit " +
      "qui transporte cet air s'inspecte à chaque visite : étanchéité, isolation, écoulement des " +
      "condensats.</p>" +
      "<p>Toute visite se termine par un <b>rapport écrit</b> sur l'état de l'évaporateur : " +
      "anomalies observées, risque pour le système, ce qui pourrait à terme provoquer une fuite. " +
      "Une batterie propre, un bon débit d'air et une surchauffe de <b>5 à 10 K</b> préservent " +
      "aussi l'<b>efficacité énergétique</b> de l'équipement.</p>",
    blocs: [
      {
        type: "piege",
        t: "Avant toute mise en service",
        html:
          "Pour vérifier que l'évaporateur ne fuit pas, la mise en pression se fait à l'<b>azote " +
          "SEUL</b> — jamais à l'oxygène, jamais à l'air comprimé : avec de l'huile dans le circuit, " +
          "ce mélange est explosif. Et avant toute intervention sur l'évaporateur ou ses sécurités, " +
          "on coupe et on <b>consigne l'alimentation électrique</b>.",
      },
      {
        type: "cle",
        t: "Qui protège quoi ?",
        html:
          "<b>Pressostat</b> (interrupteur de sécurité) → protège la <b>machine</b> : il coupe le " +
          "compresseur.<br>" +
          "<b>Régulateur de pression d'évaporation</b> → protège le <b>produit</b>, ou l'équilibre " +
          "entre évaporateurs : il ne coupe rien, il maintient une pression.<br>" +
          "Dans les deux cas, la valeur de réglage vient de la <b>fiche constructeur</b>, jamais " +
          "de l'estime.",
      },
      {
        type: "cle",
        t: "Ce qu'un bon rapport contient",
        html:
          "Un rapport d'état utile <b>décrit ce qui ne va pas</b> : corrosion, fixation desserrée, " +
          "bac de condensats sale, conduit de dégivrage abîmé — tout ce qui, laissé tel quel, finit " +
          "en fuite ou en émission. C'est aussi ce qui coûte le plus cher en énergie : une batterie " +
          "sale ou un mauvais débit d'air font tourner le compresseur plus longtemps pour le même " +
          "résultat.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Sur une installation, le pressostat BP coupe le compresseur. Le régulateur de pression " +
        "d'évaporation, lui, ne coupe rien. Que fait-il ?",
      choix: [
        "Il coupe l'alimentation électrique du compresseur",
        "Il maintient une pression minimale dans l'évaporateur, pour protéger le produit ou équilibrer plusieurs évaporateurs",
        "Il remplace le pressostat sur les installations récentes",
        "Il mesure la surchauffe en sortie d'évaporateur",
      ],
      bonne: 1,
      explication:
        "Le régulateur de pression d'évaporation est un organe mécanique : il maintient une pression minimale dans l'évaporateur, pour protéger le produit ou équilibrer plusieurs évaporateurs sur un même compresseur. Le pressostat, lui, est électrique : il coupe le compresseur pour protéger la machine. Deux fonctions, deux réglages, toujours selon la fiche constructeur.",
      remediation_vers: "g8b",
    },
    criteres: [
      { code: "8.02", libelle: "Mettre en service un régulateur de pression d'évaporation", etat: "a_evaluer" },
      { code: "8.03", libelle: "Installer l'évaporateur et ses sécurités sans fuite", etat: "a_evaluer" },
      { code: "8.04", libelle: "Régler les sécurités électriques de l'évaporateur", etat: "a_evaluer" },
      { code: "8.06", libelle: "Vérifier l'état du conduit de dégivrage à l'air chaud", etat: "a_evaluer" },
      { code: "8.07", libelle: "Ajuster la soupape de pression d'évaporation", etat: "a_evaluer" },
      { code: "8.10", libelle: "Rédiger un rapport d'état de l'évaporateur", etat: "a_evaluer" },
      { code: "8.11", libelle: "Connaître les leviers d'efficacité énergétique de l'évaporateur", etat: "a_evaluer" },
    ],
    liens: [suite("x2", "Exercice — la machine ne fait plus de froid"), SOMMAIRE],
    notes_pilote:
      "Fiche dense : sept codes. Ne pas tout dérouler d'une traite — s'appuyer sur les trois blocs " +
      "pour rythmer la séance. Faire identifier sur une machine réelle (ou des photos) le régulateur " +
      "de pression d'évaporation ET le pressostat BP, et faire dire à voix haute ce que chacun " +
      "protège : c'est la confusion la plus fréquente du groupe G8. Rappeler systématiquement azote " +
      "seul + consignation électrique avant toute manipulation. Pour 8.10, faire rédiger un vrai " +
      "rapport d'état à partir d'une photo (bac encrassé, conduit abîmé) plutôt que de décrire la " +
      "méthode dans l'abstrait. Relier 8.11 à la surchauffe déjà vue en G8 : ce n'est pas une " +
      "nouvelle notion, c'est le même réglage regardé sous l'angle énergie.",
  },
  {
    id: "x2",
    type: "exercice",
    titre: "Exercice — la machine ne fait plus de froid",
    dc: "G8 · G9 · mise en situation",
    minuteur_s: 480,
    corps:
      "<p>Chambre froide positive. Le compresseur tourne, mais la température de la chambre ne descend plus. " +
      "Tu relèves :</p>" +
      "<ul>" +
      "<li>basse pression <b>anormalement basse</b> ;</li>" +
      "<li>surchauffe à l'aspiration <b>très élevée</b>, de l'ordre de 20 K ;</li>" +
      "<li>sous-refroidissement <b>quasi nul</b>, <b>bulles</b> visibles au voyant liquide ;</li>" +
      "<li>aucune trace d'huile visible au premier examen.</li>" +
      "</ul>" +
      "<p>Rappels : surchauffe attendue 5 à 10 K, sous-refroidissement attendu 4 à 8 K.</p>",
    blocs: [
      {
        type: "cle",
        t: "Méthode",
        html:
          "On ne conclut pas sur un relevé isolé : on cherche la cause qui explique " +
          "<b>tous</b> les indices à la fois. Ici, trois indices convergent.",
      },
      {
        t: "À toi : rejoue la panne sur le Diagramme Enthalpique+",
        html:
          "<p style=\"margin:0 0 10px\">Entre les relevés de l’énoncé dans l’outil (fluide, BP, HP, températures) et regarde le cycle se tracer : la panne se VOIT sur le log p-h.</p>" +
          '<iframe src="https://frigorx.github.io/diagramme-enthalpique/" title="Diagramme Enthalpique+ v3.2" style="width:100%;height:760px;border:0;background:#fff;border-radius:6px" loading="lazy"></iframe>',
      },
    ],
    question: {
      type: "qcm",
      enonce: "Quelle hypothèse explique l'ensemble des relevés ?",
      choix: [
        "Un excès de charge en fluide",
        "Un manque de charge : la fuite est à rechercher",
        "Un condenseur encrassé",
        "Un compresseur en fin de vie",
      ],
      bonne: 1,
      explication:
        "BP basse + surchauffe élevée + sous-refroidissement effondré + bulles au voyant : le circuit manque de fluide. C'est un diagnostic par méthode indirecte — il reste à localiser la fuite par méthode directe, puis à consigner.",
      remediation_vers: "g4b",
    },
    criteres: [
      { code: "4.04", libelle: "Interpréter des mesures par la méthode indirecte", etat: "a_evaluer" },
      { code: "8.08", libelle: "Réaliser les mesures en fonctionnement", etat: "a_evaluer" },
    ],
    ressources: ["r-enthalpique"],
    liens: [suite("g9", "Le détendeur"), { vers: "g4b", libelle: "↩ Revoir la méthode indirecte", sec: true }, SOMMAIRE],
    notes_pilote:
      "Exercice charnière : il rebranche les composants (G6-G9) sur l'étanchéité (G4). Le laisser " +
      "chercher en binôme cinq minutes avant de corriger. Erreur fréquente : s'arrêter à « le " +
      "détendeur est bouché » — plausible pour la surchauffe, mais n'explique ni le sous-refroidissement " +
      "nul ni les bulles au voyant. Faire verbaliser pourquoi une seule cause explique les trois indices. " +
      "Enchaîner : « et maintenant, comment localises-tu la fuite ? » → retour en G4c.",
  },
  {
    id: "g9",
    type: "cours",
    titre: "Le détendeur et les organes annexes",
    dc: "G9 · codes 9.01 · 9.02 · 9.03 · 9.08",
    minuteur_s: 300,
    corps:
      schema("detendeurs-ligne.svg", "Les quatre types de détendeurs et la ligne liquide avec ses accessoires dans l ordre.") +
      "<p>Le détendeur fait chuter la pression et <b>dose le débit de liquide</b> envoyé à " +
      "l'évaporateur. Le <b>détendeur thermostatique</b> régule sur la <b>surchauffe</b> : son bulbe, " +
      "fixé sur la ligne d'aspiration, sent la température du gaz et ouvre ou ferme en conséquence. " +
      "Le <b>détendeur électronique</b> fait la même chose avec une sonde et un régulateur : plus " +
      "précis, plus rapide. Le <b>capillaire</b>, lui, est un tube calibré fixe, sans réglage — " +
      "on le trouve sur les petits appareils.</p>" +
      "<p>Autour du détendeur, la ligne liquide porte le <b>filtre déshydrateur</b> (tamis moléculaire, " +
      "monté <b>dans le sens de la flèche</b>) et le <b>voyant</b>, qui renseigne sur deux choses : " +
      "la présence de bulles et, par sa pastille, l'humidité du circuit.</p>",
    blocs: [
      {
        type: "cle",
        t: "Sécurité électrique, sécurité mécanique",
        html:
          "Le <b>pressostat</b> est électrique et réglable : il coupe avant l'incident. " +
          "La <b>soupape de sécurité</b> est mécanique, tarée par le constructeur : c'est le dernier " +
          "recours. On ne remplace jamais l'une par l'autre, et on ne retouche pas un tarage.",
      },
      {
        type: "piege",
        t: "Trois erreurs de montage",
        html:
          "Monter une vanne ou un déshydrateur <b>à l'envers</b> (erreur irréversible sans découpe) ; " +
          "poser le <b>bulbe</b> au mauvais endroit ou mal serré ; retoucher le réglage " +
          "<b>sans laisser l'installation se stabiliser</b> entre deux actions — la mesure suivante " +
          "ne veut alors plus rien dire.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Sur quoi le détendeur thermostatique régule-t-il ?",
      choix: [
        "La pression de condensation",
        "La surchauffe à la sortie de l'évaporateur",
        "Le sous-refroidissement en sortie de condenseur",
        "La pression d'huile du compresseur",
      ],
      bonne: 1,
      explication:
        "Le bulbe mesure la température du gaz en sortie d'évaporateur : le détendeur ouvre ou ferme pour maintenir la surchauffe à la valeur réglée. C'est sa seule grandeur de régulation.",
      remediation_vers: "g9",
    },
    criteres: [
      { code: "9.01", libelle: "Expliquer le principe du détendeur et du tube capillaire", etat: "a_evaluer" },
      { code: "9.02", libelle: "Installer les vannes dans la bonne position", etat: "a_evaluer" },
      { code: "9.03", libelle: "Régler un détendeur mécanique ou électronique", etat: "a_evaluer" },
      { code: "9.08", libelle: "Vérifier un filtre déshydrateur", etat: "a_evaluer" },
    ],
    liens: [suite("g9b", "Régler et contrôler les organes annexes"), SOMMAIRE],
    notes_pilote:
      "Faire manipuler un détendeur mécanique démonté, vis de réglage visible, AVANT d'aborder " +
      "l'électronique : le geste ancre la notion, le paramétrage logiciel l'abstrait. Faire chercher " +
      "la valeur de consigne sur la notice constructeur plutôt que de la donner — cohérent avec la " +
      "règle du zéro invention. Ce chapitre est un carrefour : le relier à G4 (étanchéité), G8 " +
      "(surchauffe) et G11 (efficacité).",
  },
  {
    id: "g9b",
    type: "cours",
    titre: "Régler et contrôler les organes annexes",
    dc: "G9 · codes 9.04 · 9.05 · 9.06 · 9.07 · 9.09 · 9.10",
    minuteur_s: 420,
    corps:
      schema("detendeurs-ligne.svg", "La ligne liquide et ses accessoires, dans l ordre : réserve de liquide, filtre déshydrateur, voyant, électrovanne, détendeur.") +
      "<p>Autour du détendeur, d'autres organes se <b>règlent</b> et se <b>contrôlent</b>. Ils ne " +
      "dosent pas le fluide. Ils protègent l'installation et lui évitent de gaspiller de " +
      "l'énergie. Cette fiche en présente quatre : les thermostats, la soupape de régulation de " +
      "pression, les limiteurs de pression, et le séparateur d'huile.</p>" +
      "<p>Le <b>thermostat</b> commande un organe (compresseur, vanne) selon une " +
      "<b>température</b>. Le thermostat <b>mécanique</b> utilise un bulbe relié par un tube fin " +
      "à des contacts électriques : simple et robuste. Le thermostat <b>électronique</b> utilise " +
      "une sonde reliée à un régulateur numérique : plus précis, et plus simple à régler. Dans " +
      "les deux cas, le point de consigne se règle <b>selon la fiche constructeur</b>, jamais à " +
      "l'estime.</p>" +
      "<p>La <b>soupape de régulation de pression</b> ne coupe rien : elle <b>module en " +
      "continu</b> pour maintenir une pression stable à un point du circuit. Le <b>limiteur de " +
      "pression</b> est différent : c'est une sécurité. Mécanique, il est réglé par un ressort. " +
      "Électronique, il utilise un capteur relié à un module. Dans les deux cas, il <b>coupe le " +
      "circuit</b> — le plus souvent le compresseur — dès qu'un seuil de pression est franchi, " +
      "en haute comme en basse pression. Une régulation qui module, une sécurité qui coupe : " +
      "deux logiques, deux réglages.</p>" +
      "<p>Le <b>séparateur d'huile</b> se place juste après le compresseur (à droite), avant le " +
      "condenseur (en haut). C'est là que passe en premier la vapeur chaude chargée d'huile. Il " +
      "retient cette huile puis la renvoie au carter du compresseur, automatiquement, dès que le " +
      "niveau monte. <b>Vérifier son fonctionnement</b>, c'est contrôler que ce retour se fait " +
      "bien : une huile qui s'accumule plus loin dans le circuit réduit l'échange de chaleur, et " +
      "finit par manquer au compresseur.</p>" +
      "<p>Après ces réglages et ce contrôle, on <b>rédige un rapport</b> sur l'état de chaque " +
      "organe. Un thermostat qui dérive, un limiteur qui ne coupe plus, un séparateur qui laisse " +
      "passer l'huile : non signalés, ces défauts finissent par endommager le système. À terme, " +
      "faute de mesure, cela provoque une fuite ou une émission de réfrigérant. Le rapport écrit " +
      "permet d'agir <b>avant</b> ce stade.</p>",
    blocs: [
      {
        type: "cle",
        t: "Un bon réglage, c'est de l'énergie économisée",
        html:
          "Un thermostat qui démarre et arrête le compresseur trop souvent, un limiteur qui " +
          "coupe pour rien, un séparateur d'huile qui laisse l'huile encrasser les échangeurs : " +
          "à chaque fois, le compresseur travaille plus pour le même résultat. <b>Bien régler et " +
          "bien entretenir ces organes, à l'installation comme en maintenance, c'est aussi ce " +
          "qui maintient l'efficacité énergétique</b> de l'installation.",
      },
      {
        type: "piege",
        t: "Avant de toucher un réglage électrique",
        html:
          "Un thermostat électronique, un limiteur de pression électrique : ce sont des " +
          "<b>organes électriques</b>. <b>Consignation électrique</b> systématique avant toute " +
          "intervention. Et un limiteur de sécurité ne se retouche jamais « pour voir » : son " +
          "seuil se règle selon la fiche constructeur, comme tous les autres réglages de cette " +
          "fiche.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Quelle est la différence entre un limiteur de pression et une soupape de régulation de pression ?",
      choix: [
        "Aucune différence : ce sont deux noms pour le même organe",
        "Le limiteur coupe le circuit à un seuil de sécurité ; la soupape de régulation module en continu pour maintenir une pression stable",
        "Le limiteur agit sur la température, la soupape de régulation sur la pression",
        "La soupape de régulation remplace le thermostat sur les installations récentes",
      ],
      bonne: 1,
      explication:
        "Le limiteur de pression (mécanique ou électronique) est une sécurité : il coupe le circuit quand un seuil est franchi. La soupape de régulation ne coupe rien : elle module en continu pour maintenir une pression stable à un point du circuit. Deux logiques différentes, deux réglages différents.",
      remediation_vers: "g9b",
    },
    criteres: [
      { code: "9.04", libelle: "Régler un thermostat mécanique ou électronique", etat: "a_evaluer" },
      { code: "9.05", libelle: "Régler une soupape de régulation de pression", etat: "a_evaluer" },
      { code: "9.06", libelle: "Régler un limiteur de pression mécanique ou électronique", etat: "a_evaluer" },
      { code: "9.07", libelle: "Vérifier le fonctionnement d'un séparateur d'huile", etat: "a_evaluer" },
      { code: "9.09", libelle: "Rédiger un rapport d'état sur ces organes", etat: "a_evaluer" },
      { code: "9.10", libelle: "Connaître les mesures d'efficacité énergétique liées à ces réglages", etat: "a_evaluer" },
    ],
    liens: [suite("g10", "Tuyauterie et brasage sous azote"), SOMMAIRE],
    notes_pilote:
      "Faire manipuler un pressostat démonté (ou les simulateurs KP1/KP5) pour que les stagiaires " +
      "distinguent au toucher le limiteur, qui coupe, de la soupape de régulation, qui module en " +
      "continu : c'est la confusion la plus fréquente à l'oral. Sur le séparateur d'huile, montrer " +
      "un appareil réel en fonctionnement si possible — le retour d'huile par flotteur reste " +
      "abstrait sur le seul schéma. Relier le rapport écrit (9.09) à la finalité du métier : ce " +
      "n'est pas de la paperasse, c'est ce qui évite la fuite non détectée. Ce module referme le " +
      "groupe G9 : le relier à G6 (mêmes sécurités électriques côté compresseur) et à G4 " +
      "(étanchéité).",
  },

  /* ==================================================================
     G10 — TUYAUTERIE ET BRASAGE
     ================================================================== */
  {
    id: "g10",
    type: "cours",
    titre: "Tuyauterie et brasage sous azote",
    dc: "G10 · codes 10.01 · 10.02",
    minuteur_s: 300,
    corps:
      schema("balayage-azote.svg", "Brasage sous balayage d azote : l azote traverse le tube pendant la chauffe et ressort librement.") +
      "<p>Braser un circuit frigorifique, ce n'est pas braser une tuyauterie d'eau. À la flamme, " +
      "l'intérieur du cuivre s'oxyde et forme une <b>calamine</b> noire qui se détache plus tard, " +
      "circule, et bouche le déshydrateur ou abîme le compresseur — des mois après, loin de la cause.</p>" +
      "<p>D'où le <b>balayage à l'azote</b> pendant toute la chauffe : un débit léger et continu chasse " +
      "l'oxygène du tube. Pour le cuivre sur cuivre, l'alliage d'apport est généralement du type " +
      "<b>cuivre-phosphore</b>.</p>" +
      "<p>On ne brase <b>jamais</b> un circuit contenant du fluide : récupération, puis inertage à " +
      "l'azote. <b>EPI systématiques</b> au poste : lunettes, gants. Les tubes se cintrent " +
      "<b>à froid, à la cintreuse</b>, se coupent au coupe-tube et s'<b>ébavurent</b> — une bavure " +
      "part avec le fluide et finit dans le compresseur.</p>",
    blocs: [
      {
        type: "cle",
        t: "Deux opérations à l'azote, à ne pas confondre",
        html:
          "<b>Balayage</b> : pendant le brasage, débit léger, pour éviter l'oxydation.<br>" +
          "<b>Épreuve</b> : après le brasage, sous pression, pour vérifier l'étanchéité.<br>" +
          "Même gaz, deux gestes, deux moments.",
      },
      {
        type: "piege",
        t: "Le support compte autant que le joint",
        html:
          "Un support mal posé, trop serré, ou un point dur sur le tube transmet les vibrations du " +
          "compresseur au joint brasé. Le joint peut être parfait au départ et rompre par fatigue " +
          "des mois plus tard.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Pourquoi balaie-t-on à l'azote pendant un brasage sur circuit frigorifique ?",
      choix: [
        "Pour refroidir le tube plus vite",
        "Pour éviter l'oxydation interne du cuivre (calamine)",
        "Pour vérifier l'étanchéité du joint",
        "Pour sécher le circuit avant la charge",
      ],
      bonne: 1,
      explication:
        "Sans azote, la chauffe oxyde l'intérieur du tube. La calamine formée se détache ensuite, circule dans le circuit, bouche le déshydrateur et endommage le compresseur.",
      remediation_vers: "g10",
    },
    criteres: [
      { code: "10.01", libelle: "Réaliser des joints étanches (soudage, brasage fort ou tendre)", etat: "a_evaluer" },
      { code: "10.02", libelle: "Fabriquer et vérifier les supports de tuyauteries", etat: "a_evaluer" },
    ],
    liens: [suite("g11", "Substitution et efficacité"), SOMMAIRE],
    notes_pilote:
      "Faire monter le balayage azote — bouteille, détendeur, tuyau, position de sortie — AVANT toute " +
      "mise en flamme. Le geste doit être automatique avant d'allumer le chalumeau. Pédagogie de la " +
      "découverte : faire observer un joint mal brasé (calamine, porosité) et laisser les stagiaires " +
      "identifier les défauts avant de donner la méthode correcte.",
  },

  /* ==================================================================
     G11 — SUBSTITUTION & EFFICACITÉ
     ================================================================== */
  {
    id: "g11",
    type: "cours",
    titre: "Substitution et efficacité énergétique",
    dc: "G11 · codes 1.08 · 11.01 → 11.05",
    minuteur_s: 300,
    corps:
      schema("classes-securite.svg", "Matrice des classes NF EN 378 : CO2 en A1, R-32 et R-1234yf en A2L, R-290 en A3, NH3 en B2L.") +
      "<p>Remplacer un fluide à fort PRP se fait dans deux directions : les <b>fluides naturels</b> " +
      "(CO₂, ammoniac, hydrocarbures) et les fluides de synthèse à faible PRP (<b>HFO</b>, HFC bas PRP). " +
      "Il n'existe <b>pas de fluide universel</b> : le choix dépend de l'application, du climat, et de " +
      "la sécurité du site.</p>" +
      "<p>La <b>classe de sécurité NF EN 378</b> commande tout le reste — EPI, zonage, détection, " +
      "charge admissible dans le local : <b>A1</b> (CO₂), <b>A2L</b> (R-32, R-1234yf), <b>A3</b> " +
      "(R-290), <b>B2L</b> (NH₃).</p>" +
      "<p>Une classe ne dit pas seulement « ça brûle ou non ». Elle décrit la <b>combustibilité</b> et " +
      "la <b>propagation de la flamme</b> : un <b>A2L</b> brûle difficilement et la flamme se propage " +
      "lentement, un <b>A3</b> s'enflamme facilement et la flamme court vite. De là découlent une " +
      "<b>charge maximale</b> admissible et des <b>limites d'occupation</b> du local — plus le local " +
      "est petit ou recevant du public, plus la charge autorisée est faible. Ces valeurs se " +
      "déterminent selon la <b>NF EN 378</b> et la doc constructeur, <b>jamais à l'estime</b>.</p>" +
      "<p>Le stockage et le transport des fluides <b>inflammables</b>, <b>toxiques</b> ou à " +
      "<b>haute pression</b> obéissent chacun à des règles propres. Et lorsqu'un site ne peut pas " +
      "respecter les exigences de l'<b>annexe IV du règlement (UE) 2024/573</b> pour des raisons de " +
      "<b>sécurité</b>, des équipements dérogatoires restent permis : c'est une exception encadrée, " +
      "qui se justifie par écrit, pas un passe-droit.</p>" +
      "<p>Côté énergie, le <b>COP</b> est le rapport de la puissance frigorifique produite à la " +
      "puissance électrique consommée. On l'améliore en <b>rapprochant</b> la température de " +
      "condensation de celle d'évaporation : condenseur propre, échangeurs bien dimensionnés, " +
      "réglages justes. Réduire la charge, enfin, améliore à la fois la sécurité et le rendement.</p>",
    blocs: [
      {
        type: "cle",
        t: "Drop-in ou retrofit ?",
        html:
          "<b>Drop-in</b> : on change le fluide sans modifier l'installation.<br>" +
          "<b>Retrofit</b> : on change le fluide <b>et</b> ce qu'il faut adapter — huile, détendeur, " +
          "joints. Annoncer un drop-in là où il faut un retrofit, c'est préparer une panne.",
      },
      {
        type: "piege",
        t: "Le piège de l'année",
        html:
          "<b>Le R-290 est A3</b>, pas A2L. Tout hydrocarbure est très inflammable. " +
          "Se tromper de classe, c'est se tromper d'EPI, de matériel électrique et de charge " +
          "admissible. À l'inverse, le <b>CO₂ est A1</b> : ni toxique ni inflammable — son danger " +
          "est la <b>pression</b>.",
      },
      {
        t: "À toi : compare les candidats à la substitution",
        html:
          "<p style=\"margin:0 0 10px\">Passe en revue R-290, R-1234yf, R-744, R-32 : classe de sécurité, PRP, glide. Le fluide « parfait » n existe pas — c est tout l objet de ce groupe.</p>" +
          outil("fiche-fluide.html", "Carte d identité du fluide interactive", 415),
      },
    ],
    question: {
      type: "qcm",
      enonce: "Comment améliore-t-on le COP d'une installation frigorifique ?",
      choix: [
        "En augmentant la haute pression au maximum",
        "En réduisant l'écart entre température de condensation et température d'évaporation",
        "En augmentant la surchauffe au maximum",
        "En réduisant le débit d'air sur le condenseur",
      ],
      bonne: 1,
      explication:
        "Plus l'écart entre condensation et évaporation est faible, moins le compresseur travaille pour un même effet frigorifique. Condenseur propre, échangeurs corrects, réglages justes : le rendement est d'abord une affaire d'entretien.",
      remediation_vers: "g11",
    },
    criteres: [
      { code: "1.08", libelle: "Situer combustibilité, propagation de flamme et limites de charge", etat: "a_evaluer" },
      { code: "11.01", libelle: "Connaître les technologies de substitution et leur manipulation sans danger", etat: "a_evaluer" },
      { code: "11.03", libelle: "Appliquer les règles de sécurité pour fluides inflammables, toxiques ou haute pression", etat: "a_evaluer" },
      { code: "11.02", libelle: "Expliquer la conception à charge réduite et l'efficacité", etat: "a_evaluer" },
      { code: "11.04", libelle: "Comparer les fluides de substitution selon l'application", etat: "a_evaluer" },
      { code: "11.05", libelle: "Situer les différences de conception des systèmes aux hydrocarbures", etat: "a_evaluer" },
    ],
    liens: [suite("g12", "Hydrocarbures"), SOMMAIRE],
    notes_pilote:
      "Avant de donner le tableau des classes, demander aux stagiaires de classer eux-mêmes CO₂, NH₃, " +
      "R-290 et R-1234yf par intuition « je m'en méfie / pas de souci », puis confronter à la norme : " +
      "l'écart entre l'intuition et la classification est le meilleur levier de mémorisation. " +
      "Comparer en atelier un détecteur adapté aux hydrocarbures et un détecteur HFC classique.",
  },

  /* ==================================================================
     G12 — HYDROCARBURES (spécifique A1/A2)
     ================================================================== */
  {
    id: "g12",
    type: "cours",
    titre: "Hydrocarbures — le spécifique A1 et A2",
    dc: "G12 · codes 12.01 → 12.04 · 12.06 · 12.13 · 12.14",
    minuteur_s: 360,
    corps:
      schema("classes-securite.svg", "Matrice des classes NF EN 378 : CO2 en A1, R-32 et R-1234yf en A2L, R-290 en A3, NH3 en B2L.") +
      "<p>Les hydrocarbures — <b>R-290</b> (propane), <b>R-600a</b> (isobutane) — sont classés " +
      "<b>A3</b> : très inflammables. Ils s'imposent pourtant, parce que leur PRP est très bas et " +
      "leurs performances excellentes : on les trouve dans les réfrigérateurs domestiques, les " +
      "monoblocs, les vitrines, et de plus en plus dans les pompes à chaleur.</p>" +
      "<p>Travailler dessus impose une <b>préparation dédiée</b> : analyse de risques avant " +
      "intervention, suppression de toute source d'ignition, <b>ventilation active</b>, outillage " +
      "et matériel électrique adaptés, détecteur de gaz. La charge admissible dépend du <b>volume " +
      "du local</b> et de la classe de sécurité : elle se détermine selon la <b>NF EN 378</b> et la " +
      "plaque signalétique — <b>jamais estimée</b>.</p>" +
      "<p>Sur le circuit : récupération, puis <b>inertage à l'azote</b> avant toute flamme. " +
      "Épreuve de pression à l'azote, essai sous vide, charge de la quantité exacte, contrôle direct, " +
      "rapport.</p>" +
      "<p>Tout est <b>étiqueté</b>, et l'étiquette se lit avant de toucher : l'équipement porte la " +
      "mention du fluide et le pictogramme <b>inflammable</b>, la bouteille aussi. Les bouteilles " +
      "d'hydrocarbure ont un <b>raccord spécifique</b> et un <b>filetage à gauche</b> — c'est une " +
      "sécurité, jamais un obstacle à contourner avec un adaptateur.</p>" +
      "<p>Avant d'intervenir, on vérifie que le <b>site</b> lui-même est en règle : " +
      "<b>signalisation</b> du risque, <b>issues de secours</b> dégagées, <b>capteurs de gaz</b> et " +
      "<b>alarmes</b> présents et en service, ventilation opérante. Si ces mesures manquent, on ne " +
      "commence pas : on le signale.</p>" +
      "<p>Enfin, bien travailler économise l'énergie. Une charge <b>juste</b> — et les charges " +
      "hydrocarbures sont faibles —, des échangeurs propres et des réglages exacts font qu'une " +
      "machine au R-290 tient ses performances. Une charge approximative dégrade le rendement " +
      "<b>et</b> la sécurité en même temps.</p>",
    blocs: [
      {
        type: "piege",
        t: "Deux confusions qui coûtent cher",
        html:
          "<b>1.</b> Croire que le R-290 est A2L comme le R-32. Il est <b>A3</b> — la propagation de " +
          "flamme n'a rien à voir.<br>" +
          "<b>2.</b> Forcer un <b>raccord de bouteille</b> hydrocarbure sur un circuit HFC (ou " +
          "l'inverse) : les raccords sont spécifiques précisément pour empêcher la charge croisée.",
      },
      {
        type: "cle",
        t: "Avant toute flamme",
        html:
          "Récupérer → inerter à l'<b>azote</b> → ventiler → supprimer les sources d'ignition → " +
          "détecteur en place. Jamais d'oxygène, jamais d'air comprimé, jamais de flamme sur un " +
          "circuit non inerté.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Le R-290 (propane) appartient à quelle classe de sécurité NF EN 378 ?",
      choix: ["A1", "A2L", "A2", "A3"],
      bonne: 3,
      explication:
        "Le R-290 est A3 : très inflammable. C'est le piège le plus fréquent du référentiel — le R-32, lui, est A2L (faiblement inflammable). La classe commande les EPI, le matériel et la charge admissible.",
      remediation_vers: "g12",
    },
    criteres: [
      { code: "12.01", libelle: "Lire l'étiquetage et raccorder correctement une bouteille", etat: "a_evaluer" },
      { code: "12.02", libelle: "Appliquer les règles de sécurité outils, EPI et détection gaz", etat: "a_evaluer" },
      { code: "12.03", libelle: "Déterminer la charge admissible", etat: "a_evaluer" },
      { code: "12.04", libelle: "Réaliser l'analyse de risques avant intervention", etat: "a_evaluer" },
      { code: "12.06", libelle: "Récupérer et inerter à l'azote", etat: "a_evaluer" },
      { code: "12.13", libelle: "Vérifier la signalisation, les issues, la détection et les alarmes du site", etat: "a_evaluer" },
      { code: "12.14", libelle: "Maintenir l'efficacité énergétique avec un fluide inflammable", etat: "a_evaluer" },
    ],
    liens: [suite("g12b", "Intervenir sur un circuit hydrocarbure"), SOMMAIRE],
    notes_pilote:
      "Module le plus important d'A1 et d'A2 — c'est la nouveauté du référentiel, et le parc A2 y est " +
      "largement passé. Faire manipuler le raccord spécifique hydrocarbure et le comparer physiquement " +
      "au raccord HFC : la confusion se prévient par le geste, pas par le discours. Faire chercher la " +
      "charge maximale sur une VRAIE plaque signalétique avant d'énoncer la règle. Répéter " +
      "« jamais de flamme, jamais d'oxygène » à chaque manipulation, jusqu'au réflexe.",
  },
  {
    id: "g12b",
    type: "cours",
    titre: "Intervenir sur un circuit hydrocarbure",
    dc: "G12 · codes 12.07 · 12.08 · 12.09 · 12.10 · 12.11 · 12.12",
    minuteur_s: 420,
    corps:
      schema("balayage-azote.svg", "Brasage du composant remplacé sous balayage d azote : débit léger et continu, sortie libre — l épreuve sous pression vient ensuite, une fois le circuit refermé.") +
      "<p>Le circuit est déjà <b>récupéré</b> et <b>inerté à l'azote</b> : plus d'hydrocarbure ni d'air à l'intérieur. La zone est prête : <b>ventilée</b>, balisée, sans source d'inflammation, détecteur de gaz et extincteur à portée, outillage adapté.</p>" +
      "<p>Reste une dernière vérification avant le chalumeau : la <b>consignation électrique</b> de l'installation. Le <b>R-290 est A3</b>, très inflammable — pas un A2L comme le R-32. Tant que l'inertage n'est pas confirmé : <b>aucune flamme</b>.</p>" +
      "<p>Le mode opératoire suit ensuite toujours le même ordre :</p>" +
      "<ol>" +
      "<li><b>Ouvrir, remplacer, refermer.</b> On dépose le composant en panne et on brase le nouveau. Toujours sous <b>balayage d'azote</b> : un débit léger et continu qui évite la calamine à l'intérieur du tube. Mano-détendeur sur la bouteille — jamais d'azote en direct.</li>" +
      "<li><b>Épreuve de pression.</b> Le circuit refermé, on le met sous pression d'<b>azote sec</b>, toujours au travers du mano-détendeur, pour contrôler la brasure neuve. Pression d'épreuve : selon la documentation constructeur et la norme applicable, jamais à l'estime.</li>" +
      "<li><b>Tirage au vide.</b> On relâche l'azote, puis on tire au vide : la pompe extrait l'air et l'<b>humidité</b> restants. Un vide qui remonte signale un problème. Valeur cible et durée : selon la documentation constructeur.</li>" +
      "<li><b>Charge.</b> On charge le circuit avec le volume de réfrigérant hydrocarbure (R-290, R-600a) indiqué sur la <b>plaque signalétique</b>, par pesée — jamais une quantité estimée. Raccord dédié aux hydrocarbures : jamais celui d'un circuit HFC, ni l'inverse.</li>" +
      "<li><b>Contrôle direct.</b> On confirme l'étanchéité avec un <b>détecteur adapté aux hydrocarbures</b> — un détecteur pour HFC classique ne convient pas.</li>" +
      "<li><b>Rapport.</b> On rédige le rapport d'intervention : composant changé, résultats de l'épreuve et du contrôle, quantité chargée. Sans rapport, l'intervention n'a pas de valeur.</li>" +
      "</ol>",
    blocs: [
      {
        type: "piege",
        t: "Geste interdit",
        html:
          "Mise en pression : <b>azote sec seulement</b>, jamais d'oxygène ni d'air comprimé, toujours au travers d'un <b>mano-détendeur</b> — une bouteille en direct peut faire éclater le circuit. <b>Consignation électrique</b> systématique avant d'ouvrir. Et tant que l'inertage n'est pas confirmé : <b>pas de chalumeau</b>, le R-290 est A3, très inflammable.",
      },
      {
        type: "cle",
        t: "Le fil rouge de l'intervention",
        html:
          "Récupérer → inerter à l'azote → ouvrir et remplacer → épreuve à l'azote → vide → charge → contrôle direct → rapport.<br>" +
          "Chaque étape verrouille la suivante : pas de charge sans épreuve concluante, pas de contrôle sans vide correct.",
      },
    ],
    question: {
      type: "qcm",
      enonce:
        "Vous allez faire l'épreuve de pression à l'azote sur un circuit hydrocarbure qui vient d'être rebrasé. Que vérifiez-vous avant d'ouvrir la bouteille ?",
      choix: [
        "Que le mano-détendeur est bien monté sur la bouteille",
        "Que le circuit est déjà chargé en R-290",
        "Que le compresseur est en marche",
        "Que le détendeur thermostatique est réglé",
      ],
      bonne: 0,
      explication:
        "Une bouteille d'azote est à très haute pression : sans mano-détendeur, elle peut dépasser la pression d'épreuve et faire éclater le circuit. Le circuit n'est pas encore chargé à ce stade, et le compresseur reste consigné — son détendeur thermostatique n'a rien à voir avec cette étape.",
      remediation_vers: "g12b",
    },
    criteres: [
      { code: "12.07", libelle: "Ouvrir le circuit pour remplacer un composant, puis le refermer", etat: "a_evaluer" },
      { code: "12.08", libelle: "Réaliser l'épreuve de pression à l'azote", etat: "a_evaluer" },
      { code: "12.09", libelle: "Tirer au vide pour sécher et vérifier le circuit", etat: "a_evaluer" },
      { code: "12.10", libelle: "Charger le circuit avec la quantité d'hydrocarbure prévue", etat: "a_evaluer" },
      { code: "12.11", libelle: "Contrôler l'étanchéité par une méthode directe", etat: "a_evaluer" },
      { code: "12.12", libelle: "Rédiger le rapport d'intervention", etat: "a_evaluer" },
    ],
    liens: [suite("x5", "Détective — intervention sur monobloc R-290"), SOMMAIRE],
    notes_pilote:
      "Dérouler la séquence complète sur un poste d'atelier dédié aux hydrocarbures, jamais sur une installation client en première approche. Faire monter le mano-détendeur AVANT toute mise en flamme et faire vérifier le montage par un binôme. Sur l'ordre des gestes, être intraitable : un stagiaire qui veut charger avant un vide concluant s'arrête immédiatement, pas seulement à la correction. Faire toucher côte à côte un détecteur adapté aux hydrocarbures et un détecteur HFC classique — la différence doit être physique, pas seulement énoncée. Terminer par un vrai rapport d'intervention rempli au propre.",
  },

  /* ==================================================================
     G13 / G14 — CO₂ et NH₃ : information
     ================================================================== */
  {
    id: "x5",
    type: "exercice",
    titre: "Détective — intervention sur monobloc R-290",
    dc: "G12 · mise en situation · A1 et A2",
    minuteur_s: 480,
    corps:
      "<p>Une vitrine réfrigérée au <b>R-290</b> à remplacer de compresseur, dans l'arrière-boutique " +
      "d'une boulangerie : local <b>petit</b>, <b>sans ventilation</b>, un four à quelques mètres.</p>" +
      "<p>Ton collègue propose de « faire vite » : récupérer, ouvrir, braser le nouveau compresseur, " +
      "recharger — comme sur un circuit HFC classique, « vu la petite charge ».</p>",
    blocs: [
      {
        type: "piege",
        t: "« Petite charge » ne veut pas dire « petit risque »",
        html:
          "Le R-290 est <b>A3</b> : la charge est petite précisément <b>parce que</b> le fluide est " +
          "très inflammable. Un local exigu non ventilé avec une source de flamme à proximité, " +
          "c'est le scénario d'accident type — pas un chantier ordinaire.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "Que réponds-tu, analyse de risques en main ?",
      choix: [
        "D'accord : la charge est faible, les précautions HFC suffisent",
        "On ventile, on éloigne ou neutralise toute source d'ignition (four compris), on récupère, on inerte à l'azote — et seulement alors on chauffe",
        "On brase d'abord, la récupération se fera après",
        "On contrôle au détecteur HFC classique avant de commencer",
      ],
      bonne: 1,
      explication:
        "Séquence hydrocarbures : analyse de risques, ventilation active, zéro ignition, récupération, inertage azote, et seulement ensuite la flamme. Un détecteur HFC classique n'est pas conçu pour les hydrocarbures — il faut l'appareil adapté.",
      remediation_vers: "g12",
    },
    criteres: [
      { code: "12.04", libelle: "Conduire l'analyse de risques avant intervention", etat: "a_evaluer" },
      { code: "12.05", libelle: "Préparer la zone : ventilation, ignition, EPI", etat: "a_evaluer" },
      { code: "12.06", libelle: "Récupérer puis inerter avant toute flamme", etat: "a_evaluer" },
    ],
    liens: [suite("g13", "CO₂ et NH₃ — information"), { vers: "g12", libelle: "↩ Revoir : hydrocarbures", sec: true }, SOMMAIRE],
    notes_pilote:
      "Le scénario est volontairement banal : c'est le quotidien du parc A2. Faire construire la " +
      "séquence AU TABLEAU par le groupe avant d'afficher la réponse — chaque oubli (le four !, le " +
      "détecteur inadapté) se paie cher en vrai. Prolonger avec la question : « et si le client " +
      "refuse qu'on coupe le four ? » — réponse attendue : on ne fait pas l'intervention.",
  },
  {
    id: "g13",
    type: "cours",
    titre: "CO₂ et NH₃ — reconnaître, ne pas intervenir",
    dc: "G13 · G14 · information et sensibilisation",
    minuteur_s: 300,
    corps:
      "<p>Ce module <b>informe</b>, il ne qualifie pas. Une attestation A1 ou A2 ne donne <b>aucun " +
      "droit d'intervention</b> sur une installation au CO₂ (catégorie B) ou à l'ammoniac " +
      "(catégorie C). Ce qu'on attend ici : <b>reconnaître</b> et <b>ne pas toucher</b>.</p>" +
      "<p><b>CO₂ (R-744)</b> — classé <b>A1</b> : ni toxique ni inflammable, <b>PRP = 1</b>. " +
      "Son danger est ailleurs : la <b>pression</b>, très élevée, et le risque de <b>neige " +
      "carbonique</b> à la détente (brûlure par le froid, obstruction). En transcritique, " +
      "le condenseur laisse la place à un <b>refroidisseur de gaz</b>. Les cylindres, à double vanne, " +
      "ne se raccordent pas au matériel courant.</p>" +
      "<p><b>Ammoniac (R-717)</b> — classé <b>B2L</b> : <b>toxique</b> et faiblement inflammable. " +
      "Fluide du froid industriel (agroalimentaire, entrepôts), jamais du résidentiel. " +
      "Son odeur piquante alerte bien avant le seuil dangereux. En cas de fuite : <b>alerter, " +
      "évacuer, ne jamais intervenir seul</b>.</p>",
    blocs: [
      {
        type: "piege",
        t: "« A1 » ne veut pas dire « sans danger »",
        html:
          "Le CO₂ est A1 du point de vue toxicité et inflammabilité — cela ne dit rien de la pression, " +
          "qui est son vrai risque. Et le <b>B</b> de B2L signifie <b>toxique</b> : ne pas relâcher la " +
          "vigilance sur l'ammoniac sous prétexte que son inflammabilité est faible.",
      },
      {
        type: "cle",
        t: "La règle des catégories",
        html:
          "Les catégories ne se remplacent pas les unes les autres. « Je suis A1, donc je peux donner " +
          "un coup de main sur une fuite d'ammoniac » est <b>faux</b> : il faut la catégorie C, " +
          "sans exception.",
      },
    ],
    question: {
      type: "qcm",
      enonce: "L'ammoniac (R-717) est classé dans quelle classe de sécurité ?",
      choix: [
        "A1 — non toxique, non inflammable",
        "A2L — faiblement inflammable",
        "B2L — toxique et faiblement inflammable",
        "B3 — toxique et très inflammable",
      ],
      bonne: 2,
      explication:
        "B2L : la lettre B signale la toxicité, le 2L une inflammabilité faible à propagation lente. Le cumul des deux dangers explique que l'ammoniac relève d'une catégorie d'attestation dédiée.",
      remediation_vers: "g13",
    },
    criteres: [
      { code: "13.01", libelle: "Reconnaître une installation CO₂ et ses risques (pression)", etat: "a_evaluer" },
      { code: "13.04", libelle: "Identifier les cylindres et matériels dédiés, et ne pas intervenir", etat: "a_evaluer" },
      { code: "14.01", libelle: "Reconnaître une installation NH₃ et la conduite à tenir", etat: "a_evaluer" },
    ],
    liens: [suite("cfin", "Bilan"), SOMMAIRE],
    notes_pilote:
      "Module volontairement court et NON évaluant : l'objectif est la reconnaissance du danger, pas " +
      "la compétence d'intervention. Faire circuler un masque à gaz réel (sans manipulation " +
      "dangereuse) pour que la différence avec les EPI habituels se voie. Rappeler que l'odeur " +
      "d'ammoniac est perceptible bien avant le seuil dangereux : message rassurant qui évite la " +
      "panique tout en imposant l'alerte. Faire deviner pourquoi le NH₃ exige une catégorie séparée " +
      "alors que le R-290, également dangereux, reste dans le champ A1/A2.",
  },

  /* ==================================================================
     EXAMENS BLANCS — entraînement, pas l'épreuve officielle
     ================================================================== */
  {
    id: "rev-g1",
    type: "examen",
    titre: "Réviser — Les bases : pression, température, cycle",
    dc: "Révision · G1",
    examen: { dc: ["G1"], n: 10, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g2",
    type: "examen",
    titre: "Réviser — Environnement et F-Gas",
    dc: "Révision · G2",
    examen: { dc: ["G2"], n: 10, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g3",
    type: "examen",
    titre: "Réviser — Contrôles avant mise en service",
    dc: "Révision · G3",
    examen: { dc: ["G3"], n: 5, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g4",
    type: "examen",
    titre: "Réviser — Contrôles d'étanchéité",
    dc: "Révision · G4",
    examen: { dc: ["G4"], n: 10, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g5",
    type: "examen",
    titre: "Réviser — Récupération, charge, traçabilité",
    dc: "Révision · G5",
    examen: { dc: ["G5"], n: 10, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g6",
    type: "examen",
    titre: "Réviser — Compresseur et circuit d'huile",
    dc: "Révision · G6",
    examen: { dc: ["G6"], n: 10, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g7",
    type: "examen",
    titre: "Réviser — Condenseur",
    dc: "Révision · G7",
    examen: { dc: ["G7"], n: 8, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g8",
    type: "examen",
    titre: "Réviser — Évaporateur",
    dc: "Révision · G8",
    examen: { dc: ["G8"], n: 10, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g9",
    type: "examen",
    titre: "Réviser — Détendeur et accessoires",
    dc: "Révision · G9",
    examen: { dc: ["G9"], n: 10, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g10",
    type: "examen",
    titre: "Réviser — Tuyauterie et brasage",
    dc: "Révision · G10",
    examen: { dc: ["G10"], n: 6, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g11",
    type: "examen",
    titre: "Réviser — Substitution et efficacité",
    dc: "Révision · G11",
    examen: { dc: ["G11"], n: 10, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g12",
    type: "examen",
    titre: "Réviser — Hydrocarbures",
    dc: "Révision · G12",
    examen: { dc: ["G12"], n: 7, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "rev-g13",
    type: "examen",
    titre: "Réviser — CO₂ et NH₃",
    dc: "Révision · G13",
    examen: { dc: ["G13"], n: 9, seuil: 60 },
    notes_pilote:
      "Série de révision en autonomie : correction immédiate, chaque erreur renvoie vers la fiche, " +
      "le bilan liste les fiches à revoir et le score précédent s'affiche (mémoire locale du navigateur). " +
      "À donner AVANT la formation et pendant les périodes de stage.",
  },
  {
    id: "ex-ech",
    type: "examen",
    titre: "Échauffement — les fondamentaux (niveau 1)",
    dc: "Entraînement · niveau 1 · A1 et A2",
    examen: {
      dc: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"],
      niveau: 1,
      n: 12,
      seuil: 60,
    },
    notes_pilote:
      "Tirage limité aux questions de niveau 1 (définitions, rôles, gestes de base), seuil abaissé " +
      "à 60 % : c'est un test de démarrage, pas un examen. À proposer en début de formation pour " +
      "positionner, puis en milieu de parcours pour mesurer le chemin parcouru.",
  },
  {
    id: "ex-defi",
    type: "examen",
    titre: "Défi technicien — diagnostics (niveau 2)",
    dc: "Entraînement · niveau 2 · A1 et A2",
    examen: {
      dc: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"],
      niveau: 2,
      n: 15,
      seuil: 80,
    },
    notes_pilote:
      "Que du niveau 2 : diagnostics, mises en situation, subtilités (huile, transformations du " +
      "cycle, glissement). Seuil relevé à 80 % : réservé à la fin de parcours, ou aux stagiaires " +
      "déjà expérimentés qui veulent se jauger. Un score moyen ici n'est PAS un échec en formation.",
  },
  {
    id: "ex-e-ech",
    type: "examen",
    titre: "Échauffement — catégorie E (niveau 1)",
    dc: "Entraînement · niveau 1 · périmètre E",
    examen: { dc: ["G1", "G2", "G4", "G11"], niveau: 1, n: 8, seuil: 60 },
    notes_pilote:
      "Fondamentaux du périmètre E, seuil 60 % : à faire dès la première demi-journée pour " +
      "dédramatiser le QCM et repérer les bases manquantes.",
  },
  {
    id: "ex-d-ech",
    type: "examen",
    titre: "Échauffement — catégorie D (niveau 1)",
    dc: "Entraînement · niveau 1 · périmètre D",
    examen: { dc: ["G1", "G2", "G5", "G11"], niveau: 1, n: 8, seuil: 60 },
    notes_pilote:
      "Fondamentaux du périmètre D, seuil 60 % : positionnement de début de parcours, à refaire " +
      "en fin de première journée.",
  },
  {
    id: "ex-e",
    type: "examen",
    titre: "Examen blanc — catégorie E",
    dc: "Entraînement · périmètre E",
    examen: { dc: ["G1", "G2", "G4", "G11"], n: 10, seuil: 70 },
    notes_pilote:
      "Entraînement, pas l'épreuve. Le tirage est aléatoire dans le périmètre E ; l'épreuve officielle " +
      "obéit à des règles de composition bien plus strictes (voir le README du dépôt).",
  },
  {
    id: "ex-d",
    type: "examen",
    titre: "Examen blanc — catégorie D",
    dc: "Entraînement · périmètre D",
    examen: { dc: ["G1", "G2", "G5", "G11"], n: 10, seuil: 70 },
    notes_pilote:
      "Périmètre D : récupération. Le groupe 3 n'est pas tiré ici — seul le code 3.03 (pompe à vide) " +
      "est dans le champ D, et il se travaille en atelier plutôt qu'au QCM.",
  },
  {
    id: "ex-a2",
    type: "examen",
    titre: "Examen blanc — catégorie A2",
    dc: "Entraînement · périmètre A2",
    examen: {
      dc: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"],
      n: 15,
      seuil: 70,
    },
    notes_pilote:
      "Même périmètre qu'A1. À l'épreuve officielle, un seul groupe composant est tiré au sort — " +
      "ici les quatre peuvent tomber, ce qui est plus exigeant et convient à l'entraînement.",
  },
  {
    id: "ex-a1",
    type: "examen",
    titre: "Examen blanc — catégorie A1",
    dc: "Entraînement · périmètre A1",
    examen: {
      dc: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"],
      n: 20,
      seuil: 70,
    },
    notes_pilote:
      "Vingt questions sur tout le périmètre. Utile en fin de parcours pour repérer les groupes à " +
      "retravailler — le score par groupe est plus intéressant que le score global.",
  },

  /* ==================================================================
     FIN
     ================================================================== */
  {
    id: "cfin",
    type: "fin",
    titre: "À propos de ce démonstrateur",
    corps:
      "<p class=\"lead\">Ce pack fait tourner le contenu de la formation « habilitation fluides " +
      "frigorigènes » dans le moteur <b>inerWeb Pilote</b> : un même contenu, plusieurs modes de lecture.</p>" +
      "<p><b>Ce qu'il montre.</b> Les quatre parcours réglementaires (A1, A2, D, E), les fiches de " +
      "cours resserrées pour être lues en séance, la remédiation qui renvoie vers la fiche quand la " +
      "réponse est fausse, les examens blancs composés à la volée, et — en mode " +
      "<b>Pilotage formateur</b> — la couche de notes destinée à celui qui anime.</p>" +
      "<p><b>Ce qu'il ne fait pas.</b> Le mode <i>Évaluation</i> est volontairement désactivé : " +
      "l'épreuve officielle obéit à des règles de composition (groupes obligatoires, groupe composant " +
      "tiré au sort, questions imposées, pondération selon la conséquence environnementale, seuil " +
      "assorti d'un plancher) que ce moteur ne sait pas encore appliquer. " +
      "Les questions viennent de <b>Mission F-GAZ</b>, application publique d'entraînement : " +
      "<b>aucun sujet d'examen officiel n'est publié ici</b>.</p>" +
      "<p>Le contenu est un premier jet : il attend vos remarques.</p>",
    liens: [{ vers: "c00", libelle: "↺ Revenir au sommaire", sec: true }],
    notes_pilote:
      "Page à montrer aux collègues en fin de démonstration : elle dit honnêtement ce que l'outil " +
      "fait et ce qu'il ne fait pas. Le point à ne pas laisser passer : entraînement ≠ épreuve " +
      "officielle. Étendre le moteur aux règles de composition de l'arrêté est un chantier à part.",
  },
];

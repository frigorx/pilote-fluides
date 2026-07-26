/* =====================================================================
   PARCOURS — le déroulé de la formation, en séquences
   ---------------------------------------------------------------------
   Ce fichier ne contient AUCUN contenu pédagogique : il ORDONNE celui de
   `cartes.js`. Une séquence = une fiche existante + une durée + une place
   dans le fil. Pour changer l'ordre d'une séance, on déplace une ligne.

   POURQUOI IL EXISTE
   Le pack était une arborescence où l'on se promène. Une formation est un
   déroulé : trois jours, une progression, un avant et un après. Rien ne
   disait « on en est là, voilà l'étape suivante ». C'est ce que ce fichier
   apporte — et c'est lui que lit le mode PROJECTION (projection.html).

   LA BOUCLE, à chaque séquence
     1. le formateur projette et explique (5 à 15 min)
     2. la vidéo, quand il y en a une
     3. le mini-questionnaire — les MÊMES questions que l'élève retrouvera
        chez lui, tirées de la banque sur les codes de la séquence
     4. correction commentée, puis on avance

   `questions` = combien de questions au mini-questionnaire. Le build refuse
   de construire si la banque n'en contient pas assez pour les codes de la
   fiche : c'est la garde qui empêche d'annoncer un questionnaire vide.

   `video` = null tant que le lien n'est pas validé par F. Henninot. Le
   commentaire dit le sujet attendu.
   ===================================================================== */

/* Séquence de cours : fiche, durée en minutes, nombre de questions. */
const seq = (fiche, minutes, questions, video) => ({ type: "cours", fiche, minutes, questions, video: video || null });
/* RAPPEL de sécurité : une fiche DÉJÀ vue, reprise en ouverture de journée.
   Règle F. Henninot (26/07) : on ne commence jamais une journée sans sécurité —
   1 h à l'ouverture de la formation, puis une demi-heure chaque jour, et 1 h
   avant d'attaquer la manipulation. On ne reprojette pas la fiche entière :
   on reprend l'essentiel, le geste interdit, et on repose les questions.
   Techniquement c'est une séquence de cours ordinaire : la fiche est la même,
   seule la durée change — et les questions retombent volontairement sur celles
   déjà vues, c'est la spirale. */
const rappel = (fiche, minutes, questions) => ({ type: "cours", fiche, minutes, questions, video: null, rappel: true });
/* Mise en situation « frigoriste-détective » — on cherche, on croise, on conclut. */
const act = (fiche, minutes) => ({ type: "exercice", fiche, minutes });
/* Point d'étape : un examen blanc du pack, corrigé en salle. */
const bilan = (fiche, minutes) => ({ type: "bilan", fiche, minutes });

export const PARCOURS = {
  id: "fluides-3-jours",
  titre: "Habilitation fluides frigorigènes — parcours de formation",
  sous_titre: "Trois jours de théorie, puis la préparation à la pratique",
  categories: ["A1", "A2", "D", "E"],

  jours: [
    {
      // Le module M0 que la progression FrigorX prévoyait — « Accueil ·
      // positionnement · sécurité générale » — et qui n'avait jamais été
      // produit. Ce n'est pas une journée : une demi-journée d'ouverture,
      // à reprendre avant la première manipulation.
      n: 0,
      libelle: "Accueil",
      titre: "Sécurité — ce qui peut vous blesser",
      intention:
        "Tout le reste de la formation apprend à protéger l'installation et l'environnement. " +
        "Ce bloc-ci apprend au stagiaire à se protéger lui-même. La sécurité se démontre et " +
        "s'impose : elle ne se découvre jamais par l'erreur.",
      sequences: [
        seq("s1", 25, 3),
        seq("s2", 20, 2),
        seq("s3", 20, 3),
        seq("s4", 25, 3),
        seq("s5", 25, 3),
      ],
    },
    {
      // Second bloc d'accueil, demandé le 26/07 : le stagiaire voit les
      // familles de fluides et leurs risques AVANT de savoir quelle
      // catégorie il prépare. Séparé du bloc sécurité, et non fondu
      // dedans : la fiche anoxie se DISTINGUE de l'asphyxie (s1), ce qui
      // suppose s1 déjà vue — et un bloc d'accueil de plus de 3 h noierait
      // les deux messages.
      n: 0,
      libelle: "Accueil",
      titre: "Classification des fluides et risques",
      intention:
        "Avant de choisir sa catégorie, le stagiaire doit savoir ce qu'il aura dans les mains. " +
        "La classification NF EN 378 s'enseigne ici comme un SYSTÈME à deux axes, pas comme une " +
        "liste à retenir : c'est elle qui commande les EPI, le matériel électrique, la " +
        "ventilation, la détection et la charge admise. Deux urgences la rendent nécessaire " +
        "maintenant : le CO₂ entre dans le parc, et les hydrocarbures s'y généralisent.",
      sequences: [
        seq("cl1", 30, 3),
        seq("cl2", 25, 3),
        seq("cl3", 35, 3),   // le CO₂ tue de deux façons : on ne raccourcit pas cette fiche
        seq("cl4", 30, 3),
      ],
    },
    {
      n: 1,
      titre: "Pourquoi ce métier est réglementé, et de quoi on parle",
      intention:
        "Poser le cadre et le vocabulaire. À la fin de la journée, le stagiaire sait ce que la loi " +
        "lui impose, pourquoi elle l'impose, comment se nomment les fluides et comment fonctionne " +
        "une machine frigorifique.",
      // Progression : pourquoi c'est réglementé → comment marche une machine
      // → quels fluides existent → comment on en choisit un → quels organes
      // trahissent une fuite (qui ouvre la journée 2 sur les composants).
      sequences: [
        rappel("s1", 30, 2),   // sécurité du jour : l'air qui manque — le danger le plus fondamental
        seq("g0", 30, 4),   // vidéo attendue : le cadre réglementaire F-Gas en bref
        seq("g2a", 35, 4),  // vidéo attendue : trou d'ozone et effet de serre, vulgarisation
        seq("g2", 40, 5),
        // Chantier 1 du socle théorique (27/07) : g1a a rendu la
        // thermodynamique à g1e, qui l'enseigne vraiment — d'où 45 → 30 min
        // ici, et 30 min de plus juste après. Jour 1 : 6 h 20 → 6 h 35.
        seq("g1a", 30, 5),  // vidéo attendue : le cycle frigorifique animé
        seq("g1e", 30, 4),  // le palier — rien de ce qui suit ne tient sans lui
        seq("g1b", 45, 4),  // vidéo attendue : lire un diagramme enthalpique
        seq("g1c", 35, 4),  // vidéo attendue : lire un code fluide (R-134a, R-410A)
        seq("g13", 25, 4),
        seq("g11", 35, 4),
        seq("g1d", 35, 4),
        bilan("ex-ech", 25),
      ],
    },
    {
      n: 2,
      titre: "Le circuit et ses organes",
      intention:
        "Chaque organe : à quoi il sert, comment on l'installe, comment on le règle, comment on " +
        "vérifie qu'il fonctionne. Les quatre composants se travaillent — un seul sera tiré au " +
        "sort à l'épreuve, et le candidat ne saura pas lequel.",
      sequences: [
        rappel("s4", 30, 2),   // sécurité du jour : ce qui éclate — on ouvre des organes sous pression
        seq("g6", 35, 4),   // vidéo attendue : les 4 technologies de compresseur
        seq("g6b", 40, 4),
        seq("g7", 30, 4),
        seq("g7b", 35, 4),
        seq("g8", 30, 4),   // vidéo attendue : évaporateur et dégivrage
        seq("g8b", 40, 4),
        act("x2", 25),
        seq("g9", 35, 4),   // vidéo attendue : détendeur thermostatique, principe
        seq("g9b", 35, 4),
        seq("g3", 35, 4),
        seq("g10", 40, 3),  // vidéo attendue : brasage sous azote, geste complet
      ],
    },
    {
      n: 3,
      titre: "Le cœur du métier : étanchéité, récupération, sécurité",
      intention:
        "Ce qui justifie l'habilitation : ne pas laisser fuir, ne pas émettre, savoir travailler " +
        "sur des fluides inflammables. C'est la journée la plus lourde au barème — l'erreur y a " +
        "des conséquences directes sur l'environnement ou sur la sécurité.",
      sequences: [
        rappel("cl2", 30, 2),  // sécurité du jour : LIE et ATEX — c'est la journée des hydrocarbures
        seq("g4a", 30, 3),
        seq("g4b", 40, 3),  // vidéo attendue : méthode indirecte, relevé et interprétation
        seq("g4c", 40, 4),  // vidéo attendue : détecteur électronique, balayage correct
        act("x4", 25),
        seq("g5a", 40, 4),  // vidéo attendue : station de récupération, raccordement
        seq("g5b", 40, 5),
        act("x3", 25),
        seq("g12", 40, 4),  // vidéo attendue : sécurité hydrocarbures en intervention
        seq("g12b", 40, 4),
        act("x5", 25),
        bilan("ex-defi", 30),
      ],
    },
    {
      // Ce bloc ne se déroule pas d'un trait : chaque fiche se projette dans
      // l'heure qui précède le plateau correspondant (charte : préparation de
      // chantier ≤ 1 h). On le garde ici pour qu'il ait sa place dans le fil.
      n: 4,
      titre: "Préparation pratique — avant de toucher au fluide",
      intention:
        "Le matériel et l'ordre des gestes, revus AVANT la manipulation. La sécurité s'y démontre " +
        "et s'impose : on ne découvre jamais un risque par l'erreur. À projeter en préparation de " +
        "chantier, dans l'heure qui précède le plateau — pas la veille.",
      sequences: [
        // 1 h de sécurité AVANT d'attaquer la manipulation (règle F. Henninot) :
        // ce qui éclate, puis ce qui gèle — les deux dangers du geste qui suit.
        rappel("s4", 20, 2),
        rappel("s2", 15, 2),
        seq("p7", 25, 2),   // l'analyse de risques ouvre toujours
        seq("p1", 25, 3),
        seq("p5", 30, 3),
        seq("p2", 25, 2),
        seq("p3", 25, 2),
        seq("p4", 25, 2),
        seq("p6", 25, 3),
      ],
    },
  ],
};

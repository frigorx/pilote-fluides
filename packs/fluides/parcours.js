/* =====================================================================
   PARCOURS — le déroulé de la formation, en séquences
   ---------------------------------------------------------------------
   Ce fichier ne contient AUCUN contenu pédagogique : il ORDONNE celui de
   `cartes.js`. Une séquence = une fiche existante + une durée + une place
   dans le fil. Pour changer l'ordre d'une séance, on déplace une ligne.

   ═════════════════════════════════════════════════════════════════════
   REFONTE DU 27/07/2026 — LE PLANNING SUIT ENFIN LE CADRE DU DOSSIER
   ═════════════════════════════════════════════════════════════════════
   Le déroulé était écrit en « 3 jours de théorie », découpage propre au
   pack. Le dossier présenté à la direction, lui, décrit la formation en
   MODULES M0→M8 avec un volume fixé :
       A1 ≈ 35 h / 5 jours   ·   A2 ≈ 28 h / 4 jours
   (source : `habilitation-fluide/cours/CONTENU-00-PROGRESSIONS.md`).
   Les deux ne se recoupaient pas, et la confrontation était sans appel :
   M0 pesait 6 h en salle pour 1 h au cadre, M1 5 h 15 pour 4 h, et la
   PRATIQUE — la moitié du cadre — n'apparaissait nulle part.

   CE QUI FAIT TENIR LE PLANNING : L'AUTOFORMATION
   Le pack est distribué au stagiaire AVANT la formation et il le garde
   PENDANT. C'est le cœur du concept, et c'est le levier : la découverte
   se fait seul, le temps de salle sert à démontrer, questionner,
   remédier — pas à lire. Chaque séquence porte donc son RÉGIME :

     · "salle"    le formateur, en salle           ─┐ comptés dans les
     · "plateau"  le geste, sur machine            ─┘ 35 h (ou 28 h)
     · "avant"    autoformation AVANT la formation ─┐ hors volume :
     · "pendant"  autoformation le soir / en PFMP  ─┘ valeur ajoutée

   Seules les séquences "salle" produisent des diapositives : on ne
   projette pas un travail d'atelier ni une lecture faite chez soi.

   RÈGLE DE SÉCURITÉ (F. Henninot, 26/07) — 1 h à l'ouverture, une
   demi-heure au début de chaque journée, 1 h avant toute manipulation.
   Elle est tenue DANS les enveloppes de module, pas en plus d'elles.

   LA BOUCLE, à chaque séquence de salle
     1. le formateur projette et explique (5 à 15 min)
     2. la vidéo, quand il y en a une
     3. le mini-questionnaire — les MÊMES questions que l'élève retrouvera
        chez lui, tirées de la banque sur les codes de la fiche
     4. correction commentée, puis on avance

   `questions` = combien de questions au mini-questionnaire. Le build refuse
   de construire si la banque n'en contient pas assez pour les codes de la
   fiche : c'est la garde qui empêche d'annoncer un questionnaire vide.

   `video` = null tant que le lien n'est pas validé par F. Henninot. Le
   commentaire dit le sujet attendu.
   ===================================================================== */

/* Séquence de SALLE : fiche, durée en minutes, nombre de questions.
   C'est la seule qui se projette. */
const seq = (fiche, minutes, questions, video) =>
  ({ type: "cours", regime: "salle", fiche, minutes, questions, video: video || null });

/* RAPPEL de sécurité : une fiche DÉJÀ vue, reprise en ouverture de journée.
   On ne reprojette pas la fiche entière : on reprend l'essentiel, le geste
   interdit, et on repose les questions. C'est la spirale. */
const rappel = (fiche, minutes, questions) =>
  ({ type: "cours", regime: "salle", fiche, minutes, questions, video: null, rappel: true });

/* AUTOFORMATION — la fiche est lue par le stagiaire, seul, sur son appareil.
   `avant` : avec le lien reçu en amont de la formation.
   `pendant` : le soir, ou pendant une période en entreprise.
   Ces séquences ne se projettent pas et ne comptent pas dans le volume
   horaire de la formation : elles le PRÉPARENT. */
const avant = (fiche, minutes) =>
  ({ type: "cours", regime: "avant", fiche, minutes, questions: 0, video: null });
const pendant = (fiche, minutes) =>
  ({ type: "cours", regime: "pendant", fiche, minutes, questions: 0, video: null });

/* PLATEAU — le geste, sur machine réelle. Aucune fiche du pack : le pack
   PRÉPARE la pratique, il ne la remplace pas. La séquence existe ici pour
   que le planning soit complet et vérifiable ; elle ne se projette pas. */
const plateau = (titre, minutes) =>
  ({ type: "plateau", regime: "plateau", fiche: null, titre, minutes });

/* Mise en situation « frigoriste-détective » — on cherche, on croise, on conclut. */
const act = (fiche, minutes) => ({ type: "exercice", regime: "salle", fiche, minutes });
/* Point d'étape : un examen blanc du pack, corrigé en salle. */
const bilan = (fiche, minutes) => ({ type: "bilan", regime: "salle", fiche, minutes });

/* ---------------------------------------------------------------------
   LE CADRE — recopié du dossier, jamais ajusté pour arranger un total.
   Si le planning ne rentre pas, c'est le planning qu'on retravaille.
   --------------------------------------------------------------------- */
export const CADRE = {
  source: "habilitation-fluide/cours/CONTENU-00-PROGRESSIONS.md",
  A1: {
    total_h: 35, jours: 5, epreuve: "4 h 15",
    modules: { M0: 1, M1: 4, M2: 6, M3: 5, M4: 6, M5: 4, M6: 2, M7: 5, M8: 2 },
  },
  A2: {
    total_h: 28, jours: 4, epreuve: "3 h 55",
    modules: { M0: 1, M1: 4, M2: 5, M3: 4, M4: 5, M5: 3, M6: 2, M7: 3, M8: 1 },
  },
  titres: {
    M0: "Accueil · positionnement · sécurité générale",
    M1: "Cadre réglementaire & thermodynamique élémentaire",
    M2: "Contrôles & étanchéité",
    M3: "Gestion écologique & récupération / charge",
    M4: "Composants — les quatre, car tirage au sort",
    M5: "Tuyauterie & brasage sous azote",
    M6: "Substitution & efficacité énergétique",
    M7: "Spécifique A1 — hydrocarbures",
    M8: "Préparation à l'épreuve · blanc · remédiation",
  },
};

export const PARCOURS = {
  id: "fluides-a1-5-jours",
  titre: "Habilitation fluides frigorigènes — parcours de formation A1",
  sous_titre: "Cinq jours, 35 heures, adossés à l'autoformation avant et pendant",
  categories: ["A1", "A2", "D", "E"],
  cadre: "A1",

  /* =====================================================================
     AUTOFORMATION PRÉALABLE — hors des 35 h
     Le stagiaire reçoit le lien à l'inscription. Rien ne lui est imposé
     d'apprendre seul : ce qui est vu ici sera REPRIS en salle. Mais celui
     qui l'a lu arrive avec des questions au lieu de découvrir.
     ===================================================================== */
  amont: {
    titre: "Avant la formation — ce que le lien vous permet de préparer",
    intention:
      "Le pack s'ouvre dans un navigateur, sans installation. Deux blocs valent d'être " +
      "parcourus avant le premier jour : ce qui peut vous blesser, et ce qu'il y a dans la " +
      "bouteille. Le socle théorique (le palier, le diagramme, la surchauffe) se lit aussi " +
      "utilement en amont — il sera repris en salle, jamais supposé acquis.",
    sequences: [
      avant("s1", 25), avant("s2", 20), avant("s3", 20), avant("s4", 25), avant("s5", 25),
      avant("cl1", 30), avant("cl2", 25), avant("cl3", 35), avant("cl4", 30),
      avant("g1s", 30), avant("g1e", 30), avant("g2a", 35),
    ],
  },

  jours: [
    /* =====================================================================
       JOUR 1 — M0 (1 h) + M1 (4 h) + début M2 (2 h)  =  7 h
       ===================================================================== */
    {
      n: 1,
      titre: "Se protéger, puis comprendre de quoi on parle",
      intention:
        "La sécurité ouvre la formation : une heure, démontrée et imposée, jamais découverte " +
        "par l'erreur. Vient ensuite le cadre réglementaire et la thermodynamique qui fonde " +
        "tout le reste. Les fiches lues en amont sont REPRISES, pas relues : on questionne, " +
        "on corrige, on ancre.",
      sequences: [
        // ── M0 · 1 h — l'heure d'ouverture voulue par la charte
        { ...plateau("Accueil, positionnement, analyse de risques du plateau, EPI en place", 20), module: "M0" },
        { ...rappel("s1", 20, 3), module: "M0" },   // l'air qui manque : le danger le plus fondamental
        { ...rappel("s4", 20, 3), module: "M0" },   // ce qui éclate : on ouvrira des organes sous pression
        // ── M1 · 4 h
        { ...seq("g0", 25, 4), module: "M1" },      // vidéo attendue : le cadre réglementaire F-Gas en bref
        { ...seq("g2", 35, 5), module: "M1" },
        { ...rappel("g2a", 20, 4), module: "M1" },  // lue en amont : on en garde la frise et les dates-clés
        { ...seq("g1a", 35, 5), module: "M1" },     // vidéo attendue : le cycle frigorifique animé
        { ...rappel("g1s", 25, 3), module: "M1" },  // lue en amont : le palier, repris au tableau
        { ...seq("g1b", 45, 4), module: "M1" },     // vidéo attendue : lire un diagramme enthalpique
        { ...rappel("g1e", 25, 3), module: "M1" },  // lue en amont : la mesure se refait ici, en vrai
        { ...seq("g1c", 30, 4), module: "M1" },     // vidéo attendue : lire un code fluide (R-134a, R-410A)
        // ── M2 · 2 h sur 6 (la suite au jour 2)
        { ...seq("g1d", 30, 4), module: "M2" },     // les organes qui trahissent une fuite : la charnière
        { ...seq("g4a", 20, 3), module: "M2" },
        { ...seq("p7", 20, 2), module: "M2" },      // préparation de chantier : l'analyse de risques ouvre
        // Rattachée à M4 (composants) et non à M2 : on y repère des ORGANES,
        // c'est la première marche du module le plus lourd de la semaine.
        { ...plateau("Découverte du plateau : repérer les organes sur machine réelle", 45), module: "M4" },
      ],
    },

    /* =====================================================================
       JOUR 2 — M2 salle (2 h 50) + M3 salle (3 h) + M4 début (1 h 10) = 7 h
       Toute la théorie et toute la préparation de chantier du TP du jour 3
       se donnent ICI : on ne descend pas au plateau pour découvrir un geste.
       ===================================================================== */
    {
      n: 2,
      titre: "Tout ce qu'il faut savoir avant de toucher à la machine",
      intention:
        "La journée la plus lourde au barème, et la plus dense en salle — parce que le TP du " +
        "lendemain enchaîne d'un trait l'azote, le vide, la charge, les mesures, la " +
        "récupération et le CERFA. Rien de ce qui s'y fera ne doit être découvert là-bas.",
      sequences: [
        { ...rappel("s5", 20, 3), module: "M2" },   // sécurité du jour : consigner avant de toucher
        { ...seq("g3", 30, 4), module: "M2" },
        { ...seq("g4b", 35, 3), module: "M2" },     // vidéo attendue : méthode indirecte, relevé et interprétation
        { ...seq("g4c", 30, 4), module: "M2" },     // vidéo attendue : détecteur électronique, balayage correct
        { ...act("x4", 20), module: "M2" },
        { ...seq("p1", 15, 3), module: "M2" },      // préparation de chantier : le manifold
        { ...seq("p3", 20, 3), module: "M2" },      // préparation de chantier : pompe à vide et vacuomètre
        // ── M3 · la récupération et la charge, en entier
        { ...rappel("s2", 20, 2), module: "M3" },   // le froid brûle — on va manipuler du liquide
        { ...seq("g5a", 30, 4), module: "M3" },     // vidéo attendue : station de récupération, raccordement
        { ...seq("g5b", 40, 5), module: "M3" },
        { ...seq("p5", 25, 3), module: "M3" },      // préparation de chantier : l'ordre des vannes
        { ...seq("p2", 20, 2), module: "M3" },      // préparation de chantier : la station de récupération
        { ...seq("p6", 20, 3), module: "M3" },      // préparation de chantier : la balance et la pesée
        { ...act("x3", 25), module: "M3" },
        // ── M4 · les deux premiers composants
        { ...seq("g6", 30, 4), module: "M4" },      // vidéo attendue : les 4 technologies de compresseur
        { ...seq("g6b", 30, 4), module: "M4" },
      ],
    },

    /* =====================================================================
       JOUR 3 — LE TP INTÉGRÉ (4 h) + M4 salle (3 h)  =  7 h
       ---------------------------------------------------------------------
       Déroulé validé par F. Henninot le 27/07, sur le plateau du LP :
         « Installation sous azote, je mets les manos, je dégaze, je tire au
           vide, je charge avec la bouteille de fluide via mon dispositif, je
           fais mes mesures, je récupère le gaz, je remets de l'azote. Il y a
           bien sûr la recherche de fuite, et je fais un CERFA complet avec la
           traçabilité du fluide. Des gens théoriquement compétents : 4 h
           suffisent, une après-midi. »
       Deux temps de 2 h : sous azote, puis avec le fluide réel. Le TP tient
       d'un seul tenant — le morceler lui ferait perdre ce qu'il enseigne :
       l'enchaînement.
       ===================================================================== */
    {
      n: 3,
      titre: "Le TP de bout en bout, puis les échangeurs",
      intention:
        "Une après-midi, une machine, la chaîne complète : mise sous azote, contrôle " +
        "d'étanchéité, tirage au vide, charge pesée, relevés, récupération, remise sous azote, " +
        "et le CERFA rempli jusqu'au bout. C'est l'épreuve en conditions réelles, en plus long.",
      sequences: [
        // ── LE TP · 4 h d'un seul tenant
        { ...plateau("TP 1/2 — sous azote : installation, pose du manifold, mise en pression, " +
          "recherche de fuite au détecteur et à l'eau savonneuse, tirage au vide et tenue du vide", 120), module: "M2" },
        { ...plateau("TP 2/2 — avec le fluide : charge en phase liquide à la balance, relevés et " +
          "surchauffe, récupération complète, remise sous azote, CERFA et traçabilité du fluide", 120), module: "M3" },
        // ── M4 · les échangeurs et le détendeur
        { ...seq("g7", 25, 4), module: "M4" },
        { ...seq("g7b", 30, 4), module: "M4" },
        { ...seq("g8", 25, 4), module: "M4" },      // vidéo attendue : évaporateur et dégivrage
        { ...seq("g8b", 30, 4), module: "M4" },
        { ...act("x2", 25), module: "M4" },
        { ...seq("g9", 25, 4), module: "M4" },      // vidéo attendue : détendeur thermostatique, principe
        { ...seq("g9b", 25, 4), module: "M4" },
      ],
    },

    /* =====================================================================
       JOUR 4 — fin M4 (1 h) + M5 (4 h) + M6 (2 h)  =  7 h
       ===================================================================== */
    {
      n: 4,
      titre: "Le détendeur, le brasage, et le choix d'un fluide",
      intention:
        "Le geste de tuyauterie occupe la journée : un joint brasé étanche, sous balayage " +
        "d'azote, ne s'obtient pas du premier coup. La fin de journée prend de la hauteur — " +
        "quel fluide choisir demain, et pourquoi.",
      sequences: [
        { ...rappel("s3", 20, 3), module: "M4" },   // sécurité du jour : la flamme interdite — c'est le jour du brasage
        { ...plateau("Réglage du détendeur sur machine en marche : agir sur la surchauffe et " +
          "vérifier l'effet, mise en route et arrêt dans l'ordre du constructeur", 50), module: "M4" },
        // ── M5 · 4 h
        { ...seq("g10", 30, 3), module: "M5" },     // vidéo attendue : brasage sous azote, geste complet
        { ...seq("p4", 20, 2), module: "M5" },      // préparation de chantier : bouteille d'azote et mano-détendeur
        { ...plateau("Brasage sous balayage d'azote : réaliser un joint étanche, le contrôler", 190), module: "M5" },
        // ── M6 · 2 h
        { ...seq("g11", 35, 4), module: "M6" },
        { ...seq("g13", 25, 4), module: "M6" },
        { ...plateau("Travail dirigé : choisir un fluide de substitution et le justifier par écrit", 60), module: "M6" },
      ],
    },

    /* =====================================================================
       JOUR 5 — M7 (5 h) + M8 (2 h)  =  7 h
       ===================================================================== */
    {
      n: 5,
      titre: "Les hydrocarbures, puis l'épreuve",
      intention:
        "La spécificité d'A1, et celle qui change le plus les gestes : un fluide inflammable " +
        "ne se manipule pas comme un fluorure. La journée se termine par le blanc chronométré " +
        "et la remédiation, positionnement 0-4 à l'appui.",
      sequences: [
        { ...rappel("cl2", 20, 3), module: "M7" },  // sécurité du jour : LIE et ATEX — c'est la journée des hydrocarbures
        { ...seq("g12", 35, 4), module: "M7" },     // vidéo attendue : sécurité hydrocarbures en intervention
        { ...seq("g12b", 35, 4), module: "M7" },
        { ...act("x5", 25), module: "M7" },
        { ...plateau("Analyse de risques hydrocarbures, charge d'un circuit R-290, remplacement d'un composant", 185), module: "M7" },
        // ── M8 · 2 h
        { ...bilan("ex-ech", 25), module: "M8" },
        { ...bilan("ex-a1", 40), module: "M8" },
        { ...bilan("ex-defi", 30), module: "M8" },
        { ...plateau("Remédiation individuelle et positionnement 0-4 sur les compétences non acquises", 25), module: "M8" },
      ],
    },
  ],

  /* =====================================================================
     AUTOFORMATION PENDANT — hors des 35 h
     Le stagiaire garde le lien. Les 13 séries « Réviser par thème » et la
     carte « Ma progression » vivent là. Rien ne remonte : tout reste dans
     son navigateur.
     ===================================================================== */
  aval: {
    titre: "Pendant et après — réviser seul, à son rythme",
    intention:
      "Chaque soir, la série du thème travaillé. Entre deux périodes, « Ma progression » dit " +
      "où l'on en est, compétence par compétence. Jusqu'à l'épreuve.",
    sequences: [
      pendant("g1d", 20), pendant("g4a", 20), pendant("g5b", 25),
      pendant("g6b", 25), pendant("g9b", 25), pendant("g12b", 25),
    ],
  },
};

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
      "<p>Choisis ton parcours. Chaque fiche se lit en quelques minutes, pose une question, " +
      "et renvoie vers la fiche à revoir si la réponse est fausse. " +
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
    titre: "Catégorie A1 — tous équipements, toutes charges",
    dc: "Parcours A1",
    corps:
      "<p>Groupes évalués : <b>1, 2, 3, 4, 5, 10, 11</b>, <b>au moins un</b> des groupes composants " +
      "6/7/8/9 tiré au sort le jour de l'épreuve — donc les quatre s'apprennent — et <b>12</b> " +
      "(hydrocarbures), la nouveauté de cette catégorie.</p>" +
      "<p>Formation indicative ≈ 35 h. Épreuve : <b>4 h 15</b>.</p>",
    menu_titre: "Les modules du parcours",
    liens: [
      { vers: "g1a", icone: "1", titre: "Unités, pression, thermodynamique utile", desc: "G1 — le socle de tout le reste." },
      { vers: "g2", icone: "2", titre: "Impact environnemental et F-Gas", desc: "G2 — PRP, phase-down, ce qui justifie le métier." },
      { vers: "g3", icone: "3", titre: "Contrôles avant mise en service", desc: "G3 — épreuve à l'azote, tirage au vide." },
      { vers: "g4a", icone: "4", titre: "Contrôles d'étanchéité", desc: "G4 — trois fiches : points de fuite, indirecte, directe." },
      { vers: "g5a", icone: "5", titre: "Récupération et charge", desc: "G5 — deux fiches : récupérer, puis charger sans perte." },
      { vers: "g6", icone: "6", titre: "Les quatre composants", desc: "G6 à G9 — compresseur, condenseur, évaporateur, détendeur." },
      { vers: "g10", icone: "10", titre: "Tuyauterie et brasage sous azote", desc: "G10 — un joint étanche, sans calamine." },
      { vers: "g11", icone: "11", titre: "Substitution et efficacité", desc: "G11 — choisir un fluide, gagner du rendement." },
      { vers: "g12", icone: "12", titre: "Hydrocarbures", desc: "G12 — spécifique A1 et A2 : le R-290 est A3.", primaire: true },
      { vers: "g13", icone: "ℹ", titre: "CO₂ et NH₃ — information", desc: "G13/G14 — reconnaître, ne pas intervenir." },
      { vers: "ex-a1", icone: "📝", titre: "Examen blanc A1", desc: "20 questions tirées de tous les groupes." },
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
      { vers: "g1a", icone: "1", titre: "Unités, pression, thermodynamique utile", desc: "G1 — insister sur les seuils de charge." },
      { vers: "g2", icone: "2", titre: "Impact environnemental et F-Gas", desc: "G2 — PRP et tonnes équivalent CO₂." },
      { vers: "g3", icone: "3", titre: "Contrôles avant mise en service", desc: "G3 — sur petits circuits, raccords flare." },
      { vers: "g4a", icone: "4", titre: "Contrôles d'étanchéité", desc: "G4 — trois fiches." },
      { vers: "g5a", icone: "5", titre: "Récupération et charge", desc: "G5 — petites quantités : la pesée devient critique." },
      { vers: "g6", icone: "6", titre: "Les quatre composants", desc: "G6 à G9 — groupes hermétiques, monoblocs." },
      { vers: "g10", icone: "10", titre: "Tuyauterie et brasage sous azote", desc: "G10 — petits diamètres." },
      { vers: "g11", icone: "11", titre: "Substitution et efficacité", desc: "G11 — conception à charge réduite." },
      { vers: "g12", icone: "12", titre: "Hydrocarbures", desc: "G12 — cœur du parc A2 (R-290 en monobloc et PAC).", primaire: true },
      { vers: "ex-a2", icone: "📝", titre: "Examen blanc A2", desc: "15 questions tirées de tous les groupes." },
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
      { vers: "g1a", icone: "1", titre: "Bases : fluides, thermo utile, composants", desc: "G1 partiel — savoir de quoi on parle." },
      { vers: "g2", icone: "2", titre: "Enjeu environnemental", desc: "G2 — pourquoi on ne rejette pas." },
      { vers: "g5a", icone: "5", titre: "Récupérer sans émettre", desc: "G5 — le cœur du métier D.", primaire: true },
      { vers: "g5b", icone: "5", titre: "Peser, stocker, tracer", desc: "G5 — la balance et le registre." },
      { vers: "g3", icone: "3", titre: "Pompe à vide (code 3.03 seul)", desc: "G3 partiel — le seul code du groupe 3 dans le champ D." },
      { vers: "g11", icone: "11", titre: "Substitution — notions", desc: "G11 partiel (11.01 · 11.05)." },
      { vers: "ex-d", icone: "📝", titre: "Examen blanc D", desc: "10 questions sur le périmètre D." },
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
      { vers: "g1a", icone: "1", titre: "Bases : pression, température, fluides", desc: "G1 partiel — dont la pression absolue." },
      { vers: "g1b", icone: "1", titre: "Lire une table de saturation", desc: "G1 · code 1.03 — indispensable à la méthode indirecte.", primaire: true },
      { vers: "g2", icone: "2", titre: "Enjeu environnemental", desc: "G2 — pourquoi une fuite compte." },
      { vers: "g4a", icone: "4", titre: "Où fuit une installation ?", desc: "G4 — points de fuite et registre." },
      { vers: "g4b", icone: "4", titre: "Méthode indirecte", desc: "G4 — mesurer, comparer, interpréter." },
      { vers: "g4c", icone: "4", titre: "Méthode directe et consignation", desc: "G4 — détecteur, traceur, registre." },
      { vers: "g11", icone: "11", titre: "Substitution — notions", desc: "G11 partiel (11.01)." },
      { vers: "ex-e", icone: "📝", titre: "Examen blanc E", desc: "10 questions sur le périmètre E." },
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
    id: "g1a",
    type: "cours",
    titre: "Unités, pression, thermodynamique utile",
    dc: "G1 · codes 1.01 · 1.02 · 1.04",
    illus: "svg/croix-frigoriste.svg",
    minuteur_s: 300,
    corps:
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
    liens: [suite("g2", "Impact environnemental"), SOMMAIRE],
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
    id: "g2",
    type: "cours",
    titre: "Impact environnemental et F-Gas",
    dc: "G2 · codes 2.01 · 2.02",
    minuteur_s: 300,
    corps:
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
    ressources: ["r-mollier"],
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
    dc: "G4 · codes 4.07 · 4.08 · 4.09",
    minuteur_s: 330,
    corps:
      "<p>La méthode directe <b>localise physiquement</b> la fuite. Pour la catégorie E, elle se " +
      "pratique <b>sans accéder au circuit</b> : c'est le code <b>4.07</b>. Le code 4.06, qui suppose " +
      "d'intervenir dans le circuit, n'est pas dans le champ de la catégorie E.</p>" +
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
      { code: "4.07", libelle: "Mettre en œuvre la méthode directe sans intervenir dans le circuit", etat: "a_evaluer" },
      { code: "4.08", libelle: "Utiliser un détecteur électronique de fuites", etat: "a_evaluer" },
      { code: "4.09", libelle: "Consigner le contrôle dans le registre", etat: "a_evaluer" },
    ],
    liens: [suite("g5a", "Récupérer sans émettre"), SOMMAIRE],
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
    id: "g5a",
    type: "cours",
    titre: "Récupérer sans émettre",
    dc: "G5 · codes 5.01 → 5.04",
    minuteur_s: 360,
    corps:
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
      "<p>Pour charger, on détermine d'abord l'<b>état du fluide</b> et la <b>quantité prévue</b> " +
      "(plaque signalétique, doc constructeur). La charge se contrôle à la <b>balance</b>, jamais " +
      "« au manomètre » : le manomètre dit comment la machine se comporte, la balance dit combien " +
      "on a mis.</p>" +
      "<p>Cas particulier des <b>mélanges zéotropes</b> : ils se chargent en <b>phase liquide</b>, " +
      "faute de quoi les composants se séparent et la composition du circuit dérive.</p>" +
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
    ],
    liens: [suite("g6", "Le compresseur"), SOMMAIRE],
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
    id: "g6",
    type: "cours",
    titre: "Le compresseur",
    dc: "G6 · codes 6.01 → 6.08",
    minuteur_s: 300,
    corps:
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
    liens: [suite("g7", "Le condenseur"), SOMMAIRE],
    notes_pilote:
      "Rappeler que le composant est TIRÉ AU SORT à l'épreuve : les quatre modules se travaillent. " +
      "Faire repérer les organes de sécurité sur un compresseur d'atelier, coffret ouvert et CONSIGNÉ. " +
      "Pédagogie de la découverte : faire mesurer une surchauffe anormalement élevée sans donner la " +
      "cause, laisser remonter vers l'hypothèse retour d'huile ou clapet usé.",
  },
  {
    id: "g7",
    type: "cours",
    titre: "Le condenseur",
    dc: "G7 · codes 7.01 → 7.10",
    minuteur_s: 300,
    corps:
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
    liens: [suite("g8", "L'évaporateur"), SOMMAIRE],
    notes_pilote:
      "Faire mesurer HP, BP et sous-refroidissement AVANT de donner la plage attendue, puis confronter " +
      "au repère 4-8 K. La purge des incondensables se fait sur poste dédié, avec récupération, sous " +
      "consigne stricte. Rappeler à chaque séance : jamais d'oxygène ni d'air comprimé pour un contrôle " +
      "d'étanchéité — en présence d'huile, c'est un risque d'explosion.",
  },
  {
    id: "g8",
    type: "cours",
    titre: "L'évaporateur",
    dc: "G8 · codes 8.01 → 8.11",
    minuteur_s: 300,
    corps:
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
    liens: [suite("x2", "Exercice : diagnostic"), SOMMAIRE],
    notes_pilote:
      "Faire relever la surchauffe sur banc réel : manomètre + sonde de contact, puis calcul. " +
      "C'est le geste le plus discriminant de tout le référentiel composants. Faire observer le " +
      "givrage en direct avant d'expliquer le mécanisme. Anecdote utile : un bac de condensats bouché " +
      "a masqué une fuite pendant des semaines — d'où l'inspection visuelle systématique (8.09).",
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
    dc: "G9 · codes 9.01 → 9.10",
    minuteur_s: 300,
    corps:
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
    liens: [suite("g10", "Tuyauterie et brasage"), SOMMAIRE],
    notes_pilote:
      "Faire manipuler un détendeur mécanique démonté, vis de réglage visible, AVANT d'aborder " +
      "l'électronique : le geste ancre la notion, le paramétrage logiciel l'abstrait. Faire chercher " +
      "la valeur de consigne sur la notice constructeur plutôt que de la donner — cohérent avec la " +
      "règle du zéro invention. Ce chapitre est un carrefour : le relier à G4 (étanchéité), G8 " +
      "(surchauffe) et G11 (efficacité).",
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
    dc: "G11 · codes 11.01 → 11.05",
    minuteur_s: 300,
    corps:
      "<p>Remplacer un fluide à fort PRP se fait dans deux directions : les <b>fluides naturels</b> " +
      "(CO₂, ammoniac, hydrocarbures) et les fluides de synthèse à faible PRP (<b>HFO</b>, HFC bas PRP). " +
      "Il n'existe <b>pas de fluide universel</b> : le choix dépend de l'application, du climat, et de " +
      "la sécurité du site.</p>" +
      "<p>La <b>classe de sécurité NF EN 378</b> commande tout le reste — EPI, zonage, détection, " +
      "charge admissible dans le local : <b>A1</b> (CO₂), <b>A2L</b> (R-32, R-1234yf), <b>A3</b> " +
      "(R-290), <b>B2L</b> (NH₃).</p>" +
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
      { code: "11.01", libelle: "Connaître les technologies de substitution et leur manipulation sans danger", etat: "a_evaluer" },
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
    dc: "G12 · codes 12.01 → 12.14",
    minuteur_s: 360,
    corps:
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
      "rapport.</p>",
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
      { code: "12.02", libelle: "Appliquer les règles de sécurité outils, EPI et détection gaz", etat: "a_evaluer" },
      { code: "12.03", libelle: "Déterminer la charge admissible", etat: "a_evaluer" },
      { code: "12.04", libelle: "Réaliser l'analyse de risques avant intervention", etat: "a_evaluer" },
      { code: "12.06", libelle: "Récupérer et inerter à l'azote", etat: "a_evaluer" },
    ],
    liens: [suite("g13", "CO₂ et NH₃ — information"), SOMMAIRE],
    notes_pilote:
      "Module le plus important d'A1 et d'A2 — c'est la nouveauté du référentiel, et le parc A2 y est " +
      "largement passé. Faire manipuler le raccord spécifique hydrocarbure et le comparer physiquement " +
      "au raccord HFC : la confusion se prévient par le geste, pas par le discours. Faire chercher la " +
      "charge maximale sur une VRAIE plaque signalétique avant d'énoncer la règle. Répéter " +
      "« jamais de flamme, jamais d'oxygène » à chaque manipulation, jusqu'au réflexe.",
  },

  /* ==================================================================
     G13 / G14 — CO₂ et NH₃ : information
     ================================================================== */
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

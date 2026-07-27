/* =====================================================================
   sons.js — QUEL SON, À QUELLE MILLISECONDE, SUR QUELLE PLANCHE
   ---------------------------------------------------------------------
   Les planches sont insérées en <img> : le navigateur ne donne aucun accès
   à leur horloge SMIL. On ne peut donc pas « écouter » l'animation pour
   placer un son sur un événement. Cette table porte les instants RELEVÉS
   DANS LE SVG (les attributs `begin` des <animate>), et moteur/sons.js les
   programme sur l'horloge audio au moment où l'animation (re)démarre.

   ⚠️ Modifier les temps d'une planche oblige à reprendre sa ligne ici.
   `node build/sons.mjs` compare les deux et signale tout son programmé
   après la fin de son animation, ou dont le nom n'existe pas au catalogue.

   PARCIMONIE — une planche sans ligne ici est une planche muette, et c'est
   très bien : le silence est le réglage par défaut du métier.

   Format : "fichier.svg": [ { t: millisecondes, son: "nom", volume: 0-1 } ]
   Les noms sont ceux du catalogue de `moteur/sons.js` (pack V2) :
     calculés  vanne · validation · erreur · transition · alarme · fuite · coeur
     fichiers  pas · chute · compresseur · musique
   ===================================================================== */
window.PILOTE_SONS = {
  dossier: "packs/fluides/res/audio/",

  /* Le son est COUPÉ par défaut. On ne surprend jamais quelqu'un qui ouvre
     une fiche en salle, devant un groupe, ou dans un train. */
  actif_par_defaut: false,

  planches: {
    /* ------------------------------------------------------------------
       SÉCURITÉ — la dramaturgie est assumée ici, et seulement ici.
       ------------------------------------------------------------------ */

    /* Le double accident (17,2 s). Scénario du pack sonore : pas dans
       l'escalier → choc au moment exact de la chute → le signal continu →
       et tout recommence pour le collègue qui descend le chercher.
       Repères SVG : victime 1 à 5,4 s · victime 2 à 11,6 s · fin 17,2 s. */
    "s1-double-accident.svg": [
      { t: 1000, son: "pas", volume: 0.7 },
      { t: 5400, son: "chute", volume: 0.9 },
      { t: 7000, son: "coeur", volume: 0.55 },
      { t: 11600, son: "pas", volume: 0.7 },
      { t: 14900, son: "chute", volume: 0.9 },
    ],

    /* La bouteille qui éclate (7,7 s) — l'impact tombe sur les éclats. */
    "secu-bouteille.svg": [
      { t: 4400, son: "chute", volume: 0.85 },
    ],

    /* Le jet qui s'ouvre quand on desserre (7,1 s). */
    "secu-projection.svg": [
      { t: 600, son: "fuite", volume: 0.6 },
    ],

    /* Le chalumeau s'allume, puis les fumées montent vers le visage (8,5 s). */
    "secu-flamme.svg": [
      { t: 1000, son: "fuite", volume: 0.45 },
      { t: 3800, son: "alarme", volume: 0.6 },
    ],

    /* Les cinq étapes de consignation s'allument une à une (5,0 s).
       Un clic par étape : le geste s'entend, et la dernière valide. */
    "secu-consignation.svg": [
      { t: 400, son: "vanne", volume: 0.6 },
      { t: 1100, son: "vanne", volume: 0.6 },
      { t: 1800, son: "vanne", volume: 0.6 },
      { t: 2500, son: "vanne", volume: 0.6 },
      { t: 3100, son: "vanne", volume: 0.6 },
      { t: 4300, son: "validation", volume: 0.7 },
    ],

    /* Le CO₂ qui remplit le local par le bas (boucle de 11 s) : un seul
       souffle au départ. Une boucle sonore continue serait insupportable. */
    "co2-point-bas.svg": [
      { t: 500, son: "fuite", volume: 0.5 },
    ],

    /* L'introduction du module sécurité, 4 scènes enchaînées (16,5 s). */
    "intro-securite.svg": [
      { t: 4900, son: "transition", volume: 0.5 },
      { t: 9400, son: "transition", volume: 0.5 },
      { t: 15700, son: "transition", volume: 0.5 },
    ],

    /* Le local CO₂ équipé : préalarme, puis évacuation (cl4). */
    "co2-protection.svg": [
      { t: 3000, son: "alarme", volume: 0.5 },
    ],

    /* ------------------------------------------------------------------
       TECHNIQUE — rare et synchronisé, jamais d'ambiance permanente.
       ------------------------------------------------------------------ */

    /* L'ordre des vannes (12,8 s) : un clic par étape, validation à la fin.
       C'est la planche où le son sert le plus — le geste EST un clic. */
    "ordre-vannes.svg": [
      { t: 1000, son: "vanne", volume: 0.7 },
      { t: 2900, son: "vanne", volume: 0.7 },
      { t: 4900, son: "vanne", volume: 0.7 },
      { t: 7400, son: "vanne", volume: 0.7 },
      { t: 9800, son: "vanne", volume: 0.7 },
      { t: 12200, son: "validation", volume: 0.7 },
    ],

    /* Le tirage au vide (14,0 s) : la pompe tourne, puis la courbe de fuite
       remonte — c'est le moment où l'on comprend que ça ne tient pas. */
    "tirage-au-vide.svg": [
      { t: 800, son: "compresseur", volume: 0.35 },
      { t: 10200, son: "erreur", volume: 0.6 },
    ],

    /* La pesée (15,5 s) : rien pendant, la validation quand on note. */
    "pesee-charge.svg": [
      { t: 14800, son: "validation", volume: 0.7 },
    ],

    /* Le manifold (boucle) : un clic à chaque ouverture de robinet. */
    "manifold-lecture.svg": [
      { t: 1500, son: "vanne", volume: 0.55 },
    ],
  },
};

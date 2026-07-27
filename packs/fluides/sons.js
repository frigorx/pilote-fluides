/* =====================================================================
   sons.js — QUEL SON, À QUELLE SECONDE, SUR QUELLE PLANCHE
   ---------------------------------------------------------------------
   Les planches sont insérées en <img> : le navigateur ne donne aucun accès
   à leur horloge SMIL. On ne peut donc pas « écouter » l'animation pour
   placer un son sur un événement. Cette table porte les instants RELEVÉS
   DANS LE SVG (les attributs `begin` des <animate>), et moteur/sons.js les
   programme au moment où l'animation (re)démarre.

   ⚠️ Modifier les temps d'une planche oblige à reprendre sa ligne ici.
   `node build/sons.mjs` compare les deux et signale tout son programmé
   après la fin de son animation, ou sur un fichier absent.

   PARCIMONIE — note d'intention du pack sonore, point 6 : sur les planches
   techniques, les bruitages sont rares et synchronisés avec l'action. Une
   planche sans ligne ici est une planche muette, et c'est très bien : le
   silence est le réglage par défaut du métier.

   Format : "fichier.svg": [ [seconde, "son", volume?], … ]
   Le volume est facultatif (1 par défaut, de 0 à 1).
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

    /* Le double accident (17,2 s). Scénario donné avec le pack sonore :
       pas dans l'escalier → choc au moment exact de la chute → le signal
       continu → et tout recommence pour le collègue qui descend le chercher.
       Repères SVG : victime 1 à 5,4 s · victime 2 à 11,6 s · fin 17,2 s. */
    "s1-double-accident.svg": [
      [1.0, "pas_escalier", 0.7],
      [5.4, "chute_choc", 0.9],
      [7.0, "coeur_ralentit_bip_continu", 0.55],
      [11.6, "pas_escalier", 0.7],
      [14.9, "chute_choc", 0.9],
    ],

    /* La bouteille qui éclate (7,7 s) — l'impact tombe sur les éclats. */
    "secu-bouteille.svg": [
      [4.4, "chute_choc", 0.85],
    ],

    /* Le jet qui s'ouvre quand on desserre (7,1 s). */
    "secu-projection.svg": [
      [0.6, "fuite_souffle", 0.6],
    ],

    /* Le chalumeau s'allume, puis les fumées montent vers le visage (8,5 s). */
    "secu-flamme.svg": [
      [1.0, "fuite_souffle", 0.45],
      [3.8, "alarme_danger", 0.6],
    ],

    /* Les cinq étapes de consignation s'allument une à une (5,0 s).
       Un clic par étape : le geste s'entend, et la dernière valide. */
    "secu-consignation.svg": [
      [0.4, "vanne_clic", 0.6],
      [1.1, "vanne_clic", 0.6],
      [1.8, "vanne_clic", 0.6],
      [2.5, "vanne_clic", 0.6],
      [3.1, "vanne_clic", 0.6],
      [4.3, "validation", 0.7],
    ],

    /* Le CO₂ qui remplit le local par le bas (boucle de 11 s) : un seul
       souffle au départ. Une boucle sonore continue serait insupportable. */
    "co2-point-bas.svg": [
      [0.5, "fuite_souffle", 0.5],
    ],

    /* L'introduction du module sécurité, 4 scènes enchaînées (16,5 s). */
    "intro-securite.svg": [
      [4.9, "transition", 0.5],
      [9.4, "transition", 0.5],
      [15.7, "transition", 0.5],
    ],

    /* ------------------------------------------------------------------
       TECHNIQUE — rare et synchronisé, jamais d'ambiance permanente.
       ------------------------------------------------------------------ */

    /* L'ordre des vannes (12,8 s) : un clic par étape, validation à la fin.
       C'est la planche où le son sert le plus — le geste EST un clic. */
    "ordre-vannes.svg": [
      [1.0, "vanne_clic", 0.7],
      [2.9, "vanne_clic", 0.7],
      [4.9, "vanne_clic", 0.7],
      [7.4, "vanne_clic", 0.7],
      [9.8, "vanne_clic", 0.7],
      [12.2, "validation", 0.7],
    ],

    /* Le tirage au vide (14,0 s) : la pompe tourne, puis la courbe de fuite
       remonte — c'est le moment où l'on comprend que ça ne tient pas. */
    "tirage-au-vide.svg": [
      [0.8, "compresseur_ambiance", 0.35],
      [10.2, "erreur", 0.6],
    ],

    /* La pesée (15,5 s) : rien pendant, la validation quand on note. */
    "pesee-charge.svg": [
      [14.8, "validation", 0.7],
    ],
  },
};

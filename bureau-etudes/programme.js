/* Bureau d'études : le programme du réseau (30/10/2026).
   Source unique des 34 stations : ligne, clé d'adresse, titre court du plan, volets,
   fiche du livre, état. Le plan (carte.js), le catalogue et les tests le lisent ; on ne
   recopie ces données nulle part ailleurs.
   Origine : CADRAGE.md du 29/10/2026, parties C.1 à C.8 et E.2.
   États : "a-venir" (rien d'écrit), "relecture" (en ligne, noindex), "en-ligne".
   Volets : M = maison (FZK-Haus), T = tertiaire (clinique). */
(function () {
  "use strict";

  const LIGNES = [
    {code: "E", nom: "Données d'entrée", detail: "climat et consignes", couleur: "#637285"},
    {code: "T", nom: "Thermique", detail: "déperditions, bilan d'été, la machine", couleur: "#c9451a"},
    {code: "A", nom: "Aéraulique", detail: "air humide, débits, gaines, CTA", couleur: "#3d7fca"},
    {code: "H", nom: "Hydraulique", detail: "émetteurs, réseau d'eau, pompe, ECS", couleur: "#0c4b88"},
    {code: "F", nom: "Frigorifique", detail: "système, cycle, charge, eau glacée", couleur: "#706eed"},
    {code: "R", nom: "Régulation et énergie", detail: "loi d'eau, CTA, supervision, l'année", couleur: "#1e7e54"}
  ];

  /* [code, clé, titre court du plan, bâtiments possibles, fiche du livre, chapitre du livre, ce que l'on rend]
     Les niveaux (décision 26 du 30/10) : 1 guidé et 2 autonome sur la maison, 3 type BTS sur le
     bâtiment d'un sujet de BTS, dans la partie réservée aux classes. `volets` garde les bâtiments
     possibles (M maison, T tertiaire) : une station « T » n'a pas de niveau maison. */
  const MT = ["M", "T"], T = ["T"];
  /* Stations écrites : leur état ; les autres sont « a-venir ». */
  const OUVERTES = {T1: "relecture"};
  const STATIONS = [
    ["D0", "d0-dossier-projet", "Le dossier projet", MT, 1, 0, "Lire le dossier et la maquette, remplir la carte d'identité du bâtiment."],
    ["E1", "e1-climat-site", "Le climat du site", MT, 2, 1, "Trouver la zone, la température de base et les données d'été du site, avec leurs sources."],
    ["E2", "e2-conditions-interieures", "Conditions intérieures", MT, 3, 1, "Établir le tableau des locaux : consignes d'hiver et d'été, occupation, air neuf."],
    ["T1", "t1-surfaces-volumes", "Surfaces et volumes", MT, 4, 2, "Relever les parois par local et par orientation, les planchers et les volumes."],
    ["T2", "t2-parois-coefficient-u", "Les parois, le U", MT, 5, 2, "Calculer le coefficient U de chaque paroi, couche par couche."],
    ["T3", "t3-deperditions-local", "Déperditions d'un local", MT, 6, 2, "Calculer les déperditions d'un local par ses parois."],
    ["T4", "t4-deperditions-air", "Déperditions par l'air", MT, 7, 2, "Calculer les déperditions par le renouvellement d'air et les infiltrations."],
    ["T5", "t5-bilan-hiver", "Le bilan d'hiver", MT, 8, 2, "Faire le bilan d'hiver du bâtiment et trouver la puissance à installer."],
    ["T6", "t6-ete-vitrages-soleil", "Été 1 : le soleil", MT, 9, 3, "Calculer les apports solaires par les vitrages, à l'heure de pointe."],
    ["T7", "t7-ete-apports-internes", "Été 2 : apports internes", MT, 10, 3, "Calculer les apports des occupants, de l'éclairage et des parois en été."],
    ["T8", "t8-ete-air-neuf-synthese", "Été 3 : la synthèse", MT, 11, 3, "Ajouter l'air neuf et faire la synthèse du bilan d'été."],
    ["T9", "t9-machine-puissance-choix", "La machine", MT, 12, 3, "Choisir la machine et corriger sa puissance aux conditions du site."],
    ["A1", "a1-air-humide", "L'air humide", MT, 13, 4, "Placer un point et tracer une évolution sur le diagramme de l'air humide."],
    ["A2", "a2-debits-projet", "Les débits du projet", MT, 14, 4, "Établir les débits d'air de chaque local et l'équilibre du bâtiment."],
    ["A3", "a3-reseau-gaines", "Le réseau de gaines", MT, 15, 4, "Dimensionner le réseau de gaines et trouver le tronçon le plus défavorisé."],
    ["A4", "a4-ventilateur-caisson", "Ventilateur, caisson", MT, 16, 4, "Choisir le ventilateur sur sa courbe, et le caisson."],
    ["A5", "a5-cta-composer", "CTA 1 : composer", T, 17, 4, "Composer la CTA et calculer ses batteries et son récupérateur."],
    ["A6", "a6-cta-selectionner", "CTA 2 : sélectionner", T, 18, 4, "Comparer deux centrales et justifier la sélection."],
    ["H1", "h1-puissance-debit-regime", "Puissance et débit", MT, 19, 5, "Calculer le débit d'eau de chaque circuit à partir de la puissance et du régime."],
    ["H2", "h2-emetteurs", "Les émetteurs", MT, 20, 5, "Choisir et sélectionner les émetteurs au régime réel."],
    ["H3", "h3-reseau-eau", "Le réseau d'eau", MT, 21, 5, "Dimensionner le réseau d'eau et son circuit le plus défavorisé."],
    ["H4", "h4-pompe-vase-soupape", "Pompe, vase, soupape", MT, 22, 5, "Choisir la pompe, le vase d'expansion et la soupape."],
    ["H5", "h5-equilibrage-schema", "Équilibrage, schéma", MT, 23, 5, "Équilibrer les circuits et tracer le schéma de principe."],
    ["H6", "h6-eau-chaude-sanitaire", "L'eau chaude sanitaire", MT, 24, 5, "Calculer les besoins d'eau chaude sanitaire et choisir la production."],
    ["F1", "f1-besoin-systeme", "Besoin et système", MT, 25, 6, "Choisir entre détente directe et eau glacée, critères à l'appui."],
    ["F2", "f2-cycle-diagramme", "Le cycle", MT, 26, 6, "Tracer le cycle sur le diagramme et lire les puissances et le COP."],
    ["F3", "f3-machine-conditions-reelles", "La machine au réel", MT, 27, 6, "Sélectionner la machine aux conditions réelles du projet."],
    ["F4", "f4-liaisons-charge", "Liaisons et charge", MT, 28, 6, "Calculer les liaisons et la charge, vérifier la charge maximale."],
    ["F5", "f5-eau-glacee", "L'eau glacée", T, 29, 6, "Dimensionner le circuit d'eau glacée et son ballon tampon."],
    ["R1", "r1-reguler-chauffage", "Réguler le chauffage", MT, 30, 7, "Régler la loi d'eau et représenter la régulation du chauffage."],
    ["R2", "r2-reguler-cta", "Réguler la CTA", T, 31, 7, "Écrire la séquence de régulation de la CTA."],
    ["R3", "r3-supervision", "La supervision", T, 32, 7, "Lire un synoptique de supervision : points, consignes, alarmes."],
    ["R4", "r4-energie-annee", "L'énergie sur l'année", MT, 33, 7, "Calculer la consommation annuelle, son coût et ses émissions."],
    ["R5", "r5-note-de-calcul", "La note de calcul", MT, 34, 8, "Assembler la note de calcul du projet, hypothèses et sources comprises."]
  ].map(([code, cle, titre, volets, fiche, chapitre, rendu]) => ({
    code, cle, titre, volets, rendu, livre: {fiche, chapitre},
    ligne: code === "D0" ? "D" : code[0],
    etat: OUVERTES[code] || "a-venir",
    href: `stations/${cle}/`
  }));

  /* Gare centrale D0, terminus commun R5 (il appartient à la ligne R). */
  const GARE = "D0", TERMINUS = "R5";

  window.BE_PROGRAMME = {LIGNES, STATIONS, GARE, TERMINUS,
    station: code => STATIONS.find(s => s.code === code),
    deLaLigne: ligne => STATIONS.filter(s => s.ligne === ligne)};
})();

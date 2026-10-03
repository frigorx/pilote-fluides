/* =====================================================================
   schemas.js — « Compléter le schéma » : les schémas joués
   ---------------------------------------------------------------------
   RÔLE : décrire ce que le moteur moteur/schema.js charge.
   DEUX SORTES :
   · kind "cablage" — un câblage du Câblage virtuel, chargé en direct depuis
     ../cablage-virtuel/exercices/<id>.js (window.CABLAGE_EXERCICES). Le
     moteur retire `n` symboles (jamais les bornes, la terre ni l'arrivée
     réseau) et les fait remettre sur leur repère. Rien n'est redessiné :
     la carte SVG est celle de l'exercice (convertie des .qet de F. Henninot).
   · kind "fluide" — un petit circuit décrit ici, avec des emplacements
     (slots) et des pièces (symboles de la bibliothèque curée, copiés par
     outils/copier-bibliotheque.mjs). Les deux circuits sont ceux des
     planches : la croix du frigoriste (thermo-1) et la ligne liquide dans
     l'ordre fonctionnel (a-ligne-liquide-protection).
   PIÈGE : sur un câblage, deux appareils peuvent avoir le même symbole
   (trois contacteurs) ; la validation se fait sur le TYPE du symbole, pas
   sur le repère — le repère reste affiché à côté de l'emplacement.
   ===================================================================== */
window.JR_SCHEMAS = {
  cablages: [
    { id: "cablage-1", n: 4, niveau: "Découverte", titre: "Démarrage direct : disjoncteur, contacteur, relais thermique, moteur" },
    { id: "cablage-1-commande", n: 5, niveau: "Commande", titre: "La commande du démarrage direct : marche-arrêt à auto-maintien" },
    { id: "cablage-2", n: 5, niveau: "Froid 1", titre: "Le pump-down sur bornier : thermostat, électrovanne, pressostats, compresseur" },
    { id: "cablage-7", n: 5, niveau: "Froid", titre: "Groupe frigorifique pump-down, la puissance" },
    { id: "cablage-7-commande", n: 6, niveau: "Froid", titre: "Groupe frigorifique pump-down, la commande" },
    { id: "cablage-8", n: 6, niveau: "Froid", titre: "Chambre froide négative, la puissance : compresseur, ventilateurs, dégivrage" },
    { id: "cablage-8-commande", n: 6, niveau: "Froid", titre: "Chambre froide négative, la commande : horloge de dégivrage, pump-down" },
    { id: "cablage-10", n: 5, niveau: "Examen", titre: "Sujet national EP2 2022, la puissance" },
    { id: "cablage-10-commande", n: 6, niveau: "Examen", titre: "Sujet national EP2 2022, la commande 24 V" },
    { id: "cablage-12", n: 5, niveau: "Examen", titre: "Bac 2008, la puissance : compresseur triphasé, condenseur" },
    { id: "cablage-12-commande", n: 6, niveau: "Examen", titre: "Bac 2008, la commande : horloge de dégivrage, quatre voyants" }
  ],
  /* types de symboles qu'on ne retire jamais (ils ne s'apprennent pas en les replaçant) */
  jamais: /^(src_|borne|terre$|masse)/,
  portesCablage: [
    { t: "Câblage virtuel — câbler ce schéma soi-même", h: "../cablage-virtuel/jouer.html" },
    { t: "ÉlectroRézo 5.9 — lire un schéma", h: "../electrorezo/stations/5-9-lire-un-schema/" },
    { t: "ÉlectroRézo 8.9 — les repères", h: "../electrorezo/stations/8-9-reperes/" }
  ],

  fluides: [
    { id: "croix", titre: "La croix du frigoriste : qui est où ?",
      consigne: "Le circuit tourne dans le sens des flèches. Posez le nom de chaque organe sur son symbole.",
      /* un rectangle de tuyauterie, quatre symboles aux quatre points de la croix (charte : détendeur à GAUCHE,
         compresseur à DROITE, condenseur en HAUT, évaporateur en BAS), les flèches donnent le sens */
      largeur: 480, hauteur: 360,
      tuyaux: [{ d: "M 120 60 H 360 V 300 H 120 Z" }],
      fleches: [{ x: 240, y: 60, r: 180 }, { x: 120, y: 180, r: 90 }, { x: 240, y: 300, r: 0 }, { x: 360, y: 180, r: -90 }],
      fixes: [
        { lib: "frigo_schema/echangeur_a_air", x: 240, y: 60, w: 70, h: 56 },
        { lib: "frigo_schema/compresseur_general", x: 360, y: 180, w: 60, h: 60 },
        { lib: "frigo_schema/echangeur_a_air", x: 240, y: 300, w: 70, h: 56 },
        { lib: "frigo_schema/detendeur_thermo_int", x: 120, y: 180, w: 60, h: 60 }
      ],
      slots: [
        { id: "condenseur", x: 240, y: 20, w: 150, h: 34 },
        { id: "compresseur", x: 420, y: 240, w: 110, h: 34 },
        { id: "evaporateur", x: 240, y: 340, w: 150, h: 34 },
        { id: "detendeur", x: 60, y: 240, w: 110, h: 34 }
      ],
      pieces: [
        { id: "condenseur", txt: "Condenseur" }, { id: "compresseur", txt: "Compresseur" },
        { id: "evaporateur", txt: "Évaporateur" }, { id: "detendeur", txt: "Détendeur" }
      ],
      apres: "Compresseur à droite, condenseur en haut, détendeur à gauche, évaporateur en bas : la croix se lit toujours dans ce sens.",
      portes: [{ t: "La croix du frigoriste", h: "../f/a-croix-frigoriste/" }, { t: "HabFluide — Thermodynamique utile", h: "../f/thermo-1/" }] },

    { id: "ligne-liquide", titre: "La ligne liquide, organe par organe",
      consigne: "De la sortie du condenseur jusqu'à l'évaporateur : posez chaque organe à sa place, dans l'ordre fonctionnel.",
      largeur: 560, hauteur: 200,
      tuyaux: [{ d: "M 20 100 H 540" }],
      fleches: [{ x: 60, y: 100, r: 0 }, { x: 520, y: 100, r: 0 }],
      textes: [{ x: 20, y: 60, t: "sortie du condenseur", a: "start" }, { x: 540, y: 60, t: "vers l'évaporateur", a: "end" }],
      fixes: [],
      slots: [
        { id: "reservoir", x: 120, y: 100, w: 72, h: 72 }, { id: "filtre", x: 210, y: 100, w: 72, h: 72 },
        { id: "voyant", x: 300, y: 100, w: 72, h: 72 }, { id: "electrovanne", x: 390, y: 100, w: 72, h: 72 },
        { id: "detendeur", x: 480, y: 100, w: 72, h: 72 }
      ],
      pieces: [
        { id: "reservoir", lib: "frigo_schema/bouteille_liquide", txt: "Réservoir" },
        { id: "filtre", lib: "frigo_schema/filtre_deshydrateur", txt: "Filtre déshydrateur" },
        { id: "voyant", lib: "frigo_schema/voyant_liquide", txt: "Voyant" },
        { id: "electrovanne", lib: "frigo_schema/electrovanne_frigo", txt: "Électrovanne" },
        { id: "detendeur", lib: "frigo_schema/detendeur_thermo_int", txt: "Détendeur" }
      ],
      apres: "Réservoir (stocker), filtre (retenir l'humidité), voyant (observer), électrovanne (fermer), détendeur (abaisser la pression) : chaque organe protège le suivant.",
      portes: [{ t: "La ligne liquide : chaque organe protège le suivant", h: "../f/a-ligne-liquide-protection/" }, { t: "HabFluide — La ligne liquide, organe par organe", h: "../f/detendeur-3/" }] }
  ]
};

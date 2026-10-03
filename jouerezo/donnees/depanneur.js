/* =====================================================================
   depanneur.js — « Le dépanneur » : les situations de panne
   ---------------------------------------------------------------------
   RÔLE : les cas joués par moteur/depanneur.js, dans l'esprit de
   Frigodiag (KOTZA, 1993) : une installation, un symptôme en faits, et
   le dépanneur choisit ses relevés comme sur le chantier — manifold,
   thermomètre, toucher, voyant, givre, condenseur, intensité — avant de
   conclure. Méthode : la fiche T6 de F. Henninot (constater, questionner,
   observer, hypothèses, contrôler, conclure ; croiser HP et BP ; la cause
   se prouve par une mesure) et la méthode surchauffe / sous-refroidissement
   (planche « Deux écarts, deux points de mesure », plages de RézoTools).
   LES PRESSIONS NE SONT PAS ÉCRITES ICI : elles se calculent à l'écran
   depuis les températures de saturation avec les tables CoolProp du site
   (rezotools/calculettes/cerveau_v5.js : rosée côté BP, bulle côté HP),
   et se LISENT sur le cadran (feedback « le relevé se lit sur l'instrument »).
   FORMAT d'un cas : installation, fluide (clé des tables), consigne, symptome
   (en faits), client (les quatre questions), tEvap / tCond (saturation),
   tAsp, tLiq, tRef (thermomètre), intensite (% de In plaque), voyant, evap,
   cond, toucher, panne (id de PANNES), preuve (la mesure qui tranche).
   À RELIRE PAR FRANCK : les valeurs des cas sont des valeurs d'exercice,
   cohérentes avec les plages, mais écrites par Fable (03/10/2026).
   ===================================================================== */
window.JR_DEPANNEUR = {
  plages: {
    positif: { nom: "Chambre froide positive", fluide: "R134a", fluideNom: "R-134a", consigne: "+2 °C", tEvap: [-15, -5], tCond: [30, 50], sr: [5, 10], sc: [4, 8] },
    negatif: { nom: "Chambre froide négative", fluide: "R404A", fluideNom: "R-404A", consigne: "−20 °C", tEvap: [-45, -25], tCond: [30, 55], sr: [6, 12], sc: [4, 10] }
  },
  pannes: {
    normale: { nom: "Aucune panne : l'installation fonctionne normalement", signature: "BP et HP dans les plages, surchauffe et sous-refroidissement normaux, voyant clair, givre régulier. Un compresseur qui tourne beaucoup par forte chaleur, c'est normal.", actions: ["Noter les relevés au registre", "Rassurer le client avec les chiffres"] },
    manque: { nom: "Manque de fluide (fuite)", signature: "BP basse ET HP basse, surchauffe élevée, sous-refroidissement faible ou nul, bulles au voyant, givre seulement au début de l'évaporateur, refoulement chaud.", actions: ["Recherche de fuite au détecteur, traces d'huile", "Réparer la fuite", "Tirer au vide", "Recharger, en pesant, selon la plaque"] },
    condenseur: { nom: "Condenseur encrassé ou ventilateur arrêté", signature: "HP haute, BP normale ou un peu haute, surchauffe normale, sous-refroidissement normal, refoulement très chaud, intensité en hausse, ailettes bouchées ou hélice immobile.", actions: ["Nettoyer les ailettes", "Contrôler le ventilateur (rotation, condensateur, moteur)", "Contrôler l'écart de température de l'air au condenseur", "Remesurer après réparation"] },
    detendeur: { nom: "Détendeur fermé (bulbe déchargé, pointeau bloqué)", signature: "BP basse, HP normale, surchauffe très élevée, sous-refroidissement normal, voyant clair et plein : le fluide est là, il ne passe pas. Givre au seul départ de l'évaporateur.", actions: ["Contrôler le bulbe et son contact sur le tube", "Réchauffer le bulbe à la main : la BP doit monter", "Remplacer le détendeur si le pointeau est bloqué"] },
    filtre: { nom: "Filtre déshydrateur bouché", signature: "BP basse, surchauffe élevée, sous-refroidissement normal, voyant clair. La preuve : le filtre est froid, voire givré, à sa sortie — l'écart de température au travers du filtre trahit la perte de charge.", actions: ["Mesurer l'écart de température entrée / sortie du filtre", "Remplacer le filtre", "Contrôler l'humidité au voyant après remplacement"] },
    surcharge: { nom: "Surcharge de fluide", signature: "HP haute, sous-refroidissement très élevé, surchauffe normale, voyant clair, condenseur propre. Souvent après un « rajout » de fluide.", actions: ["Récupérer l'excédent dans une bouteille, en pesant", "Remesurer le sous-refroidissement", "Noter la charge au registre"] },
    givre: { nom: "Évaporateur pris en bloc de givre (dégivrage défaillant)", signature: "BP basse, surchauffe faible, sous-refroidissement normal, bloc de givre, l'air ne passe plus, ventilateur qui souffle dans le vide.", actions: ["Dégivrer complètement", "Contrôler l'horloge et la résistance de dégivrage", "Contrôler le thermostat de fin de dégivrage"] },
    compresseur: { nom: "Compresseur qui ne comprime plus (clapets)", signature: "BP haute ET HP basse, les deux pressions se rapprochent, intensité faible, le compresseur tourne. La preuve : à l'arrêt, les pressions s'équilibrent en quelques secondes.", actions: ["Test de rendement : fermer l'aspiration, la BP doit descendre et tenir", "Mesurer l'intensité absorbée", "Remplacer le compresseur"] }
  },
  /* la liste proposée à la conclusion, toujours dans cet ordre */
  choixPannes: ["normale", "manque", "condenseur", "detendeur", "filtre", "surcharge", "givre", "compresseur"],

  cas: [
    /* ---------- chambre froide positive, R-134a ---------- */
    { id: "p-normale", inst: "positif", tChambre: 2, symptome: "Le client s'inquiète : « par cette chaleur, le compresseur tourne tout le temps ». La chambre est à +2 °C, à la consigne.",
      client: "Depuis la canicule · rien n'a changé · c'est permanent le jour · rien n'a été tenté.",
      tEvap: -10, tAsp: -3, tCond: 40, tLiq: 34, tRef: 65, intensite: 100, voyant: "clair, plein", evap: "givre fin et régulier sur toute la batterie, ventilateur en marche", cond: "ailettes propres, hélice en rotation, air de sortie tiède",
      toucher: "aspiration froide et sèche, ligne liquide tiède, refoulement chaud", panne: "normale", preuve: "tout est dans les plages : surchauffe 7 K, sous-refroidissement 6 K" },
    { id: "p-manque", inst: "positif", tChambre: 8, symptome: "La chambre est à +8 °C au lieu de +2. Le compresseur tourne sans s'arrêter.",
      client: "Depuis trois jours, en s'aggravant · rien n'a changé · c'est permanent · le client a nettoyé le condenseur, sans effet.",
      tEvap: -18, tAsp: 4, tCond: 33, tLiq: 32, tRef: 78, intensite: 85, voyant: "bulles en continu", evap: "givre seulement sur le premier tiers, le reste est sec", cond: "ailettes propres, hélice en rotation, air de sortie à peine tiède",
      toucher: "aspiration tiède, ligne liquide tiède, refoulement très chaud ; trace d'huile au raccord du détendeur", panne: "manque", preuve: "BP et HP basses toutes les deux, surchauffe 22 K, sous-refroidissement 1 K, bulles au voyant" },
    { id: "p-condenseur", inst: "positif", tChambre: 6, symptome: "La chambre est à +6 °C. Le compresseur s'arrête puis repart toutes les quelques minutes, sans atteindre la consigne.",
      client: "Depuis une semaine · rien n'a changé · surtout l'après-midi · personne n'a rien tenté.",
      tEvap: -8, tAsp: -1, tCond: 56, tLiq: 50, tRef: 95, intensite: 115, voyant: "clair, plein", evap: "givre fin et régulier, ventilateur en marche", cond: "ailettes bouchées de poussière grasse, hélice en rotation, air de sortie brûlant",
      toucher: "ligne liquide chaude, refoulement brûlant, carter du compresseur très chaud", panne: "condenseur", preuve: "HP haute avec sous-refroidissement normal et surchauffe normale : le condenseur n'évacue plus ; le pressostat HP arrête le compresseur" },
    { id: "p-detendeur", inst: "positif", tChambre: 9, symptome: "La chambre est à +9 °C. Le compresseur tourne sans arrêt et le groupe est très chaud.",
      client: "Depuis hier matin, d'un coup · rien n'a changé · c'est permanent · rien n'a été tenté.",
      tEvap: -22, tAsp: 6, tCond: 38, tLiq: 32, tRef: 88, intensite: 80, voyant: "clair, plein, sans bulle", evap: "un peu de givre au seul départ, le reste de la batterie est sec", cond: "ailettes propres, hélice en rotation, air de sortie tiède",
      toucher: "aspiration tiède, ligne liquide tiède, filtre à la même température des deux côtés", panne: "detendeur", preuve: "BP basse, surchauffe 28 K, mais sous-refroidissement normal et voyant plein : le fluide est là et ne passe pas ; filtre à température égale des deux côtés" },
    { id: "p-surcharge", inst: "positif", tChambre: 3, symptome: "La chambre tient +3 °C, mais le client trouve que « ça force » et la HP déclenche parfois.",
      client: "Depuis hier · un collègue a « rajouté du fluide » la veille · plutôt l'après-midi · rien d'autre.",
      tEvap: -9, tAsp: -3, tCond: 50, tLiq: 32, tRef: 80, intensite: 108, voyant: "clair, plein", evap: "givre fin et régulier, ventilateur en marche", cond: "ailettes propres, hélice en rotation, bas du condenseur froid au toucher",
      toucher: "ligne liquide à peine tiède, refoulement chaud", panne: "surcharge", preuve: "HP haute avec sous-refroidissement 18 K et condenseur propre : le liquide noie le bas du condenseur" },
    { id: "p-givre", inst: "positif", tChambre: 7, symptome: "La chambre est à +7 °C. On entend le ventilateur de l'évaporateur, mais il ne sort presque pas d'air.",
      client: "Depuis deux jours · rien n'a changé · c'est permanent · le client a ouvert la porte pour « laisser respirer ».",
      tEvap: -20, tAsp: -17, tCond: 38, tLiq: 32, tRef: 60, intensite: 90, voyant: "clair, plein", evap: "bloc de givre d'un bout à l'autre, les ailettes sont invisibles", cond: "ailettes propres, hélice en rotation, air de sortie tiède",
      toucher: "aspiration givrée jusqu'au compresseur, ligne liquide tiède", panne: "givre", preuve: "BP basse avec surchauffe faible (3 K) et bloc de givre : l'air ne traverse plus la batterie" },

    /* ---------- chambre froide négative, R-404A ---------- */
    { id: "n-normale", inst: "negatif", tChambre: -20, symptome: "Le gérant demande un contrôle avant l'été. La chambre est à −20 °C.",
      client: "Pas de symptôme · rien n'a changé · fonctionnement régulier · contrôle de routine.",
      tEvap: -32, tAsp: -23, tCond: 42, tLiq: 36, tRef: 85, intensite: 100, voyant: "clair, plein", evap: "givre fin et régulier, dégivrage automatique visible au programmateur", cond: "ailettes propres, hélice en rotation, air de sortie tiède",
      toucher: "aspiration très froide et givrée, ligne liquide tiède, refoulement chaud", panne: "normale", preuve: "tout est dans les plages : surchauffe 9 K, sous-refroidissement 6 K" },
    { id: "n-manque", inst: "negatif", tChambre: -12, symptome: "La chambre est à −12 °C au lieu de −20. Le compresseur ne s'arrête plus.",
      client: "Depuis cinq jours, lentement · rien n'a changé · c'est permanent · rien n'a été tenté.",
      tEvap: -40, tAsp: -14, tCond: 35, tLiq: 34, tRef: 96, intensite: 82, voyant: "bulles en continu", evap: "givre sur le premier quart seulement", cond: "ailettes propres, hélice en rotation, air de sortie à peine tiède",
      toucher: "aspiration à peine froide, ligne liquide tiède, refoulement brûlant", panne: "manque", preuve: "BP et HP basses, surchauffe 26 K, sous-refroidissement 1 K, bulles au voyant" },
    { id: "n-filtre", inst: "negatif", tChambre: -14, symptome: "La chambre est à −14 °C. Le compresseur tourne sans arrêt.",
      client: "Depuis une semaine · une intervention sur le circuit il y a un mois · c'est permanent · rien n'a été tenté.",
      tEvap: -38, tAsp: -12, tCond: 40, tLiq: 35, tRef: 92, intensite: 84, voyant: "clair, plein, pastille verte", evap: "givre au seul départ de la batterie", cond: "ailettes propres, hélice en rotation, air de sortie tiède",
      toucher: "le filtre déshydrateur est froid et givré à sa sortie, tiède à son entrée", panne: "filtre", preuve: "BP basse, surchauffe 26 K, sous-refroidissement normal, et l'écart de température au travers du filtre" },
    { id: "n-compresseur", inst: "negatif", tChambre: -10, symptome: "La chambre est à −10 °C. Le compresseur tourne, mais « il ne fait plus rien » dit le gérant.",
      client: "Depuis hier, d'un coup · rien n'a changé · c'est permanent · rien n'a été tenté.",
      tEvap: -22, tAsp: -14, tCond: 32, tLiq: 30, tRef: 48, intensite: 60, voyant: "clair, plein", evap: "givre léger, ventilateur en marche", cond: "ailettes propres, hélice en rotation, air de sortie froide",
      toucher: "refoulement à peine chaud, carter tiède ; à l'arrêt, les deux pressions s'équilibrent en quelques secondes", panne: "compresseur", preuve: "BP haute et HP basse en même temps, intensité à 60 % de la plaque, pressions qui s'équilibrent à l'arrêt" },
    { id: "n-ventilateur", inst: "negatif", tChambre: -15, symptome: "La chambre remonte à −15 °C l'après-midi. Le compresseur se coupe par moments puis repart.",
      client: "Depuis trois jours · rien n'a changé · surtout quand il fait chaud · rien n'a été tenté.",
      tEvap: -30, tAsp: -22, tCond: 60, tLiq: 54, tRef: 110, intensite: 118, voyant: "clair, plein", evap: "givre fin et régulier, ventilateur en marche", cond: "ailettes propres, hélice IMMOBILE, air de sortie brûlant, pressostat HP qui déclenche",
      toucher: "condenseur brûlant sur toute sa hauteur, refoulement brûlant", panne: "condenseur", preuve: "HP haute avec surchauffe et sous-refroidissement normaux, hélice immobile : rien n'évacue la chaleur" },
    { id: "n-surcharge", inst: "negatif", tChambre: -20, symptome: "La chambre tient −20 °C mais la HP est haute et le groupe chauffe.",
      client: "Depuis hier · on a « complété la charge » hier · permanent · rien d'autre.",
      tEvap: -31, tAsp: -23, tCond: 54, tLiq: 36, tRef: 95, intensite: 110, voyant: "clair, plein", evap: "givre fin et régulier", cond: "ailettes propres, hélice en rotation, bas du condenseur froid au toucher",
      toucher: "ligne liquide à peine tiède, bas du condenseur froid", panne: "surcharge", preuve: "HP haute avec sous-refroidissement 18 K et condenseur propre" }
  ]
};

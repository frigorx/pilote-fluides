"use strict";

/*
 * Source éditoriale du cadrage pédagogique.
 * Les futurs jeux restent décrits, pas encore développés.
 * Trois profondeurs : CAP · Bac pro · BTS/titre pro CVC — indication de niveau, sans codes.
 */

globalThis.trainingFramework = {
  version: "2026-08-23b",
  status: "cadrage",
  levels: {
    CAP: "CAP · niveau 3",
    TP: "Bac pro · niveau 4",
    BTS: "BTS / titre professionnel CVC · niveau 5"
  },
  modalities: ["THÉORIE", "SCHÉMA", "IDENTIFICATION", "TECHNOLOGIE", "RÉGLAGE", "DIAGNOSTIC", "PRATIQUE VIRTUELLE"]
};

globalThis.stationPrograms = {
  boucle: {
    formats: ["SCHÉMA", "IDENTIFICATION", "THÉORIE"],
    CAP: {
      objective: "Reconnaître le trajet de l’eau dans une boucle hydraulique simple.",
      learn: ["Nommer le départ, le retour et le sens de circulation.", "Repérer la production, la distribution et les émetteurs.", "Suivre le trajet de l’eau sur un schéma simple."],
      prompt: "Sur un schéma simple, suivez le trajet de l’eau et nommez chaque organe rencontré."
    },
    TP: {
      objective: "Lire une boucle hydraulique avant toute intervention.",
      learn: ["Repérer départ, retour et sens de circulation.", "Identifier production, distribution et émetteurs.", "Vérifier la continuité fonctionnelle du circuit."],
      prompt: "Sur un schéma incomplet, reconstruisez le trajet de l’eau et nommez chaque fonction."
    },
    BTS: {
      objective: "Analyser l’architecture fonctionnelle d’une boucle hydraulique.",
      learn: ["Distinguer architecture structurelle et fonctionnelle.", "Matérialiser les flux d’énergie.", "Justifier les limites du système étudié."],
      prompt: "À partir d’un dossier technique, produisez le synoptique fonctionnel et délimitez le système."
    },
    game: "Puzzle de schéma : replacer les tronçons, les flèches et les fonctions pour fermer la boucle.",
    virtual: "Montage virtuel avec détection des ruptures de continuité."
  },
  energie: {
    formats: ["THÉORIE", "SCHÉMA", "TECHNOLOGIE"],
    CAP: {
      objective: "Reconnaître que l’eau chaude transporte de la chaleur dans le circuit.",
      learn: ["Nommer les unités de température et de débit.", "Repérer où l’eau devient plus chaude ou plus froide.", "Lire une température sur un thermomètre avec son unité."],
      prompt: "Relevez la température de départ et de retour, puis dites laquelle est la plus chaude."
    },
    TP: {
      objective: "Relier circulation d’eau et transport de chaleur.",
      learn: ["Distinguer énergie, température et débit.", "Repérer où l’eau reçoit et cède de l’énergie.", "Employer les unités utiles sans les confondre."],
      prompt: "Expliquez oralement le trajet de l’énergie sur une installation en fonctionnement stabilisé."
    },
    BTS: {
      objective: "Établir les bilans énergétiques utiles au système hydraulique.",
      learn: ["Identifier les frontières du bilan.", "Associer flux, puissance et énergie.", "Analyser les écarts entre besoin et fourniture."],
      prompt: "Construisez le bilan d’énergie d’un sous-système et commentez les écarts observés."
    },
    game: "Chaîne d’énergie : associer source, conversion, transport, émission et pertes.",
    virtual: "Bilan dynamique simplifié d’une boucle en charge variable."
  },
  debit: {
    formats: ["THÉORIE", "MESURE", "PRATIQUE VIRTUELLE"],
    CAP: {
      objective: "Lire un débit et le comparer à la valeur attendue.",
      learn: ["Nommer l’unité du débit d’eau.", "Relever un débit sur l’appareil de mesure.", "Comparer le débit relevé à la valeur donnée."],
      prompt: "Relevez le débit au point indiqué et comparez-le à la valeur donnée sur la fiche."
    },
    TP: {
      objective: "Mesurer et interpréter un débit de circulation.",
      learn: ["Convertir les unités usuelles.", "Choisir un point et un moyen de mesure.", "Relier débit insuffisant ou excessif aux symptômes possibles."],
      prompt: "Le débit annoncé n’est pas atteint : contrôlez le relevé avant de proposer une cause."
    },
    BTS: {
      objective: "Déterminer et vérifier le débit requis d’un circuit.",
      learn: ["Relier débit, vitesse, section et puissance.", "Dimensionner à partir du besoin.", "Analyser l’incertitude et la cohérence du relevé."],
      prompt: "Calculez le débit théorique, définissez le protocole de mesure puis analysez l’écart."
    },
    game: "Débitmètre virtuel : choisir l’unité, le point de mesure et valider la cohérence.",
    virtual: "Variation du débit en fonction de la résistance et de la commande de pompe."
  },
  "delta-t": {
    formats: ["THÉORIE", "MESURE", "DIAGNOSTIC"],
    CAP: {
      objective: "Relever les températures de départ et de retour d’un circuit.",
      learn: ["Repérer le point de départ et le point de retour.", "Relever une valeur stable, pas une valeur qui bouge.", "Comparer l’écart de température à la valeur donnée."],
      prompt: "Repérez les deux points, relevez une valeur stable, puis comparez l’écart à la fiche."
    },
    TP: {
      objective: "Mesurer un écart départ-retour sans conclure trop vite.",
      learn: ["Placer correctement les sondes.", "Attendre un régime exploitable.", "Croiser ΔT, débit et état des organes."],
      prompt: "Un ΔT paraît anormal : vérifiez d’abord les points, les conditions et les autres indices."
    },
    BTS: {
      objective: "Exploiter le ΔT dans l’analyse de performance.",
      learn: ["Définir le protocole et les incertitudes.", "Relier ΔT, débit et puissance.", "Comparer mesure, consigne et calcul."],
      prompt: "Établissez un protocole de mesure du ΔT et argumentez l’acceptabilité du résultat."
    },
    game: "Placement de sondes : sélectionner les deux points qui rendent le ΔT interprétable.",
    virtual: "Courbes départ-retour avec régime transitoire puis stabilisé."
  },
  puissance: {
    formats: ["THÉORIE", "CALCUL", "PRATIQUE VIRTUELLE"],
    CAP: {
      objective: "Repérer les valeurs qui servent à connaître la puissance transportée par l’eau.",
      learn: ["Nommer le débit et l’écart de température nécessaires.", "Relever ces deux valeurs avec leurs unités.", "Signaler une valeur qui semble anormale."],
      prompt: "Relevez le débit et les deux températures, puis signalez toute valeur qui vous semble anormale."
    },
    TP: {
      objective: "Estimer la puissance transportée par l’eau.",
      learn: ["Utiliser P ≈ 1,16 × Q × ΔT.", "Vérifier unités et ordre de grandeur.", "Relier le résultat au besoin de l’installation."],
      prompt: "À partir de deux températures et d’un débit, estimez la puissance et contrôlez sa plausibilité."
    },
    BTS: {
      objective: "Dimensionner et vérifier la puissance hydraulique utile.",
      learn: ["Établir le calcul depuis le cahier des charges.", "Propager les incertitudes utiles.", "Comparer puissance appelée, fournie et mesurée."],
      prompt: "Dimensionnez le débit de projet puis définissez les mesures permettant de valider la puissance."
    },
    game: "Calcul à curseurs : atteindre une puissance cible en agissant sur Q et ΔT.",
    virtual: "Jumeau simplifié puissance-débit-températures."
  },
  mesurer: {
    formats: ["MESURE", "TECHNOLOGIE", "DIAGNOSTIC"],
    CAP: {
      objective: "Choisir un appareil adapté et noter une mesure sur une fiche.",
      learn: ["Nommer la grandeur à mesurer : température, pression ou débit.", "Contrôler l’appareil avec la fiche avant de l’utiliser.", "Relever la valeur, le point et l’unité sur la fiche."],
      prompt: "Choisissez l’appareil adapté, contrôlez-le avec la fiche, puis notez la mesure."
    },
    TP: {
      objective: "Choisir un instrument et produire un relevé exploitable.",
      learn: ["Identifier température, pression et débit à mesurer.", "Contrôler l’état et la plage de l’appareil.", "Tracer la valeur, le point, l’unité et le contexte."],
      prompt: "Préparez la fiche de relevés avant d’intervenir sur la boucle."
    },
    BTS: {
      objective: "Concevoir une stratégie de mesure adaptée à une performance.",
      learn: ["Choisir grandeurs, points et instruments.", "Définir précision et répétabilité.", "Organiser le traitement des résultats."],
      prompt: "Rédigez un protocole complet permettant de valider une performance hydraulique."
    },
    game: "Valise de mesure : sélectionner l’instrument adapté à chaque point du schéma.",
    virtual: "Relevés bruités avec choix de calibre et estimation de l’incertitude."
  },
  production: {
    formats: ["IDENTIFICATION", "TECHNOLOGIE", "SCHÉMA"],
    CAP: {
      objective: "Reconnaître les appareils qui produisent l’eau chaude ou l’eau froide.",
      learn: ["Nommer la chaudière, la pompe à chaleur et le groupe d’eau glacée.", "Repérer les tuyaux de départ et de retour.", "Montrer sur le schéma où l’eau est produite."],
      prompt: "Sur l’installation, montrez la production d’eau et nommez l’appareil concerné."
    },
    TP: {
      objective: "Identifier les productions raccordées à un réseau d’eau.",
      learn: ["Reconnaître chaudière, PAC et groupe d’eau glacée.", "Repérer leurs liaisons hydrauliques.", "Distinguer fonction, énergie et technologie."],
      prompt: "Sur le dossier d’un site, classez les producteurs et repérez leurs raccordements."
    },
    BTS: {
      objective: "Comparer des solutions de production pour un besoin donné.",
      learn: ["Décoder les données de fonctionnement.", "Comparer performances et contraintes.", "Justifier une solution technologique."],
      prompt: "Comparez deux productions et justifiez celle qui répond au cahier des charges hydraulique."
    },
    game: "Qui produit quoi ? Associer symbole, énergie, températures et usage.",
    virtual: "Sélecteur de production avec profils de charge simplifiés."
  },
  echangeur: {
    formats: ["IDENTIFICATION", "TECHNOLOGIE", "SCHÉMA"],
    CAP: {
      objective: "Reconnaître les deux circuits d’un échangeur.",
      learn: ["Nommer les quatre piquages de l’échangeur.", "Suivre le sens de circulation de chaque circuit.", "Signaler un encrassement ou un manque de débit."],
      prompt: "Repérez les quatre piquages de l’échangeur et signalez tout défaut avant le nettoyage."
    },
    TP: {
      objective: "Repérer les circuits primaire et secondaire d’un échangeur.",
      learn: ["Identifier les quatre piquages.", "Suivre les sens de circulation.", "Reconnaître encrassement, mauvais débit et air comme pistes à vérifier."],
      prompt: "Reconstituez les deux circuits puis préparez les contrôles avant nettoyage."
    },
    BTS: {
      objective: "Analyser et sélectionner un échangeur dans son système.",
      learn: ["Établir le bilan thermique.", "Relier débits, températures et pincement.", "Comparer pertes de charge et performance."],
      prompt: "À partir des quatre températures et des débits, vérifiez le service rendu par l’échangeur."
    },
    game: "Quatre piquages : raccorder primaire et secondaire sans mélanger les circuits.",
    virtual: "Échangeur réglable avec encrassement et débits variables."
  },
  circulateur: {
    formats: ["IDENTIFICATION", "TECHNOLOGIE", "RÉGLAGE", "PRATIQUE VIRTUELLE"],
    CAP: {
      objective: "Contrôler un circulateur avant et après un réglage.",
      learn: ["Repérer le sens de circulation et la commande.", "Lire les informations affichées sur le circulateur.", "Signaler un bruit anormal avant de toucher au réglage."],
      prompt: "Relevez l’état du circulateur, signalez un bruit anormal, puis rendez compte avant tout réglage."
    },
    TP: {
      objective: "Contrôler et régler un circulateur en sécurité.",
      learn: ["Identifier sens, commande et mode de régulation.", "Lire les informations disponibles.", "Vérifier l’effet d’un réglage sur débit, bruit et consommation."],
      prompt: "Le réseau est bruyant : relevez l’état du circulateur avant de modifier son réglage."
    },
    BTS: {
      objective: "Sélectionner une pompe et déterminer son point de fonctionnement.",
      learn: ["Lire courbes pompe et réseau.", "Déterminer débit et hauteur requis.", "Analyser variation de vitesse, rendement, NPSH et risque de cavitation."],
      prompt: "Sélectionnez la pompe, placez le point de fonctionnement et justifiez le mode de régulation."
    },
    game: "Courbes croisées : déplacer pompe et réseau jusqu’au point de fonctionnement demandé.",
    virtual: "Banc de pompe virtuel avec vitesse, vanne, débit, pression et rendement."
  },
  pertes: {
    formats: ["THÉORIE", "CALCUL", "SCHÉMA", "DIAGNOSTIC"],
    CAP: {
      objective: "Repérer un endroit du circuit qui freine trop l’eau.",
      learn: ["Contrôler le filtre, les vannes et les sections avec la fiche.", "Relever la pression avant et après un point du circuit.", "Comparer les deux pressions relevées."],
      prompt: "Contrôlez le filtre et les vannes avec la fiche, relevez les pressions, puis comparez-les."
    },
    TP: {
      objective: "Localiser une résistance hydraulique anormale.",
      learn: ["Distinguer pertes régulières et singulières.", "Contrôler filtre, vannes et sections.", "Comparer pression amont-aval dans un état connu."],
      prompt: "Une branche manque de débit : organisez les contrôles de pression sans remplacer au hasard."
    },
    BTS: {
      objective: "Calculer les pertes de charge et vérifier le réseau.",
      learn: ["Établir longueurs, débits et singularités.", "Calculer ou exploiter les abaques.", "Comparer calcul, mesure et hauteur disponible."],
      prompt: "Calculez le chemin critique puis définissez les mesures qui confirmeront l’hypothèse."
    },
    game: "Chasse aux pertes : identifier le chemin le plus résistant sur un réseau ramifié.",
    virtual: "Réseau avec diamètres, longueurs, singularités et prises de pression."
  },
  vase: {
    formats: ["IDENTIFICATION", "TECHNOLOGIE", "CALCUL", "DIAGNOSTIC"],
    CAP: {
      objective: "Contrôler le vase d’expansion sans toucher à la sécurité.",
      learn: ["Nommer l’eau, la membrane et le gaz du vase.", "Relever la pression à froid avec le manomètre.", "Signaler une pression qui varie beaucoup."],
      prompt: "Relevez la pression du vase à froid et signalez toute anomalie sans le régler vous-même."
    },
    TP: {
      objective: "Contrôler le vase d’expansion et son raccordement.",
      learn: ["Identifier eau, membrane et gaz.", "Repérer pression à froid et variations en service.", "Distinguer symptôme, cause et conséquence."],
      prompt: "La pression varie fortement : préparez les contrôles du vase sans neutraliser la sécurité."
    },
    BTS: {
      objective: "Dimensionner l’expansion et vérifier la plage de pression.",
      learn: ["Déterminer volume d’eau et dilatation.", "Définir pressions minimale et maximale.", "Justifier volume, précharge et point de raccordement."],
      prompt: "Dimensionnez le vase et justifiez son implantation sur le schéma de principe."
    },
    game: "Pression sous contrôle : associer volume, précharge et plage de fonctionnement.",
    virtual: "Cycle chaud-froid avec volume d’expansion et pression évolutifs."
  },
  securite: {
    formats: ["IDENTIFICATION", "TECHNOLOGIE", "SCHÉMA", "SÉCURITÉ"],
    CAP: {
      objective: "Reconnaître les organes de sécurité et ne jamais les régler seul.",
      learn: ["Nommer la soupape, le manomètre, la purge et le remplissage.", "Contrôler l’accessibilité de chaque organe avec la fiche.", "Signaler toute anomalie sans démonter la sécurité."],
      prompt: "Contrôlez les organes de sécurité avec la fiche et signalez toute anomalie au responsable."
    },
    TP: {
      objective: "Identifier et contrôler les organes de sécurité hydraulique.",
      learn: ["Repérer soupape, manomètre, purge et remplissage.", "Vérifier accessibilité et évacuation.", "Ne jamais condamner une protection pour masquer un défaut."],
      prompt: "Réalisez le contrôle visuel des sécurités et signalez toute anomalie sans les dérégler."
    },
    BTS: {
      objective: "Définir et justifier la chaîne de protection du réseau.",
      learn: ["Identifier les risques de pression et température.", "Choisir les protections adaptées.", "Intégrer prescriptions et documents réglementaires."],
      prompt: "Complétez le schéma de sécurité et justifiez chaque organe au regard du risque traité."
    },
    game: "Schéma à sécuriser : déposer les protections aux bons endroits et expliquer leur rôle.",
    virtual: "Montée en pression simulée avec protections actives ou manquantes."
  },
  monotube: {
    formats: ["SCHÉMA", "IDENTIFICATION", "TECHNOLOGIE"],
    CAP: {
      objective: "Reconnaître un réseau monotube et suivre le trajet de l’eau.",
      learn: ["Repérer la boucle principale et les dérivations.", "Suivre le trajet de l’eau le long de la boucle.", "Nommer les émetteurs raccordés sur le circuit."],
      prompt: "Suivez le trajet de l’eau sur la boucle monotube et nommez chaque émetteur rencontré."
    },
    TP: {
      objective: "Reconnaître un réseau monotube et suivre son débit.",
      learn: ["Identifier boucle principale et dérivations.", "Repérer l’influence d’un émetteur sur l’aval.", "Préparer les contrôles propres à cette architecture."],
      prompt: "Tracez le trajet de l’eau et expliquez pourquoi les conditions évoluent le long de la boucle."
    },
    BTS: {
      objective: "Analyser les limites et conditions de fonctionnement du monotube.",
      learn: ["Établir les débits dans la boucle et les dérivations.", "Analyser l’évolution des températures.", "Comparer le monotube à d’autres distributions."],
      prompt: "Analysez la distribution et justifiez son adéquation à un cahier des charges donné."
    },
    game: "Suivez l’eau : reconstituer les débits et températures d’une boucle monotube.",
    virtual: "Émetteurs successifs avec réglages et température d’entrée variables."
  },
  bitube: {
    formats: ["SCHÉMA", "IDENTIFICATION", "TECHNOLOGIE"],
    CAP: {
      objective: "Reconnaître un réseau bitube et suivre ses branches.",
      learn: ["Nommer le départ commun et le retour commun.", "Suivre chaque branche du réseau en parallèle.", "Repérer la branche la plus proche et la plus éloignée."],
      prompt: "Sur le plan, suivez chaque branche et repérez la plus éloignée du départ."
    },
    TP: {
      objective: "Reconnaître un bitube et repérer ses branches.",
      learn: ["Distinguer départ et retour communs.", "Suivre chaque branche en parallèle.", "Identifier branches favorisées et défavorisées."],
      prompt: "Sur le plan, numérotez les branches et repérez celles qui nécessiteront un contrôle d’équilibrage."
    },
    BTS: {
      objective: "Concevoir et comparer les variantes d’un réseau bitube.",
      learn: ["Analyser aller-retour direct et retour inversé.", "Déterminer les chemins critiques.", "Justifier diamètres et organes de réglage."],
      prompt: "Comparez retour direct et retour inversé puis justifiez la variante retenue."
    },
    game: "Réseau à construire : relier les émetteurs en bitube sans court-circuiter une branche.",
    virtual: "Comparaison des distributions directes et inversées."
  },
  v3v: {
    formats: ["IDENTIFICATION", "SCHÉMA", "TECHNOLOGIE", "RÉGLAGE"],
    CAP: {
      objective: "Reconnaître une vanne trois voies et lire sa position.",
      learn: ["Nommer les voies A, B et AB de la vanne.", "Lire la position de la vanne sur la commande.", "Relever la température avant et après la vanne."],
      prompt: "Repérez les voies A, B et AB, puis relevez la température avant et après."
    },
    TP: {
      objective: "Identifier le montage et contrôler une vanne trois voies.",
      learn: ["Repérer A, B et AB.", "Distinguer mélange et répartition par le schéma.", "Contrôler commande, position et températures."],
      prompt: "Avant de manœuvrer la vanne, identifiez ses voies et prédisez l’effet de la commande."
    },
    BTS: {
      objective: "Concevoir et analyser une boucle de régulation par V3V.",
      learn: ["Choisir l’architecture hydraulique.", "Dimensionner la vanne et son autorité.", "Analyser la réponse de la boucle de régulation."],
      prompt: "Définissez le montage, sélectionnez la vanne et justifiez la stratégie de régulation."
    },
    game: "Trois voies : orienter A, B et AB puis obtenir la température demandée.",
    virtual: "Boucle mélangeuse avec servomoteur et consigne variable."
  },
  equilibrage: {
    formats: ["RÉGLAGE", "MESURE", "DIAGNOSTIC", "PRATIQUE VIRTUELLE"],
    CAP: {
      objective: "Suivre une méthode simple pour équilibrer un réseau, une action à la fois.",
      learn: ["Relever le débit de chaque branche avant réglage.", "Repérer la vanne à régler, une seule à la fois.", "Comparer le débit après réglage à la valeur donnée."],
      prompt: "Réglez une vanne à la fois, relevez le débit et comparez-le à la fiche."
    },
    TP: {
      objective: "Équilibrer par actions successives et relevés.",
      learn: ["Repérer les branches défavorisées.", "Mesurer avant et après chaque action.", "Consigner positions, débits et résultats."],
      prompt: "Rétablissez les débits demandés sans modifier plusieurs organes à la fois."
    },
    BTS: {
      objective: "Établir et valider une procédure d’équilibrage.",
      learn: ["Calculer les débits de projet.", "Choisir méthode et organes.", "Analyser l’autorité, les écarts et la performance finale."],
      prompt: "Rédigez la procédure, réalisez les réglages virtuels et validez les débits finaux."
    },
    game: "Banc d’équilibrage : atteindre les trois débits cibles avec un nombre d’actions limité.",
    virtual: "Réseau ramifié avec vannes, prises de pression et temps de stabilisation."
  },
  plancher: {
    formats: ["IDENTIFICATION", "SCHÉMA", "TECHNOLOGIE", "RÉGLAGE"],
    CAP: {
      objective: "Reconnaître les boucles d’un plancher chauffant sur le collecteur.",
      learn: ["Repérer le départ, le retour et chaque boucle.", "Lire le débit affiché sur chaque débitmètre.", "Nommer la zone qui correspond à chaque boucle."],
      prompt: "Une zone ne chauffe pas : repérez sa boucle sur le collecteur et relevez son débit."
    },
    TP: {
      objective: "Contrôler collecteurs et boucles d’un plancher hydraulique.",
      learn: ["Repérer départ, retour et boucles.", "Lire débitmètres et actionneurs.", "Associer zone, boucle et symptôme."],
      prompt: "Une zone ne chauffe pas : identifiez sa boucle puis organisez les contrôles."
    },
    BTS: {
      objective: "Concevoir et régler une distribution par collecteurs.",
      learn: ["Déterminer puissances et débits des boucles.", "Vérifier longueurs et pertes de charge.", "Justifier régulation et équilibrage."],
      prompt: "Dimensionnez les boucles et préparez le tableau de réglage du collecteur."
    },
    game: "Collecteur mystère : associer locaux, boucles, débitmètres et actionneurs.",
    virtual: "Plancher multizone avec inertie, débit et commande."
  },
  releves: {
    formats: ["MESURE", "MÉTHODE", "COMMUNICATION"],
    CAP: {
      objective: "Remplir une fiche de relevés claire et complète.",
      learn: ["Nommer la date, le point et les conditions du relevé.", "Lire chaque valeur avec son unité.", "Comparer le relevé d’avant et celui d’après."],
      prompt: "Complétez la fiche avec des valeurs claires, un point précis et l’unité de chaque mesure."
    },
    TP: {
      objective: "Renseigner une fiche de relevés fiable.",
      learn: ["Noter état initial et conditions.", "Employer unités et points non ambigus.", "Comparer avant et après intervention."],
      prompt: "Complétez la fiche d’intervention avec les mesures utiles et les conditions de relevé."
    },
    BTS: {
      objective: "Traiter des mesures et présenter une conclusion argumentée.",
      learn: ["Contrôler cohérence et incertitudes.", "Représenter les résultats.", "Rédiger une synthèse exploitable par un tiers."],
      prompt: "Traitez la campagne de mesures et présentez une conclusion avec ses limites."
    },
    game: "Le relevé fiable : détecter unités, points ou conditions manquantes dans une fiche.",
    virtual: "Campagne de mesures avec données cohérentes, bruitées ou aberrantes."
  },
  tampon: {
    formats: ["IDENTIFICATION", "SCHÉMA", "TECHNOLOGIE", "CALCUL"],
    CAP: {
      objective: "Reconnaître un ballon tampon et ses piquages.",
      learn: ["Nommer les piquages du ballon et le sens de l’eau.", "Relever la température en haut et en bas du ballon.", "Signaler une eau qui circule mal dans le ballon."],
      prompt: "Repérez les piquages du ballon, relevez les températures haute et basse, puis rendez compte."
    },
    TP: {
      objective: "Identifier le rôle réel d’un volume tampon par son raccordement.",
      learn: ["Repérer les piquages et le sens des débits.", "Distinguer inertie et découplage.", "Contrôler températures, stratification et circulation."],
      prompt: "À partir des piquages, expliquez le rôle du ballon et préparez les relevés utiles."
    },
    BTS: {
      objective: "Dimensionner et intégrer un volume tampon.",
      learn: ["Relier volume, puissance et temps de cycle.", "Comparer les schémas de raccordement.", "Analyser les effets sur débits et températures."],
      prompt: "Dimensionnez le volume minimal et justifiez le raccordement retenu."
    },
    game: "Quatre piquages : retrouver la fonction du ballon à partir des flux.",
    virtual: "Cycles de production avec volume et hystérésis réglables."
  },
  decouplage: {
    formats: ["SCHÉMA", "THÉORIE", "MESURE", "PRATIQUE VIRTUELLE"],
    CAP: {
      objective: "Reconnaître un point de découplage entre deux boucles.",
      learn: ["Nommer la boucle primaire et la boucle secondaire.", "Repérer le point commun aux deux boucles.", "Relever la température de chaque boucle."],
      prompt: "Les deux circulateurs n’ont pas le même débit : repérez la boucle primaire et la secondaire."
    },
    TP: {
      objective: "Comprendre deux boucles pouvant fonctionner à des débits différents.",
      learn: ["Identifier primaire, secondaire et point de découplage.", "Suivre les quatre débits possibles.", "Interpréter les températures de mélange."],
      prompt: "Les deux circulateurs n’ont pas le même débit : tracez les flux avant de conclure."
    },
    BTS: {
      objective: "Concevoir et vérifier un découplage hydraulique.",
      learn: ["Établir les bilans de débit.", "Choisir bouteille, ballon ou collecteur adapté.", "Analyser les mélanges et pertes de performance."],
      prompt: "Comparez les débits primaire-secondaire et justifiez le dispositif de découplage."
    },
    game: "Les quatre régimes : prévoir le sens interne selon Q primaire et Q secondaire.",
    virtual: "Découplage animé avec débits et températures mesurables."
  },
  diagnostic: {
    formats: ["DIAGNOSTIC", "MESURE", "TECHNOLOGIE", "COMMUNICATION"],
    CAP: {
      objective: "Observer une panne simple et rendre compte sans intervenir seul.",
      learn: ["Nommer le symptôme observé avec des mots simples.", "Relever les mesures utiles avec la fiche d’aide.", "Signaler ce qui semble anormal à un responsable."],
      prompt: "Une branche reste froide : relevez les mesures avec la fiche, puis rendez compte à l’oral."
    },
    TP: {
      objective: "Conduire un diagnostic hydraulique sans remplacer au hasard.",
      learn: ["Décrire le symptôme et l’état initial.", "Croiser mesures, commande et position des organes.", "Vérifier l’hypothèse avant réparation."],
      prompt: "À partir d’une branche froide, construisez l’arbre de contrôles et rendez compte de l’hypothèse."
    },
    BTS: {
      objective: "Établir une démarche de diagnostic et une action corrective justifiée.",
      learn: ["Analyser les indicateurs et leurs dérives.", "Hiérarchiser les hypothèses.", "Concevoir puis valider l’action corrective."],
      prompt: "Établissez le diagnostic à partir du dossier et des mesures, puis défendez l’action corrective."
    },
    game: "Enquête hydraulique : demander les mesures pertinentes avec un budget d’actions limité.",
    virtual: "Pannes injectables, mesures concordantes et arbre d’hypothèses."
  },
  mission: {
    formats: ["SCHÉMA", "IDENTIFICATION", "CALCUL", "RÉGLAGE", "DIAGNOSTIC", "PRATIQUE VIRTUELLE"],
    CAP: {
      objective: "Préparer et suivre une intervention simple du début à la fin.",
      learn: ["Lire le dossier avant de commencer l’intervention.", "Contrôler chaque étape avec les fiches d’aide.", "Signaler le résultat de l’intervention à l’oral ou par écrit."],
      prompt: "Prenez en charge une intervention simple, suivez les fiches d’aide et rendez compte du résultat."
    },
    TP: {
      objective: "Préparer, conduire et restituer une intervention hydraulique complète.",
      learn: ["Lire le dossier et sécuriser l’intervention.", "Contrôler, mesurer et régler méthodiquement.", "Rendre l’installation fiable et tracer l’action."],
      prompt: "Prenez en charge une installation présentant plusieurs symptômes et restituez une intervention argumentée."
    },
    BTS: {
      objective: "Analyser, vérifier et optimiser un système hydraulique dans sa globalité.",
      learn: ["Exploiter cahier des charges, plans et mesures.", "Justifier dimensionnement et réglages.", "Présenter les performances et les améliorations proposées."],
      prompt: "Réalisez l’étude de cas complète, proposez une amélioration et défendez vos choix devant un client technique."
    },
    game: "Mission finale : dossier, schéma, calculs, banc virtuel, diagnostic et compte rendu.",
    virtual: "Installation complète combinant production, pompe, distribution, régulation et défauts."
  }
};

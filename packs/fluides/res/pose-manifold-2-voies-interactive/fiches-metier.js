(function initialiseFichesMetierDeuxVoies() {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);

  const action = (id, scene, target, title, look, doText, check, why, source, value = true) => ({
    id, scene, target, title, look, doText, check, why, source, value
  });

  const FICHES = [
    {
      id: "01",
      title: "Pose des manomètres",
      short: "Poser le manifold et mettre les lignes au vide avant la lecture.",
      purpose: "Préparer deux vannes Rotolock, raccorder les trois flexibles d’un manifold 2 voies, mettre les lignes au vide puis passer BP et HP en position intermédiaire.",
      source: "Fiche 01 · Pose des manomètres dans les règles de l’art · 13 étapes papier.",
      alerts: [
        "Le repère –1 bar relatif de la fiche montre une dépression ; il ne remplace pas un vacuomètre pour mesurer un vide poussé.",
        "Le quart de tour et les clés de 10 ou 11 restent liés aux vannes du plateau ; ils ne deviennent pas des valeurs universelles."
      ],
      initial: { "manifold-bp": "closed", "manifold-hp": "closed", "mini-blue": "closed", "mini-red": "closed", "mini-yellow": "closed", "pump-power": "off", "gland-bp": "tight", "gland-hp": "tight", "stem-bp": "rear", "stem-hp": "rear" },
      actions: [
        action("ppe", "safety", "epi", "Mettre les protections adaptées", "Le risque de projection vers les yeux et de brûlure par le froid sur les mains.", "Sélectionnez lunettes et gants de protection contre le froid.", "Les protections sont portées avant le premier bouchon.", "La fiche rappelle les EPI ; le mini-jeu relie chaque protection au risque.", "Prérequis de la fiche 01"),
        action("cap-bp", "rotolock", "stem-cap-bp", "Retirer le capuchon noir BP", "Le capuchon qui protège le carré de manœuvre de la Rotolock BP.", "Cliquez sur le capuchon BP.", "Le carré BP devient accessible.", "Le capuchon protège la commande ; il sera remis à la dépose.", "Fiche 01 · étape 1", "removed"),
        action("cap-hp", "rotolock", "stem-cap-hp", "Retirer le capuchon noir HP", "Le capuchon de la seconde vanne de service.", "Cliquez sur le capuchon HP.", "Le carré HP devient accessible.", "BP et HP se préparent séparément.", "Fiche 01 · étape 1", "removed"),
        action("gland-bp-loose", "rotolock", "gland-bp", "Desserrer légèrement le presse-étoupe BP", "L’écrou d’étanchéité autour de la tige BP.", "Desserrez selon la fiche du matériel du plateau.", "La tige peut être manœuvrée sans forcer.", "Le desserrage est limité au débattement prescrit pour cette vanne.", "Fiche 01 · étape 2", "loose"),
        action("gland-hp-loose", "rotolock", "gland-hp", "Desserrer légèrement le presse-étoupe HP", "Le presse-étoupe de la vanne HP.", "Desserrez-le avec l’outil prévu.", "La tige HP est libérée.", "Aucun nombre de tours n’est généralisé à un autre matériel.", "Fiche 01 · étape 2", "loose"),
        action("rear-bp", "rotolock", "stem-bp", "Confirmer le siège arrière BP", "Le carré BP et le sens de dévissage vers la butée arrière.", "Amenez la BP au siège arrière sans forcer.", "La prise P est isolée du circuit.", "Cette position permet de raccorder et de vider les lignes sans aspirer l’installation.", "Fiche 01 · étape 3", "rear"),
        action("rear-hp", "rotolock", "stem-hp", "Confirmer le siège arrière HP", "Le carré HP et sa butée arrière.", "Amenez la HP au siège arrière sans forcer.", "La prise P HP est isolée.", "Les deux côtés restent séparés du circuit pendant la préparation.", "Fiche 01 · étape 3", "rear"),
        action("port-bp", "rotolock", "port-cap-bp", "Retirer le bouchon de prise BP", "La prise de service P près du carré, pas P1.", "Retirez le bouchon P de la BP.", "La prise destinée au flexible bleu est libre.", "P1 reste au pressostat et peut rester sous pression.", "Fiche 01 · étape 4", "removed"),
        action("port-hp", "rotolock", "port-cap-hp", "Retirer le bouchon de prise HP", "La prise de service P de la vanne HP.", "Retirez uniquement le bouchon P.", "La prise destinée au flexible rouge est libre.", "Le repérage P/P1 évite d’ouvrir la mauvaise prise.", "Fiche 01 · étape 4", "removed"),
        action("blue-connect", "vacuum", "connect-blue", "Raccorder le flexible bleu", "La sortie BP du manifold et la prise P BP.", "Cliquez sur le raccord bleu côté BP.", "Le bleu relie BP à P BP.", "La couleur aide ; l’identification du côté BP reste la preuve.", "Fiche 01 · étape 5", "connected"),
        action("red-connect", "vacuum", "connect-red", "Raccorder le flexible rouge", "La sortie HP et la prise P HP.", "Cliquez sur le raccord rouge côté HP.", "Le rouge relie HP à P HP.", "Le raccord se visse sans forcer puis se serre selon la fiche du matériel.", "Fiche 01 · étape 5", "connected"),
        action("blue-mini", "vacuum", "mini-blue", "Ouvrir la mini-vanne bleue", "La poignée quart de tour au bout du flexible bleu.", "Placez la poignée en position ouverte.", "Le flexible bleu est ouvert jusqu’à P, encore isolée par le siège arrière.", "La mini-vanne fait partie du matériel défini pour le plateau.", "Fiche 01 · étape 5", "open"),
        action("red-mini", "vacuum", "mini-red", "Ouvrir la mini-vanne rouge", "La poignée au bout du flexible HP.", "Ouvrez la mini-vanne rouge.", "Le flexible rouge est prêt pour le vide des lignes.", "Chaque ligne est ouverte séparément et contrôlée.", "Fiche 01 · étape 5", "open"),
        action("yellow-connect", "vacuum", "connect-yellow", "Raccorder le flexible jaune à la pompe", "La voie centrale du manifold et l’entrée de la pompe à vide.", "Cliquez sur le raccord jaune de la pompe.", "La voie de service rejoint la pompe.", "Le trajet du vide est maintenant physiquement continu.", "Fiche 01 · étape 6", "connected"),
        action("yellow-mini-open", "vacuum", "mini-yellow", "Ouvrir la mini-vanne jaune", "La poignée située au plus près de la pompe.", "Ouvrez-la d’un quart de tour sur le matériel simulé.", "La pompe communique avec le flexible jaune.", "La fiche demande de vérifier cette ouverture avant le tirage.", "Fiche 01 · étape 6", "open"),
        action("pump-on", "vacuum", "pump-power", "Mettre la pompe en marche", "L’interrupteur de la pompe et son isolement ouvert dans le scénario.", "Cliquez sur MARCHE.", "La pompe fonctionne avant l’ouverture des robinets du manifold, conformément à la fiche.", "L’ordre source évite de laisser les lignes ouvertes sans aspiration.", "Fiche 01 · étape 7", "on"),
        action("bp-open", "vacuum", "manifold-bp", "Ouvrir le robinet BP du manifold", "Le robinet bleu sous le manomètre BP.", "Ouvrez-le.", "La branche BP communique avec la voie jaune.", "Les Rotolock restent au siège arrière : l’installation est isolée.", "Fiche 01 · étape 8", "open"),
        action("hp-open", "vacuum", "manifold-hp", "Ouvrir le robinet HP du manifold", "Le robinet rouge sous le manomètre HP.", "Ouvrez-le.", "Le manifold et les trois flexibles sont au vide.", "Les deux robinets sont ouverts ensemble uniquement pour vider les lignes isolées.", "Fiche 01 · étape 8", "open"),
        action("vacuum-observe", "vacuum", "vacuum-gauge", "Contrôler la mise au vide des lignes", "Les aiguilles du manifold et, si présent, le vacuomètre.", "Validez lorsque le critère du plateau est atteint.", "Les lignes sont simulées sous vide et stables.", "–1 bar relatif est un repère de dépression ; la mesure du vide poussé relève du vacuomètre.", "Fiche 01 · étape 9", "stable"),
        action("bp-close", "vacuum", "manifold-bp", "Fermer le robinet BP", "Le robinet bleu et l’aiguille sous vide.", "Fermez-le.", "La ligne BP est isolée de la voie jaune.", "Le vide est enfermé avant l’arrêt de la pompe.", "Fiche 01 · étape 10", "closed"),
        action("hp-close", "vacuum", "manifold-hp", "Fermer le robinet HP", "Le robinet rouge.", "Fermez-le.", "Les deux robinets du manifold sont fermés.", "Ils resteront fermés pendant la simple lecture.", "Fiche 01 · étape 10", "closed"),
        action("yellow-mini-close", "vacuum", "mini-yellow", "Fermer la mini-vanne jaune", "La poignée au raccord de pompe.", "Fermez-la.", "La pompe est isolée au plus près du flexible.", "Cette fermeture précède l’arrêt demandé à l’étape suivante.", "Fiche 01 · étape 10", "closed"),
        action("pump-off", "vacuum", "pump-power", "Arrêter la pompe", "L’interrupteur après fermeture des passages.", "Cliquez sur ARRÊT.", "La pompe s’arrête isolée.", "Fermer avant d’arrêter limite le risque de retour d’huile vers les lignes.", "Fiche 01 · étape 11", "off"),
        action("mid-bp", "rotolock", "stem-bp", "Mettre la BP en position intermédiaire", "Le carré BP libéré et la course entre les deux sièges.", "Revenez légèrement en sens horaire selon le repère du poste.", "P communique avec le circuit côté BP.", "La pression peut maintenant atteindre le manomètre, robinet BP du manifold fermé.", "Fiche 01 · étape 12", "mid"),
        action("mid-hp", "rotolock", "stem-hp", "Mettre la HP en position intermédiaire", "Le carré HP.", "Placez la vanne HP en position intermédiaire.", "Les pressions BP et HP atteignent leurs manomètres.", "La lecture ne demande pas d’ouvrir les robinets BP/HP du manifold.", "Fiche 01 · étape 12", "mid"),
        action("gland-bp-tight", "rotolock", "gland-bp", "Resserrer le presse-étoupe BP", "L’écrou BP resté libéré pendant le positionnement.", "Resserrez selon la fiche de la vanne.", "L’étanchéité autour de la tige est rétablie.", "Le resserrage conclut la manœuvre de position.", "Fiche 01 · étape 13", "tight"),
        action("gland-hp-tight", "rotolock", "gland-hp", "Resserrer le presse-étoupe HP", "Le presse-étoupe HP.", "Resserrez-le avec l’outil prévu.", "Les deux vannes sont maintenues en position de lecture.", "La pose se termine par ce contrôle d’étanchéité mécanique.", "Fiche 01 · étape 13", "tight")
      ]
    },
    {
      id: "02",
      title: "Dépose avec électrovanne",
      short: "Récupérer le fluide des lignes avant de débrancher.",
      purpose: "Isoler la HP, fermer l’alimentation liquide par la commande prévue, ravaler le fluide des flexibles, isoler la BP puis remettre les protections et contrôler l’étanchéité.",
      source: "Fiche 02 · Dépose des manifolds avec électrovanne sur ligne liquide · 11 étapes papier.",
      alerts: [
        "Le retrait de bobine avec insertion d’un tournevis décrit par la fiche papier n’est pas généralisé : le jeu utilise la commande prévue par le schéma du poste.",
        "Le pressostat BP n’est jamais neutralisé dans le mini-jeu. Le critère d’arrêt vient de la procédure validée du plateau."
      ],
      initial: { "manifold-bp": "closed", "manifold-hp": "closed", "mini-blue": "open", "mini-red": "open", "mini-yellow": "open", "gland-bp": "tight", "gland-hp": "tight", "stem-bp": "mid", "stem-hp": "mid", "evm-control": "open" },
      actions: [
        action("prereq", "evm", "prereq", "Confirmer les conditions de départ", "L’installation en fonctionnement, le manifold en lecture et l’électrovanne NF identifiée sur la ligne liquide.", "Validez uniquement si le schéma et la procédure du poste sont disponibles.", "Le scénario de dépose avec EVM est applicable à ce poste.", "Une procédure EVM ne se transpose pas à une installation qui n’en possède pas.", "Prérequis de la fiche 02"),
        action("gland-hp-loose", "evm", "gland-hp", "Desserrer légèrement le presse-étoupe HP", "L’écrou autour de la tige HP.", "Libérez-le selon la fiche de la vanne.", "Le carré HP peut être manœuvré.", "La tige ne se force pas avec un presse-étoupe serré.", "Fiche 02 · étape 1", "loose"),
        action("gland-bp-loose", "evm", "gland-bp", "Desserrer légèrement le presse-étoupe BP", "Le presse-étoupe BP.", "Libérez-le à son tour.", "Le carré BP reste prêt pour l’isolement final.", "Les deux étanchéités seront resserrées avant la recherche de fuite.", "Fiche 02 · étape 1", "loose"),
        action("hp-rear", "evm", "stem-hp", "Mettre la HP au siège arrière", "La tige HP et la prise P raccordée au flexible rouge.", "Ramenez la HP à la butée arrière sans forcer.", "La HP du circuit n’alimente plus le flexible rouge.", "Le fluide déjà contenu dans le flexible reste à récupérer.", "Fiche 02 · étape 2", "rear"),
        action("yellow-close", "evm", "mini-yellow", "Fermer la mini-vanne jaune", "La poignée en bout du flexible jaune.", "Fermez-la.", "La voie vers l’extérieur du manifold est isolée.", "Le fluide doit retourner vers l’aspiration, pas vers la ligne jaune.", "Fiche 02 · étape 3", "closed"),
        action("hp-open", "evm", "manifold-hp", "Ouvrir le robinet HP du manifold", "Le robinet rouge.", "Ouvrez-le.", "Le flexible rouge communique avec la voie centrale.", "Le chemin vers la BP sera complet après l’ouverture du robinet bleu.", "Fiche 02 · étape 4", "open"),
        action("bp-open", "evm", "manifold-bp", "Ouvrir le robinet BP du manifold", "Le robinet bleu et la BP encore en position intermédiaire.", "Ouvrez-le.", "Le fluide des lignes peut rejoindre l’aspiration.", "Les robinets sont ouverts ensemble pour ce transfert précis, jamais pour lire.", "Fiche 02 · étape 4", "open"),
        action("evm-close", "evm", "evm-control", "Commander la fermeture de l’électrovanne", "Le schéma électrique et l’organe de commande prévu pour l’EVM NF.", "Coupez son alimentation par la commande validée du poste virtuel.", "L’alimentation liquide est interrompue sans improviser un shunt.", "Le mini-jeu ne reproduit ni échauffement de bobine ni neutralisation de sécurité.", "Fiche 02 · étape 5 · interprétation sécurisée", "closed"),
        action("pressure", "evm", "pressure-zero", "Observer le retour du fluide", "Les aiguilles, le compresseur et le pressostat BP.", "Attendez le critère d’arrêt défini par le poste, puis validez.", "Le fluide des flexibles a rejoint l’installation et le compresseur s’est arrêté selon sa régulation.", "Le pressostat BP reste une protection active ; il n’est pas forcé pour viser arbitrairement 0 bar.", "Fiche 02 · étape 6 · point à valider", "validated"),
        action("bp-rear", "evm", "stem-bp", "Mettre la BP au siège arrière", "Le carré BP après l’arrêt contrôlé.", "Ramenez la BP à la butée arrière sans forcer.", "La prise P BP est isolée du circuit.", "La BP ne se ferme qu’après le retour du fluide des lignes.", "Fiche 02 · étape 7", "rear"),
        action("hp-close", "evm", "manifold-hp", "Refermer le robinet HP", "Le robinet rouge après récupération.", "Fermez-le.", "La branche rouge est isolée.", "Cette fermeture complète la fiche avant toute déconnexion.", "Complément sécurité à la fiche 02", "closed"),
        action("bp-close", "evm", "manifold-bp", "Refermer le robinet BP", "Le robinet bleu.", "Fermez-le.", "Les deux robinets du manifold sont fermés.", "Aucune communication inutile ne reste ouverte.", "Complément sécurité à la fiche 02", "closed"),
        action("mini-red-close", "evm", "mini-red", "Fermer la mini-vanne rouge", "La poignée du flexible rouge après stabilisation.", "Fermez-la.", "Le flexible HP est isolé au plus près du raccord.", "Une ligne est fermée avant desserrage.", "Complément sécurité à la fiche 02", "closed"),
        action("mini-blue-close", "evm", "mini-blue", "Fermer la mini-vanne bleue", "La poignée du flexible BP.", "Fermez-la.", "Les deux lignes latérales sont isolées.", "La fermeture limite le volume résiduel au débranchement.", "Complément sécurité à la fiche 02", "closed"),
        action("disconnect-red", "evm", "disconnect-red", "Débrancher lentement le flexible rouge", "La prise P HP isolée et la mini-vanne fermée.", "Desserrez progressivement en restant hors de l’axe.", "Le flexible rouge est déposé avec un minimum d’émissions.", "Un raccord ne se desserre jamais d’un coup.", "Fiche 02 · étape 8", "disconnected"),
        action("disconnect-blue", "evm", "disconnect-blue", "Débrancher lentement le flexible bleu", "La prise P BP et la ligne stabilisée.", "Déposez le bleu progressivement.", "Le flexible BP est déconnecté.", "La Rotolock BP reste au siège arrière.", "Fiche 02 · étape 8", "disconnected"),
        action("port-hp", "evm", "port-cap-hp", "Remettre le bouchon P HP", "La prise HP libre et son joint.", "Remettez le bouchon selon la fiche du matériel.", "La prise HP retrouve sa seconde barrière d’étanchéité.", "Le bouchon fait partie de l’étanchéité finale.", "Fiche 02 · étape 8", "on"),
        action("port-bp", "evm", "port-cap-bp", "Remettre le bouchon P BP", "La prise BP libre.", "Remettez son bouchon.", "Les deux prises P sont protégées.", "Aucun bouchon ne reste sur l’établi.", "Fiche 02 · étape 8", "on"),
        action("gland-hp-tight", "evm", "gland-hp", "Resserrer le presse-étoupe HP", "L’écrou HP encore libéré.", "Resserrez selon la fiche de la vanne.", "L’étanchéité de la tige HP est rétablie.", "Le resserrage précède la recherche de fuite.", "Fiche 02 · étape 9", "tight"),
        action("gland-bp-tight", "evm", "gland-bp", "Resserrer le presse-étoupe BP", "Le presse-étoupe BP.", "Resserrez-le.", "Les deux tiges sont étanches dans la simulation.", "Les deux points seront contrôlés séparément.", "Fiche 02 · étape 9", "tight"),
        action("leak", "evm", "leak-glands", "Rechercher une fuite aux presse-étoupes", "La sonde autour des deux tiges et la vitesse de balayage.", "Contrôlez HP puis BP avec le moyen prévu au plateau.", "Aucune alerte n’est simulée sur les deux points.", "Toute étanchéité de tige manœuvrée doit être vérifiée.", "Fiche 02 · étape 10", "checked"),
        action("cap-hp", "evm", "stem-cap-hp", "Remettre le capuchon noir HP", "Le carré HP et le presse-étoupe serré.", "Remettez le capuchon HP.", "La commande HP est protégée.", "Le capuchon ne remplace pas le resserrage du presse-étoupe.", "Fiche 02 · étape 11", "on"),
        action("cap-bp", "evm", "stem-cap-bp", "Remettre le capuchon noir BP", "Le carré BP.", "Remettez le capuchon BP.", "Les deux vannes sont protégées.", "La dépose se termine sur un poste remis en état.", "Fiche 02 · étape 11", "on")
      ]
    },
    {
      id: "03",
      title: "Mise sous pression à l’azote",
      short: "Préparer l’épreuve et rechercher les fuites sans dépasser la limite la plus basse.",
      purpose: "Raccorder un détendeur dédié à l’azote sec, ouvrir progressivement le chemin du manifold, atteindre la pression prescrite puis contrôler et tracer l’épreuve.",
      source: "Fiche 03 · Mise sous pression azote · 7 étapes papier.",
      alerts: [
        "La pression d’épreuve n’est jamais inventée : elle vient de la documentation et du composant dont la limite admissible est la plus basse.",
        "La décompression finale par flexible tenu à la main n’est pas simulée ; elle doit suivre la procédure de rejet maîtrisé du plateau."
      ],
      initial: { "manifold-bp": "closed", "manifold-hp": "closed", "cylinder-open": "closed", "regulator-set": "zero", "station-power": "off" },
      actions: [
        action("ppe", "safety", "epi", "Porter les EPI et dégager la zone", "La bouteille, le détendeur, les flexibles et l’axe des raccords.", "Sélectionnez lunettes, gants adaptés et zone dégagée.", "Personne ne reste face à un raccord pendant la montée en pression.", "Une épreuve sous pression commence par une analyse de risque.", "Prérequis de la fiche 03"),
        action("connect", "nitrogen", "connect-nitrogen", "Raccorder le flexible jaune au détendeur", "La voie jaune du manifold et la sortie du détendeur azote.", "Cliquez sur le raccord du détendeur.", "Le détendeur dédié azote rejoint la voie de service.", "Azote sec uniquement : jamais oxygène ni air comprimé.", "Fiche 03 · étape 1", "connected"),
        action("closed", "nitrogen", "manifold-closed", "Vérifier le manifold fermé", "Les deux robinets BP et HP.", "Confirmez leur position fermée.", "Aucune admission d’azote ne peut commencer par surprise.", "Le réglage se prépare circuit isolé.", "Fiche 03 · étape 1", "checked"),
        action("magnets", "nitrogen", "magnets", "Ouvrir les électrovannes du circuit", "Les électrovannes présentes et les aimants prévus pour ce poste hors tension.", "Placez les dispositifs autorisés par la procédure.", "Les volumes concernés communiquent pour l’épreuve.", "Le moyen exact dépend de l’installation et de sa consignation.", "Fiche 03 · étape 2", "placed"),
        action("reg-zero", "nitrogen", "regulator-zero", "Dévisser la vis de réglage du détendeur", "La vis de réglage et l’indication de sortie.", "Ramenez la consigne du détendeur à zéro.", "Le détendeur ne demande aucune pression à l’ouverture de bouteille.", "Ouvrir une bouteille avec une consigne déjà appliquée créerait une montée brutale.", "Fiche 03 · étape 3", "zero"),
        action("bottle-open", "nitrogen", "cylinder-open", "Ouvrir la bouteille d’azote", "Le robinet de bouteille et le manomètre amont.", "Ouvrez progressivement le robinet.", "Le détendeur est alimenté, sortie encore réglée à zéro.", "La bouteille reste stable et attachée selon le poste.", "Fiche 03 · étape 3", "open"),
        action("reg-set", "nitrogen", "regulator-set", "Régler la pression prescrite", "La documentation de l’installation, les limites de chaque composant et le manomètre du détendeur.", "Augmentez progressivement jusqu’à la valeur validée pour le poste.", "La consigne reste sous toutes les limites admissibles.", "La limite la plus basse commande l’épreuve.", "Fiche 03 · étape 4", "set"),
        action("bp-open", "nitrogen", "manifold-bp", "Ouvrir délicatement la BP", "Le robinet bleu et la montée de pression.", "Ouvrez progressivement.", "L’azote pénètre sans à-coup par la branche prévue.", "L’admission reste sous surveillance permanente.", "Fiche 03 · étape 5", "open"),
        action("hp-open", "nitrogen", "manifold-hp", "Ouvrir délicatement la HP", "Le robinet rouge et l’équilibrage du circuit.", "Ouvrez selon le montage validé.", "Les volumes nécessaires sont mis sous pression.", "Chaque ouverture reste lente pour maîtriser l’énergie stockée.", "Fiche 03 · étape 5", "open"),
        action("target", "nitrogen", "pressure-test", "Atteindre la pression d’épreuve", "Les manomètres du manifold et du détendeur.", "Validez lorsque la valeur prescrite est stable.", "La simulation atteint la cible du plateau sans la chiffrer.", "Une valeur générique ne peut pas remplacer la documentation du circuit.", "Fiche 03 · étapes 4 et 5", "stable"),
        action("bp-close", "nitrogen", "manifold-bp", "Fermer la BP du manifold", "Le robinet bleu après remplissage.", "Fermez-le.", "Le circuit est isolé du détendeur côté BP.", "La pression d’épreuve doit être enfermée avant la surveillance.", "Fiche 03 · étape 6", "closed"),
        action("hp-close", "nitrogen", "manifold-hp", "Fermer la HP du manifold", "Le robinet rouge.", "Fermez-le.", "Les deux robinets sont fermés.", "Aucune alimentation continue ne masque une fuite.", "Fiche 03 · étape 6", "closed"),
        action("bottle-close", "nitrogen", "cylinder-open", "Fermer la bouteille d’azote", "Le robinet de bouteille.", "Fermez-le.", "La source haute pression est isolée.", "Le poste reste sous pression seulement dans la zone d’épreuve.", "Fiche 03 · étape 6", "closed"),
        action("record", "nitrogen", "record-test", "Noter pression et température", "La pression stabilisée et la température du local.", "Enregistrez les deux mesures avec l’heure.", "Le point de départ de la surveillance est traçable.", "Une variation de température peut modifier la pression observée.", "Fiche 03 · étape 6", "recorded"),
        action("foam", "nitrogen", "foam-test", "Rechercher les fuites par méthode directe", "Les assemblages, raccords et zones réparées.", "Appliquez le révélateur moussant selon sa notice et observez.", "Aucune formation persistante de bulles n’est simulée.", "La méthode directe localise un défaut ; elle ne remplace pas la tenue dans le temps demandée.", "Fiche 03 · étape 7", "checked"),
        action("release", "nitrogen", "safe-depressurize", "Dépressuriser selon la procédure du plateau", "La zone de rejet maîtrisé, l’absence de personne dans l’axe et l’indication de pression.", "Sélectionnez la procédure sécurisée validée pour ce poste.", "Le circuit revient sans énergie stockée avant déconnexion.", "Le mini-jeu refuse un flexible libre simplement tenu à la main.", "Fin de fiche 03 · correction de sécurité", "done")
      ]
    },
    {
      id: "04",
      title: "Tirage au vide",
      short: "Extraire air et humidité, mesurer au vacuomètre puis contrôler la tenue.",
      purpose: "Déterminer la cible de pression absolue, ouvrir les volumes du circuit, tirer au vide, isoler avant l’arrêt de la pompe et interpréter la stabilité.",
      source: "Fiche 04 · Tirage au vide · 7 étapes papier.",
      alerts: [
        "La cible est une pression absolue déterminée pour l’installation et la température, pas une valeur universelle.",
        "Le test de tenue après isolement est ajouté à partir des ressources Pilote Fluides pour confirmer le résultat."
      ],
      initial: { "manifold-bp": "closed", "manifold-hp": "closed", "mini-yellow": "closed", "pump-power": "off" },
      actions: [
        action("closed", "vacuum-system", "manifold-closed", "Vérifier le manifold fermé", "Les robinets BP et HP avant tout changement de raccordement.", "Confirmez leur position fermée.", "Le circuit est isolé pendant la préparation.", "Un montage se modifie vannes fermées.", "Fiche 04 · étape 1", "checked"),
        action("connect", "vacuum-system", "connect-vacuum", "Raccorder pompe et vacuomètre", "La voie jaune, la pompe et le vacuomètre placé au plus près du circuit.", "Cliquez sur le montage pompe + vacuomètre.", "Le vacuomètre mesure le circuit, pas seulement la pompe.", "Le manomètre du manifold ne remplace pas une mesure de vide poussé.", "Fiche 04 · étape 2", "connected"),
        action("temp", "vacuum-system", "ambient-temp", "Mesurer la température de la pièce", "Le thermomètre du local.", "Relevez la température stabilisée.", "La température du scénario est enregistrée sans valeur inventée.", "Elle sert à choisir la cible pertinente sur la documentation prévue.", "Fiche 04 · étape 3", "recorded"),
        action("target", "vacuum-system", "vacuum-target", "Déterminer la pression absolue cible", "La courbe ou le tableau du cours et l’unité du vacuomètre.", "Sélectionnez la cible prescrite pour cette installation.", "La cible est enregistrée dans l’unité de l’instrument.", "Une pression absolue de vide ne se déduit pas d’un simple –1 bar relatif.", "Fiche 04 · étape 3", "set"),
        action("magnets", "vacuum-system", "magnets", "Ouvrir les électrovannes nécessaires", "Les électrovannes présentes et la consignation du poste.", "Placez les dispositifs prévus par la procédure.", "Les volumes concernés communiquent avec le chemin de vide.", "Cette étape ne s’applique que si l’installation possède ces électrovannes.", "Fiche 04 · étape 4", "placed"),
        action("pump-on", "vacuum-system", "pump-power", "Mettre la pompe en marche", "L’huile, l’isolement et l’interrupteur de la pompe.", "Démarrez la pompe après les contrôles.", "La pompe fonctionne, circuit encore isolé par les robinets du manifold.", "Le fonctionnement est établi avant l’ouverture du chemin.", "Fiche 04 · étape 5", "on"),
        action("yellow-open", "vacuum-system", "mini-yellow", "Ouvrir la mini-vanne jaune", "La poignée en bout du flexible de vide.", "Ouvrez-la.", "La pompe communique avec la voie de service.", "Le passage est ouvert au plus près de l’appareil.", "Fiche 04 · étape 5", "open"),
        action("bp-open", "vacuum-system", "manifold-bp", "Ouvrir la BP du manifold", "Le robinet bleu.", "Ouvrez-le.", "Le vide atteint le côté BP.", "La pompe extrait air et humidité des volumes ouverts.", "Fiche 04 · étape 5", "open"),
        action("hp-open", "vacuum-system", "manifold-hp", "Ouvrir la HP du manifold", "Le robinet rouge.", "Ouvrez-le.", "Les côtés BP et HP communiquent avec la pompe.", "Le schéma du poste confirme que tous les volumes utiles sont ouverts.", "Fiche 04 · étape 5", "open"),
        action("read", "vacuum-system", "vacuum-gauge", "Atteindre la cible au vacuomètre", "La pression absolue et son évolution dans le temps.", "Validez après la cible et la durée prescrites.", "La simulation atteint le vide demandé.", "La valeur et la durée viennent du constructeur ou de la procédure du plateau.", "Fiche 04 · étape 6", "target"),
        action("bp-close", "vacuum-system", "manifold-bp", "Fermer la BP", "Le robinet bleu, pompe encore en marche.", "Fermez-le.", "Le côté BP est isolé de la pompe.", "Le circuit se ferme avant l’arrêt de la pompe.", "Fiche 04 · étape 6", "closed"),
        action("hp-close", "vacuum-system", "manifold-hp", "Fermer la HP", "Le robinet rouge.", "Fermez-le.", "Le circuit entier est isolé.", "L’isolement préalable limite le risque de retour d’huile.", "Fiche 04 · étape 6", "closed"),
        action("yellow-close", "vacuum-system", "mini-yellow", "Fermer la mini-vanne jaune", "La poignée près de la pompe.", "Fermez-la.", "La pompe est isolée des lignes.", "La fiche demande cette fermeture avant l’arrêt.", "Fiche 04 · étape 6", "closed"),
        action("pump-off", "vacuum-system", "pump-power", "Arrêter la pompe", "L’interrupteur après isolement.", "Cliquez sur ARRÊT.", "La pompe s’arrête sans communication avec le circuit.", "L’ordre fermeture puis arrêt protège le montage.", "Fiche 04 · étape 7", "off"),
        action("hold", "vacuum-system", "vacuum-hold", "Contrôler la tenue du vide", "Le vacuomètre circuit isolé, pompe arrêtée.", "Observez pendant la durée prescrite puis validez la stabilité.", "Le vide reste stable dans la simulation.", "Une remontée peut indiquer une fuite ou de l’humidité et impose une reprise.", "Complément de contrôle à la fiche 04", "stable")
      ]
    },
    {
      id: "05",
      title: "Charge de l’installation",
      short: "Introduire la masse prescrite, tracer les pesées et préparer le CERFA.",
      purpose: "Charger selon la masse indiquée sur la plaque, surveiller la balance et isoler la bouteille et le manifold avant le calcul de la masse transférée.",
      source: "Fiche 05 · Charge en fluide frigorigène · méthode 1 et branche 6 bis.",
      alerts: [
        "La branche 6 bis avec injection de liquide vers l’aspiration n’est pas proposée comme geste générique : elle dépend du fluide, du matériel et de la méthode de charge validée.",
        "Le scénario n’invente ni fluide, ni masse, ni position liquide/vapeur de la bouteille."
      ],
      initial: { "manifold-bp": "closed", "manifold-hp": "closed", "mini-yellow": "closed", "bottle-liquid": "closed", "scale-tare": "off" },
      actions: [
        action("plate", "charge", "nameplate", "Lire la charge prescrite", "La plaque signalétique, le fluide et la masse de charge indiquée.", "Sélectionnez les données vérifiables de l’installation.", "Le scénario retient la méthode 1 : masse connue sur la plaque.", "La fiche exclut ici la mise au point progressive par surchauffe et sous-refroidissement.", "Fiche 05 · introduction", "read"),
        action("weigh", "charge", "bottle-weigh", "Peser la bouteille avant charge", "La bouteille compatible, verticale et la balance stabilisée.", "Relevez la masse initiale.", "La masse de départ est enregistrée sans valeur fictive affichée.", "Deux pesées permettent de vérifier la masse réellement transférée.", "Fiche 05 · étape 1", "recorded"),
        action("closed", "charge", "manifold-closed", "Vérifier toutes les voies fermées", "Les robinets BP/HP et les mini-vannes des flexibles.", "Confirmez la position fermée.", "Le changement d’appareil sur le jaune peut commencer.", "Aucun raccord ne se défait avec une voie ouverte.", "Fiche 05 · étape 2", "checked"),
        action("disconnect-vac", "charge", "disconnect-vacuum", "Déposer pompe et vacuomètre du jaune", "La pompe arrêtée, isolée et le flexible jaune fermé.", "Déconnectez le montage de vide.", "La voie jaune est libre sans casser le vide du circuit.", "Le manifold BP/HP fermé maintient l’installation isolée.", "Fiche 05 · étape 2", "disconnected"),
        action("connect-bottle", "charge", "connect-bottle", "Raccorder la bouteille au jaune", "La bouteille compatible, son raccord prescrit et le flexible jaune.", "Raccordez selon la position liquide/vapeur prévue par la fiche du fluide.", "La bouteille est reliée au manifold sans ouverture.", "Le raccord choisi dépend du cylindre et du fluide réels.", "Fiche 05 · étape 3", "connected"),
        action("tare", "charge", "scale-tare", "Mettre la bouteille sur balance et tarer", "La bouteille et tous les flexibles dans leur position de travail.", "Allumez la balance puis effectuez la tare prévue.", "L’affichage de transfert part du repère choisi.", "Déplacer ensuite la bouteille fausserait la mesure.", "Fiche 05 · étape 3", "on"),
        action("bottle-open", "charge", "bottle-liquid", "Ouvrir la vanne liquide de la bouteille", "Le robinet identifié par le marquage réel du cylindre.", "Ouvrez-le progressivement.", "Le fluide atteint le flexible jaune, manifold encore fermé.", "La bouteille reste sur la balance pendant toute la charge.", "Fiche 05 · étape 4", "open"),
        action("hp-open", "charge", "manifold-hp", "Ouvrir la HP du manifold", "Le robinet rouge et l’installation tirée au vide, à l’arrêt pour cette phase.", "Ouvrez progressivement la HP.", "La charge entre par le côté prévu et la masse de la bouteille diminue.", "Le mouvement de balance confirme un transfert, pas la quantité finale à lui seul.", "Fiche 05 · étape 5", "open"),
        action("mass", "charge", "charge-mass", "Atteindre la masse prescrite", "La variation de masse et la valeur de la plaque.", "Arrêtez au repère exact validé pour l’installation.", "La quantité transférée correspond à la consigne du scénario.", "Aucune masse universelle n’est affichée.", "Fiche 05 · étape 5", "target"),
        action("bottle-close", "charge", "bottle-liquid", "Fermer la bouteille", "Le robinet liquide au moment où la cible est atteinte.", "Fermez-le.", "La source de fluide est isolée.", "Fermer la bouteille évite de poursuivre la charge pendant les autres manœuvres.", "Fiche 05 · étape 6", "closed"),
        action("hp-close", "charge", "manifold-hp", "Fermer la HP du manifold", "Le robinet rouge après fermeture de la bouteille.", "Fermez-le.", "L’installation est isolée de la ligne jaune.", "Du liquide peut rester dans le flexible : il n’est pas débranché maintenant.", "Fiche 05 · étape 6", "closed"),
        action("branch", "charge", "branch-validation", "Décider si une finition de charge est nécessaire", "La masse restante, le fluide, la notice et la procédure du poste.", "Choisissez « méthode validée requise » si la charge ne peut plus entrer à l’arrêt.", "Le mini-jeu bloque toute injection liquide générique vers l’aspiration.", "La branche 6 bis présente un risque de coup de liquide au compresseur.", "Fiche 05 · étape 6 bis · validation obligatoire", "blocked"),
        action("pumpdown", "charge", "pumpdown", "Récupérer le fluide du flexible jaune", "Le parcours de dépose validé, la bouteille fermée et la pression de ligne.", "Lancez la séquence de pump-down déjà apprise dans la fiche 02.", "Le fluide résiduel est ramené sans rejet volontaire.", "Le flexible jaune n’est pas simplement ouvert à l’atmosphère.", "Fiche 05 · attention après étape 6", "done"),
        action("disconnect", "charge", "disconnect-bottle", "Débrancher la bouteille après isolement", "Le robinet bouteille fermé, la ligne traitée et stabilisée.", "Déposez lentement le flexible jaune.", "La bouteille est séparée avec un minimum d’émissions.", "La déconnexion intervient après le traitement du fluide piégé.", "Fiche 05 · étape 7", "disconnected"),
        action("weigh-final", "charge", "bottle-weigh-final", "Peser la bouteille après charge", "La bouteille seule et la balance stabilisée.", "Relevez la masse finale.", "La seconde mesure est enregistrée.", "La différence doit confirmer la quantité délivrée.", "Fiche 05 · étape 7", "recorded"),
        action("calc", "charge", "charge-calc", "Calculer la masse transférée", "La masse avant et la masse après.", "Calculez la différence et comparez-la à la charge prescrite.", "La cohérence de masse est confirmée dans le scénario.", "Une balance mesure la masse ; le manifold mesure des pressions.", "Fiche 05 · étape 7", "checked"),
        action("cerfa", "charge", "cerfa", "Renseigner le CERFA", "Les données réelles de l’intervention et les quantités mesurées.", "Ouvrez la tâche documentaire et confirmez les champs à compléter.", "La traçabilité de la charge est prête à être rédigée.", "Le mini-jeu n’invente aucune donnée administrative.", "Fiche 05 · étape 8", "ready")
      ]
    },
    {
      id: "06",
      title: "Récupération du fluide",
      short: "Préparer la station, récupérer, purger puis peser la bouteille.",
      purpose: "Raccorder une station équipée de ses tés, mettre les lignes au vide, récupérer le fluide vers une bouteille sur balance, purger la station et traiter le fluide résiduel des flexibles.",
      source: "Fiche 06 · Récupération de fluide frigorigène · 8 étapes papier.",
      alerts: [
        "Les libellés IN, OUT, LIQUIDE et PURGE doivent correspondre à la station réelle et à sa notice.",
        "Le critère de fin, l’auto-purge et la récupération du flexible bouteille sont toujours commandés par la notice du modèle utilisé."
      ],
      initial: { "manifold-bp": "closed", "manifold-hp": "closed", "station-in": "closed", "station-out": "closed", "station-mode": "recover", "station-power": "off", "bypass": "open", "bottle-vapor": "closed", "mini-yellow": "open", "pump-power": "off" },
      actions: [
        action("prereq", "recovery", "prereq", "Confirmer les prérequis", "L’installation à l’arrêt, le manifold 2 voies déjà posé et la station compatible équipée de deux tés.", "Validez la configuration et les notices disponibles.", "Le scénario de récupération peut commencer.", "Le poste réel décide du fluide, de la bouteille et des accessoires compatibles.", "Prérequis de la fiche 06", "checked"),
        action("weigh", "recovery", "bottle-weigh", "Peser la bouteille de récupération", "Le cylindre compatible, vertical, contrôlé et posé sur la balance.", "Relevez sa masse initiale.", "La masse de départ est enregistrée.", "La différence finale donnera la masse récupérée.", "Fiche 06 · étape 1", "recorded"),
        action("connect", "recovery", "connect-station", "Réaliser le montage de récupération", "Le manifold, l’entrée station, la sortie, les deux tés, la pompe et la bouteille.", "Cliquez sur le chemin complet pour raccorder les lignes.", "Le montage correspond au schéma de la fiche, sans ligne croisée.", "Chaque flexible possède une fonction et une vanne d’isolement.", "Fiche 06 · étape 2", "connected"),
        action("in-close", "recovery", "station-in", "Mettre IN sur FERMÉ", "Le sélecteur d’entrée de la station.", "Placez-le sur FERMÉ.", "L’entrée station est isolée pour le pré-vide.", "La position initiale vient de la fiche et de la notice.", "Fiche 06 · étape 3", "closed"),
        action("out-close", "recovery", "station-out", "Mettre OUT sur FERMÉ", "Le sélecteur de sortie.", "Placez-le sur FERMÉ.", "La station est isolée des deux côtés.", "La pompe prépare les lignes prévues, pas la bouteille fermée.", "Fiche 06 · étape 3", "closed"),
        action("pump-on", "recovery", "pump-power", "Mettre les lignes au vide", "La pompe, le flexible pompe, le by-pass et le jaune central.", "Démarrez le pré-vide selon le montage.", "L’air des lignes est extrait avant l’ouverture de la bouteille.", "Une ligne contenant de l’air ne doit pas être ouverte vers le fluide.", "Fiche 06 · étape 3", "on"),
        action("pre-vac", "recovery", "pre-vacuum", "Contrôler le vide des lignes", "Le vacuomètre ou l’indication prévue pour le montage.", "Validez la cible et la stabilité prescrites.", "Les lignes du scénario sont préparées.", "La cible dépend du matériel et de la procédure.", "Fiche 06 · étape 3", "stable"),
        action("pump-line-close", "recovery", "pump-line", "Fermer la mini-vanne de la pompe", "La vanne au plus près du flexible pompe.", "Fermez-la avant l’arrêt.", "Le vide des lignes est enfermé.", "Isoler avant d’arrêter limite le retour d’huile.", "Fiche 06 · étape 4", "closed"),
        action("pump-off", "recovery", "pump-power", "Arrêter la pompe", "L’interrupteur après isolement.", "Cliquez sur ARRÊT.", "La pompe est arrêtée sans communication avec les lignes.", "L’ordre est contrôlé : fermer puis arrêter.", "Fiche 06 · étape 4", "off"),
        action("bottle-connect", "recovery", "connect-bottle", "Raccorder la ligne préparée à la bouteille", "Le té de sortie, le flexible sous vide et le raccord prévu du cylindre.", "Raccordez la bouteille selon le montage validé.", "La sortie station rejoint la bouteille encore fermée.", "Le choix LIQUIDE/VAPEUR dépend du cylindre, de la station et de la pratique du plateau.", "Fiche 06 · étape 4", "connected"),
        action("bypass-close", "recovery", "bypass", "Fermer le by-pass", "La vanne du flexible by-pass.", "Fermez-la.", "Le chemin de récupération passe désormais par la station.", "Le by-pass sera rouvert pour traiter le fluide résiduel final.", "Fiche 06 · étape 4 bis", "closed"),
        action("mode", "recovery", "station-mode", "Mettre la station sur RÉCUPÉRATION", "Le sélecteur central de mode.", "Choisissez RÉCUPÉRATION.", "La station est prête pour le transfert.", "Le sélecteur ne change jamais pendant que la station tourne.", "Fiche 06 · étape 4 bis", "recover"),
        action("in-liquid", "recovery", "station-in", "Mettre IN sur LIQUIDE", "Le sélecteur d’entrée et les repères de la notice.", "Choisissez LIQUIDE pour la première phase prévue.", "L’entrée est configurée pour le transfert liquide.", "La position exacte doit correspondre au modèle de station.", "Fiche 06 · étape 4 bis", "liquid"),
        action("out-open", "recovery", "station-out", "Mettre OUT sur OUVERT", "Le sélecteur de sortie et le chemin vers la bouteille.", "Ouvrez la sortie.", "Le refoulement de la station a un chemin libre.", "La sortie s’ouvre avant le démarrage pour éviter toute surpression.", "Fiche 06 · étape 4 bis", "open"),
        action("bottle-open", "recovery", "bottle-vapor", "Ouvrir la bouteille", "Le robinet prévu par le montage réel et la balance.", "Ouvrez progressivement le robinet sélectionné.", "La bouteille peut recevoir le fluide.", "Le cylindre reste surveillé sur la balance.", "Fiche 06 · étape 4 bis", "open"),
        action("hp-open", "recovery", "manifold-hp", "Ouvrir la HP du manifold", "Le robinet rouge et la branche HP identifiée.", "Ouvrez-le.", "La phase liquide peut rejoindre l’entrée station.", "Le poste réel confirme le point HP retenu.", "Fiche 06 · étape 5", "open"),
        action("bp-open", "recovery", "manifold-bp", "Ouvrir la BP du manifold", "Le robinet bleu.", "Ouvrez-le selon la phase demandée.", "Les volumes nécessaires communiquent avec la station.", "La procédure de la station détermine le passage liquide puis vapeur.", "Fiche 06 · étape 5", "open"),
        action("station-on", "recovery", "station-power", "Mettre la station en marche", "POWER, START et la sortie déjà ouverte vers la bouteille.", "Démarrez la station.", "Le fluide se déplace vers la bouteille sur balance.", "La station ne démarre jamais avec sa sortie fermée.", "Fiche 06 · étape 5", "on"),
        action("magnets", "recovery", "magnets", "Ouvrir les électrovannes nécessaires", "Les électrovannes éventuelles du circuit et la consignation.", "Placez les dispositifs prévus par la procédure.", "Les volumes piégés communiquent avec la récupération.", "Cette action est conditionnelle à l’installation réelle.", "Fiche 06 · attention après étape 5", "placed"),
        action("target", "recovery", "recovery-target", "Atteindre le critère de fin", "Les pressions, le débit station et la masse de bouteille.", "Validez seulement au critère de la notice et du plateau.", "La récupération principale est terminée dans le scénario.", "Le mini-jeu ne généralise pas le simple repère 0 bar à tous les fluides et toutes les stations.", "Fiche 06 · étape 6", "stable"),
        action("purge", "recovery", "station-purge", "Auto-purger la station", "L’ordre imposé par la notice : isolement, arrêt, changement de mode puis redémarrage de purge.", "Lancez la séquence PURGE validée.", "Le fluide interne de la station rejoint la bouteille.", "La purge n’est jamais un rejet volontaire à l’atmosphère.", "Fiche 06 · étape 6", "done"),
        action("yellow-close", "recovery", "mini-yellow", "Fermer la mini-vanne jaune", "La vanne au plus près du manifold après purge.", "Fermez-la.", "Le manifold est isolé de la branche station.", "La fermeture précède la dépose du circuit.", "Fiche 06 · étape 7", "closed"),
        action("bottle-close", "recovery", "bottle-vapor", "Fermer la bouteille", "Le robinet utilisé pour la récupération.", "Fermez-le.", "Le fluide récupéré est isolé dans le cylindre.", "Le cylindre se ferme avant de libérer la ligne.", "Fiche 06 · étape 7", "closed"),
        action("out-close", "recovery", "station-out", "Fermer OUT", "Le sélecteur de sortie après arrêt de la station.", "Placez OUT sur FERMÉ.", "La station est isolée de la bouteille.", "Une sortie se ferme station arrêtée.", "Fiche 06 · étape 7", "closed"),
        action("mode-recover", "recovery", "station-mode", "Revenir sur RÉCUPÉRATION", "Le sélecteur central, station arrêtée.", "Replacez le mode RÉCUPÉRATION.", "La station est dans la position demandée pour la suite.", "Le sélecteur ne tourne pas pendant le fonctionnement.", "Fiche 06 · étape 7", "recover"),
        action("bypass-open", "recovery", "bypass", "Ouvrir le by-pass", "La vanne du flexible qui permet de traiter le résidu de la ligne bouteille.", "Ouvrez-la selon le schéma de la fiche.", "Le chemin de récupération du résidu est établi.", "Le fluide du flexible ne doit pas être rejeté.", "Fiche 06 · étape 7", "open"),
        action("final-run", "recovery", "station-final", "Récupérer le fluide résiduel de la ligne", "La station, le by-pass et la pression du flexible bouteille.", "Démarrez la séquence finale prévue par la notice.", "Le liquide résiduel est transféré sans ouverture à l’air.", "Cette étape dépend étroitement du montage à deux tés.", "Fiche 06 · étapes 7 et 8", "done"),
        action("in-close-final", "recovery", "station-in", "Fermer IN", "Le sélecteur d’entrée après la récupération finale.", "Placez-le sur FERMÉ.", "La station est isolée pour la déconnexion.", "Tous les côtés sont fermés avant desserrage.", "Fiche 06 · étape 8", "closed"),
        action("disconnect", "recovery", "disconnect-bottle", "Débrancher la bouteille", "Les deux extrémités fermées et la pression stabilisée.", "Déconnectez lentement en restant hors de l’axe.", "La bouteille est libérée avec un minimum d’émissions.", "Fermer, stabiliser puis desserrer lentement.", "Fiche 06 · étape 8", "disconnected"),
        action("weigh-final", "recovery", "bottle-weigh-final", "Peser la bouteille après récupération", "Le cylindre seul et l’affichage stabilisé.", "Relevez la masse finale et calculez la différence.", "La masse récupérée est traçable.", "La balance confirme le transfert réel vers la bouteille.", "Fiche 06 · étape 8", "recorded")
      ]
    }
  ];

  const state = {
    fiche: null,
    mode: "discover",
    index: 0,
    equipment: {},
    completed: new Set(),
    mistakes: new Set(),
    help: false,
    feedback: ""
  };

  const screens = {
    catalogue: $("#catalogue"),
    intro: $("#fiche-intro"),
    trainer: $("#trainer"),
    result: $("#result")
  };

  function currentAction() {
    return state.fiche?.actions[state.index];
  }

  function showScreen(name) {
    Object.entries(screens).forEach(([key, element]) => { element.hidden = key !== name; });
    document.body.classList.toggle("course-running", name === "trainer");
    $("#home-button").hidden = name === "catalogue";
    $("#exit-button").hidden = name !== "trainer";
    $("#mode-badge").textContent = ({ catalogue: "Accueil", intro: `Fiche ${state.fiche?.id || ""}`, trainer: modeLabel(), result: "Bilan" })[name];
    $("#main").focus({ preventScroll: true });
  }

  function modeLabel() {
    return ({ discover: "Découvrir", guided: "S’entraîner", confirm: "Confirmer" })[state.mode] || "Parcours";
  }

  function renderCatalogue() {
    $("#fiche-grid").innerHTML = FICHES.map((fiche) => `
      <button type="button" class="fiche-card" data-fiche="${fiche.id}">
        <span class="fiche-number">${fiche.id}</span>
        <span><strong>${esc(fiche.title)}</strong><small>${esc(fiche.short)}</small><span class="steps">${fiche.actions.length} gestes interactifs</span></span>
      </button>`).join("");
    $$('[data-fiche]').forEach((button) => button.addEventListener("click", () => openFiche(button.dataset.fiche)));
  }

  function openFiche(id) {
    state.fiche = FICHES.find((fiche) => fiche.id === id);
    if (!state.fiche) return;
    $("#fiche-kicker").textContent = `FICHE ${state.fiche.id} · MANIFOLD 2 VOIES`;
    $("#fiche-title").textContent = state.fiche.title;
    $("#fiche-purpose").textContent = state.fiche.purpose;
    $("#source-note").innerHTML = `<strong>Source comparée :</strong> ${esc(state.fiche.source)}`;
    $("#open-points").innerHTML = `<strong>Points signalés avant validation :</strong><ul>${state.fiche.alerts.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
    showScreen("intro");
    $("#fiche-title").focus({ preventScroll: true });
  }

  function start(mode) {
    state.mode = mode;
    state.index = 0;
    state.equipment = { ...state.fiche.initial };
    state.completed = new Set();
    state.mistakes = new Set();
    state.help = false;
    showScreen("trainer");
    renderAction();
  }

  function rebuildEquipment() {
    state.equipment = { ...state.fiche.initial };
    for (let index = 0; index < state.index; index += 1) {
      const item = state.fiche.actions[index];
      if (state.completed.has(index)) state.equipment[item.target] = item.value;
    }
  }

  function renderAction() {
    const item = currentAction();
    if (!item) return finish();
    state.help = state.mode === "discover";
    $("#trainer-fiche").textContent = `Fiche ${state.fiche.id} · ${state.fiche.title}`;
    $("#trainer-count").textContent = `Geste ${state.index + 1} sur ${state.fiche.actions.length}`;
    $("#progress-bar").style.width = `${(state.index / state.fiche.actions.length) * 100}%`;
    $("#action-source").textContent = item.source;
    $("#action-title").textContent = item.title;
    $("#action-look").textContent = item.look;
    $("#action-do").textContent = item.doText;
    $("#action-check").textContent = item.check;
    $("#action-why").textContent = item.why;
    $("#stage-title").textContent = sceneTitle(item.scene);
    $("#stage-status").textContent = state.completed.has(state.index) ? "Correct" : "À vous";
    $("#help-button").hidden = state.mode !== "guided" || state.completed.has(state.index);
    $("#next-button").disabled = !state.completed.has(state.index);
    $("#previous-button").disabled = state.index === 0;
    const feedback = $("#feedback");
    if (state.completed.has(state.index)) {
      feedback.className = "feedback correct";
      feedback.textContent = item.check;
    } else {
      feedback.className = "feedback waiting";
      feedback.textContent = state.mode === "confirm" ? "Retrouvez le geste sans repère." : "Agissez directement sur l’équipement.";
    }
    renderVisual();
    $("#action-title").focus({ preventScroll: true });
  }

  function sceneTitle(scene) {
    return ({ safety: "Sécurité du poste", rotolock: "Vannes Rotolock", vacuum: "Manifold et pompe", evm: "Dépose avec EVM", nitrogen: "Épreuve à l’azote", "vacuum-system": "Tirage au vide", charge: "Charge sur balance", recovery: "Station de récupération" })[scene] || "Poste virtuel";
  }

  function targetClass(target) {
    const expected = currentAction()?.target === target && (state.help || state.mode === "discover");
    const done = state.completed.has(state.index) && currentAction()?.target === target;
    return `svg-control${expected ? " expected" : ""}${done ? " done" : ""}`;
  }

  function attrs(target, label) {
    return `class="${targetClass(target)}" data-target="${target}" role="button" tabindex="0" aria-label="${esc(label)}"`;
  }

  function rectControl(target, x, y, width, height, label, sub = "") {
    return `<g ${attrs(target, label)}><rect class="hit" x="${x}" y="${y}" width="${width}" height="${height}" rx="16"/><text class="svg-text svg-label" x="${x + width / 2}" y="${y + height / 2 - (sub ? 5 : -6)}">${esc(label)}</text>${sub ? `<text class="svg-text svg-small" x="${x + width / 2}" y="${y + height / 2 + 19}">${esc(sub)}</text>` : ""}</g>`;
  }

  function knobControl(target, x, y, label, value = "closed", color = "#1b3a63") {
    const open = ["open", "on", "mid", "liquid", "set"].includes(value);
    return `<g ${attrs(target, label)}><circle class="hit" cx="${x}" cy="${y}" r="42"/><circle cx="${x}" cy="${y}" r="25" fill="${color}"/><path d="M${x} ${y - 19}V${y + 19}" stroke="#fff" stroke-width="8" stroke-linecap="round" transform="rotate(${open ? 90 : 0} ${x} ${y})"/><text class="svg-text svg-small" x="${x}" y="${y + 63}">${esc(label)}</text></g>`;
  }

  function baseSvg(title, subtitle, body) {
    return `<svg viewBox="0 0 1000 560" role="img" aria-labelledby="scene-svg-title scene-svg-desc"><title id="scene-svg-title">${esc(title)}</title><desc id="scene-svg-desc">${esc(subtitle)}</desc><rect class="svg-bg" x="8" y="8" width="984" height="544" rx="24"/><text class="svg-title" x="500" y="43">${esc(title)}</text><text class="svg-text svg-small" x="500" y="68">${esc(subtitle)}</text>${body}</svg>`;
  }

  function safetyScene() {
    return baseSvg("PRÉPARER AVANT D’AGIR", "Risque, protections, fluide et zone de travail", `
      ${rectControl("epi", 65, 130, 250, 150, "LUNETTES + GANTS", "projection · brûlure froide")}
      ${rectControl("identify-fluid", 375, 130, 250, 150, "PLAQUE + DOSSIER", "identifier le fluide")}
      ${rectControl("compatibility", 685, 130, 250, 150, "LIMITES FABRICANT", "manifold · flexibles")}
      ${rectControl("work-area", 250, 350, 500, 105, "ZONE DÉGAGÉE", "personne dans l’axe · moyens d’alerte repérés")}`);
  }

  function rotolockUnit(side, x, label) {
    const isBp = side === "bp";
    const color = isBp ? "#3d7fca" : "#c0392b";
    const stemCap = `stem-cap-${side}`;
    const portCap = `port-cap-${side}`;
    const gland = `gland-${side}`;
    const stem = `stem-${side}`;
    const stemCapRemoved = state.equipment[stemCap] === "removed";
    const portCapRemoved = state.equipment[portCap] === "removed";
    return `<g><rect class="svg-equipment" x="${x}" y="138" width="360" height="270" rx="28"/><text class="svg-title" x="${x + 180}" y="125">ROTALOCK ${label}</text>
      <path class="svg-line" d="M${x + 40} 305H${x + 320}"/><circle cx="${x + 180}" cy="305" r="46" fill="#fffdf8" stroke="${color}" stroke-width="10"/>
      ${rectControl(stemCap, x + 34, 178, 105, 70, stemCapRemoved ? "CARRÉ" : "CAPUCHON", stemCapRemoved ? "accessible" : "noir")}
      ${knobControl(gland, x + 184, 214, "PRESSE-ÉTOUPE", state.equipment[gland] || "tight", "#b06a00")}
      ${knobControl(stem, x + 184, 326, state.equipment[stem] === "mid" ? "INTERMÉDIAIRE" : "SIÈGE ARRIÈRE", state.equipment[stem] || "rear", color)}
      ${rectControl(portCap, x + 245, 178, 92, 70, portCapRemoved ? "PRISE P" : "BOUCHON P", portCapRemoved ? "libre" : "posé")}
      <text class="svg-text svg-small" x="${x + 285}" y="390">P1 · NE PAS OUVRIR</text></g>`;
  }

  function rotolockScene() {
    return baseSvg("PRÉPARER LES DEUX ROTALOCK", "Le carré, le presse-étoupe et la prise P sont des pièces différentes", `${rotolockUnit("bp", 90, "BP")}${rotolockUnit("hp", 550, "HP")}`);
  }

  function manifoldBody(scene = "vacuum") {
    const pumpOn = state.equipment["pump-power"] === "on";
    const blueConnected = state.equipment["connect-blue"] === "connected";
    const redConnected = state.equipment["connect-red"] === "connected";
    const yellowConnected = state.equipment["connect-yellow"] === "connected" || state.equipment["connect-vacuum"] === "connected";
    const flow = pumpOn && (state.equipment["manifold-bp"] === "open" || state.equipment["manifold-hp"] === "open");
    return `<g><rect class="svg-equipment" x="282" y="128" width="436" height="185" rx="28"/><text class="svg-title" x="500" y="157">MANIFOLD 2 VOIES</text>
      <circle cx="395" cy="213" r="54" fill="#fff" stroke="#3d7fca" stroke-width="9"/><circle cx="605" cy="213" r="54" fill="#fff" stroke="#c0392b" stroke-width="9"/><text class="svg-text svg-label" x="395" y="220">BP</text><text class="svg-text svg-label" x="605" y="220">HP</text>
      ${knobControl("manifold-bp", 395, 298, "ROBINET BP", state.equipment["manifold-bp"] || "closed", "#3d7fca")}
      ${knobControl("manifold-hp", 605, 298, "ROBINET HP", state.equipment["manifold-hp"] || "closed", "#c0392b")}
      <path class="svg-line svg-blue${flow ? " flow" : ""}" d="M395 345C330 410 185 390 135 470"/><path class="svg-line svg-red${flow ? " flow" : ""}" d="M605 345C670 410 815 390 865 470"/><path class="svg-line svg-yellow${flow ? " flow" : ""}" d="M500 315V472"/>
      ${rectControl("connect-blue", 52, 445, 165, 72, blueConnected ? "BLEU RACCORDÉ" : "RACCORDER BLEU", "prise P BP")}
      ${rectControl("connect-red", 783, 445, 165, 72, redConnected ? "ROUGE RACCORDÉ" : "RACCORDER ROUGE", "prise P HP")}
      ${rectControl("connect-yellow", 415, 458, 170, 70, yellowConnected ? "JAUNE RACCORDÉ" : "RACCORDER JAUNE", scene === "vacuum" ? "pompe" : "service")}
      ${knobControl("mini-blue", 245, 421, "MINI BLEUE", state.equipment["mini-blue"] || "closed", "#3d7fca")}
      ${knobControl("mini-red", 755, 421, "MINI ROUGE", state.equipment["mini-red"] || "closed", "#c0392b")}
      ${knobControl("mini-yellow", 500, 403, "MINI JAUNE", state.equipment["mini-yellow"] || "closed", "#b06a00")}</g>`;
  }

  function vacuumScene() {
    const pumpOn = state.equipment["pump-power"] === "on";
    return baseSvg("POSER ET VIDER LES LIGNES", "Les Rotolock restent au siège arrière pendant le vide des flexibles", `${manifoldBody("vacuum")}
      ${rectControl("pump-power", 705, 82, 220, 78, pumpOn ? "POMPE · MARCHE" : "POMPE · ARRÊT", "interrupteur")}
      ${rectControl("vacuum-gauge", 76, 82, 220, 78, "CONTRÔLER LE VIDE", "manifold puis vacuomètre")}`);
  }

  function evmScene() {
    const flow = state.equipment["manifold-bp"] === "open" && state.equipment["manifold-hp"] === "open" && state.equipment["evm-control"] === "closed";
    return baseSvg("DÉPOSER SANS REJET VOLONTAIRE", "La HP est isolée, la BP conserve le chemin vers l’aspiration", `${manifoldBody("evm")}
      ${rectControl("prereq", 42, 86, 210, 68, "POSTE EVM NF", "installation en marche")}
      ${rectControl("evm-control", 746, 86, 210, 68, state.equipment["evm-control"] === "closed" ? "EVM FERMÉE" : "COMMANDE EVM", "schéma du poste")}
      ${rectControl("pressure-zero", 350, 82, 300, 68, flow ? "RETOUR EN COURS" : "CRITÈRE D’ARRÊT", "pressostat actif")}
      ${rectControl("disconnect-blue", 55, 365, 170, 56, "DÉBRANCHER BLEU", "lentement")}
      ${rectControl("disconnect-red", 775, 365, 170, 56, "DÉBRANCHER ROUGE", "lentement")}
      ${rectControl("port-cap-bp", 55, 295, 170, 56, "BOUCHON P BP", "remettre")}
      ${rectControl("port-cap-hp", 775, 295, 170, 56, "BOUCHON P HP", "remettre")}
      ${rectControl("gland-bp", 65, 215, 145, 58, "PRESSE BP", state.equipment["gland-bp"] || "tight")}
      ${rectControl("gland-hp", 790, 215, 145, 58, "PRESSE HP", state.equipment["gland-hp"] || "tight")}
      ${rectControl("stem-bp", 65, 145, 145, 58, "CARRÉ BP", state.equipment["stem-bp"] || "mid")}
      ${rectControl("stem-hp", 790, 145, 145, 58, "CARRÉ HP", state.equipment["stem-hp"] || "mid")}
      ${rectControl("leak-glands", 360, 486, 280, 48, "DÉTECTER HP PUIS BP", "recherche de fuite")}
      ${rectControl("stem-cap-bp", 235, 486, 110, 48, "CAPUCHON BP")}${rectControl("stem-cap-hp", 655, 486, 110, 48, "CAPUCHON HP")}`);
  }

  function nitrogenScene() {
    const open = state.equipment["cylinder-open"] === "open";
    const flow = open && state.equipment["regulator-set"] === "set";
    return baseSvg("ÉPREUVE À L’AZOTE SEC", "La pression prescrite ne dépasse jamais la limite la plus basse du circuit", `
      <rect class="svg-equipment" x="50" y="135" width="200" height="320" rx="65"/><text class="svg-title" x="150" y="180">N₂ SEC</text>
      ${knobControl("cylinder-open", 150, 120, "BOUTEILLE", state.equipment["cylinder-open"] || "closed", "#1b3a63")}
      ${knobControl("regulator-zero", 315, 195, "VIS À ZÉRO", state.equipment["regulator-zero"] || "zero", "#b06a00")}
      ${knobControl("regulator-set", 315, 320, "RÉGLAGE", state.equipment["regulator-set"] || "zero", "#b06a00")}
      <path class="svg-line svg-yellow${flow ? " flow" : ""}" d="M250 280H410"/>
      ${rectControl("connect-nitrogen", 360, 245, 150, 70, "RACCORDER", "flexible jaune")}
      <rect class="svg-equipment" x="510" y="130" width="440" height="325" rx="28"/><text class="svg-title" x="730" y="170">CIRCUIT À ÉPROUVER</text>
      ${rectControl("manifold-closed", 555, 195, 170, 66, "MANIFOLD FERMÉ", "BP + HP")}
      ${knobControl("manifold-bp", 610, 340, "BP", state.equipment["manifold-bp"] || "closed", "#3d7fca")}
      ${knobControl("manifold-hp", 850, 340, "HP", state.equipment["manifold-hp"] || "closed", "#c0392b")}
      ${rectControl("magnets", 750, 195, 160, 66, "ÉLECTROVANNES", "selon le poste")}
      ${rectControl("pressure-test", 665, 285, 130, 62, "PRESSION", "cible validée")}
      ${rectControl("record-test", 520, 470, 190, 58, "NOTER P + T", "heure incluse")}
      ${rectControl("foam-test", 720, 470, 120, 58, "MOUSSE", "fuites")}
      ${rectControl("safe-depressurize", 850, 470, 115, 58, "DÉTENDRE", "procédure sûre")}`);
  }

  function vacuumSystemScene() {
    const pumpOn = state.equipment["pump-power"] === "on";
    const flow = pumpOn && (state.equipment["manifold-bp"] === "open" || state.equipment["manifold-hp"] === "open");
    return baseSvg("TIRAGE AU VIDE DE L’INSTALLATION", "Le vacuomètre se lit circuit isolé, pompe arrêtée pour le contrôle de tenue", `
      <rect class="svg-equipment" x="60" y="150" width="250" height="280" rx="28"/><text class="svg-title" x="185" y="190">POMPE À VIDE</text>
      ${rectControl("connect-vacuum", 90, 225, 190, 66, "RACCORDER", "pompe + vacuomètre")}
      ${knobControl("pump-power", 185, 365, pumpOn ? "MARCHE" : "ARRÊT", state.equipment["pump-power"] || "off", "#1b3a63")}
      <path class="svg-line svg-yellow${flow ? " flow" : ""}" d="M310 285H505"/>
      ${knobControl("mini-yellow", 405, 285, "MINI JAUNE", state.equipment["mini-yellow"] || "closed", "#b06a00")}
      <rect class="svg-equipment" x="505" y="120" width="445" height="330" rx="28"/><text class="svg-title" x="727" y="160">MANIFOLD + CIRCUIT</text>
      ${rectControl("manifold-closed", 545, 185, 170, 62, "MANIFOLD FERMÉ")}
      ${knobControl("manifold-bp", 600, 350, "BP", state.equipment["manifold-bp"] || "closed", "#3d7fca")}
      ${knobControl("manifold-hp", 855, 350, "HP", state.equipment["manifold-hp"] || "closed", "#c0392b")}
      ${rectControl("magnets", 745, 185, 165, 62, "ÉLECTROVANNES", "si présentes")}
      ${rectControl("ambient-temp", 520, 470, 145, 58, "TEMPÉRATURE", "du local")}
      ${rectControl("vacuum-target", 675, 470, 145, 58, "CIBLE ABSOLUE", "doc du poste")}
      ${rectControl("vacuum-gauge", 830, 470, 145, 58, "VACUOMÈTRE", "atteindre")}
      ${rectControl("vacuum-hold", 680, 270, 145, 58, "TENUE DU VIDE", "pompe arrêtée")}`);
  }

  function chargeScene() {
    const bottleOpen = state.equipment["bottle-liquid"] === "open";
    const flow = bottleOpen && state.equipment["manifold-hp"] === "open";
    return baseSvg("CHARGER PAR LA MASSE PRESCRITE", "La bouteille reste sur la balance ; la ligne jaune est traitée avant déconnexion", `
      <rect class="svg-equipment" x="40" y="115" width="230" height="330" rx="70"/><text class="svg-title" x="155" y="158">BOUTEILLE</text>
      ${knobControl("bottle-liquid", 155, 105, "LIQUIDE", state.equipment["bottle-liquid"] || "closed", "#1b3a63")}
      ${rectControl("bottle-weigh", 65, 350, 180, 60, "PESÉE AVANT")}${rectControl("bottle-weigh-final", 65, 420, 180, 60, "PESÉE APRÈS")}
      ${rectControl("scale-tare", 285, 365, 150, 80, "BALANCE", state.equipment["scale-tare"] === "on" ? "TARE FAITE" : "TARER")}
      <path class="svg-line svg-yellow${flow ? " flow" : ""}" d="M270 255H530"/>
      ${rectControl("connect-bottle", 345, 220, 150, 68, "RACCORDER", "flexible jaune")}
      ${rectControl("disconnect-vacuum", 345, 135, 150, 68, "DÉPOSER VIDE", "pompe isolée")}
      <rect class="svg-equipment" x="530" y="115" width="430" height="330" rx="28"/><text class="svg-title" x="745" y="158">MANIFOLD + INSTALLATION</text>
      ${rectControl("nameplate", 555, 190, 165, 65, "PLAQUE", "fluide + masse")}
      ${rectControl("manifold-closed", 745, 190, 175, 65, "VOIES FERMÉES")}
      ${knobControl("manifold-hp", 840, 350, "HP", state.equipment["manifold-hp"] || "closed", "#c0392b")}
      ${rectControl("charge-mass", 555, 300, 170, 65, "MASSE CIBLE", "plaque")}
      ${rectControl("branch-validation", 555, 380, 170, 52, "6 BIS", "validation requise")}
      ${rectControl("pumpdown", 735, 465, 140, 55, "PUMP-DOWN")}
      ${rectControl("disconnect-bottle", 585, 465, 140, 55, "DÉBRANCHER")}
      ${rectControl("charge-calc", 300, 470, 150, 55, "CALCULER Δm")}
      ${rectControl("cerfa", 885, 465, 90, 55, "CERFA")}`);
  }

  function recoveryScene() {
    const running = state.equipment["station-power"] === "on";
    const flow = running && state.equipment["station-out"] === "open" && state.equipment["bottle-vapor"] === "open";
    return baseSvg("RÉCUPÉRER VERS UNE BOUTEILLE", "Deux tés, un by-pass et une purge commandée par la notice de la station", `
      <rect class="svg-equipment" x="35" y="150" width="235" height="285" rx="28"/><text class="svg-title" x="152" y="185">MANIFOLD 2V</text>
      ${knobControl("manifold-bp", 95, 310, "BP", state.equipment["manifold-bp"] || "closed", "#3d7fca")}
      ${knobControl("manifold-hp", 210, 310, "HP", state.equipment["manifold-hp"] || "closed", "#c0392b")}
      ${rectControl("mini-yellow", 80, 390, 145, 50, "MINI JAUNE", state.equipment["mini-yellow"] || "open")}
      <path class="svg-line svg-yellow${flow ? " flow" : ""}" d="M270 300H405"/>
      <rect class="svg-equipment" x="405" y="120" width="300" height="345" rx="28"/><text class="svg-title" x="555" y="158">STATION</text>
      ${knobControl("station-in", 470, 275, "IN", state.equipment["station-in"] || "closed", "#3d7fca")}
      ${knobControl("station-mode", 555, 365, state.equipment["station-mode"] === "purge" ? "PURGE" : "RÉCUP.", state.equipment["station-mode"] || "recover", "#10233c")}
      ${knobControl("station-out", 640, 275, "OUT", state.equipment["station-out"] || "closed", "#c0392b")}
      ${rectControl("station-power", 470, 185, 170, 58, running ? "STATION MARCHE" : "STATION ARRÊT")}
      ${rectControl("station-purge", 485, 420, 140, 48, "AUTO-PURGE")}
      <path class="svg-line svg-green${flow ? " flow" : ""}" d="M705 300H790"/>
      <rect class="svg-equipment" x="790" y="145" width="175" height="300" rx="58"/><text class="svg-title" x="877" y="185">BOUTEILLE</text>
      ${knobControl("bottle-vapor", 877, 125, "ROBINET", state.equipment["bottle-vapor"] || "closed", "#1b3a63")}
      ${rectControl("bottle-weigh", 810, 345, 135, 50, "PESÉE AVANT")}${rectControl("bottle-weigh-final", 810, 405, 135, 50, "PESÉE APRÈS")}
      ${rectControl("prereq", 38, 82, 170, 50, "PRÉREQUIS")}${rectControl("connect-station", 225, 82, 180, 50, "RACCORDER LES TÉS")}
      ${rectControl("pump-power", 420, 82, 125, 50, state.equipment["pump-power"] === "on" ? "POMPE ON" : "POMPE OFF")}
      ${rectControl("pre-vacuum", 555, 82, 125, 50, "VIDE LIGNES")}${rectControl("pump-line", 690, 82, 125, 50, "VANNE POMPE")}
      ${rectControl("connect-bottle", 825, 82, 135, 50, "RACCORDER BOUT.")}
      ${rectControl("bypass", 305, 465, 125, 52, "BY-PASS", state.equipment["bypass"] || "open")}
      ${rectControl("magnets", 445, 480, 110, 48, "AIMANTS")}${rectControl("recovery-target", 565, 480, 145, 48, "CRITÈRE FIN")}
      ${rectControl("station-final", 720, 480, 120, 48, "RÉSIDU")}${rectControl("disconnect-bottle", 850, 480, 120, 48, "DÉBRANCHER")}`);
  }

  function renderVisual() {
    const scene = currentAction().scene;
    const markup = ({ safety: safetyScene, rotolock: rotolockScene, vacuum: vacuumScene, evm: evmScene, nitrogen: nitrogenScene, "vacuum-system": vacuumSystemScene, charge: chargeScene, recovery: recoveryScene })[scene]?.() || safetyScene();
    $("#visual-root").innerHTML = markup;
    $$('[data-target]', $("#visual-root")).forEach((element) => {
      element.addEventListener("click", () => chooseTarget(element.dataset.target));
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          chooseTarget(element.dataset.target);
        }
      });
    });
  }

  function chooseTarget(target) {
    const item = currentAction();
    if (state.completed.has(state.index)) return;
    const feedback = $("#feedback");
    if (target !== item.target) {
      if (state.mode === "confirm") state.mistakes.add(state.index);
      feedback.className = "feedback error";
      feedback.textContent = `Ce n’est pas le geste attendu maintenant. ${state.mode === "confirm" ? "Relisez l’objectif et observez le poste." : "Utilisez Aidez-moi si nécessaire."}`;
      return;
    }
    state.equipment[item.target] = item.value;
    state.completed.add(state.index);
    state.help = false;
    feedback.className = "feedback correct";
    feedback.textContent = item.check;
    $("#next-button").disabled = false;
    $("#stage-status").textContent = "Correct";
    $("#help-button").hidden = true;
    $("#progress-bar").style.width = `${((state.index + 1) / state.fiche.actions.length) * 100}%`;
    renderVisual();
  }

  function finish() {
    const total = state.fiche.actions.length;
    const firstTry = total - state.mistakes.size;
    $("#result-title").textContent = `${state.fiche.title} · terminée`;
    $("#score").textContent = state.mode === "confirm" ? `${firstTry}/${total}` : `${total}/${total}`;
    $("#result-copy").textContent = state.mode === "confirm"
      ? `${firstTry} gestes ont été réussis du premier essai. La simulation confirme l’ordre numérique ; la validation finale reste à faire sur le matériel réel.`
      : `Les ${total} gestes ont été parcourus. Rejouez maintenant en mode Confirmation pour vérifier la mémorisation sans repère.`;
    showScreen("result");
    $("#result-title").focus({ preventScroll: true });
  }

  $("#back-catalogue").addEventListener("click", () => showScreen("catalogue"));
  $("#home-button").addEventListener("click", () => showScreen("catalogue"));
  $("#exit-button").addEventListener("click", () => openFiche(state.fiche.id));
  $$('[data-mode]').forEach((button) => button.addEventListener("click", () => start(button.dataset.mode)));
  $("#help-button").addEventListener("click", () => {
    state.help = true;
    $("#feedback").className = "feedback waiting";
    $("#feedback").textContent = `Cible : ${currentAction().title}. Le repère orange montre l’équipement à manipuler.`;
    renderVisual();
  });
  $("#previous-button").addEventListener("click", () => {
    if (state.index === 0) return;
    state.index -= 1;
    rebuildEquipment();
    renderAction();
  });
  $("#next-button").addEventListener("click", () => {
    if (!state.completed.has(state.index)) return;
    state.index += 1;
    if (state.index >= state.fiche.actions.length) finish(); else renderAction();
  });
  $("#replay-button").addEventListener("click", () => start(state.mode));
  $("#return-button").addEventListener("click", () => showScreen("catalogue"));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !screens.catalogue.hidden) return;
    if (event.key === "Escape") showScreen("catalogue");
  });

  window.ManifoldFiches2V = {
    fiches: FICHES,
    getState: () => ({ fiche: state.fiche?.id || null, mode: state.mode, index: state.index, completed: state.completed.size, mistakes: state.mistakes.size })
  };

  renderCatalogue();
  showScreen("catalogue");
})();

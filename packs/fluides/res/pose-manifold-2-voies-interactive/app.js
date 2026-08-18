(function initialiseTwoWayManifoldTrainer() {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

  const PHASES = [
    { id: "understand", label: "Comprendre" },
    { id: "prepare", label: "Préparer" },
    { id: "rotalock", label: "Rotolock" },
    { id: "connect", label: "Raccorder" },
    { id: "vacuum", label: "Vide lignes" },
    { id: "read", label: "Lire" },
    { id: "remove", label: "Déposer" },
    { id: "assess", label: "Évaluer" }
  ];

  const LESSONS = [
    {
      title: "Deux robinets, trois flexibles équipés",
      intro: "Un manifold 2 voies possède deux robinets de commande. Il utilise trois flexibles, chacun terminé par une mini-vanne quart de tour.",
      blocks: [
        ["Notion", "Bleu : côté basse pression. Rouge : côté haute pression. Jaune : voie centrale de service."],
        ["Piège", "Les deux robinets ne servent pas à ouvrir la lecture. Ils relient BP ou HP à la voie jaune."],
        ["Mini-vannes", "Au bout de chaque flexible, la mini-vanne quart de tour permet d’isoler le volume du flexible."]
      ],
      visual: "anatomy"
    },
    {
      title: "Sous pression, le fluide peut brûler par le froid",
      intro: "Même installation arrêtée, le fluide peut pousser sur les parois, les bouchons et les raccords. Desserrer un raccord crée une sortie dans son axe.",
      blocks: [
        ["Pression", "C’est l’action du fluide sur les parois du circuit. Arrêté ne veut pas dire sans pression."],
        ["Projection", "Un reste de liquide peut jaillir dans l’axe du raccord, s’évaporer brutalement et refroidir la peau jusqu’à la gelure."],
        ["Protection minimale", "Lunettes et gants de protection contre le froid se mettent avant toute manipulation d’un circuit sous pression."]
      ],
      visual: "safety-risk"
    },
    {
      title: "Identifier le fluide avant de choisir le matériel",
      intro: "La couleur des flexibles ne prouve ni le fluide présent ni la compatibilité du manifold. Il faut lire, comparer et savoir refuser.",
      blocks: [
        ["1 · Identifier", "Lire la plaque de l’installation et la documentation du poste ; consulter la FDS du fluide utilisé."],
        ["2 · Comprendre la limite", "La pression admissible est la limite maximale annoncée par le fabricant pour le matériel : elle ne doit jamais être dépassée."],
        ["3 · Comparer", "La pression de référence du circuit doit être inférieure ou égale aux limites du manifold, des flexibles et des raccords, tous adaptés au fluide."],
        ["Danger · si l’information manque", "Limite illisible, fluide inconnu ou compatibilité non démontrée : ne pas raccorder et demander au formateur."]
      ],
      visual: "compatibility"
    },
    {
      title: "P reçoit le manifold ; P1 reste au pressostat",
      intro: "Sur chaque vanne Rotolock à deux prises, le carré de manœuvre et le circuit interne permettent de repérer P sans la confondre avec P1.",
      blocks: [
        ["P · après le siège arrière", "C’est la voie de service temporaire, près du carré. Le flexible bleu ou rouge se raccorde ici."],
        ["P1 · côté circuit", "Cette prise reçoit le pressostat. Elle peut rester sous pression dans toutes les positions."],
        ["Danger", "Ne jamais défaire le bouchon P1 sur une installation chargée."]
      ],
      visual: "connections"
    },
    {
      title: "Chaque manœuvre encadre le presse-étoupe",
      intro: "Le presse-étoupe assure l’étanchéité autour de la tige. Il se libère légèrement avant la manœuvre et se resserre dès que la position est atteinte.",
      blocks: [
        ["1 · Desserrer légèrement", "Utiliser l’outil prévu et seulement le débattement indiqué par la fiche du poste. Aucun nombre de tours universel n’est inventé."],
        ["2 · Manœuvrer", "Placer la tige au siège arrière, en intermédiaire ou au siège avant selon l’action demandée, sans forcer en butée."],
        ["3 · Resserrer", "Rétablir immédiatement l’étanchéité du presse-étoupe avant de poursuivre."],
        ["À retenir", "Cette séquence est réalisée sur la BP puis la HP pendant la pose, répétée pour la lecture et encore contrôlée à la dépose."]
      ],
      visual: "gland-sequence"
    },
    {
      title: "Siège arrière : raccorder sans ouvrir le circuit",
      intro: "La tige est dévissée jusqu’à la butée arrière, sans forcer.",
      blocks: [
        ["Passage", "T communique avec C : l’installation fonctionne normalement."],
        ["Voie P", "Le pointeau (boisseau) au siège arrière bloque la prise P placée après lui. On peut raccorder puis tirer les lignes au vide."],
        ["P1", "P1 reste reliée à C : son danger ne disparaît pas."]
      ],
      visual: "valve",
      position: "back"
    },
    {
      title: "Position intermédiaire : mettre en lecture",
      intro: "Le pointeau ne touche aucun siège. T, C, P et P1 communiquent.",
      blocks: [
        ["Action", "Après le vide des flexibles, amener chaque Rotolock en position intermédiaire."],
        ["Lecture", "Les pressions atteignent les manomètres par les flexibles bleu et rouge."],
        ["Manifold", "Les deux robinets du manifold restent fermés pendant la simple lecture."]
      ],
      visual: "valve",
      position: "mid"
    },
    {
      title: "Siège avant : comprendre, sans l’inventer dans la pose",
      intro: "La tige est vissée vers l’avant. T est isolée de C ; P et P1 restent reliées à C.",
      blocks: [
        ["Fonction", "Cette position permet d’isoler la tuyauterie T du compresseur C."],
        ["Attention", "Elle ne remplace ni le siège arrière de pose, ni la position intermédiaire de lecture."],
        ["Principe", "Une zone isolée peut encore contenir du fluide sous pression."]
      ],
      visual: "valve",
      position: "front"
    },
    {
      title: "Vider le manifold et les flexibles avant la lecture",
      intro: "Les Rotolock restent au siège arrière : la pompe agit sur les lignes, pas sur l’installation.",
      blocks: [
        ["Chemin", "Mini-vannes des trois flexibles ouvertes, jaune vers pompe, robinets BP et HP ouverts, puis pompe en marche."],
        ["Isoler", "Fermer les deux robinets du manifold puis isoler la pompe avant de l’arrêter."],
        ["Contrôler", "Vérifier la tenue du vide selon la procédure et les instruments du plateau."]
      ],
      visual: "vacuum"
    },
    {
      title: "Déposer : ramener le fluide des flexibles dans l’installation",
      intro: "On ne purge pas les flexibles. Le compresseur aspire leur fluide par la BP et le ramène vers le condenseur puis la bouteille liquide.",
      blocks: [
        ["1 · Isoler la HP", "Mettre la Rotolock HP au siège arrière et resserrer son presse-étoupe : le flexible rouge ne reçoit plus de fluide du circuit."],
        ["2 · Couper l’alimentation liquide", "Selon le poste : commander la fermeture de l’électrovanne NF ou fermer la vanne de départ liquide."],
        ["3 · Créer le chemin", "Ouvrir les robinets HP puis BP du manifold : rouge → manifold → bleu → aspiration."],
        ["4 · Observer", "Le compresseur ramène le fluide. La pression BP baisse jusqu’à l’arrêt prévu par le pressostat et la procédure du poste."]
      ],
      visual: "recovery"
    },
    {
      title: "Refermer, remettre en service et rechercher les fuites",
      intro: "La dépose n’est terminée qu’après le resserrage des presse-étoupes, la remise des bouchons et le contrôle des points manipulés.",
      blocks: [
        ["Refermer", "Robinets du manifold fermés, BP au siège arrière, presse-étoupes BP et HP resserrés, mini-vannes fermées."],
        ["Reboucher", "Remettre les deux bouchons P puis les deux bouchons des carrés de manœuvre."],
        ["Remettre en service", "Rétablir l’alimentation liquide selon l’organe choisi et vérifier le fonctionnement attendu."],
        ["Recherche obligatoire", "Balayer lentement les bouchons P et les presse-étoupes BP/HP avec le moyen prévu au plateau ; confirmer toute alerte par un second passage."]
      ],
      visual: "final-leak"
    }
  ];

  const step = (phase, control, expect, title, look, doText, check, why, options = {}) => ({
    phase, control, expect, title, look, doText, check, why, ...options
  });

  const ACTIONS = [
    step("prepare", "identify-jet-axis", true, "Repérer la zone de projection", "Le raccord et la direction que suivrait un reste de liquide sous pression.", "Cliquez sur la zone située dans l’axe du raccord.", "La zone dangereuse prolonge le raccord ; le corps reste sur le côté.", "Un jet peut être invisible et provoquer une brûlure par le froid."),
    step("prepare", "select-base-ppe", true, "Choisir les protections avant d’agir", "Le risque à couvrir : projection vers les yeux et contact froid sur les mains.", "Choisissez l’équipement minimal adapté à cette manipulation.", "Lunettes et gants de protection contre le froid sont sélectionnés avant tout raccordement.", "Un EPI n’est pas un mot à réciter : il protège une partie du corps contre un risque identifié."),
    step("prepare", "identify-fluid", true, "Identifier le fluide sans le deviner", "La plaque de l’installation, le dossier du poste et la fiche de données de sécurité.", "Choisissez la source qui permet réellement d’identifier le fluide et ses dangers.", "L’identification vient des informations techniques, jamais de la seule couleur d’un flexible.", "La classe du fluide peut modifier les risques, l’outillage et la procédure."),
    step("prepare", "check-compatibility", true, "Vérifier la compatibilité du manifold et des flexibles", "Les limites fabricant du manifold, des flexibles et des raccords, comparées aux caractéristiques du circuit.", "Choisissez la seule décision professionnelle sûre.", "Les limites sont lisibles, suffisantes et adaptées au fluide ; sinon le raccordement est refusé.", "La plage imprimée sur un cadran ou la couleur d’un flexible ne suffisent pas à prouver la pression admissible."),
    step("prepare", "check-work-area", true, "Sécuriser la zone de travail", "Accès dégagé, arrêt d’urgence repéré, FDS disponible et personne dans l’axe des raccords.", "Choisissez le poste prêt à être utilisé.", "La zone est dégagée et les moyens d’alerte sont repérés avant le premier bouchon.", "Préparer après avoir ouvert le circuit serait trop tard."),
    step("prepare", "zero-bp", true, "Contrôler le zéro BP", "L’aiguille bleue avec le manifold à l’air libre.", "Cliquez sur la vis de zéro du cadran BP.", "L’aiguille rejoint le repère zéro.", "Une erreur de zéro fausse toute la lecture."),
    step("prepare", "zero-hp", true, "Contrôler le zéro HP", "L’aiguille rouge avec le manifold à l’air libre.", "Cliquez sur la vis de zéro du cadran HP.", "L’aiguille rejoint le repère zéro.", "Les deux cadrans se contrôlent séparément."),
    step("prepare", "inspect-hoses", true, "Inspecter les trois flexibles et leurs mini-vannes", "Chaque flexible sur toute sa longueur, ses raccords, ses joints et sa mini-vanne quart de tour.", "Cliquez sur FLEXIBLES CONTRÔLÉS.", "Bleu, rouge et jaune sont propres ; joints et mini-vannes sont présents et manœuvrables.", "Une fuite ou une mini-vanne défectueuse rend le vide et la mesure non fiables."),

    step("rotalock", "identify-p-bp", true, "Repérer P sur la Rotolock BP", "Le carré de manœuvre, puis la prise située près de lui.", "Cliquez sur P · SERVICE de la vanne BP. Ne cliquez pas sur P1.", "La voie P BP est correctement identifiée.", "Le flexible temporaire se raccorde sur P ; P1 reste au pressostat.", { side: "bp" }),
    step("rotalock", "bp-stem-cap", "removed", "Retirer le bouchon du carré BP", "Le bouchon gris qui protège le carré de manœuvre.", "Cliquez sur BOUCHON DU CARRÉ BP.", "Le carré orange devient accessible.", "Ce bouchon protège la commande et participe à l’étanchéité finale.", { side: "bp" }),
    step("rotalock", "bp-gland", "loose", "Libérer le presse-étoupe BP", "L’écrou jaune autour de la tige.", "Desserrez-le légèrement selon la fiche du poste.", "La tige peut être manœuvrée sans forcer.", "Le presse-étoupe se resserre après chaque positionnement.", { side: "bp" }),
    step("rotalock", "bp-stem", "rear", "Confirmer le siège arrière BP", "Le carré, la tige et le pointeau dans la coupe Rotolock.", "Cliquez sur le carré pour confirmer la butée arrière, sans forcer.", "T communique avec C ; la voie P est isolée.", "Le vide préparatoire restera limité au manifold et aux flexibles.", { side: "bp", cutaway: true }),
    step("rotalock", "bp-gland", "tight", "Resserrer le presse-étoupe BP", "L’écrou jaune resté desserré.", "Cliquez dessus pour le resserrer selon la procédure du poste.", "La tige BP est de nouveau étanche.", "Une tige ne reste pas libre après la manœuvre.", { side: "bp" }),
    step("rotalock", "bp-port-cap", "removed", "Retirer le bouchon P de la BP", "La prise P, près du carré. P1 se trouve à l’opposé.", "Retirez uniquement le bouchon P.", "La prise de service BP est accessible ; P1 n’a pas été touchée.", "Le siège arrière isole encore P du circuit.", { side: "bp" }),
    step("rotalock", "identify-p-hp", true, "Repérer P sur la Rotolock HP", "Le carré HP et la prise située près de lui.", "Cliquez sur P · SERVICE de la vanne HP.", "La voie P HP est correctement identifiée.", "Le même repérage P / P1 s’applique des deux côtés.", { side: "hp" }),
    step("rotalock", "hp-stem-cap", "removed", "Retirer le bouchon du carré HP", "Le bouchon gris qui protège le carré HP.", "Cliquez sur BOUCHON DU CARRÉ HP.", "Le carré orange devient accessible.", "Les deux vannes se préparent séparément.", { side: "hp" }),
    step("rotalock", "hp-gland", "loose", "Libérer le presse-étoupe HP", "L’écrou jaune autour de la tige HP.", "Desserrez-le légèrement selon la fiche du poste.", "La tige HP peut être manœuvrée.", "On ne force pas une commande bloquée.", { side: "hp" }),
    step("rotalock", "hp-stem", "rear", "Confirmer le siège arrière HP", "Le carré, la tige et le pointeau HP.", "Cliquez sur le carré pour confirmer la butée arrière, sans forcer.", "T communique avec C ; P est isolée.", "Le circuit HP ne communique pas encore avec le flexible.", { side: "hp", cutaway: true }),
    step("rotalock", "hp-gland", "tight", "Resserrer le presse-étoupe HP", "L’écrou jaune HP.", "Resserrez-le selon la procédure du poste.", "La tige HP est de nouveau étanche.", "La position est maintenue avant le raccordement.", { side: "hp" }),
    step("rotalock", "hp-port-cap", "removed", "Retirer le bouchon P de la HP", "La prise P située près du carré HP.", "Retirez uniquement le bouchon P.", "Les deux prises de service P sont accessibles.", "P1 reste en place et peut rester sous pression.", { side: "hp" }),

    step("connect", "connect-blue", true, "Raccorder le flexible bleu", "La sortie BP du manifold et la prise P de la Rotolock BP.", "Cliquez sur la prise P BP pour raccorder le bleu.", "Le flexible bleu rejoint P côté basse pression.", "La couleur aide, mais l’identification BP du circuit reste la preuve.", { side: "bp" }),
    step("connect", "connect-red", true, "Raccorder le flexible rouge", "La sortie HP et la prise P de la Rotolock HP.", "Cliquez sur la prise P HP pour raccorder le rouge.", "Le flexible rouge rejoint P côté haute pression.", "Un raccord se visse sans forcer puis se serre selon la fiche du matériel.", { side: "hp" }),
    step("connect", "connect-yellow", true, "Raccorder le flexible jaune", "La sortie centrale SERVICE et l’entrée de la pompe à vide.", "Cliquez sur le raccord P de la pompe.", "La voie centrale jaune rejoint la pompe.", "Le chemin de vide du manifold 2 voies passe par cette voie centrale."),
    step("connect", "check-path", true, "Vérifier tout le chemin", "BP sur P BP, HP sur P HP, jaune sur pompe, robinets du manifold et trois mini-vannes fermés.", "Cliquez sur CHEMIN VÉRIFIÉ.", "Aucun flexible n’arrive sur P1 ; aucune ligne n’est croisée ; les trois mini-vannes sont fermées.", "On suit physiquement chaque flexible avant d’ouvrir quoi que ce soit."),
    step("connect", "mini-blue", "open", "Ouvrir la mini-vanne du flexible bleu", "La poignée noire quart de tour au bout du flexible bleu raccordé sur P BP.", "Tournez la poignée d’un quart de tour.", "La poignée est alignée avec le passage : le flexible bleu est ouvert.", "Le circuit reste protégé car la Rotolock BP est encore au siège arrière.", { side: "bp" }),
    step("connect", "mini-red", "open", "Ouvrir la mini-vanne du flexible rouge", "La poignée noire quart de tour au bout du flexible rouge raccordé sur P HP.", "Tournez la poignée d’un quart de tour.", "Le flexible rouge est ouvert jusqu’à la prise P HP isolée.", "Chaque mini-vanne est manœuvrée séparément.", { side: "hp" }),
    step("connect", "mini-yellow", "open", "Ouvrir la mini-vanne du flexible jaune", "La poignée noire au raccord d’entrée de la pompe.", "Tournez-la d’un quart de tour.", "La voie jaune communique avec l’entrée de pompe.", "Les trois flexibles sont maintenant prêts à être tirés au vide."),

    step("vacuum", "pump-isolation", "open", "Ouvrir l’isolement de la pompe", "Le robinet d’entrée de la pompe à vide.", "Cliquez sur ISOLEMENT.", "L’entrée de pompe communique avec le flexible jaune.", "Le trajet complet se prépare avant la mise en marche."),
    step("vacuum", "manifold-bp", "open", "Ouvrir le robinet BP du manifold", "Le robinet bleu, sous le manomètre BP.", "Ouvrez-le.", "Le flexible bleu communique avec la voie centrale jaune.", "La Rotolock BP reste au siège arrière : le circuit est isolé."),
    step("vacuum", "manifold-hp", "open", "Ouvrir le robinet HP du manifold", "Le robinet rouge, sous le manomètre HP.", "Ouvrez-le.", "Les trois flexibles et le manifold communiquent avec la pompe.", "BP et HP sont ouvertes ensemble ici uniquement pour vider les lignes isolées."),
    step("vacuum", "pump-power", "on", "Démarrer la pompe à vide", "L’interrupteur de la pompe et le mouvement des aiguilles.", "Cliquez sur MARCHE.", "Les aiguilles se déplacent vers la zone de vide.", "Les Rotolock au siège arrière empêchent d’aspirer le fluide de l’installation.", { delay: 1000 }),
    step("vacuum", "vacuum-check", true, "Observer le vide obtenu", "Les deux manomètres et le trajet préparé.", "Cliquez sur VIDE DES LIGNES après le critère prévu au plateau.", "Le manifold et les flexibles sont simulés sous vide.", "Aucune durée ni valeur universelle n’est inventée dans ce module."),
    step("vacuum", "manifold-bp", "closed", "Isoler la branche BP", "Le robinet bleu et l’aiguille BP sous vide.", "Fermez le robinet BP.", "Le flexible bleu est isolé de la voie centrale.", "On enferme le vide dans la ligne avant l’arrêt de la pompe."),
    step("vacuum", "manifold-hp", "closed", "Isoler la branche HP", "Le robinet rouge et l’aiguille HP.", "Fermez le robinet HP.", "Le flexible rouge est isolé de la voie centrale.", "Les deux robinets reviennent fermés pour la lecture."),
    step("vacuum", "pump-isolation", "closed", "Isoler la pompe", "Le robinet d’entrée de la pompe.", "Fermez-le.", "La pompe est isolée du flexible jaune.", "Isoler avant l’arrêt limite le risque de retour d’huile."),
    step("vacuum", "pump-power", "off", "Arrêter la pompe", "L’interrupteur, après fermeture des passages.", "Cliquez sur l’interrupteur.", "La pompe s’arrête isolée du manifold.", "L’ordre est contrôlé : fermer, isoler, puis arrêter."),
    step("vacuum", "leak-check", "vacuum", "Contrôler la tenue du vide", "Les aiguilles, les raccords et les joints.", "Cliquez sur ÉTANCHÉITÉ après la stabilisation prévue au plateau.", "Le vide ne remonte pas dans la simulation.", "Une remontée impose de rechercher fuite ou humidité selon la procédure."),

    step("read", "bp-gland", "loose", "Libérer le presse-étoupe BP", "L’écrou jaune BP.", "Desserrez-le légèrement.", "Le carré BP peut quitter le siège arrière.", "La tige se manœuvre presse-étoupe libéré.", { side: "bp" }),
    step("read", "bp-stem", "mid", "Mettre la BP en position intermédiaire", "Le déplacement du pointeau entre les deux sièges.", "Cliquez sur le carré BP.", "T, C, P et P1 communiquent côté BP.", "La pression BP atteint son manomètre sans ouvrir le robinet BP du manifold.", { side: "bp", cutaway: true }),
    step("read", "bp-gland", "tight", "Resserrer le presse-étoupe BP", "L’écrou jaune BP.", "Resserrez-le.", "La position intermédiaire BP est maintenue.", "Le presse-étoupe ne reste pas desserré.", { side: "bp" }),
    step("read", "hp-gland", "loose", "Libérer le presse-étoupe HP", "L’écrou jaune HP.", "Desserrez-le légèrement.", "Le carré HP peut quitter le siège arrière.", "Les deux vannes sont manipulées séparément.", { side: "hp" }),
    step("read", "hp-stem", "mid", "Mettre la HP en position intermédiaire", "Le déplacement du pointeau HP.", "Cliquez sur le carré HP.", "Les pressions simulées BP et HP atteignent les manomètres.", "Les deux robinets du manifold restent fermés pendant la simple lecture.", { side: "hp", cutaway: true, delay: 1000 }),
    step("read", "hp-gland", "tight", "Resserrer le presse-étoupe HP", "L’écrou jaune HP.", "Resserrez-le.", "Les deux Rotolock sont maintenues en position intermédiaire.", "Le poste est prêt pour la mesure.", { side: "hp" }),
    step("read", "read-pressures", true, "Lire et relever BP / HP", "Les aiguilles stabilisées et les unités du vrai manifold.", "Cliquez sur RELEVER BP / HP.", "Les valeurs du scénario sont enregistrées sans ouvrir les robinets.", "Mesurer n’est pas mettre le côté choisi en communication avec la voie jaune."),
    step("read", "leak-check", "pressure", "Contrôler l’étanchéité en pression", "P, les raccords, les presse-étoupes et les flexibles.", "Cliquez sur ÉTANCHÉITÉ.", "Aucune fuite n’est simulée.", "Une lecture n’est fiable que sur un montage étanche."),

    step("remove", "hp-gland", "loose", "Libérer le presse-étoupe HP", "L’écrou jaune HP avant la dépose.", "Desserrez-le légèrement.", "Le carré HP peut revenir au siège arrière.", "La tige ne se manœuvre pas en forçant sur le presse-étoupe serré.", { side: "hp" }),
    step("remove", "hp-stem", "rear", "Isoler la prise HP au siège arrière", "Le carré HP, la tige et le pointeau.", "Ramenez la HP à la butée arrière, sans forcer.", "P HP est isolée du circuit ; le fluide du flexible rouge reste enfermé.", "Cette isolation empêche la HP du circuit d’alimenter le flexible pendant sa récupération.", { side: "hp", cutaway: true }),
    step("remove", "hp-gland", "tight", "Resserrer le presse-étoupe HP", "L’écrou jaune autour de la tige HP.", "Resserrez-le selon la fiche du poste.", "La tige HP au siège arrière est de nouveau étanche.", "Le presse-étoupe est un point de fuite potentiel : il ne reste jamais desserré.", { side: "hp" }),
    step("remove", "choose-isolation-method", true, "Choisir comment couper l’alimentation liquide", "Le schéma et la procédure du poste : électrovanne NF commandée ou vanne de départ liquide.", "Choisissez l’organe réellement prévu sur le poste virtuel.", "Une seule méthode est retenue pour la séquence ; l’autre reste une variante expliquée.", "On ne ferme pas un organe au hasard : le schéma fluidique et la procédure déterminent le choix."),
    step("remove", "close-liquid-feed", "closed", "Fermer l’alimentation liquide", "L’organe choisi sur la ligne liquide.", "Fermez-le sans arrêter le compresseur.", "Le liquide ne rejoint plus le détendeur ; le compresseur peut ravaler la BP.", "Fermer l’alimentation liquide crée le pump-down ; couper le compresseur ici empêcherait le retour du fluide."),
    step("remove", "manifold-hp", "open", "Ouvrir le robinet HP du manifold", "Le robinet rouge et le flexible HP déjà isolé du circuit.", "Ouvrez le robinet HP.", "Le flexible rouge communique avec la voie centrale.", "Le fluide HP empruntera ensuite le chemin vers la BP, pas vers l’atmosphère."),
    step("remove", "manifold-bp", "open", "Ouvrir le robinet BP du manifold", "Le robinet bleu, la Rotolock BP encore en position intermédiaire et le compresseur en marche.", "Ouvrez le robinet BP.", "Le chemin rouge → manifold → bleu → aspiration est complet.", "Les deux robinets sont ouverts ensemble uniquement pour récupérer le fluide des volumes raccordés."),
    step("remove", "recover-hose-fluid", true, "Suivre la récupération du fluide", "Les points mobiles dans les flexibles et le circuit frigorifique.", "Cliquez sur SUIVRE LE FLUIDE puis observez tout le trajet.", "Le fluide quitte les flexibles, rejoint l’aspiration, traverse le compresseur et se stocke côté condenseur/bouteille liquide.", "La baisse de pression vient d’un transfert réel ; le fluide ne disparaît pas.", { delay: 1500 }),
    step("remove", "pumpdown-stop", true, "Constater l’arrêt de pump-down", "L’aiguille BP, le compresseur et le pressostat BP.", "Confirmez l’arrêt seulement au critère prévu par la procédure du poste.", "Le pressostat BP arrête le compresseur après la baisse contrôlée de pression.", "Aucune pression universelle n’est inventée : le réglage et la limite viennent du poste."),
    step("remove", "manifold-hp", "closed", "Refermer le robinet HP du manifold", "Le robinet rouge après récupération.", "Fermez-le.", "La branche rouge est isolée de la voie centrale.", "Le trajet de transfert est refermé avant toute déconnexion."),
    step("remove", "manifold-bp", "closed", "Refermer le robinet BP du manifold", "Le robinet bleu et l’aiguille BP stabilisée.", "Fermez-le.", "Les deux robinets du manifold sont fermés.", "La lecture finale se fait sans maintenir une communication inutile entre les branches."),
    step("remove", "bp-gland", "loose", "Libérer le presse-étoupe BP", "L’écrou jaune BP, après l’arrêt du compresseur.", "Desserrez-le légèrement.", "Le carré BP peut revenir au siège arrière.", "La BP est isolée seulement après la récupération du fluide des flexibles.", { side: "bp" }),
    step("remove", "bp-stem", "rear", "Isoler la prise BP au siège arrière", "Le carré BP et la prise P.", "Ramenez la BP à la butée arrière, sans forcer.", "P BP est isolée du circuit.", "Fermer la BP plus tôt aurait supprimé le chemin d’aspiration utilisé pour récupérer le fluide.", { side: "bp", cutaway: true }),
    step("remove", "bp-gland", "tight", "Resserrer le presse-étoupe BP", "L’écrou jaune autour de la tige BP.", "Resserrez-le selon la fiche du poste.", "Les presse-étoupes BP et HP sont maintenant serrés.", "Le resserrage des deux presse-étoupes fait partie de la dépose, avant les bouchons et la recherche de fuite.", { side: "bp" }),
    step("remove", "pressure-stable", true, "Vérifier la pression avant de desserrer", "Les deux aiguilles après isolement des prises P.", "Attendez la stabilisation puis confirmez le critère du plateau.", "La pression résiduelle est traitée et l’état est stable avant déconnexion.", "Ce qui autorise le desserrage est la pression observée, jamais un délai supposé."),
    step("remove", "mini-red", "closed", "Fermer la mini-vanne du flexible rouge", "L’aiguille HP après récupération et stabilisation.", "Fermez la poignée rouge d’un quart de tour.", "Le flexible rouge est isolé au plus près du raccord.", "La mini-vanne se ferme après récupération du fluide, pas avant.", { side: "hp" }),
    step("remove", "mini-blue", "closed", "Fermer la mini-vanne du flexible bleu", "L’aiguille BP stabilisée.", "Fermez la poignée bleue d’un quart de tour.", "Le flexible bleu est isolé avant desserrage.", "La fermeture limite le volume susceptible d’être libéré au raccord.", { side: "bp" }),
    step("remove", "mini-yellow", "closed", "Fermer la mini-vanne du flexible jaune", "La pompe arrêtée et isolée ; la ligne jaune n’est pas ouverte à l’atmosphère.", "Fermez sa poignée d’un quart de tour.", "Le troisième flexible est isolé avant déconnexion.", "Les trois flexibles retrouvent un état fermé avant rangement."),
    step("remove", "connect-red", false, "Débrancher lentement le flexible rouge", "La prise P HP isolée, la mini-vanne fermée et la pression stabilisée.", "Restez hors de l’axe et desserrez progressivement.", "Le flexible HP est déconnecté avec un minimum d’émissions.", "Un raccord ne se desserre jamais d’un coup.", { side: "hp" }),
    step("remove", "connect-blue", false, "Débrancher lentement le flexible bleu", "La prise P BP isolée et la mini-vanne bleue fermée.", "Restez hors de l’axe et desserrez progressivement.", "Le flexible BP est déconnecté.", "La Rotolock BP reste au siège arrière.", { side: "bp" }),
    step("remove", "connect-yellow", false, "Débrancher le flexible jaune", "La pompe arrêtée, isolée et la mini-vanne jaune fermée.", "Déposez le raccord de pompe.", "Le flexible de service est déposé sans ouvrir sa ligne.", "Chaque appareil est isolé avant son raccord."),
    step("remove", "hp-port-cap", "on", "Remettre le bouchon P de la HP", "La prise P HP libre, propre et avec son joint contrôlé.", "Remettez puis serrez le bouchon selon la fiche du poste.", "La prise P HP retrouve sa protection et sa seconde barrière d’étanchéité.", "Le bouchon P fait partie de l’étanchéité finale.", { side: "hp" }),
    step("remove", "bp-port-cap", "on", "Remettre le bouchon P de la BP", "La prise P BP libre, propre et avec son joint contrôlé.", "Remettez puis serrez le bouchon selon la fiche du poste.", "La prise P BP est protégée.", "Aucun bouchon ne reste sur l’établi.", { side: "bp" }),
    step("remove", "hp-stem-cap", "on", "Remettre le bouchon du carré HP", "Le presse-étoupe HP serré et le carré au siège arrière.", "Remettez le bouchon du carré HP.", "La commande HP retrouve sa protection finale.", "Le bouchon ne remplace pas le resserrage préalable du presse-étoupe.", { side: "hp" }),
    step("remove", "bp-stem-cap", "on", "Remettre le bouchon du carré BP", "Le presse-étoupe BP serré et le carré au siège arrière.", "Remettez le bouchon du carré BP.", "Les deux vannes retrouvent leurs bouchons.", "La position, le presse-étoupe et le bouchon sont trois contrôles distincts.", { side: "bp" }),
    step("remove", "restore-liquid-feed", "open", "Rétablir l’alimentation liquide", "L’organe choisi au début de la dépose.", "Rétablissez sa position normale selon la procédure du poste.", "L’installation peut reprendre son fonctionnement prévu.", "La remise en service se fait avec les flexibles déposés et les vannes rebouchées."),
    step("remove", "leak-final-hp-gland", true, "Rechercher une fuite au presse-étoupe HP", "La sonde du détecteur autour de la tige et du presse-étoupe HP.", "Balayez lentement le point manipulé.", "Aucune alerte n’est simulée au presse-étoupe HP.", "Une pièce en mouvement et son étanchéité se contrôlent après manœuvre."),
    step("remove", "leak-final-hp-port", true, "Rechercher une fuite au bouchon P HP", "La sonde autour du bouchon de la prise P HP.", "Balayez lentement tout le pourtour.", "Aucune alerte n’est simulée au bouchon P HP.", "Un raccord démonté puis rebouché est un point de fuite potentiel."),
    step("remove", "leak-final-bp-gland", true, "Rechercher une fuite au presse-étoupe BP", "La sonde autour de la tige et du presse-étoupe BP.", "Balayez lentement le point manipulé.", "Aucune alerte n’est simulée au presse-étoupe BP.", "Les deux vannes sont contrôlées séparément, sans supposer que l’une garantit l’autre."),
    step("remove", "leak-final-bp-port", true, "Rechercher une fuite au bouchon P BP", "La sonde autour du bouchon de la prise P BP.", "Balayez lentement tout le pourtour.", "Aucune alerte n’est simulée au bouchon P BP.", "La recherche porte sur tous les points ouverts ou manœuvrés."),
    step("remove", "leak-final-confirm", true, "Conclure la recherche de fuite", "Les quatre points contrôlés et l’état du détecteur.", "Confirmez le résultat ; toute alerte imposerait un second passage et une reprise.", "Les deux bouchons P et les deux presse-étoupes ont été contrôlés sans alerte simulée.", "La recherche de fuite finale est une étape obligatoire de cette activité, pas une option."),
    step("remove", "final-check", true, "Faire le contrôle final", "Rotolock au siège arrière, presse-étoupes serrés, quatre bouchons remis, alimentation liquide rétablie et recherche de fuite terminée.", "Cliquez sur CONTRÔLE FINAL.", "Le poste est remis en service et contrôlé dans la simulation.", "La dépose se termine par une preuve d’étanchéité, pas seulement par le rangement."),
    step("remove", "store", true, "Ranger le manifold", "Les aiguilles à zéro, les trois mini-vannes fermées et les flexibles déposés.", "Cliquez sur RANGER LE MANIFOLD.", "Les flexibles sont prêts à être enroulés sans pli serré.", "Le manifold ne reste monté que pendant le travail.", { delay: 800 })
  ];

  const QUIZ = [
    { q: "Pourquoi met-on lunettes et gants de protection contre le froid avant de toucher un raccord ?", choices: ["Un jet peut être invisible, atteindre les yeux et provoquer une gelure", "Ils servent seulement à ne pas salir le matériel", "Ils remplacent la vérification de pression"], good: 0, why: "Un reste de liquide sous pression peut jaillir dans l’axe du raccord et refroidir brutalement la peau en s’évaporant." },
    { q: "Quelle preuve permet d’accepter un manifold et ses flexibles pour le circuit étudié ?", choices: ["Le fluide est identifié et les limites fabricant sont lisibles, suffisantes et adaptées", "Les flexibles portent la couleur habituelle et leurs cadrans correspondent visuellement au fluide", "L’aiguille revient exactement au zéro lorsque le manifold est débranché"], good: 0, why: "Couleur et zéro ne prouvent pas la compatibilité. Il faut identifier le fluide et vérifier les spécifications du matériel." },
    { q: "Dans « manifold 2 voies », que désigne le nombre 2 ?", choices: ["Les deux robinets de commande", "Deux flexibles seulement", "Deux manomètres sans robinets"], good: 0, why: "Le manifold possède deux robinets, BP et HP, et utilise trois flexibles." },
    { q: "Où se raccorde le flexible temporaire du manifold sur une Rotolock à deux prises ?", choices: ["Sur P, près du carré", "Sur P1 côté circuit, puisque cette prise resterait disponible pour une intervention temporaire", "Sur le presse-étoupe, après avoir retiré l’écrou qui assure l’étanchéité de la tige"], good: 0, why: "P est la voie de service. P1 reste affectée au pressostat." },
    { q: "Pourquoi ne faut-il pas défaire P1 sur une installation chargée ?", choices: ["P1 peut rester reliée à C et sous pression", "P1 ne possède jamais de joint", "P1 est toujours vide"], good: 0, why: "La position du pointeau ne supprime pas le danger permanent de P1." },
    { q: "Quel ordre encadre toute manœuvre du carré d’une Rotolock dans ce module ?", choices: ["Desserrer légèrement le presse-étoupe, manœuvrer, puis resserrer", "Retirer complètement le presse-étoupe, tourner la tige jusqu’à forcer, puis remonter l’écrou", "Manœuvrer avec le presse-étoupe serré et ne rien contrôler"], good: 0, why: "Le presse-étoupe est libéré selon la fiche du poste puis resserré immédiatement après le positionnement de la tige." },
    { q: "Quelle position permet de raccorder et tirer les lignes au vide sans aspirer le circuit ?", choices: ["Siège arrière", "Position intermédiaire", "Siège avant"], good: 0, why: "Au siège arrière, T communique avec C mais P est isolée." },
    { q: "Quelle position met T, C, P et P1 en communication ?", choices: ["Position intermédiaire", "Siège arrière, lorsque la tige est dévissée jusqu’à sa butée sans forcer", "Siège avant, lorsque la tige isole le tube du reste de la vanne"], good: 0, why: "Le pointeau ne touche aucun siège en position intermédiaire." },
    { q: "Pendant une simple lecture BP / HP, comment sont les deux robinets du manifold ?", choices: ["Fermés", "Tous les deux ouverts", "BP ouvert et HP fermé"], good: 0, why: "Les manomètres lisent leurs lignes latérales avec les robinets fermés." },
    { q: "Que provoque l’ouverture du robinet BP du manifold ?", choices: ["La BP communique avec la voie centrale jaune", "La lecture BP devient possible", "P1 est isolée"], good: 0, why: "Le robinet relie le côté BP à la voie centrale ; il ne sert pas à lire." },
    { q: "À quoi sert la mini-vanne quart de tour placée au bout de chaque flexible ?", choices: ["À isoler le volume du flexible", "À manœuvrer la Rotolock", "À ouvrir le robinet du manifold"], good: 0, why: "Chaque mini-vanne ferme son flexible au plus près du raccord et contribue à une déconnexion avec un minimum d’émissions." },
    { q: "Quel ordre protège la pompe avant son arrêt ?", choices: ["Fermer les robinets du manifold, isoler la pompe, puis arrêter", "Arrêter immédiatement la pompe, puis refermer les robinets seulement après le retour des aiguilles au zéro", "Mettre d’abord les deux Rotolock en position intermédiaire, arrêter la pompe et fermer ensuite la voie jaune"], good: 0, why: "On enferme le vide et on isole la pompe avant de couper son moteur." },
    { q: "Après retour des Rotolock au siège arrière, les flexibles sont-ils forcément sans pression ?", choices: ["Non, du fluide peut rester piégé", "Oui, car le siège arrière ramène automatiquement le contenu de chaque flexible dans le circuit", "Seul le flexible jaune peut encore contenir du fluide puisque les côtés BP et HP sont isolés"], good: 0, why: "Isoler le circuit ne vide pas automatiquement les volumes enfermés." },
    { q: "Pendant la récupération du fluide des flexibles, pourquoi la HP est-elle au siège arrière tandis que la BP reste encore en intermédiaire ?", choices: ["La HP n’alimente plus le rouge et la BP conserve le chemin vers l’aspiration", "Les deux manomètres doivent afficher la même couleur", "Cela ouvre automatiquement l’électrovanne"], good: 0, why: "Le fluide du flexible rouge rejoint le manifold puis la branche bleue encore reliée à l’aspiration." },
    { q: "Comment choisit-on entre fermeture de l’électrovanne et fermeture de la vanne départ liquide ?", choices: ["D’après le schéma et la procédure du poste", "Fermer systématiquement les deux organes, même si le schéma n’en prévoit qu’un, afin d’obtenir une double sécurité", "Choisir l’organe le plus proche"], good: 0, why: "L’organe utilisé pour couper l’alimentation liquide dépend de la configuration réelle et de sa procédure." },
    { q: "Que montrent les points mobiles pendant le pump-down de dépose ?", choices: ["Le fluide rejoint l’aspiration, le compresseur, le condenseur puis la bouteille liquide", "Le fluide traverse le manomètre, s’y condense entièrement puis reste stocké dans le flexible bleu jusqu’à la déconnexion", "Le fluide est évacué par le flexible jaune vers l’extérieur afin de faire revenir plus vite les aiguilles au zéro"], good: 0, why: "Le compresseur transfère le fluide vers le côté de stockage de l’installation ; rien n’est purgé à l’air libre." },
    { q: "Quand peut-on desserrer le raccord rouge ?", choices: ["Après isolement et traitement de la pression résiduelle", "Dès que la Rotolock HP atteint le siège arrière, même si le flexible et le manomètre indiquent encore une pression", "Pendant que l’aiguille indique encore une pression"], good: 0, why: "Aucune ligne sous pression ne se débranche." },
    { q: "Quels points manipulés sont contrôlés pendant la recherche de fuite finale de cette activité ?", choices: ["Les deux bouchons P et les deux presse-étoupes", "Uniquement le flexible jaune rangé", "Seulement le cadran HP"], good: 0, why: "Les raccords ouverts et les étanchéités de tige manœuvrées sont vérifiés séparément." },
    { q: "Quel geste termine réellement la dépose ?", choices: ["Presse-étoupes serrés, bouchons remis, alimentation liquide rétablie et recherche de fuite terminée", "Poser les flexibles au sol, laisser les carrés accessibles pour la prochaine intervention et considérer le retour des aiguilles au zéro comme une preuve d’étanchéité", "Ranger immédiatement le manifold, conserver l’alimentation liquide isolée et reporter la recherche de fuite au prochain contrôle périodique de l’installation"], good: 0, why: "Le poste doit retrouver un état protégé, remis en service et contrôlé." }
  ];
  const QUIZ_PASS = Math.ceil(QUIZ.length * 0.8);

  const ORDER_ITEMS = [
    { id: "prepare", label: "Analyser les risques, choisir les protections et contrôler le matériel" },
    { id: "rear", label: "Mettre les Rotolock au siège arrière et ouvrir P" },
    { id: "connect", label: "Raccorder bleu, rouge et jaune puis ouvrir leurs mini-vannes" },
    { id: "vacuum", label: "Tirer le manifold et les flexibles au vide" },
    { id: "read", label: "Passer les Rotolock en intermédiaire et lire" },
    { id: "isolate", label: "Isoler la HP et couper l’alimentation liquide" },
    { id: "residual", label: "Récupérer le fluide des flexibles par l’aspiration" },
    { id: "finish", label: "Isoler la BP, déconnecter, reboucher et rechercher les fuites" }
  ];
  function shuffledIndexes(length) {
    const indexes = Array.from({ length }, (_, index) => index);
    for (let index = indexes.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1));
      [indexes[index], indexes[other]] = [indexes[other], indexes[index]];
    }
    return indexes;
  }

  function shuffledOrderIds() {
    const expected = ORDER_ITEMS.map((item) => item.id);
    let shuffled;
    do {
      shuffled = shuffledIndexes(expected.length).map((index) => expected[index]);
    } while (shuffled.every((id, index) => id === expected[index]));
    return shuffled;
  }

  const WRONG_FEEDBACK = {
    "wrong-jet-side": "Non : le côté est justement la position de retrait. Le jet prolonge l’axe du raccord.",
    "wrong-ppe-shoes": "Insuffisant : les chaussures ne protègent ni les yeux ni les mains d’une projection froide.",
    "wrong-ppe-after": "Trop tard : lunettes et gants de protection contre le froid se mettent avant de toucher au raccord.",
    "wrong-fluid-color": "Non : la couleur du flexible indique sa fonction BP, HP ou service ; elle n’identifie pas le fluide contenu dans l’installation.",
    "wrong-fluid-gauge": "Non : une aiguille seule ne donne pas une identification sûre du fluide avant raccordement.",
    "wrong-compat-color": "Non : les couleurs organisent le raccordement, mais ne prouvent ni la pression admissible ni la compatibilité avec le fluide.",
    "wrong-compat-dial": "Non : la graduation du cadran ne remplace pas les limites fabricant du manifold, des flexibles et des raccords.",
    "wrong-area-later": "Non : accès, FDS et moyens d’alerte se repèrent avant d’ouvrir un bouchon ou de raccorder un flexible."
  };

  const makeEquipment = () => ({
    bp: { stemCap: "on", portCap: "on", gland: "tight", stem: "rear", connected: false },
    hp: { stemCap: "on", portCap: "on", gland: "tight", stem: "rear", connected: false },
    manifold: { bp: "closed", hp: "closed" },
    pump: { connected: false, isolation: "closed", power: "off" },
    mini: { blue: "closed", red: "closed", yellow: "closed" },
    recovery: { method: "", liquidFeed: "open", compressor: "on", flowing: false, stopped: false, restored: false },
    zero: { bp: false, hp: false },
    checks: new Set(),
    vacuumReached: false,
    pressureSeen: false,
    residualTreated: false,
    finalLeaks: new Set()
  });

  const state = {
    screen: "home",
    lessonIndex: 0,
    actionIndex: 0,
    practiceMode: "guided",
    locked: false,
    equipment: makeEquipment(),
    feedback: "",
    feedbackType: "waiting",
    quizIndex: 0,
    quizScore: 0,
    quizAnswered: false,
    quizChoice: -1,
    quizOrder: [],
    orderChosen: [],
    orderBank: shuffledOrderIds(),
    orderDone: false,
    autonomousMistakes: new Set(),
    workshopIndex: 0,
    courseChain: false
  };

  const home = $("#home");
  const shell = $("#course-shell");
  const lessonPanel = $("#lesson-panel");
  const visualRoot = $("#visual-root");
  const sceneFeedback = $("#scene-feedback");
  const previousButton = $("#previous-button");
  const nextButton = $("#next-button");
  const cutawayButton = $("#cutaway-button");
  const cutawayDialog = $("#cutaway-dialog");

  function currentAction() { return ACTIONS[state.actionIndex]; }
  function actionPhaseIndex() { return PHASES.findIndex((phase) => phase.id === currentAction()?.phase); }

  function setScreen(screen) {
    state.screen = screen;
    home.hidden = screen !== "home";
    shell.hidden = screen === "home";
    document.body.classList.toggle("course-running", screen !== "home");
    $("#home-button").hidden = screen === "home";
    $("#exit-button").hidden = screen === "home";
    $("#mode-badge").textContent = ({ lessons: "Comprendre", practice: "Manipuler", assessment: "Évaluer", quiz: "QCM", order: "Ordre", workshop: "Guide atelier", result: "Bilan" })[screen] || "Accueil";
    if (screen === "home") {
      state.courseChain = false;
      $("#app-main").focus({ preventScroll: true });
      return;
    }
    render();
  }

  function startLessons(chain = false) {
    state.courseChain = chain;
    state.lessonIndex = 0;
    setScreen("lessons");
  }

  function startPractice(mode, reset = true) {
    state.practiceMode = mode;
    if (reset) {
      state.actionIndex = 0;
      state.equipment = makeEquipment();
      state.autonomousMistakes = new Set();
    }
    state.feedback = mode === "guided" ? "Le prochain objet porte un contour orange." : "Retrouvez le prochain geste. Une erreur est expliquée sans bloquer le parcours.";
    state.feedbackType = "waiting";
    setScreen("practice");
  }

  function startAssessment() { setScreen("assessment"); }
  function startWorkshop() { state.workshopIndex = 0; buildPrintGuide(); setScreen("workshop"); }

  function buildPhaseStrip(activeIndex, doneThrough = -1) {
    $("#phase-strip").innerHTML = PHASES.map((phase, index) => `<button type="button" class="phase-button${index === activeIndex ? " active" : ""}${index <= doneThrough ? " done" : ""}" disabled><span>${index + 1}</span>${esc(phase.label)}</button>`).join("");
  }

  function setNavigation({ previous = true, next = true, nextLabel = "Continuer →", progress = 0, label = "" } = {}) {
    previousButton.hidden = !previous;
    nextButton.hidden = !next;
    nextButton.textContent = nextLabel;
    $("#progress-label").textContent = label;
    $("#progress-bar").style.width = `${Math.max(0, Math.min(100, progress))}%`;
  }

  function render() {
    cutawayButton.hidden = true;
    if (state.screen === "lessons") renderLesson();
    else if (state.screen === "practice") renderPractice();
    else if (state.screen === "assessment") renderAssessmentMenu();
    else if (state.screen === "quiz") renderQuiz();
    else if (state.screen === "order") renderOrderGame();
    else if (state.screen === "workshop") renderWorkshop();
    else if (state.screen === "result") renderResult();
  }

  function blocksMarkup(blocks) {
    return `<div class="lesson-blocks">${blocks.map(([label, text]) => {
      const lower = label.toLowerCase();
      const kind = lower.includes("danger") || lower.includes("piège") || lower.includes("attention") ? "danger" : lower.includes("retenir") || lower.includes("contrô") ? "check" : lower.includes("action") || lower.includes("traiter") ? "action" : "";
      return `<div class="lesson-block ${kind}"><strong>${esc(label)}</strong><span>${esc(text)}</span></div>`;
    }).join("")}</div>`;
  }

  function renderLesson() {
    const lesson = LESSONS[state.lessonIndex];
    buildPhaseStrip(0, -1);
    lessonPanel.innerHTML = `<p class="lesson-kicker">ÉCRAN ${state.lessonIndex + 1} · COMPRENDRE</p><h1 tabindex="-1">${esc(lesson.title)}</h1><p class="lesson-intro">${esc(lesson.intro)}</p>${blocksMarkup(lesson.blocks)}<p class="tip-card">Observez le dessin puis reformulez la règle à voix haute.</p>`;
    $("#visual-title").textContent = lesson.title;
    $("#visual-status").textContent = `${state.lessonIndex + 1} / ${LESSONS.length}`;
    sceneFeedback.textContent = "Toute information montrée par l’animation est aussi écrite dans le panneau de gauche.";
    renderLessonVisual(lesson);
    setNavigation({ previous: state.lessonIndex > 0, next: true, nextLabel: state.lessonIndex === LESSONS.length - 1 ? "Passer à la manipulation →" : "Continuer →", progress: ((state.lessonIndex + 1) / LESSONS.length) * 100, label: `Comprendre · ${state.lessonIndex + 1} sur ${LESSONS.length}` });
    $("h1", lessonPanel)?.focus({ preventScroll: true });
  }

  function renderLessonVisual(lesson) {
    const api = window.Mano2Visuals;
    if (!api) { visualRoot.textContent = "Les illustrations pédagogiques ne sont pas disponibles."; return; }
    const snapshot = makeEquipment();
    if (lesson.visual === "vacuum") {
      snapshot.bp.connected = snapshot.hp.connected = snapshot.pump.connected = true;
      snapshot.manifold.bp = snapshot.manifold.hp = "open";
      snapshot.pump.isolation = "open";
      snapshot.pump.power = "on";
    }
    if (lesson.visual === "residual") {
      snapshot.bp.connected = snapshot.hp.connected = snapshot.pump.connected = true;
      snapshot.zero.bp = snapshot.zero.hp = true;
      snapshot.vacuumReached = true;
      snapshot.pressureSeen = true;
    }
    if (lesson.visual === "recovery") {
      snapshot.bp.connected = snapshot.hp.connected = snapshot.pump.connected = true;
      snapshot.bp.stem = "mid";
      snapshot.hp.stem = "rear";
      snapshot.manifold.bp = snapshot.manifold.hp = "open";
      snapshot.mini.blue = snapshot.mini.red = snapshot.mini.yellow = "open";
      snapshot.pressureSeen = true;
      snapshot.recovery.method = "solenoid";
      snapshot.recovery.liquidFeed = "closed";
      snapshot.recovery.flowing = true;
    }
    if (lesson.visual === "final-leak") {
      snapshot.bp.stemCap = snapshot.hp.stemCap = "on";
      snapshot.bp.portCap = snapshot.hp.portCap = "on";
      snapshot.recovery.method = "solenoid";
      snapshot.recovery.restored = true;
      ["leak-final-hp-gland", "leak-final-hp-port", "leak-final-bp-gland", "leak-final-bp-port"].forEach((id) => snapshot.finalLeaks.add(id));
    }
    visualRoot.innerHTML = api.lesson(lesson.visual, { equipment: snapshot, position: lesson.position, side: "bp" });
  }

  function renderPractice() {
    const action = currentAction();
    const phase = PHASES.find((item) => item.id === action.phase);
    const within = ACTIONS.filter((item) => item.phase === action.phase);
    const position = within.indexOf(action) + 1;
    const guided = state.practiceMode === "guided";
    const firstTry = ACTIONS.length - state.autonomousMistakes.size;
    buildPhaseStrip(actionPhaseIndex(), actionPhaseIndex() - 1);
    lessonPanel.innerHTML = `<p class="lesson-kicker">${esc(phase.label.toUpperCase())} · ${position} / ${within.length}</p><h1 id="practice-title" tabindex="-1">${esc(action.title)}</h1>${guided ? blocksMarkup([["1 · Regardez", action.look], ["2 · Faites", action.doText], ["3 · Vérifiez", action.check], ["Pourquoi ?", action.why]]) : `<p class="lesson-intro">À vous de retrouver le prochain geste dans l’ordre professionnel.</p><div class="lesson-blocks"><div class="lesson-block"><strong>Objectif</strong><span>${esc(action.title)}</span></div><div class="lesson-block danger"><strong>Aide disponible</strong><span>Ouvrez la coupe Rotolock si vous devez vérifier les passages.</span></div></div>`}<p class="tip-card ${state.feedbackType}">${esc(state.feedback)}</p>${state.practiceMode === "autonomous" ? `<p class="lesson-intro">Premier essai juste : <strong>${firstTry}/${ACTIONS.length}</strong></p>` : ""}`;
    $("#visual-title").textContent = action.side ? `Geste ciblé · Rotolock ${action.side.toUpperCase()}` : "Geste ciblé · manifold 2 voies";
    $("#visual-status").textContent = `${state.actionIndex + 1} / ${ACTIONS.length}`;
    sceneFeedback.textContent = state.feedback;
    cutawayButton.hidden = !action.side;
    const visualApi = window.Mano2Visuals;
    visualRoot.innerHTML = visualApi ? visualApi.practice(state.equipment, action, guided ? action.control : "") : "<p>Les illustrations pédagogiques ne sont pas disponibles.</p>";
    wireDirectControls();
    setNavigation({ previous: state.actionIndex > 0, next: false, progress: ((state.actionIndex + 1) / ACTIONS.length) * 100, label: `${phase.label} · geste ${state.actionIndex + 1} sur ${ACTIONS.length}` });
    $("#practice-title")?.focus({ preventScroll: true });
  }

  function benchMarkup(equipment, expected) {
    const e = equipment;
    const expectedClass = (id) => id === expected ? " expected" : "";
    const attrs = (id, disabled = false, extraClass = "") => `class="direct-control${extraClass ? ` ${extraClass}` : ""}${expectedClass(id)}${disabled ? " is-disabled" : ""}" data-control="${id}" role="button" tabindex="${disabled ? -1 : 0}" aria-disabled="${disabled}"`;
    const sideMarkup = (side, x) => {
      const unit = e[side];
      const isBp = side === "bp";
      const stemCapOn = unit.stemCap === "on";
      const portCapOn = unit.portCap === "on";
      const identify = `identify-p-${side}`;
      const connect = isBp ? "connect-blue" : "connect-red";
      const serviceControl = expected === identify ? identify : connect;
      const connected = unit.connected;
      const capTransform = stemCapOn ? "" : isBp ? "translate(-150 92)" : "translate(150 92)";
      const portCapTransform = portCapOn ? "" : "translate(0 112)";
      return `<g transform="translate(${x} 430)">
        <text class="bench-title" x="145" y="-20">ROTALOCK ${side.toUpperCase()}</text>
        <rect class="bench-panel" width="290" height="220" rx="22"/>
        <path class="rotalock-pipe ${side}" d="M0 118 H76 M214 118 H290"/>
        <path class="rotalock-body" d="M67 78h156l23 40-23 40H67l-23-40z"/>
        <rect class="gland" x="${isBp ? 195 : 64}" y="88" width="32" height="60" rx="8"/>
        <g ${attrs(`${side}-gland`)}><rect class="hit-target" x="${isBp ? 184 : 53}" y="76" width="54" height="84" rx="10"/><text class="bench-small" x="${isBp ? 211 : 80}" y="174">PRESSE-ÉTOUPE</text></g>
        <g ${attrs(`${side}-stem-cap`)} transform="${capTransform}"><path class="cap" d="${isBp ? "M238 88h42l18 30-18 30h-42z" : "M10 88h42v60H10l-18-30z"}"/><rect class="hit-target" x="${isBp ? 226 : -18}" y="76" width="84" height="84" rx="12"/><text class="bench-small" x="${isBp ? 267 : 31}" y="181">BOUCHON CARRÉ</text></g>
        <g ${attrs(`${side}-stem`, stemCapOn)}><rect class="stem-square" x="${isBp ? 246 : 21}" y="100" width="38" height="38" rx="5"/><rect class="hit-target" x="${isBp ? 235 : 10}" y="88" width="60" height="62" rx="9"/><path d="${isBp ? "M254 108l22 22m0-22l-22 22" : "M29 108l22 22m0-22l-22 22"}" stroke="white" stroke-width="5" stroke-linecap="round"/></g>
        <path d="M112 78V36h66v42" fill="#dfe7ea" stroke="#10233c" stroke-width="5"/>
        <g ${attrs(`${side}-port-cap`)} transform="${portCapTransform}"><path class="cap" d="M104 38h82l-9-30h-64z"/><rect class="hit-target" x="96" y="0" width="98" height="62" rx="12"/><text class="bench-small" x="145" y="72">BOUCHON P</text></g>
        <g ${attrs(serviceControl, serviceControl !== identify && portCapOn && !connected)}><circle class="port-p" cx="145" cy="35" r="24"/><text class="bench-label" x="145" y="42">P</text><text class="bench-small" x="145" y="91">SERVICE · PRÈS DU CARRÉ</text></g>
        <g ${attrs(`p1-${side}`)}><rect class="hit-target" x="44" y="0" width="84" height="78" rx="16"/><circle class="port-p1" cx="87" cy="35" r="22"/><text class="bench-label" x="87" y="42">P1</text><text class="bench-small" x="55" y="91">PRESSOSTAT</text></g>
        <text class="bench-label" x="145" y="205">${unit.stem === "rear" ? "SIÈGE ARRIÈRE" : unit.stem === "mid" ? "INTERMÉDIAIRE" : "SIÈGE AVANT"}</text>
      </g>`;
    };
    const vacuumPath = e.pump.power === "on" && e.pump.isolation === "open" && e.manifold.bp === "open" && e.manifold.hp === "open";
    const pressure = e.pressureSeen && !e.residualTreated;
    const bpAngle = pressure ? 42 : vacuumPath || e.vacuumReached ? -31 : e.zero.bp ? 0 : -7;
    const hpAngle = pressure ? 78 : vacuumPath || e.vacuumReached ? -31 : e.zero.hp ? 0 : 8;
    const gaugeState = (side) => pressure ? (e.bp.stem === "rear" && e.hp.stem === "rear" ? "PRESSION PIÉGÉE" : "PRESSION LUE") : e.residualTreated ? "RETOUR À ZÉRO" : vacuumPath ? "SOUS VIDE" : e.vacuumReached ? "VIDE TENU" : e.zero[side] ? "ZÉRO" : "À CONTRÔLER";
    return `<svg id="work-scene" viewBox="0 0 1200 700" role="img" aria-label="Poste virtuel : manifold 2 voies, deux vannes Rotolock et pompe à vide">
      <rect class="bench-bg" width="1200" height="700"/>
      <g transform="translate(388 30)">
        <rect class="bench-metal" x="0" y="74" width="424" height="210" rx="27"/>
        <rect class="bench-face" x="18" y="96" width="388" height="112" rx="18"/>
        <text class="bench-title" x="212" y="264">MANIFOLD 2 VOIES</text>
        <g transform="translate(112 86)"><circle class="gauge-case" r="78"/><circle class="gauge-face bp" r="67"/><text class="gauge-word" y="28">BP</text><text class="gauge-state" y="49">${gaugeState("bp")}</text><line class="needle" x1="0" y1="14" x2="-30" y2="-46" style="transform:rotate(${bpAngle}deg)"/><circle r="8" fill="#10233c"/><g ${attrs("zero-bp", false, "zero-screw")}><circle cy="59" r="12"/><path d="M-6 59h12"/></g></g>
        <g transform="translate(312 86)"><circle class="gauge-case" r="78"/><circle class="gauge-face hp" r="67"/><text class="gauge-word" y="28">HP</text><text class="gauge-state" y="49">${gaugeState("hp")}</text><line class="needle" x1="0" y1="14" x2="-30" y2="-46" style="transform:rotate(${hpAngle}deg)"/><circle r="8" fill="#10233c"/><g ${attrs("zero-hp", false, "zero-screw")}><circle cy="59" r="12"/><path d="M-6 59h12"/></g></g>
        <g ${attrs("manifold-bp")} transform="translate(98 274)"><circle class="knob bp" r="28"/><line class="knob-line" y1="-18" y2="18" style="transform:rotate(${e.manifold.bp === "open" ? 90 : 0}deg)"/><text class="bench-label" y="50">ROBINET BP</text></g>
        <g ${attrs("manifold-hp")} transform="translate(326 274)"><circle class="knob hp" r="28"/><line class="knob-line" y1="-18" y2="18" style="transform:rotate(${e.manifold.hp === "open" ? 90 : 0}deg)"/><text class="bench-label" y="50">ROBINET HP</text></g>
        <circle cx="98" cy="338" r="14" fill="#fffdf8" stroke="#3d7fca" stroke-width="5"/><circle cx="212" cy="338" r="14" fill="#fffdf8" stroke="#b06a00" stroke-width="5" stroke-dasharray="3 7"/><circle cx="326" cy="338" r="14" fill="#fffdf8" stroke="#c0392b" stroke-width="5" stroke-dasharray="8 4"/>
        <text class="bench-small" x="98" y="371">BP</text><text class="bench-small" x="212" y="371">SERVICE</text><text class="bench-small" x="326" y="371">HP</text>
      </g>
      <path class="hose bp${e.bp.connected ? " connected" : ""}" d="M486 368 C440 448 316 430 185 465"/>
      <path class="hose hp${e.hp.connected ? " connected" : ""}" d="M714 368 C760 448 882 430 1015 465"/>
      <path class="hose service${e.pump.connected ? " connected" : ""}" d="M600 368 C600 468 600 505 600 554"/>
      ${sideMarkup("bp", 36)}${sideMarkup("hp", 874)}
      <g transform="translate(445 530)"><text class="bench-title" x="155" y="-16">POMPE À VIDE</text><rect class="pump-body" width="310" height="135" rx="20"/><path d="M28 30h126v72H28z M48 30v72m24-72v72m24-72v72m24-72v72" fill="none" stroke="#637285" stroke-width="5"/><g ${attrs("connect-yellow")}><circle class="port-p" cx="155" cy="3" r="23"/><text class="bench-label" x="155" y="10">P</text></g><g ${attrs("pump-isolation")} transform="translate(235 42)"><circle class="knob" fill="#33475b" r="24"/><line class="knob-line" y1="-16" y2="16" style="transform:rotate(${e.pump.isolation === "open" ? 90 : 0}deg)"/><text class="bench-small" y="49">ISOLEMENT</text></g><g ${attrs("pump-power")}><rect class="pump-control${e.pump.power === "on" ? " on" : ""}" x="214" y="82" width="52" height="38" rx="7"/><text class="bench-small" x="240" y="130">MARCHE / ARRÊT</text></g></g>
      <g class="action-card" transform="translate(18 24)"><rect width="250" height="68" rx="15"/><text x="125" y="29">PRÉPARATION ACQUISE</text><text x="125" y="51">risque · protections · fluide · limites</text></g>
      <g ${attrs("inspect-hoses", false, "action-card")} transform="translate(18 108)"><rect width="250" height="60" rx="15"/><text x="125" y="27">FLEXIBLES CONTRÔLÉS</text><text x="125" y="48">bleu · rouge · jaune · joints</text></g>
      <g ${attrs("check-path", false, "action-card")} transform="translate(18 184)"><rect width="250" height="60" rx="15"/><text x="125" y="27">CHEMIN VÉRIFIÉ</text><text x="125" y="48">BP · HP · service</text></g>
      <g ${attrs("vacuum-check", false, "action-card success")} transform="translate(932 24)"><rect width="250" height="68" rx="15"/><text x="125" y="29">VIDE DES LIGNES</text><text x="125" y="51">critère du plateau</text></g>
      <g ${attrs("read-pressures", false, "action-card")} transform="translate(932 108)"><rect width="250" height="60" rx="15"/><text x="125" y="27">RELEVER BP / HP</text><text x="125" y="48">robinets manifold fermés</text></g>
      <g ${attrs("leak-check", false, "action-card success")} transform="translate(932 184)"><rect width="250" height="60" rx="15"/><text x="125" y="27">ÉTANCHÉITÉ</text><text x="125" y="48">vide ou pression</text></g>
      <g class="action-card danger" transform="translate(932 260)"><rect width="250" height="76" rx="15"/><text x="125" y="28">DÉPOSE SANS REJET</text><text x="125" y="50">HP isolée · BP aspirée</text><text x="125" y="68">RECHERCHE DE FUITE FINALE</text></g>
      <g ${attrs("final-check", false, "action-card success")} transform="translate(18 260)"><rect width="250" height="68" rx="15"/><text x="125" y="29">CONTRÔLE FINAL</text><text x="125" y="51">positions · bouchons · fuite</text></g>
      <g ${attrs("store", false, "action-card")} transform="translate(475 410)"><rect width="250" height="64" rx="15"/><text x="125" y="28">RANGER LE MANIFOLD</text><text x="125" y="50">zéro · flexibles déposés</text></g>
    </svg>`;
  }

  function wireDirectControls() {
    $$('[data-control]', visualRoot).forEach((node) => {
      const run = () => act(node.dataset.control, node.dataset.choice || "");
      node.addEventListener("click", run);
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); run(); }
      });
    });
  }

  function updateBenchView(control) {
    const svg = $("#work-scene");
    if (!svg || !window.matchMedia("(max-width: 650px)").matches) return;
    let view = "330 0 540 700";
    if (control.startsWith("bp-") || control === "identify-p-bp" || control === "connect-blue" || control === "p1-bp") view = "0 320 470 380";
    else if (control.startsWith("hp-") || control === "identify-p-hp" || control === "connect-red" || control === "p1-hp") view = "730 320 470 380";
    else if (["identify-jet-axis", "select-base-ppe", "identify-fluid", "check-compatibility", "check-work-area", "inspect-hoses", "check-path", "final-check"].includes(control)) view = "0 0 500 420";
    else if (["vacuum-check", "read-pressures", "leak-check"].includes(control)) view = "700 0 500 420";
    else if (control.startsWith("pump-") || control === "connect-yellow") view = "360 360 480 340";
    svg.setAttribute("viewBox", view);
  }

  function safetyMessage(action) {
    const e = state.equipment;
    const side = action.side;
    if (action.control.endsWith("-stem") && side) {
      if (e[side].stemCap !== "removed") return "Blocage : retirez d’abord le bouchon du carré.";
      if (e[side].gland !== "loose") return "Blocage : libérez d’abord légèrement le presse-étoupe.";
      if (action.expect === "mid" && !e.vacuumReached) return "Blocage : les lignes doivent être mises au vide et contrôlées avant la mise en lecture.";
    }
    if (action.control === "connect-blue" && action.expect && e.bp.portCap !== "removed") return "Blocage : retirez d’abord le bouchon P de la BP.";
    if (action.control === "connect-red" && action.expect && e.hp.portCap !== "removed") return "Blocage : retirez d’abord le bouchon P de la HP.";
    if (action.control === "mini-blue" && action.expect === "open" && !e.bp.connected) return "Blocage : raccordez d’abord le flexible bleu sur P BP.";
    if (action.control === "mini-red" && action.expect === "open" && !e.hp.connected) return "Blocage : raccordez d’abord le flexible rouge sur P HP.";
    if (action.control === "mini-yellow" && action.expect === "open" && !e.pump.connected) return "Blocage : raccordez d’abord le flexible jaune à la pompe.";
    if (action.control === "pump-power" && action.expect === "on") {
      if (!e.pump.connected || e.pump.isolation !== "open" || e.manifold.bp !== "open" || e.manifold.hp !== "open") return "Blocage : le trajet de vide n’est pas entièrement ouvert.";
      if (e.mini.blue !== "open" || e.mini.red !== "open" || e.mini.yellow !== "open") return "Blocage : ouvrez les trois mini-vannes des flexibles avant de démarrer la pompe.";
      if (e.bp.stem !== "rear" || e.hp.stem !== "rear") return "Blocage : les Rotolock doivent rester au siège arrière pendant le vide des lignes.";
    }
    if (action.control === "pump-power" && action.expect === "off" && (e.manifold.bp !== "closed" || e.manifold.hp !== "closed" || e.pump.isolation !== "closed")) return "Blocage : fermez les deux robinets du manifold et isolez la pompe avant l’arrêt.";
    if (action.control === "read-pressures" && (e.bp.stem !== "mid" || e.hp.stem !== "mid" || e.manifold.bp !== "closed" || e.manifold.hp !== "closed" || e.mini.blue !== "open" || e.mini.red !== "open")) return "Blocage : Rotolock en intermédiaire, mini-vannes bleue et rouge ouvertes, robinets du manifold fermés.";
    if (action.control === "close-liquid-feed" && !e.recovery.method) return "Blocage : choisissez d’abord l’organe prévu par le schéma et la procédure du poste.";
    if (action.control === "recover-hose-fluid" && (e.hp.stem !== "rear" || e.bp.stem !== "mid")) return "Blocage : la HP doit être isolée au siège arrière tandis que la BP reste ouverte vers l’aspiration.";
    if (action.control === "recover-hose-fluid" && (e.manifold.hp !== "open" || e.manifold.bp !== "open" || e.recovery.liquidFeed !== "closed" || e.mini.blue !== "open" || e.mini.red !== "open")) return "Blocage : coupez l’alimentation liquide et ouvrez les chemins rouge et bleu avant la récupération.";
    if (action.control === "pumpdown-stop" && !e.recovery.flowing) return "Blocage : observez d’abord la circulation du fluide et la baisse de pression.";
    if (action.control === "pressure-stable" && (!e.recovery.stopped || e.bp.stem !== "rear" || e.hp.stem !== "rear" || e.manifold.bp !== "closed" || e.manifold.hp !== "closed")) return "Blocage : compresseur arrêté, deux prises P isolées et deux robinets du manifold fermés avant la stabilisation.";
    if ((action.control === "connect-blue" || action.control === "connect-red") && action.expect === false && !e.residualTreated) return "Blocage : traitez la pression résiduelle avant de desserrer un raccord.";
    if (action.control === "connect-blue" && action.expect === false && e.mini.blue !== "closed") return "Blocage : fermez la mini-vanne bleue avant de desserrer son raccord.";
    if (action.control === "connect-red" && action.expect === false && e.mini.red !== "closed") return "Blocage : fermez la mini-vanne rouge avant de desserrer son raccord.";
    if (action.control === "connect-yellow" && action.expect === false && e.mini.yellow !== "closed") return "Blocage : fermez la mini-vanne jaune avant de débrancher la pompe.";
    if (action.control === "restore-liquid-feed" && (e.bp.connected || e.hp.connected || e.bp.portCap !== "on" || e.hp.portCap !== "on" || e.bp.stemCap !== "on" || e.hp.stemCap !== "on" || e.bp.gland !== "tight" || e.hp.gland !== "tight")) return "Blocage : déconnectez, resserrez les presse-étoupes et remettez les bouchons avant la remise en service.";
    if (action.control.startsWith("leak-final-") && !e.recovery.restored) return "Blocage : rétablissez d’abord l’alimentation liquide et l’état normal du poste.";
    if (action.control === "final-check" && (e.bp.connected || e.hp.connected || e.pump.connected || e.bp.portCap !== "on" || e.hp.portCap !== "on" || e.bp.stemCap !== "on" || e.hp.stemCap !== "on" || e.bp.gland !== "tight" || e.hp.gland !== "tight" || e.mini.blue !== "closed" || e.mini.red !== "closed" || e.mini.yellow !== "closed" || !e.recovery.restored || !e.finalLeaks.has("leak-final-confirm"))) return "Blocage : vérifiez presse-étoupes, bouchons, remise en service et recherche de fuite avant le contrôle final.";
    return "";
  }

  function applyAction(action, equipment = state.equipment, choice = "") {
    const e = equipment;
    const c = action.control;
    if (["identify-jet-axis", "select-base-ppe", "identify-fluid", "check-compatibility", "check-work-area", "inspect-hoses", "check-path", "final-check", "store"].includes(c) || c.startsWith("identify-p-")) e.checks.add(c);
    else if (c === "choose-isolation-method") e.recovery.method = choice || e.recovery.method || "solenoid";
    else if (c === "close-liquid-feed") e.recovery.liquidFeed = "closed";
    else if (c === "recover-hose-fluid") e.recovery.flowing = true;
    else if (c === "pumpdown-stop") { e.recovery.flowing = false; e.recovery.compressor = "off"; e.recovery.stopped = true; }
    else if (c === "pressure-stable") e.residualTreated = true;
    else if (c === "restore-liquid-feed") { e.recovery.liquidFeed = "open"; e.recovery.restored = true; }
    else if (c.startsWith("leak-final-")) e.finalLeaks.add(c);
    else if (c === "zero-bp") e.zero.bp = true;
    else if (c === "zero-hp") e.zero.hp = true;
    else if (c === "bp-stem-cap" || c === "hp-stem-cap") e[action.side].stemCap = action.expect;
    else if (c === "bp-port-cap" || c === "hp-port-cap") e[action.side].portCap = action.expect;
    else if (c === "bp-gland" || c === "hp-gland") e[action.side].gland = action.expect;
    else if (c === "bp-stem" || c === "hp-stem") {
      e[action.side].stem = action.expect;
      if (e.bp.stem === "mid" && e.hp.stem === "mid") e.pressureSeen = true;
    } else if (c === "connect-blue") e.bp.connected = action.expect;
    else if (c === "connect-red") e.hp.connected = action.expect;
    else if (c === "connect-yellow") e.pump.connected = action.expect;
    else if (c === "mini-blue") e.mini.blue = action.expect;
    else if (c === "mini-red") e.mini.red = action.expect;
    else if (c === "mini-yellow") e.mini.yellow = action.expect;
    else if (c === "manifold-bp") e.manifold.bp = action.expect;
    else if (c === "manifold-hp") e.manifold.hp = action.expect;
    else if (c === "pump-isolation") e.pump.isolation = action.expect;
    else if (c === "pump-power") e.pump.power = action.expect;
    else if (c === "vacuum-check") e.vacuumReached = true;
    else if (c === "read-pressures" || c === "leak-check") e.checks.add(`${c}-${action.expect}`);
  }

  function act(control, choice = "") {
    if (state.locked || state.screen !== "practice") return;
    const action = currentAction();
    if (control !== action.control) {
      if (state.practiceMode === "autonomous") state.autonomousMistakes.add(state.actionIndex);
      const isP1 = control.startsWith("p1-");
      state.feedback = WRONG_FEEDBACK[control] || (isP1 ? "Danger : P1 reste au pressostat et peut être sous pression. Cherchez P près du carré." : state.practiceMode === "guided" ? `Pas maintenant : ${action.title.toLowerCase()}.` : "Ce geste n’est pas le prochain. Observez l’état du poste ou ouvrez la coupe Rotolock.");
      state.feedbackType = "error";
      renderPractice();
      return;
    }
    const blocker = safetyMessage(action);
    if (blocker) {
      if (state.practiceMode === "autonomous") state.autonomousMistakes.add(state.actionIndex);
      state.feedback = blocker;
      state.feedbackType = "error";
      renderPractice();
      return;
    }
    applyAction(action, state.equipment, choice);
    state.locked = true;
    state.feedback = `Correct — ${action.check}`;
    state.feedbackType = "correct";
    renderPractice();
    window.setTimeout(() => {
      state.actionIndex += 1;
      state.locked = false;
      state.feedbackType = "waiting";
      if (state.actionIndex >= ACTIONS.length) {
        state.actionIndex = ACTIONS.length - 1;
        if (state.practiceMode === "autonomous") setScreen("result");
        else if (state.courseChain) startAssessment();
        else setScreen("result");
      } else {
        state.feedback = state.practiceMode === "guided" ? "Le prochain objet porte un contour orange." : "À vous de retrouver le geste suivant.";
        renderPractice();
      }
    }, action.delay || 620);
  }

  function rebuildEquipment(index) {
    const equipment = makeEquipment();
    for (let i = 0; i < index; i += 1) applyAction(ACTIONS[i], equipment);
    state.equipment = equipment;
  }

  function renderAssessmentMenu() {
    buildPhaseStrip(7, 6);
    lessonPanel.innerHTML = `<p class="lesson-kicker">ÉVALUATION FORMATIVE</p><h1 tabindex="-1">Trois preuves complémentaires</h1><p class="lesson-intro">La théorie, l’ordre global et le geste numérique ne mesurent pas exactement la même chose.</p>${blocksMarkup([["1 · QCM", `${QUIZ.length} décisions expliquées.`], ["2 · Ordre", "8 phases à reconstruire."], ["3 · Autonomie", "Le parcours complet sans contour d’aide."]])}<p class="tip-card">Ce résultat est un entraînement. Il ne remplace pas l’observation au poste réel.</p>`;
    $("#visual-title").textContent = "Choisir une évaluation";
    $("#visual-status").textContent = "Formative";
    sceneFeedback.textContent = "Commencez par le QCM ou lancez directement la manipulation autonome.";
    visualRoot.innerHTML = `<div class="assessment-menu"><button class="assessment-card" data-assessment="quiz"><strong>QCM technique</strong><span>Vannes Rotolock, P/P1, robinets, vide et dépose.</span></button><button class="assessment-card" data-assessment="order"><strong>Jeu de l’ordre</strong><span>Reconstruire les huit grandes phases.</span></button><button class="assessment-card" data-assessment="autonomous"><strong>Parcours autonome</strong><span>${ACTIONS.length} gestes sur le poste virtuel.</span></button></div>`;
    $$('[data-assessment]', visualRoot).forEach((button) => button.addEventListener("click", () => {
      if (button.dataset.assessment === "quiz") { state.quizIndex = 0; state.quizScore = 0; state.quizAnswered = false; state.quizChoice = -1; state.quizOrder = shuffledIndexes(QUIZ[0].choices.length); setScreen("quiz"); }
      else if (button.dataset.assessment === "order") { state.orderChosen = []; state.orderBank = shuffledOrderIds(); state.orderDone = false; setScreen("order"); }
      else startPractice("autonomous", true);
    }));
    setNavigation({ previous: true, next: false, progress: 0, label: "Évaluation formative" });
    $("h1", lessonPanel)?.focus({ preventScroll: true });
  }

  function renderQuiz() {
    buildPhaseStrip(7, 6);
    if (state.quizIndex >= QUIZ.length) {
      const passed = state.quizScore >= QUIZ_PASS;
      lessonPanel.innerHTML = `<p class="lesson-kicker">BILAN QCM</p><h1 tabindex="-1">${passed ? "Repères théoriques solides" : "Quelques règles sont à reprendre"}</h1><p class="lesson-intro">Seuil interne du module : ${QUIZ_PASS} réponses justes sur ${QUIZ.length}. Ce n’est pas un examen officiel.</p>${blocksMarkup([["Résultat", `${state.quizScore}/${QUIZ.length}`], ["Suite", "Refaites le QCM ou testez l’ordre des phases et le parcours autonome."]])}`;
      visualRoot.innerHTML = `<div class="score-card"><div class="score-number">${state.quizScore}/${QUIZ.length}</div><p>${passed ? "Les décisions essentielles sont acquises dans ce QCM." : "Relisez les corrections puis recommencez."}</p><button type="button" class="nav-button primary" id="restart-quiz">Refaire le QCM</button></div>`;
      $("#restart-quiz").addEventListener("click", () => { state.quizIndex = 0; state.quizScore = 0; state.quizAnswered = false; state.quizChoice = -1; state.quizOrder = shuffledIndexes(QUIZ[0].choices.length); renderQuiz(); });
      $("#visual-title").textContent = "Résultat théorique";
      $("#visual-status").textContent = `${state.quizScore}/${QUIZ.length}`;
      sceneFeedback.textContent = "Ajoutez une preuve pratique avec le parcours autonome.";
      setNavigation({ previous: true, next: true, nextLabel: "Choisir une autre évaluation →", progress: 100, label: "QCM terminé" });
      return;
    }
    const item = QUIZ[state.quizIndex];
    if (state.quizOrder.length !== item.choices.length) state.quizOrder = shuffledIndexes(item.choices.length);
    lessonPanel.innerHTML = `<p class="lesson-kicker">QCM · QUESTION ${state.quizIndex + 1} / ${QUIZ.length}</p><h1 tabindex="-1">${esc(item.q)}</h1><p class="lesson-intro">Choisissez une réponse. La correction apparaît immédiatement.</p>${state.quizAnswered ? blocksMarkup([[state.quizChoice === item.good ? "Correct" : "À revoir", item.why]]) : ""}<p class="tip-card ${state.quizAnswered ? state.quizChoice === item.good ? "correct" : "error" : ""}">${state.quizAnswered ? "Réponse verrouillée. Lisez la correction avant de continuer." : "Une seule réponse est attendue."}</p>`;
    visualRoot.innerHTML = `<div class="quiz-options">${state.quizOrder.map((choiceIndex) => `<button type="button" class="quiz-option${state.quizAnswered && choiceIndex === item.good ? " good" : ""}${state.quizAnswered && choiceIndex === state.quizChoice && choiceIndex !== item.good ? " bad" : ""}" data-choice="${choiceIndex}" ${state.quizAnswered ? "disabled" : ""}>${esc(item.choices[choiceIndex])}</button>`).join("")}</div>`;
    $$('[data-choice]', visualRoot).forEach((button) => button.addEventListener("click", () => {
      if (state.quizAnswered) return;
      state.quizChoice = Number(button.dataset.choice);
      state.quizAnswered = true;
      if (state.quizChoice === item.good) state.quizScore += 1;
      renderQuiz();
    }));
    $("#visual-title").textContent = "QCM technique";
    $("#visual-status").textContent = `${state.quizScore} point${state.quizScore > 1 ? "s" : ""}`;
    sceneFeedback.textContent = state.quizAnswered ? item.why : "La correction ne sanctionne pas : elle explique la règle.";
    setNavigation({ previous: true, next: state.quizAnswered, nextLabel: state.quizIndex === QUIZ.length - 1 ? "Voir le résultat →" : "Question suivante →", progress: ((state.quizIndex + (state.quizAnswered ? 1 : 0)) / QUIZ.length) * 100, label: `Question ${state.quizIndex + 1} sur ${QUIZ.length}` });
    $("h1", lessonPanel)?.focus({ preventScroll: true });
  }

  function renderOrderGame() {
    buildPhaseStrip(7, 6);
    const expectedIds = ORDER_ITEMS.map((item) => item.id);
    if (state.orderChosen.length === ORDER_ITEMS.length) state.orderDone = true;
    const correctCount = state.orderChosen.filter((id, index) => id === expectedIds[index]).length;
    lessonPanel.innerHTML = `<p class="lesson-kicker">MINI-JEU · ORDRE GLOBAL</p><h1 tabindex="-1">Reconstruire les huit phases</h1><p class="lesson-intro">Cliquez les cartes dans l’ordre professionnel, de l’analyse des risques au rangement.</p>${state.orderDone ? blocksMarkup([[correctCount === 8 ? "Ordre exact" : "À reprendre", `${correctCount}/8 phases sont à la bonne place.`], ["Règle", "La dépose comprend l’isolement, le traitement du fluide piégé et le contrôle final."]]) : ""}<p class="tip-card ${state.orderDone ? correctCount === 8 ? "correct" : "error" : ""}">${state.orderDone ? "La correction compare chaque place." : "Vous pouvez recommencer avant la correction finale."}</p>`;
    visualRoot.innerHTML = `<div class="order-board"><div class="order-bank"><h3>Phases disponibles</h3><div class="order-items">${state.orderBank.map((id) => { const item = ORDER_ITEMS.find((entry) => entry.id === id); const used = state.orderChosen.includes(id); return `<button type="button" class="order-item" data-order-id="${id}" ${used ? "disabled" : ""}>${esc(item.label)}</button>`; }).join("")}</div></div><div class="order-result"><h3>Votre ordre</h3>${state.orderChosen.map((id, index) => { const item = ORDER_ITEMS.find((entry) => entry.id === id); const status = state.orderDone ? id === expectedIds[index] ? " good" : " bad" : ""; return `<div class="order-line${status}"><strong>${index + 1}</strong><span>${esc(item.label)}</span></div>`; }).join("")}</div></div>`;
    $$('[data-order-id]', visualRoot).forEach((button) => button.addEventListener("click", () => { if (!state.orderDone) { state.orderChosen.push(button.dataset.orderId); renderOrderGame(); } }));
    $("#visual-title").textContent = "Ordre de pose et de dépose";
    $("#visual-status").textContent = state.orderDone ? `${correctCount}/8` : `${state.orderChosen.length}/8`;
    sceneFeedback.textContent = state.orderDone ? (correctCount === 8 ? "Les huit phases sont dans l’ordre." : "Comparez les places en vert double et en rouge tireté.") : "Cliquez une phase pour l’ajouter à droite.";
    setNavigation({ previous: true, next: state.orderDone, nextLabel: "Revenir aux évaluations →", progress: (state.orderChosen.length / ORDER_ITEMS.length) * 100, label: `${state.orderChosen.length} phase${state.orderChosen.length > 1 ? "s" : ""} sur 8` });
    $("h1", lessonPanel)?.focus({ preventScroll: true });
  }

  function renderWorkshop() {
    const action = ACTIONS[state.workshopIndex];
    const phase = PHASES.find((item) => item.id === action.phase);
    buildPhaseStrip(PHASES.findIndex((item) => item.id === action.phase), PHASES.findIndex((item) => item.id === action.phase) - 1);
    lessonPanel.innerHTML = `<p class="lesson-kicker">GUIDE ATELIER · ${phase.label.toUpperCase()}</p><h1 tabindex="-1">${esc(action.title)}</h1><p class="lesson-intro">Guidance à utiliser avec la notice, la procédure du plateau et la supervision du formateur.</p>${blocksMarkup([["Observer", action.look], ["Faire", action.doText], ["Contrôler", action.check], ["Justifier", action.why]])}<p class="tip-card">Cochez cette étape sur la version imprimée seulement après le contrôle réel.</p>`;
    visualRoot.innerHTML = `<div class="workshop-card"><p class="eyebrow">ÉTAPE ${state.workshopIndex + 1} SUR ${ACTIONS.length}</p><h2>${esc(action.title)}</h2><div class="workshop-checklist"><div class="workshop-check"><strong>□ Action réalisée</strong><span>${esc(action.doText)}</span></div><div class="workshop-check control"><strong>□ Résultat contrôlé</strong><span>${esc(action.check)}</span></div></div><p class="scope-note"><strong>Point de vigilance :</strong> ${esc(action.why)}</p><button type="button" class="small-button" id="print-guide-button">Imprimer toute la guidance</button></div>`;
    $("#print-guide-button").addEventListener("click", () => window.print());
    $("#visual-title").textContent = "Feuille de guidance";
    $("#visual-status").textContent = `${state.workshopIndex + 1}/${ACTIONS.length}`;
    sceneFeedback.textContent = "Le mode impression contient toutes les étapes avec une case d’action et une case de contrôle.";
    cutawayButton.hidden = !action.side;
    setNavigation({ previous: state.workshopIndex > 0, next: true, nextLabel: state.workshopIndex === ACTIONS.length - 1 ? "Revenir à l’accueil →" : "Étape suivante →", progress: ((state.workshopIndex + 1) / ACTIONS.length) * 100, label: `${phase.label} · ${state.workshopIndex + 1} sur ${ACTIONS.length}` });
    $("h1", lessonPanel)?.focus({ preventScroll: true });
  }

  function buildPrintGuide() {
    const grouped = PHASES.map((phase) => ({ phase, actions: ACTIONS.filter((action) => action.phase === phase.id) })).filter((group) => group.actions.length);
    $("#print-steps").innerHTML = grouped.map(({ phase, actions }) => `<section class="print-phase"><h2>${esc(phase.label)}</h2>${actions.map((action) => `<div class="print-step"><span class="print-box" aria-hidden="true"></span><div><strong>${esc(action.title)}</strong><span>${esc(action.doText)} Contrôle : ${esc(action.check)}</span></div></div>`).join("")}</section>`).join("");
  }

  function renderResult() {
    buildPhaseStrip(state.practiceMode === "autonomous" ? 7 : 6, 6);
    const firstTry = ACTIONS.length - state.autonomousMistakes.size;
    const autonomous = state.practiceMode === "autonomous";
    lessonPanel.innerHTML = `<p class="lesson-kicker">PARCOURS TERMINÉ</p><h1 tabindex="-1">Le poste est remis en état</h1><p class="lesson-intro">La simulation vérifie l’ordre numérique. Le geste réel doit encore être observé au plateau.</p>${blocksMarkup([["Préparation", "Risque compris, protections choisies, fluide identifié, compatibilité et matériel contrôlés."], ["Rotolock", "P/P1 distinguées ; chaque carré encadré par desserrage léger puis resserrage du presse-étoupe."], ["Pose", "Mini-vannes ouvertes ; lignes tirées au vide avant la mise en lecture."], ["Dépose", "Fluide des flexibles récupéré par l’aspiration ; presse-étoupes serrés ; bouchons remis ; alimentation liquide rétablie ; recherche de fuite terminée."]])}`;
    visualRoot.innerHTML = `<div class="score-card"><div class="score-number">${autonomous ? `${firstTry}/${ACTIONS.length}` : "✓"}</div><p>${autonomous ? "gestes réussis du premier coup dans le parcours autonome" : "parcours guidé terminé"}</p><button type="button" class="nav-button primary" id="restart-practice">Recommencer</button></div>`;
    $("#restart-practice").addEventListener("click", () => startPractice(state.practiceMode, true));
    $("#visual-title").textContent = "Bilan de manipulation";
    $("#visual-status").textContent = autonomous ? `${firstTry}/${ACTIONS.length}` : "Terminé";
    sceneFeedback.textContent = "Utilisez ensuite le guide atelier avec le matériel réel et le formateur.";
    setNavigation({ previous: true, next: true, nextLabel: state.courseChain ? "Passer à l’évaluation →" : "Accueil →", progress: 100, label: "Parcours terminé" });
    $("h1", lessonPanel)?.focus({ preventScroll: true });
  }

  function renderCutaway(position) {
    const action = state.screen === "workshop" ? ACTIONS[state.workshopIndex] : currentAction();
    const side = action?.side || "bp";
    const api = window.Mano2Visuals;
    if (!api) { $("#cutaway-root").textContent = "La coupe Rotolock n’est pas disponible."; return; }
    $("#cutaway-root").innerHTML = api.cutaway(position, side);
    const explanations = {
      back: "Siège arrière : T communique avec C ; P est isolée. C’est la position de raccordement, de vide des lignes et d’isolement avant dépose.",
      mid: "Position intermédiaire : T, C, P et P1 communiquent. C’est la position de lecture des pressions.",
      front: "Siège avant : T est isolée de C ; P et P1 restent reliées à C. Cette position est expliquée mais n’est pas ajoutée artificiellement au parcours de pose."
    };
    $("#cutaway-explanation").textContent = explanations[position];
    $$('[data-dialog-position]').forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.dialogPosition === position)));
  }

  $$('[data-start]').forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.start === "course") startLessons(true);
    else if (button.dataset.start === "guided") { state.courseChain = false; startPractice("guided", true); }
    else if (button.dataset.start === "assessment") startAssessment();
    else startWorkshop();
  }));
  $("#home-button").addEventListener("click", () => setScreen("home"));
  $("#exit-button").addEventListener("click", () => setScreen("home"));
  previousButton.addEventListener("click", () => {
    if (state.screen === "lessons") { state.lessonIndex = Math.max(0, state.lessonIndex - 1); render(); }
    else if (state.screen === "practice") { state.actionIndex = Math.max(0, state.actionIndex - 1); rebuildEquipment(state.actionIndex); state.feedback = "Étape précédente restaurée."; state.feedbackType = "waiting"; render(); }
    else if (state.screen === "quiz" || state.screen === "order") startAssessment();
    else if (state.screen === "assessment" || state.screen === "result") setScreen("home");
    else if (state.screen === "workshop") { state.workshopIndex = Math.max(0, state.workshopIndex - 1); render(); }
  });
  nextButton.addEventListener("click", () => {
    if (state.screen === "lessons") {
      if (state.lessonIndex < LESSONS.length - 1) { state.lessonIndex += 1; render(); }
      else startPractice("guided", true);
    } else if (state.screen === "quiz") {
      if (state.quizIndex >= QUIZ.length) startAssessment();
      else if (state.quizAnswered) { state.quizIndex += 1; state.quizAnswered = false; state.quizChoice = -1; state.quizOrder = state.quizIndex < QUIZ.length ? shuffledIndexes(QUIZ[state.quizIndex].choices.length) : []; render(); }
    } else if (state.screen === "order") startAssessment();
    else if (state.screen === "workshop") {
      if (state.workshopIndex < ACTIONS.length - 1) { state.workshopIndex += 1; render(); }
      else setScreen("home");
    } else if (state.screen === "result") {
      if (state.courseChain) startAssessment();
      else setScreen("home");
    }
  });
  cutawayButton.addEventListener("click", () => {
    const action = state.screen === "workshop" ? ACTIONS[state.workshopIndex] : currentAction();
    const stemPosition = action?.side ? state.equipment[action.side]?.stem || "rear" : "rear";
    const position = stemPosition === "rear" ? "back" : stemPosition;
    renderCutaway(position);
    cutawayDialog.showModal();
  });
  $("#close-dialog").addEventListener("click", () => cutawayDialog.close());
  $$('[data-dialog-position]').forEach((button) => button.addEventListener("click", () => renderCutaway(button.dataset.dialogPosition)));
  cutawayDialog.addEventListener("click", (event) => { if (event.target === cutawayDialog) cutawayDialog.close(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !cutawayDialog.open && state.screen !== "home") setScreen("home");
    if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && !["INPUT", "BUTTON"].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      (event.key === "ArrowLeft" ? previousButton : nextButton).click();
    }
  });

  buildPrintGuide();
})();

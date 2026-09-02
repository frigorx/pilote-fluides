"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const qaFast = new URLSearchParams(location.search).has("qa-fast");
const transitionDelay = qaFast ? 15 : 360;
const summaryDelay = qaFast ? 25 : 450;

const phases = [
  { narration: "Première phase : analyser et préparer le poste. Avant de toucher au moindre raccord, trois choses. Localisez le composant sur lequel vous allez intervenir — cela détermine tout le reste. Choisissez le mode d'intervention selon ce que vous devez faire : remplacer un organe, vider entièrement, ou seulement isoler une partie. Puis vérifiez le poste et les positions de départ de chaque vanne. Cette dernière vérification vous évitera la mauvaise surprise la plus classique : une vanne qu'on croyait fermée et qui ne l'était pas.", id: "prepare", label: "1 · Préparer", title: "Analyser et préparer le poste", objective: "Localisez le composant, choisissez le mode d'intervention, puis vérifiez le poste et les positions de départ." },
  { narration: "Deuxième phase : contrôler puis raccorder le manifold. L'ordre des deux verbes n'est pas décoratif — on contrôle avant de raccorder, jamais l'inverse. Vérifiez le manifold et les flexibles : leur état, leur marquage de pression, la présence des mini-vannes. Puis raccordez chaque extrémité au bon appareil. Un flexible dont on découvre le défaut après raccordement, c'est un circuit déjà ouvert et un fluide déjà engagé.", id: "connect", label: "2 · Poser le manifold", title: "Contrôler puis raccorder le manifold", objective: "Contrôlez le manifold et les flexibles, puis raccordez chaque extrémité équipée de sa mini-vanne au bon appareil." },
  { narration: "Troisième phase : mettre les lignes au vide. Il faut évacuer l'air des flexibles et de tout le chemin vers la station **avant** d'ouvrir le cylindre. Pourquoi ? Parce que cet air, sinon, part directement dans la bouteille de récupération avec le fluide. Vous y introduiriez des incondensables, qui feront monter la pression de la bouteille et rendront le fluide inutilisable pour un réemploi. Cette purge de quelques secondes protège la valeur de ce que vous récupérez.", id: "pre-vacuum", label: "3 · Purger l'air", title: "Mettre les lignes au vide", objective: "Évacuez l'air des flexibles et du chemin de la station avant d'ouvrir le cylindre." },
  { narration: "Quatrième phase : récupérer la phase liquide. On crée le chemin depuis la haute pression vers la station, et la bouteille reçoit le fluide par son raccord vapeur. Ce point surprend souvent : on envoie du liquide, mais on entre par le raccord vapeur de la bouteille. C'est voulu — le liquide tombe au fond, et l'espace vapeur reste disponible en partie haute. Récupérer d'abord en phase liquide est aussi ce qui va le plus vite : le liquide est beaucoup plus dense que la vapeur, on transfère bien plus de masse en moins de temps.", id: "liquid", label: "4 · Liquide", title: "Récupérer la phase liquide", objective: "Créez le chemin HP vers la station ; la bouteille reçoit le fluide par son raccord VAPEUR." },
  { narration: "Cinquième phase : finir en phase vapeur. Quand il n'y a plus de liquide à transférer, il reste de la vapeur dans le circuit — et elle représente encore du fluide qu'on n'a pas le droit de relâcher. On bascule donc en phase vapeur pour terminer. Cette phase est plus lente, c'est normal : on transfère moins de masse à chaque instant. C'est aussi celle qu'on est tenté d'écourter. Le critère d'arrêt n'est pas l'impatience, c'est la valeur de pression prévue par la procédure.", id: "vapor", label: "5 · Vapeur", title: "Finir en phase vapeur", objective: "Isolez la HP, basculez l'entrée station, puis récupérez par la BP." },
  { narration: "Sixième phase : vider la station. Une fois l'installation récupérée, du fluide reste dans la station elle-même — dans son circuit interne, ses flexibles, son condenseur. Le vider est une étape à part entière, avec sa propre manœuvre. L'oublier a deux conséquences : ce fluide n'est pas comptabilisé, et il restera dans la machine pour la prochaine intervention, sur une autre installation, avec un autre fluide. C'est ainsi qu'on fabrique des mélanges impossibles à identifier.", id: "purge", label: "6 · Auto-purge", title: "Vider la Minimax-E", objective: "Isolez le circuit, arrêtez la machine, placez le sélecteur noir sur PURGE et videz la station." },
  { narration: "Septième phase : peser et libérer la station. La pesée est ce qui transforme votre récupération en donnée traçable : c'est la masse récupérée, celle qui figurera au registre. Elle se fait sur une balance stable, et elle se note. Puis on libère la station selon la procédure. Rappelez-vous que cette masse n'est pas une formalité administrative : c'est ce qui prouve, en cas de contrôle, que le fluide a été récupéré et non relâché.", id: "weigh", label: "7 · Peser", title: "Peser et libérer la station", objective: "Notez la masse finale, calculez la masse récupérée et déposez la branche station." },
  { narration: "Huitième phase : tirer l'installation au vide. Récupérer n'est pas tirer au vide — ce sont deux opérations distinctes, avec deux buts différents. La récupération retire le fluide ; le tirage au vide retire ce qui reste, c'est-à-dire l'air et l'humidité, avant une remise en service. C'est le vide qui fait bouillir l'eau résiduelle à température ambiante et permet de l'évacuer. Une installation récupérée mais non tirée au vide contient encore de l'humidité — et cette humidité produira des acides et du gel au détendeur.", id: "final-vacuum", label: "8 · Vide final", title: "Tirer l'installation au vide", objective: "Après intervention et épreuve d'étanchéité, ouvrez les deux côtés vers la pompe, atteignez la cible du plateau puis contrôlez la tenue." },
];

const source = {
  manual5: "Manuel Minimax-E · procédure normale, page 5.",
  manual6: "Manuel Minimax-E · procédure de vidange / auto-purge, page 6.",
  afpa: "Déroulé AFPA · récupération : pesée, manifold 4 voies, vide des lignes, récupération et purge.",
  afpaOpen: "AFPA OSIA 10498 · l'emplacement du composant détermine transfert interne ou récupération totale ; aucun rejet et bouchonnage immédiat.",
  rag: "RAG local inerWeb · M3 : fermer → stabiliser → desserrer lentement.",
  vacuum: "RAG local inerWeb · le vacuomètre contrôle le vide ; cible et durée selon la documentation du plateau.",
  pose: "Séquence CAP IFCA S7-F1 · pose des manomètres : remise à zéro, contrôle des flexibles, bouchons, presse-étoupes, siège arrière et raccordement à la main.",
  practice: "Pratique atelier validée par F. Henninot · récupération vers le robinet VAPEUR de la bouteille pour limiter le fluide résiduel au débranchement.",
};

const check = (id, phase, title, instruction, button, hint, sourceNote, feedback) => ({ id, phase, kind: "check", title, instruction, button, hint, source: sourceNote, feedback });
const control = (id, phase, title, instruction, name, to, hint, sourceNote, feedback) => ({ id, phase, kind: "control", title, instruction, control: name, to, hint, source: sourceNote, feedback });
const connect = (id, phase, title, instruction, hose, port, hint, sourceNote, feedback) => ({ id, phase, kind: "connect", title, instruction, hose, port, hint, source: sourceNote, feedback });
const disconnect = (id, phase, title, instruction, hose, port, hint, sourceNote, feedback) => ({ id, phase, kind: "disconnect", title, instruction, hose, port, hint, source: sourceNote, feedback });

const actions = [
  check("check-poste", "prepare", "Choisir le bon mode d'intervention", "Localisez le composant à remplacer. Dans cette mission, il ne peut pas être isolé par transfert interne : choisissez la récupération totale, puis contrôlez EPI, ventilation et compatibilité du matériel.", "Récupération totale choisie", "Un composant situé dans une partie isolable peut permettre un transfert interne vers le condenseur ou le réservoir liquide. Ici, la récupération externe complète est obligatoire.", source.afpaOpen, "Situation analysée : récupération totale retenue et poste sécurisé."),
  check("check-cylinder", "prepare", "Contrôler la bouteille de transfert", "Vérifiez le fluide indiqué, la capacité admissible, l'état du cylindre et ses deux robinets fermés.", "Bouteille vérifiée", "Le cylindre doit être dédié au fluide du poste. Sa limite vient de son marquage et de sa notice.", source.manual5, "Bouteille compatible, stable et robinets fermés."),
  check("balance-initial", "prepare", "Noter la masse de départ", "Posez la bouteille sur la balance stable et relevez la masse initiale du scénario.", "Noter 12,00 kg", "La quantité récupérée sera la différence entre la pesée finale et cette pesée initiale.", source.afpa, "Masse initiale enregistrée : 12,00 kg."),
  check("check-closed", "prepare", "Vérifier toutes les positions fermées", "Confirmez les quatre vannes du manifold, les cinq mini-vannes, les robinets de bouteille, l'entrée et la sortie station ainsi que l'isolement de pompe fermés. Les vannes de service restent au siège arrière.", "Positions de départ conformes", "Les aiguilles peuvent être lues vannes fermées. Ouvrir une vanne crée un passage.", source.afpa, "Position sûre de départ confirmée ; vannes de service au siège arrière."),

  check("check-manifold-zero", "connect", "Contrôler le manifold", "Observez le manifold à l'air libre. Vérifiez son état, puis confirmez que les deux aiguilles indiquent zéro avant tout raccordement.", "Manifold contrôlé et remis à zéro", "Une indication fausse au repos fausse ensuite le diagnostic et les contrôles de vide.", source.pose, "Manifold contrôlé ; aiguilles HP et BP remises à zéro."),
  check("check-hoses-joints", "connect", "Contrôler les flexibles et leurs joints", "Examinez les cinq flexibles, leurs raccords, leurs joints et leurs mini-vannes. Chaque mini-vanne doit être fermée et placée du côté de l'appareil à raccorder.", "Flexibles et mini-vannes conformes", "Un joint abîmé ou une mini-vanne placée du mauvais côté augmente le risque de fuite au débranchement.", source.pose, "Flexibles contrôlés ; mini-vannes fermées côté appareils."),
  check("check-service-caps", "connect", "Préparer les vannes de service", "Repérez les trois vannes. Retirez les capuchons utiles, desserrez chaque presse-étoupe d'un quart de tour et vérifiez la position siège arrière avant d'ouvrir une prise de service.", "Vannes préparées au siège arrière", "Au siège arrière, le circuit principal reste passant tandis que la prise de service reste isolée.", source.pose, "Vannes de service contrôlées au siège arrière ; prises prêtes au raccordement."),

  connect("connect-blue", "connect", "Poser le flexible bleu", "Sélectionnez le flexible bleu. Placez son extrémité équipée de la mini-vanne sur la prise d'ASPIRATION, puis cliquez sur la vanne C du groupe.", "blue", "install-bp", "L'aspiration ramène le fluide de l'évaporateur vers le compresseur : c'est la basse pression.", source.pose, "Flexible bleu raccordé à la main sur l'aspiration ; mini-vanne côté groupe."),
  connect("connect-red", "connect", "Poser le flexible rouge", "Repérez les deux points HP. Pour ce scénario, placez l'extrémité équipée de la mini-vanne rouge sur le DÉPART LIQUIDE, puis cliquez sur la vanne B.", "red", "install-hp", "Le refoulement et le départ liquide sont en haute pression. Pour récupérer d'abord le liquide, ce TP retient le départ liquide.", source.pose, "Flexible rouge raccordé à la main sur le départ liquide ; mini-vanne côté groupe."),
  connect("connect-black", "connect", "Brancher la voie vide", "Sélectionnez le flexible noir, puis la pompe à vide.", "black", "pump", "La voie VIDE du manifold 4 voies est dédiée à la pompe.", source.afpa, "Pompe reliée à la voie VIDE."),
  connect("connect-yellow", "connect", "Brancher la voie service", "Sélectionnez le flexible jaune, puis l'entrée de la Minimax-E.", "yellow", "station-in", "Le fluide ira du manifold vers l'ENTRÉE de la station.", source.afpa, "Voie SERVICE reliée à l'entrée station."),
  connect("connect-orange", "connect", "Relier la station à la bouteille", "Sélectionnez le flexible de sortie. Placez son extrémité équipée de la mini-vanne sur le raccord VAPEUR de la bouteille.", "orange", "bottle-vapor", "Sur ce plateau, la récupération arrive par le robinet VAPEUR : le flexible contient moins de liquide au débranchement.", source.practice, "Sortie station reliée au raccord VAPEUR ; mini-vanne côté bouteille."),

  control("mini-blue-open-pre", "pre-vacuum", "Ouvrir la mini-vanne bleue", "Cliquez sur la mini-vanne dessinée près de l'aspiration.", "mini-blue", "open", "La vanne de service C reste au siège arrière : seul le flexible est mis en communication avec le manifold.", source.pose, "Mini-vanne bleue ouverte ; installation encore isolée."),
  control("mini-red-open-pre", "pre-vacuum", "Ouvrir la mini-vanne rouge", "Cliquez sur la mini-vanne dessinée près du départ liquide.", "mini-red", "open", "La vanne de service B reste au siège arrière : seul le flexible est préparé.", source.pose, "Mini-vanne rouge ouverte ; installation encore isolée."),
  control("mini-black-open-pre", "pre-vacuum", "Ouvrir la mini-vanne de vide", "Cliquez sur la mini-vanne noire, côté pompe.", "mini-black", "open", "La mini-vanne se place côté appareil afin de retenir le moins de fluide possible dans le flexible lors de la dépose.", source.pose, "Mini-vanne noire ouverte côté pompe."),
  control("mini-yellow-open-pre", "pre-vacuum", "Ouvrir la mini-vanne station", "Cliquez sur la mini-vanne jaune, côté entrée de la Minimax-E.", "mini-yellow", "open", "Cette mini-vanne permet ensuite d'isoler la branche au plus près de la station.", source.pose, "Mini-vanne jaune ouverte côté station."),
  control("mini-orange-open-pre", "pre-vacuum", "Ouvrir la mini-vanne bouteille", "Cliquez sur la mini-vanne du flexible de sortie, côté bouteille.", "mini-orange", "open", "Le robinet VAPEUR de la bouteille reste fermé pendant le vide des lignes.", source.practice, "Mini-vanne de sortie ouverte ; bouteille encore fermée."),

  control("open-pump-iso-pre", "pre-vacuum", "Ouvrir l'isolement de pompe", "Ouvrez la vanne d'isolement placée au plus près de la pompe.", "pump-iso", "open", "La pompe doit pouvoir aspirer la ligne noire.", source.afpa, "Isolement de pompe ouvert."),
  control("open-manifold-vac-pre", "pre-vacuum", "Ouvrir la voie VIDE", "Ouvrez la vanne noire VIDE du manifold.", "manifold-vac", "open", "Cette vanne met la pompe en communication avec le corps du manifold.", source.afpa, "Voie VIDE ouverte."),
  control("open-manifold-bp-pre", "pre-vacuum", "Mettre le flexible BP au vide", "Cliquez sur la vanne bleue BP du manifold.", "manifold-bp", "open", "La vanne de service d'aspiration est encore au siège arrière : l'installation reste isolée.", source.pose, "Flexible bleu ouvert vers la pompe ; installation isolée."),
  control("open-manifold-hp-pre", "pre-vacuum", "Mettre le flexible HP au vide", "Cliquez sur la vanne rouge HP du manifold.", "manifold-hp", "open", "La vanne de service départ liquide est encore au siège arrière : l'installation reste isolée.", source.pose, "Flexible rouge ouvert vers la pompe ; installation isolée."),
  control("open-manifold-service-pre", "pre-vacuum", "Ouvrir la voie SERVICE", "Ouvrez la vanne jaune SERVICE pour inclure la ligne de récupération dans le tirage au vide.", "manifold-service", "open", "La voie SERVICE mène à l'entrée de la station.", source.afpa, "Voie SERVICE ouverte vers la station."),
  control("station-in-vapor-pre", "pre-vacuum", "Ouvrir l'entrée station", "Placez le sélecteur bleu d'entrée sur VAPEUR / OPEN pour le tirage des lignes.", "station-in", "vapor", "Le bouton bleu possède les positions FERMÉ, LIQUIDE dosée et VAPEUR / OPEN.", source.manual5, "Entrée station ouverte."),
  control("station-out-open-pre", "pre-vacuum", "Ouvrir la sortie station", "Ouvrez le sélecteur rouge de sortie. Le robinet VAPEUR de la bouteille reste fermé.", "station-out", "open", "Le vide doit atteindre le flexible jusqu'au robinet fermé du cylindre.", source.afpa, "Sortie station ouverte ; bouteille toujours isolée."),
  control("pump-on-pre", "pre-vacuum", "Démarrer la pompe à vide", "Mettez la pompe à vide en marche.", "pump-power", "on", "Le chemin noir, le manifold et la branche station doivent déjà être ouverts.", source.afpa, "La pompe évacue l'air des lignes."),
  check("check-pre-vac", "pre-vacuum", "Contrôler le vide des lignes", "Observez le vacuomètre et validez lorsque le niveau prévu pour cette purge est stable.", "Vide des lignes stable", "Le manomètre du manifold ne remplace pas le vacuomètre pour le vide poussé.", source.vacuum, "Lignes et branche station évacuées."),
  control("close-manifold-hp-pre", "pre-vacuum", "Isoler le flexible HP", "Fermez la vanne rouge HP du manifold.", "manifold-hp", "closed", "Le vide reste emprisonné dans le flexible rouge jusqu'à l'ouverture de la prise de service.", source.pose, "Flexible HP isolé après mise au vide."),
  control("close-manifold-bp-pre", "pre-vacuum", "Isoler le flexible BP", "Fermez la vanne bleue BP du manifold.", "manifold-bp", "closed", "Le vide reste emprisonné dans le flexible bleu jusqu'à l'ouverture de la prise de service.", source.pose, "Flexible BP isolé après mise au vide."),
  control("close-manifold-service-pre", "pre-vacuum", "Isoler la branche station", "Fermez la vanne jaune SERVICE du manifold.", "manifold-service", "closed", "Isolez la partie tirée au vide avant de fermer les commandes suivantes.", source.afpa, "Branche station isolée au manifold."),
  control("close-station-in-pre", "pre-vacuum", "Fermer l'entrée station", "Placez le sélecteur bleu d'entrée sur FERMÉ.", "station-in", "closed", "La station reste hors tension pendant cette préparation.", source.afpa, "Entrée station fermée."),
  control("close-station-out-pre", "pre-vacuum", "Fermer la sortie station", "Fermez le sélecteur rouge de sortie.", "station-out", "closed", "Le flexible vers la bouteille reste évacué jusqu'au robinet fermé.", source.afpa, "Sortie station fermée."),
  control("close-manifold-vac-pre", "pre-vacuum", "Isoler le manifold de la pompe", "Fermez la vanne noire VIDE du manifold avant d'arrêter la pompe.", "manifold-vac", "closed", "L'isolement avant l'arrêt évite un retour d'huile vers le circuit.", source.vacuum, "Manifold isolé de la pompe."),
  control("close-pump-iso-pre", "pre-vacuum", "Fermer l'isolement de pompe", "Fermez la vanne d'isolement de la pompe.", "pump-iso", "closed", "Le vide des lignes est conservé pendant l'arrêt.", source.vacuum, "Isolement de pompe fermé."),
  control("pump-off-pre", "pre-vacuum", "Arrêter la pompe", "Arrêtez maintenant la pompe à vide.", "pump-power", "off", "La voie VIDE et l'isolement sont déjà fermés.", source.vacuum, "Pompe arrêtée sans casser le vide des lignes."),

  control("service-hp-open-recovery", "liquid", "Ouvrir la prise départ liquide", "Cliquez sur la vanne B et quittez doucement le siège arrière jusqu'à la position intermédiaire de service.", "service-hp", "service-open", "Le presse-étoupe est ensuite resserré. La prise HP communique maintenant avec le flexible rouge.", source.pose, "Vanne B en position intermédiaire : prise départ liquide ouverte."),
  control("service-bp-open-recovery", "liquid", "Ouvrir la prise d'aspiration", "Cliquez sur la vanne C et quittez doucement le siège arrière jusqu'à la position intermédiaire de service.", "service-bp", "service-open", "La vanne du manifold BP reste fermée pour commencer la récupération par la HP.", source.pose, "Vanne C en position intermédiaire : prise aspiration ouverte."),

  control("bottle-vapor-open", "liquid", "Ouvrir lentement le robinet vapeur", "Cliquez sur le robinet VAPEUR de la bouteille de transfert. Le robinet LIQUIDE reste fermé.", "bottle-vapor", "open", "Sur ce plateau, l'arrivée par la vapeur réduit la quantité de fluide liquide piégée dans le flexible au débranchement.", source.practice, "Robinet VAPEUR ouvert ; robinet LIQUIDE fermé."),
  control("station-out-open-liquid", "liquid", "Ouvrir la sortie rouge", "Ouvrez le sélecteur rouge de sortie de la Minimax-E.", "station-out", "open", "Le chemin vers la bouteille est maintenant prêt.", source.manual5, "Sortie station ouverte vers la bouteille."),
  control("station-in-liquid", "liquid", "Choisir l'entrée LIQUIDE", "Placez le sélecteur bleu d'entrée sur LIQUIDE. Cette ouverture reste dosée.", "station-in", "liquid", "Une entrée liquide trop ouverte peut faire caler le compresseur de la station.", source.manual5, "Entrée station en position LIQUIDE dosée."),
  control("manifold-service-open-liquid", "liquid", "Ouvrir la voie SERVICE", "Ouvrez la vanne jaune SERVICE du manifold vers l'entrée station.", "manifold-service", "open", "La station est reliée au collecteur, mais le côté installation reste encore fermé.", source.afpa, "Voie SERVICE ouverte."),
  control("manifold-hp-open-liquid", "liquid", "Ouvrir le côté HP", "Ouvrez la vanne rouge HP du manifold pour récupérer d'abord le liquide.", "manifold-hp", "open", "Pendant cette phase, la vanne BP reste fermée.", source.afpa, "Chemin HP → SERVICE établi."),
  control("station-power-on-liquid", "liquid", "Mettre la station sous tension", "Placez l'interrupteur POWER sur MARCHE.", "station-power", "on", "Le ventilateur démarre avant le compresseur.", source.manual5, "Station sous tension ; ventilateur actif."),
  control("station-run-liquid", "liquid", "Démarrer la récupération", "Appuyez sur START pour lancer le compresseur de la Minimax-E.", "station-run", "running", "Le sélecteur noir reste sur RÉCUPÉRATION pendant que la machine tourne.", source.manual5, "Récupération liquide en cours."),
  check("check-liquid", "liquid", "Surveiller aiguilles et balance", "Validez lorsque le débit liquide diminue. La masse du cylindre monte ; aucun chiffre de pression n'est imposé ici.", "Phase liquide terminée", "La balance contrôle la quantité ; les aiguilles renseignent sur le déroulement.", source.afpa, "Phase liquide terminée. Masse simulée : 13,75 kg."),
  control("manifold-hp-close-liquid", "liquid", "Isoler la HP", "Fermez la vanne rouge HP du manifold.", "manifold-hp", "closed", "Fermez la HP avant de passer à la récupération vapeur côté BP.", source.afpa, "Côté HP isolé."),

  control("station-stop-between", "vapor", "Arrêter avant de changer l'entrée", "Appuyez sur START / STOP pour arrêter le compresseur de la station.", "station-run", "stopped", "Ne changez pas la configuration de la station au milieu du débit.", source.manual5, "Compresseur station arrêté."),
  control("station-in-vapor", "vapor", "Choisir VAPEUR / OPEN", "Tournez le sélecteur bleu d'entrée sur VAPEUR / OPEN.", "station-in", "vapor", "La phase vapeur demande l'ouverture normale de l'entrée.", source.manual5, "Entrée station en position VAPEUR / OPEN."),
  control("manifold-bp-open-vapor", "vapor", "Ouvrir le côté BP", "Ouvrez la vanne bleue BP du manifold.", "manifold-bp", "open", "La HP est fermée : seul le côté BP communique avec la station.", source.afpa, "Chemin BP → SERVICE établi."),
  control("station-run-vapor", "vapor", "Redémarrer la récupération", "Appuyez sur START pour reprendre en phase vapeur.", "station-run", "running", "POWER est resté sur MARCHE et la sortie bouteille est ouverte.", source.manual5, "Récupération vapeur en cours."),
  check("check-recovery", "vapor", "Atteindre la fin de récupération", "Validez lorsque le niveau demandé par la procédure du plateau est atteint et confirmé après stabilisation.", "Récupération terminée", "La cible dépend de la réglementation applicable, du fluide, de l'installation et de la notice.", source.manual5, "Cible de récupération atteinte. Masse simulée : 14,30 kg."),
  control("manifold-bp-close-vapor", "vapor", "Isoler le circuit", "Fermez la vanne bleue BP du manifold.", "manifold-bp", "closed", "Le circuit est isolé avant la vidange interne de la station.", source.manual6, "Côté BP isolé."),
  control("manifold-service-close-purge", "purge", "Fermer la voie SERVICE", "Fermez la vanne jaune SERVICE du manifold.", "manifold-service", "closed", "La station va maintenant vider son propre fluide vers la bouteille.", source.manual6, "Circuit et station séparés."),
  control("station-in-close-purge", "purge", "Fermer l'entrée bleue", "Placez le sélecteur bleu d'entrée sur FERMÉ.", "station-in", "closed", "Le manuel impose de fermer l'entrée avant de passer en PURGE.", source.manual6, "Entrée station fermée."),
  control("station-stop-purge", "purge", "Arrêter la Minimax-E", "Arrêtez le compresseur avec START / STOP.", "station-run", "stopped", "Le sélecteur noir ne doit jamais changer pendant que l'appareil tourne.", source.manual6, "Compresseur station arrêté."),
  control("station-power-off-purge", "purge", "Mettre POWER sur ARRÊT", "Coupez l'interrupteur POWER de la station.", "station-power", "off", "La machine est totalement arrêtée avant la rotation du sélecteur noir.", source.manual6, "Station hors tension."),
  control("station-mode-purge", "purge", "Placer le sélecteur noir sur PURGE", "Tournez le sélecteur noir de RÉCUPÉRATION vers PURGE / VIDANGE.", "station-mode", "purge", "Entrée bleue fermée et station arrêtée : les deux préconditions sont réunies.", source.manual6, "Mode PURGE sélectionné."),
  control("station-power-on-purge", "purge", "Remettre POWER sur MARCHE", "Remettez la station sous tension.", "station-power", "on", "La sortie rouge et le robinet vapeur de la bouteille sont encore ouverts.", source.manual6, "Station sous tension en mode PURGE."),
  control("station-run-purge", "purge", "Démarrer l'auto-purge", "Appuyez sur START pour vider la Minimax-E vers la bouteille.", "station-run", "running", "Cette séquence récupère le fluide resté dans la station ; elle ne le rejette pas à l'air.", source.manual6, "Auto-purge en cours."),
  check("check-purge", "purge", "Contrôler la fin de purge", "Validez lorsque le niveau de vide demandé pour la vidange de la station est atteint.", "Station vidée", "Le seuil est celui de la notice et de la procédure du plateau.", source.manual6, "Fluide résiduel de la station transféré au cylindre."),
  control("bottle-vapor-close-purge", "purge", "Fermer la bouteille", "Cliquez sur le robinet VAPEUR de la bouteille avant d'arrêter la station.", "bottle-vapor", "closed", "La fermeture du cylindre précède l'arrêt final de la station.", source.practice, "Bouteille isolée par son robinet VAPEUR."),
  control("station-stop-after-purge", "purge", "Arrêter le compresseur", "Arrêtez la Minimax-E avec START / STOP.", "station-run", "stopped", "La bouteille est déjà fermée.", source.manual6, "Compresseur station arrêté."),
  control("station-power-off-after-purge", "purge", "Couper POWER", "Placez l'interrupteur POWER sur ARRÊT.", "station-power", "off", "La station est arrêtée avant de fermer sa sortie.", source.manual6, "Station hors tension."),
  control("station-out-close-after-purge", "purge", "Fermer la sortie rouge", "Fermez le sélecteur rouge de sortie.", "station-out", "closed", "Tous les côtés de la station sont maintenant isolés.", source.manual6, "Sortie station fermée."),
  control("station-mode-recover", "purge", "Revenir en position RÉCUPÉRATION", "Replacez le sélecteur noir sur RÉCUPÉRATION pour le rangement.", "station-mode", "recover", "Le manuel demande de ranger la machine en position RECOVER.", source.manual6, "Minimax-E revenue en position RÉCUPÉRATION."),
  control("mini-orange-close-weigh", "weigh", "Fermer la mini-vanne bouteille", "Cliquez sur la mini-vanne placée au plus près du robinet VAPEUR.", "mini-orange", "closed", "Les deux extrémités sont maintenant fermées avant le desserrage.", source.practice, "Mini-vanne de sortie fermée côté bouteille."),
  control("mini-yellow-close-weigh", "weigh", "Fermer la mini-vanne station", "Cliquez sur la mini-vanne jaune placée au plus près de l'entrée de la station.", "mini-yellow", "closed", "La branche est isolée au plus près de la Minimax-E.", source.pose, "Mini-vanne jaune fermée côté station."),

  check("balance-final", "weigh", "Noter la masse finale", "Relevez la masse finale stabilisée du scénario.", "Noter 14,30 kg", "Deux pesées sont nécessaires : une avant et une après.", source.afpa, "Masse finale enregistrée : 14,30 kg."),
  check("check-calc", "weigh", "Calculer la masse récupérée", "Soustrayez la masse initiale à la masse finale : 14,30 − 12,00.", "Valider 2,30 kg", "La balance dit combien de fluide a été transféré ; le manifold ne donne pas cette masse.", source.afpa, "Masse récupérée dans le scénario : 2,30 kg."),
  check("check-stable", "weigh", "Laisser les pressions se stabiliser", "Avant tout desserrage, attendez que les aiguilles et le vacuomètre confirment l'isolement.", "Pressions stabilisées", "La chorégraphie reste : fermer → stabiliser → desserrer lentement.", source.rag, "Pressions stabilisées ; déconnexion lente autorisée."),
  disconnect("disconnect-orange", "weigh", "Débrancher la bouteille", "Sélectionnez le flexible de sortie, puis cliquez sur le raccord VAPEUR de la bouteille pour le déposer lentement.", "orange", "bottle-vapor", "Le robinet vapeur et la mini-vanne sont fermés ; la branche contient moins de fluide résiduel.", source.practice, "Flexible déposé du raccord VAPEUR."),
  disconnect("disconnect-yellow", "weigh", "Débrancher la station", "Sélectionnez le flexible jaune, puis l'entrée station pour libérer la branche de récupération.", "yellow", "station-in", "La station est arrêtée, entrée et sortie fermées.", source.rag, "Branche station déposée."),

  check("check-repair", "final-vacuum", "Valider le prérequis du vide final", "Le simulateur suppose l'intervention terminée, chaque ouverture bouchonnée dès sa dépose et l'épreuve d'étanchéité à l'azote validée. Confirmez ce passage de scénario.", "Intervention et étanchéité validées", "Bouchonnez immédiatement les tubes et composants déposés pour limiter l'entrée d'humidité. Le vide ne remplace jamais l'épreuve à l'azote sec.", source.afpaOpen, "Intervention réalisée sans rejet, ouvertures protégées et étanchéité validée."),
  control("pump-iso-open-final", "final-vacuum", "Ouvrir l'isolement de pompe", "Ouvrez la vanne d'isolement de la pompe à vide.", "pump-iso", "open", "Le flexible noir est resté raccordé à la voie VIDE.", source.vacuum, "Isolement de pompe ouvert."),
  control("manifold-vac-open-final", "final-vacuum", "Ouvrir la voie VIDE", "Ouvrez la vanne noire VIDE du manifold.", "manifold-vac", "open", "La pompe peut maintenant agir sur le collecteur.", source.vacuum, "Voie VIDE ouverte."),
  control("manifold-bp-open-final", "final-vacuum", "Ouvrir le côté BP", "Ouvrez la vanne bleue BP vers l'installation.", "manifold-bp", "open", "Le vide doit atteindre tout le côté basse pression.", source.vacuum, "Côté BP ouvert vers la pompe."),
  control("manifold-hp-open-final", "final-vacuum", "Ouvrir le côté HP", "Ouvrez la vanne rouge HP vers l'installation.", "manifold-hp", "open", "Pendant le tirage au vide, BP et HP peuvent être ouvertes ensemble vers la pompe.", source.vacuum, "Côtés BP et HP ouverts vers la pompe."),
  control("pump-on-final", "final-vacuum", "Démarrer le tirage au vide", "Mettez la pompe à vide en marche.", "pump-power", "on", "Observez le vacuomètre, pas seulement les aiguilles du manifold.", source.vacuum, "Tirage au vide de l'installation en cours."),
  check("check-vac-target", "final-vacuum", "Atteindre la cible du plateau", "Validez lorsque le vacuomètre atteint la valeur et la durée prescrites pour cette installation.", "Cible atteinte", "Aucune valeur universelle n'est affichée : reportez-vous à la procédure et au constructeur.", source.vacuum, "Cible de vide du plateau atteinte."),
  control("manifold-vac-close-final", "final-vacuum", "Isoler avant d'arrêter", "Fermez la vanne noire VIDE du manifold.", "manifold-vac", "closed", "Le circuit doit être isolé de la pompe avant son arrêt.", source.vacuum, "Installation isolée de la pompe."),
  control("pump-off-final", "final-vacuum", "Arrêter la pompe", "Arrêtez la pompe à vide.", "pump-power", "off", "La voie VIDE est déjà fermée : le risque de retour d'huile est maîtrisé.", source.vacuum, "Pompe arrêtée, installation isolée."),
  check("check-hold", "final-vacuum", "Contrôler la tenue du vide", "Attendez la durée prescrite et observez le vacuomètre. Validez le scénario stable.", "Vide stable", "Une remontée peut signaler une fuite ou de l'humidité ; elle impose une recherche avant la charge.", source.vacuum, "Tenue du vide stable dans le scénario."),
  control("manifold-bp-close-final", "final-vacuum", "Fermer la BP", "Fermez la vanne bleue BP du manifold.", "manifold-bp", "closed", "Le contrôle est terminé ; replacez chaque voie fermée.", source.rag, "Vanne BP fermée."),
  control("manifold-hp-close-final", "final-vacuum", "Fermer la HP", "Fermez la vanne rouge HP du manifold.", "manifold-hp", "closed", "Les deux côtés de l'installation sont isolés.", source.rag, "Vanne HP fermée."),
  control("pump-iso-close-final", "final-vacuum", "Fermer l'isolement de pompe", "Fermez la vanne d'isolement de la pompe.", "pump-iso", "closed", "Tout le poste est désormais en position fermée.", source.vacuum, "Pompe isolée."),
  control("service-hp-backseat-final", "final-vacuum", "Refermer la prise départ liquide", "Cliquez sur la vanne B et replacez-la au siège arrière, puis resserrez le presse-étoupe.", "service-hp", "back-seat", "Le circuit principal reste passant mais la prise de service est isolée.", source.pose, "Vanne B remise au siège arrière ; prise HP isolée."),
  control("service-bp-backseat-final", "final-vacuum", "Refermer la prise d'aspiration", "Cliquez sur la vanne C et replacez-la au siège arrière, puis resserrez le presse-étoupe.", "service-bp", "back-seat", "La prise de service doit être isolée avant de desserrer le flexible.", source.pose, "Vanne C remise au siège arrière ; prise BP isolée."),
  control("mini-red-close-final", "final-vacuum", "Fermer la mini-vanne rouge", "Cliquez sur la mini-vanne rouge au plus près du départ liquide.", "mini-red", "closed", "Fermer au plus près du groupe limite le volume résiduel libéré au desserrage.", source.pose, "Mini-vanne rouge fermée."),
  control("mini-blue-close-final", "final-vacuum", "Fermer la mini-vanne bleue", "Cliquez sur la mini-vanne bleue au plus près de l'aspiration.", "mini-blue", "closed", "La mini-vanne retient le contenu du flexible pendant sa dépose contrôlée.", source.pose, "Mini-vanne bleue fermée."),
  control("mini-black-close-final", "final-vacuum", "Fermer la mini-vanne de vide", "Cliquez sur la mini-vanne noire placée côté pompe.", "mini-black", "closed", "La pompe est déjà arrêtée et isolée.", source.pose, "Mini-vanne noire fermée."),
  disconnect("disconnect-red", "final-vacuum", "Déposer le flexible HP", "Sélectionnez le flexible rouge, puis la vanne de DÉPART LIQUIDE pour le déposer lentement.", "red", "install-hp", "La pression est stabilisée et la vanne HP est fermée.", source.rag, "Flexible HP déposé de la vanne de départ liquide."),
  disconnect("disconnect-blue", "final-vacuum", "Déposer le flexible BP", "Sélectionnez le flexible bleu, puis la vanne d'ASPIRATION pour le déposer lentement.", "blue", "install-bp", "La pression est stabilisée et la vanne BP est fermée.", source.rag, "Flexible BP déposé de la vanne d'aspiration."),
  disconnect("disconnect-black", "final-vacuum", "Déposer la pompe", "Sélectionnez le flexible noir, puis le raccord pompe.", "black", "pump", "La pompe est arrêtée et isolée.", source.rag, "Flexible de vide déposé."),
  check("check-finish", "final-vacuum", "Contrôler le rangement final", "Confirmez les bouchons remis, les presse-étoupes contrôlés et les masses tracées sur les documents du plateau.", "Terminer la mission", "Le simulateur s'arrête avant la charge : la seconde série sera consacrée à la recharge avec le fluide transféré.", source.afpa, "Mission complète : poste fermé, rangé et traçable."),
];

const controlCycles = {
  "manifold-bp": ["closed", "open"],
  "manifold-vac": ["closed", "open"],
  "manifold-service": ["closed", "open"],
  "manifold-hp": ["closed", "open"],
  "station-in": ["closed", "liquid", "vapor"],
  "station-mode": ["recover", "purge"],
  "station-out": ["closed", "open"],
  "station-power": ["off", "on"],
  "station-run": ["stopped", "running"],
  "bottle-liquid": ["closed", "open"],
  "bottle-vapor": ["closed", "open"],
  "pump-iso": ["closed", "open"],
  "pump-power": ["off", "on"],
  "service-discharge": ["back-seat", "service-open"],
  "service-hp": ["back-seat", "service-open"],
  "service-bp": ["back-seat", "service-open"],
  "mini-blue": ["closed", "open"],
  "mini-red": ["closed", "open"],
  "mini-black": ["closed", "open"],
  "mini-yellow": ["closed", "open"],
  "mini-orange": ["closed", "open"],
};

const controlLabels = {
  closed: "FERMÉE", open: "OUVERTE", liquid: "LIQUIDE DOSÉE", vapor: "VAPEUR / OPEN",
  recover: "RÉCUP.", purge: "PURGE", off: "ARRÊT", on: "MARCHE", stopped: "STOP", running: "MARCHE",
  "back-seat": "SIÈGE ARRIÈRE", "service-open": "PRISE OUVERTE",
};

let mode = "guided";
let current = 0;
let errors = 0;
let hints = 0;
let helpedActions = new Set();
let selectedHose = null;
let lastMode = "guided";
let helpRevealed = false;
let activeEquipmentPanel = "hoses";
let speechRun = 0;
let speaking = false;
let statusTimer = 0;
let state = createState();

function createState() {
  return {
    controls: {
      "manifold-bp": "closed", "manifold-vac": "closed", "manifold-service": "closed", "manifold-hp": "closed",
      "station-in": "closed", "station-mode": "recover", "station-out": "closed", "station-power": "off", "station-run": "stopped",
      "bottle-liquid": "closed", "bottle-vapor": "closed", "pump-iso": "closed", "pump-power": "off",
      "service-discharge": "back-seat", "service-hp": "back-seat", "service-bp": "back-seat",
      "mini-blue": "closed", "mini-red": "closed", "mini-black": "closed", "mini-yellow": "closed", "mini-orange": "closed",
    },
    connections: new Map(),
    balance: "12,00 kg",
    vacuum: "—",
    flow: "none",
  };
}

function currentAction() { return actions[current]; }
function currentPhase() { return phases.find(item => item.id === currentAction().phase); }
function nextValue(name) {
  const values = controlCycles[name];
  const index = values.indexOf(state.controls[name]);
  return values[(index + 1) % values.length];
}

function start(selectedMode) {
  stopVoice();
  mode = selectedMode;
  lastMode = selectedMode;
  current = 0;
  errors = 0;
  hints = 0;
  helpedActions = new Set();
  selectedHose = null;
  helpRevealed = false;
  activeEquipmentPanel = "hoses";
  state = createState();
  $("#home").hidden = true;
  $("#summary").hidden = true;
  $("#game").hidden = false;
  document.body.className = `game-running ${mode}-mode`;
  window.scrollTo(0, 0);
  $("#voice-button").hidden = false;
  $("#hint-button").hidden = false;
  $("#reset-button").hidden = false;
  $("#exit-button").hidden = false;
  $("#mode-badge").textContent = mode === "guided" ? "Mode guidé" : "Mode autonome";
  render();
}

function render() {
  const action = currentAction();
  const phase = currentPhase();
  const guide = guidanceFor(action);
  const phaseIndex = phases.findIndex(item => item.id === phase.id);
  $("#phase-label").textContent = phase.label;
  $("#step-counter").textContent = `${current + 1} / ${actions.length}`;
  $("#progress-bar").style.width = `${((current + 1) / actions.length) * 100}%`;
  $("#mission-kicker").textContent = `PHASE ${phaseIndex + 1} · ${mode === "guided" ? "GUIDÉE" : "AUTONOME"}`;
  $("#mission-title").textContent = mode === "guided" ? action.title : phase.title;
  $("#mission-instruction").textContent = mode === "guided" ? `Pourquoi ? ${guide.why}` : phase.objective;
  $("#mission-instruction").classList.toggle("guided-purpose", mode === "guided");
  renderGuidance(guide);
  $("#mission-title").focus({ preventScroll: true });
  $("#source-note").textContent = action.source;
  $("#valid-count").textContent = current;
  $("#error-count").textContent = errors;
  $("#hint-count").textContent = hints;
  helpRevealed = false;
  document.body.classList.remove("help-open");
  $("#hint-box").hidden = true;
  $("#hint-box").textContent = "";
  $("#hint-button").textContent = "? Aidez-moi · voir la solution";
  $("#hint-button").setAttribute("aria-expanded", "false");
  renderPhaseMap(phaseIndex);
  renderCheckButton(action);
  if (mode === "guided") setEquipmentPanel(panelFor(action));
  else setEquipmentPanel(activeEquipmentPanel);
  updateControls();
  updateConnections();
  updateScene();
  updateSceneFocus(action);
  highlightExpected(action);
}

function renderPhaseMap(activeIndex) {
  $("#phase-map").innerHTML = phases.map((phase, index) => `<span class="phase-step ${index < activeIndex ? "done" : index === activeIndex ? "active" : ""}">${phase.label}</span>`).join("");
}

function renderCheckButton(action) {
  const button = $("#check-action");
  button.hidden = action.kind !== "check";
  $("#mission-actions").classList.toggle("has-check", action.kind === "check");
  if (action.kind === "check") {
    button.textContent = mode === "guided" ? `J'ai vérifié · ${action.button}` : "Contrôler maintenant";
    button.classList.toggle("expected", mode === "guided");
  }
}

function highlightExpected(action) {
  $$(".expected").forEach(item => item.classList.remove("expected"));
  $$(".focus-equipment").forEach(item => item.classList.remove("focus-equipment"));
  if (mode !== "guided" && !helpRevealed) return;
  if (action.kind === "control") $(`[data-control="${action.control}"]`)?.classList.add("expected");
  if (action.kind === "connect" || action.kind === "disconnect") {
    $(`[data-hose="${action.hose}"]`)?.classList.add("expected");
    $(`[data-port="${action.port}"]`)?.classList.add("expected");
  }
  if (action.kind === "check") $("#check-action").classList.add("expected");
  equipmentFor(action).forEach(id => document.getElementById(id)?.classList.add("focus-equipment"));
}

function equipmentFor(action) {
  if (action.kind === "control") {
    if (action.control.startsWith("manifold-")) return ["equipment-manifold"];
    if (action.control.startsWith("station-")) return ["equipment-station"];
    if (action.control.startsWith("bottle-")) return ["equipment-bottle"];
    if (action.control.startsWith("pump-")) return ["equipment-pump"];
    if (action.control.startsWith("service-")) return ["equipment-installation"];
    if (action.control.startsWith("mini-")) return [equipmentForMini(action.control)].filter(Boolean);
  }
  if (action.kind === "connect" || action.kind === "disconnect") {
    return [{
      "install-bp": "equipment-installation",
      "install-hp": "equipment-installation",
      "install-discharge": "equipment-installation",
      pump: "equipment-pump",
      "station-in": "equipment-station",
      "bottle-liquid": "equipment-bottle",
      "bottle-vapor": "equipment-bottle",
    }[action.port]].filter(Boolean);
  }
  return checkEquipment[action.id] || [];
}

function panelFor(action) {
  if (action.kind === "connect" || action.kind === "disconnect") return "hoses";
  if (action.kind === "control") {
    if (action.control.startsWith("mini-") || action.control.startsWith("service-")) return "hoses";
    if (action.control.startsWith("manifold-")) return "manifold";
    if (action.control.startsWith("station-")) return "station";
    return "utility";
  }
  if (action.id === "check-manifold-zero") return "manifold";
  if (action.id === "check-hoses-joints" || action.id === "check-service-caps") return "hoses";
  if (/balance|calc|cylinder|vac|hold/.test(action.id)) return "utility";
  return activeEquipmentPanel;
}

function equipmentForMini(controlName) {
  return ({
    "mini-blue": "equipment-installation",
    "mini-red": "equipment-installation",
    "mini-black": "equipment-pump",
    "mini-yellow": "equipment-station",
    "mini-orange": "equipment-bottle",
  })[controlName];
}

function updateSceneFocus(action) {
  const scene = $("#scene");
  if (!scene) return;
  const views = {
    full: "0 0 1200 620",
    installation: "5 35 355 330",
    manifold: "350 10 390 335",
    station: "715 5 340 335",
    pump: "350 350 545 250",
    bottle: "875 330 325 285",
  };
  let focus = "full";
  if (action.id === "check-manifold-zero") focus = "manifold";
  else if (action.id === "check-service-caps") focus = "installation";
  else if (/cylinder|balance|calc/.test(action.id)) focus = "bottle";
  else if (action.kind === "control") {
    if (action.control.startsWith("manifold-")) focus = "manifold";
    else if (action.control.startsWith("station-")) focus = "station";
    else if (action.control.startsWith("bottle-")) focus = "bottle";
    else if (action.control.startsWith("pump-")) focus = "pump";
    else if (action.control.startsWith("service-")) focus = "installation";
    else if (action.control.startsWith("mini-")) focus = ({
      "mini-blue": "installation", "mini-red": "installation", "mini-black": "pump", "mini-yellow": "station", "mini-orange": "bottle",
    })[action.control] || "full";
  } else if (action.kind === "connect" || action.kind === "disconnect") {
    const pairedViews = {
      "install-bp": "5 25 710 390",
      "install-hp": "5 25 710 390",
      "install-discharge": "5 25 710 390",
      pump: "340 0 430 620",
      "station-in": "340 0 720 370",
      "bottle-vapor": "700 0 490 620",
      "bottle-liquid": "700 0 490 620",
    };
    scene.setAttribute("viewBox", pairedViews[action.port] || views.full);
    scene.dataset.focus = `liaison-${action.port}`;
    return;
  }
  scene.setAttribute("viewBox", views[focus]);
  scene.dataset.focus = focus;
}

function setEquipmentPanel(name) {
  if (!name) return;
  activeEquipmentPanel = name;
  $$('[data-equipment-tab]').forEach(button => {
    const active = button.dataset.equipmentTab === name;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $$('[data-equipment-panel]').forEach(panel => {
    const active = panel.dataset.equipmentPanel === name;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
}

function updateControls() {
  Object.entries(state.controls).forEach(([name, value]) => {
    $$(`[data-control="${name}"]`).forEach(button => {
      button.classList.remove("closed", "open", "off", "on", "stopped", "running", "back-seat", "service-open");
      button.classList.add(value);
      const strong = $("strong", button);
      if (strong) strong.textContent = controlLabels[value];
      const knob = $(".control-knob", button);
      if (knob) knob.style.setProperty("--angle", `${controlAngle(name, value)}deg`);
    });
    const miniStatus = $(`[data-mini-status="${name}"]`);
    if (miniStatus) miniStatus.textContent = `Mini-vanne ${controlLabels[value].toLowerCase()}`;
  });
}

function controlAngle(name, value) {
  if (name === "station-in") return value === "closed" ? -90 : value === "liquid" ? 35 : 90;
  if (name === "station-mode") return value === "recover" ? 0 : 180;
  return ["open", "on", "running", "service-open"].includes(value) ? 90 : 0;
}

function updateConnections() {
  ["blue", "red", "black", "yellow", "orange"].forEach(hose => {
    const connected = state.connections.has(hose);
    $(`[data-hose="${hose}"]`)?.classList.toggle("connected", connected);
    $(`#hose-path-${hose}`)?.classList.toggle("connected", connected);
  });
  $$("[data-port]").forEach(port => {
    const connected = [...state.connections.values()].includes(port.dataset.port);
    port.classList.toggle("connected", connected);
  });
  $$("[data-mini-for]").forEach(valve => valve.classList.toggle("connected", state.connections.has(valve.dataset.miniFor)));
  $$("[data-hose]").forEach(button => button.classList.toggle("selected", button.dataset.hose === selectedHose));
}

function updateScene() {
  setRotation("svg-manifold-bp", state.controls["manifold-bp"] === "open" ? 90 : 0);
  setRotation("svg-manifold-vac", state.controls["manifold-vac"] === "open" ? 90 : 0);
  setRotation("svg-manifold-service", state.controls["manifold-service"] === "open" ? 90 : 0);
  setRotation("svg-manifold-hp", state.controls["manifold-hp"] === "open" ? 90 : 0);
  setLineRotation("svg-station-in", controlAngle("station-in", state.controls["station-in"]));
  setLineRotation("svg-station-mode", controlAngle("station-mode", state.controls["station-mode"]));
  setLineRotation("svg-station-out", controlAngle("station-out", state.controls["station-out"]));
  setLineRotation("svg-bottle-liquid", controlAngle("bottle-liquid", state.controls["bottle-liquid"]));
  setLineRotation("svg-bottle-vapor", controlAngle("bottle-vapor", state.controls["bottle-vapor"]));
  setLineRotation("svg-pump-iso", controlAngle("pump-iso", state.controls["pump-iso"]));
  setLineRotation("svg-service-discharge", controlAngle("service-discharge", state.controls["service-discharge"]));
  setLineRotation("svg-service-hp", controlAngle("service-hp", state.controls["service-hp"]));
  setLineRotation("svg-service-bp", controlAngle("service-bp", state.controls["service-bp"]));
  ["blue", "red", "black", "yellow", "orange"].forEach(hose => setLineRotation(`svg-mini-${hose}`, controlAngle(`mini-${hose}`, state.controls[`mini-${hose}`])));
  $("#svg-balance").textContent = state.balance;
  $("#svg-vacuum").textContent = state.vacuum;

  const finalVacuum = currentAction().phase === "final-vacuum";
  const liquidFlow = state.flow === "liquid";
  const vaporFlow = state.flow === "vapor";
  setNeedle("needle-hp", finalVacuum && state.controls["pump-power"] === "on" ? -58 : liquidFlow ? -18 : 18);
  setNeedle("needle-bp", finalVacuum && state.controls["pump-power"] === "on" ? -58 : vaporFlow ? -30 : -5);
  $("#flow-red")?.classList.toggle("active", liquidFlow);
  $("#flow-blue")?.classList.toggle("active", vaporFlow);
  $("#flow-yellow")?.classList.toggle("active", liquidFlow || vaporFlow || state.flow === "pre-vacuum");
  $("#flow-orange")?.classList.toggle("active", liquidFlow || vaporFlow || state.flow === "purge");
}

function setRotation(id, angle) {
  const group = document.getElementById(id);
  if (!group) return;
  const base = group.getAttribute("transform") || "";
  const translate = base.match(/translate\([^)]*\)/)?.[0] || "";
  group.setAttribute("transform", `${translate} rotate(${angle})`);
}
function setLineRotation(id, angle) { const line = document.getElementById(id); if (line) line.style.transform = `rotate(${angle}deg)`; }
function setNeedle(id, angle) { const needle = document.getElementById(id); if (needle) needle.style.transform = `rotate(${angle}deg)`; }

function attemptControl(name) {
  const to = nextValue(name);
  const safety = safetyBlock(name, to);
  if (safety) return wrong(safety, true);
  const action = currentAction();
  if (action.kind === "control" && action.control === name && action.to !== to) {
    state.controls[name] = to;
    updateControls();
    updateScene();
    return setFeedback(`Position intermédiaire : ${controlLabels[to]}. Poursuivez la rotation vers ${controlLabels[action.to]}.`, "neutral");
  }
  if (action.kind !== "control" || action.control !== name || action.to !== to) return wrong(controlWrongMessage(name, to));
  state.controls[name] = to;
  if (name === "station-run" && to === "running") state.flow = state.controls["station-mode"] === "purge" ? "purge" : state.controls["station-in"] === "liquid" ? "liquid" : "vapor";
  if (name === "station-run" && to === "stopped") state.flow = "none";
  if (name === "pump-power" && to === "on") state.flow = action.phase === "pre-vacuum" ? "pre-vacuum" : state.flow;
  if (name === "pump-power" && to === "off") state.flow = "none";
  correct(action.feedback);
}

function safetyBlock(name, to) {
  if (name === "bottle-liquid" && to === "open") return "Blocage sécurité du scénario : la sortie de récupération est raccordée au robinet VAPEUR. Le robinet LIQUIDE reste fermé.";
  if (name.startsWith("mini-") && to === "open") {
    const hose = name.slice(5);
    if (!state.connections.has(hose)) return "Blocage sécurité : raccordez d'abord les deux extrémités du flexible avant d'ouvrir sa mini-vanne.";
  }
  if ((name === "mini-yellow" || name === "mini-orange") && to === "closed" && state.controls["station-run"] === "running") return "Blocage sécurité : arrêtez d'abord la station avant de fermer cette mini-vanne.";
  if ((name === "service-bp" || name === "service-hp") && to === "service-open") {
    const hose = name === "service-bp" ? "blue" : "red";
    if (!state.connections.has(hose) || state.controls[`mini-${hose}`] !== "open") return "Blocage sécurité : le flexible doit être raccordé, sa mini-vanne ouverte et sa ligne préparée avant de quitter le siège arrière.";
  }
  if (name === "station-mode" && state.controls["station-run"] === "running") return "Blocage sécurité : le sélecteur noir ne change jamais pendant que la Minimax-E tourne.";
  if (name === "station-out" && to === "closed" && state.controls["station-run"] === "running") return "Blocage sécurité : n'étranglez pas la sortie pendant que la station tourne.";
  if (name === "station-power" && to === "off" && state.controls["station-run"] === "running") return "Blocage sécurité : arrêtez d'abord le compresseur avec START / STOP.";
  if (name === "station-run" && to === "running") {
    if (state.controls["station-power"] !== "on") return "Blocage sécurité : POWER doit être sur MARCHE avant START.";
    if (state.controls["station-out"] !== "open" || state.controls["bottle-vapor"] !== "open") return "Blocage sécurité : la sortie et le robinet VAPEUR de la bouteille doivent être ouverts avant START.";
  }
  if (name === "pump-power" && to === "on") {
    if (!state.connections.has("black") || state.controls["pump-iso"] !== "open" || state.controls["manifold-vac"] !== "open") return "Blocage sécurité : raccordez la pompe et ouvrez son chemin avant de la démarrer.";
  }
  if (name === "pump-power" && to === "off" && state.controls["manifold-vac"] === "open") return "Blocage sécurité : isolez le circuit en fermant la voie VIDE avant d'arrêter la pompe.";
  if ((name === "manifold-bp" || name === "manifold-hp") && to === "open") {
    const other = name === "manifold-bp" ? "manifold-hp" : "manifold-bp";
    if (state.controls[other] === "open" && !["pre-vacuum", "final-vacuum"].includes(currentAction().phase)) return "Blocage sécurité : pendant la récupération, n'ouvrez pas BP et HP ensemble.";
  }
  return "";
}

function controlWrongMessage(name, to) {
  const label = controlNames[name] || name;
  return `Ce n'est pas encore le bon geste : ${label} vers ${controlLabels[to].toLowerCase()}. Revenez à l'objectif de la phase.`;
}

function selectHose(hose) {
  selectedHose = hose;
  updateConnections();
  const connected = state.connections.get(hose);
  setFeedback(connected ? `Flexible sélectionné. Cliquez son raccord ${portLabel(connected)} pour le déposer.` : "Flexible sélectionné. Cliquez maintenant sa destination.", "neutral");
}

function attemptPort(port) {
  if (!selectedHose) return wrong("Sélectionnez d'abord un flexible dans le râtelier.");
  const action = currentAction();
  const connectedPort = state.connections.get(selectedHose);
  const kind = connectedPort === port ? "disconnect" : "connect";
  if (kind === "connect" && action.id === "connect-red" && selectedHose === "red" && port === "install-discharge") {
    return wrong("Le refoulement est bien un point HP. Pour cette récupération liquide, choisissez la vanne de DÉPART LIQUIDE.");
  }
  if (kind === "connect" && action.id === "connect-blue" && selectedHose === "blue" && (port === "install-discharge" || port === "install-hp")) {
    return wrong("Ces deux points sont en haute pression. Cherchez le retour vers l'aspiration du compresseur.");
  }
  if (action.kind !== kind || action.hose !== selectedHose || action.port !== port) {
    return wrong(kind === "connect" ? `Raccord incorrect pour ce flexible : ${portLabel(port)}.` : "Ce flexible ne doit pas encore être déposé.");
  }
  if (kind === "connect") state.connections.set(selectedHose, port);
  else state.connections.delete(selectedHose);
  selectedHose = null;
  correct(action.feedback);
}

function portLabel(port) {
  return ({ "install-discharge": "A · vanne de refoulement", "install-hp": "B · vanne de départ liquide", "install-bp": "C · vanne d'aspiration", pump: "pompe", "station-in": "entrée station", "bottle-vapor": "raccord VAPEUR de la bouteille", "bottle-liquid": "raccord LIQUIDE de la bouteille" })[port] || port;
}

function attemptCheck() {
  const action = currentAction();
  if (action.kind !== "check") return wrong("Aucun contrôle à valider maintenant : agissez sur le poste.");
  applyCheckEffect(action.id);
  correct(action.feedback);
}

function applyCheckEffect(id) {
  if (id === "check-pre-vac") state.vacuum = "LIGNES STABLES";
  if (id === "check-liquid") { state.balance = "13,75 kg"; state.flow = "none"; }
  if (id === "check-recovery") { state.balance = "14,30 kg"; state.flow = "none"; state.vacuum = "CIBLE RÉCUP."; }
  if (id === "check-purge") { state.flow = "purge"; state.vacuum = "STATION VIDÉE"; }
  if (id === "balance-final") state.balance = "14,30 kg · M2";
  if (id === "check-calc") state.balance = "Δm = 2,30 kg";
  if (id === "check-repair") state.vacuum = "PRÊT POUR VIDE";
  if (id === "check-vac-target") state.vacuum = "CIBLE PLATEAU";
  if (id === "check-hold") state.vacuum = "STABLE";
}

function correct(message) {
  stopVoice();
  setFeedback(`✓ ${message}`, "good");
  updateControls();
  updateConnections();
  updateScene();
  if (current >= actions.length - 1) return setTimeout(showSummary, summaryDelay);
  current += 1;
  setTimeout(render, transitionDelay);
}

function wrong(message, safety = false) {
  if (mode === "autonomous") errors += 1;
  $("#error-count").textContent = errors;
  setFeedback(`${safety ? "ARRÊT · " : "À corriger · "}${message}`, "bad");
}

function setFeedback(message, kind) {
  clearTimeout(statusTimer);
  const box = $("#feedback");
  box.className = `feedback ${kind}`;
  box.textContent = message;
  statusTimer = setTimeout(() => {
    if (!$("#game").hidden) {
      box.className = "feedback neutral";
      box.textContent = mode === "guided" ? "Réalisez l'action indiquée." : "Poursuivez l'objectif de la phase.";
    }
  }, 4200);
}

const controlNames = {
  "manifold-bp": "vanne BP du manifold",
  "manifold-vac": "vanne VIDE du manifold",
  "manifold-service": "vanne SERVICE du manifold",
  "manifold-hp": "vanne HP du manifold",
  "station-in": "sélecteur bleu ENTRÉE",
  "station-mode": "sélecteur noir MODE",
  "station-out": "sélecteur rouge SORTIE",
  "station-power": "interrupteur POWER",
  "station-run": "bouton START / STOP",
  "bottle-liquid": "robinet LIQUIDE de la bouteille",
  "bottle-vapor": "robinet VAPEUR de la bouteille",
  "pump-iso": "vanne d'ISOLEMENT de la pompe",
  "pump-power": "commande de la POMPE",
  "service-discharge": "vanne de service A · refoulement",
  "service-hp": "vanne de service B · départ liquide",
  "service-bp": "vanne de service C · aspiration",
  "mini-blue": "mini-vanne du flexible bleu",
  "mini-red": "mini-vanne du flexible rouge",
  "mini-black": "mini-vanne du flexible noir",
  "mini-yellow": "mini-vanne du flexible jaune",
  "mini-orange": "mini-vanne du flexible vers la bouteille",
};

const hoseNames = {
  blue: "flexible bleu BP",
  red: "flexible rouge HP",
  black: "flexible noir VIDE",
  yellow: "flexible jaune STATION",
  orange: "flexible de sortie vers la bouteille",
};

const checkEquipment = {
  "check-poste": ["equipment-installation", "equipment-manifold", "equipment-station", "equipment-bottle"],
  "check-cylinder": ["equipment-bottle"],
  "balance-initial": ["equipment-bottle"],
  "check-closed": ["equipment-manifold", "equipment-station", "equipment-pump", "equipment-bottle"],
  "check-manifold-zero": ["equipment-manifold"],
  "check-hoses-joints": ["equipment-manifold", "equipment-station", "equipment-pump", "equipment-bottle"],
  "check-service-caps": ["equipment-installation"],
  "check-pre-vac": ["equipment-vacuum"],
  "check-liquid": ["equipment-manifold", "equipment-bottle"],
  "check-recovery": ["equipment-manifold", "equipment-vacuum", "equipment-bottle"],
  "check-purge": ["equipment-station", "equipment-vacuum"],
  "balance-final": ["equipment-bottle"],
  "check-calc": ["equipment-bottle"],
  "check-stable": ["equipment-manifold", "equipment-vacuum"],
  "check-repair": ["equipment-installation"],
  "check-vac-target": ["equipment-vacuum"],
  "check-hold": ["equipment-vacuum"],
  "check-finish": ["equipment-installation", "equipment-manifold", "equipment-pump", "equipment-bottle"],
};

const checkGuidance = {
  "check-poste": {
    look: "Le composant à remplacer et les organes qui pourraient isoler sa partie du circuit.",
    do: "Décidez si le fluide peut rester dans une partie isolée. Ici, retenez la récupération externe totale, puis contrôlez EPI, ventilation et compatibilité du matériel.",
    check: "La mission choisie est « récupération totale » et le poste peut être préparé sans rejet.",
  },
  "check-cylinder": {
    look: "L'étiquette, le marquage, l'état extérieur, la stabilité et les deux robinets de la bouteille.",
    do: "Comparez le fluide indiqué avec celui du circuit. Lisez la limite du cylindre, inspectez son état, puis vérifiez VAPEUR fermé et LIQUIDE fermé.",
    check: "La bouteille est compatible, en bon état, stable et ses deux robinets sont fermés.",
  },
  "balance-initial": {
    look: "La bouteille posée verticalement au centre de la balance et l'afficheur stabilisé.",
    do: "Posez la bouteille seule sur la balance. Attendez que l'affichage ne bouge plus, puis lisez 12,00 kg dans ce scénario.",
    check: "La masse initiale 12,00 kg est notée avant tout transfert.",
  },
  "check-closed": {
    look: "Les quatre vannes du manifold, les cinq mini-vannes, la station, la pompe et les deux robinets de bouteille.",
    do: "Faites le tour du poste de gauche à droite. Lisez chaque témoin et repérez toute commande qui ne serait pas fermée ou arrêtée.",
    check: "Toutes les voies sont fermées, la station et la pompe sont arrêtées, et B/C sont au siège arrière.",
  },
  "check-manifold-zero": {
    look: "Les deux aiguilles du manifold lorsqu'aucun flexible n'est encore raccordé.",
    do: "Inspectez le boîtier et les raccords. Vérifiez que BP et HP reviennent sur zéro ; corrigez le zéro si le matériel le permet.",
    check: "Le manifold est intact et les deux aiguilles indiquent zéro à l'air libre.",
  },
  "check-hoses-joints": {
    look: "Chaque flexible, ses deux raccords, son joint et la mini-vanne placée côté appareil.",
    do: "Suivez chaque flexible sur toute sa longueur. Cherchez coupure, écrasement, raccord desserré ou joint absent ; confirmez la mini-vanne fermée.",
    check: "Les cinq flexibles et leurs joints sont conformes ; les mini-vannes sont fermées côté appareils.",
  },
  "check-service-caps": {
    look: "Les vannes A, B et C, leurs capuchons, presse-étoupes et prises de service.",
    do: "Repérez les prises utiles. Retirez leurs capuchons, desserrez le presse-étoupe d'un quart de tour et contrôlez le siège arrière avant raccordement.",
    check: "Les prises utiles sont accessibles sans ouvrir le circuit vers les flexibles.",
  },
  "check-pre-vac": {
    look: "Le vacuomètre et la stabilité de son indication pendant le vide des lignes.",
    do: "Attendez le niveau prévu par la procédure du plateau. Observez ensuite si l'indication reste stable.",
    check: "L'air des lignes et de la branche station est évacué avant l'ouverture de la bouteille.",
  },
  "check-liquid": {
    look: "L'aiguille HP, le débit simulé et l'augmentation de la masse sur la balance.",
    do: "Surveillez la récupération. Validez lorsque le débit liquide diminue sans anomalie sur le poste.",
    check: "La phase liquide est terminée et la masse simulée atteint 13,75 kg.",
  },
  "check-recovery": {
    look: "Les aiguilles, l'indication de récupération et la masse de la bouteille après la phase vapeur.",
    do: "Attendez la cible définie par la procédure du plateau, puis laissez les indications se stabiliser.",
    check: "La récupération est terminée et la masse simulée atteint 14,30 kg.",
  },
  "check-purge": {
    look: "La station en mode PURGE et l'indication montrant que son fluide résiduel est transféré.",
    do: "Laissez la station vider son circuit interne vers la bouteille jusqu'au seuil prévu par sa notice.",
    check: "La station est vidée sans rejet volontaire à l'atmosphère.",
  },
  "balance-final": {
    look: "La bouteille immobile sur la balance et l'afficheur stabilisé.",
    do: "Attendez la stabilité de l'affichage, puis relevez la masse finale du scénario.",
    check: "La masse finale 14,30 kg est notée avant la dépose de la branche.",
  },
  "check-calc": {
    look: "Les deux masses notées : 12,00 kg avant et 14,30 kg après.",
    do: "Calculez masse finale moins masse initiale : 14,30 − 12,00.",
    check: "La masse récupérée dans le scénario est 2,30 kg.",
  },
  "check-stable": {
    look: "Les aiguilles et le vacuomètre après fermeture de la branche.",
    do: "Attendez que les indications cessent d'évoluer avant de toucher aux raccords.",
    check: "La branche est isolée et les pressions sont stabilisées avant desserrage.",
  },
  "check-repair": {
    look: "Les ouvertures du circuit après intervention et le résultat de l'épreuve d'étanchéité.",
    do: "Confirmez que chaque ouverture a été bouchonnée et que l'épreuve à l'azote sec est validée avant le vide final.",
    check: "Le circuit est refermé, étanche et prêt pour le tirage au vide.",
  },
  "check-vac-target": {
    look: "Le vacuomètre pendant le tirage au vide de l'installation complète.",
    do: "Attendez la valeur et la durée prescrites pour le matériel réel du plateau.",
    check: "La cible de vide du plateau est atteinte ; aucune valeur universelle n'est supposée.",
  },
  "check-hold": {
    look: "Le vacuomètre après isolement de l'installation et arrêt de la pompe.",
    do: "Attendez la durée prescrite sans agir sur une vanne, puis observez une éventuelle remontée.",
    check: "Le vide reste stable ; aucune fuite ou humidité résiduelle n'est simulée.",
  },
  "check-finish": {
    look: "Les raccords, capuchons, presse-étoupes, flexibles rangés et documents de traçabilité.",
    do: "Faites un dernier tour complet du poste et comparez chaque élément à sa position de rangement.",
    check: "Le poste est fermé, bouchonné, rangé et les masses sont tracées.",
  },
};

const checkGuidanceShort = {
  "check-poste": ["Composant et organes d'isolement.", "Choisissez récupération totale. Contrôlez EPI et matériel.", "Poste prêt, sans rejet."],
  "check-cylinder": ["Étiquette, limite, état et robinets.", "Comparez le fluide. Lisez la limite. Fermez VAPEUR et LIQUIDE.", "Bouteille compatible et stable."],
  "balance-initial": ["Bouteille verticale et afficheur.", "Posez-la seule. Attendez puis lisez 12,00 kg.", "Masse initiale notée."],
  "check-closed": ["Toutes les commandes du poste.", "Faites le tour de gauche à droite.", "Vannes fermées ; machines arrêtées."],
  "check-manifold-zero": ["Les deux aiguilles à l'air libre.", "Inspectez le manifold et contrôlez les zéros.", "BP et HP indiquent zéro."],
  "check-hoses-joints": ["Flexibles, raccords, joints, mini-vannes.", "Suivez et inspectez chaque flexible.", "Cinq flexibles conformes et fermés."],
  "check-service-caps": ["Vannes A, B, C et leurs capuchons.", "Préparez les prises utiles au siège arrière.", "Prises accessibles, circuit isolé."],
  "check-pre-vac": ["Vacuomètre des lignes.", "Attendez la cible puis la stabilité.", "Air évacué avant ouverture bouteille."],
  "check-liquid": ["Aiguille HP, débit et balance.", "Surveillez jusqu'à la baisse du débit liquide.", "Phase liquide terminée : 13,75 kg."],
  "check-recovery": ["Aiguilles, cible et balance.", "Attendez la cible puis la stabilisation.", "Récupération terminée : 14,30 kg."],
  "check-purge": ["Station en PURGE et indication de vide.", "Laissez vider la station vers la bouteille.", "Station vidée sans rejet."],
  "balance-final": ["Bouteille immobile et afficheur.", "Attendez puis relevez la masse finale.", "Masse finale : 14,30 kg."],
  "check-calc": ["12,00 kg avant ; 14,30 kg après.", "Calculez 14,30 − 12,00.", "Masse récupérée : 2,30 kg."],
  "check-stable": ["Aiguilles et vacuomètre.", "Attendez sans toucher aux raccords.", "Pressions stables avant desserrage."],
  "check-repair": ["Ouvertures et contrôle d'étanchéité.", "Confirmez bouchonnage et épreuve à l'azote.", "Circuit étanche, prêt pour le vide."],
  "check-vac-target": ["Vacuomètre de l'installation.", "Attendez la cible et la durée du plateau.", "Cible de vide atteinte."],
  "check-hold": ["Vacuomètre, pompe isolée.", "Attendez puis observez une remontée.", "Vide stable."],
  "check-finish": ["Raccords, bouchons, matériel, fiche.", "Faites un dernier tour du poste.", "Poste fermé, rangé et tracé."],
};

function guidanceFor(action) {
  if (action.kind === "check") {
    return { ...checkGuidance[action.id], short: checkGuidanceShort[action.id], why: action.hint };
  }
  if (action.kind === "control") {
    return {
      look: `${controlNames[action.control]} directement sur l'appareil dessiné, pas dans le panneau témoin du bas.`,
      do: action.instruction,
      check: `La commande doit afficher « ${controlLabels[action.to]} » et sa poignée doit changer de position.`,
      short: [controlNames[action.control], `Cliquez jusqu'à « ${controlLabels[action.to]} ».`, "La poignée et le témoin changent."],
      why: action.hint,
    };
  }
  if (action.kind === "connect") {
    return {
      look: `${hoseNames[action.hose]} dans le râtelier, puis ${portLabel(action.port)} dans l'image. Les deux extrémités restent visibles.`,
      do: `Cliquez d'abord sur le flexible, puis sur ${portLabel(action.port)}.`,
      check: `${action.feedback} Le flexible complet apparaît entre les deux appareils.`,
      short: [hoseNames[action.hose], `Flexible puis ${portLabel(action.port)}.`, "Le trajet complet apparaît."],
      why: action.hint,
    };
  }
  return {
    look: `${hoseNames[action.hose]} déjà raccordé et ${portLabel(action.port)} dans l'image.`,
    do: `Cliquez d'abord sur le flexible, puis sur ${portLabel(action.port)} pour le déposer lentement.`,
    check: `${action.feedback} Le flexible disparaît du trajet entre les appareils.`,
    short: [hoseNames[action.hose], `Flexible puis ${portLabel(action.port)}.`, "Le trajet disparaît."],
    why: action.hint,
  };
}

function renderGuidance(guide) {
  const sheet = $("#guided-sheet");
  const guided = mode === "guided";
  sheet.hidden = !guided;
  if (!guided) return;
  $("#guide-look").textContent = guide.look;
  $("#guide-do").textContent = guide.do;
  $("#guide-check").textContent = guide.check;
  $("#guide-look-short").textContent = guide.short[0];
  $("#guide-do-short").textContent = guide.short[1];
  $("#guide-check-short").textContent = guide.short[2];
}

function solutionFor(action) {
  if (action.kind === "check") return `Cliquez sur « ${mode === "guided" ? action.button : "Contrôler maintenant"} ».`;
  if (action.kind === "control") return `Dans l'image, cliquez directement sur « ${controlNames[action.control]} » jusqu'à afficher « ${controlLabels[action.to]} ».`;
  if (action.kind === "connect") return `1. Cliquez sur « ${hoseNames[action.hose]} ». 2. Cliquez sur le raccord « ${portLabel(action.port)} » dans le schéma.`;
  if (action.kind === "disconnect") return `1. Cliquez sur « ${hoseNames[action.hose]} ». 2. Cliquez sur le raccord « ${portLabel(action.port)} » pour le déposer.`;
  return action.hint;
}

function revealHint() {
  const action = currentAction();
  const box = $("#hint-box");
  const button = $("#hint-button");
  if (helpRevealed) {
    helpRevealed = false;
    document.body.classList.remove("help-open");
    box.hidden = true;
    button.textContent = "? Aidez-moi · voir la solution";
    button.setAttribute("aria-expanded", "false");
    highlightExpected(action);
    return;
  }
  helpRevealed = true;
  document.body.classList.add("help-open");
  setEquipmentPanel(panelFor(action));
  if (!helpedActions.has(action.id)) {
    helpedActions.add(action.id);
    hints += 1;
  }
  $("#hint-count").textContent = hints;
  box.hidden = false;
  box.textContent = `SOLUTION · ${solutionFor(action)}`;
  button.textContent = "Masquer la solution";
  button.setAttribute("aria-expanded", "true");
  highlightExpected(action);
  setFeedback("La réponse est affichée. La commande à actionner directement dans l'image est entourée en orange avec le repère « ICI ».", "neutral");
}

function showSummary() {
  stopVoice();
  $("#game").hidden = true;
  $("#summary").hidden = false;
  document.body.className = "summary-running";
  window.scrollTo(0, 0);
  $("#voice-button").hidden = true;
  $("#hint-button").hidden = true;
  $("#reset-button").hidden = true;
  $("#exit-button").hidden = true;
  $("#summary-valid").textContent = actions.length;
  $("#summary-errors").textContent = errors;
  $("#summary-hints").textContent = hints;
  $("#summary-message").textContent = mode === "guided"
    ? "Vous avez parcouru la démonstration complète. Reprenez-la maintenant en mode autonome pour vérifier l'ordre sans guidage."
    : errors === 0
      ? "Enchaînement réussi sans erreur dans le simulateur. Le formateur reste la personne qui valide le passage au plateau réel."
      : `Mission terminée avec ${errors} erreur${errors > 1 ? "s" : ""} repérée${errors > 1 ? "s" : ""}. Refaire les phases concernées consolidera l'ordre des vannes.`;
  $("#summary-title").focus({ preventScroll: true });
}

function goHome() {
  stopVoice();
  $("#game").hidden = true;
  $("#summary").hidden = true;
  $("#home").hidden = false;
  document.body.className = "";
  window.scrollTo(0, 0);
  $("#voice-button").hidden = true;
  $("#hint-button").hidden = true;
  $("#reset-button").hidden = true;
  $("#exit-button").hidden = true;
  $("#mode-badge").textContent = "Accueil";
  $("#home-title").focus({ preventScroll: true });
}

function speakCurrent() {
  if (!("speechSynthesis" in window)) return setFeedback("La synthèse vocale n'est pas disponible. Le texte visible reste complet.", "bad");
  if (speaking) return stopVoice();
  stopVoice();
  const run = ++speechRun;
  const action = currentAction();
  const phase = currentPhase();
  const utterance = new SpeechSynthesisUtterance(phase.narration || "");
  utterance.lang = "fr-FR";
  utterance.rate = .95;
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(voice => voice.lang === "fr-FR" && /natural|neural|microsoft|google/i.test(voice.name)) || voices.find(voice => voice.lang === "fr-FR") || voices.find(voice => voice.lang.startsWith("fr")) || null;
  utterance.onstart = () => { if (run !== speechRun) return; speaking = true; $("#voice-button").textContent = "■ Arrêter"; $("#voice-button").setAttribute("aria-pressed", "true"); };
  utterance.onend = utterance.onerror = () => { if (run !== speechRun) return; speaking = false; $("#voice-button").textContent = "▶ Écouter"; $("#voice-button").setAttribute("aria-pressed", "false"); };
  speechSynthesis.speak(utterance);
}

function stopVoice() {
  speechRun += 1;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  speaking = false;
  $("#voice-button").textContent = "▶ Écouter";
  $("#voice-button").setAttribute("aria-pressed", "false");
}

function buildHomePreview() {
  const preview = $(".home-visual svg");
  const sourceSymbol = $("#scene-background");
  const use = preview?.querySelector("use");
  if (!preview || !sourceSymbol || !use) return;

  const fragment = document.createDocumentFragment();
  [...sourceSymbol.children].forEach(child => {
    const clone = child.cloneNode(true);
    if (clone.removeAttribute) clone.removeAttribute("id");
    clone.querySelectorAll?.("[id]").forEach(node => node.removeAttribute("id"));
    if (clone.removeAttribute) clone.removeAttribute("filter");
    clone.querySelectorAll?.("[filter]").forEach(node => node.removeAttribute("filter"));
    clone.querySelectorAll?.('[fill^="url("]').forEach(node => node.setAttribute("fill", "#dceef8"));
    fragment.append(clone);
  });
  use.replaceWith(fragment);
}

$$('[data-start-mode]').forEach(button => button.addEventListener("click", () => start(button.dataset.startMode)));
$$('[data-hose]').forEach(button => button.addEventListener("click", () => selectHose(button.dataset.hose)));

function activateMachineTarget(target) {
  const action = currentAction();
  if (target.dataset.machineTarget !== undefined && (action.kind === "connect" || action.kind === "disconnect")) {
    attemptPort(target.dataset.port);
  } else {
    attemptControl(target.dataset.control);
  }
}

function wireSvgTarget(target, activate) {
  target.addEventListener("click", event => {
    event.preventDefault();
    activate(target);
  });
  target.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activate(target);
  });
}

$$('.svg-control-hit').forEach(target => wireSvgTarget(target, activateMachineTarget));
$$('.svg-port-hit').forEach(target => wireSvgTarget(target, item => attemptPort(item.dataset.port)));
$$('.control-dock [data-control]').forEach(witness => {
  witness.disabled = true;
  witness.tabIndex = -1;
  witness.setAttribute("aria-label", `${controlNames[witness.dataset.control] || witness.dataset.control} · témoin d'état`);
});
$$('[data-equipment-tab]').forEach(button => button.addEventListener("click", () => {
  setEquipmentPanel(button.dataset.equipmentTab);
  highlightExpected(currentAction());
}));
$("#check-action").addEventListener("click", attemptCheck);
$("#hint-button").addEventListener("click", revealHint);
$("#voice-button").addEventListener("click", speakCurrent);
$("#reset-button").addEventListener("click", () => start(mode));
$("#exit-button").addEventListener("click", goHome);
$("#retry-button").addEventListener("click", () => start(lastMode));
$("#other-mode-button").addEventListener("click", () => start(lastMode === "guided" ? "autonomous" : "guided"));
$("#summary-home-button").addEventListener("click", goHome);
document.addEventListener("visibilitychange", () => { if (document.hidden) stopVoice(); });
window.addEventListener("beforeunload", stopVoice);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !$("#game").hidden) goHome();
});

renderPhaseMap(-1);
updateControls();
updateConnections();
updateScene();
buildHomePreview();

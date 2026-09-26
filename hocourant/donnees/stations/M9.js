/* ============================================================
   inerWeb HoCourant — STATION du module M9 « La consignation »
   Une étape par écran de COURS.M9, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M9 = { etapes: [
  { court: "À prouver", film: "M9b",
    scenario: {
      decor: "Un groupe extérieur de climatisation à droite, ventilateur au repos sur le dessus, capot ouvert sur le bornier ; à gauche, un interrupteur de proximité avec sa poignée, le sol.",
      acte1: "La personne marche jusqu'à l'appareil arrêté et pose directement la main sur le bornier, sans toucher à l'interrupteur de proximité. Le ventilateur repart d'un coup, un éclair jaillit au contact, la casquette s'envole, les cheveux se dressent ; elle est secouée et retombe assise, des étoiles autour de la tête.",
      acte2: "Même décor. La personne s'arrête d'abord à l'interrupteur de proximité, tourne la poignée sur arrêt et pose un cadenas avec une étiquette. Elle rejoint l'appareil, effectue la vérification d'absence de tension sur le bornier avec l'appareil prescrit : le voyant reste éteint. Alors seulement elle ouvre le capot et travaille." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 28,
        narration: "Ce groupe extérieur semble éteint : le ventilateur ne tourne plus, la régulation vient de l'arrêter. Cette personne ouvre le capot et pose la main sur le bornier, sans rien vérifier d'autre. Le courant, lui, n'a jamais été coupé : le ventilateur repart d'un coup, l'éclair jaillit au contact, la casquette s'envole et elle retombe assise, des étoiles plein la tête. Un appareil silencieux n'est pas un appareil hors tension." },
      { titre: "Acte 2 · la leçon", duree: 36,
        narration: "Même appareil, à l'arrêt. Cette fois, cette personne commence par tourner la poignée de l'interrupteur de proximité, avant même d'approcher le capot. Elle pose ensuite son cadenas et son étiquette : plus personne ne peut remettre le courant sans le savoir. Vient alors la vérification d'absence de tension sur le bornier, avec l'appareil prescrit, contrôlé avant la mesure. Le voyant reste éteint : la preuve est faite, et non supposée. Elle peut enfin ouvrir le capot et travailler, en toute tranquillité, sans craindre un redémarrage inattendu du ventilateur." } ] },
  { court: "Sans le savoir", film: "M9",
    scenario: {
      decor: "Un tableau électrique à gauche avec son disjoncteur, un coffret ouvert à droite relié par un fil rouge, une deuxième personne au fond près du tableau, le sol.",
      acte1: "Le bonhomme s'installe devant le coffret ouvert et pose la main sur le fil rouge pour travailler. Au fond, une deuxième personne arrive devant le tableau, ne voit rien qui l'arrête et relève la manette du disjoncteur, la main restant dessus. Le fil s'illumine d'un éclair orange, les cheveux du bonhomme se dressent, il est secoué et retombe assis par terre, des étoiles tournant autour de sa tête.",
      acte2: "Même décor. Le bonhomme ouvre le disjoncteur, pose un cadenas et une étiquette sur le tableau, puis rejoint le coffret. La deuxième personne arrive, voit le cadenas, le montre du doigt, s'arrête et repart sans y toucher. Vérification d'absence de tension sur le fil, travail, retour au tableau. Il signale d'abord la fin des travaux, et c'est seulement ensuite que le cadenas et l'étiquette sont retirés." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 27,
        narration: "Cette personne croit le tableau à l'arrêt et travaille directement sur le fil du coffret. Au fond, quelqu'un arrive devant le tableau, ne voit rien qui l'arrête et relève la manette du disjoncteur. Le courant revient sans prévenir : l'éclair au bout du fil, les cheveux dressés, la secousse qui la jette au sol. Un bouton laissé sur arrêt n'empêche personne de remettre l'installation sous tension." },
      { titre: "Acte 2 · la leçon", duree: 35,
        narration: "Même situation, avec la condamnation cette fois. Avant de rejoindre le coffret, la personne ouvre le disjoncteur, pose son cadenas et son étiquette : plus personne ne peut refermer à son insu. L'autre arrive, voit le cadenas, comprend qu'un travail est en cours et repart sans y toucher. Vient alors la vérification d'absence de tension sur le fil, puis le travail. À la fin, elle revient signaler que les travaux sont terminés, et c'est seulement après ce compte rendu que la condamnation est levée." } ] },
  { court: "Condamner", film: "M9c",
    scenario: {
      decor: "Le même tableau qu'à l'écran précédent, cadenas et étiquette déjà posés par quelqu'un d'autre ; une cloison ; à droite, un collègue qui travaille sur le fil d'un coffret relié au même circuit.",
      acte1: "Agacé par ce cadenas qui n'est pas le sien, la personne le coupe et relève le levier du sectionneur. Derrière la cloison, le collègue qui travaillait reçoit l'éclair sur son fil : cheveux dressés, étoiles. Elle se fige, la main encore sur le levier.",
      acte2: "Même décor. La personne n'y touche pas et appelle. Le collègue revient, retire lui-même son cadenas et son étiquette ; le levier remonte ensemble, et un repère vert confirme que tout va bien." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "Ce cadenas sur le levier n'est pas le sien, et il bloque le travail. Agacé, notre bonhomme le coupe à la pince et relève le levier du sectionneur. Derrière la cloison, un collègue qui travaillait sur un fil du même circuit reçoit alors l'éclair : cheveux dressés, étoiles autour de la tête. Notre bonhomme se fige, la main encore sur le levier, sans comprendre tout de suite ce qu'il vient de provoquer." },
      { titre: "Acte 2 · la leçon", duree: 37,
        narration: "Cette fois, notre bonhomme n'y touche pas : il appelle la personne à qui appartient ce cadenas. Le collègue revient de l'autre côté de la cloison, constate que son travail peut attendre, et retire lui-même son cadenas et son étiquette. Alors seulement, ensemble, ils relèvent le levier du sectionneur : un repère vert confirme que la manœuvre est sûre. Un cadenas protège une personne précise, pendant une tâche précise : elle seule décide du moment où il se retire, jamais la main d'une autre personne pressée par le temps." } ] },
  { court: "Les documents", film: "M9d",
    scenario: {
      decor: "Une armoire électrique fermable avec son sectionneur, cadenas et étiquette déjà posés ; à l'intérieur, trois outils oubliés ; deux personnes qui viennent de terminer leur intervention.",
      acte1: "Sans compter ni les outils ni les personnes, l'armoire est refermée et le levier remonté : un tournevis oublié fait un gros éclair, de la fumée, les deux personnes sursautent, cheveux dressés, étoiles.",
      acte2: "Même décor. Avant de refermer, les trois outils sont comptés un par un, une coche verte chacun ; les deux personnes lèvent le bras, satisfaites ; l'avis de fin de travail passe de l'une à l'autre. Alors seulement le cadenas est retiré, le levier remonté, l'armoire refermée, et une lampe s'allume." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 29,
        narration: "Le travail est fini, mais personne ne compte ni les outils ni les personnes avant de refermer cette armoire. Le levier du sectionneur remonte aussitôt. Or un tournevis est resté à l'intérieur, entre deux pièces sous tension : le contact fait un gros éclair, de la fumée s'échappe, et les deux personnes sursautent, cheveux dressés, entourées d'étoiles. Aucun document n'a été suivi, et personne n'a vérifié ce que l'armoire contenait encore." },
      { titre: "Acte 2 · la leçon", duree: 33,
        narration: "Cette fois, avant de refermer, chaque outil est retrouvé et compte pour un : trois coches vertes, une par outil. Les deux personnes lèvent le bras, satisfaites du travail accompli, et l'avis de fin de travail passe de l'une à l'autre pour officialiser la fin du chantier. C'est seulement après cet avis que le cadenas est retiré et que le levier remonte, en présence de tous. L'armoire se referme, une lampe s'allume : la preuve est faite avant le geste, jamais après." } ] },
  { court: "Le piège", scenes: ["vat"],
    narration: "Cet appareil de vérification révèle ce qu'un simple arrêt local ne montre pas. Couper un bouton en façade donne l'impression que tout est éteint, alors qu'un condensateur, une seconde alimentation ou un circuit de commande peuvent rester actifs derrière. C'est tout l'intérêt de suivre la procédure de séparation plutôt qu'une intuition qui se contente des apparences. Sur ce point, l'habitude trompe plus souvent que l'inexpérience : celui qui croit connaître l'installation saute parfois l'étape qui aurait tout révélé." },
]};

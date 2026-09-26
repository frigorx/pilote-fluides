/* ============================================================
   inerWeb HoCourant — STATION du module M11 « B1, B1V — exécuter sous direction »
   Une étape par écran de COURS.M11, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M11 = { etapes: [
  { court: "Sous direction", film: "M11",
    scenario: {
      decor: "Une armoire ouverte à droite ; un balisage au sol sépare l'exécutant du chargé de travaux à gauche.",
      acte1: "Le chargé de travaux confie une tâche précise et reste en retrait ; l'exécutant s'approche de l'armoire et franchit le balisage pour atteindre une pièce qui n'était pas prévue ; au contact : éclair orange sur l'armoire, cheveux dressés ; il est repoussé et se retrouve assis, des étoiles tournant autour de sa tête.",
      acte2: "Même décor. L'exécutant travaille cette fois sans dépasser le balisage, l'outil dirigé vers la seule pièce confiée ; le chargé de travaux pointe la zone autorisée ; l'exécutant lève la main vers lui pour rendre compte de l'avancement." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "Un chargé de travaux a désigné une zone précise, balisée au sol, et s'est mis en retrait. Ici, l'exécutant s'avance jusqu'à l'armoire, franchit le balisage et tend l'outil vers une pièce qui ne faisait pas partie de sa mission. Cette pièce-là, personne ne l'a mise hors tension : au contact, secousse, cheveux dressés, il se retrouve assis par terre. Franchir le balisage, ce n'est plus exécuter la tâche confiée, c'est agir seul." },
      { titre: "Acte 2 · la leçon", duree: 34,
        narration: "Même armoire, même exécutant, et cette fois il reste strictement dans la zone que le chargé de travaux lui a désignée, avec l'outil prévu pour la tâche prévue. Rien d'autre ne l'intéresse, même si une pièce voisine semble à portée de main. Dès qu'une difficulté se présente, il ne décide pas seul : il lève la main et rend compte, de l'avancement, de la fin du travail, ou d'une anomalie. Retenez l'ordre : la zone confiée, le matériel prescrit, le compte rendu." } ] },
  { court: "Deux preuves", scenes: ["b1v-equipe", "titre"],
    narration: "Cet exécutant travaille équipé, dans la zone que son chargé de travaux lui a préparée : c'est la compétence technique en action. Elle ne suffit pas seule. Il lui faut aussi un titre, remis par l'employeur, qui l'autorise précisément à intervenir dans ce contexte, sur cette installation. Savoir faire techniquement et être autorisé à le faire ici sont deux preuves distinctes, jamais une seule. Sur un groupe frigorifique, c'est ce qui sépare celui qui sait démonter un contacteur de celui qui a le droit d'y aller ce jour-là, sur cette installation." },
  { court: "La clé", scenes: ["acteurs"],
    narration: "Voici l'instant où une instruction se transmet, documents en main, entre un chargé de travaux et un exécutant. Si cette instruction reste floue, elle ne s'interprète pas au jugé : on demande à celui qui dirige de préciser avant d'agir. Un exécutant à qui l'on demande seul un dépannage qui dépasse son titre refuse, et réclame une désignation adaptée. Ce réflexe protège autant que la distance devant un fil dénudé : il évite d'agir sur une base incertaine." },
  { court: "À toi", scenes: ["acteurs", "b1v-equipe", "documents", "bs-remplacement"], muet: true,
    narration: "Un remplacement de contacteur, quatre images sans légende cette fois. Sur les deux premières, il s'agit de nommer les personnes : celle qui a préparé et confié le travail, celle qui dirige sur place, celle qui exécute dans la zone désignée. La troisième montre les documents qui circulent entre elles avant que le geste commence. La dernière montre le remplacement lui-même, et la question devient : quelle condition imposerait l'arrêt immédiat ? Une instruction floue, un titre dépassé, une zone qui ne correspond plus à ce qui a été préparé." },
]};

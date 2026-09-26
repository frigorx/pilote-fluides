/* ============================================================
   inerWeb HoCourant — STATION du module M12 « Après l'accident »
   Une étape par écran de COURS.M12, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M12 = { etapes: [
  { court: "Protéger d'abord", film: "M12",
    scenario: {
      decor: "Une victime au sol contre un fil rouge dénudé qui sort d'un coffret ouvert ; un secouriste arrive par la gauche ; un coffret avec disjoncteur visible plus loin ; un téléphone.",
      acte1: "Le secouriste entre en courant, voit la victime au sol contre le fil et lui saisit le bras pour la tirer de là ; au contact : éclair orange, ses cheveux se dressent, il tremble et tombe assis à côté d'elle, des étoiles tournent autour de sa tête ; il y a maintenant deux victimes.",
      acte2: "Même décor. Le secouriste s'arrête avant tout contact, désigne le coffret d'où vient le fil, puis va baisser le levier du tableau, à l'écart de la victime ; un repère orange marque la coupure ; une fois coupé, il revient vers la victime et un téléphone apparaît au-dessus de lui pour l'appel." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 27,
        narration: "Une personne est au sol, contre un fil resté sous tension. Le secouriste arrive en courant et, pour la tirer de là, il saisit son bras. Erreur : le courant passe maintenant aussi par lui, ses cheveux se dressent, il tombe assis à côté d'elle. Deux victimes au lieu d'une, pour un geste qui semblait naturel. La suite montre le seul ordre qui protège vraiment." },
      { titre: "Acte 2 · la leçon", duree: 38,
        narration: "Même scène, et cette fois le bon ordre. Le secouriste s'arrête avant tout contact, repère le coffret d'où vient le fil, puis va couper l'alimentation au tableau, à l'écart de la victime. Une fois l'énergie coupée, il s'approche, vérifie, et appelle le 112 en donnant le lieu et l'état de la victime. Sur un chantier froid et climatisation, un coffret électrique reste à proximité de bien des interventions : ce réflexe couper, ne pas toucher, appeler vaut pour toute situation où un collègue reste en contact avec une source électrique." } ] },
  { court: "Alerter précisément", film: "M12b",
    scenario: {
      decor: "Une zone déjà sécurisée, le levier baissé ; une victime allongée au sol ; un témoin avec un téléphone ; plus loin, l'entrée d'un bâtiment et une ambulance dans la rue.",
      acte1: "Le témoin appelle les secours, s'agite, raccroche presque aussitôt ; dans la rue, l'ambulance passe devant l'entrée sans s'arrêter, revient, hésite ; le témoin se prend la tête.",
      acte2: "Même décor. Le témoin appelle calmement ; au-dessus de lui s'allument un repère de lieu, un éclair, une silhouette allongée puis une coche ; il garde le téléphone à l'oreille ; un collègue attend à l'entrée et fait signe ; l'ambulance s'arrête à la bonne porte." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "Le témoin a raison d'appeler tout de suite : la victime est allongée, et le lieu reste sûr grâce au levier déjà baissé. Mais l'appel part trop vite, sans détails, et il raccroche presque aussitôt. Dans la rue, l'ambulance cherche l'entrée, passe devant sans s'arrêter, revient, hésite. De longues secondes perdues, et le témoin, désemparé, se prend la tête. La suite montre l'appel qui donne aux secours de quoi arriver droit au but." },
      { titre: "Acte 2 · la leçon", duree: 37,
        narration: "Même situation, et cette fois l'appel donne aux secours de quoi arriver vite et au bon endroit. Le témoin reste calme et énonce, dans l'ordre, le lieu précis, le risque électrique, l'état de la victime, puis il confirme ce qui a déjà été fait. Il garde le téléphone à l'oreille jusqu'à ce que l'opérateur raccroche. À l'entrée, un collègue guette et fait signe : l'ambulance s'arrête cette fois à la bonne porte. Sur un chantier, un accès mal décrit coûte de précieuses minutes ; ces quelques précisions les rendent inutiles." } ] },
  { court: "La clé", scenes: ["secours"],
    narration: "Ce sauveteur reste à distance de la victime : il ne la touche pas tant que la source électrique n'est pas coupée. C'est le sens de cette clé : le meilleur secours n'est pas le plus rapide, c'est celui qui ne crée pas une deuxième victime. Même une électrisation qui paraît légère, sans marque visible, impose une prise en charge médicale, car le courant peut avoir traversé le cœur sans laisser de trace en surface. Sur un chantier, ce réflexe vaut pour vous comme pour un collègue. L'écran suivant élargit au risque d'incendie." },
  { court: "Incendie", film: "M12c",
    scenario: {
      decor: "Une armoire électrique au fond, un seau d'eau à portée de main ; à l'écart, un boîtier d'alarme, un coupe-circuit général et un extincteur à CO₂.",
      acte1: "De la fumée puis une flamme sortent de l'armoire ; il jette aussitôt le seau d'eau dessus : l'électricité remonte le jet, le seau s'envole, il est rejeté en arrière, des étoiles tournent autour de sa tête.",
      acte2: "Même décor. Il presse d'abord le boîtier d'alarme, puis va couper au coupe-circuit général, à l'écart de l'armoire ; formé à l'extincteur, il revient avec l'appareil à CO₂ et vise la base de la flamme, à distance ; le feu s'éteint." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "De la fumée sort de l'armoire électrique, puis une flamme apparaît. Sans réfléchir, il attrape le seau posé à côté et jette l'eau dessus. Mauvaise idée : l'eau conduit le courant, et l'électricité remonte le jet jusqu'à lui. Le seau s'envole, ses cheveux se dressent, et il est rejeté en arrière, assis, des étoiles plein la tête. Un feu électrique ne s'éteint jamais comme un feu ordinaire. La suite montre l'ordre qui protège vraiment." },
      { titre: "Acte 2 · la leçon", duree: 36,
        narration: "Même armoire, même flamme, et cette fois le bon ordre. Il commence par le boîtier d'alarme, pour que les secours soient prévenus. Il va ensuite couper au coupe-circuit général, à l'écart de l'armoire : plus rien n'alimente le feu. Formé, il revient avec l'extincteur à CO₂, vise la base de la flamme à distance : le feu s'éteint. Même un départ maîtrisé à temps reste un presque-accident : cela se signale et s'analyse comme un accident évité. La bonne action reste donner l'alarme et couper l'énergie avant tout autre geste." } ] },
]};

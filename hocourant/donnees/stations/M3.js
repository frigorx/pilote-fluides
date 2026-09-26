/* ============================================================
   inerWeb HoCourant — STATION du module M3 « Les mesures de prévention »
   Une étape par écran de COURS.M3, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M3 = { etapes: [
  { court: "Dans l'ordre", film: "M3b",
    scenario: {
      decor: "Un coffret ouvert à droite avec un fil rouge qui dépasse, un sectionneur à levier et des gants isolants pendus au mur à gauche, un écran isolant rangé au sol.",
      acte1: "Le bonhomme enfile seulement ses gants et avance la main dans le coffret ouvert ; un collègue passe derrière lui et frôle le coffret : c'est lui qui reçoit l'éclair, cheveux dressés, étoiles, et se retrouve assis ; le bonhomme se retourne, saisi.",
      acte2: "Le bonhomme abaisse le levier du sectionneur et pose un cadenas, le fil devient gris ; il dresse l'écran isolant devant le coffret ; il enfile ses gants en dernier ; le collègue passe alors derrière l'écran sans aucun danger." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "Notre bonhomme enfile ses gants isolants et commence à travailler dans ce coffret resté sous tension : une protection posée en premier, déjà l'ordre inversé. Pendant qu'il est absorbé par son geste, un collègue passe derrière lui et frôle le coffret ouvert. C'est ce collègue qui reçoit la décharge, pas la personne qui portait des gants : un équipement individuel ne protège que celui qui le porte, jamais quelqu'un qui passe à côté." },
      { titre: "Acte 2 · la leçon", duree: 34,
        narration: "Même coffret, et cette fois l'ordre est respecté. Notre bonhomme commence par supprimer le risque à la source : il abaisse le levier du sectionneur, pose son propre cadenas, puis vérifie : l'arrivée devient grise, hors tension. Il installe ensuite un écran isolant devant le coffret : une protection collective, utile même si quelqu'un d'autre approche. Ce n'est qu'en dernier qu'il enfile ses gants, pour compléter. Le collègue peut désormais passer derrière l'écran sans aucun risque : cette fois, la protection ne dépendait pas de lui." } ] },
  { court: "Le bon gant", film: "M3",
    scenario: {
      decor: "Un établi avec une paire de gants isolants pendue au mur, un coffret ouvert avec un fil rouge qui dépasse, un écran isolant posé au sol à côté.",
      acte1: "Le bonhomme entre, décroche les gants sans les regarder, enfile le premier ; un petit trou orange marque l'index. Il avance quand même la main vers le fil dénudé ; au contact, un éclair traverse le trou, ses cheveux se dressent, il recule d'un bond et reste assis par terre, des étoiles tournant autour de la tête.",
      acte2: "Même établi. Le bonhomme décroche les gants et les étire devant lui, doigt par doigt ; à l'index, rien ne s'allume : ils sont sains. Il les enfile, porte l'écran isolant devant le coffret, puis avance la main derrière l'écran jusqu'au fil, sans risque. Un repère orange marque l'écran en place." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Ces gants isolants sont censés protéger la main qui va approcher un conducteur sous tension. Encore faut-il les vérifier avant chaque usage. Ici, notre bonhomme les enfile sans regarder, alors qu'un petit trou traverse l'index. Au contact du fil, le courant profite exactement de cette ouverture invisible à l'œil. La secousse le rejette en arrière, assis par terre, étourdi. Un équipement isolant n'est fiable que vérifié : sain, propre, sec, et adapté au risque réel." },
      { titre: "Acte 2 · la leçon", duree: 37,
        narration: "Même établi, et cette fois le bon geste. Avant d'enfiler quoi que ce soit, notre bonhomme étire chaque gant, doigt par doigt, à la recherche du moindre trou. Ces gants-là sont sains, il les enfile. Mais il ne s'arrête pas là : il installe d'abord un écran isolant devant le coffret, parce que la protection collective vient toujours avant l'équipement individuel. C'est seulement une fois l'écran en place qu'il approche la main, protégée deux fois plutôt qu'une. Un équipement contrôlé, une protection posée avant, c'est la méthode complète." } ] },
  { court: "Le bon appareil", film: "M3c",
    scenario: {
      decor: "Une petite source de contrôle au sol à gauche, un dispositif de vérification d'absence de tension, un coffret ouvert à droite avec deux bornes bleues et un fil rouge sous tension.",
      acte1: "Le dispositif tombe au sol et rebondit sans que le bonhomme y prête attention ; il le pose sur les deux bornes du coffret, le voyant reste éteint ; il conclut à tort à l'absence de tension et touche la borne à main nue : éclair, cheveux dressés, secousse, il se retrouve assis par terre, des étoiles tournent.",
      acte2: "Le bonhomme essaie d'abord le dispositif sur la source de contrôle : le voyant s'allume ; sur les deux bornes du coffret : le voyant reste éteint ; de nouveau sur la source : le voyant se rallume ; alors seulement il travaille, le bras levé." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 29,
        narration: "Ce dispositif de vérification d'absence de tension vient de heurter le sol, sans que notre bonhomme y prête attention. Il le pose sur les deux bornes du coffret : le voyant reste éteint. Il en conclut, à tort, qu'il n'y a rien à craindre, et touche la borne à main nue. Le courant passe aussitôt : secousse, cheveux dressés, assis par terre. Un choc au sol peut suffire à rendre l'appareil muet." },
      { titre: "Acte 2 · la leçon", duree: 35,
        narration: "Cette fois, l'installation a d'abord été séparée et mise hors tension. Notre bonhomme applique alors la bonne méthode : il essaie le dispositif sur une petite source de contrôle connue, le voyant s'allume, l'appareil fonctionne. Il l'approche ensuite des deux bornes du coffret : le voyant reste éteint, l'absence de tension est confirmée. Avant de travailler, il revient une dernière fois sur la source de contrôle : le voyant s'allume de nouveau, la vérification d'après confirme celle d'avant. Alors seulement il travaille en confiance, le bras levé." } ] },
  { court: "Le piège", scenes: ["vat"],
    narration: "Le piège tient en une phrase : un multimètre ordinaire ne remplace pas ce dispositif prévu pour la vérification d'absence de tension, même s'il affiche des volts. Et si l'appareil ne fonctionne plus au contrôle d'après la mesure, la vérification n'est pas validée pour autant : elle ne compte pas, même si tout semblait normal pendant l'opération. On reprend alors la procédure depuis le début, avec un appareil qu'on aura d'abord vérifié sur une source connue. Mieux vaut perdre deux minutes que faire confiance à un résultat qu'on ne peut pas garantir." },
  { court: "À toi", scenes: ["epi", "vat", "protection-collective", "epi"], muet: true,
    narration: "Quatre repères, sans légende cette fois. Devant chacun, le travail consiste à nommer ce qu'on vérifie avant de l'utiliser : sur une paire de gants isolants, on cherche un trou, une usure, l'humidité. Sur le dispositif de vérification d'absence de tension, on contrôle qu'il fonctionne avant et après la mesure. Sur un écran ou une nappe isolante, on regarde l'état et la bonne mise en place. Sur un outillage isolé, on vérifie le revêtement et l'absence de fissure. Si un repère résiste, l'écran précédent reste à portée de main." },
]};

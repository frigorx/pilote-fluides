/* ============================================================
   inerWeb HoCourant — STATION du module M8 « L'indice 0 »
   Une étape par écran de COURS.M8, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M8 = { etapes: [
  { court: "Zone préparée", film: "M8b",
    scenario: {
      decor: "Un mur à droite avec une prise, une zone à préparer plus haut sur ce même mur, un collègue à l'écart.",
      acte1: "Le bonhomme arrive avec sa perceuse pour fixer une étagère et perce au hasard juste au-dessus de la prise : le foret touche un câble caché, éclair, la perceuse saute, un nuage de poussière retombe, il recule et s'assoit par terre, étoiles autour de la tête.",
      acte2: "Même décor. Le chargé de travaux montre du doigt un rectangle tracé au mur, loin de la prise ; le bonhomme perce dans cette zone préparée, l'étagère se fixe, il lève le bras, satisfait." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Notre bonhomme doit fixer une étagère sur ce mur, une tâche qui n'a rien d'électrique. Pressé, il perce au hasard, juste au-dessus d'une prise, sans savoir ce qui passe derrière la cloison. Le foret touche un câble caché : éclair, la perceuse saute dans sa main, un nuage de poussière retombe. Le voilà assis par terre, les idées secouées. Percer un mur reste une opération non électrique, mais seulement dans une zone vraiment préparée à l'avance." },
      { titre: "Acte 2 · la leçon", duree: 38,
        narration: "Même mur, et cette fois la bonne méthode. Avant de toucher à quoi que ce soit, notre bonhomme attend que le chargé de travaux lui montre un rectangle tracé au mur, loin de toute prise : c'est la zone préparée pour sa tâche. Il perce à cet endroit précis, fixe son étagère, et lève le bras, satisfait. Le mur reste le même, le risque n'a pas changé, mais la préparation a tout changé : une zone délimitée, un chemin connu, une limite qui protège même une tâche aussi simple que percer un trou." } ] },
  { court: "Interdit", film: "M8",
    scenario: {
      decor: "Un coffret électrique fermé à gauche, un balisage orange au sol devant lui, un pan de mur et un pot de peinture à droite ; le bonhomme tient son rouleau.",
      acte1: "Le bonhomme arrive avec son rouleau, franchit le balisage et s'arrête devant le coffret fermé ; il pose la main sur la poignée et l'ouvre \"pour voir\" ; un éclair orange jaillit de l'intérieur, cheveux dressés, il recule d'un bond et s'assoit par terre, étoiles autour de la tête, le rouleau tombe.",
      acte2: "Même décor. Le bonhomme arrive avec son rouleau et s'arrête avant le balisage, le coffret refermé et intact ; il lève la main pour marquer l'arrêt ; un repère orange se pose au sol entre lui et le coffret ; il repart avec son rouleau et peint le mur du fond, bien à distance du coffret." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 35,
        narration: "Un coffret fermé, un balisage au sol, et notre bonhomme venu peindre le mur juste à côté. Curieux, il franchit la limite et ouvre le coffret « pour voir », deux secondes, se dit-il. Sauf qu'ouvrir un coffret est une opération d'ordre électrique, réservée à une personne autorisée. Derrière la porte, un conducteur nu sous tension : l'arc jaillit, il recule et se retrouve assis par terre, sonné. Le rouleau de peinture n'y est pour rien : c'est la porte ouverte qui a tout déclenché." },
      { titre: "Acte 2 · la leçon", duree: 39,
        narration: "Même coffret, même balisage, et cette fois notre bonhomme s'arrête bien avant la limite orange. Le coffret ne le concerne pas : sa tâche, c'est peindre le mur. Il lève la main pour marquer l'arrêt, un repère posé au sol rappelle la limite, et il repart peindre plus loin, à distance de tout ce qui est électrique. Le balisage reste en place, le coffret reste fermé. Retenez l'ordre : je reste dans ma tâche, je respecte la limite, je n'ouvre jamais ce qui n'est pas à moi. C'est tout le sens de l'indice zéro." } ] },
  { court: "La clé", scenes: ["analyser"],
    narration: "Cette personne lève la main devant un coffret ouvert : c'est le réflexe que l'indice zéro attend, même quand la tâche n'a rien d'électrique. L'indice zéro n'est pas un niveau débutant qui autoriserait à essayer un peu. Finir la tâche ne passe jamais avant respecter une limite : si le rouleau, l'échelle, un outil ou votre propre corps risque de dépasser le balisage ou de toucher une protection, vous vous arrêtez avant, pas après. C'est cette discipline qui distingue une zone préparée d'une zone dangereuse. La suite vous met devant quatre situations à trancher vous-même." },
  { court: "À toi", scenes: ["b0-zone-preparee", "coffret-interdit", "zone-limite", "cable-abime"], muet: true,
    narration: "Quatre situations, sans légende cette fois. Pour chacune, dites à voix haute : oui, non, ou j'arrête et je signale. Peindre un mur dans la zone préparée, ouvrir le tableau pour chercher une panne, déplacer le balisage pour faire passer un escabeau, signaler un câble endommagé repéré au sol : les règles qui tranchent viennent d'être données dans les écrans précédents. Si une réponse résiste, revenez-y avant de trancher. Quand les quatre situations sont réglées, les questions du module vous attendent." },
]};

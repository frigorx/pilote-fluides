/* ============================================================
   inerWeb HoCourant — STATION du module M2 « L'analyse avant l'action »
   Une étape par écran de COURS.M2, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M2 = { etapes: [
  { court: "Avant d'agir", film: "M2b",
    scenario: {
      decor: "Un local qu'il connaît, un coffret entrouvert à droite où un câble provisoire rouge est entré depuis le sol.",
      acte1: "Le bonhomme entre par la gauche en sifflotant et marche jusqu'au coffret ; d'un geste machinal il ouvre la porte entrouverte : au contact, éclair orange, cheveux dressés, il est secoué, des étoiles tournent autour de sa tête.",
      acte2: "Même décor. Le bonhomme s'arrête sur le seuil, la tête balaie la pièce ; cinq pastilles vertes s'allument une à une au-dessus de lui ; il repère le câble provisoire, recule, sort son téléphone et attend une réponse avant d'agir." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Notre bonhomme retrouve un local qu'il connaît bien, ce qui le rend moins attentif. Depuis la veille, un câble provisoire est entré dans le coffret laissé entrouvert, sans qu'il le sache. Il avance en sifflotant, ouvre la porte d'un geste machinal, comme chaque jour. Le contact est immédiat : l'installation a changé depuis sa dernière visite, et rien ne le montrait de l'extérieur. L'habitude vient de remplacer l'analyse, et c'est elle qui provoque la secousse." },
      { titre: "Acte 2 · la leçon", duree: 37,
        narration: "Même local, et cette fois le bon réflexe. Sur le seuil, notre bonhomme s'arrête avant tout geste et balaie la pièce du regard. Mentalement, il se pose les cinq questions : quelle tâche, quelle installation, quel état électrique, quelles personnes autour, quelles mesures prévues. Ce passage en revue lui fait remarquer ce câble provisoire qui n'était pas là la dernière fois. Il recule, appelle la personne qui gère l'installation, et attend une information fiable avant d'ouvrir quoi que ce soit. Une pièce familière n'est jamais une pièce connue à l'avance." } ] },
  { court: "Coactivité", film: "M2",
    scenario: {
      decor: "Un coffret ouvert à gauche, un ruban de balisage au sol devant, le passage à droite.",
      acte1: "Le bonhomme travaille près du coffret ouvert ; un collègue entre par la droite en portant un seau d'eau et avance droit vers le coffret sans regarder le balisage ; son pied franchit le ruban, le seau bascule, une éclaboussure orange gicle vers le coffret ; le bonhomme sursaute, cheveux dressés, étoiles autour de la tête.",
      acte2: "Même décor. Le collègue entre avec son seau et s'arrête au ruban de balisage ; le bonhomme lève la main pour marquer l'arrêt ; une bulle orange avec un point d'interrogation apparaît entre eux ; le collègue recule et pose le seau loin du coffret, puis un repère orange complète le balisage." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Notre bonhomme travaille près d'un coffret resté ouvert. Un collègue arrive de l'autre côté, un seau d'eau à la main, sans regarder où il met les pieds. Il franchit le balisage, le seau penche, et l'eau part droit vers le coffret. C'est une coactivité mal gérée : deux personnes, deux tâches, dans la même zone sans concertation. L'eau et l'électricité ne pardonnent pas, et ce collègue vient de créer un risque qu'il n'avait pas vu." },
      { titre: "Acte 2 · la leçon", duree: 37,
        narration: "Même scène, et cette fois le bon réflexe. Le collègue au seau s'arrête devant le balisage : la limite fait son travail, encore faut-il qu'on la regarde. Notre bonhomme lève la main et lui demande ce qu'il vient faire là, avant que le seau n'approche du coffret. Le collègue explique, recule, pose son seau à l'écart, et un repère vient compléter le balisage. Une nouvelle activité qui entre dans la zone fait partie des signaux qui imposent cette pause. La question posée à voix haute coûte dix secondes." } ] },
  { court: "La clé", scenes: ["analyser"],
    narration: "Cette personne est de nouveau immobile devant le coffret : elle vient de comprendre qu'elle ignore dans quel état électrique se trouve l'installation. Le dire à voix haute à ce moment-là n'est pas un aveu de faiblesse, c'est ce qu'on attend d'un professionnel. Elle tient les autres à l'écart, comme le collègue au seau qu'elle a arrêté à temps, puis elle va chercher l'information auprès de celui qui la détient vraiment. Reprendre ensuite sur une information sûre coûte quelques minutes ; continuer sur une supposition peut coûter beaucoup plus." },
  { court: "À toi", scenes: ["cable-abime", "coactivite", "zone-limite", "coffret-interdit"], muet: true,
    narration: "Quatre situations, sans légende cette fois. Le travail consiste à prendre une tâche réelle de l'atelier et à dérouler dessus les cinq questions du premier écran, jusqu'au risque principal, à la mesure prioritaire et à la personne qui en répond. Un câble abîmé au sol, une autre activité qui entre dans la zone, une limite devant une pièce sous tension, un coffret dont l'accès est refusé : chacune impose la même pause avant d'agir. Si une réponse résiste, les deux écrans précédents restent à portée de main. Ensuite, les questions du module vous attendent." },
]};

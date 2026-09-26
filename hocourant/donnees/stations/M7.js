/* ============================================================
   inerWeb HoCourant — STATION du module M7 « Les zones »
   Une étape par écran de COURS.M7, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M7 = { etapes: [
  { court: "Les distances", film: "M7b",
    scenario: {
      decor: "Une façade avec un groupe de climatisation à fixer côté droit, une ligne aérienne rouge qui passe en haut côté gauche, ancrée au coin de la façade.",
      acte1: "Le bonhomme entre par la gauche, une échelle métallique sur l'épaule ; il la dresse contre la façade côté gauche sans lever les yeux ; le haut de l'échelle touche la ligne : éclair orange, l'échelle glisse contre le mur, il recule et se retrouve assis, des étoiles tournent.",
      acte2: "Même décor. Le bonhomme lève la tête vers la ligne, porte l'échelle basse, pose un balisage de piquets et de ruban sous la ligne ; il rejoint le côté droit de la façade et y dresse l'échelle, appuyée contre le mur près du groupe ; une double flèche orange en pointillés marque l'écart qui reste avec la ligne ; il monte quelques échelons vers le groupe." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "Ce groupe de climatisation attend d'être fixé sur la façade, et une ligne aérienne passe en hauteur, tout près du mur. Notre bonhomme redresse une échelle métallique sans lever les yeux, concentré sur son geste. Le haut de l'échelle s'approche de la ligne et la touche : un arc jaillit, l'échelle tombe, et la secousse le rejette assis par terre, des étoiles plein la tête. Le danger venait d'en haut, pas du mur." },
      { titre: "Acte 2 · la leçon", duree: 39,
        narration: "Même façade, même groupe à fixer, et cette fois le bon geste. Notre bonhomme lève d'abord les yeux et repère la ligne. Il porte l'échelle couchée, basse, pose un balisage de piquets et de ruban sous la ligne, puis rejoint l'autre côté de la façade, à l'écart. Il y dresse l'échelle, appuyée contre le mur, juste à côté du groupe. Une flèche orange en pointillés marque l'écart qui reste entre le haut de l'échelle et la ligne : cet écart ne doit jamais se refermer. Il monte alors quelques échelons pour fixer le groupe." } ] },
  { court: "Trois zones", scenes: ["objet-long"],
    narration: "Le schéma à gauche empile trois zones autour d'une pièce nue sous tension, en basse tension : hors zone au-delà de trois mètres, voisinage simple jusqu'à trente centimètres, puis voisinage renforcé au plus près. Cette image montre pourquoi une limite ne protège pas à elle seule : ici, le corps reste en retrait mais un tube métallique la franchit quand même. Une zone se juge sur la personne ET sur ce qu'elle porte ou manipule. Sur un chantier, cette vigilance évite l'accident invisible, celui où l'on se croit prudent en oubliant l'objet qu'on tient." },
  { court: "Les rôles", scenes: ["acteurs"],
    narration: "Ici, un responsable remet une instruction de travail, documents en main : c'est la chaîne qui tient un chantier électrique. Le chargé d'exploitation donne les informations, le chargé de consignation met hors tension et condamne dans son périmètre, le chargé de travaux prépare et dirige, l'exécutant réalise la tâche confiée, et le chargé d'intervention agit dans une intervention autorisée. Chacun connaît son rôle et ses limites : c'est cette répartition, pas un simple document, qui organise la sécurité sur le terrain. L'écran suivant montre ce qui arrive quand une limite est dépassée sans le vouloir." },
  { court: "Le tube", film: "M7",
    scenario: {
      decor: "Une limite de zone marquée au sol par un trait orange en pointillés ; derrière, une armoire ouverte avec deux barres rouges qui indiquent une pièce nue sous tension.",
      acte1: "Le bonhomme entre par la gauche, un long tube métallique à l'épaule, et s'arrête net avant la limite. Il pivote pour appuyer le tube contre l'armoire ; l'extrémité du tube franchit la limite et touche les barres rouges. Un éclair orange part du bout du tube, ses cheveux se dressent, il lâche le tube et recule, des étoiles tournent autour de sa tête, il finit assis par terre.",
      acte2: "Même décor. Le bonhomme entre avec le même tube et s'arrête avant la limite ; il abaisse le tube à l'horizontale, loin de l'armoire, et recule d'un pas de plus. Il lève la main, paume en avant, pour marquer l'arrêt ; un repère orange se pose au sol devant lui ; il montre un téléphone pour signaler la situation." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Notre bonhomme s'arrête net avant la limite de zone : jusque-là, tout va bien. Il porte un long tube, et sans y penser, l'appuie contre l'armoire pour souffler un instant. L'extrémité du tube franchit la limite et touche la pièce sous tension. Le courant remonte par le métal : les cheveux se dressent, il lâche tout et recule, sonné, des étoiles plein la tête. Le corps était protégé ; l'objet qu'il tenait ne l'était pas." },
      { titre: "Acte 2 · la leçon", duree: 35,
        narration: "Même limite, même armoire, et cette fois le bon réflexe. Notre bonhomme s'arrête avant la zone, comme avant, mais il pense aussi à ce qu'il transporte : il abaisse le tube à l'horizontale, loin de l'armoire, et recule d'un pas de plus. Il lève la main pour marquer l'arrêt, fait poser un repère au sol, puis signale la situation à qui de droit. Retenez la règle : la limite protège le corps et tout ce qu'il porte, un tube, une règle, une échelle." } ] },
]};

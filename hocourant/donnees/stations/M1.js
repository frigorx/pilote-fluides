/* ============================================================
   inerWeb HoCourant — STATION du module M1 « Le danger électrique »
   Une étape par écran de COURS.M1, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M1 = { etapes: [
  { court: "Invisible", film: "M1b",
    scenario: {
      decor: "Une prise murale à droite, une rallonge dont la gaine est entaillée (un point orange) posée au sol, une perceuse et une rallonge saine plus loin.",
      acte1: "Le bonhomme entre par la gauche, marche jusqu'à la rallonge sans la regarder, saisit la fiche à l'endroit de l'entaille et la branche : décharge orange sur la main, cheveux dressés, il recule et se retrouve assis, des étoiles tournent.",
      acte2: "Même décor. Le bonhomme s'arrête avant l'entaille, la main suit le câble ; une étiquette orange se pose sur l'entaille ; il recule, prend la rallonge saine et branche la perceuse, dont le voyant s'allume." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Cette rallonge traîne au sol, la gaine entaillée sur plusieurs centimètres, le cuivre presque à nu. Notre bonhomme la déroule sans y prêter attention, la main à cet endroit, et branche la fiche dans la prise. Le courant passe par la main, remonte le bras, et la secousse le rejette assis par terre, des étoiles plein la tête. Rien ne distinguait cette rallonge d'une autre : le risque électrique ne se voit pas avant le contact." },
      { titre: "Acte 2 · la leçon", duree: 37,
        narration: "Même rallonge, et cette fois le bon geste. Notre bonhomme la fait glisser dans sa main, les yeux posés sur toute la longueur, avant de la brancher. Il s'arrête net sur l'entaille, la sent sous les doigts, et met cette rallonge de côté avec une étiquette bien visible : elle ne servira plus tant qu'elle n'est pas réparée. Il prend ensuite une rallonge saine, la déroule, et branche la perceuse sans risque. Un réflexe simple, avant chaque branchement : regarder le câble sur toute sa longueur, pas seulement ses deux extrémités." } ] },
  { court: "Direct ou indirect", film: "M1",
    scenario: {
      decor: "Un coffret ouvert à droite, un fil rouge dénudé qui dépasse de la porte, le sol.",
      acte1: "Le bonhomme entre par la gauche et marche jusqu'au coffret ; il tend le bras vers le fil pour le remettre en place ; au contact : éclair orange sur le fil, cheveux dressés, le corps tremble ; il est rejeté en arrière et reste debout, sonné, des étoiles tournent autour de sa tête.",
      acte2: "Même décor. Le bonhomme entre et s'arrête à un bon mètre du coffret ; il lève la main, paume en avant ; un repère orange se pose au sol entre lui et le coffret ; un panneau de danger apparaît au-dessus du coffret." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "Un coffret resté ouvert, et un fil qui dépasse. Notre bonhomme veut simplement le repousser à l'intérieur, l'affaire de deux secondes. Sauf que ce fil est sous tension, et rien ne le montre. Au contact, le courant entre par la main, traverse le bras et le corps. Les muscles se crispent, la main ne lâche plus, et c'est la secousse qui finit par le rejeter en arrière. Il s'en tire avec des étoiles plein la tête. Ce n'est pas toujours le cas." },
      { titre: "Acte 2 · la leçon", duree: 38,
        narration: "Même coffret, même fil, et cette fois le bon geste. Notre bonhomme s'arrête avant d'être à portée de main : c'est la distance qui le protège, pas son adresse. Il lève la main pour marquer l'arrêt et tenir les autres à l'écart, puis il fait poser un repère devant le coffret. Enfin il signale le danger : c'est une personne habilitée, avec la protection prévue, qui remettra ce fil en place. Retenez l'ordre : je m'arrête, je protège, je signale. Aucun matériel, seulement un réflexe, et il vaut pour toutes les situations de ce module." } ] },
  { court: "Les effets", film: "M1c",
    scenario: {
      decor: "Une armoire ouverte avec deux barres nues et une arrivée rouge, un sectionneur à levier sur le côté, un second personnage à distance.",
      acte1: "Le bonhomme approche un tournevis pour resserrer une vis ; l'outil touche les deux barres : grand flash, projections orange, il est repoussé sans que sa main ait touché, le visage noirci, il se retrouve assis, des étoiles tournent.",
      acte2: "Le bonhomme s'arrête hors de portée, range le tournevis, lève la main ; le chargé de travaux abaisse le levier du sectionneur et pose son cadenas ; l'arrivée devient grise ; il reprend alors le tournevis et resserre." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Cette armoire reste ouverte, les deux barres nues à portée de tournevis. Notre bonhomme veut simplement resserrer une vis, sans se douter que l'arrivée reste sous tension. L'outil touche les deux barres à la fois : un grand flash, des projections orange, et il est repoussé en arrière sans que sa main n'ait touché quoi que ce soit. Le visage noirci, assis par terre, il découvre l'arc électrique : il blesse à distance, pas seulement au contact." },
      { titre: "Acte 2 · la leçon", duree: 38,
        narration: "Même armoire, et cette fois le bon geste. Notre bonhomme s'arrête hors de portée des barres, range son tournevis, et lève la main pour marquer l'arrêt. Un collègue chargé des travaux abaisse alors le levier du sectionneur et pose son propre cadenas : l'arrivée qui alimentait les barres devient grise, hors tension. Ce n'est qu'à ce moment que notre bonhomme reprend son tournevis et resserre la vis, sans aucun risque cette fois. Retenez l'ordre : on coupe l'alimentation avant d'approcher un outil, on ne compte jamais sur la seule prudence du geste." } ] },
  { court: "La clé", scenes: ["analyser"],
    narration: "Cette personne lève la main devant un coffret ouvert : elle marque l'arrêt. C'est la clé de tout ce module. Comme l'électricité ne se voit pas, le professionnel ne commence jamais par toucher pour vérifier. Il s'arrête, il empêche les autres d'approcher, et il signale à qui de droit. Sur un chantier, ce réflexe paraît lent. En réalité il évite l'accident dont on ne se remet pas, et il montre à l'équipe que vous savez ce que vous faites. À vous maintenant de reconnaître ces situations." },
  { court: "À toi", scenes: ["contact-direct", "contact-indirect", "arc", "cable-abime"], muet: true,
    narration: "Quatre situations, sans légende cette fois. Pour chacune, le travail se fait en deux temps. D'abord nommer le phénomène : contact direct, contact indirect, ou arc. Ensuite dire à voix haute votre premier réflexe sûr. Le doigt près du conducteur dénudé, la main sur la carcasse de la machine en défaut, la projection au moment du court-circuit, le câble abîmé au sol : chacune de ces images vient d'être expliquée. Si une réponse résiste, l'écran précédent reste à portée de main. Quand les quatre sont trouvées, les questions du module vous attendent." },
]};

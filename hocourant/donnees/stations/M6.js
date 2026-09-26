/* ============================================================
   inerWeb HoCourant — STATION du module M6 « Symboles et titre »
   Une étape par écran de COURS.M6, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M6 = { etapes: [
  { court: "Le titre écrit", scenes: ["titre"],
    narration: "À droite, ce carton signé que l'on tend à une personne : c'est le titre d'habilitation. Il ne vient ni du formateur ni de l'école, mais de l'employeur, et c'est pour cela qu'il ouvre un droit d'agir. Le formateur, lui, donne seulement un avis. Sur un chantier, ce document se présente, se range dans la poche, et dit à l'équipe ce que vous pouvez faire. Une attestation de fin de stage ne joue pas ce rôle. L'écran suivant apprend à lire les lettres inscrites sur la carte." },
  { court: "Décoder les lettres", scenes: ["titre", "acteurs"],
    narration: "Deux images ici : la carte, et la scène où une instruction se transmet d'une personne à une autre. Les lettres du titre servent exactement à cela : dire en deux caractères qui fait quoi, sans discussion sur le chantier. Le premier caractère situe le domaine de tension, le second dit le rôle tenu. Un chargé de travaux et un exécutant ne portent donc pas le même symbole : ils ne reçoivent pas les mêmes ordres. La lettre V signale en plus le voisinage renforcé. Le détail est à gauche : rien ne se devine." },
  { court: "Symbole et limites", scenes: ["titre", "coffret-interdit"],
    narration: "La carte revient, et à côté d'elle un coffret qui n'est pas pour tout le monde. Le symbole n'est que la première ligne du document : dessous viennent les installations concernées, les tâches confiées, les tensions et les limites. Deux personnes qui portent les mêmes lettres peuvent donc avoir des droits différents, parce que leurs titres ne sont pas écrits pareil. Devant ce coffret, la question utile n'est pas « quel symbole ai-je ? », mais « qu'est-ce que mon titre m'autorise ici ? ». Et lire la carte ne dispense jamais de savoir faire le geste." },
  { court: "Le geste vu", film: "M6",
    scenario: {
      decor: "Un établi avec une prise murale à gauche, un coffret électrique fermé à droite, une perceuse posée sur l'établi.",
      acte1: "Le bonhomme arrive, prend la perceuse, la branche à la prise murale ; il l'utilise un instant puis tend la main vers la porte du coffret voisin, seulement parce qu'il a vu un collègue l'ouvrir un jour ; au contact de la porte : éclair orange, cheveux dressés, il est repoussé en arrière et reste assis au sol, des étoiles tournent autour de sa tête.",
      acte2: "Même établi. Le bonhomme branche la perceuse et l'utilise normalement, sans toucher au coffret ; un responsable s'approche et lui remet une carte ; un cadenas apparaît sur la porte du coffret, qui reste fermée ; le bonhomme range la perceuse, satisfait." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 28,
        narration: "Là, notre bonhomme utilise une perceuse branchée sur une prise normale : rien à redire, un appareil en bon état ne demande pas de titre particulier. Le problème arrive quand il tend la main vers le coffret voisin, seulement parce qu'il a vu un collègue l'ouvrir un jour. Avoir vu faire ne donne aucun droit d'agir. Au contact du coffret, le courant le rappelle brutalement à l'ordre, et il se retrouve assis, étoiles plein la tête." },
      { titre: "Acte 2 · la leçon", duree: 37,
        narration: "Même établi, et cette fois le bon réflexe. Notre bonhomme utilise sa perceuse comme avant, sans toucher au coffret : c'est bien l'usage normal d'un appareil qui ne demande pas de titre. Pour le coffret, en revanche, il attend que l'employeur lui remette la carte adaptée, avec ses limites précises. Une fois ce titre en poche, et seulement dans le cadre qu'il fixe, il pourra intervenir sur l'installation. Retenez l'essentiel : une démonstration n'autorise jamais rien ; seul un document écrit, remis par l'employeur, ouvre ce droit." } ] },
  { court: "À toi", scenes: ["b0-zone-preparee", "bs-remplacement", "manoeuvre", "b1v-equipe"], muet: true,
    narration: "Quatre scènes attendent un symbole, sans légende cette fois : B0, BS, BE Manœuvre, B1V. Pour chacune, nommez d'abord le rôle représenté, puis donnez une limite essentielle qui va avec. Celle qui peint dans une zone préparée ne touche à rien d'électrique. Celle qui change une lampe agit seule, hors tension. Celle qui appuie sur un bouton suit une instruction, sans ouvrir de capot. Celle qui travaille sous direction respecte le périmètre confié. Si une réponse résiste, remontez aux écrans précédents avant de continuer vers les questions du module." },
]};

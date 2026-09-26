/* ============================================================
   inerWeb HoCourant — STATION du module M10 « BS et BE Manœuvre »
   Une étape par écran de COURS.M10, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M10 = { etapes: [
  { court: "Le BS", film: "M10b",
    scenario: {
      decor: "Une applique murale avec son interrupteur, un petit tableau électrique avec un disjoncteur, le sol.",
      acte1: "Le bonhomme s'arrête devant l'applique grillée et bascule l'interrupteur mural, persuadé que cela suffit ; il démonte l'applique et saisit les deux fils : un éclair jaillit, ses cheveux se dressent, il reste secoué, des étoiles tournant autour de sa tête.",
      acte2: "Même décor. Le bonhomme va d'abord au petit tableau, abaisse le disjoncteur du circuit et y pose une étiquette orange ; il revient vérifier l'absence de tension sur les fils avec son appareil, remplace la lampe à l'identique, puis retourne remonter le disjoncteur : la lampe s'allume." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 29,
        narration: "Cette applique ne s'allume plus, et notre bonhomme veut simplement changer la lampe. Il bascule l'interrupteur du mur, persuadé que le circuit est ainsi coupé. Il démonte l'applique et saisit les deux fils pour les dégager : l'éclair jaillit, les cheveux se dressent, tout le corps se crispe. L'interrupteur commande la lampe, pas le circuit qui l'alimente : le courant reste présent derrière lui, et rien avant le contact ne le montrait." },
      { titre: "Acte 2 · la leçon", duree: 37,
        narration: "Même applique, et cette fois le bon geste. Notre bonhomme va d'abord au petit tableau, abaisse le disjoncteur qui protège ce circuit précis et y accroche une étiquette, pour que personne ne le remette sous tension pendant qu'il travaille. De retour près de l'applique, il approche son vérificateur des deux fils : le voyant reste éteint, la preuve que le circuit est bien hors tension. Il remplace la lampe à l'identique, referme l'applique, puis retourne remonter le disjoncteur : la lumière revient. Retenez l'ordre : couper au tableau, vérifier, seulement ensuite toucher." } ] },
  { court: "Le BE Manœuvre", film: "M10c",
    scenario: {
      decor: "Une armoire de commande avec son capot, une poignée de manœuvre à l'extérieur, une feuille d'instruction accrochée, le sol.",
      acte1: "Le bonhomme s'arrête devant la machine qui ne démarre pas, dévisse le capot de l'armoire de commande et plonge la main entre les pièces pour chercher la panne : un éclair jaillit, ses cheveux se dressent, des étoiles tournent autour de sa tête.",
      acte2: "Même décor. Le bonhomme reste devant la poignée prévue, lit la feuille d'instruction accrochée, tourne la poignée comme elle le demande ; la machine ne repart pas : il laisse le capot fermé, sort son téléphone et appelle son responsable, une bulle orange marquant le compte rendu." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "Cette machine refuse de démarrer, et notre bonhomme veut comprendre pourquoi. Il dévisse le capot de l'armoire de commande, persuadé qu'il trouvera la panne à l'intérieur. Il glisse la main entre les pièces pour tâter le défaut : l'éclair jaillit, les cheveux se dressent, tout le corps se crispe. Chercher une panne derrière ce capot n'a jamais fait partie de son rôle, et rien ne le protégeait devant ce qu'il venait d'ouvrir." },
      { titre: "Acte 2 · la leçon", duree: 38,
        narration: "Même machine, et cette fois le bon geste. Notre bonhomme reste devant l'organe de commande prévu, sans jamais approcher le capot. Il lit d'abord la feuille d'instruction accrochée là pour cette manœuvre précise, puis tourne la poignée comme elle le demande. La machine ne repart pas : le défaut est réel, mais chercher sa cause derrière ce capot dépasse son rôle. Il laisse tout fermé, sort son téléphone et appelle son responsable pour raconter ce qu'il a tenté et observé. Retenez l'ordre : suivre l'instruction, constater, puis rendre compte plutôt que d'ouvrir." } ] },
  { court: "BS ou BE", scenes: ["bs-remplacement", "manoeuvre"],
    narration: "Deux images, deux rôles, et rien dans le geste ne les sépare vraiment à l'œil. À gauche, on ouvre le matériel et on échange une pièce à l'identique, sur un circuit d'abord mis hors tension : c'est le remplacement élémentaire du BS. À droite, on ne touche que l'organe de commande et le capot reste en place : c'est la manœuvre du BE. Ce qui décide n'est donc pas la difficulté apparente, mais ce qu'on ouvre et ce qu'on remplace. La question se pose avant d'y aller, pas la main déjà posée dessus." },
  { court: "Le piège", film: "M10",
    scenario: {
      decor: "Un tableau électrique fixé au mur, un disjoncteur bien visible, le sol.",
      acte1: "Le bonhomme entre, relève la manette du disjoncteur ; elle retombe aussitôt. Il la relève une deuxième fois ; elle retombe encore. Il s'entête et la relève une troisième fois : un éclair orange jaillit du tableau, ses cheveux se dressent, il est projeté en arrière et se retrouve assis par terre, des étoiles tournant autour de sa tête.",
      acte2: "Même tableau. Le bonhomme relève la manette une première fois ; elle retombe. Il la relève une seconde fois ; elle retombe encore. Cette fois il s'arrête, lève la main pour marquer l'arrêt et ne touche plus rien. Il sort son téléphone et appelle son responsable ; une bulle orange avec un point d'exclamation apparaît au-dessus du tableau pour marquer le compte rendu." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 30,
        narration: "Ce disjoncteur retombe à chaque fois, et notre bonhomme insiste. Une fois, deux fois, trois fois : il croit que la manette a un caprice. Elle n'en a pas. Elle retombe parce que le défaut est toujours là, derrière, dans le circuit. À la troisième fermeture, le courant de défaut repart et l'arc jaillit du tableau : les cheveux se dressent, et le voilà assis par terre, des étoiles plein la tête." },
      { titre: "Acte 2 · la leçon", duree: 38,
        narration: "Même tableau, même disjoncteur, et cette fois le bon geste. La manette est relevée une première fois ; elle retombe. Une seconde fois ; elle retombe encore. Cela suffit : le défaut se répète. Il s'arrête net, lève la main et ne touche plus à rien. Il appelle son responsable et lui raconte ce qu'il a vu. Aller chercher la panne derrière le capot, ou sortir un appareil de mesure pour la trouver, ce n'est déjà plus une manœuvre. Retenez l'ordre : deux essais, puis on s'arrête et on rend compte." } ] },
]};

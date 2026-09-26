/* ============================================================
   inerWeb HoCourant — STATION du module M13 « BR — l'intervention BT »
   Une étape par écran de COURS.M13, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M13 = { etapes: [
  { court: "Le rôle BR", film: "M13b",
    scenario: {
      decor: "Une armoire basse tension à trois départs, ouverte ; au bas du premier départ, deux bornes voisines reliées à des fils rouges, toutes deux sous tension ; le sol.",
      acte1: "Le chargé d'intervention s'approche, un appareil de mesure en main, mains nues et sans écran facial ; il pose une pointe sur sa borne, l'autre glisse sur la borne voisine : flash orange, visage noirci, cheveux dressés, il se retrouve assis par terre, des étoiles tournant autour de sa tête.",
      acte2: "Même armoire, mêmes bornes. Il met d'abord l'écran facial et des gants isolants, pose une nappe isolante sur la borne voisine, puis mesure sans risque sur la sienne ; avant de remplacer la pièce, il abaisse le levier de son propre départ et pose son cadenas, sa propre mise en sécurité." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Dans cette armoire basse tension, deux bornes voisines restent sous tension : celle du départ mesuré, et celle du départ d'à côté. Cette personne mesure mains nues, sans écran facial, et une pointe glisse d'une borne à l'autre. Les deux potentiels se rejoignent : c'est le court-circuit, un flash, le visage noirci, les cheveux hérissés, et elle se retrouve assise, étourdie. Sur une installation sous tension, la protection se met toujours avant le geste, jamais après." },
      { titre: "Acte 2 · la leçon", duree: 35,
        narration: "Même armoire, mêmes bornes voisines. Cette fois, avant tout geste, la personne met l'écran facial et des gants isolants, puis pose une nappe isolante sur la borne voisine pour ne plus pouvoir la toucher par erreur. La mesure se fait alors sans risque. Mais avant de remplacer la pièce en cause, elle va plus loin : elle abaisse le levier de son propre départ et pose son cadenas. C'est sa propre mise en sécurité, celle que le chargé d'intervention décide et exécute lui-même, avant d'agir." } ] },
  { court: "Le périmètre", scenes: ["titre", "hors-perimetre"],
    narration: "Ces deux images posent la limite du rôle BR. Le titre d'abord : il fixe le champ précis de ce que la personne peut faire. L'armoire entière ensuite : une reprise de cette ampleur n'est plus un dépannage de faible étendue, elle appelle une équipe de travaux. On cite souvent la basse tension, des circuits protégés contre les courts-circuits, et un repère de cinq cents volts pour situer ce domaine. Mais ce chiffre ne dit pas tout : le titre délivré, l'installation concernée et la norme applicable peuvent restreindre le champ bien avant ce repère." },
  { court: "Avant le geste", scenes: ["epi", "analyser"],
    narration: "Les gants examinés avant usage, la personne qui s'arrête devant le coffret : ces deux gestes précèdent toujours l'intervention BR. Rien dans ce rôle n'autorise à travailler sous tension par principe ; d'éventuelles opérations en présence de tension restent strictement encadrées par la norme, le titre, la procédure et une formation pratique spécifique, jamais un geste improvisé parce que le résultat semble simple. Avant le moindre contact, tout se prépare : le matériel vérifié, la zone dégagée, les conditions d'arrêt décidées à l'avance. L'écran suivant montre la limite à ne pas franchir." },
  { court: "Le piège", film: "M13",
    scenario: {
      decor: "Une armoire à plusieurs départs, ouverte, un seul départ marqué en défaut ; le sol.",
      acte1: "Le bonhomme repère le départ en défaut et le répare comme prévu ; content de son geste, il continue et touche un deuxième départ, puis un troisième, sans lien avec la panne ; les fils s'emmêlent entre ses mains ; un disjoncteur claque, puis un deuxième, puis un troisième, en cascade ; il se retrouve assis par terre au milieu des fils, des étoiles tournant autour de sa tête, l'armoire clignotante derrière lui.",
      acte2: "Même armoire, même départ en défaut. Le bonhomme mesure, repère la panne, répare uniquement ce départ, referme l'armoire et s'arrête là ; un repère orange marque la limite de son périmètre au sol devant les autres départs ; il porte un téléphone à son oreille et rend compte : le reste de l'armoire attend une équipe de travaux." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 28,
        narration: "Un départ tombe en panne dans cette armoire, et le chargé d'intervention le répare, exactement dans son rôle. Puis il continue, gagné par l'élan : il touche un deuxième départ, puis un troisième, sans lien avec la panne d'origine. Les fils s'emmêlent, un disjoncteur saute, puis un autre, en cascade. Il se retrouve assis par terre, étourdi, entouré d'étoiles, au milieu d'une armoire qu'il a lui-même mise en désordre." },
      { titre: "Acte 2 · la leçon", duree: 35,
        narration: "Même armoire, même départ en panne, et cette fois le bon réflexe. Le chargé d'intervention mesure, localise la panne, répare uniquement ce départ, puis referme l'armoire : c'est cela, une intervention de faible étendue. Il pose un repère au sol devant les autres départs pour marquer la limite de son périmètre, puis il téléphone à son chargé d'exploitation pour rendre compte. Modifier l'armoire entière n'est pas son rôle : cela revient à une équipe de travaux, avec sa propre préparation. Savoir s'arrêter au bon endroit fait partie du métier." } ] },
]};

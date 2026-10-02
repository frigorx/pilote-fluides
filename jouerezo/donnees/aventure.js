/* =====================================================================
   aventure.js — « Nuit à l'atelier : les zombies du R-22 »
   ---------------------------------------------------------------------
   RÔLE : le scénario de l'aventure à choix. L'habillage est farfelu
   (un zombie frigoriste), le contenu ne l'est jamais : chaque bon choix
   est le geste des planches HabFluide ; chaque mauvais choix renvoie
   vers la planche qui l'explique.
   FORMAT : scenes[] dans l'ordre. Une scène : titre, vignette (emoji),
   texte (tableau de paragraphes), choix[] { t, bon:true|false, retour,
   porte:{t,h} }. Exactement UN choix bon par scène. La dernière scène
   n'a pas de choix : fin.
   PIÈGES : ne pas inventer de seuil ni de chiffre ; le zombie peut tout
   dire, le narrateur ne dit que ce que les planches disent.
   ===================================================================== */
window.JR_AVENTURE = {
  zombies: {
    titre: "Les zombies du R-22",
    intro: [
      "Il est 23 h. Vous êtes resté finir un relevé à l'atelier. La lumière vacille.",
      "Au fond, près du vieux groupe de condensation, une silhouette traîne les pieds. Bleu de travail d'un autre siècle, briquet à la main : c'est un zombie frigoriste. Il brase à la flamme sur des circuits encore chargés, remplit les bouteilles à ras et cherche les fuites au briquet.",
      "Il ne mord pas. Il fait pire : il veut vous faire travailler comme lui. Chaque geste sûr le repousse. Chaque geste faux lui fait gagner un pas."
    ],
    scenes: [
      { titre: "Le briquet", vignette: "🔥",
        texte: ["Le zombie tend son briquet vers un raccord qui siffle : « Approche la flamme, tu verras la couleur changer, c'est comme ça qu'on faisait. »"],
        choix: [
          { t: "Je prends le détecteur électronique : je le contrôle, je balaie lentement, je confirme.", bon: true, retour: "Le zombie recule d'un pas. Contrôler, balayer, confirmer : la fuite est localisée sans flamme." },
          { t: "J'allume, c'est rapide et ça marche.", bon: false, retour: "Méthode ancienne, aujourd'hui interdite : la flamme décompose le fluide en gaz toxiques et corrosifs, à bout portant.", porte: { t: "Détecteur : contrôler, balayer, confirmer", h: "../f/a-recherche-fuite-geste/" } },
          { t: "Je lui verse de l'eau savonneuse dessus pour voir s'il fait des bulles.", bon: false, retour: "L'eau savonneuse sert sur un raccord, pas sur un zombie. Et la fuite siffle toujours.", porte: { t: "Détecteur : contrôler, balayer, confirmer", h: "../f/a-recherche-fuite-geste/" } }
        ] },
      { titre: "La bouteille", vignette: "🛢️",
        texte: ["Il remplit une bouteille de récupération jusqu'au goulot et la cale contre le radiateur : « Plus c'est plein, moins on fait de trajets. Et au chaud, ça rentre mieux. »"],
        choix: [
          { t: "Je respecte le taux de remplissage du fabricant, je la pèse et je la range à l'ombre.", bon: true, retour: "Le zombie grogne. Le liquide a où se dilater : la pression reste raisonnable." },
          { t: "Je l'aide à remplir, il a raison pour les trajets.", bon: false, retour: "Remplie à ras, la bouteille n'a plus de place pour la dilatation : la température monte, la pression grimpe très vite.", porte: { t: "La bouteille : jamais à ras, jamais chauffée", h: "../f/a-secu-bouteille/" } },
          { t: "Je la mets au soleil demain matin, elle se videra plus vite.", bon: false, retour: "Jamais chauffer une bouteille : ni flamme, ni eau chaude, ni radiateur, ni soleil, ni véhicule fermé.", porte: { t: "La bouteille : jamais à ras, jamais chauffée", h: "../f/a-secu-bouteille/" } }
        ] },
      { titre: "Le local CO₂", vignette: "🚪",
        texte: ["L'alarme du local technique CO₂ clignote. La porte est entrouverte. Le zombie est descendu voir. Il est au sol, en bas de l'escalier, et ne bouge plus."],
        choix: [
          { t: "Je n'entre pas. J'alerte, je ventile, je mesure avant toute entrée.", bon: true, retour: "Le CO₂ s'accumule en point bas, invisible. Pas de seconde victime : les secours entrent équipés." },
          { t: "Je descends vite le tirer dehors, il n'y a que trois marches.", bon: false, retour: "Trois marches dans un point bas plein de CO₂ : vous seriez la deuxième victime. Personne au sol : ne pas descendre.", porte: { t: "Espace clos : mesurer avant d'entrer", h: "../f/a-securite-espace-clos/" } },
          { t: "J'entre en retenant ma respiration, trente secondes, pas plus.", bon: false, retour: "On ne négocie pas avec un gaz qu'on ne voit pas. Ventiler, mesurer, alerter ; sans mesure, on n'entre pas.", porte: { t: "Espace clos : mesurer avant d'entrer", h: "../f/a-securite-espace-clos/" } }
        ] },
      { titre: "L'armoire électrique", vignette: "⚡",
        texte: ["Le zombie ouvre l'armoire du groupe et y plonge les mains : « J'ai coupé l'inter, c'est bon. Viens m'aider. »"],
        choix: [
          { t: "Séparer, condamner, identifier, vérifier au VAT testé avant et après, mettre à la terre si nécessaire.", bon: true, retour: "Cinq étapes, toujours dans cet ordre. Le zombie retire ses mains, vexé." },
          { t: "Il a coupé, ça suffit, on y va.", bon: false, retour: "Une coupure ne prouve jamais l'absence de tension. Seul le VAT, testé avant et après, en fait la preuve.", porte: { t: "La consignation électrique en cinq étapes", h: "../f/a-secu-consignation/" } },
          { t: "Je vérifie avec le dos de la main, comme dans les films.", bon: false, retour: "Le dos de la main n'est pas un VAT. Contact direct avec une partie active : électrisation, ou pire.", porte: { t: "HoCourant — le risque électrique", h: "../hocourant/" } }
        ] },
      { titre: "Le chalumeau", vignette: "🔧",
        texte: ["Il allume le chalumeau devant un tube à réparer : « Il reste un peu de fluide dedans, ça sent presque bon. On brase direct. »"],
        choix: [
          { t: "D'abord récupérer tout le fluide, balayer à l'azote pendant le brasage, ventiler.", bon: true, retour: "Rien à décomposer, rien à respirer. Le zombie éteint son chalumeau, dépité." },
          { t: "Un peu de fluide ne gêne pas la brasure.", bon: false, retour: "Ce qui sort d'un tube chauffé encore chargé n'était pas dedans : gaz toxiques et corrosifs, inhalés à bout portant.", porte: { t: "Brasage : récupérer et balayer, jamais chauffer du fluide", h: "../f/a-secu-flamme/" } },
          { t: "Je brase avec lui en retenant mon souffle.", bon: false, retour: "On ne retient pas son souffle pendant une brasure. On récupère, on balaie, on ventile.", porte: { t: "Brasage : récupérer et balayer, jamais chauffer du fluide", h: "../f/a-secu-flamme/" } }
        ] },
      { titre: "L'épreuve", vignette: "💨",
        texte: ["Pour éprouver le circuit réparé, le zombie raccorde une bouteille d'oxygène : « Ça monte plus vite qu'avec l'azote, tu vas voir. »"],
        choix: [
          { t: "Azote sec seulement, avec un mano-détendeur, à la pression de la documentation.", bon: true, retour: "Le zombie lâche la bouteille d'oxygène. L'azote est sec et inerte : le circuit ne craint rien." },
          { t: "L'oxygène, c'est un gaz comme un autre.", bon: false, retour: "Oxygène sur un circuit huilé : explosion. Le geste ne se discute pas.", porte: { t: "L'épreuve de pression, à l'azote seul", h: "../f/a-epreuve-azote/" } },
          { t: "Je prends l'air comprimé du compresseur d'atelier, c'est gratuit.", bon: false, retour: "L'air comprimé apporte de l'humidité et de l'oxygène. Azote seul.", porte: { t: "L'épreuve de pression, à l'azote seul", h: "../f/a-epreuve-azote/" } }
        ] },
      { titre: "La pompe à vide", vignette: "🌀",
        texte: ["Le tirage au vide tourne depuis un moment. Le zombie arrête la pompe d'un coup, vanne ouverte, et lit le vide sur le manomètre du manifold : « Zéro, c'est bon. »"],
        choix: [
          { t: "Je ferme la vanne côté circuit avant d'arrêter la pompe, puis je lis le vacuomètre, circuit isolé.", bon: true, retour: "Le palier est bas et stable : tirage correct. Et l'huile de la pompe est restée dans la pompe." },
          { t: "Le manomètre du manifold suffit pour lire le vide.", bon: false, retour: "Le manomètre du manifold ne suffit pas : c'est le vacuomètre qui lit le vide, au plus près du circuit.", porte: { t: "Le tirage au vide : la courbe qui descend", h: "../f/a-tirage-au-vide/" } },
          { t: "J'arrête la pompe d'abord, je fermerai la vanne après.", bon: false, retour: "Pompe arrêtée vanne ouverte : son huile peut être aspirée vers le circuit. La vanne d'abord.", porte: { t: "Le tirage au vide : la courbe qui descend", h: "../f/a-tirage-au-vide/" } }
        ] },
      { titre: "Le propane", vignette: "🧯",
        texte: ["Un monobloc au R-290 attend sa réparation. Le zombie sort une cigarette : « C'est du A2L, tranquille, ça brûle à peine. »"],
        choix: [
          { t: "Le R-290 est A3. Zone balisée, détecteur HC, ventilation active, zéro ignition ; sinon, STOP.", bon: true, retour: "La cigarette retourne dans le paquet. Tout hydrocarbure est très inflammable : la zone se prépare avant le geste." },
          { t: "C'est du A2L, pas de souci.", bon: false, retour: "Le piège de l'année : le R-290 est A3, pas A2L. Charge limitée, aucune source d'ignition.", porte: { t: "Classes de sécurité NF EN 378", h: "../f/a-classes-securite/" } },
          { t: "J'ouvre la fenêtre et je le laisse fumer dehors, à côté de la machine.", bon: false, retour: "Une flamme près d'un circuit A3 reste une source d'ignition, fenêtre ou pas. Zéro ignition dans la zone.", porte: { t: "R-290 : préparer la zone avant le geste", h: "../f/a-r290-zone-intervention/" } }
        ] },
      { titre: "La bouteille sans nom", vignette: "❓",
        texte: ["Une bouteille sans étiquette traîne sur l'établi. Le zombie : « Verse-la avec l'autre, c'est sûrement pareil. »"],
        choix: [
          { t: "Un fluide par bouteille, identifié. Sans identification, on ne mélange rien.", bon: true, retour: "Identification et traçabilité : le registre saura ce qu'il y a dedans, et le centre de traitement aussi." },
          { t: "Je mélange, le compresseur fera le tri.", bon: false, retour: "Un compresseur ne trie rien. Un mélange inconnu n'est ni réutilisable ni traçable.", porte: { t: "Récupération : circuit fermé, bouteille pesée", h: "../f/a-recuperation-securisee/" } },
          { t: "Je sens l'odeur pour deviner le fluide.", bon: false, retour: "On n'identifie pas un fluide au nez. Plaque, étiquette, registre.", porte: { t: "Récupération : circuit fermé, bouteille pesée", h: "../f/a-recuperation-securisee/" } }
        ] },
      { titre: "Le raccord", vignette: "💥",
        texte: ["Le zombie dévisse d'un coup un flexible encore sous pression. Le fluide fuse en sifflant. Il rit : « Comme ça, ça fuit moins longtemps. »"],
        choix: [
          { t: "Fermer, laisser la pression se stabiliser, desserrer lentement par petites touches, récupérer le fluide du flexible par l'appareil.", bon: true, retour: "Ce qui commande l'ordre, c'est la pression, jamais la montre. Le zombie n'aime pas attendre : il recule." },
          { t: "Vite, d'un coup, pour que ça fuie moins longtemps.", bon: false, retour: "Un raccord sous pression ne se desserre jamais d'un coup : projection de fluide, brûlure par le froid.", porte: { t: "L'ordre des vannes : une chorégraphie", h: "../f/a-ordre-vannes/" } },
          { t: "Je me place dans l'axe du raccord pour mieux voir.", bon: false, retour: "Projection de fluide : on sort de l'axe, on ne s'y met pas.", porte: { t: "L'ordre des vannes : une chorégraphie", h: "../f/a-ordre-vannes/" } }
        ] },
      { titre: "La charge", vignette: "⚖️",
        texte: ["Il charge la machine « au feeling » : « Je m'arrête quand ça fait un bruit différent. Pas besoin de balance. »"],
        choix: [
          { t: "Deux pesées, avant et après ; la différence, c'est la charge, et je la note au registre.", bon: true, retour: "La balance dit combien, le manomètre dit comment la machine se comporte. Le registre est à jour." },
          { t: "Une seule pesée, à la fin, ça suffit.", bon: false, retour: "Une seule pesée ne donne qu'une estimation. Deux pesées, jamais une.", porte: { t: "La pesée : deux pesées, jamais une", h: "../f/a-pesee-charge/" } },
          { t: "Le manomètre dit tout, la balance ne sert à rien.", bon: false, retour: "Le manomètre ne dit pas combien de fluide est entré. Seule la balance le sait.", porte: { t: "La pesée : deux pesées, jamais une", h: "../f/a-pesee-charge/" } }
        ] },
      { titre: "L'aube", vignette: "🌅",
        texte: ["Le jour se lève sur l'atelier. Le zombie recule vers le vieux groupe au R-22, son briquet éteint."],
        choix: [] }
    ],
    finGagnee: "Le zombie a renoncé : on raconte qu'il s'est inscrit à la formation HabFluide. L'atelier est à vous.",
    finPerdue: "Le zombie vous a embauché. Vous braserez des circuits chargés pour l'éternité… ou vous relisez les portes ci-dessous et vous recommencez."
  }
};

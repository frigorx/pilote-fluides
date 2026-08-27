/* C2 — Apport latent
   Ligne C · Climatisation & apports
   CP8 · Calculs d’apports thermiques · CP9 · Étude d’une installation de climatisation

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   L'humidité relative est posée en A4 : on s'appuie dessus, on ne la réexplique pas. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "C",
  id: "apport-latent",
  title: "Apport latent",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Relie présence humaine et vapeur d’eau.",
  bac: "Distingue charge sensible et charge latente.",
  bts: "Calcule un bilan total à partir d’un écart d’enthalpie ou de charges séparées.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "Les points de vapeur sont les mêmes des deux côtés de la scène. Chauffer n’en enlève aucun, et refroidir non plus. Cette eau-là ne part pas parce qu’on baisse la température : elle reste dans l’air tant qu’on ne l’a pas condensée quelque part. Une climatisation qui se contenterait de rafraîchir laisserait donc tous ces points en place — le thermomètre afficherait la bonne valeur, et le local resterait moite. C’est cet écart-là que la charge latente vient chiffrer.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "La station Apport sensible a chiffré la chaleur qui change la température. Il en existe une seconde, qui ne la change pas du tout : celle qu’il faut retirer pour transformer la vapeur en eau liquide. On la dit latente, c’est-à-dire cachée — le thermomètre ne la voit pas, et pourtant elle se paie.\n\nDans un local, l’eau a quatre sources habituelles. Les occupants d’abord : chacun respire et transpire, et l’apport monte vite avec l’effort. Les usages ensuite — cuisson, douches, lavage, séchage. Puis certains procédés et certaines machines. Enfin l’air neuf, qui entre avec l’humidité du dehors. Les valeurs par personne et par usage dépendent de l’activité, de la température et de l’horaire : elles se prennent dans les données du projet, jamais de mémoire.\n\nRetirer cette eau coûte cher, et c’est la surprise du calcul. Condenser un gramme de vapeur demande environ 2 500 J, quand il en faut à peine plus de 1 000 pour réchauffer un kilogramme d’air d’un degré. Un gramme d’eau contre un kilogramme d’air : l’eau pèse lourd dans un bilan. Une salle qui produit un litre d’eau par heure impose ainsi près de 0,7 kW rien que pour l’assécher, avant d’avoir refroidi quoi que ce soit.\n\nLa puissance totale est la somme des deux, mais leur proportion compte autant que leur somme. Dans un bureau, le latent ne pèse qu’une petite part du total ; dans un restaurant, un vestiaire ou une salle de sport, il peut en représenter le tiers ou davantage. Deux locaux qui demandent la même puissance totale n’appellent donc pas la même machine.\n\nReste à savoir comment on retire cette eau. Il n’y a qu’une façon : faire passer l’air sur une surface plus froide que son point de rosée, pour que la vapeur s’y dépose.",

  method: "La puissance totale est la somme du sensible et du latent — et c’est la part de chacun, plus que la somme, qui commande le choix de la machine.",
  formula: "P totale = P sensible + P latente  ·  P latente ≈ débit d’eau retirée × 2 500 kJ/kg  ·  1 g/s d’eau ≈ 2,5 kW",

  /* Manipuler — une action précise, avec des valeurs concrètes. */
  consigne: "Place l’air du local à 26 °C et 65 % d’humidité relative, puis note le point de rosée affiché. Fais descendre l’humidité relative à 50 % sans toucher à la température : le point de rosée tombe de plusieurs degrés. Ce que tu viens de simuler, c’est de l’eau retirée du local. Remonte enfin la température à 30 °C en laissant les 50 % en place, et regarde le point de rosée repartir vers le haut.",
  lecture: "Le point de rosée affiché est la trace de l’eau réellement présente : il tombe dès qu’on retire de la vapeur, et il ne dit rien de ce que l’air pourrait porter. C’est aussi la température qu’il faut franchir pour déshumidifier. Compare-le à la température de la batterie froide de l’installation : si la batterie reste au-dessus, elle refroidit sans assécher, et la charge latente n’est pas traitée.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "Le simulateur donne un point de rosée, il ne chiffre pas une puissance latente. Pour la chiffrer, il faut la teneur en eau de l’air avant et après traitement, lue sur un diagramme de l’air humide ou dans une table : deux humidités relatives ne se soustraient pas. Les apports par personne et par usage viennent des données du projet. Enfin, une machine ne traite pas le sensible et le latent dans la proportion qu’on souhaite, mais dans celle dont elle est capable à ses conditions de fonctionnement.",

  activity: {"kind":"humidity","temperature":26,"rh":65},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "Deux volumes d’air, à deux températures différentes, avec exactement la même vapeur d’eau à l’intérieur. C’est le nombre de points qui compte ici, et il ne change pas. Chauffer n’en retire aucun, refroidir non plus. Cette eau ne s’en va pas toute seule : elle reste dans l’air tant qu’on ne l’a pas condensée quelque part. Et la conséquence est très concrète. Une climatisation qui se contenterait de rafraîchir laisserait le local moite, avec un thermomètre parfaitement dans la cible. L’occupant se plaindrait, et il aurait raison. C’est exactement ce que la charge latente vient chiffrer.",

    comprendre: "La station Apport sensible chiffrait la chaleur qui change la température. Il en existe une deuxième, qui ne la change pas du tout : celle qu’il faut retirer pour transformer la vapeur en eau liquide. On la dit latente, c’est-à-dire cachée, parce que le thermomètre ne la voit pas. Elle se paie quand même. Dans un local, cette eau vient de quatre endroits : les gens, qui respirent et transpirent, les usages comme la cuisson ou les douches, certaines machines, et l’air neuf qui entre avec l’humidité du dehors. Et voici la surprise du calcul. Condenser un seul gramme de vapeur demande environ deux mille cinq cents joules, alors qu’il en faut à peine plus de mille pour réchauffer un kilogramme d’air d’un degré. Un gramme d’eau contre un kilogramme d’air : l’eau pèse très lourd dans un bilan. Une salle qui produit un litre d’eau par heure demande près de sept cents watts rien que pour l’assécher, avant même d’avoir refroidi quoi que ce soit.",

    manipuler: "À vous de manœuvrer. Le premier curseur donne la température de l’air, le second son humidité relative. Placez le local à vingt-six degrés avec soixante-cinq pour cent, et gardez en tête la valeur qui s’affiche en dessous. Faites ensuite descendre l’humidité relative jusqu’à cinquante pour cent, sans toucher à la température. Le point de rosée tombe de plusieurs degrés. Ce que vous venez de simuler, c’est de l’eau retirée du local, et c’est précisément ce que la charge latente paie. Remontez pour finir la température, en laissant l’humidité relative où elle est, et vous verrez le point de rosée repartir vers le haut.",

    verifier: "Deux questions, sans note, pour voir si la distinction est passée. Le thermomètre ne dit qu’une moitié de l’histoire : un local peut être à la bonne température et rester désagréable, parce que l’eau y est toujours. Et une machine ne traite pas la température et l’humidité dans la proportion qu’on voudrait. Elle traite celle dont elle est capable, à ses conditions de fonctionnement. C’est pour cela qu’on regarde la part du sensible et celle du latent avant de choisir, et jamais la seule somme des deux."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Une charge latente correspond…","à la vapeur d’eau à retirer",["à la chaleur des équipements","au rayonnement du soleil","à la vapeur d’eau à retirer"]],
    ["La puissance totale à traiter vaut…","le sensible plus le latent",["le sensible plus le latent","le sensible moins le latent","le latent seul, en climatisation"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Justifier la part d’humidité à retirer d’un local, et l’écart entre la puissance totale et la seule puissance sensible.",
    acquis: {
      cap: ["Relie la présence de personnes à de la vapeur d’eau dans le local", "Constate qu’un local peut être frais et rester humide", "Repère les usages d’un local qui produisent de l’eau"],
      bac: ["Distingue une charge sensible d’une charge latente", "Additionne les deux pour obtenir la puissance totale", "Explique pourquoi une surface doit être plus froide que le point de rosée pour assécher"],
      bts: ["Chiffre une charge latente à partir d’un débit d’eau à retirer", "Compare la part du sensible entre un bureau et un local à forte occupation", "Refuse de soustraire deux humidités relatives pour chiffrer une quantité d’eau"]
    },
    sources: ["inerWeb Aéraulique v5 — bilans thermiques et traitement d’air"],
    correspondances: [
      {reseau: "AéroRézo", station: "L’humidité relative", pourquoi: "la grandeur y est posée : elle devient ici une puissance à fournir"},
      {reseau: "AéroRézo", station: "Point de rosée et air humide", pourquoi: "la température sous laquelle il faut descendre pour retirer cette eau"}
    ]
  }
});

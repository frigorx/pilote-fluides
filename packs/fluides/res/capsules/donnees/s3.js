/* Capsule s3 — « La flamme interdite — décomposition du fluide » (Sécurité · code 11.03).
   Contenu repris SANS AJOUT de la fiche s3 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "s3",
  fiche: "s3",
  titre: "La flamme interdite — décomposition du fluide",
  surtitre: "HABILITATION FLUIDES · SÉCURITÉ · CODE 11.03",
  duree: "environ 6 minutes",
  intro: "Une flamme, un fluide qu'on croit absent, un visage penché sur le brasage. Le fluide ne brûle pas comme un carburant : il se décompose, et ça se respire.",
  codes: [
    { code: "11.03", libelle: "Connaître les règles de sécurité des fluides inflammables, toxiques ou à pression plus élevée." },
  ],

  visuelAccueil: {
    motif: "flux",
    titre: "Ce qui se passe quand une flamme touche le fluide",
    boites: [
      { picto: "🧊", titre: "Le fluide", texte: "stable à température normale" },
      { picto: "🔥", titre: "La flamme", texte: "il ne brûle pas : il se décompose", teinte: "danger" },
      { picto: "☠", titre: "Le résultat", texte: "des gaz toxiques et corrosifs, absents du fluide d'origine", teinte: "danger" },
    ],
  },

  ecrans: [
    {
      id: "petite-quantite",
      titre: "« Une petite quantité, ça ne changera rien »",
      note: "La situation",
      visuel: { svg: "secu-flamme.svg", alt: "À gauche le geste interdit : chauffer un tronçon non récupéré, les gaz toxiques remontent vers le visage penché. À droite le geste juste : récupérer, balayer à l'azote, ventiler." },
      legende: "À gauche, le geste interdit. À droite, le geste juste.",
      texte: "<p>Le cas type : un tronçon où il reste « une petite quantité, ça ne changera rien ». La flamme touche ce fluide résiduel, il se décompose, et les fumées se dégagent juste sous le visage penché sur le brasage.</p>",
      dire: "Voici comment ça arrive le plus souvent. Un tronçon de circuit où il reste, pense-t-on, une petite quantité de fluide : « ça ne changera rien ». La flamme du chalumeau touche ce fluide résiduel. Il se décompose, et les fumées se dégagent juste sous le visage penché sur le brasage, à bout portant.",
      reference: "Code 11.03 · la situation",
    },

    {
      id: "decomposition",
      titre: "Il ne brûle pas : il se décompose",
      note: "Le mécanisme",
      visuel: {
        motif: "flux",
        titre: "Ce que fait une flamme sur le fluide",
        boites: [
          { picto: "🧊", titre: "Le fluide", texte: "stable à température normale" },
          { picto: "🔥", titre: "La flamme", texte: "il ne brûle pas comme un carburant : il se décompose", teinte: "danger" },
          { picto: "☠", titre: "De nouvelles substances", texte: "la molécule se casse, des gaz toxiques et corrosifs apparaissent", teinte: "danger" },
        ],
        pied: "Ces gaz sont absents du fluide d'origine : ils naissent au contact de la flamme.",
      },
      texte: "<p>Un fluide frigorigène fluoré est stable à température normale. Il ne l'est plus face à une flamme. Chauffé au contact d'une flamme ou d'une surface très chaude, il ne brûle pas comme un carburant : il se <b>décompose</b>.</p><p>Sa molécule se casse et forme d'autres substances, absentes du fluide d'origine — des gaz toxiques et corrosifs.</p>",
      dire: "Comprenons ce qui se passe vraiment. Un fluide frigorigène fluoré est stable à température normale. Il ne l'est plus face à une flamme. Chauffé au contact d'une flamme ou d'une surface très chaude, il ne brûle pas comme un carburant : il se décompose. Sa molécule se casse et forme d'autres substances, complètement absentes du fluide d'origine : des gaz toxiques et corrosifs.",
      reference: "Code 11.03 · le mécanisme",
    },

    {
      id: "fluides-inflammables",
      titre: "Certains fluides s'enflamment eux-mêmes",
      note: "Un risque en plus",
      visuel: {
        motif: "duo",
        titre: "Deux niveaux de risque face à la flamme",
        cartes: [
          { titre: "TOUS LES FLUIDES FLUORÉS", picto: "☠", pour: "Dans tous les cas", texte: "la décomposition produit des gaz toxiques et corrosifs" },
          { titre: "CLASSE A 2 L OU A 3", picto: "🔥", pour: "Un risque en plus", texte: "le fluide lui-même peut s'enflammer au contact d'une flamme ou d'une étincelle" },
        ],
        lien: "+",
        pied: "La classe du fluide utilisé se lit sur sa FDS.",
      },
      texte: "<p>Certains fluides ajoutent un second risque. Selon la norme NF EN 378, les fluides classés <b>A2L</b> (légèrement inflammables, comme le R-32 ou le R-1234yf) ou <b>A3</b> (très inflammables, comme le R-290 ou le R-600a) peuvent eux-mêmes s'enflammer au contact d'une flamme ou d'une étincelle.</p><p>La classe du fluide utilisé se lit sur sa <b>FDS</b> (fiche de données de sécurité).</p>",
      dire: "Pour certains fluides, un second risque s'ajoute à la décomposition. Selon la norme N F EN 378, les fluides classés A 2 L, légèrement inflammables — c'est le cas du R 32 ou du R 1234 y f — ou classés A 3, très inflammables — c'est le cas du R 290 ou du R 600 a —, peuvent eux-mêmes s'enflammer au contact d'une flamme ou d'une étincelle. La classe du fluide que vous utilisez se lit sur sa fiche de données de sécurité.",
      retenir: ["Certains fluides, classés A 2 L ou A 3, peuvent en plus s'enflammer eux-mêmes : leur classe se lit sur la FDS."],
      reference: "Code 11.03 · les fluides inflammables",
      controle: {
        enonce: "Où trouve-t-on la classe d'inflammabilité (A2L, A3...) du fluide utilisé sur un chantier ?",
        choix: [
          "Sur sa FDS, la fiche de données de sécurité du fluide",
          "Elle est la même pour tous les fluides frigorigènes",
          "Elle se devine à la couleur de la bouteille",
          "Elle n'est indiquée nulle part, il faut la connaître par cœur",
        ],
        bonne: 0,
        explication: "La classe du fluide, selon la norme NF EN 378, se lit sur sa fiche de données de sécurité (FDS). Elle n'est ni universelle, ni devinable : elle se vérifie, comme toute autre propriété du fluide utilisé.",
      },
    },

    {
      id: "les-bons-gestes",
      titre: "Ce qu'on fait avant de chauffer",
      note: "Le protocole",
      visuel: {
        motif: "checklist",
        titre: "Avant et pendant le brasage",
        items: [
          { titre: "Récupérer entièrement le fluide", texte: "du tronçon à chauffer, avant toute opération de brasage" },
          { titre: "Ne jamais chercher une fuite à la flamme", texte: "utiliser un détecteur électronique", refus: true },
          { titre: "Balayer à l'azote", texte: "faire circuler de l'azote dans le tube pendant le brasage, avec un mano-détendeur" },
          { titre: "Ventiler la zone", texte: "et ne pas rester penché directement au-dessus de la flamme" },
        ],
      },
      texte: "<p><b>Récupérez</b> entièrement le fluide du tronçon à chauffer avant toute opération de brasage : jamais de brasage sur un circuit encore chargé. Ne recherchez <b>jamais une fuite avec une flamme</b> : utilisez un détecteur électronique.</p><p>Faites circuler de l'azote à l'intérieur du tube pendant le brasage, avec un mano-détendeur : c'est le <b>balayage</b>. <b>Ventilez</b> la zone de travail, et ne restez pas penché directement au-dessus de la flamme.</p>",
      dire: "Voici les gestes qui protègent, avant et pendant le brasage. D'abord, récupérez entièrement le fluide du tronçon à chauffer : jamais de brasage sur un circuit encore chargé. Ensuite, ne recherchez jamais une fuite avec une flamme : utilisez un détecteur électronique, c'est aujourd'hui la seule méthode admise. Pendant le brasage, faites circuler de l'azote à l'intérieur du tube, avec un mano-détendeur : c'est ce qu'on appelle le balayage. Et ventilez la zone de travail : ne restez pas penché directement au-dessus de la flamme.",
      retenir: ["On ne recherche jamais une fuite avec une flamme : un détecteur électronique, toujours."],
      reference: "Code 11.03 · les gestes qui protègent",
      controle: {
        enonce: "Vous devez braser un raccord sur un tronçon de circuit. Quel geste est indispensable avant de chauffer ?",
        choix: [
          "Vérifier à l'odeur que le fluide s'est évaporé.",
          "Rechercher une éventuelle fuite avec la flamme du chalumeau.",
          "Augmenter la pression du circuit pour aller plus vite.",
          "Récupérer le fluide du tronçon, puis balayer à l'azote pendant le brasage.",
        ],
        bonne: 3,
        explication: "Un fluide chauffé par une flamme se décompose en gaz toxiques, qu'il soit inflammable ou non. Il faut le récupérer avant de braser, jamais le rechercher à la flamme, ni compter sur l'odeur. Le balayage à l'azote protège le tube et l'air respiré.",
      },
    },

    {
      id: "fumees-deja-la",
      titre: "Et si les fumées sont déjà là ?",
      note: "Un autre scénario",
      visuel: { svg: "secu-decomposition-ari.svg", alt: "Animation : sans protection, on reste dans les fumées et on tousse. La bonne réponse : s'éloigner, alerter, et ne laisser approcher qu'une personne formée portant un appareil respiratoire isolant (ARI) complet." },
      legende: "Sans protection, on tousse dans les fumées. La bonne réponse : s'éloigner et alerter.",
      texte: "<p>Et si des fumées de décomposition sont déjà présentes — une fuite qui a rencontré une source chaude avant votre arrivée, par exemple ? La réponse n'est plus la procédure de brasage, c'est l'<b>éloignement</b>.</p><p>Un masque à cartouche ou un simple masque filtrant ne protège <b>ni</b> des gaz de décomposition <b>ni</b> d'un manque d'oxygène : seul un <b>appareil respiratoire isolant</b> (ARI), réservé à des personnes formées, le permet.</p>",
      dire: "Un scénario différent, à connaître aussi. Si des fumées de décomposition sont déjà présentes — une fuite qui a rencontré une source chaude avant votre arrivée, par exemple — la réponse n'est plus la procédure de brasage, c'est l'éloignement. Un masque à cartouche, ou un simple masque filtrant, ne protège ni des gaz de décomposition ni d'un manque d'oxygène. Seul un appareil respiratoire isolant, un A R I, avec sa propre réserve d'air, le permet. Et son usage est réservé à des personnes formées. Retenez la règle : l'A R I protège l'intervenant formé, il ne remplace jamais l'éloignement de la source ni l'évacuation de la zone.",
      reference: "Code 11.03 · si les fumées sont déjà présentes",
    },

    {
      id: "final",
      titre: "Le geste interdit, en une image",
      note: "À emporter",
      visuel: {
        motif: "sequence",
        titre: "Avant de chauffer, dans l'ordre",
        etapes: [
          { titre: "Récupérer", texte: "vérifier l'absence de fluide dans le tronçon à chauffer" },
          { titre: "Jamais à la flamme", texte: "une fuite se cherche avec un détecteur électronique, jamais avec une flamme", danger: true },
          { titre: "Si des fumées sont déjà là", texte: "on s'éloigne, on alerte ; seul un ARI et une personne formée s'approchent", danger: true },
        ],
        pied: "Chauffer un tronçon non vérifié, c'est respirer des gaz toxiques à bout portant.",
      },
      texte: "<p>Chauffer ou braser un tronçon de circuit sans avoir récupéré et vérifié l'absence de fluide, ou rechercher une fuite avec une flamme, est le geste interdit.</p><p>Conséquence : dégagement de gaz toxiques et corrosifs, inhalés à bout portant. Risque d'incendie en plus, si le fluide est inflammable (classe A2L ou A3).</p>",
      dire: "Pour finir, un seul réflexe à retenir avant toute flamme sur un circuit. Le tronçon est-il vraiment vide de fluide ? On le vérifie, on ne le suppose jamais. On ne cherche jamais une fuite avec une flamme. Et si des fumées de décomposition sont déjà présentes, on s'éloigne et on alerte, sans jouer les héros sans protection.",
      piege: "<p>Chauffer ou braser un tronçon de circuit sans avoir récupéré et vérifié l'absence de fluide, ou rechercher une fuite avec une flamme.</p><p>Conséquence : dégagement de gaz toxiques et corrosifs, inhalés à bout portant. Risque d'incendie en plus, si le fluide est inflammable (classe A2L ou A3). Interdit aussi : entrer dans des fumées déjà présentes sans protection respiratoire isolante, ou croire qu'un masque à cartouche suffit.</p>",
      reference: "Code 11.03 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur la fiche suivante : ce qui éclate, la pression.",
});

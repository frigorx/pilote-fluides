/* Capsule cl2 — « Explosif avant d'être perceptible — la LIE » (codes 12.02 · 12.04).
   Contenu repris SANS AJOUT de la fiche cl2 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "cl2",
  fiche: "cl2",
  titre: "Explosif avant d'être perceptible — la LIE",
  surtitre: "HABILITATION FLUIDES · CLASSIFICATION · CODES 12.02 · 12.04",
  duree: "environ 7 minutes",
  intro: "Un gaz inflammable qui ne prévient de rien, et un appareil qui ne donne pas une quantité mais une marge restante : deux idées qui évitent l'accident. La suite explique comment les reconnaître, geste par geste.",
  codes: [
    { code: "12.02", libelle: "Connaître le matériel de sécurité obligatoire : détection de gaz, détection des fuites, ventilation, équipements de protection individuelle." },
    { code: "12.04", libelle: "Réaliser une analyse des risques avant de commencer le travail, et supprimer ou identifier les sources de danger." },
  ],

  visuelAccueil: {
    motif: "jauge",
    titre: "Entre deux bornes, le gaz s'enflamme",
    seuils: [
      { part: .32, titre: "LIE", texte: "en dessous, trop peu de gaz pour brûler" },
      { part: .76, titre: "LSE", texte: "au-dessus, plus assez d'air pour brûler" },
    ],
    niveau: .5,
    bas: "trop pauvre",
    hautLibelle: "trop riche",
    teinte: "danger",
  },

  ecrans: [
    {
      id: "rien-ne-previent",
      titre: "Une fuite qu'on ne sent pas",
      note: "Le point de départ",
      visuel: {
        motif: "alerte",
        titre: "Comment ça arrive vraiment",
        vignettes: [
          { picto: "💨", etiquette: "ce qui arrive", titre: "Une fuite de R-290", texte: "dans un local technique fermé, peu ventilé" },
          { picto: "👃", etiquette: "ce que vous percevez", titre: "Rien", texte: "pas d'odeur, pas de bruit, rien ne se voit" },
          { picto: "🔍", etiquette: "ce qu'il faut faire", titre: "Contrôler avant tout geste", texte: "à l'explosimètre, avant d'actionner quoi que ce soit" },
        ],
        pied: "Sans ce contrôle, l'étincelle d'un interrupteur suffit.",
      },
      texte: "<p>Une petite fuite sur une unité au R-290, dans un local fermé et peu ventilé. Rien ne se voit, rien ne se sent : le gaz s'accumule près du sol.</p><p>Un technicien entre, actionne l'interrupteur, branche une lampe ou pose un outil électroportatif. <b>L'étincelle du contact suffit.</b> Il n'y avait aucun signe avant-coureur.</p>",
      dire: "Commençons par une scène réelle. Une petite fuite sur une unité au R-290, dans un local technique fermé et peu ventilé. Rien ne se voit, rien ne se sent. Le gaz, plus lourd que l'air, s'accumule lentement près du sol. Un technicien entre, actionne l'interrupteur d'éclairage, branche une lampe baladeuse, ou pose un outil électroportatif sur le sol. L'étincelle du contact suffit. Il n'y avait aucun signe avant-coureur, et l'inflammation ne laisse pas le temps de reculer.",
      reference: "Code 12.04 · analyser le risque avant de commencer",
    },

    {
      id: "deux-bornes",
      titre: "Entre deux bornes, ça s'enflamme",
      note: "LIE et LSE",
      visuel: {
        motif: "jauge",
        titre: "L'échelle des concentrations",
        seuils: [
          { part: .32, titre: "LIE", texte: "en dessous, le mélange est trop pauvre" },
          { part: .76, titre: "LSE", texte: "au-dessus, il est trop riche" },
        ],
        niveau: .5,
        bas: "trop pauvre",
        hautLibelle: "trop riche",
        teinte: "danger",
      },
      texte: "<p>Un gaz inflammable ne s'enflamme qu'entre deux bornes. La <b>LIE</b> — limite inférieure d'explosivité — est la concentration en dessous de laquelle rien ne se passe. La <b>LSE</b> — limite supérieure — est celle au-dessus de laquelle ça ne s'enflamme plus non plus.</p><p><b>Entre les deux</b> : une étincelle suffit, et ça brûle d'un coup, dans tout le volume.</p>",
      dire: "Un gaz inflammable ne s'enflamme pas à n'importe quelle concentration dans l'air. En dessous d'un certain seuil, le mélange est trop pauvre en gaz : une étincelle ne déclenche rien. Au-dessus d'un autre seuil, il est trop riche : il n'y a plus assez d'oxygène. Ces deux bornes ont un nom. La L I E, la limite inférieure d'explosivité, c'est la concentration en dessous de laquelle le mélange ne s'enflamme pas. La L S E, la limite supérieure, c'est celle au-dessus de laquelle il ne s'enflamme plus non plus. Entre les deux, c'est le domaine d'explosivité : le mélange s'enflamme d'un coup, dans tout le volume.",
      retenir: ["Entre la <b>LIE</b> et la <b>LSE</b> : le mélange peut s'enflammer d'un coup.", "Ces deux bornes sont <b>propres à chaque fluide</b> : elles se lisent sur sa FDS, jamais de mémoire."],
      reference: "Code 12.04 · le domaine d'explosivité",
    },

    {
      id: "pas-d-odeur",
      titre: "Le nez ne vous avertira pas",
      note: "Le piège du propane pur",
      visuel: {
        motif: "duo",
        titre: "Deux gaz, un seul a une odeur",
        cartes: [
          { titre: "LE GAZ DE CUISINE", picto: "👃", pour: "vous le sentez", texte: "un odorisant y est ajouté exprès, pour être détecté" },
          { titre: "LE R-290 DU FROID", picto: "✗", pour: "vous ne le sentez pas", texte: "c'est un propane de haute pureté, sans odorisant" },
        ],
        lien: "≠",
        pied: "Le réflexe qui marche à la cuisine ne marche pas dans un local technique.",
      },
      texte: "<p>Le gaz domestique que l'on sent dans une cuisine contient un <b>odorisant ajouté volontairement</b>. Le <b>R-290 utilisé en froid est un propane de haute pureté</b> : cet odorisant n'y est pas.</p><p>Et même quand une odeur existe, elle ne dit rien sur la distance à la LIE.</p>",
      dire: "Pourquoi ce danger est-il particulier ? Parce qu'il n'y a pas de signal. Le gaz domestique que l'on sent dans une cuisine contient un odorisant ajouté volontairement, pour être détecté par le nez. Le R-290 utilisé en froid est un propane de haute pureté : cet odorisant n'y est pas. Le nez ne vous avertira pas. Et retenez ceci, même le jour où une odeur existe : le seuil de perception d'une odeur n'a aucun rapport avec la L I E. Sentir quelque chose ne dit pas si l'on est loin ou près du danger.",
      reference: "Code 12.02 · un danger sans signal",
    },

    {
      id: "explosimetre",
      titre: "Ce que mesure l'explosimètre",
      note: "Une marge, pas une quantité",
      visuel: { svg: "lie-domaine.svg", alt: "L'axe des concentrations : trop pauvre, puis le domaine d'explosivité entre LIE et LSE, puis trop riche. L'explosimètre affiche un pourcentage de la LIE, c'est-à-dire la marge restante." },
      legende: "L'explosimètre n'affiche pas une quantité de gaz : il affiche la marge qui reste avant le domaine d'explosivité.",
      texte: "<p>L'appareil qui répond à cette question s'appelle un <b>explosimètre</b>. Il affiche <b>un pourcentage de la LIE</b> du gaz recherché : une mesure de <b>marge restante</b>.</p><p>Une valeur de 10 % LIE signifie que l'atmosphère contient un dixième de la concentration à partir de laquelle elle deviendrait inflammable.</p>",
      dire: "L'appareil qui répond à cette question s'appelle un explosimètre. Il ne mesure pas une quantité de gaz dans l'absolu : il affiche un pourcentage de la L I E du gaz recherché. Une valeur de dix pour cent L I E signifie que l'atmosphère contient un dixième de la concentration à partir de laquelle elle deviendrait inflammable. C'est une mesure de marge restante, et c'est ce qui la rend utilisable : l'alarme se déclenche bien avant que le mélange ne devienne explosif.",
      reference: "Code 12.02 · lire l'appareil",
      controle: {
        enonce: "Un explosimètre affiche « 10 % LIE » dans un local où une fuite de R-290 est suspectée. Qu'est-ce que cela signifie ?",
        choix: [
          "Que 10 % du local est rempli de gaz.",
          "Que l'atmosphère contient un dixième de la concentration à partir de laquelle elle deviendrait inflammable.",
          "Que le mélange est déjà explosif à 10 %.",
          "Que l'appareil est déréglé, car il devrait afficher une pression.",
        ],
        bonne: 1,
        explication: "Un explosimètre n'affiche pas une quantité de gaz, mais un pourcentage de la limite inférieure d'explosivité du gaz recherché : il indique la marge qui reste avant que l'atmosphère ne devienne inflammable. L'appareil doit être réglé pour le gaz concerné, et la LIE de ce gaz se lit sur sa fiche de données de sécurité.",
      },
    },

    {
      id: "trois-appareils",
      titre: "Trois appareils, trois questions",
      note: "Ne pas les confondre",
      visuel: {
        motif: "checklist",
        titre: "Chacun répond à une question différente",
        items: [
          { titre: "Explosimètre", texte: "réglé pour un gaz donné, affiche le risque d'explosion" },
          { titre: "Détecteur de fuite frigorigène", texte: "repère la présence du fluide" },
          { titre: "Détecteur d'oxygène", texte: "mesure l'air respirable" },
        ],
        pied: "Un appareil réglé pour un gaz et utilisé pour un autre affiche un chiffre faux.",
      },
      texte: "<p>Un explosimètre <b>se règle pour un gaz donné</b>. Et il ne remplace ni un détecteur de fuite de fluide frigorigène, ni un détecteur d'oxygène : ce sont <b>trois appareils différents</b>, qui répondent à trois questions différentes.</p>",
      dire: "Un point à ne jamais confondre. Un explosimètre se règle pour un gaz donné : un appareil réglé pour un gaz et utilisé pour un autre affiche un chiffre faux. Et il ne remplace ni un détecteur de fuite de fluide frigorigène, ni un détecteur d'oxygène. Ce sont trois appareils différents, qui répondent à trois questions différentes : est-ce que ça peut exploser, est-ce que le fluide fuit, est-ce que je peux respirer.",
      reference: "Code 12.02 · le bon appareil pour la bonne question",
      controle: {
        enonce: "Un explosimètre réglé pour un gaz est utilisé dans un local où c'est un autre gaz qui a fui. Que se passe-t-il ?",
        choix: [
          "Rien, un explosimètre détecte n'importe quel gaz inflammable de la même façon.",
          "Il affiche un chiffre faux : il doit être réglé pour le gaz recherché.",
          "Il se met automatiquement en sécurité et refuse d'afficher une valeur.",
          "Il mesure alors le taux d'oxygène à la place.",
        ],
        bonne: 1,
        explication: "Un explosimètre se règle pour un gaz donné. Utilisé pour un autre gaz que celui prévu, il affiche un chiffre faux — ce n'est ni un détecteur de fuite frigorigène, ni un détecteur d'oxygène, et il ne se substitue à aucun des deux.",
      },
    },

    {
      id: "atex",
      titre: "ATEX : une zone où le matériel compte",
      note: "Étincelle et surface chaude",
      visuel: { svg: "charge-limite-local.svg", alt: "Trois locaux de volumes croissants, la même fuite dans chacun : dans le petit local la concentration entre dans le domaine explosif, dans le grand elle reste diluée sous le seuil." },
      legende: "La même fuite n'a pas le même effet selon le volume du local : c'est pour cela que chaque installation fait l'objet d'une étude propre.",
      texte: "<p><b>ATEX</b> vient de « <b>AT</b>mosphère <b>EX</b>plosive ». Dans une zone qui peut contenir une telle atmosphère, seul le matériel conçu pour ne pas l'enflammer est admis — <b>ni par une étincelle, ni par une surface trop chaude</b>. Cela vaut aussi pour ce que le technicien apporte avec lui.</p>",
      dire: "Dernier point avant le réflexe à emporter : le mot A T E X. Il vient de atmosphère explosive. Lorsqu'un local peut contenir une atmosphère explosive, il fait l'objet d'un zonage : on délimite les zones où ce risque existe, et on n'y admet que du matériel conçu pour ne pas enflammer l'atmosphère. Ni par une étincelle, ni par une surface trop chaude — une surface chaude suffit à allumer un mélange sans la moindre flamme. Cela vaut aussi pour ce que vous apportez avec vous : outil électroportatif, lampe, téléphone. Le zonage relève d'une étude propre à l'installation ; vous, vous devez savoir reconnaître que vous entrez dans une telle zone et respecter ce qui y est affiché.",
      retenir: ["<b>ATEX</b> : dans une zone à atmosphère explosive, seul le matériel <b>prévu pour ces zones</b> peut entrer.", "Une simple <b>surface chaude</b> peut suffire à enflammer, même sans flamme ni étincelle."],
      reference: "Code 12.04 · reconnaître la zone",
    },

    {
      id: "reflexe",
      titre: "Le réflexe avant d'entrer",
      note: "À emporter",
      visuel: {
        motif: "sequence",
        titre: "Avant tout geste dans un local suspect",
        etapes: [
          { titre: "Je soupçonne une fuite", texte: "local fermé, peu ventilé" },
          { titre: "Je contrôle à l'explosimètre", texte: "réglé pour le bon gaz" },
          { titre: "Je n'actionne rien", texte: "pas d'interrupteur, pas d'outil, pas de lampe", danger: true },
        ],
        pied: "Le nez ne sert à rien ici : c'est l'appareil qui décide.",
      },
      texte: "<p>Face à un local où une fuite de gaz inflammable est possible : on contrôle à l'explosimètre <b>avant</b> tout geste. On n'actionne rien avant d'avoir la réponse de l'appareil.</p>",
      dire: "Retenons le geste qui protège. Devant un local où une fuite de gaz inflammable est possible, on contrôle l'atmosphère à l'explosimètre avant tout geste : avant d'actionner un interrupteur, avant de brancher une lampe, avant de poser un outil. Le nez ne sert à rien ici, c'est l'appareil qui décide.",
      piege: "<p>Entrer dans un local où une fuite de fluide inflammable est possible et y <b>actionner un interrupteur, brancher une lampe ou utiliser un outil électroportatif</b>, sans avoir contrôlé l'atmosphère à l'explosimètre.</p><p>Se fier à son odorat en est la variante la plus courante : le R-290 utilisé en froid ne contient pas l'odorisant du gaz domestique, et aucune odeur ne renseigne sur la distance à la LIE.</p>",
      reference: "Code 12.04 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour le détail, ou enchaîner sur le CO₂ : un fluide qui entre aujourd'hui dans le parc, et qui tue autrement.",
});

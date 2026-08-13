/* Capsule cl4 — « Se protéger du CO₂ — détection, EPC et EPI »
   (codes 12.02 · 13.14). Contenu repris SANS AJOUT de la fiche cl4 de
   cartes.js : découpé pour l'oral, mis en animation. Aucune valeur
   chiffrée nouvelle — les seuils ppm ne sont jamais donnés, comme dans
   la fiche source. */
CAPSULE.declarer({
  id: "cl4",
  fiche: "cl4",
  titre: "Se protéger du CO₂ — détection, EPC et EPI",
  surtitre: "HABILITATION FLUIDES · CLASSIFICATION · CODES 12.02 · 13.14",
  duree: "environ 8 minutes",
  intro: "Un local CO₂ bien équipé se reconnaît avant même d'y entrer. Cette capsule explique, dans l'ordre, ce qui protège tout le monde, ce qui protège vous seul — et ce qui, malgré les apparences, ne protège de rien.",
  codes: [
    { code: "12.02", libelle: "Connaître le matériel de sécurité obligatoire : détection de gaz, détection des fuites, ventilation, équipements de protection individuelle." },
    { code: "13.14", libelle: "Vérifier la sécurité du site : signalisation, issues de secours, capteurs et alarmes gaz." },
  ],

  visuelAccueil: {
    motif: "flux",
    titre: "La chaîne de protection",
    boites: [
      { picto: "🔍", titre: "Détecter", texte: "un capteur fixe, en partie basse" },
      { picto: "🏠", titre: "Protéger tous", texte: "alarmes, ventilation : l'EPC" },
      { picto: "🧤", titre: "Se protéger soi", texte: "gants, lunettes : l'EPI, et ses limites" },
    ],
    pied: "La protection, c'est d'abord ce qui protège tout le monde.",
  },

  ecrans: [
    {
      id: "le-local-equipe",
      titre: "Ce qui doit déjà être en place",
      note: "Avant de commencer",
      visuel: {
        motif: "checklist",
        titre: "Le contrôle en arrivant sur site",
        items: [
          { titre: "Signalisation", texte: "visible et à jour, à l'entrée du local" },
          { titre: "Issues de secours", texte: "dégagées, jamais encombrées" },
          { titre: "Capteurs et alarmes", texte: "présents ET en état de marche" },
        ],
        pied: "Ces trois points se contrôlent en arrivant, avant de commencer.",
      },
      texte: "<p>Vous arrivez sur un site avec une installation au CO₂. Avant de commencer : la <b>signalisation</b> à l'entrée, les <b>issues de secours</b> dégagées, les <b>capteurs et alarmes</b> en état de marche.</p>",
      dire: "Vous arrivez sur un site abritant une installation au CO2. Avant de commencer quoi que ce soit, un contrôle rapide s'impose. La signalisation à l'entrée du local doit être visible et à jour : elle prévient celui qui entre de ce qui l'attend. Les issues de secours doivent rester dégagées : une palette posée devant une porte de chambre froide n'est pas un défaut de rangement, c'est une issue en moins. Et on contrôle que les capteurs et les alarmes sont en état de marche, pas seulement présents au mur.",
      reference: "Code 13.14 · le contrôle d'arrivée",
    },

    {
      id: "epc-avant-epi",
      titre: "D'abord le collectif, ensuite l'individuel",
      note: "Un principe général",
      visuel: {
        motif: "duo",
        titre: "Deux protections, un seul ordre",
        cartes: [
          { titre: "LA PROTECTION COLLECTIVE", picto: "🏠", pour: "protège tout le monde", texte: "en permanence, sans que personne y pense" },
          { titre: "LA PROTECTION INDIVIDUELLE", picto: "🧍", pour: "protège une seule personne", texte: "et seulement si elle est bien portée" },
        ],
        lien: "→",
        pied: "L'individuel ne remplace jamais le collectif : il vient après.",
      },
      texte: "<p>La règle de la prévention est la même partout : on protège <b>d'abord le collectif</b>, ensuite l'individu. Un équipement de <b>protection collective</b> (EPC) protège tout le monde, en permanence. Un équipement de <b>protection individuelle</b> (EPI) ne protège que celui qui le porte, et seulement s'il le porte correctement.</p>",
      dire: "Ce qui protège, dans l'ordre. La règle générale de la prévention est la même partout : on protège d'abord le collectif, ensuite l'individu. Un équipement de protection collective, on dit E P C, protège tout le monde dans le local, en permanence, sans que personne ait à y penser. Un équipement de protection individuelle, on dit E P I, ne protège que celui qui le porte, et seulement s'il le porte correctement. L'E P I ne remplace jamais l'E P C : il vient après, pour ce que l'E P C ne couvre pas.",
      retenir: ["<b>EPC d'abord, EPI ensuite</b> : le collectif protège tout le monde en permanence, l'individuel ne protège que celui qui le porte.", "L'<b>EPI ne remplace jamais l'EPC</b> : il vient après."],
      reference: "Code 12.02 · l'ordre qui compte",
    },

    {
      id: "detecteur-fixe",
      titre: "Un capteur fixe, placé en bas",
      note: "La détection n'est pas une option",
      visuel: { svg: "co2-protection.svg", alt: "Le local équipé : capteur fixe en partie basse relié aux alarmes intérieure et extérieure, ventilation, signalisation à la porte. À droite, les EPI — et le masque à cartouche, qui ne protège pas du CO₂." },
      legende: "Le capteur se place en partie basse, là où le CO₂ s'accumule : au plafond, il ne verrait rien.",
      texte: "<p>Dans un local CO₂, la <b>détection de gaz est exigée</b> : c'est l'EPC principal. Le détecteur est <b>fixe, à poste</b>, placé <b>en partie basse</b>. Il est associé à des <b>alarmes</b> intérieure <b>et</b> extérieure — celle de dehors prévient <b>avant d'ouvrir la porte</b>.</p>",
      dire: "La détection : ce n'est pas une option. Dans un local abritant une installation au CO2, la détection de gaz est exigée, et c'est l'E P C principal. Sa présence et son état se vérifient à l'arrivée. Le détecteur est fixe, à poste : il mesure en permanence, y compris la nuit et quand personne n'est là. On le place en partie basse, là où le CO2 s'accumule : un capteur au plafond ne verrait rien. Il est associé à des alarmes sonores et visuelles, à l'intérieur et à l'extérieur du local. Celle de l'extérieur a une fonction précise : vous prévenir avant d'ouvrir la porte. Le déclenchement peut aussi commander la ventilation et l'arrêt de l'installation. Un dispositif complet comporte en général deux niveaux : une préalarme, qui avertit, et une alarme d'évacuation, qui ordonne de sortir.",
      reference: "Code 12.02 · le bon emplacement",
    },

    {
      id: "le-ppm",
      titre: "Ce que l'appareil affiche : le ppm",
      note: "Lire, pas deviner",
      visuel: {
        motif: "jauge",
        titre: "Une unité pour les petites proportions",
        seuils: [
          { part: .25, titre: "Ambiance normale", texte: "l'air contient déjà un peu de CO₂" },
          { part: .85, titre: "Seuil réglé sur l'appareil", texte: "propre à chaque site, à vérifier sur place" },
        ],
        niveau: .25,
        bas: "peu de CO₂",
        hautLibelle: "beaucoup de CO₂",
        teinte: "ok",
      },
      texte: "<p>Un détecteur de CO₂ affiche des <b>ppm</b> : une part de gaz pour un million de parts d'air. L'air extérieur en contient déjà <b>naturellement</b> un peu.</p><p>Ce qui compte : l'<b>écart</b> et le <b>franchissement des seuils réglés</b> sur l'appareil — jamais appris par cœur d'un site à l'autre.</p>",
      dire: "Le ppm : savoir lire ce que l'appareil affiche. Un détecteur de CO2 n'affiche ni des grammes ni des bars, mais des P P M, parties par million. Un P P M, c'est une part de gaz pour un million de parts d'air : une unité faite pour de petites proportions. Pour situer l'échelle, l'air extérieur que vous respirez contient déjà naturellement du CO2, de l'ordre de quelques centaines de P P M. Un affichage qui n'est pas à zéro ne signifie donc pas qu'il y a une fuite. Ce qui compte, c'est l'écart avec l'ambiance normale, et le franchissement des seuils réglés sur l'appareil. Ces seuils sont fixés par la réglementation du travail et par la norme applicable au site ; ils figurent dans la documentation de l'appareil et sur la F D S du fluide. Ne les apprenez pas par cœur d'un site à l'autre : vérifiez-les sur l'installation où vous êtes.",
      retenir: ["Un <b>ppm</b>, c'est une part de gaz pour un million de parts d'air.", "Les <b>seuils</b> se lisent sur l'appareil et sa documentation — jamais de mémoire d'un site à l'autre."],
      reference: "Code 12.02 · lire l'appareil",
      controle: {
        enonce: "Le détecteur d'un local CO₂ affiche une valeur qui n'est pas à zéro. Que faut-il en conclure ?",
        choix: [
          "Il y a forcément une fuite en cours.",
          "Rien d'alarmant en soi : l'air normal contient déjà un peu de CO₂ ; ce qui compte, c'est l'écart et le franchissement du seuil réglé.",
          "L'appareil est déréglé et doit être remplacé.",
          "Il faut évacuer immédiatement, quelle que soit la valeur.",
        ],
        bonne: 1,
        explication: "L'air extérieur contient déjà naturellement du CO₂, de l'ordre de quelques centaines de ppm. Un affichage non nul n'indique donc rien d'anormal en soi : ce qui compte, c'est l'écart avec l'ambiance normale et le franchissement des seuils de préalarme et d'évacuation réglés sur l'appareil.",
      },
    },

    {
      id: "capteur-vivant",
      titre: "Un capteur se vérifie",
      note: "Le voyant allumé ne suffit pas",
      visuel: {
        motif: "alerte",
        titre: "Ce qu'un voyant allumé ne garantit pas",
        vignettes: [
          { picto: "⚠", etiquette: "le piège", titre: "Une cellule usée", texte: "continue de s'allumer sans plus rien mesurer" },
          { picto: "👁", etiquette: "ce qu'on voit", titre: "Le voyant reste allumé", texte: "rien ne prévient qu'il a vieilli" },
          { picto: "🔧", etiquette: "le bon réflexe", titre: "Vérifier, remplacer", texte: "selon la documentation du fabricant" },
        ],
        pied: "La présence d'un capteur ne suffit pas : il doit être vérifié et entretenu.",
      },
      texte: "<p>Un capteur de gaz se <b>vérifie</b> et se <b>remplace</b> périodiquement : une cellule vieillit et finit par ne plus rien mesurer <b>tout en restant allumée</b>.</p>",
      dire: "Un détecteur ne vaut que s'il fonctionne. Un capteur de gaz se vérifie et se remplace périodiquement, selon la documentation du fabricant : une cellule vieillit et finit par ne plus rien mesurer tout en restant allumée. À l'arrivée sur site, on contrôle donc que les capteurs et les alarmes sont en état de marche, et pas seulement présents au mur — exactement comme on contrôle un V A T avant de s'en servir.",
      reference: "Code 12.02 · l'entretien du détecteur",
    },

    {
      id: "les-epi-et-leurs-limites",
      titre: "Les EPI, et ce qu'ils ne font pas",
      note: "Gants, lunettes, distance",
      visuel: {
        motif: "flux",
        titre: "Ce que les EPI couvrent vraiment",
        boites: [
          { picto: "🧤", titre: "Gants adaptés au froid", texte: "contre la glace carbonique" },
          { picto: "🥽", titre: "Lunettes ou écran facial", texte: "mis avant l'intervention" },
          { picto: "↔", titre: "Rester hors du jet", texte: "vérifier la pression avant de desserrer" },
        ],
        pied: "Ces EPI protègent du froid et de la pression — pas de l'atmosphère du local.",
      },
      texte: "<p>Contre le froid du CO₂ et la glace carbonique : <b>gants</b> adaptés et <b>lunettes ou écran facial</b>, mis <b>avant</b> l'intervention. Contre la pression : rester hors de la trajectoire d'un jet, et vérifier la pression au manomètre avant de desserrer un raccord.</p>",
      dire: "Les E P I, et surtout leurs limites. Contre le froid du CO2 et la glace carbonique : des gants adaptés au froid, et des lunettes ou un écran facial, mis avant l'intervention et non une fois le geste commencé. Contre la pression : rester hors de la trajectoire d'un jet, et ne jamais desserrer un raccord sans avoir vérifié la pression au manomètre.",
      reference: "Code 12.02 · les équipements individuels",
    },

    {
      id: "le-masque",
      titre: "Le masque à cartouche ne protège pas",
      note: "Le point le plus important",
      visuel: {
        motif: "duo",
        titre: "Une cartouche filtre — elle ne fabrique rien",
        cartes: [
          { titre: "UNE CARTOUCHE", picto: "😷", pour: "filtre certains polluants", texte: "dans un air qui reste par ailleurs respirable" },
          { titre: "LE CO₂ EN LOCAL FERMÉ", picto: "✗", pour: "n'est pas filtrable", texte: "la cartouche ne fabrique pas d'oxygène et ne retient pas le CO₂" },
        ],
        lien: "≠",
        pied: "Pour vous, la protection n'est pas de porter un masque : c'est de ne pas entrer.",
      },
      texte: "<p><b>Un masque à cartouche ne protège pas contre le CO₂, ni contre le manque d'oxygène.</b> Une cartouche filtre certains polluants dans un air qui reste respirable ; elle ne fabrique pas d'oxygène et ne retient pas le CO₂. Seul un appareil <b>isolant</b>, réservé à des équipes formées, protège en atmosphère appauvrie.</p>",
      dire: "Et un point que l'on ne peut pas se permettre d'ignorer. Un masque à cartouche ne protège pas contre le CO2, ni contre le manque d'oxygène. Une cartouche filtre certains polluants dans un air qui reste respirable ; elle ne fabrique pas d'oxygène et ne retient pas le CO2. En atmosphère appauvrie ou chargée en CO2, seul un appareil isolant, qui apporte son propre air, protège — un matériel dont l'usage relève d'équipes formées et entraînées pour cela, pas d'une improvisation de dépannage. Pour vous, la protection n'est pas de porter un masque : c'est de ne pas entrer.",
      retenir: ["Un <b>masque à cartouche ne protège ni du CO₂, ni du manque d'oxygène</b>.", "Seul un appareil <b>isolant</b> protège en atmosphère appauvrie — et son usage revient à des équipes formées."],
      reference: "Code 12.02 · l'erreur qui tue",
      controle: {
        enonce: "Vous devez intervenir dans un local abritant une installation au CO₂. Un masque à cartouche est disponible dans le camion. Que vous apporte-t-il ?",
        choix: [
          "Il protège du CO₂ et permet d'entrer sans autre précaution.",
          "Rien face à ce risque : une cartouche ne retient pas le CO₂ et ne fournit pas d'oxygène. La protection, c'est la détection, la ventilation, et le fait de ne pas entrer.",
          "Il protège à condition de ne rester que quelques minutes.",
          "Il remplace le détecteur fixe du local.",
        ],
        bonne: 1,
        explication: "Un masque à cartouche filtre certains polluants dans un air qui reste respirable : il ne fabrique pas d'oxygène et ne retient pas le CO₂. Seul un appareil isolant, réservé à des équipes formées, protège en atmosphère appauvrie. La protection du technicien repose sur la protection collective — détection fixe en partie basse, alarmes intérieure et extérieure, ventilation — et sur la décision de ne pas entrer.",
      },
    },

    {
      id: "devant-une-personne-au-sol",
      titre: "Devant une personne au sol",
      note: "À emporter",
      visuel: {
        motif: "sequence",
        titre: "La seule conduite qui vaille",
        etapes: [
          { titre: "On alerte", texte: "on donne l'alarme" },
          { titre: "On ventile", texte: "depuis l'extérieur si possible" },
          { titre: "On fait intervenir les secours", texte: "des équipes formées et équipées" },
          { titre: "On ne descend pas", texte: "retenir sa respiration ne protège de rien", danger: true },
        ],
        pied: "Le réflexe respiratoire finit toujours par l'emporter.",
      },
      texte: "<p>Devant une personne au sol : on <b>alerte</b>, on <b>ventile</b>, on fait intervenir les secours — <b>on ne descend pas</b>. Retenir sa respiration ne protège de rien.</p>",
      dire: "Devant une personne au sol. On alerte, on ventile, on fait intervenir les secours — on ne descend pas. Retenir sa respiration ne protège de rien : on ne tient que quelques dizaines de secondes, et le réflexe respiratoire finit toujours par l'emporter, au fond de la fosse.",
      piege: "<p>Entrer dans un local CO₂ en se croyant protégé par un <b>masque à cartouche</b>, ou entrer alors que l'alarme extérieure est déclenchée.</p><p>Interdit aussi : considérer un détecteur comme fiable <b>parce que son voyant est allumé</b>. Une cellule usée continue de s'allumer sans plus rien mesurer : elle se vérifie et se remplace selon la documentation du fabricant.</p>",
      reference: "Code 13.14 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour le détail, ou revenir au module CO₂ et ammoniac pour resituer cette protection dans l'ensemble.",
});

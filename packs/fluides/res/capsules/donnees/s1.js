/* Capsule s1 — « L'air qui manque — l'asphyxie » (Sécurité · codes 12.02 · 12.13).
   Contenu repris SANS AJOUT de la fiche s1 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "s1",
  fiche: "s1",
  titre: "L'air qui manque — l'asphyxie",
  surtitre: "HABILITATION FLUIDES · SÉCURITÉ · CODES 12.02 · 12.13",
  duree: "environ 6 minutes",
  intro: "Un local fermé, une nuit, un gaz qui a pris la place de l'air. Ce risque ne prévient pas — voici pourquoi, et le seul réflexe qui protège.",
  codes: [
    { code: "12.02", libelle: "Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI." },
    { code: "12.13", libelle: "Vérifier la sécurité du site : signalisation, issues de secours, détecteurs et alarmes gaz." },
  ],

  visuelAccueil: {
    motif: "alerte",
    titre: "Un danger qui ne se voit pas, ne s'entend pas, ne se sent pas",
    vignettes: [
      { picto: "💨", etiquette: "ce qui arrive", titre: "L'air s'appauvrit", texte: "l'azote ou le fluide chasse l'oxygène dans un local fermé" },
      { picto: "❓", etiquette: "ce qu'on ressent", titre: "Rien, avant de tomber", texte: "aucune gêne ne prévient" },
      { picto: "✅", etiquette: "ce qu'on fait", titre: "Ventiler et mesurer", texte: "avant d'entrer, jamais seul" },
    ],
  },

  ecrans: [
    {
      id: "double-accident",
      titre: "Une chambre froide, une porte restée fermée",
      note: "La situation",
      visuel: { svg: "s1-double-accident.svg", alt: "Animation : la nappe de gaz monte dans le local fermé, le technicien descend et tombe, puis le collègue descend le secourir et devient la seconde victime. Deux victimes au lieu d'une." },
      texte: "<p>Une fuite de fluide est possible dans une chambre froide restée porte fermée toute une nuit. Un technicien entre. Il ne sent rien d'anormal, alors il ne se méfie pas. Il perd connaissance en quelques instants.</p><p>Un collègue le voit au sol. Il descend le chercher sans se protéger ni ventiler. Il respire le même air appauvri, et s'effondre à son tour. <b>Deux victimes au lieu d'une.</b></p>",
      dire: "Voici le scénario qu'on retrouve le plus souvent dans ce type d'accident. Pendant toute la nuit, la chambre froide est restée close, et un peu de fluide a pu s'en échapper. Au matin, un technicien pousse la porte : rien ne l'alerte, ni odeur ni gêne, et en un instant il s'écroule. Son collègue l'aperçoit à terre et fait ce que tout le monde ferait : il entre pour l'aider, sans protection, sans aérer. Lui aussi inspire cet air trop pauvre en oxygène, et s'écroule. Le premier accident était déjà grave ; c'est le secours improvisé qui en fait deux.",
      reference: "Codes 12.02 · 12.13 · la situation",
    },

    {
      id: "manque-oxygene",
      titre: "Ce n'est pas un poison, c'est un manque d'air",
      note: "Le mécanisme",
      visuel: {
        motif: "flux",
        titre: "Comment l'air d'un local fermé s'appauvrit",
        boites: [
          { picto: "🧯", titre: "Un gaz s'échappe", texte: "de l'azote qui met un circuit en pression, ou du fluide qui a fui" },
          { picto: "💨", titre: "Il prend la place de l'air", texte: "dans un local fermé, l'oxygène recule", teinte: "danger" },
          { picto: "🫁", titre: "Respirer ne suffit plus", texte: "il y a moins d'oxygène à chaque respiration", teinte: "danger" },
        ],
        pied: "Ce n'est pas un produit qui empoisonne : c'est l'air respirable qui a été chassé.",
      },
      texte: "<p>Respirer, c'est faire entrer de l'oxygène dans le corps. Un local fermé peut se remplir d'un autre gaz : de l'azote utilisé pour mettre un circuit en pression, ou du fluide frigorigène qui a fui. Ce gaz prend la place de l'oxygène dans l'air.</p><p>C'est une <b>asphyxie par manque d'oxygène</b> : vous ne respirez plus assez d'oxygène, non pas parce qu'un produit vous empoisonne, mais parce qu'il a chassé l'air respirable.</p>",
      dire: "Le danger, ici, ne vient pas d'un poison. Il vient de ce qui manque. Dans un local fermé, un gaz comme l'azote d'une mise en pression, ou un fluide qui a fui, peut s'accumuler et repousser l'air que vous respirez. Vos poumons continuent de travailler normalement, mais ils ne reçoivent plus assez d'oxygène : c'est une asphyxie par manque d'oxygène. C'est ce qui la rend si traîtresse, car on se méfie mal d'un gaz qui n'empoisonne pas. La suite explique comment s'en rendre compte à temps.",
      reference: "Code 12.02 · le mécanisme",
    },

    {
      id: "aucun-signe",
      titre: "Le corps ne donne aucune alerte",
      note: "Le piège du silence",
      visuel: {
        motif: "alerte",
        titre: "Face à l'azote et aux fluides fluorés, rien ne prévient",
        vignettes: [
          { picto: "🔇", etiquette: "ce qui devrait alerter", titre: "L'envie de respirer plus fort", texte: "normalement, elle vient d'un excès de gaz carbonique dans le sang" },
          { picto: "❌", etiquette: "ce qui manque ici", titre: "Pas de gêne progressive", texte: "un manque d'oxygène, lui, ne donne aucune alerte" },
          { picto: "👃", etiquette: "un faux repère", titre: "Se fier à l'odeur", texte: "l'azote est inodore, la plupart des fluides fluorés aussi" },
        ],
        pied: "Vous pouvez perdre connaissance en quelques instants, sans aucune gêne ressentie avant.",
      },
      texte: "<p>Face à l'<b>azote</b> et aux <b>fluides fluorés</b>, le corps ne donne <b>aucune alerte</b>. Normalement, l'envie de respirer plus fort vient d'un excès de gaz carbonique dans le sang, pas d'un manque d'oxygène.</p><p>Dans un local pauvre en oxygène, vous pouvez donc perdre connaissance <b>en quelques instants, sans gêne ressentie avant</b>. L'azote est incolore et inodore ; la plupart des fluides fluorés aussi. Se fier à l'odeur reste dangereux.</p>",
      dire: "Pourquoi personne ne sent venir ce danger ? Parce que notre corps n'a pas d'alarme pour le manque d'oxygène. Ce qui nous pousse à respirer plus vite, c'est le gaz carbonique qui s'accumule dans le sang. Or dans un local appauvri en oxygène, ce gaz carbonique ne s'accumule pas : c'est l'oxygène qui manque, et rien ne déclenche l'alarme. Vous ne suffoquez pas peu à peu : vous tombez, d'un coup, sans avoir rien ressenti. Et votre nez ne vous sauvera pas non plus, car l'azote n'a aucune odeur, et c'est aussi le cas de presque tous les fluides fluorés. Compter sur l'odeur pour se protéger, c'est se mettre en danger.",
      retenir: ["Aucune gêne ne prévient avant la perte de connaissance : l'azote et la plupart des fluides fluorés n'ont pas d'odeur."],
      reference: "Code 12.02 · aucun signal fiable",
    },

    {
      id: "cas-co2",
      titre: "Une exception : le CO₂ prévient, mais tard",
      note: "L'exception à connaître",
      visuel: {
        motif: "duo",
        titre: "Deux comportements très différents",
        cartes: [
          { titre: "AZOTE ET FLUIDES FLUORÉS", picto: "🔇", pour: "Le cas général", texte: "aucun signe avant la perte de connaissance" },
          { titre: "LE CO₂", picto: "⚠", pour: "L'exception", texte: "essoufflement, mal de tête, vertiges — mais seulement une fois déjà dans le gaz" },
        ],
        lien: "≠",
        pied: "Devant une installation au CO₂, un détecteur d'oxygène seul ne suffit pas : il faut mesurer le CO₂ lui-même.",
      },
      texte: "<p>Une exception importante : le <b>CO₂</b>. Lui vous <b>prévient</b> — essoufflement, mal de tête, vertiges — parce qu'il agit sur la commande de la respiration. C'est une chance, mais tardive : ces signes n'arrivent qu'une fois dans le gaz.</p><p>Et pour la même raison, un détecteur d'oxygène seul ne suffit pas à surveiller une installation au CO₂. <b>Ce danger n'a pas de code dans le référentiel d'examen</b> : vous ne serez pas interrogé dessus, mais il peut vous tuer.</p>",
      dire: "Le dioxyde de carbone fait exception à ce que vous venez d'entendre. Lui, le corps le sent venir : on s'essouffle, on a mal à la tête, la tête tourne. C'est qu'il agit directement sur ce qui commande notre respiration. Mais cet avertissement arrive tard, quand on se trouve déjà dans le gaz. Pour cette même raison, surveiller l'oxygène ne suffit pas sur une installation au C O 2 : il faut mesurer le C O 2 lui-même. Ce risque ne fait l'objet d'aucun code dans le référentiel, et personne ne vous interrogera dessus. Il peut pourtant être mortel : c'est pourquoi cette capsule vous en parle.",
      reference: "Fiche s1 · l'exception CO₂ (hors référentiel d'examen)",
      controle: {
        enonce: "Pourquoi un détecteur d'oxygène seul ne suffit-il pas à surveiller une installation au CO₂ ?",
        choix: [
          "Parce que le CO₂ est plus rare que l'azote sur les installations",
          "Parce que le CO₂ prévient par ses propres signes, mais seulement une fois qu'on est déjà dans le gaz : il faut le mesurer lui-même",
          "Parce que le détecteur d'oxygène ne fonctionne qu'en extérieur",
          "Parce que le CO₂ n'appauvrit jamais l'air en oxygène",
        ],
        bonne: 1,
        explication: "Le CO₂ agit sur la commande de la respiration : il donne des signes (essoufflement, mal de tête, vertiges) une fois qu'on est déjà dans le gaz. Un détecteur d'oxygène ne mesure pas le CO₂ : devant une installation qui en contient, il faut un appareil qui le mesure lui-même.",
      },
    },

    {
      id: "reflexes",
      titre: "Les quatre gestes qui protègent",
      note: "Le protocole",
      visuel: {
        motif: "checklist",
        titre: "Avant d'entrer dans un espace clos suspect",
        items: [
          { titre: "Ventiler", texte: "ouvrir, aérer, laisser l'air circuler" },
          { titre: "Contrôler l'air", texte: "avec un détecteur d'oxygène — pas un détecteur de fuite de fluide, ce n'est pas le même appareil" },
          { titre: "Ne jamais entrer seul", texte: "prévenir quelqu'un, travailler à deux" },
          { titre: "Devant un collègue au sol", texte: "ne pas se précipiter sans protection : alerter, ventiler, faire venir les secours", refus: true },
        ],
        pied: "Le seuil d'alerte du détecteur se règle selon la FDS du fluide concerné.",
      },
      texte: "<p>Avant d'entrer : <b>ventilez</b> le local, et <b>contrôlez l'air</b> avec un détecteur d'oxygène — pas seulement un détecteur de fuite de fluide, ce n'est pas le même appareil. Devant une installation au CO₂, il faut mesurer le CO₂ lui-même.</p><p><b>N'entrez jamais seul</b> dans un espace clos suspect. Et si un collègue est au sol : ne vous précipitez pas sans protection. Donnez l'alerte, ventilez, faites intervenir les secours.</p>",
      dire: "Quatre gestes vous protègent, et ils se font dans cet ordre. D'abord, avant d'entrer, on fait circuler l'air : on ouvre, on aère. Ensuite, on vérifie ce qu'on va respirer, avec un appareil qui mesure l'oxygène ; un détecteur de fuite ne le dirait pas, ce sont deux outils différents. Sur une installation au C O 2, c'est le C O 2 lui-même qu'il faut mesurer. Troisième geste : dans un local fermé dont on se méfie, on n'entre jamais seul, on travaille à deux. Le quatrième est le plus difficile : si un collègue est à terre, on ne se précipite pas sans protection. On alerte, on aère, et on laisse les secours intervenir.",
      retenir: ["Détecteur d'oxygène et détecteur de fuite de fluide : deux appareils différents, à ne pas confondre."],
      reference: "Codes 12.02 · 12.13 · les quatre réflexes",
      controle: {
        enonce: "Une fuite de fluide est possible dans une chambre froide restée porte fermée toute la nuit. Que faites-vous avant d'y entrer ?",
        choix: [
          "J'entre rapidement, je ne reste que quelques secondes.",
          "Je ventile le local, et je contrôle l'air avec un détecteur avant d'entrer.",
          "Je vérifie d'abord s'il y a une odeur suspecte.",
          "J'entre avec un collègue, sans autre précaution, pour me rassurer.",
        ],
        bonne: 1,
        explication: "Un local fermé où du fluide ou de l'azote a pu s'accumuler ne donne aucun signal fiable. Ni la rapidité, ni l'odeur, ni la présence d'un collègue ne protègent du manque d'oxygène. Seuls la ventilation et un détecteur d'oxygène donnent une information sûre avant d'entrer. Devant une installation au CO₂, le détecteur d'oxygène ne suffit pas : il faut mesurer le CO₂ lui-même.",
      },
    },

    {
      id: "deux-victimes",
      titre: "Le réflexe qui évite la seconde victime",
      note: "À emporter",
      visuel: {
        motif: "sequence",
        titre: "Ce qui transforme un accident en deux victimes",
        etapes: [
          { titre: "Un premier entre", texte: "sans ventiler ni contrôler l'air, il tombe sans aucun signe avant" },
          { titre: "Un second se précipite", texte: "pour le secourir, sans se protéger ni ventiler", danger: true },
          { titre: "Il respire le même air", texte: "et s'effondre à son tour : deux victimes au lieu d'une", danger: true },
        ],
        pied: "Devant un collègue au sol dans un espace clos : alerter et ventiler, ne jamais descendre sans protection.",
      },
      texte: "<p>Entrer seul dans un local fermé, une chambre froide ou une fosse, après une mise en pression à l'azote ou une fuite suspectée, <b>sans ventiler ni contrôler l'air</b>, est le geste interdit.</p><p>Avec l'azote ou un fluide fluoré : perte de connaissance sans signe avant-coureur. Avec le CO₂ : des signes arrivent, mais quand vous êtes déjà dans le gaz. Risque mortel dans les deux cas, pour vous et pour quiconque tenterait de vous secourir sans précaution.</p>",
      dire: "Pour finir, retenez le scénario qui revient le plus souvent, celui du début de cette capsule. Un premier technicien entre sans ventiler ni contrôler l'air : il tombe sans aucun signe avant. Un second se précipite pour le secourir, sans se protéger ni ventiler à son tour. Il respire le même air appauvri, et s'effondre lui aussi. Deux victimes, alors qu'il n'en fallait aucune. Le seul réflexe qui casse cet enchaînement : devant un collègue au sol dans un espace clos, on n'y descend jamais sans protection. On alerte, on ventile, on fait venir les secours.",
      piege: "<p>Entrer seul dans un local fermé, une chambre froide ou une fosse, après une mise en pression à l'azote ou une fuite suspectée, <b>sans ventiler ni contrôler l'air</b>.</p><p>Conséquence : avec l'azote ou un fluide fluoré, perte de connaissance sans signe avant-coureur. Avec le CO₂, des signes arrivent — essoufflement, mal de tête — mais quand vous êtes déjà dans le gaz. Risque mortel dans les deux cas, pour vous et pour quiconque tenterait de vous secourir sans précaution.</p>",
      reference: "Codes 12.02 · 12.13 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur la fiche suivante : le froid brûle aussi.",
});

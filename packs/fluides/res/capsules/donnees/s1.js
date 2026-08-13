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
      dire: "Voici la situation la plus fréquente de ce type d'accident. Une chambre froide est restée porte fermée toute une nuit : une fuite de fluide y est possible. Un technicien entre. Il ne sent rien d'anormal, alors il ne se méfie pas. Il perd connaissance en quelques instants, sans aucun signe avant. Un collègue le voit au sol, et fait le geste qui semble naturel : il descend le chercher. Sans se protéger, sans ventiler. Il respire le même air appauvri, et s'effondre à son tour. Deux victimes au lieu d'une, alors qu'il n'y en avait besoin d'aucune.",
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
      dire: "Comprenons d'abord ce qui se passe. Respirer, c'est faire entrer de l'oxygène dans le corps. Un local fermé peut se remplir d'un autre gaz : de l'azote, utilisé pour mettre un circuit en pression, ou du fluide frigorigène qui a fui. Ce gaz prend la place de l'oxygène dans l'air. C'est ce qu'on appelle une asphyxie par manque d'oxygène. Retenez bien la différence : vous ne respirez pas moins bien parce qu'un produit vous empoisonne, mais parce qu'il a chassé l'air respirable, tout simplement.",
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
      dire: "Voici pourquoi ce danger est si trompeur. Face à l'azote et aux fluides fluorés, le corps ne donne aucune alerte. Normalement, c'est l'envie de respirer plus fort qui nous prévient d'un problème, mais elle vient d'un excès de gaz carbonique dans le sang, pas d'un manque d'oxygène. Résultat : dans un local pauvre en oxygène, vous ne suffoquez pas peu à peu. Vous pouvez perdre connaissance en quelques instants, sans aucune gêne ressentie avant. Et se fier à l'odeur ne protège pas : l'azote n'en a aucune, et la plupart des fluides fluorés non plus.",
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
      dire: "Il existe une exception importante à connaître : le C O 2. Lui vous prévient — essoufflement, mal de tête, vertiges — parce qu'il agit directement sur la commande de la respiration. C'est une chance, mais elle arrive tard : ces signes n'apparaissent qu'une fois que vous êtes déjà dans le gaz. Et pour cette même raison, un détecteur d'oxygène seul ne suffit pas à surveiller une installation au C O 2 : il faut mesurer le C O 2 lui-même. Ce danger précis n'a pas de code dans le référentiel de l'examen. Vous ne serez pas interrogé dessus. Il peut pourtant vous tuer : c'est pour cela qu'on en parle ici.",
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
      dire: "Voici les gestes qui protègent, dans l'ordre. D'abord, ventilez le local : ouvrez, aérez, laissez l'air circuler. Ensuite, contrôlez l'air avec un détecteur d'oxygène — attention, ce n'est pas le même appareil qu'un détecteur de fuite de fluide. Le seuil d'alerte se règle selon la fiche de données de sécurité du fluide concerné. Devant une installation au C O 2, un détecteur d'oxygène ne suffit pas : il faut mesurer le C O 2 lui-même. N'entrez jamais seul dans un espace clos suspect : prévenez quelqu'un, travaillez à deux. Et si un collègue est au sol dans un espace clos, le réflexe le plus difficile est aussi le bon : ne vous précipitez pas sans protection. Donnez l'alerte, ventilez, faites intervenir les secours.",
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

/* Capsule g10 — « Tuyauterie et brasage sous azote » (G10 · codes 10.01 · 10.02).
   Contenu repris SANS AJOUT de la fiche g10 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "g10",
  fiche: "g10",
  titre: "Tuyauterie et brasage sous azote",
  surtitre: "HABILITATION FLUIDES · G10 · CODES 10.01 · 10.02",
  duree: "environ 6 minutes",
  intro: "Braser un circuit frigorifique sans azote, c'est fabriquer une panne pour plus tard. Ce chapitre vous montre le geste qui protège le cuivre pendant la chauffe, et celui qui protège le joint une fois le chalumeau éteint.",
  codes: [
    { code: "10.01", libelle: "Réaliser des joints étanches (soudage, brasage fort ou tendre)" },
    { code: "10.02", libelle: "Fabriquer et vérifier les supports de tuyauteries" },
  ],

  visuelAccueil: {
    motif: "flux",
    titre: "Le geste qui protège le cuivre de l'intérieur",
    boites: [
      { picto: "🛢️", titre: "Azote", texte: "un débit léger, continu" },
      { picto: "🔥", titre: "Le tube en chauffe", texte: "l'azote chasse l'oxygène pendant le brasage" },
      { picto: "✅", titre: "Un joint sans calamine", texte: "propre à l'intérieur, durable", teinte: "ok" },
    ],
    pied: "Sans ce débit, l'oxygène forme une calamine qui bouche le circuit plus tard.",
  },

  ecrans: [
    {
      id: "pourquoi-balayer",
      titre: "Braser un circuit frigorifique, ce n'est pas braser une tuyauterie d'eau",
      note: "Le point de départ",
      visuel: { svg: "balayage-azote.svg", alt: "Brasage sous balayage d'azote : l'azote traverse le tube pendant la chauffe et ressort librement." },
      legende: "Le débit d'azote traverse le tube pendant toute la durée de la chauffe.",
      texte: "<p>Braser un circuit frigorifique, ce n'est pas braser une tuyauterie d'eau.</p><p>À la flamme, l'intérieur du cuivre s'oxyde et forme une <b>calamine</b> noire. Elle se détache plus tard, circule, et bouche le déshydrateur ou abîme le compresseur — des mois après, loin de la cause.</p>",
      dire: "Braser un circuit frigorifique, ce n'est pas braser une tuyauterie d'eau, même si le geste à la flamme se ressemble. À l'intérieur du cuivre, la chaleur forme une pellicule noire, la calamine. Elle ne pose aucun problème sur le moment. Le problème vient plus tard : cette calamine se détache, elle circule dans le circuit, elle bouche le déshydrateur ou elle abîme le compresseur. Et ça arrive des mois après, très loin du geste qui en est la cause.",
      reference: "Code 10.01 · pourquoi on balaie",
    },

    {
      id: "le-balayage",
      titre: "Le trajet de l'azote pendant la chauffe",
      note: "Un débit léger, continu",
      visuel: {
        motif: "flux",
        titre: "L'azote traverse le tube pendant toute la chauffe",
        boites: [
          { picto: "🛢️", titre: "Bouteille d'azote", texte: "débit réglé léger et continu" },
          { picto: "🔥", titre: "Le tube, pendant la chauffe", texte: "l'azote traverse l'intérieur, chasse l'oxygène" },
          { picto: "💨", titre: "La sortie", texte: "l'azote ressort librement, à l'autre bout", teinte: "ok" },
        ],
        pied: "Sans ce débit continu, l'oxygène reste dans le tube et la calamine se forme.",
      },
      texte: "<p>D'où le <b>balayage à l'azote</b> pendant toute la chauffe : un débit léger et continu chasse l'oxygène du tube.</p><p>Pour le cuivre sur cuivre, l'alliage d'apport est généralement du type <b>cuivre-phosphore</b>.</p>",
      dire: "D'où le balayage à l'azote, pendant toute la durée de la chauffe. Le principe est simple : un débit léger et continu d'azote traverse le tube, et il chasse l'oxygène qui s'y trouve. L'azote entre par la bouteille, traverse le tube pendant que vous chauffez, et ressort librement à l'autre bout. Tant que ce débit continue, pas d'oxygène, pas de calamine. Pour un assemblage cuivre sur cuivre, l'alliage d'apport utilisé est généralement du type cuivre-phosphore.",
      retenir: ["<b>Balayage</b> : un débit léger et continu d'azote, pendant toute la chauffe, pour chasser l'oxygène."],
      reference: "Code 10.01 · le balayage",
      controle: {
        enonce: "Pourquoi balaie-t-on à l'azote pendant un brasage sur circuit frigorifique ?",
        choix: [
          "Pour refroidir le tube plus vite",
          "Pour éviter l'oxydation interne du cuivre (calamine)",
          "Pour vérifier l'étanchéité du joint",
          "Pour sécher le circuit avant la charge",
        ],
        bonne: 1,
        explication: "Sans azote, la chauffe oxyde l'intérieur du tube. La calamine formée se détache ensuite, circule dans le circuit, bouche le déshydrateur et endommage le compresseur.",
      },
    },

    {
      id: "balayage-vs-epreuve",
      titre: "Balayage et épreuve : le même gaz, deux moments",
      note: "Ne pas les confondre",
      visuel: {
        motif: "duo",
        titre: "Deux opérations à l'azote, jamais le même moment",
        cartes: [
          { titre: "LE BALAYAGE", picto: "🔥", pour: "Pendant le brasage", texte: "un débit léger, pour éviter l'oxydation du cuivre" },
          { titre: "L'ÉPREUVE", picto: "🎚️", pour: "Après le brasage", texte: "une mise sous pression, pour vérifier l'étanchéité" },
        ],
        lien: "≠",
        pied: "Même gaz — l'azote — mais deux gestes, et deux moments différents.",
      },
      texte: "<p>Deux opérations utilisent l'azote, et il ne faut pas les confondre.</p><p>Le <b>balayage</b> : pendant le brasage, un débit léger, pour éviter l'oxydation.</p><p>L'<b>épreuve</b> : après le brasage, sous pression, pour vérifier l'étanchéité.</p><p>Même gaz, deux gestes, deux moments.</p>",
      dire: "Un point à bien distinguer, parce que l'examen aime le confondre. Deux opérations utilisent l'azote, mais ce n'est pas la même chose. Le balayage se fait pendant le brasage : un débit léger, en continu, pour éviter l'oxydation du cuivre. L'épreuve se fait après le brasage : une mise sous pression, cette fois, pour vérifier que le joint est étanche. C'est le même gaz, l'azote, mais deux gestes complètement différents, à deux moments différents du chantier.",
      retenir: ["<b>Balayage</b> = pendant le brasage, débit léger, contre l'oxydation.", "<b>Épreuve</b> = après le brasage, sous pression, pour l'étanchéité."],
      reference: "Code 10.01 · balayage et épreuve",
    },

    {
      id: "avant-de-braser",
      titre: "Avant d'allumer le chalumeau",
      note: "Ce qui se vérifie avant la flamme",
      visuel: {
        motif: "checklist",
        titre: "Ce qu'on vérifie avant la flamme",
        items: [
          { titre: "Jamais de fluide dans le circuit", texte: "récupération, puis inertage à l'azote", refus: true },
          { titre: "EPI systématiques", texte: "lunettes, gants" },
          { titre: "Tubes cintrés à froid", texte: "à la cintreuse" },
          { titre: "Tubes coupés et ébavurés", texte: "une bavure part avec le fluide et finit dans le compresseur" },
        ],
        pied: "Un circuit qui contient encore du fluide ne se brase pas.",
      },
      texte: "<p>On ne brase <b>jamais</b> un circuit contenant du fluide : récupération, puis inertage à l'azote.</p><p><b>EPI systématiques</b> au poste : lunettes, gants.</p><p>Les tubes se cintrent <b>à froid</b>, à la cintreuse, se coupent au coupe-tube et s'<b>ébavurent</b> — une bavure part avec le fluide et finit dans le compresseur.</p>",
      dire: "Avant d'allumer le chalumeau, quelques points se vérifient. D'abord, et c'est non négociable : on ne brase jamais un circuit qui contient encore du fluide. Il faut d'abord le récupérer, puis inerter le circuit à l'azote. Ensuite, les équipements de protection sont systématiques au poste : lunettes, gants. Et côté tuyauterie, les tubes se cintrent à froid, à la cintreuse, ils se coupent au coupe-tube, et ils s'ébavurent. Ce dernier geste n'est pas cosmétique : une bavure oubliée part avec le fluide dans le circuit, et elle finit sa course dans le compresseur.",
      reference: "Code 10.01 · avant la flamme",
      controle: {
        enonce: "Un circuit contient encore du fluide et vous devez réparer une fuite par brasage. Que faites-vous avant d'allumer le chalumeau ?",
        choix: [
          "Je brase directement : le fluide ne réagit pas à la chaleur",
          "Je le récupère, puis j'inerte le circuit à l'azote",
          "Je le vidange à l'air libre, puis je brase",
          "Je brase en gardant la charge en place, pour ne pas la perdre",
        ],
        bonne: 1,
        explication: "On ne brase jamais un circuit contenant du fluide : il faut d'abord le récupérer, puis inerter le circuit à l'azote.",
      },
    },

    {
      id: "le-support-compte",
      titre: "Le support compte autant que le joint",
      note: "À emporter",
      visuel: {
        motif: "alerte",
        titre: "Un risque qui ne se voit pas tout de suite",
        vignettes: [
          { picto: "🔧", etiquette: "le geste à risque", titre: "Un support mal posé", texte: "trop serré, ou un point dur sur le tube" },
          { picto: "📳", etiquette: "ce qui se transmet", titre: "Les vibrations du compresseur", texte: "passent directement au joint brasé" },
          { picto: "⏳", etiquette: "ce qu'on ne voit pas tout de suite", titre: "Une rupture par fatigue", texte: "le joint peut être parfait au départ, et rompre des mois plus tard" },
        ],
        pied: "Un joint parfait sur un support fautif ne reste pas parfait longtemps.",
      },
      texte: "<p>Un support mal posé, trop serré, ou un point dur sur le tube transmet les vibrations du compresseur au joint brasé.</p><p>Le joint peut être parfait au départ et rompre par <b>fatigue</b>, des mois plus tard.</p>",
      dire: "Un dernier point, souvent négligé, et pourtant décisif : le support compte autant que le joint lui-même. Un support mal posé, trop serré, ou un simple point dur sur le tube, ça suffit pour transmettre les vibrations du compresseur directement au joint brasé. Et voilà le piège : le joint peut être parfait le jour du brasage, parfaitement étanche, et rompre par fatigue des mois plus tard, loin du regard de celui qui a fait le geste. Un beau brasage sur un mauvais support ne reste pas un beau brasage longtemps.",
      retenir: ["Un <b>support</b> mal posé transmet les vibrations du compresseur au joint : la rupture peut venir des mois plus tard."],
      piege: "<p>Le joint peut être parfait au départ. Un <b>support mal posé</b> transmet quand même les vibrations du compresseur, et le joint finit par rompre par <b>fatigue</b>, des mois plus tard.</p>",
      reference: "Code 10.02 · les supports de tuyauterie",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur la substitution et l'efficacité.",
});

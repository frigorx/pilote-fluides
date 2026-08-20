/* Capsule cl3 — « CO₂ : deux dangers mortels — la pression et l'air qu'il vous
   prend » (code 11.03). Contenu repris SANS AJOUT de la fiche cl3 de
   cartes.js : découpé pour l'oral, mis en animation. Aucune valeur
   chiffrée nouvelle. Fiche la plus importante du module — capsule dense. */
CAPSULE.declarer({
  id: "cl3",
  fiche: "cl3",
  titre: "CO₂ : deux dangers mortels — la pression et l'air qu'il vous prend",
  surtitre: "HABILITATION FLUIDES · CLASSIFICATION · CODE 11.03",
  duree: "environ 8 minutes",
  intro: "Le CO₂ est classé dans la case la plus rassurante de la matrice. C'est exactement ce qui le rend dangereux : sa classe ne dit rien de ce qui tue vraiment sur ces installations.",
  codes: [
    { code: "11.03", libelle: "Connaître les règles de sécurité applicables aux fluides toxiques, inflammables ou nécessitant une pression de fonctionnement plus élevée." },
  ],

  visuelAccueil: {
    motif: "zone",
    titre: "Le CO₂ s'accumule par le bas",
    hauteurNappe: 92,
    nappeLibelle: "incolore, inodore, plus lourd que l'air",
    personnage: "le technicien descend",
  },

  ecrans: [
    {
      id: "descendre-dans-la-nappe",
      titre: "Une nappe invisible, au ras du sol",
      note: "Le point de départ",
      visuel: {
        motif: "zone",
        titre: "En bas de l'escalier",
        hauteurNappe: 92,
        nappeLibelle: "le CO₂ : incolore, inodore, plus lourd que l'air",
        personnage: "le technicien descend",
        points: [
          { titre: "En haut de l'escalier", texte: "l'air semble normal" },
          { titre: "En bas", texte: "la nappe de CO₂ est déjà là" },
        ],
      },
      texte: "<p>Une installation au CO₂ en local technique enterré. Une fuite lente pendant la nuit, porte fermée : le gaz remplit le volume par le bas.</p><p>Au matin, un technicien descend relever un paramètre. <b>Rien ne se voit, rien ne se sent.</b></p>",
      dire: "Voici la scène qui revient le plus souvent dans ce type d'accident. Une installation au CO2 en local technique enterré. Une fuite lente pendant la nuit, porte fermée. Le gaz remplit le volume par le bas. Au matin, un technicien descend relever un paramètre. Rien ne se voit, rien ne se sent. Nous allons voir pourquoi cette scène, si banale, est en réalité l'une des plus dangereuses du métier.",
      reference: "Code 11.03 · la scène qui revient chaque année",
    },

    {
      id: "a1-trompeur",
      titre: "A1, la case la plus rassurante",
      note: "Et pourtant…",
      visuel: { svg: "classes-securite.svg", alt: "Matrice complète des classes NF EN 378 : huit cases, toxicité en lignes, inflammabilité en colonnes. Le CO₂ occupe la case A1, la plus rassurante de la grille." },
      legende: "Le CO₂ est en A1 : toxicité faible, non inflammable. Cette case ne dit rien de sa pression, ni de l'air qu'il prend dans un local fermé.",
      texte: "<p>Le CO₂ — le R-744 — est classé <b>A1</b> : toxicité faible, non inflammable, <b>PRP de 1</b>. C'est la case la plus rassurante de toute la matrice.</p><p>Et c'est exactement ce qui le rend dangereux : <b>sa classe n'annonce aucun des deux risques qui tuent réellement</b> — la pression, et l'anoxie. Ce fluide entre aujourd'hui dans le parc : froid commercial, supermarchés, chambres froides. Vous en rencontrerez.</p>",
      dire: "Le CO2, le R-744, est classé A 1 : toxicité faible, non inflammable, un P R P de 1. C'est la case la plus rassurante de toute la matrice. Et c'est exactement ce qui le rend dangereux : sa classe n'annonce aucun des deux risques qui tuent réellement sur ces installations, la pression et l'anoxie. Qui retient « CO2 égale A 1 égale tranquille » a retenu quelque chose de faux. Et ce n'est plus un sujet de culture générale : ce fluide entre aujourd'hui dans le parc, en froid commercial, dans les supermarchés, dans les chambres froides. Vous en rencontrerez.",
      retenir: ["Le CO₂ est classé <b>A1</b> : toxicité faible, non inflammable, <b>PRP de 1</b>.", "Cette classe n'annonce <b>ni la pression, ni l'anoxie</b> : les deux vrais dangers du CO₂."],
      reference: "Code 11.03 · le piège de la classe",
    },

    {
      id: "danger-pression",
      titre: "Premier danger : la pression",
      note: "Un matériel dédié",
      visuel: {
        motif: "checklist",
        titre: "Ce qui change avec le CO₂",
        items: [
          { titre: "Manifold, flexibles, vannes", texte: "tout doit être dédié au CO₂" },
          { titre: "Machine à l'arrêt", texte: "la pression reste, et remonte si ça chauffe" },
          { titre: "Glace carbonique à la détente", texte: "brûlure par le froid, et bouchon solide" },
        ],
        pied: "Aucun réflexe pris sur un R-134a ou un R-410A ne se transpose ici.",
      },
      texte: "<p>Une installation au CO₂ travaille à des pressions <b>bien plus élevées</b> que celles que vous connaissez : <b>jusqu'à 120 bar environ</b> en haute pression transcritique. Brancher un manifold ordinaire, c'est le faire <b>éclater dans les mains</b>.</p><p>Cette pression garde son danger <b>machine à l'arrêt</b> : elle continue de monter si elle se réchauffe. Et à la détente à l'air libre, le CO₂ peut se solidifier en <b>glace carbonique</b> : brûlure par le froid, et bouchon qui obstrue une vanne.</p>",
      dire: "Premier danger : la pression. Une installation au CO2 travaille à des pressions bien plus élevées que celles des fluides que vous connaissez, sans commune mesure. Pour fixer l'ordre de grandeur : côté haute pression, une centrale transcritique travaille couramment jusqu'à 120 bar environ. Manifold, flexibles, vannes : tout doit être dédié au CO2. Brancher un manifold ordinaire sur une installation au CO2, c'est le faire éclater dans les mains. La valeur exacte se lit sur la plaque de l'installation et dans la documentation du constructeur, jamais dans un cours, et ce chiffre ne change rien à la règle : aucun réflexe acquis sur un R-134a ou un R-410A ne se transpose ici. Cette pression garde son danger machine à l'arrêt : une installation au CO2 arrêtée continue de monter en pression si elle se réchauffe. Et à la détente à l'air libre, le CO2 peut passer directement à l'état solide : c'est la glace carbonique. Double conséquence, une brûlure par le froid au contact de la peau, et un bouchon solide qui obstrue une vanne ou une tuyauterie.",
      reference: "Code 11.03 · le matériel dédié",
    },

    {
      id: "danger-anoxie",
      titre: "Second danger : l'air qu'il vous prend",
      note: "Pas comme l'azote",
      visuel: {
        motif: "duo",
        titre: "Deux mécanismes, pas un seul",
        cartes: [
          { titre: "L'AZOTE", picto: "⬜", pour: "déplace, seulement", texte: "inerte : il prend juste la place de l'oxygène" },
          { titre: "LE CO₂", picto: "⚠", pour: "déplace, ET agit", texte: "il intervient lui-même sur votre respiration" },
        ],
        lien: "≠",
        pied: "C'est pour cela qu'un détecteur d'oxygène seul ne suffit pas sur une installation au CO₂.",
      },
      texte: "<p><b>Anoxie</b> : le manque d'oxygène. L'azote agit uniquement par <b>déplacement</b> : inerte, il prend la place de l'oxygène. Le <b>CO₂ agit en plus par lui-même</b> : il intervient dans la régulation de la respiration, et devient nocif alors que l'oxygène restant serait encore suffisant.</p><p>Un <b>détecteur d'oxygène seul ne suffit pas</b> : il faut une mesure du CO₂ lui-même.</p>",
      dire: "Second danger : l'air qu'il vous prend. L'anoxie, c'est le manque d'oxygène dans l'organisme. Le CO2 fait cela, mais il ne fait pas que cela, et c'est toute la différence. Deux mécanismes, pas un seul. L'azote agit uniquement par déplacement : il est inerte, il prend la place de l'oxygène sans réagir avec l'organisme. Le CO2, lui, agit en plus par lui-même : il n'est pas inerte, il intervient dans la régulation de la respiration, et devient nocif à des concentrations où l'oxygène restant serait encore suffisant. Autrement dit, le CO2 peut vous mettre en danger avant d'avoir chassé assez d'oxygène pour qu'un contrôle du seul taux d'oxygène s'en alarme. C'est pourquoi, sur une installation au CO2, un détecteur d'oxygène seul ne suffit pas : il faut une mesure du CO2 lui-même.",
      reference: "Code 11.03 · deux mécanismes, pas un",
    },

    {
      id: "les-signes",
      titre: "Des signes, mais déjà trop tard",
      note: "La règle de sortie",
      visuel: {
        motif: "alerte",
        titre: "Ce que vous ressentirez",
        vignettes: [
          { picto: "💨", etiquette: "vous sentez", titre: "Souffle court", texte: "puis un essoufflement violent" },
          { picto: "🤕", etiquette: "vous sentez", titre: "Mal de tête, vertiges", texte: "bourdonnements, sueurs" },
          { picto: "🚪", etiquette: "vous faites", titre: "Vous ressortez", texte: "tout de suite, sans discuter" },
        ],
        pied: "Ces signes arrivent quand vous êtes déjà dans la nappe.",
      },
      texte: "<p>Contrairement à l'azote, le CO₂ <b>donne des signes</b> : souffle court puis essoufflement violent, maux de tête, vertiges, sueurs. Mais ils arrivent alors que vous êtes <b>déjà dans la nappe</b>.</p><p><b>Essoufflement brutal ou mal de tête soudain dans un local technique : vous ressortez immédiatement.</b> On ne cherche pas à comprendre sur place.</p>",
      dire: "Ce que vous ressentirez, et pourquoi c'est déjà tard. Contrairement à l'azote, qui ne prévient pas du tout, le CO2 donne des signes : souffle court puis essoufflement violent, maux de tête, vertiges, bourdonnements, sueurs. C'est l'excès de gaz carbonique dans le sang qui commande l'envie de respirer. Ces signes sont votre seule chance, mais ils arrivent alors que vous êtes déjà dans la nappe, et à forte concentration la perte de connaissance suit en quelques instants. D'où une règle simple : essoufflement brutal ou mal de tête soudain dans un local technique, vous ressortez immédiatement. On ne cherche pas à comprendre sur place, on ne finit pas le geste en cours.",
      retenir: ["<b>Essoufflement brutal</b> ou <b>mal de tête soudain</b> dans un local technique : vous ressortez <b>immédiatement</b>."],
      reference: "Code 11.03 · la seule chance",
      controle: {
        enonce: "Vous intervenez dans un local technique abritant une installation au CO₂. Au bout de quelques minutes, vous avez mal à la tête et le souffle court. Que faites-vous ?",
        choix: [
          "Je termine le geste en cours, je n'en ai que pour deux minutes.",
          "Je ressors immédiatement et je donne l'alerte : ces signes veulent dire que je suis déjà dans la nappe de gaz.",
          "Je m'assois un moment sur place pour reprendre mon souffle.",
          "Je mets cela sur le compte de la fatigue et je continue en surveillant comment je me sens.",
        ],
        bonne: 1,
        explication: "Contrairement à l'azote, le CO₂ donne des signes — essoufflement, maux de tête, vertiges — parce qu'il agit sur la régulation de la respiration. Mais ces signes n'apparaissent qu'une fois dans la nappe, et la perte de connaissance peut suivre en quelques instants. Ils ne s'interprètent pas et ne se surveillent pas : ils commandent de sortir. S'asseoir est le pire des choix, puisque le gaz s'accumule en partie basse.",
      },
    },

    {
      id: "point-bas",
      titre: "Incolore, inodore, plus lourd que l'air",
      note: "Sauf l'ammoniac",
      visuel: { svg: "co2-point-bas.svg", alt: "Le CO₂ remplit le local par le bas ; un technicien descend l'escalier et entre dans la nappe. Respirable à hauteur de visage, mortel en bas de l'escalier." },
      legende: "Une zone peut être respirable à hauteur de visage, et déjà mortelle au niveau du sol.",
      texte: "<p>Le CO₂ est <b>incolore, inodore, plus lourd que l'air</b> : il s'écoule et s'accumule dans les <b>points bas</b> — fosse, cave, sous-sol, bas d'une chambre froide.</p><p>Attention : « plus lourd que l'air » vaut pour le CO₂, <b>mais pas pour l'ammoniac</b> (R-717), qui lui <b>monte</b>. Le comportement d'un fluide se lit sur sa FDS, il ne se suppose jamais.</p>",
      dire: "Pourquoi on entre sans le savoir. Le CO2 est incolore, inodore, et plus lourd que l'air. Il ne monte pas : il s'écoule et s'accumule dans les points bas, fosse, cave, sous-sol, local en contrebas, bas d'une chambre froide. Une zone peut être parfaitement respirable à hauteur de visage, et déjà mortelle au niveau du sol, ou en bas de quelques marches. Descendre, c'est entrer dans la nappe. Attention à ne pas généraliser cette règle : « plus lourd que l'air » vaut pour le CO2 et pour la plupart des fluides fluorés, mais pas pour l'ammoniac, le R-717, plus léger que l'air, qui se comporte à l'inverse : il monte. Le comportement d'un fluide se lit sur sa F D S, il ne se suppose jamais par analogie avec le fluide précédent.",
      reference: "Code 11.03 · le point bas",
      controle: {
        enonce: "Vous savez que le CO₂, plus lourd que l'air, s'accumule en point bas. Cette règle vaut-elle pour tous les fluides frigorigènes ?",
        choix: [
          "Oui, tous les fluides plus lourds que l'air se comportent pareil, sans exception.",
          "Non : l'ammoniac (R-717) est plus léger que l'air et monte, à l'inverse du CO₂.",
          "Non, aucun fluide n'a de comportement prévisible : il faut le mesurer à chaque fois.",
          "Oui, sauf pour les fluides fluorés qui restent toujours à hauteur de visage.",
        ],
        bonne: 1,
        explication: "« Plus lourd que l'air » vaut pour le CO₂ et pour la plupart des fluides fluorés, mais pas pour l'ammoniac, qui est plus léger que l'air et monte. Le comportement d'un fluide se lit sur sa fiche de données de sécurité, il ne se déduit jamais par analogie avec le fluide précédent.",
      },
    },

    {
      id: "double-accident",
      titre: "Le second accident : le sauveteur",
      note: "À emporter",
      visuel: {
        motif: "sequence",
        titre: "Comment ça arrive vraiment",
        etapes: [
          { titre: "Fuite lente, la nuit", texte: "personne ne le sait" },
          { titre: "Un technicien descend", texte: "au matin, rien ne se voit" },
          { titre: "Il a mal à la tête", texte: "il continue, « deux minutes »", danger: true },
          { titre: "Il ne remonte pas", texte: "un collègue descend le chercher", danger: true },
        ],
        pied: "Sans protection, la nappe est toujours là : deux victimes au lieu d'une.",
      },
      texte: "<p>À mi-escalier, le technicien a mal à la tête et le souffle court. Il met cela sur le compte de la fatigue et continue. <b>Il ne remonte pas.</b></p><p>Puis vient le second accident, celui qui tue le plus souvent dans cette famille d'accidents : un collègue le voit au sol et descend le chercher, <b>sans protection</b>. La nappe est toujours là. <b>Deux victimes au lieu d'une.</b></p>",
      dire: "Reprenons la scène du début, jusqu'au bout. Le technicien descend relever un paramètre. À mi-escalier, il a mal à la tête et le souffle court : il met cela sur le compte de la fatigue et continue, parce qu'il n'en a que pour deux minutes. Il ne remonte pas. Puis vient le second accident, celui qui tue le plus souvent dans cette famille d'accidents : un collègue le voit au sol et descend le chercher, sans protection. La nappe est toujours là. Deux victimes au lieu d'une.",
      piege: "<p>Descendre dans une fosse, une cave, un sous-sol ou tout local en contrebas abritant une installation au CO₂ après une fuite possible, <b>sans avoir ventilé et mesuré</b>. Et, si un collègue est au sol : <b>descendre le chercher sans protection</b>.</p><p>Interdit aussi : brancher du <b>matériel non dédié au CO₂</b> sur une installation au CO₂. Sa pression n'a rien à voir avec ce que vous connaissez.</p>",
      reference: "Code 11.03 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour le détail. La protection concrète contre le CO₂ — détection, ppm, EPC et EPI — se traite à part, au moment où la question se pose vraiment.",
});

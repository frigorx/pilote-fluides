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
      dire: "Tout le danger de cette scène tient dans un détail physique : le gaz s'est rassemblé par le bas, pendant la nuit, porte fermée. Le local enterré s'est rempli comme une baignoire, et au petit matin, la surface de cette nappe est invisible. Le technicien descend pour un relevé de routine, sans rien percevoir d'anormal. C'est précisément cette banalité qui fait de ce scénario l'un des plus dangereux du métier, comme vous allez le comprendre.",
      reference: "Code 11.03 · la scène qui revient chaque année",
    },

    {
      id: "a1-trompeur",
      titre: "A1, la case la plus rassurante",
      note: "Et pourtant…",
      visuel: { svg: "classes-securite.svg", alt: "Matrice complète des classes NF EN 378 : huit cases, toxicité en lignes, inflammabilité en colonnes. Le CO₂ occupe la case A1, la plus rassurante de la grille." },
      legende: "Le CO₂ est en A1 : toxicité faible, non inflammable. Cette case ne dit rien de sa pression, ni de l'air qu'il prend dans un local fermé.",
      texte: "<p>Le CO₂ — le R-744 — est classé <b>A1</b> : toxicité faible, non inflammable, <b>PRP de 1</b>. C'est la case la plus rassurante de toute la matrice.</p><p>Et c'est exactement ce qui le rend dangereux : <b>sa classe n'annonce aucun des deux risques qui tuent réellement</b> — la pression, et l'anoxie. Ce fluide entre aujourd'hui dans le parc : froid commercial, supermarchés, chambres froides. Vous en rencontrerez.</p>",
      dire: "Dans le tableau de classement des fluides, le dioxyde de carbone occupe la place la plus rassurante : peu toxique, ininflammable, avec un P R P de 1. Tout invite à baisser la garde, et c'est là le piège. Ce classement ne dit rien des deux dangers qui tuent vraiment avec ce fluide : une pression très élevée, et l'anoxie, c'est-à-dire le manque d'oxygène. Retenir que le C O 2 est tranquille parce qu'il est en A 1, c'est retenir une erreur. Et ce n'est pas un cas d'école : on le trouve de plus en plus en froid commercial, dans les supermarchés et les chambres froides. Vous le croiserez sur vos chantiers.",
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
      dire: "Le premier danger, c'est la pression. Sur une installation au dioxyde de carbone, elle n'a rien à voir avec ce que vous rencontrez d'habitude : côté haute pression, en transcritique, elle approche les cent vingt bars. Un manifold classique ne résiste pas : le brancher, c'est risquer qu'il explose entre vos mains. Tout le matériel, flexibles et vannes compris, doit être prévu pour ce fluide. Et l'arrêt de la machine ne supprime pas le danger : si elle se réchauffe, sa pression continue de grimper. La valeur exacte se lit sur la plaque et dans la documentation de l'installation.",
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
      dire: "Le second danger tient à l'air que vous respirez. On parle d'anoxie quand l'organisme manque d'oxygène. Comparez avec l'azote : lui ne fait que pousser l'oxygène hors du local, sans agir sur votre corps. Le dioxyde de carbone, lui, ne se contente pas de prendre la place : il agit directement sur la commande de votre respiration. Il devient donc dangereux à des teneurs où il resterait pourtant assez d'oxygène pour vivre. Conséquence pratique : surveiller l'oxygène ne suffit pas, il faut mesurer le C O 2 lui-même.",
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
      dire: "Ici, le corps réagit, à la différence de ce qui se passe avec l'azote. On respire d'abord un peu vite, puis on cherche son air avec violence ; la tête fait mal, elle tourne, on transpire. C'est le gaz carbonique en excès dans le sang qui déclenche cette envie de respirer. Le problème, c'est le moment où ces signes surviennent : vous vous trouvez déjà dans le gaz, et à forte dose, la perte de connaissance peut suivre en quelques instants. D'où une règle qui ne se discute pas : si, dans un local technique, le souffle s'emballe ou la tête se met à cogner sans raison, on sort tout de suite. On comprendra plus tard, dehors.",
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
      dire: "Ce gaz a trois traits qui le rendent sournois : on ne le voit pas, on ne le sent pas, et il est plus dense que l'air. Il coule donc vers le bas et s'y rassemble : une fosse, une cave, un sous-sol, le fond d'une chambre froide. Sur le dessin, le technicien qui descend les marches passe d'un air sain à une nappe mortelle : au niveau de la tête, tout va bien ; au ras du sol, plus du tout. Attention, ce n'est pas vrai de tous les fluides : l'ammoniac, lui, s'élève. Le comportement de chaque fluide se vérifie dans sa fiche de données de sécurité, on ne le devine pas.",
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
      dire: "Cette scène montre le scénario le plus meurtrier avec le dioxyde de carbone. Le premier technicien ressent un mal de tête et un essoufflement, et les met sur le compte de la fatigue : ce sont pourtant les premiers signes que l'air de la fosse est devenu dangereux. Il s'effondre. Le collègue qui le découvre a un réflexe humain, descendre l'aider, et il entre à son tour dans la nappe, sans protection. Le gaz ne fait aucune différence entre la victime et le sauveteur. La règle est donc absolue : on ne descend jamais dans un local en contrebas après une fuite possible sans avoir ventilé et mesuré, même pour secourir quelqu'un.",
      piege: "<p>Descendre dans une fosse, une cave, un sous-sol ou tout local en contrebas abritant une installation au CO₂ après une fuite possible, <b>sans avoir ventilé et mesuré</b>. Et, si un collègue est au sol : <b>descendre le chercher sans protection</b>.</p><p>Interdit aussi : brancher du <b>matériel non dédié au CO₂</b> sur une installation au CO₂. Sa pression n'a rien à voir avec ce que vous connaissez.</p>",
      reference: "Code 11.03 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour le détail. La protection concrète contre le CO₂ — détection, ppm, EPC et EPI — se traite à part, au moment où la question se pose vraiment.",
});

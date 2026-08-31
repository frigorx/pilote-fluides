/* A1 — L’air se déplace
   Ligne A · Air & hygrométrie
   Socle commun · appui CP8, CP9 et CP10
   Correspondance : ligne V · VMC

   Cette station doit pouvoir s'ouvrir seule : voir index.html dans ce dossier.
   Le réseau la charge comme une brique, il ne recopie jamais son contenu.

   Rédigée le 27/08/2026 sur le moule de la station pilote — voir CONTRAT-CONTENU.md.
   Première gare du réseau : elle pose le moteur de tout le reste. */
(window.AEROREZO_STATIONS = window.AEROREZO_STATIONS || []).push({
  line: "A",
  id: "air-circule",
  title: "L’air se déplace",

  /* Les trois profondeurs. Le niveau ne masque jamais une règle de sécurité
     ni une information indispensable. */
  cap: "Suivez le trajet de l’air, du dehors jusqu’au rejet.",
  bac: "Reliez le déplacement de l’air à un écart de pression.",
  bts: "Distinguez pression statique, dynamique et totale dans le raisonnement réseau.",

  /* Découvrir — ce que l'élève observe, pas ce qu'il doit conclure. */
  decouverte: "L’air ne se voit pas, et c’est là toute la difficulté du métier. Suivez le trajet complet sur la scène : l’air est pris dehors, soufflé dans le local, repris à l’autre bout, puis rejeté dehors. Quatre flux, un seul et même air qui fait une boucle. Regardez surtout le sens : il ne s’invente pas, il se lit. Sur une installation réelle, se tromper de sens conduit à mesurer un débit d’extraction en croyant mesurer un soufflage.",

  /* Comprendre — le raisonnement déroulé dans l'ordre où on le fait vraiment. */
  explication: "Pourquoi l’air se déplace-t-il ? Pour une seule raison : il existe un écart de pression entre deux points, et l’air va toujours du point où la pression est la plus forte vers celui où elle est la plus faible. Il n’y a pas d’autre moteur. Tout le reste — ventilateur, gaine, bouche — n’est là que pour créer, guider ou freiner cet écart.\n\nLe ventilateur ne pousse pas l’air comme on pousse un objet. Il crée une dépression d’un côté et une surpression de l’autre. C’est l’écart entre les deux qui met l’air en mouvement. En VMC simple flux, le caisson met le logement en dépression ; l’air extérieur, resté à la pression normale, entre alors tout seul. Personne ne le souffle : c’est l’écart qui travaille.\n\nMais il faut être précis sur ce mot pression, parce qu’il en recouvre trois. La pression statique est celle que l’air exerce sur les parois, indépendamment de son mouvement. La pression dynamique est celle liée à sa vitesse : elle n’existe que parce que l’air bouge. La pression totale est la somme des deux. Et c’est bien la pression totale qui décide du sens : l’air va de la pression totale la plus forte vers la plus faible.\n\nCette précision n’est pas académique. Sur un chantier, elle décide de la validité d’une mesure : selon la prise utilisée, on lit l’une ou l’autre, et confondre les trois fausse tout le raisonnement qui suit. C’est l’objet de la station Trois pressions.\n\nRetenez enfin la méthode, elle vaut pour toute installation : on part du trajet réel. Où l’air est-il pris, par où passe-t-il, où est-il rendu ? Un schéma dont on ne sait pas dire le sens de l’air n’est pas encore lu.",

  method: "Partez toujours du trajet réel : entrée, traitement, local, reprise ou rejet. Le sens se lit avant toute mesure.",
  formula: "L’air va de la pression totale la plus forte vers la plus faible",

  /* Manipuler — une action précise. */
  consigne: "Suivez la boucle et nommez les quatre flux à voix haute, dans l’ordre où l’air les parcourt. Demandez-vous ensuite, pour chaque tronçon, de quel côté se trouve la pression la plus forte. Repérez enfin l’endroit du circuit où se trouve le ventilateur : c’est là que l’écart naît, et tout le reste du trajet en découle.",
  lecture: "Si vous ne savez pas dire de quel côté est la dépression, vous ne pouvez pas dire dans quel sens l’air circule — et une mesure prise sans connaître le sens n’a pas de valeur. C’est le premier réflexe à prendre devant une installation inconnue, avant même de sortir un appareil.",

  /* Ce que le modèle ne dit pas. Écrit, jamais sous-entendu. */
  limites: "La scène montre un circuit simple et fermé. Une installation réelle comporte des fuites : gaines mal raccordées, passages non étanches, portes ouvertes. Une partie de l’air emprunte alors des chemins qui ne figurent sur aucun plan, et c’est souvent ce qui explique l’écart entre le débit calculé et le débit mesuré.",

  activity: {"kind":"flow"},

  /* Ce que la voix dit — texte à part, écrit pour l'oreille.
     Règle et contrôles : 00-charte/VOIX-ET-NARRATION.md, node tests/voix.mjs. */
  narration: {
    decouvrir: "L’air ne se voit pas, et c’est toute la difficulté de ce métier. Alors suivons son trajet complet. Il est pris dehors, soufflé dans le local, repris à l’autre bout, puis rejeté dehors. Quatre flux, et pourtant un seul et même air, qui fait une boucle. Regardez surtout le sens de cette boucle. Il ne s’invente pas, il se lit. Sur une installation réelle, se tromper de sens conduit à mesurer un débit d’extraction en croyant mesurer un soufflage — et à conclure exactement l’inverse de ce qu’il fallait.",

    comprendre: "Une seule chose met l’air en mouvement, et il n’y en a pas d’autre : un écart de pression entre deux points. Le sens, lui, ne se discute pas — du plus fort vers le plus faible, toujours. Tout le reste, le ventilateur, la gaine, la bouche, n’est là que pour créer, guider ou freiner cet écart. Et le ventilateur, justement, ne pousse pas l’air comme on pousse un objet. Il crée une dépression d’un côté et une surpression de l’autre. C’est l’écart entre les deux qui met l’air en mouvement. Maintenant, un mot sur lequel il faut être précis : la pression. Il y en a trois. La pression statique, celle que l’air exerce sur les parois, qu’il bouge ou non. La pression dynamique, celle qui est liée à sa vitesse, et qui n’existe que parce qu’il bouge. Et la pression totale, qui est la somme des deux. C’est elle, la totale, qui décide du sens.",

    manipuler: "Suivez la boucle et nommez les quatre flux à voix haute, dans l’ordre où l’air les parcourt. Puis, pour chaque tronçon, posez-vous une seule question : de quel côté se trouve la pression la plus forte ? Repérez enfin où se trouve le ventilateur dans le circuit. C’est là que l’écart naît, et tout le reste du trajet en découle. Si vous ne savez pas dire de quel côté est la dépression, vous ne pouvez pas dire dans quel sens l’air circule.",

    verifier: "Deux questions, sans note. Une seule idée à retenir, et elle commande tout le réseau : l’air se déplace parce qu’il existe un écart de pression, et il va toujours du plus fort vers le plus faible. Devant une installation inconnue, le premier réflexe n’est pas de sortir un appareil. C’est de savoir dire où l’air est pris, par où il passe, et où il est rendu."
  },

  /* Vérification locale : deux questions corrigées, sans note.
     Le rang de la bonne réponse est réparti sur l'ensemble de la banque —
     `node outils/mesure-banque.mjs` échoue si ce n'est plus le cas. */
  quiz: [
    ["Pourquoi l’air circule-t-il dans une gaine ?","Il existe un écart de pression",["Il existe un écart de pression","Le conduit descend vers la sortie","La gaine s’élargit vers la sortie"]],
    ["Par quoi commencer la lecture d’un réseau ?","Par le sens réel de circulation",["Par la puissance du ventilateur","Par le sens réel de circulation","Par le diamètre de la gaine"]]
  ],

  /* Ce qui sert à l'enseignant, et ne passe pas à l'écran de l'élève. */
  prof: {
    mission: "Lire le sens de circulation de l’air sur une installation, avant toute mesure.",
    acquis: {
      cap: ["Suit le trajet de l’air sur un schéma", "Nomme soufflage, reprise et rejet", "Repère l’emplacement du ventilateur"],
      bac: ["Relie le mouvement de l’air à un écart de pression", "Explique qu’un ventilateur crée une dépression et une surpression", "Dit de quel côté se trouve la dépression sur une installation"],
      bts: ["Distingue pression statique, dynamique et totale", "Justifie que c’est la pression totale qui donne le sens", "Anticipe l’effet des fuites sur le débit réellement mesuré"]
    },
    sources: [
      "inerWeb Aéraulique v5 — dimensionnement de gaines et pertes de charge"
    ],
    correspondances: [
      {reseau: "AéroRézo", station: "Trois pressions", pourquoi: "la distinction statique / dynamique / totale y est instrumentée"},
      {reseau: "AéroRézo", station: "VMC simple flux", pourquoi: "la dépression du logement y devient le moteur du balayage"}
    ]
  }
});

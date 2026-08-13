/* Capsule p4 — « La bouteille d'azote et son mano-détendeur » (Préparation pratique · codes 3.01 · 3.02).
   Contenu repris SANS AJOUT de la fiche p4 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "p4",
  fiche: "p4",
  titre: "La bouteille d'azote et son mano-détendeur",
  surtitre: "HABILITATION FLUIDES · PRÉPARATION PRATIQUE · CODES 3.01 · 3.02",
  duree: "environ 6 minutes",
  intro: "Une bouteille d'azote ne se branche jamais seule : il faut toujours un mano-détendeur entre les deux. Ce chapitre vous montre le montage, geste par geste, et le seul gaz qu'on a le droit d'y mettre.",
  codes: [
    { code: "3.01", libelle: "Réaliser une épreuve de pression de résistance" },
    { code: "3.02", libelle: "Réaliser une épreuve de pression d'étanchéité" },
  ],

  visuelAccueil: {
    motif: "flux",
    titre: "Entre la bouteille et le circuit, un appareil obligatoire",
    boites: [
      { picto: "🛢️", titre: "Bouteille d'azote", texte: "toute la pression, enfermée" },
      { picto: "🎚️", titre: "Mano-détendeur", texte: "lit la pression, règle ce qui part" },
      { picto: "🧊", titre: "Circuit à éprouver", texte: "reçoit une montée progressive, jamais un à-coup" },
    ],
    pied: "Sans lui, toute la pression de la bouteille part d'un coup.",
  },

  ecrans: [
    {
      id: "jamais-direct",
      titre: "Pourquoi une bouteille ne se branche jamais seule",
      note: "Le point de départ",
      visuel: { svg: "epreuve-azote.svg", alt: "Le mano-détendeur monté sur la bouteille d'azote sec, raccordé au manifold puis au circuit à éprouver, vanne par vanne — jamais d'oxygène ni d'air comprimé." },
      legende: "Le mano-détendeur est le seul intermédiaire autorisé entre la bouteille et le circuit.",
      texte: "<p>Une bouteille d'azote ne se branche <b>jamais directement</b> sur un circuit.</p><p>Entre les deux, il y a toujours un <b>mano-détendeur</b>. Il lit la pression de la bouteille. Il règle la pression envoyée dans le circuit.</p><p>Sans lui, toute la pression de la bouteille part d'un coup — largement de quoi faire éclater un circuit.</p>",
      dire: "Commençons par une règle simple, qui protège de tout le reste. Une bouteille d'azote ne se branche jamais toute seule sur un circuit. Entre les deux, il y a toujours un appareil : le mano-détendeur. Il fait deux choses. Il lit la pression qui reste dans la bouteille. Et il règle la pression qu'on envoie dans le circuit. Sans lui, toute la pression de la bouteille partirait d'un coup. Largement de quoi faire éclater un circuit.",
      retenir: ["Une bouteille d'azote se branche <b>toujours</b> à travers un <b>mano-détendeur</b>, jamais en direct."],
      reference: "Codes 3.01 · 3.02 · le montage obligatoire",
    },

    {
      id: "deux-cadrans",
      titre: "Deux cadrans, deux informations",
      note: "Ne pas les confondre",
      visuel: {
        motif: "duo",
        titre: "Ce que chaque cadran vous dit",
        cartes: [
          { titre: "CADRAN BOUTEILLE", picto: "🔘", pour: "Ce qu'il reste dedans", texte: "Il indique la pression qui reste dans la bouteille." },
          { titre: "CADRAN SORTIE", picto: "🎚️", pour: "Ce que vous envoyez", texte: "Il indique la pression réglée, celle qui part vers le circuit." },
        ],
        lien: "+",
        pied: "On lit toujours les deux, avant et pendant le réglage.",
      },
      texte: "<p>Le mano-détendeur porte <b>deux cadrans</b>.</p><p>Le premier indique ce qu'il reste dans la bouteille. Le second indique la pression réglée en sortie, celle qui part vers le circuit.</p><p>On lit toujours les deux.</p>",
      dire: "Regardez le mano-détendeur : il porte deux cadrans, et ils ne disent pas la même chose. Le premier cadran indique ce qu'il reste dans la bouteille. Le second cadran indique la pression que vous envoyez vers le circuit, celle que vous réglez vous-même. On ne lit jamais un seul des deux : on regarde toujours les deux ensemble.",
      retenir: ["Cadran <b>bouteille</b> : ce qu'il reste dedans.", "Cadran <b>sortie</b> : ce que vous envoyez dans le circuit."],
      reference: "Codes 3.01 · 3.02 · les deux cadrans",
      controle: {
        enonce: "Après avoir atteint la pression réglée et fermé la bouteille, le cadran de sortie redescend tout seul. Qu'est-ce que cela signifie ?",
        choix: [
          "C'est normal : la pression se stabilise toujours ainsi après la fermeture",
          "Il y a une fuite au raccord, à vérifier avant d'aller plus loin",
          "Il faut resserrer davantage la vis de réglage pour compenser",
          "Le mano-détendeur est défectueux et doit être changé immédiatement",
        ],
        bonne: 1,
        explication: "Un cadran de sortie qui ne tient pas sa pression signale une fuite au raccord. On la cherche et on la corrige avant d'aller plus loin.",
      },
    },

    {
      id: "avant-ouverture",
      titre: "Avant d'ouvrir la bouteille",
      note: "Deux gestes, dans l'ordre",
      visuel: {
        motif: "sequence",
        titre: "Deux gestes, avant la première pression",
        etapes: [
          { titre: "Un raccord propre", texte: "sans trace d'huile ni de graisse" },
          { titre: "La vis desserrée", texte: "montée sur la bouteille, aucune pression encore envoyée en sortie" },
        ],
        pied: "Tant que ce n'est pas vérifié, la bouteille reste fermée.",
      },
      texte: "<p>Avant d'ouvrir quoi que ce soit, deux gestes.</p><p>Vérifier que le raccord est <b>propre</b>, sans trace d'huile ni de graisse : l'azote sous pression au contact d'huile est un risque.</p><p>Monter le mano-détendeur sur le robinet de la bouteille, et vérifier que la <b>vis de réglage est desserrée</b> — aucune pression envoyée en sortie.</p>",
      dire: "Avant d'ouvrir quoi que ce soit, deux gestes, dans l'ordre. D'abord, vérifier que le raccord est propre, sans trace d'huile ni de graisse : l'azote sous pression au contact d'huile est un risque. Ensuite, monter le mano-détendeur sur le robinet de la bouteille, et vérifier que la vis de réglage est desserrée. À ce moment, aucune pression ne doit encore être envoyée en sortie. Tant que ce n'est pas vérifié, la bouteille reste fermée.",
      reference: "Codes 3.01 · 3.02 · avant d'ouvrir",
      controle: {
        enonce: "Vous venez de monter le mano-détendeur sur la bouteille d'azote. Avant d'ouvrir le robinet de la bouteille, dans quelle position doit être la vis de réglage ?",
        choix: [
          "Vissée à fond, pour avoir la pression maximale tout de suite",
          "Desserrée, pour n'envoyer aucune pression en sortie avant d'ouvrir la bouteille",
          "Peu importe, on règle après de toute façon",
          "À mi-course, pour gagner du temps",
        ],
        bonne: 1,
        explication: "Vis desserrée : aucune pression envoyée en sortie. On ouvre la bouteille, on lit sa pression, puis on visse progressivement pour monter en pression côté circuit. Ouvrir la bouteille vis déjà serrée enverrait un à-coup de pression incontrôlé.",
      },
    },

    {
      id: "ouverture-reglage",
      titre: "Ouvrir, régler, fermer",
      note: "Le moment où tout peut déraper",
      visuel: {
        motif: "sequence",
        titre: "Le moment où tout peut déraper",
        etapes: [
          { titre: "Ouvrir lentement la bouteille", texte: "si la vis était restée serrée, la pression part d'un coup vers le circuit", danger: true },
          { titre: "Raccorder le circuit", texte: "flexible, manifold, puis circuit à éprouver" },
          { titre: "Visser progressivement", texte: "la pression de sortie monte, à lire sur le second cadran, jusqu'à la valeur donnée par la documentation" },
          { titre: "Fermer la bouteille", texte: "le cadran de sortie ne doit plus bouger" },
        ],
        pied: "Une pression de sortie qui redescend seule signale une fuite au raccord.",
      },
      texte: "<p>La bouteille s'ouvre <b>lentement</b>. Si la vis était restée serrée, la pression part d'un coup vers le circuit.</p><p>Le circuit se raccorde ensuite : flexible, manifold, puis circuit à éprouver.</p><p>On visse <b>progressivement</b> la vis de réglage : la pression de sortie monte, à lire sur le second cadran, jusqu'à la valeur donnée par la documentation du constructeur ou la norme applicable.</p><p>Une fois la pression atteinte, on ferme le robinet de la bouteille. Le cadran de sortie ne doit <b>plus bouger</b>.</p>",
      dire: "On ouvre alors lentement le robinet de la bouteille. C'est le moment où tout peut déraper : si la vis était restée serrée, la pression part d'un coup vers le circuit, sans aucun contrôle. Une fois la bouteille ouverte, on raccorde le circuit à éprouver : le flexible, le manifold, puis le circuit lui-même. On visse ensuite progressivement la vis de réglage. La pression de sortie monte, doucement, et on la lit sur le second cadran, jusqu'à la valeur donnée par la documentation du constructeur ou la norme applicable. Une fois cette pression atteinte, on ferme le robinet de la bouteille. Et on observe : le cadran de sortie ne doit plus bouger du tout.",
      reference: "Codes 3.01 · 3.02 · ouvrir, régler, fermer",
    },

    {
      id: "gaz-interdits",
      titre: "Le seul gaz qu'on a le droit d'utiliser",
      note: "Le geste interdit",
      visuel: {
        motif: "alerte",
        titre: "Un seul gaz autorisé, sans exception",
        vignettes: [
          { picto: "🚫", etiquette: "le geste à ne jamais faire", titre: "Oxygène ou air comprimé", texte: "utilisés pour la mise en pression à la place de l'azote" },
          { picto: "💥", etiquette: "ce que ça déclenche", titre: "Un risque direct", texte: "l'oxygène est explosif au contact de l'huile ; l'air comprimé est humide et chargé en oxygène" },
          { picto: "✅", etiquette: "le bon réflexe", titre: "Azote sec, seul", texte: "le seul gaz autorisé pour la mise en pression" },
        ],
        pied: "Ce n'est pas une question de disponibilité. C'est une question de sécurité, sans exception.",
      },
      texte: "<p>La mise en pression se fait <b>à l'azote sec, seul</b>.</p><p>Jamais d'oxygène : il est explosif au contact de l'huile. Jamais d'air comprimé : humide, chargé en oxygène.</p>",
      dire: "Une dernière règle, et elle ne se discute pas. La mise en pression se fait à l'azote sec, et seulement à l'azote sec. Jamais d'oxygène : au contact d'huile, il devient explosif. Jamais d'air comprimé non plus : il est humide, et chargé en oxygène. Ce n'est pas une question de ce qu'on a sous la main sur le chantier. C'est une règle de sécurité, et elle ne connaît pas d'exception.",
      retenir: ["<b>Azote sec, seul</b>, pour toute mise en pression : jamais d'oxygène, jamais d'air comprimé."],
      piege: "<p>Une bouteille se branche toujours avec un mano-détendeur, jamais en direct. Et la mise en pression se fait <b>à l'azote sec, seul</b> — jamais à l'oxygène, jamais à l'air comprimé.</p>",
      reference: "Codes 3.01 · 3.02 · le geste interdit",
    },
  ],

  motFin: "Vous pouvez maintenant revenir à la fiche pour lire le texte complet, ou enchaîner sur l'ordre des vannes et la chorégraphie de l'intervention.",
});

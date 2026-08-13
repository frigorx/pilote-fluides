/* Capsule g5a — « Récupérer sans émettre » (G5 · codes 5.01 → 5.04).
   Contenu repris SANS AJOUT de la fiche g5a de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "g5a",
  fiche: "g5a",
  titre: "Récupérer sans émettre",
  surtitre: "HABILITATION FLUIDES · G5 · CODES 5.01 → 5.04",
  duree: "environ 8 minutes",
  intro: "Récupérer un fluide, ce n'est jamais le laisser filer dans l'air pendant l'opération. Un geste lent, une bouteille pesée, une huile mise à part : voici la méthode expliquée à voix haute.",
  codes: [
    { code: "5.01", libelle: "Connecter et déconnecter avec un minimum d'émissions" },
    { code: "5.02", libelle: "Vider et remplir un cylindre, en phase liquide et gazeuse" },
    { code: "5.03", libelle: "Utiliser un dispositif de récupération" },
    { code: "5.04", libelle: "Vidanger l'huile contaminée" },
  ],

  visuelAccueil: {
    motif: "flux",
    titre: "Le chemin du fluide récupéré",
    boites: [
      { picto: "🔧", titre: "Installation isolée", texte: "arrêtée, isolée, avant tout raccordement" },
      { picto: "🌀", titre: "Groupe de récupération", texte: "transfère le fluide" },
      { picto: "⚖", titre: "Cylindre pesé", texte: "jamais rempli à ras", teinte: "ok" },
    ],
    pied: "Chaque connexion et chaque déconnexion est un point de fuite possible.",
  },

  ecrans: [
    {
      id: "isoler-avant-tout",
      titre: "Avant de récupérer : arrêter et isoler",
      note: "Le point de départ",
      visuel: { svg: "ordre-vannes.svg", alt: "Le montage de récupération, et l'ordre à la déconnexion : fermer côté circuit puis côté appareil, laisser la pression se stabiliser, desserrer lentement par petites touches, récupérer le fluide resté dans le flexible, déconnecter seulement quand la pression est retombée." },
      texte: "<p>Chaque connexion et chaque déconnexion est un <b>point de fuite</b> : le geste est lent, contrôlé, flexibles purgés.</p><p>Avant de récupérer, on <b>arrête et on isole</b> le système — y compris électriquement : la consignation est systématique.</p>",
      dire: "Avant même de brancher le premier flexible, un principe : chaque connexion et chaque déconnexion est un point de fuite possible. Le geste est donc lent, contrôlé, et les flexibles sont purgés avant d'être ouverts sur l'air. Avant de récupérer, on arrête et on isole le système — y compris électriquement, la consignation est systématique, elle ne se discute pas.",
      reference: "Code 5.01 · avant de connecter",
    },

    {
      id: "fermer-stabiliser-desserrer",
      titre: "Déconnecter : toujours dans le même ordre",
      note: "Le geste qui blesse, s'il est pressé",
      visuel: {
        motif: "sequence",
        titre: "Déconnecter : toujours dans le même ordre",
        etapes: [
          { titre: "Fermer", texte: "côté circuit, puis côté appareil" },
          { titre: "Stabiliser", texte: "on laisse la pression se calmer, sans forcer" },
          { titre: "Desserrer", texte: "lentement, par petites touches : un raccord encore sous pression peut gicler", danger: true },
          { titre: "Déconnecter", texte: "seulement quand la pression est retombée" },
        ],
        pied: "Ce qui commande l'ordre, c'est la pression qui redescend — jamais une durée fixée d'avance.",
      },
      texte: "<p>Le geste de déconnexion suit toujours le même ordre : on <b>ferme</b> côté circuit puis côté appareil, on laisse la <b>pression se stabiliser</b>, on <b>desserre lentement</b>, par petites touches — un raccord encore sous pression peut gicler — et on ne déconnecte que lorsque la pression est retombée.</p>",
      dire: "Le geste de déconnexion suit toujours le même ordre, et cet ordre ne s'improvise pas. On ferme d'abord côté circuit, puis côté appareil. On laisse ensuite la pression se stabiliser, sans forcer. Vient ensuite le geste le plus délicat : desserrer lentement, par petites touches, jamais d'un coup — un raccord encore sous pression peut gicler, et c'est là que ça blesse. On ne déconnecte que lorsque la pression est vraiment retombée. Ce qui commande cet ordre, c'est la pression elle-même qui redescend — jamais une durée décidée à l'avance.",
      retenir: ["Fermer, stabiliser, desserrer, déconnecter : toujours dans cet ordre.", "C'est la pression qui commande le rythme, jamais une durée fixée d'avance."],
      reference: "Code 5.01 · le bon ordre",
    },

    {
      id: "le-groupe-de-recuperation",
      titre: "Le groupe de récupération : vers le cylindre",
      note: "Gaz ou liquide, selon la situation",
      visuel: { svg: "recuperation.svg", alt: "Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance." },
      texte: "<p>Le <b>groupe de récupération</b> transfère le fluide vers un cylindre prévu pour, en <b>phase gazeuse ou liquide</b> selon la situation.</p>",
      dire: "Une fois le système isolé, le groupe de récupération entre en jeu. Il transfère le fluide vers un cylindre prévu pour ça, en phase gazeuse ou en phase liquide, selon la situation rencontrée sur le chantier.",
      reference: "Code 5.02 · 5.03 · le groupe de récupération",
    },

    {
      id: "jamais-a-ras",
      titre: "Le cylindre : jamais rempli à ras",
      note: "La dilatation ne pardonne pas",
      visuel: { svg: "secu-bouteille.svg", alt: "Pourquoi une bouteille ne se remplit jamais à ras et ne se chauffe jamais : le liquide a besoin de place pour se dilater si la température monte, le taux de remplissage maximal se lit chez le fabricant. En bas de l'image : jamais d'oxygène ni d'air comprimé pour une mise en pression, l'azote seul, toujours avec un mano-détendeur." },
      texte: "<p>Le cylindre respecte un <b>taux de remplissage maximal</b> — jamais rempli à ras : le liquide se dilate avec la température, et un cylindre plein est un danger.</p><p>On <b>pèse avant</b> de récupérer, sinon on ne saura jamais combien on a réellement récupéré.</p>",
      dire: "Le cylindre de récupération respecte toujours un taux de remplissage maximal. On ne le remplit jamais à ras bord : le fluide liquide se dilate avec la température, et un cylindre plein n'a plus aucune place pour cette dilatation — c'est un danger. Avant même de commencer, on pèse le cylindre. Sans cette pesée de départ, on ne saura jamais vraiment combien de fluide a été récupéré.",
      retenir: ["Le cylindre a un <b>taux de remplissage maximal</b> : jamais à ras.", "On <b>pèse avant</b> de récupérer, sinon la quantité n'est qu'une estimation."],
      reference: "Code 5.02 · le taux de remplissage",
      controle: {
        enonce: "Pourquoi ne remplit-on jamais un cylindre de récupération à ras bord ?",
        choix: [
          "Pour qu'il reste transportable à la main",
          "Parce que le liquide se dilate avec la température : un taux de remplissage maximal doit être respecté",
          "Pour laisser de la place au fluide suivant",
          "Parce que la balance ne mesure pas au-delà",
        ],
        bonne: 1,
        explication: "Le fluide liquide se dilate quand la température monte. Un cylindre trop rempli n'a plus de volume d'expansion : le taux de remplissage maximal n'est pas une précaution, c'est une règle de sécurité.",
      },
    },

    {
      id: "recycle-regenere",
      titre: "Récupéré, recyclé, régénéré",
      note: "Trois mots à ne pas confondre",
      visuel: {
        motif: "flux",
        titre: "Récupéré, recyclé, régénéré",
        boites: [
          { picto: "🛢", titre: "Récupéré", texte: "sorti de la machine : un déchet tant qu'il n'est pas traité" },
          { picto: "🧽", titre: "Recyclé", texte: "nettoyé sommairement, réemploi limité" },
          { picto: "✨", titre: "Régénéré", texte: "retraité en filière agréée, comme un fluide neuf", teinte: "ok" },
        ],
        pied: "Trois mots différents, trois usages différents : ne pas les confondre.",
      },
      texte: "<p><b>Récupéré</b> : sorti de la machine — c'est un déchet tant qu'il n'a pas été traité. <b>Recyclé</b> : nettoyé sommairement, réemploi limité, typiquement sur la même installation. <b>Régénéré</b> : ramené aux spécifications d'un fluide neuf par une filière agréée.</p>",
      dire: "Trois mots reviennent souvent, et il ne faut pas les confondre. Récupéré, c'est un fluide qui vient de sortir de la machine : c'est encore un déchet, tant qu'il n'a pas été traité. Recyclé, c'est un fluide nettoyé sommairement, pour un réemploi limité, typiquement sur la même installation ou chez le même exploitant. Régénéré, c'est un retraitement complet, réalisé par une filière agréée, qui ramène le fluide aux spécifications d'un produit neuf.",
      retenir: ["<b>Récupéré</b> : sorti de la machine, encore un déchet.", "<b>Recyclé</b> : nettoyage sommaire, réemploi limité. <b>Régénéré</b> : retraité en filière agréée, comme neuf."],
      reference: "Code 5.02 · 5.03 · le vocabulaire du fluide usagé",
    },

    {
      id: "vidanger-huile",
      titre: "Vidanger l'huile : dans le bon ordre",
      note: "Après le fluide, jamais avant",
      visuel: {
        motif: "checklist",
        titre: "Vidanger l'huile : dans le bon ordre",
        items: [
          { titre: "Récupérer le fluide d'abord", texte: "jamais vidanger l'huile avant" },
          { titre: "Récipient fermé et étiqueté", texte: "" },
          { titre: "Bidon ouvert", texte: "les vapeurs de fluide dissous s'échappent : une émission de plus", refus: true },
          { titre: "Noter la quantité vidangée", texte: "comme on pèse le fluide récupéré" },
        ],
        pied: "L'huile contaminée part en déchet dangereux, avec son bordereau.",
      },
      texte: "<p>Une fois le fluide récupéré, reste un dernier geste : <b>vidanger l'huile</b> du compresseur. Cette huile garde du <b>fluide dissous</b>, qui continue à dégazer. On la vide dans un <b>récipient fermé et étiqueté</b>, jamais un bidon ouvert.</p><p>On <b>note la quantité</b> vidangée. L'huile contaminée part en <b>déchet dangereux</b>, avec son <b>bordereau</b>.</p>",
      dire: "Le fluide récupéré, il reste un dernier geste : vidanger l'huile du compresseur. Et l'ordre compte : on vidange l'huile après avoir récupéré le fluide, jamais avant — sinon on relâche dans l'air du fluide encore dissous dedans, sans même le mesurer. Cette huile garde du fluide dissous, qui continue à dégazer lentement, même une fois sortie de la machine. On la vide donc dans un récipient fermé et étiqueté, jamais dans un bidon ouvert : sinon ces vapeurs s'échappent, et c'est une émission de plus, exactement comme une fuite. On note la quantité vidangée, comme on pèse le fluide récupéré : sans cette trace, personne ne peut vérifier que rien n'a été perdu en route. L'huile contaminée part ensuite en déchet dangereux, avec son bordereau — le document qui la suit jusqu'à son traitement final.",
      retenir: ["On vidange l'huile <b>après</b> avoir récupéré le fluide, jamais avant.", "Récipient <b>fermé et étiqueté</b>, quantité notée, déchet dangereux avec bordereau."],
      reference: "Code 5.04 · vidanger l'huile",
    },

    {
      id: "ne-jamais-melanger",
      titre: "Un cylindre, un fluide, une étiquette",
      note: "À emporter",
      visuel: {
        motif: "duo",
        titre: "Un cylindre, un fluide, une étiquette",
        cartes: [
          { titre: "UN FLUIDE PAR CYLINDRE", picto: "✓", pour: "La bonne pratique", texte: "Un fluide identifié, une étiquette : le contenu reste recyclable ou régénérable." },
          { titre: "DEUX FLUIDES MÉLANGÉS", picto: "✗", pour: "Le geste qui détruit tout", texte: "Le contenu devient impossible à recycler ou à régénérer : il part en destruction, aux frais de l'entreprise." },
        ],
        lien: "≠",
        pied: "Un cylindre, un fluide, une étiquette.",
      },
      texte: "<p>Deux fluides différents dans le même cylindre, et le contenu devient <b>impossible à recycler ou à régénérer</b> : il part en destruction, aux frais de l'entreprise.</p>",
      dire: "Un dernier geste à ne jamais faire, pour finir. Deux fluides différents versés dans le même cylindre, et le contenu devient impossible à recycler ou à régénérer. Il part en destruction, aux frais de l'entreprise. La règle tient en une phrase : un cylindre, un fluide, une étiquette.",
      reference: "Code 5.02 · 5.03 · ne jamais mélanger",
      controle: {
        enonce: "Vous allez récupérer un fluide dans un cylindre qui contient déjà un reste d'un autre fluide, non identifié. Que faites-vous ?",
        choix: [
          "Je complète avec le nouveau fluide, le tri se fera plus tard",
          "Je prends un autre cylindre : mélanger deux fluides rend le contenu impossible à recycler ou à régénérer",
          "Je mélange, la régénération sépare de toute façon les fluides ensuite",
          "Je note simplement les deux fluides sur l'étiquette",
        ],
        bonne: 1,
        explication: "Un cylindre ne doit contenir qu'un seul fluide identifié. Un mélange de deux fluides différents devient impossible à recycler ou à régénérer : il part en destruction, aux frais de l'entreprise.",
      },
      piege: "<p>Deux fluides différents dans le même cylindre, et le contenu devient <b>impossible à recycler ou à régénérer</b> : il part en destruction, aux frais de l'entreprise. Un cylindre, un fluide, une étiquette.</p>",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour le détail, ou enchaîner sur la pesée, la charge et le stockage.",
});

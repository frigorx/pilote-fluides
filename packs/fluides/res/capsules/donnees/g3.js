/* Capsule g3 — « Contrôles avant mise en service » (G3 · codes 3.01 → 3.05).
   Contenu repris SANS AJOUT de la fiche g3 de cartes.js : découpé pour
   l'oral, mis en animation. Aucune valeur chiffrée nouvelle. */
CAPSULE.declarer({
  id: "g3",
  fiche: "g3",
  titre: "Contrôles avant mise en service",
  surtitre: "HABILITATION FLUIDES · G3 · CODES 3.01 → 3.05",
  duree: "environ 8 minutes",
  intro: "Une installation neuve ne démarre pas avant d'avoir passé deux épreuves de pression et un tirage au vide. Voici ces contrôles expliqués geste par geste, à voix haute.",
  codes: [
    { code: "3.01", libelle: "Réaliser une épreuve de pression de résistance" },
    { code: "3.02", libelle: "Réaliser une épreuve de pression d'étanchéité" },
    { code: "3.03", libelle: "Utiliser une pompe à vide" },
    { code: "3.04", libelle: "Faire le vide : évacuer l'air et l'humidité" },
    { code: "3.05", libelle: "Consigner le registre et rédiger le rapport d'essais" },
  ],

  visuelAccueil: {
    motif: "sequence",
    titre: "Avant que la machine ne tourne",
    etapes: [
      { titre: "Résistance", texte: "l'assemblage tient mécaniquement" },
      { titre: "Étanchéité", texte: "rien ne passe" },
      { titre: "Tirage au vide", texte: "air et humidité évacués" },
      { titre: "Consignation", texte: "registre et rapport d'essais" },
    ],
    pied: "Quatre étapes, toujours dans cet ordre, avant la mise en service.",
  },

  ecrans: [
    {
      id: "deux-epreuves",
      titre: "Deux épreuves, deux buts",
      note: "Le point de départ",
      visuel: { svg: "epreuve-azote.svg", alt: "Montage de l'épreuve de pression : bouteille d'azote, manifold, circuit — oxygène et air comprimé barrés." },
      texte: "<p>Avant qu'une installation ne démarre, deux épreuves de pression vérifient le circuit. L'<b>épreuve de résistance</b> contrôle que l'assemblage tient mécaniquement. L'<b>épreuve d'étanchéité</b> contrôle qu'il ne laisse rien passer.</p><p>Les pressions d'épreuve se lisent sur la <b>documentation du constructeur</b> et la norme applicable — jamais à l'estime.</p>",
      dire: "Avant qu'une installation neuve ne démarre, elle passe par deux épreuves de pression, souvent enchaînées l'une après l'autre. La première est l'épreuve de résistance : elle vérifie que l'assemblage tient mécaniquement, qu'il supporte la pression sans casser. La seconde est l'épreuve d'étanchéité : elle vérifie que le circuit ne laisse rien passer, pas la moindre fuite. Dans les deux cas, la pression à appliquer ne se devine pas : elle se lit sur la documentation du constructeur et sur la norme applicable.",
      reference: "Code 3.01 · 3.02 · les deux épreuves",
    },

    {
      id: "azote-seul",
      titre: "Le geste qui ne se discute pas : l'azote, seul",
      note: "Règle absolue",
      visuel: {
        motif: "checklist",
        titre: "Le gaz d'épreuve : un seul choix possible",
        items: [
          { titre: "Azote sec", texte: "le seul gaz autorisé pour mettre un circuit en pression" },
          { titre: "Oxygène", texte: "interdit : explosif au contact de l'huile du circuit", refus: true },
          { titre: "Air comprimé", texte: "interdit : il apporte de l'humidité et contient de l'oxygène", refus: true },
        ],
        pied: "Ce geste ne se discute pas et ne se découvre pas : il s'impose.",
      },
      texte: "<p>Toute mise en pression se fait à l'<b>azote</b>, et à l'azote seulement.</p><p><b>Jamais d'oxygène</b> : au contact de l'huile du circuit, le mélange est explosif. <b>Jamais d'air comprimé</b> : il apporte de l'humidité et contient de l'oxygène.</p>",
      dire: "Pour gonfler un circuit avant de l'éprouver, un seul gaz est permis : l'azote. Et l'oxygène, alors ? Le circuit contient toujours de l'huile, et oxygène et huile ensemble peuvent exploser. Et l'air du compresseur de l'atelier ? Refusé lui aussi, pour deux raisons : il fait entrer de l'eau dans le circuit, et il renferme lui aussi de l'oxygène. Il n'y a donc aucune exception à chercher : bouteille d'azote, et rien d'autre. Reste à savoir comment lire le résultat de l'épreuve : c'est l'écran suivant.",
      retenir: ["Toute mise en pression se fait à l'<b>azote</b>, seul.", "Jamais d'oxygène — mélange explosif au contact de l'huile. Jamais d'air comprimé — humidité et oxygène."],
      reference: "Code 3.01 · 3.02 · le gaz d'épreuve",
      controle: {
        enonce: "Vous devez réaliser une épreuve de pression sur un circuit neuf. Quel gaz utilisez-vous ?",
        choix: [
          "De l'air comprimé, c'est le plus disponible en atelier",
          "De l'oxygène, il est déjà sur le chariot de brasage",
          "De l'azote sec",
          "Le fluide frigorigène de l'installation",
        ],
        bonne: 2,
        explication: "Azote sec uniquement. L'oxygène en présence d'huile peut provoquer une explosion ; l'air comprimé apporte de l'humidité et de l'oxygène ; le fluide frigorigène ne se rejette jamais à l'atmosphère.",
      },
    },

    {
      id: "lire-la-stabilite",
      titre: "Conclure l'épreuve d'étanchéité",
      note: "Stable, ou en chute",
      visuel: {
        motif: "sequence",
        titre: "Conclure l'épreuve d'étanchéité",
        etapes: [
          { titre: "Relever", texte: "la pression d'azote au manomètre, au début de l'essai" },
          { titre: "Attendre", texte: "la durée prévue par le constructeur" },
          { titre: "Comparer", texte: "stable : le circuit est étanche" },
        ],
        pied: "Une chute de pression, même minime, signale une fuite quelque part dans le circuit.",
      },
      texte: "<p>On relève la pression d'azote au <b>manomètre</b> au début de l'essai, puis on attend la durée prévue. Si la pression reste <b>stable</b> pendant toute cette durée, le circuit est déclaré étanche.</p><p>À l'inverse, une <b>chute de pression</b> signale une fuite quelque part dans le circuit, même si elle est minime.</p>",
      dire: "Tout se joue sur une comparaison entre deux lectures. Au départ de l'épreuve, vous notez ce qu'affiche le manomètre, l'appareil qui mesure la pression d'azote. Ensuite, vous laissez passer le temps prévu par le constructeur. Si l'aiguille n'a pas bougé du début à la fin, le circuit est étanche. Si elle a baissé, même très peu, c'est qu'une fuite existe, à un endroit ou à un autre du circuit. Deux issues, donc : stable, ou en baisse. L'écran suivant montre pourtant un piège dans cette lecture.",
      reference: "Code 3.02 · lire l'épreuve d'étanchéité",
    },

    {
      id: "piege-temperature",
      titre: "Une pression qui bouge n'est pas toujours une fuite",
      note: "Le piège de l'examen",
      visuel: {
        motif: "alerte",
        titre: "Une pression qui bouge n'est pas toujours une fuite",
        vignettes: [
          { picto: "🌡", etiquette: "ce qui arrive", titre: "L'atelier change de température", texte: "la pression de l'azote suit, un peu, même sans fuite" },
          { picto: "❓", etiquette: "ce qu'on pourrait croire", titre: "Une fuite", texte: "en voyant l'aiguille bouger sur un seul relevé" },
          { picto: "🔎", etiquette: "le bon réflexe", titre: "Regarder la tendance", texte: "sur toute la durée de l'épreuve, pas un chiffre isolé" },
        ],
        pied: "Face à une petite variation, on corrige avant de conclure trop vite à une fuite.",
      },
      texte: "<p>Un piège classique : la <b>température de l'atelier</b> fait elle aussi varier la pression, sans qu'il y ait de fuite.</p><p>Dans un circuit fermé, la pression de l'azote <b>augmente</b> un peu quand l'air ambiant se réchauffe, et <b>diminue</b> un peu quand il refroidit. On regarde donc la <b>tendance</b> sur toute la durée de l'épreuve, pas un seul chiffre isolé.</p>",
      dire: "Pendant une épreuve à l'azote, l'aiguille du manomètre peut bouger sans qu'il y ait la moindre fuite. La raison est simple : l'azote enfermé réagit à la température de l'atelier. Il pousse un peu plus quand l'air se réchauffe, un peu moins quand il se refroidit. Conclure à une fuite sur une petite baisse au petit matin, c'est se tromper. La bonne lecture consiste à suivre l'évolution sur toute la durée de l'épreuve, en gardant la température en tête, et non à juger sur une seule valeur. C'est un piège qu'on retrouve souvent à l'examen.",
      retenir: ["On regarde la <b>tendance</b> sur toute la durée de l'épreuve, jamais un chiffre isolé.", "La température ambiante fait un peu varier la pression, même sans fuite."],
      reference: "Code 3.02 · le piège de la température",
      controle: {
        enonce: "Pendant une épreuve d'étanchéité, vous voyez la pression d'azote remonter légèrement alors que personne n'a touché au circuit. Que faites-vous ?",
        choix: [
          "Je conclus aussitôt à une fuite et je démonte le circuit",
          "Je vérifie si la température de l'atelier a changé, et je regarde la tendance sur toute la durée de l'épreuve",
          "J'ajoute de l'azote pour compenser la variation",
          "J'arrête l'épreuve, elle est ratée",
        ],
        bonne: 1,
        explication: "La pression d'un circuit fermé suit un peu la température ambiante, sans que cela signale une fuite. Le bon réflexe est de suivre la tendance sur toute la durée de l'épreuve, pas un relevé isolé — une chute franche et continue, elle, reste le signe d'une fuite.",
      },
    },

    {
      id: "tirage-au-vide",
      titre: "Le tirage au vide : chasser l'air et l'humidité",
      note: "Après l'épreuve",
      visuel: { svg: "tirage-au-vide.svg", alt: "Le montage du tirage au vide : circuit, vacuomètre, vanne d'isolement, pompe à vide. La courbe du vide dans le temps : un palier bas et stable montre un tirage réussi ; un palier qui remonte après l'isolement signale une fuite." },
      texte: "<p>Vient ensuite le <b>tirage au vide</b>. Il ne sert pas à « faire propre » : il extrait l'<b>air</b> — incondensable, il fait monter la haute pression — et l'<b>humidité</b>, qui gèle au détendeur et attaque l'huile.</p><p>Sous vide, l'eau bout à température ambiante : c'est exactement ce qu'on cherche à provoquer.</p>",
      dire: "Vient ensuite le tirage au vide. Il ne sert pas à « faire propre », contrairement à ce qu'on pourrait croire. Il extrait deux choses précises. D'abord l'air, qui est incondensable et qui fait monter la haute pression de la machine. Ensuite l'humidité, qui gèle au détendeur et qui attaque l'huile du circuit. Sous vide, l'eau se met à bouillir à température ambiante : c'est exactement l'effet recherché, c'est ce qui permet de l'évacuer.",
      reference: "Code 3.03 · 3.04 · le tirage au vide",
    },

    {
      id: "vide-qui-remonte",
      titre: "Un vide qui tient, un vide qui remonte",
      note: "Le vide se surveille",
      visuel: {
        motif: "duo",
        titre: "Un vide qui tient, un vide qui remonte",
        cartes: [
          { titre: "LE VIDE TIENT", picto: "✓", pour: "Le résultat attendu", texte: "Après avoir isolé la pompe, la lecture reste basse et stable." },
          { titre: "LE VIDE REMONTE", picto: "✗", pour: "Il y a un problème", texte: "La pression remonte après l'isolement : fuite, ou humidité résiduelle." },
        ],
        lien: "≠",
        pied: "Un tirage au vide réussi, c'est un vide qui tient — pas un chiffre atteint une seule fois.",
      },
      texte: "<p>Après avoir isolé la pompe, on <b>surveille</b> : si le vide remonte, il y a une fuite ou de l'humidité résiduelle. Un tirage au vide réussi, c'est un vide qui <b>tient</b>.</p><p>Valeurs cibles et durées : selon la documentation du constructeur, à faire valider.</p>",
      dire: "Une fois la pompe isolée par sa vanne, on ne s'arrête pas là : on surveille. Si le vide remonte, c'est le signe d'une fuite, ou d'une humidité résiduelle qui continue à dégazer dans le circuit. Un tirage au vide réussi, ce n'est donc pas un chiffre atteint un court instant : c'est un vide qui tient dans la durée. Les valeurs à atteindre et la durée du tirage se trouvent dans la documentation du constructeur, jamais devinées.",
      retenir: ["Un tirage au vide réussi, c'est un vide qui <b>tient</b> dans la durée, pas un chiffre atteint une fois.", "Valeurs cibles et durée : toujours dans la documentation du constructeur."],
      reference: "Code 3.03 · 3.04 · lire le vide",
    },

    {
      id: "localiser-et-consigner",
      titre: "Trouver la fuite, puis consigner",
      note: "À emporter",
      visuel: {
        motif: "flux",
        titre: "Après une chute de pression : localiser, puis consigner",
        boites: [
          { picto: "🧴", titre: "Eau savonneuse", texte: "raccord par raccord, brasure par brasure" },
          { picto: "🫧", titre: "La bulle", texte: "elle grossit : c'est exactement là que ça fuit", teinte: "danger" },
          { picto: "📋", titre: "Le registre", texte: "et le rapport d'essais, à jour", teinte: "ok" },
        ],
        pied: "Localiser vient après avoir constaté une chute de pression ; consigner vient après avoir conclu.",
      },
      texte: "<p>Si la pression chute, on cherche la fuite <b>raccord par raccord et brasure par brasure</b>, en badigeonnant de l'<b>eau savonneuse</b>. Une bulle qui grossit indique l'endroit exact de la fuite.</p><p>Enfin, on <b>consigne</b> : registre et rapport d'essais font partie du geste professionnel.</p>",
      dire: "Si la pression a chuté, reste à trouver où. On cherche la fuite raccord par raccord et brasure par brasure, en badigeonnant de l'eau savonneuse au pinceau ou au pulvérisateur. Une bulle qui apparaît et qui grossit indique l'endroit exact de la fuite. Ce geste simple, sans appareil, vient après le contrôle de stabilité de la pression : il sert à localiser précisément une fuite déjà détectée, pas à la détecter elle-même. Et pour finir, un geste qui fait partie du métier autant que les autres : on consigne. Le registre et le rapport d'essais se remplissent, à chaque fois.",
      reference: "Code 3.02 · 3.05 · localiser et consigner",
      piege: "<p>Toute mise en pression se fait à l'<b>azote</b>, et à l'azote seulement. Jamais d'oxygène — au contact de l'huile du circuit, le mélange est explosif. Jamais d'air comprimé — il apporte de l'humidité et contient de l'oxygène. Ce geste ne se discute pas.</p>",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour relire le détail, ou enchaîner sur les contrôles d'étanchéité.",
});

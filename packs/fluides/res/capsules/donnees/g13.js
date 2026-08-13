/* Capsule g13 — « CO₂ et NH₃ — reconnaître, ne pas intervenir »
   (G13 · G14, information et sensibilisation). Contenu repris SANS AJOUT
   de la fiche g13 de cartes.js : découpé pour l'oral, mis en animation.
   Aucune valeur chiffrée nouvelle. Module volontairement court et NON
   évaluant dans la fiche source : la capsule reste courte elle aussi. */
CAPSULE.declarer({
  id: "g13",
  fiche: "g13",
  titre: "CO₂ et NH₃ — reconnaître, ne pas intervenir",
  surtitre: "HABILITATION FLUIDES · G13 · G14 · INFORMATION ET SENSIBILISATION",
  duree: "environ 5 minutes",
  intro: "Ce module ne vous qualifie pas pour intervenir sur le CO₂ ou l'ammoniac. Il vous apprend à les reconnaître, et à savoir qu'il faut s'arrêter là.",
  codes: [
    { code: "13.01", libelle: "Reconnaître une installation CO₂ et ses risques (pression)" },
    { code: "13.04", libelle: "Identifier les cylindres et matériels dédiés, et ne pas intervenir" },
    { code: "14.01", libelle: "Reconnaître une installation NH₃ et la conduite à tenir" },
    { code: "1.09", libelle: "Connaître les pressions élevées du CO₂, son diagramme log p/h, ses tables de saturation et le risque de glace carbonique." },
    { code: "13.14", libelle: "Vérifier avant d'intervenir que la signalisation, les issues de secours, les capteurs et les alarmes du site sont bien en état." },
  ],

  visuelAccueil: { svg: "co2-nh3-compare.svg", alt: "Deux comportements inverses : le CO₂, A1 et sans odeur, est plus lourd que l'air et descend (catégorie B) ; l'ammoniac, B2L et piquant, est plus léger que l'air et monte (catégorie C)." },

  ecrans: [
    {
      id: "reconnaitre-ne-pas-intervenir",
      titre: "Reconnaître, et ne pas intervenir",
      note: "Ce que ce module attend de vous",
      visuel: {
        motif: "alerte",
        titre: "Trois réflexes, pas plus",
        vignettes: [
          { picto: "👁", etiquette: "on vous demande", titre: "Reconnaître", texte: "une installation au CO₂ ou à l'ammoniac" },
          { picto: "✋", etiquette: "on vous demande", titre: "Ne pas toucher", texte: "même avec une attestation A 1 ou A 2" },
          { picto: "📣", etiquette: "si une fuite survient", titre: "Alerter", texte: "et laisser faire les personnes qualifiées" },
        ],
        pied: "Ce module informe, il ne vous qualifie pas.",
      },
      texte: "<p>Ce module <b>informe</b>, il ne qualifie pas. Une attestation A1 ou A2 ne donne <b>aucun droit d'intervention</b> sur une installation au CO₂ (catégorie B) ou à l'ammoniac (catégorie C).</p><p>Ce qu'on attend ici : <b>reconnaître</b> et <b>ne pas toucher</b>.</p>",
      dire: "Commençons par l'idée qui commande tout le reste. Ce module informe, il ne qualifie pas. Une attestation A 1 ou A 2 ne donne aucun droit d'intervention sur une installation au CO2, qui relève de la catégorie B, ou à l'ammoniac, qui relève de la catégorie C. Ce qu'on attend de vous ici, ce n'est pas de savoir intervenir : c'est de reconnaître ces installations, et de ne pas y toucher.",
      reference: "Code 13.04 · l'idée à retenir avant tout le reste",
    },

    {
      id: "deux-fluides-opposes",
      titre: "Deux fluides, deux comportements inverses",
      note: "CO₂ et ammoniac",
      visuel: {
        motif: "duo",
        titre: "Ce qui les oppose",
        cartes: [
          { titre: "LE CO₂ (R-744)", picto: "⬇", pour: "catégorie B", texte: "classé A1, sans odeur, plus lourd que l'air : il descend" },
          { titre: "L'AMMONIAC (R-717)", picto: "⬆", pour: "catégorie C", texte: "classé B2L, odeur piquante, plus léger que l'air : il monte" },
        ],
        lien: "≠",
        pied: "Deux comportements inverses, deux catégories d'attestation séparées.",
      },
      texte: "<p>Le <b>CO₂</b> — classé <b>A1</b> — est <b>plus lourd que l'air</b> : il descend, catégorie B. L'<b>ammoniac</b> — classé <b>B2L</b> — est <b>plus léger</b> : il monte, catégorie C.</p><p>Les catégories ne se remplacent pas : « je suis A1, donc je peux aider sur une fuite d'ammoniac » est <b>faux</b>.</p>",
      dire: "Deux fluides, deux comportements inverses. Le CO2, classé A 1, n'a pas d'odeur et il est plus lourd que l'air : il descend. C'est la catégorie B. L'ammoniac, classé B 2 L, a une odeur piquante et il est plus léger que l'air : il monte. C'est la catégorie C. Retenez bien ceci : les catégories ne se remplacent pas les unes les autres. Se dire « je suis A 1, donc je peux donner un coup de main sur une fuite d'ammoniac » est faux : il faut la catégorie C, sans exception.",
      retenir: ["Le <b>CO₂ descend</b>, l'<b>ammoniac monte</b> : deux comportements inverses.", "Catégorie <b>B</b> pour le CO₂, catégorie <b>C</b> pour l'ammoniac — une catégorie ne remplace jamais l'autre."],
      reference: "Code 14.01 · reconnaître lequel",
      controle: {
        enonce: "L'ammoniac (R-717) est classé dans quelle classe de sécurité ?",
        choix: [
          "A1 — non toxique, non inflammable",
          "A2L — faiblement inflammable",
          "B2L — toxique et faiblement inflammable",
          "B3 — toxique et très inflammable",
        ],
        bonne: 2,
        explication: "B2L : la lettre B signale la toxicité, le 2L une inflammabilité faible à propagation lente. Le cumul des deux dangers explique que l'ammoniac relève d'une catégorie d'attestation dédiée.",
      },
    },

    {
      id: "co2-ce-qu-il-cache",
      titre: "Le CO₂ : une classe qui cache ses dangers",
      note: "A1 ne veut pas dire sans danger",
      visuel: {
        motif: "checklist",
        titre: "Ce qu'un simple « A1 » ne dit pas",
        items: [
          { titre: "Pression", texte: "très élevée, bien au-delà des fluides classiques" },
          { titre: "Atmosphère irrespirable", texte: "en local fermé : il s'accumule en bas" },
          { titre: "Neige carbonique", texte: "à la détente : brûlure par le froid, et bouchon" },
        ],
        pied: "Trois dangers qu'un simple « A1 » ne dit pas.",
      },
      texte: "<p>Le <b>CO₂</b> est classé <b>A1</b> : toxicité faible, non inflammable, <b>PRP = 1</b>. Cette classe n'annonce aucun de ses vrais dangers : la <b>pression</b>, l'<b>atmosphère irrespirable</b> en local fermé, et la <b>neige carbonique</b> à la détente.</p><p>En transcritique, le condenseur laisse la place à un <b>refroidisseur de gaz</b>. Les cylindres, à double vanne, ne se raccordent pas au matériel courant.</p>",
      dire: "Le CO2, le R-744, est classé A 1 : toxicité faible, non inflammable, un P R P de 1. Cette classe n'annonce aucun de ses vrais dangers : la pression, très élevée, l'atmosphère irrespirable en local fermé — il est plus lourd que l'air, s'accumule en point bas, et agit sur la respiration — et le risque de neige carbonique à la détente. En transcritique, le condenseur laisse la place à un refroidisseur de gaz. Les cylindres, à double vanne, ne se raccordent pas au matériel courant.",
      reference: "Code 13.01 · ce que la classe ne dit pas",
    },

    {
      id: "glace-carbonique",
      titre: "La glace carbonique : un double danger",
      note: "Brûlure et bouchon",
      visuel: {
        motif: "flux",
        titre: "À la détente à l'air libre",
        boites: [
          { picto: "💨", titre: "Le CO₂ se détend", texte: "il passe directement à l'état solide" },
          { picto: "🥶", titre: "Brûlure par le froid", texte: "au contact de la peau", teinte: "danger" },
          { picto: "🚫", titre: "Bouchon solide", texte: "obstrue une vanne ou une tuyauterie", teinte: "danger" },
        ],
        pied: "Ce domaine de pression propre au CO₂ se lit sur son diagramme log p/h.",
      },
      texte: "<p>La <b>glace carbonique</b> — ou neige carbonique — se forme quand le CO₂ passe directement de l'état gazeux à l'état solide, à la détente à l'air libre.</p><p>Double danger : une <b>brûlure par le froid</b> au contact de la peau, et un <b>bouchon solide</b> qui obstrue une vanne ou une tuyauterie.</p>",
      dire: "La glace carbonique, un double danger. Elle se forme quand le CO2 passe directement de l'état gazeux à l'état solide, à la détente à l'air libre : c'est le domaine de pression propre au CO2, visible sur son diagramme log p sur h, qui explique ce comportement que les fluides courants n'ont pas. On garde en tête le double danger à chaque détente de CO2 à l'air libre : la brûlure par le froid au contact de la peau, et le bouchon solide qui peut obstruer une vanne ou une tuyauterie. Le diagramme log p sur h et les tables de saturation du CO2 se lisent comme ceux de tout autre fluide, mêmes repères de bulle et de rosée, mais dans un domaine de pression qui lui est propre.",
      retenir: ["Glace carbonique : <b>brûlure par le froid ET bouchon solide</b>, les deux à la fois.", "C'est le <b>domaine de pression propre au CO₂</b> qui explique ce comportement — les fluides courants ne l'ont pas."],
      reference: "Code 1.09 · le comportement propre au CO₂",
    },

    {
      id: "ammoniac-l-odeur-qui-trompe",
      titre: "L'ammoniac : une odeur qui ne suffit pas",
      note: "Alerter, évacuer, ne jamais intervenir seul",
      visuel: {
        motif: "alerte",
        titre: "Ce que l'odeur ne remplace pas",
        vignettes: [
          { picto: "⚠", etiquette: "à ne pas oublier", titre: "Elle s'émousse", texte: "à forte concentration, le nez trompe" },
          { picto: "👃", etiquette: "ce qui rassure", titre: "Une odeur piquante", texte: "perceptible très tôt" },
          { picto: "📣", etiquette: "la seule conduite", titre: "Alerter, évacuer", texte: "jamais intervenir seul" },
        ],
        pied: "On ne se fie jamais à son nez pour décider.",
      },
      texte: "<p>L'<b>ammoniac</b> est le fluide du froid industriel — agroalimentaire, entrepôts — <b>jamais du résidentiel</b>. Son odeur piquante se perçoit très tôt, mais elle <b>ne remplace aucune mesure</b>, et elle <b>s'émousse à forte concentration</b>.</p><p>En cas de fuite : <b>alerter, évacuer, ne jamais intervenir seul</b>.</p>",
      dire: "L'ammoniac, le R-717, classé B 2 L : toxique et faiblement inflammable. C'est le fluide du froid industriel — agroalimentaire, entrepôts — jamais du résidentiel. Son odeur piquante se perçoit très tôt : c'est plutôt rassurant. Mais elle ne remplace aucune mesure, et elle s'émousse à forte concentration : on ne se fie jamais à son nez pour décider. En cas de fuite, la conduite est toujours la même : on alerte, on évacue, on n'intervient jamais seul.",
      reference: "Code 14.01 · la conduite à tenir",
      controle: {
        enonce: "Vous percevez une forte odeur d'ammoniac près d'une installation industrielle. Que faites-vous ?",
        choix: [
          "Je m'approche pour évaluer l'ampleur de la fuite : l'odeur me guidera.",
          "J'alerte, j'évacue, et je n'interviens jamais seul — même si je suis titulaire d'une attestation A1 ou A2.",
          "Je retiens ma respiration et je coupe l'arrivée du fluide.",
          "Comme l'odeur est là, il n'y a pas encore de danger réel.",
        ],
        bonne: 1,
        explication: "L'odeur piquante de l'ammoniac se perçoit tôt, mais elle ne remplace aucune mesure et s'émousse à forte concentration : elle ne dit pas quand s'arrêter. Intervenir sur une fuite d'ammoniac relève de la catégorie C, jamais des catégories A1 ou A2. La seule conduite est d'alerter, d'évacuer, et de ne jamais intervenir seul.",
      },
    },

    {
      id: "reflexe-d-arrivee",
      titre: "Avant de commencer : trois contrôles",
      note: "À emporter",
      visuel: {
        motif: "checklist",
        titre: "Le réflexe d'arrivée sur site",
        items: [
          { titre: "Signalisation", texte: "visible et à jour à l'entrée" },
          { titre: "Issues de secours", texte: "dégagées, jamais encombrées" },
          { titre: "Capteurs et alarmes", texte: "en état de marche, pas seulement présents" },
        ],
        pied: "Ce réflexe fait partie du travail, au même titre que le port du matériel de protection.",
      },
      texte: "<p>Avant de commencer une intervention sur un site au CO₂ ou à l'ammoniac : <b>signalisation</b> en place, <b>issues de secours</b> dégagées, <b>capteurs et alarmes</b> fonctionnels.</p>",
      dire: "Pour finir, le réflexe d'arrivée sur site. Avant de commencer une intervention sur un site au CO2 ou à l'ammoniac, on prend un instant pour vérifier ce qui est déjà en place. La signalisation à l'entrée du local doit être visible et à jour. Les issues de secours doivent rester dégagées, pour permettre une évacuation rapide en cas de fuite. Et on contrôle que les capteurs de gaz et les alarmes qui leur sont associées sont en état de marche, pas seulement présents dans le local. Reconnaître, et ne pas intervenir : c'est tout ce que ce module vous demande.",
      piege: "<p>Le CO₂ est A1 du point de vue toxicité et inflammabilité — cela ne dit rien de ses deux vrais risques : la <b>pression</b>, et l'<b>anoxie</b> en local fermé. Et le <b>B</b> de B2L signifie <b>toxique</b> : ne pas relâcher la vigilance sur l'ammoniac sous prétexte que son inflammabilité est faible.</p>",
      reference: "Code 13.14 · le réflexe d'arrivée",
    },
  ],

  motFin: "Vous pouvez revenir à la fiche pour le détail, ou poursuivre sur la protection concrète contre le CO₂ — détection, ppm, EPC et EPI.",
});

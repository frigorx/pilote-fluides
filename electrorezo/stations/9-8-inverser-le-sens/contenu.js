/* ÉlectroRézo 9.8 — Inverser le sens d'un moteur monophasé.
   Modèle « geste de métier » : on apprend à croiser les deux fils d'UN SEUL enroulement
   (l'auxiliaire ou le principal), à ne jamais échanger un fil du principal avec un fil de l'auxiliaire, et à reconnaître
   les cas où rien ne se croise (compresseur hermétique à trois bornes, spire de Frager).
   Aucune valeur n'est donnée. Aucun fait hors de LIGNE-9-FAITS-LOT-3.md et des énoncés de
   LIGNE-9-LOT-3-ENONCES.md. Les schémas n'ont pas de flèche de rotation : le texte dit le sens.
   Pas de vue 3D. Sources : voir SOURCES.md. */

/* Les deux schémas côte à côte (exemple résolu). */
function deuxSchemas98() {
  const d = document.createElement('div');
  d.style.cssText = 'display:flex;flex-wrap:wrap;gap:.6rem;align-items:flex-start';
  [['assets/sens-avant.svg',
    "Schéma du moteur monophasé avant le croisement. Les deux fils du haut sont ceux du principal : l’un va à l’alimentation, à gauche, l’autre au point commun C. Les deux fils de droite sont ceux de l’auxiliaire : le fil du haut va au point commun C, le fil du bas va à l’alimentation, à droite.",
    "Avant : le fil du haut de l’auxiliaire va à C."],
   ['assets/sens-apres.svg',
    "Schéma du même moteur après le croisement. Le principal n’a pas changé. Les deux fils de l’auxiliaire sont croisés : le fil du haut va maintenant à l’alimentation, à droite, et le fil du bas va au point commun C. Le repère « fils croisés » est écrit près du croisement.",
    "Après : les deux fils de l’auxiliaire sont croisés."]
  ].forEach(([src, alt, legende]) => {
    const f = document.createElement('figure');
    f.style.cssText = 'flex:1 1 240px;max-width:340px;margin:.4rem 0';
    const i = document.createElement('img');
    i.src = src; i.alt = alt; i.loading = 'lazy';
    const c = document.createElement('figcaption');
    c.className = 'legende'; c.textContent = legende;
    f.append(i, c);
    d.appendChild(f);
  });
  return d;
}

/* Un schéma seul, avec sa légende (questions guidées). */
function unSchema98(src, alt, legende) {
  const f = document.createElement('figure');
  f.style.cssText = 'max-width:340px;margin:.4rem 0';
  const i = document.createElement('img');
  i.src = src; i.alt = alt; i.loading = 'lazy';
  i.style.cssText = 'display:block;width:100%;height:auto';
  const c = document.createElement('figcaption');
  c.className = 'legende'; c.textContent = legende;
  f.append(i, c);
  return f;
}

/* Temps 5 : les deux schémas de la question 1, avec des légendes neutres (la légende « après » dirait la réponse). */
function schemasQuestion98() {
  const d = document.createElement('div');
  d.style.cssText = 'display:flex;flex-wrap:wrap;gap:.6rem;align-items:flex-start';
  d.appendChild(unSchema98('assets/sens-avant.svg', ALT_AVANT_98, "Le premier schéma."));
  d.appendChild(unSchema98('assets/sens-apres.svg', ALT_APRES_98, "Le second schéma."));
  return d;
}

const ALT_AVANT_98 = "Schéma d’un moteur monophasé à quatre fils sortis. Les deux fils du haut sont ceux du principal : l’un va à l’alimentation, à gauche, l’autre au point commun C. Les deux fils de droite sont ceux de l’auxiliaire : le fil du haut va au point commun C, le fil du bas va à l’alimentation, à droite.";
const ALT_APRES_98 = "Le même schéma, avec les deux fils de l’auxiliaire croisés : le fil du haut va maintenant à l’alimentation, à droite, et le fil du bas va au point commun C. Les fils du principal n’ont pas bougé. Le repère « fils croisés » est écrit près du croisement.";
const ALT_BORNIER_98 = "Le bornier d’un compresseur hermétique monophasé, vu de face : trois vis repérées 1, 2 et 3, et à côté le Klixon, relié à la borne 1 par un trait.";

ModelePratique.construire({
  id: '9.8', ligne: 9,
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 8',
  titre: "Inverser le sens d’un moteur monophasé",
  narration: NARRATION,

  prerequis: [
    { id: '2.6', quoi: "inverser le sens d’un moteur triphasé" },
    { id: '9.2', quoi: "le principal et l’auxiliaire" },
    { id: '6.7', quoi: "consigner avant de toucher" }
  ],

  codes: {
    referentiel: 'CAP IFCA — référentiel de certification',
    lignes: [
      ['Compétence', 'C3.6', "Câbler, repérer, connecter les liaisons électriques et électroniques"],
      ['Compétence', 'C3.7', "Contrôler la mise en œuvre des équipements électriques et fluidiques"],
      ['Tâche', 'T10', "Repérer, raccorder, assembler les réseaux fluidiques, aérauliques et électriques"],
      ['Tâche', 'T11', "Contrôler les circuits hors fonctionnement"],
      ['Savoir', 'S5.6', "Réseaux, matériels électriques et de régulation"],
      ['Savoir', 'S6.2', "Principaux risques et moyens de prévention"]
    ],
    note: 'Le lien précis entre une tâche et une compétence n’est pas tabulé au référentiel : les tâches sont rattachées par leur activité (Installation).'
  },

  photos: [
    { src: 'assets/sens-avant.svg', alt: ALT_AVANT_98,
      titre: "Avant le croisement.", sous: "Le moteur tourne dans un sens. Le fil du haut de l’auxiliaire va au point commun C." },
    { src: 'assets/sens-apres.svg', alt: ALT_APRES_98,
      titre: "Après le croisement.", sous: "On a croisé les deux fils de l’auxiliaire. Le moteur tourne dans l’autre sens." }
  ],
  creditPhoto: 'Schémas construits dans QElectroTech. Le schéma n’a pas de flèche de rotation : le texte dit le sens. Détail dans « Crédits ».',

  question: "Un moteur monophasé tourne dans le mauvais sens. Quels fils faut-il changer de place ?",
  aQuoiCaSert: "Faire tourner un moteur monophasé dans l’autre sens. On croise les deux fils d’un seul enroulement, l’auxiliaire ou le principal. Si on échange un fil du principal avec un fil de l’auxiliaire, le moteur grille, en général peu après la mise sous tension. Il y a aussi des cas où il n’y a rien à croiser.",
  ouOnLeTrouve: "Sur un moteur prévu pour deux sens, par exemple celui d’un compresseur ouvert (un compresseur qui n’est pas hermétique). Il a au moins quatre bornes, et son schéma de raccordement le dit. Ces moteurs sont peu fréquents aujourd’hui. Un compresseur hermétique n’a que trois bornes : on n’y croise rien.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasPratique.echelle({
    etapes: [
      { nom: 'Consigner et vérifier', quand: 'Avant de toucher à un fil.',
        outil: 'le sectionneur ouvert, un blocage mécanique et une pancarte, un vérificateur d’absence de tension',
        geste: 'Consignez le circuit (station 6.7), dans l’ordre : ' + ModelePratique.consignationEnUneLigne() + ' (la dernière opération seulement si elle est prescrite : elle n’est pas toujours requise en basse tension). Si le moteur a un condensateur, déchargez-le avec une résistance (station 9.5).',
        verifie: 'que vous pouvez toucher aux fils sans risque.',
        neVerifiePas: 'quel fil appartient à quel enroulement : c’est le travail des étapes suivantes.',
        attention: 'un condensateur reste chargé après la coupure. On le décharge avec une résistance, jamais avec un tournevis.' },
      { nom: 'Lire la plaque et le schéma de raccordement', quand: 'Moteur consigné, avant de débrancher un fil.',
        outil: 'la plaque signalétique du moteur et le couvercle de son bornier',
        geste: 'Lisez la plaque signalétique. Regardez ensuite à l’intérieur du couvercle du bornier : le schéma de raccordement s’y trouve souvent. Il dit si le moteur est prévu pour deux sens.',
        verifie: 'comment les fils du moteur sont raccordés aux bornes, et si le moteur est prévu pour deux sens.',
        neVerifiePas: 'la place de chaque fil sur votre moteur : il reste à les repérer, aux étapes 3 et 4.' },
      { nom: 'Repérer les deux fils d’un même enroulement', photo: 'assets/sens-avant.svg', alt: ALT_AVANT_98, quand: 'Moteur consigné, fils encore branchés.',
        outil: 'le schéma de raccordement',
        geste: 'Un moteur prévu pour deux sens a au moins quatre bornes. Certains en ont six, quand le moteur est bi-tension, c’est-à-dire prévu pour deux tensions. Sur le schéma de raccordement, cherchez les deux fils du principal, puis les deux fils de l’auxiliaire. Sur le schéma ci-dessus, le principal est en haut du moteur et l’auxiliaire à droite.',
        verifie: 'quels fils forment le principal, et quels fils forment l’auxiliaire.',
        neVerifiePas: 'quel enroulement croiser : on peut croiser l’auxiliaire ou le principal (étape 5).' },
      { nom: 'Repérer chaque fil', quand: 'Avant de débrancher le premier fil.',
        geste: 'Repérez chaque fil avant de le débrancher : de quel enroulement il vient, sur quelle borne il est branché. Sans repère, vous ne saurez plus où remettre un fil.',
        verifie: 'que chaque fil retrouvera sa place.' },
      { nom: 'Croiser les deux fils d’un seul enroulement', photo: 'assets/sens-apres.svg', alt: ALT_APRES_98, quand: 'Fils repérés, moteur toujours consigné.',
        geste: 'Croisez les deux fils de l’auxiliaire, ou ceux du principal : un seul des deux enroulements. Sur le schéma ci-dessus, ce sont les fils de l’auxiliaire. Le courant change de sens dans cet enroulement. Au démarrage, l’impulsion magnétique du démarrage change de sens aussi : le moteur tourne dans l’autre sens.',
        verifie: 'que les deux fils croisés sont ceux d’un même enroulement.' },
      { nom: 'Ne pas échanger les fils des deux enroulements', quand: 'À chaque fil qu’on rebranche.',
        outil: 'vos repères de l’étape 4',
        geste: 'N’échangez jamais un fil du principal avec un fil de l’auxiliaire : le moteur grille, en général peu après la mise sous tension. Chaque fil revient dans son enroulement.',
        verifie: 'que chaque fil est revenu dans son enroulement.',
        attention: 'ce sont deux gestes différents. Croiser les deux fils d’un même enroulement change le sens. Échanger un fil du principal avec un fil de l’auxiliaire fait griller le moteur, en général peu après la mise sous tension.' }
    ]
  }),

  technologie: [
    ["Le sens se décide au démarrage", "un moteur monophasé alimenté par un seul enroulement a un couple de démarrage nul : il ne démarre pas seul. Lancé à la main, il démarre et continue dans le sens où on l’a lancé. Sur un moteur à enroulement auxiliaire, c’est l’auxiliaire qui lance le moteur dans le sens prévu."],
    ["Croiser les deux fils d’un enroulement", "on croise les deux fils de l’auxiliaire, ou ceux du principal : un seul des deux. Le courant change de sens dans cet enroulement. Au démarrage, l’impulsion magnétique change de sens aussi, et le moteur tourne dans l’autre sens."],
    ["Phase et neutre", "permuter la phase et le neutre ne change pas le sens d’un moteur monophasé. En triphasé, on permute deux phases (station 2.6) : penser au triphasé conduit à cette erreur."],
    ["Deux gestes différents", "croiser les deux fils d’un même enroulement donne le sens. Échanger un fil du principal avec un fil de l’auxiliaire est un autre geste : le moteur grille, en général peu après la mise sous tension."],
    ["Avant de raccorder", "lisez la plaque signalétique et regardez dans le couvercle du bornier : le schéma de raccordement s’y trouve souvent."],
    ["Les moteurs à deux sens", "ils sont peu fréquents aujourd’hui. On les rencontre surtout sur les compresseurs ouverts. Ils ont au moins quatre bornes, parfois six pour un moteur bi-tension."]
  ],

  variantes: [
    "<strong>Un moteur prévu pour deux sens</strong> : il a au moins quatre bornes, et son schéma de raccordement le dit. On croise les deux fils d’un seul enroulement, l’auxiliaire ou le principal.",
    "<strong>Un moteur qui change souvent de sens</strong> : le principal et l’auxiliaire ont la même résistance. Chaque enroulement devient tour à tour l’auxiliaire ou le principal, selon le sens.",
    "<strong>Un compresseur hermétique</strong> : trois bornes, C, S et R. On ne croise rien : échanger un fil du principal avec un fil de l’auxiliaire fait griller le moteur, en général peu après la mise sous tension. Un compresseur scroll ne comprime que dans un sens.",
    "<strong>Un moteur à spire de Frager</strong> (station 9.6) : le sens est fixé par construction. Rien ne s’inverse au bornier.",
    "<strong>Un moteur triphasé</strong> : on permute deux phases (station 2.6)."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  titres: { objet: 'Avant et après le croisement', dedans: 'Croiser les deux fils d’un enroulement', variantes: 'Selon le moteur', symboles: 'Les deux schémas à lire', plan: 'Lire le schéma et le bornier', methode: 'La méthode, dans l’ordre' },

  exercices: {
    titre: 'Inverser, ou ne rien croiser',
    consigne: 'Sept exercices, sans note. Les premiers disent où regarder et comment faire ; les derniers, non. Le premier est déjà résolu : imitez-le.',
    items: [
      { mode: 'exemple',
        enonce: "Exemple du cours. On croise les deux fils de l’auxiliaire. Que se passe-t-il ?",
        figure: () => deuxSchemas98(),
        ou: "sur les deux schémas : les fils de l’auxiliaire, à droite du moteur. Regardez où va le fil du haut, avant et après.",
        comment: "suivez le fil du haut de l’auxiliaire. Sur le premier schéma, il va au point commun C. Sur le second, il va à l’alimentation. Les fils du principal restent à leur place.",
        resolu: "Le courant change de sens dans l’auxiliaire. L’impulsion magnétique du démarrage change de sens aussi : le moteur tourne dans l’autre sens." },

      { mode: 'guide',
        enonce: "Sur le même moteur, on croise les deux fils du principal au lieu de ceux de l’auxiliaire. Le sens change-t-il ?",
        figure: () => unSchema98('assets/sens-avant.svg', ALT_AVANT_98, "Les deux fils du principal sont en haut du moteur."),
        ou: "sur le schéma : les deux fils du principal, en haut du moteur. Relisez aussi la ligne 5 de la carte « La méthode, dans l’ordre ».",
        comment: "on croise toujours les deux fils d’un seul enroulement. Cherchez, à la ligne 5 de la même carte, quels enroulements on peut croiser.",
        choix: [
          { texte: "Non : seul l’auxiliaire compte.", pourquoi: "Le cours donne deux possibilités : croiser les deux fils de l’auxiliaire, ou ceux du principal." },
          { texte: "Le moteur grille.", pourquoi: "Le moteur grille, en général peu après la mise sous tension, quand on échange un fil du principal avec un fil de l’auxiliaire. Ici, les deux fils croisés sont ceux du même enroulement." },
          { texte: "Oui : on croise un seul enroulement, l’auxiliaire ou le principal.", juste: true },
          { texte: "Oui, mais il faut aussi permuter la phase et le neutre.", pourquoi: "Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé. Croiser un seul enroulement change déjà le sens." } ],
        confirmation: "Oui. On croise les deux fils d’un seul enroulement, l’auxiliaire ou le principal : le moteur tourne dans l’autre sens." },

      { mode: 'guide',
        enonce: "Un collègue propose de permuter la phase et le neutre à l’arrivée du moteur. Le sens change-t-il ?",
        figure: () => unSchema98('assets/sens-avant.svg', ALT_AVANT_98, "Les deux repères Alim. : l’arrivée de l’alimentation, la phase et le neutre."),
        ou: "sur le schéma : les deux repères Alim., en haut à gauche et à droite. Les enroulements viennent après.",
        comment: "pour changer le sens, on croise les deux fils d’un enroulement. Demandez-vous si permuter la phase et le neutre, à l’arrivée, croise les fils d’un enroulement.",
        choix: [
          { texte: "Oui, comme en triphasé.", pourquoi: "En triphasé, on permute deux phases (station 2.6). En monophasé, on change le sens en croisant les deux fils d’un enroulement." },
          { texte: "Le moteur grille.", pourquoi: "Le moteur grille, en général peu après la mise sous tension, quand on échange un fil du principal avec un fil de l’auxiliaire. Ici, on ne touche à aucun fil des enroulements." },
          { texte: "Le disjoncteur déclenche.", pourquoi: "La question est celle du sens. Permuter la phase et le neutre ne le change pas." },
          { texte: "Non : permuter la phase et le neutre ne change pas le sens d’un moteur monophasé.", juste: true } ],
        confirmation: "Non. Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé. Pour changer le sens, on croise les deux fils d’un enroulement." },

      { mode: 'guide',
        enonce: "Sur un bornier à quatre bornes, un élève échange un fil du principal avec un fil de l’auxiliaire. Que risque-t-il ?",
        ou: "dans l’énoncé : un fil du principal et un fil de l’auxiliaire, donc deux enroulements différents. Relisez la ligne 6 de la carte « La méthode, dans l’ordre ».",
        comment: "demandez-vous si les deux fils croisés sont ceux d’un même enroulement. Ici, ils viennent de deux enroulements. La ligne 6 dit ce que devient le moteur.",
        choix: [
          { texte: "Rien : le moteur tourne dans l’autre sens.", pourquoi: "Le moteur tourne dans l’autre sens quand on croise les deux fils d’un même enroulement. Ici, les fils viennent de deux enroulements." },
          { texte: "Le moteur grille, en général peu après la mise sous tension.", juste: true },
          { texte: "Rien : le moteur tourne comme avant, dans le même sens.", pourquoi: "Un échange entre un fil du principal et un fil de l’auxiliaire se termine en général par le grillage du moteur, peu après la mise sous tension." },
          { texte: "Le moteur démarre normalement : l’échange est sans danger.", pourquoi: "L’échange n’est pas sans danger : le moteur grille, en général peu après la mise sous tension." } ],
        confirmation: "Le moteur grille, en général peu après la mise sous tension. Croiser les deux fils d’un même enroulement donne le sens. Échanger un fil du principal avec un fil de l’auxiliaire fait griller le moteur." },

      { mode: 'seul',
        enonce: "Un compresseur hermétique monophasé tourne. Vous voulez inverser son sens. Que faites-vous ?",
        figure: () => unSchema98('assets/biblio/bornier-compresseur-3-bornes-klixon.png', ALT_BORNIER_98, "Le bornier d’un compresseur hermétique monophasé."),
        methodeVue: "Le bornier est dessiné ci-dessus : comptez ses vis. La ligne 3 de la carte « La méthode, dans l’ordre » dit combien de bornes a un moteur prévu pour deux sens.",
        choix: [
          { texte: "On ne croise rien : il a trois bornes, C, S et R, et échanger un fil du principal avec un fil de l’auxiliaire le fait griller, en général peu après la mise sous tension.", juste: true },
          { texte: "Je croise les fils de S et de R.", pourquoi: "S est l’auxiliaire et R le principal. Croiser S et R échange un fil du principal avec un fil de l’auxiliaire, et le moteur grille, en général peu après la mise sous tension." },
          { texte: "Je permute la phase et le neutre.", pourquoi: "Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé." },
          { texte: "J’inverse deux phases.", pourquoi: "Un compresseur monophasé n’a pas deux phases à inverser. On permute deux phases sur un moteur triphasé (station 2.6)." } ],
        confirmation: "On ne croise rien. Un compresseur hermétique a trois bornes, C, S et R. Échanger un fil du principal avec un fil de l’auxiliaire fait griller le moteur, en général peu après la mise sous tension. Un compresseur scroll ne comprime que dans un sens." },

      { mode: 'seul',
        enonce: "Le petit ventilateur à spire de Frager tourne à l’envers de ce que demande votre montage. Que faites-vous ?",
        methodeVue: "Un moteur à spire de Frager n’a pas d’enroulement auxiliaire : la spire tient sa place, et elle n’est reliée à aucun fil. La station 9.6 présente ce moteur.",
        choix: [
          { texte: "Je croise les fils de l’auxiliaire.", pourquoi: "Un moteur à spire de Frager n’a pas d’enroulement auxiliaire : la spire tient sa place, et elle n’est reliée à aucun fil." },
          { texte: "Je permute la phase et le neutre.", pourquoi: "Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé." },
          { texte: "Rien ne s’inverse au bornier : son sens est fixé par construction (station 9.6).", juste: true },
          { texte: "J’inverse deux phases.", pourquoi: "Un moteur monophasé n’a pas deux phases à inverser. On permute deux phases sur un moteur triphasé (station 2.6)." } ],
        confirmation: "Rien ne s’inverse au bornier : le sens d’un moteur à spire de Frager est fixé par construction (station 9.6)." },

      { mode: 'seul',
        enonce: "Un moteur triphasé tourne à l’envers. Que faites-vous ?",
        methodeVue: "Un moteur triphasé n’a pas d’enroulement auxiliaire. Pensez à la station 2.6.",
        choix: [
          { texte: "Je croise les fils de l’auxiliaire.", pourquoi: "Un moteur triphasé n’a pas d’enroulement auxiliaire." },
          { texte: "Je permute deux phases (station 2.6).", juste: true },
          { texte: "Je permute la phase et le neutre.", pourquoi: "Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé. Le moteur triphasé change de sens quand on permute deux phases (station 2.6)." },
          { texte: "C’est impossible.", pourquoi: "Un moteur triphasé change de sens : on permute deux phases (station 2.6)." } ],
        confirmation: "On permute deux phases (station 2.6). En monophasé, on croise les deux fils d’un enroulement." }
    ]
  },

  methode: {
    titre: 'La méthode, dans l’ordre',
    lignes: [
      "<strong>Consignez</strong> le circuit (station 6.7) et vérifiez l’absence de tension. Si le moteur a un condensateur, déchargez-le avec une résistance (station 9.5).",
      "Lisez la plaque signalétique et le schéma de raccordement, souvent dans le couvercle du bornier. Il dit si le moteur est prévu pour deux sens.",
      "Repérez les deux fils d’un même enroulement. Un moteur prévu pour deux sens a au moins quatre bornes.",
      "Repérez chaque fil avant de le débrancher.",
      "<strong>Croisez</strong> les deux fils d’un seul enroulement : l’auxiliaire ou le principal.",
      "N’échangez jamais un fil du principal avec un fil de l’auxiliaire : le moteur grille, en général peu après la mise sous tension."
    ],
    piege: "Échanger un fil du principal avec un fil de l’auxiliaire : le moteur grille, en général peu après la mise sous tension."
  },
  securite: true,

  /* ---------------------------------------------------------------- temps 4 */
  figurePlan: () => unSchema98('assets/biblio/bornier-compresseur-3-bornes-klixon.png', ALT_BORNIER_98,
    "Le bornier d’un compresseur hermétique monophasé : trois vis repérées 1, 2 et 3, et le Klixon. Dans le cours, 1, 2 et 3 sont C, P et A : le commun, le principal (R) et l’auxiliaire (S)."),

  symboles: [
    { src: 'assets/sens-avant.svg', alt: ALT_AVANT_98,
      legende: "Avant : le moteur monophasé à quatre fils sortis, le rond marqué M et 1 ~. Principal en haut, auxiliaire à droite." },
    { src: 'assets/sens-apres.svg', alt: ALT_APRES_98,
      legende: "Après : les deux fils de l’auxiliaire sont croisés. Le principal n’a pas bougé." }
  ],
  lecturePlan: [
    "Sur les deux schémas, regardez les fils de l’auxiliaire, à droite du moteur. Avant, le fil du haut va au point commun <strong>C</strong>. Après, il va à l’alimentation, et le fil du bas va à C.",
    "Les schémas n’ont pas de flèche de rotation. Le texte dit que le moteur tourne dans l’autre sens.",
    "Sur le bornier du compresseur hermétique, il y a trois bornes. Avec trois bornes, croiser deux fils échange un fil du principal avec un fil de l’auxiliaire : on ne croise rien."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'Le cas, le geste, ce qui se passe',
    corps: () => {
      const lignes = [
        ['Moteur monophasé prévu pour deux sens (quatre bornes au moins)', "On croise les deux fils de l’auxiliaire.", "Le moteur tourne dans l’autre sens."],
        ['Le même moteur', "On croise les deux fils du principal.", "Le sens change aussi : on croise un seul enroulement, l’auxiliaire ou le principal."],
        ['Un fil du principal avec un fil de l’auxiliaire', "Aucun geste : c’est l’échange à éviter.", "Le moteur grille, en général peu après la mise sous tension."],
        ['Phase et neutre permutés', "Aucun effet sur le sens.", "Le moteur monophasé tourne comme avant."],
        ['Compresseur hermétique, trois bornes', "On ne croise rien.", "Échanger un fil du principal avec un fil de l’auxiliaire le fait griller, en général peu après la mise sous tension. Un scroll ne comprime que dans un sens."],
        ['Moteur à spire de Frager', "Rien ne s’inverse au bornier.", "Son sens est fixé par construction (station 9.6)."],
        ['Moteur triphasé', "On permute deux phases.", "Le sens change (station 2.6)."]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th>Le cas</th><th>Le geste</th><th>Ce qui se passe</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td><strong>' + l[0] + '</strong></td><td>' + l[1] + '</td><td>' + l[2] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t);
      const q1 = document.createElement('p'); q1.className = 'legende'; q1.textContent = 'Pour la première question : les deux schémas.';
      const q3 = document.createElement('p'); q3.className = 'legende'; q3.textContent = 'Pour la troisième question : le bornier d’un compresseur hermétique.';
      d.append(q1, schemasQuestion98(), q3,
        unSchema98('assets/biblio/bornier-compresseur-3-bornes-klixon.png', ALT_BORNIER_98, "Trois vis, 1, 2 et 3, et le Klixon."));
      return d;
    }
  },

  quiz: [
    { question: "Regardez les deux schémas, sous le tableau. Quels fils a-t-on croisés pour passer du premier au second ?",
      confirmation: "On a croisé les deux fils de l’auxiliaire, à droite du moteur. Le moteur tourne dans l’autre sens.",
      reponses: [
        { texte: "Les deux fils du principal.", pourquoi: "Les fils du principal, en haut du moteur, sont à la même place sur les deux schémas." },
        { texte: "Les deux fils de l’auxiliaire.", juste: true },
        { texte: "Un fil du principal et un fil de l’auxiliaire.", pourquoi: "Ce serait un échange entre le principal et l’auxiliaire, et le moteur grillerait, en général peu après la mise sous tension. Ici, seuls les fils de l’auxiliaire changent." },
        { texte: "La phase et le neutre.", pourquoi: "Les deux repères Alim. n’ont pas changé. Seuls les fils de l’auxiliaire sont croisés." } ] },

    { question: "Lisez la première ligne du tableau « Le cas, le geste, ce qui se passe ». Combien de bornes a, au moins, un moteur monophasé prévu pour deux sens ?",
      confirmation: "Au moins quatre. Certains moteurs bi-tension en ont six.",
      reponses: [
        { texte: "Deux.", pourquoi: "Un moteur prévu pour deux sens a au moins quatre bornes." },
        { texte: "Trois.", pourquoi: "Trois bornes, c’est le bornier d’un compresseur hermétique : on n’y croise rien." },
        { texte: "Au moins quatre.", juste: true },
        { texte: "Six, toujours.", pourquoi: "Six bornes existent pour un moteur bi-tension, mais pas toujours : un moteur prévu pour deux sens a au moins quatre bornes." } ] },

    { question: "Regardez le bornier, sous le tableau : un compresseur hermétique a trois bornes. Un collègue veut croiser deux fils pour changer son sens. Que lui dites-vous ?",
      confirmation: "On ne croise rien : échanger un fil du principal avec un fil de l’auxiliaire fait griller le moteur, en général peu après la mise sous tension.",
      reponses: [
        { texte: "On ne croise rien : échanger un fil du principal avec un fil de l’auxiliaire fait griller le moteur, en général peu après la mise sous tension.", juste: true },
        { texte: "Croisez S et R, ce sont les deux enroulements.", pourquoi: "S est l’auxiliaire et R le principal. Croiser S et R échange un fil du principal avec un fil de l’auxiliaire." },
        { texte: "Croisez C et R.", pourquoi: "C est la borne commune aux deux enroulements. Sur trois bornes, croiser deux fils échange un fil du principal avec un fil de l’auxiliaire." },
        { texte: "Permutez la phase et le neutre.", pourquoi: "Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé." } ] },

    { question: "Avant de toucher aux fils d’un moteur qui a un condensateur, que faites-vous ? Cherchez la réponse dans la carte « Ce qu’il faut retenir ».",
      confirmation: "On consigne, on vérifie l’absence de tension, puis on décharge le condensateur avec une résistance.",
      reponses: [
        { texte: "Je décharge le condensateur avec un tournevis.", pourquoi: "On décharge avec une résistance, jamais avec un tournevis (station 9.5)." },
        { texte: "Je croise les fils, puis je consigne.", pourquoi: "On consigne avant de toucher à un fil (station 6.7)." },
        { texte: "Je ne fais rien : le condensateur est vide quand l’alimentation est coupée.", pourquoi: "Un condensateur reste chargé après la coupure (station 9.5)." },
        { texte: "Je consigne, je vérifie l’absence de tension, puis je décharge le condensateur avec une résistance.", juste: true } ] }
  ],

  retenir: [
    "Pour changer le sens d’un moteur monophasé, on croise <strong>les deux fils d’un seul enroulement</strong> : l’auxiliaire ou le principal. Le moteur tourne alors dans l’autre sens.",
    "N’échangez jamais un fil du principal avec un fil de l’auxiliaire : le moteur grille, en général peu après la mise sous tension.",
    "Permuter la phase et le neutre ne change pas le sens. En triphasé, on permute deux phases (station 2.6).",
    "Un compresseur hermétique a trois bornes : on ne croise rien. Le sens d’un moteur à spire de Frager est fixé par construction.",
    "Avant de toucher un fil : consigner, vérifier l’absence de tension, décharger un condensateur avec une résistance."
  ],

  liens: [
    { nom: "Station 2.6 : le champ tournant", href: 'https://inerweb.fr/electrorezo/stations/2-6-champ-tournant/', quoi: "Inverser un moteur triphasé : on permute deux phases." },
    { nom: "Station 6.7 : l’autocontrôle avant la mise sous tension", href: 'https://inerweb.fr/electrorezo/stations/6-7-autocontrole-mise-sous-tension/', quoi: "Les contrôles hors tension, avant de toucher à un fil." },
    { nom: "Station 9.5 : le Klixon et le dépannage", href: 'https://inerweb.fr/electrorezo/stations/9-5-klixon-et-depannage/', quoi: "Décharger un condensateur avec une résistance." },
    { nom: "HoCourant, module M9 : la consignation", href: 'https://inerweb.fr/hocourant/?module=M9', quoi: "La consignation, étape par étape." }
  ],

  objectifs: '<p><strong>Objectif.</strong> Changer le sens d’un moteur monophasé en croisant les deux fils d’un seul enroulement, l’auxiliaire ou le principal ; ne jamais échanger un fil du principal avec un fil de l’auxiliaire ; reconnaître les cas où rien ne se croise : le compresseur hermétique à trois bornes, la spire de Frager, la permutation de la phase et du neutre.</p>'
    + '<p><strong>Limites.</strong> La station ne donne aucune valeur et ne décrit aucun essai après le croisement. Elle ne dit pas comment repérer les fils quand le moteur n’a aucun schéma de raccordement. Les schémas n’ont pas de flèche de rotation : le texte dit le sens. Le repérage du principal et de l’auxiliaire est à la station 9.2, la consignation à la station 6.7, la décharge du condensateur à la station 9.5.</p>',

  credits: [
    { quoi: 'Schémas du moteur monophasé avant et après le croisement des fils de l’auxiliaire', source: 'construits dans QElectroTech pour la ligne 9',
      detail: 'symboles EN 60617 de la bibliothèque inerWeb, convertis en SVG ; à valider par F. Henninot' },
    { quoi: 'Bornier d’un compresseur hermétique monophasé (trois vis et le Klixon)', source: 'cours « Moteurs monophasés » du fonds inerWeb',
      detail: 'page 3 du cours, image recadrée ; droits à confirmer' },
    { quoi: 'Croiser les deux fils d’un enroulement, moteurs à deux sens, échange d’un fil du principal avec un fil de l’auxiliaire', source: 'cours « Moteurs monophasés » et page de livre dont il est tiré',
      detail: 'documents du fonds inerWeb, cités, non reproduits' },
    { quoi: 'Permuter la phase et le neutre ne change pas le sens', source: 'règle de métier confirmée par F. Henninot le 29/10/2026',
      detail: 'aucun document du fonds ne la donne' },
    { quoi: 'Compresseur scroll : un seul sens', source: 'documentation de compresseurs du fonds inerWeb',
      detail: 'cités, non reproduits' } ],

  correspondances: [
    { ligne: 2, couleur: '#0C4B88', texte: "2.6 Le champ tournant", href: '../2-6-champ-tournant/index.html' },
    { ligne: 9, couleur: '#a16207', texte: "9.2 Repérer C, S, R", href: '../9-2-reperer-c-s-r/index.html' },
    { ligne: 6, couleur: '#c9451a', texte: "6.7 Autocontrôle avant mise sous tension", href: '../6-7-autocontrole-mise-sous-tension/index.html' }
  ]
});

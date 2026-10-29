/* ÉlectroRézo 6.C — Action et réaction : le courant induit.
   Troisième des trois stations du champ (6.A, 6.B, 6.C), posées devant la 6.1. Un champ qui change fait naître un
   courant dans une bobine ou un anneau, et ce courant s'oppose au changement. Exemples déjà en ligne : le
   transformateur (6.2), la bague de déphasage (6.1), la spire de Frager (9.6). Ni Lenz ni Faraday nommés, ni
   vecteur, ni formule. Aucun fait hors de LIGNE-6-CHAMP-FAITS.md. Pas de vue 3D. */

ModelePratique.construire({
  id: '6.C', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines · Station C',
  titre: "Action et réaction : le courant induit",
  narration: NARRATION,

  prerequis: [
    { id: '6.A', quoi: "d’où vient le champ" },
    { id: '6.B', quoi: "ce que fait le champ" },
    { id: '1.5', quoi: "le continu et l’alternatif" }
  ],

  codes: {
    referentiel: 'CAP IFCA — référentiel de certification',
    lignes: [
      ['Compétence', 'C5.1', "Remplacer des composants de l'installation"],
      ['Tâche', 'T16', "Assurer l'entretien d'une installation"],
      ['Savoir', 'S5.6', "Réseaux, matériels électriques et de régulation"],
      ['Savoir', 'S6.2', "Principaux risques et moyens de prévention"]
    ],
    note: 'Les stations 6.A, 6.B et 6.C posent une notion de base. Les codes disent où elle resservira : la bague d’un contacteur qui vibre, une bobine qu’on coupe, un transformateur.'
  },

  photos: [
    { src: 'assets/biblio/aimant-bobine-galvanometre.jpeg',
      alt: "Croquis : un aimant droit entre à moitié dans une bobine. Les deux fils de la bobine partent vers un galvanomètre, un appareil à aiguille qui détecte un courant.",
      titre: "Un aimant qui bouge fait naître un courant.", sous: "On enfonce l’aimant dans la bobine : l’aiguille du galvanomètre dévie un instant. L’aimant s’arrête : elle revient à zéro." },
    { src: 'assets/biblio/primaire-et-secondaire.png',
      alt: "Schéma d’un transformateur : le circuit magnétique en fer, le bobinage primaire à gauche, le bobinage secondaire à droite, et des flèches jaunes qui montrent le flux circulant dans le fer.",
      titre: "Le transformateur vit de ce courant.", sous: "Le champ du primaire change sans arrêt : il fait naître une tension au secondaire (station 6.2)." }
  ],
  creditPhoto: 'Illustrations : documents du fonds inerWeb. Détail dans « Crédits ».',

  titres: { objet: 'Un champ qui change', serviCa: 'De quoi on parle', dedans: 'Action et réaction, en trois dessins', variantes: 'Où vous le rencontrerez',
            symboles: 'Les symboles normalisés', plan: 'Le lire sur un plan', methode: 'La méthode, ligne par ligne' },

  question: "Un aimant immobile dans une bobine ne fait rien. Pourquoi un aimant qui bouge y fait-il naître un courant, et que fait ce courant ?",
  aQuoiCaSert: "Quand le champ change dans un anneau, ou dans une bobine reliée à un circuit fermé, un courant y naît : c’est le <strong>courant induit</strong>. Il dure tant que le champ change. Il s’oppose toujours au changement qui l’a fait naître : à chaque action du champ répond une réaction.",
  ouOnLeTrouve: "Dans le transformateur (station 6.2), dans la bague de déphasage du contacteur (station 6.1), dans la spire de Frager des petits ventilateurs (station 9.6), dans le frein à induction des camions.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasChamp.induit(),

  technologie: [
    ["Un champ qui change fait naître un courant", "on enfonce un aimant dans une bobine reliée à un galvanomètre, un appareil à aiguille qui détecte un courant. L’aiguille dévie un court instant. On le retire : elle dévie de l’autre côté. Ce courant s’appelle le <strong>courant induit</strong>."],
    ["Il dure tant que le champ change", "l’aimant reste immobile dans la bobine : plus de courant. On bouge la bobine au lieu de l’aimant : même effet. Il faut que le champ qui traverse la bobine change."],
    ["Il s’oppose au changement", "le courant induit fait de la bobine un aimant. On enfonce le pôle nord : la bobine présente un pôle nord de ce côté, et repousse l’aimant. On le retire : elle présente un pôle sud, et le retient. Le champ change, la bobine s’y oppose : c’est l’action et la réaction."],
    ["Le balancier en cuivre", "il oscille longtemps entre les pôles d’un électroaimant éteint. On l’allume : il s’arrête net. Le cuivre n’est pas attiré, mais des courants induits naissent dans le métal et s’opposent à son mouvement."],
    ["En alternatif, le champ change sans arrêt", "il naît donc un courant induit, sans arrêt, dans tout anneau, ou toute bobine reliée à un circuit fermé, que ce champ traverse. Ce courant crée son propre champ, décalé dans le temps."],
    ["La bobine s’oppose à son propre courant", "dans l’expérience du cours, une lampe en série avec une bobine à noyau s’allume en retard quand on ferme le circuit. Quand on l’ouvre, des étincelles jaillissent à l’interrupteur. C’est la surtension de coupure que la diode absorbe sur une bobine en continu (station 6.1)."]
  ],

  variantes: [
    "<strong>Le transformateur</strong> : le champ alternatif du primaire fait naître une tension aux bornes du secondaire. Dès qu’un appareil y est branché, le circuit est fermé, et cette tension fait passer le courant induit. En continu, une fois le courant établi, le champ ne change plus, et il ne naît rien (station 6.2).",
    "<strong>La bague de déphasage du contacteur</strong> : un anneau de cuivre qui entoure les deux tiers d’une branche du noyau. Son courant induit décale le champ de cette partie : sur le réseau à 50 hertz, l’attraction ne s’annule plus cent fois par seconde, et le contacteur ne vibre pas. Si la bague est cassée, il ronfle fort et vibre (station 6.1).",
    "<strong>La spire de Frager</strong> : le même anneau, sur un coin du pôle d’un petit moteur. Son courant est induit par la bobine, et le décalage qu’il crée fait démarrer le moteur (station 9.6).",
    "<strong>Le frein à induction</strong> : un disque fixé sur la roue d’un camion tourne près d’un électroaimant. On l’allume : les courants induits freinent la roue. Ce frein complète le frein classique, car il faiblit quand la roue ralentit.",
    "<strong>Le fer des machines</strong> : des courants induits y naissent aussi et le chauffent pour rien. Des tôles minces, isolées entre elles, les limitent (station 6.2)."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  exercices: {
    titre: 'Prévoir le courant induit',
    consigne: 'Six exercices, sans note. Les premiers disent où regarder et comment faire ; les derniers, non. Le premier est déjà résolu : imitez-le.',
    items: [
      { mode: 'exemple',
        enonce: "On enfonce le pôle nord d’un aimant dans une bobine reliée à un galvanomètre, puis on le laisse immobile. Que fait l’aiguille ?",
        ou: "au temps 2, premier dessin : appuyez sur « 1 L’aimant entre », puis sur « 2 L’aimant reste ». Relisez la ligne « Il dure tant que le champ change ».",
        comment: "regardez l’aiguille pendant que l’aimant bouge, puis quand il s’arrête.",
        resolu: "Elle dévie un court instant pendant que l’aimant entre, puis elle revient à zéro quand il s’arrête. Le courant induit dure tant que le champ change." },

      { mode: 'guide',
        enonce: "On retire l’aimant de la bobine. Que fait l’aiguille ?",
        ou: "au temps 2, premier dessin : appuyez sur « 3 L’aimant sort ». Relisez la ligne « Un champ qui change fait naître un courant ».",
        comment: "comparez le côté où dévie l’aiguille avec celui de l’étape 1.",
        choix: [
          { texte: "Rien : l’aimant s’en va, il n’agit plus.", pourquoi: "Pendant qu’il sort, le champ change dans la bobine : un courant y naît." },
          { texte: "Elle dévie du même côté qu’à l’entrée, et y reste.", pourquoi: "Elle dévie de l’autre côté, et seulement pendant le mouvement." },
          { texte: "Elle dévie un court instant, de l’autre côté.", juste: true },
          { texte: "Elle tourne sans arrêt.", pourquoi: "Elle dévie le temps du mouvement, puis revient à zéro." } ],
        confirmation: "Elle dévie un court instant, de l’autre côté : le courant induit a changé de sens." },

      { mode: 'guide',
        enonce: "L’aimant reste immobile. On déplace la bobine vers lui. Un courant induit naît-il ?",
        ou: "au temps 2, premier dessin : appuyez sur « 4 La bobine bouge ». Relisez la ligne « Il dure tant que le champ change ».",
        comment: "demandez-vous si le champ qui traverse la bobine change pendant qu’elle bouge.",
        choix: [
          { texte: "Non : c’est l’aimant qui doit bouger.", pourquoi: "On bouge la bobine au lieu de l’aimant : même effet." },
          { texte: "Oui, tant que la bobine bouge : le champ qui la traverse change.", juste: true },
          { texte: "Oui, et le courant continue quand elle s’arrête.", pourquoi: "Le courant induit s’arrête quand le champ ne change plus." },
          { texte: "Non : il faudrait une pile.", pourquoi: "Le courant induit naît sans pile : il suffit que le champ change dans la bobine." } ],
        confirmation: "Oui, tant que la bobine bouge. Ce qui compte, c’est que le champ change dans la bobine." },

      { mode: 'guide',
        enonce: "On enfonce le pôle nord de l’aimant dans la bobine. Quel pôle la bobine présente-t-elle de ce côté ?",
        ou: "au temps 2, la ligne « Il s’oppose au changement » ; sur le premier dessin, l’étape « 1 L’aimant entre », le bout gauche de la bobine.",
        comment: "cherchez dans cette ligne ce que fait la bobine quand le pôle nord entre.",
        choix: [
          { texte: "Un pôle sud : elle attire l’aimant.", pourquoi: "Elle s’oppose au changement : elle présente un pôle nord et repousse l’aimant qui entre." },
          { texte: "Aucun pôle : une bobine sans pile n’est pas un aimant.", pourquoi: "Le courant induit fait de la bobine un aimant, le temps du mouvement." },
          { texte: "Les deux pôles du même côté.", pourquoi: "Une bobine a un pôle à chaque bout. Ici, c’est un pôle nord du côté de l’aimant." },
          { texte: "Un pôle nord : elle repousse l’aimant qui entre.", juste: true } ],
        confirmation: "Un pôle nord : elle repousse l’aimant qui entre. Le champ change, la bobine s’y oppose." },

      { mode: 'seul',
        enonce: "On alimente un transformateur en courant continu. Une fois le courant établi, une tension naît-elle au secondaire ?",
        methodeVue: "Revoyez la carte « La méthode, ligne par ligne », lignes 1 et 2, et le transformateur dans « Où vous le rencontrerez ».",
        choix: [
          { texte: "Non : en continu, le champ ne change pas, et il ne naît rien.", juste: true },
          { texte: "Oui, la même qu’en alternatif.", pourquoi: "Le secondaire a besoin d’un champ qui change. En continu, une fois le courant établi, le champ est fixe." },
          { texte: "Oui, mais deux fois plus forte.", pourquoi: "Un champ fixe ne fait naître aucun courant." },
          { texte: "Oui, tant que le primaire est sous tension.", pourquoi: "La tension ne suffit pas : il faut que le champ change." } ],
        confirmation: "Non. En continu, le champ ne change pas : il ne naît rien au secondaire (station 6.2)." },

      { mode: 'seul',
        enonce: "Sur la bobine d’un contacteur alimentée en alternatif, la bague de déphasage est cassée. Que risquez-vous d’entendre et de voir ?",
        methodeVue: "Revoyez la bague de déphasage dans « Où vous le rencontrerez ». La station 6.1 la montre dans un contacteur démonté.",
        choix: [
          { texte: "Rien : la bague ne sert qu’au démarrage.", pourquoi: "Dans le contacteur, la bague empêche la vibration, à chaque instant." },
          { texte: "Un contacteur qui ronfle fort et vibre.", juste: true },
          { texte: "Un contacteur qui colle plus fort.", pourquoi: "Sans bague, l’attraction s’annule cent fois par seconde : il vibre." },
          { texte: "Des étincelles sur la bobine.", pourquoi: "La bague décale une partie du champ ; sans elle, l’attraction s’annule et l’appareil vibre." } ],
        confirmation: "Un contacteur qui ronfle fort et vibre : sans bague, l’attraction s’annule cent fois par seconde (station 6.1)." }
    ]
  },

  methode: {
    titre: 'La méthode, ligne par ligne',
    lignes: [
      "Demandez-vous si le champ qui traverse la bobine ou l’anneau <strong>change</strong>. Il change quand l’aimant bouge, quand la bobine bouge, quand on ferme ou ouvre un circuit, et sans arrêt en alternatif.",
      "S’il ne change pas, il ne naît aucun courant.",
      "S’il change, un courant induit naît dans l’anneau ou dans le circuit fermé, tant que dure le changement.",
      "Ce courant <strong>s’oppose</strong> au changement : il repousse l’aimant qui entre, retient celui qui sort, freine ce qui bouge."
    ],
    piege: "Un aimant puissant mais immobile ne fait naître aucun courant : il faut que le champ change."
  },

  /* ---------------------------------------------------------------- temps 4 */
  symboles: [
    { src: 'assets/transformator_1f_1.svg', alt: "Symbole normalisé d’un transformateur monophasé : deux cercles qui se chevauchent, un fil en haut, un fil en bas.", legende: "Le transformateur" },
    { src: 'assets/inductance-a-noyau.svg', alt: "Symbole normalisé d’une inductance à noyau magnétique : quatre demi-cercles en ligne, la bobine, et un trait droit au-dessus, le noyau.", legende: "La bobine à noyau de fer" },
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé d’une bobine de contacteur ou de relais : un rectangle, un fil qui arrive en haut, un fil qui repart en bas.", legende: "La bobine d’un contacteur" }
  ],
  lecturePlan: [
    "Le courant induit ne se dessine pas. On dessine l’objet où il naît.",
    "Le transformateur, ce sont deux cercles qui se chevauchent : le primaire et le secondaire (station 6.2).",
    "La bobine à noyau de fer s’oppose aux changements de son propre courant. La bobine d’un contacteur est un rectangle (station 8.8).",
    "La bague de déphasage et la spire de Frager n’ont pas de symbole : elles font partie de l’appareil, contacteur ou moteur."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'Le courant induit, partout',
    corps: () => {
      const lignes = [
        ['L’aimant et la bobine', "L’aimant bouge", "Il repousse l’aimant qui entre, retient celui qui sort", "6.C"],
        ['Le balancier, le frein du camion', "Le métal bouge dans le champ", "Il freine", "6.C"],
        ['Le transformateur', "Le champ alternatif du primaire", "Il donne la tension du secondaire", "6.2"],
        ['La bague de déphasage', "Le champ alternatif du contacteur", "Il décale une partie du champ : pas de vibration", "6.1"],
        ['La spire de Frager', "Le champ alternatif du moteur", "Il décale le champ : le moteur démarre", "9.6"],
        ['La bobine seule', "Son propre courant", "Il retarde l’allumage ; à la coupure, il fait l’étincelle à l’interrupteur", "6.1"]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th>Où</th><th>Ce qui change</th><th>Ce que fait le courant induit</th><th>Station</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td><strong>' + l[0] + '</strong></td><td>' + l[1] + '</td><td>' + l[2] + '</td><td>' + l[3] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t); return d;
    }
  },

  quiz: [
    { question: "Un aimant reste immobile dans une bobine. Un courant induit naît-il ?",
      confirmation: "Non : le champ ne change pas, il ne naît aucun courant.",
      reponses: [
        { texte: "Oui, tant que l’aimant est dedans.", pourquoi: "Il faut que le champ change : un aimant immobile ne fait rien." },
        { texte: "Non : le champ ne change pas.", juste: true },
        { texte: "Oui, si l’aimant est puissant.", pourquoi: "La force du champ ne suffit pas : il faut qu’il change." },
        { texte: "Oui, mais très faible.", pourquoi: "Sans changement du champ, il ne naît aucun courant." } ] },

    { question: "Combien de temps dure le courant induit ?",
      confirmation: "Tant que le champ change.",
      reponses: [
        { texte: "Une seconde, toujours.", pourquoi: "Il n’a pas de durée fixe : il dure tant que le champ change." },
        { texte: "Jusqu’à ce qu’on coupe le circuit.", pourquoi: "Il s’arrête de lui-même quand le champ ne change plus." },
        { texte: "Toujours, une fois lancé.", pourquoi: "Il s’arrête quand le champ ne change plus." },
        { texte: "Tant que le champ change.", juste: true } ] },

    { question: "Pourquoi le balancier en cuivre s’arrête-t-il net quand on allume l’électroaimant ?",
      confirmation: "Les courants induits dans le cuivre s’opposent à son mouvement.",
      reponses: [
        { texte: "Les courants induits dans le cuivre s’opposent à son mouvement.", juste: true },
        { texte: "L’aimant attire le cuivre.", pourquoi: "Le cuivre n’est pas attiré par un aimant : il est freiné par les courants induits." },
        { texte: "Le cuivre devient trop lourd.", pourquoi: "Son poids ne change pas : ce sont les courants induits qui le freinent." },
        { texte: "L’électroaimant chauffe l’air.", pourquoi: "Ce n’est pas l’air : les courants induits dans le métal s’opposent au mouvement." } ] },

    { question: "Dans un transformateur, d’où vient la tension du secondaire ?",
      confirmation: "Du champ du primaire, qui change sans arrêt en alternatif.",
      reponses: [
        { texte: "D’un fil qui relie le primaire au secondaire.", pourquoi: "Aucun fil ne les relie : seul le champ passe, par le fer." },
        { texte: "D’une pile cachée dans le fer.", pourquoi: "Il n’y en a pas : la tension naît du champ qui change." },
        { texte: "Du champ du primaire, qui change sans arrêt en alternatif.", juste: true },
        { texte: "Du courant continu du réseau.", pourquoi: "Le réseau est alternatif ; en continu, il ne naîtrait rien au secondaire." } ] }
  ],

  retenir: [
    "Un champ qui <strong>change</strong> fait naître un courant dans un anneau, ou dans une bobine reliée à un circuit fermé : le courant induit.",
    "Il dure <strong>tant que le champ change</strong>. Un aimant immobile ne fait rien.",
    "Il <strong>s’oppose</strong> au changement : il repousse, il retient, il freine.",
    "En alternatif, le champ change sans arrêt : <strong>transformateur, bague de déphasage, spire de Frager</strong>."
  ],

  objectifs: '<p><strong>Objectif.</strong> Savoir qu’un champ qui change fait naître un courant dans une bobine ou un anneau, que ce courant dure tant que le champ change, et qu’il s’oppose au changement qui l’a fait naître. Reconnaître ce courant induit dans le transformateur, la bague de déphasage, la spire de Frager et le frein à induction.</p>'
    + '<p><strong>Limites.</strong> Aucun calcul de tension induite. La station ne nomme aucune loi : elle montre les faits. Le moteur asynchrone, dont le rotor doit voir le champ changer pour tourner, est étudié à la station 6.3.</p>',

  credits: [
    { quoi: 'Aimant, bobine et galvanomètre (croquis)', source: '« Créer de l’électricité avec le magnétisme ? La découverte de l’induction », C. Blondel et B. Wolff, texte rangé dans le fonds inerWeb',
      detail: 'croquis repris du document ; droits à confirmer par F. Henninot' },
    { quoi: 'Transformateur, primaire et secondaire', source: 'image déjà employée à la station 6.2, fonds inerWeb',
      detail: 'mêmes droits que la station 6.2' },
    { quoi: 'Aimant dans une bobine, sens du courant induit, balancier, frein des camions, bobine qui retarde la lampe, tôles', source: 'cours « L’électromagnétisme » (Institut Cardijn Lorraine, Arlon), document de collègue du fonds inerWeb',
      detail: '§ 26, 27, 30, 34, 38, 39 et 40 ; cité, non reproduit' },
    { quoi: 'Bague de déphasage, spire de Frager', source: 'stations 6.1 et 9.6, et leurs sources (ressource « préparation d’une platine », « les contacteurs », fiche « moteur monophasé »)',
      detail: 'cités, non reproduits' },
    { quoi: 'Symboles', source: 'bibliothèque inerWeb, convertie depuis QElectroTech (EN 60617)',
      detail: 'transformateur (station 6.2), inductance à noyau 04-03-03, bobine (station 6.1)' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.1 La bobine et l’électro-aimant", href: '../6-1-bobine-electro-aimant/index.html' },
    { ligne: 6, couleur: '#c9451a', texte: "6.2 Le transformateur", href: '../6-2-transformateur/index.html' },
    { ligne: 9, couleur: '#a16207', texte: "9.6 Spire de Frager", href: '../9-6-spire-de-frager/index.html' }
  ]
});

/* ÉlectroRézo 6.B — Ce que fait le champ magnétique.
   Deuxième des trois stations du champ (6.A, 6.B, 6.C), posées devant la 6.1. Le champ attire le fer, oriente
   un aimant, pousse un fil parcouru par un courant ; deux poussées contraires font tourner. Ni vecteur, ni règle
   des trois doigts, ni nom de loi. Aucun fait hors de LIGNE-6-CHAMP-FAITS.md. Pas de vue 3D. */

ModelePratique.construire({
  id: '6.B', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines · Station B',
  titre: "Ce que fait le champ magnétique",
  narration: NARRATION,

  prerequis: [
    { id: '6.A', quoi: "d’où vient le champ" }
  ],

  codes: {
    referentiel: 'CAP IFCA — référentiel de certification',
    lignes: [
      ['Compétence', 'C3.7', "Contrôler la mise en œuvre des équipements électriques et fluidiques"],
      ['Tâche', 'T13', "Tirer au vide, charger et contrôler l'installation sous tension"],
      ['Savoir', 'S5.6', "Réseaux, matériels électriques et de régulation"]
    ],
    note: 'Les stations 6.A, 6.B et 6.C posent une notion de base. Les codes disent où elle resservira : le contrôle d’un contacteur, d’une électrovanne, d’un moteur.'
  },

  photos: [
    { src: 'assets/biblio/fil-entre-les-poles.jpeg',
      alt: "Croquis : un fil posé entre le pôle nord, en haut, et le pôle sud, en bas, d’un aimant. Les lignes magnétiques descendent en pointillé. Une flèche verte suit le fil, marquée courant. Une flèche rouge part sur le côté, marquée mouvement.",
      titre: "Le champ pousse un fil.", sous: "Un fil parcouru par un courant, entre les pôles d’un aimant, est poussé sur le côté." },
    { src: 'assets/biblio/moteur-eclate.png',
      alt: "Moteur asynchrone en vue éclatée : la boîte de raccordement, le stator et son enroulement statorique, le rotor à cage sur son arbre, les roulements, les flasques paliers, le ventilateur et son capot.",
      titre: "Et le moteur tourne.", sous: "Les bobines du stator créent le champ ; le rotor, au milieu, est poussé et tourne (station 6.3)." }
  ],
  creditPhoto: 'Illustrations : documents de cours du fonds inerWeb. Détail dans « Crédits ».',

  titres: { objet: 'Le champ met en mouvement', serviCa: 'De quoi on parle', dedans: 'Ce que fait le champ', variantes: 'Où vous le verrez',
            symboles: 'Les symboles normalisés', plan: 'Le lire sur un plan', methode: 'Prévoir où part le fil' },

  question: "Le champ magnétique attire le fer et oriente une boussole. Comment peut-il faire tourner un moteur ?",
  aQuoiCaSert: "Le champ magnétique fait quatre choses. Il <strong>attire le fer</strong> : c’est le contacteur et l’électrovanne. Il <strong>oriente un aimant</strong> : c’est la boussole. Il <strong>pousse un fil</strong> parcouru par un courant. Et deux poussées en sens contraires, sur deux côtés opposés d’un cadre, <strong>le font tourner</strong> : c’est le principe du moteur.",
  ouOnLeTrouve: "Le contacteur et le relais attirent une armature (stations 5.2 et 6.1). L’électrovanne déplace son clapet. Le moteur tourne (stations 6.3 et 6.5). La station 6.C montre l’inverse : un champ qui change fait naître un courant.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasChamp.effets(),

  technologie: [
    ["Il attire le fer", "une bobine alimentée attire une pièce de fer. C’est l’armature du contacteur et du relais, le clapet de l’électrovanne, l’électroaimant de levage des grues. On coupe le courant : l’attraction cesse, et un ressort ramène la pièce (station 6.1)."],
    ["Il oriente un aimant", "une aiguille aimantée tourne jusqu’à se placer le long des lignes de champ, les lignes que dessine la limaille autour d’un aimant (station 6.A). Son pôle sud regarde le pôle nord de l’aimant : les pôles de noms contraires s’attirent."],
    ["Il pousse un fil parcouru par un courant", "un fil est posé entre les pôles d’un aimant, en travers des lignes de champ. Le courant passe : le fil est poussé sur le côté. On inverse le courant, ou on retourne l’aimant : il part de l’autre côté. Posé le long des lignes de champ, il ne bouge pas."],
    ["La poussée part en travers", "elle ne va ni dans le sens du courant, ni vers un pôle : elle part sur le côté, en travers des deux."],
    ["Deux poussées font tourner", "un cadre de fil est posé dans le champ. Le courant monte d’un côté du cadre et descend de l’autre : les deux côtés sont poussés en sens contraires, et le cadre tourne sur son axe. Un ressort en spirale le retient. C’est le principe des appareils de mesure à aiguille."],
    ["Le moteur", "dans un moteur triphasé, trois bobines fixes et trois courants décalés créent un champ qui tourne (station 2.6). Le rotor est poussé par ce champ et le suit, un peu moins vite (station 6.3)."]
  ],

  variantes: [
    "<strong>Le contacteur et le relais</strong> : leur bobine attire une armature, qui ferme les contacts (stations 5.2 et 6.1).",
    "<strong>L’électrovanne</strong> : sa bobine déplace le clapet qui ouvre ou ferme le passage du fluide (station 6.1).",
    "<strong>La boussole</strong> : une aiguille aimantée que le champ oriente.",
    "<strong>Le moteur</strong> : le champ des bobines pousse le rotor et le fait tourner (stations 6.3 et 6.5).",
    "<strong>Le moteur entraîné</strong> : un moteur qu’on fait tourner produit du courant. Les spécialistes parlent de machine électrique : elle marche dans les deux sens (station 6.C)."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  exercices: {
    titre: 'Prévoir le mouvement',
    consigne: 'Six exercices, sans note. Les premiers disent où regarder et comment faire ; les derniers, non. Le premier est déjà résolu : imitez-le.',
    items: [
      { mode: 'exemple',
        enonce: "Le fil est poussé vers la droite. On inverse le courant. Où part le fil ?",
        ou: "au temps 2, sur le dessin : appuyez sur « 3 Il pousse un fil », puis sur « 4 Le courant inversé ». Relisez la ligne « Il pousse un fil parcouru par un courant ».",
        comment: "regardez de quel côté du pointillé part le fil, avant et après.",
        resolu: "Vers la gauche. On a changé une seule chose, le sens du courant : le fil part de l’autre côté." },

      { mode: 'guide',
        enonce: "Le fil est poussé vers la droite. On garde le même courant, et on retourne l’aimant : le pôle nord passe en bas. Où part le fil ?",
        ou: "au temps 2, la ligne « Il pousse un fil parcouru par un courant » ; à droite, la carte « Prévoir où part le fil », ligne 3.",
        comment: "comptez les changements : un seul, l’aimant retourné.",
        choix: [
          { texte: "Vers la droite, comme avant.", pourquoi: "On a changé une chose, l’aimant : le fil part de l’autre côté." },
          { texte: "Vers la gauche.", juste: true },
          { texte: "Vers le pôle nord.", pourquoi: "La poussée part en travers : ni vers un pôle, ni dans le sens du courant." },
          { texte: "Il ne bouge plus.", pourquoi: "Le fil est toujours en travers des lignes de champ, et le courant passe : il est poussé." } ],
        confirmation: "Vers la gauche. Retourner l’aimant change le côté, comme inverser le courant." },

      { mode: 'guide',
        enonce: "Le fil est poussé vers la droite. On inverse le courant et on retourne l’aimant, les deux à la fois. Où part le fil ?",
        ou: "à droite, la carte « Prévoir où part le fil », lignes 3 et 4.",
        comment: "comptez les changements : il y en a deux. Lisez la ligne 4.",
        choix: [
          { texte: "Vers la gauche.", pourquoi: "Un seul changement envoie le fil de l’autre côté. Ici, il y en a deux : le second le ramène." },
          { texte: "Il ne bouge plus.", pourquoi: "Le fil est en travers des lignes de champ, et le courant passe : il est poussé." },
          { texte: "Vers la droite, comme avant.", juste: true },
          { texte: "Vers le haut.", pourquoi: "La poussée part sur le côté, en travers des lignes de champ, qui vont de haut en bas." } ],
        confirmation: "Vers la droite. Deux changements à la fois : le fil revient du même côté." },

      { mode: 'guide',
        enonce: "On tourne le fil pour le poser dans le sens des lignes de champ, de haut en bas. Le courant passe. Que fait le fil ?",
        ou: "au temps 2, sur le dessin : appuyez sur « 5 Le fil le long des lignes ». Relisez la fin de la ligne « Il pousse un fil parcouru par un courant ».",
        comment: "regardez si le fil quitte le pointillé.",
        choix: [
          { texte: "Il ne bouge pas.", juste: true },
          { texte: "Il part vers la droite.", pourquoi: "Le fil n’est plus en travers des lignes de champ : il n’est plus poussé." },
          { texte: "Il tourne sur lui-même.", pourquoi: "Rien ne le pousse : il reste en place." },
          { texte: "Il est attiré vers le pôle nord.", pourquoi: "Un fil de cuivre n’est pas attiré par un aimant. Ici, il reste en place." } ],
        confirmation: "Il ne bouge pas. Posé le long des lignes de champ, le fil n’est pas poussé." },

      { mode: 'seul',
        enonce: "Un cadre de fil est posé dans le champ. Le courant monte d’un côté du cadre et descend de l’autre. Que fait le cadre ?",
        methodeVue: "Revoyez l’étape « 6 Le cadre tourne » du dessin et la ligne « Deux poussées font tourner ».",
        choix: [
          { texte: "Il est poussé tout entier vers la droite.", pourquoi: "Les deux côtés portent des courants de sens contraires : ils sont poussés en sens contraires." },
          { texte: "Il ne bouge pas : les deux poussées s’annulent.", pourquoi: "Elles ne s’annulent pas : elles s’exercent sur deux côtés opposés du cadre, et le font tourner." },
          { texte: "Il est attiré vers le pôle sud.", pourquoi: "La poussée part en travers des lignes de champ, pas vers un pôle." },
          { texte: "Il tourne sur son axe : ses deux côtés sont poussés en sens contraires.", juste: true } ],
        confirmation: "Il tourne sur son axe. Deux poussées en sens contraires font tourner." },

      { mode: 'seul',
        enonce: "Dans le stator d’un moteur triphasé, aucune pièce ne bouge. Qu’est-ce qui entraîne le rotor ?",
        methodeVue: "Revoyez l’étape « 7 Le champ tourne » du dessin et la ligne « Le moteur ». La station 2.6 explique le champ tournant.",
        choix: [
          { texte: "Le ventilateur, monté sur l’arbre.", pourquoi: "Le ventilateur refroidit le moteur : il est entraîné par le rotor, il ne l’entraîne pas." },
          { texte: "Le champ des trois bobines, qui tourne.", juste: true },
          { texte: "Un aimant fixé au carter.", pourquoi: "Le champ vient des trois bobines du stator, parcourues par trois courants décalés." },
          { texte: "Les roulements.", pourquoi: "Les roulements guident l’arbre ; ils ne l’entraînent pas." } ],
        confirmation: "Le champ des trois bobines, qui tourne. Le rotor le suit, un peu moins vite (station 6.3)." }
    ]
  },

  methode: {
    titre: 'Prévoir où part le fil',
    lignes: [
      "Repérez le sens du courant dans le fil.",
      "Repérez où sont le pôle nord et le pôle sud de l’aimant.",
      "Partez d’un cas connu, celui du dessin. Changez une seule chose : le courant inversé, ou l’aimant retourné, son pôle nord passant de l’autre côté. Le fil part de l’autre côté.",
      "Deux changements à la fois : le fil revient du même côté.",
      "Un fil posé le long des lignes de champ n’est pas poussé."
    ],
    piege: "La poussée ne va ni dans le sens du courant, ni vers un pôle de l’aimant : elle part en travers des deux."
  },

  /* ---------------------------------------------------------------- temps 4 */
  symboles: [
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé d’une bobine de contacteur ou de relais : un rectangle, un fil qui arrive en haut, un fil qui repart en bas.", legende: "La bobine qui attire" },
    { src: 'assets/moteur_mono1.svg', alt: "Symbole normalisé d’un moteur monophasé : un rond avec M et 1 ~ à l’intérieur, deux fils qui arrivent.", legende: "Le moteur monophasé" },
    { src: 'assets/moteur_tri.svg', alt: "Symbole normalisé d’un moteur triphasé : un rond marqué M, avec ses bornes U1, V1, W1.", legende: "Le moteur triphasé" }
  ],
  lecturePlan: [
    "Sur un schéma électrique, le champ ne se dessine pas. On dessine la bobine qui le crée et le moteur qu’il fait tourner.",
    "La bobine qui attire est un <strong>rectangle</strong> : celle d’un contacteur ou d’un relais (station 8.8).",
    "Le moteur est un <strong>rond marqué M</strong>. Le chiffre sous le M dit le nombre de phases : 1 pour le monophasé, 3 pour le triphasé.",
    "Le sens de rotation n’est pas dans le symbole. Il est donné par une flèche, sur le plan ou sur le carter de la machine (station 2.6)."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'Ce que fait le champ',
    corps: () => {
      const lignes = [
        ['Il attire le fer', "Contacteur, relais, électrovanne, électroaimant de levage", "6.1, 5.2"],
        ['Il oriente un aimant', "La boussole", "6.A"],
        ['Il pousse un fil parcouru par un courant', "En travers du courant et du champ ; un seul changement, et le fil part de l’autre côté", "6.B"],
        ['Deux poussées contraires, sur deux côtés opposés, font tourner', "Le cadre d’un appareil de mesure, le moteur", "2.6, 6.3, 6.5"]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th>Le champ…</th><th>Où vous le voyez</th><th>Stations</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td><strong>' + l[0] + '</strong></td><td>' + l[1] + '</td><td>' + l[2] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t); return d;
    }
  },

  quiz: [
    { question: "Que fait le champ de la bobine d’un contacteur ?",
      confirmation: "Il attire l’armature de fer, qui ferme les contacts.",
      reponses: [
        { texte: "Il chauffe les contacts.", pourquoi: "Le champ ne sert pas à chauffer : il attire l’armature." },
        { texte: "Il attire l’armature de fer, qui ferme les contacts.", juste: true },
        { texte: "Il fait tourner les contacts.", pourquoi: "L’armature se déplace d’un coup : elle ne tourne pas." },
        { texte: "Il change la tension du circuit.", pourquoi: "Changer une tension, c’est le travail du transformateur (station 6.2)." } ] },

    { question: "Un fil parcouru par un courant est posé en travers des lignes de champ. Dans quelle direction est-il poussé ?",
      confirmation: "En travers : ni dans le sens du courant, ni vers un pôle.",
      reponses: [
        { texte: "Vers le pôle nord.", pourquoi: "La poussée ne va vers aucun pôle : elle part en travers." },
        { texte: "Dans le sens du courant.", pourquoi: "Elle part en travers du courant, sur le côté." },
        { texte: "Il n’est pas poussé.", pourquoi: "En travers des lignes de champ, avec du courant, il est poussé." },
        { texte: "Sur le côté, en travers du courant et du champ.", juste: true } ] },

    { question: "Le fil part vers la gauche. On inverse le courant. Où part-il ?",
      confirmation: "Vers la droite : un seul changement, et le fil part de l’autre côté.",
      reponses: [
        { texte: "Vers la droite.", juste: true },
        { texte: "Vers la gauche.", pourquoi: "On a changé une chose, le courant : il part de l’autre côté." },
        { texte: "Vers le haut.", pourquoi: "Il reste poussé sur le côté, mais de l’autre côté." },
        { texte: "Il ne bouge plus.", pourquoi: "Le courant passe toujours : le fil est poussé." } ] },

    { question: "Qu’est-ce qui fait tourner le rotor d’un moteur triphasé ?",
      confirmation: "Le champ tournant des trois bobines du stator (stations 2.6 et 6.3).",
      reponses: [
        { texte: "Le ventilateur.", pourquoi: "Il refroidit le moteur, entraîné par le rotor." },
        { texte: "Un aimant fixe.", pourquoi: "Le champ vient des trois bobines du stator." },
        { texte: "Le champ tournant des trois bobines du stator.", juste: true },
        { texte: "Le condensateur.", pourquoi: "Un moteur triphasé n’en a pas : trois courants décalés suffisent (station 2.6)." } ] }
  ],

  retenir: [
    "Le champ <strong>attire le fer</strong> : contacteur, relais, électrovanne.",
    "Il <strong>oriente un aimant</strong> : la boussole.",
    "Il <strong>pousse un fil</strong> parcouru par un courant, sur le côté. Un seul changement, et le fil part de l’autre côté.",
    "Deux poussées contraires, sur deux côtés opposés d’un cadre, <strong>le font tourner</strong> : c’est le principe du moteur."
  ],

  objectifs: '<p><strong>Objectif.</strong> Savoir ce que fait un champ magnétique : il attire le fer, il oriente un aimant, il pousse un fil parcouru par un courant, et deux poussées contraires font tourner. Prévoir de quel côté part un fil quand on inverse le courant ou qu’on retourne l’aimant.</p>'
    + '<p><strong>Limites.</strong> Aucun calcul de force. La station ne donne pas de règle pour trouver le côté à partir du seul dessin : elle part d’un cas connu et compte les changements. Le moteur n’est vu que dans son principe ; il est étudié aux stations 6.3 et 6.5.</p>',

  credits: [
    { quoi: 'Fil entre les pôles d’un aimant (croquis)', source: '« Créer de l’électricité avec le magnétisme ? La découverte de l’induction », C. Blondel et B. Wolff, texte rangé dans le fonds inerWeb',
      detail: 'croquis repris du document ; droits à confirmer par F. Henninot' },
    { quoi: 'Moteur asynchrone en vue éclatée', source: 'image déjà employée à la station 6.3, fonds inerWeb',
      detail: 'mêmes droits que la station 6.3' },
    { quoi: 'Attraction, fil poussé, cadre qui tourne, électroaimant de levage', source: 'cours « L’électromagnétisme » (Institut Cardijn Lorraine, Arlon), document de collègue du fonds inerWeb',
      detail: '§ 21, 23 et 24 ; cité, non reproduit' },
    { quoi: 'Le moteur réversible, la machine électrique', source: 'cours « C08 moteur », fonds inerWeb', detail: 'cité, non reproduit' },
    { quoi: 'Symboles', source: 'bibliothèque inerWeb, convertie depuis QElectroTech (EN 60617)',
      detail: 'bobine (station 6.1), moteurs monophasé (station 6.5) et triphasé (station 6.3)' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.C Action et réaction", href: '../6-c-action-et-reaction/index.html' },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone triphasé", href: '../6-3-moteur-asynchrone/index.html' },
    { ligne: 2, couleur: '#0C4B88', texte: "2.6 Le champ tournant", href: '../2-6-champ-tournant/index.html' }
  ]
});

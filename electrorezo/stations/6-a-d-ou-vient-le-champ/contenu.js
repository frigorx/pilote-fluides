/* ÉlectroRézo 6.A — D'où vient le champ magnétique.
   Première des trois stations du champ, posées devant la 6.1 (décision de F. Henninot, 29/10/2026 : numéros
   6.A, 6.B, 6.C ; ni vecteur ni Fresnel ; ni Lenz ni Faraday nommés). Modèle « geste » : exemple résolu,
   questions guidées, puis seul. Aucun fait hors de LIGNE-6-CHAMP-FAITS.md. Pas de vue 3D. */

const ALT_PINCE_6A = "Croquis : à gauche, une électrovanne et sa bobine bleue ; à droite, une pince ampèremétrique ouverte, approchée de la bobine sans l’entourer. Légende du croquis : « Si la bobine est excitée, l’ampèremètre dévie. »";

function figure6A(src, alt, legende) {
  const f = document.createElement('figure');
  f.style.cssText = 'max-width:360px;margin:.4rem 0';
  const i = document.createElement('img');
  i.src = src; i.alt = alt; i.loading = 'lazy';
  i.style.cssText = 'display:block;width:100%;height:auto';
  const c = document.createElement('figcaption');
  c.className = 'legende'; c.textContent = legende;
  f.append(i, c);
  return f;
}

ModelePratique.construire({
  id: '6.A', ligne: 6,
  kicker: 'ÉlectroRézo · Ligne 6 Machines · Station A',
  titre: "D’où vient le champ magnétique",
  narration: NARRATION,

  prerequis: [
    { id: '1.1', quoi: "le courant" }
  ],

  codes: {
    referentiel: 'CAP IFCA — référentiel de certification',
    lignes: [
      ['Compétence', 'C4.5', "Mesurer, comparer des grandeurs"],
      ['Tâche', 'T13', "Tirer au vide, charger et contrôler l'installation sous tension"],
      ['Savoir', 'S5.6', "Réseaux, matériels électriques et de régulation"]
    ],
    note: 'Les stations 6.A, 6.B et 6.C posent une notion de base. Les codes disent où elle resservira : le contrôle d’une bobine d’électrovanne, d’un contacteur, d’un moteur.'
  },

  photos: [
    { src: 'assets/biblio/limaille-autour-d-un-aimant.jpeg',
      alt: "Gravure : de la limaille de fer saupoudrée autour d’un aimant droit. Les grains dessinent des lignes courbes qui partent du pôle marqué N et reviennent au pôle marqué S.",
      titre: "Le champ se voit.", sous: "Saupoudrée autour d’un aimant, la limaille de fer dessine des lignes, du pôle nord au pôle sud." },
    { src: 'assets/biblio/electrovanne-et-sa-bobine.png',
      alt: "Photo d’une électrovanne : un corps en laiton avec deux raccords et une flèche du sens de passage, surmonté d’une bobine noire et de son écrou jaune.",
      titre: "Un courant le fabrique.", sous: "Quand le courant passe, la bobine noire de cette électrovanne crée un champ. Il déplace le clapet qui ouvre ou ferme la vanne." }
  ],
  creditPhoto: 'Illustrations : documents de cours du fonds inerWeb. Détail dans « Crédits ».',

  titres: { objet: 'Le champ se voit', serviCa: 'De quoi on parle', dedans: 'D’où vient le champ', variantes: 'Ce que vous rencontrerez',
            symboles: 'Les symboles normalisés', plan: 'Le lire sur un plan', methode: 'Vérifier qu’une bobine crée son champ' },

  question: "Un aimant attire le fer sans le toucher. Une bobine aussi, mais seulement quand le courant passe. D’où vient cette force ?",
  aQuoiCaSert: "Autour d’un aimant, il y a une zone où le fer est attiré et où une boussole tourne : c’est le <strong>champ magnétique</strong>. Un fil parcouru par un courant crée lui aussi un champ. Enroulé en bobine autour d’un noyau de fer, il devient un aimant qu’on allume et qu’on éteint.",
  ouOnLeTrouve: "Dans tout ce qui contient une bobine : le contacteur, le relais, l’électrovanne, le moteur, le transformateur. La station 6.B montre ce que fait ce champ, la station 6.C ce qui se passe quand il change.",

  /* ---------------------------------------------------------------- temps 2 */
  scene: () => SchemasChamp.sources(),

  technologie: [
    ["L’aimant", "il a deux pôles, nord et sud. Deux pôles de même nom se repoussent, deux pôles de noms contraires s’attirent. Autour de lui, la limaille de fer dessine des lignes : ce sont les <strong>lignes de champ</strong>. Dehors, elles vont du pôle nord au pôle sud."],
    ["La boussole", "c’est une petite aiguille aimantée, libre de tourner. Loin de tout aimant, elle montre le nord de la Terre. Près d’un aimant, elle se place le long d’une ligne de champ."],
    ["Le fil parcouru par un courant", "il crée un champ autour de lui. La limaille se range en cercles autour du fil, et les boussoles tournent pour s’aligner sur ces cercles. On inverse le courant : les boussoles se retournent. Le sens du champ suit le sens du courant."],
    ["La bobine", "c’est un fil enroulé en spires. Parcourue par un courant, elle se comporte comme un aimant : un pôle nord à un bout, un pôle sud à l’autre. On coupe le courant : le champ de la bobine disparaît. On inverse le courant : les pôles s’inversent."],
    ["Le noyau de fer", "placé dans la bobine, il rend le champ plus fort et le guide. Une boussole éloignée, qui ne sentait que la Terre, dévie : elle sent maintenant le champ de la bobine. On coupe le courant : le fer ne garde pas d’aimantation. L’acier, lui, en garde une partie."],
    ["L’électroaimant", "une bobine et son noyau de fer. C’est la pièce commune au contacteur, au relais et à l’électrovanne (station 6.1)."]
  ],

  variantes: [
    "<strong>L’aimant permanent</strong> : un morceau d’acier aimanté. Il garde son champ sans courant, et on ne peut pas l’éteindre.",
    "<strong>L’électroaimant de levage</strong> : sur une grue, il soulève la ferraille. On coupe le courant, l’aimantation disparaît, et la charge tombe.",
    "<strong>La bobine d’électrovanne</strong> : elle s’enfile sur le noyau de la vanne. On la retire, par exemple, avant de braser la vanne.",
    "<strong>La Terre</strong> : elle a son propre champ, faible. C’est lui qui oriente une boussole loin de tout aimant.",
    "<strong>Le fer d’un moteur ou d’un transformateur</strong> : il est fait de tôles minces, isolées entre elles (station 6.2)."
  ],

  /* ---------------------------------------------------------------- temps 3 */
  exercices: {
    titre: 'Prévoir ce que fait la boussole',
    consigne: 'Six exercices, sans note. Les premiers disent où regarder et comment faire ; les derniers, non. Le premier est déjà résolu : imitez-le.',
    items: [
      { mode: 'exemple',
        enonce: "On inverse le courant dans le fil. Que font les boussoles posées autour ?",
        ou: "au temps 2, sur le dessin : appuyez sur « 2 Le fil », puis sur « 3 Le courant inversé ». Relisez la ligne « Le fil parcouru par un courant ».",
        comment: "suivez une seule boussole, avant et après : regardez où pointe sa pointe rouge.",
        resolu: "Elles se retournent toutes. Le sens du champ suit le sens du courant." },

      { mode: 'guide',
        enonce: "On inverse le courant dans une bobine. Que deviennent ses deux bouts ?",
        ou: "au temps 2, la ligne « La bobine ».",
        comment: "cherchez dans cette ligne ce que fait « on inverse le courant ».",
        choix: [
          { texte: "Rien ne change : le pôle nord reste au même bout.", pourquoi: "La ligne « La bobine » dit le contraire : on inverse le courant, les pôles s’inversent." },
          { texte: "Le pôle nord devient le pôle sud, et l’inverse.", juste: true },
          { texte: "Le champ disparaît.", pourquoi: "Le champ disparaît quand on coupe le courant. Ici, le courant passe toujours, dans l’autre sens." },
          { texte: "Les deux bouts deviennent des pôles nord.", pourquoi: "Une bobine a toujours un pôle nord et un pôle sud, un à chaque bout." } ],
        confirmation: "Les pôles s’inversent : le pôle nord devient le pôle sud, et l’inverse." },

      { mode: 'guide',
        enonce: "Une boussole est posée loin d’une bobine sans noyau. Elle montre le nord de la Terre. On glisse un noyau de fer dans la bobine. Que fait la boussole ?",
        ou: "au temps 2, sur le dessin : appuyez sur « 4 La bobine », puis sur « 5 Le noyau de fer ». Regardez la boussole du coin, en haut à droite. Relisez la ligne « Le noyau de fer ».",
        comment: "comparez la boussole du coin avant et après le noyau.",
        choix: [
          { texte: "Elle ne bouge pas : le fer n’a aucun effet.", pourquoi: "Avec le noyau, le champ devient plus fort : la boussole du coin tourne." },
          { texte: "Elle montre le nord de la Terre encore plus fort.", pourquoi: "Le noyau renforce le champ de la bobine ; celui de la Terre ne change pas." },
          { texte: "Elle se met à tourner sans arrêt.", pourquoi: "Elle dévie une fois, puis elle s’arrête dans sa nouvelle position." },
          { texte: "Elle dévie : le noyau rend le champ de la bobine plus fort.", juste: true } ],
        confirmation: "Elle dévie. Le noyau de fer rend le champ plus fort et le guide." },

      { mode: 'guide',
        enonce: "Sur une électrovanne alimentée, vous posez un petit tournevis sur le dessus du noyau de la bobine. Il est attiré. Que concluez-vous ?",
        ou: "au temps 3, la carte de droite « Vérifier qu’une bobine crée son champ », ligne 1.",
        comment: "lisez ce que doit faire le tournevis quand la bobine crée son champ.",
        choix: [
          { texte: "La bobine crée un champ : elle est alimentée.", juste: true },
          { texte: "La bobine est grillée.", pourquoi: "Une bobine grillée ne crée plus de champ : le tournevis ne serait pas attiré." },
          { texte: "La vanne fuit.", pourquoi: "Le tournevis ne dit rien de l’étanchéité : il montre le champ de la bobine." },
          { texte: "Le tournevis est aimanté, la bobine n’y est pour rien.", pourquoi: "Le test vient de la synthèse sur l’électrovanne : on doit sentir une attirance quand la bobine est alimentée." } ],
        confirmation: "La bobine est alimentée et crée son champ : le tournevis est attiré." },

      { mode: 'seul',
        enonce: "Vous approchez une pince ampèremétrique ouverte d’une bobine d’électrovanne, comme sur le croquis. L’aiguille de la pince dévie. Que concluez-vous ?",
        figure: () => figure6A('assets/biblio/pince-pres-d-une-bobine.jpeg', ALT_PINCE_6A, "La pince est ouverte : elle n’entoure aucun fil."),
        methodeVue: "Revoyez la carte « Vérifier qu’une bobine crée son champ ».",
        choix: [
          { texte: "La pince mesure le courant d’un fil : ici, elle ne mesure rien.", pourquoi: "Approchée ouverte d’une bobine alimentée, la pince montre une intensité. Le croquis le dit : si la bobine est excitée, l’ampèremètre dévie." },
          { texte: "La bobine est coupée.", pourquoi: "Une bobine coupée ne crée pas de champ : la pince ne dévierait pas." },
          { texte: "La bobine est alimentée : la pince approchée montre une intensité.", juste: true },
          { texte: "La vanne est ouverte.", pourquoi: "La pince montre que la bobine crée un champ. Pour savoir si la vanne est NO ou NF, il faut sa documentation." } ],
        confirmation: "La bobine est alimentée, on dit aussi excitée : la pince approchée montre une intensité, même ouverte." },

      { mode: 'seul',
        enonce: "Un collègue veut retirer la bobine d’une électrovanne pour la changer. Le circuit est encore alimenté. Que risque la bobine ?",
        methodeVue: "Revoyez l’avertissement de la carte « Vérifier qu’une bobine crée son champ ».",
        choix: [
          { texte: "Rien : la bobine ne craint rien hors de son noyau.", pourquoi: "La synthèse sur l’électrovanne dit le contraire : hors de son noyau et alimentée, elle chauffe, gonfle et fond." },
          { texte: "Elle chauffe, elle gonfle, elle fond, à court terme.", juste: true },
          { texte: "Elle perd son aimantation.", pourquoi: "Une bobine ne garde pas d’aimantation : son champ vient du courant. Le risque est qu’elle chauffe et fonde." },
          { texte: "La vanne se met à fuir.", pourquoi: "Le risque porte sur la bobine : elle chauffe, gonfle et fond." } ],
        confirmation: "Elle chauffe, gonfle et fond. On coupe l’alimentation avant de retirer une bobine de son noyau." }
    ]
  },

  methode: {
    titre: 'Vérifier qu’une bobine crée son champ',
    lignes: [
      "Sur une électrovanne alimentée, posez un <strong>petit tournevis</strong> sur le dessus du noyau de la bobine. Vous devez sentir une attirance.",
      "Ou bien approchez une <strong>pince ampèremétrique</strong> ouverte de la bobine. Si la bobine est alimentée (on dit aussi « excitée »), la pince montre une intensité : son aiguille dévie.",
      "Le tournevis et la pince se posent sur le noyau ou près de la bobine, jamais sur ses bornes. Pour retirer la bobine, coupez et consignez d’abord (carte « Avant de toucher »).",
      "Sur une table, une <strong>boussole</strong> fait le même travail : elle tourne près d’une bobine alimentée, et revient vers le nord quand on coupe le courant."
    ],
    piege: "Ne retirez jamais une bobine d’électrovanne de son noyau quand elle est alimentée : à court terme, elle chauffe, elle gonfle, elle fond."
  },
  securite: true,

  /* ---------------------------------------------------------------- temps 4 */
  symboles: [
    { src: 'assets/aimant-permanent.svg', alt: "Symbole normalisé d’un aimant permanent : un petit U noir, plein.", legende: "L’aimant permanent" },
    { src: 'assets/inductance-a-noyau.svg', alt: "Symbole normalisé d’une inductance à noyau magnétique : quatre demi-cercles en ligne, la bobine, et un trait droit au-dessus, le noyau.", legende: "La bobine à noyau de fer" },
    { src: 'assets/bobine3.svg', alt: "Symbole normalisé d’une bobine de contacteur ou de relais : un rectangle, un fil qui arrive en haut, un fil qui repart en bas.", legende: "La bobine d’un contacteur" },
    { src: 'assets/electrovanne.svg', alt: "Symbole normalisé d’une électrovanne : une bobine agissant sur un clapet.", legende: "L’électrovanne" }
  ],
  lecturePlan: [
    "Sur un plan, le champ ne se dessine pas. On dessine ce qui le crée : l’aimant, la bobine.",
    "Dans la bobine à noyau de fer, les demi-cercles sont les spires, et le trait droit au-dessus est le noyau.",
    "Sur un schéma de commande, la bobine d’un contacteur ou d’un relais est un <strong>rectangle</strong> (station 8.8). Sa tension est écrite à côté.",
    "Le champ se note <strong>B</strong> et se mesure en <strong>teslas</strong>, notés T. Le champ de la Terre vaut environ 0,000 05 T ; entre les branches d’un aimant en fer à cheval, quelques centièmes de tesla ; dans l’entrefer d’un moteur, 1 à 1,5 T."
  ],

  /* ---------------------------------------------------------------- temps 5 */
  recap: {
    titre: 'D’où vient le champ',
    corps: () => {
      const lignes = [
        ['Un aimant', "Toujours là ; dehors, du pôle nord au pôle sud.", "Non."],
        ['Un fil parcouru par un courant', "En cercles autour du fil. Son sens suit le courant.", "Oui : on coupe le courant."],
        ['Une bobine', "Comme un aimant : un pôle nord, un pôle sud.", "Oui : on coupe le courant."],
        ['Une bobine et son noyau de fer', "Plus fort, guidé par le fer : c’est l’électroaimant.", "Oui : le fer ne garde rien."],
        ['La Terre', "Faible. Il oriente la boussole.", "Non."]
      ];
      const t = document.createElement('table');
      t.innerHTML = '<thead><tr><th>Ce qui le crée</th><th>Le champ</th><th>On peut l’éteindre ?</th></tr></thead><tbody>'
        + lignes.map(l => '<tr><td><strong>' + l[0] + '</strong></td><td>' + l[1] + '</td><td>' + l[2] + '</td></tr>').join('') + '</tbody>';
      const d = document.createElement('div'); d.className = 'recap'; d.appendChild(t); return d;
    }
  },

  quiz: [
    { question: "Loin de tout aimant, où pointe la pointe rouge d’une boussole ?",
      confirmation: "Vers le nord de la Terre : la boussole suit le champ terrestre.",
      reponses: [
        { texte: "Vers le nord de la Terre.", juste: true },
        { texte: "N’importe où : elle tourne au hasard.", pourquoi: "Loin de tout aimant, elle suit le champ de la Terre : elle montre le nord." },
        { texte: "Vers le fil le plus proche.", pourquoi: "Un fil sans courant ne crée pas de champ." },
        { texte: "Vers le bas.", pourquoi: "Elle montre le nord de la Terre." } ] },

    { question: "Un fil est parcouru par un courant. Comment se rangent les boussoles posées autour ?",
      confirmation: "Alignées sur des cercles autour du fil : le courant crée un champ en cercles.",
      reponses: [
        { texte: "Toutes vers le nord, comme sans courant.", pourquoi: "Le courant crée un champ : près du fil, les boussoles le suivent." },
        { texte: "Toutes vers le fil.", pourquoi: "Elles ne pointent pas vers le fil : elles s’alignent sur des cercles autour de lui." },
        { texte: "Alignées sur des cercles autour du fil.", juste: true },
        { texte: "Elles ne bougent pas.", pourquoi: "Elles bougent : c’est ainsi qu’on voit le champ du courant." } ] },

    { question: "À quoi sert le noyau de fer dans une bobine ?",
      confirmation: "À rendre le champ plus fort et à le guider.",
      reponses: [
        { texte: "À isoler les spires.", pourquoi: "C’est le vernis du fil qui isole les spires." },
        { texte: "À garder l’aimantation quand on coupe.", pourquoi: "Le fer ne garde pas d’aimantation : c’est l’acier qui en garde une partie." },
        { texte: "À limiter le courant.", pourquoi: "Son rôle est magnétique : il renforce et guide le champ." },
        { texte: "À rendre le champ plus fort et à le guider.", juste: true } ] },

    { question: "On coupe le courant d’un électroaimant de levage. Que devient la ferraille ?",
      confirmation: "Elle tombe : sans courant, l’aimantation disparaît.",
      reponses: [
        { texte: "Elle reste collée.", pourquoi: "Le fer ne garde pas d’aimantation : sans courant, plus de champ." },
        { texte: "Elle tombe.", juste: true },
        { texte: "Elle est repoussée vers le haut.", pourquoi: "Sans courant, il n’y a plus de champ du tout." },
        { texte: "Elle reste collée tant que la grue ne bouge pas.", pourquoi: "Sans courant, l’aimantation disparaît tout de suite." } ] }
  ],

  retenir: [
    "Un <strong>aimant</strong> a un pôle nord et un pôle sud. Les pôles de noms contraires s’attirent.",
    "Un <strong>courant</strong> crée un champ. Le sens du champ suit le sens du courant.",
    "Une <strong>bobine</strong> parcourue par un courant est un aimant qu’on allume et qu’on éteint.",
    "Le <strong>noyau de fer</strong> rend le champ plus fort et le guide. Il ne garde pas d’aimantation."
  ],

  objectifs: '<p><strong>Objectif.</strong> Savoir d’où vient un champ magnétique : un aimant, un fil parcouru par un courant, une bobine, une bobine avec son noyau de fer. Prévoir ce que fait une boussole quand on inverse ou coupe le courant, ou quand on ajoute le noyau. Vérifier sur le terrain qu’une bobine d’électrovanne crée son champ.</p>'
    + '<p><strong>Limites.</strong> Aucun calcul : la station ne donne que des ordres de grandeur du champ. Elle ne dit pas comment trouver le pôle nord d’une bobine à partir du sens du courant. Elle ne dit pas pourquoi une bobine sortie de son noyau chauffe : la synthèse sur l’électrovanne le constate sans l’expliquer.</p>',

  credits: [
    { quoi: 'Limaille de fer autour d’un aimant droit (gravure)', source: '« Le froid exercices corrigé », document de cours du fonds inerWeb',
      detail: 'image reprise du document ; droits à confirmer par F. Henninot' },
    { quoi: 'Électrovanne et sa bobine (photo)', source: '« CAP IFCA liste symboles fluid », document de cours du fonds inerWeb',
      detail: 'droits à confirmer par F. Henninot' },
    { quoi: 'Pince ampèremétrique près d’une bobine (croquis)', source: '« 12.01 V2 Ressources activité n°21 », document de cours du fonds inerWeb',
      detail: 'croquis du cours, repris tel quel' },
    { quoi: 'Champ d’un fil, d’une bobine, rôle du noyau, ordres de grandeur', source: 'cours « L’électromagnétisme » (Institut Cardijn Lorraine, Arlon), document de collègue du fonds inerWeb',
      detail: '§ 1 à 10 et § 21 ; cité, non reproduit' },
    { quoi: 'Tournevis, pince ampèremétrique, bobine retirée de son noyau', source: '« Synthèse activité N° 21 seconde » et « Ressources activité n°21 », fonds inerWeb',
      detail: 'cités, non reproduits' },
    { quoi: 'Symboles', source: 'bibliothèque inerWeb, convertie depuis QElectroTech (EN 60617)',
      detail: 'aimant permanent 02-17-03, inductance à noyau 04-03-03 ; bobine et électrovanne repris de la station 6.1' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.B Ce que fait le champ", href: '../6-b-ce-que-fait-le-champ/index.html' },
    { ligne: 6, couleur: '#c9451a', texte: "6.1 La bobine et l’électro-aimant", href: '../6-1-bobine-electro-aimant/index.html' },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.1 Le courant", href: '../1-1-courant-intensite/index.html' }
  ]
});

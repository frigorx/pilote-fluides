/* ÉlectroRézo 4.10 — Choisir la section d’un câble.
   Modèle « grandeur » : on étudie une chose qui se calcule, pas un objet.
   Chiffres : NF C 15-100 tableau 52H (voir scenes.js et SOURCES.md). */

ModeleGrandeur.construire({
  id: '4.10', ligne: 4,
  vue3d: { modele: 'cablesSections', options: { iz: [17.5, 24, 41, 76] }, defaut: 'schema' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 4 Protéger · Station 10 · fin de ligne',
  titre: "Choisir la section d’un câble",
  narration: NARRATION,

  prerequis: [
    { id: '1.1', quoi: "le courant" },
    { id: '1.4', quoi: "la puissance" },
    { id: '4.9', quoi: "le câble" },
  ],

  photos: [
    { src: 'assets/biblio/section-chute-tension.svg',
      alt: "Deux câbles qui alimentent le même récepteur : la petite section perd plus de tension en route que la grande.",
      titre: "Plus c’est long, plus ça perd.", sous: "Une petite section résiste davantage : la tension arrive diminuée." },
    { src: 'assets/biblio/tableau-sections-cuivre.jpeg',
      alt: "Tableau de la norme donnant le courant admissible d’un câble en cuivre selon sa section, son isolant et son mode de pose.",
      titre: "Le tableau de la norme.", sous: "Une section, une pose, un isolant : un courant à ne pas dépasser." }
  ],
  creditPhoto: 'Illustration : parcours « Sous tension », F. Henninot. Tableau : document de cours, NF C 15-100. Détail dans « Crédits ».',

  lIdee: "Un câble trop fin chauffe, et un câble trop long perd de la tension en route. Choisir une section, c’est vérifier ces deux choses, dans cet ordre, et prendre la plus grosse des deux réponses.",
  ouOnLaRencontre: "Sur chaque chantier : alimenter un groupe de condensation au fond du jardin, une chambre froide au bout de l’atelier, une pompe à chaleur dans un garage. Le courant ne change pas, la distance si — et c’est souvent elle qui décide.",

  scene: () => ScenesSection.curseurs(),

  ceQuiSePasse: [
    ["D’abord le calibre", "le courant demandé par l’appareil fixe le calibre du disjoncteur, juste au-dessus. 14 ampères demandés : disjoncteur de 16."],
    ["Puis la section qui supporte ce calibre", "on lit dans le tableau de la norme la première section qui admet au moins ce courant, pour ce mode de pose et cet isolant. Le câble doit tenir tout ce que le disjoncteur laisse passer."],
    ["Enfin la longueur", "on calcule la chute de tension. Si elle dépasse la limite, on prend la section au-dessus, et on recommence jusqu’à passer."],
    ["La plus grosse gagne", "les deux vérifications donnent chacune une section. On garde la plus grosse : elle satisfait les deux."]
  ],
  aRetenir: [
    "La section se note <strong>S</strong> et se mesure en <strong>millimètres carrés</strong>, mm².",
    "<strong>Courant demandé ≤ calibre ≤ courant admissible du câble.</strong> Dans cet ordre, sans exception.",
    "Chute de tension : <strong>3 %</strong> pour l’éclairage, <strong>5 %</strong> pour le reste.",
    "Sur une grande longueur, c’est la chute de tension qui fait grossir le câble, pas l’échauffement."
  ],

  mesure: () => ScenesSection.mesurer(),
  instrument: [
    "D’abord, <strong>lire la gaine</strong> : la section y est imprimée, par exemple 3G2,5 — trois conducteurs de 2,5 mm².",
    "Si rien n’est lisible : couper, consigner, dénuder un bout de l’âme et mesurer son <strong>diamètre au pied à coulisse</strong>.",
    "La section se calcule : <strong>π × d² / 4</strong>. Un fil de 1,78 mm de diamètre fait 2,5 mm².",
    "Sur un fil <strong>souple</strong> fait de nombreux brins, la mesure du diamètre ne donne rien de fiable : on se fie à la gaine ou au carnet de câbles."
  ],
  dangerDeMesure: "On ne dénude jamais un câble sous tension pour le mesurer. On coupe, on consigne, on vérifie l’absence de tension. Toujours.",

  ecriture: {
    symbole: 'S', unite: 'mm²', nomUnite: 'le millimètre carré',
    multiples: [
      ['1,5 mm²', 'circuit d’éclairage d’un logement, disjoncteur 16 A'],
      ['2,5 mm²', 'circuit de prises, disjoncteur 20 A'],
      ['6 mm²', 'plaque de cuisson en monophasé, disjoncteur 32 A'],
      ['10 mm² et plus', 'les grandes longueurs et les fortes puissances']
    ]
  },
  surUnePlaque: [
    "Sur la <strong>gaine</strong> : 3G2,5 veut dire trois conducteurs dont un vert-jaune, de 2,5 mm². 4x6 veut dire quatre conducteurs de 6 mm², sans vert-jaune.",
    "Dans le <strong>carnet de câbles</strong> d’un chantier : section, désignation et longueur de chaque ligne.",
    "Dans la <strong>notice du groupe</strong> : le constructeur indique souvent la section et le calibre conseillés. On vérifie quand même la longueur.",
    "Ces sections forment une suite normalisée : 1,5 · 2,5 · 4 · 6 · 10 · 16 · 25 · 35. On ne trouve pas de câble de 3 mm²."
  ],

  quiz: [
    { question: "Un groupe demande 14 A. Quel calibre de disjoncteur ?",
      confirmation: "Le premier calibre normalisé au-dessus du courant demandé : 16 A.",
      reponses: [
        { texte: "10 A.", pourquoi: "Il déclencherait en marche normale : le calibre doit être au moins égal au courant demandé." },
        { texte: "16 A.", juste: true },
        { texte: "32 A.", pourquoi: "Trop grand : il obligerait à poser un câble bien plus gros, et protégerait mal un câble ordinaire." },
        { texte: "14 A.", pourquoi: "Ce calibre n’existe pas dans la suite normalisée : 10, 16, 20, 25, 32…" } ] },

    { question: "Même courant, mais le câble passe de 10 à 80 mètres. Que fait la section ?",
      confirmation: "Elle peut grossir : la chute de tension grandit avec la longueur.",
      reponses: [
        { texte: "Rien, seule l’intensité compte.", pourquoi: "C’est vrai pour l’échauffement, pas pour la chute de tension." },
        { texte: "Elle peut diminuer.", pourquoi: "Un câble plus long résiste davantage : il faudrait au contraire plus de cuivre." },
        { texte: "Elle peut grossir, à cause de la chute de tension.", juste: true },
        { texte: "On change seulement le calibre.", pourquoi: "Le calibre dépend du courant, pas de la longueur." } ] },

    { question: "L’échauffement donne 2,5 mm², la chute de tension donne 6 mm². Que pose-t-on ?",
      confirmation: "La plus grosse des deux : 6 mm², qui satisfait les deux règles.",
      reponses: [
        { texte: "2,5 mm², puisqu’il ne chauffe pas.", pourquoi: "Il ne chaufferait pas, mais la tension arriverait trop basse au bout." },
        { texte: "4 mm², un compromis.", pourquoi: "Un compromis ne satisfait aucune des deux règles : la chute dépasserait encore." },
        { texte: "6 mm².", juste: true },
        { texte: "10 mm², par sécurité.", pourquoi: "Ce n’est pas faux pour le câble, mais c’est plus cher sans raison : la règle demande 6." } ] },

    { question: "Quelle chute de tension admet-on sur un circuit d’éclairage ?",
      confirmation: "3 % pour l’éclairage, 5 % pour les autres usages.",
      reponses: [
        { texte: "3 %.", juste: true },
        { texte: "5 %.", pourquoi: "C’est la limite des autres usages : moteurs, chauffage, prises." },
        { texte: "10 %.", pourquoi: "Bien trop : une lampe ou un moteur fonctionnerait mal." },
        { texte: "Aucune limite.", pourquoi: "La norme en fixe une, parce qu’un appareil sous-alimenté chauffe ou fonctionne mal." } ] }
  ],

  final: () => ScenesSection.tableau(),
  finalTitre: 'Le tableau : intensité × longueur → section',

  objectifs: '<p><strong>Objectif.</strong> Choisir la section d’un câble en cuivre à partir du courant demandé et de la longueur : calibre, courant admissible, chute de tension. Mesurer une section quand la gaine est illisible.</p>'
    + '<p><strong>Limites.</strong> Chiffres de la NF C 15-100, tableau 52H, pour un seul circuit à 30 °C. Les facteurs de correction (température, câbles groupés) sont vus en Bac pro avec le cours « Choix des conducteurs » : ils ne sont pas appliqués ici. Chute de tension calculée pour un circuit résistif, réactance négligée. Fusibles : voir 4.1.</p>',
  credits: [
    { quoi: 'Illustration « Section et chute de tension »', source: 'parcours Sous tension, F. Henninot',
      detail: 'assets/illustrations/12_section_chute_tension.svg' },
    { quoi: 'Tableau des courants admissibles', source: 'document de cours, d’après la NF C 15-100 (tableau 52H)',
      detail: 'base de connaissances inerWeb, même photo qu’en 4.9' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.9 Le câble : section et désignation" },
    { ligne: 4, couleur: '#c0392b', texte: "4.3 Disjoncteur magnéto-thermique" },
    { ligne: 1, couleur: '#2e6f9e', texte: "1.3 La résistance et la loi d’Ohm" },
    { ligne: 4, couleur: '#c0392b', texte: "Parcours Sous tension, TD3 : plus long, plus fort, plus gros" } ]
});

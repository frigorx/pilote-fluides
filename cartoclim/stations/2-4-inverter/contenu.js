/* CartoClim 2.4 — L'Inverter : la vitesse suit le besoin. Écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '2.4', ligne: 2,
  kicker: 'CartoClim · Ligne 2 La machine · Station 4',
  titre: "L’Inverter : la vitesse suit le besoin",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" },
    { id: '2.3', quoi: "le compresseur de la clim : rotatif ou scroll" }
  ],

  photos: [
    { src: 'assets/ud-exte-split.svg',
      alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses deux raccords.",
      titre: "L’unité extérieure.", sous: "C’est là que se trouvent la carte électronique et le compresseur qu’elle commande." },
    { src: 'assets/compresseurrotatif.svg',
      alt: "Symbole d’un compresseur rotatif : un cercle contenant deux lignes obliques et un petit cercle central.",
      titre: "Le compresseur, dedans.", sous: "Un compresseur ordinaire : c’est la façon de le faire tourner qui change." }
  ],
  creditPhoto: 'Pas de photographie libre de marque pour cette station : on montre les symboles du climatiseur. Détail dans « Crédits ».',

  aQuoiCaSert: "À <strong>faire suivre la vitesse du compresseur au besoin de la pièce</strong>. Un compresseur classique n’a que deux états : à fond, ou arrêté. Avec l’Inverter, une carte électronique règle sa vitesse : lent quand la pièce demande peu, rapide quand elle demande beaucoup. La température reste stable, le compresseur démarre moins souvent, il consomme moins et fait moins de bruit.",
  ouOnLeTrouve: "Sur les climatiseurs récents : le mot « Inverter » est écrit sur l’unité extérieure. Le technicien le rencontre à la pose, au dépannage — et quand un client s’inquiète que sa machine « ne s’arrête plus » : elle tourne doucement, et c’est normal.",

  scene: () => ScenesStation.vitesseSuitLeBesoin(),

  titreDedans: 'Ce qu’il y a dedans, et comment ça marche',
  technologie: [
    ["La carte électronique", "dans l’unité extérieure. Elle reçoit le courant du réseau, le <strong>redresse</strong>, puis fabrique un courant alternatif à <strong>fréquence variable</strong>. C’est elle qui décide de la vitesse."],
    ["Le moteur du compresseur", "il tourne plus ou moins vite selon la fréquence que la carte lui envoie : la vitesse suit la fréquence. Le compresseur lui-même, rotatif ou scroll, est celui de la station 2.3."],
    ["Les sondes", "des sondes de température, celle de l’air de la pièce en premier. Elles disent à la carte où en est la pièce."],
    ["La consigne", "ce que l’occupant demande à la télécommande. La carte compare la mesure à la consigne : <strong>l’écart décide de la vitesse</strong>."]
  ],

  variantes: [
    "<strong>Tout-ou-rien</strong> — le compresseur démarre à fond, s’arrête, redémarre. Plus simple, sans carte pour régler la vitesse, mais la température fait des dents de scie.",
    "<strong>Inverter</strong> — la vitesse suit le besoin. C’est le cas de cette station.",
    "<strong>Multisplit et DRV</strong> — plusieurs unités intérieures demandent chacune leur part : la vitesse du compresseur suit l’ensemble des besoins. Stations 3.4 et 3.5.",
    "<strong>Le détendeur</strong> — quand la vitesse du compresseur change, le débit de fluide change avec elle : le détendeur doit suivre. Station 2.5."
  ],
  reglage: "Rien à régler sur le compresseur lui-même : la carte choisit la vitesse. Ce qu’on règle, c’est la <strong>consigne</strong> à la télécommande (station 5.1). Ce qu’on lit, quand ça ne va pas, ce sont les <strong>codes défauts</strong> de la carte (station 5.6).",

  consigneAptitudes: 'Un split équipé d’un Inverter : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un Inverter ?',
  colonnes: [
    { id: 'adapter', libelle: 'Adapter la puissance', aide: 'ralentir quand la pièce demande peu, accélérer quand elle demande beaucoup',
      dessin: '<path d="M12 72 A38 38 0 0 1 88 72"/><path d="M50 72 L68 42"/><circle cx="50" cy="72" r="5"/>' },
    { id: 'sansCarte', libelle: 'Se passer de carte', aide: 'faire varier la vitesse sans aucune électronique',
      dessin: '<rect x="28" y="28" width="44" height="44" rx="4"/><path d="M40 28 V14 M60 28 V14 M40 72 V86 M60 72 V86 M28 40 H14 M28 60 H14 M72 40 H86 M72 60 H86"/>' },
    { id: 'sansDemarrage', libelle: 'Plus aucun démarrage', aide: 'le compresseur ne démarre jamais, il ne fait que changer de vitesse',
      dessin: '<path d="M50 12 V48"/><path d="M30 28 A32 32 0 1 0 70 28"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    adapter: true, sansCarte: false, sansDemarrage: false,
    bonneReponse: 'Exact. Il adapte la puissance au besoin de la pièce, et pour cela il lui faut une carte électronique. Les démarrages, eux, ne disparaissent pas : ils deviennent rares.',
    erreurs: {
      adapter: 'C’est tout son métier : la vitesse du compresseur monte quand la pièce demande beaucoup, et descend quand elle demande peu.',
      sansCarte: 'Impossible : c’est la carte qui redresse le courant puis fabrique la fréquence variable. Sans elle, le compresseur n’aurait qu’une vitesse.',
      sansDemarrage: 'Il en reste : quand on coupe la machine, ou quand la pièce n’a plus aucun besoin. Mais ils sont rares, bien plus que sur un compresseur tout-ou-rien.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>L’alimentation de l’unité extérieure</strong>, protégée par son disjoncteur, comme sur tout split : station 4.5. La carte est <strong>dans</strong> l’unité, câblée à l’usine.",
    "<strong>Le câble entre les deux unités</strong> : la notice dit quel fil va où, ne le devinez pas. Station 4.5.",
    "<strong>Les sondes</strong> : leurs fils sont fragiles. Un fil coupé ou une sonde déplacée trompe la carte, qui règle alors la vitesse sur une mauvaise température.",
    "<strong>Entre la carte et le compresseur</strong> : rien à ajouter, ni contacteur ni appareil. Voyez ÉlectroRézo 7.4."
  ],
  piege: "<strong>Trois pièges de mesure.</strong> L’intensité du compresseur <strong>varie avec sa vitesse</strong> : on ne la compare pas à une valeur fixe. La surchauffe se juge <strong>à régime stabilisé</strong>, quand le compresseur ne change plus de vitesse. Et <strong>en sortie de carte</strong>, on ne mesure jamais sans savoir ce qu’on fait : la tension continue y est élevée, et le condensateur reste chargé un moment après la coupure.",

  symboles: [
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses deux raccords.", legende: "Unité extérieure — c’est là que vit la carte" },
    { src: 'assets/compresseurrotatif.svg', alt: "Symbole d’un compresseur rotatif : un cercle contenant deux lignes obliques et un petit cercle central.", legende: "Compresseur rotatif" },
    { src: 'assets/redresseur.svg', alt: "Symbole d’un redresseur : alternatif d’un côté, continu de l’autre.", legende: "Redresseur : de l’alternatif au continu" },
    { src: 'assets/dc_ac1.svg', alt: "Symbole d’un onduleur : continu d’un côté, alternatif de l’autre.", legende: "Onduleur : du continu à l’alternatif" }
  ],
  titreLecturePlan: 'Le lire sur un schéma',
  lecturePlan: [
    "Il n’existe <strong>pas de symbole propre</strong> à la carte Inverter d’un climatiseur. Sur un schéma électrique, on la lit comme un <strong>convertisseur de fréquence</strong> : un redresseur, un étage continu, puis un onduleur, entre l’alimentation et le moteur du compresseur. Le détail : ÉlectroRézo 7.4.",
    "Sur un schéma de climatisation, la carte est le plus souvent un <strong>simple bloc</strong>, entre l’alimentation de l’unité extérieure et le compresseur.",
    "Cherchez ce qui <strong>arrive sur ce bloc</strong> : les sondes. Ce sont elles qui disent à la carte ce que demande la pièce.",
    "Retenez le sens : <strong>alternatif → continu → alternatif à fréquence variable</strong>."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Tout-ou-rien ou Inverter : ce qui change',

  quiz: [
    { question: "La pièce arrive à la température voulue. Que fait le compresseur d’un Inverter ?",
      confirmation: "Il ralentit, sans s’arrêter : juste assez pour garder la température.",
      reponses: [
        { texte: "Il s’arrête, comme un compresseur tout-ou-rien.", pourquoi: "C’est le comportement du tout-ou-rien. L’Inverter préfère tourner doucement, et c’est ce qui garde la température stable." },
        { texte: "Il accélère pour garder de l’avance.", pourquoi: "Plus la pièce approche de la consigne, plus l’écart diminue, et plus la carte demande une vitesse basse." },
        { texte: "Il ralentit, sans s’arrêter.", juste: true },
        { texte: "Il continue à la même vitesse.", pourquoi: "La pièce continuerait alors à refroidir au-delà de la consigne. C’est justement la vitesse qui s’adapte." } ] },

    { question: "Que fait la carte électronique avant le moteur du compresseur ?",
      confirmation: "Elle redresse le courant du réseau, puis refabrique un alternatif à fréquence variable.",
      reponses: [
        { texte: "Elle baisse seulement la tension, comme un transformateur.", pourquoi: "Un transformateur ne change pas la fréquence, et c’est la fréquence qui commande la vitesse." },
        { texte: "Elle ouvre et ferme le circuit, comme un contacteur.", pourquoi: "Ouvrir et fermer, c’est le tout-ou-rien. La carte règle la vitesse sans couper." },
        { texte: "Elle règle la pression du fluide.", pourquoi: "La carte ne touche pas au fluide : elle règle la vitesse du moteur, et la pression en est la conséquence." },
        { texte: "Elle redresse le courant, puis refabrique un alternatif à fréquence variable.", juste: true } ] },

    { question: "Qu’est-ce qui décide de la vitesse du compresseur ?",
      confirmation: "L’écart entre la consigne et la température mesurée par la sonde.",
      reponses: [
        { texte: "L’écart entre la consigne et la température mesurée.", juste: true },
        { texte: "L’heure de la journée.", pourquoi: "Le compresseur ne regarde pas l’heure : il suit l’écart entre ce qu’on veut et ce que mesure la sonde." },
        { texte: "Le bruit que veut l’occupant.", pourquoi: "Le bruit est une conséquence : plus lent, plus discret. Ce n’est pas lui qui commande." },
        { texte: "La longueur des tubes.", pourquoi: "La longueur des liaisons fixe la charge de fluide, pas la vitesse du compresseur." } ] },

    { question: "Un Inverter supprime-t-il tous les démarrages du compresseur ?",
      confirmation: "Non : il en reste, mais ils sont rares.",
      reponses: [
        { texte: "Oui, il tourne toujours.", pourquoi: "Quand on coupe la machine, ou quand la pièce n’a plus aucun besoin, le compresseur s’arrête puis redémarre. Les démarrages sont rares, pas supprimés." },
        { texte: "Non : il en reste, mais ils sont rares.", juste: true },
        { texte: "Non, il démarre autant qu’un tout-ou-rien.", pourquoi: "C’est tout l’intérêt : en ralentissant au lieu de s’arrêter, il démarre bien moins souvent." },
        { texte: "Oui, grâce au redresseur.", pourquoi: "Le redresseur ne change rien aux démarrages : ce qui les rend rares, c’est la régulation de la vitesse." } ] },

    { question: "Pourquoi ne compare-t-on pas l’intensité du compresseur à une valeur fixe ?",
      confirmation: "Parce qu’elle change avec la vitesse du compresseur.",
      reponses: [
        { texte: "Parce que l’ampèremètre se trompe sur un Inverter.", pourquoi: "L’appareil mesure juste : c’est le courant lui-même qui change quand la vitesse change." },
        { texte: "Parce qu’elle dépend de la couleur de l’unité.", pourquoi: "Rien à voir : l’intensité dépend de ce que le compresseur fournit, donc de sa vitesse." },
        { texte: "Parce qu’elle change avec la vitesse du compresseur.", juste: true },
        { texte: "Parce qu’elle est toujours la même.", pourquoi: "Justement non : elle monte avec la vitesse et descend avec elle." } ] },

    { question: "Le split Inverter refroidit mal. Par où commencer ?",
      confirmation: "Par la carte et les capteurs : c’est souvent là que se trouve la panne, avant le compresseur.",
      reponses: [
        { texte: "Par changer le compresseur.", pourquoi: "C’est la pièce la plus lourde, et rarement la cause : on commence par ce qui est le plus probable et le moins coûteux." },
        { texte: "Par mesurer la tension en sortie de carte, sans précaution.", pourquoi: "Dangereux : la tension continue y est élevée, et le condensateur reste chargé après la coupure." },
        { texte: "Par supprimer la consigne.", pourquoi: "Sans consigne, la carte ne saurait plus quelle température viser. Ce n’est pas une panne qu’on traite ainsi." },
        { texte: "Par la carte et les capteurs.", juste: true } ] }
  ],

  retenir: [
    "<strong>Tout-ou-rien : à fond, puis arrêt.</strong> Inverter : la vitesse suit le besoin.",
    "<strong>La carte redresse, puis refabrique un alternatif à fréquence variable</strong> : la vitesse suit la fréquence.",
    "<strong>L’écart entre consigne et mesure</strong> décide de la vitesse. Moins de démarrages, pas aucun.",
    "<strong>En panne, regardez d’abord la carte et les capteurs.</strong> Et ne mesurez pas en sortie de carte sans savoir ce que vous faites."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre pourquoi un compresseur à vitesse variable garde la pièce à la bonne température, ce que fait la carte électronique, et ce que cela change pour la mesure et le dépannage.</p><p><strong>Limite.</strong> Aucune valeur de fréquence, de tension, d’intensité ou de vitesse n’est donnée ici : elles viennent de la notice de l’appareil. Le principe électrique est détaillé dans ÉlectroRézo 7.3 et 7.4, les codes défauts dans la station 5.6.</p>',

  credits: [
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' },
    { quoi: 'Photographies', source: 'aucune',
      detail: 'les images de la base trouvées pour l’Inverter portaient toutes une marque lisible : on montre à la place les symboles du climatiseur' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.3 Rotatif et scroll : les compresseurs de la clim", url: lien('2.3') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.5 Détendre : capillaire et détendeur électronique", url: lien('2.5') },
    { ligne: 5, couleur: '#B06A00', texte: "5.6 Les codes défauts : lire ce que dit la machine", url: lien('5.6') },
    { ligne: 7, couleur: '#0b7285', texte: "ÉlectroRézo 7.3 — Faire varier la fréquence", url: 'https://inerweb.fr/electrorezo/stations/7-3-varier-la-frequence/' },
    { ligne: 7, couleur: '#0b7285', texte: "ÉlectroRézo 7.4 — Le variateur de fréquence", url: 'https://inerweb.fr/electrorezo/stations/7-4-variateur-frequence/' } ]
});

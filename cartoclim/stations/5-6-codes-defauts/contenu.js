/* CartoClim 5.6 — Les codes défauts : lire ce que dit la machine. Station-tâche, écrite le 02/10/2026.
   Aucun code d'une marque réelle : des familles de codes et un exemple inventé. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '5.6', ligne: 5,
  kicker: 'CartoClim · Ligne 5 Exploiter · Station 6',
  titre: "Les codes défauts : lire ce que dit la machine",
  narration: NARRATION,

  titres: { decouvrir: 'L’appel du client', comprendre: 'Ce qu’il faut savoir', manipuler: 'Le geste', representer: 'Sur la notice' },

  prerequis: [
    { id: '3.2', quoi: "les deux unités du split, et ce qu’il y a dans chacune" },
    { id: '5.2', quoi: "les sondes et la carte qui les lit" }
  ],

  photos: [
    { src: 'assets/biblio/898384a2af.png',
      alt: "Un climatiseur split : l’unité extérieure avec son hélice, l’unité intérieure murale, et la télécommande posée devant.",
      titre: "Les endroits où la machine parle.", sous: "Une lumière sur l’unité intérieure, un écran sur la télécommande : c’est là qu’il faut regarder." },
    { src: 'assets/biblio/825923555b.jpeg',
      alt: "Un manomètre de frigoriste : deux cadrans, l’un à échelle bleue, l’autre à échelle rouge, et deux robinets, un bleu et un rouge.",
      titre: "Après le code, on vérifie.", sous: "Le code désigne une famille de pannes. La cause réelle, on la cherche avec les instruments." }
  ],

  titreSert: 'La situation',
  aQuoiCaSert: "Le client appelle : « Il ne marche plus, et ça clignote. » Le split est à l’arrêt, une <strong>LED clignote</strong> sur l’unité intérieure ou un <strong>code</strong> s’affiche sur un écran. Ce n’est pas un caprice : c’est la <strong>carte électronique</strong> qui parle. Elle surveille la machine en permanence, et quand quelque chose sort de ce qu’elle accepte, elle <strong>arrête tout</strong> et dit pourquoi, à sa façon.",
  ouOnLeTrouve: "Sur la plupart des climatiseurs : une LED qui clignote sur l’unité intérieure, un code sur l’écran de l’unité ou de la télécommande, parfois une LED sous le capot de l’unité extérieure. Le code est écrit pour le technicien, pas pour le client. Le premier réflexe : le <strong>relever avant de toucher à quoi que ce soit</strong>.",

  scene: () => ScenesStation.lireLeCode(),

  titreDedans: 'Ce que la carte surveille',
  technologie: [
    ["Les sondes", "la <strong>sonde d’air</strong> de la pièce et la <strong>sonde de batterie</strong> dans l’unité intérieure ; dehors, selon l’appareil, l’air extérieur, la batterie et le <strong>refoulement</strong> du compresseur. Une sonde coupée ou en court-circuit donne une mesure impossible : la carte le voit tout de suite."],
    ["La pression", "côté chaud, un <strong>pressostat haute pression</strong> ou un capteur de pression. Si elle monte trop — condenseur encrassé, hélice arrêtée — la carte coupe le compresseur pour le protéger."],
    ["Le courant", "la carte surveille le <strong>courant</strong> que prend le compresseur. Trop de courant, et elle coupe avant que quelque chose ne chauffe. Sur un Inverter, c’est un point très surveillé : station 2.4."],
    ["La communication", "chaque unité a sa carte, et les deux se <strong>parlent par le câble</strong> qui les relie : station 4.5. Si le dialogue est coupé — fil desserré, câble abîmé, carte en panne — l’une des deux le signale."],
    ["Les ventilateurs", "la turbine dedans, l’hélice dehors : la carte contrôle que chacun <strong>tourne comme elle le demande</strong>. Un ventilateur bloqué ou freiné est signalé."],
    ["Le code", "à chaque défaut, la carte donne un signe : un <strong>nombre de clignotements</strong> de la LED, ou un <strong>code</strong> sur un écran. Ce signe est <strong>propre au constructeur</strong>, parfois à la gamme : c’est la <strong>notice</strong>, ou l’étiquette sous le capot, qui le traduit."]
  ],

  titreVariantes: 'Les familles de codes',
  variantes: [
    "<strong>Communication</strong> — les deux unités ne se parlent plus. On regarde le câble entre elles, ses bornes, puis les cartes. Station 4.5.",
    "<strong>Sonde</strong> — une sonde donne une mesure impossible : coupée, court-circuitée, mal fixée. On contrôle la sonde et son raccord avant de la changer, et avant la carte.",
    "<strong>Pression</strong> — la pression est montée trop haut, ou tombée trop bas : condenseur encrassé, hélice arrêtée, manque de fluide. Ici, le manomètre et la surchauffe prennent le relais : station 5.4.",
    "<strong>Ventilateur</strong> — la turbine ou l’hélice ne tourne pas comme demandé : un corps étranger, un moteur, un condensateur de démarrage, la carte.",
    "<strong>Compresseur ou Inverter</strong> — trop de courant, démarrage raté. C’est la famille la plus lourde, celle où l’on <strong>mesure avant de changer quoi que ce soit</strong>.",
    "<strong>Ce qui n’est pas un défaut</strong> — le compresseur attend quelques minutes avant de redémarrer, pour ne pas s’abîmer : la notice parle d’« anti-court-cycle ». Le client croit à une panne ; la machine se protège."
  ],
  reglage: "On ne règle pas un code : on le <strong>lit</strong>. Selon l’appareil, il s’affiche tout seul, ou il faut une manipulation de la télécommande ou une touche sur la carte : la notice le dit. Quand l’appareil garde en mémoire ses derniers défauts, ils se lisent de la même façon. Pour aller plus loin, l’atelier panne de la station 5.7.",

  consigneAptitudes: 'Un code vient de s’afficher : cochez ce qu’il vous permet de faire, puis validez.',
  titreAptitudes: 'Bien lu ?',
  colonnes: [
    { id: 'ou', libelle: 'Dire où chercher', aide: 'le code désigne la famille de la panne : on sait par où commencer',
      dessin: '<circle cx="42" cy="42" r="28"/><path d="M63 63 L90 90"/><path d="M42 28 V46"/><path d="M42 57 V58"/>' },
    { id: 'reparer', libelle: 'Réparer tout seul', aide: 'le code règle la panne : on l’efface et c’est fini',
      dessin: '<path d="M87.3 28.3 A22 22 0 1 1 71.7 12.8 L68.7 26.5 L73.5 31.3 Z"/><path d="M54.6 53.8 L24.2 84.2 A6 6 0 0 1 15.8 75.8 L46.2 45.4"/>' },
    { id: 'marque', libelle: 'Le même partout', aide: 'un code veut dire la même chose chez toutes les marques',
      dessin: '<rect x="4" y="30" width="36" height="40" rx="6"/><rect x="60" y="30" width="36" height="40" rx="6"/><path d="M12 46 H32 M12 56 H26 M68 46 H88 M68 56 H82"/><path d="M45 44 H55 M45 56 H55"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    ou: true, reparer: false, marque: false,
    bonneReponse: 'Exact. Le code dit où chercher : une famille de pannes, pas la pièce cassée. Il ne répare rien, et il ne veut pas dire la même chose d’une marque à l’autre : on lit toujours la notice de l’appareil qu’on a devant soi.',
    erreurs: {
      ou: 'C’est exactement son rôle : le code désigne une famille de pannes, il dit par où commencer.',
      reparer: 'Un code est un message, pas un remède. Effacer et relancer fait taire la machine, mais la cause est toujours là : la panne revient.',
      marque: 'Chaque constructeur a ses codes, parfois d’une gamme à l’autre. Le même signe peut dire deux choses différentes : on lit la notice de l’appareil qu’on a devant soi.'
    }
  },

  titreCablage: 'Dans l’ordre',
  cablage: [
    "<strong>Relever le code avant de couper.</strong> Écrivez-le, ou photographiez l’écran, et regardez ce que fait la machine : ventilateurs, voyants. Couper l’alimentation peut faire disparaître le code.",
    "<strong>Ouvrir la notice</strong> de cet appareil, à la <strong>table des codes</strong>, ou lire l’étiquette sous le capot.",
    "<strong>Trouver la famille</strong> : communication, sonde, pression, ventilateur, compresseur.",
    "<strong>Vérifier la cause réelle sur la machine</strong> : le câble, la sonde, la pression, le ventilateur. On regarde et on mesure : le code dit où chercher, pas quelle pièce est morte.",
    "<strong>Remettre en marche en comprenant</strong> : on répare la cause, on efface le code comme la notice le prévoit, on relance, et on <strong>surveille</strong> qu’il ne revienne pas."
  ],
  piege: "Trois erreurs qui reviennent. <strong>Couper l’alimentation avant d’avoir lu</strong> : le code disparaît, et c’était la seule indication de la machine. <strong>Effacer et relancer sans comprendre</strong> : elle repart, mais la cause est toujours là, et la panne revient chez le client. <strong>Prendre l’attente pour une panne</strong> : le compresseur patiente quelques minutes avant de redémarrer. C’est une protection, pas un défaut.",

  titreSymboles: 'Les symboles de la notice',
  symboles: [
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure : la LED, parfois un écran" },
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses deux raccords.", legende: "Unité extérieure : l’étiquette sous le capot, parfois une LED" },
    { src: 'assets/mando-infrarrojos.svg', alt: "Symbole d’une télécommande infrarouge : un boîtier étroit avec son écran et ses touches.", legende: "Télécommande : le code peut s’afficher sur son écran" }
  ],
  titreLecturePlan: 'Lire la table des codes',
  lecturePlan: [
    "Une <strong>table des codes</strong> est un tableau de la notice : à gauche le <strong>code</strong> (ou le nombre de clignotements de la LED), puis ce qu’il signale, puis les <strong>causes possibles</strong> et ce qu’il faut vérifier.",
    "Cherchez le code <strong>exactement comme il est affiché</strong>. Une lettre de plus, un clignotement trop court, et c’est une autre panne.",
    "Les lignes de la table se rangent par <strong>familles</strong> : communication, sonde, pression, ventilateur, compresseur. Retrouver la famille, c’est déjà savoir où chercher.",
    "De la ligne de la table, on passe au <strong>schéma électrique</strong> de la notice : il montre où se trouve la sonde ou le moteur dont parle le code. Table, schéma, machine : c’est la route."
  ],
  conventionPlan: "Aucun code de marque n’est donné dans cette station : ils changent d’un constructeur à l’autre. L’exemple du dessin est inventé.",

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'La table des codes, par familles',

  quiz: [
    { question: "Le client dit : « Ça clignote et ça ne marche plus ». Quel est votre premier geste ?",
      confirmation: "Relever le code ou les clignotements, avant de toucher à quoi que ce soit : c’est la seule indication que la machine a donnée.",
      reponses: [
        { texte: "Couper l’alimentation pour tout remettre à zéro.", pourquoi: "En coupant, vous risquez de perdre le code. On le relève d’abord, on coupe ensuite si la notice le demande." },
        { texte: "Chercher la fuite de fluide.", pourquoi: "Rien ne dit qu’il y a une fuite. On commence par ce que la machine dit, pas par une supposition." },
        { texte: "Changer la carte électronique.", pourquoi: "Le code désigne une famille de pannes, pas la carte. Changer une pièce sans avoir vérifié coûte cher et ne règle souvent rien." },
        { texte: "Relever le code, ou compter les clignotements.", juste: true } ] },

    { question: "Le même code s’affiche sur deux appareils de marques différentes. Que faites-vous ?",
      confirmation: "On lit la table de la notice de chaque appareil : un même signe peut dire deux choses différentes.",
      reponses: [
        { texte: "Je lis la table de la notice de chaque appareil.", juste: true },
        { texte: "J’utilise la table de la marque que je connais le mieux.", pourquoi: "Elle ne vaut que pour cette marque, parfois même pour une seule gamme. Un code qui ressemble peut annoncer une tout autre panne." },
        { texte: "Je demande au client ce que cela veut dire.", pourquoi: "Le client voit la LED clignoter, mais il n’a pas la table. Seule la notice de l’appareil traduit le code." },
        { texte: "Il veut dire la même chose : les codes sont les mêmes partout.", pourquoi: "Chaque constructeur écrit ses propres codes, parfois d’une gamme à l’autre. Il n’existe pas de table commune." } ] },

    { question: "Le code est de la famille « sonde ». Que contrôlez-vous d’abord ?",
      confirmation: "La sonde et son raccord : mesure, câble, fixation. La carte reçoit une mesure impossible, elle n’est pas forcément en cause.",
      reponses: [
        { texte: "La carte électronique.", pourquoi: "La carte reçoit une mesure impossible, elle ne l’invente pas. On vérifie la sonde et son raccord avant de soupçonner la carte." },
        { texte: "La sonde et son raccord.", juste: true },
        { texte: "La charge en fluide.", pourquoi: "Un code de sonde parle d’une mesure, pas du fluide. Le manomètre servira pour un code de pression." },
        { texte: "Rien : j’efface le code et j’attends.", pourquoi: "Effacer ne change pas la mesure. Tant que la sonde donne une valeur impossible, le code revient." } ] },

    { question: "Le split vient de s’arrêter et ne redémarre pas depuis quelques minutes. Est-ce une panne ?",
      confirmation: "Pas forcément : le compresseur patiente avant de repartir, c’est une protection. La notice dit combien de temps, et ce que la LED indique alors.",
      reponses: [
        { texte: "Oui, le compresseur est en panne.", pourquoi: "Un compresseur en panne ne répond pas du tout. Ici il attend volontairement, pour ne pas redémarrer trop vite." },
        { texte: "Oui, la carte est morte.", pourquoi: "Une carte morte n’afficherait plus rien et ne commanderait aucune attente. Celle-ci fait son travail." },
        { texte: "Pas forcément : c’est peut-être la protection du compresseur.", juste: true },
        { texte: "Non : je coupe et je rallume pour accélérer.", pourquoi: "On ne force pas une protection. Si l’attente se répète sans raison, on cherche la cause, on ne la contourne pas." } ] },

    { question: "Pourquoi la panne revient-elle quand on a seulement effacé le code ?",
      confirmation: "Parce que la cause est toujours là : on a fait taire le message, pas la panne.",
      reponses: [
        { texte: "Parce que l’effacement abîme la carte.", pourquoi: "Effacer un code ne risque rien pour la carte. C’est la cause, laissée en place, qui fait revenir le défaut." },
        { texte: "Parce que la télécommande est mal réglée.", pourquoi: "La télécommande affiche ce que dit la carte, elle ne provoque pas le défaut." },
        { texte: "Parce que le client a mal utilisé l’appareil.", pourquoi: "Cela arrive, mais c’est rare. Ce qui est sûr : une cause qu’on n’a pas cherchée est toujours là." },
        { texte: "Parce que la cause est toujours là.", juste: true } ] },

    { question: "Le code est de la famille « communication ». Où regardez-vous en premier ?",
      confirmation: "Le câble entre les deux unités et ses bornes : c’est par lui que les deux cartes se parlent.",
      reponses: [
        { texte: "Le câble entre les deux unités et ses bornes.", juste: true },
        { texte: "Le filtre de l’unité intérieure.", pourquoi: "Un filtre encrassé gêne l’air, pas le dialogue entre les cartes." },
        { texte: "La charge en fluide.", pourquoi: "Le fluide circule dans les tubes de cuivre. Le dialogue entre les cartes passe par un câble électrique." },
        { texte: "Le bac à condensats.", pourquoi: "Le bac évacue l’eau de la batterie. Il n’a aucun lien avec le dialogue entre les cartes." } ] }
  ],

  retenir: [
    "<strong>Relever le code avant de couper</strong> : couper l’alimentation peut l’effacer.",
    "<strong>Le code dit où chercher</strong>, pas quelle pièce est cassée : on vérifie sur la machine.",
    "<strong>Chaque constructeur a ses codes</strong> : on lit la notice de l’appareil qu’on a devant soi.",
    "<strong>Effacer sans comprendre</strong>, c’est faire taire la machine : la panne revient.",
    "<strong>Une attente n’est pas une panne</strong> : le compresseur patiente avant de repartir."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire ce que dit la machine quand elle s’arrête : relever le code avant de couper, le chercher dans la notice, trouver sa famille, vérifier la cause réelle sur la machine, et remettre en marche en ayant compris.</p><p><strong>Limite.</strong> Aucun code d’une marque réelle n’est donné : chaque constructeur a le sien, parfois d’une gamme à l’autre. Le dépannage du circuit frigorifique, les mesures de pression et la surchauffe sont d’autres stations. Aucune valeur ni durée n’est donnée ici : elles viennent de la notice de l’appareil.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.4 L’Inverter : la vitesse suit le besoin", url: lien('2.4') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.5 Alimenter et relier les deux unités", url: lien('4.5') },
    { ligne: 5, couleur: '#B06A00', texte: "5.2 Le régulateur électronique : les sondes", url: lien('5.2') },
    { ligne: 5, couleur: '#B06A00', texte: "5.4 Surchauffe et sous-refroidissement", url: lien('5.4') },
    { ligne: 5, couleur: '#B06A00', texte: "5.7 L’atelier panne", url: lien('5.7') } ]
});

/* CartoClim 1.1 — Climatiser, c'est quoi ? Gare d'entrée des lignes 1, 2 et 3. Écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '1.1', ligne: 1,
  kicker: 'CartoClim · Ligne 1 Le besoin · Station 1',
  titre: "Climatiser, c’est quoi ?",
  narration: NARRATION,

  prerequis: [],

  photos: [
    { src: 'assets/biblio/6691a1f846.jpeg',
      alt: "Un climatiseur mural fixé en haut d’un mur blanc, dans un bureau où une personne travaille à son poste.",
      titre: "Il est dans la pièce, au-dessus de vous.", sous: "L’unité intérieure se fixe haut sur le mur : elle souffle l’air frais sur toute la pièce." },
    { src: 'assets/biblio/989b7d49a2.jpeg',
      alt: "Un climatiseur mobile posé au sol près d’une fenêtre, avec sa gaine blanche qui sort par la fenêtre.",
      titre: "La même fonction, dans une seule boîte.", sous: "Le climatiseur mobile : la chaleur sort par la gaine, jusqu’à la fenêtre." }
  ],

  aQuoiCaSert: "Climatiser, c’est rendre une pièce <strong>confortable</strong> : une bonne température, une bonne humidité, un air qui circule sans courant d’air. Pour cela, le climatiseur sait faire <strong>cinq choses</strong> : <strong>refroidir</strong> ; <strong>chauffer</strong>, s’il est réversible ; <strong>déshumidifier</strong> ; <strong>filtrer</strong> ; <strong>brasser</strong> l’air.",
  ouOnLeTrouve: "Il ne fait pas tout. Il <strong>ne renouvelle pas l’air</strong> : il reprend celui de la pièce et n’en fait entrer aucun du dehors. Et il <strong>ne fabrique pas de froid</strong> : il déplace la chaleur de la pièce vers dehors, et il consomme de l’électricité pour cela. On le trouve dans une chambre, un bureau, un commerce, une salle de classe.",

  scene: () => ScenesStation.trajetDeLaChaleur(),

  technologie: [
    ["Côté pièce", "une <strong>batterie</strong> à ailettes, plus froide que l’air, une <strong>turbine</strong> qui pousse l’air de la pièce à travers elle, un <strong>filtre</strong> qui arrête les poussières, des volets pour diriger le souffle et un <strong>bac</strong> qui recueille l’eau de l’air. C’est là que la chaleur est prise, et que l’air est asséché, filtré et brassé."],
    ["Côté dehors", "un <strong>compresseur</strong> et une batterie à ailettes que balaie une <strong>hélice</strong>. C’est là que la chaleur est rendue à l’air extérieur."],
    ["Entre les deux", "un <strong>fluide frigorigène</strong>, enfermé dans un circuit : il s’évapore dedans en prenant la chaleur, il se condense dehors en la rendant. Il ne se consomme pas : s’il en manque, c’est qu’il fuit. Le circuit : station 2.1."],
    ["L’électricité", "elle ne fait pas le froid. La chaleur ne passe pas d’elle-même d’une pièce fraîche vers un dehors plus chaud : il faut la pousser, et ce sont le <strong>compresseur</strong> et les ventilateurs qui s’en chargent."]
  ],

  variantes: [
    "<strong>Une seule boîte</strong> — le climatiseur mobile ou de fenêtre : tout est dans le même appareil, et la chaleur sort par une gaine ou par la fenêtre. Station 3.1.",
    "<strong>Deux boîtiers</strong> — le split : une unité qui souffle dans la pièce, une unité qui rejette dehors, reliées par des tubes de cuivre. Station 3.2 ; plusieurs pièces avec un seul extérieur : station 3.4.",
    "<strong>Réversible</strong> — en inversant le sens du fluide, le même appareil prend la chaleur dehors et la donne à la pièce : il chauffe. Station 2.6.",
    "<strong>Un grand local</strong> — un groupe posé sur le toit (station 3.6), ou de l’eau froide envoyée dans les pièces (station 3.8)."
  ],
  reglage: "Le confort tient en trois mots : <strong>température, humidité, vitesse d’air</strong>. La télécommande règle la <strong>consigne</strong> (la température voulue), le <strong>mode</strong> (froid, chaud, déshumidification, ventilation) et la <strong>vitesse de la turbine</strong>. Attention : la consigne dit où s’arrêter, pas à quelle vitesse y aller. Baisser la consigne à 16 °C ne refroidit pas plus vite : l’appareil ira seulement chercher une température plus basse, en travaillant plus longtemps. Station 5.1.",

  consigneAptitudes: 'Un climatiseur de pièce, en été : cochez ce qu’il sait faire, puis validez.',
  colonnes: [
    { id: 'deplacer',  libelle: 'Déplacer la chaleur', aide: 'la prendre dans la pièce et la rejeter dehors', dessin: ScenesStation.icones.deplacer },
    { id: 'fabriquer', libelle: 'Fabriquer du froid',  aide: 'refroidir la pièce sans rien rejeter ailleurs', dessin: ScenesStation.icones.froid },
    { id: 'neuf',      libelle: 'Renouveler l’air',    aide: 'faire entrer de l’air neuf venu de dehors', dessin: ScenesStation.icones.neuf }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    deplacer: true, fabriquer: false, neuf: false,
    bonneReponse: 'Exact. Il déplace la chaleur de la pièce vers dehors : c’est tout son métier. Il ne fabrique pas de froid — dehors, il rejette la chaleur prise dedans, plus celle de l’électricité qu’il consomme. Et il ne renouvelle pas l’air : l’air neuf, c’est le travail de la ventilation.',
    erreurs: {
      deplacer: 'C’est justement ce qu’il fait : il prend la chaleur dans la pièce et la rejette dehors. Le froid, ce n’est que de la chaleur qui n’est plus là.',
      fabriquer: 'Un climatiseur ne fabrique pas de froid : il déplace la chaleur. Elle ne disparaît pas, elle sort dehors — et l’électricité consommée s’y ajoute.',
      neuf: 'Un climatiseur de pièce reprend l’air de la pièce, le refroidit, l’assèche, le filtre et le rend. Aucun air du dehors n’entre : pour l’air neuf, il faut une ventilation — voyez AéroRézo.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Le fluide</strong> : pour un split, deux tubes de cuivre isolés entre l’unité intérieure et l’unité extérieure. Station 4.2.",
    "<strong>L’électricité</strong> : l’alimentation de l’appareil, protégée, et le câble qui relie les deux unités. Station 4.5.",
    "<strong>L’eau</strong> : le tuyau qui évacue les condensats, en pente continue. Station 4.4.",
    "<strong>Le monobloc mobile</strong> : pas de tubes. C’est une <strong>gaine</strong> qui emmène la chaleur dehors, et elle doit réellement rejoindre l’extérieur. Station 3.1."
  ],
  piege: "<strong>Trois pièges.</strong><br>1. Un monobloc mobile dont la gaine est mal sortie, ou qui s’ouvre dans la pièce, rejette la chaleur là où il l’a prise : il réchauffe la pièce.<br>2. Baisser la consigne à 16 °C ne refroidit pas plus vite : la consigne dit où s’arrêter, pas à quelle vitesse y aller.<br>3. Le mode « ventilation » ne renouvelle rien : il fait seulement tourner la turbine, sur l’air de la pièce.",

  symboles: [
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure murale" },
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur : un boîtier avec son hélice et ses deux raccords.", legende: "Unité extérieure" }
  ],
  lecturePlan: [
    "Sur un plan, l’<strong>unité intérieure</strong> est dessinée dans la pièce qu’elle traite, l’<strong>unité extérieure</strong> dehors : sur la façade, au sol ou en toiture.",
    "Le trait qui les relie représente les <strong>liaisons</strong> : c’est le chemin de la chaleur. Lisez-le dans le sens pièce → dehors.",
    "Cherchez toujours <strong>où part la chaleur</strong> : une unité extérieure enfermée dans un coffre, ou dont l’air chaud revient sur elle, rejette mal sa chaleur. Station 4.1.",
    "Les repères courants : <strong>UI</strong> pour l’unité intérieure, <strong>UE</strong> pour l’unité extérieure."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’un climatiseur fait, et ce qu’il ne fait pas',

  quiz: [
    { question: "Que devient la chaleur prise dans la pièce ?",
      confirmation: "Elle est déplacée : emportée par le fluide, puis rejetée dehors. Elle ne disparaît pas.",
      reponses: [
        { texte: "Elle est rejetée dehors.", juste: true },
        { texte: "Elle disparaît dans l’appareil.", pourquoi: "Une chaleur ne disparaît pas : elle change de place. Ici, elle quitte la pièce avec le fluide." },
        { texte: "Elle est transformée en froid.", pourquoi: "Le froid ne se fabrique pas : c’est seulement de la chaleur qui n’est plus là. Rien ne se transforme en froid." },
        { texte: "Elle reste stockée dans le fluide.", pourquoi: "Le fluide la transporte, il ne la garde pas : dehors il la rend à l’air extérieur, puis il revient en chercher." } ] },

    { question: "Que consomme un climatiseur pour déplacer la chaleur ?",
      confirmation: "De l’électricité : elle fait tourner le compresseur et les ventilateurs, qui poussent la chaleur vers dehors.",
      reponses: [
        { texte: "Du fluide frigorigène.", pourquoi: "Le fluide est enfermé dans un circuit : il tourne sans se consommer. S’il en manque, c’est qu’il fuit." },
        { texte: "De l’électricité.", juste: true },
        { texte: "De l’eau.", pourquoi: "L’eau du bac vient de l’humidité de l’air de la pièce : l’appareil la recueille, il ne la consomme pas." },
        { texte: "Rien : la chaleur passe toute seule.", pourquoi: "La chaleur ne va pas d’elle-même d’une pièce fraîche vers un dehors plus chaud : il faut la pousser, et cela demande de l’énergie." } ] },

    { question: "Trois choses font le confort d’une pièce. Lesquelles ?",
      confirmation: "La température, l’humidité et la vitesse de l’air : voilà ce que le climatiseur règle.",
      reponses: [
        { texte: "La température, la saison et le prix de l’électricité.", pourquoi: "La saison et le prix ne se sentent pas sur la peau. Ce qui compte, c’est l’air de la pièce : sa température, son humidité, son mouvement." },
        { texte: "La température seule.", pourquoi: "Une pièce à la bonne température peut rester moite, ou être traversée d’un courant d’air gênant : l’humidité et la vitesse de l’air comptent aussi." },
        { texte: "La température, l’humidité et la vitesse de l’air.", juste: true },
        { texte: "La puissance, la couleur et la taille de l’appareil.", pourquoi: "Ce sont des caractéristiques de la machine, pas de l’air de la pièce. Et c’est l’air que l’on ressent." } ] },

    { question: "Un climatiseur de pièce renouvelle-t-il l’air ?",
      confirmation: "Non : il reprend l’air de la pièce, le traite et le rend. Aucun air neuf n’entre.",
      reponses: [
        { texte: "Oui, en mode ventilation.", pourquoi: "Le mode ventilation fait seulement tourner la turbine, sans froid ni chaud : c’est toujours l’air de la pièce, brassé." },
        { texte: "Oui, grâce à son filtre.", pourquoi: "Le filtre arrête les poussières de l’air de la pièce. Il ne fait entrer aucun air du dehors." },
        { texte: "Oui, il fait entrer un peu d’air du dehors à chaque cycle.", pourquoi: "Aucun air du dehors n’entre dans la pièce : dehors, l’appareil ne fait que rejeter de la chaleur." },
        { texte: "Non, il traite l’air de la pièce.", juste: true } ] },

    { question: "Un climatiseur mobile est posé dans la pièce, sa gaine enroulée dans un coin. Que fait-il à la pièce ?",
      confirmation: "Il la réchauffe : la chaleur prise dedans est rejetée dedans, avec celle de l’électricité consommée.",
      reponses: [
        { texte: "Elle se réchauffe.", juste: true },
        { texte: "Elle se rafraîchit, mais plus lentement.", pourquoi: "Sans gaine vers l’extérieur, la chaleur ne sort pas de la pièce : le bilan ne peut pas être un refroidissement." },
        { texte: "Rien : l’appareil ne marche pas sans gaine.", pourquoi: "Il marche : il prend la chaleur de l’air et la rejette, mais dans la même pièce. Le résultat est pire que rien." },
        { texte: "Elle s’assèche, c’est tout.", pourquoi: "L’eau recueillie ne change pas le bilan : la chaleur rejetée reste dans la pièce, et la réchauffe." } ] },

    { question: "Vous baissez la consigne à 16 °C au lieu de 24 °C pour refroidir plus vite. Que se passe-t-il ?",
      confirmation: "Pas plus vite : la consigne dit où s’arrêter, pas à quelle vitesse y aller. L’appareil ira seulement chercher une température plus basse, en travaillant plus longtemps.",
      reponses: [
        { texte: "La pièce refroidit deux fois plus vite.", pourquoi: "La puissance de l’appareil est fixée par sa taille, pas par la consigne. Elle ne double pas." },
        { texte: "Pas plus vite, mais plus froid au final.", juste: true },
        { texte: "L’air soufflé est à 16 °C.", pourquoi: "La consigne est la température voulue dans la pièce, pas celle de l’air soufflé. Ce sont deux températures différentes." },
        { texte: "L’appareil consomme moins.", pourquoi: "Au contraire : il travaille plus longtemps pour atteindre une température plus basse, donc il consomme davantage." } ] }
  ],

  retenir: [
    "<strong>Un climatiseur ne fabrique pas de froid</strong> : il déplace la chaleur de la pièce vers dehors, avec de l’électricité.",
    "<strong>Cinq choses</strong> : refroidir, chauffer (s’il est réversible), déshumidifier, filtrer, brasser.",
    "<strong>Il ne renouvelle pas l’air</strong> : l’air neuf, c’est le travail de la ventilation.",
    "<strong>Le confort</strong> : une température, une humidité, une vitesse d’air.",
    "<strong>Trois pièges</strong> : la gaine du mobile, la consigne à 16 °C, le mode ventilation."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre ce que fait un climatiseur et ce qu’il ne fait pas : il déplace la chaleur de la pièce vers dehors, il sait refroidir, chauffer, déshumidifier, filtrer et brasser, mais il ne renouvelle pas l’air.</p><p><strong>Limite.</strong> Le circuit du fluide, les familles d’appareils, la pose et le réglage sont des stations à part. Aucune valeur de puissance, de débit ou de charge n’est donnée ici : elles viennent de la notice de l’appareil.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 1, couleur: '#C9451A', texte: "1.2 Occupants, équipements et soleil", url: lien('1.2') },
    { ligne: 1, couleur: '#C9451A', texte: "1.5 Le confort d’été", url: lien('1.5') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.1 Le circuit, organe par organe", url: lien('2.1') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.1 Le monobloc : mobile, fenêtre", url: lien('3.1') },
    { ligne: 5, couleur: '#B06A00', texte: "5.1 Les modes et la télécommande", url: lien('5.1') } ]
});

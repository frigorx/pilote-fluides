/* CartoClim 3.8 — Le chauffe-eau thermodynamique : la chaleur de l’air pour l’eau chaude. Écrite le 03/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '3.8', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 8',
  titre: "Le chauffe-eau thermodynamique : la chaleur de l’air pour l’eau chaude",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" },
    { id: '3.7', quoi: "la PAC air/eau : le même cycle, pour chauffer la maison" }
  ],

  photos: [
    { src: 'assets/termo-electrico.svg',
      alt: "Symbole d’un chauffe-eau électrique : une cuve verticale marquée d’un éclair, avec ses raccords d’eau en bas, l’un rouge, l’autre bleu.",
      titre: "Un chauffe-eau électrique ordinaire.", sous: "Une cuve, deux raccords d’eau, et l’électricité pour seule source de chaleur." },
    { src: 'assets/interacumulador.svg',
      alt: "Symbole d’un ballon avec échangeur : une cuve verticale traversée par un tube replié en zigzag.",
      titre: "Un ballon avec un échangeur.", sous: "Une autre source de chaleur peut entrer dans l’eau par ce tube : c’est la place de la pompe à chaleur." }
  ],
  creditPhoto: 'Pas de photographie libre de marque pour cette station : on montre des symboles de ballons. Détail dans « Crédits ».',

  aQuoiCaSert: "À <strong>chauffer l’eau du robinet</strong> avec la chaleur de l’air — et seulement elle. C’est une <strong>petite pompe à chaleur posée sur un ballon d’eau chaude</strong> : le même cycle que la PAC air/eau (station 3.7), mais tout dans un seul appareil, et pour l’eau chaude sanitaire seulement. Il <strong>ne chauffe pas la maison</strong>.",
  ouOnLeTrouve: "Dans la <strong>cave, le garage ou la buanderie</strong> d’une maison : une pièce non chauffée, où il prend la chaleur de l’air. On peut aussi le raccorder à des gaines vers l’extérieur. Posé dans une pièce chauffée, il prendrait la chaleur du chauffage. Le banc du lycée, l’<strong>ERM TH10</strong>, en est un vrai : un chauffe-eau du commerce monté sur un châssis, avec ses instruments de mesure.",

  scene: () => ScenesStation.leChauffeEau(),

  technologie: [
    ["Sous le capot", "une petite pompe à chaleur : un <strong>ventilateur</strong> qui aspire l’air de la pièce, un <strong>évaporateur</strong> (une batterie à ailettes), le <strong>compresseur</strong> et le <strong>détendeur</strong>. Dans l’appareil réel, l’évaporateur est en haut, sous le capot : le dessin garde pourtant la croix du frigoriste."],
    ["Le condenseur, contre la cuve", "un <strong>tube enroulé contre la paroi extérieure</strong> de la cuve. Le fluide frigorigène s’y condense, et sa chaleur traverse la paroi pour chauffer l’eau. <strong>Le fluide ne touche jamais l’eau qu’on boit.</strong> Ce n’est pas le condenseur à plaques de la 3.7 : ici, c’est la cuve elle-même qui sépare les deux."],
    ["Le ballon", "une <strong>cuve en acier émaillé</strong>, isolée. L’eau froide entre <strong>en bas</strong>, l’eau chaude sort <strong>en haut</strong> : l’eau chaude, plus légère, reste au-dessus de l’eau froide sans se mélanger, elle se range <strong>par couches</strong>."],
    ["L’appoint et l’anode", "dans la cuve, une <strong>résistance électrique</strong> blindée prend le relais quand l’air est trop froid ou qu’il faut de l’eau chaude vite ; une <strong>anode de magnésium</strong> protège la cuve émaillée de la corrosion : c’est elle qui s’use, à la place de l’acier. Elle se contrôle."],
    ["Le côté eau", "un <strong>groupe de sécurité</strong> sur l’arrivée d’eau froide : robinet d’arrêt, clapet anti-retour, soupape et vidange. L’eau gonfle en chauffant : la soupape laisse partir le surplus par un tuyau d’écoulement. En sortie, souvent un <strong>mitigeur thermostatique</strong> : il mélange l’eau chaude et l’eau froide pour que l’eau du robinet reste à la température réglée. La logique d’une soupape et de son rejet : <a href=\"https://inerweb.fr/hydrometro/stations/securite/\">HydroMétro, Sécurité</a>."],
    ["Les condensats", "l’air qui traverse l’évaporateur se refroidit et laisse une partie de son humidité : l’appareil fait de l’eau, comme un split. Il lui faut une <strong>évacuation de condensats</strong>. Station 4.4."],
    ["Le banc du lycée", "l’<strong>ERM TH10</strong> est un chauffe-eau thermodynamique du commerce, instrumenté par le constructeur pour l’étude : des <strong>manomètres haute et basse pression</strong> sur le circuit, un <strong>compteur électrique</strong> sur la pompe à chaleur et un autre sur la résistance, un <strong>compteur d’énergie</strong> sur l’eau chaude, un lavabo avec un mitigeur thermostatique, et une <strong>horloge</strong> qui simule les heures creuses et les heures pleines. Les chiffres du chauffe-eau du banc, d’après la fiche du constructeur : <strong>200&nbsp;litres</strong>, fluide <strong>R-134a</strong>, <strong>750&nbsp;W</strong> au plus absorbés par la pompe à chaleur, <strong>1&nbsp;800&nbsp;W</strong> par la résistance. Le constructeur annonce un <strong>COP de 2,8</strong> : pour 1&nbsp;kWh d’électricité consommé, 2,8&nbsp;kWh pour chauffer l’eau. C’est la valeur de ce chauffe-eau, pas une règle valable pour tous."]
  ],

  variantes: [
    "<strong>Monobloc</strong> — le plus courant : tout le circuit frigorifique est dans l’appareil, fermé et <strong>chargé en usine</strong>. L’installateur ne touche pas au fluide.",
    "<strong>En deux parties</strong> — une unité extérieure, reliée au ballon par des liaisons frigorifiques, comme un split : stations 3.2 et 4.2.",
    "<strong>Air de la pièce ou air gainé</strong> — l’appareil aspire l’air de la pièce où il est posé, ou bien il est relié par des gaines à l’extérieur. Dans une pièce non chauffée, il prend une chaleur que personne n’utilise.",
    "<strong>Le même cycle pour chauffer la maison</strong> — avec des radiateurs ou un plancher chauffant, c’est la PAC air/eau : station 3.7.",
    "<strong>Le chauffe-eau électrique seul</strong> — une résistance et rien d’autre : pour la même chaleur, il consomme plus d’électricité. La pompe à chaleur est ce qui fait la différence."
  ],
  reglage: "Un <strong>panneau de commande digital</strong> : on y choisit le mode de fonctionnement — par exemple pompe à chaleur seule, avec appoint, ou appoint forcé — et la température d’eau voulue. Les noms des modes et les valeurs changent d’un appareil à l’autre : elles viennent de la notice, aucune n’est donnée ici. Un appoint forcé en permanence fait de l’appareil un chauffe-eau électrique ordinaire.",

  consigneAptitudes: 'Un chauffe-eau thermodynamique posé dans la cave : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un chauffe-eau thermodynamique ?',
  colonnes: [
    { id: 'eauChaude', libelle: 'Chauffer l’eau du robinet', aide: 'avec la chaleur de l’air de la pièce où il est posé',
      dessin: '<rect x="26" y="10" width="48" height="80" rx="16"/><path d="M50 40 C40 52 38 58 42 66 C46 72 54 72 58 66 C62 58 60 52 50 40 Z"/>' },
    { id: 'radiateurs', libelle: 'Chauffer les radiateurs', aide: 'faire partir de l’eau chaude vers des radiateurs ou un plancher',
      dessin: '<rect x="14" y="26" width="72" height="48" rx="8"/><path d="M34 26 V74 M50 26 V74 M66 26 V74 M26 74 V88 M74 74 V88"/>' },
    { id: 'rafraichir', libelle: 'Rafraîchir la pièce', aide: 'dans la pièce où il est posé : un effet, l’air qu’il aspire ressort plus froid et plus sec',
      dessin: SceneKit.pictos.DESSINS.froid }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    eauChaude: true, radiateurs: false, rafraichir: true,
    bonneReponse: 'Exact. Il chauffe l’eau du robinet, et rien d’autre : pour des radiateurs, c’est la PAC air/eau. Et comme il prend la chaleur de l’air, il rafraîchit et assèche la pièce où il est posé — mais c’est un effet, pas un service : on ne l’installe pas pour cela.',
    erreurs: {
      eauChaude: 'C’est son métier : la chaleur prise à l’air passe, à travers la paroi de la cuve, dans l’eau du ballon.',
      radiateurs: 'Il n’a aucune boucle de chauffage : son condenseur ne chauffe que l’eau de la cuve, celle qu’on boit. Pour des radiateurs, c’est la PAC air/eau : station 3.7.',
      rafraichir: 'Si, c’est un effet réel : l’air qui traverse l’évaporateur ressort plus froid et plus sec. Mais ce n’est pas un service : on ne règle pas l’appareil pour rafraîchir une pièce, on le pose là où ce froid ne gêne personne.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>L’eau</strong> : l’arrivée d’eau froide sur le raccord du bas, la sortie d’eau chaude sur celui du haut. On ne les inverse pas : les couches ne se rangeraient plus.",
    "<strong>Le groupe de sécurité</strong> sur l’arrivée d’eau froide, avec son <strong>écoulement relié à une évacuation</strong> et jamais bouché. S’il manque, ou si l’écoulement n’est pas raccordé, l’eau qui gonfle n’a nulle part où aller. Le geste : <a href=\"https://inerweb.fr/hydrometro/stations/securite/\">HydroMétro, Sécurité</a>.",
    "<strong>Les condensats</strong> : une évacuation, en pente, jusqu’à un siphon ou jusqu’à dehors, comme sur un split : station 4.4.",
    "<strong>L’air</strong> : l’appareil aspire l’air de la pièce ; s’il est gainé, des gaines vers l’extérieur, <strong>courtes et non écrasées</strong>.",
    "<strong>L’électricité</strong> : une alimentation avec sa protection, pour la pompe à chaleur et pour la résistance : station 4.5. <strong>Jamais de courant sur une cuve vide.</strong>",
    "<strong>Le fluide</strong> : rien à faire sur un monobloc, chargé en usine. Sur un modèle en deux parties, les liaisons frigorifiques se posent comme pour un split : station 4.2."
  ],
  piege: "Le <strong>poser dans une pièce chauffée ou trop petite</strong> : il prend la chaleur du chauffage, ou refroidit l’air de la pièce plus vite qu’il ne se renouvelle. Même défaut avec une <strong>gaine d’air trop longue ou écrasée</strong> : l’évaporateur manque d’air, et la résistance prend le relais sans qu’on le voie. Autres oublis qui coûtent cher : <strong>les condensats</strong>, <strong>l’écoulement du groupe de sécurité</strong>, <strong>l’anode jamais contrôlée</strong> — et l’<strong>appoint laissé forcé en permanence</strong> : l’appareil redevient un chauffe-eau électrique, et le compteur de la résistance du banc le montre.",

  symboles: [
    { src: 'assets/ballon_ecs_elec.svg', alt: "Symbole d’un ballon d’eau chaude électrique : une cuve verticale marquée « Ballon ECS », avec un zigzag en bas, la résistance, et de petits traits qui traversent la paroi, les raccords.", legende: "Ballon d’eau chaude électrique : le zigzag est la résistance" },
    { src: 'assets/interacumulador.svg', alt: "Symbole d’un ballon avec échangeur : une cuve verticale traversée par un tube replié en zigzag.", legende: "Ballon avec échangeur : la chaleur y entre par le tube" }
  ],
  titreSymboles: 'Pas de symbole propre : un ballon, plus une pompe à chaleur',
  titreLecturePlan: 'Le lire sur un schéma d’installation',
  lecturePlan: [
    "Il n’existe pas de symbole propre au chauffe-eau thermodynamique dans les bibliothèques. On le lit comme <strong>deux choses réunies</strong> : un <strong>ballon d’eau chaude</strong>, et une <strong>pompe à chaleur</strong> posée dessus.",
    "Sur le premier symbole, le <strong>zigzag en bas</strong> est la résistance : c’est l’appoint. Le second montre un <strong>échangeur</strong>, un tube replié : c’est l’endroit où la chaleur de la pompe à chaleur passe dans l’eau. Dans l’appareil réel, ce tube est enroulé contre la paroi, à l’extérieur de la cuve, mais le principe est le même.",
    "Sur un schéma d’installation, <strong>suivez l’eau</strong> : l’arrivée d’eau froide avec son groupe de sécurité et son écoulement, le ballon, puis la sortie d’eau chaude, souvent avec un mitigeur thermostatique.",
    "Cherchez aussi le <strong>tuyau des condensats</strong>, la <strong>gaine d’air</strong> s’il y en a une, et l’alimentation électrique avec sa protection. S’ils manquent sur le plan, ils manqueront sur le chantier.",
    "Les repères courants : <strong>ECS</strong> pour l’eau chaude sanitaire, <strong>PAC</strong> pour la pompe à chaleur."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’on raccorde, et ce qu’on mesure sur le banc',

  quiz: [
    { question: "Qu’est-ce que le condenseur d’un chauffe-eau thermodynamique ?",
      confirmation: "Un tube enroulé contre la paroi extérieure de la cuve : la chaleur du fluide traverse la paroi, le fluide ne touche jamais l’eau qu’on boit.",
      reponses: [
        { texte: "Un échangeur à plaques, comme sur la PAC air/eau.", pourquoi: "Cet échangeur à plaques est celui de la PAC air/eau, station 3.7 : deux circuits côte à côte. Ici, c’est la paroi de la cuve qui sépare le fluide et l’eau." },
        { texte: "Un tube enroulé contre la paroi de la cuve.", juste: true },
        { texte: "La batterie à ailettes que balaie le ventilateur.", pourquoi: "Cette batterie est l’évaporateur : elle prend la chaleur de l’air, elle ne la donne pas à l’eau." },
        { texte: "La résistance qui est dans la cuve.", pourquoi: "La résistance est l’appoint électrique, qui chauffe l’eau toute seule. Le condenseur appartient au circuit de la pompe à chaleur." } ] },

    { question: "Où se trouve l’eau la plus chaude dans la cuve ?",
      confirmation: "En haut : plus légère que l’eau froide, elle reste au-dessus. C’est pour cela que l’eau froide entre en bas et que l’on puise en haut.",
      reponses: [
        { texte: "En bas, près de l’entrée d’eau froide.", pourquoi: "L’eau chaude est plus légère que l’eau froide : elle monte. Près de l’entrée d’eau froide, c’est l’eau la plus froide." },
        { texte: "Au milieu, autour du tube enroulé.", pourquoi: "Le tube chauffe l’eau qui le touche, mais cette eau, devenue plus légère, monte aussitôt et se range en haut." },
        { texte: "Partout pareil : l’eau se mélange.", pourquoi: "Elle ne se mélange pas : tant qu’on ne la brasse pas, l’eau chaude reste en haut et l’eau froide en bas, par couches. C’est ce qui donne une eau bien chaude au puisage." },
        { texte: "En haut.", juste: true } ] },

    { question: "À quoi sert le groupe de sécurité, sur l’arrivée d’eau froide ?",
      confirmation: "L’eau gonfle en chauffant : il laisse partir le surplus par son écoulement, pour que la pression ne monte pas dans la cuve.",
      reponses: [
        { texte: "À laisser partir le surplus d’eau quand elle gonfle en chauffant.", juste: true },
        { texte: "À protéger le compresseur contre les surpressions du fluide.", pourquoi: "Le groupe de sécurité est sur l’eau, pas sur le fluide : il protège la cuve, côté eau." },
        { texte: "À mélanger l’eau chaude et l’eau froide.", pourquoi: "C’est le travail du mitigeur thermostatique, en sortie. Le groupe de sécurité, lui, est à l’entrée, sur l’eau froide." },
        { texte: "À filtrer l’eau avant la cuve.", pourquoi: "Il ne filtre rien : un robinet d’arrêt, un clapet anti-retour, une soupape et une vidange. Son travail, c’est la pression." } ] },

    { question: "Où pose-t-on un chauffe-eau thermodynamique monobloc ?",
      confirmation: "Dans une pièce non chauffée, assez grande, comme la cave, le garage ou la buanderie : il y prend la chaleur de l’air.",
      reponses: [
        { texte: "Dans le salon chauffé : il y profite de la chaleur.", pourquoi: "La chaleur qu’il prend, c’est le chauffage qui l’a fournie : il faut la produire une seconde fois, et la pièce se refroidit. On le pose plutôt dans une pièce non chauffée." },
        { texte: "Dans une pièce non chauffée : cave, garage, buanderie.", juste: true },
        { texte: "Dans un petit placard fermé, sans gaine.", pourquoi: "Il manquerait d’air : l’air du placard se refroidit trop vite, l’évaporateur n’a plus de chaleur à prendre, et la résistance prend le relais." },
        { texte: "Dehors, sous la pluie.", pourquoi: "Un monobloc se pose à l’intérieur, avec tout son circuit. Seuls les modèles en deux parties ont une unité qui reste dehors." } ] },

    { question: "Le constructeur du banc annonce un COP de 2,8. Que veut-il dire ?",
      confirmation: "Pour 1 kWh d’électricité consommé, 2,8 kWh pour chauffer l’eau : c’est la valeur de ce chauffe-eau, pas une règle valable pour tous les appareils.",
      reponses: [
        { texte: "Il consomme 2,8 kWh pour chauffer 1 kWh d’eau.", pourquoi: "C’est l’inverse : plus le COP est grand, plus la chaleur donnée à l’eau dépasse l’électricité consommée." },
        { texte: "La pompe à chaleur tourne 2,8 heures par jour.", pourquoi: "Le COP n’est pas une durée : c’est la quantité de chaleur obtenue pour chaque kilowattheure d’électricité consommé." },
        { texte: "L’eau sort à 2,8 fois la température de l’air.", pourquoi: "Le COP ne dit rien d’une température : c’est un rapport entre la chaleur donnée à l’eau et l’électricité consommée." },
        { texte: "Pour 1 kWh d’électricité consommé, 2,8 kWh pour chauffer l’eau.", juste: true } ] },

    { question: "Sur le banc, le compteur de la résistance tourne en permanence, celui de la pompe à chaleur à peine. Que s’est-il passé ?",
      confirmation: "L’appoint est resté forcé : l’appareil fonctionne comme un chauffe-eau électrique ordinaire, et le compteur de la résistance le montre.",
      reponses: [
        { texte: "La pompe à chaleur chauffe si bien que la résistance l’aide.", pourquoi: "Si la pompe à chaleur chauffait bien, la résistance n’aurait pas à tourner. Si elle tourne seule, c’est qu’on l’a forcée, ou que l’air n’a plus de chaleur à donner." },
        { texte: "L’anode est usée.", pourquoi: "L’anode protège la cuve de la corrosion ; elle n’a aucun lien avec ce que consomment la pompe à chaleur ou la résistance." },
        { texte: "L’appoint est resté forcé en permanence.", juste: true },
        { texte: "Les deux compteurs sont inversés.", pourquoi: "Chaque compteur mesure ce que consomme son appareil : celui de la résistance montre bien ce que la résistance consomme." } ] }
  ],

  retenir: [
    "<strong>Une petite pompe à chaleur sur un ballon</strong> : elle prend la chaleur de l’air de la pièce et la donne à l’eau sanitaire, rien d’autre.",
    "<strong>Le condenseur est un tube enroulé contre la cuve</strong> : le fluide ne touche jamais l’eau qu’on boit.",
    "<strong>Eau froide en bas, eau chaude en haut</strong> : l’eau se range par couches.",
    "<strong>Pièce non chauffée, air libre, condensats évacués</strong> — et l’écoulement du groupe de sécurité jamais bouché.",
    "<strong>L’appoint dépanne, il ne doit pas devenir la règle</strong> : forcé en permanence, l’appareil redevient un chauffe-eau électrique."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître un chauffe-eau thermodynamique et ce qu’il y a dedans, suivre la chaleur de l’air jusqu’à l’eau du ballon, et savoir ce qu’on raccorde.</p><p><strong>Limite.</strong> Le même cycle pour chauffer la maison est la station 3.7. Aucune température de consigne, aucune pression, aucune durée n’est donnée ici : elles viennent de la notice de l’appareil. Les seuls chiffres sont ceux du chauffe-eau du banc du lycée, repris de la fiche de son constructeur, et le COP est celui que ce constructeur annonce, pas une valeur générale. La mention RGE et les aides sont du ressort de la Législation.</p>',

  credits: [
    { quoi: 'Images', source: 'symboles de la bibliothèque inerWeb',
      detail: 'collection QElectroTech, CC BY 3.0 — rien n’a été redessiné. Aucune photographie : celles de la base portaient une marque ou ne montraient pas l’appareil.' },
    { quoi: 'Chiffres du banc', source: 'fiche du constructeur du banc ERM TH10',
      detail: 'consultée le 03/10/2026 : capacité, fluide, puissances, COP annoncé, instruments. Aucune image de cette fiche n’est reprise.' },
    { quoi: 'Textes', source: 'documents du fonds inerWeb',
      detail: 'cours et documentation sur l’eau chaude sanitaire et le chauffe-eau électrique (couches, groupe de sécurité, anode) · station HydroMétro Sécurité' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.1 Le circuit, organe par organe", url: lien('2.1') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.7 La PAC air/eau : haute, moyenne et basse température", url: lien('3.7') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.4 Les condensats : pente, siphon, pompe de relevage", url: lien('4.4') },
    { ligne: 5, couleur: '#B06A00', texte: "5.5 Bilan thermique et performance énergétique", url: lien('5.5') },
    { ligne: 'H', couleur: '#176B73', texte: "HydroMétro — Sécurité", url: 'https://inerweb.fr/hydrometro/stations/securite/' },
    { ligne: 'L', couleur: '#92400E', texte: "Législation — RGE et QualiPAC", url: 'https://inerweb.fr/legislation/stations/certif-rge-qualipac/' }
  ]
});

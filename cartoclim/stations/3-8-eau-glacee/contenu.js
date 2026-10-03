/* CartoClim 3.9 — Groupe d'eau glacée et ventilo-convecteurs : l'eau fait le tour du bâtiment. Écrite le 02/10/2026. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;
const hydro = (page, texte) => '<a href="https://inerweb.fr/hydrometro/stations/' + page + '/">' + texte + '</a>';

ModeleAppareil.construire({
  id: '3.9', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 9',
  titre: "Groupe d’eau glacée et ventilo-convecteurs",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" },
    { id: '3.2', quoi: "le split, où le fluide va jusque dans la pièce" }
  ],

  photos: [
    { src: 'assets/biblio/13cc846178.jpeg',
      alt: "Un groupe d’eau glacée refroidi par air : un grand coffre blanc posé sur une palette, avec deux hélices noires en façade.",
      titre: "Le groupe : il fabrique de l’eau froide.", sous: "Une machine frigorifique complète, dehors. Ce qui part dans le bâtiment, c’est de l’eau." },
    { src: 'assets/biblio/58d1978470.png',
      alt: "Un ventilo-convecteur de plafond sans son habillage : un boîtier métallique, un filtre blanc devant la batterie et, sur le côté, les deux raccords d’eau avec leurs vannes.",
      titre: "Un ventilo-convecteur, sans son habillage.", sous: "Deux raccords d’eau sur le côté, un filtre devant la batterie." },
    { src: 'assets/biblio/8fad0658fd.png',
      alt: "Un ventilo-convecteur ouvert : la grande batterie en haut, et en bas deux turbines côte à côte avec leur moteur.",
      titre: "Ouvert : une batterie, des turbines.", sous: "L’eau passe dans la batterie ; les turbines brassent l’air de la pièce." }
  ],

  aQuoiCaSert: "À <strong>refroidir tout un bâtiment avec un seul circuit frigorifique</strong>. Le groupe fabrique de l’<strong>eau glacée</strong> ; cette eau part dans les étages, et dans chaque pièce un <strong>ventilo-convecteur</strong> souffle l’air de la pièce à travers une batterie où elle passe. Le fluide frigorigène, lui, ne quitte jamais le groupe.",
  ouOnLeTrouve: "Dans le tertiaire : bureaux, hôtels, bâtiments publics, et dans l’industrie — partout où il y a beaucoup de pièces à climatiser. Le groupe est dehors (terrasse, toiture) ou dans un local technique ; les ventilo-convecteurs sont dans les pièces, au mur, au plafond ou au sol. Le banc du lycée, l’<strong>ERM VC10</strong>, est justement un ventilo-convecteur — deux, sur un châssis — alimenté en eau chaude ou glacée par un générateur à part.",

  scene: () => ScenesStation.trajetDeLEau(),

  technologie: [
    ["Le groupe d’eau glacée", "une machine frigorifique complète, <strong>avec son propre cycle</strong> : compresseur (hermétique ou scroll), condenseur balayé par des hélices, détendeur, et l’<strong>évaporateur</strong>. Celui-ci est un échangeur — à plaques brasées, multitubulaire ou noyé dans un ballon — où le fluide s’évapore en prenant la chaleur de l’<strong>eau</strong> qui le traverse (" + hydro('echangeur', 'HydroMétro : Échangeur') + "). Autour, un circuit d’eau avec sa <strong>pompe</strong>, son purgeur d’air, sa soupape de sécurité, un contrôleur de débit, et un coffret de régulation."],
    ["Le réseau d’eau", "un <strong>départ</strong>, qui porte l’eau froide aux pièces, et un <strong>retour</strong>, qui ramène l’eau plus tiède au groupe. La pompe la fait circuler (" + hydro('circulateur', 'HydroMétro : Circulateur') + "), les purgeurs chassent l’air, et tout tuyau froid est <strong>isolé</strong>. Régime courant : autour de 6 °C au départ, 12 °C au retour."],
    ["Le ventilo-convecteur", "dans chaque pièce, un boîtier avec une <strong>batterie à eau</strong> (des tubes de cuivre à ailettes), un <strong>ventilateur</strong> à plusieurs vitesses, un <strong>filtre</strong> à l’entrée de l’air, un <strong>bac à condensats</strong> sous la batterie, et un thermostat. Comme un split, il a un filtre et un bac : il demande le même entretien."],
    ["Le trajet de la chaleur", "la chaleur de la pièce passe dans l’eau, l’eau la porte au groupe, le fluide frigorigène la prend dans l’évaporateur, le compresseur le met sous pression, et le condenseur rejette la chaleur dehors. Le dessin le déroule pas à pas."]
  ],

  variantes: [
    "<strong>Deux tubes</strong> — un seul réseau, un départ et un retour : de l’eau froide l’été, de l’eau chaude l’hiver, pour toutes les pièces en même temps. Le thermostat de chaque ventilo-convecteur a alors un commutateur été/hiver.",
    "<strong>Quatre tubes</strong> — deux réseaux, un froid et un chaud, disponibles en même temps : une pièce au soleil refroidit pendant que sa voisine chauffe. Le ventilo-convecteur est raccordé aux deux, souvent par deux batteries.",
    "<strong>Un groupe réversible</strong> — le groupe lui-même peut produire de l’eau chaude, comme une pompe à chaleur air/eau. C’est la station 3.7.",
    "<strong>Une centrale de traitement d’air</strong> — le même groupe peut alimenter la grande batterie d’une CTA, qui traite l’air neuf de tout un bâtiment. C’est la station 3.10."
  ],
  reglage: "Au <strong>thermostat</strong> du ventilo-convecteur : la température voulue, la vitesse du ventilateur, et, sur un réseau deux tubes, le commutateur été/hiver. Sur le réseau, une <strong>vanne</strong> règle l’eau qui passe dans chaque ventilo-convecteur ; au groupe, le régulateur tient la température de l’eau. Que chaque pièce reçoive sa part d’eau, c’est l’affaire de l’équilibrage : " + hydro('debit', 'HydroMétro : Débit') + " et " + hydro('pertes', 'Pertes de charge') + ".",

  consigneAptitudes: 'Un bâtiment de bureaux : un groupe d’eau glacée, des ventilo-convecteurs et un réseau quatre tubes. Cochez ce que l’installation sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un groupe d’eau glacée ?',
  colonnes: [
    { id: 'refroidir', libelle: 'Refroidir le bâtiment', aide: 'un seul groupe, de l’eau glacée dans tous les étages', dessin: SceneKit.pictos.DESSINS.froid },
    { id: 'fluide',    libelle: 'Fluide aux étages', aide: 'envoyer le fluide frigorigène du groupe jusque dans les pièces',
      dessin: '<path d="M18 90 H82 M18 66 H82 M18 42 H82 M18 18 H82"/><path d="M50 82 V24 M50 24 l-11 13 M50 24 l11 13"/>' },
    { id: 'chauffer',  libelle: 'Chauffer aussi', aide: 'avec un réseau quatre tubes ou un groupe réversible', dessin: SceneKit.pictos.DESSINS.chaud }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    refroidir: true, fluide: false, chauffer: true,
    bonneReponse: 'Exact. Un seul groupe refroidit tout le bâtiment, et ce sont des tuyaux d’eau qui montent dans les étages : le fluide frigorigène reste dans le groupe. On peut chauffer aussi, mais pas gratuitement : il faut un réseau quatre tubes avec une source de chaleur, ou un groupe réversible.',
    erreurs: {
      refroidir: 'C’est son métier : un seul groupe produit l’eau glacée, et les ventilo-convecteurs la distribuent dans toutes les pièces.',
      fluide: 'Dans les étages, il n’y a que de l’eau. Le fluide frigorigène reste dans le circuit du groupe : c’est l’un des intérêts du système, une fuite d’eau se traite plus simplement qu’une fuite de fluide.',
      chauffer: 'Avec un réseau quatre tubes, ou un groupe réversible, l’installation chauffe aussi. Un groupe d’eau glacée seul, lui, ne chauffe pas.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Deux tuyaux d’eau</strong>, départ et retour, du groupe jusqu’à chaque ventilo-convecteur, avec une <strong>vanne d’arrêt</strong> à chaque appareil. On tient le raccord de la batterie quand on serre, pour ne pas la tordre. Le réseau se remplit, puis se <strong>purge</strong> : l’air est chassé aux points hauts.",
    "<strong>L’isolant</strong>, sur tout le trajet : départ, retour, vannes, jusqu’au ventilo-convecteur. Un tuyau froid nu se couvre d’eau.",
    "<strong>Les condensats</strong> : le bac de chaque ventilo-convecteur se raccorde à un tuyau d’évacuation, en pente continue, comme sur un split. Stations 4.4 pour la pente, 5.3 pour l’entretien du filtre et du bac.",
    "<strong>L’alimentation électrique</strong> du ventilateur, avec son thermostat et son sélecteur de vitesse ; côté groupe, celle du compresseur, des hélices et de la pompe. Station 4.5.",
    "<strong>Le fluide frigorigène</strong> ? Aucun à raccorder dans les étages : le groupe est livré avec son circuit frigorifique fermé, chargé et essayé en usine."
  ],
  piege: "Un <strong>tuyau froid non isolé goutte</strong> : l’humidité de l’air se dépose dessus, comme sur une bouteille sortie du frigo, et c’est le faux plafond du client qui prend l’eau. Un isolant fendu ou une vanne laissée nue donnent le même résultat. Autre piège : l’<strong>air dans le circuit d’eau</strong> — des bulles, du bruit, un ventilo-convecteur qui refroidit mal. On purge, aux points hauts.",

  symboles: [
    { src: 'assets/enfriadora-1.svg', alt: "Symbole d’un groupe d’eau glacée : un boîtier rectangulaire avec deux raccords d’eau sur le côté et une batterie à ailettes de l’autre.", legende: "Groupe d’eau glacée" },
    { src: 'assets/fancoil-bajo.svg', alt: "Symbole d’un ventilo-convecteur : un boîtier vu en perspective, avec deux raccords d’eau sur le côté et sa grille de soufflage.", legende: "Ventilo-convecteur" }
  ],
  titreLecturePlan: 'Le lire sur un schéma d’installation',
  lecturePlan: [
    "Sur un schéma d’installation, le <strong>groupe</strong> est dessiné dehors (terrasse, toiture, pied de bâtiment) ou dans le local technique ; les <strong>ventilo-convecteurs</strong>, un par pièce ou par zone.",
    "Entre eux, des traits : le <strong>départ</strong> (eau froide) et le <strong>retour</strong>. Un réseau quatre tubes en a deux paires, une pour le froid, une pour le chaud.",
    "Sur ces traits, on cherche la <strong>pompe</strong> (un cercle avec un triangle), les <strong>vannes</strong>, les <strong>purgeurs</strong> aux points hauts et le sens de circulation de l’eau.",
    "Le tuyau de <strong>condensats</strong> de chaque ventilo-convecteur est tracé jusqu’à son évacuation. S’il manque sur le schéma, il manquera sur le chantier.",
    "Chaque appareil porte un repère, expliqué dans la légende du schéma."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’on raccorde sur un ventilo-convecteur',

  quiz: [
    { question: "Que quitte le groupe d’eau glacée pour aller dans les étages ?",
      confirmation: "De l’eau refroidie : le fluide frigorigène reste dans le groupe.",
      reponses: [
        { texte: "De l’eau refroidie.", juste: true },
        { texte: "Du fluide frigorigène.", pourquoi: "Le fluide frigorigène reste enfermé dans le circuit du groupe : il ne sort jamais dans le bâtiment." },
        { texte: "De l’air frais.", pourquoi: "L’air se refroidit dans la pièce, sur la batterie du ventilo-convecteur. Il ne vient pas du groupe." },
        { texte: "De la vapeur.", pourquoi: "Aucune vapeur ne circule dans les étages : c’est de l’eau liquide, froide." } ] },

    { question: "Dans l’évaporateur du groupe, qui cède de la chaleur à qui ?",
      confirmation: "L’eau cède sa chaleur au fluide frigorigène, qui s’évapore : c’est ce qui la refroidit.",
      reponses: [
        { texte: "Le fluide frigorigène en cède à l’eau.", pourquoi: "C’est l’inverse. Dans l’évaporateur, le fluide est plus froid que l’eau : il lui prend de la chaleur en s’évaporant. Ce que vous décrivez, c’est le travail d’un condenseur." },
        { texte: "L’eau en cède au fluide frigorigène.", juste: true },
        { texte: "L’air de la pièce en cède à l’eau.", pourquoi: "Cela se passe dans le ventilo-convecteur, sur sa batterie. Pas dans l’évaporateur du groupe." },
        { texte: "Aucun des deux : l’évaporateur est un simple tuyau.", pourquoi: "C’est un échangeur — à plaques, multitubulaire ou noyé dans un ballon — conçu pour faire passer la chaleur de l’eau au fluide." } ] },

    { question: "Qu’est-ce qui distingue un réseau quatre tubes d’un réseau deux tubes ?",
      confirmation: "Le quatre tubes a deux réseaux, un froid et un chaud, disponibles en même temps.",
      reponses: [
        { texte: "Il n’a pas de tuyau de retour.", pourquoi: "Chaque réseau a son départ et son retour : quatre tubes, c’est deux départs et deux retours." },
        { texte: "Il refroidit quatre fois plus.", pourquoi: "Le nombre de tubes ne multiplie pas la puissance : il dit combien de réseaux sont disponibles." },
        { texte: "Il a deux réseaux, un froid et un chaud, disponibles en même temps.", juste: true },
        { texte: "Il ne sert qu’à chauffer.", pourquoi: "Il distribue du froid et du chaud à la fois. Le deux tubes, lui, n’en distribue qu’un à la fois, selon la saison." } ] },

    { question: "Pourquoi isole-t-on un tuyau d’eau glacée ?",
      confirmation: "Pour que l’humidité de l’air ne se dépose pas sur le tuyau froid et ne goutte pas.",
      reponses: [
        { texte: "Pour faire moins de bruit.", pourquoi: "L’isolant amortit un peu le bruit, mais ce n’est pas sa raison d’être sur un tuyau froid." },
        { texte: "Pour protéger le tuyau des chocs.", pourquoi: "Un isolant n’est pas un blindage. Il sert à garder le froid et à empêcher la condensation." },
        { texte: "Pour que l’eau ne gèle pas.", pourquoi: "L’eau glacée reste liquide, à quelques degrés au-dessus de zéro. Ce qu’on craint, ce n’est pas le gel, c’est l’eau qui se forme sur le tuyau." },
        { texte: "Pour que l’humidité de l’air ne se dépose pas dessus et ne goutte pas.", juste: true } ] },

    { question: "Un ventilo-convecteur refroidit mal, et le tuyau gargouille. Que soupçonner en premier ?",
      confirmation: "Des bulles d’air dans le circuit : elles gênent la circulation de l’eau et font du bruit. On purge aux points hauts.",
      reponses: [
        { texte: "De l’air dans le circuit d’eau.", juste: true },
        { texte: "Une fuite de fluide frigorigène.", pourquoi: "Il n’y a pas de fluide frigorigène dans un ventilo-convecteur : seulement de l’eau." },
        { texte: "Un compresseur en panne dans la pièce.", pourquoi: "Le ventilo-convecteur n’a pas de compresseur : il est dans le groupe, loin de la pièce." },
        { texte: "Un filtre sale.", pourquoi: "Un filtre sale réduit le débit d’air et la pièce refroidit mal, mais il ne fait pas gargouiller le tuyau d’eau." } ] },

    { question: "Où va l’eau qui se forme sur la batterie d’un ventilo-convecteur ?",
      confirmation: "Dans le bac à condensats, puis dans son tuyau d’évacuation, en pente.",
      reponses: [
        { texte: "Dans le circuit d’eau glacée.", pourquoi: "Cette eau vient de l’humidité de l’air et se dépose sur la batterie, dehors du circuit : elle n’y entre pas." },
        { texte: "Dans le bac, puis dans le tuyau d’évacuation.", juste: true },
        { texte: "Elle repart dans la pièce, avec l’air.", pourquoi: "L’air ressort au contraire plus sec : l’eau déposée sur la batterie est retenue, et doit être évacuée." },
        { texte: "Dans le groupe, par le tuyau de retour.", pourquoi: "Le retour est un circuit fermé, il ne ramasse pas l’eau de la batterie. Les condensats ont leur propre tuyau." } ] }
  ],

  retenir: [
    "<strong>Le groupe fabrique l’eau glacée</strong> avec son propre cycle : c’est l’eau qui va dans les étages, pas le fluide.",
    "<strong>Chaque ventilo-convecteur</strong> : une batterie où passe l’eau, un ventilateur, un filtre, un bac — comme un split.",
    "<strong>Deux tubes</strong> : froid ou chaud selon la saison. <strong>Quatre tubes</strong> : les deux en même temps.",
    "<strong>Tout tuyau froid s’isole</strong>, et l’air du circuit se purge."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre comment un groupe d’eau glacée refroidit un bâtiment par l’intermédiaire de l’eau, reconnaître les organes d’un ventilo-convecteur, distinguer un réseau deux tubes d’un réseau quatre tubes, et savoir ce qu’on raccorde.</p><p><strong>Limite.</strong> Le calcul des puissances, l’équilibrage du réseau d’eau, la régulation fine, la pompe à chaleur air/eau et la centrale de traitement d’air sont des stations à part. Aucune puissance ni aucun débit n’est donné ici : ils viennent de la documentation de l’appareil. Le seul chiffre cité, le régime d’eau courant, vient du cours sur le groupe d’eau glacée.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.1 Le circuit, organe par organe", url: lien('2.1') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.7 La PAC air/eau", url: lien('3.7') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.10 Lire une CTA", url: lien('3.10') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.4 Les condensats : pente, siphon, pompe de relevage", url: lien('4.4') },
    { ligne: 5, couleur: '#B06A00', texte: "5.3 L’entretien : filtres, batteries, bac à condensats", url: lien('5.3') } ]
});

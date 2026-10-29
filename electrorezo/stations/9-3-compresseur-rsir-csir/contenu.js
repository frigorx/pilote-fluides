/* ÉlectroRézo 9.3 — Compresseur RSIR, CSIR : le relais d’intensité, la CTP et le condensateur
   de démarrage. Les trois schémas sont construits dans QElectroTech (schemas-ligne-9/construire-montages.py)
   et convertis en SVG : rien n’est dessiné ici. Faits : voir SOURCES.md. */

/* Les trois montages, dans l’ordre du temps 2 : RSIR à relais, RSIR à CTP, CSIR. */
const MONTAGES_9_3 = [
  { src: 'assets/montage-rsir.svg',
    alt: "Schéma du RSIR à relais. L’alimentation L passe par le Klixon et arrive à la borne C du compresseur. Le principal va à la borne R, puis à la bobine KA, puis au neutre N. L’auxiliaire va à la borne S, puis au contact KA, puis au neutre N.",
    titre: "RSIR à relais.", sous: "La bobine KA est en série avec le principal. Le contact KA est sur l’auxiliaire." },
  { src: 'assets/montage-ctp.svg',
    alt: "Schéma du RSIR à CTP. L’alimentation L passe par le Klixon et arrive à la borne C du compresseur. Le principal va à la borne R, puis au neutre N. L’auxiliaire va à la borne S, puis à une CTP, puis au neutre N. Il n’y a ni bobine ni contact.",
    titre: "RSIR à CTP.", sous: "La CTP est en série avec l’auxiliaire. Il n’y a pas de relais." },
  { src: 'assets/montage-csir.svg',
    alt: "Schéma du CSIR. Le même montage que le RSIR à relais : le principal porte la bobine KA, l’auxiliaire porte le contact KA. Le condensateur de démarrage Cd est ajouté sur l’auxiliaire, après le contact KA, avant le neutre N.",
    titre: "CSIR.", sous: "Le montage du RSIR à relais, avec le condensateur de démarrage Cd après le contact KA." }
];

function enchainement93() {
  const bande = document.createElement('div');
  bande.className = 'bande-visuelle';
  MONTAGES_9_3.forEach(m => {
    const f = document.createElement('figure');
    f.className = 'vignette';
    const im = document.createElement('img');
    im.src = m.src; im.alt = m.alt; im.loading = 'lazy';
    f.appendChild(im);
    const c = document.createElement('figcaption');
    const s = document.createElement('strong');
    s.textContent = m.titre;
    c.appendChild(s);
    c.appendChild(document.createTextNode(' ' + m.sous));
    f.appendChild(c);
    bande.appendChild(f);
  });
  return bande;
}

/* Un schéma de MONTAGES_9_3 posé là où la consigne ou la question le fait lire (temps 3, 4 et 5), avec une
   légende qui ne répond pas. Il porte la loupe de la bande : un clic l'ouvre en grand. */
function vignette93(i, legende, complement) {
  const f = document.createElement('figure');
  f.className = 'vignette';
  const im = document.createElement('img');
  im.src = MONTAGES_9_3[i].src; im.alt = MONTAGES_9_3[i].alt; im.loading = 'lazy';
  f.appendChild(im);
  const c = document.createElement('figcaption');
  const s = document.createElement('strong');
  s.textContent = legende;
  c.appendChild(s);
  if (complement) c.appendChild(document.createTextNode(' ' + complement));
  f.appendChild(c);
  return f;
}
function bandeSchemas93(liste) {
  const bande = document.createElement('div');
  bande.className = 'bande-visuelle';
  liste.forEach(([i, legende, complement]) => bande.appendChild(vignette93(i, legende, complement)));
  return bande;
}
/* La même vignette en HTML, pour le texte de « Le lire sur un plan ». L'étiquette est écrite IMG en capitales
   à dessein : le modèle ajoute « retour du neutre en orange » dès qu'il voit <img, et ces schémas sont en noir. */
const schemaPlan93 = (i, legende) => '<figure class="vignette" style="max-width:340px;margin:.2rem auto"><IMG src="' +
  MONTAGES_9_3[i].src + '" alt="' + MONTAGES_9_3[i].alt + '"><figcaption><strong>' + legende + '</strong></figcaption></figure>';

/* Le récapitulatif du temps 5. */
const LIGNES_9_3 = [
  ['RSIR à relais', 'le relais d’intensité : son contact s’ouvre vers 80 % de la vitesse', 'aucun', 'faible', 'capillaire seulement'],
  ['RSIR à CTP', 'la CTP : sa résistance monte quand elle chauffe, le courant de l’auxiliaire tombe', 'aucun', 'faible', 'capillaire indispensable'],
  ['CSIR', 'le relais d’intensité : il retire l’auxiliaire et son condensateur', 'un de démarrage', 'important', 'détendeur thermostatique, par exemple']
];

function tableau93() {
  const boite = document.createElement('div');
  boite.style.overflowX = 'auto';
  /* sur téléphone, le tableau défile seul : sans ces deux lignes, il élargit toute la colonne, et le rappel,
     les schémas et les questions sortent de l'écran à droite */
  boite.style.width = '0'; boite.style.minWidth = '100%';
  const t = document.createElement('table');
  t.className = 'tab';
  t.innerHTML = '<thead><tr><th>Montage</th><th>Ce qui retire l’auxiliaire</th><th>Condensateur</th>' +
    '<th>Couple au démarrage</th><th>Détente</th></tr></thead><tbody>' +
    LIGNES_9_3.map(([m, r, c, k, p]) =>
      '<tr><td><strong>' + m + '</strong></td><td>' + r + '</td><td>' + c + '</td><td>' + k + '</td><td>' + p + '</td></tr>'
    ).join('') + '</tbody>';
  boite.appendChild(t);
  const l = document.createElement('p');
  l.className = 'legende';
  l.textContent = 'Sans condensateur, le couple au démarrage est faible. La détente doit alors se faire par capillaire, pour que la haute pression et la basse pression s’égalisent à l’arrêt. Le CSIR s’emploie quand le couple demandé au démarrage risque d’être fort.';
  boite.appendChild(l);
  /* la question sur la CTP relancée chaude s'appuie sur ce rappel, repris du paragraphe « La CTP » du temps 2 */
  const r = document.createElement('p');
  r.className = 'legende';
  r.textContent = 'Si on relance le moteur quand la CTP est encore chaude, elle ne laisse presque rien passer dans l’auxiliaire : le moteur ne démarre pas, le courant du principal monte, et le Klixon coupe. D’où l’arrêt d’au moins 5 minutes.';
  boite.appendChild(r);
  /* les questions lisent le schéma du RSIR et celui du CSIR : ils sont posés ici, sous le tableau */
  boite.appendChild(bandeSchemas93([[0, 'Schéma du RSIR.'], [2, 'Schéma du CSIR.']]));
  return boite;
}

ModeleAppareil.construire({
  id: '9.3', ligne: 9,
  vue3d: { modele: 'relaisIntensite' },   /* 3D */
  vue3dAussi: [{ modele: 'ctp', titre: 'La CTP, dedans et en marche' }],   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 3',
  titre: "Compresseur RSIR, CSIR : le relais d’intensité",
  narration: NARRATION,

  prerequis: [
    { id: '9.1', quoi: "les trois bornes du compresseur et les montages RSIR et CSIR" },
    { id: '9.2', quoi: "repérer C, S et R à l’ohmmètre" }
  ],

  photos: [
    { src: 'assets/montage-rsir.svg',
      alt: MONTAGES_9_3[0].alt,
      titre: "Le RSIR.", sous: "Une bobine sur le principal, un contact sur l’auxiliaire : le relais d’intensité. Aucun condensateur." },
    { src: 'assets/montage-csir.svg',
      alt: MONTAGES_9_3[2].alt,
      titre: "Le CSIR.", sous: "Le même relais, avec un condensateur de démarrage Cd sur l’auxiliaire." }
  ],
  creditPhoto: 'Schémas construits dans QElectroTech. Détail dans « Crédits ».',

  aQuoiCaSert: "Un moteur monophasé ne démarre pas avec son seul enroulement principal. Au démarrage, l’enroulement auxiliaire est mis en service. Quand le moteur a pris de la vitesse, il faut le retirer. Le <strong>relais d’intensité</strong> fait ce travail, sans rien commander à la main.",
  ouOnLeTrouve: "Le relais d’intensité équipe les petits compresseurs, jusqu’à environ 600 W : réfrigérateurs ménagers, petits congélateurs. Il est souvent embroché directement sur le bornier du compresseur, avec un détrompage.",

  scene: () => enchainement93(),

  technologie: [
    ["Le relais d’intensité", "sa bobine, en gros fil, est <strong>en série avec le principal</strong>. Son contact est ouvert au repos et alimente l’auxiliaire. Sur les schémas, la bobine et le contact portent le même repère, KA."],
    ["Au démarrage", "à la mise sous tension, le courant traverse le Klixon, le principal et la bobine. Le contact est ouvert : le moteur ne peut pas démarrer, et le courant monte, de l’ordre de 5 fois le courant nominal. La bobine attire alors le contact, qui met l’auxiliaire en service. Le moteur accélère, le courant baisse. Vers 80 % de la vitesse, le contact s’ouvre et retire l’auxiliaire."],
    ["Le sens de montage", "le relais s’installe avec l’inscription <strong>Top</strong> en haut. Monté à l’envers, son contact peut rester fermé en permanence, et le moteur risque de griller."],
    ["La CTP", "c’est une résistance dont la valeur monte quand elle chauffe. Froide, elle a une résistance très faible, quelques ohms : le courant passe dans l’auxiliaire et le moteur démarre. Ce courant chauffe la CTP. Après une à deux secondes, elle dépasse 100 °C et 1 000 Ω. Le courant de l’auxiliaire tombe à quelques milliampères, comme si un relais l’avait retiré. Ce petit courant la garde chaude. Si on relance le moteur quand elle est encore chaude, elle ne laisse presque rien passer dans l’auxiliaire : le moteur ne démarre pas, le courant du principal monte, et le Klixon coupe. D’où l’arrêt d’au moins 5 minutes."],
    ["Le condensateur de démarrage", "c’est un condensateur électrolytique, de forte capacité (plus de 100 µF possible) et de petite taille. Il ne doit pas rester sous tension, sinon il chauffe et risque d’exploser : <strong>5 secondes au plus</strong>, et 20 démarrages par heure au maximum. Sur son boîtier, on lit la capacité en µF (aussi écrit MF ou MFD) avec sa tolérance, et la tension maximale. Un condensateur de 20 µF / 360 V s’utilise sous 240 V, jamais sur 400 V."],
    ["Le contrôle du relais", "les bornes d’un relais sont repérées P/M (principal), A/S (auxiliaire) et L (ligne). P/M est reliée à la borne R du compresseur, A/S à la borne S, et L à la ligne. Hors tension, après consignation, relais dans le bon sens, l’ohmmètre indique l’infini entre A/S et P/M, et entre A/S et L, car le contact est ouvert. Il indique presque 0 Ω entre P/M et L : c’est la bobine."]
  ],

  variantes: [
    "<strong>RSIR à relais</strong> : le relais d’intensité retire l’auxiliaire. Aucun condensateur. Le couple au démarrage est faible : la détente se fait par capillaire.",
    "<strong>RSIR à CTP</strong> : la CTP, en série avec l’auxiliaire, remplace le relais. Capillaire indispensable. Entre deux démarrages, il faut au moins 5 minutes d’arrêt pour qu’elle refroidisse.",
    "<strong>CSIR</strong> : le RSIR avec un condensateur de démarrage en série avec l’auxiliaire. Le couple au démarrage est important. On l’emploie quand le couple demandé au démarrage risque d’être fort, par exemple avec un détendeur thermostatique."
  ],
  reglage: "Rien ne se règle. Un relais se remplace par un relais de <strong>même référence</strong> : sinon son contact ne colle jamais, ou reste collé. Une CTP se remplace aussi par la même référence. Quand on change un compresseur, on change aussi les pièces de démarrage : relais et condensateurs.",

  /* temps 3 : les deux schémas de la consigne, sous elle (D.picto) : plus de renvoi aux temps 1 et 2 */
  picto: () => ({
    element: bandeSchemas93([[0, 'RSIR à relais.', 'Exemple résolu.'], [1, 'RSIR à CTP.', 'À vous maintenant.']]),
    marquer: () => {}
  }),
  colonnes: [
    { id: 'relais', libelle: 'Un relais d’intensité', aide: 'une bobine sur le principal, un contact sur l’auxiliaire' },
    { id: 'condensateur', libelle: 'Un condensateur de démarrage', aide: 'il donne du couple au lancement' },
    { id: 'ctp', libelle: 'Une CTP', aide: 'sa résistance monte quand elle chauffe' }
  ],
  consigneAptitudes: 'Exemple résolu. Sur le premier schéma, « RSIR à relais », on lit la bobine KA sur le principal et le contact KA sur l’auxiliaire : il porte un relais. Il n’a ni CTP ni condensateur. À vous maintenant. Un compresseur est un RSIR à CTP. Regardez le second schéma, « RSIR à CTP ». Cherchez la bobine, la CTP et le condensateur Cd. Cochez ce que ce compresseur porte, puis validez.',
  aptitudes: {
    relais: false, condensateur: false, ctp: true,
    bonneReponse: 'Juste. Le RSIR à CTP porte une CTP, en série avec l’auxiliaire. Elle retire le courant de l’auxiliaire quand elle a chauffé. Il n’a ni relais ni condensateur.',
    erreurs: {
      relais: 'Sur le schéma « RSIR à CTP », juste au-dessus des cases, il n’y a ni bobine KA ni contact KA. La CTP tient la place du relais.',
      condensateur: 'Le RSIR n’a aucun condensateur. Sur le schéma « RSIR à CTP », juste au-dessus des cases, il n’y a pas de Cd.',
      ctp: 'Sur le schéma « RSIR à CTP », juste au-dessus des cases, une CTP est en série avec l’auxiliaire, entre la borne S et le neutre N.'
    }
  },

  cablage: [
    "Le Klixon est <strong>en série</strong> sur la borne C, comme sur les schémas : il protège les deux enroulements.",
    "La bobine du relais est <strong>en série avec le principal</strong> : tout le courant du principal la traverse.",
    "Le contact du relais est sur l’auxiliaire, vers la borne S. Sur le CSIR, le condensateur de démarrage est en série avec l’auxiliaire, <strong>après le contact</strong>.",
    "Le relais se monte avec l’inscription <strong>Top</strong> en haut.",
    "Un condensateur reste <strong>chargé</strong> après la coupure. On le décharge avant d’y toucher, avec une résistance. Certains ont une résistance de décharge, d’environ 15 kΩ, entre leurs bornes. La décharge n’est pas instantanée, elle peut prendre quelques minutes : on décharge quand même.",
    "Toute mesure se fait hors tension, après consignation."
  ],
  piege: "Une CTP encore chaude donne une surintensité, et le Klixon coupe le moteur : il faut au moins 5 minutes d’arrêt avant de relancer. Un relais monté à l’envers peut garder son contact fermé en permanence : le moteur risque de griller. Vérifiez que Top est en haut.",

  symboles: [
    { src: 'assets/bobine-relais.svg', alt: "Symbole de la bobine d’un relais : un rectangle, avec un fil qui arrive en haut et un fil qui repart en bas.", legende: "Bobine du relais (KA)" },
    { src: 'assets/contact-travail.svg', alt: "Symbole d’un contact à fermeture à commande électromagnétique : un trait oblique qui ne touche pas le fil du haut, donc ouvert au repos, relié par un pointillé à un petit arc de cercle.", legende: "Contact ouvert au repos (KA)" },
    { src: 'assets/ctp.svg', alt: "Symbole d’une résistance CTP : un rectangle de résistance, traversé par un fil, marqué de la lettre T.", legende: "CTP" },
    { src: 'assets/condensateur.svg', alt: "Symbole normalisé du condensateur : deux traits parallèles qui ne se touchent pas.", legende: "Condensateur" },
    { src: 'assets/clixon.svg', alt: "Symbole du protecteur thermique Klixon : un cercle traversé par un trait brisé.", legende: "Klixon" }
  ],
  lecturePlan: [
    schemaPlan93(0, 'Schéma du RSIR.'),
    "Sur le schéma du RSIR, juste au-dessus, lisez de haut en bas : l’alimentation <strong>L</strong>, le Klixon, la borne <strong>C</strong>. Le fil se partage ensuite en deux branches. Un clic sur le schéma l’agrandit.",
    "À gauche, le <strong>principal</strong> : la borne R, puis la bobine, puis le neutre N. À droite, l’<strong>auxiliaire</strong> : la borne S, puis le contact, puis le neutre N.",
    "La bobine et le contact portent le même repère <strong>KA</strong>. Deux symboles distincts, un seul relais : la bobine du principal commande le contact de l’auxiliaire.",
    "Le cadre en pointillés entoure le compresseur. Les deux enroulements et les bornes C, R et S sont dedans. La bobine et le contact KA sont dehors, dans le relais.",
    schemaPlan93(2, 'Schéma du CSIR.'),
    "Sur le schéma du CSIR, juste au-dessus, cherchez le condensateur <strong>Cd</strong>. Il est sur la branche de l’auxiliaire, sous le contact KA."
  ],

  tableau: () => tableau93(),
  tableauTitre: 'RSIR à relais, RSIR à CTP, CSIR',

  quiz: [
    { question: "Sur le schéma du RSIR, juste au-dessus des questions, suivez le fil à partir de la borne R. Avec quel enroulement la bobine KA est-elle en série ?",
      confirmation: "Avec le principal : la bobine est entre la borne R et le neutre N. Tout le courant du principal la traverse.",
      reponses: [
        { texte: "Avec l’enroulement principal.", juste: true },
        { texte: "Avec l’enroulement auxiliaire.", pourquoi: "Le fil de l’auxiliaire, de la borne S au neutre N, porte le contact KA. La bobine est sur l’autre branche." },
        { texte: "Avec aucun enroulement.", pourquoi: "Elle est sur le fil du principal, entre R et N : le courant du principal passe par elle." } ] },

    { question: "Le compresseur vient d’être mis sous tension et le contact KA est ouvert. La carte « Ce qu’il faut retenir » rappelle où est la bobine et ce que fait le contact. Que se passe-t-il d’abord ?",
      confirmation: "Le moteur ne peut pas démarrer, le courant monte dans le principal et la bobine, et la bobine attire le contact.",
      reponses: [
        { texte: "L’auxiliaire est déjà alimenté et le moteur démarre.", pourquoi: "Le contact est ouvert au repos : l’auxiliaire n’est pas alimenté." },
        { texte: "Le courant monte dans le principal et dans la bobine, qui attire le contact.", juste: true },
        { texte: "Le contact s’ouvre pour retirer l’auxiliaire.", pourquoi: "Il est déjà ouvert. Il s’ouvre de nouveau vers 80 % de la vitesse, quand le moteur a accéléré." } ] },

    { question: "Sur le schéma du CSIR, juste au-dessus des questions, où est branché le condensateur de démarrage Cd ?",
      confirmation: "En série avec l’auxiliaire, après le contact KA. Quand le contact s’ouvre, le condensateur est retiré avec l’auxiliaire.",
      reponses: [
        { texte: "En série avec le principal, avant la borne R.", pourquoi: "Sur le schéma, le principal ne porte que la bobine KA." },
        { texte: "En série avec l’auxiliaire, après le contact KA.", juste: true },
        { texte: "Entre L et le Klixon.", pourquoi: "À cet endroit passe tout le courant du moteur. Le condensateur de démarrage sert l’auxiliaire seulement." } ] },

    { question: "Un compresseur RSIR à CTP vient de s’arrêter. Le thermostat le relance aussitôt. Sous le tableau, le rappel dit ce qui se passe quand on relance une CTP encore chaude. Que risque-t-il ?",
      confirmation: "La CTP est encore chaude : il y a une surintensité, et le Klixon coupe le moteur. Il faut au moins 5 minutes d’arrêt.",
      reponses: [
        { texte: "Rien : la CTP refroidit en une seconde.", pourquoi: "Il faut au moins 5 minutes d’arrêt pour qu’elle refroidisse." },
        { texte: "Une surintensité, puis une coupure par le Klixon.", juste: true },
        { texte: "Le contact du relais reste collé.", pourquoi: "Ce montage n’a pas de relais, il a une CTP." },
        { texte: "Le condensateur de démarrage chauffe.", pourquoi: "Le RSIR n’a aucun condensateur." } ] }
  ],

  retenir: [
    "Le <strong>RSIR</strong> a un relais d’intensité (ou une CTP) et aucun condensateur. Le <strong>CSIR</strong> ajoute un condensateur de démarrage, en série avec l’auxiliaire.",
    "La bobine du relais est <strong>en série avec le principal</strong>. Son contact, ouvert au repos, alimente l’auxiliaire. Il s’ouvre vers 80 % de la vitesse.",
    "Le relais se monte avec <strong>Top</strong> en haut. Il se remplace par un relais de même référence.",
    "Une CTP chaude ne redémarre pas : 5 minutes d’arrêt au moins.",
    "Un condensateur de démarrage ne reste pas sous tension : 5 secondes au plus. On le décharge avec une résistance avant d’y toucher."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire le schéma du RSIR et du CSIR, dire ce que fait le relais d’intensité à chaque instant du démarrage, et reconnaître le rôle de la CTP et du condensateur de démarrage.</p><p><strong>Limite.</strong> Le repérage des bornes à l’ohmmètre est à la station 9.2. Le Klixon, le test du condensateur et le dépannage sont à la station 9.5. Les autres montages sont à la station 9.4.</p>',
  credits: [
    { quoi: 'Schémas des montages', source: 'construits dans QElectroTech',
      detail: 'les montages sont assemblés par script avec des symboles de QElectroTech, puis convertis en SVG' },
    { quoi: 'Symboles', source: 'bibliothèque de symboles QElectroTech',
      detail: 'bobine, contact, CTP, condensateur et Klixon, repris sans être redessinés' },
    { quoi: 'Fonctionnement du relais, de la CTP et du condensateur', source: 'cours du fonds inerWeb « Moteurs monophasés »',
      detail: 'Bac pro MFER, et cours « Les moteurs »' },
    { quoi: 'Les montages RSIR et CSIR', source: 'Tecumseh Europe, annexes « Types de moteurs, appareillage électrique »',
      detail: 'sigles et pièces de chaque montage' } ],

  correspondances: [
    { ligne: 9, couleur: '#a16207', texte: "9.1 Qui fait tourner quoi" },
    { ligne: 5, couleur: '#1e7e54', texte: "5.4 Le relais" } ]
});

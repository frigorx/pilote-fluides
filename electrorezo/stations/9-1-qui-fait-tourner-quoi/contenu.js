/* ÉlectroRézo 9.1 — Qui fait tourner quoi : les moteurs monophasés d'une installation
   frigorifique, et les quatre montages de démarrage du compresseur.
   Station générale de la ligne 9 : les stations 9.2 à 9.9 détaillent chaque montage. */

/* Les quatre montages, d'après Tecumseh Europe (annexes « Types de moteurs ») et le cours
   « 20-MoteurMonophase » (§ III et VI). Voir SOURCES.md. */
const MONTAGES_9_1 = [
  ['RSIR', 'aucun', 'un relais d’intensité, ou une CTP : il retire l’auxiliaire', 'faible', 'capillaire seulement'],
  ['CSIR', 'un de démarrage', 'un relais d’intensité : il retire l’auxiliaire et son condensateur', 'fort', 'capillaire ou détendeur thermostatique'],
  ['PSC', 'un permanent', 'aucun : l’auxiliaire reste en service', 'faible', 'capillaire'],
  ['CSR', 'un de démarrage et un permanent', 'un relais de tension : il retire le condensateur de démarrage', 'fort', 'capillaire ou détendeur thermostatique']
];

function tableauMontages91() {
  const boite = document.createElement('div');
  boite.style.overflowX = 'auto';
  const t = document.createElement('table');
  t.className = 'tab';
  t.innerHTML = '<thead><tr><th>Montage</th><th>Condensateurs</th><th>Organe de démarrage</th>' +
    '<th>Couple au démarrage</th><th>Détente</th></tr></thead><tbody>' +
    MONTAGES_9_1.map(([m, c, r, k, p]) =>
      '<tr><td><strong>' + m + '</strong></td><td>' + c + '</td><td>' + r + '</td><td>' + k + '</td><td>' + p + '</td></tr>'
    ).join('') + '</tbody>';
  boite.appendChild(t);
  const l = document.createElement('p');
  l.className = 'legende';
  l.textContent = 'Les sigles viennent de l’anglais, où capacitor veut dire condensateur, start démarrage et run marche. RSIR : Resistance Start Induction Run. CSIR : Capacitor Start Induction Run. PSC : Permanent Split Capacitor. CSR : Capacitor Start and Run. Un capillaire laisse les pressions s’égaliser à l’arrêt : le compresseur repart avec un faible couple.';
  boite.appendChild(l);
  return boite;
}

/* Le temps 3 : les lignes du tableau que la consigne fait lire (l'exemple RSIR, puis le CSIR) sont posées
   sous la consigne, par la place que le modèle réserve aux pictogrammes (D.picto). L'élève n'a plus à
   retourner au temps 2. Trois colonnes suffisent : le montage, les condensateurs, l'organe de démarrage. */
function lignesMontages91(sigles) {
  const boite = document.createElement('div');
  boite.style.overflowX = 'auto';
  const t = document.createElement('table');
  t.className = 'tab';
  t.innerHTML = '<thead><tr><th>Montage</th><th>Condensateurs</th><th>Organe de démarrage</th></tr></thead><tbody>' +
    sigles.map(s => MONTAGES_9_1.find(m => m[0] === s)).map(([m, c, r]) =>
      '<tr><td><strong>' + m + '</strong></td><td>' + c + '</td><td>' + r + '</td></tr>'
    ).join('') + '</tbody>';
  boite.appendChild(t);
  boite.style.marginBottom = '.5rem';
  return { element: boite, marquer: () => {} };
}

ModeleAppareil.construire({
  id: '9.1', ligne: 9,
  vue3d: { modele: 'compresseurHermetique', defaut: 'schema' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 1',
  titre: "Qui fait tourner quoi",
  narration: NARRATION,

  prerequis: [
    { id: '6.5', quoi: "le moteur monophasé et son condensateur" }
  ],

  photos: [
    { src: 'assets/qui-fait-tourner-quoi.svg',
      alt: "Trois symboles côte à côte : le compresseur, le ventilateur à hélice, la turbine. Sous chacun, où on le trouve dans l’installation.",
      titre: "Trois machines qui tournent.", sous: "Chacune est entraînée par un moteur. Sur un appareil en 230 V, c’est le plus souvent un moteur monophasé." }
  ],
  creditPhoto: 'Symboles : bibliothèque inerWeb, assemblés sans être redessinés. Détail dans « Crédits ».',

  aQuoiCaSert: "Dans une installation alimentée en 230 V, plusieurs moteurs monophasés tournent : celui du <strong>compresseur</strong>, celui du ventilateur du condenseur, celui du ventilateur de l’évaporateur, celui de la turbine d’une unité intérieure. Avant de dépanner, on repère lequel ne tourne pas, et comment il démarre.",
  ouOnLeTrouve: "Le compresseur hermétique est dans le groupe de condensation ou l’unité extérieure. Les ventilateurs sont sur les échangeurs. La turbine souffle l’air de la pièce dans l’unité intérieure.",

  scene: () => tableauMontages91(),

  technologie: [
    ["Les trois bornes du compresseur", "<strong>C</strong> est le commun, <strong>R</strong> la marche (l’enroulement principal), <strong>S</strong> le démarrage (l’enroulement auxiliaire). Les cours français écrivent aussi C, P et A. La station 9.2 apprend à les repérer à l’ohmmètre."],
    ["L’organe de démarrage", "un relais agit quand le moteur atteint environ 80 % de sa vitesse ; une CTP coupe quand elle a chauffé. Sur le RSIR et le CSIR, il retire l’enroulement auxiliaire. Sur le CSR, il retire le condensateur de démarrage, et l’auxiliaire reste alimenté par le condensateur permanent. C’est un relais d’intensité, un relais de tension, ou une CTP, une résistance dont la valeur monte quand elle chauffe. Le PSC n’a pas d’organe de démarrage."],
    ["Les condensateurs", "le condensateur de <strong>démarrage</strong> donne du couple au lancement, puis il est retiré. Le condensateur <strong>permanent</strong> reste en service pendant la marche."],
    ["Le protecteur thermique", "souvent appelé Klixon, il est monté sur le compresseur. Il coupe le moteur quand il chauffe trop. La station 9.5 le détaille."]
  ],

  variantes: [
    "<strong>Le compresseur</strong> : un des quatre montages du tableau, RSIR, CSIR, PSC ou CSR. Le sigle dit quels condensateurs et quel relais l’accompagnent (stations 9.3 et 9.4). Le compresseur d’un climatiseur Inverter est piloté par une carte électronique : il n’a aucun de ces montages.",
    "<strong>Le ventilateur à hélice</strong> : un moteur à condensateur permanent. Sur les petits ventilateurs d’évaporateur, un moteur à spire de Frager, sans condensateur (station 9.6).",
    "<strong>La turbine</strong> : un moteur à condensateur permanent, avec plusieurs vitesses (station 9.7).",
    "<strong>Le moteur EC</strong> : sur les appareils récents, ventilateurs et turbines ont un moteur à commutation électronique, piloté par une consigne de 0 à 10 V (station 9.9)."
  ],
  reglage: "Rien ne se règle. Le montage se lit sur le schéma électrique du compresseur ou dans sa notice. Un relais de démarrage se remplace par un relais de <strong>même référence</strong> : un relais mal adapté reste collé, ou ne colle jamais.",

  picto: () => lignesMontages91(['RSIR', 'CSIR']),
  colonnes: [
    { id: 'demarrage', libelle: 'Un condensateur de démarrage', aide: 'il donne du couple au lancement, puis il est retiré' },
    { id: 'permanent', libelle: 'Un condensateur permanent', aide: 'il reste en service pendant la marche' },
    { id: 'relais', libelle: 'Un relais de démarrage', aide: 'il coupe le circuit de démarrage après le lancement' }
  ],
  consigneAptitudes: 'Exemple résolu. Dans le tableau ci-dessous, lisez la ligne RSIR : la colonne « Condensateurs » dit « aucun », la colonne « Organe de démarrage » dit « un relais d’intensité, ou une CTP ». Le RSIR n’a donc aucun condensateur, et un relais ou une CTP retire son auxiliaire. À vous maintenant. Un compresseur porte le sigle CSIR. Lisez la ligne CSIR de la même façon. Cochez ce que ce compresseur porte, puis validez.',
  aptitudes: {
    demarrage: true, permanent: false, relais: true,
    bonneReponse: 'Juste. Le CSIR a un condensateur de démarrage et un relais d’intensité qui le retire. Il n’a pas de condensateur permanent : c’est le CSR qui en ajoute un.',
    erreurs: {
      demarrage: 'Le C de CSIR veut dire « capacitor » : il y a un condensateur, celui de démarrage.',
      permanent: 'Le CSIR n’a pas de condensateur permanent. Le montage qui ajoute un permanent au CSIR, c’est le CSR.',
      relais: 'Le condensateur de démarrage ne peut pas rester en service : un relais d’intensité le retire après le lancement.'
    }
  },

  cablage: [
    "Le protecteur thermique est <strong>en série</strong> sur l’alimentation du moteur : tout le courant du compresseur le traverse.",
    "Le relais de démarrage et les condensateurs se raccordent entre les bornes du compresseur, selon le schéma de son montage. Ces schémas sont aux stations 9.3 et 9.4.",
    "Un condensateur reste <strong>chargé</strong> après la coupure. On le décharge avant d’y toucher, avec une résistance. La station 9.5 donne la méthode."
  ],
  piege: "Un compresseur prévu pour un capillaire, monté sur une installation à détendeur thermostatique, peut ne plus redémarrer : les pressions ne s’égalisent pas à l’arrêt, et son montage n’a pas le couple pour partir en charge. Il faut un montage à condensateur de démarrage, CSIR ou CSR.",

  symboles: [
    { src: 'assets/moteur_mono1.svg', alt: "Symbole normalisé d’un moteur monophasé : un rond avec M et 1 ~, deux fils qui arrivent.", legende: "Moteur monophasé" },
    { src: 'assets/motor-mono-cond.svg', alt: "Symbole normalisé d’un moteur monophasé avec son condensateur.", legende: "Avec condensateur" },
    { src: 'assets/condensateur.svg', alt: "Symbole normalisé du condensateur : deux traits parallèles qui ne se touchent pas.", legende: "Condensateur" },
    { src: 'assets/ctp.svg', alt: "Symbole d’une résistance CTP : un rectangle de résistance marqué de la lettre T.", legende: "CTP" },
    { src: 'assets/clixon.svg', alt: "Symbole du protecteur thermique Klixon.", legende: "Protecteur thermique" }
  ],
  lecturePlan: [
    "Le moteur monophasé est un <strong>rond marqué M</strong> et 1 ~. Sur le schéma du constructeur, le moteur du compresseur montre ses trois bornes, C, S et R.",
    "Le <strong>condensateur</strong> est formé de deux traits parallèles. Sa capacité en microfarads est écrite à côté.",
    "La <strong>CTP</strong> se dessine comme une résistance, un rectangle, marqué de la lettre T.",
    "Le sigle du montage, RSIR, CSIR, PSC ou CSR, est souvent écrit au-dessus du schéma du constructeur."
  ],

  tableau: () => tableauMontages91(),
  tableauTitre: 'Les quatre montages du compresseur',

  quiz: [
    { question: "Une chambre froide a un groupe de condensation en 230 V : un compresseur et un condenseur à un ventilateur. Son évaporateur a un ventilateur. Combien de moteurs tournent ?",
      confirmation: "Trois : le compresseur, le ventilateur du condenseur, le ventilateur de l’évaporateur.",
      reponses: [
        { texte: "Un seul, celui du compresseur.", pourquoi: "Les deux ventilateurs ont aussi leur moteur." },
        { texte: "Trois : compresseur et deux ventilateurs.", juste: true },
        { texte: "Deux : le compresseur et un ventilateur.", pourquoi: "Le condenseur et l’évaporateur ont chacun leur ventilateur." },
        { texte: "Aucun : un groupe frigorifique est en triphasé.", pourquoi: "Ce groupe est alimenté en 230 V : ses moteurs sont monophasés." } ] },

    { question: "Quel montage n’a aucun condensateur ?",
      confirmation: "Le RSIR : le relais d’intensité ou la CTP retire l’auxiliaire, sans condensateur.",
      reponses: [
        { texte: "Le PSC.", pourquoi: "Le PSC a un condensateur permanent." },
        { texte: "Le CSR.", pourquoi: "Le CSR en a deux, un de démarrage et un permanent." },
        { texte: "Le RSIR.", juste: true },
        { texte: "Le CSIR.", pourquoi: "Le CSIR a un condensateur de démarrage." } ] },

    { question: "Quel montage n’a aucun organe de démarrage, ni relais, ni CTP ?",
      confirmation: "Le PSC : son condensateur permanent reste en service, il n’y a rien à retirer.",
      reponses: [
        { texte: "Le PSC.", juste: true },
        { texte: "Le RSIR.", pourquoi: "Le RSIR a un relais d’intensité ou une CTP." },
        { texte: "Le CSIR.", pourquoi: "Le CSIR a un relais d’intensité qui retire le condensateur de démarrage." },
        { texte: "Le CSR.", pourquoi: "Le CSR a un relais de tension." } ] },

    { question: "Une chambre froide a un détendeur thermostatique. Quel montage convient au compresseur ?",
      confirmation: "Un montage à condensateur de démarrage, CSIR ou CSR : les pressions ne s’égalisent pas à l’arrêt, le compresseur doit partir en charge.",
      reponses: [
        { texte: "RSIR.", pourquoi: "Son couple au démarrage est faible : le tableau le réserve au capillaire." },
        { texte: "PSC.", pourquoi: "Son couple au démarrage est faible : le tableau le réserve au capillaire." },
        { texte: "CSIR ou CSR.", juste: true },
        { texte: "N’importe lequel.", pourquoi: "Le montage dépend du couple qu’il faut au démarrage." } ] }
  ],

  retenir: [
    "Dans une installation en 230 V, le compresseur, les ventilateurs et la turbine ont chacun un moteur, le plus souvent un <strong>moteur monophasé</strong>.",
    "Le compresseur a trois bornes : <strong>C</strong> commun, <strong>S</strong> démarrage, <strong>R</strong> marche.",
    "Quatre montages : <strong>RSIR</strong> et <strong>PSC</strong> pour un capillaire, <strong>CSIR</strong> et <strong>CSR</strong> pour partir en charge.",
    "On décharge un condensateur avant d’y toucher."
  ],

  objectifs: '<p><strong>Objectif.</strong> Repérer les moteurs monophasés d’une installation frigorifique, et reconnaître les quatre montages de démarrage du compresseur à leur sigle.</p><p><strong>Limite.</strong> Les schémas de câblage, le repérage des bornes à l’ohmmètre et le dépannage sont traités dans les stations 9.2 à 9.5.</p>',
  credits: [
    { quoi: 'Symboles', source: 'bibliothèque de symboles inerWeb',
      detail: 'symboles EN 60617 et frigorifiques, issus de QElectroTech, assemblés sans être redessinés' },
    { quoi: 'Les quatre montages', source: 'Tecumseh Europe, annexes « Types de moteurs, appareillage électrique »',
      detail: 'et cours du fonds inerWeb « Moteurs monophasés »' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.5 Le moteur monophasé" } ]
});

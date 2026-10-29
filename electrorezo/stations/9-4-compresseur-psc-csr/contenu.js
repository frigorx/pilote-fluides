/* ÉlectroRézo 9.4 : Compresseur PSC, CSR, le condensateur permanent et le relais de tension.
   Les deux schémas sont construits dans QElectroTech (schemas-ligne-9/construire-montages.py)
   et convertis en SVG : rien n’est dessiné ici. Faits : voir SOURCES.md. */

/* Les deux montages, dans l’ordre du temps 2 : PSC, puis CSR. */
const MONTAGES_9_4 = [
  { src: 'assets/montage-psc.svg',
    alt: "Schéma du PSC. L’alimentation L passe par le Klixon et arrive à la borne C du compresseur. Le principal va à la borne R, puis au neutre N. L’auxiliaire va à la borne S, puis au condensateur permanent Cp, puis au neutre N. Il n’y a ni bobine ni contact.",
    titre: "PSC.", sous: "Un seul condensateur, Cp, en série avec l’auxiliaire. Il reste en service. Aucun relais." },
  { src: 'assets/montage-csr.svg',
    alt: "Schéma du CSR. Le principal va à la borne R, puis au retour N. L’auxiliaire va à la borne S. De la borne S partent deux branches vers le retour : le condensateur permanent Cp, et le contact KA, fermé au repos, suivi du condensateur de démarrage Cd. La bobine KA du relais de tension, à droite et hors du cadre « le compresseur », est branchée entre les bornes S et C.",
    titre: "CSR.", sous: "Le condensateur permanent Cp reste. Le contact KA, fermé au repos, retire le condensateur de démarrage Cd. La bobine KA est branchée entre S et C." }
];

function enchainement94() {
  const bande = document.createElement('div');
  bande.className = 'bande-visuelle';
  MONTAGES_9_4.forEach(m => {
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

/* Un schéma de MONTAGES_9_4 posé là où la consigne ou la question le fait lire (temps 3, 4 et 5), avec une
   légende qui ne répond pas. Il porte la loupe de la bande : un clic l'ouvre en grand. */
function vignette94(i, legende, complement) {
  const f = document.createElement('figure');
  f.className = 'vignette';
  const im = document.createElement('img');
  im.src = MONTAGES_9_4[i].src; im.alt = MONTAGES_9_4[i].alt; im.loading = 'lazy';
  f.appendChild(im);
  const c = document.createElement('figcaption');
  const s = document.createElement('strong');
  s.textContent = legende;
  c.appendChild(s);
  if (complement) c.appendChild(document.createTextNode(' ' + complement));
  f.appendChild(c);
  return f;
}
function bandeSchemas94(liste) {
  const bande = document.createElement('div');
  bande.className = 'bande-visuelle';
  liste.forEach(([i, legende, complement]) => bande.appendChild(vignette94(i, legende, complement)));
  return bande;
}
/* La même vignette en HTML, pour le texte de « Le lire sur un plan ». L'étiquette est écrite IMG en capitales
   à dessein : le modèle ajoute « retour du neutre en orange » dès qu'il voit <img, et ces schémas sont en noir. */
const schemaPlan94 = (i, legende) => '<figure class="vignette" style="max-width:340px;margin:.2rem auto"><IMG src="' +
  MONTAGES_9_4[i].src + '" alt="' + MONTAGES_9_4[i].alt + '"><figcaption><strong>' + legende + '</strong></figcaption></figure>';

/* Le récapitulatif du temps 5. */
const LIGNES_9_4 = [
  ['PSC', 'un seul, permanent (de marche)', 'aucun relais : le condensateur permanent donne le coup de pouce du démarrage', 'un coup de pouce, pour un couple résistant peu important', 'meilleur : l’auxiliaire reste alimenté au travers du condensateur', 'capillaire : les pressions s’égalisent à l’arrêt'],
  ['CSR', 'deux : un de démarrage et un permanent, en parallèle au démarrage', 'le relais de tension, qui retire le condensateur de démarrage', 'important', 'important', 'capillaire ou détendeur thermostatique : un montage pour couple résistant important']
];

function tableau94() {
  const boite = document.createElement('div');
  boite.style.overflowX = 'auto';
  /* sur téléphone, le tableau défile seul : sans ces deux lignes, il élargit toute la colonne, et le rappel,
     les schémas et les questions sortent de l'écran à droite */
  boite.style.width = '0'; boite.style.minWidth = '100%';
  const t = document.createElement('table');
  t.className = 'tab';
  t.innerHTML = '<thead><tr><th>Montage</th><th>Condensateurs</th><th>Organe de démarrage</th>' +
    '<th>Couple au démarrage</th><th>Couple en marche</th><th>Détente</th></tr></thead><tbody>' +
    LIGNES_9_4.map(([m, c, o, d, k, p]) =>
      '<tr><td><strong>' + m + '</strong></td><td>' + c + '</td><td>' + o + '</td><td>' + d + '</td><td>' + k + '</td><td>' + p + '</td></tr>'
    ).join('') + '</tbody>';
  boite.appendChild(t);
  const l = document.createElement('p');
  l.className = 'legende';
  l.textContent = 'Au démarrage du CSR, les deux condensateurs sont en parallèle : leurs capacités s’additionnent. Le condensateur de démarrage est ensuite éliminé, et l’auxiliaire reste alimenté au travers du condensateur permanent.';
  boite.appendChild(l);
  /* la question sur le relais trop petit ou trop gros s'appuie sur ce rappel, repris de l'encadré du temps 3 */
  const r = document.createElement('p');
  r.className = 'legende';
  r.textContent = 'Relais de tension trop petit : il colle à une tension trop basse, dès la mise sous tension. Relais de tension trop gros : il colle à une tension que l’auxiliaire n’atteint jamais, son contact reste fermé.';
  boite.appendChild(r);
  /* les questions lisent le schéma du PSC et celui du CSR : ils sont posés ici, sous le tableau */
  boite.appendChild(bandeSchemas94([[0, 'Schéma du PSC.'], [1, 'Schéma du CSR.']]));
  return boite;
}

ModeleAppareil.construire({
  id: '9.4', ligne: 9,
  vue3d: { modele: 'condensateurs' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 4',
  titre: "Compresseur PSC, CSR : le condensateur permanent",
  narration: NARRATION,

  prerequis: [
    { id: '9.3', quoi: "le relais d’intensité" }
  ],

  photos: [
    { src: 'assets/montage-psc.svg',
      alt: MONTAGES_9_4[0].alt,
      titre: "Le PSC.", sous: "Un seul condensateur, Cp, permanent, en série avec l’auxiliaire. Pas de relais de démarrage." },
    { src: 'assets/montage-csr.svg',
      alt: MONTAGES_9_4[1].alt,
      titre: "Le CSR.", sous: "Cp reste en service. Un contact KA et un condensateur de démarrage Cd s’y ajoutent. La bobine KA est dans le relais de tension." }
  ],
  creditPhoto: 'Schémas construits dans QElectroTech. Détail dans « Crédits ».',

  aQuoiCaSert: "Dans le <strong>PSC</strong>, un condensateur permanent donne le coup de pouce du démarrage, puis reste en service. Le <strong>CSR</strong> ajoute un condensateur de démarrage. Un <strong>relais de tension</strong> le retire quand le moteur a pris de la vitesse.",
  ouOnLeTrouve: "Le PSC équipe les petits moteurs dont le couple demandé est peu important : petits compresseurs à capillaire, ventilateurs de petits climatiseurs. Le relais de tension s’emploie quand la puissance dépasse environ 600 W. Le PSC est du niveau CAP. Le CSR et son relais vont jusqu’au Bac pro.",

  scene: () => enchainement94(),

  technologie: [
    ["Le condensateur permanent", "on l’appelle aussi condensateur de <strong>marche</strong>. Il reste sous tension en permanence, en série avec l’auxiliaire. Il est conçu pour ne pas chauffer exagérément. C’est un condensateur au papier, de faible capacité (rarement plus d’une trentaine de µF) et de grandes dimensions. Sur les schémas, il porte le repère Cp."],
    ["Le PSC", "un seul condensateur, permanent, et aucun relais de démarrage. À la mise sous tension, le condensateur permanent donne le coup de pouce du démarrage. Moteur lancé, l’auxiliaire reste sous tension, en série avec le condensateur : l’intensité reste limitée et le couple en fonctionnement est meilleur."],
    ["Le CSR", "un condensateur de démarrage Cd, avec une résistance de décharge, un condensateur permanent Cp externe, et un relais de tension. Au démarrage, Cd et Cp sont <strong>en parallèle</strong> : leurs capacités s’additionnent. Le couple de démarrage est important. Démarrage fini, Cd est éliminé. L’auxiliaire reste alimenté au travers de Cp, et le couple en marche reste important."],
    ["Le relais de tension", "sa bobine est très résistante, car elle est faite d’un long fil très fin. Elle est branchée sur l’auxiliaire, entre S et C. Son contact est <strong>fermé au repos</strong>. À la mise sous tension, le courant traverse le Klixon et le principal. Il traverse aussi l’auxiliaire, le contact fermé et le condensateur de démarrage : le moteur démarre."],
    ["Quand la bobine colle", "en prenant de la vitesse, le moteur fait monter la tension aux bornes de l’auxiliaire. Quand cette tension dépasse celle du réseau d’une valeur fixée par le constructeur, la bobine colle. Le contact s’ouvre et retire le condensateur de démarrage. La bobine reste alimentée par cette tension. En Bac pro : cette tension est induite par le moteur et s’ajoute à celle du réseau. En fin de démarrage, elle peut atteindre 400 V pour une alimentation de 220 V."],
    ["Vitesse ou intensité", "le relais de tension réagit à la vitesse du moteur. Une surcharge, avec une haute pression qui monte, ne referme pas son contact : le condensateur de démarrage n’est pas remis en service. Dans un RSIR ou un CSIR (station 9.3), un relais d’intensité, lui, pouvait remettre l’auxiliaire en service sur une surcharge."],
    ["Le contrôle du relais", "sur un modèle courant, boîtier noir, les bornes utiles sont <strong>1, 2 et 5</strong>. La borne 4 sert seulement au câblage. Hors tension, après consignation, l’ohmmètre indique 0 Ω entre 1 et 2 : c’est le contact. Il indique par exemple 8 500 Ω entre 1 et 5, et entre 2 et 5 : c’est la bobine. Sur les schémas de la station, le relais porte le repère KA, sans ces numéros : la borne 2 est du côté de S, la borne 1 du côté de Cd, la borne 5 du côté de C. En Bac pro : une pince ampèremétrique sur le fil de l’auxiliaire et du condensateur de démarrage donne une forte intensité au démarrage, puis plus rien quand le contact s’est ouvert."]
  ],

  variantes: [
    "<strong>PSC</strong> : un condensateur permanent, aucun relais. Le couple de démarrage est un coup de pouce, adapté à un couple résistant peu important. Les pressions doivent s’égaliser à l’arrêt : capillaire.",
    "<strong>CSR</strong> : le condensateur permanent Cp et, au démarrage, un condensateur de démarrage Cd en parallèle avec lui. Le relais de tension retire Cd. Couple de démarrage et couple en marche importants. En Bac pro : débrancher le condensateur de marche fait monter l’intensité totale, et le compresseur devient souvent plus bruyant.",
    "<strong>Relais de tension ou relais d’intensité</strong> : le relais d’intensité réagit à l’intensité et sert jusqu’à environ 600 W. Au-delà, sa bobine devrait être trop grosse. On emploie alors le relais de tension, qui réagit à la vitesse."
  ],
  reglage: "Rien ne se règle. Un relais de tension se remplace par un relais de <strong>même référence</strong>. Quand on change un compresseur, on change aussi ses pièces de démarrage : relais et condensateurs.",

  /* temps 3 : les deux schémas de la consigne, sous elle (D.picto) : plus de renvoi au temps 1 */
  picto: () => ({
    element: bandeSchemas94([[0, 'PSC.', 'Exemple résolu.'], [1, 'CSR.', 'À vous maintenant.']]),
    marquer: () => {}
  }),
  colonnes: [
    { id: 'permanent', libelle: 'Un condensateur permanent', aide: 'il reste en série avec l’auxiliaire' },
    { id: 'demarrage', libelle: 'Un condensateur de démarrage', aide: 'il est retiré en fin de démarrage' },
    { id: 'relais', libelle: 'Un relais de tension', aide: 'une bobine sur l’auxiliaire, un contact fermé au repos' }
  ],
  consigneAptitudes: 'Exemple résolu. Sur le premier schéma, « PSC », on lit un seul condensateur, Cp, sur l’auxiliaire : il porte un condensateur permanent. Il n’a ni condensateur de démarrage ni relais. À vous maintenant. Un compresseur est un CSR. Regardez le second schéma, « CSR ». Cherchez les condensateurs Cp et Cd, puis la bobine KA et son contact. Cochez ce que ce compresseur porte, puis validez.',
  aptitudes: {
    permanent: true, demarrage: true, relais: true,
    bonneReponse: 'Juste. Le CSR porte un condensateur permanent Cp, un condensateur de démarrage Cd et un relais de tension. Le relais retire Cd quand le moteur a pris de la vitesse. Cp reste en service.',
    erreurs: {
      permanent: 'Sur le schéma « CSR », juste au-dessus des cases, Cp est entre la borne S et le retour. Il reste en service tant que le moteur tourne.',
      demarrage: 'Sur le schéma « CSR », juste au-dessus des cases, Cd est sur la branche du contact KA, après le contact. Le relais de tension le retire en fin de démarrage.',
      relais: 'Sur le schéma « CSR », juste au-dessus des cases, la bobine KA est hors du cadre, à droite, et le contact KA est sur la branche de Cd. Les deux forment le relais de tension.'
    }
  },

  cablage: [
    "Un condensateur permanent <strong>Cp</strong> se branche entre la borne S et le retour. Il y reste en permanence.",
    "Avec un relais de tension, le <strong>contact du relais</strong>, fermé au repos, vient en premier sur la branche du condensateur de démarrage. Le condensateur de démarrage Cd vient après lui.",
    "La bobine d’un relais de tension se branche <strong>entre S et C</strong>, sur l’auxiliaire.",
    "Cd n’est jamais branché entre la borne 2 du relais et l’auxiliaire. Il se branche entre la borne 1 et le côté principal.",
    "Un condensateur reste <strong>chargé</strong> après la coupure. On décharge Cp et Cd avant d’y toucher, avec une résistance. Certains ont une résistance de décharge, d’environ 15 kΩ, entre leurs bornes. La décharge n’est pas instantanée, elle peut prendre quelques minutes : on décharge quand même.",
    "Le Klixon est en série sur la borne C, comme sur les schémas. Toute mesure se fait hors tension, après consignation."
  ],
  piege: "Un relais de tension mal adapté donne deux pannes. Relais trop petit (il colle à une tension trop basse) : il colle dès la mise sous tension, le moteur ne démarre pas, il grogne et les sécurités thermiques coupent. Relais trop gros (il colle à une tension que l’auxiliaire n’atteint jamais) : son contact reste fermé, le condensateur de démarrage reste en service, l’intensité est exagérée, et les protections thermiques coupent ou le moteur grille. Cd, toujours sous tension, chauffe et risque de lâcher. Contact coupé : mêmes signes que le relais trop petit. Contacts soudés ou bobine coupée : mêmes signes que le relais trop gros. Remplacez par un relais de même référence.",

  symboles: [
    { src: 'assets/bobine-relais.svg', alt: "Symbole de la bobine d’un relais : un rectangle, avec un fil qui arrive en haut et un fil qui repart en bas.", legende: "Bobine du relais (KA)" },
    { src: 'assets/contact-repos.svg', alt: "Symbole d’un contact à ouverture à commande électromagnétique : un trait oblique qui touche la petite barre du fil du haut, donc fermé au repos, relié par un pointillé à un petit arc de cercle.", legende: "Contact fermé au repos (KA)" },
    { src: 'assets/condensateur.svg', alt: "Symbole normalisé du condensateur : deux traits parallèles qui ne se touchent pas.", legende: "Condensateur (Cp, Cd)" },
    { src: 'assets/clixon.svg', alt: "Symbole du protecteur thermique Klixon : un cercle traversé par un trait brisé.", legende: "Klixon" }
  ],
  lecturePlan: [
    schemaPlan94(1, 'Schéma du CSR.'),
    "Sur le schéma du CSR, juste au-dessus, lisez de haut en bas : l’alimentation <strong>L</strong>, le Klixon, la borne <strong>C</strong>. Le fil se partage ensuite en deux branches. Un clic sur le schéma l’agrandit.",
    "À gauche, le <strong>principal</strong> : la borne R, puis le retour N. À droite, l’<strong>auxiliaire</strong> : la borne S. Sous S, le fil se partage encore en deux branches.",
    "Sur la première branche, le condensateur permanent <strong>Cp</strong>, qui va vers le retour. Sur la seconde, le contact <strong>KA</strong>, puis le condensateur de démarrage <strong>Cd</strong>, qui va vers le retour.",
    "Le contact KA est dessiné <strong>fermé au repos</strong> : le trait oblique touche la barre du haut. Au démarrage, le courant passe donc par lui jusqu’à Cd.",
    "La bobine KA est à droite, <strong>hors du cadre</strong> « le compresseur ». Elle est branchée entre S et C. La bobine et le contact portent le même repère KA : ils forment un seul relais.",
    schemaPlan94(0, 'Schéma du PSC.'),
    "Sur le schéma du PSC, juste au-dessus, cherchez Cp : un seul condensateur sur l’auxiliaire, sans bobine ni contact."
  ],

  tableau: () => tableau94(),
  tableauTitre: 'PSC, CSR',

  quiz: [
    { question: "Sur le schéma du PSC, juste au-dessus des questions, suivez le fil à partir de la borne S. Que trouve-t-on sur la branche de l’auxiliaire ?",
      confirmation: "Un seul condensateur, Cp, entre la borne S et le retour N. Il reste en service. Il n’y a ni bobine ni contact.",
      reponses: [
        { texte: "Un condensateur permanent Cp, et rien d’autre.", juste: true },
        { texte: "Un contact KA, puis un condensateur Cd.", pourquoi: "Ce montage est celui du CSR. Sur le schéma du PSC, la branche de l’auxiliaire ne porte que Cp." },
        { texte: "Une bobine KA.", pourquoi: "Le PSC n’a aucun relais. Il n’y a pas de bobine KA sur son schéma." } ] },

    { question: "Sur le schéma du CSR, juste au-dessus des questions, en partant de la borne S, dans quel ordre le courant traverse-t-il la branche du condensateur de démarrage ?",
      confirmation: "D’abord le contact KA, puis le condensateur Cd. Quand le contact s’ouvre, Cd est retiré.",
      reponses: [
        { texte: "Le condensateur Cd, puis le contact KA.", pourquoi: "Sur le schéma, le contact KA est le premier, juste sous la borne S. Cd vient après lui." },
        { texte: "Le contact KA, puis le condensateur Cd.", juste: true },
        { texte: "Le condensateur Cp, puis le condensateur Cd.", pourquoi: "Cp est sur une autre branche, directement entre S et le retour." } ] },

    { question: "Le compresseur d’un CSR vient d’être mis sous tension. La carte « Ce qu’il faut retenir » décrit le relais de tension. Dans quel état est le contact du relais ?",
      confirmation: "Fermé. Le courant traverse l’auxiliaire, le contact et le condensateur de démarrage : le moteur démarre.",
      reponses: [
        { texte: "Ouvert, comme le contact du relais d’intensité de la station 9.3.", pourquoi: "Le contact du relais de tension est fermé au repos. S’il était ouvert, le condensateur de démarrage ne serait pas alimenté." },
        { texte: "Fermé.", juste: true },
        { texte: "Il attend que l’intensité monte.", pourquoi: "Le relais de tension réagit à la tension de l’auxiliaire, qui monte avec la vitesse du moteur." } ] },

    { question: "Un compresseur en CSR ne démarre pas, il grogne, puis les sécurités thermiques coupent. Le relais de tension colle dès la mise sous tension. Sous le tableau, le rappel dit ce que donne un relais de tension trop petit et un relais trop gros. Quel est le défaut ?",
      confirmation: "Le relais est trop petit : il colle trop tôt et retire le condensateur de démarrage dès le début. Un contact coupé donne les mêmes signes. On remplace par un relais de même référence.",
      reponses: [
        { texte: "Le relais est trop gros.", pourquoi: "Un relais trop gros ne colle jamais : l’auxiliaire reste alimenté en permanence. Ici, il colle dès la mise sous tension." },
        { texte: "Le relais est trop petit.", juste: true },
        { texte: "Rien d’anormal : un CSR grogne toujours au démarrage.", pourquoi: "Un CSR a un couple de démarrage important. Un moteur qui grogne puis coupe est en panne." } ] }
  ],

  retenir: [
    "Le <strong>PSC</strong> a un seul condensateur, permanent, en série avec l’auxiliaire, et aucun relais. Il convient aux petits moteurs dont le couple demandé est peu important.",
    "Le <strong>CSR</strong> ajoute un condensateur de démarrage Cd. Au démarrage, Cd et Cp sont en parallèle : leurs capacités s’additionnent. Le couple de démarrage et le couple en marche sont importants.",
    "Le relais de tension a une bobine très résistante sur l’auxiliaire et un contact <strong>fermé au repos</strong>. La bobine colle quand la tension de l’auxiliaire monte avec la vitesse. Le contact s’ouvre et retire Cd.",
    "Cd se branche après le contact du relais. Un relais trop petit ou trop gros empêche le moteur de démarrer ou le fait chauffer. On le remplace par un relais de même référence.",
    "Un condensateur se décharge avec une résistance avant qu’on y touche."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire le schéma du PSC et du CSR, dire à quoi sert chaque condensateur, et dire ce que fait le relais de tension à chaque instant du démarrage.</p><p><strong>Limite.</strong> Le relais d’intensité, la CTP et le condensateur de démarrage sont à la station 9.3. Le Klixon, le test du condensateur et le dépannage sont à la station 9.5. Le PSC est du niveau CAP. Le CSR et le relais de tension vont jusqu’au Bac pro : les phrases « En Bac pro » sont pour ce niveau.</p>',
  credits: [
    { quoi: 'Schémas des montages', source: 'construits dans QElectroTech',
      detail: 'les montages sont assemblés par script avec des symboles de QElectroTech, puis convertis en SVG' },
    { quoi: 'Symboles', source: 'bibliothèque de symboles QElectroTech',
      detail: 'bobine, contact, condensateur et Klixon, repris sans être redessinés' },
    { quoi: 'Fonctionnement du condensateur permanent et du relais de tension', source: 'cours du fonds inerWeb « Moteurs monophasés »',
      detail: 'Bac pro MFER, et cours « Les moteurs »' },
    { quoi: 'Les montages PSC et CSR', source: 'Tecumseh Europe, annexes « Types de moteurs, appareillage électrique »',
      detail: 'sigles et pièces de chaque montage' } ],

  correspondances: [
    { ligne: 9, couleur: '#a16207', texte: "9.3 Compresseur RSIR, CSIR" },
    { ligne: 9, couleur: '#a16207', texte: "9.1 Qui fait tourner quoi" },
    { ligne: 6, couleur: '#c9451a', texte: "6.5 Le moteur monophasé" } ]
});

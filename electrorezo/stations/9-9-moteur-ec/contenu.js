/* ÉlectroRézo 9.9 : Moteur EC, la vitesse par un signal.
   Le schéma du temps 1 est construit dans QElectroTech (schemas-ligne-9/construire-lot3.py)
   et converti en SVG. Les deux schémas du temps 2 sont des recadrages de la notice d'un
   ventilo-convecteur (assets/biblio/). Rien n’est dessiné ici. Faits : voir SOURCES.md. */

/* Le schéma du temps 1, avec son texte alternatif. */
const ALT_EC_9_9 = "Schéma du câblage d’un ventilo-convecteur à moteur EC, en trois cadres, de haut en bas. Dans le cadre du haut, le régulateur : quatre fils en partent, L 230 V alternatif, N, 0..10 V et GND. Un cinquième fil, PE, vert et jaune, passe à gauche du cadre. Au milieu, le bornier X1 porte cinq bornes : PE, puis 1 pour L, 2 pour N, 3 pour 0..10 V et 4 pour GND. En bas, dans le cadre du moto-ventilateur EC, les cinq fils arrivent sur un bloc légendé INV, qui est l’électronique du moteur. Le moteur, un rond M 1~, est sous ce bloc. Aucun condensateur n’est dessiné. Aucun fil ne porte de vitesse.";

/* Les deux schémas de la notice, dans l’ordre du temps 2 : version AC, puis version EC. */
const SCHEMAS_9_9 = [
  { src: 'assets/biblio/aquavent-cablage-moteur-ac.png',
    alt: "Câblage d’un ventilo-convecteur à moteur AC, page 6 de la notice. Un thermostat choisit la vitesse. Le fil commun Com et trois fils de vitesse, Max, Med et Min, vont du bornier X1 de l’unité au moto-ventilateur MV, en passant par un bloc X2. Un condensateur C est dessiné contre le moteur. La terre PE est reliée au moteur.",
    titre: "Version AC, page 6 de la notice.", sous: "Le moteur MV porte un condensateur C. Le fil commun Com et les trois fils de vitesse Max, Med et Min servent à choisir la vitesse." },
  { src: 'assets/biblio/aquavent-cablage-moteur-ec.png',
    alt: "Câblage du même ventilo-convecteur à moteur EC, page 10 de la notice. Le régulateur envoie L, N, un signal 0..10 VDC et GND au bornier X1 de l’unité. La terre PE y arrive aussi. Du bornier, ces fils vont au moto-ventilateur MV, dessiné avec un bloc INV contre le moteur. Aucun condensateur n’est dessiné, ni aucun fil de vitesse. Deux autres fils, COM et On, vont à une vanne et ne touchent pas le moteur.",
    titre: "Version EC, page 10 de la notice.", sous: "Le régulateur envoie L, N, le signal 0..10 V et GND. Le moteur MV porte un bloc INV. Il n’y a plus de fil de vitesse." }
];

function enchainement99() {
  const bande = document.createElement('div');
  bande.className = 'bande-visuelle';
  SCHEMAS_9_9.forEach(m => {
    const f = document.createElement('figure');
    f.className = 'vignette';
    f.style.flex = '1 1 100%';
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

/* Le récapitulatif du temps 5 : les deux versions de la même notice. */
const LIGNES_9_9 = [
  ['Moteur AC, page 6', '230 V monophasé', 'oui, dessiné contre le moteur', 'un commutateur et un autotransformateur : trois vitesses sur six', 'Com, Max, Med, Min et la terre'],
  ['Moteur EC, page 10', '230 V monophasé, plus ou moins 5 %, par L et N', 'aucun dessiné', 'un signal 0..10 V donné par le régulateur, commande proportionnelle', '0..10 V et GND, avec L, N et PE']
];

function tableau99() {
  const boite = document.createElement('div');
  boite.style.overflowX = 'auto';
  const t = document.createElement('table');
  t.className = 'tab';
  t.innerHTML = '<thead><tr><th>Moteur</th><th>Alimentation</th><th>Condensateur</th>' +
    '<th>Vitesse choisie par</th><th>Fils au bornier</th></tr></thead><tbody>' +
    LIGNES_9_9.map(([m, a, c, v, f]) =>
      '<tr><td><strong>' + m + '</strong></td><td>' + a + '</td><td>' + c + '</td><td>' + v + '</td><td>' + f + '</td></tr>'
    ).join('') + '</tbody>';
  boite.appendChild(t);
  const l = document.createElement('p');
  l.className = 'legende';
  l.textContent = 'Les deux lignes viennent de la même notice. Sur la version EC, la vitesse suit le signal : il n’y a ni commutateur de vitesse ni autotransformateur.';
  boite.appendChild(l);
  return boite;
}

ModeleAppareil.construire({
  id: '9.9', ligne: 9,
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 9',
  titre: "Moteur EC : la vitesse par un signal",
  narration: NARRATION,

  prerequis: [
    { id: '9.7', quoi: "les vitesses d’un moteur à condensateur" },
    { id: '7.4', quoi: "la consigne de vitesse d’un variateur" }
  ],

  photos: [
    { src: 'assets/cablage-ec.svg',
      alt: ALT_EC_9_9,
      titre: "Le câblage EC.", sous: "Le régulateur en haut, le bornier X1 au milieu, le moto-ventilateur en bas. Cinq fils arrivent au bornier." }
  ],
  creditPhoto: 'Schéma construit dans QElectroTech, d’après la notice d’un ventilo-convecteur. Détail dans « Crédits ».',

  aQuoiCaSert: "Un moteur <strong>EC</strong>, ou moteur à commutation électronique, entraîne le ventilateur d’un ventilo-convecteur, d’un évaporateur ou d’un condenseur. Sa vitesse suit un signal de 0 à 10 V, donné par un régulateur. Un moteur à condensateur choisit sa vitesse par un commutateur et un autotransformateur. Le moteur EC n’a ni l’un ni l’autre.",
  ouOnLeTrouve: "La notice d’un ventilo-convecteur le propose en version AC, à condensateur, ou en version EC. Le catalogue d’un évaporateur le donne en option. Un catalogue de groupes de condensation le cite sur une de ses plateformes. Le moteur EC est donc une variante ou une option, selon le modèle. Cette station est du niveau Bac pro. En CAP : reconnaissez le moteur EC à ses fils au bornier X1 (PE, L, N, 0..10 V et GND), sans fil de vitesse et sans condensateur dessiné.",

  scene: () => enchainement99(),

  technologie: [
    ["Le nom EC", "EC veut dire <strong>commutation électronique</strong>. La notice d’un ventilo-convecteur parle d’un moteur EC à commande 0..10 V proportionnelle. Ce moteur porte une protection thermique incorporée."],
    ["L’alimentation", "Le moteur EC de la notice s’alimente en <strong>230 V monophasé</strong>, avec une tolérance de plus ou moins 5 %. Le courant arrive par L, la phase, et N, le neutre, avec la terre PE. La notice demande une protection par un disjoncteur adapté."],
    ["Le signal de commande", "La vitesse suit un <strong>signal 0..10 V</strong>. C’est une tension continue, comprise entre 0 et 10 volts. La commande est proportionnelle : la vitesse suit le signal. Le régulateur donne ce signal. Il n’est pas dans l’appareil : l’installateur le pose. Un variateur de fréquence reçoit lui aussi, en général, sa consigne de vitesse en tension de 0 à 10 V (station 7.4)."],
    ["Le bornier X1", "Sur le schéma du temps 1, cinq fils arrivent au bornier X1 : PE, L, N, 0..10 V et GND. Le régulateur fournit L, N, 0..10 V et GND. Le fil PE, vert et jaune, ne part pas de lui. Sur la notice, deux autres fils du bornier, COM et On, vont à une vanne. Le schéma du temps 1 ne les dessine pas."],
    ["L’électronique du moteur", "Sur le schéma, le moto-ventilateur est repéré MV. Un bloc INV est dessiné contre le moteur : c’est l’<strong>électronique du moteur</strong>. La notice le légende « inverter ». Le moteur lui-même est dessiné avec le symbole M 1~ du moteur monophasé. Aucun condensateur n’est dessiné près de lui."],
    ["Le moteur AC de la même notice", "La version AC a un moteur monophasé 230 V avec condensateur. Six vitesses sont disponibles dans le moteur, et trois sont connectées au commutateur. Un autotransformateur offre le choix de trois vitesses sur six. Son schéma porte un condensateur C, le fil commun Com et trois fils de vitesse, Max, Med et Min. La version EC n’a rien de tout cela : la vitesse vient du signal."],
    ["Sur un groupe de condensation", "Sur le schéma d’un groupe de condensation, le condenseur standard a un moteur à deux fils. Le condenseur EC monophasé a un moteur dessiné avec le même symbole M 1~, mais raccordé par quatre fils, repérés PH, N, 10V et 0V. Comme L et N au bornier X1, PH et N sont la phase et le neutre : ils amènent le 230 V."],
    ["Sur les circulateurs", "Les notices de circulateurs, qui sont des pompes, décrivent un moteur EC à rotor à <strong>aimants permanents</strong>. L’électronique commute les bobines du stator : elle change leur polarité selon le besoin. Un circulateur à moteur EC peut aussi recevoir un signal de commande extérieur 0-10 V, en option. Cette description vient des notices de circulateurs. Les notices de ventilateurs de cette station ne parlent pas d’aimants."],
    ["Contrôle et dépannage", "Pour le contrôle et le dépannage du moteur EC, la notice demande de se référer obligatoirement au manuel du régulateur. Cette station ne donne aucune mesure ni aucune panne du moteur EC."]
  ],

  variantes: [
    "<strong>Variante</strong> : la notice d’un ventilo-convecteur donne chaque modèle en moteur AC ou en moteur EC. Les deux versions ont chacune leur schéma de câblage, aux pages 6 et 10.",
    "<strong>Option</strong> : le catalogue d’un évaporateur propose des moteurs EC en option. Il annonce une optimisation du niveau sonore et de la consommation électrique, sans donner de chiffre.",
    "<strong>Groupe de condensation</strong> : un catalogue cite des moto-ventilateurs AC et, sur une de ses plateformes (ses familles de groupes), des moto-ventilateurs EC."
  ],
  reglage: "La vitesse d’un moteur EC se règle par le <strong>signal 0..10 V</strong> du régulateur. Le moteur n’a pas de commutateur de vitesse. La notice ne dit pas quelle tension du signal donne quelle vitesse.",

  picto: () => null,
  colonnes: [
    { id: 'condensateur', libelle: 'Un condensateur', aide: 'dessiné près du moteur' },
    { id: 'commutateur', libelle: 'Un commutateur de vitesse', aide: 'il choisit une vitesse parmi trois' },
    { id: 'signal', libelle: 'Un signal 0..10 V', aide: 'une tension continue que le régulateur envoie au bornier' }
  ],
  consigneAptitudes: 'Exemple résolu. Le ventilo-convecteur à moteur AC de la notice, page 6, a un moteur avec condensateur et un commutateur qui choisit trois vitesses par un autotransformateur. Il n’a pas de signal 0..10 V. Sur la version AC, on coche donc le condensateur et le commutateur. À vous maintenant. Ouvrez le temps 2 et regardez le schéma de la version EC du même appareil, page 10. Cherchez un condensateur près du moteur, un commutateur de vitesse, et un signal 0..10 V au bornier. Cochez ce que la version EC porte, puis validez.',
  aptitudes: {
    condensateur: false, commutateur: false, signal: true,
    bonneReponse: 'Juste. La version EC porte un signal 0..10 V, qui règle la vitesse. Elle n’a ni condensateur dessiné ni commutateur de vitesse.',
    erreurs: {
      condensateur: 'Sur le schéma de la version EC, page 10, aucun condensateur n’est dessiné près du moteur.',
      commutateur: 'La version EC n’a pas de commutateur de vitesse : la vitesse suit le signal 0..10 V.',
      signal: 'Sur le schéma de la version EC, le bornier X1 reçoit un signal 0..10 V, à la borne 3. Il règle la vitesse du moteur.'
    }
  },

  cablage: [
    "Avant de toucher au câblage, consignez l’appareil (station 6.7).",
    "Le bornier X1 reçoit cinq fils : <strong>PE, L, N, 0..10 V et GND</strong>.",
    "L et N amènent le 230 V monophasé. La notice demande un disjoncteur adapté.",
    "Le signal 0..10 V et GND viennent du régulateur. Le régulateur n’est pas dans l’appareil : l’installateur le pose.",
    "Le fil commun Com et les fils de vitesse Max, Med et Min du schéma de la version AC n’existent pas sur la version EC.",
    "Le 230 V alimente le moteur. Le signal 0..10 V règle sa vitesse."
  ],
  piege: "Deux confusions à éviter. La première prend le signal 0..10 V pour l’alimentation : le moteur s’alimente en 230 V monophasé, par L et N, et le signal règle sa vitesse. La seconde prend tout moteur M 1~ pour un moteur ordinaire. Sur le schéma d’un groupe de condensation, le condenseur standard a un moteur à deux fils, le condenseur EC en a quatre : PH, N, 10V et 0V.",

  symboles: [
    { src: 'assets/moteur-m1.svg', alt: "Le symbole du moteur monophasé : un rond avec la lettre M et le signe 1 ~, et deux fils.", legende: "Moteur monophasé, M 1~ : le même symbole pour un moteur EC" }
  ],
  lecturePlan: [
    "Ouvrez le temps 1 et agrandissez le schéma. Il se lit de haut en bas, en trois cadres.",
    "Le cadre du haut est le <strong>régulateur</strong>. Quatre fils en partent : L 230 V, N, 0..10 V et GND. Le cinquième, PE, passe à gauche du cadre.",
    "Le cadre du milieu est le <strong>bornier X1</strong>. Lisez ses bornes : PE, puis 1 pour L, 2 pour N, 3 pour 0..10 V et 4 pour GND.",
    "Le cadre du bas est le <strong>moto-ventilateur EC</strong>. Les cinq fils arrivent sur le bloc INV, qui est l’électronique du moteur.",
    "Sous le bloc, cherchez le rond M 1~ : c’est le symbole du moteur monophasé. Cherchez ensuite un condensateur et un fil de vitesse : aucun n’est dessiné.",
    "Au temps 2, comparez avec la version AC : le condensateur C, le fil commun Com et les trois fils de vitesse Max, Med et Min y sont dessinés."
  ],

  tableau: () => tableau99(),
  tableauTitre: 'Moteur AC, moteur EC',

  quiz: [
    { question: "Regardez le schéma du temps 1, cadre du milieu. Quels fils arrivent au bornier X1 d’un ventilo-convecteur EC ?",
      confirmation: "Cinq fils : la terre PE, le 230 V par L et N, puis le signal 0..10 V et GND.",
      reponses: [
        { texte: "L, N, PE et trois fils de vitesse.", pourquoi: "Des fils de vitesse, on en trouve sur la version AC : Max, Med et Min, avec Com. Le schéma de la version EC n’en a pas." },
        { texte: "L, N, PE, GND et 0..10 V.", juste: true },
        { texte: "L, N et le condensateur.", pourquoi: "Aucun condensateur n’est dessiné sur le schéma du temps 1. Un condensateur n’arrive pas au bornier X1." },
        { texte: "Trois phases et la terre.", pourquoi: "Le moteur de la notice s’alimente en 230 V monophasé : une phase, L, et le neutre, N." } ] },

    { question: "Comment règle-t-on la vitesse d’un moteur EC ? Lisez le paragraphe « Le signal de commande » de la carte « Ce qu’il y a dedans », au temps 2.",
      confirmation: "Par le signal 0..10 V que le régulateur envoie au bornier. La vitesse suit ce signal.",
      reponses: [
        { texte: "Par le signal 0..10 V du régulateur.", juste: true },
        { texte: "Par un commutateur de vitesse.", pourquoi: "Le commutateur de vitesse équipe la version AC. La version EC n’en a pas." },
        { texte: "Par un autotransformateur.", pourquoi: "L’autotransformateur donne ses trois vitesses au moteur AC de la même notice. Le moteur EC n’en a pas." },
        { texte: "En changeant le condensateur.", pourquoi: "Aucun condensateur n’est dessiné sur le schéma de la version EC. La vitesse vient du signal." } ] },

    { question: "Sous quelle tension s’alimente le moteur EC de la notice ? Lisez le paragraphe « L’alimentation » de la carte « Ce qu’il y a dedans », au temps 2.",
      confirmation: "En 230 V monophasé, avec une tolérance de plus ou moins 5 %. Le courant arrive par L et N.",
      reponses: [
        { texte: "10 V.", pourquoi: "10 V est la valeur la plus haute du signal de commande. Le signal règle la vitesse, il n’alimente pas le moteur." },
        { texte: "400 V triphasé.", pourquoi: "Le moteur de la notice est monophasé : il reçoit L et N, sans trois phases." },
        { texte: "230 V monophasé, à plus ou moins 5 %.", juste: true },
        { texte: "24 V.", pourquoi: "La notice donne 230 V monophasé. Elle ne cite pas 24 V pour le moteur." } ] },

    { question: "Sur le schéma d’un groupe de condensation, un condenseur EC monophasé a un moteur raccordé par quatre fils : PH, N, 10V et 0V. Lisez le paragraphe « Sur un groupe de condensation » de la carte « Ce qu’il y a dedans », au temps 2. Lesquels amènent le 230 V ?",
      confirmation: "PH, la phase, et N, le neutre : le 230 V monophasé arrive par ces deux fils. Le schéma ne dit pas le rôle des fils 10V et 0V.",
      reponses: [
        { texte: "10V et 0V.", pourquoi: "Ces repères ne sont ni la phase ni le neutre. Le 230 V monophasé arrive par la phase PH et par le neutre N." },
        { texte: "PH et 10V.", pourquoi: "10V n’est pas le repère du neutre. Le 230 V monophasé arrive par la phase PH et par le neutre N." },
        { texte: "Les quatre.", pourquoi: "Le 230 V monophasé arrive par deux fils : la phase PH et le neutre N." },
        { texte: "PH et N.", juste: true } ] },

    { question: "Un ventilateur EC ne tourne pas. Lisez le paragraphe « Contrôle et dépannage » de la carte « Ce qu’il y a dedans », au temps 2. Où trouvez-vous la conduite à tenir ?",
      confirmation: "Dans le manuel du régulateur, en plus de la notice de l’appareil. La notice demande de s’y référer obligatoirement.",
      reponses: [
        { texte: "Je mesure le condensateur.", pourquoi: "Aucun condensateur n’est dessiné sur le schéma du moteur EC." },
        { texte: "Dans le manuel du régulateur, comme le demande la notice de l’appareil.", juste: true },
        { texte: "Je mesure les enroulements comme en 9.2.", pourquoi: "La notice ne décrit pas cette mesure pour un moteur EC. Elle renvoie au manuel du régulateur." },
        { texte: "Je le change contre un moteur à condensateur.", pourquoi: "La notice ne prévoit pas ce changement. Le moteur AC et le moteur EC sont deux versions de l’appareil, avec deux câblages différents." } ] }
  ],

  retenir: [
    "<strong>EC</strong> veut dire commutation électronique. Le moteur s’alimente en 230 V monophasé, à plus ou moins 5 %, par L et N, avec la terre PE.",
    "Sa vitesse suit un <strong>signal 0..10 V</strong>, tension continue donnée par le régulateur. Le bornier X1 reçoit PE, L, N, 0..10 V et GND.",
    "Le moteur à condensateur choisit sa vitesse par un commutateur et un autotransformateur. Le moteur EC n’a ni commutateur de vitesse ni autotransformateur.",
    "Le moteur EC est une variante ou une option, selon le modèle. Il se dessine avec le symbole M 1~ du moteur monophasé, comme un moteur ordinaire.",
    "Pour le contrôle et le dépannage, reportez-vous au manuel du régulateur."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître un moteur EC sur un schéma ou sur une notice, nommer les fils de son bornier et dire comment on règle sa vitesse.</p><p><strong>Limites.</strong> Cette station est du niveau Bac pro. La phrase « En CAP » dit ce que le CAP doit reconnaître. La notice consultée ne dit pas quelle tension du signal donne quelle vitesse. Cette station ne donne aucune mesure ni aucune panne du moteur EC : le contrôle passe par le manuel du régulateur. Les aimants ne sont décrits que pour les circulateurs. Le moteur à condensateur est à la station 9.4, ses vitesses à la station 9.7, le variateur de fréquence à la station 7.4.</p>',
  credits: [
    { quoi: 'Schéma du temps 1', source: 'construit dans QElectroTech',
      detail: 'd’après le schéma de câblage de la version EC, page 10 de la notice d’installation « Ventilo-convecteurs à moteur AC ou EC » (AquaVent, 21/06/2021)' },
    { quoi: 'Schémas de câblage des versions AC et EC', source: 'notice d’installation « Ventilo-convecteurs à moteur AC ou EC », AquaVent, 21/06/2021',
      detail: 'recadrages des pages 6 et 10. Droits à confirmer avant publication.' },
    { quoi: 'Alimentation, signal 0..10 V, bornier, régulateur', source: 'même notice, pages 2, 5, 6, 8 et 10' },
    { quoi: 'Moteur EC en option sur un évaporateur', source: 'catalogue d’évaporateurs cubiques 3C-A, Bohn' },
    { quoi: 'Moteur EC sur un groupe de condensation', source: 'catalogue de groupes de condensation, et schéma « Condenseur » de ProFroid',
      detail: 'le schéma n’est pas reproduit : seuls les noms des quatre fils sont repris en texte' },
    { quoi: 'Moteur EC des circulateurs', source: 'catalogue Wilo, rubrique « Technologie ECM », et notice Salmson Siriux, rubrique « Moteur »' }
  ],

  correspondances: [
    { ligne: 7, couleur: '#0b7285', texte: "7.4 Le variateur de fréquence", href: '../7-4-variateur-frequence/index.html' },
    { ligne: 9, couleur: '#a16207', texte: "9.7 Ventilateur et vitesses", href: '../9-7-ventilateur-et-vitesses/index.html' },
    { ligne: 9, couleur: '#a16207', texte: "9.4 Compresseur PSC, CSR", href: '../9-4-compresseur-psc-csr/index.html' } ]
});

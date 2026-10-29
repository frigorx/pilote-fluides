/* ÉlectroRézo 9.7 : Ventilateur et vitesses, le moteur à plusieurs vitesses.
   Le schéma assets/vitesses-psc.svg est construit dans QElectroTech. Les autres images viennent du fonds
   (assets/biblio/IMAGES.md) : rien n’est dessiné ici. Les deux symboles du temps 4 viennent de la bibliothèque de symboles.
   Faits : voir SOURCES.md. */

const IM_9_7 = {
  schema: { src: 'assets/vitesses-psc.svg',
    alt: "Schéma du moteur PSC à trois vitesses. L’alimentation arrive au commun du commutateur, repéré Com., dessiné sur PV. PV est relié au fil R, MV au fil B, GV au fil N. Entre R et B, une impédance de 110 ohms. Entre B et N, une autre de 110 ohms. À partir de N, l’enroulement principal de 90 ohms va au fil V, et l’enroulement auxiliaire de 180 ohms va au fil J. Le condensateur Cp de 3 microfarads est entre J et V. La seconde alimentation arrive sur V. Un cadre en pointillés entoure le moteur. Les fils sont B bleu, R rouge, N noir, J jaune, V vert." },
  eclatee: { src: 'assets/biblio/ventilo-convecteur-vue-eclatee.png',
    alt: "Un ventilo-convecteur éclaté : le moteur entre ses deux turbines, l’échangeur au-dessus, le boîtier de commande et la carrosserie à gauche. Des repères numérotés de 1 à 13 désignent les pièces." },
  groupes: { src: 'assets/biblio/ventilo-convecteur-moteur-et-turbines.png',
    alt: "Des groupes moto-ventilateurs de ventilo-convecteur posés sur leur platine : un moteur entre deux turbines sous leur enveloppe en tôle, et une version à une seule turbine avec son câble." },
  photo: { src: 'assets/biblio/aqualia-motoventilateur-photo.jpeg',
    alt: "Le moto-ventilateur d’un ventilo-convecteur : le moteur entre deux turbines, un boîtier noir à bornes posé dessus, et le condensateur fixé au châssis, en dessous." },
  fils: { src: 'assets/biblio/aqualia-fils-rouge-gris-noir-vitesses.png',
    alt: "Le code des fils d’un moto-ventilateur : fil rouge, petite vitesse ; fil gris, moyenne vitesse ; fil noir, grande vitesse ; fil vert et jaune à la borne de terre. Dessin du boîtier à bornes numérotées de 6 à 1, avec les cosses rouge, gris, noir et le fil L : vitesse minimum sur la borne 6, vitesse maximum sur la borne 1." },
  tableau: { src: 'assets/biblio/moteur-5-fils-tableau-des-resistances.png',
    alt: "Tableau des résistances mesurées entre les cinq fils B, R, N, J et V d’un moteur de ventilateur. B-R : 110 ohms. N-B : 110. N-R : 220. J-B : 290. J-R : 400. J-N : 180. V-B : 200. V-R : 310. V-N : 90. V-J : 270." }
};

function vignette97(im, titre, sous) {
  const f = document.createElement('figure');
  f.className = 'vignette';
  const i = document.createElement('img');
  i.src = im.src; i.alt = im.alt; i.loading = 'lazy';
  f.appendChild(i);
  const c = document.createElement('figcaption');
  const s = document.createElement('strong');
  s.textContent = titre;
  c.appendChild(s);
  c.appendChild(document.createTextNode(' ' + sous));
  f.appendChild(c);
  return f;
}

const SOUS_FILS_9_7 = "Rouge, petite vitesse. Gris, moyenne vitesse. Noir, grande vitesse. Sur le boîtier à bornes, la vitesse minimum est sur la borne 6 et la vitesse maximum sur la borne 1.";
const SOUS_TABLEAU_9_7 = "Cherchez la ligne d’un fil, puis la colonne de l’autre : la case donne la mesure en ohms entre les deux fils.";

/* Le code des fils, dans la carte du câblage (temps 3). */
function codeDesFils97() {
  const f = vignette97(IM_9_7.fils, "Le code des fils.", SOUS_FILS_9_7);
  f.style.maxWidth = '380px';
  return f.outerHTML;
}

/* Le schéma du moteur, en tête de la carte de lecture (temps 4). Le modèle ajoute la « convention du schéma de commande »
   dès qu'il voit <img dans lecturePlan ; elle ne vaut pas ici, la balise est donc écrite en majuscules. */
function schemaLecture97() {
  const f = vignette97(IM_9_7.schema, "Le schéma du moteur.", "Le commutateur est dessiné sur PV, la petite vitesse.");
  f.style.maxWidth = '420px';
  return f.outerHTML.replace('<img', '<IMG');
}

/* Le temps 2 : le moteur réel, le schéma, le code des fils, et le tableau des cinq fils (Bac pro). */
function scene97() {
  const bande = document.createElement('div');
  bande.className = 'bande-visuelle';
  bande.appendChild(vignette97(IM_9_7.photo, "Un moto-ventilateur.", "Le moteur, ses deux turbines, un boîtier à bornes et, en dessous, le condensateur."));
  bande.appendChild(vignette97(IM_9_7.schema, "Le schéma du moteur.", "Le commutateur est dessiné sur PV, la petite vitesse."));
  bande.appendChild(vignette97(IM_9_7.fils, "Le code des fils.", SOUS_FILS_9_7));
  bande.appendChild(vignette97(IM_9_7.tableau, "En Bac pro : les cinq fils.", SOUS_TABLEAU_9_7));
  return bande;
}

/* Le temps 5 : les trois façons, puis le tableau des mesures pour les deux dernières questions. */
const LIGNES_9_7 = [
  ['Une impédance en série', 'une bobine en série avec le moteur PSC fait chuter la tension : la plus grande impédance donne la plus petite vitesse, et en grande vitesse le courant ne traverse aucune impédance', 'le cours du moteur monophasé, avec le commutateur PV, MV, GV'],
  ['Un autotransformateur', 'il offre le choix de plusieurs vitesses : on en choisit trois parmi six', 'la notice d’un ventilo-convecteur de taille 1'],
  ['Plusieurs bobinages dans le moteur', 'le moteur multibobinage porte lui-même plusieurs bobinages : on choisit trois vitesses parmi quatre', 'la notice d’un ventilo-convecteur de taille 2']
];

function tableau97() {
  const boite = document.createElement('div');
  const defile = document.createElement('div');
  defile.style.overflowX = 'auto';
  const t = document.createElement('table');
  t.className = 'tab';
  t.innerHTML = '<thead><tr><th>Façon</th><th>Ce qui fait la vitesse</th><th>Où on la lit</th></tr></thead><tbody>' +
    LIGNES_9_7.map(([f, c, o]) =>
      '<tr><td><strong>' + f + '</strong></td><td>' + c + '</td><td>' + o + '</td></tr>'
    ).join('') + '</tbody>';
  defile.appendChild(t);
  boite.appendChild(defile);
  const l = document.createElement('p');
  l.className = 'legende';
  l.textContent = 'Le moteur Dahlander, triphasé, change le nombre de pôles : il relève d’un autre principe (station 6.3).';
  boite.appendChild(l);
  const bande = document.createElement('div');
  bande.className = 'bande-visuelle';
  bande.appendChild(vignette97(IM_9_7.fils, "Le code des fils.", "Pour la première question."));
  bande.appendChild(vignette97(IM_9_7.schema, "Le schéma du moteur.", "Pour la deuxième question et pour la dernière."));
  bande.appendChild(vignette97(IM_9_7.tableau, "En Bac pro : le tableau des mesures.", "Pour les deux dernières questions. " + SOUS_TABLEAU_9_7));
  boite.appendChild(bande);
  return boite;
}

ModeleAppareil.construire({
  id: '9.7', ligne: 9,
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 7',
  titre: "Ventilateur et vitesses : le moteur à plusieurs vitesses",
  narration: NARRATION,

  prerequis: [
    { id: '6.5', quoi: "le moteur monophasé et son aide au démarrage" },
    { id: '9.4', quoi: "le PSC et son condensateur permanent" },
    { id: '9.2', quoi: "mesurer un enroulement à l’ohmmètre" }
  ],

  photos: [
    { src: IM_9_7.eclatee.src, alt: IM_9_7.eclatee.alt,
      titre: "Un ventilo-convecteur éclaté.", sous: "Le moteur est entre deux turbines. Le repère 3 est le moteur, le repère 4 le ventilateur et sa volute, le repère 5 le condensateur." },
    { src: IM_9_7.groupes.src, alt: IM_9_7.groupes.alt,
      titre: "Des moto-ventilateurs.", sous: "Un moto-ventilateur est un moteur avec ses turbines. Ici, un moteur entre deux turbines, et une version à une seule turbine." },
    { src: IM_9_7.schema.src, alt: IM_9_7.schema.alt,
      titre: "Le moteur et ses vitesses.", sous: "Le commutateur choisit la vitesse. Il est dessiné sur PV, la petite vitesse." }
  ],
  creditPhoto: 'Notices de constructeurs, cours du fonds inerWeb et schéma construit dans QElectroTech. Détail dans « Crédits ».',

  aQuoiCaSert: "Le ventilateur d’une unité intérieure souffle l’air à une ou plusieurs <strong>vitesses</strong>, dont une plus silencieuse pour la nuit. Un commutateur de vitesse, sur la platine de commande, choisit la vitesse. Le moteur change de vitesse de trois façons, selon le modèle : une impédance en série, un autotransformateur ou un moteur à plusieurs bobinages.",
  ouOnLeTrouve: "On le trouve dans l’unité intérieure d’un climatiseur et dans le ventilo-convecteur. Les petits ventilateurs de climatiseur ont un moteur PSC, à condensateur permanent (station 9.4). Le PSC et les trois façons d’avoir plusieurs vitesses sont du niveau CAP. Le tableau des cinq fils du moteur est en Bac pro.",

  scene: () => scene97(),

  technologie: [
    ["Le ventilateur centrifuge", "celui d’une unité intérieure porte une ou deux <strong>turbines</strong>. Une turbine est la roue du ventilateur, en plastique. Elle est montée directement sur l’arbre du moteur et tourne dans une volute, une enveloppe en tôle galvanisée. Sur les unités murales, console et gainable, le ventilateur est centrifuge pour éviter un niveau sonore trop élevé. L’unité extérieure a un ventilateur hélicoïde."],
    ["Le moteur", "le moteur d’un petit ventilateur de climatiseur est un moteur monophasé à condensateur permanent, le PSC de la station 9.4. Il n’a aucun relais de démarrage. Sur la photo ci-dessus, le condensateur est fixé au châssis, sous le moteur. La notice d’un ventilo-convecteur gainable décrit ce moteur : 230 V, monophasé, 50 Hz, condensateur permanent et protection interne de surcharge."],
    ["La chute de tension", "pour changer de vitesse, on crée une <strong>chute de tension</strong> : une baisse de la tension aux bornes du moteur. Le couple du moteur diminue, donc la vitesse aussi. On y arrive avec une impédance, une bobine placée en série avec le moteur PSC."],
    ["Le commutateur PV, MV, GV", "il a une position par vitesse : PV pour la petite vitesse, MV pour la moyenne, GV pour la grande. En PV, le courant traverse l’impédance, qui crée la chute de tension : le moteur tourne en petite vitesse. En GV, le courant ne traverse <strong>aucune impédance</strong> : le moteur reçoit la tension du réseau et tourne en grande vitesse. Pour la plus petite vitesse, on intercale la plus grande impédance."],
    ["Sur le schéma du moteur, ci-dessus", "le commutateur est dessiné sur PV. PV est relié au fil R, MV au fil B et GV au fil N. Entre R et B, puis entre B et N, une impédance de 110 Ω. En PV, le courant traverse les deux impédances. En MV, il en traverse une. En GV, il n’en traverse aucune."],
    ["Le code des fils", "sur la notice d’un moto-ventilateur de ventilo-convecteur, le fil <strong>rouge</strong> donne la petite vitesse. Le fil gris donne la moyenne vitesse, et le fil noir la grande vitesse. Le fil vert et jaune va à la borne de terre. Ce code vient de la notice de cet appareil."],
    ["En Bac pro : les cinq fils", "le cours donne un exercice : moteur monophasé 220 V, condensateur de marche de 3 µF, ventilateur de climatiseur, commutateur à quatre bornes C, PV, MV, GV. Cinq fils sortent du moteur : bleu (B), rouge (R), noir (N), jaune (J) et vert (V). Avec le code de la notice ci-dessus, ce sont deux exemples. Les couleurs changent d’un moteur à l’autre : lisez la notice du moteur. Le tableau donne la résistance mesurée entre deux fils, en ohms. <strong>Exemple résolu</strong> : dans cet exemple, la plus faible valeur, 90 Ω entre N et V, est l’enroulement principal. N est le commun des enroulements. L’auxiliaire est entre N et J : 180 Ω. Les deux impédances sont entre N et B, 110 Ω, puis entre B et R, 110 Ω. Les autres mesures sont des sommes de branches qui partent de N : J-B vaut 180 + 110 = 290 Ω."]
  ],

  variantes: [
    "<strong>Une impédance en série</strong> avec le moteur PSC : elle fait chuter la tension. C’est le montage du cours, avec le commutateur PV, MV, GV.",
    "<strong>Un autotransformateur</strong> : il offre le choix de plusieurs vitesses. Sur la notice d’un ventilo-convecteur de taille 1, six vitesses sont réalisées à partir d’un autotransformateur, et on en choisit trois.",
    "<strong>Un moteur multibobinage</strong> : le moteur porte lui-même plusieurs bobinages. Sur la taille 2 de la même notice, quatre vitesses sont réalisées ainsi, et on en choisit trois.",
    "<strong>Le Dahlander</strong> est un moteur triphasé à deux vitesses. Il change le nombre de pôles. Il relève d’un autre principe que les trois façons ci-dessus (station 6.3)."
  ],
  reglage: "Le constructeur câble trois vitesses sur six. Sur la notice d’un ventilo-convecteur de taille 1, l’appareil est précâblé d’usine sur les vitesses 1, 3 et 5. On choisit trois vitesses parmi les six, pour se raccorder aux régulations. Sur la taille 2, on choisit trois vitesses parmi quatre. Avant de démonter, <strong>repérez et notez les vitesses câblées</strong>.",

  picto: () => null,
  colonnes: [
    { id: 'impedance', libelle: 'Une impédance en série', aide: 'une bobine en série avec le moteur, qui fait chuter la tension' },
    { id: 'autotransfo', libelle: 'Un autotransformateur', aide: 'il offre le choix de plusieurs vitesses' },
    { id: 'multibobinage', libelle: 'Plusieurs bobinages dans le moteur', aide: 'le moteur lui-même porte plusieurs bobinages' }
  ],
  consigneAptitudes: 'Exemple résolu. Le cours montre un commutateur PV et GV : en petite vitesse, le courant traverse une bobine en série avec le moteur. Ce ventilateur a ses vitesses par une impédance en série. À vous maintenant. La notice d’un ventilo-convecteur de taille 1 dit : « six vitesses réalisées à partir d’un autotransformateur ». Relisez ces mots, puis comparez-les aux trois cases ci-dessous : chaque case dit en quelques mots une façon d’obtenir des vitesses. Cochez ce qui donne les vitesses de cet appareil, puis validez.',
  aptitudes: {
    impedance: false, autotransfo: true, multibobinage: false,
    bonneReponse: 'Juste. La notice de la taille 1 dit : six vitesses réalisées à partir d’un autotransformateur. On en choisit trois parmi les six. La taille 2 a quatre vitesses, avec un moteur multibobinage.',
    erreurs: {
      impedance: 'La notice cite un autotransformateur, et aucune impédance. L’impédance en série est le montage du cours, avec le commutateur PV et GV.',
      autotransfo: 'La notice de la taille 1 dit : six vitesses réalisées à partir d’un autotransformateur. Il donne ses vitesses.',
      multibobinage: 'Le moteur multibobinage est celui de la taille 2 de la même notice : quatre vitesses. La taille 1 a un autotransformateur.'
    }
  },

  cablage: [
    "Le fil <strong>rouge</strong> donne la petite vitesse, le fil gris la moyenne vitesse, le fil noir la grande vitesse. Le fil vert et jaune va à la borne de terre. Le dessin de la notice est juste dessous." + codeDesFils97(),
    "Les raccordements du moto-ventilateur se font par un connecteur rapide, qui évite les erreurs de câblage.",
    "Avant de démonter, repérez et notez les vitesses câblées.",
    "Sur un montage à impédance, la plus grande vitesse s’obtient en alimentant le moteur directement sur la tension du réseau. La plus faible s’obtient en intercalant la plus grande impédance.",
    "Un condensateur reste <strong>chargé</strong> après la coupure. On décharge Cp avec une résistance avant d’y toucher.",
    "Toute mesure à l’ohmmètre se fait hors tension, après consignation."
  ],

  symboles: [
    { src: 'assets/symbole-impedance.svg',
      alt: "Le symbole d’une impédance : quatre petits arcs alignés entre deux bornes, comme une bobine.",
      legende: "Impédance : une bobine (sur le schéma, 110 Ω)" },
    { src: 'assets/symbole-condensateur.svg',
      alt: "Le symbole du condensateur : deux traits parallèles qui ne se touchent pas, entre deux bornes.",
      legende: "Condensateur (sur le schéma, Cp 3 µF)" }
  ],
  lecturePlan: [
    schemaLecture97(),
    "Regardez le schéma ci-dessus et cliquez dessus pour l’agrandir. Lisez de haut en bas. L’alimentation <strong>Alim.</strong> arrive au commun du commutateur, repéré <strong>Com.</strong>",
    "Le commutateur a trois sorties : <strong>PV</strong> à gauche, <strong>MV</strong> au milieu, <strong>GV</strong> à droite. Le trait oblique est posé sur PV : le schéma est dessiné en petite vitesse.",
    "Chaque sortie va à un fil du moteur : PV au fil R, MV au fil B, GV au fil N. Les fils se repèrent par leur couleur : B bleu, R rouge, N noir, J jaune, V vert.",
    "Le cadre en pointillés entoure le moteur. Entre R et B, une impédance de 110 Ω. Entre B et N, une autre de 110 Ω. Ce sont les <strong>impédances chutrices</strong> : elles font chuter la tension.",
    "N est le commun des enroulements, le fil qu’ils partagent. Le <strong>principal</strong>, 90 Ω, va de N à V. L’<strong>auxiliaire</strong>, 180 Ω, va de N à J. Le condensateur Cp, 3 µF, est entre J et V.",
    "La seconde alimentation arrive sur V. Posez le doigt sur PV et suivez le fil : il traverse les deux impédances avant d’arriver en N. Posez-le sur GV : le fil arrive en N, le courant ne traverse aucune impédance."
  ],

  tableau: () => tableau97(),
  tableauTitre: 'Trois façons d’avoir plusieurs vitesses',

  quiz: [
    { question: "Regardez l’image « Le code des fils », sous le tableau. Sur la notice d’un moto-ventilateur, quel fil donne la grande vitesse ?",
      confirmation: "Le fil noir donne la grande vitesse. Le rouge donne la petite vitesse et le gris la moyenne vitesse. Le fil vert et jaune va à la borne de terre.",
      reponses: [
        { texte: "Le fil rouge.", pourquoi: "Le fil rouge donne la petite vitesse. La notice écrit : fil rouge, petite vitesse." },
        { texte: "Le fil gris.", pourquoi: "Le fil gris donne la moyenne vitesse." },
        { texte: "Le fil noir.", juste: true },
        { texte: "Le fil vert et jaune.", pourquoi: "Le fil vert et jaune se raccorde à la borne de terre. Il ne donne aucune vitesse." } ] },

    { question: "Regardez l’image « Le schéma du moteur », sous le tableau. Imaginez le commutateur sur GV et suivez le fil qui part de GV. Que se passe-t-il pour les impédances ?",
      confirmation: "Le fil de GV arrive en N : le courant ne traverse aucune impédance, et le moteur reçoit la tension du réseau.",
      reponses: [
        { texte: "Le courant ne traverse aucune impédance : le moteur reçoit la tension du réseau.", juste: true },
        { texte: "Elles sont en série avec le moteur.", pourquoi: "C’est la position PV, celle du schéma : le courant traverse les deux impédances. Sur GV, le fil arrive en N sans traverser d’impédance." },
        { texte: "Elles remplacent le condensateur.", pourquoi: "Sur le schéma, le condensateur Cp reste entre J et V. Une impédance est une bobine en série avec le moteur." },
        { texte: "Elles coupent l’auxiliaire.", pourquoi: "L’auxiliaire reste relié entre N et J. Sur GV, rien n’est coupé : le courant ne traverse aucune impédance." } ] },

    { question: "Lisez la première ligne du tableau « Trois façons d’avoir plusieurs vitesses ». Pour la plus petite vitesse, que met-on en série avec le moteur ?",
      confirmation: "La plus grande impédance : c’est la règle du cours pour la plus petite vitesse.",
      reponses: [
        { texte: "Rien.", pourquoi: "Sans impédance en série, le moteur reçoit la tension du réseau : c’est la grande vitesse." },
        { texte: "La plus grande impédance.", juste: true },
        { texte: "La plus petite impédance.", pourquoi: "Pour la plus petite vitesse, le cours intercale la plus grande impédance." },
        { texte: "Un second condensateur.", pourquoi: "Le moteur garde son seul condensateur, Cp. Les vitesses viennent de l’impédance en série." } ] },

    { question: "Avant de démonter un moto-ventilateur à plusieurs vitesses, que faites-vous ? Cherchez la réponse dans la carte « Ce qu’il faut retenir ».",
      confirmation: "Je repère et je note les vitesses câblées. Le constructeur n’en câble que trois, et la notice demande ce repérage avant de démonter.",
      reponses: [
        { texte: "Je démonte d’abord, je note ensuite.", pourquoi: "La notice demande de repérer et de noter les vitesses câblées avant de démonter. Le constructeur n’en câble que trois." },
        { texte: "Je me fie au connecteur rapide pour tout remettre en place.", pourquoi: "Le connecteur rapide évite les erreurs de câblage au raccordement. La notice demande quand même de repérer et de noter les vitesses câblées avant de démonter." },
        { texte: "Je teste le condensateur.", pourquoi: "Le test du condensateur est à la station 9.5. Il ne dit rien des vitesses câblées." },
        { texte: "Je repère et je note les vitesses câblées.", juste: true } ] },

    { question: "En Bac pro. Exemple résolu : dans cet exemple, la plus faible valeur du tableau des mesures, 90 Ω entre N et V, est l’enroulement principal. N est le commun des enroulements. À vous maintenant. Cherchez la ligne J et la colonne N du tableau : on lit 180 Ω. Quel enroulement est entre N et J ?",
      confirmation: "L’auxiliaire. Il est entre N, le commun des enroulements, et J : 180 Ω, plus que le principal.",
      reponses: [
        { texte: "Le principal.", pourquoi: "Le principal est la plus faible valeur du tableau : 90 Ω, entre N et V." },
        { texte: "L’auxiliaire.", juste: true },
        { texte: "Une impédance.", pourquoi: "Les impédances mesurent 110 Ω chacune : entre N et B, puis entre B et R." } ] },

    { question: "En Bac pro. Seul. Vérifiez une mesure du tableau : entre N et R, on lit 220 Ω. Regardez l’image « Le schéma du moteur », sous le tableau. De quoi cette mesure est-elle faite ?",
      confirmation: "Des deux impédances en série : 110 + 110 = 220 Ω. Sur le schéma, N, B et R sont reliés par ces deux impédances.",
      reponses: [
        { texte: "L’auxiliaire seul.", pourquoi: "L’auxiliaire seul mesure 180 Ω, entre N et J." },
        { texte: "Une seule impédance.", pourquoi: "Une seule impédance mesure 110 Ω, entre N et B." },
        { texte: "Les deux impédances en série, 110 + 110 Ω.", juste: true },
        { texte: "Le principal et l’auxiliaire en série, 90 + 180 Ω.", pourquoi: "90 + 180 = 270 Ω : c’est la mesure entre V et J." } ] }
  ],

  retenir: [
    "Le ventilateur d’une unité intérieure est <strong>centrifuge</strong>, avec une ou deux turbines montées sur l’arbre du moteur. Son moteur est un PSC : un condensateur permanent, aucun relais.",
    "Trois façons d’avoir plusieurs vitesses, selon le modèle : une impédance en série, un autotransformateur, un moteur multibobinage.",
    "Avec l’impédance, en GV, le courant ne traverse aucune impédance : le moteur reçoit la tension du réseau. La petite vitesse intercale la plus grande impédance.",
    "Sur la notice d’un moto-ventilateur : fil rouge, petite vitesse ; gris, moyenne vitesse ; noir, grande vitesse ; vert et jaune, la terre. Avant de démonter, repérez et notez les vitesses câblées, et déchargez le condensateur avec une résistance.",
    "En Bac pro, dans cet exemple : entre les cinq fils, la plus faible mesure est le principal, et N est le commun des enroulements. Les autres mesures sont des sommes de branches qui partent de N."
  ],

  objectifs: '<p><strong>Objectif.</strong> Dire comment un ventilateur de climatiseur a plusieurs vitesses, lire le code des fils d’une notice, et lire le schéma d’un moteur PSC à commutateur de vitesse.</p><p><strong>Limite.</strong> Le PSC est à la station 9.4. Mesurer un enroulement à l’ohmmètre est à la station 9.2. Le moteur Dahlander, triphasé, est à la station 6.3. Le moteur EC est à la station 9.9. Le moteur à cinq fils et son tableau de mesures vont jusqu’au Bac pro : les phrases « En Bac pro » sont pour ce niveau. La recherche de panne d’un moteur à plusieurs vitesses n’est pas traitée dans cette station.</p>',
  credits: [
    { quoi: 'Schéma du moteur à vitesses', source: 'construit dans QElectroTech',
      detail: 'assemblé avec des symboles de QElectroTech, puis converti en SVG' },
    { quoi: 'Impédance en série, commutateur PV, MV, GV, cinq fils et tableau des mesures', source: 'cours du fonds inerWeb « Le moteur monophasé »',
      detail: 'Bac pro MFER, § VI.1 page 22 et § VII page 25. Le tableau est l’image du cours, recadrée' },
    { quoi: 'Vue éclatée et photo des moto-ventilateurs', source: 'manuel technique « Series Silent » d’un constructeur de ventilo-convecteurs, 06-2002',
      detail: 'pages 7 et 10, images reprises sans retouche' },
    { quoi: 'Code des fils, photo du moto-ventilateur, vitesses d’un ventilo-convecteur', source: 'notice d’un ventilo-convecteur gainable Aqualia',
      detail: 'document 24232-IOM-12-2000, § 6.1 et 6.2, page 20' },
    { quoi: 'Moteur AC, six vitesses dont trois câblées, commutateur à quatre positions', source: 'notice AquaVent « Ventilo-convecteurs à moteur AC ou EC »',
      detail: '21/06/2021, pages 5, 6 et 8' },
    { quoi: 'Ventilateur centrifuge de l’unité intérieure', source: 'cours du fonds inerWeb « Climatiseur »',
      detail: 'Bac pro MFER, § 3.4' }
  ],

  correspondances: [
    { ligne: 9, couleur: '#a16207', texte: "9.4 Compresseur PSC, CSR", href: '../9-4-compresseur-psc-csr/index.html' },
    { ligne: 9, couleur: '#a16207', texte: "9.2 Repérer C, S, R", href: '../9-2-reperer-c-s-r/index.html' },
    { ligne: 6, couleur: '#c9451a', texte: "6.5 Le moteur monophasé", href: '../6-5-moteur-monophase/index.html' },
    { ligne: 6, couleur: '#c9451a', texte: "6.3 Le moteur asynchrone triphasé", href: '../6-3-moteur-asynchrone/index.html' } ]
});

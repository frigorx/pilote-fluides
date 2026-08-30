/* ÉlectroRézo 5.1 — Le contact : repos et travail, NO et NF. */

ModeleAppareil.construire({
  id: '5.1', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 1',
  titre: "Le contact : repos et travail",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/trois-contacts-auxiliaires.png',
      alt: "Trois blocs de contacts pour contacteur, photographiés et légendés : instantané latéral, temporisé, instantané frontal.",
      titre: "L’objet réel.", sous: "Un contact se vend par bloc, et on en clipse autant qu’il en faut." },
    { src: 'assets/biblio/contact-no-et-nf.png',
      alt: "Planche de symboles : un bouton-poussoir à fermeture marqué NO, un bouton-poussoir à ouverture marqué NC, et un commutateur rotatif à deux positions fixes.",
      titre: "Les deux écritures.", sous: "À fermeture, à ouverture. C’est toute la station." }
  ],
  creditPhoto: 'Documents de cours indexés dans la base inerWeb. Détail dans « Crédits ».',

  aQuoiCaSert: "Un contact, c’est l’endroit où le circuit se ferme ou s’ouvre. Deux pièces de métal qui se touchent, ou qui ne se touchent pas. Toute la commande électrique est bâtie là-dessus.",
  ouOnLeTrouve: "Dans absolument tout : un bouton, un contacteur, un relais, un thermostat, une fin de course. Chaque fois qu’un appareil « donne un ordre », c’est un contact qui l’exécute.",

  scene: () => SchemasCommande.contactReposTravail(),

  technologie: [
    ["La pièce fixe", "solidaire du boîtier. C’est elle qui porte la borne d’entrée."],
    ["La pièce mobile", "une lame qui pivote ou qui glisse. Elle vient toucher la pièce fixe, ou s’en écarter."],
    ["Le ressort", "il ramène la pièce mobile à sa position de repos dès qu’on cesse d’agir. Sans lui, rien ne reviendrait."],
    ["Les alliages de contact", "argent, souvent allié. Il faut un métal qui conduise bien et qui ne s’oxyde pas, sinon la résistance monte et le contact chauffe."]
  ],

  variantes: [
    "<strong>Normalement ouvert (NO)</strong> — au repos, il ne laisse pas passer. Il se ferme quand on agit. Repères de bornes <strong>13-14</strong>, <strong>43-44</strong>.",
    "<strong>Normalement fermé (NF, ou NC)</strong> — au repos, il laisse passer. Il s’ouvre quand on agit. Repères <strong>11-12</strong>, <strong>21-22</strong>.",
    "<strong>Inverseur</strong> — les deux dans le même bloc, avec un point commun. Un NO et un NF qui basculent ensemble. Repères <strong>11-12-14</strong>.",
    "<strong>Contact à ouverture forcée</strong> — sa liaison mécanique est rigide : si les pastilles se soudent, le mécanisme les arrache quand même. Obligatoire sur les sécurités."
  ],

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'Un contact seul, ce n’est pas encore un appareil. Cochez ce qu’il sait faire tout seul, puis validez.',
  aptitudes: {
    puissance: false, distance: false, maintien: false,
    bonneReponse: 'Exact — et c’est le sens de cette station. Un contact ne fait rien tout seul : il est la brique. Ce sont les appareils des stations suivantes qui lui donnent un métier.',
    erreurs: {
      puissance: 'Un contact seul ne se juge pas en ampères : c’est le boîtier autour de lui — relais ou contacteur — qui décide de ce qu’il peut porter.',
      distance: 'Le contact ne se commande pas lui-même. Il obéit à ce qui le pousse : un doigt, une came, une bobine.',
      maintien: 'Le ressort ramène toujours le contact à sa position de repos. Rien ne le garde en place.'
    }
  },

  cablage: [
    "Les <strong>repères de bornes</strong> ne sont pas un numéro de série : le second chiffre dit la nature. <strong>1-2</strong> pour un NF, <strong>3-4</strong> pour un NO.",
    "Le premier chiffre dit le rang du bloc sur l’appareil. Ainsi <strong>21-22</strong> est le deuxième bloc, et c’est un NF.",
    "Les sécurités se câblent <strong>toujours</strong> en NF. On verra à la station 5.8 pourquoi c’est une question de vie.",
    "Un contact de commande se serre au couple. Trop mou, il chauffe ; trop fort, la borne casse."
  ],
  piege: "« Normalement ouvert » ne veut pas dire « ouvert en ce moment ». Le mot <em>normalement</em> désigne l’état au repos, celui du dessin. Sur l’installation, ce contact peut très bien être fermé.",

  symboles: [
    { src: 'assets/con_simple.svg', alt: "Symbole normalisé d’un contact normalement ouvert.", legende: "Normalement ouvert" },
    { src: 'assets/con_simple_nf.svg', alt: "Symbole normalisé d’un contact normalement fermé.", legende: "Normalement fermé" },
    { src: 'assets/contnonc.svg', alt: "Symbole normalisé d’un contact inverseur, à point commun.", legende: "Inverseur" }
  ],
  lecturePlan: [
    "Le <strong>NO</strong> : la lame penche à gauche, et il reste un vide entre elle et la borne du haut. Rien ne passe.",
    "Le <strong>NF</strong> : la lame penche à droite, et une <strong>petite barre horizontale</strong> la relie à la borne. Elles se touchent.",
    "L’<strong>inverseur</strong> : une seule lame, deux bornes fixes. Elle quitte l’une pour aller sur l’autre.",
    "Cette différence tient en quelques traits. C’est peu — et c’est pourtant elle qui décide si votre machine démarre ou si elle refuse."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Un contact repéré 21-22, c’est quoi ?",
      confirmation: "Le second chiffre dit la nature : 1-2 pour un NF.",
      reponses: [
        { texte: "Un contact de puissance.", pourquoi: "Les contacts de puissance portent 1/2, 3/4, 5/6 — sans dizaine." },
        { texte: "Un contact normalement fermé, deuxième bloc.", juste: true },
        { texte: "Un contact qui supporte 21 ampères.", pourquoi: "Les repères de bornes ne disent rien du courant admissible." },
        { texte: "Un contact normalement ouvert, deuxième bloc.", pourquoi: "Un NO se termine par 3-4, jamais par 1-2." } ] },

    { question: "Sur un plan, dans quel état les contacts sont-ils dessinés ?",
      confirmation: "Un plan décrit un montage, pas un instant.",
      reponses: [
        { texte: "Dans l’état où on les trouve en arrivant.", pourquoi: "C’est justement l’erreur courante : le plan ne décrit pas l’instant présent." },
        { texte: "Machine en marche.", pourquoi: "Ce serait impossible : la position dépendrait du moment choisi." },
        { texte: "Au repos : personne n’appuie, aucune bobine n’est alimentée.", juste: true },
        { texte: "Dans l’état où ils étaient à la mise en service.", pourquoi: "Le plan ne garde aucune trace d’un instant particulier." } ] },

    { question: "Pourquoi les sécurités se câblent-elles en NF ?",
      confirmation: "Parce qu’un fil arraché doit arrêter la machine.",
      reponses: [
        { texte: "Parce qu’un NF supporte plus de courant.", pourquoi: "Les deux blocs ont le même pouvoir de coupure." },
        { texte: "Parce qu’un contact NF coûte moins cher.", pourquoi: "Le prix est le même : c’est le même bloc, monté autrement." },
        { texte: "Parce que c’est plus rapide.", pourquoi: "La vitesse de basculement est identique dans les deux sens." },
        { texte: "Parce qu’un fil qui casse ouvre le circuit, donc arrête la machine.", juste: true } ] },

    { question: "Qu’est-ce qu’un contact à ouverture forcée ?",
      confirmation: "Sa liaison mécanique arrache les pastilles même si elles se sont soudées.",
      reponses: [
        { texte: "Un contact dont la liaison rigide arrache les pastilles même soudées.", juste: true },
        { texte: "Un contact à ressort renforcé.", pourquoi: "Un ressort plus dur n’aide pas si les pastilles ont fondu ensemble." },
        { texte: "Un contact que l’on ouvre à la main.", pourquoi: "Tous les contacts de commande s’ouvrent par une action extérieure." },
        { texte: "Un contact qui s’ouvre plus vite que les autres.", pourquoi: "Il ne s’agit pas de vitesse mais de garantie mécanique." } ] }
  ],

  retenir: [
    "<strong>NO</strong> : ouvert au repos, il se ferme quand on agit. Repères 13-14.",
    "<strong>NF</strong> : fermé au repos, il s’ouvre quand on agit. Repères 21-22.",
    "<strong>Au repos</strong> décrit le dessin, pas l’installation.",
    "<strong>Les sécurités sont en NF</strong> : un fil coupé arrête la machine."
  ],

  objectifs: '<p><strong>Objectif.</strong> Distinguer un contact normalement ouvert d’un contact normalement fermé, lire les repères de bornes, et comprendre ce que « au repos » veut dire sur un plan.</p><p><strong>Limite.</strong> On ne traite pas ici le pouvoir de coupure ni les catégories d’emploi : ils dépendent de l’appareil qui porte le contact.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/310_relays_contactors_contacts/' } ],

  correspondances: [
    { ligne: 8, couleur: '#7c3aed', texte: "8.2 Le contact, la lettre du schéma" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.3 Le contact auxiliaire" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.8 Les sécurités, toujours en NF" } ]
});

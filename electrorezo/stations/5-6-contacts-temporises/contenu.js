/* ÉlectroRézo 5.6 — Les contacts temporisés : à la fermeture, à l’ouverture. */

ModeleAppareil.construire({
  id: '5.6', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 6',
  titre: "Les contacts temporisés",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/contact-auxiliaire-temporise.png',
      alt: "Trois types de contacts auxiliaires pour contacteur, dont un bloc temporisé.",
      titre: "Le bloc du milieu.", sous: "Un contact auxiliaire, mais qui prend son temps." },
    { src: 'assets/biblio/bloc-temporise-sur-contacteur.png',
      alt: "Schéma du câblage d’un contacteur équipé d’un bloc temporisé clipsé en façade.",
      titre: "Clipsé sur le contacteur.", sous: "Il obéit à la même bobine, avec un retard." },
    { src: 'assets/biblio/minuterie-deux-boutons.png',
      alt: "Schéma électrique d’une installation d’éclairage commandée par deux boutons-poussoirs et une minuterie.",
      titre: "Un cas réel.", sous: "Deux boutons, une minuterie, un éclairage de couloir." }
  ],
  creditPhoto: 'Documents de cours indexés dans la base inerWeb. Détail dans « Crédits ».',

  aQuoiCaSert: "À écrire le temps sur un schéma. La station précédente montrait l’appareil ; celle-ci montre les quatre signes qui disent, sur le papier, quel contact attend et dans quel sens.",
  ouOnLeTrouve: "Partout où il y a une temporisation : le contact est dessiné dans le circuit de commande, souvent loin de la bobine qui le pilote.",

  scene: () => SchemasCommande.deuxTemporisations(),

  technologie: [
    ["Le contact reste un contact", "les pastilles, la lame, le ressort n’ont pas changé. Ce qui change est ce qui les <strong>retient</strong>."],
    ["Le frein", "un piston qui laisse fuir de l’air, un amortisseur à huile, ou aujourd’hui un circuit électronique qui décide du moment. Le résultat est le même : un mouvement retardé."],
    ["Quatre combinaisons", "un contact peut être NO ou NF, et le retard peut porter sur le travail ou sur le repos. Deux fois deux : quatre signes différents à savoir lire."],
    ["Le contact instantané voisin", "beaucoup de blocs contiennent aussi un contact qui ne temporise pas. Il porte alors des repères classiques, et sur le plan il n’a pas de parachute."]
  ],

  variantes: [
    "<strong>NO temporisé au travail</strong> — il attend, puis ferme. Le plus utilisé : lancer quelque chose plus tard.",
    "<strong>NF temporisé au travail</strong> — il attend, puis ouvre. Pour couper quelque chose après un délai.",
    "<strong>NO temporisé au repos</strong> — il ferme tout de suite, et attend avant de rouvrir. Pour prolonger une marche après l’arrêt : une ventilation qui continue.",
    "<strong>NF temporisé au repos</strong> — il ouvre tout de suite, et attend avant de refermer. Pour interdire un redémarrage pendant un temps donné."
  ],

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'Ce sont des contacts, pas des appareils. Cochez, puis validez.',
  aptitudes: {
    puissance: false, distance: true, maintien: false,
    bonneReponse: 'Exact. Ce sont des contacts auxiliaires, avec un frein. Ils obéissent à la bobine qui les commande, et ils ne portent rien.',
    erreurs: {
      puissance: 'Ce sont des contacts auxiliaires : fins, sans boîtier d’arc.',
      distance: 'Ils basculent quand la bobine qui les commande est alimentée — avec un retard, mais ils obéissent bien à distance.',
      maintien: 'Un retard n’est pas un maintien. Une fois le délai écoulé, le contact reprend sa position de repos.'
    }
  },

  cablage: [
    "Les contacts temporisés portent des repères de bornes distincts : <strong>67-68</strong> pour un NO temporisé, <strong>55-56</strong> pour un NF temporisé.",
    "Ces repères ne sont pas une convention locale : ils sont normalisés, et ils vous évitent de confondre deux blocs sur le même appareil.",
    "Un bloc temporisé se clipse sur le contacteur : il obéit à la <strong>même bobine</strong>, pas à une alimentation séparée.",
    "Un module autonome, lui, a sa propre alimentation. Vérifiez laquelle vous avez en face de vous avant de chercher une panne."
  ],
  piege: "Sur beaucoup de blocs, un contact temporisé et un contact instantané cohabitent. Les repères de bornes sont la seule façon fiable de les distinguer : ils ne se ressemblent pas de l’extérieur.",

  symboles: [
    { src: 'assets/con_simple_tmp_t.svg', alt: "Symbole normalisé d’un contact NO temporisé au travail.", legende: "NO, temporisé au travail" },
    { src: 'assets/con_simple_tmp_r.svg', alt: "Symbole normalisé d’un contact NO temporisé au repos.", legende: "NO, temporisé au repos" },
    { src: 'assets/con_simple_nf_tmp_t.svg', alt: "Symbole normalisé d’un contact NF temporisé au travail.", legende: "NF, temporisé au travail" },
    { src: 'assets/con_simple_nf_tmp_r.svg', alt: "Symbole normalisé d’un contact NF temporisé au repos.", legende: "NF, temporisé au repos" }
  ],
  lecturePlan: [
    "Le signe du temps est ce <strong>demi-cercle sur une hampe</strong>, accroché au contact. Tout le monde l’appelle le <strong>parachute</strong>, et l’image est bonne : un parachute freine.",
    "Il n’y a que deux choses à lire. D’abord le contact : penché à gauche sans barre, c’est un NO ; penché à droite avec sa barre, c’est un NF.",
    "Ensuite le <strong>sens du parachute</strong> : sa coupole est tournée d’un côté ou de l’autre, et c’est cela qui distingue le retard au travail du retard au repos.",
    "Comparez les quatre symboles ci-dessus deux par deux plutôt que de les apprendre isolément. C’est en les mettant côte à côte que la différence se voit."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Un contact repéré 67-68, c’est quoi ?",
      confirmation: "Un contact NO temporisé : les repères 67-68 lui sont réservés.",
      reponses: [
        { texte: "Un contact de puissance.", pourquoi: "La puissance porte 1/2, 3/4, 5/6, sans dizaine." },
        { texte: "Un contact NF temporisé.", pourquoi: "Le NF temporisé porte 55-56." },
        { texte: "Un contact NO temporisé.", juste: true },
        { texte: "Un contact NO instantané.", pourquoi: "Un NO instantané porte 13-14, 43-44." } ] },

    { question: "Une ventilation doit continuer trois minutes après l’arrêt. Quel contact ?",
      confirmation: "Un NO temporisé au repos : il ferme tout de suite et attend avant de rouvrir.",
      reponses: [
        { texte: "Un NO temporisé au travail.", pourquoi: "Il retarderait le démarrage de la ventilation, pas son arrêt." },
        { texte: "Un NF instantané.", pourquoi: "Sans temporisation, rien ne prolonge la marche." },
        { texte: "Un NF temporisé au travail.", pourquoi: "Il couperait la ventilation trois minutes après le démarrage." },
        { texte: "Un NO temporisé au repos.", juste: true } ] },

    { question: "Combien de signes différents faut-il savoir lire pour les contacts temporisés ?",
      confirmation: "Deux natures de contact multipliées par deux sens de retard : quatre.",
      reponses: [
        { texte: "Quatre.", juste: true },
        { texte: "Huit.", pourquoi: "C’est doubler à tort : le nombre de contacts d’un bloc ne change pas les symboles." },
        { texte: "Deux.", pourquoi: "Deux suffiraient si tous les contacts temporisés étaient des NO." },
        { texte: "Six.", pourquoi: "Il n’existe pas six combinaisons : le contact est NO ou NF, le retard porte sur l’un ou l’autre sens." } ] },

    { question: "Un bloc porte un contact 13-14 et un contact 67-68. Que faut-il en conclure ?",
      confirmation: "L’un est instantané, l’autre temporisé, sur le même appareil.",
      reponses: [
        { texte: "Que le bloc est défectueux.", pourquoi: "C’est un montage tout à fait normal et très répandu." },
        { texte: "Que l’un est instantané et l’autre temporisé.", juste: true },
        { texte: "Que le bloc est en 24 volts.", pourquoi: "Les repères de bornes ne disent rien de la tension." },
        { texte: "Qu’il y a deux appareils différents.", pourquoi: "Les repères peuvent très bien appartenir au même bloc." } ] }
  ],

  retenir: [
    "<strong>Le parachute</strong> est le signe du temps.",
    "<strong>Quatre symboles</strong> : NO ou NF, croisés avec travail ou repos.",
    "<strong>67-68</strong> pour un NO temporisé, <strong>55-56</strong> pour un NF temporisé.",
    "<strong>Comparez-les deux par deux.</strong> Isolés, ils ne se retiennent pas."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire les quatre symboles de contacts temporisés et reconnaître leurs repères de bornes.</p><p><strong>Limite.</strong> Le choix d’un mode de temporisation pour une séquence complète relève d’un cours de schématisation.</p>',

  credits: [
    { quoi: 'Photographies et planches', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/.../310_relays_contactors_contacts/02_contacts_cross_referencing/11_delayed_contacts/' } ],

  correspondances: [
    { ligne: 5, couleur: '#0f7b6c', texte: "5.5 Le relais temporisé" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.2 Le contact" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.10 Déchiffrer un symbole" } ]
});

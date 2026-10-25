/* ÉlectroRézo 8.2 — Le contact. */

ModeleSigne.construire({
  id: '8.2',
  vue3d: { modele: 'blocContacts', piece: 'pontNO' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 2',
  titre: "Le contact",
  lettre: 'contact',
  narration: NARRATION,

  prerequis: [
    { id: '3.1', quoi: "l’interrupteur" },
    { id: '8.1', quoi: "le trait et le point" },
  ],

  ceQuelleDit: "Un trait incliné, qui pivote par le bas : ici, le circuit peut s’ouvrir ou se fermer. C’est la lettre la plus fréquente de tout le schéma, après le trait lui-même.",
  ouOnLaVoit: "Dans presque tous les symboles d’appareillage. Ce qui change d’un appareil à l’autre, ce sont les signes qu’on lui accroche.",

  pourquoiCetteForme: [
    "<strong>Le trait part d’un pivot, en bas.</strong> Le dessin est un croquis de la pièce mobile, vue de côté : une lame qui tourne autour de ce pivot. Sur un appareil réel, la pièce mobile peut aussi être un pont qui glisse (voir la vue 3D ci-dessous) : le dessin reste le même, c’est la convention. Sur le vrai symbole, le pivot n’est pas marqué : il n’y a pas de point.",
    "<strong>Le trait est la pièce mobile</strong>, dessinée dans la position où elle laisse un vide.",
    "<strong>La règle qui compte : un contact est toujours dessiné au repos</strong> — personne n’appuie, aucune bobine n’est alimentée, la machine est à l’arrêt. Ce n’est pas forcément l’état où vous le trouverez.",
    "<strong>Normalement ouvert</strong> : au repos, il laisse un vide. <strong>Normalement fermé</strong> : au repos, il est déjà fermé, et le dessin porte un petit trait qui barre. Le second sert aux sécurités : un fil arraché ouvre le circuit et arrête la machine."
  ],

  /* Le fusible est un leurre de l'exercice : il n'a pas de contact, donc il n'est pas dans la carte « Les mots où elle entre ». */
  exercice: () => Signes.retrouver('contact', ['interrupteur', 'sectionneur', 'fusible']),
  motsOuOnLaTrouve: ['interrupteur', 'sectionneur'],
  motVedette: 'sectionneur',

  symbolesBiblio: [
    { src: 'assets/act_electromagnetique_no.svg', alt: "Symbole normalisé d’un contact à fermeture.", legende: "Contact à fermeture — NO" },
    { src: 'assets/act_electromagnetique_nf.svg', alt: "Symbole normalisé d’un contact à ouverture.", legende: "Contact à ouverture — NF" }
  ],
  duDessinAuPlan: [
    "Sur un vrai plan, ce trait vient <strong>très souvent accompagné</strong> : il porte la barre du sectionnement, le crochet du thermique, un demi-cercle au bout d’un double trait pour la temporisation.",
    "Le trait incliné dit seulement « ici, ça s’ouvre et ça se ferme ». <strong>Tout le reste est écrit autour de lui.</strong>",
    "Sur les deux symboles ci-dessus, à gauche du trait, vous voyez un petit arc et un pointillé : c’est l’électro-aimant qui commande ce contact, et le lien mécanique entre les deux (stations 8.6 et 8.7).",
    "Sur un plan, les numéros aux bornes le confirment : 13-14 pour un contact ouvert au repos, 21-22 pour un contact fermé au repos."
  ],

  quiz: [
    { question: "Sur un schéma, dans quel état un contact est-il dessiné ?",
      confirmation: "Au repos : rien n’appuie, aucune bobine n’est alimentée.",
      reponses: [
        { texte: "Dans l’état où il se trouve au moment du dessin.", pourquoi: "Le dessinateur ne photographie pas l’armoire : il applique une convention." },
        { texte: "Dans l’état le plus fréquent en service.", pourquoi: "Ce serait invérifiable, et différent d’une machine à l’autre." },
        { texte: "Toujours au repos.", juste: true },
        { texte: "Toujours fermé, pour montrer que le circuit fonctionne.", pourquoi: "Un schéma ne montre pas un fonctionnement : il montre un montage, dans un état conventionnel." } ] },

    { question: "À quoi sert un contact normalement fermé dans une sécurité ?",
      confirmation: "Un fil arraché ouvre le circuit et arrête la machine : la panne est du bon côté.",
      reponses: [
        { texte: "À permettre plusieurs points d’arrêt.", pourquoi: "C’est un effet possible, mais ce n’est pas la raison de fond." },
        { texte: "À rendre le montage plus rapide.", pourquoi: "La vitesse de manœuvre ne dépend pas du type de contact." },
        { texte: "À économiser un fil de câblage.", pourquoi: "Le nombre de fils est le même : ce n’est pas la raison." },
        { texte: "Parce qu’un fil coupé arrête la machine au lieu de la laisser tourner.", juste: true } ] },

    { question: "Quel signe distingue, sur le dessin, un contact ouvert au repos d’un contact fermé au repos ?",
      confirmation: "Le petit trait qui barre le contact fermé.",
      reponses: [
        { texte: "Un petit trait qui barre le contact fermé.", juste: true },
        { texte: "La position du pivot.", pourquoi: "Le pivot est au même endroit dans les deux cas." },
        { texte: "La couleur du trait.", pourquoi: "La couleur ne distingue pas un contact ouvert d’un contact fermé : c’est le petit trait qui le fait." },
        { texte: "L’épaisseur du trait.", pourquoi: "L’épaisseur varie avec l’échelle du tracé, elle ne code rien." } ] },

    { question: "Une cartouche de fusible porte-t-elle un contact ?",
      confirmation: "Rien ne s’ouvre ni ne se ferme dans une cartouche : quelque chose fond.",
      reponses: [
        { texte: "Cela dépend du modèle.", pourquoi: "Une cartouche n’a rien de mobile : elle fond. (Un fusible à percuteur peut commander un contact, mais ce contact est un autre élément, ajouté à côté.)" },
        { texte: "Non : elle fond, elle ne s’ouvre pas.", juste: true },
        { texte: "Oui, sinon elle ne pourrait pas couper.", pourquoi: "Elle coupe en fondant, pas en ouvrant un contact." },
        { texte: "Oui, un contact caché à l’intérieur de la cartouche.", pourquoi: "Il n’y a rien de mobile dans une cartouche : un fil, du sable, deux embouts." } ] }
  ],

  retenir: [
    "<strong>Le trait incliné = un contact.</strong> Ici, ça s’ouvre et ça se ferme.",
    "<strong>Toujours dessiné au repos</strong>, pas forcément dans l’état où vous le trouverez.",
    "Le petit trait qui barre = fermé au repos. C’est la lettre des sécurités.",
    "Une cartouche de fusible n’en a pas : elle fond."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître le contact sur n’importe quel symbole, savoir qu’il est toujours dessiné au repos, et distinguer le contact à fermeture du contact à ouverture.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/310_relays_contactors_contacts/03_contacts/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: "5.1 Le contact NO / NF" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.3 La barre du sectionnement" } ]
});

/* ÉlectroRézo 8.2 — Le contact. */

ModeleSigne.construire({
  id: '8.2',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 2',
  titre: "Le contact",
  lettre: 'contact',
  narration: NARRATION,

  ceQuelleDit: "Un trait incliné posé sur un point : ici, le circuit peut s’ouvrir ou se fermer. C’est la lettre la plus fréquente de tout le schéma, après le trait lui-même.",
  ouOnLaVoit: "Dans presque tous les symboles d’appareillage. Ce qui change d’un appareil à l’autre, ce sont les signes qu’on lui accroche.",

  pourquoiCetteForme: [
    "<strong>Le point est le pivot.</strong> La pièce mobile tourne autour de lui — le dessin est un croquis du mécanisme, vu de côté.",
    "<strong>Le trait est la pièce mobile</strong>, dessinée dans la position où elle laisse un vide.",
    "<strong>La règle qui compte : un contact est toujours dessiné au repos</strong> — personne n’appuie, aucune bobine n’est alimentée, la machine est à l’arrêt. Ce n’est pas forcément l’état où vous le trouverez.",
    "<strong>Normalement ouvert</strong> : au repos, il laisse un vide. <strong>Normalement fermé</strong> : au repos, il est déjà fermé, et le dessin porte un petit trait qui barre. Le second sert aux sécurités : un fil arraché ouvre le circuit et arrête la machine."
  ],

  motsOuOnLaTrouve: ['interrupteur', 'sectionneur', 'fusible'],
  motVedette: 'sectionneur',

  symbolesBiblio: [
    { src: 'assets/act_electromagnetique_no.svg', alt: "Symbole normalisé d’un contact à fermeture.", legende: "Contact à fermeture — NO" },
    { src: 'assets/act_electromagnetique_nf.svg', alt: "Symbole normalisé d’un contact à ouverture.", legende: "Contact à ouverture — NF" }
  ],
  duDessinAuPlan: [
    "Sur un vrai plan, ce trait ne vient <strong>jamais seul</strong> : il porte la barre du sectionnement, le crochet du thermique, un demi-disque de temporisation.",
    "Le trait incliné dit seulement « ici, ça s’ouvre et ça se ferme ». <strong>Tout le reste est écrit autour de lui.</strong>",
    "Les numéros aux bornes le confirment : 13-14 pour un contact ouvert au repos, 21-22 pour un contact fermé au repos."
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
        { texte: "La position du point pivot.", pourquoi: "Le pivot est au même endroit dans les deux cas." },
        { texte: "La couleur du trait.", pourquoi: "Un plan est noir et blanc : la couleur ne porte jamais l’information." },
        { texte: "L’épaisseur du trait.", pourquoi: "L’épaisseur varie avec l’échelle du tracé, elle ne code rien." } ] },

    { question: "Un fusible porte-t-il un contact ?",
      confirmation: "Rien ne s’ouvre ni ne se ferme dans un fusible : quelque chose fond.",
      reponses: [
        { texte: "Cela dépend du modèle.", pourquoi: "Aucun modèle de fusible n’a de contact : c’est la nature même de l’objet." },
        { texte: "Non : il fond, il ne s’ouvre pas.", juste: true },
        { texte: "Oui, sinon il ne pourrait pas couper.", pourquoi: "Il coupe en fondant, pas en ouvrant un contact." },
        { texte: "Oui, un contact caché à l’intérieur de la cartouche.", pourquoi: "Il n’y a rien de mobile dans une cartouche : un fil, du sable, deux embouts." } ] }
  ],

  retenir: [
    "<strong>Le trait incliné = un contact.</strong> Ici, ça s’ouvre et ça se ferme.",
    "<strong>Toujours dessiné au repos</strong>, jamais dans l’état où vous le trouverez.",
    "Le petit trait qui barre = fermé au repos. C’est la lettre des sécurités.",
    "Un fusible n’en a pas : il fond."
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

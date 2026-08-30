/* ÉlectroRézo 5.3 — Le contact auxiliaire et l’auto-maintien. */

ModeleAppareil.construire({
  id: '5.3', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 3',
  titre: "Le contact auxiliaire",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/bornes-a1-a2-et-auxiliaire.png',
      alt: "Schéma des bornes d’un contacteur Schneider : A1, A2, les contacts de puissance et le contact auxiliaire.",
      titre: "Où il se trouve.", sous: "Sur le même appareil, avec ses propres bornes." },
    { src: 'assets/biblio/trois-contacts-auxiliaires.png',
      alt: "Trois types de blocs auxiliaires pour contacteur : instantané latéral, temporisé, frontal.",
      titre: "Des blocs à ajouter.", sous: "Latéral, frontal, temporisé : on complète l’appareil." },
    { src: 'assets/biblio/positions-des-contacts.jpeg',
      alt: "Schéma d’un contacteur détaillant les positions et repères de ses différents contacts.",
      titre: "Chacun son repère.", sous: "13-14, 21-22 : le numéro dit tout." }
  ],
  creditPhoto: 'Documents de cours indexés dans la base inerWeb. Détail dans « Crédits ».',

  aQuoiCaSert: "À savoir où en est le contacteur, et à s’en servir. Le contact auxiliaire ne porte aucune puissance : il donne une information, et cette information sert à faire tenir le circuit tout seul.",
  ouOnLeTrouve: "Sur le contacteur lui-même : un ou deux contacts intégrés, plus des blocs qu’on clipse sur le côté ou sur le dessus quand il en faut davantage.",

  scene: () => SchemasCommande.autoMaintien(),

  technologie: [
    ["Le même porte-contacts", "les auxiliaires sont montés sur la barre qui porte les contacts de puissance. Ils basculent donc <strong>exactement</strong> en même temps."],
    ["Des pastilles fines", "quelques ampères tout au plus. Il n’y a pas de boîtier d’arc au-dessus : ces contacts ne sont pas faits pour couper de la puissance."],
    ["Des blocs additionnels", "quand les contacts intégrés ne suffisent pas, on clipse un bloc sur le côté ou en façade. Il se pilote par le même mouvement."],
    ["Le contact miroir", "un NF dont le constructeur garantit qu’il ne peut pas être fermé en même temps qu’un contact de puissance soudé. C’est un contact de sécurité."]
  ],

  variantes: [
    "<strong>NO (13-14, 43-44)</strong> — il se ferme quand le contacteur colle. C’est celui de l’auto-maintien.",
    "<strong>NF (21-22, 31-32)</strong> — il s’ouvre quand le contacteur colle. Il sert aux verrouillages : empêcher qu’un autre contacteur colle en même temps.",
    "<strong>Bloc latéral ou frontal</strong> — même fonction, encombrement différent. On choisit selon la place dans l’armoire.",
    "<strong>Bloc temporisé</strong> — le même contact, mais qui prend son temps. C’est l’objet des stations 5.5 et 5.6."
  ],

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'Le contact auxiliaire ne porte rien, et pourtant il est indispensable. Cochez, puis validez.',
  aptitudes: {
    puissance: false, distance: true, maintien: false,
    bonneReponse: 'Exact. Il n’a aucune puissance, il ne garde rien tout seul — et il est pourtant ce qui permet à un circuit de se tenir. Regardez bien la scène ci-dessus : c’est lui qui ferme la boucle.',
    erreurs: {
      puissance: 'Ses pastilles sont fines et il n’a pas de boîtier d’arc. Y brancher un moteur, c’est les souder au premier démarrage.',
      distance: 'Il bouge quand la bobine du contacteur colle : il obéit donc bien à distance, comme le reste de l’appareil.',
      maintien: 'Il ne garde rien par lui-même : il retombe avec le contacteur. Le maintien est le résultat d’un <em>montage</em>, pas d’une propriété de la pièce.'
    }
  },

  cablage: [
    "L’<strong>auto-maintien</strong> se câble en mettant le contact 13-14 <strong>en parallèle</strong> sur le bouton de marche.",
    "Le bouton d’arrêt, lui, se met <strong>en série</strong> — et en NF. S’il était en parallèle, il ne pourrait rien arrêter.",
    "Le <strong>verrouillage</strong> de deux contacteurs se fait avec leurs contacts NF croisés : le 21-22 de l’un dans la bobine de l’autre, et réciproquement.",
    "Un auxiliaire peut aussi partir vers un voyant, un automate, un compteur d’heures. Il informe autant qu’il commande."
  ],
  piege: "Ne branchez jamais une charge de puissance sur un contact auxiliaire, même « juste pour essayer ». Les pastilles sont fines et il n’y a pas de chambre de coupure : elles se soudent, et le contacteur reste collé sans que rien ne le commande.",

  symboles: [
    { src: 'assets/con_simple.svg', alt: "Symbole normalisé d’un contact auxiliaire normalement ouvert.", legende: "NO — 13-14" },
    { src: 'assets/con_simple_nf.svg', alt: "Symbole normalisé d’un contact auxiliaire normalement fermé.", legende: "NF — 21-22" },
    { src: 'assets/contnonc.svg', alt: "Symbole normalisé d’un contact auxiliaire inverseur.", legende: "Inverseur" },
    { src: 'assets/mirror_switch_nc.svg', alt: "Symbole normalisé d’un contact miroir, normalement fermé et de sécurité.", legende: "Contact miroir" }
  ],
  lecturePlan: [
    "Sur un plan, le contact auxiliaire porte le <strong>même repère que la bobine</strong> qui le commande : KM1 sous la bobine, KM1 sous le contact.",
    "Le lien n’est presque jamais dessiné. Il est écrit. C’est ce que la station 8.9 appelait « le repère fait le lien que le dessin ne peut pas faire ».",
    "Cherchez le <strong>13-14 en parallèle sur le bouton de marche</strong> : dès que vous le voyez, vous savez que le circuit se maintient tout seul.",
    "C’est la figure la plus fréquente de toute la commande industrielle. Une fois repérée, elle se reconnaît partout."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Où se câble le contact 13-14 dans un auto-maintien ?",
      confirmation: "En parallèle sur le bouton de marche : il prend le relais du doigt.",
      reponses: [
        { texte: "En série avec la bobine.", pourquoi: "En série, il n’ajouterait aucun chemin : le circuit ne pourrait jamais se fermer au départ." },
        { texte: "Dans le circuit de puissance.", pourquoi: "Un auxiliaire n’a rien à faire dans la puissance : ses pastilles sont fines." },
        { texte: "En série avec le bouton d’arrêt.", pourquoi: "C’est la place du bouton d’arrêt lui-même, pas celle du contact de maintien." },
        { texte: "En parallèle sur le bouton de marche.", juste: true } ] },

    { question: "Le bouton d’arrêt est en série et normalement fermé. Pourquoi pas en parallèle ?",
      confirmation: "En parallèle, il créerait un chemin de plus au lieu d’en couper un.",
      reponses: [
        { texte: "Parce qu’il faut couper la boucle, et qu’on ne coupe une boucle qu’en série.", juste: true },
        { texte: "Parce qu’un NF ne se câble jamais en parallèle.", pourquoi: "Rien ne l’interdit techniquement — c’est ici la fonction qui impose la série." },
        { texte: "Parce que ce serait plus long à câbler.", pourquoi: "La longueur de câble n’entre pas en compte dans ce choix." },
        { texte: "Parce que la norme l’exige sans autre raison.", pourquoi: "La raison est fonctionnelle : elle se démontre sur le schéma." } ] },

    { question: "Peut-on brancher un petit ventilateur sur un contact auxiliaire ?",
      confirmation: "Pas de chambre de coupure, pastilles fines : elles se soudent.",
      reponses: [
        { texte: "Oui, s’il consomme moins de 10 ampères.", pourquoi: "Ce n’est pas qu’une question d’ampères : c’est l’arc de coupure qui détruit les pastilles." },
        { texte: "Non : il n’est pas fait pour couper une charge de puissance.", juste: true },
        { texte: "Oui, si le contacteur est neuf.", pourquoi: "Neuf ou pas, le contact n’est pas conçu pour cela." },
        { texte: "Oui, c’est un contact comme un autre.", pourquoi: "Il n’a ni la masse de métal, ni le boîtier d’arc d’un contact de puissance." } ] },

    { question: "À quoi sert un contact NF sur un contacteur ?",
      confirmation: "À verrouiller : empêcher qu’un autre contacteur colle en même temps.",
      reponses: [
        { texte: "À protéger la bobine.", pourquoi: "La protection de la bobine, s’il y en a une, se fait par un fusible de commande." },
        { texte: "À couper la puissance plus vite.", pourquoi: "Un auxiliaire n’intervient jamais dans la coupure de puissance." },
        { texte: "À verrouiller un autre contacteur pour qu’ils ne collent jamais ensemble.", juste: true },
        { texte: "À faire l’auto-maintien.", pourquoi: "L’auto-maintien se fait avec un NO : il faut fermer un chemin, pas l’ouvrir." } ] }
  ],

  retenir: [
    "<strong>Il ne porte rien</strong>, mais il fait tenir le circuit.",
    "<strong>13-14 en parallèle</strong> sur le bouton de marche : c’est l’auto-maintien.",
    "<strong>Le bouton d’arrêt est en série</strong>, en NF.",
    "<strong>Même repère que la bobine.</strong> C’est le même appareil, à deux endroits du plan."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre le circuit d’auto-maintien : pourquoi le contacteur reste collé après qu’on a relâché le bouton, et où se câblent la marche et l’arrêt.</p><p><strong>Limite.</strong> Les schémas à plusieurs postes de commande et les verrouillages complexes ne sont pas traités ici.</p>',

  credits: [
    { quoi: 'Photographies et planches', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/310_relays_contactors_contacts/' } ],

  correspondances: [
    { ligne: 5, couleur: '#0f7b6c', texte: "5.2 Le contacteur" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.9 Les repères" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.9 Lire un schéma complet" } ]
});

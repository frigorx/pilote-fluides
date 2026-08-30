/* ÉlectroRézo 8.6 — Le déclencheur magnétique. */

ModeleSigne.construire({
  id: '8.6',
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 6',
  titre: "Le déclencheur magnétique",
  lettre: 'magnetique',
  narration: NARRATION,

  ceQuelleDit: "Un demi-cercle traversé par le fil. Il dit : cet appareil surveille l’intensité, et il réagit tout de suite.",
  ouOnLaVoit: "Sur le disjoncteur magnéto-thermique et sur le disjoncteur moteur, presque toujours juste sous le crochet du thermique.",

  pourquoiCetteForme: [
    "<strong>Le demi-cercle représente une bobine vue en coupe.</strong> Quelques spires de gros fil, montées directement sur le circuit.",
    "En courant normal, elle ne fait rien. <strong>En court-circuit, le courant devient énorme d’un coup</strong> : la bobine devient un aimant puissant et attire violemment un noyau de fer, qui frappe le mécanisme.",
    "<strong>Déclenchement en quelques millièmes de seconde.</strong>",
    "<strong>Le couple à retenir</strong> : crochet = la chaleur, la durée, la surcharge. Demi-cercle = l’aimant, l’instant, le court-circuit. Un appareil qui porte les deux protège contre les deux."
  ],

  motsOuOnLaTrouve: ['magnetoThermique', 'disjoncteurMoteur', 'relaisThermique'],
  motVedette: 'disjoncteurMoteur',

  symbolesBiblio: [
    { src: 'assets/dis_mag_term_2f-1.svg', alt: "Symbole normalisé d’un disjoncteur magnéto-thermique.", legende: "Un disjoncteur magnéto-thermique" }
  ],
  duDessinAuPlan: [
    "Sur les symboles officiels, il se dessine aussi comme <strong>un rectangle contenant un demi-disque</strong>. La forme varie selon les éditions, l’idée ne varie jamais.",
    "<strong>Lisez les deux signes ensemble</strong> : leur présence ou leur absence est la fiche technique de l’appareil.",
    "Un appareil qui ne porte que le crochet ne vous protégera <strong>jamais</strong> d’un court-circuit. Ce n’est pas caché : c’est écrit sur le symbole."
  ],

  quiz: [
    { question: "Que représente le demi-cercle ?",
      confirmation: "Une bobine vue en coupe, qui devient un aimant.",
      reponses: [
        { texte: "Un aimant permanent.", pourquoi: "Un aimant permanent n’aurait aucune raison de réagir au courant." },
        { texte: "Le boîtier arrondi de l’appareil.", pourquoi: "La norme ne dessine jamais les boîtiers." },
        { texte: "Une bobine, qui attire un noyau quand le courant devient énorme.", juste: true },
        { texte: "Un condensateur.", pourquoi: "Le condensateur a son propre signe : deux traits parallèles." } ] },

    { question: "En combien de temps agit un déclencheur magnétique ?",
      confirmation: "Quelques millièmes de seconde.",
      reponses: [
        { texte: "En quelques secondes.", pourquoi: "Encore trop lent pour un court-circuit." },
        { texte: "En quelques dizaines de secondes.", pourquoi: "Beaucoup trop long : un court-circuit détruirait tout avant." },
        { texte: "En quelques minutes.", pourquoi: "Ce serait le temps d’un bilame très chargé, pas d’un aimant." },
        { texte: "En quelques millièmes de seconde.", juste: true } ] },

    { question: "Un symbole porte le crochet ET le demi-cercle. Cet appareil…",
      confirmation: "Il voit la surcharge lente et le court-circuit brutal.",
      reponses: [
        { texte: "Protège contre la surcharge et contre le court-circuit.", juste: true },
        { texte: "Est un appareil de mesure.", pourquoi: "Les appareils de mesure ont leurs propres symboles, avec une lettre dans un cercle." },
        { texte: "Est en double exemplaire sur le plan.", pourquoi: "Un même appareil n’est pas dessiné deux fois au même endroit." },
        { texte: "A deux réglages indépendants obligatoires.", pourquoi: "Le magnétique est souvent fixe ; seul le thermique se règle couramment." } ] },

    { question: "Pourquoi un relais thermique seul est-il insuffisant en tête d’un départ moteur ?",
      confirmation: "Il ne voit pas le court-circuit : il faut un fusible ou un magnétique en plus.",
      reponses: [
        { texte: "Parce qu’il est trop cher.", pourquoi: "Le coût n’a aucun rapport avec la protection assurée." },
        { texte: "Parce qu’il ne voit pas le court-circuit.", juste: true },
        { texte: "Parce qu’il chauffe trop.", pourquoi: "Son échauffement est normal et prévu : c’est son principe." },
        { texte: "Parce qu’il n’a pas de contact.", pourquoi: "Il en a : c’est par lui qu’il coupe la commande." } ] }
  ],

  retenir: [
    "<strong>Le demi-cercle = une bobine</strong> qui claque sur un court-circuit.",
    "Il surveille <strong>l’intensité</strong>, et il est <strong>instantané</strong>.",
    "Crochet + demi-cercle = protégé contre les deux dangers.",
    "Crochet seul = <strong>aucune protection contre le court-circuit</strong>."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître le déclencheur magnétique, comprendre ce qui le rend instantané, et lire la fiche technique d’un appareil dans la présence ou l’absence des deux signes.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/200_fuses_protective_gears/12_magneto_thermal_circuit_breakers/' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 4, couleur: '#c0392b', texte: "4.3 Disjoncteur magnéto-thermique" },
    { ligne: 4, couleur: '#c0392b', texte: "4.4 Le disjoncteur moteur" } ]
});

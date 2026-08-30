/* ÉlectroRézo 5.5 — Le relais temporisé. */

ModeleAppareil.construire({
  id: '5.5', ligne: 5,
  kicker: 'ÉlectroRézo · Ligne 5 Commander · Station 5',
  titre: "Le relais temporisé",
  narration: NARRATION,

  photos: [
    { src: 'assets/biblio/bloc-temporise-sur-contacteur.png',
      alt: "Schéma du câblage d’un contacteur équipé d’un bloc temporisé clipsé en façade.",
      titre: "Un bloc à clipser.", sous: "Il se monte sur un contacteur ordinaire." },
    { src: 'assets/biblio/bloc-temporise-la2-dt2.png',
      alt: "Photo d’un bloc temporisé LA2 DT2 : sa molette graduée occupe toute la face avant.",
      titre: "La molette.", sous: "Elle occupe toute la face : c’est le seul réglage visible." }
  ],
  creditPhoto: 'Documents de cours indexés dans la base inerWeb. Détail dans « Crédits ».',

  aQuoiCaSert: "À faire attendre un circuit. Démarrer une ventilation avant un compresseur, laisser une pompe finir sa course, empêcher un moteur de repartir aussitôt après un arrêt. Chaque fois qu’un ordre doit arriver plus tard.",
  ouOnLeTrouve: "Dans toutes les armoires de froid et de climatisation, où presque rien ne doit démarrer en même temps ; dans les démarrages étoile-triangle ; partout où il faut protéger une machine d’un redémarrage trop rapide.",

  scene: () => SchemasCommande.deuxTemporisations(),

  technologie: [
    ["Un relais ordinaire", "avec la même bobine et les mêmes contacts que la station précédente. La temporisation ne change rien à cette partie."],
    ["Le compteur de temps", "aujourd’hui un circuit électronique qui charge un condensateur. Autrefois un mécanisme d’horlogerie, ou un piston qui laissait fuir de l’air par un petit trou."],
    ["Le réglage", "une molette graduée, souvent doublée d’un sélecteur d’échelle : secondes, dizaines de secondes, minutes, heures."],
    ["Le voyant", "il clignote souvent pendant le comptage et devient fixe quand le temps est écoulé. C’est très utile au dépannage."]
  ],

  variantes: [
    "<strong>Temporisé au travail</strong> — on alimente la bobine, et le contact attend le délai réglé avant de basculer. À la coupure, il revient tout de suite. C’est le plus courant.",
    "<strong>Temporisé au repos</strong> — le contact bascule tout de suite à l’alimentation. C’est <strong>à la coupure</strong> qu’il attend le délai avant de revenir.",
    "<strong>Clignoteur</strong> — il bascule sans arrêt, à intervalle réglé. Pour un gyrophare, un signal d’alerte.",
    "<strong>Multifonction</strong> — un seul boîtier, un sélecteur, et il fait tous les modes. Très répandu aujourd’hui, et source d’erreurs : le sélecteur se déplace facilement."
  ],
  reglage: "Deux choses à régler, et beaucoup de gens n’en règlent qu’une. La <strong>valeur</strong>, avec la molette ; et l’<strong>échelle</strong>, avec le sélecteur. Un délai de trente réglé sur l’échelle des minutes, ce sont trente minutes d’attente — et un dépanneur qui conclut à une panne. Vérifiez toujours les deux.",

  picto: SchemasCommande.pictoTrois,
  colonnes: SchemasCommande.COLONNES,
  consigneAptitudes: 'Un relais qui compte. Cochez ce qu’il sait faire, puis validez.',
  aptitudes: {
    puissance: false, distance: true, maintien: false,
    bonneReponse: 'Exact — c’est un relais, avec un compteur en plus. Attention : compter n’est pas garder. Coupez sa bobine et il retombe, exactement comme un relais ordinaire.',
    erreurs: {
      puissance: 'Comme tout relais, ses contacts sont fins. Le temps ne change rien à ce qu’ils peuvent porter.',
      distance: 'Sa bobine se commande comme celle de n’importe quel relais.',
      maintien: 'C’est la confusion la plus fréquente : un relais temporisé <em>attend</em>, il ne <em>garde</em> pas. Une fois la bobine coupée, il retombe — après son délai s’il est temporisé au repos, tout de suite sinon.'
    }
  },

  cablage: [
    "La bobine se raccorde en <strong>A1</strong> et <strong>A2</strong>, comme tout relais.",
    "Les contacts temporisés portent des repères à part : souvent <strong>67-68</strong> pour un NO temporisé, <strong>55-56</strong> pour un NF temporisé.",
    "Certains modules ont aussi des <strong>contacts instantanés</strong>, qui basculent sans attendre. Les deux familles cohabitent dans le même boîtier : lisez bien les repères.",
    "Vérifiez la <strong>tension d’alimentation</strong> du module. Beaucoup acceptent une large plage, mais pas tous."
  ],
  piege: "Une temporisation ne remplace jamais une sécurité. Attendre trois minutes avant de redémarrer un compresseur est une bonne pratique ; ce n’est pas ce qui empêchera le moteur de brûler si le pressostat est en défaut.",

  symboles: [
    { src: 'assets/bobine_tempo_travail.svg', alt: "Symbole normalisé de la bobine d’un relais temporisé au travail.", legende: "Temporisé au travail" },
    { src: 'assets/bobine_tempo_repos.svg', alt: "Symbole normalisé de la bobine d’un relais temporisé au repos.", legende: "Temporisé au repos" },
    { src: 'assets/bobine_tempo_repos-travail.svg', alt: "Symbole normalisé de la bobine d’un relais temporisé au travail et au repos.", legende: "Les deux" }
  ],
  lecturePlan: [
    "La bobine d’un relais temporisé est celle d’un relais ordinaire, avec un <strong>petit rectangle ajouté sur le côté droit</strong>.",
    "Ce rectangle est <strong>plein</strong> pour la temporisation au repos, et <strong>barré en croix</strong> pour la temporisation au travail. Regardez-le de près : c’est lui qui porte l’information.",
    "Le <strong>repère</strong> est souvent <strong>KT</strong> — T pour <em>temps</em>. Encore deux lettres qui vous disent la famille avant tout examen du dessin.",
    "Et à côté, la <strong>valeur du délai</strong> est écrite. Elle n’est jamais dans le dessin : ni la molette, ni l’échelle ne se dessinent."
  ],

  tableau: SchemasCommande.tableauCommande,
  tableauTitre: 'Les appareils de la ligne 5',

  quiz: [
    { question: "Un relais temporisé au travail : que fait son contact quand on alimente la bobine ?",
      confirmation: "Il attend le délai réglé, puis bascule.",
      reponses: [
        { texte: "Il bascule tout de suite.", pourquoi: "Ce serait un contact instantané : la temporisation n’aurait aucun effet." },
        { texte: "Il attend le délai réglé, puis bascule.", juste: true },
        { texte: "Rien, tant qu’on n’a pas coupé.", pourquoi: "C’est la temporisation au repos qui agit à la coupure." },
        { texte: "Il bascule puis revient après le délai.", pourquoi: "C’est le comportement d’un relais à impulsion, pas d’une temporisation au travail." } ] },

    { question: "Un délai est réglé sur « 30 » et la machine attend une demi-heure. Que vérifier ?",
      confirmation: "L’échelle : 30 secondes ou 30 minutes, ce n’est pas la même molette.",
      reponses: [
        { texte: "L’état des contacts.", pourquoi: "Des contacts usés ne modifient pas la durée mesurée." },
        { texte: "Le calibre du contacteur.", pourquoi: "Le contacteur n’intervient pas dans le comptage du temps." },
        { texte: "Le sélecteur d’échelle : secondes ou minutes.", juste: true },
        { texte: "La tension d’alimentation du module.", pourquoi: "Une tension incorrecte empêcherait le module de fonctionner, pas d’allonger le délai." } ] },

    { question: "Un relais temporisé garde-t-il sa position quand on coupe sa bobine ?",
      confirmation: "Non : il attend, il ne garde pas. C’est le bistable qui garde.",
      reponses: [
        { texte: "Oui, pendant la durée réglée.", pourquoi: "Attendre avant de retomber n’est pas garder : au bout du délai, il retombe quand même." },
        { texte: "Cela dépend du calibre.", pourquoi: "Le calibre ne dit rien du maintien." },
        { texte: "Oui, définitivement.", pourquoi: "Seul un relais bistable se comporte ainsi." },
        { texte: "Non : il retombe, comme tout relais.", juste: true } ] },

    { question: "Sur un plan, la bobine porte un petit rectangle sur le côté. Qu’annonce-t-il ?",
      confirmation: "Une temporisation. Sa forme dit dans quel sens elle agit.",
      reponses: [
        { texte: "Qu’il s’agit d’une temporisation.", juste: true },
        { texte: "Que le relais est protégé par un fusible.", pourquoi: "La protection se dessine à part, sur le conducteur." },
        { texte: "Que la bobine est en courant continu.", pourquoi: "Le continu se note autrement, par un trait dans la bobine." },
        { texte: "Que le relais est bistable.", pourquoi: "Le bistable porte une marche d’escalier, pas un rectangle latéral." } ] }
  ],

  retenir: [
    "<strong>Un relais qui compte.</strong> Rien de plus, rien de moins.",
    "<strong>Au travail</strong> : il attend avant de fermer. <strong>Au repos</strong> : il attend avant de rouvrir.",
    "<strong>Deux réglages</strong> : la valeur et l’échelle. Vérifiez les deux.",
    "<strong>Attendre n’est pas garder.</strong> Il retombe comme les autres."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre ce qu’un relais temporisé fait du temps, distinguer temporisé au travail et temporisé au repos, et savoir régler valeur et échelle.</p><p><strong>Limite.</strong> Les temporisations d’automate programmable ne sont pas traitées : le principe est le même, la mise en œuvre est différente.</p>',

  credits: [
    { quoi: 'Photographies et planches', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs' },
    { quoi: 'Symboles normalisés EN 60617', source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/310_relays_contactors_contacts/01_coils/' } ],

  correspondances: [
    { ligne: 5, couleur: '#0f7b6c', texte: "5.4 Le relais électromécanique" },
    { ligne: 5, couleur: '#0f7b6c', texte: "5.6 Les contacts temporisés" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage étoile-triangle" } ]
});

/* CartoClim 3.6 — Le roof-top : tout sur le toit. Station écrite le 02/10/2026 sur le moule de 3.2. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '3.6', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 6',
  titre: "Le roof-top : tout sur le toit",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" },
    { id: '3.2', quoi: "le split : deux unités, un circuit — pour voir ce qui change" }
  ],

  photos: [
    { src: 'assets/biblio/d916bcf4ad.jpeg',
      alt: "Un roof-top vu de l’extérieur : un grand caisson rectangulaire clair, avec un auvent d’entrée d’air à gauche et un ventilateur sur le dessus, posé sur un socle métallique.",
      titre: "Un seul caisson.", sous: "Tout est dedans : l’air, le froid, le ventilateur." },
    { src: 'assets/biblio/387f8d6ebc.jpeg',
      alt: "Le même type d’appareil, ouvert : à gauche l’entrée d’air neuf avec son filtre, le caisson de mélange, la batterie froide et le ventilateur ; à droite le compresseur, le ventilateur à hélice et la batterie du condenseur ; dessous, l’embase qui relie l’appareil au toit.",
      titre: "Ouvert : l’air d’un côté, le froid de l’autre.", sous: "Les noms des pièces sont sur la photo ; le dessin du temps 2 les remet en marche." },
    { src: 'assets/biblio/d75a6b7e09.jpeg',
      alt: "Un hélicoptère léger descend un caisson métallique sur un toit en cours d’étanchéité, guidé par quelques personnes.",
      titre: "Livré d’un bloc, posé d’en haut.", sous: "Il arrive complet : on le pose parfois avec un hélicoptère." }
  ],

  aQuoiCaSert: "À <strong>climatiser un grand volume depuis le toit</strong>. Le roof-top est un caisson unique qui contient <strong>tout</strong> : le circuit frigorifique complet, une batterie qui refroidit (ou chauffe) l’air, un ventilateur qui le pousse dans des gaines, une entrée d’air neuf, des filtres. C’est une <strong>centrale de traitement d’air qui a son propre froid</strong>. « Roof-top » veut dire : sur le toit.",
  ouOnLeTrouve: "Sur le toit d’un supermarché, d’un entrepôt, d’une salle de sport, d’un atelier : là où beaucoup de monde occupe une grande surface. De la salle, on ne voit que les bouches de soufflage au plafond ; toute la machine est dehors. Et, contrairement au split, <strong>il renouvelle l’air</strong>.",

  scene: () => ScenesStation.roofTopEnCoupe(),

  titreDedans: 'Ce qu’il y a dedans',
  technologie: [
    ["Le compartiment de l’air", "conçu comme une centrale de traitement d’air : un <strong>caisson de mélange</strong> avec ses volets motorisés (air repris de la salle + air neuf du dehors), des <strong>filtres</strong>, la <strong>batterie</strong> à ailettes qui refroidit l’air ou le chauffe, et un <strong>ventilateur centrifuge</strong> qui le souffle dans les gaines."],
    ["Le compartiment du froid", "à côté, le <strong>groupe frigorifique</strong> complet : un ou deux <strong>compresseurs</strong>, le <strong>condenseur</strong> balayé par une <strong>hélice</strong>, le <strong>détendeur</strong>. Et l’<strong>armoire électrique</strong>, qui regroupe la puissance et la régulation."],
    ["Le cycle", "le même que dans toute machine frigorifique : la batterie du compartiment de l’air est l’<strong>évaporateur</strong> — le fluide s’y évapore en prenant la chaleur de l’air —, le compresseur le comprime, le condenseur rejette la chaleur dehors, le détendeur ramène le liquide à la batterie. Seul le décor change : tout est dans un caisson."],
    ["L’air neuf", "les volets du caisson de mélange sont <strong>motorisés</strong> : la part d’air neuf se règle selon la fréquentation. Quand il fait plus frais dehors que dans la salle, on peut ouvrir grand l’air neuf et laisser les compresseurs au repos : c’est le rafraîchissement par l’air extérieur (<em>free-cooling</em> dans les documents techniques)."]
  ],

  variantes: [
    "<strong>Froid seul ou réversible</strong> — réversible : une vanne 4 voies inverse le sens du fluide. La batterie du caisson chauffe l’air l’hiver, et la batterie de dehors devient évaporateur. C’est le bouton « mode chaud » du dessin, et la station 2.6.",
    "<strong>Avec un brûleur à gaz</strong> — pour le chauffage d’hiver : un module gaz est placé dans le courant d’air du compartiment de l’air. Le froid, lui, reste fourni par le circuit frigorifique.",
    "<strong>Avec une batterie d’appoint</strong> — à eau chaude ou électrique. Si elle est à eau chaude, la production d’eau chaude n’est pas dans l’appareil.",
    "<strong>Avec ou sans extraction</strong> — un second ventilateur peut reprendre de l’air à la salle pour le rejeter dehors, en face de l’air neuf qui entre.",
    "<strong>Soufflage par le dessous ou à l’horizontale</strong> — la plupart des appareils soufflent et reprennent par le dessous, d’autres à l’horizontale.",
    "<strong>Le même travail, par l’eau glacée</strong> — quand le froid vient d’un groupe d’eau glacée et non d’un circuit intégré, on parle d’une centrale de traitement d’air classique : stations 3.8 et 3.9."
  ],
  reglage: "L’<strong>armoire électrique</strong> de l’appareil porte la régulation : elle ouvre les volets pour doser l’air neuf, lance les compresseurs (ou le brûleur) selon la demande, et fait tourner le ventilateur. La consigne se règle sur le régulateur. Pour la lecture d’un régulateur : station 5.2.",

  consigneAptitudes: 'Le roof-top posé sur le toit du magasin : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un roof-top ?',
  colonnes: [
    { id: 'volume', libelle: 'Un grand volume', aide: 'traiter l’air d’un magasin ou d’un entrepôt : le filtrer, le refroidir ou le chauffer, le souffler',
      dessin: '<path d="M6 88 V46 L50 20 L94 46 V88 Z"/><path d="M22 62 q7 -7 14 0 t14 0 t14 0 t14 0"/><path d="M22 76 q7 -7 14 0 t14 0 t14 0 t14 0"/>' },
    { id: 'airneuf', libelle: 'Renouveler l’air', aide: 'faire entrer de l’air neuf venu de dehors, mélangé à l’air repris', dessin: SceneKit.pictos.DESSINS.air },
    { id: 'chambre', libelle: 'Une chambre', aide: 'se poser dans une chambre, comme un split mural',
      dessin: '<path d="M8 76 V30 M8 60 H92 V76 M8 76 H92"/><path d="M20 60 V46 H44 V60"/><path d="M52 60 V50 H84 q8 0 8 10"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    volume: true, airneuf: true, chambre: false,
    bonneReponse: 'Exact. Il traite l’air d’un grand volume, et il renouvelle l’air : c’est ce qui le distingue du split, qui ne fait que brasser l’air de la pièce. Mais il ne se pose pas dans une chambre : il lui faut un toit, de grandes gaines et un volume à sa mesure.',
    erreurs: {
      volume: 'C’est son métier : un caisson complet, avec son propre froid, pour un commerce, un entrepôt, une salle de sport — de grands volumes où l’on est nombreux.',
      airneuf: 'Il a un caisson de mélange : l’air repris de la salle est mélangé à de l’air neuf venu de dehors, dans une proportion que les volets règlent. Un split, lui, n’en fait entrer aucun.',
      chambre: 'Il est conçu pour la toiture d’un grand local et se raccorde sur des gaines. Pour une chambre, on pose un split ou un climatiseur mobile : stations 3.2 et 3.1.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Les gaines d’air</strong> : l’appareil se pose sur une <strong>embase</strong> (ou costière) qui le relie à la toiture. La gaine de reprise et la gaine de soufflage se raccordent <strong>sous l’appareil</strong>, sur l’embase. On peut ainsi tirer les gaines avant l’étanchéité et la livraison de l’appareil.",
    "<strong>L’alimentation électrique</strong> : une arrivée de puissance sur l’armoire électrique de l’appareil, protégée par son disjoncteur. Les câbles passent par l’embase. Station 4.5.",
    "<strong>Le gaz ou l’eau chaude</strong>, si l’appareil a un brûleur ou une batterie à eau chaude : un raccordement de plus sur le chantier.",
    "<strong>Les condensats</strong> : l’eau de la batterie froide s’évacue par un tuyau, jusqu’à une évacuation. Station 4.4.",
    "<strong>Pas de liaisons frigorifiques à tirer</strong> : le groupe froid est dans le même caisson. L’appareil est livré prêt à l’emploi."
  ],
  piege: "<strong>Le toit est un chantier en hauteur.</strong> Avant tout, un accès sûr et une protection contre la chute : on ne monte pas sans. Puis deux oublis qui reviennent : les <strong>filtres</strong>, grands et vite encrassés, qui étouffent l’air soufflé ; et les <strong>condensats</strong> — sur un toit, l’hiver, l’eau gèle et bouche l’évacuation.",

  symboles: [
    { src: 'assets/roof-top-simple.svg', alt: "Symbole d’un roof-top : un caisson posé sur le toit, représenté par une bande bleue. À gauche, deux gaines courbes descendent dans le bâtiment, l’une avec une flèche vers le bas (le soufflage), l’autre avec une flèche vers le haut (la reprise). À droite du caisson, les traits serrés d’une batterie à ailettes, avec un ventilateur sur le dessus.", legende: "Roof-top (centrale de toiture à détente directe)" }
  ],
  titreLecturePlan: 'Le lire sur un plan',
  lecturePlan: [
    "Comme le symbole, le roof-top est dessiné <strong>en toiture</strong>, posé sur le toit. Deux <strong>gaines</strong> en partent, une de reprise (flèche vers le haut) et une de soufflage (flèche vers le bas) : elles descendent dans le bâtiment et sont tracées jusqu’aux bouches. Sans elles, l’appareil ne sert à rien.",
    "Sur un schéma de principe, on suit <strong>trois flux d’air</strong> : l’<strong>air repris</strong> (de la salle), l’<strong>air neuf</strong> (de dehors), l’<strong>air soufflé</strong> (vers la salle). Le sens des flèches dit ce qui entre, ce qui est mélangé, ce qui sort.",
    "Les symboles du caisson — registres, filtres, batterie, ventilateur — se lisent <strong>comme sur une centrale de traitement d’air</strong> : voyez AéroRézo, « Lire une CTA » et « Mélange et filtration ».",
    "Le <strong>passage pour y accéder</strong> et les <strong>dégagements</strong> autour de l’appareil figurent aussi sur le plan : un appareil qu’on ne peut pas atteindre ne s’entretient pas. Les cotes viennent de la notice.",
    "Dans les documents techniques, le roof-top s’appelle aussi <strong>UAT</strong> : unité autonome de toiture."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Ce qu’on raccorde sur le toit',

  quiz: [
    { question: "Que contient le caisson d’un roof-top ?",
      confirmation: "Tout : le circuit frigorifique complet, une batterie, un ventilateur, des filtres et une entrée d’air neuf.",
      reponses: [
        { texte: "Seulement le compresseur et le condenseur.", pourquoi: "Ce serait l’unité extérieure d’un split. Le roof-top contient aussi l’air : batterie, filtres, ventilateur, entrée d’air neuf." },
        { texte: "Seulement une batterie et un ventilateur : le froid vient d’un groupe d’eau glacée.", pourquoi: "C’est une centrale de traitement d’air classique. Le roof-top, lui, a son propre froid dans le même caisson." },
        { texte: "Le circuit frigorifique, une batterie, un ventilateur, des filtres, une entrée d’air neuf.", juste: true },
        { texte: "Un brûleur à gaz, toujours.", pourquoi: "Le brûleur est une option pour l’hiver : tous les roof-top n’en ont pas." } ] },

    { question: "Quelle est la grande différence avec un split ?",
      confirmation: "Il renouvelle l’air : de l’air neuf entre et se mélange à l’air de la salle.",
      reponses: [
        { texte: "Il est plus silencieux.", pourquoi: "Le bruit n’est pas ce qui le distingue. Sa vraie différence concerne l’air que reçoit la salle." },
        { texte: "Il n’a pas de compresseur.", pourquoi: "Il en a un ou deux, dans le compartiment du froid. Sans compresseur, pas de froid." },
        { texte: "Il se raccorde avec deux tubes de cuivre.", pourquoi: "C’est le split. Un roof-top est un monobloc : le circuit est fermé dans le caisson, on raccorde des gaines." },
        { texte: "Il renouvelle l’air, avec de l’air neuf.", juste: true } ] },

    { question: "Dans quel ordre l’air traverse-t-il le caisson ?",
      confirmation: "Mélange, filtres, batterie, ventilateur : on filtre avant de refroidir, pour garder la batterie propre.",
      reponses: [
        { texte: "Mélange, filtres, batterie, ventilateur.", juste: true },
        { texte: "Batterie, filtres, mélange, ventilateur.", pourquoi: "La batterie passerait avant les filtres : elle s’encrasserait. Et le mélange se fait à l’entrée, pas au milieu." },
        { texte: "Ventilateur, mélange, batterie, filtres.", pourquoi: "Le ventilateur souffle l’air traité vers les gaines : il est en dernier, pas en premier." },
        { texte: "Filtres, ventilateur, batterie, mélange.", pourquoi: "Le mélange est la première étape : l’air repris et l’air neuf se rejoignent avant tout traitement." } ] },

    { question: "Pourquoi surveille-t-on les filtres d’un roof-top ?",
      confirmation: "Ils sont grands et s’encrassent vite : encrassés, ils laissent passer moins d’air.",
      reponses: [
        { texte: "Parce qu’ils servent à refroidir l’air.", pourquoi: "Ils arrêtent la poussière. Le froid vient de la batterie." },
        { texte: "Parce qu’ils sont grands et s’encrassent vite.", juste: true },
        { texte: "Parce que l’air neuf est toujours propre.", pourquoi: "L’air du dehors amène la poussière de la rue et du toit. Le mélange doit être filtré." },
        { texte: "Parce qu’ils sont derrière la batterie.", pourquoi: "Ils sont avant la batterie, pour la garder propre." } ] },

    { question: "Pourquoi s’occupe-t-on des condensats l’hiver, sur un toit ?",
      confirmation: "Dehors, l’eau qui n’a pas coulé peut geler et boucher l’évacuation.",
      reponses: [
        { texte: "Parce que l’eau n’existe qu’en hiver.", pourquoi: "Elle se forme dès que la batterie est froide, donc aussi en été. C’est l’hiver qui la fait geler." },
        { texte: "Parce que le fluide frigorigène s’écoule avec elle.", pourquoi: "Le fluide est dans un circuit fermé. Les condensats sont de l’eau de l’air, rien d’autre." },
        { texte: "Parce que l’eau, dehors, peut geler et boucher l’évacuation.", juste: true },
        { texte: "Parce qu’un toit n’a pas besoin d’évacuation.", pourquoi: "Un toit en a besoin comme n’importe quel local : sans évacuation, l’eau s’accumule ou gèle sur place." } ] },

    { question: "Que raccorde-t-on sur un roof-top posé sur son embase ?",
      confirmation: "Les gaines d’air, l’électricité, les condensats — et le gaz ou l’eau chaude selon le modèle.",
      reponses: [
        { texte: "Deux tubes de cuivre vers une unité intérieure.", pourquoi: "C’est le split. Le groupe froid d’un roof-top est déjà dans le caisson." },
        { texte: "Seulement l’électricité : l’air se débrouille.", pourquoi: "Sans gaines de reprise et de soufflage, aucun air n’arrive à la salle ni n’en repart." },
        { texte: "Un groupe d’eau glacée.", pourquoi: "Un roof-top a son propre froid : pas besoin d’un groupe extérieur." },
        { texte: "Les gaines, l’électricité, les condensats — et le gaz ou l’eau chaude selon le modèle.", juste: true } ] }
  ],

  retenir: [
    "<strong>Tout est dans un caisson, sur le toit</strong> : l’air d’un côté, le froid de l’autre.",
    "<strong>L’air traverse le caisson dans cet ordre</strong> : mélange, filtres, batterie, ventilateur.",
    "<strong>Un roof-top renouvelle l’air</strong> : il fait entrer de l’air neuf. Un split, non.",
    "<strong>Sur un toit, trois attentions</strong> : le travail en hauteur, les filtres, les condensats l’hiver."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître ce qu’il y a dans un roof-top, suivre l’air à travers le caisson, comprendre pourquoi il renouvelle l’air, et savoir ce qu’on raccorde sur le toit.</p><p><strong>Limite.</strong> Le choix de l’appareil, le calcul des gaines, la régulation fine et la mise en service sont des stations à part. Aucune valeur chiffrée n’est donnée ici (débits, puissances, pente de l’embase, dégagements) : elles viennent de la notice et de l’étude.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs ; les trois viennent d’un même support sur le roof-top. La marque du fabricant est visible sur l’appareil. Toute image signalée sera remplacée.' },
    { quoi: 'Symbole', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.1 Le circuit, organe par organe", url: lien('2.1') },
    { ligne: 2, couleur: '#3D7FCA', texte: "2.6 La vanne 4 voies : froid ou chaud", url: lien('2.6') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.2 Le split : deux unités, un circuit", url: lien('3.2') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.10 Lire une CTA (AéroRézo)", url: lien('3.10') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.4 Les condensats : pente, siphon, pompe de relevage", url: lien('4.4') } ]
});

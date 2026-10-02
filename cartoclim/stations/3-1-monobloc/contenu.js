/* CartoClim 3.1 — Le monobloc : mobile, fenêtre, sans unité extérieure. Écrite le 02/10/2026 sur le moule de la 3.2. */

const lien = id => (typeof RESEAU !== 'undefined' && RESEAU.urlDe) ? RESEAU.urlDe(id) : null;

ModeleAppareil.construire({
  id: '3.1', ligne: 3,
  kicker: 'CartoClim · Ligne 3 Les familles · Station 1',
  titre: "Le monobloc : mobile, fenêtre, sans unité extérieure",
  narration: NARRATION,

  prerequis: [
    { id: '2.1', quoi: "le circuit frigorifique, organe par organe" }
  ],

  photos: [
    { src: 'assets/biblio/989b7d49a2.jpeg',
      alt: "Un climatiseur mobile posé dans la pièce, près d’une fenêtre, avec sa grosse gaine souple blanche qui monte vers l’ouverture.",
      titre: "Posé dans la pièce, la gaine à la fenêtre.", sous: "Un seul boîtier : tout le circuit est dedans." },
    { src: 'assets/biblio/68d22e621a.png',
      alt: "Un climatiseur de fenêtre engagé dans l’ouverture d’une fenêtre, vu de l’extérieur : on voit la grille de sa moitié restée dehors.",
      titre: "La moitié dedans, la moitié dehors.", sous: "Vu de la rue : la grille de la partie qui reste dehors." }
  ],

  aQuoiCaSert: "À <strong>refroidir une pièce sans unité extérieure</strong>. « Monobloc » veut dire <strong>un seul bloc</strong> : le compresseur, le condenseur, le détendeur et l’évaporateur sont tous dans le même boîtier. Pas de tubes de cuivre à poser entre deux unités, pas de fluide à charger sur place : le circuit est fermé en usine. Il y a trois façons de s’en servir : le <strong>mobile</strong>, le <strong>climatiseur de fenêtre</strong> et le <strong>monobloc mural à deux trous</strong>.",
  ouOnLeTrouve: "Dans les situations provisoires ou sans travaux : une pièce à rafraîchir pour l’été, un local où l’on ne peut rien fixer en façade, un dépannage en attendant mieux. C’est un appareil de faible puissance, simple à poser, mais plus bruyant et moins efficace qu’un split.",

  scene: () => ScenesStation.scene(),

  technologie: [
    ["Le boîtier", "tout le circuit : le <strong>compresseur</strong>, le <strong>condenseur</strong>, le <strong>détendeur</strong> et l’<strong>évaporateur</strong>, reliés en usine. C’est le cycle de la station 2.1, simplement rangé dans une seule caisse."],
    ["Deux courants d’air", "un ventilateur fait passer l’air de la pièce à travers l’<strong>évaporateur</strong> : il y laisse sa chaleur et revient plus frais. Un second fait passer de l’air à travers le <strong>condenseur</strong> : celui-là se réchauffe. Les deux airs ne se mélangent jamais."],
    ["La chaleur doit sortir", "un climatiseur ne fait pas disparaître la chaleur, il la <strong>déplace</strong>. Un split la rejette par son unité extérieure. Le monobloc n’en a pas : il faut donc <strong>sortir l’air du condenseur du bâtiment</strong>, par une gaine, directement dehors, ou par un trou du mur. Toute la station tient dans cette phrase."],
    ["Le bac à condensats", "sous l’évaporateur : l’humidité de l’air se dépose sur la batterie froide et tombe dans le bac. Selon l’appareil, on le vide à la main, ou un petit tuyau l’évacue."]
  ],

  titreVariantes: 'Les trois monoblocs',
  variantes: [
    "<strong>Le mobile</strong> — il se pose dans la pièce et se déplace. Une <strong>gaine souple</strong> évacue l’air chaud du condenseur par une fenêtre. Quand l’air du condenseur est pris dans la pièce, celle-ci en perd : l’air chaud du dehors rentre par les fuites. Certains modèles prennent cet air dehors, par une seconde gaine : c’est le cas le plus favorable.",
    "<strong>Le climatiseur de fenêtre</strong> — installé dans une ouverture percée dans le mur ou la baie : une moitié du boîtier dans la pièce, l’autre dehors. Le condenseur est dehors, sans gaine. Économique et simple, mais le compresseur et les ventilateurs sont dans le même boîtier : tout le bruit entre dans la pièce.",
    "<strong>Le monobloc mural à deux trous</strong> — fixé au mur, à l’intérieur, comme un split, mais sans unité extérieure. Deux trous dans le mur laissent passer l’air du condenseur : l’un l’amène, l’autre le rejette.",
    "<strong>Pour comparer, le split</strong> — le condenseur est dehors, relié par deux tubes de cuivre. Plus silencieux et plus efficace. C’est la station 3.2."
  ],
  reglage: "Au <strong>boîtier</strong> ou à la <strong>télécommande</strong> : le mode, la température voulue, la vitesse de ventilation. Mais le vrai réglage d’un monobloc est dans sa <strong>pose</strong> : une gaine courte et droite, une ouverture refermée autour d’elle. Les modes sont la station 5.1.",

  consigneAptitudes: 'Le climatiseur mobile : cochez ce qu’il sait faire, puis validez.',
  titreAptitudes: 'Que sait faire un monobloc mobile ?',
  colonnes: [
    { id: 'sansUnite', libelle: 'Pas d’unité dehors', aide: 'refroidir une pièce sans aucune unité extérieure', dessin: SceneKit.pictos.DESSINS.froid },
    { id: 'sansRejet', libelle: 'Rien à rejeter', aide: 'refroidir sans rejeter d’air chaud nulle part', dessin: SceneKit.pictos.DESSINS.chaud },
    { id: 'sansTravaux', libelle: 'Posé sans travaux', aide: 'être mis en service sans aucun travail de pose',
      dessin: '<path d="M30 42 h40 v18 a20 20 0 0 1 -40 0 z M40 42 v-24 M60 42 v-24 M50 80 v14"/>' }
  ],
  picto: colonnes => SceneKit.pictos(colonnes),
  aptitudes: {
    sansUnite: true, sansRejet: false, sansTravaux: true,
    bonneReponse: 'Exact. Tout le circuit est dans son boîtier : pas d’unité dehors. Le mobile se pose sans travaux : on le branche, on passe la gaine par la fenêtre. Mais il ne refroidit pas sans rejeter de chaleur : celle qu’il prend dans la pièce doit sortir, et c’est le rôle de la gaine.',
    erreurs: {
      sansUnite: 'Si : tout le circuit est dans son boîtier. Il n’y a rien dehors, seulement la gaine qui laisse sortir l’air chaud.',
      sansRejet: 'Non. Un climatiseur ne détruit pas la chaleur, il la déplace. Sans la gaine, l’air chaud du condenseur resterait dans la pièce, et la pièce ne refroidirait pas.',
      sansTravaux: 'Pour le mobile, oui : on le branche, on passe la gaine par la fenêtre, et c’est tout. Pas de perçage, pas de tubes. Le monobloc mural, lui, demande deux trous dans le mur.'
    }
  },

  titreCablage: 'Le raccordement',
  cablage: [
    "<strong>Le courant</strong> : le mobile se branche sur une prise. Pour un appareil fixe, l’alimentation passe par son propre disjoncteur : station 4.5.",
    "<strong>La gaine</strong> (mobile) : la plus courte et la plus droite possible, de l’appareil à la fenêtre, avec l’ouverture refermée autour d’elle.",
    "<strong>Les deux trous</strong> (mural) : l’un pour l’air qui entre, l’autre pour l’air qui sort, percés à l’endroit que donne la notice.",
    "<strong>Les condensats</strong> : un bac à vider, ou un petit tuyau jusqu’à une évacuation, toujours en pente : station 4.4.",
    "<strong>Rien d’autre</strong> : aucun tube de cuivre, aucun fluide à charger, aucun tirage au vide. Le circuit est fermé en usine."
  ],
  piege: "Trois oublis ruinent un monobloc. Une <strong>gaine trop longue ou pliée</strong> : l’air chaud ne sort plus, le condenseur chauffe, et l’appareil ne refroidit plus. Une <strong>fenêtre laissée entrouverte</strong> pour passer la gaine : l’air chaud du dehors rentre. Un <strong>bac ou un tuyau de condensats oublié</strong> : l’eau déborde, ou l’appareil se met en sécurité, selon le modèle.",

  symboles: [
    { src: 'assets/split-pared.svg', alt: "Symbole d’une unité intérieure murale de climatiseur split : un boîtier allongé avec sa grille de soufflage.", legende: "Unité intérieure du split" },
    { src: 'assets/ud-exte-split.svg', alt: "Symbole d’une unité extérieure de climatiseur split : un boîtier avec son hélice et ses deux raccords.", legende: "Unité extérieure du split" },
    { src: 'assets/bomba-condensados.svg', alt: "Symbole d’une pompe à condensats, qui fait monter l’eau du bac jusqu’à l’évacuation.", legende: "Pompe à condensats" }
  ],
  titreSymboles: 'Pas de symbole propre : ce que le monobloc réunit',
  titres: { representer: 'Les symboles' },
  titreLecturePlan: 'Le lire sur un plan',
  lecturePlan: [
    "La bibliothèque n’a pas de symbole propre au monobloc. On montre ici ceux du <strong>split</strong>, pour voir ce que le monobloc <strong>réunit</strong> : l’unité intérieure et l’unité extérieure y sont un seul boîtier.",
    "Sur un plan, un monobloc se reconnaît à ce qui lui <strong>manque</strong> : pas d’unité extérieure, pas de liaison frigorifique entre deux boîtiers.",
    "Cherchez à la place le <strong>trajet de l’air chaud</strong> : la gaine jusqu’à la fenêtre, ou les deux trous dans le mur. S’il n’est pas tracé, personne ne sait par où la chaleur sort.",
    "Et l’<strong>évacuation des condensats</strong>, jusqu’au bout, ou la place du bac. Le troisième symbole est celui de la pompe, quand l’eau doit monter."
  ],

  tableau: () => ScenesStation.recapitulatif(),
  tableauTitre: 'Trois monoblocs : où va la chaleur ?',

  quiz: [
    { question: "Que veut dire « monobloc » ?",
      confirmation: "Un seul bloc : tout le circuit est dans le même boîtier, sans unité extérieure.",
      reponses: [
        { texte: "Un appareil sans compresseur.", pourquoi: "Il en a un, comme toute machine frigorifique. Ce qui change, c’est que tout le circuit tient dans un seul boîtier." },
        { texte: "Un seul bloc, tout le circuit dedans.", juste: true },
        { texte: "Un appareil sans gaine.", pourquoi: "Le mobile a justement une gaine. Le mot parle du boîtier, pas de la gaine." },
        { texte: "Un appareil qui ne fait que du froid.", pourquoi: "Le mot ne dit rien du froid ou du chaud : il dit seulement que la machine n’est pas coupée en deux unités." } ] },

    { question: "Où part la chaleur prise dans la pièce par un climatiseur mobile ?",
      confirmation: "Dans l’air du condenseur, que la gaine envoie dehors.",
      reponses: [
        { texte: "Elle disparaît dans le bac.", pourquoi: "Le bac reçoit de l’eau, pas de la chaleur. La chaleur ne disparaît jamais : elle se déplace." },
        { texte: "Elle reste dans le boîtier.", pourquoi: "Le boîtier chaufferait sans fin, et le condenseur ne pourrait plus rien rejeter. Il faut qu’elle sorte." },
        { texte: "Dans l’air du condenseur, que la gaine envoie dehors.", juste: true },
        { texte: "Elle part par un tube de cuivre.", pourquoi: "Un monobloc n’a aucune liaison frigorifique : le circuit est tout entier dans le boîtier. Seul l’air emporte la chaleur." } ] },

    { question: "Pourquoi un mobile ne refroidit-il plus quand sa gaine est pliée ?",
      confirmation: "L’air chaud ne sort plus : le condenseur n’évacue plus la chaleur.",
      reponses: [
        { texte: "Le bac se remplit trop vite.", pourquoi: "L’eau du bac vient de l’humidité de l’air refroidi. Une gaine pliée n’y change rien." },
        { texte: "L’évaporateur reçoit moins d’air de la pièce.", pourquoi: "L’air de la pièce et l’air du condenseur sont deux courants séparés. La gaine ne touche que le second." },
        { texte: "Le fluide a fui par la gaine.", pourquoi: "La gaine ne contient que de l’air. Le fluide reste dans son circuit fermé, dans le boîtier." },
        { texte: "L’air chaud ne sort plus : le condenseur n’évacue plus la chaleur.", juste: true } ] },

    { question: "Un mobile marche, fenêtre entrouverte pour la gaine. Pourquoi de l’air chaud entre-t-il dans la pièce ?",
      confirmation: "L’air qui part par la gaine est remplacé par de l’air du dehors, qui entre par les fuites.",
      reponses: [
        { texte: "L’air qui part par la gaine est remplacé par de l’air qui rentre.", juste: true },
        { texte: "Parce que le bac est plein.", pourquoi: "Un bac plein déborde ou met l’appareil en sécurité. Il n’appelle pas d’air." },
        { texte: "Parce que l’évaporateur chauffe la pièce.", pourquoi: "L’évaporateur refroidit l’air de la pièce, il ne le chauffe jamais. L’air chaud qui entre vient du dehors." },
        { texte: "Parce que la gaine ramène l’air chaud du dehors.", pourquoi: "Une gaine à un seul sens ne fait que sortir de l’air. C’est ce vide qui appelle l’air du dehors, par les fuites." } ] },

    { question: "Où est le condenseur d’un climatiseur de fenêtre ?",
      confirmation: "Dans la moitié du boîtier qui est dehors : c’est là que la chaleur est rejetée.",
      reponses: [
        { texte: "Dans la pièce, derrière la façade.", pourquoi: "Dans la pièce, il la réchaufferait. Il faut que sa chaleur parte dehors." },
        { texte: "Dans la moitié du boîtier qui est dehors.", juste: true },
        { texte: "Il n’y en a pas.", pourquoi: "Toute machine frigorifique en a un : c’est lui qui rejette la chaleur." },
        { texte: "Dans une unité extérieure séparée.", pourquoi: "Un monobloc n’a pas d’unité séparée : la moitié qui est dehors fait partie du même boîtier." } ] },

    { question: "D’où vient l’eau qui remplit le bac d’un monobloc ?",
      confirmation: "De l’humidité de l’air de la pièce, qui se dépose sur la batterie froide.",
      reponses: [
        { texte: "Du fluide frigorigène.", pourquoi: "Le fluide reste dans son circuit fermé. Une fuite se verrait au manque de froid, pas au bac." },
        { texte: "De la pluie qui entre par la gaine.", pourquoi: "L’eau du bac se forme dans le boîtier, sur la batterie froide, pas dans la gaine." },
        { texte: "De l’humidité de l’air de la pièce.", juste: true },
        { texte: "De l’air du condenseur.", pourquoi: "Cet air passe sur la batterie chaude : il n’y laisse aucune eau." } ] }
  ],

  retenir: [
    "<strong>Monobloc : tout le circuit dans un seul boîtier.</strong> Pas d’unité extérieure, pas de tube de cuivre.",
    "<strong>La chaleur ne disparaît pas, elle sort</strong> : par une gaine (mobile), directement dehors (fenêtre), par un trou du mur (mural).",
    "<strong>Le mobile aspire de l’air de la pièce et le rejette : il en rentre autant, chaud, par les fuites.</strong> Gaine courte et droite, ouverture refermée autour d’elle.",
    "<strong>Simple à poser, mais plus bruyant et moins efficace qu’un split.</strong> Et le bac ou le tuyau de condensats, on n’y oublie pas."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître les trois monoblocs, comprendre où part la chaleur qu’ils prennent dans la pièce, et savoir ce qu’on pose et ce qu’on n’oublie pas.</p><p><strong>Limite.</strong> Le circuit frigorifique lui-même est celui de la station 2.1 ; le split est la station 3.2. Aucune puissance, aucun débit, aucune longueur de gaine n’est donnée ici : elles viennent de la notice de l’appareil.</p>',

  credits: [
    { quoi: 'Photographies', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés, trouvés par outils/chercher-images.mjs — toute image signalée sera remplacée' },
    { quoi: 'Symboles', source: 'collection QElectroTech, CC BY 3.0', detail: 'bibliothèque inerWeb, rien n’a été redessiné' },
    { quoi: 'Documentation', source: 'fiche « Climatiseur individuel » du site energieplus (lesite.be)',
      detail: 'consultée comme documentation seulement : aucune image ni aucun chiffre repris' } ],

  correspondances: [
    { ligne: 2, couleur: '#3D7FCA', texte: "2.1 Le circuit, organe par organe", url: lien('2.1') },
    { ligne: 3, couleur: '#6B5FB5', texte: "3.2 Le split : deux unités, un circuit", url: lien('3.2') },
    { ligne: 4, couleur: '#1E7E54', texte: "4.4 Les condensats : pente, siphon, pompe", url: lien('4.4') },
    { ligne: 5, couleur: '#B06A00', texte: "5.3 L’entretien : filtres, batteries, bac", url: lien('5.3') },
    { ligne: 5, couleur: '#B06A00', texte: "5.5 Bilan thermique et performance", url: lien('5.5') } ]
});

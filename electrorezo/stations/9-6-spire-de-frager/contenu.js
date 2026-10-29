/* ÉlectroRézo 9.6 : Spire de Frager, le moteur sans condensateur.
   Les images viennent du fonds (assets/biblio/IMAGES.md) : rien n’est dessiné ici.
   Faits : voir SOURCES.md. */

const IMAGES_9_6 = {
  avec: {
    src: 'assets/biblio/moteur-avec-spire-de-frager.png',
    alt: "Un moteur monophasé en coupe, alimenté en 230 V alternatif. La bobine est sur un côté du circuit magnétique. Le rotor est rond, avec sa flèche de rotation. Un petit anneau orange, la spire de Frager, est posé au bord du circuit, côté rotor, en haut à droite."
  },
  sans: {
    src: 'assets/biblio/moteur-sans-aide-au-demarrage.png',
    alt: "Le même moteur sans spire. La bobine est alimentée en 230 V alternatif, sur un côté du circuit magnétique. Le rotor est rond, sans flèche de rotation et sans anneau. Ce moteur vibre et ne démarre pas seul."
  },
  contacteur: {
    src: 'assets/biblio/contacteur-en-coupe-avec-bague.png',
    alt: "Un contacteur démonté, avec ses pièces nommées : la fixation, la partie fixe de l’électro-aimant, la bague de déphasage, la bobine, le ressort de rappel et le bloc des contacts."
  }
};

function vignette96(im, titre, sous) {
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

/* Temps 2 : le moteur sans aide, le moteur avec spire, puis le même anneau dans un contacteur (station 6.1). */
function scene96() {
  const boite = document.createElement('div');
  const haut = document.createElement('div');
  haut.className = 'bande-visuelle';
  haut.appendChild(vignette96(IMAGES_9_6.sans, "Sans aide au démarrage.",
    "La bobine et le rotor seulement. Le moteur vibre et ne démarre pas seul."));
  const fl = document.createElement('div');
  fl.className = 'fleche';
  fl.textContent = '➜';
  haut.appendChild(fl);
  haut.appendChild(vignette96(IMAGES_9_6.avec, "Avec la spire.",
    "Le petit anneau orange est la spire de Frager. Le rotor tourne dans le sens de la flèche."));
  const bas = document.createElement('div');
  bas.className = 'bande-visuelle';
  bas.style.marginTop = '.7rem';
  bas.appendChild(vignette96(IMAGES_9_6.contacteur, "Le même anneau dans un contacteur.",
    "Station 6.1. Cherchez « Bague de déphasage » à gauche du dessin : elle empêche les vibrations."));
  boite.append(haut, bas);
  return boite;
}

/* Le récapitulatif du temps 5. */
const AIDES_9_6 = [
  ['Spire de Frager', 'un anneau en court-circuit sur un coin du pôle, sans aucun fil', 'petits ventilateurs d’évaporateur et de vitrine : couple faible, un seul sens, deux fils et la terre au bornier', 'station 9.6'],
  ['Enroulement supplémentaire', 'un second enroulement, avec ses propres fils', 'compresseur monophasé : borne S', 'stations 9.2 et 9.3'],
  ['Condensateur', 'un condensateur en série avec l’auxiliaire', 'petits compresseurs à capillaire et ventilateurs de petits climatiseurs', 'station 9.4']
];

function tableau96() {
  const boite = document.createElement('div');
  boite.style.overflowX = 'auto';
  const t = document.createElement('table');
  t.className = 'tab';
  t.innerHTML = '<thead><tr><th>Aide au démarrage</th><th>Ce qu’on voit</th><th>Où on la trouve</th><th>Station</th></tr></thead><tbody>' +
    AIDES_9_6.map(([a, v, o, s]) =>
      '<tr><td><strong>' + a + '</strong></td><td>' + v + '</td><td>' + o + '</td><td>' + s + '</td></tr>'
    ).join('') + '</tbody>';
  boite.appendChild(t);
  const l = document.createElement('p');
  l.className = 'legende';
  l.textContent = 'Les trois aides créent un déphasage, donc un sens de rotation. Selon l’aide employée, le moteur peut être condamné à tourner dans un seul sens.';
  boite.appendChild(l);
  return boite;
}

ModeleAppareil.construire({
  id: '9.6', ligne: 9,
  kicker: 'ÉlectroRézo · Ligne 9 Le moteur monophasé · Station 6',
  titre: "Spire de Frager : le moteur sans condensateur",
  narration: NARRATION,

  prerequis: [
    { id: '6.1', quoi: "la bague de déphasage de la bobine d’un contacteur" },
    { id: '6.5', quoi: "l’aide au démarrage d’un moteur monophasé" },
    { id: '9.1', quoi: "qui fait tourner quoi" }
  ],

  photos: [
    { src: IMAGES_9_6.avec.src, alt: IMAGES_9_6.avec.alt,
      titre: "Le moteur à spire de Frager.",
      sous: "La bobine est alimentée en 230 V alternatif. Cherchez le petit anneau orange, en haut à droite du rotor : c’est la spire." }
  ],
  creditPhoto: 'Dessins : fiches de cours du fonds inerWeb. Détail dans « Crédits ».',

  aQuoiCaSert: "Un moteur monophasé à un seul enroulement ne démarre pas seul. Il lui faut une aide au démarrage. Sur ce moteur, l’aide est une <strong>spire de Frager</strong> : un petit anneau fermé sur lui-même, posé sur un coin du pôle. Le moteur n’a ni condensateur ni second enroulement.",
  ouOnLeTrouve: "Ce moteur entraîne de petits ventilateurs d’évaporateur et de vitrine. Son couple, la force qui fait tourner l’arbre, est faible. Son sens de rotation est fixé par construction. Au bornier, il a deux fils et la terre.",

  scene: () => scene96(),

  technologie: [
    ["Un seul enroulement", "sans aide au démarrage, il crée un champ alternatif, mais son couple de démarrage est nul (le couple, c’est la force qui fait tourner l’arbre). Le moteur ne démarre pas seul. Sur le premier dessin, sans aide au démarrage, il vibre. Lancé à la main, il démarre et continue dans le sens où on l’a lancé."],
    ["Les aides au démarrage", "il en existe trois : une spire de Frager, un enroulement supplémentaire ou un condensateur. Toutes créent un <strong>déphasage</strong>, un décalage dans le temps, donc un sens de rotation. Les stations 9.2 à 9.4 traitent l’enroulement supplémentaire et le condensateur."],
    ["La spire de Frager", "c’est un petit anneau posé sur un coin du pôle, au bord du circuit magnétique, côté rotor. Il est en court-circuit : fermé sur lui-même. Aucun fil ne l’alimente. Son courant est <strong>induit</strong> : c’est la bobine qui le fait naître. La spire crée ainsi le déphasage, donc un sens de rotation."],
    ["Le sens de rotation", "il est fixé par construction : ce moteur ne tourne que dans un sens. Rien ne s’inverse au bornier. Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé."],
    ["Le couple", "il est faible. On ne trouve donc pas ce moteur sur un compresseur. Il entraîne de petits ventilateurs d’évaporateur et de vitrine. Un ventilateur d’évaporateur est un moteur monophasé en 230 V."],
    ["Au bornier", "ce moteur a deux fils et la terre. Il n’y a ni condensateur ni relais à brancher. Le symbole du temps 4 montre les deux bornes, U et V."],
    ["Le même anneau dans un contacteur", "dans la bobine d’un contacteur alimentée en alternatif, un anneau de cuivre est serti dans le noyau. À la station 6.1, il s’appelle la <strong>bague de déphasage</strong> : il empêche les vibrations, car sans lui l’attraction s’annulerait cent fois par seconde. On l’appelle aussi spire de Frager. Son dessin est en haut de cette carte, sous les deux moteurs. Ici, le même anneau aide le moteur à démarrer."]
  ],

  variantes: [
    "<strong>Un moteur à enroulement auxiliaire</strong> : il a un second enroulement, relié à ses propres fils. Sur un compresseur hermétique, les trois bornes sont C, S et R (station 9.2).",
    "<strong>Un moteur à condensateur</strong> : le condensateur se branche en série avec l’auxiliaire. Les stations 9.3 et 9.4 le montrent sur les compresseurs."
  ],

  picto: () => null,
  colonnes: [
    { id: 'condensateur', libelle: 'Un condensateur', aide: 'il se branche en série avec l’auxiliaire' },
    { id: 'auxiliaire', libelle: 'Un enroulement auxiliaire', aide: 'un second enroulement, avec ses propres fils' },
    { id: 'spire', libelle: 'Une spire en court-circuit', aide: 'un anneau fermé sur lui-même, sans fil' }
  ],
  consigneAptitudes: 'Exemple résolu. Le moteur PSC de la station 9.4 porte un condensateur permanent et un enroulement auxiliaire. Il n’a pas de spire. À vous maintenant. Le moteur à spire étudié aux temps 1 et 2, celui d’un petit ventilateur d’évaporateur, n’a que deux fils et la terre au bornier. Ouvrez le temps 2 et lisez les paragraphes « La spire de Frager » et « Au bornier ». Cochez ce que ce moteur porte, puis validez.',
  aptitudes: {
    condensateur: false, auxiliaire: false, spire: true,
    bonneReponse: 'Juste. Ce moteur porte une spire en court-circuit, et rien d’autre. La spire tient la place de l’enroulement auxiliaire. Son courant est induit par la bobine.',
    erreurs: {
      condensateur: 'Deux fils et la terre au bornier : rien à brancher pour un condensateur. Le démarrage vient de la spire.',
      auxiliaire: 'La spire tient la place de l’enroulement auxiliaire. Elle n’est reliée à aucun fil : son courant est induit par la bobine.',
      spire: 'Ce moteur n’a ni condensateur ni auxiliaire. Le paragraphe « La spire de Frager », au temps 2, dit ce qui le fait démarrer.'
    }
  },

  cablage: [
    "Au bornier, ce moteur a <strong>deux fils et la terre</strong>. Le symbole du temps 4 montre les deux bornes, U et V.",
    "Aucun fil n’arrive à la spire. Elle est fermée sur elle-même, et la bobine y fait naître le courant.",
    "Cherchez un condensateur et un relais : il n’y en a pas sur ce moteur.",
    "Le sens est fixé par construction. Rien ne s’inverse au bornier, et permuter la phase et le neutre ne change pas le sens. L’inversion d’un moteur à deux enroulements est à la station 9.8.",
    "Avant de toucher au bornier, consignez le circuit et vérifiez l’absence de tension (station 6.7)."
  ],
  piege: "Un même anneau, deux emplois. Dans la bobine d’un contacteur, il empêche les vibrations : c’est la bague de déphasage de la station 6.1. Dans ce moteur, il aide au démarrage : c’est la spire de Frager. Pour le moteur, on dit spire de Frager.",

  symboles: [
    { src: 'assets/biblio/ventilateur-evaporateur-m1-deux-bornes.png',
      alt: "Le symbole d’un moteur monophasé : un rond avec la lettre M et le signe 1 ~ à l’intérieur, et deux bornes, U et V, en haut. Dessous, la légende du TP : moteur ventilateur évaporateur.",
      legende: "Moteur monophasé : M, 1 ~ et deux bornes, U et V" }
  ],
  lecturePlan: [
    "Regardez le symbole ci-dessus. Cherchez le rond avec la lettre <strong>M</strong> et le signe <em>1 ~</em>. Le 1 dit une phase, le tilde dit courant alternatif.",
    "Comptez les bornes : <strong>deux</strong>, U et V. Aucun condensateur n’est dessiné, et aucune troisième borne.",
    "La légende du TP écrit 220 V~. Les autres documents de la station disent 230 V.",
    "Dans le bornier, la terre s’ajoute aux deux fils : trois bornes en tout.",
    "Cherchez la spire sur ce symbole. Elle n’y est pas. Le symbole d’un moteur à spire de Frager est celui d’un moteur monophasé à deux fils.",
    "Le symbole seul ne dit donc pas que le moteur est à spire de Frager. La spire se voit sur le dessin du temps 1."
  ],

  tableau: () => tableau96(),
  tableauTitre: 'Les trois aides au démarrage',

  quiz: [
    { question: "Le moteur d’un petit ventilateur d’évaporateur n’a ni condensateur ni relais. Qu’est-ce qui le fait démarrer ? Ouvrez le temps 2 et lisez le paragraphe « La spire de Frager ».",
      confirmation: "La spire de Frager. C’est un anneau fermé sur lui-même, posé sur un coin du pôle. Elle aide le moteur à démarrer.",
      reponses: [
        { texte: "Rien : un moteur monophasé démarre seul.", pourquoi: "Avec un seul enroulement, le couple de démarrage est nul. Lancé à la main, le moteur part dans le sens où on l’a lancé. Seul, il ne démarre pas." },
        { texte: "La spire de Frager, en court-circuit sur un coin du pôle.", juste: true },
        { texte: "Un condensateur caché dans le bornier.", pourquoi: "Au bornier, ce moteur a deux fils et la terre. Il n’y a rien à brancher pour un condensateur." },
        { texte: "Un relais d’intensité.", pourquoi: "Le relais d’intensité équipe les compresseurs (station 9.3). Ce moteur n’a pas de relais." } ] },

    { question: "D’où vient le courant qui circule dans la spire ? Regardez la spire sur le dessin du temps 1, puis relisez le même paragraphe au temps 2.",
      confirmation: "Le courant est induit : c’est la bobine du pôle qui le fait naître dans la spire.",
      reponses: [
        { texte: "D’un fil du réseau.", pourquoi: "La spire n’est reliée à aucun fil. Sur le dessin du temps 1, c’est un anneau seul." },
        { texte: "Du condensateur.", pourquoi: "Ce moteur n’a pas de condensateur." },
        { texte: "Il est induit par la bobine du pôle.", juste: true },
        { texte: "D’un relais.", pourquoi: "Ce moteur n’a pas de relais." } ] },

    { question: "Vous voulez faire tourner ce ventilateur dans l’autre sens. Que faites-vous ? Ouvrez le temps 2 et lisez le paragraphe « Le sens de rotation ».",
      confirmation: "Rien ne s’inverse au bornier : le sens est fixé par construction. Il y a deux fils et la terre, et rien à croiser.",
      reponses: [
        { texte: "Je permute la phase et le neutre.", pourquoi: "Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé." },
        { texte: "Je croise les deux fils de l’auxiliaire.", pourquoi: "Ce moteur n’a pas d’enroulement auxiliaire. Le croisement des fils d’un enroulement est à la station 9.8." },
        { texte: "Rien ne s’inverse au bornier : le sens est fixé par construction.", juste: true },
        { texte: "J’ajoute un condensateur.", pourquoi: "Ce moteur n’a aucune borne pour un condensateur." } ] },

    { question: "Pourquoi ne trouve-t-on pas ce moteur sur un compresseur ? Ouvrez le temps 2 et lisez le paragraphe « Le couple ».",
      confirmation: "Son couple est faible. Ce moteur entraîne de petits ventilateurs d’évaporateur et de vitrine.",
      reponses: [
        { texte: "Il tourne dans les deux sens.", pourquoi: "Il n’a qu’un sens de rotation, fixé par construction." },
        { texte: "Il lui faut un condensateur de démarrage.", pourquoi: "Ce moteur n’a pas de condensateur. Il démarre grâce à sa spire." },
        { texte: "Il ne supporte pas le 230 V.", pourquoi: "Un ventilateur d’évaporateur est un moteur monophasé en 230 V." },
        { texte: "Son couple est faible.", juste: true } ] },

    { question: "Où avez-vous déjà vu un anneau de cuivre en court-circuit sur un noyau ? Regardez le dessin du contacteur, en haut du temps 2, et repensez à la station 6.1.",
      confirmation: "Dans la bobine d’un contacteur alimentée en alternatif. C’est la bague de déphasage de la station 6.1 : le même anneau, qui empêche les vibrations.",
      reponses: [
        { texte: "Dans le ressort de rappel d’un contacteur.", pourquoi: "Le ressort de rappel s’oppose à l’aimant : c’est lui qui décide du seuil. Il n’a pas la forme d’un anneau fermé." },
        { texte: "Dans la bobine d’un contacteur alimentée en alternatif.", juste: true },
        { texte: "Dans le fil de cuivre émaillé de la bobine.", pourquoi: "Le bobinage est un fil enroulé des centaines ou des milliers de fois. Il n’est pas fermé sur lui-même." },
        { texte: "Dans le noyau d’une bobine alimentée en continu.", pourquoi: "La bague de déphasage est dans le noyau des bobines alternatives. En continu, l’attraction est stable : il n’y a pas de vibration à empêcher." } ] }
  ],

  retenir: [
    "Un moteur monophasé à un seul enroulement ne démarre pas seul. Lancé à la main, il part dans le sens où on l’a lancé.",
    "Une aide au démarrage crée un <strong>déphasage</strong>, donc un sens de rotation : spire de Frager, enroulement supplémentaire ou condensateur.",
    "La spire de Frager est un anneau en court-circuit sur un coin du pôle. Aucun fil ne l’alimente : son courant est induit par la bobine.",
    "Ce moteur a un couple faible et un seul sens, fixé par construction. Il entraîne de petits ventilateurs d’évaporateur et de vitrine, avec deux fils et la terre au bornier.",
    "Le même anneau, dans la bobine d’un contacteur alimentée en alternatif, s’appelle <strong>bague de déphasage</strong> et empêche les vibrations (station 6.1)."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître un moteur à spire de Frager, dire comment il démarre, et dire ce qu’on ne peut pas faire avec lui : le brancher à un condensateur, l’inverser, le monter sur un compresseur.</p><p><strong>Limite.</strong> L’enroulement auxiliaire et le condensateur sont aux stations 9.2 à 9.4. L’inversion du sens est à la station 9.8. Cette station ne donne ni le calcul de la spire ni la forme du champ. Elle s’adresse au CAP et au Bac pro.</p>',
  credits: [
    { quoi: 'Dessins du moteur, avec et sans spire', source: 'fiche de cours « Électricité (moteur monophasé) » du fonds inerWeb',
      detail: 'page 1, deux dessins recadrés, rien n’est redessiné' },
    { quoi: 'Dessin du contacteur', source: 'document ressource sur le contacteur du fonds inerWeb',
      detail: 'image reprise de la station 6.1' },
    { quoi: 'Symbole du moteur de ventilateur d’évaporateur', source: 'TP de câblage CAP du fonds inerWeb',
      detail: 'image du TP, reprise sans retouche' },
    { quoi: 'Textes de cours', source: 'cours du fonds inerWeb « Moteurs monophasés » et fiches « Électricité (moteur) »',
      detail: 'Bac pro MFER, et décisions de F. Henninot du 29/10/2026' } ],

  correspondances: [
    { ligne: 6, couleur: '#c9451a', texte: "6.1 La bobine et l’électro-aimant" },
    { ligne: 6, couleur: '#c9451a', texte: "6.5 Le moteur monophasé" },
    { ligne: 9, couleur: '#a16207', texte: "9.1 Qui fait tourner quoi" } ]
});

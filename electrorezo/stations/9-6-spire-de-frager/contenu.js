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
  /* la spire est au bord droit du dessin, là où se pose la loupe : la marge la dégage */
  if (im === IMAGES_9_6.avec) i.style.paddingRight = '2.6rem';
  f.appendChild(i);
  const c = document.createElement('figcaption');
  const s = document.createElement('strong');
  s.textContent = titre;
  c.appendChild(s);
  c.appendChild(document.createTextNode(' ' + sous));
  f.appendChild(c);
  return f;
}

/* Temps 3 : le moteur à juger, son dessin et trois phrases, entre la consigne et les cases. */
function aideAptitudes96() {
  const boite = document.createElement('div');
  const f = vignette96(IMAGES_9_6.avec, "Le moteur à spire de Frager.",
    "Cherchez le petit anneau orange, en haut à droite du rotor : c’est la spire.");
  f.style.maxWidth = '380px';
  boite.appendChild(f);
  const p = document.createElement('p');
  p.innerHTML = "La <strong>spire de Frager</strong> est un petit anneau en court-circuit, fermé sur lui-même, posé sur un coin du pôle. Aucun fil ne l’alimente : son courant est induit par la bobine. Au bornier, ce moteur a deux fils et la terre.";
  boite.appendChild(p);
  return { element: boite, marquer: () => {} };
}

/* Temps 4 : le dessin du moteur dans la carte de lecture. Le modèle ajoute la « convention du schéma de commande » dès qu'il voit
   <img dans lecturePlan ; elle ne vaut pas ici, la balise est donc écrite en majuscules. */
function dessinLecture96() {
  const f = vignette96(IMAGES_9_6.avec, "Le dessin du moteur.",
    "La spire est le petit anneau orange, en haut à droite du rotor.");
  f.style.maxWidth = '380px';
  return f.outerHTML.replace('<img', '<IMG');
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
  boite.append(haut, induction96(), bas);
  return boite;
}

/* L'animation du courant induit (Franck, 29/10/2026 : « expliquer ce qu'est un courant induit, ou le simuler,
   sans les lois de Lenz et de Faraday ni les vecteurs »). Quatre étapes, au ralenti : le courant dans la bobine,
   le champ qu'elle crée, le courant qui naît dans l'anneau, le rotor qui part. La voix presse les boutons
   (window.GUIDAGE). Les mots sont sous le dessin, jamais sur un tracé. */
const ETAPES_96 = [
  ['1 Le courant', "Le courant alternatif traverse la bobine. Il va dans un sens, puis dans l’autre. Ici, au ralenti."],
  ['2 Le champ', "Parcourue par le courant, la bobine devient un aimant : elle crée un champ magnétique, en bleu. Le fer le guide jusqu’au rotor. Le champ suit le courant : il grandit, s’annule, repart dans l’autre sens. Il va et vient sans tourner : le rotor vibre."],
  ['3 L’anneau', "Le champ traverse l’anneau orange. Un champ qui change fait naître un courant dans l’anneau : c’est le courant induit. Aucun fil ne l’alimente. Ce courant crée à son tour un champ, décalé dans le temps."],
  ['4 Le rotor tourne', "Le champ décalé donne un sens de rotation : le rotor démarre et tourne, toujours dans le même sens."]
];

function induction96() {
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, at, parent) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; };
  const f = document.createElement('figure');   /* pas « vignette » : sa loupe se poserait sur l'anneau */
  f.style.cssText = 'margin:.7rem 0 0;padding:.7rem;background:#fff;border:1px solid #e6dcc8;border-radius:14px';
  const svg = mk('svg', { viewBox: '0 0 360 300', role: 'img', 'aria-label': "Un moteur à spire de Frager en coupe : le circuit magnétique en fer, la bobine en cuivre à gauche, le rotor rond à droite entre deux pôles, et l’anneau orange sur un coin du pôle du haut." });
  svg.style.cssText = 'width:100%;max-width:420px;display:block;margin:0 auto';
  [[40, 30, 40, 240], [40, 30, 260, 36], [40, 234, 260, 36], [260, 66, 40, 30], [260, 204, 40, 30]]
    .forEach(([x, y, w, h]) => mk('rect', { x, y, width: w, height: h, fill: '#9aa4b2' }, svg));
  const champ = mk('path', { d: 'M60 48 H280 V252 H60 Z', fill: 'none', stroke: '#2563eb', 'stroke-width': 4, 'stroke-dasharray': '10 8', opacity: 0 }, svg);
  for (let k = 0; k < 6; k++) mk('line', { x1: 30, y1: 115 + k * 14, x2: 90, y2: 115 + k * 14, stroke: '#c2410c', 'stroke-width': 6, 'stroke-linecap': 'round' }, svg);
  mk('path', { d: 'M30 115 H6 M30 185 H6', stroke: '#c2410c', 'stroke-width': 3, fill: 'none' }, svg);
  const points = [];
  for (let k = 0; k < 6; k++) points.push(mk('circle', { cx: 60, cy: 115 + k * 14, r: 4, fill: '#fff7ed', stroke: '#7c2d12', 'stroke-width': 1.5, opacity: 0 }, svg));
  const rotor = mk('g', {}, svg);
  mk('circle', { cx: 280, cy: 150, r: 46, fill: '#2dd4bf', stroke: '#0f766e', 'stroke-width': 3 }, rotor);
  for (let k = 0; k < 6; k++) {
    const a = k * Math.PI / 3;
    mk('line', { x1: 280 + 14 * Math.cos(a), y1: 150 + 14 * Math.sin(a), x2: 280 + 40 * Math.cos(a), y2: 150 + 40 * Math.sin(a), stroke: '#0f766e', 'stroke-width': 4 }, rotor);
  }
  const anneau = mk('rect', { x: 284, y: 70, width: 20, height: 24, rx: 4, fill: 'none', stroke: '#ea580c', 'stroke-width': 5 }, svg);
  const petitChamp = mk('ellipse', { cx: 294, cy: 82, rx: 24, ry: 20, fill: 'none', stroke: '#93c5fd', 'stroke-width': 3, 'stroke-dasharray': '5 5', opacity: 0 }, svg);
  const pointAnneau = mk('circle', { cx: 284, cy: 70, r: 4, fill: '#fff7ed', stroke: '#9a3412', 'stroke-width': 1.5, opacity: 0 }, svg);
  f.appendChild(svg);

  const barre = document.createElement('div');
  barre.style.cssText = 'display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;margin:.5rem 0';
  const legende = document.createElement('p');
  legende.className = 'legende';
  legende.setAttribute('aria-live', 'polite');
  legende.textContent = 'Le moteur à l’arrêt. La bobine est à gauche, le rotor à droite, l’anneau orange sur le coin du pôle du haut.';
  const cap = document.createElement('figcaption');
  const s = document.createElement('strong');
  s.textContent = 'Le courant induit, au ralenti.';
  cap.append(s, document.createTextNode(' Appuyez sur les étapes, une par une.'));

  let etape = 0, angle = 0, t0 = performance.now(), boucle = null;
  const calme = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dessiner = (t) => {
    const ph = (t - t0) / 3000 * 2 * Math.PI;   /* une alternance toutes les 3 s : le ralenti */
    const i = calme ? 1 : Math.sin(ph), ia = calme ? 1 : Math.cos(ph);   /* le courant de l'anneau suit en décalé */
    points.forEach(p => { p.setAttribute('opacity', etape >= 1 ? 1 : 0); p.setAttribute('cx', (60 + 26 * i).toFixed(1)); });
    champ.setAttribute('opacity', etape >= 2 ? (0.25 + 0.75 * Math.abs(i)).toFixed(2) : 0);
    champ.setAttribute('stroke-dashoffset', (calme ? 0 : (t - t0) / 40 * Math.sign(i)).toFixed(1));
    const tour = (ia + 1) / 2;
    pointAnneau.setAttribute('opacity', etape >= 3 ? 1 : 0);
    pointAnneau.setAttribute('cx', (284 + 20 * tour).toFixed(1)); pointAnneau.setAttribute('cy', (70 + 24 * tour).toFixed(1));
    petitChamp.setAttribute('opacity', etape >= 3 ? (0.2 + 0.6 * Math.abs(ia)).toFixed(2) : 0);
    anneau.setAttribute('stroke-width', etape >= 3 ? (4 + 3 * Math.abs(ia)).toFixed(1) : 5);
    if (etape >= 4) angle += calme ? 0 : 1.6; else angle = etape >= 2 && !calme ? 4 * i : 0;   /* il vibre, puis il tourne */
    rotor.setAttribute('transform', 'rotate(' + angle.toFixed(1) + ' 280 150)');
  };
  const tourner = (t) => { dessiner(t); boucle = (!calme && document.body.contains(f)) ? requestAnimationFrame(tourner) : null; };
  ETAPES_96.forEach(([nom, dit], k) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = nom;
    b.addEventListener('click', () => {
      etape = k + 1; legende.textContent = dit;
      barre.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', j === k ? 'true' : 'false'));
      if (calme) dessiner(performance.now());
      else if (!boucle) { t0 = performance.now(); boucle = requestAnimationFrame(tourner); }
    });
    barre.appendChild(b);
  });
  dessiner(t0);
  f.append(barre, legende, cap);
  return f;
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
    ["Au bornier", "ce moteur a deux fils et la terre. Il n’y a ni condensateur ni relais à brancher. Les deux fils vont aux bornes U et V."],
    ["Le même anneau dans un contacteur", "dans la bobine d’un contacteur alimentée en alternatif, un anneau de cuivre est serti dans le noyau. À la station 6.1, il s’appelle la <strong>bague de déphasage</strong> : il empêche les vibrations, car sans lui l’attraction s’annulerait cent fois par seconde. On l’appelle aussi spire de Frager. Son dessin est en haut de cette carte, sous les deux moteurs. Ici, le même anneau aide le moteur à démarrer."]
  ],

  variantes: [
    "<strong>Un moteur à enroulement auxiliaire</strong> : il a un second enroulement, relié à ses propres fils. Sur un compresseur hermétique, les trois bornes sont C, S et R (station 9.2).",
    "<strong>Un moteur à condensateur</strong> : le condensateur se branche en série avec l’auxiliaire. Les stations 9.3 et 9.4 le montrent sur les compresseurs."
  ],

  picto: () => aideAptitudes96(),
  colonnes: [
    { id: 'condensateur', libelle: 'Un condensateur', aide: 'il se branche en série avec l’auxiliaire' },
    { id: 'auxiliaire', libelle: 'Un enroulement auxiliaire', aide: 'un second enroulement, avec ses propres fils' },
    { id: 'spire', libelle: 'Une spire en court-circuit', aide: 'un anneau fermé sur lui-même, sans fil' }
  ],
  consigneAptitudes: 'Exemple résolu. Le moteur PSC de la station 9.4 porte un condensateur permanent et un enroulement auxiliaire. Il n’a pas de spire. À vous maintenant. Le moteur d’un petit ventilateur d’évaporateur est à spire de Frager. Regardez son dessin, puis lisez le texte sous le dessin. Cochez ce que ce moteur porte, puis validez.',
  aptitudes: {
    condensateur: false, auxiliaire: false, spire: true,
    bonneReponse: 'Juste. Ce moteur porte une spire en court-circuit, et rien d’autre. La spire tient la place de l’enroulement auxiliaire. Son courant est induit par la bobine.',
    erreurs: {
      condensateur: 'Deux fils et la terre au bornier : rien à brancher pour un condensateur. Le démarrage vient de la spire.',
      auxiliaire: 'La spire tient la place de l’enroulement auxiliaire. Elle n’est reliée à aucun fil : son courant est induit par la bobine.',
      spire: 'Ce moteur n’a ni condensateur ni auxiliaire. Ce qui le fait démarrer est l’anneau en court-circuit, décrit dans le texte sous le dessin.'
    }
  },

  cablage: [
    "Au bornier, ce moteur a <strong>deux fils et la terre</strong>. Les deux fils vont aux bornes U et V.",
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
    "Le symbole seul ne dit donc pas que le moteur est à spire de Frager. La spire se voit sur le dessin du moteur, juste dessous : c’est le petit anneau orange, en haut à droite du rotor.",
    dessinLecture96()
  ],

  tableau: () => tableau96(),
  tableauTitre: 'Les trois aides au démarrage',

  quiz: [
    { question: "Le moteur d’un petit ventilateur d’évaporateur n’a ni condensateur ni relais. Qu’est-ce qui le fait démarrer ? Dans le tableau « Les trois aides au démarrage », cherchez les petits ventilateurs d’évaporateur, colonne « Où on la trouve ».",
      confirmation: "La spire de Frager. C’est un anneau fermé sur lui-même, posé sur un coin du pôle. Elle aide le moteur à démarrer.",
      reponses: [
        { texte: "Rien : un moteur monophasé démarre seul.", pourquoi: "Avec un seul enroulement, le couple de démarrage est nul. Lancé à la main, le moteur part dans le sens où on l’a lancé. Seul, il ne démarre pas." },
        { texte: "La spire de Frager, en court-circuit sur un coin du pôle.", juste: true },
        { texte: "Un condensateur caché dans le bornier.", pourquoi: "Au bornier, ce moteur a deux fils et la terre. Il n’y a rien à brancher pour un condensateur." },
        { texte: "Un relais d’intensité.", pourquoi: "Le relais d’intensité équipe les compresseurs (station 9.3). Ce moteur n’a pas de relais." } ] },

    { question: "D’où vient le courant qui circule dans la spire ? Cherchez la réponse dans la carte « Ce qu’il faut retenir ».",
      confirmation: "Le courant est induit : c’est la bobine du pôle qui le fait naître dans la spire.",
      reponses: [
        { texte: "D’un fil du réseau.", pourquoi: "La spire n’est reliée à aucun fil : c’est un anneau seul." },
        { texte: "Du condensateur.", pourquoi: "Ce moteur n’a pas de condensateur." },
        { texte: "Il est induit par la bobine du pôle.", juste: true },
        { texte: "D’un relais.", pourquoi: "Ce moteur n’a pas de relais." } ] },

    { question: "Vous voulez faire tourner ce ventilateur dans l’autre sens. Que faites-vous ? Cherchez la phrase sur le sens de rotation dans la carte « Ce qu’il faut retenir ».",
      confirmation: "Rien ne s’inverse au bornier : le sens est fixé par construction. Il y a deux fils et la terre, et rien à croiser.",
      reponses: [
        { texte: "Je permute la phase et le neutre.", pourquoi: "Permuter la phase et le neutre ne change pas le sens d’un moteur monophasé." },
        { texte: "Je croise les deux fils de l’auxiliaire.", pourquoi: "Ce moteur n’a pas d’enroulement auxiliaire. Le croisement des fils d’un enroulement est à la station 9.8." },
        { texte: "Rien ne s’inverse au bornier : le sens est fixé par construction.", juste: true },
        { texte: "J’ajoute un condensateur.", pourquoi: "Ce moteur n’a aucune borne pour un condensateur." } ] },

    { question: "Pourquoi ne trouve-t-on pas ce moteur sur un compresseur ? Cherchez la phrase sur le couple dans la carte « Ce qu’il faut retenir ».",
      confirmation: "Son couple est faible. Ce moteur entraîne de petits ventilateurs d’évaporateur et de vitrine.",
      reponses: [
        { texte: "Il tourne dans les deux sens.", pourquoi: "Il n’a qu’un sens de rotation, fixé par construction." },
        { texte: "Il lui faut un condensateur de démarrage.", pourquoi: "Ce moteur n’a pas de condensateur. Il démarre grâce à sa spire." },
        { texte: "Il ne supporte pas le 230 V.", pourquoi: "Un ventilateur d’évaporateur est un moteur monophasé en 230 V." },
        { texte: "Son couple est faible.", juste: true } ] },

    { question: "Où avez-vous déjà vu un anneau de cuivre en court-circuit sur un noyau ? Repensez à la station 6.1, ou cherchez la dernière phrase de la carte « Ce qu’il faut retenir ».",
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

/* ÉlectroRézo 2.3 — Le réseau triphasé. */

/* Temps 3 : les six mesures. L’élève choisit l’état du réseau ; les valeurs affichées suivent.
   Cas « phase mal serrée » : L2 a 150 V vers le neutre (relevé donné par la voix) ; les mesures entre phases
   qui passent par L2 en sont déduites (somme de vecteurs, tensions simples à 120 degrés) : 332 V. */
function mesureSixValeurs() {
  const NS = 'http://www.w3.org/2000/svg';
  const d = document.createElementNS(NS, 'svg');
  d.setAttribute('viewBox', '0 0 700 330'); d.setAttribute('class', 'scene'); d.setAttribute('role', 'img');
  d.setAttribute('aria-label', 'Les six mesures d’une prise triphasée avec neutre : trois entre phases, trois entre une phase et le neutre.');
  const NAVY = '#1b3a63', GRIS = '#637285', ROUGE = '#c0392b', PAPIER = '#fffdf8', CREME = '#f7f1e7', TRAIT = 'rgba(27,58,99,.18)';
  const CAS = {
    sain:  { pp: [400, 402, 398], pn: [230, 231, 229] },
    serre: { pp: [332, 398, 332], pn: [230, 150, 230] }
  };
  const PP = ['L1 – L2', 'L1 – L3', 'L2 – L3'], PN = ['L1 – N', 'L2 – N', 'L3 – N'];
  const norm = (v, ref) => Math.abs(v - ref) <= 6;
  const peindre = (id) => {
    const c = CAS[id];
    const rang = (t, v, ref, x0, x1, i) => {
      const hors = !norm(v, ref);
      return (hors ? '<rect x="' + (x0 - 12) + '" y="' + (112 + i * 38) + '" width="' + (x1 - x0 + 24) + '" height="32" rx="6" fill="' + ROUGE + '" opacity=".1"/>' : '') +
        '<text x="' + x0 + '" y="' + (134 + i * 38) + '" font-size="14" fill="' + NAVY + '">' + t + '</text>' +
        '<text x="' + x1 + '" y="' + (134 + i * 38) + '" text-anchor="end" font-size="17" font-weight="700" fill="' + (hors ? ROUGE : NAVY) + '">' + v + ' V</text>';
    };
    d.innerHTML =
      '<rect x="8" y="8" width="684" height="314" rx="16" fill="' + PAPIER + '" stroke="' + TRAIT + '"/>' +
      '<text x="350" y="40" text-anchor="middle" font-size="17" font-weight="700" fill="' + NAVY + '">' + (id === 'sain' ? 'Six mesures, deux valeurs' : 'Des mesures sortent du lot') + '</text>' +
      '<rect x="40" y="66" width="300" height="200" rx="10" fill="' + CREME + '" stroke="' + TRAIT + '"/>' +
      '<text x="190" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="' + NAVY + '">entre deux phases</text>' +
      PP.map((t, i) => rang(t, c.pp[i], 400, 70, 310, i)).join('') +
      '<text x="190" y="252" text-anchor="middle" font-size="12" fill="' + GRIS + '">attendu : 400 V</text>' +
      '<rect x="360" y="66" width="300" height="200" rx="10" fill="' + CREME + '" stroke="' + TRAIT + '"/>' +
      '<text x="510" y="94" text-anchor="middle" font-size="14" font-weight="700" fill="' + NAVY + '">entre une phase et le neutre</text>' +
      PN.map((t, i) => rang(t, c.pn[i], 230, 390, 630, i)).join('') +
      '<text x="510" y="252" text-anchor="middle" font-size="12" fill="' + GRIS + '">attendu : 230 V</text>' +
      '<text x="350" y="298" text-anchor="middle" font-size="13" fill="' + GRIS + '">' + (id === 'sain'
        ? 'Les six valeurs tombent à quelques volts de 400 V et de 230 V.'
        : 'Trois mesures sortent du lot, et toutes passent par L2 : c’est elle qui est coupée ou mal serrée.') + '</text>';
  };
  peindre('sain');
  const L1 = 'Un réseau en bon état : les trois mesures entre phases donnent 400 V, les trois vers le neutre 230 V, à quelques volts près.';
  const L2 = 'L2 est mal serrée : sa mesure vers le neutre tombe à 150 V, et les deux mesures entre phases qui passent par elle tombent à 332 V. Le conducteur commun aux mesures anormales est le fautif.';
  return SchemasGrandeurs.bloc(d, [
    { id: 'sain', libelle: 'Réseau en bon état', legende: L1, appliquer: () => peindre('sain') },
    { id: 'serre', libelle: 'L2 mal serrée', legende: L2, appliquer: () => peindre('serre') }
  ], 'sain', L1);
}

ModeleGrandeur.construire({
  id: '2.3', ligne: 2,
  vue3d: { modele: 'cable5G' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 2 Les réseaux · Station 3',
  titre: "Le réseau triphasé",
  narration: NARRATION,

  prerequis: [
    { id: '1.5', quoi: "la valeur efficace" },
    { id: '2.2', quoi: "le monophasé" },
  ],

  photos: [
    { src: 'assets/biblio/trois-sinusoides-decalees.jpeg',
      alt: "Trois courbes sinusoïdales de même amplitude, décalées d’un tiers de période l’une par rapport à l’autre.",
      titre: "Trois, décalées.", sous: "Même valeur, même fréquence, un tiers de tour d’écart." },
    { src: 'assets/biblio/transformateur-en-etoile.jpeg',
      alt: "Schéma du secondaire d’un transformateur triphasé : trois bobinages en étoile, 230 volts entre chaque phase et le point neutre, 400 volts entre deux phases.",
      titre: "D’où il vient.", sous: "Le secondaire d’un transformateur de quartier : 230 V de chaque phase au neutre, 400 V entre deux phases." }
  ],

  lIdee: "Le triphasé, ce sont trois tensions au lieu d’une. Même valeur, même fréquence, mais décalées d’un tiers de tour. Ce décalage n’est pas une complication : c’est ce qui permet à un moteur de démarrer tout seul, et à un câble de transporter bien plus de puissance.",
  ouOnLaRencontre: "Dans tous les ateliers, toutes les armoires industrielles, la plupart des machines de plus de quelques kilowatts. Et dans la rue : le réseau de distribution est triphasé ; un logement n’en reçoit souvent qu’une phase.",

  scene: () => SchemasReseaux.troisSinusoides(),

  ceQuiSePasse: [
    ["Trois tensions identiques", "même valeur efficace (station 1.5), même fréquence. Ce qui les distingue, c’est uniquement le moment où chacune passe par son maximum."],
    ["Décalées d’un tiers de tour", "120 degrés. Ce décalage vient de la construction de l’alternateur : trois bobinages disposés à 120 degrés l’un de l’autre."],
    ["Leur somme est nulle", "à chaque instant, les trois s’annulent. C’est pour cela que, sur une installation équilibrée, le neutre ne ramène presque rien."],
    ["Pourquoi c’est mieux", "à câble égal, on transporte bien plus de puissance. Et surtout, un moteur triphasé démarre <strong>seul</strong> : le décalage crée un champ tournant, et le rotor n’a qu’à le suivre."]
  ],
  aRetenir: [
    "Trois phases : <strong>L1, L2, L3</strong>. Plus, souvent, un <strong>neutre</strong>.",
    "Sur une même prise, deux valeurs cohabitent : <strong>400 V</strong> entre deux phases, <strong>230 V</strong> entre une phase et le neutre.",
    "Le neutre n’est pas toujours distribué. Une machine triphasée sans neutre est parfaitement normale."
  ],

  mesure: () => mesureSixValeurs(),
  instrument: [
    "Sur une prise triphasée avec neutre, entre les quatre conducteurs actifs (sans le PE), il y a <strong>six mesures</strong> possibles, et <strong>deux valeurs</strong> seulement.",
    "Les <strong>trois entre phases</strong> doivent donner 400 volts, à quelques volts près.",
    "Les <strong>trois vers le neutre</strong> doivent donner 230 volts, à quelques volts près.",
    "Des valeurs qui sortent du lot annoncent une <strong>phase coupée ou mal serrée</strong> : c’est le conducteur commun aux mesures anormales. C’est un diagnostic à part entière."
  ],
  dangerDeMesure: "Sur une même prise, il y a 230 et 400 volts selon les bornes choisies. Se tromper de paire, c’est envoyer 400 volts dans un appareil qui en attend 230.",

  ecriture: {
    sansUnite: true, titre: 'Les écritures du triphasé', entetes: ['On lit', 'Cela veut dire'],
    multiples: [
      ['3 ~', 'triphasé sans neutre — trois conducteurs'],
      ['3 N ~', 'triphasé avec neutre — quatre conducteurs'],
      ['230 / 400 V', 'la façon d’écrire les deux tensions du réseau français : vers le neutre, puis entre phases']
    ]
  },
  surUnePlaque: [
    "Sur une <strong>plaque de moteur</strong> : <em>3 ~</em> et deux tensions, toutes deux <strong>entre phases</strong>, que le moteur accepte : 230 V en triangle, 400 V en étoile (station 6.4). C’est ce que vous verrez presque toujours en atelier.",
    "Sur une <strong>notice</strong> ou un document qui décrit le <strong>réseau</strong>, l’écriture <em>230 / 400 V</em> donne d’abord la tension vers le neutre, puis la tension entre phases. Quelques constructeurs l’écrivent à l’envers, <em>400 / 230</em> : lisez toujours l’intitulé.",
    "Sur un <strong>plan de puissance</strong>, le triphasé se reconnaît à ses trois conducteurs : trois traits parallèles, ou un seul trait portant trois petites barres obliques. Il se voit d’un coup d’œil.<span style='display:flex;flex-wrap:wrap;gap:.8rem;margin-top:.5rem'><figure style='margin:0;text-align:center'><img src='assets/src_3p.svg' alt='Symbole d’une source triphasée sans neutre : trois bornes L1, L2, L3.' style='height:7rem;border:1px solid rgba(27,58,99,.18);border-radius:6px'><figcaption style='font-size:.85rem'>3 ~ : src_3p.svg</figcaption></figure><figure style='margin:0;text-align:center'><img src='assets/src_3pn.svg' alt='Symbole d’une source triphasée avec neutre : quatre bornes L1, L2, L3 et N.' style='height:7rem;border:1px solid rgba(27,58,99,.18);border-radius:6px'><figcaption style='font-size:.85rem'>3 N ~ : src_3pn.svg</figcaption></figure><figure style='margin:0;text-align:center'><img src='assets/ligne_triphase.svg' alt='Symbole d’une ligne triphasée : un trait portant trois petites barres obliques.' style='height:4rem;border:1px solid rgba(27,58,99,.18);border-radius:6px'><figcaption style='font-size:.85rem'>ligne triphasée : ligne_triphase.svg</figcaption></figure></span>",
    "Les repères sont <strong>L1, L2, L3</strong>. Sur du matériel ancien, vous trouverez encore <em>R, S, T</em> — c’est la même chose."
  ],

  quiz: [
    { question: "De combien sont décalées les trois tensions ?",
      confirmation: "D’un tiers de tour, soit 120 degrés.",
      reponses: [
        { texte: "De 90 degrés.", pourquoi: "Avec 90 degrés d’écart, la somme des trois ne serait pas nulle." },
        { texte: "De 180 degrés.", pourquoi: "Ce serait l’opposition, et deux suffiraient." },
        { texte: "Cela dépend de la charge.", pourquoi: "Le décalage vient de l’alternateur : la charge n’y change rien." },
        { texte: "De 120 degrés.", juste: true } ] },

    { question: "Pourquoi le neutre ne ramène-t-il presque rien quand les trois phases alimentent des charges identiques ?",
      confirmation: "Parce que les trois courants s’annulent.",
      reponses: [
        { texte: "Parce que les trois courants s’annulent.", juste: true },
        { texte: "Parce qu’il est relié à la terre.", pourquoi: "Ce raccordement ne dit rien du courant qu’il ramène." },
        { texte: "Parce qu’il est moins dangereux.", pourquoi: "Le danger n’a aucun rapport avec le courant ramené." },
        { texte: "Parce qu’il ne transporte jamais rien.", pourquoi: "Il transporte le déséquilibre, qui n’est jamais tout à fait nul." } ] },

    { question: "Sur une prise triphasée avec neutre, entre les quatre conducteurs actifs (sans le PE), combien de valeurs différentes mesure-t-on ?",
      confirmation: "Deux : 400 entre phases, 230 vers le neutre.",
      reponses: [
        { texte: "Six, une par paire de bornes.", pourquoi: "Il y a bien six mesures, mais elles ne donnent que deux valeurs." },
        { texte: "Deux.", juste: true },
        { texte: "Une seule : 400 V.", pourquoi: "Les mesures vers le neutre donnent 230 volts." },
        { texte: "Quatre, une par conducteur.", pourquoi: "On ne mesure jamais « un conducteur » : une tension se mesure entre deux." } ] },

    { question: "Une machine triphasée n’a pas de neutre raccordé. Est-ce normal ?",
      confirmation: "Oui, tout à fait : le neutre n’est pas toujours distribué.",
      reponses: [
        { texte: "Non, il manque un fil.", pourquoi: "Beaucoup de machines n’en ont aucun besoin." },
        { texte: "Non, la protection ne fonctionnera pas.", pourquoi: "La protection des personnes s’appuie sur le PE, pas sur le neutre." },
        { texte: "Oui, tout à fait normal.", juste: true },
        { texte: "Oui, mais seulement en dessous de 1 kW.", pourquoi: "La puissance n’a aucun rapport avec la présence du neutre." } ] }
  ],

  retenir: [
    "<strong>Trois tensions</strong>, décalées de <strong>120 degrés</strong>.",
    "<strong>400 V entre phases</strong>, <strong>230 V vers le neutre</strong>, sur la même prise.",
    "<strong>Leur somme est nulle</strong> : le neutre ne ramène que le déséquilibre.",
    "<strong>Six mesures, deux valeurs.</strong> Des mesures qui sortent du lot sont un diagnostic."
  ],

  objectifs: '<p><strong>Objectif.</strong> Comprendre ce que sont trois tensions décalées, connaître les deux tensions d’une même prise, et savoir contrôler un réseau par six mesures.</p><p><strong>Limite.</strong> Les calculs de puissance en triphasé équilibré et déséquilibré sont hors du champ de cette station.</p>',
  credits: [
    { quoi: 'Illustrations', source: 'base de connaissances inerWeb',
      detail: 'documents de cours indexés dans la base de connaissances inerWeb ; symboles : bibliothèque inerWeb (src_3p.svg, src_3pn.svg, ligne_triphase.svg), rien n’a été redessiné' } ],

  correspondances: [
    { ligne: 2, couleur: '#7a4fb5', texte: "2.4 La tension simple" },
    { ligne: 2, couleur: '#7a4fb5', texte: "2.6 Le champ tournant" },
    { ligne: 6, couleur: '#c9451a', texte: "6.4 Le couplage de la plaque à bornes" } ]
});

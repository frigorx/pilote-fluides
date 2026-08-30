/* ÉlectroRézo 6.4 — Le couplage de la plaque à bornes.
   Le contenu propre à la station. Le moteur commun est dans ../_commun/station.js. */

(() => {
  'use strict';
  const RAC3 = Math.sqrt(3);
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };
  const carte = (titre) => { const s = el('section', 'card'); if (titre) s.appendChild(el('h2', null, titre)); return s; };

  /* ------------------------------------------------------------ le dessin de la plaque
     Un seul SVG, réutilisé aux temps 1, 2 et 3 : on montre ou masque ses couches. */

  function plaqueSVG() {
    const ns = 'http://www.w3.org/2000/svg';
    const d = document.createElementNS(ns, 'svg');
    d.setAttribute('viewBox', '0 0 840 470');
    d.setAttribute('class', 'scene');
    d.setAttribute('role', 'img');
    d.setAttribute('aria-label',
      'Boîte à bornes d’un moteur triphasé : six bornes sur deux rangées décalées, ' +
      'trois barrettes de couplage, et le schéma du branchement obtenu.');
    d.innerHTML = `
<rect x="18" y="26" width="430" height="418" rx="20" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>
<text x="233" y="56" text-anchor="middle" font-size="17" font-weight="700" fill="#1b3a63">Boîte à bornes</text>

<g id="cArrivee" opacity="0">
  <line x1="103" y1="88" x2="103" y2="150" stroke="#1b3a63" stroke-width="6"/>
  <line x1="233" y1="88" x2="233" y2="150" stroke="#1b3a63" stroke-width="6"/>
  <line x1="363" y1="88" x2="363" y2="150" stroke="#1b3a63" stroke-width="6"/>
  <text x="103" y="82" text-anchor="middle" font-size="16" font-weight="700" fill="#1b3a63">L1</text>
  <text x="233" y="82" text-anchor="middle" font-size="16" font-weight="700" fill="#1b3a63">L2</text>
  <text x="363" y="82" text-anchor="middle" font-size="16" font-weight="700" fill="#1b3a63">L3</text>
</g>

<g id="cInterne" opacity="0" stroke="#84b7ec" stroke-width="5" fill="none" stroke-dasharray="9 7">
  <path d="M103 170 L229 280"/>
  <path d="M233 170 L359 280"/>
  <path d="M363 170 C 377 226 245 232 107 280"/>
</g>

<g id="cBarrettes" opacity="0" stroke="#c9451a" stroke-width="15" stroke-linecap="round">
  <line id="b1" x1="103" y1="300" x2="233" y2="300"/>
  <line id="b2" x1="233" y1="300" x2="363" y2="300"/>
  <line id="b3" x1="363" y1="150" x2="363" y2="300" opacity="0"/>
</g>

<g font-size="15" font-weight="700" fill="#1b3a63" text-anchor="middle">
  <circle cx="103" cy="150" r="16" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
  <circle cx="233" cy="150" r="16" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
  <circle cx="363" cy="150" r="16" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
  <text x="103" y="128">U1</text><text x="233" y="128">V1</text><text x="363" y="128">W1</text>
  <circle cx="103" cy="300" r="16" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
  <circle cx="233" cy="300" r="16" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
  <circle cx="363" cy="300" r="16" fill="#fffdf8" stroke="#1b3a63" stroke-width="5"/>
  <text x="103" y="333">W2</text><text x="233" y="333">U2</text><text x="363" y="333">V2</text>
</g>

<text x="233" y="374" text-anchor="middle" font-size="14" fill="#637285">En pointillé : les bobinages, croisés à l’intérieur du moteur</text>
<text x="233" y="396" text-anchor="middle" font-size="14" fill="#637285">U1–U2 · V1–V2 · W1–W2 — le croisement permet trois barrettes droites</text>
<text x="233" y="424" text-anchor="middle" font-size="16" font-weight="700" fill="#c9451a" id="svgCouplage">Aucune barrette posée</text>

<rect x="468" y="26" width="354" height="418" rx="20" fill="#fffdf8" stroke="rgba(27,58,99,.18)"/>
<text x="645" y="56" text-anchor="middle" font-size="17" font-weight="700" fill="#1b3a63">Ce que voit un bobinage</text>

<g id="schemaEtoile" opacity="0">
  <line x1="645" y1="250" x2="645" y2="130" stroke="#3d7fca" stroke-width="7"/>
  <line x1="645" y1="250" x2="542" y2="330" stroke="#3d7fca" stroke-width="7"/>
  <line x1="645" y1="250" x2="748" y2="330" stroke="#3d7fca" stroke-width="7"/>
  <circle cx="645" cy="250" r="9" fill="#1b3a63"/>
  <text x="645" y="118" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">L1</text>
  <text x="530" y="352" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">L2</text>
  <text x="760" y="352" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">L3</text>
  <text x="645" y="284" text-anchor="middle" font-size="14" fill="#637285">point commun</text>
</g>

<g id="schemaTriangle" opacity="0">
  <path d="M645 120 L755 320 L535 320 Z" fill="none" stroke="#3d7fca" stroke-width="7" stroke-linejoin="round"/>
  <text x="645" y="108" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">L1</text>
  <text x="521" y="342" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">L2</text>
  <text x="769" y="342" text-anchor="middle" font-size="15" font-weight="700" fill="#1b3a63">L3</text>
</g>

<text x="645" y="398" text-anchor="middle" font-size="15" fill="#637285">Tension sur un bobinage</text>
<text x="645" y="428" text-anchor="middle" font-size="24" font-weight="800" fill="#1b3a63" id="svgTension">—</text>`;
    return d;
  }

  function poserBarrettes(svg, type) {
    const g = svg.querySelector('#cBarrettes');
    const [b1, b2, b3] = ['#b1', '#b2', '#b3'].map(s => svg.querySelector(s));
    g.setAttribute('opacity', '1');
    if (type === 'etoile') {
      b1.setAttribute('x1', 103); b1.setAttribute('y1', 300); b1.setAttribute('x2', 233); b1.setAttribute('y2', 300);
      b2.setAttribute('x1', 233); b2.setAttribute('y1', 300); b2.setAttribute('x2', 363); b2.setAttribute('y2', 300);
      b3.setAttribute('opacity', '0');
      svg.querySelector('#svgCouplage').textContent = 'Étoile — W2, U2 et V2 reliés ensemble';
    } else {
      b1.setAttribute('x1', 103); b1.setAttribute('y1', 150); b1.setAttribute('x2', 103); b1.setAttribute('y2', 300);
      b2.setAttribute('x1', 233); b2.setAttribute('y1', 150); b2.setAttribute('x2', 233); b2.setAttribute('y2', 300);
      b3.setAttribute('opacity', '1');
      svg.querySelector('#svgCouplage').textContent = 'Triangle — U1–W2, V1–U2, W1–V2';
    }
    svg.querySelector('#schemaEtoile').setAttribute('opacity', type === 'etoile' ? '1' : '0');
    svg.querySelector('#schemaTriangle').setAttribute('opacity', type === 'triangle' ? '1' : '0');
  }

  /* ------------------------------------------------------------ temps 1 — découvrir */

  function tempsDecouvrir(hote) {
    const w = el('div', 'workspace');

    /* Du général au particulier : le moteur, puis l'endroit où l'on câble, puis la plaque
       qui dit quoi faire. Photos réelles de la bibliothèque — voir SOURCES.md. */
    const g = carte('Le moteur, et l’endroit où l’on câble');
    const bande = el('div', 'bande-visuelle');

    const vignette = (src, alt, titre, sous) => {
      const f = el('figure', 'vignette');
      const i = document.createElement('img');
      i.src = src; i.alt = alt; i.loading = 'lazy';
      f.appendChild(i);
      const c = el('figcaption');
      c.appendChild(el('strong', null, titre));
      c.appendChild(document.createTextNode(' ' + sous));
      f.appendChild(c);
      return f;
    };

    bande.appendChild(vignette('assets/biblio/moteur-boite-a-bornes.jpeg',
      'Photo d’un moteur électrique dont la boîte à bornes est ouverte : six bornes et trois barrettes, désignées par deux flèches rouges.',
      'La boîte à bornes.',
      'Sur le flanc du moteur, sous un couvercle. Les flèches montrent les trois barrettes.'));
    bande.appendChild(el('div', 'fleche', '➜'));
    bande.appendChild(vignette('assets/biblio/plaque-signaletique.jpeg',
      'Plaque signalétique d’un moteur asynchrone Leroy Somer : 1,5 kW, triangle 230 V 6,65 A, étoile 400 V 3,84 A, 1440 tours par minute, 50 Hz.',
      'La plaque signalétique.',
      'Vissée sur le carter. C’est elle qui dit sous quelle tension chaque bobinage peut travailler.'));
    g.appendChild(bande);
    Station.credit(g, 'Photographies : base de connaissances inerWeb, documents de cours Bac Pro MFER · plaque signalétique Leroy Somer. Détail dans « Crédits ».');

    const d = carte('Lire cette plaque');
    d.appendChild(el('p', null, 'Sur la plaque de gauche, deux lignes seulement nous intéressent aujourd’hui.'));
    const lect = el('div', 'lecture');
    [['Δ 230 V · 6,65 A', 'en triangle, chaque bobinage tient 230 V'],
     ['Y 400 V · 3,84 A', 'en étoile, l’ensemble tient 400 V entre deux fils'],
     ['1,5 kW · 1440 tr/min', 'la puissance et la vitesse, pour plus tard'],
     ['50 Hz · 3 phases', 'le réseau qu’il lui faut']].forEach(([v, x]) => {
      const b = el('div', 'metric'); b.appendChild(el('span', null, x));
      b.appendChild(el('strong', null, v)); lect.appendChild(b);
    });
    d.appendChild(lect);
    d.appendChild(el('p', null,
      'Une plaque porte toujours deux tensions, jamais une seule. « Ce moteur est en 400 volts » ne veut rien dire tant qu’on n’a pas regardé le réseau sur lequel on le branche.'));
    d.appendChild(el('p', null,
      'Selon la façon dont on pose les trois barrettes, ce moteur tourne vingt ans ou fume en trente secondes. La même machine, les mêmes fils.'));
    d.appendChild(el('p', 'legende', 'Écoutez d’abord, puis passez au temps suivant.'));

    w.append(g, d);
    hote.appendChild(w);
  }

  /* ------------------------------------------------------------ temps 2 — comprendre
     La scène animée est fabriquée par Claude Design (brief déposé le 28/08).
     Cet emplacement l’accueillera : on n’y code pas d’animation concurrente. */

  function tempsComprendre(hote) {
    const w = el('div', 'workspace');
    const g = carte('Le mécanisme');
    const att = el('div', 'fiche');
    att.appendChild(el('p', null, '🎬 Emplacement de la scène animée — en fabrication chez Claude Design.'));
    att.appendChild(el('p', 'legende',
      'Brief déposé le 28/08 : six plans, 3 min 40, du couvercle qui s’ouvre jusqu’aux deux schémas côte à côte. Le trio .dc.html + .jsx + support.js viendra se poser ici.'));
    g.appendChild(att);

    const svg = plaqueSVG();
    svg.querySelector('#cArrivee').setAttribute('opacity', '1');
    svg.querySelector('#cInterne').setAttribute('opacity', '1');
    g.appendChild(svg);
    g.appendChild(el('p', 'legende',
      'En attendant la scène : le dessin fixe, avec l’arrivée du réseau et les bobinages croisés.'));

    const d = carte('Ce que la scène explique');
    [['Trois bobinages, six bouts', 'Trois fils de cuivre enroulés autour du fer. Chacun a un début et une fin : six extrémités, six vis.'],
     ['Le décalage volontaire', 'La rangée du bas est décalée d’un cran. C’est ce décalage qui permet de poser les barrettes bien droites, sans les croiser.'],
     ['Deux tensions à la fois', 'Entre deux fils du réseau : 400 V. Entre un fil et le neutre : 230 V. Les deux existent en même temps.'],
     ['L’étoile', 'Deux barrettes couchées relient les trois vis du bas. Chaque bobinage est tendu entre un fil et le point commun : il reçoit 230 V.'],
     ['Le triangle', 'Trois barrettes debout referment la boucle. Chaque bobinage est branché entre deux fils : il reçoit 400 V.']]
      .forEach(([t, x]) => { d.appendChild(el('p', null, '')).innerHTML = '<strong>' + t + '</strong> — ' + x; });
    w.append(g, d);
    hote.appendChild(w);
  }

  /* ------------------------------------------------------------ temps 3 — manipuler */

  function tempsManipuler(hote, ctx) {
    const cap = ctx.niveau === 'CAP';
    const w = el('div', 'workspace');
    const g = carte('Posez les barrettes');
    const svg = plaqueSVG();
    svg.querySelector('#cArrivee').setAttribute('opacity', '1');
    svg.querySelector('#cInterne').setAttribute('opacity', '1');
    g.appendChild(svg);

    const d = carte('Mission');
    d.appendChild(el('p', 'legende', cap
      ? 'Le réseau de l’atelier est en 400 V et le moteur porte 230 / 400 V. Un seul couplage convient.'
      : 'Changez le réseau et la plaque. Un des quatre cas n’a aucune solution : trouvez lequel, et dites pourquoi.'));

    d.appendChild(el('span', 'champ', 'Réseau de l’atelier (entre deux fils)'));
    const selR = el('select', 'large');
    selR.innerHTML = '<option value="400">400 V — le réseau courant</option><option value="230">230 V — ancien réseau</option>';
    selR.disabled = cap;
    d.appendChild(selR);

    d.appendChild(el('span', 'champ', 'Plaque du moteur'));
    const selP = el('select', 'large');
    selP.innerHTML = '<option value="230">230 / 400 V</option><option value="400">400 / 690 V</option>';
    selP.disabled = cap;
    d.appendChild(selP);

    d.appendChild(el('span', 'champ', 'Couplage posé'));
    const ch = el('div', 'choix');
    const bE = el('button', null, 'Étoile'), bT = el('button', null, 'Triangle');
    [bE, bT].forEach(b => { b.type = 'button'; b.setAttribute('aria-pressed', 'false'); ch.appendChild(b); });
    d.appendChild(ch);

    const lect = el('div', 'lecture');
    const m = {};
    [['reseau', 'Tension du réseau'], ['plaque', 'Tenue d’un bobinage'],
     ['recue', 'Tension reçue'], ['ecart', 'Écart']].forEach(([k, lab]) => {
      const box = el('div', 'metric'); box.appendChild(el('span', null, lab));
      m[k] = el('strong', null, '—'); box.appendChild(m[k]); lect.appendChild(box);
    });
    d.appendChild(lect);
    const verdict = el('p', 'verdict wait'); d.appendChild(verdict);
    w.append(g, d);
    hote.appendChild(w);

    let couplage = null;

    function dire(cl, signe, texte) {
      verdict.className = 'verdict ' + cl;
      verdict.innerHTML = '<span class="signe">' + signe + '</span>' + texte;
    }

    function evaluer() {
      const U = +selR.value, Un = +selP.value;
      m.reseau.textContent = U + ' V';
      m.plaque.textContent = Un + ' V';
      if (!couplage) {
        m.recue.textContent = m.ecart.textContent = '—';
        svg.querySelector('#svgTension').textContent = '—';
        return dire('wait', '•', 'Choisissez un couplage pour voir le résultat.');
      }
      const Ue = couplage === 'etoile' ? U / RAC3 : U;
      const ecart = (Ue - Un) / Un * 100;
      m.recue.textContent = Ue.toFixed(0) + ' V';
      m.ecart.textContent = (ecart >= 0 ? '+' : '') + ecart.toFixed(0) + ' %';
      svg.querySelector('#svgTension').textContent = Ue.toFixed(0) + ' V';

      const formule = couplage === 'etoile'
        ? 'étoile : ' + U + ' divisé par racine de trois, soit ' + Ue.toFixed(0) + ' V'
        : 'triangle : le bobinage voit les ' + U + ' V entre deux fils';
      const bon = t => Math.abs(((t === 'etoile' ? U / RAC3 : U) - Un) / Un * 100) <= 5;
      const autre = couplage === 'etoile' ? 'triangle' : 'étoile';
      const secours = bon(couplage === 'etoile' ? 'triangle' : 'etoile')
        ? ' Le couplage ' + autre + ' conviendrait.'
        : ' Et l’autre couplage ne conviendrait pas non plus : ce moteur n’est pas fait pour ce réseau.';

      if (Math.abs(ecart) <= 5)
        dire('ok', '✔', 'Couplage correct — ' + formule + '. Le bobinage reçoit ce pour quoi il est prévu.');
      else if (ecart > 5)
        dire('bad', '✘', 'Surtension — ' + formule + ', pour un bobinage prévu à ' + Un + ' V. Le moteur chauffe et grille.' + secours);
      else
        dire('bad', '✘', 'Sous-alimenté — ' + formule + ', pour un bobinage prévu à ' + Un + ' V. Le moteur tourne mou et n’a pas son couple.' + secours);
    }

    bE.addEventListener('click', () => { couplage = 'etoile'; bE.setAttribute('aria-pressed', 'true'); bT.setAttribute('aria-pressed', 'false'); poserBarrettes(svg, 'etoile'); evaluer(); });
    bT.addEventListener('click', () => { couplage = 'triangle'; bT.setAttribute('aria-pressed', 'true'); bE.setAttribute('aria-pressed', 'false'); poserBarrettes(svg, 'triangle'); evaluer(); });
    selR.addEventListener('change', evaluer);
    selP.addEventListener('change', evaluer);
    evaluer();
  }

  /* ------------------------------------------------------------ temps 4 — représenter */

  function tempsRepresenter(hote) {
    const w = el('div', 'workspace');
    const g = carte('Le même objet, dit sur un plan');
    const trio = el('div', 'lecture');
    trio.style.gridTemplateColumns = '1fr 1fr';
    [['L’objet et ses six bornes', 'assets/induction_motor_6_terminals.svg'],
     ['Le symbole du moteur triphasé', 'assets/moteur_tri.svg']].forEach(([lab, src]) => {
      const box = el('div', 'metric');
      box.appendChild(el('span', null, lab));
      const i = document.createElement('img');
      i.src = src; i.alt = lab; i.style.width = '100%'; i.style.maxHeight = '190px';
      i.style.objectFit = 'contain'; i.style.marginTop = '.3rem';
      box.appendChild(i);
      trio.appendChild(box);
    });
    g.appendChild(trio);
    g.appendChild(el('p', 'legende',
      'Symboles normalisés EN 60617, pris dans la bibliothèque inerWeb — voir SOURCES.md. Rien n’a été redessiné.'));

    const d = carte('Ce qu’il faut retenir du symbole');
    d.appendChild(el('p', null, 'Un rond, une lettre pour dire que c’est un moteur, et trois traits d’arrivée pour dire qu’il est alimenté par trois fils.'));
    d.appendChild(el('p', null, 'Les repères de bornes sont les mêmes que dans la boîte : U1 V1 W1 en haut, W2 U2 V2 en bas.'));
    d.appendChild(el('p', 'legende', 'Sur un schéma de commande, la convention de la maison est constante : lecture verticale, phase en haut, neutre en bas, retour du neutre en orange.'));
    w.append(g, d);
    hote.appendChild(w);
  }

  /* ------------------------------------------------------------ temps 5 — vérifier */

  const QUIZ = [
    { question: 'Pourquoi trouve-t-on six vis dans la boîte à bornes d’un moteur triphasé ?',
      confirmation: 'Trois bobinages, chacun avec un début et une fin.',
      reponses: [
        { texte: 'Trois pour l’arrivée du réseau, trois pour la terre.', pourquoi: 'La terre a sa vis à part, en dehors des six, et l’arrivée n’occupe que la rangée du haut.' },
        { texte: 'Trois pour le courant, trois de rechange.', pourquoi: 'Aucune borne n’est en réserve : les six sont utilisées à chaque branchement.' },
        { texte: 'Il y a trois bobinages, et chacun a un début et une fin.', juste: true },
        { texte: 'Une par phase, en étoile comme en triangle.', pourquoi: 'Cela ferait trois bornes, pas six. Il en faut deux par bobinage.' } ] },

    { question: 'Un moteur porte 230 / 400 V. Le réseau de l’atelier est en 400 V. Quel couplage ?',
      confirmation: 'En étoile, chaque bobinage voit 400 divisé par racine de trois, soit 231 V.',
      reponses: [
        { texte: 'Étoile.', juste: true },
        { texte: 'Triangle.', pourquoi: 'En triangle, chaque bobinage recevrait les 400 V du réseau, alors qu’il est prévu pour 230. Il grille.' },
        { texte: 'L’un ou l’autre, cela revient au même.', pourquoi: 'Les deux couplages donnent des tensions différentes sur le bobinage : 231 V d’un côté, 400 V de l’autre.' },
        { texte: 'Aucun : ce moteur ne convient pas.', pourquoi: 'Il convient très bien, à condition de le coupler en étoile.' } ] },

    { question: 'En couplage étoile, un bobinage reçoit…',
      confirmation: 'Il est tendu entre un fil du réseau et le point commun.',
      reponses: [
        { texte: 'La tension entre deux fils du réseau.', pourquoi: 'C’est ce que donne le triangle, pas l’étoile.' },
        { texte: 'Le double de la tension du réseau.', pourquoi: 'Aucun couplage n’augmente la tension : on choisit seulement entre les deux que le réseau offre déjà.' },
        { texte: 'Rien : l’étoile met les bobinages hors tension.', pourquoi: 'L’étoile relie les trois fins entre elles, elle ne coupe rien.' },
        { texte: 'La tension entre un fil et le point commun, soit la plus petite des deux.', juste: true } ] },

    { question: 'Pourquoi la rangée du bas est-elle décalée d’un cran ?',
      confirmation: 'Le croisement interne met la fin d’un bobinage sous le début d’un autre.',
      reponses: [
        { texte: 'Pour gagner de la place dans la boîte.', pourquoi: 'La place serait la même dans l’autre ordre : ce n’est pas une question d’encombrement.' },
        { texte: 'Pour que les barrettes du triangle restent droites, sans se croiser.', juste: true },
        { texte: 'C’est une habitude des constructeurs, sans raison technique.', pourquoi: 'C’est au contraire une norme, et elle a une raison très précise : les barrettes droites.' },
        { texte: 'Pour empêcher le couplage en étoile.', pourquoi: 'L’étoile reste possible : deux barrettes couchées sur la rangée du bas suffisent.' } ] },

    { question: 'Le démarrage étoile-triangle, c’est…',
      confirmation: 'Trois contacteurs et un temporisateur, en marche, pour limiter le courant de démarrage.',
      reponses: [
        { texte: 'La même chose que le couplage, dit autrement.', pourquoi: 'Le couplage se pose à l’arrêt avec trois barrettes, une fois pour toutes. Le démarrage est une manœuvre en marche.' },
        { texte: 'Une façon de poser les barrettes plus vite.', pourquoi: 'Il ne touche pas aux barrettes : il agit par des contacteurs, en amont du moteur.' },
        { texte: 'Une manœuvre en marche, avec des contacteurs, pour limiter le courant au démarrage.', juste: true },
        { texte: 'Un couplage réservé aux moteurs monophasés.', pourquoi: 'Un moteur monophasé n’a ni étoile ni triangle : il n’a pas trois bobinages branchés sur trois fils.' } ] }
  ];

  const JEU = {
    titre: 'L’atelier du lundi matin', etiquette: 'Moteur',
    regle: 'Cinq moteurs arrivent sur l’établi. Pour chacun, vous avez vingt secondes pour poser les barrettes — ou pour refuser. Deviner juste ne compte pas comme réussir.',
    secondes: 20,
    actions: [
      { id: 'etoile', libelle: 'Coupler en étoile' },
      { id: 'triangle', libelle: 'Coupler en triangle' },
      { id: 'refus', libelle: 'Ce moteur ne va pas ici' },
      { id: 'stop', libelle: 'Je ne pose rien tant que je ne sais pas' } ],
    cas: [
      { enonce: 'Un moteur de pompe, sorti du carton.',
        fiche: [['Réseau', '400 V entre deux fils'], ['Plaque', '230 / 400 V']],
        bonne: 'etoile',
        explication: 'En étoile, chaque bobinage voit 231 V — exactement ce que la plaque annonce.' },
      { enonce: 'Un moteur de ventilateur récupéré sur une ancienne machine.',
        fiche: [['Réseau', '400 V entre deux fils'], ['Plaque', '400 / 690 V']],
        bonne: 'triangle',
        explication: 'En triangle, chaque bobinage voit les 400 V du réseau, ce que la plaque demande.' },
      { enonce: 'Un moteur livré pour l’atelier du fond, encore alimenté en 230 V.',
        fiche: [['Réseau', '230 V entre deux fils'], ['Plaque', '230 / 400 V']],
        bonne: 'triangle',
        explication: 'Sur un réseau 230 V, c’est le triangle qui donne 230 V au bobinage. L’étoile n’en donnerait que 133.' },
      { enonce: 'Un moteur d’occasion, pour le même atelier en 230 V.',
        fiche: [['Réseau', '230 V entre deux fils'], ['Plaque', '400 / 690 V']],
        bonne: 'refus',
        explication: 'Aucun couplage ne convient : au mieux 230 V sur un bobinage prévu pour 400. Le bon geste est de refuser le moteur.' },
      { enonce: 'Un moteur dont la plaque a été effacée par les solvants.',
        fiche: [['Réseau', '400 V entre deux fils'], ['Plaque', 'illisible']],
        bonne: 'stop',
        explication: 'Sans la plaque, on ne peut pas savoir. On cherche la référence, on ne parie pas.' } ],
    reussite: 'Cinq bons gestes sur cinq. Vous avez surtout su refuser et su vous arrêter — c’est ce qui distingue un professionnel.',
    echec: 'On recommence. Regardez les deux cas où le bon geste n’était pas de coupler.'
  };

  function tempsVerifier(hote) {
    const w = el('div', 'workspace');
    const g = el('div'), d = el('div');
    /* Aucune page sans illustration : le récapitulatif visuel des quatre cas. */
    if (typeof Schemas !== 'undefined') {
      const t = carte('Les quatre cas');
      t.appendChild(Schemas.tableauCouplages());
      g.appendChild(t);
    }
    Station.monterQuiz(g, QUIZ);
    Station.monterJeu(d, JEU);
    w.append(g, d);
    hote.appendChild(w);
  }

  /* ------------------------------------------------------------ assemblage */

  document.getElementById('btObjectifs').addEventListener('click', () => {
    const cap = Station.etat.niveau === 'CAP';
    document.getElementById('dlgTexte').innerHTML = cap
      ? '<p><strong>CAP.</strong> Reconnaître les six bornes, poser les barrettes en étoile ou en triangle, et dire quelle tension reçoit un bobinage dans chaque cas.</p>'
      : '<p><strong>Bac pro.</strong> Choisir le couplage à partir de la tension du réseau et de la plaque, justifier par le rapport de racine de trois, et reconnaître le cas où le moteur ne convient pas au réseau.</p>';
    document.getElementById('dlg').showModal();
  });

  Station.demarrer({
    id: '6.4',
    ligne: 6,
    kicker: 'ÉlectroRézo · Ligne 6 Machines · Station 4 · grand carrefour ⇄ lignes 1 et 2',
    titre: 'Le couplage de la plaque à bornes',

    prerequis: [
      { id: '6.3', quoi: "le moteur asynchrone" },
      { id: '2.4', quoi: "la tension simple" },
      { id: '2.5', quoi: "la composée" }
    ],

    niveaux: [{ id: 'CAP', libelle: 'CAP' }, { id: 'BAC', libelle: 'Bac pro' }],
    credits: [
      { quoi: 'Photo « moteur et boîte à bornes »',
        source: 'base de connaissances inerWeb',
        detail: 'document de cours Bac Pro MFER — 03_BAC-MFER/S1-Analyse/coure tri.docx' },
      { quoi: 'Photo « plaque signalétique »',
        source: 'base de connaissances inerWeb · constructeur Leroy Somer, Angoulême',
        detail: 'document de cours — 03_BAC-MFER/S4-Electricite/Activité 17 couplage moteur asynchrone triphasé.pdf' },
      { quoi: 'Tableau des familles de couplage',
        source: 'dossier technique CAP IFCA EP1 2022',
        detail: '02_CAP-IFCA/C1-Communiquer/Dossier technique.V2 CAP IFCA EP1 2022.pdf' },
      { quoi: 'Symboles normalisés EN 60617',
        source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
        detail: 'moteur triphasé et moteur à six bornes — 391_consumers_actuators/10_engines/' } ],
    correspondances: [
      { ligne: 2, couleur: '#0C4B88', texte: '2.3 Triphasé' },
      { ligne: 2, couleur: '#0C4B88', texte: '2.4 Tension simple' },
      { ligne: 2, couleur: '#0C4B88', texte: '2.5 Tension composée' },
      { ligne: 1, couleur: '#1b3a63', texte: '1.7 Plaque signalétique' },
      { ligne: 6, couleur: '#c9451a', texte: '6.3 Moteur asynchrone triphasé' } ],
    temps: [
      { id: 'decouvrir',   onglet: '1 · Découvrir',   titre: 'Sous le couvercle',        monter: tempsDecouvrir,   narration: NARRATION.decouvrir },
      { id: 'comprendre',  onglet: '2 · Comprendre',  titre: 'Le mécanisme',             monter: tempsComprendre,  narration: NARRATION.comprendre },
      { id: 'manipuler',   onglet: '3 · Manipuler',   titre: 'Posez les barrettes',      monter: tempsManipuler,   narration: NARRATION.manipuler },
      { id: 'representer', onglet: '4 · Représenter', titre: 'Le symbole normalisé',     monter: tempsRepresenter, narration: NARRATION.representer },
      { id: 'verifier',    onglet: '5 · Vérifier',    titre: 'Questions et mini-jeu',    monter: tempsVerifier,    narration: NARRATION.verifier }
    ]
  });
})();

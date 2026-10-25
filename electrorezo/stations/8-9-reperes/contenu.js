/* ÉlectroRézo 8.9 — Les repères. */

/* Cinq appareils, avec le repère qu'ils portent sur un plan. Les symboles sont ceux de la
   bibliothèque inerWeb (assets/), jamais redessinés :
     Q1  sectionneur4.svg   KM1  bobine3.svg   F1  pojistka1p.svg
     S1  poussoir.svg       H1   lampe2.svg                                            */
const REPERES = [
  { rep: 'Q1', lettre: 'Q', nom: 'Un sectionneur', img: 'assets/sectionneur4.svg',
    alt: 'Symbole d’un sectionneur à trois pôles.',
    famille: 'Q est la lettre usuelle des sectionneurs, des disjoncteurs et des interrupteurs de tête' },
  { rep: 'KM1', lettre: 'KM', nom: 'Un contacteur (sa bobine)', img: 'assets/bobine3.svg',
    alt: 'Symbole d’une bobine de contacteur : un grand rectangle, un fil en haut, un fil en bas.',
    famille: 'KM est la lettre usuelle des contacteurs' },
  { rep: 'F1', lettre: 'F', nom: 'Un fusible', img: 'assets/pojistka1p.svg',
    alt: 'Symbole d’un fusible : un rectangle étroit traversé par le fil.',
    famille: 'F est la lettre usuelle des protections' },
  { rep: 'S1', lettre: 'S', nom: 'Un bouton-poussoir', img: 'assets/poussoir.svg',
    alt: 'Symbole d’un bouton-poussoir : un contact incliné et son carré de commande, en pointillé.',
    famille: 'S est la lettre usuelle des organes de commande manuelle : boutons, sélecteurs' },
  { rep: 'H1', lettre: 'H', nom: 'Un voyant', img: 'assets/lampe2.svg',
    alt: 'Symbole d’un voyant : un rond traversé par une croix.',
    famille: 'H est la lettre usuelle des voyants et de la signalisation' }
];

/* une vignette d'appareil : le repère (s'il est montré), le symbole, le nom */
function figureRepere(r, montrerRepere, avecLettre) {
  const f = document.createElement('figure');
  f.style.cssText = 'margin:0;background:var(--paper);border:1px solid var(--line);border-radius:12px;'
    + 'padding:.5rem .4rem;display:flex;flex-direction:column;align-items:center;gap:.25rem';
  const t = document.createElement('div');
  t.className = 'repere-etiquette';
  t.style.cssText = 'font-size:1.55rem;font-weight:800;color:var(--navy);min-height:2.1rem;letter-spacing:.03em';
  t.textContent = montrerRepere ? r.rep : ' ';
  const i = document.createElement('img');
  i.src = r.img; i.alt = r.alt;
  i.style.cssText = 'height:120px;width:auto;max-width:100%;object-fit:contain';
  const c = document.createElement('figcaption');
  c.style.cssText = 'font-size:.92em;color:var(--muted);text-align:center';
  c.textContent = avecLettre ? r.nom + ' · lettre ' + r.lettre : r.nom;
  f.append(t, i, c);
  return f;
}

const grilleRepere = () => {
  const g = document.createElement('div');
  g.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:.6rem;margin-top:.6rem';
  return g;
};


ModeleSigne.construire({
  id: '8.9',
  vue3d: { modele: 'contacteur', piece: 'bornes',
    legende: 'Sur l’appareil, le repère est écrit sur l’étiquette ; les bornes allumées portent, elles, leurs propres numéros (1/L1, 2/T1…).' },   /* 3D */
  kicker: 'ÉlectroRézo · Ligne 8 L’écriture du schéma · Station 9',
  titre: "Les repères",
  lettre: 'repere',
  narration: NARRATION,

  prerequis: [
    { id: '8.1', quoi: "le trait et le point" },
    { id: '8.7', quoi: "le pointillé" },
  ],

  ceQuelleDit: "Q1, KM2, F3, S1, H4. Des lettres et des chiffres, écrits à côté de chaque symbole. Ce ne sont pas des noms choisis au hasard : ce sont des codes.",
  ouOnLaVoit: "À côté de chaque appareil sur le plan, et sur l’étiquette collée sur l’appareil dans l’armoire.",

  pourquoiCetteForme: [
    "<strong>La lettre dit la famille</strong> : <strong>Q</strong> sectionneurs, disjoncteurs, interrupteurs de tête · <strong>KM</strong> un contacteur · <strong>F</strong> une protection · <strong>S</strong> un organe de commande manuelle · <strong>H</strong> un voyant · <strong>M</strong> un moteur · <strong>X</strong> un bornier. Ce sont les lettres usuelles dans les dossiers français : en cas de doute, c’est le dossier de l’installation qui fait foi.",
    "<strong>Le chiffre ne fait que numéroter</strong> : le premier, le deuxième. Il ne dit rien d’autre.",
    "<strong>Premier usage : retrouver l’appareil</strong> dans l’armoire. Le repère est sur le plan et sur l’étiquette.",
    "<strong>Second usage, plus subtil : relier des morceaux dispersés.</strong> La bobine KM1 en commande et un contact KM1 en puissance, c’est le même appareil — même sans pointillé.",
    "<strong>Les numéros de bornes d’un contact portent eux aussi l’information</strong> : 13-14 pour un contact ouvert au repos, 21-22 pour un contact fermé au repos. Ne les confondez pas avec le repère de l’appareil : un bornier porte un repère comme les autres appareils (X1, X2…), et ses bornes sont numérotées une par une."
  ],

  /* Temps 2 : cinq appareils, chacun avec son repère posé à côté, comme sur un plan. */
  scene: () => {
    const g = grilleRepere();
    g.setAttribute('role', 'group');
    g.setAttribute('aria-label', 'Cinq appareils avec leur repère : Q1, KM1, F1, S1, H1.');
    ['Q1', 'KM1', 'F1', 'S1', 'H1'].forEach(k =>
      g.appendChild(figureRepere(REPERES.find(r => r.rep === k), true, true)));
    return g;
  },

  /* Temps 3 : relier chaque repère à l'appareil qu'il désigne. Un exemple est résolu d'avance (F1). */
  exercice: () => {
    const hote = document.createElement('div');
    const consigne = document.createElement('p');
    consigne.className = 'legende';
    consigne.innerHTML = 'Chaque repère de la rangée du haut désigne l’un des appareils de la rangée du bas. '
      + '<strong>Cliquez sur un repère, puis sur l’appareil qu’il désigne.</strong> '
      + 'Un exemple est déjà fait : <strong>F1</strong> est le fusible, parce que F est la lettre des protections. '
      + 'À vous pour les quatre autres.';
    hote.appendChild(consigne);

    const parRep = {};
    REPERES.forEach(r => { parRep[r.rep] = r; });
    const trouves = new Set(['F1']);
    let choisi = null;

    const barre = document.createElement('div');
    barre.className = 'choix';
    barre.style.marginTop = '.6rem';
    const boutons = {};
    ['F1', 'KM1', 'Q1', 'S1', 'H1'].forEach(k => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = k;
      b.setAttribute('aria-pressed', 'false');
      if (trouves.has(k)) { b.className = 'bon'; b.disabled = true; }
      b.addEventListener('click', () => {
        choisi = k;
        Object.keys(boutons).forEach(x => boutons[x].setAttribute('aria-pressed', String(x === k)));
        v.className = 'verdict wait';
        v.innerHTML = '<span class="signe">•</span>Repère <strong>' + k + '</strong> choisi. Cliquez maintenant sur l’appareil qu’il désigne.';
      });
      boutons[k] = b;
      barre.appendChild(b);
    });
    hote.appendChild(barre);

    const grille = grilleRepere();
    const cartes = {};
    ['H1', 'Q1', 'F1', 'KM1', 'S1'].forEach(k => {
      const f = figureRepere(parRep[k], trouves.has(k), false);
      f.style.cursor = 'pointer';
      f.setAttribute('role', 'button');
      f.setAttribute('tabindex', '0');
      f.setAttribute('aria-label', parRep[k].nom);
      const agir = () => {
        if (trouves.has(k)) return;
        if (!choisi) {
          v.className = 'verdict wait';
          v.innerHTML = '<span class="signe">•</span>Choisissez d’abord un repère dans la rangée du haut.';
          return;
        }
        if (choisi === k) {
          trouves.add(k);
          f.querySelector('.repere-etiquette').textContent = k;
          f.style.borderColor = 'var(--ok)';
          boutons[k].className = 'bon'; boutons[k].disabled = true;
          boutons[k].setAttribute('aria-pressed', 'false');
          choisi = null;
          v.className = 'verdict ok';
          v.innerHTML = '<span class="signe">✔</span>' + parRep[k].nom + ' porte le repère ' + k + '. ' + parRep[k].famille + '.'
            + (trouves.size === REPERES.length ? ' Les cinq sont associés : la lettre du repère dit la famille de l’appareil.' : '');
        } else {
          v.className = 'verdict bad';
          v.innerHTML = '<span class="signe">✘</span>' + parRep[k].nom + ' ne porte pas le repère ' + choisi + '. '
            + 'Sa lettre est <strong>' + parRep[k].lettre + '</strong>. ' + parRep[choisi].famille + '.';
        }
      };
      f.addEventListener('click', agir);
      f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); agir(); } });
      cartes[k] = f;
      grille.appendChild(f);
    });
    hote.appendChild(grille);
    if (trouves.has('F1')) cartes.F1.style.borderColor = 'var(--ok)';

    const v = document.createElement('p');
    v.className = 'verdict wait';
    v.innerHTML = '<span class="signe">•</span>Choisissez un repère, puis cliquez sur l’appareil qu’il désigne.';
    hote.appendChild(v);
    return hote;
  },

  motsOuOnLaTrouve: ['contacteur', 'sectionneur', 'relaisThermique'],
  motVedette: 'contacteur',
  /* Les deux cartes « Les mots où elle entre » (temps 3) et « Le mot le plus dense » (temps 5) n'ont aucun rapport
     avec les repères : modele-signe.js, une fois corrigé (voir RAPPORT « communs »), les masque quand ce champ est vrai. */
  sansCartesMots: true,

  symbolesBiblio: [
    { src: 'assets/borne_3.svg', alt: "Symbole normalisé d’une borne de raccordement : un petit cercle ouvert, avec un fil de chaque côté.", legende: "Une borne : un petit cercle ouvert. Un bornier porte un repère (X1, X2…), et ses bornes sont numérotées une par une." }
  ],
  duDessinAuPlan: [
    "Sur un plan bien fait, <strong>le repère est en général du même côté du symbole, à la même distance</strong>. Ce n’est pas de la coquetterie : c’est ce qui rend un dossier lisible par quelqu’un qui ne l’a pas dessiné.",
    "<strong>Sur l’armoire, chaque appareil porte la même étiquette.</strong> Le plan et la machine se parlent.",
    "Un appareil sans repère sur un plan est un défaut de dossier, pas un oubli sans conséquence."
  ],

  quiz: [
    { question: "Un appareil repéré KM1 sur un plan, c’est…",
      confirmation: "KM est la lettre usuelle des contacteurs.",
      reponses: [
        { texte: "Un moteur.", pourquoi: "Un moteur porte M." },
        { texte: "Un contacteur.", juste: true },
        { texte: "Un sectionneur.", pourquoi: "Un sectionneur ou un disjoncteur porterait Q." },
        { texte: "Un fusible.", pourquoi: "Une protection porte F." } ] },

    { question: "À quoi sert surtout le repère, au-delà de nommer l’appareil ?",
      confirmation: "À relier des morceaux dessinés à des endroits différents.",
      reponses: [
        { texte: "À classer les appareils par prix.", pourquoi: "Rien dans un schéma ne renseigne sur le coût du matériel." },
        { texte: "À indiquer la date de pose.", pourquoi: "Aucune information de temps n’entre dans un repère." },
        { texte: "À relier des morceaux du même appareil dessinés loin l’un de l’autre.", juste: true },
        { texte: "À donner l’ordre de câblage.", pourquoi: "L’ordre de câblage se lit dans le dossier de montage, pas dans la numérotation." } ] },

    { question: "Un contact porte les numéros 21 et 22. Que savez-vous de lui ?",
      confirmation: "Les chiffres de bornes portent l’information : 21-22 est fermé au repos.",
      reponses: [
        { texte: "Il supporte 21 ampères.", pourquoi: "Le courant ne s’écrit pas dans un numéro de borne." },
        { texte: "Il est ouvert au repos.", pourquoi: "Un contact ouvert au repos porte 13-14." },
        { texte: "C’est le vingt-et-unième appareil du plan.", pourquoi: "La numérotation des appareils se fait dans le repère, pas aux bornes." },
        { texte: "Il est fermé au repos.", juste: true } ] },

    { question: "Sur un plan, un appareil n’a aucun repère. C’est…",
      confirmation: "Le repère fait partie du dossier, pas de la décoration.",
      reponses: [
        { texte: "Un défaut de dossier.", juste: true },
        { texte: "Le signe qu’il est en attente de pose.", pourquoi: "Un appareil non posé se signale autrement, en général par une note." },
        { texte: "Sans importance, le symbole suffit.", pourquoi: "Le symbole dit la fonction, pas quel appareil physique il désigne dans l’armoire." },
        { texte: "Normal pour les petits appareils.", pourquoi: "Presque tous les appareils sont repérés, quelle que soit leur taille." } ] }
  ],

  retenir: [
    "<strong>La lettre dit la famille</strong> : Q, KM, F, S, H, M, X.",
    "<strong>Le chiffre ne fait que numéroter.</strong>",
    "Un même repère à deux endroits = <strong>le même appareil</strong>.",
    "<strong>13-14</strong> : ouvert au repos. <strong>21-22</strong> : fermé au repos."
  ],

  objectifs: '<p><strong>Objectif.</strong> Lire les repères d’appareils et les numéros de bornes, et s’en servir pour relier les morceaux dispersés d’un même appareil dans un dossier.</p>',

  credits: [
    { quoi: 'Symboles normalisés EN 60617',
      source: 'bibliothèque inerWeb, convertie depuis QElectroTech',
      detail: 'svg/10_electric/10_allpole/ : 130_terminals_terminal_strips/borne_3 · 200_fuses_protective_gears/20_disconnecting_switches/sectionneur4 · 200_fuses_protective_gears/10_fuses/pojistka1p · 380_signaling_operating/20_push_buttons/poussoir · 380_signaling_operating/11_optical_signaling/lampe2 · 310_relays_contactors_contacts/01_coils/bobine3' },
    { quoi: 'Dessins de décomposition des signes',
      source: 'tracés pour ÉlectroRézo dans stations/_commun/signes.js',
      detail: 'représentations pédagogiques inspirées de la norme, faites pour être décomposées' } ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: "5.9 Lire un schéma" },
    { ligne: 8, couleur: '#7c3aed', texte: "8.7 Le pointillé" } ]
});

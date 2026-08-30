/* ÉlectroRézo 8.11 — Le jeu des symboles.
   Station écrite à la main : ce n'est ni un appareil, ni une grandeur, ni une
   lettre du schéma, mais une REVUE de tout ce que les huit lignes ont montré.
   Elle ne redessine rien : elle rejoue les symboles déjà vus, tels quels,
   depuis la bibliothèque convertie de QElectroTech. */

/* ------------------------------------------------------------------ le catalogue
   Chaque entrée dit : le fichier, son nom, sa famille, et la station où
   l'élève l'a rencontré. C'est ce dernier point qui fait la différence entre
   un jeu et un interrogatoire : quand on se trompe, on sait où retourner. */
const SYMBOLES = [
  { f: '015_inter_2.svg', nom: "Un interrupteur", famille: 'couper', vu: '3.1' },
  { f: 'sectionneur_general.svg', nom: "Un sectionneur", famille: 'couper', vu: '3.2' },
  { f: 'interrupteur_sectionneur_biphase.svg', nom: "Un interrupteur-sectionneur", famille: 'couper', vu: '3.3' },
  { f: 'porte_fusible_bi.svg', nom: "Un porte-fusible", famille: 'couper', vu: '3.4' },
  { f: 'sectionneur_fusible_bi.svg', nom: "Un sectionneur porte-fusible", famille: 'couper', vu: '3.5' },
  { f: 'pojistka1p.svg', nom: "Un fusible", famille: 'proteger', vu: '4.1' },
  { f: 'disjonct-m_1fn.svg', nom: "Un disjoncteur magnéto-thermique", famille: 'proteger', vu: '4.3' },
  { f: 'disjonct-m_3f.svg', nom: "Un disjoncteur moteur, trois pôles", famille: 'proteger', vu: '4.4' },
  { f: 'ddr2.svg', nom: "Un interrupteur différentiel", famille: 'proteger', vu: '4.5' },
  { f: 'ddr3.svg', nom: "Un disjoncteur différentiel", famille: 'proteger', vu: '4.6' },
  { f: 'relais_therm4.svg', nom: "Un relais thermique", famille: 'proteger', vu: '4.7' },
  { f: 'ground1.svg', nom: "La terre", famille: 'proteger', vu: '4.8' },
  { f: 'masse.svg', nom: "La masse", famille: 'proteger', vu: '4.8' },
  { f: 'con_simple.svg', nom: "Un contact normalement ouvert", famille: 'commander', vu: '5.1' },
  { f: 'con_simple_nf.svg', nom: "Un contact normalement fermé", famille: 'commander', vu: '5.1' },
  { f: 'bobine3.svg', nom: "Une bobine", famille: 'commander', vu: '5.2' },
  { f: 'contact_relais.svg', nom: "Un contact de relais", famille: 'commander', vu: '5.4' },
  { f: 'bobine_tempo_travail.svg', nom: "Une bobine temporisée au travail", famille: 'commander', vu: '5.5' },
  { f: 'con_simple_tmp_t.svg', nom: "Un contact temporisé au travail", famille: 'commander', vu: '5.6' },
  { f: 'con_simple_tmp_r.svg', nom: "Un contact temporisé au repos", famille: 'commander', vu: '5.6' },
  { f: 'poussoir.svg', nom: "Un bouton-poussoir à fermeture", famille: 'commander', vu: '5.7' },
  { f: 'poussoir_nf.svg', nom: "Un bouton-poussoir à ouverture", famille: 'commander', vu: '5.7' },
  { f: 'commut_2_position_fixe.svg', nom: "Un commutateur à deux positions", famille: 'commander', vu: '5.7' },
  { f: 'au.svg', nom: "Un arrêt d’urgence", famille: 'commander', vu: '5.8' },
  { f: 'fin_de_course_came_no.svg', nom: "Un contact de fin de course", famille: 'commander', vu: '5.8' },
  { f: 'lampe2.svg', nom: "Un voyant", famille: 'commander', vu: '5.8' },
  { f: 'electrovanne.svg', nom: "Une électrovanne", famille: 'machines', vu: '6.1' },
  { f: 'transfo_mono.svg', nom: "Un transformateur monophasé", famille: 'machines', vu: '6.2' },
  { f: 'transfo_tri.svg', nom: "Un transformateur triphasé", famille: 'machines', vu: '6.2' },
  { f: 'moteur_tri.svg', nom: "Un moteur triphasé", famille: 'machines', vu: '6.3' },
  { f: 'moteur_mono.svg', nom: "Un moteur monophasé", famille: 'machines', vu: '6.5' },
  { f: 'moteur_dc.svg', nom: "Un moteur à courant continu", famille: 'machines', vu: '6.6' },
  { f: 'ac1_ac1.svg', nom: "Un gradateur", famille: 'varier', vu: '7.2' },
  { f: 'static_freq_converter.svg', nom: "Un variateur de fréquence", famille: 'varier', vu: '7.4' },
  { f: 'redresseur.svg', nom: "Un redresseur", famille: 'varier', vu: '7.4' },
  { f: 'cross.svg', nom: "Deux fils qui se croisent", famille: 'lire', vu: '8.1' },
  { f: 'jump.svg', nom: "Un fil qui saute par-dessus", famille: 'lire', vu: '8.1' },
  { f: 'borne_3.svg', nom: "Un bornier", famille: 'lire', vu: '8.9' }
];

const FAMILLES = {
  couper:    { nom: 'Couper et isoler',   ligne: 3, dit: "Un contact qui s’ouvre. Ce qu’on ajoute autour dit s’il coupe seulement, ou s’il permet aussi d’aller travailler derrière." },
  proteger:  { nom: 'Protéger',           ligne: 4, dit: "Un crochet, un demi-cercle, un rectangle, un tore. Chaque signe est un défaut surveillé — et son absence, un défaut qui passera." },
  commander: { nom: 'Commander',          ligne: 5, dit: "Une bobine décide, des contacts obéissent. Le pointillé dit qu’ils sont reliés, même quand ils sont dessinés à trois mètres l’un de l’autre." },
  machines:  { nom: 'Les machines',       ligne: 6, dit: "Un rond, et une lettre dedans. La lettre dit laquelle : M pour un moteur, G pour une génératrice." },
  varier:    { nom: 'Faire varier',       ligne: 7, dit: "Un rectangle traversé, avec deux signes qui disent ce qui entre et ce qui sort : alternatif, continu, ou l’un puis l’autre." },
  lire:      { nom: 'Lire le plan',       ligne: 8, dit: "Ni un appareil, ni une fonction : la grammaire. Un point dit que les fils se touchent, un saut dit qu’ils ne se touchent pas." }
};

/* ---------------------------------------------------------------- le tirage
   Un tirage sans mémoire reposerait deux fois le même symbole et en laisserait
   d'autres de côté. On mélange une fois, on parcourt. */
function melanger(t) {
  const c = t.slice();
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

/* Les trois mauvaises réponses viennent d'abord de la MÊME famille : proposer
   « un moteur triphasé » en face d'un fusible n'apprend rien à personne, et
   fait gagner par élimination. On complète ailleurs s'il en manque. */
function distracteurs(bon, combien) {
  const memeFamille = melanger(SYMBOLES.filter(s => s.famille === bon.famille && s.nom !== bon.nom));
  const ailleurs = melanger(SYMBOLES.filter(s => s.famille !== bon.famille));
  return memeFamille.concat(ailleurs).slice(0, combien);
}

const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c;
                          if (x !== undefined) n.textContent = x; return n; };
const carte = titre => { const s = el('section', 'card'); if (titre) s.appendChild(el('h2', null, titre)); return s; };
const img = (f, alt) => { const i = document.createElement('img'); i.src = 'assets/' + f;
                          i.alt = alt; i.loading = 'lazy'; return i; };

Station.demarrer({
  id: '8.11', ligne: 8,
  kicker: 'ÉlectroRézo · Ligne 8 Lire un schéma · Station 11',
  titre: "Le jeu des symboles",
  narration: NARRATION,
  niveaux: [{ id: 'CAP', libelle: 'CAP' }, { id: 'BAC', libelle: 'Bac pro' }],

  temps: [
    /* ------------------------------------------------------ 1 · découvrir */
    { id: 'decouvrir', onglet: '1 · Sur un plan', titre: 'Personne ne vous dira ce que c’est',
      narration: NARRATION.decouvrir,
      monter(hote) {
        const w = el('div', 'workspace');
        const g = carte('Six signes, pris au hasard dans ce que vous avez vu');
        const gr = el('div', 'symboles');
        melanger(SYMBOLES).slice(0, 6).forEach(s => {
          const fig = document.createElement('figure');
          fig.appendChild(img(s.f, 'Un symbole normalisé, à reconnaître.'));
          fig.appendChild(el('figcaption', null, '?'));
          gr.appendChild(fig);
        });
        g.appendChild(gr);
        Station.credit(g, 'Symboles EN 60617 — bibliothèque inerWeb, convertie depuis QElectroTech.');

        const d = carte('Ce que ça change');
        [["Sur un plan d’armoire, il n’y a pas de légende à côté de chaque dessin. Il y a un repère — <strong>Q1</strong>, <strong>KM2</strong>, <strong>F3</strong> — et un symbole. Le reste, c’est vous."],
         ["Un technicien qui hésite entre un sectionneur et un interrupteur-sectionneur ne perd pas une minute : il perd le droit d’aller travailler derrière."],
         ["Cette station ne vous apprend rien de neuf. Elle vérifie que ce que vous avez vu est <strong>resté</strong>."]]
          .forEach(([x]) => { const p = el('p'); p.innerHTML = x; d.appendChild(p); });
        w.append(g, d);
        hote.appendChild(w);
      } },

    /* ------------------------------------------------------ 2 · comprendre */
    { id: 'comprendre', onglet: '2 · Six familles', titre: 'Ce que la forme dit de la fonction',
      narration: NARRATION.comprendre,
      monter(hote) {
        const g = carte('Six familles, six façons de dessiner');
        g.appendChild(el('p', 'legende',
          'Un symbole n’est pas un logo : chacun de ses traits porte une information. Reconnaître la famille, c’est déjà avoir réduit le champ.'));
        Object.entries(FAMILLES).forEach(([cle, fam]) => {
          const bloc = el('div', 'famille');
          const gr = el('div', 'symboles');
          SYMBOLES.filter(s => s.famille === cle).slice(0, 3).forEach(s => {
            const fig = document.createElement('figure');
            fig.appendChild(img(s.f, s.nom + '.'));
            fig.appendChild(el('figcaption', null, s.nom));
            gr.appendChild(fig);
          });
          bloc.appendChild(el('h3', null, fam.nom + ' — ligne ' + fam.ligne));
          bloc.appendChild(el('p', null, fam.dit));
          bloc.appendChild(gr);
          g.appendChild(bloc);
        });
        hote.appendChild(g);
      } },

    /* ------------------------------------------------------ 3 · le jeu */
    { id: 'manipuler', onglet: '3 · Le jeu', titre: 'Douze symboles, à nommer',
      narration: NARRATION.manipuler,
      monter(hote) { monterLeJeu(hote); } },

    /* ------------------------------------------------------ 4 · la planche */
    { id: 'representer', onglet: '4 · La planche', titre: 'Tout, sur une page',
      narration: NARRATION.representer,
      monter(hote) {
        const g = carte('Les ' + SYMBOLES.length + ' symboles du réseau');
        g.appendChild(el('p', 'legende',
          'À garder, ou à imprimer. Le numéro sous chaque symbole est la station où on l’a vu : c’est là qu’il est expliqué.'));
        Object.entries(FAMILLES).forEach(([cle, fam]) => {
          const liste = SYMBOLES.filter(s => s.famille === cle);
          if (!liste.length) return;
          g.appendChild(el('h3', null, fam.nom));
          const gr = el('div', 'symboles');
          liste.forEach(s => {
            const fig = document.createElement('figure');
            fig.appendChild(img(s.f, s.nom + '.'));
            fig.appendChild(el('figcaption', null, s.nom));
            fig.appendChild(el('div', 'legende', 'station ' + s.vu));
            gr.appendChild(fig);
          });
          g.appendChild(gr);
        });
        Station.credit(g, 'Symboles EN 60617 — bibliothèque inerWeb, convertie depuis QElectroTech. Rien n’a été redessiné : ce sont les mêmes fichiers que dans les stations d’origine.');
        hote.appendChild(g);
      } },

    /* ------------------------------------------------------ 5 · vérifier */
    { id: 'verifier', onglet: '5 · Vérifier', titre: 'Questions', narration: '',
      monter(hote) {
        Station.monterQuiz(hote, [
          { question: "Sur un plan, vous voyez un contact incliné surmonté d’une petite barre horizontale. Que pouvez-vous en conclure ?",
            reponses: [
              { texte: "L’appareil a l’aptitude au sectionnement : on peut travailler derrière.", juste: true },
              { texte: "L’appareil est protégé contre les surcharges.",
                pourquoi: "Ce serait le crochet du bilame. La barre courte parle du sectionnement, pas de protection." },
              { texte: "L’appareil est commandé à distance.",
                pourquoi: "Ce serait un pointillé vers une bobine. La barre ne dit rien de la commande." } ] },
          { question: "Un symbole porte un crochet rectangulaire ET un demi-cercle. C’est…",
            reponses: [
              { texte: "Un appareil qui voit la surcharge et le court-circuit.", juste: true },
              { texte: "Un appareil qui voit le défaut d’isolement.",
                pourquoi: "Le défaut d’isolement se voit avec un tore différentiel, pas avec ces deux signes-là." },
              { texte: "Un relais thermique.",
                pourquoi: "Le relais thermique porte le crochet seul : il ne voit pas le court-circuit." } ] },
          { question: "Pourquoi les mauvaises réponses de ce jeu viennent-elles, autant que possible, de la même famille ?",
            reponses: [
              { texte: "Parce que se tromper entre deux appareils voisins est l’erreur qu’on fait vraiment sur un plan.", juste: true },
              { texte: "Pour rendre le jeu plus difficile.",
                pourquoi: "La difficulté n’est pas le but : la ressemblance des vrais symboles l’est." },
              { texte: "Parce qu’il n’y a pas assez de symboles pour faire autrement.",
                pourquoi: "Il y en a " + SYMBOLES.length + " : de quoi piocher n’importe où." } ] },
          { question: "Vous ne reconnaissez pas un symbole sur un plan d’installation. Que faites-vous ?",
            reponses: [
              { texte: "Je cherche son repère et je remonte à la nomenclature du dossier.", juste: true },
              { texte: "Je déduis sa fonction de sa place dans le schéma.",
                pourquoi: "La place aide, mais elle ne prouve rien. Un sectionneur et un interrupteur-sectionneur occupent la même." },
              { texte: "Je demande à un collègue et je note sa réponse.",
                pourquoi: "Demander est bien. S’en contenter, non : c’est le dossier qui fait foi, pas la mémoire d’un tiers." } ] }
        ]);
      } }
  ],

  retenir: [
    "<strong>Un symbole se lit par ses signes</strong>, pas d’un coup d’œil global.",
    "<strong>La famille d’abord</strong> : couper, protéger, commander, machine, variation, grammaire du plan.",
    "<strong>Ce qui manque compte autant que ce qui est là.</strong> Pas de crochet, pas de surveillance de surcharge.",
    "Un doute sur un plan se lève avec la <strong>nomenclature du dossier</strong>, jamais de mémoire."
  ],

  objectifs: '<p><strong>Objectif.</strong> Reconnaître, hors de leur station d’origine, les ' + SYMBOLES.length +
    ' symboles normalisés rencontrés dans le réseau, et savoir dire à quelle fonction chacun répond.</p>' +
    '<p><strong>Limites.</strong> Cette station ne remplace aucune des huit lignes : elle les rejoue. ' +
    'Les symboles y sont montrés seuls, alors qu’un plan les montre reliés — lire un schéma entier ' +
    'reste l’affaire de la station 5.9.</p>',

  credits: [
    { source: 'Symboles EN 60617', detail: 'Bibliothèque inerWeb de symboles, convertie depuis QElectroTech (licence GPL). Aucun symbole n’a été redessiné.' }
  ],

  correspondances: [
    { ligne: 5, couleur: '#1e7e54', texte: '5.9 Lire un schéma' },
    { ligne: 8, couleur: '#7c3aed', texte: '8.10 Déchiffrer un symbole inconnu' },
    { ligne: 4, couleur: '#c0392b', texte: '4.3 Le disjoncteur magnéto-thermique' }
  ]
});

/* ================================================================= le jeu */
function monterLeJeu(hote) {
  const TOURS = 12;
  const g = carte('Nommez le symbole');
  g.appendChild(el('p', 'legende',
    'Douze symboles tirés au hasard. Les mauvaises réponses viennent de la même famille : c’est là que se font les vraies confusions. Une réponse fausse dit où le symbole a été vu.'));

  const entete = el('div', 'jeu-entete');
  const compteur = el('span', 'compteur', '');
  const score = el('span', 'compteur', '');
  entete.append(compteur, score);

  const fig = document.createElement('figure');
  fig.className = 'symbole-jeu';
  const image = document.createElement('img');
  fig.appendChild(image);

  const choix = el('div', 'choix');
  const verdict = el('p', 'verdict');
  verdict.setAttribute('role', 'status');
  const journal = el('ul', 'journal');
  g.append(entete, fig, choix, verdict, journal);
  hote.appendChild(g);

  let tirage = [], i = 0, bons = 0, repondu = false;

  function commencer() {
    tirage = melanger(SYMBOLES).slice(0, TOURS);
    i = 0; bons = 0; journal.innerHTML = '';
    poser();
  }

  function poser() {
    repondu = false;
    if (i >= tirage.length) return conclure();
    const s = tirage[i];
    compteur.textContent = 'Symbole ' + (i + 1) + ' sur ' + tirage.length;
    score.textContent = bons + ' juste' + (bons > 1 ? 's' : '');
    image.src = 'assets/' + s.f;
    image.alt = 'Symbole normalisé à reconnaître, question ' + (i + 1) + '.';
    verdict.textContent = ''; verdict.className = 'verdict';

    choix.innerHTML = '';
    melanger([s, ...distracteurs(s, 3)]).forEach(p => {
      const b = el('button', null, p.nom); b.type = 'button';
      b.addEventListener('click', () => repondre(p, s, b));
      choix.appendChild(b);
    });
  }

  function repondre(choisi, bon, bouton) {
    if (repondu) return;
    repondu = true;
    const juste = choisi.nom === bon.nom;
    if (juste) bons++;
    [...choix.children].forEach(b => {
      b.disabled = true;
      if (b.textContent === bon.nom) b.classList.add('bon');
    });
    if (!juste) bouton.classList.add('rate');
    verdict.className = 'verdict ' + (juste ? 'ok' : 'bad');
    verdict.textContent = juste
      ? 'Oui. ' + bon.nom + ' — vu à la station ' + bon.vu + '.'
      : 'Non : c’est ' + bon.nom.charAt(0).toLowerCase() + bon.nom.slice(1)
        + '. Il est expliqué à la station ' + bon.vu + '.';

    const li = el('li', juste ? 'bon' : 'rate',
      bon.nom + ' — ' + (juste ? 'trouvé' : 'raté, station ' + bon.vu));
    journal.appendChild(li);

    const suite = el('button', 'primary', i + 1 >= tirage.length ? 'Voir le résultat' : 'Symbole suivant ▶');
    suite.type = 'button';
    suite.addEventListener('click', () => { i++; poser(); });
    choix.appendChild(suite);
    suite.focus();
  }

  function conclure() {
    compteur.textContent = 'Terminé';
    score.textContent = bons + ' sur ' + tirage.length;
    image.removeAttribute('src'); image.alt = '';
    fig.style.display = 'none';
    choix.innerHTML = '';
    verdict.className = 'verdict ' + (bons >= tirage.length - 2 ? 'ok' : 'bad');
    verdict.textContent = bons === tirage.length
      ? 'Les douze. Vous pouvez ouvrir un plan.'
      : bons >= tirage.length - 2
        ? 'Solide. Les deux qui manquent sont dans le journal, avec leur station.'
        : 'Les ratés sont listés ci-dessous avec leur station : c’est là qu’il faut retourner, pas ici.';
    const rejouer = el('button', 'primary', '↻ Rejouer, autre tirage');
    rejouer.type = 'button';
    rejouer.addEventListener('click', () => { fig.style.display = ''; commencer(); });
    choix.appendChild(rejouer);
  }

  commencer();
}

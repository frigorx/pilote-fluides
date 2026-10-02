/* CartoClim — le kit des scènes dessinées, partagé par toutes les stations.
   Une scène de station vit dans stations/<id>/scenes.js et s'écrit avec ces outils :

     const { svg, C, pasAPas, etats, reglette, nb } = SceneKit;

   · svg(viewBox, aria)                   le dessin, classe .scene, fond papier à poser soi-même
   · pasAPas(dessin, etapes, legende)     LE format par défaut (CONTRAT-STATION.md) : 3 à 6 étapes,
                                          une étape = un évènement physique, cause → effet ;
                                          chaque étape = { titre, peindre(), dire } ; boutons numérotés,
                                          « ▶ Dérouler » enchaîne tout seul (le film avance seul)
   · etats(dessin, etats, defaut, legende) des coupes commutables (boutons d'état), pour un réglage ou une variante
   · reglette(hote, id, libelle, min, max, pas, valeur, afficher, auChangement)  un curseur
   · nb(valeur, decimales)                un nombre écrit à la française
   · C                                    la palette de la charte — jamais de blanc pur

   Règles de maison tenues ici : aucun texte sur un tracé (on le vérifie à l'œil et par la planche),
   le dessin au repos est déjà l'image finale, le mouvement ne fait que raconter comment on y arrive. */
const SceneKit = (() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const C = { navy: '#1b3a63', bleu: '#3d7fca', doux: '#84b7ec', orange: '#c9451a',
              feu: '#ff6b35', vert: '#1e7e54', rouge: '#c0392b', gris: '#637285', ambre: '#b06a00',
              papier: '#fffdf8', creme: '#f7f1e7', trait: 'rgba(27,58,99,.18)',
              froid: '#3d7fca', chaud: '#c0392b', eau: '#176b73', air: '#84b7ec' };
  const nb = (v, d = 0) => Number(v).toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });

  function svg(viewBox, aria) {
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', viewBox);
    s.setAttribute('class', 'scene');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', aria);
    return s;
  }
  const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x !== undefined) n.textContent = x; return n; };

  /* Le pas à pas. L'étape courante est peinte, son titre et sa phrase sont affichés sous le dessin. */
  function pasAPas(dessin, etapes, legende) {
    const hote = el('div', 'pas-a-pas');
    hote.appendChild(dessin);
    const barre = el('div', 'choix'); barre.style.marginTop = '.6rem';
    const titre = el('p', 'legende'); titre.style.fontWeight = '700'; titre.style.color = C.navy;
    const dire = el('p', 'legende');
    let courante = -1, film = null;
    const stop = () => { if (film) { clearInterval(film); film = null; btFilm.textContent = '▶ Dérouler'; btFilm.setAttribute('aria-pressed', 'false'); } };
    const aller = i => {
      courante = i;
      etapes[i].peindre();
      titre.textContent = (i + 1) + '. ' + etapes[i].titre;
      dire.textContent = etapes[i].dire || '';
      barre.querySelectorAll('button[data-etape]').forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    };
    etapes.forEach((e, i) => {
      const b = el('button', null, String(i + 1) + ' · ' + e.titre); b.type = 'button'; b.dataset.etape = i;
      b.addEventListener('click', () => { stop(); aller(i); });
      barre.appendChild(b);
    });
    const btFilm = el('button', 'primary', '▶ Dérouler'); btFilm.type = 'button'; btFilm.setAttribute('aria-pressed', 'false');
    btFilm.addEventListener('click', () => {
      if (film) return stop();
      btFilm.textContent = '⏸ Arrêter'; btFilm.setAttribute('aria-pressed', 'true');
      if (courante >= etapes.length - 1) aller(0);
      film = setInterval(() => {
        if (!dessin.isConnected) return stop();          /* on a quitté le temps : le film s'arrête */
        if (courante >= etapes.length - 1) return stop();
        aller(courante + 1);
      }, 2600);
    });
    barre.appendChild(btFilm);
    hote.append(barre, titre, dire);
    if (legende) hote.appendChild(el('p', 'legende', legende));
    aller(0);
    return hote;
  }

  /* Des coupes commutables : chaque état = { id, libelle, appliquer(), legende }. */
  function etats(dessin, liste, defaut, legende) {
    const hote = el('div');
    hote.appendChild(dessin);
    const leg = el('p', 'legende', legende);
    if (liste.length > 1) {
      const barre = el('div', 'choix'); barre.style.marginTop = '.6rem';
      liste.forEach(e => {
        const b = el('button', null, e.libelle); b.type = 'button';
        b.setAttribute('aria-pressed', String(e.id === defaut));
        b.addEventListener('click', () => {
          barre.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          e.appliquer();
          if (e.legende) leg.textContent = e.legende;
        });
        barre.appendChild(b);
      });
      hote.appendChild(barre);
    }
    hote.appendChild(leg);
    return hote;
  }

  /* Un curseur, avec son libellé et sa valeur affichée. */
  function reglette(hote, id, libelle, min, max, pas, valeur, afficher, auChangement) {
    const w = el('div', 'reglette');
    const l = el('label', null, libelle + ' '); l.htmlFor = 'rg-' + id;
    const r = document.createElement('input'); r.type = 'range'; r.id = 'rg-' + id;
    r.min = min; r.max = max; r.step = pas; r.value = valeur;
    const out = el('output', null, afficher(valeur)); out.htmlFor = 'rg-' + id;
    r.addEventListener('input', () => { out.textContent = afficher(+r.value); auChangement(+r.value); });
    w.append(l, r, out);
    hote.appendChild(w);
    return r;
  }

  /* Les pictogrammes du temps 3 : une tuile par aptitude, neutre tant qu'on n'a pas validé,
     puis verte (il sait) ou barrée (il ne sait pas). colonnes = [{ id, libelle, dessin }],
     dessin = tracés SVG dans un carré 0 0 100 100, sans couleur (le kit la pose). */
  function pictos(colonnes) {
    const d = svg('0 0 ' + colonnes.length * 170 + ' 150', 'Pictogrammes : ' + colonnes.map(c => c.libelle).join(', '));
    const peindre = verdict => {
      d.innerHTML = colonnes.map((c, i) => {
        const x = i * 170;
        const etat = !verdict ? 'neutre' : verdict[c.id] ? 'oui' : 'non';
        const couleur = etat === 'oui' ? C.vert : etat === 'non' ? C.gris : C.navy;
        return `<g transform="translate(${x + 35},8)">
  <rect width="100" height="100" rx="16" fill="${C.papier}" stroke="${couleur}" stroke-width="4"/>
  <g transform="translate(10,10) scale(.8)" fill="none" stroke="${couleur}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${c.dessin || ''}</g>
  ${etat === 'non' ? `<line x1="16" y1="16" x2="84" y2="84" stroke="${C.rouge}" stroke-width="7" stroke-linecap="round"/>` : ''}
  ${etat === 'oui' ? `<circle cx="86" cy="14" r="13" fill="${C.vert}"/><path d="M79 14 l5 5 l9 -10" fill="none" stroke="#fffdf8" stroke-width="3.5" stroke-linecap="round"/>` : ''}
</g>
<text x="${x + 85}" y="135" text-anchor="middle" font-size="14" font-weight="700" fill="${couleur}">${c.libelle}</text>`;
      }).join('');
    };
    peindre(null);
    return { element: d, marquer: v => peindre(v) };
  }
  /* Trois dessins prêts à l'emploi pour les aptitudes d'un climatiseur. */
  pictos.DESSINS = {
    froid: '<path d="M50 8 V92 M14 29 L86 71 M14 71 L86 29 M50 8 l-11 12 M50 8 l11 12 M50 92 l-11 -12 M50 92 l11 -12 M14 29 l15 -4 M14 29 l4 15 M86 71 l-15 4 M86 71 l-4 -15"/>',
    chaud: '<path d="M50 10 C 28 40, 22 58, 34 78 C 42 90, 58 90, 66 78 C 78 58, 72 40, 50 10 Z"/><path d="M50 52 c-7 9 -7 18 0 26 c7 -8 7 -17 0 -26"/>',
    air: '<path d="M22 44 a28 28 0 0 1 50 -14 l10 -10 M78 56 a28 28 0 0 1 -50 14 l-10 10"/><path d="M82 20 v12 h-12 M18 80 v-12 h12"/>'
  };

  return { svg, C, nb, pasAPas, etats, reglette, pictos, NS };
})();

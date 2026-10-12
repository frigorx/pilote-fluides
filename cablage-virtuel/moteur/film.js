/* =====================================================================
   CÂBLAGE VIRTUEL — le mode film (12/10/2026).
   ---------------------------------------------------------------------
   Franck : la vidéo « Câbler une armoire, du bornier au moteur » (le repérage des bornes ; scénario et cadrage dans
   Documents/inerweb-video/cablage-auto-maintien). Adresse : jouer.html?ex=<id>&mode=reel&platine=reelle&film.
   cablage.js ouvre un crochet (window.CABLAGE_FILM) puis charge ce fichier, qui fait de l'écran un plateau 16/9 : la carte
   à gauche, la platine à droite, un bandeau en bas, le filigrane inerWeb — ni barre, ni consigne, ni outils. Le robot
   (outils/filmer.mjs) joue les plans du scénario par window.FILM : poser un fil (tracé lentement), éclairer, cadrer en
   douceur, masquer un numéro de la carte (« ? ») puis le révéler, écrire le bandeau, un carton de titre.
   ===================================================================== */
(function () {
'use strict';
const H = window.CABLAGE_FILM; if (!H) return;
const NS = 'http://www.w3.org/2000/svg';
const BLEU = '#1B3A63', ORANGE = '#e8914a';
const $ = (s) => document.querySelector(s);
const attendre = (ms) => new Promise(r => setTimeout(r, ms));
const lisse = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

document.body.classList.add('film');
const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'moteur/film.css?v=dev'; document.head.appendChild(css);

const bandeau = document.createElement('div'); bandeau.id = 'film-bandeau'; document.body.appendChild(bandeau);
const carton = document.createElement('div'); carton.id = 'film-carton'; carton.hidden = true; document.body.appendChild(carton);

/* Le filigrane des vidéos inerWeb (Franck, 03/10 ; modèle : jouerezo/moteur/voyage-dessin.js D.filigrane) : le logo de la charte,
   cartouche « Studio », « by inerweb.fr » ; trois exemplaires pâles, dont un au centre (il survit au recadrage). */
(function filigrane() {
  const svg = document.createElementNS(NS, 'svg'); svg.id = 'film-filigrane';
  svg.setAttribute('viewBox', '0 0 1920 1080'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('aria-hidden', 'true');
  const el = (nom, attrs, parent, texte) => { const e = document.createElementNS(NS, nom); Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); if (texte) e.textContent = texte; parent.appendChild(e); return e; };
  [[480, 300], [960, 560], [1440, 820]].forEach(([x, y]) => {
    const m = el('g', { transform: 'translate(' + x + ' ' + y + ') rotate(-12) translate(-200 -66)' }, svg);
    el('text', { x: 0, y: 80, 'font-size': 56, fill: BLEU }, m, '❄️');
    el('text', { x: 76, y: 75, 'font-size': 52, 'font-weight': 700, fill: BLEU, 'font-family': 'Trebuchet MS, Trebuchet, sans-serif' }, m, 'iner');
    el('text', { x: 171, y: 75, 'font-size': 52, fill: BLEU, 'font-family': 'Segoe Script, Brush Script MT, cursive' }, m, 'Web');
    el('line', { x1: 76, x2: 276, y1: 80, y2: 80, stroke: ORANGE, 'stroke-width': 4 }, m);
    el('rect', { x: 281, y: 8, rx: 7, width: 120, height: 38, fill: ORANGE }, m);
    el('text', { x: 341, y: 34, 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 700, fill: '#fff', 'font-family': 'Segoe UI, Helvetica, Arial, sans-serif' }, m, 'Studio');
    el('text', { x: 76, y: 122, 'font-size': 30, 'font-weight': 700, fill: BLEU, 'font-family': 'Trebuchet MS, Trebuchet, sans-serif' }, m, 'by inerweb.fr');
  });
  document.body.appendChild(svg);
})();

// Les points visés : une borne (« Q1:3 ») ou tout un appareil (« Q1 »), sur la carte ou sur la platine (unités de leur dessin)
function points(panneau, cibles) {
  const EX = H.ex(), pts = [];
  cibles.forEach(c => {
    if (panneau === 'carte') {
      EX.carte.bornes.forEach(b => { if (b.ref === c || b.ref.split(':')[0] === c) pts.push(b); });
      (EX.carte.appareils || []).forEach(a => { if (a.repere === c) pts.push(a); });
    } else {
      H.bornes().forEach(r => { if (r === c || r.split(':')[0] === c) pts.push(H.borne(r)); });
    }
  });
  return pts;
}
function vb(svg) { return svg.getAttribute('viewBox').split(/[\s,]+/).map(Number); }
// Cadrer en douceur : la vue d'arrivée est celle que donne le zoom du jeu (mêmes règles), puis on y glisse image par image
async function glisser(panneau, viser, ms) {
  const p = document.getElementById(panneau), z = p && p._zoom, corps = p && p.querySelector('.corps'), svg = corps && corps.querySelector('svg');
  if (!z || !svg) return;
  const ratio = corps.clientWidth / corps.clientHeight, de = vb(svg);
  viser(z, ratio); const vers = vb(svg);
  if (!ms) return;
  const t0 = performance.now();
  await new Promise(fin => {
    const pas = (t) => {
      const k = lisse(Math.min(1, (t - t0) / ms)), v = de.map((d, i) => d + (vers[i] - d) * k);
      z.cadrer({ x: v[0], y: v[1], w: v[2], h: v[3], vue: true }, 0, ratio);
      if (k < 1) requestAnimationFrame(pas); else fin();
    };
    requestAnimationFrame(pas);
  });
}
const masques = {};
// la couleur d'un fil : celle que donne l'exercice pour ce conducteur, sauf couleur demandée par le plan
function couleurDe(de, a, c) {
  if (c) return c;
  const e = H.ex().etapes.find(x => (x.de === de && x.a === a) || (x.de === a && x.a === de));
  return (e && e.couleur) || 'marron';
}
// la question de la version révision : écrite en haut de l'écran (la voix la lit), puis un compte à rebours
const boite = document.createElement('div'); boite.id = 'film-question'; boite.hidden = true; document.body.appendChild(boite);

// l'image témoin (magenta, plein écran) : le robot la montre un instant avant le premier plan ; le montage la retrouve dans la
// vidéo et en déduit le décalage entre son horloge et l'image (outils/filmer.mjs, Documents/inerweb-video/…/outils/monter.py)
const top = document.createElement('div'); top.id = 'film-top'; top.hidden = true; document.body.appendChild(top);
const FILM = {
  attendre,
  top(oui) { top.hidden = !oui; },
  bandeau(texte) { bandeau.textContent = texte || ''; bandeau.classList.toggle('vide', !texte); },
  // le carton de titre, plein écran (null : il s'efface)
  carton(titre, sous) {
    if (!titre) { carton.hidden = true; return; }
    carton.innerHTML = ''; const h = document.createElement('h1'); h.textContent = titre; carton.appendChild(h);
    if (sous) { const p = document.createElement('p'); p.textContent = sous; carton.appendChild(p); }
    carton.hidden = false;
  },
  // un fil tracé lentement de sa première borne à la seconde ; renvoie false si le jeu l'a refusé (déjà posé, bornes inconnues)
  async poser(de, a, couleur, ms = 1400) {
    const f = H.poser(de, a, couleurDe(de, a, couleur)); if (!f) return false;
    [f.contour, f.el].forEach(p => {
      const L = p.getTotalLength(); p.style.strokeDasharray = L + ' ' + L;
      p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: ms, easing: 'ease-in-out', fill: 'both' });
    });
    await attendre(ms);
    return true;
  },
  // l'état de départ d'un épisode : les fils des épisodes précédents, posés d'un coup
  poserTout(liste) { liste.forEach(([de, a, c]) => H.poser(de, a, couleurDe(de, a, c))); },
  // question(texte) l'affiche, question(null) l'efface ; decompte(s) égrène les secondes sous la question
  question(texte) {
    if (!texte) { boite.hidden = true; return; }
    boite.innerHTML = ''; const q = document.createElement('p'); q.textContent = texte; boite.appendChild(q); boite.hidden = false;
  },
  async decompte(s) {
    const n = document.createElement('b'); boite.appendChild(n);
    for (let i = s; i > 0; i--) { n.textContent = i; await attendre(1000); }
    n.remove();
  },
  vider() { H.vider(); },
  eclairer(refs, reps) { H.eclairer(refs || [], reps || []); },
  conducteur(de, a) { H.conducteur(de || null, a || null); },
  async cadrer(panneau, cibles, ms = 900, marge = 70) {
    const pts = points(panneau, cibles); if (!pts.length) return;
    const xs = pts.map(q => q.x), ys = pts.map(q => q.y), x = Math.min(...xs) - marge, y = Math.min(...ys) - marge;
    await glisser(panneau, (z, ratio) => z.cadrer({ x, y, w: Math.max(...xs) + marge - x, h: Math.max(...ys) + marge - y }, 0, ratio), ms);
  },
  async toutVoir(panneau, ms = 900) { await glisser(panneau, (z) => z.ajuster(), ms); },
  // sur la carte, le numéro d'une borne remplacé par « ? » (le guidé du scénario), puis rendu
  masquer(refs) {
    const svg = $('#carte-corps svg'), EX = H.ex();
    refs.forEach(ref => {
      const b = EX.carte.bornes.find(q => q.ref === ref); if (!b || masques[ref]) return;
      const t = [...svg.querySelectorAll('text.cb-nom')].find(q => Math.abs(+q.getAttribute('x') - b.x - 5) < 0.5 && Math.abs(+q.getAttribute('y') - b.y + 4) < 0.5);
      if (!t) return;
      t.style.visibility = 'hidden';
      const m = document.createElementNS(NS, 'text'); m.setAttribute('class', 'film-masque');
      m.setAttribute('x', b.x + 5); m.setAttribute('y', b.y - 4); m.textContent = '?'; t.parentNode.appendChild(m);
      masques[ref] = { t, m };
    });
  },
  reveler(refs) {
    refs.forEach(ref => { const q = masques[ref]; if (!q) return; q.m.remove(); q.t.style.visibility = ''; q.t.classList.add('film-revele'); delete masques[ref]; });
  }
};
// prêt quand le plateau est en place : film.css chargé et la mise en page posée (sinon le jeu recadre tout derrière nous)
css.addEventListener('load', async () => { await attendre(400); window.FILM = FILM; document.dispatchEvent(new Event('film-pret')); });
})();

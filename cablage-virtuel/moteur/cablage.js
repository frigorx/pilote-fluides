/* =====================================================================
   CÂBLAGE VIRTUEL — moteur du jeu (inerWeb Édu).
   ---------------------------------------------------------------------
   CONTRAT : jouer.html charge exercices/index.js puis ce script.
     ?ex=<id>            l'exercice (exercices/<id>.js, chargé ici)
     ?mode=guide|aide|reel
     ?vue=carte          n'affiche que la carte (deuxième écran) et suit la
                         fenêtre de jeu par BroadcastChannel.
   PRINCIPE : le contrôle se fait PAR RÉSEAUX (ensembles de bornes au même
   potentiel), pas fil par fil. Deux fils tirés dans un autre ordre mais
   reliant les mêmes bornes sont justes. Les liaisons internes d'un
   appareil (les deux côtés d'une borne de bornier) comptent comme un fil
   déjà posé — le même mécanisme portera plus tard les contacts NO/NC
   d'une simulation.
   ENTRÉE : souris ou doigt (pointer events). Deux gestes : glisser d'une
   borne à l'autre, ou toucher une borne puis l'autre.
   ===================================================================== */
(function () {
'use strict';

const COULEURS = { marron: '#6b3e1e', noir: '#111111', gris: '#8a8f98', bleu: '#1f5fd6',
                   'vert-jaune': '#3fae2a', rouge: '#d62828', orange: '#f0842c', blanc: '#e9e9e9' };
const ECH = 1.6;              // échelle des symboles QElectroTech sur la platine
const SORTIE = 16;            // sortie droite d'une borne avant le premier coude
const RAYON_BORNE = 7, RAYON_PRISE = 22;
const DIR = [[0, -1], [1, 0], [0, 1], [-1, 0]];   // orientation QElectroTech : 0 nord 1 est 2 sud 3 ouest
const NS = 'http://www.w3.org/2000/svg';

const P = new URLSearchParams(location.search);
const ID = P.get('ex');
const VUE = P.get('vue');
const MODE = ['guide', 'aide', 'reel'].includes(P.get('mode')) ? P.get('mode') : 'guide';
const $ = (s) => document.querySelector(s);

let EX, fils = [], couleur = 'marron', armee = null, choisi = null, trace = null;
let aides = 0, niveauAide = 0, cibleAide = null, etapeIdx = 0, debut = Date.now(), controle = false;
const bornes = {};            // 'Q1:2' -> {ref, rep, id, x, y, o, el}
const cartesBornes = {};      // 'Q1:2' -> [cercles sur la carte]
let svgPlatine, gFils, gManques, filTemp;
let canal = null;
try { canal = ID && 'BroadcastChannel' in window ? new BroadcastChannel('cablage-virtuel-' + ID) : null; } catch (e) { canal = null; }

// ------------------------------------------------------------ utilitaires
function lib(ref) { const [rep, b] = ref.split(':'); return rep + ' borne ' + b; }
function rep(ref) { return ref.split(':')[0]; }
// La logique des bornes que le jeu enseigne : le courant ENTRE par la borne impaire (1, 3, 5)
// et RESSORT par la borne paire (2, 4, 6), puis repart vers l'appareil suivant.
function sens(ref) {
  const b = ref.split(':')[1];
  if (/^\d+$/.test(b)) return parseInt(b, 10) % 2 ? 'entrée' : 'sortie';
  if (/^(L|N|PE|L[123])$/.test(b)) return 'arrivée';
  return '';
}
function libSens(ref) { const s = sens(ref); return lib(ref) + (s ? ' (' + s + ')' : ''); }
function cle(a, b) { return [a, b].sort().join('|'); }
function dire(texte, etat, detail) {
  const c = $('#consigne'); if (!c) return;
  c.className = 'consigne' + (etat ? ' ' + etat : '');
  $('#consigne-texte').innerHTML = '';
  $('#consigne-texte').append(texte);
  if (detail) { const s = document.createElement('small'); s.textContent = detail; $('#consigne-texte').append(s); }
  if (canal) canal.postMessage({ type: 'consigne', texte, etat, detail });
}

class UnionFind {
  constructor() { this.p = {}; }
  trouver(a) { if (!(a in this.p)) this.p[a] = a; while (this.p[a] !== a) { this.p[a] = this.p[this.p[a]]; a = this.p[a]; } return a; }
  unir(a, b) { const ra = this.trouver(a), rb = this.trouver(b); if (ra !== rb) this.p[rb] = ra; }
}
function partition() {
  const uf = new UnionFind();
  EX.appareils.forEach(a => a.liaisons_internes.forEach(g => g.slice(1).forEach(b => uf.unir(a.repere + ':' + g[0], a.repere + ':' + b))));
  fils.forEach(f => uf.unir(f.de, f.a));
  return uf;
}
function reseauDe(ref) { return EX.reseaux.find(r => r.bornes.includes(ref)); }
function nomsCouleurs(r) { return r ? r.couleurs.slice(0, 3).join(' ou ') : 'au choix'; }
function nomReseau(r) { return r.nom.includes(':') ? 'Le réseau de ' + lib(r.nom) : 'Le réseau ' + r.nom; }

// ------------------------------------------------------------ chargement
function charger(id, cb) {
  if (window.CABLAGE_EXERCICES && window.CABLAGE_EXERCICES[id]) return cb(window.CABLAGE_EXERCICES[id]);
  const s = document.createElement('script');
  s.src = 'exercices/' + encodeURIComponent(id) + '.js' + (window.CABLAGE_VERSION ? '?v=' + window.CABLAGE_VERSION : '');
  s.onload = () => cb((window.CABLAGE_EXERCICES || {})[id]);
  s.onerror = () => cb(null);
  document.head.appendChild(s);
}

// ------------------------------------------------------------ la carte
function construireCarte() {
  const doc = new DOMParser().parseFromString(EX.carte.svg, 'image/svg+xml');
  const svg = doc.documentElement;
  svg.removeAttribute('width'); svg.removeAttribute('height');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  const g = doc.createElementNS(NS, 'g'); g.id = 'carte-bornes';
  (EX.carte.appareils || []).forEach(a => {
    const t = doc.createElementNS(NS, 'text');
    t.setAttribute('x', a.x); t.setAttribute('y', a.y); t.setAttribute('class', 'cb-repere');
    t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '8'); t.setAttribute('font-weight', 'bold');
    t.setAttribute('font-family', 'Trebuchet MS, Calibri, Arial'); t.setAttribute('fill', '#1B3A63');
    t.textContent = a.repere; g.appendChild(t);
  });
  EX.carte.bornes.forEach(b => {
    const c = doc.createElementNS(NS, 'circle');
    c.setAttribute('cx', b.x); c.setAttribute('cy', b.y); c.setAttribute('r', 4.5); c.setAttribute('class', 'cb');
    c.dataset.ref = b.ref; g.appendChild(c);
    (cartesBornes[b.ref] = cartesBornes[b.ref] || []).push(c);
    const t = doc.createElementNS(NS, 'text');
    t.setAttribute('x', b.x + 5); t.setAttribute('y', b.y - 4); t.setAttribute('class', 'cb-nom');
    t.textContent = b.ref.split(':')[1]; g.appendChild(t);
  });
  svg.appendChild(g);
  $('#carte-corps').appendChild(document.adoptNode(svg));
  svg.addEventListener('pointerdown', e => {
    const c = e.target.closest && e.target.closest('.cb');
    if (!c) return;
    surbrillance([c.dataset.ref]);
    if (VUE !== 'carte') dire(lib(c.dataset.ref), null, 'Trouvez cette borne sur la platine.');
  });
}

// ------------------------------------------------------------ la platine
function construirePlatine() {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, html = '';
  EX.appareils.forEach(a => {
    const px = a.implantation.x, py = a.implantation.y, [bx0, by0, bx1, by1] = a.boite;
    x0 = Math.min(x0, px + bx0 * ECH - 40); y0 = Math.min(y0, py + by0 * ECH - 46);
    x1 = Math.max(x1, px + bx1 * ECH + 40); y1 = Math.max(y1, py + by1 * ECH + 36);
    html += '<g class="app" data-rep="' + a.repere + '"><g transform="translate(' + px + ',' + py + ') scale(' + ECH + ')">' + a.symbole + '</g>' +
      (a.rang === 0
        ? '<text class="repere haut" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by0 * ECH - 16) + '">' + a.repere + '</text>'
        : a.rang === 5
        ? '<text class="repere haut petit" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by1 * ECH + 34) + '">' + a.repere + '</text>'
        : '<text class="repere" x="' + (px + bx1 * ECH + 10) + '" y="' + (py + (by0 + by1) / 2 * ECH + 5) + '">' + a.repere + '</text>') + '</g>';
    a.bornes.forEach(b => {
      const bx = px + b.x * ECH, by = py + b.y * ECH;
      x0 = Math.min(x0, bx - 30); y0 = Math.min(y0, by - 30); x1 = Math.max(x1, bx + 30); y1 = Math.max(y1, by + 30);
      bornes[a.repere + ':' + b.id] = { ref: a.repere + ':' + b.id, rep: a.repere, id: b.id, x: bx, y: by, o: b.o };
    });
  });
  const vb = [x0, y0, x1 - x0, y1 - y0].map(v => v.toFixed(1)).join(' ');
  let bornesHtml = '';
  Object.values(bornes).forEach(b => {
    const d = DIR[b.o], lx = b.x + d[0] * 16 + (d[0] === 0 ? 0 : 0), ly = b.y + d[1] * 16 + (d[1] === 0 ? 4 : (d[1] < 0 ? 0 : 8));
    bornesHtml += '<circle class="borne" role="button" aria-label="' + lib(b.ref) + '" data-ref="' + b.ref + '" cx="' + b.x + '" cy="' + b.y + '" r="' + RAYON_BORNE + '"/>' +
      '<text class="nom-borne" x="' + lx + '" y="' + ly + '">' + b.id + '</text>';
  });
  $('#platine-corps').innerHTML = '<svg viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet">' +
    '<g id="symboles">' + html + '</g><g id="fils"></g><g id="manques"></g><g id="bornes">' + bornesHtml + '</g>' +
    '<path id="fil-temp" class="fil-temp" d=""/></svg>';
  svgPlatine = $('#platine-corps svg');
  gFils = svgPlatine.querySelector('#fils'); gManques = svgPlatine.querySelector('#manques'); filTemp = svgPlatine.querySelector('#fil-temp');
  svgPlatine.querySelectorAll('.borne').forEach(c => { bornes[c.dataset.ref].el = c; });

  svgPlatine.addEventListener('pointerdown', debutTrace);
  svgPlatine.addEventListener('pointermove', suiviTrace);
  svgPlatine.addEventListener('pointerup', finTrace);
  svgPlatine.addEventListener('pointercancel', () => { trace = null; filTemp.setAttribute('d', ''); });
}

function point(e) {
  const p = svgPlatine.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
  return p.matrixTransform(svgPlatine.getScreenCTM().inverse());
}
function borneProche(pt) {
  let meilleure = null, dmin = RAYON_PRISE;
  Object.values(bornes).forEach(b => { const d = Math.hypot(b.x - pt.x, b.y - pt.y); if (d < dmin) { dmin = d; meilleure = b; } });
  return meilleure;
}
function debutTrace(e) {
  if (controle) return;
  const filEl = e.target.closest && e.target.closest('.fil');
  if (filEl) { choisir(fils.find(f => f.el === filEl || f.contour === filEl)); return; }
  const pt = point(e), b = borneProche(pt);
  choisir(null);
  if (!b) { armer(null); return; }
  svgPlatine.setPointerCapture(e.pointerId);
  trace = { de: b, x: pt.x, y: pt.y, bouge: false };
  filTemp.setAttribute('stroke', COULEURS[couleur]);
}
function suiviTrace(e) {
  if (!trace) return;
  const pt = point(e);
  if (Math.hypot(pt.x - trace.x, pt.y - trace.y) > 8) trace.bouge = true;
  if (trace.bouge) filTemp.setAttribute('d', 'M' + trace.de.x + ' ' + trace.de.y + ' L' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1));
}
function finTrace(e) {
  if (!trace) return;
  const b = borneProche(point(e)), de = trace.de;
  filTemp.setAttribute('d', '');
  if (trace.bouge) {
    if (b && b.ref !== de.ref) creerFil(de.ref, b.ref);
    armer(null);
  } else if (armee && armee !== de.ref) {
    creerFil(armee, de.ref); armer(null);
  } else {
    armer(armee === de.ref ? null : de.ref);
    if (armee) dire(lib(armee) + ' : touchez maintenant l’autre borne.', null, 'Ou touchez-la de nouveau pour annuler.');
  }
  trace = null;
}
function armer(ref) {
  armee = ref;
  Object.values(bornes).forEach(b => b.el.classList.toggle('armee', b.ref === ref));
}

// ------------------------------------------------------------ les fils
function chemin(a, b, idx) {
  const A = [a.x + DIR[a.o][0] * SORTIE, a.y + DIR[a.o][1] * SORTIE];
  const B = [b.x + DIR[b.o][0] * SORTIE, b.y + DIR[b.o][1] * SORTIE];
  const dec = ((idx % 5) - 2) * 7;
  const pts = [[a.x, a.y], A];
  if (Math.abs(A[0] - B[0]) > 1 && Math.abs(A[1] - B[1]) > 1) {
    if (Math.abs(B[1] - A[1]) >= Math.abs(B[0] - A[0])) { const ym = (A[1] + B[1]) / 2 + dec; pts.push([A[0], ym], [B[0], ym]); }
    else { const xm = (A[0] + B[0]) / 2 + dec; pts.push([xm, A[1]], [xm, B[1]]); }
  }
  pts.push(B, [b.x, b.y]);
  return 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
}
function creerFil(de, a) {
  if (de === a) return;
  if (fils.some(f => cle(f.de, f.a) === cle(de, a))) { dire('Ces deux bornes sont déjà reliées.', 'ko'); return; }
  const r = reseauDe(de);
  if (MODE === 'guide') {
    const et = etapeCourante();
    if (!et) return;
    const bon = (de === et.de && a === et.a) || (de === et.a && a === et.de);
    if (!bon) { dire('Non : ce fil va de ' + lib(et.de) + ' à ' + lib(et.a) + '.', 'ko', 'Regardez les deux bornes qui clignotent.'); return; }
    if (!et.couleurs.includes(couleur)) { dire('Bonne liaison, mais la couleur doit être ' + et.couleurs.slice(0, 2).join(' ou ') + '.', 'ko'); return; }
  }
  const f = { de, a, couleur, idx: fils.length };
  fils.push(f);
  dessinerFil(f);
  rafraichir();
  if (MODE === 'guide') { etapeIdx++; prochaineEtape(); }
  else { niveauAide = 0; dire(libSens(de) + ' → ' + libSens(a) + ' en ' + couleur + '.', null, MODE === 'aide' ? 'Continuez, ou demandez de l’aide.' : 'Continuez, puis contrôlez.'); }
}
function dessinerFil(f) {
  const d = chemin(bornes[f.de], bornes[f.a], f.idx);
  const contour = document.createElementNS(NS, 'path'); contour.setAttribute('class', 'fil contour'); contour.setAttribute('d', d);
  const p = document.createElementNS(NS, 'path'); p.setAttribute('class', 'fil ' + f.couleur); p.setAttribute('d', d);
  p.setAttribute('stroke', COULEURS[f.couleur]);
  p.setAttribute('role', 'button'); p.setAttribute('aria-label', 'fil ' + lib(f.de) + ' vers ' + lib(f.a));
  gFils.appendChild(contour); gFils.appendChild(p);
  f.el = p; f.contour = contour;
}
function choisir(f) {
  choisi = f || null;
  fils.forEach(x => x.el.classList.toggle('choisi', x === choisi));
  $('#btn-supprimer').disabled = !choisi;
  if (choisi) dire('Fil ' + lib(choisi.de) + ' → ' + lib(choisi.a) + ' sélectionné.', null, 'Bouton « Supprimer le fil » pour l’enlever.');
}
function supprimer() {
  if (!choisi) return;
  choisi.el.remove(); choisi.contour.remove();
  fils = fils.filter(f => f !== choisi);
  choisir(null); rafraichir();
  if (MODE === 'guide') prochaineEtape();
}
function rafraichir() {
  const occupees = new Set(); fils.forEach(f => { occupees.add(f.de); occupees.add(f.a); });
  Object.values(bornes).forEach(b => b.el.classList.toggle('occupee', occupees.has(b.ref)));
  $('#compteur-fils').textContent = fils.length + (fils.length > 1 ? ' fils' : ' fil');
}
function recommencer() {
  fils.forEach(f => { f.el.remove(); f.contour.remove(); });
  fils = []; etapeIdx = 0; aides = 0; niveauAide = 0; controle = false; debut = Date.now();
  gManques.innerHTML = ''; choisir(null); armer(null); rafraichir(); $('#voile').classList.remove('ouvert');
  demarrerMode();
}

// ------------------------------------------------------------ surbrillance (platine + carte + autre écran)
function surbrillance(refs, reps) {
  Object.values(bornes).forEach(b => b.el && b.el.classList.toggle('sb', refs.includes(b.ref)));
  Object.keys(cartesBornes).forEach(k => cartesBornes[k].forEach(c => c.classList.toggle('sb', refs.includes(k))));
  document.querySelectorAll('#platine .app').forEach(g => g.classList.toggle('sb', !!reps && reps.includes(g.dataset.rep)));
  if (canal && VUE !== 'carte') canal.postMessage({ type: 'sb', refs, reps: reps || [] });
}

// ------------------------------------------------------------ les modes
function etapes() {
  return EX.etapes.map(e => ({ de: e.de, a: e.a, couleurs: (reseauDe(e.de) || { couleurs: [e.couleur] }).couleurs }));
}
function etapeCourante() {
  const uf = partition(), liste = etapes();
  while (etapeIdx < liste.length && uf.trouver(liste[etapeIdx].de) === uf.trouver(liste[etapeIdx].a)) etapeIdx++;
  return liste[etapeIdx] || null;
}
function prochaineEtapeNonFaite() {
  const uf = partition();
  return etapes().find(e => uf.trouver(e.de) !== uf.trouver(e.a)) || null;
}
function prochaineEtape() {
  const et = etapeCourante();
  if (!et) { surbrillance([]); dire('Tout est câblé. Contrôle en cours…', 'ok'); setTimeout(controler, 600); return; }
  choisirCouleur(et.couleurs[0]);
  surbrillance([et.de, et.a], [rep(et.de), rep(et.a)]);
  const n = etapeIdx + 1, total = EX.etapes.length;
  const pedago = (sens(et.de) === 'sortie' && sens(et.a) === 'entrée')
    ? 'Le courant ressort par la borne paire et entre dans l’appareil suivant par la borne impaire.'
    : 'Glissez le doigt d’une borne à l’autre, ou touchez l’une puis l’autre.';
  dire('Fil ' + n + '/' + total + ' : de ' + libSens(et.de) + ' à ' + libSens(et.a) + ', en ' + et.couleurs[0] + '.', null, pedago);
}
function aider() {
  const et = prochaineEtapeNonFaite();
  if (!et) { dire('Tout est relié : contrôlez.', 'ok'); return; }
  aides++;
  const k = cle(et.de, et.a);
  niveauAide = (cibleAide === k) ? Math.min(3, niveauAide + 1) : (MODE === 'guide' ? 2 : 1);
  cibleAide = k;
  if (niveauAide === 1) { surbrillance([], [rep(et.de), rep(et.a)]); dire('Aide 1 : regardez ' + rep(et.de) + ' et ' + rep(et.a) + ' sur la carte.', null, 'Quelles bornes le fil relie-t-il ? Appuyez encore pour plus d’aide.'); }
  else if (niveauAide === 2) { surbrillance([et.de, et.a], [rep(et.de), rep(et.a)]); dire('Aide 2 : un fil de ' + libSens(et.de) + ' à ' + libSens(et.a) + '.', null, 'Les deux bornes clignotent. Quelle couleur ?'); }
  else { choisirCouleur(et.couleurs[0]); surbrillance([et.de, et.a], [rep(et.de), rep(et.a)]); dire('Aide 3 : ' + lib(et.de) + ' → ' + lib(et.a) + ' en ' + et.couleurs[0] + '.', null, 'La couleur est choisie pour vous. Tirez le fil.'); }
}
function demarrerMode() {
  $('#btn-aide').style.display = MODE === 'reel' ? 'none' : '';
  if (MODE === 'guide') prochaineEtape();
  else if (MODE === 'aide') dire('Lisez la carte et posez les fils. Le bouton Aide vous guide si besoin.', null, 'Chaque aide compte dans le résultat.');
  else dire('Lisez la carte et câblez la platine. Contrôlez quand vous avez fini.', null, 'Comme à l’examen : pas d’aide.');
}

// ------------------------------------------------------------ le contrôle
function analyser() {
  const uf = partition(), attendu = EX.reseaux, reseauDeBorne = {};
  attendu.forEach((r, i) => r.bornes.forEach(b => { reseauDeBorne[b] = i; }));
  const erreurs = [], manques = [];
  let justes = 0;
  attendu.forEach((r, i) => {
    const groupes = {};
    r.bornes.forEach(b => { const k = uf.trouver(b); (groupes[k] = groupes[k] || []).push(b); });
    const principal = Object.values(groupes).sort((a, b) => b.length - a.length)[0];
    let ok = Object.keys(groupes).length === 1;
    if (!ok) {
      const restantes = r.bornes.filter(b => !principal.includes(b));
      restantes.forEach(b => manques.push([principal[0], b]));
      erreurs.push(nomReseau(r) + ' est incomplet : ' + restantes.slice(0, 3).map(lib).join(', ') + (restantes.length > 3 ? '…' : '') + ' non relié' + (restantes.length > 1 ? 'es' : '') + '.');
    }
    const racines = new Set(Object.keys(groupes));
    const intrus = Object.keys(reseauDeBorne).find(b => reseauDeBorne[b] !== i && racines.has(uf.trouver(b)));
    if (intrus) { erreurs.push(nomReseau(r) + ' est relié à ' + lib(intrus) + ' : ce n’est pas le même réseau.'); ok = false; }
    if (ok) justes++;
  });
  let enTrop = 0, couleursFausses = 0;
  fils.forEach(f => {
    const i = reseauDeBorne[f.de], j = reseauDeBorne[f.a];
    f.faux = (i === undefined || j === undefined || i !== j);
    f.mauvaiseCouleur = !f.faux && !attendu[i].couleurs.includes(f.couleur);
    if (f.faux) enTrop++;
    if (f.mauvaiseCouleur) couleursFausses++;
    f.el.classList.toggle('faux', f.faux);
  });
  const total = attendu.length;
  let niveau = 0;
  if (justes === total && enTrop === 0) niveau = couleursFausses ? 3 : 4;
  else if (justes >= total / 2) niveau = 2;
  else if (justes > 0) niveau = 1;
  return { justes, total, enTrop, couleursFausses, erreurs, manques, niveau };
}
function controler() {
  const r = analyser();
  controle = true; armer(null); choisir(null); surbrillance([]);
  const secondes = Math.round((Date.now() - debut) / 1000);
  const libNiveau = ['Rien n’est câblé', 'Début de câblage', 'Câblage à moitié', 'Câblage juste, couleurs à revoir', 'Câblage juste'][r.niveau];
  const filsMauvaiseCouleur = fils.filter(f => f.mauvaiseCouleur).slice(0, 3).map(f => lib(f.de) + ' → ' + lib(f.a) + ' (' + f.couleur + ', attendu ' + nomsCouleurs(reseauDe(f.de)) + ')');
  let html = '<h2><span class="niveau n' + r.niveau + '">' + r.niveau + '</span>' + libNiveau + '</h2>' +
    '<table><tr><td>Réseaux justes</td><td>' + r.justes + ' / ' + r.total + '</td></tr>' +
    '<tr><td>Fils posés</td><td>' + fils.length + '</td></tr>' +
    '<tr><td>Fils sur une mauvaise borne</td><td>' + r.enTrop + '</td></tr>' +
    '<tr><td>Couleurs à revoir</td><td>' + r.couleursFausses + '</td></tr>' +
    (MODE !== 'reel' ? '<tr><td>Aides demandées</td><td>' + aides + '</td></tr>' : '') +
    '<tr><td>Temps</td><td>' + Math.floor(secondes / 60) + ' min ' + (secondes % 60) + ' s</td></tr></table>';
  const lignes = r.erreurs.slice(0, 6).concat(filsMauvaiseCouleur.map(t => 'Couleur : ' + t));
  if (lignes.length) html += '<ul>' + lignes.map(t => '<li></li>').join('') + '</ul>';
  html += '<div class="boutons">' +
    (r.manques.length ? '<button id="btn-manques">Montrer ce qui manque</button>' : '') +
    '<button id="btn-continuer">' + (r.niveau === 4 ? 'Revoir la platine' : 'Corriger') + '</button>' +
    '<button class="principal" id="btn-refaire">Recommencer</button></div>';
  const boite = $('#resultat'); boite.innerHTML = html;
  boite.querySelectorAll('li').forEach((li, i) => { li.textContent = lignes[i]; });
  $('#voile').classList.add('ouvert');
  dire(libNiveau + ' : ' + r.justes + ' réseau' + (r.justes > 1 ? 'x' : '') + ' juste' + (r.justes > 1 ? 's' : '') + ' sur ' + r.total + '.', r.niveau >= 3 ? 'ok' : 'ko');
  const fermer = () => { $('#voile').classList.remove('ouvert'); controle = false; };
  $('#btn-continuer').onclick = fermer;
  $('#btn-refaire').onclick = recommencer;
  const bm = $('#btn-manques');
  if (bm) bm.onclick = () => { montrerManques(r.manques); fermer(); };
  if (MODE !== 'reel' && r.manques.length) montrerManques(r.manques);
  tracer(r, secondes);
}
function montrerManques(manques) {
  gManques.innerHTML = '';
  manques.forEach(([a, b]) => {
    const A = bornes[a], B = bornes[b]; if (!A || !B) return;
    const p = document.createElementNS(NS, 'path'); p.setAttribute('class', 'manque');
    p.setAttribute('d', 'M' + A.x + ' ' + A.y + ' L' + B.x + ' ' + B.y); gManques.appendChild(p);
  });
  if (manques.length) dire('En pointillés rouges : les liaisons qui manquent.', 'ko', 'Posez-les, puis contrôlez de nouveau.');
}
function tracer(r, secondes) {
  try {
    const cle = 'cablage-virtuel:resultats', liste = JSON.parse(localStorage.getItem(cle) || '[]');
    liste.push({ date: new Date().toISOString(), exercice: ID, mode: MODE, niveau: r.niveau, justes: r.justes, total: r.total,
                 enTrop: r.enTrop, couleursFausses: r.couleursFausses, aides, fils: fils.length, secondes });
    localStorage.setItem(cle, JSON.stringify(liste.slice(-200)));
  } catch (e) { /* stockage indisponible : le jeu continue */ }
}

// ------------------------------------------------------------ la barre d'outils
function choisirCouleur(c) {
  couleur = c;
  document.querySelectorAll('#couleurs .couleur').forEach(b => b.classList.toggle('actif', b.dataset.couleur === c));
  const n = $('#couleur-nom'); if (n) n.textContent = 'Fil : ' + c;
}
function construireOutils() {
  const zone = $('#couleurs');
  const utiles = new Set(); EX.reseaux.forEach(r => r.couleurs.forEach(c => utiles.add(c)));
  ['marron', 'noir', 'gris', 'rouge', 'bleu', 'vert-jaune', 'orange', 'blanc'].filter(c => utiles.has(c) || ['bleu', 'vert-jaune'].includes(c)).forEach(c => {
    const b = document.createElement('button');
    b.className = 'couleur ' + c; b.dataset.couleur = c; b.title = c; b.setAttribute('aria-label', 'fil ' + c);
    if (c !== 'vert-jaune') b.style.background = COULEURS[c];
    const s = document.createElement('span'); s.textContent = c; b.appendChild(s);
    b.onclick = () => { choisirCouleur(c); if (choisi) { choisi.couleur = c; choisi.el.setAttribute('stroke', COULEURS[c]); choisi.el.setAttribute('class', 'fil ' + c + ' choisi'); } };
    zone.appendChild(b);
  });
  choisirCouleur(couleur);
  $('#btn-aide').onclick = aider;
  $('#btn-supprimer').onclick = supprimer;
  $('#btn-recommencer').onclick = recommencer;
  $('#btn-controler').onclick = controler;
  $('#btn-numeros').onclick = () => $('#carte').classList.toggle('numeros');
  $('#btn-detacher').onclick = () => window.open('jouer.html?ex=' + encodeURIComponent(ID) + '&vue=carte', 'carte-' + ID);
  document.querySelectorAll('#modes button').forEach(b => {
    b.classList.toggle('actif', b.dataset.mode === MODE);
    b.onclick = () => { location.search = '?ex=' + encodeURIComponent(ID) + '&mode=' + b.dataset.mode; };
  });
}

// ------------------------------------------------------------ vue carte seule (deuxième écran)
function vueCarte() {
  document.body.classList.add('vue-carte');
  ['#platine', '.consigne', '.outils', '#modes'].forEach(s => { const e = $(s); if (e) e.remove(); });
  $('#carte .entete b').textContent = 'La carte — deuxième écran';
  $('#btn-detacher').remove();
  $('#btn-numeros').onclick = () => $('#carte').classList.toggle('numeros');
  if (canal) canal.onmessage = (m) => { if (m.data.type === 'sb') surbrillance(m.data.refs, m.data.reps); };
}

// ------------------------------------------------------------ état lisible de l'extérieur (tests automatiques, HAL plus tard)
window.CABLAGE_ETAT = () => ({ exercice: ID, mode: MODE, fils: fils.map(f => ({ de: f.de, a: f.a, couleur: f.couleur })),
                               aides, controle, analyse: EX ? analyser() : null });

// ------------------------------------------------------------ départ
if (!ID) { dire('Aucun exercice demandé.', 'ko', 'Revenez à la liste.'); return; }
charger(ID, (ex) => {
  if (!ex) { dire('Exercice « ' + ID + ' » introuvable.', 'ko', 'Lancez outils/qet-vers-exercice.py.'); return; }
  EX = ex;
  document.title = 'Câblage virtuel — ' + EX.titre;
  $('#titre').textContent = EX.titre;
  construireCarte();
  if (VUE === 'carte') { vueCarte(); return; }
  construirePlatine();
  construireOutils();
  rafraichir();
  demarrerMode();
});
})();

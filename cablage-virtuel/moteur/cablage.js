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
  const PL = EX.platine || null;   // rails et goulottes, posés par le convertisseur (absent : ancien tracé libre)
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, html = '';
  EX.appareils.forEach(a => {
    const px = a.implantation.x, py = a.implantation.y, [bx0, by0, bx1, by1] = a.boite;
    x0 = Math.min(x0, px + bx0 * ECH - 40); y0 = Math.min(y0, py + by0 * ECH - 46);
    x1 = Math.max(x1, px + bx1 * ECH + 40); y1 = Math.max(y1, py + by1 * ECH + 36);
    html += '<g class="app" data-rep="' + a.repere + '"><g transform="translate(' + px + ',' + py + ') scale(' + ECH + ')">' + a.symbole + '</g>' +
      (a.rang === 0
        ? '<text class="repere haut" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by0 * ECH - 14) + '">' + a.repere + '</text>'
        : a.rang === 5
        ? '<text class="repere petit" style="text-anchor:end" x="' + (px + (bx0 + bx1) / 2 * ECH - 9) + '" y="' + (py + by1 * ECH + 17) + '">' + a.repere + '</text>'
        : '<text class="repere" x="' + (px + bx1 * ECH + 10) + '" y="' + (py + (by0 + by1) / 2 * ECH + 5) + '">' + a.repere + '</text>') + '</g>';
    a.bornes.forEach(b => {
      const bx = px + b.x * ECH, by = py + b.y * ECH;
      x0 = Math.min(x0, bx - 30); y0 = Math.min(y0, by - 30); x1 = Math.max(x1, bx + 30); y1 = Math.max(y1, by + 30);
      bornes[a.repere + ':' + b.id] = { ref: a.repere + ':' + b.id, rep: a.repere, id: b.id, x: bx, y: by, o: b.o, ligne: a.ligne || 0 };
    });
  });
  // le décor d'une vraie platine : fond, rails DIN sous chaque rangée, goulottes entre les rangées et sur les côtés
  let decor = '';
  if (PL) {
    const gauche = PL.goulottes_v[0], droite = PL.goulottes_v[1];
    const haut = PL.goulottes_h[0].y0, bas = PL.goulottes_h[PL.goulottes_h.length - 1].y1;
    decor += '<defs><pattern id="fentes" width="12" height="12" patternUnits="userSpaceOnUse"><rect x="4" y="0" width="4" height="12" fill="#f3f6f9"/></pattern></defs>';
    decor += '<rect class="fond-platine" x="0" y="0" width="' + PL.largeur + '" height="' + PL.hauteur + '"/>';
    PL.rangees.forEach(r => {
      const yc = (r.y0 + r.y1) / 2;
      decor += '<rect class="rail" x="' + (gauche.x1 + 6) + '" y="' + (yc - 5).toFixed(1) + '" width="' + (droite.x0 - gauche.x1 - 12) + '" height="10" rx="2"/>';
    });
    PL.goulottes_h.forEach(g => {
      decor += '<rect class="goulotte" x="' + gauche.x0 + '" y="' + g.y0 + '" width="' + (droite.x1 - gauche.x0) + '" height="' + (g.y1 - g.y0) + '" rx="3"/>' +
               '<rect class="goulotte-fentes" x="' + gauche.x1 + '" y="' + (g.y0 + 3) + '" width="' + (droite.x0 - gauche.x1) + '" height="' + (g.y1 - g.y0 - 6) + '"/>';
    });
    PL.goulottes_v.forEach(g => {
      decor += '<rect class="goulotte" x="' + g.x0 + '" y="' + haut + '" width="' + (g.x1 - g.x0) + '" height="' + (bas - haut) + '" rx="3"/>';
    });
  }
  const vb = PL ? [0, 0, PL.largeur, PL.hauteur].join(' ') : [x0, y0, x1 - x0, y1 - y0].map(v => v.toFixed(1)).join(' ');
  // l'étiquette d'une borne se met À CÔTÉ de la sortie du fil, jamais dessus
  let bornesHtml = '';
  Object.values(bornes).forEach(b => {
    const d = DIR[b.o];
    let lx, ly, ancre = 'start';
    if (d[1] !== 0) { lx = b.x + 10; ly = b.y + d[1] * 13 + 4; }
    else { lx = b.x + d[0] * 14; ly = b.y - 10; ancre = d[0] > 0 ? 'start' : 'end'; }
    bornesHtml += '<circle class="borne" role="button" aria-label="' + lib(b.ref) + '" data-ref="' + b.ref + '" cx="' + b.x + '" cy="' + b.y + '" r="' + RAYON_BORNE + '"/>' +
      '<text class="nom-borne" style="text-anchor:' + ancre + '" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '">' + b.id + '</text>';
  });
  $('#platine-corps').innerHTML = '<svg viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet">' +
    '<g id="decor">' + decor + '</g><g id="symboles">' + html + '</g><g id="fils"></g><g id="manques"></g><g id="bornes">' + bornesHtml + '</g>' +
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

// ------------------------------------------------------------ les fils : le cheminement d'une armoire propre
/* Règle (F. Henninot, 24/09/2026) : « on clique l'entrée, on clique la sortie, et le cheminement se
   crée sur un chemin logique, propre et net ». Comme dans une armoire : le fil sort de sa borne
   TOUT DROIT vers la goulotte la plus proche (celle du dessus pour une borne du haut, celle du
   dessous pour une borne du bas), y court dans un couloir parallèle aux autres fils, et redescend
   tout droit sur la borne d'arrivée. Deux rangées différentes : il passe par la goulotte latérale la
   plus proche. Un fil ne traverse donc jamais un appareil, et deux fils ne se superposent que
   quand la goulotte est pleine. */
const COULOIR = 7, MARGE_GOULOTTE = 6, RAYON_COUDE = 6;

function cheminSimple(a, b, idx) {   // sans géométrie de platine (exercices « --platine schema »)
  const A = [a.x + DIR[a.o][0] * SORTIE, a.y + DIR[a.o][1] * SORTIE];
  const B = [b.x + DIR[b.o][0] * SORTIE, b.y + DIR[b.o][1] * SORTIE];
  const dec = ((idx % 5) - 2) * 7;
  const pts = [[a.x, a.y], A];
  if (Math.abs(A[0] - B[0]) > 1 && Math.abs(A[1] - B[1]) > 1) {
    if (Math.abs(B[1] - A[1]) >= Math.abs(B[0] - A[0])) { const ym = (A[1] + B[1]) / 2 + dec; pts.push([A[0], ym], [B[0], ym]); }
    else { const xm = (A[0] + B[0]) / 2 + dec; pts.push([xm, A[1]], [xm, B[1]]); }
  }
  pts.push(B, [b.x, b.y]);
  return pts;
}
function goulotteDe(b) {             // la goulotte horizontale que rejoint une borne
  const gh = EX.platine.goulottes_h, k = b.ligne;
  if (b.o === 0) return k;
  if (b.o === 2) return k + 1;
  return (b.y - gh[k].y1) <= (gh[k + 1].y0 - b.y) ? k : k + 1;   // borne latérale : la plus proche
}
function sortieDe(b) { return b.o === 1 ? [b.x + SORTIE, b.y] : b.o === 3 ? [b.x - SORTIE, b.y] : [b.x, b.y]; }
function couloirs(g) { const l = (g.y1 !== undefined ? g.y1 - g.y0 : g.x1 - g.x0) - 2 * MARGE_GOULOTTE; return Math.max(1, Math.floor(l / COULOIR) + 1); }
function couloirY(k, i) { const g = EX.platine.goulottes_h[k]; return g.y0 + MARGE_GOULOTTE + (i % couloirs(g)) * COULOIR; }
function couloirX(v, i) { const g = EX.platine.goulottes_v[v]; return g.x0 + MARGE_GOULOTTE + (i % couloirs(g)) * COULOIR; }

/* Attribue à chaque fil ses couloirs : premier couloir libre sur l'intervalle parcouru — deux fils
   partagent un couloir s'ils ne s'y recouvrent pas. Recalculé à chaque changement, dans l'ordre de
   pose, pour que la platine reste rangée. */
function attribuerCouloirs() {
  const PL = EX.platine; if (!PL) return;
  const occH = PL.goulottes_h.map(() => []), occV = PL.goulottes_v.map(() => []);
  const libre = (goulotte, a, b) => {
    for (let i = 0; ; i++) {
      const c = goulotte[i] || (goulotte[i] = []);
      if (c.every(([u, v]) => b < u - 4 || a > v + 4)) { c.push([a, b]); return i; }
    }
  };
  fils.forEach(f => {
    const A = bornes[f.de], B = bornes[f.a];
    const r = { gA: goulotteDe(A), gB: goulotteDe(B), pA: sortieDe(A), pB: sortieDe(B), cote: -1 };
    if (r.gA === r.gB) {
      r.cA = r.cB = libre(occH[r.gA], Math.min(r.pA[0], r.pB[0]), Math.max(r.pA[0], r.pB[0]));
    } else {
      const xg = PL.goulottes_v[0].x1, xd = PL.goulottes_v[1].x0;
      r.cote = (Math.abs(r.pA[0] - xg) + Math.abs(r.pB[0] - xg)) <= (Math.abs(r.pA[0] - xd) + Math.abs(r.pB[0] - xd)) ? 0 : 1;
      const xv = r.cote === 0 ? xg : xd;
      r.cA = libre(occH[r.gA], Math.min(r.pA[0], xv), Math.max(r.pA[0], xv));
      r.cB = libre(occH[r.gB], Math.min(r.pB[0], xv), Math.max(r.pB[0], xv));
      const yA = couloirY(r.gA, r.cA), yB = couloirY(r.gB, r.cB);
      r.cV = libre(occV[r.cote], Math.min(yA, yB), Math.max(yA, yB));
    }
    f.route = r;
  });
}
function pointsFil(f) {
  const A = bornes[f.de], B = bornes[f.a];
  if (!EX.platine) return cheminSimple(A, B, f.idx);
  const r = f.route, pts = [[A.x, A.y]];
  if (r.pA[0] !== A.x) pts.push(r.pA);
  const yA = couloirY(r.gA, r.cA);
  if (r.cote < 0) pts.push([r.pA[0], yA], [r.pB[0], yA]);
  else { const xv = couloirX(r.cote, r.cV), yB = couloirY(r.gB, r.cB); pts.push([r.pA[0], yA], [xv, yA], [xv, yB], [r.pB[0], yB]); }
  if (r.pB[0] !== B.x) pts.push(r.pB);
  pts.push([B.x, B.y]);
  return pts.filter((p, i) => i === 0 || Math.abs(p[0] - pts[i - 1][0]) > 0.01 || Math.abs(p[1] - pts[i - 1][1]) > 0.01);
}
/* Un vrai fil ne fait pas d'angle vif : chaque coude est arrondi. */
function traceArrondi(pts) {
  if (pts.length < 3) return 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
  let d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
    const l1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), l2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const r = Math.min(RAYON_COUDE, l1 / 2, l2 / 2);
    const a = [p1[0] - (p1[0] - p0[0]) / l1 * r, p1[1] - (p1[1] - p0[1]) / l1 * r];
    const b = [p1[0] + (p2[0] - p1[0]) / l2 * r, p1[1] + (p2[1] - p1[1]) / l2 * r];
    d += ' L' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' Q' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1);
  }
  const fin = pts[pts.length - 1];
  return d + ' L' + fin[0].toFixed(1) + ' ' + fin[1].toFixed(1);
}
function redessinerFils() {
  attribuerCouloirs();
  gFils.innerHTML = '';
  fils.forEach((f, i) => { f.idx = i; dessinerFil(f); });
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
  redessinerFils();
  rafraichir();
  if (MODE === 'guide') { etapeIdx++; prochaineEtape(); }
  else { niveauAide = 0; dire(libSens(de) + ' → ' + libSens(a) + ' en ' + couleur + '.', null, MODE === 'aide' ? 'Continuez, ou demandez de l’aide.' : 'Continuez, puis contrôlez.'); }
}
function dessinerFil(f) {
  const d = traceArrondi(pointsFil(f));
  const contour = document.createElementNS(NS, 'path'); contour.setAttribute('class', 'fil contour'); contour.setAttribute('d', d);
  const p = document.createElementNS(NS, 'path'); p.setAttribute('class', 'fil ' + f.couleur + (f === choisi ? ' choisi' : '') + (f.faux ? ' faux' : '')); p.setAttribute('d', d);
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
  fils = fils.filter(f => f !== choisi);
  choisi = null;
  redessinerFils();
  choisir(null); rafraichir();
  if (MODE === 'guide') prochaineEtape();
}
function rafraichir() {
  const occupees = new Set(); fils.forEach(f => { occupees.add(f.de); occupees.add(f.a); });
  Object.values(bornes).forEach(b => b.el.classList.toggle('occupee', occupees.has(b.ref)));
  $('#compteur-fils').textContent = fils.length + (fils.length > 1 ? ' fils' : ' fil');
}
function recommencer() {
  fils = []; gFils.innerHTML = ''; etapeIdx = 0; aides = 0; niveauAide = 0; controle = false; debut = Date.now();
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

// ------------------------------------------------------------ zoom et déplacement (carte et platine)
/* Dès le niveau 2, carte et platine sont trop petites pour un écran de tablette. Molette ou
   pincement pour zoomer, glisser sur le VIDE pour déplacer (sur la platine, glisser depuis une
   borne reste le geste du fil), boutons − + ⤢ dans l'entête. Le zoom joue sur le viewBox :
   les coordonnées des bornes ne changent pas. */
function installerZoom(svg, options) {
  const base = (svg.getAttribute('viewBox') || '0 0 100 100').split(/[\s,]+/).map(Number);
  const etat = { x: base[0], y: base[1], w: base[2], h: base[3] };
  const appliquer = () => svg.setAttribute('viewBox', [etat.x, etat.y, etat.w, etat.h].map(v => v.toFixed(1)).join(' '));
  const pt = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
  const borner = (w) => Math.min(base[2] * 4, Math.max(base[2] / 8, w));
  const zoomer = (facteur, centre) => {
    const c = centre || { x: etat.x + etat.w / 2, y: etat.y + etat.h / 2 };
    const w = borner(etat.w / facteur), h = w * base[3] / base[2];
    etat.x = c.x - (c.x - etat.x) * (w / etat.w); etat.y = c.y - (c.y - etat.y) * (h / etat.h); etat.w = w; etat.h = h; appliquer();
  };
  const ajuster = () => { etat.x = base[0]; etat.y = base[1]; etat.w = base[2]; etat.h = base[3]; appliquer(); };
  svg.addEventListener('wheel', (e) => { e.preventDefault(); zoomer(e.deltaY < 0 ? 1.2 : 1 / 1.2, pt(e)); }, { passive: false });
  const doigts = new Map(); let pan = null, pince = null;
  svg.addEventListener('pointerdown', (e) => {
    doigts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (doigts.size === 2) {
      const [a, b] = [...doigts.values()];
      pince = { d: Math.hypot(a.x - b.x, a.y - b.y), w: etat.w }; pan = null;
      if (options.annuler) options.annuler();
      return;
    }
    if (options.peutDeplacer && !options.peutDeplacer(e)) return;
    pan = { x: e.clientX, y: e.clientY, vx: etat.x, vy: etat.y };
    try { svg.setPointerCapture(e.pointerId); } catch (err) { /* déjà capturé */ }
  });
  svg.addEventListener('pointermove', (e) => {
    if (doigts.has(e.pointerId)) doigts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pince && doigts.size === 2) {
      const [a, b] = [...doigts.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > 0) {
        const w = borner(pince.w * pince.d / d), cx = etat.x + etat.w / 2, cy = etat.y + etat.h / 2;
        etat.w = w; etat.h = w * base[3] / base[2]; etat.x = cx - w / 2; etat.y = cy - etat.h / 2; appliquer();
      }
      return;
    }
    if (pan) { const k = etat.w / svg.getBoundingClientRect().width; etat.x = pan.vx - (e.clientX - pan.x) * k; etat.y = pan.vy - (e.clientY - pan.y) * k; appliquer(); }
  });
  const fin = (e) => { doigts.delete(e.pointerId); if (doigts.size < 2) pince = null; pan = null; };
  svg.addEventListener('pointerup', fin); svg.addEventListener('pointercancel', fin);
  return { zoomer, ajuster };
}
function brancherZoom(panneau, z) {
  panneau.querySelectorAll('button.zoom').forEach(b => {
    b.onclick = () => (b.dataset.zoom === 'plus' ? z.zoomer(1.4) : b.dataset.zoom === 'moins' ? z.zoomer(1 / 1.4) : z.ajuster());
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
  $('#carte').classList.add('numeros');   // les numeros de bornes sont le sujet : visibles d'emblee
  brancherZoom($('#carte'), installerZoom($('#carte-corps svg'), {}));
  if (VUE === 'carte') { vueCarte(); return; }
  construirePlatine();
  brancherZoom($('#platine'), installerZoom(svgPlatine, {
    peutDeplacer: (e) => !trace && !(e.target.closest && e.target.closest('.fil')),
    annuler: () => { trace = null; filTemp.setAttribute('d', ''); }
  }));
  construireOutils();
  rafraichir();
  demarrerMode();
});
})();

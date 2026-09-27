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
const RAYON_BORNE = 9, RAYON_PRISE = 30;   // prise large : la borne la plus proche est aimantée (Franck, 26/09 : « trop petit à cliquer »)
const DIR = [[0, -1], [1, 0], [0, 1], [-1, 0]];   // orientation QElectroTech : 0 nord 1 est 2 sud 3 ouest
const NS = 'http://www.w3.org/2000/svg';

const P = new URLSearchParams(location.search);
const ID = P.get('ex');
const VUE = P.get('vue');
const MODE = ['guide', 'aide', 'reel'].includes(P.get('mode')) ? P.get('mode') : 'guide';
const ACTIVITE = ['colorier', 'reperer', 'cabler'].includes(P.get('activite')) ? P.get('activite') : 'cabler';
const REELLE = P.get('platine') === 'reelle';   // la platine en vue réelle (§ 5 B) : les vrais appareils, la carte reste en symboles
const $ = (s) => document.querySelector(s);

let EX, fils = [], couleur = 'marron', armee = null, choisi = null, trace = null;
let aides = 0, niveauAide = 0, cibleAide = null, etapeIdx = 0, debut = Date.now(), controle = false, refus = 0;
const bornes = {};            // 'Q1:2' -> {ref, rep, id, x, y, o, el}
const cartesBornes = {};      // 'Q1:2' -> [cercles sur la carte]
let svgPlatine, gFils, gManques, filTemp;
let canal = null;
try { canal = ID && 'BroadcastChannel' in window ? new BroadcastChannel('cablage-virtuel-' + ID) : null; } catch (e) { canal = null; }

// ------------------------------------------------------------ utilitaires
// Le nom de l'appareil accompagne son repère (Franck, 26/09 : « il manquait le nom des appareils ») ;
// l'arrivée et les bornes du bornier se lisent sans.
function nomApp(r) { const a = EX && EX.appareils.find(x => x.repere === r); return a && a.rang > 0 && a.rang < 5 ? a.nom.toLowerCase() : ''; }
function lib(ref) {
  const [r, b] = ref.split(':'), a = EX && EX.appareils.find(x => x.repere === r);
  if (a && a.rang === 5) { const c = coteBornier(ref); return 'borne ' + r + (c ? ' côté ' + c : ' (' + b + ')'); }
  const n = nomApp(r); return r + (n ? ' (' + n + ')' : '') + ' borne ' + b;
}
/* Le côté d'une borne de bornier, tel qu'on le voit sur la platine : haut (armoire) ou bas (câbles). */
function coteBornier(ref) {
  const B = bornes[ref]; if (!B) return '';
  const autre = Object.values(bornes).find(x => x.rep === B.rep && x.ref !== ref);
  return autre ? (B.y < autre.y ? 'haut' : 'bas') : '';
}
// Les numéros que le symbole QElectroTech imprime lui-même (« 1 L1 », « U1 »…) : repérés pour ne jamais
// doubler nos étiquettes. Un texte est un numéro imprimé si son premier mot est une borne de l'appareil.
function marquerNumerosImprimes(g, a) {
  const ids = a.bornes.map(b => b.id);
  g.querySelectorAll('text').forEach(t => { if (ids.includes(t.textContent.trim().split(/\s+/)[0])) t.classList.add('imprime'); });
}
function rep(ref) { return ref.split(':')[0]; }
/* La vue réelle (Franck, 26/09 : « la version avec les éléments de la vraie vie, en parallèle du symbole ») :
   un appareil qui a sa vignette y prend son dessin, ses bornes et sa place ; mêmes repères, mêmes numéros,
   donc même contrôle. Un appareil embroché (le relais thermique sous son contacteur) : liaisons fixes. */
function vueReelle() { return REELLE && !!(EX && EX.reel); }
function vue(a) { return (vueReelle() && EX.reel.appareils[a.repere]) || a; }
function liaisonsFixes() { return vueReelle() ? EX.reel.liaisons_fixes : []; }
// La logique des bornes que le jeu enseigne : le courant ENTRE par la borne impaire (1, 3, 5)
// et RESSORT par la borne paire (2, 4, 6), puis repart vers l'appareil suivant.
function sens(ref) {
  const b = ref.split(':')[1], a = EX && EX.appareils.find(x => x.repere === rep(ref));
  if (a && (a.rang === 5 || /^masse/i.test(a.nom))) return '';   // ni une borne de bornier ni la masse d'un appareil n'ont d'entrée
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
  liaisonsFixes().forEach(([a, b]) => uf.unir(a, b));
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
  // chaque symbole de la carte retrouve son appareil par sa position (borne de l'exercice = origine + borne du symbole)
  const pos = {}; EX.carte.bornes.forEach(b => { pos[b.ref] = b; });
  const symboles = [...svg.querySelectorAll('.symbole')].map(s => {
    const m = /translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec(s.getAttribute('transform') || '');
    return m && { g: s, x: +m[1], y: +m[2] };
  }).filter(Boolean);
  EX.appareils.filter(a => a.rang > 0 && a.rang < 5).forEach(a => {   // chaque symbole de l'appareil (pôles, bobine, contacts)
    const vus = new Set();
    a.bornes.forEach(b => {
      const q = pos[a.repere + ':' + b.id]; if (!q) return;
      const c = b.c || [b.x, b.y], ox = q.x - c[0], oy = q.y - c[1];
      const s = symboles.find(s => Math.abs(s.x - ox) < 1 && Math.abs(s.y - oy) < 1);
      if (s && !vus.has(s)) { vus.add(s); marquerNumerosImprimes(s.g, a); }
    });
  });
  $('#carte-corps').appendChild(document.adoptNode(svg));
  svg.addEventListener('pointerdown', e => {
    const c = e.target.closest && e.target.closest('.cb');
    if (!c || ACTIVITE !== 'cabler') return;   // en repérage, nommer la borne donnerait la réponse
    surbrillance([c.dataset.ref]);
    if (VUE !== 'carte') dire(lib(c.dataset.ref), null, 'Trouvez cette borne sur la platine.');
  });
}

// ------------------------------------------------------------ la platine
function construirePlatine() {
  const PL = EX.platine || null;   // rails et goulottes, posés par le convertisseur (absent : ancien tracé libre)
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, html = '', dessus = '';
  const quinconce = {};   // borne de bornier serrée contre sa voisine -> sa ligne d'étiquette (0 ou 1), en alternance
  EX.appareils.filter(a => a.rang === 5).map(a => ({ r: a.repere, x: a.implantation.x, y: a.implantation.y }))
    .sort((p, q) => p.y - q.y || p.x - q.x)
    .forEach((b, i, t) => {
      const v = t[i - 1];
      if (v && Math.abs(v.y - b.y) < 20 && b.x - v.x < 36) { quinconce[v.r] = quinconce[v.r] || 0; quinconce[b.r] = 1 - quinconce[v.r]; }
    });
  const serre = (r) => r in quinconce;
  EX.appareils.forEach(a => {
    const v = vue(a), px = v.implantation.x, py = v.implantation.y, [bx0, by0, bx1, by1] = v.boite;
    x0 = Math.min(x0, px + bx0 * ECH - 40); y0 = Math.min(y0, py + by0 * ECH - 46);
    x1 = Math.max(x1, px + bx1 * ECH + 40); y1 = Math.max(y1, py + by1 * ECH + 36);
    const hors = PL && PL.cadre && a.ligne >= PL.goulottes_h.length;   // sous la vraie platine : ses fils arrivent par le haut et de côté
    html += '<g class="app' + (v !== a ? ' vignette' : '') + '" data-rep="' + a.repere + '"><g transform="translate(' + px + ',' + py + ') scale(' + ECH + ')">' + v.symbole + '</g>' +
      // les autres symboles du même appareil (bobine, contacts), chacun à sa place, avec le repère de l'appareil
      (v.parties || []).map(p => '<g transform="translate(' + p.implantation.x + ',' + p.implantation.y + ') scale(' + ECH + ')">' + p.symbole + '</g>' +
        (p.implantation.x < px   // une partie à gauche de l'appareil (la bobine) : son repère à gauche, pas sur les pôles
          ? '<text class="repere petit" style="text-anchor:end" x="' + (p.implantation.x + p.boite[0] * ECH - 6) + '"'
          : '<text class="repere petit" x="' + (p.implantation.x + p.boite[2] * ECH + 6) + '"') +
        ' y="' + (p.implantation.y + (p.boite[1] + p.boite[3]) / 2 * ECH + 5) + '">' + a.repere + '</text>').join('') +
      (a.rang === 0 && /^masse/i.test(a.nom) ? ''   // la masse d'un appareil : le symbole de terre et sa pastille PE suffisent
        : a.rang === 0
        ? '<text class="repere haut" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by0 * ECH - 14) + '">' + a.repere + '</text>'
        : hors && a.rang === 4
        ? '<text class="repere haut" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by1 * ECH + 22) + '">' + a.repere + '</text>'
        : a.rang === 5 && (v !== a || serre(a.repere))   // vraie borne, ou bornier serré : repère sous le numéro du bas, au-dessus des fils (calque des étiquettes), en quinconce
        ? ((dessus += '<text class="repere petit dessus" style="text-anchor:middle" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by1 * ECH + 38 + 16 * (quinconce[a.repere] || 0)) + '">' + a.repere + '</text>'), '')
        : a.rang === 5
        ? '<text class="repere petit" style="text-anchor:end" x="' + (px + (bx0 + bx1) / 2 * ECH - 9) + '" y="' + (py + by1 * ECH + 17) + '">' + a.repere + '</text>'
        : '<text class="repere" x="' + (px + bx1 * ECH + 10) + '" y="' + (py + (by0 + by1) / 2 * ECH + 5) + '">' + a.repere + '</text>') + '</g>';
    v.bornes.forEach(b => {
      const bx = px + b.x * ECH, by = py + b.y * ECH;
      x0 = Math.min(x0, bx - 30); y0 = Math.min(y0, by - 30); x1 = Math.max(x1, bx + 30); y1 = Math.max(y1, by + 30);
      bornes[a.repere + ':' + b.id] = { ref: a.repere + ':' + b.id, rep: a.repere, id: b.id, x: bx, y: by, o: b.o, ligne: a.ligne || 0 };
    });
  });
  // le décor d'une vraie platine : fond, rails DIN sous chaque rangée, goulottes entre les rangées et sur les côtés
  let decor = '';
  if (PL && PL.cadre) {   // la vraie platine (mode « platine réelle » du convertisseur) : cadre, rails, goulottes à leur place
    const c = PL.cadre, r4 = (cls, g, dy) => '<rect class="' + cls + '" x="' + g.x0 + '" y="' + (g.y0 + dy) + '" width="' + (g.x1 - g.x0) + '" height="' + (g.y1 - g.y0 - 2 * dy) + '" rx="3"/>';
    decor += '<defs><pattern id="fentes" width="12" height="12" patternUnits="userSpaceOnUse"><rect x="4" y="0" width="4" height="12" fill="#f3f6f9"/></pattern></defs>';
    decor += r4('fond-platine cadre', c, 0);
    PL.rails.forEach(r => { decor += r4('rail', r, 0); });
    PL.goulottes_h.forEach(g => { decor += g.chemin ? r4('goulotte chemin', g, 0) : r4('goulotte', g, 0) + r4('goulotte-fentes', g, 3); });
    PL.goulottes_v.forEach(g => { decor += r4('goulotte', g, 0); });
  } else if (PL) {
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
  // Le numéro d'une borne, c'est le sujet (Franck, 26/09 : « trop petits pour être bien lus ») : gros, dans
  // une pastille, À CÔTÉ de la sortie du fil (jamais dessus), et seul — le symbole ne l'imprime plus en double.
  let bornesHtml = '', etiquettesHtml = '';
  Object.values(bornes).forEach(b => {
    const d = DIR[b.o];
    let lx, ly, ancre = 'start';
    if (d[1] !== 0) {   // à droite de la sortie ; à gauche si une voisine serrée occupe la droite (N1 contre 1 sur le DT40)
      const serree = Object.values(bornes).some(o => o !== b && o.o === b.o && Math.abs(o.y - b.y) < 2 && o.x > b.x && o.x - b.x < 26);
      lx = serree ? b.x - 7 : b.x + 7; ly = d[1] < 0 ? b.y - 8 : b.y + 20; if (serree) ancre = 'end';
    }
    else { lx = b.x + d[0] * 7; ly = b.y - 8; ancre = d[0] > 0 ? 'start' : 'end'; }
    bornesHtml += '<circle class="borne" role="button" aria-label="' + lib(b.ref) + '" data-ref="' + b.ref + '" cx="' + b.x + '" cy="' + b.y + '" r="' + RAYON_BORNE + '"/>';
    etiquettesHtml += '<text class="nom-borne" data-ref="' + b.ref + '" style="text-anchor:' + ancre + '" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '">' + b.id + '</text>';
  });
  $('#platine-corps').innerHTML = '<svg viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet">' +
    '<g id="decor">' + decor + '</g><g id="symboles">' + html + '</g><g id="fils"></g><g id="manques"></g>' +
    '<g id="etiquettes">' + etiquettesHtml + dessus + '</g><g id="bornes">' + bornesHtml + '</g>' +
    '<path id="fil-temp" class="fil-temp" d=""/></svg>';
  svgPlatine = $('#platine-corps svg');
  gFils = svgPlatine.querySelector('#fils'); gManques = svgPlatine.querySelector('#manques'); filTemp = svgPlatine.querySelector('#fil-temp');
  svgPlatine.querySelectorAll('.borne').forEach(c => { bornes[c.dataset.ref].el = c; });
  svgPlatine.querySelectorAll('#symboles .app').forEach(g => {
    const a = EX.appareils.find(x => x.repere === g.dataset.rep);
    if (a && a.rang > 0 && a.rang < 5) marquerNumerosImprimes(g, a);
  });
  svgPlatine.querySelectorAll('.nom-borne').forEach(t => {   // la pastille prend la taille du numéro
    const bb = t.getBBox(), r = document.createElementNS(NS, 'rect');
    r.setAttribute('class', 'pastille'); r.setAttribute('rx', 4);
    r.setAttribute('x', (bb.x - 2).toFixed(1)); r.setAttribute('y', (bb.y - 1).toFixed(1));
    r.setAttribute('width', (bb.width + 4).toFixed(1)); r.setAttribute('height', (bb.height + 2).toFixed(1));
    t.before(r); bornes[t.dataset.ref].pastille = r;
  });

  svgPlatine.addEventListener('pointerdown', debutTrace);
  svgPlatine.addEventListener('pointermove', suiviTrace);
  svgPlatine.addEventListener('pointerup', finTrace);
  svgPlatine.addEventListener('pointercancel', annulerTrace);
  svgPlatine.addEventListener('pointerleave', () => { if (!trace) aimanter(null); });
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
  aimanter(b); b.el.classList.add('armee');   // on voit tout de suite la borne prise
  viser(armee && armee !== b.ref ? 'Fil : ' + libSens(armee) + ' → ' + libSens(b.ref) : libSens(b.ref) + ' → …', e);
  filTemp.setAttribute('stroke', COULEURS[couleur]);
}
/* L'aimant (Franck, 26/09 : « quand tu approches, tu te mets directement ») : la borne la plus proche,
   dans le rayon de prise, grossit — au survol de la souris comme pendant le glisser — et le fil en cours
   s'y accroche avant qu'on lâche. On voit donc où il va se poser. */
let aimant = null;
function aimanter(b) {
  b = b || null;
  if (aimant === b) return;
  if (aimant) { aimant.el.classList.remove('aimant'); if (aimant.pastille) aimant.pastille.classList.remove('aimant'); }
  aimant = b;
  if (aimant) { aimant.el.classList.add('aimant'); if (aimant.pastille) aimant.pastille.classList.add('aimant'); }
}
function suiviTrace(e) {
  const pt = point(e);
  if (!trace) { if (e.pointerType === 'mouse' && !controle) aimanter(borneProche(pt)); return; }
  if (Math.hypot(pt.x - trace.x, pt.y - trace.y) > 8) trace.bouge = true;
  if (!trace.bouge) return;
  const b = borneProche(pt), cible = b && b !== trace.de ? b : null;
  if (cible !== aimant) viser('Fil : ' + libSens(trace.de.ref) + ' → ' + (cible ? libSens(cible.ref) : '…'), e);
  aimanter(cible);
  const fin = cible ? [cible.x, cible.y] : [pt.x, pt.y];
  filTemp.setAttribute('d', 'M' + trace.de.x + ' ' + trace.de.y + ' L' + fin[0].toFixed(1) + ' ' + fin[1].toFixed(1));
}
/* Au doigt, la borne visée est SOUS le doigt : une bulle posée sur la platine la dit en toutes lettres.
   Jamais la consigne : un texte qui change de longueur pendant le geste fait bouger la page sous le doigt
   (vu le 26/09 : le fil tombait sur l'en-tête du panneau). */
function viser(texte, e) {
  const v = $('#visee'); if (!v) return;
  v.hidden = !texte; v.textContent = texte || '';
  if (texte && e) {   // jamais sous le doigt : doigt en haut du panneau, bulle en bas, et inversement
    const r = $('#platine').getBoundingClientRect(), enHaut = e.clientY < r.top + r.height / 2;
    v.style.top = enHaut ? 'auto' : ''; v.style.bottom = enHaut ? '10px' : '';
  }
}
function annulerTrace() { trace = null; filTemp.setAttribute('d', ''); aimanter(null); armer(armee); viser(armee ? libSens(armee) + ' : touchez l’autre borne.' : null); }
function finTrace(e) {
  if (!trace) return;
  const b = borneProche(point(e)), de = trace.de;
  filTemp.setAttribute('d', ''); aimanter(null); viser(null);
  if (trace.bouge) {
    if (b && b.ref !== de.ref) creerFil(de.ref, b.ref);
    else if (MODE === 'guide') prochaineEtape();   // fil lâché dans le vide : la consigne de l'étape revient
    else dire('Fil lâché dans le vide : rien n’est posé.', null, 'Glissez d’une borne à l’autre, ou touchez l’une puis l’autre.');
    armer(null);
  } else if (armee && armee !== de.ref) {
    creerFil(armee, de.ref); armer(null);
  } else {
    armer(armee === de.ref ? null : de.ref);
    if (armee) viser(libSens(armee) + ' : touchez l’autre borne (ou celle-ci pour annuler).', e);
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
function goulotteDe(b) {             // la goulotte horizontale que rejoint une borne ; null : aucune (sous le dernier rail, hors platine)
  const gh = EX.platine.goulottes_h, k = b.ligne;
  let g = b.o === 0 ? k : b.o === 2 ? k + 1 : null;
  if (g === null) g = gh[k] && gh[k + 1] ? ((b.y - gh[k].y1) <= (gh[k + 1].y0 - b.y) ? k : k + 1) : gh[k] ? k : k + 1;   // borne latérale : la plus proche
  return gh[g] ? g : null;
}
/* Sans goulotte, le fil va en direct : deux bornes qui se font face sans goulotte entre elles (le relais
   thermique sous son contacteur), ou une borne qui n'a pas de goulotte (sous le dernier rail de la vraie
   platine : câbles d'arrivée et de moteur). */
function direct(A, B) {
  const [h, b] = A.y <= B.y ? [A, B] : [B, A];
  if (h.o === 2 && b.o === 0 && !EX.platine.goulottes_h.some(g => g.y0 >= h.y && g.y1 <= b.y)) return true;
  return goulotteDe(A) === null || goulotteDe(B) === null;
}
function cheminDirect(A, B, idx) {   // du haut vers le bas : descendre, se décaler, redescendre ; une borne latérale se prend de côté
  const [h, b] = A.y <= B.y ? [A, B] : [B, A];
  if (h.o !== 2) return cheminSimple(A, B, idx);
  const pts = [[h.x, h.y]], s = sortieDe(b);
  if ((b.o === 1 && h.x < s[0]) || (b.o === 3 && h.x > s[0])) {   // borne latérale tournée de l'autre côté (PE du moteur, bornier PE en tête) : on contourne l'appareil par le dessus
    const a = EX.appareils.find(x => x.repere === b.rep), v = vue(a), ym = v.implantation.y + v.boite[1] * ECH - 10 - (idx % 3) * COULOIR;
    pts.push([h.x, ym], [s[0], ym], s);
  } else if (b.o === 1 || b.o === 3) pts.push([h.x, b.y], s);
  else { const ym = (h.y + b.y) / 2 + ((idx % 5) - 2) * COULOIR; pts.push([h.x, ym], [b.x, ym]); }
  pts.push([b.x, b.y]);
  return pts;
}
function sortieDe(b) { return b.o === 1 ? [b.x + SORTIE, b.y] : b.o === 3 ? [b.x - SORTIE, b.y] : [b.x, b.y]; }
function couloirs(l) { return Math.max(1, Math.floor((l - 2 * MARGE_GOULOTTE) / COULOIR) + 1); }
function couloirY(k, i) { const g = EX.platine.goulottes_h[k]; return g.y0 + MARGE_GOULOTTE + (i % couloirs(g.y1 - g.y0)) * COULOIR; }
function couloirX(v, i) { const g = EX.platine.goulottes_v[v]; return g.x0 + MARGE_GOULOTTE + (i % couloirs(g.x1 - g.x0)) * COULOIR; }

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
    if (direct(A, B)) { f.route = { direct: true }; return; }
    const r = { gA: goulotteDe(A), gB: goulotteDe(B), pA: sortieDe(A), pB: sortieDe(B), cote: -1 };
    if (r.gA === r.gB) {
      r.cA = r.cB = libre(occH[r.gA], Math.min(r.pA[0], r.pB[0]), Math.max(r.pA[0], r.pB[0]));
    } else {   // par la goulotte verticale la plus proche (la vraie platine n'en a qu'une, à gauche)
      const xg = PL.goulottes_v[0].x1, xd = PL.goulottes_v[1] ? PL.goulottes_v[1].x0 : null;
      r.cote = xd === null || (Math.abs(r.pA[0] - xg) + Math.abs(r.pB[0] - xg)) <= (Math.abs(r.pA[0] - xd) + Math.abs(r.pB[0] - xd)) ? 0 : 1;
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
  const r = f.route;
  let pts = [[A.x, A.y]];
  if (r.direct) pts = cheminDirect(A, B, f.idx);
  else {
    if (r.pA[0] !== A.x) pts.push(r.pA);
    const yA = couloirY(r.gA, r.cA);
    if (r.cote < 0) pts.push([r.pA[0], yA], [r.pB[0], yA]);
    else { const xv = couloirX(r.cote, r.cV), yB = couloirY(r.gB, r.cB); pts.push([r.pA[0], yA], [xv, yA], [xv, yB], [r.pB[0], yB]); }
    if (r.pB[0] !== B.x) pts.push(r.pB);
    pts.push([B.x, B.y]);
  }
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
    if (!bon) { refus++; dire('Non : ce fil ne correspond pas au conducteur qui clignote sur la carte.', 'ko', 'Relisez les numéros de ses deux bornes sur le schéma. Le bouton Aide peut vous mettre sur la voie.'); return; }
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
  fils = []; gFils.innerHTML = ''; etapeIdx = 0; aides = 0; refus = 0; niveauAide = 0; controle = false; debut = Date.now(); compterAide(0);
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
/* Règle n° 1 de Franck (26/09/2026) : « trouver les numéros ». Le guidage montre le CONDUCTEUR à poser
   sur le schéma, jamais ses numéros : l'élève les lit lui-même, puis cherche les bornes sur la platine. */
function conducteurCarte(de, a) {
  const svg = $('#carte-corps svg'); if (!svg || !de) return null;
  return [...svg.querySelectorAll('#conducteurs polyline')].find(pl => {
    const p = pl.getAttribute('points').trim().split(/\s+/), d = p[0].split(',').map(Number), f = p[p.length - 1].split(',').map(Number);
    return cle(borneCarte(d[0], d[1]) || '', borneCarte(f[0], f[1]) || '') === cle(de, a);
  }) || null;
}
function montrerConducteur(de, a) {
  const svg = $('#carte-corps svg'); if (!svg) return false;
  svg.querySelectorAll('#conducteurs polyline.etape').forEach(pl => pl.classList.remove('etape'));
  const pl = conducteurCarte(de, a); if (pl) pl.classList.add('etape');
  if (canal && VUE !== 'carte') canal.postMessage({ type: 'cond', de, a });
  return !!pl;
}
function compterAide(n) {
  if (n === undefined) aides++; else aides = n;
  const b = $('#btn-aide'); if (b) b.textContent = aides ? 'Aide (' + aides + ')' : 'Aide';
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
  if (!et) { surbrillance([]); montrerConducteur(null); dire('Tout est câblé. Contrôle en cours…', 'ok'); setTimeout(controler, 600); return; }
  choisirCouleur(et.couleurs[0]);
  const fixes = new Set(liaisonsFixes().map(([a, b]) => cle(a, b))), aPoser = EX.etapes.filter(e => !fixes.has(cle(e.de, e.a)));
  const n = EX.etapes.slice(0, etapeIdx).filter(e => !fixes.has(cle(e.de, e.a))).length + 1, total = aPoser.length;
  if (montrerConducteur(et.de, et.a)) {
    surbrillance([]);
    dire('Fil ' + n + '/' + total + ' : posez le conducteur qui clignote sur la carte, en ' + et.couleurs[0] + '.', null,
         'Lisez les numéros de ses deux bornes sur le schéma, puis trouvez-les sur la platine. Le courant ressort par la borne paire et entre dans l’appareil suivant par l’impaire.');
  } else {   // conducteur introuvable sur la carte : l'ancien guidage, bornes nommées
    surbrillance([et.de, et.a], [rep(et.de), rep(et.a)]);
    dire('Fil ' + n + '/' + total + ' : de ' + libSens(et.de) + ' à ' + libSens(et.a) + ', en ' + et.couleurs[0] + '.', null, 'Glissez le doigt d’une borne à l’autre, ou touchez l’une puis l’autre.');
  }
}
/* L'aide en trois crans, chacun compté (« plus ils demandent d'aide, plus ils perdent de points » — la
   règle de points est écrite dans le TP) : 1 les deux appareils, 2 les numéros, 3 les bornes qui clignotent. */
function aider() {
  const et = prochaineEtapeNonFaite();
  if (!et) { dire('Tout est relié : contrôlez.', 'ok'); return; }
  compterAide();
  const k = cle(et.de, et.a);
  niveauAide = (cibleAide === k) ? Math.min(3, niveauAide + 1) : 1;
  cibleAide = k;
  montrerConducteur(et.de, et.a);
  if (niveauAide === 1) { surbrillance([], [rep(et.de), rep(et.a)]); dire('Aide 1 : ce conducteur relie ' + rep(et.de) + ' et ' + rep(et.a) + '.', null, 'Ils sont éclairés sur la platine. Quels numéros de bornes ? Appuyez encore pour plus d’aide.'); }
  else if (niveauAide === 2) { surbrillance([], [rep(et.de), rep(et.a)]); dire('Aide 2 : de ' + libSens(et.de) + ' à ' + libSens(et.a) + '.', null, 'Trouvez ces deux bornes sur la platine. Appuyez encore pour les voir clignoter.'); }
  else { choisirCouleur(et.couleurs[0]); surbrillance([et.de, et.a], [rep(et.de), rep(et.a)]); dire('Aide 3 : ' + lib(et.de) + ' → ' + lib(et.a) + ' en ' + et.couleurs[0] + '.', null, 'Les deux bornes clignotent et la couleur est choisie. Tirez le fil.'); }
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
    (MODE === 'guide' ? '<tr><td>Fils refusés</td><td>' + refus + '</td></tr>' : '') +
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
    liste.push({ date: new Date().toISOString(), exercice: ID, activite: ACTIVITE, mode: MODE, niveau: r.niveau, justes: r.justes, total: r.total,
                 enTrop: r.enTrop, couleursFausses: r.couleursFausses, aides, refus, fils: fils.length, secondes });
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
  brancherNavigation();
}
function aller(activite, mode, reelle) {
  location.search = '?ex=' + encodeURIComponent(ID) + '&activite=' + activite + '&mode=' + mode + ((reelle === undefined ? REELLE : reelle) ? '&platine=reelle' : '') +
    (P.get('tuto') !== null ? '&tuto' : '');   // le tutoriel (moteur/tutoriel.js) suit l'élève d'une activité à l'autre
}
function brancherNavigation() {
  document.querySelectorAll('#modes button').forEach(b => {
    b.classList.toggle('actif', b.dataset.mode === MODE);
    b.onclick = () => aller(ACTIVITE, b.dataset.mode);
  });
  document.querySelectorAll('#activites button').forEach(b => {
    b.classList.toggle('actif', b.dataset.activite === ACTIVITE);
    b.onclick = () => aller(b.dataset.activite, MODE);
  });
  const vr = $('#btn-vue-reelle');   // symboles <-> vrais appareils ; la page repart de zéro, comme pour un changement de mode
  if (vr) {
    vr.hidden = !EX.reel;
    vr.textContent = vueReelle() ? 'Symboles' : 'Vue réelle';
    vr.title = vueReelle() ? 'Revenir aux symboles du schéma sur la platine' : 'Voir les vrais appareils sur la platine (la carte reste en symboles)';
    vr.onclick = () => aller(ACTIVITE, MODE, !vueReelle());
  }
}

// ------------------------------------------------------------ colorier et repérer : les parties A et B du TP
/* Le TP de câblage de Franck se fait en trois temps (« tp cablage pu co reperage ») : A colorier les
   conducteurs du schéma — « colorier la phase, colorier le neutre, il faut le faire » —, B numéroter
   les bornes — « le repérage des bornes, hyper important » —, C câbler. A et B se jouent sur la carte
   seule, platine masquée, avec les trois mêmes modes : guidé (un élément à la fois, réponse vérifiée
   tout de suite), aidé (libre, aide en trois crans), réel (contrôle à la fin). Ce que porte chaque
   conducteur (L1 L2 L3 L N PE) vient du convertisseur, qui le suit à travers les pôles. */
const TEINTE = { L1: 'marron', L2: 'noir', L3: 'gris', L: 'marron', N: 'bleu', PE: 'vert-jaune' };
let items = [], courant = null, pinceau = null, svgCarte = null;

function creer(parent, nom, attrs) {
  const e = document.createElementNS(NS, nom);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  parent.appendChild(e); return e;
}
function borneCarte(x, y) {
  let m = null, d = 1.5;
  EX.carte.bornes.forEach(b => { const e = Math.hypot(b.x - x, b.y - y); if (e < d) { d = e; m = b.ref; } });
  return m;
}
function potentiels() { return Object.keys(TEINTE).filter(p => items.some(i => i.attendu === p)); }
function ordreBornes(p, q) {
  const k = (s) => /^\d+$/.test(s) ? [0, +s, ''] : s === 'PE' ? [3, 0, s] : [/^[UVW]/.test(s) ? 1 : 2, 0, s];
  const a = k(p), b = k(q);
  return a[0] - b[0] || a[1] - b[1] || a[2].localeCompare(b[2]);
}
// A — un élément par conducteur du schéma : ses deux bouts sont des bornes, son réseau dit ce qu'il porte
function itemsColorier() {
  const gTraits = document.createElementNS(NS, 'g'), gCibles = creer(svgCarte, 'g', { id: 'coloriage' });
  svgCarte.querySelector('#conducteurs').after(gTraits);   // le coloriage passe sous les symboles
  svgCarte.querySelectorAll('#conducteurs polyline').forEach(pl => {
    const points = pl.getAttribute('points'), pts = points.trim().split(/\s+/).map(p => p.split(',').map(Number));
    const de = borneCarte(...pts[0]), a = borneCarte(...pts[pts.length - 1]);
    const r = de && a && reseauDe(de);
    if (!r || !TEINTE[r.potentiel]) return;
    const it = { de, a, attendu: r.potentiel, reponse: null, x: Math.min(...pts.map(p => p[0])), y: Math.min(...pts.map(p => p[1])) };
    it.trait = creer(gTraits, 'polyline', { class: 'trait', points });
    it.tirets = creer(gTraits, 'polyline', { class: 'tirets', points });
    it.el = creer(gCibles, 'polyline', { class: 'hit', points, role: 'button', 'aria-label': 'conducteur ' + lib(de) + ' vers ' + lib(a) });
    it.el.addEventListener('click', () => toucher(it));
    items.push(it);
  });
  items.sort((p, q) => p.y - q.y || p.x - q.x);
}
// B — un élément par borne d'appareil (ni arrivée ni bornier) ; les numéros imprimés par le symbole se cachent
function itemsReperer() {
  const pos = {}; EX.carte.bornes.forEach(b => { pos[b.ref] = b; });
  const place = {}; (EX.carte.appareils || []).forEach(a => { place[a.repere] = a; });
  svgCarte.querySelectorAll('text.imprime').forEach(t => { t.style.display = 'none'; });   // repérés par construireCarte
  const gCibles = creer(svgCarte, 'g', { id: 'reperage' });
  EX.appareils.filter(a => a.rang > 0 && a.rang < 5 && a.bornes.length > 1).forEach(a => {
    const ids = a.bornes.map(b => b.id), b0 = a.bornes.find(b => pos[a.repere + ':' + b.id]);
    if (!b0) return;
    const ordre = place[a.repere] || pos[a.repere + ':' + b0.id];
    a.bornes.forEach(b => {
      const p = pos[a.repere + ':' + b.id]; if (!p) return;
      const it = { rep: a.repere, nom: a.nom, attendu: b.id, reponse: null, candidats: ids.slice().sort(ordreBornes),
                   cle: [ordre.y, ordre.x, p.y, p.x] };
      it.texte = creer(gCibles, 'text', { class: 'rep-borne vide', x: p.x + 5, y: p.y - 4 }); it.texte.textContent = '?';
      it.el = creer(gCibles, 'circle', { class: 'cible', cx: p.x, cy: p.y, r: 8, role: 'button', 'aria-label': 'une borne de ' + a.repere });
      it.el.addEventListener('click', () => toucher(it));
      items.push(it);
    });
  });
  items.sort((p, q) => p.cle.reduce((d, v, k) => d || v - q.cle[k], 0));
}
function regle(it) {
  if (ACTIVITE === 'colorier') return 'Remontez le fil jusqu’à l’arrivée : dans chaque appareil, la borne 2 continue la 1, la 4 continue la 3, la 6 continue la 5.';
  const ids = it.candidats;
  if (ids.every(i => /^\d+$/.test(i))) {
    const imp = ids.filter(i => +i % 2);
    return 'En haut les impaires : ' + imp.join(', ') + ' de gauche à droite. En bas les paires : ' + imp.map(i => (+i + 1) + ' sous le ' + i).join(', ') + '.';
  }
  if (ids.some(i => /^[UVW]\d/.test(i))) return 'Moteur : U1, V1, W1 de gauche à droite ; PE, c’est la terre.';
  if (ids.some(i => /^A\d/.test(i))) return 'A1 en haut, A2 en bas.';
  return 'Cherchez le repère de la borne sur l’appareil.';
}
function marquerCourant(it) {
  courant = it || null;
  items.forEach(i => i.el.classList.toggle('courant', i === courant));
  if (ACTIVITE !== 'reperer') return;
  const zone = $('#couleurs'); zone.innerHTML = '';
  $('#couleur-nom').textContent = courant ? courant.rep + ' : ' + courant.nom.toLowerCase() : 'Touchez une borne du schéma.';
  if (courant) courant.candidats.forEach(c => {
    const b = document.createElement('button'); b.className = 'touche'; b.textContent = c;
    b.onclick = () => repondre(courant, c); zone.appendChild(b);
  });
}
function peindre(it) {
  it.el.classList.remove('faux');
  if (ACTIVITE === 'colorier') {
    const t = it.reponse ? TEINTE[it.reponse] : null;
    if (t) it.trait.setAttribute('stroke', COULEURS[t]);
    it.trait.setAttribute('class', 'trait' + (t ? ' pose' : ''));
    it.tirets.setAttribute('class', 'tirets' + (t === 'vert-jaune' ? ' pose' : ''));
  } else {
    it.texte.textContent = it.reponse || '?';
    it.texte.setAttribute('class', 'rep-borne' + (!it.reponse ? ' vide' : MODE === 'guide' ? ' juste' : ''));
  }
}
function toucher(it) {
  if (controle) return;
  if (MODE === 'guide') {
    if (it !== courant) dire('Suivez l’ordre : ' + (ACTIVITE === 'colorier' ? 'le conducteur' : 'la borne') + ' qui clignote.', null, ACTIVITE === 'colorier' ? 'Touchez sa couleur dans la palette.' : 'Touchez son numéro en bas.');
    return;
  }
  if (ACTIVITE === 'reperer') { marquerCourant(it); dire('Quel numéro pour cette borne de ' + it.rep + ' ?', null, 'Touchez-le en bas.'); return; }
  if (!pinceau) { dire('Choisissez d’abord une couleur dans la palette.', 'ko'); return; }
  repondre(it, it.reponse === pinceau ? null : pinceau);   // toucher de nouveau efface
}
function choisirPinceau(p) {
  if (MODE === 'guide') { repondre(courant, p); return; }
  pinceau = p;
  document.querySelectorAll('#couleurs .potentiel').forEach(b => b.classList.toggle('actif', b.dataset.pot === p));
  $('#couleur-nom').textContent = 'Couleur : ' + p + ' (' + TEINTE[p] + ')';
}
function repondre(it, val) {
  if (!it) return;
  if (MODE === 'guide' && val !== it.attendu) {
    dire(ACTIVITE === 'colorier' ? 'Non : ce conducteur ne porte pas ' + val + '.' : 'Non : ce n’est pas la borne ' + val + '.', 'ko', regle(it));
    return;
  }
  it.reponse = val; peindre(it);
  if (MODE === 'guide') { suivant(); return; }
  if (ACTIVITE === 'reperer') {
    const suite = items.find(i => i.rep === it.rep && !i.reponse);   // la borne suivante du même appareil
    marquerCourant(suite);
    dire(it.rep + ' : borne notée ' + val + '.', null, suite ? 'Touchez le numéro de la borne suivante, qui clignote.' : 'Touchez une autre borne, ou contrôlez.');
  } else dire(val ? 'Colorié en ' + TEINTE[val] + ' : ' + val + '.' : 'Couleur effacée.', null, 'Continuez, puis contrôlez.');
}
function suivant() {
  const it = items.find(i => i.reponse !== i.attendu);
  marquerCourant(it);
  if (!it) { dire(ACTIVITE === 'colorier' ? 'Tout est colorié. Contrôle…' : 'Toutes les bornes sont repérées. Contrôle…', 'ok'); setTimeout(controlerCarte, 600); return; }
  const n = items.filter(i => i.reponse === i.attendu).length + 1;
  if (ACTIVITE === 'colorier') dire('Conducteur ' + n + '/' + items.length + ' : que porte-t-il ? Touchez sa couleur.', null, potentiels().join(', ') + ' : remontez le fil jusqu’à l’arrivée.');
  else dire('Borne ' + n + '/' + items.length + ', sur ' + it.rep + ' : quel numéro ?', null, regle(it));
}
function aiderCarte() {
  const it = items.find(i => i.reponse !== i.attendu);
  if (!it) { dire('Tout est juste : contrôlez.', 'ok'); return; }
  compterAide();
  niveauAide = (cibleAide === it) ? Math.min(3, niveauAide + 1) : 1;
  cibleAide = it;
  const quoi = ACTIVITE === 'colorier' ? 'ce conducteur' : 'cette borne de ' + it.rep;
  if (niveauAide === 1) dire('Aide 1 : la règle.', null, regle(it) + ' Appuyez encore pour plus d’aide.');
  else if (niveauAide === 2) { marquerCourant(it); dire('Aide 2 : ' + quoi + ' est à revoir.', null, 'Il clignote. Appuyez encore pour la réponse.'); }
  else {
    it.reponse = it.attendu; peindre(it); marquerCourant(null);
    dire('Aide 3 : ' + (ACTIVITE === 'colorier' ? quoi + ' porte ' + it.attendu + ', en ' + TEINTE[it.attendu] : 'c’est la borne ' + it.attendu) + '.', null, 'La réponse est posée pour vous.');
  }
}
function demarrerCarte() {
  $('#btn-aide').style.display = MODE === 'reel' ? 'none' : '';
  pinceau = null; marquerCourant(null);
  document.querySelectorAll('#couleurs .potentiel').forEach(b => b.classList.remove('actif'));
  if (MODE === 'guide') { suivant(); return; }
  const fin = MODE === 'aide' ? 'Le bouton Aide vous guide.' : 'Pas d’aide : contrôle à la fin, comme à l’examen.';
  if (ACTIVITE === 'colorier') dire('Coloriez chaque conducteur : ' + potentiels().map(p => p + ' ' + TEINTE[p]).join(', ') + '.', null, 'Choisissez une couleur, puis touchez les conducteurs. ' + fin);
  else dire('Numérotez les bornes : touchez une borne, puis son numéro.', null, fin);
}
function controlerCarte() {
  controle = true; marquerCourant(null);
  const total = items.length, justes = items.filter(i => i.reponse === i.attendu).length;
  const faux = items.filter(i => i.reponse && i.reponse !== i.attendu), vides = items.filter(i => !i.reponse);
  const niveau = justes === total ? 4 : justes >= 0.8 * total ? 3 : justes >= total / 2 ? 2 : justes > 0 ? 1 : 0;
  faux.forEach(i => { i.el.classList.add('faux'); if (i.texte) i.texte.setAttribute('class', 'rep-borne faux'); });
  const secondes = Math.round((Date.now() - debut) / 1000);
  const quoi = ACTIVITE === 'colorier' ? ['Conducteurs justes', 'Conducteurs à revoir', 'Non coloriés'] : ['Bornes justes', 'Bornes à revoir', 'Non numérotées'];
  const libNiveau = ['Rien n’est fait', 'Début', 'À moitié', 'Presque tout juste', 'Tout juste'][niveau];
  let lignes;
  if (ACTIVITE === 'colorier') lignes = faux.slice(0, 6).map(i => lib(i.de) + ' → ' + lib(i.a) + (MODE === 'reel' ? ' : à revoir' : ' : colorié ' + i.reponse + ', il porte ' + i.attendu));
  else { const par = {}; faux.concat(vides).forEach(i => { par[i.rep] = (par[i.rep] || 0) + 1; }); lignes = Object.entries(par).slice(0, 6).map(([r, n]) => r + ' : ' + n + ' borne' + (n > 1 ? 's' : '') + ' à revoir'); }
  const suite = { colorier: ['reperer', 'Passer au repérage'], reperer: ['cabler', 'Passer au câblage'] }[ACTIVITE];
  let html = '<h2><span class="niveau n' + niveau + '">' + niveau + '</span>' + libNiveau + '</h2><table>' +
    '<tr><td>' + quoi[0] + '</td><td>' + justes + ' / ' + total + '</td></tr>' +
    '<tr><td>' + quoi[1] + '</td><td>' + faux.length + '</td></tr>' +
    '<tr><td>' + quoi[2] + '</td><td>' + vides.length + '</td></tr>' +
    (MODE !== 'reel' ? '<tr><td>Aides demandées</td><td>' + aides + '</td></tr>' : '') +
    '<tr><td>Temps</td><td>' + Math.floor(secondes / 60) + ' min ' + (secondes % 60) + ' s</td></tr></table>';
  if (lignes.length) html += '<ul>' + lignes.map(() => '<li></li>').join('') + '</ul>';
  html += '<div class="boutons"><button id="btn-continuer">' + (niveau === 4 ? 'Revoir le schéma' : 'Corriger') + '</button>' +
    '<button' + (niveau === 4 ? '' : ' class="principal"') + ' id="btn-refaire">Recommencer</button>' +
    (niveau === 4 ? '<button class="principal" id="btn-suite">' + suite[1] + ' →</button>' : '') + '</div>';
  const boite = $('#resultat'); boite.innerHTML = html;
  boite.querySelectorAll('li').forEach((li, k) => { li.textContent = lignes[k]; });
  $('#voile').classList.add('ouvert');
  dire(libNiveau + ' : ' + justes + ' sur ' + total + '.', niveau >= 3 ? 'ok' : 'ko');
  $('#btn-continuer').onclick = () => { $('#voile').classList.remove('ouvert'); controle = false; };
  $('#btn-refaire').onclick = recommencerCarte;
  const bs = $('#btn-suite'); if (bs) bs.onclick = () => aller(suite[0], MODE);
  tracer({ niveau, justes, total, enTrop: faux.length, couleursFausses: 0 }, secondes);
}
function recommencerCarte() {
  items.forEach(i => { i.reponse = null; peindre(i); });
  compterAide(0); niveauAide = 0; cibleAide = null; controle = false; debut = Date.now();
  $('#voile').classList.remove('ouvert');
  demarrerCarte();
}
function lancerCarte() {
  document.body.classList.add('sur-carte', 'activite-' + ACTIVITE);
  svgCarte = $('#carte-corps svg');
  $('#carte .entete span').textContent = ACTIVITE === 'colorier' ? 'coloriez les conducteurs' : 'numérotez les bornes';
  if (ACTIVITE === 'colorier') { $('#carte').classList.add('numeros'); itemsColorier(); } else itemsReperer();
  brancherNavigation();
  if (!items.length) { dire('Cette activité n’est pas prête pour cet exercice.', 'ko', 'Reconvertissez-le avec outils/qet-vers-exercice.py.'); return; }
  brancherZoom($('#carte'), installerZoom(svgCarte, { peutDeplacer: (e) => !(e.target.closest && e.target.closest('.hit, .cible')) }));
  if (ACTIVITE === 'colorier') potentiels().forEach(p => {
    const b = document.createElement('button');
    b.className = 'couleur potentiel ' + TEINTE[p]; b.dataset.pot = p; b.setAttribute('aria-label', p + ', fil ' + TEINTE[p]);
    if (TEINTE[p] !== 'vert-jaune') b.style.background = COULEURS[TEINTE[p]];
    const s = document.createElement('span'); s.textContent = p; b.appendChild(s);
    b.onclick = () => choisirPinceau(p);
    $('#couleurs').appendChild(b);
  });
  $('#btn-numeros').onclick = () => $('#carte').classList.toggle('numeros');
  $('#btn-aide').onclick = aiderCarte;
  $('#btn-recommencer').onclick = recommencerCarte;
  $('#btn-controler').onclick = controlerCarte;
  demarrerCarte();
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

// ------------------------------------------------------------ la nomenclature : repère et nom de chaque appareil
/* Comme sur tout folio de schéma : la liste des appareils, sous la consigne, visible dans les trois temps
   (elle ne dit aucun numéro de borne). L'arrivée se lit sur le schéma ; les bornes du bornier se groupent. */
// Chaque nom renvoie à sa station ÉlectroRézo sur inerweb.fr : la technologie de l'appareil (Franck, 26/09).
const STATIONS = {
  'interrupteur-sectionneur': '3-3-interrupteur-sectionneur', 'sectionneur': '3-2-sectionneur', 'interrupteur': '3-1-interrupteur',
  'disjoncteur': '4-3-disjoncteur-magneto-thermique', 'disjoncteur moteur': '4-4-disjoncteur-moteur', 'fusible': '4-1-fusible-gg',
  'interrupteur différentiel': '4-5-interrupteur-differentiel', 'relais thermique': '4-7-relais-thermique',
  'contacteur': '5-2-contacteur', 'contact': '5-3-contact-auxiliaire', 'bouton-poussoir': '5-7-boutons', 'voyant': '5-8-securite-signalisation',
  'bobine de contacteur': '6-1-bobine-electro-aimant', 'transformateur': '6-2-transformateur', 'moteur': '6-3-moteur-asynchrone'
};
function construireNomenclature() {
  const z = $('#nomenclature'); if (!z) return;
  const cle = (a) => (a.rang === 5 ? 3.5 : a.rang);   // dans l'ordre du câblage : protections, commande, puissance, bornier, récepteurs
  const liste = EX.appareils.filter(a => a.rang > 0).slice().sort((p, q) => cle(p) - cle(q));
  const bornier = liste.filter(a => a.rang === 5).map(a => a.repere);
  z.textContent = '';
  const titre = document.createElement('span'); titre.className = 'titre-nomenclature'; titre.textContent = 'Nomenclature'; z.append(titre);
  const ajouter = (rep, nom) => {
    const s = document.createElement('span'), b = document.createElement('b'); b.textContent = rep; s.append(b, ' ');
    if (STATIONS[nom]) {
      const a = document.createElement('a'); a.textContent = nom; a.target = '_blank'; a.rel = 'noopener';
      a.href = 'https://inerweb.fr/electrorezo/stations/' + STATIONS[nom] + '/'; a.title = 'Station ÉlectroRézo sur inerweb.fr : ' + nom;
      s.append(a);
    } else s.append(nom);
    z.append(s);
  };
  liste.forEach(a => {
    if (a.rang !== 5) ajouter(a.repere, a.nom.toLowerCase());
    else if (a.repere === bornier[0]) ajouter(bornier.length > 1 ? bornier[0] + ' à ' + bornier[bornier.length - 1] : bornier[0], bornier.length > 1 ? 'bornes du bornier' : 'borne');
  });
}

// ------------------------------------------------------------ vue carte seule (deuxième écran)
function vueCarte() {
  document.body.classList.add('vue-carte');
  ['#platine', '.consigne', '.outils', '#modes'].forEach(s => { const e = $(s); if (e) e.remove(); });
  $('#carte .entete b').textContent = 'La carte — deuxième écran';
  $('#btn-detacher').remove();
  $('#btn-numeros').onclick = () => $('#carte').classList.toggle('numeros');
  if (canal) canal.onmessage = (m) => { if (m.data.type === 'sb') surbrillance(m.data.refs, m.data.reps); else if (m.data.type === 'cond') montrerConducteur(m.data.de, m.data.a); };
}

// ------------------------------------------------------------ état lisible de l'extérieur (tests automatiques, HAL plus tard)
window.CABLAGE_ETAT = () => ({ exercice: ID, activite: ACTIVITE, mode: MODE, fils: fils.map(f => ({ de: f.de, a: f.a, couleur: f.couleur })),
                               aides, controle, analyse: EX ? analyser() : null,
                               carte: items.map(i => ({ quoi: i.rep || lib(i.de) + ' > ' + lib(i.a), attendu: i.attendu, reponse: i.reponse })) });

// ------------------------------------------------------------ départ
// Un téléphone (plus petit côté de l'ÉCRAN sous 500 px ; une tablette en a 600 et plus) : bornes trop petites au doigt
// (essai de Franck, 27/09). On le dit, sans bloquer. L'écran et non la fenêtre : un ordinateur à fenêtre étroite n'est pas visé.
if (Math.min(screen.width, screen.height) < 500) {
  $('#petit-ecran').classList.add('ouvert');
  $('#btn-petit-ecran').onclick = () => $('#petit-ecran').classList.remove('ouvert');
}
if (!ID) { dire('Aucun exercice demandé.', 'ko', 'Revenez à la liste.'); return; }
charger(ID, (ex) => {
  if (!ex) { dire('Exercice « ' + ID + ' » introuvable.', 'ko', 'Lancez outils/qet-vers-exercice.py.'); return; }
  EX = ex;
  document.title = 'Câblage virtuel — ' + EX.titre;
  $('#titre').textContent = EX.titre;
  construireNomenclature();
  construireCarte();
  if (VUE !== 'carte' && ACTIVITE !== 'cabler') { lancerCarte(); return; }
  $('#carte').classList.add('numeros');   // les numeros de bornes sont le sujet : visibles d'emblee
  brancherZoom($('#carte'), installerZoom($('#carte-corps svg'), {}));
  if (VUE === 'carte') { vueCarte(); return; }
  construirePlatine();
  brancherZoom($('#platine'), installerZoom(svgPlatine, {
    peutDeplacer: (e) => !trace && !(e.target.closest && e.target.closest('.fil')),
    annuler: annulerTrace
  }));
  construireOutils();
  rafraichir();
  demarrerMode();
});
})();

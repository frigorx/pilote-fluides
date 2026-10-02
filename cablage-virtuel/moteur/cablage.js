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
// Toucher une borne puis l'autre (Franck, 29/09 : « je clique sur un point et je clique sur l'autre ») : un doigt ou un pavé
// tactile tremble ; le seuil se compte en pixels d'ÉCRAN (8 unités de platine ne faisaient que 4 px à 1366 × 768, et le toucher
// devenait un glisser lâché dans le vide). Un appui lâché sur sa propre borne reste un toucher, quel que soit le tremblé.
const SEUIL_GLISSER = 12;
const DIR = [[0, -1], [1, 0], [0, 1], [-1, 0]];   // orientation QElectroTech : 0 nord 1 est 2 sud 3 ouest
const NS = 'http://www.w3.org/2000/svg';

const P = new URLSearchParams(location.search);
const ID = P.get('ex');
const VUE = P.get('vue');
// 29/09 : le troisième mode s'appelle « Avancé » à l'écran (jamais « examen ») ; sa valeur reste 'reel', « avance » est accepté
const MODE = P.get('mode') === 'avance' ? 'reel' : ['guide', 'aide', 'reel'].includes(P.get('mode')) ? P.get('mode') : 'guide';
const ACTIVITE = ['colorier', 'reperer', 'cabler', 'realiser'].includes(P.get('activite')) ? P.get('activite') : 'cabler';
const REELLE_ADRESSE = P.get('platine') === 'reelle';
const REELLE = REELLE_ADRESSE || ACTIVITE === 'realiser';   // Réaliser montre la platine en vrais appareils, quand l'exercice en a
const TUTO = P.get('tuto') !== null;
// À l'atelier (29/09) : écran seulement · en deux temps (tout l'écran, puis l'étape 5 Réaliser) · fil par fil (un fil à l'écran,
// le même sur la platine). L'ADRESSE seule, sinon l'écran (30/09, constat P6 : un réglage gardé sur l'appareil s'appliquait
// ensuite aux anciens QR sans &atelier ; un ancien QR retrouve l'écran seul). Le tutoriel : l'écran.
const ATELIERS = ['ecran', 'deux', 'fil'];
const ATELIER = ATELIERS.includes(P.get('atelier')) && !TUTO ? P.get('atelier') : 'ecran';
const FIL_PAR_FIL = ATELIER === 'fil' && ACTIVITE === 'cabler' && VUE !== 'carte';
const CLE_FILS = 'cablage-virtuel:fils:' + ID;   // les fils posés à l'écran : l'étape Réaliser, et le retour à Câbler
// La mémoire des fils, lue une fois ; un élément incomplet (mémoire abîmée) est ignoré, jamais une erreur (constat R5).
// Stockage bloqué : les fils de cet onglet passent par window.name, le temps d'aller de Câbler à Réaliser (constat X8).
let STOCKAGE_BLOQUE = false;
const MEMOIRE = (() => {
  let m = null;
  try { m = JSON.parse(localStorage.getItem(CLE_FILS) || 'null'); } catch (err) { m = null; STOCKAGE_BLOQUE = !(err instanceof SyntaxError); }
  if (!m && ID) try { const n = window.name || '', t = 'cablage-virtuel:fils:' + ID + '='; if (n.startsWith(t)) m = JSON.parse(n.slice(t.length)); } catch (err) { m = null; }
  if (!m || typeof m !== 'object') return null;
  const valide = (f) => f && typeof f === 'object' && typeof f.de === 'string' && typeof f.a === 'string' && /:/.test(f.de) && /:/.test(f.a);
  m.fils = Array.isArray(m.fils) ? m.fils.filter(valide).map(f => ({ de: f.de, a: f.a, couleur: typeof f.couleur === 'string' ? f.couleur : 'noir', pose: f.pose === true })) : [];
  return m;
})();
// la station du réseau (moteur/reseau.js) : le « ‹ » et « Plus » y ramènent
const RESEAU = window.CABLAGE_RESEAU || null;
const SD = RESEAU && RESEAU.stationDe && ID ? RESEAU.stationDe(ID) : null;
const STATION = TUTO ? 'depart' : SD ? SD.station.id : null;
// 28/09 : plusieurs matériels pour une même platine (domestique : mural / 22 mm), « au choix du prof et en fonction des
// moyens » — `&materiel=`, sinon le dernier choix gardé sur l'appareil, sinon le premier (mural)
const CLE_MATERIEL = 'cablage-virtuel:materiel';
let MATERIEL = P.get('materiel') || (ACTIVITE === 'realiser' && MEMOIRE && MEMOIRE.materiel) ||   // Réaliser : le matériel des fils mémorisés
  (() => { try { return localStorage.getItem(CLE_MATERIEL) || ''; } catch (err) { return ''; } })();   // la platine en vue réelle (§ 5 B) : les vrais appareils, la carte reste en symboles
const $ = (s) => document.querySelector(s);

let EX, fils = [], couleur = 'marron', armee = null, choisi = null, trace = null;
let aides = 0, niveauAide = 0, cibleAide = null, etapeIdx = 0, debut = Date.now(), controle = false, refus = 0;
let filsControles = null;     // les fils au dernier contrôle : en Avancé, la mise sous tension le demande (moteur/tension-ecran.js)
let enAttente = null;         // fil par fil : le fil posé à l'écran qui attend « C'est posé sur la platine »
const bornes = {};            // 'Q1:2' -> {ref, rep, id, x, y, o, el}
const cartesBornes = {};      // 'Q1:2' -> [cercles sur la carte]
let svgPlatine, gFils, gManques, filTemp;
let canal = null;
try { canal = ID && 'BroadcastChannel' in window ? new BroadcastChannel('cablage-virtuel-' + ID) : null; } catch (e) { canal = null; }

// ------------------------------------------------------------ utilitaires
// Le nom de l'appareil accompagne son repère (Franck, 26/09 : « il manquait le nom des appareils ») ;
// l'arrivée et les bornes du bornier se lisent sans.
// Une borne que le schéma source ne nomme pas (Franck, 29/09 : « les appellations ne sont pas obligatoires ») : les plots de
// terre du n° 2, du n° 9… Son repère interne sert au contrôle, jamais affiché ; on la reconnaît à sa couleur et à sa place.
function sansRepere(r) { return !!(EX && (EX.bornes_sans_repere || []).includes(r)); }
function nomApp(r) { const a = EX && EX.appareils.find(x => x.repere === r); return a && a.rang > 0 && a.rang < 5 ? a.nom.toLowerCase() : ''; }
function lib(ref) {
  const [r, b] = ref.split(':'), a = EX && EX.appareils.find(x => x.repere === r);
  if (a && a.rang === 5) { const c = coteBornier(ref); return (sansRepere(r) ? 'la borne de terre (vert-jaune)' : 'borne ' + r) + (c ? ' côté ' + c : sansRepere(r) ? '' : ' (' + b + ')'); }
  const n = nomApp(r); return r + (n ? ' (' + n + ')' : '') + ' borne ' + b;
}
/* Le côté d'une borne de bornier, tel qu'on le voit sur la platine (Franck, 29/09 : « un bornier n'a pas de numéro de borne ») :
   côté armoire (en haut, vers les appareils) ou côté terrain (en bas, vers l'arrivée, les moteurs). Les :1 / :2 restent internes. */
function coteBornier(ref) {
  const B = bornes[ref]; if (!B) return '';
  const autre = Object.values(bornes).find(x => x.rep === B.rep && x.ref !== ref);
  return autre ? (B.y < autre.y ? 'armoire' : 'terrain') : '';
}
// Les numéros que le symbole QElectroTech imprime lui-même (« 1 L1 », « U1 »…) : repérés pour ne jamais
// doubler nos étiquettes. Un texte est un numéro imprimé si son premier mot est une borne de l'appareil.
function marquerNumerosImprimes(g, a) {
  const ids = a.bornes.map(b => b.id);
  g.querySelectorAll('text').forEach(t => { if (ids.includes(t.textContent.trim().split(/\s+/)[0])) t.classList.add('imprime'); });
}
function rep(ref) { return ref.split(':')[0]; }
function rangDe(r) { const a = EX && EX.appareils.find(x => x.repere === r); return a ? a.rang : -1; }
function horsPlatine(r) {   // sous la vraie platine (réseau, moteurs, appareils du terrain) : ses fils passent par le bornier
  const a = EX && EX.appareils.find(x => x.repere === r), PL = EX && EX.platine;
  return !!(a && PL && PL.cadre && a.ligne >= (PL.goulottes_h || []).length);
}
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
    t.textContent = sansRepere(a.repere) ? '' : a.repere; g.appendChild(t);
  });
  EX.carte.bornes.forEach(b => {
    const c = doc.createElementNS(NS, 'circle');
    c.setAttribute('cx', b.x); c.setAttribute('cy', b.y); c.setAttribute('r', 4.5); c.setAttribute('class', 'cb');
    c.dataset.ref = b.ref; g.appendChild(c);
    (cartesBornes[b.ref] = cartesBornes[b.ref] || []).push(c);
    const t = doc.createElementNS(NS, 'text');
    if (rangDe(b.ref.split(':')[0]) === 5) return;   // bornier : pas de numéro de borne (29/09), le repère suffit
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

/* Le bornier à trouver (27/09) : la carte de l'élève est le schéma classique ; le plan de raccordement (avec ses ponts)
   se montre sur demande, et chaque fois que l'élève l'ouvre, c'est une aide comptée. */
let planOuvert = false;
function basculerCarte() {
  const tmp = EX.carte; EX.carte = EX.carte_aide; EX.carte_aide = tmp; planOuvert = !planOuvert;
  Object.keys(cartesBornes).forEach(k => delete cartesBornes[k]);
  $('#carte-corps').innerHTML = '';
  construireCarte();
  $('#carte').classList.add('numeros');
  brancherZoom($('#carte'), installerZoom($('#carte-corps svg'), {}));
  const bp = $('#btn-plan'); if (bp) bp.textContent = planOuvert ? 'Schéma' : 'Plan de raccordement';
  $('#carte .entete span').textContent = planOuvert ? 'le plan de raccordement : une aide' : 'le schéma à lire';
  if (planOuvert) compterAide();
  if (MODE === 'guide') { const et = etapeCourante(); if (et && !et.pont) montrerConducteur(et.de, et.a); }
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
  // les boîtes de tous les symboles posés (appareils et parties) : un repère de partie ne se pose pas sur un voisin
  const boites = [];
  EX.appareils.forEach(a => {
    const v = vue(a), px = v.implantation.x, py = v.implantation.y;
    boites.push([px + v.boite[0] * ECH, py + v.boite[1] * ECH, px + v.boite[2] * ECH, py + v.boite[3] * ECH]);
    (v.parties || []).forEach(p => boites.push([p.implantation.x + p.boite[0] * ECH, p.implantation.y + p.boite[1] * ECH,
      p.implantation.x + p.boite[2] * ECH, p.implantation.y + p.boite[3] * ECH]));
  });
  const libre = (x0, y0, x1, y1, soi) => !boites.some(b => b !== soi && b[0] < x1 && x0 < b[2] && b[1] < y1 && y0 < b[3]);
  const boiteDe = (p) => boites.find(b => b[0] === p.implantation.x + p.boite[0] * ECH && b[1] === p.implantation.y + p.boite[1] * ECH);
  EX.appareils.forEach(a => {
    const v = vue(a), px = v.implantation.x, py = v.implantation.y, [bx0, by0, bx1, by1] = v.boite;
    x0 = Math.min(x0, px + bx0 * ECH - 40); y0 = Math.min(y0, py + by0 * ECH - 46);
    x1 = Math.max(x1, px + bx1 * ECH + 40); y1 = Math.max(y1, py + by1 * ECH + 36);
    const hors = PL && PL.cadre && a.ligne >= PL.goulottes_h.length;   // sous la vraie platine : ses fils arrivent par le haut et de côté
    html += '<g class="app' + (v !== a ? ' vignette' : '') + '" data-rep="' + a.repere + '"><g transform="translate(' + px + ',' + py + ') scale(' + ECH + ')">' + v.symbole + '</g>' +
      // les autres symboles du même appareil (bobine, contacts), chacun à sa place, avec le repère de l'appareil
      (v.parties || []).map(p => '<g transform="translate(' + p.implantation.x + ',' + p.implantation.y + ') scale(' + ECH + ')">' + p.symbole + '</g>' +
        (p.implantation.x > px && !libre(p.implantation.x + p.boite[2] * ECH + 6, p.implantation.y - 12,
                                         p.implantation.x + p.boite[2] * ECH + 6 + 9 * a.repere.length, p.implantation.y + 6, boiteDe(p))
          // son repère tomberait sur un voisin : il passe sous la partie, au-dessus des fils
          ? ((dessus += '<text class="repere petit dessus" style="text-anchor:middle" x="' + (p.implantation.x + (p.boite[0] + p.boite[2]) / 2 * ECH) + '" y="' +
              (p.implantation.y + p.boite[3] * ECH + 34) + '">' + a.repere + '</text>'), '<text style="display:none"')
          : p.implantation.x < px && Math.abs(p.implantation.y - py) < 5 &&
         px + bx0 * ECH - (p.implantation.x + p.boite[2] * ECH) < 12   // bobine collée à ses pôles : le repère de l'appareil suffit
          ? '<text class="repere petit" style="display:none"'
          : p.implantation.x < px   // une partie à gauche de l'appareil (la bobine) : son repère à gauche, pas sur les pôles
          ? '<text class="repere petit" style="text-anchor:end" x="' + (p.implantation.x + p.boite[0] * ECH - 6) + '"'
          : '<text class="repere petit" x="' + (p.implantation.x + p.boite[2] * ECH + 6) + '"') +
        ' y="' + (p.implantation.y + (p.boite[1] + p.boite[3]) / 2 * ECH + 5) + '">' + a.repere + '</text>').join('') +
      (a.rang === 0 && /^masse/i.test(a.nom) ? ''   // la masse d'un appareil : le symbole de terre et sa pastille PE suffisent
        : a.rang === 0
        ? '<text class="repere haut" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by0 * ECH - 14) + '">' + a.repere + '</text>'
        : hors && a.rang === 4
        ? '<text class="repere haut" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by1 * ECH + 22) + '">' + a.repere + '</text>'
        : a.rang === 5 && (v !== a || serre(a.repere))   // vraie borne, ou bornier serré : repère sous le numéro du bas, au-dessus des fils (calque des étiquettes), en quinconce
        ? ((dessus += '<text class="repere petit dessus" style="text-anchor:middle" x="' + (px + (bx0 + bx1) / 2 * ECH) + '" y="' + (py + by1 * ECH + 38 + 16 * (quinconce[a.repere] || 0)) + '">' + (sansRepere(a.repere) ? '' : a.repere) + '</text>'), '')
        : a.rang === 5
        ? '<text class="repere petit" style="text-anchor:end" x="' + (px + (bx0 + bx1) / 2 * ECH - 9) + '" y="' + (py + by1 * ECH + 17) + '">' + (sansRepere(a.repere) ? '' : a.repere) + '</text>'
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
    if (rangDe(b.rep) === 5) return;   // une borne de bornier n'a pas de numéro : son repère est écrit dessous (29/09)
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

// 02/10 : la platine peut être tournée d'un quart (installerZoom) : les bornes vivent dans le groupe tourné, on lit SON repère
function ctmPlatine() { return (svgPlatine.querySelector('g.tourne') || svgPlatine).getScreenCTM(); }
function point(e) {
  const p = svgPlatine.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
  return p.matrixTransform(ctmPlatine().inverse());
}
function borneProche(pt) {
  // 30/09 (pavé tactile) : dézoomé, la prise ne descend jamais sous 14 px d'écran ; la borne la plus proche l'emporte toujours
  const m = ctmPlatine(), parPx = m && Math.hypot(m.a, m.b) ? 1 / Math.hypot(m.a, m.b) : 1;
  let meilleure = null, dmin = Math.max(RAYON_PRISE, 14 * parPx);
  Object.values(bornes).forEach(b => { const d = Math.hypot(b.x - pt.x, b.y - pt.y); if (d < dmin) { dmin = d; meilleure = b; } });
  return meilleure;
}
function debutTrace(e) {
  // 29/09 : un doigt qui a glissé sur la consigne y laisse une sélection de texte ; tant qu'elle reste, le glisser suivant
  // ne posait aucun fil. Un appui sur la platine l'efface.
  try { const sel = window.getSelection(); if (sel && !sel.isCollapsed) sel.removeAllRanges(); } catch (err) { /* rien */ }
  if (controle) return;
  if (enAttente) {   // fil par fil : la platine attend que le fil soit posé pour de vrai (le vide se déplace toujours)
    if (!borneProche(point(e)) && !(e.target.closest && e.target.closest('.fil'))) return;
    e.stopImmediatePropagation();   // ni fil, ni déplacement depuis une borne
    const b = $('#bulle-pose'); b.classList.remove('rappel'); void b.offsetWidth; b.classList.add('rappel');
    dire('Posez d’abord ce fil sur votre platine.', 'ko', 'Puis appuyez sur « C’est posé sur la platine ».');
    return;
  }
  fermerChoix();   // un nouveau geste sur la platine referme la bulle « Quelle borne ? »
  const filEl = e.target.closest && e.target.closest('.fil');
  if (filEl) { choisir(fils.find(f => f.el === filEl || f.contour === filEl)); return; }
  const pt = point(e), b = borneProche(pt);
  choisir(null);
  if (!b) { armer(null); return; }
  const cands = candidatsDoigt(e);   // au doigt, deux bornes presque à égale distance : l'élève choisit, rien n'est pris
  if (cands.length > 1) { aimanter(null); proposerChoix(cands, e, (ref) => toucherBorne(ref, e)); return; }
  svgPlatine.setPointerCapture(e.pointerId);
  trace = { de: b, cx: e.clientX, cy: e.clientY, bouge: false };
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
  if (!trace) { if (e.pointerType === 'mouse' && !controle && !enAttente) aimanter(borneProche(pt)); return; }
  if (Math.hypot(e.clientX - trace.cx, e.clientY - trace.cy) > SEUIL_GLISSER) trace.bouge = true;
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
  if (trace.bouge && !(b && b.ref === de.ref)) {
    const cands = b ? candidatsDoigt(e).filter(c => c !== de) : [];
    if (cands.length > 1) proposerChoix(cands, e, (ref) => creerFil(de.ref, ref));   // lâché entre deux bornes, au doigt
    else if (b) creerFil(de.ref, b.ref);
    else if (MODE === 'guide') prochaineEtape();   // fil lâché dans le vide : la consigne de l'étape revient
    else dire('Fil lâché dans le vide : rien n’est posé.', null, 'Touchez une borne, puis l’autre.');
    armer(null);
  } else toucherBorne(de.ref, e);
  trace = null;
}
/* Toucher une borne : la première s'allume, la seconde pose le fil ; la même une seconde fois annule. */
function toucherBorne(ref, e) {
  if (armee && armee !== ref) { creerFil(armee, ref); armer(null); return; }
  armer(armee === ref ? null : ref);
  if (armee) viser(libSens(armee) + ' : touchez l’autre borne (ou celle-ci pour annuler).', e);
}
/* Au doigt (30/09, constat E4) : un doigt couvre plusieurs millimètres. Quand deux bornes sont presque à égale distance du point
   touché (la seconde à moins de 1,3 fois la distance de la première, dans le rayon de prise), une bulle propose les deux, en gros
   boutons nommés ; rien n'est posé ni compté tant que l'élève n'a pas choisi. Jamais d'aimant vers la bonne réponse. Une distance
   sous DOIGT pixels d'écran compte pour DOIGT : sous le doigt, 1 px ou 6 px, c'est la même imprécision. */
const DOIGT = 8;
let choix = null;
function candidatsDoigt(e) {
  if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return [];
  const m = ctmPlatine(), pt = point(e); if (!m) return [];
  const l = Object.values(bornes).filter(b => Math.hypot(b.x - pt.x, b.y - pt.y) < RAYON_PRISE)
    .map(b => ({ b, d: Math.hypot(m.a * b.x + m.c * b.y + m.e - e.clientX, m.b * b.x + m.d * b.y + m.f - e.clientY) }))
    .sort((p, q) => p.d - q.d);
  const seuil = 1.3 * Math.max(l.length ? l[0].d : 0, DOIGT);
  const c = l.filter(x => x.d < seuil).slice(0, 4).map(x => x.b);
  return c.length > 1 ? c : [];
}
function proposerChoix(cands, e, faire) {
  fermerChoix();
  const zone = $('#platine'), r = zone.getBoundingClientRect();
  const d = document.createElement('div'); d.className = 'choix-borne'; d.setAttribute('role', 'dialog');
  const t = document.createElement('p'); t.textContent = cands.length > 2 ? 'Plusieurs bornes sous le doigt : laquelle ?' : 'Deux bornes sous le doigt : laquelle ?';
  d.setAttribute('aria-label', t.textContent); d.append(t);
  cands.forEach(b => {
    const x = document.createElement('button'); x.textContent = rangDe(b.rep) === 5 ? lib(b.ref) : b.rep + ' borne ' + b.id;   // bornier : son repère et son côté
    x.dataset.ref = b.ref;   // 30/09 : l'instruction était tombée dans le commentaire (lot B1)
    // 30/09 (contre-vérification, majeur) : le relâchement du doigt qui a ouvert la bulle ne choisit jamais une borne
    // le clic ne compte que si le doigt s'est POSÉ sur ce bouton après l'ouverture (le relâchement de l'appui qui l'a ouverte, jamais)
    x.addEventListener('pointerdown', () => { x.dataset.pose = '1'; });
    x.onclick = (ev) => { if (!x.dataset.pose && ev.detail !== 0) return; fermerChoix(); if (!controle && !enAttente && !document.body.classList.contains('sous-tension')) faire(b.ref); }; d.append(x);
    b.el.classList.add('candidate');
  });
  zone.append(d);
  // au-dessus du doigt s'il y a la place, sinon dessous : jamais sous le doigt
  const w = d.offsetWidth, h = d.offsetHeight;
  const fx = e.clientX - r.left, fy = e.clientY - r.top;
  let x = fx - w / 2, y = fy - h - 40;
  if (y < 8) y = fy + 40;
  if (y + h > r.height - 8) {   // 30/09 : trop haute pour tenir au-dessus ou au-dessous (4 bornes) : à côté du doigt, jamais dessous
    y = fy - h / 2;
    x = fx - 40 > r.width - fx - 40 ? fx - w - 40 : fx + 40;   // du côté où il y a le plus de place
  }
  d.style.left = Math.max(8, Math.min(r.width - w - 8, x)) + 'px';
  d.style.top = Math.max(8, Math.min(r.height - h - 8, y)) + 'px';
  choix = { el: d, cands };
}
function fermerChoix() {
  if (!choix) return false;
  choix.el.remove(); choix.cands.forEach(b => b.el.classList.remove('candidate')); choix = null;
  return true;
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
/* Un pont entre deux bornes de bornier (nuit du 29/09) : au métier, c'est une barrette ou un fil très court, posé d'une borne à l'autre,
   juste au-dessus des bornes (côté armoire) ou juste au-dessous : jamais un fil qui remonte dans la goulotte. Les deux bornes se
   prennent du même côté ; si deux ponts se recouvrent sur la rangée, le second se pose un cran plus haut (quinconce). Bornes prises
   d'un côté chacune : le fil reste sur le cheminement ordinaire, par les goulottes. */
const PONT_BASE = 18, PONT_PAS = 8;
function estPont(A, B) {
  return A.rep !== B.rep && rangDe(A.rep) === 5 && rangDe(B.rep) === 5 && A.o === B.o && (A.o === 0 || A.o === 2);
}
function cheminPont(A, B, niv, xm = (A.x + B.x) / 2, ya = A.y) {
  if (A.o !== B.o) {   // 30/09 : deux blocs pris de côtés opposés : un cavalier court, il passe dans l'intervalle voisin de B, jamais la goulotte
    const d = PONT_BASE + niv * PONT_PAS, yA = ya + (A.o === 0 ? -d : d), yB = B.y + (B.o === 0 ? -d : d);
    return [[A.x, A.y], [A.x, yA], [xm, yA], [xm, yB], [B.x, yB], [B.x, B.y]];
  }
  const y = A.y + (A.o === 0 ? -1 : 1) * (PONT_BASE + niv * PONT_PAS);
  return [[A.x, A.y], [A.x, y], [B.x, y], [B.x, B.y]];
}
/* Bornier, l'un pris côté armoire, l'autre côté terrain, sur la même rangée, au plus deux blocs entre eux (02/10 : un bloc PE entre deux
   blocs, les terres XAT du n° 9 ; en vue réelle le bloc est haut, l'écart vertical ne dit rien) : rend l'abscisse du passage et la hauteur
   à franchir côté A (un bloc PE enjambé est plus haut que les autres), sinon null. */
function cavalier(A, B) {
  if (A.rep === B.rep || rangDe(A.rep) !== 5 || rangDe(B.rep) !== 5 || A.o === B.o || !(A.o === 0 || A.o === 2) || !(B.o === 0 || B.o === 2)
    || A.ligne !== B.ligne || Math.abs(A.y - B.y) > 120) return null;
  const a = Math.min(A.x, B.x), b = Math.max(A.x, B.x), entre = {}, haut = A.o === 0 ? Math.min : Math.max;
  let ya = A.y;
  Object.values(bornes).forEach(t => {
    if (t.rep === A.rep || t.rep === B.rep || rangDe(t.rep) !== 5 || t.ligne !== A.ligne || t.x <= a || t.x >= b) return;
    entre[t.rep] = t.x; if (t.o === A.o) ya = haut(ya, t.y);
  });
  const xs = Object.values(entre); if (xs.length > 2) return null;
  const voisin = xs.length ? xs.reduce((m, x) => Math.abs(x - B.x) < Math.abs(m - B.x) ? x : m) : A.x;
  return { xm: (voisin + B.x) / 2, ya };
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
  const occH = PL.goulottes_h.map(() => []), occV = PL.goulottes_v.map(() => []), occP = { 0: [], 2: [] };
  const libre = (goulotte, a, b) => {
    for (let i = 0; ; i++) {
      const c = goulotte[i] || (goulotte[i] = []);
      if (c.every(([u, v]) => b < u - 4 || a > v + 4)) { c.push([a, b]); return i; }
    }
  };
  fils.forEach(f => {
    const A = bornes[f.de], B = bornes[f.a];
    if (estPont(A, B)) { f.route = { pont: true, niv: libre(occP[A.o], Math.min(A.x, B.x), Math.max(A.x, B.x)) }; return; }
    const cav = cavalier(A, B);
    if (cav) { const a = Math.min(A.x, B.x), b = Math.max(A.x, B.x); f.route = { pont: true, xm: cav.xm, ya: cav.ya, niv: Math.max(libre(occP[0], a, b), libre(occP[2], a, b)) }; return; }
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
  if (r.pont) return cheminPont(A, B, r.niv, r.xm, r.ya);
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
  if (EX.libre) {   // le bornier à trouver : un appareil du terrain se raccorde au bornier, jamais à un autre appareil
    const direct = [de, a].some(x => horsPlatine(rep(x)) && rangDe(rep(x)) !== 5) && ![de, a].some(x => rangDe(rep(x)) === 5);
    if (direct) { if (MODE === 'guide') refus++; dire('Non : un appareil du terrain se raccorde au bornier, jamais en direct.', 'ko', 'Passez par une borne du bornier.'); return; }
  }
  if (MODE === 'guide') {
    const et = etapeCourante();
    if (!et) return;
    let bon;
    if (et.pont) {   // un pont : accepté s'il reste dans le réseau attendu (les deux bouts, par le bornier), refusé sinon
      const rd = reseauDe(de), ra = reseauDe(a), rt = reseauDe(et.de);
      bon = !!rd && rd === ra && rd === rt && [de, a].some(x => rangDe(rep(x)) === 5);
      if (!bon) { refus++; dire('Non : ce fil ne fait pas le pont attendu.', 'ko', 'Les deux bornes qui clignotent doivent se retrouver reliées, par le bornier. Suivez leurs fils.'); return; }
    } else bon = (de === et.de && a === et.a) || (de === et.a && a === et.de);
    if (!bon) { refus++; dire('Non : ce fil ne correspond pas au conducteur qui clignote sur la carte.', 'ko', 'Relisez les numéros de ses deux bornes sur le schéma. Le bouton Aide peut vous mettre sur la voie.'); return; }
    if (!et.couleurs.includes(couleur)) { dire('Bonne liaison, mais la couleur doit être ' + et.couleurs.slice(0, 2).join(' ou ') + '.', 'ko'); return; }
  }
  const f = { de, a, couleur, idx: fils.length };
  fils.push(f);
  if (FIL_PAR_FIL) enAttente = f;
  redessinerFils();
  rafraichir();
  memoriser();
  if (FIL_PAR_FIL) { niveauAide = 0; attendrePose(f); return; }   // en Guidé, le fil suivant vient après « C'est posé »
  if (MODE === 'guide') prochaineEtape();   // etapeCourante() saute ce qui est déjà relié : un pont peut demander plusieurs fils
  else { niveauAide = 0; dire(libSens(de) + ' → ' + libSens(a) + ' en ' + couleur + '.', null, MODE === 'aide' ? 'Continuez, ou demandez de l’aide.' : 'Continuez, puis contrôlez.'); }
}
/* Fil par fil (29/09) : chaque fil accepté à l'écran se pose aussitôt sur la vraie platine, hors tension. Une bulle le redit en
   toutes lettres ; tant que l'élève n'a pas appuyé sur « C'est posé sur la platine », la platine de l'écran ne prend aucun geste. */
function attendrePose(f) {
  const n = fils.indexOf(f) + 1;
  // 30/09 (constat R3) : en Guidé le fil vient d'être vérifié (la coche) ; en Aidé et en Avancé, rien n'est encore vérifié
  const verifie = MODE === 'guide';
  $('#bulle-ok').textContent = verifie ? '✓ Fil posé à l’écran :' : 'Votre fil à l’écran, pas encore vérifié :';
  $('#bulle-ok').className = verifie ? 'ok' : 'libre';
  $('#bulle-pose').classList.toggle('non-verifie', !verifie);   // ni coche ni cadre vert : rien n'est encore vérifié
  $('#bulle-fil').textContent = lib(f.de) + ' → ' + lib(f.a) + ', en ' + f.couleur + '.';
  $('#btn-pose').textContent = verifie ? 'C’est posé sur la platine ✓' : 'C’est posé sur la platine';
  $('#bulle-pose').hidden = false; majAttente();
  surbrillance([]); montrerConducteur(null);
  if (verifie) dire('Fil ' + n + ' posé à l’écran : posez-le sur votre platine.', 'ok', 'Hors tension. Puis appuyez sur « C’est posé sur la platine ».');
  else dire('Fil ' + n + ' tracé à l’écran : posez-le sur votre platine.', null, 'Hors tension. Il sera vérifié au contrôle. Puis appuyez sur « C’est posé sur la platine ».');
  const b = $('#btn-pose'); if (b) b.focus({ preventScroll: true });
}
/* 30/09 (constat R2) : tant qu'une pose sur la platine attend, Contrôler et Essayer sont inactifs, et leur infobulle le dit. */
const ATTENTE_TITRE = 'Posez d’abord le fil sur votre platine, puis appuyez sur « C’est posé sur la platine ».';
function majAttente() {
  const bc = $('#btn-controler'), bt = $('#btn-tension');
  if (bc) { if (enAttente) { bc.setAttribute('aria-disabled', 'true'); bc.title = ATTENTE_TITRE; } else if (bc.title === ATTENTE_TITRE) { bc.removeAttribute('aria-disabled'); bc.title = ''; } }
  if (bt && ACTIVITE === 'cabler' && bt.dataset.actif) {   // l'étape 4, quand la mise sous tension l'a activée
    if (enAttente) { bt.setAttribute('aria-disabled', 'true'); bt.title = ATTENTE_TITRE; }
    else if (bt.title === ATTENTE_TITRE) { bt.removeAttribute('aria-disabled'); bt.title = bt.dataset.actif; }
  }
}
function posePlatine() {
  const f = enAttente; if (!f) return;
  f.pose = true; enAttente = null;
  $('#bulle-pose').hidden = true; $('#bulle-pose').classList.remove('rappel'); majAttente();
  redessinerFils(); rafraichir(); memoriser();
  if (MODE === 'guide') prochaineEtape();
  else dire('Fil posé sur la platine.', null, MODE === 'aide' ? 'Le suivant : à l’écran, puis sur la platine. L’aide reste là si besoin.' : 'Le suivant : à l’écran, puis sur la platine. Contrôlez à la fin.');
}
/* Les fils posés à l'écran, gardés sur l'appareil à chaque changement : l'étape 5 Réaliser en fait l'ordre de câblage. */
// Appelée seulement sur un geste de l'élève (un fil posé, supprimé, recoloré, posé sur la platine) : jamais au chargement.
// 30/09 (constats X3, X2) : elle sert aussi à retrouver ses fils en revenant à Câbler ; le fil par fil y garde « posé ».
// Les aides et les refus suivent les fils : un câblage repris ne repart pas à « 0 aide ».
function memoriser() {
  if (ACTIVITE !== 'cabler' || VUE === 'carte' || !ID || TUTO) return;
  const m = { date: new Date().toISOString(), mode: MODE, reelle: vueReelle(), materiel: EX && EX.reels ? MATERIEL : '', aides, refus,
    fils: fils.map(f => Object.assign({ de: f.de, a: f.a, couleur: f.couleur }, FIL_PAR_FIL ? { pose: !!f.pose } : {})) };
  try { localStorage.setItem(CLE_FILS, JSON.stringify(m)); STOCKAGE_BLOQUE = false; }
  catch (err) { STOCKAGE_BLOQUE = true; try { window.name = CLE_FILS + '=' + JSON.stringify(m); } catch (e) { /* rien */ } }
}
function oublier() {   // Recommencer : la mémoire des fils est effacée (plus rien à reprendre ni à réaliser)
  try { localStorage.removeItem(CLE_FILS); } catch (err) { /* stockage indisponible */ }
  if ((window.name || '').startsWith(CLE_FILS + '=')) window.name = '';
}
/* Revenir à Câbler (30/09, constats X3 et X2) : les fils gardés reviennent si la mémoire a le même mode, la même vue et le même
   matériel, jamais dans le tutoriel ; un fil que cette vue ne connaît pas est ignoré. Renvoie le nombre de fils revenus. */
function reprendre() {
  const m = MEMOIRE;
  if (TUTO || !m || !m.fils.length || m.mode !== MODE || !!m.reelle !== vueReelle() || (m.materiel || '') !== (EX.reels ? MATERIEL : '')) return 0;
  m.fils.forEach(x => {
    if (!bornes[x.de] || !bornes[x.a] || x.de === x.a || fils.some(f => cle(f.de, f.a) === cle(x.de, x.a))) return;
    fils.push({ de: x.de, a: x.a, couleur: COULEURS[x.couleur] ? x.couleur : 'noir', idx: fils.length, pose: FIL_PAR_FIL ? x.pose : undefined });
  });
  if (!fils.length) return 0;
  aides = Math.max(0, +m.aides || 0); refus = Math.max(0, +m.refus || 0); compterAide(aides);
  // le dernier contrôle, s'il a eu lieu après le dernier geste : en Avancé, l'essai reste permis sans recontrôler
  try {
    const l = JSON.parse(localStorage.getItem('cablage-virtuel:resultats') || '[]');
    const c = (Array.isArray(l) ? l : []).filter(e => e && e.exercice === ID && e.activite === 'cabler' && !e.tuto && e.mode === MODE && e.date >= m.date).pop();
    if (c && c.fils === fils.length) filsControles = signatureFils();
  } catch (err) { /* rien */ }
  redessinerFils(); rafraichir();
  return fils.length;
}
function dessinerFil(f) {
  const d = traceArrondi(pointsFil(f));
  const contour = document.createElementNS(NS, 'path'); contour.setAttribute('class', 'fil contour'); contour.setAttribute('d', d);
  const p = document.createElementNS(NS, 'path'); p.setAttribute('class', 'fil ' + f.couleur + (f === choisi ? ' choisi' : '') + (f.faux ? ' faux' : '') + (f === enAttente ? ' recent' : '')); p.setAttribute('d', d);
  p.setAttribute('stroke', COULEURS[f.couleur]);
  p.setAttribute('role', 'button'); p.setAttribute('aria-label', 'fil ' + lib(f.de) + ' vers ' + lib(f.a));
  gFils.appendChild(contour); gFils.appendChild(p);
  f.el = p; f.contour = contour;
}
function choisir(f) {
  choisi = f || null;
  fils.forEach(x => x.el.classList.toggle('choisi', x === choisi));
  $('#btn-supprimer').hidden = !choisi;   // 29/09 : « Supprimer le fil » n'apparaît que sur un fil choisi
  if (choisi) dire('Fil ' + lib(choisi.de) + ' → ' + lib(choisi.a) + ' sélectionné.', null, 'Bouton « Supprimer le fil » pour l’enlever.');
}
function supprimer() {
  if (!choisi) return;
  const retire = choisi;
  fils = fils.filter(f => f !== choisi);
  choisi = null;
  redessinerFils();
  choisir(null); rafraichir(); memoriser();
  // 30/09 (constats E1, X5) : en Guidé, l'étape repart du premier conducteur non relié : le fil supprimé se repose
  if (MODE === 'guide') { etapeIdx = 0; prochaineEtape(); }
  if (FIL_PAR_FIL && retire.pose) dire('Fil retiré de l’écran : retirez-le aussi de votre platine.', 'ko', lib(retire.de) + ' → ' + lib(retire.a) + '.');
}
function rafraichir() {
  const occupees = new Set(); fils.forEach(f => { occupees.add(f.de); occupees.add(f.a); });
  Object.values(bornes).forEach(b => b.el.classList.toggle('occupee', occupees.has(b.ref)));
  $('#compteur-fils').textContent = FIL_PAR_FIL ? 'Écran ' + fils.length + ' · Platine ' + fils.filter(f => f.pose).length
    : fils.length + (fils.length > 1 ? ' fils' : ' fil');
}
function recommencer() {
  // 30/09 (constats X1, R1) : sous tension, on consigne d'abord (le pupitre sort, la simulation s'arrête) ; puis on vide
  const T = window.CABLAGE_TENSION_ECRAN; if (T && T.enCours && T.enCours()) T.consigner();
  fils = []; gFils.innerHTML = ''; etapeIdx = 0; aides = 0; refus = 0; niveauAide = 0; cibleAide = null; controle = false; debut = Date.now(); compterAide(0);
  enAttente = null; filsControles = null; $('#bulle-pose').hidden = true; majAttente();
  gManques.innerHTML = ''; choisir(null); armer(null); fermerChoix(); rafraichir(); oublier(); $('#voile').classList.remove('ouvert');
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
/* Le Guidé suit le fil (Franck, 29/09 : « certaines bornes ne sont pas visibles, on ne peut pas faire les exercices ; les
   bandes d'alimentation sont souvent en dehors du champ ») : si l'une des deux bornes du fil est hors de la vue, ou trop
   petite pour être lue, la platine se recadre sur une LARGE bande qui les contient toutes les deux, à une échelle lisible.
   La bande est assez large pour ne rien désigner : l'élève lit toujours les numéros lui-même (règle n° 1). */
function suivreFil(de, a) {
  const p = $('#platine'), z = p && p._zoom, svg = svgPlatine, b1 = bornes[de], b2 = bornes[a];
  if (TUTO || !z || !z.cadrer || !svg || !b1 || !b2) return;   // le tutoriel : une petite platine, ses bulles visent la vue entière
  const corps = p.querySelector('.corps'), cw = corps && corps.clientWidth, ch = corps && corps.clientHeight;
  if (!cw || !ch) return;
  const [vx, vy, vw, vh] = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
  const LISIBLE = 0.7;   // une borne de 9 d'unité de rayon fait alors 13 px de diamètre à l'écran
  const k = Math.min(cw / vw, ch / vh), m = 2 * RAYON_BORNE;
  // 02/10 : platine tournée d'un quart, on raisonne dans le repère de la vue (celui du viewBox)
  const V = (r) => z.versVue ? z.versVue(r) : r, P = (b) => V({ x: b.x, y: b.y, w: 0, h: 0 }), q1 = P(b1), q2 = P(b2);
  const vue = b => b.x >= vx + m && b.x <= vx + vw - m && b.y >= vy + m && b.y <= vy + vh - m;
  if (vue(q1) && vue(q2) && k >= LISIBLE - 0.05) return;
  const x1 = Math.min(q1.x, q2.x) - 60, x2 = Math.max(q1.x, q2.x) + 60, y1 = Math.min(q1.y, q2.y) - 60, y2 = Math.max(q1.y, q2.y) + 60;
  let w = Math.max(x2 - x1, cw / LISIBLE), h = Math.max(y2 - y1, ch / LISIBLE);
  if (w / h < cw / ch) w = h * cw / ch; else h = w * ch / cw;
  // la bande reste sur la platine : on la glisse à l'intérieur de l'étendue des bornes plutôt que de montrer du vide
  const tout = Object.values(bornes).map(P), cadre = svg.querySelector('.fond-platine.cadre') || svg.querySelector('.fond-platine'),
        bb = cadre && cadre.getBBox(), c = bb ? V({ x: bb.x, y: bb.y, w: bb.width, h: bb.height }) : { x: tout[0].x, y: tout[0].y, w: 0, h: 0 };
  const ex1 = Math.min(c.x, ...tout.map(b => b.x - 60)), ex2 = Math.max(c.x + c.w, ...tout.map(b => b.x + 60)),
        ey1 = Math.min(c.y, ...tout.map(b => b.y - 60)), ey2 = Math.max(c.y + c.h, ...tout.map(b => b.y + 60));
  const caler = (c, t, e1, e2) => (t >= e2 - e1 ? (e1 + e2) / 2 - t / 2 : Math.min(Math.max(c - t / 2, e1), e2 - t));
  z.cadrer({ x: caler((x1 + x2) / 2, w, ex1, ex2), y: caler((y1 + y2) / 2, h, ey1, ey2), w, h, vue: true }, 0, cw / ch);
}
function compterAide(n) {
  if (n === undefined) aides++; else aides = n;
  const b = $('#btn-aide'); if (b) b.textContent = aides ? 'Aide (' + aides + ')' : 'Aide';
}

// ------------------------------------------------------------ les modes
function etapes() {
  return EX.etapes.map(e => ({ de: e.de, a: e.a, pont: !!e.pont, couleurs: (reseauDe(e.de) || { couleurs: [e.couleur] }).couleurs }));
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
function prochaineEtape(sansControle) {
  const et = etapeCourante();
  if (!et && sansControle) {   // un câblage complet qui revient (retour à Câbler) : déjà contrôlé ; l'élève choisit la suite
    surbrillance([]); montrerConducteur(null); dire('Tout est câblé.', 'ok', 'Contrôlez, ou passez à l’étape 4 Essayer.'); return;
  }
  if (!et) { surbrillance([]); montrerConducteur(null); dire('Tout est câblé. Contrôle en cours…', 'ok'); setTimeout(controler, 600); return; }
  choisirCouleur(et.couleurs[0]);
  suivreFil(et.de, et.a);
  const fixes = new Set(liaisonsFixes().map(([a, b]) => cle(a, b))), aPoser = EX.etapes.filter(e => !fixes.has(cle(e.de, e.a)));
  const n = EX.etapes.slice(0, etapeIdx).filter(e => !fixes.has(cle(e.de, e.a))).length + 1, total = aPoser.length;
  if (et.pont) {   // le bornier à trouver (27/09) : deux bornes d'appareils à relier PAR le bornier, sans donner ses numéros
    montrerConducteur(null);
    surbrillance([et.de, et.a], [rep(et.de), rep(et.a)]);
    dire('Pont ' + n + '/' + total + ' : ' + lib(et.de) + ' et ' + lib(et.a) + ' doivent être reliées par le bornier.', null,
         'Suivez le fil de chacune jusqu’au bornier, puis pontez ces deux bornes du bornier, en ' + et.couleurs[0] + '. Jamais en direct.');
    return;
  }
  if (montrerConducteur(et.de, et.a)) {
    surbrillance([]);
    dire('Fil ' + n + '/' + total + ' : posez le conducteur qui clignote sur la carte, en ' + et.couleurs[0] + '.', null,
         'Lisez les numéros de ses deux bornes sur le schéma, puis trouvez-les sur la platine. Le courant ressort par la borne paire et entre dans l’appareil suivant par l’impaire.');
  } else {   // conducteur introuvable sur la carte : l'ancien guidage, bornes nommées
    surbrillance([et.de, et.a], [rep(et.de), rep(et.a)]);
    dire('Fil ' + n + '/' + total + ' : de ' + libSens(et.de) + ' à ' + libSens(et.a) + ', en ' + et.couleurs[0] + '.', null, 'Touchez une borne, puis l’autre.');
  }
}
/* L'aide en trois crans, chacun compté (« plus ils demandent d'aide, plus ils perdent de points » — la
   règle de points est écrite dans le TP) : 1 les deux appareils, 2 les numéros, 3 les bornes qui clignotent. */
function aider() {
  const et = prochaineEtapeNonFaite();
  if (!et) { dire('Tout est relié : contrôlez.', 'ok'); return; }
  const k = cle(et.de, et.a);
  // 30/09 (constat P9) : l'aide 3 est la dernière ; un appui de plus la remontre sans la compter (il n'apporte rien)
  const deja = cibleAide === k && niveauAide >= 3;
  if (!deja) compterAide();
  niveauAide = (cibleAide === k) ? Math.min(3, niveauAide + 1) : 1;
  cibleAide = k;
  montrerConducteur(et.de, et.a);
  if (niveauAide === 1) { surbrillance([], [rep(et.de), rep(et.a)]); dire('Aide 1 : ce conducteur relie ' + rep(et.de) + ' et ' + rep(et.a) + '.', null, 'Ils sont éclairés sur la platine. Quels numéros de bornes ? Appuyez encore pour plus d’aide.'); }
  else if (niveauAide === 2) { surbrillance([], [rep(et.de), rep(et.a)]); dire('Aide 2 : de ' + libSens(et.de) + ' à ' + libSens(et.a) + '.', null, 'Trouvez ces deux bornes sur la platine. Appuyez encore pour les voir clignoter.'); }
  else { choisirCouleur(et.couleurs[0]); surbrillance([et.de, et.a], [rep(et.de), rep(et.a)]); dire('Aide 3 : ' + lib(et.de) + ' → ' + lib(et.a) + ' en ' + et.couleurs[0] + '.', null, 'Les deux bornes clignotent et la couleur est choisie. Touchez une borne, puis l’autre.' + (deja ? ' (Aide déjà donnée : pas comptée de nouveau.)' : '')); }
}
function demarrerMode(revenus) {
  $('#btn-aide').style.display = MODE === 'reel' ? 'none' : '';
  if (MODE === 'guide') { etapeIdx = 0; prochaineEtape(!!revenus); }   // l'étape repart du premier conducteur non relié
  else if (MODE === 'aide') dire('Lisez la carte et posez les fils. Le bouton Aide vous guide si besoin.', null, 'Chaque aide compte dans le résultat.');
  else dire('Lisez la carte et câblez la platine. Contrôlez quand vous avez fini.', null, 'Mode avancé : pas d’aide, contrôle à la fin.');
}

/* Les fils revenus : une ligne de plus sous la consigne, jusqu'au prochain message. */
function annoncerRevenus(n) {
  const s = document.createElement('small'); s.className = 'revenus';
  s.textContent = (n > 1 ? 'Vos ' + n + ' fils sont revenus.' : 'Votre fil est revenu.') + ' Plus › Recommencer pour repartir de zéro.';
  $('#consigne-texte').append(s);
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
  if (enAttente) { dire('Posez d’abord ce fil sur votre platine.', 'ko', 'Puis appuyez sur « C’est posé sur la platine » : le contrôle viendra après.'); return; }
  const r = analyser();
  controle = true; armer(null); choisir(null); surbrillance([]); fermerChoix();
  filsControles = signatureFils();
  const secondes = Math.round((Date.now() - debut) / 1000);
  // 30/09 (constat P8) : des fils posés, aucun réseau juste : « Aucun réseau juste », pas « Rien n'est câblé »
  const libNiveau = [fils.length ? 'Aucun réseau juste' : 'Rien n’est câblé', 'Début de câblage', 'Câblage à moitié', 'Câblage juste, couleurs à revoir', 'Câblage juste'][r.niveau];
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
  // 29/09 : au niveau 4, l'étape suivante est proposée — l'essai (4) s'il existe, la réalisation (5) si l'atelier la prévoit
  const essayer = r.niveau === 4 && !!window.CABLAGE_TENSION_ECRAN, realiser = r.niveau === 4 && ATELIER !== 'ecran';
  html += '<div class="boutons">' +
    (r.manques.length ? '<button id="btn-manques">Montrer ce qui manque</button>' : '') +
    '<button id="btn-continuer">' + (r.niveau === 4 ? 'Revoir la platine' : 'Corriger') + '</button>' +
    '<button' + (essayer || realiser ? '' : ' class="principal"') + ' id="btn-refaire">Recommencer</button>' +
    (essayer ? '<button class="principal" id="btn-essayer">Essayer (étape 4) →</button>' : '') +
    (realiser ? '<button' + (essayer ? '' : ' class="principal"') + ' id="btn-realiser">Réaliser (étape 5) →</button>' : '') + '</div>';
  const boite = $('#resultat'); boite.innerHTML = html;
  boite.querySelectorAll('li').forEach((li, i) => { li.textContent = lignes[i]; });
  $('#voile').classList.add('ouvert');
  dire(libNiveau + ' : ' + r.justes + ' réseau' + (r.justes > 1 ? 'x' : '') + ' juste' + (r.justes > 1 ? 's' : '') + ' sur ' + r.total + '.', r.niveau >= 3 ? 'ok' : 'ko');
  const fermer = () => { $('#voile').classList.remove('ouvert'); controle = false; };
  $('#btn-continuer').onclick = fermer;
  $('#btn-refaire').onclick = recommencer;
  const bm = $('#btn-manques');
  if (bm) bm.onclick = () => { montrerManques(r.manques); fermer(); };
  const be = $('#btn-essayer'); if (be) be.onclick = () => { fermer(); window.CABLAGE_TENSION_ECRAN.entrer(); };
  const br = $('#btn-realiser'); if (br) br.onclick = () => aller('realiser', MODE);
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
    const entree = { date: new Date().toISOString(), exercice: ID, activite: ACTIVITE, mode: MODE, niveau: r.niveau, justes: r.justes, total: r.total,
                     enTrop: r.enTrop, couleursFausses: r.couleursFausses, aides, refus, fils: fils.length, secondes };
    if (FIL_PAR_FIL) entree.platine = fils.filter(f => f.pose).length;   // fil par fil : les fils posés sur la vraie platine
    if (P.get('tuto') !== null) entree.tuto = true;   // l'accueil range le tutoriel au Départ, pas à l'Allumage simple (même exercice)
    liste.push(entree);
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
    b.onclick = () => { choisirCouleur(c); if (choisi) { choisi.couleur = c; choisi.el.setAttribute('stroke', COULEURS[c]); choisi.el.setAttribute('class', 'fil ' + c + ' choisi'); memoriser(); } };
    zone.appendChild(b);
  });
  choisirCouleur(couleur);
  $('#btn-aide').onclick = aider;
  $('#btn-supprimer').onclick = supprimer;
  $('#btn-recommencer').onclick = recommencer;
  $('#btn-controler').onclick = controler;
  $('#btn-pose').onclick = posePlatine;
  $('#btn-numeros').onclick = () => $('#carte').classList.toggle('numeros');
  $('#btn-detacher').onclick = () => window.open('jouer.html?ex=' + encodeURIComponent(ID) + '&vue=carte', 'carte-' + ID);
  const bp = $('#btn-plan');   // le plan de raccordement (les ponts du bornier) : une aide, comptée ; pas en Réel
  if (bp) { bp.hidden = !(EX.carte_aide && MODE !== 'reel'); bp.onclick = basculerCarte; }
  brancherNavigation();
}
function aller(activite, mode, reelle) {
  location.search = '?ex=' + encodeURIComponent(ID) + '&activite=' + activite + '&mode=' + mode + ((reelle === undefined ? REELLE_ADRESSE : reelle) ? '&platine=reelle' : '') +
    '&atelier=' + ATELIER +
    (TUTO ? '&tuto' : '') +   // le tutoriel (moteur/tutoriel.js) suit l'élève d'une activité à l'autre
    (P.get('voix') !== null ? '&voix' : '') +   // la voix du professeur aussi (moteur/voix.js, maquette V1)
    (EX && EX.reels ? '&materiel=' + MATERIEL : '');
}

/* ------------------------------------------------------------ la barre du haut (29/09, maquette validée, écran 3)
   ‹ station · titre · 1 Colorier · 2 Repérer · 3 Câbler · 4 Essayer · 5 Réaliser · pastille du mode · Affichage · Plus.
   Les étapes se touchent, rien n'est bloqué ; une coche dit l'étape réussie sur cet appareil (niveau 3 ou 4). */
const NOMS_MODES = { guide: 'Guidé', aide: 'Aidé', reel: 'Avancé' };
const NUM_ETAPE = { colorier: 1, reperer: 2, cabler: 3, essayer: 4, realiser: 5 };
// 30/09 (constat X6) : « ‹ » ramène à la station ET à son quai : index.html#<exercice> (l'accueil sait l'ouvrir) ; le tutoriel : #depart
function lienStation() { return TUTO ? 'index.html#depart' : STATION ? 'index.html#' + encodeURIComponent(ID) : 'index.html'; }
function lienReglages() {   // la fiche de la station avec les réglages en cours (l'adresse des QR de l'espace professeur)
  if (!STATION || STATION === 'depart') return lienStation();
  return 'index.html?station=' + STATION + '&quai=' + SD.quai + '&mode=' + MODE + '&atelier=' + ATELIER + (REELLE_ADRESSE ? '&platine=reelle' : '');
}
function etapesReussies() {
  let liste = [];
  try { liste = JSON.parse(localStorage.getItem('cablage-virtuel:resultats') || '[]'); } catch (err) { liste = []; }
  // 30/09 (constat E12) : les résultats de même nature — le tutoriel (tuto: true) avec &tuto, les autres sans
  const miennes = (Array.isArray(liste) ? liste : []).filter(e => e && e.exercice === ID && !!e.tuto === TUTO);
  const niveau = (a) => miennes.some(e => e.activite === a && e.niveau >= 3);
  return { colorier: niveau('colorier'), reperer: niveau('reperer'), cabler: niveau('cabler'),
           essayer: miennes.some(e => e.activite === 'essai' && Array.isArray(e.defauts) && !e.defauts.length && Array.isArray(e.marche) && e.marche.length > 0),
           realiser: miennes.some(e => e.activite === 'realiser') };
}
function fermerMenus() {
  document.querySelectorAll('.barre .deroule').forEach(d => {
    const m = d.querySelector('.menu-barre'), b = d.querySelector('[aria-haspopup]');
    if (m) m.hidden = true; if (b) b.setAttribute('aria-expanded', 'false');
  });
}
// La feuille élève qui va avec la page (contrat de moteur/documents.js, 30/09) : celle du tutoriel (tuto/nomTuto) avec &tuto ;
// sinon « fil par fil » (fil/nomFil) si l'atelier l'est et qu'elle existe ; sinon « en deux temps » (eleve/nom).
function majFeuille() {
  const bf = $('#btn-feuille'); if (!bf) return;
  const d = (window.CABLAGE_DOCUMENTS || {})[ID];
  if (!d) { bf.hidden = true; return; }
  const [href, nomDoc] = TUTO && d.tuto ? [d.tuto, d.nomTuto || d.nom] : !TUTO && ATELIER === 'fil' && d.fil ? [d.fil, d.nomFil || d.nom] : [d.eleve, d.nom];
  if (!href) { bf.hidden = true; return; }
  bf.href = href;
  bf.innerHTML = '<b>Feuille élève</b><small></small>';
  const nom = (nomDoc || '').replace(/^Feuille élève\s*:\s*/i, '');   // « Feuille élève » n'est pas dit deux fois
  bf.querySelector('small').textContent = nom.charAt(0).toUpperCase() + nom.slice(1);
  bf.title = 'S’ouvre dans un nouvel onglet, pour imprimer';
  bf.hidden = false;
}
function construireBarre() {
  const retour = $('.barre .retour');
  if (retour) { retour.href = lienStation(); retour.title = TUTO ? 'Retour à la prise en main' : STATION ? 'Retour à la station' : 'Retour au réseau'; retour.setAttribute('aria-label', retour.title); }
  const faites = etapesReussies();
  document.querySelectorAll('#activites .etape').forEach(b => {
    const quoi = b.dataset.activite || b.dataset.etape, num = NUM_ETAPE[quoi];
    if (quoi === 'realiser') b.hidden = ATELIER === 'ecran';
    // 30/09 (constat X10) : une étape réussie garde son numéro, la coche vient à côté (moteur/cablage.css) ; nom accessible complet
    b.classList.toggle('faite', !!faites[quoi]);
    b.querySelector('i').textContent = num;
    b.setAttribute('aria-label', 'Étape ' + num + ' : ' + b.querySelector('.nom').textContent + (faites[quoi] ? ', réussie' : ''));
    if (quoi === ACTIVITE) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    if (!b.dataset.activite) return;   // l'étape 4 : moteur/tension-ecran.js l'active en Câbler
    b.title = 'Étape ' + num + ' : ' + b.querySelector('.nom').textContent.toLowerCase() + (faites[quoi] ? ' (réussie)' : '');
    b.onclick = () => { if (quoi !== ACTIVITE) aller(quoi, MODE); };
  });
  const bt = $('#btn-tension');
  if (bt) bt.onclick = () => { if (bt.getAttribute('aria-disabled') === 'true') dire('Câblez d’abord : étape 3.', null, 'L’essai sous tension se fait sur votre câblage de l’écran.'); };
  // la pastille du mode : un appui ouvre les trois modes
  const bm = $('#btn-mode');
  if (bm) { bm.textContent = NOMS_MODES[MODE]; bm.title = 'Le mode : ' + NOMS_MODES[MODE] + '. Appuyez pour en changer.'; }
  document.querySelectorAll('#panneau-modes [data-mode]').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.mode === MODE));
    b.onclick = () => { if (b.dataset.mode !== MODE) aller(ACTIVITE === 'realiser' ? 'cabler' : ACTIVITE, b.dataset.mode); };
  });
  // « Plus » : recommencer, la feuille, la station, les réglages (Réaliser : rien à recommencer à l'écran)
  const br = $('#btn-recommencer'); if (br && ACTIVITE === 'realiser') br.hidden = true;
  const ls = $('#lien-station'); if (ls) { ls.href = lienStation(); if (!STATION) ls.textContent = 'Revenir au réseau'; }
  const lr = $('#lien-reglages'); if (lr) lr.href = lienReglages();
  majFeuille();
  // les panneaux de la barre : un seul ouvert, fermés au clic dehors et à Échap
  document.querySelectorAll('.barre .deroule').forEach(d => {
    const b = d.querySelector('[aria-haspopup]'), m = d.querySelector('.menu-barre');
    if (!b || !m) return;
    b.onclick = () => { const ouvrir = m.hidden; fermerMenus(); if (!ouvrir) return; if (d.id === 'plus') majFeuille(); m.hidden = false; b.setAttribute('aria-expanded', 'true'); };
    m.addEventListener('click', e => { if (e.target.closest('button, a')) fermerMenus(); });
  });
  document.addEventListener('pointerdown', e => { if (!(e.target.closest && e.target.closest('.barre .deroule'))) fermerMenus(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const ouvert = [...document.querySelectorAll('.barre .deroule')].find(d => { const m = d.querySelector('.menu-barre'); return m && !m.hidden; });
    if (ouvert) { fermerMenus(); ouvert.querySelector('[aria-haspopup]').focus(); return; }
    // 30/09 (constat R4) : Échap ferme aussi la boîte de résultat (comme « Corriger » / « Revoir »), le choix de borne, l'avis du téléphone
    if (fermerChoix()) return;
    const bc = $('#voile.ouvert #btn-continuer'); if (bc) { bc.click(); return; }
    if ($('#petit-ecran.ouvert')) $('#petit-ecran').classList.remove('ouvert');
  });
}
function brancherNavigation() {
  const vr = $('#btn-vue-reelle');   // symboles <-> vrais appareils ; la page repart de zéro, comme pour un changement de mode
  if (vr && ACTIVITE === 'realiser') vr.hidden = true;   // Réaliser : toujours les vrais appareils quand l'exercice en a
  else if (vr) {
    vr.hidden = !EX.reel;
    vr.textContent = vueReelle() ? 'Symboles' : 'Vue réelle';
    vr.title = vueReelle() ? 'Revenir aux symboles du schéma sur la platine' : 'Voir les vrais appareils sur la platine (la carte reste en symboles)';
    vr.onclick = () => aller(ACTIVITE, MODE, !vueReelle());
  }
  const mats = EX.reels ? Object.keys(EX.reels) : [];   // le matériel, à côté de « Vue réelle » : Mural · 22 mm
  let bm = $('#materiels');
  if (mats.length > 1 && vr) {
    if (!bm) { bm = document.createElement('span'); bm.id = 'materiels'; vr.insertAdjacentElement('afterend', bm); }
    const noms = { mural: 'Mural', '22mm': '22 mm' };
    bm.innerHTML = mats.map(m => '<button data-materiel="' + m + '" class="' + (m === MATERIEL ? 'actif' : '') + '" title="Le matériel de la platine : ' +
      (m === '22mm' ? 'boutons, voyants et boutons tournants de 22 mm dans leurs boîtes' : 'interrupteurs, poussoirs et douilles muraux') + '">' + (noms[m] || m) + '</button>').join('');
    bm.hidden = !vueReelle() || ACTIVITE === 'realiser';
    bm.querySelectorAll('button').forEach(b => { b.onclick = () => { MATERIEL = b.dataset.materiel; aller(ACTIVITE, MODE, true); }; });
  } else if (bm) bm.hidden = true;
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
  const fin = MODE === 'aide' ? 'Le bouton Aide vous guide.' : 'Mode avancé : pas d’aide, contrôle à la fin.';
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
  const base0 = (svg.getAttribute('viewBox') || '0 0 100 100').split(/[\s,]+/).map(Number);
  let base = base0.slice();
  const etat = { x: base[0], y: base[1], w: base[2], h: base[3] };
  /* 02/10 (Franck : « faire tourner les schémas à 90° », le dessin est en hauteur, l'écran en largeur) : un quart de tour à
     gauche. Le dessin passe dans un groupe tourné ; le viewBox reste celui de la vue (zoom et déplacement n'en savent rien) ;
     une zone donnée en unités du dessin est tournée avant d'être cadrée ; les textes restent droits, chacun sur son centre. */
  let quart = 0, gT = null, aRedresser = false;
  const versVue = (z) => quart ? { x: z.y, y: -z.x - (z.w || 0), w: z.h || 0, h: z.w || 0 } : z;   // rotate(-90) : (x, y) → (y, −x)
  const redresser = () => {
    if (!svg.getBoundingClientRect().width) { aRedresser = true; return; }   // panneau caché : getBBox rendrait 0, on attend qu'il se montre
    aRedresser = false;
    gT.querySelectorAll('text, .pastille').forEach(t => {
      if (!('rot' in t.dataset)) t.dataset.rot = t.getAttribute('transform') || '';
      if (!quart) { if (t.dataset.rot) t.setAttribute('transform', t.dataset.rot); else t.removeAttribute('transform'); return; }
      const b = t.getBBox();
      t.setAttribute('transform', (t.dataset.rot ? t.dataset.rot + ' ' : '') + 'rotate(90 ' + (b.x + b.width / 2).toFixed(1) + ' ' + (b.y + b.height / 2).toFixed(1) + ')');
    });
  };
  const tourner = (q) => {
    quart = q ? 1 : 0;
    if (!gT) {
      gT = document.createElementNS('http://www.w3.org/2000/svg', 'g'); gT.setAttribute('class', 'tourne');
      while (svg.firstChild) gT.appendChild(svg.firstChild);
      svg.appendChild(gT);
    }
    if (quart) gT.setAttribute('transform', 'rotate(-90)'); else gT.removeAttribute('transform');
    base = quart ? [base0[1], -base0[0] - base0[2], base0[3], base0[2]] : base0.slice();
    redresser();
    ajuster();
  };
  const appliquer = () => {
    if (aRedresser) redresser();
    svg.setAttribute('viewBox', [etat.x, etat.y, etat.w, etat.h].map(v => v.toFixed(1)).join(' '));
    // unités du dessin par pixel d'écran : un fil garde une épaisseur minimale à l'écran (cablage.css), même dézoomé
    const r = svg.getBoundingClientRect();
    if (r.width && r.height) svg.style.setProperty('--k', Math.max(etat.w / r.width, etat.h / r.height).toFixed(3) + 'px');
  };
  const pt = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
  const borner = (w) => Math.min(base[2] * 4, Math.max(base[2] / 8, w));
  const zoomer = (facteur, centre) => {
    const c = centre || { x: etat.x + etat.w / 2, y: etat.y + etat.h / 2 };
    const w = borner(etat.w / facteur), h = w * etat.h / etat.w;   // on garde le rapport courant (celui du cadrage, s'il y en a un)
    etat.x = c.x - (c.x - etat.x) * (w / etat.w); etat.y = c.y - (c.y - etat.y) * (h / etat.h); etat.w = w; etat.h = h; appliquer();
  };
  // 30/09 (Franck, au pavé tactile : « la platine est petite ») : ⤢ cadre ce qu'on câble (options.zone), pas toute la plaque
  const ajuster = () => {
    const z = options.zone && options.zone(), r = svg.getBoundingClientRect();
    if (z && r.width && r.height) { cadrer(z, 25, r.width / r.height); return; }
    etat.x = base[0]; etat.y = base[1]; etat.w = base[2]; etat.h = base[3]; appliquer();
  };
  // cadrer une zone (x, y, w, h en unités du SVG) au rapport `ratio` (largeur / hauteur du panneau, sinon celui du dessin) :
  // la platine seule, sans ce qui est dessous (Franck, 28/09, écran adaptatif)
  const cadrer = (z, marge, ratio) => {
    if (!z.vue) z = versVue(z);   // une zone en unités du dessin ; `vue: true` : déjà dans la vue (suivreFil)
    marge = marge || 0; const r = ratio || base[2] / base[3];
    let w = z.w + 2 * marge, h = z.h + 2 * marge;
    if (w / h < r) w = h * r; else h = w / r;
    // 30/09 (contre-vérification) : un cadrage doit tout montrer ; le plafond de dézoom (4 × la platine) rognait la hauteur d'un panneau
    // large et bas (la platine seule à 1366 × 768) et laissait les deux bornes du fil guidé hors champ. Seul le zoom avant reste borné.
    w = Math.max(base[2] / 8, w); h = w / r;
    etat.x = z.x + z.w / 2 - w / 2; etat.y = z.y + z.h / 2 - h / 2; etat.w = w; etat.h = h; appliquer();
  };
  // 02/10 (Franck : « selon les ordinateurs et les pads, zoomer / dézoomer peut être compliqué ») : le zoom suit l'ampleur du
  // geste (un cran de molette ≈ 1,2 × ; un pavé tactile envoie beaucoup de petits deltas, son pincement arrive avec Ctrl) et la
  // sensibilité choisie dans « Affichage » ; un seul évènement ne dépasse jamais 1,65 ×
  svg.addEventListener('wheel', (e) => {
    e.preventDefault();
    const d = e.deltaY * (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? 400 : 1) * (e.ctrlKey ? 10 : 1);
    zoomer(Math.exp(Math.max(-0.5, Math.min(0.5, -d * 0.00182 * sensZoom))), pt(e));
  }, { passive: false });
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
  return { zoomer, ajuster, cadrer, tourner, quart: () => quart, versVue };
}
// la sensibilité du zoom (molette, pavé tactile), réglée dans « Affichage » (moteur/ecran.js), gardée sur l'appareil
const CLE_ZOOM = 'cablage-virtuel:zoom';
let sensZoom = (() => { try { const v = parseFloat(localStorage.getItem(CLE_ZOOM)); return v >= 0.2 && v <= 4 ? v : 1; } catch (err) { return 1; } })();
window.CABLAGE_ZOOM = { sens: () => sensZoom, regler: (v) => { sensZoom = v; try { localStorage.setItem(CLE_ZOOM, String(v)); } catch (err) { /* stockage indisponible */ } } };
// le quart de tour de chaque panneau (carte, platine), gardé sur l'appareil
const CLE_TOUR = 'cablage-virtuel:tourner';
function tours() { try { const t = JSON.parse(localStorage.getItem(CLE_TOUR)); return t && typeof t === 'object' ? t : {}; } catch (err) { return {}; } }
function zonePlatine() {   // les appareils dessinés et toutes les bornes (l'arrivée du réseau et les moteurs compris)
  const svg = svgPlatine; if (!svg) return null;
  const boites = [...svg.querySelectorAll('#symboles .app, .borne')].map(el => { try { return el.getBBox(); } catch (err) { return null; } })
    .filter(b => b && (b.width || b.height));
  if (!boites.length) return null;
  const x1 = Math.min(...boites.map(b => b.x)), y1 = Math.min(...boites.map(b => b.y)),
        x2 = Math.max(...boites.map(b => b.x + b.width)), y2 = Math.max(...boites.map(b => b.y + b.height));
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}
function brancherZoom(panneau, z) {
  panneau._zoom = z;   // l'écran adaptatif (moteur/ecran.js) cadre la platine seule
  panneau.querySelectorAll('button.zoom').forEach(b => {
    if (b.dataset.zoom === 'tourner') {
      const peindre = () => b.setAttribute('aria-pressed', String(!!z.quart()));
      b.onclick = () => {
        z.tourner(!z.quart()); peindre();
        const t = tours(); t[panneau.id] = z.quart(); try { localStorage.setItem(CLE_TOUR, JSON.stringify(t)); } catch (err) { /* stockage indisponible */ }
        if (panneau.id === 'platine' && window.CABLAGE_SUIVRE) window.CABLAGE_SUIVRE();   // en Guidé, le fil en cours reste en vue
      };
      if (tours()[panneau.id]) z.tourner(1);
      peindre();
      return;
    }
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
// 29/09 : les noms des exercices varient (« disjoncteur 1P+N », « compresseur », « ventilateur du condenseur »…) : après le nom exact,
// des mots-clés, du plus précis au plus général. Une station sert ce que l'élève a sous les yeux ; rien d'inventé.
const STATIONS_MOTS = [
  [/sectionneur.*porte.?fusible|porte.?fusible.*sectionneur/, '3-5-sectionneur-porte-fusible'], [/porte.?fusible/, '3-4-porte-fusible'],
  [/interrupteur.sectionneur/, '3-3-interrupteur-sectionneur'], [/sectionneur/, '3-2-sectionneur'],
  [/disjoncteur.*diff/, '4-6-disjoncteur-differentiel'], [/interrupteur.*diff/, '4-5-interrupteur-differentiel'],
  [/disjoncteur.moteur/, '4-4-disjoncteur-moteur'], [/disjoncteur/, '4-3-disjoncteur-magneto-thermique'],
  [/relais thermique/, '4-7-relais-thermique'], [/relais temporis/, '5-5-relais-temporise'], [/relais/, '5-4-relais'],
  [/contacteur/, '5-2-contacteur'], [/bouton|poussoir|arr[êe]t d.urgence/, '5-7-boutons'], [/voyant/, '5-8-securite-signalisation'],
  [/transformateur/, '6-2-transformateur'], [/[ée]lectrovanne|vanne magn/, '6-1-bobine-electro-aimant'],
  [/fusible/, '4-1-fusible-gg'], [/^interrupteur(?! va)/, '3-1-interrupteur']];
function stationDe(nom, type) {
  if (/^(moteur|motor)(?!_horloge)/.test(type || '')) return /mono/.test(type) ? '6-5-moteur-monophase' : '6-3-moteur-asynchrone';   // le type dit mono ou tri, pas le nom
  if (STATIONS[nom]) return STATIONS[nom];
  const m = STATIONS_MOTS.find(([re]) => re.test(nom)); return m ? m[1] : null;
}
/* « X1 à X9 » : des repères triés, les suites de numéros regroupées (la nomenclature et le matériel de l'étape Réaliser).
   29/09 : le bornier se lisait « X3 à X6 » (premier et dernier dans l'ordre du fichier) pour des bornes X1 à X9. */
function compacter(reperes) {
  const cle = r => { const m = /^(.*?)(\d+)$/.exec(r); return m ? [m[1], +m[2]] : [r, -1]; };
  const tries = reperes.slice().sort((p, q) => { const a = cle(p), b = cle(q); return a[0].localeCompare(b[0]) || a[1] - b[1]; });
  const morceaux = [];
  for (let i = 0; i < tries.length;) {
    const [pre, n] = cle(tries[i]); let j = i;
    while (n >= 0 && j + 1 < tries.length && cle(tries[j + 1])[0] === pre && cle(tries[j + 1])[1] === cle(tries[j])[1] + 1) j++;
    morceaux.push(j - i >= 2 ? tries[i] + ' à ' + tries[j] : tries.slice(i, j + 1).join(', '));
    i = j + 1;
  }
  return morceaux.join(', ');
}
function construireNomenclature() {
  const z = $('#nomenclature'); if (!z) return;
  const cle = (a) => (a.rang === 5 ? 3.5 : a.rang);   // dans l'ordre du câblage : protections, commande, puissance, bornier, récepteurs
  const liste = EX.appareils.filter(a => a.rang > 0).slice().sort((p, q) => cle(p) - cle(q));
  const bornier = liste.filter(a => a.rang === 5 && !sansRepere(a.repere)).map(a => a.repere);
  const muettes = liste.filter(a => a.rang === 5 && sansRepere(a.repere)).length;
  z.textContent = '';
  const titre = document.createElement('span'); titre.className = 'titre-nomenclature'; titre.textContent = 'Nomenclature'; z.append(titre);
  const ajouter = (rep, nom, type) => {
    const s = document.createElement('span'), b = document.createElement('b'); b.textContent = rep; s.append(b, ' ');
    const st = stationDe(nom, type);
    if (st) {
      const a = document.createElement('a'); a.textContent = nom; a.target = '_blank'; a.rel = 'noopener';
      a.href = 'https://inerweb.fr/electrorezo/stations/' + st + '/'; a.title = 'Station ÉlectroRézo sur inerweb.fr : ' + nom;
      s.append(a);
    } else s.append(nom);
    z.append(s);
  };
  liste.forEach(a => {
    if (a.rang !== 5) ajouter(a.repere, a.nom.toLowerCase(), a.type);
    else if (a.repere === bornier[0]) ajouter(compacter(bornier), (bornier.length > 1 ? 'bornes du bornier' : 'borne') + (muettes ? ', et ' + muettes + ' borne' + (muettes > 1 ? 's' : '') + ' de terre sans repère' : ''));
  });
}

// ------------------------------------------------------------ vue carte seule (deuxième écran)
function vueCarte() {
  document.body.classList.add('vue-carte');
  ['#platine', '.consigne', '.outils', '#modes', '#activites', '#plus'].forEach(s => { const e = $(s); if (e) e.remove(); });
  $('#carte .entete b').textContent = 'La carte — deuxième écran';
  $('#btn-detacher').remove(); const bp = $('#btn-plan'); if (bp) bp.remove();
  $('#btn-numeros').onclick = () => $('#carte').classList.toggle('numeros');
  if (canal) canal.onmessage = (m) => { if (m.data.type === 'sb') surbrillance(m.data.refs, m.data.reps); else if (m.data.type === 'cond') montrerConducteur(m.data.de, m.data.a); };
}

// ------------------------------------------------------------ état lisible de l'extérieur (tests automatiques, HAL plus tard)
window.CABLAGE_ETAT = () => ({ exercice: ID, activite: ACTIVITE, mode: MODE, fils: fils.map(f => ({ de: f.de, a: f.a, couleur: f.couleur })),
                               aides, controle, analyse: EX ? analyser() : null,
                               carte: items.map(i => ({ quoi: i.rep || lib(i.de) + ' > ' + lib(i.a), attendu: i.attendu, reponse: i.reponse })) });

// l'écran adaptatif (moteur/ecran.js) rappelle le suivi du fil après avoir recadré la platine
window.CABLAGE_SUIVRE = () => { if (MODE !== 'guide' || ACTIVITE !== 'cabler') return; const et = etapeCourante(); if (et) suivreFil(et.de, et.a); };

// La mise sous tension (moteur/tension-ecran.js) lit l'exercice et les fils, parle dans la consigne et compte ses aides.
function signatureFils() { return fils.map(f => cle(f.de, f.a)).sort().join(' '); }
window.CABLAGE_API = { ex: () => EX, fils: () => fils, mode: MODE, activite: ACTIVITE, vue: VUE, reelle: () => vueReelle(),
                       dire, compterAide, borneCarte, controleAJour: () => filsControles !== null && filsControles === signatureFils(),
                       // l'étape Réaliser (moteur/realiser.js) : la platine dessinée ici, sa colonne là-bas
                       atelier: ATELIER, lib, aller, compacter, sansRepere, couleurs: COULEURS, memoire: () => MEMOIRE, materiel: () => MATERIEL, borne: (ref) => !!bornes[ref],
                       liaisonsFixes: () => liaisonsFixes(),
                       // 30/09 : le fil par fil en attente (constat R2) ; le tracé des fils et des appareils pour poser les étiquettes
                       // d'état à côté, jamais dessus (constat E6) ; le tutoriel ; le stockage bloqué (constat X8)
                       enAttente: () => !!enAttente, majAttente, pointsFil: (f) => pointsFil(f), tuto: TUTO,
                       stockageBloque: () => { if (STOCKAGE_BLOQUE) return true; try { localStorage.setItem('cablage-virtuel:essai', '1'); localStorage.removeItem('cablage-virtuel:essai'); return false; } catch (err) { return true; } } };

// ------------------------------------------------------------ l'étape 5 : réaliser (29/09, maquette validée, écran 4)
/* La platine en vrais appareils (quand l'exercice en a), dessinée avec les fils gardés par l'étape Câbler, SANS geste de câblage
   (on la regarde, on zoome, on la déplace) ; la carte est repliée. La colonne d'à côté est faite par moteur/realiser.js. */
function lancerRealiser() {
  document.body.classList.add('activite-realiser');
  controle = true;   // debutTrace ne pose aucun fil
  construirePlatine();
  brancherZoom($('#platine'), installerZoom(svgPlatine, { zone: zonePlatine }));
  const memo = MEMOIRE && Array.isArray(MEMOIRE.fils) ? MEMOIRE.fils : [];
  memo.forEach(m => { if (bornes[m.de] && bornes[m.a]) fils.push({ de: m.de, a: m.a, couleur: m.couleur, idx: fils.length }); });   // un fil que l'embrochage fait n'a pas de bornes en vue réelle
  redessinerFils(); rafraichir();
  $('#platine .entete span').textContent = vueReelle() ? 'votre câblage, en vrais appareils' : 'votre câblage';
  brancherNavigation();
  if (memo.length) dire('Réaliser : câblez votre vraie platine, hors tension.', null, 'Suivez votre ordre de câblage, cochez à mesure, puis appelez le professeur.');
  else if (window.CABLAGE_API.stockageBloque()) dire('Votre navigateur n’a pas gardé vos fils.', 'ko', 'Il ne garde rien sur cet appareil. Câblez à l’écran (étape 3), puis venez ici par « Réaliser (étape 5) », dans le même onglet.');
  else dire('Aucun fil gardé pour cet exercice sur cet appareil.', 'ko', 'Câblez d’abord à l’écran (étape 3) : vos fils y sont gardés pour cette étape.');
  window.CABLAGE_API.realiserPret = true;
  document.dispatchEvent(new Event('cablage-realiser'));
}

// ------------------------------------------------------------ départ
// Un téléphone (plus petit côté de l'ÉCRAN sous 500 px ; une tablette en a 600 et plus) : bornes trop petites au doigt
// (essai de Franck, 27/09). On le dit, sans bloquer. L'écran et non la fenêtre : un ordinateur à fenêtre étroite n'est pas visé.
if (Math.min(screen.width, screen.height) < 500) {
  $('#petit-ecran').classList.add('ouvert');
  $('#btn-petit-ecran').onclick = () => $('#petit-ecran').classList.remove('ouvert');
}
construireBarre();
if (FIL_PAR_FIL) document.body.classList.add('fil-par-fil');   // la place de la bulle est gardée sous la platine
if (!ID) { dire('Aucun exercice demandé.', 'ko', 'Revenez au réseau.'); return; }
charger(ID, (ex) => {
  if (!ex) { dire('Exercice « ' + ID + ' » introuvable.', 'ko', 'Lancez outils/qet-vers-exercice.py.'); return; }
  EX = ex;
  if (EX.reels) {   // le matériel demandé, s'il existe pour cet exercice ; sinon le premier
    if (!EX.reels[MATERIEL]) MATERIEL = Object.keys(EX.reels)[0];
    EX.reel = EX.reels[MATERIEL];
    try { localStorage.setItem(CLE_MATERIEL, MATERIEL); } catch (err) { /* stockage indisponible */ }
  }
  const titre = RESEAU && RESEAU.titre ? RESEAU.titre(ID, EX.titre) : EX.titre;   // le titre neutre du réseau (jamais « examen »)
  // 30/09 (constat E11) : la barre dit le titre COURT de la station (celui de la carte du réseau), + « — la commande » sur le
  // quai c ; le titre complet de l'exercice en infobulle et dans l'onglet
  const court = TUTO && RESEAU ? (RESEAU.stations.find(s => s.id === 'depart') || {}).titre : SD ? SD.station.titre + (SD.quai === 'c' ? ' — la commande' : '') : '';
  document.title = 'Câblage virtuel — ' + titre;
  // 02/10 : sous 1180 px, les étapes gardent leur nom (Franck ne les avait pas vues) ; le titre s'y réduit à « Câblage n° 10 »
  // (+ « — la commande »), la suite masquée (moteur/cablage.css) ; le titre complet reste en infobulle
  const tt = court || titre, i = tt.indexOf(' : '), j = tt.indexOf(' — la commande', i);
  $('#titre').textContent = i > 0 ? tt.slice(0, i) : tt; $('#titre').title = titre;
  if (i > 0) { const s = document.createElement('span'); s.className = 'titre-suite'; s.textContent = tt.slice(i, j > i ? j : tt.length); $('#titre').append(s, j > i ? tt.slice(j) : ''); }
  construireNomenclature();
  if (ACTIVITE === 'realiser' && VUE !== 'carte') { lancerRealiser(); return; }
  construireCarte();
  if (VUE !== 'carte' && ACTIVITE !== 'cabler') { lancerCarte(); document.dispatchEvent(new Event('cablage-carte-prete')); return; }   // 02/10 : le menu Affichage (moteur/ecran.js)
  $('#carte').classList.add('numeros');   // les numeros de bornes sont le sujet : visibles d'emblee
  brancherZoom($('#carte'), installerZoom($('#carte-corps svg'), {}));
  if (VUE === 'carte') { vueCarte(); return; }
  construirePlatine();
  brancherZoom($('#platine'), installerZoom(svgPlatine, {
    zone: zonePlatine,
    peutDeplacer: (e) => !trace && !(e.target.closest && e.target.closest('.fil')),
    annuler: annulerTrace
  }));
  construireOutils();
  const revenus = reprendre();   // retour à Câbler : les fils gardés reviennent (jamais dans le tutoriel)
  rafraichir();
  demarrerMode(revenus);
  if (revenus) {
    const attente = FIL_PAR_FIL ? fils.find(f => !f.pose) : null;   // fil par fil : le dernier fil tracé mais pas encore posé
    if (attente && fils.filter(f => !f.pose).length === 1) { enAttente = attente; redessinerFils(); attendrePose(attente); }
    annoncerRevenus(revenus);
  }
  document.dispatchEvent(new Event('cablage-pret'));
  majAttente();
});
})();

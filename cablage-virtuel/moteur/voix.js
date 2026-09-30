/* La voix du professeur (docs/PLAN-2026-09-29-VOIX-PROFESSEUR.md ; maquette V1 validée par Franck le 29/09 : « exactement ce
   que je voulais »). V2 : tous les exercices ; V3 : réglages.
   Un professeur à l'épaule : il explique chaque étape, puis, en Guidé, chaque fil au moment où l'élève y arrive (le rôle d'un
   appareil à sa première rencontre), chaque appui sur Aide, et, à l'essai, le fonctionnement de l'installation événement par
   événement. Doctrine (usine-contenu/00-charte/VOIX-ET-NARRATION.md) : la voix explique, elle ne lit pas l'écran ; elle part
   AU CLIC (« Écouter le professeur », dans la bande de consigne), jamais seule au chargement d'une première page ; une seule
   commande visible (« Écouter le professeur » / « Couper la voix ») ; la vitesse se règle dans le menu Affichage (0,6 à 1,4 ;
   la changer arrête la lecture) ; muette pendant le câblage en Avancé (pas d'aide). Jamais un numéro de borne (règle n° 1).
   Textes : voix/narrations.json ; pistes : voix/pistes.json (outils/fabriquer-voix.py, fabriquées à 0,95×). Le module ne
   touche pas au jeu : il lit window.CABLAGE_ETAT(), la simulation et la page toutes les 300 ms, comme le tutoriel. */
(function () {
'use strict';
const P = new URLSearchParams(location.search);
if (P.get('vue') === 'carte') return;   // le deuxième écran (la carte seule) ne parle pas
const $ = s => document.querySelector(s);
const ID = P.get('ex') || '', TUTO = P.get('tuto') !== null;
const PROPRE = { 'cablage-1': 'n1' }[ID] || null;   // les textes écrits pour un exercice passent avant les textes communs
const CLE = 'cablage-virtuel:voix', BASE = 0.95;    // les pistes sont fabriquées à 0,95× : la vitesse affichée part de là
let pistes = {}, audio = null, file = [], bloque = null;
let reglage = { actif: false, vitesse: BASE };
try { Object.assign(reglage, JSON.parse(localStorage.getItem(CLE) || '{}')); } catch (e) { /* stockage indisponible */ }
if (P.get('voix') !== null) reglage.actif = true;   // la maquette du 29/09 (&voix) reste une porte
const garder = () => { try { localStorage.setItem(CLE, JSON.stringify(reglage)); } catch (e) { /* rien */ } };

fetch('voix/pistes.json?v=' + Date.now()).then(r => r.json()).then(j => { pistes = j.pistes || {}; demarrer(); }).catch(() => {});

// ---- quelle piste : celle de l'exercice si elle existe, sinon la commune
const choisir = (...ids) => ids.find(i => i && pistes[i]) || null;
const propre = (k) => PROPRE ? PROPRE + '-' + k : null;

// ---- la lecture : une piste à la fois ; une piste « urgente » coupe la précédente (l'élève va plus vite que la voix)
function jouer(id, urgent) {
  if (!reglage.actif || !id || !pistes[id]) return;
  if (urgent) { file = []; if (audio) { audio.pause(); audio = null; bulle('cacher'); } }
  if (audio) { if (file.length < 3) file.push(id); return; }
  audio = new Audio('voix/' + pistes[id].fichier);
  audio.playbackRate = Math.min(1.5, Math.max(0.6, reglage.vitesse / BASE));
  audio.onended = audio.onerror = () => { audio = null; bulle('cacher'); bouton(); if (file.length) jouer(file.shift()); };
  bulle('montrer', pistes[id].texte, { audio });   // 30/09 : la phrase dite, dans la bulle du site (absente à l'atelier : rien)
  // après un rechargement, le navigateur peut refuser le son sans nouveau geste : le bouton propose de reprendre
  audio.play().catch(() => { audio = null; bloque = id; bouton(); });
  bouton();
}
function couper() { file = []; if (audio) { audio.pause(); audio = null; } bulle('cacher'); }
// le texte de la voix : pilote-fluides/moteur/sous-titres.js, branché par outils/livrer.py dans la copie servie
function bulle(methode, ...args) {
  if (!window.PiloteSousTitres || (methode === 'montrer' && !args[0])) return;
  window.PiloteSousTitres[methode](...args);
  if (methode === 'montrer') poserBulle();
}
// Le composant prend le coin bas qui cache le moins ; ici tous les coins cachent la carte ou la platine, et c'était « Contrôler ».
// Tant que l'élève ne l'a pas déplacée (il le peut, c'est retenu), la bulle se pose dans le vide de la barre du bas, sur deux lignes ;
// en « Schéma sur papier », au pied de la colonne des outils.
function poserBulle() {
  const b = document.querySelector('.pst'), o = $('.outils');
  if (!b || !o || b.style.top) return;
  const colonne = document.body.classList.contains('vue-papier') && window.innerWidth > window.innerHeight;
  const r = (colonne ? o : o.querySelector('.spacer') || o).getBoundingClientRect();
  const w = Math.min(640, r.width - 16);
  if (w < 200) return;
  b.style.maxWidth = w + 'px'; b.style.left = (r.left + (r.width - w) / 2) + 'px';
  b.style.bottom = colonne ? '44px' : Math.max(8, window.innerHeight - o.getBoundingClientRect().bottom + 30) + 'px';   // dans la barre, au-dessus du pied
}
window.addEventListener('resize', () => { if (audio) poserBulle(); });

// ---- le bouton, dans la bande de consigne (une seule commande)
function bouton() {
  let b = $('#btn-voix');
  const muet = muette();
  if (!b) {
    const c = $('#consigne'); if (!c) return;
    b = document.createElement('button'); b.id = 'btn-voix'; b.type = 'button';
    b.style.cssText = 'margin-left:auto;align-self:center;flex:none;font:600 14px system-ui,sans-serif;padding:6px 12px;border-radius:8px;border:1px solid #1f3a5f;background:#fff;color:#1f3a5f;cursor:pointer';
    c.style.display = 'flex'; c.style.gap = '12px'; c.appendChild(b);
    b.onclick = () => {
      if (reglage.actif && bloque) { const i = bloque; bloque = null; jouer(i, true); return; }
      reglage.actif = !reglage.actif; garder();
      if (!reglage.actif) couper(); else dernier = null;   // allumée : on repart de l'étape en cours
      bouton();
    };
  }
  b.hidden = muet;
  b.textContent = !reglage.actif ? '🔊 Écouter le professeur' : bloque ? '🔊 Reprendre la voix' : '■ Couper la voix';
}
// Avancé : pas d'aide pendant le câblage, donc pas de voix (l'essai et Réaliser parlent encore)
function muette() {
  const e = window.CABLAGE_ETAT && window.CABLAGE_ETAT(), T = window.CABLAGE_TENSION_ECRAN;
  return !!(e && e.mode === 'reel' && e.activite === 'cabler' && !(T && T.enCours()) && !TUTO);
}

// ---- les appareils : leur famille, pour le texte de première rencontre
function famille(a) {
  const t = a.type || '', n = (a.nom || '').toLowerCase();
  if (a.rang === 5) return 'bornier';
  if (/disjoncteur_diff/.test(t)) return 'disjoncteur-diff';
  if (/^gv2/.test(t)) return 'disjoncteur-moteur';
  if (/^disjonct/.test(t)) return 'disjoncteur';
  if (/sectionneur.*fusible/.test(t)) return 'sectionneur-fusibles';
  if (/^porte_fusible/.test(t)) return 'porte-fusible';
  if (/^pojistka/.test(t)) return 'fusible';
  if (/^inter-sectionneur/.test(t)) return 'interrupteur-sectionneur';
  if (/^com_puiss/.test(t)) return 'contacteur';
  if (/^relais_therm/.test(t)) return 'relais-thermique';
  if (/^bobine/.test(t)) return /tempor/.test(n) ? 'relais-temporise' : 'relais';
  if (/^poussoir_nf/.test(t)) return 'bouton-arret';
  if (/^poussoir/.test(t)) return ID === 'telerupteur' || /^bouton poussoir$/.test(n) ? 'poussoir-lumiere' : 'bouton-marche';
  if (/^arret_urgence/.test(t)) return 'arret-urgence';
  if (/^telerupteur/.test(t)) return 'telerupteur';
  if (/^010_switch/.test(t)) return /^interrupteur$/.test(n) ? 'interrupteur' : 'commutateur';
  if (/^con_simple/.test(t)) return 'thermostat-2';
  // relecture V2 (F3, F4) : le thermostat de fin de dégivrage et le pressostat du condenseur ont leur propre texte
  if (/^contnonc/.test(t)) return /va-et-vient/.test(n) ? 'va-et-vient' : /combin/.test(n) ? 'pressostat-combine' : /pressostat.*bp|bp$/.test(n) ? 'pressostat-bp'
    : /pressostat.*condenseur/.test(n) ? 'pressostat-condenseur' : /pressostat/.test(n) ? 'pressostat-hp' : /fin de d[ée]givrage/.test(n) ? 'thermostat-fd'
    : /thermostat/.test(n) ? 'thermostat' : /horloge/.test(n) ? 'horloge' : null;
  if (/horloge/.test(t)) return 'horloge';
  if (/^lampe/.test(t)) return /voyant/.test(n) ? 'voyant' : 'lampe';
  if (/^electrovanne/.test(t)) return 'electrovanne';
  if (/^transfo/.test(t)) return 'transformateur';
  if (/dahlander/.test(t)) return 'moteur-dahlander';
  if (/6_terminals/.test(t)) return 'moteur-6b';
  if (/^(moteur|motor)/.test(t)) return /mono/.test(t) ? 'moteur-mono' : 'moteur-tri';
  if (/^resistance/.test(t)) return 'resistance';
  return null;
}
const COMMANDE = /^(poussoir|contnonc|con_simple|010_switch|arret_urgence|lampe|electrovanne|bobine|moteur_horloge|telerupteur)/;

// ---- ce qu'on dit, et quand
let dernier = null, filsAvant = -1, consigneAvant = '', dejaArme = false, rencontres = new Set(), catAvant = null, suite = 0;
function contexte() {
  if (TUTO) {
    const v = P.get('tuto'), cle = 'cablage-virtuel:tuto:' + ID + (v ? ':' + v : '');
    let i = 0; try { i = JSON.parse(sessionStorage.getItem(cle) || '{"i":0}').i || 0; } catch (e) { /* rien */ }
    if (v === 'bornier') return [['born-1', 'born-2', 'born-3', null, 'born-4', 'born-5', 'born-7'][i] || null];   // le tutoriel du bornier
    return ['tuto-' + i];
  }
  const e = window.CABLAGE_ETAT && window.CABLAGE_ETAT(); if (!e) return null;
  const T = window.CABLAGE_TENSION_ECRAN;   // l'essai sous tension se joue dans la page de l'étape Câbler
  const k = T && T.enCours() ? 'essayer' : e.activite;
  if (k === 'essayer') return pistes[propre('essayer')] ? [propre('essayer')] : ['etape-essayer', 'ex-' + ID];
  return [choisir(propre(k), 'etape-' + k)];
}
function prochain(e) {   // l'étape de câblage suivante (Guidé : dans l'ordre), et son rang
  const ex = window.CABLAGE_API && window.CABLAGE_API.ex(); if (!ex) return null;
  const cle = (a, b) => [a, b].sort().join('|'), poses = new Set(e.fils.map(f => cle(f.de, f.a)));
  const i = ex.etapes.findIndex(s => !poses.has(cle(s.de, s.a)));
  return i < 0 ? null : { et: ex.etapes[i], k: i + 1, ex };
}
function texteDuFil(p) {   // le texte d'un fil : celui de l'exercice, sinon la première rencontre d'un appareil, sinon sa situation
  const own = propre('fil-' + p.k); if (own && pistes[own]) return own;
  const et = p.et, app = r => p.ex.appareils.find(a => a.repere === r.split(':')[0]);
  const A = app(et.de), B = app(et.a);
  for (const a of [A, B]) {
    if (!a) continue;
    const f = famille(a);
    if (f && !rencontres.has(f) && pistes['app-' + f]) { rencontres.add(f); catAvant = null; return 'app-' + f; }
  }
  const lib = r => (window.CABLAGE_API.lib ? window.CABLAGE_API.lib(r) : r);
  const id = r => r.split(':')[1] || '';
  let cat;
  if (et.pont) cat = 'fil-pont';
  else if (et.couleur === 'vert-jaune') cat = 'fil-terre';
  else if (/^R[ée]seau/.test((A || {}).repere || '') || /^R[ée]seau/.test((B || {}).repere || '')) cat = 'fil-arrivee';   // aussi « Réseau-L » (n° 2)
  else if (et.couleur === 'bleu') cat = 'fil-neutre';
  else if ([A, B].some(a => a && a.rang === 5)) cat = [et.de, et.a].some(r => /côté terrain/.test(lib(r))) ? 'fil-bornier-terrain' : 'fil-vers-bornier';
  else if ([A, B].some(a => a && COMMANDE.test(a.type || '')) || [et.de, et.a].some(r => /^(A1|A2|13|14|21|22|95|96|97|98)$/.test(id(r)))) cat = 'fil-commande';
  else cat = 'fil-puissance';
  if (cat === catAvant) { suite = (suite % 3) + 1; return 'fil-suite-' + suite; }
  catAvant = cat; return cat;
}

// ---- la mise sous tension : on compare l'état de la simulation d'un tic à l'autre (moteur/tension.js n'a pas d'événements nommés)
let avant = null, dits = new Set();
const une = (id) => { if (dits.has(id)) return null; dits.add(id); return id; };   // une explication qui ne se répète pas
function tension() {
  const T = window.CABLAGE_TENSION_ECRAN; if (!T || !T.enCours()) { avant = null; return; }
  const s = T.etat(); if (!s || !s.appareils) return;
  const ex = window.CABLAGE_API.ex(), A = s.appareils, nd = (s.defauts || []).length;
  const typ = r => ((ex.appareils.find(a => a.repere === r) || {}).type || ''), nom = r => ((ex.appareils.find(a => a.repere === r) || {}).nom || '').toLowerCase();
  const photo = { nd, a: JSON.parse(JSON.stringify(A)) };
  if (avant) {
    const dire = [];   // du plus grave au plus doux ; la première coupe ce qui parle, les suivantes attendent
    if (nd > avant.nd) { const t = s.defauts[nd - 1]; dire.push(/court-circuit/i.test(t) ? choisir(propre('ev-cc'), 'ev-cc') : /pompage|bat/i.test(t) ? 'ev-pompage' : 'ev-defaut'); }
    const bobinesForcees = Object.values(A).some(v => v.force);
    for (const [r, v] of Object.entries(A)) {
      const w = avant.a[r] || {}, t = typ(r);
      if ('enclenche' in v && v.enclenche && !w.enclenche) dire.push(PROPRE ? choisir(propre('ev-q1')) : une('ev-protection'));
      if (/^relais_therm/.test(t) && v.declenche && !w.declenche) {
        const retombe = Object.entries(A).some(([q, x]) => 'colle' in x && !x.colle && (avant.a[q] || {}).colle && !(avant.a[q] || {}).force);
        dire.push(retombe ? 'ev-thermique-commande' : choisir(propre('ev-f1'), 'ev-thermique-seul'));
      }
      if ('colle' in v && v.colle !== !!w.colle && /^com_puiss/.test(t)) {   // un contacteur ; ni l'horloge ni le télérupteur (relecture F7, F8)
        if (v.colle) dire.push(v.force ? une('ev-colle-main') : une('ev-colle'));
        else if (!Object.entries(A).some(([q, x]) => /^relais_therm/.test(typ(q)) && x.declenche && !(avant.a[q] || {}).declenche)) dire.push(une('ev-retombe'));
      }
      // l'auto-maintien : la bobine reste collée quand le bouton qui l'a fait coller est relâché
      if ('appuye' in v && !v.appuye && w.appuye && /^poussoir(?!_nf)/.test(t)) {
        if (Object.entries(A).some(([q, x]) => x.colle && !x.force && (avant.a[q] || {}).colle && /^com_puiss|^bobine/.test(typ(q)))) dire.push(une('ev-automaintien'));
      }
      if ('texte' in v && v.texte !== w.texte && /^(moteur|motor|dahlander|induction)/.test(t)) {
        const m = v.texte, m0 = w.texte || '';
        dire.push(/ronfle/.test(m) ? choisir(propre('ev-ronfle'), 'ev-ronfle') : /étoile/.test(m) ? 'ev-etoile' : /triangle/.test(m) ? 'ev-triangle'
          : /petite vitesse/.test(m) ? 'ev-petite-vitesse' : /grande vitesse/.test(m) ? 'ev-grande-vitesse'
          : /tourne.*inverse/.test(m) ? choisir(propre('ev-inverse'), 'ev-moteur-inverse') : /tourne.*direct/.test(m) ? choisir(propre('ev-direct'), 'ev-moteur-direct')
          : /tourne/.test(m) ? une('ev-moteur-mono') : /tourne|ronfle/.test(m0) ? (PROPRE ? choisir(propre('ev-arret')) : une('ev-arret')) : null);
      }
      if ('marche' in v && v.marche === 'oui' && w.marche !== 'oui') {
        dire.push(/^electrovanne/.test(t) ? une('ev-electrovanne') : /^resistance/.test(t) ? une('ev-resistance')
          : /^lampe/.test(t) ? (/voyant/.test(nom(r)) ? une('ev-voyant') : une('ev-lampe')) : null);
      }
      if ('alim' in v && v.alim && !w.alim) dire.push(une('ev-transfo'));
    }
    // l'ordre du récit : le défaut d'abord, puis la cause (protection, contacteur), puis l'effet (moteur, récepteur) ;
    // un exercice qui a ses propres textes (n° 1) ne double pas avec les textes communs des contacteurs
    const rang = id => /^ev-(cc|pompage|defaut)|-ev-cc$/.test(id) ? 0 : /protection|-ev-q1|colle|retombe|thermique|-ev-f1/.test(id) ? 1 : 2;
    const liste = [...new Set(dire.filter(Boolean))].filter(id => !(PROPRE && /^ev-(colle|colle-main|retombe)$/.test(id)))
      .sort((x, y) => rang(x) - rang(y));
    liste.forEach((id, i) => jouer(id, i === 0));
  }
  avant = photo;
}

function suivre() {
  bouton();
  if (!reglage.actif || muette()) return;
  const c = contexte();
  const cle = c && c.join('+');
  if (cle && cle !== dernier) { dernier = cle; filsAvant = -1; c.forEach((id, i) => jouer(id, i === 0)); }
  if (TUTO) return;
  tension();
  // le bouton Aide (Franck, 29/09 : « un vocal spécifique quand on appuie sur Aide ») : une explication par appui ;
  // un fil refusé : l'erreur expliquée, sans la réponse
  const t = ($('#consigne-texte') || {}).textContent || '';
  if (t !== consigneAvant) {
    consigneAvant = t;
    const n = /^Aide ([123]) :/.exec(t);
    if (n) jouer('aide-' + n[1], true); else if (/^Non\b/.test(t)) jouer(choisir(propre('refus'), 'refus'), true);
  }
  const e = window.CABLAGE_ETAT(); if (e.activite !== 'cabler' || e.mode !== 'guide') return;
  // un fil de plus : le suivant, expliqué (le premier suit l'introduction de l'étape)
  if (e.fils.length !== filsAvant) {
    const premier = filsAvant === -1; filsAvant = e.fils.length;
    const p = prochain(e);
    if (p) jouer(texteDuFil(p), !premier); else if (!premier) jouer(choisir(propre('fini'), 'fini'), true);
  }
  // la première borne touchée : « elle s'allume » (une seule fois)
  if (!dejaArme && document.querySelector('#platine .borne.armee')) { dejaArme = true; jouer(choisir(propre('arme'), 'arme'), true); }
}
function demarrer() { bouton(); setInterval(suivre, 300); }
// le menu Affichage (moteur/ecran.js) règle la voix
window.CABLAGE_VOIX = {
  jouer, couper, pistes: () => pistes, reglage: () => Object.assign({}, reglage),
  regler: (r) => { const avantV = reglage.vitesse; Object.assign(reglage, r); garder();
                   if (r.vitesse !== undefined && r.vitesse !== avantV) couper();   // changer la vitesse arrête la lecture (doctrine § 5)
                   if (r.actif === false) couper(); bouton(); }
};
})();

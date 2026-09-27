/* La mise sous tension virtuelle — l'essai de fonctionnement comme à l'EP2 (docs/PLAN-2026-09-27-MISE-SOUS-TENSION.md).
   Pur calcul, sans écran : le câblage de l'élève, les gestes (enclencher, appuyer, basculer), et ce qui se passe.
   Rien n'est ajouté aux exercices : le comportement de chaque appareil se lit sur son type et ses numéros de bornes
   (CEI 60947 : 1-2 fermé au repos, 3-4 ouvert au repos, 5-6 / 7-8 temporisés, 95-96 du thermique). */
(function () {
'use strict';

const TEMPO = 3000;   // délai des contacts temporisés (LADS2, relais temporisé), en ms
const PAS = 100;      // pas du temps dans avancer()
const PROTECTION = /^(disjonct|gv2|sectionneur|disjoncteur_differentiel)/;
const DIFFERENTIEL = /^disjoncteur_differentiel/;
const THERMIQUE = /^relais_therm/;
const BOBINE = ['com_puiss_3P_inv2', 'com_puiss4', 'telerupteur', 'bobine3', 'moteur_horloge'];
const CONTACTEUR = ['com_puiss_3P_inv2', 'com_puiss4'];
const RECEPTEUR = { lampe2: ['A1', 'A2'], electrovanne: ['A1', 'A2'], 'resistances-chauffantes': ['1', '2'],
  'motor-mono-2': ['1', '2'], moteur_mono: ['U1', 'U2'] };
const MOTEUR_TRI = ['moteur_tri_2', 'induction_motor_6_terminals', 'dahlander_motor_6_terminals'];
const ORDRE = { L1: 0, L2: 1, L3: 2 };

function phase(p) { return !!p && p !== 'N' && p !== 'PE'; }

function role(a) {
  const t = a.type;
  if (/^src_/.test(t) || (t === 'terre' && !/^Masse/.test(a.repere))) return 'source';
  if (PROTECTION.test(t)) return 'protection';
  if (THERMIQUE.test(t)) return 'thermique';
  if (BOBINE.includes(t)) return 'bobine';
  if (/^poussoir/.test(t)) return 'bouton';
  if (t === '010_switch_1pos' || t === 'contnonc' || t === 'con_simple') return 'capteur';
  if (RECEPTEUR[t]) return 'recepteur';
  if (MOTEUR_TRI.includes(t)) return 'moteur';
  return 'passif';   // bornier, masses : seulement leurs liaisons internes
}

/* Les contacts à deux chiffres d'un appareil : [début, fin, chiffre des unités du début]. */
function auxiliaires(ids) {
  const set = new Set(ids), out = [];
  for (const id of ids) if (/^\d\d$/.test(id) && +id[1] % 2 === 1 && set.has(id[0] + (+id[1] + 1))) out.push([id, id[0] + (+id[1] + 1), +id[1]]);
  return out;
}
function poles(ids) {
  const set = new Set(ids);
  return [['1', '2'], ['3', '4'], ['5', '6'], ['N1', 'N2']].filter(([x, y]) => set.has(x) && set.has(y));
}

function creer(EX, fils, opts) {
  opts = opts || {};
  const tempo = opts.tempo || TEMPO;
  const APP = EX.appareils;
  const S = {};
  for (const a of APP) S[a.repere] = { role: role(a) };
  const liens = fils.map(f => [f.de, f.a]);
  if (opts.reelle && EX.reel) for (const l of EX.reel.liaisons_fixes || []) liens.push(l);
  for (const a of APP) for (const [x, y] of a.liaisons_internes || []) liens.push([a.repere + ':' + x, a.repere + ':' + y]);
  const REFS = [];
  for (const a of APP) for (const b of a.bornes) REFS.push(a.repere + ':' + b.id);
  let t = 0, coupure = false;
  const journal = [], vus = new Set();
  let recepteursAvant = {};

  function noter(texte, gravite) { journal.push({ t, texte, gravite: gravite || 'info' }); }
  function signaler(cle, texte) { if (!vus.has(cle)) { vus.add(cle); noter(texte, 'defaut'); } }

  /* Ce qui conduit dans un appareil, selon son état. */
  function fermes(a, ouverts) {
    const s = S[a.repere], ids = a.bornes.map(b => b.id), r = s.role;
    if (r === 'protection') return s.enclenche && !s.declenche && !(ouverts && ouverts.has(a.repere)) ? poles(ids) : [];
    if (r === 'thermique') return poles(ids).concat(auxiliaires(ids).filter(([x, , u]) => x[0] === '9' ? (u === 5) !== !!s.declenche : false));
    if (r === 'bobine') {
      const out = [];
      const colle = (s.alim && !s.grillee) || !!s.force;
      if (a.type === 'telerupteur') { if (s.bascule) out.push(['1', '2']); return out; }
      if (CONTACTEUR.includes(a.type) && colle) out.push(...poles(ids));
      for (const [x, y, u] of auxiliaires(ids)) {
        if (a.type === 'moteur_horloge') { if (s.periode) out.push([x, y]); continue; }
        const temporise = colle && s.t >= tempo;
        if ((u === 1 && !colle) || (u === 3 && colle) || (u === 5 && !temporise) || (u === 7 && temporise)) out.push([x, y]);
      }
      return out;
    }
    if (r === 'bouton') {   // 13-14 / 11-12 ; le poussoir domestique n'a que 1-2
      const aux = auxiliaires(ids);
      if (!aux.length) return (a.type === 'poussoir') === !!s.appuye ? poles(ids) : [];
      return aux.filter(([, , u]) => (u === 3) === !!s.appuye).map(([x, y]) => [x, y]);
    }
    if (r === 'capteur') {
      if (a.type === 'contnonc') return [s.actionne ? ['1', '4'] : ['1', '2']];
      if (a.type === 'con_simple') return [['1', '2'], ['3', '4']].slice(0, s.etage || 0);
      return s.ferme ? [['1', '2']] : [];
    }
    return [];
  }

  /* Les nœuds : bornes reliées par les fils, le bornier, les embrochages et les contacts fermés. */
  function resoudre(ouverts, sansFil) {
    const parent = new Map();
    const f = x => { let p = parent.get(x); if (p === undefined) { parent.set(x, x); return x; } if (p === x) return x; p = f(p); parent.set(x, p); return p; };
    const u = (x, y) => { const a = f(x), b = f(y); if (a !== b) parent.set(a, b); };
    liens.forEach(([x, y], i) => { if (i !== sansFil) u(x, y); });
    for (const a of APP) for (const [x, y] of fermes(a, ouverts)) u(a.repere + ':' + x, a.repere + ':' + y);
    const pots = new Map();
    if (!coupure) for (const a of APP) if (S[a.repere].role === 'source')
      for (const b of a.bornes) { const k = f(a.repere + ':' + b.id), p = a.type === 'terre' ? 'PE' : b.id; if (!pots.has(k)) pots.set(k, new Set()); pots.get(k).add(p); }
    return { racine: f, pots: ref => pots.get(f(ref)) || new Set() };
  }
  function un(R, ref) { const p = R.pots(ref); return p.size === 1 ? [...p][0] : null; }
  function tension(R, x, y) {
    const a = un(R, x), b = un(R, y);
    if (!a || !b || a === b) return 0;
    if (phase(a) && phase(b)) return 400;
    if (phase(a) || phase(b)) return a === 'PE' || b === 'PE' ? 'PE' : 230;
    return 0;
  }

  /* Deux potentiels dans un même nœud. */
  function courtsCircuits(R) {
    const par = new Map();
    for (const ref of REFS) { const k = R.racine(ref); if (!par.has(k)) par.set(k, []); par.get(k).push(ref); }
    const out = [];
    for (const [, refs] of par) {
      const p = [...R.pots(refs[0])];
      if (p.length < 2) continue;
      const ph = p.filter(phase);
      const nature = ph.length >= 2 ? 'entre phases (' + ph.join('-') + ')' : ph.length ? 'entre ' + ph[0] + ' et ' + (p.includes('N') ? 'le neutre' : 'la terre') : 'entre le neutre et la terre';
      out.push({ nature, franc: ph.length > 0, pots: p, bornes: refs });
    }
    return out;
  }
  function entrees(q) { return APP.find(a => a.repere === q).bornes.map(b => b.id).filter(id => /^(1|3|5|N1)$/.test(id)).map(id => q + ':' + id); }
  function armees(filtre) { return APP.filter(a => S[a.repere].role === 'protection' && S[a.repere].enclenche && !S[a.repere].declenche && (!filtre || filtre(a))).map(a => a.repere); }
  /* La protection qui coupe : son ouverture fait disparaître le défaut, et elle n'en alimente aucune autre qui le ferait. */
  function laPlusProche(aide) {
    if (!aide.length) return null;
    return aide.find(p => !aide.some(q => q !== p && entrees(q).every(ref => resoudre(new Set([p])).pots(ref).size === 0))) || aide[0];
  }
  function declencher(q, pourquoi, suspects) {
    S[q].declenche = true;
    noter(q + ' déclenche : ' + pourquoi + '.', 'defaut');
    if (suspects) journal[journal.length - 1].suspects = suspects;
  }
  /* Les fils de l'élève dont le retrait fait disparaître le défaut : ce que l'interface peut montrer en aide. */
  function suspects(compter) {
    const n = compter(resoudre());
    const chemin = fils.map((f, i) => i).filter(i => compter(resoudre(null, i)) < n).map(i => ({ de: fils[i].de, a: fils[i].a }));
    const reseau = ref => (EX.reseaux || []).findIndex(r => r.bornes.includes(ref));
    const faux = chemin.filter(f => reseau(f.de) !== reseau(f.a));   // relie deux réseaux que le schéma sépare
    return faux.length ? faux : chemin;
  }

  function stabiliser() {
    const signatures = [];
    for (let i = 0; i < 40; i++) {
      const R = resoudre();
      const cc = courtsCircuits(R);
      const francs = cc.filter(c => c.franc);
      if (francs.length) {
        const n = francs.length;
        const aide = armees().filter(q => courtsCircuits(resoudre(new Set([q]))).filter(c => c.franc).length < n);
        const q = laPlusProche(aide);
        const sus = suspects(R2 => courtsCircuits(R2).filter(c => c.franc).length);
        if (q) declencher(q, 'court-circuit ' + francs[0].nature, sus);
        else { coupure = true; noter('Court-circuit ' + francs[0].nature + ' avant toute protection : le disjoncteur de l’atelier saute.', 'defaut'); journal[journal.length - 1].suspects = sus; }
        continue;
      }
      for (const c of cc) {   // neutre et terre reliés : seul un différentiel le voit
        const aide = armees(a => DIFFERENTIEL.test(a.type)).filter(q => courtsCircuits(resoudre(new Set([q]))).length < cc.length);
        if (aide.length) { declencher(laPlusProche(aide), 'le neutre touche la terre', suspects(R2 => courtsCircuits(R2).length)); break; }
        signaler('N-PE' + c.bornes[0], 'Le neutre touche la terre : interdit, même si rien ne déclenche.');
      }
      let change = false;
      for (const a of APP) {
        const s = S[a.repere];
        if (s.role !== 'bobine') continue;
        const v = tension(R, a.repere + ':A1', a.repere + ':A2');
        if (v === 400 && !s.grillee) { s.grillee = true; change = true; noter(a.repere + ' : bobine sous 400 V, elle grille.', 'defaut'); }
        if (v === 'PE') {
          const aide = armees(x => DIFFERENTIEL.test(x.type)).filter(q => tension(resoudre(new Set([q])), a.repere + ':A1', a.repere + ':A2') !== 'PE');
          if (aide.length) { declencher(laPlusProche(aide), 'la bobine de ' + a.repere + ' revient par la terre'); change = true; continue; }
          signaler('PE' + a.repere, 'La bobine de ' + a.repere + ' revient par la terre au lieu du neutre : interdit.');
        }
        const alim = (v === 230 || v === 'PE') && !s.grillee;
        if (alim !== !!s.alim) {
          s.alim = alim; s.t = 0; change = true;
          if (a.type === 'telerupteur' && alim) s.bascule = !s.bascule;
          if (!s.force) noter(a.repere + (a.type === 'moteur_horloge' ? (alim ? ' alimentée.' : ' coupée.') : alim ? ' colle.' : ' retombe.'));
        }
      }
      if (!change) return R;
      const sig = APP.filter(a => S[a.repere].role === 'bobine').map(a => S[a.repere].alim ? 1 : 0).join('') + APP.map(a => S[a.repere].declenche ? 1 : 0).join('');
      if (signatures.includes(sig)) {
        signaler('pompage', 'Ça bat : ' + APP.filter(a => S[a.repere].role === 'bobine').map(a => a.repere).join(', ') + ' collent et retombent sans fin (pompage).');
        return R;
      }
      signatures.push(sig);
    }
    return resoudre();
  }

  /* Ce que font les récepteurs sous la tension trouvée. */
  function moteur(R, a) {
    const ids = a.bornes.map(b => b.id);
    const p = x => un(R, a.repere + ':' + x);
    const sens = trio => (ORDRE[trio[1]] - ORDRE[trio[0]] + 3) % 3 === 1 ? 'direct' : 'inverse';
    const trois = trio => trio.every(x => ORDRE[x] !== undefined) && new Set(trio).size === 3;
    const debut = ['U1', 'V1', 'W1'].map(p), fin = ['U2', 'V2', 'W2'].map(p);
    const ph = arr => new Set(arr.filter(phase)).size;
    if (!ids.includes('U2')) {
      if (trois(debut)) return { marche: 'tourne', sens: sens(debut), texte: 'tourne, sens ' + sens(debut) };
      return ph(debut) >= 1 && ph(debut) < 3 && debut.filter(phase).length >= 2 ? { marche: 'ronfle', texte: 'ronfle sans démarrer : il lui manque une phase' } : { marche: 'arret', texte: 'à l’arrêt' };
    }
    const meme = refs => new Set(refs.map(x => R.racine(a.repere + ':' + x))).size === 1;
    const libre = arr => arr.every(x => !x);
    if (trois(debut) && libre(fin) && meme(['U2', 'V2', 'W2'])) return { marche: 'tourne', sens: sens(debut), couplage: 'étoile', texte: 'tourne en étoile, sens ' + sens(debut) };
    if (trois(debut) && trois(fin) && ['U', 'V', 'W'].every((_, i) => debut[i] !== fin[i])) return { marche: 'tourne', sens: sens(debut), couplage: 'triangle', texte: 'tourne en triangle, sens ' + sens(debut) };
    if (a.type === 'dahlander_motor_6_terminals') {
      if (trois(debut) && libre(fin) && !meme(['U2', 'V2', 'W2'])) return { marche: 'tourne', sens: sens(debut), couplage: 'petite vitesse', texte: 'tourne en petite vitesse, sens ' + sens(debut) };
      if (trois(fin) && libre(debut) && meme(['U1', 'V1', 'W1'])) return { marche: 'tourne', sens: sens(fin), couplage: 'grande vitesse', texte: 'tourne en grande vitesse, sens ' + sens(fin) };
    }
    if (debut.concat(fin).some(phase)) return { marche: 'ronfle', texte: 'ronfle sans démarrer : ses enroulements ne sont pas bien alimentés' };
    return { marche: 'arret', texte: 'à l’arrêt' };
  }
  const VERBE = { lampe2: ['allumée', 'éteinte'], electrovanne: ['ouverte', 'fermée'], 'resistances-chauffantes': ['chauffe', 'froide'],
    'motor-mono-2': ['tourne', 'à l’arrêt'], moteur_mono: ['tourne', 'à l’arrêt'] };

  let dernier = null;
  /* Récepteurs en étoile sans neutre (résistances de dégivrage) : un bout sur une phase, l'autre sur un point commun
     flottant que d'autres récepteurs relient à au moins une autre phase — le courant passe, 230 V en étoile équilibrée. */
  function etoile(R, a, x, y) {
    for (const [p, f] of [[x, y], [y, x]]) {
      const ph = un(R, a.repere + ':' + p), noeud = R.racine(a.repere + ':' + f);
      if (!phase(ph) || R.pots(a.repere + ':' + f).size) continue;
      const autres = new Set();
      for (const b of APP) {
        if (b === a || S[b.repere].role !== 'recepteur') continue;
        const [bx, by] = RECEPTEUR[b.type];
        for (const [q, g] of [[bx, by], [by, bx]])
          if (R.racine(b.repere + ':' + g) === noeud) { const pq = un(R, b.repere + ':' + q); if (phase(pq) && pq !== ph) autres.add(pq); }
      }
      if (autres.size) return 230;
    }
    return 0;
  }
  function bilan(R) {
    const appareils = {};
    for (const a of APP) {
      const s = S[a.repere];
      if (s.role === 'moteur') appareils[a.repere] = moteur(R, a);
      else if (s.role === 'recepteur') {
        const [x, y] = RECEPTEUR[a.type];
        let v = tension(R, a.repere + ':' + x, a.repere + ':' + y);
        if (!v) v = etoile(R, a, x, y);
        if (v === 400) signaler('400' + a.repere, a.repere + ' sous 400 V : il n’est pas fait pour, il grille.');
        if (v === 'PE') signaler('PE' + a.repere, a.repere + ' revient par la terre au lieu du neutre : interdit.');
        appareils[a.repere] = { marche: v ? 'oui' : 'non', texte: VERBE[a.type][v ? 0 : 1] };
      } else if (s.role === 'bobine') appareils[a.repere] = { colle: (!!s.alim && !s.grillee) || !!s.force, force: !!s.force, grillee: !!s.grillee, texte: s.grillee ? 'bobine grillée' : s.force ? 'fermé à la main' : a.type === 'moteur_horloge' ? (s.alim ? 'alimentée' : 'coupée') + (s.periode ? ', en dégivrage' : '') : s.alim ? 'collé' : 'au repos' };
      else if (s.role === 'protection') appareils[a.repere] = { enclenche: !!s.enclenche, declenche: !!s.declenche, texte: s.declenche ? 'déclenché' : s.enclenche ? 'enclenché' : 'ouvert' };
      else if (s.role === 'thermique') appareils[a.repere] = { declenche: !!s.declenche, texte: s.declenche ? 'déclenché' : 'armé' };
      else if (s.role === 'bouton') appareils[a.repere] = { appuye: !!s.appuye, texte: s.appuye ? 'appuyé' : 'relâché' };
      else if (s.role === 'capteur') appareils[a.repere] = { texte: a.type === 'con_simple' ? ['arrêt', '1er étage', '2e étage'][s.etage || 0] : a.type === 'contnonc' ? (s.actionne ? 'actionné (1-4)' : 'au repos (1-2)') : (s.ferme ? 'fermé' : 'ouvert') };
    }
    for (const [r, v] of Object.entries(appareils)) {   // le journal suit les récepteurs
      const s = S[r].role;
      if ((s === 'moteur' || s === 'recepteur') && recepteursAvant[r] !== undefined && recepteursAvant[r] !== v.texte) noter(r + ' ' + v.texte + '.');
      recepteursAvant[r] = v.texte;
    }
    const bornes = {};
    for (const ref of REFS) { const p = R.pots(ref); bornes[ref] = p.size === 1 ? [...p][0] : p.size ? 'défaut' : null; }
    dernier = { t, coupure, bornes, appareils, journal: journal.slice(), defauts: journal.filter(j => j.gravite === 'defaut').map(j => j.texte) };
    return dernier;
  }

  function agir(action) {
    const { rep, geste } = action;
    if (geste === 'consigner') {   // tout ouvrir, disjoncteur de l'atelier réarmé
      for (const a of APP) { const s = S[a.repere]; if (s.role === 'protection') { s.enclenche = false; s.declenche = false; } }
      coupure = false; noter('Installation consignée : toutes les protections ouvertes.');
    } else {
      const s = S[rep];
      if (!s) throw new Error('Appareil inconnu : ' + rep);
      const a = APP.find(x => x.repere === rep);
      if (geste === 'enclencher') { s.enclenche = true; s.declenche = false; noter(rep + ' enclenché.'); }
      else if (geste === 'ouvrir') { s.enclenche = false; noter(rep + ' ouvert.'); }
      else if (geste === 'appuyer') { s.appuye = true; noter(rep + ' appuyé.'); }
      else if (geste === 'relacher') { s.appuye = false; noter(rep + ' relâché.'); }
      else if (geste === 'basculer') {
        if (a.type === 'con_simple') s.etage = ((s.etage || 0) + 1) % 3;
        else if (a.type === 'contnonc') s.actionne = !s.actionne;
        else if (a.type === 'moteur_horloge') s.periode = !s.periode;
        else s.ferme = !s.ferme;
        noter(rep + ' basculé.');
      }
      else if (geste === 'declencher') { s.declenche = true; noter(rep + ' déclenché à la main (essai de la sécurité).'); }
      else if (geste === 'rearmer') { s.declenche = false; if (s.role === 'protection') s.enclenche = false; noter(rep + ' réarmé.'); }
      else if (geste === 'forcer') { s.force = !s.force; noter(rep + (s.force ? ' fermé à la main (poussoir de test).' : ' relâché (poussoir de test).')); }
      else throw new Error('Geste inconnu : ' + geste);
    }
    return bilan(stabiliser());
  }
  function avancer(ms) {
    for (let fait = 0; fait < ms; fait += PAS) {
      const dt = Math.min(PAS, ms - fait);
      t += dt;
      for (const a of APP) { const s = S[a.repere]; if (s.role === 'bobine' && s.alim) s.t = (s.t || 0) + dt; }
      bilan(stabiliser());   // le journal des récepteurs suit le temps
    }
    return bilan(stabiliser());
  }

  const R0 = stabiliser();
  recepteursAvant = {};
  bilan(R0);
  return { agir, avancer, etat: () => dernier, roles: () => Object.fromEntries(APP.map(a => [a.repere, S[a.repere].role])) };
}

const API = { creer, role };
if (typeof module !== 'undefined' && module.exports) module.exports = API;
if (typeof window !== 'undefined') window.CABLAGE_TENSION = API;
})();

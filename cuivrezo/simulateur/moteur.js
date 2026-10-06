/* Moteur commun des jeux de poste de CuivRézo (2.3 le chalumeau, 3.3 l'azote) : étapes, questions, fautes,
   bilan, commandes (appui long), loupe des manomètres, son, temps qui passe.
   CONTRAT : Moteur.lancer(api => jeu). Le jeu rend
     { neuf(niveau) → état S, etapes, scene() → SVG du poste, code (préfixe du code professeur), revoir(faute) → id de
       station à revoir, sansFaute (phrase du bilan), jauges (positions et textes de la loupe),
       physique?() → true si à redessiner, tic?() → idem, son?(), repere?(cible) → id de la ligne de commande }.
   L'état S appartient au jeu (neuf le crée) ; le moteur y range i (étape), q (question en cours), fautes, deja, halo.
   Une étape = { id, temps, niveau2?, petit, titre, zoom() → { vb, svg } | { html }, ui(), act(a, v), cible(c),
   entrer(), tic() } ; petit et titre peuvent être des fonctions. */
window.Moteur = (() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const borne = (v, a, b) => Math.max(a, Math.min(b, v));
  const maj = t => t.charAt(0).toUpperCase() + t.slice(1);
  const bar = v => (Math.round(v * 100) / 100).toString().replace('.', ',');
  const melanger = l => l.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(v => v[1]);
  let S, J;
  const E = () => J.etapes[S.i];
  const titreDe = e => typeof e.titre === 'function' ? e.titre.call(e) : e.titre;
  const petitDe = e => typeof e.petit === 'function' ? e.petit.call(e) : e.petit;

  /* ---------- messages, fautes, questions ---------- */
  function dire(html, ton) { const m = $('message'); m.className = 'message' + (ton ? ' ' + ton : ''); m.innerHTML = html; }
  function faute(cle, texte, grave) {
    if (S.deja[cle]) return false;
    S.deja[cle] = true; S.fautes.push({ texte, grave: !!grave, temps: E().temps });
    return true;
  }
  const btn = (t, act, v = '', cls = '', rep = false) => `<button class="${cls}" data-act="${act}" data-v="${v}"${rep ? ' data-repete' : ''}>${t}</button>`;
  const suite = (t = 'Continuer') => `<div class="ligne-suite">${btn(t + ' →', 'suite', '', 'btn-plein')}</div>`;
  const texte = html => ({ html });
  function choix(liste, cle = 'c') {
    const faux = S.q['faux' + cle] || [], bon = S.q['bon' + cle];
    return `<div class="choix">${liste.map((c, i) => {
      const etat = bon === i ? ' juste' : faux.includes(i) ? ' faux' : '';
      return `<button class="${etat}" data-act="choix" data-v="${cle}:${i}"${bon != null ? ' disabled' : ''}>${c.t}</button>`;
    }).join('')}</div>`;
  }
  /* question : un clic juste clôt la question ; un clic faux compte une faute (une fois) et explique */
  function repondre(liste, cle, i, apres) {
    const c = liste[i];
    if (c.ok) { S.q['bon' + cle] = i; dire(`<p><b>Oui.</b> ${c.pourquoi}</p>`, 'ok'); if (apres) apres(); }
    else {
      (S.q['faux' + cle] = S.q['faux' + cle] || []).push(i);
      faute(E().id + ':' + cle, c.faute || c.t, c.grave);
      dire(`<p><b>${c.grave ? 'Danger.' : 'Non.'}</b> ${c.pourquoi}</p>`, 'bad');
    }
  }
  function terminer() {
    S.fin = true;
    const n = S.fautes.length, g = S.fautes.filter(f => f.grave).length;
    const code = `${J.code}-${S.niveau}-${n}-${g}-${(S.niveau * 31 + n * 7 + g * 13 + 5) % 97}`;
    const revoir = [...new Set(S.fautes.map(J.revoir).filter(Boolean))];
    avancer(true);
    dire(`<div class="bilan"><p>${n ? `<b>${n} faute${n > 1 ? 's' : ''}</b>${g ? `, dont ${g} grave${g > 1 ? 's' : ''}` : ''} :` : `<b>Aucune faute.</b> ${J.sansFaute}`}</p>
      ${n ? '<ul>' + S.fautes.map(f => `<li${f.grave ? ' class="grave"' : ''}>${f.texte}${f.grave ? ' (grave)' : ''}</li>`).join('') + '</ul>' : ''}
      <p>Code pour le professeur : <span class="code">${code}</span></p>
      ${revoir.length ? `<p>À revoir : ${revoir.map(s => `<a href="../stations/${s}/index.html">station ${s.replace('-', '.')}</a>`).join(' · ')}</p>` : ''}</div>`, n ? 'wait' : 'ok');
  }

  /* ---------- la mécanique des étapes ---------- */
  function nouveau(niveau) {
    S = J.neuf(niveau);
    Object.assign(S, { niveau, i: 0, q: {}, fautes: [], deja: {}, halo: [], fin: false });
  }
  function avancer(garderMessage) {
    do S.i++; while (J.etapes[S.i] && J.etapes[S.i].niveau2 && S.niveau !== 2);
    S.q = {}; S.halo = [];
    const e = E();
    if (e.entrer) e.entrer();
    if (!garderMessage) dire(`<p>${petitDe(e) || ''}</p>`);
    afficher(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function dessiner() {
    $('scene').innerHTML = J.scene();
    const z = E().zoom ? E().zoom() : null, boite = $('zoom');
    if (z && z.html != null) boite.innerHTML = `<div class="zoom-texte">${z.html}</div>`;
    else if (z) boite.innerHTML = `<svg viewBox="${z.vb}" role="img" aria-label="Vue de près">${z.svg}</svg>`;
    $('sc-fautes').textContent = `Fautes : ${S.fautes.length}`;
    if (J.son) J.son();
  }
  function afficher(complet) {
    const e = E();
    $('c-petit').textContent = petitDe(e) || '';
    $('c-titre').textContent = titreDe(e) || '';
    document.querySelectorAll('#etapes li').forEach(li => {
      const t = +li.dataset.t;
      li.className = t < e.temps ? 'faite' : t === e.temps ? 'active' : '';
    });
    if (complet) $('actions').innerHTML = e.ui ? e.ui() : '';
    dessiner();
  }

  /* ---------- les commandes ---------- */
  function agir(a, v, el) {
    Son.init();
    const e = E();
    if (a === 'niveau') { nouveau(+v); return avancer(); }
    if (a === 'suite') return avancer();
    if (e.act) e.act(a, v, el);
    if (el && el.hasAttribute('data-repete')) dessiner(); else afficher(true);
  }
  function brancher() {
    const actions = $('actions');
    let tempo = null, repete = null;
    const arret = () => { clearTimeout(tempo); clearInterval(repete); tempo = repete = null; };
    actions.addEventListener('pointerdown', ev => {
      const b = ev.target.closest('button[data-repete]'); if (!b) return;
      ev.preventDefault();
      agir(b.dataset.act, b.dataset.v, b);
      tempo = setTimeout(() => { repete = setInterval(() => agir(b.dataset.act, b.dataset.v, b), 150); }, 400);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => document.addEventListener(t, arret));
    actions.addEventListener('click', ev => {
      const b = ev.target.closest('button[data-act]'); if (!b || b.disabled) return;
      if (b.hasAttribute('data-repete') && ev.detail !== 0) return; // déjà traité au pointerdown (souris, doigt)
      agir(b.dataset.act, b.dataset.v, b);
    });
    /* une cible touchée sur le poste ou dans la vue de près : l'étape la traite ; sinon, une commande se repère */
    const toucher = ev => {
      const c = ev.target.closest('[data-cible]'), e = E();
      if (c && e.cible) { Son.init(); e.cible.call(e, c.dataset.cible); afficher(true); return true; }
      const l = c && J.repere ? $(J.repere(c.dataset.cible) || '') : null;
      if (l) { document.querySelectorAll('.robinet').forEach(x => x.classList.toggle('repere', x === l)); l.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); return true; }
      return !!c;
    };
    $('scene').addEventListener('click', ev => {
      if (toucher(ev)) return;
      const j = ev.target.closest('.jauge');
      if (j) loupe(j.dataset.j);
    });
    $('zoom').addEventListener('click', toucher);
    function loupe(id) {
      const j = J.jauges[id], m = j.r ? j.r + 8 : 44;
      $('loupe-svg').setAttribute('viewBox', `${j.cx - m} ${j.cy - m} ${2 * m} ${2 * m}`);
      $('loupe-txt').textContent = j.txt;
      $('loupe').classList.add('ouverte'); $('loupe-fermer').focus();
    }
    const fermerLoupe = () => $('loupe').classList.remove('ouverte');
    $('loupe-fermer').addEventListener('click', fermerLoupe);
    $('loupe').addEventListener('click', e => { if (e.target === $('loupe')) fermerLoupe(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') fermerLoupe(); });
    $('son').addEventListener('click', () => { const oui = Son.basculer(); $('son').textContent = 'Son : ' + (oui ? 'oui' : 'non'); $('son').setAttribute('aria-pressed', oui); dessiner(); });
    $('recommencer').addEventListener('click', () => { nouveau(1); dire('<p>Choisissez votre niveau.</p>'); afficher(true); });
    /* le temps qui passe : pressions, étapes qui attendent un état */
    setInterval(() => {
      let redessiner = J.physique ? J.physique() : false;
      if (J.tic && J.tic()) redessiner = true;
      const e = E();
      if (e.tic) e.tic();
      if (redessiner) dessiner();
    }, 100);
  }

  const api = { get S() { return S; }, E, dire, faute, btn, suite, texte, choix, repondre, terminer, avancer, afficher, dessiner, borne, maj, bar, melanger };
  return {
    lancer(fabrique) {
      J = fabrique(api);
      nouveau(1); brancher(); afficher(true);
      window.__jeu = { get S() { return S; }, ETAPES: J.etapes }; // pour la vérification automatique
    }
  };
})();

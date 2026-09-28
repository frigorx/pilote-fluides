/* L'écran adaptatif (Franck, 28/09/2026, sur le PC-tablette de la classe : « ça reste très petit, il faut pouvoir mettre
   l'exercice en grand, passer du schéma de principe au réel d'un appui, imprimer la feuille facilement, adaptable
   automatiquement selon l'écran »).
   - Trois affichages : la carte seule, la platine seule, les deux côte à côte. Un petit écran (moins de 1200 px de large
     ou de 800 px de haut, navigateur déduit) part sur la platine seule ; un grand écran sur les deux ; l'élève change quand il veut, son choix
     est gardé sur l'appareil. Sur un seul panneau, un gros bouton en tête du panneau bascule vers l'autre.
   - Plein écran (le navigateur s'efface) : bouton ⛶ du bandeau.
   - Sur un seul panneau, la nomenclature se replie derrière le bouton « Repères » et la consigne se resserre.
   - La feuille élève (PDF) s'ouvre depuis la consigne : 📄 Feuille (exercices/documents.js dit laquelle).
   Le deuxième écran (vue=carte) et les temps Colorier / Repérer (la carte seule, déjà) ne sont pas concernés. */
(function () {
'use strict';
const $ = s => document.querySelector(s);
const CLE = 'cablage-virtuel:affichage';
const PETIT = () => window.innerWidth < 1200 || window.innerHeight < 800;   // le PC-tablette de la classe (1366 × 768, moins le navigateur) est petit

let fait = false;
document.addEventListener('cablage-pret', demarrer);
if (document.querySelector('#platine-corps svg')) demarrer();   // l'exercice était déjà là (rechargement servi du cache)
function demarrer() {
  if (fait) return; fait = true;
  const API = window.CABLAGE_API;
  if (!API || API.vue === 'carte') return;
  const EX = API.ex(), ID = EX && EX.id;
  const surCarte = document.body.classList.contains('sur-carte');

  // ---- la feuille élève, à imprimer
  const docs = window.CABLAGE_DOCUMENTS || {}, d = ID && docs[ID], bf = $('#btn-feuille');
  if (bf && d) { bf.href = d.eleve; bf.hidden = false; bf.title = d.nom + ' — s’ouvre dans un nouvel onglet, pour imprimer'; }

  // ---- plein écran
  const barre = $('.barre');
  const pe = document.createElement('button');
  pe.id = 'btn-plein-ecran'; pe.className = 'plein-ecran'; pe.textContent = '⛶'; pe.title = 'Plein écran';
  pe.onclick = () => { if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); };
  document.addEventListener('fullscreenchange', () => { pe.classList.toggle('actif', !!document.fullscreenElement); pe.title = document.fullscreenElement ? 'Quitter le plein écran' : 'Plein écran'; });
  barre.appendChild(pe);
  if (surCarte) return;   // colorier, repérer : la carte est seule, rien d'autre à choisir

  // ---- les trois affichages
  const nav = document.createElement('nav'); nav.className = 'modes vues'; nav.id = 'vues'; nav.setAttribute('aria-label', 'Affichage');
  const VUES = [['carte', 'Carte'], ['platine', 'Platine'], ['deux', 'Les deux']];
  VUES.forEach(([v, nom]) => { const b = document.createElement('button'); b.dataset.vue = v; b.textContent = nom; b.onclick = () => choisir(v, true); nav.appendChild(b); });
  barre.insertBefore(nav, pe);
  const rep = document.createElement('button'); rep.id = 'btn-reperes'; rep.textContent = 'Repères'; rep.title = 'La nomenclature : repère et nom de chaque appareil';
  rep.onclick = () => { document.body.classList.toggle('montre-reperes'); rep.classList.toggle('actif', document.body.classList.contains('montre-reperes')); };
  barre.insertBefore(rep, pe);
  // le gros bouton de bascule, en tête de chaque panneau
  const bascule = (panneau, versVue, texte) => {
    const b = document.createElement('button'); b.className = 'basculer'; b.textContent = texte; b.onclick = () => choisir(versVue, true);
    const entete = panneau.querySelector('.entete'); entete.insertBefore(b, entete.querySelector('.spacer').nextSibling);
  };
  bascule($('#carte'), 'platine', 'Platine ›');
  bascule($('#platine'), 'carte', '‹ Carte');

  let manuel = null;
  try { manuel = localStorage.getItem(CLE); } catch (err) { manuel = null; }
  function choisir(v, aLaMain) {
    if (!VUES.some(x => x[0] === v)) v = 'deux';
    document.body.classList.remove('vue-carte-seule', 'vue-platine', 'un-panneau');
    if (v === 'carte') document.body.classList.add('vue-carte-seule', 'un-panneau');
    if (v === 'platine') document.body.classList.add('vue-platine', 'un-panneau');
    nav.querySelectorAll('button').forEach(b => b.classList.toggle('actif', b.dataset.vue === v));
    if (aLaMain) { manuel = v; try { localStorage.setItem(CLE, v); } catch (err) { /* stockage indisponible */ } }
    // le panneau qui reste prend toute la scène : on le recadre
    requestAnimationFrame(() => {
      const ids = v === 'carte' ? ['#carte'] : v === 'platine' ? ['#platine'] : ['#carte', '#platine'];
      ids.forEach(s => { const b = $(s + ' button[data-zoom="ajuster"]'); if (b) b.click(); });
      window.dispatchEvent(new Event('resize'));
    });
  }
  choisir(manuel || (PETIT() ? 'platine' : 'deux'), false);
  let large = !PETIT();
  window.addEventListener('resize', () => {   // l'écran change (rotation, fenêtre) : sans choix de l'élève, on suit
    const l = !PETIT(); if (l === large) return; large = l;
    if (!manuel) choisir(l ? 'deux' : 'platine', false);
  });
  window.CABLAGE_ECRAN = { choisir, vue: () => VUES.map(x => x[0]).find(v => nav.querySelector('button[data-vue="' + v + '"].actif')) || 'deux' };
}
})();

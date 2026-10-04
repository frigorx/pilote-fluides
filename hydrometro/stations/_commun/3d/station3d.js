/* HydroMétro — brancher une vue 3D dans la scène d'une étape de station.

   Dans content.js, une étape garde sa scène dessinée (le SVG) et ajoute :
     wire: el => HydroVue3D.brancher(el, { modele: 'circulateur', titre: 'Le circulateur en 3D' })
   (le petit chargeur en tête de content.js charge ce fichier à la demande).

   Le dessin n'est pas perdu : il devient l'onglet « En schéma », il revient seul si la 3D
   échoue (pas de WebGL), et c'est lui qui sort à l'impression.
   Option schema: false — la 3D dans son propre panneau, À CÔTÉ du schéma (pas d'onglet). */
(() => {
  'use strict';
  if (window.HydroVue3D) return;
  const SRC = (document.currentScript && document.currentScript.src) || '';
  const BASE = SRC.replace(/station3d\.js(\?.*)?$/, '');
  const Q = (SRC.match(/\?.*$/) || [''])[0];
  const charger = src => new Promise((ok, ko) => {
    const s = document.createElement('script'); s.src = src; s.onload = ok;
    s.onerror = () => ko(new Error('chargement impossible : ' + src));
    document.head.appendChild(s);
  });
  let moteur = null;
  const assurerMoteur = () => moteur || (moteur = (async () => {
    if (!window.Electro3D) await charger(BASE + 'electro3d.js' + Q);
    if (!window.Electro3DKit) await charger(BASE + 'kit.js' + Q);
  })());

  const brancher = async (scene, o) => {
    const dessin = scene.innerHTML;
    const jeton = Math.random().toString(36).slice(2);
    scene.dataset.vue3d = jeton;
    try { await assurerMoteur(); } catch (e) { return; }      /* hors ligne sans copie : le dessin reste */
    /* l'élève a déjà changé d'étape (la scène a été redessinée, ou une autre vue 3D demandée) */
    if (scene.dataset.vue3d !== jeton || scene.innerHTML !== dessin) return;
    const bloc = window.Electro3D.bloc({
      modele: o.modele, mode: o.mode || 'comprendre', options: o.options || null, titre: o.titre,
      /* schema: false — la 3D a son propre panneau, le schéma reste à côté (Boucle, 04/10/2026) */
      schema: o.schema === false ? null : () => { const d = document.createElement('div'); d.innerHTML = dessin; return d; },
      defaut: o.defaut || null, choisir: o.piece || null
    });
    scene.innerHTML = '';
    scene.appendChild(bloc);
  };

  window.HydroVue3D = { brancher };
})();

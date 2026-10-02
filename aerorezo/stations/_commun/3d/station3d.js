/* AéroRézo — poser la vue 3D d'un appareil dans une station (moteur repris d'HydroMétro).

   app.js réserve un emplacement vide au temps Comprendre, puis :
     AeroVue3D.brancher(hote, { modele: 'cta', titre: 'La centrale en 3D', schema: '<svg…>' })

   Le dessin de la station n'est pas perdu : il devient l'onglet « En schéma », et c'est lui
   qui sort à l'impression. Si la 3D ne peut pas s'ouvrir (page ouverte en file://, pas de
   WebGL), l'emplacement disparaît : le temps Comprendre reste tel qu'il était. */
(() => {
  'use strict';
  if (window.AeroVue3D) return;
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

  const brancher = async (hote, o) => {
    /* en file://, le navigateur refuse le module Three.js : inutile de rien charger */
    if (location.protocol === 'file:') { hote.remove(); return; }
    try { await assurerMoteur(); } catch (e) { hote.remove(); return; }
    /* l'élève a déjà changé de temps ou de station pendant le chargement */
    if (!hote.isConnected) return;
    const bloc = window.Electro3D.bloc({
      modele: o.modele, mode: 'comprendre', options: o.options || null, titre: o.titre,
      schema: o.schema ? () => { const d = document.createElement('div'); d.innerHTML = o.schema; return d; } : null,
      defaut: o.defaut || null, choisir: o.piece || null
    });
    bloc.addEventListener('e3d-repli', () => bloc.remove());
    hote.replaceWith(bloc);
  };

  window.AeroVue3D = { brancher };
})();

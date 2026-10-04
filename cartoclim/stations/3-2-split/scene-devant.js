/* CartoClim 3.2 — pilote « Animer les réseaux » (04/10/2026) : au temps 1, la scène dessinée passe
   DEVANT les photos (le dessin colle, la photo illustre). Les photos, les textes et la voix ne changent
   pas ; le temps 2 garde sa scène, là où sa voix l'attend (« Appuyez sur Dérouler »).
   Le modèle commun (_commun/modele-appareil.js) n'est pas touché : on enveloppe ici le montage du
   temps 1, pour cette station seulement. Mise en page : scene-devant.css. */
(() => {
  'use strict';
  const demarrer = Station.demarrer;
  Station.demarrer = contenu => {
    const t1 = contenu.temps.find(t => t.id === 'decouvrir');
    if (t1) {
      const monter = t1.monter;
      let premier = true;
      t1.monter = (hote, ctx) => {
        const carte = document.createElement('section');
        carte.className = 'card scene-devant';
        carte.appendChild(ScenesStation.trajetDeLaChaleur());
        hote.appendChild(carte);
        monter(hote, ctx);
        /* à l'ouverture, le moteur aligne le haut du temps sur l'écran (scrollIntoView) : le temps 1,
           plus haut que l'écran, ferait filer l'en-tête de la station. On garde le haut de page. */
        if (premier) { premier = false; requestAnimationFrame(() => window.scrollTo(0, 0)); }
      };
    }
    return demarrer(contenu);
  };
})();

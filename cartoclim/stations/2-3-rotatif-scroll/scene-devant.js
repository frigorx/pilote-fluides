/* CartoClim 2.3 — « Animer les réseaux » (04/10/2026), d'après le pilote 3.2 : au temps 1, la scène dessinée
   passe DEVANT les photos (le dessin colle, la photo illustre). Deux compresseurs, deux pas à pas : le scroll
   d'abord (son mouvement est le plus facile à suivre, dit la voix du temps 2), et une bascule « Le scroll /
   Le rotatif », sous les pas, pour passer à l'autre — un seul dessin à la fois, pour que tout tienne
   au-dessus de la ligne de flottaison. Les photos, les textes et la voix ne changent pas ; le temps 2 garde
   ses deux scènes, l'une sous l'autre, là où sa voix les attend (« Appuyez sur Dérouler »).
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
        let quel = 'scroll';
        const poser = focus => {
          const pas = quel === 'scroll' ? ScenesStation.scrollPasAPas() : ScenesStation.rotatifPasAPas();
          const bascule = document.createElement('div');
          bascule.className = 'choix bascule';
          [['scroll', 'Le scroll'], ['rotatif', 'Le rotatif']].forEach(([id, libelle]) => {
            const b = document.createElement('button');
            b.type = 'button'; b.textContent = libelle;
            b.setAttribute('aria-pressed', String(id === quel));
            b.addEventListener('click', () => { if (id !== quel) { quel = id; poser(true); } });
            bascule.appendChild(b);
          });
          pas.querySelector('.choix').after(bascule);
          carte.replaceChildren(pas);
          if (focus) bascule.querySelector('[aria-pressed="true"]').focus();
        };
        poser(false);
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

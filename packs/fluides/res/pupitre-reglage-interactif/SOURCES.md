# Sources — Le pupitre de réglage

Symboles consultés le 4 octobre 2026 ; le contenu des écrans n’a pas été touché.

## Référentiel

- Référence du module (`couverture.json`, inchangé) : règlement d’exécution
  (UE) 2024/2215, annexe I — codes 9.04, 9.06 et 7.04, détaillés écran par écran.

## Symboles du dessin (scene-geste.js, 04/10/2026)

- Façade du thermostat à bulbe (molette de consigne, coulisseau, bulbe) :
  `symboles/termostato-bulbo2.svg`, copie sans retouche de la collection
  QElectroTech convertie
  (`C:/git/bibliotheque-symboles-energie/svg/60_energy/11_water/01_Termicas-Fluidos2_Rafa/Calefaccion/equipos-calefaccion/controles-cal/termostato-bulbo2.svg`).
  Son fond blanc s’efface sur le papier (mélange « multiply ») ; la vue de près
  est rognée par un `<svg>` imbriqué, le fichier n’est pas modifié.
- Compresseur : `../symboles/compresseur_general.svg`, bibliothèque curée de
  F. Henninot, déjà sur le site.
- Étape 6 (« en pression ») : pressostats `../symboles/pressostat_bp.svg` et
  `pressostat_hp.svg`, ventilateur `../symboles/ventilateur.svg`, bibliothèque
  curée de F. Henninot, déjà sur le site, sans retouche.
- Manomètre de l'étape 6 : copie, dans `scene-geste.js`, de `manometre()` de
  `../surchauffe-sous-refroidissement-interactif/scene-mesure.js` (original non
  modifié ; générateur validé `generer-interro-03-manometres.py` : bague BP bleue /
  HP rouge, traits de pression, chiffre ôté sous l'aiguille). Adaptations : la
  couronne du R-134a est ôtée (le pupitre ne cite aucun fluide) ; échelle du
  simulateur Régler 3 (0 à 4 bar) ; cadran du condenseur sans aucun chiffre ;
  l'aiguille suit la pression exacte (pas de lissage par image) ; deux repères
  (arrêt, redémarrage ou marche) et le trait lu s'allume à chaque bascule.
- Le technicien : bonhomme de HoCourant, repris de `legislation/scenes/fluidique.js`.
- Thermomètre électronique (boîtier, afficheur, sonde) : dessiné d’après le
  modèle validé `mano-thermo-distincts.svg`
  (`habilitation-fluide/formation-presentielle/supports-projection/sources-images/`,
  validé par F. Henninot le 13/08/2026). Seul l’afficheur est vivant : le
  thermomètre numérique de la bibliothèque a des segments figés, aucun symbole
  de la collection ne permet d’y lire une valeur qui change.
- Courbe, lignes d’arrêt et de relance, flèches du geste, pastilles : tracés
  calculés par le code, pas des symboles.

Mention (licence CC BY 3.0 des symboles QElectroTech) : symboles issus de la
collection d’éléments **QElectroTech** (<https://qelectrotech.org/>), publiée
sous [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/),
convertis en SVG par F. Henninot. Licence des éléments :
<https://qelectrotech.org/wiki_new/doc/elements_license>

## Limites

Les températures affichées par le thermomètre du dessin (arrêt, relance) sont
des valeurs d’exercice : celles du simulateur de l’écran « Régler 1 »
(arrêt du froid à 2 °C, relance à 5 °C). Sur une machine réelle, la notice et
les conditions de l’installation font foi, et le point d’action se prouve à
l’instrument. La courbe est un modèle qualitatif (pentes d’exercice), pas une
mesure.

Étape 6 : l'aiguille du manomètre BP s'arrête aux repères 0,6 bar (arrêt) et
1,4 bar (redémarrage), valeurs du simulateur de l'écran « Régler 3 » ; les
repères de départ (avant le geste de la main) ne sont pas chiffrés. Côté
condenseur, l'écran « Régler 5 » ne donne aucun chiffre : le cadran n'en porte
aucun. Le pressostat qui étage les ventilateurs est un pressostat de contrôle :
la sécurité haute pression, elle, n'est jamais réglée dans le dessin.

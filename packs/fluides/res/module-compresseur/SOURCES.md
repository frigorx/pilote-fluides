# Sources — Module Compresseur Frigorifique

Production originale inerWeb Édu, créée pour les élèves de F. Henninot dans le portail
FRIGOLO (`C:\git\inerweb-frigolo\outils\module-compresseur.html`), **ré-exploitée dans le
pack le 14/08/2026 sur sa consigne** (« on avait fait une grosse chose où on voyait le
volume balayé — le retrouver et le ré-exploiter »).

- Tout le visuel est du SVG et du HTML/CSS écrits dans le fichier — aucun média tiers,
  aucune dépendance distante (vérifié : zéro `src`/`href` en `https://`).
- `document-eleve-compresseur.html` : la feuille de résultats imprimable qui l'accompagne.
- Copie du portail FRIGOLO : une correction de fond se fait DANS FRIGOLO d'abord,
  puis se recopie ici — deux publics, une seule vérité.
- Six sections : intro · types · fonctionnement · volume (balayé) · rendement
  (volumétrique) · température (la compression chauffe).
- Le bloc `prefers-reduced-motion` d'origine raccourcit toutes les animations à 0,01 ms :
  les contenus restent visibles à l'état final et les curseurs (JS) restent manipulables.

## 16/10/2026 — mise en page propre à la copie du site (pas de changement de fond)

Le corps de la page est une rangée flex : la barre de retour (`moteur/retour-accueil.js`) et le cartouche de marque
(`marque.js`), ajoutés par le site, s'y glissaient comme deux colonnes et réduisaient le cours à 468 px sur 1366
(dessins à 260-300 px ; au téléphone, le cours était coupé à droite). Un bloc en fin de `<style>` les met chacun sur
sa ligne : le cours reprend sa largeur (980 px au plus), les dessins leur taille prévue (550 px). FRIGOLO n'a ni la
barre ni le cartouche : la correction ne s'y reporte pas. Ce module n'est PAS un doublon de `compresseur-interactif` :
il porte la théorie (types, piston, volume balayé, débit, rendement volumétrique, échauffement), l'autre les gestes.

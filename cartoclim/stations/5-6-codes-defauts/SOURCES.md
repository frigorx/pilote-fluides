# Sources — 5.6 Les codes défauts : lire ce que dit la machine

## Photographies (`assets/biblio/`)
- `898384a2af.png` — ensemble split (unité extérieure, unité murale, télécommande). Image de la base de
  cours inerWeb, document de cours sur le split froid seul (déjà employée par la station 3.2).
- `825923555b.jpeg` — manomètre de frigoriste à deux cadrans, sans marque visible. Image de la base de
  cours inerWeb, document « controle mani.docx » (contrôle du manifold).

Trouvées par `node outils/chercher-images.mjs` avec « climatiseur unité intérieure voyant LED code défaut
clignotant », « télécommande afficheur code erreur climatiseur », « diagnostic de panne climatisation
technicien manomètre », « carte électronique unité extérieure climatiseur platine » et « voyant clignotant
erreur LED afficheur code défaut panne ».
Aucune photo de la base ne montre une LED de défaut ou un code affiché : le temps 2 le dessine, avec un
exemple inventé.
Écartées (filigrane ou logo d'un tiers, ou dessin de catalogue) : unité murale ouverte (filigrane
« bricovidéo »), triptyque support / unité LG (même filigrane), planche kit Daikin (logo et mise en page
de catalogue), planche Airton (logo, marque « Ready Clim »), technicien et manomètre numérique (logo
« testo » sur la balance), technicien en tirage au vide (logo Daikin et bandeau de vidéo), télécommande
de la documentation energieplus (page de site tiers, résolution trop faible), unités extérieures
LG et Fujitsu seules (logos).

## Symboles (`assets/`)
- `split-pared.svg`, `ud-exte-split.svg`, `mando-infrarrojos.svg` — bibliothèque inerWeb, collection
  QElectroTech (CC BY 3.0), copiés de `assets/symboles/`. Rien n'a été redessiné.
- Les pictogrammes du temps 3 (loupe, clé, deux plaques) et les dessins du temps 2 sont des schémas
  de station, pas des symboles normalisés : ils sont écrits dans `contenu.js` et `scenes.js`.

## Fond
- Diagnostic de pannes.pdf (fonds de cours, résumé du RAG : défauts de pression, fuites, circulation sans
  arrêt, problèmes de sondes) — le RAG ne rend que le résumé, le document n'a pas été relu ligne à ligne.
- Séances de diagnostic de panne du fonds (S06 : panne complexe ; S22 : manque de fluide) : leurs
  fiches n'apportent que l'intitulé ; la démarche (relever, notice, famille, vérifier, remettre en
  marche) est celle de la fiche de la station.
- Station Académie froid-clim (atelier panne), inerweb.fr : renvoyée, non recopiée (station 5.7).

## Ce qui n'est pas sourcé, donc absent
Aucun code d'une marque réelle, aucune durée d'attente du compresseur, aucune valeur de pression, de
courant ou de température. « Quelques minutes » est le mot de la fiche ; la notice de l'appareil
donne la durée. L'exemple « trois clignotements = communication » est inventé et dit tel quel à l'écran.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.

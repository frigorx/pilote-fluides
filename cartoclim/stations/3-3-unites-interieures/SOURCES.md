# Sources — 3.3 Mural, console, cassette, gainable : choisir l'unité intérieure

## Photographies (`assets/biblio/`)
Trouvées par `node outils/chercher-images.mjs` (requêtes : « climatiseur unité intérieure murale cassette gainable
console types », « unité intérieure cassette plafond climatiseur », « cassette de plafond climatisation »,
« gainable unité de plafond gainée », « plafonnier climatisation apparent plafond »). Copiées depuis le cache de la base
(`C:/git/usine-contenu/moteur-recherche/illustrations/cache/`), regardées une à une.
- `71a01b35d0.png` — murale blanche fixée en haut d'un mur, près d'une fenêtre. Source indexée :
  `03_BAC-MFER/S2-Systemes/CLIMATISATION Sé1 Sq2.docx`. Aucune marque lisible. Telle quelle.
- `da01b9c33f.jpg` — cassette vue d'en dessous, dans un faux plafond dont des dalles manquent (boîtier, tubes de cuivre,
  câbles au-dessus). Source indexée : `03_BAC-MFER/S1-Analyse/pp.clim - Copie.pptx`. **Retouche** : la marque du fabricant,
  gravée en petit sur la dalle et lisible seulement en zoom, a été estompée ; l'image est réduite à 960 px de large.
- `0987a8263b.png` — caisson d'unité gainable (quatre ouvertures rondes). Source indexée :
  `05_Ressources-Partagees/Froid-Climatisation/CLIMATISATION SE1 SC2 (1).pptx`. **Rognée** : seul le caisson est conservé,
  le groupe extérieur (qui portait la marque) et la télécommande sont écartés ; agrandie deux fois pour l'affichage.

Écartées : la console du split 3.2 (marque du fabricant sur l'unité extérieure, déjà montrée à la station précédente) ;
les images d'unités avec groupe extérieur et logo lisible (gainable LG, Samsung, plafonnier Toshiba) ; les schémas de
documents tiers (rayon de diffusion d'une cassette, unité de plafond + gaine) — repris ici par un dessin propre.
Aucune image avec filigrane ni cadre de site tiers.

## Symboles (`assets/`)
- `split-pared.svg`, `cassette.svg`, `split-suelo.svg` — bibliothèque inerWeb, collection QElectroTech (CC BY 3.0),
  copiés de `assets/symboles/`, rien n'a été redessiné.
- Pas de symbole de gainable dans la bibliothèque (recherche au RAG, couche symbole : aucun résultat). La station le dit
  au temps 4 au lieu d'en inventer un.

## Scènes (`scenes.js`)
Dessins propres à la station, couleurs de `SceneKit.C`. Aucun chiffre : ni portée du jet, ni débit, ni dimension.

## Fond (lu au RAG, résumés)
- Cours_Clim_TNE_Complet.docx — typologie des unités intérieures : murale, console, plafonnier, gainable.
- pp.clim - Copie.pptx — différentes unités intérieures (mural, plafond, cassette, plénum).
- CLIMATISATION Sq1 Se2b — généralités et production en climatisation ; CLIMATISATION SE1 SC2 : source des photographies
  et schémas d'unités de plafond.
Les raisonnements de base (l'air frais est plus lourd, l'air chaud plus léger) sont de la physique courante, non tirés d'un
document précis. Les critères de choix (pièce, hauteur, faux plafond, eau, filtres) suivent la fiche de la station.
Aucune valeur de charge, de débit, de pression ou de dimension.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec citation, en
prototype. Toute image signalée sera remplacée.

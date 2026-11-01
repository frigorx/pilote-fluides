# Accueil à huit portes — plan de chantier (01/11/2026)

## La demande
Franck, 01/11/2026 : une page d'accueil plus simple, « accessible et compréhensible d'entrée de jeu,
où on ne voit que l'essentiel ». Maquette validée : l'affiche « Une plateforme. Tout un écosystème. »
dessinée par Codex (`Documents/Codex/2026-11-01/alors-j-ai-fait/outputs/affiche-ecosysteme-inerweb-fr-prof.png`).
Décision : la refaire en HTML réel (texte lisible, liens directs), l'affiche sert de maquette et
fournit les illustrations des huit portes.

## Ce qui change
- `index.html` : nouvelle page à huit portes (réseaux et cours, habilitations, outils, jeux,
  bureau d'études, logiciels, livres, classe), recherche de stations, test d'entrée, parcours par diplôme.
- `reseaux.html` : l'ancien accueil, renommé (git mv), devient « Tout inerWeb, réseau par réseau ».
  Le gros logo de l'accueil y mène (demande de Franck). Le journal `#nouveautes` y reste ; le volet
  de l'accueil va le lire par `fetch`.
- `build/accueil.mjs` écrit dans `reseaux.html` ; `build/sitemap.mjs` liste la page.
- `icones/portes/*.webp` : huit vignettes découpées dans l'affiche (876 × 274, 16 à 31 Ko).
- Le volet « Actualités et espaces » est repris tel quel (Franck y tient : vitrine du lycée à venir).

## Règles tenues
- Haut de page permanent (05/09) : phrase d'identité, portes, test d'entrée au premier écran.
- Pas de menu déroulant : chaque porte montre ses entrées en boutons.
- Contrôle téléphone (controle-telephone.cjs) : 0 bloquant avant livraison.
- Style Henninot : contrôle `controle-style.py` sur la page.
- Rien n'est poussé sans le feu vert de Franck.

## Étapes
1. [x] Lecture du dépôt (origin/main, atelier `D:\git\_wt-accueil`, branche `accueil-huit-portes`)
2. [x] Vignettes
3. [x] Page index.html
4. [x] reseaux.html, générateur, sitemap, build (accueil, version)
5. [x] Contrôles (téléphone : index OK, reseaux.html « à revoir » pour la carte SVG couchée, défaut antérieur ; style : 0 à réécrire ; titre sous la ligne de flottaison à 800 px et 1 280 px) : liens, style, téléphone, ligne de flottaison à 800 px
6. [ ] Commit ; commande de fusion et de mise en ligne pour Franck

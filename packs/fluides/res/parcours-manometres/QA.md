# Contrôle qualité du brouillon

Contrôles exécutés le 18 août 2026.

## Résultat automatisé

`QA OK · 2 parcours complets · 4 formats · 0 requête externe · 0 erreur JS`

- module 1 joué de l’étape 1 à l’étape 16, quatre définitions et série de six cadrans validées à 6/6 ;
- module 2 joué de l’étape 1 à l’étape 11, quatre décisions point–formule–calcul, mission complète et évaluation validées à 20/20 ;
- formats contrôlés : 1024 × 768, 1366 × 768, 360 × 640 et 390 × 844 ;
- aucune barre de défilement au niveau de la page dans les modules ;
- aucune requête vers Internet pendant l’utilisation ;
- ouverture directe de `index.html` et chargement des quatre symboles SVG contrôlés ;
- lanceur local contrôlé par réponses HTTP 200 sur le portail et le module 1 ;
- navigation libre entre toutes les étapes, formulaires, calculatrice et corrections contrôlés ;
- syntaxe de tous les fichiers JavaScript contrôlée.

Commande de reproduction dans l’environnement Codex :

```powershell
$env:CODEX_NODE_MODULES='C:\Users\henni\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
node tests\qa.mjs
```

## Contrôles pression–température

- R134a à 40 °C : 10,16593 bar absolus ;
- R407C à −10 °C : 3,19802 bar absolus au point de rosée et 4,04697 bar absolus au point de bulle ;
- inversion table P/T contrôlée à 37,5 °C ;
- conversions cadran relatif ↔ table absolue contrôlées avec 1,01325 bar d’atmosphère standard.

## Inspection visuelle

Les captures sont conservées dans `tests/screenshots/`. Elles couvrent le portail, la Croix du Frigoriste, le cadran à graduations de saturation radiales, la mission à deux cadrans et le bilan noté avec les quatre formules. Sur téléphone, le schéma et l’activité sont superposés ; les deux cadrans se consultent par balayage horizontal avec une consigne visible.

## Corrections du 18 août 2026 (relecture métier)

Six points relevés à la relecture et corrigés, QA rejoué ensuite :

- étape 9 du module 1 : le chapeau annonçait la réponse (« environ 1,0 bar relatif et −10 °C ») avant que l'élève lise le cadran ; il énonce désormais la méthode seulement ;
- mission du module 2 : même défaut dans le message d'aide (« Lisez −10 °C côté BP et +40 °C côté HP ») ;
- étape 1 du module 1 : « suivez les flèches blanches » désignait des flèches rouges et bleues, et désignait par la couleur seule ; remplacé par le sens de circulation ;
- échelle intérieure du cadran : « rosée » / « bulle » n'apparaissent plus que sur un fluide à glissement. Sur un corps pur, l'échelle est libellée « saturation », dans le cadran comme dans la légende ;
- même règle dans le module 2, dont le scénario est au R-134a : les formules et le mémo final disent « T sat. BP » et « T sat. HP ». La règle rosée/bulle est énoncée une fois, en encadré, et reste enseignée à l'étape 7 sur le R-407C où l'écart se voit ;
- aiguille du manomètre effilée : elle recouvrait le repère de graduation que l'exercice demande justement de lire.

## Découpage en briques (18 août 2026)

Le contrôle couvre désormais les deux formes : `QA OK · 2 parcours complets ·
5 briques autonomes · 4 formats · 0 requête externe · 0 erreur JS`.

Chaque brique est ouverte seule, jouée jusqu'à sa dernière étape, et contrôlée sur
le nombre d'étapes, l'absence d'erreur JavaScript, l'absence de requête externe et
l'absence de réponse HTTP en erreur.

Ce dernier contrôle a servi immédiatement : `shared/circuit.js` construisait le
chemin de ses symboles en dur (`../shared/symboles/`), ce qui fonctionnait depuis
un module mais donnait quatre 404 depuis une brique rangée un cran plus bas. La
racine est maintenant déduite de l'adresse du script, comme le fait déjà
`shared/lisibilite.js`.

## Validation humaine encore nécessaire

Ce contrôle ne vaut pas bon à tirer métier. Franck doit encore confirmer :

- l’emploi des termes « surchauffe totale » et « sous-refroidissement total » ;
- les quatre points E1, C1, C2 et D1 retenus pour le scénario ;
- le niveau de tolérance de lecture attendu selon le public ;
- le dépôt canonique cible avant toute publication ou indexation RAG.

# Sources et statut des images

## Illustrations Claude fournies par Franck

Archive d’origine : `Animations pressostat KP1 KP5 KP15.zip`

- SHA-256 archive : `B57BE3BD1DCC7479A9B7F8F52B72881B7DC19F8EBB2DEE191F1A49792F7FA1E6`
- composant KP15 : `pressostat-dual.jsx`
- SHA-256 composant : `3FE2E9F4B610CC18A1211C12C3CF2D5AECF10187848678123D840622801C5EA5`
- export local : 19 août 2026, définition 1920 × 1081.

Quatre vues sont affichées dans le cours : ouverture, mécanique BP, mécanique HP et réglages. Les vues mécaniques sont recadrées par CSS pour ne pas présenter leur cartouche électrique comme schéma de référence.

Trois vues restent conservées dans `assets/illustrations-claude/` à titre de provenance, mais ne sont pas affichées : chaîne, réarmement et synthèse. Leur formulation « A-D signal de défaut » ne distingue pas correctement B signal BP et D signal HP pour l’objectif à quatre conducteurs actifs.

Le détail exact figure dans `assets/illustrations-claude/manifest.json`.

## Schémas inerWeb

Les schémas du circuit, des deux soufflets, des cycles, du banc azote et du bornier A/B/C/D + PE sont dessinés en HTML/SVG original dans `src/visuals.js`. Aucun dessin Danfoss n’est reproduit.

## Images tierces non intégrées

Les dossiers `scraps/` et `uploads/` de l’archive source contenaient des captures ou images commerciales dont les droits n’étaient pas établis. Elles n’ont pas été copiées dans le module.

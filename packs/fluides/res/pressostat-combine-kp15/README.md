# Pressostat combiné KP15 HP/BP — inerWeb Édu

Module autonome hors ligne consacré au Danfoss KP15, variante avec signalisation BP et HP. Il relie les deux pressions, les soufflets, les ressorts, les cycles BP/HP, les calculs de différentiel, le réarmement HP et le câblage A/B/C/D + PE.

## Ouvrir

Double-cliquer sur `OUVRIR-LE-MODULE.cmd`. Le lanceur démarre un serveur limité à l’ordinateur et ouvre `http://127.0.0.1:18769/`.

Si Node.js n’est pas installé, `index.html` reste lisible directement : toutes les ressources sont locales.

## Parcours

- 16 étapes pédagogiques ;
- 8 questions formatives ;
- 1 bilan ;
- 4 vues Claude intégrées avec texte équivalent ;
- schémas et activités inerWeb originaux ;
- voix locale uniquement après clic, sans lecture automatique ;
- impression claire et fonctionnement sans réseau.

La cible électrique est explicite : quatre conducteurs actifs A, B, C et D, plus le conducteur de protection PE. Tous les KP15 ne possèdent pas D ; la référence et sa notice restent prioritaires.

## Développement et contrôle

```text
node build.mjs
node tests/qa.mjs
node tests/browser-qa.mjs
node serve.mjs
```

Le module est un brouillon. Il ne doit pas être publié ni indexé dans le RAG avant le bon à tirer métier de Franck.

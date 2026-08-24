# Intégration centrale — Ligne E

## Réalisé le 23 août 2026

- `lignes/E/parcours.html` est accessible depuis le filtre E et le bouton
  `Parcours complet Ligne E` de la carte ;
- les six stations propriétaires E ouvrent directement leur dossier autonome ;
- `debit` reste la station unique appartenant à la Ligne P et n’est ni copié ni modifié ;
- `pertes` reste un module unique partagé avec la Ligne D ;
- le registre hors ligne `modules.js` reflète les statuts `QA TECHNIQUE` des manifestes ;
- `tests/qa.mjs` contrôle les chemins, identifiants, propriétaires et statuts ;
- le retour `Plan` des modules rejoint `../../index.html` ;
- à ce jalon E, les stations D/M conservaient leur fiche de cadrage ; elles sont désormais
  développées et raccordées, selon `modules.js`, `README.md` et `_ETAT.md`.

## Fichiers centraux modifiés pour le raccordement

`index.html`, `styles.css`, `app.js`, `modules.js`, `tests/qa.mjs`, `README.md`, `_ETAT.md` et
`QA.md`.

`programme.js`, `parcours-adaptatif.js`, `print.css`, `rag/` et les contenus métier des autres
stations n’ont pas été modifiés.

## Publication et RAG

Aucune publication, aucun dépôt canonique et aucune indexation des modules. La ligne reste un
brouillon en QA technique jusqu’au bon à tirer métier et pédagogique explicite de Franck.

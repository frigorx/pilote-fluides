# Intégration centrale — Ligne M

## État au 23 août 2026

Intégration centrale effectuée après l’accord explicite de Franck. La ligne M est enregistrée
dans `modules.js`, son filtre ouvre `lignes/M/parcours.html` et ses cinq stations propriétaires
sont accessibles depuis le plan SVG et la liste tactile. `tests/qa.mjs`, `index.html`,
`README.md`, `_ETAT.md` et `QA.md` décrivent et contrôlent ce raccordement.

La logique pédagogique reste dans les modules autonomes : rien n’a été recopié dans `app.js`,
`programme.js` ou `parcours-adaptatif.js`.

La ligne fonctionne directement par `lignes/M/parcours.html`. Ses stations propriétaires sont accessibles par leurs chemins relatifs :

- `../../stations/releves/index.html` ;
- `../../stations/tampon/index.html` ;
- `../../stations/decouplage/index.html` ;
- `../../stations/diagnostic/index.html` ;
- `../../stations/mission/index.html`.

Les correspondances restent uniques :

- Mesurer : `../../stations/mesurer/index.html`, propriété de la ligne P, disponible ;
- Équilibrage : `../../stations/equilibrage/index.html`, propriété de la ligne D, module QA technique conservé strictement en lecture seule depuis M.

## Contrôles du raccordement

- le registre central contrôle les cinq propriétaires M contre leur `manifest.json` ;
- les retours marquent chaque station visitée sans stockage navigateur ;
- les correspondances Mesurer et Équilibrage restent respectivement propriétaires de P et D ;
- le parcours M reste la source unique de ses 12 activités finales.

## Publication et RAG

Aucune publication, aucun dépôt canonique et aucune indexation RAG. La ligne reste un brouillon local en QA technique jusqu’au bon à tirer explicite de Franck.

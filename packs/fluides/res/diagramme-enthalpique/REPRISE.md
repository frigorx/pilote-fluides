# Reprise et transmission

## Source de vérité

1. `src/modules.mjs` : ordre, objectifs, textes, liens métier et quiz.
2. `src/course.js` : scénario, SVG original, navigation, résultats et voix.
3. `src/course.css` : charte, projection, téléphone, impression et lecture facilitée.
4. `src/hub.*` : sélection de modules et catalogue des briques autonomes.
5. `build.mjs` : génération des livrables.

Les fichiers `index.html`, `cours-*.html` et `modules-autonomes/*.html` sont générés. Toute modification manuelle de ces fichiers sera perdue au prochain build.

## Contrat pédagogique

- Une action et une idée dominantes par écran.
- Ordre recommandé : axes → saturation → bulle/rosée → zones → isotitres → isobare → isotherme → isenthalpe, puis isochore et isentrope en approfondissement.
- Chaque famille est reconnue par son nom, la grandeur constante et un style de trait ; la couleur n’est jamais le seul code.
- Le dessin fixe doit rester lisible sans animation.
- Le schéma est qualitatif et ne remplace pas un diagramme constructeur pour relever des valeurs.
- Les quiz sont formatifs et sans valeur d’examen.

## Contrat voix

- Aucun démarrage automatique.
- Le texte parlé provient du texte affiché et constitue sa transcription complète.
- Pause, reprise et arrêt sont disponibles.
- La voix s’arrête lors d’un changement d’écran, d’un masquage de l’onglet ou d’un départ de la page.
- La V7 de travail utilise la synthèse vocale française du navigateur. Une voix locale enregistrée (par exemple Piper) ne doit être figée qu’après validation humaine des textes.

## Refaire une livraison

```powershell
node build.mjs
node tests/qa.mjs
```

Vérifier ensuite visuellement le hub, le parcours habilitation et au moins une brique autonome aux formats 1366×768, 1024×768, 390×844 et 360×640.

## Statut

- V7 : brouillon local du 18 août 2026.
- V6 téléchargée : conservée intacte à son emplacement d’origine.
- Publication Git : non effectuée.
- Indexation RAG : non effectuée avant bon à tirer explicite.

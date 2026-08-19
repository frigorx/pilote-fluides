# Reprise du projet

## État

- version : `1.2.0-brouillon` ;
- base : moule du module `pressostat-bp-securite-pedagogique` ;
- prototype métier : `C:\git\inerweb-frigolo\outils\kp5-pressostat-hp.html`, commit `56f3df1` ;
- publication : aucune ;
- RAG : consultation en lecture seule, module non indexé ;
- entrée générée : `index.html` ;
- aperçu local : `http://127.0.0.1:18766/`.
- illustrations Claude : sept PNG 1920×1081 dans `assets/illustrations-claude/`, avec provenance dans leur manifeste.
- source active : `Animations pressostat KP1 KP5 KP15.zip` ; ancienne série conservée dans `assets/illustrations-claude/variantes/` ; KP15 et images collées exclus.

## Décisions verrouillées

1. Ne pas modifier le prototype GitHub canonique.
2. Enseigner la logique HP exacte : montée vers CUT OUT, descente vers CUT IN.
3. Employer `DIFF = CUT OUT − CUT IN`.
4. Pour KP5, montrer 1–2 fermé en état normal puis ouvert à la hausse ; 1–4 devient le côté défaut.
5. Distinguer retour automatique et réarmement manuel maximum.
6. Ne pas transformer `24 / 21 / 3 bar` en consigne terrain.
7. Déterminer CUT OUT par la documentation machine et la limite la plus contraignante.
8. Privilégier le banc à l’azote ; encadrer fortement toute montée HP provoquée en fonctionnement.
9. Ne jamais enseigner fermeture de vanne de refoulement ou shunt de sécurité.
10. Conserver le module en brouillon jusqu’au bon à tirer de Franck.
11. Conserver les deux lectures : illustration Claude pour guider, schéma/activité inerWeb pour manipuler et vérifier.
12. Présenter le cycle Claude comme un cas automatique et maintenir la distinction avec le manuel maximum.

## Fichiers à modifier

- contenu métier : `src/content.mjs` ;
- schémas et interactions : `src/visuals.js` ;
- interface : `src/app.js`, `src/styles.css`, `src/shell.html` ;
- génération : `build.mjs` ;
- contrôles : `tests/qa.mjs`, `tests/browser-qa.mjs`.

Après toute modification de source :

```powershell
node build.mjs
node tests/qa.mjs
node tests/browser-qa.mjs
```

Ne pas corriger directement `index.html`, car il est généré.

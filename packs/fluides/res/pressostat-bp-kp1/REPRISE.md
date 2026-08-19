# Reprise et décisions

## Source de vérité

1. prototype canonique intact : `C:\git\inerweb-frigolo\outils\kp1-pressostat-bp.html` ;
2. ordre pédagogique : `src/content.mjs` ;
3. dessins et activités : `src/visuals.js` ;
4. navigation, quiz et voix : `src/app.js` ;
5. charte responsive : `src/styles.css` ;
6. aperçu local fiable : `serve.mjs` et `OUVRIR-LE-MODULE.cmd` ;
7. génération : `build.mjs`.
8. illustrations Claude reçues : `assets/illustrations-claude/` et leur `manifest.json`.

## Décisions métier

- Le module traite uniquement la **sécurité BP**. Le pump-down détaillé reste au chapitre suivant.
- La causalité visuelle est `pression → soufflet → bras/ressorts → bascule rapide → contact`.
- La zone neutre est l’intervalle CUT OUT/CUT IN ; dans cet intervalle, le contact conserve l’état imposé par le dernier seuil franchi.
- Les trois relations sont enseignées et manipulées : `DIFF = CUT IN − CUT OUT`, `CUT OUT = CUT IN − DIFF`, `CUT IN = CUT OUT + DIFF`.
- Danfoss KP1 est un exemple de famille. La référence exacte fixe plage, différentiel et réarmement.
- Sur le modèle automatique étudié : pression suffisante `1–4 fermé`, pression basse `1–2 fermé`.
- Les graduations servent au préréglage ; seuls les basculements mesurés valident CUT OUT et CUT IN.
- Sur banc à l’azote, le compresseur est isolé et ne démarre jamais.
- Une limite constructeur atteinte avant le basculement impose l’arrêt du test.
- Aucun tableau P/T n’est embarqué dans cette version.

## Contrat média et voix

- Les symboles proviennent de la bibliothèque inerWeb validée et sont copiés localement.
- Les dessins complémentaires sont des SVG manuels dans `src/visuals.js`.
- Sept vues Claude 1920×1081 sont intégrées par un onglet distinct, avec texte équivalent et contexte pédagogique.
- La série active provient de `Animations pressostat KP1 KP5 KP15.zip` ; la première série BP est conservée dans `assets/illustrations-claude/variantes/`.
- Le KP15 et les images `scraps/uploads` du paquet reçu restent hors de ce module.
- L’onglet `Schéma / activité` conserve les manipulations et les calculs existants ; aucune illustration ne les remplace.
- La filiation du prototype GitHub est affichée dans l’écran KP1 et documentée.
- Aucune photographie ni coupe constructeur n’est intégrée ; les vues Claude sont des illustrations techniques de travail fournies par Franck.
- La voix ne démarre qu’après clic ; le texte prononcé est visible et la lecture s’arrête au changement d’écran ou au masquage de l’onglet.

## Refaire une livraison

```powershell
node build.mjs
node tests/qa.mjs
node tests/browser-qa.mjs
```

Contrôler ensuite les captures à `1366×768`, `1024×768`, `390×844` et `360×640`.

## Validation humaine encore requise

- formulation exacte de la méthode atelier de Franck ;
- choix de la référence KP1 réellement utilisée au lycée ;
- procédure locale d’isolement électrique et d’action sur la vanne liquide ;
- écoute humaine de la voix ;
- bon à tirer, publication et indexation RAG.

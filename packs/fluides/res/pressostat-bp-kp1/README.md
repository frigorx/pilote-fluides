# Pressostat BP de sécurité — inerWeb Édu

Refonte interactive hors ligne destinée à un public débutant, FLE ou DYS. Le parcours relie pression, soufflet, ressorts, bascule rapide et contact 1–2–4, puis fait manipuler la zone neutre, les trois relations de calcul et les deux méthodes de contrôle.

Cette V2 ne repart pas de zéro : elle réemploie le prototype canonique déjà publié dans `inerweb-frigolo/outils/kp1-pressostat-bp.html`, référencé par Pilote Fluides. Sa face KP1, son manomètre et sa logique CUT IN/DIFF ont été portés hors ligne. La mécanique interne, la zone neutre, le banc azote, l’enveloppe compresseur et les trois cycles de mesure ont été ajoutés.

La version 2.2 intègre les sept illustrations KP1 de la variante consolidée `Animations pressostat KP1 KP5 KP15.zip` transmise par Franck. Aux étapes concernées, deux onglets conservent les deux apports : `Illustration Claude` pour la lecture visuelle guidée, puis `Schéma / activité` pour manipuler, calculer et vérifier. Les chiffres dessinés dans les illustrations restent des exemples contextualisés. La première série BP est conservée dans `assets/illustrations-claude/variantes/`.

## Ouvrir le module

Depuis l’Explorateur Windows, double-cliquer sur `OUVRIR-LE-MODULE.cmd`. Le lanceur démarre un petit serveur limité à l’ordinateur puis ouvre `http://127.0.0.1:18765/`. Cette méthode évite que le navigateur confonde un chemin Windows avec un site Internet.

Un second lanceur, `TESTER-LE-PRESSOSTAT-BP.cmd`, se trouve dans le dossier parent `inerweb full ia`. Il est aussi possible d’ouvrir directement `index.html`.

Aucune installation, connexion ou dépendance distante n’est nécessaire.

## Périmètre

- inclus : sécurité BP, technologie mécanique, action brusque, zone neutre, différentiel, contact 1–2–4, familles automatique/manuelle, choix de la coupure, préréglage KP1, réglage au banc à l’azote, contrôle en fonctionnement et traçabilité ;
- seulement contextualisé : action sur la vanne de départ liquide pendant un contrôle ;
- réservé au prochain module : pump-down détaillé, régulation BP directe, réduction de puissance et autres stratégies de régulation.

Le cas `CUT OUT = 0,2 bar` reste un exemple pédagogique du fonds local. La notice machine, l’enveloppe du compresseur, la référence exacte du pressostat et le cahier des charges font foi.

## Maintenance

- contenus : `src/content.mjs` ;
- visuels, SVG techniques et interactions : `src/visuals.js` ;
- navigation, quiz et voix : `src/app.js` ;
- symboles issus de la bibliothèque validée : `assets/symboles/` ;
- illustrations Claude exportées localement : `assets/illustrations-claude/` ;
- mise en page : `src/styles.css` ;
- aperçu local : `node serve.mjs`, puis ouvrir `http://127.0.0.1:18765/` ;
- génération : `node build.mjs` ;
- QA statique : `node tests/qa.mjs` ;
- QA multi-écrans : `node tests/browser-qa.mjs`.

Ne pas corriger directement `index.html` : modifier les sources, reconstruire, puis relancer les deux QA.

## Statut

Version `2.2.0-brouillon` du 19 août 2026. Non publiée et non indexée dans le RAG avant bon à tirer explicite de Franck.

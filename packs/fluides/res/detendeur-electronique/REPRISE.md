# Reprise — Le détendeur électronique (gare 6 de la ligne LES DÉTENDEURS)

Gare fabriquée sur le moule de la gare 0 (`../_detendeurs-commun/MOULE.md`, `../detendeurs-famille/`) en recopiant la
gare 3 (`../detendeur-mop/`). Atelier : worktree `C:\git\_wt-detendeurs`, branche `ligne-detendeurs`.
Rien n’est commité ni en ligne : feu vert de F. Henninot d’abord.

## État (06/10/2026)

- 5 écrans : 1 carte d’identité (symbole, coupe au repos `DS.coupe("electronique")`, les trois acteurs sondes →
  régulateur → vanne allumés tour à tour, « il règle : la surchauffe, calculée ») · 2 la boucle de réglage (pas à pas,
  6 étapes : la sortie chauffe → les sondes mesurent → le régulateur calcule → il ouvre la vanne cran par cran → plus de
  liquide → la surchauffe redescend ; écran du régulateur : surchauffe, consigne, ordre) · 3 pas à pas ou impulsions ?
  (deux vannes côte à côte, 5 étapes : cran par cran / ouvert-fermé par cycles / la durée dose / on arrête : pas à pas /
  on arrête : impulsions) · 4 régler la consigne (exercice : − et + sur la consigne de surchauffe, le système se
  stabilise, trois zones : trop basse / juste / trop haute, correction expliquée) · 5 vérifier (6 questions, une
  explication par réponse).
- Brique ajoutée : `scene-electronique.js` (`window.ELECTRONIQUE_SCENES`) ; la coupe se redessine selon la largeur
  disponible (560 à 1000 unités, hauteur fixe 412) ; sur téléphone l’écran 3 passe en deux onglets (et bascule sur la
  vanne dont il est question à chaque étape).
- Voix : `narration` de chaque écran, voix du navigateur tant que les MP3 ne sont pas générés (clés nouvelles).
- Référentiel : `couverture.json` — enseigné `9.01` (tous les écrans), `9.03` (écran 4, régler) ; appui `1.02`,
  `1.04`, `9.10`.

## Contrôle

Serveur local : `http://localhost:8794/packs/fluides/res/detendeur-electronique/index.html` (lancé par le chat
superviseur). `node packs/fluides/res/detendeur-electronique/tests/qa.mjs` (Playwright de `C:\git\hydrometro\node_modules`,
Edge) : 1366×768 et 390×844, console propre, page sans défilement, texte ≥ 14 pt, étiquettes ≥ 13 px, aucune étiquette
sur un tracé, animations, pas à pas, exercice (− et +, stabilisation, trois zones, écran du régulateur), quiz 5/6,
clavier, badge référentiel, impression, mot interdit absent. `CAPTURES=<dossier>` enregistre des PNG.

## Ce qui reste (hors périmètre)

- Liens vers les autres gares et vers « Le régulateur électronique » / CartoClim 2-5 (posés par le superviseur) ;
  entrée dans `moteur/plan-donnees.js` ; build (`animations.mjs`, `retour-accueil.mjs`) ; MP3 ; catalogue ; RAG ;
  nouveautés.

## Points métier à faire valider par F. Henninot

1. Modèle du réglage : la surchauffe vaut « température mesurée − température de saturation » ; le régulateur ouvre si
   elle dépasse la consigne, ferme si elle est en dessous ; plus la vanne est ouverte, plus la nappe s’allonge. Le
   dessin n’a que des valeurs d’EXEMPLE (consigne normale 7 K ; pastille « exemple » sur l’écran du régulateur).
2. Écran 4 : zones « trop basse » ≤ 4 K, « juste » 5 à 10 K, « trop haute » ≥ 11 K (exemples), reprises du repère
   « 5 à 10 K » du cours HabFluide G9 ; la consigne de départ est 16 K (trop haute) pour que l’élève agisse. Consigne
   trop basse : la nappe arrive aux sondes, du liquide peut repartir vers le compresseur. Consigne trop haute : nappe
   courte, évaporateur mal rempli. À confirmer : une vanne électronique vise souvent une surchauffe plus faible qu’un
   thermostatique ; la valeur vient de la notice.
3. Vanne à impulsions : dessinée avec une bobine et un clapet normalement fermé (ressort de rappel), cycle de 4 s
   d’animation (« quelques secondes »), la barre de temps montre la part ouverte du cycle ; sans courant elle se ferme
   toute seule (« elle fait aussi électrovanne »). Raccourci pédagogique : une vraie vanne à impulsions peut être à
   commande pilotée.
4. Vanne pas à pas : le moteur ouvre en poussant le pointeau (même sens que la coupe de la gare 0), 8 crans de
   course, dessinés exprès gros ; une vraie vanne a des centaines de pas. « Certains modèles ont une réserve d’énergie
   pour fermer en cas de coupure » : repris tel quel de `findings.md`.
5. Symbole du transmetteur de pression : la bibliothèque inerWeb n’en a pas ; le « capteur de pression » de
   QElectroTech (CC BY 3.0) est affiché sur l’écran 1. À garder ou à remplacer.
6. Le régulateur est dessiné comme un boîtier à écran (pas de symbole normalisé) ; son écran affiche du texte SVG
   (« surchauffe », « consigne », ordre donné) sur fond clair, jamais sur un tracé.
7. Quiz, question 3 : « température mesurée moins température de saturation » ; question 5 : durée d’ouverture =
   vanne à impulsions.

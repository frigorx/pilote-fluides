# Reprise — L’égalisation externe (gare 2 de la ligne LES DÉTENDEURS)

Gare fabriquée sur le moule de la gare 0 (`../_detendeurs-commun/MOULE.md`, `../detendeurs-famille/`). Atelier : worktree
`C:\git\_wt-detendeurs`, branche `ligne-detendeurs`. Rien n’est commité ni en ligne : feu vert de F. Henninot d’abord.

## État (06/10/2026)

- 5 écrans : 1 carte d’identité (symbole, coupe animée, visite guidée bulbe → tube → membrane, « il règle : la surchauffe,
  avec la vraie pression de la sortie ») · 2 le piège de la perte de charge (pas à pas, 4 étapes, égalisation interne,
  deux manomètres) · 3 et si on branche le tube ? (interne et externe côte à côte, pas à pas, 4 étapes) · 4 où brancher
  le tube ? (exercice : points A, B, C, D sur le dessin ou boutons, correction expliquée pour chacun) · 5 vérifier
  (6 questions, une explication par réponse).
- Brique ajoutée : `scene-egalisation.js` (`window.EGALISATION_SCENES`) ; la coupe se redessine selon la largeur
  disponible (560 à 1000 unités, hauteur fixe 360) ; sur téléphone l’écran 3 passe en deux onglets.
- Couleurs de la ligne (retour de F. Henninot) : bulbe et capillaire violets `#8e44ad` (impulsions claires quand le bulbe chauffe, chambre au-dessus de la membrane qui se fonce), flèches violettes = bulbe (ouvre), bleues sous la membrane = pression qui ferme (interne : entrée, externe : sortie), gris acier = ressort (ferme) ; légende HTML `EGALISATION_SCENES.legende()` sous chaque coupe (raccourcie sur téléphone : les mots « pression du » / « pression » sont masqués). Écran 2 : 5 étapes (la première montre le bulbe qui pousse).
- Voix : `narration` de chaque écran, voix du navigateur tant que les MP3 ne sont pas générés (clés nouvelles).
- Référentiel : `couverture.json` — enseigné `9.01` (tous les écrans), `9.03` (écran 4, brancher le tube) ; appui `1.02`,
  `1.04`, `9.10`.

## Contrôle

Serveur local : `http://localhost:8794/packs/fluides/res/detendeur-egalisation-externe/index.html` (lancé par le chat
superviseur). `node packs/fluides/res/detendeur-egalisation-externe/tests/qa.mjs` (Playwright de
`C:\git\hydrometro\node_modules`, Edge) : 1366×768 et 390×844, console propre, page sans défilement, texte ≥ 14 pt,
aucune étiquette sur un tracé, animations, pas à pas, exercice (boutons, points du dessin, clavier), quiz 5/6, clavier,
badge référentiel, impression, mot interdit absent. `CAPTURES=<dossier>` enregistre des PNG.

## Ce qui reste (hors périmètre)

- Liens vers les autres gares ; entrée dans `moteur/plan-donnees.js` ; build (`animations.mjs`, `retour-accueil.mjs`) ;
  MP3 ; catalogue ; RAG ; nouveautés.
- Le tube d’égalisation part toujours du côté gauche du détendeur et passe par le haut du dessin : à la bonne place (C) il
  ne croise ni le capillaire du bulbe ni la conduite haute pression (aux places A et B, il croise le capillaire).

## Points métier à faire valider par F. Henninot

1. Écran 4, choix B « avant le bulbe » : présenté comme « presque, mais pas la bonne place » (la pression y est proche de
   celle de la sortie ; la notice demande la prise après le bulbe). Le dessin montre alors un détendeur presque juste.
2. Écran 4, choix D « prise bouchée » : dit « ne marche pas, rien n’amène la bonne pression sous la membrane ; laissée
   ouverte, elle fuit ». Le dessin montre des flèches grises (pression inconnue) et une nappe courte : c’est un choix de
   dessin, pas une mesure.
3. Équilibre de la membrane : les deux flèches (bulbe vers le bas, pression lue vers le haut) sont dessinées égales.
   Avec la perte de charge et l’égalisation interne, elles sont plus longues et le bulbe plus chaud : le détendeur règle
   la surchauffe apparente, la vraie est plus grande. Non détaillé à l’élève (gare 1 : les forces).
4. Symbole : celui de la planche Eduscol (`detendeur_thermo_ext.svg`) ; la question 1 dit que son « petit trait au-dessus
   du cercle » est la prise d’égalisation.
5. `9.03` en enseigné à l’écran 4 (brancher = installer), `9.10` en appui.
6. Le distributeur de liquide n’est pas dessiné (l’évaporateur est un tube long) : il est dit dans le texte, la
   narration de l’écran 3 et la question 6.

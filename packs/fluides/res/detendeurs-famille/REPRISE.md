# Reprise — La famille des détendeurs (gare 0 de la ligne LES DÉTENDEURS)

Pilote qui **fixe le moule 2D** des gares 2 à 6 (voir `../_detendeurs-commun/MOULE.md`). Atelier : worktree
`C:\git\_wt-detendeurs`, branche `ligne-detendeurs`. Rien n'est commité ni en ligne : feu vert de F. Henninot d'abord.

## État (06/10/2026)

- 7 écrans : 1 pourquoi détendre · 2 deux missions · 3 qui règle quoi · 4 et si la chambre chauffe (écran clé) ·
  5 quel détendeur pour quelle machine (exercice) · 6 deux variantes (égalisation externe, MOP) · 7 vérifier (6 questions).
- Pas à pas (3 à 6 étapes, ▶/⏸, ralenti) aux écrans 1, 2 et 4 ; cartes animées à l'écran 3 ; variantes animées à l'écran 6.
- Briques communes : `../_detendeurs-commun/scenes-detendeurs.js` (`window.DETENDEURS_SCENES`) ; banc de contrôle :
  `../_detendeurs-commun/banc.html` (les quatre coupes, un curseur de charge).
- Voix : `narration` de chaque écran, voix du navigateur tant que les MP3 ne sont pas générés (clés nouvelles).
- Référentiel : `couverture.json` — enseigné `1.04`, `9.01` ; appui `1.02`, `9.03`, `9.10`.

## Contrôle

Serveur local : `http://localhost:8794/packs/fluides/res/detendeurs-famille/index.html` (lancé par le chat superviseur).
`node packs/fluides/res/detendeurs-famille/tests/qa.mjs` (Playwright de `C:\git\hydrometro\node_modules`, Edge) :
1366×768 et 390×844, console propre, page sans défilement, texte ≥ 14 pt, aucune étiquette sur un tracé, animations,
exercice (clic et glisser), quiz 5/6, clavier, badge référentiel, impression. `CAPTURES=<dossier>` enregistre des PNG.

## Ce qui reste (hors périmètre du pilote)

- Liens vers les autres gares : à poser quand elles existent (aucun lien pour l'instant).
- Entrée dans `moteur/plan-donnees.js`, build (`animations.mjs`, `retour-accueil.mjs`), MP3, catalogue, RAG, nouveautés.
- Sur téléphone (390 px) : les pastilles HP/BP des coupes sont masquées (trop petites) ; ①② sont recadrés/agrandis ; ⑥ passe en deux onglets.
- Le détendeur thermostatique complet (3D, forces sur la membrane) est la gare 1, pas ici.

## Points métier à faire valider par F. Henninot

1. Décidé par F. Henninot (06/10) : exemple du détendeur automatique = « machine à glace en écailles » (charge constante) ; dit aussi à l’écran 3 et à la question 4.
2. Symbole du détendeur automatique : « vanne à pression constante » de QElectroTech, gardé par F. Henninot ; source citée (CC BY 3.0) dans SOURCES.md et le bouton « Sources ».
3. Automatique : « la pression monte, il ferme » présenté comme réaction à la charge (findings § 3) ; en régime établi
   la pression est tenue, c'est le débit qui ne suit pas la charge.
4. Capillaire à charge faible : le dessin montre du liquide jusqu'à la sortie (retour de liquide possible) ; les machines
   à capillaire ont une charge de fluide critique qui limite ce risque.
5. Thermostatique : l'ouverture « suit » la charge à 4 % près (légère sous-ouverture) ; électronique : exacte. Choix de dessin, pas de mesure.

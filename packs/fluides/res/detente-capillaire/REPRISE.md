# Reprise — La détente par tube capillaire (gare 5 de la ligne LES DÉTENDEURS)

Gare fabriquée sur le moule de la gare 0 (`../_detendeurs-commun/MOULE.md`, `../detendeurs-famille/`) en recopiant la
gare 3 (`../detendeur-mop/`). Atelier : worktree `C:\git\_wt-detendeurs`, branche `ligne-detendeurs`.
Rien n’est commité ni en ligne : feu vert de F. Henninot d’abord.

## État (06/10/2026)

- 7 écrans : 1 carte d’identité (symbole, coupe au repos : conduite HP, filtre déshydrateur, capillaire, évaporateur ;
  visite filtre → capillaire → évaporateur ; « il règle : rien — sa longueur et son diamètre font tout » ; « on le
  trouve sur : les réfrigérateurs ménagers et les petits meubles ») · 2 la détente le long du tube (pas à pas, 4 étapes,
  manomètres le long du tube, premières bulles avant la sortie, mélange froid) · 3 collé à la conduite d’aspiration (pas
  à pas, 3 étapes, 4 thermomètres) · 4 et si on arrête le compresseur ? (pas à pas, 4 étapes, HP et BP se rejoignent,
  jauge d’effort du moteur) · 5 et si le capillaire se bouche ? (pas à pas, 3 étapes, bouchon, givre, BP qui chute,
  évaporateur vide) · 6 charger la machine (exercice : curseur et boutons ± 5 g, balance, plaque signalétique « exemple »,
  la nappe réagit, trois verdicts expliqués) · 7 vérifier (6 questions, une explication par réponse).
- Brique ajoutée : `scene-capillaire.js` (`window.CAPILLAIRE_SCENES`) ; le dessin se redessine selon la largeur
  disponible (480 à 1000 unités, hauteur fixe) ; manomètres en nombre variable (2, 3 ou 4) selon l’écran et la largeur.
- Voix : `narration` de chaque écran, voix du navigateur tant que les MP3 ne sont pas générés (clés nouvelles).
- Référentiel : `couverture.json` — enseigné `9.01` (tous les écrans) ; appui `1.02`, `1.04`, `5.05`, `5.06`, `9.10`.
  `9.03` n’est pas enseigné (un capillaire ne se règle pas).
- Correspondance climatisation : station CartoClim 2-5 « Détendre : capillaire et détendeur électronique » (lien à
  poser par le chat superviseur ; rien n’est refait ici).

## Contrôle

Serveur local : `http://localhost:8794/packs/fluides/res/detente-capillaire/index.html` (lancé par le chat superviseur).
`node packs/fluides/res/detente-capillaire/tests/qa.mjs` (Playwright de `C:\git\hydrometro\node_modules`, Edge) :
1366×768 et 390×844, console propre, page sans défilement, texte ≥ 14 pt, aucune étiquette sur un tracé, animations,
pas à pas, exercice (curseur, boutons, trois verdicts, machine vide, le dessin réagit), quiz 5/6, clavier, badge
référentiel, impression, mot interdit absent. `CAPTURES=<dossier>` enregistre des PNG.

## Ce qui reste (hors périmètre)

- Liens vers les autres gares et vers CartoClim 2-5 ; entrée dans `moteur/plan-donnees.js` ; build (`animations.mjs`,
  `retour-accueil.mjs`) ; MP3 ; catalogue ; RAG ; nouveautés.

## Points métier à faire valider par F. Henninot

1. Les premières bulles naissent « avant la sortie », vers 70 % de la longueur du tube ; la pression baisse doucement
   tant que le liquide est seul, puis plus vite (profil qualitatif, aucun chiffre). Le tube se refroidit après les
   premières bulles.
2. Écran 3 : le liquide arrive plus froid au bout du tube (« plus de froid utile ») et la vapeur repart plus chaude
   (« plus de sécurité pour le compresseur ») ; « ce contact fait partie de la machine : on le laisse en place ».
3. Écran 4 : à l’arrêt le tube reste ouvert, HP et BP se rejoignent (même repère au milieu du cadran), le moteur
   redémarre sans effort (« les petits moteurs des réfrigérateurs ont un faible couple de démarrage »). La jauge
   « moteur » est un repère qualitatif d’effort ; aucune durée d’attente avant redémarrage n’est donnée.
4. Écran 5 : le bouchon est placé près de la sortie (là où c’est froid, où l’humidité gèle) ; on montre du givre sur le
   tube à l’endroit du bouchon (comme CartoClim 2-5) ET la disparition du givre de l’évaporateur (consigne de
   F. Henninot) : les deux sont-ils cohérents pour vous ? « On le remplace, on ne le raccourcit pas, on ne le pince pas ».
5. Écran 6 : la charge de la plaque est un exemple (120 g) ; « juste » = à 5 g près (exemple, pas une tolérance de
   constructeur) ; trop = le liquide va jusqu’à la sortie de l’évaporateur et peut revenir au compresseur ; pas assez =
   nappe courte, l’évaporateur refroidit mal. Les deux manomètres suivent la charge (HP et BP plus basses si elle manque,
   plus hautes si elle est trop forte) : ajout qualitatif non demandé, à garder ou à retirer.
6. Codes de charge `5.05` et `5.06` portés en appui seulement (trouvés dans le cours HabFluide G5) : à confirmer.
7. Question 6 (aspiration) et question 5 (symptômes d’un capillaire bouché) : à relire.

# Reprise — Le détendeur MOP (gare 3 de la ligne LES DÉTENDEURS)

Gare fabriquée sur le moule de la gare 0 (`../_detendeurs-commun/MOULE.md`, `../detendeurs-famille/`) en recopiant la
gare 2 (`../detendeur-egalisation-externe/`). Atelier : worktree `C:\git\_wt-detendeurs`, branche `ligne-detendeurs`.
Rien n’est commité ni en ligne : feu vert de F. Henninot d’abord.

## État (06/10/2026)

- 5 écrans : 1 carte d’identité (symbole, coupe au repos avec le bulbe ouvert en coupe et sa petite charge, jauge de BP
  avec son trait rouge « plafond », visite guidée bulbe → membrane → plafond, « il règle : la surchauffe, et il plafonne
  la BP ») · 2 le bulbe à charge limitée (pas à pas, 4 étapes, gros plan du bulbe, manomètre qui plafonne pendant que le
  thermomètre monte) · 3 et si la chambre est chaude ? (sans MOP / avec MOP côte à côte, pas à pas, 5 étapes, jauge de BP
  et jauge d’intensité du moteur) · 4 où monter la tête ? (exercice : A air froid, B à l’abri, C contre l’entrée de
  l’évaporateur ; la charge migre vers la tête si elle est plus froide que le bulbe) · 5 vérifier (6 questions, une
  explication par réponse).
- Brique ajoutée : `scene-mop.js` (`window.MOP_SCENES`) ; la coupe se redessine selon la largeur disponible (560 à 1000
  unités, hauteur fixe 360) ; sur téléphone l’écran 3 passe en deux onglets.
- Voix : `narration` de chaque écran, voix du navigateur tant que les MP3 ne sont pas générés (clés nouvelles).
- Référentiel : `couverture.json` — enseigné `9.01` (tous les écrans), `9.02` (écran 4, monter la tête dans la bonne
  position) ; appui `1.02`, `1.04`, `9.10`. `9.03` n’est pas enseigné (aucun écran n’apprend à régler).

## Contrôle

Serveur local : `http://localhost:8794/packs/fluides/res/detendeur-mop/index.html` (lancé par le chat superviseur).
`node packs/fluides/res/detendeur-mop/tests/qa.mjs` (Playwright de `C:\git\hydrometro\node_modules`, Edge) : 1366×768 et
390×844, console propre, page sans défilement, texte ≥ 14 pt, aucune étiquette sur un tracé, animations, pas à pas,
exercice (3 choix, le dessin réagit, la charge migre en A et C et pas en B), quiz 5/6, clavier, badge référentiel,
impression, mot interdit absent. `CAPTURES=<dossier>` enregistre des PNG.

## Ce qui reste (hors périmètre)

- Liens vers les autres gares ; entrée dans `moteur/plan-donnees.js` ; build (`animations.mjs`, `retour-accueil.mjs`) ;
  MP3 ; catalogue ; RAG ; nouveautés.

## Points métier à faire valider par F. Henninot

1. Le plafond : la jauge de BP porte un trait rouge « plafond » ; avec MOP la BP s’arrête au trait, sans MOP elle monte
   dans le rouge. Le dessin n’a aucun chiffre ; la valeur MOP est renvoyée à l’élément thermostatique et à la notice.
2. Écran 3 : au démarrage, les DEUX détendeurs ouvrent grand (bulbe chaud, BP encore basse) ; la différence apparaît
   quand la BP monte : avec MOP la pression du bulbe est plafonnée, le détendeur ne peut plus ouvrir davantage et la BP
   s’arrête ; sans MOP il reste ouvert et la BP continue. La jauge d’intensité du moteur suit la BP (vapeur plus dense
   à l’aspiration = moteur qui force) : repère qualitatif, pas une mesure.
3. Écran 4, choix C « contre l’entrée de l’évaporateur » : donné comme mauvais (endroit le plus froid, là où ça bout :
   la tête y serait plus froide que le bulbe). Choix A « dans l’air froid de l’évaporateur » : mauvais. Choix B « à
   l’abri, à l’air plus chaud » : bon. Les trois sont des situations de dessin, pas des cotes de montage ; la notice
   du constructeur donne l’emplacement exact.
4. Écran 4 : si la tête est plus froide, tout le liquide de la charge « migre » dans la tête (nappe bleue dans la
   tête, bulbe vide) et la pression vue par la membrane devient celle de la tête : le détendeur se ferme et perd le
   contrôle. Raccourci pédagogique d’un phénomène réel plus nuancé (migration partielle, inertie thermique).
5. Question 6 : « la vis règle la surchauffe, la valeur MOP est fixée par la charge du bulbe ». À confirmer (la vis
   déplace un peu le plafond en changeant la force du ressort ; le cours n’entre pas dans ce détail).
6. Symbole : celui du thermostatique à égalisation interne (`detendeur_thermo_int.svg`) ; un détendeur MOP existe
   aussi à égalisation externe, non traité ici.
7. Le bulbe MOP est dessiné avec « un peu de liquide au fond + vapeur » (charge limitée) ; le bulbe ordinaire du
   « sans MOP » garde du liquide à toute température (charge ordinaire = pression qui monte sans plafond).

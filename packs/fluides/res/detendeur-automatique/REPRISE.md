# Reprise — Le détendeur automatique (gare 4 de la ligne LES DÉTENDEURS)

Gare fabriquée sur le moule de la gare 0 (`../_detendeurs-commun/MOULE.md`, `../detendeurs-famille/`) en recopiant la
gare 3 (`../detendeur-mop/`). Atelier : worktree `C:\git\_wt-detendeurs`, branche `ligne-detendeurs`.
Rien n’est commité ni en ligne : feu vert de F. Henninot d’abord.

## État (06/10/2026)

- 5 écrans : 1 carte d’identité (symbole « vanne à pression constante », coupe au repos `DS.coupe("automatique")`,
  jauge de BP avec son repère ▼ consigne, visite guidée ressort + vis → pression → aiguille → jauge, « il règle : la
  pression d’évaporation », « on le trouve surtout sur les machines à glace en écailles ») · 2 la balance ressort /
  pression (pas à pas, 4 étapes : BP sous la consigne, la membrane descend, le clapet ouvre, il referme : équilibre ;
  jauge de BP et courbe de la BP au fil du temps) · 3 et si la charge change ? (pas à pas, 6 étapes : charge normale,
  la charge monte, il ferme, l’évaporateur manque de liquide, la charge baisse, retour de liquide ; jauge de BP et bilan
  « barre = ce qui passe / trait = ce qu’il faut » avec verdict) · 4 régler la consigne (exercice : gros plan de la
  tête, vis vue de dessus, boutons visser / dévisser ¼ de tour, manomètre avec arc vert « BP demandée (exemple) »,
  courbe ; l’aiguille met du temps à bouger ; retours : trop basse, trop haute, dans le repère, « sans attendre » ;
  course de la vis limitée) · 5 vérifier (6 questions, une explication par réponse).
- Brique ajoutée : `scene-automatique.js` (`window.AUTOMATIQUE_SCENES`) ; la scène se redessine selon la largeur
  disponible ; les pastilles gardent à peu près la même taille à l’écran ; sur téléphone le panneau passe sous la jauge.
- Convention de couleurs des forces (ligne LES DÉTENDEURS) : gris acier = le ressort (il OUVRE, il vient de la vis), bleu
  = la pression d'évaporation (elle FERME, elle vient de la sortie BP, dont l'intérieur communique avec la chambre sous
  la membrane). Les coupes montrent la vis, le ressort entre deux plateaux, puis les flèches, dans cet ordre ; légende
  HTML sous chaque dessin (écrans 1 à 4) : « ressort (réglé par la vis) : ouvre », « pression d’évaporation : ferme ».
- Le dessin masque les deux flèches natives de BP de `DS.coupe("automatique")` (sélecteur sur leur couleur, vérifié par
  la QA : 2 flèches) et les redessine avec un écart ×4 autour de la consigne, pour que la balance se voie. Si
  `scenes-detendeurs.js` change la couleur de ces flèches, la QA le dit (« flèches natives masquées »).
- Voix : `narration` de chaque écran, voix du navigateur tant que les MP3 ne sont pas générés (clés nouvelles).
- Référentiel : `couverture.json` — enseigné `9.01` (écrans 1, 2, 3, 5), `9.03` (écran 4 et la question 6 du quiz) ;
  appui `1.02`, `1.04`, `9.10`.

## Contrôle

Serveur local : `http://localhost:8794/packs/fluides/res/detendeur-automatique/index.html` (lancé par le chat superviseur).
`node packs/fluides/res/detendeur-automatique/tests/qa.mjs` (Playwright de `C:\git\hydrometro\node_modules`, Edge) :
1366×768 et 390×844, console propre, page sans défilement, texte ≥ 14 pt, aucune étiquette sur un tracé, animations,
pas à pas, carte d’identité, exercice (l’aiguille répond à la vis avec retard, trop basse / trop haute / dans le repère
vert, remarque « sans attendre », recommencer, course de la vis), quiz 5/6, clavier, badge référentiel, impression,
citation du symbole, mot interdit absent. `CAPTURES=<dossier>` enregistre des PNG.

## Ce qui reste (hors périmètre)

- Liens vers les autres gares ; entrée dans `moteur/plan-donnees.js` ; build (`animations.mjs`, `retour-accueil.mjs`) ;
  MP3 ; catalogue ; RAG ; nouveautés.

## Points métier à faire valider par F. Henninot

1. Il tient la BP, pas le liquide. Charge en hausse : la BP monte un peu au-dessus de la consigne, la pression gagne
   sur le ressort, il ferme, la BP revient à la consigne et y reste, mais la nappe est courte (évaporateur « affamé »).
   Charge en baisse : la BP descend un peu sous la consigne, le ressort gagne, il ouvre, la BP revient à la consigne,
   mais la nappe file jusqu’à la sortie (risque de retour de liquide). L’aiguille ne s’écarte que brièvement ; le
   verdict se lit sur la nappe et le bilan. Le dessin de l’écran 3 fixe cet écart dans le pas à pas (état `ecart`)
   au lieu de suivre `DS.bp`, qui ferait dériver la BP avec la charge.
2. Écran 2 : la BP dépasse un peu la consigne puis se stabilise (le clapet « se referme à moitié ») : stylisation d’un
   retour à l’équilibre sans oscillation durable.
3. Écran 4 : « visser comprime le ressort, la BP monte ; dévisser la fait baisser » ; un quart de tour = un cran
   qualitatif ; l’aiguille met 3 à 4 secondes à se stabiliser ; le repère vert est « un exemple », aucune valeur de
   constructeur. À confirmer : le sens vissé = ressort plus comprimé = BP plus haute vaut-il pour les détendeurs
   automatiques que l’on rencontre ? (la notice fait foi).
4. Écran 1, narration : le détendeur est dit « aussi pressostatique, ou à pression constante » (termes du cahier des
   charges). « Machines à glace en écailles » : exemple validé, sans nom de marque, fontaine réfrigérée non citée.
5. Quiz, question 5 : « à l’arrêt du compresseur, la BP monte, le détendeur reste fermé, il n’égalise pas les
   pressions » : donné tel que validé, sans dessin à l’appui.
6. Symbole : « vanne à pression constante » QElectroTech (CC BY 3.0), cité dans « Sources » et dans la version
   imprimable ; identique à la gare 0.

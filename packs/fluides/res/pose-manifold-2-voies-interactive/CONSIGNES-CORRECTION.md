# Consignes de correction — à appliquer une fois le module terminé

Audit du 13/08/2026 (Claude, 15 h 25) sur `app.js` des modules
`pose-manifold-2-voies-interactive` et `pose-manifold-interactive`.
Ces consignes sont autoportantes : elles s'appliquent sans lire la conversation d'origine.
Ne rien appliquer tant que le développement en cours n'est pas terminé, puis appliquer
dans l'ordre ci-dessous.

## 1. QCM devinable — CORRIGÉ LE 13/08/2026

**Constat :** les 19 questions du tableau `QUIZ` ont toutes la bonne réponse en
`good: 0`, et `renderQuiz()` affiche les choix dans l'ordre du tableau
(`item.choices.map(...)`, aucun mélange). Cliquer toujours la première réponse
donne 19/19. En plus, la bonne réponse est presque toujours la plus longue.

**Correction attendue, en deux volets :**

a) **Mélanger les choix à l'affichage.** À l'arrivée sur chaque question (une fois
par question et par série, pas à chaque re-rendu), générer une permutation des
index avec un mélange de Fisher-Yates. Afficher les choix dans l'ordre permuté,
mais conserver `data-choice` = index d'origine : la comparaison à `item.good`,
le marquage `.good`/`.bad` et le score restent alors inchangés. Régénérer la
permutation quand `quizIndex` change et au « Refaire le QCM ».
Ne PAS re-mélanger entre la réponse et l'affichage de la correction (les boutons
doivent rester à leur place quand la correction s'affiche).

b) **Rééquilibrer les longueurs.** Réécrire les distracteurs pour que la bonne
réponse ne soit plus systématiquement la plus longue : sur l'ensemble des 19
questions, le rang de longueur de la bonne réponse (1er, 2e, 3e) doit être
réparti. Étoffer les distracteurs en phrases complètes plausibles ; ne pas
raccourcir les bonnes réponses (elles portent le contenu). Les distracteurs
restent faux sans ambiguïté — jamais de demi-vérité dangereuse.

**Application :** Fisher-Yates exécuté une fois par question et par série ;
`data-choice` conserve l’index d’origine. Répartition obtenue pour la longueur
de la bonne réponse : 7 plus courtes, 6 intermédiaires, 6 plus longues. Deux
séries complètes ont produit des permutations différentes et les deux bilans
ont affiché `19/19`.

## 2. Jeu d'ordre figé — CORRIGÉ LE 13/08/2026

**Constat :** `ORDER_SHUFFLED` est une constante codée en dur — le mélange est
identique à chaque partie, l'élève peut mémoriser les positions.

**Correction :** supprimer la constante et mélanger `ORDER_ITEMS` (Fisher-Yates)
au lancement de chaque partie (là où `orderChosen` est remis à zéro). Si le
mélange obtenu est l'ordre correct, remélanger.

**Application :** la banque est remélangée au lancement, l’ordre professionnel
est explicitement refusé comme état initial et deux parties de contrôle ont
produit deux banques différentes avant validation `8/8`.

## 3. Coquilles d'affichage du bilan QCM — DÉJÀ CORRIGÉ, à vérifier seulement

Les `<\p>`, `<\div>` et `\${QUIZ.length}` (antislash qui annulait l'interpolation)
des lignes du bilan ont été corrigés le 13/08 vers 15 h 16. Après la fin du
développement, vérifier qu'aucune séquence `<\` ni `\$` ne subsiste :
`grep -n '<\\\\\|\\\\\$' app.js` doit ne rien retourner.

## 4. Module 4 voies (`pose-manifold-interactive`)

a) **Valeur inventée à retirer :** l'étape « Libérer le presse-étoupe BP » dit
« la fiche du plateau indique un quart de tour ». Aucun nombre de tours universel
n'existe — remplacer par « selon la fiche du poste », comme partout dans le 2 voies.

b) **Contradiction de séquence de dépose entre les deux modules — NE PAS harmoniser
sans décision de F. Henninot :**
- le 2 voies enseigne : récupérer le fluide des flexibles par pump-down, PUIS
  fermer les mini-vannes (« la mini-vanne se ferme après récupération du fluide,
  pas avant ») ;
- le 4 voies enseigne : fermer les mini-vannes AVANT le traitement du fluide
  résiduel (bouton « FLUIDE PIÉGÉ » renvoyant à la procédure du plateau).

Un élève qui fait les deux modules reçoit deux règles opposées. La séquence de
référence est celle du plateau réel : question à trancher par F. Henninot, puis
aligner le module non conforme sur l'autre.

## 5. Non-régression après corrections

- Rejouer le parcours guidé complet (78 gestes) sans blocage ;
- refaire le QCM deux fois : vérifier que l'ordre des choix change et que le
  score final s'affiche « n/19 » ;
- refaire le jeu d'ordre deux fois : vérifier deux mélanges différents et la
  correction place par place ;
- console navigateur vide (aucune erreur ni alerte) ;
- les interdits de la fiche REPRISE restent en vigueur : pas de nouvelle entrée
  dans `cartes.js`, pas de build global, pas de push, pas d'indexation RAG sans aval
  explicite — le module reste BROUILLON MÉTIER jusqu'au bon à tirer humain.

**Contrôle appliqué :** 78 gestes guidés rejoués jusqu’au bilan ; deux QCM
complets et deux jeux d’ordre complets réussis ; aucune erreur JavaScript ni
alerte console du module. La requête automatique de navigateur pour
`/favicon.ico` a été supprimée par un favicon local vide.

# Corrections — branche Thermique (6 stations)

Le défaut transversal « voix-index.js » signalé par l'audit était déjà corrigé
dans les 6 fichiers (comme annoncé par le brief) : rien touché sur ce point.

## thermique-pourquoi-une-rt
- Quiz Q1-Q4 : bonnes réponses resserrées en longueur sur les distracteurs
  existants (Q1, Q3, Q4 étaient nettement les plus longues) et repositionnées
  (1,2,2,2 → 3,1,4,2). Q4 : suppression de deux « jamais » dans les
  distracteurs, reformulés sans absolu.
- `FOND.md` : ligne des positions mise à jour (3, 1, 4, 2).

## thermique-re2020
- SVG `comparaison-rt2012-re2020.svg` : ajout du label manquant « nouveau »
  sur la case Confort d'été (viewBox agrandi de 340 à 360 pour lui faire de
  la place, même gabarit que Bbio et IC).
- Quiz Q1-Q4 : toutes les bonnes réponses étaient nettement les plus longues
  (écarts de 18 à 28 caractères) ; resserrées ou distracteur voisin allongé
  selon le cas, positions reréparties (2,3,2,2 → 2,4,1,3).

## thermique-confort-ete
- Quiz Q1-Q3 : bonnes réponses trop longues, resserrées. Q3 : distracteur
  « jamais la chaleur » reformulé (« pas sa chaleur »). Positions reréparties
  (2,3,3,2 → 4,2,3,1).

## thermique-existant
- Écran/question 2 : l'exemple interrogé (« remplacer une seule chaudière »)
  ne correspondait pas au SVG de rappel réemployé (une fenêtre, selon son
  `alt`). Question, narration, titre, options et explication réécrits autour
  de la fenêtre pour coller à l'image ; aucun SVG modifié.
- Quiz Q1, Q3, Q4 : distracteurs contenant « aucun/aucune/jamais/toujours »
  reformulés sans absolu (5 occurrences). Longueurs resserrées (Q1, Q3, Q4).
  Positions : les 4 bonnes réponses étaient toutes en position 2 → réparties
  en 1, 3, 2, 4.

## thermique-dpe
- Quiz Q1-Q4 : bonnes réponses trop longues sur Q1 et Q4, resserrées.
  Distracteurs « aucune étiquette », « toujours », « jamais » (x2)
  reformulés sans absolu. Positions reréparties (2,3,2,2 → 3,4,1,2).

## thermique-cee
- Quiz Q1-Q4 : longueurs resserrées sur les 4 questions (écarts de 7 à 16
  caractères ramenés à 5 ou moins). Distracteur « aucune influence »
  reformulé. Positions reréparties (2,3,2,2 → 2,1,3,4).

## Narrations modifiées
Aucune — le rapport n'en signalait pour cette branche ; aucun `data-narration`
touché, aucun MP3 perdu.

## Ce qui reste pour F. Henninot
- Arbitrage éditorial à valider : dans **thermique-existant**, la question 2
  porte maintenant sur une fenêtre (au lieu d'une chaudière) pour coller au
  SVG réemployé — alternative non retenue : redessiner le SVG pour y montrer
  une chaudière.
- Valeurs toujours refusées faute de source (listées par chaque `FOND.md`,
  § « À sourcer ») : générations RT intermédiaires, date d'entrée en vigueur
  RE2020, seuils Bbio/Cep/DH/IC, méthode Th-BCE, niveaux minimaux par
  composant, calendrier DPE, montants/taux CEE — aucune n'a été ajoutée.
- Contenu manquant signalé par l'audit mais non ajouté (liste seulement, par
  station) : distinction résidentiel/tertiaire et générations intermédiaires
  (pourquoi-une-rt) ; modulation par zone climatique et nom de la méthode de
  calcul (RE2020) ; logement traversant et contexte canicule (confort-ete) ;
  renvoi CEE et contrôle de conformité (existant) ; qui réalise le DPE et
  recours en cas d'erreur (dpe) ; types de travaux couverts et audit
  énergétique préalable (cee).

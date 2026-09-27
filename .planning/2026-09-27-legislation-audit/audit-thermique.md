# Audit — Thermique (6 stations) — 27/09/2026

## thermique-pourquoi-une-rt
| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:284-288 | Le commentaire dit « PAS de voix-index.js ici : […] elle parle donc avec la voix du navigateur », mais le script juste en dessous charge bien `voix-index.js`. Texte périmé qui décrit un état contraire au code réel. | Retirer le commentaire faux ou retirer le script, selon l'état réel de fabrication de l'audio. |
| 🟠 | index.html (Q1-Q4) | Les 4 bonnes réponses sont en position 1, 2, 2, 2 (conforme à ce qu'annonce FOND.md) mais 3 des 4 bonnes réponses sont aussi nettement la formulation la plus longue de leur liste (Q1, Q3, Q4) — FOND.md affirme pourtant « longueurs équilibrées ». | Raccourcir les bonnes réponses ou allonger les distracteurs pour égaliser. |

Chiffres sans source : aucun (aucune valeur de seuil dans la page, conforme aux consignes).
À sourcer (fond) : 3 points inchangés — générations intermédiaires (RT1982-2005), date d'entrée en vigueur de la RE2020, valeurs Bbio/Cep/DH/IC.
Ce qui manque : le nom du texte réglementaire de référence (où vérifier), la distinction résidentiel/tertiaire (jamais évoquée), et un mot sur le secteur non résidentiel du choc pétrolier (contexte purement français vs directives européennes ultérieures).

## thermique-re2020
| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | svg/comparaison-rt2012-re2020.svg:21-32 | La narration de l'écran 6 dit « les trois autres cases de la colonne RE2020 portent la mention nouveau », mais le SVG ne porte le label « nouveau » que sur 2 cases (Bbio, IC) ; la case « Confort d'été » n'a pas ce label. | Ajouter `<text class="neuf">nouveau</text>` sur la case confort d'été, ou corriger la narration. |
| 🟠 | index.html:276-280 | Même contradiction voix-index.js que les 5 autres stations (voir synthèse). | Idem. |
| 🟠 | index.html (Q1-Q4) | Positions des bonnes réponses : 2, 3, 2, 2 — jamais en position 1 ni 4, et 3 des 4 bonnes réponses sont la formulation la plus longue (Q1, Q2, Q4). | Idem que ci-dessus. |

Chiffres sans source : aucun.
À sourcer (fond) : 3 points inchangés — valeurs de seuil Bbio/Cep/IC, méthode de calcul du Cep, détail réglementaire de l'IC.
Ce qui manque : la modulation par zone climatique (jamais mentionnée, même qualitativement), et le nom de la méthode de calcul (Th-BCE ou équivalent) pour que l'élève sache où chercher au-delà du principe.

## thermique-confort-ete
| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:267-271 | Même contradiction voix-index.js. | Idem. |
| 🟠 | index.html (Q1-Q4) | Positions des bonnes réponses : 2, 3, 3, 2 — jamais 1 ni 4 ; Q1, Q2, Q3 ont la bonne réponse nettement la plus longue de leur liste. | Idem. |

Chiffres sans source : aucun.
À sourcer (fond) : 3 points inchangés — seuil réglementaire de DH, méthode exacte de calcul, caractéristiques exigées pour qu'un dispositif soit reconnu efficace.
Ce qui manque : aucune mention du logement traversant (paramètre de conception courant à côté des 3 leviers cités), ni du contexte canicule/évolution climatique qui justifie l'indicateur — 2 lignes suffiraient.

## thermique-existant
| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:196-210 (Q2) vs écran 3 | La question 2 interroge sur le remplacement « d'une seule chaudière », mais l'image de rappel (svg/renovation-par-element.svg, réemploi de l'écran 3) illustre une fenêtre selon son `alt` (« une seule fenêtre mise en évidence… ») — aucune chaudière n'y est dessinée. L'exemple interrogé et l'exemple illustré divergent. | Soit changer l'exemple de la question pour une fenêtre, soit illustrer une chaudière dans le SVG de rappel. |
| 🟠 | index.html:267-271 | Même contradiction voix-index.js. | Idem. |
| 🟠 | index.html (Q1-Q4) | Les 4 bonnes réponses sont toutes en position 2 sur 4 — motif parfaitement régulier, repérable sans lire le cours. | Varier les positions (répartition du type 1,3,4,2 par exemple). |

Chiffres sans source : aucun.
À sourcer (fond) : 3 points inchangés — niveaux de performance minimaux par composant, seuil de bascule élément/globale, liste exhaustive des interventions déclenchantes.
Ce qui manque : pas de renvoi vers les CEE alors que la station suivante (DPE) fait ce lien pour les travaux — un teaser financier serait cohérent ici aussi ; rien non plus sur qui contrôle la conformité (auto-déclaratif ou vérifié).

## thermique-dpe
| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:269-273 | Même contradiction voix-index.js. | Idem. |
| 🟠 | index.html (Q1-Q4) | Positions : 2, 3, 2, 2 — jamais 1 ni 4 ; Q1 et Q4 ont la bonne réponse nettement la plus longue. | Idem que les autres stations. |

Chiffres sans source : aucun (l'échelle A à G est affirmée comme certaine par la commande, sans valeur kWh/m² — conforme).
À sourcer (fond) : 4 points inchangés — calendrier de restriction de location par lettre, seuils séparant les classes, durée de validité, modalités de l'audit énergétique.
Ce qui manque : qui réalise le DPE (diagnostiqueur certifié) n'est jamais dit, alors que la station insiste sur la fiabilité de la méthode ; le sort d'un DPE erroné (recours, responsabilité) n'est pas abordé.

## thermique-cee
| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:272-276 | Même contradiction voix-index.js. | Idem. |
| 🟡 | index.html (Q1-Q4) | Positions : 2, 3, 2, 2 — jamais 1 ni 4 ; motif moins marqué en longueur ici (une seule bonne réponse nettement plus longue, Q3), mais la position reste très régulière. | Idem. |

Chiffres sans source : aucun.
À sourcer (fond) : 3 points inchangés — montants/taux d'aide, liste des qualifications reconnues (renvoyée à la station en préparation), détail administratif du dossier.
Ce qui manque : aucune mention des types de travaux concrètement couverts (isolation, chauffage, ventilation — cités une fois en passant à l'écran 2, jamais listés), ni de la notion d'audit énergétique préalable pour les gros chantiers.

## Synthèse de la branche

- Défaut transversal n°1 : sur les 24 questions de la branche, la bonne réponse n'est **jamais** en position 4 et n'apparaît en position 1 qu'une seule fois (station « Pourquoi une RT ? », Q1) — elle est en position 2 ou 3 dans 23 cas sur 24, et souvent la formulation la plus longue de sa liste. C'est un motif mécaniquement devinable, indépendant du cours.
- Défaut transversal n°2 : les 6 stations portent verbatim le même commentaire HTML « PAS de voix-index.js ici : aucun audio n'est encore fabriqué […] elle parle donc avec la voix du navigateur », immédiatement contredit par le `<script src="…/voix-index.js">` chargé juste en dessous — copié tel quel dans les 6 fichiers depuis le gabarit.
- Défaut mineur isolé : la case « Confort d'été » de comparaison-rt2012-re2020.svg (station RE2020) n'a pas le label « nouveau » que la narration lui attribue.
1. Rééquilibrer la position des bonnes réponses sur les 24 questions des 6 stations (ou les randomiser côté app.js) — c'est le seul défaut qui touche l'évaluation elle-même plutôt que le cours.
2. Trancher et corriger le bloc voix-index.js/commentaire dans les 6 fichiers : soit l'audio existe et le commentaire est faux, soit il n'existe pas et le script ne doit pas être chargé.
3. Ajouter le label « nouveau » manquant sur la case Confort d'été de comparaison-rt2012-re2020.svg (RE2020, écran 6).
4. Aligner l'exemple de la question 2 de thermique-existant (chaudière) avec le SVG de rappel réemployé (fenêtre).
5. Ajouter dans chaque station la ou les 2-3 lignes de contenu manquant relevées ci-dessus (texte réglementaire de référence, zone climatique, diagnostiqueur, types de travaux CEE) pour amener les 6 stations au niveau BTS visé.

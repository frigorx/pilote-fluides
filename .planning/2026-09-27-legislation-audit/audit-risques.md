# Audit — Risques professionnels (6 stations) — 27/09/2026

## risques-duerp
| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟡 | Q3 (quiz) | La bonne réponse (« engins de levage ou d'autres entreprises… ») est nettement plus longue que les trois distracteurs | Raccourcir légèrement la bonne réponse ou étoffer un distracteur |

Chiffres sans source : aucun (station explicitement sans chiffre, cohérent avec le fond).
À sourcer (fond) : périodicité de mise à jour, seuils d'effectif, sanctions, formalisation exacte du document de prévention — tous absents de la page, conforme au fond.
Ce qui manque : aucune mention du droit de retrait ni du rôle du CSE en cas de désaccord sur un risque signalé ; le lien entre DUERP et plan de prévention formalisé (art. R.4512-6 s.) reste volontairement flou, ce qui est assumé mais laisse l'élève sans savoir à qui s'adresser si le document n'existe pas.

## risques-neuf-principes
| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| — | — | Aucun défaut relevé | — |

Chiffres sans source : aucun.
À sourcer (fond) : numéro d'article du code du travail, périodicité de vérification EPI — tous deux absents de la page, conforme au fond.
Ce qui manque : la station ne relie jamais les neuf principes à l'obligation légale de l'employeur (art. L.4121-2) autrement que par « le code du travail fixe » ; un mot sur qui doit appliquer concrètement cette hiérarchie sur le terrain (l'employeur planifie, le technicien l'applique) resterait à ajouter.

## risques-epi
| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟡 | Q2 (quiz) | La bonne réponse est la seule à citer un exemple concret entre parenthèses, ce qui la distingue nettement des trois distracteurs | Retirer ou généraliser la parenthèse |

Chiffres sans source : aucun.
À sourcer (fond) : numéros de normes EN pour gants/lunettes, seuil de température/durée de brûlure par le froid — absents de la page, conforme au fond.
Ce qui manque : aucune norme EN n'est citée pour aucun EPI (gants, lunettes, chaussures), même à titre d'exemple générique ; l'obligation de l'employeur de fournir gratuitement les EPI n'est pas mentionnée, alors qu'elle est structurante pour un futur technicien salarié.

## risques-hauteur
| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟡 | Q1 (quiz) | La bonne réponse (« composante ordinaire du métier — toitures, terrasses… ») fait près du double de la longueur des distracteurs | Raccourcir la bonne réponse aux mêmes proportions que les autres |

Chiffres sans source : aucun.
À sourcer (fond) : seuil de hauteur déclenchant une obligation de protection, périodicités de vérification d'échafaudage, charge/nombre de personnes autorisées — tous absents de la page, conforme au fond.
Ce qui manque : la station ne mentionne jamais le port ou la vérification préalable d'un harnais avant la montée (seulement « n'intervient qu'en dernier ») ; un mot sur la formation obligatoire au montage d'échafaudage (personne compétente qui monte, distincte de celle qui vérifie) clarifierait le rôle du technicien face à un échafaudage déjà en place.

## risques-chimique
| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟠 | Écran 2 / svg/chimique-pictogrammes.svg | Le pictogramme étiqueté « Danger santé » est dessiné comme un point d'exclamation ; or dans la classification SGH/CLP réelle, le pictogramme « point d'exclamation » (GHS07) signale « nocif/irritant », tandis que le pictogramme « danger pour la santé » (GHS08, silhouette avec éclat sur la poitrine) couvre justement les CMR traités à l'écran 4. Le `<desc>` du SVG précise bien « non identique à un pictogramme officiel », mais ni l'alt ni la narration ne le disent : l'élève risque de mémoriser le mauvais symbole pour un produit CMR | Soit renommer la 4e case (« nocif/irritant » au lieu de « danger santé »), soit ajouter dans l'alt/la narration que les pictogrammes sont stylisés et renvoyer explicitement à la FDS pour le symbole réel |
| 🟡 | Q2 (quiz) | La bonne réponse est nettement plus longue et détaillée (parenthèse d'exemples) que les trois distracteurs | Raccourcir ou uniformiser les longueurs |

Chiffres sans source : aucun.
À sourcer (fond) : VLEP, classification H-phrase précise par produit — absents de la page, conforme au fond. Le fond signale aussi que seuls 4 pictogrammes sur 8 familles SGH sont illustrés — assumé et cohérent.
Ce qui manque : le lien entre pictogramme et FDS n'est jamais illustré pour un produit CMR précis (la station reste au niveau générique) ; aucune mention du tri des déchets chimiques (huile, solvants) vers une filière agréée, alors que la sous-ligne Déchets existe déjà dans le réseau et pourrait être maillée ici.

## risques-atex
| Gravité | Où | Défaut | Proposition |
|---|---|---|---|
| 🟡 | Q1 (quiz) | La bonne réponse fait plus du double de la longueur de chaque distracteur (118 caractères contre 50-65) | Raccourcir la bonne réponse au format des trois autres |

Chiffres sans source : aucun (les classifications A1/A2L/A2/A3 citées sont vérifiées et correctement sourcées : R134a/R410A/R744 = A1, R32/R1234yf/R454B(/C) = A2L, R152a = A2, R290/R600a(/R1270) = A3 — cohérent avec la classification NF EN 378 / ASHRAE 34).
À sourcer (fond) : concentrations LIE/LSE, catégories de zone ATEX (0/1/2), seuil de charge autorisée par local, valeurs de PRP — tous absents de la page, conforme au fond.
Ce qui manque : la station ne distingue jamais le marquage ATEX du matériel (catégorie 1/2/3, groupe II) même au niveau du principe ; un mot sur la ventilation naturelle vs mécanique (la seule mentionnée) préciserait ce que « ventilation adaptée » recouvre concrètement.

## Synthèse de la branche

- **Défaut transversal n°1 — quiz trop souvent devinables par la longueur.** Dans 5 des 6 stations (duerp, epi, hauteur, chimique, atex), au moins une question a une bonne réponse sensiblement plus longue ou plus détaillée que ses trois distracteurs — jusqu'au double de longueur (risques-atex Q1, risques-hauteur Q1). C'est le défaut le plus répété de la branche.
- **Défaut transversal n°2 — maillage cohérent mais univoque.** Les six stations pointent toutes vers « L'habilitation » (sous-ligne Électrique, en préparation) comme seule ou quasi-seule correspondance ; c'est honnête (aucun lien mort), mais aucune des stations ne se maille entre elles alors que plusieurs se recoupent directement (EPI ↔ neuf-principes sur la hiérarchie de prévention, EPI ↔ chimique sur le choix de gants, atex ↔ chimique sur les pictogrammes).
- **Pas de défaut structurel de fond** : les six stations respectent strictement leur propre liste « à sourcer », n'avancent aucun chiffre non vérifié, et la classification des fluides (risques-atex) est exacte et bien sourcée.
- Écran-narration-alt-figcaption-SVG : cohérence exemplaire sur les six stations, aucune divergence trouvée hors le cas du pictogramme (risques-chimique).
- La suite `⚠️ PAS de voix-index.js ici` / chargement de `moteur/voix-index.js` dans le commentaire HTML n'est **pas** une incohérence : ce fichier est le corpus global de correspondance texte→audio (recherche par hachage), chargé partout ; l'absence réelle d'audio pour ces six stations vient de l'absence d'entrée correspondante dans ce corpus, pas d'un script manquant.

Les 5 corrections les plus utiles, dans l'ordre :
1. Corriger le pictogramme « Danger santé » de risques-chimique (écran 2) — seul défaut de nature réglementaire (🟠) de toute la branche.
2. Raccourcir la bonne réponse de risques-atex Q1, la plus devinable par la longueur de toute la branche.
3. Raccourcir la bonne réponse de risques-hauteur Q1, même défaut, même ampleur.
4. Harmoniser la longueur des bonnes réponses sur risques-duerp Q3, risques-epi Q2 et risques-chimique Q2 (même défaut, moindre ampleur).
5. Ajouter un maillage croisé entre stations de la branche elle-même (EPI ↔ neuf-principes, EPI ↔ chimique, atex ↔ chimique) en plus du renvoi systématique vers l'habilitation.

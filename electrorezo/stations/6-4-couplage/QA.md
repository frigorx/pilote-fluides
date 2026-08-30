# QA — station 6.4

Contrôles passés le 28/08/2026, sur serveur local, page réellement chargée et pilotée.

## La liste du contrat de station

| Contrôle | État | Comment il a été vérifié |
|---|---|---|
| S'ouvre seule, hors du réseau | ✅ | chargée directement, sans passer par la carte |
| Aucune dépendance externe | ✅ | aucun `src`/`href` vers un domaine ; tout est local |
| Les cinq temps montent | ✅ | parcourus un par un : 2 cartes chacun, aucun vide |
| Le symbole vient de la bibliothèque | ✅ | 2 images au temps 4, source notée dans `SOURCES.md` |
| Narration = texte à part | ✅ | fichier `narration.js`, aucun collage de l'écran |
| Aucune formule prononcée | ✅ | relu : « divisé par racine de trois », jamais de symboles épelés |
| Réglage de vitesse présent | ✅ | 0,6× à 1,4×, défaut 0,95× |
| Le réglage **coupe** la lecture en cours | ✅ | `couperVoix()` appelé sur `input` |
| Voix neuronales classées d'abord | ✅ | tri explicite, piège AéroRézo évité |
| On ne parle pas pendant l'évaluation | ✅ | narration vide au temps 5, bouton désactivé |
| Rang des bonnes réponses réparti | ✅ | mesuré : **C · A · D · B · C** |
| Une réponse fausse explique pourquoi | ✅ | les 20 réponses fausses ont leur explication |
| Pas de thème sombre | ✅ | aucun `prefers-color-scheme`, fond crème |
| Aucun blanc pur | ✅ | fonds `#fffdf8`, y compris dans les SVG repris |
| Zéro erreur en console | ✅ | console vide après parcours complet |
| Moins de dix minutes | ✅ | voix mesurée à **4 min 05**, manipulation et jeu compris : ≈ 9 min |

## Le comportement, éprouvé

**Les huit combinaisons du temps 3** rendent le bon verdict :

| Réseau / plaque | Étoile | Triangle |
|---|---|---|
| 400 / 230-400 | ✔ 231 V | ✘ surtension |
| 400 / 400-690 | ✘ sous-alimenté, *le triangle conviendrait* | ✔ 400 V |
| 230 / 230-400 | ✘ sous-alimenté, *le triangle conviendrait* | ✔ 230 V |
| 230 / 400-690 | ✘ *aucun couplage ne convient* | ✘ *idem* |

Le verdict calcule **les deux options avant de parler** : il n'annonce « aucun couplage ne
convient » que lorsque c'est vrai.

**Le mini-jeu** : les cinq bons gestes donnent 5 sur 5, y compris le refus du moteur qui ne
convient pas et l'arrêt devant la plaque effacée.

## Le défaut trouvé et corrigé

**Le chronomètre du mini-jeu continuait de tourner après qu'on ait quitté le temps 5.** Un élève
qui revenait en arrière retrouvait le jeu avancé tout seul. Corrigé dans le moteur commun : un
temps qui s'en va emporte ses minuteurs. Vérifié — après trois secondes passées ailleurs, le jeu
est toujours au moteur 1.

## Ce qui n'est PAS encore contrôlé

| Point | Pourquoi |
|---|---|
| **L'écoute de la voix, en entier, par un humain** | Personne n'a écouté. C'est le contrôle qui manquait sur AéroRézo, et aucune mesure ne le remplace. |
| L'équilibre visuel | Le panneau d'aperçu ne compose pas d'image dans cette session : aucune capture n'a pu être prise. |
| La scène animée du temps 2 | En fabrication chez Claude Design. L'emplacement est réservé. |
| L'impression A4 | Non testée. |
| Le rendu sur tablette | Non testé. |

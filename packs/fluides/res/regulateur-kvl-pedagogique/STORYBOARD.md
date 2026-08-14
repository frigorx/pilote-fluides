# Storyboard — Le régulateur de pression de carter

## Intention

Partir de l’organe réel fourni comme référence, le replacer dans le circuit, puis suivre la chaîne
pression de sortie → équilibre mécanique → ouverture. La fin du parcours construit une méthode de
sélection et de contrôle qui empêche le réglage « à l’oreille ».

| Écran | Question élève | Action | Idée à retenir |
|---:|---|---|---|
| 1 | À quoi le reconnaître ? | Afficher les repères extérieurs | La forme aide ; le marquage confirme |
| 2 | Où se monte-t-il ? | Repérer le KVL dans la Croix | Aspiration, juste avant le compresseur |
| 3 | Que protège-t-il ? | Comparer régime établi, arrêt long et dégivrage | Il limite la pression et réduit le risque de surcharge moteur |
| 4 | Peut-on inverser le corps ? | Comparer les deux sens | La flèche et la notice imposent le passage |
| 5 | Quelle pièce fait quoi ? | Sélectionner sept éléments | Vis, ressort, soufflet, joint et siège construisent la régulation |
| 6 | Quelle pression commande ? | Choisir entrée ou sortie | La pression de sortie est la grandeur régulée |
| 7 | Ouvert ou fermé ? | Comparer trois états | Le KVL module progressivement |
| 8 | Pourquoi un soufflet et un amortisseur ? | Faire varier entrée ou sortie | Le soufflet équilibre ; l’amortisseur stabilise |
| 9 | Qu’est-ce que la bande P ? | Déplacer un curseur de pression | La consigne n’est pas un interrupteur |
| 10 | Puis-je tourner la vis ? | Valider quatre contrôles | Identifier, mesurer, ajuster, vérifier |
| 11 | La référence suffit-elle ? | Lire le cas 034L0046 puis cocher six critères | Identifier n’est pas sélectionner |
| 12 | Comment installer ? | Parcourir trois phases | Sens, propreté, notice et mesure restent liés |
| 13 | Que signifie le symptôme ? | Explorer surcharge, restriction et instabilité | Mesurer avant de conclure |
| 14 | Ai-je compris ? | Répondre à sept situations | Le régulateur module ; le pressostat commute |

## Frontières pédagogiques

- `KVL` est un type de régulateur de pression de carter documenté par Danfoss ; le principe ne doit
  pas être transposé silencieusement à une autre famille.
- La référence `034L0046` est un KVL 28 à braser 1 1/8 po dans la fiche consultée.
- La coupe SVG explique la relation fonctionnelle ; elle ne reproduit pas la géométrie interne
  exacte ni la liste exhaustive des pièces.
- La bande P maximale de 1,5 bar est bornée au KVL 28–35 dans la fiche Danfoss consultée.
- Le graphique de l’écran 9 est une lecture pédagogique, pas une courbe de dimensionnement.
- Le sens de rotation, la valeur par tour, la procédure de brasage et les limites applicables sont
  vérifiés dans la notice à jour du code réellement posé.
- Aucun écran n’autorise une ouverture du circuit chargé ou sous pression.
- Le KVL ne remplace ni protection moteur, ni pressostat, ni sélection correcte du compresseur.
- Photos, dessins cotés, coupes et CAO Danfoss restent hors du parcours faute de droit de
  reproduction établi.


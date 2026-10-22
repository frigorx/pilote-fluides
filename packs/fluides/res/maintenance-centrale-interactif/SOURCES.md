# Sources — Maintenance systématique d’une centrale : relevés, contrôles, fiche

Consultation et vérification : 19 octobre 2026. Statut du cours : en cours de relecture (aucune validation de F. Henninot).

## Textes réglementaires (source primaire)

- **Règlement (UE) 2024/573**, article 7, paragraphes 1 et 2 (tenue des registres : quantité et type de gaz, quantités ajoutées, dates et résultats des contrôles d’étanchéité, entreprise qui intervient ; conservation au moins cinq ans) : seul le renvoi « on relit le registre de l’installation avant la visite » en est tiré (écran « Avant de commencer »). Lu le 19/10/2026 sur le texte du Journal officiel du 20/02/2024 (publications.europa.eu).

## Référentiels

- **TP Monteur dépanneur frigoriste (RNCP37876), CP8** : « Réaliser la maintenance systématique d’une installation de froid commercial complexe et centralisée » (libellé de `rattachement/entrees/referentiels-pilotes.json` ; la fiche de mission donnait la forme abrégée). Le TP MDF n’est pas dans `HAL-v3/donnees/referentiels/peda/` : à confirmer.
- **Bac Pro MFER 2028, tâche A3T1** « Réaliser une opération de maintenance préventive » (activité A3 « Maintenance d’une installation »), libellés de `HAL-v3/donnees/referentiels/peda/BAC_MFER_2028.json`.

## Fonds de F. Henninot (RAG, chercher-rag.js, 19/10/2026)

- `03_BAC-MFER/S2-Systemes/contrat-froid-commercial_SMPAC-ENTREPRISE.pdf` : **programme d’entretien** (les treize opérations de chaque visite, dont dix sont reprises dans l’exercice : propreté des évaporateurs, butées, arbres, silent-blocs, étanchéité et serrage des raccords, pressions, niveau d’huile, surchauffe et sous-refroidissement, organes de sécurité, charge en fluide, intensités absorbées et sécurités électriques, resserrage des connexions, nettoyage des échangeurs, du bac de condensation, fonctionnement général) ; clause « le prestataire doit signaler au client les travaux indispensables et lui proposer un devis » ; « avant toute réparation, établir un devis à faire valider par le client ». Le nom de la société n’est pas repris.
- `03_BAC-MFER/S2-Systemes/Froid_Commercial_et_Chambres_Froides.pdf` : « Condenseur encrassé : nettoyage régulier (feuilles en automne, pollen au printemps) » ; « tenir un carnet avec les relevés quotidiens » ; suivi des principales caractéristiques de l’installation.
- `03_BAC-MFER/Froid-Frigorifique/TP Centrale de supermarché.docx` : régime de fonctionnement −10 °C / +45 °C (valeurs d’exemple de l’exercice), pressostats de la centrale.
- **Le « Voyage dans tous ses états — les centrales frigorifiques »** (`jouerezo/donnees/voyage-centrale.js`) : le régulateur de centrale garde l’historique des alarmes ; pressostats de sécurité de chaque compresseur ; détecteur de fuite dans le local technique.
- Renvois vers l’existant, sans le refaire : L’étanchéité (relevés qui font soupçonner une fuite), Surchauffe et sous-refroidissement, Pression et température, le circuit d’huile, la consignation (Législation).
- `jouerezo/voyage/organes/*.webp` : images de synthèse des organes (voir SOURCES-IMAGES.md).

## Sources de la profession (secondaires — à relire par F. Henninot)

Aucune.

## Sans source primaire (dit comme tel dans le cours ou laissé à la notice)

- **La règle « à 1 K près, c’est pareil »** : précision de lecture annoncée comme convention de l’exercice, pas comme une règle ; à relire par Franck.
- **Niveau d’huile** (visible au voyant, entre les repères du constructeur) et « on cherche pourquoi avant d’ajouter de l’huile » : pratique courante (cours du circuit d’huile) ; pas de valeur.
- **Intensité relevée comparée à l’intensité maximale de la plaque** : principe courant ; les valeurs de l’exercice sont inventées.
- **Les trois états de la fiche** (OK, À surveiller, Défaut) : convention du cours ; une fiche réelle suit le modèle de l’entreprise.
- Aucune valeur de pression, de température ou de surchauffe « normale » n’est donnée : elles se comparent à la mise en service et à la visite d’avant.

## Symboles et images

Voir SOURCES-IMAGES.md.

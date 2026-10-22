# Sources — Qui fait quoi : analyse fonctionnelle d’une installation frigorifique

Consultation et vérification : 19 octobre 2026. Statut du cours : en cours de relecture (aucune validation de F. Henninot).

## Textes réglementaires (source primaire)

Aucun chiffre réglementaire n’est repris dans ce cours.

## Référentiels

- **Bac Pro MFER 2028, savoirs S3.1 et S6.1** : « l’analyse fonctionnelle et structurelle » (S3.1, sous S3 « Analyse et exploitation technique ») et « l’étude du fonctionnement de l’installation » (S6.1, sous S6 « Méthodes et procédures d’intervention »), libellés de `HAL-v3/donnees/referentiels/peda/BAC_MFER_2028.json`. Le référentiel ne donne pas de limites de connaissance pour ces deux savoirs (champ `limites` vide) : le cours ne les invente pas.

## Fonds de F. Henninot (RAG, chercher-rag.js, 19/10/2026)

- **Dossiers machine « Analyse fonctionnelle — Montages SF7, DFM2 »** (`_Archives/Themes/Archives-Techniques/DPWA1000007A…SF7.pdf`, `…DFM2.pdf`, machine CTA FLEX) : ils fournissent la **structure** d’un dossier d’analyse fonctionnelle — liste des capteurs et actionneurs avec leurs repères (B capteurs, S sécurités, M moteurs, E résistances…), « Traitement », « Régulation », « Gestions / Mesures / Contrôles », modes de fonctionnement. Seule cette structure est reprise ; la machine (centrale de traitement d’air) n’est pas celle du cours.
- **Le cours « Les régules » du réseau** (`packs/fluides/res/_regules-commun/catalog.js`, stations « Le pump-down automatique », « Commande directe », « Protection minimum ») : les repères B1 (thermostat), Y1 (électrovanne), KM1 (contacteur), HP et BP (pressostats), le thermostat qui commande Y1 et le pressostat BP qui commande KM1, la sécurité HP en série avec la commande de KM1, la séquence « Y1 ferme avant que KM1 s’arrête ». Le cours reprend ces repères tels quels pour que l’élève ne rencontre pas deux conventions.
- `jouerezo/voyage/organes/*.webp` : images de synthèse des organes, déjà en ligne sur le site (voir SOURCES-IMAGES.md).
- Renvois vers l’existant, sans le refaire : Le pump-down automatique, La commande directe, La protection minimum, Le circuit organe par organe, Voyage dans tous ses états — la régulation.

## Sources de la profession (secondaires — à relire par F. Henninot)

Aucune.

## Sans source primaire (dit comme tel dans le cours ou laissé à la notice)

- **Vocabulaire** (fonction principale, fonction, organe, analyse fonctionnelle et structurelle, capteur, actionneur) : vocabulaire courant des sciences industrielles, donné en une ligne là où il sert ; le fonds ne contient pas de cours d’analyse fonctionnelle rédigé (hors dossiers machine SF7 et DFM2). Les méthodes nommées (bête à cornes, FAST) ne sont pas enseignées. **À relire par Franck : est-ce bien ce qu’il entend par S3.1 et S6.1 ?**
- **Le contacteur rangé avec les actionneurs** : convention du cours, annoncée comme telle.
- Aucune valeur chiffrée (pression, température, seuil) n’est donnée.

## Symboles et images

Voir SOURCES-IMAGES.md.

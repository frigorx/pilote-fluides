# Sources — gare « Lire le bon d'intervention et le dossier technique » (ligne « Avant d'intervenir », gare 5.1)

Contenu restructuré, rien d'inventé. Un seul parcours : au bureau et sur place, avec les vrais documents de la machine (le bon, le dossier technique, la plaque).
Repérage au RAG (`chercher-rag.js`) : « bon d'intervention lire le dossier technique », « lire le dossier technique schéma notice plaque signalétique intervention », « fiche d'intervention registre ».

## Le geste (ordre, dangers)
- **Bon d'intervention** : document du logiciel inerWeb Fluide (`C:/git/inerweb-fluide/v8/js/documents/bon-intervention.js`, v9.2) : A4 imprimé avant l'intervention, complété et signé sur place ; rubriques : client, adresse, type d'intervention (dépannage, entretien, mise en service), technicien(s), date, heure d'arrivée, descriptif de la mission, commentaire / observations / valeurs de réglages, remarques du client. Les étapes 1, 2 et 9 suivent ces rubriques ; rien d'autre n'est ajouté au bon.
- **Fiches pratiques frigoristes 2012** (`profs cour Indexee/03_BAC-MFER/S1-Analyse/fiches_pratiques_frigoristes_2012.pdf`, « SR40 - PREV »), fiche pratique n° 1 « Préparation de l'intervention » : « vérifier la nature du fluide avant l'intervention », « prévenir le client de votre arrivée », « vérifier les plans de l'installation, les modifications éventuelles apportées récemment ». Fiche n° 3 (récit d'un accident électrique) : « attention aux repérages pas toujours à jour » (d'où la comparaison dossier / plaque, étape 5). Étapes 3, 5, 6, 10.
- **Plaque et dossier technique** : station Législation « Marquage & papiers » (`legislation/stations/desp-marquage-papiers/`, planche `bilan-marquage.svg`) : « Le réflexe : vérifier la plaque, et le dossier technique fourni par le fabricant ». La gare reprend ce réflexe pour toute machine (fluide, charge, numéro de série) et compare le dossier à la plaque (étape 5). La tolérance de 5 % sur la charge est celle du moteur de gares (pesée, décision de Franck du 08/10).
- **Registre et historique** : HabFluide ch. 14, thème 6 « Le registre : ce qui s'écrit, quand, et pourquoi » ; capsule « Détective » (`packs/fluides/res/capsules/donnees/x4.js`) : « ajouter du fluide masque le problème et ne localise rien » (étape 8 : on lit d'abord ce qui a été ajouté).
- **Schéma frigorifique** : Croix du frigoriste de Franck (détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas ; planche `croix-frigoriste.svg`). Sur un schéma de fabricant les places peuvent changer : la gare le dit (étape 6).
- Aucune valeur numérique n'est donnée par la gare : fluide, charge, tension et réglages viennent des documents de la machine.

## Codes
- CAP IFCA : `skills/referentiels-froid/references/cap-ifca.md` (T5 « Prendre connaissance et organiser les informations » ; C2.1 « Organiser des informations » ; S1.2 « Pièces et autorisations administratives », S2.1 « Outils, normes et représentation »). S1.2 et S2.1 sont ajoutés par l'agent de fabrication (la mission donnait T5 et C2.1).
- Bac Pro MFER : `HAL-v3/donnees/referentiels/peda/BAC_MFER_2028.json` (A1T1 « Prendre connaissance des dossiers relatifs aux opérations à réaliser », aussi dans `referentiel-mfer.md` ; C1 « Analyser les conditions de l'opération et son contexte », C2 « Analyser et exploiter les données techniques de l'intervention » ; S1.3 « les étapes d'une intervention », S3.3 « l'exploitation des documents graphiques et numériques »). C1, C2 et S3.3 sont ajoutés par l'agent (la mission donnait A1T1 ; S1.3 vient de `chantiers.json`).
- 2nde TNE : `2nde_TNE.json` (CC11 « Collecter les données nécessaires à l'intervention ou à la réalisation en utilisant les outils numériques », CC12 « Ordonner les données nécessaires en tenant compte des interactions avec les autres intervenants »).

## Dessin (rien dessiné à la main)
Cinq cartes ; cadres, titres, ombre et pastilles A B C du poste de `../etancheite-azote/dessin.svg` (`dessin.css` repris).
- Le bon : icône « liste de contrôle » de `qcm-travail-hauteur/assets/icons/clipboard.svg` (inerWeb Édu, création originale, voir `SOURCES-IMAGES.md` de ce dépôt).
- La plaque et le dossier : planche `bilan-marquage.svg` de la station Législation « Marquage & papiers » (copiée sans retouche).
- Le schéma frigorifique : planche `packs/fluides/res/svg/croix-frigoriste.svg` (copiée sans retouche).
- La machine : `groupe-condensation-complet.svg` de `../etancheite-azote/assets/symboles/` (collection QElectroTech, CC BY 3.0).
- Avant de partir : planche `packs/fluides/res/svg/prepa-chantier.svg` (« Avant de toucher quoi que ce soit » : reconnaître, identifier les risques, se protéger, préparer).
`.entete{flex-wrap:wrap}` ajouté dans `dessin.css` (l'en-tête de carte revient à la ligne à 390 px ; le moteur ne le fait pas).

## Reprise du 22/10/2026 (après la preuve P1)
- Les symboles de schéma sont remplacés par des dessins d'objets reconnaissables, faits main aux couleurs inerWeb (`assets/objets/`) : groupe de condensation. Les documents (bon, fiche) restent des icônes de document.
- Conformément à la règle « générique », aucun nom de diplôme dans l'attendu commun.
- La carte des schémas devient « Les schémas et la notice » (étape 7) ; « 2nde TNE » retiré de l'attendu commun (codes CC11 et CC12 non affichés).
- `dessin.css` : la phrase « sous azote ou sous fluide… » du moteur est masquée et, à 390 px, le bouton « Agrandir » passe au-dessus du schéma.

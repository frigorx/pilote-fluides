# Sources — gare « Réceptionner et contrôler une livraison » (ligne « Avant d'intervenir », gare 5.4)

Contenu restructuré, rien d'inventé. Un seul parcours : une vraie livraison (livreur, bon de livraison, commande, matériel). Fonds demandés par la mission : « Réceptionner une livraison.doc » et « Série 3 Activité 15 - Réception matériel et planification.pdf ».
Repérage au RAG (`chercher-rag.js`) : « Réceptionner une livraison », « réception livraison bon de livraison réserves transporteur contrôle colis », « vérifier la livraison matériel conforme à la commande plaque signalétique ».

## Le geste (ordre, dangers)
- **Fiche de Franck « Réceptionner une livraison »** (`profs cour Indexee/02_CAP-IFCA/C3-Realiser/Réceptionner une livraison.doc`, fiche de procédure ; le `.md` du fonds dit « format ancien non extrait » : texte relu à la main dans le `.doc`). Reprise presque mot pour mot :
  – « la réception de la livraison doit être faite avec méthode » pour « éviter de faire perdre du temps par la suite et éviter les contestations avec le fournisseur » (étape 1) ;
  – le bon de livraison porte six rubriques : le vendeur, le client, la référence de la commande, la désignation du matériel livré, la quantité livrée, éventuellement la partie de la commande qui reste à livrer (étape 2) ;
  – « vérifier que le matériel livré correspond bien au matériel indiqué sur le bon de livraison », puis « que les quantités livrées sont celles indiquées » (étapes 5 et 6) ;
  – « si besoin inscrire sur le bon de livraison les remarques éventuelles » ; ses deux exemples (manque de barres de cuivre ; coudes mâle-femelle livrés au lieu de femelle-femelle) sont repris dans l'étape 8 ;
  – « signer le bon de livraison. En général le livreur remet 1 exemplaire du bon et en garde 1 autre. Ce bon de livraison doit être remis à votre responsable » (étape 9) ;
  – « vérifier que la livraison correspond bien à la commande : cette partie est en principe effectuée par le patron » (étapes 3 et 10).
- **« Série 3 Activité 15 — Réception matériel et planification »** (`profs cour Indexee/02_CAP-IFCA/C2-Preparer/Série 3 Activité 15 - Réception matériel et planification.docx`, évaluation certificative : la méthode seulement, aucune donnée de ce sujet n'est reprise ni ses corrigés) : comparer le bon de livraison au bon de commande ; relever les éléments manquants et ceux qui n'ont pas été commandés ; décrire les différences « physiques (diamètre, à braser, à visser…) et techniques (tension d'alimentation, capacité de l'équipement, fluide frigorigène compatible…) » ; conclure « conforme ou à remplacer » (étapes 5 et 7) ; la livraison conditionne la planification de l'intervention (étape 10 : dire ce qui change au planning).
- **Fiches pratiques frigoristes 2012** (`profs cour Indexee/03_BAC-MFER/S1-Analyse/fiches_pratiques_frigoristes_2012.pdf`, fiche n° 1) : « manipuler avec précautions les emballages sous pression, ils ne doivent pas être soumis à des chocs », « une chute d'emballage peut provoquer une rupture du robinet », « sangler les bouteilles lors des transports et du stockage », « stocker dans une zone aérée, ne pas stocker près d'une source chaude ou en plein soleil » (étapes 1, 4 et 10).
- **Plaque du matériel** : réflexe « lire la plaque et la notice » (stations Législation « Marquage & papiers » et « Catégories », planche `plaque-signaletique.svg` reprise) ; la tension est comparée avec la tolérance 10 % + 2 V du moteur de gares (celle de la gare « Remplacer un composant électrique »), le fluide par égalité.
- **Pas de valeur réglementaire** : la gare ne cite ni délai de réserves auprès du transporteur, ni article du Code de commerce (rien trouvé dans le fonds) ; elle dit seulement ce que dit la fiche de Franck : écrire les remarques sur le bon avant de signer. Voir le compte rendu.

## Codes
- CAP IFCA : `skills/referentiels-froid/references/cap-ifca.md` (T6 « Préparer, vérifier les matériels et outillages », T4 « Communiquer avec les différents intervenants » ; C2.2 « Contrôler les éléments nécessaires à la réalisation », C1.1 « Compléter, transmettre » ; S1.2 « Pièces et autorisations administratives », S3.1 « Communication technique »). La mission donnait C2.2 ; T6, T4, C1.1, S1.2, S3.1 sont ajoutés par l'agent de fabrication.
- Bac Pro MFER : `BAC_MFER_2028.json` (A2T1 « Réceptionner et vérifier les matériels », aussi dans `referentiel-mfer.md` ; C5 « Réceptionner les approvisionnements », C4 « Organiser et sécuriser son intervention » ; S1.4 « les procédures administratives », S4.1.4 « Les composants des circuits frigorifiques »). La mission donnait A2T1 et C5 ; C4, S1.4, S4.1.4 sont ajoutés par l'agent.

## Dessin (rien dessiné à la main)
Cinq cartes ; cadres, titres et ombre du poste de `../etancheite-azote/dessin.svg` (`dessin.css` repris, `.entete{flex-wrap:wrap}` ajouté).
- Le bon et la commande, les écarts : icône « liste de contrôle » de `qcm-travail-hauteur/assets/icons/clipboard.svg` (inerWeb Édu).
- Les colis : illustration `q25-materiel-casse.svg` de `qcm-travail-hauteur` (inerWeb Édu, création originale : un matériel cassé, la zone abîmée entourée).
- Le matériel livré : `groupe-condensation-complet.svg`, `evaporateur-cubique.svg` et `detendeur-thermostatique.svg` de `../etancheite-azote/assets/symboles/` (collection QElectroTech, CC BY 3.0).
- La plaque : planche `plaque-signaletique.svg` de la station Législation « Marquage & papiers » (copiée sans retouche).

## Reprise du 22/10/2026 (après la preuve P1)
- Les symboles de schéma sont remplacés par des dessins d'objets reconnaissables, faits main aux couleurs inerWeb (`assets/objets/`) : colis et bouteille sanglée, groupe ; planche « ligne liquide horizontale » pour le filtre et le voyant. Les documents (bon, fiche) restent des icônes de document.
- Conformément à la règle « générique », aucun nom de diplôme dans l'attendu commun.
- Ajouts de sécurité : charge lourde jamais seul, à deux, avec un diable (sans valeur chiffrée : aucune source dans le fonds) ; bouteille qui siffle ou qui sent : je m'éloigne, j'appelle le professeur. La carte des colis devient « Les colis et le stockage ».
- `dessin.css` : la phrase « sous azote ou sous fluide… » du moteur est masquée et, à 390 px, le bouton « Agrandir » passe au-dessus du schéma.

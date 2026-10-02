# Législation — préparation à la publication du 1er octobre 2026

## État livré

Version locale corrigée dans `C:\git\pilote-fluides-chantier`, branche `chantier-2026-09-30`, servie sur le port 8795. Les changements ne sont ni poussés ni publiés. Cette version reste un brouillon avant validation de Franck. Aucun import RAG n'a été effectué ; aucun changement de chunks n'est revendiqué.

Avis pédagogique : oui pour un support de cours et de missions de TP TECVC, niveau 5, avec accompagnement du formateur. Le carnet ne constitue ni une préparation exhaustive au titre ni une preuve de maîtrise professionnelle fondée sur les seuls quiz.

## Corrections livrées

- Distinction entre réussite au quiz et validation par le professeur de la production professionnelle ; niveaux 0 à 4 conservés, critères d'autonomie et de justification explicités.
- Deux pages de méthode et de mission finale ajoutées aux carnets ; guide autonome dans `carnet/guide-pedagogique.html`. Consignes, livrable, durée indicative, oral individuel et critères précisés.
- Guidage décroissant : renvois aux écrans en P1–P2 ; recherche des sources en P3–P5. Les repères restent disponibles dans les corrigés.
- Provenance des situations clarifiée : commandes fictives fournies ; annexes réelles à joindre si nécessaires. Un sujet de BTS adapté ou un chantier d'alternant peut servir de variante. Le cas PAC/bruit dispose désormais de données d'exercice identifiées comme fictives.
- Corrections ciblées dans huit stations : histoire de la RT, RE2020, F-Gaz 3, habilitation électrique, terre/différentiel, PAC et voisinage, directive DESP, catégories DESP. Six indicateurs RE2020, périmètres et exceptions explicités ; pas de conformité automatique liée au choix d'une PAC.
- Sept PDF explicitement autorisés par `.gitignore`, afin qu'ils puissent être inclus dans une livraison Git. Three.js fourni localement avec sa licence MIT pour la maquette 3D.

Les sources génératrices sont `pedagogie.json`, `progression.json`, les `mission.json`, les pages des stations et `outils/carnet-papier.mjs`. Les PDF, HTML et DOCX du carnet sont régénérés à partir de ces sources.

## Contrôles et preuves

| Contrôle | Résultat |
| --- | --- |
| Ressources locales | 61 pages analysées, 651 références locales, aucune ressource manquante |
| Missions | 57 fichiers présents avec quatre questions chacun |
| Réponses HTTP locales | 57 cours et 7 PDF accessibles, 64 réponses sans erreur |
| QR décodés dans les PDF | 57 dans le carnet complet ; 57 autres dans les cinq extraits, aucune destination incorrecte |
| Pagination PDF | Élève : 124 pages ; P1 à P5 : 30, 24, 28, 26, 36 ; professeur : 60 |
| Corps PDF | Minimum élève 14 pt ; professeur 13 pt |
| Débordements du carnet | Aucun détecté par le générateur ; quelques zones d'écriture de 16 mm, feuille jointe prévue pour les productions longues |
| Syntaxe JavaScript | 57 scripts de station et moteurs modifiés contrôlés ; aucun échec de syntaxe |
| Navigateur | Démarrage du cours, rendu 3D et parcours des quatre questions RE2020 contrôlés ; résultat 4/4 avec distinction explicite quiz/mission |
| Word | Extrait P3 et livret professeur rendus via LibreOffice ; pages de méthode inspectées ; pagination différente du PDF Chrome attendue |

Les rapports de contrôle sont dans `.planning/2026-10-01-legislation/`. La dernière régénération après ajustement de la consigne professeur ne modifie ni les QR ni les missions.

## Réserves conservées

Le contrôle automatique de remplissage du livret professeur reste en échec : cinq pages (2, 3, 21, 52, 54) sont sous son seuil de 80 %. L'inspection visuelle montre des pages lisibles, avec des espaces de fin de section, sans contenu coupé. Le seuil n'a pas été abaissé pour masquer ce résultat.

La disponibilité des 57 cours n'est pas une validation réglementaire exhaustive des 57 contenus. Les mentions de prototype et les points « À sourcer » restent conservés. Les corrections métier ont porté sur les huit stations citées ; il n'y a pas eu d'expérimentation en classe ni d'essai sur une flotte de tablettes.

Les narrations textuelles ont été corrigées ; les MP3 n'ont pas été régénérés. Le moteur vocal utilise le texte pour retrouver un audio et prévoit un repli vers la synthèse du navigateur lorsque le texte change. La qualité sonore et la disponibilité des voix selon le poste ne sont pas validées ici.

Les QR visent le site public. Celui-ci ne recevra ces corrections qu'après déploiement. Après validation, reporter uniquement les changements du chantier Législation sur la branche de publication à jour, inclure les PDF et la bibliothèque 3D, puis contrôler les liens publics. Ne pas fusionner aveuglément la totalité de la branche de chantier divergente. L'indexation RAG suit le bon à tirer explicite, conformément aux règles de Franck.

## Sources officielles consultées pour les corrections ciblées

- [DREAL — présentation de la RE2020](https://www.pays-de-la-loire.developpement-durable.gouv.fr/presentation-de-la-re2020-a6525.html), mise à jour du 28 juillet 2026.
- [Guide RE2020, mai 2025](https://www.pays-de-la-loire.developpement-durable.gouv.fr/IMG/pdf/guide_re_2020_16mai2025.pdf).
- [Ministère — évolution du règlement F-Gaz 2024/573](https://www.ecologie.gouv.fr/sites/default/files/documents/Note_pedagogique_Evolution_FGAZ_2024_573.pdf).
- [INRS — habilitation électrique, questions fréquentes](https://www.inrs.fr/risques/electriques/habilitation-electrique-foire-aux-questions.html).
- [Légifrance — article R. 557-9-3, équipements sous pression](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033852630).


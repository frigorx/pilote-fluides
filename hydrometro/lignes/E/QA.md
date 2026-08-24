# QA — Ligne E

## Recette technique du 23 août 2026

- sept jalons dans l’ordre contractualisé ;
- `debit` référencé par `../../stations/debit/index.html`, sans copie ;
- six stations E ouvertes par leurs chemins relatifs ;
- 12 activités : 3 lectures, 3 classements/applications, 2 mesures/calculs, 2 relations de cause
  à effet et 2 décisions/mini-diagnostics ;
- seuil `ACQUIS` à 9/12 avec échangeur, circulateur et sécurité mobilisés ;
- réponses verrouillées, corrections argumentées et liens de remédiation.

## Résultats

- `node lignes/E/qa.mjs` : 199 contrôles structurels réussis, 0 échec ;
- 60 états de station vérifiés aux quatre formats, soit 240 contrôles d’affichage ;
- six bilans de station obtenus à `4 / 4` ;
- ligne et test final vérifiés aux quatre formats sans débordement de `document` ni de `body` ;
- scénarios finaux vérifiés : `ACQUIS 12/12`, `FRAGILE 10/12` sans acquis essentiel en échangeur,
  et `À RENFORCER 0/12` ;
- absence d’erreur de console observée pendant les parcours ;
- absence de stockage, donnée nominative, son, autoplay ou dépendance distante contrôlée ;
- SVG titrés, décrits et accompagnés d’un texte équivalent.

## Intégration centrale

- registre `modules.js` synchronisé avec les manifestes E ;
- parcours E accessible depuis le filtre de la carte ;
- Production ouverte depuis la liste mobile puis retour au plan vérifié ;
- QA racine après raccordement : 163 contrôles réussis, 0 échec.

Les commandes sont des éléments HTML natifs avec focus visible. Les clics ont été simulés aux
formats téléphone ; une passe humaine au clavier réel et sur appareil tactile reste à réaliser.
La QA technique ne remplace pas la validation métier, pédagogique, FLE/DYS ou réglementaire.

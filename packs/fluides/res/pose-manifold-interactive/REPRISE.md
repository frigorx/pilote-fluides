# Reprise — atelier manifold 4 voies

État : brouillon métier du 12 août 2026. Non intégré au portail, non indexé dans le RAG, non publié.

## Correction ergonomique du 12 août 2026

- Le carré de manœuvre interceptait le clic destiné au bouchon car leurs zones se superposaient.
- Tant que le bouchon est présent, le carré est désormais masqué, non cliquable et retiré du parcours clavier.
- Le bouchon porte le mot `BOUCHON`, possède une zone tactile agrandie et un contour orange pendant l’étape attendue.

## Décisions prises

- Nouveau module séparé du TP complet de récupération.
- Contrôle direct sur les objets dessinés ; les panneaux textuels ne servent pas de commandes de remplacement.
- Guidance en quatre temps : `Regardez`, `Faites`, `Vérifiez`, `Pourquoi`.
- Mode autonome avec aide explicite, sans recherche au hasard.
- Manifold quatre voies avec robinets BP, VIDE, SERVICE et HP.
- Mini-vannes placées côté appareils.
- Les aiguilles montrent quatre états : zéro, vide, pression lue, pression piégée puis retour à zéro.
- Le dessin canonique des trois positions de la vanne de service est réutilisé sans le redessiner.
- Le siège avant est expliqué dans le zoom, mais n’est pas inséré artificiellement dans l’ordre de pose/dépose.
- Le traitement du fluide résiduel est volontairement générique : la méthode exacte dépend du plateau et doit être validée par F. Henninot.

## Points à valider humainement

1. Le vocabulaire retenu pour les bouchons, la prise P et le presse-étoupe.
2. Le niveau de détail des 60 gestes et leur ordre exact sur le matériel de l’atelier.
3. La formulation et le geste réel de traitement du fluide résiduel avant déconnexion.
4. Le choix de conserver la pompe raccordée jusqu’à la phase de rangement.
5. La représentation extérieure simplifiée des vannes de service face au matériel réel du plateau.

## Avant bon à tirer

- Rejouer le parcours guidé et autonome avec le vrai manifold et les vraies vannes devant soi.
- Vérifier chaque étape en 1024 × 768, 1280 × 720, 390 × 844 et 360 × 640.
- Ne pas intégrer à `cartes.js`, ne pas lancer le build global, ne pas pousser et ne pas indexer dans le RAG sans aval explicite.

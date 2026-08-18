# Contrôle qualité — V7

Ce fichier reçoit le bilan des contrôles après génération. Le statut de la version reste **brouillon** tant que le contenu métier, la voix et le scénario n’ont pas reçu de bon à tirer humain.

## Contrôles prévus

- cohérence des dix modules et des réponses ;
- autonomie hors ligne et absence de ressource distante ;
- compilation des scripts intégrés ;
- conformité des marqueurs de charte, d’accessibilité, d’impression et de voix ;
- ouverture réelle du hub, du parcours habilitation et d’un module isolé ;
- vérification sans débordement horizontal aux formats de projection et de téléphone ;
- test d’une réponse de quiz et contrôle de l’absence d’autoplay vocal.

## Résultat

Contrôles exécutés le 18 août 2026 :

- build : **14 pages HTML autonomes** et un manifeste générés ;
- QA statique : **127 contrôles réussis** ;
- compilation : tous les scripts intégrés sont syntaxiquement valides ;
- droits : aucune ressource distante, aucune image base64 opaque et aucun visuel constructeur repris ;
- navigateur direct à 1280×720 : page entièrement contenue, aucun défilement du parcours, aucune erreur de console ;
- formats simulés dans le navigateur : 1366×768, 1024×768, 390×844 et 360×640, sans débordement horizontal ni élément de structure hors écran ;
- module autonome `06-isobare.html` : un seul module embarqué, quatre étapes et schéma correctement ciblé ;
- quiz : réponse, correction explicite, question suivante et bilan fonctionnels ;
- révision complète sur 360×640 : 16 questions parcourues, bilan final entièrement contenu et navigation visible ;
- voix : aucun autoplay, commande écouter/pause active, arrêt disponible, retour à l’état initial après arrêt ;
- responsive : le défaut de dépassement initial du retour de quiz à 360×640 a été corrigé puis recontrôlé.

Le contrôle automatisé atteste le fonctionnement et les dimensions, mais ne vaut pas validation métier ou bon à tirer. Restent à faire avec Franck : écouter la voix sur l’ordinateur de diffusion, relire les formulations métier et décider si une narration Piper enregistrée doit être produite après validation des textes.

La V6 d’origine est restée à son emplacement initial. Empreinte relevée après travaux : `CAE801939852D657237E5285D4C7A7BCE78A0A827C48C22258307689C642450C` (SHA-256).

# QA — Ligne D

## Résultat technique du 23 août 2026

- `node lignes/D/qa.mjs` : **201/201** contrôles structurels réussis, dont l’absence de module ES, de `fetch` et de requête réseau bloquant l’ouverture locale.
- `node tests/qa.mjs` après intégration : **182/182** contrôles du noyau réussis.
- Vérification syntaxique : `parcours-adaptatif.js`, `app.js`, le parcours D et les dix scripts de station sans erreur.
- 7 pages ouvertes aux formats `1366×768`, `1024×768`, `390×844` et `360×640` : 28 états initiaux sans débordement.
- 5 stations entièrement rejouées aux quatre formats : 200 états interactifs, aucun échec, bilan 4/4 pour chaque station.
- Test final de 12 activités entièrement rejoué aux quatre formats : 52 états, résultat `ACQUIS` à 12/12, sans débordement.
- Seuils négatifs contrôlés à `1024×768` : `FRAGILE` à 11/12 si la famille essentielle Pertes manque ; `À RENFORCER` à 0/12.
- Le lien `Pertes ↔ E` ouvre bien `../../stations/pertes/index.html`, sans copie ni modification de la station E.
- Les cinq retours « Plan » pointent vers leur jalon propre.
- Aucune erreur de console observée au balayage final.
- Fonctionnement local hors ligne : aucune dépendance distante, aucun stockage navigateur, aucun autoplay.
- Intégration centrale rejouée aux quatre formats : filtre D, 6 modules jouables, parcours complet, ouverture de station et retour visité, soit 16 états sans débordement.
- Les cinq stations propriétaires D ont été ouvertes depuis le plan principal à `1024×768`, dont Bitube au clavier avec `Entrée`.

Le moteur de contrôle intégré interdit les URL `file://` : le double-clic direct n’a donc pas été rejoué automatiquement. Les dépendances sont toutes relatives et locales ; l’exécution a été testée sans réseau via un serveur local.

L’intégration au noyau HydroMétro a ensuite été autorisée par Franck et contrôlée séparément. La QA technique ne constitue ni un bon à tirer métier/pédagogique, ni une validation certificative, ni une autorisation d’indexation ou de publication.

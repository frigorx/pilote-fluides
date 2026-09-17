# Progress — refonte « fond et forme » d'inerweb.fr

## Session 1 — 17/09/2026
- Matin : mémoire, REPRISE, audit du 12/09, plans « tout améliorer » et « réseaux », catalogue lus.
  Dépôt `main` = `origin/main` ; 3 fichiers non commités (reste du lot G + note de progress). Rien touché.
- F. Henninot : le site est toujours sur GitHub Pages (Cloudflare devant, OVH = domaine + courriel).
- Serveur local 8791 (launch.json temporaire dans CLAUDE-ESPACE-TRAVAIL) ; session déplacée dans le dépôt.
- `outils/sonder-rendu.mjs` écrit, corrigé (canal Chrome : le navigateur Playwright 1234 manque) ;
  **81 mesures et captures** sur 27 pages → `mesures/`. Accueil : 7 437 px de haut à 1280, 10 991 à 375.
- Brique « station suivante » vérifiée sur serveur local : diagramme enthalpique OK (« ← Organe par
  organe · ↑ Le tronc · Bilan & performance → ») ; détendeur et KP1 muets (écran fixe = silence voulu).
  ⚠️ `progress.md` du 13/09 attendait une barre sur le détendeur : la règle « overflow hidden → silence »
  l'interdit. À trancher : assouplir la règle ou accepter le silence. **Non commité (mission 1 = lecture seule).**
- F. Henninot, réflexion : l'accueil n'est pas compréhensible, trop de pas avant d'entrer dans un
  réseau, il faut une image de chaque réseau pour voir l'ampleur. Analyse rendue en chat (ci-dessous § Décisions).
- Cadrage reçu (rédigé avec GPT) : `MISSION-2026-09-17.md`. **Mission 1 seulement** : audit sans
  modification, 5 livrables. Missions 2-4 = cadre, non autorisées.
- Workflow `wf_c16f751e-9ba` lancé (19:15) : INV, TEC, UX, CLA, MET-A, MET-B (Sonnet) → critiques
  MET-A, MET-B (réfutation) + contrôleur sur échantillon des quatre sondes de forme. Rapports attendus
  dans `sondes/`, inventaire CSV à la racine du dossier.

## Décisions et lectures du jour
- Le grand plan du thermo-techno n'a pas sa place sur l'accueil : il écrase les autres réseaux et retarde
  l'entrée. Sa place est une page de réseau (phase 3 du chantier réseaux). L'accueil = phrase explicite +
  dix vignettes de réseau (portes) + raccourcis de ligne. Maquette HTML avant code.
- L'audit de GPT est un avis ; les décisions restent ici, attribuées.

## Preuves
| Preuve | Résultat |
|---|---|
| `git status -sb` | `main...origin/main`, 3 fichiers modifiés (lot G + progress) |
| `controle-syntaxe` | 521 pages, 1 erreur antérieure |
| `curl https://inerweb.fr/?sonde=…` | 200, 160 703 o, titre « inerWeb Édu — apprendre le froid, station par station » |
| sonde-suivant (Playwright, Chrome) | diagramme : bloc présent ; détendeur hidden/hidden : silence ; KP1 visible/hidden : silence |
| `sonder-rendu.mjs` | 81 mesures, 0 erreur de chargement, `mesures/mesures.json` |

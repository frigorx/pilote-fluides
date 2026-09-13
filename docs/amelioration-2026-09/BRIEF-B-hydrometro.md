# BRIEF B — HydroMétro (`C:\git\hydrometro`) : la barre du haut sur téléphone, le réglage de débit commun, une livraison sûre

Chantier « tout améliorer » (feu vert de F. Henninot, 12/09/2026), lot B. État des lieux :
`C:\git\pilote-fluides\docs\audit-site-2026-09\AUDIT-ETAT-DES-LIEUX.md` (§ 3.1, § 4.3) et
`C:\git\pilote-fluides\docs\amelioration-2026-09\findings.md`. Lire d'abord `C:\git\hydrometro\PROMPT-REPRISE.md`.

## Règles du lot (non négociables)
- Travailler **uniquement dans `C:\git\hydrometro`** (l'atelier, la vérité). `C:\git\pilote-fluides\hydrometro\`
  est la copie servie : on la LIT pour comparer, on ne l'édite jamais. Fable fait la livraison.
- Français partout. Modifications **chirurgicales**.
- **Ne jamais modifier un texte parlé** (`narration:` des `content.js`, retours, consignes) : la clé des MP3
  est une empreinte du texte. Tout changement orpheline le MP3.
- Ne pas commiter, ne pas pousser, ne pas lancer de livraison réelle.
- Tout `diff` atelier ↔ copie servie avec `--strip-trailing-cr`.

## Étape 0 — Rendre la livraison sûre : `outils/livrer.mjs`
**Le fait** : les 23 `index.html` servis (accueil + 22 stations) portent, avant `</head>`, le branchement du
moteur commun posé le 01/09 directement dans la copie servie — l'atelier ne l'a pas. Tout le reste est
identique. Une recopie naïve effacerait la voix du site. Servi, station :
```
<script src="../../../moteur/voix-index.js?v=20260901-1"></script>
<script src="../../../moteur/prononciation.js?v=20260901-1"></script>
<script src="../../../moteur/voix.js?v=20260901-1"></script>
<script src="../../../moteur/reglage-voix.js?v=20260901-1"></script>
```
Accueil : préfixe `../`, et le servi porte `app.js?v=20260901-voix` là où l'atelier a `app.js?v=20260823h`.

**À faire** : écrire `outils/livrer.mjs` sur le modèle de `C:\git\electrorezo\outils\livrer.mjs` (le lire
d'abord). Il copie **seulement le servable** (PROMPT-REPRISE : index, 5 js, 2 css, `assets/`, `lignes/`,
`stations/` — ni docs de racine, ni `tests/`, ni `rag/`, ni `node_modules`, ni `package*.json`, ni
`Ouvrir-le-reseau.cmd`, ni `QA.md`/`SOURCES.md`/`_ETAT.md` des stations) vers `C:\git\pilote-fluides\hydrometro\`,
injecte les quatre lignes avant `</head>` (ancre `</head>`) dans l'accueil et chaque `stations/*/index.html`
avec `?v=<AAAAMMJJ>-1` du jour, et pose le même `?v=` sur `app.js` de l'accueil. Modes `--simuler`
(défaut, n'écrit rien) et `--ecrire`. Les `index.html` de l'atelier restent SANS ces lignes.
Lancer `node outils/livrer.mjs --simuler` et rapporter.

## Étape 1 — La barre du haut ne se chevauche plus sur téléphone
À 375 px, sur l'accueil (`index.html` l. 17-36, `styles.css`) : le logo, « ⇄ Le réseau thermo-techno »,
« ⇄ Législation », le titre « HydroMétro · RÉSEAU HYDRAULIQUE AUTONOME », le « ? » et le réglage
« − 0,95× + » s'écrivent les uns sur les autres. Sous ~ 700 px : deux rangées (marque + titre, puis
outils), les liens de correspondance passent à la ligne ou sous le titre ; rien ne se chevauche, rien
ne déborde. Vérifier la même barre sur une station (`stations/bitube/index.html`, gabarit commun) : à
375 px les boutons CAP · Bac pro · BTS · Plan · Écouter · Arrêter · − 0,95× + tiennent-ils ? Sinon,
même traitement. Aucun texte ne change.

## Étape 2 — Le réglage de débit : le même que le site
Trouver le contrôle « − 0,95× + » (accueil et stations : `app.js`, `stations/_commun/shell.js`,
`station.js`, `p-formation.js` — dire lequel). Quand `window.PILOTE_VOIX_REGLAGE` existe (site : injecté à
la livraison), monter son bouton à la place (`PILOTE_VOIX_REGLAGE.monter(conteneur)`) et lire la vitesse
avec `PILOTE_VOIX_REGLAGE.vitesse()` au moment de parler ; masquer le contrôle local. Quand il est absent
(atelier), garder le contrôle local mais l'aligner : plage 0,6 à 1,4, pas 0,05, défaut 0,95, arrêt de
la lecture en cours au changement, et la même clé de session `pilote-voix-vitesse` (voir
`C:\git\pilote-fluides\moteur\reglage-voix.js`, constante `CLE`).

## À confirmer seulement, sans corriger
Cinq stations de la ligne Principes (`debit`, `delta-t`, `energie`, `mesurer`, `puissance`) tournent sur
`p-formation.js`, sans narration ni bouton « Écouter » (127 mots à l'écran sur Débit). C'est un manque de
contenu, hors de ce lot : confirmer le constat en une ligne dans le rapport.

## Contrôles à passer (et à rapporter tels quels)
`npm run qa` (Playwright ; deux échecs préexistants connus : « aucune dépendance HTTP(S) » et « statut bêta
locale visible » — les signaler comme antérieurs, ne pas en ajouter), puis `node outils/livrer.mjs --simuler`.

## Rapport attendu (15 lignes au plus)
Par étape : fichiers et lignes modifiés, fait / non fait et pourquoi. Sortie des contrôles. Ce que Fable
doit observer après livraison (accueil à 375 px, station Bitube à 375 px, bouton de débit).

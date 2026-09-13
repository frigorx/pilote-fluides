# BRIEF C — ÉlectroRézo (`C:\git\electrorezo`) : une voix par station sans sélecteur, les onglets à 800 px, une livraison qui garde tout

Chantier « tout améliorer » (feu vert de F. Henninot, 12/09/2026), lot C. État des lieux :
`C:\git\pilote-fluides\docs\audit-site-2026-09\AUDIT-ETAT-DES-LIEUX.md` (§ 3.1, § 4.3). Lire d'abord
`C:\git\electrorezo\PROMPT-REPRISE.md` et `DEMARRAGE-NOUVEAU-CHAT.md`.

## Règles du lot (non négociables)
- Travailler **uniquement dans `C:\git\electrorezo`**. `C:\git\pilote-fluides\electrorezo\` est la copie
  servie : on la LIT pour comparer (`diff --strip-trailing-cr`), on ne l'édite jamais. Fable livre.
- Français partout. Modifications **chirurgicales**.
- **Ne jamais modifier un texte parlé** (`narration.js`) : les 472 MP3 de `voix/homme/` et `voix/femme/`
  sont nommés par phase, mais leur contenu est le texte actuel ; un texte changé et un MP3 inchangé, c'est
  une voix qui ment. Aucun texte ne change dans ce lot.
- Ne pas commiter, ne pas pousser, ne pas lancer `outils/livrer.mjs` pour de vrai.

## Étape 0 — La livraison reproduit-elle la copie servie ?
Les 60 `index.html` servis portent une ligne que l'atelier n'a pas : `<script src="../../../moteur/prononciation.js"></script>`
(l. ~65). Vérifier si `outils/livrer.mjs` l'injecte (alors c'est un fait de livraison, rien à faire) ou si
elle a été posée à la main dans la copie servie (alors l'ajouter à `livrer.mjs`, ancre `</head>` ou
l'ancre qu'il utilise déjà, pour qu'une relivraison ne la perde pas). Vérifier de même l'accueil servi
(`index.html` : « Les autres réseaux inerWeb » à la place de « Pages de travail » — c'est
`construire-accueil.mjs --servi`, à confirmer). Rapporter.

## Étape 1 — Une voix par station, sans sélecteur
`stations/_commun/station.js` (l. ~37-60 : `voixFrancaises`, `#voixPick`, `S.genre`, `jouerLeMp3` avec
`voix/<genre>/<phase>.mp3`) et la balise `<select id="voixPick">` des 60 `index.html` (trouver l'outil qui
les génère — `construire-reseau.mjs` ou un gabarit — et corriger à la source ; sinon retirer l'élément
exact dans les 60 fichiers par une ancre non ambiguë, jamais un motif texte flottant).
- Plus de choix Henri/Denise à l'écran. Le genre de la voix se fixe par **hachage stable de
  l'identifiant de la station** : la même règle que le fonds commun du site — lire
  `C:\git\pilote-fluides\build\voix\generer-audios-edge-tts.py`, option `--alternance-module`, et
  reproduire exactement son hachage (parité 50/50, une station refabriquée garde sa voix).
- La lecture MP3 ne change pas. Le repli navigateur (MP3 absent) ne garde que des voix **françaises** ;
  s'il n'y en a aucune, le bouton affiche « Voix indisponible » et ne parle pas (jamais `voices[0]`).
- Le curseur de vitesse reste (il a déjà la plage 0,6-1,4, le pas 0,05 et le défaut 0,95 du site) ; s'il
  ne le fait pas déjà, il **arrête la lecture en cours** quand on le change, et mémorise la valeur sous
  la clé de session `pilote-voix-vitesse` (voir `C:\git\pilote-fluides\moteur\reglage-voix.js`,
  constante `CLE`) pour que le réglage soit le même que sur le reste du site.

## Étape 2 — Les cinq temps à 800 px
`stations/_commun/station.css` l. 48-53 : la barre `.temps` est en `overflow-x:auto` ; à 800 px de large
le cinquième onglet est coupé sans aucun indice qu'on peut faire défiler. Sous ~ 900 px, passer les
onglets sur deux rangées (`flex-wrap`) ou donner un indice de défilement visible ; rien de coupé, rien
de chevauché. Vérifier à 375 px aussi.

## Contrôles à passer (et à rapporter tels quels)
`node outils/controler-stations.mjs` (le contrat des 59 stations), `node outils/tracer-carte.mjs`
(inchangé attendu), `node outils/controler-parcours.mjs`. `construire-planche.mjs` (191 états) ne se
relance que si une scène a changé — ici non : le dire. Un contrôle qui échouait déjà avant se signale
comme antérieur.

## Rapport attendu (15 lignes au plus)
Par étape : fichiers et lignes modifiés, fait / non fait et pourquoi. La règle de hachage retenue (et
la répartition homme/femme qu'elle donne sur les 59 stations). Sortie des contrôles. Ce que Fable doit
observer après livraison (station 1.1 : bouton « Écouter » sans sélecteur, MP3 joué ; barre des temps à
800 px et à 375 px).

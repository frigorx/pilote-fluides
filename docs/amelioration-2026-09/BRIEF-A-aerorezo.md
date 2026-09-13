# BRIEF A — AéroRézo (`C:\git\aerorezo`) : la voix qui change d'écran, la commande vocale, la carte sur téléphone

Chantier « tout améliorer » (feu vert de F. Henninot, 12/09/2026), lot A. État des lieux :
`C:\git\pilote-fluides\docs\audit-site-2026-09\AUDIT-ETAT-DES-LIEUX.md` (§ 3.1, § 4.3) et
`C:\git\pilote-fluides\docs\amelioration-2026-09\findings.md` (« les copies servies sont en avance »).
Lire d'abord `C:\git\aerorezo\PROMPT-REPRISE.md` en entier (il porte les six commandes de vérification).

## Règles du lot (non négociables)
- Travailler **uniquement dans `C:\git\aerorezo`** (l'atelier, la vérité). `C:\git\pilote-fluides\aerorezo\`
  est la copie servie : on la LIT pour comparer, on ne l'édite jamais. Fable fait la livraison.
- Français partout. Modifications **chirurgicales** : chaque ligne changée se rattache à une étape ci-dessous.
- **Ne jamais modifier un texte parlé** (`narration` des `manifest.js`, retours, consignes) : la clé des
  MP3 est une empreinte du texte (`moteur/voix.js` : FNV-1a du texte normalisé + longueur) ; tout
  changement orpheline le MP3.
- Ne pas commiter, ne pas pousser, ne pas lancer de livraison réelle.
- Tout `diff` entre atelier et copie servie se fait avec `--strip-trailing-cr` (fins de ligne différentes).

## Étape 0 — Rendre la livraison sûre : `outils/livrer.mjs`
**Le fait** : les 37 `index.html` servis (accueil + 36 stations) portent, avant `</head>`, le branchement
du moteur commun posé les 01-02/09 directement dans la copie servie — l'atelier ne l'a pas (0 occurrence).
Tout le reste est identique (app.js, scenes.js, styles.css, `_commun/moteur.js`, les manifests : 0 ligne
de différence). Une recopie naïve effacerait la voix du site. Exemple servi (station) :
```
<script src="../../../moteur/voix-index.js?v=20260902-1"></script>
<script src="../../../moteur/prononciation.js?v=20260902-1"></script>
<script src="../../../moteur/voix.js?v=20260902-1"></script>
<script src="../../../moteur/reglage-voix.js?v=20260902-1"></script>
```
(la copie servie charge en plus `prononciation.js` une seconde fois, sans `?v=` : c'est une erreur du
02/09, la livraison n'en pose qu'une). Pour l'accueil, le préfixe est `../`.

**À faire** : écrire `outils/livrer.mjs` sur le modèle de `C:\git\electrorezo\outils\livrer.mjs` (le lire
d'abord). Il copie **seulement le servable** (liste du PROMPT-REPRISE : ni `tests/`, ni `outils/`, ni
`design/`, ni aucun `.md`, fiches `_ETAT.md` comprises) vers `C:\git\pilote-fluides\aerorezo\`, et
injecte les quatre lignes ci-dessus avant `</head>` (ancre `</head>`, jamais un motif texte) dans l'accueil
et chaque `stations/*/index.html`, avec `?v=<AAAAMMJJ>-1` du jour de livraison. Deux modes :
`--simuler` (par défaut : liste ce qui serait copié et modifié, n'écrit rien) et `--ecrire`. Les
`index.html` de l'atelier restent SANS ces lignes (l'atelier n'a pas de `moteur/`, il reste autonome et
testable ; le branchement est un fait de livraison). Lancer `node outils/livrer.mjs --simuler` et
rapporter la sortie.

## Étape 1 — Oraliser à la lecture, jamais avant la clé
`app.js`, `speakCurrent()` (l. ~134) : `const text = PILOTE_PRONONCIATION ? oraliser(brut) : brut` — c'est
la cause mesurée : la table remplace « — » par une virgule, la longueur change, la clé du MP3 ne
correspond plus, et 18 narrations sur 120 (14 stations sur 30) tombent sur la voix du navigateur au
milieu de la station. Passer `brut` tel quel à `SpeechSynthesisUtterance`. Puis vérifier dans
`C:\git\pilote-fluides\moteur\voix.js` (lecture seule) comment le repli navigateur est oralisé
(`grep -n oraliser`) : si voix.js oralise lui-même le repli, rien d'autre à faire ; sinon, n'oraliser que
lorsque `window.PiloteVoix` (le moteur) est absent — c'est-à-dire dans l'atelier seulement — pour que
le site envoie toujours le texte brut. Dire dans le rapport ce que voix.js fait.

## Étape 2 — Plus de choix de voix, plus de `voices[0]`
Retirer le sélecteur de voix (`voicePick` : balise dans `index.html` et dans le gabarit des stations —
le trouver, il est rendu par `stations/_commun/moteur.js` ou par chaque `index.html`), `remplirVoix()`,
`state.voix`. `bestVoice()` garde sa chaîne de voix **françaises** et renvoie `null` s'il n'y en a aucune :
`speakCurrent()` affiche alors « Voix indisponible » et ne parle pas (règle du 01/09 : sans voix
française, on ne parle pas ; jamais `voices[0]`). Mettre à jour les tests de l'atelier qui citeraient le
sélecteur.

## Étape 3 — Le réglage de débit : le même que le site
Sur le site, le contrôle commun `moteur/reglage-voix.js` est présent (injecté à la livraison) : quand
`window.PILOTE_VOIX_REGLAGE` existe, monter son bouton à la place du curseur (`PILOTE_VOIX_REGLAGE.monter(conteneur)`)
et lire la vitesse avec `PILOTE_VOIX_REGLAGE.vitesse()` au moment de parler ; masquer le curseur et son
« 0,95× ». Quand il est absent (atelier), garder le curseur actuel mais l'aligner sur le commun :
plage 0,6 à 1,4, pas 0,05, défaut 0,95, **arrêt de la lecture en cours au changement**, et la même clé
de session `pilote-voix-vitesse` (lire `C:\git\pilote-fluides\moteur\reglage-voix.js`, en-tête et
constante `CLE`) pour que le réglage soit le même d'un réseau à l'autre.

## Étape 4 — Un seul « Écouter » par écran
Sur une station ouverte, deux boutons « ▶ Écouter » coexistent (barre du haut + panneau de la station).
Garder celui de la station (contextuel) et masquer celui de la barre tant qu'une station est ouverte ;
il revient sur la carte.

## Étape 5 — La carte sur téléphone, et le sous-titre de la barre
À 375 px, le SVG de la carte est réduit à une vignette illisible au bas d'un cadre vide (deux tiers
d'écran blancs). Faire suivre la hauteur du cadre à celle de la carte (plus de blanc), et garder à la
carte une largeur minimale lisible (≈ 720 px) avec défilement horizontal dans son cadre en dessous de
~ 760 px. Le sous-titre de la barre (« de l'air relevé à l'installation calculée ») est écrasé en une
colonne de trois mots à toutes largeurs : lui donner sa ligne, ou le masquer sous 900 px — jamais de
micro-colonne, jamais de chevauchement. Respecter la contrainte de `tests/qa.mjs` (aucun débordement
horizontal, liens masqués sous 760 px).

## Contrôles à passer (et à rapporter tels quels)
Les six commandes du PROMPT-REPRISE (`tests/qa.mjs`, `tests/voix.mjs`, `tests/fusion.mjs`,
`tests/stations-seules.mjs`, `tests/carte-coherence.mjs`, `tests/lisibilite.mjs`), puis
`node outils/livrer.mjs --simuler`. Un contrôle qui échouait déjà avant le lot se signale comme tel
(vérifier sur `git stash` si besoin, puis `git stash pop`).

## Rapport attendu (20 lignes au plus)
Par étape : fichiers et lignes modifiés, ce qui a été fait, ce qui n'a pas pu l'être et pourquoi.
La sortie des contrôles. Ce que Fable doit observer dans le navigateur après livraison (station
« L'air se déplace », écrans 1 et 2 : le MP3 du fonds doit être demandé, plus aucune synthèse).

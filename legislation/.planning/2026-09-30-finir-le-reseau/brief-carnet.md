# BRIEF — le carnet du chargé d'affaires (couche ludique + papier du réseau Législation)

Worktree : `C:\git\pilote-fluides-chantier\legislation\` (branche `chantier-2026-09-30`).
Ne pas commiter. Ne pas utiliser le volet navigateur partagé (Chrome sans fenêtre, § 5).
Lire d'abord : `PROMPT-REPRISE.md` (architecture satellite), `progression.json` (la
progression annuelle et le fil rouge), `.planning/2026-09-30-finir-le-reseau/brief-station.md`
§ 5 (le schéma de `mission.json`), une station et son `mission.json`.

## Principe
L'étudiant BTS / TP TECVC est un jeune technicien d'études chez **Clim'Études Sud**
(entreprise fictive). Chaque station est une **mission** (`stations/<slug>/mission.json`) ;
la terminer avec ≥ 3 bonnes réponses sur 4 donne un **tampon** ; une sous-ligne complète
donne un **certificat de branche** ; les onze certificats forment le diplôme maison
« Chargé d'affaires réglementaire ». Le carnet papier et le numérique racontent la même chose.

## Lot M — la couche numérique (fichiers : `outils/poser-les-missions.mjs`,
`moteur-legislation/missions.js`, `moteur-legislation/missions.css`, `carnet.html`)
1. `moteur-legislation/missions.js` (script commun, chargé en relatif par chaque station) :
   - sur l'accueil d'une station, une **carte « Votre mission »** (client, situation,
     pièce à produire, badge à gagner, durée) — belle, sobre, couleur de la sous-ligne,
     sous la scène, repliable ; lue depuis `mission.json` (fetch relatif) ;
   - sur l'écran de fin, observer le score du quiz (lire le DOM produit par `app.js` du
     gabarit, sans modifier `app.js`) : ≥ 3/4 → animation de **tampon** (coup de tampon
     encré, léger, `prefers-reduced-motion` respecté), mémorisé en localStorage
     (`inerweb-legislation-tampons`) ; < 3/4 → « Encore un essai pour le tampon ».
2. `outils/poser-les-missions.mjs` : idempotent (comme `outils/poser-les-scenes.mjs`,
   à lire) : ajoute dans chaque `stations/*/index.html` qui a un `mission.json` la balise
   `<link>` et `<script>` du moteur de missions, sans rien toucher d'autre ; retire proprement
   ce qu'il a posé si `mission.json` disparaît.
3. `carnet.html` (page du réseau) : **Mon carnet** — la progression P1 → P5 en frise, les
   onze sous-lignes et leurs stations en cases de tampons (gagnés / à gagner), les
   certificats obtenus, un bouton « Imprimer mon carnet » (feuille de style d'impression),
   le lien vers le carnet papier PDF. Même habillage que le plan (lire `index.html`).
   Tout reste sur l'appareil : aucun envoi.
4. Sur le plan `index.html` : NE PAS l'éditer. Écrivez dans `moteur-legislation/INTEGRATION.md`
   les 2-3 lignes exactes à y insérer (lien « Mon carnet », compteur de tampons) :
   l'orchestrateur les posera.

## Lot P — le carnet papier (fichier : `outils/carnet-papier.mjs`, sorties dans `carnet/`)
Généré depuis `progression.json`, le tableau RESEAU de `index.html` (ordre des stations) et
les `mission.json` — jamais écrit à la main. Trois sorties par document : **HTML, PDF**
(Chrome sans fenêtre `--print-to-pdf`) **et docx natif** (paquet `docx` de npm, installé
dans le dossier `outils/` s'il manque — voir comment `C:\git\cuivrezo\outils\fiches-poste-docx.mjs` fait).
- **Carnet élève** (A4) : couverture (`img/scene-livret-couverture.webp`), mode d'emploi
  (1 page : une mission = une station ; scanner le QR, faire la station, remplir la mission,
  faire signer le tampon), la frise de progression P1 → P5, la carte des tampons, puis
  **une page par mission** dans l'ordre de la progression : bandeau couleur de la
  sous-ligne, titre, client, situation, pièce à produire (cadre à remplir, lignes),
  les 4 questions avec lignes de réponse et renvoi « écran n », le défi, le QR vers
  `https://inerweb.fr/legislation/stations/<slug>/` (paquet `qrcode` de npm, ⚠️ jamais
  l'encodeur maison du site, réputé faux), la case tampon, les codes du référentiel
  (TP TECVC CP…, attestation 2025 si présents). **Corps 14 pt minimum partout**, tableaux
  compris ; aucune page à moitié vide (regrouper deux missions courtes si besoin) ;
  pas de mot « examen ».
- **Livret professeur** : la progression détaillée (périodes, semaines, sous-lignes,
  durées), puis par mission : corrigés des 4 questions et du défi, points de vigilance,
  et par sous-ligne une **grille à cinq niveaux (0 à 4)** — jamais de note sur 20 — des
  compétences TECVC mobilisées.
- Missions sans `mission.json` : page « Mission en préparation » (ne doit plus arriver à la fin).
- Mesures obligatoires : `python C:/git/progression-2a-cap-ifca/outils/mesurer-polices.py carnet --eleve`
  (aucun corps < 14 pt) ; relire 3 QR du PDF (script Python `pyzbar` ou `zxing` ; sinon
  décoder via `jsQR` en node) ; regarder 4 pages du PDF rendues en PNG.

## § 5 — Voir un rendu
`"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu
--window-size=1280,900 --screenshot=<png> <url>` puis Read du PNG. Pour les pages qui font
un fetch, servir le dossier : `python -m http.server 8793` dans `C:\git\pilote-fluides-chantier`
(en arrière-plan, arrêté à la fin), URL `http://localhost:8793/legislation/...`.

## Compte rendu (court)
Fichiers, commandes à relancer, preuves (captures regardées, mesures), ce qui reste.

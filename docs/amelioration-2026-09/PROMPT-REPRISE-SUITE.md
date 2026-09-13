# Prompt de reprise — la suite du chantier « tout améliorer » (inerweb.fr)

> À coller en début du prochain chat : « Reprends le chantier "tout améliorer" d'inerweb.fr, lis
> `C:\git\pilote-fluides\docs\amelioration-2026-09\PROMPT-REPRISE-SUITE.md` puis `task_plan.md` et
> `progress.md` du même dossier, et fais le point avec moi. »

## Ce qui est FAIT le 12/09/2026 (session 1), commité en local, NON poussé
Audit : `docs/audit-site-2026-09/AUDIT-ETAT-DES-LIEUX.md`. Plan et preuves : ce dossier.
- **A · AéroRézo** — la voix ne change plus d'écran en écran (texte envoyé brut, clé du MP3 retrouvée) ;
  plus de sélecteur ni de `voices[0]` ; réglage de débit commun ; un « Écouter » par écran ; carte
  téléphone sans blanc. Atelier `C:\git\aerorezo` commits `5258513`, `20ae43c`.
- **B · HydroMétro** — barre du haut sur deux rangées à 375 px ; réglage commun. Atelier commits
  `7eaf43b`, `08a2536`.
- **C · ÉlectroRézo** — une voix par station par hachage (28 H / 31 F), sélecteur retiré, curseur
  partagé, temps sur plusieurs rangées. Atelier commit `1b54e20`.
- **D · Site** — volet « Infos » replié partout ; vues de ligne `#ligne=huile|regules|co2` réparées ;
  Tome 3 sans chevauchement ; coquille `impression.css`.
- **E · Six lecteurs** — rien ne bouge avant le clic, image et voix partent ensemble, pause et arrêt
  communs (deux corrections de Fable sur les pressostats : état lu sur le bouton du moteur ; « Pause »
  lisait `speechSynthesis.speaking`, faux pendant un MP3). Bouton « Transcription » du film Ozone
  sous le bandeau.
- **F · Mode professeur** sur AéroRézo et HydroMétro (identifiants déclarés dans
  `moteur/prof-vocal.js`, `prof-vocal.js` injecté à la livraison avant `</body>`). Pas ÉlectroRézo.
- **G · « Station suivante »** — brique `moteur/suivant.js` (voir `progress.md` pour l'état exact).
- **Trois outils de livraison** (`outils/livrer.mjs` d'AéroRézo et d'HydroMétro, ÉlectroRézo complété) :
  ils réinjectent le branchement du moteur commun dans la copie servie. **Ne plus recopier à la main.**

## Ce qui RESTE, dans l'ordre proposé
1. **Mise en ligne** — sur feu vert explicite de F. Henninot : `git push` de `pilote-fluides` (les
   ateliers n'ont pas de distant), puis vérifier LE SITE en contre-cache (`sw.js`, `?v=`), sur au
   moins : `aerorezo/stations/air-circule/` (MP3 dès l'écran 1, mode prof), `hydrometro/` à 375 px,
   `electrorezo/stations/1-1-…/` (pas de sélecteur), l'accueil (volet replié, `#ligne=co2`),
   `pressostat-bp-kp1` (rien ne bouge avant le clic).
2. **Le texte des voix** (piste 5 de l'audit) — tics (« Retenez » ×54, « Maintenant » ×47 et
   « Regardez » ×39 dans ÉlectroRézo), cinq doublons du Tome 3, gabarits de fermeture AéroRézo, deux
   tutoiements, `**` et « .. », règles « bar » / « PE » / « R 404 A » dans `build/voix/prononciation.json`.
   **Toute narration modifiée = MP3 à refabriquer = edge-tts = feu vert service tiers AVANT.**
   Même feu vert pour : les **9 narrations de KVR/NRD** (jamais collectées, la page parle avec la voix
   du navigateur) et les **5 stations muettes de la ligne Principes d'HydroMétro**.
3. **Le mode professeur sur ÉlectroRézo** — faire émettre les événements `pilotevoix:*` par son
   lecteur MP3 (`stations/_commun/station.js`) ou le passer par `PiloteVoix` ; puis `livrer.mjs`
   injecte `voix.js` + `prof-vocal.js`.
4. **La charte commune aux cinq réseaux** (piste 7) — un chat par réseau, jamais d'un bloc :
   barre commune (phase 2 du chantier `docs/reseaux-2026-09/`), `charte-edu.css` chargée par les
   32 modules à feuille propre, polices hors charte, « Académie interactive du froid » rhabillée.
5. **Stations minces** (piste 8) — Académie, Fil conducteur, KVL, circuit d'huile interactif.
6. **Décisions de F. Henninot** — retirer « brouillon » (59 stations ÉlectroRézo) et « Prototype »
   (Législation, HydroMétro) quand la relecture métier est faite ; « R-??? » de Mission bouteilles
   (vraisemblablement un oubli, non modifié).
7. **Pièges connus à traiter avant tout `build/build.mjs`** : le gabarit `src/hub-shell.html` est en
   retard sur `index.html` (bloc `support-appareil`) — le build l'effacerait. Deux erreurs de console
   préexistantes : film Ozone (`appendChild` / `react-dom`), HydroMétro Débit (`titles`).

## Règles qui ont tenu (à garder)
Un agent Sonnet par dépôt sur brief écrit ; Fable relit chaque diff, livre, vérifie sur le serveur
local (`.claude/launch.json` → `pilote-fluides`, port 8791, service worker retiré pour mesurer) et
commite. Mesurer l'état du moteur, pas l'image ; onglet caché = image gelée et voix coupée.

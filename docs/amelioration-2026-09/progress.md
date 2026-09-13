# Progress — chantier « tout améliorer », inerweb.fr

## Session 1 — 12/09/2026 (soir)
- Feu vert de F. Henninot sur l'audit (`docs/audit-site-2026-09/`).
- Plan posé. Reconnaissance des ateliers faite (findings.md) : les copies servies sont EN AVANCE sur
  les ateliers (branchement du moteur posé dans la copie) → chaque atelier reçoit un `outils/livrer.mjs`.
- Vague 1 lancée (~20:40) : cinq agents Sonnet, briefs A à E. Serveur local démarré (port 8791) pour
  la vérification de la phase 3.

- Lot A rentré (~21:00) : diff relu, livré par `node outils/livrer.mjs --ecrire` (nouvel outil). Deux
  retouches CSS de Fable après vérification navigateur : `.voice-rate[hidden]{display:none}` (le
  `hidden` était battu par `display:flex`) et barre du haut en `flex-wrap` sous 760 px (le réglage
  commun débordait à 375 px). QA rejouée 3826/0, relivré.
- Lot C rentré (~21:20) : diff relu (59 index.html, station.js, reseau.js, station.css, livrer.mjs
  injecte désormais prononciation.js), livré par `node outils/livrer.mjs` (59 stations zéro défaut,
  28 hommes / 31 femmes).

## Tests / preuves
| Preuve | Résultat |
|---|---|
| AéroRézo, serveur local, station « L'air se déplace » écran 1, clic Écouter | MP3 `42a2f0b9-503.mp3` demandé, `speechSynthesis.speaking = false` — le fonds commun parle, plus la voix du navigateur ✅ |
| AéroRézo : sélecteur de voix | absent ✅ · un seul « Écouter » visible ✅ · réglage commun monté ✅ |
| AéroRézo `tests/qa.mjs` après retouches CSS | 3826 contrôles, 0 échec ✅ |
| ÉlectroRézo `controler-stations.mjs` (par livrer.mjs) | 59 stations, zéro défaut ✅ ; copie servie : 0 `voixPick`, prononciation.js ×1 par station ✅ |
| AéroRézo accueil à 375 px (serveur local, SW retiré) | barre sur une rangée, curseur caché (`display:none`), réglage commun « − 0,95× + », carte pleine largeur à défilement horizontal, aucun blanc, aucun débordement ✅ (capture vue) |
| ÉlectroRézo 1.1, clic Écouter (bureau) | `voix/homme/decouvrir.mp3` joué, aucun sélecteur, console vide ✅ |
| ÉlectroRézo 1.1 à 375 px | barre des cinq temps sur deux rangées (86 px), aucun débordement ✅ |
| Commits locaux | aerorezo `5258513`, electrorezo `1b54e20` — aucun push |
| Lot D, accueil à 1 280 px | volet « Infos » replié (`.volet.replie`, bord droit à −3 px), titre visible dès 113 px, poignée présente ✅ |
| Lot D, vues de ligne | `#ligne=regules` → « 🔌 LA RÉGULATION », 13 liens ; `#ligne=co2` → 9 ; `#ligne=huile` → 5 ; `#ligne=organes` → 7 (inchangé) ✅ |
| Lot D, contrôles | `controle-syntaxe` 521 pages, 1 erreur antérieure ; `plan-liste` idempotent ✅ |
| Lot B, HydroMétro à 375 px (serveur local) | accueil : barre 126 px, 21 éléments, 0 chevauchement, 0 débordement, réglage commun visible ✅ ; Bitube : barre 132 px, CAP · Bac pro · BTS · Plan · Écouter · Arrêter · − 0,95× +, 0 chevauchement ✅ |
| Lot B, livraison | `livrer.mjs --ecrire` : 22 stations + accueil injectés ; **66 fichiers `.md` (QA, SOURCES, _ETAT) retirés de la copie servie** — conformes à la règle « servable seulement » du PROMPT-REPRISE, non liés depuis le site |
| Lot B, `npm run qa` | 238 réussis, 2 échecs antérieurs connus ✅ |
| Lot D, Tome 3 à 800 × 600 (feuille rechargée hors cache) | pied de page bas à 540 px ; carte « Mode prof vocal » dès 550, cartouche de marque dès 568 : intersection 0 ✅ (avant : 4 644 et 6 421 px² de chevauchement) |
| Commit local | hydrometro `7eaf43b` — aucun push |
| Lot E, KP1 à l'ouverture (serveur local, 5 s) | compteur à 0:00.00 / 1:02.00, aucune animation active : rien ne bouge avant le clic ✅ (avant : 0:02 dès le chargement) ; clic « Écouter » → MP3 `4180ac81-441` demandé, bouton « ❚❚ Pause » |
| Lot E, film Ozone à l'ouverture | compteur 0:00.00, bouton « Transcription » sous le bandeau, plus sur le logo ✅ |
| Lot E, `controle-syntaxe` | 521 pages, 1 erreur antérieure ✅ ; modifications : films 25/1 et 24/1 lignes, pressostats 65/9 ×3, KVR/NRD 40/13 |
| Lot E, film Ozone après clic « Écouter le film » | 0:07,54, scène des CFC, bouton « Pause » : image et voix ensemble ✅ |
| **Lot E, pressostats — deux corrections de Fable** | (1) la scrutation de l'horloge `localStorage` (clé figée) basculait lecture/pause 8 fois et laissait l'image arrêtée → remplacée par la lecture de l'état du bouton du moteur (triangle = pause, deux barres = lecture), un seul clic ; (2) « Pause » testait `speechSynthesis.speaking`, faux pendant un MP3 du fonds → relançait la narration → état lu sur `PiloteVoix.etat().actif` + drapeau `pauseVoix`. Scripts dans le scratchpad, appliqués aux 3 pages (blocs identiques, md5 vérifié) |
| Lot E, KP1 après corrections (cycle complet) | chargement : moteur en pause, MP3 inactif · Écouter : moteur en lecture, MP3 actif, « ❚❚ Pause » · Pause : moteur en pause, « ▶ Reprendre » · Reprendre : en lecture · Stop : en pause, MP3 inactif, « ▶ Écouter » — console vide ✅ |
| `controle-syntaxe` après corrections | 521 pages, 1 erreur antérieure ✅ |
| Lot F, relivraison AéroRézo + HydroMétro | `prof-vocal.js` injecté avant `</body>` sur 36 + 22 stations et les deux accueils ; commits ateliers aerorezo `20ae43c`, hydrometro `08a2536` |
| Lot F, HydroMétro Bitube | pastille « Mode prof vocal », Écouter → MP3 `7f2e13f8-601` ; l'écran 1 est une activité (« Lancer l'eau ») → arrêt « À vous de jouer » ✅ (comportement voulu) |
| **Lot F, AéroRézo — correction de Fable** | après le premier écran, le mode déclarait « Parcours terminé » : `stageSignature()` ne lisait aucun élément d'AéroRézo → `#stepStatus` ajouté aux candidats (`moteur/prof-vocal.js`) |
| Lot F, AéroRézo après correction | Écouter → MP3 écran 1 ; à 46 s : « Comprendre · 2/4 », MP3 `f67cb10e-840` en lecture, pastille « lecture », console vide ✅ — l'enchaînement automatique tient |
| Lot F, ÉlectroRézo | non câblé (lecteur MP3 propre, hors `PiloteVoix`) — reste listé |

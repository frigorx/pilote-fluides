# Findings — chantier « tout améliorer », inerweb.fr

## Point de départ (audit du 12/09, `docs/audit-site-2026-09/`)
- AéroRézo : `aerorezo/app.js` l. 134 oralise AVANT la clé → 18 narrations sur 120 (14 stations sur 30) manquent leur MP3 et tombent sur la voix du navigateur ; l. 98 repli `voices[0]` (voix anglaise possible). 153 MP3 présents dans le fonds commun, textes identiques aux sources (120/120).
- Quatre commandes vocales : plan (Écouter · Stop · 0,95× · Aa), HydroMétro (Écouter · Arrêter · − 0,95× +), AéroRézo (curseur · sélecteur Hortense/Julie/Paul · Écouter, deux boutons), ÉlectroRézo (Écouter · curseur · sélecteur Henri/Denise).
- Lecteurs React (3 pressostats, KVR/NRD, 2 films) : l'horloge démarre seule au chargement, la voix attend le clic.
- Mise en page : HydroMétro barre chevauchée à 375 px ; AéroRézo carte illisible + blanc à 375 px, sous-titre écrasé ; accueil volet « Infos » ouvert à 1 280 px couvre le titre (voulu le 19/08, `index.html` ~l. 1848) ; film Ozone bouton « Transcription » sur le logo ; ÉlectroRézo onglets débordent à 800 px ; Tome 3 pied de page coupé.
- Vues de ligne cassées : `#ligne=huile`, `#ligne=regules` (liens gravés par l'atelier), `#ligne=co2` (regex `[a-z-]+` refuse le chiffre).
- Corpus des voix : clé = FNV-1a du texte normalisé + longueur ; normalisation dans `moteur/voix.js` (`normalizeText`) = celle du collecteur. Toute modification d'un texte parlé orpheline son MP3.

## Chaînes de contrôle et de livraison (relevées en session 1)
| Dépôt | Atelier (vérité) | Contrôles | Livraison vers la copie servie |
|---|---|---|---|
| Site | `C:\git\pilote-fluides` (dépôt distant frigorx, CNAME) | `node outils/controle-syntaxe.mjs` (compile tous les `<script>` en ligne, 1 erreur antérieure connue), `node build/plan-liste.mjs` idempotent, `node outils/controle-voix.mjs` | `node build/version.mjs` (clé `?v=`, sw.js) — `build/build.mjs` enchaîne profondeur, matrice, galerie, sons, registre, plan-liste ; serveur local : `.claude/launch.json` → `python -m http.server 8791` (entrée `pilote-fluides`) |
| AéroRézo | `C:\git\aerorezo` (sans distant) | `tests/qa.mjs`, `tests/voix.mjs`, `tests/fusion.mjs`, `tests/stations-seules.mjs`, `tests/carte-coherence.mjs`, `tests/lisibilite.mjs` (PROMPT-REPRISE : six commandes) | copie manuelle du servable seulement (ni tests, ni outils, ni design, ni .md) → `pilote-fluides/aerorezo/`, puis `version.mjs` |
| HydroMétro | `C:\git\hydrometro` (sans distant) | `npm run qa` (Playwright, 240 contrôles, 2 échecs préexistants : « aucune dépendance HTTP(S) », « statut bêta locale visible ») | copie du servable (index, 5 js, 2 css, assets/, lignes/, stations/) → `pilote-fluides/hydrometro/`, puis `node build/build.mjs` |
| ÉlectroRézo | `C:\git\electrorezo` | `controler-stations.mjs`, `construire-planche.mjs`, `tracer-carte.mjs`, `controler-parcours.mjs` | `node outils/livrer.mjs` (refuse si contrôle rouge, écrase le dossier servi), puis `attester.mjs` contre le site |
| atelier-animations | `C:\git\atelier-animations` | — | `copier-ligne-regules-vers-pack.mjs` (ligne Régulation seulement). Les pressostats KP1/KP5/KP15, KVR/NRD et les deux films vivent DANS le pack (`packs/fluides/res/…`, sources `.jsx` à côté ; `build/films.mjs`) |

## ⚠️ Les copies servies sont EN AVANCE sur les ateliers (constaté le 12/09)
- Les `index.html` d'AéroRézo et d'HydroMétro servis portent le branchement du moteur commun
  (`../../../moteur/voix-index.js`, `prononciation.js`, `voix.js`, `reglage-voix.js`) posé les 01-02/09
  directement dans la copie servie ; **les ateliers ne l'ont pas** (0 occurrence). Une relivraison naïve
  depuis l'atelier effacerait la voix du site. HydroMétro : 22 stations + index ; AéroRézo : idem.
- Les fins de ligne diffèrent (CRLF/LF) : tout `diff` se fait avec `--strip-trailing-cr`.
- Règle du chantier : **étape 0 de chaque lot atelier = remettre l'atelier au niveau de la copie
  servie** (porter les écarts réels dans l'atelier, git les montre), puis corriger, puis relivrer.
- Le corpus des voix (`build/voix/corpus.json`) est un instantané du 02/09 ; il ne couvre pas
  ÉlectroRézo (voix propres) ; Législation y est en `data-narration`.

## Pièges trouvés en chemin (session 1)
- **`build/build.mjs` régénère `index.html` du plan depuis le gabarit `src/hub-shell.html`, qui est
  en retard** : le bloc `support-appareil` ajouté à la main dans `index.html` disparaît à la relance
  du build (constaté et annulé par le lot D). À remettre à niveau avant tout `build.mjs`.
- Les feuilles de style des modules portent un `?v=1` figé (`styles.css?v=1`) : après une
  correction, un navigateur qui a déjà la feuille en cache garde l'ancienne jusqu'à revalidation
  (le service worker la remet à jour en arrière-plan, effet à la visite suivante). Pour vérifier une
  correction CSS en local, recharger la feuille avec un paramètre neuf.
- Le `hidden` HTML est battu par toute règle `display:` explicite sur le même élément (AéroRézo,
  `.voice-rate{display:flex}`) : prévoir `.classe[hidden]{display:none}`.
- HydroMétro : la copie servie contenait les `QA.md`, `SOURCES.md`, `_ETAT.md` des stations (66
  fichiers) ; `livrer.mjs` les exclut désormais, conformément à la règle « servable seulement ».
- **KVR/NRD parle avec la voix du navigateur** : ses narrations (« Le régime normal. Une chambre
  froide… », 216 caractères, clé `7a15fb2b-216`) ne sont pas dans l'index des MP3 — le collecteur ne
  lit pas les textes de ce lecteur React (annexe B : 0 narration, 0 MP3 pour ce module). Mécanique
  saine (lot E), fonds absent : à collecter puis fabriquer (edge-tts → feu vert service tiers).
- Les lecteurs des pressostats tournent avec `requestAnimationFrame` : dans un onglet caché, le
  navigateur gèle l'image (et `moteur/voix.js` coupe la voix sur `visibilitychange`). Toute mesure
  du mouvement se fait onglet au premier plan ; l'état se lit sur le bouton du moteur (triangle =
  pause, deux barres = lecture), pas sur `localStorage['animstage-v3:t']`, qui ne bouge pas.
- Film Ozone : erreur de console `Failed to execute 'appendChild' on 'Node': Unexpected token '-'`
  (dans `moteur/vendor/react-dom.production.min.js`) — **préexistante**, reproduite à l'identique
  sur la version HEAD d'avant le chantier posée en copie témoin ; le film joue malgré elle. À
  regarder à part (un `<script>` que le moteur insère et dont le texte ne s'analyse pas).
- HydroMétro, station Débit (ligne Principes) : erreur de console **préexistante et présente en
  ligne** — `stations/debit/station.js:76 Cannot read properties of undefined (reading 'titles')`.
  Hors chantier, à traiter avec la ligne Principes.
- Le mode professeur ne reconnaît un changement d'écran que par `stageSignature()` (liste de
  sélecteurs de titre ou de compteur) : un gabarit dont aucun élément n'y figure fait déclarer
  « Parcours terminé » dès le premier passage. AéroRézo y est entré par `#stepStatus`.
- Le bouton « Pause » des pressostats testait `speechSynthesis.speaking`, toujours faux pendant un
  MP3 du fonds (voix.js ne redéfinit ni `speaking` ni `paused`) : l'état se lit sur
  `PiloteVoix.etat().actif`, avec un drapeau local entre Pause et Reprendre.

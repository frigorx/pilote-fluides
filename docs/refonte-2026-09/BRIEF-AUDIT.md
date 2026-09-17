# Brief commun — audit « fond et forme » d'inerweb.fr (17/09/2026)

> Ce brief est donné à chaque agent d'audit. Il dit ce qu'est le site, où sont les choses, quels
> outils existent, et ce qu'on attend d'un constat. Le prompt de l'agent ajoute sa dimension.
> **Lecture seule : aucun agent ne modifie un fichier du dépôt.** Les scripts et sorties vont dans
> `docs/refonte-2026-09/sondes/` (rapport) ou dans le bloc-notes de session.

## 1. Ce qu'est le site

`https://inerweb.fr` = le dépôt `C:\git\pilote-fluides` (branche `main`), servi tel quel par GitHub
Pages derrière Cloudflare. **Copie locale servie sur `http://localhost:8791`** (même arborescence).
Auteur : F. Henninot, enseignant froid-climatisation ; marque **inerWeb** (jamais le nom d'un
établissement, jamais un nom d'élève sur le site public). Publics : élèves de CAP, Bac pro, BTS,
stagiaires de l'habilitation fluides ; beaucoup de lecteurs fragiles (FLE, DYS) → **vouvoiement,
vocabulaire simple, la voix explique**. Gratuit, sans compte.

Le site est un ensemble de **réseaux** (métaphore du plan de métro : lignes, stations) :

| Réseau | Où | Stations | Gabarit |
|---|---|---|---|
| Plan thermo-techno (le cœur) | `index.html` (carte) → `packs/fluides/res/<module>/` | 72 modules + 24 capsules (`res/capsules/?c=…`) | hétérogène : 32 feuilles de style, cours à écrans, lecteurs React, films |
| Législation | `legislation/`, stations `legislation/stations/<id>/` | 29 | un gabarit strict |
| HydroMétro (hydraulique) | `hydrometro/`, `hydrometro/stations/<id>/` | 22 (lignes D, P, E, M) | atelier `C:\git\hydrometro`, copie servie ici |
| AéroRézo (aéraulique) | `aerorezo/`, `aerorezo/stations/<id>/` | 36 | atelier `C:\git\aerorezo` |
| ÉlectroRézo (électrotechnique) | `electrorezo/`, `electrorezo/stations/<id>/` | 59 | atelier `C:\git\electrorezo`, MP3 propres |
| HoCourant (habilitation électrique) | `hocourant/?module=M1…` | 13 | application |
| AquiBlue (acquisition Bluetooth) | `aquiblue/` | application | — |
| Pages du site | `*.html` à la racine | 16 (accueil, métier, formateurs, formation, mentions, dossier, documents, galerie, matrice, planning, pratique, relecture, seances, partage, portail, charte, comprendre-les-codes) | — |
| Livre | `f/<id>/` | pages adressées par QR depuis le livre HabFluide | ne pas auditer |
| Modules externes | `frigorx.github.io/sous-tension/`, `…/qcm-travail-hauteur/`, `…/inerweb-fgaz/` | 8 | hors dépôt |

**Règle des deux copies** : HydroMétro, AéroRézo, ÉlectroRézo se corrigent dans leur atelier puis se
relivrent ici par `outils/livrer.mjs`. Un constat sur ces réseaux se rapporte à la copie servie, le
correctif se fera dans l'atelier.

## 2. Les sources de vérité (à lire avant d'écrire)

- **Le catalogue des 281 stations** : `docs/catalogue-2026-09/catalogue-stations.json` (`stations[]` :
  `reseau, id, titre, ligne, resume, niveaux, competences, missionProf, url, chemin`). C'est la liste
  de travail : titre, adresse, codes du référentiel déclarés.
- **L'audit du 12/09** : `docs/audit-site-2026-09/AUDIT-ETAT-DES-LIEUX.md` (10 constats, § 8 = dix
  chantiers) + annexes A (voix) et B (243 stations mesurées : mots, écrans, questions, MP3). **Ne pas
  remesurer ce qu'il mesure** ; dire seulement si un point y relevé est corrigé ou non. Les lots A à F
  du 12-13/09 ont corrigé : voix d'AéroRézo, commande vocale commune, lecteurs synchronisés, volet
  « Infos », vues de ligne, barre HydroMétro à 375 px, carte AéroRézo, mode prof sur AéroRézo et
  HydroMétro, brique « station suivante » sur 50 modules du plan.
- **La charte graphique** (fait foi) : `C:\git\usine-contenu\00-charte\CHARTE-GRAPHIQUE-INERWEB.md`
  (§ 3 identité et palette, § 7 règles absolues : fonds clairs, jamais de thème sombre, couleur jamais
  seule porteuse d'information, 14 pt minimum sur document élève imprimé) ; l'application au site :
  `CHARTE-GRAPHIQUE.md` (racine) et `moteur/charte-edu.css` (bleu `#1B3A63`, orange `#FF6B35`,
  Trebuchet MS titres, Calibri texte).
- **La voix** : `C:\git\usine-contenu\00-charte\VOIX-ET-NARRATION.md` (la voix explique, ne lit pas
  l'écran ; débit commun ; une voix par module).
- **Les référentiels** : `C:\Users\henni\.claude\skills\referentiels-froid\references\` (`cap-ifca.md`,
  `bac-pro-mfer.md`, `2nde-tne.md`, `filieres-connexes.md`) ; le référentiel de l'habilitation fluides
  (136 codes de l'arrêté, catégories A1/A2/D/E) est une donnée de build : `build/referentiel.mjs` et
  `MATRICE-COMPETENCES.md`.
- **Le fonds de cours de l'auteur (RAG)** — pour vérifier un fait ou trouver le cours source :
  `node C:/git/HAL-v3/scripts/chercher-rag.js "<sujet en langue de métier>" --k 6 --texte`
  (`--source station | document | livre | machine | ressource` pour une seule couche). Utiliser
  **avant** d'affirmer qu'un contenu manque ou qu'une valeur est fausse.

## 3. Les outils de mesure

- **Serveur local** : `http://localhost:8791` (déjà lancé). `curl` voit la version servie ; un
  navigateur enregistre le service worker `sw.js` → avec Playwright, créer le contexte avec
  `serviceWorkers: "block"`.
- **Playwright** : `const { chromium } = createRequire(import.meta.url)("C:/git/hydrometro/node_modules/playwright");`
  puis `chromium.launch({ channel: "chrome" })` (le navigateur téléchargeable manque, Chrome du poste
  est là). Modèle complet : `docs/refonte-2026-09/outils/sonder-rendu.mjs`.
- **Les mesures de rendu déjà faites** : `docs/refonte-2026-09/mesures/mesures.json` — 27 pages
  témoins × 3 largeurs (375, 800, 1280) : débordement, éléments hors cadre, chevauchements d'éléments
  interactifs, police minimale, console, ressources en échec, titre/h1/lang/description ; captures
  `mesures/<id>-<largeur>.png` (lisibles avec l'outil Read). Liste : `outils/liste-pages.json`.
- `node outils/controle-syntaxe.mjs` (521 pages, 1 erreur connue : `document-eleve-compresseur.html`) ;
  `build/verifier-adresses.mjs` (adresses du livre) ; `build/sitemap.mjs` (liste INDEXEES : 10 pages).
- Pour lire du HTML côté script sans navigateur : regex ou `C:/git/HAL-Claw-signaux-20260916/node_modules/jsdom`.

## 4. Ce qu'on attend d'un constat

Un constat = **un fait mesuré**, pas une impression. Chaque constat porte :
- `dimension` (F1, F2, F3, M1, M2, M3, T1) ;
- `ou` : fichier et ligne, ou adresse et largeur ;
- `constat` : une phrase, en français, sans anglicisme, chiffrée quand c'est possible ;
- `preuve` : ce qui permet de le revérifier (commande, extrait, capture, mesure) ;
- `gravite` : `bloquant` (faux, dangereux, illisible, cassé) · `majeur` (gêne réelle pour l'élève) ·
  `mineur` (finition) ;
- `correctif` : une ligne, concrète (quel fichier, quoi changer) ;
- `effort` : `petit` (moins d'une demi-journée Sonnet) · `moyen` (une journée) · `gros` (plusieurs).

Interdits : « pourrait être amélioré », « moderniser », « le design », toute recommandation sans lieu
ni mesure. Ne pas relister ce que l'audit du 12/09 a déjà écrit sauf pour dire « corrigé » /
« non corrigé ». Dire à la fin **ce qui n'a pas été regardé** (les limites), c'est aussi précieux que
les constats. Écrire son rapport complet dans `docs/refonte-2026-09/sondes/<dimension>.md` AVANT de
rendre la sortie structurée : si la session tombe, le rapport reste.

Chaque agent rend, en plus, un résumé de 3 à 5 lignes : la chose la plus importante qu'il a vue.

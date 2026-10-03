# JouéRézo — le réseau de jeux d'inerWeb

> Atelier : `C:\git\jouerezo` (fait foi). Copie servie : `C:\git\pilote-fluides\jouerezo\` → `https://inerweb.fr/jouerezo/`.
> Né dans la nuit du 02 au 03/10/2026 sur carte blanche de F. Henninot ; neuf jeux depuis le 03/10 au matin.
> **Réseau caché** pour l'instant : aucune entrée depuis l'accueil, le plan ni le quartier 3D ; `noindex` sur toutes les pages.
> Périmètre voulu par Franck : **froid classique, pas de clim** (CartoClim reste hors des jeux).

## Ce que c'est

Neuf jeux courts, jouables au téléphone, qui rejouent le contenu des stations existantes. Rien n'est écrit ici qui ne soit déjà en ligne, rien n'est redessiné :

| Jeu | Page | Moteur | Thèmes | D'où vient le contenu |
|---|---|---|---|---|
| Memory | `memory.html` | `moteur/memory.js` | symboles du froid, symboles électriques, **le vrai et le symbole** (électricité, froid), **les outils**, fluides et classes, un risque une protection | bibliothèque `../symboles/` (QElectroTech, CC BY 3.0) ; **bibliothèque curée inerWeb** (éléments réels `reel_*` et symboles, copiés dans `illustrations/bibliotheque/`) ; vues d'organes du Tome 3 ; photos d'atelier et CuivRézo ; planches HabFluide |
| Le bon ordre | `ordre.html` | `moteur/ordre.js` | gestes du frigoriste (7 séries), sécurité (3) | planches HabFluide `f/a-*` |
| Chrono vrai ou faux | `chrono.html` | `moteur/chrono.js` | fluides et gestes, électricité, hauteur, tout mélangé | 32 questions écrites ici + banques **chargées en direct** HoCourant et R408 |
| QCM éclair | `qcm.html` | `moteur/qcm.js` | les mêmes | les mêmes |
| L'intrus | `intrus.html` | `moteur/intrus.js` | fluides, sécurité, **outils**, organes | planches HabFluide, nomenclature, CuivRézo |
| Nuit à l'atelier | `aventure.html` | `moteur/aventure.js` | les zombies du R-22 (12 scènes) | `donnees/aventure.js` |
| **Compléter le schéma** | `schema.html` | `moteur/schema.js` | la croix du frigoriste, la ligne liquide, 11 câblages (démarrage direct, pump-down, chambre froide négative, EP2 2022, bac 2008) | circuits décrits dans `donnees/schemas.js` avec les symboles de la bibliothèque curée ; câblages **chargés en direct** depuis `../cablage-virtuel/exercices/<id>.js` (carte SVG convertie des .qet de Franck) |
| **Qui suis-je ?** | `quisuisje.html` | `moteur/quisuisje.js` | organes du froid, outils, appareils électriques, tout | `donnees/definitions.js` (écrit ici depuis HabFluide et CuivRézo) + `donnees/banque-electrorezo.js` (FABRIQUÉ depuis les stations ÉlectroRézo, champ « à quoi ça sert ») |
| **Le pendu du frigo** | `pendu.html` | `moteur/pendu.js` | les mêmes banques | les mêmes ; pas de bonhomme : un compresseur qui chauffe |

Chaque partie finit par un **code de partie** (`JR-<lettre du jeu>-<thème>-<score>/<total>-<contrôle>`, alphabet sans O/0/I/L/1 comme HoCourant) et par des **portes** vers les stations à revoir. Le meilleur score reste sur l'appareil (`localStorage`).

## Structure

```
index.html            accueil du réseau (liste générée par commun.js ; bloc de scripts régénéré par fabriquer-pages)
<jeu>.html            neuf pages GÉNÉRÉES par outils/fabriquer-pages.mjs — modifier le gabarit, pas les pages
jouerezo.css          charte inerWeb écran, téléphone d'abord, états à trois canaux (couleur + trait + mot)
moteur/commun.js      socle : barre du haut, choix du thème, sons synthétisés, code de partie, panneau de fin, banques
moteur/<jeu>.js       un moteur par jeu
donnees/schemas.js    circuits frigorifiques (croix, ligne liquide) + liste des câblages joués
donnees/reel-symbole.js   paires élément réel ↔ symbole (et inventaire des copies de la bibliothèque)
donnees/definitions.js    définitions froid + outils, photos d'outils
donnees/banque-electrorezo.js   FABRIQUÉ par outils/extraire-banques.mjs
donnees/aventure.js   le scénario de l'aventure
donnees/themes.js     JR_JEUX + JR_THEMES : dérive tout des fichiers ci-dessus (chargés AVANT lui)
illustrations/*.svg   neuf icônes faites main (charte) ; accueil.webp (Codex) ; bibliotheque/ (copies curées, SOURCES.md)
outils/servir.mjs     serveur local : /jouerezo/ depuis l'atelier, le reste depuis pilote-fluides (port 8797) ; /sw.js bloqué
outils/livrer.mjs     copie vers pilote-fluides/jouerezo/ (+ clé ?v= datée) — --ecrire pour écrire, --cible pour un worktree
outils/fabriquer-pages.mjs · extraire-banques.mjs · copier-bibliotheque.mjs
```

## Travailler dessus

```bash
node outils/servir.mjs            # puis http://localhost:8797/jouerezo/
node outils/extraire-banques.mjs  # après un changement des stations ÉlectroRézo
node outils/copier-bibliotheque.mjs   # après un ajout de `lib:` dans reel-symbole.js ou schemas.js
node outils/fabriquer-pages.mjs   # après un changement du gabarit, de JR_JEUX ou de la liste des données
```

Ajouter un thème = une entrée dans `JR_THEMES.<jeu>` ; une question = une ligne dans `QUESTIONS_FLUIDES` ; une définition = une ligne dans `JR_DEFINITIONS` ; un câblage = une ligne dans `JR_SCHEMAS.cablages` (l'identifiant du Câblage virtuel). Vérification rapide sans navigateur : bloc `node -e` de `REPRISE.md`.

## Livrer

1. `git status` de `C:\git\pilote-fluides` : ne jamais embarquer le travail d'un autre chat. Livrer **depuis un worktree détaché de `origin/main`** sur un chemin court (`git worktree add --detach C:\git\_wt-jouerezo origin/main`).
2. `node outils/livrer.mjs --ecrire --cible C:\git\_wt-jouerezo\jouerezo`.
3. Dans le worktree : `node build/retour-accueil.mjs`. `version.mjs` n'est pas nécessaire (satellite, navigations réseau-d'abord).
4. `git add jouerezo/` seulement, commit, `git log --oneline origin/main..HEAD` (rien d'étranger), `git push origin HEAD:main`, retirer le worktree.
5. Contrôle : `curl -A "Mozilla/5.0" "https://inerweb.fr/jouerezo/?probe=<aléa>"` — clé sonde aléatoire d'abord. Deux pushes rapprochés : la construction Pages du premier est **annulée** par le second (l'API dit « errored »), ce n'est pas un échec.

## Règles tenues

- Le R-290 est A3, jamais A2L. Les PRP sont les valeurs indicatives des planches (AR4) ; la fiche du fluide fait foi.
- Aucun chiffre réglementaire inventé : pas de seuil, pas de durée, pas de pression cible.
- Aucun schéma dessiné : les câblages sont ceux du Câblage virtuel ; la croix et la ligne liquide reprennent les planches.
- La banque du test d'accueil MFER (`test-accueil-mfer/banque.json`) n'est **pas** utilisée : elle attend la validation de Franck (chat 5).
- Pas de thème sombre, pas d'animation conditionnée au réglage du système, aucune dépendance externe.

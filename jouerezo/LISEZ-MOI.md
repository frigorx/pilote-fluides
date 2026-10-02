# JouéRézo — le réseau de jeux d'inerWeb

> Atelier : `C:\git\jouerezo` (fait foi). Copie servie : `C:\git\pilote-fluides\jouerezo\` → `https://inerweb.fr/jouerezo/`.
> Né dans la nuit du 02 au 03/10/2026 sur carte blanche de F. Henninot (« un réseau de jeux… tu as l'autorisation de pousser sans mon accord »).
> **Réseau caché** pour l'instant : aucune entrée depuis l'accueil, le plan ni le quartier 3D ; `noindex` sur toutes les pages.

## Ce que c'est

Six jeux courts, jouables au téléphone, qui rejouent le contenu des stations existantes. Rien n'est écrit ici qui ne soit déjà en ligne :

| Jeu | Page | Moteur | Thèmes | D'où vient le contenu |
|---|---|---|---|---|
| Memory | `memory.html` | `moteur/memory.js` | symboles du froid, symboles électriques, fluides et classes, un risque une protection | bibliothèque `../symboles/` (QElectroTech, CC BY 3.0) ; planches HabFluide ; `cerveau_v5.js` de RézoTools pour les classes |
| Le bon ordre | `ordre.html` | `moteur/ordre.js` | gestes du frigoriste (7 séries), sécurité (3) | planches HabFluide `f/a-*` (mise en service, ordre des vannes, récupération, détecteur, brasage, pesée, tirage au vide, consignation, préparation de chantier, espace clos) |
| Chrono vrai ou faux | `chrono.html` | `moteur/chrono.js` | fluides et gestes, électricité, hauteur, tout mélangé | 32 questions écrites ici (`donnees/themes.js`) + banques **chargées en direct** `../hocourant/donnees/questions.js` (108) et `../r408/donnees/questions.js` (99) |
| QCM éclair | `qcm.html` | `moteur/qcm.js` | les mêmes | les mêmes |
| L'intrus | `intrus.html` | `moteur/intrus.js` | fluides, sécurité, organes | planches HabFluide, nomenclature |
| Nuit à l'atelier | `aventure.html` | `moteur/aventure.js` | les zombies du R-22 (12 scènes) | `donnees/aventure.js` ; chaque mauvais choix renvoie à sa planche |

Chaque partie finit par un **code de partie** (`JR-<lettre du jeu>-<thème>-<score>/<total>-<contrôle>`, alphabet sans O/0/I/L/1 comme HoCourant) et par des **portes** vers les stations à revoir. Le meilleur score reste sur l'appareil (`localStorage`).

## Structure

```
index.html            accueil du réseau (liste générée par commun.js depuis JR_JEUX / JR_THEMES)
<jeu>.html            six pages GÉNÉRÉES par outils/fabriquer-pages.mjs — modifier le gabarit, pas les pages
jouerezo.css          charte inerWeb écran, téléphone d'abord, états à trois canaux (couleur + trait + mot)
moteur/commun.js      socle : barre du haut, choix du thème, sons synthétisés, code de partie, panneau de fin, banques
moteur/<jeu>.js       un moteur par jeu, < 120 lignes chacun
donnees/themes.js     JR_JEUX + JR_THEMES : tout le contenu, une seule source
donnees/aventure.js   le scénario de l'aventure
illustrations/*.svg   six icônes faites main (charte), 64 × 64
outils/servir.mjs     serveur local : /jouerezo/ depuis l'atelier, le reste depuis pilote-fluides (port 8797)
outils/livrer.mjs     copie vers pilote-fluides/jouerezo/ (+ clé ?v= datée) — --ecrire pour écrire
outils/fabriquer-pages.mjs
```

## Travailler dessus

```bash
node outils/servir.mjs            # puis http://localhost:8797/jouerezo/
node outils/fabriquer-pages.mjs   # après un changement du gabarit ou de JR_JEUX
```

Ajouter un thème = une entrée dans `JR_THEMES.<jeu>` ; ajouter une question = une ligne dans `QUESTIONS_FLUIDES`. Un symbole se désigne par son identifiant dans `../symboles/index.json`. Vérification rapide sans navigateur (syntaxe, doublons de faces, symboles présents, une seule bonne réponse par scène) : voir le bloc `node -e` de `REPRISE.md`.

## Livrer

1. `git status` de `C:\git\pilote-fluides` : ne jamais embarquer le travail d'un autre chat. Si du non-commité ou du non-poussé qui n'est pas à soi s'y trouve, livrer **depuis un worktree détaché de `origin/main`** (`git worktree add --detach <dossier> origin/main`).
2. `node outils/livrer.mjs --ecrire` (adapter la cible si worktree).
3. Dans le site : `node build/retour-accueil.mjs` (logo de retour sur les nouvelles pages). `version.mjs` n'est pas nécessaire : satellite hors de sa liste, navigations réseau-d'abord.
4. `git add jouerezo/` seulement, commit, `git log --oneline origin/main..HEAD` (rien d'étranger), push.
5. Contrôle : `curl -A "Mozilla/5.0" "https://inerweb.fr/jouerezo/?probe=<aléa>"` — clé sonde aléatoire d'abord, jamais la clé réelle avant d'avoir vu le build.

## Règles tenues

- Le R-290 est A3, jamais A2L. Les PRP sont les valeurs indicatives des planches (AR4) ; la fiche du fluide fait foi.
- Aucun chiffre réglementaire inventé : pas de seuil, pas de durée, pas de pression cible.
- La banque du test d'accueil MFER (`test-accueil-mfer/banque.json`) n'est **pas** utilisée : elle attend la validation de Franck (chat 5).
- Pas de thème sombre, pas d'animation conditionnée au réglage du système, aucune dépendance externe.

## Suite possible (décisions de Franck)

- Entrée depuis l'accueil et le quartier 3D (il a dit « pas tout de suite »).
- Rattacher le code de partie à HAL Claw.
- Un mini-jeu par ligne de CartoClim (prévu dans sa v2) : JouéRézo peut les héberger.
- Illustration d'accueil par Codex quand le quota est revenu (samedi 03/10 au soir).

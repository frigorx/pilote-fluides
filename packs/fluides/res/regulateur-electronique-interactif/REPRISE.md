# REPRISE — Le régulateur électronique (station publiable)

**Construite le 19/08/2026.** Origine : `C:\git\regulfroid-simulateur` (Régul'Froid,
dépôt privé, React/Vite) — 🔴 non publiable en l'état : notice constructeur Danfoss
redistribuée dans `sources/documents/`, quatre photos sans droits, le tout présent
dans l'historique git des deux commits.

## Ce que Franck a décidé (19/08/2026)

1. **Les marques restent citées.** MR51+, EKC 202, MasterCella MD33 : usage
   descriptif, trois constructeurs concurrents, aucune promotion. Ce n'est pas la
   citation qui posait problème, c'est la redistribution de documents.
2. **Tous les visuels sont redessinés** — SVG et HTML/CSS écrits ici, aucune photo,
   aucun extrait de notice.
3. **Mention de bonne foi** sur la page d'accueil : pédagogique, non commercial,
   aucune affiliation, retrait immédiat sur demande d'un ayant droit.
4. **Logo inerWeb** (pas le lycée).
5. **Portage dans pilote-fluides** au gabarit du pack, ligne 🎛 CE QUI SE RÈGLE.
6. **Dépôt privé `regulfroid-simulateur` laissé intact** : il reste la version de
   classe, avec sa notice. Rien n'y a été supprimé, donc rien n'est perdu.

## ✅ Fait

| Palier | Contenu | État |
|---|---|---|
| 1 | Socle + dossier **Comprendre** (8 écrans) : chaîne, commande ≠ protection, laboratoire des sondes, type de sonde, cycle et mémoire, courts-cycles, correction d'affichage, contrôle | fait |
| 2 | **Programmer** (5 écrans) : cinq gestes, trois façades (touches nommées · trois touches · code d'accès), « modifier n'est pas enregistrer » | fait |
| 3 | **Dégivrer** (4 écrans) : le givre isole, cinq temps, qui arrête le cycle, trois départs | fait |
| 4 | **Câbler** (4 écrans) : départ protégé Q1, atelier de câblage 8 fils, câble de sonde, remplacement par fonction | fait |
| 5 | **Contrôler** (3 écrans) : mission chambre négative, contrôle final, bilan | fait |
| — | Documentation : LIRE-MOI, STORYBOARD, SOURCES-TECHNIQUES, SOURCES-IMAGES, couverture.json | fait |
| — | Feuille d'impression écrite pour ce gabarit (le livre imprimable sort réellement) | fait |

**Vérifié dans le navigateur** (serveur local, 19/08) : 24 écrans rendus sans
erreur console ; sondes justes aux points nominaux (NTC 10 000 Ω à 25 °C, PTC 990 Ω
à 25 °C, Pt1000 1 000 Ω à 0 °C et 1 385 Ω à 100 °C, valeur normative) ; hystérésis
avec mémoire d'état vérifiée dans les deux sens ; les trois façades parcourues
touche par touche ; piège de l'enregistrement confirmé (4/4 justes mais non
enregistré → l'écran le dit) ; câblage complet validé et inversion phase/neutre
refusée avec son explication ; plan de remplacement noté ; aucun débordement sur
1280 px **ni** sur 375 px ; badge référentiel et ligne de marque affichés.

## ✅ En ligne depuis le 19/08/2026

Feu vert de F. Henninot le jour même. Poussé et **vérifié sur le site servi**, pas
seulement sur le dépôt :

- https://inerweb.fr/packs/fluides/res/regulateur-electronique-interactif/ répond, les
  24 écrans se parcourent sans erreur, badge référentiel et ligne de marque affichés ;
- la station est sur le plan, dans la liste du réseau et dans le JSON-LD — l'ajout se
  fait dans le bloc `DONNEES-PLAN` d'`index.html`, puis `node build/plan-liste.mjs`
  régénère la liste et le JSON-LD (**la liste ne s'édite jamais à la main**) ;
- la ligne 🎛 CE QUI SE RÈGLE compte 5 stations, le régulateur entre le pupitre de
  réglage et les pressostats.

**Journal des mises à jour** (demandé le même jour) : bloc `#nouveautes` sur l'accueil,
replié par défaut, entre le mot de l'auteur et le plan. Nouveautés **et** corrections,
par date, étiquetées, la plus récente en haut, rien ne se supprime. Le volet
« Actualités » ne duplique plus : il y renvoie par un lien qui ferme le volet et ouvre
vraiment le bloc. Pour la prochaine fois : une section `<h3>date</h3>` en haut du corps,
et la date du `<summary>` au même jour.

## ⚠️ Deux points à savoir

**Sessions parallèles.** Le 19/08 après-midi, une autre session travaillait sur
`pilote-fluides` (durcissement sécurité/SEO, commits de 15:42). Ce dossier est neuf,
donc sans collision — mais `index.html` du site est partagé : vérifier `git log` et
`git status` avant d'y toucher. **Tant que ces fichiers ne sont pas commités, un
`git add -A` d'une autre session les emporterait dans son commit.**

**Défaut de mise en page du gabarit.** Les items de grille valent `min-width:auto`
par défaut : la colonne de l'atelier prend sa largeur de contenu et sort de la
carte — la partie droite passe hors écran, masquée par `body{overflow:hidden}`.
Constaté aussi sur `pupitre-reglage-interactif` (colonne d'activité à 957 px dans
une carte de 1094 px, soit ~330 px hors champ). Corrigé **localement** ici
(`.lesson-card{grid-template-columns:minmax(0,1fr)}` + `min-width:0`), sans toucher
aux fichiers partagés. **Les autres stations du pack restent à vérifier** — c'est un
chantier à part, à ne pas mener pendant qu'une autre session travaille dessus.

## Codes du référentiel

- Enseigné : **9.04** (régler des thermostats mécaniques et électroniques),
  **6.03** (régler les interrupteurs de sécurité et de contrôle).
- Appui : **9.10** (efficacité énergétique).

Détail écran par écran : `couverture.json`.

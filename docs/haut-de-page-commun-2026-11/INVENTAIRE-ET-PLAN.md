# Un seul haut de page pour tout inerweb.fr : inventaire et plan

Relevé du 11/11/2026 sur `origin/main` (384f6b7c4). Aucune page modifiée. Atelier : `D:\git\_wt-entete`, branche `haut-de-page-commun`.

## 1. Ce que le relevé a montré

1. **Il existe déjà un mécanisme commun, plus large que `marque.js`** : `moteur/retour-accueil.js`, posé par `build/retour-accueil.mjs`. Il est présent sur **1 178 des 1 210 pages** HTML publiées (15 pages manquantes hors dossiers de travail, voir §5). Il dessine une fine barre « logo › réseau » en tête de page, seulement si la page n'a pas déjà un logo cliquable vers l'accueil et un lien visible vers son réseau. Masqué à l'impression et dans les cadres. La balise est idempotente, avec clé `?v=` renouvelée par le script de pose.
2. `marque.js` pose le pied de page, en fin de flux, sur environ 800 pages. Ses balises sont **relatives** (`../moteur/marque.js`), y compris dans `legislation/`, `sous-tension/` et `r408/`. Aucune adresse absolue `https://inerweb.fr/moteur/` n'est chargée en réalité. Seuls des liens de retour vers `https://inerweb.fr/` existent dans `legislation/` et `quartier/`. Le commentaire de `build/version.mjs` sur les « satellites en absolu » est donc périmé.
3. Les hauts de page propres des pages viennent de trois origines : écrits à la main dans le fichier (racine, plan, portes, reseaux, studio, livres, rezotools, quartier), répétés dans chaque fichier par un gabarit de réseau (`topbar` d'hydrométro, cartoclim, électrorezo ; `appbar` du bureau d'études et des cours ; `haut` de jouerezo et voyage), ou posés par `retour-accueil.js`. Aucun script de `build/` ne produit un menu commun.
4. **Anomalie** : `plan.html` et `portes.html` pointent vers `index.html#outils`, qui n'existe plus. Les ancres du menu cible existent toutes : `index.html#habilitation`, `index.html#enseignant`, `reseaux.html#reseaux`, `reseaux.html#outils`.

## 2. Inventaire par famille

« Fichiers » = pages HTML du dossier (hors `docs/`). « Haut de page » = ce que le fichier porte avant la barre de `retour-accueil.js`. Relevé par recherche de balises et lecture ciblée de la page d'entrée de chaque famille.

| Famille | Fichiers | Haut de page présent | Entrées et logo | Retour accueil | Origine |
|---|---|---|---|---|---|
| Racine : `index.html` | 1 | menu maison 4 entrées | logo vers `index.html` ; Cours, Habilitations, Outils, Enseignants | n'en a pas besoin | à la main |
| Racine : `reseaux.html`, `portes.html` | 2 | menu maison 7 entrées + YouTube | `index.html`, plan, galerie, outils, métier, formateurs, livres | logo | à la main |
| Racine : `plan.html`, `metier.html`, `formateurs.html`, `decouvrir.html` | 4 | menu maison 5 à 6 entrées | `index.html`, plan, galerie, `index.html#outils` (cassé), métier, formateurs | logo | à la main |
| Racine : autres (formateur, portail, matrice, planning, pratique, projection, seances, charte, documents, formation, partage, galerie, mentions, activer, demander-un-acces, comprendre-les-codes, dossier, hors-ligne, 404) | 19 | aucun menu | rien | barre `retour-accueil` (sauf `dossier.html`, `portes.html`, `index.html`) | posé par `moteur/` |
| `legislation/` | 74 | barre « Retour » de réseau (64), 9 pages sans | « Mon carnet », lien `https://inerweb.fr/`, lien HydroMétro | lien en dur vers l'accueil | à la main + gabarit |
| `hydrometro/` | 32 | `topbar` | maison du réseau | oui, par la barre | gabarit répété |
| `aerorezo/` | 38 | aucun (37), `topbar` (1) | rien | barre | posé par `moteur/` |
| `electrorezo/` | 80 | `topbar` (75), `entete-armoire`, `haut` | logo vers l'index du réseau | barre | gabarit répété |
| `cuivrezo/` | 28 | aucun (20), en-têtes divers (8) | variable | barre | à la main |
| `tour-de-main/` | 20 | aucun (17), `haut` (2), `entete` (1) | variable | barre | à la main |
| `cartoclim/` | 22 | `topbar` | maison du réseau | barre | gabarit répété |
| `hocourant/`, `r408/` | 1 + 3 | aucun | rien | barre (`r408` : 2 pages sans) | posé par `moteur/` |
| `habilitations/` | 1 | aucun | rien | barre | posé par `moteur/` |
| `livres/`, `studio/`, `rezotools/`, `quartier/` | 1 + 11 + 15 + 1 | barre « Retour » (`nav.haut`) | `../` (« ← inerweb.fr »), plan, Studio ou quartier ; `rezotools` : `nav#iw-nav` | oui | à la main |
| `jouerezo/`, `simurezo/` | 16 + 2 | `header#haut` (13), bandeau de simulateur (2) | logo vers le jeu | barre | à la main |
| `bureau-etudes/` | 119 | `appbar` (36), aucun (78) | barre d'application | barre (3 pages sans) | gabarit répété |
| `qcm/`, `mon-parcours/` | 4 + 2 | `header` | titre de page | barre (`mon-parcours/index.html` sans) | à la main |
| `cablage-virtuel/`, `aquiblue/`, `formarezo/`, `manirezo/` | 5 + 2 + 3 + 2 | `barre` ou `header` | variable | barre | à la main |
| `plan/` | 65 | `header` (33) | lien vers l'accueil | barre | gabarit répété |
| `voyage/` | 30 | `nav.haut` (14), `header#haut` (16) | retour ou titre de film | barre, plus bouton YouTube | à la main |
| `packs/fluides/res/…` (cours et stations, 107 dossiers) | 176 | `topbar` (53), `appbar` (34), `lesson-header` (7), aucun (65) | « Revenir… », logo vers l'accueil | barre (3 pages sans) | gabarit répété |
| `sous-tension/` | 6 | aucun | rien | barre | posé par `moteur/` |
| `f/`, `e/`, `h/`, `m/` (fiches courtes de QR : HabFluide, R408, gestes) | 220 + 28 + 29 + 129 | `header` court ou aucun | titre seul | barre | gabarit généré |
| `essais/`, `outils/`, `docs/` | 3 + 1 + 3 | variable | variable | non (`essais/`, `outils/`) | à la main |

Total relevé : 1 210 pages hors `docs/`. Les familles `f/ e/ h/ m/` (406 pages) sont des fiches très courtes (0,7 à 4 Ko) : relevé de surface seulement.

## 3. Deux voies comparées

**Voie A, script commun** (comme le pied de `marque.js`). Un script lit la page, pose le haut de page, et un attribut de balise l'active par famille. Il se pose et se retire d'une ligne ; il ne réécrit pas les fichiers ; une correction du menu se fait en un endroit.

**Voie B, insertion au build.** Le build écrit le menu en dur dans le HTML. Aucun JavaScript au chargement, mais : environ 1 000 fichiers réécrits à chaque changement de menu, des diffs énormes, des collisions avec les 12 gabarits de haut de page écrits à la main, et le menu absent des copies enregistrées avant la mise à jour.

**Conseil : la voie A, en étendant `moteur/retour-accueil.js` plutôt qu'en écrivant un troisième script.** Il couvre déjà 97 % des pages, sait se retirer quand la page a son propre haut de page, est masqué à l'impression, a un script de pose idempotent (`node build/retour-accueil.mjs`, avec `--verifier`), et connaît le réseau de chaque page. Les lots se pilotent par un attribut posé par ce script, par exemple `data-menu="commun"`. Tant que l'attribut manque, le comportement actuel est inchangé : le déploiement est réversible lot par lot.

Principe de dessin : le menu commun remplace la barre actuelle « logo › réseau » ; le réseau passe en seconde ligne fine (« Vous êtes dans : Hydrométro »). Aucune page ne reçoit deux menus : si la page garde son propre haut de page, le menu commun ne s'affiche pas, ou bien devient une ligne mince au-dessus (question 1).

## 4. Lots, du moins risqué au plus risqué

| Lot | Contenu | Fichiers | Risque |
|---|---|---|---|
| 0 | Réécrire le script et le tester sur une copie, sans rien poser. Corriger l'ancre `index.html#outils` de `plan.html` et `portes.html` (après fusion de la branche `libelles-clairs` pour `portes.html`). | 1 script, 2 pages | nul |
| 1 | Pages de la racine qui n'ont que la barre de retour : formateur, portail, matrice, planning, pratique, seances, charte, documents, formation, partage, comprendre-les-codes, activer, demander-un-acces, mentions | 14 | très faible |
| 2 | Petits espaces à barre « Retour » : `livres/`, `studio/` (hors films), `rezotools/`, `habilitations/`, `qcm/`, `simurezo/`, `cablage-virtuel/`, `aquiblue/` | environ 40 | faible |
| 3 | Pages d'entrée des neuf réseaux (`index.html` de chacun) et `mon-parcours/`, `galerie.html` après fusion de `libelles-clairs` | environ 12 | moyen |
| 4 | Pages à menu écrit à la main : `reseaux.html`, `plan.html`, `metier.html`, `formateurs.html`, `decouvrir.html`, `portes.html`. Même liste d'entrées, à la main, car elles gardent leur mise en page | 6 | moyen (7 entrées à ramener à 4 : voir question 2) |
| 5 | Stations des réseaux à `topbar` : `hydrometro/`, `cartoclim/`, `electrorezo/`, `cuivrezo/`, `tour-de-main/`, `aerorezo/`, `legislation/` | environ 290 | élevé |
| 6 | `bureau-etudes/`, `plan/`, `jouerezo/`, `sous-tension/`, `packs/fluides/res` hors cours à barre propre | environ 380 | élevé |

Le lot 5 est risqué parce que le `topbar` de chaque station porte ses boutons de leçon (voix, sons, étapes). Il est conseillé d'y poser la ligne mince seulement, jamais de remplacer le haut de page de la station.

### Pages à laisser telles quelles

- `quartier/` (maquette 3D plein écran) : une seule barre « ← inerweb.fr » déjà en place, tout ajout vole de la hauteur à la scène.
- `projection.html` et les diaporamas : pages à 100 dvh, la marque s'y range dans la diapositive ; un menu se retrouverait dans les captures.
- Films : `voyage/`, `studio/` (pages de films), `packs/fluides/res/**/films/` : lecteur plein cadre, la barre actuelle porte déjà « Voir sur YouTube ».
- Cours et stations qui ont leur propre `appbar` ou `lesson-header` (environ 90 pages de `packs/fluides/res`) : la barre est la leçon elle-même ; le logo y mène déjà à l'accueil.
- `404.html`, `hors-ligne.html` : doivent rester utilisables sans réseau, aucun lien hors page.
- `f/`, `e/`, `h/`, `m/` (fiches courtes de QR, 406 pages) : une fiche de 700 octets lue au téléphone n'a pas besoin d'un menu. À trancher (question 4).
- `essais/`, `outils/`, `docs/`, `.planning/` : non publiés comme contenu.

## 5. Contrôles à passer par lot

À lancer depuis `D:\`. Avant tout, `node build/retour-accueil.mjs --verifier` (15 pages manquantes aujourd'hui, 0 clé périmée).

1. Contrôle téléphone `C:/git/usine-contenu/outils/controle-telephone.cjs` sur un échantillon de chaque famille du lot : menu qui tient sur 360 px, aucun défilement horizontal, cibles tactiles d'au moins 44 px, menu qui ne recouvre ni titre ni bouton. 0 bloquant avant publication.
2. Liens : `node build/verifier-adresses.mjs`, plus un contrôle propre des quatre cibles du menu depuis une page à chaque profondeur (racine, `x/`, `x/y/`, `packs/fluides/res/z/`), la base relative étant calculée par le script.
3. Impression : la barre reste masquée (`@media print`), le pied de `marque.js` n'est pas déplacé.
4. Service worker et cache : renouvellement de la clé de `moteur/retour-accueil.js` par le script de pose, et cache du service worker avec `node build/version.mjs` au moment du codage (pas dans ce chantier).
5. Zoom « Aa » et son : le coin bas droit reste libre.
6. Aucune page n'a deux menus ni deux logos (recherche de `#inerweb-retour-accueil-barre` en plus d'un menu propre).
7. Pour chaque lot : un seul commit, sans `git push`, feu vert de Franck avant la mise en ligne.

## 6. Questions pour Franck

1. **Pages qui ont leur propre haut de page** (stations à `topbar`, cours à `appbar`) : le menu commun reste-t-il absent, ou s'affiche-t-il en ligne mince au-dessus ? Conseil : ligne mince sur les pages d'entrée de réseau, absent dans les leçons.
2. **Menu de la racine** : `reseaux.html`, `portes.html` et `plan.html` ont 5 à 7 entrées (plan, galerie, métier, formateurs, livres, YouTube). Elles passent à 4 entrées ? Où vont Plan, Galerie, Livres, Métier, Formateurs et YouTube : sous « Cours », sous « Enseignants », ou dans le pied de page ?
3. **Le réseau en cours** (« Réseau Législation »…) : garde-t-on le lien du réseau sur une seconde ligne ? Conseil : oui, discrète.
4. **Fiches courtes de QR** (`f/ e/ h/ m/`, 406 pages) : laissées nues, ou seulement le logo vers l'accueil ? Conseil : laissées telles quelles.
5. **Ordre** : commencer par les lots 1 et 2 (environ 55 pages sans risque) et attendre le retour de `libelles-clairs` pour `portes.html`, `galerie.html` et `mon-parcours/` ?
6. **Libellé « Outils »** : il mène à `reseaux.html#outils`. Même mot partout, y compris dans `rezotools/` ?

## 7. Lots 0 à 2 : fait le 11/11/2026

Décisions de Franck du 11/11 appliquées : quatre entrées partout (logo vers `index.html`, Cours `reseaux.html#reseaux`, Habilitations `index.html#habilitation`, Outils `reseaux.html#outils`, Enseignants `index.html#enseignant`), le réseau en cours sur une seconde ligne discrète, rien dans les leçons. Rien n'est publié.

**Lot 0, le script** (commits `c31443137`, puis `f48dd9264`). `moteur/retour-accueil.js` garde sa barre de retour telle quelle et sait poser, à la place, le menu commun quand la balise porte `data-menu="commun"`. `build/retour-accueil.mjs` pose cet attribut d'après deux listes, `MENU_COMMUN` (pages ou dossiers) et `SANS_MENU`. Le menu reprend la barre de `index.html` : fond `#fffdf8`, filet `#d6dee7`, logo figé 153 × 35, Trebuchet gras 16 px, au téléphone (760 px et moins) les quatre entrées sur une ligne pleine largeur à 14 px, cibles de 44 px. Dans le flux, jamais fixé ; masqué à l'impression et dans les cadres ; même identifiant que la barre de retour, donc jamais deux sur une page. Le dessin suit le plan, avec une correction : les classes du menu sont préfixées `iwm-`, parce que les calculettes RézoTools ont leur propre `.iw-nav` qui transformait les entrées en pastilles. Le script de pose renouvelle la clé `?v=` sur les 1 178 pages qui portent la balise (diff d'une ligne par page) : c'est son fonctionnement normal.

**Lot 1** (commit `1815e5b33`) : 13 pages de la racine. formateur, portail, matrice, planning, pratique, seances, charte, documents, formation, comprendre-les-codes, activer, demander-un-acces, mentions. Aucune barre maison à retirer : leurs en-têtes sont des titres de page.

**Lot 2** (commit de ce lot) : 23 pages. `livres/index.html`, `studio/index.html`, `rezotools/` (index et 14 calculettes), `qcm/` (4), `simurezo/` (2). Barre « Retour » (`nav.haut`) retirée de `livres/`, `studio/` et `rezotools/` : ses trois liens (« ← inerweb.fr », Plan des réseaux, Studio ou Quartier) sont tous ouverts depuis « Cours » (`reseaux.html`). La barre de navigation entre calculettes reste sous le menu.

**Pages sorties des lots** (elles gardent la barre de retour actuelle) :

| Page | Pourquoi |
|---|---|
| `partage.html` | affiche centrée par un corps en flex : le menu se range à côté de l'affiche |
| `habilitations/index.html` | diaporama calé à la hauteur de l'écran avec la barre de 34 px ; le menu (57 px) fait déborder chaque diapositive |
| `cablage-virtuel/index.html`, `professeur.html` | leur barre porte déjà « ‹ inerweb.fr » ou « Accueil inerweb.fr » : doublon avec le logo |
| `cablage-virtuel/jouer.html` | l'exercice lui-même (règle des leçons) |
| `cablage-virtuel/film.html` | un film (lecteur plein cadre) |
| `cablage-virtuel/documents-professeur.html` | marcherait seule, mais la famille resterait mêlée : à traiter avec le reste de `cablage-virtuel/` |
| `aquiblue/index.html`, `espace-prof.html` | leur en-tête porte déjà le logo inerWeb : deux logos l'un sous l'autre |

**Contrôles passés** (atelier servi sur le port 8793) :

1. Au navigateur, en 1 366 px et en 375 px : les 36 pages posées, une à une (menu sur une ligne, dernière entrée à 359 px sur 375, liens de 44 px, texte de 14 px au moins, aucun élément fixé par-dessus, aucun second logo, aucun débordement ajouté ; les débordements de `matrice`, `planning` et `comprendre-les-codes` existent déjà en ligne).
2. Les quatre entrées depuis `rezotools/calculettes/cop.html` (profondeur 2) : adresses justes, pages en 200, ancres présentes ; « Habilitations » ouvre bien l'écran `#habilitation` de l'accueil.
3. `node build/retour-accueil.mjs --verifier` : 0 clé périmée, 15 pages sans balise comme sur `main` (le script de pose les poserait, dont `index.html` et `portes.html` : remis à leur état d'origine après chaque pose).
4. Contrôle téléphone (`controle-telephone.cjs`) sur mentions, portail, formation, livres, studio, rezotools, une calculette, qcm/positionnement, simurezo : aucun bloquant. Deux « à revoir » sans lien avec le menu : étiquettes de 11 px des affiches du Studio, schéma de SimuRézo trop petit au téléphone.
5. Pages hors lots identiques au site en ligne (barre, hauteur de page) : une station d'HydroMétro, une station d'AéroRézo, `plan.html`, `legislation/index.html`.

**À regarder avant publication** : l'en-tête au téléphone fait 91 px (135 px avec la ligne du réseau), contre 34 px pour l'ancienne barre ; lancer `node build/version.mjs` au moment de publier (clé du service worker).

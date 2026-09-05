# Carte du code — l'éclatement du thermo-techno en réseaux

> Relevé le **05/09/2026** (soir) par Claude (Fable 5.1), à la reprise du chantier suivant décidé
> par F. Henninot dans `docs/porte-entree-2026-09/PROPOSITION.md` (§ 4, § 5, § 7). Tout ce qui suit
> est lu dans les fichiers, avec les numéros de ligne du jour (commit `87709416`). Rien n'est modifié.
> Ce fichier évite de repayer vingt lectures à la session suivante ; il se périme dès que
> `index.html` bouge — vérifier les lignes avant de s'en servir.

## 1. Où vivent les données du plan

- `index.html`, ligne 1261 : un `<script>` ouvre une fonction anonyme (`(function () { "use strict";`)
  qui contient **à la fois** le bloc de données `/* DONNEES-PLAN — DEBUT */ … /* DONNEES-PLAN — FIN */`
  (lignes 1274-1645, 372 lignes) **et** le moteur de carte (1646-2415). Même portée : le moteur lit les
  constantes directement.
- Les constantes du bloc, dans l'ordre : `RES` (1276), `OUTILLAGE` (1297), `SUPPORTS` (1306),
  `TRONC` (1320 : `stations` + `queue` + `jalon`), `LIGNES` (1346 : les cinq branches `organes`,
  `reglages`, `liquide`, `gestes`, `fluides`, chacune avec son abscisse `x` **écrite dans la donnée**
  et parfois `depart_y`), `HUILE` (1455, 4 stations), `HUILE_CIRCUIT` (1473, 13 stations + une
  escale `co2-r744` en dernier), `CO2` (1506, des escales d'un même fichier `co2-r744/index.html?e=…`
  avec un `id` propre `co2-<slug>`), `CENTRALES` (1527), `REGULES` (1548), `CEINTURE` (1568, slug
  `evaluer`), `OUTILS` (1590), `ELECTROTECH` (1610), `CORRESPONDANCES` (1631).
- Les fabriques `cours()`, `carte()`, `page()`, `outil()`, `corr()`, `escale()` et les préfixes
  `RES`, `OUTILLAGE` ne servent **que dans le bloc** : zéro occurrence dans le moteur.
- Le moteur consomme douze objets : `SUPPORTS`, `TRONC`, `LIGNES`, `HUILE`, `HUILE_CIRCUIT`, `CO2`,
  `CENTRALES`, `REGULES`, `CEINTURE`, `OUTILS`, `ELECTROTECH`, `CORRESPONDANCES`.
- Le commentaire d'en-tête (1262-1270) dit l'intention d'origine : « à terme, ce bloc de données a
  vocation à être généré par le build depuis le registre des cours ». Il n'a jamais été fait.

## 2. Qui lit le bloc

| Lecteur | Comment | À retenir |
|---|---|---|
| Le moteur de carte | même fonction, mêmes noms | il faudra lui donner les noms depuis le module |
| `build/plan-liste.mjs` | regex sur les sentinelles puis `new Function(...)` ; écrit LISTE-PLAN et JSON-LD dans `index.html` | référence du 05/09 : « 15 lignes, 108 stations » ; idempotent (vérifié) |
| `build/registre.mjs` | ligne 83 `MOTIF` (`res/<nom>/index.html`) et ligne 105 regex `cours("<nom>")` sur **tout** `index.html` → « visible depuis le plan d'accueil » | tourne **avant** `plan-liste` dans `build.mjs` (493 puis 500) : sans la regex `cours(` sur le module, un cours ajouté au plan ne serait vu qu'au build suivant |
| `build/chiffres.mjs`, `build/sitemap.mjs` | ne lisent pas le bloc | rien à faire |

`registre.mjs` n'est pas idempotent : il réécrit les poids en Ko de chaque cours (bruit dans
`REGISTRE-COURS-INTERACTIFS.md`, 47 lignes le 05/09). À ignorer dans les diffs, ou restaurer.

## 3. Qui écrit dans le bloc — depuis un autre dépôt

- `C:\git\atelier-animations\outils\ordonner-ligne.js` (ligne 9 : `PLAN = "C:/git/pilote-fluides/index.html"` ;
  partie 3, lignes 120-129) réécrit `stations: [ … ]` de `var HUILE = {` dans `index.html`.
  ⚠️ **Il est désynchronisé du plan** : il liste les 17 stations de la rame entière, alors que le
  plan a coupé la ligne le 20/08 en `HUILE` (4) + `HUILE_CIRCUIT` (13). Le relancer écraserait
  `HUILE` avec 17 stations et doublerait les 13 du circuit. Dernier commit de l'outil : `02bf9a0`.
  Après la sortie des données d'`index.html`, il échouera **proprement** (« stations de la branche
  introuvables ») au lieu d'écrire faux : c'est mieux qu'aujourd'hui. À signaler dans le REPRISE.
- `copier-ligne-vers-pack.mjs` et `copier-ligne-regules-vers-pack.mjs` écrivent dans
  `packs/fluides/res/` (les modules), pas dans le bloc. Ils posent les liens de retour
  `../../../../index.html#ligne=huile` et `#ligne=regules` : **les slugs de ligne sont des adresses
  publiques**, gravées dans des pages servies.

## 4. Le moteur de carte (1646-2415) : ce qu'il sait faire, ce qu'il ne sait pas

- Géométrie : `W = 1310`, `H = 2900`. Les bandes du bas sont à des ordonnées **codées en dur**
  (1684-1686 : `CEINTURE_Y 1160`, `HUILE_Y 1370`, `HUILE_CIRCUIT_Y 1590`, `CO2_Y 1810`,
  `CENTRALES_Y 2030`, `REGULES_Y 2250`, `OUTILS_Y 2460`, `ELECTROTECH_Y 2620`, `CORR_Y 2780`),
  précédées d'un commentaire qui raconte chaque décalage depuis le 20/08.
- `dessiner()` (1799-2076) : 64 lignes citent une branche nommée ou une ordonnée fixe. Chaque bande
  a **son propre bloc de dessin** : l'huile naît du compresseur, le CO₂ part de « Classes de
  sécurité », les centrales prolongent la ligne du fluide, la régulation est une bande autonome,
  l'électrotech reprend le dessin de la boîte à outils. Seules les cinq branches de `LIGNES` sont
  dessinées en boucle (1843-1867). **Ce moteur n'est pas filtrable par réseau** : le sortir tel quel
  dans un fichier ne le rendrait pas générique ; le rendre générique est une refonte du placement.
- `dessinerLigne(slug)` (2120) et `rendre()` (2152) : la vue d'**une** ligne, en HTML (liste
  verticale), pilotée par `#ligne=<slug>` ; `VUES` (2103-2109) = `LIGNES` + `CEINTURE`, `OUTILS`,
  `ELECTROTECH`, `CO2`, `CENTRALES`. C'est le germe d'une « page filtrée » : il existe déjà.
  ⚠️ Ni `huile`, ni `huile-circuit`, ni `regules` n'y sont : les liens de retour gravés par
  l'atelier (`#ligne=huile`, `#ligne=regules`, § 3) tombent sur `dessiner()` et montrent **tout le
  plan** au lieu de la ligne promise. Défaut existant, hors périmètre de la phase 1 — à signaler.
- La recherche (2243-2415) indexe `TOUTES` (2077-2083 : tout sauf `CORRESPONDANCES`) ; le compteur
  de trajet compte les cours **uniques** : 86 pour 108 arrêts.

## 5. La chaîne de fabrication

- `build/build.mjs` enchaîne : … `registre.mjs` (493) → `plan-liste.mjs` (500) → `sitemap` →
  `annuaire-f` → `verifier-adresses` → `audit-conformite` → `parcours` → `relecture` → `chiffres` →
  `version.mjs` (559, **en dernier**).
- `build/version.mjs` : `FICHIERS_VERSIONNES` (28-52) est la liste **explicite** des fichiers qui
  reçoivent `?v=<hash>` ; `PAGES` (57-93) les pages traitées (`index.html` en tête).
- `build/lib-version.mjs` : le hash couvre `FICHIERS_SOURCES` (38-75, liste **explicite** des fichiers
  de moteur et de contenu), **toutes les pages `.html` de la racine** (`pagesRacine()`, 88-92 — c'est
  par là qu'`index.html` est couvert depuis le 20/08, « le plan de formation ne vit dans aucun fichier
  de moteur ») et les `livraison.txt` des réseaux. Un fichier de données sorti d'`index.html` vers
  `moteur/` n'est couvert **que s'il entre dans `FICHIERS_SOURCES`** ; sinon l'angle mort du 20/08
  revient : le visiteur garderait l'ancien plan en cache.
- `sw.js` : le socle précache `/`, `/index.html`, `/formation.html`, `/hors-ligne.html`, le favicon
  et le manifeste ; tout le reste entre au cache **à l'usage**. `VERSION` y est réécrite par
  `version.mjs`. Un module chargé par l'accueil entre donc au cache dès le premier affichage en ligne.
- `outils/controle-syntaxe.mjs` compile tous les `<script>` inline de 520 pages (référence du 05/09 :
  une seule erreur, antérieure, `document-eleve-compresseur.html`).
- Publication : `outils/publier-le-site.bat` = `git push origin main`, attente de deux minutes,
  `curl` de contrôle. Le site est servi par GitHub Pages (`CNAME`) derrière Cloudflare (`f621fd02`).

## 6. Les quatre autres réseaux — pour la navigation commune (condition 2 du § 4)

| Réseau | Page | Moteur | Liens vers les autres réseaux |
|---|---|---|---|
| HydroMétro | `hydrometro/index.html` (236 l.) | propre : `app.js`, `programme.js`, `modules.js` | nav « Correspondance » : 2 liens **absolus** (`https://inerweb.fr/`, `…/legislation/`) |
| AéroRézo | `aerorezo/index.html` (153 l.) | propre : `carte.js` | `../` et `../hydrometro/` |
| ÉlectroRézo | `electrorezo/index.html` (226 l.) | SVG statique `carte-reseau.svg` | `../`, `../hydrometro/`, `../aerorezo/`, `../legislation/`, en pied de page |
| Législation | `legislation/index.html` (508 l.) | script inline 257-500, modèle « réseau de réseaux » (`RESEAU` 274, `tete`, `mere`, `stationPrep`, `stationOuverte`) : un moteur **dérivé** (mêmes `esc`, `flux`, `jalon`), pas une copie | 2 liens **absolus** + 5 autres adresses absolues (favicon, trois cours) |

Aucune des quatre pages ne montre les cinq réseaux ; aucune n'est cohérente avec l'autre. La seule
liste complète est l'organigramme de l'accueil (`index.html` ≈ 546-620 : `.orga#reseaux`, cartes
`.r-grille a` avec la couleur en `--c`, `.r-nom`, `.r-det`, `.r-etat`).

## 7. Conventions du dépôt à respecter

- Dossiers de chantier : `docs/<chantier>-<AAAA-MM>/` (`durcissement-2026-08` avec son `task_plan.md`,
  `porte-entree-2026-09` avec PROPOSITION, BRIEF, maquette) ; il existe aussi trois plans dans
  `.planning/<AAAA-MM-JJ>-<slug>/`. Ce chantier vit dans `docs/reseaux-2026-09/`, à côté de son parent.
- Un brief d'exécution = règles absolues, repères de lignes, changements numérotés, contrôles,
  rapport (modèle : `docs/porte-entree-2026-09/BRIEF-EXECUTION.md`).
- Les commentaires du code portent le **pourquoi**, datés, avec l'auteur de la décision.
- Pas de commit sans `git log --oneline -5` et `git status` ; jamais de push sans feu vert.

## 8. Mesures de référence (avant tout changement, 05/09 à 18:50)

- `node build/plan-liste.mjs` → « 15 lignes, 108 stations en liste HTML + JSON-LD », dépôt inchangé.
- `node build/registre.mjs` → « 74 cours, 99 codes couverts » ; « 43 descriptions relevées pour le plan ».
- Instantané JSON des douze groupes de données (script `instantane-donnees.mjs` du bloc-notes de
  session, mode `index`) : **108 arrêts, 12 groupes, 23 781 caractères** → `donnees-avant.json`.
- Rendu servi en local (`node` sur le port 8765, fenêtre 1280 × 1000, profil vierge) :

| Mesure | Valeur |
|---|---|
| `#plan-svg` (le plan) | 62 414 caractères, empreinte djb2 `a74876ef`, 121 `<a`, SVG |
| `#ligne=organes` (vue d'une ligne) | 3 468 caractères, empreinte `88161509`, 7 `<a`, HTML |
| `#ligne=huile`, `#ligne=co2`, `#carte` | identiques au plan (62 414 / `a74876ef`) |
| Compteur de trajet | « 0 / 86 » |
| Recherche « huile » | « 17 cours trouvés, les 8 premiers sont proposés » ; 16 éléments dans `#q-res` |
| Liste en accordéon `#liste-cours` | 15 `<details>` |
| `<script src>` de la page | 4 : `plan-descriptions.gen.js`, `moteur/lisibilite.js`, `chiffres.gen.js`, `moteur/marque.js` |
| Console | deux `log` « chiffres injectés : 5 », aucune erreur |

Deux défauts **existants**, relevés par la mesure, hors périmètre de la phase 1 :
- `#ligne=co2` montre tout le plan : la regex de `rendre()` (2153, `/^#ligne=([a-z-]+)$/`) refuse le
  chiffre de « co2 ». Le cartouche cliquable de la ligne CO₂ (dessiné en 1843-1867 pour les
  branches ; à vérifier pour la bande CO₂) promet donc une vue qu'il ne donne pas.
- `#ligne=huile` et `#ligne=regules` montrent tout le plan (§ 4 : pas dans `VUES`).

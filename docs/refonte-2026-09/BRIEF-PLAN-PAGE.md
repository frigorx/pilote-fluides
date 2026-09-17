# Brief d'exécution — le plan du réseau thermo-techno quitte l'accueil pour `plan.html`

> Chantier « accueil, effet waouh » du 17/09/2026 (carte blanche de F. Henninot). Branche
> `accueil-2026-09-17` de `C:\git\pilote-fluides`. **Ne rien pousser, ne rien commiter** : Fable relit le
> diff et commite. Tu ne touches PAS à `index.html` (Fable le refait en parallèle) ni à `moteur/plan-donnees.js`.
> Dépôt en CRLF avec des blocs générés en LF : édite avec **node** (lecture, remplacement de chaîne,
> écriture), jamais `sed -i`. Aucune conversion de fins de ligne.

## 1. Ce qui existe

- `plan.html` est **déjà une copie exacte** d'`index.html` (faite par Fable le 17/09 à 19:40). C'est ton point de départ.
- Dans cette copie, les blocs (numéros de ligne d'`index.html` du 17/09) :
  - 24-26 : JSON-LD entre `<!-- JSON-LD DEBUT -->` / `<!-- JSON-LD FIN -->` (généré par `build/plan-liste.mjs`)
  - 27-434 : la feuille de style, dans `<style>`
  - 435-486 : le volet « Infos » (`<aside class="volet" id="volet">` … `<button class="volet-poignee">`)
  - 488-511 : l'en-tête et la barre `nav` (Accueil · Catalogue · Outils · Le métier · Formateurs)
  - 513 : `<div class="page" role="main" id="contenu">`
  - 515-538 : l'accroche (pastille, h1, chapô, boutons, flocon)
  - 540-668 : l'organigramme `<div class="orga" id="reseaux">`
  - 669-693 : « Par où commencer ? » (`h2.portes-titre` + `div.portes`)
  - 694-726 : `details.mot-auteur` · 727-797 : `details.nouveautes`
  - 798-840 : **le plan** `<div class="bloc plan" id="carte">` (recherche `#chercher` / `#q`, légende, `#plan-svg`, « Fais glisser »)
  - 841-928 : `section.bloc.outils#outils`
  - 929-1120 : **le réseau en liste** `section#liste-cours` avec les sentinelles `LISTE-PLAN DEBUT/FIN`
  - 1121-1223 : **« Entrer par le circuit »** (`div.surtitre` + `div.bloc.circuit`)
  - 1224-~1259 : les tuiles de pied `div.tuiles`
  - 1260-1261 : `plan-descriptions.gen.js`, `moteur/plan-donnees.js`
  - 1262-2053 : **le moteur de carte** (un `<script>` : dessin, vues de ligne `#ligne=`, recherche)
  - 2057-2075 : un second `<script>` (à lire : garder s'il sert le plan)
  - 2078-2089 : `lisibilite.js`, `chiffres.gen.js`, `marque.js`, petit script final
- Chaîne de construction qui cite `index.html` et doit viser `plan.html` : `build/plan-liste.mjs` (l. 23 `CHEMIN`),
  `build/registre.mjs` (l. 102 : lit l'accueil pour « visible depuis le plan d'accueil »), `build/sitemap.mjs`
  (liste `INDEXEES`), `build/version.mjs` (liste `PAGES`, l. 63), `sw.js` (`SOCLE`, l. 39).
- Mesure de référence du rendu du plan (Fable, 17/09, sur `index.html` servi en local, service worker bloqué) :
  `docs/refonte-2026-09/mesures/reference-plan-index.json` → SVG de **62 414** caractères, **121** liens,
  empreinte `b4873d55`, recherche « huile » → **17** cours. Script : `docs/refonte-2026-09/outils/reference-plan.mjs`
  (`node docs/refonte-2026-09/outils/reference-plan.mjs plan.html <sortie.json>` ; serveur local déjà lancé sur
  http://localhost:8791).

## 2. Ce que doit devenir `plan.html`

**La page du réseau thermo-techno** : la barre, un titre court, le plan avec sa recherche, le réseau en liste, le
circuit cliquable, les tuiles, les scripts du plan. Rien d'autre.

1. `<head>` : `<title>Le plan du réseau thermo-techno — inerWeb Édu</title>` ; meta description : « Le plan de
   formation inerWeb Édu : les cours interactifs du froid sur une carte de métro — le tronc, les organes, les gestes,
   les fluides, la régulation, l'huile, le CO₂. Gratuit, sans compte. » ; `canonical`, `og:url` → `https://inerweb.fr/plan.html` ;
   `og:title` = le titre. Garde les sentinelles JSON-LD (le bloc sera régénéré par `plan-liste.mjs`).
2. Supprime : le volet « Infos » (435-486, aside + poignée), l'accroche (515-538), l'organigramme (540-668),
   « Par où commencer » (669-693), le mot de l'auteur (694-726), les nouveautés (727-797), la section Outils (841-928).
   Supprime aussi le CSS **exclusivement** lié à ce que tu retires si sa section est clairement délimitée par un
   commentaire (volet 336-378, organigramme 85-122, accroche 45-62, portes 379-…) — sinon laisse ; ne touche à aucune
   règle partagée (`.bloc`, `.titre-bloc`, `.entete`, `.nav`, `.tuiles`, `.page`).
3. Barre : la même, avec une entrée **« Le plan »** active : `<a class="ici" href="plan.html">Le plan</a>` en deuxième
   position, après `<a href="index.html">Accueil</a>` (sans `class="ici"`) ; `#outils` devient `index.html#outils`.
4. À la place de l'accroche, un en-tête sobre dans `.page` : `<div class="accroche"><div class="texte"><div class="pastille">LE RÉSEAU THERMO-TECHNO</div><h1>Le plan de formation, <em>station par station</em>.</h1><p class="chapo">Le métier de frigoriste sur une carte de métro : un tronc commun, puis les organes, les gestes, les fluides, la régulation, l'huile et le CO₂. Cliquez une station pour ouvrir son cours ; cliquez un cartouche de ligne pour la voir en liste.</p></div></div>`
   (si tu as retiré le CSS de l'accroche, garde plutôt ces règles : elles servent ici).
5. Le plan, le réseau en liste, le circuit, les tuiles : **inchangés** (déplacés, pas retapés). Corrige seulement le
   tutoiement l. 829 : « ↔ Faites glisser la carte pour tout voir ».
6. Dans le moteur de carte : au chargement, si `location.hash` commence par `#q=`, remplir `#q` avec la valeur
   décodée (`decodeURIComponent`), ouvrir `#chercher` (retirer `hidden`) et déclencher la recherche comme le fait la
   saisie (regarde l'écouteur existant sur `#q` : réutilise sa fonction, ne la duplique pas). Les liens `#ligne=…`
   doivent continuer de rendre la vue de ligne (ils marchent aujourd'hui : ne casse rien).
7. Chaîne : `plan-liste.mjs` → `CHEMIN = resolve(RACINE, "plan.html")` et l'en-tête du fichier mis à jour (SORTIE) ;
   `registre.mjs` l. 102 → lit `plan.html` (renomme la variable si `accueil` devient trompeur, commentaire daté 17/09) ;
   `sitemap.mjs` → ajoute `{ fichier: "plan.html", url: "https://inerweb.fr/plan.html" }` après l'accueil ;
   `version.mjs` → ajoute `"plan.html"` dans `PAGES` juste après `"index.html"` ; `sw.js` → ajoute `"/plan.html"` dans
   `SOCLE` après `"/index.html"` (commentaire : le plan a sa page depuis le 17/09).
8. `metier.html` et `formateurs.html` : dans leur barre `nav`, ajoute `<a href="plan.html">Le plan</a>` après « Accueil ».
   Ne touche à rien d'autre dans ces pages.

## 3. Contrôles à lancer, dans l'ordre, et à rapporter avec leurs chiffres

1. `node outils/controle-syntaxe.mjs` → 522 pages (une de plus), **1 seule erreur, antérieure** (`document-eleve-compresseur.html`).
2. `node build/plan-liste.mjs` deux fois → « 15 lignes, 108 stations » ; `md5sum plan.html` identique entre les deux
   passes (idempotent) ; `git diff --stat index.html` **vide** (il n'écrit plus dans l'accueil).
3. `node build/registre.mjs` → 74 cours, même nombre de « plan d'accueil » qu'avant (compare avec
   `git stash`-free : lance-le AVANT tes modifications pour avoir la référence, note le chiffre, puis après).
   Le diff de `REGISTRE-COURS-INTERACTIFS.md` ne doit porter que des poids en Ko (bruit connu).
4. `node docs/refonte-2026-09/outils/reference-plan.mjs plan.html docs/refonte-2026-09/mesures/reference-plan-plan.json`
   → 62 414 caractères, 121 liens, empreinte `b4873d55`, « huile » → 17. Identique ou explique chaque écart.
5. Playwright (même modèle, canal Chrome, service worker bloqué) : `plan.html#ligne=regules` rend la vue de ligne
   (titre « LA RÉGULATION », 13 liens) ; `plan.html#q=huile` ouvre la recherche remplie avec 17 cours ; console sans
   erreur nouvelle ; à 375 px aucun débordement horizontal (`document.documentElement.scrollWidth <= innerWidth`).
6. `node build/sitemap.mjs` → `sitemap.xml` contient `https://inerweb.fr/plan.html` ; ne lance PAS `build/version.mjs`
   ni `build/build.mjs` (Fable le fera une fois, à la fin).
7. `git status --short` et `git diff --stat` : la liste des fichiers touchés doit être exactement : `plan.html`,
   `build/plan-liste.mjs`, `build/registre.mjs`, `build/sitemap.mjs`, `build/version.mjs`, `sw.js`, `sitemap.xml`,
   `metier.html`, `formateurs.html`, `REGISTRE-COURS-INTERACTIFS.md` (bruit). Rien d'autre.

## 4. Rapport attendu (dans ta réponse finale, données brutes)

Pour chaque contrôle : la commande, le chiffre obtenu, l'écart éventuel. La liste des fichiers modifiés avec le nombre
de lignes ajoutées/retirées. Ce que tu n'as pas pu faire et pourquoi. Aucun commit, aucun push.

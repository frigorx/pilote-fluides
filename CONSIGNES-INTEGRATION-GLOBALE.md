# Consignes pour l'intégration globale

> Écrites le 23/08/2026 à la demande de F. Henninot, qui prépare **une refonte
> globale déployée en une seule action**. Destinataire : le **chat global** qui
> mènera cette intégration.
>
> **Le principe, et il commande tout le reste : le jour J, on n'invente rien.**
> Ce qui demande une DÉCISION est tranché avant. Ce qui demande une FABRICATION
> est fini avant. Le jour J n'est qu'une séquence de vérifications suivie d'un
> déploiement. Un seul déploiement qui échoue à moitié coûte plus cher que dix
> petits — d'où cette préparation.

## Point de départ vérifié le 23/08/2026 (matin)

| Fait | État |
|---|---|
| `pilote-fluides` : HEAD = origin/main | `c29f441` — **rien en attente de push** |
| `https://inerweb.fr/` | servi, 200 |
| `https://inerweb.fr/legislation/` | servi, 200 — **le réseau Législation est EN LIGNE** |
| `https://inerweb.fr/legislation/stations/fgaz-3/` | servi, 200 |
| Réseau Législation | 2 lignes mères · 11 sous-lignes · **57 stations**, dont **1 seule ouverte** (F-Gaz 3) |
| Fichiers modifiés non commités | 19 pages + `sw.js` — **résidus de build** d'une session parallèle |

⚠️ Ce tableau est daté. **Le refaire au début du jour J** : la vérité est le
disque et le site servi, jamais ce document.

## 0. La décision de structure : inerWeb devient un ensemble de RÉSEAUX

**Prise par F. Henninot le 23/08/2026, et elle commande la refonte.** On n'étoffe
plus des lignes : on crée des **réseaux entiers**. Trois existent déjà ou sont en
route — le réseau **thermo-techno** (le plan historique d'inerweb.fr), le réseau
**Législation**, le réseau **hydraulique** (en cours de fabrication) — et il faut
tabler sur **cinq à sept** à terme.

**Ce que ça impose à l'accueil** : une **gare des réseaux**, posée **AU-DESSUS du
plan**, avant la ligne générale — c'est-à-dire avant le DÉPART actuel. Elle ne
mène pas à un cours : elle **aiguille vers un autre réseau**. C'est la première
chose que voit un visiteur, et c'est ce qui rend l'ensemble extensible sans jamais
retoucher les plans existants.

Règles à tenir en la construisant :

- **Une entrée par réseau**, avec son nom, sa couleur propre et une phrase qui dit
  à qui il s'adresse — jamais une liste de liens nus.
- Un réseau **en construction se déclare comme tel** (la Législation n'a qu'une
  station ouverte sur 57) : promettre un réseau vide use la confiance.
- **Aucun réseau ne dépend d'un autre pour fonctionner.** Chaque satellite reste
  déplaçable d'un bloc vers son propre dépôt ou sous-domaine — c'est déjà le
  contrat de `legislation/`, il vaut pour tous les suivants.
- La gare vit dans `index.html` du site principal, **le fichier le plus disputé
  entre sessions parallèles** : elle se pose pendant l'intégration globale, par la
  session qui pilote, et par personne d'autre.
- Prévoir la place de **sept réseaux** dès le dessin, pas de trois : ajouter le
  quatrième ne doit pas obliger à tout redessiner.

## 1. Les décisions qui doivent être tranchées AVANT

Aucune ne peut se prendre pendant le déploiement. Elles sont **toutes** de
F. Henninot ; le chat global doit les lui présenter en une fois, pas au fil de
l'eau.

- [ ] **En-têtes de sécurité** (CSP, HSTS, X-Content-Type-Options,
      Referrer-Policy, `frame-ancestors`). Ce n'est **pas un chantier de code** :
      GitHub Pages ne sert aucun en-tête personnalisé. La question est
      « passe-t-on par Cloudflare ? » — et elle rejoint celle de la mesure
      d'audience (le proxy DNS règle les deux d'un coup).
- [ ] **Contraste de la charte** : `#ff6b35` sur beige ≈ 2,52:1, blanc sur
      orange ≈ 2,84:1, pour un seuil de 4,5:1. Corriger = créer une **variante
      foncée dans la charte** (`usine-contenu\00-charte\`), donc **hors de ce
      dépôt** — à faire avant, sinon la refonte fige un défaut partout.
- [ ] **`mentions.html`** : brouillon non lié, champs `⟦à valider⟧`. Une refonte
      globale est le moment de les remplir ou d'assumer qu'elle reste hors ligne.
- [ ] **`contact@inerweb.fr`** : soit la boîte relève, soit l'adresse se retire
      de `regulateur-electronique-interactif`.
- [ ] **`galerie.html`** (le catalogue) : reste cachée, ou devient visible.
      ⚠️ Si visible : **retirer d'abord les noms** — page cachée = noms tolérés,
      page visible = on nettoie avant.
- [ ] **`formation.html`** : indexée ou non. Le garde-fou du build lève un
      avertissement à chaque passage tant que ce n'est pas tranché.
- [ ] **Licence du moteur** : le contenu est en CC BY-NC-ND 4.0 ; le moteur en
      MIT n'a jamais été tranché.
- [ ] **Réseau Législation — hébergement définitif** : rester dans
      `inerweb.fr/legislation/` ou partir en dépôt / sous-domaine séparé. Le
      dossier a été bâti pour être **déplaçable d'un bloc** ; c'est maintenant
      qu'il faut choisir, pas après avoir ouvert vingt stations.
- [ ] **Réseau Législation — référentiel BTS d'adossement** (FED ? autre ?) :
      sans lui, les stations ne peuvent pas être codées, et la couverture ne
      peut pas être mesurée code par code.
- [ ] **Réseau Législation — relecture des 57 stations** (noms, sous-titres,
      paires de maillage) : conception Claude, rien de validé métier.
- [ ] **Les trois stations candidates** révélées par l'inventaire des gisements,
      non ajoutées au plan : Plan de prévention, Permis de feu, Gestes &
      postures (PRAP).

## 2. Ce qui doit être FINI avant le jour J

- [ ] **Chaque station qui doit partir a fait tout son rail** : fond validé →
      Design → transposition maison → vérification. Une station à moitié
      transposée n'entre pas dans le lot ; elle attend le lot suivant.
- [ ] **Les 19 SVG du pack qui débordent de leur cadre sans Calibri**
      (trouvés par l'audit, commit `1cc822a`) sont corrigés — sinon la refonte
      publie le défaut à l'identique sur les postes sans cette police.
- [ ] **Le RAG est réindexé** après toute production : Claude produit, donc
      Claude réindexe, sans qu'on le demande.
- [ ] **Aucun résidu de build non commité** ne traîne (les 19 pages + `sw.js`
      vus ce matin). On ne commite pas des fichiers générés à mi-course : on
      **relance le build complet** et on commite son résultat.
- [ ] **Le poste de pilotage est à jour**, et les validations en attente y
      figurent — elles ne dorment pas dans un `REPRISE.md`.

## 3. La séquence du jour J — ordre strict

1. **Une seule session pilote.** Toutes les autres sessions sur ce dépôt
   s'arrêtent. C'est la règle d'arrêt chantier, et elle vaut double ici : le
   20/08, un `git add -A` d'une session parallèle a figé deux fichiers générés
   en pleine course.
2. `git pull`, puis `git status` **doit être vide**. S'il ne l'est pas,
   comprendre chaque ligne avant de continuer — jamais de `git add -A`.
3. **Relancer le build complet** : `node build/build.mjs`. Il régénère la
   galerie, le registre, la matrice, le planning, la liste du réseau, le
   sitemap. ⚠️ `version.mjs` passe **en dernier**, après que tout a fini
   d'écrire — sinon le hash ne reflète pas l'état final.
4. **Toute page HTML nouvelle entre dans `PAGES` de `build/version.mjs`.**
   Exception assumée : les **satellites** (`legislation/`, sous-tension, travail
   en hauteur), qui chargent `marque.js` et `lisibilite.js` en absolu depuis
   `https://inerweb.fr/moteur/` et n'ont donc pas de référence locale à dater.
5. **Contrôles automatiques** : `build/audit-conformite.mjs`, le garde-fou
   « page ni listée ni en `noindex` », et la liste du réseau (elle doit compter
   le bon nombre de lignes et de stations).
6. **Un seul commit, un seul push.** Message qui dit ce que la refonte change,
   pas comment.
7. **Attendre la fin de l'Action GitHub Pages** avant toute vérification. Un run
   « waiting » n'est pas un run fini.
8. **Vérifier le PRODUIT servi**, pas le dépôt (voir § 4).

## 4. La vérification du produit — non négociable

`git push` réussi **ne veut pas dire** page publiée.

- **Le service worker sert l'ancienne version au premier chargement.** Ne jamais
  conclure « le déploiement a raté » sur ce que montre la page : comparer avec
  `fetch(url, {cache:'reload'})`, ou vider `caches` et désinscrire le SW.
- Vérifier **en ligne** : chaque page neuve en 200, les liens du plan sans 404,
  les textes du plan sans chevauchement (mesure en `getBoundingClientRect`,
  jamais `getBBox` qui ignore les `transform`).
- Vérifier qu'**aucune requête ne sort du site** (la phrase « aucun script
  tiers » des mentions doit rester vraie).
- Vérifier le rendu **à 375 px** : aucun débordement horizontal.

## 5. Les pièges qui font rater un déploiement

- **Jekyll ne publie pas** les fichiers et dossiers commençant par `_` ou `.`.
  Le fichier **`.nojekyll`** à la racine désactive ça : **ne jamais le
  supprimer**.
- **`ordonner-ligne.js`** (dans `atelier-animations`) réécrit d'autorité les
  stations de `var HUILE` dans `index.html` et **détruirait la coupe** en deux
  lignes. L'adapter avant de le relancer, jamais l'inverse.
- **Le trait d'une ligne du plan doit courir au-delà de sa dernière station**,
  sinon les pastilles flottent sans rien qui les relie.
- **Ajouter une tête de sous-ligne élargit le SVG** : penser `W`, la pointe de
  flèche, la position du jalon et le `min-width` ensemble.
- **`noindex` ne rend rien privé** : il cache des moteurs de recherche, la page
  reste lisible par qui a l'adresse.
- **Diffusion gelée** sur ce dépôt : aucun push sans feu vert explicite de
  F. Henninot — y compris le jour J, qui doit être annoncé comme tel.

## 6. Ce que le chat global doit lire en arrivant

1. `REPRISE.md` (racine) — la vérité du réseau technique.
2. `legislation/PROMPT-REPRISE.md` — la vérité du réseau Législation.
3. `legislation/GISEMENTS.md` — les briques disponibles, station par station.
4. `legislation/stations/fgaz-3/` — **le gabarit** : une station complète, du
   fond au rendu. Toute nouvelle station se compare à celle-là.
5. Ce fichier.

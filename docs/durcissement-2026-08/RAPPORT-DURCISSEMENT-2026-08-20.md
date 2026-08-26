# Rapport — reprise ciblée et durcissement d'inerweb.fr (20/08/2026)

**PUBLIÉ ET VÉRIFIÉ EN LIGNE le 20/08** — bon à tirer donné par Franck le jour même,
après lecture des quatre choix posés. Trois commits : `7166e98` (durcissement),
`99ef793` (les sept pages hors moteurs de recherche) et `a6a78da` (`.nojekyll`, voir
§ 10 — un défaut trouvé en vérifiant le site servi, pas le dépôt). Le § 6 « décisions » ci-dessous est conservé tel
qu'il était au moment de la question ; les réponses de Franck figurent au § 9, à la
fin de ce rapport.

---

## 1. Constat préalable important

**L'état des lieux de la mission était antérieur au 20/08 matin.** Le « brouillon PWA
non validé » décrit (manifest, sw.js, icônes, hors-ligne.html non suivis) avait été
commité, poussé et vérifié sur le site servi le 20/08 matin (commits `b8f0754` →
`39f2f46`), sous le régime de travail du chantier d'alors. Rien n'a donc été perdu ni
écrasé : la présente mission a été traitée comme un **audit + durcissement de
l'existant**, avec la nouvelle règle appliquée immédiatement : plus aucun push sans
bon à tirer.

Autres constats d'audit (vérifiés, pas supposés) :
- **Aucun chemin local ni nom de compte dans les pages HTML/JS servies** — les
  correspondances « henni » étaient « F. Henninot » (nom d'auteur légitime). En
  revanche, 31 occurrences de `C:\Users\henni\…` vivaient dans des **.md de
  traçabilité** servis, 6 dans les **schémas .qet**, et 3 en dur dans des **scripts
  de build** → toutes traitées (voir § 3).
- **Aucune adresse électronique personnelle dans les SVG QElectroTech** (les « @ »
  détectés étaient des `@keyframes`/`@media` CSS). Les attributions CC BY 3.0 sont
  intactes.
- `.well-known/security.txt`, `SECURITY.md`, `404.html`, canonical : absents → créés.
- La formulation « **Conforme à l'arrêté du 21 novembre 2025** » vivait dans la meta
  description de `portail.html`, alors que le README documente précisément ce que le
  moteur NE fait PAS de l'arrêté (composition d'épreuve, pondérations…).
- Le fichier de charte du dépôt s'appelle `CHARTE-GRAPHIQUE.md` (pas de
  `CHARTE-GRAPHIQUE-CLAUDE.md`). Il confirme : texte `--ink #10233c`, carte
  `--paper #fffdf8` — or les 3 pages publiques utilisaient `#1d2a38` et `#ffffff` →
  alignées.
- DNS : **il manque bien `185.199.111.153`** (vérifié par nslookup : seuls .108,
  .109, .110 répondent) → checklist.

## 2. Fichiers modifiés (le working tree exact)

**Créés (9)** : `SECURITY.md` · `.well-known/security.txt` · `404.html` ·
`mentions.html` (brouillon noindex NON lié) · `build/plan-liste.mjs` ·
`build/sitemap.mjs` · 3 × `preuve-*.md` (preuves inertes du filtre-déshydrateur).

**Supprimés (3)** : les copies HTML Wikimedia Commons (110 Ko chacune, avec scripts
MediaWiki) — leur contenu probatoire est repris dans les `preuve-*.md`, et les
fichiers d'origine **restent dans l'historique git** (commit `ff60f12`), ce qui est
noté dans chaque preuve.

**Modifiés — de fond (14)** :
| Fichier | Quoi |
|---|---|
| `sw.js` | purge limitée au préfixe `inerweb-` ; images passées en « cache + revalidation » (un schéma corrigé arrive) ; audio/polices seuls figés ; réponses > 8 Mo jamais mises en cache |
| `moteur/moteur.js` | scoring serveur durci : https exigé, timeout 10 s, valeurs strictement numériques, plus aucun innerHTML de données serveur |
| `index.html` | canonical ; charte #10233c/#fffdf8 ; lien d'évitement + focus orange ; lisibilite.js (« Aa ») ; focus du volet au clavier (ouvrir → bouton fermer, fermer → poignée) ; état « déjà visité » en texte lecteur d'écran ; **section « Le réseau, en liste »** (sentinelles, générée au build) ; JSON-LD ; `.catch()` sur l'enregistrement du SW |
| `metier.html`, `formateurs.html` | canonical + og:url + og:image + twitter:card ; charte ; skip-link + focus ; lisibilite.js |
| `formateurs.html` (fond) | « Réemployer le code » → « **Réemployer le moteur (MIT)** », avec l'avertissement : contenus ND et illustrations ne se modifient pas |
| `formation.html` | canonical ; `<noscript>` (titre + explication + retour accueil) ; `.catch()` sur le SW |
| `portail.html` | « Conforme à l'arrêté » → « **Construit sur le référentiel de l'arrêté** » |
| `documents.html` | le coffre dit sa vraie nature : fichiers chiffrés téléchargeables par tous, la protection vaut la phrase d'accès — pas un contrôle d'accès serveur |
| `build/coffre.mjs` | chemins par `homedir()` (plus de compte en dur) + avertissement non bloquant si phrase d'accès < 12 caractères |
| `build/convert.mjs` | chemin source par `homedir()` |
| `build/version.mjs` | + `404.html`, `mentions.html` dans PAGES |
| `build/build.mjs` | enchaîne `plan-liste.mjs` et `sitemap.mjs` (avant version.mjs) |
| `sitemap.xml` | désormais GÉNÉRÉ ; 3 URL vérifiées (existence + absence de noindex) ; **formation.html sortie volontairement** (décision à valider, voir § 5) |
| `SOURCES-IMAGES.md` + `README.md` du filtre | preuves → .md inertes ; chemins `C:\git\…` reformulés |

**Modifiés — mécaniques** : 17 `.md` de traçabilité + 2 fichiers de reprise racine
(`C:\Users\henni` → `~`, 31 occurrences) ; 6 `.qet` (idem, attribut informatif) ;
14 pages HTML re-versionnées `?v=4d014f616d` par le build (aucun contenu touché).

## 3. Audit du service worker (§ 4 de la mission) — état vérifié

| Exigence | État |
|---|---|
| Ne purge que les caches `inerweb-` | ✅ corrigé (avant : purge de tout cache ≠ courant) et **prouvé en réel** : Chrome avait le cache d'hier `inerweb-2a318eb392`, le nouveau SW l'a purgé et posé `inerweb-4d014f616d` |
| Un SVG corrigé ne reste pas périmé | ✅ corrigé : les images sont désormais revalidées en arrière-plan ; seuls MP3/polices restent figés (forfait mobile) |
| Pas de remplissage sans limite | ✅ garde ajoutée : > 8 Mo jamais mis en cache ; .mp4 jamais interceptés |
| 206 / redirections / autres origines | ✅ déjà tenus (`status===200`, `!redirected`, `type==="basic"`, même origine) |
| Accueil + formation hors ligne | ✅ testé serveur coupé (Chrome réel, 20/08 matin) : pages servies du cache, repli « Pas de réseau ici » sur pages inconnues, réseau repris ensuite |
| Nouvelle version sans vider le cache | ✅ VERSION réécrite par le build + skipWaiting/claim + purge à l'activation — prouvé ci-dessus |
| dossier/documents/téléchargements | ✅ navigations en réseau-d'abord (transparent) ; PDF > 8 Mo non cachés ; comportement inchangé |
| Manifest : identité stable, icônes réelles | ✅ name/short_name stables ; 4 PNG présents et servis (192, 512, maskable 512, apple 180) |

## 4. Tests exécutés (§ 10) et résultats

| Test | Résultat |
|---|---|
| 1366×768 · 1280×720 · 1024×768 · 390×844 · 360×640 | **0 px de débordement horizontal** sur index (les 5), metier (360), formateurs (360) |
| Console | 0 erreur — hors échec d'enregistrement SW propre au bac à sable du navigateur de test (le SW marche dans Chrome réel) ; un `.catch()` a été ajouté au passage |
| Liens | **59/59 liens de la liste répondent** (internes en local, externes en ligne) |
| Clavier | le lien d'évitement est le premier élément focusable ; volet : ouverture → focus sur « fermer », fermeture → focus sur la poignée (mesuré) |
| Tactile | « Aa » = 46×46 px, sans collision avec la poignée (390×844) ; filtres galerie ≥ 42 px sous pointer:coarse (fait au chantier du matin) |
| Sans JavaScript | la liste des 59 cours est dans le HTML statique (vérifié sur le fichier servi) ; formation.html porte un `<noscript>` explicite |
| Stockage bloqué | vérifié **par revue de code** : tous les accès localStorage/sessionStorage d'index.html sont sous try/catch (trajet, volet, frise) — pas de test d'exécution |
| robots/sitemap | robots.txt inchangé et valide ; sitemap généré, 3 URL, toutes 200 et sans noindex (garde-fou automatique dans le générateur) |
| 404 réelle | 404.html créée (GitHub Pages la servira automatiquement) — testable seulement une fois déployée |
| Hors ligne / mise à jour SW | prouvé dans Chrome réel (voir § 3) |
| Secrets dans le diff | 0 clé, 0 jeton, 0 nominatif élève, 0 sujet officiel (le diff retire des données personnelles, il n'en ajoute pas) |

**Non vérifié** (à faire par Franck ou en session avec le volet navigateur affiché) :
- les **captures d'écran** aux 5 formats : le volet de prévisualisation était masqué,
  le moteur ne compose pas les images (les mesures DOM font foi en attendant) ;
- le rendu **visuel** fin de la nouvelle section « Le réseau, en liste » ;
- Lighthouse (nécessite le site déployé) ;
- l'installation PWA et le mode silencieux iOS sur un vrai téléphone.

## 5. Tableau d'indexation des pages racine (§ 6)

| Page | Statut | Robots | Canonical | Sitemap | Justification / décision |
|---|---|---|---|---|---|
| `/` (index) | 200 | index | ✅ posé | ✅ | LA page du site |
| `metier.html` | 200 | index | ✅ posé | ✅ | contenu de destination (métier) |
| `formateurs.html` | 200 | index | ✅ posé | ✅ | contenu de destination (réemploi) |
| `formation.html` | 200 | index | ✅ posé (self) | ❌ sortie | ⚠️ **décision Franck** : sa porte d'entrée (redirection frise en nouvelle session) remplace le contenu — hors sitemap en attendant une stratégie (options : assumer l'indexation de la frise ; ou canonical de la frise → formation.html ; ou laisser tel quel) |
| `galerie.html` | 200 | noindex | — | ❌ | décision du 19/08, réévaluation en attente |
| `dossier.html` | 200 | noindex | — | ❌ | dossier direction (⚠️ porte le nom de l'établissement — voulu pour son public, voir dettes) |
| `documents.html` | 200 | noindex | — | ❌ | coffre documentaire |
| `formateur.html`, `partage.html`, `hors-ligne.html`, `404.html`, `mentions.html` | 200 | noindex | — | ❌ | outils/brouillons |
| `portail.html`, `pratique.html`, `planning.html`, `projection.html`, `matrice.html`, `relecture.html`, `charte.html` | 200 | **ni noindex ni sitemap** | — | ❌ | ⚠️ **décision Franck** : indexables par découverte de liens. Recommandation : noindex sur relecture (bon à tirer interne) et projection (outil de salle) ; les autres au choix — je n'ai posé AUCUN noindex nouveau sans décision |

JSON-LD posé sur l'accueil : `WebSite` + `ItemList` (59 stations, générés de la donnée
du plan — rien d'inventé, pas d'organisation, pas d'avis, pas de notes).

## 6. Décisions qui attendent Franck

1. **Bon à tirer global du working tree** (ou tri fichier par fichier).
2. formation.html : stratégie d'indexation (voir tableau).
3. Les 7 pages « ni noindex ni sitemap » (voir tableau).
4. mentions.html : compléter les ⟦à valider⟧ (directeur de la publication, registrar),
   puis la LIER (pied de page marque.js ? nav ?) — aujourd'hui personne n'y arrive.
5. Phrase d'accès du coffre : le build avertit désormais sous 12 caractères —
   changer le code = redistribuer aux stagiaires, à planifier.
6. Toujours en attente du 19-20/08 : galerie au sitemap ou noindex ? relecture métier
   des 2 cours (parcours-manomètres, glissement) ? 🔴 **A2F GitHub avant le 31/08**.

## 7. Dettes constatées, laissées hors périmètre (volontairement)

- `charte.html:523` : signature visible « F. Henninot — groupe Équatio Formation &
  Métiers » (contraire à la doctrine « signatures visibles = inerweb.fr » du 19/08,
  mais la page n'était pas dans le périmètre — une ligne à changer sur décision).
- `dossier.html` : nom de l'établissement en clair (3 occurrences) — pièce destinée à
  la direction, noindex, mais servie publiquement. À trancher.
- Noms de fichiers du coffre `*_LPP-JR.docx/xlsx` : sigle de l'établissement visible
  dans build/coffre.mjs et dans les téléchargements — renommer casserait le coffre
  chiffré, à faire seulement avec un re-chiffrement.
- Chemins `C:\git\pilote-fluides\…` (sans nom de compte) dans quelques SOURCES.md de
  modules : inoffensifs mais peu élégants — nettoyage possible module par module.
- `#eef2f6` hors charte dans `moteur/lisibilite.js`, `moteur/charte-edu.css` et
  `.vl-corr` d'index.html : chantier charte moteur connu (REPRISE du 19/08).
- Les capsules chargent `speechSynthesis` — pas d'aide « mode silencieux iOS » comme
  les films narrés ; à traiter si le même retour terrain arrive.
- QA locale : pas de test d'exécution « stockage bloqué » (revue de code seulement).

## 9. Les décisions de Franck (20/08) et ce qui en a été fait

| Question posée | Réponse | Appliqué |
|---|---|---|
| Publier le durcissement ? | **Publie tout maintenant** | ✅ commits `7166e98` + `99ef793`, poussés |
| Les 7 pages indexables sans décision | **Cacher les sept** | ✅ portail, planning, matrice, relecture, projection, pratique, charte en `noindex` — dont 3 via leur générateur, pour que le build ne l'efface pas |
| Le catalogue (galerie) | **Garde-le caché** | ✅ inchangé (déjà `noindex`) |
| Nom du lycée / signature Équatio | **Règle : une page cachée peut garder les noms ; une page visible, non** | ✅ les deux pages étant `noindex`, rien n'est retiré. La règle et son corollaire sont écrits dans REPRISE.md |

**Le corollaire à ne pas perdre** : le jour où l'on veut rendre `charte.html` ou
`dossier.html` visible dans les moteurs de recherche, il faudra d'abord en retirer le
nom de l'établissement et la mention du groupe. C'est noté dans REPRISE.md.

**Le rappel de fond, qui vient de la mission elle-même** : `noindex` empêche
l'affichage dans les résultats de recherche, il ne rend rien privé. Ces pages restent
lisibles par quiconque connaît leur adresse. Ce qui est réellement confidentiel
(sujets d'examen, données nominatives) reste hors du dépôt public, comme avant.

## 10. Un défaut trouvé APRÈS publication, en vérifiant le site servi

Juste après le déploiement, `/.well-known/security.txt` rendait **404**. Cause :
GitHub Pages fait tourner Jekyll, qui **ne publie aucun fichier ni dossier commençant
par `_` ou `.`**. Cinq outils de contrôle étaient donc invisibles en ligne **depuis
toujours**, sans que personne ne l'ait vu : `_motifs.html`, `_controle.html`,
`donnees/_liste.js`, `_verifier-icones.html`, `_verifier-instants.html`. Aucun cours
élève n'était touché (`_liste.js` n'est chargé que par `_controle.html`, filtré lui
aussi). Corrigé par un fichier **`.nojekyll`** vide à la racine (commit `a6a78da`) —
sans risque : le site n'utilise aucune fonction Jekyll, il n'a pas de `_config.yml`.

**Deuxième piège dans la foulée** : après ce correctif, les URL rendaient encore 404.
Ce n'était pas un échec — le CDN de GitHub Pages garde les réponses **600 secondes,
404 comprises**. L'état réel du build se lit avec
`gh api repos/frigorx/pilote-fluides/pages/builds/latest --jq .status` (« built »), et
un simple `?x=123` en fin d'URL contourne le cache pour tester. Les deux pièges sont
en mémoire pour les prochains dépôts.

## 11. Vérification finale sur le site servi (cache contourné)

| Contrôle | Résultat |
|---|---|
| Fichiers nouveaux | `security.txt`, `404.html`, `mentions.html`, `SECURITY.md`, `sitemap.xml`, image Open Graph, `manifest.webmanifest`, `sw.js` → **tous 200** |
| Les 7 pages + galerie | **noindex servi sur les 8** |
| Accueil, métier, formateurs | **aucun noindex** (ils doivent rester indexables) |
| Accueil | liste des **59 cours en HTML**, lien d'évitement, `lisibilite.js`, JSON-LD, canonical, Open Graph → tous présents |
| Adresse inexistante | rend bien une **vraie 404** |
| Nom de compte Windows | **0 occurrence** en ligne |

## 12. Contrôle demandé après coup — publication plus tôt que prévu

Franck signalait avoir une mise à jour en préparation et que la publication n'aurait
pas dû partir à ce moment. Contrôle complet mené ; **conclusion : rien de son travail
en cours n'a fuité et rien n'a été écrasé.**

| Vérification | Résultat |
|---|---|
| Fichiers de la brique en cours dans mes commits | **aucun** (liste des 3 commits relue fichier par fichier) |
| `cartes.js` (contenu du pack) | **jamais touché** |
| La brique en ligne ? | **404** — `index.html` et `app.js` de `regulateur-electronique-interactif` ne sont pas servis |
| Appli de formation en ligne | **fonctionne**, 0 erreur console |
| Cours, galerie, frise, moteur | tous servis en 200 |
| Ce qui est réellement parti | technique seule : sécurité, accessibilité, référencement, pages hors moteurs. **Aucun cours, aucune donnée** |

**Décision de Franck après ce contrôle : laisser en ligne**, et garder le
comportement actuel (« publie » = j'envoie, sans redemander).

**Deux points relevés pour lui :**
1. **Une session Claude Code parallèle travaillait sur le dépôt** pendant ce chantier
   (brique `regulateur-electronique-interactif`, fichiers modifiés jusqu'à 15h58).
   Elle est partie d'une version antérieure à mes commits : **elle doit récupérer
   ces changements (`git pull`) avant de committer**, sinon son envoi sera refusé.
   Rien ne se perd, mais autant le savoir.
2. **Les fichiers `_p0.js` à `_p9.js` et `_pdoss.js` de la brique sont des fichiers de
   travail** : rien ne les charge (ni `index.html`, ni `app.js`, qui est le fichier
   assemblé). À ranger ou supprimer avant de committer la brique — sinon ils entrent
   dans un dépôt public sans servir à rien.

**Pour l'arrivée des deux briques annoncées (régulateurs, pressostat BP) :**
- le registre les relèvera seul (celle du régulateur a déjà son `couverture.json` —
  codes `9.04` et `6.03`, appui `9.10`) ;
- ⚠️ **nouveau depuis aujourd'hui** : la liste HTML des cours est GÉNÉRÉE. Ajouter une
  station au plan impose de relancer le build (`node build/build.mjs`, qui enchaîne
  `plan-liste.mjs`), sinon le plan et la liste divergent ;
- le service worker n'a besoin de rien : une brique nouvelle entre au cache à l'usage.

## 8. Ce qui n'a PAS été fait, et pourquoi

- Aucun `_headers` (GitHub Pages l'ignore — conformément à la mission, le chantier
  CSP/HSTS attendra un proxy si choisi un jour).
- Aucun noindex ajouté ou retiré sans décision.
- Aucune harmonisation globale des modules pédagogiques (dette consignée ci-dessus).
- Aucune modification du mécanisme de chiffrement du coffre (avertissement seulement).
- Aucun changement scientifique ou de contenu métier.

# REPRISE — pack habilitation fluides frigorigènes

> **À LIRE EN PREMIER** dans toute nouvelle session. Tout ce qu'il faut pour reprendre
> le projet est ici : état, architecture, décisions déjà tranchées, pièges, prochaines étapes.
> Dernière mise à jour : **1er août 2026**.

---

## 1. Ce que c'est

Le contenu de la formation **habilitation fluides frigorigènes** (catégories **A1 · A2 · D · E**)
tournant dans le moteur générique **inerWeb Pilote** (repris de `frigorx/r408`).

**Double usage, et c'est le cœur du concept :**
1. **support de séance** — le formateur projette, pilote, note ;
2. **outil d'auto-préparation à l'examen** — le stagiaire reçoit le lien **avant** la formation,
   le garde **pendant** les périodes en entreprise, révise **selon son niveau** jusqu'à l'épreuve.

> ⚠️ **Démonstrateur, pas version définitive.** Contenu jamais relu par un œil de frigoriste
> (voir § 6). **Publié et diffusable en lien** depuis le 25/07 — la vitrine annonce elle-même
> ses limites, section « ce qui n'est pas encore fait ». Les retours passent par les
> [issues GitHub](https://github.com/frigorx/pilote-fluides/issues).

> 📐 **Plan d'ensemble des deux projets** : `C:\git\habilitation-fluide\ARCHITECTURE-DISPOSITIF.md`.
> Il pose la frontière **public / privé** — ce dépôt-ci porte la formation, le dépôt privé porte
> l'évaluation officielle. Les 85 questions d'examen et les 10 sujets **n'entrent jamais ici** :
> publier un sujet est irréversible. Le référentiel des 136 codes est la seule chose partagée.

**Dépôt** : `C:\git\pilote-fluides` → `github.com/frigorx/pilote-fluides` (public)
**En ligne** : https://frigorx.github.io/pilote-fluides/
**Licence** : `LICENCE.md` (25/07) — contenu pédagogique CC BY-NC-SA 4.0 (pas d'usage
commercial sans accord), moteur et build MIT, référentiel officiel hors licence.
Doctrine [[feedback_protection_code]] : licence + antériorité git, jamais de chiffrement.

| Page | Rôle | Pour qui |
|---|---|---|
| [`projection.html`](https://frigorx.github.io/pilote-fluides/projection.html) | **le déroulé des 5 jours (A1, 35 h)** : diapositives, minuteur, questions à révéler, vue orateur, annonce des passages au plateau | formateur, en salle |
| [`planning.html`](https://frigorx.github.io/pilote-fluides/planning.html) | **le planning, généré et vérifié** : les 35 h module par module (M0→M8), la part salle / plateau / autoformation, les cinq journées. Version Markdown : `PLANNING-FORMATION.md` | direction |
| [`pratique.html`](https://frigorx.github.io/pilote-fluides/pratique.html) | présentation de la **manipulation fluidique** : démonstration de feuille de guidance, grille par compétence. Aucune donnée de stagiaire | vitrine |
| [`dossier.html`](https://frigorx.github.io/pilote-fluides/dossier.html) | ⭐ **LE LIEN À ENVOYER À LA DIRECTION** — page d'entrée du dossier : mot d'introduction, les 2 pièces (projet + budget), le tableau de résultat sur 5 ans, l'outil en fonctionnement, et « ce qui reste à faire » sans fard (recevabilité de groupe, relecture métier non finie, 3 montants estimés) | direction |
| [`portail.html`](https://frigorx.github.io/pilote-fluides/portail.html) | **la vitrine** : dossier de présentation à envoyer en lien à des fournisseurs et des collègues pour qu'ils testent | tous publics |
| [`index.html`](https://frigorx.github.io/pilote-fluides/) | l'application élève | **le lien à distribuer** |
| [`formateur.html`](https://frigorx.github.io/pilote-fluides/formateur.html) | mode pilotage verrouillé, notes d'animation visibles | formateur |
| [`partage.html`](https://frigorx.github.io/pilote-fluides/partage.html) | affiche A4 / écran avec QR code | à projeter en salle |
| [`relecture.html`](https://frigorx.github.io/pilote-fluides/relecture.html) | tout le contenu à plat, cases ✅/✏ | **le bon à tirer** |
| [`galerie.html`](https://frigorx.github.io/pilote-fluides/galerie.html) | **toutes les planches sur une page**, chacune rejouable d'un clic (récits / boucles / dessins fixes), avec les fiches qui l'utilisent et le signalement des planches non utilisées. **Partage** : chaque planche a son adresse directe (bouton 🔗) et s'ouvre seule (⬇). Recense aussi les **expériences interactives complètes** (frise vivante, cours de nomenclature — voir § 2, 29/07). Relevée du dossier à chaque build | formateur, auteur, partage |
| [`packs/fluides/res/frise-vivante/frise-vivante.html`](https://frigorx.github.io/pilote-fluides/packs/fluides/res/frise-vivante/frise-vivante.html) | **la frise vivante** : 10 scènes narrées (1928 CFC → 2024 F-Gas), voix de synthèse, images d'ambiance. **Premier écran vu par tout nouveau visiteur d'`index.html`** — le « pourquoi » avant la sécurité (F. Henninot, 28/07), voir § 2 | stagiaire, premier contact |
| [`matrice.html`](https://frigorx.github.io/pilote-fluides/matrice.html) | **la matrice de traçabilité** : les 136 compétences de l'arrêté une par une — la fiche qui l'enseigne, les questions qui la vérifient, le texte officiel. Filtrable par catégorie et par état. Version Markdown : `MATRICE-COMPETENCES.md` | direction, organisme évaluateur |
| [`documents.html`](https://frigorx.github.io/pilote-fluides/documents.html) | **le dossier du projet** : 6 documents libres (état, mesures, licence) + **38 documents chiffrés** derrière le code — dossier de direction (projet + budget, en téléchargement), architecture, ingénierie, système qualité, 21 chapitres de cours | tous publics / formateur |

**Charte graphique inerWeb** — ⚠️ **la doctrine ne vit plus dans ce dépôt**. Source depuis le
31/07/2026 : **`C:\git\usine-contenu\00-charte\CHARTE-GRAPHIQUE-INERWEB.md`**, à côté de la charte
pédagogique. C'est **la charte par défaut de tous les projets**, et **son § 8 est le bloc à coller
en consigne** quand une page, une expérience ou un document est produit ailleurs.

Restent ici : `charte.html` (la charte **montrée** — palette, composants, démonstration
écran / imprimé couleur / photocopié gris), `CHARTE-GRAPHIQUE.md` (l'**application au pack** :
les écarts mesurés fichier par fichier, § 10) et les feuilles qui s'exécutent —
`moteur/charte-edu.css` (écran), `moteur/impression.css` (papier, à inclure en `media="print"`),
`moteur/lisibilite.js` (bouton « Aa »).

Trois volets à ne pas confondre : **écran** · **page web imprimée** · **documents Word et PDF**.
Les deux derniers gardent la couleur — ce n'est pas une charte noir et blanc — mais rien n'y
repose sur la couleur seule : mesuré, vert et rouge sont indiscernables une fois photocopiés.
Tout ça existe parce que les trois expériences arrivées de l'extérieur (frise, nomenclature,
Mission Bouteilles) portaient les mêmes deux défauts (thème sombre · `prefers-reduced-motion`
coupant le contenu), corrigés trois fois à la main.

Référencé depuis le tableau de bord : `C:\git\tableau-de-bord` → carte « pilote-fluides ».

---

## 2. État au 1er août 2026

### Cours interactif commun `g4a + g4b + g4c` — « L’étanchéité »

- Nouveau cours autonome : `packs/fluides/res/etancheite-interactive/`,
  **27 écrans sans défilement**, 6 dossiers et 5 contrôles. Il réunit les
  9 compétences `4.01` à `4.09` dans une seule enquête : registre → points
  sensibles → méthode indirecte → méthode directe → confirmation → trace.
- Parti pris visuel renforcé : triptyque illustré dès l’accueil, illustrations
  ou pictogrammes sur 17 écrans, 3 schémas techniques validés et activités
  manipulables sur les autres. Les quatre formats 1024×768, 1366×768, 390×844
  et 360×640 passent sans débordement ni contenu coupé.
- Accès par `?dossier=`, `?dossier=…&ecran=…` et `?extrait=id1,id2`, lien exact
  copiable, navigation clavier, voix française facultative après action humaine,
  quatre vitesses et livret d’impression de 27 écrans. Fonctionnement complet
  sans réseau, stockage ni synthèse vocale.
- Liens ajoutés aux trois fiches `g4a`, `g4b` et `g4c`. Une erreur reste
  bloquante mais explique la correction ; la bonne décision déverrouille la
  suite. Couverture déclarée et contrôlée dans `couverture.json` : 24 écrans
  rattachés aux 9 codes, 3 écrans de contexte explicitement hors référentiel.
- Point réglementaire vérifié le 1er août 2026 : le référentiel 2024/2215 cite
  encore le règlement 1516/2007 pour `4.03` à `4.07`, mais le règlement
  2026/1444 l’a abrogé à compter du 23 juillet 2026, sans remplacement. Le cours
  enseigne la distinction attendue à l’évaluation et renvoie la pratique à la
  procédure actuelle du site, à la notice et aux consignes validées.
- Sources, limites et passation : `SOURCES.md` et `LIRE-MOI.txt`. Les visuels
  sont des ressources locales déjà validées ; aucune illustration générée par
  IA n’a été ajoutée dans ce lot, l’outil de génération intégré n’étant pas
  disponible dans la session.
- Build complet après intégration : A1/A2/D/E à 100 %, matrice `94/94`,
  **16 cours interactifs complets** recensés et projection à **497 écrans**.

### Cours interactifs `g7b` et `g12b` — lots 3 et 4 livrés le 1er août 2026

- **Condenseur — installer, régler, vérifier** :
  `packs/fluides/res/condenseur-interactif/`, 24 écrans sans défilement dans
  5 dossiers. Le curseur d’encrassement et l’arrêt du ventilateur rendent
  visible la chaîne batterie grise → débit d’air réduit → chaleur moins bien
  rejetée → pression de condensation qui tend à monter. L’écran précise qu’une
  HP haute n’est jamais un diagnostic unique. Couverture déclarée écran par
  écran : `7.02`, `7.03`, `7.05`, `7.07`, `7.09`, `7.10`. Le nom commercial
  KVR et le développement encore marqué « À FAIRE VALIDER » dans `g7b` ne sont
  pas déclarés remplacés ; aucune valeur de réglage n’est inventée.
- **Intervenir sur un circuit hydrocarbure** :
  `packs/fluides/res/intervention-hydrocarbures-interactive/`, 27 écrans dans
  6 dossiers. Suite directe de Mission 290 au point sûr « zone autorisée,
  fluide récupéré, circuit rempli d’azote, installation consignée ». Six
  embranchements montrent la conséquence d’un mauvais choix puis ramènent au
  dernier point sûr. Le bouton Suivant reste bloqué jusqu’à la décision.
  Couverture : `12.07`, `12.08`, `12.09`, `12.10`, `12.11`, `12.12`. Aucune
  pression, durée, valeur de vide, débit, couple ou charge générique.
- Les deux cours acceptent `?dossier=`, `?dossier=…&ecran=…` et
  `?extrait=id1,id2`, proposent un lien copiable, une voix française facultative
  après action humaine, quatre vitesses, une impression papier complète et le
  fonctionnement sans voix, stockage ni réseau. Liens ajoutés aux fiches
  `g7b` et `g12b`; leurs lancements entrent automatiquement dans la projection.
- Build complet : A1/A2/D/E et profondeur inchangés à 100 %, matrice
  `94/94`, projection à 494 écrans. La galerie relève **15 vrais cours
  interactifs** après exclusion de `bibliotheque/_verifier-icones.html`, qui
  était compté à tort comme un cours. Le cahier de commande annonce 15 cours
  **avant** ces deux lots : cette divergence prouve que son décompte ne repose
  pas sur la seule copie `C:\git\pilote-fluides`. Ne pas corriger ce delta en
  copiant silencieusement depuis la copie Bureau.

### Module interactif « Évaporateur » — lot 1 livré

- Nouveau module autonome : `packs/fluides/res/evaporateur-interactif/`.
- 26 écrans sans défilement, répartis dans 5 dossiers : Observer, Dégivrer, Régler, Vérifier, Contrôle.
- Couverture explicite des codes A1 `8.02`, `8.03`, `8.04`, `8.06`, `8.07`, `8.10`, `8.11` dans `couverture.json` ; les écrans de contexte sont séparés dans `hors_referentiel`.
- Accès profond stable par `?dossier=…&ecran=…` et par `?extrait=id1,id2`, lien copiable, voix française facultative, impression papier complète et fonctionnement hors ligne.
- Entrée ajoutée à la carte `g8b`. Le build du 31/07 détecte 12 expériences interactives, produit 490 écrans de projection et conserve la couverture A1 à 94/94.
- Vérifications effectuées à 1024×768, 1366×768, 390×844 et 360×640 : aucun débordement ni défilement ; routage, simulations et contrôle 5 questions testés.
- Garde-fous : aucun temps réel prescrit ; aucun réglage chiffré sans notice constructeur ; la terminologie KVP/KVL des paragraphes 3 et 4 de `g8b` reste à faire valider par un frigoriste et n'est pas déclarée remplacée.
- Provenance et limites : `SOURCES.md` et `LIRE-MOI.txt`. Symboles repris sans modification de la bibliothèque exacte ; photo locale optimisée en WebP.

### Module interactif « Mission 290 » — lot 2 entièrement refondu

- Nouveau module autonome : `packs/fluides/res/hydrocarbures-a1-a2/`.
- 28 écrans sans défilement, répartis dans 6 dossiers : Comprendre, Voir le risque, Analyser la zone, Équiper le poste, Conduite à tenir, Contrôle.
- Cas continu : autoriser ou suspendre la remise en service d’une armoire R-290 de 153 g. Le cours sur les classes n’est pas dupliqué : A3 tient en un rappel, puis devient une suite de décisions de chantier.
- Couverture explicite des codes `12.01`, `12.02`, `12.03`, `12.04`, `12.05`, `12.06`, `12.13`, `12.14` dans `couverture.json`.
- Interactions : histoire courte du propane, raisons du retour du R-290, triangle d’inflammation, concentration qualitative, points bas, calcul IEC documenté et borné, inspection de six dangers, corrections observables, GO/STOP et tri de dix outils.
- L’outillage réglementaire hydrocarbures est nommé ; la compatibilité doit être prouvée par le marquage et la documentation. Le rejet de pompe à vide vers l’extérieur est distingué du fluide frigorigène, qui doit être récupéré.
- Accès profond stable par `?dossier=…&ecran=…` et `?extrait=id1,id2`, voix facultative, impression complète et fonctionnement hors ligne.
- Entrée ajoutée à la carte `g12`. La fiche `g12b` n’est pas remplacée : elle reste la brique dédiée au geste d’intervention.
- Refonte visuelle du 1er août 2026 après retour formateur : titres, consignes, réponses et états agrandis ; boutons rééquilibrés ; illustration d’ambiance locale au sommaire ; pictogramme métier sur chacun des 28 écrans ; dossiers et outillage illustrés ; progression numérotée et version téléphone simplifiée. Les ressources viennent de la bibliothèque inerWeb validée, sans nouvelle image générée.
- Seconde reprise pédagogique après captures formateur : le risque n’est plus présenté comme un « triangle » abstrait centré sur le seul R-290. Un écran pose la famille A3 avec R-290, R-600, R-600a, R-1270 et « … », puis quatre scènes montrent fuite → mélange avec l’air → ignition, proportion gaz-air, descente vers les points bas, double risque inflammation/asphyxie et conduite STOP → ÉLOIGNER → ALERTER → consigne du site. A3 n’est pas utilisé comme indicateur de densité ; plaque et FDS restent le réflexe central.
- Vérifications effectuées à 1024×768, 1280×720, 1366×768, 390×844 et 360×640 : 28/28 écrans sans débordement ni défilement ; calcul 7,3 m², correction après erreur, séquence récupération/azote, tri de dix outils et contrôle final 5/5 testés.
- Les pictogrammes normalisés SGH02/ATEX ne figurent pas encore dans la bibliothèque validée : le module emploie un avertissement textuel et ne les redessine pas.

**Refonte du support de projection + bibliothèque d'images (31/07, soir)** — trois défauts
constatés en salle par F. Henninot : « les polices ne sont pas égales », « fond gris, c'est
triste », « il faut un dessin sur chaque diapositive ».
- **Une échelle typographique UNIQUE, en `cqh`** (1 unité = 1 % de la hauteur de l'image
  projetée) : plus une seule taille en pixels dans la scène, là où il y en avait 37 pour
  17 valeurs différentes — un titre de séquence à 40 px, un titre de schéma à 26 px, pour le
  même niveau. Le rendu devient identique sur un vidéoprojecteur 1024×768 et sur un 1080p :
  c'est la taille **vue du fond de la salle** qui est fixée. **Lexend** devient la police de
  projection (elle n'était jusqu'ici accessible que derrière le bouton « Aa »), et un curseur
  de **densité** dans le pied mémorise le réglage (`pilote_projection_densite`).
- **Fond crème `#f7f1e7`** — l'écart était déjà relevé au § 10.1 de `CHARTE-GRAPHIQUE.md`
  (« deux climats coexistent »), tranché par F. Henninot : on garde le crème. Filigrane de
  flocons à 5 % (`res/svg/motif-flocon.svg`), contenu posé sur une feuille claire à filet et
  ombre bleutée — un fond plat n'a aucun relief projeté. Le sommaire ouvre chaque journée sur
  son ambiance.
- **`moteur/illustration.js`** — quelle image va sur quel écran. Trois gisements, trois usages :
  l'**illustration de thème** (`res/bibliotheque/illu-<fiche>.webp`, une par fiche, elle
  accompagne toute la séquence) ; l'**icône de rôle** (`icones/role-*.png`, elle dit la nature
  de l'écran) ; le **symbole normalisé** (`res/symboles/`, 37 fichiers repris de la
  bibliothèque de l'usine et recolorés) posé quand le texte nomme un organe — le stagiaire
  apprend ainsi le symbole qu'il devra reconnaître à l'épreuve. Sept fiches partagent deux
  images (les quatre « Détective », les trois bilans) : voir la table `ALIAS`.
- **La bibliothèque d'images** — fabriquée par F. Henninot à partir du cahier de commande
  `BIBLIOTHEQUE-IMAGES-HABFLU.md` : 43 illustrations 1024×1024, 7 ambiances 1792×1024,
  4 planches d'icônes découpées en 48 fichiers 512×512, et un `MANIFESTE.md` qui documente
  palette, prompts et arbitrages. Contrôle pixel par pixel avant intégration : dimensions
  exactes, **zéro couleur hors palette**, aucune image vide. `_verifier-icones.html` sert à
  vérifier d'un coup d'œil que chaque icône porte le bon nom — **à faire à chaque relivraison**,
  les planches sont découpées dans l'ordre de lecture annoncé et un décalage se propage en bloc.
- **Deux défauts de fond corrigés** : (1) **un paragraphe trop long n'est pas une diapositive** —
  une liste de 532 mots (fiche `g1d`) partait sur un seul écran ; `build/parcours.mjs` coupe
  désormais sur une fin de phrase, et les listes par éléments **avec reprise de numérotation**
  (`<ol start>`). Le texte n'est ni récrit ni raccourci : il occupe le nombre d'écrans qu'il
  demande (581 → 634). (2) **le hash de cache ignorait `projection.gen.js`** : quand c'est le
  *générateur* qui change, la sortie change sans qu'aucune source du calcul ait bougé — l'URL
  restait identique et un formateur ayant déjà ouvert la projection continuait de projeter
  l'ancienne. Exactement l'incident du 28/07. Liste de `lib-version.mjs` complétée.
- **Contrôle** : les 634 écrans parcourus un par un — aucun débordement, aucune image en erreur,
  569 écrans illustrés, 231 portant un symbole normalisé.

**Tome 3 — technologie des organes (31/07, soir)** — module d'autoformation repris de la
livraison `habilitation-fluide-rush-complet-v2.zip`. 16 dossiers, 96 écrans, 16 mini-questions,
3 révisions reliées aux séances 17-19 ; 22 symboles copiés **sans redessin** de la bibliothèque
de l'usine ; `SOURCES-ASSETS.md` donne le prompt exact de chaque vue générée. Il complète le
Tome 1 (le circuit organe par organe) et le Tome 2 (thermodynamique). Relié par `lienOutil` à
**g6, g7, g8, g9 et g9b** — le module accepte `?dossier=<id>`, chaque fiche ouvre donc droit sur
son organe. `g9b` (organes annexes) n'avait aucun module jusqu'ici.
> ⚠️ **Les archives `habilitation-fluide-rush-complet-vN.zip` sont des FOURCHES du dépôt, pas
> des mises à jour.** Mesuré sur les v1 et v2 : 81 des 101 fichiers « modifiés » étaient des
> versions **antérieures**, et 45 fichiers du dépôt manquaient — dont **tout `build/`**,
> `lisibilite.js` et les polices. **Ne jamais écraser** : comparer par empreinte contre
> l'historique git, n'extraire que les modules absents. Défaut systématique : les vues arrivent
> en PNG de 1,1 à 1,8 Mo — conversion WebP à 1024 px, **98 % de gain** (11,2 Mo → 231 Ko).

**Relecture typographique + lisibilité DYS (31/07)** — demande de F. Henninot : « harmonisation
des polices, police variable pour les élèves DYS et les formateurs pour zoomer facilement, tout
dans le même style sauf les vidéos, et mes animations de support de cours au bon endroit ».
- **Bouton « Aa » partout** (`moteur/lisibilite.js`, autonome) : taille du texte 70 → 160 %
  (propriété CSS `zoom`, aucune conversion) + bascule « Police adaptée (DYS) » vers **Lexend**,
  police VARIABLE embarquée (`moteur/polices/Lexend-variable.woff2`, 39 Ko, licence OFL dans le
  même dossier — jamais téléchargée tant qu'on ne l'active pas). Réglages en localStorage
  (`pilote_lisibilite`), partagés entre toutes les pages. Branché sur les 7 pages écrites à la
  main, les 4 gabarits de build (galerie, matrice, planning, relecture) et les 8 expériences.
- **Harmonisation des polices** : les expériences écrivaient leurs titres en Georgia serif
  (héritage de leur fichier d'origine), une en OpenDyslexic/Arial — tout est repris sur la
  charte : **Trebuchet MS aux titres, Calibri au corps**, tracking négatif adouci (-.05em →
  -.015em, pensé pour une serif). Le vrai piège `prefers-reduced-motion` restant
  (chaleur-interactive : il coupait `.orb` et `.heat-rings`) est corrigé — les autres
  occurrences n'étaient que des commentaires documentant la règle.
- **`froid-clim-academie` intégrée** — déposée par F. Henninot sur le Bureau (30/07) : cycle
  frigorifique animé sur canvas (Croix du Frigoriste respectée), simulateur
  surchauffe/sous-refroidissement à 4 curseurs, atelier panne, quiz. Copiée dans
  `packs/fluides/res/froid-clim-academie/`, accents réparés (le fichier d'origine n'en avait
  aucun), charte appliquée, bouton « Aa » ajouté, reliée à **`g1e`** (surchauffe et
  sous-refroidissement) par `lienOutil`, recensée automatiquement par la galerie.
- **Les expériences entrent enfin dans le DÉROULÉ DE COURS** : `lienOutil()` porte désormais
  `class="lien-experience"`, et `build/parcours.mjs` extrait ces liens en diapositives
  **`experience`** (gros bouton de lancement, nouvel onglet), placées juste après la diapositive
  de titre de la fiche. Sans cette extraction, les `<p class="…">` ne matchaient aucun motif du
  découpage : les expériences étaient **silencieusement absentes de la projection**. Résultat :
  9 diapositives de lancement sur 6 expériences (le circuit sert 4 fiches d'organes), 435
  diapositives au total. `cl1` (classes de sécurité) est en régime `avant` : son expérience ne
  se projette pas, c'est le comportement voulu. La frise vivante reste hors projection (elle est
  la porte d'entrée de l'application élève).
- **Vérifié dans le navigateur** (serveur local) : bouton Aa sur frise, galerie, académie,
  chaleur — zoom 120 % appliqué et mémorisé de page en page, Lexend réellement chargée en mode
  DYS, Trebuchet/Calibri par défaut, zéro erreur console, zéro résidu sans accent.
- ⚠️ **Incident évité de justesse, leçon** : une réécriture Python de `cartes.js` a tronqué le
  fichier (crash d'encodage APRÈS l'ouverture en écriture) — restauré de git en 30 s parce que
  le fichier était committé. Ne jamais réécrire un fichier entier quand un remplacement ciblé
  (outil Edit) suffit.

**Le cours interactif de nomenclature (29/07)** — F. Henninot a fait produire, hors de ce dépôt,
un module autonome : « Décrypter le code d'un fluide », 18 étapes narrées (voix de synthèse) qui
construisent pas à pas la logique de décodage R-xyz déjà enseignée sur `g1c` (l'astuce du +90),
avec un atelier manipulable où le stagiaire assemble lui-même la molécule R-22 (glisser-déposer,
repli clic-clic) puis un mini-jeu de 12 questions (seuil 9/12). Déposé dans
`packs/fluides/res/nomenclature-interactive/` (108 Ko, 4 fichiers, aucune image ni son en fichier).
- **Mêmes deux défauts que la frise vivante, non corrigés à la source** (le fichier reprenait
  la même base — « charte graphique alignée sur la Frise Vivante » selon sa propre notice — donc
  les deux pièges déjà réglés le 28/07 sur l'autre module y étaient revenus intacts) :
  1. **Thème sombre** — topbar, hero et le panneau de l'atelier (`.lab-tray`) en fond
     `--navy-950`/`#10233c` avec texte blanc. Repris en clair, même palette de marque
     (`--navy-700` = `#1b3a63`, `--orange` = `#ff6b35`), fond `--cream`. Gardés tels quels les
     petits accents colorés à texte blanc (badge du code R-022, pastilles d'atomes, pilules de
     légende des mélanges) — même exception que d'habitude : la règle porte sur la lecture, pas
     sur un badge. Voir [[feedback_animations_svg]].
  2. **`prefers-reduced-motion: reduce`** conditionnait à la fois les animations CSS de
     construction moléculaire (`molecule-animations.css` — le cœur pédagogique : atomes et
     liaisons qui apparaissent successivement) ET le son des interactions (`chime()` dans
     `nomenclature.js`). Sur une machine aux effets d'animation Windows désactivés, les deux
     auraient disparu en silence — exactement le piège du § 5 déjà payé deux sessions sur la
     frise vivante. Corrigé à l'identique : la media query devient `@media print` pour les
     animations (le mécanisme ne change pas, seule la condition change) ; le son repasse sous
     le seul contrôle de son propre bouton (`soundEnabled`), pas d'un réglage Windows qui
     n'exprime rien sur une préférence sonore.
- **Intégration au pack, pas seulement un fichier posé à côté** :
  - relié depuis la fiche `g1c` (« Les familles de fluides et leurs codes ») par un lien en pied
    de paragraphe, nouvel onglet — nouvel helper `lienOutil()` dans `cartes.js`, à côté de
    `outil()` (iframe) et `schema()` : les liens de pied de fiche (`liens`, boutons `data-go`)
    ne savent pas ouvrir une page hors pack, contrairement aux tuiles d'accueil (`url:`) ;
  - **`galerie.html` recense maintenant aussi les expériences complètes**, pas seulement les
    planches SVG — nouvelle section « Cours interactifs complets », relevée comme le reste
    (aucune liste tenue à la main) : `build/galerie.mjs` scanne les dossiers de
    `packs/fluides/res/` hors `svg/`, `outils/`, `photos/`, et lit `<title>` /
    `<meta name="description">` de la page trouvée. La frise vivante y apparaît donc elle aussi,
    pour la première fois ;
  - `README.md` (ligne « Outils embarqués ») distingue désormais les 3 outils embarqués en
    iframe (réglette, carte d'identité, diagramme enthalpique) des expériences complètes en page
    à part (frise vivante, nomenclature) — deux familles différentes, pas un compteur unique.
- **Vérifié dans le navigateur** (serveur local, `python -m http.server`) : `galerie.html`
  affiche les deux expériences avec leurs boutons Ouvrir/Lien · le cours s'ouvre en thème clair,
  sans erreur console · l'atelier de construction répond au clic (boule H posée sur la prise du
  haut, tuile grisée ensuite) · le lien depuis `g1c` pointe le bon fichier et ouvre un nouvel
  onglet · `node build/build.mjs` passe sans anomalie, couverture et matrice inchangées (100 %,
  94/94 — cette fiche ne touche à aucun critère).
- ⚠️ **Complément le jour même : « Mission Bouteilles »**, 3ᵉ expérience (déposée dans
  `packs/fluides/res/mission-bouteilles/`, reliée depuis `p6` « La balance et la pesée »).
  Même famille de fichier — même défaut de thème sombre, corrigé de la même façon (fond
  `--navy` réaffecté à la couleur claire plutôt qu'ajout d'une nouvelle variable, seuls le
  `.stepper` et le halo `.o1` restaient à reprendre en plus du corps commun). **Différence
  notable : aucun piège `prefers-reduced-motion` cette fois** — vérifié par recherche avant
  toute correction, pas supposé. `galerie.html` recense désormais **3** expériences (scan
  automatique, rien à saisir). `README.md` et le compteur de tête de ce document mis à jour.
  Aussi ajouté au passage : **téléchargement direct des fichiers sources de chaque expérience**
  depuis `galerie.html` (pas d'archive .zip, aucune dépendance ajoutée) et une mention de
  licence — demande de F. Henninot pour constituer une bibliothèque de modules réutilisable
  dans d'autres projets pédagogiques. Décidé le même jour : le projet reste dans ce dépôt tant
  que le volume est faible (pas de dépôt séparé prématuré), licence inchangée (CC BY-NC-SA 4.0).

**La frise vivante (28/07)** — F. Henninot a fait produire, hors de ce dépôt, une expérience
narrée complète : 10 scènes (l'invention des CFC en 1928 → le règlement F-Gas 2024/573),
chacune avec une image d'ambiance, une voix de synthèse (même mécanisme que `moteur/lecture.js`
et `halParler` dans HAL — l'API du navigateur, pas un modèle téléchargé) et une frise cliquable
à deux fils (ozone / climat). Déposée dans `packs/fluides/res/frise-vivante/`. Décision de
F. Henninot, sans hésitation la deuxième fois qu'on lui a posé la question : **c'est le premier
écran vu par tout nouveau visiteur**, avant même la sécurité — « le pourquoi on arrive là ».
- **Deux défauts corrigés avant intégration, tous deux mesurés avant d'agir** :
  1. **Poids** — 10 images à 5,03 Mo au total (1600×900, JPEG non optimisé). Recompressées en
     place (1100 px de large, qualité 78) → **1,1 Mo**, aucune perte visible vérifiée à l'œil sur
     plusieurs scènes. Un test à 1000 px/q75 donnait déjà un résultat propre ; 1100/78 garde une
     marge pour les écrans à forte densité sans repasser au-dessus de 1,2 Mo.
  2. **Thème sombre** — le bandeau du haut (topbar + hero) utilisait `--navy-950` en fond avec du
     texte blanc, et le panneau des sources était full dark. Contraire à la charte (« jamais de
     thème sombre »). Repris en clair : mêmes couleurs de marque (`--navy-700` = notre `#1b3a63`,
     `--orange` = notre `#ff6b35` — le fichier d'origine reprenait déjà notre palette), fond
     clair partout. **Gardés tels quels** : les petits accents colorés à texte blanc
     (`.narration-meta`, `.play-button`, `.commencer-button`) — même logique que nos propres
     badges `.dc` et tuiles `.primaire` ; la règle porte sur la lecture, pas sur un bouton ou un
     bandeau d'accent.
- **Câblage (`index.html`)** : un script en tête de `<head>`, avant tout le reste, redirige vers
  la frise tant que `localStorage.pilote_frise_vue` n'est pas posé. `location.replace` (pas
  `href`) pour ne pas laisser d'entrée d'historique. `formateur.html` et `projection.html` ne
  passent jamais par `index.html` : la console formateur n'est pas concernée.
- Le bouton **« Commencer la formation »**, ajouté en fin de frise, pose le repère puis renvoie
  vers `index.html` — qui, cette fois, atterrit normalement sur l'accueil. Un nouveau lien
  **« Revoir la frise vivante »** sur l'accueil (mécanisme `url:` des tuiles, comme la galerie)
  permet d'y revenir ensuite sans repasser par la redirection automatique.
- ⚠️ **Décision prise sans redemander, à connaître** : l'auto-redirection ne joue qu'**une seule
  fois** (au premier repère absent), jamais à chaque visite — forcer les 10 scènes narrées à
  chaque ouverture aurait été un obstacle pour qui revient réviser une fiche en cours de stage.
  Si F. Henninot veut au contraire qu'elle s'impose à chaque session, c'est un simple retrait du
  test `localStorage`.
- **Vérifié dans le navigateur** : redirection sur premier passage · flag posé au clic ·
  deuxième visite sans redirection · tuile « Revoir » ouvre la bonne page · aucune erreur
  console sur la frise · image chargée à la bonne résolution (1100 px) après clic sur un nœud de
  la frise. Poids du pack élève : 674 → **678 Ko** (4 Ko pour le nouveau lien — les 1,1 Mo de la
  frise ne sont PAS dans ce fichier, chargés seulement si on ouvre la page).
- ✅ **Les trois SVG découverts, tranchés le jour même.** Lus intégralement : deux
  (`decomposition-flamme-sans-protection.svg` / `-ari-protection.svg`) apportaient une nuance
  absente de `s3` — la réponse respiratoire face à des fumées de décomposition déjà présentes
  (ARI, pas un masque à cartouche), que la fiche ne couvrait pas (elle n'enseignait que la
  procédure de brasage). Le troisième (`accident-flexible-manifold.svg`) faisait doublon avec
  `secu-projection.svg`, sans angle nouveau.
  **Retenu** : une planche neuve, `secu-decomposition-ari.svg`, refaite dans notre charte (trait
  plat, fond clair, palette `#1b3a63`/`#c9451a`, sur le modèle exact de `secu-flamme.svg`) —
  jamais un simple recolorage des fichiers sombres/dégradés d'origine, qui restaient dans un
  langage graphique différent du nôtre. Ajoutée à `s3`, avec le paragraphe qui manquait (l'ARI
  protège l'intervenant formé, jamais le chantier). Deux points de code additionnels dans le
  bloc « à retenir ». **Écarté** : les trois fichiers d'origine, retirés du dépôt (`git rm`,
  récupérables dans l'historique).
  ⚠️ **Un premier jet de la planche neuve portait deux chevauchements de texte** (un libellé
  collé au bandeau final à gauche, un autre collé à l'étape 3 à droite) — trouvés en mesurant les
  positions réelles à l'écran (`getBoundingClientRect`, pas `getBBox` : celui-ci ignore les
  transformations des groupes parents et donne de faux chevauchements entre deux colonnes
  côte à côte). Corrigé, revérifié : **zéro chevauchement sur les 16 textes**, zéro débordement
  de cadre.

- ✅ **Le cache navigateur cessait de piéger F. Henninot — corrigé à la racine, pas au cas par
  cas.** Troisième fois de la session qu'il se retrouvait bloqué sur une version périmée (les
  MP3, la tuile galerie, puis « je n'ai que la page d'accueil » — son navigateur servait un
  `index.html` d'avant l'ajout de la redirection vers la frise). `build/lib-version.mjs`
  calcule un hash (sha256 tronqué) du moteur + du contenu ; `build/version.mjs` suffixe
  `?v=<hash>` sur chaque script/feuille de style des pages écrites à la main (`index.html`,
  `formateur.html`, `projection.html`, `portail.html`, `dossier.html`) — idempotent, un second
  passage sans changement ne produit aucun diff. Tant qu'une seule ligne de moteur ou de
  contenu change, l'URL change, et **aucun réglage de cache ne peut plus s'y opposer** — plus
  besoin de Ctrl+F5.
- ✅ **`build.mjs` reconstruisait en réalité la MOITIÉ du pack.** Le reste — `parcours.mjs`
  (planning, projection), `relecture.mjs` (bon à tirer), `chiffres.mjs` (les compteurs
  affichés aux visiteurs) — s'enchaînait à la main, séance après séance. Conséquence trouvée
  en auditant le projet le 28/07 : `chiffres.gen.js` annonçait encore **41 planches** sur
  `portail.html`/`dossier.html` alors qu'il y en avait **42** — un chaînon oublié une fois, et
  les chiffres montrés à un visiteur mentaient sans que rien ne le signale. Les trois scripts
  rejoignent `build.mjs` : **une seule commande reconstruit désormais tout**, dans le bon
  ordre de dépendance. Chacun reste par ailleurs appelable seul.
- ✅ **Audit du projet entier, sur demande explicite de F. Henninot** (« est-ce que tu as
  vraiment réfléchi à un projet global ? »). Les **79 liens locaux** (`href=`/`src=`) de
  toutes les pages HTML vérifiés un par un contre le disque : zéro cassé. Les **9 références**
  du tableau `LIBRES` de `documents.html` (lues en JS, pas en attribut HTML, donc invisibles à
  un contrôle de liens classique) : zéro cassé. Le coffre chiffré : 38 documents, cohérent
  avec les compteurs.

**81 cartes** · **266 questions** · **43 planches SVG** (voir `galerie.html`)
· 4 illustrations · **3 outils embarqués**
· **8 expériences interactives complètes** (frise vivante, décryptage de nomenclature,
Mission Bouteilles, classes de sécurité, du glaçon au circuit, pression/température,
le circuit organe par organe, Académie froid-clim — les 5 dernières ajoutées les 29-31/07)
> ⚠️ **Les 14 planches du 27/07 soir** (8 nouvelles : tirage au vide, pesée, manifold, ordre des
> vannes, pression absolue/relative, boucle du détendeur, givre/dégivrage, charge limite ;
> 6 animations d'existantes) ont été produites par agents + vérification adversariale, contrôle
> build 0 défaut — mais **le déroulé visuel n'a pas été vu par un œil humain** : à valider dans
> `galerie.html` avant diffusion.
**✅ 44 fiches de cours sur 44 portent un visuel** — plus une seule fiche « mur de texte ».

> **Couverture du référentiel officiel : A1 100 % · A2 100 % · D 100 % · E 100 %.**
> Mesurée à chaque build, écrite dans `COUVERTURE-REFERENTIEL.md`. Elle valait 60 % en A1
> avant la refonte compétences du 25/07 — personne ne pouvait le voir, faute de mesure.
>
> **Profondeur (25/07 soir)** : la couverture dit qu'un code est **cité** ;
> `PROFONDEUR-REFERENTIEL.md` (généré au même build) mesure qu'il est **tenu** — les notions
> que le libellé officiel énumère se retrouvent-elles dans le contenu que l'élève lit ?
> Mesure asymétrique et assumée : elle prouve les trous, jamais la qualité. Première mesure :
> **22 codes cités sans être pleinement tenus** (hydrocarbures G11-G12, compresseur G6 —
> groupe du tirage au sort). **Comblés le soir même** : 13 fiches enrichies (rédaction
> sous règles strictes + vérification adversariale + intégration), **94/94 tenus** au build
> suivant. La mesure tourne à chaque build : ça ne peut plus se redégrader en silence.
> L'instrument : `packs/fluides/profondeur-attendus.json` (v0.3, à faire relire).
>
> **Traçabilité (27/07)** : `MATRICE-COMPETENCES.md` + `matrice.html` répondent à la question
> qu'un organisme évaluateur doit savoir traiter — *où est-ce enseigné, où est-ce vérifié ?*
> **94/94** compétences exigées sont enseignées **et** interrogées ; aucune fiche orpheline,
> aucune question sans fiche de repli. Générée à chaque build, jamais saisie.

| | |
|---|---|
| 1 accueil · 8 menus | **Sécurité** · **Classification** · A1, A2, D, E · **Réviser par thème** · **Préparation pratique** |
| 44 fiches de cours | dont **5 de sécurité** (ce qui blesse la personne), **4 de classification** (ce qui est dans la bouteille, dont **2 sur le CO₂**), **7 de préparation pratique** (le matériel et les gestes) et **2 de socle théorique** ajoutées le 27/07 (le palier de changement d'état, la surchauffe et le sous-refroidissement) |
| 1 carte « Ma progression » | où j'en suis, compétence par compétence — tout en local |
| 5 exercices « frigoriste-détective » | mises en situation à indices croisés |
| 21 séries et examens | 13 séries de révision par thème + 8 examens sur 3 paliers |
| 266 questions | rattachées à un **code de compétence**, un niveau, une catégorie — **99 compétences interrogées = 99 enseignées**, plus aucun code muet |

**LE PLANNING TIENT LE CADRE (27/07)** — jusque-là le pack décrivait « 3 jours de théorie »,
découpage qui lui était propre. Le dossier présenté à la direction, lui, décrit la formation en
**modules M0→M8** pour **35 h sur 5 jours** en A1 (28 h / 4 jours en A2) —
`habilitation-fluide/cours/CONTENU-00-PROGRESSIONS.md`. **Les deux ne se recoupaient pas**, et la
confrontation, faite pour la première fois, était sans appel : M0 pesait **6 h en salle pour 1 h
au cadre**, M1 **5 h 15 pour 4 h**, et la **pratique — la moitié du volume — n'apparaissait
nulle part**.

Ce qui fait tenir le planning, c'est **l'autoformation** : le stagiaire a le lien **avant** et le
garde **pendant**. La découverte se fait seul, le temps de salle sert à démontrer, questionner,
remédier — pas à lire. Chaque séquence porte donc son **régime** : `salle` · `plateau` ·
`avant` · `pendant`. Seuls les deux premiers comptent dans les 35 h ; l'autoformation les
prépare et ne les gonfle pas.

| | Salle | Plateau | Total | Cadre |
|---|---:|---:|---:|---:|
| **A1 · M0→M8** | 21 h 45 | 13 h 15 | **35 h 00** | 35 h 00 ✅ |

**38 % de pratique**, cinq journées de 6 h 45 à 7 h 10, et **7 h 50 d'autoformation guidée** en
plus, hors volume. Le contrôle tourne **à chaque build** : déplacer une ligne de `parcours.js`
et le total est revérifié module par module. Le document présentable est généré :
**`PLANNING-FORMATION.md`**.
- Le **plateau** apparaît enfin dans le déroulé (10 séquences). Il ne se projette pas — on ne met
  pas un travail d'atelier sur un écran — mais il produit une **diapositive d'annonce**, pour que
  le formateur garde le fil de sa journée.
- La règle de sécurité récurrente est tenue **dans** les enveloppes de module, pas en plus
  d'elles : 1 h à l'ouverture (M0), puis une reprise en tête de chaque journée.

**Le module SÉCURITÉ (26/07)** — le pack enseignait la sécurité de l'installation et de
l'environnement, **jamais celle de la personne**. Mesuré avant d'agir : *asphyxie* 0 occurrence,
*brûlure cryogénique* 0, *décomposition thermique* 0, *électrocution* 0, *arc électrique* 0 —
alors que « jamais d'oxygène » (pour la mise en pression) apparaissait **21 fois**, et
« consignation » 13 fois, toujours comme consigne, jamais expliquée.
5 fiches ajoutées, en **bloc d'accueil avant tout le reste** : l'air qui manque (asphyxie) ·
le froid brûle (gelures) · la flamme interdite (décomposition) · ce qui éclate (pression) ·
consigner avant de toucher (risque électrique).
- Repris de **« Découverte des métiers par le risque »** (F. Henninot, dossier inspection) :
  on garde la **mécanique** — carte de synthèse, question adossée à un document professionnel,
  tri obligatoire/interdit — et l'on jette l'habillage scolaire (tutoiement, emojis, gamification).
- Le document de référence devient la **fiche de données de sécurité (FDS) du fluide**, et non
  plus le mémo IRIS-ST (absent du dossier). Les valeurs y varient d'un fluide à l'autre : savoir
  ouvrir une FDS est une compétence en soi.
- **Le risque électrique n'a aucun code au référentiel** : la fiche le dit franchement, et ses
  3 questions sont marquées hors référentiel avec leur motif. `build/parcours.mjs` sait tirer
  un questionnaire depuis `remediation_vers` quand une fiche n'a pas de code — sans ce repli,
  le questionnaire d'un sujet vital serait resté vide.
- Trois corrections de fond sur le contenu d'origine : *attestation de capacité* (entreprise) ≠
  *attestation d'aptitude* (personne) · « plus lourds que l'air » ne vaut pas pour l'ammoniac ·
  la température de la phase liquide se lit sur la FDS, elle ne s'affirme pas.

**Le module CLASSIFICATION (26/07)** — même raisonnement que la sécurité, poussé d'un cran : le
pack traitait **les classes qu'il rencontre** (A2L, A3, B2L), jamais **la classification comme
système**. Mesuré avant d'agir : *B1* 0 occurrence, *B2* 1, *B3* 1 — la moitié toxique de la
matrice était absente ; *explosimétrie* 0 ; *anoxie* 0 (l'asphyxie était traitée en `s1`, pas
l'anoxie au CO₂) ; *LIE* citée 6 fois et **jamais expliquée** ; *ATEX* citée une fois.
Deux urgences le rendaient nécessaire : le **CO₂** entre dans le parc (inodore, plus lourd que
l'air, risque d'anoxie) et les **hydrocarbures** s'y généralisent (atmosphère explosive).
4 fiches, dont **3 en second bloc d'accueil**, après la sécurité et avant le choix de la
catégorie — le stagiaire voit les familles de fluides *avant* de savoir quel parcours il suit :
`cl1` lire une classe (les deux axes, les huit cases, **et ce que la classe commande** : EPI,
matériel électrique, ventilation, détection, charge maximale, occupation du local) ·
`cl2` la LIE et l'explosimétrie · `cl3` le **CO₂** et ses deux dangers mortels.
⚠️ **`cl4` (se protéger du CO₂ : détection, ppm, EPC/EPI) a QUITTÉ le bloc d'accueil le 27/07**
(F. Henninot : *« elle n'a pas sa place maintenant, c'est plus tard quand on va parler des
ppm »*). Elle se lit désormais **au jour 4, à la suite de `g13`**, quand le CO₂ est traité en
salle — en régime `pendant`, donc hors des 35 h. La planche de `cl3` a perdu ses capteurs dans
le même geste : elle démontre **une** chose, le gaz coule vers le bas et on descend dedans.
Le bloc d'accueil passe ainsi de 2 h à **1 h 30**.
- **Séparé du bloc sécurité, pas fondu dedans** : `cl3` se définit *par différence* avec `s1`
  (l'azote déplace l'oxygène, le CO₂ déplace **et** agit par lui-même), ce qui suppose `s1` déjà
  vue ; et un bloc d'accueil unique de 4 h noierait les deux messages.
- ⚠️ **Le module N'EST PAS hors référentiel — première version fausse, corrigée le 26/07.**
  Il avait été écrit et étiqueté « hors référentiel » par analogie avec le risque électrique.
  C'était une erreur, trouvée en relecture adversariale : le code **1.08** dit mot pour mot
  « combustibilité, propagation des flammes, restrictions relatives à la capacité de charge,
  limites d'occupation » — c'est le contenu de `cl1`. Rattachements retenus, vérifiés sur le
  texte : `cl1` → **1.08 · 11.03** · `cl2` → **12.02 · 12.04** · `cl3` → **11.03** ·
  `cl4` → **12.02 · 13.14**. Les 12 questions portent les mêmes codes ; le décompte des
  questions hors référentiel est **revenu de 26 à 17**, son niveau d'avant le module.
  *Leçon à retenir : ne jamais déclarer un contenu « hors référentiel » sans avoir relu les
  136 libellés — le pack rattachait déjà ce contenu à 1.08 sur `g11`.*
- **Zéro valeur chiffrée**, et c'est le cœur pédagogique : aucune LIE en %, aucune charge limite,
  aucun seuil en ppm. Elles se lisent sur la **FDS**, dans la **NF EN 378** et sur l'appareil —
  savoir aller les chercher est la compétence visée, les réciter de tête est une source
  d'accident. Seules occurrences chiffrées du module : « 10 % LIE » et « 20 % LIE », qui sont
  des **lectures d'afficheur** servant à expliquer l'unité, jamais la LIE d'un fluide.
- Trois points de vigilance tenus : **R-290 = A3, jamais A2L** (répété en fiche et en question) ·
  « plus lourd que l'air » **jamais généralisé à l'ammoniac** · les cases **B2 et B3 laissées sans
  exemple**, faute de fluide courant du parc français — on ne remplit pas une case en inventant.

**Le CO₂ approfondi + la sécurité récurrente (26/07, demande F. Henninot)** — première version
jugée trop légère sur le CO₂ : *« c'est vraiment mortel, au niveau de la pression déjà, et le
risque d'anoxie ; détecteur obligatoire ; les notions de ppm ; les EPI ; les EPC avec le
détecteur en poste fixe dans les chambres. »* Le CO₂ passe donc d'une fiche à **deux**, et le
déroulé change.
- `cl3` **« CO₂ : deux dangers mortels »** — la **pression** (sans commune mesure, matériel
  dédié obligatoire, pression maintenue machine à l'arrêt, glace carbonique) **et** l'**anoxie**.
- ⚠️ **Erreur grave corrigée avant publication** : la première version affirmait que le CO₂ ne
  donne « aucune gêne avant la perte de connaissance ». C'est la signature de l'**azote**, pas
  du CO₂ — qui est un stimulant respiratoire et provoque essoufflement violent, maux de tête et
  vertiges. L'affirmation supprimait **le seul signal d'auto-sauvetage du stagiaire**, et
  contredisait `s1` (« l'envie de respirer vient d'un excès de gaz carbonique dans le sang »).
  La fiche enseigne désormais la règle inverse, et c'est elle qui compte en salle :
  **essoufflement brutal ou mal de tête soudain = on ressort immédiatement**.
  Corrigée aussi : « les fluides fluorés sont inertes » (faux — effet sur le rythme cardiaque).
- **La même erreur vivait ailleurs dans le pack, elle a été traquée** (2ᵉ relecture) : `g13`
  et deux questions `pk-g13-*` écrivaient « **ni toxique ni inflammable** » et « son danger
  **principal** est la pression » — un stagiaire qui ratait la question recevait en remédiation
  l'inverse de la fiche. `s1`, enfin, généralisait « aucune alerte » à « **l'azote ou le fluide
  frigorigène** », donc au CO₂, et prescrivait le détecteur d'oxygène comme LA vérification.
  Tout est repris : `s1` porte désormais l'exception CO₂ dans son corps, sa clé et son piège,
  `g13` dit « toxicité **faible** » et cite les deux dangers, et l'ammoniac n'« alerte » plus
  « bien avant le seuil dangereux » (fausse assurance, contredite par sa propre question) mais
  « se perçoit très tôt, sans remplacer aucune mesure, et s'émousse à forte concentration ».
  *Contrôle automatique passé : zéro occurrence des formules fautives dans `pack.eleve.js`.*
- `cl4` **« Se protéger du CO₂ — détection, EPC et EPI »** — l'ordre **EPC avant EPI** (principe
  de prévention), la **détection fixe obligatoire** placée **en partie basse**, les alarmes
  intérieure **et extérieure** (celle de dehors prévient avant d'ouvrir la porte), préalarme et
  alarme d'évacuation, la **notion de ppm** et la lecture de l'afficheur, le fait qu'une
  **cellule usée reste allumée sans plus rien mesurer**, la signalisation et les issues de
  secours — et le point le plus contre-intuitif : **un masque à cartouche ne protège ni du CO₂
  ni du manque d'oxygène**, seul un appareil isolant le fait, et son usage relève d'équipes
  formées. Pour le technicien, la protection n'est pas de porter un masque, c'est de ne pas entrer.
- **Les seuils en ppm ne sont PAS écrits** : la fiche enseigne l'unité et la lecture, les valeurs
  sont à donner à l'oral sur le matériel réel. La liste exacte de ce que F. Henninot doit figer
  est dans les `notes_pilote` de `cl4` (seuils de préalarme et d'évacuation du plateau,
  périodicité de vérification des cellules, type de détecteur). Une fois écrites, ces valeurs
  engagent l'organisme — cf. « les valeurs terrain », § 6.
- **La sécurité devient récurrente, elle n'est plus seulement un bloc d'entrée.** Règle posée par
  F. Henninot : *1 h à l'ouverture, une demi-heure au début de chaque jour, 1 h avant la
  manipulation.* Traduite dans `parcours.js` par un assistant **`rappel()`** — une fiche **déjà
  vue**, reprise en tête de journée, questions comprises (la spirale) : jour 1 → `s1` (l'air qui
  manque) · jour 2 → `s4` (ce qui éclate, on ouvre des organes sous pression) · jour 3 → `cl2`
  (LIE et ATEX, c'est la journée des hydrocarbures) · avant le plateau → `s4` + `s2` + `p7`,
  soit **1 h pleine avant de toucher au fluide**. Les journées passent à 6 h 20 / 6 h 50 / 6 h 45 :
  c'est un choix assumé, la sécurité ne se prend pas sur le temps de la sécurité.

**La refonte compétences (25/07)** — le pack enseignait des thèmes, il enseigne désormais des
compétences opposables :
- le **référentiel officiel est une donnée de build** (`referentiel-2025.json`, 136 codes) : les
  libellés de l'arrêté ne sont plus recopiés à la main, ils sont **résolus et injectés** ;
- l'élève lit sur chaque fiche **« 🎯 Ce que l'examen attend de vous »** — reformulation accessible,
  marqueur théorique/pratique, ★ nouveau 2025, et le texte de l'arrêté à un clic ;
- le **bilan d'examen nomme la compétence** non acquise au lieu de renvoyer à un numéro de fiche ;
- **A1/A2/D/E sont de vrais filtres** : entrer par un menu de catégorie fixe le champ, et un
  candidat D ne reçoit plus que la moitié des questions — celles qui le concernent.

**Le produit de formation (25/07, second temps)** — le pack est devenu un outil de stage :
- **`projection.html`** : le déroulé en salle. **5 journées, 58 séquences, 426 diapositives**
  (structure refondue le 27/07 sur les modules M0→M8 du dossier, voir ci-dessous).
  La boucle est celle voulue par F. Henninot :
  on projette et on explique → la vidéo → le mini-questionnaire → on révèle → on avance.
  Les diapositives sont **générées depuis les fiches** (`build/parcours.mjs`) : une fiche
  corrigée = une projection corrigée, et **une seule relecture** au lieu de deux.
  Vue orateur (touche N) : notes d'animation + réponse attendue — la « troisième face » du
  cahier des charges. Minuteur par séquence, plein écran, navigation clavier.
- **Les questions projetées sont celles que l'élève retrouve chez lui** : tirage déterministe
  sur les codes de la séquence. C'est la spirale — vu ensemble, refait seul le soir.
- **« Ma progression »** : les 93 compétences de sa catégorie, en quatre états lisibles
  (acquise · fragile · à revoir · jamais testée), mis à jour à chaque réponse. Distingués par
  la couleur **et** par un mot, jamais par la couleur seule. Rien ne sort du navigateur.
- **Module « Préparation pratique »** (7 fiches) : manifold, station de récupération, pompe à
  vide et vacuomètre, bouteille d'azote et mano-détendeur, **ordre des vannes**, balance et
  pesée, préparation de chantier. Il ne remplace pas l'atelier, il le prépare — charte
  FrigorX : préparation ≤ 1 h, sécurité démontrée et imposée, jamais découverte.

**Le volet ILLUSTRATIONS (26/07)** — constat de F. Henninot : *« s'il n'y a pas d'image ça ne
cause pas. Le public est divers ; si je mets trop de texte écrit, je les ai perdus en dix
minutes. »* Mesuré **fiche par fiche** (et non « 42 − 16 planches », approximation fausse d'un
premier jet : une planche sert parfois deux fiches, et d'autres portent photos ou outils) :
**11 fiches de cours sur 42 n'avaient aucun visuel**.
7 planches ajoutées, en commençant **par la sécurité** (arbitrage F. Henninot : c'est le premier
bloc que voit tout stagiaire, quelle que soit sa catégorie — si on le perd là, le reste est
perdu). `s1` le double accident en 3 temps · `s2` la trajectoire du jet · `s3` brasage interdit
contre brasage juste · `s4` bouteille à ras contre volume libre · `s5` la frise des 5 étapes de
consignation · `cl3` **animation** du CO₂ qui remplit le local par le bas · `cl4` le local équipé.
- **Règle tenue : chaque visuel ajouté RETIRE du texte.** Les paragraphes de scénario que le
  schéma raconte ont été condensés. Une image qui s'ajoute au texte n'a rien réglé.
- **Méthodes volontairement variées** (demande explicite : « qu'il n'y ait pas de sensation de se
  lasser ») — séquence en 3 temps, comparaison bon/mauvais, frise numérotée, coupe animée,
  local équipé. Pas deux fiches consécutives sur le même modèle.
- **Double gain** : les schémas sont générés en **diapositives plein écran** par `parcours.mjs`
  (470 diapos contre 459). Une planche faite une fois sert la fiche ET la projection.
- **Rien de génératif** : 7 SVG faits main, 4 à 6 Ko pièce, **36 Ko au total** — le pack reste à
  624 Ko et s'ouvre en 4G. Un modèle d'image sort un rendu plausible et faux (croix du frigoriste
  inversée, manifold à trois manomètres) et flou en projection : voir [[feedback_illustrations_ia]].
- **Les 4 dernières fiches sans visuel comblées dans la foulée** : `cl2` l'axe des concentrations
  (trop pauvre · domaine d'explosivité · trop riche, et l'échelle de l'explosimètre qui s'arrête
  AVANT la LIE) · `g13` le comparatif CO₂/NH₃ aux comportements **inverses** (l'un descend,
  l'autre monte — c'est le piège de généralisation, mis en image) · `g0` **aptitude** (la personne)
  contre **capacité** (l'entreprise), la confusion la plus fréquente du métier · `p7` les quatre
  temps de la préparation de chantier. **Compteur à zéro : 42/42.**
- **Les DESSINS ANIMÉS (26/07, demande F. Henninot : « le dessin animé SVG pour finaliser les
  parties importantes, ou faire une introduction »)** — deux animations narratives, d'un cran
  au-dessus du schéma animé simple : `intro-securite.svg` (4 scènes enchaînées : ce que protège
  le reste de la formation → ce que protège CE module → les 5 dangers en cascade → la règle) sur
  le menu `m-secu`, et `s1-double-accident.svg` (la nappe monte, le technicien descend et tombe,
  le compteur passe à 1 victime, le collègue descend et tombe, 2 victimes) sur `s1`.
  ⚠️ **Règle de conception à réutiliser** : le dessin AU REPOS doit déjà être l'image FINALE, et
  l'animation ne fait que raconter comment on y arrive. Concrètement : valeurs de base = état
  final ; les éléments qui bougent portent `.mobile`, l'état final porte `.final` ; et une media
  query **`print`** retire les mobiles au lieu de tout afficher.
  ⚠️ **Cette media query était conditionnée à `prefers-reduced-motion` jusqu'au 27/07, et c'était
  une faute** : sur toute machine aux effets d'animation Windows désactivés, elle supprimait les
  animations à l'écran — c'est-à-dire la démonstration elle-même. Voir le piège du § 5.
  `secu-espace-clos.svg` (version statique en 3 vignettes) reste dans le dépôt, **non utilisée** :
  la garder sous la main pour un support imprimé, où l'animation ne sert à rien.
  **Les 3 autres planches de sécurité animées dans la foulée**, en enrichissant les dessins
  existants plutôt qu'en redessinant : `s5` la frise se trace et les 5 étapes s'allument une à
  une, l'étape 4 (le VAT, celle qui prouve) émet une onde · `s4` le soleil pulse, la bouteille
  pleine **vibre** puis les éclats jaillissent, tandis qu'à droite le liquide monte
  tranquillement dans son volume libre · `s2` le cône de jet s'ouvre, la silhouette placée dans
  l'axe s'écarte, et l'aiguille du manomètre retombe à zéro · `s3` la flamme du chalumeau
  s'allume et vacille, les fumées montent vers le visage penché, et à droite les flèches d'azote
  défilent dans le tube. **Le module sécurité est intégralement animé : les 6 visuels**
  (`s1`→`s5` + l'introduction), 76 animations au total.
  *(Le « intégralement animé » du commit précédent était faux : `s3` était restée statique et le
  contrôle en ligne l'a montré — compter les `<animate>` fichier par fichier, jamais supposer.)*
- **Pictogrammes** : trois usages à ne pas confondre — repères de fiche (libres, notre charte),
  **pictogrammes normalisés SGH / ATEX / ISO 7010** (à reproduire fidèlement, jamais réinventer :
  ce sont ceux que le stagiaire verra sur les bouteilles, donc c'est du *contenu*), équipements et
  gestes. Échantillon validé, **intégration à faire**.

**Les capsules « quelqu'un vous explique » (26/07)** — idée de F. Henninot : une voix qui explique
au lieu d'un texte à lire, en autoformation. **`CAPSULES-SECURITE.md`** contient les 5 scripts
prêts à enregistrer (60-90 s, une idée par phrase, plans calés sur les schémas ci-dessus) et la
méthode. ⚠️ **Règle n° 1 de ce fichier : aucune capsule enregistrée avant la relecture métier.**
Une vidéo est figée ; si une capsule avait été tournée la veille du 26/07, elle enseignerait
encore que le CO₂ ne prévient pas. Le pack est déjà prêt à les recevoir (champ `video` de
`parcours.js`, 4ᵉ argument de `seq()`), à héberger **hors dépôt** pour préserver les 624 Ko.
Ce qui est écarté : tout **geste technique généré par IA** (opposable s'il est faux).

**Les 3 paliers d'examen** : 🟢 Échauffement (niveau 1, seuil 60 %) · 📝 Examen blanc (mixte, 70 %)
· 🔴 Défi technicien (niveau 2, seuil 80 %).

**La boucle d'auto-formation, complète** : indice 💡 avant de répondre → correction → bloc
« 📚 Comprendre » (remédiation intégrale) → « ↩ Revoir la fiche » → bilan listant les fiches
ratées → score précédent affiché (localStorage élève, **rien ne remonte**).

---

## 3. Comment c'est fabriqué

```bash
node build/convert.mjs    # Mission F-GAZ + questions-pack.json → banque.gen.json (202 questions)
node build/build.mjs      # LA commande unique — reconstruit TOUT, voir ci-dessous
node build/planches.mjs   # contrôle des planches animées (--strict pour bloquer) — pas un générateur
node build/coffre.mjs "<code n1>"                 # → docs/coffre/ : documents chiffrés
node build/code-acces.mjs "<code n1>" "<phrase n2>"  # installe les DEUX niveaux, partout
```

> ⚠️ **`node build/build.mjs` reconstruit désormais tout, dans l'ordre.** Jusqu'au 28/07, un
> rebuild complet demandait d'enchaîner build.mjs, puis parcours.mjs, puis relecture.mjs, puis
> chiffres.mjs — à la main, à chaque session. Un chaînon oublié une fois a suffi pour que
> `chiffres.gen.js` affiche un nombre de planches faux sur `portail.html`/`dossier.html`, sans
> qu'aucun contrôle ne le voie. Il enchaîne maintenant, dans cet ordre de dépendance :
> validation + `pack.pilote.js`/`pack.eleve.js` → `profondeur.mjs` → `matrice.mjs` →
> `galerie.mjs` → `sons.mjs` → **`parcours.mjs`** (planning, projection) → **`relecture.mjs`**
> (bon à tirer) → **`chiffres.mjs`** (les compteurs) → `version.mjs` (casse-cache, voir plus
> bas). Chaque script reste appelable seul pour un besoin ponctuel — mais **le rebuild complet,
> c'est une commande, plus quatre.**

> ⚠️ **Le code d'accès se passe en argument** — il n'est écrit nulle part dans le dépôt.
> `coffre.mjs` est à relancer après toute modification d'un document du dépôt privé, sinon la
> version publiée reste l'ancienne ; il **refuse** les 85 questions, les 10 sujets et le registre
> nominatif (garde-fou en dur, pas une consigne).
>
> **Pour CHANGER les codes, utiliser `code-acces.mjs`, jamais l'édition à la main** : les
> empreintes vivent dans **trois** endroits (`moteur/portillon.js`, les 9 `code_empreinte` de
> `cartes.js`, et le chiffrement du coffre). En oublier un laisse une porte ouverte sur l'ancien.
> Enchaîner avec `node build/build.mjs` pour propager dans les packs.

### Deux niveaux d'accès (arbitrage F. Henninot, 25/07)

| | **Niveau 1** — code court, chiffres | **Niveau 2** — phrase de six mots |
|---|---|---|
| Ouvre | les 38 documents · la console formateur · la projection | **les 8 examens** du pack |
| Pour qui | direction, collègues | le formateur, en salle |
| Registre | « confidentiel sans être secret » | on ne passe l'épreuve que porte ouverte |
| Mémoire | `pilote_acces_<pack>` | `pilote_acces2_<pack>` — **clé distincte** |

**Restent libres, sans aucun code** : les fiches de cours, les 13 séries « Réviser par thème »,
« Ma progression », le module pratique. Réviser seul ≠ passer l'épreuve — c'est la raison
pédagogique du niveau 2, pas seulement une raison de sécurité.

**Étanchéité vérifiée** (25/07, dans le navigateur) : la phrase n'ouvre pas les documents, le code
court n'ouvre pas les examens, et déverrouiller le niveau 1 laisse les examens fermés.

> **Ce que chaque niveau protège vraiment.** Le coffre (niveau 1) est du vrai chiffrement
> AES-256-GCM à 600 000 itérations PBKDF2 : un code de 8 chiffres y tient ~10 minutes face à du
> matériel dédié, 13 chiffres ~2 ans, six mots plus de mille ans. Le choix de 8 chiffres au
> niveau 1 est **assumé** pour un dossier de projet — mais il vaut pour le budget, qui porte des
> rémunérations. Les portillons, eux, comparent un djb2 de 32 bits : ce sont des **rideaux**,
> contournables par collision quelle que soit la longueur du code, et les bonnes réponses sont de
> toute façon dans `pack.eleve.js` par nécessité. Allonger un code renforce le coffre, pas un
> portillon.

| Fichier | Rôle |
|---|---|
| `packs/fluides/cartes.js` | **source éditoriale — c'est ici qu'on écrit le contenu** |
| `packs/fluides/parcours.js` | **le déroulé des 5 jours + le CADRE** — aucun contenu, seulement l'ordre, les durées, le module (M0→M8) et le régime (salle · plateau · autoformation avant / pendant). Déplacer une ligne suffit à changer une séance ; le build revérifie aussitôt le total contre les 35 h. |
| `PLANNING-FORMATION.md` | **généré à chaque build** — le planning confronté au cadre, module par module. Ne jamais l'éditer à la main : un planning recopié est faux au premier déplacement de ligne. |
| `build/chiffres.mjs` → `chiffres.gen.js` | **les compteurs des pages publiques**. `dossier.html` promettait « chiffres relevés automatiquement, jamais saisis à la main » — c'était faux, et ils avaient dérivé (le portail annonçait 33 fiches pour 44, 206 questions pour 266, 270 diapositives pour 425). Les pages portent désormais des `<span data-ch="…">` que ce fichier remplit. **Ne plus jamais écrire un compteur en dur dans une page.** |
| `packs/fluides/questions-pack.json` | les questions **écrites pour le pack** (hors Mission F-GAZ), là où la banque d'origine n'interrogeait aucune des compétences ajoutées |
| `packs/fluides/referentiel-2025.json` | **le référentiel officiel, 136 codes** — copie conforme de `habilitation-fluide`, ne se modifie **que sur pièce** (texte au JO) |
| `build/referentiel.mjs` | index des codes, résolution des libellés, calcul de couverture, contrôle de synchro avec le dépôt amont |
| `COUVERTURE-REFERENTIEL.md` | **généré à chaque build** — couverture par catégorie, codes manquants, codes évalués sans fiche |
| `packs/fluides/profondeur-attendus.json` | **l'instrument de profondeur** — chaque code décomposé en notions sentinelles (motifs regex) tirées du libellé officiel. Ne s'ajuste que si la fiche enseigne la notion sous un autre mot, jamais pour verdir un chiffre |
| `build/profondeur.mjs` | mesure que chaque code cité est **tenu** — lancé par `build.mjs`, avertit sans bloquer (`--strict` pour bloquer). Corpus = contenu visible de l'élève, hors notes formateur |
| `PROFONDEUR-REFERENTIEL.md` | **généré à chaque build** — codes cités non tenus, notions absentes, motifs aveugles |
| `build/matrice.mjs` → `MATRICE-COMPETENCES.md` + `matrice.html` | **la matrice de traçabilité**, quatrième mesure : COUVERTURE dit qu'un code est *cité*, PROFONDEUR qu'il est *tenu*, la MATRICE qu'il est *enseigné ET vérifié* — seule la relecture métier dira qu'il est *bien* enseigné. Rien n'y disparaît : codes hors périmètre (13.xx, 14.xx, B et C) et questions hors référentiel y figurent avec leur statut et leur motif |
| `build/lib-version.mjs` + `build/version.mjs` | **casse-cache (28/07)** : hash du moteur + du contenu, suffixé `?v=<hash>` sur les scripts/CSS des pages écrites à la main. Change dès qu'une ligne de moteur ou de contenu change ⇒ le navigateur ne peut plus servir une version périmée. Idempotent |
| `build/convert.mjs` | sélection + niveaux + **codes de compétence** + remédiation, depuis Mission F-GAZ |
| `packs/fluides/banque.gen.json` | banque générée — **ne jamais éditer à la main** |
| `packs/fluides/pack.eleve.js` | build élève, **purgé** de la couche pilote |
| `packs/fluides/pack.pilote.js` | build formateur, **avec** les notes |
| `packs/fluides/res/svg/` | les planches (SVG faits main) |
| `packs/fluides/res/outils/` | réglette, carte d'identité fluide, base `fluides-data.js` |
| `moteur/` | moteur générique — **4 extensions documentées**, voir § 5 |

**Le build refuse de construire** si : un lien pointe vers une carte inexistante · un examen
demande plus de questions que son pool · **une note formateur se retrouve dans la sortie élève** ·
un code cité n'existe pas au référentiel · une question n'a **ni** code **ni** classement hors
référentiel · le bandeau `dc` d'une fiche **annonce un code qu'elle ne déclare pas** (c'est ainsi
que « G6 · codes 6.01 → 6.08 » promettait huit compétences pour quatre enseignées).

---

## 2 ter. Où voir ce qui est fait — le registre

**[`REGISTRE-COURS-INTERACTIFS.md`](REGISTRE-COURS-INTERACTIFS.md)** — généré par
`build/registre.mjs`, relancé à chaque `build.mjs`. **Ne jamais le modifier à la main.**

Il croise trois sources : le disque, les appels depuis les fiches, la couverture déclarée.
Et il signale ce qu'aucune liste tenue à la main ne voit :
- un cours **orphelin** — présent, mais qu'aucune fiche n'appelle : du travail que personne
  ne peut atteindre ;
- un **lien mort** — une fiche qui appelle un cours absent du disque ;
- un cours **sans couverture déclarée** : il enseigne, mais rien ne le prouve ;
- un **code inconnu du référentiel** : une faute de frappe qui ferait croire à une couverture
  qui n'existe pas.

> ⚠️ **À consulter AVANT d'annoncer ce qu'il reste à faire.** Le 31/07, deux cours ont été
> recommandés à la production alors qu'ils étaient déjà sur le disque : l'inventaire partait
> de `cartes.js`, donc de ce qui est *branché*, et un cours posé mais pas encore relié y était
> invisible. F. Henninot dépose au fil de l'eau pendant qu'on travaille — l'état du dépôt
> n'est jamais celui qu'on a mesuré dix minutes plus tôt.

---

## 3 bis. Le vocabulaire — cinq mots, et ils ne se marchent pas dessus

Tranché par F. Henninot le 31/07/2026. Avant cela, **sept formulations différentes** désignaient
la même chose dans les seuls libellés de lancement : « lancer le module », « lancer la
découverte », « lancer le simulateur », « Mission Bouteilles »… D'où l'impression, juste, que
le travail était éparpillé.

| Ce que c'est | Le mot | Exemples |
|---|---|---|
| Un schéma animé, une image | **planche** | `croix-frigoriste.svg`, `charge-limite-local.svg` |
| Un contenu à écrans où l'élève AGIT | **cours interactif** | le Tome 3, la frise vivante, la nomenclature |
| La série des grands cours du circuit | **Tome N** | Tome 1, Tome 2, Tome 3 |
| Un ou deux écrans qu'on envoie en réponse à une question | **extrait** | `?extrait=cop-calcul` |
| Le découpage horaire du référentiel | **module M0 à M8** | inchangé — c'est l'officiel |

**Trois mots sont interdits pour désigner un cours interactif**, parce qu'ils sont déjà pris :
- **« module »** → c'est le découpage M0-M8 de la formation. Un auditeur lira ça.
- **« atelier »** → c'est le plateau technique, un lieu réel où l'on manipule du fluide.
- **« capsule »** → réservé aux capsules **vidéo** (`CAPSULES-SECURITE.md`).

Et **« vidéo » ne désigne jamais un cours interactif** : pour l'élève, le mot dit « assieds-toi
et regarde » alors que tout repose sur l'inverse ; pour Qualiopi, annoncer une vidéo et livrer
une page web est un écart gratuit — d'autant que de vraies capsules vidéo existent par ailleurs.

> ⚠️ **En interne, le code dit toujours `experience`** (`parcours.js`, `type: "experience"`,
> classe `.lien-experience`, `build/parcours.mjs`). C'est volontaire : renommer coûterait une
> journée pour un gain nul, personne ne le voit. **Ce qui est figé, c'est le mot AFFICHÉ** —
> libellés, titres, galerie, portail, et tout ce qu'on présente à un auditeur.

---

## 4. Décisions déjà tranchées — ne pas les rouvrir sans raison

| Décision | Pourquoi |
|---|---|
| **Questions = Mission F-GAZ uniquement** | Les 85 questions officielles et les 10 examens blancs du dépôt privé `habilitation-fluide` **ne sortent jamais** : publier un sujet est irréversible (forks, archives, caches). |
| **Questions à seuil réglementaire écartées** | Délais de réparation, seuils de contrôle, dates d'interdiction — susceptibles d'avoir bougé avec F-Gas III, à revalider sur pièce. |
| **Mode Évaluation désactivé** | Le moteur ne sait pas appliquer les règles de composition de l'arrêté (groupe composant tiré au sort, pondération ×3/×2/×1, plancher par groupe). Les examens restent des **entraînements**. *Depuis le 25/07, le prérequis est posé* : chaque question porte son code, sa catégorie et son groupe, et `build/referentiel.mjs` expose `REGLES` (les règles de composition lues au référentiel, pas en dur). |
| **Pas de PWA / pas d'installation** | Une **page web universelle** — « tout le monde peut ouvrir une page web » (crainte iPhone fondée pour le public réel). |
| **Console formateur publiée, mais derrière le code** | `formateur.html`, `projection.html` et `pack.pilote.js` restent publics (conseils d'animation, pas des corrigés) — **mais les deux pages exigent le code d'accès depuis le 25/07**, et rien ne se télécharge avant validation. Pour verrouiller pour de bon : supprimer `formateur.html`, `projection.html` et `pack.pilote.js` du dépôt — le build les régénère en local. |
| **On ne chiffre pas le *pack* — on chiffre le *dossier de projet*** | Deux demandes distinctes du 25/07, deux réponses. **Écarté** : chiffrer le pack pour publier les sujets. Motifs — le code est **distribué aux stagiaires** par construction, donc il ne peut pas les protéger d'eux ; les **327 bonnes réponses sont déjà en clair dans `pack.eleve.js`**, obligatoirement (c'est le navigateur qui corrige) ; et un fichier chiffré publié est cloné puis archivé, donc ouvrable **pour toujours**, même après changement de code. **Retenu** : `documents.html` + `build/coffre.mjs` — les documents de travail (architecture, ingénierie, qualité, cours source) chiffrés AES-256-GCM, PBKDF2 600 000 itérations. Là le chiffrement est proportionné : ce ne sont pas des sujets, et il écarte l'indexation comme le visiteur de passage. Restent hors ligne, définitivement : **85 questions officielles · 10 sujets · registre nominatif**. |
| **PRP alignés sur Mission F-GAZ** | R-32 = 675, R-134a = 1430, R-404A = 3922, R-410A = 2088 — pas les valeurs AR5 de la réglette FRIGOLO, pour une seule vérité côté élève. |
| **Génératif interdit sur les schémas** | Aucun modèle d'image ne respecte la croix du frigoriste. Schémas = SVG faits main. Ambiance = génératif autorisé. |
| **Un seul code d'accès pour les examens ET le mode formateur — un rideau, pas un coffre** | Les 8 examens et le mode « Pilotage formateur » demandent le **même** code (donné par F. Henninot en salle). Assumé comme portillon pédagogique : les questions restent lisibles dans le code source de la page, et une empreinte se force par essais. Le code en clair n'est écrit **nulle part** — ni dans le dépôt, ni sur le site : seule son empreinte djb2 est versionnée, dans `PACK_META.code_empreinte`. Remplace l'ancien mot de passe `"prof"`, qui était en clair dans `moteur.js` (donc public). Décidé le 25/07 (F. Henninot). |
| **Le référentiel est une donnée de BUILD, jamais de runtime** | Le navigateur ne charge pas les 74 Ko du JSON : le build résout les libellés et n'injecte que les codes réellement utilisés. Une seule source, zéro divergence possible. |
| **Deux libellés par compétence, jamais un seul** | `libelle` = la reformulation accessible écrite pour l'élève ; `officiel` = le texte de l'arrêté, injecté, jamais retouché. Le public réel ne lit pas « au sens du règlement (CE) n° 1516/2007 », mais l'organisme doit pouvoir montrer le texte. |
| **Le groupe est un rangement, le code est la règle** | `dc` (G1…G13) range pédagogiquement — le voyant liquide s'apprend avec les composants. Le `code` rattache réglementairement — ce même voyant est évalué au titre de 1.05. Les deux divergent parfois : 19 questions portent un code hors de leur groupe de rangement, et c'est voulu. |
| **On ne force jamais un rattachement** | 14 questions ne relèvent d'aucun code de l'annexe II.B : elles sont marquées `hors_ref` avec leur raison, pas rattachées de force. Un faux rattachement ferait croire à une couverture qui n'existe pas. |
| **Les questions CO₂ / NH₃ ne se filtrent pas** | Leurs codes (13.xx, 14.xx) ne sont évalués ni en A1 ni en A2, mais l'annexe II.C **impose au moins une question dessus** dans ces sujets. Une question sans champ `categories` est donc servie à tout le monde — ne pas « corriger » cela. |

---

## 5. Pièges — lus dans le sang, à ne pas réapprendre

**Moteur** — 5 extensions par rapport au r408 d'origine, toutes rétrocompatibles :
`examen.niveau` (filtrage par difficulté) · bilan listant les fiches ratées · historique
`localStorage` · auto-hauteur des iframes par `postMessage` · **portillon d'accès par code**
(`acces.code_empreinte` sur une carte examen — les 8 `ex-*` le portent, les 13 séries `rev-*`
restent libres ; déverrouillage mémorisé sur l'appareil).
*(Une 6ᵉ extension — un bouton « revoir l'animation » — a été tentée puis **retirée** le 27/07 :
elle vidait les planches. Le moteur est revenu à son état d'avant, et la cause réelle du
problème d'animation était ailleurs, dans les SVG eux-mêmes — voir ci-dessous.)*

- **Les organes se PRENNENT dans la bibliothèque de symboles, ils ne se dessinent pas**
  (`C:\git\usine-contenu\bibliotheque-symboles`, 348 symboles, famille `frigo_schema`).
  Règle de son `README.md` : *« on insère ces fichiers, on ne redessine jamais un symbole à la
  main »*. Modèle à recopier : `croix-frigoriste.svg`, qui reprend la géométrie exacte du
  symbole dans un `<g transform="translate() rotate() scale()">` et l'habille de la charte
  (`#33475b`). Rappel de F. Henninot le 27/07, après un premier jet dessiné à la main.
  **Si le symbole n'existe pas, on le signale — on n'en détourne pas un autre** : il manque
  aujourd'hui le **régulateur de pression** (condensation, évaporation, carter) et la **sonde
  de contact**. Détourner `vanne_securite` aurait enseigné une forme fausse.
- 🔴 **LE PIÈGE QUI A COÛTÉ DEUX SESSIONS : le réglage Windows « Effets d'animation ».**
  Désactivé (`HKCU\Control Panel\Desktop\WindowMetrics\MinAnimate = 0`, cas de la machine de
  F. Henninot), le navigateur annonce `prefers-reduced-motion: reduce`. Nos planches le
  respectaient à la lettre : `.mobile { display:none }` **masque les personnages qui bougent**
  et `.final { opacity:1 }` **affiche l'image finale d'emblée**. Résultat exact rapporté le
  27/07 : *« je vois 2 mecs en bas, je ne vois pas la descente »*, et *« il n'y a plus aucune
  animation »* sur les gelures. **Rien n'était cassé** — la règle d'accessibilité privait
  simplement l'auteur de ses propres animations, sur toutes les planches à la fois.
  **Première correction : ÉCHEC, annulée** (commit « Retour arrière », 27/07). Le moteur
  chargeait le SVG **en ligne** après avoir retiré la règle, pour relancer l'horloge à zéro —
  ce qu'un `<img>` ne permet pas. Les planches devenaient **vides** : les éléments `.final`
  restaient à `opacity: 0`. Ce qui a réellement échoué, c'est la **vérification** — le
  navigateur piloté ne compose pas d'images, aucune animation n'y est observable, et trois
  correctifs ont été empilés sur un symptôme jamais reproduit.

  ✅ **CORRECTION RETENUE (27/07) — on change la CONDITION, pas le mécanisme.**
  Dans les **19 planches**, `@media (prefers-reduced-motion: reduce)` devient **`@media print`**.
  Rien d'autre ne bouge : ni les règles elles-mêmes, ni le moteur, ni une ligne de JavaScript.
  Le raisonnement : ces animations **portent le contenu** (la nappe qui monte, le double
  accident, la frise de consignation) — elles ne sont pas décoratives, et les recommandations
  d'accessibilité exemptent le mouvement *essentiel*. Le besoin réel derrière l'ancienne règle
  — *si l'animation ne joue pas, la planche doit rester juste* — concerne l'**impression et la
  capture** : c'est exactement ce que `@media print` couvre.
  **Mesuré sur la machine de F. Henninot, avec son réglage réel** (`MinAnimate = 0` lu au
  registre, et le navigateur y annonce bien `prefers-reduced-motion: reduce`) : les 10 planches
  à animation CSS ont retrouvé un `animation-name` actif (`spin`, `flux`, `piston`, `balaye`…)
  là où il valait `none` ; les 9 planches SMIL gardent leurs `<animate>` en `display: inline` ;
  et la seule condition média enregistrée par le moteur CSS est `print`. Ces mesures ne
  dépendent pas du compositing — c'est pourquoi elles valent, contrairement à celles du matin.
  ⚠️ **Ce qui reste non observable en session** : le déroulé visuel lui-même. Il se valide
  devant l'écran.
  ⚠️ **Risque résiduel connu** : les `.final` sont à `opacity: 0` au repos et ne deviennent
  visibles que **par** l'animation. Si SMIL ne s'exécutait pas, ces planches seraient
  incomplètes — voir le piège « valeurs de base = état FINAL » ci-dessous, qui n'est pas encore
  appliqué partout.
  ⚠️ **PC du lycée** : le réglage du poste n'a plus d'effet sur nos animations, la question ne
  se pose donc plus pour les postes stagiaires.
- **Une planche animée ne se revoit qu'en la RECHARGEANT.** Un SVG inséré en `<img>` lance
  son animation au chargement de l'image, pas quand le lecteur arrive dessus. Et **6 des
  9 planches animées sont narratives** : `begin` décalés, **aucun `repeatCount`** — elles se
  déroulent **une seule fois** puis se figent sur leur état final. Qui n'était pas devant
  l'écran à cet instant ne voit jamais l'animation, seulement l'image de fin. Ce n'est pas un
  défaut : c'est le prix du choix « au repos, le dessin est déjà l'image finale ».
  ⏭️ **Question ouverte, à décider après validation des animations** : faut-il un bouton
  « ↻ Revoir depuis le début » ? Le besoin est réel — qui arrive sur la fiche après coup ne voit
  que l'image de fin. Mais la tentative du 27/07 a cassé les planches et a été annulée.
  **Si on y revient, une seule voie** : recharger l'`<img>` en changeant son `src`
  (`?r=` + horodatage) — jamais d'injection en ligne, jamais de retrait de règle CSS. C'est
  trois lignes, et la liste des planches animées est déjà relevée au build
  (`PACK_META.svg_animes`). **Ne rien coder là-dessus tant que F. Henninot n'a pas confirmé,
  devant son écran, que les animations se déroulent.**
- **Valeurs de base d'un SVG animé = état FINAL, jamais état initial.** Si le navigateur
  n'exécute pas l'animation (impression, capture, lecteur arrivé trop tard), la planche doit
  rester **juste**. `co2-point-bas.svg` dessinait sa nappe au ras du sol et son capteur éteint :
  figée, elle faisait croire à un local sûr. Corrigé le 27/07.
- **Un schéma ne se met JAMAIS en `illus`** : la charte recadre l'illustration de tête
  (`object-fit: cover`, 340 px max) et le tronque. Les schémas passent par l'assistant
  `schema()` de `cartes.js`, qui les insère dans le corps.
- **Auto-hauteur des iframes** : mesurer `document.body.offsetHeight`, **jamais**
  `scrollHeight` → boucle d'inflation jusqu'au plafond.
- **La carte d'accueil DOIT avoir l'id `c00`** : codé en dur dans `moteur.js`.
- **Ne jamais condenser les remédiations** : la richesse de Mission F-GAZ (indice + Règle /
  Pourquoi / Exemple / Piège) est le cœur pédagogique. Un convertisseur qui tronque à
  200 caractères tue l'auto-formation.
- **Fonds Mission F-GAZ** : 17 remédiations « structurées » sont des **gabarits vides**
  (« Retenez la notion-clé demandée… ») — détectées et jetées par `convert.mjs`.
- **Vérifier le référentiel groupe par groupe AVANT de rédiger** : les codes 1.06/1.07
  (nomenclature) et 2.01 (histoire) avaient été survolés, il a fallu ajouter 2 fiches après coup.
- **Images d'ambiance** : recadrées en **1400 × 520** (rapport du bandeau), JPEG 85, ≈ 120 Ko.

**Règles de contenu, non négociables** — zéro invention chiffrée (seules valeurs autorisées :
surchauffe 5-10 K, sous-refroidissement 4-8 K, P absolue ≈ P relative + 1 bar, classes NF EN 378
avec **R-290 = A3**, CO₂ = A1, NH₃ = B2L, PRP CO₂ = 1) · **azote seul** pour toute mise en
pression · **croix du frigoriste** : détendeur gauche, compresseur droite, condenseur haut,
évaporateur bas · charte inerWeb Édu, jamais de thème sombre.

---

## 6. Ce qui reste à faire

### 🔴 EN ATTENTE DE F. HENNINOT — trois choses que personne d'autre ne peut faire

1. **Vérifier que chaque icône porte le bon nom** — ouvrir
   `packs/fluides/res/bibliotheque/_verifier-icones.html`. Les 4 planches ont été découpées
   dans l'ordre de lecture annoncé au cahier de commande ; si une planche a été composée dans
   un autre ordre, les noms se décalent **en bloc** et un cadenas s'affiche à la place d'un
   extincteur. Vingt secondes, et c'est le seul travers que le contrôle automatique ne voit pas.
2. **`amb-plateau.webp`** — la photo du plateau technique, prise sur place. Volontairement non
   générée : c'est le lieu que les stagiaires auront sous les yeux cinq jours.
3. **Trancher sur la répétition des illustrations.** Mesuré : une même illustration reste à
   l'écran **12,9 diapositives en moyenne**, jusqu'à **20 d'affilée** sur `g1b`, `g5b`, `g6b`,
   `g7b` et `g11` ; 26 fiches sur 48 dépassent 12 écrans. Piste testée et validée
   techniquement, sans produire un seul fichier : **35 des 44 schémas SVG sont animés** et
   peuvent être **figés à un instant choisi** (`pauseAnimations()` + `setCurrentTime()`,
   vérifié sur `charge-limite-local.svg` — l'image obtenue diffère réellement). En les faisant
   alterner avec l'illustration de thème, la répétition tomberait de 12,9 à ~3 écrans par
   image, et l'image **avancerait avec le propos**. Reste à choisir les instants : une planche
   de contrôle (35 schémas × 4 instants) est à produire, F. Henninot valide à l'œil.
   ⚠️ Rien ne se conclut sur une animation depuis un navigateur piloté — cette étape lui revient.

### ✅ LE SOCLE THÉORIQUE — chantier mené le 27/07

**⇒ Historique complet, arbitrages et décisions en attente dans
[`CONSIGNES-SOCLE-THEORIQUE.md`](CONSIGNES-SOCLE-THEORIQUE.md) § 7.**

Les cinq doutes de F. Henninot étaient tous fondés, et mesurés : `g1b` (le diagramme log p/h)
faisait **105 mots pour 45 min de cours** · **chaleur sensible et latente : 0 occurrence** dans
tout le pack, alors que « surchauffe » y apparaissait **97 fois** · surchauffe utile/totale : 0 ·
le code **5.05** (état sous-refroidi/saturé/surchauffé) n'était enseigné par aucune fiche, mais
seulement *utilisé* par deux fiches de manipulation · **KVP/KVL : 0**, alors que les régulateurs
de pression sont bien au référentiel (**7.02 · 8.02 · 8.07**).

**Traité** : 2 fiches créées (`g1s` chaleur sensible/latente · `g1e` surchauffe et
sous-refroidissement, qui prend enfin le code 5.05), 4 fiches développées (`g1b`, `g7b`, `g8b`,
plus `g1a` allégée), 4 planches, 16 questions. Tous les zéros ont disparu.

⚠️ **La faille de garde-fou qu'il avait révélée est fermée** : le build annonçait « profondeur
94/94 tenus » alors que `g1b` tenait son code avec 105 mots — les motifs y étaient, le sujet
n'était pas traité. `build/profondeur.mjs` mesure désormais aussi la **maigreur** (fiche de
cours portant un code théorique sous 300 mots visibles) et l'écrit dans
`PROFONDEUR-REFERENTIEL.md`. Il reste **2 fiches signalées**, à traiter ensuite : `g7` (250 mots,
code 7.01) et `g9` (276 mots, code 9.01).

⚠️ **Décision en attente, reformulée le 27/07** : la note précédente renvoyait à « trois leviers
de compensation chiffrés en commentaire dans `parcours.js` » — **ces commentaires n'y sont plus**,
la refonte sur les modules M0→M8 les a absorbés. État réel, relevé au build : le cadre des
**35 h est tenu module par module**, et les cinq journées font **6 h 50 · 6 h 50 · 7 h 05 ·
7 h 10 · 7 h 00**. Ce qui reste à trancher n'est donc plus « comment compenser », mais :
**des journées de sept heures sont-elles tenables pour le public réel ?** Si non, le levier
disponible est le basculement de séquences de `salle` vers `avant`/`pendant` (autoformation),
qui sort du volume — pas la suppression de contenu.

### ⏭️ LES PLANCHES ANIMÉES — deux suites, dans cet ordre

**1. Valider le déroulé devant l'écran.** La condition qui bloquait les animations est levée et
mesurée (§ 5), mais le déroulé visuel ne s'observe pas en session : il faut rouvrir une fiche à
schéma animé (`s1`, `s4`, le menu sécurité, `cl3`) **avec un rechargement forcé** — le navigateur
garde les SVG en cache — et dire ce qui se passe réellement.

**2. Poser le filet d'impression : valeurs de base = état FINAL.** Aujourd'hui les éléments
`.final` sont à `opacity: 0` et ne deviennent visibles que **par** l'animation ; si SMIL ne
s'exécute pas, la planche est incomplète. Le patron propre : la valeur de base porte l'état
final, et un `<set attributeName="opacity" to="0" begin="0s" dur="…"/>` masque au démarrage.
C'est un travail **sur les SVG**, fichier par fichier — 7 planches narratives concernées — et
surtout **pas** sur le moteur : c'est en touchant au moteur que la session du matin a cassé les
planches.

### ⏭️ DEMANDÉ POUR LA PROCHAINE SESSION (F. Henninot, soir du 26/07)

**1. ✅ FAIT (27/07) — le fichier « compétences × contenu × questions ».**
`build/matrice.mjs` produit **`MATRICE-COMPETENCES.md`** (versionné, donc diffable : une
compétence qui perd sa question se voit dans le commit suivant) et **`matrice.html`** (filtrable
par catégorie, par état, par mot). Lancé par `build.mjs` : il ne peut pas être oublié.
Première mesure : **94/94** compétences exigées sont **enseignées ET vérifiées** — 0 enseignée
sans question, 0 interrogée sans fiche.
- Un script, pas une saisie : les données existaient déjà (`criteres` des cartes, `code` des
  questions, `referentiel-2025.json`). Rien n'est recopié.
- **Rien n'y disparaît** : les 5 codes hors périmètre traités en information (1.09 · 13.01 ·
  13.04 · 13.14 · 14.01) et les 17 questions hors référentiel y figurent avec leur statut.
  Au passage, `convert.mjs` porte désormais le **motif** de chaque mise à part dans la banque
  (il ne vivait qu'en commentaire) : une question écartée sans raison écrite est une question
  qu'on ne sait plus défendre six mois plus tard.
- Branchements : porte du portail, carte « libre » de `documents.html` (elle ouvre la page
  filtrable, pas 107 Ko de Markdown dans le lecteur), et paragraphe du dossier de direction avec
  le compteur `tracabilite` relevé par `chiffres.mjs`.
- ⏭️ **Reste à trancher : le docx.** Le dépôt est **zéro dépendance** (aucun `package.json`,
  aucun `node_modules`) et c'est ce qui le rend reconstructible partout. Générer un docx natif
  exigerait la bibliothèque `docx` ([[feedback_docx_natif]]). Deux voies : soit `matrice.html`
  s'imprime en PDF depuis le navigateur (feuille `@media print` déjà écrite) et cela suffit au
  dossier, soit on produit le docx **hors de ce dépôt**, depuis l'usine de contenu où la
  bibliothèque est déjà là. **Ne pas installer npm ici sans arbitrage.**

**2. Une relecture de TOUTE la couverture du référentiel.**
Reprendre code par code ce que le pack prétend couvrir et vérifier que le contenu le tient
vraiment. Attention : `COUVERTURE-REFERENTIEL.md` dit qu'un code est **cité**,
`PROFONDEUR-REFERENTIEL.md` dit qu'il est **tenu** par des motifs — mais aucun des deux ne dit
qu'il est **bien** enseigné. C'est ce troisième niveau qui est demandé.
- Chantier **critique** (il engage l'organisme) : c'est le cas où un workflow multi-agents avec
  vérification adversariale se justifie — un agent par groupe de codes, puis un juge.
- ⚠️ Point d'attention né du 26/07 : le module classification avait été déclaré « hors
  référentiel » à tort alors que **1.08** le couvrait mot pour mot. Chercher d'abord les
  **rattachements manqués** (contenu enseigné mais non déclaré), pas seulement les trous.

**3. Le système de POLICE ADAPTABLE — oublié, et il manque vraiment.**
Constat vérifié le 26/07 : **rien n'existe**. `moteur/charte-edu.css` fige `Calibri 16px` avec
`line-height:1.6`, et l'élève n'a aucun moyen d'y toucher. Or le public visé est FLE/DYS
([[feedback_accessibilite_cap]]) : c'est exactement celui pour qui la typographie décide si le
texte est lu ou abandonné.
- **Ce qu'il faut** : un réglage dans la barre du haut, mémorisé en `localStorage` comme le
  reste, agissant sur `<html>` par des variables CSS — taille (3 crans), **police** sans
  empattement plus lisible, **interlignage** élargi, et peut-être un **fond crème** (réduit
  l'éblouissement, aide une partie des lecteurs DYS).
- ⚠️ **Arbitrage à poser avant de coder : PAS d'OpenDyslexic embarquée.** Cette police coûterait
  50 à 100 Ko de fichier — sur un pack qui tient à 626 Ko et s'ouvre en 4G, c'est cher — et son
  bénéfice est **discuté** par la recherche. Les recommandations solides portent sur autre chose :
  police sans empattement **déjà présente sur tous les appareils** (Verdana, Arial), corps plus
  grand, interligne ≥ 1,5, texte **non justifié**, espacement des lettres légèrement augmenté.
  Gratuit en poids, et mieux étayé. À confirmer avec F. Henninot.
- **Portée** : le réglage vit dans le **moteur générique**, donc il profiterait aussi à
  [[project_inerweb_pilote]] et au pack r408 — le poser proprement, pas en rustine sur ce pack.
- Ne pas oublier `projection.html` : en salle, le besoin est inverse (très gros texte, lu de loin).

### 🔴 Priorité 1 — la relecture métier (bloquant pour la diffusion)

Personne n'a relu le contenu avec un œil de frigoriste : **26 fiches, 5 exercices,
209 questions** avec leurs indices et remédiations. **Dont 7 fiches écrites le 25/07** et jamais
relues (`g0`, `g1d`, `g6b`, `g7b`, `g8b`, `g9b`, `g12b`), **et le comblement du 25/07 soir** :
13 fiches enrichies (`g1a`, `g1c`, `g3`, `g4a`, `g5a`, `g5b`, `g6`, `g6b`, `g8`, `g11`, `g12`,
`p7`, `g13`) + 29 questions `pk-q-*` — rédigés par IA sous règles strictes (zéro invention
chiffrée, vérification adversariale), jamais vus par un humain.

**S'y ajoutent les deux blocs d'accueil du 26/07, écrits dans les mêmes conditions et non
relus** : les 5 fiches de sécurité (`s1`→`s5`, 3 questions `pk-s5-*`) et les 4 fiches de
classification (`cl1`, `cl2`, `cl3`, `cl4`, 12 questions `pk-cl*`). Ce sont les fiches les plus
sensibles du pack — elles portent sur ce qui blesse ou tue la personne. Deux relectures
adversariales par IA ont déjà tourné dessus et ont trouvé **deux erreurs graves** (les signes
de l'exposition au CO₂, l'inertie prêtée aux fluides fluorés) plus un **rattachement au
référentiel entièrement faux** : cela dit assez qu'un œil humain reste indispensable.

Points à trancher par un frigoriste, remontés par ces relectures :
- l'absence d'**odorisant** dans le R-290 de qualité frigorifique (`cl2`) ;
- le fait qu'aucun fluide courant du parc ne relève des cases **B2 / B3** (`cl1`) ;
- le double mécanisme du **CO₂** et l'insuffisance d'un détecteur d'oxygène seul (`cl3`) ;
- ~~incohérence de schéma~~ — **tranchée et faite le 26/07 (F. Henninot)**. La planche
  `res/svg/classes-securite.svg` montrait **6 cases** (colonnes 1 · 2L · 3), **B1 marqué « — »**
  et, pour le CO₂, « danger = **la** pression » — soit l'erreur même que le module venait de
  corriger partout ailleurs. Elle est **redessinée en 2 × 4 = 8 cases** : colonne « 2 » ajoutée
  (A2 = R-152a), **B1 = R-123**, B2 et B3 grisées et libellées « aucun fluide courant » avec une
  légende qui l'assume, et A1 porte désormais « pression, anoxie ». Elle est **affichée sur `cl1`**,
  jusque-là seule fiche « matrice » sans schéma, et reste sur `g11` et `g12` : **une seule
  matrice dans tout le pack**. Rendu vérifié (8 cases, aucun débordement de texte, ratio tenu).

→ Ouvrir [`relecture.html`](https://frigorx.github.io/pilote-fluides/relecture.html), annoter
les ✏, renvoyer les corrections. Elles se reportent dans `packs/fluides/cartes.js` (fiches) ou
`build/convert.mjs` (questions : `CORRECTIONS` ou retrait de la sélection).

Le document de relecture affiche désormais, pour chaque fiche, **les compétences qu'elle prétend
couvrir** — libellé de l'arrêté + reformulation élève. C'est là que porte l'essentiel du travail :
l'écart entre ce que le code exige et ce que le contenu enseigne vraiment.

Cet écart est désormais **mesuré et gardé** : `PROFONDEUR-REFERENTIEL.md` liste les codes cités
sans être tenus. Les 22 trous du 25/07 sont **comblés** (94/94 tenus) ; la mesure tourne à chaque
build et signalera toute régression. Rappel : 12.03 (calcul de charge inflammable) est enseigné
en **méthode seule** — les valeurs sont dans la NF EN 378, à ne citer que sur pièce.

**Question ouverte du § 6 précédent — RÉPONDUE le 25/07, sur mesure et non à l'intuition :**
- le **glissement des zéotropes** était bien traité (3 mentions, charge en phase liquide) ;
- les **huiles** ne l'étaient **pas du tout** : zéro occurrence de POE, minérale ou retrofit, alors
  que les fiches déclaraient couvrir 5.04, 5.08, 6.01 et 6.05. Le code était revendiqué, le contenu
  ne le tenait pas. **Comblé** dans `g5b` (minérale / POE, non-miscibilité, hygroscopie de la POE,
  huile contaminée = déchet dangereux, cas des hydrocarbures) ;
- au-delà de ces deux pistes, la mesure a révélé **38 codes A1 non couverts**, dont les 25 gestes
  des groupes 6 à 9 — ceux du **groupe tiré au sort**, donc certains de tomber. Tous comblés.

### 🔴 Priorité 1 bis — les valeurs terrain (personne d'autre ne peut le faire)

Tout le contenu pratique renvoie à « selon la fiche constructeur, à faire valider » : **pression
d'épreuve à l'azote, niveau de vide visé, durée de tirage, débit de balayage, couples de serrage,
taux de remplissage d'une bouteille**. C'est rigoureux — on n'invente aucun chiffre — mais pour un
stagiaire c'est frustrant, et pour le module pratique c'est un squelette.

Ces nombres sont sur le plateau du LP et dans la pratique de F. Henninot, pas dans un texte.
**Tant qu'ils ne sont pas figés, le module pratique reste au niveau du geste et de l'ordre.**
Les figer, c'est aussi les rendre opposables : une fois écrits, ils engagent l'organisme.

Manque aussi, et pour la même raison : des **photos du matériel réel** (manifold, station de
récupération, mano-détendeur). Pour un public FLE/DYS, une photo du vrai appareil vaut trois
paragraphes ; les SVG sont bons pour les principes, pas pour reconnaître un objet.

### 🟠 Priorité 1 quater — deux livrables à valider

- **`VIDEOS-PRESELECTION.md`** — 11 sujets sur 13 pourvus, chaque titre et chaque durée relevés
  sur la fiche de la vidéo, pas de mémoire. Rien n'est intégré au pack : **à visionner
  intégralement avant tout usage**. Deux sujets sans proposition : la réglementation F-Gas (rien
  au bon format) et la nomenclature des fluides (seule ressource trouvée antérieure au règlement
  de 2024).
- **`packs/fluides/res/photos/CATALOGUE.md`** — 4 photos d'atelier intégrées au module pratique
  (manifold branché, pompe à vide, vacuomètre, balance). Elles viennent des séquences CAP IFCA
  26-27 et **leur origine reste à confirmer** : ce dépôt est public. Si l'une provient d'une
  documentation constructeur, elle doit être retirée.
  Les **31 visuels AFPA** (dont 5 photos de matériel) n'ont **délibérément pas été repris** :
  extraits de supports de 2009-2011, droits non détenus. Utilisables en interne, pas ici.

### 🟠 Priorité 1 ter — décisions éditoriales ouvertes par la refonte

- **Les 14 questions hors référentiel** — section « 2 bis » de `relecture.html`, chacune avec trois
  cases : garder (culture métier), retirer, ou rattacher à un code jugé légitime. Ce sont surtout
  la **nomenclature des fluides** (8 questions : que signifie HFC, le « a » de R-134a, composition
  du R-410A…), trois **gestes mécaniques** hors annexe II.B (cintrage, dudgeonnage, raccord
  Schrader) et trois questions **ammoniac** rangées à tort en G13 (CO₂).
  La nomenclature est un savoir-outil indispensable — mais l'annexe II.B ne l'évalue pas comme
  telle. À vous de trancher : c'est une décision pédagogique, pas technique.
- ~~**Deux codes évalués sans fiche qui les enseigne** : `1.09` et `13.14`~~ — **résolu le
  25/07 soir** : `g13` enrichie (pressions élevées du CO₂ sans valeur chiffrée, log p/h,
  glace carbonique, sécurité de site) et déclare désormais les deux codes, en information.

### 🟠 Priorité 2 — à décider (ne pas engager sans arbitrage)

- **Basculer sur la vraie banque pédagogique** (les ~70 questions tirées des 14 chapitres du
  dépôt privé) : elles nourrissent aussi les examens blancs du dispositif PR-02 — les publier
  affaiblirait ces examens. `convert.mjs` peut avaler un autre fonds, c'est un fichier à changer.
- **Suivi formateur via le collecteur universel** : remontée de données élèves → décision RGPD.
  L'argument actuel « tout reste dans le navigateur » est précieux, ne pas le sacrifier par réflexe.
- **Mode Évaluation conforme à l'arrêté** : gros chantier moteur (tirage du groupe composant,
  pondération, plancher par groupe). N'a de valeur que le jour où le centre d'examen existe.

### 🟢 Priorité 3 — confort

- 2 illustrations d'ambiance manquantes (sécurité brasage, hydrocarbures) — voir
  `packs/fluides/res/img/CATALOGUE.md`.

---

## 7. Contexte à connaître

- **Projet parent** : `C:\git\habilitation-fluide` (privé) — le dispositif de certification
  complet, les 14 chapitres source, les procédures PR-01→05. Son `REPRISE.md` est le point
  d'entrée de ce chantier-là.
- **Moteur d'origine** : `github.com/frigorx/r408` — ne pas y pousser les extensions faites ici
  sans arbitrage (elles sont rétrocompatibles mais spécifiques à ce pack).
- **Atelier numérique relié** : 11 outils déjà publiés (FRIGOLO, KP1/KP5, Diagramme
  Enthalpique+, TP manomètres, CERFA/FI/BSD…) — tous listés dans `portail.html`.
- **Sources de contenu** : Mission F-GAZ (`frigorx/inerweb-fgaz`, public) pour les questions ;
  réglette FRIGOLO pour les tables P/T et les PRP ; bibliothèque de symboles
  (`C:\git\usine-contenu\bibliotheque-symboles`, 348 symboles) pour les schémas.

---

*F. Henninot · inerWeb Édu — arrêté du 21 novembre 2025, règlement (UE) 2024/573.*

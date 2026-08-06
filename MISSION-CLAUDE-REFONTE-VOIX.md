# Mission Claude — refonte des voix de Pilote Fluides

## Statut au 6 août 2026

Cette mission a été exécutée dans le clone par Codex. Ne pas recommencer la refonte ni remplacer
le moteur par une autre solution sans défaut constaté lors de l'écoute. L'état livré est :

- couche partagée `moteur/voix.js` branchée sur les 17 surfaces vocales ;
- corpus de 660 narrations et index lié au texte exact ;
- lot MP3 local Piper / `fr_FR-siwis-medium`, avec repli navigateur ;
- tests, sources et procédure dans `build/voix/` et `packs/fluides/res/voix/README.md`.

Le lot est un brouillon d'écoute dans le clone. Il ne devient narration officielle, ne part sur
GitHub et n'entre dans le RAG qu'après le bon à tirer explicite de Franck Henninot. Les consignes
ci-dessous restent le contrat d'audit et de maintenance à transmettre à Claude.

## Consigne prête à transmettre

Tu interviens uniquement dans la copie de travail indépendante suivante :

```text
C:\git\pilote-fluides-codex-travail
```

Branche attendue :

```text
codex/mise-a-conformite-globale
```

Ne modifie pas, ne synchronise pas et ne pousse pas automatiquement :

```text
C:\git\pilote-fluides
https://github.com/frigorx/pilote-fluides
```

Le dépôt GitHub vivant reste la version canonique. La copie ci-dessus est un laboratoire de
travail. Aucun déploiement, aucune fusion et aucune indexation RAG ne sont autorisés avant le bon
à tirer explicite de Franck Henninot.

## Objectif utilisateur

Le problème prioritaire de Franck est le suivant :

> Les voix actuelles ne sont pas conformes, manquent de cohérence et sont désagréables à écouter.

La mission n'est donc pas de changer arbitrairement un nom de voix. Il faut construire une
expérience vocale cohérente, calme et utilisable par un public débutant, FLE ou DYS, tout en
conservant le fonctionnement hors ligne et la totalité du contenu écrit.

La refonte ne sera considérée comme réussie qu'après un essai d'écoute et l'aval humain de
Franck. Une voix techniquement fonctionnelle mais pénible à écouter ne constitue pas une
livraison acceptable.

## Documents à lire avant de modifier le code

Lire dans cet ordre :

1. `README.md` ;
2. `REPRISE.md` ;
3. `CHARTE-GRAPHIQUE.md` ;
4. `C:\git\usine-contenu\00-charte\CHARTE-GRAPHIQUE-INERWEB.md` ;
5. le HTML, le CSS et le JavaScript de chaque mini-système migré.

Ne pas confondre une règle cible avec un comportement historique observé dans le code.

## Diagnostic déjà établi

Le pack contient 18 cours interactifs. Seize d'entre eux possèdent leur propre contrôleur de
synthèse vocale. Le moteur principal possède en plus `moteur/lecture.js`. Il existe donc
actuellement 17 implémentations vocales distinctes.

Les fichiers concernés sont :

```text
moteur/lecture.js
packs/fluides/res/bilan-thermique-performance-interactif/app.js
packs/fluides/res/chaine-intervention-interactive/app.js
packs/fluides/res/chaleur-circuit-interactif/app.js
packs/fluides/res/chaleur-interactive/app.js
packs/fluides/res/circuit-organe-par-organe/app.js
packs/fluides/res/condenseur-interactif/app.js
packs/fluides/res/cours-classes-securite/index.html
packs/fluides/res/etancheite-interactive/app.js
packs/fluides/res/evaporateur-interactif/app.js
packs/fluides/res/frise-vivante/frise-vivante.js
packs/fluides/res/hydrocarbures-a1-a2/app.js
packs/fluides/res/intervention-hydrocarbures-interactive/app.js
packs/fluides/res/mission-bouteilles/app.js
packs/fluides/res/nomenclature-interactive/nomenclature.js
packs/fluides/res/pression-temperature-interactive/app.js
packs/fluides/res/tome-3-technologie-organes/app.js
```

Les modules `froid-clim-academie` et `vanne-service-interactive` n'utilisent pas actuellement
`speechSynthesis`. Ne pas leur ajouter une voix sans besoin pédagogique validé.

Écarts déjà constatés :

- sélection de voix répétée et différente selon les modules ;
- résultat dépendant des voix installées sur l'appareil ;
- vitesses allant de `0,75×` à `1,25×`, avec des vitesses fixes dans certains modules ;
- commandes Écouter, Pause, Reprendre et Arrêter non homogènes ;
- préférence de voix et état actif/coupé non partagés ;
- protection `speechRun` et arrêts de sécurité absents de quelques anciens modules ;
- textes visibles parfois envoyés tels quels à la synthèse, sans véritable adaptation orale ;
- voix du navigateur utilisée comme si elle pouvait garantir une narration identique, ce qui
  est impossible d'un appareil à l'autre.

## Architecture cible

### 1. Un seul moteur vocal partagé

Créer un contrôleur commun, local et sans dépendance distante, par exemple :

```text
moteur/voix.js
```

L'API peut être exposée par `window.PiloteVoix`. Elle doit au minimum permettre de :

- détecter la disponibilité de la synthèse vocale ;
- charger les voix de manière asynchrone avec `voiceschanged` ;
- lister les voix françaises disponibles ;
- sélectionner automatiquement la meilleure voix `fr-FR` ;
- permettre un choix manuel après écoute d'un échantillon ;
- lire un texte avec des callbacks contrôlés ;
- mettre en pause, reprendre et arrêter ;
- changer la vitesse ;
- connaître l'état courant : inactif, lecture ou pause ;
- invalider tous les anciens callbacks avec un jeton de lecture ;
- arrêter la lecture lorsque la page est quittée ou cachée.

`moteur/lecture.js` doit conserver son API publique `PiloteLecture` pour ne pas casser le moteur
principal, mais devenir un adaptateur léger vers `PiloteVoix`.

Chaque mini-système conserve sa logique pédagogique locale : navigation, `autoplay`,
`voiceSteps`, déplacement des contrôles et enchaînement des écrans. Il délègue seulement la
sélection, la lecture et l'état technique de la voix au moteur partagé. Ne pas centraliser les
quiz ou la navigation pendant ce chantier.

### 2. Préférences globales cohérentes

Prévoir une préférence commune à tout le pack :

- voix choisie, sous forme d'identifiant textuel seulement ;
- vitesse choisie ;
- voix active ou coupée si cette décision est retenue dans l'interface finale.

Les accès à `localStorage` doivent tous être protégés par `try/catch`. Ne jamais stocker un objet
`SpeechSynthesisVoice`, un fichier audio, un blob ou une donnée nominative.

Si l'identifiant mémorisé n'existe plus sur l'appareil, revenir automatiquement à la meilleure
voix française disponible sans bloquer le cours.

Vitesse recommandée par défaut : `0,95×`. Conserver quelques crans utiles et présenter les
valeurs avec une virgule française. Ne jamais accélérer une narration uniquement pour la faire
tenir dans l'écran.

### 3. Interface identique

Employer les mêmes états dans tous les modules :

| État | Libellé principal |
|---|---|
| inactif | Écouter |
| lecture | Pause |
| pause | Reprendre |

Un bouton Arrêter séparé peut être conservé lorsqu'il est déjà nécessaire au module, mais son
comportement doit être identique partout. Tous les boutons doivent être utilisables au clavier,
au toucher et disposer d'un état ARIA correct.

Le chargement d'une page ne doit jamais déclencher une voix. Une narration peut commencer après
un clic sur `Écouter` ou `Commencer le cours`. Cette autorisation vaut uniquement pour le parcours
en cours.

### 4. Textes écrits et scripts oraux

Le texte visible reste la source métier. Le champ oral peut reformuler pour rendre l'écoute plus
naturelle, mais il ne doit ajouter aucune valeur, règle, consigne de sécurité ou information
absente de l'écran.

Pour chaque module migré, contrôler notamment la prononciation de :

- `F-Gas` ;
- `R-290`, `R-32` et les autres désignations de fluides ;
- `CO₂`, `NH₃`, `A1`, `A2L` et `A3` ;
- températures négatives ;
- pressions, masses, pourcentages et unités ;
- sigles et abréviations métier.

Préférer des phrases courtes, un ordre direct et une ponctuation qui crée de vraies pauses. Ne
jamais remplacer le texte affiché par une narration cachée.

## Qualité réelle de la voix : décision obligatoire

La synthèse `speechSynthesis` du navigateur ne peut pas garantir la même voix ni la même qualité
sur tous les appareils. L'harmonisation du code supprimera les incohérences, mais elle ne suffit
pas à garantir une voix agréable.

Commencer par créer une petite page de comparaison réservée à l'auteur, par exemple :

```text
outils/laboratoire-voix.html
```

Cette page doit :

- afficher uniquement les voix françaises disponibles ;
- indiquer leur nom, langue et caractère local ou distant lorsqu'il est connu ;
- lire le même court extrait métier avec chaque voix ;
- permettre de comparer `0,90×`, `0,95×` et `1,00×` ;
- inclure les termes difficiles listés ci-dessus ;
- permettre à Franck de désigner explicitement la voix acceptable ;
- fonctionner sans CDN ni bibliothèque externe.

Ne pas choisir à la place de Franck. Ne pas migrer les 16 modules avant cette écoute pilote.

Si aucune voix du navigateur n'est acceptable, adopter l'architecture hybride suivante après
validation humaine :

1. narration préproduite, stable et stockée localement pour les scripts métier validés ;
2. synthèse du navigateur uniquement comme solution de secours ou pour un texte encore mouvant ;
3. texte visible complet dans tous les cas ;
4. aucun service distant nécessaire pendant la formation ;
5. chargement différé des fichiers audio afin de conserver un démarrage léger.

Ne produire aucune narration enregistrée ou générée en série avant :

- validation métier du texte par Franck ;
- choix et validation de la voix sur un échantillon ;
- accord sur le poids et le format du lot audio ;
- définition d'une méthode pour invalider un audio lorsque son script change.

## Ordre de réalisation

### Lot 1 — laboratoire et socle

1. Relever l'état exact de chaque implémentation sans modifier les données métier.
2. Créer le laboratoire vocal.
3. Créer `moteur/voix.js` et ses tests techniques.
4. Faire valider par Franck une voix et une vitesse sur des phrases métier représentatives.

Arrêt obligatoire après le point 4 si aucune voix n'est jugée agréable. Dans ce cas, proposer le
prototype audio local hybride avant toute migration générale.

### Lot 2 — pilote sur deux surfaces

Migrer seulement :

1. les fiches du moteur principal via `moteur/lecture.js` ;
2. `chaine-intervention-interactive`, qui représente un parcours narratif complet.

Vérifier l'écoute, la navigation, les interruptions et le fonctionnement hors ligne. Faire
valider le résultat avant de continuer.

### Lot 3 — migration module par module

Migrer les autres contrôleurs un par un. Après chaque module :

- exécuter ses tests ;
- vérifier le quiz et la progression jusqu'au bilan ;
- contrôler qu'aucune ancienne voix ne continue après une navigation ;
- incrémenter son casse-cache si sa page HTML le gère manuellement ;
- consigner le module terminé dans le compte rendu de migration.

Les modules avec narration synchronisée (`chaleur-interactive` et
`pression-temperature-interactive`) doivent être migrés en dernier, car leurs `voiceSteps`
pilotent des contrôles et exigent une vérification spécifique des callbacks.

### Lot 4 — documentation et nettoyage

Après migration validée :

- mettre à jour `REPRISE.md` et la documentation de charte réellement concernée ;
- documenter les nouvelles clés de stockage ;
- supprimer les anciens sélecteurs et utilitaires vocaux devenus inutiles ;
- vérifier par recherche qu'il ne reste pas d'appel direct accidentel à `speechSynthesis` dans
  les modules migrés ;
- conserver les scripts oraux dans leur source éditoriale existante ;
- ne pas modifier les fichiers générés à la main.

## Règles techniques non négociables

- HTML, CSS et JavaScript statiques ; aucune dépendance externe.
- Fonctionnement complet sans réseau, sans voix et sans stockage local.
- Une seule lecture vocale active dans toute la page.
- `speechSynthesis.cancel()` avant toute nouvelle lecture.
- Jeton de génération pour neutraliser les anciens `onstart`, `onend` et `onerror`.
- Les erreurs `canceled` et `interrupted` ne déclenchent pas d'alerte.
- Arrêt au changement d'étape, redémarrage, bilan, sortie, changement de page et onglet caché.
- `lang = "fr-FR"`, `pitch = 1` et vitesse choisie explicitement.
- Aucune information uniquement sonore.
- Aucun lancement automatique au chargement.
- Aucun changement de contenu métier, de seuil de quiz, de progression ou de schéma pendant cette
  refonte.
- Aucun push, déploiement, fusion ou mise à jour du RAG sans ordre explicite de Franck.

## Tests d'acceptation

La mise à jour n'est terminée que si les contrôles suivants sont documentés :

1. ouverture de chaque page sans voix automatique ;
2. Écouter, Pause, Reprendre et Arrêter ;
3. changement de vitesse pendant la lecture ;
4. choix d'une voix, rechargement de la page et restauration de la préférence ;
5. voix mémorisée devenue indisponible ;
6. changement d'étape pendant une phrase ;
7. clic rapide sur plusieurs étapes ;
8. sortie, bilan, redémarrage et onglet caché pendant la lecture ;
9. navigateur sans `speechSynthesis` ;
10. `localStorage` indisponible ;
11. fonctionnement hors ligne ;
12. clavier et commandes ARIA ;
13. parcours complet et quiz inchangé ;
14. test aux formats `1024 × 768`, `1280 × 720`, `390 × 844` et `360 × 640` ;
15. écoute humaine sur Edge et Chrome avec la machine de Franck.

Pour les modules synchronisés, vérifier en plus que chaque contrôle reçoit sa valeur avant la
phrase correspondante et qu'une ancienne fin de phrase ne lance jamais l'étape suivante.

## Preuves à remettre

Claude doit livrer :

- la liste exacte des fichiers modifiés ;
- le tableau avant/après des 17 implémentations ;
- les choix d'architecture et les clés de stockage ;
- le résultat des tests automatiques et manuels ;
- les écarts restant à traiter ;
- le poids ajouté si des fichiers audio locaux sont retenus ;
- un diff relisible, sans modifications métier ou graphiques parasites ;
- un état Git propre ou la liste explicite des changements non commités.

Ne jamais conclure « voix conformes » sans l'écoute et l'accord explicite de Franck.

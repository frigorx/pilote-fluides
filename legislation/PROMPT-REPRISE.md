# PROMPT-REPRISE — le réseau Législation

> **À LIRE EN PREMIER** dans toute nouvelle session sur ce chantier.
> Ouvert le 23/08/2026. Tout ce qu'il faut pour reprendre est ici.
> La vérité du réseau technique voisin reste le `REPRISE.md` à la racine du dépôt
> (section du 23/08) ; ce fichier-ci est la vérité DU RÉSEAU LÉGISLATION.

## Ce que c'est

Un **deuxième réseau** de cours inerWeb, **niveau BTS**, sur la réglementation, la
sécurité et l'environnement. Né d'un besoin de F. Henninot : désengorger le plan
technique (15 lignes, 108 stations) au lieu d'y empiler des stations.

## Les six décisions de F. Henninot — cadre non négociable

1. **Réseau de réseaux.** Une entrée n'est pas une station terminale, c'est la
   **tête d'une sous-ligne** qui descend (« l'acoustique, c'est une ligne ;
   l'incendie, c'est une ligne »).
2. **Maillage.** Les sous-réseaux se répondent entre eux, pas seulement vers le
   réseau technique. Son exemple fondateur : Électrique ⇄ Risques professionnels,
   par l'habilitation et les EPI. « Une carte mémoire avec des interactions. »
3. **« Presque un autre site. »** La Législation ne se mélange PAS à la
   thermo-techno. D'où l'architecture SATELLITE (voir plus bas) — c'est la
   décision structurante du chantier.
4. **Création libre.** « Tu es assez doué pour faire mieux que le livre. » Le
   sommaire du manuel photographié n'est qu'une **ossature de chapitres** ; rien
   n'est recopié, le découpage en stations est une conception maison.
5. **La DESP est indépendante et transversale.** Pas un sous-chapitre de la
   fluidique : une sous-ligne à part entière, « au même titre que l'incendie et
   l'acoustique ». Elle touche aussi l'incendie (sprinkler et RIA : réseaux d'eau
   sous pression, lot CVC de bureau d'études).
6. **Projet inerWeb** (pas scolaire) → logo inerWeb. *(La question se repose à
   chaque nouvelle production, même quand le cas paraît évident.)*

## Architecture — le satellite

`legislation/index.html` se comporte comme les satellites existants
(`sous-tension`, `qcm-travail-hauteur`), pas comme une page du site :

- identité propre dans l'en-tête (« inerWeb Législation »), **aucun menu du site
  technique** — une seule passerelle, « ⇄ Le réseau thermo-techno » ;
- `lisibilite.js` et `marque.js` chargés **en absolu** depuis
  `https://inerweb.fr/moteur/` (règle du 20/08 : une source, zéro divergence) ;
  le pied de page et la licence viennent de là ;
- liens sortants en absolu ;
- **le dossier doit rester déplaçable d'un bloc** vers un dépôt ou un
  sous-domaine séparé, sans rien casser ;
- il n'entre PAS dans `PAGES` de `build/version.mjs` (commentaire posé là-bas) ;
- `noindex`, hors sitemap, tant que le réseau est en construction.

## État au 23/08/2026

**Le plan : 2 lignes mères · 11 sous-lignes · 57 stations — 56 en préparation
(pastille en pointillé, aucun lien) et 1 ouverte** (F-Gaz 3, voir plus bas).
Mesuré sur la page servie : 144 textes, **0 chevauchement**, 0 débordement du
cadre, console vide.

> **Le réseau n'est atteignable qu'en tapant son URL** : rien, sur le site
> principal, ne pointe vers `/legislation/`. C'est voulu tant qu'une seule
> station est ouverte — voir le point d. plus bas.

- 📜 **LES RÉGLEMENTATIONS** (#1e40af) — 8 têtes : Thermique 6 · Acoustique 5 ·
  Incendie 6 (dont Sprinkler & RIA) · Électrique 6 · Fluidique & thermique 4 ·
  **La DESP 5** · Certifications & normes 4 · Droit du travail 5.
- 🦺 **SÉCURITÉ & ENVIRONNEMENT** (#166534) — 3 têtes : Risques professionnels 6 ·
  Déchets 5 · Impact environnemental 5.
- **14 anneaux de correspondance**, dont 6 paires de maillage interne listées
  sous le plan.

**Une station a son fond écrit et VALIDÉ par F. Henninot** :
`stations/fgaz-3/FOND.md` — 8 écrans + 4 questions. C'est le **gabarit** des 56
autres.

## Le rail de production — à suivre pour CHAQUE station

1. **Code** : rédiger le fond dans `stations/<slug>/FOND.md` (objectif, écrans,
   questions, maillage, consignes Design en fin de document) → **faire valider
   par F. Henninot**. Rien ne part avant.
2. **Design** : envoyer le fond validé + la charte en **une seule demande cadrée**
   (annoncer le coût estimé avant). Sortie **HTML/SVG, jamais bitmap**.
3. **Code** : transposer au format maison, la station devient cliquable — lui
   donner un `href` et reprendre le motif `station()` complet du plan principal
   (lien, trajet, coche) à la place de la pastille en pointillé.

## ✅ LA PREMIÈRE STATION EST OUVERTE — F-Gaz 3, 23/08

Le rail a été déroulé en entier sur la première station. **57 stations, dont
1 ouverte.** Elle vit dans le dépôt et nulle part ailleurs :

    legislation/stations/fgaz-3/
      index.html   8 écrans + 4 questions + le maillage
      styles.css   feuille autonome (le dossier reste déplaçable d'un bloc)
      svg/         6 schémas : frise, phase-down, conversion, deux régimes,
                   aptitude + les 7 catégories, raisonnement du technicien
      FOND.md      le fond validé, mis à jour des arbitrages du 23/08

Le plan (`index.html`) a gagné **`stationOuverte()`** : même géométrie que la
pastille en préparation — l'œil ne doit pas se réhabituer — mais pastille pleine,
nom souligné, et un lien. Compteur et légende suivent.

**Vérifié sur le site local**, pas sur le code : console vide, plan → station en
200, aucun débordement de 1265 px à 375 px, et **0 chevauchement sur les 110
textes** des 6 SVG (mesure en `getBoundingClientRect`, jamais `getBBox`).

### Les quatre arbitrages de F. Henninot (23/08)

1. **Sept catégories d'aptitude, pas six** — V ajoutée d'après
   `referentiel-2025.json`, encadrée en pointillé (référentiel distinct II.D).
   Le fond a été corrigé en conséquence.
2. **HTML simple, pas `.dc.html`** — la page se lit et s'exporte, elle n'est pas
   cliquable-éditable dans l'éditeur Design. Choix assumé : le format à runtime
   de Design aurait compliqué la transposition.
3. **Rapatrier ET rendre cliquable** dans la foulée, sans attendre la relecture.
4. **Auditer les SVG du pack sans les corriger** → `AUDIT-SVG-DEBORDEMENTS.md`
   à la racine : 19 fichiers sur 198 débordent dès que Calibri manque, contre 10
   sur un poste Windows. `aptitude-capacite.svg` du pack garde son défaut ; seule
   la copie de la station est saine.

### 🔊 La station est PARLÉE et navigable (repris le 23/08, même journée)

Première version : une page qui défilait, sans voix. **C'était une erreur de
cadrage** — F. Henninot a rappelé que la voix est le cœur de l'idée : « un prof
qui explique chaque écran ». Repris le jour même.

**La voix ne demande AUCUN service tiers.** `moteur/voix.js` le dit en clair :
« un texte modifié ou absent de l'index retombe sur la voix du navigateur : le
cours ne dépend donc jamais du lot audio ». La station n'a aucun audio fabriqué,
elle parle donc entièrement en `speechSynthesis`. Le feu vert « service tiers »
que j'avais réclamé n'avait pas lieu d'être.

- **12 écrans navigables** (8 écrans + 4 questions), un seul à la fois, barre
  d'outils collante : Écouter · Arrêter · progression · Précédent · Suivant.
- **Une narration propre à chaque écran** (`data-narration`, 778 mots ≈ 4 min à
  2,89 mots/s) : elle explique **ce que l'on voit**, elle ne relit pas le texte.
- **`prof-vocal.js` s'active** (il cherche `#listen` et `#next`) et enchaîne les
  écrans tout seul, en s'arrêtant sur les questions.
- **Quiz interactif** : la réponse se choisit, la correction s'affiche avec le
  mot « Juste » ou « À revoir » — R5, le mot porte le sens, pas la couleur.
- **`voix-index.js` n'est PAS chargé** : 468 Ko d'index audio qui ne servent à
  rien ici. Ne pas l'ajouter sans fabriquer les audios d'abord.

⚠️ **Contrat à ne pas casser** : les identifiants `#listen`, `#next`, `#prev`,
`#start`, `#stop-voice` et la classe `.slide.active` sont ce que `prof-vocal.js`
cherche. Les renommer éteint le professeur vocal, sans erreur en console.

### Ce qui n'a PAS été greffé, et pourquoi

- **les curseurs de lisibilité** rendus par Design : doublon avec le bouton
  « Aa » de `lisibilite.js`, qui fait mieux (70→160 %, police DYS, mémorisé).
  Le contraste disparaît avec eux : s'il manque vraiment, sa place est **dans**
  `lisibilite.js`, pas dans une station ;
- **les audios fabriqués** (Piper / edge-tts) : la voix du navigateur suffit et
  ne coûte rien. Fabriquer le lot améliorerait la qualité d'écoute — c'est un
  chantier à part, avec le feu vert service tiers que cela suppose ;
- **`referentiel.js`** : attend que le référentiel BTS d'adossement soit tranché
  (point b ci-dessous) ;
- **les activités manipulatoires** des cours du pack (glisser-déposer, schémas
  cliquables) : la station reste lecture + questions.

## 🚀 EN LIGNE depuis le 23/08 — mais pas annoncé

**Le gel de diffusion a été levé par F. Henninot** (« tout mettre en ligne »).
16 commits poussés, dont toute l'histoire du réseau Législation, jamais publiée
jusque-là. Vérifié **sur le site**, pas sur le dépôt :

| Adresse | État |
|---|---|
| <https://inerweb.fr/legislation/> | 200 · le plan, F-Gaz 3 cliquable |
| <https://inerweb.fr/legislation/stations/fgaz-3/> | 200 · les 12 narrations présentes |
| les 6 SVG de la station | 200 |

**Le réseau reste volontairement invisible** : `noindex`, hors sitemap, et rien
sur le site principal n'y mène (décision du point d.). On y accède par l'URL,
pas autrement. C'est le régime voulu tant qu'une seule station est ouverte.

## 🎙️ La voix est FABRIQUÉE (Piper, local) — 23/08

La voix du navigateur faisait le travail, pas la qualité. Les 12 narrations sont
maintenant synthétisées avec **Piper**, modèle `fr_FR-siwis-medium` — **rien ne
sort de la machine**, donc aucun feu vert « service tiers » à demander.

- `build/voix/collecter-narrations.mjs` balaie désormais **deux racines** :
  `packs/fluides/res` et `legislation`. Il savait déjà lire `data-narration`.
- Les MP3 vivent dans `packs/fluides/res/voix/audio/` — le magasin commun,
  parce que `voix.js` les y cherche (audioBase déduite de son propre `src`).
- **L'index embarqué est réduit à la station** : `voix-index.js`, 2,4 Ko pour
  12 narrations, au lieu des 468 Ko de l'index global. Il se charge **avant**
  `voix.js`, qui le lit à son exécution.
- Une narration absente de l'index retombe sur la voix du navigateur : **la
  station parle dans tous les cas**, même après une retouche de texte.

**Refabriquer après avoir modifié un `data-narration`** :

```
node build/voix/collecter-narrations.mjs
/c/git/_venv-piper/Scripts/python.exe build/voix/generer-audios-piper.py \
  --model /c/git/_venv-piper/modeles/fr_FR-siwis-medium.onnx \
  --corpus build/voix/corpus.json \
  --output packs/fluides/res/voix/audio --index <index-temporaire> --key <clé>
```
puis réduire l'index à la station (voir `legislation/outils/`).

⚠️ **Sinon l'audio ment** : le texte change à l'écran, l'ancien MP3 continue de
jouer tant que sa clé n'a pas bougé — ou l'audio disparaît et la voix du
navigateur reprend, sans prévenir.

## 🗂️ La station 2 a son fond — en attente de validation

`stations/aptitude-capacite/FOND.md`, rédigé le 23/08 (étape 1 du rail).
C'est la **première correspondance de F-Gaz 3** : le maillage devient réel dès
qu'elle ouvre.

Ancré sur `packs/fluides/referentiel-2025.json`, pas sur des souvenirs :
structure de l'examen (groupes obligatoires · **tirage au sort parmi G6 à G9** ·
groupe spécifique de catégorie), **remise à niveau a minima tous les 7 ans** sous
peine de suspension, **bascule des anciennes catégories avant le 12 mars 2029**.

Message central, que le terrain n'a pas intégré : **l'attestation d'aptitude
n'est plus acquise à vie.**

Trois points y sont signalés comme à trancher, dont la durée de validité de
l'attestation de **capacité** — absente du référentiel, qui ne couvre que
l'aptitude : à sourcer ou à retirer de l'écran 4.

## ⚠️ Une autre session prépare une « intégration globale »

`CONSIGNES-INTEGRATION-GLOBALE.md` (racine, commit `5e4c56b`) a été écrit le
23/08 par une session parallèle, à la demande de F. Henninot : une refonte
déployée **en une seule action**, où « le jour J, on n'invente rien ».

Son relevé d'état s'arrête à `c29f441` et annonce « rien en attente de push » —
**c'est daté** : quatre commits ont été poussés après (voix Piper, brief visuel,
`.gitattributes`, fond de la station 2). Refaire le relevé avant toute
intégration : la vérité est le disque et le site servi.

Ce document signale aussi un point qui touche ce réseau : **le contraste de
`#ff6b35`** (≈ 2,52:1 sur beige) est sous le seuil de 4,5:1. La station n'utilise
cet orange que pour le survol des liens ; son accent de sous-ligne est `#0f766e`,
nettement plus foncé. À revoir si la charte crée une variante.

## ▶ PROCHAINE ACTION

**Relecture métier des 12 écrans par F. Henninot**, en ligne :
<https://inerweb.fr/legislation/stations/fgaz-3/> — ou en local si le serveur
tourne (`http://localhost:8124/…`, entrée `pilote-fluides-legislation` dans
`.claude/launch.json` ; le 8123 était occupé par une autre session).

⚠️ **Le service worker du site sert des copies en cache** : après un
déploiement, la page affichée peut mentir. Comparer avec un `fetch` en
`cache:'reload'`, ou désinscrire le service worker, avant de crier au raté.

La station s'annonce d'elle-même comme document de travail : l'attribut
`data-prototype` sur `marque.js` affiche « Prototype — document de travail » en
pied. **Il se retire une fois la relecture faite.**

Ensuite seulement : la station 2, en repartant de l'étape 1 du rail.

## Ce qui attend F. Henninot

- a. la **relecture des 57 stations** proposées (noms, sous-titres, paires de
  maillage) — conception Claude, rien de validé métier ;
- b. le **référentiel BTS d'adossement** (FED ? autre ?) pour coder les stations ;
- c. l'**hébergement définitif** : rester en `inerweb.fr/legislation/` ou dépôt /
  sous-domaine séparé ;
- d. ~~la pose de la correspondance sur l'accueil du réseau technique~~ →
  **TRANCHÉ le 23/08 : on attend.** Le réseau n'a qu'1 station ouverte sur 57 ;
  brancher aujourd'hui enverrait le visiteur sur un plan où 56 pastilles ne
  s'ouvrent pas — un lien vers du chantier. **Critère de déclenchement : 5 ou 6
  stations ouvertes.** La passerelle reste donc à sens unique (Législation →
  thermo-techno). Le jour venu, trois points à brancher, comme `sous-tension` et
  `qcm-travail-hauteur` : la ligne 🔄 CORRESPONDANCES du plan (fonction `corr()`,
  vers la ligne 1258 de `index.html` à la racine), le dépliant 🔄 CORRESPONDANCES
  de l'accueil (vers la ligne 731), et la liste structurée `ItemList` du JSON-LD
  (ligne 25). Le push reste gelé indépendamment de cela ;
- e. trois **stations candidates** révélées par l'inventaire, non ajoutées :
  Plan de prévention, Permis de feu, Gestes & postures (PRAP).

## Gisements

`GISEMENTS.md` (même dossier) : inventaire du 23/08 mené avec le moteur de
recherche documentaire de l'usine — briques trouvées station par station.
Bien dotées : Électrique, Fluidique, Risques pro, Déchets, Impact env.
À créer de zéro : Certifications & normes, et tout ce qui touche à la DESP et au
sprinkler (rien dans la base).

Relancer une recherche :
`cd C:\git\usine-contenu\moteur-recherche && node chercher.mjs "ma question" 6`
(Ollama doit tourner ; ~13 980 fiches indexées).

## Pièges déjà payés — ne pas les repayer

- Le **DÉPART** posé sur une ligne mère s'écrase contre son cartouche : il vit
  au-dessus, sur un court tronc vertical commun.
- Le **trait d'une ligne doit courir au-delà de sa dernière station** (piège
  documenté du plan principal : sinon les pastilles flottent sans rien qui les
  relie). Contrôle : le `H` final du path > le `cx` de la dernière pastille.
- Mesurer les chevauchements en **`getBoundingClientRect`**, jamais `getBBox`
  (qui ignore les `transform`).
- Ajouter une tête de sous-ligne **élargit le SVG** : penser `W`, la pointe de
  flèche, la position du jalon et `min-width` de `.plan svg` ensemble.
- Le **Bureau de F. Henninot = `~\OneDrive\Bureau\`**, mais le gisement RE2020
  est sur `~\Desktop\` (hors OneDrive) : les deux existent.
- **Diffusion gelée sur ce dépôt** : aucun push sans feu vert explicite.
- Deux sessions ont déjà travaillé en parallèle sur ce dépôt : `git add -A`
  ramasse ce qui n'est pas à soi — **ajouter fichier par fichier**.

## Voir la page en local

`.claude/launch.json` (dans l'espace de travail) déclare `pilote-fluides-local` :
un serveur statique sur le port **8123** servant `C:/git/pilote-fluides`.
La page : `http://localhost:8123/legislation/`.

## Journal des commits (branche `main`, tous LOCAUX — rien poussé)

- `98c0e87` — ouverture du 2e réseau (première forme, page à la racine)
- `8d61e35` — réseau de réseaux maillé
- `66049be` — bascule en satellite `legislation/` + 53 stations nommées
- `396ff43` — « F-Gas 2024 » devient « F-Gaz 3 »
- `bea217f` — inventaire des gisements
- `7ed83aa` — fond de la station F-Gaz 3
- `804165b` — la DESP en sous-ligne indépendante + Sprinkler & RIA

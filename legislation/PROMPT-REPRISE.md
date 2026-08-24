# PROMPT-REPRISE — le réseau Législation

> **À LIRE EN PREMIER** dans toute nouvelle session sur ce chantier.
> Ouvert le 23/08/2026. Dernière mise à jour : **24/08/2026** — 29 stations en ligne,
> et le cap passe aux illustrations **animées**, branche par branche.
> La vérité du réseau technique voisin reste le `REPRISE.md` à la racine du dépôt ;
> ce fichier-ci est la vérité DU RÉSEAU LÉGISLATION.

**En ligne** : https://inerweb.fr/legislation/

## Ce que c'est

Un **deuxième réseau** de cours inerWeb, **niveau BTS**, sur la réglementation, la
sécurité et l'environnement. Né d'un besoin de F. Henninot : désengorger le plan
technique au lieu d'y empiler des stations.

## Les huit décisions de F. Henninot — cadre non négociable

1. **Réseau de réseaux.** Une entrée du plan n'est pas une station terminale mais la
   **tête d'une sous-ligne** qui descend (« l'acoustique, c'est une ligne ;
   l'incendie, c'est une ligne »).
2. **Maillage.** Les sous-réseaux se répondent entre eux, pas seulement vers le
   réseau technique. Son exemple fondateur : Électrique ⇄ Risques professionnels,
   par l'habilitation et les EPI. « Une carte mémoire avec des interactions. »
3. **« Presque un autre site. »** La Législation ne se mélange PAS à la
   thermo-techno. D'où l'architecture SATELLITE — décision structurante.
4. **Création libre.** « Tu es assez doué pour faire mieux que le livre. » Le
   sommaire de manuel photographié n'est qu'une ossature de chapitres.
5. **La DESP est indépendante et transversale.** Sous-ligne à part entière, « au
   même titre que l'incendie et l'acoustique ». Elle touche aussi l'incendie :
   sprinkler et RIA sont des réseaux d'eau sous pression, lot CVC de bureau d'études.
6. **Projet inerWeb** (pas scolaire) → logo inerWeb. *(La question se repose à
   chaque production, même quand le cas paraît évident.)*
7. **▶ 24/08 — LES ILLUSTRATIONS DOIVENT S'ANIMER.** « On va utiliser Claude Design
   pour les illustrations en animation, pour rendre vivant le parcours de formation,
   et toujours le professeur en vocal qui explique. »
8. **▶ 24/08 — ON AVANCE BRANCHE PAR BRANCHE.** Une sous-ligne est menée jusqu'au
   bout — animations comprises — avant d'ouvrir la suivante. Plus de vague large.

## Architecture — le satellite

`legislation/index.html` se comporte comme les satellites existants
(`sous-tension`, `qcm-travail-hauteur`), pas comme une page du site :

- identité propre (« inerWeb Législation »), **aucun menu du site technique** — une
  seule passerelle, « ⇄ Le réseau thermo-techno » ;
- `lisibilite.js`, `marque.js`, `voix.js` et `prof-vocal.js` chargés **en absolu**
  depuis `https://inerweb.fr/moteur/` (règle du 20/08 : une source, zéro divergence) ;
- **le dossier doit rester déplaçable d'un bloc** vers un dépôt ou un sous-domaine ;
- il n'entre PAS dans `PAGES` de `build/version.mjs` ;
- `noindex` partout, hors sitemap, tant que le réseau est en construction.

## État au 24/08/2026 — 29 stations ouvertes sur 57

**Sous-lignes complètes** : Thermique (6) · La DESP (5) · Risques professionnels (6) ·
Déchets (5) · Impact environnemental (5).
**Partielle** : Fluidique & thermique — F-Gaz 3 et Aptitude & capacité, sur 4.

239 illustrations (**fixes**), 29 fonds rédigés. Chaque station : 12 écrans
(8 + 4 questions), 12 narrations, une illustration par écran, quiz corrigé,
`data-prototype` posé.

Sur le plan, une station ouverte porte son **nom souligné** — pas seulement une
pastille pleine. C'est le correctif du défaut signalé le 24/08 : « il n'y a aucun
lien à cliquer » alors que le lien existait, invisible parmi 57 pastilles.

### Les 28 stations qui restent

| Sous-ligne | Reste | Couleur | Préfixe de slug |
|---|---|---|---|
| Acoustique | 5 | #6d28d9 | `acoustique-` |
| Incendie | 6 (dont Sprinkler & RIA) | #b91c1c | `incendie-` |
| Électrique | 6 | #a16207 | `elec-` |
| Certifications & normes | 4 | #3730a3 | `certif-` |
| Droit du travail | 5 | #9d174d | `travail-` |
| Fluidique & thermique | 2 (NF EN 378, Traçabilité) | #0f766e | — |

Noms et sous-titres exacts : tableau `RESEAU` de `legislation/index.html`.
Le préfixe de slug commande le rattachement des couleurs — voir
`outils/couleur-des-sous-lignes.mjs`.

## ▶ LA DIRECTION POUR LA SUITE

**Branche par branche**, et les illustrations **s'animent**.

Les 239 illustrations actuelles sont des SVG fixes. Le cap : les rendre vivantes via
**Claude Design**, en gardant le professeur vocal qui commente.

Ce qui est en place et ne doit pas être défait :
- **le professeur vocal** (`prof-vocal.js`) enchaîne les écrans seul et s'arrête sur
  les questions ; les identifiants `#listen`, `#next`, `#prev`, `#start`,
  `#stop-voice` et la classe `.slide.active` sont son CONTRAT — ne jamais renommer ;
- **`data-narration`** sur chaque écran : le texte décrit CE QUE L'ON VOIT, il ne
  relit pas la page. C'est lui qui rendra l'animation compréhensible — et il est
  déjà écrit pour les 29 stations ;
- **rien n'est dit qui ne soit aussi écrit**, et l'animation ne conditionne jamais
  du contenu : la station reste lisible et imprimable sans elle.

À tenir en animant :
- `prefers-reduced-motion` respecté, **sauf** si l'animation porte du contenu — dans
  ce cas elle ne s'y conditionne pas, elle se déclenche au clic ;
- **une animation se livre EN ANIMATION**, jamais en captures (échec du 20/08) ;
- sortie **SVG ou HTML**, jamais de bitmap — le résultat doit rester réintégrable ;
- **aucun texte sur un tracé**, police lisible à l'impression A4 noir et blanc ;
- annoncer le coût Design AVANT chaque envoi, et regrouper les corrections en une
  seule demande.

⚠️ **La connexion à Claude Design n'est pas accordée dans ce chantier.** F. Henninot
doit taper `/design consent` dans la session qui en aura besoin. Charte à utiliser :
projet « Charte graphique inerWeb » (`1394c5be-3bc5-441f-93d9-251c89f48ba8`),
11 pièces poussées le 13/08 — ne rien resynchroniser.

## La dette — ce qui attend F. Henninot

1. **Les valeurs réglementaires manquantes.** Consigne tenue à la production :
   *aucun chiffre inventé*. Tout ce dont la source n'était pas certaine a été
   **omis volontairement**, jamais approximé. Chaque `FOND.md` porte sa liste sous
   « À sourcer ». Principaux manques : seuils Bbio / Cep / carbone de la RE2020,
   seuil de degrés-heures du confort d'été, seuils et calendrier du DPE, montants
   des aides CEE, seuils de pression et périodicités de la DESP, valeurs de tarage,
   seuil de hauteur et périodicité de vérification des échafaudages, limites
   d'explosivité ATEX, année de l'amendement de Kigali.
   **Les cours enseignent les mécanismes correctement ; il leur manque des chiffres,
   tous identifiés.** C'est une passe de complétion, pas une réécriture.
2. **La relecture métier** : aucune des 29 stations n'a été relue par un
   professionnel. `data-prototype` posé partout.
3. **Le référentiel BTS d'adossement** (FED ? autre ?) : non tranché, donc aucune
   station ne porte ses codes de tâches et de savoirs.
4. **La voix fabriquée** : seule F-Gaz 3 a ses 12 MP3 (Piper, local). Les 28 autres
   parlent avec la voix du navigateur. Fabrication :
   `build/voix/collecter-narrations.mjs` puis `generer-audios-piper.py`, puis
   réduire l'index à la station.
5. **L'hébergement définitif** : rester en `inerweb.fr/legislation/` ou partir en
   dépôt / sous-domaine séparé. Le dossier est déplaçable d'un bloc.

## Les outils du chantier

| Outil | Ce qu'il fait |
|---|---|
| `outils/fiches-a-valider.mjs` | publie les fonds à relire sur https://inerweb.fr/legislation/a-valider.html — **c'est par là que F. Henninot valide**, sans compte ni connexion |
| `outils/couleur-des-sous-lignes.mjs` | rend à chaque station la couleur de SA sous-ligne, lue DANS le plan |
| `outils/md2pdf.py` | conversion des fonds en PDF |

Relancer les deux premiers après toute production. Le second corrige un défaut
structurel : les stations copient le gabarit, feuille de style comprise, donc elles
héritent de l'accent de la sous-ligne Fluidique tant qu'on ne le réaligne pas.

## Le rail de production — pour chaque station

1. **Fond** : rédiger `stations/<slug>/FOND.md` → il apparaît automatiquement sur la
   page « à valider » → **F. Henninot valide**.
2. **Production** : bâtir sur le gabarit `stations/aptitude-capacite/` (12 écrans,
   narrations, quiz, illustrations). **Nouveau cap : les illustrations passent par
   Claude Design et s'animent.**
3. **Intégration** : `couleur-des-sous-lignes.mjs`, puis brancher le `href` dans le
   tableau `RESEAU` du plan, puis mettre à jour le bandeau « N stations ouvertes ».
4. **Vérification en ligne**, jamais seulement en local.

## Ce que la vague 1 a appris — à ne pas répéter

- **Un sous-agent à qui l'on confie 5 ou 6 stations d'un coup délègue au lieu de
  produire**, et ses propres sous-agents ne rendent rien. Deux salves ont été
  perdues ainsi. Ce qui a marché : une consigne explicite d'**écrire soi-même**,
  station par station. Le mieux reste **un agent pour une station**.
- **Les agents se marchent dessus** sur les mêmes fichiers : des illustrations ont
  été réécrites en cours de route, et 7 SVG orphelins ont dû être retirés de
  `desp-la-directive`. Contrôle à refaire après chaque branche : *tout SVG du
  dossier est-il référencé par son `index.html` ?*
- **Un agent peut détourner l'onglet du navigateur** partagé : renaviguer
  explicitement avant toute mesure.
- **Le contrôle qui a le plus servi** : ouvrir les illustrations dans un navigateur.
  Un agent y a trouvé trois débordements de texte qu'aucun contrôle de fichier
  n'aurait vus.

## Pièges déjà payés — ne pas les repayer

- Le **DÉPART** posé sur une ligne mère s'écrase contre son cartouche : il vit
  au-dessus, sur un court tronc vertical commun.
- Le **trait d'une ligne doit courir au-delà de sa dernière station**, sinon les
  pastilles flottent. Contrôle : le `H` final du path > le `cx` de la dernière.
- Mesurer les chevauchements en **`getBoundingClientRect`**, jamais `getBBox`.
- Ajouter une tête de sous-ligne **élargit le SVG** : penser `W`, la pointe de
  flèche, la position du jalon et `min-width` ensemble.
- **Vérifier toujours le site servi**, jamais le seul dépôt.
- Le **service worker** fige les fichiers audio sans les revalider : un MP3 à nom
  fixe corrigé ne sera pas réentendu. Point ouvert, noté dans
  `CONSIGNES-INTEGRATION-GLOBALE.md`.

## Voir en local

`.claude/launch.json` déclare `pilote-fluides-local` : serveur statique sur le port
**8123** servant `C:/git/pilote-fluides`. Le réseau :
`http://localhost:8123/legislation/`.

## Journal des commits (branche `main`)

- `98c0e87` → `804165b` — ouverture du réseau, réseau de réseaux maillé, bascule en
  satellite, 57 stations nommées, la DESP en sous-ligne indépendante
- `bea217f` — inventaire des gisements · `7ed83aa` — fond de F-Gaz 3
- `dee65ca` → `c29f441` — F-Gaz 3 produite, écrans navigables, professeur vocal,
  illustrations animées, voix Piper
- `955bc11` — connecteur en tête du plan principal · `da4526d` — bandeau des stations
  ouvertes · `0aaa3f8` — page « à valider » sur le site
- `975db58` — station Aptitude & capacité
- `1fce0c3` — **vague 1 : 29 stations ouvertes sur 57**

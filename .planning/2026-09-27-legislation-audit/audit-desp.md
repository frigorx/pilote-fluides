# Audit — La DESP (5 stations) — 27/09/2026

Méthode : lecture intégrale des 5 `FOND.md` et `index.html`, des 40 `svg/*.svg`
(texte extrait), et croisement avec `VALEURS-A-VALIDER-DESP.md`. Aucun fichier
modifié, aucun navigateur utilisé.

## desp-la-directive

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:26-28 et 302-310 | Le commentaire dit deux fois qu'« aucun audio n'est fabriqué » et « PAS de voix-index.js ici », mais la ligne suivante charge quand même `voix-index.js?v=20260902-1`. Commentaire et code se contredisent. | Retirer le chargement du script si la voix navigateur est voulue, ou mettre à jour le commentaire s'il fabrique déjà quelque chose. |
| 🟠 | FOND.md:7-9, index.html:14-18 | « suivront desp-categories… (non ouvertes, non liées) » : les quatre autres stations existent déjà sur disque (constaté), et l'index du réseau les lie déjà (`legislation/index.html:323-327`). Texte périmé. | Mettre à jour la mention une fois l'état réel connu. |

Chiffres sans source : aucun (vérifié — les seules occurrences de chiffres dans
les SVG sont des coordonnées de tracé `L x y`, pas du texte affiché).
À sourcer (fond) : seuil PS > 0,5 bar, numéro/date de la directive, seuils par
catégorie (renvoyés à `desp-categories`) — tous les trois déjà répondus dans
`VALEURS-A-VALIDER-DESP.md` §1, en attente d'arbitrage. Référentiel BTS non renseigné.
Ce qui manque : un exemple d'accessoire de sécurité concret (renvoi possible
vers la station soupapes une fois ouverte) ; le numéro/date de la directive,
dès validation, pour ancrer le texte dans le temps.

## desp-categories

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟡 | FOND.md:3, index.html:13 | En-tête interne classe la station dans la sous-ligne « Fluidique & thermique » au lieu de « La DESP » (copié du gabarit `aptitude-capacite`). Sans effet visible : le `fil-sous-ligne` affiché à l'écran (ligne 59) dit bien « La DESP ». | Corriger le commentaire et l'en-tête FOND.md pour éviter la confusion en maintenance. |
| 🟠 | index.html:277-281 | Même contradiction voix-index.js que les 4 autres stations (voir synthèse). | Idem. |

Chiffres sans source : aucun.
À sourcer (fond) : seuils PS × V × DN par groupe et par catégorie, forme exacte
des courbes, modules d'évaluation (A, A2/D1/E1, B+D/B+F/…) des catégories II à IV
— tous déjà répondus dans `VALEURS-A-VALIDER-DESP.md` §2, en attente d'arbitrage.
Ce qui manque : le nom des modules d'évaluation (A, B+D, etc.) pour l'écran 5,
qui reste aujourd'hui volontairement flou sur II et III ; le référentiel BTS.

## desp-marquage-papiers

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | FOND.md:5-7 | « Troisième des cinq stations… la seule construite pour l'instant » — faux : les 5 stations existent, avec leur `index.html`. Contredit aussi `desp-soupapes-securites` qui revendique le même statut. | Retirer l'affirmation, ou la dater et l'assumer comme dépassée. |
| 🟠 | index.html:285-289 | Même contradiction voix-index.js. | Idem. |
| 🟡 | FOND.md:175-177 | « Lien depuis `legislation/index.html` : la station n'y est pas encore reliée » — faux : le lien existe déjà (`legislation/index.html:325`). | Mettre à jour. |

Chiffres sans source : aucun.
À sourcer (fond) : durée de conservation du dossier d'installation, autorité de
contrôle sur chantier — déjà répondues dans `VALEURS-A-VALIDER-DESP.md` §5
(10 ans fabricant, durée de vie de l'équipement pour l'exploitant ; DREAL/DRIEAT/
DEAL), en attente d'arbitrage.
Ce qui manque : le référentiel BTS ; une fois la durée de conservation validée,
l'écran 5 pourra remplacer « à vérifier sur le texte applicable » par une durée
datée.

## desp-en-service

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🟠 | index.html:120 (`data-narration` écran 3) | La narration orale ajoute deux affirmations absentes du texte écrit et de l'`alt`/`figcaption` : « leurs périodicités sont différentes, et elles dépendent de la catégorie de l'équipement » et « vérification de la résistance de l'enveloppe ». Un élève qui lit sans écouter n'a pas cette information ; un élève qui écoute apprend une chose que l'écran ne montre pas. | Aligner narration et texte écrit — soit ajouter la phrase au texte visible, soit l'retirer de la narration. |
| 🟠 | index.html:286-290 | Même contradiction voix-index.js. | Idem. |

Chiffres sans source : aucun.
À sourcer (fond) : périodicités d'inspection et de requalification, qui les
réalise — déjà répondues dans `VALEURS-A-VALIDER-DESP.md` §4 (tableaux complets
par équipement, « personne compétente » vs organisme habilité), en attente
d'arbitrage.
Ce qui manque : le référentiel BTS ; la sanction du défaut de contrôle reste
non sourcée (le fond le dit lui-même, à raison — rien à ajouter tant qu'aucune
source n'est trouvée).

## desp-soupapes-securites

| Gravité | Où (fichier:ligne) | Défaut | Proposition |
|---|---|---|---|
| 🔴 | FOND.md:5-8, index.html:14-18 | Affirme être « la première construite — les quatre autres n'ont encore que leur `styles.css` et `app.js`, pas d'`index.html` ». C'est faux : les quatre autres stations ont bien un `index.html` complet (12 écrans chacune), constaté sur disque. Affirmation vérifiable et contredite par les faits, pas seulement périmée. | Corriger ou supprimer cette affirmation ; elle contredit aussi `desp-marquage-papiers`, qui se dit elle aussi « la seule construite ». |
| 🟠 | écran 7 (index.html:168), FOND.md écran 7 | « le pressostat… se referme seul quand la pression redescend ». Un pressostat de *sécurité* (par opposition à un pressostat de régulation) est couramment conçu à réarmement **manuel** précisément pour empêcher un redémarrage automatique après un défaut. Le texte affirme l'inverse. Degré de certitude : modéré — la station ne source pas ce point, et l'usage peut varier selon le modèle ; à vérifier avant diffusion. | Vérifier avant validation ; à défaut de certitude, retirer la précision « se referme seul » pour le pressostat, ou la nuancer. |
| 🟠 | index.html:281-285 | Même contradiction voix-index.js. | Idem. |

Chiffres sans source : aucun.
À sourcer (fond) : le tarage en pourcentage de la PS — déjà répondu dans
`VALEURS-A-VALIDER-DESP.md` §3 : surpression momentanée limitée à 10 % de la PS
(annexe I, 2.11.2 et 7.3), et catégorie IV par défaut pour les accessoires de
sécurité — en attente d'arbitrage.
Ce qui manque : le référentiel BTS ; une fois le 10 % validé, l'écran 6 et le
bilan (écran 8) pourront afficher ce plafond daté.

## Synthèse de la branche

- **Défaut transversal n°1** : dans les 5 stations, le commentaire HTML dit
  « PAS de voix-index.js ici » juste au-dessus de la ligne qui le charge quand
  même — code et commentaire se contredisent partout, à corriger d'un coup.
- **Défaut transversal n°2** : chaque `FOND.md` raconte un état de construction
  différent et incompatible des quatre autres stations (« non ouvertes »,
  « la seule construite », « la première construite, les autres n'ont pas
  d'index.html ») — ces trois récits ne peuvent pas être vrais en même temps,
  et le dernier (`desp-soupapes-securites`) est objectivement faux.
- **Hors périmètre mais lié** : `legislation/index.html:323` affiche déjà
  « PS > 0,5 bar » sous « La directive », alors que cette valeur — pourtant
  correcte au regard de `VALEURS-A-VALIDER-DESP.md` — n'a pas encore reçu
  l'arbitrage de F. Henninot et que la station elle-même s'interdit de la
  citer. Ce fichier n'est pas une des 5 stations auditées, donc non détaillé
  en table, mais le signaler semblait utile.
- **Bonne nouvelle constatée** : aucune des 5 stations n'affiche un chiffre
  réglementaire non sourcé — la discipline « aucun chiffre inventé » a été
  tenue partout, cohérence écran/narration/alt/figcaption/SVG bonne sur le
  reste, et les quatre ordres de réponses annoncés dans les `FOND.md` sont
  respectés à la lettre.
- **Les 5 corrections les plus utiles, dans l'ordre** :
  1. Corriger la contradiction voix-index.js dans les 5 `index.html`.
  2. Retirer ou dater les affirmations mutuellement incompatibles sur « quelle
     station est construite » (les 5 `FOND.md`).
  3. Vérifier le sens du réarmement du pressostat de sécurité avant validation
     de `desp-soupapes-securites`.
  4. Faire arbitrer par F. Henninot les valeurs de `VALEURS-A-VALIDER-DESP.md`
     (le tarage à 10 % et les périodicités sont les plus attendues) puis les
     intégrer, datées, dans les 5 stations.
  5. Aligner la narration de l'écran 3 de `desp-en-service` sur son texte
     écrit.

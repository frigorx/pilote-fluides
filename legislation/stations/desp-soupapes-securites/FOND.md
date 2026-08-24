# Station « Soupapes & sécurités » — FOND

> Réseau Législation · sous-ligne La DESP · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> Cinquième station de la sous-ligne « La DESP » sur le plan du réseau
> (`legislation/index.html`), et la **première construite** — les quatre
> autres (La directive, Catégories I à IV, Marquage & papiers, En service)
> n'ont encore que leur `styles.css` et `app.js`.
>
> **Ligne de rigueur tenue** : aucun chiffre de tarage, de pression ou de
> pourcentage. La station enseigne le **mécanisme** de chaque accessoire et
> l'**ordre** dans lequel ils interviennent, pas un barème chiffré — les
> valeurs se vérifient sur le texte en vigueur, jamais devinées ici.

## Ce qui fait l'intérêt de cette station

Trois objets qu'un technicien croise sans toujours savoir les distinguer :
la soupape de sûreté, le pressostat de sécurité, le disque de rupture.
Ils ne font pas la même chose, et surtout ils n'agissent pas au même
moment — le pressostat coupe avant que la soupape n'ait besoin de
s'ouvrir. Comprendre cet ordre évite deux erreurs classiques : croire que
la soupape est la seule protection, ou confondre son rôle avec celui du
pressostat.

## Objectif

À la fin de la station, l'élève de BTS sait reconnaître les trois
accessoires de sécurité d'un équipement sous pression, expliquer comment
chacun agit mécaniquement, situer leur ordre d'intervention, et retenir le
réflexe professionnel : comparer le tarage indiqué sur l'accessoire à la
PS inscrite sur la plaque de l'équipement.

## Écran 1 — Trois accessoires, un même rôle

La directive DESP encadre les équipements sous pression au-delà d'un
seuil de PS. Trois familles d'accessoires protègent contre son
dépassement : la soupape de sûreté, le pressostat de sécurité, le disque
de rupture.

*Visuel : `svg/trois-accessoires.svg` — un équipement central avec sa
plaque PS, trois cartes reliées (une par accessoire), une bande de
synthèse en bas.*

## Écran 2 — La soupape de sûreté : elle s'ouvre, puis se referme

Dispositif **mécanique**. Fermée sous le seuil de tarage, elle s'ouvre
au-delà pour évacuer l'excès de pression — elle laisse échapper de la
matière — puis se referme d'elle-même quand la pression redescend.
Exemple : la soupape d'une bouteille de fluide frigorigène ou d'un
réservoir.

*Visuel : `svg/soupape-coupe.svg` — coupe schématique en deux panneaux,
fermée puis ouverte, ressort, clapet, siège, évacuation.*

## Écran 3 — Le pressostat de sécurité : il coupe avant

Dispositif **électrique**. Il coupe le fonctionnement (typiquement le
compresseur) dès que la pression atteint son seuil, sans rien évacuer :
il agit en amont, avant que la pression n'ait besoin d'être relâchée.
Souvent appelé pressostat HP sur un groupe de production de froid.

*Visuel : `svg/pressostat-schema.svg` — schéma électrique vertical
(convention maison : phase en haut en rouge, neutre en bas en orange,
porte-fusible en tête), avec un encadré d'explication à droite.*

## Écran 4 — Le disque de rupture : une membrane qui cède d'un coup

Membrane calibrée. Intacte sous son seuil, elle cède d'un coup au-delà —
sans ouverture progressive comme la soupape. Utile quand la pression peut
monter très vite, par exemple sur un circuit à l'ammoniac ou au CO2.

*Visuel : `svg/disque-rupture.svg` — coupe de circuit en deux panneaux,
membrane intacte puis rompue, flèches d'échappement.*

## Écran 5 — La hiérarchie de protection : qui agit en premier

Le pressostat agit tôt : il coupe avant que la pression ne continue à
monter. La soupape agit en dernier recours : elle protège si la pression
est quand même montée trop haut, juste avant la limite mécanique de
l'équipement. Normalement, le pressostat agit avant que la soupape n'ait
besoin de s'ouvrir.

*Visuel : `svg/hierarchie-protection.svg` — ligne de pression croissante
SANS graduation chiffrée, un repère pressostat puis un repère soupape,
puis la limite (PS) de l'équipement.*

## Écran 6 — Le tarage se lit par rapport à la PS

Le seuil de déclenchement d'un accessoire — son tarage — est fixé en
dessous de la PS de l'équipement qu'il protège, selon les règles du texte
en vigueur. Aucun pourcentage ni valeur chiffrée n'est donné : ils ne sont
pas sourcés avec certitude pour cette station.

*Visuel : `svg/tarage-vs-ps.svg` — plaque de l'équipement (PS) et
étiquette de l'accessoire (tarage), flèche « fixé en dessous », sans
chiffre.*

## Écran 7 — Comparatif : trois mécanismes, un même objectif

Tableau synthétique : mécanisme (mécanique / électrique / membrane),
évacuation de matière (oui / non / oui d'un coup), fermeture après usage
(oui, seule / oui, seul / non — à remplacer).

*Visuel : `svg/comparatif-accessoires.svg` — tableau à trois colonnes, une
par accessoire, trois lignes de critères.*

## Écran 8 — Bilan et le réflexe

Récapitulatif des quatre points de la station, et la formule finale : le
réflexe est de comparer le tarage indiqué sur l'accessoire à la PS
inscrite sur la plaque de l'équipement.

*Visuel : `svg/reflexe-tarage.svg` — carte accessoire (tarage) et plaque
équipement (PS), flèche « comparer », bande de synthèse.*

## Les 4 questions (quiz)

> Règle maison : bonnes réponses mélangées (positions b, c, a, d sur les
> quatre questions), longueurs équilibrées.

**Q1.** La soupape de sûreté : que se passe-t-il quand le tarage est
dépassé ?
- a) Elle coupe le compresseur avant que la pression ne redescende
- b) Elle s'ouvre pour évacuer l'excès de pression, puis se referme
  quand la pression redescend ✔
- c) Elle cède d'un coup et doit être remplacée
- d) Elle reste fermée tant que la pression n'a pas doublé
*Explication : la soupape est un dispositif mécanique : elle s'ouvre
au-delà du seuil de tarage pour évacuer l'excès de pression, puis se
referme quand la pression redescend.*

**Q2.** Le pressostat de sécurité : que fait-il, et à quel moment ?
- a) Il évacue l'excès de pression, comme la soupape
- b) Il agit uniquement après que la soupape s'est ouverte
- c) Il coupe le fonctionnement, sans rien évacuer, avant la soupape ✔
- d) Il se referme seul quand la pression atteint zéro
*Explication : le pressostat est un dispositif électrique : il coupe le
fonctionnement dès que la pression atteint son seuil, sans rien évacuer,
normalement avant que la soupape n'ait besoin de s'ouvrir.*

**Q3.** Pourquoi utilise-t-on parfois un disque de rupture plutôt qu'une
soupape ?
- a) Parce que la pression peut monter trop vite pour une ouverture
  progressive ✔
- b) Parce qu'il coûte moins cher qu'une soupape de sûreté
- c) Parce qu'il se referme automatiquement après avoir cédé
- d) Parce que la réglementation l'impose sur tout équipement sous
  pression
*Explication : le disque de rupture cède d'un coup : il convient quand
une ouverture progressive, comme celle d'une soupape, ne suffit pas — par
exemple sur un circuit à l'ammoniac ou au CO2.*

**Q4.** Comment sait-on si le tarage d'un accessoire de sécurité convient
à un équipement ?
- a) En comparant sa date de fabrication à celle de l'équipement
- b) En mesurant la température ambiante au moment de l'installation
- c) Le tarage est le même pour tous les équipements, quelle que soit
  leur PS
- d) En le comparant à la PS inscrite sur la plaque de l'équipement ✔
*Explication : le tarage d'un accessoire de sécurité est fixé en dessous
de la PS de l'équipement qu'il protège, selon les règles du texte en
vigueur — jamais choisi isolément.*

## Maillage (correspondances de la station)

- **NF EN 378** (même sous-ligne, en préparation) — les accessoires de
  sécurité et leurs exigences propres au circuit frigorifique sont aussi
  encadrés par cette norme.

Aucun lien vers F-Gaz 3 ni vers les autres stations DESP : la
correspondance « Sprinkler & RIA ⇄ La DESP » reste réservée à la station
« La directive », pour n'apparaître qu'une seule fois sur l'ensemble des
cinq stations DESP.

## Production

- Charte : projet « Charte graphique inerWeb ». Accent de la sous-ligne
  « La DESP » sur le plan du réseau : **#0c4a6e** (utilisé dans les 8
  SVG). La variable `--sous-ligne` de `styles.css`, copié tel quel depuis
  `aptitude-capacite`, reste à **#0f766e** — c'est voulu, non retouché.
- `styles.css` et `app.js` sont des copies strictement identiques de ceux
  de la station « Aptitude & capacité » (vérifié par `diff`).
- 8 SVG produits à la main, dans le style de `deux-papiers.svg` : viewBox,
  `role="img"`, `title`/`desc` liés par `aria-labelledby`/`aria-describedby`,
  style CSS interne, formes `rect`/`text`/`line`/`path`/`circle`. Aucun
  texte posé sur un tracé ; police ≥ 15 px.
- **Voix** : aucun audio fabriqué — la station parle avec la voix du
  navigateur (SpeechSynthesis), comme le reste du réseau non encore
  doublé en Piper.
- Aucun nom propre, aucun établissement — non-nominatif strict.

---

## ⚠️ Ce qui reste à trancher avant production

1. **La station attend sa relecture métier par F. Henninot**
   (`data-prototype` posé sur `marque.js`).
2. **Aucune valeur chiffrée de tarage n'est donnée** (ni pourcentage de la
   PS, ni pression en bar) : non sourcée avec certitude pour cette
   station, volontairement absente des écrans 6 et 8. À compléter
   uniquement si une source vérifiable (texte réglementaire ou norme) est
   fournie.
3. **Le référentiel BTS d'adossement** n'étant pas tranché, aucun code de
   tâche ou de savoir associé n'est inséré dans cette station — comme sur
   « Aptitude & capacité ».

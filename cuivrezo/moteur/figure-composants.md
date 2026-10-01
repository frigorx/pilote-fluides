# Les composants de figure — `<cuivre-3d>` (lot B, 30/09/2026)

## Ce que le moteur sait déjà faire (aucun changement dans `station.js`)

`figure()` accepte `figure: { composant: '<balise>', attributs: { … }, anime: true|false, legende: '…' }`.
Il crée la balise, pose les attributs, la place dans la boîte (`display:block; width:100%; height:min(46dvh,420px)`)
et, si `anime`, fait varier l'attribut `angle` de 0 à 90 en boucle (pas de 1,5° toutes les 40 ms).
`<cuivre-3d>` s'y range tel quel : il lit `angle` à chaque changement, se libère quand la boîte est remplacée
(pas de fuite de contexte WebGL d'un écran à l'autre), et se charge seulement quand il est visible.
Sans WebGL ou sans réseau, il retire sa scène et met à la place la figure SVG existante (`CuivFigures`).

Le script `moteur/piece3d.js` est ajouté au gabarit des pages (`outils/construire.mjs`, liste `scripts`, une
seule ligne). C'est un script classique, pas un module : il marche aussi depuis `file://` (accueil ouvert par
raccourci). Three.js 0.160.0 est tiré de cdnjs (repli jsdelivr) à la première pièce visible.

## Le composant

`<cuivre-3d piece="coude90|chapeau|baionnette|dudgeon|emboiture" angle="…">` — attributs facultatifs, cotes en mm.

| Attribut | Pièces | Sens (défaut) |
|---|---|---|
| `angle` | coude90 | angle du coude, 0-90° (90) |
| `angle` | chapeau, baionnette, emboiture | avancement 0-90, soit 0-100 % (90) |
| `angle` | dudgeon | demi-angle de l'évasement, 0-45° (45). **Ne pas mettre `anime`** : la boucle va jusqu'à 90 |
| `diametre`, `rc` | toutes | diamètre extérieur (15,88 ; 12,7 dudgeon et emboîture) ; rayon de cintrage à l'axe (45) |
| `cote`, `cote2` | coude90 | cotes à l'axe côté L (bout gauche) et côté R (bout droit) (300 et 300) |
| `central`, `hauteur`, `obstacle` | chapeau | angle du coude central (90) ; hauteur H d'axe à axe (70) ; diamètre de l'obstacle (36) |
| `decalage`, `angle-coude` | baionnette | décalage d'axe à axe (70) ; angle de chaque coude (45) |
| `profondeur`, `coupe` | emboiture (coupe aussi dudgeon) | profondeur de l'emboîture (= 1 diamètre) ; `coupe="non"` pour la pièce entière |
| `sans-controles` | toutes | cache le curseur et les boutons |

Ce que la scène montre et calcule (géométrie exacte) : tube creux (paroi de 6 % du diamètre), droite + arc de rayon Rc
+ droite ; **le cintrage conserve la matière** (l'arc prend Rc × angle à la droite d'arrivée) ; `coude90` : trait « 0 » posé à
`cote − Rc` du bout, cote L et cote R lues en direct (elles n'atteignent la cote qu'à 90°), rayon Rc, angle ;
`chapeau` : coude central d'abord, puis A et B de moitié (méthode retenue), obstacle, axe, H ;
`baionnette` : deux coudes égaux en sens opposés, décalage d'axe à axe ; `dudgeon` : tube, cône à 45° de l'axe, écrou enfilé avant ;
`emboiture` : bout élargi, tube qui entre avec un jeu de 0,2 mm. Les étiquettes (HTML) ne recouvrent jamais le tube :
essai fait sur 480 vues (6 azimuts × 4 hauteurs × 4 états × 5 pièces), 0 étiquette sans place libre sauf 1 cas rare corrigé depuis.

## Champs `figure` à poser (l'orchestrateur les pose ; je n'ai touché à aucune donnée)

Numéros de ligne = `donnees/stations/<id>.js` au 30/09 matin ; repérez plutôt par le titre du geste.

**1-4 Cintrer à la cintrette** (les gestes qui montrent l'OUTIL gardent `cintrette-lab`)
- `obtenir.figure` (l. 14) : `{ composant: 'cuivre-3d', attributs: { piece: 'coude90', angle: '90', cote: '300' }, legende: 'Le coude à 90° : 300 mm à l’axe. Tournez-le du doigt.' }`
- geste « Trouver le rayon de votre cintrette » (l. 42) : `{ composant: 'cuivre-3d', attributs: { piece: 'coude90', angle: '90', cote: '300' }, legende: 'Le rayon Rc : du centre du coude à l’axe du tube.' }`
- geste « Sortir la pièce » (l. 67) : `{ composant: 'cuivre-3d', attributs: { piece: 'coude90', angle: '90', cote: '300' } }`
- piège « Le coude trop long » (l. 81) : `{ composant: 'cuivre-3d', attributs: { piece: 'coude90', angle: '90', cote: '300' } }` (le trait est à 300 − Rc)
- facultatif, geste « Cintrer doucement » (l. 57) : `{ composant: 'cuivre-3d', attributs: { piece: 'coude90', angle: '0' }, anime: true }` à la place de la cintrette animée (elle reste plus parlante pour les mains : à vous de trancher).

**1-5 Cintrer à la cintreuse (L, R, 0)** — pièce 1 du TP : 1/4″, branches de 80 et 70 mm, Rc = 14,29 mm (`niveau-3-data.js`)
- `obtenir.figure` (l. 15) : `{ composant: 'cuivre-3d', attributs: { piece: 'coude90', angle: '90', diametre: '6.35', rc: '14.29', cote: '80', cote2: '70' }, legende: 'La pièce 1 : 80 mm côté L, 70 mm côté R.' }`
- geste « Choisir le repère : L ou R » (l. 38) : mêmes attributs. **Réserve** : L = cote prise du bout gauche, R = du bout droit vient de l'en-tête de `1-5.js` ; la règle de R reste « à valider », la 3D ne fait que montrer les deux cotes.

**4-1 Le chapeau de gendarme**
- `obtenir.figure` (l. 15) : `{ composant: 'cuivre-3d', attributs: { piece: 'chapeau', angle: '90' }, legende: 'Le chapeau passe au-dessus de l’obstacle ; H se mesure d’axe à axe.' }`
- geste « Choisir l'angle central » (l. 47) : `{ composant: 'cuivre-3d', attributs: { piece: 'chapeau', angle: '90', central: '90' } }` (mettre `central: '60'` pour le cas bas de la fourchette 60-90°)
- geste « Cintrer le coude central » (l. 53) : `{ composant: 'cuivre-3d', attributs: { piece: 'chapeau', angle: '54' } }` (54 = le coude central est fait, A et B pas encore)
- gestes « coude A », « coude B » (l. 58, 63) : `{ composant: 'cuivre-3d', attributs: { piece: 'chapeau', angle: '90' } }` ; ou `anime: true` sur l'un des deux.

**4-2 La baïonnette**
- `obtenir.figure` (l. 15) : `{ composant: 'cuivre-3d', attributs: { piece: 'baionnette', angle: '90' }, legende: 'Deux coudes égaux, en sens opposés : le décalage.' }`
- geste « Cintrer le premier coude à 45° » (l. 38) et « Retourner le tube » (l. 43) : `attributs: { piece: 'baionnette', angle: '45' }` (45 = premier coude fait)
- geste « Régler le décalage à la règle » (l. 49) : `attributs: { piece: 'baionnette', angle: '90' }` (le décalage est coté)
- geste « Cintrer le second coude » (l. 54) : `attributs: { piece: 'baionnette', angle: '90' }` ou `anime: true`.

**1-6 Le dudgeon** (rendu juste, à une réserve : j'ai pris « 45° » comme angle du cône par rapport à l'axe, évasement frigorifique usuel ; si la fiche entend 45° d'angle total, mettre `angle: '22.5'`)
- `obtenir.figure` (l. 15) : `{ composant: 'cuivre-3d', attributs: { piece: 'dudgeon', angle: '45' }, legende: 'Le dudgeon réussi, l’écrou qui vient le coiffer.' }`
- geste « Enfiler l'écrou » (l. 40) : `attributs: { piece: 'dudgeon', angle: '0', coupe: 'non' }`
- geste « Visser jusqu'à la butée » (l. 56) et « Contrôler » (l. 61) : `attributs: { piece: 'dudgeon', angle: '45' }`.

**1-7 L'emboîture à la pince** (la profondeur reste « à trancher » : la 3D n'écrit aucune valeur, elle prend 1 diamètre)
- `obtenir.figure` (l. 15) : `{ composant: 'cuivre-3d', attributs: { piece: 'emboiture', angle: '90' }, legende: 'Le tube mâle dans l’emboîture : un jeu de quelques dixièmes.' }`
- geste « Enfiler la tête » (l. 49) : `attributs: { piece: 'emboiture', angle: '0' }` ; geste « Essai » (l. 70) : `attributs: { piece: 'emboiture', angle: '90' }`.

## À savoir
- Hauteur : la barre (curseur, boutons) prend ~90 px de la boîte. Sur 800 px de haut, la scène fait ~280 px. Pour plus de place, `attributs: { 'sans-controles': '' }` cache la barre (la vue reste tournante au doigt).
- Le vocabulaire des étiquettes est celui des stations (Rc, L, R, 0, A, B, axe, H, décalage, écrou, profondeur).
- Page de démonstration : `prof/demo-3d.html`.
- Le curseur, les boutons et les étiquettes font 16 px ou plus ; boutons de 48 px de haut.

# Brief visuel — réseau inerWeb Législation

> **À qui ce document s'adresse.** Deux lecteurs : Claude Design, pour ce qu'il
> doit fabriquer ; F. Henninot, pour savoir ce qui est demandé et ce que ça
> coûte. Modèle repris de `inerweb-habilitation/docs/CDC-INTERFACE-UI.md`.
>
> Établi le 23/08/2026, à partir de la première station livrée (F-Gaz 3).

---

## 1. Le partage des rôles, en une phrase

**Je produis les schémas techniques et les animations en SVG. Je ne produis pas
les illustrations d'ambiance.** Ce document liste les deux, pour que la frontière
soit nette et que rien ne se fasse deux fois.

| Nature du visuel | Qui | Pourquoi |
|---|---|---|
| Schéma technique (frise, graphique, logigramme, comparatif) | **Code** | Fait, vérifié, mesuré — voir § 3 |
| Animation SVG qui raconte un mécanisme | **Code** | Le tracé et la narration sont liés |
| Pictogramme géométrique simple | **Code** | Cercle, rectangle, trait |
| Illustration d'ambiance, scène, personnage | **Design** | Hors de ma portée — § 4 |
| Identité visuelle d'un réseau (bandeau, motif, jeu de pictos cohérent) | **Design** | Demande un parti pris graphique — § 4 |

---

## 2. Ce que le réseau est, pour cadrer le ton

Deuxième réseau de cours inerWeb, **niveau BTS**, sur la réglementation, la
sécurité et l'environnement. Il se comporte comme un site à part (« presque un
autre site ») : identité propre, une seule passerelle vers le réseau technique.

Le plan : 2 lignes mères, 11 sous-lignes, 57 stations, **1 seule ouverte à ce
jour** (F-Gaz 3). Les visuels demandés ici serviront donc **56 stations à venir** :
ce qui est produit doit être un **système**, pas des pièces uniques.

**Public** : BTS, plus formation professionnelle adulte. Lecture parfois fragile
(FLE, DYS). Une idée à la fois, contraste franc, texte court, l'image porte le
propos. Les documents s'impriment aussi en A4 noir et blanc.

---

## 3. Ce qui est DÉJÀ produit — ne pas refaire

Huit SVG, tous vérifiés : `viewBox` présent, aucune dimension figée, texte en
`<text>` réel, **0 chevauchement et 0 débordement sur 110 textes** (mesure en
`getBoundingClientRect`).

| Fichier | Écran | Ce qu'il montre |
|---|---|---|
| `frise-generations.svg` | 1 | Escalier 2006 → 2014 → 2024, quatrième marche en pointillé pour 2050 |
| `phase-down.svg` | 2 | Barres décroissantes de l'enveloppe, bouteilles qui se raréfient |
| `conversion-teqco2.svg` | 3 | La formule, deux installations comparées, l'échelle des PRP |
| `deux-regimes.svg` | 4 | Deux colonnes : équipement neuf / maintenance du parc |
| `trois-obligations.svg` | 5 | Contrôles, récupération, registre + l'échelle des seuils 5/50/500 |
| `aptitude-capacite-categories.svg` | 6 | Aptitude et capacité, puis les sept catégories |
| `raisonnement-technicien.svg` | 7 | Les quatre questions en cascade |
| `le-reflexe.svg` | 8 | La fiche périmée barrée face au texte en vigueur |

**Animations déjà en place** (état au repos = image finale, l'animation ne fait
que raconter comment on y arrive) : entrée des trois cartes de
`trois-obligations`, flèche qui glisse dans `le-reflexe`, fondu et montée à
chaque changement d'écran, apparition des figures, souffle du bouton « Écouter ».

---

## 4. Ce qui est DEMANDÉ à Claude Design

### 4.1 — Identité visuelle du réseau Législation `priorité 1`

Le réseau n'a aujourd'hui aucune identité propre : il emprunte celle du site
technique. Il lui faut la sienne, déclinable sur 57 stations.

**a. Bandeau d'ouverture de station** — le visuel qui accueille l'élève avant
qu'il clique sur « Commencer ». Format large (ratio 3:1 environ), il doit tenir
en tête de page sans pousser le bouton hors de l'écran.
*Le sujet : la règle, le texte, la norme — pas le froid. Ce réseau parle de
droit et de sécurité, pas de thermodynamique.*

**b. Jeu de 11 pictogrammes de sous-lignes**, cohérents entre eux, lisibles à
28 px comme à 120 px, et **reconnaissables en noir et blanc** :
Thermique · Acoustique · Incendie · Électrique · Fluidique & thermique · La DESP
(équipements sous pression) · Certifications & normes · Droit du travail ·
Risques professionnels · Déchets · Impact environnemental.

**c. Un motif de fond discret** pour les pages d'accueil de sous-ligne, qui ne
gêne jamais la lecture (la règle du support clair reste absolue).

### 4.2 — Illustration d'ouverture par station `priorité 2`

Une image d'ambiance en tête de chaque station, qui **situe le sujet** sans le
schématiser — le schéma technique vient après, dans le corps. Pour F-Gaz 3 :
l'idée du texte réglementaire qui se durcit, génération après génération.

Ce n'est utile qu'une fois le système de la § 4.1 posé : **une seule illustration
d'essai d'abord**, sur F-Gaz 3, à valider avant d'en produire d'autres.

### 4.3 — Ce qui n'est PAS demandé

Les huit schémas du § 3 : ils existent et sont vérifiés. Ne pas les redessiner,
ne pas les « embellir ». S'ils devaient évoluer, la demande viendrait à part.

---

## 5. Format de sortie exigé

- **SVG ou HTML, jamais de bitmap.** Le résultat est réintégré dans les modules
  et doit rester modifiable plus tard sans tout refaire.
- `viewBox` obligatoire, **aucune dimension figée en pixels**.
- Texte en `<text>` réel — jamais vectorisé, jamais en image.
- Lisible une fois **imprimé en A4 noir et blanc**.
- Aucune dépendance externe : pas de CDN, pas de police distante, pas de script
  tiers. Tout doit fonctionner hors ligne.

---

## 6. Interdits

- **Aucune image générée par IA, aucune photo.** Pictos : SVG simples faits main.
- **Aucun nom propre, aucun établissement, aucune donnée réelle ou réaliste.**
- Pas de variante sombre, pas de mode compact réduisant le texte sous les minima.
- **Aucun texte posé sur un tracé, une flèche ou un schéma.**
- Si un circuit frigorifique apparaît — **Croix du Frigoriste** : détendeur
  GAUCHE · compresseur DROITE · condenseur HAUT · évaporateur BAS. Sinon
  s'abstenir.
- Une source **citée** n'est pas une image **autorisée** : sans droit vérifiable,
  produire un visuel original non décalqué.

---

## 7. La charte — bloc à respecter tel quel

*(source : `usine-contenu\00-charte\CHARTE-GRAPHIQUE-INERWEB.md`, § 8)*

```
CHARTE GRAPHIQUE inerWeb — À RESPECTER

PALETTE (valeurs exactes, ne pas en inventer d'autres) :
  bleu marine #1b3a63 (identité, titres)   orange #ff6b35 (accent ÉCRAN seulement)
  orange de texte #c9451a                  bleu vif #3d7fca
  fond de page #f7f1e7 (crème)             fond de carte #fffdf8
  texte #10233c   secondaire #637285       filets rgba(27,58,99,.16)
  Sens : acquis #1e7e54 · échec #c0392b · fragile #b06a00

TYPOGRAPHIE :
  Titres : "Trebuchet MS", Calibri, Arial, sans-serif
  Corps  : Calibri, "Segoe UI", system-ui, Arial, sans-serif — 16-17px, interligne 1,6
  Chasse fixe : Consolas. JAMAIS de serif. JAMAIS de police chargée depuis un CDN.
  Document élève : 14 pt MINIMUM partout, tableaux compris. Jamais de texte justifié.

ÉCRAN :
1. AUCUN THÈME SOMBRE. Fond clair, texte sombre, partout.
2. NE JAMAIS conditionner une animation ou un son à `prefers-reduced-motion: reduce`.
   Le dessin AU REPOS doit déjà être l'image FINALE ; l'animation raconte comment on y arrive.
3. Réglage de lisibilité avant </body> : moteur/lisibilite.js
4. Aucune dépendance externe. Tout en local, doit fonctionner hors ligne.

IMPRESSION — SOBRIÉTÉ D'ENCRE :
5. LE TRAIT PORTE LE SENS, PAS LA SURFACE. Fond blanc pur, aucun aplat, aucune ombre,
   aucun dégradé, aucune zébrure. Les badges pleins deviennent des contours.
   CE N'EST PAS UNE CHARTE NOIR ET BLANC : filets, titres et badges GARDENT leur couleur.
   Ce sont les SURFACES qui partent.
6. NE JAMAIS écrire `print-color-adjust: exact`.
7. Corps de texte imprimé en NOIR PUR. Sur papier, l'orange de TEXTE est #c9451a.

RÈGLE TRANSVERSALE :
8. La couleur ne porte JAMAIS seule une information — en niveaux de gris, le vert
   #1e7e54 (36 %) et le rouge #c0392b (38 %) sont indiscernables. Trois canaux :
   COULEUR + STYLE DE TRAIT (plein / double / tireté / pointillé) + MOT.
   Test : si on retire toute la couleur, l'information doit rester entière.
9. Accents français complets et corrects partout, jamais d'ASCII dégradé.

PUBLIC : BTS et formation professionnelle adulte, lecture fragile (FLE, DYS).
Une idée à la fois, contraste franc, texte court, l'image porte le propos.
```

---

## 8. Un point de vigilance à trancher

La charte dit : « **ne jamais conditionner une animation à
`prefers-reduced-motion`** ». Les animations déjà en place sur F-Gaz 3 le font —
mais elles ne portent **aucun contenu** : ce sont des entrées en scène, l'écran
est entier et lisible sans elles.

Deux lectures possibles, à trancher par F. Henninot :

- **lecture stricte** — aucun conditionnement, l'animation joue toujours ;
- **lecture par l'intention** — le conditionnement reste permis tant que
  l'animation ne porte rien, ce qui protège les lecteurs sensibles au mouvement.

C'est la seconde qui est appliquée aujourd'hui. Rien ne se perd dans les deux cas :
le désaccord porte sur le confort, pas sur le contenu.

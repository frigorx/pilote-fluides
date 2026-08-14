# Reprise — Régulateur de pression de carter pédagogique

## Copie concernée

`C:\Users\henni\Desktop\inerweb full ia\regulateur-kvl-pedagogique`

Le module a été créé à côté des pages Électrovanne et Détendeur. Celles-ci n’ont pas été
modifiées. Ne pas reporter automatiquement les changements dans une autre copie de Pilote Fluides.

## État

- **BON À TIRER donné par F. Henninot le 14/08/2026** (« ok pour c ») — intégré au pack
  pilote-fluides le jour même, brique C du plan des manipulations virtuelles ;
- la copie du Bureau (`inerweb full ia\regulateur-kvl-pedagogique`) reste l'export d'origine,
  celle-ci fait foi désormais ;
- produit documentaire principal : KVL 28, code `034L0046` ;
- dessins entièrement locaux et originaux ;
- aucune photo, image, coupe ou CAO Danfoss dans le livrable.

## Contrat fonctionnel

- 14 étapes et 7 questions ;
- réussite pédagogique à partir de `6/7` ;
- vitesses vocales `0.80 · 0.95 · 1.10 · 1.25`, défaut `0.95` ;
- clé locale `inerweb-kvl-rate` ;
- aucune voix ni aucun son au chargement ;
- navigation `ArrowLeft` / `ArrowRight` hors contrôles ;
- `100dvh` sans défilement ;
- aucune dépendance distante ;
- schémas techniques manuels ;
- convention de coupe : matière hachurée, cavité blanche, contour bleu marine et flux bleu.

## Cycle de rendu

`renderLesson()` arrête la voix, injecte le contenu éditorial, appelle le rendu de l’étape, puis
actualise progression et navigation. Chaque activité reconstruite par `innerHTML` rebranche ses
écouteurs immédiatement.

## Points métier à préserver

- implantation sur l’aspiration, juste avant le compresseur ;
- pression de sortie comme grandeur régulée ;
- ouverture quand la pression de sortie tombe sous la valeur réglée ;
- limitation du passage lorsque la pression de sortie s’élève ;
- soufflet d’égalisation distinct de l’amortisseur de pulsations ;
- bande P distincte d’un comportement tout-ou-rien ;
- cas `034L0046` identifié comme KVL 28, ODF à braser 1 1/8 po ;
- valeurs produit toujours accompagnées de leur périmètre documentaire ;
- sélection par fluide, puissance, températures, pression maximale et raccordement ;
- réglage précédé d’une identification et d’une mesure ;
- régulateur mécanique distinct d’un pressostat électrique ;
- aucune ouverture d’un circuit chargé ou sous pression ;
- aucune photo ou géométrie constructeur redistribuée.

## Références canoniques consultées

- catalogue local : `CATALOGUE-PRODUCTIONS-AUDIT.md` ;
- RAG HAL : documents KVL et ressource `CONSIGNES-SOCLE-THEORIQUE.md` ;
- planche canonique :
  `C:\git\pilote-fluides\packs\fluides\res\svg\regulateurs-pression.svg` ;
- fiche Danfoss principale : `AI555531791071fr-000101`, avril 2026 ;
- guide d’installation : `AN22668643486000-000601` ;
- dessin coté KVL 28 : `ID542854248638-0301`.

Le résumé RAG avertissait que sa description initiale devait être validée. Les faits affichés ont
donc été recoupés avec la fiche technique Danfoss avant rédaction.

## Vérifications attendues

Tester les 14 étapes, les activités et le quiz en `1024 × 768`, `1280 × 720`, `1366 × 768`,
`390 × 844` et `360 × 640`, avec voix indisponible et stockage bloqué. Vérifier le dialogue
Sources, l’impression, le clavier, les états ARIA et l’absence de requête distante.


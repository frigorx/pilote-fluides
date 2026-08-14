# Sources techniques — Régulateur de pression de carter

Consultation et recoupement : 6 août 2026.

## Source principale

### Danfoss — Régulateur de pression du carter KVL

- Document : `AI555531791071fr-000101`.
- Édition lue : avril 2026, 9 pages.
- Adresse :
  `https://assets.danfoss.com/documents/583205/AI555531791071fr-000101.pdf`
- Faits retenus :
  - montage sur la conduite d’aspiration en amont du compresseur ;
  - protection contre la surcharge au démarrage après arrêt prolongé ou dégivrage ;
  - ouverture quand la pression de sortie tombe sous la valeur réglée ;
  - régulation selon la pression de sortie ;
  - soufflet d’égalisation dont la surface effective correspond à celle du siège ;
  - dispositif d’amortissement contre les pulsations ;
  - pièces 1 à 9 de la coupe fonctionnelle ;
  - plage de régulation 0,2–6,0 bar, réglage d’usine 2 bar, PS 18 bar ;
  - bande P maximale KVL 28–35 : 1,5 bar ;
  - données nécessaires au dimensionnement ;
  - `034L0046` : KVL 28, raccord à braser 1 1/8 po ;
  - dimensions KVL 28 : H1 259 mm, H2 151 mm, B1 105 mm, C 20 mm, diamètre 43 mm,
    masse nette 1,0 kg.
- Périmètre : les valeurs sont celles de la gamme et de l’édition indiquées, jamais des règles
  universelles.

### Danfoss — fiche française antérieure

- Document : `AI246886497547fr-001001`, février 2023.
- Adresse :
  `https://assets.danfoss.com/documents/latest/239492/AI246886497547fr-001001.pdf`
- Usage : recoupement indépendant de la fonction, de la coupe, des limites et de l’identification
  `034L0046`.

## Produit de référence

- Page produit fournie :
  `https://store.danfoss.com/fr/fr/p/034L0046`
- Identification recoupée dans les fiches : KVL 28, raccord ODF à braser 1 1/8 po.
- La page produit et la référence ne constituent pas une autorisation de reproduire les médias.

## Installation et pièces

### Guide d’installation KV

- Document : `AN22668643486000-000601`, mars 2017, 2 pages.
- Adresse :
  `https://assets.danfoss.com/documents/35498/AN22668643486000-000601.pdf`
- Usage : famille de produits, limites affichées, sens +/− et ordre général de montage.
- Prudence : les pictogrammes et valeurs de brasage ne sont pas transformés en procédure textuelle
  universelle dans le module. La notice à jour du code posé reste prioritaire.

### Pièces et accessoires KV / CPCE

- Document : `AI227986437379en-000301`.
- Adresse :
  `https://assets.danfoss.com/documents/150368/AI227986437379en-000301.pdf`
- Usage : confirmation de l’existence de capuchons, joints, vis de blocage et pièces distinctes
  selon les tailles.

## Dessin coté et sélection

### Dimension KVL 28

- PDF : `https://assets.danfoss.com/drawings/556667/ID542854248638-0301.pdf`
- Usage : recoupement de la silhouette et des dimensions extérieures.
- Le dessin n’est ni intégré ni décalqué.

### Quick Select Guide 2026

- Document : `AF371473195263en-010702`.
- Adresse :
  `https://assets.danfoss.com/documents/566437/AF371473195263en-010702.pdf`
- Usage : recoupement de la présence de `034L0046` dans le guide de sélection 2026.

### Autres fiches fournies

- `AI217486427731en-US0701` :
  `https://assets.danfoss.com/documents/152291/AI217486427731en-US0701.pdf`
- `AI555531791071en-000101` :
  `https://assets.danfoss.com/documents/581625/AI555531791071en-000101.pdf`
- `AF238586497502en-010401` :
  `https://assets.danfoss.com/documents/100299/AF238586497502en-010401.pdf`
- Usage : références complémentaires, non nécessaires aux valeurs centrales affichées.

## Déclarations fournies

- EU-declaration `034L9600.AA` :
  `https://assets.danfoss.com/approvals/526348/ID536138734143-0101.pdf`
- EU DOC PL01 Packaging :
  `https://assets.danfoss.com/approvals/598426/ID568641171791-0101.pdf`
- Danfoss MD `034L9625.AF` :
  `https://assets.danfoss.com/approvals/526294/ID365946844728-0301.pdf`
- Danfoss MD `032F9268.AD` :
  `https://assets.danfoss.com/approvals/582190/ID466129313078-0201.pdf`
- Danfoss MD `034R9541.AB` :
  `https://assets.danfoss.com/approvals/583985/ID365946686609-0201.pdf`
- Usage : traçabilité réglementaire du produit ; aucun pictogramme ou texte de déclaration n’est
  reproduit dans le parcours.

## Fonds local et RAG

- `Régulateur de pression de démarrage KVL.pdf`, résultat RAG CAP IFCA.
- `2.3 Technologie (régulateur de pression d'aspiration KVL).pdf`, résultat RAG transversal.
- `C:\git\pilote-fluides\CONSIGNES-SOCLE-THEORIQUE.md`, chantier régulateurs.
- `C:\git\pilote-fluides\packs\fluides\res\svg\regulateurs-pression.svg`, planche canonique
  sur les emplacements KVR/KVP/KVL.

La ressource théorique locale comportait un avertissement de validation. Elle a servi à retrouver
le sujet, puis les faits ont été recoupés avec les documents Danfoss ci-dessus.

## Limites éditoriales

- aucune consigne de réglage universelle ;
- aucun dimensionnement à partir d’un diamètre seul ;
- aucune compatibilité fluide supposée pour un code différent ;
- aucune ouverture d’un circuit chargé ou sous pression ;
- aucune procédure réglementaire déduite d’une déclaration de conformité.


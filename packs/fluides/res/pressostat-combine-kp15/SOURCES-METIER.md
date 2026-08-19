# Sources métier et arbitrages

Consultation : 19 août 2026.

## Sources Danfoss

1. Page produit officielle KP15, code 060-126491 :
   https://designcenter.danfoss.com/en-us/products/climate-solutions-for-cooling/switches/dual-pressure-switches/kp/p/060-126491
2. Fiche de données officielle « Pressure switch, Type KP », AI216886432258en-001101 :
   https://assets.danfoss.com/documents/latest/162761/AI216886432258en-001101.pdf

## Données retenues pour 060-126491

- côté gauche BP : −0,2 à 7,5 bar Pe ; différentiel 0,7 à 4 bar ; réarmement automatique ;
- côté droit HP : 8 à 32 bar Pe ; différentiel fixe 4 bar ; réarmement manuel maximum ;
- élément sensible : soufflet ;
- fonction de contact : SPDT + SPST(NO) ;
- pression d’essai maximale annoncée : 20 bar côté gauche et 35 bar côté droit.

Ces limites constructeur ne deviennent pas des pressions d’essai conseillées. La procédure, les instruments, le raccord choisi et les limites de l’installation déterminent l’essai réel.

## Câblage de la variante enseignée

La fiche Danfoss distingue :

- une variante combinée avec signal BP : A/B/C + PE ;
- une variante combinée avec signaux BP et HP : A/B/C/D + PE.

Le module enseigne la seconde, conformément à la demande de Franck :

- A : arrivée ligne ;
- C : charge ou commande KM1 ;
- B : signal BP ;
- D : signal HP ;
- PE : conducteur de protection, en plus des quatre conducteurs actifs.

Le diagramme de la référence réellement posée fait foi. Le repérage 1–2–4 des pressostats simples n’est pas transposé au KP15.

## Relations de réglage

- BP automatique : `DIFF = CUT IN − CUT OUT` ;
- HP : `DIFF = CUT OUT − seuil de retour` ;
- pour 060-126491, le différentiel HP vaut 4 bar et la baisse au seuil ne referme pas seule le contact : le RESET reste volontaire.

Les graduations servent au préréglage. Les seuils sont contrôlés avec un manomètre précis et plusieurs cycles.

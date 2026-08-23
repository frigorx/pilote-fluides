# Audit — textes qui débordent de leur SVG

> Mesure du 23/08/2026, demandée par F. Henninot après la découverte d'un
> débordement dans `packs/fluides/res/svg/aptitude-capacite.svg` au moment de
> transposer la station F-Gaz 3 du réseau Législation.
> **Constat, pas correction** : rien n'a été modifié dans le pack.

## Ce qui a été mesuré

- **198 fichiers** : tous les SVG de `packs/` et `schemas/` qui contiennent au
  moins une balise `<text>`. Les 4 704 symboles de `symboles/svg/` sont exclus
  (bibliothèque de pictogrammes, pas d'illustrations rédigées).
- Méthode : chaque SVG est rendu dans le navigateur à 900 px de large, puis
  chaque `<text>` est mesuré en **`getBoundingClientRect`** — jamais `getBBox`,
  qui ignore les `transform`. Un texte est « en défaut » quand sa boîte sort du
  `viewBox` de plus de 2 unités.
- Aucun fichier sans `viewBox` : les 198 en ont un.

## Pourquoi le défaut est invisible sur le poste de F. Henninot

Les SVG maison déclarent `font: … Calibri, Segoe UI, sans-serif`. **Calibri
n'existe que sur Windows avec Office.** Ailleurs — Mac, Chromebook, Linux,
Android, et certains navigateurs en bac à sable — le navigateur retombe sur une
police plus large, et le texte s'allonge de 10 à 15 %.

D'où deux chiffres très différents :

| Contexte de lecture | Fichiers en défaut |
|---|---|
| Poste Windows avec Calibri (celui de F. Henninot) | **10** sur 198 |
| Machine sans Calibri (repli Arial simulé) | **19** sur 198 |

**Neuf fichiers débordent donc uniquement chez les autres.** C'est le cœur du
problème : le contrôle visuel sur le poste de production ne peut pas les voir.

## Les 19 fichiers, du plus grave au plus léger

Le dépassement est donné en unités du `viewBox` (≈ pixels à l'affichage normal).

| Dépassement | Fichier | Textes | Extrait |
|---:|---|---:|---|
| 135 | `res/co2-r744/illustrations/co2-protection.svg` | 1 | « Il ne fabrique pas d'oxygène… » |
| 135 | `res/illustrations/co2-protection.svg` | 1 | idem — **copie du même dessin** |
| 135 | `res/svg/co2-protection.svg` | 1 | idem — **troisième copie** |
| 68 | `res/illustrations/diagramme-logph.svg` | 2 | « La table de saturation dit exa… » |
| 68 | `res/svg/diagramme-logph.svg` | 2 | idem — copie |
| 62 | `res/svg/secu-consignation.svg` | 1 | « S'il marchait au premier essai… » |
| 50 | `res/illustrations/co2-nh3-compare.svg` | 1 | « Une attestation A1 ou A2 ne do… » |
| 50 | `res/svg/co2-nh3-compare.svg` | 1 | idem — copie |
| 37 | `res/svg/coup-de-liquide-piston.svg` | 1 | « ✓ ELLE SE COMPRIME » |
| 33 | `res/illustrations/compresseurs.svg` | 1 | « Un seul des groupes 6 à 9 est… » |
| 33 | `res/svg/compresseurs.svg` | 1 | idem — copie |
| 24 | `res/illustrations/le-circuit_detendeur.svg` | 1 | « Le détendeur : un passage étro… » |
| 18 | `res/svg/familles-fluides.svg` | 1 | « hydrogène → vie courte » |
| 15 | `res/symboles/relais_thermique.svg` | 2 | « Plage _A/_A » |
| 11 | `res/illustrations/classes-de-securite_vitesse-flamme.svg` | 1 | « le front avance lentement… » |
| 11 | `res/svg/coup-de-liquide-principe.svg` | 1 | « clapet cassé » |
| 11 | `res/svg/lie-domaine.svg` | 1 | « L'appareil se règle pour un ga… » |
| 7 | `res/svg/prepa-chantier.svg` | 1 | « Ce qui n'a pas été prévu ici s… » |
| 7 | `res/symboles/differentiel_4p.svg` | 1 | « ___mA » |

## Ce que la liste révèle en passant

**Les copies.** `co2-protection.svg` existe en trois exemplaires identiques,
`diagramme-logph`, `co2-nh3-compare` et `compresseurs` en deux. Corriger un
exemplaire laisserait les autres fautifs. Le vrai sujet n'est pas le
débordement : c'est qu'un même dessin vit à trois endroits.

## Deux limites de cet audit — il sous-estime

1. **Seul le cadre est testé**, pas les blocs internes. Un texte peut sortir de
   sa carte de fond tout en restant dans le `viewBox` : invisible ici. C'est
   exactement le cas d'`aptitude-capacite.svg`, qui **n'apparaît pas dans le
   tableau** alors que ses lignes « Sans elle… » sortent de leur bloc de 61 et
   70 unités. Le comptage réel des dessins abîmés est donc supérieur à 19.
2. **Le repli simulé est Arial**, une police plutôt étroite. Des replis plus
   larges (DejaVu Sans sur Linux, Liberation Sans) allongent davantage.

## Piste de fond, si le sujet doit être traité

Corriger 19 fichiers à la main les remet d'aplomb pour Arial, pas pour le repli
suivant. La cause est la police déclarée : tant que les SVG comptent sur Calibri,
la mise en page dépend de la machine du lecteur. Deux sorties possibles, à
arbitrer :

- **embarquer une police** (Lexend est déjà dans `moteur/polices/`, sous licence
  OFL) et la déclarer dans les SVG — la mise en page devient identique partout ;
- **prendre de la marge** : viser 85 % de la largeur disponible au lieu de la
  remplir, pour que n'importe quel repli passe.

Aucune des deux n'est engagée : F. Henninot décide.

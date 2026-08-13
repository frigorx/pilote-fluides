# Schémas QElectroTech — la base de travail

16 schémas de cours, en SVG, avec leurs fichiers source `.qet`.

Ce sont **les schémas de F. Henninot**, dessinés pour ses TP et ses TD depuis
2022 : le circuit fluidique, le pump-down, l'armoire CAP IFCA, le raccordement
du régulateur EWPC et de l'horloge. Pas des illustrations reprises ailleurs —
sa manière de poser un circuit devant une classe.

> **Licence.** Les schémas sont de F. Henninot, sous la licence du dépôt.
> Les **symboles** qu'ils emploient viennent de la collection d'éléments
> [QElectroTech](https://qelectrotech.org/), sous
> [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) : attribution
> obligatoire, et pas d'usage comme données d'entraînement.
> Voir [`../symboles/LICENCE.md`](../symboles/LICENCE.md) — c'est le même fonds.

---

## Ce qu'il y a

| Projet | Folios | Ce que c'est |
|---|--:|---|
| **CAP IFCA** | 7 | le dossier complet d'une armoire : puissance, commande, borniers repérés, face avant du coffret, plan de raccordement compresseur / évaporateur / PSL / PZL / thermostat |
| **shema transpho** | 3 | le plus gros — 85 organes et 98 liaisons au folio 1, horloge et régulateur EWPC |
| **LE PLUS SIMPLE DU MONDE** | 2 | alimentation, compresseur, évaporateur, contact horloge, sections 3G1.5 et 3G2.5 |
| **CHEMA FLUIDIQUE FRIGO BLANC** | 1 | le circuit fluidique complet, avec les repères PSL, PZH, s1 et s2 |
| **chema fluidique ccf** | 2 | deux circuits fluidiques courts et lisibles — les plus propres pour débuter |
| **SIMBOLE ELECTRIQUE** | 1 | la planche des 32 symboles, sans liaison : la légende à distribuer |

### Ce qui a été écarté

Trois folios de brouillon dans `SIMBOLE ELECTRIQUE` (folios 2, 3 et 4) : des
fragments de quelques organes, restés en plan. Et le projet `tention.qet`
en entier — un essai.

L'exclusion est **dans la commande de régénération**, pas faite à la main :
sinon les brouillons reviendraient au prochain passage de l'outil. Pour en
remettre un en ligne, il suffit de le retirer de la liste `--ignorer`.

---

## Utiliser un schéma

```html
<img src="/pilote-fluides/schemas/svg/chema-fluidique-frigo-blanc-folio1.svg"
     alt="Circuit fluidique — repères PSL, PZH, s1, s2">
```

C'est du vectoriel : ça se projette au tableau et s'imprime en A3 sans baver.

`index.json` dit, pour chaque folio, **quels organes** il contient et **quels
repères** y figurent. De quoi répondre à « quels schémas j'ai déjà faits avec
un PZH ? » :

```js
const { schemas } = await (await fetch("schemas/index.json")).json();
const avecPZH = schemas.filter((s) => s.reperes.includes("PZH"));
```

---

## Régénérer

```bash
python3 schemas/outils/qet-projet-vers-svg.py schemas/qet/*.qet --sortie schemas \
  --ignorer "simbole-electrique:2,simbole-electrique:3,simbole-electrique:4"
```

Python 3 seul, aucune dépendance, **et pas besoin de QElectroTech** : un `.qet`
embarque dans sa section `<collection>` la définition de chaque symbole qu'il
emploie. Le fichier se suffit à lui-même.

Une exclusion qui ne vise aucun folio existant fait échouer la commande : une
faute de frappe dans `--ignorer` laisserait sinon un brouillon en ligne en
croyant l'avoir retiré.

---

## Ce que l'outil sait faire, et ce qu'il approxime

**Fidèle** : les organes et leur rotation, les traits tirés à la main, les
rectangles et cercles, les textes libres, les repères.

**Approché — le tracé des liaisons.** QElectroTech ne stocke pas le chemin d'un
conducteur : il ne garde que les deux bornes reliées et **recalcule** le tracé à
l'ouverture. L'outil re-route donc lui-même, en angles droits. Sur ces 16
folios le résultat tient, mais **un conducteur peut passer ailleurs que dans
QElectroTech**. À vérifier avant d'imprimer un sujet d'évaluation.

C'est aussi ce qui rend ces SVG utiles quand QElectroTech n'est pas installé :
ils donnent à voir un `.qet` sans le logiciel.

---

*inerWeb Édu — F. Henninot — LP Privé Jacques Raynaud, Campus ÉQUATIO*

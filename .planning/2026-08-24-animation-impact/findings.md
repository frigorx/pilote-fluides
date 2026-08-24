# Findings — Tri des illustrations, branche Impact environnemental

> Phase 1 achevée le 24/08/2026. Source : les `data-narration` des 5 stations
> (extraction complète dans `annexe-ecrans-impact.md`, même dossier).
> Critères des consignes : gagne à bouger = flux qui circule, quantité qui varie,
> chaîne d'étapes, voies qui divergent, seuil franchi. Ne gagne rien = définition,
> comparaison côte à côte, carte d'identité, bilan.

## Constat structurel

Chaque station finit par un écran 7 « quatre situations » (cartes de raisonnement)
et un écran 8 « bilan » : **fixes d'office** dans les 5 stations (10 SVG écartés
sans examen supplémentaire).

⚠️ **L'« enveloppe qui rétrécit » (phase-down) n'est PAS dans cette branche** :
elle vit dans F-Gaz 3 (sous-ligne Fluidique), déjà animée d'après le journal des
commits. Les mouvements de la branche Impact sont : le TEWI, les chaînes ACV,
l'histoire Montréal → Kigali, les courbes d'écoconception. Signalé à F. Henninot.

## Liste retenue — 19 animations fermes, 3 facultatives

### impact-prp-odp — 4 fermes
| Écran | SVG | Verdict | Mouvement (scénario = data-narration) |
|---|---|---|---|
| 1 | deux-echelles.svg | fixe | comparaison côte à côte |
| 2 | mecanisme-odp.svg | **ANIMER** | deux voies divergent : la molécule Cl monte et casse la couche, la molécule HFC monte sans l'entamer |
| 3 | mecanisme-prp.svg | **ANIMER** | flux qui circule : « suivez la chaleur » — soleil → sol → infrarouge intercepté et renvoyé |
| 4 | piege-odp-nul.svg | fixe | carte d'identité du R-410A |
| 5 | repere-deux-axes.svg | **ANIMER** | quantité qui varie : les 6 points s'installent du plus bas (NH₃ 0) au plus haut (R-404A 3922) |
| 6 | cas-chambre-froide.svg | **ANIMER** | même goutte des deux côtés, le nuage gonfle ×3922 contre ×1 |
| 7–8 | quatre-situations, bilan | fixes | raisonnement + bilan |

### impact-tewi — 5 fermes, 1 facultative
| Écran | SVG | Verdict | Mouvement |
|---|---|---|---|
| 1 | balance-tewi.svg | **ANIMER** | les deux plateaux se chargent tour à tour ; la balance RESTE équilibrée (la narration l'exige : aucun plateau plus lourd par principe) |
| 2 | part-directe.svg | **ANIMER** | chaîne d'étapes : « suivez la chaîne » — fuite × PRP = part directe |
| 3 | part-indirecte.svg | **ANIMER** | même chaîne, miroir : énergie × durée → réseau → part indirecte |
| 4 | piege-machine-gourmande.svg | **ANIMER** | l'aiguille pousse dans le rouge, la balance penche côté indirect |
| 5 | piege-machine-qui-fuit.svg | **ANIMER** | miroir : les gouttes s'échappent, la balance penche côté direct |
| 6 | facteurs-indirect.svg | facultatif | tracé séquentiel des 3 flèches d'attribution — apport modéré |
| 7–8 | quatre-situations, bilan | fixes | |

### impact-acv-carbone — 3 fermes, 2 facultatives
| Écran | SVG | Verdict | Mouvement |
|---|---|---|---|
| 1 | quatre-etapes-acv.svg | **ANIMER** | la chaîne se construit bloc par bloc, « exploiter » s'élargit |
| 2 | fabriquer.svg | facultatif | flèches entrantes puis appareil sortant — vignette |
| 3 | transporter.svg | **ANIMER** | le camion avance de l'usine au chantier le long des pointillés |
| 4 | exploiter.svg | facultatif | la flèche circulaire tourne (les années passent) — vignette |
| 5 | demolir.svg | **ANIMER** | l'appareil se sépare en trois flux (voies qui divergent) |
| 6 | indicateur-carbone-re2020.svg | fixe | attribution statique de deux zones |
| 7–8 | quatre-situations, bilan | fixes | |

### impact-ecoconception — 3 fermes
| Écran | SVG | Verdict | Mouvement |
|---|---|---|---|
| 1 | concevoir-pour-durer.svg | **ANIMER** | les deux barres de durée progressent ensemble, la grise s'arrête (croix), la verte continue |
| 2 | concevoir-pour-reparer.svg | fixe | deux cartes face à face |
| 3 | concevoir-pour-consommer-moins.svg | fixe | trois cartes convergentes, statique |
| 4 | etiquette-energie.svg | fixe | mécanisme d'étiquette, pas de séquence dans la narration |
| 5 | lien-tewi.svg | **ANIMER** | les barres se construisent : base directe identique, part indirecte qui grandit différemment |
| 6 | piege-prix-bas.svg | **ANIMER** | les deux courbes se tracent, se croisent (« le surcoût apparaît »), l'ambrée finit au-dessus |
| 7–8 | quatre-situations, bilan | fixes | |

### impact-montreal-kigali — 4 fermes
| Écran | SVG | Verdict | Mouvement |
|---|---|---|---|
| 1 | frise-trois-temps.svg | **ANIMER** | l'histoire s'enchaîne : Montréal → relais HFC → Kigali, flèche après flèche |
| 2 | montreal-1987.svg | **ANIMER** | les molécules Cl/Br montent, la zone d'amincissement s'élargit |
| 3 | relais-hfc.svg | fixe | deux cartes reliées, comparaison |
| 4 | nouveau-probleme-prp.svg | **ANIMER** | les barres de PRP croissent l'une après l'autre, du CO₂ invisible au R-404A rouge |
| 5 | amendement-kigali.svg | **ANIMER** | la note verte vient s'agrafer au document Montréal — LE message : un ajout, pas un nouveau traité |
| 6 | ozone-vers-climat.svg | fixe | arbre d'attribution statique |
| 7–8 | quatre-situations, bilan | fixes | |

## Récapitulatif

| Station | Fermes | Facultatives | Fixes |
|---|---|---|---|
| impact-prp-odp | 4 | 0 | 4 |
| impact-tewi | 5 | 1 | 2 |
| impact-acv-carbone | 3 | 2 | 3 |
| impact-ecoconception | 3 | 0 | 5 |
| impact-montreal-kigali | 4 | 0 | 4 |
| **Total** | **19** | **3** | **18** |

## Coût Design estimé (Phase 2 — à annoncer)

- 19 pièces fermes (22 si les facultatives sont retenues).
- 5 demandes de génération (une par station, pièces regroupées, avec charte +
  couleur #047857 + data-narration + SVG fixe joint pour chaque pièce).
- 1 salve unique de corrections groupées pour la branche entière.
- Soit ~6 allers-retours Design au total pour la branche.

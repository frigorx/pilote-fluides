# Matrice compétences × contenu × questions

> Généré par `node build/matrice.mjs` — ne pas éditer à la main.
> Source : arrêté du 21 novembre 2025, annexe II.B — 136 codes.
> Catégories visées par le pack : A1 · A2 · D · E.

Pour chaque compétence du référentiel : **où elle est enseignée** (la fiche que
l'élève lit) et **où elle est vérifiée** (les questions qui l'interrogent).

**Ce que ce document prouve** : le rattachement. Un code sans fiche, ou sans
question, s'y voit immédiatement. **Ce qu'il ne prouve pas** : la qualité de ce qui
est enseigné — `COUVERTURE-REFERENTIEL.md` dit qu'un code est *cité*,
`PROFONDEUR-REFERENTIEL.md` qu'il est *tenu*, ce document qu'il est *enseigné et
vérifié* ; seule la relecture métier dira qu'il est **bien** enseigné.

## 1. Synthèse

| Catégorie | Compétences exigées | Enseignées | Interrogées | Les deux |
|---|---:|---:|---:|---:|
| **A1** | 94 | 94 | 94 | 94 (100 %) |
| **A2** | 93 | 93 | 93 | 93 (100 %) |
| **D** | 21 | 21 | 21 | 21 (100 %) |
| **E** | 17 | 17 | 17 | 17 (100 %) |

Sur les **94 compétences** exigées par au moins une des catégories du pack :

- ✅ **94** enseignées *et* vérifiées ;
- 🟠 **0** enseignées sans jamais être interrogées ;
- 🔴 **0** interrogées sans fiche qui les enseigne ;
- ⬜ **0** ni enseignées ni interrogées.

S'y ajoutent 🔵 **5 compétences traitées en information** :
elles ne sont exigées dans aucune des catégories du pack (CO₂, ammoniac, codes propres
aux catégories B et C), mais le contenu les aborde — l'annexe II.C impose d'ailleurs au
moins une question sur les spécificités du CO₂ et du NH₃ dans les sujets A1 et A2.

Côté questions : **269** au total, dont **252** rattachées à une compétence et **17** hors référentiel (§ 3).
**48 fiches** déclarent au moins une compétence.

## 2. La matrice, groupe par groupe

### G1 — Législation et thermodynamique élémentaire

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **1.00** ★ | A1 théo. · A2 théo. · D théo. · E théo. | `g0` | 4 | ✅ |
| **1.01** | A1 théo. · A2 théo. · D théo. · E théo. | `g1a` | 1 | ✅ |
| **1.02** | A1 théo. · A2 théo. · D théo. | `g1a` `g1s` `g1e` | 17 | ✅ |
| **1.03** | A1 théo. · A2 théo. · E théo. | `g1b` | 7 | ✅ |
| **1.04** | A1 théo. · A2 théo. · D théo. | `g1a` | 8 | ✅ |
| **1.05** | A1 théo. · A2 théo. | `g1d` | 6 | ✅ |
| **1.06** | A1 théo. · A2 théo. · D théo. · E théo. | `g1c` | 1 | ✅ |
| **1.07** ★ | A1 théo. · A2 théo. · D théo. · E théo. | `g1c` | 3 | ✅ |
| **1.08** ★ | A1 théo. · A2 théo. · D théo. · E théo. | `cl1` `g11` | 4 | ✅ |
| **1.09** ★ | — *(B)* | `g13` | 3 | 🔵 |
| **1.10** ★ | — *(C)* | — | — | · |

#### 1.00 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaissance élémentaire de la législation de l'Union européenne et nationale applicable, notamment celle relative aux gaz à effet de serre fluoré, aux DEEE et à l'écoconception*

- **Enseigné** — `g0` Ce que la loi vous impose *(+ question intégrée)*
  <br>Dit à l'élève : « Identifier les obligations légales de base liées aux fluides frigorigènes »
- **Interrogé** — 4 question(s) :
  - `q-g4-v6_174` *(niveau 1, rangée en G4)* — Le registre d'équipement doit être tenu :
  - `q-g4-107` *(niveau 1, rangée en G4)* — Le registre peut être tenu :
  - `pk-g0-1` *(niveau 1, rangée en G1)* — Vous voulez intervenir vous-même sur un circuit frigorifique contenant des fluides frigorigènes. Quel document personne…
  - `pk-g0-2` *(niveau 2, rangée en G1)* — Un climatiseur trop vieux part au rebut, dans la filière DEEE. Que devient le fluide frigorigène qu'il contient encore ?

#### 1.01 — ✅ enseigné et vérifié

> *Connaître les unités normalisées ISO pour la température, la pression, la masse, la densité et l'énergie*

- **Enseigné** — `g1a` Unités, pression, thermodynamique utile *(+ question intégrée)*
  <br>Dit à l'élève : « Utiliser les unités normalisées (température, pression, masse, énergie) »
- **Interrogé** — 1 question(s) :
  - `q-g1-62` *(niveau 1, rangée en G1)* — La pression absolue est égale à :

#### 1.02 — ✅ enseigné et vérifié

> *Comprendre la théorie élémentaire des systèmes de réfrigération : thermodynamique élémentaire (terminologie, paramètres et processus essentiels tels que « surchauffe », « côté haute pression », « chaleur de compression », « enthalpie », « effet de réfrigération », « côté basse pression », « sous-refroidissement »), propriétés et transformations thermodynamiques des réfrigérants, y compris l'identification des mélanges zéotropiques et des états des fluides*

- **Enseigné** — `g1a` Unités, pression, thermodynamique utile *(+ question intégrée)*
  <br>Dit à l'élève : « Expliquer la thermodynamique élémentaire du froid »
- **Enseigné** — `g1s` Chaleur sensible et chaleur latente *(+ question intégrée)*
  <br>Dit à l'élève : « Distinguer chaleur sensible et chaleur latente, et nommer les états du fluide »
- **Enseigné** — `g1e` Surchauffe et sous-refroidissement *(+ question intégrée)*
  <br>Dit à l'élève : « Expliquer la surchauffe et le sous-refroidissement, et savoir les mesurer »
- **Interrogé** — 17 question(s) :
  - `q-g1-160` *(niveau 1, rangée en G1)* — Pourquoi ne doit-on JAMAIS laisser du liquide arriver au compresseur ?
  - `q-g1-v6_048` *(niveau 1, rangée en G1)* — La valeur typique de surchauffe à l'aspiration est de :
  - `q-g1-v6_145` *(niveau 1, rangée en G1)* — Le sous-refroidissement typique en sortie de condenseur est de :
  - `q-g1-157` *(niveau 1, rangée en G1)* — Dans quel état se trouve principalement le fluide frigorigène dans la ligne liquide ?
  - `q-g1-158` *(niveau 1, rangée en G1)* — Dans quel état se trouve principalement le fluide frigorigène dans la ligne d'aspiration ?
  - `q-g1-34` *(niveau 2, rangée en G1)* — Le R410A est un mélange :
  - `q-g3-66` *(niveau 1, rangée en G3)* — La température d'ébullition de l'eau à pression atmosphérique est :
  - `q-g11-v6_047` *(niveau 1, rangée en G11)* — Le COP d'une installation frigorifique se calcule par :
  - `q-g11-v6_147` *(niveau 2, rangée en G11)* — La puissance calorifique au condenseur est égale à :
  - `pk-g1s-1` *(niveau 1, rangée en G1)* — Un fluide est en train de bouillir. Vous continuez à lui apporter de la chaleur. Que devient sa température ?
  - `pk-g1s-2` *(niveau 1, rangée en G1)* — Dans un évaporateur, la dernière goutte de liquide vient de disparaître. Comment s'appelle ce point ?
  - `pk-g1s-3` *(niveau 2, rangée en G1)* — Pourquoi une machine frigorifique travaille-t-elle avec un fluide qui change d'état, plutôt qu'avec de l'air ?
  - `pk-g1s-4` *(niveau 2, rangée en G1)* — Sur un mélange zéotrope (série R-4xx), qu'est-ce qui distingue le palier de celui d'un corps pur ?
  - `pk-g1e-1` *(niveau 1, rangée en G1)* — Un technicien annonce « la surchauffe est de 7 ». De quoi parle-t-il exactement ?
  - `pk-g1e-2` *(niveau 1, rangée en G1)* — De quoi a-t-on besoin, au minimum, pour déterminer une surchauffe sur une installation en marche ?
  - `pk-g1e-3` *(niveau 2, rangée en G1)* — Quelle est la différence entre la surchauffe utile et la surchauffe totale ?
  - `pk-g1e-4` *(niveau 1, rangée en G1)* — À quoi sert le sous-refroidissement en sortie de condenseur ?

#### 1.03 — ✅ enseigné et vérifié

> *Utiliser les tableaux et graphiques correspondants et les interpréter dans le cadre de contrôles d'étanchéité indirects (y compris le contrôle du bon fonctionnement du système) : diagramme log p/h, tables de saturation d'un réfrigérant, diagramme d'un cycle frigorifique simple à compression*

- **Enseigné** — `g1b` Lire un log p-h et une table de saturation *(+ question intégrée)*
  <br>Dit à l'élève : « Lire un diagramme log p-h, une table de saturation, et y tracer un cycle »
- **Interrogé** — 7 question(s) :
  - `q-g1-v6_042` *(niveau 1, rangée en G1)* — Dans la zone diphasique (sous la cloche), le fluide est :
  - `q-g1-v6_041` *(niveau 1, rangée en G1)* — Sur le diagramme de Mollier (log P/h), l'axe horizontal représente :
  - `q-g1-v6_046` *(niveau 2, rangée en G1)* — Sur le diagramme de Mollier, la condensation et l'évaporation sont des transformations :
  - `q-g1-v6_143` *(niveau 2, rangée en G1)* — La cloche de saturation sur le diagramme de Mollier sépare :
  - `pk-g1b-1` *(niveau 1, rangée en G1)* — Sur un diagramme log p-h, où se trouve la zone où le fluide est un mélange de liquide et de vapeur ?
  - `pk-g1b-2` *(niveau 2, rangée en G1)* — Sur le tracé d'un cycle frigorifique, où se lit le sous-refroidissement ?
  - `pk-g1b-3` *(niveau 2, rangée en G1)* — Pourquoi la pression est-elle portée sur une échelle logarithmique dans ce diagramme ?

#### 1.04 — ✅ enseigné et vérifié

> *Décrire la fonction des principales composantes du système (compresseur, évaporateur, condenseur, détendeurs thermostatiques) et les transformations thermodynamiques du réfrigérant*

- **Enseigné** — `g1a` Unités, pression, thermodynamique utile *(+ question intégrée)*
  <br>Dit à l'élève : « Décrire la fonction de chaque composant du circuit »
- **Interrogé** — 8 question(s) :
  - `q-g1-151` *(niveau 1, rangée en G1)* — Quels sont les 4 organes principaux d'un circuit frigorifique (la croix du frigoriste) ?
  - `q-g1-153` *(niveau 1, rangée en G1)* — Dans quel organe le fluide frigorigène absorbe-t-il la chaleur ?
  - `q-g1-154` *(niveau 1, rangée en G1)* — Quel organe permet au fluide frigorigène de passer de l'état liquide haute pression à l'état liquide basse pression ?
  - `q-g1-v6_141` *(niveau 1, rangée en G1)* — L'énergie nécessaire au fonctionnement du cycle frigorifique est apportée par :
  - `q-g1-v6_142` *(niveau 1, rangée en G1)* — La puissance frigorifique est produite au niveau de :
  - `q-g1-v6_146` *(niveau 1, rangée en G1)* — Dans le cycle frigorifique, la chaleur est rejetée au niveau de :
  - `q-g1-v6_040` *(niveau 2, rangée en G1)* — La transformation dans le détendeur est dite :
  - `q-g1-v6_045` *(niveau 2, rangée en G1)* — La compression dans le compresseur est théoriquement :

#### 1.05 — ✅ enseigné et vérifié

> *Connaître le fonctionnement élémentaire des composantes suivantes utilisées dans un système de réfrigération ainsi que leur rôle et leur importance dans la prévention et la détection des fuites de réfrigérant : a) valves (robinets à boule, diaphragmes, robinets à soupape) ; b) contrôles de la température et de la pression ; c) repères transparents et indicateurs d'humidité ; d) contrôles du dégivrage ; e) protecteurs du système ; f) instruments de mesure tels que les thermomètres ; g) systèmes de contrôle de l'huile ; h) réservoirs ; i) séparateurs de liquides et d'huile, en tenant compte des spécificités du fonctionnement comportant des réfrigérants hautement inflammables ou toxiques (hydrocarbures ou NH3) et des réfrigérants fonctionnant à haute pression (CO2)*

- **Enseigné** — `g1d` Les organes qui trahissent une fuite *(+ question intégrée)*
  <br>Dit à l'élève : « Relier chaque organe courant du circuit à son rôle dans la prévention ou la détection d'une fuite »
- **Interrogé** — 6 question(s) :
  - `q-g9-v6_052` *(niveau 1, rangée en G9)* — Le pressostat BP peut servir à :
  - `q-g9-v6_155` *(niveau 1, rangée en G9)* — La vanne électromagnétique (solénoïde) sert principalement à :
  - `q-g9-168` *(niveau 2, rangée en G9)* — Vous remarquez des bulles dans le voyant liquide en fonctionnement stable. Qu'est-ce que cela signifie généralement ?
  - `q-g9-162` *(niveau 1, rangée en G9)* — À quoi sert un voyant liquide dans un circuit frigorifique ?
  - `q-g9-v6_053` *(niveau 1, rangée en G9)* — La vanne 4 voies permet :
  - `q-g9-v6_154` *(niveau 1, rangée en G9)* — Le voyant liquide est placé :

#### 1.06 — ✅ enseigné et vérifié

> *Connaître le comportement spécifique, les paramètres physiques, les systèmes, les solutions, les déviances de tous les réfrigérants de substitution dans le cycle de réfrigération et les composants pour leur utilisation*

- **Enseigné** — `g1c` Les familles de fluides et leurs codes *(+ question intégrée)*
  <br>Dit à l'élève : « Identifier la famille et les caractéristiques d'un fluide »
- **Interrogé** — 1 question(s) :
  - `pk-g1c-1` *(niveau 2, rangée en G1)* — Les codes R-32 et R-290 se ressemblent. Pourtant leurs classes de sécurité NF EN 378 sont très différentes. Que faut-il…

#### 1.07 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les caractéristiques des hydrocarbures, du CO2, et du NH3 et des autres réfrigérants non fluorés par rapport aux réfrigérants à gaz à effet de serre fluorés*

- **Enseigné** — `g1c` Les familles de fluides et leurs codes *(+ question intégrée)*
  <br>Dit à l'élève : « Décoder la nomenclature R-xyz et les séries de mélanges »
- **Interrogé** — 3 question(s) :
  - `q-g1-45` *(niveau 1, rangée en G1)* — Le R717 est :
  - `q-g12-v6_181` *(niveau 1, rangée en G12)* — Le R600a (isobutane) est utilisé principalement dans :
  - `pk-g1c-2` *(niveau 1, rangée en G1)* — Le propane, l'isobutane, l'ammoniac et le CO₂ sont des fluides naturels. En quoi se distinguent-ils des HFC et des HFO,…

#### 1.08 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître la combustibilité, la propagation des flammes, les restrictions relatives à la capacité de charge, les limites d'occupation pour les HFC, H(C)FO et hydrocarbures*

- **Enseigné** — `cl1` Lire une classe — deux lettres, deux dangers *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître la combustibilité et la propagation des flammes, les restrictions de capacité de charge et les limites d'occupation, pour les HFC, H(C)FO et hydrocarbures. »
- **Enseigné** — `g11` Substitution et efficacité énergétique *(+ question intégrée)*
  <br>Dit à l'élève : « Situer combustibilité, propagation de flamme et limites de charge »
- **Interrogé** — 4 question(s) :
  - `q-g12-289` *(niveau 2, rangée en G12)* — Quelle est la différence entre un fluide A2L (R-32) et un fluide A3 (R-290) ?
  - `pk-cl1-1` *(niveau 1, rangée en G1)* — Dans une classe de sécurité comme A2L, que disent respectivement la lettre et le chiffre ?
  - `pk-cl1-2` *(niveau 2, rangée en G1)* — Quelle est la classe de sécurité du R-290 (propane) ?
  - `pk-cl1-3` *(niveau 2, rangée en G1)* — À quoi sert concrètement de connaître la classe de sécurité d'un fluide avant d'intervenir ?

#### 1.09 ★ nouveau 2025 — 🔵 traité en information — non exigé dans les catégories du pack

> *Connaître la pression du CO2, le cycle transcritique ou subcritique, le diagramme log p/h, les tables de saturation du CO2, l'état d'agrégation du CO2 (formation de glace carbonique)*

- **Enseigné** — `g13` CO₂ et NH₃ — reconnaître, ne pas intervenir *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les pressions élevées du CO₂, son diagramme log p/h, ses tables de saturation et le risque de glace carbonique. »
- **Interrogé** — 3 question(s) :
  - `q-g13-v6_088` *(niveau 2, rangée en G13)* — Le point critique du CO₂ se situe à :
  - `q-g13-v6_089` *(niveau 2, rangée en G13)* — En fonctionnement transcritique, le condenseur est remplacé par :
  - `q-g13-v6_180` *(niveau 2, rangée en G13)* — En mode sous-critique, le CO₂ fonctionne :

#### 1.10 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître la toxicité du NH3, les différences entre les systèmes à détente directe et les systèmes noyés, la pression négative dans les systèmes de congélation*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

### G2 — Incidence sur l'environnement des réfrigérants et réglementations pertinentes en matière d'environnement

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **2.01** | A1 théo. · A2 théo. · D théo. · E théo. | `g2a` `g2` | 11 | ✅ |
| **2.02** | A1 théo. · A2 théo. · D théo. · E théo. | `g2` `x1` | 9 | ✅ |

#### 2.01 — ✅ enseigné et vérifié

> *Avoir une connaissance élémentaire de la politique de l'UE et internationale en matière de changement climatique, y compris la convention-cadre des Nations unies sur les changements climatiques (CCNUCC) et le Protocole de Montréal relatif à des substances qui appauvrissent la couche d'ozone*

- **Enseigné** — `g2a` Quarante ans d'histoire : de l'ozone au climat *(+ question intégrée)*
  <br>Dit à l'élève : « Situer l'histoire : couche d'ozone, protocoles, politique climat »
- **Enseigné** — `g2` Impact environnemental et F-Gas *(+ question intégrée)*
  <br>Dit à l'élève : « Situer la politique climat internationale et européenne »
- **Interrogé** — 11 question(s) :
  - `q-g2-5` *(niveau 1, rangée en G2)* — Le protocole de Montréal (1987) visait principalement :
  - `q-g2-v6_003` *(niveau 1, rangée en G2)* — L'amendement de Kigali (2016) ajoute au Protocole de Montréal la réduction progressive de :
  - `q-g2-v6_002` *(niveau 1, rangée en G2)* — Quel type de rayonnement la couche d'ozone filtre-t-elle principalement ?
  - `q-g2-v6_005` *(niveau 1, rangée en G2)* — Quel accord international de 2015 vise à limiter le réchauffement à +1,5°C ?
  - `q-g2-v6_008` *(niveau 2, rangée en G2)* — Le Protocole de Kyoto (1997) cible combien de gaz à effet de serre ?
  - `q-g2-v6_010` *(niveau 1, rangée en G2)* — Le « trou dans la couche d'ozone » est localisé principalement au-dessus de :
  - `q-g2-v6_106` *(niveau 1, rangée en G2)* — Les principaux gaz à effet de serre naturels sont :
  - `q-g2-v6_107` *(niveau 2, rangée en G2)* — Sans l'effet de serre naturel, la température moyenne de la Terre serait d'environ :
  - `q-g2-v6_110` *(niveau 1, rangée en G2)* — Le Protocole de Montréal a principalement permis :
  - `q-g2-v6_114` *(niveau 1, rangée en G2)* — L'ODP (Ozone Depletion Potential) est lié à la présence dans la molécule de :
  - `q-g2-v6_037` *(niveau 2, rangée en G2)* — Le R22 (HCFC) est interdit dans l'UE depuis :

#### 2.02 — ✅ enseigné et vérifié

> *Avoir une connaissance élémentaire du concept de « potentiel de réchauffement planétaire » (PRP), de l'utilisation des gaz à effet de serre fluorés et d'autres substances en tant que fluides frigorigènes, de l'incidence des émissions de gaz à effet de serre fluorés sur le climat (ordre de grandeur de leur PRP) ainsi que des dispositions correspondantes du règlement (UE) n° 2024/573 et des actes d'exécution pertinents, de même que des menaces éventuelles pour l'environnement, y compris celles issues des produits de décomposition de certaines substances fluorées (PFAS) tels que les HFC, HFO et HCFO*

- **Enseigné** — `g2` Impact environnemental et F-Gas *(+ question intégrée)*
  <br>Dit à l'élève : « Expliquer le PRP et les obligations du règlement (UE) 2024/573 »
- **Enseigné** — `x1` Exercice — deux installations, deux impacts *(+ question intégrée)*
  <br>Dit à l'élève : « Calculer une charge en tonnes équivalent CO₂ »
- **Interrogé** — 9 question(s) :
  - `q-g2-v6_001` *(niveau 1, rangée en G2)* — Quel gaz est utilisé comme référence (GWP=1) pour mesurer le pouvoir de réchauffement ?
  - `q-g2-v6_004` *(niveau 1, rangée en G2)* — Les HFC ont un ODP (potentiel de destruction de l'ozone) de :
  - `q-g2-v6_113` *(niveau 2, rangée en G2)* — 15 kg de R32 (GWP=675) donnent combien de tCO₂e ?
  - `q-g2-v6_011` *(niveau 1, rangée en G2)* — Le règlement UE 2024/573 remplace quel règlement ?
  - `q-g2-v6_017` *(niveau 1, rangée en G2)* — Le système de quotas HFC dans l'UE fonctionne sur le principe de :
  - `q-g2-v6_111` *(niveau 2, rangée en G2)* — Les HFO ont un faible GWP car :
  - `q-g2-v6_115` *(niveau 2, rangée en G2)* — Le concept de « durée de vie atmosphérique » d'un fluide influence directement :
  - `q-g2-42` *(niveau 1, rangée en G2)* — Quel fluide a le GWP le plus élevé ?
  - `q-g13-v6_185` *(niveau 1, rangée en G13)* — Le principal avantage environnemental du CO₂ comme fluide frigorigène est :

### G3 — Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **3.01** | A1 prat. · A2 prat. | `s4` `p4` `g3` | 2 | ✅ |
| **3.02** | A1 prat. · A2 prat. | `p4` `g3` | 1 | ✅ |
| **3.03** | A1 prat. · A2 prat. · D prat. | `p3` `g3` | 1 | ✅ |
| **3.04** | A1 prat. · A2 prat. | `p3` `g3` | 2 | ✅ |
| **3.05** | A1 théo. · A2 théo. | `g3` | 1 | ✅ |

#### 3.01 — ✅ enseigné et vérifié

> *Effectuer une épreuve de pression pour contrôler la résistance du système*

- **Enseigné** — `s4` Ce qui éclate — la pression *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser une épreuve de pression à l'azote pour vérifier la résistance du circuit »
- **Enseigné** — `p4` La bouteille d'azote et son mano-détendeur *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser une épreuve de pression de résistance »
- **Enseigné** — `g3` Contrôles avant mise en service *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser une épreuve de pression de résistance »
- **Interrogé** — 2 question(s) :
  - `q-g3-v6_062` *(niveau 1, rangée en G3)* — La pression d'épreuve de résistance d'un circuit est réalisée avec :
  - `pk-p4-1` *(niveau 1, rangée en G3)* — Avec quel gaz met-on un circuit frigorifique en pression pour contrôler sa résistance ?

#### 3.02 — ✅ enseigné et vérifié

> *Effectuer une épreuve de pression pour contrôler l'étanchéité du système*

- **Enseigné** — `p4` La bouteille d'azote et son mano-détendeur *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser une épreuve de pression d'étanchéité »
- **Enseigné** — `g3` Contrôles avant mise en service *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser une épreuve de pression d'étanchéité »
- **Interrogé** — 1 question(s) :
  - `pk-p4-2` *(niveau 1, rangée en G3)* — Pourquoi une bouteille d'azote se raccorde-t-elle toujours au travers d'un mano-détendeur ?

#### 3.03 — ✅ enseigné et vérifié

> *Utiliser une pompe à vide*

- **Enseigné** — `p3` Pompe à vide et vacuomètre — monter, tirer, lire *(+ question intégrée)*
  <br>Dit à l'élève : « Monter et mettre en service une pompe à vide »
- **Enseigné** — `g3` Contrôles avant mise en service *(+ question intégrée)*
  <br>Dit à l'élève : « Utiliser une pompe à vide »
- **Interrogé** — 1 question(s) :
  - `q-g3-v6_159` *(niveau 1, rangée en G3)* — La pompe à vide ne doit jamais être utilisée pour :

#### 3.04 — ✅ enseigné et vérifié

> *Faire le vide dans le système pour évacuer l'air et l'humidité selon la pratique habituelle*

- **Enseigné** — `p3` Pompe à vide et vacuomètre — monter, tirer, lire *(+ question intégrée)*
  <br>Dit à l'élève : « Évacuer l'air et l'humidité en tirant au vide, selon la pratique habituelle »
- **Enseigné** — `g3` Contrôles avant mise en service *(+ question intégrée)*
  <br>Dit à l'élève : « Faire le vide : évacuer l'air et l'humidité »
- **Interrogé** — 2 question(s) :
  - `q-g3-v6_058` *(niveau 1, rangée en G3)* — Le tirage au vide a pour but principal d'éliminer :
  - `q-g3-v6_059` *(niveau 2, rangée en G3)* — Si la pression remonte de plus de 100 µm pendant le test de maintien, cela indique :

#### 3.05 — ✅ enseigné et vérifié

> *Consigner les données dans le registre de l'équipement et rédiger un rapport portant sur un ou plusieurs des essais et des contrôles effectués durant l'examen*

- **Enseigné** — `g3` Contrôles avant mise en service *(+ question intégrée)*
  <br>Dit à l'élève : « Consigner le registre et rédiger le rapport d'essais »
- **Interrogé** — 1 question(s) :
  - `pk-q-3.05` *(niveau 1, rangée en G3)* — Vous venez de terminer l'épreuve d'étanchéité et le tirage au vide sur un circuit. Que devez-vous faire avant de consid…

### G4 — Contrôles d'étanchéité

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **4.01** | A1 théo. · A2 théo. · E théo. | `g4a` | 1 | ✅ |
| **4.02** | A1 théo. · A2 théo. · E théo. | `g4a` `x4` | 1 | ✅ |
| **4.03** | A1 prat. · A2 prat. · E prat. | `g4a` | 3 | ✅ |
| **4.04** | A1 prat. · A2 prat. · E prat. | `g4b` `x2` | 1 | ✅ |
| **4.05** | A1 prat. · A2 prat. · E prat. | `p1` `g4b` | 2 | ✅ |
| **4.06** | A1 prat. · A2 prat. | `g4c` | 2 | ✅ |
| **4.07** | A1 prat. · A2 prat. · E prat. | `g4c` | 1 | ✅ |
| **4.08** | A1 prat. · A2 prat. · E prat. | `g4c` `x4` | 3 | ✅ |
| **4.09** | A1 théo. · A2 théo. · E théo. | `g4c` | 1 | ✅ |

#### 4.01 — ✅ enseigné et vérifié

> *Connaître les points de fuite potentiels des équipements de réfrigération, de climatisation et de pompes à chaleur*

- **Enseigné** — `g4a` Où fuit une installation ? *(+ question intégrée)*
  <br>Dit à l'élève : « Identifier les points de fuite potentiels d'une installation »
- **Interrogé** — 1 question(s) :
  - `pk-q-4.01` *(niveau 1, rangée en G4)* — Sur une installation frigorifique, où se situent le plus souvent les points de fuite potentiels ?

#### 4.02 — ✅ enseigné et vérifié

> *Consulter le registre de l'équipement avant tout contrôle d'étanchéité et relever les informations pertinentes concernant des problèmes récurrents ou des parties problématiques du système nécessitant une attention particulière*

- **Enseigné** — `g4a` Où fuit une installation ? *(+ question intégrée)*
  <br>Dit à l'élève : « Consulter et exploiter le registre avant le contrôle »
- **Enseigné** — `x4` Détective — le contrôle qui tourne mal *(+ question intégrée)*
  <br>Dit à l'élève : « Exploiter le registre pour orienter le contrôle »
- **Interrogé** — 1 question(s) :
  - `pk-q-4.02` *(niveau 2, rangée en G4)* — Avant un contrôle d'étanchéité, vous consultez le registre de l'équipement. Il indique qu'un raccord flare de la ligne…

#### 4.03 — ✅ enseigné et vérifié

> *Effectuer un contrôle visuel et manuel de tout le système au sens du règlement (CE) n° 1516/2007 de la Commission*

- **Enseigné** — `g4a` Où fuit une installation ? *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser un contrôle visuel et manuel »
- **Interrogé** — 3 question(s) :
  - `q-g4-104` *(niveau 1, rangée en G4)* — Lors d'un contrôle d'étanchéité, le contrôleur doit vérifier :
  - `q-g4-114` *(niveau 1, rangée en G4)* — Le contrôle d'étanchéité doit porter sur :
  - `q-g4-110` *(niveau 1, rangée en G4)* — Une installation frigorifique doit faire l'objet d'un marquage indiquant :

#### 4.04 — ✅ enseigné et vérifié

> *Effectuer un contrôle de l'étanchéité du système au moyen d'une méthode indirecte conformément au règlement (CE) n° 1516/2007 et du manuel d'utilisation du système*

- **Enseigné** — `g4b` Méthode indirecte — mesurer et interpréter *(+ question intégrée)*
  <br>Dit à l'élève : « Mettre en œuvre la méthode indirecte (mesures et tables) »
- **Enseigné** — `x2` Exercice — la machine ne fait plus de froid *(+ question intégrée)*
  <br>Dit à l'élève : « Interpréter des mesures par la méthode indirecte »
- **Interrogé** — 1 question(s) :
  - `q-g4-v6_074` *(niveau 1, rangée en G4)* — La méthode de détection indirecte consiste à :

#### 4.05 — ✅ enseigné et vérifié

> *Utiliser des instruments de mesure portables tels que des manomètres, des thermomètres et des multimètres pour mesurer les volts, ampères et ohms en appliquant des méthodes indirectes de contrôle de l'étanchéité, et interpréter les paramètres mesurés*

- **Enseigné** — `p1` Le manifold — lire, brancher, ne pas polluer *(+ question intégrée)*
  <br>Dit à l'élève : « Lire les instruments portables et interpréter les valeurs mesurées »
- **Enseigné** — `g4b` Méthode indirecte — mesurer et interpréter *(+ question intégrée)*
  <br>Dit à l'élève : « Utiliser les instruments portables et interpréter les mesures »
- **Interrogé** — 2 question(s) :
  - `q-g7-170` *(niveau 2, rangée en G7)* — Un pressostat haute pression (HP) déclenche et arrête le compresseur. Quelle peut être la cause ?
  - `q-g8-171` *(niveau 2, rangée en G8)* — Un pressostat basse pression (BP) déclenche et arrête le compresseur. Quelle peut être la cause ?

#### 4.06 — ✅ enseigné et vérifié

> *Contrôler l'étanchéité du système au moyen d'une des méthodes directes visées au règlement (CE) n° 1516/2007*

- **Enseigné** — `g4c` Méthode directe et consignation *(+ question intégrée)*
  <br>Dit à l'élève : « Mettre en œuvre une méthode directe en intervenant dans le circuit »
- **Interrogé** — 2 question(s) :
  - `q-g4-68` *(niveau 2, rangée en G4)* — Quel est le meilleur outil pour détecter une fuite de fluide frigorigène ?
  - `q-g4-180` *(niveau 1, rangée en G4)* — Après une intervention sur un circuit, quelle opération permet de vérifier l'étanchéité ?

#### 4.07 — ✅ enseigné et vérifié

> *Contrôler l'étanchéité du système au moyen d'une des méthodes directes ne nécessitant pas d'intervenir dans le circuit de réfrigération et visées au règlement (CE) n° 1516/2007*

- **Enseigné** — `g4c` Méthode directe et consignation *(+ question intégrée)*
  <br>Dit à l'élève : « Mettre en œuvre la méthode directe sans intervenir dans le circuit »
- **Interrogé** — 1 question(s) :
  - `q-g4-v6_072` *(niveau 1, rangée en G4)* — La détection par eau savonneuse est une méthode :

#### 4.08 — ✅ enseigné et vérifié

> *Utiliser un dispositif électronique de détection des fuites*

- **Enseigné** — `g4c` Méthode directe et consignation *(+ question intégrée)*
  <br>Dit à l'élève : « Utiliser un détecteur électronique de fuites »
- **Enseigné** — `x4` Détective — le contrôle qui tourne mal *(+ question intégrée)*
  <br>Dit à l'élève : « Utiliser le détecteur dans de bonnes conditions »
- **Interrogé** — 3 question(s) :
  - `q-g4-v6_163` *(niveau 1, rangée en G4)* — Le détecteur électronique de fuites détecte les fuites par :
  - `q-g4-v6_069` *(niveau 1, rangée en G4)* — Un détecteur de fuites doit être calibré au minimum :
  - `q-g4-v6_168` *(niveau 1, rangée en G4)* — Le détecteur de fuites doit être vérifié au gaz de référence :

#### 4.09 — ✅ enseigné et vérifié

> *Consigner les données dans le registre de l'équipement*

- **Enseigné** — `g4c` Méthode directe et consignation *(+ question intégrée)*
  <br>Dit à l'élève : « Consigner le contrôle dans le registre »
- **Interrogé** — 1 question(s) :
  - `pk-q-4.09` *(niveau 1, rangée en G4)* — Un contrôle d'étanchéité vient de se terminer, sans fuite détectée. Que devez-vous faire ensuite ?

### G5 — Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **5.01** | A1 prat. · A2 prat. · D prat. | `p1` `p5` `g5a` | 2 | ✅ |
| **5.02** | A1 prat. · A2 prat. · D prat. | `p5` `g5a` `x3` | 1 | ✅ |
| **5.03** | A1 prat. · A2 prat. · D prat. | `p2` `g5a` | 2 | ✅ |
| **5.04** | A1 prat. · A2 prat. · D prat. | `g5a` | 1 | ✅ |
| **5.05** | A1 prat. · A2 prat. · D prat. | `p6` `g1e` `g5b` | 4 | ✅ |
| **5.06** | A1 prat. · A2 prat. · D prat. | `p6` `g5b` `x3` | 1 | ✅ |
| **5.07** | A1 théo. · A2 théo. · D théo. | `g5b` | 2 | ✅ |
| **5.08** | A1 théo. · A2 théo. · D théo. | `g5b` | 13 | ✅ |
| **5.09** ★ | A1 théo. · A2 théo. · D théo. | `g5b` | 1 | ✅ |
| **5.10** ★ | — *(B)* | — | — | · |
| **5.11** ★ | — *(C)* | — | — | · |

#### 5.01 — ✅ enseigné et vérifié

> *Connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions*

- **Enseigné** — `p1` Le manifold — lire, brancher, ne pas polluer *(+ question intégrée)*
  <br>Dit à l'élève : « Brancher et débrancher les flexibles du manifold avec un minimum d'émissions »
- **Enseigné** — `p5` L'ordre des vannes — la chorégraphie de l'intervention *(+ question intégrée)*
  <br>Dit à l'élève : « Connecter et déconnecter avec un minimum d'émissions »
- **Enseigné** — `g5a` Récupérer sans émettre *(+ question intégrée)*
  <br>Dit à l'élève : « Connecter et déconnecter avec un minimum d'émissions »
- **Interrogé** — 2 question(s) :
  - `q-g5-175` *(niveau 1, rangée en G5)* — Vous devez vérifier la pression d'un circuit en fonctionnement. Où branchez-vous le manomètre basse pression ?
  - `q-g5-176` *(niveau 1, rangée en G5)* — Vous devez vérifier la pression haute d'un circuit. Où branchez-vous le manomètre haute pression ?

#### 5.02 — ✅ enseigné et vérifié

> *Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état gazeux*

- **Enseigné** — `p5` L'ordre des vannes — la chorégraphie de l'intervention *(+ question intégrée)*
  <br>Dit à l'élève : « Vider et remplir un cylindre, en phase liquide et gazeuse »
- **Enseigné** — `g5a` Récupérer sans émettre *(+ question intégrée)*
  <br>Dit à l'élève : « Vider et remplir un cylindre, en phase liquide et gazeuse »
- **Enseigné** — `x3` Détective — la bouteille de récupération *(+ question intégrée)*
  <br>Dit à l'élève : « Gérer le remplissage des cylindres en sécurité »
- **Interrogé** — 1 question(s) :
  - `q-g5-v6_063` *(niveau 1, rangée en G5)* — Le taux de remplissage maximal d'une bouteille de récupération est de :

#### 5.03 — ✅ enseigné et vérifié

> *Utiliser un dispositif de récupération des réfrigérants et connecter et déconnecter ce dispositif en produisant le minimum d'émissions*

- **Enseigné** — `p2` La station de récupération — ce que c'est, comment on la branche *(+ question intégrée)*
  <br>Dit à l'élève : « Brancher et débrancher un groupe de récupération avec un minimum d'émissions »
- **Enseigné** — `g5a` Récupérer sans émettre *(+ question intégrée)*
  <br>Dit à l'élève : « Utiliser un dispositif de récupération »
- **Interrogé** — 2 question(s) :
  - `q-g5-141` *(niveau 1, rangée en G5)* — Avant de récupérer le fluide, il faut :
  - `q-g5-179` *(niveau 1, rangée en G5)* — Avant d'ouvrir un circuit frigorifique pour une intervention, quelle opération est obligatoire ?

#### 5.04 — ✅ enseigné et vérifié

> *Vider l'huile contaminée par le réfrigérant d'un système*

- **Enseigné** — `g5a` Récupérer sans émettre *(+ question intégrée)*
  <br>Dit à l'élève : « Vidanger l'huile contaminée »
- **Interrogé** — 1 question(s) :
  - `q-g5-135` *(niveau 1, rangée en G5)* — Lors de la récupération, l'huile frigorifique doit être :

#### 5.05 — ✅ enseigné et vérifié

> *Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, saturé ou surchauffé) d'un réfrigérant avant tout remplissage afin de choisir la méthode et le volume de remplissage les plus adaptés. Remplir le système de réfrigérant (à l'état liquide et gazeux) sans provoquer de pertes*

- **Enseigné** — `p6` La balance et la pesée — avant, après, ce qu'on note *(+ question intégrée)*
  <br>Dit à l'élève : « Déterminer l'état du fluide et charger sans perte »
- **Enseigné** — `g1e` Surchauffe et sous-refroidissement *(+ question intégrée)*
  <br>Dit à l'élève : « Déterminer l'état d'un fluide : sous-refroidi, saturé ou surchauffé »
- **Enseigné** — `g5b` Peser, charger, stocker, tracer *(+ question intégrée)*
  <br>Dit à l'élève : « Déterminer l'état du fluide et charger sans perte »
- **Interrogé** — 4 question(s) :
  - `q-g5-v6_060` *(niveau 2, rangée en G5)* — Pourquoi un mélange zéotrope doit-il être chargé en phase liquide ?
  - `q-g5-v6_161` *(niveau 1, rangée en G5)* — Pendant la charge, on surveille principalement :
  - `q-g5-v6_158` *(niveau 2, rangée en G5)* — La charge en fluide par le côté HP se fait obligatoirement en :
  - `pk-g1e-5` *(niveau 2, rangée en G5)* — Avant de charger une installation, pourquoi commence-t-on par déterminer l'état du fluide — sous-refroidi, saturé ou su…

#### 5.06 — ✅ enseigné et vérifié

> *Choisir le bon type de balance et l'utiliser pour peser le réfrigérant*

- **Enseigné** — `p6` La balance et la pesée — avant, après, ce qu'on note *(+ question intégrée)*
  <br>Dit à l'élève : « Choisir la balance adaptée et peser »
- **Enseigné** — `g5b` Peser, charger, stocker, tracer *(+ question intégrée)*
  <br>Dit à l'élève : « Choisir la balance adaptée et peser »
- **Enseigné** — `x3` Détective — la bouteille de récupération *(+ question intégrée)*
  <br>Dit à l'élève : « Peser à chaque étape »
- **Interrogé** — 1 question(s) :
  - `q-g5-v6_064` *(niveau 1, rangée en G5)* — La charge en fluide se mesure avec :

#### 5.07 — ✅ enseigné et vérifié

> *Consigner dans le registre de l'équipement toutes les informations pertinentes concernant le réfrigérant récupéré ou ajouté*

- **Enseigné** — `g5b` Peser, charger, stocker, tracer *(+ question intégrée)*
  <br>Dit à l'élève : « Consigner l'opération dans le registre »
- **Interrogé** — 2 question(s) :
  - `q-g5-v6_170` *(niveau 1, rangée en G5)* — La fiche d'intervention CERFA doit être remplie :
  - `q-g5-v6_079` *(niveau 1, rangée en G5)* — La fiche d'intervention doit mentionner obligatoirement :

#### 5.08 — ✅ enseigné et vérifié

> *Connaître les prescriptions et les procédures de gestion, de réutilisation, de récupération, de stockage et de transport des réfrigérants et huiles fluorés, y compris lorsqu'ils sont contaminés*

- **Enseigné** — `g5b` Peser, charger, stocker, tracer *(+ question intégrée)*
  <br>Dit à l'élève : « Appliquer les prescriptions de gestion, stockage et transport »
- **Interrogé** — 13 question(s) :
  - `q-g5-v6_156` *(niveau 1, rangée en G5)* — Il est interdit de mélanger des fluides différents dans une même bouteille de récupération car :
  - `q-g5-v6_082` *(niveau 1, rangée en G5)* — La récupération de fluide est obligatoire :
  - `q-g5-v6_083` *(niveau 1, rangée en G5)* — La différence entre recyclage et régénération est :
  - `q-g5-v6_176` *(niveau 1, rangée en G5)* — Le fluide recyclé (non régénéré) peut être réutilisé :
  - `q-g5-v6_175` *(niveau 1, rangée en G5)* — Le rejet volontaire de fluide frigorigène dans l'atmosphère est :
  - `q-g5-v6_081` *(niveau 1, rangée en G5)* — Le BSD (Bordereau de Suivi des Déchets) accompagne :
  - `q-g5-128` *(niveau 1, rangée en G5)* — Lors de la mise hors service, le fluide doit être récupéré :
  - `q-g5-133` *(niveau 1, rangée en G5)* — Les équipements contenant des fluides en fin de vie relèvent de la filière :
  - `q-g5-143` *(niveau 1, rangée en G5)* — Une bouteille de fluide récupéré doit être :
  - `q-g5-147` *(niveau 1, rangée en G5)* — Un frigoriste peut-il détruire lui-même le fluide récupéré ?
  - `q-g5-v6_177` *(niveau 1, rangée en G5)* — Le propriétaire d'un équipement frigorifique en fin de vie doit :
  - `q-g5-130` *(niveau 2, rangée en G5)* — La destruction des fluides frigorigènes s'effectue principalement par :
  - `q-g5-146` *(niveau 2, rangée en G5)* — Les compresseurs usagés doivent être :

#### 5.09 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les prescriptions et les procédures de gestion, de remplissage, de récupération, de stockage et de transport des hydrocarbures et des huiles, y compris lorsqu'ils sont contaminés, ainsi que d'installation d'équipements et de systèmes tributaires des hydrocarbures*

- **Enseigné** — `g5b` Peser, charger, stocker, tracer *(+ question intégrée)*
  <br>Dit à l'élève : « Gérer les hydrocarbures et leurs huiles, y compris contaminés »
- **Interrogé** — 1 question(s) :
  - `pk-q-5.09` *(niveau 1, rangée en G5)* — Le fluide et l'huile d'une installation aux hydrocarbures ont un point commun qui impose des précautions particulières…

#### 5.10 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les prescriptions et les procédures de gestion, de remplissage, de stockage et de transport du R744 (CO2) et des huiles, y compris lorsqu'ils sont contaminés, ainsi que d'installation d'équipements et de systèmes tributaires du R744*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 5.11 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les prescriptions et les procédures de gestion, de remplissage, de récupération, de stockage et de transport du R717 (NH3) et des huiles, y compris lorsqu'ils sont contaminés, ainsi que d'installation d'équipements et de systèmes tributaires du R717. Connaître les effets des dégagements de R717 pendant les travaux d'installation et de maintenance, en cas de fuites ou d'accidents, et la manière de réduire ces effets (au moyen d'épurateurs, par exemple) grâce à une bonne planification*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

### G6 — Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages

⚠️ **groupe tiré au sort à l'épreuve pratique — le candidat en aura forcément un**

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **6.01** | A1 théo. · A2 théo. | `g6` | 9 | ✅ |
| **6.02** | A1 prat. · A2 prat. | `g6b` | 1 | ✅ |
| **6.03** | A1 prat. · A2 prat. | `g6` | 1 | ✅ |
| **6.04** | A1 prat. | `g6b` | 1 | ✅ |
| **6.05** | A1 prat. · A2 prat. | `g6` | 8 | ✅ |
| **6.06** | A1 prat. · A2 prat. | `g6b` | 4 | ✅ |
| **6.07** | A1 théo. · A2 théo. | `g6` | 3 | ✅ |
| **6.08** ★ | A1 théo. · A2 théo. | `g6b` | 1 | ✅ |

#### 6.01 — ✅ enseigné et vérifié

> *Expliquer le principe de fonctionnement d'un compresseur (y compris le réglage de la puissance et le circuit de lubrification) et les risques de fuite ou d'émission de réfrigérant qui y sont liés*

- **Enseigné** — `g6` Le compresseur *(+ question intégrée)*
  <br>Dit à l'élève : « Expliquer le principe du compresseur et ses risques de fuite »
- **Interrogé** — 9 question(s) :
  - `q-g6-152` *(niveau 1, rangée en G6)* — Quel est le rôle principal du compresseur dans un circuit frigorifique ?
  - `q-g6-231` *(niveau 1, rangée en G6)* — Quel est le rôle principal de l'huile dans un compresseur frigorifique ?
  - `q-g6-233` *(niveau 1, rangée en G6)* — Pourquoi est-il important que l'huile revienne au compresseur dans un circuit frigorifique ?
  - `q-g6-247` *(niveau 1, rangée en G6)* — À quoi sert un réchauffeur de carter (chauffage de carter) sur un compresseur ?
  - `q-g6-177` *(niveau 2, rangée en G6)* — Quelle est l'utilité principale d'un accumulateur de liquide sur la ligne d'aspiration ?
  - `q-g6-249` *(niveau 2, rangée en G6)* — Pourquoi ne faut-il jamais mélanger différents types d'huiles (POE + minérale par exemple) ?
  - `q-g6-252` *(niveau 2, rangée en G6)* — Vous constatez de la mousse dans le voyant d'huile au démarrage. Quelle est la cause probable ?
  - `q-g6-v6_152` *(niveau 2, rangée en G6)* — Un pressostat différentiel de pression d'huile protège contre :
  - `q-g6-v6_153` *(niveau 2, rangée en G6)* — La migration de fluide dans l'huile à l'arrêt se produit car :

#### 6.02 — ✅ enseigné et vérifié

> *Installer correctement un compresseur, y compris le matériel de contrôle et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produisent une fois le système en fonctionnement*

- **Enseigné** — `g6b` Compresseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Installer un compresseur et ses sécurités sans provoquer de fuite »
- **Interrogé** — 1 question(s) :
  - `pk-q-6.02` *(niveau 2, rangée en G6)* — Un compresseur est posé directement sur son châssis, sans plot antivibratile. Quel risque apparaît à moyen terme ?

#### 6.03 — ✅ enseigné et vérifié

> *Régler les interrupteurs de sécurité et de contrôle*

- **Enseigné** — `g6` Le compresseur *(+ question intégrée)*
  <br>Dit à l'élève : « Régler les interrupteurs de sécurité et de contrôle »
- **Interrogé** — 1 question(s) :
  - `pk-q-6.03` *(niveau 1, rangée en G6)* — Selon quoi règle-t-on les pressostats HP et BP et la protection thermique d'un compresseur ?

#### 6.04 — ✅ enseigné et vérifié

> *Régler les soupapes d'aspiration*

- **Enseigné** — `g6b` Compresseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Régler les soupapes d'aspiration selon la fiche constructeur »
- **Interrogé** — 1 question(s) :
  - `pk-q-6.04` *(niveau 2, rangée en G6)* — Une soupape d'aspiration mal réglée sur un compresseur : quelle conséquence directe ?

#### 6.05 — ✅ enseigné et vérifié

> *Vérifier le circuit de retour de l'huile*

- **Enseigné** — `g6` Le compresseur *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier le retour d'huile »
- **Interrogé** — 8 question(s) :
  - `q-g6-174` *(niveau 1, rangée en G6)* — À quoi sert un voyant d'huile sur un compresseur ?
  - `q-g6-234` *(niveau 1, rangée en G6)* — À quoi sert un séparateur d'huile sur une installation frigorifique ?
  - `q-g6-235` *(niveau 1, rangée en G6)* — Comment peut-on vérifier le niveau d'huile dans le carter d'un compresseur équipé d'un voyant ?
  - `q-g6-v6_054` *(niveau 1, rangée en G6)* — Le séparateur d'huile est placé :
  - `q-g6-241` *(niveau 2, rangée en G6)* — Pourquoi le retour d'huile est-il plus difficile en froid négatif qu'en froid positif ?
  - `q-g6-243` *(niveau 2, rangée en G6)* — Lors d'une mise en service, vous constatez que le niveau d'huile baisse rapidement. Quelle est la cause probable ?
  - `q-g6-245` *(niveau 2, rangée en G6)* — Pourquoi un compresseur qui démarre fréquemment (cycles courts) peut-il avoir des problèmes d'huile ?
  - `q-g6-246` *(niveau 2, rangée en G6)* — Qu'est-ce qu'un 'coup d'huile' (oil slugging) et comment le reconnaître ?

#### 6.06 — ✅ enseigné et vérifié

> *Mettre en marche et arrêter un compresseur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement*

- **Enseigné** — `g6b` Compresseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Démarrer, arrêter et contrôler un compresseur par la mesure »
- **Interrogé** — 4 question(s) :
  - `q-g6-186` *(niveau 2, rangée en G6)* — Vous constatez que la température de refoulement du compresseur est très élevée (>120°C). Quelles sont les causes possi…
  - `q-g6-v6_150` *(niveau 1, rangée en G6)* — La vanne de service permet :
  - `q-g6-173` *(niveau 2, rangée en G6)* — Lors d'une mise en service, vous constatez que le compresseur fait beaucoup de bruit (claquements). Quelle peut être la…
  - `q-g6-190` *(niveau 2, rangée en G6)* — Vous devez diagnostiquer une installation qui ne produit plus de froid. Le compresseur tourne, mais la BP et la HP sont…

#### 6.07 — ✅ enseigné et vérifié

> *Rédiger un rapport sur l'état du compresseur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant*

- **Enseigné** — `g6` Le compresseur *(+ question intégrée)*
  <br>Dit à l'élève : « Rédiger un rapport d'état »
- **Interrogé** — 3 question(s) :
  - `q-g6-240` *(niveau 1, rangée en G6)* — Quels sont les symptômes d'un manque d'huile dans le compresseur ?
  - `q-g6-248` *(niveau 2, rangée en G6)* — Comment reconnaître une huile contaminée ou usagée qu'il faut remplacer ?
  - `q-g6-251` *(niveau 2, rangée en G6)* — Quelle est la conséquence d'un excès d'huile dans un compresseur ?

#### 6.08 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance des compresseurs*

- **Enseigné** — `g6b` Compresseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les leviers d'efficacité énergétique du compresseur »
- **Interrogé** — 1 question(s) :
  - `pk-q-6.08` *(niveau 1, rangée en G6)* — Pourquoi bien installer, bien régler et bien entretenir un compresseur améliore l'efficacité énergétique ?

### G7 — Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide

⚠️ **groupe tiré au sort à l'épreuve pratique — le candidat en aura forcément un**

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **7.01** | A1 théo. · A2 théo. | `g7` | 3 | ✅ |
| **7.02** | A1 prat. · A2 prat. | `g7b` | 3 | ✅ |
| **7.03** | A1 prat. · A2 prat. | `g7b` | 1 | ✅ |
| **7.04** | A1 prat. · A2 prat. | `g7` | 1 | ✅ |
| **7.05** | A1 prat. · A2 prat. | `g7b` | 1 | ✅ |
| **7.06** | A1 prat. · A2 prat. | `g7` | 1 | ✅ |
| **7.07** | A1 prat. · A2 prat. | `g7b` | 2 | ✅ |
| **7.08** | A1 prat. · A2 prat. | `g7` | 1 | ✅ |
| **7.09** | A1 théo. · A2 théo. | `g7b` | 1 | ✅ |
| **7.10** ★ | A1 théo. · A2 théo. | `g7b` | 1 | ✅ |

#### 7.01 — ✅ enseigné et vérifié

> *Expliquer le principe de fonctionnement d'un condenseur et les risques de fuite qui y sont associés*

- **Enseigné** — `g7` Le condenseur *(+ question intégrée)*
  <br>Dit à l'élève : « Expliquer le principe du condenseur et ses risques de fuite »
- **Interrogé** — 3 question(s) :
  - `q-g7-159` *(niveau 1, rangée en G7)* — Quel est le rôle principal du condenseur ?
  - `q-g7-163` *(niveau 1, rangée en G7)* — Quel est le rôle des ventilateurs sur un condenseur à air ?
  - `q-g7-169` *(niveau 1, rangée en G7)* — Quelle est l'utilité du sous-refroidissement du liquide en sortie de condenseur ?

#### 7.02 — ✅ enseigné et vérifié

> *Mettre au point le régulateur de pression de sortie du condenseur*

- **Enseigné** — `g7b` Condenseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Régler le régulateur de pression du condenseur »
- **Interrogé** — 3 question(s) :
  - `pk-g7b-2` *(niveau 2, rangée en G7)* — Vous réglez le régulateur de pression de sortie du condenseur. Comment procédez-vous, d'après la fiche ?
  - `pk-g7b-3` *(niveau 2, rangée en G7)* — En plein hiver, la haute pression d'une installation chute et la machine ne fait plus assez de froid, alors qu'aucun or…
  - `pk-g7b-4` *(niveau 1, rangée en G7)* — Quelle est la différence entre le pressostat haute pression et le régulateur de pression de condensation ?

#### 7.03 — ✅ enseigné et vérifié

> *Installer correctement un condenseur/une unité extérieure y compris le matériel de réglage et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produise une fois que le système fonctionnera*

- **Enseigné** — `g7b` Condenseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Installer un condenseur sans risque de fuite »
- **Interrogé** — 1 question(s) :
  - `pk-g7b-1` *(niveau 1, rangée en G7)* — Vous installez une unité extérieure neuve. Avant la mise en service, vous contrôlez l'étanchéité du circuit sous pressi…

#### 7.04 — ✅ enseigné et vérifié

> *Régler les interrupteurs de sécurité et de contrôle*

- **Enseigné** — `g7` Le condenseur *(+ question intégrée)*
  <br>Dit à l'élève : « Régler les interrupteurs de sécurité et de contrôle »
- **Interrogé** — 1 question(s) :
  - `q-g7-v6_057` *(niveau 1, rangée en G7)* — Le pressostat HP est un organe de :

#### 7.05 — ✅ enseigné et vérifié

> *Inspecter les conduites de refoulement et de liquide*

- **Enseigné** — `g7b` Condenseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Inspecter les conduites de refoulement et de liquide »
- **Interrogé** — 1 question(s) :
  - `pk-q-7.05` *(niveau 2, rangée en G7)* — En inspectant les conduites de refoulement et de liquide d'un condenseur, quels signes doivent alerter ?

#### 7.06 — ✅ enseigné et vérifié

> *Extraire les gaz non condensables du condenseur à l'aide d'un appareil de purge pour système de réfrigération*

- **Enseigné** — `g7` Le condenseur *(+ question intégrée)*
  <br>Dit à l'élève : « Purger les incondensables »
- **Interrogé** — 1 question(s) :
  - `pk-q-7.06` *(niveau 2, rangée en G7)* — Dans quelles conditions doit-on purger les gaz non condensables (incondensables) d'un condenseur ?

#### 7.07 — ✅ enseigné et vérifié

> *Mettre en marche et arrêter un condenseur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement*

- **Enseigné** — `g7b` Condenseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Démarrer, mesurer et arrêter un condenseur »
- **Interrogé** — 2 question(s) :
  - `q-g7-182` *(niveau 1, rangée en G7)* — Comment calculer le sous-refroidissement du liquide en sortie de condenseur ?
  - `q-g7-71` *(niveau 1, rangée en G7)* — Le sous-refroidissement (subcooling) se mesure :

#### 7.08 — ✅ enseigné et vérifié

> *Inspecter la surface du condenseur*

- **Enseigné** — `g7` Le condenseur *(+ question intégrée)*
  <br>Dit à l'élève : « Inspecter la surface d'échange »
- **Interrogé** — 1 question(s) :
  - `q-g7-164` *(niveau 2, rangée en G7)* — Que se passe-t-il si le condenseur est encrassé (sale, poussière) ?

#### 7.09 — ✅ enseigné et vérifié

> *Rédiger un rapport sur l'état du condenseur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant*

- **Enseigné** — `g7b` Condenseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Rédiger un rapport d'état du condenseur »
- **Interrogé** — 1 question(s) :
  - `pk-q-7.09` *(niveau 1, rangée en G7)* — Que doit contenir le rapport écrit rédigé après une visite d'un condenseur ?

#### 7.10 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance des condenseurs*

- **Enseigné** — `g7b` Condenseur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Entretenir un condenseur pour économiser l'énergie »
- **Interrogé** — 1 question(s) :
  - `pk-q-7.10` *(niveau 1, rangée en G7)* — Comment un condenseur bien entretenu permet-il de faire des économies d'énergie ?

### G8 — Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide

⚠️ **groupe tiré au sort à l'épreuve pratique — le candidat en aura forcément un**

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **8.01** | A1 théo. · A2 théo. | `g8` | 2 | ✅ |
| **8.02** | A1 prat. · A2 prat. | `g8b` | 2 | ✅ |
| **8.03** | A1 prat. · A2 prat. | `g8b` | 1 | ✅ |
| **8.04** | A1 prat. · A2 prat. | `g8b` | 1 | ✅ |
| **8.05** | A1 prat. · A2 prat. | `g8` | 1 | ✅ |
| **8.06** | A1 prat. · A2 prat. | `g8b` | 1 | ✅ |
| **8.07** | A1 prat. · A2 prat. | `g8b` | 2 | ✅ |
| **8.08** | A1 prat. · A2 prat. | `g8` `x2` | 6 | ✅ |
| **8.09** | A1 prat. · A2 prat. | `g8` | 1 | ✅ |
| **8.10** | A1 théo. · A2 théo. | `g8b` | 1 | ✅ |
| **8.11** ★ | A1 théo. · A2 théo. | `g8b` | 1 | ✅ |

#### 8.01 — ✅ enseigné et vérifié

> *Expliquer le principe de fonctionnement d'un évaporateur (y compris le système de dégivrage) et les risques de fuite qui y sont associés*

- **Enseigné** — `g8` L'évaporateur *(+ question intégrée)*
  <br>Dit à l'élève : « Expliquer le principe de l'évaporateur et le dégivrage »
- **Interrogé** — 2 question(s) :
  - `q-g8-v6_039` *(niveau 1, rangée en G8)* — Dans quel organe le fluide absorbe-t-il la chaleur de l'espace à refroidir ?
  - `q-g8-v6_043` *(niveau 2, rangée en G8)* — Une surchauffe insuffisante à l'aspiration du compresseur risque de provoquer :

#### 8.02 — ✅ enseigné et vérifié

> *Mettre au point un régulateur de pression d'évaporation de l'évaporateur*

- **Enseigné** — `g8b` Évaporateur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Mettre en service un régulateur de pression d'évaporation »
- **Interrogé** — 2 question(s) :
  - `pk-q-8.02` *(niveau 1, rangée en G8)* — Vous installez un régulateur de pression d'évaporation sur une nouvelle installation. Comment déterminez-vous sa valeur…
  - `pk-g8b-5` *(niveau 2, rangée en G8)* — Plusieurs chambres froides à des températures différentes fonctionnent sur un même compresseur. Quel organe permet à ch…

#### 8.03 — ✅ enseigné et vérifié

> *Installer correctement un évaporateur, y compris le matériel de contrôle et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produise une fois le système en fonctionnement*

- **Enseigné** — `g8b` Évaporateur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Installer l'évaporateur et ses sécurités sans fuite »
- **Interrogé** — 1 question(s) :
  - `pk-g8b-1` *(niveau 1, rangée en G8)* — Un évaporateur est installé avec son pressostat et son régulateur de pression. Une fois l'installation terminée, qu'est…

#### 8.04 — ✅ enseigné et vérifié

> *Régler les interrupteurs de sécurité et de contrôle*

- **Enseigné** — `g8b` Évaporateur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Régler les sécurités électriques de l'évaporateur »
- **Interrogé** — 1 question(s) :
  - `pk-g8b-2` *(niveau 1, rangée en G8)* — Un interrupteur de sécurité et de contrôle détecte une pression qui sort de la plage prévue. Que fait-il ?

#### 8.05 — ✅ enseigné et vérifié

> *Vérifier que les conduites de liquide et d'aspiration sont dans la bonne position*

- **Enseigné** — `g8` L'évaporateur *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier les conduites liquide et aspiration »
- **Interrogé** — 1 question(s) :
  - `pk-q-8.05` *(niveau 1, rangée en G8)* — La conduite d'aspiration relie l'évaporateur au compresseur. Pourquoi la pose-t-on en légère pente vers le compresseur ?

#### 8.06 — ✅ enseigné et vérifié

> *Inspecter le conduit de dégivrage à l'air chaud*

- **Enseigné** — `g8b` Évaporateur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier l'état du conduit de dégivrage à l'air chaud »
- **Interrogé** — 1 question(s) :
  - `pk-g8b-3` *(niveau 1, rangée en G8)* — Un évaporateur dégivre à l'air chaud. Lors de la visite, que dois-tu inspecter sur le conduit qui transporte cet air ?

#### 8.07 — ✅ enseigné et vérifié

> *Régler la soupape de régulation de la pression d'évaporation*

- **Enseigné** — `g8b` Évaporateur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Ajuster la soupape de pression d'évaporation »
- **Interrogé** — 2 question(s) :
  - `pk-q-8.07` *(niveau 2, rangée en G8)* — Plusieurs évaporateurs sont raccordés à un même compresseur. Pourquoi règle-t-on la soupape de régulation de pression d…
  - `pk-g8b-6` *(niveau 2, rangée en G8)* — Vous réglez la soupape de régulation de la pression d'évaporation. Sur quelle pression agit-elle, et à quel endroit du…

#### 8.08 — ✅ enseigné et vérifié

> *Mettre en marche et arrêter un évaporateur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement*

- **Enseigné** — `g8` L'évaporateur *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser la mise en marche/arrêt et les mesures »
- **Enseigné** — `x2` Exercice — la machine ne fait plus de froid *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser les mesures en fonctionnement »
- **Interrogé** — 6 question(s) :
  - `q-g8-181` *(niveau 1, rangée en G8)* — Sur une installation frigorifique, comment calculer approximativement la surchauffe à l'aspiration du compresseur ?
  - `q-g8-183` *(niveau 2, rangée en G8)* — Une installation affiche une surchauffe très élevée (20°C) et une puissance frigorifique insuffisante. Quelle est la ca…
  - `q-g8-184` *(niveau 2, rangée en G8)* — Une installation présente une surchauffe nulle ou négative (ligne d'aspiration givrée). Quelle action corrective priori…
  - `q-g8-166` *(niveau 2, rangée en G8)* — Sur une installation en fonctionnement, vous constatez que la ligne d'aspiration est chaude. Qu'est-ce que cela peut in…
  - `q-g8-167` *(niveau 2, rangée en G8)* — Vous observez du givre sur la ligne d'aspiration jusqu'au compresseur. Que peut indiquer ce symptôme ?
  - `q-g8-70` *(niveau 1, rangée en G8)* — La surchauffe (superheat) se mesure :

#### 8.09 — ✅ enseigné et vérifié

> *Inspecter la surface de l'évaporateur*

- **Enseigné** — `g8` L'évaporateur *(+ question intégrée)*
  <br>Dit à l'élève : « Inspecter la surface d'échange et le bac de condensats »
- **Interrogé** — 1 question(s) :
  - `q-g8-178` *(niveau 2, rangée en G8)* — Vous constatez que l'évaporateur givre complètement en fonctionnement. Quelle peut être la cause ?

#### 8.10 — ✅ enseigné et vérifié

> *Rédiger un rapport sur l'état de l'évaporateur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant*

- **Enseigné** — `g8b` Évaporateur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Rédiger un rapport d'état de l'évaporateur »
- **Interrogé** — 1 question(s) :
  - `pk-q-8.10` *(niveau 2, rangée en G8)* — Après une visite de l'évaporateur, que doit contenir le rapport d'état pour être utile ?

#### 8.11 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les mesures pour améliorer ou maintenir l'efficacité énergétique de l'équipement pendant l'installation ou la maintenance des évaporateurs*

- **Enseigné** — `g8b` Évaporateur — installer, régler, vérifier *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les leviers d'efficacité énergétique de l'évaporateur »
- **Interrogé** — 1 question(s) :
  - `pk-g8b-4` *(niveau 2, rangée en G8)* — La batterie d'un évaporateur est sale et le débit d'air a baissé. Quel est l'effet sur la consommation d'énergie du com…

### G9 — Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants

⚠️ **groupe tiré au sort à l'épreuve pratique — le candidat en aura forcément un**

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **9.01** | A1 théo. · A2 théo. | `g9` | 6 | ✅ |
| **9.02** | A1 prat. · A2 prat. | `g9` | 1 | ✅ |
| **9.03** | A1 prat. · A2 prat. | `g9` | 1 | ✅ |
| **9.04** | A1 prat. · A2 prat. | `g9b` | 1 | ✅ |
| **9.05** | A1 prat. · A2 prat. | `g9b` | 4 | ✅ |
| **9.06** | A1 prat. · A2 prat. | `g9b` | 1 | ✅ |
| **9.07** | A1 prat. · A2 prat. | `g9b` | 1 | ✅ |
| **9.08** | A1 prat. · A2 prat. | `g9` | 5 | ✅ |
| **9.09** | A1 théo. · A2 théo. | `g9b` | 1 | ✅ |
| **9.10** ★ | A1 théo. · A2 théo. | `g9b` | 1 | ✅ |

#### 9.01 — ✅ enseigné et vérifié

> *Expliquer le principe de fonctionnement de différents types de vannes d'expansion (détendeurs thermostatiques, tubes capillaires) et les risques de fuite qui y sont liés*

- **Enseigné** — `g9` Le détendeur et les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Expliquer le principe du détendeur et du tube capillaire »
- **Interrogé** — 6 question(s) :
  - `q-g9-v6_049` *(niveau 1, rangée en G9)* — Le détendeur thermostatique (TEV) régule :
  - `q-g9-v6_055` *(niveau 1, rangée en G9)* — L'avantage principal du détendeur électronique (EEV) par rapport au TEV est :
  - `q-g9-v6_149` *(niveau 1, rangée en G9)* — Le capillaire est un type de détendeur utilisé dans :
  - `q-g9-187` *(niveau 2, rangée en G9)* — Que peut indiquer un bruit de bullage dans le détendeur thermostatique en fonctionnement ?
  - `q-g9-188` *(niveau 2, rangée en G9)* — Comment diagnostiquer un détendeur thermostatique défectueux (bulbe percé) ?
  - `q-g9-189` *(niveau 2, rangée en G9)* — Sur une installation avec détendeur électronique, quel paramètre principal pilote l'ouverture de la vanne ?

#### 9.02 — ✅ enseigné et vérifié

> *Installer des vannes dans la bonne position*

- **Enseigné** — `g9` Le détendeur et les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Installer les vannes dans la bonne position »
- **Interrogé** — 1 question(s) :
  - `pk-q-9.02` *(niveau 1, rangée en G9)* — Une vanne doit toujours être montée dans le sens de la flèche gravée sur son corps, comme un filtre déshydrateur. Que r…

#### 9.03 — ✅ enseigné et vérifié

> *Régler un détendeur mécanique/électronique*

- **Enseigné** — `g9` Le détendeur et les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Régler un détendeur mécanique ou électronique »
- **Interrogé** — 1 question(s) :
  - `pk-q-9.03` *(niveau 2, rangée en G9)* — Quelle est la différence entre un détendeur thermostatique (mécanique) et un détendeur électronique ?

#### 9.04 — ✅ enseigné et vérifié

> *Régler des thermostats mécaniques et électroniques*

- **Enseigné** — `g9b` Régler et contrôler les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Régler un thermostat mécanique ou électronique »
- **Interrogé** — 1 question(s) :
  - `pk-g9b-1` *(niveau 1, rangée en G9)* — Comment un thermostat mécanique détecte-t-il la température ?

#### 9.05 — ✅ enseigné et vérifié

> *Régler la soupape de régulation de la pression*

- **Enseigné** — `g9b` Régler et contrôler les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Régler une soupape de régulation de pression »
- **Interrogé** — 4 question(s) :
  - `pk-q-9.05` *(niveau 1, rangée en G9)* — Que fait la soupape de régulation de pression sur une installation frigorifique ?
  - `pk-g9b-5` *(niveau 1, rangée en G9)* — Sur quelle pression le KVL agit-il ?
  - `pk-g9b-6` *(niveau 1, rangée en G9)* — Sur quelle pression le KVP agit-il ?
  - `pk-g9b-7` *(niveau 1, rangée en G9)* — Sur quelle pression le KVR agit-il ?

#### 9.06 — ✅ enseigné et vérifié

> *Régler des limiteurs de pression mécaniques et électroniques*

- **Enseigné** — `g9b` Régler et contrôler les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Régler un limiteur de pression mécanique ou électronique »
- **Interrogé** — 1 question(s) :
  - `pk-q-9.06` *(niveau 2, rangée en G9)* — Comment est réglé un limiteur de pression mécanique ?

#### 9.07 — ✅ enseigné et vérifié

> *Vérifier le fonctionnement d'un séparateur d'huile*

- **Enseigné** — `g9b` Régler et contrôler les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier le fonctionnement d'un séparateur d'huile »
- **Interrogé** — 1 question(s) :
  - `pk-g9b-2` *(niveau 1, rangée en G9)* — Vérifier le fonctionnement d'un séparateur d'huile, c'est contrôler quoi ?

#### 9.08 — ✅ enseigné et vérifié

> *Vérifier l'état d'un filtre sécheur*

- **Enseigné** — `g9` Le détendeur et les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier un filtre déshydrateur »
- **Interrogé** — 5 question(s) :
  - `q-g9-v6_050` *(niveau 1, rangée en G9)* — Le déshydrateur contient un matériau appelé :
  - `q-g9-v6_051` *(niveau 1, rangée en G9)* — Une pastille de couleur jaune/marron dans le voyant liquide indique :
  - `q-g9-172` *(niveau 1, rangée en G9)* — Vous devez installer un filtre déshydrateur sur la ligne liquide. Dans quel sens doit-il être monté ?
  - `q-g9-161` *(niveau 1, rangée en G9)* — Quel accessoire permet de retenir l'humidité dans un circuit frigorifique ?
  - `q-g9-v6_151` *(niveau 1, rangée en G9)* — Le déshydrateur doit être remplacé :

#### 9.09 — ✅ enseigné et vérifié

> *Rédiger un rapport sur l'état de ces composants en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant*

- **Enseigné** — `g9b` Régler et contrôler les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Rédiger un rapport d'état sur ces organes »
- **Interrogé** — 1 question(s) :
  - `pk-g9b-3` *(niveau 2, rangée en G9)* — Pendant une visite, tu remarques qu'un limiteur de pression ne coupe plus correctement. Tu ne le notes pas dans ton rap…

#### 9.10 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les mesures pour améliorer ou maintenir l'efficacité énergétique de l'équipement pendant l'installation ou la maintenance des détendeurs thermostatiques et d'autres composants*

- **Enseigné** — `g9b` Régler et contrôler les organes annexes *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les mesures d'efficacité énergétique liées à ces réglages »
- **Interrogé** — 1 question(s) :
  - `pk-g9b-4` *(niveau 2, rangée en G9)* — Un séparateur d'huile laisse l'huile encrasser les échangeurs. Quel est l'effet sur le compresseur ?

### G10 — Tuyauterie : monter un réseau de tuyauterie étanche dans une installation de réfrigération

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **10.01** | A1 prat. · A2 prat. | `g10` | 3 | ✅ |
| **10.02** | A1 prat. · A2 prat. | `g10` | 1 | ✅ |

#### 10.01 — ✅ enseigné et vérifié

> *Soudage, brasage fort et/ou brasage tendre des joints étanches sur des tubes, des tuyaux et des composants métalliques pouvant être utilisés dans des systèmes de réfrigération, de climatisation et de pompes à chaleur*

- **Enseigné** — `g10` Tuyauterie et brasage sous azote *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser des joints étanches (soudage, brasage fort ou tendre) »
- **Interrogé** — 3 question(s) :
  - `q-g10-v6_061` *(niveau 1, rangée en G10)* — Pourquoi brase-t-on toujours sous flux d'azote ?
  - `q-g10-v6_065` *(niveau 1, rangée en G10)* — Pour un brasage cuivre-cuivre, l'alliage d'apport utilisé est généralement :
  - `q-g10-69` *(niveau 1, rangée en G10)* — Lors d'un brasage, pourquoi faut-il balayer à l'azote ?

#### 10.02 — ✅ enseigné et vérifié

> *Fabriquer/vérifier des supports de tuyaux et de composants*

- **Enseigné** — `g10` Tuyauterie et brasage sous azote *(+ question intégrée)*
  <br>Dit à l'élève : « Fabriquer et vérifier les supports de tuyauteries »
- **Interrogé** — 1 question(s) :
  - `pk-q-10.02` *(niveau 2, rangée en G10)* — Un joint brasé était parfait à la pose, mais il finit par se fissurer des mois plus tard. La tuyauterie est posée sur u…

### G11 — Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **11.01** | A1 théo. · A2 théo. · D théo. · E théo. | `g11` | 2 | ✅ |
| **11.02** | A1 théo. · A2 théo. | `g11` | 1 | ✅ |
| **11.03** | A1 théo. · A2 théo. | `s3` `s4` `cl1` `cl3` `g11` | 8 | ✅ |
| **11.04** | A1 théo. · A2 théo. | `g11` | 1 | ✅ |
| **11.05** ★ | A1 théo. · A2 théo. · D théo. | `g11` | 1 | ✅ |
| **11.06** ★ | — *(B)* | — | — | · |
| **11.07** ★ | — *(C)* | — | — | · |

#### 11.01 — ✅ enseigné et vérifié

> *Connaître les technologies de substitution pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et savoir les manipuler sans danger*

- **Enseigné** — `g11` Substitution et efficacité énergétique *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les technologies de substitution et leur manipulation sans danger »
- **Interrogé** — 2 question(s) :
  - `q-g11-v6_030` *(niveau 1, rangée en G11)* — Les HFO (hydrofluoro-oléfines) se caractérisent par :
  - `q-g11-v6_035` *(niveau 1, rangée en G11)* — Un remplacement 'drop-in' signifie :

#### 11.02 — ✅ enseigné et vérifié

> *Connaître les systèmes de conception pertinents afin de réduire la charge des gaz à effet de serre fluorés et d'augmenter l'efficacité énergétique*

- **Enseigné** — `g11` Substitution et efficacité énergétique *(+ question intégrée)*
  <br>Dit à l'élève : « Expliquer la conception à charge réduite et l'efficacité »
- **Interrogé** — 1 question(s) :
  - `q-g11-185` *(niveau 1, rangée en G11)* — Comment optimiser le COP (Coefficient de Performance) d'une installation frigorifique ?

#### 11.03 — ✅ enseigné et vérifié

> *Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité*

- **Enseigné** — `s3` La flamme interdite — décomposition du fluide *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les règles de sécurité des fluides inflammables, toxiques ou à pression plus élevée. »
- **Enseigné** — `s4` Ce qui éclate — la pression *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les règles de sécurité applicables aux fluides nécessitant une pression de fonctionnement plus élevée »
- **Enseigné** — `cl1` Lire une classe — deux lettres, deux dangers *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les règles de sécurité applicables aux fluides toxiques, inflammables ou nécessitant une pression de fonctionnement plus élevée. »
- **Enseigné** — `cl3` CO₂ : deux dangers mortels — la pression et l'air qu'il vous prend *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître les règles de sécurité applicables aux fluides toxiques, inflammables ou nécessitant une pression de fonctionnement plus élevée. »
- **Enseigné** — `g11` Substitution et efficacité énergétique *(+ question intégrée)*
  <br>Dit à l'élève : « Appliquer les règles de sécurité pour fluides inflammables, toxiques ou haute pression »
- **Interrogé** — 8 question(s) :
  - `q-g11-v6_033` *(niveau 1, rangée en G11)* — Un fluide classé A2L est :
  - `q-g11-v6_140` *(niveau 2, rangée en G11)* — La vitesse de flamme maximale pour un fluide classé A2L est de :
  - `q-g11-54` *(niveau 1, rangée en G11)* — Le R290 (propane) est classé :
  - `q-g11-v6_092` *(niveau 1, rangée en G11)* — La norme EN 378 définit entre autres :
  - `q-g11-v6_183` *(niveau 2, rangée en G11)* — La norme EN 378 classe les locaux en :
  - `pk-cl3-1` *(niveau 1, rangée en G11)* — Une fuite de CO₂ (R-744) s'est produite dans un local technique. Où le gaz s'accumule-t-il ?
  - `pk-cl3-2` *(niveau 2, rangée en G11)* — En quoi le danger du CO₂ en local fermé diffère-t-il de celui de l'azote ?
  - `pk-cl3-3` *(niveau 2, rangée en G11)* — Vous trouvez un collègue inconscient au fond d'une fosse abritant une installation au CO₂. Que faites-vous ?

#### 11.04 — ✅ enseigné et vérifié

> *Comprendre les avantages et inconvénients respectifs, notamment en ce qui concerne l'efficacité énergétique, des réfrigérants de substitution en fonction de leur application prévue et des conditions climatiques des différentes régions*

- **Enseigné** — `g11` Substitution et efficacité énergétique *(+ question intégrée)*
  <br>Dit à l'élève : « Comparer les fluides de substitution selon l'application »
- **Interrogé** — 1 question(s) :
  - `pk-q-11.04` *(niveau 2, rangée en G11)* — Un fluide de substitution'est très performant en froid commercial, mais son efficacité baisse nettement quand l'air ext…

#### 11.05 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les différences de conception des composants et des systèmes pour les équipements et les systèmes tributaires des hydrocarbures*

- **Enseigné** — `g11` Substitution et efficacité énergétique *(+ question intégrée)*
  <br>Dit à l'élève : « Situer les différences de conception des systèmes aux hydrocarbures »
- **Interrogé** — 1 question(s) :
  - `pk-q-11.05` *(niveau 1, rangée en G11)* — Sur une machine fonctionnant au R-290 (propane), en cas de fuite dans le local, où le gaz s'accumule-t-il en priorité ?

#### 11.06 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les différences de conception des composants et des systèmes pour les équipements et les systèmes tributaires du R744 (CO2), telles que les exigences relatives aux matériaux des tuyauteries, le fonctionnement des systèmes de surpression, des soupapes de commande à pression moyenne et à haute pression, l'optimisation du système et du processus des systèmes de réfrigération au R744 (CO2) afin d'accroître l'efficacité du système, comme les compresseurs parallèles, la technologie des éjecteurs (éjecteur de liquide et de gaz) et les systèmes à noyage partiel ; connaître les concepts de sécurité permettant de limiter la pression d'arrêt et l'utilisation de systèmes de refroidissement à stagnation*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 11.07 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les différences de conception des composants et des systèmes pour les équipements et les systèmes tributaires du R717 (NH3), telles que la conception des compresseurs, les compresseurs équipés de moteurs séparés, le contrôle de la capacité des compresseurs à piston alternatif et à vis, les circuits de compresseurs, la compression à un ou deux étages, les condenseurs évaporatifs, le fonctionnement du séparateur et le contrôle du niveau, les interrupteurs flotteurs, le thermosyphon, les différences dans la gestion de l'huile (utilisation d'huiles non miscibles), la régulation de l'huile, avoir une connaissance élémentaire des systèmes directs (DX, inondés, fonctionnement par recirculation et LCA) et des systèmes indirects*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

### G12 — Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures

*spécifique aux catégories A1, A2*

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **12.01** ★ | A1 théo. · A2 théo. | `g12` | 1 | ✅ |
| **12.02** ★ | A1 théo. · A2 théo. | `s1` `s2` `cl2` `cl4` `g12` | 5 | ✅ |
| **12.03** ★ | A1 prat. · A2 prat. | `g12` | 1 | ✅ |
| **12.04** ★ | A1 prat. · A2 prat. | `cl2` `p7` `g12` `x5` | 2 | ✅ |
| **12.05** ★ | A1 prat. · A2 prat. | `p7` `x5` | 1 | ✅ |
| **12.06** ★ | A1 prat. · A2 prat. | `g12` `x5` | 1 | ✅ |
| **12.07** ★ | A1 prat. · A2 prat. | `g12b` | 1 | ✅ |
| **12.08** ★ | A1 prat. · A2 prat. | `g12b` | 1 | ✅ |
| **12.09** ★ | A1 prat. · A2 prat. | `g12b` | 1 | ✅ |
| **12.10** ★ | A1 prat. · A2 prat. | `g12b` | 1 | ✅ |
| **12.11** ★ | A1 prat. · A2 prat. | `g12b` | 1 | ✅ |
| **12.12** ★ | A1 prat. · A2 prat. | `g12b` | 1 | ✅ |
| **12.13** ★ | A1 théo. · A2 théo. | `s1` `g12` | 1 | ✅ |
| **12.14** ★ | A1 théo. · A2 théo. | `g12` | 1 | ✅ |

#### 12.01 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les règles d'étiquetage et les prescriptions spéciales pour les réfrigérants inflammables dans les équipements, systèmes et cylindres de refroidissement ainsi que les prescriptions spéciales relatives au raccordement des bombonnes*

- **Enseigné** — `g12` Hydrocarbures — le spécifique A1 et A2 *(+ question intégrée)*
  <br>Dit à l'élève : « Lire l'étiquetage et raccorder correctement une bouteille »
- **Interrogé** — 1 question(s) :
  - `pk-q-12.01` *(niveau 1, rangée en G12)* — Une bouteille de R-290 (propane) a un raccord et un filetage à gauche, différents d'une bouteille de HFC. Que faites-vo…

#### 12.02 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés*

- **Enseigné** — `s1` L'air qui manque — l'asphyxie *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI. »
- **Enseigné** — `s2` Le froid brûle — projections et gelures *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI. »
- **Enseigné** — `cl2` Explosif avant d'être perceptible — la LIE *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître le matériel de sécurité obligatoire : détection de gaz, détection des fuites, ventilation, équipements de protection individuelle. »
- **Enseigné** — `cl4` Se protéger du CO₂ — détection, EPC et EPI *(+ question intégrée)*
  <br>Dit à l'élève : « Connaître le matériel de sécurité obligatoire : détection de gaz, détection des fuites, ventilation, équipements de protection individuelle. »
- **Enseigné** — `g12` Hydrocarbures — le spécifique A1 et A2 *(+ question intégrée)*
  <br>Dit à l'élève : « Appliquer les règles de sécurité outils, EPI et détection gaz »
- **Interrogé** — 5 question(s) :
  - `q-g12-v6_093` *(niveau 1, rangée en G12)* — Les fluides A2L comme le R32 nécessitent :
  - `q-g12-v6_184` *(niveau 1, rangée en G12)* — Pour les fluides A2L, les outils d'intervention doivent être :
  - `pk-cl2-1` *(niveau 1, rangée en G12)* — Que désigne la LIE d'un gaz inflammable ?
  - `pk-cl2-2` *(niveau 2, rangée en G12)* — Peut-on se fier à son odorat pour détecter une fuite de R-290 dans un local technique ?
  - `pk-cl2-3` *(niveau 2, rangée en G12)* — Un explosimètre affiche « 20 % LIE ». Comment lisez-vous cette valeur ?

#### 12.03 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Calculer la charge de réfrigérant inflammable dans un système conformément aux normes de sécurité en vigueur*

- **Enseigné** — `g12` Hydrocarbures — le spécifique A1 et A2 *(+ question intégrée)*
  <br>Dit à l'élève : « Déterminer la charge admissible »
- **Interrogé** — 1 question(s) :
  - `q-g12-v6_091` *(niveau 1, rangée en G12)* — La charge maximale en R290 (propane) dans un local accessible au public est très limitée car :

#### 12.04 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger*

- **Enseigné** — `cl2` Explosif avant d'être perceptible — la LIE *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser une analyse des risques avant de commencer le travail, et supprimer ou identifier les sources de danger. »
- **Enseigné** — `p7` Préparation de chantier — risques, EPI, zone de travail *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser l'analyse de risques avant le travail »
- **Enseigné** — `g12` Hydrocarbures — le spécifique A1 et A2 *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser l'analyse de risques avant intervention »
- **Enseigné** — `x5` Détective — intervention sur monobloc R-290 *(+ question intégrée)*
  <br>Dit à l'élève : « Conduire l'analyse de risques avant intervention »
- **Interrogé** — 2 question(s) :
  - `q-g12-286` *(niveau 2, rangée en G12)* — Pourquoi ne doit-on jamais approcher une flamme d'un circuit contenant un fluide A2L ou A3 non inerté ?
  - `pk-p7-1` *(niveau 1, rangée en G12)* — À quel moment réalise-t-on l'analyse de risques d'une intervention ?

#### 12.05 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Préparer la zone de travail et sélectionner les outils, le matériel et les équipements de protection adéquats pour travailler sur des systèmes dépendant des réfrigérants inflammables*

- **Enseigné** — `p7` Préparation de chantier — risques, EPI, zone de travail *(+ question intégrée)*
  <br>Dit à l'élève : « Préparer la zone de travail et choisir les EPI adaptés »
- **Enseigné** — `x5` Détective — intervention sur monobloc R-290 *(+ question intégrée)*
  <br>Dit à l'élève : « Préparer la zone : ventilation, ignition, EPI »
- **Interrogé** — 1 question(s) :
  - `pk-p7-2` *(niveau 2, rangée en G12)* — Avant d'intervenir sur une installation au R-290, que vérifie-t-on dans la zone de travail ?

#### 12.06 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Récupérer les réfrigérants inflammables du système en toute sécurité et remplir le système avec de l'azote*

- **Enseigné** — `g12` Hydrocarbures — le spécifique A1 et A2 *(+ question intégrée)*
  <br>Dit à l'élève : « Récupérer et inerter à l'azote »
- **Enseigné** — `x5` Détective — intervention sur monobloc R-290 *(+ question intégrée)*
  <br>Dit à l'élève : « Récupérer puis inerter avant toute flamme »
- **Interrogé** — 1 question(s) :
  - `q-g12-291` *(niveau 2, rangée en G12)* — Vous devez braser sur un circuit au R-32 (A2L). Quelles précautions prenez-vous avant d'allumer le chalumeau ?

#### 12.07 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Ouvrir le système, enlever et remplacer un composant, refermer le système*

- **Enseigné** — `g12b` Intervenir sur un circuit hydrocarbure *(+ question intégrée)*
  <br>Dit à l'élève : « Ouvrir le circuit pour remplacer un composant, puis le refermer »
- **Interrogé** — 1 question(s) :
  - `pk-g12b-1` *(niveau 1, rangée en G12)* — Vous devez rebraser un composant sur un circuit au R-290. Quelle affirmation'est vraie ?

#### 12.08 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Effectuer une épreuve de pression pour contrôler l'étanchéité du système*

- **Enseigné** — `g12b` Intervenir sur un circuit hydrocarbure *(+ question intégrée)*
  <br>Dit à l'élève : « Réaliser l'épreuve de pression à l'azote »
- **Interrogé** — 1 question(s) :
  - `pk-q-12.08` *(niveau 1, rangée en G12)* — Vous devez régler la valeur de la pression d'épreuve à l'azote pour contrôler une brasure neuve sur un circuit R-290. O…

#### 12.09 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Réaliser un essai sous vide pour éliminer l'humidité et vérifier l'étanchéité du système*

- **Enseigné** — `g12b` Intervenir sur un circuit hydrocarbure *(+ question intégrée)*
  <br>Dit à l'élève : « Tirer au vide pour sécher et vérifier le circuit »
- **Interrogé** — 1 question(s) :
  - `pk-g12b-2` *(niveau 2, rangée en G12)* — Après le tirage au vide, vous fermez la vanne de la pompe. Sur le manomètre, le vide remonte doucement au lieu de reste…

#### 12.10 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Charger le système avec le volume approprié de réfrigérant à base d'hydrocarbures*

- **Enseigné** — `g12b` Intervenir sur un circuit hydrocarbure *(+ question intégrée)*
  <br>Dit à l'élève : « Charger le circuit avec la quantité d'hydrocarbure prévue »
- **Interrogé** — 1 question(s) :
  - `pk-g12b-3` *(niveau 1, rangée en G12)* — Comment détermine-t-on la quantité de réfrigérant hydrocarbure à charger dans le circuit ?

#### 12.11 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Réaliser un contrôle d'étanchéité sur le système au moyen d'une méthode directe*

- **Enseigné** — `g12b` Intervenir sur un circuit hydrocarbure *(+ question intégrée)*
  <br>Dit à l'élève : « Contrôler l'étanchéité par une méthode directe »
- **Interrogé** — 1 question(s) :
  - `pk-g12b-4` *(niveau 1, rangée en G12)* — Pour le contrôle d'étanchéité direct d'un circuit au R-290, quel détecteur utilise-t-on ?

#### 12.12 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Rédiger un rapport sur le travail d'entretien effectué*

- **Enseigné** — `g12b` Intervenir sur un circuit hydrocarbure *(+ question intégrée)*
  <br>Dit à l'élève : « Rédiger le rapport d'intervention »
- **Interrogé** — 1 question(s) :
  - `pk-q-12.12` *(niveau 1, rangée en G12)* — Vous venez de terminer une intervention sur un circuit hydrocarbure : remplacement du composant, épreuve, vide, charge…

#### 12.13 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)*

- **Enseigné** — `s1` L'air qui manque — l'asphyxie *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier la sécurité du site : signalisation, issues de secours, détecteurs et alarmes gaz. »
- **Enseigné** — `g12` Hydrocarbures — le spécifique A1 et A2 *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier la signalisation, les issues, la détection et les alarmes du site »
- **Interrogé** — 1 question(s) :
  - `pk-q-12.13` *(niveau 2, rangée en G12)* — Vous arrivez pour intervenir sur un équipement au R-290 et constatez que les capteurs de gaz du local ne sont pas'en se…

#### 12.14 ★ nouveau 2025 — ✅ enseigné et vérifié

> *Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance avec des réfrigérants inflammables*

- **Enseigné** — `g12` Hydrocarbures — le spécifique A1 et A2 *(+ question intégrée)*
  <br>Dit à l'élève : « Maintenir l'efficacité énergétique avec un fluide inflammable »
- **Interrogé** — 1 question(s) :
  - `pk-q-12.14` *(niveau 2, rangée en G12)* — Sur une machine au R-290, un léger écart de charge fait chuter les performances plus vite que sur une machine à grosse…

### G13 — Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R744 (CO2)

*spécifique aux catégories B* · *aucun code exigé dans les catégories du pack*

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **13.01** ★ | — *(B)* | `g13` | 1 | 🔵 |
| **13.02** ★ | — *(B)* | — | — | · |
| **13.03** ★ | — *(B)* | — | — | · |
| **13.04** ★ | — *(B)* | `g13` | 2 | 🔵 |
| **13.05** ★ | — *(B)* | — | — | · |
| **13.06** ★ | — *(B)* | — | — | · |
| **13.07** ★ | — *(B)* | — | — | · |
| **13.08** ★ | — *(B)* | — | — | · |
| **13.09** ★ | — *(B)* | — | — | · |
| **13.10** ★ | — *(B)* | — | — | · |
| **13.11** ★ | — *(B)* | — | — | · |
| **13.12** ★ | — *(B)* | — | — | · |
| **13.13** ★ | — *(B)* | — | — | · |
| **13.14** ★ | — *(B)* | `cl4` `g13` | 4 | 🔵 |
| **13.15** ★ | — *(B)* | — | — | · |
| **13.16** ★ | — *(B)* | — | — | · |
| **13.17** ★ | — *(B)* | — | — | · |

#### 13.01 ★ nouveau 2025 — 🔵 traité en information — non exigé dans les catégories du pack

> *Connaître les prescriptions en matière d'étiquetage pour le R744 dans les systèmes et les récipients à pression*

- **Enseigné** — `g13` CO₂ et NH₃ — reconnaître, ne pas intervenir *(+ question intégrée)*
  <br>Dit à l'élève : « Reconnaître une installation CO₂ et ses risques (pression) »
- **Interrogé** — 1 question(s) :
  - `pk-g13-1` *(niveau 1, rangée en G13)* — Le CO₂ (R-744) est classé A1. Quels dangers cette classe n'annonce-t-elle pas ?

#### 13.02 ★ nouveau 2025 — · hors périmètre du pack

> *Lire et comprendre les diagrammes de tuyauterie et d'instrumentation des systèmes de réfrigération au R744*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.03 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les exigences particulières pour les cylindres de réfrigérant et les doubles vannes, ainsi que pour l'extraction des gaz*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.04 ★ nouveau 2025 — 🔵 traité en information — non exigé dans les catégories du pack

> *Connaître les prescriptions en matière de sécurité pour les outils et équipements d'entretien, tels que la détection de gaz, la détection des fuites, les équipements de protection individuelle*

- **Enseigné** — `g13` CO₂ et NH₃ — reconnaître, ne pas intervenir *(+ question intégrée)*
  <br>Dit à l'élève : « Identifier les cylindres et matériels dédiés, et ne pas intervenir »
- **Interrogé** — 2 question(s) :
  - `pk-g13-3` *(niveau 1, rangée en G13)* — Sur une installation au CO₂, pourquoi ne peut-on pas utiliser le matériel de raccordement courant ?
  - `pk-cl4-2` *(niveau 2, rangée en G13)* — Un masque à cartouche protège-t-il dans un local chargé en CO₂ ?

#### 13.05 ★ nouveau 2025 — · hors périmètre du pack

> *Calculer la charge de R744 dans un système conformément aux normes de sécurité en vigueur*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.06 ★ nouveau 2025 — · hors périmètre du pack

> *Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.07 ★ nouveau 2025 — · hors périmètre du pack

> *Préparer la zone de travail et sélectionner les outils, le matériel et les équipements de protection adéquats pour travailler sur des systèmes tributaires du R744*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.08 ★ nouveau 2025 — · hors périmètre du pack

> *Réaliser une épreuve de pression pour contrôler la résistance à la pression et l'étanchéité du système*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.09 ★ nouveau 2025 — · hors périmètre du pack

> *Réaliser un essai sous vide pour éliminer l'humidité et vérifier l'étanchéité du système*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.10 ★ nouveau 2025 — · hors périmètre du pack

> *Éliminer en toute sécurité le réfrigérant R744 du système*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.11 ★ nouveau 2025 — · hors périmètre du pack

> *Charger le système avec le volume approprié de R744 à l'état gazeux*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.12 ★ nouveau 2025 — · hors périmètre du pack

> *Réaliser un contrôle d'étanchéité sur le système au moyen d'une méthode directe*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.13 ★ nouveau 2025 — · hors périmètre du pack

> *Rédiger un rapport sur le travail d'entretien effectué*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.14 ★ nouveau 2025 — 🔵 traité en information — non exigé dans les catégories du pack

> *Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)*

- **Enseigné** — `cl4` Se protéger du CO₂ — détection, EPC et EPI *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier la sécurité du site : signalisation, issues de secours, capteurs et alarmes gaz. »
- **Enseigné** — `g13` CO₂ et NH₃ — reconnaître, ne pas intervenir *(+ question intégrée)*
  <br>Dit à l'élève : « Vérifier avant d'intervenir que la signalisation, les issues de secours, les capteurs et les alarmes du site sont bien en état. »
- **Interrogé** — 4 question(s) :
  - `q-g13-283` *(niveau 1, rangée en G13)* — Pourquoi installe-t-on des détecteurs de CO₂ dans les locaux abritant une installation au R-744 ?
  - `q-g13-302` *(niveau 2, rangée en G13)* — Pourquoi les portes des locaux techniques CO₂ doivent-elles s'ouvrir vers l'extérieur ?
  - `pk-cl4-1` *(niveau 1, rangée en G13)* — Dans un local abritant une installation au CO₂, où place-t-on le détecteur de gaz fixe ?
  - `pk-cl4-3` *(niveau 2, rangée en G13)* — Vous arrivez sur un site équipé d'une installation au CO₂. Le voyant du détecteur de gaz est allumé. Que pouvez-vous'en…

#### 13.15 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître l'importance de la haute pression au point triple et de la formation de glace carbonique*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.16 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les prescriptions de sécurité applicables au fonctionnement d'un système contenant le réfrigérant R744*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 13.17 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance utilisant des réfrigérants à haute pression*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

### G14 — Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R717 (NH3)

*spécifique aux catégories C* · *aucun code exigé dans les catégories du pack*

| Code | Épreuve | Enseigné par | Interrogé par | État |
|---|---|---|---:|---|
| **14.01** ★ | — *(C)* | `g13` | 2 | 🔵 |
| **14.02** ★ | — *(C)* | — | — | · |
| **14.03** ★ | — *(C)* | — | — | · |
| **14.04** ★ | — *(C)* | — | — | · |
| **14.05** ★ | — *(C)* | — | — | · |
| **14.06** ★ | — *(C)* | — | — | · |
| **14.07** ★ | — *(C)* | — | — | · |
| **14.08** ★ | — *(C)* | — | — | · |
| **14.09** ★ | — *(C)* | — | — | · |
| **14.10** ★ | — *(C)* | — | — | · |
| **14.11** ★ | — *(C)* | — | — | · |
| **14.12** ★ | — *(C)* | — | — | · |
| **14.13** ★ | — *(C)* | — | — | · |
| **14.14** ★ | — *(C)* | — | — | · |
| **14.15** ★ | — *(C)* | — | — | · |
| **14.16** ★ | — *(C)* | — | — | · |
| **14.17** ★ | — *(C)* | — | — | · |
| **14.18** ★ | — *(C)* | — | — | · |
| **14.19** ★ | — *(C)* | — | — | · |

#### 14.01 ★ nouveau 2025 — 🔵 traité en information — non exigé dans les catégories du pack

> *Lire et comprendre les diagrammes de tuyauterie et d'instrumentation des systèmes de réfrigération au R717 (NH3)*

- **Enseigné** — `g13` CO₂ et NH₃ — reconnaître, ne pas intervenir *(+ question intégrée)*
  <br>Dit à l'élève : « Reconnaître une installation NH₃ et la conduite à tenir »
- **Interrogé** — 2 question(s) :
  - `pk-g13-2` *(niveau 2, rangée en G13)* — Vous sentez une odeur piquante caractéristique dans un local qui abrite une installation à l'ammoniac. Que faites-vous ?
  - `pk-g13-4` *(niveau 2, rangée en G13)* — Vous détenez une attestation A1. Sur le site, une fuite se déclare sur l'installation à l'ammoniac. Un collègue vous de…

#### 14.02 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les exigences particulières pour les cylindres de réfrigérant et pour l'extraction des gaz*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.03 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les prescriptions en matière d'étiquetage pour les réfrigérants toxiques dans les systèmes et les récipients à pression*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.04 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les prescriptions en matière de sécurité pour les outils et équipements d'entretien (stations de récupération, pompes à vide, détecteurs électroniques de fuites) y compris la détection de gaz, la détection des fuites, les équipements de protection individuelle, en particulier les masques à gaz*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.05 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les règles permettant le fonctionnement en toute sécurité, y compris les précautions à prendre pour éviter les incendies et les explosions ainsi que les blessures dues à la toxicité*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.06 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les matériaux compatibles avec le R717 (NH3)*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.07 ★ nouveau 2025 — · hors périmètre du pack

> *Préparer la zone de travail et sélectionner les outils, le matériel et les équipements de protection adéquats pour travailler sur des systèmes tributaires du R717 (NH3)*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.08 ★ nouveau 2025 — · hors périmètre du pack

> *Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.09 ★ nouveau 2025 — · hors périmètre du pack

> *Avoir une connaissance élémentaire de la construction et de l'installation correctes ou des opérations d'entretien des systèmes*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.10 ★ nouveau 2025 — · hors périmètre du pack

> *Effectuer une épreuve de pression pour contrôler l'étanchéité du système*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.11 ★ nouveau 2025 — · hors périmètre du pack

> *Réaliser un essai sous vide pour éliminer l'humidité et vérifier l'étanchéité du système*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.12 ★ nouveau 2025 — · hors périmètre du pack

> *Charger le système avec la charge désignée de réfrigérant toxique*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.13 ★ nouveau 2025 — · hors périmètre du pack

> *Contrôler l'étanchéité du système au moyen d'une des méthodes directes*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.14 ★ nouveau 2025 — · hors périmètre du pack

> *Récupérer les réfrigérants inflammables du système en toute sécurité et remplir le système avec de l'azote*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.15 ★ nouveau 2025 — · hors périmètre du pack

> *Rédiger un rapport sur le travail de réparation effectué*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.16 ★ nouveau 2025 — · hors périmètre du pack

> *Contrôler visuellement l'étanchéité des composants du système tels que les soupapes de sécurité et leur intervalle d'inspection*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.17 ★ nouveau 2025 — · hors périmètre du pack

> *Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.18 ★ nouveau 2025 — · hors périmètre du pack

> *Calculer la charge de réfrigérant toxique autorisée dans un système conformément aux normes de sécurité en vigueur*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

#### 14.19 ★ nouveau 2025 — · hors périmètre du pack

> *Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance utilisant des réfrigérants toxiques*

- **Enseigné** — aucune fiche.
- **Interrogé** — aucune question.

## 3. Les 17 questions hors référentiel

Aucun code de l'annexe II.B ne les couvre honnêtement. Elles n'ont pas été rattachées
de force : un faux rattachement ferait croire à une couverture qui n'existe pas. Elles
restent dans la banque — le savoir est utile au métier — mais **elles ne sont pas
évaluables à l'examen**, et elles figurent ici pour être décidées, non pour disparaître.

**nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B** — 8 question(s)

- `q-g1-31` — Que signifie HFC ?
- `q-g1-33` — Dans la nomenclature R134a, que signifie le 'a' ?
- `q-g1-36` — Quelle est la composition du R410A ?
- `q-g1-41` — Le R22 appartient à quelle famille ?
- `q-g1-51` — Le R407C est composé de :
- `q-g1-v6_031` — Dans la nomenclature Rxyz, le chiffre des dizaines (y) correspond à :
- `q-g1-v6_132` — Le R410A est un mélange de :
- `q-g1-v6_137` — Le R12 est un :

**cintrage : geste métier ; le groupe 10 ne couvre que le brasage (10.01) et les supports (10.02)** — 1 question(s)

- `q-g10-87` — Le cintrage d'un tube cuivre frigorifique doit se faire :

**dudgeonnage : raccord mécanique, hors du groupe 10 (brasage, supports)** — 1 question(s)

- `q-g10-84` — Le surfaçage des collets (dudgeonnage) doit être réalisé avec :

**raccordement sur vanne Schrader : geste métier non listé à l'annexe II.B** — 1 question(s)

- `q-g10-v6_157` — Lors du raccordement d'un flexible sur une vanne Schrader, il faut d'abord :

**relève du groupe 14 (ammoniac), hors des catégories A1/A2/D/E de ce pack** — 3 question(s)

- `q-g13-v6_090` — L'ammoniac (R717) est classé :
- `q-g13-v6_094` — L'ammoniac est principalement utilisé dans :
- `q-g13-v6_182` — L'ammoniac peut être détecté facilement par :

**sécurité électrique : indispensable au métier, non listée comme compétence à l'annexe II.B** — 3 question(s)

- `pk-s5-1` — Quelle est la dernière étape avant de poser les mains sur un circuit électrique consigné ?
- `pk-s5-2` — Pourquoi contrôle-t-on le VAT sur une source connue avant ET après s'en être servi ?
- `pk-s5-3` — Une machine vient d'être mise hors tension. Que peut-il rester de dangereux dans le coffret ?

---

*Voir aussi : `COUVERTURE-REFERENTIEL.md` (le code est-il cité ?) et
`PROFONDEUR-REFERENTIEL.md` (le code est-il tenu ?).*

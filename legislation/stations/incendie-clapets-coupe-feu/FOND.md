# Station « Clapets coupe-feu » — FOND à valider

> Réseau Législation · sous-ligne Incendie (#b91c1c) · niveau BTS.
> Slug : `incendie-clapets-coupe-feu` · sous-titre du plan : « traversées, DAS ».
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Fond rédigé et station produite le 30/09/2026.
> **Statut : `data-prototype` posé, en attente de relecture métier de F. Henninot.**

## Ce qui fait l'intérêt de cette station

Une gaine qui traverse une paroi coupe-feu ouvre un chemin au feu et aux fumées. Le clapet
coupe-feu rétablit le degré de la paroi. Le technicien d'études le rencontre à trois endroits :
sur le **plan** (la traversée doit être repérée), au **CCTP** (déclenchement, accès, calfeutrement,
pose conforme au procès-verbal) et à l'**exploitation** (vérification annuelle). C'est la station
où le lot ventilation touche au lot sécurité incendie.

## Objectif

À la fin de la station, l'étudiant sait : pourquoi une gaine perce une paroi ; ce que fait le
clapet (degré égal à celui de la paroi) ; comment il se déclenche (capteur thermique taré à
70 °C, ou télécommande par le CMSI) ; ce que sont position d'attente, position de sécurité et
réarmement ; où le règlement l'exige ; ce qu'il faut prévoir au plan (pose au droit de la paroi,
calfeutrement, accès au mécanisme) ; que le fonctionnement se vérifie tous les ans.

## Référentiel

**TP TECVC, REAC TP-00133 — CP1 et CP7.**
- **CP1 (plans d'implantation)** : le technicien d'études repère les traversées de parois sur les
  plans et y prévoit l'accès aux clapets (trappes, faux plafond ouvrable).
- **CP7 (ventilation tertiaire)** : le réseau aéraulique d'un ERP traverse des parois coupe-feu ;
  les clapets font partie de ce réseau.
- Pas d'attestation d'aptitude 2025 (station non fluidique).

## Déroulé des 8 écrans

Le sigle ERP = établissement recevant du public. Toutes les références d'articles sont celles du
règlement de sécurité contre les risques d'incendie et de panique dans les ERP (arrêté du
25 juin 1980 modifié), lues sur le texte consolidé (voir « Sources »).

1. **Une gaine perce la paroi : le chemin du feu** — `gaine-traverse-la-paroi.svg` (**animé** :
   la flèche se trace, la fumée apparaît). Degré coupe-feu ; la gaine perce la paroi ; CH 32 § 1
   (circuits aérauliques réalisés pour limiter la propagation du feu).
2. **Le clapet rétablit le degré de la paroi** — `clapet-retablit-le-degre.svg` (fixe). CH 32 § 5 :
   clapet coupe-feu ou clapet-bouche terminal, quelle que soit la section, d'un degré égal au
   degré coupe-feu des parois franchies ; il rétablit les caractéristiques de résistance au feu.
3. **Le déclenchement thermique : le fusible et la lame** — `fusible-et-lame.svg` (**animé** : le
   mercure monte, le fusible fond, la lame tombe). CH 32 § 6 : capteur de température taré à
   70 °C ; clapets conformes à la NF S 61-937-5 (mars 2012) présumés satisfaire. Le fait que la
   fermeture d'un clapet auto-commandé ne dépend ni du courant ni d'un ordre extérieur est le
   principe du type « auto-commandé » (CO 30 § 2 distingue télécommandé / auto-commandé).
4. **Le clapet, DAS commandé par le SSI** — `ssi-commande-le-das.svg` (**animé** : l'alarme, le
   trajet de l'ordre, la lame qui se ferme). CO 30 § 2 (définition du clapet : DAS, compartimentage,
   ouvert en position d'attente, télécommandé ou auto-commandé) ; CH 32 § 6 (SSI de catégorie A ou B :
   seuls les clapets télécommandés au droit du compartimentage, depuis le CMSI).
5. **Attente, sécurité, réarmement** — `trois-positions.svg` (**animé** : les trois vignettes
   s'éclairent tour à tour). Position d'attente = ouvert (CO 30 § 2). Position de sécurité,
   réarmement, contrôle de position : vocabulaire de métier, explications sans valeur ni article
   (voir « À sourcer »).
6. **Où le règlement exige un clapet** — `six-parois.svg` (fixe). CH 32 § 5 : les six catégories de
   parois ; CH 32 § 4 : traversée d'un bâtiment tiers.
7. **La pose : au droit de la paroi, calfeutrée, accessible** — `pose-au-droit-de-la-paroi.svg` (fixe).
   CH 32 § 5 (emplacement, cas du volume non desservi), § 7 (calfeutrement), § 6 (accessibilité du
   mécanisme) ; degré établi par essai, consigné dans un procès-verbal (principe) ; normes payantes
   citées par leur objet seulement : NF EN 1366-2 (essais de résistance au feu, clapets),
   NF EN 13501-3 (classement), NF EN 15650 (norme produit, clapets coupe-feu).
8. **Contrôler chaque année, et le réflexe** — `verification-annuelle.svg` (**animé** : les cinq
   cases se cochent). CH 58 § 2 : vérifications périodiques tous les ans, qui portent sur le
   fonctionnement des clapets coupe-feu installés sur les circuits aérauliques. Les cinq cases de
   l'illustration sont la traduction pratique : essai de fermeture et remise en attente
   (fonctionnement), mécanisme accessible (CH 32 § 6), trappe libre, calfeutrement intact
   (CH 32 § 7, état apparent d'entretien de CH 58 § 2).

**5 SVG animés** sur 8 (écrans 1, 3, 4, 5, 8), SMIL autonome sans script, boucle 13 à 14 s avec
temps de repos, état au repos = image finale, rien d'essentiel qui n'existe que dans l'animation.

## Les 4 questions (réponse juste soulignée en gras)

Positions de la bonne réponse : 3e, 4e, 2e, 1re.

**Q1 (écran 2).** Quel degré coupe-feu pour le clapet d'une traversée de paroi ?
- a) Un degré inférieur, puisqu'il ne fait que laisser passer l'air
- b) Le degré que choisit librement le fabricant du clapet
- c) **Un degré égal à celui de la paroi qu'il traverse**
- d) Un degré supérieur, pour compenser le trou de la gaine

*Corrigé : CH 32 § 5, degré égal au degré coupe-feu des parois franchies. Avec un degré moindre, la paroi perdrait son degré à l'endroit du trou.*

**Q2 (écran 3).** Le capteur du déclencheur thermique est taré à…
- a) 120 °C · b) 50 °C · c) 90 °C · d) **70 °C**

*Corrigé : CH 32 § 6 : 70 °C. (Les autres valeurs sont des leurres, non des valeurs réglementaires.)*

**Q3 (écran 4).** SSI de catégorie A exigé : quels clapets au droit du compartimentage ?
- a) Au choix : télécommandés, ou à fusible seul
- b) **Seuls les clapets télécommandés depuis le CMSI**
- c) Seulement des clapets à fusible : ils ne dépendent d'aucun courant
- d) Aucun : le SSI ferme les portes, pas les gaines

*Corrigé : CH 32 § 6.*

**Q4 (écran 8).** Le fonctionnement des clapets coupe-feu se vérifie…
- a) **Tous les ans, avec les vérifications périodiques de ventilation**
- b) Une seule fois, à la réception des travaux
- c) Tous les dix ans, comme une requalification
- d) Tous les trois ans, comme les sécurités des systèmes frigorifiques

*Corrigé : CH 58 § 2 (tous les ans). Le leurre d) reprend la vérification triennale des dispositifs
de sécurité des systèmes thermodynamiques de CH 58 (CH 35 § 3) ; le leurre c) la requalification
DESP.*

## Correspondances

- `../incendie-euroclasses/` — le degré du clapet se lit dans la classification européenne.
- `../incendie-ssi/` — le CMSI et les catégories : d'où part l'ordre de fermeture.
- `../incendie-desenfumage/` — le volet de désenfumage, autre DAS d'obturation (CO 30 § 2 : ouvert ou
  fermé en position d'attente selon l'application).
- https://inerweb.fr/aerorezo/ — les conduits et leurs accès (réseau technique).

## Sources officielles

Toutes consultées le **30/09/2026**. Légifrance est protégé par un test anti-robot depuis le poste de
travail : le texte a été relu, mot pour mot, sur la reproduction du règlement tenue par
sitesecurite.com (qui indique chaque arrêté modificatif), puis rapproché des articles Légifrance
(mêmes numéros d'articles, mêmes références de version).

1. **Arrêté du 25 juin 1980 portant approbation des dispositions générales du règlement de sécurité
   contre les risques d'incendie et de panique dans les ERP** — Légifrance :
   https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000290033
   - **Article CH 32** (circuits aérauliques), version issue de l'arrêté du 29 juillet 2025 :
     https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020304648 — § 1, § 4, § 5, § 6, § 7.
   - **Article CH 58** (vérifications techniques), § 2 (arrêté du 22 novembre 2004, modifié par celui du
     1er septembre 2025) : section « Entretien et vérification », chapitre V (CH).
   - **Article CO 30** (conduits et gaines, généralités), § 2 : définitions du clapet, du volet, de la
     gaine ; définitions issues de l'arrêté du 2 février 1993.
     https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020304254
2. Normes payantes, citées par leur objet seulement : NF S 61-937 (dispositifs actionnés de sécurité,
   citée par CH 32 § 6 sous la référence NF S 61-937-5, mars 2012), NF EN 1366-2, NF EN 13501-3,
   NF EN 15650.

⚠️ **Version à venir** : CO 30 et CO 31 apparaissent, sur le texte consolidé, dans une rédaction issue
de l'arrêté du 19 février 2026, « applicable à partir du 1er juin 2027 ». La station n'utilise de CO 30
que les définitions du § 2 (datées de 1993 sur l'historique affiché) ; **à relire après le
1er juin 2027**. La station n'utilise aucune valeur de CO 31.

## À sourcer (rien de ceci n'est dans la station)

- **Position de sécurité, réarmement, contrôle de position** : les définitions officielles (NF S 61-931,
  NF S 61-937, normes payantes) ; la station n'en donne que le sens usuel, sans valeur ni exigence.
- **Ce que le procès-verbal d'essai borne** : type de paroi, mode de pose, sens de la pression, tolérances ;
  le domaine d'application est fixé par NF EN 1366-2 et NF EN 15650 (payantes) et par le PV du fabricant.
  La station dit seulement que le degré vaut « pour la pose décrite dans le PV ».
- **Habitation et lieux de travail** : les dispositions équivalentes (arrêté du 31 janvier 1986, arrêté du
  5 août 1992 et Code du travail R. 4216-*, abrogés à compter du 1er janvier 2027 par le décret n° 2025-1100)
  n'ont pas été lues pour cette station ; elle renvoie à *Classer le bâti*.
- **Le degré des clapets** en minutes (30, 60, 120…), leur classement (EI…) : dépend de la paroi ; non cité.
- **Dimensionnement des trappes d'accès** (dimensions, nombre) et **modalités d'essai annuel** (mode
  opératoire, qui vérifie, quelle trace) : non trouvés dans les textes lus, non inventés.
- **Fonctionnement à distance sans alimentation** (position de repos en cas de coupure de la commande
  d'un clapet télécommandé) : exigence de la norme DAS, non citée.
- **Autres références d'ERP** : IT 246 (désenfumage) et la mise en œuvre des clapets de désenfumage sont
  hors sujet ici (station *Le désenfumage*).

## Points de vigilance signalés

- L'illustration de l'écran 3 montre le fusible comme élément de déclenchement : le règlement ne parle
  que d'un « capteur de température taré à 70 °C » ; le fusible est la solution courante, dite « en
  pratique le plus souvent ».
- Le contexte est celui des **ERP** (règlement de sécurité). Les autres régimes (habitation, lieux de
  travail, IGH) ne sont pas traités.

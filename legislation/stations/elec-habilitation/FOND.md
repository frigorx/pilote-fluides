# Station « L'habilitation » — FOND

> Réseau Législation · sous-ligne Électrique · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Accent de la sous-ligne : **#a16207**.
> Slug : `elec-habilitation` · titre sur le plan : « L'habilitation » — « B0 · BS · BR ».
> Rédigée le 30/09/2026. Fond à valider par F. Henninot avant toute mise en ligne.

## Ce qui fait l'intérêt de cette station

C'est la **correspondance fondatrice du réseau** (Électrique ⇄ Risques professionnels) :
la règle d'un côté (ici), le geste protégé de l'autre (`../risques-epi/`). Elle place
l'habilitation là où elle est : un acte de l'**employeur**, fondé sur une **formation** et,
depuis le 1er octobre 2025, sur une **attestation médicale**, qui autorise un **symbole**
précis pour une **activité réelle**. Le technicien du froid la croise chaque fois qu'il ouvre
une armoire de groupe de condensation ou de CTA. Le réseau voisin **HoCourant**
(https://inerweb.fr/hocourant/) entraîne à l'habilitation : la station y renvoie, sans le copier.

## Objectif

À la fin de la station, l'étudiant sait dire ce qui soumet une opération à l'habilitation,
qui la délivre, lire un symbole (B2V, BR…), choisir le symbole qui correspond à un geste de
technicien du froid, et vérifier ce qui rend le titre valable (attestation médicale,
recyclage).

## Référentiel — décision et justification

**TP TECVC, REAC TP-00133 : « Hors REAC — culture professionnelle du technicien et du chargé
d'affaires ».** Justification : les compétences CP1 à CP10 portent sur des études
(implantation, modélisation, déperditions, dimensionnement, climatisation, CTA…). L'habilitation
électrique n'est l'objet d'aucune d'elles ; la rattacher à CP9 (climatisation) reviendrait à
inventer un adossement pour faire nombre. Le lien avec CP9/CP10 existe en pratique (l'étudiant
qui visite une installation existante doit savoir ce que son titre l'autorise à ouvrir), mais
il n'est pas dans le référentiel. Pas de codes de l'attestation d'aptitude 2025 : la station
n'est pas fluidique (elle renvoie à `../aptitude-capacite/` pour la distinction).

## Écran 1 — L'obligation : pas d'habilitation, pas d'opération

Article **R. 4544-9** : « Les opérations sur les installations électriques ou dans leur
voisinage ne peuvent être effectuées que par des travailleurs habilités. » Article **R. 4544-2** :
opérations sur les installations = travaux hors tension, travaux sous tension, manœuvres,
essais, mesurages, vérifications (haute et basse tension) et interventions (basse tension) ;
opérations dans le voisinage = opérations d'ordre électrique et non électrique dans une zone
définie autour de pièces nues sous tension, dont les dimensions varient avec le domaine de
tension (un arrêté les précise — **valeurs non reprises**, voir « À sourcer »).
Ce qui n'en demande pas : l'utilisation normale d'un appareil électrique ; pour une personne
avertie, changer une lampe, réarmer une protection, remplacer à l'identique un fusible, si le
matériel est intact et protégé contre les contacts directs (INRS, FAQ).

*Visuel : `svg/obligation.svg` (fixe) — travailleur habilité, armoire électrique, cadre
pointillé de voisinage.*

## Écran 2 — Deux étages : le Code du travail, puis la norme

Article **R. 4544-3** : la définition des opérations et les modalités recommandées pour leur
exécution figurent dans les normes homologuées dont les références sont publiées par arrêté.
**Arrêté du 5 juillet 2024** (art. 1) : NF C 18-510 (janvier 2012), NF C 18-510/A1
(février 2020), NF C 18-550 (août 2015, véhicules et engins) ; abroge l'arrêté du
20 novembre 2017 ; applicable le lendemain de sa publication. Titre de la NF C 18-510 :
« Opérations sur les ouvrages et installations électriques et dans un environnement électrique
— Prévention du risque électrique » (AFNOR, édition de janvier 2012). La norme est payante :
on ne cite que son titre, son objet et ce que l'INRS en publie.

*Visuel : `svg/regle-et-norme.svg` (fixe) — trois blocs empilés.*

## Écran 3 — Qui habilite : l'employeur

Article **R. 4544-10** (version du 1er octobre 2025) : habilitation délivrée par l'employeur,
qui en spécifie la nature ; avant de la délivrer, il s'assure de la formation théorique et
pratique ; il la délivre, maintient ou renouvelle selon les normes de l'article R. 4544-3 ;
il remet un carnet de prescriptions ; la validité de l'habilitation qui autorise le voisinage
de pièces nues sous tension est subordonnée à une attestation d'absence de contre-indication
médicale. INRS : démarche = analyse de l'activité, adéquation compétences/aptitudes, formation
préparatoire (théorique et pratique) ; intérimaire habilité par l'entreprise utilisatrice ;
indépendants, auto-entrepreneurs et employeurs ne peuvent pas s'auto-habiliter ; sous-traitant
habilité par son employeur ; l'habilitation n'autorise pas d'agir de son propre chef : le
travailleur est désigné par l'employeur.

*Visuel : `svg/qui-habilite.svg` (**animé**) — cinq étapes qui apparaissent une à une, la
quatrième (l'employeur) en orange, puis le travailleur et son titre.*

## Écran 4 — Lire un symbole : trois caractères

INRS : 1er caractère = domaine de tension (B basse, H haute) ; 2e = type d'opération, chiffre
(0 ordre non électrique, 1 exécutant, 2 chargé de travaux) ou lettre (C consignation, R
intervention BT générale, S intervention BT élémentaire, E opérations spécifiques, P
opérations BT élémentaires sur chaîne photovoltaïque) ; 3e = lettre additionnelle (V voisinage,
T travaux sous tension, N nettoyage sous tension, X spéciale) ; attribut du symbole E :
manœuvre, mesurage, vérification, essai. Exemple INRS : B2V. Véhicules et engins (NF C 18-550) :
lettre L ajoutée (non développé dans la station). Il n'existe pas de symbole B0V (INRS).

*Visuel : `svg/lire-symbole.svg` (**animé**) — trois tuiles B, 2, V et leurs cartes, puis la
lecture complète.*

## Écran 5 — Les symboles du technicien du froid

B0/H0/H0V : opérations d'ordre non électrique dans le voisinage (simple ; renforcé pour H0V).
BS : intervention BT élémentaire ; pas besoin d'être qualifié en électricité, il faut être
formé. BR : intervention BT générale, entretien et dépannage ; opérateur qualifié en
électricité. BC : chargé de consignation pour des tiers, ne fait que consigner et déconsigner.
BE + attribut. Le symbole se choisit d'après l'activité réelle ; cumul de symboles possible
sur un même titre (INRS). L'habilitation n'est pas l'attestation d'aptitude aux fluides.
**Choix pédagogique assumé** : six symboles retenus pour le métier — la station ne prétend
pas dire lesquels un employeur donné retiendra (c'est son analyse d'activité).

*Visuel : `svg/symboles-frigoriste.svg` (fixe) — six cartes, BR mise en avant.*

## Écran 6 — BS ou BR : le bon niveau pour le bon geste

INRS (FAQ « Quelles sont les limites du symbole d'habilitation BS / BR ? »).
**BS** : remplacement à l'identique d'un fusible ; remplacement à l'identique d'une lampe,
d'un accessoire d'éclairage, d'une prise de courant, d'un interrupteur ; raccordement à un
circuit en attente ; réarmement d'une protection dans un environnement sûr. Circuits
terminaux : ≤ 400 V c.a. (≤ 600 V c.c.), protection ≤ 32 A c.a. (≤ 16 A c.c.), câbles
≤ 6 mm² cuivre (10 mm² aluminium). Exclusivement hors tension, absence de voisinage, aucun
exécutant, mise hors tension pour son propre compte.
**BR** : interventions de courte durée sur parties de faible étendue (entretien, dépannage) ;
au plus un exécutant B1 ; consignation pour son compte et celui de son exécutant ; hors
tension, sauf certaines connexions/déconnexions en présence de tension sur un circuit ouvert
dans les limites ≤ 500 V c.a. (≤ 750 V c.c.), ≤ 63 A c.a. (≤ 32 A c.c.), ≤ 10 mm² cuivre
(16 mm² aluminium) (NF C 18-510 + A1, d'après l'INRS). Les valeurs en courant continu et en
aluminium ne sont pas reprises à l'écran (lisibilité).
Le remplacement d'un contacteur ne figure pas dans la liste BS : c'est une déduction de la
liste exhaustive donnée par l'INRS (à relire côté métier).

*Visuel : `svg/bs-ou-br.svg` (fixe) — tableau BS / BR sur cinq lignes ; astérisque : limites
BR = connexions sous tension.*

## Écran 7 — Le titre, l'attestation médicale, le recyclage

Titre d'habilitation : délivré par l'employeur ; mentionne symboles, domaines de tension,
ouvrages ou installations concernés, limitations éventuelles (INRS, FAQ ; modèle en annexe
de l'ED 6127). Durée de validité définie par l'employeur (INRS). **Attestation médicale** :
depuis le 1er octobre 2025 (décret n° 2025-355 du 18 avril 2025, R. 4544-10 et R. 4544-11) elle
remplace le suivi individuel renforcé ; délivrée par le médecin du travail à l'issue d'un
examen qu'il réalise lui-même, validité 5 ans (INRS) ; les avis d'aptitude délivrés avant cette
date en tiennent lieu 5 ans à compter de leur délivrance (nota des articles). **Recyclage** :
l'INRS recommande 3 ans (c'est aussi la durée recommandée par la norme), 2 ans pour une pratique
exceptionnelle ou occasionnelle, et un suivi annuel de l'adéquation du titre à l'activité
réelle. **Travaux sous tension** : titre valable un an (INRS) ; formation par organisme agréé
(R. 4544-11).

*Visuel : `svg/cycle-habilitation.svg` (**animé**) — boucle de quatre cartes, point orange qui
saute d'une carte à l'autre.*

## Écran 8 — Bilan et le réflexe

- Pas d'habilitation, pas d'opération sur une installation ni dans son voisinage (R. 4544-9).
- La loi impose, la norme donne les modalités, l'employeur habilite.
- Un symbole se lit : domaine · type · lettre additionnelle.
- BS remplace et raccorde ; BR entretient et dépanne ; BC consigne pour les autres.
- Le titre vit : attestation médicale, recyclage, validité fixée par l'employeur.

**Le réflexe : lire son titre avant d'ouvrir l'armoire** — trois questions : mon symbole
couvre-t-il ce geste ? mon titre est-il à jour ? l'installation est-elle consignée ?

*Visuel : `svg/bilan-habilitation.svg` (**animé**) — titre-exemple et trois coches successives.*

## Les 4 questions (quiz)

> Bonnes réponses en positions 3, 1, 4, 2 ; la bonne réponse n'est jamais la plus longue.

**Q1** (écran 3). Un technicien revient d'un stage. Qui délivre son habilitation ?
a) l'organisme de formation · b) le médecin du travail · **c) l'employeur ✔** · d) le client.

**Q2** (écran 4). Un titre porte le symbole B2V. Comment se lit-il ?
**a) basse tension, chargé de travaux, au voisinage ✔** · b) haute tension, exécutant, sous
tension · c) basse tension, exécutant, sous tension · d) basse tension, chargé de consignation,
au voisinage.

**Q3** (écran 5). Dépanner un circuit de commande en basse tension, contacteur compris : quel
symbole ? a) B0 · b) BS · c) BC · **d) BR ✔** (BS : liste courte sans contacteur ; BC : consigne
seulement ; B0 : ordre non électrique).

**Q4** (écran 7). Habilitation avec voisinage de pièces nues sous tension : que faut-il aussi
détenir ? a) un avis d'aptitude SIR · **b) une attestation d'absence de contre-indication
médicale ✔** · c) un diplôme d'électricien · d) un certificat annuel de l'organisme.

## Correspondances

- `../elec-consigner/` (même sous-ligne) — consigner pour soi (BR) ou pour les autres (BC).
- `../elec-terre-differentiel/` (même sous-ligne) — protéger les personnes.
- `../risques-epi/` (Risques professionnels) — la règle d'un côté, le geste protégé de l'autre
  (**correspondance fondatrice**).
- `../risques-neuf-principes/` et `../risques-duerp/` (Risques professionnels) — l'habilitation
  est une mesure de prévention choisie après évaluation du risque.
- `../aptitude-capacite/` (Fluidique) — l'attestation d'aptitude fluides n'est pas l'habilitation.
- https://inerweb.fr/hocourant/ (réseau HoCourant) — entraînement à l'habilitation.

## Sources officielles (consultées le 30/09/2026)

1. Code du travail, art. **R. 4544-9** (version du 01/07/2011) — Légifrance
   https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000022849102 ; art. **R. 4544-10**
   (version du 01/10/2025) https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051500368 ;
   art. **R. 4544-3** https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000022849139.
   Textes relus aussi sur le Code du travail numérique : https://code.travail.gouv.fr/code-du-travail/r4544-2
   (R. 4544-2, -3, -9, -10, -11, mêmes versions).
2. Arrêté du 5 juillet 2024 relatif aux normes définissant les modalités recommandées pour
   l'exécution des opérations sur les installations électriques ou dans leur voisinage —
   Légifrance https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049892203 (articles 1 à 3).
3. INRS, « Habilitation électrique : foire aux questions »
   https://www.inrs.fr/risques/electriques/habilitation-electrique-foire-aux-questions.html
   (symboles, BS, BR, BC, BE, titre, attestation médicale, recyclage, indépendants,
   intérimaires) ; INRS, page « Habilitation électrique »
   https://www.inrs.fr/risques/electriques/habilitation-electrique.html ; brochure ED 6127.
4. AFNOR (boutique) : fiche de la NF C 18-510 (titre, édition de janvier 2012, objet).

## À sourcer (omis volontairement)

- **Dimensions de la zone de voisinage** (simple, renforcé) par domaine de tension : arrêté
  cité à l'article R. 4544-2, non lu. Aucune distance n'est donnée.
- **Valeurs numériques des domaines de tension** (limites BT/HT) : non reprises.
- **Limites BS/BR** (400 V, 32 A, 6 mm² ; 500 V, 63 A, 10 mm²) : reprises telles que
  publiées par l'INRS ; le texte de la norme (payante) n'a pas été lu — à confronter à la
  norme et à l'amendement A2 (édité par AFNOR en juin 2023 selon sa boutique, absent de
  l'arrêté du 5 juillet 2024) avant toute diffusion hors prototype.
- **Contenu de l'annexe D de la norme** (durées de formation recommandées par symbole) : non
  reprises (norme payante).
- **Règle exacte de la validité de l'attestation médicale pour BS** (intervention hors
  voisinage) : le texte de R. 4544-10 vise le voisinage de pièces nues sous tension ; la
  station ne conclut pas pour BS.
- **Périodicité réglementaire** : il n'y en a pas de fixée par le Code pour le recyclage ;
  la station ne donne que la recommandation INRS / norme (3 ans).
- **Sanctions pénales chiffrées** en cas d'absence d'habilitation : non trouvées, non données.
- Date de mise à jour de la page INRS affichée « 20/05/2022 » alors que son contenu décrit le
  régime d'octobre 2025 : à revérifier sur la brochure ED 6127 à jour.

## Relecture du 1er octobre 2026

Corrections synchronisées avec mission.json et le carnet. Sources de contrôle : https://www.inrs.fr/risques/electriques/habilitation-electrique-foire-aux-questions.html
La relecture générale et les réserves non traitées restent distinctes de ces corrections ciblées.

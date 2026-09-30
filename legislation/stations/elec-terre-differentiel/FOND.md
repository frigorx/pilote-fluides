# Station « Terre & différentiel » — FOND

> Réseau Législation · sous-ligne Électrique · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Accent : **#a16207**.
> **Statut : station construite le 30/09/2026, PROTOTYPE NON RELU** (`data-prototype` posé).
> Gabarit : `stations/aptitude-capacite/` ; `app.js` copie littérale, `styles.css` copie avec
> l'accent de la sous-ligne (`--sous-ligne:#a16207`, fond `#f4eadb`).

## Ce qui fait l'intérêt de cette station

Deux idées que les débutants confondent : (1) une carcasse sous tension par défaut d'isolement ne se
voit pas et n'est dangereuse que **si quelqu'un ferme la boucle** ; (2) le différentiel ne « voit » pas la
tension, il compare **l'aller et le retour**. Le piège pédagogique central : sans conducteur de protection,
il n'y a pas de boucle — la carcasse reste sous tension et le dispositif ne détecte rien tant que
personne ne la touche. On lie donc chaque maillon (carcasse, conducteur de protection, prise de terre,
différentiel) à un geste de vérification de mise en service.

## Objectif

À la fin de la station, l'étudiant distingue contact direct et indirect, explique ce que devient une
carcasse après un défaut d'isolement, suit le chemin du courant de défaut (schéma TT) jusqu'à la terre,
dit ce que compare un dispositif différentiel, situe la haute sensibilité (≤ 30 mA) et ses cas
d'obligation, sait que le bouton test se constate et ne se présume pas, et liste les vérifications de mise
en service.

## Référentiel

**TP TECVC, REAC TP-00133 — CP9 et CP6.** CP9 (installation de climatisation : le groupe froid) et CP6
(chauffage / ECS : la pompe à chaleur). Justification : le technicien d'études qui prescrit une pompe à
chaleur ou un groupe froid prescrit aussi son alimentation et la protection des personnes qui la touchent.
Le rattachement est **indirect** (le REAC TP-00133 est un titre d'études CVC, pas d'électricité) : il est
volontairement limité à deux CP, sans inventer de sous-critère. Pas de codes d'attestation d'aptitude
2025 : la station n'est pas fluidique.

## Écran 1 — Deux façons d'être touché : direct et indirect

Contact direct = pièce nue sous tension ; contact indirect = pièce conductrice mise accidentellement sous
tension (armoire métallique dont l'équipement présente un défaut d'isolement). Code du travail R4215-3 :
aucune partie active dangereuse accessible ; en cas de défaut d'isolement, aucune masse ne présente de
différence de potentiel dangereuse.
*Visuel : `svg/contact-direct-indirect.svg` (fixe).*

## Écran 2 — Le défaut d'isolement : la carcasse devient dangereuse

Définition INRS de la masse (partie conductrice touchable, normalement hors tension, pouvant le devenir
si l'isolation principale est défaillante ; exemple : carcasse de moteur). Causes citées : échauffement
important, contraintes mécaniques. Aucun signe visible.
*Visuel : `svg/defaut-isolement.svg` (fixe).*

## Écran 3 — Le chemin du courant de défaut : une boucle par la terre

Boucle : phase → défaut → carcasse → conducteur de protection → prise de terre → sol → prise de terre de
la source (neutre à la terre, schéma TT). Sans conducteur de protection, pas de boucle. Décret 88-1056,
art. 31 : toute masse protégée par coupure automatique doit être reliée à un conducteur de protection.
Renvoi vers la station Régimes de neutre (les autres régimes bouclent autrement : non détaillé ici).
*Visuel : `svg/chemin-defaut.svg` — **animé** (point orange qui parcourt la boucle, 13 s, repos final).*

## Écran 4 — Le conducteur de protection et la prise de terre

Masses simultanément accessibles à la même prise de terre (décret 88-1056, art. 31) ; en TT, masses
protégées par un même dispositif interconnectées et reliées à une même prise de terre (art. 33) ; éléments
conducteurs étrangers reliés par un conducteur d'équipotentialité (INRS). Aucune valeur de résistance de terre
donnée (voir « À sourcer »).
*Visuel : `svg/masses-au-meme-potentiel.svg` (fixe).*

## Écran 5 — Le différentiel compare l'aller et le retour

DDR : somme des courants des conducteurs actifs ; si non nulle, comparaison à la sensibilité (OPPBTP).
Placement : origine de l'installation ou départs principaux et divisionnaires, en amont des appareils
(INRS). Interrupteur différentiel vs disjoncteur différentiel (INRS).
*Visuel : `svg/differentiel-compare.svg` — **animé** (points aller/retour, ouverture des contacts, 13 s,
repos = contacts ouverts sur la rangée « avec défaut »).*

## Écran 6 — La sensibilité : 30 mA pour protéger les personnes

Sensibilités courantes citées par l'INRS : 500, 300, 30 mA. Haute sensibilité ≤ 30 mA : obligatoire pour
prises ≤ 32 A, prises en locaux mouillés, installations temporaires, salles d'eau, logements ; recommandée
pour appareils à câble souple en conditions sévères. Relation prise de terre × sensibilité ≤ 50 V (INRS).
Tension dangereuse : 50 V alternatif / 120 V continu (INRS). NB : l'INRS énonce le produit résistance × sensibilité ≤ 50 V dans un exemple (« pour une maison ») ; la station le reprend comme relation générale de la protection par coupure automatique — à confirmer à la relecture. Le rapport d'échelle 500/30 ≈ 16,7 est
un calcul, pas une source.
*Visuel : `svg/sensibilite.svg` (fixe, barres à l'échelle).*

## Écran 7 — Le bouton test : on constate, on ne présume pas

Le bouton test simule un défaut ; le dispositif doit déclencher (l'OPPBTP recommande de vérifier
périodiquement en l'actionnant, sans fréquence). Si le levier ne tombe pas : dispositif en cause, à
remplacer — **conclusion de bon sens métier, à faire relire** (la notice du fabricant fait foi).
*Visuel : `svg/bouton-test.svg` — **animé** (le doigt arrive, le levier retombe, 13 s, repos = levier tombé).*

## Écran 8 — À la mise en service : ce que l'on vérifie

INRS ED 6345 §4.5.2 : les vérifications portent sur les dispositions vis-à-vis des contacts direct et
indirect et leur efficacité, notamment « le bon fonctionnement des dispositifs sensibles aux courants
différentiels résiduels, la continuité des conducteurs de protection, la valeur des prises de terre » et
l'identification des parties de l'installation. La vérification initiale doit être réalisée par un organisme
accrédité. Le technicien livre une installation contrôlée : il ne remplace pas cette vérification.
*Visuel : `svg/mise-en-service.svg` (fixe).*

## Les quatre questions (non devinables : rangs 3, 1, 4, 2)

1. **Contact ?** (écran 1) — Bonne : indirect, la masse est sous tension par accident. Leurres : direct
   « parce que le conducteur touche la tôle » ; direct « parce que le métal est conducteur » ; « une
   carcasse est toujours isolée ».
2. **Conducteur de protection sectionné + défaut sur carcasse** (écran 3) — Bonne : plus de boucle, la
   carcasse reste sous tension. Leurres : « s'écoule par le sol sans danger » ; « le différentiel coupe aussitôt
   sans que personne touche » ; « retombe à zéro volt ».
3. **Que compare un différentiel ?** (écran 5) — Bonne : courant qui part et courant qui revient. Leurres :
   tension phase/terre ; courant réel/calibre (confusion avec le disjoncteur) ; températures.
4. **Le levier ne bouge pas à l'appui sur T** (écran 7) — Bonne : dispositif défaillant, il ne protège plus.
   Leurres : installation saine ; passer à 300 mA ; recommencer à vide.

## Correspondances

- `../elec-nf-c-15-100/` · `../elec-regimes-de-neutre/` · `../elec-consigner/` (même sous-ligne)
- `../risques-epi/` (Risques professionnels)
- `https://inerweb.fr/electrorezo/` (réseau voisin : stations 4-5 interrupteur différentiel, 4-6 disjoncteur
  différentiel, 4-8 terre)

## Sources officielles (consultées le 30/09/2026)

1. **INRS, ED 6345 « L'électricité »**, 1re éd. novembre 2019 — §4.3.2 (protection contre les contacts
   indirects : mise à la terre des masses, coupure automatique, DDR, sensibilités, cas d'obligation de la haute
   sensibilité, 50 V / 120 V, produit résistance × sensibilité), §4.5.2 (vérifications).
   https://www.inrs.fr/dms/inrs/CataloguePapier/ED/TI-ED-6345/ed6345.pdf
2. **INRS, page « Risques électriques. Risques liés à l'électricité »** (définitions contact direct /
   indirect, défaut d'isolement, effets qualitatifs). https://www.inrs.fr/risques/electriques/risques-electricite.html
   et **« Prévention du risque électrique »** https://www.inrs.fr/risques/electriques/prevention-risque-electrique.html
3. **Code du travail, art. R4215-3** (version du 02/09/2010) — conception des installations : parties actives
   inaccessibles ; défaut d'isolement sans différence de potentiel dangereuse entre masses.
   https://code.travail.gouv.fr/code-du-travail/r4215-3
4. **Décret n° 88-1056 du 14 novembre 1988** (protection des travailleurs dans les établissements mettant en
   œuvre des courants électriques), art. 29, 31, 33 — masses reliées à un conducteur de protection, même
   prise de terre, schéma TT. https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000866441
   (statut « en vigueur » lu sur Légifrance le 30/09/2026 ; à confirmer article par article à la relecture).
5. **OPPBTP (Prévention BTP), « Les dispositifs différentiels résiduels »** (mise à jour 09/12/2025) —
   principe (somme des courants), bouton test, sensibilité ≤ 30 mA.
   https://www.preventionbtp.fr/ressources/solutions/les-dispositifs-differentiels-residuels_QSWawEG3hJpkHpiwq3tYuM

Normes payantes (NF C 15-100, NF EN 61008 / 61009) : non lues, non citées au-delà de leur existence.

## À sourcer (omis volontairement, jamais approximé)

- Valeur maximale de la résistance de la prise de terre (l'INRS ne donne que des exemples liés à
  d'anciennes situations — non repris) et son calcul pour un circuit donné.
- Temps de coupure maximaux et tensions limites conventionnelles par type de local (arrêté visé à
  l'art. 31-II du décret 88-1056).
- Courants physiologiques (seuils de perception, de tétanisation, de fibrillation) : la sensibilité de 30 mA
  est citée comme « haute sensibilité » par l'INRS, pas justifiée physiologiquement ici.
- Calibre et type du DDR (AC, A, F, B) d'un circuit de pompe à chaleur ou de groupe froid à variateur :
  notice du fabricant et NF C 15-100 (payante).
- Fréquence du test par le bouton test (l'OPPBTP ne la précise pas).
- Régimes TN et IT : la boucle de défaut y est différente — traité par la station Régimes de neutre.
- Périodicité des vérifications périodiques (l'ED 6345 renvoie à un arrêté du 26/12/2011 « sous conditions »).
- Conduite à tenir exacte si le bouton test ne déclenche pas (remplacement, remise du matériel) : conclusion
  logique, à confirmer avec la notice du fabricant.
- Application de l'obligation 30 mA aux circuits de la pompe à chaleur elle-même (l'INRS liste des cas de prises
  et de locaux, pas des machines).

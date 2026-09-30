# Station « Les garanties » — FOND

> Réseau Législation · sous-ligne Certifications & normes (#3730a3) · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Slug : `certif-garanties`.
> Sous-titre du plan : « décennale, biennale ».
> **Statut : produite le 30/09/2026, `data-prototype` posé, en attente de relecture métier.**
> Doctrine tenue : aucune valeur (durée, délai, montant) n'est entrée sans être lue dans
> le texte officiel cité plus bas.

## Ce qui fait l'intérêt de cette station

Un technicien d'études ou un chargé d'affaires CVC n'est pas juriste, mais c'est lui qui
reçoit l'appel « votre pompe à chaleur ne chauffe pas — c'est la décennale, non ? ».
La station donne le **point de départ** (la réception), les **trois durées**, le **critère**
qui fait basculer un désordre dans la décennale, les **deux assurances**, et surtout une
**méthode de questions** — pas un verdict. Le cas de la pompe à chaleur est traité en
critères, jamais tranché.

## Objectif

À la fin de la station, l'étudiant sait dater le point de départ des garanties, distinguer
parfait achèvement, bon fonctionnement (biennale) et décennale, dire quel critère fait
basculer un désordre dans la décennale, situer les deux assurances, et poser les quatre
questions (quand, quel élément, quel effet, quelle cause) devant un désordre sur un
équipement.

## Référentiel

**TP TECVC, REAC TP-00133.** Le droit des garanties lui-même est **hors REAC** (culture
professionnelle du technicien et du chargé d'affaires). Compétences retenues pour le cas
de la pompe à chaleur : **CP5** (déperditions) et **CP6** (chauffage / ECS). Justification :
remonter à la cause d'un désordre (question 4) suppose de relire l'étude de déperditions
et le dimensionnement du générateur. Station non fluidique : pas de codes de l'attestation
2025.

## Écran 1 — La réception : le point de départ de tout

Art. 1792-6 : « La réception est l'acte par lequel le maître de l'ouvrage déclare accepter
l'ouvrage avec ou sans réserves. Elle intervient à la demande de la partie la plus
diligente, soit à l'amiable, soit à défaut judiciairement. Elle est, en tout état de cause,
prononcée contradictoirement. » Toutes les durées se comptent à partir de la réception. La
date du procès-verbal est une donnée de l'affaire. À ne pas confondre avec la mise en
service d'un équipement sous pression (station DESP « En service »).

*Visuel : `svg/reception-depart.svg` (fixe) — client, entrepreneur, procès-verbal, deux cartes
sans / avec réserves.*

## Écran 2 — Trois garanties sur une même frise

Parfait achèvement : un an à compter de la réception (1792-6). Bon fonctionnement : durée
minimale de deux ans à compter de la réception (1792-3). Décennale : décharge après dix ans
à compter de la réception (1792-4-1). La frise ne dit pas quel désordre relève de laquelle.

*Visuel : `svg/frise-garanties.svg` (**animé**) — les trois barres grandissent l'une après
l'autre, à la même échelle.*

## Écran 3 — Parfait achèvement : réparer tout ce qui est signalé

1792-6 : un an ; tous les désordres signalés par le maître de l'ouvrage, par réserves au
procès-verbal ou par notification écrite pour ceux révélés après la réception ; délais
d'un commun accord ; à défaut ou en cas d'inexécution, après mise en demeure infructueuse,
travaux aux frais et risques de l'entrepreneur ; exécution constatée d'un commun accord
ou judiciairement ; usure normale ou usage exclus.

*Visuel : `svg/parfait-achevement.svg` (**animé**) — procédure, blocs allumés dans l'ordre.*

## Écran 4 — Décennale : les deux critères et la seule sortie

1792 : responsabilité de plein droit du constructeur pour les dommages (même résultant d'un
vice du sol) qui compromettent la solidité de l'ouvrage ou qui, en affectant un élément
constitutif ou d'équipement, le rendent impropre à sa destination ; pas de responsabilité
si le constructeur prouve une cause étrangère. 1792-2 parle de « présomption de
responsabilité ». 1792-1 : qui est constructeur. 1792-5 : clause d'exclusion ou de limitation
réputée non écrite.

*Visuel : `svg/decennale-criteres.svg` (fixe) — deux cartes-critères, bloc décennale,
exonération, définition du constructeur.*

## Écran 5 — Bon fonctionnement : le test de la dépose

1792-2 : élément d'équipement indissociable = sa dépose, son démontage ou son remplacement
ne peut s'effectuer sans détérioration ou enlèvement de matière de l'ouvrage de viabilité,
fondation, ossature, clos ou couvert ; la présomption s'étend à la solidité de cet élément.
1792-3 : les autres éléments d'équipement font l'objet d'une garantie de bon fonctionnement
de durée minimale de deux ans. 1792-7 : exclusion des éléments dont la fonction exclusive
est l'exercice d'une activité professionnelle. 1792-4 : fabricant solidairement responsable
si mise en œuvre sans modification et conformément aux règles du fabricant. Nuance
importante (voir écran 7) : l'article 1792 vise aussi les éléments d'équipement pour
l'impropriété à la destination.

*Visuel : `svg/equipement-dissociable.svg` (**animé**) — la dépose des deux appareils : mur
intact / bloc arraché.*

## Écran 6 — Deux assurances, deux souscripteurs

L. 241-1 : la personne dont la responsabilité décennale peut être engagée doit être couverte ;
justification à l'ouverture de tout chantier ; maintien de la garantie pour la durée de la
responsabilité décennale. L. 243-2 : attestation d'assurance jointe aux devis et factures.
L. 242-1 : dommages-ouvrage souscrite avant l'ouverture du chantier par le propriétaire,
vendeur ou mandataire ; garantit le paiement des réparations en dehors de toute recherche
des responsabilités ; prend effet après le délai de parfait achèvement (sauf les cas prévus) ;
soixante jours pour notifier la décision, quatre-vingt-dix jours pour l'offre d'indemnité.
L. 243-3 : six mois d'emprisonnement et 75 000 € d'amende, ou l'une des deux peines.
L. 243-1-1, II : ces obligations ne s'appliquent pas aux ouvrages existants avant l'ouverture
du chantier, sauf ceux totalement incorporés à l'ouvrage neuf qui en deviennent techniquement
indivisibles. L. 243-1-1, I : liste d'ouvrages exclus (non détaillée dans la station).

*Visuel : `svg/deux-assurances.svg` (fixe).*

## Écran 7 — Le cas d'école : une pompe à chaleur qui ne chauffe pas

Quatre questions : quand (réception, durée écoulée) ; quel élément (test de la dépose) ; quel
effet (l'ouvrage, dans son ensemble, impropre à sa destination ?) ; quelle cause (étude,
pose, matériel, usage ; cause étrangère ?). Jurisprudence : Cass. 3e civ., 15 juin 2017,
n° 16-19.640, publié au bulletin — les désordres affectant des éléments d'équipement,
dissociables ou non, d'origine ou installés sur existant, relèvent de la décennale lorsqu'ils
rendent l'ouvrage dans son ensemble impropre à sa destination ; pompe à chaleur air-eau ;
cassation faute d'avoir recherché l'impropriété du logement. **Pas de verdict** : la Cour ne
dit pas que toute pompe à chaleur défaillante relève de la décennale. Rôle du technicien :
réunir les pièces (PV de réception, étude, notice, attestation d'assurance) avant de se
prononcer auprès du client.

*Visuel : `svg/cas-pac.svg` (**animé**) — un cadre orange parcourt les quatre cartes ; l'image
fixe n'a pas de cadre.*

## Écran 8 — Bilan et le réflexe

Le réflexe : connaître la date de réception de chaque chantier.

*Visuel : `svg/bilan-garanties.svg` (fixe).*

## Les 4 questions (quiz) et leurs corrigés

1. *Que change la réception pour l'entrepreneur ?* — bonne réponse : « Elle ouvre les délais
   des garanties, réserves ou non » (rang 2). Leurres : elle éteint toutes les obligations ; elle
   n'a d'effet que sans réserve ; elle est prononcée par l'entrepreneur seul.
2. *Réception il y a quatorze mois, équipement dissociable en panne, ouvrage utilisable ?* —
   bonne réponse : bon fonctionnement, deux ans au minimum (rang 3). Leurres : parfait
   achèvement « qui court encore » ; décennale « dix ans non écoulés » ; aucune garantie légale
   au-delà d'un an.
3. *Qui souscrit la dommages-ouvrage avant l'ouverture du chantier ?* — bonne réponse : le maître
   de l'ouvrage, ou son vendeur ou mandataire (rang 1). Leurres : l'entreprise CVC ; le bureau
   d'études ; personne (facultative).
4. *PAC qui ne chauffe pas : qu'est-ce qui rattache le désordre à la décennale ?* — bonne réponse :
   l'ouvrage devenu impropre à sa destination (rang 4). Leurres : la qualification RGE ; le coût
   élevé de la réparation ; l'apparition dès la première année.

## Correspondances

- `../certif-loi-norme-dtu/` (même sous-ligne) — qui oblige quoi.
- `../certif-rge-qualipac/` (même sous-ligne) — une qualification n'est pas une garantie.
- `../travail-s-installer/` (Droit du travail) — s'installer : justifier l'assurance décennale.
- `../desp-en-service/` (DESP) — le suivi propre de l'équipement sous pression après la réception.

## Sources officielles (consultées le 30/09/2026)

Textes lus dans la consolidation du Code civil (dernière mise à jour du fichier : 29/07/2026) et du
Code des assurances (20/08/2026), en libre diffusion (Légifrance / Etalab,
`https://codes.droit.org/payloads/Code%20civil.xml` et `.../Code%20des%20assurances.xml`), articles
tous « en vigueur » à la lecture. Liens Légifrance des articles :

- Code civil, art. 1792 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006443502
- art. 1792-1 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006443512
- art. 1792-2 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006443524
- art. 1792-3 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006443534
- art. 1792-4 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000039382249
- art. 1792-4-1 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019017055
- art. 1792-4-2 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019017048
- art. 1792-4-3 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019017132
- art. 1792-5 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006443652
- art. 1792-6 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006443552
- art. 1792-7 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006443562
- Code des assurances, L. 241-1 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031010281
- L. 241-2 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006795914
- L. 242-1 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019265425
- L. 243-1-1 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019265462
- L. 243-2 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031010272
- L. 243-3 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006796023
- Cour de cassation, 3e chambre civile, 15 juin 2017, n° 16-19.640, publié au bulletin :
  https://www.legifrance.gouv.fr/juri/id/JURITEXT000034959616/ — lu le 30/09/2026 par
  extraction automatique de la page (le passage cité est un rappel de principe, non une citation
  mot pour mot) ; à relire in extenso.

## À sourcer (omis ou volontairement non tranché)

- **Réception tacite** et réception judiciaire en pratique : la définition de l'art. 1792-6 est
  citée, mais les conditions de la réception tacite relèvent de la jurisprudence — non lue, non
  écrite dans la station.
- **Retenue de garantie**, garantie de livraison, CCAG Travaux des marchés publics : hors texte lu.
- **Jurisprudence récente** sur l'application de la décennale aux éléments d'équipement installés sur
  existant, et sur l'articulation avec L. 243-1-1, II (assurance non obligatoire en rénovation)
  — à compléter après lecture d'arrêts postérieurs à 2017.
- **Contenu minimal de l'attestation d'assurance** (modèle fixé par arrêté, cité en L. 243-2) : non lu.
- **Clauses-types des contrats d'assurance** (annexes de la partie réglementaire) et étendue réelle
  d'une garantie pour une activité déclarée (pompe à chaleur en rénovation) : à lire dans le
  contrat de l'assureur, pas dans la station.
- **Contrôle technique obligatoire** (Code de la construction et de l'habitation) : non traité.
- **Assurances des locateurs d'ouvrage hors L. 241-1** (responsabilité civile professionnelle, garanties
  facultatives) : non traitées.
- Aucun montant d'aide ni seuil de prime d'assurance : aucun.

## Défauts connus

- Les narrations n'ont pas encore leur MP3 (chaîne edge-tts) : la voix du navigateur sert de filet.
- Relecture métier (juriste ou responsable d'affaires) à faire : `data-prototype` posé.

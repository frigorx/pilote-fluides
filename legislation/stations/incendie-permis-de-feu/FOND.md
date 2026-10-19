# Station « Le permis de feu » — FOND à valider

> Réseau Législation · sous-ligne Incendie (#b91c1c) · slug `incendie-permis-de-feu`.
> Mini-station ≤ 10 min de cours + le simulateur : 8 écrans + 4 questions. **Public : CAP IFCA et Bac Pro MFER** (le réseau est né au niveau BTS : texte plus simple, phrases courtes).
> **Statut : Prototype, fabriquée le 19/10/2026, EN ATTENTE de la relecture et du feu vert de F. Henninot** (`data-prototype` posé).
> Demande de Franck (19/10/2026) : « Permis de feu : un simulateur de remplissage. » (formulaire interactif à compléter pour une brasure en chambre froide, contrôle des champs, mot d'explication à chaque erreur).
> Ligne maison : les mécanismes s'apprennent ; toute valeur non lue dans un texte officiel est omise et listée sous « À sourcer ». **Les chiffres de la station (30 %, 10 m, 9 litres, 2 heures, 5 ans, 1 000-2 000 °C, 18 / 112) viennent tous de l'INRS ED 6030, du modèle du CDG 45 ou de service-public.gouv.fr (voir sources).**

## Objectif

À la fin de la station, l'élève sait pourquoi on remplit un permis de feu avant de braser, qui le délivre, qui le signe, ce qu'il contient (zone, durée, risques, mesures avant, pendant, après, surveillance après travaux), et il a rempli lui-même un permis pour un brasage en chambre froide.

## Référentiel (codes affichés sous l'objectif et dans `mission.json`)

Libellés exacts repris de `HAL-v3/donnees/referentiels/peda/`.

- **CAP IFCA** : savoir **S1.2** « Pièces et autorisations administratives » · compétence **C2.3** « Préparer les conditions d'intervention sur site ».
- **Bac Pro MFER (2028)** : savoir **S1.4** « les procédures administratives ».
- **Origine du réseau** : TP TECVC, REAC TP-00133 — hors REAC. **Attestation d'aptitude 2025** : **10.01** (soudage, brasage fort et brasage tendre des joints étanches).

## Déroulé des 8 écrans (8 SVG, dont 5 animés en SMIL)

1. **Pourquoi un permis de feu ?** — `svg/triangle-du-feu.svg`
2. **Quels travaux, et par où le feu passe-t-il ?** — `svg/quatre-chemins.svg`
3. **Qui délivre le permis, qui le signe ?** — `svg/acteurs-du-permis.svg`
4. **Ce que contient un permis de feu** — `svg/feuille-du-permis.svg`
5. **Les mesures : avant, pendant, après** — `svg/avant-pendant-apres.svg`
6. **Le cas du jour : un brasage en chambre froide** — `svg/local-technique.svg`
7. **Simulateur : remplissez le permis** — `svg/permis-a-remplir.svg`
8. **Bilan : la vie d’un permis de feu** — `svg/bilan-permis.svg`

Animés : 1 (triangle du feu), 2 (quatre chemins : points qui suivent chaque chemin), 3 (acteurs : coches), 5 (avant / pendant / après : barre des 2 heures), 7 (permis à remplir : cases cochées). Fixes : 4, 6, 8 (le moteur du réseau les anime au passage).

## Les 4 questions et corrigés

**Q1 (écran 2).** Lequel de ces travaux est un « travail par point chaud » ?
- a) Relever les pressions avec le manifold
- b) Coller l'isolant sur un tube
- c) Braser un raccord sur une ligne de cuivre ✔
- d) Serrer un raccord avec deux clés
*Explication : Le brasage chauffe le métal à la flamme : c'est un travail par point chaud, il demande un permis de feu. Relever des pressions, coller ou serrer ne produisent ni étincelles ni surfaces très chaudes.*

**Q2 (écran 3).** Côté entreprise intervenante, qui valide le permis de feu avec les acteurs de l'entreprise utilisatrice ?
- a) Le technicien qui brase, seul
- b) Le responsable d'intervention ✔
- c) Le fabricant du chalumeau
- d) Le pompier de la caserne la plus proche
*Explication : Le permis est validé par les acteurs de l'entreprise utilisatrice et par le responsable d'intervention de l'entreprise intervenante (INRS). Le technicien qui brase signe aussi, mais il ne valide pas seul.*

**Q3 (écran 5).** Les travaux sont finis. Pendant combien de temps faut-il surveiller le lieu, au moins ?
- a) Une heure
- b) Une demi-heure
- c) Dix minutes
- d) Deux heures ✔
*Explication : Après la fin des travaux, la surveillance dure 2 heures au moins (INRS, CDG 45). Si ce n'est pas possible, on arrête les travaux 2 heures au moins avant la fermeture de l'entreprise.*

**Q4 (écran 4).** À mi-chantier, un autre technicien prend le chalumeau à votre place. Que devient le permis de feu ?
- a) Il faut le revoir : les intervenants ont changé ✔
- b) Il reste valable jusqu’à la fin de la journée, sans rien changer
- c) Il suffit de prévenir le gérant du restaurant à voix haute
- d) Il reste valable cinq ans, comme un diplôme
*Explication : Un permis doit être revu dès qu'un élément change : lieu, environnement, procédé, nature des travaux, intervenants (INRS). Un autre technicien qui prend le chalumeau est un changement d'intervenant : on revoit le permis avant de continuer. Le modèle du CDG 45 cite le changement de la personne qui brase, du lieu et de la méthode.*

Bonnes réponses en positions 3, 2, 4, 1 ; aucune n'est la plus longue de façon systématique.

## Le simulateur (écran 7) — mêmes données que `simulateur.js` et que le formulaire

Situation inventée : restaurant ; local technique de la chambre froide, derrière la cuisine (cuisine en service) ; mardi de 8 h à 11 h ; entreprise utilisatrice : le restaurant (gérant = employeur) ; entreprise intervenante : Clim'Études Sud (chef d'équipe = responsable d'intervention ; technicien qui brase = l'élève) ; Marc, cuisinier formé à l'extincteur, peut surveiller ; brasage fort d'un raccord (changement de filtre déshydrateur) ; circuit déjà vidé de son fluide ; cartons à 3 m ; détecteur de fumée au plafond.

Règles de contrôle : chaque bloc est « Juste » seulement si toutes les cases attendues sont cochées et aucune case fausse ne l'est (ou, pour les listes déroulantes, si le choix attendu est fait). Les champs vides sont signalés « À remplir ». Chaque erreur reçoit un message ; les éléments déjà justes sont rappelés. Aucun score : un bilan qualitatif (« il reste N blocs à revoir » / « les sept blocs sont exacts »). « Recommencer » remet tout à zéro. Aucun envoi, aucune mémoire.

### Bloc 1 — Qui signe le permis ?

| Case | Attendue ? | Message |
|---|---|---|
| Le gérant du restaurant (l'employeur, côté entreprise utilisatrice) | **oui** | Le gérant est l'employeur de l'entreprise qui accueille les travaux : c'est lui, ou son représentant, qui établit le permis. |
| Le chef d'équipe de Clim'Études Sud (responsable d'intervention) | **oui** | Le responsable d'intervention de votre entreprise valide le permis avec ceux de l'entreprise utilisatrice. |
| Vous, le technicien qui brase : vous connaissez les mesures et vous vous engagez à les respecter | **oui** | Vous devez connaître les risques et les mesures avant de commencer. Sur le modèle du Centre de gestion du Loiret, le technicien qui brase signe aussi. |
| Un client du restaurant | non | Un client n'a aucun rôle dans ces travaux : il ne signe pas. |
| Le pompier de la caserne la plus proche | non | Les pompiers ne signent pas le permis. Leur numéro sert à l'alerte (bloc 7). |

Bloc juste : « Trois signatures : l'employeur, le responsable d'intervention, le technicien qui brase. »

### Bloc 2 — Où et quand ?

| Champ | Réponse attendue | Message si faux |
|---|---|---|
| Lieu d'exécution | Le local technique de la chambre froide, derrière la cuisine | « Toute la cuisine » : « Toute la cuisine » est trop large. Le permis nomme le lieu exact des travaux, pour y régler les mesures. / « Le toit du restaurant » : Ce n'est pas là que vous travaillez. Relisez la situation. / « L'atelier de Clim'Études Sud » : L'atelier de votre entreprise n'est pas le lieu des travaux : le permis vaut pour le site du client. |
| Les travaux commencent à | 8 h 00 | « 7 h 00 » : Les travaux commencent à 8 h : relisez la situation. Le permis donne l’heure de début. / « 9 h 00 » : Les travaux commencent à 8 h : relisez la situation. Le permis donne l’heure de début. / « 10 h 00 » : Les travaux commencent à 8 h : relisez la situation. Le permis donne l’heure de début. |
| Les travaux finissent à | 11 h 00 | « 10 h 00 » : Les travaux finissent à 11 h. La surveillance après travaux se note ailleurs (bloc 6). / « 12 h 00 » : Les travaux finissent à 11 h. La surveillance après travaux se note ailleurs (bloc 6). / « 13 h 00 » : Les travaux finissent à 11 h. La surveillance après travaux se note ailleurs (bloc 6). |

Bloc juste : « Lieu, début et fin sont justes. Un permis a une durée limitée, écrite dessus. »

### Bloc 3 — Quels travaux par points chauds ?

| Case | Attendue ? | Message |
|---|---|---|
| Chalumeau (brasage fort) | **oui** | Le brasage fort se fait au chalumeau : c’est le travail par point chaud de ce chantier. |
| Meulage ou tronçonnage | non | Le meulage n’est pas prévu. S’il le devient, il faudra revoir le permis. |
| Soudage à l'arc électrique | non | Le soudage à l'arc n'est pas prévu : ici, on brase au chalumeau. |
| Découpage | non | Aucun découpage n’est prévu. Le permis décrit les travaux prévus, pas tous ceux qui seraient possibles. |

Bloc juste : « Un seul point chaud : le chalumeau. »

### Bloc 4 — Quels risques sur place ?

| Case | Attendue ? | Message |
|---|---|---|
| Stockage et proximité de matériaux combustibles | **oui** | Les cartons à 3 m sont des matériaux combustibles : c’est le risque principal. |
| Activité du voisinage immédiat | **oui** | La cuisine reste en service : des personnes travaillent à côté. |
| Stockage de produits inflammables | non | Rien dans la situation n'annonce de produits inflammables. On ne coche que les risques réels du lieu. |
| Zone ATEX à proximité (atmosphère explosive) | non | ATEX veut dire atmosphère explosive. Il n'y en a pas ici : un risque coché à tort fait perdre de vue les vrais risques. |

Bloc juste : « Deux risques : les cartons à côté, la cuisine en service. »

### Bloc 5 — Quelles mesures avant de braser ?

| Case | Attendue ? | Message |
|---|---|---|
| Éloigner les cartons à plus de 10 m, ou les couvrir de bâches ignifugées s’ils ne peuvent pas être déplacés | **oui** | On éloigne les matières combustibles à 10 m au moins ; ce qui reste est protégé par des bâches ignifugées (INRS). |
| Placer à portée de main un extincteur à eau de 9 litres et un extincteur adapté au local | **oui** | Au minimum un extincteur à eau de 9 litres et un adapté aux risques du local, à proximité immédiate (INRS). |
| Éviter le déclenchement du détecteur de fumée sur la zone de travail, et vérifier à la fin qu’il fonctionne de nouveau | **oui** | On évite le déclenchement intempestif en limitant à la zone concernée, et on vérifie à la fin que la détection fonctionne de nouveau. |
| Placer les bouteilles de gaz le plus loin possible de la zone de brasage | **oui** | Les bouteilles sont placées le plus loin possible de la zone de soudure (INRS). |
| Poser les bouteilles contre le mur, à côté du raccord, pour avoir des flexibles courts | non | Une bouteille de gaz près de la flamme peut chauffer et exploser. On place les bouteilles le plus loin possible. |
| Laisser les cartons où ils sont : ils sont à plus d’un mètre | non | Trois mètres, c’est trop près : les étincelles vont jusqu’à plusieurs mètres. On éloigne à 10 m au moins, ou on protège. |
| Laisser l’extincteur dans le camion pour qu’il ne gêne pas | non | Un extincteur dans le camion est trop loin : il doit être à portée immédiate. |

Bloc juste : « Quatre mesures : cartons, extincteurs, détecteur, bouteilles. »

### Bloc 6 — Qui surveille, et jusqu’à quand ?

| Champ | Réponse attendue | Message si faux |
|---|---|---|
| Surveillant pendant les travaux | Marc, le cuisinier formé à l'extincteur, qui ne fait que surveiller | « Vous-même, en même temps que vous brasez » : Le technicien qui brase est absorbé par son travail, et ses lunettes réduisent son champ de vision : il ne peut pas surveiller (INRS). / « Personne : le local est petit » : Il n'y a pas de petits travaux : un surveillant est indispensable (INRS). / « Un client du restaurant, volontaire » : Le surveillant doit être formé à la première intervention contre l'incendie et avoir ses moyens : ce n'est pas un client. |
| Surveillance après la fin des travaux, jusqu’à | 13 h 00 | « 11 h 00 (dès la fin des travaux) » : On surveille 2 heures au moins après la fin des travaux : 11 h + 2 h = 13 h. Un feu peut couver et se déclarer plus tard (INRS). / « 11 h 30 » : On surveille 2 heures au moins après la fin des travaux : 11 h + 2 h = 13 h. Un feu peut couver et se déclarer plus tard (INRS). / « 12 h 00 » : On surveille 2 heures au moins après la fin des travaux : 11 h + 2 h = 13 h. Un feu peut couver et se déclarer plus tard (INRS). |

Bloc juste : « Un surveillant dont c’est la seule tâche, et deux heures de surveillance après les travaux. »

### Bloc 7 — Comment alerter ?

| Champ | Réponse attendue | Message si faux |
|---|---|---|
| Numéro des sapeurs-pompiers à écrire sur le permis | `18` ou `112` | Les sapeurs-pompiers : le 18, ou le 112 (numéro d’urgence européen). |
| Moyen d'alerte | Un téléphone chargé sur place, et le numéro écrit sur le permis | « Aucun : l’extincteur suffit » : L'extincteur ne remplace pas l'alerte : un moyen d'alerte doit être prévu avant de commencer. / « Le téléphone d’un client, s’il y en a un » : On ne compte pas sur un client : le moyen d'alerte est prévu à l'avance et inscrit sur le permis. |

Bloc juste : « Le 18 ou le 112, et un téléphone prévu à l’avance. »


Tests réalisés (Chrome piloté, voir `PREUVE-incendie-permis-de-feu-P2-mesure.md`) : formulaire à vide, bonnes réponses, numéro 112 accepté et 17 refusé, erreurs typiques, « Recommencer », 375 px sans débordement.

## Correspondances (liens réels)

`../risques-papiers-chantier/` et `../acteurs-installation/` (stations sœurs du même lot) · `../risques-duerp/` · `../tracabilite-fluides/` · `../aptitude-capacite/` · `../incendie-ssi/` · CuivRézo `https://inerweb.fr/cuivrezo/stations/3-2/` et `/2-1/` · JouéRézo `https://inerweb.fr/jouerezo/`.

## Ce qui vient du fonds de Franck (restructuré, rien recopié)

RAG de HAL (`chercher-rag.js`, 19/10/2026) : `Modele_Permis_Feu_Nov2020.pdf` (03_BAC-MFER/S1-Analyse), `PERMIS FEUX INTREACTIF.pdf` (02_CAP-IFCA/C3-Realiser : formulaire INRS), `ed6030INRS PERMIS DE FEUX.pdf` (05_Ressources-Partagees/Securite-Risques), `Synthèse prévention sur le chantier.odt` (le plan de prévention établit les autorisations, dont le permis de feu), `1-Fiche chalumeau.pdf` (CDG 50 = centre de gestion de la Manche, fiche de poste « Utilisation d'un chalumeau » : reprise pour une seule phrase, le risque d'explosion des bouteilles sous pression), stations CuivRézo 2-1 et 3-2 et livre HabFluide ch. 16 (brasage sous azote : renvoi seulement).

## Sources (consultées le 19/10/2026)

- **INRS, « Le permis de feu — démarche et document support », ED 6030, 2^e édition, juin 2018** (Ph. Lesné, G. Mauguen, F. Marc, B. Sallé ; texte intégral lu dans le fonds) : plus de 30 % des incendies ont pour origine des travaux par points chauds ; « il n'y a pas de petits travaux » ; près de 70 % des entreprises ayant subi un incendie grave ne reprennent pas leur activité dans l'année ; triangle du feu ; travaux concernés (découpage, meulage, ébarbage, soudures…, machines portatives tournantes aussi) ; pas de permis sur un poste permanent ; quatre modes de propagation (étincelles et particules de 1 000 à 2 000 °C projetées à plusieurs mètres, conduction, gaz chauds, contact ou rayonnement) ; permis obligatoire pour tous travaux par points chauds, établi par l'employeur ou son représentant, validé par les acteurs de l'entreprise utilisatrice et par le responsable d'intervention, une copie pour chaque signataire ; validité limitée, ré-évaluation dès qu'un élément change, vérification quotidienne si plusieurs jours, validation à chaque changement de poste ; archivage conseillé de 5 ans ; tableaux avant / réalisation / après : éloigner les combustibles à 10 m au moins, bâches ignifugées, colmatage, extincteurs (au minimum 1 à eau de 9 litres et 1 adapté aux risques du local), détection : éviter le déclenchement et, si mise hors service, mesures équivalentes en accord avec l'assureur, surveillant de sécurité formé à la première intervention, bouteilles de gaz le plus loin possible, surveillance de 2 h au moins après l'arrêt (sinon arrêter les travaux 2 h au moins avant la fermeture), inertage « attention au risque d'anoxie ». Éditeur : https://www.inrs.fr (réf. ED 6030).
- **CDG 45 (Centre de gestion de la fonction publique territoriale du Loiret), « Modèle de permis de feu », mise à jour novembre 2020** (document du fonds : `03_BAC-MFER/S1-Analyse/Modele_Permis_Feu_Nov2020.pdf`). Le document précise : « Le CDG45 autorise la réutilisation de ses informations et documents dans les libertés et les conditions prévues par la licence ouverte sous réserve d'apposer la mention : Source CDG45, titre et lien du document ou de l'information et date de sa dernière mise à jour. » La mention est apposée dans la station (écran 7 et commentaire de la page) ; **le lien exact du document n'a pas été retrouvé** (voir « À sourcer »). Éléments repris : structure en blocs (intervenants, opérations, risques et précautions, en cas d'accident, mesures avant / pendant / après), liste des types de travaux et des risques de l'environnement, signature de l'opérateur (au sens du modèle : la personne qui brase), surveillance de 2 h au moins, renouvellement à chaque changement d'opérateur, de lieu ou de méthode, évitement du déclenchement intempestif de la détection. Rien n'est recopié mot à mot.
- **service-public.gouv.fr**, fiche « Quels sont les numéros d'urgence (Samu, pompiers…) ? » (F33954) : 18 pour les sapeurs-pompiers, 112 numéro d'urgence européen (écrits aux écrans 4 et 5, avant le simulateur) — https://www.service-public.gouv.fr/particuliers/vosdroits/F33954
- Liens vers les stations CuivRézo 2-1 et 3-2 : résultats du RAG (stations en ligne).

## À sourcer (rien de ceci n'est affirmé comme texte officiel dans la station)

1. **Base juridique exacte de l'obligation** du permis de feu : l'INRS écrit « obligatoire » ; l'article du Code du travail n'a pas été lu. La station cite l'INRS, jamais un article. (Une recherche rapide signale un ancien article R. 237-8 sur la coordination des travaux dangereux : non lu, non cité.)
2. **Durée de validité** : la station dit « limitée et écrite dessus » ; aucune durée chiffrée (le modèle CDG 45 et l'INRS n'en donnent pas de maximale lue ici).
3. **Lien du modèle CDG 45** : à retrouver sur le site du centre de gestion pour compléter la mention de source exigée par la licence ouverte.
4. **Qui signe** : l'INRS décrit quatre acteurs validant (trois côté entreprise utilisatrice, le responsable d'intervention) ; le modèle CDG 45 fait signer aussi l'opérateur (la personne qui brase) et l'agent veillant à la sécurité. La station retient les deux : validation par les trois acteurs de l'entreprise utilisatrice et le responsable d'intervention, signature aussi du technicien qui brase ; **trois signatures dans le cas du restaurant** (gérant = les trois rôles de l'entreprise utilisatrice, chef d'équipe, technicien), le même nombre que dans la station « Les papiers du chantier ».
5. **Extincteurs** : l'INRS demande au minimum un extincteur à eau de 9 litres et un adapté aux risques du local ; le modèle CDG 45 cite un extincteur CO₂ de 2 kg et un à eau pulvérisée de 9 litres. Le simulateur suit l'INRS ; la consigne exacte dépend de l'assureur et du site.
6. **Particularités du frigoriste** : récupération du fluide avant de braser, balayage à l'azote : repris du cours de Franck (HabFluide ch. 16, CuivRézo 3-2), pas d'un texte réglementaire. La **décomposition thermique des fluides** au contact de la flamme n'est pas évoquée (non sourcée). **La nature de l'isolant des panneaux de chambre froide** et sa réaction au feu ne sont pas traitées (à sourcer).
7. **Plan de prévention, PPSPS, autorisation de travail** : renvoi à la station « Les papiers du chantier » ; l'INRS indique que le permis s'intègre dans ces procédures.
8. **Statistiques INRS** (30 %, 70 %) : datées de 2018 (ED 6030) ; à actualiser si une édition plus récente existe.
9. **Situation et personnages** (restaurant, Marc, Clim'Études Sud) : inventés ; les mesures chiffrées du simulateur (3 m des cartons, 10 m d'éloignement) sont celles de l'INRS appliquées à un cas fictif.
10. **Vocabulaire** : l'INRS et le CDG 45 appellent « opérateur » la personne qui brase ; le Code de l'environnement (R. 543-76) et les stations « Qui intervient… », « Traçabilité » et « Les papiers du chantier » appellent « opérateur » l'entreprise attestée. La station écrit « le technicien qui brase » et dit le piège à l'écran 3.

## Défaut connu

- Pas de MP3 fabriqué : la voix du navigateur sert de filet (lot Piper à lancer après le feu vert).
- Le jeu associé (JouéRézo) n'existe pas encore : renvoi à l'accueil seulement.

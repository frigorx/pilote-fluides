# Station « Classer le bâti » — FOND

> Réseau Législation · sous-ligne Incendie (#b91c1c) · niveau BTS.
> Sous-titre : ERP · IGH · habitation.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Produite le 30/09/2026,
> **PROTOTYPE NON RELU** (`data-prototype` posé).
> Sources consultées le **30/09/2026**. Doctrine tenue : aucune valeur entrée
> sans source lue ; ce qui n'a pas pu être lu est sous « À sourcer ».

## Ce qui fait l'intérêt de cette station

Toute la réglementation incendie du bâtiment part d'une question que le
technicien d'études oublie de poser : **de quel bâtiment parle-t-on ?** Le
risque ne dépend pas seulement du feu, il dépend de **qui est dans le
bâtiment** (public, salariés, habitants), de **combien**, et de **la hauteur**
à laquelle il faut aller les chercher. Le classement dit quel texte s'applique ;
ce texte dit ce que le lot CVC doit faire (désenfumage, compartimentage,
matériaux, système de sécurité incendie).

## Objectif

À la fin de la station, l'étudiant sait dire pourquoi on classe, distinguer
ERP, IGH, habitation et lieu de travail, lire le type et la catégorie d'un ERP,
appliquer la définition de la hauteur d'un IGH, situer une habitation dans ses
familles, et expliquer ce que ce classement change pour un lot CVC ainsi que
la place de la notice de sécurité dans le dossier de permis.

## Référentiel

**TP TECVC, REAC TP-00133 — CP7 (ventilation tertiaire) et CP1 (plans
d'implantation).** CP7 : le désenfumage, le compartimentage et les
obligations qui pèsent sur la ventilation d'un bâtiment tertiaire dépendent de
son classement. CP1 : un plan d'implantation d'équipements ne se dessine pas
sans connaître les secteurs, compartiments et dégagements que le classement
impose. Stations non fluidiques : pas de code d'attestation d'aptitude 2025.

## Écran 1 — Pourquoi on classe : quatre questions, quatre régimes

Le classement repose sur la nature de l'exploitation, les dimensions des
locaux, le mode de construction, le nombre de personnes admissibles et leur
aptitude à se soustraire aux effets d'un incendie (CCH, art. R. 143-3). Quatre
questions, quatre régimes : des personnes extérieures y sont admises → ERP
(R. 143-2) ; plancher bas du dernier niveau très haut → IGH (R. 146-3) ; on y
habite → habitation (arrêté du 31 janvier 1986) ; seuls des salariés y
travaillent → Code du travail (R. 4216-* et R. 4227-*). Un même bâtiment peut
cumuler plusieurs cas : l'employeur se conforme à tous les textes applicables,
en retenant les solutions les plus contraignantes (INRS). Le Code du travail
précise lui-même qu'il ne fait pas obstacle aux dispositions plus
contraignantes prévues pour les ERP ou l'habitation (R. 4216-1, R. 4227-1) et
que son chapitre ne s'applique pas aux IGH.

*Visuel : `svg/arbre-classement.svg` (animé) — le bâtiment à gauche, quatre
questions, quatre régimes, bande « règle la plus contraignante ».*

## Écran 2 — ERP : le type, donné par l'activité

Un ERP est tout bâtiment, local ou enceinte où des personnes sont admises,
librement ou moyennant rétribution, ou où se tiennent des réunions ouvertes à
tout venant ou sur invitation (R. 143-2). Les établissements sont répartis en
**types selon la nature de leur exploitation** (R. 143-18 ; arrêté du
25 juin 1980, art. GN 1 à GN 3). Une lettre par activité, pour les
établissements installés dans un bâtiment : J structures d'accueil pour
personnes âgées ou handicapées ; L salles d'auditions, de conférences, de
réunions, de spectacles ou à usage multiple ; M magasins de vente, centres
commerciaux ; N restaurants et débits de boissons ; O hôtels et pensions de
famille ; P salles de danse et de jeux ; R enseignement, colonies de vacances ;
S bibliothèques, centres de documentation ; T salles d'exposition ;
U établissements sanitaires ; V culte ; **W administrations, banques,
bureaux** ; X établissements sportifs couverts ; Y musées. Établissements
spéciaux : PA plein air ; CTS chapiteaux, tentes et structures ; SG structures
gonflables ; PS parcs de stationnement couverts ; OA hôtels-restaurants
d'altitude ; GA gares ; EF établissements flottants ; REF refuges de montagne.

*Visuel : `svg/erp-types.svg` — 14 tuiles de types, W mise en avant, bande des
huit types spéciaux.*

## Écran 3 — ERP : la catégorie, donnée par l'effectif

Les établissements sont, quel que soit leur type, classés en catégories
d'après l'effectif du public et du personnel (R. 143-19) : 1re catégorie au-dessus
de 1 500 personnes ; 2e de 701 à 1 500 ; 3e de 301 à 700 ; 4e 300 et au-dessous ;
5e catégorie : établissements dont l'effectif du public reste inférieur au
minimum fixé par le règlement pour leur type (R. 143-14). Deux groupes : le
1er groupe (1re à 4e catégories) et le 2e groupe (5e catégorie). Dans le 1er
groupe, l'effectif compte public **et** personnel ; en 5e catégorie, seul le
public compte (arrêté du 25 juin 1980, art. GN 1 et suivants, tels que
rapportés par la préfecture de l'Orne et par la page de synthèse
service-public.fr). Le seuil de 5e catégorie **dépend du type** : aucune
valeur n'est donnée ici.

*Visuel : `svg/erp-categories.svg` (animé) — cinq colonnes qui grandissent de la
5e à la 1re, seuils au-dessus, groupes en bas.*

## Écran 4 — IGH : une seule mesure, la hauteur

« Constitue un immeuble de grande hauteur tout corps de bâtiment dont le
plancher bas du dernier niveau est situé, par rapport au niveau du sol le plus
haut utilisable pour les engins des services publics de secours et de lutte
contre l'incendie, à plus de 50 mètres pour les immeubles à usage d'habitation
et à plus de 28 mètres pour tous les autres immeubles » (CCH, R. 146-3). On
mesure jusqu'au **plancher bas du dernier niveau**, pas jusqu'au toit. Les IGH
sont classés par destination (R. 146-4) : GHA habitation, GHO hôtel, GHR
enseignement, GHS dépôt d'archives, GHTC tour de contrôle, GHU sanitaire, GHW
bureaux (GHW 1 et GHW 2), GHZ, et ITGH pour les immeubles de très grande
hauteur (au-delà de 200 m selon la page consultée : à reconfirmer sur le texte,
voir « À sourcer »). Un arrêté conjoint fixe le règlement de sécurité des IGH
(R. 146-5). Le Code du travail écarte lui-même les IGH de son chapitre
(R. 4216-1 et R. 4227-1) ; l'INRS rappelle que la réglementation incendie des
IGH s'impose à celle du Code du travail.

*Visuel : `svg/igh-hauteur.svg` (animé) — deux immeubles, deux seuils
(50 m habitation, 28 m autres), la cote qui monte jusqu'au plancher bas du
dernier niveau.*

## Écran 5 — Habitation : quatre familles, classées par la hauteur

Arrêté du 31 janvier 1986 relatif à la protection contre l'incendie des
bâtiments d'habitation, art. 3 (lu sur Légifrance) : **1re famille** :
habitations individuelles isolées ou jumelées à un étage sur rez-de-chaussée
au plus, et habitations individuelles de plain-pied groupées en bande ;
**2e famille** : habitations individuelles plus hautes (plus d'un étage sur
rez-de-chaussée), et habitations collectives d'au plus trois étages sur
rez-de-chaussée ; **3e famille** : plancher bas du logement le plus haut à
28 m au plus, avec une **3e famille A** (au plus sept étages sur
rez-de-chaussée et distance porte-escalier limitée dans les circulations
horizontales — portée de 7 à 10 m par l'arrêté du 19 juin 2015, JORF du
24 juin 2015, texte 31, NOR ETLL1508571A) et une **3e famille B** (les autres) ;
**4e famille** : plancher bas du niveau le plus haut à 50 m au plus. Au-delà :
IGH (R. 146-3). Version simplifiée : les cas particuliers des maisons groupées
en bande de la 2e famille ne sont pas détaillés.

*Visuel : `svg/habitation-familles.svg` — quatre silhouettes de hauteur
croissante, repères à 28 m et 50 m, IGH au-dessus.*

## Écran 6 — Les bureaux sans public : le Code du travail

Un plateau de bureaux où ne vient aucun public n'est pas un ERP : il relève du
Code du travail. Conception (maître d'ouvrage, R. 4216-1 à R. 4216-34) et
utilisation (employeur, R. 4227-1 à R. 4227-57). Lus verbatim sur
code.travail.gouv.fr.

**Statut daté (vérifié le 30/09/2026 sur Légifrance, JORFTEXT000052611335)** :
les articles R. 4216-1 à R. 4216-34 sont abrogés à compter du 1er janvier 2027
par l'article 2 du décret n° 2025-1100 du 19 novembre 2025 ; l'article 5, II,
précise que cette abrogation s'applique aux opérations de construction ou de
rénovation de bâtiments à usage professionnel dont la demande d'autorisation
d'urbanisme est déposée à compter du 1er janvier 2027, ou, sans autorisation
d'urbanisme, dont les travaux débutent à compter de cette date. La matière passe
au CCH, chapitre IV (R. 144-1 à R. 144-20, dont R. 144-8 pour le désenfumage).
Les R. 4227-* ne sont pas abrogés par ce décret. La station le dit à l'écran 6
(phrase datée) et à l'écran 1 (renvoi). Même formulation que la station
`incendie-desenfumage`.

- R. 4216-2 : les bâtiments sont conçus pour permettre l'évacuation rapide,
  l'accès et l'intervention des secours, la limitation de la propagation de
  l'incendie ;
- R. 4216-13 : « Les locaux de plus de 300 mètres carrés situés en
  rez-de-chaussée et en étage, les locaux de plus de 100 mètres carrés aveugles
  et ceux situés en sous-sol ainsi que tous les escaliers comportent un
  dispositif de désenfumage naturel ou mécanique » ;
- R. 4216-14 : désenfumage naturel = ouvertures en partie haute et basse,
  surface d'évacuation supérieure au centième de la superficie du local, minimum
  1 m² (idem pour les amenées d'air) ;
  *lecture des seuils de R. 4216-13* : « ceux situés en sous-sol » est lu, comme
  dans l'INRS (ED 6061 : « les locaux en sous-sol de plus de 100 m² ») et par
  l'OPPBTP, avec le seuil de 100 m² ; la station écrit donc « locaux aveugles ou
  en sous-sol de plus de 100 m² » (alignement du 30/09/2026 avec la station
  désenfumage) ;
- R. 4216-15 : désenfumage mécanique, débit d'extraction calculé sur la base
  d'un mètre cube par seconde par 100 mètres carrés ;
- R. 4216-24 : plancher bas du dernier niveau à plus de 8 m du sol extérieur →
  structure stable au feu de degré une heure et planchers coupe-feu de même degré ;
- R. 4216-27 : recoupements ou compartimentages ; réaction au feu des
  revêtements ;
- R. 4227-29 : au moins un extincteur portatif à eau pulvérisée de 6 litres
  minimum pour 200 m² de plancher, au moins un appareil par niveau ;
- R. 4227-34 : alarme sonore au-delà de cinquante personnes occupées ou réunies
  habituellement.

*Visuel : `svg/bureaux-code-travail.svg` — quatre cartes seuil → conséquence.*

## Écran 7 — Ce que le classement change pour le lot CVC

Le classement ne dit pas quoi installer : il dit **quel texte lire** ; ce texte
impose quatre familles de conséquences au lot CVC. (1) **Désenfumage** :
obligation, naturel ou mécanique (station `incendie-desenfumage`) ; la notice
préfectorale fait renseigner circulations, escaliers, locaux techniques et
réserves, salles et sous-sols (articles DF et instructions techniques 246 et
247). (2) **Compartimentage** : une gaine qui traverse une paroi ne doit pas
défaire le compartiment (R. 4216-27 pour les lieux de travail ; secteurs et
compartiments dans la notice ERP) ; station voisine sur les clapets coupe-feu.
(3) **Matériaux** : comportement au feu des matériaux et éléments de
construction (R. 4216-28 renvoie à D. 141-1 et suivants du CCH) ; station
`incendie-euroclasses`. (4) **Système de sécurité incendie** (SSI, norme
NF S 61-931, catégories A à E dans la notice) et mise en sécurité de
l'établissement ; station `incendie-ssi`. La notice cite en outre les articles
CH et GZ pour le chauffage et la ventilation d'air.

*Visuel : `svg/impact-cvc.svg` (animé) — le classement au centre, quatre
conséquences qui apparaissent.*

## Écran 8 — La notice de sécurité, et le réflexe

Toute construction, aménagement ou modification d'un ERP suppose une demande
d'autorisation (déclaration préalable ou permis de construire, plus le dossier
spécifique ERP, cerfa 13824) instruite avec l'avis d'une commission de sécurité
(service-public.gouv.fr). Le dossier de conformité comprend notamment une
notice descriptive précisant les matériaux utilisés et des plans indiquant les
largeurs des passages (CCH, R. 143-22, lu partiellement). Avant l'ouverture,
visite de réception par la commission et autorisation d'ouverture par le
maire (R. 143-38 et R. 143-39). **Exemple de notice** (préfecture de l'Ain,
version 2015-1, ancien numérotage R. 123-*) : rubriques renseignements
principaux (type, catégorie, effectif) ; construction (résistance au feu SF /
PF / CF, réaction au feu, cloisonnement, secteurs, compartiments, nombre de
niveaux, hauteur du plancher bas du dernier niveau accessible au public,
façades) ; désenfumage ; chauffage et ventilation d'air (mode de chauffage,
puissance, organes de coupure) ; SSI. **Réflexe** : avant de dimensionner,
obtenir le classement du bâtiment, puis le retrouver dans la notice.

*Visuel : `svg/notice-securite.svg` — une notice, cinq rubriques, celles du
lot CVC repérées.*

## Les quatre questions (corrigés)

1. **Écran 2.** Une agence bancaire reçoit des clients. Comment est-elle
   classée ? → ERP de type W ; sa catégorie vient de l'effectif public et
   personnel. (Leurres : type M ; Code du travail seul ; IGH.)
2. **Écran 3.** Un ERP peut accueillir 650 personnes, public et personnel compris.
   Quelle catégorie ? → 3e (301 à 700). (Leurres : 2e, 4e, 5e.)
3. **Écran 4.** Un immeuble de bureaux dont le plancher bas du dernier niveau est
   à 35 m au-dessus du sol le plus haut utilisable par les engins de secours :
   IGH ? → Oui, au-delà de 28 m pour un immeuble autre que d'habitation.
   (Leurres : limite de 50 m ; mesure au toit ; dépend de l'effectif.)
4. **Écran 6.** Un plateau de bureaux de 400 m² sans public, dans un bâtiment
   ordinaire : obligation de désenfumage ? → Oui : plus de 300 m², désenfumage
   naturel ou mécanique (R. 4216-13). (Leurres : réservé aux ERP ; seulement
   sous-sol ; seulement naturel.)

## Correspondances

- `../incendie-desenfumage/` (même sous-ligne) — les obligations et le dimensionnement.
- `../incendie-euroclasses/` (même sous-ligne) — le comportement au feu des matériaux.
- `../incendie-ssi/` (même sous-ligne) — le système de sécurité incendie.
- `../risques-duerp/` (autre sous-ligne) — l'évaluation des risques d'un lieu de travail.

## Sources officielles (consultées le 30/09/2026)

1. Code de la construction et de l'habitation, chapitre III « Établissements
   recevant du public », art. R. 143-1 à R. 143-4, R. 143-14, R. 143-18 à
   R. 143-22, R. 143-38, R. 143-39 (version en vigueur au 30/09/2026 selon la page) :
   https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074096/LEGISCTA000043818935/
2. CCH, section « Immeubles de grande hauteur », art. R. 146-3 à R. 146-5 :
   https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074096/LEGISCTA000043819079/
3. Arrêté du 25 juin 1980 portant approbation des dispositions générales du
   règlement de sécurité contre les risques d'incendie et de panique dans les
   ERP, section 1 « Classement des établissements », art. GN 1 à GN 3 :
   https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000290033 (sommaire lu ;
   liste des types et effectifs lue dans la fiche « Classement des
   établissements recevant du public » de la préfecture de l'Orne :
   https://www.orne.gouv.fr/contenu/telechargement/7319/77779/file/Classement_des_etablissements_recevant_du_public_cle55b4e8.pdf).
4. Arrêté du 31 janvier 1986 relatif à la protection contre l'incendie des
   bâtiments d'habitation, art. 3 :
   https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000474032/ ; arrêté du
   19 juin 2015 modificatif, JORF du 24 juin 2015, texte 31 (NOR ETLL1508571A).
5. Code du travail, art. R. 4216-1 à R. 4216-4, R. 4216-13 à R. 4216-15,
   R. 4216-24, R. 4216-27, R. 4216-28, R. 4227-1, R. 4227-29, R. 4227-34,
   R. 4227-37, R. 4227-38, texte verbatim :
   https://code.travail.gouv.fr/code-du-travail/r4216-13 (et de même pour chaque
   article : `/r4216-1`, `/r4227-29`…).
6. INRS, « Incendie sur le lieu de travail. Réglementation et textes de
   référence » : https://www.inrs.fr/risques/incendie-lieu-travail/reglementation-textes-reference.html
7. service-public.gouv.fr (Entreprendre) : « ERP : procédures d'autorisation de
   travaux » https://entreprendre.service-public.gouv.fr/vosdroits/F31687 ;
   « Règles de sécurité d'un ERP » https://entreprendre.service-public.gouv.fr/vosdroits/F31684.
8. Notice descriptive de sécurité pour les ERP, préfecture de l'Ain, version
   2015-1 (exemple de contenu) :
   https://www.ain.gouv.fr/contenu/telechargement/9998/85396/file/2015noticesecuriteincendie.pdf

Normes payantes : NF S 61-931 (SSI) cité par son objet seulement.

## À sourcer (rien de ce qui suit n'entre dans la station)

- Texte **exact** des art. GN 1 à GN 3 de l'arrêté du 25 juin 1980 : la page
  Légifrance de l'arrêté n'a pas rendu le corps des articles (page dynamique) ;
  types et catégories lus dans la fiche préfectorale, recoupés avec CCH R. 143-18 et R. 143-19.
- **Seuils de la 5e catégorie par type** (dont le type W) : dispositions
  particulières de chaque type, non lues.
- **Article exact imposant la notice de sécurité** au dossier de permis de
  construire (code de l'urbanisme / CCH) : R. 143-22 lu partiellement ; la
  notice d'exemple utilise l'ancien numérotage R. 123-22.
- **Règlement de sécurité des IGH** : texte de l'arrêté conjoint prévu par
  R. 146-5 non lu (aucune valeur n'est citée). Seuil de 200 m des ITGH : lu sur
  une page de synthèse de l'article R. 146-4, à reconfirmer sur le texte.
- **Obligations de désenfumage, de compartimentage et de chauffage-ventilation
  propres aux ERP** (art. DF, CO, CH, GZ, instructions techniques 246 et 247) :
  seuils et exigences par type et par catégorie non lus.
- Exigences CVC propres à l'**habitation** (désenfumage des circulations
  communes) : non lues.
- Périodicité des visites de la commission de sécurité : non lue.
- Compte total de types d'ERP : non cité (la fiche préfectorale annonce 30 types
  pour 22 lettres listées).

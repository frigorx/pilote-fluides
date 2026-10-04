# Station « S'installer » — FOND

> Réseau Législation · sous-ligne Droit du travail (#9d174d) · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Slug : `travail-s-installer`.
> Sous-titre du plan : « l'auto-entreprise ».
> **Statut : produite le 30/09/2026, `data-prototype` posé, en attente de relecture métier.**
> Doctrine tenue : **aucun taux, plafond ou montant n'est écrit à l'écran** (ils changent chaque
> année) ; la station donne la règle et renvoie aux sites officiels. Les seuls chiffres présents sont
> des durées et délais lus dans les sources plus bas.

## Ce qui fait l'intérêt de cette station

Un jeune technicien froid-clim qui songe à « passer à son compte » entend : « auto-entrepreneur,
c'est simple ». Le statut simplifie la fiscalité et les cotisations ; il ne supprime **aucune**
obligation du métier. La station déroule ce qu'il faut avoir **avant** de toucher un fluide
(qualification, immatriculation, attestation de capacité, aptitude, assurances, mention RGE
si le client attend une aide) et les deux pièges du débutant : la sous-traitance déguisée et le prix
trop bas. Trois ponts vers des stations déjà ouvertes, un vers la station « Se former ».

## Objectif

À la fin de la station, l'étudiant sait : (1) ce qu'est un micro-entrepreneur (entrepreneur individuel,
patrimoines séparés, une seule micro-entreprise) ; (2) les deux conditions du droit d'exercer
(qualification, immatriculation) ; (3) que les cotisations se calculent sur le chiffre d'affaires, pas
sur le bénéfice, et ce que deviennent les plafonds et la société quand l'activité grandit ;
(4) qu'entrepreneur seul il doit tenir les deux attestations fluides ; (5) que la décennale suit
l'activité, pas le statut ; (6) que la mention RGE conditionne les aides du client ; (7) reconnaître
une sous-traitance déguisée et calculer un prix sur le coût complet ; (8) cocher les sept cases.

## Référentiel

**TP TECVC, REAC TP-00133 : hors REAC — culture professionnelle du technicien et du chargé
d'affaires.** Aucune des compétences CP1 à CP10 ne porte sur la création d'entreprise. Pont avec
l'attestation d'aptitude 2025 : code **1.00** (législation applicable), pour l'écran 4
(attestation de capacité de l'entreprise). Pas d'autre code fluidique : la station n'est pas
technique.

## Les 8 écrans

Huit SVG, dont trois animés (SMIL autonome, sans script, état au repos = image finale) : écrans 2, 3 et 8.

1. **À son compte : une personne, une entreprise.** Micro-entrepreneur = entrepreneur individuel,
   règles fiscales et sociales simplifiées ; patrimoine professionnel séparé automatiquement du
   patrimoine personnel sauf fraude ; une seule micro-entreprise par personne ; « en nom propre »,
   pas de responsabilité limitée d'une société. `svg/a-son-compte.svg` (fixe).
2. **Le droit d'exercer.** Activité artisanale ; qualification (diplômes cités par l'INPI pour le
   climaticien, ou trois années d'expérience) ; immatriculation au RNE entre un mois avant et quinze
   jours après le début d'activité (qualité d'artisan). `svg/droit-d-exercer.svg` (**animé** : les
   trois marches s'allument dans l'ordre).
3. **Le chiffre d'affaires commande tout.** Cotisations = pourcentage fixe × chiffre d'affaires, taux
   par catégorie d'activité ; déclaration en ligne mensuelle ou trimestrielle à l'Urssaf ; chiffre
   d'affaires nul, cotisation nulle ; la base n'est pas le bénéfice ; plafonds (vente ≠ prestation),
   deux années consécutives au-dessus = régime réel d'imposition, option possible ; société (principe :
   responsabilité limitée aux apports sauf faute de gestion, statuts, dépôt des comptes, cotisations
   du dirigeant différentes). `svg/chiffre-d-affaires.svg` (**animé** : la chaîne se déroule, la barre
   grandit et franchit le plafond).
4. **Avant de toucher un fluide.** Aptitude (personne) + capacité (entreprise : personnel, outillage,
   procédures) ; entrepreneur seul = deux rôles, deux papiers ; le piège « l'entreprise c'est moi ».
   `svg/deux-papiers-soi-meme.svg` (fixe). Pont `../aptitude-capacite/`.
5. **L'assurance décennale.** Code des assurances L241-1 : justifiée à l'ouverture du chantier ;
   dix ans ; sanctions pénales ; pas de dispense par le statut ; RC pro du climaticien libéral ;
   décennale ≠ dommages-ouvrage. `svg/decennale-avant-chantier.svg` (fixe). Pont `../certif-garanties/`.
6. **La mention RGE.** Écoconditionnalité des aides ; par domaine ; annuaire officiel ; « en cours de
   qualification » ne compte pas ; s'immatriculer ne la donne pas. `svg/rge-pour-le-client.svg` (fixe).
   Pont `../certif-rge-qualipac/`.
7. **Deux pièges.** Sous-traitance déguisée (L8221-6 et L8221-6-1, citations) ; prix trop bas (base des
   cotisations = chiffre d'affaires, frais et assurances à charge, partir du coût complet).
   `svg/deux-pieges.svg` (fixe).
8. **Bilan : la check-list.** Sept cases qui se cochent une à une. `svg/checklist-installation.svg`
   (**animé**).

## Les 4 questions (quiz) — bonnes réponses en position 2, 4, 1, 3

- **Q1 (écran 3)** — cotisations : sur le chiffre d'affaires par un pourcentage fixe (pos. 2). Leurres :
  bénéfice après déduction du matériel ; bénéfice imposable de l'an dernier ; nombre de chantiers.
- **Q2 (écran 4)** — seul avec l'aptitude : il faut l'attestation de capacité de l'entreprise (pos. 4).
  Leurres : « l'aptitude suffit » ; seconde aptitude au nom de l'entreprise ; mention RGE.
- **Q3 (écran 5)** — décennale : obligation qui suit l'activité, pas le statut (pos. 1). Leurres :
  facultative en micro-entreprise ; après la réception ; remplacée par la dommages-ouvrage.
- **Q4 (écran 7)** — immatriculé mais subordonné : un contrat de travail peut être établi malgré
  l'immatriculation (pos. 3). Leurres : immatriculation écarte tout ; seul le sous-traitant sanctionné ;
  contrat seulement par écrit signé.

## Correspondances

- `../aptitude-capacite/` — les deux papiers du fluide, maintien de l'aptitude.
- `../certif-garanties/` — décennale, méthode pour qualifier un désordre (elle renvoie déjà ici).
- `../certif-rge-qualipac/` — la mention RGE, annuaire, domaines.
- `../travail-se-former/` — qualification et attestations obtenues et maintenues par la formation.

## Sources officielles (consultées le 30/09/2026)

1. **service-public.gouv.fr (Entreprendre)** — « Micro-entrepreneur : ce qu'il faut savoir », F37398,
   vérifiée le 21/02/2026 : entrepreneur individuel à règles fiscales et sociales simplifiées ; patrimoines
   professionnel et personnel séparés automatiquement ; une seule micro-entreprise par personne ;
   double dépassement des plafonds → régime réel d'imposition ; option pour le réel possible.
   https://entreprendre.service-public.gouv.fr/vosdroits/F37398
2. **service-public.gouv.fr** — « Cotisations sociales du micro-entrepreneur », F36232, vérifiée le
   01/01/2026 : « pourcentage fixe appliqué au chiffre d'affaires » ; taux par catégorie ; déclaration
   et paiement en ligne à l'Urssaf, mensuels ou trimestriels selon l'option ; chiffre d'affaires nul =
   cotisation nulle (cotisation minimale possible sur demande).
   https://entreprendre.service-public.gouv.fr/vosdroits/F36232
3. **service-public.gouv.fr** — « Régime fiscal de la micro-entreprise », F23267, mise à jour le
   13/05/2026 : plafonds fiscaux, obligation de facturation, compte bancaire dédié.
   https://entreprendre.service-public.gouv.fr/vosdroits/F23267
4. **service-public.gouv.fr** — « Un micro-entrepreneur doit-il s'assurer ? », F23668, vérifiée le
   22/09/2023 : assurance selon l'activité ; décennale pour les professionnels de la construction ;
   responsabilité civile professionnelle pour les activités réglementées.
   https://entreprendre.service-public.gouv.fr/vosdroits/F23668
5. **service-public.gouv.fr** — « Comment obtenir la qualité d'artisan ? », F23887 : activité artisanale,
   qualification (CAP ou équivalent, titre inscrit au répertoire national, ou trois ans d'expérience),
   immatriculation au RNE entre un mois avant et quinze jours après le début d'activité.
   https://entreprendre.service-public.gouv.fr/vosdroits/F23887
6. **service-public.gouv.fr** — « Choisir la forme juridique », F23844 : patrimoine professionnel séparé
   de l'entrepreneur individuel ; société à responsabilité limitée : protection à hauteur de l'apport ;
   formalisme (dépôt des comptes). https://entreprendre.service-public.gouv.fr/vosdroits/F23844
7. **INPI** — fiche « Climaticien » (mise à jour 30/04/2020) : diplômes exigés (CAP installateur thermique
   ou froid et climatisation, bac pro technicien en installation des systèmes énergétiques et climatiques,
   BP monteur dépanneur en froid et climatisation), à défaut trois années d'expérience professionnelle
   effective UE/EEE ; assurance de responsabilité civile professionnelle pour l'exercice libéral ; textes :
   loi n° 96-603 du 05/07/1996 (art. 16, 17, 17-1, 19), décret n° 98-246 du 02/04/1998.
   https://www.inpi.fr/climaticien
8. **service-public.gouv.fr** — « Garantie décennale des constructeurs », F2034 : dix ans à compter de la
   réception ; assurance obligatoire avant l'ouverture du chantier ; sanctions pénales ; distincte de la
   dommages-ouvrage, souscrite par le maître d'ouvrage. https://www.service-public.gouv.fr/particuliers/vosdroits/F2034
8 bis. **Légifrance — Code de l'artisanat**, art. R121-1 (en vigueur depuis le 01/07/2023), lu le 04/10/2026
   : la personne qualifiée est titulaire d'un CAP, d'un BEP ou d'un diplôme ou titre de niveau égal ou
   supérieur enregistré au RNCP, attestant une qualification dans le métier ; art. R121-3 : à défaut,
   trois années d'expérience effective. D'où la phrase « Pour un BTS » de l'écran 2. ⚠️ La loi n° 96-603
   (art. 16) et le décret n° 98-246 cités par la fiche INPI (n° 7) sont abrogés depuis le 01/07/2023
   (ordonnance n° 2023-208) : leur contenu est repris aux art. L121-1 et R121-1 et suivants du Code de
   l'artisanat.
   https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006075116/LEGISCTA000047724792/
9. **Légifrance** — Code des assurances, art. L241-1 (version du 08/08/2015) : toute personne dont la
   responsabilité décennale peut être engagée doit être assurée et en justifier à l'ouverture du chantier.
   https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031010281
10. **Code du travail numérique** — art. L8221-6 (version en vigueur au 01/01/2023) : présomption de non-
    salariat des personnes immatriculées ; « l'existence d'un contrat de travail peut toutefois être établie »
    en cas de lien de subordination juridique permanente ; donneur d'ordre condamné pour travail dissimulé
    tenu de payer les cotisations dues. https://code.travail.gouv.fr/code-du-travail/l8221-6
    Art. L8221-6-1 (version du 06/08/2008) : « Est présumé travailleur indépendant celui dont les conditions
    de travail sont définies exclusivement par lui-même ou par le contrat les définissant avec son donneur
    d'ordre. » https://code.travail.gouv.fr/code-du-travail/l8221-6-1
11. **Internes** : stations `aptitude-capacite` (aptitude/capacité, remise à niveau tous les 7 ans, arrêté du
    21/11/2025), `certif-garanties` (décennale, dommages-ouvrage), `certif-rge-qualipac` (RGE).

## Vérification de la doctrine

- Aucun taux, aucun plafond, aucun montant, aucun seuil de sanction écrit à l'écran, dans les
  narrations, les questions ou `mission.json`.
- Chiffres présents, tous lus : trois ans d'expérience (INPI, F23887) ; un mois avant / quinze jours après
  (F23887) ; dix ans (F2034, L241-1) ; 7 ans (maintien de l'aptitude, station voisine) ; sept cases
  (structure de la check-list).
- Lus mais volontairement non repris (ils changent chaque année) : plafonds 2026 (vente 203 100 €,
  prestation 83 600 €, F37398 et F23267) ; taux de cotisation par catégorie (F36232) ; peine de la
  garantie décennale non respectée (F2034) ; frais d'immatriculation (F23844).
- Schéma « prix trop bas » : trois parts d'une barre, **sans valeurs**, légendé « schéma sans valeurs ».

## ⚠️ À sourcer (non affirmé dans la station)

1. **Plafonds et taux du jour** : à relire sur autoentrepreneur.urssaf.fr et service-public.gouv.fr au
   moment d'un calcul (le portail de l'Urssaf n'a pas pu être lu : connexion coupée). Valeurs lues sur
   service-public.gouv.fr le 30/09/2026 gardées ici, non enseignées.
2. **Décret n° 98-246 du 02/04/1998** : la liste des activités réglementées (dont l'installation et
   l'entretien d'équipements de froid et de climatisation) n'a été lue que via la fiche INPI de 2020 ;
   lire le texte consolidé sur Légifrance. Idem l'exigence d'un contrôle effectif et permanent de la
   qualification (page artisanat.fr, non lue en entier).
3. **Attestation de capacité** : le texte réglementaire précis (article du Code de l'environnement) n'a pas
   été relu ici ; la station s'appuie sur `aptitude-capacite` (référentiel 2025). Conditions d'obtention,
   organisme délivreur, durée : non affirmés.
4. **Page travail-emploi.gouv.fr « Le travail dissimulé »** : bloquée par un contrôle anti-robot, non
   contourné. Sanctions du travail dissimulé et jurisprudence sur les indices de subordination : non
   affirmées. La station cite uniquement L8221-6 et L8221-6-1 lus sur code.travail.gouv.fr.
5. **Fiche F23668** (assurance du micro-entrepreneur) : vérifiée le 22/09/2023, à revérifier.
6. **Sous-traitance** au sens de la loi de 1975 (agrément du sous-traitant, paiement direct) : non traitée.
7. **Passage en société** : principe seulement (F23844). Seuils, avantages fiscaux et sociaux comparés :
   non affirmés ; renvoi à un expert-comptable ou à Bpifrance Création.
8. **Convention collective** (bâtiment, bureaux d'études) : sans objet pour un indépendant ; non citée.

## Animations

Trois SVG animés (SMIL, boucle 12 à 14 s, état au repos = image finale) : `droit-d-exercer.svg`,
`chiffre-d-affaires.svg`, `checklist-installation.svg`. Les cinq autres sont fixes.

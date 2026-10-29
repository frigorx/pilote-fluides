# Sources de la station 9.5 « Le Klixon et le dépannage du compresseur »

Station écrite le 28/10/2026 (ligne 9, lot 2). Statut : en cours de relecture, non validée par F. Henninot.
Aucun MP3, aucun son, aucun score. Aucun fait technique hors de la liste « FAITS-LOT-2 » du brief du lot 2.

## Sigles des sources
[M] cours « 20-MoteurMonophase » (Bac pro MFER, S4). [T] Tecumseh Europe, annexes « Types de moteurs ».
[K] correction CAP « Cp Hermétique ». [N] notice Maneurop. [L] cours « 08 LES MOTEURS prof ».
[S67] station 6.7 (consignation, pas de contrôleur d'isolement sous vide).

## Ce que la station affirme, et d'où cela vient
| Affirmation | Source |
|---|---|
| Le Klixon est un protecteur thermique en série sur la borne C ; c'est un bilame ; il coupe quand l'intensité ou la température montent trop ; il protège les deux enroulements | [K] |
| Klixon interne : « protecteur interne température courant » | [N] |
| Klixon externe : monté sur le compresseur | [T] |
| Le Klixon est un contact sec, comme un interrupteur | [L] |
| Il se referme quand il a refroidi | déduit du bilame. **Aucune durée dans le fonds : aucune durée écrite** |
| Klixon interne ouvert : l'infini entre C et S et entre C et R, valeur normale entre S et R | **raisonnement sur le schéma** (Klixon en série sur C), présenté comme tel et à vérifier sur le schéma du constructeur |
| S et R donnent la valeur normale : les deux enroulements conduisent | exemple chiffré de [M] (11 + 3 = 14 : S-R est la somme de C-S et C-R) |
| Pannes qui finissent en coupure par le Klixon : condensateur coupé ou en court-circuit, relais de tension mal adapté, CTP chaude | [M] |
| Condensateur : se décharge avec une résistance avant d'y toucher ; certains ont une résistance de décharge d'environ 15 kΩ ; la décharge peut prendre quelques minutes ; on décharge quand même | [M] ; règle des stations 6.5 et 9.1, décision de F. Henninot du 28/10/2026 |
| Test à l'ohmmètre d'un condensateur déchargé, calibre 20 kΩ ou 200 kΩ : bon état, coupé, court-circuit, masse, enveloppe gonflée | [M] |
| Marquage : capacité en µF (aussi MF, MFD) avec tolérance, tension maximale | [M] |
| 60 µF ± 10 % : entre 54 et 66 µF ; 42 µF hors tolérance, on remplace | [M] |
| 100 µF ± 10 % : entre 90 et 110 µF ; 20 µF ± 10 % : entre 18 et 22 µF (quiz) | [M] pour 100 µF ; 20 µF **calculé** (10 % de 20 = 2). Les relevés 95 µF, 84 µF, 17 µF sont **fictifs**, choisis dans et hors plage, vérifiés deux fois |
| Condensateur de démarrage : électrolytique, forte capacité, petit ; 5 secondes au plus sous tension, 20 démarrages par heure au maximum ; risque d'exploser | [M] |
| Condensateur permanent : reste en service pendant la marche | station 9.1 |
| Condensateur de démarrage en série avec l'auxiliaire (schéma CSIR) | [M] |
| Relais d'intensité : bobine en série avec le principal, contact ouvert au repos pour l'auxiliaire ; mesures dans le bon sens (infini A/S-P/M et A/S-L, presque 0 Ω P/M-L) ; remplacement à même référence | [M] |
| CTP froide : quelques ohms | [M] |
| Mesure des enroulements : fils débranchés, petit calibre (200 Ω), C-S, C-R, S-R ; infini = coupé ; borne-carcasse au plus fort calibre, point gratté, infini attendu, 0 Ω ou presque = masse franche | [M] |
| Masse peu franche : contrôleur d'isolement, 500 V continu ; jamais sur un compresseur sous vide | [M] ; [S67], notices Maneurop et Tandem |
| Ordre du diagnostic : tension, Klixon, enroulements, organe de démarrage, condensateur ; tout hors tension après consignation sauf la mesure de tension | ordre retenu par F. Henninot pour la station (méthode, de l'alimentation vers le moteur) |
| La consignation passe en 2e position de la ligne des étapes, avant les mesures hors tension | brief du lot 2 ; jeu d'étapes défini une fois dans `stations/_commun/modele-pratique.js` (INRS ED 6109 § 5.1, HoCourant M9) |
| Habilitation : seul un travailleur habilité intervient | Code du travail R. 4544-9 et R. 4544-10, via `modele-pratique.js` (SECURITE) |
| Après un compresseur grillé : changer contacteur, relais thermique, système de démarrage et sécurité, détendeur, déshydrateur ; rincer ; chercher la cause | [M] |
| « OL », ou un 1 tout à gauche de l'écran : l'infini | station 6.7 |

## Ce qui n'est PAS dans la station, volontairement
- Aucune durée de réarmement ni de refroidissement du Klixon.
- Aucune mesure de capacité sous tension : la capacité relevée est donnée dans l'énoncé.
- Aucune valeur de résistance de décharge externe.

## Raisonnements et points à faire valider par F. Henninot
- Le Klixon interne « en série sur C » est lu derrière la borne C. Le schéma construit (`montage-rsir.svg`) dessine le Klixon
  entre L et C, hors du cadre « le compresseur » : cela correspond à un Klixon externe. À confirmer sur un schéma constructeur.
- « On le remplace » pour un condensateur coupé, en court-circuit ou à la masse : conséquence du principe (la capacité hors tolérance se remplace), non écrite telle quelle dans le fonds.
- Un Klixon externe se contrôle « comme un interrupteur » : déduit de [L]. Aucune mesure précise à ses bornes n'est décrite.
- Note des codes : T11 est de l'activité Installation, T16 de l'activité Entretien (`HAL-v3/donnees/referentiels/peda/CAP_IFCA.json`). La note de la 6.7 ne citait que l'Installation : elle est précisée ici.

## Images (toutes déjà posées, rien n'a été dessiné ni ajouté)
| Fichier | Origine | Emploi |
|---|---|---|
| `assets/biblio/multimetre-et-ses-sondes.png` | photographie de la base inerWeb, reprise de la station 6.7 | temps 1, 2, 3 (afficheur) |
| `assets/montage-rsir.svg`, `assets/montage-csir.svg` | schémas construits dans QElectroTech (`schemas-ligne-9/montages-compresseur.qet`), convertis en SVG ; à valider | temps 1 et 4 |
| `assets/clixon.svg`, `assets/condensateur.svg`, `assets/ohmmetre-h.svg`, `assets/masse.svg` | bibliothèque de symboles inerWeb, issue de QElectroTech | temps 4 |

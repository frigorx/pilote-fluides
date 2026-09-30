# Station « Le bruit en dB » — FOND

> Réseau Législation · sous-ligne Acoustique (#6d28d9) · niveau BTS.
> Sous-titre : « dB(A), niveaux ». Mini-station ≤ 10 min : 8 écrans + 4 questions.
> Station de tête de la ligne : elle donne le vocabulaire (dB, dB(A), Lw, Lp) dont se servent
> les quatre suivantes (seuils, mesurer, PAC et voisinage, traiter le bruit).
> Rédigé le 30/09/2026. Statut : prototype, en attente de relecture métier.

## Objectif

À la fin de la station, l'étudiant sait dire ce qu'est un son, pourquoi un niveau se compte
en décibels sur une échelle logarithmique, ce que change la pondération A, distinguer la
puissance acoustique Lw (ce que la machine émet) de la pression acoustique Lp (ce que l'on
mesure à un endroit), expliquer pourquoi deux sources ne font pas le double, et chiffrer
l'effet de la distance et du lieu.

## Référentiel

TP TECVC, REAC TP-00133 — **CP9** (climatisation) et **CP7** (ventilation tertiaire).
- CP9 : choisir un groupe extérieur sur sa puissance acoustique Lw (fiche constructeur) et
  juger de son effet à l'implantation (distance, mur, coin).
- CP7 : ventilateurs, réseaux et bouches font du bruit dans les locaux tertiaires.
Pas d'attestation d'aptitude 2025 (station non fluidique).

## Notions

Son (pression qui varie, onde) · fréquence (Hz), grave / aigu · plage audible · décibel ·
échelle logarithmique · dB(A), dB(C) · sonomètre · Lw · Lp · champ libre · addition de
niveaux · atténuation par la distance · effet de réflexion (mur, coin, cour).

## Déroulé des 8 écrans

| # | Titre | Illustration | Animée |
|---|-------|--------------|--------|
| 1 | Un son, c'est de la pression qui varie | `son-onde.svg` | oui (arcs qui s'éloignent, point sur la courbe) |
| 2 | Grave ou aigu : la fréquence | `frequence-grave-aigu.svg` | non |
| 3 | Le décibel : pourquoi une échelle logarithmique | `echelle-db.svg` | oui (curseur de l'échelle) |
| 4 | La pondération A : l'oreille entend moins les graves | `ponderation-a.svg` | non |
| 5 | Lw et Lp | `lw-et-lp.svg` | non |
| 6 | Deux sources ne font pas le double | `deux-sources.svg` | oui (machines ajoutées une à une) |
| 7 | La distance atténue, le lieu renforce | `distance-et-lieu.svg` | oui (niveaux et flèches de gauche à droite) |
| 8 | Bilan et le réflexe | `bilan-bruit.svg` | non |

Quatre animées (SMIL autonome, sans script, boucle 12 s avec long temps de repos ; l'état au
repos est l'image finale complète).

## Le contenu, écran par écran (sources entre parenthèses)

1. **Un son.** Vibrations de l'air qui se propagent sous la forme d'ondes acoustiques ; on
   s'intéresse à leur amplitude (dB) et à leur fréquence (Hz) (INRS). Le tympan capte les
   variations de pression sonore (INRS). Un bruit est un son perçu comme gênant, notion
   subjective (INRS). L'air oscille sur place et transmet le mouvement : explication physique
   standard, non chiffrée.
2. **Fréquence.** Vibrations rapides = fréquence élevée = aigu ; lentes = grave. Audible :
   20 à 20 000 Hz ; infrasons < 20 Hz ; ultrasons > 20 000 Hz ; parole 100 à 6 000 Hz (INRS).
3. **Décibel.** Repères INRS en dB(A) : 0 = bruit le plus faible perceptible ; 50 =
   conversation habituelle ; 80 = seuil de nocivité pour 8 h/j ; 120 = sensation douloureuse.
   Échelle logarithmique (INRS). « + 10 dB = dix fois plus d'énergie, + 3 dB = deux fois plus » :
   voir la démonstration ci-dessous.
4. **Pondération A.** Le dB(A) « rend compte du niveau réellement perçu par l'oreille » ; pour
   les niveaux très élevés on utilise le dB(C) ; le sonomètre est l'instrument de base (INRS).
   Le Code du travail exprime l'exposition quotidienne en dB(A) et la pression de crête en dB(C)
   (art. R. 4431-2) : seules les unités sont citées ici, les valeurs sont laissées à la station
   « Les seuils ». La courbe est qualitative, sans aucune valeur de correction.
5. **Lw / Lp.** Lw caractérise la capacité d'émission sonore de la source indépendamment de son
   environnement, se mesure en laboratoire, permet de comparer les appareils. Lp est la
   grandeur perçue et mesurée par le sonomètre, elle dépend de l'environnement d'installation et
   de la distance de mesure (AFPAC, fiche n° 1). L'analogie de l'ampoule est pédagogique.
6. **Deux sources.** Une machine à 80 dB(A) : 2 machines → 83 ; 3 → 85 ; 4 → 86 ; 5 → 87 ;
   10 → 90. Arrêter l'une de deux machines identiques ne baisse le niveau que de 3 dB(A) (INRS).
   Deux sources de 60 et 66 dB(A) → 67 dB(A) ; deux sources de 60 dB(A) → 63 dB(A) (AFPAC).
7. **Distance et lieu.** En champ libre, le niveau de pression est réduit de 6 dB(A) par
   doublement de la distance : 54 dB(A) à 2 m, 48 à 4 m, 42 à 8 m. Contre un mur : + 3 dB(A) ;
   dans un coin : + 6 ; dans une cour intérieure : + 9 (« au moins 9 ») (AFPAC, fiche n° 1).
   Recommandations d'implantation : éviter angles et cours intérieures, s'éloigner des limites
   de propriété et des fenêtres (AFPAC, fiche n° 1). La remarque « un coin annule un doublement
   de distance » est une simple comparaison de 6 dB avec 6 dB.
8. **Bilan.** Quatre questions : Lw ou Lp ? dB ou dB(A) ? distance et lieu ? nombre de sources ?

## Démonstration (aucune valeur inventée)

La règle « les niveaux ne s'ajoutent pas » se démontre à partir de la définition logarithmique :
un niveau est proportionnel au logarithme décimal d'un rapport d'énergies (ou d'intensités).
- **Deux sources identiques.** L'énergie double : le niveau varie de 10 × log 2, soit environ
  + 3 dB. Recoupé par l'INRS (80 + 80 → 83) et l'AFPAC (60 + 60 → 63).
- **+ 10 dB.** L'énergie est multipliée par 10 : 10 × log 10 = 10. Recoupé par l'INRS (10
  machines identiques → + 10 dB).
- **Distance.** Pour une source ponctuelle en champ libre, l'intensité varie comme l'inverse du
  carré de la distance. Distance doublée : intensité divisée par 4, soit 10 × log 4, environ
  − 6 dB. Recoupé par l'AFPAC (6 dB(A) par doublement, « en champ libre »).
La station affirme ces règles en citant l'INRS et l'AFPAC ; la démonstration reste ici, dans le
fond, pour le professeur.

## Les 4 questions et leurs corrigés

1. *Deux machines identiques de 80 dB(A) marchent ensemble ; on mesure…* (écran 6).
   Réponse : **83 dB(A)**. Leurres : 160 (somme), 90 (+ 10 par machine ajoutée), 86 (+ 3 par
   machine). Bonne réponse au rang 3.
2. *La fiche du constructeur donne le Lw d'un groupe extérieur ; on peut en déduire…* (écran 5).
   Réponse : **ce que la machine émet, de quoi la comparer à une autre**. Leurres : ce que le
   voisin entendra ; le niveau à un mètre quel que soit le lieu ; le niveau maximal légal.
   Bonne réponse au rang 4.
3. *54 dB(A) à 2 m en champ libre ; à 4 m ?* (écran 7). Réponse : **48 dB(A)**. Leurres : 27
   (la moitié), 50 (2 dB par mètre), 42 (deux doublements d'un coup). Bonne réponse au rang 2.
4. *Pourquoi exprime-t-on un bruit en dB(A) ?* (écran 4). Réponse : **il tient compte de la
   sensibilité de l'oreille, moins sensible aux graves**. Leurres : « A » = absolu ; ne retient
   que les aigus ; permet d'additionner comme des nombres. Bonne réponse au rang 1.

## Correspondances

- `../acoustique-les-seuils/` (même sous-ligne) : les valeurs réglementaires s'expriment avec ces dB.
- `../acoustique-mesurer/` (même sous-ligne) : du sonomètre au Lp.
- `../acoustique-pac-voisinage/` (même sous-ligne) : du Lw constructeur au Lp chez le voisin.
- `../risques-epi/` (Risques professionnels) : protections auditives.
Station sœur non liée dans le maillage (5 liens max déconseillés) : `../acoustique-traiter-le-bruit/`.

## Sources officielles et de référence

Consultées le 30/09/2026.

1. **INRS — « Bruit : définitions »**, https://www.inrs.fr/risques/bruit/definitions.html
   (page lue en entier : sons, fréquences 20 à 20 000 Hz et parole 100 à 6 000 Hz, repères
   0 / 50 / 80 / 120 dB(A), dB(C), sonomètre, addition 80 → 83 / 85 / 86 / 87 / 90).
2. **Code du travail, art. R. 4431-2** (valeurs d'exposition au bruit), lu sur
   https://code.travail.gouv.fr/code-du-travail/r4431-2 : uniquement les *unités* (dB(A) pour
   l'exposition quotidienne, dB(C) pour la pression de crête) sont reprises ici.
3. **AFPAC, Fiche technique n° 1 « Pompes à chaleur & environnement acoustique »** (juillet 2011,
   Association française pour les pompes à chaleur, syndicat professionnel : source de référence
   de la filière, non officielle). Le texte a été lu à partir d'une copie extraite ; le fichier
   est hébergé par Bruitparif
   (`bruitparif.fr/.../2011-07-01 - Pompes à chaleur et environnement acoustique - Fiche technique n°1 - AFPAC.pdf`) ;
   l'adresse `afpac.org/file/204932` renvoyait « page non trouvée » le 30/09. Définitions de Lw
   et Lp, 6 dB(A) par doublement, exemple 54 / 48 / 42 dB(A), addition 60 + 60 = 63 et
   60 + 66 = 67, réflexions + 3 / + 6 / + 9 dB(A).
4. **CIDB (bruit.fr), « Bruits des pompes à chaleur »** (à jour au 1er mars 2023) : le seul
   usage est le rappel « 30 dB + 30 dB = 33 dB », cohérent avec la démonstration. Non repris
   dans les écrans (matière de la station PAC et voisinage).
5. Fonds de l'enseignant (RAG) : `4.1 Thermodynamique (acoustique élémentaire).pdf` (BAC_MFER,
   S1-Analyse), utilisé comme aide pour le plan (définition du son), non cité comme source.

Normes payantes (objet seulement) : NF S 31-010 (caractérisation et mesurage des bruits de
l'environnement), NF EN ISO 3744 (détermination des niveaux de puissance acoustique par mesurage
de pression) : ce sont ces normes qui fondent le Lw de laboratoire et le Lp mesuré ; leurs
valeurs et méthodes ne sont pas reprises.

## À sourcer (omis dans les écrans, jamais approximé)

- Référence du décibel (pression et énergie de référence : valeur du 0 dB) : donnée de la norme
  (ISO 1683, payante) ; non lue dans une source officielle gratuite, donc omise.
- Courbe de pondération A (valeurs de correction par fréquence) et définition du dB(C) : norme
  CEI 61672 (payante), non lue ; la courbe de l'écran 4 est qualitative.
- Formulation officielle, dans une source gratuite, de « l'oreille est moins sensible aux
  graves » : l'INRS dit que le dB(A) prend en compte le niveau réellement perçu, sans détailler
  la sensibilité par fréquence dans la page lue. À confirmer sur une fiche INRS (ED 6xxx) ou
  une source d'audiologie.
- Statut de la directive 2000/14/CE (émissions sonores des matériels destinés à être utilisés à
  l'extérieur : indication du niveau de puissance acoustique garanti) : à vérifier si les
  groupes extérieurs de climatisation et pompes à chaleur en relèvent. Non affirmé.
- Obligation légale, pour un constructeur de PAC ou de groupe, d'afficher un Lw sur sa fiche
  (règlement d'écoconception ou marquage énergétique) : non vérifié, non affirmé.
- Domaine de validité précis de la règle des 6 dB par doublement (source ponctuelle, champ
  libre, distance suffisante) : l'AFPAC la donne « en champ libre » ; on n'en dit pas plus.
- Vérifier avec la station « Les seuils » la répartition des valeurs du Code du travail
  (R. 4431-2) : ici seules les unités sont citées.

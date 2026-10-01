# Station « Protéger un circuit — sections & calibres » — FOND à valider

> Réseau Législation · sous-ligne Électrique (#a16207) · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions, 8 illustrations dont 5 animées.
> **Statut : produite le 30/09/2026 (vague de finition), EN ATTENTE de relecture métier F. Henninot** (`data-prototype` posé).
> Aucun chiffre réglementaire dans la station : les tableaux et seuils sont listés sous « À sourcer ».

## Objectif

À la fin de la station, l'étudiant sait expliquer pourquoi un conducteur chauffe, distinguer surcharge et court-circuit,
énoncer la règle d'or — **la protection protège le câble** : IB ≤ In ≤ IZ —, mener la démarche de choix section / calibre
(besoin, calibre, section, contrôles), citer le piège de la chute de tension sur une longue ligne, expliquer pouvoir de
coupure et sélectivité, et protéger correctement le moteur d'un compresseur.

## Référentiel

**TP Technicien d'études en CVC — REAC TP-00133.** Compétences retenues, réellement mobilisées :

- **CP9 — Climatisation** : le technicien d'études dimensionne l'alimentation et la protection électrique d'un groupe de
  climatisation / de production frigorifique (section, calibre, chute de tension sur la longueur de ligne, moteur de compresseur).
- **CP6 — Chauffage / ECS** : même démarche pour l'alimentation des circulateurs, des brûleurs et autres moteurs de
  l'installation de chauffage.

Pas de code d'attestation d'aptitude 2025 : la station n'est pas fluidique.

## Écran 1 — Un conducteur qui travaille chauffe

Effet Joule en langage courant : le cuivre a une résistance, l'énergie perdue devient chaleur. L'échauffement dépend du
courant, de la section et du mode de pose (à l'air libre, sous isolant, en faisceau). Le danger est lent et invisible :
l'isolant vieillit, durcit, se fissure. *Visuel : `chauffe-conducteur.svg`, animé (points de courant, le conducteur fin rougit).*

## Écran 2 — Surcharge et court-circuit

Surcharge : courant un peu trop élevé, longtemps ; cause : trop de récepteurs, moteur qui force ; déclencheur thermique
(bilame). Court-circuit : courant énorme, instantané ; cause : contact direct entre deux conducteurs sous tension ;
déclencheur magnétique (bobine). Disjoncteur magnétothermique = les deux. *Visuel : `deux-defauts.svg`, fixe (comparaison
côte à côte, meilleure fixe).*

## Écran 3 — La règle d'or

IB (courant d'emploi) ≤ In (calibre) ≤ IZ (courant admissible du câble). Le calibre protège le câble, pas l'appareil
branché. Piège : monter le calibre parce que ça déclenche. *Visuel : `regle-d-or.svg`, animé (barres qui grandissent, le crochet
rouge apparaît sur la carte « faux »).*

## Écran 4 — La démarche section / calibre

Quatre gestes : besoin (IB) → calibre (In ≥ IB, calibre normalisé) → section (IZ ≥ In ; IZ dépend de la section, de
l'isolant, du mode de pose, du groupement de circuits, de la température ambiante) → contrôles (chute de tension, pouvoir de
coupure, tenue du câble au court-circuit). Sur l'existant, la section est un fait : elle borne le calibre. **Aucun tableau
recopié** : la démarche seule, les tableaux étant dans la norme payante (voir « À sourcer »). *Visuel : `demarche-section-calibre.svg`, fixe.*

## Écran 5 — La chute de tension

La résistance croît avec la longueur, décroît avec la section. Sur une longue ligne le récepteur reçoit moins que la tension
du tableau ; un moteur au démarrage (courant fort) est le cas le plus sensible. Remède : augmenter la section même si
l'échauffement ne l'exige pas. Limite admise : fixée par la norme, non reprise. *Visuel : `chute-de-tension.svg`, animé (les
barres de tension décroissent de gauche à droite).*

## Écran 6 — Pouvoir de coupure et sélectivité

Pouvoir de coupure d'un appareil ≥ courant de court-circuit présumé à son point d'installation (plus fort près de la
source). Sélectivité : seul l'appareil en amont immédiat du défaut s'ouvre. Obtenue par choix et réglage, avec les tableaux
de sélectivité des constructeurs. *Visuel : `selectivite-coupure.svg`, animé (le départ 2 passe au rouge, la tête reste verte).*

## Écran 7 — Le moteur d'un compresseur

Pointe de démarrage (plusieurs fois le nominal, quelques instants). Courbes de déclenchement (B, C, D…) : le multiple à
partir duquel le magnétique agit ; on choisit selon la charge. Disjoncteur moteur : thermique réglable sur le courant de la
plaque signalétique, magnétique calé haut. Un compresseur qui peine (condenseur encrassé, manque de fluide, rotor qui cale)
appelle un courant durablement trop fort : c'est le thermique qui protège. Ne jamais monter un réglage sans chercher la cause.
*Visuel : `demarrage-compresseur.svg`, animé (la courbe se trace).*

## Écran 8 — Règle des protections et bilan

Un moteur = une seule protection thermique. Derrière une tête (fusibles OU disjoncteur modulaire) : soit un disjoncteur moteur
seul, soit un contacteur + relais thermique. Jamais deux disjoncteurs moteurs en série, jamais disjoncteur moteur + relais
thermique. Un départ par moteur. Bilan en une ligne : le réflexe est de regarder la section du câble avant de toucher à un
calibre. *Visuel : `protections-moteur.svg`, fixe (trois colonnes de blocs fonctionnels ; ce sont des blocs étiquetés, pas des
symboles normalisés — un schéma normalisé relèverait de QElectroTech).*

## Les quatre questions (corrigés)

1. **(écran 3)** On monte le calibre d'un cran sans changer le câble : que risque-t-on ? → *Le câble peut chauffer sans que
   rien ne coupe* (les leurres : « rien, le calibre ne concerne que l'appareil », « déclenchera plus souvent », « le
   différentiel prendra le relais »).
2. **(écran 5)** Courant sous l'admissible mais ligne très longue : pourquoi une section plus grande ? → *Pour limiter la
   chute de tension en bout de ligne* (leurres : monter le calibre, déclencher plus vite, pouvoir de coupure).
3. **(écran 6)** Court-circuit sur le départ du compresseur, installation sélective ? → *Seul le départ concerné s'ouvre, le
   reste reste alimenté* (leurres : la tête s'ouvre, tous s'ouvrent, le différentiel décide).
4. **(écran 8)** Quel montage protège correctement le moteur ? → *Une tête, puis un disjoncteur moteur seul* (leurres :
   disjoncteur moteur + relais thermique, deux disjoncteurs moteurs, contacteur sans thermique).

Positions de la bonne réponse : 2, 4, 3, 1.

## Correspondances

- `../elec-nf-c-15-100/` — la norme d'installation (tableaux, limites de chute de tension).
- `../elec-terre-differentiel/` — le calibre protège le câble, le différentiel protège les personnes.
- `../elec-regimes-de-neutre/` — la boucle de défaut décide du courant de défaut et de l'appareil qui coupe.
- `https://inerweb.fr/electrorezo/` — ligne « Protéger » (fusibles, disjoncteurs, relais thermique, section du câble).

## Sources

**Textes officiels lus**
- Code du travail, art. **R. 4215-6** (conception des installations électriques des lieux de travail : le matériel doit
  supporter sans dommage les effets mécaniques et thermiques d'une surintensité pendant le temps nécessaire au fonctionnement
  des dispositifs qui la coupent ; les conducteurs des canalisations fixes sont protégés contre les surintensités). Version en
  vigueur du 02/09/2010. https://code.travail.gouv.fr/code-du-travail/r4215-6 — consulté le 30/09/2026.
- Code du travail, art. **R. 4215-16** (les matériels de sectionnement, de protection contre les surintensités et contre
  les chocs électriques sont conformes aux normes françaises homologuées ou à des spécifications équivalentes de l'UE / EEE).
  Version du 02/09/2010. https://code.travail.gouv.fr/code-du-travail/r4215-16 — consulté le 30/09/2026.
- Index Légifrance du Code du travail : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000022765014/ (référence de
  localisation des articles ci-dessus).

**Normes (payantes — titre et objet seulement)**
- NF C 15-100, *Installations électriques à basse tension* : protection contre les surintensités, choix des canalisations,
  chute de tension. Non lue ; aucune valeur reprise.
- NF EN 60898-1 (disjoncteurs pour installations domestiques et analogues) et série NF EN 60947 (appareillage à basse tension :
  disjoncteurs, démarreurs de moteurs) : domaine seulement.

**Contenu pédagogique interne, à titre de cohérence (non réglementaire)**
- ÉlectroRézo 4.3, 4.4, 4.7 et 4.9 (`electrorezo/stations/`) : magnétothermique, disjoncteur moteur, relais thermique, câble
  et section ; règle « le calibre protège le câble » ; et règle des protections de F. Henninot (une tête, un disjoncteur moteur
  OU contacteur + thermique, jamais empilés).

**Statut des affirmations non chiffrées.** La relation IB ≤ In ≤ IZ, le rôle du bilame et de la bobine, la pointe de démarrage
« plusieurs fois le nominal » et la sélectivité sont des principes classiques de l'électrotechnique. Ils ne sont pas tirés d'un
texte officiel lu ici : l'énoncé exact de la condition de protection contre les surcharges est dans la norme (payante) et est
listé ci-dessous. Le seul appui officiel lu est le Code du travail (R. 4215-6 : les conducteurs sont protégés contre les
surintensités).

## À sourcer (rien de cela n'est écrit dans la station)

1. **Énoncé exact de la condition de protection contre les surcharges** (IB ≤ In ≤ IZ et condition sur le courant de
   fonctionnement conventionnel — valeur du facteur applicable) : NF C 15-100 / CEI 60364-4-43. Le facteur souvent cité (1,45)
   n'a pas été lu à une source officielle : non repris.
2. **Tableaux de courants admissibles par section** (cuivre / aluminium, isolant PVC / PR, nombre de conducteurs chargés) :
   NF C 15-100 / CEI 60364-5-52. Non repris.
3. **Facteurs de correction** (mode de pose, groupement de circuits, température ambiante). Non repris.
4. **Limites de chute de tension** admises entre l'origine de l'installation et le récepteur (éclairage, autres usages,
   moteurs au démarrage). Non reprises.
5. **Série des calibres normalisés** des disjoncteurs et des fusibles. Non reprise.
6. **Multiples de déclenchement magnétique des courbes B, C, D** (NF EN 60898-1) et courbes propres aux disjoncteurs moteurs.
   Non repris (le texte dit seulement que la courbe est choisie selon la charge).
7. **Ordre de grandeur du courant de démarrage d'un moteur de compresseur** : à lire sur la plaque signalétique et la notice du
   constructeur. Le texte dit seulement « plusieurs fois le nominal ».
8. **Pouvoir de coupure** : valeurs usuelles des disjoncteurs, règles de filiation, calcul du courant de court-circuit.
   Non repris.
9. **Tableaux de sélectivité** des constructeurs (limites de sélectivité entre appareils). Non repris.
10. **Tenue du câble au court-circuit** (contrainte thermique admissible). Non reprise.

## Défauts connus

- Les 12 narrations n'ont pas de MP3 fabriqué : la station parle avec la voix du navigateur tant que la chaîne edge-tts n'a
  pas été lancée sur cette station.
- `svg/protections-moteur.svg` : blocs fonctionnels étiquetés, pas de symboles normalisés (choix volontaire).
- Voir « À sourcer » : la station est volontairement sans chiffres ; une passe de complétion est possible après arbitrage.

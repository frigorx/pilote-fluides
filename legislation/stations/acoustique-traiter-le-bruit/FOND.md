# Station « Traiter le bruit » — FOND à valider

> Réseau Législation · sous-ligne Acoustique · niveau BTS · sous-titre « plots, silencieux ».
> Mini-station ≤ 10 min : 8 écrans + 4 questions. Slug : `acoustique-traiter-le-bruit`.
> **Statut : produite le 30/09/2026, EN ATTENTE de relecture métier** (`data-prototype`).
> Fonds voisins de la vague : `acoustique-le-bruit-en-db`, `acoustique-les-seuils`,
> `acoustique-mesurer`, `acoustique-pac-voisinage`.
>
> **Ligne de la station** : aucune valeur réglementaire (dB, seuil, distance, fréquence) n'est
> reprise. Les mécanismes s'enseignent ; les valeurs vivent dans `acoustique-les-seuils`.
> Le fonds de l'enseignant (`4.2 Thermodynamique (acoustique atténuation).pdf`, BAC MFER) traite
> la décroissance avec la distance, pas le traitement : il est renvoyé à `acoustique-le-bruit-en-db`.

## Objectif

À la fin de la station, l'étudiant dit par quel chemin un bruit arrive (aérien ou solidien),
choisit où agir (source, chemin, récepteur), explique ce que font un plot antivibratile, une
manchette souple et un silencieux, relie la vitesse d'air dans une gaine au bruit, et repère les
erreurs qui ruinent un traitement.

## Référentiel

**TP TECVC, REAC TP-00133 — CP4, CP7, CP9.**
- **CP4 (VMC)** et **CP7 (ventilation tertiaire)** : la vitesse d'air, le silencieux et la manchette
  souple se prescrivent au dimensionnement du réseau d'air.
- **CP9 (climatisation)** : la pose d'un groupe extérieur sur plots avec raccords souples se prescrit
  à l'installation.

Station non fluidique : aucun code de l'attestation d'aptitude 2025 (`referentiel-2025.json`) ne
porte sur l'acoustique.

## Déroulé des 8 écrans

1. **Deux chemins : l'air et la structure.** Chemin aérien (onde dans l'air, ouvertures, parois
   légères) ; chemin solidien (vibration transmise par dalle, mur, tuyauteries, fixations, rayonnée
   en bruit ailleurs). On ne les traite pas pareil. *SVG animé `deux-chemins`.*
2. **Trois endroits où agir.** Source (machine plus discrète, vitesse, mode nuit), chemin (plots,
   manchettes, silencieux, écran, capot), récepteur (isoler, éloigner, protections auditives en
   dernier recours). Ordre : la source d'abord (INRS ; Code du travail R. 4432-1). *SVG fixe.*
3. **Le plot antivibratile.** Élément élastique entre machine et support ; système masse-ressort de
   fréquence propre f0 ; règle du modèle simple (voir « Démonstration » ci-dessous) ; charge par plot
   dans la plage du fabricant. *SVG animé `plot-coupe-vibration` (la vibration passe par la dalle, puis
   est coupée par les plots).*
4. **Manchettes et raccords souples.** Un tube rigide fixé à la structure court-circuite le plot ;
   raccord souple dès la sortie machine, manchette souple ventilateur/gaine, colliers à garniture
   élastique, câbles en boucle ; le souple doit rester souple. *SVG animé `pont-rigide`.*
5. **Le silencieux.** Tronçon garni d'absorbant (baffles) ; atténuation en dB (donnée constructeur) ;
   niveau sortie = niveau entrée − atténuation ; prix = perte de charge ; piège à son = même principe,
   limite aussi le bruit d'un local à l'autre par la gaine. *SVG animé `silencieux-reseau`.*
6. **Vitesse d'air et bruit.** Bruit d'écoulement (coudes, registres, grilles) qui croît très vite avec
   la vitesse ; vitesse = débit ÷ section ; agrandir la section avant d'ajouter un silencieux ; ne pas
   étrangler un registre. Aucune vitesse cible chiffrée (voir « À sourcer »). *SVG fixe.*
7. **Les erreurs classiques.** Plot écrasé ou mal choisi ; tube rigide ; mauvais chemin traité ; capot
   sans reprise d'air. *SVG fixe.*
8. **Bilan et réflexe.** Trois questions : quel chemin, où agir, y a-t-il un pont ; les quatre outils ;
   mesurer avant et après. *SVG fixe.*

## Démonstration (aucune valeur inventée, aucun chiffre normatif)

- Une machine de masse m sur des plots de raideur totale k : fréquence propre f0 = (1/2π)·√(k/m).
- Sous la charge, le plot s'écrase de la flèche statique δ = m·g/k, donc f0 = (1/2π)·√(g/δ) :
  plus la flèche est grande, plus f0 baisse. Un plot écrasé en butée (δ ne peut plus croître) ou trop
  raide pour sa charge (δ trop faible) donne un f0 trop haut : l'isolation est perdue.
- Transmissibilité, modèle à un degré de liberté sans amortissement, r = f/f0 (f = fréquence de
  l'excitation, ici la rotation) : T = 1/|1 − r²|. T < 1 ⇔ r² > 2 ⇔ f > √2·f0 : le plot n'isole qu'au-delà
  de √2·f0 ; à r = 1, résonance (amplification) ; en dessous de √2·f0, T > 1. C'est un résultat de
  calcul, pas une valeur réglementaire.
- Niveau en sortie d'un silencieux : L_sortie = L_entrée − D (D = atténuation, écart de deux niveaux en
  dB). La soustraction est licite parce que D est un *écart* de niveaux ; l'addition de deux
  *sources* suit, elle, la règle logarithmique (renvoyée à `acoustique-le-bruit-en-db`).
- Vitesse moyenne dans une gaine : v = q/S (q débit volumique, S section) ; à q constant, v décroît
  quand S croît. Relation reprise d'AéroRézo (station « Débit, vitesse, section »).

## Les 4 questions et leurs corrigés

1. *(écran 1)* Groupe sur terrasse, bruit net dans le local du dessous, faible dehors : chemin le plus
   probable ? → **solidien, la dalle transmet** (position c). Leurres : aérien par les grilles ; les deux
   indiscernables ; récepteur trop sensible.
2. *(écran 3)* Un plot n'isole que si… → **sa fréquence propre est très inférieure à celle de la
   machine** (position a). Leurres : le plus dur possible ; boulonné en plus à la dalle ; le plus large.
3. *(écran 4)* Machine sur plots, tuyauterie fixée au mur sans souple : que se passe-t-il ? → **la
   vibration contourne les plots par le tube** (position d).
4. *(écran 6)* Bouche trop bruyante, gaine trop étroite : quelle action traite la cause ? → **élargir la
   gaine pour ralentir l'air** (position b). Leurres : silencieux avant la bouche ; fermer à moitié le
   registre ; plots sous le ventilateur.

## Correspondances

- `../acoustique-pac-voisinage/` — l'unité extérieure chez le voisin.
- `../acoustique-mesurer/` — mesurer avant et après.
- `../acoustique-le-bruit-en-db/` — les décibels et leur calcul.
- https://inerweb.fr/aerorezo/ — débit, vitesse, section d'une gaine.

## Sources officielles (consultées le 30/09/2026)

1. **Code du travail, art. R. 4432-1** (version du 01/05/2008) — « L'employeur prend des mesures de
   prévention visant à supprimer ou à réduire au minimum les risques résultant de l'exposition au
   bruit, en tenant compte du progrès technique et de la disponibilité de mesures de maîtrise du risque
   à la source. » https://code.travail.gouv.fr/code-du-travail/r4432-1
2. **INRS, « Démarche de prévention » (risque bruit)** — agir sur la source est le moyen le plus
   efficace ; action sur la propagation (traitement des parois, encoffrement, écrans à effet limité) ;
   protections individuelles en dernier. https://www.inrs.fr/risques/bruit/demarche-prevention.html
3. **INRS, « Réglementation » (bruit)** — R. 4213-5 à R. 4213-6 et R. 4431-1 à R. 4437-4 ; mesures
   collectives avant individuelles. https://www.inrs.fr/risques/bruit/reglementation.html
4. **Arrêté du 30 juin 1999 relatif aux caractéristiques acoustiques des bâtiments d'habitation,
   art. 5 et 6** — objet seulement : limitation du bruit des équipements individuels (chauffage,
   climatisation, ventilation mécanique) et collectifs. Aucune valeur reprise ici.
   https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000211449 ; objet confirmé par la fiche
   ministérielle reprise sur https://aida.ineris.fr/node/38596. *(Légifrance lu par extraction
   automatique : les valeurs de l'article ne sont pas reprises, donc pas d'enjeu.)*
5. **INRS, Fiche bruit n° 49** — illustration du principe de désolidarisation (cabine séparée de la
   machine, passerelles désolidarisées, isolation vibratoire). Aucun chiffre repris.
   https://www.inrs.fr/publications/bdd/techniques-reduction-bruit/FicheBruitAG.html?refINRS=BRUIT_FicheBruit_49

Normes payantes (NF S 31-010, NF EN ISO 3744, normes d'essai des silencieux et des supports
antivibratiles) : non citées au-delà de leur existence.

## À sourcer (omis volontairement, jamais approximé)

- **Vitesses d'air maximales recommandées** dans les gaines selon le type de local (guides de
  conception, DTU, normes payantes) : non chiffrées à l'écran 6.
- **Valeurs limites d'émission sonore des équipements** de l'arrêté du 30 juin 1999 (art. 5 et 6, en
  dB(A)) : renvoyées à `acoustique-les-seuils`, à lire sur le texte consolidé.
- **Recommandations ADEME** sur l'implantation d'une unité extérieure de pompe à chaleur (écran
  acoustique, supports antivibratiles) : entrevues dans un résumé de recherche, page ADEME non lue
  (accès refusé) — non citées comme source ; à lire sur agirpourlatransition.ademe.fr avant relecture.
- **Atténuation typique** d'un silencieux à baffles, d'un écran ou d'un capot : dépend du produit ;
  aucun ordre de grandeur chiffré donné.
- **Exposant de la loi de croissance du bruit d'écoulement avec la vitesse** : l'énoncé reste
  qualitatif (« très vite »).
- **Plage de charge par plot et flèche admissible** : données fabricant, non chiffrées.

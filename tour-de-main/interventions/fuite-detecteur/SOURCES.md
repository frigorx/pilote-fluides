# Sources — gare « Chercher une fuite au détecteur électronique » (circuit chargé)

Contenu restructuré, rien d'inventé. Un seul parcours : circuit chargé en fluide, machine arrêtée.
Repérage au RAG : `chercher-rag.js` « détecteur électronique de fuite fluide frigorigène », « fuite étalon fuite de référence vérifier le détecteur avant de chercher », « L'instrument aussi se contrôle », « Méthode directe — le détecteur ».

## Le geste (ordre, dangers)
- Cours `habilitation-fluide/cours/CONTENU-04-G4-etancheite.md` § 6 (méthode directe, détecteur électronique, codes 4.07 et 4.08) : balayage à faible vitesse le long des points de fuite potentiels ; une alerte se confirme par un second passage, ventilateur à l'arrêt si possible ; « sensibilité et étalonnage : selon doc constructeur ». § « Pièges » : une fuite déjà réparée est un point à recontrôler en priorité.
- Livre HabFluide ch. 14, thèmes 4, 5 et 8 (`C:/git/livre-habfluide/contenu.gen.json`) : ordre registre, indirecte, directe ; un détecteur répond aux gaz pour lesquels il est conçu ; « l'appareil doit être vérifié avant emploi, sur une source connue, faute de quoi un résultat négatif ne prouve rien » ; balayer lentement, sonde proche de la surface, du bas vers le haut pour un fluide plus lourd que l'air ; code 4.09 : consigner date, méthode, points contrôlés, résultat, localisation, suite donnée.
- Planches `pilote-fluides/packs/fluides/res/svg/balayage-detecteur.svg` (« 1. Vérifier l'appareil au gaz de référence avant. 2. Balayage lent, au contact. 3. Alerte, second passage, ventilateurs à l'arrêt ») et `recherche-fuite-geste.svg` (contrôler, balayer, confirmer).
- Station « Détective, le contrôle qui tourne mal » (`packs/fluides/res/capsules/donnees/x4.js`) et module `etancheite-interactive` : le registre d'abord ; une alerte unique ne suffit pas ; ajouter du fluide masque le problème et ne localise rien ; la trace distingue alerte et localisation confirmée.
- Fiche de Franck « détection de fuite » (`profs cour Indexee/02_CAP-IFCA/Froid-Frigorifique/détection de fuite.docx`) : détection électronique « balayage avec reniflage au plus près de la tuyauterie » ; produit moussant « peu précis pour les petites fuites » (première approche) ; critères de choix d'un appareil (norme EN 14624, signal sonore, « possibilité de faire un contrôle de seuil annuel ») ; conseil : changer filtres, piles et capteur.
- Fiche de Franck « 15-RechercheFuite.doc » (CAP IFCA) : détecteur électronique, produit moussant, sensibilité minimale de 5 g par an.
- Documents d'atelier `7418039043_D81795.pdf` et `D81797.pdf` (BAC MFER, fonds ERM) : vérification d'un détecteur selon NF EN 14624 avec un étalon de référence calibré à 5 g par an (sens de « fuite étalon »).
- Guidance plateau `M7-guidance-hydrocarbures-r290.md`, « Gestes STOP » : émission volontaire = tout rejet de fluide à l'atmosphère (d'où : jamais la bouteille pour essayer le détecteur).
- Notice de détecteur (Fieldpiece DRX3, consultée en ligne) : après une alarme, écarter la sonde quelques secondes pour réinitialiser le capteur, puis revenir vers la fuite. Cité pour l'ordre de grandeur du geste ; la vitesse, la mise en route et la sensibilité restent celles de la notice du détecteur du poste (aucune valeur reprise).

## Texte réglementaire (seul chiffre de la gare)
- **Arrêté du 29 février 2016 relatif à certains fluides frigorigènes et aux gaz à effet de serre fluorés (NOR DEVP1604751A, JO du 10 mars 2016), article 2, I** (version modifiée notamment par l'arrêté du 29 mai 2024) : « Le détecteur est adapté au fluide frigorigène contenu dans l'équipement à contrôler » ; « Le seuil de détection des détecteurs [...] est inférieur ou égal à cinq grammes par an à la pression de service » ; « Ce seuil de détection est vérifié au moins une fois tous les douze mois ». Même article : la méthode directe comprend le détecteur mesureur ou électronique, le produit moussant (« à condition que l'ensemble des éléments de l'équipement soit accessible ») et le fluide fluorescent.
- Lu sur AIDA (INERIS), qui reproduit le texte (état affiché : « en vigueur », page consultée le 19/10/2026) : <https://aida.ineris.fr/reglementation/arrete-290216-relatif-a-certains-fluides-frigorigenes-gaz-a-effet-serre-fluores>. Légifrance n'a pas pu être ouvert par l'outil (protection anti-robot) : **à recouper par Franck sur la version consolidée de Légifrance**, d'autant que le règlement (CE) 517/2014 visé par l'arrêté a été remplacé par le règlement (UE) 2024/573.
- Pas de texte trouvé pour la vitesse de balayage, ni pour la durée ou les modalités d'une « vérification du seuil » : la gare ne demande que la date de la dernière vérification (moins de 12 mois), donnée par le professeur.

## Codes
- CAP IFCA : `skills/referentiels-froid/references/cap-ifca.md` (T16, T6, T8, T2 ; C4.3, C2.2, C2.4, C1.1 ; S5.2, S0.1, S6.2). C4.3 : « Contrôler l'étanchéité d'un circuit frigorifique chargé en fluide ».
- 1re MFER : `progression-1re-mfer/_carte-commune/inventaire/referentiel-mfer.md` (A1T3, A1T4, A4T1, A5T2 ; C4, C9, C11 ; S5 « les essais d'étanchéité », S2, S7).
- Attestation : `packs/fluides/referentiel-2025.json` (4.02, 4.03, 4.07, 4.08, 4.09, 12.02) ; couverture de `etancheite-interactive`.

## Dessin (rien dessiné à la main)
Repris de `../etancheite-azote/dessin.svg` (groupe de condensation, vannes de service A, B, C, circuit simplifié, mêmes dégradés et ombre) et de `../etancheite-azote/dessin.css`.
La sonde, le raccord à brides, le nuage de fuite et leur tracé viennent de la planche `pilote-fluides/packs/fluides/res/svg/balayage-detecteur.svg` (dessin de Franck, mêmes formes ; la sonde aller-retour est reprise de la planche, elle ne s'anime qu'à l'étape « Je balaie »).
La fuite étalon utilise le symbole « Bouteille petite » de la collection QElectroTech (`bibliotheque-symboles-energie/svg/60_energy/21_refrigeration/Frio/sinopticosfrio/recipientsetreservoirs/bouteillepetite.svg`, copié sans retouche, licence CC BY 3.0), avec la mention « PAS la bouteille de fluide ».
Changement dans `dessin.css` : `.entete{flex-wrap:wrap}` (l'en-tête de carte revient à la ligne à 390 px ; le moteur ne le fait pas, voir le compte rendu).

## Corrections du 19/10/2026 (audit de trouvabilité P1)
- Étape 1 : la consignation est faite par le professeur (décision de Franck du 01/09/2026 sur le titre B1V, voir la gare 11) et renvoie vers la gare 11. Étape 8 : « du bas vers le haut (le fluide est plus lourd que l'air) » : source HabFluide ch. 14 thème 8 (« on progresse du bas vers le haut pour les fluides plus lourds que l'air »). Cibles du « Je m'entraîne » : une seule carte par étape (balayage = détecteur, trace = point de fuite, remise = machine). Bilan de la trace : accords « 1 point », « 2 alertes ». Bande vide au-dessus du dessin sur petit écran pour le bouton « Agrandir ».

## Dessin, 22/10/2026
Détecteur portatif : `D:/git/_img-detecteur/detecteur-portatif.svg` (cours en ligne) ; étalon : flacon dessiné à la main (22/10).

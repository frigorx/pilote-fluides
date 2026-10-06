# Sources — La détente par tube capillaire (gare 5)

Consultation éditoriale : 6 octobre 2026.

## Référentiel

- `C:\git\pilote-fluides\packs\fluides\referentiel-2025.json` — transcription des codes du règlement d’exécution
  (UE) 2024/2215, annexe I. Codes relus : `9.01` (principe des vannes d’expansion, tubes capillaires compris — enseigné
  par tous les écrans), `1.02` (côtés haute et basse pression, états du fluide), `1.04` (fonction des composants),
  `9.10` (efficacité énergétique), `5.05` (remplir le système de réfrigérant sans pertes) et `5.06` (choisir la balance
  et peser le réfrigérant). Convention de `couverture.json` : celle de `detendeurs-famille/` (enseigné = `codes`,
  mobilisé = `appui`).
- Codes de charge `5.05` et `5.06` : trouvés dans `C:\git\habilitation-fluide\cours\CONTENU-05-G5-recuperation.md`
  (§ 6 « Déterminer l’état du fluide et charger sans perte », § 7 « Choisir la balance et peser »). Ils sont portés
  **en appui** seulement : l’écran « Charger la machine » fait peser la charge et montrer ce qui arrive si elle est
  fausse, mais n’enseigne ni le choix de la balance ni la méthode de remplissage (cours G5 de HabFluide).
- [EUR-Lex — règlement d’exécution (UE) 2024/2215](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215).

## Contenu métier

- `C:\Users\henni\OneDrive\Bureau\4-INERWEB\CLAUDE-ESPACE-TRAVAIL\LIGNE-DETENDEURS\findings.md` § 3, « Gare 5 » :
  tube de cuivre de très petit diamètre intérieur et de grande longueur ; la perte de charge fait la détente ; aucune
  pièce mobile, aucun réglage ; à l’arrêt les pressions s’équilibrent, le compresseur redémarre sans effort (moteur à
  faible couple de démarrage) ; pas de bouteille liquide, charge critique, à peser exactement ; souvent brasé contre la
  conduite d’aspiration (échange de chaleur) ; craint l’humidité (glace) et les impuretés, filtre déshydrateur juste
  avant ; on ne le raccourcit pas, on ne le pince pas. Rédigé par F. Henninot, **à valider** (voir REPRISE.md).
- `C:\git\habilitation-fluide\cours\CONTENU-09-G9-detendeurs.md` § 1 : « tube capillaire : simple restriction fixe
  (longueur/diamètre calibrés), pas de réglage possible, utilisé sur petites puissances ».
- `cartoclim/stations/2-5-detendre/contenu.js` (côté climatisation, non refait ici) : « un capillaire ne se règle pas :
  il se remplace, il ne se retouche pas » ; capillaire bouché = givre sur le capillaire, basse pression très basse,
  pas de froid. La gare 5 traite le froid (réfrigérateur ménager, petits meubles) ; la station CartoClim 2-5 est sa
  correspondance côté climatisation (le lien sera posé par le chat superviseur).
- Fonds de F. Henninot (RAG, `chercher-rag.js "détente par tube capillaire"`) : les documents « Détente par tube
  capillaire » et « Détente par tube capillaire (exercice) » (CAP IFCA, C3 Réaliser) ne sont indexés que par leur titre
  (fichiers absents de ce poste) : leur contenu n’a pas pu être relu.
- Les valeurs des dessins sont qualitatives (modèle en tête de `scene-capillaire.js`). La seule valeur chiffrée est la
  charge de l’exercice, **un exemple** (120 g, « juste » à 5 g près) qui n’est pas une donnée de constructeur.

## Symbole normalisé (jamais redessiné)

Copié dans `assets/symboles/` depuis `detendeurs-famille/assets/symboles/` (bibliothèque de F. Henninot,
`C:\git\usine-contenu\bibliotheque-symboles\svg\frigo_schema\`, planche Eduscol « le circuit frigorifique ») :
- `tube_capillaire.svg` — tube capillaire (trait enroulé entre deux points). `chercher-rag.js "symbole tube capillaire"
  --source ressource` propose aussi la variante QElectroTech `capillaire.elmt` ; celle de la planche Eduscol est gardée
  (cohérente avec la gare 0).

## Dessin

- `jouerezo/moteur/voyage-dessin.js` (VOYAGE_DESSIN, lu sans modification) : nappe de liquide, bulles, petites
  molécules, métaux en relief, pastilles, filigrane inerWeb.
- `../_detendeurs-commun/scenes-detendeurs.js` : `DS.bande` (évaporateur), `DS.manometre`, `DS.thermometre`,
  `DS.jouer`, `DS.animer`, `DS.fond`, `DS.svg`, `DS.sortie`, `DS.symbole`.
- `scene-capillaire.js` : briques ajoutées à cette gare, car la brique commune n’a pas le capillaire en situation avec
  des prises de pression le long du tube : « construireA » (conduite haute pression, filtre déshydrateur, capillaire,
  plaque d’extrémité percée de l’évaporateur, manomètres sur le tube, bulles avant la sortie, bouchon de glace et
  givre, jauge d’effort du moteur) ; « construireB » (capillaire brasé contre l’aspiration, quatre thermomètres) ;
  `arrondi` (coins arrondis) et `dent` (givre). Fluide continu : les murs d’abord, les vides ensuite ; le vide de la
  conduite traverse la paroi du filtre, celui du capillaire traverse la paroi du filtre et la plaque de l’évaporateur,
  les prises de pression traversent la paroi du tube et le bord du manomètre ; aucun trait de paroi dans le passage
  du fluide.
- Aucune photo, aucune image générative, aucune ressource distante.

# Sources — Le détendeur MOP (gare 3)

Consultation éditoriale : 6 octobre 2026.

## Référentiel

- `C:\git\pilote-fluides\packs\fluides\referentiel-2025.json` — transcription des codes du règlement d’exécution
  (UE) 2024/2215, annexe I. Codes relus : `1.02` (surchauffe), `1.04` (fonction des composants dont les détendeurs
  thermostatiques), `9.01` (principe des vannes d’expansion), `9.02` (installer des vannes dans la bonne position),
  `9.03` (régler un détendeur : **non enseigné ici**, aucun écran n’apprend à régler), `9.10` (efficacité
  énergétique pendant l’installation ou la maintenance des détendeurs). Convention de `couverture.json` : celle de
  `detendeurs-famille/` (enseigné = `codes`, mobilisé = `appui`).
- [EUR-Lex — règlement d’exécution (UE) 2024/2215](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215).

## Contenu métier

- `C:\Users\henni\OneDrive\Bureau\4-INERWEB\CLAUDE-ESPACE-TRAVAIL\LIGNE-DETENDEURS\findings.md` § 3, « Gare 3 » :
  MOP = pression maximale de fonctionnement ; charge du bulbe LIMITÉE, au-delà d’une température tout le liquide est
  vaporisé et la pression du bulbe ne monte presque plus ; le détendeur ne peut plus ouvrir davantage, la BP reste
  plafonnée ; utile au démarrage d’une chambre chaude (mise en régime : le moteur du compresseur n’est pas
  surchargé) ; condition de montage : la tête reste plus chaude que le bulbe, sinon la charge migre vers la tête
  (elle s’y condense) et le détendeur perd le contrôle ; la valeur MOP est marquée sur l’élément thermostatique
  (voir la notice), elle n’est jamais inventée dans le cours. Rédigé par F. Henninot, **à valider** (voir REPRISE.md).
- Les valeurs des dessins sont qualitatives (modèle en tête de `scene-mop.js`) : aucun chiffre de chantier, aucune
  valeur de MOP.

## Symbole normalisé (jamais redessiné)

Copié dans `assets/symboles/` depuis `detendeurs-famille/assets/symboles/` (bibliothèque de F. Henninot,
`C:\git\usine-contenu\bibliotheque-symboles\svg\frigo_schema\`, planche Eduscol « le circuit frigorifique ») :
- `detendeur_thermo_int.svg` — détendeur thermostatique (le détendeur MOP porte le même symbole : il ne diffère
  que par la charge de son bulbe). `chercher-rag.js "symbole détendeur thermostatique" --source ressource` propose
  aussi des symboles QElectroTech ; celui de la planche Eduscol est gardé : il est cohérent avec les autres gares.

## Dessin

- `jouerezo/moteur/voyage-dessin.js` (VOYAGE_DESSIN, lu sans modification) : nappe de liquide, bulles, petites
  molécules, métaux en relief, pastilles, filigrane inerWeb.
- `../_detendeurs-commun/scenes-detendeurs.js` : `DS.bande` (évaporateur et tube de sortie), `DS.manometre`,
  `DS.thermometre`, `DS.jouer`, `DS.animer`, `DS.fond`, `DS.svg`.
- `scene-mop.js` : briques ajoutées à cette gare, car la brique commune n’a ni bulbe ouvert en coupe, ni capillaire
  qui entre dans la tête et le bulbe, ni migration de la charge, ni jauge de BP à « plafond » : le bulbe ouvert en
  coupe (charge limitée), la coupe complète (tête, aiguille, évaporateur, jauges, thermomètres) et le gros plan du
  bulbe. Fluide continu : un tube = une paroi + un intérieur d’un seul tenant ; le vide du capillaire traverse
  l’écrou, la tête et la paroi du bulbe ; les raccords des jauges traversent la paroi du tube et le bord de la jauge.
- Convention de couleurs de la ligne (retour de F. Henninot, 06/10) : violet pour la charge du bulbe et sa pression, bleu pour la pression
  d'évaporation, gris acier pour le ressort ; légende HTML sous les coupes.
- Aucune photo, aucune image générative, aucune ressource distante.

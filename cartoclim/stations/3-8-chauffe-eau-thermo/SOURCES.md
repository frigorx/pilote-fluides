# Sources — 3.8 Le chauffe-eau thermodynamique : la chaleur de l’air pour l’eau chaude

## Images
- **Aucune photographie.** Le temps 1 montre deux symboles de la bibliothèque, et le dit (« Pas de photographie libre de marque… »).
- Cherchées par `node outils/chercher-images.mjs` : « chauffe-eau thermodynamique », « ballon eau chaude sanitaire chauffe-eau
  électrique », « groupe de sécurité », « mitigeur thermostatique », « anode… », « coupe chauffe-eau électrique », « pompe à chaleur
  eau chaude sanitaire… ». Toutes regardées dans le cache, toutes écartées :
  - `594652ca692e.png` (Pieces_detachees_FR.pdf) : un visuel de catalogue sur fond noir, deux cuves dont l’une porte un module : rien n’y montre un chauffe-eau thermodynamique ;
  - `40f81d2242cf.png` (Pieces_detachees_FR.pdf) : visuel de catalogue d’un fabricant (chauffe-eau à conduits de fumées dans un hall) : pas un thermodynamique ;
  - `3e2162f0eefc.png` : scan d’une fiche avec logos d’organismes ;
  - `c8016b2b49ea`, `dbdaffcc3186`, `6527552b30a5`, `2897a2282f53`, `4a1a913d3cdb`… : chauffe-eau électriques ordinaires, marque lisible ou visuel de catalogue ;
  - `0c51ed4b15d7.png` : vue éclatée d’un chauffe-eau, marque lisible ;
  - `4ec4a3713fa9.jpeg` : ballon avec un vase d’expansion rouge, visuel de fabricant, pas un thermodynamique ;
  - `620119ac33ea.png` : coupe d’un chauffe-eau électrique tirée d’un sujet de contrôle en continu : image tierce, refusée (charte R7).
- Les images `p*-img*.png` de `briefs/_sources-th10/` (logos du constructeur du banc et de la marque du ballon) : consultées comme
  documentation seulement, **aucune reprise**.

## Symboles (`assets/`)
Copiés de `assets/symboles/`, rien n’a été redessiné. Collection QElectroTech, CC BY 3.0.
- `termo-electrico.svg` — temps 1 : chauffe-eau électrique ordinaire (cuve, éclair, deux raccords d’eau, l’un rouge, l’autre bleu).
- `interacumulador.svg` — temps 1 et 4 : ballon avec échangeur (tube replié qui traverse la cuve).
- `ballon_ecs_elec.svg` — temps 4 : ballon d’eau chaude électrique (zigzag en bas = résistance, petits traits = raccords).
- `pac_air_eau_ui.svg` : non retenu (un boîtier gris, sans rapport avec un ballon).
- Il n’existe pas de symbole du chauffe-eau thermodynamique : la station le dit au temps 4 et le lit comme « un ballon + une pompe à chaleur ».

## Chiffres : uniquement ceux du banc du lycée
Source : **fiche du constructeur du banc ERM TH10** (`briefs/_sources-th10/fiche-TH10.md`, tirée de
https://www.erm-automatismes.com/d000690-chauffe-eau-thermo.pdf, récupérée le 03/10/2026). Citée comme « le chauffe-eau du banc ».
- 200 litres · fluide R-134a · 750 W au plus absorbés par la pompe à chaleur · 1 800 W absorbés par la résistance ;
- COP annoncé par le constructeur : **2,8** (la fiche écrit aussi 2,88 : non cité), jamais présenté comme une valeur générale ;
- instrumentation : manomètres HP et BP, compteur électrique sur la PAC, compteur électrique sur la résistance, compteur d’énergie
  (volume, températures, débit, puissance, énergie) sur l’eau chaude, lavabo avec mitigeur thermostatique, horloge qui simule les
  heures creuses et les heures pleines ; cuve émaillée avec anode de magnésium et résistance blindée ; groupe de sécurité ; panneau de
  commande digital ; chauffe-eau « commercialisé auprès des particuliers », placé « dans les pièces non chauffées (cave, lingerie, garage) ».

## Fond — ce qui a servi, et pour quelle phrase
Lus dans les originaux avec `antiword` (la copie Markdown du fonds indique « NON_DISPONIBLE (format ancien non extrait) » pour ces .doc) :
- **Cours l’eau chaude sanitaire prof.doc** (03_BAC-MFER/S3-Hydraulique, aussi `profs cour/SORGU/…`) : le ballon est un ballon de
  stockage à cuve émaillée ; le groupe de sécurité est sur l’entrée d’eau froide, une soupape laisse échapper l’eau par un tuyau
  de vidange ; liste des organes (cuve émaillée, résistance, anode en magnésium, déflecteur).
- **eau chaude sanitaire.doc** (03_BAC-MFER/S3-Hydraulique) : l’eau chaude, plus légère, reste en partie haute sans se mélanger à
  l’eau froide (couches) ; la canne de puisage prélève en haut ; l’anode de magnésium se détruit avant l’acier et protège la cuve ;
  le groupe de sécurité est sur l’arrivée d’eau froide, protège contre l’augmentation de pression due à la dilatation de l’eau
  chauffée, et réunit robinet d’arrêt, clapet anti-retour, soupape et vidange.
- **Ballon - Elec.doc** : même logique de l’anode (magnésium contre cuivre et acier), chauffe-eau alimenté en heures creuses.
- **TP Raccordement chauffe-eau electrique.doc** (fonds CAP) : la tuyauterie du raccordement se fait à partir du groupe de sécurité ;
  **TP 01 - Ballon ECS.odt** : raccordement électrique d’un ballon (aucune phrase reprise).
- **Station HydroMétro, Sécurité** (`C:\git\hydrometro\stations\securite`) : « un rejet ne se bouche jamais », rejet visible et
  dirigé vers un endroit sûr ; lien `https://inerweb.fr/hydrometro/stations/securite/`.
- **Station Législation, RGE et QualiPAC** (RAG) : citée en correspondance pour la mention RGE et les aides, sans rien en affirmer.
- **Station 3.7** (PAC air/eau) : le même cycle, le condenseur à plaques (opposé ici au tube enroulé), le renvoi vers HydroMétro.

## Posé par la fiche de la station (F. Henninot), sans document du fonds
Le condenseur en tube enroulé contre la paroi extérieure ; l’air qui ressort plus froid et plus sec ; la pose en pièce non
chauffée ou la gaine vers l’extérieur, et la pièce chauffée dont il prend la chaleur du chauffage ; le monobloc fermé et chargé en
usine, les modèles en deux parties ; le mitigeur thermostatique « souvent » en sortie ; la résistance d’appoint (air trop froid,
besoin pressé) ; les modes « pompe à chaleur seule / avec appoint / appoint forcé » ; les pièges (pièce trop petite, gaine écrasée,
cuve mise sous tension à vide, écoulement du groupe de sécurité non raccordé).

## Omis, faute de source primaire (on n’approxime pas)
- La pression de tarage du groupe de sécurité (le cours indique 7 bars) : non reprise.
- La température de coupure de sécurité du thermostat du cours (95 °C) et toute température de consigne ou d’eau sanitaire ;
  toute durée de chauffe ; tout volume minimal de pièce ; toute longueur ou section de gaine ; toute valeur légionelle.
- L’intervalle de contrôle de l’anode (le cours en donne un) : la station dit seulement « elle se contrôle ».
- La puissance totale du banc (2 550 W), le « jusqu’à 70 % d’économie », le COP 2,88, les options TH11 et PC22 (sondes).
- Les potentiels électrochimiques de l’anode (cours « Ballon - Elec »).
- La fonction du mitigeur thermostatique est donnée en une phrase d’usage (il mélange l’eau chaude et l’eau froide pour tenir la
  température réglée) : la fiche « D-Mitigeur ECS-1.pdf » du fonds n’a pas pu être extraite, donc aucune valeur ni réglage.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.

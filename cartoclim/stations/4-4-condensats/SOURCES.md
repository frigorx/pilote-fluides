# Sources — 4.4 Les condensats : pente, siphon, pompe de relevage

## Photographies (`assets/biblio/`)
- `cfaf6a5176.jpeg` — deux mains ouvrent la façade d'une unité intérieure murale (filtres, batterie).
  Image du fonds de cours, présentation `pp.clim - Copie.pptx` (dossier S1-Analyse), md5 `cfaf6a51765f…`.
  Originale en PNG 1596 × 997 (1,4 Mo) : réduite à 1000 px de large et recompressée en JPEG pour la page,
  sans autre retouche. Aucun filigrane, aucun logo visible.
- `e2e7fed2c7.jpeg` — unité extérieure posée sur des plots, tuyau noir au pied. Image du fonds de cours,
  document `PRWA1000005A_Installation PAC-WT05.pdf` (dossier S2-Systemes), md5 `e2e7fed2c70f…`.
  Aucun filigrane, aucun logo visible. La légende ne dit rien du tuyau noir (sa fonction n'est pas établie).

Trouvées par `node outils/chercher-images.mjs "mains ouvrent climatiseur mural filtres batterie évaporateur" --photo`
et `"évacuation des condensats tuyau bac unité intérieure" --photo`. Les autres images copiées ont été effacées.

Écartées après vérification :
- mini-pompe de relevage « Source France-Air » (`4a44ea4bb213`) : cadre et crédit d'un site tiers ;
- planche de pompes « Siccom » (`9cd30e8684a0`) : publicité de constructeur ;
- collage « 5 — entourer les éléments de la liaison » (`7e622f484c99`) : logo « climania.fr » sur la pompe ;
- unité intérieure ouverte (`dc1175c4ea55`) : filigrane « BRICOVIDEO » ;
- schémas de montage de la pompe et de son tube (`c6ca0ec8d925`, `8c8f92a7f374`, page 2 et 4 du document sur la
  pompe de relevage) : dessins de catalogue constructeur, non repris ;
- siphon et raccord PVC (`1f21ee875886`, `6bc03d7c26a0`) : vignettes de 120 à 180 px, illisibles à l'écran.
Aucune photo propre d'une pompe de relevage dans la base : la pompe est montrée par la scène du temps 2 et
par son symbole au temps 4.

## Symboles (`assets/`)
- `bomba-condensados.svg`, `split-pared.svg` — bibliothèque inerWeb, collection QElectroTech (CC BY 3.0),
  copiés tels quels depuis `assets/symboles/`, rien n'a été redessiné.

## Ce que dit le fonds, et où la station l'emploie
- **Pente de 3 cm par mètre au moins ; préférer l'évacuation naturelle (gravitaire) ; pompe de relevage
  « dans la goulotte » ou « sur le parcours de la tuyauterie »** — `MONTAGE CLIMATISEUR SPLIT.docx` (et .pdf),
  fiche de montage, rubrique « Évacuation des condensats ». Seule valeur chiffrée de la station. Citée à
  l'écran comme « d'après la fiche de montage du split » et dans les Crédits.
- **« Bien prévoir l'évacuation des condensats si l'appareil est réversible »** — texte d'une image de la même
  fiche : mode chaud, eau à prévoir.
- **Toute machine qui refroidit produit de l'eau, il faut systématiquement prévoir son évacuation** — rappel du
  document `10.2 Électricité (alimentation pompe de relevage).pdf`, page 1.
- **Contact de la pompe : commun, contact à ouverture (NC), contact à fermeture (NO) pour une alarme visuelle
  ou sonore quand le niveau d'eau maximal est atteint** — même document, page 5 (schéma de branchement). La
  station dit seulement : « contact de sécurité qui coupe le froid, ou déclenche une alarme, selon le
  branchement ». Aucun repère de borne n'est repris (c'est la station 4.5 et la notice de la pompe).
- **Siphon : bouchon d'eau permanent qui évite les remontées d'odeurs depuis les évacuations** — `Raccordement des
  Eaux Usées.doc` (fonds, dossier C3-Realiser). La hauteur de garde d'eau chiffrée dans ce document n'est
  pas reprise (elle vise les appareils sanitaires, pas une évacuation de condensats).
- **Quand l'écoulement par gravité est impossible, on relève** — `16.L'évacuations des eaux usées prof.doc`
  (fonds, dossier C3-Realiser), rubrique « station de relevage ».
- **Dégivrage : le givre fond, l'eau part au bac** — planche « Le givre étouffe l'échange — le dégivrage le
  libère » (fonds fluides) ; renvoi à la station 2.7.

## Ce qui n'est PAS dans le fonds, donc dit sans chiffre
- l'air refroidi sous son point de rosée dépose son eau (renvoi à la station 1.4) ;
- un point bas retient l'eau, le tuyau se remplit, le bac déborde ;
- un tuyau d'eau froide non isolé dans un local chaud et humide se couvre de gouttes ;
- en mode chaud, l'eau se forme sur la batterie extérieure et au dégivrage, et peut geler dehors.
Aucun diamètre de tuyau, aucune hauteur de refoulement, aucune hauteur de garde d'eau, aucune température de
gel, aucun calibre : ils viennent de la notice de l'appareil et de celle de la pompe.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.

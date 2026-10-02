# Sources — 5.3 L'entretien : filtres, batteries, bac à condensats

## Photographie (`assets/biblio/`)
- `200d7774b1.jpg` — deux mains gantées ouvrent la façade d'une unité intérieure murale : les filtres en grille
  sombre apparaissent, un flacon pulvérisateur est tenu devant. Trouvée dans
  `03_BAC-MFER/S1-Analyse/pp.clim - Copie.pptx`. Aucun logo ni filigrane visible. Image d'origine 1 497 × 942
  (PNG, 1,5 Mo) réduite à 1 000 × 629 et enregistrée en JPEG pour alléger la page ; rien d'autre n'a été changé.
  **Origine probable : banque d'images ou site tiers, repris dans un diaporama de cours** — rien ne le prouve ni ne
  l'exclut. À remplacer par une photo d'atelier si Franck en a une (filtres d'un mural ouvert, sans flacon).

Trouvée par `node outils/chercher-images.mjs "entretien maintenance climatiseur" --photo --copier 5-3-entretien`
(après `"unité intérieure façade ouverte filtre à air"` et `"batterie encrassée ailettes nettoyage"`).
Écartées (effacées) :
- `dc1175c4ea` — unité murale façade ouverte, les filtres bien visibles, mais **filigrane « BRICOVIDEO »** (site tiers) ;
- `08e5595a93` — housse orange de nettoyage de batterie, **seau marqué du logo d'un fabricant** (image de catalogue) ;
- `6078d74b31` — gros plan d'un échangeur à ailettes nettoyé à la lance, tiré d'un **catalogue constructeur** ;
- `34dfe67af6` — technicien sur un groupe de grande taille (pas un split), hors sujet ;
- les unités extérieures portant le logo d'une marque (Technibel, Sanden, Airton, Fujitsu, Toshiba), plusieurs vues
  de catalogue, un groupe à deux hélices sans rapport avec un split, un montage de charge en fluide (hors sujet),
  un groupe extérieur ouvert et arraché (`b9b47575f8`, photo de dégât, sans lien avec l'entretien).
Aucune photo propre de **batterie extérieure encrassée** ni de **bac à condensats** n'a été trouvée dans la base.
Le temps 1 n'a donc qu'une photo ; le dessin du temps 2 montre le reste.

## Symboles (`assets/`)
- `split-pared.svg`, `ud-exte-split.svg` — bibliothèque inerWeb, collection QElectroTech (CC BY 3.0), copiés de
  `assets/symboles/`, rien redessiné. Il n'existe pas de symbole propre à l'entretien.

## Scènes et pictogrammes (`scenes.js`)
Dessins originaux écrits pour cette station : le schéma des six points, les pictogrammes des aptitudes (grille de
filtre, horloge, cadenas ouvert) et la loupe du récapitulatif. Ce ne sont pas des symboles de la bibliothèque.

## Ce qui est sourcé, point par point
- **La liste des contrôles de la visite** (câbles serrés sur les borniers, sondes bien raccordées et bien en contact
  avec les échangeurs — au besoin avec de la pâte de contact —, évacuation des condensats vérifiée en faisant couler
  de l'eau dans le bac, pompe d'évacuation si elle existe, état des filtres « à nettoyer ou à changer si nécessaire »,
  propreté des échangeurs, mesures de températures et de pressions, traitement des points d'oxydation, rapport de
  mesures pour le suivi, et la mention « procédure en accord avec la législation en vigueur ») :
  **Climatiseur split_2.pdf** (fonds Bac pro MFER, p. « Entretien et maintenance », document AFPA 2001).
  Les courbes pression/température de ce document concernent un appareil au R22 : **aucune valeur reprise**.
- **Batterie extérieure sale : la haute pression monte, la machine consomme plus, la sécurité finit par couper** ;
  accès qui permette encore de nettoyer ; relevé « mesures ET conditions », température extérieure en premier :
  HabFluide ch. 10 « Le condenseur » (`livre:HabFluide/ch10-theme-1` et `-theme-5`), et planche
  « Le condenseur à air : l'air emporte la chaleur » (pilote-fluides, `res/svg/echangeur-air.svg`).
- **Nettoyage à l'eau basse pression ou au peigne à ailettes, jamais au jet haute pression direct sur les ailettes ;
  contrôle visuel des ailettes (poussière, feuilles, pollen)** : cours habilitation G7, « Condenseurs — 9. Inspection
  de la surface » (`CONTENU-07-G7-condenseurs.md`).
- **Filtre encrassé : l'évaporateur givre, premier réflexe = débit d'air (filtre, ventilateur)** ; bac de condensats
  plein, ailettes bouchées, ventilateur sans vibration anormale : HabFluide ch. 11 « L'évaporateur »
  (`livre:HabFluide/ch11-theme-1` et `-theme-5`), cours habilitation G8 « Inspecter la surface de l'évaporateur »,
  planches « Le givre étouffe l'échange » (ailettes propres et non écrasées, écoulement libre, filtre).
- **Ailettes en aluminium, tubes en cuivre** : dossier machine CTA (WA10, fonds ERM). Pour un split, c'est aussi
  ce que dit la fiche de station.
- **Toute intervention sur le circuit du fluide réservée à du personnel habilité** : dossier technique FG10 (fonds ERM),
  « Toutes les interventions sur le circuit fluidique doivent être réalisées par du personnel habilité ».
- **Fiche d'intervention, relevé des paramètres** : `fiche d'intervention clim froid.docx` et planche « Deux papiers,
  deux rôles » (la fiche d'intervention trace l'équipement, le fluide, les quantités). Aucun numéro de formulaire repris.
- **Périodicité « définie au contrat »** : `Contrat Maintenance VIVAL par SMPAC.docx` (fonds Bac pro MFER), lu
  seulement dans son résumé indexé ; **aucune périodicité reprise**.
- **Renvois** : AéroRézo, « Mélange et filtration » (`https://inerweb.fr/aerorezo/stations/melange-filtration/`) ;
  Thermo-techno, surchauffe et sous-refroidissement (gare 5.4) et étanchéité (gare 4.6) ; condensats (gare 4.4) ;
  régulateur électronique et sondes (gare 5.2) ; unités intérieures (gare 3.3).

## Dits de métier non retrouvés dans le fonds (à valider par Franck)
- « L'utilisateur lave ses filtres » : vient de la fiche de station ; le fonds dit seulement « les nettoyer ou les
  changer si nécessaire ». La station écrit « il les lave, ou les change si c'est nécessaire ».
- « Filtre bouché : la batterie reçoit moins de chaleur et givre » : le fait (givre = manque d'air, filtre en tête)
  est sourcé ; la formulation « reçoit moins de chaleur » est la mienne.
- « Le technicien verse de l'eau dans le bac et regarde si elle ressort » : repris de la liste du fonds
  (« faire couler de l'eau dans le bac ») ; « au bout du tuyau » est ma précision.
- « Un jet puissant couche les ailettes ; un produit agressif les ronge » : le fonds donne l'interdit du jet haute
  pression direct ; l'effet sur l'aluminium (« ronge », « couche ») est de la fiche de station et du métier, non sourcé
  mot à mot. Aucun produit nommé, aucun dosage.
- « Lire une pression, c'est brancher un manomètre sur le circuit : seule une personne attestée le fait » : c'est mon
  raisonnement à partir de « toute intervention sur le circuit exige du personnel habilité » ; à confirmer.
- « On arrête l'appareil et on coupe son alimentation avant d'ouvrir un capot » : précaution de bon sens ; le fonds
  dit seulement « précautions particulières, procédure en accord avec la législation ». Aucun terme réglementaire
  (consignation, habilitation électrique) n'est employé.
- Pompe de relevage « elle doit démarrer » : le fonds dit « vérifier le bon fonctionnement de la pompe ».

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.

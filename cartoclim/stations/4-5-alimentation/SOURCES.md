# Sources — 4.5 Alimenter et relier les deux unités

## Photographies (`assets/biblio/`)
- `38209cca50.jpeg` — un chantier réel : unité extérieure fixée à un mur en pierre, manifold, pompe à vide,
  échelle et dévidoir de câble. Trouvée dans le document de cours « Lycée Professionnel Privé.docx ».
  Une plaque de marque est visible sur l'unité mais illisible à la taille de l'image ; aucun filigrane.
- `96c264b646.png` — couronne de câble à quatre fils, avec médaillon sur l'extrémité dénudée. Trouvée dans
  le document de cours « Copie de TP CLIM.docx ». Visuel de type boutique, sans logo ni filigrane.
  **Origine réelle non établie** : à remplacer si l'architecte préfère.

Trouvées par `node outils/chercher-images.mjs` (requêtes : bornier unité extérieure, trappe de câblage,
interrupteur de proximité, câble d'interconnexion, tableau électrique, goulotte, fil de terre).
Écartées : photo de l'unité intérieure ouverte (filigrane « BRICOVIDEO »), kit d'installation d'un constructeur
(logo et texte commercial), triptyque « climatisation domestique » (image générée pour la page « Le métier »,
dérogation de Franck limitée à cette page), tableau électrique de catalogue, diapositive de consignation
(cadre de présentation tiers), photos d'ensembles déjà employées par la station 3.2.
Aucune photo de bornier ouvert n'était exploitable sans marque ou filigrane : le temps 4 montre les symboles.

## Symboles (`assets/`)
- `ud-exte-split.svg`, `split-pared.svg` — `assets/symboles/` (bibliothèque inerWeb, collection QElectroTech, CC BY 3.0).
- `disjonct-m_1fn.svg` (disjoncteur phase + neutre), `interrupteur_sectionneur_biphase.svg` (interrupteur de
  proximité), `bornier5x.svg` (bornier), `terre.svg` — `C:\git\bibliotheque-symboles-energie\svg\10_electric\10_allpole\`
  (sous-dossiers `200_fuses_protective_gears`, `130_terminals_terminal_strips`, `110_network_supplies`).
  Seul changement : le fond blanc `#ffffff` remplacé par `#fffdf8` (charte). Aucun symbole redessiné.
- La scène du temps 2 et le récapitulatif sont des schémas de principe en blocs et en fils ; ils ne redessinent
  aucun symbole. Les pictogrammes du temps 3 (bouclier, deux unités reliées, fiche) sont des icônes, pas des symboles.

## Fond (texte)
- `MONTAGE CLIMATISEUR SPLIT.docx` : deux câbles rigides (alimentation, liaison entre les deux unités) ; borniers à
  codes couleur et repérages ; disjoncteur dédié (circuit spécialisé), à cause du pic de démarrage du moteur.
- `10.1 Eléctricité (alimentation monosplit).pdf` : un câble d'alimentation arrive aussi à l'unité extérieure ;
  bornes d'exemple (neutre, phase, deux fils pilotes de communication, terre) ; le choix du câble et de la
  protection tient compte de la puissance, du type d'alimentation et de la distance. Sections et nombre de fils
  de l'exemple **non repris**.
- Notice d'un split mural (`IM_42HQEF_FR.pdf`) : ligne réservée au climatiseur, pas d'autre appareil dessus ;
  disjoncteur ; interrupteur coupant tous les pôles à défaut de fiche ; terre à contrôler ; branchements faits par
  l'installateur ; boucle du câble contre l'eau ; erreur de branchement hors garantie. Types de câble, valeurs
  (distance entre contacts, délai d'attente, tensions) **non repris**.
- `10.2 Eléctricité (alimentation pompe de relevage).pdf` : fiche vierge à compléter, sans contenu exploitable ici
  (sa matière revient à la station 4.4).
- `Mise en service et charge en fluide frigorigène` : aucun contenu électrique exploitable.
- Renvois : ÉlectroRézo (stations 4.3 disjoncteur magnéto-thermique, 4.5 interrupteur différentiel, 4.10 choisir
  la section) ; HoCourant, module « Mettre en sécurité : la consignation ».

## Ce qui est volontairement absent
Calibre de protection, section et type de câble, valeur du différentiel, délais, distances : « ceux de la notice ».

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.

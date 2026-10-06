# Sources — Le détendeur automatique (gare 4)

Consultation éditoriale : 6 octobre 2026.

## Référentiel

- `C:\git\pilote-fluides\packs\fluides\referentiel-2025.json` — transcription des codes du règlement d’exécution
  (UE) 2024/2215, annexe I. Codes relus : `1.02` (surchauffe), `1.04` (fonction des composants dont les détendeurs
  thermostatiques), `9.01` (principe des vannes d’expansion), `9.03` (régler un détendeur mécanique ou électronique :
  **enseigné à l’écran 4**, l’élève tourne la vis et lit la BP), `9.10` (efficacité énergétique pendant l’installation
  ou la maintenance des détendeurs). Convention de `couverture.json` : celle de `detendeurs-famille/` et de la gare 3
  (enseigné = `codes`, mobilisé = `appui`).
- [EUR-Lex — règlement d’exécution (UE) 2024/2215](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215).

## Contenu métier

- `C:\Users\henni\OneDrive\Bureau\4-INERWEB\CLAUDE-ESPACE-TRAVAIL\LIGNE-DETENDEURS\findings.md` § 3, « Commun » et
  « Gare 4 » : membrane entre un ressort réglable (il ouvre) et la pression d’évaporation (elle ferme) ; BP sous la
  consigne il ouvre, au-dessus il ferme ; il tient la pression d’évaporation (donc la température d’évaporation), pas
  la surchauffe ; son piège : charge en hausse, BP en hausse, il FERME juste quand l’évaporateur a besoin de plus de
  fluide, charge en baisse il OUVRE, risque de retour de liquide ; réservé aux machines à charge constante, exemple
  validé par F. Henninot (06/10) : les machines à glace en écailles (sans nom de marque, pas la fontaine réfrigérée) ;
  à l’arrêt du compresseur la BP monte, il reste fermé ; la vis règle la consigne de pression, on ne la tourne qu’après
  mesure, un peu à la fois, en laissant stabiliser. Rédigé par F. Henninot, **à valider** (voir REPRISE.md).
- Les valeurs des dessins sont qualitatives (modèle en tête de `scene-automatique.js`) : aucun chiffre de
  constructeur ; le repère vert de l’exercice est « un exemple », la vraie valeur vient de la notice de la machine.

## Symbole normalisé (jamais redessiné)

- `assets/symboles/vanne_pression_constante.svg` — **QElectroTech, licence CC BY 3.0**, élément `valv-pres-cte`
  (« vanne à pression constante », famille frigorifique de la collection QElectroTech ; fichier source
  `C:\git\_wt-detendeurs\symboles\svg\valv-pres-cte.svg`, voir `symboles/LICENCE.md`). Copié depuis
  `detendeurs-famille/assets/symboles/` (gare 0), sans modification du dessin ; gardé par F. Henninot (06/10) pour le
  détendeur automatique, la bibliothèque inerWeb n’ayant pas de symbole propre. Citation côté élève : bouton
  « Sources » de l’en-tête (fenêtre), version imprimable, commentaire dans le fichier SVG.

## Dessin

- `jouerezo/moteur/voyage-dessin.js` (VOYAGE_DESSIN, lu sans modification) : nappe de liquide, bulles, petites
  molécules, métaux en relief, pastilles, filigrane inerWeb.
- `../_detendeurs-commun/scenes-detendeurs.js` : `DS.coupe("automatique")` (la coupe de la ligne, pilotée par
  `{ charge, ouverture }`), `DS.manometre`, `DS.jouer`, `DS.animer`, `DS.fond`, `DS.svg`, `DS.besoin`.
- `scene-automatique.js` : briques ajoutées à cette gare, car la brique commune n’a ni flèches de force sensibles à
  l’écart ressort / pression, ni repère de consigne sur le manomètre, ni courbe de BP, ni bilan « ce qu’il faut /
  ce qui passe », ni gros plan de la tête avec une vis qui se visse : voir l’en-tête du fichier.
- Aucune photo, aucune image générative, aucune ressource distante.

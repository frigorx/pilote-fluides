# Sources — Le détendeur électronique (gare 6)

Consultation éditoriale : 6 octobre 2026.

## Référentiel

- `C:\git\pilote-fluides\packs\fluides\referentiel-2025.json` — transcription des codes du règlement d’exécution
  (UE) 2024/2215, annexe I. Codes relus : `1.02` (surchauffe), `1.04` (fonction des composants dont les détendeurs),
  `9.01` (principe des vannes d’expansion), `9.03` (régler un détendeur mécanique ou **électronique**, enseigné par
  l’écran 4 : l’élève règle la consigne de surchauffe sur le régulateur), `9.10` (efficacité énergétique des
  détendeurs et autres composants). Convention de `couverture.json` : celle de `detendeurs-famille/` et de
  `detendeur-mop/` (enseigné = `codes`, mobilisé = `appui`).
- [EUR-Lex — règlement d’exécution (UE) 2024/2215](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215).

## Contenu métier

- `C:\Users\henni\OneDrive\Bureau\4-INERWEB\CLAUDE-ESPACE-TRAVAIL\LIGNE-DETENDEURS\findings.md` § 3, « Commun » et
  « Gare 6 » : un transmetteur de pression et une sonde de température à la sortie de l’évaporateur ; le régulateur
  calcule la surchauffe (température mesurée − température de saturation lue à partir de la pression) et commande la
  vanne ; moteur pas à pas (ouverture progressive) ou bobine par impulsions (ouvert/fermé par cycles de quelques
  secondes, la durée d’ouverture dose) ; surchauffe plus faible et plus stable, grande plage de puissance, compatible
  variateur ; à l’arrêt la vanne se ferme (par impulsions : elle fait aussi électrovanne ; pas à pas : fermée par le
  régulateur, certains modèles avec réserve d’énergie). Rédigé par F. Henninot, **à valider** (voir REPRISE.md).
- `C:\git\habilitation-fluide\cours\CONTENU-09-G9-detendeurs.md` (HabFluide G9, § 3, `9.03`) : « le détendeur
  électronique : la consigne se règle via un contrôleur, le moteur pas à pas ajuste l’ouverture » ; on laisse
  stabiliser l’installation avant de mesurer ; repère « surchauffe cible 5 à 10 K, valeur générale, à confirmer avec la
  notice » → la zone « juste » de l’exercice (5 à 10 K, **exemple**) reprend ce repère.
- Les valeurs des dessins sont qualitatives ou marquées « exemple » (pastille sur l’écran du régulateur, mot
  « exemple » à côté de la consigne) ; la vraie consigne vient de la notice du constructeur.
- Correspondances (liens posés par le chat superviseur) :
  - `packs/fluides/res/regulateur-electronique-interactif/` (« Le régulateur électronique ») : le régulateur d’un
    détendeur électronique est un régulateur comme celui de cette station (sondes, bornier, paramètres). Renvoi pour le
    câblage des sondes (dossier « Câbler », écran des sondes) et la programmation (dossier « Programmer »). Cette gare
    ne refait ni le câblage ni les paramètres : elle traite la VANNE et la boucle de surchauffe.
  - `cartoclim/stations/2-5-detendre/` (CartoClim 2.5, détendeur électronique d’un split Inverter) : même vanne à
    moteur pas à pas ; CartoClim traite le cas de la climatisation et renvoie à sa station 5.4 pour la mesure de la
    surchauffe. Cette gare traite la boucle de surchauffe en froid commercial et la vanne à impulsions.

## Symboles normalisés (jamais redessinés)

Recherche : `chercher-rag.js "symbole détendeur électronique" / "symbole sonde de température" / "symbole capteur de
pression" --source ressource`. Copiés dans `assets/symboles/` :
- `detendeur_electronique.svg` — bibliothèque de F. Henninot (planche Eduscol « le circuit frigorifique »),
  `C:\git\usine-contenu\bibliotheque-symboles\svg\frigo_schema\` ; le même que la gare 0.
- `sonde_temperature.svg` — bibliothèque inerWeb, version sans repères
  (`C:\git\usine-contenu\bibliotheque-symboles\svg\capteurs_froid\sonde_temperature--sans-reperes.svg`), dessins
  d’après la collection QElectroTech (CC BY 3.0).
- `capteur_pression.svg` — **QElectroTech, licence CC BY 3.0**, élément `sensor-presion` (famille « Froid et
  climatisation » ; fichier source `C:\git\_wt-detendeurs\symboles\svg\sensor-presion.svg`, voir `symboles/LICENCE.md`).
  La bibliothèque n’a **pas** de symbole « transmetteur de pression » : le « capteur de pression » de QElectroTech est
  le plus proche, **à faire valider par F. Henninot**. Copié sans modification ; commentaire dans le fichier SVG ;
  citation côté élève : bouton « Sources » de l’en-tête (fenêtre) et version imprimable.
- Le régulateur de l’écran 1 est un pictogramme de l’appareil (boîtier, écran), identique à celui de la coupe, pas un
  symbole normalisé : la bibliothèque n’en a pas.

## Dessin

- `jouerezo/moteur/voyage-dessin.js` (VOYAGE_DESSIN, lu sans modification) : nappe de liquide, bulles, petites
  molécules, métaux en relief, pastilles, filigrane inerWeb.
- `../_detendeurs-commun/scenes-detendeurs.js` : `DS.coupe("electronique")` (écran 1), `DS.bande` (évaporateur),
  `DS.jouer` (pas à pas), `DS.animer`, `DS.fond`, `DS.svg`.
- `scene-electronique.js` : briques ajoutées à cette gare, car la brique commune n’a ni boucle de réglage complète
  (transmetteur de pression, sonde de température, régulateur avec son écran, fils pointillés et signal), ni vanne à
  impulsions (bobine, clapet, barre de temps du cycle), ni escalier des crans, ni exercice « régler la consigne »
  (système qui se stabilise). Fluide continu : le vide du raccord du transmetteur traverse la paroi du tube, l’ouverture
  entre le corps et le tube est dégagée, la selle de la sonde s’arrête à la paroi, la conduite HP traverse la paroi du
  corps.
- Aucune photo, aucune image générative, aucune ressource distante.

# Sources — L’égalisation externe (gare 2)

Consultation éditoriale : 6 octobre 2026.

## Référentiel

- `C:\git\pilote-fluides\packs\fluides\referentiel-2025.json` — transcription des codes du règlement d’exécution
  (UE) 2024/2215, annexe I. Codes relus : `1.02` (surchauffe), `1.04` (fonction des composants dont les détendeurs
  thermostatiques), `9.01` (principe des vannes d’expansion), `9.03` (régler un détendeur mécanique/électronique),
  `9.10` (efficacité énergétique pendant l’installation ou la maintenance des détendeurs). Convention de
  `couverture.json` : celle de `detendeurs-famille/` (enseigné = `codes`, mobilisé = `appui`).
- [EUR-Lex — règlement d’exécution (UE) 2024/2215](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215).

## Contenu métier

- `C:\Users\henni\OneDrive\Bureau\4-INERWEB\CLAUDE-ESPACE-TRAVAIL\LIGNE-DETENDEURS\findings.md` § 3, « Commun » et
  « Gare 2 » : égalisation interne = pression de l’entrée de l’évaporateur ; forte perte de charge (distributeur de
  liquide, longs circuits) = pression de sortie plus basse = détendeur trop fermé, évaporateur sous-alimenté ; tube
  d’égalisation externe = pression de la sortie, prise après le bulbe dans le sens du fluide (position exacte : notice) ;
  il compense la perte de charge, il ne la supprime pas ; prise bouchée ou laissée ouverte = ne fonctionne pas ;
  obligatoire avec un distributeur de liquide. Rédigé par F. Henninot, **à valider** (voir REPRISE.md).
- `packs/fluides/res/detendeur-interactif/app.js`, écran 9 « Séparer prise interne et prise externe »
  (`renderEqualization`, `equalizationSvg`) : cohérence des notions (T 2 interne ≠ TE 2 externe ; tube dédié pris après
  le bulbe ; compense sans supprimer) ; question « égalisation externe indispensable avec un distributeur de liquide ».

## Symboles normalisés (jamais redessinés)

Copiés dans `assets/symboles/` depuis `detendeurs-famille/assets/symboles/` (bibliothèque de F. Henninot,
`C:\git\usine-contenu\bibliotheque-symboles\svg\frigo_schema\`, planche Eduscol « le circuit frigorifique ») :
- `detendeur_thermo_ext.svg` — détendeur thermostatique à égalisation externe (`chercher-rag.js` indique aussi un
  symbole QElectroTech « Détendeur thermostatique externe » ; celui de la planche Eduscol est gardé : il est
  cohérent avec les autres symboles de la ligne et déjà utilisé à la gare 0).
- `detendeur_thermo_int.svg` — détendeur thermostatique à égalisation interne (comparaison à l’écran 3).

## Dessin

- `jouerezo/moteur/voyage-dessin.js` (VOYAGE_DESSIN, lu sans modification) : nappe de liquide, bulles, petites
  molécules, métaux en relief, pastilles, filigrane inerWeb.
- `../_detendeurs-commun/scenes-detendeurs.js` : `DS.bande` (évaporateur), `DS.manometre`, `DS.jouer`, `DS.animer`,
  `DS.fond`, `DS.svg`, `DS.sortie`. Toutes les valeurs sont qualitatives ; aucun chiffre de chantier.
- `scene-egalisation.js` : brique ajoutée à cette gare (détendeur thermostatique + évaporateur long à forte perte de
  charge + deux manomètres + bulbe + tube d’égalisation), car la brique commune n’a ni tube d’égalisation ni perte de
  charge. Fluide continu : un tube = une paroi + un intérieur d’un seul tenant, paroi ouverte aux raccords.
- Aucune photo, aucune image générative, aucune ressource distante.

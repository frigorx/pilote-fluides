# Sources — La famille des détendeurs (gare 0)

Consultation éditoriale : 6 octobre 2026.

## Référentiel

- `C:\git\pilote-fluides\packs\fluides\referentiel-2025.json` — transcription des codes du règlement d’exécution
  (UE) 2024/2215, annexe I. Codes relus : `1.02`, `1.04` (fonction des composants dont les détendeurs
  thermostatiques), `9.01` (principe des vannes d’expansion : détendeurs thermostatiques, tubes capillaires),
  `9.03` (régler un détendeur mécanique ou électronique), `9.10` (efficacité énergétique des détendeurs et autres
  composants). Convention de `couverture.json` : celle de `detendeur-interactif/`.
- [EUR-Lex — règlement d’exécution (UE) 2024/2215](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215).

## Contenu métier

- `C:\Users\henni\OneDrive\Bureau\4-INERWEB\CLAUDE-ESPACE-TRAVAIL\LIGNE-DETENDEURS\findings.md` § 3, « Commun » et
  « Gare 0 » : détendre = faire chuter la pression ET doser le débit ; flash à l’orifice ; capillaire = rien,
  automatique = la pression, thermostatique = la surchauffe, électronique = la surchauffe calculée ; choix selon la
  machine. Rédigé par F. Henninot, **à valider** (voir REPRISE.md).
- `C:\git\habilitation-fluide\cours\CONTENU-09-G9-detendeurs.md` (HabFluide G9, `9.01`, `9.03`) — vocabulaire et
  rôle du capillaire (restriction fixe, petites puissances) et du thermostatique (surchauffe en sortie d’évaporateur).
- Les écrans 4 (« et si la chambre chauffe ») et 6 (égalisation externe, MOP) annoncent les gares suivantes sans
  les traiter : elles reprennent les § 3 « Gare 2 » et « Gare 3 » de `findings.md`.

## Symboles normalisés (jamais redessinés)

Copiés dans `assets/symboles/` depuis la bibliothèque de F. Henninot :
- `tube_capillaire.svg`, `detendeur_thermo_int.svg`, `detendeur_thermo_ext.svg`, `detendeur_electronique.svg` —
  `C:\git\usine-contenu\bibliotheque-symboles\svg\frigo_schema\` (planche Eduscol « le circuit frigorifique »).
- `vanne_pression_constante.svg` — **QElectroTech, licence CC BY 3.0**, élément `valv-pres-cte` (fichier source
  `C:\git\_wt-detendeurs\symboles\svg\valv-pres-cte.svg`, famille frigorifique de la collection QElectroTech ;
  voir `symboles/LICENCE.md`). Gardé par F. Henninot (06/10) pour le détendeur automatique, la bibliothèque inerWeb
  n’ayant pas de symbole propre. Citation côté élève : bouton « Sources » de l’en-tête (fenêtre), version imprimable,
  commentaire dans le fichier SVG.

## Dessin

- `jouerezo/moteur/voyage-dessin.js` (VOYAGE_DESSIN, lu sans modification) : nappe de liquide, bulles, petites
  molécules, métaux en relief, pastilles, filigrane inerWeb.
- `../_detendeurs-commun/scenes-detendeurs.js` : les coupes de la ligne (capillaire, automatique, thermostatique,
  électronique) et le pas à pas. Toutes les valeurs sont qualitatives ; aucun chiffre de chantier.
- Aucune photo, aucune image générative, aucune ressource distante.

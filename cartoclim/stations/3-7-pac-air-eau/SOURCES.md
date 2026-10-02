# Sources — 3.7 La PAC air/eau : haute, moyenne et basse température

## Photographies (`assets/biblio/`)
- `e2e7fed2c7.jpeg` — unité extérieure d'un groupe air/eau posée sur des plots, tuyau noir au sol. Trouvée dans
  `03_BAC-MFER/S2-Systemes/PRWA1000005A_Installation PAC-WT05.pdf` (dossier d'installation d'un banc d'atelier).
  Aucun logo ni filigrane visible.
- `68b2c129a8.jpeg` — ÉCARTÉE par l'architecte le 02/10 : photo d'un site web tiers ; la charte (R7) refuse toute image tierce, même citée avec l'accord affiché du site.

Trouvées par `node outils/chercher-images.mjs "pompe à chaleur air/eau unité extérieure monobloc" --photo`
puis `"module hydraulique ballon tampon …"`.
Écartées : 836f3e7ed9 (logo de marque), 979b7494da (nom de marque lisible), 38754223e7 (logo de marque, image de catalogue),
fd4279c1a0 et 1bce36ea61 (PAC air/air, logo), 179f166086 (logo de marque sur le panneau).

## Symboles (`assets/`)
- `ud-exte-split.svg`, `pac_air_eau_ui.svg` — bibliothèque inerWeb, collection QElectroTech (CC BY 3.0). Copiés de
  `assets/symboles/`, rien n'a été redessiné.

## Fond — ce qui a servi, et pour quelle phrase
- **Le fonctionnement PAC.docx** (fonds Bac pro) : les quatre organes ; monobloc (l'eau circule dans le réseau)
  contre disposition « classique » (le fluide voyage) ; appoint électrique ou chaudière existante ; ballon tampon
  « évite les courts cycles, mauvais pour les compresseurs » ; ECS par ballon ; antigel vérifié à l'entretien d'une
  PAC air/eau ; tirage au vide inutile sur un monobloc ; panne « échangeur obstrué → dégivrage ».
- **PAC principe ademe.pdf** (guide ADEME, pompes à chaleur de l'habitat individuel) : « le fonctionnement est d'autant
  plus efficace que la différence entre la température du milieu où l'on puise la chaleur et celle des émetteurs est
  réduite » (base de la règle des trois familles) ; dégivrage par inversion périodique du fonctionnement ; monobloc ou
  deux unités reliées par le circuit de fluide ; relève de chaudière (la PAC en priorité tant que son rendement est
  acceptable, la chaudière en dessous d'un seuil) ; appoint toujours prévu ; ECS par ballon avec résistance de secours ;
  auxiliaires (circulateurs, dégivrage) ; bruit et plots anti-vibratiles ; réversible.
- **MANUEL UTILISATION PAC_EDHQ_EBHQ_AA_DAIKIN.pdf** (monobloc air/eau avec ballon) : le dégivrage inverse le cycle
  et prélève la chaleur du système intérieur ; appoint intégré pour les températures extérieures froides et pour
  protéger la tuyauterie d'eau extérieure du gel ; fonction antigel (pompe puis appoint), glycol ; eau demandée « la
  plus basse possible », consigne qui suit la température extérieure ; température d'équilibre de l'appoint ;
  ballon avec serpentin, vanne 3 voies, résistance (surchauffage) ; la performance de la PAC baisse pour une eau de ballon plus chaude.
- **Manuel technique EBHQ006_008BV3 (fr) 2010** (Daikin Altherma monobloc) : tuyauterie d'eau entre l'unité extérieure
  et les appareils intérieurs ; dégivrage par inversion de cycle ; échangeur, pompe, réchauffeur auxiliaire, vanne 3 voies ;
  « nous recommandons d'utiliser du glycol » en cas de coupure d'alimentation ; plage de fonctionnement qui comporte
  des zones « réchauffeur seul ».
- **PRWA1000005A_Installation PAC-WT05** : isolation complète du circuit hydraulique une fois mis en pression ;
  mise à la terre des canalisations ; ballon tampon sur le châssis.
- **BALLONS TAMPONS_FT BMEL_THERMADOR.pdf** : le ballon augmente le volume d'eau, limite le nombre de démarrages ;
  « avec une pompe à chaleur, soit simple, soit en relève de chaudière, la bouteille joue le rôle de ballon tampon ».
- **plancher chauffant.pdf** (AFPA Ingénierie 2012) : plancher = émetteur à rayonnement, compatible PAC. **Ses
  températures de surface et de fluide ne sont pas reprises** (voir « Omis »).
- **Station HydroMétro** : Échangeur, Boucle, Volume tampon (liens `inerweb.fr/hydrometro/stations/…`).

## Omis, faute de source primaire (on n'approxime pas)
- Toute température d'eau par famille (basse, moyenne, haute), toute température de ballon d'ECS, toute durée
  de dégivrage (« quelques minutes » seulement), tout COP, toute puissance, toute température d'arrêt de la machine.
  Elles existent dans le fonds, mais dispersées et propres à un constructeur ou à un texte ancien :
  - guide ADEME : « radiateurs basse température » alimentés par une eau entre 45 et 50 °C ; plancher dont la
    surface ne dépasse pas 28 °C ; arrêt de la machine « entre -10 et -20 °C selon les modèles » ;
  - plancher chauffant.pdf : températures maxi de surface et de fluide, citant une règle de pose de 2006 ;
  - fiche « PAC et ECS » (L'essentiel sur les pompes à chaleur, n° 17) : PAC HT / PAC BT et ECS ;
  - notice Daikin : plage de consigne de chauffage, 8 minutes de dégivrage au plus, ballon à 53 °C.
- Les trois familles basse / moyenne / haute température sont posées par la fiche de la station (F. Henninot) ;
  le guide ADEME appelle « basse température » le plancher et les radiateurs adaptés, la fiche n° 17 distingue PAC HT et PAC BT.
  Les mots de la station suivent la fiche ; aucun seuil n'est imprimé.

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.

# Sources — Intervention sur un circuit hydrocarbure

Consultation éditoriale : 1er août 2026.

## Référentiel réglementaire

- `C:\git\pilote-fluides\packs\fluides\referentiel-2025.json` — transcription
  verbatim de l’annexe II de l’arrêté du 21 novembre 2025. Les codes `12.07`,
  `12.08`, `12.09`, `12.10`, `12.11` et `12.12` ont été contrôlés.
- [Légifrance — arrêté du 21 novembre 2025 relatif à l’attestation d’aptitude](https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000053004647)
  — groupe 12 applicable aux catégories A1 et A2.
- [EUR-Lex — règlement d’exécution (UE) 2024/2215](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215)
  — séquence minimale européenne : ouverture/remplacement/fermeture, épreuve de
  pression, essai sous vide, charge appropriée, méthode directe et rapport.

## Prévention et technique

- [INRS ED 6395 — Les fluides frigorigènes](https://www.inrs.fr/dam/inrs/CataloguePapier/ED/TI-ED-6395.pdf)
  — hydrocarbures A3, ventilation, prévention des sources d’inflammation,
  détection, matériel adapté, signalisation et formation.
- [Danfoss — Safe handling of mildly flammable and flammable refrigerants](https://assets.danfoss.com/documents/latest/67598/AR318343495830en-000101.pdf)
  — préparation du poste, ventilation, détection, outillage et arrêt en cas de
  condition non sûre.
- [Danfoss — Application guidelines R600a/R290](https://assets.danfoss.com/documents/latest/90305/AB270523412055en-000101.pdf)
  — intervention par personnel formé, matériel approprié, précision de charge,
  gestion du vide et refus des conversions improvisées.

Ces documents vérifient les principes. Ils ne remplacent pas la norme complète,
la FDS, la notice, l’analyse de risques ni la procédure de l’entreprise.

## Sources éditoriales locales

- `C:\git\pilote-fluides\packs\fluides\cartes.js`, fiches `g12` et `g12b` —
  fil rouge de l’intervention et garde-fous déjà posés dans le pack.
- `C:\git\pilote-fluides\packs\fluides\res\hydrocarbures-a1-a2\` — « Mission
  290 », point de départ du scénario, sans duplication de son cours sur la zone,
  la charge admissible ou l’outillage.
- `C:\git\pilote-fluides\packs\fluides\res\evaporateur-interactif\` — contrat
  de navigation, d’extrait, de voix, d’impression et de couverture.

## Images et symboles

- Illustration de sommaire : `../bibliotheque/illu-g12b.webp`, ressource locale
  validée par inerWeb ; elle ne porte aucune donnée métier.
- Les pictogrammes de cadenas, azote, détecteur, pompe à vide, vacuomètre,
  manifold et interdiction viennent sans redessin de
  `../bibliotheque/icones/`.
- Aucun schéma frigorifique ou raccordement n’est généré. Les fils d’opérations
  restent textuels et accessibles sur papier.

## Symboles du dessin (scene-geste.js, 04/10/2026)

Aucun symbole ni pictogramme n'est redessiné : tout est repris tel quel.

- Manifold, vannes de service, filtre déshydrateur, ventilateur : bibliothèque
  curée de F. Henninot, déjà sur le site (`packs/fluides/res/symboles/` :
  `manometres.svg`, `vanne_isolement.svg`, `filtre_deshydrateur.svg`,
  `ventilateur.svg`).
- Pompe à vide et vacuomètre : `symboles/bomba-vacio.svg` et
  `symboles/manometro.svg`, copies sans retouche de la collection QElectroTech
  convertie
  (`C:/git/bibliotheque-symboles-energie/svg/60_energy/21_refrigeration/Frio/equipo-frigorifico/accesorios-frio/`),
  licence CC BY 3.0, <https://github.com/qelectrotech/qelectrotech-elements>.
- Mano-détendeur : `symboles/50101322_pressure_regulator.svg`, copie sans
  retouche du « Régulateur de pression manuel » (le symbole normalisé d'un
  détendeur avec son manomètre) de la même collection
  (`C:/git/bibliotheque-symboles-energie/svg/50_pneumatic/5010_compressed_air/501013_control/`),
  CC BY 3.0. **À valider par F. Henninot** : aucun symbole de mano-détendeur
  n'existe dans la bibliothèque curée ni dans les images validées (l'index des
  illustrations de la 1re MFER le range parmi les objets « sans image validée »).
  La bouteille d'azote et la bouteille de fluide figurent aussi dans cette liste :
  elles sont montrées ici par les pictogrammes du site, qui existent. Ce symbole
  pneumatique normalisé tient lieu de mano-détendeur ; il est posé dans le sens du
  fluide (tourné), et retourné dans le gros plan pour que son réglage soit du côté
  de la main.
- Bouteille d'azote, bouteille de fluide, balance, détecteur de fuite, cône de
  balisage : pictogrammes du site (`../bibliotheque/icones/` : `ico-azote`,
  `ico-bouteille-fluide`, `ico-balance`, `ico-detecteur-fuite`, `ico-balisage`),
  ceux que le cours utilise déjà, sans retouche.
- Le technicien : bonhomme de HoCourant, repris de `legislation/scenes/fluidique.js`.
- **À valider par F. Henninot** : le composant remplacé est montré sous la forme
  d'un filtre déshydrateur. Le cours dit seulement « composant » ; la fiche M7 laisse
  le choix ouvert (« pressostat, filtre… »).

Ce que le dessin montre, et d'où cela vient :

| Ce qui est dessiné | Source |
|---|---|
| Zone ventilée (ventilateur, air qui traverse), zone balisée (deux cônes), détecteur actif | Cours, écrans « Mission 290 vous remet le chantier » et « Avant de couper » ; fonds : `habilitation-fluide/cours/CONTENU-12-G12-hydrocarbures.md`, blocs 2, 4 et 6 |
| Circuit sous azote, ouvert seulement sous azote, composant déposé puis neuf monté, circuit refermé | Cours, écrans « Avant de couper », « Déposer sans improviser », « Refermer prépare la preuve » ; fonds : CONTENU-12, bloc 6 |
| Azote par le mano-détendeur, jamais en direct ; pression d'épreuve = valeur de la documentation (aucune valeur dessinée) | Cours, écrans « L'azote passe par le mano-détendeur » et « Monter, stabiliser, contrôler » ; fonds : `M7-guidance-hydrocarbures-r290.md`, en-tête de sécurité |
| La pression tient, ou chute : STOP, on localise | Cours, écrans « La pression ne tient pas » et « Épreuve concluante = preuve datée » |
| Tirage au vide : l'air et l'humidité partent, l'eau bout ; on isole la pompe, le vacuomètre dit si le vide tient | Cours, écrans « Le vide retire l'air et l'humidité » et « Atteindre ne suffit pas : il faut tenir » |
| R-290 sur la balance, quantité suivie par pesée, on ferme à la masse prévue | Cours, écrans « La charge vient de l'équipement » et « Peser la quantité prévue » ; fonds : M7, phase 3 (« charge suivie à la balance ») |
| Détecteur adapté aux raccords, vapeur visible qui coule, signal répété = suspension | Cours, écrans « Le détecteur doit reconnaître l'hydrocarbure » et « Le contrôle direct détecte » ; fonds : M7 (« le propane est plus lourd que l'air : il s'accumule aux points bas »), CONTENU-12, bloc 8 |

Aucune valeur n'est dessinée (pression d'épreuve, niveau de vide, durée, charge) :
elles viennent de la plaque, de la notice, de la NF EN 378, de la FDS et de la
procédure. Le R-290 est de classe A3 (très inflammable), jamais A2L.

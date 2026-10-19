# Sources — Les détecteurs de fuite

Consultation et vérification : 19 octobre 2026. Statut du cours : en cours de relecture (aucune validation de F. Henninot).

## Textes réglementaires (source primaire)

Chaque chiffre du cours vient d’un de ces textes, lu en entier le 19/10/2026.

- **Arrêté du 29 février 2016** relatif à certains fluides frigorigènes et aux gaz à effet de serre fluorés
  (NOR DEVP1604751A), **article 2, I** : liste des méthodes directes (détecteur électronique « adapté au fluide
  frigorigène », produit moussant ou eau savonneuse « à condition que l’ensemble des éléments de l’équipement soit
  accessible », fluide fluorescent et lampe UV) ; **seuil de détection ≤ 5 grammes par an « à la pression de service »,
  vérifié au moins une fois tous les douze mois** (protocole représentatif, y compris gaz interférents, usage statique
  et dynamique ; le chapitre 11 de la norme NF EN 14624, version 2012, y répond « à titre d’illustration ») ;
  **article 2, III** : paramètres de la méthode indirecte (pression, température, courant du compresseur, niveaux de
  liquides, volume de la quantité rechargée). Texte lu sur AIDA (INERIS), version « en vigueur », modifiée par les
  arrêtés des 16/03/2017, 19/04/2017, 17/07/2019, 26/07/2022 et 29/05/2024 :
  <https://aida.ineris.fr/reglementation/arrete-290216-relatif-a-certains-fluides-frigorigenes-gaz-a-effet-serre-fluores>
  (AIDA : « seule la version publiée au journal officiel fait foi » → à recouper sur Légifrance, voir le compte rendu).
- **Règlement (CE) n° 1516/2007**, article 6, paragraphes 1 à 3 : mêmes méthodes directes ; « les dispositifs de
  détection de gaz […] sont vérifiés tous les douze mois » ; « la sensibilité des dispositifs portatifs […] est d’au moins
  5 grammes par an » ; le liquide UV n’est employé que si le fabricant de l’équipement a reconnu la méthode
  techniquement possible. Article 7 : paramètres de la méthode indirecte et cas de présomption de fuite. Texte lu par le
  serveur de l’Office des publications : <http://publications.europa.eu/resource/celex/32007R1516.FRA.xhtml>
  (page EUR-Lex : <https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32007R1516>).
- **Règlement d’exécution (UE) 2026/1444** du 2 juillet 2026, publié au JO le 3 juillet 2026 : abroge les règlements
  (CE) 1497/2007 et 1516/2007 « sans les remplacer » ; entrée en vigueur le vingtième jour suivant la publication,
  soit le 23 juillet 2026 :
  <https://eur-lex.europa.eu/eli/reg_impl/2026/1444/oj>.
- **Règlement (UE) 2024/573**, article 4, paragraphe 1 (« Le rejet intentionnel de gaz à effet de serre fluorés dans
  l’atmosphère est interdit lorsque ce rejet n’est pas techniquement nécessaire pour l’usage prévu ») : fondement de
  l’interdit « ne pas ouvrir une bouteille pour tester un détecteur ». Article 6 : les systèmes de détection de fuites
  FIXES sont contrôlés tous les douze mois — ce n’est pas le contrôle du détecteur portatif, le cours ne le confond pas :
  <https://eur-lex.europa.eu/eli/reg/2024/573/2024-02-20/fra>.
- **Référentiel de l’attestation d’aptitude** (arrêté du 21 novembre 2025, annexe II) : codes 4.04 à 4.08, libellés
  repris sans retouche de `packs/fluides/referentiel-2025.json`.
- **CAP IFCA** : compétence C4.3 et tâche T13, libellés de `C:/git/HAL-v3/donnees/referentiels/peda/CAP_IFCA.json`. La
  relation fine compétence ↔ tâche n’est pas tabulée dans le référentiel : T13 est la tâche de l’activité « Mise en
  service » qui parle de contrôler l’installation (relation par l’activité, comme dans `mon-parcours/`).

## Fonds de F. Henninot (RAG, chercher-rag.js, 19/10/2026)

- `02_CAP-IFCA/Froid-Frigorifique/détection de fuite.docx` : technologies (diode chauffée / ionisation, cellule
  infrarouge), traceur fluorescent (jaune-vert, ne se quantifie pas, accès visuel), limites du produit moussant (peu
  précis pour les petites fuites). Son affirmation que le moussant « ne répond pas aux exigences réglementaires » n’est
  PAS reprise : l’arrêté du 29/02/2016 le range parmi les méthodes directes.
- `03_BAC-MFER/Froid-Frigorifique/7418039043_D81795.pdf` et `…D81796.pdf` : constats de vérification de laboratoire
  (pré-contrôle sur fuite source, action corrective pile / capteur, dix passages devant une fuite étalon de 5 g/an à
  3 mm et 20 mm/s, norme NF EN 14624 de mars 2012, verdict « conforme »). Seule la structure est reprise ; le nom du
  client, la marque et le numéro de série ne le sont pas. Les deux constats de l’exercice sont des exemples inventés.
- `03_BAC-MFER/S1-Analyse/Copie de Recherche fuite a lazot.docx` : recherche de fuite sous azote (savon, détecteur
  ultrasonique).
- HabFluide ch. 14 (livre) et `habilitation-fluide/cours/CONTENU-04-G4-etancheite.md` : un détecteur répond aux gaz
  pour lesquels il est conçu (un appareil à fluides fluorés ne voit pas un hydrocarbure) ; balayage lent, du bas vers
  le haut, second passage, ventilateur à l’arrêt si possible ; surchauffe 5 à 10 K et sous-refroidissement 4 à 8 K
  « habituels ».
- Cours voisin : `packs/fluides/res/etancheite-interactive/` (registre, méthodes indirecte et directe) ;
  `tour-de-main/interventions/etancheite-azote/` (station azote).

## Sources de la profession (secondaires — à relire par F. Henninot)

- ACHR News, « Better than Bubbles : The Ins & Outs of Electronic Leak Detectors », 29 juillet 2024 (chronique
  fournie par un fabricant) : principe et limites de la diode chauffée (capteur qui s’use avec le fluide et l’huile),
  de l’infrarouge (peu de fausses alarmes, capteur durable) et des ultrasons (écoute le son d’un gaz sous pression ;
  moins fiable en basse pression ; gêné par le bruit du chantier) ; appareils à effet corona (plus de fausses alarmes).
  <https://www.achrnews.com/articles/154925-better-than-bubbles-the-ins-and-outs-of-electronic-leak-detectors>
- IIF-IIR, « Détecteurs de fuites portables : les technologies », 1998 (résumé) : recense halogène, eau savonneuse,
  effet corona, conductivité thermique, diode chauffée, ultrasons, fluorescence, colorant.
  <https://iifiir.org/en/fridoc/portable-leak-detectors-technology-111832>
- ABC Clim, « Détection de fuites à l’azote hydrogéné », 2024 : mélange 95 % azote / 5 % hydrogène, détecteur
  d’hydrogène, charge récupérée avant la mise sous pression, emploi en complément d’une recherche classique.
  <https://www.abcclim.net/detection-fuites-azote-hydrogene.html> — recoupé par la brochure N2H2 d’Air Liquide et le
  manuel d’un détecteur d’hydrogène (« ne mettez jamais en marche une installation remplie avec du gaz traceur »),
  lus dans les résultats de recherche, non téléchargés en entier.
- Principe des détecteurs à ultrasons : recoupé dans des fiches de fabricants (CS Instruments, Honeywell Analytics),
  lues dans les résultats de recherche seulement.

## Sans source primaire (dit comme tel dans le cours ou laissé à la notice)

- Le réglage de la sensibilité (allumer dans l’air propre, baisser si l’alarme sonne sans arrêt) : pratique commune
  des notices ; le cours renvoie à la notice de l’appareil.
- La distance (3 mm) et la vitesse (20 mm/s) de balayage : conditions de l’essai de laboratoire (NF EN 14624),
  présentées comme un ordre de grandeur et non comme une règle.
- « Ne pas mettre la tête dans la fuite » : lu comme « la tête de la sonde » (saturation) ; l’avertissement pour le
  visage (distance, aération) est une précaution générale de sécurité.
- Aucune marque de détecteur, de produit moussant, de traceur ou de gaz n’est citée.

## Symboles et images

- Dessin vivant (`scene-geste.js`) : copie de celui de `etancheite-interactive` ; symboles `symboles/manometro.svg` et
  `symboles/detector-gas.svg` copiés sans retouche de la collection QElectroTech (licence CC BY 3.0,
  <https://github.com/qelectrotech/qelectrotech-elements>). Le seul détecteur de la collection est un symbole de
  détecteur de gaz d’installation, pas celui d’un détecteur portatif de fluide frigorigène.
- Accueil : `../bibliotheque/illu-g4a.webp`, `illu-g4b.webp`, `illu-g4c.webp` (illustrations locales du réseau, déjà
  validées). Aucun schéma dessiné pour ce cours, aucune image produite par IA.

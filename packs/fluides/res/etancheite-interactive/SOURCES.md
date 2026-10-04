# Sources — L’étanchéité

Consultation et vérification : 1er août 2026.

## Référentiel et réglementation

- Règlement d’exécution (UE) 2024/2215, annexe I, groupe 4 — compétences 4.01 à 4.09 :
  <https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R2215>
- Règlement d’exécution (UE) 2026/1444 : abrogation des règlements 1497/2007 et
  1516/2007, entrée en vigueur le 23 juillet 2026, sans texte de remplacement :
  <https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32026R1444>
- Règlement (UE) 2024/573, articles 5 et 6 — contrôles et registres :
  <https://eur-lex.europa.eu/eli/reg/2024/573/2024-02-20/fra>
- Règlement (CE) 1516/2007, texte historique abrogé le 22 juillet 2026. Il est
  consulté uniquement pour comprendre les termes encore employés dans le
  référentiel 2024/2215, pas comme procédure réglementaire actuelle :
  <https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32007R1516>

## Sources locales

- `packs/fluides/cartes.js`, fiches g4a, g4b et g4c.
- `MATRICE-COMPETENCES.md`, libellés exacts des codes 4.01 à 4.09.
- Schémas manuels validés : `packs/fluides/res/svg/points-de-fuite.svg`,
  `lecture-table.svg` et `balayage-detecteur.svg`.
- Illustrations locales validées : `illu-g4a.webp`, `illu-g4b.webp`,
  `illu-g4c.webp` et `illu-x-detective.webp`, dans
  `packs/fluides/res/bibliotheque/`.
- Pictogrammes locaux : `ico-registre.png` et `ico-detecteur-fuite.png`, dans
  `packs/fluides/res/bibliotheque/icones/`.

## Symboles du dessin (scene-geste.js, 04/10/2026)

- Manomètre et détecteur : `symboles/manometro.svg` et `symboles/detector-gas.svg`
  (« Détecteur gaz »), copies sans retouche de la collection QElectroTech
  convertie
  (`C:/git/bibliotheque-symboles-energie/svg/60_energy/21_refrigeration/Frio/equipo-frigorifico/accesorios-frio/manometro.svg`
  et `.../60_energy/11_water/01_Termicas-Fluidos2_Rafa/Gas/instalaciones-gas/detector-gas.svg`),
  licence CC BY 3.0, <https://github.com/qelectrotech/qelectrotech-elements>.
  C'est le seul détecteur de la collection : un symbole de détecteur de gaz
  d'installation, pas celui d'un détecteur portatif de fluide frigorigène.
  Seul ajout : la diode rouge s'allume (un halo posé sur sa place) quand il
  réagit.
- Raccord flare : aucun symbole normalisé dans les bibliothèques ; il est monté
  avec les briques métal du moteur (écrous laiton sur le tube cuivre), comme les
  piquages du pilote. Huile, solution moussante, vapeur : nappe, bulles et
  molécules de `jouerezo/moteur/voyage-dessin.js` (lu, jamais modifié).
- Le technicien : bonhomme de HoCourant, repris de `legislation/scenes/fluidique.js`.
- Gestes et ordre : schémas validés `packs/fluides/res/svg/balayage-detecteur.svg`
  et `recherche-fuite-geste.svg` (balayage lent, au contact, en partie basse ;
  second passage pour confirmer) ; cours `habilitation-fluide/cours/CONTENU-04-G4-etancheite.md`
  (le fluide entraîne l'huile, la solution moussante s'applique à l'extérieur
  des assemblages).

## Limites

Le cours ne donne aucune fréquence, sensibilité, pression d’épreuve, valeur de
vide, seuil de surchauffe ou de sous-refroidissement. Ces valeurs dépendent du
cadre applicable, de la procédure du site, de la notice et du fluide.

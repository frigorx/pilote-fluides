# Sources — station 6.4

## Photographies — base de connaissances inerWeb

Trouvées par `node outils/chercher-images.mjs`, copiées dans `assets/biblio/`.
Fonds d'origine : `C:\git\usine-contenu\moteur-recherche\illustrations\cache\`
(44 011 images décrites, 51 890 fichiers en cache).

**26/10/2026 : photos retirées** (droits non réglés, décision de F. Henninot). Le temps 1 montre deux dessins inerWeb :
la boîte à bornes de la station (barrettes en étoile) et une plaque signalétique dessinée, sans marque, aux valeurs
de la plaque dessinée de la station 1.7 (Δ 230 V 6,65 A / Y 400 V 3,84 A, 1,5 kW, 1435 tr/min). Le tableau des couplages
est dessiné en code (Schemas.tableauCouplages).

⚠️ **Résolution.** 318 × 239 et 348 × 229 : convenable en vignette, insuffisant en plein écran.
C'est une raison de plus pour que la scène animée soit redessinée par Design.

## Symboles normalisés

Pris dans `C:\git\bibliotheque-symboles-energie\svg\10_electric\10_allpole\`, convertis depuis
QElectroTech. **Aucun n'a été redessiné.**

| Fichier local | Origine | Retouche |
|---|---|---|
| `assets/induction_motor_6_terminals.svg` | `391_consumers_actuators/10_engines/` | fond `#ffffff` → `#fffdf8` (charte : jamais de blanc pur) |
| `assets/moteur_tri.svg` | `391_consumers_actuators/10_engines/` | idem |
| `assets/src_3p_pe_n.svg` | `110_network_supplies/` | idem — en réserve pour le temps 2 |

## Dessin de la plaque à bornes

Tracé dans `contenu.js` (fonction `plaqueSVG`) : la boîte à bornes n'existe pas comme symbole
normalisé, c'est un objet réel. Les repères suivent la disposition normalisée **U1 V1 W1** en
haut, **W2 U2 V2** en bas, décalée d'un cran.

## Ce que le RAG a apporté

Interrogation de `C:\git\HAL-v3\data\db\referentiel.db` — 54 827 fragments, dont 37 479
d'illustrations et 13 808 de documents. Ressources repérées sur ce sujet précis :

- `03_BAC-MFER/S4-Electricite/Ressources activité 17 moteur asynchrone triphasé.pdf`
- `05_Ressources-Partagees/Electricite/TD-triphase-couplage_corrige-professeur.docx`
- `06_Outils-Pedagogiques/Frigolo-Outils/plan-seance-cap-ifca.docx` — séance de TD sur le
  réseau triphasé et le couplage

Elles n'ont pas encore été dépouillées : à faire avant d'écrire les stations 2.3 à 2.6.

## Valeurs employées

| Grandeur | Valeur | D'où elle vient |
|---|---|---|
| Tension entre deux fils | 400 V | réseau triphasé français courant |
| Tension entre un fil et le neutre | 230 V | le même réseau |
| Rapport entre les deux | racine de trois | relation du triphasé équilibré |
| Familles de plaques | 127/220 · 230/400 · 400/690 | tableau du dossier technique CAP IFCA EP1 2022 |
| Tolérance admise sur un bobinage | ± 5 % | seuil retenu pour la station, à confirmer |

## Scène animée

Le temps 2 attend une scène fabriquée par **Claude Design**.
Brief et complément 3D déposés le 28/08/2026 : projet « ÉlectroRézo — scènes animées »,
copie au dépôt dans `design/BRIEF-scene-couplage.md`.

## Narration

Écrite le 28/08/2026 pour cette station, pour l'oreille. **Non validée.**
Aucun MP3 fabriqué à ce jour.

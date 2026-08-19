# Sources techniques

Rédaction : 19 août 2026.

## D’où vient le contenu

Le fond métier reprend celui du simulateur **Régul’Froid**
(`C:\git\regulfroid-simulateur`, dépôt privé, livraison du 06/08/2026 puis
refonte du même jour), réécrit pour cette station. Ce qui a été conservé
volontairement, parce que c’est ce qui s’enseigne :

- la chaîne sonde → conversion → comparaison → contact ;
- la séparation **commande / protection** : un régulateur ne protège rien ;
- consigne, différentiel, et la **mémoire d’état** entre les deux seuils ;
- la correction d’affichage, qui déplace la valeur **régulée** ;
- le dégivrage en **cinq temps**, dont l’égouttage et le retard ventilateur ;
- l’arrêt du dégivrage **sur sonde**, la durée maximale n’étant qu’une sécurité ;
- au bornier : **départ toujours protégé par Q1**, un commun et une sortie par
  relais, **inversion phase/neutre refusée avec son explication**, sonde deux
  fils **sans polarité** mais câble séparé de la puissance ;
- le remplacement d’un appareil **par fonction**, jamais par numéro de borne.

Ce qui n’a **pas** été repris : la notice constructeur redistribuée et les
photographies sans droits, qui rendaient le dépôt d’origine non publiable.

## Les lois de calcul des sondes

Aucune table de constructeur n’est recopiée. Chaque famille est calculée
(`app.js`, objet `SONDES`) :

| Famille | Loi | Coefficients | Contrôle |
|---|---|---|---|
| NTC 10 kΩ | loi en β · `R = R25·exp(β(1/T − 1/298,15))` | β = 3435 K, R25 = 10 000 Ω | 10 000 Ω à 25 °C |
| PTC 990 Ω | quadratique du silicium · `R = R25(1 + a·ΔT + b·ΔT²)` | a = 7,871·10⁻³, b = 1,878·10⁻⁵ | 990 Ω à 25 °C |
| Pt1000 | équations nominales **IEC 60751** | A = 3,9083·10⁻³, B = −5,7750·10⁻⁷, C = −4,1830·10⁻¹² | 1 000 Ω à 0 °C, 1 385 Ω à 100 °C |

**Limite assumée et affichée.** Le modèle en β d’une NTC s’écarte d’une sonde
réelle loin du point nominal — plusieurs kilohms aux extrêmes de la plage,
puisque β glisse avec la température. L’écran l’écrit, et en tire la règle
professionnelle : une valeur de contrôle se lit dans la table de la notice,
jamais sur un simulateur. Seul le point nominal est annoncé comme exact ;
partout ailleurs la valeur porte le signe `≈`.

La Pt1000, elle, est normative : ses valeurs sont justes, la norme étant
publique.

## Référentiel

Cadre : règlement d’exécution **(UE) 2024/2215**, annexe I — repris dans
`packs/fluides/referentiel-2025.json`.

- Enseigné : **9.04** « Régler des thermostats mécaniques et électroniques » ·
  **6.03** « Régler les interrupteurs de sécurité et de contrôle ».
- Appui : **9.10** (efficacité énergétique : un différentiel serré multiplie les
  démarrages, un dégivrage mal réglé chauffe pour rien).

Le détail écran par écran est dans `couverture.json`.

## Valeurs des exercices

Toutes les valeurs manipulées sont des **valeurs d’exercice** et le disent à
l’écran. Les missions (chambre positive à 2 °C, chambre négative à −18 °C,
dégivrage toutes les 6 h) sont des cas d’école cohérents, pas des consignes de
chantier : sur une installation, la notice de la référence posée, le produit
stocké et les conditions réelles font foi.

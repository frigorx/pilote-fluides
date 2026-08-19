# Sources et traçabilité

| Élément | Origine | Usage dans ce brouillon |
|---|---|---|
| Moteur de cadrans | `https://github.com/frigorx/Iner.web-tools-beta/blob/main/manometres_v5.html` · commit observé `310ffdc7d75f910e6545b81eaa926acb1abe3012` | adaptation du dessin SVG et des échelles ; les anciennes corrélations simplifiées ne sont pas reprises |
| Tables pression–température | `~\Desktop\inerweb full ia\Livraisons\HF-0806\01-canoniques\inerweb-frigolo\outils\reglette-fluides.html` | contrôle croisé des valeurs absolues pour R32, R134a, R404A, R407C, R410A et R290 |
| Contrôle thermodynamique de développement | CoolProp 8.0.0, calculs ponctuels `P(T,Q)` hors du livrable | génération et contrôle des tables statiques tous les 5 K ; aucune dépendance CoolProp à l’exécution |
| Références corps purs | NIST Chemistry WebBook, pages R134a et propane | contrôle primaire complémentaire de l’identité des fluides et des données d’équilibre publiées |
| Progression pression–température | `C:\git\pilote-fluides\packs\fluides\res\pression-temperature-interactive` | notions et vocabulaire réemployés, sans modifier la source |
| Progression surchauffe/sous-refroidissement | `C:\git\pilote-fluides\packs\fluides\res\surchauffe-sous-refroidissement-interactif` | notions et vocabulaire réemployés, sans modifier la source |
| Croix du Frigoriste | `C:\git\pilote-fluides\packs\fluides\res\svg\croix-frigoriste.svg` | référence d’implantation et de circulation |
| Symboles techniques | `C:\git\pilote-fluides\packs\fluides\res\symboles` | copies inchangées dans `shared/symboles/` |
| Logo inerWeb | `C:\git\usine-contenu\00-charte\logo-inerweb.html` | géométrie et couleurs de la marque |

Les cadrans, schémas, symboles et marque sont des productions inerWeb ou des sources internes au projet. Aucune image tierce n’est intégrée. Les tables embarquées donnent des pressions absolues ; le cadran affiche une pression relative calculée avec 1,01325 bar d’atmosphère standard.

/* =====================================================================
   voyage-eau-glacee-diagramme.js — le diagramme enthalpique de « L’ennemi
   juré », tome 1 (moteur : moteur/voyage-diagramme.js)
   ---------------------------------------------------------------------
   Schéma SANS CHIFFRES : forme du R-134a (tables SimuRézo / AquiBlue), jamais
   nommé à l’écran. Groupe d’eau glacée à condensation par air : évaporation
   +2 °C (eau autour de 12 → 6 °C), condensation +45 °C, 3 K de sous-
   refroidissement, surchauffe 5 K. Calcul : voyage-eau-glacee/calcul-diagramme-eau-glacee.js.
   chemin : 0 sortie condenseur · 1 entrée évaporateur (après le détendeur) ·
   2 fin d’ébullition · 3 sortie évaporateur · 4 refoulement · 5 début de
   condensation · 6 fin de condensation · 7 = 0.
   Calques : chute (la même ébullition à −8 °C : l’eau ne passe plus), gel
   (l’isobare où le fluide bout à 0 °C). Textes posés hors des tracés, vérifiés à l’image.
   ===================================================================== */
window.VOYAGE_DIAGRAMME = {"fluide":"R134a (forme seule, non affiché)","chiffres":false,"plage":{"h":[150,520],"p":[1,60]},"pcrit":[40.593,390.4],"cloche":[[0.913,162.9,381.4],[1.077,167.5,383.6],[1.27,172.3,385.9],[1.498,177.3,388.3],[1.767,182.5,390.7],[2.085,188,393.3],[2.459,193.7,395.8],[2.9,199.6,398.4],[3.421,205.9,401.1],[4.035,212.5,403.9],[4.759,219.4,406.6],[5.613,226.6,409.4],[6.621,234.3,412.2],[7.809,242.4,415.1],[9.211,251,417.8],[10.864,260.2,420.5],[12.814,269.9,423],[15.114,280.3,425.3],[17.827,291.6,427.3],[21.027,303.8,428.6],[24.801,317.2,429],[29.253,332.2,427.8],[34.504,350.1,423]],"BP":3.147,"HP":11.599,"chemin":[[259.4,11.599],[259.4,3.147],[399.8,3.147],[404.3,3.147],[432.2,11.599],[421.5,11.599],[263.9,11.599],[259.4,11.599]],"zones":[["liquide",190,30],["liquide + vapeur",338,7.2],["vapeur",478,25]],"calques":{"chute":{"traits":[[[259.4,2.17],[393.9,2.17]]],"texte":"la pression chute","ou":[265,1.62],"ancre":"start","coul":"#2f6fb8","plein":true},"gel":{"traits":[[[175,2.928],[438.6,2.928]]],"texte":"l’eau gèle","ou":[445,2.2],"ancre":"start","coul":"#c0392b"}}};

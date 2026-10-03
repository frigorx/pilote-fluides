/* =====================================================================
   voyage-sous-refroidisseur-diagramme.js — le diagramme enthalpique de
   l'édition « sous-refroidisseur de liquide » (moteur : moteur/voyage-diagramme.js)
   ---------------------------------------------------------------------
   Schéma SANS CHIFFRES : forme du R-134a (tables SimuRézo / AquiBlue), jamais
   nommé à l'écran. Mêmes hypothèses que l'édition vis (évaporation −10 °C,
   condensation +40 °C, 3 K au condenseur, surchauffe 6 K + 6 K dans le moteur,
   Pi = √(BP × HP), liquide principal sous-refroidi à Tsat(Pi) + 5 K) ; vapeur du
   piquage surchauffée de 5 K ; ≈ 0,18 kg de piquage par kg de liquide principal.
   Calcul : voyage-sous-refroidisseur/calcul-diagramme-sous-refroidisseur.js.
   chemin = BOUCLE DOUBLE (deux tours de la molécule) :
   0 sortie condenseur · 1 sortie sous-refroidisseur · 2 entrée évaporateur ·
   3 fin d'ébullition · 4 sortie évaporateur · 5 aspiration des vis · 6 alvéole
   devant l'orifice économiseur · 7 après le mélange · 8 refoulement · 9 début
   de condensation · 10 fin de condensation · 11 sortie condenseur ;
   second tour, le piquage : 12 après le petit détendeur (Pi) · 13 sortie de
   l'échangeur (vapeur) · 14 mélangée dans l'alvéole · 15 refoulement ·
   16, 17 condensation · 18 = 0.
   Calques : sansSR (détente sans sous-refroidisseur), gain (le froid gagné),
   detente (la vapeur de détente), marge / ecart (le sous-refroidissement à HP),
   pi (l'isobare intermédiaire). Textes posés hors des tracés, vérifiés à l'image.
   ===================================================================== */
window.VOYAGE_DIAGRAMME = {"fluide":"R134a (forme seule, non affiché)","chiffres":false,"plage":{"h":[150,520],"p":[1,60]},"pcrit":[40.593,390.4],"cloche":[[0.913,162.9,381.4],[1.077,167.5,383.6],[1.27,172.3,385.9],[1.498,177.3,388.3],[1.767,182.5,390.7],[2.085,188,393.3],[2.459,193.7,395.8],[2.9,199.6,398.4],[3.421,205.9,401.1],[4.035,212.5,403.9],[4.759,219.4,406.6],[5.613,226.6,409.4],[6.621,234.3,412.2],[7.809,242.4,415.1],[9.211,251,417.8],[10.864,260.2,420.5],[12.814,269.9,423],[15.114,280.3,425.3],[17.827,291.6,427.3],[21.027,303.8,428.6],[24.801,317.2,429],[29.253,332.2,427.8],[34.504,350.1,423]],"BP":2.006,"HP":10.166,"PI":4.516,"chemin":[[252,10.166],[224.1,10.166],[224.1,2.006],[392.7,2.006],[397.8,2.006],[402.9,2.006],[420.6,4.516],[419.1,4.516],[437.2,10.166],[419.4,10.166],[256.4,10.166],[252,10.166],[252,4.516],[410.5,4.516],[419.1,4.516],[437.2,10.166],[419.4,10.166],[256.4,10.166],[252,10.166]],"zones":[["liquide",190,30],["liquide + vapeur",330,2.75],["vapeur",478,25]],"calques":{"sansSR":{"traits":[[[252,10.166],[252,2.006]]],"texte":"sans","ou":[258,5.6],"ancre":"start","coul":"#c0392b"},"gain":{"traits":[[[224.1,2.006],[252,2.006]]],"texte":"plus de froid","ou":[214,1.24],"ancre":"start","coul":"#2f6fb8","plein":true},"detente":{"traits":[[[186.7,2.006],[224.1,2.006]]],"texte":"vapeur de détente","ou":[243,1.26],"ancre":"start","coul":"#8e44ad","plein":true},"marge":{"traits":[[[224.1,10.166],[256.4,10.166]]],"texte":"la marge","ou":[240,17],"ancre":"middle","coul":"#0f7d8c","plein":true},"ecart":{"traits":[[[224.1,10.166],[256.4,10.166]]],"texte":"sous-refroidi","ou":[160,17],"ancre":"start","coul":"#0f7d8c","plein":true},"pi":{"traits":[],"texte":"","ou":[320,7.4],"ancre":"middle","coul":"#1e7e54","pi":true}}};

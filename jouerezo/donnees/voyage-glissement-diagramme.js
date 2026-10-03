/* =====================================================================
   voyage-glissement-diagramme.js — le diagramme enthalpique de l'édition
   « le glissement » (moteur : moteur/voyage-diagramme.js)
   ---------------------------------------------------------------------
   R407C (R32 / R125 / R134a, 23 / 25 / 52 % en masse, ASHRAE 34), calculé par
   voyage-glissement/calcul-diagramme-glissement.py (CoolProp HEOS, convention
   IIR) : climatisation, rosée BP +5 °C (bulle −1,2 °C), rosée HP +45 °C (bulle
   40,1 °C), sous-refroidissement 5 K compté depuis la bulle, surchauffe 6 K
   comptée depuis la rosée, compression isentropique (refoulement ≈ 62 °C).
   Aucune pression chiffrée à l'écran (choix de Franck : seules les températures).
   chemin : 0 entrée évaporateur (+0,3 °C, titre 0,26) · 1 rosée BP (+5 °C) ·
   2 sortie évaporateur (+11 °C) · 3 refoulement · 4 rosée HP (45 °C) ·
   5 bulle HP (40 °C) · 6 sortie condenseur (35 °C) · 7 = 0.
   CALQUES : les isothermes, tracées DANS la cloche seulement (de la bulle à la
   rosée) : penchées, elles coupent l'isobare — c'est le glissement. Bleu = la
   température de bulle de l'isobare, rouge = sa température de rosée.
   SOMMET : CoolProp ne converge plus au-dessus de 44 bar (mélange près du point
   critique) : les 4 derniers rangs de la cloche sont une parabole (en h, log p)
   entre le rang de 44 bar et le point critique (46,4 bar), pour le dessin seul.
   Étiquettes posées à la main hors de tout tracé (vérifié sur l'image).
   ===================================================================== */
window.VOYAGE_DIAGRAMME = {"fluide":"R407C (R32/R125/R134a 23/25/52 % en masse)","chiffres":false,"plage":{"h":[150,500],"p":[2.5,60]},"pcrit":[46.39,376.2],"cloche":[[2.291,165.3,400],[2.512,168.5,401.2],[2.755,171.7,402.5],[3.022,175,403.7],[3.314,178.4,405],[3.635,181.8,406.2],[3.987,185.4,407.5],[4.372,189,408.8],[4.795,192.8,410.1],[5.259,196.7,411.3],[5.768,200.7,412.6],[6.326,204.8,413.9],[6.938,209,415.1],[7.61,213.4,416.4],[8.346,217.9,417.6],[9.154,222.6,418.8],[10.039,227.4,419.9],[11.011,232.4,421],[12.076,237.6,422.1],[13.244,242.9,423.1],[14.526,248.5,424],[15.931,254.3,424.8],[17.473,260.3,425.4],[19.163,266.6,425.9],[21.017,273.2,426.2],[23.051,280.2,426.3],[30.41,303.6,424.1],[33.352,312.6,422],[36.579,322.5,418.8],[40.118,334,413.4],[44,349.3,403],[44.6,353,399.4],[45.2,357.4,395],[45.7,361.9,390.5],[46.05,366.2,386.2]],"BP":5.469,"HP":17.536,"chemin":[[252.4,5.469],[411.9,5.469],[417.7,5.469],[446.9,17.536],[425.5,17.536],[260.6,17.536],[252.4,17.536],[252.4,5.469]],"zones":[["liquide",190,38],["liquide + vapeur",330,10],["vapeur",466,25]],"calques":{"isoM1":{"traits":[[[198.6,5.496],[215.4,5.415],[232.3,5.331],[249.3,5.245],[266.5,5.156],[283.8,5.066],[301.3,4.975],[318.8,4.883],[336.6,4.792],[354.5,4.703],[372.5,4.615],[390.7,4.53],[409,4.448]]],"texte":"−1 °C","ou":[194,5.85],"ancre":"end","coul":"#1f5fa8","plein":true},"isoP5":{"traits":[[[207.1,6.66],[223.5,6.568],[240,6.472],[256.5,6.374],[273.2,6.273],[290.1,6.171],[307,6.068],[324.2,5.965],[341.4,5.862],[358.8,5.76],[376.4,5.66],[394.1,5.563],[411.9,5.469]]],"texte":"+5 °C","ou":[200,7.8],"ancre":"end","coul":"#c0392b","plein":true},"iso40":{"traits":[[[260.4,17.49],[273.5,17.326],[286.6,17.159],[299.9,16.989],[313.3,16.816],[326.8,16.641],[340.4,16.465],[354.1,16.288],[367.9,16.111],[381.9,15.934],[396,15.758],[410.2,15.585],[424.5,15.413]]],"texte":"40 °C","ou":[300,14.3],"ancre":"start","coul":"#1f5fa8","plein":true},"iso45":{"traits":[[[268.7,19.723],[281.1,19.55],[293.7,19.374],[306.4,19.195],[319.1,19.014],[332,18.83],[345,18.645],[358.1,18.459],[371.4,18.273],[384.7,18.087],[398.2,17.902],[411.8,17.718],[425.5,17.536]]],"texte":"45 °C","ou":[258,26.5],"ancre":"end","coul":"#c0392b","plein":true}}};

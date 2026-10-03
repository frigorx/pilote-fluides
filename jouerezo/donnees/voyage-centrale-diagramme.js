/* =====================================================================
   voyage-centrale-diagramme.js — le diagramme enthalpique de l'édition
   « les centrales frigorifiques » (moteur : moteur/voyage-diagramme.js)
   ---------------------------------------------------------------------
   Schéma SANS CHIFFRES. Fluide : R449A (choix de Franck, 03/10), tables
   SimuRézo / AquiBlue (inerweb-dep/src/donnees/fluides.json) ; la table
   s'arrête à 35 bar : le SOMMET de la cloche (pcrit) est extrapolé à la
   main (forme seule, la table ne donne pas le point critique).
   Cycle (régime du TP « Centrale de supermarché », −10 / +45 °C) : BP au
   point de rosée −10 °C, HP au point de rosée +45 °C, sous-refroidissement
   3 K, surchauffe 5 K dans le meuble + 10 K dans la conduite d'aspiration,
   compression à rendement isentropique 0,7. Calcul :
   voyage-centrale/calcul-diagramme-centrale.js.
   GLISSEMENT : dans la cloche, les isothermes PENCHENT (mélange zéotrope) :
   isoFroidBP passe par l'entrée de l'évaporateur, isoChaudBP par le point de
   rosée BP ; isoChaudHP par le point de rosée HP, isoFroidHP par le point de
   bulle HP. Température prise linéaire en h entre bulle et rosée.
   Étiquettes placées à la main hors des tracés (vérifié sur l'image).
   chemin : 0 entrée évaporateur · 1 point de rosée BP · 2 sortie du meuble ·
   3 aspiration du compresseur · 4 refoulement · 5 point de rosée HP ·
   6 point de bulle HP · 7 liquide sous-refroidi · 8 = 0.
   ===================================================================== */
window.VOYAGE_DIAGRAMME = {fluide: "R449A (forme seule, non affiché)",chiffres: false,plage: {h: [130,520],p: [1.5,60]},pcrit: [44.5,362],cloche: [[0.906,135,375.9],[1.066,139.4,377.9],[1.256,143.9,379.9],[1.479,148.6,382],[1.741,153.5,384.1],[2.051,158.7,386.3],[2.415,164,388.5],[2.843,169.6,390.8],[3.348,175.5,393.1],[3.943,181.6,395.4],[4.642,188.1,397.8],[5.467,194.9,400.1],[6.437,202,402.5],[7.58,209.6,404.8],[8.926,217.6,407.1],[10.511,226.2,409.3],[12.377,235.2,411.3],[14.575,244.9,413.1],[17.162,255.4,414.6],[20.21,266.6,415.6],[23.798,278.9,415.8],[28.023,292.6,415],[34.095,311.5,411.1],[35.228,315.1,410]],BP: 3.588,HP: 18.742,chemin: [[256.4,3.588],[394.1,3.588],[398.7,3.588],[407.9,3.588],[468.9,18.742],[415.2,18.742],[261.3,18.742],[256.4,18.742],[256.4,3.588]],zones: [["liquide",165,25],["liquide + vapeur",330,8],["vapeur",480,30]],calques: {isoFroidBP: {traits: [[[180.9,3.87],[207.6,3.768],[234.2,3.669],[260.7,3.572],[287.2,3.478],[313.6,3.386],[339.9,3.297],[366,3.21],[392.1,3.125]]],texte: "plus froid",ou: [247,2.47],ancre: "middle",coul: "#2f6fb8"},isoChaudBP: {traits: [[[186,4.407],[212.3,4.295],[238.5,4.186],[264.6,4.08],[290.7,3.976],[316.7,3.875],[342.6,3.777],[368.3,3.681],[394.1,3.588]]],texte: "plus chaud",ou: [265.6,4.62],ancre: "start",coul: "#c0392b"},isoChaudHP: {traits: [[[269.1,20.913],[287.5,20.628],[305.8,20.348],[324.1,20.071],[342.4,19.798],[360.5,19.528],[378.8,19.263],[397,19.001],[415.2,18.742]]],texte: "plus chaud",ou: [408,25],ancre: "end",coul: "#c0392b"},isoFroidHP: {traits: [[[261.3,18.742],[280.5,18.47],[299.7,18.202],[318.9,17.937],[338,17.676],[357.2,17.42],[376.2,17.167],[395.4,16.917],[414.4,16.671]]],texte: "plus froid",ou: [268,13.4],ancre: "start",coul: "#2f6fb8"}}};

/* =====================================================================
   voyage-vis-diagramme.js — le diagramme enthalpique de l'édition
   « compresseur à vis » (moteur : moteur/voyage-diagramme.js)
   ---------------------------------------------------------------------
   Schéma SANS CHIFFRES (choix de Franck, 03/10) : la forme vient du R-134a
   (tables SimuRézo / AquiBlue), jamais nommé à l'écran. Cycle d'illustration :
   évaporation −10 °C, condensation +40 °C, sous-refroidissement 3 K,
   surchauffe 6 K + 6 K dans le moteur ; compression ≈ isentropique (l'huile
   emporte la chaleur) ; « sans huile » : rendement 0,65 ; Vi : fin de compression
   interne à 0,7 × HP (trop tôt) ou 1,35 × HP (trop tard) ; économiseur à
   Pi = √(BP × HP), liquide sous-refroidi à Tsat(Pi) + 5 K, ≈ 0,18 kg de vapeur
   par kg de fluide principal. Calcul refait par le script de la session du
   03/10 (voir voyage-vis/REPRISE-VOYAGE-VIS.md).
   chemin : 0 entrée évaporateur · 1 fin d'ébullition · 2 sortie évaporateur ·
   3 aspiration des vis · 4 mi-compression (Pi) · 5 refoulement · 6 début de
   condensation · 7 fin de condensation · 8 sortie condenseur · 9 = 0.
   ===================================================================== */
window.VOYAGE_DIAGRAMME = {fluide: "R134a (forme seule, non affiché)",chiffres: false,plage: {h: [150,520],p: [1,60]},pcrit: [40.593,390.4],cloche: [[0.913,162.9,381.4],[1.077,167.5,383.6],[1.27,172.3,385.9],[1.498,177.3,388.3],[1.767,182.5,390.7],[2.085,188,393.3],[2.459,193.7,395.8],[2.9,199.6,398.4],[3.421,205.9,401.1],[4.035,212.5,403.9],[4.759,219.4,406.6],[5.613,226.6,409.4],[6.621,234.3,412.2],[7.809,242.4,415.1],[9.211,251,417.8],[10.864,260.2,420.5],[12.814,269.9,423],[15.114,280.3,425.3],[17.827,291.6,427.3],[21.027,303.8,428.6],[24.801,317.2,429],[29.253,332.2,427.8],[34.504,350.1,423]],BP: 2.006,HP: 10.166,PI: 4.516,chemin: [[252,2.006],[392.7,2.006],[397.8,2.006],[402.9,2.006],[420.6,4.516],[438.8,10.166],[419.4,10.166],[256.4,10.166],[252,10.166],[252,2.006]],zones: [["liquide",205,22],["liquide + vapeur",330,6.8],["vapeur",478,25]],calques: {sansHuile: {traits: [[[402.9,2.006],[458.2,10.166]]],texte: "sans huile",ou: [432,13],ancre: "start",coul: "#c0392b"},sousCompression: {traits: [[[402.9,2.006],[430.8,7.116],[434.8,10.166]]],texte: "trop tôt",ou: [440,5.2],ancre: "start",coul: "#8e44ad"},surCompression: {traits: [[[402.9,2.006],[445.6,13.724],[445.6,10.166]]],texte: "trop tard",ou: [446,17.5],ancre: "start",coul: "#8e44ad"},eco: {traits: [[[252,10.166],[252,4.516],[405.7,4.516],[418.3,4.516]],[[252,10.166],[224.1,10.166],[224.1,2.006]],[[420.6,4.516],[418.3,4.516],[436.4,10.166]]],texte: "économiseur",ou: [330,3.3],ancre: "middle",coul: "#1e7e54",pi: true}}};

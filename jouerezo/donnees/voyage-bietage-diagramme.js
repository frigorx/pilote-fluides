/* =====================================================================
   voyage-bietage-diagramme.js — le diagramme enthalpique de l'édition
   « installation bi-étagée » (moteur : moteur/voyage-diagramme.js)
   ---------------------------------------------------------------------
   ÉCRIT PAR voyage-bietage/calcul-diagramme-bietage.py (CoolProp, R717) :
   ne pas retoucher à la main, relancer le script. Schéma SANS CHIFFRES ;
   la forme vient de l'ammoniac (jamais nommé sur le diagramme).
   Cycle d'illustration : évaporation −35 °C, condensation +35 °C,
   Pi = √(BP × HP) (Tsat ≈ -5 °C), bouteille BP (vapeur sèche à
   l'aspiration), bouteille intermédiaire ouverte, compressions
   isentropiques. Refoulement : un étage ≈ 164 °C ; deux étages
   ≈ 52 °C et 91 °C. Vapeur au détendeur BP : un étage
   24%, deux étages 10% ; au flotteur : 15% ;
   le HP aspire 1.30 kg par kg aspiré au BP.
   chemin : 0 liquide de la bouteille BP · 1 vapeur sèche (sortie bouteille
   BP) · 2 refoulement BP · 3 vapeur refroidie (bouteille intermédiaire) ·
   4 refoulement HP · 5 début de condensation · 6 fin de condensation ·
   7 après le flotteur · 8 liquide refroidi · 9 après le détendeur (arrivée
   dans la bouteille BP) · 10 = 0.
   calques : pi (ligne de la pression intermédiaire), seul (compression à
   un étage), detenteSeule (détente à un étage), flash (vapeur de détente).
   ===================================================================== */
window.VOYAGE_DIAGRAMME = {"fluide": "R717 (forme seule, non affiché)", "chiffres": false, "plage": {"h": [0, 2300], "p": [0.5, 150]}, "pcrit": [113.634, 1129.3], "cloche": [[0.45, 7.4, 1420.1], [0.531, 20.1, 1424.8], [0.627, 33.3, 1429.5], [0.739, 46.9, 1434.4], [0.872, 60.9, 1439.2], [1.029, 75.4, 1444.2], [1.215, 90.5, 1449.1], [1.433, 106.1, 1454.1], [1.691, 122.2, 1459.2], [1.996, 138.9, 1464.2], [2.355, 156.3, 1469.2], [2.779, 174.4, 1474.2], [3.279, 193.1, 1479.2], [3.87, 212.6, 1484.1], [4.566, 233.0, 1488.8], [5.388, 254.2, 1493.5], [6.358, 276.4, 1497.9], [7.503, 299.5, 1502.1], [8.853, 323.8, 1506.0], [10.446, 349.2, 1509.4], [12.327, 375.9, 1512.4], [14.546, 404.0, 1514.7], [17.164, 433.7, 1516.2], [20.253, 465.0, 1516.7], [23.899, 498.3, 1516.0], [28.201, 533.6, 1513.7], [33.277, 571.4, 1509.5], [39.267, 612.0, 1502.7], [46.335, 655.8, 1492.6], [54.675, 703.7, 1478.2], [64.517, 756.7, 1457.6], [76.13, 817.1, 1427.7], [89.833, 889.2, 1381.4], [106.003, 990.6, 1291.6]], "BP": 0.93, "HP": 13.5, "PI": 3.544, "chemin": [[66.5, 0.93], [1441.2, 0.93], [1619.1, 3.544], [1481.5, 3.544], [1673.1, 13.5], [1513.7, 13.5], [391.2, 13.5], [391.2, 3.544], [202.2, 3.544], [202.2, 0.93], [66.5, 0.93]], "zones": [["liquide", 250, 40, "middle"], ["liquide + vapeur", 900, 7, "middle"], ["vapeur", 1950, 1.5, "middle"]], "calques": {"pi": {"traits": [], "pi": true, "coul": "#1e7e54"}, "seul": {"traits": [[[1441.2, 0.93], [1859.2, 13.5]]], "texte": "un seul étage", "ou": [2265, 22], "ancre": "end", "coul": "#c0392b"}, "detenteSeule": {"traits": [[[391.2, 13.5], [391.2, 0.93]]], "texte": "un seul étage", "ou": [820, 0.6], "ancre": "middle", "coul": "#c0392b"}, "flash": {"traits": [[[391.2, 3.544], [1481.5, 3.544]]], "texte": "vapeur de détente", "ou": [900, 2.45], "ancre": "middle", "coul": "#1e7e54"}}};

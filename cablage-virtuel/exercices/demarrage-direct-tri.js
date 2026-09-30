// META {"id": "demarrage-direct-tri", "titre": "Démarrage direct d'un moteur triphasé : sectionneur porte-fusibles, contacteur, relais thermique, bornier", "niveau": 2, "famille": "puissance"}
// Genere par outils/qet-vers-exercice.py depuis sources\generiques\demarrage-direct-tri.qet (folio 1). NE PAS EDITER LA CARTE ; les reperes et l'implantation, oui.
window.CABLAGE_EXERCICES = window.CABLAGE_EXERCICES || {};
window.CABLAGE_EXERCICES["demarrage-direct-tri"] = {
 "id": "demarrage-direct-tri",
 "titre": "Démarrage direct d'un moteur triphasé : sectionneur porte-fusibles, contacteur, relais thermique, bornier",
 "niveau": 2,
 "famille": "puissance",
 "source": "sources\\generiques\\demarrage-direct-tri.qet",
 "folio": 1,
 "carte": {
  "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"89.0 42.0 351.0 690.0\">\n<!-- Démarrage direct d'un moteur triphasé : sectionneur porte-fusibles, contacteur, relais thermique, bornier — converti de demarrage-direct-tri.qet par outils\\qet-vers-svg.py -->\n<rect x=\"89.0\" y=\"42.0\" width=\"351.0\" height=\"690.0\" fill=\"#ffffff\"/>\n<g id=\"conducteurs\">\n<polyline points=\"146.00,80.00 300.00,80.00 300.00,204.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"146.00,100.00 320.00,100.00 320.00,204.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"146.00,120.00 340.00,120.00 340.00,204.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"300.00,236.00 300.00,324.00 300.00,324.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"320.00,236.00 320.00,324.00 320.00,324.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"340.00,236.00 340.00,324.00 340.00,324.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"300.00,356.00 300.00,443.00 300.00,443.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"320.00,356.00 320.00,443.00 320.00,443.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"340.00,356.00 340.00,443.00 340.00,443.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"300.00,477.00 300.00,554.00 300.00,554.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"320.00,477.00 320.00,554.00 320.00,554.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"340.00,477.00 340.00,554.00 340.00,554.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"300.00,566.00 300.00,644.00 300.00,644.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"320.00,566.00 320.00,644.00 320.00,644.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"340.00,566.00 340.00,644.00 340.00,644.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"400.00,483.00 400.00,554.00 400.00,554.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"400.00,566.00 400.00,680.00 346.00,680.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<\/g>\n<g id=\"symboles\">\n<g class=\"symbole\" data-type=\"src_3p_pe_n\" transform=\"translate(140.00,120.00)\">\n<line x1=\"0\" y1=\"40\" x2=\"10\" y2=\"40\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"0\" x2=\"10\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-12\" y=\"43\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 43)\">PE<\/text>\n<line x1=\"0\" y1=\"-20\" x2=\"10\" y2=\"-20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"20\" x2=\"10\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-12\" y=\"23\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 23)\">N<\/text>\n<text x=\"-12\" y=\"3\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 3)\">L3<\/text>\n<text x=\"-12\" y=\"-17\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 -17)\">L2<\/text>\n<text x=\"-12\" y=\"-37\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 -37)\">L1<\/text>\n<line x1=\"0\" y1=\"-40\" x2=\"10\" y2=\"-40\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"sectionneur_3_fusibles\" transform=\"translate(320.00,220.00)\">\n<line x1=\"-33\" y1=\"0\" x2=\"-26\" y2=\"0\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\" stroke-dasharray=\"6 3\"/>\n<line x1=\"-35\" y1=\"-10\" x2=\"-30\" y2=\"10\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\"/>\n<polyline points=\"-5,-10 0,10 0,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polygon points=\"-5.69,-4.51 -3.19,5.49 0.69,4.51 -1.81,-5.49\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polyline points=\"-25,-10 -20,10 -20,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polyline points=\"15,-10 20,10 20,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"2\" y1=\"-10\" x2=\"-2\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polygon points=\"14.31,-4.51 16.81,5.49 20.69,4.51 18.19,-5.49\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"18\" y1=\"-10\" x2=\"22\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-20\" x2=\"20\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polygon points=\"-25.69,-4.51 -23.19,5.49 -19.31,4.51 -21.81,-5.49\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-20\" y1=\"-20\" x2=\"-20\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-18\" y1=\"-10\" x2=\"-22\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-20\" y1=\"0\" x2=\"-5\" y2=\"0\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\" stroke-dasharray=\"6 3\"/>\n<line x1=\"-1\" y1=\"0\" x2=\"15\" y2=\"0\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\" stroke-dasharray=\"6 3\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"com_puiss4\" transform=\"translate(320.00,340.00)\">\n<text x=\"5\" y=\"-20\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 5 -20)\">3\nL2<\/text>\n<text x=\"25\" y=\"-20\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 25 -20)\">5\nL3<\/text>\n<text x=\"4\" y=\"19\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 4 19)\">4\nT2<\/text>\n<text x=\"-16\" y=\"19\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -16 19)\">2\nT1<\/text>\n<text x=\"24\" y=\"19\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 24 19)\">6\nT3<\/text>\n<polyline points=\"15,-10 20,10 20,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polyline points=\"-25,-10 -20,10 -20,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polyline points=\"-5,-10 0,10 0,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-20\" y1=\"-20\" x2=\"-20\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<path d=\"M -20.00,-14.50 A 2.50,2.50 0 0 0 -20.00,-9.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<path d=\"M 0.00,-14.50 A 2.50,2.50 0 0 0 -0.00,-9.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-20\" x2=\"20\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<path d=\"M 20.00,-14.50 A 2.50,2.50 0 0 0 20.00,-9.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-23\" y1=\"0\" x2=\"17\" y2=\"0\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\" stroke-dasharray=\"6 3\"/>\n<text x=\"-16\" y=\"-20\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -16 -20)\">1\nL1<\/text>\n<\/g>\n<g class=\"symbole\" data-type=\"relais_therm4_wide\" transform=\"translate(300.00,460.00)\">\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"5\" x2=\"0\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"5\" y1=\"-5\" x2=\"5\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-5\" x2=\"5\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"5\" x2=\"5\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"40\" y1=\"-20\" x2=\"40\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"40\" y1=\"5\" x2=\"40\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"45\" y1=\"-5\" x2=\"45\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"40\" y1=\"-5\" x2=\"45\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"40\" y1=\"5\" x2=\"45\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-20\" x2=\"20\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"5\" x2=\"20\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"25\" y1=\"-5\" x2=\"25\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-5\" x2=\"25\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"5\" x2=\"25\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"borne_continuite\" transform=\"translate(300.00,560.00)\">\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"-3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"2.50\" ry=\"2.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"borne_continuite\" transform=\"translate(320.00,560.00)\">\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"-3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"2.50\" ry=\"2.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"borne_continuite\" transform=\"translate(340.00,560.00)\">\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"-3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"2.50\" ry=\"2.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"borne_continuite\" transform=\"translate(400.00,560.00)\">\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"-3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"2.50\" ry=\"2.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"terre\" transform=\"translate(400.00,490.00)\">\n<line x1=\"-3\" y1=\"4\" x2=\"3\" y2=\"4\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-5\" y1=\"2\" x2=\"5\" y2=\"2\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-7\" y1=\"0\" x2=\"7\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"moteur_tri_2\" transform=\"translate(320.00,660.00)\">\n<text x=\"22\" y=\"-12\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 22 -12)\">W1<\/text>\n<text x=\"2\" y=\"-12\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 2 -12)\">V1<\/text>\n<text x=\"23\" y=\"30\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 23 30)\">PE<\/text>\n<path d=\"M 4.50,25.00 A 3.00,2.50 0 0 0 10.50,25.00\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<path d=\"M 4.50,25.00 A 3.00,2.50 0 0 0 -1.50,25.00\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-10.25\" y=\"18\" font-family=\"Arial,sans-serif\" font-size=\"18.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"6.3\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -10.25 18)\">M<\/text>\n<ellipse cx=\"0.00\" cy=\"16.00\" rx=\"23.00\" ry=\"23.00\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-7\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-20\" x2=\"20\" y2=\"4\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-20\" y1=\"-20\" x2=\"-20\" y2=\"4\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-11\" y=\"29\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -11 29)\">3<\/text>\n<text x=\"-18\" y=\"-12\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -18 -12)\">U1<\/text>\n<line x1=\"23\" y1=\"20\" x2=\"30\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<\/g>\n<\/svg>\n",
  "bornes": [
   {
    "ref": "Réseau:L2",
    "x": 146.0,
    "y": 100.0
   },
   {
    "ref": "Réseau:L1",
    "x": 146.0,
    "y": 80.0
   },
   {
    "ref": "Réseau:L3",
    "x": 146.0,
    "y": 120.0
   },
   {
    "ref": "Réseau:N",
    "x": 146.0,
    "y": 140.0
   },
   {
    "ref": "Réseau:PE",
    "x": 146.0,
    "y": 160.0
   },
   {
    "ref": "Q1:1",
    "x": 300.0,
    "y": 204.0
   },
   {
    "ref": "Q1:2",
    "x": 300.0,
    "y": 236.0
   },
   {
    "ref": "Q1:6",
    "x": 340.0,
    "y": 236.0
   },
   {
    "ref": "Q1:5",
    "x": 340.0,
    "y": 204.0
   },
   {
    "ref": "Q1:3",
    "x": 320.0,
    "y": 204.0
   },
   {
    "ref": "Q1:4",
    "x": 320.0,
    "y": 236.0
   },
   {
    "ref": "KM1:1",
    "x": 300.0,
    "y": 324.0
   },
   {
    "ref": "KM1:2",
    "x": 300.0,
    "y": 356.0
   },
   {
    "ref": "KM1:3",
    "x": 320.0,
    "y": 324.0
   },
   {
    "ref": "KM1:4",
    "x": 320.0,
    "y": 356.0
   },
   {
    "ref": "KM1:5",
    "x": 340.0,
    "y": 324.0
   },
   {
    "ref": "KM1:6",
    "x": 340.0,
    "y": 356.0
   },
   {
    "ref": "F1:1",
    "x": 300.0,
    "y": 443.0
   },
   {
    "ref": "F1:2",
    "x": 300.0,
    "y": 477.0
   },
   {
    "ref": "F1:5",
    "x": 340.0,
    "y": 443.0
   },
   {
    "ref": "F1:6",
    "x": 340.0,
    "y": 477.0
   },
   {
    "ref": "F1:3",
    "x": 320.0,
    "y": 443.0
   },
   {
    "ref": "F1:4",
    "x": 320.0,
    "y": 477.0
   },
   {
    "ref": "XB1:1",
    "x": 300.0,
    "y": 554.0
   },
   {
    "ref": "XB1:2",
    "x": 300.0,
    "y": 566.0
   },
   {
    "ref": "XB2:1",
    "x": 320.0,
    "y": 554.0
   },
   {
    "ref": "XB2:2",
    "x": 320.0,
    "y": 566.0
   },
   {
    "ref": "XB3:1",
    "x": 340.0,
    "y": 554.0
   },
   {
    "ref": "XB3:2",
    "x": 340.0,
    "y": 566.0
   },
   {
    "ref": "XB4:1",
    "x": 400.0,
    "y": 554.0
   },
   {
    "ref": "XB4:2",
    "x": 400.0,
    "y": 566.0
   },
   {
    "ref": "PE:PE",
    "x": 400.0,
    "y": 483.0
   },
   {
    "ref": "M1:U1",
    "x": 300.0,
    "y": 644.0
   },
   {
    "ref": "M1:W1",
    "x": 340.0,
    "y": 644.0
   },
   {
    "ref": "M1:V1",
    "x": 320.0,
    "y": 644.0
   },
   {
    "ref": "M1:PE",
    "x": 346.0,
    "y": 680.0
   }
  ],
  "appareils": [
   {
    "repere": "Réseau",
    "x": 139.0,
    "y": 69.0
   },
   {
    "repere": "Q1",
    "x": 315.0,
    "y": 187.0
   },
   {
    "repere": "KM1",
    "x": 322.0,
    "y": 307.0
   },
   {
    "repere": "F1",
    "x": 320.0,
    "y": 427.0
   },
   {
    "repere": "PE",
    "x": 400.0,
    "y": 466.0
   },
   {
    "repere": "M1",
    "x": 324.0,
    "y": 629.0
   },
   {
    "repere": "XB1",
    "x": 300.0,
    "y": 537.0
   },
   {
    "repere": "XB2",
    "x": 320.0,
    "y": 537.0
   },
   {
    "repere": "XB3",
    "x": 340.0,
    "y": 537.0
   },
   {
    "repere": "XB4",
    "x": 400.0,
    "y": 537.0
   }
  ]
 },
 "appareils": [
  {
   "repere": "Réseau",
   "type": "src_3p_pe_n",
   "nom": "Arrivée réseau",
   "rang": 0,
   "symbole": "<g class=\"symbole\" data-type=\"src_3p_pe_n\" transform=\"translate(0.00,0.00)\">\n<line x1=\"0\" y1=\"40\" x2=\"10\" y2=\"40\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"0\" x2=\"10\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-12\" y=\"43\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 43)\">PE<\/text>\n<line x1=\"0\" y1=\"-20\" x2=\"10\" y2=\"-20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"20\" x2=\"10\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-12\" y=\"23\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 23)\">N<\/text>\n<text x=\"-12\" y=\"3\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 3)\">L3<\/text>\n<text x=\"-12\" y=\"-17\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 -17)\">L2<\/text>\n<text x=\"-12\" y=\"-37\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 -37)\">L1<\/text>\n<line x1=\"0\" y1=\"-40\" x2=\"10\" y2=\"-40\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -21.0,
    -48.0,
    19.0,
    52.0
   ],
   "bornes": [
    {
     "id": "L2",
     "x": 6.0,
     "y": -20.0,
     "o": 1
    },
    {
     "id": "L1",
     "x": 6.0,
     "y": -40.0,
     "o": 1
    },
    {
     "id": "L3",
     "x": 6.0,
     "y": 0.0,
     "o": 1
    },
    {
     "id": "N",
     "x": 6.0,
     "y": 20.0,
     "o": 1
    },
    {
     "id": "PE",
     "x": 6.0,
     "y": 40.0,
     "o": 1
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 145.6,
    "y": 160.8
   },
   "ligne": 0
  },
  {
   "repere": "Q1",
   "type": "sectionneur_3_fusibles",
   "nom": "Sectionneur porte-fusibles",
   "rang": 1,
   "symbole": "<g class=\"symbole\" data-type=\"sectionneur_3_fusibles\" transform=\"translate(0.00,0.00)\">\n<line x1=\"-33\" y1=\"0\" x2=\"-26\" y2=\"0\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\" stroke-dasharray=\"6 3\"/>\n<line x1=\"-35\" y1=\"-10\" x2=\"-30\" y2=\"10\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\"/>\n<polyline points=\"-5,-10 0,10 0,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polygon points=\"-5.69,-4.51 -3.19,5.49 0.69,4.51 -1.81,-5.49\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polyline points=\"-25,-10 -20,10 -20,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polyline points=\"15,-10 20,10 20,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"2\" y1=\"-10\" x2=\"-2\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polygon points=\"14.31,-4.51 16.81,5.49 20.69,4.51 18.19,-5.49\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"18\" y1=\"-10\" x2=\"22\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-20\" x2=\"20\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polygon points=\"-25.69,-4.51 -23.19,5.49 -19.31,4.51 -21.81,-5.49\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-20\" y1=\"-20\" x2=\"-20\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-18\" y1=\"-10\" x2=\"-22\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-20\" y1=\"0\" x2=\"-5\" y2=\"0\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\" stroke-dasharray=\"6 3\"/>\n<line x1=\"-1\" y1=\"0\" x2=\"15\" y2=\"0\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\" stroke-dasharray=\"6 3\"/>\n<\/g>",
   "boite": [
    -40.0,
    -30.0,
    30.0,
    30.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": -20.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "2",
     "x": -20.0,
     "y": 16.0,
     "o": 2
    },
    {
     "id": "6",
     "x": 20.0,
     "y": 16.0,
     "o": 2
    },
    {
     "id": "5",
     "x": 20.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "3",
     "x": 0.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "4",
     "x": 0.0,
     "y": 16.0,
     "o": 2
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 416.0,
    "y": 164.0
   },
   "ligne": 0
  },
  {
   "repere": "KM1",
   "type": "com_puiss4",
   "nom": "Contacteur",
   "rang": 3,
   "symbole": "<g class=\"symbole\" data-type=\"com_puiss4\" transform=\"translate(0.00,0.00)\">\n<text x=\"5\" y=\"-20\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 5 -20)\">3\nL2<\/text>\n<text x=\"25\" y=\"-20\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 25 -20)\">5\nL3<\/text>\n<text x=\"4\" y=\"19\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 4 19)\">4\nT2<\/text>\n<text x=\"-16\" y=\"19\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -16 19)\">2\nT1<\/text>\n<text x=\"24\" y=\"19\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 24 19)\">6\nT3<\/text>\n<polyline points=\"15,-10 20,10 20,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polyline points=\"-25,-10 -20,10 -20,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<polyline points=\"-5,-10 0,10 0,20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-20\" y1=\"-20\" x2=\"-20\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<path d=\"M -20.00,-14.50 A 2.50,2.50 0 0 0 -20.00,-9.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<path d=\"M 0.00,-14.50 A 2.50,2.50 0 0 0 -0.00,-9.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-20\" x2=\"20\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<path d=\"M 20.00,-14.50 A 2.50,2.50 0 0 0 20.00,-9.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-23\" y1=\"0\" x2=\"17\" y2=\"0\" stroke=\"black\" stroke-width=\"0.4\" fill=\"none\" stroke-dasharray=\"6 3\"/>\n<text x=\"-16\" y=\"-20\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -16 -20)\">1\nL1<\/text>\n<\/g>",
   "boite": [
    -28.0,
    -30.0,
    32.0,
    30.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": -20.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "2",
     "x": -20.0,
     "y": 16.0,
     "o": 2
    },
    {
     "id": "3",
     "x": 0.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "4",
     "x": 0.0,
     "y": 16.0,
     "o": 2
    },
    {
     "id": "5",
     "x": 20.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "6",
     "x": 20.0,
     "y": 16.0,
     "o": 2
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 564.8,
    "y": 164.0
   },
   "ligne": 0
  },
  {
   "repere": "F1",
   "type": "relais_therm4_wide",
   "nom": "Relais thermique",
   "rang": 3,
   "symbole": "<g class=\"symbole\" data-type=\"relais_therm4_wide\" transform=\"translate(0.00,0.00)\">\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"5\" x2=\"0\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"5\" y1=\"-5\" x2=\"5\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-5\" x2=\"5\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"5\" x2=\"5\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"40\" y1=\"-20\" x2=\"40\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"40\" y1=\"5\" x2=\"40\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"45\" y1=\"-5\" x2=\"45\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"40\" y1=\"-5\" x2=\"45\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"40\" y1=\"5\" x2=\"45\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-20\" x2=\"20\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"5\" x2=\"20\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"25\" y1=\"-5\" x2=\"25\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-5\" x2=\"25\" y2=\"-5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"5\" x2=\"25\" y2=\"5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -10.0,
    -30.0,
    50.0,
    30.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": 0.0,
     "y": -17.0,
     "o": 0
    },
    {
     "id": "2",
     "x": 0.0,
     "y": 17.0,
     "o": 2
    },
    {
     "id": "5",
     "x": 40.0,
     "y": -17.0,
     "o": 0
    },
    {
     "id": "6",
     "x": 40.0,
     "y": 17.0,
     "o": 2
    },
    {
     "id": "3",
     "x": 20.0,
     "y": -17.0,
     "o": 0
    },
    {
     "id": "4",
     "x": 20.0,
     "y": 17.0,
     "o": 2
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 688.0,
    "y": 164.0
   },
   "ligne": 0
  },
  {
   "repere": "PE",
   "type": "terre",
   "nom": "Prise de terre",
   "rang": 0,
   "symbole": "<g class=\"symbole\" data-type=\"terre\" transform=\"translate(0.00,0.00)\">\n<line x1=\"-3\" y1=\"4\" x2=\"3\" y2=\"4\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-5\" y1=\"2\" x2=\"5\" y2=\"2\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-7\" y1=\"0\" x2=\"7\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -10.0,
    -21.0,
    10.0,
    9.0
   ],
   "bornes": [
    {
     "id": "PE",
     "x": 0.0,
     "y": -7.0,
     "o": 0
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 264.0,
    "y": 173.6
   },
   "ligne": 0
  },
  {
   "repere": "M1",
   "type": "moteur_tri_2",
   "nom": "Moteur",
   "rang": 4,
   "symbole": "<g class=\"symbole\" data-type=\"moteur_tri_2\" transform=\"translate(0.00,0.00)\">\n<text x=\"22\" y=\"-12\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 22 -12)\">W1<\/text>\n<text x=\"2\" y=\"-12\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 2 -12)\">V1<\/text>\n<text x=\"23\" y=\"30\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 23 30)\">PE<\/text>\n<path d=\"M 4.50,25.00 A 3.00,2.50 0 0 0 10.50,25.00\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<path d=\"M 4.50,25.00 A 3.00,2.50 0 0 0 -1.50,25.00\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-10.25\" y=\"18\" font-family=\"Arial,sans-serif\" font-size=\"18.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"6.3\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -10.25 18)\">M<\/text>\n<ellipse cx=\"0.00\" cy=\"16.00\" rx=\"23.00\" ry=\"23.00\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-7\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"20\" y1=\"-20\" x2=\"20\" y2=\"4\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-20\" y1=\"-20\" x2=\"-20\" y2=\"4\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-11\" y=\"29\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -11 29)\">3<\/text>\n<text x=\"-18\" y=\"-12\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -18 -12)\">U1<\/text>\n<line x1=\"23\" y1=\"20\" x2=\"30\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -31.0,
    -28.0,
    39.0,
    42.0
   ],
   "bornes": [
    {
     "id": "U1",
     "x": -20.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "W1",
     "x": 20.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "V1",
     "x": 0.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "PE",
     "x": 26.0,
     "y": 20.0,
     "o": 1
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 433.6,
    "y": 532.8
   },
   "ligne": 2
  },
  {
   "repere": "XB1",
   "type": "borne_continuite",
   "nom": "Borne",
   "rang": 5,
   "symbole": "<g class=\"symbole\" data-type=\"borne_continuite\" transform=\"translate(0.00,0.00)\">\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"-3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"2.50\" ry=\"2.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -10.0,
    -20.0,
    10.0,
    20.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": 0.0,
     "y": -6.0,
     "o": 0
    },
    {
     "id": "2",
     "x": 0.0,
     "y": 6.0,
     "o": 2
    }
   ],
   "liaisons_internes": [
    [
     "1",
     "2"
    ]
   ],
   "implantation": {
    "x": 383.0,
    "y": 366.0
   },
   "ligne": 1
  },
  {
   "repere": "XB2",
   "type": "borne_continuite",
   "nom": "Borne",
   "rang": 5,
   "symbole": "<g class=\"symbole\" data-type=\"borne_continuite\" transform=\"translate(0.00,0.00)\">\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"-3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"2.50\" ry=\"2.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -10.0,
    -20.0,
    10.0,
    20.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": 0.0,
     "y": -6.0,
     "o": 0
    },
    {
     "id": "2",
     "x": 0.0,
     "y": 6.0,
     "o": 2
    }
   ],
   "liaisons_internes": [
    [
     "1",
     "2"
    ]
   ],
   "implantation": {
    "x": 421.0,
    "y": 366.0
   },
   "ligne": 1
  },
  {
   "repere": "XB3",
   "type": "borne_continuite",
   "nom": "Borne",
   "rang": 5,
   "symbole": "<g class=\"symbole\" data-type=\"borne_continuite\" transform=\"translate(0.00,0.00)\">\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"-3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"2.50\" ry=\"2.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -10.0,
    -20.0,
    10.0,
    20.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": 0.0,
     "y": -6.0,
     "o": 0
    },
    {
     "id": "2",
     "x": 0.0,
     "y": 6.0,
     "o": 2
    }
   ],
   "liaisons_internes": [
    [
     "1",
     "2"
    ]
   ],
   "implantation": {
    "x": 459.0,
    "y": 366.0
   },
   "ligne": 1
  },
  {
   "repere": "XB4",
   "type": "borne_continuite",
   "nom": "Borne",
   "rang": 5,
   "symbole": "<g class=\"symbole\" data-type=\"borne_continuite\" transform=\"translate(0.00,0.00)\">\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-10\" x2=\"0\" y2=\"-3\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"2.50\" ry=\"2.50\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -10.0,
    -20.0,
    10.0,
    20.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": 0.0,
     "y": -6.0,
     "o": 0
    },
    {
     "id": "2",
     "x": 0.0,
     "y": 6.0,
     "o": 2
    }
   ],
   "liaisons_internes": [
    [
     "1",
     "2"
    ]
   ],
   "implantation": {
    "x": 497.0,
    "y": 366.0
   },
   "ligne": 1
  }
 ],
 "platine": {
  "largeur": 880,
  "hauteur": 684,
  "rangees": [
   {
    "y0": 84,
    "y1": 244.0
   },
   {
    "y0": 334.0,
    "y1": 398.0
   },
   {
    "y0": 488.0,
    "y1": 600.0
   }
  ],
  "goulottes_h": [
   {
    "y0": 16,
    "y1": 62
   },
   {
    "y0": 266.0,
    "y1": 312.0
   },
   {
    "y0": 420.0,
    "y1": 466.0
   },
   {
    "y0": 622.0,
    "y1": 668.0
   }
  ],
  "goulottes_v": [
   {
    "x0": 16,
    "x1": 62
   },
   {
    "x0": 818,
    "x1": 864
   }
  ]
 },
 "reseaux": [
  {
   "nom": "F1:2",
   "bornes": [
    "F1:2",
    "M1:U1",
    "XB1:1",
    "XB1:2"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L1"
  },
  {
   "nom": "F1:4",
   "bornes": [
    "F1:4",
    "M1:V1",
    "XB2:1",
    "XB2:2"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L2"
  },
  {
   "nom": "F1:6",
   "bornes": [
    "F1:6",
    "M1:W1",
    "XB3:1",
    "XB3:2"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L3"
  },
  {
   "nom": "PE",
   "bornes": [
    "M1:PE",
    "PE:PE",
    "XB4:1",
    "XB4:2"
   ],
   "couleurs": [
    "vert-jaune"
   ],
   "potentiel": "PE"
  },
  {
   "nom": "F1:1",
   "bornes": [
    "F1:1",
    "KM1:2"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L1"
  },
  {
   "nom": "F1:3",
   "bornes": [
    "F1:3",
    "KM1:4"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L2"
  },
  {
   "nom": "F1:5",
   "bornes": [
    "F1:5",
    "KM1:6"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L3"
  },
  {
   "nom": "KM1:1",
   "bornes": [
    "KM1:1",
    "Q1:2"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L1"
  },
  {
   "nom": "KM1:3",
   "bornes": [
    "KM1:3",
    "Q1:4"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L2"
  },
  {
   "nom": "KM1:5",
   "bornes": [
    "KM1:5",
    "Q1:6"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L3"
  },
  {
   "nom": "L1",
   "bornes": [
    "Q1:1",
    "Réseau:L1"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L1"
  },
  {
   "nom": "L2",
   "bornes": [
    "Q1:3",
    "Réseau:L2"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L2"
  },
  {
   "nom": "L3",
   "bornes": [
    "Q1:5",
    "Réseau:L3"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ],
   "potentiel": "L3"
  }
 ],
 "etapes": [
  {
   "de": "Réseau:L1",
   "a": "Q1:1",
   "couleur": "marron"
  },
  {
   "de": "Réseau:L2",
   "a": "Q1:3",
   "couleur": "marron"
  },
  {
   "de": "Réseau:L3",
   "a": "Q1:5",
   "couleur": "marron"
  },
  {
   "de": "PE:PE",
   "a": "XB4:1",
   "couleur": "vert-jaune"
  },
  {
   "de": "Q1:2",
   "a": "KM1:1",
   "couleur": "marron"
  },
  {
   "de": "Q1:4",
   "a": "KM1:3",
   "couleur": "marron"
  },
  {
   "de": "Q1:6",
   "a": "KM1:5",
   "couleur": "marron"
  },
  {
   "de": "KM1:2",
   "a": "F1:1",
   "couleur": "marron"
  },
  {
   "de": "KM1:4",
   "a": "F1:3",
   "couleur": "marron"
  },
  {
   "de": "KM1:6",
   "a": "F1:5",
   "couleur": "marron"
  },
  {
   "de": "F1:2",
   "a": "XB1:1",
   "couleur": "marron"
  },
  {
   "de": "F1:4",
   "a": "XB2:1",
   "couleur": "marron"
  },
  {
   "de": "F1:6",
   "a": "XB3:1",
   "couleur": "marron"
  },
  {
   "de": "XB1:2",
   "a": "M1:U1",
   "couleur": "marron"
  },
  {
   "de": "XB2:2",
   "a": "M1:V1",
   "couleur": "marron"
  },
  {
   "de": "XB3:2",
   "a": "M1:W1",
   "couleur": "marron"
  },
  {
   "de": "XB4:2",
   "a": "M1:PE",
   "couleur": "vert-jaune"
  }
 ]
};

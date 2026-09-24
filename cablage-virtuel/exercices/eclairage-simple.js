// META {"id": "eclairage-simple", "titre": "Allumage simple : une lampe, un interrupteur", "niveau": 1, "famille": "eclairage"}
// Genere par outils/qet-vers-exercice.py depuis sources\circuit-niveau0.qet (folio 1). NE PAS EDITER LA CARTE ; les reperes et l'implantation, oui.
window.CABLAGE_EXERCICES = window.CABLAGE_EXERCICES || {};
window.CABLAGE_EXERCICES["eclairage-simple"] = {
 "id": "eclairage-simple",
 "titre": "Allumage simple : une lampe, un interrupteur",
 "niveau": 1,
 "famille": "eclairage",
 "source": "sources\\circuit-niveau0.qet",
 "folio": 1,
 "carte": {
  "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"149.0 82.0 336.0 450.0\">\n<!-- Allumage simple : une lampe, un interrupteur — converti de circuit-niveau0.qet par outils\\qet-vers-svg.py -->\n<rect x=\"149.0\" y=\"82.0\" width=\"336.0\" height=\"450.0\" fill=\"#ffffff\"/>\n<g id=\"conducteurs\">\n<polyline points=\"206.00,120.00 440.00,120.00 440.00,184.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"440.00,216.00 440.00,283.00 440.00,283.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"440.00,317.00 440.00,394.00 440.00,394.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<polyline points=\"440.00,426.00 206.00,426.00 206.00,490.00\" fill=\"none\" stroke=\"black\" stroke-width=\"1\"/>\n<\/g>\n<g id=\"symboles\">\n<g class=\"symbole\" data-type=\"src_p\" transform=\"translate(200.00,120.00)\">\n<line x1=\"0\" y1=\"0\" x2=\"10\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-12\" y=\"3\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 3)\">L<\/text>\n<\/g>\n<g class=\"symbole\" data-type=\"pojistka1p\" transform=\"translate(440.00,200.00)\">\n<rect x=\"-3\" y=\"-10\" width=\"6\" height=\"20\" rx=\"0\" ry=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"010_switch_1pos\" transform=\"translate(440.00,300.00)\">\n<ellipse cx=\"0.00\" cy=\"10.00\" rx=\"1.75\" ry=\"1.75\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-12.5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"-10.00\" rx=\"1.75\" ry=\"1.75\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-5\" y1=\"-10\" x2=\"-0.7\" y2=\"8\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"12\" x2=\"0\" y2=\"17\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"lampe2\" transform=\"translate(440.00,410.00)\">\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"10.00\" ry=\"10.00\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"7\" y1=\"-7\" x2=\"-7\" y2=\"7\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-7\" y1=\"-7\" x2=\"7\" y2=\"7\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>\n<g class=\"symbole\" data-type=\"src_n\" transform=\"translate(200.00,490.00)\">\n<line x1=\"0\" y1=\"0\" x2=\"10\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-12\" y=\"3\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 3)\">N<\/text>\n<\/g>\n<\/g>\n<\/svg>\n",
  "bornes": [
   {
    "ref": "L:L",
    "x": 206.0,
    "y": 120.0
   },
   {
    "ref": "F1:1",
    "x": 440.0,
    "y": 184.0
   },
   {
    "ref": "F1:2",
    "x": 440.0,
    "y": 216.0
   },
   {
    "ref": "S1:1",
    "x": 440.0,
    "y": 317.0
   },
   {
    "ref": "S1:2",
    "x": 440.0,
    "y": 283.0
   },
   {
    "ref": "H1:A1",
    "x": 440.0,
    "y": 394.0
   },
   {
    "ref": "H1:A2",
    "x": 440.0,
    "y": 426.0
   },
   {
    "ref": "N:N",
    "x": 206.0,
    "y": 490.0
   }
  ],
  "appareils": [
   {
    "repere": "L",
    "x": 199.0,
    "y": 109.0
   },
   {
    "repere": "F1",
    "x": 439.0,
    "y": 165.0
   },
   {
    "repere": "S1",
    "x": 440.0,
    "y": 267.0
   },
   {
    "repere": "H1",
    "x": 440.0,
    "y": 377.0
   },
   {
    "repere": "N",
    "x": 199.0,
    "y": 479.0
   }
  ]
 },
 "appareils": [
  {
   "repere": "L",
   "type": "src_p",
   "nom": "Arrivée phase",
   "rang": 0,
   "symbole": "<g class=\"symbole\" data-type=\"src_p\" transform=\"translate(0.00,0.00)\">\n<line x1=\"0\" y1=\"0\" x2=\"10\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-12\" y=\"3\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 3)\">L<\/text>\n<\/g>",
   "boite": [
    -21.0,
    -8.0,
    19.0,
    12.0
   ],
   "bornes": [
    {
     "id": "L",
     "x": 6.0,
     "y": 0.0,
     "o": 1
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 145.6,
    "y": 128.8
   },
   "ligne": 0
  },
  {
   "repere": "F1",
   "type": "pojistka1p",
   "nom": "Fusible",
   "rang": 1,
   "symbole": "<g class=\"symbole\" data-type=\"pojistka1p\" transform=\"translate(0.00,0.00)\">\n<rect x=\"-3\" y=\"-10\" width=\"6\" height=\"20\" rx=\"0\" ry=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -11.0,
    -32.0,
    9.0,
    28.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": 0.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "2",
     "x": 0.0,
     "y": 16.0,
     "o": 2
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 380.6,
    "y": 135.2
   },
   "ligne": 0
  },
  {
   "repere": "S1",
   "type": "010_switch_1pos",
   "nom": "Bouton / interrupteur",
   "rang": 2,
   "symbole": "<g class=\"symbole\" data-type=\"010_switch_1pos\" transform=\"translate(0.00,0.00)\">\n<ellipse cx=\"0.00\" cy=\"10.00\" rx=\"1.75\" ry=\"1.75\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-12.5\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<ellipse cx=\"0.00\" cy=\"-10.00\" rx=\"1.75\" ry=\"1.75\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-5\" y1=\"-10\" x2=\"-0.7\" y2=\"8\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"12\" x2=\"0\" y2=\"17\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -10.0,
    -30.0,
    10.0,
    30.0
   ],
   "bornes": [
    {
     "id": "1",
     "x": 0.0,
     "y": 17.0,
     "o": 2
    },
    {
     "id": "2",
     "x": 0.0,
     "y": -17.0,
     "o": 0
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 259.0,
    "y": 318.0
   },
   "ligne": 1
  },
  {
   "repere": "H1",
   "type": "lampe2",
   "nom": "Voyant",
   "rang": 4,
   "symbole": "<g class=\"symbole\" data-type=\"lampe2\" transform=\"translate(0.00,0.00)\">\n<ellipse cx=\"0.00\" cy=\"0.00\" rx=\"10.00\" ry=\"10.00\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"7\" y1=\"-7\" x2=\"-7\" y2=\"7\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"-7\" y1=\"-7\" x2=\"7\" y2=\"7\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"-20\" x2=\"0\" y2=\"-10\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<line x1=\"0\" y1=\"10\" x2=\"0\" y2=\"20\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<\/g>",
   "boite": [
    -15.0,
    -30.0,
    15.0,
    30.0
   ],
   "bornes": [
    {
     "id": "A1",
     "x": 0.0,
     "y": -16.0,
     "o": 0
    },
    {
     "id": "A2",
     "x": 0.0,
     "y": 16.0,
     "o": 2
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 259.0,
    "y": 504.0
   },
   "ligne": 2
  },
  {
   "repere": "N",
   "type": "src_n",
   "nom": "Arrivée neutre",
   "rang": 0,
   "symbole": "<g class=\"symbole\" data-type=\"src_n\" transform=\"translate(0.00,0.00)\">\n<line x1=\"0\" y1=\"0\" x2=\"10\" y2=\"0\" stroke=\"black\" stroke-width=\"1\" fill=\"none\"/>\n<text x=\"-12\" y=\"3\" font-family=\"Arial,sans-serif\" font-size=\"9.0\" fill=\"#000000\" stroke=\"white\" stroke-width=\"3.1\" stroke-linejoin=\"round\" paint-order=\"stroke\" transform=\"rotate(0 -12 3)\">N<\/text>\n<\/g>",
   "boite": [
    -21.0,
    -8.0,
    19.0,
    12.0
   ],
   "bornes": [
    {
     "id": "N",
     "x": 6.0,
     "y": 0.0,
     "o": 1
    }
   ],
   "liaisons_internes": [],
   "implantation": {
    "x": 265.6,
    "y": 128.8
   },
   "ligne": 0
  }
 ],
 "platine": {
  "largeur": 518,
  "hauteur": 636,
  "rangees": [
   {
    "y0": 84,
    "y1": 180.0
   },
   {
    "y0": 270.0,
    "y1": 366.0
   },
   {
    "y0": 456.0,
    "y1": 552.0
   }
  ],
  "goulottes_h": [
   {
    "y0": 16,
    "y1": 62
   },
   {
    "y0": 202.0,
    "y1": 248.0
   },
   {
    "y0": 388.0,
    "y1": 434.0
   },
   {
    "y0": 574.0,
    "y1": 620.0
   }
  ],
  "goulottes_v": [
   {
    "x0": 16,
    "x1": 62
   },
   {
    "x0": 456,
    "x1": 502
   }
  ]
 },
 "reseaux": [
  {
   "nom": "F1:2",
   "bornes": [
    "F1:2",
    "S1:2"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge",
    "orange",
    "blanc"
   ]
  },
  {
   "nom": "H1:A1",
   "bornes": [
    "H1:A1",
    "S1:1"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge",
    "orange",
    "blanc"
   ]
  },
  {
   "nom": "L",
   "bornes": [
    "F1:1",
    "L:L"
   ],
   "couleurs": [
    "marron",
    "noir",
    "gris",
    "rouge"
   ]
  },
  {
   "nom": "N",
   "bornes": [
    "H1:A2",
    "N:N"
   ],
   "couleurs": [
    "bleu"
   ]
  }
 ],
 "etapes": [
  {
   "de": "L:L",
   "a": "F1:1",
   "couleur": "marron"
  },
  {
   "de": "N:N",
   "a": "H1:A2",
   "couleur": "bleu"
  },
  {
   "de": "F1:2",
   "a": "S1:2",
   "couleur": "marron"
  },
  {
   "de": "S1:1",
   "a": "H1:A1",
   "couleur": "marron"
  }
 ]
};

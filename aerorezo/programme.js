(function(){
  "use strict";
  const levels={cap:"CAP · découvrir et agir",bac:"Bac Pro · mesurer et régler",bts:"BTS · calculer et justifier"};
  const lines={
    A:{name:"Air & hygrométrie",color:"#3D7FCA",competence:"Socle commun · appui CP8, CP9 et CP10"},
    V:{name:"VMC",color:"#1E7E54",competence:"CP4 · Réaliser l’étude d’une installation de VMC"},
    D:{name:"Distribution",color:"#B06A00",competence:"CP7 · Réaliser l’étude d’une installation de ventilation d’un bâtiment tertiaire"},
    C:{name:"Climatisation & apports",color:"#C9451A",competence:"CP8 · Calculs d’apports thermiques · CP9 · Étude d’une installation de climatisation"},
    T:{name:"CTA",color:"#6B5FB5",competence:"CP10 · Réaliser l’étude d’une centrale de traitement d’air"},
    M:{name:"Mesure & diagnostic",color:"#176B73",competence:"Validation expérimentale et diagnostic · CP4, CP7, CP9, CP10"}
  };
  /* Les stations ne vivent plus ici : chacune a son dossier `stations/<id>/` et son
     manifeste, chargé avant ce fichier. Le réseau les assemble, il ne les recopie pas.
     C est ce qui permet de rédiger trente stations en parallèle sans conflit, et à une
     station de s ouvrir seule hors du réseau. */
  const stations=(window.AEROREZO_STATIONS||[]).slice();
  const network={
    routes:{
      A:["air-circule","pressions","debit-vitesse","hygrometrie","mesure-humidite","apport-latent","rosee-psychro","evaluation-a"],
      V:["besoin-air","air-circule","simple-flux","hygroreglable","debit-vitesse","hygrometrie","double-flux","recuperation","dimensionner-vmc","evaluation-v"],
      D:["conduits","sections","debit-vitesse","mesure-debit","pertes-lineaires","pertes-singulieres","pressions-reseau","ventilateur-equilibrage","evaluation-d"],
      C:["apport-sensible","transmission","internes-solaires","air-neuf-selection","debit-vitesse","hygrometrie","apport-latent","rosee-psychro","batteries","evaluation-c"],
      T:["architecture-cta","melange-filtration","double-flux","recuperation","pressions-reseau","batteries","rosee-psychro","humidifier-reguler","evaluation-t"],
      M:["instruments","pressions","debit-vitesse","mesure-debit","hygrometrie","mesure-humidite","pressions-reseau","rosee-psychro","diagnostic","evaluation-m"]
    },
    positions:{
      "besoin-air":[60,210],"simple-flux":[225,130],"hygroreglable":[330,130],"double-flux":[715,130],"recuperation":[820,130],"dimensionner-vmc":[940,130],"evaluation-v":[1105,130],
      "architecture-cta":[530,55],"melange-filtration":[620,55],"batteries":[960,200],"humidifier-reguler":[1010,380],"evaluation-t":[1105,380],
      "air-circule":[150,320],"pressions":[270,320],"debit-vitesse":[430,320],"hygrometrie":[640,320],"mesure-humidite":[740,400],"rosee-psychro":[905,320],"evaluation-a":[1105,320],
      "apport-sensible":[60,580],"transmission":[165,580],"internes-solaires":[270,580],"air-neuf-selection":[375,580],"apport-latent":[845,210],"evaluation-c":[1105,200],
      "conduits":[60,470],"sections":[175,470],"pertes-lineaires":[600,470],"pertes-singulieres":[700,470],"pressions-reseau":[820,470],"ventilateur-equilibrage":[940,470],"evaluation-d":[1105,470],
      "instruments":[60,380],"mesure-debit":[500,470],"diagnostic":[1010,580],"evaluation-m":[1105,580]
    },
    labels:{
      "air-circule":"Air en mouvement","pressions":"Pressions","debit-vitesse":"Débit · vitesse","hygrometrie":"Hygrométrie","rosee-psychro":"Rosée · psychro",
      "besoin-air":"Besoin d’air","simple-flux":"VMC simple flux","hygroreglable":"VMC hygro","double-flux":"Double flux","dimensionner-vmc":"Étude VMC",
      "conduits":"Conduits","sections":"Sections","pertes-lineaires":"Pertes linéaires","pertes-singulieres":"Pertes singulières","ventilateur-equilibrage":"Ventilateur · réglage",
      "apport-sensible":"Apport sensible","apport-latent":"Apport latent","transmission":"Transmission","internes-solaires":"Apports internes","air-neuf-selection":"Air neuf",
      "architecture-cta":"Lire une CTA","melange-filtration":"Mélange · filtre","batteries":"Batteries","recuperation":"Récupération","humidifier-reguler":"Réguler",
      "instruments":"Instruments","mesure-debit":"Mesure débit","pressions-reseau":"Pression réseau","mesure-humidite":"Mesure HR","diagnostic":"Diagnostic",
      "evaluation-a":"Éval. A","evaluation-v":"Éval. V","evaluation-d":"Éval. D","evaluation-c":"Éval. C","evaluation-t":"Éval. T","evaluation-m":"Éval. M"
    }
  };
  window.AEROREZO={levels,lines,stations,network};
})();

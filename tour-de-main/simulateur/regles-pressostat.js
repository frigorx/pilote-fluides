/* Le réglage des pressostats — les DONNÉES. Cadrage : CLAUDE-ESPACE-TRAVAIL/PRESSOSTATS-CADRAGE.md (§ 7).
   BP sécurité : coupure 0,2 bar par défaut, enclenchement à la pression de saturation de l'évaporation (procédure
   « PROCEDURE REGLAGE PRESSOSTAT BP SECURITE » de F. Henninot : R134a à −5 °C → 1,4 bar). HP sécurité : coupure
   ≤ PS sans soupape, ≤ 0,9 × tarage de la soupape avec soupape (NF EN 378-2 § 6.2.6.2, à recouper sur l'exemplaire
   AFNOR ; Copeland ATS-FR-1910). KP1 060-205191 : −0,2 à 7,5 bar, DIFF 0,7 à 4 bar, l'échelle porte le CUT IN ;
   KP5 manuel 060-121266 : 8 à 32 bar, DIFF fixe 3 bar, l'échelle porte le CUT OUT (fiches Danfoss, voir
   SOURCES-METIER des stations pressostat-bp-kp1 et pressostat-hp-kp5). Contacts : en BP, 1-4 s'ouvre à la baisse ;
   en HP, 1-2 s'ouvre à la hausse (guide d'installation KP). */
window.REGLES_PRESSOSTAT = {
  /* pressions EFFECTIVES (bar) de saturation, extraites de inerweb-dep/src/donnees/fluides.json (méthode AquiBlue) :
     [T °C, rosée, bulle]. Corps purs : rosée = bulle. R-449A : la BP se lit à la rosée (décision de Franck, 06/10). */
  TABLES: {
    'R-134a': [[-30, -0.17, -0.17], [-25, 0.05, 0.05], [-20, 0.31, 0.31], [-15, 0.63, 0.63], [-10, 0.99, 0.99], [-5, 1.42, 1.42], [0, 1.92, 1.92], [5, 2.48, 2.48], [10, 3.13, 3.13]],
    'R-449A': [[-30, 0.59, 1.05], [-25, 0.97, 1.51], [-20, 1.43, 2.05], [-15, 1.96, 2.68], [-10, 2.57, 3.39], [-5, 3.28, 4.21], [0, 4.1, 5.14], [5, 5.02, 6.18], [10, 6.07, 7.35]],
    'R-290': [[-30, 0.67, 0.67], [-25, 1.02, 1.02], [-20, 1.43, 1.43], [-15, 1.9, 1.9], [-10, 2.44, 2.44], [-5, 3.05, 3.05], [0, 3.73, 3.73], [5, 4.5, 4.5], [10, 5.35, 5.35]]
  },
  /* cas BP : seulement ceux où le différentiel tient dans la plage du KP1 (0,7 à 4 bar) avec une coupure à 0,2 bar */
  CAS_BP: { 'R-134a': [-10, -5, 0], 'R-449A': [-25, -20, -15, -10, -5], 'R-290': [-25, -20, -15, -10, -5] },
  COUPURE_BP: 0.2,
  /* plaques réelles, reprises de CuivRézo (simulateur/regles-azote.js, PLAQUES ; valeurs des notices des fabricants).
     Seules celles dont la PS HP tient dans la plage du KP5 servent (filtre dans pressostat.js). */
  PLAQUES: [
    { fabricant: 'Danfoss', modele: 'Optyma Plus OP-MPPM028VVLP01E', fluide: 'R448A', psHP: 32, psBP: 21.5, source: 'notice Danfoss AN18718642524202, 2024, p. 50' },
    { fabricant: 'Daikin', modele: 'RZA50AV16 (unité extérieure)', fluide: 'R32', psHP: 41.7, psBP: 27.6, source: 'notice Daikin RZA50AV16, p. 22' },
    { fabricant: 'Daikin', modele: 'RZVFQ71AV16 (unité extérieure)', fluide: 'R32', psHP: 41.7, psBP: 22.1, source: 'notice Daikin RZVFQ/RZMFQ/RZCFQ, p. 1' },
    { fabricant: 'Danfoss', modele: 'Optyma Plus OP-MPXM034MLP00G', fluide: 'R448A', psHP: 28, psBP: 7, source: 'notice Danfoss AN363633031019, p. 1' },
    { fabricant: 'Danfoss', modele: 'Optyma Plus OP-MPXM034MLP00G', fluide: 'R134a', psHP: 23, psBP: 5, source: 'notice Danfoss AN363633031019, p. 1' }
  ],
  KP1: { min: -0.2, max: 7.5, dmin: 0.7, dmax: 4 },
  KP5: { min: 8, max: 32, diff: 3 },
  /* KP5 automatique 060-117166 : 8 à 32 bar, DIFF 1,8 à 6 bar (SOURCES-METIER de la station pressostat-hp-kp5) */
  KP5A: { min: 8, max: 32, dmin: 1.8, dmax: 6 },

  /* BP de régulation (pump-down à deux pressostats) — Franck, 06/10 (nuit) : enclenchement = pression de saturation à la
     température de CONSIGNE de la chambre (le compresseur repart quand le thermostat rouvre l'électrovanne, pas sur une
     fuite) ; coupure AU-DESSUS de celle de la BP de sécurité, de 0,2 à 0,5 bar, l'écart donné par le cas. Recoupé :
     Bitzer, pump-down B55 ≠ sécurité B11, enclenchement sous la saturation à l'arrêt ; aucun constructeur ne chiffre
     l'écart. Consignes de la table gardées si DIFF tient dans le KP1 (0,7 à 4 bar) pour tous les écarts. */
  ECARTS_REGUL: [0.2, 0.3, 0.4, 0.5],
  CAS_BPR: { 'R-134a': [0, 5], 'R-449A': [-20, 0], 'R-290': [-20, 0] },
  /* HP de régulation (ventilateur) — « PROCEDURE REGLAGE PRESSOSTAT HP REGULATION » : mise en route du ventilateur
     aux environs de la pression de saturation de la condensation visée, différentiel 3 bar (R134a, 40 °C : 9 / 6 bar).
     Pressions effectives [T °C, rosée, bulle] ; R-449A : côté HP, on lit la bulle (décision de Franck, 06/10). */
  TABLES_HP: {
    'R-134a': [[30, 6.69, 6.69], [35, 7.86, 7.86], [40, 9.15, 9.15], [45, 10.59, 10.59], [50, 12.17, 12.17]],
    'R-449A': [[30, 11.68, 13.49], [35, 13.5, 15.44], [40, 15.51, 17.57], [45, 17.73, 19.9], [50, 20.17, 22.44]],
    'R-290': [[30, 9.78, 9.78], [35, 11.17, 11.17], [40, 12.68, 12.68], [45, 14.33, 14.33], [50, 16.12, 16.12]]
  },
  CAS_HPR: [35, 40, 45], DIFF_HPR: 3,

  /* Centrale — sujet officiel Bac Pro TFCA 2012, E2 U2, dossier ressources (BNSEEP, 1206-TFC T, p. 1 et 3) : centrale à
     3 compresseurs, chambre à −18 °C, 4 pressostats « de découpage basse pression de régulation » PPL1 à PPL4 et un
     pressostat BP général (PSL). Réglages dessinés : Range 1,6 / 1,8 / 2 / 2,2 bar, Diff 0,2 ; échelles Range 0 à 4,
     Diff 0,1 à 0,4. Convention retenue (celle des KP basse pression, non écrite dans le sujet) : le Range porte
     l'enclenchement, coupure = Range − Diff. */
  CENTRALE: { ranges: [1.6, 1.8, 2, 2.2], diff: 0.2, chambre: -18,
    source: 'sujet officiel Bac Pro TFCA 2012, épreuve E2 U2, dossier ressources (BNSEEP)' },
  /* Tables FINES, au degré : pressions effectives (bar). ros = rosée de −40 à +40 °C ; bul = bulle de +15 à +60 °C
     (corps purs : rosée = bulle). Extraites de inerweb-dep/src/donnees/fluides.json. Elles servent à l'échelle en °C
     du manomètre (comme sur un vrai manifold) et aux conversions bar ↔ °C. */
  FIN: { rosT0: -40, bulT0: 15,
    'R-134a': { ros: [-0.5, -0.47, -0.44, -0.41, -0.38, -0.35, -0.32, -0.28, -0.25, -0.21, -0.17, -0.13, -0.09, -0.04, 0, 0.05, 0.1, 0.15, 0.2, 0.26, 0.31, 0.37, 0.43, 0.5, 0.56, 0.63, 0.7, 0.77, 0.84, 0.92, 0.99, 1.07, 1.16, 1.24, 1.33, 1.42, 1.51, 1.61, 1.71, 1.81, 1.92, 2.02, 2.13, 2.25, 2.36, 2.48, 2.61, 2.73, 2.86, 3, 3.13, 3.27, 3.42, 3.56, 3.72, 3.87, 4.03, 4.19, 4.36, 4.53, 4.7, 4.88, 5.07, 5.25, 5.45, 5.64, 5.84, 6.05, 6.26, 6.47, 6.69, 6.91, 7.14, 7.38, 7.61, 7.86, 8.11, 8.36, 8.62, 8.88, 9.15],
      bul: [3.87, 4.03, 4.19, 4.36, 4.53, 4.7, 4.88, 5.07, 5.25, 5.45, 5.64, 5.84, 6.05, 6.26, 6.47, 6.69, 6.91, 7.14, 7.38, 7.61, 7.86, 8.11, 8.36, 8.62, 8.88, 9.15, 9.43, 9.71, 10, 10.29, 10.59, 10.89, 11.2, 11.52, 11.84, 12.17, 12.5, 12.84, 13.19, 13.54, 13.9, 14.27, 14.64, 15.02, 15.41, 15.81] },
    'R-449A': { ros: [-0.01, 0.04, 0.09, 0.15, 0.2, 0.26, 0.32, 0.39, 0.45, 0.52, 0.59, 0.66, 0.73, 0.81, 0.89, 0.97, 1.06, 1.15, 1.24, 1.33, 1.43, 1.53, 1.63, 1.74, 1.85, 1.96, 2.07, 2.19, 2.32, 2.44, 2.57, 2.71, 2.85, 2.99, 3.13, 3.28, 3.44, 3.6, 3.76, 3.93, 4.1, 4.27, 4.45, 4.64, 4.83, 5.02, 5.22, 5.42, 5.63, 5.85, 6.07, 6.29, 6.52, 6.76, 7, 7.24, 7.5, 7.75, 8.02, 8.29, 8.56, 8.85, 9.13, 9.43, 9.73, 10.04, 10.35, 10.67, 11, 11.34, 11.68, 12.03, 12.39, 12.75, 13.12, 13.5, 13.89, 14.28, 14.68, 15.09, 15.51],
      bul: [8.66, 8.94, 9.22, 9.51, 9.81, 10.11, 10.42, 10.73, 11.06, 11.38, 11.72, 12.06, 12.41, 12.76, 13.12, 13.49, 13.87, 14.25, 14.64, 15.03, 15.44, 15.85, 16.27, 16.69, 17.13, 17.57, 18.02, 18.48, 18.95, 19.42, 19.9, 20.39, 20.89, 21.4, 21.91, 22.44, 22.97, 23.51, 24.06, 24.62, 25.19, 25.77, 26.36, 26.95, 27.56, 28.18] },
    'R-290': { ros: [0.1, 0.15, 0.2, 0.25, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.67, 0.73, 0.8, 0.87, 0.95, 1.02, 1.1, 1.18, 1.26, 1.35, 1.43, 1.52, 1.61, 1.71, 1.8, 1.9, 2.01, 2.11, 2.22, 2.33, 2.44, 2.56, 2.67, 2.8, 2.92, 3.05, 3.18, 3.31, 3.45, 3.59, 3.73, 3.88, 4.03, 4.18, 4.34, 4.5, 4.66, 4.83, 5, 5.17, 5.35, 5.54, 5.72, 5.91, 6.11, 6.3, 6.5, 6.71, 6.92, 7.13, 7.35, 7.57, 7.8, 8.03, 8.27, 8.51, 8.75, 9, 9.26, 9.51, 9.78, 10.05, 10.32, 10.6, 10.88, 11.17, 11.46, 11.76, 12.06, 12.37, 12.68],
      bul: [6.3, 6.5, 6.71, 6.92, 7.13, 7.35, 7.57, 7.8, 8.03, 8.27, 8.51, 8.75, 9, 9.26, 9.51, 9.78, 10.05, 10.32, 10.6, 10.88, 11.17, 11.46, 11.76, 12.06, 12.37, 12.68, 13, 13.33, 13.65, 13.99, 14.33, 14.68, 15.03, 15.39, 15.75, 16.12, 16.5, 16.88, 17.27, 17.66, 18.06, 18.47, 18.88, 19.3, 19.72, 20.15] }
  },
  /* Régulation pressostatique — fiche n° 4 du module FG10 (ERM, fonds) : le pressostat BP assure SEUL la marche et
     l'arrêt ; enclenchement = pression de saturation à la température MAXIMALE admise dans la chambre (à l'arrêt,
     l'évaporateur tend vers la température de la chambre) ; coupure = température MINIMALE admise diminuée de l'écart à
     l'évaporateur (ΔT1). Contrôle indirect, moins précis qu'un thermostat, avec dégivrage systématique pour des chambres
     de l'ordre de 3 à 4 °C (limite pratique) ; courts-cycles si le détendeur ou les clapets fuient ; groupe plus chaud
     que la chambre (attention en hiver). Cas gardés : chambres positives, DIFF dans la plage du KP1. */
  CAS_PRS: [
    { fluide: 'R-134a', tmin: 2, tmax: 6, dt: 8 }, { fluide: 'R-134a', tmin: 0, tmax: 4, dt: 8 }, { fluide: 'R-134a', tmin: 2, tmax: 6, dt: 6 },
    { fluide: 'R-449A', tmin: 2, tmax: 6, dt: 8 }, { fluide: 'R-449A', tmin: 0, tmax: 4, dt: 8 },
    { fluide: 'R-290', tmin: 2, tmax: 6, dt: 8 }, { fluide: 'R-290', tmin: 0, tmax: 4, dt: 8 }
  ],
  Q_FIN_PRS: [
    { t: 'Elle est plus précise qu’un thermostat', ok: false, faute: 'Précision de la régulation pressostatique surestimée', pourquoi: 'Non : elle tient la chambre de façon indirecte, par la pression. Elle est moins précise qu’un thermostat.' },
    { t: 'Elle tient la chambre par la pression : si le détendeur ou les clapets du compresseur fuient, ou si le groupe a froid l’hiver, le réglage ne tient plus', ok: true, pourquoi: 'Fuite au détendeur ou aux clapets : la pression remonte trop vite, courts-cycles. Groupe plus froid que la chambre : la pression n’y remonte plus. Son atout : un dégivrage à chaque arrêt, pour une chambre vers 3 à 4 °C.' },
    { t: 'Elle convient à une chambre négative, avec dégivrage naturel', ok: false, faute: 'Dégivrage naturel en chambre négative', pourquoi: 'Le dégivrage à l’arrêt ne marche que si la chambre est au-dessus de 0 °C : en pratique, vers 3 à 4 °C.' }
  ],
  /* Pressostat à zone neutre Danfoss RT 1AL — notice AN22748644099001 et fiche AI240686443327 : −0,8 à 5 bar, DIFF fixe
     0,2 bar, zone neutre 0,2 à 0,9 bar. La pression voulue = coupure de 1-4 (bouton). 1-4 se ferme à Range + DIFF ;
     1-2 se ferme à Range + DIFF − ZN et s'ouvre à cette valeur + DIFF. Exemple Danfoss : 2,5 / ZN 0,5 → 2,7 et 2,2.
     Simplification : la bague de zone neutre est graduée en bar (sur le vrai RT, elle se lit sur le diagramme). */
  RT1AL: { min: -0.8, max: 5, diff: 0.2, znMin: 0.2, znMax: 0.9, consignes: [2, 2.5, 3], zones: [0.4, 0.5, 0.6],
    source: 'notice Danfoss RT 1AL / 5AL, AN22748644099001' },

  Q_ROLE: {
    BP: { question: 'À quoi sert le pressostat BP de sécurité ?', choix: [
      { t: 'À régler la température de la chambre froide', ok: false, faute: 'Pressostat de sécurité confondu avec la régulation', pourquoi: 'Ça, c’est la régulation (thermostat, ou pressostat BP de régulation). Un pressostat de sécurité ne sert jamais à réguler.' },
      { t: 'À arrêter le compresseur quand la pression d’aspiration devient trop basse', ok: true, pourquoi: 'Le compresseur ne doit pas tirer au vide : il chauffe, et la moindre fuite ferait entrer de l’air et de l’humidité dans le circuit.' },
      { t: 'À arrêter le compresseur quand la pression monte trop', ok: false, faute: 'BP de sécurité confondu avec la HP de sécurité', pourquoi: 'Ça, c’est le pressostat HP de sécurité, côté refoulement.' }
    ] },
    HP: { question: 'À quoi sert le pressostat HP de sécurité ?', choix: [
      { t: 'À arrêter le compresseur quand la haute pression monte trop, avant la soupape', ok: true, pourquoi: 'Condenseur encrassé, ventilateur en panne : la HP monte. Le pressostat coupe avant que la soupape s’ouvre et avant la PS de l’installation.' },
      { t: 'À mettre en route le ventilateur du condenseur', ok: false, faute: 'Pressostat de sécurité confondu avec la régulation', pourquoi: 'Ça, c’est le pressostat HP de régulation. Un pressostat de sécurité ne sert jamais à réguler.' },
      { t: 'À remplacer la soupape', ok: false, faute: 'Pressostat HP pris pour la soupape', pourquoi: 'Non : la soupape reste la dernière protection. Le pressostat coupe avant elle.' }
    ] },
    BPR: { question: 'En pump-down, à quoi sert le pressostat BP de régulation ?', choix: [
      { t: 'À protéger le compresseur d’une pression trop basse', ok: false, faute: 'BP de régulation confondu avec la BP de sécurité', pourquoi: 'Ça, c’est la BP de sécurité. La BP de régulation fait tourner l’installation : elle arrête et relance le compresseur à chaque cycle.' },
      { t: 'À arrêter le compresseur une fois l’évaporateur vidé, puis à le relancer quand la pression remonte', ok: true, pourquoi: 'Le thermostat ferme l’électrovanne liquide ; le compresseur vide l’évaporateur et la BP coupe. Quand l’électrovanne rouvre, la pression remonte et la BP relance le compresseur.' },
      { t: 'À commander l’électrovanne liquide', ok: false, faute: 'Rôle du thermostat donné au pressostat', pourquoi: 'C’est le thermostat de la chambre qui commande l’électrovanne. Le pressostat, lui, commande le compresseur.' }
    ] },
    HPR: { question: 'À quoi sert le pressostat HP de régulation ?', choix: [
      { t: 'À arrêter le compresseur si la HP devient dangereuse', ok: false, faute: 'HP de régulation confondu avec la HP de sécurité', pourquoi: 'Ça, c’est la HP de sécurité, à réarmement manuel. La HP de régulation, elle, pilote le ventilateur.' },
      { t: 'À mettre en route le ventilateur du condenseur quand la HP monte, et à l’arrêter quand elle redescend', ok: true, pourquoi: 'Par temps froid, le ventilateur arrêté laisse remonter la HP : le détendeur reste bien alimenté. Quand la HP monte, le ventilateur repart.' },
      { t: 'À régler la température de la chambre', ok: false, faute: 'Rôle du thermostat donné au pressostat HP', pourquoi: 'La température de la chambre, c’est le thermostat. Le pressostat HP de régulation tient la pression de condensation.' }
    ] },
    CEN: { question: 'Sur cette centrale, à quoi servent les pressostats de découpage PPL1 à PPL4 ?', choix: [
      { t: 'À protéger la centrale d’une BP trop basse', ok: false, faute: 'Pressostat de découpage confondu avec la sécurité', pourquoi: 'Ça, c’est le PSL, le pressostat BP général de sécurité. Les PPL, eux, règlent la puissance.' },
      { t: 'À mettre en route, puis arrêter, les étages un par un, selon la BP', ok: true, pourquoi: 'Les évaporateurs s’ouvrent : la BP monte, un étage de plus démarre. Ils se ferment : la BP baisse, un étage s’arrête. La puissance suit la demande de froid.' },
      { t: 'À régler la température de la chambre', ok: false, faute: 'Rôle du thermostat donné aux pressostats de découpage', pourquoi: 'La chambre, c’est son thermostat. Les PPL suivent la BP commune de la centrale.' }
    ] },
    PRS: { question: 'En régulation pressostatique, qui arrête et relance le compresseur ?', choix: [
      { t: 'Le thermostat de la chambre', ok: false, faute: 'Régulation pressostatique confondue avec la régulation par thermostat', pourquoi: 'Ici, pas de thermostat : le pressostat BP fait tout seul la marche et l’arrêt.' },
      { t: 'Le pressostat BP, seul : il « lit » la température de l’évaporateur à travers sa pression', ok: true, pourquoi: 'Pression et température de saturation vont ensemble : régler une pression, c’est régler une température d’évaporation.' },
      { t: 'Le pressostat HP', ok: false, faute: 'Côté du pressostat de régulation confondu', pourquoi: 'La HP suit la condensation. La température de la chambre se lit côté évaporateur : c’est la BP.' }
    ] },
    RTZ: { question: 'À quoi sert un pressostat à zone neutre ?', choix: [
      { t: 'À couper le compresseur en sécurité', ok: false, faute: 'Pressostat à zone neutre pris pour une sécurité', pourquoi: 'Non : il ne protège pas, il commande. Danfoss le prévoit pour la régulation flottante.' },
      { t: 'À donner deux ordres, « BP trop haute » (1 – 4) et « BP trop basse » (1 – 2), avec une zone entre les deux où rien ne bouge', ok: true, pourquoi: 'C’est la régulation flottante : un ordre pour monter, un ordre pour descendre, et dans la zone neutre, on ne touche à rien.' },
      { t: 'À tenir une pression avec un seul contact', ok: false, faute: 'Zone neutre mal comprise', pourquoi: 'Un seul contact, c’est un pressostat ordinaire. Ici, deux contacts, et une zone neutre entre les deux.' }
    ] }
  },
  Q_CONTACT: {
    BP: [
      { t: 'Sur 1 – 2', ok: false, faute: 'Mauvais contact du KP basse pression', pourquoi: 'Sur un KP basse pression, 1 – 2 se ferme quand la pression baisse : c’est le contact du voyant de défaut.' },
      { t: 'Sur 1 – 4', ok: true, pourquoi: 'Sur un KP basse pression, 1 – 4 s’ouvre quand la pression baisse : c’est le contact qui autorise le compresseur. Testeur allumé : compresseur autorisé.' }
    ],
    HP: [
      { t: 'Sur 1 – 2', ok: true, pourquoi: 'Sur un KP haute pression, 1 – 2 s’ouvre quand la pression monte : c’est le contact qui autorise le compresseur. 1 – 4 se ferme : voyant de défaut HP.' },
      { t: 'Sur 1 – 4', ok: false, faute: 'Mauvais contact du KP haute pression', pourquoi: 'Sur un KP haute pression, 1 – 4 se ferme quand la pression monte : c’est le contact du voyant de défaut HP.' }
    ],
    HPR: [
      { t: 'Sur 1 – 2', ok: false, faute: 'Mauvais contact pour le ventilateur', pourquoi: 'Sur un KP haute pression, 1 – 2 s’OUVRE quand la pression monte : le ventilateur s’arrêterait au moment où il faut le mettre en route.' },
      { t: 'Sur 1 – 4', ok: true, pourquoi: 'Sur un KP haute pression, 1 – 4 se ferme quand la pression monte : le ventilateur démarre. Testeur allumé : ventilateur en route.' }
    ],
    CEN: [
      { t: 'Sur le contact qui se ferme quand la BP monte', ok: true, pourquoi: 'Quand la BP dépasse son réglage, ce contact se ferme et l’étage démarre. Testeur allumé : étage en route.' },
      { t: 'Sur le contact qui se ferme quand la BP descend', ok: false, faute: 'Mauvais contact du pressostat de découpage', pourquoi: 'Celui-là donnerait l’inverse : l’étage démarrerait quand la demande de froid baisse.' }
    ],
    RTZ: [
      { t: 'Un seul, sur 1 – 4', ok: false, faute: 'Un seul testeur sur un pressostat à zone neutre', pourquoi: 'On ne verrait que l’ordre « BP trop haute ». Il faut voir les deux ordres.' },
      { t: 'Un sur 1 – 4 et un sur 1 – 2', ok: true, pourquoi: 'Chaque contact donne son ordre : 1 – 4 « trop haute », 1 – 2 « trop basse ». Dans la zone neutre, les deux testeurs sont éteints.' }
    ]
  },
  Q_ECART: [
    { t: 'Je me fie à l’échelle : elle indique la bonne valeur', ok: false, faute: 'Échelle de la face prise pour la mesure', pourquoi: 'L’échelle n’est qu’un repère de préréglage. Le vrai point d’action se prouve au manomètre.' },
    { t: 'Je note sur le registre la valeur visée', ok: false, grave: true, faute: 'Valeur visée notée à la place de la valeur mesurée', pourquoi: 'Jamais : on note ce qu’on a mesuré, pas ce qu’on voulait. Sur un organe de sécurité, c’est encore plus grave.' },
    { t: 'Je corrige à la vis, puis je refais la mesure au manomètre', ok: true, pourquoi: 'On corrige un peu, on refait le cycle, et on recommence jusqu’à tomber juste trois fois de suite.' }
  ],
  Q_ECHELLE: [
    { t: 'L’échelle : le fabricant l’a graduée', ok: false, faute: 'Échelle de la face prise pour la mesure', pourquoi: 'L’échelle n’est qu’un repère, avec son petit écart. Le pressostat a basculé à la pression lue au manomètre.' },
    { t: 'Le manomètre : c’est à cette pression que le pressostat a basculé', ok: true, pourquoi: 'Le manomètre de contrôle fait foi. L’échelle sert à prérégler, jamais à prouver.' },
    { t: 'Le calcul : on a calculé la bonne valeur', ok: false, faute: 'Calcul pris pour une preuve', pourquoi: 'Le calcul donne la valeur à viser. Seul le manomètre prouve que le pressostat bascule bien là.' }
  ],
  Q_RANGER: [
    { t: 'Je laisse le banc sous pression pour le suivant', ok: false, faute: 'Banc laissé sous pression', pourquoi: 'Un banc laissé sous pression, c’est un flexible qui peut fouetter. On ferme, on vide, on desserre le détendeur.' },
    { t: 'Je ferme la bouteille, je vide le banc, je desserre le détendeur et je note les valeurs mesurées', ok: true, pourquoi: 'Bouteille fermée, banc à zéro, détendeur desserré, et les valeurs mesurées notées : le réglage est tracé.' },
    { t: 'Je resserre les vis à fond pour que le réglage ne bouge plus', ok: false, faute: 'Vis de réglage forcées après le réglage', pourquoi: 'Forcer une vis, c’est déplacer le réglage que vous venez de prouver. On n’y touche plus.' }
  ]
};

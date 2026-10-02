/* CartoClim — LA source unique des 38 gares du réseau.
   Lue par l'accueil (la carte) et par outils/construire-reseau.mjs (qui en tire
   stations/_commun/reseau.js, l'ordre des stations pour le bouton Suivant).
   Une gare « neuf » est une station de CartoClim : `dossier` sous stations/.
   Une gare « existe » est une correspondance vers une station déjà en ligne : `r` (réseau) + `u` (chemin sur inerweb.fr).
   `l` : les lignes qui la desservent (la première est la sienne). `p` : sa place sur la carte. `court` : son étiquette (| = retour à la ligne).
   Ordre d'une ligne = ordre d'écriture ici. Validé par Franck le 02/10/2026 (maquette/carte.html). */
const CARTOCLIM = {
  reseaux: { plan: 'Thermo-techno', aero: 'AéroRézo', hydro: 'HydroMétro', elec: 'ÉlectroRézo', legis: 'Législation', cuivre: 'CuivRézo' },
  site: 'https://inerweb.fr/',
  lignes: {
    1: { lettre: 'B', nom: 'Le besoin',    sous: 'Pourquoi climatiser ?',                couleur: '#C9451A', trace: [[180,300],[360,120],[980,120]],  terminus: [1030,120] },
    2: { lettre: 'M', nom: 'La machine',   sous: 'Le cycle dans un climatiseur',         couleur: '#3D7FCA', trace: [[180,300],[1220,300]],           terminus: [1270,300] },
    3: { lettre: 'F', nom: 'Les familles', sous: 'Du mobile à l’eau glacée',             couleur: '#6B5FB5', trace: [[180,300],[360,480],[1240,480]],  terminus: [1290,480] },
    4: { lettre: 'I', nom: 'Installer',    sous: 'Poser, raccorder, mettre en service',  couleur: '#1E7E54', trace: [[540,480],[360,660],[1260,660]],  terminus: [310,660] },
    5: { lettre: 'E', nom: 'Exploiter',    sous: 'Utiliser, entretenir, dépanner',       couleur: '#B06A00', trace: [[1260,660],[1260,840],[330,840]], terminus: [280,840] }
  },
  gares: [
    { id: '1.1', l: [1,2,3], p: [180,300], court: 'Climatiser,|c’est quoi ?', titre: 'Climatiser, c’est quoi ?', s: 'neuf', dossier: '1-1-climatiser',
      src: ['Cours_Clim_TNE_Complet.docx', 'CLIMATISATION Sq1 Se2b — généralités et production en climatisation.docx'], sym: ['split-pared','ud-exte-split'] },
    { id: '1.2', l: [1], p: [440,120], court: 'Apports internes', titre: 'Occupants, équipements et soleil', s: 'existe', r: 'aero', u: 'aerorezo/stations/internes-solaires/' },
    { id: '1.3', l: [1], p: [620,120], court: 'Apport latent', titre: 'Apport latent', s: 'existe', r: 'aero', u: 'aerorezo/stations/apport-latent/' },
    { id: '1.4', l: [1], p: [800,120], court: 'Point de rosée', titre: 'Point de rosée et air humide', s: 'existe', r: 'aero', u: 'aerorezo/stations/rosee-psychro/' },
    { id: '1.5', l: [1], p: [980,120], court: 'Confort d’été', titre: 'Le confort d’été', s: 'existe', r: 'legis', u: 'legislation/stations/thermique-confort-ete/' },

    { id: '2.1', l: [2], p: [310,300], court: 'Le circuit', titre: 'Le circuit, organe par organe', s: 'existe', r: 'plan', u: 'packs/fluides/res/circuit-organe-par-organe/' },
    { id: '2.2', l: [2], p: [440,300], court: 'Pression · température', titre: 'Pression et température — la relation de saturation', s: 'existe', r: 'plan', u: 'packs/fluides/res/pression-temperature-interactive/' },
    { id: '2.3', l: [2], p: [570,300], court: 'Rotatif et scroll', titre: 'Rotatif et scroll : les compresseurs de la clim', s: 'neuf', dossier: '2-3-rotatif-scroll',
      src: ['animations-compresseurs-piston-scroll-vis-rotatif.html (fonds Bac pro MFER)', 'planche du site « Quatre compresseurs, une même fonction »', 'module-compresseur-v7-final.html'], sym: ['compresseurrotatif','compresseurscroll'] },
    { id: '2.4', l: [2], p: [700,300], court: 'Inverter', titre: 'L’Inverter : la vitesse suit le besoin', s: 'neuf', dossier: '2-4-inverter', src: ['aucun document du fonds : station à écrire'] },
    { id: '2.5', l: [2], p: [830,300], court: 'Détendre', titre: 'Détendre : capillaire et détendeur électronique', s: 'neuf', dossier: '2-5-detendre', src: ['le-detendeur.pdf', 'cours habilitation G9 — les détendeurs'], sym: ['capillaire'] },
    { id: '2.6', l: [2], p: [960,300], court: 'Vanne 4 voies', titre: 'La vanne 4 voies : froid ou chaud', s: 'neuf', dossier: '2-6-vanne-4-voies', src: ['V4V.docx (CAP IFCA)', 'CLIM REVERSIBLE.docx'], sym: ['valv-4vias'] },
    { id: '2.7', l: [2], p: [1090,300], court: 'Dégivrage', titre: 'Le dégivrage par inversion de cycle', s: 'existe', r: 'plan', u: 'packs/fluides/res/degivrage-inversion-cycle/' },
    { id: '2.8', l: [2], p: [1220,300], court: 'Diagramme', titre: 'Diagramme enthalpique frigorifique interactif', s: 'existe', r: 'plan', u: 'packs/fluides/res/diagramme-enthalpique/' },

    { id: '3.1', l: [3], p: [440,480], court: 'Monobloc', titre: 'Le monobloc : mobile, fenêtre, sans unité extérieure', s: 'neuf', dossier: '3-1-monobloc', src: ['CLIMATISATION Sé1 Sq2.docx', 'energieplus — Climatiseur individuel.pdf (tiers : documentation seulement)'] },
    { id: '3.2', l: [3,4], p: [540,480], court: 'Le split', titre: 'Le split : deux unités, un circuit', s: 'neuf', dossier: '3-2-split',
      src: ['Climatiseur split.pdf (fonds Bac pro MFER)', 'sq2 se1 TP1 — CLIM FROID SEUL SPLIT (pdf + pptx)', 'MONTAGE CLIMATISEUR SPLIT.pdf'], sym: ['split-pared','ud-exte-split'] },
    { id: '3.3', l: [3], p: [640,480], court: 'Unités intérieures', titre: 'Mural, console, cassette, gainable : choisir l’unité intérieure', s: 'neuf', dossier: '3-3-unites-interieures', src: ['CLIMATISATION Sq1 Se2b — généralités et production.docx', 'CLIMATISATION SE1 SC2.pptx'], sym: ['split-pared','cassette','split-suelo'] },
    { id: '3.4', l: [3], p: [740,480], court: 'Multisplit', titre: 'Le multisplit : une unité extérieure, plusieurs pièces', s: 'neuf', dossier: '3-4-multisplit', src: ['peu de fonds : station à écrire'], sym: ['ud-exte-split','split-pared'] },
    { id: '3.5', l: [3], p: [840,480], court: 'DRV · VRV', titre: 'Le DRV : un réseau de fluide à débit variable', s: 'neuf', dossier: '3-5-drv', src: ['S14 — Module VRV/DRV (séance 1re MFER)', '6.4 Technologie (VRV).pdf', 'VRV.doc (BTS FED)'], sym: ['vrv-exterior','caja-reparto-vrv'] },
    { id: '3.6', l: [3], p: [940,480], court: 'Roof-top', titre: 'Le roof-top : tout sur le toit', s: 'neuf', dossier: '3-6-roof-top', src: ['Roof-top.doc', 'Exercice roof-top.doc', 'Exercice N°2 roof-top.doc'], sym: ['roof-top-simple'] },
    { id: '3.7', l: [3], p: [1040,480], court: 'PAC air/eau', titre: 'La PAC air/eau : haute, moyenne et basse température', s: 'neuf', dossier: '3-7-pac-air-eau',
      src: ['13 Le fonctionnement PAC.docx', 'PRWA1000005A — Installation PAC-WT05.pdf (banc ERM WA10)', 'DTWA1000023A — Utilisation pompe à chaleur (WT05)', 'plancher chauffant.pdf', 'BALLONS TAMPONS — fiche Thermador'], sym: ['pac_air_eau_ui','ud-exte-split'],
      note: 'Ajoutée par Franck le 02/10 : l’unité extérieure côté fluide, le module hydraulique, les familles HT/MT/BT, relève de chaudière, plancher, radiateurs, ECS. Le côté eau reste chez HydroMétro (Production, Boucle).' },
    { id: '3.8', l: [3], p: [1140,480], court: 'Eau glacée', titre: 'Groupe d’eau glacée et ventilo-convecteurs', s: 'neuf', dossier: '3-8-eau-glacee', src: ['TP groupe d’eau glacée.doc', '3.1 Technologie (groupe d’eau glacée).pdf', 'banc ERM VC10 ventilo-convecteurs (fiche machine du lycée)'], sym: ['enfriadora-1','fancoil-bajo'] },
    { id: '3.9', l: [3], p: [1240,480], court: 'CTA', titre: 'Lire une CTA', s: 'existe', r: 'aero', u: 'aerorezo/stations/architecture-cta/' },

    { id: '4.1', l: [4], p: [360,660], court: 'Poser les unités', titre: 'Poser les deux unités : emplacement, supports, dégagements', s: 'neuf', dossier: '4-1-poser-les-unites', src: ['MONTAGE CLIMATISEUR SPLIT (pdf + docx)', 'HabFluide ch. 10 — Installer l’unité extérieure', 'cours habilitation G7 — Installer une unité extérieure sans fuite'], sym: ['soporte-ud-ext','ud-exte-split'] },
    { id: '4.2', l: [4], p: [460,660], court: 'Liaisons', titre: 'Les liaisons frigorifiques : longueur, dénivelé, isolant', s: 'neuf', dossier: '4-2-liaisons-frigorifiques', src: ['MONTAGE CLIMATISEUR SPLIT', 'C1 TD1 RACCORD MATIÈRE RESSOURCE.docx'] },
    { id: '4.3', l: [4], p: [560,660], court: 'Le dudgeon', titre: 'Le dudgeon', s: 'existe', r: 'cuivre', u: 'cuivrezo/stations/1-6/' },
    { id: '4.4', l: [4], p: [660,660], court: 'Condensats', titre: 'Les condensats : pente, siphon, pompe de relevage', s: 'neuf', dossier: '4-4-condensats', src: ['MONTAGE CLIMATISEUR SPLIT.docx', '10.2 Électricité (alimentation pompe de relevage).pdf'], sym: ['bomba-condensados'] },
    { id: '4.5', l: [4], p: [760,660], court: 'Alimentation', titre: 'Alimenter et relier les deux unités', s: 'neuf', dossier: '4-5-alimentation', src: ['10.2 Électricité (alimentation pompe de relevage).pdf', 'Mise en service et charge en fluide frigorigène projet.docx'] },
    { id: '4.6', l: [4], p: [860,660], court: 'Étanchéité', titre: 'L’étanchéité — de l’indice à la preuve', s: 'existe', r: 'plan', u: 'packs/fluides/res/etancheite-interactive/' },
    { id: '4.7', l: [4], p: [960,660], court: 'Tirage au vide', titre: 'La chaîne de l’intervention — manifold, vide et ordre des vannes', s: 'existe', r: 'plan', u: 'packs/fluides/res/chaine-intervention-interactive/' },
    { id: '4.8', l: [4], p: [1060,660], court: 'Vanne de service', titre: 'La vanne de service — trois positions, deux prises', s: 'existe', r: 'plan', u: 'packs/fluides/res/vanne-service-interactive/' },
    { id: '4.9', l: [4], p: [1160,660], court: 'R32 · A2L', titre: 'Les classes de sécurité — deux lettres, deux dangers', s: 'existe', r: 'plan', u: 'packs/fluides/res/cours-classes-securite/' },

    { id: '5.1', l: [5,4], p: [1260,660], court: 'Modes ·|télécommande', titre: 'Les modes et la télécommande : froid, chaud, déshumidification, ventilation', s: 'neuf', dossier: '5-1-modes-telecommande', src: ['Climatiseur split_2.pdf'], sym: ['mando-infrarrojos'] },
    { id: '5.2', l: [5], p: [1130,840], court: 'Sondes · régulation', titre: 'Le régulateur électronique — lire, régler, câbler', s: 'existe', r: 'plan', u: 'packs/fluides/res/regulateur-electronique-interactif/' },
    { id: '5.3', l: [5], p: [970,840], court: 'Entretien', titre: 'L’entretien : filtres, batteries, bac à condensats', s: 'neuf', dossier: '5-3-entretien', src: ['Climatiseur split_2.pdf'] },
    { id: '5.4', l: [5], p: [810,840], court: 'Surchauffe · SR', titre: 'Surchauffe et sous-refroidissement', s: 'existe', r: 'plan', u: 'packs/fluides/res/surchauffe-sous-refroidissement-interactif/' },
    { id: '5.5', l: [5], p: [650,840], court: 'EER · SEER', titre: 'Tome 4 — Bilan thermique et performance énergétique', s: 'existe', r: 'plan', u: 'packs/fluides/res/bilan-thermique-performance-interactif/' },
    { id: '5.6', l: [5], p: [490,840], court: 'Codes défauts', titre: 'Les codes défauts : lire ce que dit la machine', s: 'neuf', dossier: '5-6-codes-defauts', src: ['Diagnostic de pannes.pdf', 'séances S06 et S22 — diagnostic de panne (1re MFER)'] },
    { id: '5.7', l: [5], p: [330,840], court: 'Atelier panne', titre: 'Académie froid-clim — cycle animé, simulateur et atelier panne', s: 'existe', r: 'plan', u: 'packs/fluides/res/froid-clim-academie/' }
  ]
};
if (typeof module !== 'undefined') module.exports = CARTOCLIM;

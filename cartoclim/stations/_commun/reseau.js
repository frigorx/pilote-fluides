/* CartoClim — la liste ordonnée des gares du réseau.
   ÉCRIT PAR outils/construire-reseau.mjs depuis reseau/gares.js — ne pas modifier à la main.
   39 gares, 5 lignes. Une gare avec `url` est une correspondance vers inerweb.fr. */

const RESEAU = {
  lignes: {
    1: 'Le besoin',
    2: 'La machine',
    3: 'Les familles',
    4: 'Installer',
    5: 'Exploiter'
  },
  stations: [
    { id: '1.1', ligne: 1, dossier: '1-1-climatiser', titre: 'Climatiser, c’est quoi ?', genre: 'femme' },
    { id: '1.2', ligne: 1, url: 'https://inerweb.fr/aerorezo/stations/internes-solaires/', titre: 'Occupants, équipements et soleil' },
    { id: '1.3', ligne: 1, url: 'https://inerweb.fr/aerorezo/stations/apport-latent/', titre: 'Apport latent' },
    { id: '1.4', ligne: 1, url: 'https://inerweb.fr/aerorezo/stations/rosee-psychro/', titre: 'Point de rosée et air humide' },
    { id: '1.5', ligne: 1, url: 'https://inerweb.fr/legislation/stations/thermique-confort-ete/', titre: 'Le confort d’été' },
    { id: '2.1', ligne: 2, url: 'https://inerweb.fr/packs/fluides/res/circuit-organe-par-organe/', titre: 'Le circuit, organe par organe' },
    { id: '2.2', ligne: 2, url: 'https://inerweb.fr/packs/fluides/res/pression-temperature-interactive/', titre: 'Pression et température — la relation de saturation' },
    { id: '2.3', ligne: 2, dossier: '2-3-rotatif-scroll', titre: 'Rotatif et scroll : les compresseurs de la clim', genre: 'femme' },
    { id: '2.4', ligne: 2, dossier: '2-4-inverter', titre: 'L’Inverter : la vitesse suit le besoin', genre: 'femme' },
    { id: '2.5', ligne: 2, dossier: '2-5-detendre', titre: 'Détendre : capillaire et détendeur électronique', genre: 'homme' },
    { id: '2.6', ligne: 2, dossier: '2-6-vanne-4-voies', titre: 'La vanne 4 voies : froid ou chaud', genre: 'homme' },
    { id: '2.7', ligne: 2, url: 'https://inerweb.fr/packs/fluides/res/degivrage-inversion-cycle/', titre: 'Le dégivrage par inversion de cycle' },
    { id: '2.8', ligne: 2, url: 'https://inerweb.fr/packs/fluides/res/diagramme-enthalpique/', titre: 'Diagramme enthalpique frigorifique interactif' },
    { id: '3.1', ligne: 3, dossier: '3-1-monobloc', titre: 'Le monobloc : mobile, fenêtre, sans unité extérieure', genre: 'femme' },
    { id: '3.2', ligne: 3, dossier: '3-2-split', titre: 'Le split : deux unités, un circuit', genre: 'homme' },
    { id: '3.3', ligne: 3, dossier: '3-3-unites-interieures', titre: 'Mural, console, cassette, gainable : choisir l’unité intérieure', genre: 'femme' },
    { id: '3.4', ligne: 3, dossier: '3-4-multisplit', titre: 'Le multisplit : une unité extérieure, plusieurs pièces', genre: 'femme' },
    { id: '3.5', ligne: 3, dossier: '3-5-drv', titre: 'Le DRV : un réseau de fluide à débit variable', genre: 'homme' },
    { id: '3.6', ligne: 3, dossier: '3-6-roof-top', titre: 'Le roof-top : tout sur le toit', genre: 'femme' },
    { id: '3.7', ligne: 3, dossier: '3-7-pac-air-eau', titre: 'La PAC air/eau : haute, moyenne et basse température', genre: 'homme' },
    { id: '3.8', ligne: 3, dossier: '3-8-chauffe-eau-thermo', titre: 'Le chauffe-eau thermodynamique : la chaleur de l’air pour l’eau chaude', genre: 'femme' },
    { id: '3.9', ligne: 3, dossier: '3-8-eau-glacee', titre: 'Groupe d’eau glacée et ventilo-convecteurs', genre: 'femme' },
    { id: '3.10', ligne: 3, url: 'https://inerweb.fr/aerorezo/stations/architecture-cta/', titre: 'Lire une CTA' },
    { id: '4.1', ligne: 4, dossier: '4-1-poser-les-unites', titre: 'Poser les deux unités : emplacement, supports, dégagements', genre: 'homme' },
    { id: '4.2', ligne: 4, dossier: '4-2-liaisons-frigorifiques', titre: 'Les liaisons frigorifiques : longueur, dénivelé, isolant', genre: 'femme' },
    { id: '4.3', ligne: 4, url: 'https://inerweb.fr/cuivrezo/stations/1-6/', titre: 'Le dudgeon' },
    { id: '4.4', ligne: 4, dossier: '4-4-condensats', titre: 'Les condensats : pente, siphon, pompe de relevage', genre: 'femme' },
    { id: '4.5', ligne: 4, dossier: '4-5-alimentation', titre: 'Alimenter et relier les deux unités', genre: 'femme' },
    { id: '4.6', ligne: 4, url: 'https://inerweb.fr/packs/fluides/res/etancheite-interactive/', titre: 'L’étanchéité — de l’indice à la preuve' },
    { id: '4.7', ligne: 4, url: 'https://inerweb.fr/packs/fluides/res/chaine-intervention-interactive/', titre: 'La chaîne de l’intervention — manifold, vide et ordre des vannes' },
    { id: '4.8', ligne: 4, url: 'https://inerweb.fr/packs/fluides/res/vanne-service-interactive/', titre: 'La vanne de service — trois positions, deux prises' },
    { id: '4.9', ligne: 4, url: 'https://inerweb.fr/packs/fluides/res/cours-classes-securite/', titre: 'Les classes de sécurité — deux lettres, deux dangers' },
    { id: '5.1', ligne: 5, dossier: '5-1-modes-telecommande', titre: 'Les modes et la télécommande : froid, chaud, déshumidification, ventilation', genre: 'homme' },
    { id: '5.2', ligne: 5, url: 'https://inerweb.fr/packs/fluides/res/regulateur-electronique-interactif/', titre: 'Le régulateur électronique — lire, régler, câbler' },
    { id: '5.3', ligne: 5, dossier: '5-3-entretien', titre: 'L’entretien : filtres, batteries, bac à condensats', genre: 'femme' },
    { id: '5.4', ligne: 5, url: 'https://inerweb.fr/packs/fluides/res/surchauffe-sous-refroidissement-interactif/', titre: 'Surchauffe et sous-refroidissement' },
    { id: '5.5', ligne: 5, url: 'https://inerweb.fr/packs/fluides/res/bilan-thermique-performance-interactif/', titre: 'Tome 4 — Bilan thermique et performance énergétique' },
    { id: '5.6', ligne: 5, dossier: '5-6-codes-defauts', titre: 'Les codes défauts : lire ce que dit la machine', genre: 'femme' },
    { id: '5.7', ligne: 5, url: 'https://inerweb.fr/packs/fluides/res/froid-clim-academie/', titre: 'Académie froid-clim — cycle animé, simulateur et atelier panne' }
  ],

  /* la gare qui suit celle-ci, ou null si c'est la dernière du réseau */
  apres(id) {
    const i = this.stations.findIndex(s => s.id === id);
    return (i < 0 || i + 1 >= this.stations.length) ? null : this.stations[i + 1];
  },
  avant(id) {
    const i = this.stations.findIndex(s => s.id === id);
    return i <= 0 ? null : this.stations[i - 1];
  },

  /* Le dossier d'une station, pour lui faire un lien depuis une autre (rappel des prérequis). */
  dossierDe(id) {
    const s = this.stations.find(s => s.id === id);
    return s ? s.dossier || null : null;
  },
  /* L'adresse d'une gare depuis une station : un dossier d'ici, ou la station d'un autre réseau. */
  urlDe(id) {
    const s = this.stations.find(s => s.id === id);
    return !s ? null : s.url || '../' + s.dossier + '/index.html';
  }
};

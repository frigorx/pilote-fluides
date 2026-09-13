/* ÉlectroRézo — la liste ordonnée des stations du réseau.
   ÉCRIT PAR outils/construire-reseau.mjs — ne pas modifier à la main.
   Relancer l'outil après toute création ou tout renommage de station.
   59 stations, 8 lignes. */

const RESEAU = {
  lignes: {
    1: 'Les grandeurs de l’électricité',
    2: 'Les réseaux d’alimentation',
    3: 'Couper et isoler',
    4: 'Protéger',
    5: 'Commander',
    6: 'Machines et conversion',
    7: 'Faire varier l’énergie',
    8: 'L’écriture du schéma'
  },
  stations: [
    { id: '1.1', ligne: 1, dossier: '1-1-courant-intensite', titre: 'Le courant et l’intensité', genre: 'homme' },
    { id: '1.2', ligne: 1, dossier: '1-2-tension', titre: 'La tension', genre: 'femme' },
    { id: '1.3', ligne: 1, dossier: '1-3-resistance-loi-ohm', titre: 'La résistance et la loi d’Ohm', genre: 'femme' },
    { id: '1.4', ligne: 1, dossier: '1-4-puissance-energie', titre: 'La puissance et l’énergie', genre: 'femme' },
    { id: '1.5', ligne: 1, dossier: '1-5-continu-alternatif', titre: 'Continu et alternatif', genre: 'femme' },
    { id: '1.6', ligne: 1, dossier: '1-6-frequence', titre: 'La fréquence', genre: 'homme' },
    { id: '1.7', ligne: 1, dossier: '1-7-plaque-signaletique', titre: 'Lire une plaque signalétique', genre: 'femme' },
    { id: '1.8', ligne: 1, dossier: '1-8-trois-defauts', titre: 'Les trois défauts', genre: 'homme' },
    { id: '1.9', ligne: 1, dossier: '1-9-mesurer', titre: 'Mesurer : multimètre et pince', genre: 'homme' },
    { id: '2.1', ligne: 2, dossier: '2-1-phase-neutre-pe', titre: 'Phase, neutre et protection', genre: 'femme' },
    { id: '2.2', ligne: 2, dossier: '2-2-monophase', titre: 'Le réseau monophasé', genre: 'femme' },
    { id: '2.3', ligne: 2, dossier: '2-3-triphase', titre: 'Le réseau triphasé', genre: 'homme' },
    { id: '2.4', ligne: 2, dossier: '2-4-tension-simple', titre: 'La tension simple', genre: 'homme' },
    { id: '2.5', ligne: 2, dossier: '2-5-tension-composee', titre: 'La tension composée', genre: 'homme' },
    { id: '2.6', ligne: 2, dossier: '2-6-champ-tournant', titre: 'Le champ tournant', genre: 'homme' },
    { id: '3.1', ligne: 3, dossier: '3-1-interrupteur', titre: 'L’interrupteur', genre: 'femme' },
    { id: '3.2', ligne: 3, dossier: '3-2-sectionneur', titre: 'Le sectionneur', genre: 'homme' },
    { id: '3.3', ligne: 3, dossier: '3-3-interrupteur-sectionneur', titre: 'L’interrupteur-sectionneur', genre: 'homme' },
    { id: '3.4', ligne: 3, dossier: '3-4-porte-fusible', titre: 'Le porte-fusible', genre: 'femme' },
    { id: '3.5', ligne: 3, dossier: '3-5-sectionneur-porte-fusible', titre: 'Le sectionneur porte-fusible', genre: 'homme' },
    { id: '4.1', ligne: 4, dossier: '4-1-fusible-gg', titre: 'Le fusible gG', genre: 'homme' },
    { id: '4.2', ligne: 4, dossier: '4-2-fusible-am', titre: 'Le fusible aM', genre: 'homme' },
    { id: '4.3', ligne: 4, dossier: '4-3-disjoncteur-magneto-thermique', titre: 'Le disjoncteur magnéto-thermique', genre: 'homme' },
    { id: '4.4', ligne: 4, dossier: '4-4-disjoncteur-moteur', titre: 'Le disjoncteur moteur', genre: 'homme' },
    { id: '4.5', ligne: 4, dossier: '4-5-interrupteur-differentiel', titre: 'L’interrupteur différentiel', genre: 'femme' },
    { id: '4.6', ligne: 4, dossier: '4-6-disjoncteur-differentiel', titre: 'Le disjoncteur différentiel', genre: 'homme' },
    { id: '4.7', ligne: 4, dossier: '4-7-relais-thermique', titre: 'Le relais thermique', genre: 'femme' },
    { id: '4.8', ligne: 4, dossier: '4-8-terre', titre: 'La terre et la liaison équipotentielle', genre: 'homme' },
    { id: '4.9', ligne: 4, dossier: '4-9-cable-section', titre: 'Le câble : section et désignation', genre: 'femme' },
    { id: '5.1', ligne: 5, dossier: '5-1-contact-no-nf', titre: 'Le contact : repos et travail', genre: 'femme' },
    { id: '5.2', ligne: 5, dossier: '5-2-contacteur', titre: 'Le contacteur', genre: 'femme' },
    { id: '5.3', ligne: 5, dossier: '5-3-contact-auxiliaire', titre: 'Le contact auxiliaire', genre: 'homme' },
    { id: '5.4', ligne: 5, dossier: '5-4-relais', titre: 'Le relais électromécanique', genre: 'femme' },
    { id: '5.5', ligne: 5, dossier: '5-5-relais-temporise', titre: 'Le relais temporisé', genre: 'femme' },
    { id: '5.6', ligne: 5, dossier: '5-6-contacts-temporises', titre: 'Les contacts temporisés', genre: 'homme' },
    { id: '5.7', ligne: 5, dossier: '5-7-boutons', titre: 'Bouton-poussoir et sélecteur', genre: 'femme' },
    { id: '5.8', ligne: 5, dossier: '5-8-securite-signalisation', titre: 'Arrêt d’urgence et signalisation', genre: 'femme' },
    { id: '5.9', ligne: 5, dossier: '5-9-lire-un-schema', titre: 'Lire un schéma : puissance et commande', genre: 'femme' },
    { id: '6.1', ligne: 6, dossier: '6-1-bobine-electro-aimant', titre: 'La bobine et l’électro-aimant', genre: 'homme' },
    { id: '6.2', ligne: 6, dossier: '6-2-transformateur', titre: 'Le transformateur', genre: 'femme' },
    { id: '6.3', ligne: 6, dossier: '6-3-moteur-asynchrone', titre: 'Le moteur asynchrone triphasé', genre: 'homme' },
    { id: '6.4', ligne: 6, dossier: '6-4-couplage', titre: 'Le couplage de la plaque à bornes', genre: 'homme' },
    { id: '6.5', ligne: 6, dossier: '6-5-moteur-monophase', titre: 'Le moteur monophasé', genre: 'femme' },
    { id: '6.6', ligne: 6, dossier: '6-6-synchrone-et-continu', titre: 'Synchrone et courant continu', genre: 'homme' },
    { id: '7.1', ligne: 7, dossier: '7-1-varier-la-tension', titre: 'Faire varier la tension', genre: 'femme' },
    { id: '7.2', ligne: 7, dossier: '7-2-variateur-tension', titre: 'Le variateur de tension', genre: 'femme' },
    { id: '7.3', ligne: 7, dossier: '7-3-varier-la-frequence', titre: 'Faire varier la fréquence', genre: 'homme' },
    { id: '7.4', ligne: 7, dossier: '7-4-variateur-frequence', titre: 'Le variateur de fréquence', genre: 'femme' },
    { id: '8.1', ligne: 8, dossier: '8-1-trait-et-point', titre: 'Le trait et le point', genre: 'femme' },
    { id: '8.2', ligne: 8, dossier: '8-2-contact', titre: 'Le contact', genre: 'femme' },
    { id: '8.3', ligne: 8, dossier: '8-3-barre-sectionnement', titre: 'La barre du sectionnement', genre: 'femme' },
    { id: '8.4', ligne: 8, dossier: '8-4-rectangle', titre: 'Le rectangle', genre: 'homme' },
    { id: '8.5', ligne: 8, dossier: '8-5-declencheur-thermique', titre: 'Le déclencheur thermique', genre: 'femme' },
    { id: '8.6', ligne: 8, dossier: '8-6-declencheur-magnetique', titre: 'Le déclencheur magnétique', genre: 'homme' },
    { id: '8.7', ligne: 8, dossier: '8-7-pointille', titre: 'Le pointillé', genre: 'femme' },
    { id: '8.8', ligne: 8, dossier: '8-8-bobine-et-rond', titre: 'La bobine et le rond', genre: 'femme' },
    { id: '8.9', ligne: 8, dossier: '8-9-reperes', titre: 'Les repères', genre: 'homme' },
    { id: '8.10', ligne: 8, dossier: '8-10-dechiffrer', titre: 'Déchiffrer', genre: 'homme' },
    { id: '8.11', ligne: 8, dossier: '8-11-jeu-des-symboles', titre: 'Le jeu des symboles', genre: 'femme' }
  ],

  /* la station qui suit celle-ci, ou null si c'est la dernière du réseau */
  apres(id) {
    const i = this.stations.findIndex(s => s.id === id);
    return (i < 0 || i + 1 >= this.stations.length) ? null : this.stations[i + 1];
  },
  avant(id) {
    const i = this.stations.findIndex(s => s.id === id);
    return i <= 0 ? null : this.stations[i - 1];
  },

  /* Le dossier d'une station, pour lui faire un lien depuis une autre.
     Sert au rappel des prérequis, qui pointe en arrière. */
  dossierDe(id) {
    const s = this.stations.find(s => s.id === id);
    return s ? s.dossier : null;
  }
};

/* CuivRézo — le commun des stations : lignes, référentiel. SOURCE UNIQUE avec donnees/stations/*.js.
   node outils/construire.mjs assemble le tout dans donnees/stations.js (fichier fabriqué : ne pas l'éditer).
   Chaque station suit le contrat des six temps écrits (moteur/station.js ; le défi, septième temps, se tire de ces données). Chaque texte affiché a sa
   `narration` à part, écrite pour l'oreille (charte VOIX-ET-NARRATION). Vouvoiement.
   `aValider` : ce qui n'est pas dans les fiches de F. Henninot et attend sa validation (visible avec ?revue).
   Codes du référentiel : sources-metier/referentiel-cap-ifca.md (arrêté du 2 juin 2015, CAP IFCA). */

var CUIVREZO = window.CUIVREZO = window.CUIVREZO || {};
CUIVREZO.stations = [];
CUIVREZO.lignes = { 1: 'Les gestes de base', 2: 'Le chalumeau', 3: 'Braser', 4: 'Les pièces complexes' };
CUIVREZO.lignesAVenir = [
  { n: 5, titre: 'Le réseau complet', contenu: 'piquage, dessautage, pièce d’examen : une ligne frigorifique façonnée de bout en bout' }
];

/* libellés exacts, lus dans l'arrêté (voir sources-metier/referentiel-cap-ifca.md) */
var REF = {
  T6: 'T6 Préparer, vérifier les matériels et les outillages',
  T10: 'T10 Repérer, raccorder, assembler les réseaux fluidiques, aérauliques et électriques',
  T12: 'T12 Respecter les consignes de sécurité et protéger la zone de travail durant les travaux',
  C22: 'C2.2 Contrôler les éléments nécessaires à la réalisation',
  C31: 'C3.1 Organiser le poste de travail',
  C34: 'C3.4 Façonner, raccorder, assembler, isoler, les circuits (frigorifique, hydraulique, aéraulique)',
  S02: 'S0.2 Gestion de l’environnement du site d’intervention et des déchets',
  S21: 'S2.1 Outils, normes et représentation',
  S55: 'S5.5 Réseaux fluidiques et mécanique des fluides',
  S62: 'S6.2 Connaissance des principaux risques et des moyens de prévention',
  S63: 'S6.3 Identification des dangers et prévention des risques',
  S64: 'S6.4 PRAP - SST'
};

/* l'échelle de F. Henninot, cinq niveaux, chacun avec son critère observable (mémoire « Échelle à CINQ niveaux ») ;
   une absence se note ABS, hors échelle */
CUIVREZO.echelle = [
  { n: 0, nom: 'Non évalué', critere: 'La station n’a pas été traitée.' },
  { n: 1, nom: 'Non acquis', critere: 'Pièce non conforme : le geste doit être remontré par le professeur.' },
  { n: 2, nom: 'En cours', critere: 'Pièce conforme après une reprise, ou avec l’aide du professeur.' },
  { n: 3, nom: 'Acquis', critere: 'Pièce conforme, geste correct, autocontrôle fait seul.' },
  { n: 4, nom: 'Parfaitement maîtrisé', critere: 'Pièce conforme du premier coup, geste sûr, et l’élève explique le pourquoi de chaque étape.' }
];

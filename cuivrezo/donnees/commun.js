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

/* le poste d'atelier en 3D, porte d'entrée de l'accueil (03/10) : chaque zone est une pièce du modèle
   (moteur/3d/modeles/poste.js, même id) et ouvre ses stations. Le build refuse une station sans zone. */
CUIVREZO.zonesPoste = [
  { id: 'poste', nom: 'Mon poste de travail', stations: ['1-0'], phrase: 'L’établi dégagé, les lunettes et les gants à portée, le bac pour les chutes : tout commence là.' },
  { id: 'tubes', nom: 'Les tubes, en couronne et en barre', stations: ['1-1'], phrase: 'En couronne, le tube est recuit ; en barre, il est écroui. On le reconnaît avant de le couper.' },
  { id: 'tracer', nom: 'Le mètre, l’équerre et le feutre', stations: ['1-2'], phrase: 'Mesurer juste, tracer fin, sur tout le tour du tube.' },
  { id: 'couper', nom: 'Le coupe-tube et l’ébavureur', stations: ['1-3'], phrase: 'Une coupe d’équerre, puis plus aucune bavure.' },
  { id: 'cintrette', nom: 'La cintrette', stations: ['1-4'], phrase: 'Le tube s’enroule sur la roue : un coude à la main.' },
  { id: 'cintreuse', nom: 'La cintreuse', stations: ['1-5'], phrase: 'Un coude à la cote, en visant le bon repère : L, R ou 0.' },
  { id: 'dudgeon', nom: 'La dudgeonnière', stations: ['1-6'], phrase: 'Un évasement à 45°, l’écrou en place, pour un raccord vissé.' },
  { id: 'pince', nom: 'La pince à emboîture', stations: ['1-7'], phrase: 'Élargir un bout pour que l’autre tube y entre juste.' },
  { id: 'oxy', nom: 'Le poste oxyacétylénique', stations: ['2-1', '2-2'], phrase: 'Deux bouteilles, deux détendeurs, deux tuyaux, un chalumeau : la sécurité d’abord, la flamme ensuite.' },
  { id: 'tendre', nom: 'Le chalumeau propane et l’étain', stations: ['3-1'], phrase: 'Derrière le pare-flamme, l’étain coule dans l’emboîture chauffée.' },
  { id: 'azote', nom: 'L’azote, pour braser fort', stations: ['3-2'], phrase: 'L’azote balaie l’intérieur du tube pendant la brasure forte : il reste propre.' },
  { id: 'pieces', nom: 'Les pièces façonnées', stations: ['4-1', '4-2'], phrase: 'Plusieurs coudes sur un même tube : le chapeau de gendarme, la baïonnette.' }
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

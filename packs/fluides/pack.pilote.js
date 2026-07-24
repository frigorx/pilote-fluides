/* BUILD FORMATEUR — contient la couche pilote. Généré par build/build.mjs. */
window.PILOTE_PACK = {
 "pack": {
  "id": "fluides-habilitation",
  "titre": "Habilitation fluides frigorigènes — A1 · A2 · D · E (démonstrateur)",
  "version": "0.1",
  "type": "habilitation",
  "charte": "inerweb-edu",
  "modes_actifs": [
   "auto",
   "test",
   "pilotage"
  ],
  "vue_stagiaire": false,
  "carte_initiale": "c00",
  "base_img": "packs/fluides/res/"
 },
 "ressources": [
  {
   "id": "r-arrete",
   "titre": "📜 Arrêté du 21 novembre 2025 — attestations d'aptitude (Légifrance)",
   "type": "lien",
   "global": true,
   "url": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053004604"
  },
  {
   "id": "r-aida",
   "titre": "📘 Le même arrêté, mis en forme par AIDA / INERIS (plus lisible)",
   "type": "lien",
   "global": true,
   "url": "https://aida.ineris.fr/reglementation/arrete-211125-relatif-a-delivrance-attestations-daptitude-prevues-a-larticle-r-543"
  },
  {
   "id": "r-fuites",
   "titre": "🔎 Schéma : où fuit une installation ?",
   "type": "image",
   "global": true,
   "src": "packs/fluides/res/svg/points-de-fuite.svg"
  },
  {
   "id": "r-mollier",
   "titre": "📈 FRIGOLO — diagramme log p-h interactif",
   "type": "lien",
   "global": true,
   "url": "https://frigorx.github.io/inerweb-frigolo/outils/frigolo-mollier.html"
  },
  {
   "id": "r-fgaz",
   "titre": "🎯 Mission F-GAZ — 558 questions d'entraînement",
   "type": "lien",
   "global": true,
   "url": "https://frigorx.github.io/inerweb-fgaz/"
  },
  {
   "id": "r-croix",
   "titre": "❄ Schéma : la croix du frigoriste",
   "type": "image",
   "global": true,
   "src": "packs/fluides/res/svg/croix-frigoriste.svg"
  }
 ],
 "banque": [
  {
   "id": "q-g1-151",
   "dc": "G1",
   "type": "qcm",
   "enonce": "Quels sont les 4 organes principaux d'un circuit frigorifique (la croix du frigoriste) ?",
   "choix": [
    "Compresseur, évaporateur, ventilateur, thermostat",
    "Compresseur, condenseur, détendeur, évaporateur",
    "Pompe, radiateur, vase d'expansion, robinet",
    "Moteur, turbine, échangeur, régulateur"
   ],
   "bonne": 1,
   "explication": "Les 4 organes sont : le COMPRESSEUR (élève la pression), le CONDENSEUR (refroidit et liquéfie), le DÉTENDEUR (abaisse la pression), et l'ÉVAPORATEUR (absorbe la chaleur)."
  },
  {
   "id": "q-g1-160",
   "dc": "G1",
   "type": "qcm",
   "enonce": "Pourquoi ne doit-on JAMAIS laisser du liquide arriver au compresseur ?",
   "choix": [
    "Le liquide est trop froid",
    "Le liquide est incompressible et peut détruire le compresseur",
    "Le liquide est trop visqueux",
    "Le liquide consomme trop d'énergie"
   ],
   "bonne": 1,
   "explication": "Le liquide est INCOMPRESSIBLE. Si du liquide arrive au compresseur, il peut provoquer un coup de liquide qui endommage ou détruit le compresseur (clapet cassé, bielle tordue, etc.)."
  },
  {
   "id": "q-g1-62",
   "dc": "G1",
   "type": "qcm",
   "enonce": "La pression absolue est égale à :",
   "choix": [
    "Pression relative + pression atmosphérique",
    "Pression relative - pression atmosphérique",
    "Pression atmosphérique uniquement",
    "Pression relative uniquement"
   ],
   "bonne": 0,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g1-v6_042",
   "dc": "G1",
   "type": "qcm",
   "enonce": "Dans la zone diphasique (sous la cloche), le fluide est :",
   "choix": [
    "Entièrement liquide",
    "Entièrement gazeux",
    "Un mélange liquide + vapeur",
    "Supercritique"
   ],
   "bonne": 2,
   "explication": "Un mélange liquide + vapeur — Sous la courbe de saturation, le fluide est en changement de phase : liquide + vapeur coexistent."
  },
  {
   "id": "q-g1-v6_041",
   "dc": "G1",
   "type": "qcm",
   "enonce": "Sur le diagramme de Mollier (log P/h), l'axe horizontal représente :",
   "choix": [
    "La température",
    "La pression",
    "L'enthalpie",
    "Le volume"
   ],
   "bonne": 2,
   "explication": "L'enthalpie — Le diagramme de Mollier a l'enthalpie (h, en kJ/kg) en abscisse et la pression (log P) en ordonnée."
  },
  {
   "id": "q-g1-v6_048",
   "dc": "G1",
   "type": "qcm",
   "enonce": "La valeur typique de surchauffe à l'aspiration est de :",
   "choix": [
    "0 à 2 K",
    "5 à 10 K",
    "15 à 20 K",
    "30 K"
   ],
   "bonne": 1,
   "explication": "5 à 8 K — Une surchauffe de 5 à 8 K garantit que seul du gaz sec entre dans le compresseur, sans trop réduire la puissance frigorifique."
  },
  {
   "id": "q-g1-v6_145",
   "dc": "G1",
   "type": "qcm",
   "enonce": "Le sous-refroidissement typique en sortie de condenseur est de :",
   "choix": [
    "0 à 1 K",
    "4 à 8 K",
    "15 à 20 K",
    "25 à 30 K"
   ],
   "bonne": 1,
   "explication": "4 à 7 K — Un sous-refroidissement de 4 à 7 K assure que le liquide n'arrive pas au détendeur avec des bulles de gaz."
  },
  {
   "id": "q-g2-v6_001",
   "dc": "G2",
   "type": "qcm",
   "enonce": "Quel gaz est utilisé comme référence (GWP=1) pour mesurer le pouvoir de réchauffement ?",
   "choix": [
    "L'azote",
    "Le CO₂",
    "Le méthane",
    "L'ozone"
   ],
   "bonne": 1,
   "explication": "Le CO₂ — Le GWP (Global Warming Potential) compare tout gaz au CO₂ sur 100 ans. CO₂ = 1 par définition."
  },
  {
   "id": "q-g2-5",
   "dc": "G2",
   "type": "qcm",
   "enonce": "Le protocole de Montréal (1987) visait principalement :",
   "choix": [
    "Les gaz à effet de serre",
    "La protection de la couche d'ozone",
    "La réduction des émissions de CO2",
    "L'interdiction des HFC"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g2-v6_003",
   "dc": "G2",
   "type": "qcm",
   "enonce": "L'amendement de Kigali (2016) ajoute au Protocole de Montréal la réduction progressive de :",
   "choix": [
    "Les CFC",
    "Les HCFC",
    "Les HFC",
    "Les HFO"
   ],
   "bonne": 2,
   "explication": "Les HFC — Kigali (2016) étend le Protocole de Montréal aux HFC pour lutter contre le réchauffement climatique."
  },
  {
   "id": "q-g2-v6_004",
   "dc": "G2",
   "type": "qcm",
   "enonce": "Les HFC ont un ODP (potentiel de destruction de l'ozone) de :",
   "choix": [
    "0",
    "0,05",
    "0,5",
    "1"
   ],
   "bonne": 0,
   "explication": "0 — Les HFC ne contiennent pas de chlore, donc ODP = 0. Mais leur GWP est élevé."
  },
  {
   "id": "q-g2-v6_113",
   "dc": "G2",
   "type": "qcm",
   "enonce": "15 kg de R32 (GWP=675) donnent combien de tCO₂e ?",
   "choix": [
    "4,5",
    "6,75",
    "10,13",
    "101,3"
   ],
   "bonne": 2,
   "explication": "10,13 tCO₂e (arrondi) — Calcul : 15 × 675 / 1000 = 10,125 tCO₂e → contrôle annuel."
  },
  {
   "id": "q-g2-v6_011",
   "dc": "G2",
   "type": "qcm",
   "enonce": "Le règlement UE 2024/573 remplace quel règlement ?",
   "choix": [
    "UE 842/2006",
    "UE 517/2014",
    "CE 2037/2000",
    "UE 303/2008"
   ],
   "bonne": 1,
   "explication": "UE 517/2014 — Le nouveau règlement UE 2024/573 (en vigueur mars 2024) remplace le 517/2014 avec des objectifs plus stricts."
  },
  {
   "id": "q-g2-v6_017",
   "dc": "G2",
   "type": "qcm",
   "enonce": "Le système de quotas HFC dans l'UE fonctionne sur le principe de :",
   "choix": [
    "Quotas attribués aux pays",
    "Quotas attribués aux importateurs et producteurs",
    "Quotas attribués aux installateurs",
    "Taxe proportionnelle au GWP"
   ],
   "bonne": 1,
   "explication": "Quotas attribués aux importateurs et producteurs"
  },
  {
   "id": "q-g3-v6_058",
   "dc": "G3",
   "type": "qcm",
   "enonce": "Le tirage au vide a pour but principal d'éliminer :",
   "choix": [
    "L'huile usagée",
    "L'air et l'humidité du circuit",
    "Les particules métalliques",
    "Le fluide résiduel"
   ],
   "bonne": 1,
   "explication": "L'air et l'humidité — Le tirage au vide évacue l'air (incondensable qui augmente la HP) et l'humidité (qui forme des acides avec l'huile POE)."
  },
  {
   "id": "q-g3-v6_059",
   "dc": "G3",
   "type": "qcm",
   "enonce": "Si la pression remonte de plus de 100 µm pendant le test de maintien, cela indique :",
   "choix": [
    "Le circuit est étanche",
    "Une fuite ou de l'humidité résiduelle",
    "Le vide est suffisant",
    "La pompe est trop puissante"
   ],
   "bonne": 1,
   "explication": "Fuite ou humidité résiduelle — Une remontée > 100 µm après fermeture de la vanne indique soit une fuite, soit de l'humidité qui s'évapore."
  },
  {
   "id": "q-g3-v6_062",
   "dc": "G3",
   "type": "qcm",
   "enonce": "La pression d'épreuve de résistance d'un circuit est réalisée avec :",
   "choix": [
    "Du fluide frigorigène",
    "De l'oxygène",
    "De l'azote sec",
    "De l'air comprimé"
   ],
   "bonne": 2,
   "explication": "De l'azote sec — L'épreuve de résistance se fait toujours à l'azote sec. Jamais d'oxygène (risque explosion avec huile) ni d'air comprimé (humidité)."
  },
  {
   "id": "q-g3-v6_159",
   "dc": "G3",
   "type": "qcm",
   "enonce": "La pompe à vide ne doit jamais être utilisée pour :",
   "choix": [
    "Évacuer l'air du circuit",
    "Évacuer l'humidité",
    "Récupérer du fluide frigorigène",
    "Atteindre le vide requis"
   ],
   "bonne": 2,
   "explication": "Récupérer du fluide — La pompe à vide n'est pas conçue pour pomper du fluide (ça l'endommage). La récupération se fait avec un groupe de récupération spécifique."
  },
  {
   "id": "q-g3-66",
   "dc": "G3",
   "type": "qcm",
   "enonce": "La température d'ébullition de l'eau à pression atmosphérique est :",
   "choix": [
    "0°C",
    "50°C",
    "100°C",
    "150°C"
   ],
   "bonne": 2,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g4-v6_074",
   "dc": "G4",
   "type": "qcm",
   "enonce": "La méthode de détection indirecte consiste à :",
   "choix": [
    "Utiliser un détecteur électronique",
    "Suivre les paramètres de fonctionnement (P, T°, surchauffe)",
    "Mettre sous pression d'azote",
    "Utiliser un traceur UV"
   ],
   "bonne": 1,
   "explication": "Suivre les paramètres de fonctionnement — La détection indirecte analyse les dérives des paramètres (baisse de HP, augmentation de surchauffe, etc.) qui signalent une perte de charge."
  },
  {
   "id": "q-g4-v6_072",
   "dc": "G4",
   "type": "qcm",
   "enonce": "La détection par eau savonneuse est une méthode :",
   "choix": [
    "Directe et localisante",
    "Indirecte et globale",
    "Réglementairement suffisante seule",
    "Utilisable uniquement en intérieur"
   ],
   "bonne": 0,
   "explication": "Directe et localisante — L'eau savonneuse permet de localiser précisément les fuites par la formation de bulles. C'est un complément au détecteur électronique."
  },
  {
   "id": "q-g4-v6_163",
   "dc": "G4",
   "type": "qcm",
   "enonce": "Le détecteur électronique de fuites détecte les fuites par :",
   "choix": [
    "La couleur du gaz",
    "La différence de concentration de gaz dans l'air ambiant",
    "Le bruit de la fuite",
    "La variation de température"
   ],
   "bonne": 1,
   "explication": "Différence de concentration — Le détecteur mesure la concentration de gaz fluoré dans l'air et alerte quand elle dépasse un seuil."
  },
  {
   "id": "q-g4-v6_069",
   "dc": "G4",
   "type": "qcm",
   "enonce": "Un détecteur de fuites doit être calibré au minimum :",
   "choix": [
    "Tous les mois",
    "Tous les 6 mois",
    "Tous les ans",
    "Tous les 5 ans"
   ],
   "bonne": 2,
   "explication": "Tous les ans — La calibration annuelle est obligatoire pour garantir la fiabilité de la mesure."
  },
  {
   "id": "q-g4-v6_168",
   "dc": "G4",
   "type": "qcm",
   "enonce": "Le détecteur de fuites doit être vérifié au gaz de référence :",
   "choix": [
    "Avant chaque utilisation",
    "Une fois par an",
    "Uniquement à l'achat",
    "Tous les 5 ans"
   ],
   "bonne": 0,
   "explication": "Avant chaque utilisation — Avant chaque campagne de détection, il faut vérifier le bon fonctionnement du détecteur avec un gaz de référence calibré."
  },
  {
   "id": "q-g4-104",
   "dc": "G4",
   "type": "qcm",
   "enonce": "Lors d'un contrôle d'étanchéité, le contrôleur doit vérifier :",
   "choix": [
    "Uniquement le compresseur",
    "Seulement les raccords visibles",
    "Tous les éléments du circuit",
    "Uniquement la charge de fluide"
   ],
   "bonne": 2,
   "explication": "Les fréquences de contrôle d’étanchéité se déclenchent par seuils en tCO₂e (5 / 50 / 500), avec des périodicités typiques 12 / 6 / 3 mois. ⚠ raisonner en 'kg' au lieu de tCO₂e, ou inverser les seuils (5/50/500)."
  },
  {
   "id": "q-g4-114",
   "dc": "G4",
   "type": "qcm",
   "enonce": "Le contrôle d'étanchéité doit porter sur :",
   "choix": [
    "Uniquement la partie frigorifique",
    "Uniquement la partie électrique",
    "Frigorifique + sécurités + étiquetage",
    "Seulement les raccords"
   ],
   "bonne": 2,
   "explication": "Les fréquences de contrôle d’étanchéité se déclenchent par seuils en tCO₂e (5 / 50 / 500), avec des périodicités typiques 12 / 6 / 3 mois. ⚠ raisonner en 'kg' au lieu de tCO₂e, ou inverser les seuils (5/50/500)."
  },
  {
   "id": "q-g4-68",
   "dc": "G4",
   "type": "qcm",
   "enonce": "Quel est le meilleur outil pour détecter une fuite de fluide frigorigène ?",
   "choix": [
    "Eau savonneuse",
    "Détecteur électronique",
    "Traceur UV + lampe",
    "Tous selon les cas"
   ],
   "bonne": 3,
   "explication": "L’obligation de détection automatique concerne les installations au-dessus d’un seuil élevé en tCO₂e (cas des grosses installations). ⚠ croire que le détecteur est exigé pour toutes les installations, même petites."
  },
  {
   "id": "q-g4-v6_174",
   "dc": "G4",
   "type": "qcm",
   "enonce": "Le registre d'équipement doit être tenu :",
   "choix": [
    "Par le propriétaire de l'installation",
    "Par l'installateur uniquement",
    "Par la préfecture",
    "Par le fabricant de l'équipement"
   ],
   "bonne": 0,
   "explication": "Par le propriétaire (exploitant) — Le détenteur/exploitant de l'installation est responsable de la tenue du registre."
  },
  {
   "id": "q-g4-107",
   "dc": "G4",
   "type": "qcm",
   "enonce": "Le registre peut être tenu :",
   "choix": [
    "Uniquement en version papier",
    "Uniquement en version électronique",
    "Papier ou électronique",
    "Seulement par l'ADEME"
   ],
   "bonne": 2,
   "explication": "La traçabilité est obligatoire : nature du fluide, quantités ajoutées/récupérées, résultats de contrôles, identité de l’opérateur, et conservation des enregistrements. ⚠ oublier une information clé (quantités) ou ne pas conserver les documents assez longtemps."
  },
  {
   "id": "q-g5-v6_063",
   "dc": "G5",
   "type": "qcm",
   "enonce": "Le taux de remplissage maximal d'une bouteille de récupération est de :",
   "choix": [
    "60%",
    "70%",
    "80%",
    "100%"
   ],
   "bonne": 2,
   "explication": "80% — Max 80% du volume pour laisser de l'espace à la dilatation thermique. Un remplissage excessif est dangereux (explosion)."
  },
  {
   "id": "q-g5-v6_156",
   "dc": "G5",
   "type": "qcm",
   "enonce": "Il est interdit de mélanger des fluides différents dans une même bouteille de récupération car :",
   "choix": [
    "Ce serait trop lourd",
    "Le mélange serait impossible à recycler/régénérer",
    "Les bouteilles exploseraient",
    "Ça n'a aucune importance"
   ],
   "bonne": 1,
   "explication": "Impossible à recycler/régénérer — Un mélange de fluides différents est un déchet ultime : il ne peut être que détruit, pas recyclé ni régénéré."
  },
  {
   "id": "q-g5-v6_060",
   "dc": "G5",
   "type": "qcm",
   "enonce": "Pourquoi un mélange zéotrope doit-il être chargé en phase liquide ?",
   "choix": [
    "Pour aller plus vite",
    "Pour éviter la démixtion (séparation des composants)",
    "Pour protéger le compresseur",
    "Pour réduire le bruit"
   ],
   "bonne": 1,
   "explication": "Pour éviter la démixtion — En phase gazeuse, les composants d'un mélange zéotrope s'évaporent à des vitesses différentes, modifiant la composition."
  },
  {
   "id": "q-g5-v6_064",
   "dc": "G5",
   "type": "qcm",
   "enonce": "La charge en fluide se mesure avec :",
   "choix": [
    "Un manomètre",
    "Une balance de précision",
    "Un thermomètre",
    "Un vacuomètre"
   ],
   "bonne": 1,
   "explication": "Une balance de précision — La charge se fait au poids : on pèse la bouteille avant et après pour connaître la quantité exacte introduite (±5g)."
  },
  {
   "id": "q-g5-v6_082",
   "dc": "G5",
   "type": "qcm",
   "enonce": "La récupération de fluide est obligatoire :",
   "choix": [
    "Uniquement pour les grosses installations",
    "Uniquement si le fluide est en bon état",
    "Dans tous les cas, même pour de petites quantités",
    "Seulement si le client le demande"
   ],
   "bonne": 2,
   "explication": "Dans tous les cas — La récupération est TOUJOURS obligatoire, quelle que soit la quantité. Le rejet à l'atmosphère est interdit."
  },
  {
   "id": "q-g5-v6_083",
   "dc": "G5",
   "type": "qcm",
   "enonce": "La différence entre recyclage et régénération est :",
   "choix": [
    "Aucune, c'est la même chose",
    "Le recyclage est un nettoyage basique, la régénération remet aux spécifications d'origine",
    "Le recyclage est fait en laboratoire",
    "La régénération est moins poussée"
   ],
   "bonne": 1,
   "explication": "Recyclage = nettoyage basique, Régénération = spécifications d'origine"
  },
  {
   "id": "q-g5-v6_176",
   "dc": "G5",
   "type": "qcm",
   "enonce": "Le fluide recyclé (non régénéré) peut être réutilisé :",
   "choix": [
    "Sur n'importe quelle installation",
    "Uniquement sur la même installation ou du même exploitant",
    "Uniquement à l'export",
    "Jamais"
   ],
   "bonne": 1,
   "explication": "Même installation ou même exploitant — Le fluide simplement recyclé (filtré, séché) ne retrouve pas les spécifications d'origine et ne peut être vendu à un tiers."
  },
  {
   "id": "q-g5-135",
   "dc": "G5",
   "type": "qcm",
   "enonce": "Lors de la récupération, l'huile frigorifique doit être :",
   "choix": [
    "Laissée dans le compresseur",
    "Récupérée séparément",
    "Mélangée au fluide",
    "Dégazée à l'atmosphère"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g5-v6_175",
   "dc": "G5",
   "type": "qcm",
   "enonce": "Le rejet volontaire de fluide frigorigène dans l'atmosphère est :",
   "choix": [
    "Autorisé pour les petites quantités",
    "Toléré si le GWP est faible",
    "Strictement interdit et sanctionné",
    "Autorisé en cas d'urgence"
   ],
   "bonne": 2,
   "explication": "Strictement interdit — Le dégazage volontaire est une infraction : 1 500 € d'amende (contravention 5e classe). Aucune exception."
  },
  {
   "id": "q-g5-141",
   "dc": "G5",
   "type": "qcm",
   "enonce": "Avant de récupérer le fluide, il faut :",
   "choix": [
    "Ouvrir immédiatement le circuit",
    "Arrêter et isoler le système",
    "Chauffer l'installation",
    "Vidanger l'huile"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g6-152",
   "dc": "G6",
   "type": "qcm",
   "enonce": "Quel est le rôle principal du compresseur dans un circuit frigorifique ?",
   "choix": [
    "Refroidir le fluide frigorigène",
    "Aspirer et comprimer le gaz basse pression",
    "Détendre le liquide haute pression",
    "Condenser les vapeurs"
   ],
   "bonne": 1,
   "explication": "Le compresseur ASPIRE le gaz basse pression en provenance de l'évaporateur et le COMPRIME pour l'envoyer vers le condenseur à haute pression. C'est le moteur du cycle frigorifique."
  },
  {
   "id": "q-g6-231",
   "dc": "G6",
   "type": "qcm",
   "enonce": "Quel est le rôle principal de l'huile dans un compresseur frigorifique ?",
   "choix": [
    "Refroidir le fluide frigorigène",
    "Lubrifier les pièces mobiles et assurer l'étanchéité",
    "Augmenter la pression",
    "Filtrer le fluide"
   ],
   "bonne": 1,
   "explication": "L'huile LUBRIFIE les pièces mobiles du compresseur (pistons, roulements, paliers), REFROIDIT les parties chaudes, et assure l'ÉTANCHÉITÉ entre les zones HP et BP."
  },
  {
   "id": "q-g6-233",
   "dc": "G6",
   "type": "qcm",
   "enonce": "Pourquoi est-il important que l'huile revienne au compresseur dans un circuit frigorifique ?",
   "choix": [
    "Pour faire joli",
    "Car le compresseur a besoin d'huile en permanence pour sa lubrification",
    "Pour augmenter la puissance",
    "Pour diminuer la consommation"
   ],
   "bonne": 1,
   "explication": "L'huile circule avec le fluide frigorigène dans tout le circuit. Elle doit REVENIR au compresseur pour maintenir un niveau correct dans le carter."
  },
  {
   "id": "q-g6-247",
   "dc": "G6",
   "type": "qcm",
   "enonce": "À quoi sert un réchauffeur de carter (chauffage de carter) sur un compresseur ?",
   "choix": [
    "À augmenter la puissance",
    "À éviter la migration du fluide frigorigène dans l'huile à l'arrêt (dilution)",
    "À chauffer le local",
    "À fondre le givre"
   ],
   "bonne": 1,
   "explication": "Le RÉCHAUFFEUR DE CARTER maintient l'huile légèrement CHAUDE à l'arrêt pour éviter la MIGRATION du fluide frigorigène dans l'huile froide."
  },
  {
   "id": "q-g6-240",
   "dc": "G6",
   "type": "qcm",
   "enonce": "Quels sont les symptômes d'un manque d'huile dans le compresseur ?",
   "choix": [
    "Compresseur silencieux et froid",
    "Bruits anormaux (frottements), échauffement excessif, baisse de puissance, risque de grippage",
    "Haute pression élevée",
    "Évaporateur givré"
   ],
   "bonne": 1,
   "explication": "Symptômes de MANQUE D'HUILE : 1) BRUITS anormaux (frottements, cliquetis), 2) ÉCHAUFFEMENT excessif du carter et du refoulement, 3) Baisse de PUISSANCE frigorifique, 4) Température de refoulement…"
  },
  {
   "id": "q-g6-186",
   "dc": "G6",
   "type": "qcm",
   "enonce": "Vous constatez que la température de refoulement du compresseur est très élevée (>120°C). Quelles sont les causes possibles ?",
   "choix": [
    "Excès de fluide frigorigène",
    "Manque de fluide, surchauffe excessive, ou mauvais retour d'huile",
    "Condenseur trop grand",
    "Évaporateur surdimensionné"
   ],
   "bonne": 1,
   "explication": "Une TEMPÉRATURE DE REFOULEMENT élevée peut être causée par : manque de charge (surchauffe excessive), mauvais refroidissement du compresseur, rapport de pression trop élevé (T°K trop haute ou T°O…"
  },
  {
   "id": "q-g7-159",
   "dc": "G7",
   "type": "qcm",
   "enonce": "Quel est le rôle principal du condenseur ?",
   "choix": [
    "Absorber la chaleur du milieu à refroidir",
    "Évacuer la chaleur du fluide frigorigène vers l'extérieur",
    "Comprimer le gaz frigorigène",
    "Détendre le liquide frigorigène"
   ],
   "bonne": 1,
   "explication": "Le CONDENSEUR évacue la chaleur du fluide frigorigène vers l'extérieur (air ou eau). Le gaz chaud se refroidit et se condense en liquide. C'est l'organe qui 'rejette' la chaleur."
  },
  {
   "id": "q-g7-164",
   "dc": "G7",
   "type": "qcm",
   "enonce": "Que se passe-t-il si le condenseur est encrassé (sale, poussière) ?",
   "choix": [
    "Le froid est plus puissant",
    "La haute pression augmente et l'installation consomme plus",
    "La basse pression diminue",
    "Rien de particulier"
   ],
   "bonne": 1,
   "explication": "Un condenseur ENCRASSÉ ne peut plus évacuer correctement la chaleur. La température et la pression du condenseur (HP) augmentent, ce qui force le compresseur à travailler plus fort, augmente la…"
  },
  {
   "id": "q-g7-163",
   "dc": "G7",
   "type": "qcm",
   "enonce": "Quel est le rôle des ventilateurs sur un condenseur à air ?",
   "choix": [
    "Refroidir le compresseur",
    "Forcer l'air à travers le condenseur pour évacuer la chaleur",
    "Aspirer le fluide frigorigène",
    "Détendre le gaz"
   ],
   "bonne": 1,
   "explication": "Les ventilateurs FORCENT l'air à travers les ailettes du condenseur pour améliorer l'évacuation de la chaleur."
  },
  {
   "id": "q-g7-182",
   "dc": "G7",
   "type": "qcm",
   "enonce": "Comment calculer le sous-refroidissement du liquide en sortie de condenseur ?",
   "choix": [
    "Température de condensation - Température du liquide sortie condenseur",
    "Température ambiante - Température du liquide",
    "Température HP - Température BP",
    "Température d'évaporation - Température du liquide"
   ],
   "bonne": 0,
   "explication": "Le SOUS-REFROIDISSEMENT = Température de condensation (T°K) - Température du liquide sortie condenseur. On convertit la pression HP en température avec le tableau fluide."
  },
  {
   "id": "q-g7-169",
   "dc": "G7",
   "type": "qcm",
   "enonce": "Quelle est l'utilité du sous-refroidissement du liquide en sortie de condenseur ?",
   "choix": [
    "Augmenter la température du liquide",
    "S'assurer que le liquide est bien liquide (pas de bulles) et améliorer l'efficacité",
    "Diminuer la pression",
    "Protéger le compresseur"
   ],
   "bonne": 1,
   "explication": "Le SOUS-REFROIDISSEMENT consiste à refroidir le liquide en dessous de sa température de condensation. Cela garantit qu'il reste liquide dans toute la ligne liquide (pas de flash-gas), améliore…"
  },
  {
   "id": "q-g7-170",
   "dc": "G7",
   "type": "qcm",
   "enonce": "Un pressostat haute pression (HP) déclenche et arrête le compresseur. Quelle peut être la cause ?",
   "choix": [
    "Manque de fluide frigorigène",
    "Condenseur encrassé, ventilateurs arrêtés, ou excès de charge",
    "Évaporateur givré",
    "Manque d'huile"
   ],
   "bonne": 1,
   "explication": "Un déclenchement PRESSOSTAT HP indique une pression de condensation trop élevée. Causes : condenseur sale ou encrassé, ventilateurs en panne, excès de charge frigorigène, air incondensable dans le…"
  },
  {
   "id": "q-g8-v6_039",
   "dc": "G8",
   "type": "qcm",
   "enonce": "Dans quel organe le fluide absorbe-t-il la chaleur de l'espace à refroidir ?",
   "choix": [
    "Le compresseur",
    "Le condenseur",
    "Le détendeur",
    "L'évaporateur"
   ],
   "bonne": 3,
   "explication": "L'évaporateur — C'est dans l'évaporateur que le fluide absorbe la chaleur, passant de liquide BP à gaz BP = production du froid."
  },
  {
   "id": "q-g8-181",
   "dc": "G8",
   "type": "qcm",
   "enonce": "Sur une installation frigorifique, comment calculer approximativement la surchauffe à l'aspiration du compresseur ?",
   "choix": [
    "Température de refoulement - Température d'aspiration",
    "Température gaz aspiration - Température d'évaporation (T°O correspondant à la BP)",
    "Température condensation - Température évaporation",
    "Température ambiante - Température d'évaporation"
   ],
   "bonne": 1,
   "explication": "La SURCHAUFFE = Température du gaz en aspiration - Température d'évaporation (T°O). On mesure la température du gaz avec une sonde, et on convertit la pression BP en température avec le tableau…"
  },
  {
   "id": "q-g8-183",
   "dc": "G8",
   "type": "qcm",
   "enonce": "Une installation affiche une surchauffe très élevée (20°C) et une puissance frigorifique insuffisante. Quelle est la cause la plus probable ?",
   "choix": [
    "Excès de fluide frigorigène",
    "Manque de fluide frigorigène ou détendeur sous-alimenté",
    "Compresseur trop puissant",
    "Condenseur surdimensionné"
   ],
   "bonne": 1,
   "explication": "Une SURCHAUFFE EXCESSIVE (>15°C) indique un manque d'alimentation de l'évaporateur. Causes : manque de charge, détendeur mal réglé (bulbe mal positionné ou défectueux), filtre bouché, ou vanne…"
  },
  {
   "id": "q-g8-184",
   "dc": "G8",
   "type": "qcm",
   "enonce": "Une installation présente une surchauffe nulle ou négative (ligne d'aspiration givrée). Quelle action corrective prioritaire ?",
   "choix": [
    "Ajouter du fluide frigorigène",
    "Diminuer l'ouverture du détendeur ou retirer du fluide (risque de coup de liquide)",
    "Nettoyer le condenseur",
    "Changer le compresseur"
   ],
   "bonne": 1,
   "explication": "Une SURCHAUFFE NULLE OU NÉGATIVE indique un retour de liquide au compresseur. Actions : diminuer l'ouverture du détendeur thermostatique, vérifier le bulbe, ou retirer du fluide si excès de charge."
  },
  {
   "id": "q-g8-178",
   "dc": "G8",
   "type": "qcm",
   "enonce": "Vous constatez que l'évaporateur givre complètement en fonctionnement. Quelle peut être la cause ?",
   "choix": [
    "Excès de fluide frigorigène",
    "Manque de débit d'air, filtre à air encrassé, ou ventilateurs arrêtés",
    "Compresseur trop puissant",
    "Condenseur encrassé"
   ],
   "bonne": 1,
   "explication": "Un ÉVAPORATEUR GIVRÉ indique que l'air ne circule pas suffisamment ou que la température d'évaporation est trop basse."
  },
  {
   "id": "q-g8-v6_043",
   "dc": "G8",
   "type": "qcm",
   "enonce": "Une surchauffe insuffisante à l'aspiration du compresseur risque de provoquer :",
   "choix": [
    "Un manque de puissance",
    "Des coups de liquide",
    "Une surchauffe du moteur",
    "Un bruit de cavitation"
   ],
   "bonne": 1,
   "explication": "Des coups de liquide — Si la surchauffe est trop faible, du liquide peut arriver au compresseur, provoquant des coups de liquide destructeurs."
  },
  {
   "id": "q-g9-v6_049",
   "dc": "G9",
   "type": "qcm",
   "enonce": "Le détendeur thermostatique (TEV) régule :",
   "choix": [
    "La pression de condensation",
    "La surchauffe à la sortie de l'évaporateur",
    "Le sous-refroidissement",
    "La pression d'huile"
   ],
   "bonne": 1,
   "explication": "La surchauffe — Le TEV régule la surchauffe en ajustant le débit de fluide entrant dans l'évaporateur via un bulbe capillaire."
  },
  {
   "id": "q-g9-v6_055",
   "dc": "G9",
   "type": "qcm",
   "enonce": "L'avantage principal du détendeur électronique (EEV) par rapport au TEV est :",
   "choix": [
    "Son coût plus bas",
    "Sa régulation plus précise et rapide",
    "Sa résistance à l'humidité",
    "Son absence de pièces mobiles"
   ],
   "bonne": 1,
   "explication": "Régulation plus précise et rapide — L'EEV est piloté par un régulateur électronique avec des capteurs. Sa réponse est plus fine et rapide que le TEV mécanique."
  },
  {
   "id": "q-g9-v6_149",
   "dc": "G9",
   "type": "qcm",
   "enonce": "Le capillaire est un type de détendeur utilisé dans :",
   "choix": [
    "Les centrales industrielles",
    "Les réfrigérateurs domestiques et petits climatiseurs",
    "Les tours de refroidissement",
    "Les installations transcritiques"
   ],
   "bonne": 1,
   "explication": "Réfrigérateurs domestiques — Le tube capillaire est le détendeur le plus simple : un tube fin de longueur calibrée. Il est utilisé dans les petits équipements."
  },
  {
   "id": "q-g9-187",
   "dc": "G9",
   "type": "qcm",
   "enonce": "Que peut indiquer un bruit de bullage dans le détendeur thermostatique en fonctionnement ?",
   "choix": [
    "Fonctionnement normal",
    "Flash-gas dans la ligne liquide (manque de sous-refroidissement)",
    "Excès de fluide frigorigène",
    "Compresseur défectueux"
   ],
   "bonne": 1,
   "explication": "Un BULLAGE dans le détendeur indique du FLASH-GAS : le fluide n'est pas totalement liquide à l'entrée du détendeur."
  },
  {
   "id": "q-g9-188",
   "dc": "G9",
   "type": "qcm",
   "enonce": "Comment diagnostiquer un détendeur thermostatique défectueux (bulbe percé) ?",
   "choix": [
    "La surchauffe devient instable ou très élevée, le détendeur ne régule plus",
    "La haute pression augmente",
    "Le compresseur fait du bruit",
    "L'évaporateur givre complètement"
   ],
   "bonne": 0,
   "explication": "Si le BULBE est PERCÉ, il perd sa charge et ne peut plus piloter le détendeur. Symptômes : surchauffe excessive et instable, le détendeur reste fermé ou presque, l'évaporateur manque de fluide."
  },
  {
   "id": "q-g9-v6_050",
   "dc": "G9",
   "type": "qcm",
   "enonce": "Le déshydrateur contient un matériau appelé :",
   "choix": [
    "Charbon actif",
    "Tamis moléculaire",
    "Silicone",
    "Résine échangeuse d'ions"
   ],
   "bonne": 1,
   "explication": "Tamis moléculaire — Le tamis moléculaire absorbe l'humidité et les acides. Il doit être changé à chaque ouverture du circuit."
  },
  {
   "id": "q-g9-v6_051",
   "dc": "G9",
   "type": "qcm",
   "enonce": "Une pastille de couleur jaune/marron dans le voyant liquide indique :",
   "choix": [
    "Circuit sec",
    "Présence d'humidité",
    "Température trop élevée",
    "Manque de fluide"
   ],
   "bonne": 1,
   "explication": "Présence d'humidité — Vert = sec (OK), Jaune/marron = humide (problème). L'indicateur colorimétrique change selon le taux d'humidité."
  },
  {
   "id": "q-g9-v6_052",
   "dc": "G9",
   "type": "qcm",
   "enonce": "Le pressostat BP peut servir à :",
   "choix": [
    "Réguler la température par cycling du compresseur",
    "Protéger le condenseur",
    "Augmenter la charge en fluide",
    "Mesurer le COP"
   ],
   "bonne": 0,
   "explication": "Réguler la température par cycling — Le pressostat BP peut couper le compresseur quand la pression BP descend trop (= température atteinte), puis le redémarrer quand elle remonte."
  },
  {
   "id": "q-g9-v6_155",
   "dc": "G9",
   "type": "qcm",
   "enonce": "La vanne électromagnétique (solénoïde) sert principalement à :",
   "choix": [
    "Réguler la surchauffe",
    "Couper/ouvrir un circuit de fluide sur commande électrique",
    "Mesurer la pression",
    "Purger le circuit"
   ],
   "bonne": 1,
   "explication": "Couper/ouvrir un circuit — La vanne solénoïde est une vanne tout-ou-rien commandée électriquement. Ex: pump-down, dégivrage."
  },
  {
   "id": "q-g9-172",
   "dc": "G9",
   "type": "qcm",
   "enonce": "Vous devez installer un filtre déshydrateur sur la ligne liquide. Dans quel sens doit-il être monté ?",
   "choix": [
    "Peu importe le sens",
    "Dans le sens de circulation du fluide (indiqué par une flèche)",
    "Toujours vertical",
    "Toujours horizontal"
   ],
   "bonne": 1,
   "explication": "Le filtre déshydrateur doit TOUJOURS être monté dans le SENS DE CIRCULATION du fluide, indiqué par une flèche sur le corps du filtre."
  },
  {
   "id": "q-g10-v6_061",
   "dc": "G10",
   "type": "qcm",
   "enonce": "Pourquoi brase-t-on toujours sous flux d'azote ?",
   "choix": [
    "Pour refroidir plus vite",
    "Pour éviter l'oxydation intérieure du cuivre (calamine)",
    "Pour tester l'étanchéité",
    "Pour sécher le circuit"
   ],
   "bonne": 1,
   "explication": "Éviter l'oxydation intérieure — Sans azote, l'oxygène de l'air réagit avec le cuivre chauffé et forme de la calamine noire qui bouchera les filtres et endommagera le compresseur."
  },
  {
   "id": "q-g10-v6_065",
   "dc": "G10",
   "type": "qcm",
   "enonce": "Pour un brasage cuivre-cuivre, l'alliage d'apport utilisé est généralement :",
   "choix": [
    "Étain-plomb",
    "Cuivre-phosphore",
    "Acier inoxydable",
    "Aluminium"
   ],
   "bonne": 1,
   "explication": "Cuivre-phosphore — Pour les joints Cu-Cu, on utilise un alliage cuivre-phosphore (type BCuP). Pour Cu-acier, on utilise un alliage argent."
  },
  {
   "id": "q-g10-87",
   "dc": "G10",
   "type": "qcm",
   "enonce": "Le cintrage d'un tube cuivre frigorifique doit se faire :",
   "choix": [
    "À froid avec cintreuse",
    "À chaud avec chalumeau",
    "À la main sans outil",
    "Les deux premières méthodes"
   ],
   "bonne": 0,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g10-84",
   "dc": "G10",
   "type": "qcm",
   "enonce": "Le surfaçage des collets (dudgeonnage) doit être réalisé avec :",
   "choix": [
    "N'importe quel outil",
    "Une dudgeonnoire calibrée",
    "Un marteau et un burin",
    "Une pince multiprise"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g10-v6_157",
   "dc": "G10",
   "type": "qcm",
   "enonce": "Lors du raccordement d'un flexible sur une vanne Schrader, il faut d'abord :",
   "choix": [
    "Serrer à fond",
    "Purger l'air du flexible",
    "Ouvrir la vanne en grand",
    "Faire un tirage au vide du flexible"
   ],
   "bonne": 1,
   "explication": "Purger l'air du flexible — Avant tout raccordement, il faut purger l'air du flexible pour ne pas introduire d'incondensables dans le circuit."
  },
  {
   "id": "q-g10-69",
   "dc": "G10",
   "type": "qcm",
   "enonce": "Lors d'un brasage, pourquoi faut-il balayer à l'azote ?",
   "choix": [
    "Pour refroidir le tube",
    "Pour éviter l'oxydation interne",
    "Pour tester l'étanchéité",
    "Pour nettoyer le circuit"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g11-v6_033",
   "dc": "G11",
   "type": "qcm",
   "enonce": "Un fluide classé A2L est :",
   "choix": [
    "Non inflammable, non toxique",
    "Légèrement inflammable, faible toxicité",
    "Très inflammable, faible toxicité",
    "Légèrement inflammable, toxicité élevée"
   ],
   "bonne": 1,
   "explication": "Légèrement inflammable, faible toxicité — A = faible toxicité, 2L = légèrement inflammable (vitesse de flamme < 10 cm/s). Ex: R32, R1234yf."
  },
  {
   "id": "q-g11-v6_140",
   "dc": "G11",
   "type": "qcm",
   "enonce": "La vitesse de flamme maximale pour un fluide classé A2L est de :",
   "choix": [
    "1 cm/s",
    "5 cm/s",
    "10 cm/s",
    "30 cm/s"
   ],
   "bonne": 2,
   "explication": "10 cm/s — Le 'L' de A2L signifie 'Lower flammability' : vitesse de flamme < 10 cm/s. C'est le seuil de la sous-classe 2L."
  },
  {
   "id": "q-g11-54",
   "dc": "G11",
   "type": "qcm",
   "enonce": "Le R290 (propane) est classé :",
   "choix": [
    "A1",
    "A2L",
    "A2",
    "A3"
   ],
   "bonne": 3,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais')."
  },
  {
   "id": "q-g11-v6_030",
   "dc": "G11",
   "type": "qcm",
   "enonce": "Les HFO (hydrofluoro-oléfines) se caractérisent par :",
   "choix": [
    "Un GWP très élevé",
    "Un ODP élevé",
    "Un GWP très bas (<10)",
    "Une toxicité extrême"
   ],
   "bonne": 2,
   "explication": "Un GWP très bas (<10) — Les HFO comme le R1234yf (GWP 4) ou R1234ze (GWP 7) ont un GWP quasi nul car ils se dégradent rapidement dans l'atmosphère."
  },
  {
   "id": "q-g11-v6_035",
   "dc": "G11",
   "type": "qcm",
   "enonce": "Un remplacement 'drop-in' signifie :",
   "choix": [
    "Changer le fluide sans modifier l'installation",
    "Changer le fluide et l'huile",
    "Modifier le détendeur et l'huile",
    "Remplacer tout le circuit"
   ],
   "bonne": 0,
   "explication": "Changer le fluide sans modifier l'installation"
  },
  {
   "id": "q-g11-v6_092",
   "dc": "G11",
   "type": "qcm",
   "enonce": "La norme EN 378 définit entre autres :",
   "choix": [
    "Les prix des fluides",
    "Les charges maximales de fluide selon le local et la classe de sécurité",
    "Les horaires d'intervention",
    "Les salaires des techniciens"
   ],
   "bonne": 1,
   "explication": "Les charges maximales selon local et classe de sécurité"
  },
  {
   "id": "q-g11-185",
   "dc": "G11",
   "type": "qcm",
   "enonce": "Comment optimiser le COP (Coefficient de Performance) d'une installation frigorifique ?",
   "choix": [
    "Augmenter la haute pression au maximum",
    "Diminuer l'écart entre T°K (condensation) et T°O (évaporation)",
    "Augmenter la surchauffe au maximum",
    "Diminuer le débit d'air sur le condenseur"
   ],
   "bonne": 1,
   "explication": "Le COP (efficacité énergétique) est meilleur quand l'écart T°K - T°O est FAIBLE. Pour optimiser : baisser la T°K (condenseur propre, bon refroidissement) et augmenter la T°O si possible (évaporateur…"
  },
  {
   "id": "q-g11-v6_047",
   "dc": "G11",
   "type": "qcm",
   "enonce": "Le COP d'une installation frigorifique se calcule par :",
   "choix": [
    "COP = P_élec / P_frigo",
    "COP = P_frigo / P_élec",
    "COP = P_frigo × P_élec",
    "COP = P_frigo − P_élec"
   ],
   "bonne": 1,
   "explication": "COP = P_frigo / P_élec — Le COP est le rapport entre la puissance frigorifique produite et la puissance électrique consommée. Un COP de 3 = 3 kW de froid pour 1 kW d'électricité."
  },
  {
   "id": "q-g12-v6_091",
   "dc": "G12",
   "type": "qcm",
   "enonce": "La charge maximale en R290 (propane) dans un local accessible au public est très limitée car :",
   "choix": [
    "Son GWP est élevé",
    "Il est très inflammable (classe A3)",
    "Il est toxique",
    "Il corrode le cuivre"
   ],
   "bonne": 1,
   "explication": "Très inflammable (A3) — Le R290 est un hydrocarbure hautement inflammable. La norme EN 378 limite strictement les charges dans les locaux occupés."
  },
  {
   "id": "q-g12-v6_181",
   "dc": "G12",
   "type": "qcm",
   "enonce": "Le R600a (isobutane) est utilisé principalement dans :",
   "choix": [
    "Les centrales industrielles",
    "Les réfrigérateurs et congélateurs domestiques",
    "Les climatiseurs split",
    "Les pompes à chaleur air-eau"
   ],
   "bonne": 1,
   "explication": "Réfrigérateurs domestiques — Le R600a est le fluide standard des réfrigérateurs modernes. Charges très faibles (50-150g) pour limiter le risque d'inflammation."
  },
  {
   "id": "q-g12-v6_093",
   "dc": "G12",
   "type": "qcm",
   "enonce": "Les fluides A2L comme le R32 nécessitent :",
   "choix": [
    "Aucune précaution particulière",
    "Un outillage adapté et une formation spécifique",
    "Un local ATEX systématique",
    "Un détecteur d'ammoniac"
   ],
   "bonne": 1,
   "explication": "Outillage adapté et formation spécifique — Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante."
  },
  {
   "id": "q-g12-v6_184",
   "dc": "G12",
   "type": "qcm",
   "enonce": "Pour les fluides A2L, les outils d'intervention doivent être :",
   "choix": [
    "Standards",
    "Adaptés (pas de source d'ignition, ventilation)",
    "Uniquement manuels (pas d'électricité)",
    "En matériaux composites"
   ],
   "bonne": 1,
   "explication": "Adaptés — Les fluides A2L nécessitent des outils sans source d'ignition, une ventilation adéquate et des détecteurs de gaz sur le lieu d'intervention."
  },
  {
   "id": "q-g12-291",
   "dc": "G12",
   "type": "qcm",
   "enonce": "Vous devez braser sur un circuit au R-32 (A2L). Quelles précautions prenez-vous avant d'allumer le chalumeau ?",
   "choix": [
    "Aucune, le R-32 est peu inflammable",
    "Récupérer le fluide, inerter à l'azote, ventiler, supprimer toute source d'ignition",
    "Ouvrir une fenêtre et braser rapidement",
    "Braser directement, le circuit est fermé"
   ],
   "bonne": 1,
   "explication": "Un fluide A2L reste inflammable : on récupère, on inerte à l'azote et on supprime toute source d'ignition avant la flamme."
  },
  {
   "id": "q-g12-286",
   "dc": "G12",
   "type": "qcm",
   "enonce": "Pourquoi ne doit-on jamais approcher une flamme d'un circuit contenant un fluide A2L ou A3 non inerté ?",
   "choix": [
    "Parce qu'il est interdit de fumer sur un chantier",
    "Parce que le fluide peut s'enflammer et se décomposer en gaz toxiques",
    "Parce que la fumée salit l'installation",
    "Parce que l'odeur est désagréable"
   ],
   "bonne": 1,
   "explication": "Double risque : inflammation du fluide, et décomposition thermique produisant des gaz toxiques (dont acide fluorhydrique)."
  },
  {
   "id": "q-g12-289",
   "dc": "G12",
   "type": "qcm",
   "enonce": "Quelle est la différence entre un fluide A2L (R-32) et un fluide A3 (R-290) ?",
   "choix": [
    "Aucune, les deux classes sont équivalentes",
    "A3 est hautement inflammable (propagation rapide) ; A2L l'est faiblement (propagation lente)",
    "A2L est toxique, A3 ne l'est pas",
    "A3 produit plus de froid"
   ],
   "bonne": 1,
   "explication": "Le R-290 est A3 : très inflammable. Le R-32 est A2L : faiblement inflammable, vitesse de flamme ≤ 10 cm/s. Piège classique."
  },
  {
   "id": "q-g13-v6_088",
   "dc": "G13",
   "type": "qcm",
   "enonce": "Le point critique du CO₂ se situe à :",
   "choix": [
    "0°C / 1 bar",
    "31°C / 73,8 bar",
    "-33°C / 1 bar",
    "100°C / 100 bar"
   ],
   "bonne": 1,
   "explication": "31°C / 73,8 bar — Au-dessus de 31°C et 73,8 bar, le CO₂ est supercritique (ni liquide ni gaz). C'est ce qui rend le CO₂ transcritique si particulier."
  },
  {
   "id": "q-g13-v6_089",
   "dc": "G13",
   "type": "qcm",
   "enonce": "En fonctionnement transcritique, le condenseur est remplacé par :",
   "choix": [
    "Un évaporateur",
    "Un refroidisseur de gaz (gas cooler)",
    "Un économiseur",
    "Un absorbeur"
   ],
   "bonne": 1,
   "explication": "Un refroidisseur de gaz — En transcritique, le CO₂ ne se condense pas (T° > 31°C). On refroidit simplement le gaz HP dans un échangeur appelé gas cooler."
  },
  {
   "id": "q-g13-v6_185",
   "dc": "G13",
   "type": "qcm",
   "enonce": "Le principal avantage environnemental du CO₂ comme fluide frigorigène est :",
   "choix": [
    "Son coût très bas",
    "Son GWP de 1",
    "Sa haute pression",
    "Sa couleur verte"
   ],
   "bonne": 1,
   "explication": "Son GWP de 1 — Le CO₂ a le GWP de référence (1). Même en cas de fuite totale, l'impact climatique est négligeable par rapport aux HFC."
  },
  {
   "id": "q-g13-v6_090",
   "dc": "G13",
   "type": "qcm",
   "enonce": "L'ammoniac (R717) est classé :",
   "choix": [
    "A1 (non toxique, non inflammable)",
    "A2L (légèrement inflammable)",
    "B2L (toxique, légèrement inflammable)",
    "B3 (toxique, très inflammable)"
   ],
   "bonne": 2,
   "explication": "B2L — L'ammoniac est classé B (toxicité élevée) et 2L (légèrement inflammable). Il nécessite des précautions strictes."
  },
  {
   "id": "q-g13-v6_094",
   "dc": "G13",
   "type": "qcm",
   "enonce": "L'ammoniac est principalement utilisé dans :",
   "choix": [
    "La climatisation résidentielle",
    "Le froid industriel (entrepôts, agroalimentaire)",
    "Les véhicules",
    "Les réfrigérateurs domestiques"
   ],
   "bonne": 1,
   "explication": "Le froid industriel — L'ammoniac est le fluide de référence du froid industriel (entrepôts, chambres froides, agroalimentaire) grâce à ses excellentes propriétés thermodynamiques."
  },
  {
   "id": "q-g13-v6_182",
   "dc": "G13",
   "type": "qcm",
   "enonce": "L'ammoniac peut être détecté facilement par :",
   "choix": [
    "Sa couleur bleue",
    "Son odeur très caractéristique (piquante)",
    "Son goût sucré",
    "Sa luminescence"
   ],
   "bonne": 1,
   "explication": "Son odeur piquante — L'ammoniac a une odeur extrêmement reconnaissable et détectable à très faible concentration (5 ppm). C'est un avantage pour la sécurité."
  }
 ],
 "cartes": [
  {
   "id": "c00",
   "type": "accueil",
   "titre": "Habilitation fluides frigorigènes",
   "corps": "<p class=\"lead\">Quatre catégories, un seul référentiel : <b>A1</b> et <b>A2</b> couvrent toute l'activité, <b>D</b> la récupération seule, <b>E</b> le contrôle d'étanchéité sans ouvrir le circuit.</p><p>Choisis ton parcours. Chaque fiche se lit en quelques minutes, pose une question, et renvoie vers la fiche à revoir si la réponse est fausse. Progression conseillée en formation : <b>E → D → A2 → A1</b>.</p>",
   "menu_titre": "Choisir un parcours",
   "liens": [
    {
     "vers": "m-a1",
     "icone": "A1",
     "titre": "Catégorie A1",
     "desc": "Tous équipements, toutes charges, hydrocarbures compris. Épreuve 4 h 15.",
     "primaire": true
    },
    {
     "vers": "m-a2",
     "icone": "A2",
     "titre": "Catégorie A2",
     "desc": "Mêmes activités, parc à charge limitée (< 3 kg, < 6 kg si scellé). Épreuve 3 h 55."
    },
    {
     "vers": "m-d",
     "icone": "D",
     "titre": "Catégorie D",
     "desc": "Récupération du fluide uniquement. Épreuve 1 h 30."
    },
    {
     "vers": "m-e",
     "icone": "E",
     "titre": "Catégorie E",
     "desc": "Contrôle d'étanchéité seul, sans accéder au circuit. Épreuve 1 h 30."
    },
    {
     "vers": "cfin",
     "icone": "?",
     "titre": "À propos de ce démonstrateur",
     "desc": "Ce qu'il montre, ce qu'il ne fait pas encore."
    }
   ],
   "notes_pilote": "Page d'entrée à projeter en début de session. Faire choisir le parcours par le stagiaire lui-même : beaucoup arrivent en pensant « je viens passer les fluides » sans savoir que la catégorie détermine ce qu'ils auront le droit de faire. Deux minutes ici évitent une reconversion mal orientée. Rappeler que les durées d'ÉPREUVE sont réglementaires, mais que les durées de FORMATION sont libres."
  },
  {
   "id": "m-a1",
   "type": "menu",
   "illus": "img/illu-a1.jpg",
   "titre": "Catégorie A1 — tous équipements, toutes charges",
   "dc": "Parcours A1",
   "corps": "<p>Groupes évalués : <b>1, 2, 3, 4, 5, 10, 11</b>, <b>au moins un</b> des groupes composants 6/7/8/9 tiré au sort le jour de l'épreuve — donc les quatre s'apprennent — et <b>12</b> (hydrocarbures), la nouveauté de cette catégorie.</p><p>Formation indicative ≈ 35 h. Épreuve : <b>4 h 15</b>.</p>",
   "menu_titre": "Les modules du parcours",
   "liens": [
    {
     "vers": "g1a",
     "icone": "1",
     "titre": "Unités, pression, thermodynamique utile",
     "desc": "G1 — le socle de tout le reste."
    },
    {
     "vers": "g2",
     "icone": "2",
     "titre": "Impact environnemental et F-Gas",
     "desc": "G2 — PRP, phase-down, ce qui justifie le métier."
    },
    {
     "vers": "g3",
     "icone": "3",
     "titre": "Contrôles avant mise en service",
     "desc": "G3 — épreuve à l'azote, tirage au vide."
    },
    {
     "vers": "g4a",
     "icone": "4",
     "titre": "Contrôles d'étanchéité",
     "desc": "G4 — trois fiches : points de fuite, indirecte, directe."
    },
    {
     "vers": "g5a",
     "icone": "5",
     "titre": "Récupération et charge",
     "desc": "G5 — deux fiches : récupérer, puis charger sans perte."
    },
    {
     "vers": "g6",
     "icone": "6",
     "titre": "Les quatre composants",
     "desc": "G6 à G9 — compresseur, condenseur, évaporateur, détendeur."
    },
    {
     "vers": "g10",
     "icone": "10",
     "titre": "Tuyauterie et brasage sous azote",
     "desc": "G10 — un joint étanche, sans calamine."
    },
    {
     "vers": "g11",
     "icone": "11",
     "titre": "Substitution et efficacité",
     "desc": "G11 — choisir un fluide, gagner du rendement."
    },
    {
     "vers": "g12",
     "icone": "12",
     "titre": "Hydrocarbures",
     "desc": "G12 — spécifique A1 et A2 : le R-290 est A3.",
     "primaire": true
    },
    {
     "vers": "g13",
     "icone": "ℹ",
     "titre": "CO₂ et NH₃ — information",
     "desc": "G13/G14 — reconnaître, ne pas intervenir."
    },
    {
     "vers": "ex-a1",
     "icone": "📝",
     "titre": "Examen blanc A1",
     "desc": "20 questions tirées de tous les groupes."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ],
   "notes_pilote": "Le point qui surprend toujours : le groupe composant est TIRÉ AU SORT à l'épreuve, donc les quatre doivent être travaillés. Le dire dès le premier jour, sinon les stagiaires impasse trois modules sur quatre. G12 (hydrocarbures) est la vraie nouveauté d'A1 — c'est là qu'il faut mettre le temps d'atelier."
  },
  {
   "id": "m-a2",
   "type": "menu",
   "illus": "img/illu-a2.jpg",
   "titre": "Catégorie A2 — mêmes activités, charge limitée",
   "dc": "Parcours A2",
   "corps": "<p>Le référentiel est <b>le même qu'A1</b>. Ce qui change, ce n'est pas le contenu : c'est le <b>parc</b>. On travaille sur des équipements de charge <b>&lt; 3 kg</b>, ou <b>&lt; 6 kg</b> s'ils sont hermétiquement scellés et étiquetés comme tels : monosplit, PAC air/air, vitrine, meuble frigorifique, monobloc.</p><p>Une grande partie de ce parc fonctionne au <b>R-290</b> : le module hydrocarbures est ici encore plus central qu'en A1. Formation indicative ≈ 28 h. Épreuve : <b>3 h 55</b>.</p>",
   "menu_titre": "Les modules du parcours",
   "liens": [
    {
     "vers": "g1a",
     "icone": "1",
     "titre": "Unités, pression, thermodynamique utile",
     "desc": "G1 — insister sur les seuils de charge."
    },
    {
     "vers": "g2",
     "icone": "2",
     "titre": "Impact environnemental et F-Gas",
     "desc": "G2 — PRP et tonnes équivalent CO₂."
    },
    {
     "vers": "g3",
     "icone": "3",
     "titre": "Contrôles avant mise en service",
     "desc": "G3 — sur petits circuits, raccords flare."
    },
    {
     "vers": "g4a",
     "icone": "4",
     "titre": "Contrôles d'étanchéité",
     "desc": "G4 — trois fiches."
    },
    {
     "vers": "g5a",
     "icone": "5",
     "titre": "Récupération et charge",
     "desc": "G5 — petites quantités : la pesée devient critique."
    },
    {
     "vers": "g6",
     "icone": "6",
     "titre": "Les quatre composants",
     "desc": "G6 à G9 — groupes hermétiques, monoblocs."
    },
    {
     "vers": "g10",
     "icone": "10",
     "titre": "Tuyauterie et brasage sous azote",
     "desc": "G10 — petits diamètres."
    },
    {
     "vers": "g11",
     "icone": "11",
     "titre": "Substitution et efficacité",
     "desc": "G11 — conception à charge réduite."
    },
    {
     "vers": "g12",
     "icone": "12",
     "titre": "Hydrocarbures",
     "desc": "G12 — cœur du parc A2 (R-290 en monobloc et PAC).",
     "primaire": true
    },
    {
     "vers": "ex-a2",
     "icone": "📝",
     "titre": "Examen blanc A2",
     "desc": "15 questions tirées de tous les groupes."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ],
   "notes_pilote": "Erreur classique du stagiaire : croire qu'A2 est « A1 au rabais » et donc plus facile. Le référentiel est identique — seul le parc change. La limite de charge (3 kg / 6 kg scellé) doit devenir le fil rouge de toute la semaine : la faire vérifier sur la plaque signalétique à chaque manipulation d'atelier."
  },
  {
   "id": "m-d",
   "type": "menu",
   "illus": "img/illu-d.jpg",
   "titre": "Catégorie D — récupération seule",
   "dc": "Parcours D",
   "corps": "<p>Une seule activité autorisée : <b>récupérer le fluide</b>. Public type : opérateur de fin de vie, filière DEEE, dépanneur qui ne fait que récupérer.</p><p><b>Ne fait pas partie de D</b> : contrôles d'étanchéité (G4), composants (G6 à G9), tuyauterie et brasage (G10), épreuves de pression. Du groupe 3, seul le code <b>3.03</b> (utiliser une pompe à vide) est dans le champ.</p><p>Formation indicative ≈ 10 h. Épreuve : <b>1 h 30</b>.</p>",
   "menu_titre": "Les modules du parcours",
   "liens": [
    {
     "vers": "g1a",
     "icone": "1",
     "titre": "Bases : fluides, thermo utile, composants",
     "desc": "G1 partiel — savoir de quoi on parle."
    },
    {
     "vers": "g2",
     "icone": "2",
     "titre": "Enjeu environnemental",
     "desc": "G2 — pourquoi on ne rejette pas."
    },
    {
     "vers": "g5a",
     "icone": "5",
     "titre": "Récupérer sans émettre",
     "desc": "G5 — le cœur du métier D.",
     "primaire": true
    },
    {
     "vers": "g5b",
     "icone": "5",
     "titre": "Peser, stocker, tracer",
     "desc": "G5 — la balance et le registre."
    },
    {
     "vers": "g3",
     "icone": "3",
     "titre": "Pompe à vide (code 3.03 seul)",
     "desc": "G3 partiel — le seul code du groupe 3 dans le champ D."
    },
    {
     "vers": "g11",
     "icone": "11",
     "titre": "Substitution — notions",
     "desc": "G11 partiel (11.01 · 11.05)."
    },
    {
     "vers": "ex-d",
     "icone": "📝",
     "titre": "Examen blanc D",
     "desc": "10 questions sur le périmètre D."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ],
   "notes_pilote": "Parcours court, public souvent éloigné de la technique frigorifique. Ne pas noyer : on n'enseigne pas le cycle pour lui-même, mais ce qu'il faut en savoir pour récupérer proprement. Le geste à faire répéter jusqu'à l'automatisme : peser le cylindre AVANT, respecter le taux de remplissage, ne jamais mélanger deux fluides. La fiche G3 se limite ici à la pompe à vide — ne pas déborder sur l'épreuve de pression."
  },
  {
   "id": "m-e",
   "type": "menu",
   "illus": "img/illu-e.jpg",
   "titre": "Catégorie E — contrôle d'étanchéité, sans ouvrir",
   "dc": "Parcours E",
   "corps": "<p>Une seule activité : le <b>contrôle d'étanchéité</b>, à la condition expresse de <b>ne pas accéder au circuit frigorifique</b>. C'est la frontière du métier : <b>on contrôle, on n'ouvre pas</b>.</p><p>Le code <b>4.06</b> (méthode directe nécessitant d'intervenir dans le circuit) <b>n'est pas de la catégorie E</b>. Le code 4.07, lui, l'est : c'est la méthode directe qui reste à l'extérieur.</p><p>Public type : agent de maintenance réalisant les contrôles périodiques. Formation indicative ≈ 10 h. Épreuve : <b>1 h 30</b>.</p>",
   "menu_titre": "Les modules du parcours",
   "liens": [
    {
     "vers": "g1a",
     "icone": "1",
     "titre": "Bases : pression, température, fluides",
     "desc": "G1 partiel — dont la pression absolue."
    },
    {
     "vers": "g1b",
     "icone": "1",
     "titre": "Lire une table de saturation",
     "desc": "G1 · code 1.03 — indispensable à la méthode indirecte.",
     "primaire": true
    },
    {
     "vers": "g2",
     "icone": "2",
     "titre": "Enjeu environnemental",
     "desc": "G2 — pourquoi une fuite compte."
    },
    {
     "vers": "g4a",
     "icone": "4",
     "titre": "Où fuit une installation ?",
     "desc": "G4 — points de fuite et registre."
    },
    {
     "vers": "g4b",
     "icone": "4",
     "titre": "Méthode indirecte",
     "desc": "G4 — mesurer, comparer, interpréter."
    },
    {
     "vers": "g4c",
     "icone": "4",
     "titre": "Méthode directe et consignation",
     "desc": "G4 — détecteur, traceur, registre."
    },
    {
     "vers": "g11",
     "icone": "11",
     "titre": "Substitution — notions",
     "desc": "G11 partiel (11.01)."
    },
    {
     "vers": "ex-e",
     "icone": "📝",
     "titre": "Examen blanc E",
     "desc": "10 questions sur le périmètre E."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ],
   "notes_pilote": "La question que pose toujours un stagiaire E : « et si je trouve la fuite, je peux la réparer ? » — Non. E autorise le contrôle, pas l'intervention sur le circuit. Faire formuler la frontière par le groupe lui-même, elle se retient mieux. Conséquence pédagogique : la méthode indirecte (lecture manomètre + table de saturation) est le cœur du parcours, il faut y passer le temps d'atelier."
  },
  {
   "id": "g1a",
   "type": "cours",
   "titre": "Unités, pression, thermodynamique utile",
   "dc": "G1 · codes 1.01 · 1.02 · 1.04",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/croix-frigoriste.svg\" alt=\"La croix du frigoriste : détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Tout le métier tient sur un couple : <b>pression et température vont ensemble</b>. Chauffer un fluide enfermé fait monter sa pression ; abaisser sa pression le fait bouillir plus froid. C'est cette relation qu'on exploite d'un bout à l'autre du circuit.</p><p>Quatre organes, dans l'ordre du cycle : le <b>compresseur</b> aspire la vapeur basse pression et la refoule en haute pression ; le <b>condenseur</b> évacue la chaleur et liquéfie ; le <b>détendeur</b> fait chuter la pression ; l'<b>évaporateur</b> absorbe la chaleur du milieu à refroidir. Basse pression du côté froid, haute pression du côté chaud.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "À retenir",
     "html": "<b>Surchauffe</b> : le fluide sort de l'évaporateur un peu plus chaud que sa température d'évaporation — elle protège le compresseur du liquide. Repère : <b>5 à 10 K</b>.<br><b>Sous-refroidissement</b> : le liquide sort du condenseur un peu plus froid que sa température de condensation — il garantit du liquide pur au détendeur. Repère : <b>4 à 8 K</b>."
    },
    {
     "type": "piege",
     "t": "Le piège des manomètres",
     "html": "<b>Pression absolue = pression relative + environ 1 bar.</b> Un manomètre de service lit en relatif ; les tables de saturation, elles, sont souvent en absolu. Se tromper d'un bar, c'est se tromper de plusieurs kelvins sur la température de saturation — et diagnostiquer une fuite qui n'existe pas."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Un manomètre branché sur la basse pression indique 3 bar. Quelle est la pression absolue correspondante ?",
    "choix": [
     "Environ 2 bar",
     "Environ 3 bar",
     "Environ 4 bar",
     "On ne peut pas savoir"
    ],
    "bonne": 2,
    "explication": "Pression absolue = pression relative + environ 1 bar. Le manomètre lit en relatif : 3 + 1 = environ 4 bar absolus.",
    "remediation_vers": "g1a"
   },
   "criteres": [
    {
     "code": "1.01",
     "libelle": "Utiliser les unités normalisées (température, pression, masse, énergie)",
     "etat": "a_evaluer"
    },
    {
     "code": "1.02",
     "libelle": "Expliquer la thermodynamique élémentaire du froid",
     "etat": "a_evaluer"
    },
    {
     "code": "1.04",
     "libelle": "Décrire la fonction de chaque composant du circuit",
     "etat": "a_evaluer"
    }
   ],
   "ressources": [
    "r-croix",
    "r-mollier"
   ],
   "liens": [
    {
     "vers": "g1b",
     "libelle": "Suite ▸ Lire une table de saturation"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Faire lire un manomètre RÉEL et retrouver la température de saturation dans la table : c'est l'ancrage de tout le contrôle indirect qui viendra en G4. Tant que ce geste n'est pas acquis, inutile d'avancer. Pédagogie de la découverte : faire deviner ce qui se passe si on chauffe une bouteille fermée, avant d'énoncer la relation pression-température."
  },
  {
   "id": "g1b",
   "type": "cours",
   "titre": "Lire un log p-h et une table de saturation",
   "dc": "G1 · code 1.03",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/lecture-table.svg\" alt=\"La lecture croisée : manomètre + 1 bar, table de saturation du fluide, sonde de contact.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Une <b>table de saturation</b> donne, pour un fluide donné, la correspondance entre pression et température d'équilibre liquide-vapeur. Elle se lit dans les deux sens : je mesure une pression, j'en déduis une température ; je mesure une température, j'en déduis une pression.</p><p>Le <b>diagramme log p-h</b> est la même information, en image : la pression en ordonnée (échelle logarithmique), l'enthalpie en abscisse. Sous la cloche, le fluide est un mélange liquide + vapeur ; à gauche, il est liquide ; à droite, vapeur.</p><p>C'est l'outil de la <b>méthode indirecte</b> : sans ouvrir le circuit, on compare ce qu'on mesure à ce que la table annonce.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "La méthode en trois gestes",
     "html": "1. Relever la <b>pression</b> au manomètre (et la convertir en absolu si besoin).<br>2. Lire la <b>température de saturation</b> correspondante dans la table du fluide.<br>3. Comparer à la <b>température réellement mesurée</b> sur le tube : l'écart, c'est la surchauffe (à l'aspiration) ou le sous-refroidissement (en sortie de condenseur)."
    },
    {
     "type": "piege",
     "t": "Un fluide, une table",
     "html": "Chaque fluide a sa propre table : la pression lue ne veut rien dire tant qu'on ne sait pas <b>quel fluide</b> est dans le circuit. On le vérifie sur la plaque signalétique et dans le registre, jamais « à la couleur de la bouteille »."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Sur le diagramme log p-h, que représente l'axe horizontal ?",
    "choix": [
     "La température",
     "La pression",
     "L'enthalpie",
     "Le volume"
    ],
    "bonne": 2,
    "explication": "L'axe horizontal porte l'enthalpie (l'énergie contenue par kilogramme de fluide) ; la pression est en ordonnée, en échelle logarithmique.",
    "remediation_vers": "g1b"
   },
   "criteres": [
    {
     "code": "1.03",
     "libelle": "Lire et interpréter un diagramme log p-h et une table de saturation",
     "etat": "a_evaluer"
    },
    {
     "code": "1.06",
     "libelle": "Situer les caractéristiques des fluides de substitution",
     "etat": "a_evaluer"
    }
   ],
   "ressources": [
    "r-mollier"
   ],
   "liens": [
    {
     "vers": "g2",
     "libelle": "Suite ▸ Impact environnemental"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Fiche indispensable au parcours E : sans elle, la méthode indirecte est du bricolage. Utiliser FRIGOLO en projection, puis faire refaire la lecture sur une table papier — le passage de l'outil à la table imprimée est ce qui reste le jour de l'épreuve. Faire chercher : « la pression est plus basse que la table, qu'est-ce que ça peut vouloir dire ? » avant de donner « manque de charge »."
  },
  {
   "id": "g2",
   "type": "cours",
   "titre": "Impact environnemental et F-Gas",
   "dc": "G2 · codes 2.01 · 2.02",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/prp-echelle.svg\" alt=\"Comparaison du PRP : CO2 = 1, R-32 = 675, R-410A = 2088, R-404A = 3922.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Deux accords internationaux, deux problèmes différents. Le <b>protocole de Montréal</b> (1987) visait la <b>couche d'ozone</b> : il a fait disparaître les CFC puis les HCFC. La <b>convention climat</b> (Kyoto, Paris) vise le <b>réchauffement</b> : c'est elle qui s'attaque aux HFC, dont l'action sur l'ozone est nulle mais l'effet de serre considérable.</p><p>Le <b>PRP</b> (potentiel de réchauffement planétaire, ou GWP) mesure cet effet, <b>par kilogramme</b>, en prenant le <b>CO₂ comme étalon : PRP = 1</b>. L'impact réel d'une installation, lui, dépend aussi de la charge : c'est la <b>tonne équivalent CO₂</b>.</p><p>Le règlement <b>(UE) 2024/573</b> — dit F-Gas III — organise la réduction progressive des quantités de HFC mises sur le marché (<i>phase-down</i>), attribue des quotas aux producteurs et importateurs, et interdit certains usages.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Le calcul qui sert tous les jours",
     "html": "<b>tonnes éq. CO₂ = charge (kg) × PRP ÷ 1000</b><br>C'est cette valeur — pas le poids de fluide — qui déclenche une partie des obligations. Deux installations de même charge n'ont pas les mêmes contraintes si les fluides diffèrent."
    },
    {
     "type": "piege",
     "t": "ODP et PRP ne se confondent pas",
     "html": "Un HFC a un <b>ODP nul</b> (il ne détruit pas l'ozone) et pourtant un <b>PRP fort</b>. Dire « il ne touche pas l'ozone, donc il est propre » est faux. Et un PRP bas ne veut pas dire zéro impact : la question des <b>PFAS</b> se pose désormais sur certains fluides à bas PRP."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Une installation contient 15 kg de R-32 (PRP = 675). Quelle est sa charge en tonnes équivalent CO₂ ?",
    "choix": [
     "4,5 t éq. CO₂",
     "6,75 t éq. CO₂",
     "10,13 t éq. CO₂",
     "101,3 t éq. CO₂"
    ],
    "bonne": 2,
    "explication": "15 × 675 ÷ 1000 = 10,13 t éq. CO₂. Le piège classique est d'oublier la division par 1000 et de confondre les kilogrammes avec les tonnes équivalent CO₂.",
    "remediation_vers": "g2"
   },
   "criteres": [
    {
     "code": "2.01",
     "libelle": "Situer la politique climat internationale et européenne",
     "etat": "a_evaluer"
    },
    {
     "code": "2.02",
     "libelle": "Expliquer le PRP et les obligations du règlement (UE) 2024/573",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "x1",
     "libelle": "Suite ▸ Exercice : calculer une charge"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Faire calculer l'équivalent CO₂ d'une machine de l'atelier, plaque signalétique en main : l'enjeu devient concret en trente secondes. Ne pas asséner les valeurs de PRP — les faire chercher sur la fiche du fluide. Relier explicitement à G4 et G5 : si le climat se joue sur les fuites, l'étanchéité et la récupération deviennent des gestes écologiques, pas des formalités."
  },
  {
   "id": "x1",
   "type": "exercice",
   "titre": "Exercice — deux installations, deux impacts",
   "dc": "G2 · mise en situation",
   "minuteur_s": 420,
   "corps": "<p>Tu interviens sur deux machines dans le même bâtiment.</p><ul><li><b>Machine A</b> — chambre froide, <b>12 kg</b> de <b>R-404A</b> (PRP = 3922).</li><li><b>Machine B</b> — climatisation, <b>12 kg</b> de <b>R-32</b> (PRP = 675).</li></ul><p>Même charge, même bâtiment, même exploitant. Calcule la charge en tonnes équivalent CO₂ de chacune avant de répondre.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Rappel de la formule",
     "html": "tonnes éq. CO₂ = <b>charge (kg) × PRP ÷ 1000</b>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "À charge égale (12 kg), quel est le rapport d'impact climatique entre la machine A (R-404A) et la machine B (R-32) ?",
    "choix": [
     "Le même impact : la charge est identique",
     "La machine A pèse environ 6 fois plus lourd (47,1 contre 8,1 t éq. CO₂)",
     "La machine B pèse plus lourd, le R-32 est inflammable",
     "On ne peut pas comparer deux fluides différents"
    ],
    "bonne": 1,
    "explication": "A : 12 × 3922 ÷ 1000 = 47,1 t éq. CO₂. B : 12 × 675 ÷ 1000 = 8,1 t éq. CO₂. Soit environ 6 fois plus pour la même quantité de fluide : c'est le PRP qui fait la différence, pas le poids.",
    "remediation_vers": "g2"
   },
   "criteres": [
    {
     "code": "2.02",
     "libelle": "Calculer une charge en tonnes équivalent CO₂",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g3",
     "libelle": "Suite ▸ Contrôles avant mise en service"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Exercice à faire au tableau, calculatrice en main, AVANT de donner le résultat. L'effet pédagogique tient à la surprise du facteur 6 sur une charge identique. Enchaîner sur la question « et si les deux fuient d'un kilo ? » — c'est le meilleur passage vers G4 (étanchéité) : la fuite ne se paie pas au kilo, elle se paie au PRP."
  },
  {
   "id": "g3",
   "type": "cours",
   "titre": "Contrôles avant mise en service",
   "dc": "G3 · codes 3.01 → 3.05",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/epreuve-azote.svg\" alt=\"Montage de l épreuve de pression : bouteille d azote, manifold, circuit — oxygène et air comprimé barrés.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Deux épreuves, deux buts, souvent enchaînées. L'<b>épreuve de résistance</b> vérifie que l'assemblage tient mécaniquement. L'<b>épreuve d'étanchéité</b> vérifie qu'il ne laisse rien passer. Les pressions d'épreuve se prennent <b>sur la documentation constructeur</b> et la norme applicable — jamais à l'estime.</p><p>Vient ensuite le <b>tirage au vide</b>. Il ne sert pas à « faire propre » : il extrait l'<b>air</b> (incondensable, qui fait monter la haute pression) et l'<b>humidité</b> (qui gèle au détendeur et attaque l'huile). Sous vide, l'eau bout à température ambiante — c'est exactement ce qu'on cherche.</p><p>Enfin, on <b>consigne</b> : registre et rapport d'essais font partie du geste professionnel.</p>",
   "blocs": [
    {
     "type": "piege",
     "t": "Geste interdit — sans discussion",
     "html": "Toute mise en pression se fait à l'<b>azote</b>, et à l'azote seulement. <b>Jamais d'oxygène</b> — au contact de l'huile du circuit, le mélange est explosif. <b>Jamais d'air comprimé</b> — il apporte de l'humidité et contient de l'oxygène. Ce geste ne se discute pas et ne se découvre pas : il s'impose."
    },
    {
     "type": "cle",
     "t": "Le vide qui remonte",
     "html": "Après avoir isolé la pompe, on <b>surveille</b> : si le vide remonte, il y a une fuite ou de l'humidité résiduelle. Un tirage au vide réussi, c'est un vide qui <b>tient</b>. Valeurs cibles et durées : selon doc constructeur, à faire valider."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous devez réaliser une épreuve de pression sur un circuit neuf. Quel gaz utilisez-vous ?",
    "choix": [
     "De l'air comprimé, c'est le plus disponible en atelier",
     "De l'oxygène, il est déjà sur le chariot de brasage",
     "De l'azote sec",
     "Le fluide frigorigène de l'installation"
    ],
    "bonne": 2,
    "explication": "Azote sec uniquement. L'oxygène en présence d'huile peut provoquer une explosion ; l'air comprimé apporte de l'humidité et de l'oxygène ; le fluide frigorigène ne se rejette jamais à l'atmosphère.",
    "remediation_vers": "g3"
   },
   "criteres": [
    {
     "code": "3.01",
     "libelle": "Réaliser une épreuve de pression de résistance",
     "etat": "a_evaluer"
    },
    {
     "code": "3.02",
     "libelle": "Réaliser une épreuve de pression d'étanchéité",
     "etat": "a_evaluer"
    },
    {
     "code": "3.03",
     "libelle": "Utiliser une pompe à vide",
     "etat": "a_evaluer"
    },
    {
     "code": "3.04",
     "libelle": "Faire le vide : évacuer l'air et l'humidité",
     "etat": "a_evaluer"
    },
    {
     "code": "3.05",
     "libelle": "Consigner le registre et rédiger le rapport d'essais",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g4a",
     "libelle": "Suite ▸ Contrôles d'étanchéité"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Pour la catégorie D, seul le code 3.03 (pompe à vide) est dans le champ : ne pas emmener un groupe D sur l'épreuve de pression. Faire monter le montage azote sur un poste d'essai dédié, jamais sur une installation client en première approche. L'anecdote qui marque : une bouteille mal identifiée, de l'oxygène branché par erreur sur un circuit huilé. Faire lire un vacuomètre en direct pendant un tirage réel, et faire chercher « pourquoi le vide remonte-t-il ? »."
  },
  {
   "id": "g4a",
   "type": "cours",
   "titre": "Où fuit une installation ?",
   "dc": "G4 · codes 4.01 · 4.02 · 4.03",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/points-de-fuite.svg\" alt=\"Six familles de points de fuite repérées sur un circuit type.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Une fuite ne sort pas d'un tube plein. Elle sort d'un <b>point d'assemblage</b> ou d'une <b>pièce en mouvement</b> : raccords mécaniques (flare, à visser), brasures poreuses ou mal pénétrées, presse-étoupes de vannes, joints, raccords vissés des voyants, filtres et pressostats, et tout ce qui <b>vibre</b> — compresseur, tuyauteries mal fixées.</p><p>Avant de sortir le moindre instrument, on <b>lit le registre</b> : quelle charge, quel fluide, quelles fuites déjà détectées, qu'a-t-on réparé et quand. Un point déjà réparé est un point <b>à recontrôler en priorité</b>, pas un point clos.</p><p>Vient ensuite le <b>contrôle visuel et manuel</b>, sans électronique : traces d'huile (le fluide entraîne l'huile en fuyant), corrosion, givre anormal, serrage des raccords accessibles, état des fixations.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "L'ordre ne s'invente pas",
     "html": "<b>Registre → visuel et manuel → méthode indirecte → méthode directe.</b><br>Chaque étape oriente la suivante. On ne contrôle jamais à l'aveugle : le registre oriente le contrôle avant même d'ouvrir la porte du local technique."
    },
    {
     "type": "piege",
     "t": "La trace d'huile",
     "html": "Une trace d'huile sous un raccord n'est pas une salissure : c'est la <b>signature d'une fuite</b>. Le fluide s'échappe, l'huile miscible reste. Inversement, un bac de condensats bouché peut <b>masquer</b> une fuite pendant des semaines."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous arrivez sur une installation pour un contrôle périodique d'étanchéité. Par quoi commencez-vous ?",
    "choix": [
     "Par balayer tous les raccords au détecteur électronique",
     "Par consulter le registre de l'installation",
     "Par mettre le circuit sous pression d'azote",
     "Par relever les pressions au manomètre"
    ],
    "bonne": 1,
    "explication": "Le registre donne la charge, le fluide, l'historique des fuites et des réparations. Il oriente le contrôle : les points déjà réparés sont à revoir en priorité.",
    "remediation_vers": "g4a"
   },
   "criteres": [
    {
     "code": "4.01",
     "libelle": "Identifier les points de fuite potentiels d'une installation",
     "etat": "a_evaluer"
    },
    {
     "code": "4.02",
     "libelle": "Consulter et exploiter le registre avant le contrôle",
     "etat": "a_evaluer"
    },
    {
     "code": "4.03",
     "libelle": "Réaliser un contrôle visuel et manuel",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g4b",
     "libelle": "Suite ▸ Méthode indirecte"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Pédagogie de la découverte : emmener le groupe devant une machine d'atelier et faire CHERCHER les points de fuite avant de donner la liste. Les stagiaires en trouvent la moitié seuls, on complète — la liste donnée d'emblée ne se retient pas. Insister sur le registre : c'est le réflexe qui distingue le professionnel du bricoleur, et c'est évalué."
  },
  {
   "id": "g4b",
   "type": "cours",
   "titre": "Méthode indirecte — mesurer et interpréter",
   "dc": "G4 · codes 4.04 · 4.05",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/lecture-table.svg\" alt=\"La lecture croisée : manomètre + 1 bar, table de saturation du fluide, sonde de contact.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>La méthode indirecte <b>ne détecte pas la fuite</b> : elle détecte un <b>fonctionnement anormal</b> qui la trahit. On relève les <b>pressions</b> (BP et HP) au manomètre et les <b>températures</b> au thermomètre de contact, puis on compare à la <b>table de saturation</b> du fluide présent.</p><p>Une pression plus basse que la valeur théorique attendue, une <b>surchauffe</b> qui grimpe au-delà des 5 à 10 K habituels, un <b>sous-refroidissement</b> qui s'effondre sous les 4 à 8 K : autant d'indices convergents d'un manque de charge. Le multimètre complète le tableau (intensité absorbée, cohérence électrique).</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Trois instruments, trois informations",
     "html": "<b>Manomètre</b> (BP/HP) → écart avec la table de saturation.<br><b>Thermomètre de contact</b> → surchauffe et sous-refroidissement.<br><b>Multimètre</b> → cohérence électrique du compresseur.<br>Un seul indice ne conclut rien ; c'est leur <b>convergence</b> qui oriente."
    },
    {
     "type": "piege",
     "t": "Relatif ou absolu ?",
     "html": "Toujours le même piège : ne pas confondre pression <b>relative</b> (lue au manomètre) et pression <b>absolue</b> (souvent utilisée dans les tables). Écart : environ 1 bar. Et un fluide n'a jamais la table d'un autre."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "En quoi consiste la méthode indirecte de contrôle d'étanchéité ?",
    "choix": [
     "Utiliser un détecteur électronique le long des raccords",
     "Suivre les paramètres de fonctionnement (pressions, températures, surchauffe)",
     "Mettre le circuit sous pression d'azote",
     "Injecter un traceur UV dans le circuit"
    ],
    "bonne": 1,
    "explication": "La méthode indirecte analyse le fonctionnement : pressions, températures, surchauffe et sous-refroidissement comparés aux valeurs attendues. Elle ne localise pas la fuite, elle la soupçonne.",
    "remediation_vers": "g4b"
   },
   "criteres": [
    {
     "code": "4.04",
     "libelle": "Mettre en œuvre la méthode indirecte (mesures et tables)",
     "etat": "a_evaluer"
    },
    {
     "code": "4.05",
     "libelle": "Utiliser les instruments portables et interpréter les mesures",
     "etat": "a_evaluer"
    }
   ],
   "ressources": [
    "r-mollier"
   ],
   "liens": [
    {
     "vers": "g4c",
     "libelle": "Suite ▸ Méthode directe et registre"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Le cœur du parcours E, et le module qui prend le plus de temps d'atelier. Faire manipuler manomètre + thermomètre EN BINÔME sur une machine, puis confronter les relevés à une vraie table de saturation. Tant que le stagiaire ne sait pas dire « la table annonce X, je mesure Y, donc… », la compétence n'est pas acquise. Ne pas accepter un relevé recopié : faire refaire la mesure."
  },
  {
   "id": "g4c",
   "type": "cours",
   "titre": "Méthode directe et consignation",
   "dc": "G4 · codes 4.07 · 4.08 · 4.09",
   "minuteur_s": 330,
   "corps": "<img src=\"packs/fluides/res/svg/balayage-detecteur.svg\" alt=\"La sonde du détecteur longe le raccord lentement ; une alerte se confirme par un second passage.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>La méthode directe <b>localise physiquement</b> la fuite. Pour la catégorie E, elle se pratique <b>sans accéder au circuit</b> : c'est le code <b>4.07</b>. Le code 4.06, qui suppose d'intervenir dans le circuit, n'est pas dans le champ de la catégorie E.</p><p>Le <b>détecteur électronique</b> réagit à la présence de molécules de fluide dans l'air : on balaie la sonde <b>lentement</b>, le long des points repérés à l'étape visuelle. L'<b>eau savonneuse</b> localise par les bulles ; le <b>traceur UV</b> révèle les fuites intermittentes ou d'accès difficile. Sensibilité et étalonnage : selon doc constructeur, à faire valider.</p><p>Un contrôle non consigné n'a <b>aucune valeur réglementaire</b>. On note : date, méthode, points contrôlés, résultat, et en cas de fuite la localisation précise et la suite donnée.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Une alerte se confirme",
     "html": "Le détecteur qui siffle ne conclut rien tout seul. On <b>repasse</b>, ventilateurs à l'arrêt si possible — l'air brassé disperse le nuage de fluide et fait sonner l'appareil à côté de la vraie fuite. Deux passages concordants, sinon on ne conclut pas."
    },
    {
     "type": "piege",
     "t": "L'instrument aussi se contrôle",
     "html": "Un détecteur non étalonné donne une conformité qui ne vaut rien. Étalonnage périodique selon la réglementation applicable, et <b>vérification au gaz de référence avant utilisation</b>. Le registre doit pouvoir dire avec quel appareil le contrôle a été fait."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Votre détecteur électronique sonne au niveau d'un raccord, le ventilateur du condenseur tournant à plein régime. Que faites-vous ?",
    "choix": [
     "Vous concluez à une fuite et vous la consignez",
     "Vous confirmez par un second passage, ventilateur à l'arrêt si possible",
     "Vous changez le raccord immédiatement",
     "Vous ignorez l'alerte, l'air fausse toujours la mesure"
    ],
    "bonne": 1,
    "explication": "Une alerte se confirme avant d'être conclue. L'air brassé disperse le fluide et peut faire sonner l'appareil loin de la fuite réelle : on repasse dans des conditions plus calmes.",
    "remediation_vers": "g4c"
   },
   "criteres": [
    {
     "code": "4.07",
     "libelle": "Mettre en œuvre la méthode directe sans intervenir dans le circuit",
     "etat": "a_evaluer"
    },
    {
     "code": "4.08",
     "libelle": "Utiliser un détecteur électronique de fuites",
     "etat": "a_evaluer"
    },
    {
     "code": "4.09",
     "libelle": "Consigner le contrôle dans le registre",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g5a",
     "libelle": "Suite ▸ Récupérer sans émettre"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Insister sur la frontière 4.06 / 4.07 avec un groupe E : elle définit le métier. « Je contrôle, je n'ouvre pas. » Faire manipuler le détecteur sur une fuite calibrée d'atelier et faire constater qu'un balayage trop rapide passe à côté. Terminer par le remplissage d'un registre réel — un contrôle non consigné n'existe pas."
  },
  {
   "id": "g5a",
   "type": "cours",
   "titre": "Récupérer sans émettre",
   "dc": "G5 · codes 5.01 → 5.04",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/recuperation.svg\" alt=\"Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Chaque connexion et chaque déconnexion est un <b>point de fuite</b> : le geste est lent, contrôlé, flexibles purgés. Avant de récupérer, on <b>arrête et on isole</b> le système.</p><p>Le <b>groupe de récupération</b> transfère le fluide vers un cylindre prévu pour, en phase gazeuse ou liquide selon la situation. Le cylindre respecte un <b>taux de remplissage maximal</b> — jamais rempli à ras : le liquide se dilate avec la température, et un cylindre plein est un danger. On <b>pèse avant</b>, sinon on ne saura jamais combien on a réellement récupéré.</p><p>L'<b>huile</b> du compresseur est contaminée par nature : elle se récupère à part, comme un déchet dangereux. Elle ne se dégaze pas, elle ne se mélange pas au fluide.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Récupéré, recyclé, régénéré",
     "html": "<b>Récupéré</b> : sorti de la machine — c'est un déchet tant qu'il n'a pas été traité.<br><b>Recyclé</b> : nettoyé sommairement — réemploi limité, typiquement sur la même installation ou le même exploitant.<br><b>Régénéré</b> : ramené aux spécifications d'un fluide neuf par une filière agréée — réutilisable comme du neuf."
    },
    {
     "type": "piege",
     "t": "Ne jamais mélanger",
     "html": "Deux fluides différents dans le même cylindre, et le contenu devient <b>impossible à recycler ou à régénérer</b> : il part en destruction, aux frais de l'entreprise. Un cylindre, un fluide, une étiquette."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Pourquoi ne remplit-on jamais un cylindre de récupération à ras bord ?",
    "choix": [
     "Pour qu'il reste transportable à la main",
     "Parce que le liquide se dilate avec la température : un taux de remplissage maximal doit être respecté",
     "Pour laisser de la place au fluide suivant",
     "Parce que la balance ne mesure pas au-delà"
    ],
    "bonne": 1,
    "explication": "Le fluide liquide se dilate quand la température monte. Un cylindre trop rempli n'a plus de volume d'expansion : le taux de remplissage maximal n'est pas une précaution, c'est une règle de sécurité.",
    "remediation_vers": "g5a"
   },
   "criteres": [
    {
     "code": "5.01",
     "libelle": "Connecter et déconnecter avec un minimum d'émissions",
     "etat": "a_evaluer"
    },
    {
     "code": "5.02",
     "libelle": "Vider et remplir un cylindre, en phase liquide et gazeuse",
     "etat": "a_evaluer"
    },
    {
     "code": "5.03",
     "libelle": "Utiliser un dispositif de récupération",
     "etat": "a_evaluer"
    },
    {
     "code": "5.04",
     "libelle": "Vidanger l'huile contaminée",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g5b",
     "libelle": "Suite ▸ Peser, stocker, tracer"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Cœur du parcours D : chaque stagiaire branche, purge et pèse lui-même, sans exception. L'anecdote qui marque mieux qu'un discours : un cylindre trop rempli laissé au soleil. Relier systématiquement à G2 — un geste de récupération soigné est un geste écologique, pas une contrainte administrative. Faire chercher sur le log p-h si le fluide observé est sous-refroidi, saturé ou surchauffé avant de donner la réponse."
  },
  {
   "id": "g5b",
   "type": "cours",
   "titre": "Peser, charger, stocker, tracer",
   "dc": "G5 · codes 5.05 → 5.09",
   "minuteur_s": 330,
   "corps": "<img src=\"packs/fluides/res/svg/recuperation.svg\" alt=\"Rappel du montage : la bouteille se pèse avant, ne se remplit jamais à ras, ne mélange jamais deux fluides.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Pour charger, on détermine d'abord l'<b>état du fluide</b> et la <b>quantité prévue</b> (plaque signalétique, doc constructeur). La charge se contrôle à la <b>balance</b>, jamais « au manomètre » : le manomètre dit comment la machine se comporte, la balance dit combien on a mis.</p><p>Cas particulier des <b>mélanges zéotropes</b> : ils se chargent en <b>phase liquide</b>, faute de quoi les composants se séparent et la composition du circuit dérive.</p><p>Le <b>registre</b> est la preuve légale de toute opération sur le fluide : quantité ajoutée, quantité récupérée, date, intervenant. Le rejet volontaire à l'atmosphère est strictement interdit et sanctionné.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "La balance prime",
     "html": "On pèse <b>avant</b> et <b>après</b>. Sans pesée initiale, la quantité récupérée ou ajoutée n'est qu'une estimation — et une estimation ne se consigne pas dans un registre."
    },
    {
     "type": "piege",
     "t": "Stockage et transport",
     "html": "Cylindres arrimés, debout, étiquetés, à l'abri de la chaleur ; les fluides <b>inflammables</b> (hydrocarbures, A2L) obéissent en plus aux règles de leur classe. Conditions détaillées : selon la réglementation applicable et la fiche de données de sécurité, à faire valider."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Avec quoi contrôle-t-on la quantité de fluide chargée dans une installation ?",
    "choix": [
     "Un manomètre",
     "Une balance de précision",
     "Un thermomètre",
     "Un vacuomètre"
    ],
    "bonne": 1,
    "explication": "La charge se mesure au poids, avec une balance. Les pressions renseignent sur le fonctionnement, pas sur la quantité de fluide présente dans le circuit.",
    "remediation_vers": "g5b"
   },
   "criteres": [
    {
     "code": "5.05",
     "libelle": "Déterminer l'état du fluide et charger sans perte",
     "etat": "a_evaluer"
    },
    {
     "code": "5.06",
     "libelle": "Choisir la balance adaptée et peser",
     "etat": "a_evaluer"
    },
    {
     "code": "5.07",
     "libelle": "Consigner l'opération dans le registre",
     "etat": "a_evaluer"
    },
    {
     "code": "5.08",
     "libelle": "Appliquer les prescriptions de gestion, stockage et transport",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g6",
     "libelle": "Suite ▸ Le compresseur"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Le geste à faire répéter : peser AVANT. Beaucoup de stagiaires pèsent après et déduisent — c'est faux dès qu'il reste du fluide dans le cylindre. Sur un groupe A2, insister sur la précision : sur une charge de 800 g, 50 g d'écart changent le comportement de la machine. Faire remplir un registre à chaque manipulation d'atelier, même en exercice."
  },
  {
   "id": "g6",
   "type": "cours",
   "titre": "Le compresseur",
   "dc": "G6 · codes 6.01 → 6.08",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/compresseurs.svg\" alt=\"Coupe animée d un compresseur à piston et les quatre technologies : piston, scroll, vis, rotatif.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le compresseur est le <b>seul organe actif</b> du cycle : il aspire la vapeur basse pression et la refoule en haute pression. Tout le reste est passif.</p><p>Ses points de fuite privilégiés : <b>raccords, vannes de service, presse-étoupe, bornes de traversée</b> sur les hermétiques. Ses sécurités — pressostats HP et BP, protection thermique — se règlent <b>selon la fiche constructeur</b>, jamais à l'estime.</p><p>L'<b>huile</b> lubrifie, refroidit et assure l'étanchéité interne. Elle circule avec le fluide et doit <b>revenir</b> : un retour d'huile défaillant est une cause fréquente de panne prématurée, et souvent le premier signe visible d'un problème de conception des lignes.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce que dit une température de refoulement",
     "html": "Un refoulement anormalement chaud oriente vers un <b>manque de fluide</b>, une <b>surchauffe excessive</b> ou un <b>mauvais retour d'huile</b>. Trois causes, un seul symptôme : on croise avec les autres relevés avant de conclure."
    },
    {
     "type": "piege",
     "t": "Geste interdit",
     "html": "<b>Consignation électrique</b> avant toute intervention sur les sécurités ou les raccords du compresseur. Et un compresseur à l'arrêt peut rester <b>sous pression</b> longtemps : on ne le dépose jamais sans avoir vérifié."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "À quoi sert le réchauffeur de carter d'un compresseur ?",
    "choix": [
     "À augmenter la puissance frigorifique",
     "À éviter la migration du fluide dans l'huile pendant les arrêts",
     "À chauffer le local technique",
     "À faire fondre le givre de l'évaporateur"
    ],
    "bonne": 1,
    "explication": "À l'arrêt, le fluide migre vers le point froid et se dissout dans l'huile du carter. Au démarrage, l'huile diluée ne lubrifie plus : le réchauffeur maintient le carter assez chaud pour éviter cette migration.",
    "remediation_vers": "g6"
   },
   "criteres": [
    {
     "code": "6.01",
     "libelle": "Expliquer le principe du compresseur et ses risques de fuite",
     "etat": "a_evaluer"
    },
    {
     "code": "6.03",
     "libelle": "Régler les interrupteurs de sécurité et de contrôle",
     "etat": "a_evaluer"
    },
    {
     "code": "6.05",
     "libelle": "Vérifier le retour d'huile",
     "etat": "a_evaluer"
    },
    {
     "code": "6.07",
     "libelle": "Rédiger un rapport d'état",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g7",
     "libelle": "Suite ▸ Le condenseur"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Rappeler que le composant est TIRÉ AU SORT à l'épreuve : les quatre modules se travaillent. Faire repérer les organes de sécurité sur un compresseur d'atelier, coffret ouvert et CONSIGNÉ. Pédagogie de la découverte : faire mesurer une surchauffe anormalement élevée sans donner la cause, laisser remonter vers l'hypothèse retour d'huile ou clapet usé."
  },
  {
   "id": "g7",
   "type": "cours",
   "titre": "Le condenseur",
   "dc": "G7 · codes 7.01 → 7.10",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/echangeur-air.svg\" alt=\"Le condenseur à air : l air ambiant traverse la batterie poussé par le ventilateur et ressort réchauffé.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le condenseur <b>évacue vers l'extérieur</b> la chaleur prise dans l'évaporateur, plus celle apportée par la compression. La vapeur haute pression s'y refroidit, se liquéfie, puis se <b>sous-refroidit</b> : <b>4 à 8 K</b> en sortie, pour garantir du liquide pur au détendeur.</p><p>Sur un condenseur à air, les <b>ventilateurs</b> forcent l'air à travers la batterie. Une batterie encrassée, un ventilateur à l'arrêt, et la haute pression monte : la machine consomme plus, et le pressostat HP finit par couper.</p><p>Les <b>incondensables</b> (air entré lors d'une intervention mal faite) se purgent <b>à l'arrêt</b>, installation froide, avec récupération — jamais fluide en mouvement.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Deux pressostats, deux fonctions",
     "html": "Le pressostat de <b>sécurité</b> coupe le compresseur pour protéger l'installation. Le pressostat de <b>régulation</b> pilote le ventilateur pour tenir la pression de condensation. Deux rôles, deux réglages — et les valeurs se prennent sur la doc constructeur."
    },
    {
     "type": "piege",
     "t": "Propreté = énergie",
     "html": "Une batterie sale n'est pas un problème esthétique : c'est une haute pression plus élevée, un compresseur qui force et une facture qui monte. L'inspection visuelle de la surface fait partie du contrôle, pas de l'entretien optionnel."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Le pressostat haute pression déclenche et arrête le compresseur. Quelle cause cherchez-vous en premier ?",
    "choix": [
     "Un manque de fluide frigorigène",
     "Un condenseur encrassé, un ventilateur arrêté, ou un excès de charge",
     "Un évaporateur givré",
     "Un manque d'huile"
    ],
    "bonne": 1,
    "explication": "La haute pression monte quand la chaleur n'est plus évacuée : batterie encrassée, ventilateur en panne, débit d'air empêché — ou charge excessive. Un manque de fluide ferait l'inverse.",
    "remediation_vers": "g7"
   },
   "criteres": [
    {
     "code": "7.01",
     "libelle": "Expliquer le principe du condenseur et ses risques de fuite",
     "etat": "a_evaluer"
    },
    {
     "code": "7.04",
     "libelle": "Régler les interrupteurs de sécurité et de contrôle",
     "etat": "a_evaluer"
    },
    {
     "code": "7.06",
     "libelle": "Purger les incondensables",
     "etat": "a_evaluer"
    },
    {
     "code": "7.08",
     "libelle": "Inspecter la surface d'échange",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g8",
     "libelle": "Suite ▸ L'évaporateur"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Faire mesurer HP, BP et sous-refroidissement AVANT de donner la plage attendue, puis confronter au repère 4-8 K. La purge des incondensables se fait sur poste dédié, avec récupération, sous consigne stricte. Rappeler à chaque séance : jamais d'oxygène ni d'air comprimé pour un contrôle d'étanchéité — en présence d'huile, c'est un risque d'explosion."
  },
  {
   "id": "g8",
   "type": "cours",
   "titre": "L'évaporateur",
   "dc": "G8 · codes 8.01 → 8.11",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/mesure-surchauffe.svg\" alt=\"La surchauffe se mesure en deux points : manomètre BP vers la table, sonde de contact sur le tube.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>C'est le point <b>froid</b> du circuit : le fluide y absorbe la chaleur du milieu à refroidir et se vaporise. En sortie, il doit être <b>entièrement vapeur</b>, avec une <b>surchauffe de 5 à 10 K</b> — c'est ce qui protège le compresseur du coup de liquide.</p><p>Le <b>givre</b> est normal en froid négatif ; installé durablement, il isole la batterie et fait chuter l'échange. D'où les cycles de <b>dégivrage</b> (air, résistance électrique, gaz chauds). Un évaporateur qui givre <b>complètement</b> en fonctionnement signale d'abord un problème de <b>débit d'air</b> : filtre encrassé, ventilateur arrêté.</p><p>Points de vigilance propres : corrosion, condensats, et le <b>bac</b> — une fuite peut s'y dissimuler sous l'eau de dégivrage.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Lire la surchauffe",
     "html": "<b>Surchauffe = température du gaz à l'aspiration − température d'évaporation</b> (celle que la table donne pour la BP mesurée).<br>Trop élevée → le détendeur n'alimente pas assez, ou il manque du fluide.<br>Nulle ou négative, ligne d'aspiration givrée → <b>risque de coup de liquide</b>, on agit tout de suite."
    },
    {
     "type": "piege",
     "t": "Deux organes qu'on confond",
     "html": "Le <b>régulateur de pression d'évaporation</b> protège le produit (il empêche l'évaporateur de descendre trop bas). Le <b>pressostat BP</b> protège le compresseur. Fonctions différentes, réglages différents."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Une installation présente une surchauffe nulle et la ligne d'aspiration est givrée jusqu'au compresseur. Quelle action prioritaire ?",
    "choix": [
     "Ajouter du fluide frigorigène",
     "Réduire l'ouverture du détendeur ou retirer du fluide : il y a risque de coup de liquide",
     "Nettoyer le condenseur",
     "Remplacer le compresseur"
    ],
    "bonne": 1,
    "explication": "Surchauffe nulle = du liquide arrive au compresseur. Le liquide est incompressible : la casse est immédiate. On réduit l'alimentation du détendeur ou on retire de la charge, sans attendre.",
    "remediation_vers": "g8"
   },
   "criteres": [
    {
     "code": "8.01",
     "libelle": "Expliquer le principe de l'évaporateur et le dégivrage",
     "etat": "a_evaluer"
    },
    {
     "code": "8.05",
     "libelle": "Vérifier les conduites liquide et aspiration",
     "etat": "a_evaluer"
    },
    {
     "code": "8.08",
     "libelle": "Réaliser la mise en marche/arrêt et les mesures",
     "etat": "a_evaluer"
    },
    {
     "code": "8.09",
     "libelle": "Inspecter la surface d'échange et le bac de condensats",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "x2",
     "libelle": "Suite ▸ Exercice : diagnostic"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Faire relever la surchauffe sur banc réel : manomètre + sonde de contact, puis calcul. C'est le geste le plus discriminant de tout le référentiel composants. Faire observer le givrage en direct avant d'expliquer le mécanisme. Anecdote utile : un bac de condensats bouché a masqué une fuite pendant des semaines — d'où l'inspection visuelle systématique (8.09)."
  },
  {
   "id": "x2",
   "type": "exercice",
   "titre": "Exercice — la machine ne fait plus de froid",
   "dc": "G8 · G9 · mise en situation",
   "minuteur_s": 480,
   "corps": "<p>Chambre froide positive. Le compresseur tourne, mais la température de la chambre ne descend plus. Tu relèves :</p><ul><li>basse pression <b>anormalement basse</b> ;</li><li>surchauffe à l'aspiration <b>très élevée</b>, de l'ordre de 20 K ;</li><li>sous-refroidissement <b>quasi nul</b>, <b>bulles</b> visibles au voyant liquide ;</li><li>aucune trace d'huile visible au premier examen.</li></ul><p>Rappels : surchauffe attendue 5 à 10 K, sous-refroidissement attendu 4 à 8 K.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Méthode",
     "html": "On ne conclut pas sur un relevé isolé : on cherche la cause qui explique <b>tous</b> les indices à la fois. Ici, trois indices convergent."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Quelle hypothèse explique l'ensemble des relevés ?",
    "choix": [
     "Un excès de charge en fluide",
     "Un manque de charge : la fuite est à rechercher",
     "Un condenseur encrassé",
     "Un compresseur en fin de vie"
    ],
    "bonne": 1,
    "explication": "BP basse + surchauffe élevée + sous-refroidissement effondré + bulles au voyant : le circuit manque de fluide. C'est un diagnostic par méthode indirecte — il reste à localiser la fuite par méthode directe, puis à consigner.",
    "remediation_vers": "g4b"
   },
   "criteres": [
    {
     "code": "4.04",
     "libelle": "Interpréter des mesures par la méthode indirecte",
     "etat": "a_evaluer"
    },
    {
     "code": "8.08",
     "libelle": "Réaliser les mesures en fonctionnement",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g9",
     "libelle": "Suite ▸ Le détendeur"
    },
    {
     "vers": "g4b",
     "libelle": "↩ Revoir la méthode indirecte",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Exercice charnière : il rebranche les composants (G6-G9) sur l'étanchéité (G4). Le laisser chercher en binôme cinq minutes avant de corriger. Erreur fréquente : s'arrêter à « le détendeur est bouché » — plausible pour la surchauffe, mais n'explique ni le sous-refroidissement nul ni les bulles au voyant. Faire verbaliser pourquoi une seule cause explique les trois indices. Enchaîner : « et maintenant, comment localises-tu la fuite ? » → retour en G4c."
  },
  {
   "id": "g9",
   "type": "cours",
   "titre": "Le détendeur et les organes annexes",
   "dc": "G9 · codes 9.01 → 9.10",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/detendeurs-ligne.svg\" alt=\"Les quatre types de détendeurs et la ligne liquide avec ses accessoires dans l ordre.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le détendeur fait chuter la pression et <b>dose le débit de liquide</b> envoyé à l'évaporateur. Le <b>détendeur thermostatique</b> régule sur la <b>surchauffe</b> : son bulbe, fixé sur la ligne d'aspiration, sent la température du gaz et ouvre ou ferme en conséquence. Le <b>détendeur électronique</b> fait la même chose avec une sonde et un régulateur : plus précis, plus rapide. Le <b>capillaire</b>, lui, est un tube calibré fixe, sans réglage — on le trouve sur les petits appareils.</p><p>Autour du détendeur, la ligne liquide porte le <b>filtre déshydrateur</b> (tamis moléculaire, monté <b>dans le sens de la flèche</b>) et le <b>voyant</b>, qui renseigne sur deux choses : la présence de bulles et, par sa pastille, l'humidité du circuit.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Sécurité électrique, sécurité mécanique",
     "html": "Le <b>pressostat</b> est électrique et réglable : il coupe avant l'incident. La <b>soupape de sécurité</b> est mécanique, tarée par le constructeur : c'est le dernier recours. On ne remplace jamais l'une par l'autre, et on ne retouche pas un tarage."
    },
    {
     "type": "piege",
     "t": "Trois erreurs de montage",
     "html": "Monter une vanne ou un déshydrateur <b>à l'envers</b> (erreur irréversible sans découpe) ; poser le <b>bulbe</b> au mauvais endroit ou mal serré ; retoucher le réglage <b>sans laisser l'installation se stabiliser</b> entre deux actions — la mesure suivante ne veut alors plus rien dire."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Sur quoi le détendeur thermostatique régule-t-il ?",
    "choix": [
     "La pression de condensation",
     "La surchauffe à la sortie de l'évaporateur",
     "Le sous-refroidissement en sortie de condenseur",
     "La pression d'huile du compresseur"
    ],
    "bonne": 1,
    "explication": "Le bulbe mesure la température du gaz en sortie d'évaporateur : le détendeur ouvre ou ferme pour maintenir la surchauffe à la valeur réglée. C'est sa seule grandeur de régulation.",
    "remediation_vers": "g9"
   },
   "criteres": [
    {
     "code": "9.01",
     "libelle": "Expliquer le principe du détendeur et du tube capillaire",
     "etat": "a_evaluer"
    },
    {
     "code": "9.02",
     "libelle": "Installer les vannes dans la bonne position",
     "etat": "a_evaluer"
    },
    {
     "code": "9.03",
     "libelle": "Régler un détendeur mécanique ou électronique",
     "etat": "a_evaluer"
    },
    {
     "code": "9.08",
     "libelle": "Vérifier un filtre déshydrateur",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g10",
     "libelle": "Suite ▸ Tuyauterie et brasage"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Faire manipuler un détendeur mécanique démonté, vis de réglage visible, AVANT d'aborder l'électronique : le geste ancre la notion, le paramétrage logiciel l'abstrait. Faire chercher la valeur de consigne sur la notice constructeur plutôt que de la donner — cohérent avec la règle du zéro invention. Ce chapitre est un carrefour : le relier à G4 (étanchéité), G8 (surchauffe) et G11 (efficacité)."
  },
  {
   "id": "g10",
   "type": "cours",
   "titre": "Tuyauterie et brasage sous azote",
   "dc": "G10 · codes 10.01 · 10.02",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/balayage-azote.svg\" alt=\"Brasage sous balayage d azote : l azote traverse le tube pendant la chauffe et ressort librement.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Braser un circuit frigorifique, ce n'est pas braser une tuyauterie d'eau. À la flamme, l'intérieur du cuivre s'oxyde et forme une <b>calamine</b> noire qui se détache plus tard, circule, et bouche le déshydrateur ou abîme le compresseur — des mois après, loin de la cause.</p><p>D'où le <b>balayage à l'azote</b> pendant toute la chauffe : un débit léger et continu chasse l'oxygène du tube. Pour le cuivre sur cuivre, l'alliage d'apport est généralement du type <b>cuivre-phosphore</b>.</p><p>On ne brase <b>jamais</b> un circuit contenant du fluide : récupération, puis inertage à l'azote. <b>EPI systématiques</b> au poste : lunettes, gants. Les tubes se cintrent <b>à froid, à la cintreuse</b>, se coupent au coupe-tube et s'<b>ébavurent</b> — une bavure part avec le fluide et finit dans le compresseur.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Deux opérations à l'azote, à ne pas confondre",
     "html": "<b>Balayage</b> : pendant le brasage, débit léger, pour éviter l'oxydation.<br><b>Épreuve</b> : après le brasage, sous pression, pour vérifier l'étanchéité.<br>Même gaz, deux gestes, deux moments."
    },
    {
     "type": "piege",
     "t": "Le support compte autant que le joint",
     "html": "Un support mal posé, trop serré, ou un point dur sur le tube transmet les vibrations du compresseur au joint brasé. Le joint peut être parfait au départ et rompre par fatigue des mois plus tard."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Pourquoi balaie-t-on à l'azote pendant un brasage sur circuit frigorifique ?",
    "choix": [
     "Pour refroidir le tube plus vite",
     "Pour éviter l'oxydation interne du cuivre (calamine)",
     "Pour vérifier l'étanchéité du joint",
     "Pour sécher le circuit avant la charge"
    ],
    "bonne": 1,
    "explication": "Sans azote, la chauffe oxyde l'intérieur du tube. La calamine formée se détache ensuite, circule dans le circuit, bouche le déshydrateur et endommage le compresseur.",
    "remediation_vers": "g10"
   },
   "criteres": [
    {
     "code": "10.01",
     "libelle": "Réaliser des joints étanches (soudage, brasage fort ou tendre)",
     "etat": "a_evaluer"
    },
    {
     "code": "10.02",
     "libelle": "Fabriquer et vérifier les supports de tuyauteries",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g11",
     "libelle": "Suite ▸ Substitution et efficacité"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Faire monter le balayage azote — bouteille, détendeur, tuyau, position de sortie — AVANT toute mise en flamme. Le geste doit être automatique avant d'allumer le chalumeau. Pédagogie de la découverte : faire observer un joint mal brasé (calamine, porosité) et laisser les stagiaires identifier les défauts avant de donner la méthode correcte."
  },
  {
   "id": "g11",
   "type": "cours",
   "titre": "Substitution et efficacité énergétique",
   "dc": "G11 · codes 11.01 → 11.05",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/classes-securite.svg\" alt=\"Matrice des classes NF EN 378 : CO2 en A1, R-32 et R-1234yf en A2L, R-290 en A3, NH3 en B2L.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Remplacer un fluide à fort PRP se fait dans deux directions : les <b>fluides naturels</b> (CO₂, ammoniac, hydrocarbures) et les fluides de synthèse à faible PRP (<b>HFO</b>, HFC bas PRP). Il n'existe <b>pas de fluide universel</b> : le choix dépend de l'application, du climat, et de la sécurité du site.</p><p>La <b>classe de sécurité NF EN 378</b> commande tout le reste — EPI, zonage, détection, charge admissible dans le local : <b>A1</b> (CO₂), <b>A2L</b> (R-32, R-1234yf), <b>A3</b> (R-290), <b>B2L</b> (NH₃).</p><p>Côté énergie, le <b>COP</b> est le rapport de la puissance frigorifique produite à la puissance électrique consommée. On l'améliore en <b>rapprochant</b> la température de condensation de celle d'évaporation : condenseur propre, échangeurs bien dimensionnés, réglages justes. Réduire la charge, enfin, améliore à la fois la sécurité et le rendement.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Drop-in ou retrofit ?",
     "html": "<b>Drop-in</b> : on change le fluide sans modifier l'installation.<br><b>Retrofit</b> : on change le fluide <b>et</b> ce qu'il faut adapter — huile, détendeur, joints. Annoncer un drop-in là où il faut un retrofit, c'est préparer une panne."
    },
    {
     "type": "piege",
     "t": "Le piège de l'année",
     "html": "<b>Le R-290 est A3</b>, pas A2L. Tout hydrocarbure est très inflammable. Se tromper de classe, c'est se tromper d'EPI, de matériel électrique et de charge admissible. À l'inverse, le <b>CO₂ est A1</b> : ni toxique ni inflammable — son danger est la <b>pression</b>."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Comment améliore-t-on le COP d'une installation frigorifique ?",
    "choix": [
     "En augmentant la haute pression au maximum",
     "En réduisant l'écart entre température de condensation et température d'évaporation",
     "En augmentant la surchauffe au maximum",
     "En réduisant le débit d'air sur le condenseur"
    ],
    "bonne": 1,
    "explication": "Plus l'écart entre condensation et évaporation est faible, moins le compresseur travaille pour un même effet frigorifique. Condenseur propre, échangeurs corrects, réglages justes : le rendement est d'abord une affaire d'entretien.",
    "remediation_vers": "g11"
   },
   "criteres": [
    {
     "code": "11.01",
     "libelle": "Connaître les technologies de substitution et leur manipulation sans danger",
     "etat": "a_evaluer"
    },
    {
     "code": "11.02",
     "libelle": "Expliquer la conception à charge réduite et l'efficacité",
     "etat": "a_evaluer"
    },
    {
     "code": "11.04",
     "libelle": "Comparer les fluides de substitution selon l'application",
     "etat": "a_evaluer"
    },
    {
     "code": "11.05",
     "libelle": "Situer les différences de conception des systèmes aux hydrocarbures",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g12",
     "libelle": "Suite ▸ Hydrocarbures"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Avant de donner le tableau des classes, demander aux stagiaires de classer eux-mêmes CO₂, NH₃, R-290 et R-1234yf par intuition « je m'en méfie / pas de souci », puis confronter à la norme : l'écart entre l'intuition et la classification est le meilleur levier de mémorisation. Comparer en atelier un détecteur adapté aux hydrocarbures et un détecteur HFC classique."
  },
  {
   "id": "g12",
   "type": "cours",
   "titre": "Hydrocarbures — le spécifique A1 et A2",
   "dc": "G12 · codes 12.01 → 12.14",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/classes-securite.svg\" alt=\"Matrice des classes NF EN 378 : CO2 en A1, R-32 et R-1234yf en A2L, R-290 en A3, NH3 en B2L.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Les hydrocarbures — <b>R-290</b> (propane), <b>R-600a</b> (isobutane) — sont classés <b>A3</b> : très inflammables. Ils s'imposent pourtant, parce que leur PRP est très bas et leurs performances excellentes : on les trouve dans les réfrigérateurs domestiques, les monoblocs, les vitrines, et de plus en plus dans les pompes à chaleur.</p><p>Travailler dessus impose une <b>préparation dédiée</b> : analyse de risques avant intervention, suppression de toute source d'ignition, <b>ventilation active</b>, outillage et matériel électrique adaptés, détecteur de gaz. La charge admissible dépend du <b>volume du local</b> et de la classe de sécurité : elle se détermine selon la <b>NF EN 378</b> et la plaque signalétique — <b>jamais estimée</b>.</p><p>Sur le circuit : récupération, puis <b>inertage à l'azote</b> avant toute flamme. Épreuve de pression à l'azote, essai sous vide, charge de la quantité exacte, contrôle direct, rapport.</p>",
   "blocs": [
    {
     "type": "piege",
     "t": "Deux confusions qui coûtent cher",
     "html": "<b>1.</b> Croire que le R-290 est A2L comme le R-32. Il est <b>A3</b> — la propagation de flamme n'a rien à voir.<br><b>2.</b> Forcer un <b>raccord de bouteille</b> hydrocarbure sur un circuit HFC (ou l'inverse) : les raccords sont spécifiques précisément pour empêcher la charge croisée."
    },
    {
     "type": "cle",
     "t": "Avant toute flamme",
     "html": "Récupérer → inerter à l'<b>azote</b> → ventiler → supprimer les sources d'ignition → détecteur en place. Jamais d'oxygène, jamais d'air comprimé, jamais de flamme sur un circuit non inerté."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Le R-290 (propane) appartient à quelle classe de sécurité NF EN 378 ?",
    "choix": [
     "A1",
     "A2L",
     "A2",
     "A3"
    ],
    "bonne": 3,
    "explication": "Le R-290 est A3 : très inflammable. C'est le piège le plus fréquent du référentiel — le R-32, lui, est A2L (faiblement inflammable). La classe commande les EPI, le matériel et la charge admissible.",
    "remediation_vers": "g12"
   },
   "criteres": [
    {
     "code": "12.02",
     "libelle": "Appliquer les règles de sécurité outils, EPI et détection gaz",
     "etat": "a_evaluer"
    },
    {
     "code": "12.03",
     "libelle": "Déterminer la charge admissible",
     "etat": "a_evaluer"
    },
    {
     "code": "12.04",
     "libelle": "Réaliser l'analyse de risques avant intervention",
     "etat": "a_evaluer"
    },
    {
     "code": "12.06",
     "libelle": "Récupérer et inerter à l'azote",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "g13",
     "libelle": "Suite ▸ CO₂ et NH₃ — information"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Module le plus important d'A1 et d'A2 — c'est la nouveauté du référentiel, et le parc A2 y est largement passé. Faire manipuler le raccord spécifique hydrocarbure et le comparer physiquement au raccord HFC : la confusion se prévient par le geste, pas par le discours. Faire chercher la charge maximale sur une VRAIE plaque signalétique avant d'énoncer la règle. Répéter « jamais de flamme, jamais d'oxygène » à chaque manipulation, jusqu'au réflexe."
  },
  {
   "id": "g13",
   "type": "cours",
   "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir",
   "dc": "G13 · G14 · information et sensibilisation",
   "minuteur_s": 300,
   "corps": "<p>Ce module <b>informe</b>, il ne qualifie pas. Une attestation A1 ou A2 ne donne <b>aucun droit d'intervention</b> sur une installation au CO₂ (catégorie B) ou à l'ammoniac (catégorie C). Ce qu'on attend ici : <b>reconnaître</b> et <b>ne pas toucher</b>.</p><p><b>CO₂ (R-744)</b> — classé <b>A1</b> : ni toxique ni inflammable, <b>PRP = 1</b>. Son danger est ailleurs : la <b>pression</b>, très élevée, et le risque de <b>neige carbonique</b> à la détente (brûlure par le froid, obstruction). En transcritique, le condenseur laisse la place à un <b>refroidisseur de gaz</b>. Les cylindres, à double vanne, ne se raccordent pas au matériel courant.</p><p><b>Ammoniac (R-717)</b> — classé <b>B2L</b> : <b>toxique</b> et faiblement inflammable. Fluide du froid industriel (agroalimentaire, entrepôts), jamais du résidentiel. Son odeur piquante alerte bien avant le seuil dangereux. En cas de fuite : <b>alerter, évacuer, ne jamais intervenir seul</b>.</p>",
   "blocs": [
    {
     "type": "piege",
     "t": "« A1 » ne veut pas dire « sans danger »",
     "html": "Le CO₂ est A1 du point de vue toxicité et inflammabilité — cela ne dit rien de la pression, qui est son vrai risque. Et le <b>B</b> de B2L signifie <b>toxique</b> : ne pas relâcher la vigilance sur l'ammoniac sous prétexte que son inflammabilité est faible."
    },
    {
     "type": "cle",
     "t": "La règle des catégories",
     "html": "Les catégories ne se remplacent pas les unes les autres. « Je suis A1, donc je peux donner un coup de main sur une fuite d'ammoniac » est <b>faux</b> : il faut la catégorie C, sans exception."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "L'ammoniac (R-717) est classé dans quelle classe de sécurité ?",
    "choix": [
     "A1 — non toxique, non inflammable",
     "A2L — faiblement inflammable",
     "B2L — toxique et faiblement inflammable",
     "B3 — toxique et très inflammable"
    ],
    "bonne": 2,
    "explication": "B2L : la lettre B signale la toxicité, le 2L une inflammabilité faible à propagation lente. Le cumul des deux dangers explique que l'ammoniac relève d'une catégorie d'attestation dédiée.",
    "remediation_vers": "g13"
   },
   "criteres": [
    {
     "code": "13.01",
     "libelle": "Reconnaître une installation CO₂ et ses risques (pression)",
     "etat": "a_evaluer"
    },
    {
     "code": "13.04",
     "libelle": "Identifier les cylindres et matériels dédiés, et ne pas intervenir",
     "etat": "a_evaluer"
    },
    {
     "code": "14.01",
     "libelle": "Reconnaître une installation NH₃ et la conduite à tenir",
     "etat": "a_evaluer"
    }
   ],
   "liens": [
    {
     "vers": "cfin",
     "libelle": "Suite ▸ Bilan"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Module volontairement court et NON évaluant : l'objectif est la reconnaissance du danger, pas la compétence d'intervention. Faire circuler un masque à gaz réel (sans manipulation dangereuse) pour que la différence avec les EPI habituels se voie. Rappeler que l'odeur d'ammoniac est perceptible bien avant le seuil dangereux : message rassurant qui évite la panique tout en imposant l'alerte. Faire deviner pourquoi le NH₃ exige une catégorie séparée alors que le R-290, également dangereux, reste dans le champ A1/A2."
  },
  {
   "id": "ex-e",
   "type": "examen",
   "titre": "Examen blanc — catégorie E",
   "dc": "Entraînement · périmètre E",
   "examen": {
    "dc": [
     "G1",
     "G2",
     "G4",
     "G11"
    ],
    "n": 10,
    "seuil": 70
   },
   "notes_pilote": "Entraînement, pas l'épreuve. Le tirage est aléatoire dans le périmètre E ; l'épreuve officielle obéit à des règles de composition bien plus strictes (voir le README du dépôt)."
  },
  {
   "id": "ex-d",
   "type": "examen",
   "titre": "Examen blanc — catégorie D",
   "dc": "Entraînement · périmètre D",
   "examen": {
    "dc": [
     "G1",
     "G2",
     "G5",
     "G11"
    ],
    "n": 10,
    "seuil": 70
   },
   "notes_pilote": "Périmètre D : récupération. Le groupe 3 n'est pas tiré ici — seul le code 3.03 (pompe à vide) est dans le champ D, et il se travaille en atelier plutôt qu'au QCM."
  },
  {
   "id": "ex-a2",
   "type": "examen",
   "titre": "Examen blanc — catégorie A2",
   "dc": "Entraînement · périmètre A2",
   "examen": {
    "dc": [
     "G1",
     "G2",
     "G3",
     "G4",
     "G5",
     "G6",
     "G7",
     "G8",
     "G9",
     "G10",
     "G11",
     "G12"
    ],
    "n": 15,
    "seuil": 70
   },
   "notes_pilote": "Même périmètre qu'A1. À l'épreuve officielle, un seul groupe composant est tiré au sort — ici les quatre peuvent tomber, ce qui est plus exigeant et convient à l'entraînement."
  },
  {
   "id": "ex-a1",
   "type": "examen",
   "titre": "Examen blanc — catégorie A1",
   "dc": "Entraînement · périmètre A1",
   "examen": {
    "dc": [
     "G1",
     "G2",
     "G3",
     "G4",
     "G5",
     "G6",
     "G7",
     "G8",
     "G9",
     "G10",
     "G11",
     "G12"
    ],
    "n": 20,
    "seuil": 70
   },
   "notes_pilote": "Vingt questions sur tout le périmètre. Utile en fin de parcours pour repérer les groupes à retravailler — le score par groupe est plus intéressant que le score global."
  },
  {
   "id": "cfin",
   "type": "fin",
   "titre": "À propos de ce démonstrateur",
   "corps": "<p class=\"lead\">Ce pack fait tourner le contenu de la formation « habilitation fluides frigorigènes » dans le moteur <b>inerWeb Pilote</b> : un même contenu, plusieurs modes de lecture.</p><p><b>Ce qu'il montre.</b> Les quatre parcours réglementaires (A1, A2, D, E), les fiches de cours resserrées pour être lues en séance, la remédiation qui renvoie vers la fiche quand la réponse est fausse, les examens blancs composés à la volée, et — en mode <b>Pilotage formateur</b> — la couche de notes destinée à celui qui anime.</p><p><b>Ce qu'il ne fait pas.</b> Le mode <i>Évaluation</i> est volontairement désactivé : l'épreuve officielle obéit à des règles de composition (groupes obligatoires, groupe composant tiré au sort, questions imposées, pondération selon la conséquence environnementale, seuil assorti d'un plancher) que ce moteur ne sait pas encore appliquer. Les questions viennent de <b>Mission F-GAZ</b>, application publique d'entraînement : <b>aucun sujet d'examen officiel n'est publié ici</b>.</p><p>Le contenu est un premier jet : il attend vos remarques.</p>",
   "liens": [
    {
     "vers": "c00",
     "libelle": "↺ Revenir au sommaire",
     "sec": true
    }
   ],
   "notes_pilote": "Page à montrer aux collègues en fin de démonstration : elle dit honnêtement ce que l'outil fait et ce qu'il ne fait pas. Le point à ne pas laisser passer : entraînement ≠ épreuve officielle. Étendre le moteur aux règles de composition de l'arrêté est un chantier à part."
  }
 ]
};

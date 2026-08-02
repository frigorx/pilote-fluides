/* BUILD ÉLÈVE — couche pilote retirée. Généré par build/build.mjs. NE PAS éditer à la main. */
window.PILOTE_PACK = {
 "pack": {
  "id": "fluides-habilitation",
  "titre": "Habilitation fluides frigorigènes — A1 · A2 · D · E (démonstrateur)",
  "version": "0.1",
  "code_empreinte": 3069038059,
  "type": "habilitation",
  "charte": "inerweb-edu",
  "categories": [
   "A1",
   "A2",
   "D",
   "E"
  ],
  "modes_actifs": [
   "auto",
   "test",
   "pilotage"
  ],
  "vue_stagiaire": false,
  "carte_initiale": "c00",
  "base_img": "packs/fluides/res/",
  "svg_animes": [
   "chaleur-sensible-latente.svg",
   "charge-limite-local.svg",
   "circuit-complet-manifold.svg",
   "co2-nh3-compare.svg",
   "co2-point-bas.svg",
   "co2-protection.svg",
   "detendeur-regulation.svg",
   "diagramme-logph.svg",
   "givre-degivrage.svg",
   "intro-securite.svg",
   "lie-domaine.svg",
   "manifold-lecture.svg",
   "nomenclature.svg",
   "ordre-vannes.svg",
   "pesee-charge.svg",
   "points-de-fuite.svg",
   "pression-absolue-relative.svg",
   "s1-double-accident.svg",
   "secu-bouteille.svg",
   "secu-consignation.svg",
   "secu-decomposition-ari.svg",
   "secu-flamme.svg",
   "secu-projection.svg",
   "surchauffe-utile-totale.svg",
   "tirage-au-vide.svg"
  ]
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
   "id": "r-enthalpique",
   "titre": "📈 Diagramme Enthalpique+ v3.2 — tracer le cycle complet",
   "type": "lien",
   "global": true,
   "url": "https://frigorx.github.io/diagramme-enthalpique/"
  },
  {
   "id": "r-symboles",
   "titre": "✏ Bibliothèque de symboles frigorifiques + jeux",
   "type": "lien",
   "global": true,
   "url": "https://frigorx.github.io/inerweb-frigolo/outils/symboles-frigorifiques.html"
  },
  {
   "id": "r-kp1",
   "titre": "🔧 Simulateur — pressostat BP (KP1) : réglage et diagnostic",
   "type": "lien",
   "url": "https://frigorx.github.io/inerweb-frigolo/outils/kp1-pressostat-bp.html"
  },
  {
   "id": "r-kp5",
   "titre": "🔧 Simulateur — pressostat HP de sécurité (KP5)",
   "type": "lien",
   "url": "https://frigorx.github.io/inerweb-frigolo/outils/kp5-pressostat-hp.html"
  },
  {
   "id": "r-module-comp",
   "titre": "🧩 Module compresseur — leçon interactive complète",
   "type": "lien",
   "url": "https://frigorx.github.io/inerweb-frigolo/outils/module-compresseur.html"
  },
  {
   "id": "r-scroll",
   "titre": "🌀 Le compresseur scroll — leçon interactive",
   "type": "lien",
   "url": "https://frigorx.github.io/inerweb-frigolo/outils/lecon-scroll.html"
  },
  {
   "id": "r-echangeurs",
   "titre": "♨ Échangeurs — évaporateur et condenseur en interactif",
   "type": "lien",
   "url": "https://frigorx.github.io/inerweb-frigolo/outils/echangeurs.html"
  },
  {
   "id": "r-tp-mano",
   "titre": "🧪 TP formatif — pose et dépose des manomètres (2 h, 7 activités)",
   "type": "lien",
   "url": "https://frigorx.github.io/inerweb-frigolo/outils/tp-manometres-formatif.html"
  },
  {
   "id": "r-tp-peser",
   "titre": "⚖ TP — inventaire et pesée des bouteilles frigorigènes",
   "type": "lien",
   "url": "https://frigorx.github.io/inerweb-tp-peser-bouteilles/"
  },
  {
   "id": "r-cerfa",
   "titre": "📋 inerWeb Fluide — s'entraîner : fiche d'intervention CERFA et BSD",
   "type": "lien",
   "url": "https://frigorx.github.io/-inerweb-fluid-cerfa-fi-bsd-4/"
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
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quels sont les 4 organes principaux d'un circuit frigorifique (la croix du frigoriste) ?",
   "choix": [
    "Compresseur, évaporateur, ventilateur, thermostat",
    "Compresseur, condenseur, détendeur, évaporateur",
    "Pompe, radiateur, vase d'expansion, robinet",
    "Moteur, turbine, échangeur, régulateur"
   ],
   "bonne": 1,
   "explication": "Les 4 organes sont : le COMPRESSEUR (élève la pression), le CONDENSEUR (refroidit et liquéfie), le DÉTENDEUR (abaisse la pression), et l'ÉVAPORATEUR (absorbe la chaleur).",
   "aide": "Les 4 organes essentiels forment la base de tout circuit frigorifique. C'est le minimum vital pour produire du froid.",
   "remed": {
    "texte": "Les 4 organes sont : le COMPRESSEUR (élève la pression), le CONDENSEUR (refroidit et liquéfie), le DÉTENDEUR (abaisse la pression), et l'ÉVAPORATEUR (absorbe la chaleur). Ces 4 éléments forment la 'croix du frigoriste'."
   },
   "remediation_vers": "g1a",
   "code": "1.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-160",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pourquoi ne doit-on JAMAIS laisser du liquide arriver au compresseur ?",
   "choix": [
    "Le liquide est trop froid",
    "Le liquide est incompressible et peut détruire le compresseur",
    "Le liquide est trop visqueux",
    "Le liquide consomme trop d'énergie"
   ],
   "bonne": 1,
   "explication": "Le liquide est INCOMPRESSIBLE. Si du liquide arrive au compresseur, il peut provoquer un coup de liquide qui endommage ou détruit le compresseur (clapet cassé, bielle tordue, etc.).",
   "aide": "Un compresseur est conçu pour comprimer du GAZ, pas du liquide.",
   "remed": {
    "texte": "Le liquide est INCOMPRESSIBLE. Si du liquide arrive au compresseur, il peut provoquer un coup de liquide qui endommage ou détruit le compresseur (clapet cassé, bielle tordue, etc.). Le compresseur doit TOUJOURS aspirer du gaz."
   },
   "remediation_vers": "g1a",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-62",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La pression absolue est égale à :",
   "choix": [
    "Pression relative + pression atmosphérique",
    "Pression relative - pression atmosphérique",
    "Pression atmosphérique uniquement",
    "Pression relative uniquement"
   ],
   "bonne": 0,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g1a",
   "code": "1.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g1-v6_042",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans la zone diphasique (sous la cloche), le fluide est :",
   "choix": [
    "Entièrement liquide",
    "Entièrement gazeux",
    "Un mélange liquide + vapeur",
    "Supercritique"
   ],
   "bonne": 2,
   "explication": "Un mélange liquide + vapeur — Sous la courbe de saturation, le fluide est en changement de phase : liquide + vapeur coexistent.",
   "aide": "La 'cloche' délimite la zone où les deux phases coexistent.",
   "remed": {
    "texte": "Sous la courbe de saturation, le fluide est en changement de phase : liquide + vapeur coexistent."
   },
   "remediation_vers": "g1a",
   "code": "1.03",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g1-v6_041",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Sur le diagramme de Mollier (log P/h), l'axe horizontal représente :",
   "choix": [
    "La température",
    "La pression",
    "L'enthalpie",
    "Le volume"
   ],
   "bonne": 2,
   "explication": "L'enthalpie — Le diagramme de Mollier a l'enthalpie (h, en kJ/kg) en abscisse et la pression (log P) en ordonnée.",
   "aide": "Mollier = P en ordonnée, h en abscisse. D'où le nom 'diagramme enthalpique'.",
   "remed": {
    "texte": "Le diagramme de Mollier a l'enthalpie (h, en kJ/kg) en abscisse et la pression (log P) en ordonnée."
   },
   "remediation_vers": "g1a",
   "code": "1.03",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g1-v6_048",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La valeur typique de surchauffe à l'aspiration est de :",
   "choix": [
    "0 à 2 K",
    "5 à 10 K",
    "15 à 20 K",
    "30 K"
   ],
   "bonne": 1,
   "explication": "5 à 8 K — Une surchauffe de 5 à 8 K garantit que seul du gaz sec entre dans le compresseur, sans trop réduire la puissance frigorifique.",
   "aide": "Ni trop basse (coups de liquide) ni trop haute (perte de rendement).",
   "remed": {
    "texte": "Une surchauffe de 5 à 8 K garantit que seul du gaz sec entre dans le compresseur, sans trop réduire la puissance frigorifique."
   },
   "remediation_vers": "g1a",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-v6_145",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le sous-refroidissement typique en sortie de condenseur est de :",
   "choix": [
    "0 à 1 K",
    "4 à 8 K",
    "15 à 20 K",
    "25 à 30 K"
   ],
   "bonne": 1,
   "explication": "4 à 7 K — Un sous-refroidissement de 4 à 7 K assure que le liquide n'arrive pas au détendeur avec des bulles de gaz.",
   "aide": "Trop peu = risque de flash. Trop = perte de puissance.",
   "remed": {
    "texte": "Un sous-refroidissement de 4 à 7 K assure que le liquide n'arrive pas au détendeur avec des bulles de gaz."
   },
   "remediation_vers": "g1a",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-153",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans quel organe le fluide frigorigène absorbe-t-il la chaleur ?",
   "choix": [
    "Le compresseur",
    "Le condenseur",
    "L'évaporateur",
    "Le détendeur"
   ],
   "bonne": 2,
   "explication": "L'ÉVAPORATEUR est l'organe où le fluide frigorigène s'évapore en absorbant la chaleur du milieu à refroidir (chambre froide, air ambiant, etc.). C'est là que le froid est produit.",
   "aide": "C'est l'organe qui produit le froid en absorbant la chaleur du milieu à refroidir.",
   "remed": {
    "texte": "L'ÉVAPORATEUR est l'organe où le fluide frigorigène s'évapore en absorbant la chaleur du milieu à refroidir (chambre froide, air ambiant, etc.). C'est là que le froid est produit."
   },
   "remediation_vers": "g1a",
   "code": "1.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-154",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel organe permet au fluide frigorigène de passer de l'état liquide haute pression à l'état liquide basse pression ?",
   "choix": [
    "Le compresseur",
    "Le condenseur",
    "Le détendeur",
    "L'évaporateur"
   ],
   "bonne": 2,
   "explication": "Le DÉTENDEUR (ou vanne de détente) abaisse la pression du liquide haute pression pour le transformer en mélange liquide-vapeur basse pression avant l'évaporateur.",
   "aide": "C'est un organe de régulation qui abaisse brutalement la pression du fluide.",
   "remed": {
    "texte": "Le DÉTENDEUR (ou vanne de détente) abaisse la pression du liquide haute pression pour le transformer en mélange liquide-vapeur basse pression avant l'évaporateur. Cette détente abaisse aussi la température."
   },
   "remediation_vers": "g1a",
   "code": "1.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-157",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans quel état se trouve principalement le fluide frigorigène dans la ligne liquide ?",
   "choix": [
    "À l'état gazeux",
    "À l'état liquide",
    "À l'état solide",
    "En mélange biphasique"
   ],
   "bonne": 1,
   "explication": "Dans la ligne liquide (entre condenseur et détendeur), le fluide est à l'état LIQUIDE sous haute pression. C'est pour cela qu'on l'appelle 'ligne liquide'.",
   "aide": "La ligne liquide relie le condenseur au détendeur.",
   "remed": {
    "texte": "Dans la ligne liquide (entre condenseur et détendeur), le fluide est à l'état LIQUIDE sous haute pression. C'est pour cela qu'on l'appelle 'ligne liquide'."
   },
   "remediation_vers": "g1a",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-158",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans quel état se trouve principalement le fluide frigorigène dans la ligne d'aspiration ?",
   "choix": [
    "À l'état liquide",
    "À l'état gazeux (vapeur)",
    "À l'état solide",
    "En mélange liquide-vapeur"
   ],
   "bonne": 1,
   "explication": "Dans la ligne d'aspiration (entre évaporateur et compresseur), le fluide est à l'état GAZEUX (vapeur) basse pression. Le compresseur aspire du gaz, jamais du liquide !",
   "aide": "La ligne d'aspiration relie l'évaporateur au compresseur.",
   "remed": {
    "texte": "Dans la ligne d'aspiration (entre évaporateur et compresseur), le fluide est à l'état GAZEUX (vapeur) basse pression. Le compresseur aspire du gaz, jamais du liquide !"
   },
   "remediation_vers": "g1a",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-v6_141",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "L'énergie nécessaire au fonctionnement du cycle frigorifique est apportée par :",
   "choix": [
    "L'évaporateur",
    "Le condenseur",
    "Le compresseur",
    "Le détendeur"
   ],
   "bonne": 2,
   "explication": "Le compresseur — Le compresseur est le seul organe qui reçoit de l'énergie (électrique) pour faire tourner le cycle.",
   "aide": "C'est le 'moteur' du cycle — il consomme de l'électricité.",
   "remed": {
    "texte": "Le compresseur est le seul organe qui reçoit de l'énergie (électrique) pour faire tourner le cycle."
   },
   "remediation_vers": "g1a",
   "code": "1.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-v6_142",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La puissance frigorifique est produite au niveau de :",
   "choix": [
    "Le compresseur",
    "Le condenseur",
    "Le détendeur",
    "L'évaporateur"
   ],
   "bonne": 3,
   "explication": "L'évaporateur — C'est à l'évaporateur que le fluide absorbe la chaleur du milieu à refroidir = production du froid.",
   "aide": "Évaporateur = production du froid (absorption de chaleur).",
   "remed": {
    "texte": "C'est à l'évaporateur que le fluide absorbe la chaleur du milieu à refroidir = production du froid."
   },
   "remediation_vers": "g1a",
   "code": "1.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-v6_146",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans le cycle frigorifique, la chaleur est rejetée au niveau de :",
   "choix": [
    "L'évaporateur",
    "Le compresseur",
    "Le condenseur",
    "Le détendeur"
   ],
   "bonne": 2,
   "explication": "Le condenseur — Le condenseur rejette la chaleur absorbée par l'évaporateur + la chaleur de compression vers l'extérieur.",
   "aide": "Condensation = rejet de chaleur (transition gaz → liquide).",
   "remed": {
    "texte": "Le condenseur rejette la chaleur absorbée par l'évaporateur + la chaleur de compression vers l'extérieur."
   },
   "remediation_vers": "g1a",
   "code": "1.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-v6_040",
   "dc": "G1",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La transformation dans le détendeur est dite :",
   "choix": [
    "Isotherme",
    "Isenthalpique",
    "Isentropique",
    "Isobare"
   ],
   "bonne": 1,
   "explication": "Isenthalpique — La détente se fait à enthalpie constante (pas d'échange de chaleur, pas de travail). Sur le diagramme : ligne verticale.",
   "aide": "'Isenthalpique' = même enthalpie. Le fluide passe de HP à BP sans échange thermique.",
   "remed": {
    "texte": "La détente se fait à enthalpie constante (pas d'échange de chaleur, pas de travail). Sur le diagramme : ligne verticale."
   },
   "remediation_vers": "g1a",
   "code": "1.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-v6_045",
   "dc": "G1",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La compression dans le compresseur est théoriquement :",
   "choix": [
    "Isenthalpique",
    "Isentropique",
    "Isotherme",
    "Isobare"
   ],
   "bonne": 1,
   "explication": "Isentropique — En théorie, la compression est isentropique (entropie constante = adiabatique et réversible). En pratique, elle est polytropique.",
   "aide": "C'est la transformation 'idéale' du compresseur — sans échange de chaleur.",
   "remed": {
    "texte": "En théorie, la compression est isentropique (entropie constante = adiabatique et réversible). En pratique, elle est polytropique."
   },
   "remediation_vers": "g1a",
   "code": "1.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-v6_046",
   "dc": "G1",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Sur le diagramme de Mollier, la condensation et l'évaporation sont des transformations :",
   "choix": [
    "Isenthalpiques",
    "Isentropiques",
    "Isobares",
    "Isothermes"
   ],
   "bonne": 2,
   "explication": "Isobares — La condensation et l'évaporation se font à pression constante (lignes horizontales sur le diagramme).",
   "aide": "Les échangeurs (condenseur et évaporateur) travaillent à pression quasi-constante.",
   "remed": {
    "texte": "La condensation et l'évaporation se font à pression constante (lignes horizontales sur le diagramme)."
   },
   "remediation_vers": "g1a",
   "code": "1.03",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g1-v6_143",
   "dc": "G1",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La cloche de saturation sur le diagramme de Mollier sépare :",
   "choix": [
    "Le vide et la pression",
    "Les zones liquide, diphasique et vapeur",
    "Les hautes et basses températures",
    "Les fluides naturels et synthétiques"
   ],
   "bonne": 1,
   "explication": "Liquide, diphasique et vapeur — À gauche de la cloche = liquide sous-refroidi. Sous la cloche = mélange liq+vap. À droite = vapeur surchauffée.",
   "aide": "La cloche délimite les trois états possibles du fluide.",
   "remed": {
    "texte": "À gauche de la cloche = liquide sous-refroidi. Sous la cloche = mélange liq+vap. À droite = vapeur surchauffée."
   },
   "remediation_vers": "g1a",
   "code": "1.03",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g1-31",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Que signifie HFC ?",
   "choix": [
    "Hydro-Fluoro-Carbone",
    "Haute-Fluoro-Compression",
    "Hydro-Fluide-Climatique",
    "Hydro-Frigorigène-Commercial"
   ],
   "bonne": 0,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g1c",
   "hors_ref": "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B"
  },
  {
   "id": "q-g1-33",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans la nomenclature R134a, que signifie le 'a' ?",
   "choix": [
    "Version améliorée",
    "Isomère",
    "Azéotrope",
    "Azeotropic"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g1c",
   "hors_ref": "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B"
  },
  {
   "id": "q-g1-34",
   "dc": "G1",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Le R410A est un mélange :",
   "choix": [
    "Azéotrope",
    "Quasi-azéotrope",
    "Zéotrope",
    "Corps pur"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g1c",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g1-36",
   "dc": "G1",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Quelle est la composition du R410A ?",
   "choix": [
    "50% R32 / 50% R125",
    "23% R32 / 25% R125 / 52% R134a",
    "75% R134a / 25% R32",
    "100% R32"
   ],
   "bonne": 0,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g1c",
   "hors_ref": "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B"
  },
  {
   "id": "q-g1-41",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le R22 appartient à quelle famille ?",
   "choix": [
    "CFC",
    "HCFC",
    "HFC",
    "HFO"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g1c",
   "hors_ref": "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B"
  },
  {
   "id": "q-g1-45",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le R717 est :",
   "choix": [
    "Du propane",
    "De l'ammoniac",
    "Du CO2",
    "De l'eau"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g1c",
   "code": "1.07",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g1-51",
   "dc": "G1",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Le R407C est composé de :",
   "choix": [
    "R32 / R125 / R134a",
    "R32 / R125",
    "R125 / R143a / R134a",
    "100% R32"
   ],
   "bonne": 0,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g1c",
   "hors_ref": "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B"
  },
  {
   "id": "q-g1-v6_031",
   "dc": "G1",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Dans la nomenclature Rxyz, le chiffre des dizaines (y) correspond à :",
   "choix": [
    "Nombre d'atomes de carbone − 1",
    "Nombre d'atomes d'hydrogène + 1",
    "Nombre d'atomes de fluor",
    "Nombre d'atomes de chlore"
   ],
   "bonne": 1,
   "explication": "H + 1 (atomes d'hydrogène + 1) — Règle de nomenclature : centaines = C−1, dizaines = H+1, unités = F. Ex: R134a → C=1+1=2, H=3−1=2, F=4.",
   "aide": "La formule mnémotechnique est : C−1, H+1, F pour les trois chiffres.",
   "remed": {
    "texte": "Règle de nomenclature : centaines = C−1, dizaines = H+1, unités = F. Ex: R134a → C=1+1=2, H=3−1=2, F=4."
   },
   "remediation_vers": "g1c",
   "hors_ref": "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B"
  },
  {
   "id": "q-g1-v6_132",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le R410A est un mélange de :",
   "choix": [
    "R134a + R125",
    "R32 + R125",
    "R32 + R134a",
    "R290 + R600a"
   ],
   "bonne": 1,
   "explication": "R32 + R125 — Le R410A est un mélange quasi-azéotrope de R32 (50%) + R125 (50%). Ses hautes pressions le distinguent.",
   "aide": "C'est le fluide le plus courant en climatisation résidentielle.",
   "remed": {
    "texte": "Le R410A est un mélange quasi-azéotrope de R32 (50%) + R125 (50%). Ses hautes pressions le distinguent."
   },
   "remediation_vers": "g1c",
   "hors_ref": "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B"
  },
  {
   "id": "q-g1-v6_137",
   "dc": "G1",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le R12 est un :",
   "choix": [
    "HFC",
    "HCFC",
    "CFC",
    "HFO"
   ],
   "bonne": 2,
   "explication": "CFC — Le R12 (dichlorodifluorométhane) est un CFC interdit depuis 1995. Il détruit la couche d'ozone (ODP élevé).",
   "aide": "Le R12 est le CFC historique des anciens frigos.",
   "remed": {
    "texte": "Le R12 (dichlorodifluorométhane) est un CFC interdit depuis 1995. Il détruit la couche d'ozone (ODP élevé)."
   },
   "remediation_vers": "g1c",
   "hors_ref": "nomenclature des fluides : savoir-outil indispensable, mais non listé comme compétence à l'annexe II.B"
  },
  {
   "id": "q-g2-v6_001",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel gaz est utilisé comme référence (GWP=1) pour mesurer le pouvoir de réchauffement ?",
   "choix": [
    "L'azote",
    "Le CO₂",
    "Le méthane",
    "L'ozone"
   ],
   "bonne": 1,
   "explication": "Le CO₂ — Le GWP (Global Warming Potential) compare tout gaz au CO₂ sur 100 ans. CO₂ = 1 par définition.",
   "aide": "Le GWP est toujours exprimé par rapport à un gaz de référence très courant.",
   "remed": {
    "texte": "Le GWP (Global Warming Potential) compare tout gaz au CO₂ sur 100 ans. CO₂ = 1 par définition."
   },
   "remediation_vers": "g2",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-5",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le protocole de Montréal (1987) visait principalement :",
   "choix": [
    "Les gaz à effet de serre",
    "La protection de la couche d'ozone",
    "La réduction des émissions de CO2",
    "L'interdiction des HFC"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_003",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "L'amendement de Kigali (2016) ajoute au Protocole de Montréal la réduction progressive de :",
   "choix": [
    "Les CFC",
    "Les HCFC",
    "Les HFC",
    "Les HFO"
   ],
   "bonne": 2,
   "explication": "Les HFC — Kigali (2016) étend le Protocole de Montréal aux HFC pour lutter contre le réchauffement climatique.",
   "aide": "Les CFC et HCFC étaient déjà visés. Quel groupe de fluides à fort GWP restait sans contrainte ?",
   "remed": {
    "texte": "Kigali (2016) étend le Protocole de Montréal aux HFC pour lutter contre le réchauffement climatique."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_004",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Les HFC ont un ODP (potentiel de destruction de l'ozone) de :",
   "choix": [
    "0",
    "0,05",
    "0,5",
    "1"
   ],
   "bonne": 0,
   "explication": "0 — Les HFC ne contiennent pas de chlore, donc ODP = 0. Mais leur GWP est élevé.",
   "aide": "L'ODP est lié à la présence de chlore ou brome dans la molécule.",
   "remed": {
    "texte": "Les HFC ne contiennent pas de chlore, donc ODP = 0. Mais leur GWP est élevé."
   },
   "remediation_vers": "g2a",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_113",
   "dc": "G2",
   "niveau": 2,
   "type": "qcm",
   "enonce": "15 kg de R32 (GWP=675) donnent combien de tCO₂e ?",
   "choix": [
    "4,5",
    "6,75",
    "10,13",
    "101,3"
   ],
   "bonne": 2,
   "explication": "10,13 tCO₂e (arrondi) — Calcul : 15 × 675 / 1000 = 10,125 tCO₂e → contrôle annuel.",
   "aide": "Formule : charge × GWP / 1000.",
   "remed": {
    "texte": "Calcul : 15 × 675 / 1000 = 10,125 tCO₂e → contrôle annuel."
   },
   "remediation_vers": "g2",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_011",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le règlement UE 2024/573 remplace quel règlement ?",
   "choix": [
    "UE 842/2006",
    "UE 517/2014",
    "CE 2037/2000",
    "UE 303/2008"
   ],
   "bonne": 1,
   "explication": "UE 517/2014 — Le nouveau règlement UE 2024/573 (en vigueur mars 2024) remplace le 517/2014 avec des objectifs plus stricts.",
   "aide": "C'est le règlement qui était en vigueur depuis 2015.",
   "remed": {
    "texte": "Le nouveau règlement UE 2024/573 (en vigueur mars 2024) remplace le 517/2014 avec des objectifs plus stricts."
   },
   "remediation_vers": "g2",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_017",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le système de quotas HFC dans l'UE fonctionne sur le principe de :",
   "choix": [
    "Quotas attribués aux pays",
    "Quotas attribués aux importateurs et producteurs",
    "Quotas attribués aux installateurs",
    "Taxe proportionnelle au GWP"
   ],
   "bonne": 1,
   "explication": "Quotas attribués aux importateurs et producteurs",
   "aide": "Le système s'applique en amont de la chaîne, pas aux utilisateurs finaux.",
   "remed": {
    "texte": "Les quotas sont des droits de mise sur le marché en tCO₂e, attribués aux importateurs et fabricants de HFC."
   },
   "remediation_vers": "g2",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_002",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel type de rayonnement la couche d'ozone filtre-t-elle principalement ?",
   "choix": [
    "Les infrarouges",
    "Les UV-B",
    "Les micro-ondes",
    "Les rayons X"
   ],
   "bonne": 1,
   "explication": "Les UV-B — La couche d'ozone (O₃) dans la stratosphère absorbe les UV-B nocifs pour la santé humaine.",
   "aide": "Ce sont des rayonnements solaires dangereux pour la peau et les yeux.",
   "remed": {
    "texte": "La couche d'ozone (O₃) dans la stratosphère absorbe les UV-B nocifs pour la santé humaine."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_005",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel accord international de 2015 vise à limiter le réchauffement à +1,5°C ?",
   "choix": [
    "Protocole de Montréal",
    "Accord de Paris (COP21)",
    "Amendement de Kigali",
    "Protocole de Kyoto"
   ],
   "bonne": 1,
   "explication": "Accord de Paris (COP21) — Signé en 2015 par 196 pays, il fixe l'objectif de +1,5°C maximum vs ère préindustrielle.",
   "aide": "C'est le traité climatique le plus récent et le plus ambitieux.",
   "remed": {
    "texte": "Signé en 2015 par 196 pays, il fixe l'objectif de +1,5°C maximum vs ère préindustrielle."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_008",
   "dc": "G2",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Le Protocole de Kyoto (1997) cible combien de gaz à effet de serre ?",
   "choix": [
    "3",
    "4",
    "6",
    "8"
   ],
   "bonne": 2,
   "explication": "6 — Kyoto vise 6 GES : CO₂, CH₄, N₂O, HFC, PFC, SF₆. Les HFC y sont inclus.",
   "aide": "Comptez les familles principales de gaz à effet de serre réglementées.",
   "remed": {
    "texte": "Kyoto vise 6 GES : CO₂, CH₄, N₂O, HFC, PFC, SF₆. Les HFC y sont inclus."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_010",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le « trou dans la couche d'ozone » est localisé principalement au-dessus de :",
   "choix": [
    "L'équateur",
    "L'Antarctique",
    "L'Arctique",
    "L'Europe"
   ],
   "bonne": 1,
   "explication": "L'Antarctique — Le trou d'ozone se forme chaque printemps austral au-dessus du pôle Sud, là où les conditions de froid stratosphérique favorisent la destruction de l'O₃.",
   "aide": "C'est le pôle le plus froid de la planète qui est le plus touché.",
   "remed": {
    "texte": "Le trou d'ozone se forme chaque printemps austral au-dessus du pôle Sud, là où les conditions de froid stratosphérique favorisent la destruction de l'O₃."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_106",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Les principaux gaz à effet de serre naturels sont :",
   "choix": [
    "CO₂, vapeur d'eau, méthane",
    "Oxygène, azote, hélium",
    "HFC, CFC, HCFC",
    "Ozone, argon, néon"
   ],
   "bonne": 0,
   "explication": "CO₂, vapeur d'eau, méthane — L'effet de serre naturel est principalement dû à la vapeur d'eau, au CO₂ et au méthane. Les HFC sont des GES industriels.",
   "aide": "Pensez aux gaz naturellement présents dans l'atmosphère.",
   "remed": {
    "texte": "L'effet de serre naturel est principalement dû à la vapeur d'eau, au CO₂ et au méthane. Les HFC sont des GES industriels."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_107",
   "dc": "G2",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Sans l'effet de serre naturel, la température moyenne de la Terre serait d'environ :",
   "choix": [
    "+15°C",
    "-18°C",
    "+30°C",
    "0°C"
   ],
   "bonne": 1,
   "explication": "-18°C — Sans effet de serre, la Terre serait à -18°C au lieu de +15°C. L'effet de serre naturel réchauffe de +33°C.",
   "aide": "L'effet de serre naturel est bénéfique — c'est son amplification qui pose problème.",
   "remed": {
    "texte": "Sans effet de serre, la Terre serait à -18°C au lieu de +15°C. L'effet de serre naturel réchauffe de +33°C."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_110",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le Protocole de Montréal a principalement permis :",
   "choix": [
    "D'augmenter la production de CFC",
    "De commencer la réparation de la couche d'ozone",
    "De créer de nouveaux fluides",
    "D'interdire le CO₂"
   ],
   "bonne": 1,
   "explication": "De commencer la réparation de la couche d'ozone",
   "aide": "C'est considéré comme le traité environnemental le plus réussi.",
   "remed": {
    "texte": "Grâce à l'élimination des CFC et HCFC, la couche d'ozone montre des signes de reconstitution progressive."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_111",
   "dc": "G2",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Les HFO ont un faible GWP car :",
   "choix": [
    "Ils ne contiennent pas de carbone",
    "Ils se décomposent rapidement dans l'atmosphère",
    "Ils sont très lourds",
    "Ils ne s'évaporent pas"
   ],
   "bonne": 1,
   "explication": "Décomposition rapide — Les HFO ont une double liaison C=C qui les rend instables chimiquement. Ils se dégradent en quelques jours dans l'atmosphère.",
   "aide": "La durée de vie atmosphérique courte = faible GWP.",
   "remed": {
    "texte": "Les HFO ont une double liaison C=C qui les rend instables chimiquement. Ils se dégradent en quelques jours dans l'atmosphère."
   },
   "remediation_vers": "g2a",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_114",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "L'ODP (Ozone Depletion Potential) est lié à la présence dans la molécule de :",
   "choix": [
    "Fluor",
    "Hydrogène",
    "Chlore ou brome",
    "Carbone"
   ],
   "bonne": 2,
   "explication": "Chlore ou brome — Le chlore (CFC, HCFC) et le brome (halons) détruisent catalytiquement l'ozone stratosphérique.",
   "aide": "Les HFC n'ont ni chlore ni brome, d'où leur ODP de 0.",
   "remed": {
    "texte": "Le chlore (CFC, HCFC) et le brome (halons) détruisent catalytiquement l'ozone stratosphérique."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_115",
   "dc": "G2",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Le concept de « durée de vie atmosphérique » d'un fluide influence directement :",
   "choix": [
    "Sa couleur",
    "Son prix",
    "Son GWP",
    "Sa pression de service"
   ],
   "bonne": 2,
   "explication": "Son GWP — Plus un gaz reste longtemps dans l'atmosphère, plus son impact cumulé sur le réchauffement est important.",
   "aide": "Longue durée de vie = GWP élevé. Courte durée = GWP faible.",
   "remed": {
    "texte": "Plus un gaz reste longtemps dans l'atmosphère, plus son impact cumulé sur le réchauffement est important."
   },
   "remediation_vers": "g2a",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-v6_037",
   "dc": "G2",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Le R22 (HCFC) est interdit dans l'UE depuis :",
   "choix": [
    "2000",
    "2010",
    "2015",
    "2020"
   ],
   "bonne": 2,
   "explication": "2015 — Le R22 a été totalement interdit dans l'UE depuis le 1er janvier 2015, même en recyclé/régénéré.",
   "aide": "C'est un HCFC — la dernière étape de leur élimination dans l'UE.",
   "remed": {
    "texte": "Le R22 a été totalement interdit dans l'UE depuis le 1er janvier 2015, même en recyclé/régénéré."
   },
   "remediation_vers": "g2a",
   "code": "2.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g2-42",
   "dc": "G2",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel fluide a le GWP le plus élevé ?",
   "choix": [
    "R134a",
    "R410A",
    "R404A",
    "R32"
   ],
   "bonne": 2,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g2",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g3-v6_058",
   "dc": "G3",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le tirage au vide a pour but principal d'éliminer :",
   "choix": [
    "L'huile usagée",
    "L'air et l'humidité du circuit",
    "Les particules métalliques",
    "Le fluide résiduel"
   ],
   "bonne": 1,
   "explication": "L'air et l'humidité — Le tirage au vide évacue l'air (incondensable qui augmente la HP) et l'humidité (qui forme des acides avec l'huile POE).",
   "aide": "L'air et l'eau sont les deux ennemis du circuit frigorifique.",
   "remed": {
    "texte": "Le tirage au vide évacue l'air (incondensable qui augmente la HP) et l'humidité (qui forme des acides avec l'huile POE)."
   },
   "remediation_vers": "g3",
   "code": "3.04",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g3-v6_059",
   "dc": "G3",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Si la pression remonte de plus de 100 µm pendant le test de maintien, cela indique :",
   "choix": [
    "Le circuit est étanche",
    "Une fuite ou de l'humidité résiduelle",
    "Le vide est suffisant",
    "La pompe est trop puissante"
   ],
   "bonne": 1,
   "explication": "Fuite ou humidité résiduelle — Une remontée > 100 µm après fermeture de la vanne indique soit une fuite, soit de l'humidité qui s'évapore.",
   "aide": "Si le vide est bon, la pression doit rester stable.",
   "remed": {
    "texte": "Une remontée > 100 µm après fermeture de la vanne indique soit une fuite, soit de l'humidité qui s'évapore."
   },
   "remediation_vers": "g3",
   "code": "3.04",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g3-v6_062",
   "dc": "G3",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La pression d'épreuve de résistance d'un circuit est réalisée avec :",
   "choix": [
    "Du fluide frigorigène",
    "De l'oxygène",
    "De l'azote sec",
    "De l'air comprimé"
   ],
   "bonne": 2,
   "explication": "De l'azote sec — L'épreuve de résistance se fait toujours à l'azote sec. Jamais d'oxygène (risque explosion avec huile) ni d'air comprimé (humidité).",
   "aide": "L'azote est un gaz inerte, sec et sans risque.",
   "remed": {
    "texte": "L'épreuve de résistance se fait toujours à l'azote sec. Jamais d'oxygène (risque explosion avec huile) ni d'air comprimé (humidité)."
   },
   "remediation_vers": "g3",
   "code": "3.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g3-v6_159",
   "dc": "G3",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La pompe à vide ne doit jamais être utilisée pour :",
   "choix": [
    "Évacuer l'air du circuit",
    "Évacuer l'humidité",
    "Récupérer du fluide frigorigène",
    "Atteindre le vide requis"
   ],
   "bonne": 2,
   "explication": "Récupérer du fluide — La pompe à vide n'est pas conçue pour pomper du fluide (ça l'endommage). La récupération se fait avec un groupe de récupération spécifique.",
   "aide": "Pompe à vide ≠ groupe de récupération. Deux outils différents.",
   "remed": {
    "texte": "La pompe à vide n'est pas conçue pour pomper du fluide (ça l'endommage). La récupération se fait avec un groupe de récupération spécifique."
   },
   "remediation_vers": "g3",
   "code": "3.03",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g3-66",
   "dc": "G3",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La température d'ébullition de l'eau à pression atmosphérique est :",
   "choix": [
    "0°C",
    "50°C",
    "100°C",
    "150°C"
   ],
   "bonne": 2,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g3",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g4-v6_074",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La méthode de détection indirecte consiste à :",
   "choix": [
    "Utiliser un détecteur électronique",
    "Suivre les paramètres de fonctionnement (P, T°, surchauffe)",
    "Mettre sous pression d'azote",
    "Utiliser un traceur UV"
   ],
   "bonne": 1,
   "explication": "Suivre les paramètres de fonctionnement — La détection indirecte analyse les dérives des paramètres (baisse de HP, augmentation de surchauffe, etc.) qui signalent une perte de charge.",
   "aide": "C'est une méthode qui n'utilise pas d'appareil de détection spécifique.",
   "remed": {
    "texte": "La détection indirecte analyse les dérives des paramètres (baisse de HP, augmentation de surchauffe, etc.) qui signalent une perte de charge."
   },
   "remediation_vers": "g4b",
   "code": "4.04",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g4-v6_072",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La détection par eau savonneuse est une méthode :",
   "choix": [
    "Directe et localisante",
    "Indirecte et globale",
    "Réglementairement suffisante seule",
    "Utilisable uniquement en intérieur"
   ],
   "bonne": 0,
   "explication": "Directe et localisante — L'eau savonneuse permet de localiser précisément les fuites par la formation de bulles. C'est un complément au détecteur électronique.",
   "aide": "Les bulles apparaissent exactement à l'endroit de la fuite.",
   "remed": {
    "texte": "L'eau savonneuse permet de localiser précisément les fuites par la formation de bulles. C'est un complément au détecteur électronique."
   },
   "remediation_vers": "g4b",
   "code": "4.07",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g4-v6_163",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le détecteur électronique de fuites détecte les fuites par :",
   "choix": [
    "La couleur du gaz",
    "La différence de concentration de gaz dans l'air ambiant",
    "Le bruit de la fuite",
    "La variation de température"
   ],
   "bonne": 1,
   "explication": "Différence de concentration — Le détecteur mesure la concentration de gaz fluoré dans l'air et alerte quand elle dépasse un seuil.",
   "aide": "C'est un 'nez électronique' pour les gaz fluorés.",
   "remed": {
    "texte": "Le détecteur mesure la concentration de gaz fluoré dans l'air et alerte quand elle dépasse un seuil."
   },
   "remediation_vers": "g4b",
   "code": "4.08",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g4-v6_069",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un détecteur de fuites doit être calibré au minimum :",
   "choix": [
    "Tous les mois",
    "Tous les 6 mois",
    "Tous les ans",
    "Tous les 5 ans"
   ],
   "bonne": 2,
   "explication": "Tous les ans — La calibration annuelle est obligatoire pour garantir la fiabilité de la mesure.",
   "aide": "C'est le même rythme que le contrôle d'étanchéité minimal.",
   "remed": {
    "texte": "La calibration annuelle est obligatoire pour garantir la fiabilité de la mesure."
   },
   "remediation_vers": "g4b",
   "code": "4.08",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g4-v6_168",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le détecteur de fuites doit être vérifié au gaz de référence :",
   "choix": [
    "Avant chaque utilisation",
    "Une fois par an",
    "Uniquement à l'achat",
    "Tous les 5 ans"
   ],
   "bonne": 0,
   "explication": "Avant chaque utilisation — Avant chaque campagne de détection, il faut vérifier le bon fonctionnement du détecteur avec un gaz de référence calibré.",
   "aide": "C'est une vérification rapide mais obligatoire à chaque fois.",
   "remed": {
    "texte": "Avant chaque campagne de détection, il faut vérifier le bon fonctionnement du détecteur avec un gaz de référence calibré."
   },
   "remediation_vers": "g4b",
   "code": "4.08",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g4-104",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Lors d'un contrôle d'étanchéité, le contrôleur doit vérifier :",
   "choix": [
    "Uniquement le compresseur",
    "Seulement les raccords visibles",
    "Tous les éléments du circuit",
    "Uniquement la charge de fluide"
   ],
   "bonne": 2,
   "explication": "Les fréquences de contrôle d’étanchéité se déclenchent par seuils en tCO₂e (5 / 50 / 500), avec des périodicités typiques 12 / 6 / 3 mois. ⚠ raisonner en 'kg' au lieu de tCO₂e, ou inverser les seuils (5/50/500).",
   "aide": "Indice : pensez aux seuils tCO2e (5 / 50 / 500) et aux fréquences 12 / 6 / 3 mois.",
   "remed": {
    "regle": "Les fréquences de contrôle d’étanchéité se déclenchent par seuils en tCO₂e (5 / 50 / 500), avec des périodicités typiques 12 / 6 / 3 mois.",
    "pourquoi": "Le but est de réduire les fuites sur les installations à plus fort impact climatique.",
    "exemple": "une installation à 60 tCO₂e entre dans le palier '≥ 50' (contrôle plus fréquent que le palier '≥ 5').",
    "piege": "raisonner en 'kg' au lieu de tCO₂e, ou inverser les seuils (5/50/500)."
   },
   "remediation_vers": "g4b",
   "code": "4.03",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g4-114",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le contrôle d'étanchéité doit porter sur :",
   "choix": [
    "Uniquement la partie frigorifique",
    "Uniquement la partie électrique",
    "Frigorifique + sécurités + étiquetage",
    "Seulement les raccords"
   ],
   "bonne": 2,
   "explication": "Les fréquences de contrôle d’étanchéité se déclenchent par seuils en tCO₂e (5 / 50 / 500), avec des périodicités typiques 12 / 6 / 3 mois. ⚠ raisonner en 'kg' au lieu de tCO₂e, ou inverser les seuils (5/50/500).",
   "aide": "Indice : pensez aux seuils tCO2e (5 / 50 / 500) et aux fréquences 12 / 6 / 3 mois.",
   "remed": {
    "regle": "Les fréquences de contrôle d’étanchéité se déclenchent par seuils en tCO₂e (5 / 50 / 500), avec des périodicités typiques 12 / 6 / 3 mois.",
    "pourquoi": "Le but est de réduire les fuites sur les installations à plus fort impact climatique.",
    "exemple": "une installation à 60 tCO₂e entre dans le palier '≥ 50' (contrôle plus fréquent que le palier '≥ 5').",
    "piege": "raisonner en 'kg' au lieu de tCO₂e, ou inverser les seuils (5/50/500)."
   },
   "remediation_vers": "g4b",
   "code": "4.03",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g4-68",
   "dc": "G4",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Quel est le meilleur outil pour détecter une fuite de fluide frigorigène ?",
   "choix": [
    "Eau savonneuse",
    "Détecteur électronique",
    "Traceur UV + lampe",
    "Tous selon les cas"
   ],
   "bonne": 3,
   "explication": "L’obligation de détection automatique concerne les installations au-dessus d’un seuil élevé en tCO₂e (cas des grosses installations). ⚠ croire que le détecteur est exigé pour toutes les installations, même petites.",
   "aide": "Indice : les détecteurs concernent surtout les installations à très forte charge (seuil en tCO2e).",
   "remed": {
    "regle": "L’obligation de détection automatique concerne les installations au-dessus d’un seuil élevé en tCO₂e (cas des grosses installations).",
    "pourquoi": "La détection réduit le temps de fuite et donc les émissions.",
    "exemple": "sur une grosse centrale, un détecteur alerte avant que la perte de charge ne devienne critique.",
    "piege": "croire que le détecteur est exigé pour toutes les installations, même petites."
   },
   "remediation_vers": "g4b",
   "code": "4.06",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g4-v6_174",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le registre d'équipement doit être tenu :",
   "choix": [
    "Par le propriétaire de l'installation",
    "Par l'installateur uniquement",
    "Par la préfecture",
    "Par le fabricant de l'équipement"
   ],
   "bonne": 0,
   "explication": "Par le propriétaire (exploitant) — Le détenteur/exploitant de l'installation est responsable de la tenue du registre.",
   "aide": "C'est celui qui exploite l'installation qui est responsable.",
   "remed": {
    "texte": "Le détenteur/exploitant de l'installation est responsable de la tenue du registre."
   },
   "remediation_vers": "g4b",
   "code": "1.00",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g4-107",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le registre peut être tenu :",
   "choix": [
    "Uniquement en version papier",
    "Uniquement en version électronique",
    "Papier ou électronique",
    "Seulement par l'ADEME"
   ],
   "bonne": 2,
   "explication": "La traçabilité est obligatoire : nature du fluide, quantités ajoutées/récupérées, résultats de contrôles, identité de l’opérateur, et conservation des enregistrements. ⚠ oublier une information clé (quantités) ou ne pas conserver les documents assez longtemps.",
   "aide": "Indice : la traçabilité est obligatoire (qui a fait l’intervention, quelle quantité, quel fluide, et conservation plusieurs années).",
   "remed": {
    "regle": "La traçabilité est obligatoire : nature du fluide, quantités ajoutées/récupérées, résultats de contrôles, identité de l’opérateur, et conservation des enregistrements.",
    "pourquoi": "Sans traçabilité, impossible de prouver la conformité et de suivre les fuites.",
    "exemple": "sur la fiche d’intervention, on consigne le fluide, la quantité (kg), et les références de l’opérateur/entreprise.",
    "piege": "oublier une information clé (quantités) ou ne pas conserver les documents assez longtemps."
   },
   "remediation_vers": "g4b",
   "code": "1.00",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g4-180",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Après une intervention sur un circuit, quelle opération permet de vérifier l'étanchéité ?",
   "choix": [
    "Remettre en service immédiatement",
    "Effectuer un test de pression avec un gaz inerte (azote) et rechercher les fuites",
    "Ajouter du fluide frigorigène et observer",
    "Attendre 24 heures sans rien faire"
   ],
   "bonne": 1,
   "explication": "Après intervention, on effectue un TEST D'ÉTANCHÉITÉ avec de l'azote sous pression (environ 30 bars pour circuits HP). On recherche les fuites avec un détecteur de fuite ou de l'eau savonneuse.",
   "aide": "Avant de charger en fluide frigorigène, il faut s'assurer que le circuit est étanche.",
   "remed": {
    "texte": "Après intervention, on effectue un TEST D'ÉTANCHÉITÉ avec de l'azote sous pression (environ 30 bars pour circuits HP). On recherche les fuites avec un détecteur de fuite ou de l'eau savonneuse. Si le circuit tient la pression pendant plusieurs heures, il est étanche."
   },
   "remediation_vers": "g4b",
   "code": "4.06",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g4-110",
   "dc": "G4",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Une installation frigorifique doit faire l'objet d'un marquage indiquant :",
   "choix": [
    "Uniquement le type de fluide",
    "Type et quantité de fluide",
    "Type, quantité et pictogrammes de danger",
    "Aucune obligation"
   ],
   "bonne": 2,
   "explication": "Ici, on raisonne en tCO₂e (impact) plutôt qu’en kg. ⚠ se focaliser sur la masse de fluide seule.",
   "aide": "Indice : raisonnez en tCO2e (pas seulement en kg).",
   "remed": {
    "regle": "Ici, on raisonne en tCO₂e (impact) plutôt qu’en kg.",
    "pourquoi": "Le règlement F-Gaz déclenche des obligations en fonction de l’impact climatique.",
    "exemple": "même une petite charge peut dépasser un seuil si le GWP est élevé.",
    "piege": "se focaliser sur la masse de fluide seule."
   },
   "remediation_vers": "g4b",
   "code": "4.03",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g5-v6_063",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le taux de remplissage maximal d'une bouteille de récupération est de :",
   "choix": [
    "60%",
    "70%",
    "80%",
    "100%"
   ],
   "bonne": 2,
   "explication": "80% — Max 80% du volume pour laisser de l'espace à la dilatation thermique. Un remplissage excessif est dangereux (explosion).",
   "aide": "Il faut toujours laisser un espace de sécurité pour la dilatation.",
   "remed": {
    "texte": "Max 80% du volume pour laisser de l'espace à la dilatation thermique. Un remplissage excessif est dangereux (explosion)."
   },
   "remediation_vers": "g5a",
   "code": "5.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_156",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Il est interdit de mélanger des fluides différents dans une même bouteille de récupération car :",
   "choix": [
    "Ce serait trop lourd",
    "Le mélange serait impossible à recycler/régénérer",
    "Les bouteilles exploseraient",
    "Ça n'a aucune importance"
   ],
   "bonne": 1,
   "explication": "Impossible à recycler/régénérer — Un mélange de fluides différents est un déchet ultime : il ne peut être que détruit, pas recyclé ni régénéré.",
   "aide": "Chaque fluide doit avoir sa propre bouteille pour permettre sa valorisation.",
   "remed": {
    "texte": "Un mélange de fluides différents est un déchet ultime : il ne peut être que détruit, pas recyclé ni régénéré."
   },
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_060",
   "dc": "G5",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi un mélange zéotrope doit-il être chargé en phase liquide ?",
   "choix": [
    "Pour aller plus vite",
    "Pour éviter la démixtion (séparation des composants)",
    "Pour protéger le compresseur",
    "Pour réduire le bruit"
   ],
   "bonne": 1,
   "explication": "Pour éviter la démixtion — En phase gazeuse, les composants d'un mélange zéotrope s'évaporent à des vitesses différentes, modifiant la composition.",
   "aide": "Les composants du mélange ont des points d'ébullition différents.",
   "remed": {
    "texte": "En phase gazeuse, les composants d'un mélange zéotrope s'évaporent à des vitesses différentes, modifiant la composition."
   },
   "remediation_vers": "g5a",
   "code": "5.05",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_064",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La charge en fluide se mesure avec :",
   "choix": [
    "Un manomètre",
    "Une balance de précision",
    "Un thermomètre",
    "Un vacuomètre"
   ],
   "bonne": 1,
   "explication": "Une balance de précision — La charge se fait au poids : on pèse la bouteille avant et après pour connaître la quantité exacte introduite (±5g).",
   "aide": "La quantité de fluide se mesure en kg, donc par pesage.",
   "remed": {
    "texte": "La charge se fait au poids : on pèse la bouteille avant et après pour connaître la quantité exacte introduite (±5g)."
   },
   "remediation_vers": "g5a",
   "code": "5.06",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_082",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La récupération de fluide est obligatoire :",
   "choix": [
    "Uniquement pour les grosses installations",
    "Uniquement si le fluide est en bon état",
    "Dans tous les cas, même pour de petites quantités",
    "Seulement si le client le demande"
   ],
   "bonne": 2,
   "explication": "Dans tous les cas — La récupération est TOUJOURS obligatoire, quelle que soit la quantité. Le rejet à l'atmosphère est interdit.",
   "aide": "Même 50g doivent être récupérés — c'est la loi.",
   "remed": {
    "texte": "La récupération est TOUJOURS obligatoire, quelle que soit la quantité. Le rejet à l'atmosphère est interdit."
   },
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_083",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La différence entre recyclage et régénération est :",
   "choix": [
    "Aucune, c'est la même chose",
    "Le recyclage est un nettoyage basique, la régénération remet aux spécifications d'origine",
    "Le recyclage est fait en laboratoire",
    "La régénération est moins poussée"
   ],
   "bonne": 1,
   "explication": "Recyclage = nettoyage basique, Régénération = spécifications d'origine",
   "aide": "Recycler = nettoyer. Régénérer = remettre à neuf.",
   "remed": {
    "texte": "Le recyclage (filtrage, déshydratation) permet la réutilisation sur la même installation. La régénération (labo agréé) produit un fluide 'comme neuf'."
   },
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_176",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le fluide recyclé (non régénéré) peut être réutilisé :",
   "choix": [
    "Sur n'importe quelle installation",
    "Uniquement sur la même installation ou du même exploitant",
    "Uniquement à l'export",
    "Jamais"
   ],
   "bonne": 1,
   "explication": "Même installation ou même exploitant — Le fluide simplement recyclé (filtré, séché) ne retrouve pas les spécifications d'origine et ne peut être vendu à un tiers.",
   "aide": "Recyclé = usage limité. Régénéré = comme neuf.",
   "remed": {
    "texte": "Le fluide simplement recyclé (filtré, séché) ne retrouve pas les spécifications d'origine et ne peut être vendu à un tiers."
   },
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-135",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Lors de la récupération, l'huile frigorifique doit être :",
   "choix": [
    "Laissée dans le compresseur",
    "Récupérée séparément",
    "Mélangée au fluide",
    "Dégazée à l'atmosphère"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g5a",
   "code": "5.04",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_175",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le rejet volontaire de fluide frigorigène dans l'atmosphère est :",
   "choix": [
    "Autorisé pour les petites quantités",
    "Toléré si le GWP est faible",
    "Strictement interdit et sanctionné",
    "Autorisé en cas d'urgence"
   ],
   "bonne": 2,
   "explication": "Strictement interdit — Le dégazage volontaire est une infraction : 1 500 € d'amende (contravention 5e classe). Aucune exception.",
   "aide": "Zéro tolérance pour le rejet volontaire.",
   "remed": {
    "texte": "Le dégazage volontaire est une infraction : 1 500 € d'amende (contravention 5e classe). Aucune exception."
   },
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-141",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Avant de récupérer le fluide, il faut :",
   "choix": [
    "Ouvrir immédiatement le circuit",
    "Arrêter et isoler le système",
    "Chauffer l'installation",
    "Vidanger l'huile"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g5a",
   "code": "5.03",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-175",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous devez vérifier la pression d'un circuit en fonctionnement. Où branchez-vous le manomètre basse pression ?",
   "choix": [
    "Sur la ligne de refoulement",
    "Sur la ligne d'aspiration (entre évaporateur et compresseur)",
    "Sur la ligne liquide",
    "Sur le condenseur"
   ],
   "bonne": 1,
   "explication": "Le manomètre BASSE PRESSION se branche sur la ligne d'ASPIRATION (entre évaporateur et compresseur) ou sur le piquage BP du compresseur. Il mesure la pression d'évaporation (BP).",
   "aide": "Le manomètre BP mesure la pression côté basse pression.",
   "remed": {
    "texte": "Le manomètre BASSE PRESSION se branche sur la ligne d'ASPIRATION (entre évaporateur et compresseur) ou sur le piquage BP du compresseur. Il mesure la pression d'évaporation (BP)."
   },
   "remediation_vers": "g5a",
   "code": "5.01",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-176",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous devez vérifier la pression haute d'un circuit. Où branchez-vous le manomètre haute pression ?",
   "choix": [
    "Sur la ligne d'aspiration",
    "Sur la ligne de refoulement (entre compresseur et condenseur)",
    "Sur l'évaporateur",
    "Sur le détendeur"
   ],
   "bonne": 1,
   "explication": "Le manomètre HAUTE PRESSION se branche sur la ligne de REFOULEMENT (entre compresseur et condenseur) ou sur le piquage HP du compresseur. Il mesure la pression de condensation (HP).",
   "aide": "Le manomètre HP mesure la pression côté haute pression.",
   "remed": {
    "texte": "Le manomètre HAUTE PRESSION se branche sur la ligne de REFOULEMENT (entre compresseur et condenseur) ou sur le piquage HP du compresseur. Il mesure la pression de condensation (HP)."
   },
   "remediation_vers": "g5a",
   "code": "5.01",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-179",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Avant d'ouvrir un circuit frigorifique pour une intervention, quelle opération est obligatoire ?",
   "choix": [
    "Démarrer le compresseur",
    "Récupérer le fluide frigorigène dans un récipient adapté",
    "Ouvrir toutes les vannes",
    "Ajouter de l'huile"
   ],
   "bonne": 1,
   "explication": "Avant toute ouverture du circuit, il est OBLIGATOIRE de RÉCUPÉRER le fluide frigorigène avec une station de récupération certifiée. C'est une obligation légale (F-Gas) et environnementale.",
   "aide": "Pour des raisons légales et environnementales, le fluide doit être récupéré.",
   "remed": {
    "texte": "Avant toute ouverture du circuit, il est OBLIGATOIRE de RÉCUPÉRER le fluide frigorigène avec une station de récupération certifiée. C'est une obligation légale (F-Gas) et environnementale. Ne jamais purger le fluide dans l'atmosphère !"
   },
   "remediation_vers": "g5a",
   "code": "5.03",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_161",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pendant la charge, on surveille principalement :",
   "choix": [
    "La couleur du fluide",
    "La surchauffe et le sous-refroidissement",
    "Le bruit du compresseur uniquement",
    "La vitesse du ventilateur"
   ],
   "bonne": 1,
   "explication": "Surchauffe et sous-refroidissement — Ces deux paramètres indiquent si la quantité de fluide est correcte. Surchauffe trop haute = manque. SR trop bas = manque aussi.",
   "aide": "Ce sont les deux indicateurs clés de la bonne charge.",
   "remed": {
    "texte": "Ces deux paramètres indiquent si la quantité de fluide est correcte. Surchauffe trop haute = manque. SR trop bas = manque aussi."
   },
   "remediation_vers": "g5a",
   "code": "5.05",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_170",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La fiche d'intervention CERFA doit être remplie :",
   "choix": [
    "Uniquement si le client le demande",
    "À chaque intervention impliquant du fluide",
    "Uniquement pour les grosses installations",
    "Une fois par an"
   ],
   "bonne": 1,
   "explication": "À chaque intervention impliquant du fluide — Chaque ajout, retrait, récupération, contrôle de fluide doit faire l'objet d'une fiche CERFA.",
   "aide": "Pas de fluide manipulé sans trace écrite.",
   "remed": {
    "texte": "Chaque ajout, retrait, récupération, contrôle de fluide doit faire l'objet d'une fiche CERFA."
   },
   "remediation_vers": "g5a",
   "code": "5.07",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_079",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La fiche d'intervention doit mentionner obligatoirement :",
   "choix": [
    "Uniquement le type de fluide",
    "Le fluide, les quantités, l'opérateur, les opérations effectuées",
    "Uniquement la date",
    "Le prix de l'intervention"
   ],
   "bonne": 1,
   "explication": "Fluide, quantités, opérateur, opérations — La fiche doit être exhaustive : nature du fluide, quantités (ajout/récupération), identité de l'opérateur, nature des opérations.",
   "aide": "La traçabilité doit être complète — qui, quoi, combien.",
   "remed": {
    "texte": "La fiche doit être exhaustive : nature du fluide, quantités (ajout/récupération), identité de l'opérateur, nature des opérations."
   },
   "remediation_vers": "g5a",
   "code": "5.07",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_081",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le BSD (Bordereau de Suivi des Déchets) accompagne :",
   "choix": [
    "L'installation de nouveaux équipements",
    "Le transport de fluides usagés vers le centre de traitement",
    "La formation des techniciens",
    "L'achat de fluide neuf"
   ],
   "bonne": 1,
   "explication": "Le transport de fluides usagés — Le BSD trace le parcours des déchets (fluides récupérés) du producteur au centre de traitement.",
   "aide": "BSD = Bordereau de Suivi des Déchets — c'est le 'passeport' du déchet.",
   "remed": {
    "texte": "Le BSD trace le parcours des déchets (fluides récupérés) du producteur au centre de traitement."
   },
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-128",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Lors de la mise hors service, le fluide doit être récupéré :",
   "choix": [
    "Uniquement si > 5 Teq CO2",
    "Pour toute quantité",
    "Seulement si > 2 kg",
    "Facultatif si hermétique"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-133",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Les équipements contenant des fluides en fin de vie relèvent de la filière :",
   "choix": [
    "Déchets ménagers",
    "DEEE (Déchets d'Équipements Électriques et Électroniques)",
    "Déchets dangereux uniquement",
    "Recyclage ordinaire"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-143",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Une bouteille de fluide récupéré doit être :",
   "choix": [
    "Stockée couchée",
    "Stockée debout",
    "Stockée comme on veut",
    "Stockée la tête en bas"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-147",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un frigoriste peut-il détruire lui-même le fluide récupéré ?",
   "choix": [
    "Oui, en le brûlant",
    "Oui, en le diluant",
    "Non, uniquement centre agréé",
    "Oui, en le dégazant"
   ],
   "bonne": 2,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_177",
   "dc": "G5",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le propriétaire d'un équipement frigorifique en fin de vie doit :",
   "choix": [
    "Le jeter à la déchetterie municipale",
    "Le confier à un organisme agréé DEEE",
    "Le laisser en place",
    "Le brûler"
   ],
   "bonne": 1,
   "explication": "Le confier à un organisme agréé DEEE — Les équipements frigorifiques contiennent des fluides réglementés et doivent suivre la filière DEEE spécialisée.",
   "aide": "DEEE = filière spécialisée, pas la poubelle classique.",
   "remed": {
    "texte": "Les équipements frigorifiques contiennent des fluides réglementés et doivent suivre la filière DEEE spécialisée."
   },
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-v6_158",
   "dc": "G5",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La charge en fluide par le côté HP se fait obligatoirement en :",
   "choix": [
    "Phase gazeuse",
    "Phase liquide",
    "Les deux sont possibles",
    "Ni l'un ni l'autre"
   ],
   "bonne": 1,
   "explication": "Phase liquide — La charge côté HP (sortie condenseur) se fait toujours en phase liquide. Côté BP, le fluide doit entrer en gaz pour ne pas endommager le compresseur.",
   "aide": "Liquide en HP, gaz en BP — c'est la règle fondamentale.",
   "remed": {
    "texte": "La charge côté HP (sortie condenseur) se fait toujours en phase liquide. Côté BP, le fluide doit entrer en gaz pour ne pas endommager le compresseur."
   },
   "remediation_vers": "g5a",
   "code": "5.05",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-130",
   "dc": "G5",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La destruction des fluides frigorigènes s'effectue principalement par :",
   "choix": [
    "Enfouissement",
    "Incinération haute température",
    "Relâchement contrôlé",
    "Dilution"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g5-146",
   "dc": "G5",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Les compresseurs usagés doivent être :",
   "choix": [
    "Jetés avec les métaux",
    "Dégazés et vidangés avant recyclage",
    "Détruits entiers",
    "Revendus en l'état"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g5a",
   "code": "5.08",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g6-152",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel est le rôle principal du compresseur dans un circuit frigorifique ?",
   "choix": [
    "Refroidir le fluide frigorigène",
    "Aspirer et comprimer le gaz basse pression",
    "Détendre le liquide haute pression",
    "Condenser les vapeurs"
   ],
   "bonne": 1,
   "explication": "Le compresseur ASPIRE le gaz basse pression en provenance de l'évaporateur et le COMPRIME pour l'envoyer vers le condenseur à haute pression. C'est le moteur du cycle frigorifique.",
   "aide": "Le compresseur est le cœur du système. Il crée la différence de pression nécessaire au cycle.",
   "remed": {
    "texte": "Le compresseur ASPIRE le gaz basse pression en provenance de l'évaporateur et le COMPRIME pour l'envoyer vers le condenseur à haute pression. C'est le moteur du cycle frigorifique."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-231",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel est le rôle principal de l'huile dans un compresseur frigorifique ?",
   "choix": [
    "Refroidir le fluide frigorigène",
    "Lubrifier les pièces mobiles et assurer l'étanchéité",
    "Augmenter la pression",
    "Filtrer le fluide"
   ],
   "bonne": 1,
   "explication": "L'huile LUBRIFIE les pièces mobiles du compresseur (pistons, roulements, paliers), REFROIDIT les parties chaudes, et assure l'ÉTANCHÉITÉ entre les zones HP et BP.",
   "aide": "L'huile est essentielle au bon fonctionnement du compresseur.",
   "remed": {
    "texte": "L'huile LUBRIFIE les pièces mobiles du compresseur (pistons, roulements, paliers), REFROIDIT les parties chaudes, et assure l'ÉTANCHÉITÉ entre les zones HP et BP. Sans huile ou avec un niveau insuffisant, le compresseur grippe et se détruit rapidement."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-233",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pourquoi est-il important que l'huile revienne au compresseur dans un circuit frigorifique ?",
   "choix": [
    "Pour faire joli",
    "Car le compresseur a besoin d'huile en permanence pour sa lubrification",
    "Pour augmenter la puissance",
    "Pour diminuer la consommation"
   ],
   "bonne": 1,
   "explication": "L'huile circule avec le fluide frigorigène dans tout le circuit. Elle doit REVENIR au compresseur pour maintenir un niveau correct dans le carter.",
   "aide": "Un compresseur sans huile se détruit rapidement.",
   "remed": {
    "texte": "L'huile circule avec le fluide frigorigène dans tout le circuit. Elle doit REVENIR au compresseur pour maintenir un niveau correct dans le carter. Si l'huile reste piégée dans l'évaporateur ou les tuyauteries (mauvais retour d'huile), le niveau baisse dans le compresseur → grippage et destruction."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-247",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "À quoi sert un réchauffeur de carter (chauffage de carter) sur un compresseur ?",
   "choix": [
    "À augmenter la puissance",
    "À éviter la migration du fluide frigorigène dans l'huile à l'arrêt (dilution)",
    "À chauffer le local",
    "À fondre le givre"
   ],
   "bonne": 1,
   "explication": "Le RÉCHAUFFEUR DE CARTER maintient l'huile légèrement CHAUDE à l'arrêt pour éviter la MIGRATION du fluide frigorigène dans l'huile froide.",
   "aide": "Le réchauffeur de carter fonctionne principalement à l'arrêt du compresseur.",
   "remed": {
    "texte": "Le RÉCHAUFFEUR DE CARTER maintient l'huile légèrement CHAUDE à l'arrêt pour éviter la MIGRATION du fluide frigorigène dans l'huile froide. Si le fluide se dissout dans l'huile (dilution), au démarrage il s'évapore brutalement (moussage) et l'huile peut être violemment projetée hors du carter. Le réchauffeur garde l'huile plus chaude que le reste du circuit pour éviter ce phénomène. Il doit être alimenté en permanence (même à l'arrêt)."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-240",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quels sont les symptômes d'un manque d'huile dans le compresseur ?",
   "choix": [
    "Compresseur silencieux et froid",
    "Bruits anormaux (frottements), échauffement excessif, baisse de puissance, risque de grippage",
    "Haute pression élevée",
    "Évaporateur givré"
   ],
   "bonne": 1,
   "explication": "Symptômes de MANQUE D'HUILE : 1) BRUITS anormaux (frottements, cliquetis), 2) ÉCHAUFFEMENT excessif du carter et du refoulement, 3) Baisse de PUISSANCE frigorifique, 4) Température de refoulement…",
   "aide": "Un compresseur qui manque d'huile montre des signes clairs avant de casser.",
   "remed": {
    "texte": "Symptômes de MANQUE D'HUILE : 1) BRUITS anormaux (frottements, cliquetis), 2) ÉCHAUFFEMENT excessif du carter et du refoulement, 3) Baisse de PUISSANCE frigorifique, 4) Température de refoulement très élevée, 5) Niveau d'huile bas au voyant. ARRÊTER immédiatement le compresseur pour diagnostiquer la cause du mauvais retour d'huile avant qu'il ne grippe."
   },
   "remediation_vers": "g6",
   "code": "6.07",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-186",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous constatez que la température de refoulement du compresseur est très élevée (>120°C). Quelles sont les causes possibles ?",
   "choix": [
    "Excès de fluide frigorigène",
    "Manque de fluide, surchauffe excessive, ou mauvais retour d'huile",
    "Condenseur trop grand",
    "Évaporateur surdimensionné"
   ],
   "bonne": 1,
   "explication": "Une TEMPÉRATURE DE REFOULEMENT élevée peut être causée par : manque de charge (surchauffe excessive), mauvais refroidissement du compresseur, rapport de pression trop élevé (T°K trop haute ou T°O…",
   "aide": "Une température de refoulement élevée indique que le compresseur aspire du gaz trop chaud.",
   "remed": {
    "texte": "Une TEMPÉRATURE DE REFOULEMENT élevée peut être causée par : manque de charge (surchauffe excessive), mauvais refroidissement du compresseur, rapport de pression trop élevé (T°K trop haute ou T°O trop basse), ou manque d'huile. Risque de carbonisation de l'huile et de destruction du compresseur."
   },
   "remediation_vers": "g6",
   "code": "6.06",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-174",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "À quoi sert un voyant d'huile sur un compresseur ?",
   "choix": [
    "À vérifier le niveau d'huile dans le carter",
    "À vérifier la température de l'huile",
    "À vérifier la pression de l'huile",
    "À vidanger l'huile"
   ],
   "bonne": 0,
   "explication": "Le VOYANT D'HUILE (sur les compresseurs équipés) permet de vérifier visuellement le NIVEAU D'HUILE dans le carter du compresseur.",
   "aide": "C'est un hublot transparent qui permet de voir l'huile.",
   "remed": {
    "texte": "Le VOYANT D'HUILE (sur les compresseurs équipés) permet de vérifier visuellement le NIVEAU D'HUILE dans le carter du compresseur. Un niveau correct garantit la lubrification et le refroidissement du compresseur."
   },
   "remediation_vers": "g6",
   "code": "6.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-234",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "À quoi sert un séparateur d'huile sur une installation frigorifique ?",
   "choix": [
    "À filtrer le fluide frigorigène",
    "À séparer l'huile du fluide au refoulement et la renvoyer directement au compresseur",
    "À augmenter la pression",
    "À détendre le fluide"
   ],
   "bonne": 1,
   "explication": "Le SÉPARATEUR D'HUILE se monte au refoulement du compresseur. Il sépare l'huile entraînée par le gaz chaud et la renvoie DIRECTEMENT au compresseur par gravité.",
   "aide": "C'est un accessoire qui améliore le retour d'huile, surtout sur les installations difficiles.",
   "remed": {
    "texte": "Le SÉPARATEUR D'HUILE se monte au refoulement du compresseur. Il sépare l'huile entraînée par le gaz chaud et la renvoie DIRECTEMENT au compresseur par gravité. Cela réduit la quantité d'huile circulant dans le circuit et améliore le retour d'huile, surtout sur les installations avec évaporateurs multiples, longues lignes, ou basses températures."
   },
   "remediation_vers": "g6",
   "code": "6.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-235",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Comment peut-on vérifier le niveau d'huile dans le carter d'un compresseur équipé d'un voyant ?",
   "choix": [
    "En écoutant le bruit du compresseur",
    "En regardant le voyant d'huile (hublot transparent) et en vérifiant que le niveau est entre mini et maxi",
    "En mesurant la pression",
    "En sentant l'odeur"
   ],
   "bonne": 1,
   "explication": "Le VOYANT D'HUILE est un hublot transparent sur le carter qui permet de vérifier visuellement le NIVEAU d'huile. Le niveau doit être entre les repères mini et maxi.",
   "aide": "Le voyant d'huile permet un contrôle visuel rapide.",
   "remed": {
    "texte": "Le VOYANT D'HUILE est un hublot transparent sur le carter qui permet de vérifier visuellement le NIVEAU d'huile. Le niveau doit être entre les repères mini et maxi. Contrôler le niveau compresseur à l'ARRÊT (ou en fonctionnement stable si indiqué par le fabricant). Un niveau trop bas nécessite un appoint d'huile après diagnostic de la cause."
   },
   "remediation_vers": "g6",
   "code": "6.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-v6_054",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le séparateur d'huile est placé :",
   "choix": [
    "À l'aspiration du compresseur",
    "Au refoulement du compresseur",
    "En amont du détendeur",
    "En sortie d'évaporateur"
   ],
   "bonne": 1,
   "explication": "Au refoulement du compresseur — Le séparateur d'huile intercepte l'huile entraînée par le gaz chaud au refoulement et la renvoie au carter.",
   "aide": "Il faut capter l'huile AVANT qu'elle ne circule dans tout le circuit.",
   "remed": {
    "texte": "Le séparateur d'huile intercepte l'huile entraînée par le gaz chaud au refoulement et la renvoie au carter."
   },
   "remediation_vers": "g6",
   "code": "6.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-v6_150",
   "dc": "G6",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La vanne de service permet :",
   "choix": [
    "De réguler la température",
    "De raccorder les manomètres et équipements de maintenance",
    "D'inverser le cycle",
    "De purger l'huile"
   ],
   "bonne": 1,
   "explication": "Raccorder les manomètres et équipements — Les vannes de service (Schrader ou à tige) sont les points d'accès au circuit pour la mesure et l'intervention.",
   "aide": "Ce sont les 'portes d'entrée' du technicien sur le circuit.",
   "remed": {
    "texte": "Les vannes de service (Schrader ou à tige) sont les points d'accès au circuit pour la mesure et l'intervention."
   },
   "remediation_vers": "g6",
   "code": "6.06",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-173",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Lors d'une mise en service, vous constatez que le compresseur fait beaucoup de bruit (claquements). Quelle peut être la cause ?",
   "choix": [
    "Le compresseur fonctionne normalement",
    "Coup de liquide (du liquide arrive au compresseur)",
    "Manque de fluide frigorigène",
    "Condenseur encrassé"
   ],
   "bonne": 1,
   "explication": "Des CLAQUEMENTS dans le compresseur indiquent souvent un COUP DE LIQUIDE : du fluide liquide arrive au compresseur au lieu de gaz. Causes : détendeur mal réglé, excès de charge, ou évaporateur givré.",
   "aide": "Un compresseur ne doit jamais faire de bruit anormal. Les claquements sont inquiétants.",
   "remed": {
    "texte": "Des CLAQUEMENTS dans le compresseur indiquent souvent un COUP DE LIQUIDE : du fluide liquide arrive au compresseur au lieu de gaz. Causes : détendeur mal réglé, excès de charge, ou évaporateur givré. Arrêter immédiatement l'installation pour éviter la destruction du compresseur !"
   },
   "remediation_vers": "g6",
   "code": "6.06",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-177",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Quelle est l'utilité principale d'un accumulateur de liquide sur la ligne d'aspiration ?",
   "choix": [
    "Augmenter la puissance frigorifique",
    "Protéger le compresseur contre les retours de liquide",
    "Diminuer la pression",
    "Filtrer le fluide frigorigène"
   ],
   "bonne": 1,
   "explication": "L'ACCUMULATEUR DE LIQUIDE piège le liquide qui pourrait arriver au compresseur et ne laisse passer que le gaz.",
   "aide": "C'est un réservoir de sécurité placé avant le compresseur.",
   "remed": {
    "texte": "L'ACCUMULATEUR DE LIQUIDE piège le liquide qui pourrait arriver au compresseur et ne laisse passer que le gaz. Il protège le compresseur contre les coups de liquide, surtout lors des démarrages ou des variations de charge."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-190",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous devez diagnostiquer une installation qui ne produit plus de froid. Le compresseur tourne, mais la BP et la HP sont identiques et basses. Quelle est la panne probable ?",
   "choix": [
    "Manque de fluide frigorigène",
    "Clapets du compresseur cassés (compresseur ne comprime plus)",
    "Condenseur bouché",
    "Évaporateur givré"
   ],
   "bonne": 1,
   "explication": "BP = HP en fonctionnement indique que le compresseur NE COMPRIME PLUS. Cause : clapets d'aspiration ou de refoulement cassés ou bloqués ouverts. Le gaz passe d'un côté à l'autre sans être comprimé.",
   "aide": "Si BP = HP en fonctionnement, le compresseur ne crée plus de différence de pression.",
   "remed": {
    "texte": "BP = HP en fonctionnement indique que le compresseur NE COMPRIME PLUS. Cause : clapets d'aspiration ou de refoulement cassés ou bloqués ouverts. Le gaz passe d'un côté à l'autre sans être comprimé. Solution : remplacer le compresseur."
   },
   "remediation_vers": "g6",
   "code": "6.06",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-241",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi le retour d'huile est-il plus difficile en froid négatif qu'en froid positif ?",
   "choix": [
    "Car il fait plus froid",
    "Car l'huile devient plus visqueuse (épaisse) à basse température et circule moins bien",
    "Car il y a plus de fluide",
    "Car le compresseur est plus puissant"
   ],
   "bonne": 1,
   "explication": "En FROID NÉGATIF (température d'évaporation < -10°C), l'huile devient plus VISQUEUSE (épaisse comme du miel froid).",
   "aide": "La viscosité de l'huile augmente quand la température baisse.",
   "remed": {
    "texte": "En FROID NÉGATIF (température d'évaporation < -10°C), l'huile devient plus VISQUEUSE (épaisse comme du miel froid). Elle circule moins bien, adhère aux parois, et est plus difficile à entraîner par le gaz. Solutions : vitesses de gaz plus élevées, tuyauteries bien dimensionnées, séparateur d'huile, huile adaptée aux basses températures."
   },
   "remediation_vers": "g6",
   "code": "6.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-243",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Lors d'une mise en service, vous constatez que le niveau d'huile baisse rapidement. Quelle est la cause probable ?",
   "choix": [
    "Le compresseur consomme trop d'huile",
    "L'huile est entraînée dans le circuit et ne revient pas assez vite (mauvais retour d'huile)",
    "Le fluide est en excès",
    "Le condenseur fuit"
   ],
   "bonne": 1,
   "explication": "Si le niveau d'huile BAISSE rapidement après démarrage, c'est que l'huile est entraînée dans le circuit mais NE REVIENT PAS assez vite.",
   "aide": "Une baisse rapide du niveau indique que l'huile part dans le circuit plus vite qu'elle ne revient.",
   "remed": {
    "texte": "Si le niveau d'huile BAISSE rapidement après démarrage, c'est que l'huile est entraînée dans le circuit mais NE REVIENT PAS assez vite. Causes : vitesses de gaz insuffisantes, tuyauteries mal dimensionnées, contre-pentes, évaporateurs qui piègent l'huile. ARRÊTER et corriger les défauts d'installation avant grippage du compresseur. Ne PAS juste ajouter de l'huile sans corriger la cause !"
   },
   "remediation_vers": "g6",
   "code": "6.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-245",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi un compresseur qui démarre fréquemment (cycles courts) peut-il avoir des problèmes d'huile ?",
   "choix": [
    "Car il consomme plus d'électricité",
    "Car à chaque démarrage, l'huile est entraînée hors du carter avant que le retour soit établi",
    "Car le fluide s'évapore",
    "Car le condenseur surchauffe"
   ],
   "bonne": 1,
   "explication": "À chaque DÉMARRAGE, l'huile est brutalement ENTRAÎNÉE hors du carter par le gaz. Le retour d'huile met du temps à s'établir.",
   "aide": "Les démarrages fréquents perturbent l'équilibre du retour d'huile.",
   "remed": {
    "texte": "À chaque DÉMARRAGE, l'huile est brutalement ENTRAÎNÉE hors du carter par le gaz. Le retour d'huile met du temps à s'établir. Si le compresseur s'arrête trop vite (cycles courts), l'huile n'a pas le temps de revenir et le niveau baisse progressivement. Causes des cycles courts : détendeur mal réglé, charge incorrecte, pressostat mal réglé. Corriger pour augmenter la durée des cycles (min 5-10 minutes)."
   },
   "remediation_vers": "g6",
   "code": "6.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-246",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Qu'est-ce qu'un 'coup d'huile' (oil slugging) et comment le reconnaître ?",
   "choix": [
    "C'est quand on ajoute trop d'huile",
    "C'est l'arrivée brutale d'une grande quantité d'huile liquide au compresseur, causant des claquements",
    "C'est quand l'huile est trop chaude",
    "C'est quand l'huile change de couleur"
   ],
   "bonne": 1,
   "explication": "Le COUP D'HUILE (oil slugging) se produit quand une grande quantité d'huile LIQUIDE arrive brutalement au compresseur (généralement accumulée dans l'évaporateur puis libérée d'un coup).",
   "aide": "Le coup d'huile est similaire au coup de liquide mais avec de l'huile.",
   "remed": {
    "texte": "Le COUP D'HUILE (oil slugging) se produit quand une grande quantité d'huile LIQUIDE arrive brutalement au compresseur (généralement accumulée dans l'évaporateur puis libérée d'un coup). Symptômes : CLAQUEMENTS violents, vibrations, risque de casse. Causes : dégivrage électrique trop rapide, redémarrage après un long arrêt, mauvais retour d'huile chronique. Prévention : siphon inversé sur l'aspiration, réchauffeur de carter."
   },
   "remediation_vers": "g6",
   "code": "6.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-248",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Comment reconnaître une huile contaminée ou usagée qu'il faut remplacer ?",
   "choix": [
    "Elle sent bon",
    "Elle est foncée (brunâtre ou noire), opaque, ou sent le brûlé",
    "Elle est transparente",
    "Elle est froide"
   ],
   "bonne": 1,
   "explication": "Signes d'huile CONTAMINÉE ou USAGÉE : 1) Couleur FONCÉE (brune à noire) au lieu de claire/ambrée, 2) OPAQUE au lieu de transparente, 3) Odeur de BRÛLÉ ou acide, 4) Présence de particules ou boues.",
   "aide": "Une huile propre est claire et transparente.",
   "remed": {
    "texte": "Signes d'huile CONTAMINÉE ou USAGÉE : 1) Couleur FONCÉE (brune à noire) au lieu de claire/ambrée, 2) OPAQUE au lieu de transparente, 3) Odeur de BRÛLÉ ou acide, 4) Présence de particules ou boues. Causes : surchauffe, humidité, contamination, acidité. Une huile dégradée ne lubrifie plus correctement → VIDANGER et remplacer + rechercher la cause (surchauffe, humidité, fuites)."
   },
   "remediation_vers": "g6",
   "code": "6.07",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-249",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi ne faut-il jamais mélanger différents types d'huiles (POE + minérale par exemple) ?",
   "choix": [
    "Car c'est interdit par la loi",
    "Car les huiles incompatibles ne se mélangent pas bien et peuvent créer des boues, perdre leurs propriétés lubrifiantes",
    "Car ça coûte cher",
    "Car ça change la couleur"
   ],
   "bonne": 1,
   "explication": "Ne JAMAIS mélanger des huiles INCOMPATIBLES (ex: POE + minérale). Conséquences : 1) Formation de BOUES et dépôts, 2) Perte de miscibilité avec le fluide, 3) Mauvaise lubrification, 4) Bouchage du…",
   "aide": "Le mélange d'huiles incompatibles peut détruire un compresseur.",
   "remed": {
    "texte": "Ne JAMAIS mélanger des huiles INCOMPATIBLES (ex: POE + minérale). Conséquences : 1) Formation de BOUES et dépôts, 2) Perte de miscibilité avec le fluide, 3) Mauvaise lubrification, 4) Bouchage du filtre et du détendeur, 5) Grippage du compresseur. Lors d'un retrofit fluide/huile, il faut VIDANGER complètement l'ancienne huile et rincer si nécessaire."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-251",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Quelle est la conséquence d'un excès d'huile dans un compresseur ?",
   "choix": [
    "Aucune conséquence",
    "Risque de projection d'huile hors du carter, mauvaise lubrification des paliers, et encrassement du circuit",
    "La puissance augmente",
    "Le compresseur refroidit mieux"
   ],
   "bonne": 1,
   "explication": "Un EXCÈS d'huile cause : 1) PROJECTION d'huile hors du carter au démarrage (éclaboussures), 2) Huile entraînée en excès dans le circuit → encrassement évaporateur, 3) Niveau trop haut = mauvaise…",
   "aide": "Trop d'huile peut aussi poser des problèmes, il faut respecter le niveau correct.",
   "remed": {
    "texte": "Un EXCÈS d'huile cause : 1) PROJECTION d'huile hors du carter au démarrage (éclaboussures), 2) Huile entraînée en excès dans le circuit → encrassement évaporateur, 3) Niveau trop haut = mauvaise lubrification des paliers supérieurs (huile n'atteint pas), 4) Risque de coup d'huile. Respecter le niveau recommandé (généralement mi-voyant ou selon fabricant)."
   },
   "remediation_vers": "g6",
   "code": "6.07",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-252",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous constatez de la mousse dans le voyant d'huile au démarrage. Quelle est la cause probable ?",
   "choix": [
    "C'est normal",
    "Migration de fluide frigorigène dans l'huile pendant l'arrêt, qui s'évapore brutalement au démarrage",
    "L'huile est trop chaude",
    "Le compresseur est neuf"
   ],
   "bonne": 1,
   "explication": "Le MOUSSAGE de l'huile au démarrage indique que du fluide frigorigène s'est dissous dans l'huile pendant l'arrêt (MIGRATION).",
   "aide": "Le moussage est un signe de migration de fluide dans l'huile.",
   "remed": {
    "texte": "Le MOUSSAGE de l'huile au démarrage indique que du fluide frigorigène s'est dissous dans l'huile pendant l'arrêt (MIGRATION). Au démarrage, la pression baisse et le fluide s'évapore brutalement, créant de la mousse. Solutions : 1) Installer ou vérifier le RÉCHAUFFEUR DE CARTER (doit fonctionner à l'arrêt), 2) Rallonger le temps de démarrage (rampe progressive), 3) Vérifier l'isolation thermique du compresseur."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-v6_152",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un pressostat différentiel de pression d'huile protège contre :",
   "choix": [
    "La surpression de fluide",
    "Le manque de lubrification du compresseur",
    "L'excès de surchauffe",
    "Le givrage de l'évaporateur"
   ],
   "bonne": 1,
   "explication": "Le manque de lubrification — Il compare la pression d'huile à la pression BP. Si la différence est insuffisante, il coupe le compresseur pour éviter l'usure.",
   "aide": "Pas d'huile sous pression = pas de lubrification = destruction du compresseur.",
   "remed": {
    "texte": "Il compare la pression d'huile à la pression BP. Si la différence est insuffisante, il coupe le compresseur pour éviter l'usure."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g6-v6_153",
   "dc": "G6",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La migration de fluide dans l'huile à l'arrêt se produit car :",
   "choix": [
    "L'huile est plus dense que le fluide",
    "Le fluide se dissout dans l'huile froide",
    "Le compresseur est en dépression",
    "La vanne de service est ouverte"
   ],
   "bonne": 1,
   "explication": "Le fluide se dissout dans l'huile froide — À l'arrêt, quand le carter refroidit, le fluide migre et se dissout dans l'huile. Au redémarrage, il peut mousser violemment.",
   "aide": "C'est pourquoi on installe un réchauffeur de carter.",
   "remed": {
    "texte": "À l'arrêt, quand le carter refroidit, le fluide migre et se dissout dans l'huile. Au redémarrage, il peut mousser violemment."
   },
   "remediation_vers": "g6",
   "code": "6.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g7-159",
   "dc": "G7",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel est le rôle principal du condenseur ?",
   "choix": [
    "Absorber la chaleur du milieu à refroidir",
    "Évacuer la chaleur du fluide frigorigène vers l'extérieur",
    "Comprimer le gaz frigorigène",
    "Détendre le liquide frigorigène"
   ],
   "bonne": 1,
   "explication": "Le CONDENSEUR évacue la chaleur du fluide frigorigène vers l'extérieur (air ou eau). Le gaz chaud se refroidit et se condense en liquide. C'est l'organe qui 'rejette' la chaleur.",
   "aide": "Le condenseur travaille côté haute pression et rejette de la chaleur.",
   "remed": {
    "texte": "Le CONDENSEUR évacue la chaleur du fluide frigorigène vers l'extérieur (air ou eau). Le gaz chaud se refroidit et se condense en liquide. C'est l'organe qui 'rejette' la chaleur."
   },
   "remediation_vers": "g7",
   "code": "7.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g7-164",
   "dc": "G7",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Que se passe-t-il si le condenseur est encrassé (sale, poussière) ?",
   "choix": [
    "Le froid est plus puissant",
    "La haute pression augmente et l'installation consomme plus",
    "La basse pression diminue",
    "Rien de particulier"
   ],
   "bonne": 1,
   "explication": "Un condenseur ENCRASSÉ ne peut plus évacuer correctement la chaleur. La température et la pression du condenseur (HP) augmentent, ce qui force le compresseur à travailler plus fort, augmente la…",
   "aide": "Un condenseur encrassé ne peut plus évacuer correctement la chaleur.",
   "remed": {
    "texte": "Un condenseur ENCRASSÉ ne peut plus évacuer correctement la chaleur. La température et la pression du condenseur (HP) augmentent, ce qui force le compresseur à travailler plus fort, augmente la consommation électrique et peut mener à une surchauffe ou un déclenchement sécurité."
   },
   "remediation_vers": "g7",
   "code": "7.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g7-163",
   "dc": "G7",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel est le rôle des ventilateurs sur un condenseur à air ?",
   "choix": [
    "Refroidir le compresseur",
    "Forcer l'air à travers le condenseur pour évacuer la chaleur",
    "Aspirer le fluide frigorigène",
    "Détendre le gaz"
   ],
   "bonne": 1,
   "explication": "Les ventilateurs FORCENT l'air à travers les ailettes du condenseur pour améliorer l'évacuation de la chaleur.",
   "aide": "Les ventilateurs améliorent l'échange thermique avec l'air.",
   "remed": {
    "texte": "Les ventilateurs FORCENT l'air à travers les ailettes du condenseur pour améliorer l'évacuation de la chaleur. Plus le débit d'air est important, plus le condenseur est efficace (dans certaines limites)."
   },
   "remediation_vers": "g7",
   "code": "7.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g7-182",
   "dc": "G7",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Comment calculer le sous-refroidissement du liquide en sortie de condenseur ?",
   "choix": [
    "Température de condensation - Température du liquide sortie condenseur",
    "Température ambiante - Température du liquide",
    "Température HP - Température BP",
    "Température d'évaporation - Température du liquide"
   ],
   "bonne": 0,
   "explication": "Le SOUS-REFROIDISSEMENT = Température de condensation (T°K) - Température du liquide sortie condenseur. On convertit la pression HP en température avec le tableau fluide.",
   "aide": "Le sous-refroidissement compare la température du liquide à sa température de saturation.",
   "remed": {
    "texte": "Le SOUS-REFROIDISSEMENT = Température de condensation (T°K) - Température du liquide sortie condenseur. On convertit la pression HP en température avec le tableau fluide. Un sous-refroidissement de 3 à 8°C est normal."
   },
   "remediation_vers": "g7",
   "code": "7.07",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g7-169",
   "dc": "G7",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quelle est l'utilité du sous-refroidissement du liquide en sortie de condenseur ?",
   "choix": [
    "Augmenter la température du liquide",
    "S'assurer que le liquide est bien liquide (pas de bulles) et améliorer l'efficacité",
    "Diminuer la pression",
    "Protéger le compresseur"
   ],
   "bonne": 1,
   "explication": "Le SOUS-REFROIDISSEMENT consiste à refroidir le liquide en dessous de sa température de condensation. Cela garantit qu'il reste liquide dans toute la ligne liquide (pas de flash-gas), améliore…",
   "aide": "Le sous-refroidissement garantit qu'on a bien du liquide pur dans la ligne liquide.",
   "remed": {
    "texte": "Le SOUS-REFROIDISSEMENT consiste à refroidir le liquide en dessous de sa température de condensation. Cela garantit qu'il reste liquide dans toute la ligne liquide (pas de flash-gas), améliore l'efficacité du détendeur et augmente la puissance frigorifique."
   },
   "remediation_vers": "g7",
   "code": "7.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g7-170",
   "dc": "G7",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un pressostat haute pression (HP) déclenche et arrête le compresseur. Quelle peut être la cause ?",
   "choix": [
    "Manque de fluide frigorigène",
    "Condenseur encrassé, ventilateurs arrêtés, ou excès de charge",
    "Évaporateur givré",
    "Manque d'huile"
   ],
   "bonne": 1,
   "explication": "Un déclenchement PRESSOSTAT HP indique une pression de condensation trop élevée. Causes : condenseur sale ou encrassé, ventilateurs en panne, excès de charge frigorigène, air incondensable dans le…",
   "aide": "Le pressostat HP protège l'installation contre les pressions trop élevées côté condenseur.",
   "remed": {
    "texte": "Un déclenchement PRESSOSTAT HP indique une pression de condensation trop élevée. Causes : condenseur sale ou encrassé, ventilateurs en panne, excès de charge frigorigène, air incondensable dans le circuit, ou température ambiante trop élevée."
   },
   "remediation_vers": "g7",
   "code": "4.05",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g7-v6_057",
   "dc": "G7",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le pressostat HP est un organe de :",
   "choix": [
    "Régulation uniquement",
    "Sécurité (protection contre la surpression)",
    "Mesure de débit",
    "Commande du ventilateur"
   ],
   "bonne": 1,
   "explication": "Sécurité — Le pressostat HP est avant tout un organe de sécurité qui coupe le compresseur si la pression HP dépasse le seuil dangereux.",
   "aide": "HP trop élevée = danger. Il faut couper immédiatement.",
   "remed": {
    "texte": "Le pressostat HP est avant tout un organe de sécurité qui coupe le compresseur si la pression HP dépasse le seuil dangereux."
   },
   "remediation_vers": "g7",
   "code": "7.04",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g7-71",
   "dc": "G7",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le sous-refroidissement (subcooling) se mesure :",
   "choix": [
    "À la sortie du compresseur",
    "À l'entrée de l'évaporateur",
    "À la sortie du condenseur",
    "À l'aspiration"
   ],
   "bonne": 2,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g7",
   "code": "7.07",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-v6_039",
   "dc": "G8",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans quel organe le fluide absorbe-t-il la chaleur de l'espace à refroidir ?",
   "choix": [
    "Le compresseur",
    "Le condenseur",
    "Le détendeur",
    "L'évaporateur"
   ],
   "bonne": 3,
   "explication": "L'évaporateur — C'est dans l'évaporateur que le fluide absorbe la chaleur, passant de liquide BP à gaz BP = production du froid.",
   "aide": "C'est l'organe qui 'produit le froid' en absorbant la chaleur.",
   "remed": {
    "texte": "C'est dans l'évaporateur que le fluide absorbe la chaleur, passant de liquide BP à gaz BP = production du froid."
   },
   "remediation_vers": "g8",
   "code": "8.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-181",
   "dc": "G8",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Sur une installation frigorifique, comment calculer approximativement la surchauffe à l'aspiration du compresseur ?",
   "choix": [
    "Température de refoulement - Température d'aspiration",
    "Température gaz aspiration - Température d'évaporation (T°O correspondant à la BP)",
    "Température condensation - Température évaporation",
    "Température ambiante - Température d'évaporation"
   ],
   "bonne": 1,
   "explication": "La SURCHAUFFE = Température du gaz en aspiration - Température d'évaporation (T°O). On mesure la température du gaz avec une sonde, et on convertit la pression BP en température avec le tableau…",
   "aide": "La surchauffe compare la température réelle du gaz à sa température de saturation.",
   "remed": {
    "texte": "La SURCHAUFFE = Température du gaz en aspiration - Température d'évaporation (T°O). On mesure la température du gaz avec une sonde, et on convertit la pression BP en température avec le tableau fluide. Une surchauffe de 5 à 10°C est normale."
   },
   "remediation_vers": "g8",
   "code": "8.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-183",
   "dc": "G8",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Une installation affiche une surchauffe très élevée (20°C) et une puissance frigorifique insuffisante. Quelle est la cause la plus probable ?",
   "choix": [
    "Excès de fluide frigorigène",
    "Manque de fluide frigorigène ou détendeur sous-alimenté",
    "Compresseur trop puissant",
    "Condenseur surdimensionné"
   ],
   "bonne": 1,
   "explication": "Une SURCHAUFFE EXCESSIVE (>15°C) indique un manque d'alimentation de l'évaporateur. Causes : manque de charge, détendeur mal réglé (bulbe mal positionné ou défectueux), filtre bouché, ou vanne…",
   "aide": "Une surchauffe excessive indique que l'évaporateur n'est pas assez alimenté en fluide.",
   "remed": {
    "texte": "Une SURCHAUFFE EXCESSIVE (>15°C) indique un manque d'alimentation de l'évaporateur. Causes : manque de charge, détendeur mal réglé (bulbe mal positionné ou défectueux), filtre bouché, ou vanne partiellement fermée. L'évaporateur manque de fluide et la puissance diminue."
   },
   "remediation_vers": "g8",
   "code": "8.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-184",
   "dc": "G8",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Une installation présente une surchauffe nulle ou négative (ligne d'aspiration givrée). Quelle action corrective prioritaire ?",
   "choix": [
    "Ajouter du fluide frigorigène",
    "Diminuer l'ouverture du détendeur ou retirer du fluide (risque de coup de liquide)",
    "Nettoyer le condenseur",
    "Changer le compresseur"
   ],
   "bonne": 1,
   "explication": "Une SURCHAUFFE NULLE OU NÉGATIVE indique un retour de liquide au compresseur. Actions : diminuer l'ouverture du détendeur thermostatique, vérifier le bulbe, ou retirer du fluide si excès de charge.",
   "aide": "Une surchauffe nulle ou négative signifie que du liquide arrive au compresseur = danger !",
   "remed": {
    "texte": "Une SURCHAUFFE NULLE OU NÉGATIVE indique un retour de liquide au compresseur. Actions : diminuer l'ouverture du détendeur thermostatique, vérifier le bulbe, ou retirer du fluide si excès de charge. Risque de destruction du compresseur par coup de liquide !"
   },
   "remediation_vers": "g8",
   "code": "8.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-178",
   "dc": "G8",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous constatez que l'évaporateur givre complètement en fonctionnement. Quelle peut être la cause ?",
   "choix": [
    "Excès de fluide frigorigène",
    "Manque de débit d'air, filtre à air encrassé, ou ventilateurs arrêtés",
    "Compresseur trop puissant",
    "Condenseur encrassé"
   ],
   "bonne": 1,
   "explication": "Un ÉVAPORATEUR GIVRÉ indique que l'air ne circule pas suffisamment ou que la température d'évaporation est trop basse.",
   "aide": "Un évaporateur givré ne peut plus fonctionner correctement. L'air ne passe plus.",
   "remed": {
    "texte": "Un ÉVAPORATEUR GIVRÉ indique que l'air ne circule pas suffisamment ou que la température d'évaporation est trop basse. Causes : filtre à air encrassé, ventilateurs arrêtés ou lents, débit d'air insuffisant, détendeur mal réglé, ou température de consigne trop basse."
   },
   "remediation_vers": "g8",
   "code": "8.09",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-v6_043",
   "dc": "G8",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Une surchauffe insuffisante à l'aspiration du compresseur risque de provoquer :",
   "choix": [
    "Un manque de puissance",
    "Des coups de liquide",
    "Une surchauffe du moteur",
    "Un bruit de cavitation"
   ],
   "bonne": 1,
   "explication": "Des coups de liquide — Si la surchauffe est trop faible, du liquide peut arriver au compresseur, provoquant des coups de liquide destructeurs.",
   "aide": "Le compresseur est conçu pour comprimer du gaz, pas du liquide.",
   "remed": {
    "texte": "Si la surchauffe est trop faible, du liquide peut arriver au compresseur, provoquant des coups de liquide destructeurs."
   },
   "remediation_vers": "g8",
   "code": "8.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-166",
   "dc": "G8",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Sur une installation en fonctionnement, vous constatez que la ligne d'aspiration est chaude. Qu'est-ce que cela peut indiquer ?",
   "choix": [
    "L'installation fonctionne correctement",
    "Manque de fluide frigorigène ou problème de détendeur (surchauffe trop importante)",
    "Excès de fluide frigorigène",
    "Compresseur défectueux"
   ],
   "bonne": 1,
   "explication": "Une ligne d'aspiration CHAUDE indique une SURCHAUFFE excessive. Cela peut être dû à un manque de fluide frigorigène, un détendeur mal réglé ou bouché, ou un évaporateur encrassé.",
   "aide": "La ligne d'aspiration doit normalement être froide ou légèrement tiède, pas chaude.",
   "remed": {
    "texte": "Une ligne d'aspiration CHAUDE indique une SURCHAUFFE excessive. Cela peut être dû à un manque de fluide frigorigène, un détendeur mal réglé ou bouché, ou un évaporateur encrassé. Le compresseur aspire du gaz trop chaud, ce qui diminue l'efficacité."
   },
   "remediation_vers": "g8",
   "code": "8.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-167",
   "dc": "G8",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous observez du givre sur la ligne d'aspiration jusqu'au compresseur. Que peut indiquer ce symptôme ?",
   "choix": [
    "L'installation fonctionne parfaitement",
    "Retour de liquide au compresseur (surchauffe insuffisante)",
    "Manque de fluide frigorigène",
    "Condenseur encrassé"
   ],
   "bonne": 1,
   "explication": "Du GIVRE sur la ligne d'aspiration indique que du liquide arrive au compresseur (surchauffe trop faible ou nulle).",
   "aide": "Le givre sur la ligne d'aspiration n'est jamais normal. Il indique un problème de surchauffe.",
   "remed": {
    "texte": "Du GIVRE sur la ligne d'aspiration indique que du liquide arrive au compresseur (surchauffe trop faible ou nulle). Causes possibles : excès de charge, détendeur qui laisse passer trop de fluide, évaporateur surdimensionné. Risque de coup de liquide !"
   },
   "remediation_vers": "g8",
   "code": "8.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g8-171",
   "dc": "G8",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un pressostat basse pression (BP) déclenche et arrête le compresseur. Quelle peut être la cause ?",
   "choix": [
    "Excès de fluide frigorigène",
    "Manque de fluide, évaporateur givré, ou filtre bouché",
    "Condenseur encrassé",
    "Compresseur trop puissant"
   ],
   "bonne": 1,
   "explication": "Un déclenchement PRESSOSTAT BP indique une pression d'évaporation trop basse. Causes : manque de charge frigorigène, évaporateur givré ou encrassé, filtre déshydrateur bouché, détendeur mal réglé ou…",
   "aide": "Le pressostat BP protège l'installation contre les pressions trop basses côté évaporateur.",
   "remed": {
    "texte": "Un déclenchement PRESSOSTAT BP indique une pression d'évaporation trop basse. Causes : manque de charge frigorigène, évaporateur givré ou encrassé, filtre déshydrateur bouché, détendeur mal réglé ou bouché, ou débit d'air insuffisant sur l'évaporateur."
   },
   "remediation_vers": "g8",
   "code": "4.05",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "q-g8-70",
   "dc": "G8",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La surchauffe (superheat) se mesure :",
   "choix": [
    "À l'entrée du compresseur",
    "À la sortie du compresseur",
    "À l'entrée du condenseur",
    "À la sortie du détendeur"
   ],
   "bonne": 0,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g8",
   "code": "8.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_049",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le détendeur thermostatique (TEV) régule :",
   "choix": [
    "La pression de condensation",
    "La surchauffe à la sortie de l'évaporateur",
    "Le sous-refroidissement",
    "La pression d'huile"
   ],
   "bonne": 1,
   "explication": "La surchauffe — Le TEV régule la surchauffe en ajustant le débit de fluide entrant dans l'évaporateur via un bulbe capillaire.",
   "aide": "Le bulbe du TEV mesure la température en sortie d'évaporateur.",
   "remed": {
    "texte": "Le TEV régule la surchauffe en ajustant le débit de fluide entrant dans l'évaporateur via un bulbe capillaire."
   },
   "remediation_vers": "g9",
   "code": "9.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_055",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "L'avantage principal du détendeur électronique (EEV) par rapport au TEV est :",
   "choix": [
    "Son coût plus bas",
    "Sa régulation plus précise et rapide",
    "Sa résistance à l'humidité",
    "Son absence de pièces mobiles"
   ],
   "bonne": 1,
   "explication": "Régulation plus précise et rapide — L'EEV est piloté par un régulateur électronique avec des capteurs. Sa réponse est plus fine et rapide que le TEV mécanique.",
   "aide": "L'électronique offre toujours plus de précision que le mécanique.",
   "remed": {
    "texte": "L'EEV est piloté par un régulateur électronique avec des capteurs. Sa réponse est plus fine et rapide que le TEV mécanique."
   },
   "remediation_vers": "g9",
   "code": "9.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_149",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le capillaire est un type de détendeur utilisé dans :",
   "choix": [
    "Les centrales industrielles",
    "Les réfrigérateurs domestiques et petits climatiseurs",
    "Les tours de refroidissement",
    "Les installations transcritiques"
   ],
   "bonne": 1,
   "explication": "Réfrigérateurs domestiques — Le tube capillaire est le détendeur le plus simple : un tube fin de longueur calibrée. Il est utilisé dans les petits équipements.",
   "aide": "Simple, pas de pièces mobiles, mais pas de régulation active.",
   "remed": {
    "texte": "Le tube capillaire est le détendeur le plus simple : un tube fin de longueur calibrée. Il est utilisé dans les petits équipements."
   },
   "remediation_vers": "g9",
   "code": "9.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-187",
   "dc": "G9",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Que peut indiquer un bruit de bullage dans le détendeur thermostatique en fonctionnement ?",
   "choix": [
    "Fonctionnement normal",
    "Flash-gas dans la ligne liquide (manque de sous-refroidissement)",
    "Excès de fluide frigorigène",
    "Compresseur défectueux"
   ],
   "bonne": 1,
   "explication": "Un BULLAGE dans le détendeur indique du FLASH-GAS : le fluide n'est pas totalement liquide à l'entrée du détendeur.",
   "aide": "Le détendeur doit être alimenté en liquide pur. Le bullage indique un problème.",
   "remed": {
    "texte": "Un BULLAGE dans le détendeur indique du FLASH-GAS : le fluide n'est pas totalement liquide à l'entrée du détendeur. Causes : manque de charge, sous-refroidissement insuffisant, perte de charge excessive dans la ligne liquide, ou filtre partiellement bouché. Le détendeur ne peut pas réguler correctement."
   },
   "remediation_vers": "g9",
   "code": "9.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-188",
   "dc": "G9",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Comment diagnostiquer un détendeur thermostatique défectueux (bulbe percé) ?",
   "choix": [
    "La surchauffe devient instable ou très élevée, le détendeur ne régule plus",
    "La haute pression augmente",
    "Le compresseur fait du bruit",
    "L'évaporateur givre complètement"
   ],
   "bonne": 0,
   "explication": "Si le BULBE est PERCÉ, il perd sa charge et ne peut plus piloter le détendeur. Symptômes : surchauffe excessive et instable, le détendeur reste fermé ou presque, l'évaporateur manque de fluide.",
   "aide": "Le bulbe du détendeur thermostatique contient un fluide qui pilote l'ouverture de la vanne.",
   "remed": {
    "texte": "Si le BULBE est PERCÉ, il perd sa charge et ne peut plus piloter le détendeur. Symptômes : surchauffe excessive et instable, le détendeur reste fermé ou presque, l'évaporateur manque de fluide. Solution : remplacer le détendeur ou le bulbe (si possible)."
   },
   "remediation_vers": "g9",
   "code": "9.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_050",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le déshydrateur contient un matériau appelé :",
   "choix": [
    "Charbon actif",
    "Tamis moléculaire",
    "Silicone",
    "Résine échangeuse d'ions"
   ],
   "bonne": 1,
   "explication": "Tamis moléculaire — Le tamis moléculaire absorbe l'humidité et les acides. Il doit être changé à chaque ouverture du circuit.",
   "aide": "C'est un matériau très hygroscopique qui piège les molécules d'eau.",
   "remed": {
    "texte": "Le tamis moléculaire absorbe l'humidité et les acides. Il doit être changé à chaque ouverture du circuit."
   },
   "remediation_vers": "g9",
   "code": "9.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_051",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Une pastille de couleur jaune/marron dans le voyant liquide indique :",
   "choix": [
    "Circuit sec",
    "Présence d'humidité",
    "Température trop élevée",
    "Manque de fluide"
   ],
   "bonne": 1,
   "explication": "Présence d'humidité — Vert = sec (OK), Jaune/marron = humide (problème). L'indicateur colorimétrique change selon le taux d'humidité.",
   "aide": "Vert = bon, jaune = mauvais. Comme un feu tricolore inversé.",
   "remed": {
    "texte": "Vert = sec (OK), Jaune/marron = humide (problème). L'indicateur colorimétrique change selon le taux d'humidité."
   },
   "remediation_vers": "g9",
   "code": "9.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_052",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le pressostat BP peut servir à :",
   "choix": [
    "Réguler la température par cycling du compresseur",
    "Protéger le condenseur",
    "Augmenter la charge en fluide",
    "Mesurer le COP"
   ],
   "bonne": 0,
   "explication": "Réguler la température par cycling — Le pressostat BP peut couper le compresseur quand la pression BP descend trop (= température atteinte), puis le redémarrer quand elle remonte.",
   "aide": "En BP, la pression est liée à la température d'évaporation.",
   "remed": {
    "texte": "Le pressostat BP peut couper le compresseur quand la pression BP descend trop (= température atteinte), puis le redémarrer quand elle remonte."
   },
   "remediation_vers": "g9",
   "code": "1.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_155",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La vanne électromagnétique (solénoïde) sert principalement à :",
   "choix": [
    "Réguler la surchauffe",
    "Couper/ouvrir un circuit de fluide sur commande électrique",
    "Mesurer la pression",
    "Purger le circuit"
   ],
   "bonne": 1,
   "explication": "Couper/ouvrir un circuit — La vanne solénoïde est une vanne tout-ou-rien commandée électriquement. Ex: pump-down, dégivrage.",
   "aide": "Solénoïde = bobine électrique qui actionne un clapet.",
   "remed": {
    "texte": "La vanne solénoïde est une vanne tout-ou-rien commandée électriquement. Ex: pump-down, dégivrage."
   },
   "remediation_vers": "g9",
   "code": "1.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-172",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous devez installer un filtre déshydrateur sur la ligne liquide. Dans quel sens doit-il être monté ?",
   "choix": [
    "Peu importe le sens",
    "Dans le sens de circulation du fluide (indiqué par une flèche)",
    "Toujours vertical",
    "Toujours horizontal"
   ],
   "bonne": 1,
   "explication": "Le filtre déshydrateur doit TOUJOURS être monté dans le SENS DE CIRCULATION du fluide, indiqué par une flèche sur le corps du filtre.",
   "aide": "Les filtres déshydrateurs ont un sens de montage obligatoire.",
   "remed": {
    "texte": "Le filtre déshydrateur doit TOUJOURS être monté dans le SENS DE CIRCULATION du fluide, indiqué par une flèche sur le corps du filtre. Un montage à l'envers peut bloquer le circuit ou endommager le filtre."
   },
   "remediation_vers": "g9",
   "code": "9.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-168",
   "dc": "G9",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous remarquez des bulles dans le voyant liquide en fonctionnement stable. Qu'est-ce que cela signifie généralement ?",
   "choix": [
    "Le circuit fonctionne correctement",
    "Manque de fluide frigorigène ou sous-refroidissement insuffisant",
    "Excès de fluide frigorigène",
    "Problème d'huile"
   ],
   "bonne": 1,
   "explication": "Des BULLES dans le voyant liquide indiquent que le fluide n'est pas totalement liquide (flash-gas). Causes : manque de charge, sous-refroidissement insuffisant, perte de charge excessive dans la…",
   "aide": "Les bulles dans le voyant liquide ne sont jamais un bon signe en fonctionnement stable.",
   "remed": {
    "texte": "Des BULLES dans le voyant liquide indiquent que le fluide n'est pas totalement liquide (flash-gas). Causes : manque de charge, sous-refroidissement insuffisant, perte de charge excessive dans la ligne liquide, ou détendeur trop proche du condenseur. Risque de mauvais fonctionnement du détendeur."
   },
   "remediation_vers": "g9",
   "code": "1.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-161",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quel accessoire permet de retenir l'humidité dans un circuit frigorifique ?",
   "choix": [
    "Le voyant liquide",
    "Le filtre déshydrateur",
    "Le pressostat",
    "Le ventilateur"
   ],
   "bonne": 1,
   "explication": "Le FILTRE DÉSHYDRATEUR contient des tamis moléculaires qui absorbent l'humidité présente dans le circuit. Il protège le détendeur et le compresseur du givrage et de la corrosion.",
   "aide": "L'humidité est l'ennemi du froid. Cet accessoire la piège.",
   "remed": {
    "texte": "Le FILTRE DÉSHYDRATEUR contient des tamis moléculaires qui absorbent l'humidité présente dans le circuit. Il protège le détendeur et le compresseur du givrage et de la corrosion."
   },
   "remediation_vers": "g9",
   "code": "9.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-162",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "À quoi sert un voyant liquide dans un circuit frigorifique ?",
   "choix": [
    "À mesurer la température",
    "À observer l'état du fluide (bulles, couleur) et détecter d'éventuels problèmes",
    "À régler la pression",
    "À arrêter le compresseur"
   ],
   "bonne": 1,
   "explication": "Le VOYANT LIQUIDE permet de visualiser l'état du fluide frigorigène dans la ligne liquide : présence de bulles (manque de charge), changement de couleur de l'indicateur d'humidité, aspect du fluide.",
   "aide": "C'est un hublot transparent qui permet de voir ce qui se passe dans la ligne liquide.",
   "remed": {
    "texte": "Le VOYANT LIQUIDE permet de visualiser l'état du fluide frigorigène dans la ligne liquide : présence de bulles (manque de charge), changement de couleur de l'indicateur d'humidité, aspect du fluide. C'est un outil de diagnostic visuel."
   },
   "remediation_vers": "g9",
   "code": "1.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_053",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La vanne 4 voies permet :",
   "choix": [
    "De réguler le débit",
    "D'inverser le sens du cycle (mode chaud/froid)",
    "De purger l'huile",
    "De shunter le compresseur"
   ],
   "bonne": 1,
   "explication": "D'inverser le sens du cycle — La vanne 4 voies permute les rôles de l'échangeur intérieur et extérieur : l'évaporateur devient condenseur et inversement (mode PAC).",
   "aide": "C'est le composant clé des pompes à chaleur réversibles.",
   "remed": {
    "texte": "La vanne 4 voies permute les rôles de l'échangeur intérieur et extérieur : l'évaporateur devient condenseur et inversement (mode PAC)."
   },
   "remediation_vers": "g9",
   "code": "1.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_151",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le déshydrateur doit être remplacé :",
   "choix": [
    "Tous les ans systématiquement",
    "À chaque ouverture du circuit",
    "Uniquement si le voyant indique de l'humidité",
    "Jamais"
   ],
   "bonne": 1,
   "explication": "À chaque ouverture du circuit — Chaque fois que le circuit est ouvert, de l'humidité entre. Le déshydrateur doit être changé pour l'absorber.",
   "aide": "L'ouverture du circuit = entrée d'air humide = nouveau déshydrateur.",
   "remed": {
    "texte": "Chaque fois que le circuit est ouvert, de l'humidité entre. Le déshydrateur doit être changé pour l'absorber."
   },
   "remediation_vers": "g9",
   "code": "9.08",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-v6_154",
   "dc": "G9",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le voyant liquide est placé :",
   "choix": [
    "En sortie de compresseur",
    "En sortie de condenseur, avant le détendeur",
    "En sortie d'évaporateur",
    "Sur le circuit d'huile"
   ],
   "bonne": 1,
   "explication": "En sortie de condenseur, avant le détendeur — Il est placé sur la ligne liquide pour vérifier que le fluide arrive bien sous forme liquide au détendeur.",
   "aide": "Le voyant surveille la qualité du liquide avant la détente.",
   "remed": {
    "texte": "Il est placé sur la ligne liquide pour vérifier que le fluide arrive bien sous forme liquide au détendeur."
   },
   "remediation_vers": "g9",
   "code": "1.05",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g9-189",
   "dc": "G9",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Sur une installation avec détendeur électronique, quel paramètre principal pilote l'ouverture de la vanne ?",
   "choix": [
    "La pression du condenseur",
    "La surchauffe mesurée par des sondes de température et de pression",
    "La température ambiante",
    "Le niveau d'huile du compresseur"
   ],
   "bonne": 1,
   "explication": "Le DÉTENDEUR ÉLECTRONIQUE régule l'ouverture de la vanne en fonction de la SURCHAUFFE calculée par un calculateur à partir de sondes de température et de pression.",
   "aide": "Les détendeurs électroniques régulent avec précision grâce à des sondes et un calculateur.",
   "remed": {
    "texte": "Le DÉTENDEUR ÉLECTRONIQUE régule l'ouverture de la vanne en fonction de la SURCHAUFFE calculée par un calculateur à partir de sondes de température et de pression. Il est plus précis qu'un détendeur thermostatique et permet d'optimiser l'efficacité de l'installation."
   },
   "remediation_vers": "g9",
   "code": "9.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g10-v6_061",
   "dc": "G10",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pourquoi brase-t-on toujours sous flux d'azote ?",
   "choix": [
    "Pour refroidir plus vite",
    "Pour éviter l'oxydation intérieure du cuivre (calamine)",
    "Pour tester l'étanchéité",
    "Pour sécher le circuit"
   ],
   "bonne": 1,
   "explication": "Éviter l'oxydation intérieure — Sans azote, l'oxygène de l'air réagit avec le cuivre chauffé et forme de la calamine noire qui bouchera les filtres et endommagera le compresseur.",
   "aide": "La calamine est l'ennemi n°1 du circuit après un brasage.",
   "remed": {
    "texte": "Sans azote, l'oxygène de l'air réagit avec le cuivre chauffé et forme de la calamine noire qui bouchera les filtres et endommagera le compresseur."
   },
   "remediation_vers": "g10",
   "code": "10.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g10-v6_065",
   "dc": "G10",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pour un brasage cuivre-cuivre, l'alliage d'apport utilisé est généralement :",
   "choix": [
    "Étain-plomb",
    "Cuivre-phosphore",
    "Acier inoxydable",
    "Aluminium"
   ],
   "bonne": 1,
   "explication": "Cuivre-phosphore — Pour les joints Cu-Cu, on utilise un alliage cuivre-phosphore (type BCuP). Pour Cu-acier, on utilise un alliage argent.",
   "aide": "Le phosphore sert de décapant naturel sur le cuivre.",
   "remed": {
    "texte": "Pour les joints Cu-Cu, on utilise un alliage cuivre-phosphore (type BCuP). Pour Cu-acier, on utilise un alliage argent."
   },
   "remediation_vers": "g10",
   "code": "10.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g10-87",
   "dc": "G10",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le cintrage d'un tube cuivre frigorifique doit se faire :",
   "choix": [
    "À froid avec cintreuse",
    "À chaud avec chalumeau",
    "À la main sans outil",
    "Les deux premières méthodes"
   ],
   "bonne": 0,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g10",
   "hors_ref": "cintrage : geste métier ; le groupe 10 ne couvre que le brasage (10.01) et les supports (10.02)"
  },
  {
   "id": "q-g10-84",
   "dc": "G10",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le surfaçage des collets (dudgeonnage) doit être réalisé avec :",
   "choix": [
    "N'importe quel outil",
    "Une dudgeonnoire calibrée",
    "Un marteau et un burin",
    "Une pince multiprise"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g10",
   "hors_ref": "dudgeonnage : raccord mécanique, hors du groupe 10 (brasage, supports)"
  },
  {
   "id": "q-g10-v6_157",
   "dc": "G10",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Lors du raccordement d'un flexible sur une vanne Schrader, il faut d'abord :",
   "choix": [
    "Serrer à fond",
    "Purger l'air du flexible",
    "Ouvrir la vanne en grand",
    "Faire un tirage au vide du flexible"
   ],
   "bonne": 1,
   "explication": "Purger l'air du flexible — Avant tout raccordement, il faut purger l'air du flexible pour ne pas introduire d'incondensables dans le circuit.",
   "aide": "L'air dans le flexible = incondensable dans le circuit.",
   "remed": {
    "texte": "Avant tout raccordement, il faut purger l'air du flexible pour ne pas introduire d'incondensables dans le circuit."
   },
   "remediation_vers": "g10",
   "hors_ref": "raccordement sur vanne Schrader : geste métier non listé à l'annexe II.B"
  },
  {
   "id": "q-g10-69",
   "dc": "G10",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Lors d'un brasage, pourquoi faut-il balayer à l'azote ?",
   "choix": [
    "Pour refroidir le tube",
    "Pour éviter l'oxydation interne",
    "Pour tester l'étanchéité",
    "Pour nettoyer le circuit"
   ],
   "bonne": 1,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g10",
   "code": "10.01",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g11-v6_033",
   "dc": "G11",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un fluide classé A2L est :",
   "choix": [
    "Non inflammable, non toxique",
    "Légèrement inflammable, faible toxicité",
    "Très inflammable, faible toxicité",
    "Légèrement inflammable, toxicité élevée"
   ],
   "bonne": 1,
   "explication": "Légèrement inflammable, faible toxicité — A = faible toxicité, 2L = légèrement inflammable (vitesse de flamme < 10 cm/s). Ex: R32, R1234yf.",
   "aide": "A = toxicité, le chiffre = inflammabilité. L = lower (plus faible).",
   "remed": {
    "texte": "A = faible toxicité, 2L = légèrement inflammable (vitesse de flamme < 10 cm/s). Ex: R32, R1234yf."
   },
   "remediation_vers": "g11",
   "code": "11.03",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g11-v6_140",
   "dc": "G11",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La vitesse de flamme maximale pour un fluide classé A2L est de :",
   "choix": [
    "1 cm/s",
    "5 cm/s",
    "10 cm/s",
    "30 cm/s"
   ],
   "bonne": 2,
   "explication": "10 cm/s — Le 'L' de A2L signifie 'Lower flammability' : vitesse de flamme < 10 cm/s. C'est le seuil de la sous-classe 2L.",
   "aide": "Le L = limite basse — vitesse de flamme plus lente que les inflammables classiques.",
   "remed": {
    "texte": "Le 'L' de A2L signifie 'Lower flammability' : vitesse de flamme < 10 cm/s. C'est le seuil de la sous-classe 2L."
   },
   "remediation_vers": "g11",
   "code": "11.03",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g11-54",
   "dc": "G11",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le R290 (propane) est classé :",
   "choix": [
    "A1",
    "A2L",
    "A2",
    "A3"
   ],
   "bonne": 3,
   "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
   "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
   "remediation_vers": "g11",
   "code": "11.03",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g11-v6_030",
   "dc": "G11",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Les HFO (hydrofluoro-oléfines) se caractérisent par :",
   "choix": [
    "Un GWP très élevé",
    "Un ODP élevé",
    "Un GWP très bas (<10)",
    "Une toxicité extrême"
   ],
   "bonne": 2,
   "explication": "Un GWP très bas (<10) — Les HFO comme le R1234yf (GWP 4) ou R1234ze (GWP 7) ont un GWP quasi nul car ils se dégradent rapidement dans l'atmosphère.",
   "aide": "Les HFO sont la génération de fluides la plus récente — avec un impact climatique minimal.",
   "remed": {
    "texte": "Les HFO comme le R1234yf (GWP 4) ou R1234ze (GWP 7) ont un GWP quasi nul car ils se dégradent rapidement dans l'atmosphère."
   },
   "remediation_vers": "g11",
   "code": "11.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g11-v6_035",
   "dc": "G11",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un remplacement 'drop-in' signifie :",
   "choix": [
    "Changer le fluide sans modifier l'installation",
    "Changer le fluide et l'huile",
    "Modifier le détendeur et l'huile",
    "Remplacer tout le circuit"
   ],
   "bonne": 0,
   "explication": "Changer le fluide sans modifier l'installation",
   "aide": "'Drop-in' = littéralement 'poser dedans' sans rien toucher.",
   "remed": {
    "texte": "Un drop-in est un remplacement direct, sans modification de composant. En pratique, c'est rare et souvent il faut au moins changer l'huile."
   },
   "remediation_vers": "g11",
   "code": "11.01",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g11-v6_092",
   "dc": "G11",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La norme EN 378 définit entre autres :",
   "choix": [
    "Les prix des fluides",
    "Les charges maximales de fluide selon le local et la classe de sécurité",
    "Les horaires d'intervention",
    "Les salaires des techniciens"
   ],
   "bonne": 1,
   "explication": "Les charges maximales selon local et classe de sécurité",
   "aide": "C'est la norme européenne centrale pour la sécurité du froid.",
   "remed": {
    "texte": "EN 378 est LA norme de référence pour la sécurité des installations frigorifiques en Europe."
   },
   "remediation_vers": "g11",
   "code": "11.03",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g11-185",
   "dc": "G11",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Comment optimiser le COP (Coefficient de Performance) d'une installation frigorifique ?",
   "choix": [
    "Augmenter la haute pression au maximum",
    "Diminuer l'écart entre T°K (condensation) et T°O (évaporation)",
    "Augmenter la surchauffe au maximum",
    "Diminuer le débit d'air sur le condenseur"
   ],
   "bonne": 1,
   "explication": "Le COP (efficacité énergétique) est meilleur quand l'écart T°K - T°O est FAIBLE. Pour optimiser : baisser la T°K (condenseur propre, bon refroidissement) et augmenter la T°O si possible (évaporateur…",
   "aide": "Le COP dépend directement de l'écart de température entre condenseur et évaporateur.",
   "remed": {
    "texte": "Le COP (efficacité énergétique) est meilleur quand l'écart T°K - T°O est FAIBLE. Pour optimiser : baisser la T°K (condenseur propre, bon refroidissement) et augmenter la T°O si possible (évaporateur surdimensionné, bon dégivrage). Moins le compresseur force, mieux c'est !"
   },
   "remediation_vers": "g11",
   "code": "11.02",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g11-v6_047",
   "dc": "G11",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le COP d'une installation frigorifique se calcule par :",
   "choix": [
    "COP = P_élec / P_frigo",
    "COP = P_frigo / P_élec",
    "COP = P_frigo × P_élec",
    "COP = P_frigo − P_élec"
   ],
   "bonne": 1,
   "explication": "COP = P_frigo / P_élec — Le COP est le rapport entre la puissance frigorifique produite et la puissance électrique consommée. Un COP de 3 = 3 kW de froid pour 1 kW d'électricité.",
   "aide": "C'est un rapport 'ce qu'on obtient / ce qu'on dépense'.",
   "remed": {
    "texte": "Le COP est le rapport entre la puissance frigorifique produite et la puissance électrique consommée. Un COP de 3 = 3 kW de froid pour 1 kW d'électricité."
   },
   "remediation_vers": "g11",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g11-v6_147",
   "dc": "G11",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La puissance calorifique au condenseur est égale à :",
   "choix": [
    "P_frigo uniquement",
    "P_élec uniquement",
    "P_frigo + P_élec",
    "P_frigo − P_élec"
   ],
   "bonne": 2,
   "explication": "P_frigo + P_élec — Le condenseur rejette la somme de la chaleur absorbée à l'évaporateur + l'énergie apportée par le compresseur.",
   "aide": "C'est le bilan énergétique du cycle : tout ce qui entre doit sortir.",
   "remed": {
    "texte": "Le condenseur rejette la somme de la chaleur absorbée à l'évaporateur + l'énergie apportée par le compresseur."
   },
   "remediation_vers": "g11",
   "code": "1.02",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "q-g11-v6_183",
   "dc": "G11",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La norme EN 378 classe les locaux en :",
   "choix": [
    "2 catégories",
    "3 catégories (a, b, c) selon l'occupation",
    "5 catégories",
    "10 catégories"
   ],
   "bonne": 1,
   "explication": "3 catégories — Catégorie a = accès public général. b = accès restreint. c = personnel autorisé uniquement. La charge maximale dépend de la catégorie.",
   "aide": "Plus le public est exposé, plus les restrictions sont sévères.",
   "remed": {
    "texte": "Catégorie a = accès public général. b = accès restreint. c = personnel autorisé uniquement. La charge maximale dépend de la catégorie."
   },
   "remediation_vers": "g11",
   "code": "11.03",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g12-v6_091",
   "dc": "G12",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La charge maximale en R290 (propane) dans un local accessible au public est très limitée car :",
   "choix": [
    "Son GWP est élevé",
    "Il est très inflammable (classe A3)",
    "Il est toxique",
    "Il corrode le cuivre"
   ],
   "bonne": 1,
   "explication": "Très inflammable (A3) — Le R290 est un hydrocarbure hautement inflammable. La norme EN 378 limite strictement les charges dans les locaux occupés.",
   "aide": "Propane = gaz domestique = très inflammable.",
   "remed": {
    "texte": "Le R290 est un hydrocarbure hautement inflammable. La norme EN 378 limite strictement les charges dans les locaux occupés."
   },
   "remediation_vers": "g12",
   "code": "12.03",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g12-v6_181",
   "dc": "G12",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le R600a (isobutane) est utilisé principalement dans :",
   "choix": [
    "Les centrales industrielles",
    "Les réfrigérateurs et congélateurs domestiques",
    "Les climatiseurs split",
    "Les pompes à chaleur air-eau"
   ],
   "bonne": 1,
   "explication": "Réfrigérateurs domestiques — Le R600a est le fluide standard des réfrigérateurs modernes. Charges très faibles (50-150g) pour limiter le risque d'inflammation.",
   "aide": "Presque tous les frigos neufs fonctionnent au R600a.",
   "remed": {
    "texte": "Le R600a est le fluide standard des réfrigérateurs modernes. Charges très faibles (50-150g) pour limiter le risque d'inflammation."
   },
   "remediation_vers": "g12",
   "code": "1.07",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g12-v6_093",
   "dc": "G12",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Les fluides A2L comme le R32 nécessitent :",
   "choix": [
    "Aucune précaution particulière",
    "Un outillage adapté et une formation spécifique",
    "Un local ATEX systématique",
    "Un détecteur d'ammoniac"
   ],
   "bonne": 1,
   "explication": "Outillage adapté et formation spécifique — Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante.",
   "aide": "'Légèrement inflammable' ne veut pas dire 'sans risque'.",
   "remed": {
    "texte": "Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante."
   },
   "remediation_vers": "g12",
   "code": "12.02",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g12-v6_184",
   "dc": "G12",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pour les fluides A2L, les outils d'intervention doivent être :",
   "choix": [
    "Standards",
    "Adaptés (pas de source d'ignition, ventilation)",
    "Uniquement manuels (pas d'électricité)",
    "En matériaux composites"
   ],
   "bonne": 1,
   "explication": "Adaptés — Les fluides A2L nécessitent des outils sans source d'ignition, une ventilation adéquate et des détecteurs de gaz sur le lieu d'intervention.",
   "aide": "'Légèrement inflammable' impose des précautions, même si le risque est modéré.",
   "remed": {
    "texte": "Les fluides A2L nécessitent des outils sans source d'ignition, une ventilation adéquate et des détecteurs de gaz sur le lieu d'intervention."
   },
   "remediation_vers": "g12",
   "code": "12.02",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g12-291",
   "dc": "G12",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous devez braser sur un circuit au R-32 (A2L). Quelles précautions prenez-vous avant d'allumer le chalumeau ?",
   "choix": [
    "Aucune, le R-32 est peu inflammable",
    "Récupérer le fluide, inerter à l'azote, ventiler, supprimer toute source d'ignition",
    "Ouvrir une fenêtre et braser rapidement",
    "Braser directement, le circuit est fermé"
   ],
   "bonne": 1,
   "explication": "Un fluide A2L reste inflammable : on récupère, on inerte à l'azote et on supprime toute source d'ignition avant la flamme.",
   "aide": "Brasage A2L = précautions strictes.",
   "remediation_vers": "g12",
   "code": "12.06",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g12-286",
   "dc": "G12",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi ne doit-on jamais approcher une flamme d'un circuit contenant un fluide A2L ou A3 non inerté ?",
   "choix": [
    "Parce qu'il est interdit de fumer sur un chantier",
    "Parce que le fluide peut s'enflammer et se décomposer en gaz toxiques",
    "Parce que la fumée salit l'installation",
    "Parce que l'odeur est désagréable"
   ],
   "bonne": 1,
   "explication": "Double risque : inflammation du fluide, et décomposition thermique produisant des gaz toxiques (dont acide fluorhydrique).",
   "aide": "Fluides inflammables = double danger.",
   "remediation_vers": "g12",
   "code": "12.04",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "q-g12-289",
   "dc": "G12",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Quelle est la différence entre un fluide A2L (R-32) et un fluide A3 (R-290) ?",
   "choix": [
    "Aucune, les deux classes sont équivalentes",
    "A3 est hautement inflammable (propagation rapide) ; A2L l'est faiblement (propagation lente)",
    "A2L est toxique, A3 ne l'est pas",
    "A3 produit plus de froid"
   ],
   "bonne": 1,
   "explication": "Le R-290 est A3 : très inflammable. Le R-32 est A2L : faiblement inflammable, vitesse de flamme ≤ 10 cm/s. Piège classique.",
   "aide": "Classification distingue niveaux inflammabilité.",
   "remediation_vers": "g12",
   "code": "1.08",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g13-v6_088",
   "dc": "G13",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Le point critique du CO₂ se situe à :",
   "choix": [
    "0°C / 1 bar",
    "31°C / 73,8 bar",
    "-33°C / 1 bar",
    "100°C / 100 bar"
   ],
   "bonne": 1,
   "explication": "31°C / 73,8 bar — Au-dessus de 31°C et 73,8 bar, le CO₂ est supercritique (ni liquide ni gaz). C'est ce qui rend le CO₂ transcritique si particulier.",
   "aide": "C'est une température proche de l'ambiante, ce qui complique la condensation.",
   "remed": {
    "texte": "Au-dessus de 31°C et 73,8 bar, le CO₂ est supercritique (ni liquide ni gaz). C'est ce qui rend le CO₂ transcritique si particulier."
   },
   "remediation_vers": "g13",
   "code": "1.09"
  },
  {
   "id": "q-g13-v6_089",
   "dc": "G13",
   "niveau": 2,
   "type": "qcm",
   "enonce": "En fonctionnement transcritique, le condenseur est remplacé par :",
   "choix": [
    "Un évaporateur",
    "Un refroidisseur de gaz (gas cooler)",
    "Un économiseur",
    "Un absorbeur"
   ],
   "bonne": 1,
   "explication": "Un refroidisseur de gaz — En transcritique, le CO₂ ne se condense pas (T° > 31°C). On refroidit simplement le gaz HP dans un échangeur appelé gas cooler.",
   "aide": "Au-dessus du point critique, il n'y a pas de changement de phase.",
   "remed": {
    "texte": "En transcritique, le CO₂ ne se condense pas (T° > 31°C). On refroidit simplement le gaz HP dans un échangeur appelé gas cooler."
   },
   "remediation_vers": "g13",
   "code": "1.09"
  },
  {
   "id": "q-g13-v6_185",
   "dc": "G13",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le principal avantage environnemental du CO₂ comme fluide frigorigène est :",
   "choix": [
    "Son coût très bas",
    "Son GWP de 1",
    "Sa haute pression",
    "Sa couleur verte"
   ],
   "bonne": 1,
   "explication": "Son GWP de 1 — Le CO₂ a le GWP de référence (1). Même en cas de fuite totale, l'impact climatique est négligeable par rapport aux HFC.",
   "aide": "GWP = 1 = impact minimal. C'est la référence même du calcul.",
   "remed": {
    "texte": "Le CO₂ a le GWP de référence (1). Même en cas de fuite totale, l'impact climatique est négligeable par rapport aux HFC."
   },
   "remediation_vers": "g13",
   "code": "2.02",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "q-g13-v6_090",
   "dc": "G13",
   "niveau": 1,
   "type": "qcm",
   "enonce": "L'ammoniac (R717) est classé :",
   "choix": [
    "A1 (non toxique, non inflammable)",
    "A2L (légèrement inflammable)",
    "B2L (toxique, légèrement inflammable)",
    "B3 (toxique, très inflammable)"
   ],
   "bonne": 2,
   "explication": "B2L — L'ammoniac est classé B (toxicité élevée) et 2L (légèrement inflammable). Il nécessite des précautions strictes.",
   "aide": "B = toxique. L'odeur caractéristique permet la détection rapide.",
   "remed": {
    "texte": "L'ammoniac est classé B (toxicité élevée) et 2L (légèrement inflammable). Il nécessite des précautions strictes."
   },
   "remediation_vers": "g13",
   "hors_ref": "relève du groupe 14 (ammoniac), hors des catégories A1/A2/D/E de ce pack"
  },
  {
   "id": "q-g13-v6_094",
   "dc": "G13",
   "niveau": 1,
   "type": "qcm",
   "enonce": "L'ammoniac est principalement utilisé dans :",
   "choix": [
    "La climatisation résidentielle",
    "Le froid industriel (entrepôts, agroalimentaire)",
    "Les véhicules",
    "Les réfrigérateurs domestiques"
   ],
   "bonne": 1,
   "explication": "Le froid industriel — L'ammoniac est le fluide de référence du froid industriel (entrepôts, chambres froides, agroalimentaire) grâce à ses excellentes propriétés thermodynamiques.",
   "aide": "C'est un fluide puissant mais qui nécessite des installations spécifiques.",
   "remed": {
    "texte": "L'ammoniac est le fluide de référence du froid industriel (entrepôts, chambres froides, agroalimentaire) grâce à ses excellentes propriétés thermodynamiques."
   },
   "remediation_vers": "g13",
   "hors_ref": "relève du groupe 14 (ammoniac), hors des catégories A1/A2/D/E de ce pack"
  },
  {
   "id": "q-g13-v6_182",
   "dc": "G13",
   "niveau": 1,
   "type": "qcm",
   "enonce": "L'ammoniac peut être détecté facilement par :",
   "choix": [
    "Sa couleur bleue",
    "Son odeur très caractéristique (piquante)",
    "Son goût sucré",
    "Sa luminescence"
   ],
   "bonne": 1,
   "explication": "Son odeur piquante — L'ammoniac a une odeur extrêmement reconnaissable et détectable à très faible concentration (5 ppm). C'est un avantage pour la sécurité.",
   "aide": "L'odeur est le premier système d'alerte naturel.",
   "remed": {
    "texte": "L'ammoniac a une odeur extrêmement reconnaissable et détectable à très faible concentration (5 ppm). C'est un avantage pour la sécurité."
   },
   "remediation_vers": "g13",
   "hors_ref": "relève du groupe 14 (ammoniac), hors des catégories A1/A2/D/E de ce pack"
  },
  {
   "id": "q-g13-283",
   "dc": "G13",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pourquoi installe-t-on des détecteurs de CO₂ dans les locaux abritant une installation au R-744 ?",
   "choix": [
    "Pour mesurer la performance de l'installation",
    "Parce que le CO₂ est inodore et incolore : sans appareil, une fuite est indétectable et le risque est l'asphyxie",
    "Parce que la réglementation impose un détecteur pour tous les fluides",
    "Pour compter les ouvertures de porte"
   ],
   "bonne": 1,
   "explication": "Le CO₂ ne se voit pas et ne se sent pas : en cas de fuite dans un local fermé, il remplace l'air sans prévenir. Seul un détecteur alerte avant l'asphyxie.",
   "aide": "CO2 invisible et inodore.",
   "remediation_vers": "g13",
   "code": "13.14"
  },
  {
   "id": "q-g13-v6_180",
   "dc": "G13",
   "niveau": 2,
   "type": "qcm",
   "enonce": "En mode sous-critique, le CO₂ fonctionne :",
   "choix": [
    "Toujours au-dessus de 31°C",
    "Comme un fluide classique avec condensation",
    "Sans compresseur",
    "Sans détendeur"
   ],
   "bonne": 1,
   "explication": "Comme un fluide classique — Quand la température extérieure est < 25°C environ, le CO₂ peut condenser normalement (mode sous-critique = cycle classique).",
   "aide": "Sous-critique = le CO₂ se comporte 'normalement' quand il fait assez froid dehors.",
   "remed": {
    "texte": "Quand la température extérieure est < 25°C environ, le CO₂ peut condenser normalement (mode sous-critique = cycle classique)."
   },
   "remediation_vers": "g13",
   "code": "1.09"
  },
  {
   "id": "q-g13-302",
   "dc": "G13",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi les portes des locaux techniques CO₂ doivent-elles s'ouvrir vers l'extérieur ?",
   "choix": [
    "Pour gagner de la place dans le local",
    "Pour faciliter l'évacuation d'urgence : une porte qui s'ouvre vers l'intérieur peut se bloquer en cas de surpression ou de panique",
    "Pour des raisons esthétiques",
    "Pour empêcher les intrusions"
   ],
   "bonne": 1,
   "explication": "En cas de fuite massive, on doit pouvoir sortir en poussant la porte, même en panique et même si la pression du local a monté. Le sens d'ouverture est un choix de sécurité.",
   "aide": "Conception locaux CO2 intègre éléments sécurité.",
   "remediation_vers": "g13",
   "code": "13.14"
  },
  {
   "id": "pk-g8b-1",
   "dc": "G8",
   "code": "8.03",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un évaporateur est installé avec son pressostat et son régulateur de pression. Une fois l'installation terminée, qu'est-ce qui doit être sans aucune fuite ni émission ?",
   "choix": [
    "L'évaporateur et tout le matériel de contrôle et de sécurité posé avec lui",
    "Seulement le tube de l'évaporateur",
    "Seulement les raccords visibles depuis l'extérieur",
    "Seulement les organes électriques"
   ],
   "bonne": 0,
   "aide": "Relis la première phrase de la fiche : elle ne parle pas seulement du tube.",
   "remed": {
    "regle": "Un évaporateur installé doit fonctionner sans aucune fuite ni émission. Cela vaut pour le tube, mais aussi pour tout le matériel de contrôle et de sécurité posé avec lui.",
    "pourquoi": "Un pressostat ou un régulateur mal raccordé peut fuir, tout comme un tube mal serti. L'exigence porte sur l'ensemble de ce qui est installé.",
    "piege": "Croire que seul le tube frigorifique compte pour l'étanchéité, et négliger les raccords des appareils de contrôle."
   },
   "remediation_vers": "g8b",
   "explication": "Un évaporateur installé doit fonctionner sans aucune fuite ni émission. Cela vaut pour le tube, mais aussi pour tout le matériel de contrôle et de sécurité posé avec lui.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g8b-2",
   "dc": "G8",
   "code": "8.04",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un interrupteur de sécurité et de contrôle détecte une pression qui sort de la plage prévue. Que fait-il ?",
   "choix": [
    "Il déclenche le dégivrage",
    "Il augmente la vitesse du ventilateur",
    "Il coupe l'alimentation électrique du compresseur",
    "Il ouvre le régulateur de pression d'évaporation"
   ],
   "bonne": 2,
   "aide": "C'est un interrupteur électrique. Il agit sur l'alimentation, pas sur la pression elle-même.",
   "remed": {
    "regle": "Les interrupteurs de sécurité et de contrôle, ou pressostats, protègent la machine. Ils coupent l'alimentation électrique du compresseur si la pression sort de la plage prévue.",
    "pourquoi": "Le pressostat met le compresseur à l'arrêt avant qu'une pression anormale ne l'endommage. Il ne régule rien, il coupe.",
    "piege": "Confondre le pressostat, qui coupe, avec le régulateur de pression d'évaporation, qui maintient une pression sans rien couper."
   },
   "remediation_vers": "g8b",
   "explication": "Les interrupteurs de sécurité et de contrôle, ou pressostats, protègent la machine. Ils coupent l'alimentation électrique du compresseur si la pression sort de la plage prévue.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g8b-3",
   "dc": "G8",
   "code": "8.06",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un évaporateur dégivre à l'air chaud. Lors de la visite, que dois-tu inspecter sur le conduit qui transporte cet air ?",
   "choix": [
    "Le niveau d'huile du compresseur",
    "L'étanchéité, l'isolation et l'écoulement des condensats",
    "La pression d'aspiration uniquement",
    "Le débit d'air du ventilateur uniquement"
   ],
   "bonne": 1,
   "aide": "La fiche liste trois points précis à vérifier sur ce conduit.",
   "remed": {
    "regle": "Le conduit de dégivrage à l'air chaud s'inspecte à chaque visite. On vérifie l'étanchéité, l'isolation et l'écoulement des condensats.",
    "pourquoi": "Un conduit percé, mal isolé ou qui laisse stagner les condensats perd son efficacité. Il peut endommager ce qui l'entoure.",
    "piege": "Se contenter de vérifier que l'air chaud sort du conduit, sans contrôler ces trois points précis."
   },
   "remediation_vers": "g8b",
   "explication": "Le conduit de dégivrage à l'air chaud s'inspecte à chaque visite. On vérifie l'étanchéité, l'isolation et l'écoulement des condensats.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g8b-4",
   "dc": "G8",
   "code": "8.11",
   "niveau": 2,
   "type": "qcm",
   "enonce": "La batterie d'un évaporateur est sale et le débit d'air a baissé. Quel est l'effet sur la consommation d'énergie du compresseur ?",
   "choix": [
    "Aucun effet, seule la surchauffe compte",
    "Le dégivrage devient inutile",
    "La pression d'évaporation augmente automatiquement",
    "Le compresseur tourne plus longtemps pour le même résultat"
   ],
   "bonne": 3,
   "aide": "Pense à ce que doit faire le compresseur si l'échange de chaleur devient moins bon.",
   "remed": {
    "regle": "Une batterie sale ou un mauvais débit d'air font tourner le compresseur plus longtemps pour le même résultat. C'est ce qui coûte le plus cher en énergie.",
    "pourquoi": "Moins la batterie échange de chaleur, plus le compresseur doit fonctionner longtemps pour le même froid. Il consomme donc plus.",
    "piege": "Penser que seule la surchauffe détermine l'efficacité énergétique, en oubliant l'état de la batterie et le débit d'air."
   },
   "remediation_vers": "g8b",
   "explication": "Une batterie sale ou un mauvais débit d'air font tourner le compresseur plus longtemps pour le même résultat. C'est ce qui coûte le plus cher en énergie.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g9b-1",
   "dc": "G9",
   "code": "9.04",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Comment un thermostat mécanique détecte-t-il la température ?",
   "choix": [
    "Avec une sonde reliée à un régulateur numérique",
    "Avec un capteur de pression relié à un module",
    "Avec une résistance électrique chauffante",
    "Avec un bulbe relié par un tube fin à des contacts électriques"
   ],
   "bonne": 3,
   "aide": "C'est la version simple et robuste, pas la version numérique.",
   "remed": {
    "regle": "Le thermostat mécanique utilise un bulbe relié par un tube fin à des contacts électriques.",
    "pourquoi": "Cette liaison directe, sans électronique, rend le thermostat mécanique simple et robuste.",
    "piege": "Confondre le bulbe du thermostat mécanique avec la sonde du thermostat électronique. La sonde, elle, est reliée à un régulateur numérique."
   },
   "remediation_vers": "g9b",
   "explication": "Le thermostat mécanique utilise un bulbe relié par un tube fin à des contacts électriques.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g9b-2",
   "dc": "G9",
   "code": "9.07",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vérifier le fonctionnement d'un séparateur d'huile, c'est contrôler quoi ?",
   "choix": [
    "Que l'huile reste bloquée dans le séparateur en permanence",
    "Que l'huile retenue retourne bien, automatiquement, au carter du compresseur",
    "Que le condenseur reçoit un mélange d'huile et de fluide",
    "Que la pression d'aspiration reste constante"
   ],
   "bonne": 1,
   "aide": "Le séparateur ne doit pas garder l'huile pour lui. Il doit la rendre.",
   "remed": {
    "regle": "Le séparateur d'huile retient l'huile, puis la renvoie automatiquement au carter du compresseur dès que le niveau monte. Vérifier son fonctionnement, c'est contrôler que ce retour se fait bien.",
    "pourquoi": "Une huile qui s'accumule plus loin dans le circuit réduit l'échange de chaleur. Elle finit par manquer au compresseur, qui en a besoin pour se lubrifier.",
    "piege": "Croire que le rôle du séparateur s'arrête à retenir l'huile, en oubliant qu'il doit aussi la restituer au compresseur."
   },
   "remediation_vers": "g9b",
   "explication": "Le séparateur d'huile retient l'huile, puis la renvoie automatiquement au carter du compresseur dès que le niveau monte. Vérifier son fonctionnement, c'est contrôler que ce retour se fait bien.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g9b-3",
   "dc": "G9",
   "code": "9.09",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pendant une visite, tu remarques qu'un limiteur de pression ne coupe plus correctement. Tu ne le notes pas dans ton rapport. Quel est le risque, si ce défaut reste sans suite ?",
   "choix": [
    "Le défaut peut endommager le système et provoquer à terme une fuite ou une émission",
    "Aucun, le limiteur se corrige tout seul avec le temps",
    "Le compresseur s'arrête immédiatement par sécurité",
    "Le séparateur d'huile compense automatiquement le défaut"
   ],
   "bonne": 0,
   "aide": "Relis la fin de la fiche : que se passe-t-il quand un défaut n'est pas signalé ?",
   "remed": {
    "regle": "Un défaut non signalé (thermostat qui dérive, limiteur qui ne coupe plus, séparateur qui laisse passer l'huile) finit par endommager le système. À terme, faute de mesure, cela provoque une fuite ou une émission de réfrigérant.",
    "pourquoi": "Le rapport écrit permet d'agir avant que le défaut ne s'aggrave. C'est un outil de prévention, pas une simple formalité.",
    "piege": "Penser qu'un défaut mineur peut attendre la prochaine visite sans conséquence."
   },
   "remediation_vers": "g9b",
   "explication": "Un défaut non signalé (thermostat qui dérive, limiteur qui ne coupe plus, séparateur qui laisse passer l'huile) finit par endommager le système. À terme, faute de mesure, cela provoque une fuite ou une émission de réfrigérant.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g9b-4",
   "dc": "G9",
   "code": "9.10",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un séparateur d'huile laisse l'huile encrasser les échangeurs. Quel est l'effet sur le compresseur ?",
   "choix": [
    "Il s'arrête automatiquement",
    "Il consomme moins d'énergie",
    "Il travaille plus pour le même résultat",
    "Il n'est pas concerné, seul l'évaporateur est affecté"
   ],
   "bonne": 2,
   "aide": "Un échangeur encrassé fait le même travail, mais moins bien.",
   "remed": {
    "regle": "Un séparateur d'huile qui laisse l'huile encrasser les échangeurs fait travailler le compresseur plus, pour le même résultat.",
    "pourquoi": "L'huile qui encrasse un échangeur réduit l'échange de chaleur. Il faut alors plus de temps de fonctionnement pour le même effet, donc plus d'énergie consommée.",
    "piege": "Penser que seul l'entretien de l'évaporateur influence l'efficacité énergétique, en oubliant les organes annexes comme le séparateur d'huile."
   },
   "remediation_vers": "g9b",
   "explication": "Un séparateur d'huile qui laisse l'huile encrasser les échangeurs fait travailler le compresseur plus, pour le même résultat.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g12b-1",
   "dc": "G12",
   "code": "12.07",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous devez rebraser un composant sur un circuit au R-290. Quelle affirmation est vraie ?",
   "choix": [
    "Le R-290 est classé A2L, comme le R-32 : une flamme brève est possible sans risque particulier.",
    "Le R-290 est classé A3, très inflammable : aucune flamme tant que l'inertage à l'azote n'est pas confirmé.",
    "Le R-290 est classé A2, inflammable, mais moins que les hydrocarbures purs.",
    "Le R-290 est classé A1, non inflammable : le risque vient seulement de la pression."
   ],
   "bonne": 1,
   "aide": "Cherchez dans le texte la phrase qui compare le R-290 à un autre fluide.",
   "remed": {
    "regle": "Le R-290 (et le R-600a) sont classés A3 : très inflammables. Aucune flamme n'est autorisée tant que l'inertage à l'azote n'est pas confirmé.",
    "pourquoi": "La classe A3 signale un risque d'inflammation élevé. Contrairement à un A2L comme le R-32, une fuite résiduelle de R-290 s'enflamme facilement au contact d'une flamme.",
    "piege": "Confondre le R-290 avec un A2L parce que c'est un fluide « naturel » perçu comme peu dangereux. C'est l'inverse : c'est le plus inflammable des deux."
   },
   "remediation_vers": "g12b",
   "explication": "Le R-290 (et le R-600a) sont classés A3 : très inflammables. Aucune flamme n'est autorisée tant que l'inertage à l'azote n'est pas confirmé.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g12b-2",
   "dc": "G12",
   "code": "12.09",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Après le tirage au vide, vous fermez la vanne de la pompe. Sur le manomètre, le vide remonte doucement au lieu de rester stable. Que devez-vous conclure ?",
   "choix": [
    "C'est normal, vous pouvez passer directement à la charge du réfrigérant.",
    "C'est le signe que la charge de réfrigérant a été mal pesée.",
    "Il y a un problème sur le circuit : une fuite ou de l'humidité restante.",
    "Le vide remonte toujours un peu, il suffit de refaire l'épreuve à l'azote."
   ],
   "bonne": 2,
   "aide": "Le texte dit ce que signifie un vide qui ne reste pas stable.",
   "remed": {
    "regle": "Si le vide remonte après l'arrêt de la pompe, il y a un problème sur le circuit : une fuite ou de l'humidité restante. On ne charge pas dans ces conditions.",
    "pourquoi": "Un circuit étanche et sec garde un vide stable. Une remontée trahit une entrée d'air par un point non étanche, ou de l'humidité qui s'évapore.",
    "piege": "Continuer la procédure et charger le circuit malgré un vide instable. La charge doit attendre un vide stable, sinon le défaut reste caché."
   },
   "remediation_vers": "g12b",
   "explication": "Si le vide remonte après l'arrêt de la pompe, il y a un problème sur le circuit : une fuite ou de l'humidité restante. On ne charge pas dans ces conditions.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g12b-3",
   "dc": "G12",
   "code": "12.10",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Comment détermine-t-on la quantité de réfrigérant hydrocarbure à charger dans le circuit ?",
   "choix": [
    "Par pesée, selon la valeur indiquée sur la plaque signalétique.",
    "En estimant la quantité à l'oreille, selon le bruit du compresseur.",
    "En remplissant jusqu'à ce que le manomètre baisse.",
    "En reprenant la quantité utilisée lors de la dernière intervention."
   ],
   "bonne": 0,
   "aide": "Le texte dit clairement quelle méthode ne jamais utiliser pour doser la charge.",
   "remed": {
    "regle": "La charge de réfrigérant hydrocarbure se fait par pesée, avec le volume indiqué sur la plaque signalétique.",
    "pourquoi": "La pesée garantit la quantité exacte prévue par le constructeur. Une estimation fait courir un risque de sous-charge ou de surcharge, plus dangereux encore avec un fluide A3.",
    "piege": "Se fier à une impression (bruit, pression observée) au lieu de peser. Avec un hydrocarbure A3, une quantité approximative est un risque de sécurité, pas seulement un problème de performance."
   },
   "remediation_vers": "g12b",
   "explication": "La charge de réfrigérant hydrocarbure se fait par pesée, avec le volume indiqué sur la plaque signalétique.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g12b-4",
   "dc": "G12",
   "code": "12.11",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pour le contrôle d'étanchéité direct d'un circuit au R-290, quel détecteur utilise-t-on ?",
   "choix": [
    "Le détecteur habituel réglé pour les HFC : tous les détecteurs se valent.",
    "N'importe quel détecteur, à condition de doubler la durée du contrôle.",
    "Un détecteur d'azote, puisque le circuit a été inerté à l'azote.",
    "Un détecteur adapté aux hydrocarbures."
   ],
   "bonne": 3,
   "aide": "Relisez la dernière étape avant le rapport : un type de détecteur est écarté.",
   "remed": {
    "regle": "Le contrôle d'étanchéité direct sur un circuit hydrocarbure se fait avec un détecteur adapté aux hydrocarbures.",
    "pourquoi": "Chaque détecteur est calibré pour une famille de gaz. Un détecteur pour HFC classique ne réagit pas correctement à une fuite d'hydrocarbure.",
    "piege": "Utiliser par habitude le détecteur HFC parce que « c'est toujours le même geste ». Avec le mauvais détecteur, une fuite réelle peut passer inaperçue."
   },
   "remediation_vers": "g12b",
   "explication": "Le contrôle d'étanchéité direct sur un circuit hydrocarbure se fait avec un détecteur adapté aux hydrocarbures.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g13-1",
   "dc": "G13",
   "code": "13.01",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le CO₂ (R-744) est classé A1. Quels dangers cette classe n'annonce-t-elle pas ?",
   "choix": [
    "La pression, très élevée, et l'atmosphère irrespirable qu'une fuite crée en local fermé.",
    "Aucun : la classe A1 signifie qu'il est sans danger.",
    "L'inflammabilité, car il peut s'enflammer comme un hydrocarbure.",
    "Uniquement le risque de gel des tuyauteries en fonctionnement normal."
   ],
   "bonne": 0,
   "aide": "A1 renseigne sur deux critères précis. Lesquels ? Et qu'est-ce que cela ne dit pas ?",
   "remed": {
    "regle": "Le CO₂ est A1 : toxicité faible, non inflammable. Ses deux dangers réels sont ailleurs — la pression, très élevée, et l'atmosphère irrespirable en local fermé.",
    "pourquoi": "La classification ne décrit que deux risques : la toxicité et l'inflammabilité. Elle ne dit rien de la pression de service, ni du fait que le CO₂ s'accumule en point bas et agit sur la régulation de la respiration.",
    "piege": "Croire que « A1 » veut dire « sans danger ». « A » signifie toxicité FAIBLE, pas nulle : à forte concentration le CO₂ devient nocif par lui-même, avant même d'avoir chassé assez d'oxygène pour alarmer un détecteur d'oxygène."
   },
   "remediation_vers": "g13",
   "explication": "Le CO₂ est A1 : toxicité faible, non inflammable. Ses deux dangers réels sont ailleurs — la pression, très élevée, et l'atmosphère irrespirable en local fermé.",
   "origine": "pack"
  },
  {
   "id": "pk-g13-2",
   "dc": "G13",
   "code": "14.01",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous sentez une odeur piquante caractéristique dans un local qui abrite une installation à l'ammoniac. Que faites-vous ?",
   "choix": [
    "Vous entrez identifier l'origine de la fuite : votre odorat vous alertera si le seuil devient dangereux.",
    "Vous coupez vous-même l'installation avant de sortir, pour limiter la fuite.",
    "Vous attendez que l'odeur se dissipe avant d'agir.",
    "Vous alertez et vous évacuez, sans intervenir seul."
   ],
   "bonne": 3,
   "aide": "Le texte donne la conduite à tenir en cas de fuite d'ammoniac, juste avant la fin de la fiche.",
   "remed": {
    "regle": "En cas de fuite d'ammoniac : alerter, évacuer, ne jamais intervenir seul.",
    "pourquoi": "L'ammoniac est toxique (le B de B2L). Un titulaire A1/A2 n'a ni la catégorie C, ni l'équipement pour intervenir sur cette installation.",
    "piege": "Se fier à son odorat pour rester sur place, ou vouloir agir seul par réflexe technique. La seule conduite correcte est d'alerter et d'évacuer."
   },
   "remediation_vers": "g13",
   "explication": "En cas de fuite d'ammoniac : alerter, évacuer, ne jamais intervenir seul.",
   "origine": "pack"
  },
  {
   "id": "pk-g13-3",
   "dc": "G13",
   "code": "13.04",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Sur une installation au CO₂, pourquoi ne peut-on pas utiliser le matériel de raccordement courant ?",
   "choix": [
    "Parce que le CO₂ nécessite le même matériel qu'un circuit HFC classique.",
    "Parce que les cylindres de CO₂ sont à double vanne : ils ne se raccordent pas au matériel courant.",
    "Parce que le CO₂, comme l'ammoniac, est un fluide toxique qui impose un matériel étanche renforcé.",
    "Parce qu'il n'existe aucun matériel spécifique pour le CO₂, il faut en fabriquer un sur mesure."
   ],
   "bonne": 1,
   "aide": "Le texte décrit un équipement particulier sur les cylindres de CO₂.",
   "remed": {
    "regle": "Les cylindres de CO₂ sont à double vanne : ils ne se raccordent pas au matériel courant.",
    "pourquoi": "La très haute pression de service du CO₂ impose un matériel et des raccords spécifiques, différents de ceux des circuits HFC. Ce n'est pas une question de toxicité : le CO₂ est A1, son danger est la pression.",
    "piege": "Le croire aussi toxique que l'ammoniac — il ne l'est pas, sa toxicité est faible — mais l'inverse est tout aussi faux : le CO₂ n'est pas inerte, il agit sur la régulation de la respiration et rend l'atmosphère irrespirable en local fermé. Autre piège : croire qu'un raccord HFC classique peut convenir « pour une fois »."
   },
   "remediation_vers": "g13",
   "explication": "Les cylindres de CO₂ sont à double vanne : ils ne se raccordent pas au matériel courant.",
   "origine": "pack"
  },
  {
   "id": "pk-g13-4",
   "dc": "G13",
   "code": "14.01",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous détenez une attestation A1. Sur le site, une fuite se déclare sur l'installation à l'ammoniac. Un collègue vous demande de venir l'aider. Que répondez-vous ?",
   "choix": [
    "D'accord : une attestation A1 permet d'intervenir sur tous les fluides en cas d'urgence.",
    "D'accord, à condition de porter un masque de protection.",
    "Non : l'ammoniac relève de la catégorie C, mon attestation A1/A2 ne donne aucun droit d'intervention dessus.",
    "J'y vais quand même : l'urgence prime sur la catégorie d'attestation."
   ],
   "bonne": 2,
   "aide": "Relisez le bloc « La règle des catégories » : les catégories se remplacent-elles les unes les autres ?",
   "remed": {
    "regle": "Une attestation A1 ou A2 ne donne aucun droit d'intervention sur une installation à l'ammoniac (catégorie C) ou au CO₂ (catégorie B).",
    "pourquoi": "Les catégories d'attestation correspondent à des fluides et des risques différents. Elles ne se remplacent pas les unes les autres, même en urgence.",
    "piege": "Penser qu'une attestation « couvre large » et qu'on peut aider ponctuellement sur un autre fluide. La bonne conduite reste d'alerter et de laisser intervenir les personnes habilitées catégorie C."
   },
   "remediation_vers": "g13",
   "explication": "Une attestation A1 ou A2 ne donne aucun droit d'intervention sur une installation à l'ammoniac (catégorie C) ou au CO₂ (catégorie B).",
   "origine": "pack"
  },
  {
   "id": "pk-g0-1",
   "dc": "G1",
   "code": "1.00",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous voulez intervenir vous-même sur un circuit frigorifique contenant des fluides frigorigènes. Quel document personnel devez-vous posséder ?",
   "choix": [
    "Le registre de l'équipement",
    "L'attestation de capacité",
    "L'attestation d'aptitude",
    "Le certificat DEEE"
   ],
   "bonne": 2,
   "aide": "Un des documents est pour la personne, l'autre pour l'entreprise. Lequel vous concerne, vous ?",
   "remed": {
    "regle": "L'attestation d'aptitude est un document personnel. Elle autorise une personne à intervenir sur les fluides frigorigènes.",
    "pourquoi": "L'entreprise doit avoir un autre document : l'attestation de capacité. Ce sont deux papiers différents, pour deux niveaux différents.",
    "piege": "Confondre les deux attestations. Croire qu'un seul document suffit pour la personne et pour l'entreprise."
   },
   "remediation_vers": "g0",
   "explication": "L'attestation d'aptitude est un document personnel. Elle autorise une personne à intervenir sur les fluides frigorigènes.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "pk-g0-2",
   "dc": "G1",
   "code": "1.00",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un climatiseur trop vieux part au rebut, dans la filière DEEE. Que devient le fluide frigorigène qu'il contient encore ?",
   "choix": [
    "Il doit être récupéré à part, avant que la carcasse parte en DEEE",
    "Il part avec la carcasse, la filière DEEE s'en occupe aussi",
    "Il est automatiquement détruit par le centre de tri DEEE",
    "Il n'y a aucune obligation, la quantité restante est négligeable"
   ],
   "bonne": 0,
   "aide": "La filière DEEE s'occupe d'un objet, la carcasse. Le fluide est une matière. Suivent-ils le même chemin ?",
   "remed": {
    "regle": "La filière DEEE traite la carcasse de l'équipement en fin de vie. Le fluide frigorigène doit être récupéré à part, avant, par un professionnel habilité.",
    "pourquoi": "Le fluide et la carcasse ne suivent pas le même circuit. Les mélanger relâcherait le fluide dans l'environnement.",
    "piege": "Croire que la filière DEEE gère aussi le fluide. Elle ne traite que la carcasse de la machine."
   },
   "remediation_vers": "g0",
   "explication": "La filière DEEE traite la carcasse de l'équipement en fin de vie. Le fluide frigorigène doit être récupéré à part, avant, par un professionnel habilité.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "pk-g1c-1",
   "dc": "G1",
   "code": "1.06",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Les codes R-32 et R-290 se ressemblent. Pourtant leurs classes de sécurité NF EN 378 sont très différentes. Que faut-il comprendre ?",
   "choix": [
    "Le code du fluide donne déjà sa classe de sécurité, inutile de vérifier autre chose",
    "Deux codes proches veulent toujours dire deux dangers proches",
    "La classe NF EN 378 remplace le code : on peut oublier le code une fois la classe connue",
    "Le code décrit la molécule ; la classe NF EN 378 décrit le risque de manipulation : il faut connaître les deux"
   ],
   "bonne": 3,
   "aide": "La fiche parle de deux lectures différentes pour un même fluide. Laquelle donne le risque de manipulation ?",
   "remed": {
    "regle": "Le code du fluide (R-xyz) décrit la molécule. La classe NF EN 378 (A1, A2L, A3…) décrit le risque de manipulation. Il faut toujours lire les deux.",
    "pourquoi": "Des codes proches, comme R-32 et R-290, peuvent cacher des molécules différentes. Donc des classes de sécurité différentes.",
    "piege": "Penser que des codes qui se ressemblent veulent dire des dangers qui se ressemblent. Il faut vérifier la classe à chaque fois."
   },
   "remediation_vers": "g1c",
   "explication": "Le code du fluide (R-xyz) décrit la molécule. La classe NF EN 378 (A1, A2L, A3…) décrit le risque de manipulation. Il faut toujours lire les deux.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "pk-g1c-2",
   "dc": "G1",
   "code": "1.07",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le propane, l'isobutane, l'ammoniac et le CO₂ sont des fluides naturels. En quoi se distinguent-ils des HFC et des HFO, d'après la fiche ?",
   "choix": [
    "Ils ont tous un fort effet de serre, comme les HFC",
    "Ils existent sans chimie de synthèse, contrairement aux HFC et HFO",
    "Ils contiennent tous du fluor, comme les HFO",
    "Ils ont été condamnés par le protocole de Montréal, comme les CFC"
   ],
   "bonne": 1,
   "aide": "Relis la phrase sur les fluides « naturels ». De quoi n'ont-ils pas besoin, contrairement aux HFC et HFO ?",
   "remed": {
    "regle": "Les fluides naturels (propane, isobutane, ammoniac, CO₂) existent sans chimie de synthèse. Les HFC et les HFO sont des molécules fabriquées.",
    "pourquoi": "C'est une des raisons du retour en force des fluides naturels. Ils n'ont pas le fort impact climatique des molécules de synthèse comme les HFC.",
    "piege": "Confondre « fluide frigorigène » et « contient du fluor ». Les mots se ressemblent, mais les fluides naturels n'ont pas de fluor dans leur formule."
   },
   "remediation_vers": "g1c",
   "explication": "Les fluides naturels (propane, isobutane, ammoniac, CO₂) existent sans chimie de synthèse. Les HFC et les HFO sont des molécules fabriquées.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "pk-g7b-1",
   "dc": "G7",
   "code": "7.03",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous installez une unité extérieure neuve. Avant la mise en service, vous contrôlez l'étanchéité du circuit sous pression. Quel gaz utilisez-vous ?",
   "choix": [
    "De l'air comprimé, plus simple à trouver sur le chantier",
    "De l'azote",
    "De l'oxygène",
    "Le fluide frigorigène lui-même, en petite quantité"
   ],
   "bonne": 1,
   "aide": "La fiche interdit deux gaz par leur nom pour ce contrôle. Le bon gaz est neutre, ni l'un ni l'autre.",
   "remed": {
    "regle": "Le contrôle d'étanchéité avant mise en service se fait sous azote, un gaz neutre.",
    "pourquoi": "L'azote ne réagit pas et ne brûle pas. L'oxygène et l'air comprimé sont dangereux pour ce contrôle : risque d'explosion.",
    "piege": "Utiliser de l'air comprimé parce qu'il est sur le chantier, ou de l'oxygène par confusion avec une autre bouteille. Les deux sont interdits."
   },
   "remediation_vers": "g7b",
   "explication": "Le contrôle d'étanchéité avant mise en service se fait sous azote, un gaz neutre.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g7b-2",
   "dc": "G7",
   "code": "7.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous réglez le régulateur de pression de sortie du condenseur. Comment procédez-vous, d'après la fiche ?",
   "choix": [
    "Vous suivez la fiche constructeur",
    "Vous réglez à l'estime, selon votre expérience",
    "Vous copiez le réglage de la dernière installation, quel que soit le modèle",
    "Vous laissez le réglage d'usine sans jamais le vérifier"
   ],
   "bonne": 0,
   "aide": "La fiche insiste sur un document précis à suivre pour ce réglage : jamais au jugé.",
   "remed": {
    "regle": "Le régulateur de pression de sortie du condenseur se règle selon la fiche constructeur, jamais à l'estime.",
    "pourquoi": "Chaque modèle a ses propres valeurs de réglage. La fiche constructeur garantit une pression de condensation correcte, même par temps froid.",
    "piege": "Régler « à l'estime », selon l'expérience ou une installation précédente, sans consulter la documentation du modèle installé."
   },
   "remediation_vers": "g7b",
   "explication": "Le régulateur de pression de sortie du condenseur se règle selon la fiche constructeur, jamais à l'estime.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-p4-1",
   "dc": "G3",
   "code": "3.01",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Avec quel gaz met-on un circuit frigorifique en pression pour contrôler sa résistance ?",
   "choix": [
    "De l'oxygène",
    "De l'azote sec",
    "De l'air comprimé",
    "Du fluide frigorigène du circuit"
   ],
   "bonne": 1,
   "aide": "Cherchez le gaz qui n'apporte ni humidité, ni risque de combustion.",
   "remed": {
    "regle": "La mise en pression se fait à l'azote sec, et à rien d'autre.",
    "pourquoi": "L'azote est neutre et sec : il n'entretient pas la combustion et n'introduit pas d'eau dans le circuit.",
    "piege": "L'oxygène au contact de l'huile du circuit peut provoquer une réaction violente. L'air comprimé, lui, apporte de l'humidité qui restera dans l'installation."
   },
   "remediation_vers": "p4",
   "explication": "La mise en pression se fait à l'azote sec, et à rien d'autre.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-p4-2",
   "dc": "G3",
   "code": "3.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pourquoi une bouteille d'azote se raccorde-t-elle toujours au travers d'un mano-détendeur ?",
   "choix": [
    "Pour connaître la quantité restante",
    "Pour filtrer l'humidité du gaz",
    "Parce que la pression de la bouteille dépasse largement ce que le circuit peut supporter",
    "Pour réchauffer le gaz avant l'entrée"
   ],
   "bonne": 2,
   "aide": "Comparez la pression dans la bouteille et celle que supporte l'installation.",
   "remed": {
    "regle": "Jamais d'azote sans mano-détendeur entre la bouteille et le circuit.",
    "pourquoi": "La bouteille est à une pression très supérieure à celle admissible par l'installation : le mano-détendeur ramène la pression à la valeur voulue, lue sur son second cadran.",
    "piege": "Ouvrir la bouteille directement sur le circuit peut le détruire instantanément. La pression d'épreuve se règle selon la fiche constructeur, jamais à l'estime."
   },
   "remediation_vers": "p4",
   "explication": "Jamais d'azote sans mano-détendeur entre la bouteille et le circuit.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-p7-1",
   "dc": "G12",
   "code": "12.04",
   "niveau": 1,
   "type": "qcm",
   "enonce": "À quel moment réalise-t-on l'analyse de risques d'une intervention ?",
   "choix": [
    "Avant d'engager le moindre geste technique",
    "Après avoir ouvert le circuit",
    "À la fin, au moment de rédiger le rapport",
    "Seulement si le client le demande"
   ],
   "bonne": 0,
   "aide": "Une analyse de risques sert à éviter l'accident, pas à le raconter.",
   "remed": {
    "regle": "L'analyse de risques se fait AVANT le premier geste, sur place.",
    "pourquoi": "Elle sert à identifier et à supprimer les dangers tant qu'on peut encore agir : source d'inflammation, ventilation, issue, présence de public.",
    "piege": "Une analyse faite après coup n'est plus une analyse, c'est un constat. La sécurité se démontre et s'impose : on ne découvre jamais un risque par l'erreur."
   },
   "remediation_vers": "p7",
   "explication": "L'analyse de risques se fait AVANT le premier geste, sur place.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-p7-2",
   "dc": "G12",
   "code": "12.05",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Avant d'intervenir sur une installation au R-290, que vérifie-t-on dans la zone de travail ?",
   "choix": [
    "Que l'éclairage est suffisant",
    "Que la zone est balisée et ventilée, l'issue dégagée et les sources d'inflammation supprimées",
    "Que la température ambiante est stable",
    "Que le sol est parfaitement sec"
   ],
   "bonne": 1,
   "aide": "Le R-290 est un hydrocarbure de classe A3 : pensez à ce qui pourrait l'enflammer.",
   "remed": {
    "regle": "Zone balisée, ventilation en service, issue dégagée, aucune source d'inflammation, EPI et matériel adaptés, consignation électrique faite.",
    "pourquoi": "Le R-290 est classé A3 : très inflammable. Une fuite dans un local mal ventilé forme une atmosphère explosive, et la moindre étincelle suffit.",
    "piege": "On confond souvent A2L et A3. Le R-32 est A2L, le R-290 est A3 : la propagation de flamme n'a rien à voir, et les précautions non plus."
   },
   "remediation_vers": "p7",
   "explication": "Zone balisée, ventilation en service, issue dégagée, aucune source d'inflammation, EPI et matériel adaptés, consignation électrique faite.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-10.02",
   "dc": "G10",
   "code": "10.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un joint brasé était parfait à la pose, mais il finit par se fissurer des mois plus tard. La tuyauterie est posée sur un support trop serré, avec un point dur. Quelle est la cause la plus probable ?",
   "choix": [
    "Le tube n'a pas été ébavuré après la coupe",
    "Le support transmet les vibrations du compresseur au joint, qui rompt par fatigue",
    "Le balayage à l'azote n'a pas été fait pendant le brasage",
    "L'alliage d'apport utilisé n'était pas du cuivre-phosphore"
   ],
   "bonne": 1,
   "aide": "Pense à ce qui se passe sur un tube mal soutenu quand le compresseur vibre en permanence, jour après jour.",
   "remed": {
    "regle": "Les supports de tuyauterie doivent être bien positionnés, sans point dur ni serrage excessif sur le tube.",
    "pourquoi": "Le compresseur vibre en continu. Un tube mal soutenu transmet ces vibrations jusqu'au joint brasé, qui finit par céder par fatigue, même s'il était parfait au départ.",
    "piege": "Croire qu'un joint brasé réussi à la pose restera bon pour toujours. La rupture peut arriver des mois après, loin du geste de brasage, et on cherche alors la cause au mauvais endroit."
   },
   "remediation_vers": "g10",
   "explication": "Les supports de tuyauterie doivent être bien positionnés, sans point dur ni serrage excessif sur le tube.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-11.04",
   "dc": "G11",
   "code": "11.04",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un fluide de substitution est très performant en froid commercial, mais son efficacité baisse nettement quand l'air extérieur est très chaud. Quel est ce fluide ?",
   "choix": [
    "Le CO2 (R-744)",
    "L'ammoniac (NH3)",
    "Un hydrocarbure comme le R-290",
    "Le R-1234yf"
   ],
   "bonne": 0,
   "aide": "Relis ce que dit la fiche sur les limites de chaque fluide de substitution selon le climat du site.",
   "remed": {
    "regle": "Le CO2 est performant en froid commercial, mais son efficacité baisse quand le climat extérieur est très chaud. Aucun fluide de substitution n'est le meilleur dans l'absolu : le choix dépend de l'application et du climat du site.",
    "pourquoi": "Installer un fluide sans regarder le climat du site expose à une installation qui fonctionne mal une partie de l'année. Le choix doit toujours être validé avec la documentation constructeur.",
    "piege": "Croire qu'un fluide performant sur un site l'est partout : les hydrocarbures sont efficaces mais limités par l'inflammabilité, l'ammoniac est réservé à l'industriel à cause de sa toxicité, chaque fluide a ses propres limites."
   },
   "remediation_vers": "g11",
   "explication": "Le CO2 est performant en froid commercial, mais son efficacité baisse quand le climat extérieur est très chaud. Aucun fluide de substitution n'est le meilleur dans l'absolu : le choix dépend de l'application et du climat du site.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-11.05",
   "dc": "G11",
   "code": "11.05",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Sur une machine fonctionnant au R-290 (propane), en cas de fuite dans le local, où le gaz s'accumule-t-il en priorité ?",
   "choix": [
    "En haut, près du plafond",
    "De façon uniforme dans tout le local",
    "Uniquement à l'extérieur du local",
    "En bas, près du sol"
   ],
   "bonne": 3,
   "aide": "Compare la densité du propane à celle de l'air : est-il plus lourd ou plus léger ?",
   "remed": {
    "regle": "Le propane est plus lourd que l'air. En cas de fuite, il s'accumule en bas, près du sol. La ventilation du local est conçue en tenant compte de cela, dès la conception de la machine.",
    "pourquoi": "Une machine aux hydrocarbures n'est pas construite comme les autres : composants électriques antidéflagrants ou non étincelants, charge de fluide limitée, et ventilation adaptée à un gaz qui s'accumule au sol. Ignorer ce point, c'est placer la détection ou la ventilation au mauvais endroit.",
    "piege": "Copier la logique d'un local avec un gaz plus léger que l'air (détection au plafond) alors que le propane impose l'inverse : surveillance et ventilation basses."
   },
   "remediation_vers": "g11",
   "explication": "Le propane est plus lourd que l'air. En cas de fuite, il s'accumule en bas, près du sol. La ventilation du local est conçue en tenant compte de cela, dès la conception de la machine.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-q-12.01",
   "dc": "G12",
   "code": "12.01",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Une bouteille de R-290 (propane) a un raccord et un filetage à gauche, différents d'une bouteille de HFC. Que faites-vous si votre raccord habituel ne se visse pas dessus ?",
   "choix": [
    "Vous utilisez un adaptateur pour forcer le raccordement",
    "Vous respectez le raccord spécifique prévu pour les hydrocarbures, sans adaptateur",
    "Vous serrez plus fort avec un outil",
    "Vous changez de sens de filetage sur votre propre raccord"
   ],
   "bonne": 1,
   "aide": "La fiche dit que ce raccord différent est une sécurité, pas un obstacle à contourner.",
   "remed": {
    "regle": "Les bouteilles d'hydrocarbure ont un raccord spécifique et un filetage à gauche : on utilise le matériel prévu pour ce raccord, jamais un adaptateur.",
    "pourquoi": "Ce raccord différent empêche physiquement de charger un hydrocarbure inflammable sur un circuit prévu pour un autre fluide, ou l'inverse : c'est une sécurité contre l'erreur de fluide.",
    "piege": "Penser qu'un adaptateur est juste pratique alors qu'il supprime la sécurité voulue par la norme."
   },
   "remediation_vers": "g12",
   "explication": "Les bouteilles d'hydrocarbure ont un raccord spécifique et un filetage à gauche : on utilise le matériel prévu pour ce raccord, jamais un adaptateur.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-12.08",
   "dc": "G12",
   "code": "12.08",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous devez régler la valeur de la pression d'épreuve à l'azote pour contrôler une brasure neuve sur un circuit R-290. Où trouvez-vous cette valeur ?",
   "choix": [
    "Elle correspond à la pression de service habituelle du compresseur",
    "Vous l'estimez selon votre expérience",
    "Dans la documentation constructeur et la norme applicable",
    "Elle correspond toujours à la pression atmosphérique"
   ],
   "bonne": 2,
   "aide": "La fiche insiste : cette valeur ne se devine jamais.",
   "remed": {
    "regle": "La pression d'épreuve à appliquer se trouve dans la documentation constructeur et la norme applicable, jamais à l'estime.",
    "pourquoi": "Une pression d'épreuve mal choisie ne détecte pas un défaut de brasure, ou au contraire risque de forcer sur un circuit qui n'est pas prévu pour cette pression.",
    "piege": "Utiliser par habitude la même valeur que sur un circuit HFC classique, sans vérifier la documentation propre à cet équipement."
   },
   "remediation_vers": "g12b",
   "explication": "La pression d'épreuve à appliquer se trouve dans la documentation constructeur et la norme applicable, jamais à l'estime.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-12.12",
   "dc": "G12",
   "code": "12.12",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous venez de terminer une intervention sur un circuit hydrocarbure : remplacement du composant, épreuve, vide, charge et contrôle direct. Que devez-vous obligatoirement faire ensuite ?",
   "choix": [
    "Rédiger un rapport avec le composant changé, les résultats de l'épreuve et du contrôle, et la quantité chargée",
    "Rien, l'intervention se termine avec le contrôle direct",
    "Noter juste la date de passage",
    "Informer oralement le client, sans écrit"
   ],
   "bonne": 0,
   "aide": "La fiche le dit clairement : sans cette dernière étape écrite, l'intervention n'a pas de valeur.",
   "remed": {
    "regle": "Le rapport d'intervention doit contenir le composant changé, les résultats de l'épreuve et du contrôle, et la quantité chargée.",
    "pourquoi": "Ce rapport est la preuve écrite du travail réalisé et de sa conformité : sans lui, rien ne prouve que l'étanchéité et la charge ont bien été vérifiées.",
    "piege": "Croire qu'un contrôle direct réussi suffit et négliger la trace écrite qui en atteste."
   },
   "remediation_vers": "g12b",
   "explication": "Le rapport d'intervention doit contenir le composant changé, les résultats de l'épreuve et du contrôle, et la quantité chargée.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-12.13",
   "dc": "G12",
   "code": "12.13",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous arrivez pour intervenir sur un équipement au R-290 et constatez que les capteurs de gaz du local ne sont pas en service. Que faites-vous ?",
   "choix": [
    "Vous réparez vous-même les capteurs avant de commencer",
    "Vous ne commencez pas et vous signalez le problème",
    "Vous demandez à un collègue de surveiller l'air à votre place",
    "Vous commencez l'intervention en redoublant de prudence"
   ],
   "bonne": 1,
   "aide": "La fiche donne une règle claire pour ce cas : que fait-on si une mesure de sécurité du site manque ?",
   "remed": {
    "regle": "Avant d'intervenir, on vérifie que le site est en règle : signalisation, issues de secours, capteurs de gaz et alarmes en service, ventilation opérante. Si une mesure manque, on ne commence pas et on le signale.",
    "pourquoi": "Sur un fluide très inflammable comme le R-290, un capteur de gaz hors service prive le technicien de la seule alerte en cas de fuite pendant l'intervention.",
    "piege": "Penser que sa propre vigilance remplace un dispositif de détection défaillant."
   },
   "remediation_vers": "g12",
   "explication": "Avant d'intervenir, on vérifie que le site est en règle : signalisation, issues de secours, capteurs de gaz et alarmes en service, ventilation opérante. Si une mesure manque, on ne commence pas et on le signale.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-12.14",
   "dc": "G12",
   "code": "12.14",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Sur une machine au R-290, un léger écart de charge fait chuter les performances plus vite que sur une machine à grosse charge de HFC. Pourquoi ?",
   "choix": [
    "Parce que le R-290 n'a pas de sous-refroidissement",
    "Parce que le R-290 chauffe plus que les autres fluides",
    "Parce que le R-290 est incompressible",
    "Parce que ces circuits sont conçus avec une charge volontairement petite, donc le moindre écart déséquilibre vite l'échange"
   ],
   "bonne": 3,
   "aide": "La fiche compare une charge petite à une charge importante : lequel tolère le moins l'écart ?",
   "remed": {
    "regle": "Sur un fluide inflammable, la charge exacte compte double car ces circuits sont conçus avec une charge volontairement petite.",
    "pourquoi": "Avec une charge faible, le moindre écart en trop ou en moins pèse proportionnellement plus lourd et dérègle vite l'échange thermique.",
    "piege": "Croire que seule la sécurité est affectée par une mauvaise charge, en oubliant que la performance chute aussi, et plus vite qu'ailleurs."
   },
   "remediation_vers": "g12",
   "explication": "Sur un fluide inflammable, la charge exacte compte double car ces circuits sont conçus avec une charge volontairement petite.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-3.05",
   "dc": "G3",
   "code": "3.05",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous venez de terminer l'épreuve d'étanchéité et le tirage au vide sur un circuit. Que devez-vous faire avant de considérer l'intervention comme terminée ?",
   "choix": [
    "Attendre la validation du client avant toute trace écrite",
    "Refaire une deuxième fois l'épreuve d'étanchéité pour confirmer",
    "Ranger le matériel, aucune autre formalité n'est nécessaire",
    "Consigner les données dans le registre de l'équipement et rédiger un rapport sur les essais et contrôles effectués"
   ],
   "bonne": 3,
   "aide": "Pense au tout dernier geste professionnel décrit dans la fiche, juste après les contrôles.",
   "remed": {
    "regle": "Après tout contrôle ou essai (épreuve de résistance, épreuve d'étanchéité, tirage au vide), on consigne les résultats dans le registre de l'équipement et on rédige un rapport sur les essais et contrôles effectués.",
    "pourquoi": "La trace écrite prouve que les contrôles réglementaires ont bien eu lieu. Elle protège le professionnel, informe l'exploitant, et permet de suivre l'état de l'équipement dans le temps.",
    "piege": "Croire que le geste technique (épreuve, tirage au vide) suffit à lui seul. Sans registre ni rapport, rien ne prouve que le contrôle a été fait : le geste professionnel n'est complet qu'avec la consignation."
   },
   "remediation_vers": "g3",
   "explication": "Après tout contrôle ou essai (épreuve de résistance, épreuve d'étanchéité, tirage au vide), on consigne les résultats dans le registre de l'équipement et on rédige un rapport sur les essais et contrôles effectués.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-4.01",
   "dc": "G4",
   "code": "4.01",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Sur une installation frigorifique, où se situent le plus souvent les points de fuite potentiels ?",
   "choix": [
    "Aux points d'assemblage (raccords, brasures) et aux pièces qui vibrent, comme le compresseur",
    "Uniquement sur le pressostat de sécurité",
    "Uniquement dans l'isolant qui recouvre les tuyauteries",
    "Sur un tube plein, loin de tout raccord ou de toute pièce en mouvement"
   ],
   "bonne": 0,
   "aide": "Une fuite ne sort pas d'un tube plein : pense à ce qui assemble deux pièces, ou à ce qui bouge.",
   "remed": {
    "regle": "Les fuites apparaissent aux points d'assemblage (raccords mécaniques, brasures poreuses ou mal pénétrées, presse-étoupes de vannes, joints) et sur les pièces en mouvement ou en vibration, comme le compresseur ou une tuyauterie mal fixée.",
    "pourquoi": "Un tube plein et correctement fixé ne peut pas fuir ; c'est la jonction entre deux pièces, ou la fatigue due au mouvement, qui crée un passage pour le fluide.",
    "piege": "Chercher au hasard sur toute la tuyauterie au lieu de cibler d'abord les raccords, les brasures et les points qui vibrent."
   },
   "remediation_vers": "g4a",
   "explication": "Les fuites apparaissent aux points d'assemblage (raccords mécaniques, brasures poreuses ou mal pénétrées, presse-étoupes de vannes, joints) et sur les pièces en mouvement ou en vibration, comme le compresseur ou une tuyauterie mal fixée.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "pk-q-4.02",
   "dc": "G4",
   "code": "4.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Avant un contrôle d'étanchéité, vous consultez le registre de l'équipement. Il indique qu'un raccord flare de la ligne liquide a déjà été réparé pour fuite trois mois plus tôt. Que faites-vous de cette information ?",
   "choix": [
    "Vous notez que c'est réparé et vous passez directement au reste de l'installation",
    "Vous démontez le raccord pour le remplacer par précaution",
    "Vous l'ignorez, puisque la réparation est déjà faite",
    "Vous recontrôlez ce raccord en priorité, car un point réparé reste une partie à surveiller"
   ],
   "bonne": 3,
   "aide": "Le registre sert à repérer les parties problématiques avant même de sortir un instrument : un point déjà réparé n'est pas un point clos.",
   "remed": {
    "regle": "Le registre de l'équipement doit être consulté avant tout contrôle pour relever les problèmes récurrents et les parties nécessitant une attention particulière ; un point déjà réparé est à recontrôler en priorité.",
    "pourquoi": "Une réparation n'est pas une garantie définitive : le point reste plus fragile que le reste du circuit, et une fuite peut y réapparaître en premier.",
    "piege": "Croire qu'un point déjà réparé est un point clos et ne plus s'y attarder pendant le contrôle."
   },
   "remediation_vers": "x4",
   "explication": "Le registre de l'équipement doit être consulté avant tout contrôle pour relever les problèmes récurrents et les parties nécessitant une attention particulière ; un point déjà réparé est à recontrôler en priorité.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "pk-q-4.09",
   "dc": "G4",
   "code": "4.09",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un contrôle d'étanchéité vient de se terminer, sans fuite détectée. Que devez-vous faire ensuite ?",
   "choix": [
    "Consigner dans le registre la date, la méthode utilisée, les points contrôlés et le résultat",
    "Attendre le prochain contrôle pour tout noter en une seule fois",
    "Informer seulement le client à l'oral",
    "Rien, puisqu'il n'y a pas de fuite à signaler"
   ],
   "bonne": 0,
   "aide": "Un contrôle qui n'est écrit nulle part n'a, réglementairement, jamais eu lieu.",
   "remed": {
    "regle": "Toutes les données du contrôle doivent être consignées dans le registre de l'équipement : date, méthode utilisée, points contrôlés, résultat, et en cas de fuite la localisation précise et la suite donnée.",
    "pourquoi": "Un contrôle non consigné n'a aucune valeur réglementaire : le registre est la preuve écrite du suivi de l'installation.",
    "piege": "Penser que l'absence de fuite dispense de consigner le contrôle dans le registre."
   },
   "remediation_vers": "g4c",
   "explication": "Toutes les données du contrôle doivent être consignées dans le registre de l'équipement : date, méthode utilisée, points contrôlés, résultat, et en cas de fuite la localisation précise et la suite donnée.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "pk-q-5.09",
   "dc": "G5",
   "code": "5.09",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Le fluide et l'huile d'une installation aux hydrocarbures ont un point commun qui impose des précautions particulières de stockage et de transport. Lequel ?",
   "choix": [
    "Ils sont inflammables",
    "Ils sont toxiques par contact",
    "Ils sont sous une pression bien plus élevée que les autres fluides",
    "Ils sont incompatibles avec tout récipient métallique"
   ],
   "bonne": 0,
   "aide": "Relis ce qui distingue les hydrocarbures des autres fluides frigorigènes du point de vue du risque.",
   "remed": {
    "regle": "Pour les hydrocarbures, le fluide ET l'huile sont inflammables : ils se stockent et se transportent dans des récipients adaptés et fermés, à l'écart de toute source de chaleur ou d'étincelle, selon la réglementation applicable et la fiche de données de sécurité.",
    "pourquoi": "Un hydrocarbure qui fuit près d'une flamme ou d'une étincelle peut s'enflammer, contrairement à la plupart des autres fluides frigorigènes courants. C'est ce risque supplémentaire qui justifie des règles de gestion, de stockage et de transport renforcées.",
    "piege": "Confondre le risque des hydrocarbures avec un risque de toxicité ou de pression : le danger propre aux hydrocarbures est l'inflammabilité, pas un poison ni une surpression particulière."
   },
   "remediation_vers": "g5b",
   "explication": "Pour les hydrocarbures, le fluide ET l'huile sont inflammables : ils se stockent et se transportent dans des récipients adaptés et fermés, à l'écart de toute source de chaleur ou d'étincelle, selon la réglementation applicable et la fiche de données de sécurité.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-q-6.02",
   "dc": "G6",
   "code": "6.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un compresseur est posé directement sur son châssis, sans plot antivibratile. Quel risque apparaît à moyen terme ?",
   "choix": [
    "La tuyauterie vibre en permanence et finit par se fissurer, ce qui provoque une fuite",
    "Aucun risque particulier, c'est juste plus bruyant",
    "Le compresseur consomme automatiquement moins d'énergie",
    "Le niveau d'huile au voyant augmente"
   ],
   "bonne": 0,
   "aide": "Pense à ce qui protège normalement la tuyauterie des vibrations du compresseur.",
   "remed": {
    "regle": "Un compresseur se fixe toujours sur des plots antivibratiles (silent-blocs), jamais directement sur son châssis ou le sol.",
    "pourquoi": "Sans ces plots, la vibration du compresseur se transmet en permanence à toute la tuyauterie raccordée, qui finit par se fissurer : c'est une cause classique de fuite.",
    "piege": "Une tuyauterie montée en contrainte (tordue pour rejoindre un piquage) ajoute le même risque, même quand les plots antivibratiles sont bien posés."
   },
   "remediation_vers": "g6b",
   "explication": "Un compresseur se fixe toujours sur des plots antivibratiles (silent-blocs), jamais directement sur son châssis ou le sol.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-6.03",
   "dc": "G6",
   "code": "6.03",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Selon quoi règle-t-on les pressostats HP et BP et la protection thermique d'un compresseur ?",
   "choix": [
    "Selon la fiche constructeur de l'appareil",
    "Toujours à la même valeur, quel que soit le modèle",
    "Selon la température du local technique ce jour-là",
    "À l'estime, selon l'expérience du technicien"
   ],
   "bonne": 0,
   "aide": "Cherche à quel document un frigoriste se réfère toujours avant de toucher une sécurité.",
   "remed": {
    "regle": "Les interrupteurs de sécurité et de contrôle (pressostats HP et BP, protection thermique) se règlent toujours selon la fiche constructeur, jamais à l'estime.",
    "pourquoi": "Chaque compresseur a ses propres seuils de sécurité ; un réglage approximatif peut laisser passer une surpression dangereuse ou couper la machine trop tôt.",
    "piege": "Croire qu'une valeur retenue sur une autre installation convient partout : chaque modèle a sa propre fiche constructeur à respecter."
   },
   "remediation_vers": "g6",
   "explication": "Les interrupteurs de sécurité et de contrôle (pressostats HP et BP, protection thermique) se règlent toujours selon la fiche constructeur, jamais à l'estime.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-6.04",
   "dc": "G6",
   "code": "6.04",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Une soupape d'aspiration mal réglée sur un compresseur : quelle conséquence directe ?",
   "choix": [
    "Une baisse automatique de la consommation électrique",
    "Un excès d'huile visible au voyant",
    "Une perte de puissance, ou un compresseur qui s'abîme",
    "Aucune conséquence tant que la machine démarre"
   ],
   "bonne": 2,
   "aide": "Relis ce que fait la soupape d'aspiration à chaque cycle du compresseur.",
   "remed": {
    "regle": "La soupape d'aspiration, qui laisse entrer la vapeur basse pression à chaque cycle, se règle toujours selon la fiche constructeur, jamais au jugé.",
    "pourquoi": "Un mauvais réglage perturbe l'entrée de vapeur dans le compresseur : cela fait perdre de la puissance ou abîme la mécanique.",
    "piege": "Penser qu'un réglage approximatif suffit tant que la machine continue de tourner : le dommage peut être progressif et invisible au début."
   },
   "remediation_vers": "g6b",
   "explication": "La soupape d'aspiration, qui laisse entrer la vapeur basse pression à chaque cycle, se règle toujours selon la fiche constructeur, jamais au jugé.",
   "origine": "pack",
   "categories": [
    "A1"
   ]
  },
  {
   "id": "pk-q-6.08",
   "dc": "G6",
   "code": "6.08",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Pourquoi bien installer, bien régler et bien entretenir un compresseur améliore l'efficacité énergétique ?",
   "choix": [
    "Parce que cela dispense de tester l'étanchéité à l'azote",
    "Parce que cela augmente automatiquement la puissance frigorifique de la machine",
    "Parce qu'un compresseur bien installé, bien réglé et bien entretenu consomme moins et dure plus longtemps",
    "Parce que cela change la classe de sécurité du fluide frigorigène"
   ],
   "bonne": 2,
   "aide": "Pense à ce que devient la consommation électrique d'une machine bien entretenue.",
   "remed": {
    "regle": "Une bonne installation, un bon réglage et un bon entretien du compresseur sont aussi des gestes d'efficacité énergétique : la machine consomme moins et dure plus longtemps.",
    "pourquoi": "Une installation soignée réduit les pertes (vibrations, fuites, réglages hors plage) qui font travailler le compresseur inutilement, donc pour rien.",
    "piege": "Croire que l'efficacité énergétique ne dépend que du choix du fluide frigorigène, alors que l'installation et l'entretien du compresseur y contribuent directement."
   },
   "remediation_vers": "g6b",
   "explication": "Une bonne installation, un bon réglage et un bon entretien du compresseur sont aussi des gestes d'efficacité énergétique : la machine consomme moins et dure plus longtemps.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-7.05",
   "dc": "G7",
   "code": "7.05",
   "niveau": 2,
   "type": "qcm",
   "enonce": "En inspectant les conduites de refoulement et de liquide d'un condenseur, quels signes doivent alerter ?",
   "choix": [
    "La tension d'alimentation du ventilateur",
    "La température de l'air ambiant du local",
    "Des traces d'huile, de la corrosion, ou un isolant abîmé",
    "Le niveau d'huile dans le carter du compresseur"
   ],
   "bonne": 2,
   "aide": "Pense à ce qu'on voit sur un tube quand une fuite commence à apparaître.",
   "remed": {
    "regle": "On inspecte visuellement la conduite de refoulement (gaz chaud, entre compresseur et condenseur) et la conduite de liquide (juste après le condenseur), après consignation électrique. On cherche des traces d'huile, de la corrosion, un isolant abîmé.",
    "pourquoi": "Ces signes annoncent souvent une fuite avant qu'elle ne se produise vraiment : les repérer tôt évite une perte de fluide plus tard.",
    "piege": "Confondre cette inspection visuelle avec une mesure chiffrée comme le sous-refroidissement : ce sont deux contrôles différents, l'un se regarde, l'autre se mesure."
   },
   "remediation_vers": "g7b",
   "explication": "On inspecte visuellement la conduite de refoulement (gaz chaud, entre compresseur et condenseur) et la conduite de liquide (juste après le condenseur), après consignation électrique. On cherche des traces d'huile, de la corrosion, un isolant abîmé.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-7.06",
   "dc": "G7",
   "code": "7.06",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Dans quelles conditions doit-on purger les gaz non condensables (incondensables) d'un condenseur ?",
   "choix": [
    "Juste après le démarrage du compresseur",
    "Installation en fonctionnement, fluide en mouvement",
    "Installation à l'arrêt, froide, avec récupération du fluide",
    "Uniquement pendant la mise sous vide de l'installation"
   ],
   "bonne": 2,
   "aide": "Pense à l'état de l'installation qui rend la purge sûre pour le technicien et pour l'environnement.",
   "remed": {
    "regle": "Les incondensables se purgent à l'arrêt, installation froide, avec récupération du fluide — jamais fluide en mouvement.",
    "pourquoi": "Purger pendant que le fluide circule disperse du réfrigérant dans l'air et fausse le résultat de la purge : on ne sépare plus proprement l'air du fluide.",
    "piege": "Croire qu'on peut purger pendant que le compresseur tourne pour gagner du temps : c'est justement le moment où on risque une émission de fluide."
   },
   "remediation_vers": "g7",
   "explication": "Les incondensables se purgent à l'arrêt, installation froide, avec récupération du fluide — jamais fluide en mouvement.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-7.09",
   "dc": "G7",
   "code": "7.09",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Que doit contenir le rapport écrit rédigé après une visite d'un condenseur ?",
   "choix": [
    "Le nom du fabricant du compresseur",
    "Le prix de l'intervention pour le client",
    "Ailettes encrassées, ventilateur bruyant, trace d'huile, pression anormale",
    "Uniquement la date de la dernière charge de fluide"
   ],
   "bonne": 2,
   "aide": "Pense aux signes visuels et sonores relevés pendant la visite du condenseur.",
   "remed": {
    "regle": "Chaque visite se termine par un rapport écrit notant les ailettes encrassées, le ventilateur bruyant, les traces d'huile, une pression anormale.",
    "pourquoi": "Un problème noté tôt évite une fuite ou une émission de réfrigérant demain : le rapport sert à agir avant la panne.",
    "piege": "Se contenter d'un rapport oral rapide ou incomplet, sans détailler les anomalies observées : sans trace écrite, le suivi se perd."
   },
   "remediation_vers": "g7b",
   "explication": "Chaque visite se termine par un rapport écrit notant les ailettes encrassées, le ventilateur bruyant, les traces d'huile, une pression anormale.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-7.10",
   "dc": "G7",
   "code": "7.10",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Comment un condenseur bien entretenu permet-il de faire des économies d'énergie ?",
   "choix": [
    "Des ailettes propres et un ventilateur en bon état font travailler le compresseur moins fort",
    "En augmentant volontairement la pression de condensation",
    "En réduisant le sous-refroidissement à zéro",
    "En arrêtant le ventilateur pendant la nuit"
   ],
   "bonne": 0,
   "aide": "Pense à ce qui empêche l'air de bien circuler à travers la batterie du condenseur.",
   "remed": {
    "regle": "Des ailettes propres et un ventilateur en bon état limitent la haute pression et donc la consommation électrique.",
    "pourquoi": "Un condenseur encrassé fait travailler le compresseur plus fort pour évacuer la même quantité de chaleur, ce qui augmente la facture d'électricité.",
    "piege": "Penser que le nettoyage du condenseur n'est qu'une question d'esthétique, sans lien avec la consommation d'énergie."
   },
   "remediation_vers": "g7b",
   "explication": "Des ailettes propres et un ventilateur en bon état limitent la haute pression et donc la consommation électrique.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-8.02",
   "dc": "G8",
   "code": "8.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Vous installez un régulateur de pression d'évaporation sur une nouvelle installation. Comment déterminez-vous sa valeur de réglage ?",
   "choix": [
    "En copiant le réglage du pressostat BP",
    "Il n'y a rien à régler, il fonctionne seul",
    "En fixant une valeur basse par sécurité",
    "En suivant la fiche constructeur de l'organe"
   ],
   "bonne": 3,
   "aide": "Pense à qui décide de la valeur de réglage : une estimation, ou un document précis ?",
   "remed": {
    "regle": "Le réglage d'un régulateur de pression d'évaporation (mise au point comme réglage) suit toujours la fiche constructeur, jamais une valeur estimée.",
    "pourquoi": "Cet organe protège le produit ou équilibre plusieurs évaporateurs sur un même compresseur ; un mauvais réglage abîme le produit ou déséquilibre l'installation.",
    "piege": "Confondre avec le pressostat BP, qui protège la machine en coupant le compresseur : deux organes, deux réglages différents."
   },
   "remediation_vers": "g8b",
   "explication": "Le réglage d'un régulateur de pression d'évaporation (mise au point comme réglage) suit toujours la fiche constructeur, jamais une valeur estimée.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-8.05",
   "dc": "G8",
   "code": "8.05",
   "niveau": 1,
   "type": "qcm",
   "enonce": "La conduite d'aspiration relie l'évaporateur au compresseur. Pourquoi la pose-t-on en légère pente vers le compresseur ?",
   "choix": [
    "Pour que l'huile transportée par la vapeur revienne vers le compresseur au lieu de stagner",
    "Pour réduire la surchauffe",
    "Pour empêcher le givre de se former",
    "Pour diminuer la vitesse du gaz"
   ],
   "bonne": 0,
   "aide": "Repense à ce qui circule avec le gaz dans la conduite d'aspiration, et à ce qui se passerait s'il restait bloqué dans un point bas.",
   "remed": {
    "regle": "La conduite d'aspiration se pose en légère pente vers le compresseur, avec un siphon en pied de toute colonne montante.",
    "pourquoi": "La vapeur aspirée transporte toujours un peu d'huile, celle qui lubrifie le compresseur ; sans pente ni siphon, cette huile stagne dans les points bas au lieu de revenir.",
    "piege": "Une conduite posée à plat ou en contre-pente semble fonctionner un moment, mais l'huile manque peu à peu au compresseur, jusqu'au grippage."
   },
   "remediation_vers": "g8",
   "explication": "La conduite d'aspiration se pose en légère pente vers le compresseur, avec un siphon en pied de toute colonne montante.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-8.07",
   "dc": "G8",
   "code": "8.07",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Plusieurs évaporateurs sont raccordés à un même compresseur. Pourquoi règle-t-on la soupape de régulation de pression d'évaporation sur chacun d'eux ?",
   "choix": [
    "Pour remplacer le pressostat de chaque évaporateur",
    "Pour couper l'alimentation électrique du compresseur en cas de défaut",
    "Pour équilibrer la pression entre les évaporateurs, ou protéger un produit sensible au froid",
    "Pour mesurer la surchauffe à l'aspiration"
   ],
   "bonne": 2,
   "aide": "Cette soupape ne coupe pas le compresseur : que fait-elle alors ?",
   "remed": {
    "regle": "On règle la soupape de régulation de pression d'évaporation selon la fiche constructeur, pour maintenir une pression minimale adaptée au produit ou pour équilibrer plusieurs évaporateurs sur un même compresseur.",
    "pourquoi": "Sans ce réglage, un produit sensible au froid peut geler, ou un évaporateur peut prendre toute la capacité du compresseur au détriment des autres.",
    "piege": "Croire que cette soupape coupe le compresseur comme un pressostat : elle ne coupe rien, elle maintient une pression."
   },
   "remediation_vers": "g8b",
   "explication": "On règle la soupape de régulation de pression d'évaporation selon la fiche constructeur, pour maintenir une pression minimale adaptée au produit ou pour équilibrer plusieurs évaporateurs sur un même compresseur.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-8.10",
   "dc": "G8",
   "code": "8.10",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Après une visite de l'évaporateur, que doit contenir le rapport d'état pour être utile ?",
   "choix": [
    "La liste des outils utilisés pendant la visite",
    "Seulement la date et la durée de l'intervention",
    "La description des anomalies observées : corrosion, fixation desserrée, bac sale, conduit de dégivrage abîmé",
    "Uniquement la valeur de la surchauffe mesurée"
   ],
   "bonne": 2,
   "aide": "Un bon rapport dit ce qui pourrait mal tourner plus tard, pas seulement ce qui va bien.",
   "remed": {
    "regle": "Toute visite de l'évaporateur se termine par un rapport écrit qui décrit précisément les anomalies observées : corrosion, fixation desserrée, bac de condensats sale, conduit de dégivrage abîmé.",
    "pourquoi": "Ces anomalies, laissées telles quelles, finissent tôt ou tard en fuite ou en émission de fluide frigorigène ; le rapport permet d'agir avant que ça n'arrive.",
    "piege": "Se contenter d'un rapport vague (« RAS », juste la date de passage) sans décrire ce qui pourrait s'aggraver."
   },
   "remediation_vers": "g8b",
   "explication": "Toute visite de l'évaporateur se termine par un rapport écrit qui décrit précisément les anomalies observées : corrosion, fixation desserrée, bac de condensats sale, conduit de dégivrage abîmé.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-9.02",
   "dc": "G9",
   "code": "9.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Une vanne doit toujours être montée dans le sens de la flèche gravée sur son corps, comme un filtre déshydrateur. Que risque-t-on si on la monte à l'envers ?",
   "choix": [
    "Une erreur de montage irréversible, qu'on ne peut corriger qu'en découpant l'installation",
    "Une simple baisse de rendement, sans conséquence sur le montage",
    "Un dérèglement du bulbe du détendeur thermostatique",
    "Rien, on peut la remonter plus tard sans problème"
   ],
   "bonne": 0,
   "aide": "Pense à ce que dit la fiche sur les erreurs de montage des vannes et du filtre déshydrateur.",
   "remed": {
    "regle": "Une vanne, comme un filtre déshydrateur, se monte toujours dans le sens de circulation du fluide, indiqué par la flèche gravée sur son corps.",
    "pourquoi": "Le sens de montage conditionne le sens de circulation du fluide dans l'organe (clapet interne, tamis moléculaire...). Une fois la vanne brasée à l'envers, aucun réglage ne peut corriger l'erreur.",
    "piege": "Croire qu'une vanne est symétrique donc que n'importe quel sens convient : beaucoup de vannes se ressemblent des deux côtés mais ne fonctionnent que dans un seul sens."
   },
   "remediation_vers": "g9",
   "explication": "Une vanne, comme un filtre déshydrateur, se monte toujours dans le sens de circulation du fluide, indiqué par la flèche gravée sur son corps.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-9.03",
   "dc": "G9",
   "code": "9.03",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Quelle est la différence entre un détendeur thermostatique (mécanique) et un détendeur électronique ?",
   "choix": [
    "Le détendeur électronique ne sert que sur les petits appareils, comme le capillaire",
    "Le détendeur électronique coupe le circuit quand un seuil de pression est franchi",
    "Le détendeur électronique régule la pression de condensation, le mécanique régule la surchauffe",
    "Le détendeur électronique utilise une sonde et un régulateur, ce qui le rend plus précis et plus rapide que le bulbe du détendeur mécanique"
   ],
   "bonne": 3,
   "aide": "Cherche dans la fiche ce qui remplace le bulbe sur un détendeur électronique.",
   "remed": {
    "regle": "Le détendeur thermostatique mécanique régule la surchauffe grâce à un bulbe fixé sur la ligne d'aspiration. Le détendeur électronique fait la même régulation, mais avec une sonde et un régulateur : plus précis, plus rapide.",
    "pourquoi": "Une sonde électronique associée à un régulateur réagit plus vite et plus finement qu'un bulbe rempli de fluide, ce qui donne un réglage de surchauffe plus stable.",
    "piege": "Confondre le détendeur électronique avec le capillaire : le capillaire est un tube calibré fixe, sans aucun réglage, alors que le thermostatique et l'électronique se règlent tous les deux sur la surchauffe."
   },
   "remediation_vers": "g9",
   "explication": "Le détendeur thermostatique mécanique régule la surchauffe grâce à un bulbe fixé sur la ligne d'aspiration. Le détendeur électronique fait la même régulation, mais avec une sonde et un régulateur : plus précis, plus rapide.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-9.05",
   "dc": "G9",
   "code": "9.05",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Que fait la soupape de régulation de pression sur une installation frigorifique ?",
   "choix": [
    "Elle coupe le circuit dès qu'un seuil de pression est franchi",
    "Elle module en continu pour maintenir une pression stable à un point du circuit",
    "Elle règle la surchauffe en sortie d'évaporateur",
    "Elle commande le compresseur selon une température mesurée par une sonde"
   ],
   "bonne": 1,
   "aide": "Compare avec le rôle du limiteur de pression, qui lui coupe le circuit à un seuil : la soupape de régulation agit autrement.",
   "remed": {
    "regle": "La soupape de régulation de pression module en continu pour maintenir une pression stable à un point du circuit. Elle ne coupe jamais le circuit.",
    "pourquoi": "Une pression stable à un point clé du circuit garantit un fonctionnement régulier de l'installation, sans à-coups, et évite de solliciter le compresseur pour rien.",
    "piege": "Confondre la soupape de régulation avec le limiteur de pression : le limiteur est une sécurité qui coupe à un seuil, la soupape de régulation module en continu. Ce sont deux logiques différentes, avec deux réglages différents."
   },
   "remediation_vers": "g9b",
   "explication": "La soupape de régulation de pression module en continu pour maintenir une pression stable à un point du circuit. Elle ne coupe jamais le circuit.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-q-9.06",
   "dc": "G9",
   "code": "9.06",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Comment est réglé un limiteur de pression mécanique ?",
   "choix": [
    "Par un ressort",
    "Par une sonde reliée à un régulateur numérique",
    "Par un bulbe relié à des contacts électriques par un tube fin",
    "Par un capteur relié à un module électronique"
   ],
   "bonne": 0,
   "aide": "Pense à la pièce mécanique qui tare le limiteur, différente du capteur du limiteur électronique.",
   "remed": {
    "regle": "Le limiteur de pression mécanique est réglé par un ressort (tarage mécanique). Le limiteur de pression électronique utilise un capteur relié à un module. Dans les deux cas, il coupe le circuit dès qu'un seuil de pression est franchi, en haute comme en basse pression.",
    "pourquoi": "Le type de technologie détermine comment on accède au réglage et comment on le vérifie, mais le rôle reste le même : une sécurité qui coupe avant l'incident.",
    "piege": "Ne jamais retoucher un limiteur de sécurité « pour voir » : son seuil se règle selon la fiche constructeur, jamais à l'estime. Ne pas le confondre avec le bulbe et le tube fin, qui appartiennent au thermostat mécanique."
   },
   "remediation_vers": "g9b",
   "explication": "Le limiteur de pression mécanique est réglé par un ressort (tarage mécanique). Le limiteur de pression électronique utilise un capteur relié à un module. Dans les deux cas, il coupe le circuit dès qu'un seuil de pression est franchi, en haute comme en basse pression.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-s5-1",
   "dc": "Sécurité",
   "code": null,
   "hors_ref": "sécurité électrique : indispensable au métier, non listée comme compétence à l annexe II.B",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quelle est la dernière étape avant de poser les mains sur un circuit électrique consigné ?",
   "choix": [
    "Prévenir le client",
    "Vérifier l absence de tension avec un VAT",
    "Poser une pancarte",
    "Ouvrir le coffret"
   ],
   "bonne": 1,
   "aide": "Consigner ne suffit pas : il faut le prouver, appareil en main.",
   "remed": {
    "regle": "On vérifie TOUJOURS l absence de tension au VAT avant de toucher.",
    "pourquoi": "Un disjoncteur peut être mal repéré, une alimentation de secours peut subsister : seule la mesure prouve que le circuit est hors tension.",
    "piege": "« Je l ai coupé moi-même » ne protège de rien. Un circuit se vérifie, il ne se suppose pas."
   },
   "remediation_vers": "s5",
   "explication": "On vérifie TOUJOURS l absence de tension au VAT avant de toucher.",
   "origine": "pack"
  },
  {
   "id": "pk-s5-2",
   "dc": "Sécurité",
   "code": null,
   "hors_ref": "sécurité électrique : indispensable au métier, non listée comme compétence à l annexe II.B",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi contrôle-t-on le VAT sur une source connue avant ET après s en être servi ?",
   "choix": [
    "Pour économiser la pile",
    "Parce qu un VAT en panne indiquerait « pas de tension » sur un circuit pourtant sous tension",
    "Pour l étalonner",
    "C est une simple habitude"
   ],
   "bonne": 1,
   "aide": "Demandez-vous ce qui se passe si l appareil lui-même est défaillant.",
   "remed": {
    "regle": "Le VAT se teste sur une source connue avant l usage, et de nouveau après.",
    "pourquoi": "Un appareil défaillant affiche l absence de tension quoi qu il arrive. Le tester après prouve qu il fonctionnait encore au moment de la mesure.",
    "piege": "Un VAT qui n indique rien peut vouloir dire deux choses : pas de tension, ou appareil mort. Seul le double contrôle tranche."
   },
   "remediation_vers": "s5",
   "explication": "Le VAT se teste sur une source connue avant l usage, et de nouveau après.",
   "origine": "pack"
  },
  {
   "id": "pk-s5-3",
   "dc": "Sécurité",
   "code": null,
   "hors_ref": "sécurité électrique : indispensable au métier, non listée comme compétence à l annexe II.B",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Une machine vient d être mise hors tension. Que peut-il rester de dangereux dans le coffret ?",
   "choix": [
    "Plus rien, la coupure suffit",
    "Des condensateurs encore chargés",
    "Seulement de la chaleur",
    "Uniquement du fluide"
   ],
   "bonne": 1,
   "aide": "Certains composants stockent l énergie électrique et ne se vident pas instantanément.",
   "remed": {
    "regle": "Un condensateur reste chargé après la coupure : on respecte le délai et la méthode de décharge du constructeur.",
    "pourquoi": "Il accumule de l énergie pour le démarrage du moteur. Coupée, cette énergie reste stockée et peut provoquer un choc.",
    "piege": "Couper puis ouvrir aussitôt le coffret est un réflexe fréquent — et c est exactement le moment où le condensateur est encore chargé."
   },
   "remediation_vers": "s5",
   "explication": "Un condensateur reste chargé après la coupure : on respecte le délai et la méthode de décharge du constructeur.",
   "origine": "pack"
  },
  {
   "id": "pk-cl1-1",
   "dc": "Classification",
   "code": "1.08",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans une classe de sécurité comme A2L, que disent respectivement la lettre et le chiffre ?",
   "choix": [
    "La lettre dit le PRP, le chiffre dit la pression de service",
    "La lettre dit la toxicité, le chiffre dit l'inflammabilité",
    "La lettre dit la famille chimique, le chiffre dit l'année de mise sur le marché",
    "La lettre dit l'inflammabilité, le chiffre dit la toxicité"
   ],
   "bonne": 1,
   "aide": "Deux dangers différents, deux protections différentes : c'est pour cela qu'il faut deux informations.",
   "remed": {
    "regle": "La lettre donne la toxicité (A faible, B plus élevée), le chiffre donne l'inflammabilité (1 aucune propagation, 2L faible, 2 inflammable, 3 très inflammable).",
    "pourquoi": "Un fluide peut être dangereux d'une manière sans l'être de l'autre, et les mesures de prévention ne sont pas les mêmes : on ventile contre la toxicité, on supprime les sources d'étincelle contre l'inflammabilité. Une note unique ne dirait pas laquelle appliquer.",
    "piege": "« A » ne veut pas dire inoffensif : un fluide de classe A peut asphyxier en chassant l'oxygène du local, ou se décomposer en gaz toxiques au contact d'une flamme."
   },
   "remediation_vers": "cl1",
   "explication": "La lettre donne la toxicité (A faible, B plus élevée), le chiffre donne l'inflammabilité (1 aucune propagation, 2L faible, 2 inflammable, 3 très inflammable).",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "pk-cl1-2",
   "dc": "Classification",
   "code": "1.08",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Quelle est la classe de sécurité du R-290 (propane) ?",
   "choix": [
    "A2L, comme le R-32",
    "A3 : très inflammable",
    "A1, car il n'est pas toxique",
    "B2L, comme l'ammoniac"
   ],
   "bonne": 1,
   "aide": "Demandez-vous à quelle famille chimique appartient le propane.",
   "remed": {
    "regle": "Le R-290 est classé A3 : toxicité faible, mais très inflammable.",
    "pourquoi": "Le propane est un hydrocarbure. Tous les hydrocarbures utilisés en froid — R-290, R-600a (isobutane), R-1270 (propylène) — sont A3. Les A2L sont des HFC à faible PRP comme le R-32, ou des HFO comme le R-1234yf.",
    "piege": "La confusion R-290 = A2L est l'erreur la plus fréquente, et elle se trouve même dans des documents mal rédigés. Elle conduit à appliquer des précautions insuffisantes : ventilation sous-dimensionnée, matériel électrique inadapté, charge excessive."
   },
   "remediation_vers": "cl1",
   "explication": "Le R-290 est classé A3 : toxicité faible, mais très inflammable.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "pk-cl1-3",
   "dc": "Classification",
   "code": "1.08",
   "niveau": 2,
   "type": "qcm",
   "enonce": "À quoi sert concrètement de connaître la classe de sécurité d'un fluide avant d'intervenir ?",
   "choix": [
    "Uniquement à remplir la fiche d'intervention",
    "Elle commande les EPI, le matériel électrique admis, la ventilation, la détection et la charge maximale du local",
    "Elle sert seulement à calculer le PRP de l'installation",
    "Elle indique le prix du fluide au kilogramme"
   ],
   "bonne": 1,
   "aide": "La classe n'est pas une étiquette : elle décide de tout ce qui vous protège.",
   "remed": {
    "regle": "La classe de sécurité détermine l'ensemble du dispositif : EPI, matériel électrique et suppression des sources d'étincelle, ventilation, type de détecteur et seuil d'alarme, charge maximale admise et conditions d'occupation du local.",
    "pourquoi": "Se tromper de classe, ce n'est pas se tromper d'étiquette : c'est installer un matériel qui peut produire une étincelle près d'un fluide inflammable, choisir un détecteur qui ne verra rien, ou charger un local au-delà de ce qu'il admet.",
    "piege": "La classe se lit sur la fiche de données de sécurité du fluide, jamais de mémoire ni par analogie avec l'installation précédente. Les valeurs qui en découlent sont dans la NF EN 378 et la documentation du constructeur."
   },
   "remediation_vers": "cl1",
   "explication": "La classe de sécurité détermine l'ensemble du dispositif : EPI, matériel électrique et suppression des sources d'étincelle, ventilation, type de détecteur et seuil d'alarme, charge maximale admise et conditions d'occupation du local.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "pk-cl2-1",
   "dc": "Classification",
   "code": "12.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Que désigne la LIE d'un gaz inflammable ?",
   "choix": [
    "La concentration en dessous de laquelle le mélange avec l'air ne s'enflamme pas",
    "La température minimale d'inflammation du gaz",
    "La pression maximale admissible dans la bouteille",
    "La quantité de gaz au-delà de laquelle il faut déclarer l'installation"
   ],
   "bonne": 0,
   "aide": "Il s'agit d'un dosage dans l'air, pas d'une température ni d'une pression.",
   "remed": {
    "regle": "La LIE (limite inférieure d'explosivité) est la concentration en dessous de laquelle le mélange gaz-air est trop pauvre pour s'enflammer. La LSE (limite supérieure) est celle au-dessus de laquelle il est trop riche, faute d'oxygène. Entre les deux se trouve le domaine d'explosivité.",
    "pourquoi": "Un gaz inflammable ne brûle qu'à un certain dosage : il lui faut assez de combustible et assez d'air. Dans le domaine d'explosivité, une simple étincelle enflamme tout le volume d'un coup.",
    "piege": "Ces valeurs sont propres à chaque fluide et se lisent sur sa fiche de données de sécurité. Elles ne se retiennent pas de tête et ne se déduisent d'aucune règle générale."
   },
   "remediation_vers": "cl2",
   "explication": "La LIE (limite inférieure d'explosivité) est la concentration en dessous de laquelle le mélange gaz-air est trop pauvre pour s'enflammer. La LSE (limite supérieure) est celle au-dessus de laquelle il est trop riche, faute d'oxygène. Entre les deux se trouve le domaine d'explosivité.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-cl2-2",
   "dc": "Classification",
   "code": "12.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Peut-on se fier à son odorat pour détecter une fuite de R-290 dans un local technique ?",
   "choix": [
    "Oui, le propane a une odeur caractéristique très reconnaissable",
    "Non : le R-290 du froid est un propane de haute pureté, sans l'odorisant ajouté au gaz domestique",
    "Oui, à condition de rester moins de cinq minutes dans le local",
    "Oui, si l'on connaît bien l'odeur du gaz de ville"
   ],
   "bonne": 1,
   "aide": "L'odeur du gaz domestique n'est pas celle du gaz lui-même.",
   "remed": {
    "regle": "Le R-290 utilisé en froid ne contient pas d'odorisant : seule une mesure à l'explosimètre renseigne sur l'état de l'atmosphère.",
    "pourquoi": "L'odeur du gaz domestique vient d'un produit ajouté volontairement pour permettre la détection par le nez. Le propane de qualité frigorifique est de haute pureté et ne le contient pas.",
    "piege": "Même quand une odeur existe, son seuil de perception n'a aucun rapport avec la LIE : sentir quelque chose ne dit pas si l'on est loin ou près du danger. L'atmosphère peut être explosive avant d'être perceptible."
   },
   "remediation_vers": "cl2",
   "explication": "Le R-290 utilisé en froid ne contient pas d'odorisant : seule une mesure à l'explosimètre renseigne sur l'état de l'atmosphère.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-cl2-3",
   "dc": "Classification",
   "code": "12.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un explosimètre affiche « 20 % LIE ». Comment lisez-vous cette valeur ?",
   "choix": [
    "20 % du volume du local est occupé par le gaz",
    "L'atmosphère contient un cinquième de la concentration à partir de laquelle elle deviendrait inflammable",
    "Le mélange est explosif dès 20 %, il faut évacuer immédiatement sans autre mesure",
    "L'appareil signale qu'il lui reste 20 % de charge de batterie"
   ],
   "bonne": 1,
   "aide": "L'appareil n'affiche pas une quantité de gaz, mais une distance au seuil.",
   "remed": {
    "regle": "Un explosimètre affiche un pourcentage de la LIE du gaz recherché : c'est une marge restante avant que l'atmosphère ne devienne inflammable.",
    "pourquoi": "Exprimer la mesure en pourcentage de la LIE permet de déclencher l'alarme bien avant le domaine d'explosivité. Le seuil de réglage se fixe selon la procédure de l'entreprise et la documentation de l'appareil.",
    "piege": "L'appareil se règle pour un gaz donné : utilisé pour un autre, il affiche un chiffre faux. Et il ne remplace ni un détecteur de fuite de fluide frigorigène, ni un détecteur d'oxygène — ce sont trois appareils qui répondent à trois questions différentes."
   },
   "remediation_vers": "cl2",
   "explication": "Un explosimètre affiche un pourcentage de la LIE du gaz recherché : c'est une marge restante avant que l'atmosphère ne devienne inflammable.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-cl3-1",
   "dc": "Classification",
   "code": "11.03",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Une fuite de CO₂ (R-744) s'est produite dans un local technique. Où le gaz s'accumule-t-il ?",
   "choix": [
    "Près du plafond, car les gaz montent toujours",
    "Dans les points bas : fosse, cave, sous-sol, bas de local, car il est plus lourd que l'air",
    "Il se répartit uniformément et sans danger dans tout le volume",
    "Il s'échappe seul par les interstices, sans jamais s'accumuler"
   ],
   "bonne": 1,
   "aide": "Comparez sa masse à celle de l'air.",
   "remed": {
    "regle": "Le CO₂ est plus lourd que l'air : il s'écoule vers le bas et s'accumule dans les points bas.",
    "pourquoi": "Une zone peut être parfaitement respirable à hauteur de visage et déjà dangereuse au niveau du sol ou en bas de quelques marches. Descendre, c'est alors entrer dans la nappe de gaz. Une ouverture en hauteur ne suffit pas à la chasser.",
    "piege": "Ne généralisez pas : « plus lourd que l'air » vaut pour le CO₂ et la plupart des fluides fluorés, mais PAS pour l'ammoniac (R-717), qui est plus léger que l'air et monte. Le comportement d'un fluide se lit sur sa fiche de données de sécurité."
   },
   "remediation_vers": "cl3",
   "explication": "Le CO₂ est plus lourd que l'air : il s'écoule vers le bas et s'accumule dans les points bas.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-cl3-2",
   "dc": "Classification",
   "code": "11.03",
   "niveau": 2,
   "type": "qcm",
   "enonce": "En quoi le danger du CO₂ en local fermé diffère-t-il de celui de l'azote ?",
   "choix": [
    "Il n'y a aucune différence : les deux prennent la place de l'oxygène",
    "Le CO₂ déplace l'oxygène ET agit par lui-même sur l'organisme, alors que l'azote est inerte",
    "Le CO₂ est inflammable, contrairement à l'azote",
    "L'azote est plus dangereux car il est toxique"
   ],
   "bonne": 1,
   "aide": "L'un des deux gaz ne fait que prendre la place ; l'autre fait quelque chose de plus.",
   "remed": {
    "regle": "L'azote agit uniquement par déplacement de l'oxygène. Le CO₂ agit par déplacement ET par action propre sur l'organisme : il intervient dans la régulation de la respiration.",
    "pourquoi": "Le CO₂ devient nocif à des concentrations où l'oxygène restant serait encore suffisant. Un contrôle du seul taux d'oxygène peut donc rassurer à tort : il faut un appareil qui mesure le CO₂ lui-même.",
    "piege": "Le CO₂ est classé A1 — toxicité faible, non inflammable. Sa classe n'annonce donc ni l'anoxie, ni la haute pression de ses installations : c'est le fluide dont l'étiquette rassure le plus alors qu'il exige des précautions propres."
   },
   "remediation_vers": "cl3",
   "explication": "L'azote agit uniquement par déplacement de l'oxygène. Le CO₂ agit par déplacement ET par action propre sur l'organisme : il intervient dans la régulation de la respiration.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-cl3-3",
   "dc": "Classification",
   "code": "11.03",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous trouvez un collègue inconscient au fond d'une fosse abritant une installation au CO₂. Que faites-vous ?",
   "choix": [
    "Je descends immédiatement le chercher, chaque seconde compte",
    "Je donne l'alerte, je ventile et je fais intervenir les secours, sans descendre",
    "Je descends en retenant ma respiration",
    "J'attends seul quelques minutes que le gaz se dissipe de lui-même"
   ],
   "bonne": 1,
   "aide": "Pensez à ce qui vous attend, vous, au fond de la fosse.",
   "remed": {
    "regle": "Devant une personne au sol dans un espace clos ou en contrebas : alerter, ventiler, faire intervenir les secours — sans descendre à son tour.",
    "pourquoi": "La nappe de gaz qui a fait la première victime est toujours là. Le sauveteur improvisé y entre à son tour et devient la deuxième victime : c'est le scénario le plus fréquent de ce type d'accident.",
    "piege": "Retenir sa respiration ne protège pas : on ne tient que quelques dizaines de secondes, et le réflexe respiratoire finit toujours par l'emporter — au fond de la fosse."
   },
   "remediation_vers": "cl3",
   "explication": "Devant une personne au sol dans un espace clos ou en contrebas : alerter, ventiler, faire intervenir les secours — sans descendre à son tour.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-cl4-1",
   "dc": "Classification",
   "code": "12.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans un local abritant une installation au CO₂, où place-t-on le détecteur de gaz fixe ?",
   "choix": [
    "Au plafond, comme un détecteur de fumée",
    "En partie basse, là où le CO₂ s'accumule",
    "À l'extérieur du local uniquement",
    "Peu importe, le gaz se répartit uniformément"
   ],
   "bonne": 1,
   "aide": "Souvenez-vous du comportement du CO₂ dans un local.",
   "remed": {
    "regle": "Le capteur se place en partie basse, parce que le CO₂ est plus lourd que l'air et s'accumule au sol.",
    "pourquoi": "Un capteur au plafond ne verra rien tant que le local ne sera pas rempli — c'est-à-dire bien après que la zone de travail est devenue mortelle. La détection fixe est l'équipement de protection collective principal de ces locaux : elle mesure en permanence, y compris la nuit et quand personne n'est présent.",
    "piege": "Un détecteur portatif resté dans le camion ne protège de rien. Le fixe et le portatif ne répondent pas à la même question : la permanence contre la mesure ponctuelle."
   },
   "remediation_vers": "cl4",
   "explication": "Le capteur se place en partie basse, parce que le CO₂ est plus lourd que l'air et s'accumule au sol.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-cl4-2",
   "dc": "Classification",
   "code": "12.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Un masque à cartouche protège-t-il dans un local chargé en CO₂ ?",
   "choix": [
    "Oui, c'est justement son rôle",
    "Non : une cartouche ne retient pas le CO₂ et ne fournit pas d'oxygène",
    "Oui, à condition de ne pas rester plus de quelques minutes",
    "Oui, s'il s'agit d'une cartouche neuve"
   ],
   "bonne": 1,
   "aide": "Demandez-vous ce qu'une cartouche sait faire, et ce qu'elle ne sait pas fabriquer.",
   "remed": {
    "regle": "Un masque à cartouche filtre certains polluants dans un air qui reste respirable. Il ne fabrique pas d'oxygène et ne retient pas le CO₂.",
    "pourquoi": "En atmosphère appauvrie en oxygène ou chargée en CO₂, seul un appareil isolant — qui apporte son propre air — protège. Son usage relève d'équipes formées et entraînées, pas d'une improvisation de dépannage.",
    "piege": "Croire qu'un masque autorise l'entrée est la configuration où l'on ne ressort pas : on entre dans une atmosphère mortelle avec la certitude d'être protégé. Pour un technicien, la protection n'est pas de porter un masque, c'est de ne pas entrer."
   },
   "remediation_vers": "cl4",
   "explication": "Un masque à cartouche filtre certains polluants dans un air qui reste respirable. Il ne fabrique pas d'oxygène et ne retient pas le CO₂.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-cl4-3",
   "dc": "Classification",
   "code": "13.14",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous arrivez sur un site équipé d'une installation au CO₂. Le voyant du détecteur de gaz est allumé. Que pouvez-vous en conclure ?",
   "choix": [
    "Que le détecteur fonctionne et mesure correctement",
    "Rien de plus qu'une mise sous tension : une cellule usée reste allumée sans plus rien mesurer",
    "Qu'une fuite est en cours",
    "Que le local a été ventilé récemment"
   ],
   "bonne": 1,
   "aide": "Un voyant dit qu'un appareil est alimenté, pas qu'il voit quelque chose.",
   "remed": {
    "regle": "Un capteur de gaz se vérifie et se remplace périodiquement, selon la documentation du fabricant : sa cellule vieillit et finit par ne plus rien mesurer tout en restant allumée.",
    "pourquoi": "C'est le même raisonnement que le double contrôle du VAT : un appareil de sécurité défaillant affiche l'absence de danger quoi qu'il arrive. À l'arrivée sur site, on contrôle donc que les capteurs et les alarmes sont en état de marche, et pas seulement présents au mur.",
    "piege": "Le contrôle d'arrivée porte aussi sur la signalisation à l'entrée et sur les issues de secours : une palette posée devant une porte de chambre froide n'est pas un défaut de rangement, c'est une issue en moins."
   },
   "remediation_vers": "cl4",
   "explication": "Un capteur de gaz se vérifie et se remplace périodiquement, selon la documentation du fabricant : sa cellule vieillit et finit par ne plus rien mesurer tout en restant allumée.",
   "origine": "pack"
  },
  {
   "id": "pk-g1s-1",
   "dc": "G1",
   "code": "1.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un fluide est en train de bouillir. Vous continuez à lui apporter de la chaleur. Que devient sa température ?",
   "choix": [
    "Elle continue de monter, mais plus lentement",
    "Elle ne bouge pas tant qu'il reste du liquide à vaporiser",
    "Elle redescend",
    "Elle monte par à-coups, à chaque bulle"
   ],
   "bonne": 1,
   "aide": "Cette chaleur-là ne se voit pas au thermomètre. C'est pour cela qu'on la dit « latente », c'est-à-dire cachée.",
   "remed": {
    "regle": "Pendant un changement d'état, la chaleur apportée est de la chaleur latente : elle transforme le liquide en vapeur sans faire monter la température. C'est le palier.",
    "pourquoi": "Toute l'énergie sert à faire passer le fluide de l'état liquide à l'état vapeur. Tant qu'il reste une goutte de liquide, la température ne peut pas monter.",
    "piege": "Croire qu'un palier est un temps mort. C'est l'inverse : c'est le moment où le fluide échange le plus de chaleur, et c'est exactement ce que l'évaporateur exploite."
   },
   "remediation_vers": "g1s",
   "explication": "Pendant un changement d'état, la chaleur apportée est de la chaleur latente : elle transforme le liquide en vapeur sans faire monter la température. C'est le palier.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g1s-2",
   "dc": "G1",
   "code": "1.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Dans un évaporateur, la dernière goutte de liquide vient de disparaître. Comment s'appelle ce point ?",
   "choix": [
    "Le point de bulle",
    "Le point de rosée",
    "Le point critique",
    "Le point de consigne"
   ],
   "bonne": 1,
   "aide": "Le point de bulle est à l'autre bout du palier : c'est là que la première bulle apparaît.",
   "remed": {
    "regle": "Le palier de changement d'état commence au point de bulle — la première bulle de vapeur — et finit au point de rosée — la dernière goutte de liquide.",
    "pourquoi": "Ces deux points sont les frontières entre les trois états du fluide : liquide, mélange saturé, vapeur. Ce sont eux qui donnent leur sens aux mots surchauffe et sous-refroidissement.",
    "piege": "Le point critique est autre chose : c'est le sommet de la cloche du diagramme, au-delà duquel le fluide ne se sépare plus en liquide et en vapeur."
   },
   "remediation_vers": "g1s",
   "explication": "Le palier de changement d'état commence au point de bulle — la première bulle de vapeur — et finit au point de rosée — la dernière goutte de liquide.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g1s-3",
   "dc": "G1",
   "code": "1.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi une machine frigorifique travaille-t-elle avec un fluide qui change d'état, plutôt qu'avec de l'air ?",
   "choix": [
    "Parce que le changement d'état permet d'échanger beaucoup de chaleur sans que la température varie",
    "Parce que l'air ne peut pas circuler dans des tubes de cuivre",
    "Parce que la réglementation impose un fluide frigorigène",
    "Parce que l'air reviendrait plus cher à comprimer"
   ],
   "bonne": 0,
   "aide": "Repensez au palier : que se passe-t-il en quantité d'énergie échangée, pendant que la température ne bouge pas ?",
   "remed": {
    "regle": "Sur son palier de changement d'état, un fluide absorbe ou restitue une grande quantité de chaleur — la chaleur latente — sans que sa température varie.",
    "pourquoi": "L'évaporateur exploite ce palier pour prendre la chaleur du local, le condenseur pour la rendre dehors. Un fluide qui resterait dans le même état devrait s'échauffer énormément pour transporter autant d'énergie.",
    "piege": "Confondre le fluide frigorigène, qui change d'état dans un circuit fermé, et l'air soufflé par le ventilateur, qui ne fait que traverser la batterie."
   },
   "remediation_vers": "g1s",
   "explication": "Sur son palier de changement d'état, un fluide absorbe ou restitue une grande quantité de chaleur — la chaleur latente — sans que sa température varie.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g1s-4",
   "dc": "G1",
   "code": "1.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Sur un mélange zéotrope (série R-4xx), qu'est-ce qui distingue le palier de celui d'un corps pur ?",
   "choix": [
    "Il n'y a pas de palier du tout",
    "La température monte lentement pendant le changement d'état : c'est le glissement",
    "Le palier dure deux fois plus longtemps",
    "Le palier se fait à pression constante, contrairement au corps pur"
   ],
   "bonne": 1,
   "aide": "Les composants du mélange ne se vaporisent pas tous à la même température.",
   "remed": {
    "regle": "Dans un mélange zéotrope, la température n'est pas constante pendant le changement d'état : elle glisse. Le point de bulle et le point de rosée ne sont donc pas à la même température.",
    "pourquoi": "Le mélange contient plusieurs fluides purs, et le plus volatil se vaporise en premier. La composition de ce qui reste change au fur et à mesure, donc la température de vaporisation monte.",
    "piege": "Lire une table de saturation sans savoir si la valeur donnée correspond au point de bulle ou au point de rosée : sur un zéotrope, l'écart entre les deux fausse tout calcul de surchauffe ou de sous-refroidissement."
   },
   "remediation_vers": "g1s",
   "explication": "Dans un mélange zéotrope, la température n'est pas constante pendant le changement d'état : elle glisse. Le point de bulle et le point de rosée ne sont donc pas à la même température.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g1b-1",
   "dc": "G1",
   "code": "1.03",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Sur un diagramme log p-h, où se trouve la zone où le fluide est un mélange de liquide et de vapeur ?",
   "choix": [
    "À gauche de la cloche",
    "Sous la cloche",
    "À droite de la cloche",
    "Au-dessus du point critique"
   ],
   "bonne": 1,
   "aide": "La cloche est une frontière. Ce qu'elle enferme, c'est le palier.",
   "remed": {
    "regle": "La courbe en cloche partage le diagramme en trois : liquide à gauche, mélange liquide + vapeur sous la cloche, vapeur surchauffée à droite.",
    "pourquoi": "Le flanc gauche de la cloche est la courbe de bulle, le flanc droit la courbe de rosée. La cloche du diagramme et le palier de la courbe de chauffe sont la même chose, vue autrement.",
    "piege": "Le sommet de la cloche est le point critique : au-dessus, le fluide ne se sépare plus en liquide et en vapeur, il n'y a donc plus de palier."
   },
   "remediation_vers": "g1b",
   "explication": "La courbe en cloche partage le diagramme en trois : liquide à gauche, mélange liquide + vapeur sous la cloche, vapeur surchauffée à droite.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "pk-g1b-2",
   "dc": "G1",
   "code": "1.03",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Sur le tracé d'un cycle frigorifique, où se lit le sous-refroidissement ?",
   "choix": [
    "Sur le trait du bas, à droite de la courbe de rosée",
    "Sur le trait du haut, à gauche de la courbe de bulle",
    "Sur le trait montant de droite, celui de la compression",
    "Au sommet de la cloche"
   ],
   "bonne": 1,
   "aide": "Le sous-refroidissement concerne du liquide. Où se trouve le liquide : côté haute pression ou côté basse pression ?",
   "remed": {
    "regle": "Le sous-refroidissement se lit sur le trait du haut (haute pression), à gauche de la courbe de bulle. La surchauffe se lit sur le trait du bas (basse pression), à droite de la courbe de rosée.",
    "pourquoi": "Le fluide devient entièrement liquide en franchissant la courbe de bulle, dans le condenseur ; tout ce qu'il perd ensuite en température est du sous-refroidissement. Symétriquement, il devient entièrement vapeur en franchissant la courbe de rosée, dans l'évaporateur.",
    "piege": "Intervertir les deux : la réponse 1 décrit la surchauffe, pas le sous-refroidissement."
   },
   "remediation_vers": "g1b",
   "explication": "Le sous-refroidissement se lit sur le trait du haut (haute pression), à gauche de la courbe de bulle. La surchauffe se lit sur le trait du bas (basse pression), à droite de la courbe de rosée.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "pk-g1b-3",
   "dc": "G1",
   "code": "1.03",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Pourquoi la pression est-elle portée sur une échelle logarithmique dans ce diagramme ?",
   "choix": [
    "Pour que la basse pression et la haute pression soient lisibles sur la même feuille",
    "Parce que la pression se mesure en logarithmes",
    "Pour que le cycle forme un rectangle",
    "Parce que l'enthalpie est elle aussi logarithmique"
   ],
   "bonne": 0,
   "aide": "Imaginez les deux pressions du circuit reportées sur une règle graduée ordinaire : laquelle des deux deviendrait illisible ?",
   "remed": {
    "regle": "Sur une échelle logarithmique, ce qui est constant n'est pas l'écart entre deux graduations mais le rapport : la même distance sépare 1 de 10, puis 10 de 100. Les petites pressions sont donc aussi étalées que les grandes.",
    "pourquoi": "Le côté basse pression et le côté haute pression d'un circuit n'ont pas du tout le même ordre de grandeur. Sur une échelle ordinaire, la basse pression serait écrasée en bas de la feuille et illisible.",
    "piege": "Vouloir mesurer une pression à la règle sur ce diagramme. On lit la graduation ; les valeurs, elles, se prennent au manomètre et dans la table."
   },
   "remediation_vers": "g1b",
   "explication": "Sur une échelle logarithmique, ce qui est constant n'est pas l'écart entre deux graduations mais le rapport : la même distance sépare 1 de 10, puis 10 de 100. Les petites pressions sont donc aussi étalées que les grandes.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "pk-g1e-1",
   "dc": "G1",
   "code": "1.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Un technicien annonce « la surchauffe est de 7 ». De quoi parle-t-il exactement ?",
   "choix": [
    "De la température relevée sur le tube d'aspiration",
    "De l'écart, en kelvins, entre la température mesurée et la température de changement d'état à la pression lue",
    "De la pression lue au manomètre basse pression",
    "Du nombre de degrés au-dessus de zéro"
   ],
   "bonne": 1,
   "aide": "Le mot important n'est pas « 7 » : c'est ce que 7 mesure. Une valeur unique, ou un écart entre deux valeurs ?",
   "remed": {
    "regle": "La surchauffe et le sous-refroidissement sont des différences, jamais des températures. On les exprime en kelvins parce que ce sont des écarts.",
    "pourquoi": "Le fluide est dit surchauffé de 7 K parce qu'il se trouve 7 kelvins au-dessus de sa température de changement d'état, à la pression où il se trouve. Sans cette pression, le nombre ne veut rien dire.",
    "piege": "Relever la température de l'aspiration et l'annoncer comme « la surchauffe ». C'est une température, pas une surchauffe."
   },
   "remediation_vers": "g1e",
   "explication": "La surchauffe et le sous-refroidissement sont des différences, jamais des températures. On les exprime en kelvins parce que ce sont des écarts.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g1e-2",
   "dc": "G1",
   "code": "1.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "De quoi a-t-on besoin, au minimum, pour déterminer une surchauffe sur une installation en marche ?",
   "choix": [
    "D'un thermomètre de contact seul",
    "D'un manomètre, d'un thermomètre de contact, et de la table de saturation du fluide présent",
    "D'un manomètre seul",
    "D'un détecteur électronique de fuite"
   ],
   "bonne": 1,
   "aide": "Une différence se calcule entre deux valeurs. D'où vient la seconde ?",
   "remed": {
    "regle": "Le manomètre donne la pression ; la table de saturation traduit cette pression en température de changement d'état ; le thermomètre de contact donne la température réelle du tube. La différence est la surchauffe.",
    "pourquoi": "Un seul instrument ne donne qu'une moitié du calcul. C'est le croisement des deux mesures qui produit l'information.",
    "piege": "Utiliser la table d'un autre fluide que celui réellement présent dans le circuit. On vérifie le fluide sur la plaque signalétique et dans le registre, jamais à la couleur de la bouteille."
   },
   "remediation_vers": "g1e",
   "explication": "Le manomètre donne la pression ; la table de saturation traduit cette pression en température de changement d'état ; le thermomètre de contact donne la température réelle du tube. La différence est la surchauffe.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g1e-3",
   "dc": "G1",
   "code": "1.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Quelle est la différence entre la surchauffe utile et la surchauffe totale ?",
   "choix": [
    "L'utile se mesure à l'arrêt, la totale en fonctionnement",
    "L'utile est celle gagnée dans l'évaporateur ; la totale y ajoute ce que la ligne d'aspiration apporte jusqu'au compresseur",
    "L'utile concerne le condenseur, la totale l'évaporateur",
    "C'est la même valeur, exprimée dans deux unités différentes"
   ],
   "bonne": 1,
   "aide": "L'une des deux est dite « utile » parce qu'elle a servi à quelque chose de précis. À quoi ?",
   "remed": {
    "regle": "La surchauffe utile est celle que la vapeur gagne à l'intérieur de l'évaporateur : elle a servi à refroidir le local. La surchauffe totale y ajoute ce que la ligne d'aspiration apporte entre la sortie de l'évaporateur et le compresseur.",
    "pourquoi": "Une ligne d'aspiration mal isolée, qui traverse un local chaud, augmente la surchauffe totale sans rien apporter au froid produit.",
    "piege": "Comparer une surchauffe utile à une consigne donnée en totale, ou l'inverse : on dérègle alors une machine qui allait bien. Vérifiez toujours où la valeur de référence a été prise."
   },
   "remediation_vers": "g1e",
   "explication": "La surchauffe utile est celle que la vapeur gagne à l'intérieur de l'évaporateur : elle a servi à refroidir le local. La surchauffe totale y ajoute ce que la ligne d'aspiration apporte entre la sortie de l'évaporateur et le compresseur.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g1e-4",
   "dc": "G1",
   "code": "1.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "À quoi sert le sous-refroidissement en sortie de condenseur ?",
   "choix": [
    "À garantir qu'il arrive du liquide pur, sans bulles de vapeur, au détendeur",
    "À protéger le compresseur contre le coup de liquide",
    "À accélérer le dégivrage de l'évaporateur",
    "À limiter la pression de condensation par temps chaud"
   ],
   "bonne": 0,
   "aide": "Le sous-refroidissement se prend en sortie de condenseur. Quel organe se trouve juste après ?",
   "remed": {
    "regle": "Le sous-refroidissement garantit que le fluide arrive au détendeur entièrement liquide. Repère usuel : 4 à 8 K, à recaler sur la documentation du constructeur.",
    "pourquoi": "S'il est insuffisant, des bulles de vapeur se forment dans la ligne liquide et le détendeur n'alimente plus correctement l'évaporateur.",
    "piege": "Confondre avec la surchauffe : c'est elle qui protège le compresseur du liquide, à l'autre bout du circuit."
   },
   "remediation_vers": "g1e",
   "explication": "Le sous-refroidissement garantit que le fluide arrive au détendeur entièrement liquide. Repère usuel : 4 à 8 K, à recaler sur la documentation du constructeur.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g1e-5",
   "dc": "G5",
   "code": "5.05",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Avant de charger une installation, pourquoi commence-t-on par déterminer l'état du fluide — sous-refroidi, saturé ou surchauffé ?",
   "choix": [
    "Parce que cet état commande la méthode et la quantité de remplissage",
    "Parce que le registre exige de le noter",
    "Parce que cela permet de connaître le PRP du fluide",
    "Parce que cela dispense de peser la bouteille"
   ],
   "bonne": 0,
   "aide": "Le référentiel place ce diagnostic AVANT le geste de charge. Que déciderait-on ensuite, s'il était faux ?",
   "remed": {
    "regle": "On détermine d'abord l'état et les conditions du fluide, puis on en déduit la méthode de remplissage — en phase liquide ou en phase vapeur — et le volume adapté.",
    "pourquoi": "Charger en phase vapeur un mélange zéotrope modifie la composition de ce qui reste dans la bouteille ; charger sans savoir où en est l'installation conduit à sur-charger ou sous-charger.",
    "piege": "Croire que la pesée suffit. La balance dit combien on a mis, elle ne dit pas s'il fallait le mettre en liquide ou en vapeur, ni si la charge était déjà correcte."
   },
   "remediation_vers": "g1e",
   "explication": "On détermine d'abord l'état et les conditions du fluide, puis on en déduit la méthode de remplissage — en phase liquide ou en phase vapeur — et le volume adapté.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "pk-g7b-3",
   "dc": "G7",
   "code": "7.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "En plein hiver, la haute pression d'une installation chute et la machine ne fait plus assez de froid, alors qu'aucun organe n'est en panne. Quel organe est prévu pour éviter cela ?",
   "choix": [
    "Le pressostat haute pression de sécurité",
    "Le régulateur de pression de sortie du condenseur",
    "Le régulateur de pression d'évaporation",
    "Le filtre déshydrateur"
   ],
   "bonne": 1,
   "aide": "Quand il fait froid dehors, le condenseur évacue la chaleur trop facilement. Qu'est-ce qui en souffre, en aval ?",
   "remed": {
    "regle": "Le régulateur de pression de sortie du condenseur — couramment appelé « KVR » — maintient la pression de condensation au-dessus d'une valeur réglée, même quand la température extérieure est basse. Il se règle selon la fiche constructeur.",
    "pourquoi": "Le détendeur a besoin d'un écart de pression suffisant entre son entrée et sa sortie pour alimenter correctement l'évaporateur. Si la haute pression tombe trop bas, cet écart disparaît et l'installation ne produit plus de froid.",
    "piege": "Chercher une panne alors que le comportement est normal pour la saison : sans régulation de la pression de condensation, une machine peut mal fonctionner par temps froid sans qu'aucun composant ne soit défectueux."
   },
   "remediation_vers": "g7b",
   "explication": "Le régulateur de pression de sortie du condenseur — couramment appelé « KVR » — maintient la pression de condensation au-dessus d'une valeur réglée, même quand la température extérieure est basse. Il se règle selon la fiche constructeur.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g7b-4",
   "dc": "G7",
   "code": "7.02",
   "niveau": 1,
   "type": "qcm",
   "enonce": "Quelle est la différence entre le pressostat haute pression et le régulateur de pression de condensation ?",
   "choix": [
    "Le pressostat coupe l'alimentation du compresseur ; le régulateur ne coupe rien, il maintient une pression",
    "Le pressostat maintient une pression ; le régulateur coupe le compresseur",
    "Ce sont deux noms du même organe",
    "Le pressostat se règle, le régulateur se remplace"
   ],
   "bonne": 0,
   "aide": "L'un est un interrupteur électrique, l'autre est une vanne.",
   "remed": {
    "regle": "Un pressostat est un organe de sécurité électrique : il coupe. Un régulateur de pression est une vanne : il maintient une pression et ne coupe rien.",
    "pourquoi": "Les deux surveillent la pression, mais l'un protège la machine en l'arrêtant, l'autre fait fonctionner l'installation correctement sans jamais l'arrêter.",
    "piege": "Croire qu'un régulateur peut remplacer une sécurité. Une installation a besoin des deux, avec deux réglages distincts pris sur la fiche constructeur."
   },
   "remediation_vers": "g7b",
   "explication": "Un pressostat est un organe de sécurité électrique : il coupe. Un régulateur de pression est une vanne : il maintient une pression et ne coupe rien.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g8b-5",
   "dc": "G8",
   "code": "8.02",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Plusieurs chambres froides à des températures différentes fonctionnent sur un même compresseur. Quel organe permet à chaque évaporateur de garder la pression dont son produit a besoin ?",
   "choix": [
    "Le pressostat basse pression",
    "Le régulateur de pression d'évaporation, monté en sortie d'évaporateur",
    "Le régulateur de pression de carter",
    "Le détendeur thermostatique"
   ],
   "bonne": 1,
   "aide": "Sans cet organe, toutes les chambres descendraient à la pression de la plus froide d'entre elles.",
   "remed": {
    "regle": "Le régulateur de pression d'évaporation — couramment appelé « KVP » — se monte en sortie d'évaporateur et empêche la pression d'y descendre sous la valeur réglée.",
    "pourquoi": "Sur une installation centralisée, le compresseur impose sa basse pression à tout ce qui lui est raccordé. Ce régulateur permet à chaque évaporateur de garder sa propre pression, donc sa propre température.",
    "piege": "Le confondre avec le pressostat basse pression, qui protège le compresseur en le coupant. Le régulateur, lui, ne coupe rien : il maintient une pression, et son réglage vient de la fiche constructeur."
   },
   "remediation_vers": "g8b",
   "explication": "Le régulateur de pression d'évaporation — couramment appelé « KVP » — se monte en sortie d'évaporateur et empêche la pression d'y descendre sous la valeur réglée.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "pk-g8b-6",
   "dc": "G8",
   "code": "8.07",
   "niveau": 2,
   "type": "qcm",
   "enonce": "Vous réglez la soupape de régulation de la pression d'évaporation. Sur quelle pression agit-elle, et à quel endroit du circuit ?",
   "choix": [
    "Sur la pression d'aspiration, juste avant le compresseur",
    "Sur la pression dans l'évaporateur, en sortie d'évaporateur",
    "Sur la pression de condensation, en sortie de condenseur",
    "Sur la pression du carter d'huile du compresseur"
   ],
   "bonne": 1,
   "aide": "Son nom le dit : pression d'évaporation. Où se produit l'évaporation ?",
   "remed": {
    "regle": "La soupape de régulation de la pression d'évaporation se monte en sortie d'évaporateur et maintient une pression minimale dans celui-ci. Son réglage se prend sur la fiche constructeur.",
    "pourquoi": "C'est ce qui protège le produit contre un refroidissement excessif, et ce qui permet à plusieurs évaporateurs de coexister sur un même compresseur.",
    "piege": "La confondre avec le régulateur de pression de carter — couramment appelé « KVL » — monté juste avant le compresseur : celui-là protège le moteur du compresseur en limitant la pression d'aspiration, notamment au redémarrage après un arrêt long."
   },
   "remediation_vers": "g8b",
   "explication": "La soupape de régulation de la pression d'évaporation se monte en sortie d'évaporateur et maintient une pression minimale dans celui-ci. Son réglage se prend sur la fiche constructeur.",
   "origine": "pack",
   "categories": [
    "A1",
    "A2"
   ]
  }
 ],
 "competences": {
  "12.02": {
   "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI."
  },
  "12.13": {
   "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Vérifier la sécurité du site : signalisation, issues de secours, détecteurs et alarmes gaz."
  },
  "11.03": {
   "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
   "groupe": "G11",
   "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Connaître les règles de sécurité des fluides inflammables, toxiques ou à pression plus élevée."
  },
  "3.01": {
   "officiel": "Effectuer une épreuve de pression pour contrôler la résistance du système",
   "groupe": "G3",
   "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Réaliser une épreuve de pression à l'azote pour vérifier la résistance du circuit"
  },
  "1.08": {
   "officiel": "Connaître la combustibilité, la propagation des flammes, les restrictions relatives à la capacité de charge, les limites d'occupation pour les HFC, H(C)FO et hydrocarbures",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2",
    "D",
    "E"
   ],
   "libelle": "Connaître la combustibilité et la propagation des flammes, les restrictions de capacité de charge et les limites d'occupation, pour les HFC, H(C)FO et hydrocarbures."
  },
  "12.04": {
   "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Réaliser une analyse des risques avant de commencer le travail, et supprimer ou identifier les sources de danger."
  },
  "13.14": {
   "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
   "groupe": "G13",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R744 (CO2)",
   "libelle": "Vérifier la sécurité du site : signalisation, issues de secours, capteurs et alarmes gaz."
  },
  "5.01": {
   "officiel": "Connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Brancher et débrancher les flexibles du manifold avec un minimum d'émissions"
  },
  "4.05": {
   "officiel": "Utiliser des instruments de mesure portables tels que des manomètres, des thermomètres et des multimètres pour mesurer les volts, ampères et ohms en appliquant des méthodes indirectes de contrôle de l'étanchéité, et interpréter les paramètres mesurés",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Lire les instruments portables et interpréter les valeurs mesurées"
  },
  "5.03": {
   "officiel": "Utiliser un dispositif de récupération des réfrigérants et connecter et déconnecter ce dispositif en produisant le minimum d'émissions",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Brancher et débrancher un groupe de récupération avec un minimum d'émissions"
  },
  "3.03": {
   "officiel": "Utiliser une pompe à vide",
   "groupe": "G3",
   "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Monter et mettre en service une pompe à vide"
  },
  "3.04": {
   "officiel": "Faire le vide dans le système pour évacuer l'air et l'humidité selon la pratique habituelle",
   "groupe": "G3",
   "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Évacuer l'air et l'humidité en tirant au vide, selon la pratique habituelle"
  },
  "3.02": {
   "officiel": "Effectuer une épreuve de pression pour contrôler l'étanchéité du système",
   "groupe": "G3",
   "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Réaliser une épreuve de pression d'étanchéité"
  },
  "5.02": {
   "officiel": "Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état gazeux",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Vider et remplir un cylindre, en phase liquide et gazeuse"
  },
  "5.05": {
   "officiel": "Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, saturé ou surchauffé) d'un réfrigérant avant tout remplissage afin de choisir la méthode et le volume de remplissage les plus adaptés. Remplir le système de réfrigérant (à l'état liquide et gazeux) sans provoquer de pertes",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Déterminer l'état du fluide et charger sans perte"
  },
  "5.06": {
   "officiel": "Choisir le bon type de balance et l'utiliser pour peser le réfrigérant",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Choisir la balance adaptée et peser"
  },
  "12.05": {
   "officiel": "Préparer la zone de travail et sélectionner les outils, le matériel et les équipements de protection adéquats pour travailler sur des systèmes dépendant des réfrigérants inflammables",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Préparer la zone de travail et choisir les EPI adaptés"
  },
  "1.00": {
   "officiel": "Connaissance élémentaire de la législation de l'Union européenne et nationale applicable, notamment celle relative aux gaz à effet de serre fluoré, aux DEEE et à l'écoconception",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2",
    "D",
    "E"
   ],
   "libelle": "Identifier les obligations légales de base liées aux fluides frigorigènes"
  },
  "1.01": {
   "officiel": "Connaître les unités normalisées ISO pour la température, la pression, la masse, la densité et l'énergie",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2",
    "D",
    "E"
   ],
   "libelle": "Utiliser les unités normalisées (température, pression, masse, énergie)"
  },
  "1.02": {
   "officiel": "Comprendre la théorie élémentaire des systèmes de réfrigération : thermodynamique élémentaire (terminologie, paramètres et processus essentiels tels que « surchauffe », « côté haute pression », « chaleur de compression », « enthalpie », « effet de réfrigération », « côté basse pression », « sous-refroidissement »), propriétés et transformations thermodynamiques des réfrigérants, y compris l'identification des mélanges zéotropiques et des états des fluides",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Expliquer la thermodynamique élémentaire du froid"
  },
  "1.04": {
   "officiel": "Décrire la fonction des principales composantes du système (compresseur, évaporateur, condenseur, détendeurs thermostatiques) et les transformations thermodynamiques du réfrigérant",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Décrire la fonction de chaque composant du circuit"
  },
  "1.03": {
   "officiel": "Utiliser les tableaux et graphiques correspondants et les interpréter dans le cadre de contrôles d'étanchéité indirects (y compris le contrôle du bon fonctionnement du système) : diagramme log p/h, tables de saturation d'un réfrigérant, diagramme d'un cycle frigorifique simple à compression",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Lire un diagramme log p-h, une table de saturation, et y tracer un cycle"
  },
  "1.06": {
   "officiel": "Connaître le comportement spécifique, les paramètres physiques, les systèmes, les solutions, les déviances de tous les réfrigérants de substitution dans le cycle de réfrigération et les composants pour leur utilisation",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2",
    "D",
    "E"
   ],
   "libelle": "Identifier la famille et les caractéristiques d'un fluide"
  },
  "1.07": {
   "officiel": "Connaître les caractéristiques des hydrocarbures, du CO2, et du NH3 et des autres réfrigérants non fluorés par rapport aux réfrigérants à gaz à effet de serre fluorés",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2",
    "D",
    "E"
   ],
   "libelle": "Décoder la nomenclature R-xyz et les séries de mélanges"
  },
  "1.05": {
   "officiel": "Connaître le fonctionnement élémentaire des composantes suivantes utilisées dans un système de réfrigération ainsi que leur rôle et leur importance dans la prévention et la détection des fuites de réfrigérant : a) valves (robinets à boule, diaphragmes, robinets à soupape) ; b) contrôles de la température et de la pression ; c) repères transparents et indicateurs d'humidité ; d) contrôles du dégivrage ; e) protecteurs du système ; f) instruments de mesure tels que les thermomètres ; g) systèmes de contrôle de l'huile ; h) réservoirs ; i) séparateurs de liquides et d'huile, en tenant compte des spécificités du fonctionnement comportant des réfrigérants hautement inflammables ou toxiques (hydrocarbures ou NH3) et des réfrigérants fonctionnant à haute pression (CO2)",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Relier chaque organe courant du circuit à son rôle dans la prévention ou la détection d'une fuite"
  },
  "2.01": {
   "officiel": "Avoir une connaissance élémentaire de la politique de l'UE et internationale en matière de changement climatique, y compris la convention-cadre des Nations unies sur les changements climatiques (CCNUCC) et le Protocole de Montréal relatif à des substances qui appauvrissent la couche d'ozone",
   "groupe": "G2",
   "groupe_titre": "Incidence sur l'environnement des réfrigérants et réglementations pertinentes en matière d'environnement",
   "cat": [
    "A1",
    "A2",
    "D",
    "E"
   ],
   "libelle": "Situer l'histoire : couche d'ozone, protocoles, politique climat"
  },
  "2.02": {
   "officiel": "Avoir une connaissance élémentaire du concept de « potentiel de réchauffement planétaire » (PRP), de l'utilisation des gaz à effet de serre fluorés et d'autres substances en tant que fluides frigorigènes, de l'incidence des émissions de gaz à effet de serre fluorés sur le climat (ordre de grandeur de leur PRP) ainsi que des dispositions correspondantes du règlement (UE) n° 2024/573 et des actes d'exécution pertinents, de même que des menaces éventuelles pour l'environnement, y compris celles issues des produits de décomposition de certaines substances fluorées (PFAS) tels que les HFC, HFO et HCFO",
   "groupe": "G2",
   "groupe_titre": "Incidence sur l'environnement des réfrigérants et réglementations pertinentes en matière d'environnement",
   "cat": [
    "A1",
    "A2",
    "D",
    "E"
   ],
   "libelle": "Expliquer le PRP et les obligations du règlement (UE) 2024/573"
  },
  "3.05": {
   "officiel": "Consigner les données dans le registre de l'équipement et rédiger un rapport portant sur un ou plusieurs des essais et des contrôles effectués durant l'examen",
   "groupe": "G3",
   "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Consigner le registre et rédiger le rapport d'essais"
  },
  "4.01": {
   "officiel": "Connaître les points de fuite potentiels des équipements de réfrigération, de climatisation et de pompes à chaleur",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Identifier les points de fuite potentiels d'une installation"
  },
  "4.02": {
   "officiel": "Consulter le registre de l'équipement avant tout contrôle d'étanchéité et relever les informations pertinentes concernant des problèmes récurrents ou des parties problématiques du système nécessitant une attention particulière",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Consulter et exploiter le registre avant le contrôle"
  },
  "4.03": {
   "officiel": "Effectuer un contrôle visuel et manuel de tout le système au sens du règlement (CE) n° 1516/2007 de la Commission",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Réaliser un contrôle visuel et manuel"
  },
  "4.04": {
   "officiel": "Effectuer un contrôle de l'étanchéité du système au moyen d'une méthode indirecte conformément au règlement (CE) n° 1516/2007 et du manuel d'utilisation du système",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Mettre en œuvre la méthode indirecte (mesures et tables)"
  },
  "4.06": {
   "officiel": "Contrôler l'étanchéité du système au moyen d'une des méthodes directes visées au règlement (CE) n° 1516/2007",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Mettre en œuvre une méthode directe en intervenant dans le circuit"
  },
  "4.07": {
   "officiel": "Contrôler l'étanchéité du système au moyen d'une des méthodes directes ne nécessitant pas d'intervenir dans le circuit de réfrigération et visées au règlement (CE) n° 1516/2007",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Mettre en œuvre la méthode directe sans intervenir dans le circuit"
  },
  "4.08": {
   "officiel": "Utiliser un dispositif électronique de détection des fuites",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Utiliser un détecteur électronique de fuites"
  },
  "4.09": {
   "officiel": "Consigner les données dans le registre de l'équipement",
   "groupe": "G4",
   "groupe_titre": "Contrôles d'étanchéité",
   "cat": [
    "A1",
    "A2",
    "E"
   ],
   "libelle": "Consigner le contrôle dans le registre"
  },
  "5.04": {
   "officiel": "Vider l'huile contaminée par le réfrigérant d'un système",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Vidanger l'huile contaminée"
  },
  "5.07": {
   "officiel": "Consigner dans le registre de l'équipement toutes les informations pertinentes concernant le réfrigérant récupéré ou ajouté",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Consigner l'opération dans le registre"
  },
  "5.08": {
   "officiel": "Connaître les prescriptions et les procédures de gestion, de réutilisation, de récupération, de stockage et de transport des réfrigérants et huiles fluorés, y compris lorsqu'ils sont contaminés",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Appliquer les prescriptions de gestion, stockage et transport"
  },
  "5.09": {
   "officiel": "Connaître les prescriptions et les procédures de gestion, de remplissage, de récupération, de stockage et de transport des hydrocarbures et des huiles, y compris lorsqu'ils sont contaminés, ainsi que d'installation d'équipements et de systèmes tributaires des hydrocarbures",
   "groupe": "G5",
   "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Gérer les hydrocarbures et leurs huiles, y compris contaminés"
  },
  "6.01": {
   "officiel": "Expliquer le principe de fonctionnement d'un compresseur (y compris le réglage de la puissance et le circuit de lubrification) et les risques de fuite ou d'émission de réfrigérant qui y sont liés",
   "groupe": "G6",
   "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Expliquer le principe du compresseur et ses risques de fuite"
  },
  "6.03": {
   "officiel": "Régler les interrupteurs de sécurité et de contrôle",
   "groupe": "G6",
   "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Régler les interrupteurs de sécurité et de contrôle"
  },
  "6.05": {
   "officiel": "Vérifier le circuit de retour de l'huile",
   "groupe": "G6",
   "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Vérifier le retour d'huile"
  },
  "6.07": {
   "officiel": "Rédiger un rapport sur l'état du compresseur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
   "groupe": "G6",
   "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Rédiger un rapport d'état"
  },
  "6.02": {
   "officiel": "Installer correctement un compresseur, y compris le matériel de contrôle et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produisent une fois le système en fonctionnement",
   "groupe": "G6",
   "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Installer un compresseur et ses sécurités sans provoquer de fuite"
  },
  "6.04": {
   "officiel": "Régler les soupapes d'aspiration",
   "groupe": "G6",
   "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
   "cat": [
    "A1"
   ],
   "libelle": "Régler les soupapes d'aspiration selon la fiche constructeur"
  },
  "6.06": {
   "officiel": "Mettre en marche et arrêter un compresseur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
   "groupe": "G6",
   "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Démarrer, arrêter et contrôler un compresseur par la mesure"
  },
  "6.08": {
   "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance des compresseurs",
   "groupe": "G6",
   "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Connaître les leviers d'efficacité énergétique du compresseur"
  },
  "7.01": {
   "officiel": "Expliquer le principe de fonctionnement d'un condenseur et les risques de fuite qui y sont associés",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Expliquer le principe du condenseur et ses risques de fuite"
  },
  "7.04": {
   "officiel": "Régler les interrupteurs de sécurité et de contrôle",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Régler les interrupteurs de sécurité et de contrôle"
  },
  "7.06": {
   "officiel": "Extraire les gaz non condensables du condenseur à l'aide d'un appareil de purge pour système de réfrigération",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Purger les incondensables"
  },
  "7.08": {
   "officiel": "Inspecter la surface du condenseur",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Inspecter la surface d'échange"
  },
  "7.02": {
   "officiel": "Mettre au point le régulateur de pression de sortie du condenseur",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Régler le régulateur de pression du condenseur"
  },
  "7.03": {
   "officiel": "Installer correctement un condenseur/une unité extérieure y compris le matériel de réglage et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produise une fois que le système fonctionnera",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Installer un condenseur sans risque de fuite"
  },
  "7.05": {
   "officiel": "Inspecter les conduites de refoulement et de liquide",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Inspecter les conduites de refoulement et de liquide"
  },
  "7.07": {
   "officiel": "Mettre en marche et arrêter un condenseur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Démarrer, mesurer et arrêter un condenseur"
  },
  "7.09": {
   "officiel": "Rédiger un rapport sur l'état du condenseur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Rédiger un rapport d'état du condenseur"
  },
  "7.10": {
   "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance des condenseurs",
   "groupe": "G7",
   "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Entretenir un condenseur pour économiser l'énergie"
  },
  "8.01": {
   "officiel": "Expliquer le principe de fonctionnement d'un évaporateur (y compris le système de dégivrage) et les risques de fuite qui y sont associés",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Expliquer le principe de l'évaporateur et le dégivrage"
  },
  "8.05": {
   "officiel": "Vérifier que les conduites de liquide et d'aspiration sont dans la bonne position",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Vérifier les conduites liquide et aspiration"
  },
  "8.08": {
   "officiel": "Mettre en marche et arrêter un évaporateur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Réaliser la mise en marche/arrêt et les mesures"
  },
  "8.09": {
   "officiel": "Inspecter la surface de l'évaporateur",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Inspecter la surface d'échange et le bac de condensats"
  },
  "8.02": {
   "officiel": "Mettre au point un régulateur de pression d'évaporation de l'évaporateur",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Mettre en service un régulateur de pression d'évaporation"
  },
  "8.03": {
   "officiel": "Installer correctement un évaporateur, y compris le matériel de contrôle et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produise une fois le système en fonctionnement",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Installer l'évaporateur et ses sécurités sans fuite"
  },
  "8.04": {
   "officiel": "Régler les interrupteurs de sécurité et de contrôle",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Régler les sécurités électriques de l'évaporateur"
  },
  "8.06": {
   "officiel": "Inspecter le conduit de dégivrage à l'air chaud",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Vérifier l'état du conduit de dégivrage à l'air chaud"
  },
  "8.07": {
   "officiel": "Régler la soupape de régulation de la pression d'évaporation",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Ajuster la soupape de pression d'évaporation"
  },
  "8.10": {
   "officiel": "Rédiger un rapport sur l'état de l'évaporateur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Rédiger un rapport d'état de l'évaporateur"
  },
  "8.11": {
   "officiel": "Connaître les mesures pour améliorer ou maintenir l'efficacité énergétique de l'équipement pendant l'installation ou la maintenance des évaporateurs",
   "groupe": "G8",
   "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Connaître les leviers d'efficacité énergétique de l'évaporateur"
  },
  "9.01": {
   "officiel": "Expliquer le principe de fonctionnement de différents types de vannes d'expansion (détendeurs thermostatiques, tubes capillaires) et les risques de fuite qui y sont liés",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Expliquer le principe du détendeur et du tube capillaire"
  },
  "9.02": {
   "officiel": "Installer des vannes dans la bonne position",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Installer les vannes dans la bonne position"
  },
  "9.03": {
   "officiel": "Régler un détendeur mécanique/électronique",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Régler un détendeur mécanique ou électronique"
  },
  "9.08": {
   "officiel": "Vérifier l'état d'un filtre sécheur",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Vérifier un filtre déshydrateur"
  },
  "9.04": {
   "officiel": "Régler des thermostats mécaniques et électroniques",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Régler un thermostat mécanique ou électronique"
  },
  "9.05": {
   "officiel": "Régler la soupape de régulation de la pression",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Régler une soupape de régulation de pression"
  },
  "9.06": {
   "officiel": "Régler des limiteurs de pression mécaniques et électroniques",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Régler un limiteur de pression mécanique ou électronique"
  },
  "9.07": {
   "officiel": "Vérifier le fonctionnement d'un séparateur d'huile",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Vérifier le fonctionnement d'un séparateur d'huile"
  },
  "9.09": {
   "officiel": "Rédiger un rapport sur l'état de ces composants en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Rédiger un rapport d'état sur ces organes"
  },
  "9.10": {
   "officiel": "Connaître les mesures pour améliorer ou maintenir l'efficacité énergétique de l'équipement pendant l'installation ou la maintenance des détendeurs thermostatiques et d'autres composants",
   "groupe": "G9",
   "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Connaître les mesures d'efficacité énergétique liées à ces réglages"
  },
  "10.01": {
   "officiel": "Soudage, brasage fort et/ou brasage tendre des joints étanches sur des tubes, des tuyaux et des composants métalliques pouvant être utilisés dans des systèmes de réfrigération, de climatisation et de pompes à chaleur",
   "groupe": "G10",
   "groupe_titre": "Tuyauterie : monter un réseau de tuyauterie étanche dans une installation de réfrigération",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Réaliser des joints étanches (soudage, brasage fort ou tendre)"
  },
  "10.02": {
   "officiel": "Fabriquer/vérifier des supports de tuyaux et de composants",
   "groupe": "G10",
   "groupe_titre": "Tuyauterie : monter un réseau de tuyauterie étanche dans une installation de réfrigération",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Fabriquer et vérifier les supports de tuyauteries"
  },
  "11.01": {
   "officiel": "Connaître les technologies de substitution pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et savoir les manipuler sans danger",
   "groupe": "G11",
   "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
   "cat": [
    "A1",
    "A2",
    "D",
    "E"
   ],
   "libelle": "Connaître les technologies de substitution et leur manipulation sans danger"
  },
  "11.02": {
   "officiel": "Connaître les systèmes de conception pertinents afin de réduire la charge des gaz à effet de serre fluorés et d'augmenter l'efficacité énergétique",
   "groupe": "G11",
   "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Expliquer la conception à charge réduite et l'efficacité"
  },
  "11.04": {
   "officiel": "Comprendre les avantages et inconvénients respectifs, notamment en ce qui concerne l'efficacité énergétique, des réfrigérants de substitution en fonction de leur application prévue et des conditions climatiques des différentes régions",
   "groupe": "G11",
   "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Comparer les fluides de substitution selon l'application"
  },
  "11.05": {
   "officiel": "Connaître les différences de conception des composants et des systèmes pour les équipements et les systèmes tributaires des hydrocarbures",
   "groupe": "G11",
   "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
   "cat": [
    "A1",
    "A2",
    "D"
   ],
   "libelle": "Situer les différences de conception des systèmes aux hydrocarbures"
  },
  "12.01": {
   "officiel": "Connaître les règles d'étiquetage et les prescriptions spéciales pour les réfrigérants inflammables dans les équipements, systèmes et cylindres de refroidissement ainsi que les prescriptions spéciales relatives au raccordement des bombonnes",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Lire l'étiquetage et raccorder correctement une bouteille"
  },
  "12.03": {
   "officiel": "Calculer la charge de réfrigérant inflammable dans un système conformément aux normes de sécurité en vigueur",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Déterminer la charge admissible"
  },
  "12.06": {
   "officiel": "Récupérer les réfrigérants inflammables du système en toute sécurité et remplir le système avec de l'azote",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Récupérer et inerter à l'azote"
  },
  "12.14": {
   "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance avec des réfrigérants inflammables",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Maintenir l'efficacité énergétique avec un fluide inflammable"
  },
  "12.07": {
   "officiel": "Ouvrir le système, enlever et remplacer un composant, refermer le système",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Ouvrir le circuit pour remplacer un composant, puis le refermer"
  },
  "12.08": {
   "officiel": "Effectuer une épreuve de pression pour contrôler l'étanchéité du système",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Réaliser l'épreuve de pression à l'azote"
  },
  "12.09": {
   "officiel": "Réaliser un essai sous vide pour éliminer l'humidité et vérifier l'étanchéité du système",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Tirer au vide pour sécher et vérifier le circuit"
  },
  "12.10": {
   "officiel": "Charger le système avec le volume approprié de réfrigérant à base d'hydrocarbures",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Charger le circuit avec la quantité d'hydrocarbure prévue"
  },
  "12.11": {
   "officiel": "Réaliser un contrôle d'étanchéité sur le système au moyen d'une méthode directe",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Contrôler l'étanchéité par une méthode directe"
  },
  "12.12": {
   "officiel": "Rédiger un rapport sur le travail d'entretien effectué",
   "groupe": "G12",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
   "cat": [
    "A1",
    "A2"
   ],
   "libelle": "Rédiger le rapport d'intervention"
  },
  "13.01": {
   "officiel": "Connaître les prescriptions en matière d'étiquetage pour le R744 dans les systèmes et les récipients à pression",
   "groupe": "G13",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R744 (CO2)",
   "libelle": "Reconnaître une installation CO₂ et ses risques (pression)"
  },
  "13.04": {
   "officiel": "Connaître les prescriptions en matière de sécurité pour les outils et équipements d'entretien, tels que la détection de gaz, la détection des fuites, les équipements de protection individuelle",
   "groupe": "G13",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R744 (CO2)",
   "libelle": "Identifier les cylindres et matériels dédiés, et ne pas intervenir"
  },
  "14.01": {
   "officiel": "Lire et comprendre les diagrammes de tuyauterie et d'instrumentation des systèmes de réfrigération au R717 (NH3)",
   "groupe": "G14",
   "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R717 (NH3)",
   "libelle": "Reconnaître une installation NH₃ et la conduite à tenir"
  },
  "1.09": {
   "officiel": "Connaître la pression du CO2, le cycle transcritique ou subcritique, le diagramme log p/h, les tables de saturation du CO2, l'état d'agrégation du CO2 (formation de glace carbonique)",
   "groupe": "G1",
   "groupe_titre": "Législation et thermodynamique élémentaire",
   "libelle": "Connaître les pressions élevées du CO₂, son diagramme log p/h, ses tables de saturation et le risque de glace carbonique."
  }
 },
 "cartes": [
  {
   "id": "c00",
   "type": "accueil",
   "titre": "Habilitation fluides frigorigènes",
   "corps": "<p class=\"lead\">Quatre catégories, un seul référentiel : <b>A1</b> et <b>A2</b> couvrent toute l'activité, <b>D</b> la récupération seule, <b>E</b> le contrôle d'étanchéité sans ouvrir le circuit.</p><p>Choisis ton parcours — ou va directement <b>réviser par thème</b> : cet outil est fait pour t'accompagner <b>avant</b> la formation, <b>pendant</b> les périodes en entreprise et jusqu'à l'épreuve. Chaque question corrigée renvoie vers la fiche à relire. Progression conseillée en formation : <b>E → D → A2 → A1</b>.</p>",
   "menu_titre": "Choisir un parcours",
   "liens": [
    {
     "vers": "m-secu",
     "icone": "⚠",
     "titre": "Sécurité — à voir en premier",
     "desc": "Ce qui peut vous blesser, et comment l éviter.",
     "primaire": true
    },
    {
     "vers": "m-clas",
     "icone": "☠",
     "titre": "Classification des fluides et risques",
     "desc": "Lire une classe NF EN 378 : ce que la case impose en EPI, ventilation et détection. Dont le CO₂.",
     "primaire": true
    },
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
     "vers": "m-rev",
     "icone": "📚",
     "titre": "Réviser par thème",
     "desc": "En autonomie : 13 séries corrigées, reliées aux fiches. Avant la formation, pendant le stage, avant l'épreuve."
    },
    {
     "vers": "m-prat",
     "icone": "🔧",
     "titre": "Préparation pratique",
     "desc": "Le matériel et les gestes, à revoir avant l atelier."
    },
    {
     "url": "galerie.html",
     "icone": "🎬",
     "titre": "Voir toutes les animations",
     "desc": "Les schémas animés du pack sur une seule page, chacun rejouable d un clic : ce qui se passe dans le local, dans le circuit, sur la balance."
    },
    {
     "url": "packs/fluides/res/frise-vivante/frise-vivante.html",
     "icone": "🕰",
     "titre": "Revoir la frise vivante",
     "desc": "Le cours interactif qui ouvre la formation : l histoire des fluides, de l invention des CFC au règlement F-Gas 2024 — pourquoi cette formation existe. Racontée, avec voix et images."
    },
    {
     "vers": "cfin",
     "icone": "?",
     "titre": "À propos de ce démonstrateur",
     "desc": "Ce qu'il montre, ce qu'il ne fait pas encore."
    }
   ]
  },
  {
   "id": "m-a1",
   "type": "menu",
   "categorie": "A1",
   "illus": "img/illu-a1.jpg",
   "titre": "Catégorie A1 — tous équipements, toutes charges",
   "dc": "Parcours A1",
   "corps": "<p>Groupes évalués : <b>1, 2, 3, 4, 5, 10, 11</b>, <b>au moins un</b> des groupes composants 6/7/8/9 tiré au sort le jour de l'épreuve — donc les quatre s'apprennent — et <b>12</b> (hydrocarbures), la nouveauté de cette catégorie.</p><p>Formation indicative ≈ 35 h. Épreuve : <b>4 h 15</b>.</p>",
   "menu_titre": "Les modules du parcours",
   "liens": [
    {
     "vers": "m-secu",
     "icone": "⚠",
     "titre": "Sécurité — à voir en premier",
     "desc": "Ce qui peut vous blesser, et comment l éviter.",
     "primaire": true
    },
    {
     "vers": "m-clas",
     "icone": "☠",
     "titre": "Classification des fluides et risques",
     "desc": "Lire une classe NF EN 378 : ce que la case impose en EPI, ventilation et détection. Dont le CO₂.",
     "primaire": true
    },
    {
     "vers": "g0",
     "icone": "§",
     "titre": "Ce que la loi vous impose",
     "desc": "G1 — règlement (UE) 2024/573, attestations, registre, DEEE."
    },
    {
     "vers": "g1a",
     "icone": "1",
     "titre": "Unités, pression, thermodynamique utile",
     "desc": "G1 — le socle de tout le reste."
    },
    {
     "vers": "g1s",
     "icone": "1",
     "titre": "Chaleur sensible et chaleur latente",
     "desc": "G1 · code 1.02 — le palier de changement d état, d où vient tout le reste."
    },
    {
     "vers": "g1b",
     "icone": "1",
     "titre": "Lire un log p-h et une table de saturation",
     "desc": "G1 · code 1.03 — les trois zones, et tracer le cycle."
    },
    {
     "vers": "g1e",
     "icone": "1",
     "titre": "Surchauffe et sous-refroidissement",
     "desc": "G1 · codes 1.02 · 5.05 — des différences, jamais des températures."
    },
    {
     "vers": "g1c",
     "icone": "1",
     "titre": "Familles et codes des fluides",
     "desc": "G1 — CFC, HCFC, HFC, HFO, naturels ; décoder R-134a."
    },
    {
     "vers": "g1d",
     "icone": "1",
     "titre": "Les organes qui trahissent une fuite",
     "desc": "G1 — voyant, vannes, pressostats : lire les signes."
    },
    {
     "vers": "g2a",
     "icone": "2",
     "titre": "L'histoire : ozone et climat",
     "desc": "G2 — effet de serre, trou d'ozone, Montréal, Kyoto, Kigali."
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
     "desc": "G6 à G9 — huit fiches : le principe, puis les gestes."
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
     "vers": "g12b",
     "icone": "12",
     "titre": "Intervenir sur un circuit hydrocarbure",
     "desc": "G12 — le mode opératoire, étape par étape."
    },
    {
     "vers": "g13",
     "icone": "ℹ",
     "titre": "CO₂ et NH₃ — information",
     "desc": "G13/G14 — reconnaître, ne pas intervenir."
    },
    {
     "vers": "ex-ech",
     "icone": "🟢",
     "titre": "Échauffement — niveau 1",
     "desc": "12 questions fondamentales, seuil 60 %. Pour se lancer."
    },
    {
     "vers": "ex-a1",
     "icone": "📝",
     "titre": "Examen blanc A1",
     "desc": "20 questions tirées de tous les groupes."
    },
    {
     "vers": "ex-defi",
     "icone": "🔴",
     "titre": "Défi technicien — niveau 2",
     "desc": "15 diagnostics et mises en situation, seuil 80 %."
    },
    {
     "vers": "c-prog",
     "icone": "📊",
     "titre": "Ma progression",
     "desc": "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur."
    },
    {
     "vers": "m-prat",
     "icone": "🔧",
     "titre": "Préparation pratique",
     "desc": "Le matériel et les gestes, à revoir avant l atelier."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ]
  },
  {
   "id": "m-a2",
   "type": "menu",
   "categorie": "A2",
   "illus": "img/illu-a2.jpg",
   "titre": "Catégorie A2 — mêmes activités, charge limitée",
   "dc": "Parcours A2",
   "corps": "<p>Le référentiel est <b>le même qu'A1</b>. Ce qui change, ce n'est pas le contenu : c'est le <b>parc</b>. On travaille sur des équipements de charge <b>&lt; 3 kg</b>, ou <b>&lt; 6 kg</b> s'ils sont hermétiquement scellés et étiquetés comme tels : monosplit, PAC air/air, vitrine, meuble frigorifique, monobloc.</p><p>Une grande partie de ce parc fonctionne au <b>R-290</b> : le module hydrocarbures est ici encore plus central qu'en A1. Formation indicative ≈ 28 h. Épreuve : <b>3 h 55</b>.</p>",
   "menu_titre": "Les modules du parcours",
   "liens": [
    {
     "vers": "m-secu",
     "icone": "⚠",
     "titre": "Sécurité — à voir en premier",
     "desc": "Ce qui peut vous blesser, et comment l éviter.",
     "primaire": true
    },
    {
     "vers": "m-clas",
     "icone": "☠",
     "titre": "Classification des fluides et risques",
     "desc": "Lire une classe NF EN 378 : ce que la case impose en EPI, ventilation et détection. Dont le CO₂.",
     "primaire": true
    },
    {
     "vers": "g0",
     "icone": "§",
     "titre": "Ce que la loi vous impose",
     "desc": "G1 — règlement (UE) 2024/573, attestations, registre, DEEE."
    },
    {
     "vers": "g1a",
     "icone": "1",
     "titre": "Unités, pression, thermodynamique utile",
     "desc": "G1 — insister sur les seuils de charge."
    },
    {
     "vers": "g1s",
     "icone": "1",
     "titre": "Chaleur sensible et chaleur latente",
     "desc": "G1 · code 1.02 — le palier de changement d état, d où vient tout le reste."
    },
    {
     "vers": "g1b",
     "icone": "1",
     "titre": "Lire un log p-h et une table de saturation",
     "desc": "G1 · code 1.03 — les trois zones, et tracer le cycle."
    },
    {
     "vers": "g1e",
     "icone": "1",
     "titre": "Surchauffe et sous-refroidissement",
     "desc": "G1 · codes 1.02 · 5.05 — des différences, jamais des températures."
    },
    {
     "vers": "g1c",
     "icone": "1",
     "titre": "Familles et codes des fluides",
     "desc": "G1 — CFC, HCFC, HFC, HFO, naturels ; décoder R-134a."
    },
    {
     "vers": "g1d",
     "icone": "1",
     "titre": "Les organes qui trahissent une fuite",
     "desc": "G1 — voyant, vannes, pressostats : lire les signes."
    },
    {
     "vers": "g2a",
     "icone": "2",
     "titre": "L'histoire : ozone et climat",
     "desc": "G2 — effet de serre, trou d'ozone, Montréal, Kyoto, Kigali."
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
     "vers": "g12b",
     "icone": "12",
     "titre": "Intervenir sur un circuit hydrocarbure",
     "desc": "G12 — le mode opératoire, étape par étape."
    },
    {
     "vers": "ex-ech",
     "icone": "🟢",
     "titre": "Échauffement — niveau 1",
     "desc": "12 questions fondamentales, seuil 60 %. Pour se lancer."
    },
    {
     "vers": "ex-a2",
     "icone": "📝",
     "titre": "Examen blanc A2",
     "desc": "15 questions tirées de tous les groupes."
    },
    {
     "vers": "ex-defi",
     "icone": "🔴",
     "titre": "Défi technicien — niveau 2",
     "desc": "15 diagnostics et mises en situation, seuil 80 %."
    },
    {
     "vers": "c-prog",
     "icone": "📊",
     "titre": "Ma progression",
     "desc": "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur."
    },
    {
     "vers": "m-prat",
     "icone": "🔧",
     "titre": "Préparation pratique",
     "desc": "Le matériel et les gestes, à revoir avant l atelier."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ]
  },
  {
   "id": "m-d",
   "type": "menu",
   "categorie": "D",
   "illus": "img/illu-d.jpg",
   "titre": "Catégorie D — récupération seule",
   "dc": "Parcours D",
   "corps": "<p>Une seule activité autorisée : <b>récupérer le fluide</b>. Public type : opérateur de fin de vie, filière DEEE, dépanneur qui ne fait que récupérer.</p><p><b>Ne fait pas partie de D</b> : contrôles d'étanchéité (G4), composants (G6 à G9), tuyauterie et brasage (G10), épreuves de pression. Du groupe 3, seul le code <b>3.03</b> (utiliser une pompe à vide) est dans le champ.</p><p>Formation indicative ≈ 10 h. Épreuve : <b>1 h 30</b>.</p>",
   "menu_titre": "Les modules du parcours",
   "liens": [
    {
     "vers": "m-secu",
     "icone": "⚠",
     "titre": "Sécurité — à voir en premier",
     "desc": "Ce qui peut vous blesser, et comment l éviter.",
     "primaire": true
    },
    {
     "vers": "m-clas",
     "icone": "☠",
     "titre": "Classification des fluides et risques",
     "desc": "Lire une classe NF EN 378 : ce que la case impose en EPI, ventilation et détection. Dont le CO₂.",
     "primaire": true
    },
    {
     "vers": "g0",
     "icone": "§",
     "titre": "Ce que la loi vous impose",
     "desc": "G1 — règlement (UE) 2024/573, attestations, registre, DEEE."
    },
    {
     "vers": "g1a",
     "icone": "1",
     "titre": "Bases : fluides, thermo utile, composants",
     "desc": "G1 partiel — savoir de quoi on parle."
    },
    {
     "vers": "g1s",
     "icone": "1",
     "titre": "Chaleur sensible et chaleur latente",
     "desc": "G1 · code 1.02 — pourquoi un fluide qui change d état, et pas de l air."
    },
    {
     "vers": "g1e",
     "icone": "1",
     "titre": "Dans quel état est le fluide ?",
     "desc": "G1 · code 5.05 — sous-refroidi, saturé ou surchauffé : à savoir avant toute charge."
    },
    {
     "vers": "g1c",
     "icone": "1",
     "titre": "Familles et codes des fluides",
     "desc": "G1 — CFC, HCFC, HFC, HFO, naturels ; décoder R-134a."
    },
    {
     "vers": "g2a",
     "icone": "2",
     "titre": "L'histoire : ozone et climat",
     "desc": "G2 — effet de serre, trou d'ozone, Montréal, Kyoto, Kigali."
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
     "vers": "x3",
     "icone": "🕵",
     "titre": "Détective : la bouteille de récupération",
     "desc": "Mise en situation — le niveau maxi est atteint."
    },
    {
     "vers": "ex-d-ech",
     "icone": "🟢",
     "titre": "Échauffement — niveau 1",
     "desc": "8 questions fondamentales, seuil 60 %."
    },
    {
     "vers": "ex-d",
     "icone": "📝",
     "titre": "Examen blanc D",
     "desc": "10 questions sur le périmètre D."
    },
    {
     "vers": "c-prog",
     "icone": "📊",
     "titre": "Ma progression",
     "desc": "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur."
    },
    {
     "vers": "m-prat",
     "icone": "🔧",
     "titre": "Préparation pratique",
     "desc": "Le matériel et les gestes, à revoir avant l atelier."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ]
  },
  {
   "id": "m-e",
   "type": "menu",
   "categorie": "E",
   "illus": "img/illu-e.jpg",
   "titre": "Catégorie E — contrôle d'étanchéité, sans ouvrir",
   "dc": "Parcours E",
   "corps": "<p>Une seule activité : le <b>contrôle d'étanchéité</b>, à la condition expresse de <b>ne pas accéder au circuit frigorifique</b>. C'est la frontière du métier : <b>on contrôle, on n'ouvre pas</b>.</p><p>Le code <b>4.06</b> (méthode directe nécessitant d'intervenir dans le circuit) <b>n'est pas de la catégorie E</b>. Le code 4.07, lui, l'est : c'est la méthode directe qui reste à l'extérieur.</p><p>Public type : agent de maintenance réalisant les contrôles périodiques. Formation indicative ≈ 10 h. Épreuve : <b>1 h 30</b>.</p>",
   "menu_titre": "Les modules du parcours",
   "liens": [
    {
     "vers": "m-secu",
     "icone": "⚠",
     "titre": "Sécurité — à voir en premier",
     "desc": "Ce qui peut vous blesser, et comment l éviter.",
     "primaire": true
    },
    {
     "vers": "m-clas",
     "icone": "☠",
     "titre": "Classification des fluides et risques",
     "desc": "Lire une classe NF EN 378 : ce que la case impose en EPI, ventilation et détection. Dont le CO₂.",
     "primaire": true
    },
    {
     "vers": "g0",
     "icone": "§",
     "titre": "Ce que la loi vous impose",
     "desc": "G1 — règlement (UE) 2024/573, attestations, registre, DEEE."
    },
    {
     "vers": "g1a",
     "icone": "1",
     "titre": "Bases : pression, température, fluides",
     "desc": "G1 partiel — dont la pression absolue."
    },
    {
     "vers": "g1s",
     "icone": "1",
     "titre": "Chaleur sensible et chaleur latente",
     "desc": "G1 — le palier de changement d état : sans lui, une table de saturation ne veut rien dire."
    },
    {
     "vers": "g1b",
     "icone": "1",
     "titre": "Lire un log p-h et une table de saturation",
     "desc": "G1 · code 1.03 — indispensable à la méthode indirecte.",
     "primaire": true
    },
    {
     "vers": "g1e",
     "icone": "1",
     "titre": "Surchauffe et sous-refroidissement",
     "desc": "G1 — les deux valeurs que la méthode indirecte compare. Des différences, jamais des températures.",
     "primaire": true
    },
    {
     "vers": "g1c",
     "icone": "1",
     "titre": "Familles et codes des fluides",
     "desc": "G1 — CFC, HCFC, HFC, HFO, naturels ; décoder R-134a."
    },
    {
     "vers": "g2a",
     "icone": "2",
     "titre": "L'histoire : ozone et climat",
     "desc": "G2 — effet de serre, trou d'ozone, Montréal, Kyoto, Kigali."
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
     "vers": "x4",
     "icone": "🕵",
     "titre": "Détective : le contrôle qui tourne mal",
     "desc": "Mise en situation — registre, détecteur, incohérence."
    },
    {
     "vers": "ex-e-ech",
     "icone": "🟢",
     "titre": "Échauffement — niveau 1",
     "desc": "8 questions fondamentales, seuil 60 %."
    },
    {
     "vers": "ex-e",
     "icone": "📝",
     "titre": "Examen blanc E",
     "desc": "10 questions sur le périmètre E."
    },
    {
     "vers": "c-prog",
     "icone": "📊",
     "titre": "Ma progression",
     "desc": "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur."
    },
    {
     "vers": "m-prat",
     "icone": "🔧",
     "titre": "Préparation pratique",
     "desc": "Le matériel et les gestes, à revoir avant l atelier."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ]
  },
  {
   "id": "m-rev",
   "type": "menu",
   "titre": "Réviser par thème",
   "dc": "Auto-formation · avant, pendant, après",
   "corps": "<p class=\"lead\">Cet espace est fait pour être utilisé <b>seul</b> : avant la formation pour arriver préparé, pendant les périodes de stage pour entretenir, avant l'épreuve pour cibler.</p><p>Chaque série corrige <b>immédiatement</b>, chaque erreur renvoie vers la fiche à relire, et le bilan de fin liste tes points faibles. Ton <b>score précédent</b> s'affiche à chaque nouvelle tentative : bats-le.</p>",
   "menu_titre": "Choisir un thème",
   "liens": [
    {
     "vers": "rev-g1",
     "icone": "1",
     "titre": "Les bases : pression, température, cycle",
     "desc": "unités, relation P-T, les quatre organes, le log p-h — 10 questions."
    },
    {
     "vers": "rev-g2",
     "icone": "2",
     "titre": "Environnement et F-Gas",
     "desc": "PRP, tonnes équivalent CO₂, règlement (UE) 2024/573 — 7 questions."
    },
    {
     "vers": "rev-g3",
     "icone": "3",
     "titre": "Contrôles avant mise en service",
     "desc": "épreuve azote, tirage au vide — 5 questions."
    },
    {
     "vers": "rev-g4",
     "icone": "4",
     "titre": "Contrôles d'étanchéité",
     "desc": "registre, méthode indirecte, détecteur — le cœur du parcours E — 10 questions."
    },
    {
     "vers": "rev-g5",
     "icone": "5",
     "titre": "Récupération, charge, traçabilité",
     "desc": "cylindres, pesée, registre, fin de vie — le cœur du parcours D — 10 questions."
    },
    {
     "vers": "rev-g6",
     "icone": "6",
     "titre": "Compresseur et circuit d'huile",
     "desc": "principe, sécurités, retour d'huile, diagnostics — 10 questions."
    },
    {
     "vers": "rev-g7",
     "icone": "7",
     "titre": "Condenseur",
     "desc": "principe, pressostats, incondensables, entretien — 8 questions."
    },
    {
     "vers": "rev-g8",
     "icone": "8",
     "titre": "Évaporateur",
     "desc": "surchauffe, givrage, dégivrage, diagnostics — 10 questions."
    },
    {
     "vers": "rev-g9",
     "icone": "9",
     "titre": "Détendeur et accessoires",
     "desc": "TXV, capillaire, filtre, voyant, électrovanne — 10 questions."
    },
    {
     "vers": "rev-g10",
     "icone": "10",
     "titre": "Tuyauterie et brasage",
     "desc": "balayage azote, alliages, cintrage — 6 questions."
    },
    {
     "vers": "rev-g11",
     "icone": "11",
     "titre": "Substitution et efficacité",
     "desc": "classes de sécurité, COP, drop-in et retrofit — 10 questions."
    },
    {
     "vers": "rev-g12",
     "icone": "12",
     "titre": "Hydrocarbures",
     "desc": "R-290, analyse de risques, zéro ignition — 7 questions."
    },
    {
     "vers": "rev-g13",
     "icone": "13",
     "titre": "CO₂ et NH₃",
     "desc": "reconnaître, respecter les catégories, ne pas intervenir — 9 questions."
    },
    {
     "vers": "ex-ech",
     "icone": "🟢",
     "titre": "Se tester — Échauffement (niveau 1)",
     "desc": "12 questions fondamentales, tous thèmes, seuil 60 %."
    },
    {
     "vers": "ex-defi",
     "icone": "🔴",
     "titre": "Se tester — Défi technicien (niveau 2)",
     "desc": "15 diagnostics, tous thèmes, seuil 80 %."
    },
    {
     "vers": "c-prog",
     "icone": "📊",
     "titre": "Ma progression",
     "desc": "Où j en suis, compétence par compétence. Rien ne sort de votre navigateur."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Revenir aux parcours."
    }
   ]
  },
  {
   "id": "c-prog",
   "type": "progression",
   "titre": "Ma progression",
   "dc": "Auto-formation · où j'en suis",
   "liens": [
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ]
  },
  {
   "id": "m-secu",
   "type": "menu",
   "titre": "Sécurité — ce qui peut vous blesser",
   "dc": "À voir en premier",
   "corps": "<img src=\"packs/fluides/res/svg/intro-securite.svg\" alt=\"Introduction animée : le reste de la formation protège l'installation et l'environnement ; ce module-ci vous protège, vous. Cinq dangers, cinq fiches. La sécurité se démontre et s'impose, elle ne se découvre jamais par l'erreur.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le reste de cette formation vous apprend à protéger <b>l installation</b> et <b>l environnement</b>. Ce module-ci vous apprend à vous protéger <b>vous</b>.</p><p>Cinq dangers, cinq fiches. Ce qui arrive, comment ça arrive vraiment, ce qui protège, et le geste qu on ne fait jamais.</p>",
   "menu_titre": "Les cinq dangers",
   "liens": [
    {
     "vers": "s1",
     "icone": "1",
     "titre": "L'air qui manque — l'asphyxie",
     "desc": "Le danger qu on ne sent pas venir : le fluide chasse l air respirable."
    },
    {
     "vers": "s2",
     "icone": "2",
     "titre": "Le froid brûle — projections et gelures",
     "desc": "Le fluide liquide gèle la peau en un instant. Gants et lunettes, toujours."
    },
    {
     "vers": "s3",
     "icone": "3",
     "titre": "La flamme interdite — décomposition du fluide",
     "desc": "Chauffer un circuit non récupéré libère des gaz corrosifs et toxiques."
    },
    {
     "vers": "s4",
     "icone": "4",
     "titre": "Ce qui éclate — la pression",
     "desc": "Un circuit reste sous pression à l arrêt. Une bouteille ne se chauffe jamais."
    },
    {
     "vers": "s5",
     "icone": "5",
     "titre": "Consigner avant de toucher — le risque électrique",
     "desc": "Cinq étapes avant de toucher. Un arc électrique brûle sans contact."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ]
  },
  {
   "id": "s1",
   "type": "cours",
   "titre": "L'air qui manque — l'asphyxie",
   "dc": "Sécurité · codes 12.02 · 12.13",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/s1-double-accident.svg\" alt=\"Animation : la nappe de gaz monte dans le local fermé, le technicien descend et tombe, puis le collègue descend le secourir et devient la seconde victime. Deux victimes au lieu d'une.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Respirer, c'est faire entrer de l'oxygène dans le corps. Un local fermé peut se remplir d'un autre gaz : de l'azote utilisé pour mettre un circuit en pression, ou du fluide frigorigène qui a fui. Ce gaz prend la place de l'oxygène dans l'air. C'est une <b>asphyxie par manque d'oxygène</b> : vous ne respirez plus assez d'oxygène, non pas parce qu'un produit vous empoisonne, mais parce qu'il a chassé l'air respirable.</p><p>Face à l'<b>azote</b> et aux <b>fluides fluorés</b>, le corps ne donne <b>aucune alerte</b>. Normalement, l'envie de respirer plus fort vient d'un excès de gaz carbonique dans le sang, pas d'un manque d'oxygène. Dans un local pauvre en oxygène, vous ne suffoquez donc pas peu à peu : vous pouvez perdre connaissance <b>en quelques instants, sans gêne ressentie avant</b>. L'azote est incolore et inodore. La plupart des fluides fluorés le sont aussi ; l'ammoniac, lui, a une odeur forte. Mais tous les fluides ne se comportent pas pareil : se fier à l'odeur reste dangereux.</p><p><b>Une exception importante : le CO₂ (R-744).</b> Lui vous <b>prévient</b> — essoufflement, mal de tête, vertiges — parce qu'il agit sur la commande de la respiration. C'est une chance, mais tardive : ces signes n'arrivent qu'une fois dans le gaz. Et pour la même raison, un détecteur d'oxygène seul ne suffit pas à le surveiller. Ce fluide a sa fiche : « CO₂ : deux dangers mortels ».</p><p><b>Ce danger n'a pas de code dans le référentiel d'examen.</b> Vous ne serez pas interrogé dessus à l'épreuve. Il peut pourtant vous tuer. C'est pour cela qu'il est dans ce module.</p><p>C'est le scénario du schéma ci-dessus, et c'est le plus fréquent de ce type d'accident : un local resté fermé, quelqu'un qui entre sans rien sentir, puis un collègue qui se précipite pour le secourir sans se protéger ni ventiler — il respire le même air appauvri et s'effondre à son tour. <b>Deux victimes au lieu d'une.</b></p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ol><li><b>Ventilez</b> le local avant d'entrer : ouvrez, aérez, laissez l'air circuler.</li><li><b>Contrôlez l'air</b> avec un détecteur d'oxygène avant d'entrer — pas seulement un détecteur de fuite de fluide, ce n'est pas le même appareil. Le seuil d'alerte se règle selon la FDS (fiche de données de sécurité) du fluide concerné. <b>Devant une installation au CO₂, un détecteur d'oxygène ne suffit pas</b> : il faut mesurer le CO₂ lui-même.</li><li><b>N'entrez jamais seul</b> dans un espace clos suspect : prévenez quelqu'un, travaillez à deux.</li><li>Si un collègue est au sol dans un espace clos : <b>ne vous précipitez pas sans protection</b>. Donnez l'alerte, ventilez, faites intervenir les secours.</li></ol>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>Entrer seul dans un local fermé, une chambre froide ou une fosse, après une mise en pression à l'azote ou une fuite suspectée, <b>sans ventiler ni contrôler l'air</b>.</p><p>Conséquence : avec l'azote ou un fluide fluoré, perte de connaissance sans signe avant-coureur. Avec le CO₂, des signes arrivent — essoufflement, mal de tête — mais quand vous êtes déjà dans le gaz. Risque mortel dans les deux cas, pour vous et pour quiconque tenterait de vous secourir sans précaution.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Une fuite de fluide est possible dans une chambre froide restée porte fermée toute la nuit. Que faites-vous avant d'y entrer ?",
    "choix": [
     "J'entre rapidement, je ne reste que quelques secondes.",
     "Je ventile le local, et je contrôle l'air avec un détecteur avant d'entrer.",
     "Je vérifie d'abord s'il y a une odeur suspecte.",
     "J'entre avec un collègue, sans autre précaution, pour me rassurer."
    ],
    "bonne": 1,
    "explication": "Un local fermé où du fluide ou de l'azote a pu s'accumuler ne donne aucun signal fiable. Ni la rapidité, ni l'odeur, ni la présence d'un collègue ne protègent du manque d'oxygène. Seuls la ventilation et un détecteur d'oxygène donnent une information sûre avant d'entrer. Une exception à connaître : devant une installation au CO₂, le détecteur d'oxygène ne suffit pas — il faut mesurer le CO₂ lui-même, comme l'explique la fiche qui lui est consacrée.",
    "remediation_vers": "s1"
   },
   "criteres": [
    {
     "code": "12.02",
     "libelle": "Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI.",
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.13",
     "libelle": "Vérifier la sécurité du site : signalisation, issues de secours, détecteurs et alarmes gaz.",
     "etat": "a_evaluer",
     "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "s2",
     "libelle": "Suite ▸ Le froid brûle — projections et gelures"
    },
    {
     "vers": "m-secu",
     "libelle": "↺ Module sécurité",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "s2",
   "type": "cours",
   "titre": "Le froid brûle — projections et gelures",
   "dc": "Sécurité · codes 12.02",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/secu-projection.svg\" alt=\"Le liquide jaillit dans l'axe du raccord : on se place hors de cet axe, on vérifie au manomètre que la pression est nulle, et on porte gants et lunettes.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Un fluide frigorigène liquide est sous pression. Dès qu'il retrouve la pression de l'air ambiant, il s'évapore d'un coup. Cette évaporation absorbe une grande quantité de chaleur autour de lui, y compris sur la peau qu'il touche. Ce contact provoque une <b>brûlure froide</b>, aussi appelée <b>gelure</b> : les tissus gèlent presque instantanément. C'est le même résultat qu'une brûlure classique, mais par le froid plutôt que par la chaleur.</p><p>Les yeux sont particulièrement exposés : un jet de liquide est souvent invisible et rapide, et l'œil n'a pas de réflexe de protection efficace contre lui. Un contact avec de l'ammoniac liquide ajoute une <b>brûlure chimique</b> à la brûlure froide : ce fluide n'appartient pas à la même famille que les fluides fluorés, et ne se comporte pas comme eux.</p><p>Le cas type : vous déconnectez un flexible de <b>manifold</b> (l'appareil à manomètres) en pensant le tronçon vide. La vanne n'a pas été vérifiée, le manomètre pas relu. Le liquide restant jaillit au desserrage — dans l'axe du raccord, comme sur le schéma.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ol><li>Mettez vos <b>EPI</b> (équipements de protection individuelle) — ici, gants et lunettes — avant toute manipulation d'un circuit sous pression.</li><li><b>Vérifiez au manomètre</b> que la pression est nulle, et que la vanne est fermée, avant de débrancher un flexible ou de desserrer un raccord.</li><li><b>Desserrez progressivement</b>, jamais d'un coup, et restez hors de la trajectoire d'un éventuel jet.</li><li>En cas de projection sur la peau ou les yeux : rincez sans frotter, et consultez. La conduite à tenir précise figure sur la <b>FDS</b> (fiche de données de sécurité) du fluide utilisé.</li></ol>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>Débrancher un flexible ou desserrer un raccord sous pression <b>sans vérifier au manomètre</b> qu'il est vide, ou le faire sans gants ni lunettes.</p><p>Conséquence : projection de liquide qui gèle la peau ou les yeux au contact. Risque de lésion oculaire grave.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous devez déconnecter un flexible de manifold. Que vérifiez-vous avant de le desserrer ?",
    "choix": [
     "Que le flexible est bien enroulé.",
     "Que le fluide utilisé n'a pas d'odeur.",
     "Que la vanne est fermée, et que le manomètre affiche une pression nulle.",
     "Que le compresseur est à l'arrêt depuis longtemps."
    ],
    "bonne": 2,
    "explication": "Un reste de liquide sous pression peut jaillir dès qu'on desserre un raccord. Seule la lecture du manomètre, vanne fermée, garantit qu'il n'y a plus de pression avant de débrancher. Gants et lunettes restent nécessaires dans tous les cas.",
    "remediation_vers": "s2"
   },
   "criteres": [
    {
     "code": "12.02",
     "libelle": "Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI.",
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "s3",
     "libelle": "Suite ▸ La flamme interdite — décomposition du fluide"
    },
    {
     "vers": "m-secu",
     "libelle": "↺ Module sécurité",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "s3",
   "type": "cours",
   "titre": "La flamme interdite — décomposition du fluide",
   "dc": "Sécurité · codes 11.03",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/secu-flamme.svg\" alt=\"À gauche le geste interdit : chauffer un tronçon non récupéré, les gaz toxiques remontent vers le visage penché. À droite le geste juste : récupérer, balayer à l'azote, ventiler.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Un fluide frigorigène fluoré est stable à température normale. Il ne l'est plus face à une flamme. Chauffé au contact d'une flamme ou d'une surface très chaude, il ne brûle pas comme un carburant : il se <b>décompose</b>. Sa molécule se casse et forme d'autres substances, absentes du fluide d'origine — des gaz toxiques et corrosifs.</p><p>Certains fluides ajoutent un second risque. Selon la norme NF EN 378, les fluides classés <b>A2L</b> (légèrement inflammables, comme le R-32 ou le R-1234yf) ou <b>A3</b> (très inflammables, comme le R-290 ou le R-600a) peuvent eux-mêmes s'enflammer au contact d'une flamme ou d'une étincelle. La classe du fluide utilisé se lit sur sa FDS (fiche de données de sécurité).</p><p>Le cas type : un tronçon où il reste « une petite quantité, ça ne changera rien ». La flamme touche ce fluide résiduel, il se décompose, et les fumées se dégagent juste sous le visage penché sur le brasage.</p><img src=\"packs/fluides/res/svg/secu-decomposition-ari.svg\" alt=\"Animation : sans protection, on reste dans les fumées et on tousse. La bonne réponse : s'éloigner, alerter, et ne laisser approcher qu'une personne formée portant un appareil respiratoire isolant (ARI) complet.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p><b>Et si des fumées de décomposition sont déjà présentes</b> — une fuite qui a rencontré une source chaude avant votre arrivée, par exemple ? La réponse n'est plus la procédure de brasage, c'est l'éloignement. Un masque à cartouche ou un simple masque filtrant ne protège <b>ni</b> des gaz de décomposition <b>ni</b> d'un manque d'oxygène : seul un <b>appareil respiratoire isolant</b> (ARI), avec sa propre réserve d'air, le permet — et son usage est réservé à des personnes formées. Retenez la règle : l'ARI protège l'intervenant formé, il ne remplace jamais l'éloignement de la source ni l'évacuation de la zone.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ol><li><b>Récupérez</b> entièrement le fluide du tronçon à chauffer avant toute opération de brasage : jamais de brasage sur un circuit encore chargé.</li><li>Ne recherchez <b>jamais une fuite avec une flamme</b> : utilisez un détecteur électronique.</li><li>Faites circuler de l'azote à l'intérieur du tube pendant le brasage, avec un mano-détendeur, pour en chasser l'air et les résidus : c'est le <b>balayage</b>.</li><li><b>Ventilez</b> la zone de travail, et ne restez pas penché directement au-dessus de la flamme.</li><li>Des fumées déjà présentes : <b>éloignement d'abord</b>, ARI réservé à une personne formée.</li></ol>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>Chauffer ou braser un tronçon de circuit sans avoir récupéré et vérifié l'absence de fluide, ou rechercher une fuite avec une flamme.</p><p>Conséquence : dégagement de gaz toxiques et corrosifs, inhalés à bout portant. Risque d'incendie en plus, si le fluide est inflammable (classe A2L ou A3).</p><p>Interdit aussi : entrer dans des fumées déjà présentes sans protection respiratoire isolante, ou croire qu'un masque à cartouche suffit.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous devez braser un raccord sur un tronçon de circuit. Quel geste est indispensable avant de chauffer ?",
    "choix": [
     "Vérifier à l'odeur que le fluide s'est évaporé.",
     "Rechercher une éventuelle fuite avec la flamme du chalumeau.",
     "Augmenter la pression du circuit pour aller plus vite.",
     "Récupérer le fluide du tronçon, puis balayer à l'azote pendant le brasage."
    ],
    "bonne": 3,
    "explication": "Un fluide chauffé par une flamme se décompose en gaz toxiques, qu'il soit inflammable ou non. Il faut le récupérer avant de braser, jamais le rechercher à la flamme, ni compter sur l'odeur. Le balayage à l'azote protège le tube et l'air respiré.",
    "remediation_vers": "s3"
   },
   "criteres": [
    {
     "code": "11.03",
     "libelle": "Connaître les règles de sécurité des fluides inflammables, toxiques ou à pression plus élevée.",
     "etat": "a_evaluer",
     "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "s4",
     "libelle": "Suite ▸ Ce qui éclate — la pression"
    },
    {
     "vers": "m-secu",
     "libelle": "↺ Module sécurité",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "s4",
   "type": "cours",
   "titre": "Ce qui éclate — la pression",
   "dc": "Sécurité · codes 11.03 · 3.01",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/secu-bouteille.svg\" alt=\"À gauche, bouteille remplie à ras : le liquide n'a pas de place pour se dilater, la pression grimpe très vite. À droite, volume libre respecté. En bas, les gestes interdits.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p><b>Ce qui arrive.</b> Un circuit frigorifique contient du fluide sous pression en permanence. Cette pression existe même quand la machine est à l'arrêt. Elle existe même quand il fait chaud dehors, alors que rien ne fonctionne. Une règle simple : plus la température monte, plus la pression à l'intérieur du circuit monte aussi. Une paroi — bouteille, flexible, raccord, tuyauterie — résiste à une certaine pression. Au-delà, elle cède : elle se déforme, se fissure, ou éclate d'un coup. Ce n'est pas une réaction chimique, c'est une question de force. La pression pousse de l'intérieur ; la paroi résiste de l'extérieur. Quand la pression gagne, la paroi perd.</p><p>Ce qui peut céder :</p><ul><li>une <b>bouteille de fluide</b> qui a chauffé au soleil ou près d'une source de chaleur ;</li><li>un <b>flexible</b> fatigué par le temps, l'usure ou de mauvais pliages ;</li><li>un <b>raccord</b> mal serré ou abîmé ;</li><li>un tronçon de circuit fermé des deux côtés par des vannes, sans aucune protection, alors qu'il reste rempli de fluide.</li></ul><p>Le schéma du haut explique pourquoi une bouteille ne se remplit <b>jamais</b> à ras : un liquide qui chauffe se dilate, et s'il n'a pas de volume libre au-dessus de lui, la pression grimpe très vite. Le taux de remplissage à respecter figure sur la plaque de la bouteille ou dans la documentation du fournisseur ; les propriétés du fluide, dans sa fiche de données de sécurité (FDS).</p><p><b>Comment ça arrive vraiment.</b> Sur un chantier, une bouteille de fluide oubliée dans un véhicule en plein été, vitres fermées, en est un exemple courant : l'habitacle chauffe fortement, la bouteille avec. Autre situation : un flexible de manifold ancien, jamais contrôlé, qui cède au moment où l'on ouvre une vanne. Autre situation encore : un tronçon de tuyauterie en toiture, isolé par deux vannes fermées pendant une réparation, laissé en plein soleil sans protection ni vérification avant de reprendre le travail dessus.</p><p>Un compresseur à l'arrêt n'est pas forcément une machine sans danger. Un circuit peut rester sous pression longtemps après l'arrêt d'une installation, sans qu'aucune fuite ne se produise. Rien à l'extérieur ne signale cette pression : ni bruit, ni mouvement, ni tiédeur. Un technicien qui desserre un raccord en se disant « de toute façon, c'est arrêté depuis longtemps » peut se retrouver face à une projection de fluide et de pièces.</p><p><b>Ce qui protège.</b> Dans l'ordre où on l'applique :</p><ol><li>Ne jamais exposer une bouteille de fluide à la chaleur ou au soleil direct : la stocker et la transporter à l'abri, à la verticale, arrimée.</li><li>Respecter le taux de remplissage indiqué par le fabricant : ne jamais remplir une bouteille à ras.</li><li>Connaître le rôle des <b>organes de sécurité</b> du circuit. Une <b>soupape de sécurité</b> s'ouvre automatiquement pour laisser échapper un peu de fluide avant que la pression n'atteigne un niveau dangereux ; son seuil de déclenchement est fixé par le fabricant et indiqué sur l'organe ou dans sa documentation. Vérifier la présence et le bon état de ces organes, sans jamais les démonter ni les bloquer.</li><li>Pour toute mise en pression du circuit — recherche de fuite, épreuve de pression — utiliser <b>uniquement de l'azote</b>, jamais de l'oxygène ni de l'air comprimé, et toujours au travers d'un <b>mano-détendeur</b> (un appareil qui réduit et règle la pression très élevée de la bouteille) réglé selon la documentation constructeur. Sans détendeur, la pression de la bouteille d'azote suffit à elle seule à faire éclater un circuit frigorifique.</li><li>Avant de desserrer quoi que ce soit sur un circuit à l'arrêt, mesurer sa pression au manomètre — même si l'installation semble arrêtée depuis longtemps.</li></ol>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ul><li>Un circuit reste sous pression même à l'arrêt et même par forte chaleur.</li><li>Une bouteille de fluide ne se chauffe jamais et ne se remplit jamais à ras.</li><li>Toute mise en pression se fait à l'azote seul, jamais à l'oxygène ni à l'air comprimé, toujours avec un mano-détendeur réglé selon la documentation constructeur.</li><li>Avant de toucher un raccord, vérifier la pression au manomètre, même sur une machine arrêtée depuis longtemps.</li></ul>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>On ne chauffe <b>jamais</b> une bouteille de fluide pour accélérer un transfert ou une charge — ni flamme, ni eau chaude, ni radiateur. On ne met <b>jamais</b> un circuit sous pression avec de l'oxygène ou de l'air comprimé, et on n'utilise <b>jamais</b> une bouteille d'azote sans mano-détendeur. Conséquence : la bouteille ou le circuit peut éclater et projeter du fluide et des fragments sur la personne présente.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Pourquoi une bouteille de fluide frigorigène ne doit-elle jamais être remplie à ras ?",
    "choix": [
     "Parce que cela fait perdre du fluide inutilement",
     "Parce que le liquide n'a plus de place pour se dilater si la température monte, et la pression grimpe très vite",
     "Parce que la bouteille devient plus difficile à transporter",
     "Parce que cela abîme la peinture de la bouteille"
    ],
    "bonne": 1,
    "explication": "Un liquide qui chauffe se dilate. S'il n'a pas de volume libre pour le faire, la pression à l'intérieur de la bouteille augmente très rapidement. C'est pour cela qu'un volume libre est toujours respecté, selon le taux de remplissage indiqué par le fabricant.",
    "remediation_vers": "s4"
   },
   "criteres": [
    {
     "code": "11.03",
     "libelle": "Connaître les règles de sécurité applicables aux fluides nécessitant une pression de fonctionnement plus élevée",
     "etat": "a_evaluer",
     "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "3.01",
     "libelle": "Réaliser une épreuve de pression à l'azote pour vérifier la résistance du circuit",
     "etat": "a_evaluer",
     "officiel": "Effectuer une épreuve de pression pour contrôler la résistance du système",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "s5",
     "libelle": "Suite ▸ Consigner avant de toucher — le risque électrique"
    },
    {
     "vers": "m-secu",
     "libelle": "↺ Module sécurité",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "s5",
   "type": "cours",
   "titre": "Consigner avant de toucher — le risque électrique",
   "dc": "Sécurité",
   "minuteur_s": 480,
   "corps": "<img src=\"packs/fluides/res/svg/secu-consignation.svg\" alt=\"Les cinq étapes dans l'ordre : séparer, condamner, identifier, vérifier l'absence de tension au VAT, mettre à la terre. Le VAT se teste avant et après sur une source connue.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p><b>Ce qui arrive.</b> Ce risque ne figure dans aucun code du référentiel d'examen fluides. Il n'en est pas moins réel : le risque électrique tue des professionnels chaque année, sur les installations de froid et de climatisation comme sur toute autre installation électrique.</p><p>Le passage du courant électrique dans le corps humain porte un nom : l'<b>électrisation</b>. Ses effets vont de la simple secousse à des blessures graves — brûlures internes, troubles du cœur. Quand une électrisation entraîne la mort, on parle d'<b>électrocution</b>. C'est le même phénomène ; seule la gravité change.</p><p>Un autre danger ne demande aucun contact : l'<b>arc électrique</b>. C'est une décharge qui jaillit dans l'air entre deux points sous tension, ou entre un point sous tension et une masse, sans qu'il soit nécessaire de toucher quoi que ce soit. Un arc électrique brûle par la chaleur et la lumière qu'il dégage, et peut projeter des matières en fusion. On peut donc se blesser gravement sans avoir touché aucun fil.</p><p>Un dernier piège : couper l'alimentation ne vide pas forcément tous les composants de leur énergie. Un <b>condensateur</b> est un composant qui stocke de l'énergie électrique ; on en trouve par exemple dans les circuits de démarrage de certains moteurs. Il peut rester chargé après la coupure du courant. Il reste alors dangereux tant qu'il n'a pas été déchargé selon la méthode indiquée par la documentation constructeur de l'équipement.</p><p><b>Comment ça arrive vraiment.</b> Un technicien pressé ouvre une armoire électrique pour un dépannage rapide. Le disjoncteur qui semble commander cette armoire est coupé, alors il touche directement un bornier — la barrette où arrivent les fils. Mais personne n'a vérifié que ce disjoncteur coupait bien cette armoire précise : un autre circuit, resté sous tension, y arrive aussi. Autre situation fréquente : un condensateur de moteur touché juste après la coupure du courant, alors qu'il est encore chargé. Autre situation encore : un outil métallique approché trop près de bornes sous tension dans une armoire électrique, sans contact direct, qui déclenche un arc électrique.</p><p><b>Ce qui protège.</b> Avant de toucher un circuit ou un équipement électrique, la <b>consignation électrique</b> se déroule dans un ordre précis, en cinq étapes :</p><ol><li><b>Séparer</b> : couper l'alimentation électrique de façon visible et certaine.</li><li><b>Condamner</b> : verrouiller l'organe de coupure en position ouverte, pour qu'il ne puisse pas être refermé par quelqu'un d'autre pendant l'intervention.</li><li><b>Identifier</b> : vérifier que l'on se trouve bien sur le circuit ou l'équipement que l'on vient de séparer, et pas sur un autre.</li><li><b>Vérifier l'absence de tension</b> avec un <b>VAT</b> — un vérificateur d'absence de tension — dont le modèle et les réglages sont adaptés à l'installation, conformément à sa documentation constructeur.</li><li><b>Mettre à la terre et en court-circuit</b> quand cette étape s'impose, notamment lorsqu'une tension pourrait réapparaître par une autre source.</li></ol><p>Le VAT lui-même doit être digne de confiance. On le contrôle sur une source que l'on sait sous tension <b>avant</b> de l'utiliser sur le circuit à vérifier, puis on refait le même contrôle sur cette source connue <b>après</b>. Si l'appareil fonctionnait au premier essai mais plus au second, tout ce qu'il a mesuré entre les deux doit être considéré comme non fiable.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ul><li>Électrisation : le courant traverse le corps. Électrocution : une électrisation qui tue.</li><li>Un arc électrique brûle sans aucun contact.</li><li>Consignation en cinq étapes : séparer, condamner, identifier, vérifier l'absence de tension, mettre à la terre si besoin.</li><li>Un condensateur peut rester chargé après la coupure du courant.</li><li>Le VAT se contrôle avant et après usage, sur une source connue.</li></ul>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>On ne travaille <b>jamais</b> sur une installation électrique sans avoir réalisé les cinq étapes de la consignation, même pour « juste vérifier » ou « deux secondes ». On ne fait <b>jamais</b> confiance à un simple arrêt visuel de la machine : seule une vérification d'absence de tension avec un VAT contrôlé fait foi. Conséquence : électrisation, électrocution, brûlure par arc électrique — ce risque tue chaque année.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous devez intervenir dans une armoire électrique. Le disjoncteur qui semble l'alimenter est coupé. Que faites-vous avant de toucher quoi que ce soit à l'intérieur ?",
    "choix": [
     "Je touche prudemment avec un seul doigt pour vérifier",
     "Je fais confiance au disjoncteur coupé et je commence l'intervention",
     "Je réalise les cinq étapes de la consignation, dont la vérification d'absence de tension avec un VAT contrôlé",
     "J'attends « que ça retombe » avant de commencer, sans autre vérification"
    ],
    "bonne": 2,
    "explication": "Un disjoncteur qui semble coupé ne suffit pas à garantir l'absence de tension : erreur d'identification, condensateur encore chargé, autre source d'alimentation. Seules les cinq étapes de la consignation, avec un VAT contrôlé avant et après sur une source connue, permettent de travailler en sécurité.",
    "remediation_vers": "s5"
   },
   "liens": [
    {
     "vers": "m-secu",
     "libelle": "↺ Module sécurité",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ]
  },
  {
   "id": "m-clas",
   "type": "menu",
   "titre": "Classification des fluides et risques",
   "dc": "Avant de choisir votre parcours",
   "corps": "<p>Avant de savoir quelle catégorie vous préparez, il faut savoir <b>ce que vous aurez dans les mains</b>. Un fluide frigorigène n'est pas seulement un produit qui fait du froid : c'est un produit chimique qui peut vous empoisonner, s'enflammer, ou remplir un local d'une atmosphère où l'on ne survit pas.</p><p>La norme <b>NF EN 378</b> range chaque fluide dans une case — A1, A2L, B2L… — et cette case n'est pas une référence commerciale : c'est un <b>avertissement</b>. Elle commande vos EPI, votre matériel électrique, la ventilation, la détection et la quantité de fluide admise dans le local.</p><p>Trois fiches : lire une classe, comprendre une atmosphère explosive, puis les deux dangers mortels du CO₂. <b>Comment on s'en protège</b> — détection, lecture en ppm, équipements — se voit plus loin dans la formation, le jour où l'on traite le CO₂ en salle : ici, cela répondrait à une question que vous ne vous posez pas encore.</p>",
   "menu_titre": "Les trois fiches",
   "liens": [
    {
     "vers": "cl1",
     "icone": "1",
     "titre": "Lire une classe — deux lettres, deux dangers",
     "desc": "La matrice complète NF EN 378, et ce que chaque case vous impose."
    },
    {
     "vers": "cl2",
     "icone": "2",
     "titre": "Explosif avant d'être perceptible — la LIE",
     "desc": "Ce que mesure un explosimètre, et pourquoi le nez ne protège de rien."
    },
    {
     "vers": "cl3",
     "icone": "3",
     "titre": "CO₂ : deux dangers mortels",
     "desc": "La pression, sans commune mesure. Et l'air qu'il vous prend, en point bas."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Choisir son parcours."
    }
   ]
  },
  {
   "id": "cl1",
   "type": "cours",
   "titre": "Lire une classe — deux lettres, deux dangers",
   "dc": "Classification · codes 1.08 · 11.03",
   "minuteur_s": 480,
   "corps": "<img src=\"packs/fluides/res/svg/classes-securite.svg\" alt=\"Matrice complète des classes NF EN 378 : huit cases, toxicité en lignes, inflammabilité en colonnes.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p><b>Ce que c'est.</b> La norme NF EN 378 (et la norme américaine ASHRAE 34, qui suit la même logique) attribue à chaque fluide frigorigène une <b>classe de sécurité</b> : A1, A2L, B2L, A3… Ce n'est pas un classement du plus dangereux au moins dangereux. C'est une <b>combinaison de deux informations distinctes</b>, et c'est pour cela qu'une classe s'écrit avec une lettre <i>et</i> un chiffre.</p><p><b>La lettre dit la toxicité.</b> <b>A</b> = toxicité faible. <b>B</b> = toxicité plus élevée. Attention au contresens : « A » ne signifie pas inoffensif. Un fluide de classe A peut vous asphyxier en chassant l'oxygène d'un local, ou se décomposer en gaz toxiques au contact d'une flamme. La frontière entre A et B se fixe sur une <b>valeur limite d'exposition</b> définie par la norme : la lettre parle donc de la toxicité <b>propre</b> du produit, pas de tous les dangers qu'il présente.</p><p><b>Le chiffre dit l'inflammabilité.</b> <b>1</b> = le fluide ne propage pas de flamme. <b>2L</b> = faiblement inflammable, la flamme se propage lentement. <b>2</b> = inflammable. <b>3</b> = très inflammable. Le « L » de 2L vient de l'anglais <i>lower</i> : c'est une sous-catégorie du 2, créée pour distinguer les fluides dont la flamme se propage assez lentement pour changer les mesures de prévention.</p><p><b>Pourquoi deux axes et non un seul ?</b> Parce qu'un fluide peut être dangereux d'une manière sans l'être de l'autre, et que les protections ne sont pas les mêmes. Contre la toxicité, on ventile et on protège les voies respiratoires. Contre l'inflammabilité, on supprime les sources d'étincelle et on limite la quantité de fluide présente. Un fluide qui cumule les deux — l'ammoniac, classé B2L — exige les deux dispositifs à la fois. Un classement en une seule note ne permettrait pas de savoir <b>lequel</b> mettre en place.</p><p><b>La matrice complète.</b> Deux axes croisés donnent huit cases :</p><ul><li><b>A1</b> — toxicité faible, non inflammable : R-134a, R-404A, R-410A, et le CO₂ (R-744).</li><li><b>A2L</b> — toxicité faible, faiblement inflammable : R-32, R-1234yf.</li><li><b>A2</b> — toxicité faible, inflammable : R-152a.</li><li><b>A3</b> — toxicité faible, <b>très inflammable</b> : R-290 (propane), R-600a (isobutane).</li><li><b>B1</b> — toxicité plus élevée, non inflammable : R-123, que l'on ne rencontre plus dans les installations neuves.</li><li><b>B2L</b> — toxicité plus élevée, faiblement inflammable : R-717, l'ammoniac.</li><li><b>B2</b> et <b>B3</b> — toxicité plus élevée, inflammable ou très inflammable. Ces deux cases existent dans la norme, mais aucun fluide courant du parc français ne s'y trouve. Retenez la logique de la case, pas un exemple.</li></ul><p><b>Ce que la classe commande.</b> C'est là qu'est l'enjeu réel : la classe n'est pas une étiquette, c'est ce qui détermine tout le dispositif de sécurité autour de l'installation.</p><ul><li>les <b>EPI</b> à porter pour intervenir ;</li><li>le <b>matériel électrique</b> admis dans le local, et la suppression des sources d'étincelle pour les fluides inflammables ;</li><li>la <b>ventilation</b> exigée, permanente ou de secours ;</li><li>la <b>détection</b> : le type de détecteur et son seuil d'alarme ne sont pas les mêmes selon qu'on surveille un gaz inflammable ou un gaz toxique ;</li><li>la <b>charge maximale</b> de fluide admise, selon le volume du local, son usage et l'endroit où se trouve l'installation ;</li><li>les <b>conditions d'occupation</b> du local : qui peut y entrer, et à quelles conditions.</li></ul><p>Se tromper de classe, ce n'est donc pas se tromper d'étiquette : c'est se tromper de <b>tout le dispositif de sécurité</b> — installer du matériel électrique inadapté, sous-dimensionner une ventilation, choisir un détecteur qui ne verra rien, ou charger un local au-delà de ce qu'il admet.</p><p><b>Le piège à ne jamais commettre.</b> Le <b>R-290 est de classe A3</b>, pas A2L. C'est du propane : un hydrocarbure, très inflammable. La confusion avec les A2L est fréquente, y compris dans des documents mal rédigés, et elle conduit à appliquer des précautions insuffisantes. Un repère simple et fiable : si le fluide est un <b>hydrocarbure</b> (propane, isobutane, propylène), il est <b>A3</b>. Les A2L sont des HFC comme le R-32, ou des HFO comme le R-1234yf.</p><p><b>Où lire la classe.</b> Jamais de mémoire, et jamais par déduction à partir du nom commercial : la classe de sécurité figure sur la <b>fiche de données de sécurité (FDS)</b> du fluide, que le fournisseur doit vous remettre. Les valeurs qui en découlent — charges limites selon le local, seuils de détection — se lisent dans la <b>NF EN 378</b> et dans la documentation du constructeur. Savoir aller les chercher est une compétence en soi ; les réciter de tête est une source d'accident.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/cours-classes-securite/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🧯 Lancer le cours interactif : classes de sécurité ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Le triangle du feu, le domaine d'explosivité, la matrice A/B × 1/2L/2/3 à explorer case par case, un cas réel d'accident (l'effet Diesel au pump-down) et un mini-jeu de 10 situations — environ 15 minutes.</span></p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ul><li>La <b>lettre</b> dit la toxicité : A faible, B plus élevée. « A » ne veut pas dire inoffensif.</li><li>Le <b>chiffre</b> dit l'inflammabilité : 1 aucune propagation, 2L faible, 2 inflammable, 3 très inflammable.</li><li>Huit cases au total : A1 · A2L · A2 · A3 · B1 · B2L · B2 · B3.</li><li>La classe <b>commande</b> les EPI, le matériel électrique, la ventilation, la détection, la charge maximale et l'occupation du local.</li><li><b>R-290 = A3</b>, jamais A2L. Tout hydrocarbure est A3.</li><li>La classe se lit sur la <b>FDS</b> ; les valeurs associées, dans la NF EN 378.</li></ul>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>Intervenir sur une installation, ou choisir un matériel, <b>sans avoir vérifié la classe du fluide sur sa FDS</b> — en la supposant d'après le nom du fluide ou d'après l'installation précédente.</p><p>Conséquence : un fluide A3 traité comme un A2L, c'est un local ventilé trop faiblement, un matériel électrique qui peut produire une étincelle, un détecteur inadapté et une charge excessive. L'atmosphère devient explosive sans que rien ne l'ait signalé.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Un client veut remplacer son installation par une unité au R-290. Que change cette classe pour votre intervention ?",
    "choix": [
     "Rien de particulier : le R-290 est faiblement inflammable, comme le R-32.",
     "Le R-290 est A3, très inflammable : EPI, matériel électrique, ventilation, détection et charge admise sont à revoir selon la FDS et la NF EN 378.",
     "Seul le PRP change, la sécurité reste identique.",
     "Il suffit d'aérer le local pendant l'intervention."
    ],
    "bonne": 1,
    "explication": "Le R-290 est du propane, donc un hydrocarbure : il est classé A3 (très inflammable), et non A2L. Cette classe commande l'ensemble du dispositif de sécurité — EPI, suppression des sources d'étincelle, ventilation, type de détecteur, charge maximale admise dans le local. Les valeurs se lisent sur la FDS du fluide et dans la NF EN 378, jamais de mémoire.",
    "remediation_vers": "cl1"
   },
   "criteres": [
    {
     "code": "1.08",
     "libelle": "Connaître la combustibilité et la propagation des flammes, les restrictions de capacité de charge et les limites d'occupation, pour les HFC, H(C)FO et hydrocarbures.",
     "etat": "a_evaluer",
     "officiel": "Connaître la combustibilité, la propagation des flammes, les restrictions relatives à la capacité de charge, les limites d'occupation pour les HFC, H(C)FO et hydrocarbures",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "11.03",
     "libelle": "Connaître les règles de sécurité applicables aux fluides toxiques, inflammables ou nécessitant une pression de fonctionnement plus élevée.",
     "etat": "a_evaluer",
     "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "cl2",
     "libelle": "Suite ▸ Explosif avant d'être perceptible — la LIE"
    },
    {
     "vers": "m-clas",
     "libelle": "↺ Module classification",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "cl2",
   "type": "cours",
   "titre": "Explosif avant d'être perceptible — la LIE",
   "dc": "Classification · codes 12.02 · 12.04",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/lie-domaine.svg\" alt=\"L'axe des concentrations : trop pauvre, puis le domaine d'explosivité entre LIE et LSE, puis trop riche. L'explosimètre affiche un pourcentage de la LIE, c'est-à-dire la marge restante.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p><b>Ce qui arrive.</b> Un gaz inflammable ne s'enflamme pas à n'importe quelle concentration dans l'air. Il lui faut un dosage : assez de gaz pour brûler, et assez d'air pour entretenir la combustion. En dessous d'une certaine concentration, le mélange est trop pauvre en gaz — une étincelle ne déclenche rien. Au-dessus d'une autre, il est trop riche : il n'y a plus assez d'oxygène. <b>Entre les deux</b>, le mélange s'enflamme, et il le fait d'un coup, dans tout le volume.</p><p>Ces deux bornes portent un nom. La <b>LIE</b> — limite inférieure d'explosivité — est la concentration en dessous de laquelle le mélange ne s'enflamme pas. La <b>LSE</b> — limite supérieure d'explosivité — est celle au-dessus de laquelle il ne s'enflamme plus non plus. L'intervalle entre les deux s'appelle le <b>domaine d'explosivité</b>. Chaque gaz a le sien : les valeurs sont propres au fluide et figurent sur sa <b>fiche de données de sécurité</b>. Elles ne se retiennent pas de tête et ne se déduisent d'aucune règle générale.</p><p><b>Ce qui rend ce danger particulier</b>, c'est qu'il n'y a pas de signal. Une atmosphère peut atteindre son domaine d'explosivité sans odeur, sans bruit, sans rien de visible. Le gaz domestique que l'on sent dans une cuisine contient un <b>odorisant ajouté volontairement</b> pour être détecté par le nez. Le <b>R-290 utilisé en froid est un propane de haute pureté : cet odorisant n'y est pas</b>. Le nez ne vous avertira pas. Et le seuil de perception d'une odeur, quand elle existe, n'a aucun rapport avec la LIE : sentir quelque chose ne dit pas si l'on est loin ou près du danger.</p><p><b>L'appareil qui répond à cette question</b> s'appelle un <b>explosimètre</b>. Il ne mesure pas une quantité de gaz dans l'absolu : il affiche <b>un pourcentage de la LIE</b> du gaz recherché. Une valeur de 10 % LIE signifie que l'atmosphère contient un dixième de la concentration à partir de laquelle elle deviendrait inflammable. C'est une mesure de <b>marge restante</b>, et c'est ce qui la rend utilisable : l'alarme se déclenche bien avant que le mélange ne devienne explosif. Le seuil de réglage se fixe selon la procédure de l'entreprise et la documentation de l'appareil.</p><p>Un explosimètre se règle pour un gaz donné : un appareil réglé pour un gaz et utilisé pour un autre affiche un chiffre faux. Et il ne remplace ni un détecteur de fuite de fluide frigorigène, ni un détecteur d'oxygène : ce sont trois appareils différents, qui répondent à trois questions différentes.</p><p><b>Comment ça arrive vraiment.</b> Une petite fuite sur une unité au R-290, dans un local technique fermé et peu ventilé. Rien ne se voit, rien ne se sent. Le gaz, plus lourd que l'air, s'accumule lentement près du sol. Un technicien entre, actionne l'interrupteur d'éclairage, branche une lampe baladeuse, ou pose un outil électroportatif sur le sol. L'étincelle du contact suffit. Il n'y avait aucun signe avant-coureur, et l'inflammation ne laisse pas le temps de reculer.</p><p><b>ATEX</b> — le mot vient de « <b>AT</b>mosphère <b>EX</b>plosive ». Lorsqu'un local peut contenir une atmosphère explosive, il fait l'objet d'un <b>zonage</b> : on délimite les zones où ce risque existe, et on n'y admet que du matériel conçu pour ne pas enflammer l'atmosphère — ni par une <b>étincelle</b>, ni par une <b>surface trop chaude</b>, car une surface chaude suffit à allumer un mélange sans la moindre flamme. Cela vaut aussi pour ce que le technicien apporte avec lui — outil électroportatif, lampe, téléphone. Le zonage et le choix du matériel relèvent d'une étude propre à l'installation ; le technicien, lui, doit savoir <b>reconnaître</b> qu'il entre dans une telle zone et respecter ce qui y est affiché.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ul><li>Un gaz inflammable ne brûle qu'entre deux bornes : <b>LIE</b> (limite inférieure) et <b>LSE</b> (limite supérieure). Entre les deux, une étincelle suffit.</li><li>Les valeurs sont <b>propres à chaque fluide</b> et se lisent sur sa FDS.</li><li>Un <b>explosimètre</b> affiche un pourcentage de la LIE : une marge restante, pas une quantité.</li><li>Il se règle <b>pour un gaz donné</b>, et ne remplace ni un détecteur de fuite, ni un détecteur d'oxygène.</li><li>Le <b>R-290 du froid n'est pas odorisé</b> : le nez n'avertit de rien.</li><li><b>ATEX</b> : dans une zone à atmosphère explosive, seul le matériel <b>prévu pour ces zones</b> peut entrer — y compris celui qu'on apporte. Il est contraint sur l'étincelle <b>et</b> sur sa température de surface.</li></ul>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>Entrer dans un local où une fuite de fluide inflammable est possible et y <b>actionner un interrupteur, brancher une lampe ou utiliser un outil électroportatif</b>, sans avoir contrôlé l'atmosphère à l'explosimètre.</p><p>Se fier à son odorat en est la variante la plus courante : le R-290 utilisé en froid ne contient pas l'odorisant du gaz domestique, et aucune odeur ne renseigne sur la distance à la LIE.</p><p>Conséquence : inflammation de tout le volume, sans aucun signe avant-coureur.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Un explosimètre affiche « 10 % LIE » dans un local où une fuite de R-290 est suspectée. Qu'est-ce que cela signifie ?",
    "choix": [
     "Que 10 % du local est rempli de gaz.",
     "Que l'atmosphère contient un dixième de la concentration à partir de laquelle elle deviendrait inflammable.",
     "Que le mélange est déjà explosif à 10 %.",
     "Que l'appareil est déréglé, car il devrait afficher une pression."
    ],
    "bonne": 1,
    "explication": "Un explosimètre n'affiche pas une quantité de gaz, mais un pourcentage de la limite inférieure d'explosivité du gaz recherché : il indique la marge qui reste avant que l'atmosphère ne devienne inflammable. L'appareil doit être réglé pour le gaz concerné, et la LIE de ce gaz se lit sur sa fiche de données de sécurité.",
    "remediation_vers": "cl2"
   },
   "criteres": [
    {
     "code": "12.02",
     "libelle": "Connaître le matériel de sécurité obligatoire : détection de gaz, détection des fuites, ventilation, équipements de protection individuelle.",
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.04",
     "libelle": "Réaliser une analyse des risques avant de commencer le travail, et supprimer ou identifier les sources de danger.",
     "etat": "a_evaluer",
     "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "cl3",
     "libelle": "Suite ▸ CO₂ : deux dangers mortels"
    },
    {
     "vers": "m-clas",
     "libelle": "↺ Module classification",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "cl3",
   "type": "cours",
   "titre": "CO₂ : deux dangers mortels — la pression et l'air qu'il vous prend",
   "dc": "Classification · code 11.03",
   "minuteur_s": 600,
   "corps": "<img src=\"packs/fluides/res/svg/co2-point-bas.svg\" alt=\"Animation : le CO₂ remplit le local par le bas ; un technicien descend l'escalier et entre dans la nappe. Respirable à hauteur de visage, mortel en bas de l'escalier.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p><b>Ce qui arrive.</b> Le CO₂ — le R-744 — est classé <b>A1</b> : toxicité faible, non inflammable, PRP de 1. C'est la case la plus rassurante de toute la matrice. Et c'est exactement ce qui le rend dangereux : <b>sa classe n'annonce aucun des deux risques qui tuent réellement sur ces installations</b> — la <b>pression</b>, et l'<b>anoxie</b>. Qui retient « CO₂ = A1 = tranquille » a retenu quelque chose de faux.</p><p>Ce fluide entre aujourd'hui dans le parc : froid commercial, supermarchés, chambres froides. Vous en rencontrerez. Ce n'est plus un sujet de culture générale.</p><p><b>Premier danger : la pression.</b> Une installation au CO₂ travaille à des pressions <b>bien plus élevées</b> que celles des fluides que vous connaissez — sans commune mesure. Cela change tout le matériel : manifold, flexibles, vannes, tout doit être <b>dédié au CO₂</b>. Brancher un manifold ordinaire sur une installation au CO₂, c'est le faire éclater dans les mains. Les valeurs exactes dépendent du point de fonctionnement et se lisent dans la <b>documentation constructeur</b> ; ce qu'il faut retenir sans aucun chiffre, c'est qu'<b>aucun réflexe acquis sur un R-134a ou un R-410A ne se transpose ici</b>.</p><p>Cette pression garde son danger <b>machine à l'arrêt</b>. Une installation au CO₂ arrêtée continue de monter en pression si elle se réchauffe : c'est pour cela qu'elle possède des dispositifs de sécurité qui lui sont propres. Une installation au CO₂ laissée sans surveillance après une coupure n'est pas une installation au repos.</p><p>À la détente à l'air libre, le CO₂ peut passer directement à l'état solide : c'est la <b>glace carbonique</b> (ou neige carbonique). Double conséquence — une <b>brûlure par le froid</b> au contact de la peau, et un <b>bouchon solide</b> qui obstrue une vanne ou une tuyauterie. Et ce bouchon finit par fondre : le gaz qu'il libère alimente alors le second danger.</p><p><b>Second danger : l'air qu'il vous prend.</b> Le mot <b>anoxie</b> désigne le manque d'oxygène dans l'organisme. Vous avez rencontré ce danger dans la fiche « L'air qui manque » : un gaz prend la place de l'air respirable. Le CO₂ fait cela — <b>mais il ne fait pas que cela</b>, et c'est toute la différence.</p><p><b>Deux mécanismes, pas un seul.</b> L'azote agit uniquement par <b>déplacement</b> : il est inerte, il prend la place de l'oxygène sans réagir avec l'organisme. Le CO₂, lui, agit <b>en plus par lui-même</b> : il n'est pas inerte, il intervient dans la régulation de la respiration et devient nocif à des concentrations où l'oxygène restant serait encore suffisant. Autrement dit, le CO₂ peut vous mettre en danger <b>avant</b> d'avoir chassé assez d'oxygène pour qu'un contrôle du seul taux d'oxygène s'en alarme. C'est pourquoi, sur une installation au CO₂, <b>un détecteur d'oxygène seul ne suffit pas</b> : il faut une mesure du CO₂ lui-même.</p><p>N'en concluez pas que les fluides fluorés sont inoffensifs : à forte concentration, ils agissent eux aussi sur l'organisme — effet sur le rythme du cœur, effet endormant. Leur fiche de données de sécurité le mentionne. « A » n'a jamais voulu dire inoffensif.</p><p><b>Ce que vous ressentirez — et pourquoi c'est déjà tard.</b> Contrairement à l'azote, qui ne prévient pas du tout, le CO₂ <b>donne des signes</b> : souffle court puis <b>essoufflement violent</b>, <b>maux de tête</b>, <b>vertiges</b>, bourdonnements, sueurs. La raison est celle vue en fiche « L'air qui manque » : c'est l'excès de gaz carbonique dans le sang qui commande l'envie de respirer. Ces signes sont votre <b>seule chance</b> — mais ils arrivent alors que vous êtes <b>déjà dans la nappe</b>, et à forte concentration la perte de connaissance suit en quelques instants. D'où une règle simple : <b>essoufflement brutal ou mal de tête soudain dans un local technique, vous ressortez immédiatement</b>. On ne cherche pas à comprendre sur place, on ne finit pas le geste en cours.</p><p><b>Pourquoi on entre sans le savoir.</b> Le CO₂ est <b>incolore</b>, <b>inodore</b>, et <b>plus lourd que l'air</b>. Il ne monte pas : il s'écoule et <b>s'accumule dans les points bas</b> — fosse, cave, sous-sol, local en contrebas, bas d'une chambre froide. Une zone peut être parfaitement respirable à hauteur de visage et déjà mortelle au niveau du sol, ou en bas de quelques marches. Descendre, c'est entrer dans la nappe.</p><p><b>Attention à ne pas généraliser cette règle.</b> « Plus lourd que l'air » vaut pour le CO₂ et pour la plupart des fluides fluorés — mais <b>pas pour l'ammoniac</b> (R-717), plus léger que l'air, qui se comporte à l'inverse : il monte. Le comportement d'un fluide se lit sur sa FDS, il ne se suppose jamais par analogie avec le fluide précédent.</p><p><b>Comment ça arrive vraiment.</b> Une installation au CO₂ en local technique enterré, une fuite lente pendant la nuit, porte fermée. Le gaz remplit le volume par le bas. Au matin, un technicien descend relever un paramètre. Rien ne se voit, rien ne se sent. À mi-escalier, il a mal à la tête et le souffle court — il met cela sur le compte de la fatigue et continue, parce qu'il n'en a que pour deux minutes. Il ne remonte pas. Puis vient le second accident, celui qui tue le plus souvent dans cette famille d'accidents : un collègue le voit au sol et descend le chercher, sans protection. La nappe est toujours là. <b>Deux victimes au lieu d'une.</b></p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ul><li>Le CO₂ est <b>A1</b>, et pourtant il tue de <b>deux</b> façons : la <b>pression</b> et l'<b>anoxie</b>. Sa classe n'annonce ni l'une ni l'autre.</li><li>Pressions <b>sans commune mesure</b> avec les fluides courants : matériel <b>dédié au CO₂</b>, jamais un manifold ordinaire.</li><li>Une installation au CO₂ <b>à l'arrêt reste sous pression</b>, et remonte en pression si elle se réchauffe.</li><li>Glace carbonique à la détente : <b>brûlure par le froid</b> et <b>bouchon</b>.</li><li>Le CO₂ <b>déplace</b> l'oxygène <b>et agit par lui-même</b> — l'azote, lui, est inerte. Un <b>détecteur d'oxygène seul ne suffit pas</b>.</li><li><b>Essoufflement brutal, mal de tête, vertiges : on ressort tout de suite.</b> Ces signes arrivent quand on est déjà dans la nappe.</li><li>Incolore, inodore, <b>plus lourd que l'air</b> : il s'accumule en <b>point bas</b>. Pas vrai pour l'ammoniac.</li></ul>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>Descendre dans une fosse, une cave, un sous-sol ou tout local en contrebas abritant une installation au CO₂ après une fuite possible, <b>sans avoir ventilé et mesuré</b>. Et, si un collègue est au sol : <b>descendre le chercher sans protection</b>.</p><p>Conséquence : vous entrez dans la nappe. Les signes que vous ressentirez — souffle coupé, mal de tête — arriveront trop tard pour remonter un escalier, et le sauveteur improvisé devient la seconde victime. C'est le scénario le plus fréquent de ces accidents.</p><p>Interdit aussi : brancher du <b>matériel non dédié au CO₂</b> sur une installation au CO₂. Sa pression n'a rien à voir avec ce que vous connaissez.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous intervenez dans un local technique abritant une installation au CO₂. Au bout de quelques minutes, vous avez mal à la tête et le souffle court. Que faites-vous ?",
    "choix": [
     "Je termine le geste en cours, je n'en ai que pour deux minutes.",
     "Je ressors immédiatement et je donne l'alerte : ces signes veulent dire que je suis déjà dans la nappe de gaz.",
     "Je m'assois un moment sur place pour reprendre mon souffle.",
     "Je mets cela sur le compte de la fatigue et je continue en surveillant comment je me sens."
    ],
    "bonne": 1,
    "explication": "Contrairement à l'azote, le CO₂ donne des signes — essoufflement, maux de tête, vertiges — parce qu'il agit sur la régulation de la respiration. Mais ces signes n'apparaissent qu'une fois dans la nappe, et la perte de connaissance peut suivre en quelques instants. Ils ne s'interprètent pas et ne se surveillent pas : ils commandent de sortir. S'asseoir est le pire des choix, puisque le gaz s'accumule en partie basse.",
    "remediation_vers": "cl3"
   },
   "criteres": [
    {
     "code": "11.03",
     "libelle": "Connaître les règles de sécurité applicables aux fluides toxiques, inflammables ou nécessitant une pression de fonctionnement plus élevée.",
     "etat": "a_evaluer",
     "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "m-clas",
     "libelle": "↺ Module classification",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "cl4",
   "type": "cours",
   "titre": "Se protéger du CO₂ — détection, EPC et EPI",
   "dc": "Classification · codes 12.02 · 13.14",
   "minuteur_s": 600,
   "corps": "<img src=\"packs/fluides/res/svg/co2-protection.svg\" alt=\"Le local équipé : capteur fixe en partie basse relié aux alarmes intérieure et extérieure, ventilation, signalisation à la porte. À droite, les EPI — et le masque à cartouche, qui ne protège pas du CO₂.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p><b>Ce qui protège, dans l'ordre.</b> La règle générale de la prévention est la même partout : on protège <b>d'abord le collectif</b>, ensuite l'individu. Un équipement de <b>protection collective</b> (EPC) protège tout le monde dans le local, en permanence, sans que personne ait à y penser. Un équipement de <b>protection individuelle</b> (EPI) ne protège que celui qui le porte, et seulement s'il le porte correctement. L'EPI ne remplace jamais l'EPC : il vient <b>après</b>, pour ce que l'EPC ne couvre pas.</p><p><b>La détection : ce n'est pas une option.</b> Dans un local abritant une installation au CO₂, la <b>détection de gaz est exigée</b> dès que la norme l'impose — selon la charge et le type de local — et c'est l'EPC principal. Sa présence et son état se vérifient à l'arrivée : si elle manque là où elle devrait être, c'est un signalement à faire, pas un détail. Le détecteur est <b>fixe, à poste</b> : il mesure en permanence, y compris la nuit et quand personne n'est là, et c'est précisément ce qui manque à un appareil portatif resté dans le camion. On le place <b>en partie basse</b>, là où le CO₂ s'accumule : un capteur au plafond ne verra rien.</p><p>Il est associé à des <b>alarmes</b> sonores et visuelles, à l'intérieur <b>et à l'extérieur</b> du local. Celle de l'extérieur a une fonction précise : vous prévenir <b>avant d'ouvrir la porte</b>, et empêcher un sauveteur d'entrer sans savoir. Le déclenchement peut aussi commander la <b>ventilation</b> et l'arrêt de l'installation. Un dispositif complet comporte en général deux niveaux : une <b>préalarme</b>, qui avertit, et une <b>alarme d'évacuation</b>, qui ordonne de sortir.</p><p><b>Le ppm : savoir lire ce que l'appareil affiche.</b> Un détecteur de CO₂ n'affiche ni des grammes ni des bars, mais des <b>ppm</b> — « parties par million ». Un ppm, c'est <b>une part de gaz pour un million de parts d'air</b> : autrement dit, un centimètre cube de CO₂ dans un mètre cube d'air. C'est une unité faite pour de <b>petites proportions</b>, celles qu'un pourcentage exprimerait mal.</p><p>Pour situer l'échelle : l'air extérieur que vous respirez contient <b>naturellement</b> du CO₂, de l'ordre de quelques centaines de ppm. Un affichage qui n'est pas à zéro ne signifie donc pas « il y a une fuite ». Ce qui compte, c'est l'<b>écart</b> avec l'ambiance normale et le <b>franchissement des seuils réglés</b> sur l'appareil. Ces seuils de préalarme et d'évacuation sont fixés par la <b>réglementation du travail</b> et par la norme applicable au site ; ils figurent dans la documentation de l'appareil et sont rappelés sur la <b>FDS</b> du fluide. <b>Ne les apprenez pas par cœur d'un site à l'autre</b> : vérifiez-les sur l'installation où vous êtes. Votre formateur vous donnera ceux qui s'appliquent aux machines de l'atelier.</p><p><b>Un détecteur ne vaut que s'il fonctionne.</b> Un capteur de gaz se <b>vérifie</b> et se <b>remplace</b> périodiquement, selon la documentation du fabricant : une cellule vieillit et finit par ne plus rien mesurer tout en restant allumée. À l'arrivée sur site, on contrôle donc que les capteurs et les alarmes sont <b>en état de marche</b>, et pas seulement présents au mur — exactement comme on contrôle un VAT avant de s'en servir.</p><p><b>Le reste du dispositif collectif.</b> La <b>signalisation</b> à l'entrée du local doit être visible et à jour : elle prévient celui qui entre de ce qui l'attend. Les <b>issues de secours</b> doivent rester dégagées — une palette posée devant une porte de chambre froide n'est pas un défaut de rangement, c'est une issue en moins. La <b>ventilation</b> doit être adaptée au fait que le gaz est en bas. Ces trois points se contrôlent en arrivant, avant de commencer.</p><p><b>Les EPI, et surtout leurs limites.</b> Contre le froid du CO₂ et la glace carbonique : <b>gants</b> adaptés au froid et <b>lunettes ou écran facial</b>, mis <b>avant</b> l'intervention et non une fois le geste commencé. Contre la pression : rester hors de la trajectoire d'un jet, et ne jamais desserrer un raccord sans avoir vérifié la pression au manomètre.</p><p>Et un point que l'on ne peut pas se permettre d'ignorer : <b>un masque à cartouche ne protège pas contre le CO₂, ni contre le manque d'oxygène</b>. Une cartouche filtre certains polluants dans un air qui reste respirable ; elle ne fabrique pas d'oxygène et ne retient pas le CO₂. En atmosphère appauvrie ou chargée en CO₂, seul un appareil <b>isolant</b>, qui apporte son propre air, protège — un matériel dont l'usage relève d'équipes formées et entraînées pour cela, pas d'une improvisation de dépannage. <b>Pour vous, la protection n'est pas de porter un masque : c'est de ne pas entrer.</b></p><p><b>Devant une personne au sol.</b> On alerte, on ventile, on fait intervenir les secours — <b>on ne descend pas</b>. Retenir sa respiration ne protège de rien : on ne tient que quelques dizaines de secondes, et le réflexe respiratoire finit toujours par l'emporter, au fond de la fosse.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ul><li><b>EPC d'abord, EPI ensuite</b> : le collectif protège tout le monde en permanence, l'individuel ne protège que celui qui le porte.</li><li><b>Détection de gaz obligatoire</b> en local CO₂, par capteur <b>fixe</b>, placé <b>en partie basse</b>.</li><li>Alarmes sonores et visuelles <b>dedans et dehors</b> — celle de dehors prévient avant d'ouvrir la porte. Deux niveaux : préalarme, puis évacuation.</li><li>Le détecteur affiche des <b>ppm</b> : une part pour un million. L'air normal en contient déjà.</li><li>Les <b>seuils</b> se lisent sur l'appareil, sa documentation et la FDS — <b>jamais de mémoire d'un site à l'autre</b>.</li><li>Un capteur se <b>vérifie et se remplace</b> : une cellule morte reste allumée.</li><li>Signalisation à jour, <b>issues de secours dégagées</b>, ventilation adaptée : contrôlées en arrivant.</li><li><b>Un masque à cartouche ne protège ni du CO₂, ni du manque d'oxygène.</b> La vraie protection, c'est de ne pas entrer.</li><li>Et les règles qui ne changent jamais : <b>ventiler et mesurer avant d'entrer</b>, <b>jamais seul</b>, et devant une personne au sol : alerter, ventiler, <b>ne pas descendre</b>.</li></ul>"
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "<p>Entrer dans un local CO₂ en se croyant protégé par un <b>masque à cartouche</b>, ou entrer alors que l'alarme extérieure est déclenchée.</p><p>Interdit aussi : considérer un détecteur comme fiable <b>parce que son voyant est allumé</b>. Une cellule usée continue de s'allumer sans plus rien mesurer : elle se vérifie et se remplace selon la documentation du fabricant.</p><p>Conséquence : on entre dans une atmosphère mortelle avec la certitude d'être protégé. C'est la configuration où l'on ne ressort pas.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous devez intervenir dans un local abritant une installation au CO₂. Un masque à cartouche est disponible dans le camion. Que vous apporte-t-il ?",
    "choix": [
     "Il protège du CO₂ et permet d'entrer sans autre précaution.",
     "Rien face à ce risque : une cartouche ne retient pas le CO₂ et ne fournit pas d'oxygène. La protection, c'est la détection, la ventilation, et le fait de ne pas entrer.",
     "Il protège à condition de ne rester que quelques minutes.",
     "Il remplace le détecteur fixe du local."
    ],
    "bonne": 1,
    "explication": "Un masque à cartouche filtre certains polluants dans un air qui reste respirable : il ne fabrique pas d'oxygène et ne retient pas le CO₂. Seul un appareil isolant, réservé à des équipes formées, protège en atmosphère appauvrie. La protection du technicien repose sur la protection collective — détection fixe en partie basse, alarmes intérieure et extérieure, ventilation — et sur la décision de ne pas entrer.",
    "remediation_vers": "cl4"
   },
   "criteres": [
    {
     "code": "12.02",
     "libelle": "Connaître le matériel de sécurité obligatoire : détection de gaz, détection des fuites, ventilation, équipements de protection individuelle.",
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "13.14",
     "libelle": "Vérifier la sécurité du site : signalisation, issues de secours, capteurs et alarmes gaz.",
     "etat": "a_evaluer",
     "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
     "groupe": "G13",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R744 (CO2)",
     "epreuve": {},
     "nouveau": true,
     "tirage_au_sort": false,
     "information": true,
     "evalue_en": [
      "B"
     ]
    }
   ],
   "liens": [
    {
     "vers": "g13",
     "libelle": "↺ Revenir au CO₂ et à l'ammoniac",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "m-prat",
   "type": "menu",
   "titre": "Préparation pratique — le matériel et les gestes",
   "dc": "Avant de toucher au fluide",
   "corps": "<p>Ce module ne remplace pas l'atelier : il le <b>prépare</b>. On y revoit le matériel et l'ordre des gestes <b>avant</b> d'avoir le fluide dans les mains — à quoi sert cet appareil, comment il se branche, dans quel ordre on ouvre et on ferme, ce qu'on regarde, ce qu'on note.</p><p>La sécurité s'y <b>démontre et s'impose</b> : on ne découvre jamais un risque par l'erreur.</p>",
   "menu_titre": "Les sept préparations",
   "liens": [
    {
     "vers": "p1",
     "icone": "1",
     "titre": "Le manifold — lire, brancher, ne pas polluer",
     "desc": "Lire les manomètres, brancher et débrancher sans polluer."
    },
    {
     "vers": "p2",
     "icone": "2",
     "titre": "La station de récupération — ce que c'est, comment on la branche",
     "desc": "Le groupe de récupération : à quoi il sert, comment on le raccorde."
    },
    {
     "vers": "p3",
     "icone": "3",
     "titre": "Pompe à vide et vacuomètre — monter, tirer, lire",
     "desc": "Monter la pompe, tirer au vide, lire le vacuomètre — et dans quel ordre arrêter."
    },
    {
     "vers": "p4",
     "icone": "4",
     "titre": "La bouteille d'azote et son mano-détendeur",
     "desc": "Monter le mano-détendeur, régler, mettre en pression. Azote seul, toujours."
    },
    {
     "vers": "p5",
     "icone": "5",
     "titre": "L'ordre des vannes — la chorégraphie de l'intervention",
     "desc": "Fermer, laisser stabiliser, desserrer lentement. La chorégraphie qui évite le rejet."
    },
    {
     "vers": "p6",
     "icone": "6",
     "titre": "La balance et la pesée — avant, après, ce qu'on note",
     "desc": "Peser avant, peser après. Une estimation ne se consigne pas."
    },
    {
     "vers": "p7",
     "icone": "7",
     "titre": "Préparation de chantier — risques, EPI, zone de travail",
     "desc": "Analyse de risques, EPI, zone balisée : ce qui se fait AVANT le premier geste."
    },
    {
     "vers": "c00",
     "icone": "↺",
     "titre": "Retour au sommaire",
     "desc": "Changer de parcours."
    }
   ]
  },
  {
   "id": "p1",
   "type": "cours",
   "titre": "Le manifold — lire, brancher, ne pas polluer",
   "dc": "Préparation pratique · codes 5.01 · 4.05",
   "minuteur_s": 330,
   "corps": "<figure style=\"margin:0 0 18px\"><img src=\"packs/fluides/res/photos/manifold-branche.jpg\" alt=\"Un manifold raccordé sur une installation, flexibles bleu et rouge en place.\" style=\"width:100%;height:auto;display:block;border:1px solid #d7e0e8;border-radius:8px\"><figcaption style=\"font-size:13px;color:#5a6b7d;margin-top:6px;font-style:italic\">Le manifold en situation : à gauche le manomètre BP (bleu), à droite le HP (rouge), et le flexible central qui part vers la bouteille ou la pompe.</figcaption></figure><img src=\"packs/fluides/res/svg/manifold-lecture.svg\" alt=\"Animation : le manifold face à vous — BP à gauche en bleu, HP à droite en rouge, le flexible central. Les manomètres lisent en permanence, robinets fermés ; c'est l'ouverture d'un robinet qui met le flexible central en communication.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le <b>manifold</b> (ensemble manométrique) réunit deux manomètres — <b>BP en bleu</b>, <b>HP en rouge</b> — et deux vannes, une par côté, qui commandent le passage vers le <b>flexible central jaune</b> : celui qui part vers la pompe à vide, la bouteille de récupération, ou une bouteille d'azote équipée de son <b>mano-détendeur</b>.</p><ol><li>Consigner électriquement l'installation avant tout branchement.</li><li>Vérifier que les deux vannes du manifold sont fermées.</li><li>Visser le flexible bleu sur le raccord à obus côté basse pression — côté évaporateur, en bas de la croix du frigoriste.</li><li>Visser le flexible rouge sur le raccord à obus côté haute pression — côté condenseur et compresseur, en haut à droite.</li><li>Purger l'air de chaque flexible par un bref coup d'ouverture-fermeture — jamais un rejet prolongé.</li><li>Ouvrir les vannes une par une, jamais les deux ensemble, en surveillant les aiguilles.</li><li>Lire : pression BP, pression HP, température à la pince.</li><li>Refermer les deux vannes du manifold avant toute déconnexion.</li><li>Débrancher en purgeant chaque flexible — minimum d'émission, jamais de rejet volontaire.</li></ol><p>Le manomètre affiche une <b>pression relative</b> : pour obtenir la pression absolue, on ajoute environ <b>1 bar</b>. La pince de température et le multimètre servent à la <b>méthode indirecte</b> de contrôle d'étanchéité : on compare les valeurs mesurées — surchauffe (plage normale <b>5 à 10 K</b>), sous-refroidissement (plage normale <b>4 à 8 K</b>), intensité absorbée — à celles attendues sur la fiche constructeur. Un écart qui se creuse alerte, sans avoir ouvert le circuit.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Fermé avant, fermé après",
     "html": "Les deux vannes du manifold restent <b>fermées</b> à chaque branchement et à chaque débranchement. Elles ne s'ouvrent qu'une fois les deux flexibles vissés et vérifiés, et se referment avant toute déconnexion. C'est ce qui évite le rejet au moment du geste."
    },
    {
     "type": "piege",
     "t": "Les deux vannes ouvertes en même temps",
     "html": "Ouvrir BP et HP <b>ensemble</b> fait communiquer les deux côtés du circuit et fausse la lecture. On ouvre <b>une vanne à la fois</b>, on lit, puis l'autre."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Sur la croix du frigoriste, où se branche le flexible bleu (BP) du manifold ?",
    "choix": [
     "Côté condenseur, en haut",
     "Côté évaporateur, en bas",
     "Côté compresseur, à droite",
     "Peu importe, les deux flexibles sont interchangeables"
    ],
    "bonne": 1,
    "explication": "Le flexible bleu (BP) se branche côté basse pression, c'est-à-dire côté évaporateur, en bas de la croix du frigoriste. Le flexible rouge (HP) se branche côté haute pression, condenseur et compresseur, en haut à droite.",
    "remediation_vers": "p1"
   },
   "criteres": [
    {
     "code": "5.01",
     "libelle": "Brancher et débrancher les flexibles du manifold avec un minimum d'émissions",
     "etat": "a_evaluer",
     "officiel": "Connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "4.05",
     "libelle": "Lire les instruments portables et interpréter les valeurs mesurées",
     "etat": "a_evaluer",
     "officiel": "Utiliser des instruments de mesure portables tels que des manomètres, des thermomètres et des multimètres pour mesurer les volts, ampères et ohms en appliquant des méthodes indirectes de contrôle de l'étanchéité, et interpréter les paramètres mesurés",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "E": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "p2",
     "libelle": "Suite ▸ La station de récupération — ce que c'est, comment on la branche"
    },
    {
     "vers": "m-prat",
     "libelle": "↺ Module pratique",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "p2",
   "type": "cours",
   "titre": "La station de récupération — ce que c'est, comment on la branche",
   "dc": "Préparation pratique · codes 5.03",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/recuperation.svg\" alt=\"Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>La <b>station de récupération</b> est un appareil autonome : elle aspire le fluide de l'installation et le transfère vers un <b>cylindre dédié</b>, posé sur une balance. Avant tout branchement, l'installation est <b>à l'arrêt et isolée</b>.</p><ol><li>Consigner électriquement l'installation à traiter.</li><li>Vérifier l'étiquette du cylindre de récupération : le fluide indiqué doit être exactement celui de l'installation.</li><li>Poser le cylindre sur la balance et noter la masse de départ, avant tout branchement.</li><li>Vannes du groupe fermées, brancher le flexible d'entrée sur le circuit et le flexible de sortie sur le cylindre.</li><li>Mettre le groupe sous tension et le régler selon la fiche du fabricant.</li><li>Ouvrir les vannes dans l'ordre indiqué par le fabricant ; surveiller la pression et la masse affichée.</li><li>En fin de transfert, purger les flexibles avant de débrancher — minimum d'émission.</li><li>Repeser le cylindre, noter la masse récupérée, consigner au registre.</li></ol><p>Le cylindre respecte le <b>taux de remplissage maximal</b> indiqué sur son étiquette : jamais rempli à ras. Le liquide se dilate avec la température — un cylindre trop plein est un danger.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Peser avant, peser après",
     "html": "La différence entre la masse de départ et la masse d'arrivée est la <b>seule preuve fiable</b> de ce qui a été récupéré. Sans pesée avant, ce nombre n'existe pas."
    },
    {
     "type": "piege",
     "t": "Un cylindre, un seul fluide",
     "html": "Une étiquette qui ne correspond pas exactement au fluide de l'installation : on ne branche pas. Mélanger deux fluides rend le contenu du cylindre inutilisable pour le recyclage ou la régénération."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Avant de brancher le cylindre de récupération, quelle vérification est obligatoire ?",
    "choix": [
     "Que la balance est éteinte",
     "Que l'étiquette du cylindre correspond exactement au fluide de l'installation",
     "Que le cylindre est déjà à moitié plein",
     "Que le groupe est débranché du secteur"
    ],
    "bonne": 1,
    "explication": "Le fluide indiqué sur l'étiquette du cylindre doit être exactement celui de l'installation. Mélanger deux fluides différents rend le contenu du cylindre inutilisable pour le recyclage ou la régénération.",
    "remediation_vers": "p2"
   },
   "criteres": [
    {
     "code": "5.03",
     "libelle": "Brancher et débrancher un groupe de récupération avec un minimum d'émissions",
     "etat": "a_evaluer",
     "officiel": "Utiliser un dispositif de récupération des réfrigérants et connecter et déconnecter ce dispositif en produisant le minimum d'émissions",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "p3",
     "libelle": "Suite ▸ Pompe à vide et vacuomètre — monter, tirer, lire"
    },
    {
     "vers": "m-prat",
     "libelle": "↺ Module pratique",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "p3",
   "type": "cours",
   "titre": "Pompe à vide et vacuomètre — monter, tirer, lire",
   "dc": "Préparation pratique · codes 3.03 · 3.04",
   "minuteur_s": 330,
   "corps": "<img src=\"packs/fluides/res/svg/tirage-au-vide.svg\" alt=\"Animation : trois courbes de tirage au vide se tracent — la bonne descend et tient son palier ; l'humidité fait stagner la descente ; la fuite fait remonter le vide dès que la pompe est isolée.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><figure style=\"margin:0 0 18px\"><img src=\"packs/fluides/res/photos/pompe-a-vide.png\" alt=\"Une pompe à vide d atelier.\" style=\"width:100%;height:auto;display:block;border:1px solid #d7e0e8;border-radius:8px\"><figcaption style=\"font-size:13px;color:#5a6b7d;margin-top:6px;font-style:italic\">La pompe à vide : elle aspire l air et l humidité du circuit. Vérifier son niveau d huile avant chaque usage.</figcaption></figure><figure style=\"margin:0 0 18px\"><img src=\"packs/fluides/res/photos/vacuometre.png\" alt=\"Un vacuomètre électronique.\" style=\"width:100%;height:auto;display:block;border:1px solid #d7e0e8;border-radius:8px\"><figcaption style=\"font-size:13px;color:#5a6b7d;margin-top:6px;font-style:italic\">Le vacuomètre électronique : lui seul mesure vraiment le vide. Le manomètre du manifold n est pas assez précis pour cela.</figcaption></figure><p>Le <b>tirage au vide</b> retire l'air et l'humidité du circuit avant charge — ce n'est pas du fluide qu'on évacue ici, mais de l'air et de la vapeur d'eau : la question du rejet à l'atmosphère ne se pose pas à ce stade. La <b>pompe à vide</b> aspire ; le <b>vacuomètre</b> électronique indique jusqu'où on est descendu, bien plus finement qu'un manomètre.</p><ol><li>Consigner électriquement l'installation avant tout montage.</li><li>Vérifier le niveau d'huile de la pompe avant de la mettre en service.</li><li>Fermer les deux vannes du manifold.</li><li>Visser le vacuomètre sur le raccord prévu, du côté du circuit — jamais collé directement à la pompe : une lecture prise trop près de la pompe ne reflète pas le vide réel du circuit.</li><li>Brancher la pompe sur le flexible central du manifold.</li><li>Ouvrir les deux vannes du manifold pour tirer sur l'ensemble du circuit.</li><li>Mettre la pompe en marche.</li><li>Observer l'aiguille du vacuomètre descendre.</li><li>Une fois le vide stabilisé — valeur cible selon la fiche constructeur — fermer d'abord la vanne côté circuit, puis seulement ensuite arrêter la pompe.</li><li>Surveiller si le vide remonte, selon la pratique habituelle : une remontée signale une fuite ou de l'humidité résiduelle.</li></ol><p>L'ordre du neuvième geste protège le circuit : si la pompe s'arrête avant que la vanne soit fermée, l'huile de la pompe peut être aspirée en sens inverse vers le circuit qu'on vient de mettre sous vide.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Isoler avant d'arrêter",
     "html": "On ferme toujours la vanne côté circuit <b>avant</b> d'arrêter la pompe, jamais l'inverse. C'est l'ordre qui protège le circuit d'un retour d'huile."
    },
    {
     "type": "piege",
     "t": "Vacuomètre collé à la pompe",
     "html": "Une lecture prise juste à la sortie de la pompe ne dit rien du vide réel dans le circuit. Le vacuomètre se monte du <b>côté circuit</b>."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Dans quel ordre protège-t-on le circuit à la fin d'un tirage au vide ?",
    "choix": [
     "Arrêter la pompe, puis fermer la vanne côté circuit",
     "Fermer la vanne côté circuit, puis arrêter la pompe",
     "Ouvrir grand le vacuomètre, puis arrêter la pompe",
     "Débrancher directement la pompe sans toucher aux vannes"
    ],
    "bonne": 1,
    "explication": "On isole toujours le circuit — vanne fermée côté circuit — avant d'arrêter la pompe. Dans l'ordre inverse, l'huile de la pompe peut être aspirée en sens inverse vers le circuit qu'on vient de mettre sous vide.",
    "remediation_vers": "p3"
   },
   "criteres": [
    {
     "code": "3.03",
     "libelle": "Monter et mettre en service une pompe à vide",
     "etat": "a_evaluer",
     "officiel": "Utiliser une pompe à vide",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "3.04",
     "libelle": "Évacuer l'air et l'humidité en tirant au vide, selon la pratique habituelle",
     "etat": "a_evaluer",
     "officiel": "Faire le vide dans le système pour évacuer l'air et l'humidité selon la pratique habituelle",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "p4",
     "libelle": "Suite ▸ La bouteille d'azote et son mano-détendeur"
    },
    {
     "vers": "m-prat",
     "libelle": "↺ Module pratique",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "p4",
   "type": "cours",
   "titre": "La bouteille d'azote et son mano-détendeur",
   "dc": "Préparation pratique · codes 3.01 · 3.02",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/epreuve-azote.svg\" alt=\"Le mano-détendeur monté sur la bouteille d azote sec, raccordé au manifold puis au circuit à éprouver, vanne par vanne — jamais d oxygène ni d air comprimé.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Une bouteille d'azote ne se branche jamais directement sur un circuit. Entre les deux, il y a toujours un <b>mano-détendeur</b>. Il lit la pression de la bouteille. Il règle la pression envoyée dans le circuit. Sans lui, toute la pression de la bouteille part d'un coup — largement de quoi faire éclater un circuit.</p><p>Le mano-détendeur porte <b>deux cadrans</b>. Le premier indique ce qu'il reste dans la bouteille. Le second indique la pression réglée en sortie, celle qui part vers le circuit. On lit toujours les deux.</p><ol><li>Vérifier que le raccord est <b>propre</b>, sans trace d'huile ni de graisse : l'azote sous pression au contact d'huile est un risque.</li><li>Monter le mano-détendeur sur le robinet de la bouteille. Vérifier que la <b>vis de réglage est desserrée</b> — aucune pression envoyée en sortie.</li><li>Ouvrir <b>lentement</b> le robinet de la bouteille. Lire la pression bouteille sur le premier cadran.</li><li>Raccorder le flexible de sortie au manifold, puis au circuit à éprouver.</li><li>Visser <b>progressivement</b> la vis de réglage. La pression de sortie monte, à lire sur le second cadran, jusqu'à la valeur donnée par la documentation du constructeur ou la norme applicable.</li><li>Une fois la pression atteinte, fermer le robinet de la bouteille. Observer : le cadran de sortie ne doit plus bouger.</li></ol>",
   "blocs": [
    {
     "type": "piege",
     "t": "Geste interdit — sans discussion",
     "html": "Une bouteille d'azote <b>ne se branche jamais en direct</b> sur un circuit, mano-détendeur absent. La mise en pression se fait <b>à l'azote sec, seul</b>. Jamais d'oxygène — explosif au contact de l'huile. Jamais d'air comprimé — humide, chargé en oxygène."
    },
    {
     "type": "cle",
     "t": "Deux cadrans, deux informations",
     "html": "Cadran <b>bouteille</b> : ce qu'il reste dedans. Cadran <b>sortie</b> : ce que vous envoyez dans le circuit. Un cadran de sortie qui ne tient pas sa pression signale une fuite au raccord — à vérifier avant d'aller plus loin."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous venez de monter le mano-détendeur sur la bouteille d'azote. Avant d'ouvrir le robinet de la bouteille, dans quelle position doit être la vis de réglage ?",
    "choix": [
     "Vissée à fond, pour avoir la pression maximale tout de suite",
     "Desserrée, pour n'envoyer aucune pression en sortie avant d'ouvrir la bouteille",
     "Peu importe, on règle après de toute façon",
     "À mi-course, pour gagner du temps"
    ],
    "bonne": 1,
    "explication": "Vis desserrée : aucune pression envoyée en sortie. On ouvre la bouteille, on lit sa pression, puis on visse progressivement pour monter en pression côté circuit. Ouvrir la bouteille vis déjà serrée enverrait un à-coup de pression incontrôlé.",
    "remediation_vers": "p4"
   },
   "criteres": [
    {
     "code": "3.01",
     "libelle": "Réaliser une épreuve de pression de résistance",
     "etat": "a_evaluer",
     "officiel": "Effectuer une épreuve de pression pour contrôler la résistance du système",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "3.02",
     "libelle": "Réaliser une épreuve de pression d'étanchéité",
     "etat": "a_evaluer",
     "officiel": "Effectuer une épreuve de pression pour contrôler l'étanchéité du système",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "p5",
     "libelle": "Suite ▸ L'ordre des vannes — la chorégraphie de l'intervention"
    },
    {
     "vers": "m-prat",
     "libelle": "↺ Module pratique",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "p5",
   "type": "cours",
   "titre": "L'ordre des vannes — la chorégraphie de l'intervention",
   "dc": "Préparation pratique · codes 5.01 · 5.02",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/ordre-vannes.svg\" alt=\"Animation : les étapes de la déconnexion s'allument une à une sur le montage — fermer la vanne, laisser la pression se stabiliser, desserrer lentement, purger le flexible.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Un manifold, ce sont des <b>vannes</b>. Les ouvrir et les fermer dans le bon ordre n'est pas un détail. Un mauvais ordre peut lâcher un nuage de fluide au visage, ou libérer un flexible sous pression.</p><p>À la <b>connexion</b>, l'ordre est simple : vannes fermées, on raccorde les flexibles, on chasse l'air resté à l'intérieur par une ouverture brève, puis on ouvre progressivement.</p><p>C'est à la <b>déconnexion</b> que l'ordre compte le plus. Il ne change jamais :</p><ol><li><b>Fermer</b> la vanne, côté circuit puis côté appareil.</li><li><b>Laisser la pression se stabiliser.</b> Observer le manomètre. Tant que l'aiguille bouge encore, on attend.</li><li><b>Desserrer lentement</b> le raccord du flexible, à peine, par petites touches. On écoute. On continue. Jamais d'un coup.</li><li>S'il reste du fluide <b>emprisonné dans le flexible</b>, le récupérer par l'appareil déjà branché. Jamais le laisser partir à l'air libre.</li><li>Déconnecter seulement quand la pression est retombée et confirmée.</li></ol><p>La même logique s'applique pour <b>vider ou remplir un cylindre</b>, en phase liquide comme en phase gazeuse. Une bouteille de réfrigérant a une prise dédiée à chaque phase, ou s'utilise dans un sens précis pour tirer du liquide. On suit toujours le marquage de la bouteille, jamais un raccord forcé.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "La chorégraphie qui ne change jamais",
     "html": "<b>Fermer → laisser stabiliser → desserrer lentement.</b> Ce triptyque revient à chaque déconnexion, quel que soit l'appareil branché. C'est le geste central de tout ce module : une fois automatique, il protège dans toutes les situations."
    },
    {
     "type": "piege",
     "t": "Le geste interdit",
     "html": "Desserrer un raccord <b>encore sous pression</b>, d'un coup. Purger le résidu d'un flexible <b>à l'air libre</b> pour aller plus vite. Chaque émission compte, même petite : l'objectif est toujours le <b>minimum d'émission</b>, jamais zéro effort."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous venez de fermer les deux vannes en fin de récupération. Le manomètre indique encore une pression résiduelle dans le flexible. Que faites-vous ?",
    "choix": [
     "Je desserre le raccord d'un coup, la pression restante est faible",
     "J'attends que la pression cesse de bouger sur le manomètre, puis je desserre lentement en récupérant le résidu",
     "Je purge le flexible à l'air libre avant de le ranger",
     "Je tape légèrement sur le raccord pour le débloquer plus vite"
    ],
    "bonne": 1,
    "explication": "On attend que la pression se stabilise. On desserre lentement. Le fluide encore présent dans le flexible se récupère : il n'est pas relâché. Une pression faible reste une pression — le geste brusque et la purge à l'air libre sont tous deux à écarter.",
    "remediation_vers": "p5"
   },
   "criteres": [
    {
     "code": "5.01",
     "libelle": "Connecter et déconnecter avec un minimum d'émissions",
     "etat": "a_evaluer",
     "officiel": "Connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.02",
     "libelle": "Vider et remplir un cylindre, en phase liquide et gazeuse",
     "etat": "a_evaluer",
     "officiel": "Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état gazeux",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "p6",
     "libelle": "Suite ▸ La balance et la pesée — avant, après, ce qu'on note"
    },
    {
     "vers": "m-prat",
     "libelle": "↺ Module pratique",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "p6",
   "type": "cours",
   "titre": "La balance et la pesée — avant, après, ce qu'on note",
   "dc": "Préparation pratique · codes 5.05 · 5.06",
   "minuteur_s": 330,
   "corps": "<figure style=\"margin:0 0 18px\"><img src=\"packs/fluides/res/photos/balance.jpg\" alt=\"Une balance électronique de charge avec une bouteille de fluide posée dessus.\" style=\"width:100%;height:auto;display:block;border:1px solid #d7e0e8;border-radius:8px\"><figcaption style=\"font-size:13px;color:#5a6b7d;margin-top:6px;font-style:italic\">La balance de charge : la bouteille est posée dessus pendant toute l opération. On lit la variation de masse, pas la masse totale.</figcaption></figure><img src=\"packs/fluides/res/svg/pesee-charge.svg\" alt=\"Animation en trois temps : on note la masse avant, le fluide passe vers l'installation et l'afficheur baisse, on relit après — la différence entre les deux pesées est la charge réellement introduite, et elle se note sur le registre.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>La quantité de fluide qui entre ou sort d'un circuit se lit sur une <b>balance</b>, jamais sur un manomètre. Le manomètre dit comment la machine se comporte. La balance dit <b>combien</b> il y a de fluide.</p><p>Avant toute pesée, on choisit une balance <b>adaptée</b> à la quantité attendue. On la pose à plat, stable, vérifiée. Une balance douteuse ne sert à rien : son résultat n'est pas fiable.</p><ol><li>Poser la bouteille sur la balance <b>avant</b> toute opération. Relever le poids. Le noter — pas de mémoire.</li><li>Avant d'ouvrir la moindre vanne, déterminer l'<b>état du fluide</b> attendu : liquide ou gazeux, selon l'opération et la documentation constructeur. Ce choix fixe le sens du remplissage.</li><li>Réaliser l'opération — récupération ou charge — en surveillant la balance pendant que ça se fait, pas seulement à la fin.</li><li>Fermer les vannes, laisser la pression se stabiliser, déconnecter proprement.</li><li>Peser à nouveau, <b>après</b>. Relever ce second poids.</li><li>Calculer l'écart entre les deux pesées. C'est la quantité réelle, pas une estimation.</li><li>Reporter aussitôt le résultat au registre : date, quantité, intervenant.</li></ol><p>Cas particulier : un fluide <b>zéotrope</b>, composé de plusieurs corps, se charge toujours en <b>phase liquide</b>. Le sortir en phase gazeuse changerait sa composition en cours de route.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/mission-bouteilles/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🧪 Lancer le cours interactif : Mission Bouteilles — identifier, peser, ne jamais surremplir ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">8 étapes racontées : calcul de pesée, phase liquide/vapeur, simulation de surremplissage et risque d'éclatement, bouteilles A2L/A3 — environ 10 minutes.</span></p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Deux pesées, jamais une",
     "html": "On pèse <b>avant</b> et <b>après</b>. Sans pesée de départ, le chiffre obtenu n'est qu'une <b>estimation</b>. Une estimation ne se consigne pas dans un registre."
    },
    {
     "type": "piege",
     "t": "Peser seulement à la fin",
     "html": "Peser une seule fois, à la fin, et déduire la quantité à vue de nez : c'est le réflexe à corriger en premier. Lire une quantité chargée sur un manomètre plutôt que sur la balance ne donne jamais un chiffre exploitable non plus."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous avez oublié de peser la bouteille avant une récupération, et vous ne l'avez pesée qu'à la fin. Que vaut ce chiffre ?",
    "choix": [
     "La quantité récupérée, exactement",
     "La tare de la bouteille",
     "Une estimation qui ne peut pas remplacer une vraie double pesée",
     "Rien, la pesée finale suffit toujours"
    ],
    "bonne": 2,
    "explication": "Sans poids de départ, impossible de connaître la quantité réellement récupérée : ce n'est qu'une estimation. Elle ne se consigne pas comme une mesure au registre. La seule solution est de recommencer, avec une pesée avant et une pesée après.",
    "remediation_vers": "p6"
   },
   "criteres": [
    {
     "code": "5.05",
     "libelle": "Déterminer l'état du fluide et charger sans perte",
     "etat": "a_evaluer",
     "officiel": "Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, saturé ou surchauffé) d'un réfrigérant avant tout remplissage afin de choisir la méthode et le volume de remplissage les plus adaptés. Remplir le système de réfrigérant (à l'état liquide et gazeux) sans provoquer de pertes",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.06",
     "libelle": "Choisir la balance adaptée et peser",
     "etat": "a_evaluer",
     "officiel": "Choisir le bon type de balance et l'utiliser pour peser le réfrigérant",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "p7",
     "libelle": "Suite ▸ Préparation de chantier — risques, EPI, zone de travail"
    },
    {
     "vers": "m-prat",
     "libelle": "↺ Module pratique",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "p7",
   "type": "cours",
   "titre": "Préparation de chantier — risques, EPI, zone de travail",
   "dc": "Préparation pratique · codes 12.04 · 12.05",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/prepa-chantier.svg\" alt=\"Quatre temps avant de toucher : reconnaître le lieu et le fluide, identifier les risques du jour et les supprimer, se protéger avec les EPI qui en découlent, préparer la zone et le matériel.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Avant de sortir le moindre outil, deux choses se préparent : l'<b>analyse de risques</b> et la <b>zone de travail</b>. Ce n'est pas une formalité à cocher après coup. C'est la première étape du chantier, avant le premier geste technique.</p><p><b>L'analyse de risques</b> se fait dans cet ordre :</p><ol><li>Identifier le fluide en jeu, à partir de la plaque signalétique ou de la documentation : inflammable, sous pression, en espace confiné.</li><li>Repérer les dangers de la <b>zone elle-même</b> : ventilation, sources de chaleur ou d'étincelle à proximité, accès, présence de tiers.</li><li>Éliminer ce qui peut l'être — couper une source de chaleur, dégager un passage.</li><li>Signaler ce qui ne peut pas être éliminé. Si un point bloque vraiment, le chantier n'engage pas tant qu'il n'est pas corrigé.</li></ol><p>Vient ensuite la <b>préparation de la zone</b> :</p><ol><li>Baliser et signaler la zone de travail.</li><li>Dégager une <b>issue</b> utilisable à tout moment de l'intervention.</li><li>Sélectionner les <b>équipements de protection</b> adaptés au fluide et au geste prévu : protection des yeux, gants adaptés au produit et au froid, détecteur de gaz porté si le fluide l'exige.</li><li>Vérifier le matériel avant de l'emporter sur zone. Un flexible douteux ou un détecteur non vérifié <b>ne sort pas</b> de l'atelier.</li><li>Consigner électriquement l'installation avant toute ouverture de circuit.</li></ol><p>Sur une machine aux <b>hydrocarbures</b> (par exemple au R-290), le choix de l'outillage se fait <b>avant</b> d'ouvrir la zone, pas une fois dessus. Ces fluides sont inflammables : un outil ordinaire, prévu pour un gaz qui ne l'est pas, peut suffire à déclencher un accident. Une simple étincelle au mauvais endroit, au mauvais moment, enflamme le gaz qui s'est accumulé.</p><p>Certains outils se vérifient en particulier. La <b>station de récupération</b> doit être <b>compatible hydrocarbures</b> : conçue pour aspirer et stocker un gaz inflammable sans créer d'étincelle interne. Une station ordinaire, prévue pour un fluide non inflammable, n'a pas cette protection. Le <b>détecteur de fuite</b> doit lui aussi être adapté au gaz recherché : un détecteur réglé pour un autre fluide peut ne rien signaler alors que du gaz inflammable s'échappe.</p><p>Dans la zone balisée, tout le <b>matériel électrique</b> utilisé doit être <b>antidéflagrant</b> (on dit aussi « <b>ATEX</b> », pour les zones à risque d'explosion) : lampe, outillage électroportatif, appareils de mesure. Un matériel électrique ordinaire peut produire une étincelle interne invisible, suffisante pour enflammer un gaz inflammable présent dans l'air. La <b>ventilation</b> reste en marche pendant toute l'intervention, pour empêcher le gaz de s'accumuler.</p>",
   "blocs": [
    {
     "type": "piege",
     "t": "Sécurité imposée, jamais découverte",
     "html": "On ne teste pas un risque en le vivant. EPI absent, issue condamnée, détecteur en panne : chacun de ces points <b>arrête le chantier avant qu'il commence</b>, pas après un premier incident."
    },
    {
     "type": "cle",
     "t": "L'ordre qui protège",
     "html": "Analyser → éliminer ce qui peut l'être → signaler le reste → baliser → s'équiper → vérifier le matériel → consigner. Et alors seulement, intervenir."
    },
    {
     "type": "cle",
     "t": "Compatible, pas juste disponible",
     "html": "<b>Compatible</b> ne veut pas dire « qui marche quand même ». Une station, un détecteur ou un outil électrique doit être conçu pour les gaz inflammables, sinon on ne l'emmène pas sur une machine aux hydrocarbures — même s'il fonctionne très bien sur un autre chantier."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "En arrivant sur la zone d'intervention, vous constatez que l'issue de secours est encombrée par du matériel stocké. Que faites-vous ?",
    "choix": [
     "Je dégage l'issue et je signale le point avant d'engager le chantier",
     "Je commence le travail, je dégagerai l'issue plus tard si besoin",
     "Je note l'anomalie dans mon rapport et je continue normalement",
     "Je demande à un collègue de rester posté devant l'issue pendant l'intervention"
    ],
    "bonne": 0,
    "explication": "Une issue condamnée est un point bloquant de l'analyse de risques. On ne commence pas en espérant que ça n'arrivera pas. On dégage, ou on fait dégager, avant le premier geste technique.",
    "remediation_vers": "p7"
   },
   "criteres": [
    {
     "code": "12.04",
     "libelle": "Réaliser l'analyse de risques avant le travail",
     "etat": "a_evaluer",
     "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.05",
     "libelle": "Préparer la zone de travail et choisir les EPI adaptés",
     "etat": "a_evaluer",
     "officiel": "Préparer la zone de travail et sélectionner les outils, le matériel et les équipements de protection adéquats pour travailler sur des systèmes dépendant des réfrigérants inflammables",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "m-prat",
     "libelle": "↺ Module pratique",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g0",
   "type": "cours",
   "titre": "Ce que la loi vous impose",
   "dc": "G1 · code 1.00",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/aptitude-capacite.svg\" alt=\"L'attestation d'aptitude concerne la personne et prouve qu'elle sait faire ; l'attestation de capacité concerne l'entreprise et prouve qu'elle a le personnel, l'outillage et les procédures. Il faut les deux.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Les fluides frigorigènes peuvent réchauffer le climat s'ils s'échappent dans l'air. Deux niveaux de loi encadrent votre métier : le niveau européen et le niveau français.</p><p>Au niveau européen, le texte de base est le <b>règlement (UE) 2024/573</b>. C'est un <b>règlement</b>, jamais une « directive » : il s'applique directement dans tous les pays de l'Union, sans loi française pour le recopier. Il a remplacé l'ancien règlement 517/2014.</p><p>Au niveau français, l'<b>arrêté du 21 novembre 2025</b> — un texte signé par un ministre — précise comment appliquer ce règlement sur le terrain.</p><p>Pour intervenir sur les fluides, il vous faut une <b>attestation d'aptitude</b> personnelle. Votre entreprise, elle, doit avoir une <b>attestation de capacité</b>. Ce sont deux papiers obligatoires, et ce n'est pas le même.</p><p>Chaque équipement a un <b>registre</b> : un carnet qui garde la trace de chaque intervention (charge, contrôle, fuite, réparation). C'est l'<b>exploitant</b> (le propriétaire ou l'utilisateur de la machine) qui doit le tenir à jour, sur papier ou sur ordinateur.</p><p>Quand l'équipement est trop vieux ou cassé, il part dans la filière <b>DEEE</b> (déchets d'équipements électriques et électroniques). Cette filière s'occupe de la carcasse de la machine, pas du fluide : vous devez le récupérer avant, à part.</p><p>Enfin, l'<b>écoconception</b> : dès la fabrication, les constructeurs doivent concevoir des appareils qui durent plus longtemps et qui polluent moins.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qu'il faut retenir",
     "html": "<ul><li>Le texte européen est un <b>règlement</b> — (UE) 2024/573 — jamais une « directive ».</li><li><b>Attestation d'aptitude</b> : c'est pour vous, la personne.</li><li><b>Attestation de capacité</b> : c'est pour l'entreprise.</li><li><b>Registre</b> de l'équipement : tenu par l'exploitant, papier ou électronique.</li><li><b>DEEE</b> : la filière de fin de vie de la machine, pas du fluide.</li></ul>"
    },
    {
     "type": "piege",
     "t": "L'erreur classique",
     "html": "<p>Apprendre par cœur un chiffre précis (seuil, date, délai) vu dans une ancienne fiche. Le régime des fluides a changé avec le <b>règlement (UE) 2024/573</b> et l'<b>arrêté du 21 novembre 2025</b>. Face à un chiffre, réflexe unique : vérifier le texte en vigueur, jamais le deviner.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Le règlement (UE) 2024/573, qui encadre les fluides frigorigènes, est...",
    "choix": [
     "une directive, que la France doit recopier dans sa propre loi",
     "un règlement, qui s'applique directement dans toute l'Union européenne",
     "une norme technique facultative",
     "une simple recommandation, sans obligation"
    ],
    "bonne": 1,
    "explication": "C'est un <b>règlement</b>, pas une directive : il s'applique tel quel, tout de suite, dans tous les pays de l'Union européenne. Il a remplacé le règlement 517/2014.",
    "remediation_vers": "g0"
   },
   "criteres": [
    {
     "code": "1.00",
     "libelle": "Identifier les obligations légales de base liées aux fluides frigorigènes",
     "etat": "a_evaluer",
     "officiel": "Connaissance élémentaire de la législation de l'Union européenne et nationale applicable, notamment celle relative aux gaz à effet de serre fluoré, aux DEEE et à l'écoconception",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "g1a",
     "libelle": "Suite ▸ Unités, pression, thermodynamique utile"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "g1a",
   "type": "cours",
   "titre": "Unités, pression, thermodynamique utile",
   "dc": "G1 · codes 1.01 · 1.02 · 1.04",
   "minuteur_s": 300,
   "corps": "<p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/chaleur-circuit-interactif/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🌡️ Lancer le cours interactif : premières notions de thermodynamique ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Le tome 2 du circuit : température, énergie et puissance, chaleur sensible et latente avec calculateurs, saturation, surchauffe et sous-refroidissement, bilans énergétiques — 12 écrans narrés et un quiz de 12 questions (seuil 9/12), environ 20 minutes.</span></p><img src=\"packs/fluides/res/svg/croix-frigoriste.svg\" alt=\"La croix du frigoriste : détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Tout le métier tient sur un couple : <b>pression et température vont ensemble</b>. Chauffer un fluide enfermé fait monter sa pression ; abaisser sa pression le fait bouillir plus froid. C'est cette relation qu'on exploite d'un bout à l'autre du circuit.</p><p>Quatre organes, dans l'ordre du cycle : le <b>compresseur</b> aspire la vapeur basse pression et la refoule en haute pression ; le <b>condenseur</b> évacue la chaleur et liquéfie ; le <b>détendeur</b> fait chuter la pression ; l'<b>évaporateur</b> absorbe la chaleur du milieu à refroidir. Basse pression du côté froid, haute pression du côté chaud.</p><p>Une autre grandeur sert tous les jours au frigoriste : la <b>masse volumique</b> (on dit aussi <b>densité</b>). C'est la masse contenue dans un volume donné, en <b>kg/m³</b>. Pour un même fluide, la vapeur et le liquide n'ont pas du tout la même masse volumique : un litre de liquide pèse beaucoup plus lourd qu'un litre de vapeur. C'est pour ça qu'on charge un circuit en <b>phase liquide</b> plutôt qu'en vapeur : on fait entrer beaucoup plus de matière pour le même volume de bouteille, et le dimensionnement des tuyauteries en tient compte.</p><p>Sur le diagramme du fluide, la grandeur qu'on lit en abscisse s'appelle l'<b>enthalpie</b>. C'est l'énergie contenue dans un kilo de fluide, en <b>kJ/kg</b> (kilojoule par kilo). Elle sert à calculer ce que l'évaporateur absorbe et ce que le condenseur évacue : plus l'écart d'enthalpie entre l'entrée et la sortie est grand, plus l'échange de chaleur est important.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "À retenir",
     "html": "<b>Surchauffe</b> : le fluide sort de l'évaporateur un peu plus chaud que sa température d'évaporation — elle protège le compresseur du liquide. Repère : <b>5 à 10 K</b>.<br><b>Sous-refroidissement</b> : le liquide sort du condenseur un peu plus froid que sa température de condensation — il garantit du liquide pur au détendeur. Repère : <b>4 à 8 K</b>."
    },
    {
     "type": "piege",
     "t": "Le piège des manomètres",
     "html": "<img src=\"packs/fluides/res/svg/pression-absolue-relative.svg\" alt=\"Animation : deux échelles verticales côte à côte, la relative du manomètre et l'absolue des tables, décalées de 1 bar — un curseur monte le long des deux en même temps, et le manomètre à zéro est déjà à 1 bar absolu.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><b>Pression absolue = pression relative + environ 1 bar.</b> Un manomètre de service lit en relatif ; les tables de saturation, elles, sont souvent en absolu. Se tromper d'un bar, c'est se tromper de plusieurs kelvins sur la température de saturation — et diagnostiquer une fuite qui n'existe pas."
    },
    {
     "type": "piege",
     "t": "Mélanges zéotropes : le glissement",
     "html": "<p>Certains fluides sont des <b>mélanges zéotropes</b> : plusieurs fluides purs mélangés dont les composants ne s'évaporent pas ensemble. Résultat, pendant tout le changement d'état, la température n'est pas constante : elle <b>glisse</b>, on parle de <b>glissement</b>. Conséquence pratique : on charge et on soutire toujours ces mélanges en <b>phase liquide</b>, jamais en phase vapeur, sinon la composition change et le fluide qui reste dans la bouteille n'est plus le même.</p>"
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
     "etat": "a_evaluer",
     "officiel": "Connaître les unités normalisées ISO pour la température, la pression, la masse, la densité et l'énergie",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "1.02",
     "libelle": "Expliquer la thermodynamique élémentaire du froid",
     "etat": "a_evaluer",
     "officiel": "Comprendre la théorie élémentaire des systèmes de réfrigération : thermodynamique élémentaire (terminologie, paramètres et processus essentiels tels que « surchauffe », « côté haute pression », « chaleur de compression », « enthalpie », « effet de réfrigération », « côté basse pression », « sous-refroidissement »), propriétés et transformations thermodynamiques des réfrigérants, y compris l'identification des mélanges zéotropiques et des états des fluides",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "1.04",
     "libelle": "Décrire la fonction de chaque composant du circuit",
     "etat": "a_evaluer",
     "officiel": "Décrire la fonction des principales composantes du système (compresseur, évaporateur, condenseur, détendeurs thermostatiques) et les transformations thermodynamiques du réfrigérant",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "ressources": [
    "r-croix",
    "r-mollier"
   ],
   "liens": [
    {
     "vers": "g1s",
     "libelle": "Suite ▸ Chaleur sensible et chaleur latente"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "g1s",
   "type": "cours",
   "titre": "Chaleur sensible et chaleur latente",
   "dc": "G1 · code 1.02",
   "minuteur_s": 360,
   "corps": "<p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/chaleur-interactive/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🧊 Lancer le cours interactif : du glaçon au circuit frigorifique ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">12 étapes racontées : glaçon et casserole, quantité d'énergie, courbes de chauffe et de refroidissement, chaleurs sensible et latente, liquéfaction, réfrigérateur, circuit frigorifique, surchauffe/sous-refroidissement et défi final — environ 15 minutes.</span></p><img src=\"packs/fluides/res/svg/chaleur-sensible-latente.svg\" alt=\"La courbe de chauffe d'un fluide : la température monte, puis s'arrête pendant tout le changement d'état, puis repart. Le palier commence au point de bulle et finit au point de rosée.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Chauffez de l'eau dans une casserole. Le thermomètre monte, régulièrement. Cette chaleur-là, l'appareil la « sent » : on l'appelle la <b>chaleur sensible</b>. Elle fait changer la <b>température</b>, elle ne fait pas changer l'état.</p><p>Continuez à chauffer. L'eau se met à bouillir — et là, quelque chose d'étonnant se produit : <b>le thermomètre s'arrête</b>. Vous chauffez toujours, la température ne monte plus. Toute la chaleur apportée sert à transformer le liquide en vapeur, et rien d'autre. C'est la <b>chaleur latente</b>. Le mot vient du latin <i>latens</i>, « caché » : cette chaleur est bien là, elle est même considérable, mais le thermomètre ne la voit pas.</p><p>Sur la courbe, ce moment forme un <b>palier</b>, une ligne plate. Il commence quand la première bulle se forme : c'est le <b>point de bulle</b>. Il finit quand la dernière goutte disparaît : c'est le <b>point de rosée</b>. Entre les deux, du liquide et de la vapeur cohabitent dans le même tube — on dit que le fluide est <b>saturé</b>.</p><p>Voilà pourquoi une machine frigorifique ne travaille pas avec de l'air, mais avec un fluide qui <b>change d'état</b>. Sur le palier, le fluide encaisse beaucoup de chaleur sans s'échauffer : c'est exactement ce qu'on cherche. L'<b>évaporateur</b> fait bouillir le fluide, donc il <b>prend</b> de la chaleur au local. Le <b>condenseur</b> le liquéfie, donc il <b>rend</b> cette chaleur dehors. Toute la machine tient dans ces deux phrases.</p><p>Deux mots du référentiel se posent ici, une fois pour toutes. La chaleur que l'évaporateur prend au local, rapportée à un kilo de fluide, s'appelle l'<b>effet de réfrigération</b> : c'est le froid produit, et c'est ce que l'on cherche à rendre le plus grand possible. Le compresseur, lui, ajoute au fluide sa propre chaleur en le comprimant : c'est la <b>chaleur de compression</b>. Le condenseur devra donc évacuer les deux — la chaleur prise au local <b>et</b> celle ajoutée par le compresseur. C'est pour cette raison qu'un condenseur évacue toujours plus de chaleur qu'un évaporateur n'en absorbe.</p><p>Reste une question : à quelle température se produit la <b>vaporisation</b>, donc le palier ? Elle dépend de la <b>pression</b>. Plus la pression est basse, plus le fluide bout froid. C'est précisément ce que fait le <b>détendeur</b> : il fait chuter la pression pour que le fluide puisse bouillir à une température plus basse que le local à refroidir. La relation pression-température vue à la fiche précédente, c'est la <b>hauteur du palier</b>.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Les cinq mots, dans l'ordre",
     "html": "<b>1. Liquide sous-refroidi</b> — que du liquide, plus froid que son point d'ébullition.<br><b>2. Point de bulle</b> — la première bulle apparaît, le palier commence.<br><b>3. Saturé</b> — liquide et vapeur ensemble, la température ne bouge plus.<br><b>4. Point de rosée</b> — la dernière goutte s'évapore, le palier finit.<br><b>5. Vapeur surchauffée</b> — que de la vapeur, et la température peut repartir.<br>Ce que la vapeur gagne après le point de rosée s'appelle la <b>surchauffe</b>. Ce que le liquide perd avant le point de bulle s'appelle le <b>sous-refroidissement</b>. Ces deux mots reviendront à chaque mesure du métier."
    },
    {
     "type": "piege",
     "t": "Un palier n'est pas une pause",
     "html": "Sur le palier, la température ne bouge pas — et beaucoup en concluent qu'il ne se passe rien. C'est l'inverse : <b>c'est le moment où le fluide échange le plus de chaleur</b>. Un stagiaire qui croit qu'un palier est un temps mort ne comprendra jamais à quoi sert un évaporateur."
    },
    {
     "type": "piege",
     "t": "Le palier des mélanges n'est pas plat",
     "html": "Ce qui vient d'être dit vaut pour un <b>corps pur</b>. Dans un <b>mélange zéotrope</b> (les R-4xx), les composants ne bouillent pas tous à la même température : pendant le changement d'état, la température <b>monte lentement</b> au lieu de rester fixe. C'est le <b>glissement</b>. Conséquence directe : le point de bulle et le point de rosée ne sont plus à la même température, et il faut savoir <b>lequel des deux</b> la table de saturation vous donne avant de calculer quoi que ce soit."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Un fluide est en train de se vaporiser dans l'évaporateur. On continue de lui apporter de la chaleur. Que fait sa température ?",
    "choix": [
     "Elle monte, proportionnellement à la chaleur apportée",
     "Elle ne bouge pas : toute la chaleur sert au changement d'état",
     "Elle descend, puisque c'est la partie froide du circuit",
     "Elle monte puis redescend à chaque bulle"
    ],
    "bonne": 1,
    "explication": "Pendant le changement d'état, la chaleur apportée est de la chaleur latente : elle transforme le liquide en vapeur sans faire monter la température. C'est le palier — et c'est là que l'évaporateur prend l'essentiel de la chaleur du local.",
    "remediation_vers": "g1s"
   },
   "criteres": [
    {
     "code": "1.02",
     "libelle": "Distinguer chaleur sensible et chaleur latente, et nommer les états du fluide",
     "etat": "a_evaluer",
     "officiel": "Comprendre la théorie élémentaire des systèmes de réfrigération : thermodynamique élémentaire (terminologie, paramètres et processus essentiels tels que « surchauffe », « côté haute pression », « chaleur de compression », « enthalpie », « effet de réfrigération », « côté basse pression », « sous-refroidissement »), propriétés et transformations thermodynamiques des réfrigérants, y compris l'identification des mélanges zéotropiques et des états des fluides",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "ressources": [
    "r-mollier",
    "r-enthalpique"
   ],
   "liens": [
    {
     "vers": "g1b",
     "libelle": "Suite ▸ Lire un log p-h et une table de saturation"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "g1b",
   "type": "cours",
   "titre": "Lire un log p-h et une table de saturation",
   "dc": "G1 · code 1.03",
   "minuteur_s": 300,
   "corps": "<p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/pression-temperature-interactive/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🫧 Lancer le cours interactif : faire bouillir sans feu ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">12 étapes racontées : cloche à vide, relation pression–température, températures de saturation, évaporateur et condenseur, lecture manomètre–table, point de bulle, point de rosée, glissement des zéotropes et défi final — environ 15 minutes.</span></p><img src=\"packs/fluides/res/svg/diagramme-logph.svg\" alt=\"Le diagramme log p-h : la cloche sépare le liquide, le mélange et la vapeur surchauffée ; le cycle s'y trace en quatre transformations qui forment un rectangle.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le <b>diagramme log p-h</b> raconte en image ce que la fiche précédente a raconté en mots. Deux axes seulement. En <b>ordonnée</b>, la <b>pression</b>. En <b>abscisse</b>, l'<b>enthalpie</b> : l'énergie contenue dans un kilo de fluide.</p><p>La pression y est portée sur une <b>échelle logarithmique</b> — c'est ce que veut dire le « log » du nom. Sur une règle ordinaire, la basse pression serait écrasée tout en bas de la feuille et illisible. Sur cette échelle-là, les petites pressions sont autant étalées que les grandes : les deux côtés du circuit se lisent aussi bien.</p><p>Au milieu du diagramme, une <b>courbe en cloche</b> partage la feuille en trois. À <b>gauche</b> de la cloche, le fluide est entièrement <b>liquide</b>. <b>Sous</b> la cloche, c'est le <b>mélange</b> liquide + vapeur : le palier. À <b>droite</b>, c'est de la <b>vapeur surchauffée</b>. Le sommet de la cloche s'appelle le <b>point critique</b> : au-dessus, le fluide ne se sépare plus en liquide et vapeur.</p><p>Les deux flancs de la cloche portent les noms déjà rencontrés : le flanc de gauche est la <b>courbe de bulle</b>, le flanc de droite la <b>courbe de rosée</b>. La cloche du diagramme et le palier de la courbe de chauffe sont la même chose, vue autrement.</p><p>Le <b>cycle frigorifique</b> simple à compression se trace alors en <b>quatre transformations</b>, qui dessinent un rectangle. Le trait <b>montant de droite</b> : la <b>compression</b>. Le trait <b>horizontal du haut</b> : la <b>condensation</b>, à haute pression. Le trait <b>descendant de gauche</b> : la <b>détente</b>. Le trait <b>horizontal du bas</b> : l'<b>évaporation</b>, à basse pression. Compresseur à droite, condenseur en haut, détendeur à gauche, évaporateur en bas : <b>c'est la croix du frigoriste</b>. Le diagramme n'invente rien, il met le circuit à plat.</p><p>Et c'est là que le diagramme devient un outil de terrain. Sur le trait du <b>bas</b>, ce qui dépasse à droite de la courbe de rosée, c'est la <b>surchauffe</b>. Sur le trait du <b>haut</b>, ce qui dépasse à gauche de la courbe de bulle, c'est le <b>sous-refroidissement</b>. Deux longueurs qui se voient d'un coup d'œil.</p><p>Un diagramme de constructeur porte d'autres réseaux de courbes que celui dessiné ici. Sous la cloche, des courbes obliques donnent le <b>titre de vapeur</b> : la part du fluide déjà passée à l'état vapeur, de 0 sur la courbe de bulle à 1 sur la courbe de rosée. Il n'est pas nécessaire de les exploiter pour l'épreuve, mais il faut savoir les reconnaître pour ne pas les confondre avec les frontières de la cloche.</p><img src=\"packs/fluides/res/svg/lecture-table.svg\" alt=\"La lecture croisée : manomètre + 1 bar, table de saturation du fluide, sonde de contact.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>La <b>table de saturation</b> dit exactement la même chose, en chiffres. Elle donne, pour un fluide donné, la correspondance entre pression et température d'équilibre. Elle se lit dans les deux sens : je mesure une pression, j'en déduis une température ; je mesure une température, j'en déduis une pression. La colonne « température de saturation » de la table, c'est la cloche du diagramme.</p><p>C'est l'outil de la <b>méthode indirecte</b> : sans ouvrir le circuit, on compare ce qu'on mesure à ce que la table annonce.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "La méthode en trois gestes",
     "html": "1. Relever la <b>pression</b> au manomètre (et la convertir en absolu si besoin).<br>2. Lire la <b>température de saturation</b> correspondante dans la table du fluide.<br>3. Comparer à la <b>température réellement mesurée</b> sur le tube : l'écart, c'est la surchauffe (à l'aspiration) ou le sous-refroidissement (en sortie de condenseur)."
    },
    {
     "type": "piege",
     "t": "L'échelle des pressions n'est pas une règle graduée",
     "html": "Sur une échelle <b>logarithmique</b>, ce qui est constant n'est pas l'écart entre deux graduations, c'est le <b>rapport</b>. La même distance sépare 1 et 10, puis 10 et 100. Conséquence pratique : <b>on ne mesure pas une pression à la règle sur ce diagramme</b>, on lit la graduation. Les valeurs, elles, se prennent au manomètre et dans la table."
    },
    {
     "type": "piege",
     "t": "Un fluide, une table",
     "html": "Chaque fluide a sa propre table : la pression lue ne veut rien dire tant qu'on ne sait pas <b>quel fluide</b> est dans le circuit. On le vérifie sur la plaque signalétique et dans le registre, jamais « à la couleur de la bouteille »."
    },
    {
     "t": "À vous : la réglette P ↔ T",
     "html": "<p style=\"margin:0 0 10px\">Choisissez un fluide, réglez la pression lue au manomètre, entrez la température du tube : la surchauffe se calcule sous vos yeux. C est exactement le geste de la méthode indirecte.</p><iframe src=\"packs/fluides/res/outils/reglette.html\" title=\"Réglette pression-température interactive\" style=\"width:100%;height:445px;border:0;background:#fff;border-radius:6px\" loading=\"lazy\"></iframe>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Sur le diagramme log p-h, le cycle forme un rectangle. Que représente le trait horizontal du bas ?",
    "choix": [
     "La compression",
     "La condensation",
     "La détente",
     "L'évaporation"
    ],
    "bonne": 3,
    "explication": "Le trait du bas est celui de la basse pression : c'est l'évaporation. Le trait du haut, à haute pression, est la condensation ; le trait montant de droite est la compression ; le trait descendant de gauche est la détente. C'est la croix du frigoriste, mise à plat.",
    "remediation_vers": "g1b"
   },
   "criteres": [
    {
     "code": "1.03",
     "libelle": "Lire un diagramme log p-h, une table de saturation, et y tracer un cycle",
     "etat": "a_evaluer",
     "officiel": "Utiliser les tableaux et graphiques correspondants et les interpréter dans le cadre de contrôles d'étanchéité indirects (y compris le contrôle du bon fonctionnement du système) : diagramme log p/h, tables de saturation d'un réfrigérant, diagramme d'un cycle frigorifique simple à compression",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "ressources": [
    "r-mollier",
    "r-enthalpique"
   ],
   "liens": [
    {
     "vers": "g1e",
     "libelle": "Suite ▸ Surchauffe et sous-refroidissement"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "g1e",
   "type": "cours",
   "titre": "Surchauffe et sous-refroidissement",
   "dc": "G1 · codes 1.02 · 5.05",
   "minuteur_s": 360,
   "corps": "<p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/froid-clim-academie/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🎛️ Lancer le cours interactif : surchauffe et sous-refroidissement ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Le cycle animé, puis quatre curseurs à manipuler (évaporation, condensation, surchauffe, sous-refroidissement) : les pressions réagissent et le risque s'affiche — avec un atelier panne et un quiz flash — environ 10 minutes.</span></p><img src=\"packs/fluides/res/svg/surchauffe-utile-totale.svg\" alt=\"Le fluide bout dans l'évaporateur ; après la disparition de la dernière goutte, la vapeur s'échauffe : c'est la surchauffe utile dans l'échangeur, puis la surchauffe totale jusqu'au compresseur.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Voici les deux mots que vous entendrez le plus souvent sur un chantier. Et la première chose à comprendre est la plus importante : <b>ce sont des différences, jamais des températures</b>. On ne dit pas « la surchauffe est de 12 degrés » comme on dirait « il fait 12 degrés ». On dit : le fluide est <b>12 kelvins au-dessus</b> de sa température de changement d'état, à la pression où il se trouve.</p><p>La <b>surchauffe</b> se prend là où le fluide est devenu vapeur : après le point de rosée, donc en sortie d'évaporateur et sur la ligne d'aspiration. Le <b>sous-refroidissement</b> se prend là où le fluide est devenu liquide : après le point de bulle, donc en sortie de condenseur. Chacun de son côté du circuit.</p><p>La mesure est toujours la même, et elle demande <b>deux instruments</b>. Le <b>manomètre</b> donne la pression ; la <b>table de saturation</b> du fluide traduit cette pression en température de changement d'état. Le <b>thermomètre de contact</b> donne la température réelle du tube. La différence entre les deux, c'est la valeur cherchée. Un seul instrument ne suffit jamais.</p><p>La surchauffe se prend en deux endroits, et cela porte deux noms. La <b>surchauffe utile</b> est celle que la vapeur gagne <b>à l'intérieur même de l'évaporateur</b> : elle a servi à refroidir le local, d'où son nom. La <b>surchauffe totale</b> ajoute à celle-ci ce que la <b>ligne d'aspiration</b> apporte entre la sortie de l'évaporateur et le compresseur. Une ligne mal isolée, qui traverse un local chaud, augmente la surchauffe totale sans rien apporter au froid.</p><p>Pourquoi la règle-t-on ? Pour deux raisons opposées, et il faut passer entre les deux. Une surchauffe <b>trop faible</b>, et du liquide arrive au compresseur : le liquide ne se comprime pas, la casse est immédiate. Une surchauffe <b>trop forte</b>, et le compresseur s'échauffe pendant que l'évaporateur travaille mal : le rendement chute. Repère usuel : <b>5 à 10 K</b>.</p><p>Le <b>sous-refroidissement</b>, lui, garantit qu'il arrive du <b>liquide pur</b> au détendeur. S'il n'y en a pas assez, des bulles de vapeur se forment dans la ligne liquide et le détendeur n'alimente plus correctement. Repère usuel : <b>4 à 8 K</b>. Ces deux repères se <b>recalent toujours</b> sur la documentation du constructeur : ils orientent, ils ne remplacent pas la fiche technique de la machine.</p><p>Enfin, ces deux valeurs répondent à une question que l'on se pose <b>avant de charger</b> : dans quel état est le fluide à cet endroit du circuit — liquide sous-refroidi, saturé, ou vapeur surchauffée ? C'est ce diagnostic qui commande la méthode de remplissage, et c'est pour cela qu'il figure au référentiel avant même le geste de charge.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce que la valeur vous dit",
     "html": "<b>Surchauffe nulle</b>, ligne d'aspiration givrée → du liquide part vers le compresseur. On agit <b>tout de suite</b>.<br><b>Surchauffe élevée</b> → l'évaporateur est mal alimenté : détendeur trop fermé, ou charge insuffisante.<br><b>Sous-refroidissement effondré</b> → il manque du fluide, ou de la vapeur passe dans la ligne liquide.<br><b>Sous-refroidissement anormalement élevé</b> → du liquide s'accumule dans le condenseur : charge excessive, ou sortie de condenseur gênée.<br>Aucune de ces lectures ne conclut seule : c'est la <b>convergence</b> des indices qui oriente le diagnostic."
    },
    {
     "type": "piege",
     "t": "Une surchauffe ne se lit pas sur un thermomètre",
     "html": "L'erreur la plus fréquente : relever la température de l'aspiration et l'annoncer comme « la surchauffe ». <b>C'est une température, pas une surchauffe.</b> Sans la pression, et sans la table du fluide qui est réellement dans le circuit, ce nombre ne veut rien dire. Et rappel du piège de base : le manomètre lit en <b>relatif</b>, la table est souvent en <b>absolu</b> — environ 1 bar d'écart, donc plusieurs kelvins d'erreur."
    },
    {
     "type": "piege",
     "t": "Utile ou totale : ce n'est pas la même valeur",
     "html": "Comparer une surchauffe <b>utile</b> à une consigne donnée en <b>totale</b> — ou l'inverse — conduit à dérégler une machine qui allait bien. Avant de comparer une mesure à une valeur de référence, vérifiez <b>où</b> la référence a été prise : en sortie d'évaporateur, ou à l'entrée du compresseur."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Sur la ligne d'aspiration, le thermomètre de contact indique 8 °C. Que peut-on en conclure sur la surchauffe ?",
    "choix": [
     "Elle est de 8 K",
     "Rien encore : il faut aussi la pression et la table du fluide",
     "Elle est nulle, puisque la température est positive",
     "Elle est correcte, car comprise entre 5 et 10"
    ],
    "bonne": 1,
    "explication": "La surchauffe est une différence. Il faut la température de changement d'état, que seule la pression lue au manomètre donne, par la table de saturation du fluide présent. Une température seule ne dit rien.",
    "remediation_vers": "g1e"
   },
   "criteres": [
    {
     "code": "1.02",
     "libelle": "Expliquer la surchauffe et le sous-refroidissement, et savoir les mesurer",
     "etat": "a_evaluer",
     "officiel": "Comprendre la théorie élémentaire des systèmes de réfrigération : thermodynamique élémentaire (terminologie, paramètres et processus essentiels tels que « surchauffe », « côté haute pression », « chaleur de compression », « enthalpie », « effet de réfrigération », « côté basse pression », « sous-refroidissement »), propriétés et transformations thermodynamiques des réfrigérants, y compris l'identification des mélanges zéotropiques et des états des fluides",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.05",
     "libelle": "Déterminer l'état d'un fluide : sous-refroidi, saturé ou surchauffé",
     "etat": "a_evaluer",
     "officiel": "Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, saturé ou surchauffé) d'un réfrigérant avant tout remplissage afin de choisir la méthode et le volume de remplissage les plus adaptés. Remplir le système de réfrigérant (à l'état liquide et gazeux) sans provoquer de pertes",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "ressources": [
    "r-mollier",
    "r-tp-mano"
   ],
   "liens": [
    {
     "vers": "g1c",
     "libelle": "Suite ▸ Familles et codes des fluides"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "g1c",
   "type": "cours",
   "titre": "Les familles de fluides et leurs codes",
   "dc": "G1 · codes 1.06 · 1.07",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/familles-fluides.svg\" alt=\"Les cinq familles : CFC, HCFC, HFC, HFO et naturels, avec leur composition atomique.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Derrière chaque code se cache une <b>molécule</b>, et trois atomes y décident de tout : le <b>chlore</b> détruit l'ozone — c'est lui qui a condamné les CFC puis les HCFC ; le <b>fluor</b> rend la molécule stable, donc durable dans l'atmosphère, donc à fort effet de serre ; l'<b>hydrogène</b> raccourcit la durée de vie. Les <b>HFC</b> ont éliminé le chlore (ozone sauvé), gardé le fluor (climat pénalisé). Les <b>HFO</b> ajoutent une double liaison fragile : la molécule casse en quelques jours, PRP ≈ 1. Les <b>naturels</b> — propane, isobutane, ammoniac, CO₂ — existent sans chimie de synthèse, chacun avec son revers : inflammabilité, toxicité ou pression.</p><img src=\"packs/fluides/res/svg/nomenclature.svg\" alt=\"Décoder R-134a : centaines = carbone moins un, dizaines = hydrogène plus un, unités = fluor. Les séries R-4xx, R-5xx, R-6xx, R-7xx.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Et le numéro n'est pas un matricule : il <b>décrit la molécule</b>. Centaines + 1 = carbone, dizaines − 1 = hydrogène, unités = fluor — les liaisons restantes sont du chlore. Les mélanges et les fluides inorganiques ont leurs séries : 4xx, 5xx, 6xx, 7xx.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/nomenclature-interactive/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🧬 Lancer le cours interactif : décrypter un code de fluide ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">18 étapes racontées, une voix qui explique, et un atelier où vous assemblez vous-même la molécule R-22 (glisser-déposer) — environ 10 minutes.</span></p><p>Un fluide de substitution ne se charge pas forcément « comme l'ancien ». On distingue deux cas. Le <b>drop-in</b> : le nouveau fluide est compatible avec l'huile et les composants déjà en place, la machine ne change pas, on vidange, on tire au vide, on recharge. Le <b>retrofit</b> : le nouveau fluide n'est pas compatible tel quel, il impose d'adapter la machine — huile, joints, détendeur — selon la <b>documentation constructeur</b>, avant toute recharge.</p><p>Cette distinction n'est pas un détail administratif : un fluide de substitution ne se comporte pas forcément comme l'ancien sur chaque composant du circuit. Le <b>détendeur</b> a été calé pour une courbe de pression donnée ; avec un autre fluide, il peut ne plus détendre au bon point. Les <b>joints</b> ont été choisis pour une huile donnée ; une huile incompatible les fait gonfler ou durcir. C'est pour cela que seule la documentation constructeur dit si un couple machine/fluide est un simple drop-in ou impose un retrofit — jamais l'habitude ou le « ça a l'air pareil ».</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "L'astuce du + 90",
     "html": "Ajoute 90 au code, et tu lis directement C, H, F : <b>134 + 90 = 224</b> → C₂H₂F₄ (R-134a). <b>22 + 90 = 112</b> → C·H·F₂… plus un <b>chlore</b> pour compléter : CHClF₂ — voilà pourquoi le R-22 est un HCFC interdit. <b>290 + 90 = 380</b> → C₃H₈ : le propane, zéro fluor, zéro chlore."
    },
    {
     "type": "piege",
     "t": "Le code dit la molécule, pas le danger",
     "html": "R-32 et R-290 se ressemblent sur l'étiquette — l'un est A2L, l'autre A3. La famille chimique dit l'<b>impact environnemental</b> ; la classe NF EN 378 dit le <b>risque de manipulation</b>. Il faut les deux lectures, à chaque fois."
    },
    {
     "type": "piege",
     "t": "Drop-in ou retrofit : ne pas deviner",
     "html": "<p>Un fluide vendu comme « remplacement direct » n'est pas automatiquement un <b>drop-in</b> sur toutes les machines. Sans vérifier la documentation constructeur, on peut charger un fluide de substitution dans une machine qui aurait exigé un <b>retrofit</b> — huile non changée, détendeur non réglé. Le fluide tourne, mais la machine ne fonctionne plus comme prévu. Toujours vérifier avant de charger, jamais deviner.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Un fluide dont le code commence par R-4 (R-404A, R-407C, R-410A…) est toujours :",
    "choix": [
     "Un corps pur de la famille HFO",
     "Un mélange zéotrope de plusieurs fluides",
     "Un fluide naturel",
     "Un fluide contenant du chlore"
    ],
    "bonne": 1,
    "explication": "La série R-4xx désigne les mélanges zéotropes : plusieurs fluides assemblés, avec un glissement de température. La lettre majuscule finale (A, B, C) distingue les proportions du mélange.",
    "remediation_vers": "g1c"
   },
   "criteres": [
    {
     "code": "1.06",
     "libelle": "Identifier la famille et les caractéristiques d'un fluide",
     "etat": "a_evaluer",
     "officiel": "Connaître le comportement spécifique, les paramètres physiques, les systèmes, les solutions, les déviances de tous les réfrigérants de substitution dans le cycle de réfrigération et les composants pour leur utilisation",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "1.07",
     "libelle": "Décoder la nomenclature R-xyz et les séries de mélanges",
     "etat": "a_evaluer",
     "officiel": "Connaître les caractéristiques des hydrocarbures, du CO2, et du NH3 et des autres réfrigérants non fluorés par rapport aux réfrigérants à gaz à effet de serre fluorés",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "g1d",
     "libelle": "Suite ▸ Les organes qui trahissent une fuite"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "g1d",
   "type": "cours",
   "titre": "Les organes qui trahissent une fuite",
   "dc": "G1 · code 1.05",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/points-de-fuite.svg\" alt=\"Sur le circuit, les organes qui alertent ou protègent avant, pendant et après une fuite.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Une fuite ne se voit pas toujours de face. Mais plusieurs organes du circuit la <b>trahissent</b> : ils changent d'aspect, se mettent en sécurité, ou limitent les dégâts. Les repérer, c'est déjà commencer le diagnostic.</p><ul><li><b>a) Les valves.</b> Le <b>robinet à boule</b> et le <b>robinet à soupape</b> isolent une portion de circuit ; leur presse-étoupe (la bague qui serre la tige de manœuvre) est un point de fuite classique. Le <b>robinet à diaphragme</b> n'a pas cette tige : une membrane souple assure l'étanchéité, donc moins d'usure. La <b>vanne électromagnétique</b>, dite <b>solénoïde</b>, s'ouvre et se ferme électriquement ; elle isole la réserve de fluide en cas d'arrêt. La <b>vanne 4 voies</b> inverse le sens du cycle (froid ↔ chaud) : beaucoup de raccords brasés et une pièce mobile interne, donc plusieurs points à surveiller.</li><li><b>b) Les contrôles de température et de pression.</b> Le <b>thermostat</b> pilote le compresseur selon la température. Le <b>pressostat de régulation</b> fait pareil selon la pression : il coupe et relance en fonctionnement normal — à ne pas confondre avec le <b>pressostat de sécurité</b>, qui protège contre une pression anormale (détail ci-dessous). Un pressostat de régulation qui coupe trop tôt peut signaler un manque de charge, donc une fuite.</li><li><b>c) Le voyant liquide et la pastille d'humidité.</b> Le <b>voyant liquide</b> est un hublot sur la ligne liquide. En <b>régime stable</b> (l'installation tourne depuis un moment), il doit rester net, sans bulle. Des <b>bulles qui persistent</b> montrent un manque de charge — souvent une fuite. La <b>pastille d'humidité</b>, intégrée au voyant, change de couleur selon l'eau présente dans le circuit ; la grille de lecture est propre à chaque fabricant, selon la fiche constructeur.</li><li><b>d) Les contrôles du dégivrage.</b> Ils déclenchent et arrêtent le dégivrage de l'évaporateur. Un givre anormal — pas symétrique, ou qui ne part jamais complètement — n'est pas toujours un problème de dégivrage : ça peut être un manque de fluide qui prive une partie de la batterie.</li><li><b>e) Les protecteurs du système.</b> Protection thermique du compresseur, <b>soupape de sécurité</b>, pressostat de sécurité (vu plus haut) : ils empêchent qu'une anomalie ne tourne à la casse. Une soupape de sécurité qui s'ouvre relâche elle-même du fluide dans l'atmosphère : une fuite volontaire, réglée pour l'urgence, à contrôler selon la fiche constructeur.</li><li><b>f) Les instruments de mesure.</b> Un <b>thermomètre</b> à pince ou à contact mesure la température réelle d'un tube. Comparé à la table de saturation (revoir G1 · code 1.03), l'écart donne la surchauffe ou le sous-refroidissement : c'est la méthode indirecte, sans ouvrir le circuit.</li><li><b>g) Les systèmes de contrôle de l'huile.</b> Un <b>voyant d'huile</b> sur le compresseur montre le niveau et l'aspect de l'huile. Un niveau qui baisse sans explication doit alerter : l'huile se mélange au fluide et s'échappe avec lui par une fuite — même logique que la trace d'huile sous un raccord (déjà vue en G4).</li><li><b>h) Les réservoirs.</b> La <b>bouteille de liquide</b> stocke le fluide condensé avant le détendeur. Plusieurs raccords (entrée, sortie, vanne de service) : autant de points à contrôler. L'isoler avant une intervention limite la quantité de fluide qui pourrait fuir.</li><li><b>i) Les séparateurs de liquide et d'huile.</b> Le <b>séparateur de liquide</b>, sur l'aspiration, retient le liquide résiduel pour éviter un <b>coup de liquide</b> au compresseur (il aspire du liquide au lieu de vapeur : casse immédiate, le liquide ne se comprime pas). Le <b>séparateur d'huile</b>, sur le refoulement, retient l'huile entraînée par le gaz chaud et la renvoie au compresseur.</li></ul><p>Sur les fluides très inflammables ou toxiques (hydrocarbures, ammoniac) et sur le CO₂, qui travaille à haute pression, ces mêmes organes existent mais avec des exigences renforcées propres à chaque fluide.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Où les trouver sur la croix du frigoriste",
     "html": "Détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas. Le <b>séparateur d'huile</b> se loge juste à la sortie du compresseur, côté droit, sur le refoulement. Le <b>réservoir</b> et le <b>voyant liquide</b> se trouvent sur la ligne liquide, entre le condenseur (haut) et le détendeur (gauche) — juste avant le détendeur. Le <b>séparateur de liquide</b> se loge juste avant l'entrée du compresseur, côté droit, sur l'aspiration."
    },
    {
     "type": "piege",
     "t": "Deux pressostats, pas un",
     "html": "Le <b>pressostat de régulation</b> pilote le fonctionnement normal : il coupe et relance le compresseur. Le <b>pressostat de sécurité</b> protège contre une pression anormale ; il n'est pas fait pour cycler en continu. Les confondre désactive une protection sans que ça se voie. Et avant toute intervention sur une vanne solénoïde, un thermostat ou un pressostat : <b>consignation électrique</b>, ce sont des organes électriques."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Sur une installation en régime stable (pas au démarrage, pas juste après un dégivrage), le voyant liquide laisse voir un défilé continu de bulles. Que faut-il en penser ?",
    "choix": [
     "Rien : c'est le fonctionnement normal d'un voyant liquide",
     "Le circuit manque probablement de fluide : une fuite est possible",
     "Le compresseur aspire trop de liquide",
     "Le dégivrage doit se déclencher"
    ],
    "bonne": 1,
    "explication": "En régime stable, un voyant liquide propre montre du liquide plein tube, sans bulle. Des bulles qui persistent trahissent un mélange liquide + vapeur, donc un manque de charge — souvent une fuite. Quelques bulles transitoires au démarrage ou après un dégivrage sont normales ; c'est leur persistance en régime stable qui doit alerter.",
    "remediation_vers": "g1d"
   },
   "criteres": [
    {
     "code": "1.05",
     "libelle": "Relier chaque organe courant du circuit à son rôle dans la prévention ou la détection d'une fuite",
     "etat": "a_evaluer",
     "officiel": "Connaître le fonctionnement élémentaire des composantes suivantes utilisées dans un système de réfrigération ainsi que leur rôle et leur importance dans la prévention et la détection des fuites de réfrigérant : a) valves (robinets à boule, diaphragmes, robinets à soupape) ; b) contrôles de la température et de la pression ; c) repères transparents et indicateurs d'humidité ; d) contrôles du dégivrage ; e) protecteurs du système ; f) instruments de mesure tels que les thermomètres ; g) systèmes de contrôle de l'huile ; h) réservoirs ; i) séparateurs de liquides et d'huile, en tenant compte des spécificités du fonctionnement comportant des réfrigérants hautement inflammables ou toxiques (hydrocarbures ou NH3) et des réfrigérants fonctionnant à haute pression (CO2)",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "g2a",
     "libelle": "Suite ▸ Quarante ans d'histoire : de l'ozone au climat"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g2a",
   "type": "cours",
   "titre": "Quarante ans d'histoire : de l'ozone au climat",
   "dc": "G2 · code 2.01",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/frise-histoire.svg\" alt=\"Frise : CFC années 1930, trou d'ozone 1985, Montréal 1987, Kyoto 1997, Paris 2015, Kigali 2016, F-Gas III 2024.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Dans les années 1930, les <b>CFC</b> sont des fluides « miracle » : stables, ni toxiques, ni inflammables. Cinquante ans plus tard, la facture arrive : en <b>1985</b>, on découvre le <b>trou dans la couche d'ozone</b> au-dessus de l'Antarctique — le chlore des CFC casse l'ozone qui filtre les <b>UV-B</b>. En <b>1987</b>, le <b>protocole de Montréal</b> organise leur sortie, puis celle des HCFC : la couche se répare, c'est le plus grand succès environnemental mondial.</p><p>Mais les remplaçants, les <b>HFC</b>, inoffensifs pour l'ozone, sont de puissants gaz à effet de serre. Le combat change de terrain : <b>Kyoto</b> (1997) les inscrit parmi les six gaz visés, l'<b>accord de Paris</b> (2015) fixe le cap des +1,5 °C, et l'<b>amendement de Kigali</b> (2016) fait entrer les HFC… dans le protocole de Montréal. En Europe, le règlement <b>F-Gas</b> traduit tout cela en quotas, interdictions et obligations — celles de ton métier.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "L'effet de serre en deux phrases",
     "html": "Le rayonnement solaire entre, la Terre renvoie de l'infrarouge, et certains gaz (CO₂, vapeur d'eau, méthane…) retiennent cette chaleur. Cet effet est <b>vital</b> — sans lui, il ferait environ <b>−18 °C</b> au lieu de +15 : c'est son <b>renforcement</b> par nos émissions qui pose problème."
    },
    {
     "type": "piege",
     "t": "Ozone et climat : deux problèmes, pas un",
     "html": "L'<b>ODP</b> mesure l'attaque de l'ozone (affaire de <b>chlore et de brome</b>) ; le <b>PRP</b> mesure l'effet de serre. Un HFC a un ODP <b>nul</b> et un PRP <b>énorme</b> : excellent élève d'un côté, cancre de l'autre. Ne jamais confondre les deux bulletins."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Pourquoi les HFC, qui ont sauvé la couche d'ozone, sont-ils aujourd'hui visés à leur tour ?",
    "choix": [
     "Parce qu'ils contiennent encore un peu de chlore",
     "Parce qu'ils sont de puissants gaz à effet de serre, malgré leur ODP nul",
     "Parce qu'ils sont tous très inflammables",
     "Parce qu'ils sont toxiques pour l'homme"
    ],
    "bonne": 1,
    "explication": "Zéro chlore : l'ozone est tranquille. Mais leur stabilité leur donne un fort pouvoir de réchauffement — d'où Kyoto, Kigali et le phase-down F-Gas. Le problème a changé de terrain, pas de molécules.",
    "remediation_vers": "g2a"
   },
   "criteres": [
    {
     "code": "2.01",
     "libelle": "Situer l'histoire : couche d'ozone, protocoles, politique climat",
     "etat": "a_evaluer",
     "officiel": "Avoir une connaissance élémentaire de la politique de l'UE et internationale en matière de changement climatique, y compris la convention-cadre des Nations unies sur les changements climatiques (CCNUCC) et le Protocole de Montréal relatif à des substances qui appauvrissent la couche d'ozone",
     "groupe": "G2",
     "groupe_titre": "Incidence sur l'environnement des réfrigérants et réglementations pertinentes en matière d'environnement",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "g2",
     "libelle": "Suite ▸ Le PRP et F-Gas aujourd'hui"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
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
    },
    {
     "t": "À toi : la carte d identité du fluide",
     "html": "<p style=\"margin:0 0 10px\">Choisis un fluide, entre une charge : les tonnes équivalent CO₂ se calculent. Compare deux fluides à charge égale — c est l exercice qui suit.</p><iframe src=\"packs/fluides/res/outils/fiche-fluide.html\" title=\"Carte d identité du fluide interactive\" style=\"width:100%;height:415px;border:0;background:#fff;border-radius:6px\" loading=\"lazy\"></iframe>"
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
     "etat": "a_evaluer",
     "officiel": "Avoir une connaissance élémentaire de la politique de l'UE et internationale en matière de changement climatique, y compris la convention-cadre des Nations unies sur les changements climatiques (CCNUCC) et le Protocole de Montréal relatif à des substances qui appauvrissent la couche d'ozone",
     "groupe": "G2",
     "groupe_titre": "Incidence sur l'environnement des réfrigérants et réglementations pertinentes en matière d'environnement",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "2.02",
     "libelle": "Expliquer le PRP et les obligations du règlement (UE) 2024/573",
     "etat": "a_evaluer",
     "officiel": "Avoir une connaissance élémentaire du concept de « potentiel de réchauffement planétaire » (PRP), de l'utilisation des gaz à effet de serre fluorés et d'autres substances en tant que fluides frigorigènes, de l'incidence des émissions de gaz à effet de serre fluorés sur le climat (ordre de grandeur de leur PRP) ainsi que des dispositions correspondantes du règlement (UE) n° 2024/573 et des actes d'exécution pertinents, de même que des menaces éventuelles pour l'environnement, y compris celles issues des produits de décomposition de certaines substances fluorées (PFAS) tels que les HFC, HFO et HCFO",
     "groupe": "G2",
     "groupe_titre": "Incidence sur l'environnement des réfrigérants et réglementations pertinentes en matière d'environnement",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
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
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
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
     "etat": "a_evaluer",
     "officiel": "Avoir une connaissance élémentaire du concept de « potentiel de réchauffement planétaire » (PRP), de l'utilisation des gaz à effet de serre fluorés et d'autres substances en tant que fluides frigorigènes, de l'incidence des émissions de gaz à effet de serre fluorés sur le climat (ordre de grandeur de leur PRP) ainsi que des dispositions correspondantes du règlement (UE) n° 2024/573 et des actes d'exécution pertinents, de même que des menaces éventuelles pour l'environnement, y compris celles issues des produits de décomposition de certaines substances fluorées (PFAS) tels que les HFC, HFO et HCFO",
     "groupe": "G2",
     "groupe_titre": "Incidence sur l'environnement des réfrigérants et réglementations pertinentes en matière d'environnement",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
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
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "g3",
   "type": "cours",
   "titre": "Contrôles avant mise en service",
   "dc": "G3 · codes 3.01 → 3.05",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/epreuve-azote.svg\" alt=\"Montage de l épreuve de pression : bouteille d azote, manifold, circuit — oxygène et air comprimé barrés.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Deux épreuves, deux buts, souvent enchaînées. L'<b>épreuve de résistance</b> vérifie que l'assemblage tient mécaniquement. L'<b>épreuve d'étanchéité</b> vérifie qu'il ne laisse rien passer. Les pressions d'épreuve se prennent <b>sur la documentation constructeur</b> et la norme applicable — jamais à l'estime.</p><p>Vient ensuite le <b>tirage au vide</b>. Il ne sert pas à « faire propre » : il extrait l'<b>air</b> (incondensable, qui fait monter la haute pression) et l'<b>humidité</b> (qui gèle au détendeur et attaque l'huile). Sous vide, l'eau bout à température ambiante — c'est exactement ce qu'on cherche.</p><p>Enfin, on <b>consigne</b> : registre et rapport d'essais font partie du geste professionnel.</p><p>Comment conclut-on l'épreuve d'étanchéité ? On relève la pression d'azote au <b>manomètre</b> (l'appareil qui mesure la pression) au début de l'essai, puis on attend la durée prévue — selon la documentation constructeur, à faire valider. Si la pression reste <b>stable</b> (ou « stabilisée ») pendant toute cette durée, le circuit est déclaré étanche. À l'inverse, une <b>chute de pression</b> signale une fuite quelque part dans le circuit, même si elle est minime.</p><p>Un piège classique : la température de l'atelier fait elle aussi varier la pression, sans qu'il y ait de fuite. Dans un circuit fermé, la pression de l'azote <b>augmente</b> un peu quand l'air ambiant se réchauffe, et <b>diminue</b> un peu quand il refroidit. On regarde donc la tendance sur toute la durée de l'épreuve, pas un seul chiffre isolé, et on corrige qualitativement une petite variation liée à la température avant de conclure trop vite à une fuite.</p>",
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
    },
    {
     "type": "cle",
     "t": "Localiser la fuite : l'eau savonneuse",
     "html": "<p>Si la pression chute, on cherche la fuite <b>raccord par raccord et brasure par brasure</b>, en badigeonnant de l'<b>eau savonneuse</b> au pinceau ou au pulvérisateur. Une <b>bulle</b> qui apparaît et grossit indique l'endroit exact de la fuite. Ce geste simple, sans appareil, vient <b>après</b> le contrôle de stabilité de la pression : il sert à localiser précisément une fuite déjà détectée.</p>"
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
     "etat": "a_evaluer",
     "officiel": "Effectuer une épreuve de pression pour contrôler la résistance du système",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "3.02",
     "libelle": "Réaliser une épreuve de pression d'étanchéité",
     "etat": "a_evaluer",
     "officiel": "Effectuer une épreuve de pression pour contrôler l'étanchéité du système",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "3.03",
     "libelle": "Utiliser une pompe à vide",
     "etat": "a_evaluer",
     "officiel": "Utiliser une pompe à vide",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "3.04",
     "libelle": "Faire le vide : évacuer l'air et l'humidité",
     "etat": "a_evaluer",
     "officiel": "Faire le vide dans le système pour évacuer l'air et l'humidité selon la pratique habituelle",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "3.05",
     "libelle": "Consigner le registre et rédiger le rapport d'essais",
     "etat": "a_evaluer",
     "officiel": "Consigner les données dans le registre de l'équipement et rédiger un rapport portant sur un ou plusieurs des essais et des contrôles effectués durant l'examen",
     "groupe": "G3",
     "groupe_titre": "Contrôles à effectuer préalablement à la mise en service d'un équipement, après une longue période d'interruption, après un entretien ou une réparation, ou contrôles durant le fonctionnement",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
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
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "g4a",
   "type": "cours",
   "titre": "Où fuit une installation ?",
   "dc": "G4 · codes 4.01 · 4.02 · 4.03",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/points-de-fuite.svg\" alt=\"Six familles de points de fuite repérées sur un circuit type.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Une fuite ne sort pas d'un tube plein. Elle sort d'un <b>point d'assemblage</b> ou d'une <b>pièce en mouvement</b> : raccords mécaniques (flare, à visser), brasures poreuses ou mal pénétrées, presse-étoupes de vannes, joints, raccords vissés des voyants, filtres et pressostats, et tout ce qui <b>vibre</b> — compresseur, tuyauteries mal fixées.</p><p>Avant de sortir le moindre instrument, on <b>lit le registre</b> : quelle charge, quel fluide, quelles fuites déjà détectées, qu'a-t-on réparé et quand. Un point déjà réparé est un point <b>à recontrôler en priorité</b>, pas un point clos.</p><p>Vient ensuite le <b>contrôle visuel et manuel</b>, sans électronique : traces d'huile (le fluide entraîne l'huile en fuyant), corrosion, givre anormal, serrage des raccords accessibles, état des fixations.</p><p><b>Actualité au 1er août 2026.</b> Le référentiel 2024/2215 cite encore le règlement (CE) n° 1516/2007 pour les compétences 4.03 à 4.07. Ce texte a été <b>abrogé le 23 juillet 2026</b> par le règlement 2026/1444, sans remplacement. Les distinctions directe et indirecte restent évaluées par le référentiel ; sur le terrain, la procédure actuelle du site, la notice et les consignes validées priment.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/etancheite-interactive/index.html?dossier=orienter\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🔎 Lancer le cours interactif : l’étanchéité — de l’indice à la preuve ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Un parcours très visuel commun à g4a, g4b et g4c : registre, points sensibles, méthodes indirecte et directe, détecteur et traçabilité.</span></p>",
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
     "etat": "a_evaluer",
     "officiel": "Connaître les points de fuite potentiels des équipements de réfrigération, de climatisation et de pompes à chaleur",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "4.02",
     "libelle": "Consulter et exploiter le registre avant le contrôle",
     "etat": "a_evaluer",
     "officiel": "Consulter le registre de l'équipement avant tout contrôle d'étanchéité et relever les informations pertinentes concernant des problèmes récurrents ou des parties problématiques du système nécessitant une attention particulière",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "4.03",
     "libelle": "Réaliser un contrôle visuel et manuel",
     "etat": "a_evaluer",
     "officiel": "Effectuer un contrôle visuel et manuel de tout le système au sens du règlement (CE) n° 1516/2007 de la Commission",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "E": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
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
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "g4b",
   "type": "cours",
   "titre": "Méthode indirecte — mesurer et interpréter",
   "dc": "G4 · codes 4.04 · 4.05",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/lecture-table.svg\" alt=\"La lecture croisée : manomètre + 1 bar, table de saturation du fluide, sonde de contact.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>La méthode indirecte <b>ne détecte pas la fuite</b> : elle détecte un <b>fonctionnement anormal</b> qui la trahit. On relève les <b>pressions</b> (BP et HP) au manomètre et les <b>températures</b> au thermomètre de contact, puis on compare à la <b>table de saturation</b> du fluide présent.</p><p>Une pression plus basse que la valeur théorique attendue, une <b>surchauffe</b> qui grimpe au-delà des 5 à 10 K habituels, un <b>sous-refroidissement</b> qui s'effondre sous les 4 à 8 K : autant d'indices convergents d'un manque de charge. Le multimètre complète le tableau (intensité absorbée, cohérence électrique).</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/etancheite-interactive/index.html?dossier=soupconner\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">📊 Ouvrir directement la méthode indirecte ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Illustrations, instruments à associer et enquête guidée : les mesures soupçonnent une fuite sans prétendre la localiser.</span></p>",
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
    },
    {
     "t": "À toi : refais la lecture croisée",
     "html": "<p style=\"margin:0 0 10px\">Reprends la réglette : pression relative, conversion en absolu, température de saturation, écart avec la mesure. Hors plage → on soupçonne.</p><iframe src=\"packs/fluides/res/outils/reglette.html\" title=\"Réglette pression-température interactive\" style=\"width:100%;height:445px;border:0;background:#fff;border-radius:6px\" loading=\"lazy\"></iframe>"
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
     "etat": "a_evaluer",
     "officiel": "Effectuer un contrôle de l'étanchéité du système au moyen d'une méthode indirecte conformément au règlement (CE) n° 1516/2007 et du manuel d'utilisation du système",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "E": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "4.05",
     "libelle": "Utiliser les instruments portables et interpréter les mesures",
     "etat": "a_evaluer",
     "officiel": "Utiliser des instruments de mesure portables tels que des manomètres, des thermomètres et des multimètres pour mesurer les volts, ampères et ohms en appliquant des méthodes indirectes de contrôle de l'étanchéité, et interpréter les paramètres mesurés",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "E": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "ressources": [
    "r-mollier",
    "r-tp-mano"
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
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "g4c",
   "type": "cours",
   "titre": "Méthode directe et consignation",
   "dc": "G4 · codes 4.06 · 4.07 · 4.08 · 4.09",
   "minuteur_s": 330,
   "corps": "<img src=\"packs/fluides/res/svg/balayage-detecteur.svg\" alt=\"La sonde du détecteur longe le raccord lentement ; une alerte se confirme par un second passage.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>La méthode directe <b>localise physiquement</b> la fuite. Pour la catégorie E, elle se pratique <b>sans accéder au circuit</b> : c'est le code <b>4.07</b>. Le code 4.06, qui suppose d'intervenir dans le circuit, n'est pas dans le champ de la catégorie E.</p><p>Le code <b>4.06</b> distingue les méthodes directes qui supposent d'<b>intervenir dans le circuit</b>. Le code <b>4.07</b> vise celles qui n'exigent pas cette intervention. Le référentiel 2024/2215 rattache encore ces mots au règlement 1516/2007, mais ce texte a été <b>abrogé le 23 juillet 2026</b> sans remplacement. La méthode réellement autorisée dépend donc de la procédure actuelle, de l'installation et du périmètre de certification.</p><p>Le <b>détecteur électronique</b> réagit à la présence de molécules de fluide dans l'air : on balaie la sonde <b>lentement</b>, le long des points repérés à l'étape visuelle. L'<b>eau savonneuse</b> localise par les bulles ; le <b>traceur UV</b> révèle les fuites intermittentes ou d'accès difficile. Sensibilité et étalonnage : selon doc constructeur, à faire valider.</p><p>Le code <b>4.09</b> exige de consigner le contrôle. On note : date, méthode, points contrôlés, résultat, et en cas de fuite la localisation précise et la suite donnée.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/etancheite-interactive/index.html?dossier=localiser\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🧪 Ouvrir directement la méthode directe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Détecteur illustré, choix de méthode, balayage ciblé, confirmation et passage final au registre.</span></p>",
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
     "code": "4.06",
     "libelle": "Mettre en œuvre une méthode directe en intervenant dans le circuit",
     "etat": "a_evaluer",
     "officiel": "Contrôler l'étanchéité du système au moyen d'une des méthodes directes visées au règlement (CE) n° 1516/2007",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "4.07",
     "libelle": "Mettre en œuvre la méthode directe sans intervenir dans le circuit",
     "etat": "a_evaluer",
     "officiel": "Contrôler l'étanchéité du système au moyen d'une des méthodes directes ne nécessitant pas d'intervenir dans le circuit de réfrigération et visées au règlement (CE) n° 1516/2007",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "E": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "4.08",
     "libelle": "Utiliser un détecteur électronique de fuites",
     "etat": "a_evaluer",
     "officiel": "Utiliser un dispositif électronique de détection des fuites",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "E": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "4.09",
     "libelle": "Consigner le contrôle dans le registre",
     "etat": "a_evaluer",
     "officiel": "Consigner les données dans le registre de l'équipement",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "ressources": [
    "r-cerfa"
   ],
   "liens": [
    {
     "vers": "x4",
     "libelle": "Suite ▸ Détective : le contrôle qui tourne mal"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "x4",
   "type": "exercice",
   "titre": "Détective — le contrôle qui tourne mal",
   "dc": "G4 · mise en situation · parcours E",
   "minuteur_s": 420,
   "corps": "<p>Contrôle périodique d'étanchéité chez un client. Le <b>registre</b> t'apprend qu'une fuite a été réparée il y a trois mois sur un raccord flare de la ligne liquide.</p><ul><li>Le contrôle visuel ne montre <b>rien</b> sur le raccord réparé.</li><li>Ton détecteur électronique <b>sonne</b> en passant près du condenseur — ventilateur en marche.</li><li>Sur la machine, la plaque indique un fluide différent de celui noté au registre l'an dernier.</li></ul>",
   "blocs": [
    {
     "type": "piege",
     "t": "Trois indices, trois réflexes",
     "html": "Un point réparé se <b>recontrôle en priorité</b>, même s'il semble propre. Une alerte détecteur près d'un ventilateur en marche <b>se confirme</b> brassage arrêté. Et une incohérence plaque/registre se <b>signale</b> — elle change la table de saturation à utiliser."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Le détecteur a sonné près du condenseur, ventilateur en marche. Quelle est la suite correcte ?",
    "choix": [
     "Consigner « fuite au condenseur » dans le registre",
     "Arrêter le ventilateur, refaire un passage lent, et recontrôler aussi le raccord réparé",
     "Resserrer tous les raccords du condenseur par précaution",
     "Ignorer l'alerte : l'air brassé fausse toujours le détecteur"
    ],
    "bonne": 1,
    "explication": "L'air brassé disperse le nuage de fluide : l'appareil peut sonner loin de la fuite réelle. On confirme ventilateur à l'arrêt, et le registre a déjà désigné le suspect n° 1 : le point réparé.",
    "remediation_vers": "g4c"
   },
   "criteres": [
    {
     "code": "4.02",
     "libelle": "Exploiter le registre pour orienter le contrôle",
     "etat": "a_evaluer",
     "officiel": "Consulter le registre de l'équipement avant tout contrôle d'étanchéité et relever les informations pertinentes concernant des problèmes récurrents ou des parties problématiques du système nécessitant une attention particulière",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "4.08",
     "libelle": "Utiliser le détecteur dans de bonnes conditions",
     "etat": "a_evaluer",
     "officiel": "Utiliser un dispositif électronique de détection des fuites",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "E": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "g5a",
     "libelle": "Suite ▸ Récupérer sans émettre"
    },
    {
     "vers": "g4a",
     "libelle": "↩ Revoir : où fuit une installation ?",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "g5a",
   "type": "cours",
   "titre": "Récupérer sans émettre",
   "dc": "G5 · codes 5.01 → 5.04",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/recuperation.svg\" alt=\"Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Chaque connexion et chaque déconnexion est un <b>point de fuite</b> : le geste est lent, contrôlé, flexibles purgés. Avant de récupérer, on <b>arrête et on isole</b> le système.</p><p>Le <b>groupe de récupération</b> transfère le fluide vers un cylindre prévu pour, en phase gazeuse ou liquide selon la situation. Le cylindre respecte un <b>taux de remplissage maximal</b> — jamais rempli à ras : le liquide se dilate avec la température, et un cylindre plein est un danger. On <b>pèse avant</b>, sinon on ne saura jamais combien on a réellement récupéré.</p><p>L'<b>huile</b> du compresseur est contaminée par nature : elle se récupère à part, comme un déchet dangereux. Elle ne se dégaze pas, elle ne se mélange pas au fluide.</p><p>Une fois le fluide récupéré, il reste un dernier geste : <b>vidanger l'huile</b> du compresseur. Cette huile garde du <b>fluide dissous</b> dedans. Ce fluide dissous continue à <b>dégazer</b> : il relâche lentement des vapeurs, même une fois l'huile sortie de la machine. On vide l'huile dans un <b>récipient fermé et étiqueté</b>, jamais dans un bidon ouvert. Sinon, ces vapeurs s'échappent : c'est une émission de plus, exactement comme une fuite.</p><p>On <b>note la quantité</b> d'huile vidangée, comme on pèse le fluide récupéré : sans cette trace, personne ne peut vérifier que rien n'a été perdu en route. L'huile contaminée part ensuite en <b>déchet dangereux</b>, avec son <b>bordereau</b> — le document qui suit le déchet jusqu'à son traitement final.</p>",
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
    },
    {
     "type": "cle",
     "t": "Vider l'huile : le bon ordre",
     "html": "<p>On vide l'huile <b>après</b> avoir récupéré le fluide, jamais avant : sinon on relâche dans l'air du fluide encore dissous dedans, sans même le mesurer. Récipient fermé et étiqueté, quantité notée, déchet dangereux avec bordereau — c'est le geste complet de la vidange.</p>"
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
     "etat": "a_evaluer",
     "officiel": "Connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.02",
     "libelle": "Vider et remplir un cylindre, en phase liquide et gazeuse",
     "etat": "a_evaluer",
     "officiel": "Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état gazeux",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.03",
     "libelle": "Utiliser un dispositif de récupération",
     "etat": "a_evaluer",
     "officiel": "Utiliser un dispositif de récupération des réfrigérants et connecter et déconnecter ce dispositif en produisant le minimum d'émissions",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.04",
     "libelle": "Vidanger l'huile contaminée",
     "etat": "a_evaluer",
     "officiel": "Vider l'huile contaminée par le réfrigérant d'un système",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "ressources": [
    "r-tp-peser"
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
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "g5b",
   "type": "cours",
   "titre": "Peser, charger, stocker, tracer",
   "dc": "G5 · codes 5.05 → 5.09",
   "minuteur_s": 330,
   "corps": "<img src=\"packs/fluides/res/svg/recuperation.svg\" alt=\"Rappel du montage : la bouteille se pèse avant, ne se remplit jamais à ras, ne mélange jamais deux fluides.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Pour charger, on détermine d'abord l'<b>état du fluide</b> et la <b>quantité prévue</b> (plaque signalétique, doc constructeur). La charge se contrôle à la <b>balance</b>, jamais « au manomètre » : le manomètre dit comment la machine se comporte, la balance dit combien on a mis.</p><p>Cas particulier des <b>mélanges zéotropes</b> : ils se chargent en <b>phase liquide</b>, faute de quoi les composants se séparent et la composition du circuit dérive.</p><p>L'<b>huile</b> suit le fluide, et elle en dépend. Les anciens fluides chlorés travaillaient avec de l'huile <b>minérale</b> ; les HFC et les HFO demandent une huile de synthèse, le plus souvent <b>polyolester (POE)</b>. Les deux ne se mélangent pas : sur un changement de fluide, l'huile se change aussi — c'est ce qui distingue un <b>retrofit</b> d'un simple drop-in. La POE <b>absorbe l'humidité de l'air</b> très vite : bidon refermé aussitôt, circuit jamais laissé ouvert. Le type exact d'huile se lit sur la <b>plaque ou la doc constructeur</b>, jamais au jugé.</p><p>Une huile retirée d'un circuit est <b>contaminée</b> : elle contient du fluide dissous. Elle ne se jette pas, elle part en <b>déchet dangereux</b> vers une filière agréée, avec son bordereau. Pour les <b>hydrocarbures</b>, fluide et huile sont en plus <b>inflammables</b> : récipients adaptés et fermés, à l'écart de toute source de chaleur ou d'étincelle, transport selon la réglementation applicable et la fiche de données de sécurité.</p><p>Le <b>registre</b> est la preuve légale de toute opération sur le fluide : quantité ajoutée, quantité récupérée, date, intervenant. Le rejet volontaire à l'atmosphère est strictement interdit et sanctionné.</p><p>Avant de charger, on regarde aussi dans quelle <b>condition</b> se trouve le fluide, en plus de savoir s'il est liquide ou gazeux. À une pression donnée, le fluide peut être <b>saturé</b> : le liquide et la vapeur sont présents ensemble, à la température de changement d'état. Il peut être <b>sous-refroidi</b> : c'est un liquide plus froid que sa température de saturation, donc sans aucune vapeur mélangée. Il peut être <b>surchauffé</b> : c'est une vapeur plus chaude que sa température de saturation, donc sans aucune goutte de liquide. Cette condition guide la méthode de remplissage : on ne prélève pas de la même façon un liquide sous-refroidi, pris en bas de la bouteille, et une vapeur surchauffée, prise en haut.</p><p>Un fluide récupéré n'est pas forcément perdu : il a trois devenirs possibles. La <b>réutilisation</b> (ou réemploi) : le fluide récupéré est rechargé tel quel, sans retraitement, dans la machine d'où il vient, chez le même détenteur (celui qui possède ou utilise l'installation). Le <b>recyclage</b> : le fluide subit un nettoyage de base, comme une filtration et un séchage. La <b>régénération</b> : un retraitement complet, réalisé en filière spécialisée, qui redonne au fluide les caractéristiques du fluide neuf. Un fluide régénéré <b>s'achète</b> : on ne le régénère jamais soi-même à l'atelier.</p>",
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
    },
    {
     "type": "piege",
     "t": "Réemploi n'est pas retraitement",
     "html": "On pourrait croire qu'un fluide récupéré doit toujours passer par le recyclage ou la régénération avant de resservir. C'est faux : réutiliser le fluide récupéré sur <b>sa machine d'origine</b>, chez le <b>même détenteur</b> (celui qui possède ou utilise cette machine), est légal et ne demande aucun retraitement."
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
     "etat": "a_evaluer",
     "officiel": "Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, saturé ou surchauffé) d'un réfrigérant avant tout remplissage afin de choisir la méthode et le volume de remplissage les plus adaptés. Remplir le système de réfrigérant (à l'état liquide et gazeux) sans provoquer de pertes",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.06",
     "libelle": "Choisir la balance adaptée et peser",
     "etat": "a_evaluer",
     "officiel": "Choisir le bon type de balance et l'utiliser pour peser le réfrigérant",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.07",
     "libelle": "Consigner l'opération dans le registre",
     "etat": "a_evaluer",
     "officiel": "Consigner dans le registre de l'équipement toutes les informations pertinentes concernant le réfrigérant récupéré ou ajouté",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.08",
     "libelle": "Appliquer les prescriptions de gestion, stockage et transport",
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions et les procédures de gestion, de réutilisation, de récupération, de stockage et de transport des réfrigérants et huiles fluorés, y compris lorsqu'ils sont contaminés",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.09",
     "libelle": "Gérer les hydrocarbures et leurs huiles, y compris contaminés",
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions et les procédures de gestion, de remplissage, de récupération, de stockage et de transport des hydrocarbures et des huiles, y compris lorsqu'ils sont contaminés, ainsi que d'installation d'équipements et de systèmes tributaires des hydrocarbures",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "ressources": [
    "r-tp-peser",
    "r-cerfa"
   ],
   "liens": [
    {
     "vers": "x3",
     "libelle": "Suite ▸ Détective : la bouteille de récupération"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "x3",
   "type": "exercice",
   "titre": "Détective — la bouteille de récupération",
   "dc": "G5 · mise en situation · parcours D",
   "minuteur_s": 420,
   "corps": "<p>Récupération sur une chambre froide avant remplacement d'un composant. Tu as pesé la bouteille <b>avant</b> de commencer — bon réflexe. La récupération avance, et la balance approche du <b>niveau maximal admissible</b> de la bouteille… mais il reste visiblement du fluide dans le circuit.</p><p>Sur l'étagère du fourgon : une bouteille de récupération <b>vide</b>, et une bouteille <b>entamée</b> qui contient déjà un autre fluide.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Ce qui ne se négocie pas",
     "html": "Le taux de remplissage maximal protège contre la <b>dilatation du liquide</b> : dépassé, la bouteille devient dangereuse à la première montée en température. Et un mélange de fluides est <b>impossible à recycler ou régénérer</b> : il part en destruction."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "La bouteille atteint son niveau maximal et il reste du fluide à récupérer. Que fais-tu ?",
    "choix": [
     "Je complète un peu au-delà du niveau : quelques centaines de grammes ne changent rien",
     "Je bascule sur la bouteille vide, et je pèse celle-ci avant de continuer",
     "Je termine dans la bouteille entamée de l'autre fluide, elle a de la place",
     "J'arrête là : le fluide restant peut rester dans le circuit ouvert"
    ],
    "bonne": 1,
    "explication": "On change de bouteille, on pèse la nouvelle avant, et on continue. Dépasser le niveau est un risque mécanique réel ; mélanger deux fluides condamne le lot ; laisser du fluide dans un circuit qu'on va ouvrir finit à l'atmosphère.",
    "remediation_vers": "g5a"
   },
   "criteres": [
    {
     "code": "5.02",
     "libelle": "Gérer le remplissage des cylindres en sécurité",
     "etat": "a_evaluer",
     "officiel": "Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état gazeux",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "5.06",
     "libelle": "Peser à chaque étape",
     "etat": "a_evaluer",
     "officiel": "Choisir le bon type de balance et l'utiliser pour peser le réfrigérant",
     "groupe": "G5",
     "groupe_titre": "Gestion écologique du système et du réfrigérant lors de l'installation, de la maintenance, de l'entretien ou de la récupération",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "D": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "g6",
     "libelle": "Suite ▸ Le compresseur"
    },
    {
     "vers": "g5a",
     "libelle": "↩ Revoir : récupérer sans émettre",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2",
    "D"
   ]
  },
  {
   "id": "g6",
   "type": "cours",
   "titre": "Le compresseur",
   "dc": "G6 · codes 6.01 · 6.03 · 6.05 · 6.07",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/compresseurs.svg\" alt=\"Coupe animée d un compresseur à piston et les quatre technologies : piston, scroll, vis, rotatif.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le compresseur est le <b>seul organe actif</b> du cycle : il aspire la vapeur basse pression et la refoule en haute pression. Tout le reste est passif.</p><p>Ses points de fuite privilégiés : <b>raccords, vannes de service, presse-étoupe, bornes de traversée</b> sur les hermétiques. Ses sécurités — pressostats HP et BP, protection thermique — se règlent <b>selon la fiche constructeur</b>, jamais à l'estime.</p><p>L'<b>huile</b> lubrifie, refroidit et assure l'étanchéité interne. Elle circule avec le fluide et doit <b>revenir</b> : un retour d'huile défaillant est une cause fréquente de panne prématurée, et souvent le premier signe visible d'un problème de conception des lignes.</p><p>On distingue plusieurs <b>types</b> de compresseur, selon la façon dont la vapeur est comprimée. Le compresseur à <b>piston</b> comprime par un mouvement de va-et-vient, comme une pompe à vélo. Le compresseur <b>scroll</b> (deux spirales imbriquées, une fixe et une mobile qui tourne à l'intérieur) comprime en continu, sans à-coups : c'est la technologie la plus répandue en climatisation. Le compresseur à <b>vis</b> comprime la vapeur entre deux rotors qui s'engrènent ; on le trouve sur les grosses puissances.</p><p>Il existe aussi trois <b>architectures</b>, selon la manière dont le moteur électrique entraîne le compresseur. En <b>hermétique</b>, le moteur et le compresseur sont enfermés ensemble dans une coque soudée : aucun arbre ne sort à l'extérieur, donc aucune fuite possible à cet endroit, mais la coque ne s'ouvre pas et le compresseur n'est pas réparable. En <b>semi-hermétique</b>, la coque est boulonnée : on peut l'ouvrir pour intervenir à l'intérieur, en refaisant les joints au remontage. En <b>ouvert</b>, le moteur est séparé du compresseur et l'entraîne par un arbre qui traverse la coque de part en part ; cet arbre passe par une <b>garniture</b> (un joint tournant), qui est un point de fuite classique à surveiller sur ce type de machine.</p><p>Pour vérifier que le retour d'huile fonctionne bien, on contrôle le <b>niveau d'huile</b> au <b>voyant d'huile</b> : un petit hublot placé sur le carter du compresseur. On regarde ce voyant <b>machine en marche stabilisée</b> (après quelques minutes de fonctionnement, pas juste au démarrage) : le niveau doit rester visible dans la zone du voyant, sans descendre en dessous. La zone exacte à respecter est donnée par la <b>documentation constructeur</b>, à faire valider avant de conclure sur un manque ou un excès d'huile.</p><p>Après toute intervention sur un compresseur, on rédige un <b>rapport</b>. Il rassemble trois choses : ce qu'on a <b>observé</b> (bruits anormaux, niveau d'huile au voyant, valeurs relevées comme les pressions ou la température de refoulement), ce qu'on a <b>fait</b> (pièce changée, réglage effectué, essai réalisé), et tout <b>problème restant</b> qui pourrait, plus tard, entraîner une panne ou une fuite. Ce rapport est <b>daté et signé</b> : c'est ce qui permet au prochain intervenant de savoir où en est la machine, sans tout redécouvrir.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/circuit-organe-par-organe/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🔧 Lancer le cours interactif : le circuit, organe par organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">La croix du frigoriste, chaque organe en fiche animée (piston, scroll et vis compris), les serpentins du condenseur et de l'évaporateur, la régulation du détendeur, l'exercice « suivez le fluide », la bibliothèque des 10 organes et un défi final de 10 questions.</span></p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/tome-3-technologie-organes/index.html?dossier=compresseurs\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">les quatre technologies de compression — piston, scroll, vis et rotatif — chacune en vue isolée, avec son symbole normalisé et son fonctionnement interne animé.</span></p>",
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
    },
    {
     "type": "cle",
     "t": "À quoi sert le rapport",
     "html": "Un <b>rapport</b> n'est pas une formalité administrative : c'est la mémoire de la machine. Un problème noté mais non résolu (par exemple un bruit anormal ou une trace d'huile suspecte) doit être signalé dans le rapport même s'il n'empêche pas la machine de tourner aujourd'hui."
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
     "etat": "a_evaluer",
     "officiel": "Expliquer le principe de fonctionnement d'un compresseur (y compris le réglage de la puissance et le circuit de lubrification) et les risques de fuite ou d'émission de réfrigérant qui y sont liés",
     "groupe": "G6",
     "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "6.03",
     "libelle": "Régler les interrupteurs de sécurité et de contrôle",
     "etat": "a_evaluer",
     "officiel": "Régler les interrupteurs de sécurité et de contrôle",
     "groupe": "G6",
     "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "6.05",
     "libelle": "Vérifier le retour d'huile",
     "etat": "a_evaluer",
     "officiel": "Vérifier le circuit de retour de l'huile",
     "groupe": "G6",
     "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "6.07",
     "libelle": "Rédiger un rapport d'état",
     "etat": "a_evaluer",
     "officiel": "Rédiger un rapport sur l'état du compresseur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
     "groupe": "G6",
     "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": true
    }
   ],
   "ressources": [
    "r-module-comp",
    "r-scroll",
    "r-kp1"
   ],
   "liens": [
    {
     "vers": "g6b",
     "libelle": "Suite ▸ Compresseur — installer, régler, vérifier"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g6b",
   "type": "cours",
   "titre": "Compresseur — installer, régler, vérifier",
   "dc": "G6 · codes 6.02 · 6.04 · 6.06 · 6.08",
   "minuteur_s": 330,
   "corps": "<img src=\"packs/fluides/res/svg/compresseurs.svg\" alt=\"Compresseur en coupe : soupape d'aspiration, cylindre, sortie vers le refoulement.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Ce cours prolonge la fiche sur le compresseur. Il explique le geste : comment on l'<b>installe</b>, comment on <b>règle</b> ses soupapes, comment on le <b>démarre</b>, l'<b>arrête</b> et le <b>contrôle</b>.</p><p>Une fois en marche, l'installation ne doit provoquer <b>aucune fuite</b>. Avant la toute première mise en service, on teste l'étanchéité de tout le circuit à l'<b>azote</b> — jamais à l'oxygène, jamais à l'air comprimé — à la pression indiquée par la norme applicable. Les appareils de contrôle et de sécurité (ils surveillent le compresseur et le coupent en cas d'anomalie) s'installent <b>en même temps</b> que lui, pas après coup.</p><p>La <b>soupape d'aspiration</b> est le clapet qui laisse entrer la vapeur basse pression dans le compresseur à chaque cycle. Son réglage suit <b>toujours</b> la fiche constructeur : une soupape mal réglée fait perdre de la puissance, ou abîme le compresseur.</p><p>Au <b>démarrage</b>, on vérifie le niveau d'huile et les vannes, puis on met sous tension. Pendant que le compresseur tourne, on relève les pressions, la <b>surchauffe</b> (repère : 5 à 10 K) et le <b>sous-refroidissement</b> (repère : 4 à 8 K). À l'<b>arrêt</b>, on suit la procédure inverse, sans geste brusque.</p><p>Ces bons gestes sont aussi des gestes d'<b>efficacité énergétique</b> : un compresseur bien installé, bien réglé et bien entretenu consomme moins et dure plus longtemps.</p><p>Le compresseur ne se pose jamais directement sur son châssis ou sur le sol. On le fixe sur des <b>plots antivibratiles</b> (des « silent-blocs ») : des cales en caoutchouc qui absorbent les vibrations pendant qu'il tourne. Sans eux, la vibration se transmet à toute la tuyauterie qui y est raccordée. Une tuyauterie qui vibre en permanence, ou montée en contrainte (tordue pour rejoindre un piquage), finit tôt ou tard par se fissurer : c'est une cause classique de fuite, qu'on évite dès l'installation.</p><p>Le compresseur porte aussi des <b>vannes de service</b>, une côté aspiration et une côté refoulement. Elles ont plusieurs positions : <b>ouverte en arrière</b> pour le fonctionnement normal, une <b>position intermédiaire</b> qui permet de brancher un manomètre sans isoler le compresseur, et <b>fermée</b> pour le couper complètement du reste du circuit, par exemple avant une intervention. On manœuvre chaque vanne selon la documentation constructeur : le nombre de tours et le sens de manœuvre ne sont pas les mêmes d'un modèle à l'autre.</p><p>Au démarrage, on ne se contente pas de regarder le compresseur tourner : on <b>mesure</b>. On relève l'<b>intensité</b> absorbée par le moteur (le courant électrique qu'il consomme) et on la compare à la valeur inscrite sur la <b>plaque signalétique</b> du compresseur — jamais à un chiffre appris par cœur ou approximatif. Une intensité trop haute annonce un défaut (moteur qui force, réglage à revoir). On vérifie en même temps que les pressions se stabilisent dans les plages attendues, toujours selon la documentation constructeur.</p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Le test qui doit précéder la mise en service",
     "html": "Avant de mettre un compresseur neuf sous tension, on vérifie que le circuit ne fuit pas, avec un essai à l'<b>azote</b>. Ce n'est qu'après ce contrôle que l'installation répond au code 6.02 : « aucune fuite ni aucune émission »."
    },
    {
     "type": "piege",
     "t": "Geste interdit",
     "html": "<b>Consignation électrique</b> (couper et verrouiller l'alimentation) avant toute intervention sur les soupapes ou les sécurités. Un réglage de soupape ne s'improvise jamais : toujours <b>selon la fiche constructeur</b>, jamais « à l'oreille »."
    },
    {
     "type": "cle",
     "t": "La valeur plaque, jamais un chiffre inventé",
     "html": "<p>Pour juger si un compresseur fonctionne normalement, on compare toujours ce qu'on mesure (intensité, pression) à la <b>valeur plaque</b> : celle inscrite sur la plaque signalétique de l'appareil, ou celle donnée par la documentation constructeur. On ne compare jamais à un chiffre retenu de mémoire ou à vue de nez : chaque compresseur a ses propres valeurs de référence.</p>"
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Un compresseur vient d'être installé. Avant sa toute première mise en marche, que fait-on ?",
    "choix": [
     "On le met sous tension : les défauts se verront bien à l'usage",
     "On teste l'étanchéité de tout le circuit à l'azote",
     "On règle les soupapes d'aspiration au jugé, puis on ajuste en marche",
     "On vérifie seulement le sens de rotation du moteur"
    ],
    "bonne": 1,
    "explication": "Une installation correcte (code 6.02) ne doit provoquer aucune fuite une fois en marche. Le seul moyen de le vérifier avant la mise en service est un essai d'étanchéité à l'azote sur tout le circuit — jamais à l'oxygène, jamais à l'air comprimé.",
    "remediation_vers": "g6b"
   },
   "criteres": [
    {
     "code": "6.02",
     "libelle": "Installer un compresseur et ses sécurités sans provoquer de fuite",
     "etat": "a_evaluer",
     "officiel": "Installer correctement un compresseur, y compris le matériel de contrôle et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produisent une fois le système en fonctionnement",
     "groupe": "G6",
     "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "6.04",
     "libelle": "Régler les soupapes d'aspiration selon la fiche constructeur",
     "etat": "a_evaluer",
     "officiel": "Régler les soupapes d'aspiration",
     "groupe": "G6",
     "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
     "epreuve": {
      "A1": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "6.06",
     "libelle": "Démarrer, arrêter et contrôler un compresseur par la mesure",
     "etat": "a_evaluer",
     "officiel": "Mettre en marche et arrêter un compresseur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
     "groupe": "G6",
     "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "6.08",
     "libelle": "Connaître les leviers d'efficacité énergétique du compresseur",
     "etat": "a_evaluer",
     "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance des compresseurs",
     "groupe": "G6",
     "groupe_titre": "Composant : installation, mise en service et maintenance de compresseurs à piston alternatif, à vis et à spirales, à un ou deux étages",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": true
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
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g7",
   "type": "cours",
   "titre": "Le condenseur",
   "dc": "G7 · codes 7.01 · 7.04 · 7.06 · 7.08",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/echangeur-air.svg\" alt=\"Le condenseur à air : l air ambiant traverse la batterie poussé par le ventilateur et ressort réchauffé.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le condenseur <b>évacue vers l'extérieur</b> la chaleur prise dans l'évaporateur, plus celle apportée par la compression. La vapeur haute pression s'y refroidit, se liquéfie, puis se <b>sous-refroidit</b> : <b>4 à 8 K</b> en sortie, pour garantir du liquide pur au détendeur.</p><p>Sur un condenseur à air, les <b>ventilateurs</b> forcent l'air à travers la batterie. Une batterie encrassée, un ventilateur à l'arrêt, et la haute pression monte : la machine consomme plus, et le pressostat HP finit par couper.</p><p>Les <b>incondensables</b> (air entré lors d'une intervention mal faite) se purgent <b>à l'arrêt</b>, installation froide, avec récupération — jamais fluide en mouvement.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/circuit-organe-par-organe/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🔧 Lancer le cours interactif : le circuit, organe par organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">La croix du frigoriste, chaque organe en fiche animée (piston, scroll et vis compris), les serpentins du condenseur et de l'évaporateur, la régulation du détendeur, l'exercice « suivez le fluide », la bibliothèque des 10 organes et un défi final de 10 questions.</span></p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/tome-3-technologie-organes/index.html?dossier=condenseurs\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">le condenseur à air et le condenseur à eau, leur place sur la croix du frigoriste, et ce qui entre et sort de chacun.</span></p>",
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
     "etat": "a_evaluer",
     "officiel": "Expliquer le principe de fonctionnement d'un condenseur et les risques de fuite qui y sont associés",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "7.04",
     "libelle": "Régler les interrupteurs de sécurité et de contrôle",
     "etat": "a_evaluer",
     "officiel": "Régler les interrupteurs de sécurité et de contrôle",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "7.06",
     "libelle": "Purger les incondensables",
     "etat": "a_evaluer",
     "officiel": "Extraire les gaz non condensables du condenseur à l'aide d'un appareil de purge pour système de réfrigération",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "7.08",
     "libelle": "Inspecter la surface d'échange",
     "etat": "a_evaluer",
     "officiel": "Inspecter la surface du condenseur",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    }
   ],
   "ressources": [
    "r-kp5",
    "r-echangeurs"
   ],
   "liens": [
    {
     "vers": "g7b",
     "libelle": "Suite ▸ Condenseur — installer, régler, vérifier"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g7b",
   "type": "cours",
   "titre": "Condenseur — installer, régler, vérifier",
   "dc": "G7 · codes 7.02 · 7.03 · 7.05 · 7.07 · 7.09 · 7.10",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/echangeur-air.svg\" alt=\"Schéma d'un condenseur à air, unité extérieure.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le <b>condenseur</b> transforme le gaz chaud venu du compresseur en <b>liquide</b>. Il rejette la chaleur du local vers l'air extérieur. Sur un climatiseur split, il se trouve dans l'<b>unité extérieure</b>, la partie posée dehors.</p><p>Sur la croix du frigoriste, le condenseur est toujours en <b>haut</b> : le compresseur à droite, le détendeur à gauche, l'évaporateur en bas.</p><p>C'est un condenseur <b>à air</b> : un ventilateur souffle sur des <b>ailettes</b>, de petites lames en métal qui évacuent la chaleur. Il n'y a jamais de tour de refroidissement sur ce type d'appareil.</p><p>Installer, régler et vérifier un condenseur, c'est protéger tout le circuit contre les <b>fuites</b>, dès le premier jour et pendant toute sa vie.</p><img src=\"packs/fluides/res/svg/regulateurs-pression.svg\" alt=\"Les trois régulateurs de pression situés sur le circuit : en sortie de condenseur, en sortie d'évaporateur, et sur l'aspiration juste avant le compresseur.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Un organe mérite qu'on s'y arrête, parce que le référentiel le demande nommément : le <b>régulateur de pression de sortie du condenseur</b>. Sur le terrain, on l'appelle couramment un <b>KVR</b> — c'est une référence commerciale, pas le nom de la fonction.</p><p>À quoi sert-il ? Quand il fait <b>froid dehors</b>, le condenseur évacue la chaleur trop facilement et la haute pression descend. Or le <b>détendeur</b> a besoin d'un écart de pression suffisant entre l'entrée et la sortie pour alimenter correctement l'évaporateur. Si la haute pression tombe trop bas, cet écart disparaît, le détendeur n'alimente plus, et l'installation ne fait plus de froid alors que rien n'est cassé. Le régulateur <b>retient</b> la pression de condensation au-dessus d'une valeur réglée : c'est tout son rôle.</p><p>Il ne faut le confondre avec aucun des deux autres régulateurs du circuit. Celui-ci agit sur la <b>haute</b> pression, en sortie de condenseur. Les deux autres — pression d'évaporation et pression de carter — agissent du côté <b>basse</b> pression, et se voient à la fiche de l'évaporateur.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/condenseur-interactif/index.html?dossier=observer\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🌬 Lancer le cours interactif : condenseur — installer, régler, vérifier ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Batterie que l’on encrasse, ventilation que l’on coupe, pression de condensation qualitative, installation, régulateur, inspection, rapport et cinq contrôles.</span></p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Bien installer l'unité extérieure",
     "html": "L'unité extérieure se fixe <b>solidement et de niveau</b>, avec de l'espace autour pour que l'air circule. Le matériel de réglage et de sécurité — pressostats, vannes — doit être en place et accessible. Avant la mise en service, on contrôle l'étanchéité du circuit sous <b>azote</b> (un gaz neutre) — jamais à l'oxygène, jamais à l'air comprimé. Tous les raccords sont vérifiés : zéro fuite dès le démarrage."
    },
    {
     "type": "cle",
     "t": "Régler le régulateur de pression",
     "html": "Le régulateur de pression de sortie du condenseur maintient une pression de condensation correcte, même par temps froid. Il se règle <b>selon la fiche constructeur</b>, jamais à l'estime."
    },
    {
     "type": "piege",
     "t": "Un régulateur ne coupe rien",
     "html": "Le <b>pressostat HP</b> est une sécurité : il <b>coupe</b> l'alimentation électrique du compresseur quand la pression devient dangereuse. Le <b>régulateur de pression de condensation</b> ne coupe rien du tout : c'est une vanne, elle <b>maintient</b> une pression. Deux organes, deux fonctions, deux réglages — et l'un ne remplace jamais l'autre."
    },
    {
     "type": "piege",
     "t": "Avant de toucher aux conduites",
     "html": "La conduite de <b>refoulement</b> (le tube de gaz chaud entre le compresseur et le condenseur) et la conduite de <b>liquide</b> (juste après le condenseur) s'inspectent après une <b>consignation électrique</b> systématique : couper puis verrouiller l'alimentation. On cherche des traces d'huile, de la corrosion, un isolant abîmé."
    },
    {
     "type": "cle",
     "t": "Démarrer, mesurer, arrêter",
     "html": "Au démarrage, le ventilateur tourne et la pression monte normalement. En fonctionnement, on mesure le <b>sous-refroidissement</b> (entre 4 et 8 K) : hors de cette plage, il signale un défaut de charge. À l'arrêt, on respecte <b>l'ordre donné par la fiche constructeur</b>."
    },
    {
     "type": "cle",
     "t": "Rédiger le rapport d'état",
     "html": "Chaque visite se termine par un <b>rapport écrit</b> : ailettes encrassées, ventilateur bruyant, trace d'huile, pression anormale. Un problème noté tôt évite une fuite demain."
    },
    {
     "type": "cle",
     "t": "Entretenir pour économiser l'énergie",
     "html": "Des <b>ailettes propres</b> et un ventilateur en bon état font consommer moins d'électricité. Un condenseur encrassé fait travailler le compresseur plus fort pour le même résultat."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Avant d'inspecter les conduites de refoulement et de liquide d'un condenseur, que doit-on faire en premier ?",
    "choix": [
     "Ouvrir le circuit à l'air comprimé",
     "Faire une consignation électrique",
     "Démonter le ventilateur",
     "Régler le régulateur de pression"
    ],
    "bonne": 1,
    "explication": "On coupe puis on verrouille l'alimentation électrique avant de toucher aux conduites. Cela évite qu'un ventilateur ou un compresseur redémarre pendant l'inspection.",
    "remediation_vers": "g7b"
   },
   "criteres": [
    {
     "code": "7.02",
     "libelle": "Régler le régulateur de pression du condenseur",
     "etat": "a_evaluer",
     "officiel": "Mettre au point le régulateur de pression de sortie du condenseur",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "7.03",
     "libelle": "Installer un condenseur sans risque de fuite",
     "etat": "a_evaluer",
     "officiel": "Installer correctement un condenseur/une unité extérieure y compris le matériel de réglage et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produise une fois que le système fonctionnera",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "7.05",
     "libelle": "Inspecter les conduites de refoulement et de liquide",
     "etat": "a_evaluer",
     "officiel": "Inspecter les conduites de refoulement et de liquide",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "7.07",
     "libelle": "Démarrer, mesurer et arrêter un condenseur",
     "etat": "a_evaluer",
     "officiel": "Mettre en marche et arrêter un condenseur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "7.09",
     "libelle": "Rédiger un rapport d'état du condenseur",
     "etat": "a_evaluer",
     "officiel": "Rédiger un rapport sur l'état du condenseur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "7.10",
     "libelle": "Entretenir un condenseur pour économiser l'énergie",
     "etat": "a_evaluer",
     "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance des condenseurs",
     "groupe": "G7",
     "groupe_titre": "Composant : installation, mise en service et maintenance de condenseurs à air froid et à eau froide",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": true
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
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g8",
   "type": "cours",
   "titre": "L'évaporateur",
   "dc": "G8 · codes 8.01 · 8.05 · 8.08 · 8.09",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/mesure-surchauffe.svg\" alt=\"La surchauffe se mesure en deux points : manomètre BP vers la table, sonde de contact sur le tube.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>C'est le point <b>froid</b> du circuit : le fluide y absorbe la chaleur du milieu à refroidir et se vaporise. En sortie, il doit être <b>entièrement vapeur</b>, avec une <b>surchauffe de 5 à 10 K</b> — c'est ce qui protège le compresseur du coup de liquide.</p><p>Le <b>givre</b> est normal en froid négatif ; installé durablement, il isole la batterie et fait chuter l'échange. D'où les cycles de <b>dégivrage</b> (air, résistance électrique, gaz chauds). Un évaporateur qui givre <b>complètement</b> en fonctionnement signale d'abord un problème de <b>débit d'air</b> : filtre encrassé, ventilateur arrêté.</p><p>Points de vigilance propres : corrosion, condensats, et le <b>bac</b> — une fuite peut s'y dissimuler sous l'eau de dégivrage.</p><p>La conduite d'<b>aspiration</b> relie l'évaporateur au compresseur. Elle transporte le fluide en vapeur, mais cette vapeur emporte toujours un peu d'<b>huile</b>, celle qui lubrifie le compresseur. Pour que l'huile revienne avec le gaz, on pose cette conduite en légère <b>pente</b>, inclinée vers le compresseur. Ainsi, l'huile glisse avec le fluide au lieu de stagner dans un creux du tube.</p><p>Parfois, le tracé oblige la conduite d'aspiration à remonter. Par exemple, le compresseur est placé plus haut que l'évaporateur. Dans ce cas, la pente seule ne suffit plus : au ralenti, le gaz n'a pas toujours assez de vitesse pour porter l'huile vers le haut. On pose alors un <b>siphon</b> en pied de cette colonne montante. C'est un petit coude en U qui retient un peu d'huile le temps qu'elle s'accumule. Puis il la relance d'un coup vers le haut, dès que le gaz reprend de la vitesse.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/circuit-organe-par-organe/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🔧 Lancer le cours interactif : le circuit, organe par organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">La croix du frigoriste, chaque organe en fiche animée (piston, scroll et vis compris), les serpentins du condenseur et de l'évaporateur, la régulation du détendeur, l'exercice « suivez le fluide », la bibliothèque des 10 organes et un défi final de 10 questions.</span></p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/tome-3-technologie-organes/index.html?dossier=evaporateurs\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">l'évaporateur à air et à eau, l'état du fluide à l'entrée et à la sortie, et le montage habituel.</span></p>",
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
    },
    {
     "type": "piege",
     "t": "Conduite mal posée = huile piégée",
     "html": "<p>Une conduite d'aspiration posée à plat, en contre-pente, ou une colonne montante sans <b>siphon</b> : l'huile ne circule plus, elle reste bloquée dans les points bas. Le compresseur tourne alors avec de moins en moins d'huile, jusqu'au <b>grippage</b> : les pièces internes, plus assez lubrifiées, se bloquent et le compresseur casse. C'est exactement ce que contrôle le code <b>8.05</b> : vérifier que les conduites de liquide et d'aspiration sont dans la bonne position, avec la <b>pente</b> et le <b>siphon</b> là où il faut.</p>"
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
     "etat": "a_evaluer",
     "officiel": "Expliquer le principe de fonctionnement d'un évaporateur (y compris le système de dégivrage) et les risques de fuite qui y sont associés",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.05",
     "libelle": "Vérifier les conduites liquide et aspiration",
     "etat": "a_evaluer",
     "officiel": "Vérifier que les conduites de liquide et d'aspiration sont dans la bonne position",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.08",
     "libelle": "Réaliser la mise en marche/arrêt et les mesures",
     "etat": "a_evaluer",
     "officiel": "Mettre en marche et arrêter un évaporateur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.09",
     "libelle": "Inspecter la surface d'échange et le bac de condensats",
     "etat": "a_evaluer",
     "officiel": "Inspecter la surface de l'évaporateur",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    }
   ],
   "ressources": [
    "r-echangeurs",
    "r-kp1"
   ],
   "liens": [
    {
     "vers": "g8b",
     "libelle": "Suite ▸ Évaporateur — installer, régler, vérifier"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g8b",
   "type": "cours",
   "titre": "Évaporateur — installer, régler, vérifier",
   "dc": "G8 · codes 8.02 · 8.03 · 8.04 · 8.06 · 8.07 · 8.10 · 8.11",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/mesure-surchauffe.svg\" alt=\"Points de contrôle sur l évaporateur en fonctionnement : manomètre basse pression relié à la table, sonde de contact sur le tube d aspiration.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Sur la <b>croix du frigoriste</b>, l'évaporateur occupe la position <b>basse</b>. Une fois installé, il doit fonctionner <b>sans aucune fuite ni émission</b> — c'est vrai pour le tube, mais aussi pour tout le matériel de contrôle et de sécurité posé avec lui.</p><p>Deux organes se règlent, pour deux raisons différentes. Le <b>régulateur de pression d'évaporation</b> — que le référentiel appelle aussi la <b>soupape de régulation</b> de la pression d'évaporation — est une soupape mécanique. Elle maintient une pression minimale dans l'évaporateur — par exemple pour empêcher un produit de geler, ou pour équilibrer plusieurs évaporateurs sur un seul compresseur. Sa mise en service et son réglage suivent <b>toujours la fiche constructeur</b>.</p><img src=\"packs/fluides/res/svg/regulateurs-pression.svg\" alt=\"Les trois régulateurs de pression situés sur le circuit : en sortie de condenseur, en sortie d'évaporateur, et sur l'aspiration juste avant le compresseur.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Cet organe se monte <b>en sortie d'évaporateur</b>, sur le départ de la ligne d'aspiration. Sur le terrain, on l'appelle couramment un <b>KVP</b> — c'est une référence commerciale, pas le nom de la fonction. Son intérêt se comprend mieux sur un cas concret : plusieurs chambres à des températures différentes, un seul compresseur. Sans lui, toutes les chambres descendraient à la pression de la plus froide. Avec lui, chaque évaporateur garde la pression — donc la température — que son produit demande.</p><p>Un troisième régulateur existe, et il ne faut pas le confondre avec celui-ci : le <b>régulateur de pression de carter</b>, couramment appelé <b>KVL</b>. Il se monte sur la ligne d'aspiration, juste <b>avant le compresseur</b>. Il ne protège ni le produit ni l'évaporateur : il protège le <b>moteur du compresseur</b>, en limitant la pression d'aspiration. Le cas typique est le <b>redémarrage après un arrêt long</b> : la pression est alors remontée dans tout le circuit, et sans lui le compresseur devrait avaler d'un coup beaucoup trop de vapeur. Trois régulateurs, trois endroits, trois raisons — et aucun des trois ne coupe quoi que ce soit.</p><p>Les <b>interrupteurs de sécurité et de contrôle</b> — les pressostats — protègent la machine, pas le produit. Ils coupent l'alimentation électrique du compresseur si la pression sort de la plage prévue. Deux organes, deux fonctions, deux réglages : on ne les confond pas.</p><img src=\"packs/fluides/res/svg/givre-degivrage.svg\" alt=\"Animation en cycle : l'air traverse la batterie propre, le givre s'épaissit sur les ailettes et étouffe l'échange, puis le dégivrage le fait fondre — l'eau part au bac et à l'écoulement, et l'air repart normalement.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le dégivrage évite que le givre n'isole la batterie. Il peut se faire à l'air, par résistance électrique ou par gaz chauds. Quand il se fait <b>à l'air chaud</b>, le conduit qui transporte cet air s'inspecte à chaque visite : étanchéité, isolation, écoulement des condensats.</p><p>Toute visite se termine par un <b>rapport écrit</b> sur l'état de l'évaporateur : anomalies observées, risque pour le système, ce qui pourrait à terme provoquer une fuite. Une batterie propre, un bon débit d'air et une surchauffe de <b>5 à 10 K</b> préservent aussi l'<b>efficacité énergétique</b> de l'équipement.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/evaporateur-interactif/index.html?dossier=observer\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">❄ Lancer le cours interactif : évaporateur — installer, régler, vérifier ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Givre visible, débit d'air, minuterie de dégivrage qualitative, distinction entre régulateur et pressostat, inspection guidée, rapport d'état et contrôle final.</span></p>",
   "blocs": [
    {
     "type": "piege",
     "t": "Avant toute mise en service",
     "html": "Pour vérifier que l'évaporateur ne fuit pas, la mise en pression se fait à l'<b>azote SEUL</b> — jamais à l'oxygène, jamais à l'air comprimé : avec de l'huile dans le circuit, ce mélange est explosif. Et avant toute intervention sur l'évaporateur ou ses sécurités, on coupe et on <b>consigne l'alimentation électrique</b>."
    },
    {
     "type": "cle",
     "t": "Qui protège quoi ?",
     "html": "<b>Pressostat</b> (interrupteur de sécurité) → protège la <b>machine</b> : il coupe le compresseur.<br><b>Régulateur de pression d'évaporation</b> (« KVP »), en sortie d'évaporateur → protège le <b>produit</b>, ou l'équilibre entre évaporateurs : il ne coupe rien, il maintient une pression.<br><b>Régulateur de pression de carter</b> (« KVL »), avant le compresseur → protège le <b>moteur du compresseur</b> : il limite la pression d'aspiration.<br>Un seul des trois coupe le courant, et c'est le pressostat. Dans tous les cas, la valeur de réglage vient de la <b>fiche constructeur</b>, jamais de l'estime."
    },
    {
     "type": "cle",
     "t": "Ce qu'un bon rapport contient",
     "html": "Un rapport d'état utile <b>décrit ce qui ne va pas</b> : corrosion, fixation desserrée, bac de condensats sale, conduit de dégivrage abîmé — tout ce qui, laissé tel quel, finit en fuite ou en émission. C'est aussi ce qui coûte le plus cher en énergie : une batterie sale ou un mauvais débit d'air font tourner le compresseur plus longtemps pour le même résultat."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Sur une installation, le pressostat BP coupe le compresseur. Le régulateur de pression d'évaporation, lui, ne coupe rien. Que fait-il ?",
    "choix": [
     "Il coupe l'alimentation électrique du compresseur",
     "Il maintient une pression minimale dans l'évaporateur, pour protéger le produit ou équilibrer plusieurs évaporateurs",
     "Il remplace le pressostat sur les installations récentes",
     "Il mesure la surchauffe en sortie d'évaporateur"
    ],
    "bonne": 1,
    "explication": "Le régulateur de pression d'évaporation est un organe mécanique : il maintient une pression minimale dans l'évaporateur, pour protéger le produit ou équilibrer plusieurs évaporateurs sur un même compresseur. Le pressostat, lui, est électrique : il coupe le compresseur pour protéger la machine. Deux fonctions, deux réglages, toujours selon la fiche constructeur.",
    "remediation_vers": "g8b"
   },
   "criteres": [
    {
     "code": "8.02",
     "libelle": "Mettre en service un régulateur de pression d'évaporation",
     "etat": "a_evaluer",
     "officiel": "Mettre au point un régulateur de pression d'évaporation de l'évaporateur",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.03",
     "libelle": "Installer l'évaporateur et ses sécurités sans fuite",
     "etat": "a_evaluer",
     "officiel": "Installer correctement un évaporateur, y compris le matériel de contrôle et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produise une fois le système en fonctionnement",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.04",
     "libelle": "Régler les sécurités électriques de l'évaporateur",
     "etat": "a_evaluer",
     "officiel": "Régler les interrupteurs de sécurité et de contrôle",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.06",
     "libelle": "Vérifier l'état du conduit de dégivrage à l'air chaud",
     "etat": "a_evaluer",
     "officiel": "Inspecter le conduit de dégivrage à l'air chaud",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.07",
     "libelle": "Ajuster la soupape de pression d'évaporation",
     "etat": "a_evaluer",
     "officiel": "Régler la soupape de régulation de la pression d'évaporation",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.10",
     "libelle": "Rédiger un rapport d'état de l'évaporateur",
     "etat": "a_evaluer",
     "officiel": "Rédiger un rapport sur l'état de l'évaporateur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "8.11",
     "libelle": "Connaître les leviers d'efficacité énergétique de l'évaporateur",
     "etat": "a_evaluer",
     "officiel": "Connaître les mesures pour améliorer ou maintenir l'efficacité énergétique de l'équipement pendant l'installation ou la maintenance des évaporateurs",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": true
    }
   ],
   "liens": [
    {
     "vers": "x2",
     "libelle": "Suite ▸ Exercice — la machine ne fait plus de froid"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
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
    },
    {
     "t": "À toi : rejoue la panne sur le Diagramme Enthalpique+",
     "html": "<p style=\"margin:0 0 10px\">Entre les relevés de l’énoncé dans l’outil (fluide, BP, HP, températures) et regarde le cycle se tracer : la panne se VOIT sur le log p-h.</p><iframe src=\"https://frigorx.github.io/diagramme-enthalpique/\" title=\"Diagramme Enthalpique+ v3.2\" style=\"width:100%;height:760px;border:0;background:#fff;border-radius:6px\" loading=\"lazy\"></iframe>"
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
     "etat": "a_evaluer",
     "officiel": "Effectuer un contrôle de l'étanchéité du système au moyen d'une méthode indirecte conformément au règlement (CE) n° 1516/2007 et du manuel d'utilisation du système",
     "groupe": "G4",
     "groupe_titre": "Contrôles d'étanchéité",
     "epreuve": {
      "A1": "P",
      "A2": "P",
      "E": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "8.08",
     "libelle": "Réaliser les mesures en fonctionnement",
     "etat": "a_evaluer",
     "officiel": "Mettre en marche et arrêter un évaporateur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
     "groupe": "G8",
     "groupe_titre": "Composant : installation, mise en service et maintenance d'évaporateurs à refroidissement par air et à refroidissement par liquide",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    }
   ],
   "ressources": [
    "r-enthalpique"
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
   "categories": [
    "A1",
    "A2",
    "E"
   ]
  },
  {
   "id": "g9",
   "type": "cours",
   "titre": "Le détendeur et les organes annexes",
   "dc": "G9 · codes 9.01 · 9.02 · 9.03 · 9.08",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/detendeur-regulation.svg\" alt=\"Animation en boucle : la charge thermique augmente, la surchauffe monte, le bulbe se réchauffe et pousse la membrane, le détendeur ouvre, l'évaporateur reçoit plus de fluide, la surchauffe redescend — la boucle qui se corrige toute seule.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><img src=\"packs/fluides/res/svg/detendeurs-ligne.svg\" alt=\"Les quatre types de détendeurs et la ligne liquide avec ses accessoires dans l ordre.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le détendeur fait chuter la pression et <b>dose le débit de liquide</b> envoyé à l'évaporateur. Le <b>détendeur thermostatique</b> régule sur la <b>surchauffe</b> : son bulbe, fixé sur la ligne d'aspiration, sent la température du gaz et ouvre ou ferme en conséquence. Le <b>détendeur électronique</b> fait la même chose avec une sonde et un régulateur : plus précis, plus rapide. Le <b>capillaire</b>, lui, est un tube calibré fixe, sans réglage — on le trouve sur les petits appareils.</p><p>Autour du détendeur, la ligne liquide porte le <b>filtre déshydrateur</b> (tamis moléculaire, monté <b>dans le sens de la flèche</b>) et le <b>voyant</b>, qui renseigne sur deux choses : la présence de bulles et, par sa pastille, l'humidité du circuit.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/circuit-organe-par-organe/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🔧 Lancer le cours interactif : le circuit, organe par organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">La croix du frigoriste, chaque organe en fiche animée (piston, scroll et vis compris), les serpentins du condenseur et de l'évaporateur, la régulation du détendeur, l'exercice « suivez le fluide », la bibliothèque des 10 organes et un défi final de 10 questions.</span></p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/tome-3-technologie-organes/index.html?dossier=detendeur-thermostatique\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">le détendeur à égalisation interne et externe, le détendeur électronique et le tube capillaire, chacun en vue isolée avec son symbole.</span></p>",
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
     "etat": "a_evaluer",
     "officiel": "Expliquer le principe de fonctionnement de différents types de vannes d'expansion (détendeurs thermostatiques, tubes capillaires) et les risques de fuite qui y sont liés",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "9.02",
     "libelle": "Installer les vannes dans la bonne position",
     "etat": "a_evaluer",
     "officiel": "Installer des vannes dans la bonne position",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "9.03",
     "libelle": "Régler un détendeur mécanique ou électronique",
     "etat": "a_evaluer",
     "officiel": "Régler un détendeur mécanique/électronique",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "9.08",
     "libelle": "Vérifier un filtre déshydrateur",
     "etat": "a_evaluer",
     "officiel": "Vérifier l'état d'un filtre sécheur",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    }
   ],
   "liens": [
    {
     "vers": "g9b",
     "libelle": "Suite ▸ Régler et contrôler les organes annexes"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g9b",
   "type": "cours",
   "titre": "Régler et contrôler les organes annexes",
   "dc": "G9 · codes 9.04 · 9.05 · 9.06 · 9.07 · 9.09 · 9.10",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/detendeurs-ligne.svg\" alt=\"La ligne liquide et ses accessoires, dans l ordre : réserve de liquide, filtre déshydrateur, voyant, électrovanne, détendeur.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Autour du détendeur, d'autres organes se <b>règlent</b> et se <b>contrôlent</b>. Ils ne dosent pas le fluide. Ils protègent l'installation et lui évitent de gaspiller de l'énergie. Cette fiche en présente quatre : les thermostats, la soupape de régulation de pression, les limiteurs de pression, et le séparateur d'huile.</p><p>Le <b>thermostat</b> commande un organe (compresseur, vanne) selon une <b>température</b>. Le thermostat <b>mécanique</b> utilise un bulbe relié par un tube fin à des contacts électriques : simple et robuste. Le thermostat <b>électronique</b> utilise une sonde reliée à un régulateur numérique : plus précis, et plus simple à régler. Dans les deux cas, le point de consigne se règle <b>selon la fiche constructeur</b>, jamais à l'estime.</p><p>La <b>soupape de régulation de pression</b> ne coupe rien : elle <b>module en continu</b> pour maintenir une pression stable à un point du circuit. Le <b>limiteur de pression</b> est différent : c'est une sécurité. Mécanique, il est réglé par un ressort. Électronique, il utilise un capteur relié à un module. Dans les deux cas, il <b>coupe le circuit</b> — le plus souvent le compresseur — dès qu'un seuil de pression est franchi, en haute comme en basse pression. Une régulation qui module, une sécurité qui coupe : deux logiques, deux réglages.</p><p>Le <b>séparateur d'huile</b> se place juste après le compresseur (à droite), avant le condenseur (en haut). C'est là que passe en premier la vapeur chaude chargée d'huile. Il retient cette huile puis la renvoie au carter du compresseur, automatiquement, dès que le niveau monte. <b>Vérifier son fonctionnement</b>, c'est contrôler que ce retour se fait bien : une huile qui s'accumule plus loin dans le circuit réduit l'échange de chaleur, et finit par manquer au compresseur.</p><p>Après ces réglages et ce contrôle, on <b>rédige un rapport</b> sur l'état de chaque organe. Un thermostat qui dérive, un limiteur qui ne coupe plus, un séparateur qui laisse passer l'huile : non signalés, ces défauts finissent par endommager le système. À terme, faute de mesure, cela provoque une fuite ou une émission de réfrigérant. Le rapport écrit permet d'agir <b>avant</b> ce stade.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/tome-3-technologie-organes/index.html?dossier=regulateurs-securite\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Les organes annexes un par un : réservoir, filtre déshydrateur, voyant, électrovanne, clapet et vannes de service, bouteille anti-coup de liquide, séparateur d'huile, régulateurs de pression et soupape — chacun en vue isolée, avec son symbole normalisé.</span></p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Un bon réglage, c'est de l'énergie économisée",
     "html": "Un thermostat qui démarre et arrête le compresseur trop souvent, un limiteur qui coupe pour rien, un séparateur d'huile qui laisse l'huile encrasser les échangeurs : à chaque fois, le compresseur travaille plus pour le même résultat. <b>Bien régler et bien entretenir ces organes, à l'installation comme en maintenance, c'est aussi ce qui maintient l'efficacité énergétique</b> de l'installation."
    },
    {
     "type": "piege",
     "t": "Avant de toucher un réglage électrique",
     "html": "Un thermostat électronique, un limiteur de pression électrique : ce sont des <b>organes électriques</b>. <b>Consignation électrique</b> systématique avant toute intervention. Et un limiteur de sécurité ne se retouche jamais « pour voir » : son seuil se règle selon la fiche constructeur, comme tous les autres réglages de cette fiche."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Quelle est la différence entre un limiteur de pression et une soupape de régulation de pression ?",
    "choix": [
     "Aucune différence : ce sont deux noms pour le même organe",
     "Le limiteur coupe le circuit à un seuil de sécurité ; la soupape de régulation module en continu pour maintenir une pression stable",
     "Le limiteur agit sur la température, la soupape de régulation sur la pression",
     "La soupape de régulation remplace le thermostat sur les installations récentes"
    ],
    "bonne": 1,
    "explication": "Le limiteur de pression (mécanique ou électronique) est une sécurité : il coupe le circuit quand un seuil est franchi. La soupape de régulation ne coupe rien : elle module en continu pour maintenir une pression stable à un point du circuit. Deux logiques différentes, deux réglages différents.",
    "remediation_vers": "g9b"
   },
   "criteres": [
    {
     "code": "9.04",
     "libelle": "Régler un thermostat mécanique ou électronique",
     "etat": "a_evaluer",
     "officiel": "Régler des thermostats mécaniques et électroniques",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "9.05",
     "libelle": "Régler une soupape de régulation de pression",
     "etat": "a_evaluer",
     "officiel": "Régler la soupape de régulation de la pression",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "9.06",
     "libelle": "Régler un limiteur de pression mécanique ou électronique",
     "etat": "a_evaluer",
     "officiel": "Régler des limiteurs de pression mécaniques et électroniques",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "9.07",
     "libelle": "Vérifier le fonctionnement d'un séparateur d'huile",
     "etat": "a_evaluer",
     "officiel": "Vérifier le fonctionnement d'un séparateur d'huile",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "9.09",
     "libelle": "Rédiger un rapport d'état sur ces organes",
     "etat": "a_evaluer",
     "officiel": "Rédiger un rapport sur l'état de ces composants en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": true
    },
    {
     "code": "9.10",
     "libelle": "Connaître les mesures d'efficacité énergétique liées à ces réglages",
     "etat": "a_evaluer",
     "officiel": "Connaître les mesures pour améliorer ou maintenir l'efficacité énergétique de l'équipement pendant l'installation ou la maintenance des détendeurs thermostatiques et d'autres composants",
     "groupe": "G9",
     "groupe_titre": "Composant : installation, mise en service et entretien des détendeurs thermostatiques et autres composants",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": true
    }
   ],
   "liens": [
    {
     "vers": "g10",
     "libelle": "Suite ▸ Tuyauterie et brasage sous azote"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
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
     "etat": "a_evaluer",
     "officiel": "Soudage, brasage fort et/ou brasage tendre des joints étanches sur des tubes, des tuyaux et des composants métalliques pouvant être utilisés dans des systèmes de réfrigération, de climatisation et de pompes à chaleur",
     "groupe": "G10",
     "groupe_titre": "Tuyauterie : monter un réseau de tuyauterie étanche dans une installation de réfrigération",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "10.02",
     "libelle": "Fabriquer et vérifier les supports de tuyauteries",
     "etat": "a_evaluer",
     "officiel": "Fabriquer/vérifier des supports de tuyaux et de composants",
     "groupe": "G10",
     "groupe_titre": "Tuyauterie : monter un réseau de tuyauterie étanche dans une installation de réfrigération",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": false,
     "tirage_au_sort": false
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
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g11",
   "type": "cours",
   "titre": "Substitution et efficacité énergétique",
   "dc": "G11 · codes 1.08 · 11.01 → 11.05",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/classes-securite.svg\" alt=\"Matrice complète des classes NF EN 378 : huit cases, toxicité en lignes, inflammabilité en colonnes.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Remplacer un fluide à fort PRP se fait dans deux directions : les <b>fluides naturels</b> (CO₂, ammoniac, hydrocarbures) et les fluides de synthèse à faible PRP (<b>HFO</b>, HFC bas PRP). Il n'existe <b>pas de fluide universel</b> : le choix dépend de l'application, du climat, et de la sécurité du site.</p><p>La <b>classe de sécurité NF EN 378</b> commande tout le reste — EPI, zonage, détection, charge admissible dans le local : <b>A1</b> (CO₂), <b>A2L</b> (R-32, R-1234yf), <b>A3</b> (R-290), <b>B2L</b> (NH₃).</p><p>Une classe ne dit pas seulement « ça brûle ou non ». Elle décrit la <b>combustibilité</b> et la <b>propagation de la flamme</b> : un <b>A2L</b> brûle difficilement et la flamme se propage lentement, un <b>A3</b> s'enflamme facilement et la flamme court vite. De là découlent une <b>charge maximale</b> admissible et des <b>limites d'occupation</b> du local — plus le local est petit ou recevant du public, plus la charge autorisée est faible. Ces valeurs se déterminent selon la <b>NF EN 378</b> et la doc constructeur, <b>jamais à l'estime</b>.</p><p>Le stockage et le transport des fluides <b>inflammables</b>, <b>toxiques</b> ou à <b>haute pression</b> obéissent chacun à des règles propres. Et lorsqu'un site ne peut pas respecter les exigences de l'<b>annexe IV du règlement (UE) 2024/573</b> pour des raisons de <b>sécurité</b>, des équipements dérogatoires restent permis : c'est une exception encadrée, qui se justifie par écrit, pas un passe-droit.</p><p>Côté énergie, le <b>COP</b> est le rapport de la puissance frigorifique produite à la puissance électrique consommée. On l'améliore en <b>rapprochant</b> la température de condensation de celle d'évaporation : condenseur propre, échangeurs bien dimensionnés, réglages justes. Réduire la charge, enfin, améliore à la fois la sécurité et le rendement.</p><p>Pour réduire la charge de fluide frigorigène, on peut aussi changer la <b>conception</b> du système. Dans un système à <b>boucle secondaire</b>, le fluide frigorigène reste confiné dans la machinerie, avec une charge réduite. Un fluide caloporteur — de l'<b>eau glacée</b> ou de l'<b>eau glycolée</b> — circule ensuite dans les postes (vitrines, centrales de traitement d'air) pour transporter le froid jusqu'à eux. Le fluide frigorigène ne quitte jamais la salle des machines.</p><p>Le système en <b>cascade</b> pousse cette logique plus loin : deux circuits frigorifiques séparés sont montés en série, chacun avec sa propre charge, réduite elle aussi. Le circuit basse température évacue sa chaleur dans le circuit haute température, qui la rejette à l'extérieur. Chaque circuit reste petit, donc plus facile à confiner en cas de fuite.</p><p>Chaque fluide de substitution a ses <b>avantages</b> et ses <b>inconvénients</b>, selon l'application et le <b>climat</b>. Le <b>CO₂</b> est performant en froid commercial, mais son efficacité baisse quand l'air extérieur est très chaud. Les <b>hydrocarbures</b> sont efficaces, mais leur inflammabilité limite la charge autorisée. L'<b>ammoniac</b> est réservé aux installations industrielles, à cause de sa toxicité. Il n'y a pas de meilleur fluide dans l'absolu : le choix se fait selon l'application, le climat du site, et la documentation constructeur, à faire valider avant tout choix.</p><p>Une machine aux <b>hydrocarbures</b> n'est pas construite comme les autres. Tous les composants électriques en contact possible avec le gaz — relais, thermostats, ventilateurs — sont <b>antidéflagrants</b> ou <b>non étincelants</b> : ils sont conçus pour ne jamais produire d'étincelle qui pourrait enflammer le gaz. La charge de fluide est aussi limitée dès la conception. Enfin, l'implantation prévoit une <b>ventilation</b> adaptée : le propane est plus lourd que l'air, il s'accumule donc en bas, près du sol, en cas de fuite.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/bilan-thermique-performance-interactif/index.html\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">📐 Lancer le cours interactif : Tome 4 — bilan thermique et performance ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Du besoin thermique à la consommation électrique : parois, produits, air, puis COP, EER, SCOP, SEER et la lecture de la vraie étiquette européenne. Le bilan thermique lui-même dépasse le programme A1 — mais sans lui, « améliorer l efficacité énergétique » reste une formule.</span></p>",
   "blocs": [
    {
     "type": "cle",
     "t": "Drop-in ou retrofit ?",
     "html": "<b>Drop-in</b> : on change le fluide sans modifier l'installation.<br><b>Retrofit</b> : on change le fluide <b>et</b> ce qu'il faut adapter — huile, détendeur, joints. Annoncer un drop-in là où il faut un retrofit, c'est préparer une panne."
    },
    {
     "type": "piege",
     "t": "Le piège de l'année",
     "html": "<b>Le R-290 est A3</b>, pas A2L. Tout hydrocarbure est très inflammable. Se tromper de classe, c'est se tromper d'EPI, de matériel électrique et de charge admissible. À l'inverse, le <b>CO₂ est A1</b> : toxicité faible, non inflammable — mais cette classe n'annonce ni sa <b>pression</b>, ni l'<b>atmosphère irrespirable</b> qu'une fuite crée en local fermé."
    },
    {
     "t": "À toi : compare les candidats à la substitution",
     "html": "<p style=\"margin:0 0 10px\">Passe en revue R-290, R-1234yf, R-744, R-32 : classe de sécurité, PRP, glide. Le fluide « parfait » n existe pas — c est tout l objet de ce groupe.</p><iframe src=\"packs/fluides/res/outils/fiche-fluide.html\" title=\"Carte d identité du fluide interactive\" style=\"width:100%;height:415px;border:0;background:#fff;border-radius:6px\" loading=\"lazy\"></iframe>"
    },
    {
     "type": "cle",
     "t": "Hydrocarbures : une machine pas comme les autres",
     "html": "<b>Antidéflagrant</b> ou <b>non étincelant</b> : sur une machine aux hydrocarbures, tout composant électrique proche du gaz doit respecter cette règle, pour ne jamais produire d'étincelle. Et comme le propane est plus lourd que l'air, il s'accumule en bas en cas de fuite — la <b>ventilation</b> du local en tient compte dès la conception."
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
     "code": "1.08",
     "libelle": "Situer combustibilité, propagation de flamme et limites de charge",
     "etat": "a_evaluer",
     "officiel": "Connaître la combustibilité, la propagation des flammes, les restrictions relatives à la capacité de charge, les limites d'occupation pour les HFC, H(C)FO et hydrocarbures",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "11.01",
     "libelle": "Connaître les technologies de substitution et leur manipulation sans danger",
     "etat": "a_evaluer",
     "officiel": "Connaître les technologies de substitution pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et savoir les manipuler sans danger",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T",
      "E": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "11.03",
     "libelle": "Appliquer les règles de sécurité pour fluides inflammables, toxiques ou haute pression",
     "etat": "a_evaluer",
     "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "11.02",
     "libelle": "Expliquer la conception à charge réduite et l'efficacité",
     "etat": "a_evaluer",
     "officiel": "Connaître les systèmes de conception pertinents afin de réduire la charge des gaz à effet de serre fluorés et d'augmenter l'efficacité énergétique",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "11.04",
     "libelle": "Comparer les fluides de substitution selon l'application",
     "etat": "a_evaluer",
     "officiel": "Comprendre les avantages et inconvénients respectifs, notamment en ce qui concerne l'efficacité énergétique, des réfrigérants de substitution en fonction de leur application prévue et des conditions climatiques des différentes régions",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": false,
     "tirage_au_sort": false
    },
    {
     "code": "11.05",
     "libelle": "Situer les différences de conception des systèmes aux hydrocarbures",
     "etat": "a_evaluer",
     "officiel": "Connaître les différences de conception des composants et des systèmes pour les équipements et les systèmes tributaires des hydrocarbures",
     "groupe": "G11",
     "groupe_titre": "Informations sur les technologies pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et sur leur manipulation sans danger",
     "epreuve": {
      "A1": "T",
      "A2": "T",
      "D": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
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
   "categories": [
    "A1",
    "A2",
    "D",
    "E"
   ]
  },
  {
   "id": "g12",
   "type": "cours",
   "titre": "Hydrocarbures — le spécifique A1 et A2",
   "dc": "G12 · codes 12.01 → 12.04 · 12.06 · 12.13 · 12.14",
   "minuteur_s": 360,
   "corps": "<img src=\"packs/fluides/res/svg/classes-securite.svg\" alt=\"Matrice complète des classes NF EN 378 : huit cases, toxicité en lignes, inflammabilité en colonnes.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Les hydrocarbures — <b>R-290</b> (propane), <b>R-600a</b> (isobutane) — sont classés <b>A3</b> : très inflammables. Ils s'imposent pourtant, parce que leur PRP est très bas et leurs performances excellentes : on les trouve dans les réfrigérateurs domestiques, les monoblocs, les vitrines, et de plus en plus dans les pompes à chaleur.</p><p>Travailler dessus impose une <b>préparation dédiée</b> : analyse de risques avant intervention, suppression de toute source d'ignition, <b>ventilation active</b>, outillage et matériel électrique adaptés, détecteur de gaz. La charge admissible dépend du <b>volume du local</b> et de la classe de sécurité : elle se détermine selon la <b>NF EN 378</b> et la plaque signalétique — <b>jamais estimée</b>.</p><p>Sur le circuit : récupération, puis <b>inertage à l'azote</b> avant toute flamme. Épreuve de pression à l'azote, essai sous vide, charge de la quantité exacte, contrôle direct, rapport.</p><p>Tout est <b>étiqueté</b>, et l'étiquette se lit avant de toucher : l'équipement porte la mention du fluide et le pictogramme <b>inflammable</b>, la bouteille aussi. Les bouteilles d'hydrocarbure ont un <b>raccord spécifique</b> et un <b>filetage à gauche</b> — c'est une sécurité, jamais un obstacle à contourner avec un adaptateur.</p><p>Avant d'intervenir, on vérifie que le <b>site</b> lui-même est en règle : <b>signalisation</b> du risque, <b>issues de secours</b> dégagées, <b>capteurs de gaz</b> et <b>alarmes</b> présents et en service, ventilation opérante. Si ces mesures manquent, on ne commence pas : on le signale.</p><p>Enfin, bien travailler économise l'énergie. Une charge <b>juste</b> — et les charges hydrocarbures sont faibles —, des échangeurs propres et des réglages exacts font qu'une machine au R-290 tient ses performances. Une charge approximative dégrade le rendement <b>et</b> la sécurité en même temps.</p><p>Un hydrocarbure récupéré qu'on ne peut pas réutiliser ne part <b>jamais</b> à l'atmosphère, et jamais à l'égout : il part en <b>élimination</b>. C'est une filière agréée qui détruit le fluide dans des conditions contrôlées, comme pour tout déchet dangereux. La bouteille envoyée en <b>destruction</b> est accompagnée d'un bordereau qui trace le mouvement, du technicien jusqu'au centre de traitement. On garde ce bordereau : c'est la preuve que le fluide a bien été éliminé, pas relâché.</p><img src=\"packs/fluides/res/svg/charge-limite-local.svg\" alt=\"Animation : trois locaux de volumes croissants, la même fuite dans chacun — dans le petit local la concentration entre dans le domaine explosif, dans le grand elle reste diluée sous le seuil. La charge admissible se calcule selon la NF EN 378, en fonction du volume du local et du fluide.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Calculer la <b>charge maximale</b> admissible d'un fluide inflammable, ce n'est pas la deviner. Ce calcul dépend du <b>volume de la pièce</b> desservie et de la <b>limite pratique</b> du fluide, c'est-à-dire la quantité maximale tolérée dans l'air ambiant sans risque. Plus la pièce est petite, moins on a le droit de charge : un même compresseur au R-290 n'a pas la même charge autorisée dans un grand local et dans une pièce exiguë. La méthode et les valeurs à utiliser se trouvent dans la norme <b>NF EN 378</b> et dans la documentation du constructeur — on les <b>lit</b>, on ne les invente jamais, et le résultat du calcul se fait <b>valider</b> avant toute mise en service.</p><p>Sur un équipement à fluide inflammable, l'<b>efficacité énergétique</b> se travaille avec les mêmes gestes que sur toutes les machines. La différence, c'est que la charge exacte compte double : ces circuits sont conçus avec une charge volontairement petite, alors le moindre écart — un peu trop, un peu pas assez — dérègle vite l'échange et fait chuter la performance, bien avant que ça n'arrive sur une machine à grosse charge.</p><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/hydrocarbures-a1-a2/index.html?dossier=comprendre\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🔥 Lancer Mission 290 — autoriser ou suspendre ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Pourquoi le R-290, risques d’inflammation, inspection d’une zone, calcul documenté, outillage hydrocarbures et conduite à tenir.</span></p>",
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
    },
    {
     "type": "cle",
     "t": "Charge maximale : jamais estimée",
     "html": "Le <b>calcul</b> de la charge maximale dépend du <b>volume de la pièce</b> et de la limite pratique du fluide. Il se fait avec la <b>NF EN 378</b> et la documentation constructeur, jamais de mémoire. Petite pièce = charge autorisée plus faible."
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
     "code": "12.01",
     "libelle": "Lire l'étiquetage et raccorder correctement une bouteille",
     "etat": "a_evaluer",
     "officiel": "Connaître les règles d'étiquetage et les prescriptions spéciales pour les réfrigérants inflammables dans les équipements, systèmes et cylindres de refroidissement ainsi que les prescriptions spéciales relatives au raccordement des bombonnes",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.02",
     "libelle": "Appliquer les règles de sécurité outils, EPI et détection gaz",
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.03",
     "libelle": "Déterminer la charge admissible",
     "etat": "a_evaluer",
     "officiel": "Calculer la charge de réfrigérant inflammable dans un système conformément aux normes de sécurité en vigueur",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.04",
     "libelle": "Réaliser l'analyse de risques avant intervention",
     "etat": "a_evaluer",
     "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.06",
     "libelle": "Récupérer et inerter à l'azote",
     "etat": "a_evaluer",
     "officiel": "Récupérer les réfrigérants inflammables du système en toute sécurité et remplir le système avec de l'azote",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.13",
     "libelle": "Vérifier la signalisation, les issues, la détection et les alarmes du site",
     "etat": "a_evaluer",
     "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.14",
     "libelle": "Maintenir l'efficacité énergétique avec un fluide inflammable",
     "etat": "a_evaluer",
     "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance avec des réfrigérants inflammables",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "T",
      "A2": "T"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "g12b",
     "libelle": "Suite ▸ Intervenir sur un circuit hydrocarbure"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g12b",
   "type": "cours",
   "titre": "Intervenir sur un circuit hydrocarbure",
   "dc": "G12 · codes 12.07 · 12.08 · 12.09 · 12.10 · 12.11 · 12.12",
   "minuteur_s": 420,
   "corps": "<img src=\"packs/fluides/res/svg/balayage-azote.svg\" alt=\"Brasage du composant remplacé sous balayage d azote : débit léger et continu, sortie libre — l épreuve sous pression vient ensuite, une fois le circuit refermé.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Le circuit est déjà <b>récupéré</b> et <b>inerté à l'azote</b> : plus d'hydrocarbure ni d'air à l'intérieur. La zone est prête : <b>ventilée</b>, balisée, sans source d'inflammation, détecteur de gaz et extincteur à portée, outillage adapté.</p><p>Reste une dernière vérification avant le chalumeau : la <b>consignation électrique</b> de l'installation. Le <b>R-290 est A3</b>, très inflammable — pas un A2L comme le R-32. Tant que l'inertage n'est pas confirmé : <b>aucune flamme</b>.</p><p>Le mode opératoire suit ensuite toujours le même ordre :</p><ol><li><b>Ouvrir, remplacer, refermer.</b> On dépose le composant en panne et on brase le nouveau. Toujours sous <b>balayage d'azote</b> : un débit léger et continu qui évite la calamine à l'intérieur du tube. Mano-détendeur sur la bouteille — jamais d'azote en direct.</li><li><b>Épreuve de pression.</b> Le circuit refermé, on le met sous pression d'<b>azote sec</b>, toujours au travers du mano-détendeur, pour contrôler la brasure neuve. Pression d'épreuve : selon la documentation constructeur et la norme applicable, jamais à l'estime.</li><li><b>Tirage au vide.</b> On relâche l'azote, puis on tire au vide : la pompe extrait l'air et l'<b>humidité</b> restants. Un vide qui remonte signale un problème. Valeur cible et durée : selon la documentation constructeur.</li><li><b>Charge.</b> On charge le circuit avec le volume de réfrigérant hydrocarbure (R-290, R-600a) indiqué sur la <b>plaque signalétique</b>, par pesée — jamais une quantité estimée. Raccord dédié aux hydrocarbures : jamais celui d'un circuit HFC, ni l'inverse.</li><li><b>Contrôle direct.</b> On confirme l'étanchéité avec un <b>détecteur adapté aux hydrocarbures</b> — un détecteur pour HFC classique ne convient pas.</li><li><b>Rapport.</b> On rédige le rapport d'intervention : composant changé, résultats de l'épreuve et du contrôle, quantité chargée. Sans rapport, l'intervention n'a pas de valeur.</li></ol><p class=\"lien-experience\" style=\"margin:16px 0\"><a href=\"packs/fluides/res/intervention-hydrocarbures-interactive/index.html?dossier=preparer\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 22px;background:#1b3a63;color:#fff;font-weight:700;text-decoration:none;border-radius:999px\">🧭 Lancer le cours interactif : intervenir sur un circuit hydrocarbure ▸</a><br><span style=\"font-size:13px;color:#5a6b7d;display:inline-block;margin-top:6px\">Suite de Mission 290 : 27 écrans, six embranchements avec conséquence visible, ouverture, épreuve, vide, charge, contrôle direct, rapport et cinq décisions finales.</span></p>",
   "blocs": [
    {
     "type": "piege",
     "t": "Geste interdit",
     "html": "Mise en pression : <b>azote sec seulement</b>, jamais d'oxygène ni d'air comprimé, toujours au travers d'un <b>mano-détendeur</b> — une bouteille en direct peut faire éclater le circuit. <b>Consignation électrique</b> systématique avant d'ouvrir. Et tant que l'inertage n'est pas confirmé : <b>pas de chalumeau</b>, le R-290 est A3, très inflammable."
    },
    {
     "type": "cle",
     "t": "Le fil rouge de l'intervention",
     "html": "Récupérer → inerter à l'azote → ouvrir et remplacer → épreuve à l'azote → vide → charge → contrôle direct → rapport.<br>Chaque étape verrouille la suivante : pas de charge sans épreuve concluante, pas de contrôle sans vide correct."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Vous allez faire l'épreuve de pression à l'azote sur un circuit hydrocarbure qui vient d'être rebrasé. Que vérifiez-vous avant d'ouvrir la bouteille ?",
    "choix": [
     "Que le mano-détendeur est bien monté sur la bouteille",
     "Que le circuit est déjà chargé en R-290",
     "Que le compresseur est en marche",
     "Que le détendeur thermostatique est réglé"
    ],
    "bonne": 0,
    "explication": "Une bouteille d'azote est à très haute pression : sans mano-détendeur, elle peut dépasser la pression d'épreuve et faire éclater le circuit. Le circuit n'est pas encore chargé à ce stade, et le compresseur reste consigné — son détendeur thermostatique n'a rien à voir avec cette étape.",
    "remediation_vers": "g12b"
   },
   "criteres": [
    {
     "code": "12.07",
     "libelle": "Ouvrir le circuit pour remplacer un composant, puis le refermer",
     "etat": "a_evaluer",
     "officiel": "Ouvrir le système, enlever et remplacer un composant, refermer le système",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.08",
     "libelle": "Réaliser l'épreuve de pression à l'azote",
     "etat": "a_evaluer",
     "officiel": "Effectuer une épreuve de pression pour contrôler l'étanchéité du système",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.09",
     "libelle": "Tirer au vide pour sécher et vérifier le circuit",
     "etat": "a_evaluer",
     "officiel": "Réaliser un essai sous vide pour éliminer l'humidité et vérifier l'étanchéité du système",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.10",
     "libelle": "Charger le circuit avec la quantité d'hydrocarbure prévue",
     "etat": "a_evaluer",
     "officiel": "Charger le système avec le volume approprié de réfrigérant à base d'hydrocarbures",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.11",
     "libelle": "Contrôler l'étanchéité par une méthode directe",
     "etat": "a_evaluer",
     "officiel": "Réaliser un contrôle d'étanchéité sur le système au moyen d'une méthode directe",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.12",
     "libelle": "Rédiger le rapport d'intervention",
     "etat": "a_evaluer",
     "officiel": "Rédiger un rapport sur le travail d'entretien effectué",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "x5",
     "libelle": "Suite ▸ Détective — intervention sur monobloc R-290"
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "x5",
   "type": "exercice",
   "titre": "Détective — intervention sur monobloc R-290",
   "dc": "G12 · mise en situation · A1 et A2",
   "minuteur_s": 480,
   "corps": "<p>Une vitrine réfrigérée au <b>R-290</b> à remplacer de compresseur, dans l'arrière-boutique d'une boulangerie : local <b>petit</b>, <b>sans ventilation</b>, un four à quelques mètres.</p><p>Ton collègue propose de « faire vite » : récupérer, ouvrir, braser le nouveau compresseur, recharger — comme sur un circuit HFC classique, « vu la petite charge ».</p>",
   "blocs": [
    {
     "type": "piege",
     "t": "« Petite charge » ne veut pas dire « petit risque »",
     "html": "Le R-290 est <b>A3</b> : la charge est petite précisément <b>parce que</b> le fluide est très inflammable. Un local exigu non ventilé avec une source de flamme à proximité, c'est le scénario d'accident type — pas un chantier ordinaire."
    }
   ],
   "question": {
    "type": "qcm",
    "enonce": "Que réponds-tu, analyse de risques en main ?",
    "choix": [
     "D'accord : la charge est faible, les précautions HFC suffisent",
     "On ventile, on éloigne ou neutralise toute source d'ignition (four compris), on récupère, on inerte à l'azote — et seulement alors on chauffe",
     "On brase d'abord, la récupération se fera après",
     "On contrôle au détecteur HFC classique avant de commencer"
    ],
    "bonne": 1,
    "explication": "Séquence hydrocarbures : analyse de risques, ventilation active, zéro ignition, récupération, inertage azote, et seulement ensuite la flamme. Un détecteur HFC classique n'est pas conçu pour les hydrocarbures — il faut l'appareil adapté.",
    "remediation_vers": "g12"
   },
   "criteres": [
    {
     "code": "12.04",
     "libelle": "Conduire l'analyse de risques avant intervention",
     "etat": "a_evaluer",
     "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.05",
     "libelle": "Préparer la zone : ventilation, ignition, EPI",
     "etat": "a_evaluer",
     "officiel": "Préparer la zone de travail et sélectionner les outils, le matériel et les équipements de protection adéquats pour travailler sur des systèmes dépendant des réfrigérants inflammables",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    },
    {
     "code": "12.06",
     "libelle": "Récupérer puis inerter avant toute flamme",
     "etat": "a_evaluer",
     "officiel": "Récupérer les réfrigérants inflammables du système en toute sécurité et remplir le système avec de l'azote",
     "groupe": "G12",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires des hydrocarbures",
     "epreuve": {
      "A1": "P",
      "A2": "P"
     },
     "nouveau": true,
     "tirage_au_sort": false
    }
   ],
   "liens": [
    {
     "vers": "g13",
     "libelle": "Suite ▸ CO₂ et NH₃ — information"
    },
    {
     "vers": "g12",
     "libelle": "↩ Revoir : hydrocarbures",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ],
   "categories": [
    "A1",
    "A2"
   ]
  },
  {
   "id": "g13",
   "type": "cours",
   "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir",
   "dc": "G13 · G14 · information et sensibilisation",
   "minuteur_s": 300,
   "corps": "<img src=\"packs/fluides/res/svg/co2-nh3-compare.svg\" alt=\"Deux comportements inverses : le CO₂, A1 et sans odeur, est plus lourd que l'air et descend (catégorie B) ; l'ammoniac, B2L et piquant, est plus léger que l'air et monte (catégorie C).\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><p>Ce module <b>informe</b>, il ne qualifie pas. Une attestation A1 ou A2 ne donne <b>aucun droit d'intervention</b> sur une installation au CO₂ (catégorie B) ou à l'ammoniac (catégorie C). Ce qu'on attend ici : <b>reconnaître</b> et <b>ne pas toucher</b>.</p><p><b>CO₂ (R-744)</b> — classé <b>A1</b> : toxicité <b>faible</b>, non inflammable, <b>PRP = 1</b>. Cette classe n'annonce aucun de ses vrais dangers : la <b>pression</b>, très élevée, l'<b>atmosphère irrespirable</b> en local fermé (il est plus lourd que l'air, s'accumule en point bas, et agit sur la respiration — voir « CO₂ : deux dangers mortels »), et le risque de <b>neige carbonique</b> à la détente (brûlure par le froid, obstruction). En transcritique, le condenseur laisse la place à un <b>refroidisseur de gaz</b>. Les cylindres, à double vanne, ne se raccordent pas au matériel courant.</p><p><b>Ammoniac (R-717)</b> — classé <b>B2L</b> : <b>toxique</b> et faiblement inflammable. Fluide du froid industriel (agroalimentaire, entrepôts), jamais du résidentiel. Son odeur piquante se perçoit très tôt — mais elle <b>ne remplace aucune mesure</b>, et elle s'émousse à forte concentration : on ne se fie jamais à son nez pour décider. En cas de fuite : <b>alerter, évacuer, ne jamais intervenir seul</b>.</p><p>Sur le terrain, le CO₂ ne se manipule pas avec le matériel courant : ses pressions de travail sont bien plus élevées que celles des fluides classiques. Manifold, flexibles, vannes — tout doit être <b>dédié au CO₂</b>. Les valeurs exactes dépendent du point de fonctionnement et se lisent toujours dans la <b>documentation constructeur</b>, à faire valider.</p><p>Le diagramme <b>log p/h</b> (pression selon l'enthalpie) et les <b>tables de saturation</b> du CO₂ se lisent comme ceux de tout autre fluide — mêmes repères de bulle et de rosée — mais dans un domaine de pression qui lui est propre. C'est ce domaine particulier qui explique un comportement que les autres fluides n'ont pas : la formation de glace carbonique.</p><p>Avant de commencer une intervention sur un site au CO₂ ou à l'ammoniac, on prend un instant pour vérifier ce qui est déjà en place. La <b>signalisation</b> à l'entrée du local doit être visible et à jour. Les <b>issues de secours</b> doivent rester dégagées, jamais encombrées, pour permettre une évacuation rapide en cas de fuite. On contrôle aussi que les <b>capteurs</b> de gaz et les <b>alarmes</b> qui leur sont associées sont en état de marche, pas seulement présents dans le local.</p>",
   "blocs": [
    {
     "type": "piege",
     "t": "« A1 » ne veut pas dire « sans danger »",
     "html": "Le CO₂ est A1 du point de vue toxicité et inflammabilité — cela ne dit rien de ses deux vrais risques : la <b>pression</b>, et l'<b>anoxie</b> en local fermé (voir la fiche « CO₂ : deux dangers mortels »). Et le <b>B</b> de B2L signifie <b>toxique</b> : ne pas relâcher la vigilance sur l'ammoniac sous prétexte que son inflammabilité est faible."
    },
    {
     "type": "cle",
     "t": "La règle des catégories",
     "html": "Les catégories ne se remplacent pas les unes les autres. « Je suis A1, donc je peux donner un coup de main sur une fuite d'ammoniac » est <b>faux</b> : il faut la catégorie C, sans exception."
    },
    {
     "type": "piege",
     "t": "La glace carbonique, un double danger",
     "html": "<p>La fiche l'a déjà signalé : le CO₂ peut se solidifier à la détente. Ce solide a un nom : c'est la <b>glace carbonique</b>, aussi appelée <b>neige carbonique</b>. Elle se forme quand le CO₂ passe directement de l'état gazeux à l'état solide, à la détente à l'air libre. C'est le domaine de pression propre au CO₂, visible sur son diagramme log p/h, qui explique ce comportement que les fluides courants n'ont pas. On garde en tête le double danger à chaque détente de CO₂ à l'air libre : la <b>brûlure par le froid</b> au contact de la peau, et le <b>bouchon solide</b> qui peut obstruer une vanne ou une tuyauterie.</p>"
    },
    {
     "type": "cle",
     "t": "Le réflexe d'arrivée sur site",
     "html": "<p>Sur un site CO₂ ou ammoniac, on ne commence jamais le travail sans ce contrôle rapide : <b>signalisation</b> en place, <b>issues de secours</b> dégagées, <b>capteurs</b> et <b>alarmes</b> fonctionnels. Ce réflexe fait partie du travail, au même titre que le port du matériel de protection.</p>"
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
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions en matière d'étiquetage pour le R744 dans les systèmes et les récipients à pression",
     "groupe": "G13",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R744 (CO2)",
     "epreuve": {},
     "nouveau": true,
     "tirage_au_sort": false,
     "information": true,
     "evalue_en": [
      "B"
     ]
    },
    {
     "code": "13.04",
     "libelle": "Identifier les cylindres et matériels dédiés, et ne pas intervenir",
     "etat": "a_evaluer",
     "officiel": "Connaître les prescriptions en matière de sécurité pour les outils et équipements d'entretien, tels que la détection de gaz, la détection des fuites, les équipements de protection individuelle",
     "groupe": "G13",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R744 (CO2)",
     "epreuve": {},
     "nouveau": true,
     "tirage_au_sort": false,
     "information": true,
     "evalue_en": [
      "B"
     ]
    },
    {
     "code": "14.01",
     "libelle": "Reconnaître une installation NH₃ et la conduite à tenir",
     "etat": "a_evaluer",
     "officiel": "Lire et comprendre les diagrammes de tuyauterie et d'instrumentation des systèmes de réfrigération au R717 (NH3)",
     "groupe": "G14",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R717 (NH3)",
     "epreuve": {},
     "nouveau": true,
     "tirage_au_sort": false,
     "information": true,
     "evalue_en": [
      "C"
     ]
    },
    {
     "code": "1.09",
     "libelle": "Connaître les pressions élevées du CO₂, son diagramme log p/h, ses tables de saturation et le risque de glace carbonique.",
     "officiel": "Connaître la pression du CO2, le cycle transcritique ou subcritique, le diagramme log p/h, les tables de saturation du CO2, l'état d'agrégation du CO2 (formation de glace carbonique)",
     "groupe": "G1",
     "groupe_titre": "Législation et thermodynamique élémentaire",
     "epreuve": {},
     "nouveau": true,
     "tirage_au_sort": false,
     "information": true,
     "evalue_en": [
      "B"
     ]
    },
    {
     "code": "13.14",
     "libelle": "Vérifier avant d'intervenir que la signalisation, les issues de secours, les capteurs et les alarmes du site sont bien en état.",
     "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
     "groupe": "G13",
     "groupe_titre": "Installation et bonne pratique d'entretien des équipements et des systèmes tributaires du R744 (CO2)",
     "epreuve": {},
     "nouveau": true,
     "tirage_au_sort": false,
     "information": true,
     "evalue_en": [
      "B"
     ]
    }
   ],
   "liens": [
    {
     "vers": "cl4",
     "libelle": "Suite ▸ Se protéger du CO₂ — détection, ppm, EPC et EPI"
    },
    {
     "vers": "cfin",
     "libelle": "Bilan",
     "sec": true
    },
    {
     "vers": "c00",
     "libelle": "↺ Sommaire",
     "sec": true
    }
   ]
  },
  {
   "id": "rev-g1",
   "type": "examen",
   "titre": "Réviser — Les bases : pression, température, cycle",
   "dc": "Révision · G1",
   "examen": {
    "dc": [
     "G1"
    ],
    "n": 10,
    "seuil": 60
   }
  },
  {
   "id": "rev-g2",
   "type": "examen",
   "titre": "Réviser — Environnement et F-Gas",
   "dc": "Révision · G2",
   "examen": {
    "dc": [
     "G2"
    ],
    "n": 10,
    "seuil": 60
   }
  },
  {
   "id": "rev-g3",
   "type": "examen",
   "titre": "Réviser — Contrôles avant mise en service",
   "dc": "Révision · G3",
   "examen": {
    "dc": [
     "G3"
    ],
    "n": 5,
    "seuil": 60
   }
  },
  {
   "id": "rev-g4",
   "type": "examen",
   "titre": "Réviser — Contrôles d'étanchéité",
   "dc": "Révision · G4",
   "examen": {
    "dc": [
     "G4"
    ],
    "n": 10,
    "seuil": 60
   }
  },
  {
   "id": "rev-g5",
   "type": "examen",
   "titre": "Réviser — Récupération, charge, traçabilité",
   "dc": "Révision · G5",
   "examen": {
    "dc": [
     "G5"
    ],
    "n": 10,
    "seuil": 60
   }
  },
  {
   "id": "rev-g6",
   "type": "examen",
   "titre": "Réviser — Compresseur et circuit d'huile",
   "dc": "Révision · G6",
   "examen": {
    "dc": [
     "G6"
    ],
    "n": 10,
    "seuil": 60
   }
  },
  {
   "id": "rev-g7",
   "type": "examen",
   "titre": "Réviser — Condenseur",
   "dc": "Révision · G7",
   "examen": {
    "dc": [
     "G7"
    ],
    "n": 8,
    "seuil": 60
   }
  },
  {
   "id": "rev-g8",
   "type": "examen",
   "titre": "Réviser — Évaporateur",
   "dc": "Révision · G8",
   "examen": {
    "dc": [
     "G8"
    ],
    "n": 10,
    "seuil": 60
   }
  },
  {
   "id": "rev-g9",
   "type": "examen",
   "titre": "Réviser — Détendeur et accessoires",
   "dc": "Révision · G9",
   "examen": {
    "dc": [
     "G9"
    ],
    "n": 10,
    "seuil": 60
   }
  },
  {
   "id": "rev-g10",
   "type": "examen",
   "titre": "Réviser — Tuyauterie et brasage",
   "dc": "Révision · G10",
   "examen": {
    "dc": [
     "G10"
    ],
    "n": 6,
    "seuil": 60
   }
  },
  {
   "id": "rev-g11",
   "type": "examen",
   "titre": "Réviser — Substitution et efficacité",
   "dc": "Révision · G11",
   "examen": {
    "dc": [
     "G11"
    ],
    "n": 10,
    "seuil": 60
   }
  },
  {
   "id": "rev-g12",
   "type": "examen",
   "titre": "Réviser — Hydrocarbures",
   "dc": "Révision · G12",
   "examen": {
    "dc": [
     "G12"
    ],
    "n": 7,
    "seuil": 60
   }
  },
  {
   "id": "rev-g13",
   "type": "examen",
   "titre": "Réviser — CO₂ et NH₃",
   "dc": "Révision · G13",
   "examen": {
    "dc": [
     "G13"
    ],
    "n": 9,
    "seuil": 60
   }
  },
  {
   "id": "ex-ech",
   "acces": {
    "code_empreinte": 290777612,
    "niveau": 2
   },
   "type": "examen",
   "titre": "Échauffement — les fondamentaux (niveau 1)",
   "dc": "Entraînement · niveau 1 · A1 et A2",
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
    "niveau": 1,
    "n": 12,
    "seuil": 60
   }
  },
  {
   "id": "ex-defi",
   "acces": {
    "code_empreinte": 290777612,
    "niveau": 2
   },
   "type": "examen",
   "titre": "Défi technicien — diagnostics (niveau 2)",
   "dc": "Entraînement · niveau 2 · A1 et A2",
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
    "niveau": 2,
    "n": 15,
    "seuil": 80
   }
  },
  {
   "id": "ex-e-ech",
   "acces": {
    "code_empreinte": 290777612,
    "niveau": 2
   },
   "type": "examen",
   "titre": "Échauffement — catégorie E (niveau 1)",
   "dc": "Entraînement · niveau 1 · périmètre E",
   "examen": {
    "dc": [
     "G1",
     "G2",
     "G4",
     "G11"
    ],
    "niveau": 1,
    "n": 8,
    "seuil": 60
   }
  },
  {
   "id": "ex-d-ech",
   "acces": {
    "code_empreinte": 290777612,
    "niveau": 2
   },
   "type": "examen",
   "titre": "Échauffement — catégorie D (niveau 1)",
   "dc": "Entraînement · niveau 1 · périmètre D",
   "examen": {
    "dc": [
     "G1",
     "G2",
     "G5",
     "G11"
    ],
    "niveau": 1,
    "n": 8,
    "seuil": 60
   }
  },
  {
   "id": "ex-e",
   "acces": {
    "code_empreinte": 290777612,
    "niveau": 2
   },
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
   }
  },
  {
   "id": "ex-d",
   "acces": {
    "code_empreinte": 290777612,
    "niveau": 2
   },
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
   }
  },
  {
   "id": "ex-a2",
   "acces": {
    "code_empreinte": 290777612,
    "niveau": 2
   },
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
   }
  },
  {
   "id": "ex-a1",
   "acces": {
    "code_empreinte": 290777612,
    "niveau": 2
   },
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
   }
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
   ]
  }
 ]
};

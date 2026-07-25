/* SUPPORT DE PROJECTION — généré par build/parcours.mjs. NE PAS éditer à la main.
   Le contenu vient de cartes.js ; l'ordre vient de parcours.js. */
window.PILOTE_PROJECTION = {
 "parcours": {
  "id": "fluides-3-jours",
  "titre": "Habilitation fluides frigorigènes — parcours de formation",
  "sous_titre": "Trois jours de théorie, puis la préparation à la pratique"
 },
 "base_img": "packs/fluides/res/",
 "jours": [
  {
   "n": 1,
   "titre": "Pourquoi ce métier est réglementé, et de quoi on parle",
   "intention": "Poser le cadre et le vocabulaire. À la fin de la journée, le stagiaire sait ce que la loi lui impose, pourquoi elle l'impose, comment se nomment les fluides et comment fonctionne une machine frigorifique.",
   "sequences": [
    {
     "type": "cours",
     "fiche": "g0",
     "titre": "Ce que la loi vous impose",
     "minutes": 30,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Ce que la loi vous impose",
       "dc": "G1 · code 1.00",
       "competences": [
        {
         "code": "1.00",
         "lib": "Identifier les obligations légales de base liées aux fluides frigorigènes",
         "officiel": "Connaissance élémentaire de la législation de l'Union européenne et nationale applicable, notamment celle relative aux gaz à effet de serre fluoré, aux DEEE et à l'écoconception",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "D": "T",
          "E": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "point",
       "html": "Les fluides frigorigènes peuvent réchauffer le climat s'ils s'échappent dans l'air. Deux niveaux de loi encadrent votre métier : le niveau européen et le niveau français.",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "point",
       "html": "Au niveau européen, le texte de base est le <b>règlement (UE) 2024/573</b>. C'est un <b>règlement</b>, jamais une « directive » : il s'applique directement dans tous les pays de l'Union, sans loi française pour le recopier. Il a remplacé l'ancien règlement 517/2014.",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "point",
       "html": "Au niveau français, l'<b>arrêté du 21 novembre 2025</b> — un texte signé par un ministre — précise comment appliquer ce règlement sur le terrain.",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "point",
       "html": "Pour intervenir sur les fluides, il vous faut une <b>attestation d'aptitude</b> personnelle. Votre entreprise, elle, doit avoir une <b>attestation de capacité</b>. Ce sont deux papiers obligatoires, et ce n'est pas le même.",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "point",
       "html": "Chaque équipement a un <b>registre</b> : un carnet qui garde la trace de chaque intervention (charge, contrôle, fuite, réparation). C'est l'<b>exploitant</b> (le propriétaire ou l'utilisateur de la machine) qui doit le tenir à jour, sur papier ou sur ordinateur.",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "point",
       "html": "Quand l'équipement est trop vieux ou cassé, il part dans la filière <b>DEEE</b> (déchets d'équipements électriques et électroniques). Cette filière s'occupe de la carcasse de la machine, pas du fluide : vous devez le récupérer avant, à part.",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "point",
       "html": "Enfin, l'<b>écoconception</b> : dès la fabrication, les constructeurs doivent concevoir des appareils qui durent plus longtemps et qui polluent moins.",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qu'il faut retenir",
       "html": "<ul><li>Le texte européen est un <b>règlement</b> — (UE) 2024/573 — jamais une « directive ».</li><li><b>Attestation d'aptitude</b> : c'est pour vous, la personne.</li><li><b>Attestation de capacité</b> : c'est pour l'entreprise.</li><li><b>Registre</b> de l'équipement : tenu par l'exploitant, papier ou électronique.</li><li><b>DEEE</b> : la filière de fin de vie de la machine, pas du fluide.</li></ul>",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "L'erreur classique",
       "html": "<p>Apprendre par cœur un chiffre précis (seuil, date, délai) vu dans une ancienne fiche. Le régime des fluides a changé avec le <b>règlement (UE) 2024/573</b> et l'<b>arrêté du 21 novembre 2025</b>. Face à un chiffre, réflexe unique : vérifier le texte en vigueur, jamais le deviner.</p>",
       "titre": "Ce que la loi vous impose"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Partir du concret : demander qui, dans l'entreprise du stagiaire, détient l'attestation de capacité, et qui détient l'attestation d'aptitude. Insister à l'oral sur le mot RÈGLEMENT (jamais « directive ») : confusion fréquente, piège classique à l'examen. Ne pas s'attarder sur des chiffres précis : renvoyer systématiquement au texte en vigueur."
    },
    {
     "type": "cours",
     "fiche": "g2a",
     "titre": "Quarante ans d'histoire : de l'ozone au climat",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Quarante ans d'histoire : de l'ozone au climat",
       "dc": "G2 · code 2.01",
       "competences": [
        {
         "code": "2.01",
         "lib": "Situer l'histoire : couche d'ozone, protocoles, politique climat",
         "officiel": "Avoir une connaissance élémentaire de la politique de l'UE et internationale en matière de changement climatique, y compris la convention-cadre des Nations unies sur les changements climatiques (CCNUCC) et le Protocole de Montréal relatif à des substances qui appauvrissent la couche d'ozone",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "D": "T",
          "E": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/frise-histoire.svg",
       "alt": "Frise : CFC années 1930, trou d'ozone 1985, Montréal 1987, Kyoto 1997, Paris 2015, Kigali 2016, F-Gas III 2024.",
       "titre": "Quarante ans d'histoire : de l'ozone au climat"
      },
      {
       "type": "point",
       "html": "Dans les années 1930, les <b>CFC</b> sont des fluides « miracle » : stables, ni toxiques, ni inflammables. Cinquante ans plus tard, la facture arrive : en <b>1985</b>, on découvre le <b>trou dans la couche d'ozone</b> au-dessus de l'Antarctique — le chlore des CFC casse l'ozone qui filtre les <b>UV-B</b>. En <b>1987</b>, le <b>protocole de Montréal</b> organise leur sortie, puis celle des HCFC : la couche se répare, c'est le plus grand succès environnemental mondial.",
       "titre": "Quarante ans d'histoire : de l'ozone au climat"
      },
      {
       "type": "point",
       "html": "Mais les remplaçants, les <b>HFC</b>, inoffensifs pour l'ozone, sont de puissants gaz à effet de serre. Le combat change de terrain : <b>Kyoto</b> (1997) les inscrit parmi les six gaz visés, l'<b>accord de Paris</b> (2015) fixe le cap des +1,5 °C, et l'<b>amendement de Kigali</b> (2016) fait entrer les HFC… dans le protocole de Montréal. En Europe, le règlement <b>F-Gas</b> traduit tout cela en quotas, interdictions et obligations — celles de ton métier.",
       "titre": "Quarante ans d'histoire : de l'ozone au climat"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "L'effet de serre en deux phrases",
       "html": "Le rayonnement solaire entre, la Terre renvoie de l'infrarouge, et certains gaz (CO₂, vapeur d'eau, méthane…) retiennent cette chaleur. Cet effet est <b>vital</b> — sans lui, il ferait environ <b>−18 °C</b> au lieu de +15 : c'est son <b>renforcement</b> par nos émissions qui pose problème.",
       "titre": "Quarante ans d'histoire : de l'ozone au climat"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Ozone et climat : deux problèmes, pas un",
       "html": "L'<b>ODP</b> mesure l'attaque de l'ozone (affaire de <b>chlore et de brome</b>) ; le <b>PRP</b> mesure l'effet de serre. Un HFC a un ODP <b>nul</b> et un PRP <b>énorme</b> : excellent élève d'un côté, cancre de l'autre. Ne jamais confondre les deux bulletins.",
       "titre": "Quarante ans d'histoire : de l'ozone au climat"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Cette fiche se RACONTE — le miracle, la catastrophe invisible, le sursaut mondial, la rechute climatique. Question à lancer avant d'afficher quoi que ce soit : « pourquoi a-t-on interdit des fluides techniquement parfaits ? ». Le pivot à faire retenir : KIGALI — les HFC, qui ne touchent pas l'ozone, entrent quand même dans Montréal, parce que c'est le traité qui fonctionne. Lien direct avec la fiche suivante (PRP, quotas) : l'histoire explique la réglementation, la réglementation explique les gestes du métier."
    },
    {
     "type": "cours",
     "fiche": "g2",
     "titre": "Impact environnemental et F-Gas",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Impact environnemental et F-Gas",
       "dc": "G2 · codes 2.01 · 2.02",
       "competences": [
        {
         "code": "2.01",
         "lib": "Situer la politique climat internationale et européenne",
         "officiel": "Avoir une connaissance élémentaire de la politique de l'UE et internationale en matière de changement climatique, y compris la convention-cadre des Nations unies sur les changements climatiques (CCNUCC) et le Protocole de Montréal relatif à des substances qui appauvrissent la couche d'ozone",
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
         "lib": "Expliquer le PRP et les obligations du règlement (UE) 2024/573",
         "officiel": "Avoir une connaissance élémentaire du concept de « potentiel de réchauffement planétaire » (PRP), de l'utilisation des gaz à effet de serre fluorés et d'autres substances en tant que fluides frigorigènes, de l'incidence des émissions de gaz à effet de serre fluorés sur le climat (ordre de grandeur de leur PRP) ainsi que des dispositions correspondantes du règlement (UE) n° 2024/573 et des actes d'exécution pertinents, de même que des menaces éventuelles pour l'environnement, y compris celles issues des produits de décomposition de certaines substances fluorées (PFAS) tels que les HFC, HFO et HCFO",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "D": "T",
          "E": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/prp-echelle.svg",
       "alt": "Comparaison du PRP : CO2 = 1, R-32 = 675, R-410A = 2088, R-404A = 3922.",
       "titre": "Impact environnemental et F-Gas"
      },
      {
       "type": "point",
       "html": "Deux accords internationaux, deux problèmes différents. Le <b>protocole de Montréal</b> (1987) visait la <b>couche d'ozone</b> : il a fait disparaître les CFC puis les HCFC. La <b>convention climat</b> (Kyoto, Paris) vise le <b>réchauffement</b> : c'est elle qui s'attaque aux HFC, dont l'action sur l'ozone est nulle mais l'effet de serre considérable.",
       "titre": "Impact environnemental et F-Gas"
      },
      {
       "type": "point",
       "html": "Le <b>PRP</b> (potentiel de réchauffement planétaire, ou GWP) mesure cet effet, <b>par kilogramme</b>, en prenant le <b>CO₂ comme étalon : PRP = 1</b>. L'impact réel d'une installation, lui, dépend aussi de la charge : c'est la <b>tonne équivalent CO₂</b>.",
       "titre": "Impact environnemental et F-Gas"
      },
      {
       "type": "point",
       "html": "Le règlement <b>(UE) 2024/573</b> — dit F-Gas III — organise la réduction progressive des quantités de HFC mises sur le marché (<i>phase-down</i>), attribue des quotas aux producteurs et importateurs, et interdit certains usages.",
       "titre": "Impact environnemental et F-Gas"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Le calcul qui sert tous les jours",
       "html": "<b>tonnes éq. CO₂ = charge (kg) × PRP ÷ 1000</b><br>C'est cette valeur — pas le poids de fluide — qui déclenche une partie des obligations. Deux installations de même charge n'ont pas les mêmes contraintes si les fluides diffèrent.",
       "titre": "Impact environnemental et F-Gas"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "ODP et PRP ne se confondent pas",
       "html": "Un HFC a un <b>ODP nul</b> (il ne détruit pas l'ozone) et pourtant un <b>PRP fort</b>. Dire « il ne touche pas l'ozone, donc il est propre » est faux. Et un PRP bas ne veut pas dire zéro impact : la question des <b>PFAS</b> se pose désormais sur certains fluides à bas PRP.",
       "titre": "Impact environnemental et F-Gas"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire calculer l'équivalent CO₂ d'une machine de l'atelier, plaque signalétique en main : l'enjeu devient concret en trente secondes. Ne pas asséner les valeurs de PRP — les faire chercher sur la fiche du fluide. Relier explicitement à G4 et G5 : si le climat se joue sur les fuites, l'étanchéité et la récupération deviennent des gestes écologiques, pas des formalités."
    },
    {
     "type": "cours",
     "fiche": "g1a",
     "titre": "Unités, pression, thermodynamique utile",
     "minutes": 45,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Unités, pression, thermodynamique utile",
       "dc": "G1 · codes 1.01 · 1.02 · 1.04",
       "competences": [
        {
         "code": "1.01",
         "lib": "Utiliser les unités normalisées (température, pression, masse, énergie)",
         "officiel": "Connaître les unités normalisées ISO pour la température, la pression, la masse, la densité et l'énergie",
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
         "lib": "Expliquer la thermodynamique élémentaire du froid",
         "officiel": "Comprendre la théorie élémentaire des systèmes de réfrigération : thermodynamique élémentaire (terminologie, paramètres et processus essentiels tels que « surchauffe », « côté haute pression », « chaleur de compression », « enthalpie », « effet de réfrigération », « côté basse pression », « sous-refroidissement »), propriétés et transformations thermodynamiques des réfrigérants, y compris l'identification des mélanges zéotropiques et des états des fluides",
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
         "lib": "Décrire la fonction de chaque composant du circuit",
         "officiel": "Décrire la fonction des principales composantes du système (compresseur, évaporateur, condenseur, détendeurs thermostatiques) et les transformations thermodynamiques du réfrigérant",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "D": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/croix-frigoriste.svg",
       "alt": "La croix du frigoriste : détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas.",
       "titre": "Unités, pression, thermodynamique utile"
      },
      {
       "type": "point",
       "html": "Tout le métier tient sur un couple : <b>pression et température vont ensemble</b>. Chauffer un fluide enfermé fait monter sa pression ; abaisser sa pression le fait bouillir plus froid. C'est cette relation qu'on exploite d'un bout à l'autre du circuit.",
       "titre": "Unités, pression, thermodynamique utile"
      },
      {
       "type": "point",
       "html": "Quatre organes, dans l'ordre du cycle : le <b>compresseur</b> aspire la vapeur basse pression et la refoule en haute pression ; le <b>condenseur</b> évacue la chaleur et liquéfie ; le <b>détendeur</b> fait chuter la pression ; l'<b>évaporateur</b> absorbe la chaleur du milieu à refroidir. Basse pression du côté froid, haute pression du côté chaud.",
       "titre": "Unités, pression, thermodynamique utile"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "À retenir",
       "html": "<b>Surchauffe</b> : le fluide sort de l'évaporateur un peu plus chaud que sa température d'évaporation — elle protège le compresseur du liquide. Repère : <b>5 à 10 K</b>.<br><b>Sous-refroidissement</b> : le liquide sort du condenseur un peu plus froid que sa température de condensation — il garantit du liquide pur au détendeur. Repère : <b>4 à 8 K</b>.",
       "titre": "Unités, pression, thermodynamique utile"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le piège des manomètres",
       "html": "<b>Pression absolue = pression relative + environ 1 bar.</b> Un manomètre de service lit en relatif ; les tables de saturation, elles, sont souvent en absolu. Se tromper d'un bar, c'est se tromper de plusieurs kelvins sur la température de saturation — et diagnostiquer une fuite qui n'existe pas.",
       "titre": "Unités, pression, thermodynamique utile"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire lire un manomètre RÉEL et retrouver la température de saturation dans la table : c'est l'ancrage de tout le contrôle indirect qui viendra en G4. Tant que ce geste n'est pas acquis, inutile d'avancer. Pédagogie de la découverte : faire deviner ce qui se passe si on chauffe une bouteille fermée, avant d'énoncer la relation pression-température."
    },
    {
     "type": "cours",
     "fiche": "g1b",
     "titre": "Lire un log p-h et une table de saturation",
     "minutes": 45,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Lire un log p-h et une table de saturation",
       "dc": "G1 · code 1.03",
       "competences": [
        {
         "code": "1.03",
         "lib": "Lire et interpréter un diagramme log p-h et une table de saturation",
         "officiel": "Utiliser les tableaux et graphiques correspondants et les interpréter dans le cadre de contrôles d'étanchéité indirects (y compris le contrôle du bon fonctionnement du système) : diagramme log p/h, tables de saturation d'un réfrigérant, diagramme d'un cycle frigorifique simple à compression",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "E": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "1.06",
         "lib": "Situer les caractéristiques des fluides de substitution",
         "officiel": "Connaître le comportement spécifique, les paramètres physiques, les systèmes, les solutions, les déviances de tous les réfrigérants de substitution dans le cycle de réfrigération et les composants pour leur utilisation",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "D": "T",
          "E": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/lecture-table.svg",
       "alt": "La lecture croisée : manomètre + 1 bar, table de saturation du fluide, sonde de contact.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Une <b>table de saturation</b> donne, pour un fluide donné, la correspondance entre pression et température d'équilibre liquide-vapeur. Elle se lit dans les deux sens : je mesure une pression, j'en déduis une température ; je mesure une température, j'en déduis une pression.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Le <b>diagramme log p-h</b> est la même information, en image : la pression en ordonnée (échelle logarithmique), l'enthalpie en abscisse. Sous la cloche, le fluide est un mélange liquide + vapeur ; à gauche, il est liquide ; à droite, vapeur.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "C'est l'outil de la <b>méthode indirecte</b> : sans ouvrir le circuit, on compare ce qu'on mesure à ce que la table annonce.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "La méthode en trois gestes",
       "html": "1. Relever la <b>pression</b> au manomètre (et la convertir en absolu si besoin).<br>2. Lire la <b>température de saturation</b> correspondante dans la table du fluide.<br>3. Comparer à la <b>température réellement mesurée</b> sur le tube : l'écart, c'est la surchauffe (à l'aspiration) ou le sous-refroidissement (en sortie de condenseur).",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Un fluide, une table",
       "html": "Chaque fluide a sa propre table : la pression lue ne veut rien dire tant qu'on ne sait pas <b>quel fluide</b> est dans le circuit. On le vérifie sur la plaque signalétique et dans le registre, jamais « à la couleur de la bouteille ».",
       "titre": "Lire un log p-h et une table de saturation"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Fiche indispensable au parcours E : sans elle, la méthode indirecte est du bricolage. Utiliser FRIGOLO en projection, puis faire refaire la lecture sur une table papier — le passage de l'outil à la table imprimée est ce qui reste le jour de l'épreuve. Faire chercher : « la pression est plus basse que la table, qu'est-ce que ça peut vouloir dire ? » avant de donner « manque de charge »."
    },
    {
     "type": "cours",
     "fiche": "g1c",
     "titre": "Les familles de fluides et leurs codes",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Les familles de fluides et leurs codes",
       "dc": "G1 · codes 1.06 · 1.07",
       "competences": [
        {
         "code": "1.06",
         "lib": "Identifier la famille et les caractéristiques d'un fluide",
         "officiel": "Connaître le comportement spécifique, les paramètres physiques, les systèmes, les solutions, les déviances de tous les réfrigérants de substitution dans le cycle de réfrigération et les composants pour leur utilisation",
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
         "lib": "Décoder la nomenclature R-xyz et les séries de mélanges",
         "officiel": "Connaître les caractéristiques des hydrocarbures, du CO2, et du NH3 et des autres réfrigérants non fluorés par rapport aux réfrigérants à gaz à effet de serre fluorés",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "D": "T",
          "E": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/familles-fluides.svg",
       "alt": "Les cinq familles : CFC, HCFC, HFC, HFO et naturels, avec leur composition atomique.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "point",
       "html": "Derrière chaque code se cache une <b>molécule</b>, et trois atomes y décident de tout : le <b>chlore</b> détruit l'ozone — c'est lui qui a condamné les CFC puis les HCFC ; le <b>fluor</b> rend la molécule stable, donc durable dans l'atmosphère, donc à fort effet de serre ; l'<b>hydrogène</b> raccourcit la durée de vie. Les <b>HFC</b> ont éliminé le chlore (ozone sauvé), gardé le fluor (climat pénalisé). Les <b>HFO</b> ajoutent une double liaison fragile : la molécule casse en quelques jours, PRP ≈ 1. Les <b>naturels</b> — propane, isobutane, ammoniac, CO₂ — existent sans chimie de synthèse, chacun avec son revers : inflammabilité, toxicité ou pression.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "point",
       "html": "Et le numéro n'est pas un matricule : il <b>décrit la molécule</b>. Centaines + 1 = carbone, dizaines − 1 = hydrogène, unités = fluor — les liaisons restantes sont du chlore. Les mélanges et les fluides inorganiques ont leurs séries : 4xx, 5xx, 6xx, 7xx.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "L'astuce du + 90",
       "html": "Ajoute 90 au code, et tu lis directement C, H, F : <b>134 + 90 = 224</b> → C₂H₂F₄ (R-134a). <b>22 + 90 = 112</b> → C·H·F₂… plus un <b>chlore</b> pour compléter : CHClF₂ — voilà pourquoi le R-22 est un HCFC interdit. <b>290 + 90 = 380</b> → C₃H₈ : le propane, zéro fluor, zéro chlore.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le code dit la molécule, pas le danger",
       "html": "R-32 et R-290 se ressemblent sur l'étiquette — l'un est A2L, l'autre A3. La famille chimique dit l'<b>impact environnemental</b> ; la classe NF EN 378 dit le <b>risque de manipulation</b>. Il faut les deux lectures, à chaque fois.",
       "titre": "Les familles de fluides et leurs codes"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire décoder AU TABLEAU deux ou trois codes avant de donner la règle : R-32, R-290, R-744 — le groupe trouve la logique lui-même, elle se retient dix fois mieux. L'astuce du +90 fait mouche à tous les coups. Point d'attention : le R-22 est le meilleur exemple pédagogique (le chlore « caché » dans les liaisons restantes explique son interdiction). Relier à la carte d'identité interactive : chaque stagiaire décode un fluide puis vérifie."
    },
    {
     "type": "cours",
     "fiche": "g13",
     "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir",
       "dc": "G13 · G14 · information et sensibilisation",
       "competences": [
        {
         "code": "13.01",
         "lib": "Reconnaître une installation CO₂ et ses risques (pression)",
         "officiel": "Connaître les prescriptions en matière d'étiquetage pour le R744 dans les systèmes et les récipients à pression",
         "epreuve": {},
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "13.04",
         "lib": "Identifier les cylindres et matériels dédiés, et ne pas intervenir",
         "officiel": "Connaître les prescriptions en matière de sécurité pour les outils et équipements d'entretien, tels que la détection de gaz, la détection des fuites, les équipements de protection individuelle",
         "epreuve": {},
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "14.01",
         "lib": "Reconnaître une installation NH₃ et la conduite à tenir",
         "officiel": "Lire et comprendre les diagrammes de tuyauterie et d'instrumentation des systèmes de réfrigération au R717 (NH3)",
         "epreuve": {},
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "point",
       "html": "Ce module <b>informe</b>, il ne qualifie pas. Une attestation A1 ou A2 ne donne <b>aucun droit d'intervention</b> sur une installation au CO₂ (catégorie B) ou à l'ammoniac (catégorie C). Ce qu'on attend ici : <b>reconnaître</b> et <b>ne pas toucher</b>.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "<b>CO₂ (R-744)</b> — classé <b>A1</b> : ni toxique ni inflammable, <b>PRP = 1</b>. Son danger est ailleurs : la <b>pression</b>, très élevée, et le risque de <b>neige carbonique</b> à la détente (brûlure par le froid, obstruction). En transcritique, le condenseur laisse la place à un <b>refroidisseur de gaz</b>. Les cylindres, à double vanne, ne se raccordent pas au matériel courant.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "<b>Ammoniac (R-717)</b> — classé <b>B2L</b> : <b>toxique</b> et faiblement inflammable. Fluide du froid industriel (agroalimentaire, entrepôts), jamais du résidentiel. Son odeur piquante alerte bien avant le seuil dangereux. En cas de fuite : <b>alerter, évacuer, ne jamais intervenir seul</b>.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "« A1 » ne veut pas dire « sans danger »",
       "html": "Le CO₂ est A1 du point de vue toxicité et inflammabilité — cela ne dit rien de la pression, qui est son vrai risque. Et le <b>B</b> de B2L signifie <b>toxique</b> : ne pas relâcher la vigilance sur l'ammoniac sous prétexte que son inflammabilité est faible.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "La règle des catégories",
       "html": "Les catégories ne se remplacent pas les unes les autres. « Je suis A1, donc je peux donner un coup de main sur une fuite d'ammoniac » est <b>faux</b> : il faut la catégorie C, sans exception.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      }
     ],
     "questions": [
      {
       "id": "pk-g13-1",
       "dc": "G13",
       "code": "13.01",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Le CO₂ (R-744) est classé A1. Quel est son principal danger ?",
       "choix": [
        "La pression, très élevée dans les installations au CO₂.",
        "La toxicité, le CO₂ étant dangereux à respirer même à faible dose.",
        "L'inflammabilité, car il peut s'enflammer comme un hydrocarbure.",
        "Aucun danger particulier : la classe A1 signifie qu'il est totalement sans danger."
       ],
       "bonne": 0,
       "aide": "A1 renseigne sur deux critères précis. Lesquels ? Et qu'est-ce que cela ne dit pas ?",
       "remed": {
        "regle": "Le CO₂ est classé A1 (ni toxique ni inflammable), mais son danger principal est la pression, très élevée dans ces installations.",
        "pourquoi": "La classification A1/A2L/A2/A3/B1/B2L ne décrit que deux risques : la toxicité et l'inflammabilité. Elle ne dit rien sur la pression de service, qui est le point critique du CO₂.",
        "piege": "Croire que « A1 » veut dire « sans danger ». Ce n'est vrai que pour la toxicité et l'inflammabilité, pas pour la pression."
       },
       "remediation_vers": "g13",
       "explication": "Le CO₂ est classé A1 (ni toxique ni inflammable), mais son danger principal est la pression, très élevée dans ces installations.",
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
        "piege": "Confondre le CO₂ avec l'ammoniac en lui prêtant une toxicité qu'il n'a pas, ou croire qu'un raccord HFC classique peut convenir « pour une fois »."
       },
       "remediation_vers": "g13",
       "explication": "Les cylindres de CO₂ sont à double vanne : ils ne se raccordent pas au matériel courant.",
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
      }
     ],
     "notes": "Module volontairement court et NON évaluant : l'objectif est la reconnaissance du danger, pas la compétence d'intervention. Faire circuler un masque à gaz réel (sans manipulation dangereuse) pour que la différence avec les EPI habituels se voie. Rappeler que l'odeur d'ammoniac est perceptible bien avant le seuil dangereux : message rassurant qui évite la panique tout en imposant l'alerte. Faire deviner pourquoi le NH₃ exige une catégorie séparée alors que le R-290, également dangereux, reste dans le champ A1/A2."
    },
    {
     "type": "cours",
     "fiche": "g11",
     "titre": "Substitution et efficacité énergétique",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Substitution et efficacité énergétique",
       "dc": "G11 · codes 1.08 · 11.01 → 11.05",
       "competences": [
        {
         "code": "1.08",
         "lib": "Situer combustibilité, propagation de flamme et limites de charge",
         "officiel": "Connaître la combustibilité, la propagation des flammes, les restrictions relatives à la capacité de charge, les limites d'occupation pour les HFC, H(C)FO et hydrocarbures",
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
         "lib": "Connaître les technologies de substitution et leur manipulation sans danger",
         "officiel": "Connaître les technologies de substitution pertinentes permettant de remplacer les gaz à effet de serre fluorés ou d'en réduire l'utilisation, et savoir les manipuler sans danger",
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
         "lib": "Appliquer les règles de sécurité pour fluides inflammables, toxiques ou haute pression",
         "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "11.02",
         "lib": "Expliquer la conception à charge réduite et l'efficacité",
         "officiel": "Connaître les systèmes de conception pertinents afin de réduire la charge des gaz à effet de serre fluorés et d'augmenter l'efficacité énergétique",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "11.04",
         "lib": "Comparer les fluides de substitution selon l'application",
         "officiel": "Comprendre les avantages et inconvénients respectifs, notamment en ce qui concerne l'efficacité énergétique, des réfrigérants de substitution en fonction de leur application prévue et des conditions climatiques des différentes régions",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "11.05",
         "lib": "Situer les différences de conception des systèmes aux hydrocarbures",
         "officiel": "Connaître les différences de conception des composants et des systèmes pour les équipements et les systèmes tributaires des hydrocarbures",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "D": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/classes-securite.svg",
       "alt": "Matrice des classes NF EN 378 : CO2 en A1, R-32 et R-1234yf en A2L, R-290 en A3, NH3 en B2L.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "Remplacer un fluide à fort PRP se fait dans deux directions : les <b>fluides naturels</b> (CO₂, ammoniac, hydrocarbures) et les fluides de synthèse à faible PRP (<b>HFO</b>, HFC bas PRP). Il n'existe <b>pas de fluide universel</b> : le choix dépend de l'application, du climat, et de la sécurité du site.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "La <b>classe de sécurité NF EN 378</b> commande tout le reste — EPI, zonage, détection, charge admissible dans le local : <b>A1</b> (CO₂), <b>A2L</b> (R-32, R-1234yf), <b>A3</b> (R-290), <b>B2L</b> (NH₃).",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "Une classe ne dit pas seulement « ça brûle ou non ». Elle décrit la <b>combustibilité</b> et la <b>propagation de la flamme</b> : un <b>A2L</b> brûle difficilement et la flamme se propage lentement, un <b>A3</b> s'enflamme facilement et la flamme court vite. De là découlent une <b>charge maximale</b> admissible et des <b>limites d'occupation</b> du local — plus le local est petit ou recevant du public, plus la charge autorisée est faible. Ces valeurs se déterminent selon la <b>NF EN 378</b> et la doc constructeur, <b>jamais à l'estime</b>.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "Le stockage et le transport des fluides <b>inflammables</b>, <b>toxiques</b> ou à <b>haute pression</b> obéissent chacun à des règles propres. Et lorsqu'un site ne peut pas respecter les exigences de l'<b>annexe IV du règlement (UE) 2024/573</b> pour des raisons de <b>sécurité</b>, des équipements dérogatoires restent permis : c'est une exception encadrée, qui se justifie par écrit, pas un passe-droit.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "Côté énergie, le <b>COP</b> est le rapport de la puissance frigorifique produite à la puissance électrique consommée. On l'améliore en <b>rapprochant</b> la température de condensation de celle d'évaporation : condenseur propre, échangeurs bien dimensionnés, réglages justes. Réduire la charge, enfin, améliore à la fois la sécurité et le rendement.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Drop-in ou retrofit ?",
       "html": "<b>Drop-in</b> : on change le fluide sans modifier l'installation.<br><b>Retrofit</b> : on change le fluide <b>et</b> ce qu'il faut adapter — huile, détendeur, joints. Annoncer un drop-in là où il faut un retrofit, c'est préparer une panne.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le piège de l'année",
       "html": "<b>Le R-290 est A3</b>, pas A2L. Tout hydrocarbure est très inflammable. Se tromper de classe, c'est se tromper d'EPI, de matériel électrique et de charge admissible. À l'inverse, le <b>CO₂ est A1</b> : ni toxique ni inflammable — son danger est la <b>pression</b>.",
       "titre": "Substitution et efficacité énergétique"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Avant de donner le tableau des classes, demander aux stagiaires de classer eux-mêmes CO₂, NH₃, R-290 et R-1234yf par intuition « je m'en méfie / pas de souci », puis confronter à la norme : l'écart entre l'intuition et la classification est le meilleur levier de mémorisation. Comparer en atelier un détecteur adapté aux hydrocarbures et un détecteur HFC classique."
    },
    {
     "type": "cours",
     "fiche": "g1d",
     "titre": "Les organes qui trahissent une fuite",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Les organes qui trahissent une fuite",
       "dc": "G1 · code 1.05",
       "competences": [
        {
         "code": "1.05",
         "lib": "Relier chaque organe courant du circuit à son rôle dans la prévention ou la détection d'une fuite",
         "officiel": "Connaître le fonctionnement élémentaire des composantes suivantes utilisées dans un système de réfrigération ainsi que leur rôle et leur importance dans la prévention et la détection des fuites de réfrigérant : a) valves (robinets à boule, diaphragmes, robinets à soupape) ; b) contrôles de la température et de la pression ; c) repères transparents et indicateurs d'humidité ; d) contrôles du dégivrage ; e) protecteurs du système ; f) instruments de mesure tels que les thermomètres ; g) systèmes de contrôle de l'huile ; h) réservoirs ; i) séparateurs de liquides et d'huile, en tenant compte des spécificités du fonctionnement comportant des réfrigérants hautement inflammables ou toxiques (hydrocarbures ou NH3) et des réfrigérants fonctionnant à haute pression (CO2)",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/points-de-fuite.svg",
       "alt": "Sur le circuit, les organes qui alertent ou protègent avant, pendant et après une fuite.",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "Une fuite ne se voit pas toujours de face. Mais plusieurs organes du circuit la <b>trahissent</b> : ils changent d'aspect, se mettent en sécurité, ou limitent les dégâts. Les repérer, c'est déjà commencer le diagnostic.",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "Sur les fluides très inflammables ou toxiques (hydrocarbures, ammoniac) et sur le CO₂, qui travaille à haute pression, ces mêmes organes existent mais avec des exigences renforcées propres à chaque fluide.",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "<ul><li><b>a) Les valves.</b> Le <b>robinet à boule</b> et le <b>robinet à soupape</b> isolent une portion de circuit ; leur presse-étoupe (la bague qui serre la tige de manœuvre) est un point de fuite classique. Le <b>robinet à diaphragme</b> n'a pas cette tige : une membrane souple assure l'étanchéité, donc moins d'usure. La <b>vanne électromagnétique</b>, dite <b>solénoïde</b>, s'ouvre et se ferme électriquement ; elle isole la réserve de fluide en cas d'arrêt. La <b>vanne 4 voies</b> inverse le sens du cycle (froid ↔ chaud) : beaucoup de raccords brasés et une pièce mobile interne, donc plusieurs points à surveiller.</li><li><b>b) Les contrôles de température et de pression.</b> Le <b>thermostat</b> pilote le compresseur selon la température. Le <b>pressostat de régulation</b> fait pareil selon la pression : il coupe et relance en fonctionnement normal — à ne pas confondre avec le <b>pressostat de sécurité</b>, qui protège contre une pression anormale (détail ci-dessous). Un pressostat de régulation qui coupe trop tôt peut signaler un manque de charge, donc une fuite.</li><li><b>c) Le voyant liquide et la pastille d'humidité.</b> Le <b>voyant liquide</b> est un hublot sur la ligne liquide. En <b>régime stable</b> (l'installation tourne depuis un moment), il doit rester net, sans bulle. Des <b>bulles qui persistent</b> montrent un manque de charge — souvent une fuite. La <b>pastille d'humidité</b>, intégrée au voyant, change de couleur selon l'eau présente dans le circuit ; la grille de lecture est propre à chaque fabricant, selon la fiche constructeur.</li><li><b>d) Les contrôles du dégivrage.</b> Ils déclenchent et arrêtent le dégivrage de l'évaporateur. Un givre anormal — pas symétrique, ou qui ne part jamais complètement — n'est pas toujours un problème de dégivrage : ça peut être un manque de fluide qui prive une partie de la batterie.</li><li><b>e) Les protecteurs du système.</b> Protection thermique du compresseur, <b>soupape de sécurité</b>, pressostat de sécurité (vu plus haut) : ils empêchent qu'une anomalie ne tourne à la casse. Une soupape de sécurité qui s'ouvre relâche elle-même du fluide dans l'atmosphère : une fuite volontaire, réglée pour l'urgence, à contrôler selon la fiche constructeur.</li><li><b>f) Les instruments de mesure.</b> Un <b>thermomètre</b> à pince ou à contact mesure la température réelle d'un tube. Comparé à la table de saturation (revoir G1 · code 1.03), l'écart donne la surchauffe ou le sous-refroidissement : c'est la méthode indirecte, sans ouvrir le circuit.</li><li><b>g) Les systèmes de contrôle de l'huile.</b> Un <b>voyant d'huile</b> sur le compresseur montre le niveau et l'aspect de l'huile. Un niveau qui baisse sans explication doit alerter : l'huile se mélange au fluide et s'échappe avec lui par une fuite — même logique que la trace d'huile sous un raccord (déjà vue en G4).</li><li><b>h) Les réservoirs.</b> La <b>bouteille de liquide</b> stocke le fluide condensé avant le détendeur. Plusieurs raccords (entrée, sortie, vanne de service) : autant de points à contrôler. L'isoler avant une intervention limite la quantité de fluide qui pourrait fuir.</li><li><b>i) Les séparateurs de liquide et d'huile.</b> Le <b>séparateur de liquide</b>, sur l'aspiration, retient le liquide résiduel pour éviter un <b>coup de liquide</b> au compresseur (il aspire du liquide au lieu de vapeur : casse immédiate, le liquide ne se comprime pas). Le <b>séparateur d'huile</b>, sur le refoulement, retient l'huile entraînée par le gaz chaud et la renvoie au compresseur.</li></ul>",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Où les trouver sur la croix du frigoriste",
       "html": "Détendeur à gauche, compresseur à droite, condenseur en haut, évaporateur en bas. Le <b>séparateur d'huile</b> se loge juste à la sortie du compresseur, côté droit, sur le refoulement. Le <b>réservoir</b> et le <b>voyant liquide</b> se trouvent sur la ligne liquide, entre le condenseur (haut) et le détendeur (gauche) — juste avant le détendeur. Le <b>séparateur de liquide</b> se loge juste avant l'entrée du compresseur, côté droit, sur l'aspiration.",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Deux pressostats, pas un",
       "html": "Le <b>pressostat de régulation</b> pilote le fonctionnement normal : il coupe et relance le compresseur. Le <b>pressostat de sécurité</b> protège contre une pression anormale ; il n'est pas fait pour cycler en continu. Les confondre désactive une protection sans que ça se voie. Et avant toute intervention sur une vanne solénoïde, un thermostat ou un pressostat : <b>consignation électrique</b>, ce sont des organes électriques.",
       "titre": "Les organes qui trahissent une fuite"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Neuf organes d'un coup : les répartir en quatre familles pour ne pas noyer le groupe — CE QU'ON VOIT (voyant, pastille), CE QUI PILOTE (thermostat, pressostats, dégivrage), CE QUI PROTÈGE (protecteurs, séparateurs) et CE QUI STOCKE (réservoir). Sur une machine d'atelier, coffret électrique CONSIGNÉ, faire toucher du doigt chaque organe plutôt que projeter une liste. Ce code est déjà interrogé ailleurs dans le pack (voyant liquide, vanne solénoïde, vanne 4 voies, pressostat de régulation) sans qu'aucune fiche ne l'enseigne : insister particulièrement sur ces quatre-là. Pédagogie de la découverte : montrer une photo de voyant avec des bulles et demander « fuite ou pas, et pourquoi » avant de donner la réponse."
    },
    {
     "type": "bilan",
     "fiche": "ex-ech",
     "titre": "Échauffement — les fondamentaux (niveau 1)",
     "minutes": 25,
     "slides": [
      {
       "type": "titre",
       "titre": "Échauffement — les fondamentaux (niveau 1)",
       "dc": "Entraînement · niveau 1 · A1 et A2",
       "competences": []
      }
     ],
     "questions": [],
     "notes": "Tirage limité aux questions de niveau 1 (définitions, rôles, gestes de base), seuil abaissé à 60 % : c'est un test de démarrage, pas un examen. À proposer en début de formation pour positionner, puis en milieu de parcours pour mesurer le chemin parcouru."
    }
   ]
  },
  {
   "n": 2,
   "titre": "Le circuit et ses organes",
   "intention": "Chaque organe : à quoi il sert, comment on l'installe, comment on le règle, comment on vérifie qu'il fonctionne. Les quatre composants se travaillent — un seul sera tiré au sort à l'épreuve, et le candidat ne saura pas lequel.",
   "sequences": [
    {
     "type": "cours",
     "fiche": "g6",
     "titre": "Le compresseur",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Le compresseur",
       "dc": "G6 · codes 6.01 · 6.03 · 6.05 · 6.07",
       "competences": [
        {
         "code": "6.01",
         "lib": "Expliquer le principe du compresseur et ses risques de fuite",
         "officiel": "Expliquer le principe de fonctionnement d'un compresseur (y compris le réglage de la puissance et le circuit de lubrification) et les risques de fuite ou d'émission de réfrigérant qui y sont liés",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "6.03",
         "lib": "Régler les interrupteurs de sécurité et de contrôle",
         "officiel": "Régler les interrupteurs de sécurité et de contrôle",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "6.05",
         "lib": "Vérifier le retour d'huile",
         "officiel": "Vérifier le circuit de retour de l'huile",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "6.07",
         "lib": "Rédiger un rapport d'état",
         "officiel": "Rédiger un rapport sur l'état du compresseur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/compresseurs.svg",
       "alt": "Coupe animée d un compresseur à piston et les quatre technologies : piston, scroll, vis, rotatif.",
       "titre": "Le compresseur"
      },
      {
       "type": "point",
       "html": "Le compresseur est le <b>seul organe actif</b> du cycle : il aspire la vapeur basse pression et la refoule en haute pression. Tout le reste est passif.",
       "titre": "Le compresseur"
      },
      {
       "type": "point",
       "html": "Ses points de fuite privilégiés : <b>raccords, vannes de service, presse-étoupe, bornes de traversée</b> sur les hermétiques. Ses sécurités — pressostats HP et BP, protection thermique — se règlent <b>selon la fiche constructeur</b>, jamais à l'estime.",
       "titre": "Le compresseur"
      },
      {
       "type": "point",
       "html": "L'<b>huile</b> lubrifie, refroidit et assure l'étanchéité interne. Elle circule avec le fluide et doit <b>revenir</b> : un retour d'huile défaillant est une cause fréquente de panne prématurée, et souvent le premier signe visible d'un problème de conception des lignes.",
       "titre": "Le compresseur"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce que dit une température de refoulement",
       "html": "Un refoulement anormalement chaud oriente vers un <b>manque de fluide</b>, une <b>surchauffe excessive</b> ou un <b>mauvais retour d'huile</b>. Trois causes, un seul symptôme : on croise avec les autres relevés avant de conclure.",
       "titre": "Le compresseur"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Geste interdit",
       "html": "<b>Consignation électrique</b> avant toute intervention sur les sécurités ou les raccords du compresseur. Et un compresseur à l'arrêt peut rester <b>sous pression</b> longtemps : on ne le dépose jamais sans avoir vérifié.",
       "titre": "Le compresseur"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Rappeler que le composant est TIRÉ AU SORT à l'épreuve : les quatre modules se travaillent. Faire repérer les organes de sécurité sur un compresseur d'atelier, coffret ouvert et CONSIGNÉ. Pédagogie de la découverte : faire mesurer une surchauffe anormalement élevée sans donner la cause, laisser remonter vers l'hypothèse retour d'huile ou clapet usé."
    },
    {
     "type": "cours",
     "fiche": "g6b",
     "titre": "Compresseur — installer, régler, vérifier",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Compresseur — installer, régler, vérifier",
       "dc": "G6 · codes 6.02 · 6.04 · 6.06 · 6.08",
       "competences": [
        {
         "code": "6.02",
         "lib": "Installer un compresseur et ses sécurités sans provoquer de fuite",
         "officiel": "Installer correctement un compresseur, y compris le matériel de contrôle et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produisent une fois le système en fonctionnement",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "6.04",
         "lib": "Régler les soupapes d'aspiration selon la fiche constructeur",
         "officiel": "Régler les soupapes d'aspiration",
         "epreuve": {
          "A1": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "6.06",
         "lib": "Démarrer, arrêter et contrôler un compresseur par la mesure",
         "officiel": "Mettre en marche et arrêter un compresseur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "6.08",
         "lib": "Connaître les leviers d'efficacité énergétique du compresseur",
         "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance des compresseurs",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/compresseurs.svg",
       "alt": "Compresseur en coupe : soupape d'aspiration, cylindre, sortie vers le refoulement.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Ce cours prolonge la fiche sur le compresseur. Il explique le geste : comment on l'<b>installe</b>, comment on <b>règle</b> ses soupapes, comment on le <b>démarre</b>, l'<b>arrête</b> et le <b>contrôle</b>.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Une fois en marche, l'installation ne doit provoquer <b>aucune fuite</b>. Avant la toute première mise en service, on teste l'étanchéité de tout le circuit à l'<b>azote</b> — jamais à l'oxygène, jamais à l'air comprimé — à la pression indiquée par la norme applicable. Les appareils de contrôle et de sécurité (ils surveillent le compresseur et le coupent en cas d'anomalie) s'installent <b>en même temps</b> que lui, pas après coup.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "La <b>soupape d'aspiration</b> est le clapet qui laisse entrer la vapeur basse pression dans le compresseur à chaque cycle. Son réglage suit <b>toujours</b> la fiche constructeur : une soupape mal réglée fait perdre de la puissance, ou abîme le compresseur.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Au <b>démarrage</b>, on vérifie le niveau d'huile et les vannes, puis on met sous tension. Pendant que le compresseur tourne, on relève les pressions, la <b>surchauffe</b> (repère : 5 à 10 K) et le <b>sous-refroidissement</b> (repère : 4 à 8 K). À l'<b>arrêt</b>, on suit la procédure inverse, sans geste brusque.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Ces bons gestes sont aussi des gestes d'<b>efficacité énergétique</b> : un compresseur bien installé, bien réglé et bien entretenu consomme moins et dure plus longtemps.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Le test qui doit précéder la mise en service",
       "html": "Avant de mettre un compresseur neuf sous tension, on vérifie que le circuit ne fuit pas, avec un essai à l'<b>azote</b>. Ce n'est qu'après ce contrôle que l'installation répond au code 6.02 : « aucune fuite ni aucune émission ».",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Geste interdit",
       "html": "<b>Consignation électrique</b> (couper et verrouiller l'alimentation) avant toute intervention sur les soupapes ou les sécurités. Un réglage de soupape ne s'improvise jamais : toujours <b>selon la fiche constructeur</b>, jamais « à l'oreille ».",
       "titre": "Compresseur — installer, régler, vérifier"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Carte complémentaire de g6 : ici, le geste plutôt que la théorie. Faire manipuler une vraie fiche constructeur pour montrer que le réglage des soupapes (6.04) ne s'invente jamais — c'est le réflexe à ancrer, plus utile qu'un chiffre mémorisé. Sur un compresseur d'atelier CONSIGNÉ, faire dérouler la procédure complète : contrôle avant mise en marche, relevés en fonctionnement, arrêt propre. Le réglage des soupapes (6.04) n'est évalué en pratique qu'en catégorie A1 — les stagiaires visant seulement A2 peuvent s'en tenir aux principes. Le code 6.08 est nouveau et seulement théorique : un temps d'échange suffit (propreté des échangeurs, charge correcte, surchauffe bien réglée) plutôt qu'une démonstration. Relier à g7 pour la suite du parcours."
    },
    {
     "type": "cours",
     "fiche": "g7",
     "titre": "Le condenseur",
     "minutes": 30,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Le condenseur",
       "dc": "G7 · codes 7.01 · 7.04 · 7.06 · 7.08",
       "competences": [
        {
         "code": "7.01",
         "lib": "Expliquer le principe du condenseur et ses risques de fuite",
         "officiel": "Expliquer le principe de fonctionnement d'un condenseur et les risques de fuite qui y sont associés",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "7.04",
         "lib": "Régler les interrupteurs de sécurité et de contrôle",
         "officiel": "Régler les interrupteurs de sécurité et de contrôle",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "7.06",
         "lib": "Purger les incondensables",
         "officiel": "Extraire les gaz non condensables du condenseur à l'aide d'un appareil de purge pour système de réfrigération",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "7.08",
         "lib": "Inspecter la surface d'échange",
         "officiel": "Inspecter la surface du condenseur",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/echangeur-air.svg",
       "alt": "Le condenseur à air : l air ambiant traverse la batterie poussé par le ventilateur et ressort réchauffé.",
       "titre": "Le condenseur"
      },
      {
       "type": "point",
       "html": "Le condenseur <b>évacue vers l'extérieur</b> la chaleur prise dans l'évaporateur, plus celle apportée par la compression. La vapeur haute pression s'y refroidit, se liquéfie, puis se <b>sous-refroidit</b> : <b>4 à 8 K</b> en sortie, pour garantir du liquide pur au détendeur.",
       "titre": "Le condenseur"
      },
      {
       "type": "point",
       "html": "Sur un condenseur à air, les <b>ventilateurs</b> forcent l'air à travers la batterie. Une batterie encrassée, un ventilateur à l'arrêt, et la haute pression monte : la machine consomme plus, et le pressostat HP finit par couper.",
       "titre": "Le condenseur"
      },
      {
       "type": "point",
       "html": "Les <b>incondensables</b> (air entré lors d'une intervention mal faite) se purgent <b>à l'arrêt</b>, installation froide, avec récupération — jamais fluide en mouvement.",
       "titre": "Le condenseur"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Deux pressostats, deux fonctions",
       "html": "Le pressostat de <b>sécurité</b> coupe le compresseur pour protéger l'installation. Le pressostat de <b>régulation</b> pilote le ventilateur pour tenir la pression de condensation. Deux rôles, deux réglages — et les valeurs se prennent sur la doc constructeur.",
       "titre": "Le condenseur"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Propreté = énergie",
       "html": "Une batterie sale n'est pas un problème esthétique : c'est une haute pression plus élevée, un compresseur qui force et une facture qui monte. L'inspection visuelle de la surface fait partie du contrôle, pas de l'entretien optionnel.",
       "titre": "Le condenseur"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire mesurer HP, BP et sous-refroidissement AVANT de donner la plage attendue, puis confronter au repère 4-8 K. La purge des incondensables se fait sur poste dédié, avec récupération, sous consigne stricte. Rappeler à chaque séance : jamais d'oxygène ni d'air comprimé pour un contrôle d'étanchéité — en présence d'huile, c'est un risque d'explosion."
    },
    {
     "type": "cours",
     "fiche": "g7b",
     "titre": "Condenseur — installer, régler, vérifier",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Condenseur — installer, régler, vérifier",
       "dc": "G7 · codes 7.02 · 7.03 · 7.05 · 7.07 · 7.09 · 7.10",
       "competences": [
        {
         "code": "7.02",
         "lib": "Régler le régulateur de pression du condenseur",
         "officiel": "Mettre au point le régulateur de pression de sortie du condenseur",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "7.03",
         "lib": "Installer un condenseur sans risque de fuite",
         "officiel": "Installer correctement un condenseur/une unité extérieure y compris le matériel de réglage et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produise une fois que le système fonctionnera",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "7.05",
         "lib": "Inspecter les conduites de refoulement et de liquide",
         "officiel": "Inspecter les conduites de refoulement et de liquide",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "7.07",
         "lib": "Démarrer, mesurer et arrêter un condenseur",
         "officiel": "Mettre en marche et arrêter un condenseur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "7.09",
         "lib": "Rédiger un rapport d'état du condenseur",
         "officiel": "Rédiger un rapport sur l'état du condenseur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "7.10",
         "lib": "Entretenir un condenseur pour économiser l'énergie",
         "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance des condenseurs",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/echangeur-air.svg",
       "alt": "Schéma d'un condenseur à air, unité extérieure.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Le <b>condenseur</b> transforme le gaz chaud venu du compresseur en <b>liquide</b>. Il rejette la chaleur du local vers l'air extérieur. Sur un climatiseur split, il se trouve dans l'<b>unité extérieure</b>, la partie posée dehors.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Sur la croix du frigoriste, le condenseur est toujours en <b>haut</b> : le compresseur à droite, le détendeur à gauche, l'évaporateur en bas.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "C'est un condenseur <b>à air</b> : un ventilateur souffle sur des <b>ailettes</b>, de petites lames en métal qui évacuent la chaleur. Il n'y a jamais de tour de refroidissement sur ce type d'appareil.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Installer, régler et vérifier un condenseur, c'est protéger tout le circuit contre les <b>fuites</b>, dès le premier jour et pendant toute sa vie.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Bien installer l'unité extérieure",
       "html": "L'unité extérieure se fixe <b>solidement et de niveau</b>, avec de l'espace autour pour que l'air circule. Le matériel de réglage et de sécurité — pressostats, vannes — doit être en place et accessible. Avant la mise en service, on contrôle l'étanchéité du circuit sous <b>azote</b> (un gaz neutre) — jamais à l'oxygène, jamais à l'air comprimé. Tous les raccords sont vérifiés : zéro fuite dès le démarrage.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Régler le régulateur de pression",
       "html": "Le régulateur de pression de sortie du condenseur maintient une pression de condensation correcte, même par temps froid. Il se règle <b>selon la fiche constructeur</b>, jamais à l'estime.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Avant de toucher aux conduites",
       "html": "La conduite de <b>refoulement</b> (le tube de gaz chaud entre le compresseur et le condenseur) et la conduite de <b>liquide</b> (juste après le condenseur) s'inspectent après une <b>consignation électrique</b> systématique : couper puis verrouiller l'alimentation. On cherche des traces d'huile, de la corrosion, un isolant abîmé.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Démarrer, mesurer, arrêter",
       "html": "Au démarrage, le ventilateur tourne et la pression monte normalement. En fonctionnement, on mesure le <b>sous-refroidissement</b> (entre 4 et 8 K) : hors de cette plage, il signale un défaut de charge. À l'arrêt, on respecte <b>l'ordre donné par la fiche constructeur</b>.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Rédiger le rapport d'état",
       "html": "Chaque visite se termine par un <b>rapport écrit</b> : ailettes encrassées, ventilateur bruyant, trace d'huile, pression anormale. Un problème noté tôt évite une fuite demain.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Entretenir pour économiser l'énergie",
       "html": "Des <b>ailettes propres</b> et un ventilateur en bon état font consommer moins d'électricité. Un condenseur encrassé fait travailler le compresseur plus fort pour le même résultat.",
       "titre": "Condenseur — installer, régler, vérifier"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Insister sur la consignation électrique avant toute inspection de conduites, et sur l'azote seul pour contrôler l'étanchéité (jamais d'oxygène). Si un stagiaire confond condenseur à air et tour de refroidissement, revenir à la croix du frigoriste au tableau. Faire rédiger un vrai rapport d'état à l'écrit, même court."
    },
    {
     "type": "cours",
     "fiche": "g8",
     "titre": "L'évaporateur",
     "minutes": 30,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "L'évaporateur",
       "dc": "G8 · codes 8.01 · 8.05 · 8.08 · 8.09",
       "competences": [
        {
         "code": "8.01",
         "lib": "Expliquer le principe de l'évaporateur et le dégivrage",
         "officiel": "Expliquer le principe de fonctionnement d'un évaporateur (y compris le système de dégivrage) et les risques de fuite qui y sont associés",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.05",
         "lib": "Vérifier les conduites liquide et aspiration",
         "officiel": "Vérifier que les conduites de liquide et d'aspiration sont dans la bonne position",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.08",
         "lib": "Réaliser la mise en marche/arrêt et les mesures",
         "officiel": "Mettre en marche et arrêter un évaporateur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.09",
         "lib": "Inspecter la surface d'échange et le bac de condensats",
         "officiel": "Inspecter la surface de l'évaporateur",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/mesure-surchauffe.svg",
       "alt": "La surchauffe se mesure en deux points : manomètre BP vers la table, sonde de contact sur le tube.",
       "titre": "L'évaporateur"
      },
      {
       "type": "point",
       "html": "C'est le point <b>froid</b> du circuit : le fluide y absorbe la chaleur du milieu à refroidir et se vaporise. En sortie, il doit être <b>entièrement vapeur</b>, avec une <b>surchauffe de 5 à 10 K</b> — c'est ce qui protège le compresseur du coup de liquide.",
       "titre": "L'évaporateur"
      },
      {
       "type": "point",
       "html": "Le <b>givre</b> est normal en froid négatif ; installé durablement, il isole la batterie et fait chuter l'échange. D'où les cycles de <b>dégivrage</b> (air, résistance électrique, gaz chauds). Un évaporateur qui givre <b>complètement</b> en fonctionnement signale d'abord un problème de <b>débit d'air</b> : filtre encrassé, ventilateur arrêté.",
       "titre": "L'évaporateur"
      },
      {
       "type": "point",
       "html": "Points de vigilance propres : corrosion, condensats, et le <b>bac</b> — une fuite peut s'y dissimuler sous l'eau de dégivrage.",
       "titre": "L'évaporateur"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Lire la surchauffe",
       "html": "<b>Surchauffe = température du gaz à l'aspiration − température d'évaporation</b> (celle que la table donne pour la BP mesurée).<br>Trop élevée → le détendeur n'alimente pas assez, ou il manque du fluide.<br>Nulle ou négative, ligne d'aspiration givrée → <b>risque de coup de liquide</b>, on agit tout de suite.",
       "titre": "L'évaporateur"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Deux organes qu'on confond",
       "html": "Le <b>régulateur de pression d'évaporation</b> protège le produit (il empêche l'évaporateur de descendre trop bas). Le <b>pressostat BP</b> protège le compresseur. Fonctions différentes, réglages différents.",
       "titre": "L'évaporateur"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire relever la surchauffe sur banc réel : manomètre + sonde de contact, puis calcul. C'est le geste le plus discriminant de tout le référentiel composants. Faire observer le givrage en direct avant d'expliquer le mécanisme. Anecdote utile : un bac de condensats bouché a masqué une fuite pendant des semaines — d'où l'inspection visuelle systématique (8.09)."
    },
    {
     "type": "cours",
     "fiche": "g8b",
     "titre": "Évaporateur — installer, régler, vérifier",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Évaporateur — installer, régler, vérifier",
       "dc": "G8 · codes 8.02 · 8.03 · 8.04 · 8.06 · 8.07 · 8.10 · 8.11",
       "competences": [
        {
         "code": "8.02",
         "lib": "Mettre en service un régulateur de pression d'évaporation",
         "officiel": "Mettre au point un régulateur de pression d'évaporation de l'évaporateur",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.03",
         "lib": "Installer l'évaporateur et ses sécurités sans fuite",
         "officiel": "Installer correctement un évaporateur, y compris le matériel de contrôle et de sécurité, de telle sorte qu'aucune fuite ni aucune émission ne se produise une fois le système en fonctionnement",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.04",
         "lib": "Régler les sécurités électriques de l'évaporateur",
         "officiel": "Régler les interrupteurs de sécurité et de contrôle",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.06",
         "lib": "Vérifier l'état du conduit de dégivrage à l'air chaud",
         "officiel": "Inspecter le conduit de dégivrage à l'air chaud",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.07",
         "lib": "Ajuster la soupape de pression d'évaporation",
         "officiel": "Régler la soupape de régulation de la pression d'évaporation",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.10",
         "lib": "Rédiger un rapport d'état de l'évaporateur",
         "officiel": "Rédiger un rapport sur l'état de l'évaporateur en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "8.11",
         "lib": "Connaître les leviers d'efficacité énergétique de l'évaporateur",
         "officiel": "Connaître les mesures pour améliorer ou maintenir l'efficacité énergétique de l'équipement pendant l'installation ou la maintenance des évaporateurs",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/mesure-surchauffe.svg",
       "alt": "Points de contrôle sur l évaporateur en fonctionnement : manomètre basse pression relié à la table, sonde de contact sur le tube d aspiration.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Sur la <b>croix du frigoriste</b>, l'évaporateur occupe la position <b>basse</b>. Une fois installé, il doit fonctionner <b>sans aucune fuite ni émission</b> — c'est vrai pour le tube, mais aussi pour tout le matériel de contrôle et de sécurité posé avec lui.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Deux organes se règlent, pour deux raisons différentes. Le <b>régulateur de pression d'évaporation</b> est une soupape mécanique. Elle maintient une pression minimale dans l'évaporateur — par exemple pour empêcher un produit de geler, ou pour équilibrer plusieurs évaporateurs sur un seul compresseur. Sa mise en service et son réglage suivent <b>toujours la fiche constructeur</b>.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Les <b>interrupteurs de sécurité et de contrôle</b> — les pressostats — protègent la machine, pas le produit. Ils coupent l'alimentation électrique du compresseur si la pression sort de la plage prévue. Deux organes, deux fonctions, deux réglages : on ne les confond pas.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Le dégivrage évite que le givre n'isole la batterie. Il peut se faire à l'air, par résistance électrique ou par gaz chauds. Quand il se fait <b>à l'air chaud</b>, le conduit qui transporte cet air s'inspecte à chaque visite : étanchéité, isolation, écoulement des condensats.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Toute visite se termine par un <b>rapport écrit</b> sur l'état de l'évaporateur : anomalies observées, risque pour le système, ce qui pourrait à terme provoquer une fuite. Une batterie propre, un bon débit d'air et une surchauffe de <b>5 à 10 K</b> préservent aussi l'<b>efficacité énergétique</b> de l'équipement.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Avant toute mise en service",
       "html": "Pour vérifier que l'évaporateur ne fuit pas, la mise en pression se fait à l'<b>azote SEUL</b> — jamais à l'oxygène, jamais à l'air comprimé : avec de l'huile dans le circuit, ce mélange est explosif. Et avant toute intervention sur l'évaporateur ou ses sécurités, on coupe et on <b>consigne l'alimentation électrique</b>.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Qui protège quoi ?",
       "html": "<b>Pressostat</b> (interrupteur de sécurité) → protège la <b>machine</b> : il coupe le compresseur.<br><b>Régulateur de pression d'évaporation</b> → protège le <b>produit</b>, ou l'équilibre entre évaporateurs : il ne coupe rien, il maintient une pression.<br>Dans les deux cas, la valeur de réglage vient de la <b>fiche constructeur</b>, jamais de l'estime.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qu'un bon rapport contient",
       "html": "Un rapport d'état utile <b>décrit ce qui ne va pas</b> : corrosion, fixation desserrée, bac de condensats sale, conduit de dégivrage abîmé — tout ce qui, laissé tel quel, finit en fuite ou en émission. C'est aussi ce qui coûte le plus cher en énergie : une batterie sale ou un mauvais débit d'air font tourner le compresseur plus longtemps pour le même résultat.",
       "titre": "Évaporateur — installer, régler, vérifier"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Fiche dense : sept codes. Ne pas tout dérouler d'une traite — s'appuyer sur les trois blocs pour rythmer la séance. Faire identifier sur une machine réelle (ou des photos) le régulateur de pression d'évaporation ET le pressostat BP, et faire dire à voix haute ce que chacun protège : c'est la confusion la plus fréquente du groupe G8. Rappeler systématiquement azote seul + consignation électrique avant toute manipulation. Pour 8.10, faire rédiger un vrai rapport d'état à partir d'une photo (bac encrassé, conduit abîmé) plutôt que de décrire la méthode dans l'abstrait. Relier 8.11 à la surchauffe déjà vue en G8 : ce n'est pas une nouvelle notion, c'est le même réglage regardé sous l'angle énergie."
    },
    {
     "type": "exercice",
     "fiche": "x2",
     "titre": "Exercice — la machine ne fait plus de froid",
     "minutes": 25,
     "slides": [
      {
       "type": "titre",
       "titre": "Exercice — la machine ne fait plus de froid",
       "dc": "G8 · G9 · mise en situation",
       "competences": [
        {
         "code": "4.04",
         "lib": "Interpréter des mesures par la méthode indirecte",
         "officiel": "Effectuer un contrôle de l'étanchéité du système au moyen d'une méthode indirecte conformément au règlement (CE) n° 1516/2007 et du manuel d'utilisation du système",
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
         "lib": "Réaliser les mesures en fonctionnement",
         "officiel": "Mettre en marche et arrêter un évaporateur et en vérifier le bon fonctionnement, y compris en effectuant des mesures durant son fonctionnement",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "point",
       "html": "Chambre froide positive. Le compresseur tourne, mais la température de la chambre ne descend plus. Tu relèves :",
       "titre": "Exercice — la machine ne fait plus de froid"
      },
      {
       "type": "point",
       "html": "Rappels : surchauffe attendue 5 à 10 K, sous-refroidissement attendu 4 à 8 K.",
       "titre": "Exercice — la machine ne fait plus de froid"
      },
      {
       "type": "point",
       "html": "<ul><li>basse pression <b>anormalement basse</b> ;</li><li>surchauffe à l'aspiration <b>très élevée</b>, de l'ordre de 20 K ;</li><li>sous-refroidissement <b>quasi nul</b>, <b>bulles</b> visibles au voyant liquide ;</li><li>aucune trace d'huile visible au premier examen.</li></ul>",
       "titre": "Exercice — la machine ne fait plus de froid"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Méthode",
       "html": "On ne conclut pas sur un relevé isolé : on cherche la cause qui explique <b>tous</b> les indices à la fois. Ici, trois indices convergent.",
       "titre": "Exercice — la machine ne fait plus de froid"
      }
     ],
     "questions": [],
     "notes": "Exercice charnière : il rebranche les composants (G6-G9) sur l'étanchéité (G4). Le laisser chercher en binôme cinq minutes avant de corriger. Erreur fréquente : s'arrêter à « le détendeur est bouché » — plausible pour la surchauffe, mais n'explique ni le sous-refroidissement nul ni les bulles au voyant. Faire verbaliser pourquoi une seule cause explique les trois indices. Enchaîner : « et maintenant, comment localises-tu la fuite ? » → retour en G4c."
    },
    {
     "type": "cours",
     "fiche": "g9",
     "titre": "Le détendeur et les organes annexes",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Le détendeur et les organes annexes",
       "dc": "G9 · codes 9.01 · 9.02 · 9.03 · 9.08",
       "competences": [
        {
         "code": "9.01",
         "lib": "Expliquer le principe du détendeur et du tube capillaire",
         "officiel": "Expliquer le principe de fonctionnement de différents types de vannes d'expansion (détendeurs thermostatiques, tubes capillaires) et les risques de fuite qui y sont liés",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "9.02",
         "lib": "Installer les vannes dans la bonne position",
         "officiel": "Installer des vannes dans la bonne position",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "9.03",
         "lib": "Régler un détendeur mécanique ou électronique",
         "officiel": "Régler un détendeur mécanique/électronique",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "9.08",
         "lib": "Vérifier un filtre déshydrateur",
         "officiel": "Vérifier l'état d'un filtre sécheur",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/detendeurs-ligne.svg",
       "alt": "Les quatre types de détendeurs et la ligne liquide avec ses accessoires dans l ordre.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "point",
       "html": "Le détendeur fait chuter la pression et <b>dose le débit de liquide</b> envoyé à l'évaporateur. Le <b>détendeur thermostatique</b> régule sur la <b>surchauffe</b> : son bulbe, fixé sur la ligne d'aspiration, sent la température du gaz et ouvre ou ferme en conséquence. Le <b>détendeur électronique</b> fait la même chose avec une sonde et un régulateur : plus précis, plus rapide. Le <b>capillaire</b>, lui, est un tube calibré fixe, sans réglage — on le trouve sur les petits appareils.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "point",
       "html": "Autour du détendeur, la ligne liquide porte le <b>filtre déshydrateur</b> (tamis moléculaire, monté <b>dans le sens de la flèche</b>) et le <b>voyant</b>, qui renseigne sur deux choses : la présence de bulles et, par sa pastille, l'humidité du circuit.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Sécurité électrique, sécurité mécanique",
       "html": "Le <b>pressostat</b> est électrique et réglable : il coupe avant l'incident. La <b>soupape de sécurité</b> est mécanique, tarée par le constructeur : c'est le dernier recours. On ne remplace jamais l'une par l'autre, et on ne retouche pas un tarage.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Trois erreurs de montage",
       "html": "Monter une vanne ou un déshydrateur <b>à l'envers</b> (erreur irréversible sans découpe) ; poser le <b>bulbe</b> au mauvais endroit ou mal serré ; retoucher le réglage <b>sans laisser l'installation se stabiliser</b> entre deux actions — la mesure suivante ne veut alors plus rien dire.",
       "titre": "Le détendeur et les organes annexes"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire manipuler un détendeur mécanique démonté, vis de réglage visible, AVANT d'aborder l'électronique : le geste ancre la notion, le paramétrage logiciel l'abstrait. Faire chercher la valeur de consigne sur la notice constructeur plutôt que de la donner — cohérent avec la règle du zéro invention. Ce chapitre est un carrefour : le relier à G4 (étanchéité), G8 (surchauffe) et G11 (efficacité)."
    },
    {
     "type": "cours",
     "fiche": "g9b",
     "titre": "Régler et contrôler les organes annexes",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Régler et contrôler les organes annexes",
       "dc": "G9 · codes 9.04 · 9.05 · 9.06 · 9.07 · 9.09 · 9.10",
       "competences": [
        {
         "code": "9.04",
         "lib": "Régler un thermostat mécanique ou électronique",
         "officiel": "Régler des thermostats mécaniques et électroniques",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "9.05",
         "lib": "Régler une soupape de régulation de pression",
         "officiel": "Régler la soupape de régulation de la pression",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "9.06",
         "lib": "Régler un limiteur de pression mécanique ou électronique",
         "officiel": "Régler des limiteurs de pression mécaniques et électroniques",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "9.07",
         "lib": "Vérifier le fonctionnement d'un séparateur d'huile",
         "officiel": "Vérifier le fonctionnement d'un séparateur d'huile",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "9.09",
         "lib": "Rédiger un rapport d'état sur ces organes",
         "officiel": "Rédiger un rapport sur l'état de ces composants en indiquant tout problème de fonctionnement susceptible d'endommager le système et d'entraîner à terme, faute de mesure, des fuites ou des émissions de réfrigérant",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": true
        },
        {
         "code": "9.10",
         "lib": "Connaître les mesures d'efficacité énergétique liées à ces réglages",
         "officiel": "Connaître les mesures pour améliorer ou maintenir l'efficacité énergétique de l'équipement pendant l'installation ou la maintenance des détendeurs thermostatiques et d'autres composants",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": true
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/detendeurs-ligne.svg",
       "alt": "La ligne liquide et ses accessoires, dans l ordre : réserve de liquide, filtre déshydrateur, voyant, électrovanne, détendeur.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "point",
       "html": "Autour du détendeur, d'autres organes se <b>règlent</b> et se <b>contrôlent</b>. Ils ne dosent pas le fluide. Ils protègent l'installation et lui évitent de gaspiller de l'énergie. Cette fiche en présente quatre : les thermostats, la soupape de régulation de pression, les limiteurs de pression, et le séparateur d'huile.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "point",
       "html": "Le <b>thermostat</b> commande un organe (compresseur, vanne) selon une <b>température</b>. Le thermostat <b>mécanique</b> utilise un bulbe relié par un tube fin à des contacts électriques : simple et robuste. Le thermostat <b>électronique</b> utilise une sonde reliée à un régulateur numérique : plus précis, et plus simple à régler. Dans les deux cas, le point de consigne se règle <b>selon la fiche constructeur</b>, jamais à l'estime.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "point",
       "html": "La <b>soupape de régulation de pression</b> ne coupe rien : elle <b>module en continu</b> pour maintenir une pression stable à un point du circuit. Le <b>limiteur de pression</b> est différent : c'est une sécurité. Mécanique, il est réglé par un ressort. Électronique, il utilise un capteur relié à un module. Dans les deux cas, il <b>coupe le circuit</b> — le plus souvent le compresseur — dès qu'un seuil de pression est franchi, en haute comme en basse pression. Une régulation qui module, une sécurité qui coupe : deux logiques, deux réglages.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "point",
       "html": "Le <b>séparateur d'huile</b> se place juste après le compresseur (à droite), avant le condenseur (en haut). C'est là que passe en premier la vapeur chaude chargée d'huile. Il retient cette huile puis la renvoie au carter du compresseur, automatiquement, dès que le niveau monte. <b>Vérifier son fonctionnement</b>, c'est contrôler que ce retour se fait bien : une huile qui s'accumule plus loin dans le circuit réduit l'échange de chaleur, et finit par manquer au compresseur.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "point",
       "html": "Après ces réglages et ce contrôle, on <b>rédige un rapport</b> sur l'état de chaque organe. Un thermostat qui dérive, un limiteur qui ne coupe plus, un séparateur qui laisse passer l'huile : non signalés, ces défauts finissent par endommager le système. À terme, faute de mesure, cela provoque une fuite ou une émission de réfrigérant. Le rapport écrit permet d'agir <b>avant</b> ce stade.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Un bon réglage, c'est de l'énergie économisée",
       "html": "Un thermostat qui démarre et arrête le compresseur trop souvent, un limiteur qui coupe pour rien, un séparateur d'huile qui laisse l'huile encrasser les échangeurs : à chaque fois, le compresseur travaille plus pour le même résultat. <b>Bien régler et bien entretenir ces organes, à l'installation comme en maintenance, c'est aussi ce qui maintient l'efficacité énergétique</b> de l'installation.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Avant de toucher un réglage électrique",
       "html": "Un thermostat électronique, un limiteur de pression électrique : ce sont des <b>organes électriques</b>. <b>Consignation électrique</b> systématique avant toute intervention. Et un limiteur de sécurité ne se retouche jamais « pour voir » : son seuil se règle selon la fiche constructeur, comme tous les autres réglages de cette fiche.",
       "titre": "Régler et contrôler les organes annexes"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire manipuler un pressostat démonté (ou les simulateurs KP1/KP5) pour que les stagiaires distinguent au toucher le limiteur, qui coupe, de la soupape de régulation, qui module en continu : c'est la confusion la plus fréquente à l'oral. Sur le séparateur d'huile, montrer un appareil réel en fonctionnement si possible — le retour d'huile par flotteur reste abstrait sur le seul schéma. Relier le rapport écrit (9.09) à la finalité du métier : ce n'est pas de la paperasse, c'est ce qui évite la fuite non détectée. Ce module referme le groupe G9 : le relier à G6 (mêmes sécurités électriques côté compresseur) et à G4 (étanchéité)."
    },
    {
     "type": "cours",
     "fiche": "g3",
     "titre": "Contrôles avant mise en service",
     "minutes": 35,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Contrôles avant mise en service",
       "dc": "G3 · codes 3.01 → 3.05",
       "competences": [
        {
         "code": "3.01",
         "lib": "Réaliser une épreuve de pression de résistance",
         "officiel": "Effectuer une épreuve de pression pour contrôler la résistance du système",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "3.02",
         "lib": "Réaliser une épreuve de pression d'étanchéité",
         "officiel": "Effectuer une épreuve de pression pour contrôler l'étanchéité du système",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "3.03",
         "lib": "Utiliser une pompe à vide",
         "officiel": "Utiliser une pompe à vide",
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
         "lib": "Faire le vide : évacuer l'air et l'humidité",
         "officiel": "Faire le vide dans le système pour évacuer l'air et l'humidité selon la pratique habituelle",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "3.05",
         "lib": "Consigner le registre et rédiger le rapport d'essais",
         "officiel": "Consigner les données dans le registre de l'équipement et rédiger un rapport portant sur un ou plusieurs des essais et des contrôles effectués durant l'examen",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/epreuve-azote.svg",
       "alt": "Montage de l épreuve de pression : bouteille d azote, manifold, circuit — oxygène et air comprimé barrés.",
       "titre": "Contrôles avant mise en service"
      },
      {
       "type": "point",
       "html": "Deux épreuves, deux buts, souvent enchaînées. L'<b>épreuve de résistance</b> vérifie que l'assemblage tient mécaniquement. L'<b>épreuve d'étanchéité</b> vérifie qu'il ne laisse rien passer. Les pressions d'épreuve se prennent <b>sur la documentation constructeur</b> et la norme applicable — jamais à l'estime.",
       "titre": "Contrôles avant mise en service"
      },
      {
       "type": "point",
       "html": "Vient ensuite le <b>tirage au vide</b>. Il ne sert pas à « faire propre » : il extrait l'<b>air</b> (incondensable, qui fait monter la haute pression) et l'<b>humidité</b> (qui gèle au détendeur et attaque l'huile). Sous vide, l'eau bout à température ambiante — c'est exactement ce qu'on cherche.",
       "titre": "Contrôles avant mise en service"
      },
      {
       "type": "point",
       "html": "Enfin, on <b>consigne</b> : registre et rapport d'essais font partie du geste professionnel.",
       "titre": "Contrôles avant mise en service"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Geste interdit — sans discussion",
       "html": "Toute mise en pression se fait à l'<b>azote</b>, et à l'azote seulement. <b>Jamais d'oxygène</b> — au contact de l'huile du circuit, le mélange est explosif. <b>Jamais d'air comprimé</b> — il apporte de l'humidité et contient de l'oxygène. Ce geste ne se discute pas et ne se découvre pas : il s'impose.",
       "titre": "Contrôles avant mise en service"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Le vide qui remonte",
       "html": "Après avoir isolé la pompe, on <b>surveille</b> : si le vide remonte, il y a une fuite ou de l'humidité résiduelle. Un tirage au vide réussi, c'est un vide qui <b>tient</b>. Valeurs cibles et durées : selon doc constructeur, à faire valider.",
       "titre": "Contrôles avant mise en service"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Pour la catégorie D, seul le code 3.03 (pompe à vide) est dans le champ : ne pas emmener un groupe D sur l'épreuve de pression. Faire monter le montage azote sur un poste d'essai dédié, jamais sur une installation client en première approche. L'anecdote qui marque : une bouteille mal identifiée, de l'oxygène branché par erreur sur un circuit huilé. Faire lire un vacuomètre en direct pendant un tirage réel, et faire chercher « pourquoi le vide remonte-t-il ? »."
    },
    {
     "type": "cours",
     "fiche": "g10",
     "titre": "Tuyauterie et brasage sous azote",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Tuyauterie et brasage sous azote",
       "dc": "G10 · codes 10.01 · 10.02",
       "competences": [
        {
         "code": "10.01",
         "lib": "Réaliser des joints étanches (soudage, brasage fort ou tendre)",
         "officiel": "Soudage, brasage fort et/ou brasage tendre des joints étanches sur des tubes, des tuyaux et des composants métalliques pouvant être utilisés dans des systèmes de réfrigération, de climatisation et de pompes à chaleur",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "10.02",
         "lib": "Fabriquer et vérifier les supports de tuyauteries",
         "officiel": "Fabriquer/vérifier des supports de tuyaux et de composants",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/balayage-azote.svg",
       "alt": "Brasage sous balayage d azote : l azote traverse le tube pendant la chauffe et ressort librement.",
       "titre": "Tuyauterie et brasage sous azote"
      },
      {
       "type": "point",
       "html": "Braser un circuit frigorifique, ce n'est pas braser une tuyauterie d'eau. À la flamme, l'intérieur du cuivre s'oxyde et forme une <b>calamine</b> noire qui se détache plus tard, circule, et bouche le déshydrateur ou abîme le compresseur — des mois après, loin de la cause.",
       "titre": "Tuyauterie et brasage sous azote"
      },
      {
       "type": "point",
       "html": "D'où le <b>balayage à l'azote</b> pendant toute la chauffe : un débit léger et continu chasse l'oxygène du tube. Pour le cuivre sur cuivre, l'alliage d'apport est généralement du type <b>cuivre-phosphore</b>.",
       "titre": "Tuyauterie et brasage sous azote"
      },
      {
       "type": "point",
       "html": "On ne brase <b>jamais</b> un circuit contenant du fluide : récupération, puis inertage à l'azote. <b>EPI systématiques</b> au poste : lunettes, gants. Les tubes se cintrent <b>à froid, à la cintreuse</b>, se coupent au coupe-tube et s'<b>ébavurent</b> — une bavure part avec le fluide et finit dans le compresseur.",
       "titre": "Tuyauterie et brasage sous azote"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Deux opérations à l'azote, à ne pas confondre",
       "html": "<b>Balayage</b> : pendant le brasage, débit léger, pour éviter l'oxydation.<br><b>Épreuve</b> : après le brasage, sous pression, pour vérifier l'étanchéité.<br>Même gaz, deux gestes, deux moments.",
       "titre": "Tuyauterie et brasage sous azote"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le support compte autant que le joint",
       "html": "Un support mal posé, trop serré, ou un point dur sur le tube transmet les vibrations du compresseur au joint brasé. Le joint peut être parfait au départ et rompre par fatigue des mois plus tard.",
       "titre": "Tuyauterie et brasage sous azote"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire monter le balayage azote — bouteille, détendeur, tuyau, position de sortie — AVANT toute mise en flamme. Le geste doit être automatique avant d'allumer le chalumeau. Pédagogie de la découverte : faire observer un joint mal brasé (calamine, porosité) et laisser les stagiaires identifier les défauts avant de donner la méthode correcte."
    }
   ]
  },
  {
   "n": 3,
   "titre": "Le cœur du métier : étanchéité, récupération, sécurité",
   "intention": "Ce qui justifie l'habilitation : ne pas laisser fuir, ne pas émettre, savoir travailler sur des fluides inflammables. C'est la journée la plus lourde au barème — l'erreur y a des conséquences directes sur l'environnement ou sur la sécurité.",
   "sequences": [
    {
     "type": "cours",
     "fiche": "g4a",
     "titre": "Où fuit une installation ?",
     "minutes": 30,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Où fuit une installation ?",
       "dc": "G4 · codes 4.01 · 4.02 · 4.03",
       "competences": [
        {
         "code": "4.01",
         "lib": "Identifier les points de fuite potentiels d'une installation",
         "officiel": "Connaître les points de fuite potentiels des équipements de réfrigération, de climatisation et de pompes à chaleur",
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
         "lib": "Consulter et exploiter le registre avant le contrôle",
         "officiel": "Consulter le registre de l'équipement avant tout contrôle d'étanchéité et relever les informations pertinentes concernant des problèmes récurrents ou des parties problématiques du système nécessitant une attention particulière",
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
         "lib": "Réaliser un contrôle visuel et manuel",
         "officiel": "Effectuer un contrôle visuel et manuel de tout le système au sens du règlement (CE) n° 1516/2007 de la Commission",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "E": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/points-de-fuite.svg",
       "alt": "Six familles de points de fuite repérées sur un circuit type.",
       "titre": "Où fuit une installation ?"
      },
      {
       "type": "point",
       "html": "Une fuite ne sort pas d'un tube plein. Elle sort d'un <b>point d'assemblage</b> ou d'une <b>pièce en mouvement</b> : raccords mécaniques (flare, à visser), brasures poreuses ou mal pénétrées, presse-étoupes de vannes, joints, raccords vissés des voyants, filtres et pressostats, et tout ce qui <b>vibre</b> — compresseur, tuyauteries mal fixées.",
       "titre": "Où fuit une installation ?"
      },
      {
       "type": "point",
       "html": "Avant de sortir le moindre instrument, on <b>lit le registre</b> : quelle charge, quel fluide, quelles fuites déjà détectées, qu'a-t-on réparé et quand. Un point déjà réparé est un point <b>à recontrôler en priorité</b>, pas un point clos.",
       "titre": "Où fuit une installation ?"
      },
      {
       "type": "point",
       "html": "Vient ensuite le <b>contrôle visuel et manuel</b>, sans électronique : traces d'huile (le fluide entraîne l'huile en fuyant), corrosion, givre anormal, serrage des raccords accessibles, état des fixations.",
       "titre": "Où fuit une installation ?"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "L'ordre ne s'invente pas",
       "html": "<b>Registre → visuel et manuel → méthode indirecte → méthode directe.</b><br>Chaque étape oriente la suivante. On ne contrôle jamais à l'aveugle : le registre oriente le contrôle avant même d'ouvrir la porte du local technique.",
       "titre": "Où fuit une installation ?"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "La trace d'huile",
       "html": "Une trace d'huile sous un raccord n'est pas une salissure : c'est la <b>signature d'une fuite</b>. Le fluide s'échappe, l'huile miscible reste. Inversement, un bac de condensats bouché peut <b>masquer</b> une fuite pendant des semaines.",
       "titre": "Où fuit une installation ?"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Pédagogie de la découverte : emmener le groupe devant une machine d'atelier et faire CHERCHER les points de fuite avant de donner la liste. Les stagiaires en trouvent la moitié seuls, on complète — la liste donnée d'emblée ne se retient pas. Insister sur le registre : c'est le réflexe qui distingue le professionnel du bricoleur, et c'est évalué."
    },
    {
     "type": "cours",
     "fiche": "g4b",
     "titre": "Méthode indirecte — mesurer et interpréter",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Méthode indirecte — mesurer et interpréter",
       "dc": "G4 · codes 4.04 · 4.05",
       "competences": [
        {
         "code": "4.04",
         "lib": "Mettre en œuvre la méthode indirecte (mesures et tables)",
         "officiel": "Effectuer un contrôle de l'étanchéité du système au moyen d'une méthode indirecte conformément au règlement (CE) n° 1516/2007 et du manuel d'utilisation du système",
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
         "lib": "Utiliser les instruments portables et interpréter les mesures",
         "officiel": "Utiliser des instruments de mesure portables tels que des manomètres, des thermomètres et des multimètres pour mesurer les volts, ampères et ohms en appliquant des méthodes indirectes de contrôle de l'étanchéité, et interpréter les paramètres mesurés",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "E": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/lecture-table.svg",
       "alt": "La lecture croisée : manomètre + 1 bar, table de saturation du fluide, sonde de contact.",
       "titre": "Méthode indirecte — mesurer et interpréter"
      },
      {
       "type": "point",
       "html": "La méthode indirecte <b>ne détecte pas la fuite</b> : elle détecte un <b>fonctionnement anormal</b> qui la trahit. On relève les <b>pressions</b> (BP et HP) au manomètre et les <b>températures</b> au thermomètre de contact, puis on compare à la <b>table de saturation</b> du fluide présent.",
       "titre": "Méthode indirecte — mesurer et interpréter"
      },
      {
       "type": "point",
       "html": "Une pression plus basse que la valeur théorique attendue, une <b>surchauffe</b> qui grimpe au-delà des 5 à 10 K habituels, un <b>sous-refroidissement</b> qui s'effondre sous les 4 à 8 K : autant d'indices convergents d'un manque de charge. Le multimètre complète le tableau (intensité absorbée, cohérence électrique).",
       "titre": "Méthode indirecte — mesurer et interpréter"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Trois instruments, trois informations",
       "html": "<b>Manomètre</b> (BP/HP) → écart avec la table de saturation.<br><b>Thermomètre de contact</b> → surchauffe et sous-refroidissement.<br><b>Multimètre</b> → cohérence électrique du compresseur.<br>Un seul indice ne conclut rien ; c'est leur <b>convergence</b> qui oriente.",
       "titre": "Méthode indirecte — mesurer et interpréter"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Relatif ou absolu ?",
       "html": "Toujours le même piège : ne pas confondre pression <b>relative</b> (lue au manomètre) et pression <b>absolue</b> (souvent utilisée dans les tables). Écart : environ 1 bar. Et un fluide n'a jamais la table d'un autre.",
       "titre": "Méthode indirecte — mesurer et interpréter"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Le cœur du parcours E, et le module qui prend le plus de temps d'atelier. Faire manipuler manomètre + thermomètre EN BINÔME sur une machine, puis confronter les relevés à une vraie table de saturation. Tant que le stagiaire ne sait pas dire « la table annonce X, je mesure Y, donc… », la compétence n'est pas acquise. Ne pas accepter un relevé recopié : faire refaire la mesure."
    },
    {
     "type": "cours",
     "fiche": "g4c",
     "titre": "Méthode directe et consignation",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Méthode directe et consignation",
       "dc": "G4 · codes 4.06 · 4.07 · 4.08 · 4.09",
       "competences": [
        {
         "code": "4.06",
         "lib": "Mettre en œuvre une méthode directe en intervenant dans le circuit",
         "officiel": "Contrôler l'étanchéité du système au moyen d'une des méthodes directes visées au règlement (CE) n° 1516/2007",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "4.07",
         "lib": "Mettre en œuvre la méthode directe sans intervenir dans le circuit",
         "officiel": "Contrôler l'étanchéité du système au moyen d'une des méthodes directes ne nécessitant pas d'intervenir dans le circuit de réfrigération et visées au règlement (CE) n° 1516/2007",
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
         "lib": "Utiliser un détecteur électronique de fuites",
         "officiel": "Utiliser un dispositif électronique de détection des fuites",
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
         "lib": "Consigner le contrôle dans le registre",
         "officiel": "Consigner les données dans le registre de l'équipement",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "E": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/balayage-detecteur.svg",
       "alt": "La sonde du détecteur longe le raccord lentement ; une alerte se confirme par un second passage.",
       "titre": "Méthode directe et consignation"
      },
      {
       "type": "point",
       "html": "La méthode directe <b>localise physiquement</b> la fuite. Pour la catégorie E, elle se pratique <b>sans accéder au circuit</b> : c'est le code <b>4.07</b>. Le code 4.06, qui suppose d'intervenir dans le circuit, n'est pas dans le champ de la catégorie E.",
       "titre": "Méthode directe et consignation"
      },
      {
       "type": "point",
       "html": "En <b>A1</b> et <b>A2</b>, le code <b>4.06</b> s'ajoute : ce sont les méthodes directes qui supposent au contraire d'<b>intervenir dans le circuit</b>. On met alors le circuit en pression à l'<b>azote</b> pour faire apparaître la fuite à l'eau savonneuse, ou l'on introduit un <b>gaz traceur</b> ou un <b>traceur fluorescent</b>. Toutes ces méthodes sont celles du règlement <b>(CE) n° 1516/2007</b> : le choix dépend de l'installation, jamais de l'habitude.",
       "titre": "Méthode directe et consignation"
      },
      {
       "type": "point",
       "html": "Le <b>détecteur électronique</b> réagit à la présence de molécules de fluide dans l'air : on balaie la sonde <b>lentement</b>, le long des points repérés à l'étape visuelle. L'<b>eau savonneuse</b> localise par les bulles ; le <b>traceur UV</b> révèle les fuites intermittentes ou d'accès difficile. Sensibilité et étalonnage : selon doc constructeur, à faire valider.",
       "titre": "Méthode directe et consignation"
      },
      {
       "type": "point",
       "html": "Un contrôle non consigné n'a <b>aucune valeur réglementaire</b>. On note : date, méthode, points contrôlés, résultat, et en cas de fuite la localisation précise et la suite donnée.",
       "titre": "Méthode directe et consignation"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Une alerte se confirme",
       "html": "Le détecteur qui siffle ne conclut rien tout seul. On <b>repasse</b>, ventilateurs à l'arrêt si possible — l'air brassé disperse le nuage de fluide et fait sonner l'appareil à côté de la vraie fuite. Deux passages concordants, sinon on ne conclut pas.",
       "titre": "Méthode directe et consignation"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "L'instrument aussi se contrôle",
       "html": "Un détecteur non étalonné donne une conformité qui ne vaut rien. Étalonnage périodique selon la réglementation applicable, et <b>vérification au gaz de référence avant utilisation</b>. Le registre doit pouvoir dire avec quel appareil le contrôle a été fait.",
       "titre": "Méthode directe et consignation"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Insister sur la frontière 4.06 / 4.07 avec un groupe E : elle définit le métier. « Je contrôle, je n'ouvre pas. » Faire manipuler le détecteur sur une fuite calibrée d'atelier et faire constater qu'un balayage trop rapide passe à côté. Terminer par le remplissage d'un registre réel — un contrôle non consigné n'existe pas."
    },
    {
     "type": "exercice",
     "fiche": "x4",
     "titre": "Détective — le contrôle qui tourne mal",
     "minutes": 25,
     "slides": [
      {
       "type": "titre",
       "titre": "Détective — le contrôle qui tourne mal",
       "dc": "G4 · mise en situation · parcours E",
       "competences": [
        {
         "code": "4.02",
         "lib": "Exploiter le registre pour orienter le contrôle",
         "officiel": "Consulter le registre de l'équipement avant tout contrôle d'étanchéité et relever les informations pertinentes concernant des problèmes récurrents ou des parties problématiques du système nécessitant une attention particulière",
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
         "lib": "Utiliser le détecteur dans de bonnes conditions",
         "officiel": "Utiliser un dispositif électronique de détection des fuites",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "E": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "point",
       "html": "Contrôle périodique d'étanchéité chez un client. Le <b>registre</b> t'apprend qu'une fuite a été réparée il y a trois mois sur un raccord flare de la ligne liquide.",
       "titre": "Détective — le contrôle qui tourne mal"
      },
      {
       "type": "point",
       "html": "<ul><li>Le contrôle visuel ne montre <b>rien</b> sur le raccord réparé.</li><li>Ton détecteur électronique <b>sonne</b> en passant près du condenseur — ventilateur en marche.</li><li>Sur la machine, la plaque indique un fluide différent de celui noté au registre l'an dernier.</li></ul>",
       "titre": "Détective — le contrôle qui tourne mal"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Trois indices, trois réflexes",
       "html": "Un point réparé se <b>recontrôle en priorité</b>, même s'il semble propre. Une alerte détecteur près d'un ventilateur en marche <b>se confirme</b> brassage arrêté. Et une incohérence plaque/registre se <b>signale</b> — elle change la table de saturation à utiliser.",
       "titre": "Détective — le contrôle qui tourne mal"
      }
     ],
     "questions": [],
     "notes": "Exercice taillé pour le parcours E : tout se joue SANS ouvrir le circuit. Laisser débattre sur la proposition « resserrer tous les raccords » — elle paraît professionnelle mais c'est une intervention non justifiée, et sur un parcours E on ne touche pas au circuit. L'incohérence plaque/registre est le détail que presque personne ne relève : celui qui le voit a le réflexe métier."
    },
    {
     "type": "cours",
     "fiche": "g5a",
     "titre": "Récupérer sans émettre",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Récupérer sans émettre",
       "dc": "G5 · codes 5.01 → 5.04",
       "competences": [
        {
         "code": "5.01",
         "lib": "Connecter et déconnecter avec un minimum d'émissions",
         "officiel": "Connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions",
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
         "lib": "Vider et remplir un cylindre, en phase liquide et gazeuse",
         "officiel": "Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état gazeux",
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
         "lib": "Utiliser un dispositif de récupération",
         "officiel": "Utiliser un dispositif de récupération des réfrigérants et connecter et déconnecter ce dispositif en produisant le minimum d'émissions",
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
         "lib": "Vidanger l'huile contaminée",
         "officiel": "Vider l'huile contaminée par le réfrigérant d'un système",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "D": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/recuperation.svg",
       "alt": "Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance.",
       "titre": "Récupérer sans émettre"
      },
      {
       "type": "point",
       "html": "Chaque connexion et chaque déconnexion est un <b>point de fuite</b> : le geste est lent, contrôlé, flexibles purgés. Avant de récupérer, on <b>arrête et on isole</b> le système.",
       "titre": "Récupérer sans émettre"
      },
      {
       "type": "point",
       "html": "Le <b>groupe de récupération</b> transfère le fluide vers un cylindre prévu pour, en phase gazeuse ou liquide selon la situation. Le cylindre respecte un <b>taux de remplissage maximal</b> — jamais rempli à ras : le liquide se dilate avec la température, et un cylindre plein est un danger. On <b>pèse avant</b>, sinon on ne saura jamais combien on a réellement récupéré.",
       "titre": "Récupérer sans émettre"
      },
      {
       "type": "point",
       "html": "L'<b>huile</b> du compresseur est contaminée par nature : elle se récupère à part, comme un déchet dangereux. Elle ne se dégaze pas, elle ne se mélange pas au fluide.",
       "titre": "Récupérer sans émettre"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Récupéré, recyclé, régénéré",
       "html": "<b>Récupéré</b> : sorti de la machine — c'est un déchet tant qu'il n'a pas été traité.<br><b>Recyclé</b> : nettoyé sommairement — réemploi limité, typiquement sur la même installation ou le même exploitant.<br><b>Régénéré</b> : ramené aux spécifications d'un fluide neuf par une filière agréée — réutilisable comme du neuf.",
       "titre": "Récupérer sans émettre"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Ne jamais mélanger",
       "html": "Deux fluides différents dans le même cylindre, et le contenu devient <b>impossible à recycler ou à régénérer</b> : il part en destruction, aux frais de l'entreprise. Un cylindre, un fluide, une étiquette.",
       "titre": "Récupérer sans émettre"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Cœur du parcours D : chaque stagiaire branche, purge et pèse lui-même, sans exception. L'anecdote qui marque mieux qu'un discours : un cylindre trop rempli laissé au soleil. Relier systématiquement à G2 — un geste de récupération soigné est un geste écologique, pas une contrainte administrative. Faire chercher sur le log p-h si le fluide observé est sous-refroidi, saturé ou surchauffé avant de donner la réponse."
    },
    {
     "type": "cours",
     "fiche": "g5b",
     "titre": "Peser, charger, stocker, tracer",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Peser, charger, stocker, tracer",
       "dc": "G5 · codes 5.05 → 5.09",
       "competences": [
        {
         "code": "5.05",
         "lib": "Déterminer l'état du fluide et charger sans perte",
         "officiel": "Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, saturé ou surchauffé) d'un réfrigérant avant tout remplissage afin de choisir la méthode et le volume de remplissage les plus adaptés. Remplir le système de réfrigérant (à l'état liquide et gazeux) sans provoquer de pertes",
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
         "lib": "Choisir la balance adaptée et peser",
         "officiel": "Choisir le bon type de balance et l'utiliser pour peser le réfrigérant",
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
         "lib": "Consigner l'opération dans le registre",
         "officiel": "Consigner dans le registre de l'équipement toutes les informations pertinentes concernant le réfrigérant récupéré ou ajouté",
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
         "lib": "Appliquer les prescriptions de gestion, stockage et transport",
         "officiel": "Connaître les prescriptions et les procédures de gestion, de réutilisation, de récupération, de stockage et de transport des réfrigérants et huiles fluorés, y compris lorsqu'ils sont contaminés",
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
         "lib": "Gérer les hydrocarbures et leurs huiles, y compris contaminés",
         "officiel": "Connaître les prescriptions et les procédures de gestion, de remplissage, de récupération, de stockage et de transport des hydrocarbures et des huiles, y compris lorsqu'ils sont contaminés, ainsi que d'installation d'équipements et de systèmes tributaires des hydrocarbures",
         "epreuve": {
          "A1": "T",
          "A2": "T",
          "D": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/recuperation.svg",
       "alt": "Rappel du montage : la bouteille se pèse avant, ne se remplit jamais à ras, ne mélange jamais deux fluides.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "Pour charger, on détermine d'abord l'<b>état du fluide</b> et la <b>quantité prévue</b> (plaque signalétique, doc constructeur). La charge se contrôle à la <b>balance</b>, jamais « au manomètre » : le manomètre dit comment la machine se comporte, la balance dit combien on a mis.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "Cas particulier des <b>mélanges zéotropes</b> : ils se chargent en <b>phase liquide</b>, faute de quoi les composants se séparent et la composition du circuit dérive.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "L'<b>huile</b> suit le fluide, et elle en dépend. Les anciens fluides chlorés travaillaient avec de l'huile <b>minérale</b> ; les HFC et les HFO demandent une huile de synthèse, le plus souvent <b>polyolester (POE)</b>. Les deux ne se mélangent pas : sur un changement de fluide, l'huile se change aussi — c'est ce qui distingue un <b>retrofit</b> d'un simple drop-in. La POE <b>absorbe l'humidité de l'air</b> très vite : bidon refermé aussitôt, circuit jamais laissé ouvert. Le type exact d'huile se lit sur la <b>plaque ou la doc constructeur</b>, jamais au jugé.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "Une huile retirée d'un circuit est <b>contaminée</b> : elle contient du fluide dissous. Elle ne se jette pas, elle part en <b>déchet dangereux</b> vers une filière agréée, avec son bordereau. Pour les <b>hydrocarbures</b>, fluide et huile sont en plus <b>inflammables</b> : récipients adaptés et fermés, à l'écart de toute source de chaleur ou d'étincelle, transport selon la réglementation applicable et la fiche de données de sécurité.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "Le <b>registre</b> est la preuve légale de toute opération sur le fluide : quantité ajoutée, quantité récupérée, date, intervenant. Le rejet volontaire à l'atmosphère est strictement interdit et sanctionné.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "La balance prime",
       "html": "On pèse <b>avant</b> et <b>après</b>. Sans pesée initiale, la quantité récupérée ou ajoutée n'est qu'une estimation — et une estimation ne se consigne pas dans un registre.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Stockage et transport",
       "html": "Cylindres arrimés, debout, étiquetés, à l'abri de la chaleur ; les fluides <b>inflammables</b> (hydrocarbures, A2L) obéissent en plus aux règles de leur classe. Conditions détaillées : selon la réglementation applicable et la fiche de données de sécurité, à faire valider.",
       "titre": "Peser, charger, stocker, tracer"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Le geste à faire répéter : peser AVANT. Beaucoup de stagiaires pèsent après et déduisent — c'est faux dès qu'il reste du fluide dans le cylindre. Sur un groupe A2, insister sur la précision : sur une charge de 800 g, 50 g d'écart changent le comportement de la machine. Faire remplir un registre à chaque manipulation d'atelier, même en exercice."
    },
    {
     "type": "exercice",
     "fiche": "x3",
     "titre": "Détective — la bouteille de récupération",
     "minutes": 25,
     "slides": [
      {
       "type": "titre",
       "titre": "Détective — la bouteille de récupération",
       "dc": "G5 · mise en situation · parcours D",
       "competences": [
        {
         "code": "5.02",
         "lib": "Gérer le remplissage des cylindres en sécurité",
         "officiel": "Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état gazeux",
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
         "lib": "Peser à chaque étape",
         "officiel": "Choisir le bon type de balance et l'utiliser pour peser le réfrigérant",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "D": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "point",
       "html": "Récupération sur une chambre froide avant remplacement d'un composant. Tu as pesé la bouteille <b>avant</b> de commencer — bon réflexe. La récupération avance, et la balance approche du <b>niveau maximal admissible</b> de la bouteille… mais il reste visiblement du fluide dans le circuit.",
       "titre": "Détective — la bouteille de récupération"
      },
      {
       "type": "point",
       "html": "Sur l'étagère du fourgon : une bouteille de récupération <b>vide</b>, et une bouteille <b>entamée</b> qui contient déjà un autre fluide.",
       "titre": "Détective — la bouteille de récupération"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qui ne se négocie pas",
       "html": "Le taux de remplissage maximal protège contre la <b>dilatation du liquide</b> : dépassé, la bouteille devient dangereuse à la première montée en température. Et un mélange de fluides est <b>impossible à recycler ou régénérer</b> : il part en destruction.",
       "titre": "Détective — la bouteille de récupération"
      }
     ],
     "questions": [],
     "notes": "Cœur de cible du parcours D. La proposition « quelques centaines de grammes » fait toujours débat — c'est voulu : elle ressemble au bon sens de chantier. Rappeler l'anecdote de la bouteille au soleil. En atelier, faire refaire la double pesée : bouteille pleine fermée, étiquetée, consignée au registre ; nouvelle bouteille pesée AVANT le premier gramme."
    },
    {
     "type": "cours",
     "fiche": "g12",
     "titre": "Hydrocarbures — le spécifique A1 et A2",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Hydrocarbures — le spécifique A1 et A2",
       "dc": "G12 · codes 12.01 → 12.04 · 12.06 · 12.13 · 12.14",
       "competences": [
        {
         "code": "12.01",
         "lib": "Lire l'étiquetage et raccorder correctement une bouteille",
         "officiel": "Connaître les règles d'étiquetage et les prescriptions spéciales pour les réfrigérants inflammables dans les équipements, systèmes et cylindres de refroidissement ainsi que les prescriptions spéciales relatives au raccordement des bombonnes",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.02",
         "lib": "Appliquer les règles de sécurité outils, EPI et détection gaz",
         "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.03",
         "lib": "Déterminer la charge admissible",
         "officiel": "Calculer la charge de réfrigérant inflammable dans un système conformément aux normes de sécurité en vigueur",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.04",
         "lib": "Réaliser l'analyse de risques avant intervention",
         "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.06",
         "lib": "Récupérer et inerter à l'azote",
         "officiel": "Récupérer les réfrigérants inflammables du système en toute sécurité et remplir le système avec de l'azote",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.13",
         "lib": "Vérifier la signalisation, les issues, la détection et les alarmes du site",
         "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.14",
         "lib": "Maintenir l'efficacité énergétique avec un fluide inflammable",
         "officiel": "Connaître les mesures d'amélioration ou de maintien de l'efficacité énergétique des équipements lors de l'installation ou de la maintenance avec des réfrigérants inflammables",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/classes-securite.svg",
       "alt": "Matrice des classes NF EN 378 : CO2 en A1, R-32 et R-1234yf en A2L, R-290 en A3, NH3 en B2L.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "Les hydrocarbures — <b>R-290</b> (propane), <b>R-600a</b> (isobutane) — sont classés <b>A3</b> : très inflammables. Ils s'imposent pourtant, parce que leur PRP est très bas et leurs performances excellentes : on les trouve dans les réfrigérateurs domestiques, les monoblocs, les vitrines, et de plus en plus dans les pompes à chaleur.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "Travailler dessus impose une <b>préparation dédiée</b> : analyse de risques avant intervention, suppression de toute source d'ignition, <b>ventilation active</b>, outillage et matériel électrique adaptés, détecteur de gaz. La charge admissible dépend du <b>volume du local</b> et de la classe de sécurité : elle se détermine selon la <b>NF EN 378</b> et la plaque signalétique — <b>jamais estimée</b>.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "Sur le circuit : récupération, puis <b>inertage à l'azote</b> avant toute flamme. Épreuve de pression à l'azote, essai sous vide, charge de la quantité exacte, contrôle direct, rapport.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "Tout est <b>étiqueté</b>, et l'étiquette se lit avant de toucher : l'équipement porte la mention du fluide et le pictogramme <b>inflammable</b>, la bouteille aussi. Les bouteilles d'hydrocarbure ont un <b>raccord spécifique</b> et un <b>filetage à gauche</b> — c'est une sécurité, jamais un obstacle à contourner avec un adaptateur.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "Avant d'intervenir, on vérifie que le <b>site</b> lui-même est en règle : <b>signalisation</b> du risque, <b>issues de secours</b> dégagées, <b>capteurs de gaz</b> et <b>alarmes</b> présents et en service, ventilation opérante. Si ces mesures manquent, on ne commence pas : on le signale.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "Enfin, bien travailler économise l'énergie. Une charge <b>juste</b> — et les charges hydrocarbures sont faibles —, des échangeurs propres et des réglages exacts font qu'une machine au R-290 tient ses performances. Une charge approximative dégrade le rendement <b>et</b> la sécurité en même temps.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Deux confusions qui coûtent cher",
       "html": "<b>1.</b> Croire que le R-290 est A2L comme le R-32. Il est <b>A3</b> — la propagation de flamme n'a rien à voir.<br><b>2.</b> Forcer un <b>raccord de bouteille</b> hydrocarbure sur un circuit HFC (ou l'inverse) : les raccords sont spécifiques précisément pour empêcher la charge croisée.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Avant toute flamme",
       "html": "Récupérer → inerter à l'<b>azote</b> → ventiler → supprimer les sources d'ignition → détecteur en place. Jamais d'oxygène, jamais d'air comprimé, jamais de flamme sur un circuit non inerté.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Module le plus important d'A1 et d'A2 — c'est la nouveauté du référentiel, et le parc A2 y est largement passé. Faire manipuler le raccord spécifique hydrocarbure et le comparer physiquement au raccord HFC : la confusion se prévient par le geste, pas par le discours. Faire chercher la charge maximale sur une VRAIE plaque signalétique avant d'énoncer la règle. Répéter « jamais de flamme, jamais d'oxygène » à chaque manipulation, jusqu'au réflexe."
    },
    {
     "type": "cours",
     "fiche": "g12b",
     "titre": "Intervenir sur un circuit hydrocarbure",
     "minutes": 40,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Intervenir sur un circuit hydrocarbure",
       "dc": "G12 · codes 12.07 · 12.08 · 12.09 · 12.10 · 12.11 · 12.12",
       "competences": [
        {
         "code": "12.07",
         "lib": "Ouvrir le circuit pour remplacer un composant, puis le refermer",
         "officiel": "Ouvrir le système, enlever et remplacer un composant, refermer le système",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.08",
         "lib": "Réaliser l'épreuve de pression à l'azote",
         "officiel": "Effectuer une épreuve de pression pour contrôler l'étanchéité du système",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.09",
         "lib": "Tirer au vide pour sécher et vérifier le circuit",
         "officiel": "Réaliser un essai sous vide pour éliminer l'humidité et vérifier l'étanchéité du système",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.10",
         "lib": "Charger le circuit avec la quantité d'hydrocarbure prévue",
         "officiel": "Charger le système avec le volume approprié de réfrigérant à base d'hydrocarbures",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.11",
         "lib": "Contrôler l'étanchéité par une méthode directe",
         "officiel": "Réaliser un contrôle d'étanchéité sur le système au moyen d'une méthode directe",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.12",
         "lib": "Rédiger le rapport d'intervention",
         "officiel": "Rédiger un rapport sur le travail d'entretien effectué",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/balayage-azote.svg",
       "alt": "Brasage du composant remplacé sous balayage d azote : débit léger et continu, sortie libre — l épreuve sous pression vient ensuite, une fois le circuit refermé.",
       "titre": "Intervenir sur un circuit hydrocarbure"
      },
      {
       "type": "point",
       "html": "Le circuit est déjà <b>récupéré</b> et <b>inerté à l'azote</b> : plus d'hydrocarbure ni d'air à l'intérieur. La zone est prête : <b>ventilée</b>, balisée, sans source d'inflammation, détecteur de gaz et extincteur à portée, outillage adapté.",
       "titre": "Intervenir sur un circuit hydrocarbure"
      },
      {
       "type": "point",
       "html": "Reste une dernière vérification avant le chalumeau : la <b>consignation électrique</b> de l'installation. Le <b>R-290 est A3</b>, très inflammable — pas un A2L comme le R-32. Tant que l'inertage n'est pas confirmé : <b>aucune flamme</b>.",
       "titre": "Intervenir sur un circuit hydrocarbure"
      },
      {
       "type": "point",
       "html": "Le mode opératoire suit ensuite toujours le même ordre :",
       "titre": "Intervenir sur un circuit hydrocarbure"
      },
      {
       "type": "point",
       "html": "<ol><li><b>Ouvrir, remplacer, refermer.</b> On dépose le composant en panne et on brase le nouveau. Toujours sous <b>balayage d'azote</b> : un débit léger et continu qui évite la calamine à l'intérieur du tube. Mano-détendeur sur la bouteille — jamais d'azote en direct.</li><li><b>Épreuve de pression.</b> Le circuit refermé, on le met sous pression d'<b>azote sec</b>, toujours au travers du mano-détendeur, pour contrôler la brasure neuve. Pression d'épreuve : selon la documentation constructeur et la norme applicable, jamais à l'estime.</li><li><b>Tirage au vide.</b> On relâche l'azote, puis on tire au vide : la pompe extrait l'air et l'<b>humidité</b> restants. Un vide qui remonte signale un problème. Valeur cible et durée : selon la documentation constructeur.</li><li><b>Charge.</b> On charge le circuit avec le volume de réfrigérant hydrocarbure (R-290, R-600a) indiqué sur la <b>plaque signalétique</b>, par pesée — jamais une quantité estimée. Raccord dédié aux hydrocarbures : jamais celui d'un circuit HFC, ni l'inverse.</li><li><b>Contrôle direct.</b> On confirme l'étanchéité avec un <b>détecteur adapté aux hydrocarbures</b> — un détecteur pour HFC classique ne convient pas.</li><li><b>Rapport.</b> On rédige le rapport d'intervention : composant changé, résultats de l'épreuve et du contrôle, quantité chargée. Sans rapport, l'intervention n'a pas de valeur.</li></ol>",
       "titre": "Intervenir sur un circuit hydrocarbure"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Geste interdit",
       "html": "Mise en pression : <b>azote sec seulement</b>, jamais d'oxygène ni d'air comprimé, toujours au travers d'un <b>mano-détendeur</b> — une bouteille en direct peut faire éclater le circuit. <b>Consignation électrique</b> systématique avant d'ouvrir. Et tant que l'inertage n'est pas confirmé : <b>pas de chalumeau</b>, le R-290 est A3, très inflammable.",
       "titre": "Intervenir sur un circuit hydrocarbure"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Le fil rouge de l'intervention",
       "html": "Récupérer → inerter à l'azote → ouvrir et remplacer → épreuve à l'azote → vide → charge → contrôle direct → rapport.<br>Chaque étape verrouille la suivante : pas de charge sans épreuve concluante, pas de contrôle sans vide correct.",
       "titre": "Intervenir sur un circuit hydrocarbure"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Dérouler la séquence complète sur un poste d'atelier dédié aux hydrocarbures, jamais sur une installation client en première approche. Faire monter le mano-détendeur AVANT toute mise en flamme et faire vérifier le montage par un binôme. Sur l'ordre des gestes, être intraitable : un stagiaire qui veut charger avant un vide concluant s'arrête immédiatement, pas seulement à la correction. Faire toucher côte à côte un détecteur adapté aux hydrocarbures et un détecteur HFC classique — la différence doit être physique, pas seulement énoncée. Terminer par un vrai rapport d'intervention rempli au propre."
    },
    {
     "type": "exercice",
     "fiche": "x5",
     "titre": "Détective — intervention sur monobloc R-290",
     "minutes": 25,
     "slides": [
      {
       "type": "titre",
       "titre": "Détective — intervention sur monobloc R-290",
       "dc": "G12 · mise en situation · A1 et A2",
       "competences": [
        {
         "code": "12.04",
         "lib": "Conduire l'analyse de risques avant intervention",
         "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.05",
         "lib": "Préparer la zone : ventilation, ignition, EPI",
         "officiel": "Préparer la zone de travail et sélectionner les outils, le matériel et les équipements de protection adéquats pour travailler sur des systèmes dépendant des réfrigérants inflammables",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.06",
         "lib": "Récupérer puis inerter avant toute flamme",
         "officiel": "Récupérer les réfrigérants inflammables du système en toute sécurité et remplir le système avec de l'azote",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "point",
       "html": "Une vitrine réfrigérée au <b>R-290</b> à remplacer de compresseur, dans l'arrière-boutique d'une boulangerie : local <b>petit</b>, <b>sans ventilation</b>, un four à quelques mètres.",
       "titre": "Détective — intervention sur monobloc R-290"
      },
      {
       "type": "point",
       "html": "Ton collègue propose de « faire vite » : récupérer, ouvrir, braser le nouveau compresseur, recharger — comme sur un circuit HFC classique, « vu la petite charge ».",
       "titre": "Détective — intervention sur monobloc R-290"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "« Petite charge » ne veut pas dire « petit risque »",
       "html": "Le R-290 est <b>A3</b> : la charge est petite précisément <b>parce que</b> le fluide est très inflammable. Un local exigu non ventilé avec une source de flamme à proximité, c'est le scénario d'accident type — pas un chantier ordinaire.",
       "titre": "Détective — intervention sur monobloc R-290"
      }
     ],
     "questions": [],
     "notes": "Le scénario est volontairement banal : c'est le quotidien du parc A2. Faire construire la séquence AU TABLEAU par le groupe avant d'afficher la réponse — chaque oubli (le four !, le détecteur inadapté) se paie cher en vrai. Prolonger avec la question : « et si le client refuse qu'on coupe le four ? » — réponse attendue : on ne fait pas l'intervention."
    },
    {
     "type": "bilan",
     "fiche": "ex-defi",
     "titre": "Défi technicien — diagnostics (niveau 2)",
     "minutes": 30,
     "slides": [
      {
       "type": "titre",
       "titre": "Défi technicien — diagnostics (niveau 2)",
       "dc": "Entraînement · niveau 2 · A1 et A2",
       "competences": []
      }
     ],
     "questions": [],
     "notes": "Que du niveau 2 : diagnostics, mises en situation, subtilités (huile, transformations du cycle, glissement). Seuil relevé à 80 % : réservé à la fin de parcours, ou aux stagiaires déjà expérimentés qui veulent se jauger. Un score moyen ici n'est PAS un échec en formation."
    }
   ]
  },
  {
   "n": 4,
   "titre": "Préparation pratique — avant de toucher au fluide",
   "intention": "Le matériel et l'ordre des gestes, revus AVANT la manipulation. La sécurité s'y démontre et s'impose : on ne découvre jamais un risque par l'erreur. À projeter en préparation de chantier, dans l'heure qui précède le plateau — pas la veille.",
   "sequences": [
    {
     "type": "cours",
     "fiche": "p7",
     "titre": "Préparation de chantier — risques, EPI, zone de travail",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Préparation de chantier — risques, EPI, zone de travail",
       "dc": "Préparation pratique · codes 12.04 · 12.05",
       "competences": [
        {
         "code": "12.04",
         "lib": "Réaliser l'analyse de risques avant le travail",
         "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.05",
         "lib": "Préparer la zone de travail et choisir les EPI adaptés",
         "officiel": "Préparer la zone de travail et sélectionner les outils, le matériel et les équipements de protection adéquats pour travailler sur des systèmes dépendant des réfrigérants inflammables",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "point",
       "html": "Avant de sortir le moindre outil, deux choses se préparent : l'<b>analyse de risques</b> et la <b>zone de travail</b>. Ce n'est pas une formalité à cocher après coup. C'est la première étape du chantier, avant le premier geste technique.",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "point",
       "html": "<b>L'analyse de risques</b> se fait dans cet ordre :",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "point",
       "html": "Vient ensuite la <b>préparation de la zone</b> :",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "point",
       "html": "<ol><li>Identifier le fluide en jeu, à partir de la plaque signalétique ou de la documentation : inflammable, sous pression, en espace confiné.</li><li>Repérer les dangers de la <b>zone elle-même</b> : ventilation, sources de chaleur ou d'étincelle à proximité, accès, présence de tiers.</li><li>Éliminer ce qui peut l'être — couper une source de chaleur, dégager un passage.</li><li>Signaler ce qui ne peut pas être éliminé. Si un point bloque vraiment, le chantier n'engage pas tant qu'il n'est pas corrigé.</li></ol>",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "point",
       "html": "<ol><li>Baliser et signaler la zone de travail.</li><li>Dégager une <b>issue</b> utilisable à tout moment de l'intervention.</li><li>Sélectionner les <b>équipements de protection</b> adaptés au fluide et au geste prévu : protection des yeux, gants adaptés au produit et au froid, détecteur de gaz porté si le fluide l'exige.</li><li>Vérifier le matériel avant de l'emporter sur zone. Un flexible douteux ou un détecteur non vérifié <b>ne sort pas</b> de l'atelier.</li><li>Consigner électriquement l'installation avant toute ouverture de circuit.</li></ol>",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Sécurité imposée, jamais découverte",
       "html": "On ne teste pas un risque en le vivant. EPI absent, issue condamnée, détecteur en panne : chacun de ces points <b>arrête le chantier avant qu'il commence</b>, pas après un premier incident.",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "L'ordre qui protège",
       "html": "Analyser → éliminer ce qui peut l'être → signaler le reste → baliser → s'équiper → vérifier le matériel → consigner. Et alors seulement, intervenir.",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Avant d'expliquer quoi que ce soit, étaler les EPI disponibles en atelier et faire trouver au groupe lequel correspond à quel risque — ne pas les nommer à leur place. Mettre en scène un point bloquant crédible (issue encombrée, détecteur déchargé) sans prévenir, et observer : le stagiaire s'arrête-t-il de lui-même, ou faut-il l'arrêter ? C'est ce réflexe qu'on cherche à installer. Ces deux codes sont spécifiques A1/A2 (réfrigérants inflammables) au référentiel — mais le réflexe d'analyse de risques avant intervention vaut pour tous les fluides, à généraliser au-delà de l'épreuve."
    },
    {
     "type": "cours",
     "fiche": "p1",
     "titre": "Le manifold — lire, brancher, ne pas polluer",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Le manifold — lire, brancher, ne pas polluer",
       "dc": "Préparation pratique · codes 5.01 · 4.05",
       "competences": [
        {
         "code": "5.01",
         "lib": "Brancher et débrancher les flexibles du manifold avec un minimum d'émissions",
         "officiel": "Connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions",
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
         "lib": "Lire les instruments portables et interpréter les valeurs mesurées",
         "officiel": "Utiliser des instruments de mesure portables tels que des manomètres, des thermomètres et des multimètres pour mesurer les volts, ampères et ohms en appliquant des méthodes indirectes de contrôle de l'étanchéité, et interpréter les paramètres mesurés",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "E": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/recuperation.svg",
       "alt": "Le principe de branchement : installation à l arrêt, isolée, flexibles raccordés à l appareil, minimum d émissions à chaque connexion.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "point",
       "html": "Le <b>manifold</b> (ensemble manométrique) réunit deux manomètres — <b>BP en bleu</b>, <b>HP en rouge</b> — et deux vannes, une par côté, qui commandent le passage vers le <b>flexible central jaune</b> : celui qui part vers la pompe à vide, la bouteille de récupération, ou une bouteille d'azote équipée de son <b>mano-détendeur</b>.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "point",
       "html": "Le manomètre affiche une <b>pression relative</b> : pour obtenir la pression absolue, on ajoute environ <b>1 bar</b>. La pince de température et le multimètre servent à la <b>méthode indirecte</b> de contrôle d'étanchéité : on compare les valeurs mesurées — surchauffe (plage normale <b>5 à 10 K</b>), sous-refroidissement (plage normale <b>4 à 8 K</b>), intensité absorbée — à celles attendues sur la fiche constructeur. Un écart qui se creuse alerte, sans avoir ouvert le circuit.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "point",
       "html": "<ol><li>Consigner électriquement l'installation avant tout branchement.</li><li>Vérifier que les deux vannes du manifold sont fermées.</li><li>Visser le flexible bleu sur le raccord à obus côté basse pression — côté évaporateur, en bas de la croix du frigoriste.</li><li>Visser le flexible rouge sur le raccord à obus côté haute pression — côté condenseur et compresseur, en haut à droite.</li><li>Purger l'air de chaque flexible par un bref coup d'ouverture-fermeture — jamais un rejet prolongé.</li><li>Ouvrir les vannes une par une, jamais les deux ensemble, en surveillant les aiguilles.</li><li>Lire : pression BP, pression HP, température à la pince.</li><li>Refermer les deux vannes du manifold avant toute déconnexion.</li><li>Débrancher en purgeant chaque flexible — minimum d'émission, jamais de rejet volontaire.</li></ol>",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Fermé avant, fermé après",
       "html": "Les deux vannes du manifold restent <b>fermées</b> à chaque branchement et à chaque débranchement. Elles ne s'ouvrent qu'une fois les deux flexibles vissés et vérifiés, et se referment avant toute déconnexion. C'est ce qui évite le rejet au moment du geste.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Les deux vannes ouvertes en même temps",
       "html": "Ouvrir BP et HP <b>ensemble</b> fait communiquer les deux côtés du circuit et fausse la lecture. On ouvre <b>une vanne à la fois</b>, on lit, puis l'autre.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire manipuler un manifold hors tension, hors fluide : vannes fermées, on visse, on vérifie, on ouvre une vanne à la fois. Faire dire tout haut « BP bleu, évaporateur, en bas » en pointant la croix du frigoriste au tableau, avant de brancher pour de vrai. Faire observer une purge courte de flexible plutôt qu'un rejet prolongé — c'est le geste qui distingue un professionnel."
    },
    {
     "type": "cours",
     "fiche": "p5",
     "titre": "L'ordre des vannes — la chorégraphie de l'intervention",
     "minutes": 30,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention",
       "dc": "Préparation pratique · codes 5.01 · 5.02",
       "competences": [
        {
         "code": "5.01",
         "lib": "Connecter et déconnecter avec un minimum d'émissions",
         "officiel": "Connecter et déconnecter les jauges et lignes en produisant le minimum d'émissions",
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
         "lib": "Vider et remplir un cylindre, en phase liquide et gazeuse",
         "officiel": "Vider et remplir un cylindre de réfrigérant à l'état liquide et à l'état gazeux",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "D": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/recuperation.svg",
       "alt": "Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance — chaque flexible débranché suit le même ordre : fermer, stabiliser, desserrer lentement.",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "point",
       "html": "Un manifold, ce sont des <b>vannes</b>. Les ouvrir et les fermer dans le bon ordre n'est pas un détail. Un mauvais ordre peut lâcher un nuage de fluide au visage, ou libérer un flexible sous pression.",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "point",
       "html": "À la <b>connexion</b>, l'ordre est simple : vannes fermées, on raccorde les flexibles, on chasse l'air resté à l'intérieur par une ouverture brève, puis on ouvre progressivement.",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "point",
       "html": "C'est à la <b>déconnexion</b> que l'ordre compte le plus. Il ne change jamais :",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "point",
       "html": "La même logique s'applique pour <b>vider ou remplir un cylindre</b>, en phase liquide comme en phase gazeuse. Une bouteille de réfrigérant a une prise dédiée à chaque phase, ou s'utilise dans un sens précis pour tirer du liquide. On suit toujours le marquage de la bouteille, jamais un raccord forcé.",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "point",
       "html": "<ol><li><b>Fermer</b> la vanne, côté circuit puis côté appareil.</li><li><b>Laisser la pression se stabiliser.</b> Observer le manomètre. Tant que l'aiguille bouge encore, on attend.</li><li><b>Desserrer lentement</b> le raccord du flexible, à peine, par petites touches. On écoute. On continue. Jamais d'un coup.</li><li>S'il reste du fluide <b>emprisonné dans le flexible</b>, le récupérer par l'appareil déjà branché. Jamais le laisser partir à l'air libre.</li><li>Déconnecter seulement quand la pression est retombée et confirmée.</li></ol>",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "La chorégraphie qui ne change jamais",
       "html": "<b>Fermer → laisser stabiliser → desserrer lentement.</b> Ce triptyque revient à chaque déconnexion, quel que soit l'appareil branché. C'est le geste central de tout ce module : une fois automatique, il protège dans toutes les situations.",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le geste interdit",
       "html": "Desserrer un raccord <b>encore sous pression</b>, d'un coup. Purger le résidu d'un flexible <b>à l'air libre</b> pour aller plus vite. Chaque émission compte, même petite : l'objectif est toujours le <b>minimum d'émission</b>, jamais zéro effort.",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "La fiche centrale du module : y passer le temps qu'il faut. Faire manipuler un manifold et des flexibles réels (azote ou circuit vide) et faire répéter le triptyque fermer / stabiliser / desserrer jusqu'à ce que le geste soit lent par réflexe, pas par consigne. Observer AVANT d'expliquer : laisser un stagiaire desserrer à sa vitesse naturelle une première fois — la plupart vont trop vite, et c'est ce constat, pas un discours, qui doit amener la correction. Corriger immédiatement un geste brusque, ne jamais laisser aller au bout : la sécurité s'impose, elle ne se découvre pas par la sensation d'un jet résiduel."
    },
    {
     "type": "cours",
     "fiche": "p2",
     "titre": "La station de récupération — ce que c'est, comment on la branche",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "La station de récupération — ce que c'est, comment on la branche",
       "dc": "Préparation pratique · codes 5.03",
       "competences": [
        {
         "code": "5.03",
         "lib": "Brancher et débrancher un groupe de récupération avec un minimum d'émissions",
         "officiel": "Utiliser un dispositif de récupération des réfrigérants et connecter et déconnecter ce dispositif en produisant le minimum d'émissions",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "D": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/recuperation.svg",
       "alt": "Le montage de récupération : installation isolée, groupe de récupération, bouteille sur balance.",
       "titre": "La station de récupération — ce que c'est, comment on la branche"
      },
      {
       "type": "point",
       "html": "La <b>station de récupération</b> est un appareil autonome : elle aspire le fluide de l'installation et le transfère vers un <b>cylindre dédié</b>, posé sur une balance. Avant tout branchement, l'installation est <b>à l'arrêt et isolée</b>.",
       "titre": "La station de récupération — ce que c'est, comment on la branche"
      },
      {
       "type": "point",
       "html": "Le cylindre respecte le <b>taux de remplissage maximal</b> indiqué sur son étiquette : jamais rempli à ras. Le liquide se dilate avec la température — un cylindre trop plein est un danger.",
       "titre": "La station de récupération — ce que c'est, comment on la branche"
      },
      {
       "type": "point",
       "html": "<ol><li>Consigner électriquement l'installation à traiter.</li><li>Vérifier l'étiquette du cylindre de récupération : le fluide indiqué doit être exactement celui de l'installation.</li><li>Poser le cylindre sur la balance et noter la masse de départ, avant tout branchement.</li><li>Vannes du groupe fermées, brancher le flexible d'entrée sur le circuit et le flexible de sortie sur le cylindre.</li><li>Mettre le groupe sous tension et le régler selon la fiche du fabricant.</li><li>Ouvrir les vannes dans l'ordre indiqué par le fabricant ; surveiller la pression et la masse affichée.</li><li>En fin de transfert, purger les flexibles avant de débrancher — minimum d'émission.</li><li>Repeser le cylindre, noter la masse récupérée, consigner au registre.</li></ol>",
       "titre": "La station de récupération — ce que c'est, comment on la branche"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Peser avant, peser après",
       "html": "La différence entre la masse de départ et la masse d'arrivée est la <b>seule preuve fiable</b> de ce qui a été récupéré. Sans pesée avant, ce nombre n'existe pas.",
       "titre": "La station de récupération — ce que c'est, comment on la branche"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Un cylindre, un seul fluide",
       "html": "Une étiquette qui ne correspond pas exactement au fluide de l'installation : on ne branche pas. Mélanger deux fluides rend le contenu du cylindre inutilisable pour le recyclage ou la régénération.",
       "titre": "La station de récupération — ce que c'est, comment on la branche"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire manipuler le groupe hors fluide : reconnaître le cordon secteur, le flexible d'entrée, le flexible de sortie, l'ordre des vannes indiqué sur l'appareil. Insister sur la pesée, avant ET après — c'est la seule preuve de ce qui a été récupéré. Faire vérifier l'étiquette du cylindre à voix haute avant chaque branchement, jamais de mémoire."
    },
    {
     "type": "cours",
     "fiche": "p3",
     "titre": "Pompe à vide et vacuomètre — monter, tirer, lire",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire",
       "dc": "Préparation pratique · codes 3.03 · 3.04",
       "competences": [
        {
         "code": "3.03",
         "lib": "Monter et mettre en service une pompe à vide",
         "officiel": "Utiliser une pompe à vide",
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
         "lib": "Évacuer l'air et l'humidité en tirant au vide, selon la pratique habituelle",
         "officiel": "Faire le vide dans le système pour évacuer l'air et l'humidité selon la pratique habituelle",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "point",
       "html": "Le <b>tirage au vide</b> retire l'air et l'humidité du circuit avant charge — ce n'est pas du fluide qu'on évacue ici, mais de l'air et de la vapeur d'eau : la question du rejet à l'atmosphère ne se pose pas à ce stade. La <b>pompe à vide</b> aspire ; le <b>vacuomètre</b> électronique indique jusqu'où on est descendu, bien plus finement qu'un manomètre.",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire"
      },
      {
       "type": "point",
       "html": "L'ordre du neuvième geste protège le circuit : si la pompe s'arrête avant que la vanne soit fermée, l'huile de la pompe peut être aspirée en sens inverse vers le circuit qu'on vient de mettre sous vide.",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire"
      },
      {
       "type": "point",
       "html": "<ol><li>Consigner électriquement l'installation avant tout montage.</li><li>Vérifier le niveau d'huile de la pompe avant de la mettre en service.</li><li>Fermer les deux vannes du manifold.</li><li>Visser le vacuomètre sur le raccord prévu, du côté du circuit — jamais collé directement à la pompe : une lecture prise trop près de la pompe ne reflète pas le vide réel du circuit.</li><li>Brancher la pompe sur le flexible central du manifold.</li><li>Ouvrir les deux vannes du manifold pour tirer sur l'ensemble du circuit.</li><li>Mettre la pompe en marche.</li><li>Observer l'aiguille du vacuomètre descendre.</li><li>Une fois le vide stabilisé — valeur cible selon la fiche constructeur — fermer d'abord la vanne côté circuit, puis seulement ensuite arrêter la pompe.</li><li>Surveiller si le vide remonte, selon la pratique habituelle : une remontée signale une fuite ou de l'humidité résiduelle.</li></ol>",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Isoler avant d'arrêter",
       "html": "On ferme toujours la vanne côté circuit <b>avant</b> d'arrêter la pompe, jamais l'inverse. C'est l'ordre qui protège le circuit d'un retour d'huile.",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Vacuomètre collé à la pompe",
       "html": "Une lecture prise juste à la sortie de la pompe ne dit rien du vide réel dans le circuit. Le vacuomètre se monte du <b>côté circuit</b>.",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire monter le montage sur un poste d'essai, jamais en première fois sur une installation cliente. Faire vérifier l'huile de la pompe avant de démarrer — un réflexe qu'on saute facilement. Faire dire tout haut « isoler, puis arrêter » avant de le faire réellement : c'est l'ordre qui compte, pas la vitesse. Ne donner aucune valeur de vide cible ni de durée : renvoyer systématiquement à la fiche constructeur du modèle utilisé en atelier."
    },
    {
     "type": "cours",
     "fiche": "p4",
     "titre": "La bouteille d'azote et son mano-détendeur",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "La bouteille d'azote et son mano-détendeur",
       "dc": "Préparation pratique · codes 3.01 · 3.02",
       "competences": [
        {
         "code": "3.01",
         "lib": "Réaliser une épreuve de pression de résistance",
         "officiel": "Effectuer une épreuve de pression pour contrôler la résistance du système",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "3.02",
         "lib": "Réaliser une épreuve de pression d'étanchéité",
         "officiel": "Effectuer une épreuve de pression pour contrôler l'étanchéité du système",
         "epreuve": {
          "A1": "P",
          "A2": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/epreuve-azote.svg",
       "alt": "Le mano-détendeur monté sur la bouteille d azote sec, raccordé au manifold puis au circuit à éprouver, vanne par vanne — jamais d oxygène ni d air comprimé.",
       "titre": "La bouteille d'azote et son mano-détendeur"
      },
      {
       "type": "point",
       "html": "Une bouteille d'azote ne se branche jamais directement sur un circuit. Entre les deux, il y a toujours un <b>mano-détendeur</b>. Il lit la pression de la bouteille. Il règle la pression envoyée dans le circuit. Sans lui, toute la pression de la bouteille part d'un coup — largement de quoi faire éclater un circuit.",
       "titre": "La bouteille d'azote et son mano-détendeur"
      },
      {
       "type": "point",
       "html": "Le mano-détendeur porte <b>deux cadrans</b>. Le premier indique ce qu'il reste dans la bouteille. Le second indique la pression réglée en sortie, celle qui part vers le circuit. On lit toujours les deux.",
       "titre": "La bouteille d'azote et son mano-détendeur"
      },
      {
       "type": "point",
       "html": "<ol><li>Vérifier que le raccord est <b>propre</b>, sans trace d'huile ni de graisse : l'azote sous pression au contact d'huile est un risque.</li><li>Monter le mano-détendeur sur le robinet de la bouteille. Vérifier que la <b>vis de réglage est desserrée</b> — aucune pression envoyée en sortie.</li><li>Ouvrir <b>lentement</b> le robinet de la bouteille. Lire la pression bouteille sur le premier cadran.</li><li>Raccorder le flexible de sortie au manifold, puis au circuit à éprouver.</li><li>Visser <b>progressivement</b> la vis de réglage. La pression de sortie monte, à lire sur le second cadran, jusqu'à la valeur donnée par la documentation du constructeur ou la norme applicable.</li><li>Une fois la pression atteinte, fermer le robinet de la bouteille. Observer : le cadran de sortie ne doit plus bouger.</li></ol>",
       "titre": "La bouteille d'azote et son mano-détendeur"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Geste interdit — sans discussion",
       "html": "Une bouteille d'azote <b>ne se branche jamais en direct</b> sur un circuit, mano-détendeur absent. La mise en pression se fait <b>à l'azote sec, seul</b>. Jamais d'oxygène — explosif au contact de l'huile. Jamais d'air comprimé — humide, chargé en oxygène.",
       "titre": "La bouteille d'azote et son mano-détendeur"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Deux cadrans, deux informations",
       "html": "Cadran <b>bouteille</b> : ce qu'il reste dedans. Cadran <b>sortie</b> : ce que vous envoyez dans le circuit. Un cadran de sortie qui ne tient pas sa pression signale une fuite au raccord — à vérifier avant d'aller plus loin.",
       "titre": "La bouteille d'azote et son mano-détendeur"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Poser le mano-détendeur démonté sur la table et faire deviner son rôle avant d'expliquer : pourquoi deux cadrans, pourquoi une vis. Faire monter le montage par un stagiaire, azote réel si le plateau le permet, en insistant sur la vis desserrée AVANT ouverture bouteille — intervenir immédiatement si quelqu'un ouvre la bouteille vis serrée, ne pas laisser aller au bout du geste. Rappeler que ces codes ne concernent pas la catégorie D : un stagiaire D observe la démonstration mais n'est pas interrogé dessus."
    },
    {
     "type": "cours",
     "fiche": "p6",
     "titre": "La balance et la pesée — avant, après, ce qu'on note",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "La balance et la pesée — avant, après, ce qu'on note",
       "dc": "Préparation pratique · codes 5.05 · 5.06",
       "competences": [
        {
         "code": "5.05",
         "lib": "Déterminer l'état du fluide et charger sans perte",
         "officiel": "Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, saturé ou surchauffé) d'un réfrigérant avant tout remplissage afin de choisir la méthode et le volume de remplissage les plus adaptés. Remplir le système de réfrigérant (à l'état liquide et gazeux) sans provoquer de pertes",
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
         "lib": "Choisir la balance adaptée et peser",
         "officiel": "Choisir le bon type de balance et l'utiliser pour peser le réfrigérant",
         "epreuve": {
          "A1": "P",
          "A2": "P",
          "D": "P"
         },
         "nouveau": false,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "point",
       "html": "La quantité de fluide qui entre ou sort d'un circuit se lit sur une <b>balance</b>, jamais sur un manomètre. Le manomètre dit comment la machine se comporte. La balance dit <b>combien</b> il y a de fluide.",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
      },
      {
       "type": "point",
       "html": "Avant toute pesée, on choisit une balance <b>adaptée</b> à la quantité attendue. On la pose à plat, stable, vérifiée. Une balance douteuse ne sert à rien : son résultat n'est pas fiable.",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
      },
      {
       "type": "point",
       "html": "Cas particulier : un fluide <b>zéotrope</b>, composé de plusieurs corps, se charge toujours en <b>phase liquide</b>. Le sortir en phase gazeuse changerait sa composition en cours de route.",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
      },
      {
       "type": "point",
       "html": "<ol><li>Poser la bouteille sur la balance <b>avant</b> toute opération. Relever le poids. Le noter — pas de mémoire.</li><li>Avant d'ouvrir la moindre vanne, déterminer l'<b>état du fluide</b> attendu : liquide ou gazeux, selon l'opération et la documentation constructeur. Ce choix fixe le sens du remplissage.</li><li>Réaliser l'opération — récupération ou charge — en surveillant la balance pendant que ça se fait, pas seulement à la fin.</li><li>Fermer les vannes, laisser la pression se stabiliser, déconnecter proprement.</li><li>Peser à nouveau, <b>après</b>. Relever ce second poids.</li><li>Calculer l'écart entre les deux pesées. C'est la quantité réelle, pas une estimation.</li><li>Reporter aussitôt le résultat au registre : date, quantité, intervenant.</li></ol>",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Deux pesées, jamais une",
       "html": "On pèse <b>avant</b> et <b>après</b>. Sans pesée de départ, le chiffre obtenu n'est qu'une <b>estimation</b>. Une estimation ne se consigne pas dans un registre.",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Peser seulement à la fin",
       "html": "Peser une seule fois, à la fin, et déduire la quantité à vue de nez : c'est le réflexe à corriger en premier. Lire une quantité chargée sur un manomètre plutôt que sur la balance ne donne jamais un chiffre exploitable non plus.",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
      }
     ],
     "questions": [
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
      }
     ],
     "notes": "Faire peser un objet neutre (bouteille d'eau, poids étalon) deux fois avant d'expliquer la règle, et demander ce qui se passerait si on n'avait que la seconde pesée — laisser le groupe trouver lui-même que le premier chiffre est indispensable. Faire remplir une ligne de registre fictive à partir des deux pesées relevées. Le réflexe à traquer : le stagiaire qui commence à manipuler avant d'avoir pesé — l'arrêter avant le premier geste, pas après."
    }
   ]
  }
 ]
};

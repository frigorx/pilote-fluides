/* SUPPORT DE PROJECTION — généré par build/parcours.mjs. NE PAS éditer à la main.
   Le contenu vient de cartes.js ; l'ordre vient de parcours.js. */
window.PILOTE_PROJECTION = {
 "parcours": {
  "id": "fluides-a1-5-jours",
  "titre": "Habilitation fluides frigorigènes — parcours de formation A1",
  "sous_titre": "Cinq jours, 35 heures, adossés à l'autoformation avant et pendant"
 },
 "base_img": "packs/fluides/res/",
 "jours": [
  {
   "n": 1,
   "libelle": null,
   "titre": "Se protéger, puis comprendre de quoi on parle",
   "intention": "La sécurité ouvre la formation : une heure, démontrée et imposée, jamais découverte par l'erreur. Vient ensuite le cadre réglementaire et la thermodynamique qui fonde tout le reste. Les fiches lues en amont sont REPRISES, pas relues : on questionne, on corrige, on ancre.",
   "sequences": [
    {
     "type": "plateau",
     "fiche": null,
     "titre": "Accueil, positionnement, analyse de risques du plateau, EPI en place",
     "minutes": 20,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "Accueil, positionnement, analyse de risques du plateau, EPI en place",
       "minutes": 20
      }
     ]
    },
    {
     "type": "cours",
     "fiche": "s1",
     "titre": "L'air qui manque — l'asphyxie",
     "minutes": 20,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "L'air qui manque — l'asphyxie",
       "dc": "Sécurité · codes 12.02 · 12.13",
       "competences": [
        {
         "code": "12.02",
         "lib": "Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI.",
         "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.13",
         "lib": "Vérifier la sécurité du site : signalisation, issues de secours, détecteurs et alarmes gaz.",
         "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=s1",
       "lancer": "🎧 Écouter la capsule : L'air qui manque — l'asphyxie",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 6 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/s1-double-accident.svg",
       "alt": "Animation : la nappe de gaz monte dans le local fermé, le technicien descend et tombe, puis le collègue descend le secourir et devient la seconde victime. Deux victimes au lieu d'une.",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "point",
       "html": "Respirer, c'est faire entrer de l'oxygène dans le corps. Un local fermé peut se remplir d'un autre gaz : de l'azote utilisé pour mettre un circuit en pression, ou du fluide frigorigène qui a fui. Ce gaz prend la place de l'oxygène dans l'air. C'est une <b>asphyxie par manque d'oxygène</b> : vous ne respirez plus assez d'oxygène, non pas parce qu'un produit vous empoisonne, mais parce qu'il a chassé l'air respirable.",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "point",
       "html": "Face à l'<b>azote</b> et aux <b>fluides fluorés</b>, le corps ne donne <b>aucune alerte</b>. Normalement, l'envie de respirer plus fort vient d'un excès de gaz carbonique dans le sang, pas d'un manque d'oxygène. Dans un local pauvre en oxygène, vous ne suffoquez donc pas peu à peu : vous pouvez perdre connaissance <b>en quelques instants, sans gêne ressentie avant</b>.",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "point",
       "html": "L'azote est incolore et inodore. La plupart des fluides fluorés le sont aussi ; l'ammoniac, lui, a une odeur forte. Mais tous les fluides ne se comportent pas pareil : se fier à l'odeur reste dangereux.",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "point",
       "html": "<b>Une exception importante : le CO₂ (R-744).</b> Lui vous <b>prévient</b> — essoufflement, mal de tête, vertiges — parce qu'il agit sur la commande de la respiration. C'est une chance, mais tardive : ces signes n'arrivent qu'une fois dans le gaz. Et pour la même raison, un détecteur d'oxygène seul ne suffit pas à le surveiller. Ce fluide a sa fiche : « CO₂ : deux dangers mortels ».",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "point",
       "html": "<b>Ce danger n'a pas de code dans le référentiel d'examen.</b> Vous ne serez pas interrogé dessus à l'épreuve. Il peut pourtant vous tuer. C'est pour cela qu'il est dans ce module.",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "point",
       "html": "C'est le scénario du schéma ci-dessus, et c'est le plus fréquent de ce type d'accident : un local resté fermé, quelqu'un qui entre sans rien sentir, puis un collègue qui se précipite pour le secourir sans se protéger ni ventiler — il respire le même air appauvri et s'effondre à son tour. <b>Deux victimes au lieu d'une.</b>",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qu'il faut retenir",
       "html": "<ol><li><b>Ventilez</b> le local avant d'entrer : ouvrez, aérez, laissez l'air circuler.</li><li><b>Contrôlez l'air</b> avec un détecteur d'oxygène avant d'entrer — pas seulement un détecteur de fuite de fluide, ce n'est pas le même appareil. Le seuil d'alerte se règle selon la FDS (fiche de données de sécurité) du fluide concerné. <b>Devant une installation au CO₂, un détecteur d'oxygène ne suffit pas</b> : il faut mesurer le CO₂ lui-même.</li><li><b>N'entrez jamais seul</b> dans un espace clos suspect : prévenez quelqu'un, travaillez à deux.</li><li>Si un collègue est au sol dans un espace clos : <b>ne vous précipitez pas sans protection</b>. Donnez l'alerte, ventilez, faites intervenir les secours.</li></ol>",
       "titre": "L'air qui manque — l'asphyxie"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le geste interdit",
       "html": "<p>Entrer seul dans un local fermé, une chambre froide ou une fosse, après une mise en pression à l'azote ou une fuite suspectée, <b>sans ventiler ni contrôler l'air</b>.</p><p>Conséquence : avec l'azote ou un fluide fluoré, perte de connaissance sans signe avant-coureur. Avec le CO₂, des signes arrivent — essoufflement, mal de tête — mais quand vous êtes déjà dans le gaz. Risque mortel dans les deux cas, pour vous et pour quiconque tenterait de vous secourir sans précaution.</p>",
       "titre": "L'air qui manque — l'asphyxie"
      }
     ],
     "questions": [
      {
       "id": "pk-cl2-1",
       "dc": "G12",
       "code": "12.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Que désigne la LIE d'un gaz inflammable ?",
       "choix": [
        "La concentration en dessous de laquelle le mélange avec l'air ne s'enflamme pas",
        "La température minimale d'inflammation de ce gaz au contact de l'air du local technique",
        "La pression maximale admissible dans la bouteille de stockage",
        "La quantité de gaz au-delà de laquelle il faut déclarer l'installation en préfecture"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-02-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Hydrocarbures a1 a2",
         "chemin": "hydrocarbures-a1-a2/index.html"
        }
       ],
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
        "Aucune précaution particulière lors de l'intervention",
        "Un outillage adapté et une formation spécifique",
        "Un local ATEX systématique pour toute intervention",
        "Un détecteur d'ammoniac dans le local"
       ],
       "bonne": 1,
       "explication": "Outillage adapté et formation spécifique — Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante.",
       "aide": "'Légèrement inflammable' ne veut pas dire 'sans risque'.",
       "remed": {
        "texte": "Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante."
       },
       "remediation_vers": "g12",
       "code": "12.02",
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-02-B88D83FC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
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
        "Les mêmes outils standards que pour un fluide A1",
        "Adaptés (pas de source d'ignition, ventilation)",
        "Uniquement manuels, sans aucune partie électrique",
        "Réalisés en matériaux composites non conducteurs"
       ],
       "bonne": 1,
       "explication": "Adaptés — Les fluides A2L nécessitent des outils sans source d'ignition, une ventilation adéquate et des détecteurs de gaz sur le lieu d'intervention.",
       "aide": "'Légèrement inflammable' impose des précautions, même si le risque est modéré.",
       "remed": {
        "texte": "Les fluides A2L nécessitent des outils sans source d'ignition, une ventilation adéquate et des détecteurs de gaz sur le lieu d'intervention."
       },
       "remediation_vers": "g12",
       "code": "12.02",
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-02-9D0D9800.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Intervention hydrocarbures interactive",
         "chemin": "intervention-hydrocarbures-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Montrez une bouteille d'azote avec son mano-détendeur : faites remarquer qu'elle ne porte aucun pictogramme « asphyxiant », contrairement à ce que les stagiaires imaginent souvent. Racontez le scénario du double accident (victime puis sauveteur) pour ancrer la règle « jamais seul, jamais sans ventiler ». Si un détecteur d'oxygène est disponible, faites-le manipuler et lire l'affichage ; comparez-le à un détecteur de fuite de fluide pour bien distinguer les deux appareils. Dites clairement à l'oral que ce risque ne sera pas noté à l'épreuve : c'est un risque réel, pas un risque de contrôle."
    },
    {
     "type": "cours",
     "fiche": "s4",
     "titre": "Ce qui éclate — la pression",
     "minutes": 20,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Ce qui éclate — la pression",
       "dc": "Sécurité · codes 11.03 · 3.01",
       "competences": [
        {
         "code": "11.03",
         "lib": "Connaître les règles de sécurité applicables aux fluides nécessitant une pression de fonctionnement plus élevée",
         "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": false,
         "tirage_au_sort": false
        },
        {
         "code": "3.01",
         "lib": "Réaliser une épreuve de pression à l'azote pour vérifier la résistance du circuit",
         "officiel": "Effectuer une épreuve de pression pour contrôler la résistance du système",
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=s4",
       "lancer": "🎧 Écouter la capsule : Ce qui éclate — la pression",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 7 écrans, 7 minutes. Version imprimable et mode projection compris.",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/secu-bouteille.svg",
       "alt": "À gauche, bouteille remplie à ras : le liquide n'a pas de place pour se dilater, la pression grimpe très vite. À droite, volume libre respecté. En bas, les gestes interdits.",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "<b>Ce qui arrive.</b> Un circuit frigorifique contient du fluide sous pression en permanence. Cette pression existe même quand la machine est à l'arrêt. Elle existe même quand il fait chaud dehors, alors que rien ne fonctionne. Une règle simple : plus la température monte, plus la pression à l'intérieur du circuit monte aussi.",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "Une paroi — bouteille, flexible, raccord, tuyauterie — résiste à une certaine pression. Au-delà, elle cède : elle se déforme, se fissure, ou éclate d'un coup. Ce n'est pas une réaction chimique, c'est une question de force. La pression pousse de l'intérieur ; la paroi résiste de l'extérieur. Quand la pression gagne, la paroi perd.",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "Ce qui peut céder :",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "Le schéma du haut explique pourquoi une bouteille ne se remplit <b>jamais</b> à ras : un liquide qui chauffe se dilate, et s'il n'a pas de volume libre au-dessus de lui, la pression grimpe très vite. Le taux de remplissage à respecter figure sur la plaque de la bouteille ou dans la documentation du fournisseur ; les propriétés du fluide, dans sa fiche de données de sécurité (FDS).",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "<b>Comment ça arrive vraiment.</b> Sur un chantier, une bouteille de fluide oubliée dans un véhicule en plein été, vitres fermées, en est un exemple courant : l'habitacle chauffe fortement, la bouteille avec. Autre situation : un flexible de manifold ancien, jamais contrôlé, qui cède au moment où l'on ouvre une vanne.",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "Autre situation encore : un tronçon de tuyauterie en toiture, isolé par deux vannes fermées pendant une réparation, laissé en plein soleil sans protection ni vérification avant de reprendre le travail dessus.",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "Un compresseur à l'arrêt n'est pas forcément une machine sans danger. Un circuit peut rester sous pression longtemps après l'arrêt d'une installation, sans qu'aucune fuite ne se produise. Rien à l'extérieur ne signale cette pression : ni bruit, ni mouvement, ni tiédeur. Un technicien qui desserre un raccord en se disant « de toute façon, c'est arrêté depuis longtemps » peut se retrouver face à une projection de fluide et de pièces.",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "<b>Ce qui protège.</b> Dans l'ordre où on l'applique :",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "<ul><li>une <b>bouteille de fluide</b> qui a chauffé au soleil ou près d'une source de chaleur ;</li><li>un <b>flexible</b> fatigué par le temps, l'usure ou de mauvais pliages ;</li><li>un <b>raccord</b> mal serré ou abîmé ;</li><li>un tronçon de circuit fermé des deux côtés par des vannes, sans aucune protection, alors qu'il reste rempli de fluide.</li></ul>",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "<ol><li>Ne jamais exposer une bouteille de fluide à la chaleur ou au soleil direct : la stocker et la transporter à l'abri, à la verticale, arrimée.</li><li>Respecter le taux de remplissage indiqué par le fabricant : ne jamais remplir une bouteille à ras.</li></ol>",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "<ol start=\"3\"><li>Connaître le rôle des <b>organes de sécurité</b> du circuit. Une <b>soupape de sécurité</b> s'ouvre automatiquement pour laisser échapper un peu de fluide avant que la pression n'atteigne un niveau dangereux ; son seuil de déclenchement est fixé par le fabricant et indiqué sur l'organe ou dans sa documentation. Vérifier la présence et le bon état de ces organes, sans jamais les démonter ni les bloquer.</li></ol>",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "point",
       "html": "<ol start=\"4\"><li>Pour toute mise en pression du circuit — recherche de fuite, épreuve de pression — utiliser <b>uniquement de l'azote</b>, jamais de l'oxygène ni de l'air comprimé, et toujours au travers d'un <b>mano-détendeur</b> (un appareil qui réduit et règle la pression très élevée de la bouteille) réglé selon la documentation constructeur. Sans détendeur, la pression de la bouteille d'azote suffit à elle seule à faire éclater un circuit frigorifique.</li><li>Avant de desserrer quoi que ce soit sur un circuit à l'arrêt, mesurer sa pression au manomètre — même si l'installation semble arrêtée depuis longtemps.</li></ol>",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qu'il faut retenir",
       "html": "<ul><li>Un circuit reste sous pression même à l'arrêt et même par forte chaleur.</li><li>Une bouteille de fluide ne se chauffe jamais et ne se remplit jamais à ras.</li><li>Toute mise en pression se fait à l'azote seul, jamais à l'oxygène ni à l'air comprimé, toujours avec un mano-détendeur réglé selon la documentation constructeur.</li><li>Avant de toucher un raccord, vérifier la pression au manomètre, même sur une machine arrêtée depuis longtemps.</li></ul>",
       "titre": "Ce qui éclate — la pression"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le geste interdit",
       "html": "<p>On ne chauffe <b>jamais</b> une bouteille de fluide pour accélérer un transfert ou une charge — ni flamme, ni eau chaude, ni radiateur. On ne met <b>jamais</b> un circuit sous pression avec de l'oxygène ou de l'air comprimé, et on n'utilise <b>jamais</b> une bouteille d'azote sans mano-détendeur. Conséquence : la bouteille ou le circuit peut éclater et projeter du fluide et des fragments sur la personne présente.</p>",
       "titre": "Ce qui éclate — la pression"
      }
     ],
     "questions": [
      {
       "id": "pk-cl3-1",
       "dc": "G11",
       "code": "11.03",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Une fuite de CO₂ (R-744) s'est produite dans un local technique. Où le gaz s'accumule-t-il ?",
       "choix": [
        "Près du plafond, car les gaz montent toujours vers le haut",
        "Dans les points bas : fosse, cave, sous-sol, bas de local, car il est plus lourd que l'air",
        "Il se répartit uniformément, et sans danger particulier, dans tout le volume du local technique",
        "Il s'échappe seul par les interstices, sans jamais s'accumuler nulle part"
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
       "chapitre": "11",
       "chapitre_titre": "Technologies de substitution et efficacité énergétique",
       "chapitre_fichier": "CONTENU-11-G11-substitution-efficacite.md",
       "illustration": "illustrations/sup-cours-11-03-B88D83FC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
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
        "De l'oxygène pur",
        "De l'azote sec",
        "De l'air comprimé",
        "Du fluide du circuit"
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
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/sup-cours-3-01-70D0D9E9.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Epreuve azote",
         "chemin": "illustrations/epreuve-azote.svg"
        }
       ],
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
       "chapitre": "11",
       "chapitre_titre": "Technologies de substitution et efficacité énergétique",
       "chapitre_fichier": "CONTENU-11-G11-substitution-efficacite.md",
       "illustration": "illustrations/sup-cours-11-03-DAF5A7C7.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Conseil d'animation : faire observer côte à côte une bouteille d'azote équipée de son mano-détendeur et un flexible hors service, fatigué ou fissuré. Montrer une soupape de sécurité démontée (pièce morte, jamais sur une machine en service) et expliquer son déclenchement. Demander au groupe, avant de répondre : « un compresseur arrêté depuis longtemps, est-il encore sous pression ? » — laisser les hypothèses circuler avant de trancher. Insister à l'oral sur l'interdiction absolue de l'oxygène et de l'air comprimé pour mettre un circuit en pression."
    },
    {
     "type": "cours",
     "fiche": "g0",
     "titre": "Ce que la loi vous impose",
     "minutes": 25,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g0",
       "lancer": "🎧 Écouter la capsule : Ce que la loi vous impose",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 8 écrans, 7 minutes. Version imprimable et mode projection compris.",
       "titre": "Ce que la loi vous impose"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/aptitude-capacite.svg",
       "alt": "L'attestation d'aptitude concerne la personne et prouve qu'elle sait faire ; l'attestation de capacité concerne l'entreprise et prouve qu'elle a le personnel, l'outillage et les procédures. Il faut les deux.",
       "titre": "Ce que la loi vous impose"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-00-0A8DFFB1.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Aptitude capacite",
         "chemin": "illustrations/aptitude-capacite.svg"
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
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/bib-moteur-de-registre-af-belimo-79ab7b5f.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Controle etancheite registre",
         "chemin": "illustrations/controle-etancheite_registre.svg"
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
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/bib-moteur-de-registre-af-belimo-79ab7b5f.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Controle etancheite registre",
         "chemin": "illustrations/controle-etancheite_registre.svg"
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
       "id": "pk-g0-2",
       "dc": "G1",
       "code": "1.00",
       "niveau": 2,
       "type": "qcm",
       "enonce": "Un climatiseur trop vieux part au rebut, dans la filière DEEE. Que devient le fluide frigorigène qu'il contient encore ?",
       "choix": [
        "Il doit être récupéré à part, avant que la carcasse parte en DEEE",
        "Il part avec la carcasse, la filière DEEE s'occupe aussi du fluide",
        "Il est automatiquement détruit par le centre de tri DEEE qui le reçoit",
        "Il n'y a aucune obligation particulière, la quantité restante est faible"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/bib-ep1-2ifca-bbrmodie-correction-8e9eb74f.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "La recuperation la trace",
         "chemin": "illustrations/la-recuperation_la-trace.svg"
        }
       ],
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
     "fiche": "g2",
     "titre": "Impact environnemental et F-Gas",
     "minutes": 35,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g2",
       "lancer": "🎧 Écouter la capsule : Impact environnemental et F-Gas",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 7 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "Impact environnemental et F-Gas"
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
       "chapitre": "13",
       "chapitre_titre": "CO₂ / R-744 : information et sensibilisation aux risques",
       "chapitre_fichier": "CONTENU-13-G13-co2-information-risques.md",
       "illustration": "illustrations/sup-cours-2-02-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Teqco2 calcul",
         "chemin": "illustrations/teqco2-calcul.svg"
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
       "chapitre": "02",
       "chapitre_titre": "Incidence environnementale & réglementations",
       "chapitre_fichier": "CONTENU-02-G2-environnement.md",
       "illustration": "illustrations/sup-cours-2-02-E32EF21D.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "outil",
         "libelle": "Fiche fluide",
         "chemin": "outils/fiche-fluide.html"
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
       "chapitre": "02",
       "chapitre_titre": "Incidence environnementale & réglementations",
       "chapitre_fichier": "CONTENU-02-G2-environnement.md",
       "illustration": "illustrations/sup-cours-2-01-7041C98E.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Hfc ozone climat",
         "chemin": "illustrations/hfc-ozone-climat.svg"
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
       "chapitre": "02",
       "chapitre_titre": "Incidence environnementale & réglementations",
       "chapitre_fichier": "CONTENU-02-G2-environnement.md",
       "illustration": "illustrations/sup-cours-2-02-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Prp regle serre",
         "chemin": "illustrations/prp-regle-serre.svg"
        },
        {
         "type": "outil",
         "libelle": "Fiche fluide",
         "chemin": "outils/fiche-fluide.html"
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
       "chapitre": "02",
       "chapitre_titre": "Incidence environnementale & réglementations",
       "chapitre_fichier": "CONTENU-02-G2-environnement.md",
       "illustration": "illustrations/sup-cours-2-01-E32EF21D.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Hfc ozone climat",
         "chemin": "illustrations/hfc-ozone-climat.svg"
        }
       ],
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
     "fiche": "g2a",
     "titre": "Quarante ans d'histoire : de l'ozone au climat",
     "minutes": 20,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g2a",
       "lancer": "🎧 Écouter la capsule : Quarante ans d'histoire : de l'ozone au climat",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 7 écrans, 7 minutes. Version imprimable et mode projection compris.",
       "titre": "Quarante ans d'histoire : de l'ozone au climat"
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
       "chapitre": "02",
       "chapitre_titre": "Incidence environnementale & réglementations",
       "chapitre_fichier": "CONTENU-02-G2-environnement.md",
       "illustration": "illustrations/sup-cours-2-01-7041C98E.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Hfc ozone climat",
         "chemin": "illustrations/hfc-ozone-climat.svg"
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
       "chapitre": "02",
       "chapitre_titre": "Incidence environnementale & réglementations",
       "chapitre_fichier": "CONTENU-02-G2-environnement.md",
       "illustration": "illustrations/sup-cours-2-01-E32EF21D.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Hfc ozone climat",
         "chemin": "illustrations/hfc-ozone-climat.svg"
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
       "chapitre": "02",
       "chapitre_titre": "Incidence environnementale & réglementations",
       "chapitre_fichier": "CONTENU-02-G2-environnement.md",
       "illustration": "illustrations/sup-cours-2-01-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Hfc ozone climat",
         "chemin": "illustrations/hfc-ozone-climat.svg"
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
       "chapitre": "02",
       "chapitre_titre": "Incidence environnementale & réglementations",
       "chapitre_fichier": "CONTENU-02-G2-environnement.md",
       "illustration": "illustrations/sup-cours-2-01-7041C98E.png",
       "pose_niveau": "cours",
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
     "fiche": "g1a",
     "titre": "Unités, pression, thermodynamique utile",
     "minutes": 35,
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
       "type": "experience",
       "url": "packs/fluides/res/chaleur-circuit-interactif/index.html",
       "lancer": "🌡️ Lancer le cours interactif : premières notions de thermodynamique",
       "desc": "Le tome 2 du circuit : température, énergie et puissance, chaleur sensible et latente avec calculateurs, saturation, surchauffe et sous-refroidissement, bilans énergétiques — 12 écrans narrés et un quiz de 12 questions (seuil 9/12), environ 20 minutes.",
       "titre": "Unités, pression, thermodynamique utile"
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
       "type": "point",
       "html": "Une autre grandeur sert tous les jours au frigoriste : la <b>masse volumique</b> (on dit aussi <b>densité</b>). C'est la masse contenue dans un volume donné, en <b>kg/m³</b>. Pour un même fluide, la vapeur et le liquide n'ont pas du tout la même masse volumique : un litre de liquide pèse beaucoup plus lourd qu'un litre de vapeur.",
       "titre": "Unités, pression, thermodynamique utile"
      },
      {
       "type": "point",
       "html": "C'est pour ça qu'on charge un circuit en <b>phase liquide</b> plutôt qu'en vapeur : on fait entrer beaucoup plus de matière pour le même volume de bouteille, et le dimensionnement des tuyauteries en tient compte.",
       "titre": "Unités, pression, thermodynamique utile"
      },
      {
       "type": "point",
       "html": "Sur le diagramme du fluide, la grandeur qu'on lit en abscisse s'appelle l'<b>enthalpie</b>. C'est l'énergie contenue dans un kilo de fluide, en <b>kJ/kg</b> (kilojoule par kilo). Elle sert à calculer ce que l'évaporateur absorbe et ce que le condenseur évacue : plus l'écart d'enthalpie entre l'entrée et la sortie est grand, plus l'échange de chaleur est important.",
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
       "html": "<img src=\"packs/fluides/res/svg/pression-absolue-relative.svg\" alt=\"Animation : deux échelles verticales côte à côte, la relative du manomètre et l'absolue des tables, décalées de 1 bar — un curseur monte le long des deux en même temps, et le manomètre à zéro est déjà à 1 bar absolu.\" style=\"width:100%;height:auto;display:block;margin:0 0 18px;border:1px solid #d7e0e8;border-radius:8px\"><b>Pression absolue = pression relative + environ 1 bar.</b> Un manomètre de service lit en relatif ; les tables de saturation, elles, sont souvent en absolu. Se tromper d'un bar, c'est se tromper de plusieurs kelvins sur la température de saturation — et diagnostiquer une fuite qui n'existe pas.",
       "titre": "Unités, pression, thermodynamique utile"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Mélanges zéotropes : le glissement",
       "html": "<p>Certains fluides sont des <b>mélanges zéotropes</b> : plusieurs fluides purs mélangés dont les composants ne s'évaporent pas ensemble. Résultat, pendant tout le changement d'état, la température n'est pas constante : elle <b>glisse</b>, on parle de <b>glissement</b>. Conséquence pratique : on charge et on soutire toujours ces mélanges en <b>phase liquide</b>, jamais en phase vapeur, sinon la composition change et le fluide qui reste dans la bouteille n'est plus le même.</p>",
       "titre": "Unités, pression, thermodynamique utile"
      }
     ],
     "questions": [
      {
       "id": "pk-g1e-1",
       "dc": "G1",
       "code": "1.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Un technicien annonce « la surchauffe est de 7 ». De quoi parle-t-il exactement ?",
       "choix": [
        "De la température relevée au contact du tube d'aspiration, soit les 7 °C lus sur son thermomètre",
        "D'un écart de 7 K entre la température lue à l'aspiration et celle de vaporisation du fluide",
        "De la pression d'aspiration lue au manomètre basse pression, exprimée en bars relatifs",
        "De 7 degrés au-dessus de zéro mesurés dans l'ambiance de la chambre froide en marche"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-02-F6773E86.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La chaleur surchauffe sousrefroidissement",
         "chemin": "illustrations/la-chaleur_surchauffe-sousrefroidissement.svg"
        }
       ],
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
        "D'un thermomètre de contact seul, posé sur la ligne d'aspiration",
        "D'un manomètre, d'un thermomètre de contact, et de la table de saturation du fluide présent",
        "D'un manomètre seul : la pression suffit à déduire la surchauffe",
        "D'un thermomètre infrarouge, d'un détecteur électronique de fuite et de la documentation machine"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-02-819DA516.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La chaleur surchauffe sousrefroidissement",
         "chemin": "illustrations/la-chaleur_surchauffe-sousrefroidissement.svg"
        }
       ],
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
        "À protéger le compresseur contre les coups de liquide à l'aspiration",
        "À accélérer le dégivrage naturel de la batterie évaporateur",
        "À limiter la pression de condensation par forte chaleur extérieure"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/bib-image-205-eceebfe3.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Chaleur interactive",
         "chemin": "chaleur-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2",
        "D"
       ]
      },
      {
       "id": "pk-g1s-1",
       "dc": "G1",
       "code": "1.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Un fluide est en train de bouillir. Vous continuez à lui apporter de la chaleur. Que devient sa température ?",
       "choix": [
        "Elle continue de monter, mais nettement plus lentement qu'avant",
        "Elle ne bouge pas tant qu'il reste du liquide à vaporiser",
        "Elle redescend légèrement pendant l'ébullition",
        "Elle monte par à-coups, à chaque train de bulles qui remonte"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-02-819DA516.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Palier chaleur latente",
         "chemin": "illustrations/palier-chaleur-latente.svg"
        },
        {
         "type": "page",
         "libelle": "Chaleur interactive",
         "chemin": "chaleur-interactive/index.html"
        }
       ],
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
        "piege": "Le point critique est autre chose : c'est le sommet de la cloche du diagramme, au-delà duquel le fluide ne se sépare plus'en liquide et en vapeur."
       },
       "remediation_vers": "g1s",
       "explication": "Le palier de changement d'état commence au point de bulle — la première bulle de vapeur — et finit au point de rosée — la dernière goutte de liquide.",
       "origine": "pack",
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/bib-14899-bac-pro-tfca-epreuve-u11-dossier-r-10f91ed0.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Le circuit evaporateur",
         "chemin": "illustrations/le-circuit_evaporateur.svg"
        }
       ],
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
     "fiche": "g1s",
     "titre": "Chaleur sensible et chaleur latente",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Chaleur sensible et chaleur latente",
       "dc": "G1 · code 1.02",
       "competences": [
        {
         "code": "1.02",
         "lib": "Distinguer chaleur sensible et chaleur latente, et nommer les états du fluide",
         "officiel": "Comprendre la théorie élémentaire des systèmes de réfrigération : thermodynamique élémentaire (terminologie, paramètres et processus essentiels tels que « surchauffe », « côté haute pression », « chaleur de compression », « enthalpie », « effet de réfrigération », « côté basse pression », « sous-refroidissement »), propriétés et transformations thermodynamiques des réfrigérants, y compris l'identification des mélanges zéotropiques et des états des fluides",
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
       "type": "experience",
       "url": "packs/fluides/res/chaleur-interactive/index.html",
       "lancer": "🧊 Lancer le cours interactif : du glaçon au circuit frigorifique",
       "desc": "12 étapes racontées : glaçon et casserole, quantité d'énergie, courbes de chauffe et de refroidissement, chaleurs sensible et latente, liquéfaction, réfrigérateur, circuit frigorifique, surchauffe/sous-refroidissement et défi final — environ 15 minutes.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/chaleur-sensible-latente.svg",
       "alt": "La courbe de chauffe d'un fluide : la température monte, puis s'arrête pendant tout le changement d'état, puis repart. Le palier commence au point de bulle et finit au point de rosée.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "point",
       "html": "Chauffez de l'eau dans une casserole. Le thermomètre monte, régulièrement. Cette chaleur-là, l'appareil la « sent » : on l'appelle la <b>chaleur sensible</b>. Elle fait changer la <b>température</b>, elle ne fait pas changer l'état.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "point",
       "html": "Continuez à chauffer. L'eau se met à bouillir — et là, quelque chose d'étonnant se produit : <b>le thermomètre s'arrête</b>. Vous chauffez toujours, la température ne monte plus. Toute la chaleur apportée sert à transformer le liquide en vapeur, et rien d'autre. C'est la <b>chaleur latente</b>. Le mot vient du latin <i>latens</i>, « caché » : cette chaleur est bien là, elle est même considérable, mais le thermomètre ne la voit pas.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "point",
       "html": "Sur la courbe, ce moment forme un <b>palier</b>, une ligne plate. Il commence quand la première bulle se forme : c'est le <b>point de bulle</b>. Il finit quand la dernière goutte disparaît : c'est le <b>point de rosée</b>. Entre les deux, du liquide et de la vapeur cohabitent dans le même tube — on dit que le fluide est <b>saturé</b>.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "point",
       "html": "Voilà pourquoi une machine frigorifique ne travaille pas avec de l'air, mais avec un fluide qui <b>change d'état</b>. Sur le palier, le fluide encaisse beaucoup de chaleur sans s'échauffer : c'est exactement ce qu'on cherche. L'<b>évaporateur</b> fait bouillir le fluide, donc il <b>prend</b> de la chaleur au local. Le <b>condenseur</b> le liquéfie, donc il <b>rend</b> cette chaleur dehors. Toute la machine tient dans ces deux phrases.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "point",
       "html": "Deux mots du référentiel se posent ici, une fois pour toutes. La chaleur que l'évaporateur prend au local, rapportée à un kilo de fluide, s'appelle l'<b>effet de réfrigération</b> : c'est le froid produit, et c'est ce que l'on cherche à rendre le plus grand possible.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "point",
       "html": "Le compresseur, lui, ajoute au fluide sa propre chaleur en le comprimant : c'est la <b>chaleur de compression</b>. Le condenseur devra donc évacuer les deux — la chaleur prise au local <b>et</b> celle ajoutée par le compresseur. C'est pour cette raison qu'un condenseur évacue toujours plus de chaleur qu'un évaporateur n'en absorbe.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "point",
       "html": "Reste une question : à quelle température se produit la <b>vaporisation</b>, donc le palier ? Elle dépend de la <b>pression</b>. Plus la pression est basse, plus le fluide bout froid. C'est précisément ce que fait le <b>détendeur</b> : il fait chuter la pression pour que le fluide puisse bouillir à une température plus basse que le local à refroidir. La relation pression-température vue à la fiche précédente, c'est la <b>hauteur du palier</b>.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Les cinq mots, dans l'ordre",
       "html": "<b>1. Liquide sous-refroidi</b> — que du liquide, plus froid que son point d'ébullition.<br><b>2. Point de bulle</b> — la première bulle apparaît, le palier commence.<br><b>3. Saturé</b> — liquide et vapeur ensemble, la température ne bouge plus.<br><b>4. Point de rosée</b> — la dernière goutte s'évapore, le palier finit.<br><b>5. Vapeur surchauffée</b> — que de la vapeur, et la température peut repartir.<br>Ce que la vapeur gagne après le point de rosée s'appelle la <b>surchauffe</b>. Ce que le liquide perd avant le point de bulle s'appelle le <b>sous-refroidissement</b>. Ces deux mots reviendront à chaque mesure du métier.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Un palier n'est pas une pause",
       "html": "Sur le palier, la température ne bouge pas — et beaucoup en concluent qu'il ne se passe rien. C'est l'inverse : <b>c'est le moment où le fluide échange le plus de chaleur</b>. Un stagiaire qui croit qu'un palier est un temps mort ne comprendra jamais à quoi sert un évaporateur.",
       "titre": "Chaleur sensible et chaleur latente"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le palier des mélanges n'est pas plat",
       "html": "Ce qui vient d'être dit vaut pour un <b>corps pur</b>. Dans un <b>mélange zéotrope</b> (les R-4xx), les composants ne bouillent pas tous à la même température : pendant le changement d'état, la température <b>monte lentement</b> au lieu de rester fixe. C'est le <b>glissement</b>. Conséquence directe : le point de bulle et le point de rosée ne sont plus à la même température, et il faut savoir <b>lequel des deux</b> la table de saturation vous donne avant de calculer quoi que ce soit.",
       "titre": "Chaleur sensible et chaleur latente"
      }
     ],
     "questions": [
      {
       "id": "pk-g1e-1",
       "dc": "G1",
       "code": "1.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Un technicien annonce « la surchauffe est de 7 ». De quoi parle-t-il exactement ?",
       "choix": [
        "De la température relevée au contact du tube d'aspiration, soit les 7 °C lus sur son thermomètre",
        "D'un écart de 7 K entre la température lue à l'aspiration et celle de vaporisation du fluide",
        "De la pression d'aspiration lue au manomètre basse pression, exprimée en bars relatifs",
        "De 7 degrés au-dessus de zéro mesurés dans l'ambiance de la chambre froide en marche"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-02-F6773E86.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La chaleur surchauffe sousrefroidissement",
         "chemin": "illustrations/la-chaleur_surchauffe-sousrefroidissement.svg"
        }
       ],
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
        "D'un thermomètre de contact seul, posé sur la ligne d'aspiration",
        "D'un manomètre, d'un thermomètre de contact, et de la table de saturation du fluide présent",
        "D'un manomètre seul : la pression suffit à déduire la surchauffe",
        "D'un thermomètre infrarouge, d'un détecteur électronique de fuite et de la documentation machine"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-02-819DA516.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La chaleur surchauffe sousrefroidissement",
         "chemin": "illustrations/la-chaleur_surchauffe-sousrefroidissement.svg"
        }
       ],
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
        "À protéger le compresseur contre les coups de liquide à l'aspiration",
        "À accélérer le dégivrage naturel de la batterie évaporateur",
        "À limiter la pression de condensation par forte chaleur extérieure"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/bib-image-205-eceebfe3.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Chaleur interactive",
         "chemin": "chaleur-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2",
        "D"
       ]
      }
     ],
     "notes": "Ne pas énoncer la règle : la faire trouver. Question d'ouverture : « l'eau bout dans la casserole, je mets le feu à fond — la température monte-t-elle plus haut ? » Le groupe hésite toujours, et c'est de cette hésitation qu'on part. Démonstration possible en salle avec un thermomètre et une bouilloire ouverte. Ancrage métier immédiat : faire dire par le groupe où se trouve le palier dans la machine (évaporateur ET condenseur, parcouru dans les deux sens). Cette fiche conditionne g1b et g1e : tant que le palier n'est pas acquis, la surchauffe n'est qu'un mot. Le glissement des zéotropes ne se détaille pas ici — il se rappelle, il a été posé en g1a."
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
         "lib": "Lire un diagramme log p-h, une table de saturation, et y tracer un cycle",
         "officiel": "Utiliser les tableaux et graphiques correspondants et les interpréter dans le cadre de contrôles d'étanchéité indirects (y compris le contrôle du bon fonctionnement du système) : diagramme log p/h, tables de saturation d'un réfrigérant, diagramme d'un cycle frigorifique simple à compression",
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
       "type": "experience",
       "url": "packs/fluides/res/pression-temperature-interactive/index.html",
       "lancer": "🫧 Lancer le cours interactif : faire bouillir sans feu",
       "desc": "12 étapes racontées : cloche à vide, relation pression–température, températures de saturation, évaporateur et condenseur, lecture manomètre–table, point de bulle, point de rosée, glissement des zéotropes et défi final — environ 15 minutes.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/diagramme-logph.svg",
       "alt": "Le diagramme log p-h : la cloche sépare le liquide, le mélange et la vapeur surchauffée ; le cycle s'y trace en quatre transformations qui forment un rectangle.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Le <b>diagramme log p-h</b> raconte en image ce que la fiche précédente a raconté en mots. Deux axes seulement. En <b>ordonnée</b>, la <b>pression</b>. En <b>abscisse</b>, l'<b>enthalpie</b> : l'énergie contenue dans un kilo de fluide.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "La pression y est portée sur une <b>échelle logarithmique</b> — c'est ce que veut dire le « log » du nom. Sur une règle ordinaire, la basse pression serait écrasée tout en bas de la feuille et illisible. Sur cette échelle-là, les petites pressions sont autant étalées que les grandes : les deux côtés du circuit se lisent aussi bien.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Au milieu du diagramme, une <b>courbe en cloche</b> partage la feuille en trois. À <b>gauche</b> de la cloche, le fluide est entièrement <b>liquide</b>. <b>Sous</b> la cloche, c'est le <b>mélange</b> liquide + vapeur : le palier. À <b>droite</b>, c'est de la <b>vapeur surchauffée</b>. Le sommet de la cloche s'appelle le <b>point critique</b> : au-dessus, le fluide ne se sépare plus en liquide et vapeur.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Les deux flancs de la cloche portent les noms déjà rencontrés : le flanc de gauche est la <b>courbe de bulle</b>, le flanc de droite la <b>courbe de rosée</b>. La cloche du diagramme et le palier de la courbe de chauffe sont la même chose, vue autrement.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Le <b>cycle frigorifique</b> simple à compression se trace alors en <b>quatre transformations</b>, qui dessinent un rectangle. Le trait <b>montant de droite</b> : la <b>compression</b>. Le trait <b>horizontal du haut</b> : la <b>condensation</b>, à haute pression. Le trait <b>descendant de gauche</b> : la <b>détente</b>.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Le trait <b>horizontal du bas</b> : l'<b>évaporation</b>, à basse pression. Compresseur à droite, condenseur en haut, détendeur à gauche, évaporateur en bas : <b>c'est la croix du frigoriste</b>. Le diagramme n'invente rien, il met le circuit à plat.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Et c'est là que le diagramme devient un outil de terrain. Sur le trait du <b>bas</b>, ce qui dépasse à droite de la courbe de rosée, c'est la <b>surchauffe</b>. Sur le trait du <b>haut</b>, ce qui dépasse à gauche de la courbe de bulle, c'est le <b>sous-refroidissement</b>. Deux longueurs qui se voient d'un coup d'œil.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "Un diagramme de constructeur porte d'autres réseaux de courbes que celui dessiné ici. Sous la cloche, des courbes obliques donnent le <b>titre de vapeur</b> : la part du fluide déjà passée à l'état vapeur, de 0 sur la courbe de bulle à 1 sur la courbe de rosée. Il n'est pas nécessaire de les exploiter pour l'épreuve, mais il faut savoir les reconnaître pour ne pas les confondre avec les frontières de la cloche.",
       "titre": "Lire un log p-h et une table de saturation"
      },
      {
       "type": "point",
       "html": "La <b>table de saturation</b> dit exactement la même chose, en chiffres. Elle donne, pour un fluide donné, la correspondance entre pression et température d'équilibre. Elle se lit dans les deux sens : je mesure une pression, j'en déduis une température ; je mesure une température, j'en déduis une pression. La colonne « température de saturation » de la table, c'est la cloche du diagramme.",
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
       "t": "L'échelle des pressions n'est pas une règle graduée",
       "html": "Sur une échelle <b>logarithmique</b>, ce qui est constant n'est pas l'écart entre deux graduations, c'est le <b>rapport</b>. La même distance sépare 1 et 10, puis 10 et 100. Conséquence pratique : <b>on ne mesure pas une pression à la règle sur ce diagramme</b>, on lit la graduation. Les valeurs, elles, se prennent au manomètre et dans la table.",
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
        "Au-dessus de la cloche"
       ],
       "bonne": 1,
       "aide": "La cloche est une frontière. Ce qu'elle enferme, c'est le palier.",
       "remed": {
        "regle": "La courbe en cloche partage le diagramme en trois : liquide à gauche, mélange liquide + vapeur sous la cloche, vapeur surchauffée à droite.",
        "pourquoi": "Le flanc gauche de la cloche est la courbe de bulle, le flanc droit la courbe de rosée. La cloche du diagramme et le palier de la courbe de chauffe sont la même chose, vue autrement.",
        "piege": "Le sommet de la cloche est le point critique : au-dessus, le fluide ne se sépare plus'en liquide et en vapeur, il n'y a donc plus de palier."
       },
       "remediation_vers": "g1b",
       "explication": "La courbe en cloche partage le diagramme en trois : liquide à gauche, mélange liquide + vapeur sous la cloche, vapeur surchauffée à droite.",
       "origine": "pack",
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-03-7CE9B528.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Diagramme logph",
         "chemin": "illustrations/diagramme-logph.svg"
        }
       ],
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-03-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Diagramme logph",
         "chemin": "illustrations/diagramme-logph.svg"
        },
        {
         "type": "page",
         "libelle": "Pression temperature interactive",
         "chemin": "pression-temperature-interactive/index.html"
        }
       ],
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
        "Entièrement liquide, sous-refroidi",
        "Entièrement gazeux, surchauffé",
        "Un mélange liquide + vapeur",
        "À l'état supercritique"
       ],
       "bonne": 2,
       "explication": "Un mélange liquide + vapeur — Sous la courbe de saturation, le fluide est en changement de phase : liquide + vapeur coexistent.",
       "aide": "La 'cloche' délimite la zone où les deux phases coexistent.",
       "remed": {
        "texte": "Sous la courbe de saturation, le fluide est en changement de phase : liquide + vapeur coexistent."
       },
       "remediation_vers": "g1a",
       "code": "1.03",
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-03-7CE9B528.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Bulle rosee",
         "chemin": "illustrations/bulle-rosee.svg"
        },
        {
         "type": "page",
         "libelle": "Pression temperature interactive",
         "chemin": "pression-temperature-interactive/index.html"
        }
       ],
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-03-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Chaleur interactive",
         "chemin": "chaleur-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2",
        "E"
       ]
      }
     ],
     "notes": "Fiche indispensable au parcours E : sans elle, la méthode indirecte est du bricolage. Utiliser FRIGOLO en projection, puis faire refaire la lecture sur une table papier — le passage de l'outil à la table imprimée est ce qui reste le jour de l'épreuve. Faire chercher : « la pression est plus basse que la table, qu'est-ce que ça peut vouloir dire ? » avant de donner « manque de charge ». Le TRACÉ DU CYCLE est exigé par le libellé du code 1.03 : le faire faire à la main sur un diagramme vierge — quatre traits, dans l'ordre — avant tout usage d'un outil. Le moment qui fait mouche : demander au groupe de reconnaître la croix du frigoriste dans le rectangle. Le code 1.06 a été retiré de cette fiche le 27/07 : elle n'enseigne pas les fluides de substitution, c'est g1c qui le fait. On ne déclare pas un code qu'on n'enseigne pas."
    },
    {
     "type": "cours",
     "fiche": "g1e",
     "titre": "Surchauffe et sous-refroidissement",
     "minutes": 25,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Surchauffe et sous-refroidissement",
       "dc": "G1 · codes 1.02 · 5.05",
       "competences": [
        {
         "code": "1.02",
         "lib": "Expliquer la surchauffe et le sous-refroidissement, et savoir les mesurer",
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
         "code": "5.05",
         "lib": "Déterminer l'état d'un fluide : sous-refroidi, saturé ou surchauffé",
         "officiel": "Déterminer l'état (liquide, gazeux) et les conditions (sous-refroidi, saturé ou surchauffé) d'un réfrigérant avant tout remplissage afin de choisir la méthode et le volume de remplissage les plus adaptés. Remplir le système de réfrigérant (à l'état liquide et gazeux) sans provoquer de pertes",
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
       "type": "experience",
       "url": "packs/fluides/res/froid-clim-academie/index.html",
       "lancer": "🎛️ Lancer le cours interactif : surchauffe et sous-refroidissement",
       "desc": "Le cycle animé, puis quatre curseurs à manipuler (évaporation, condensation, surchauffe, sous-refroidissement) : les pressions réagissent et le risque s'affiche — avec un atelier panne et un quiz flash — environ 10 minutes.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/surchauffe-sous-refroidissement-interactif/index.html",
       "lancer": "🌡️ S'entraîner au calcul : surchauffe et sous-refroidissement pas à pas",
       "desc": "13 étapes : vocabulaire, instruments, point de rosée et point de bulle, calcul BP puis HP, surchauffe utile et totale, cas du zéotrope R-407C, protocole du double relevé et défi final de 10 questions (seuil 8/10) — environ 15 minutes.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/surchauffe-utile-totale.svg",
       "alt": "Le fluide bout dans l'évaporateur ; après la disparition de la dernière goutte, la vapeur s'échauffe : c'est la surchauffe utile dans l'échangeur, puis la surchauffe totale jusqu'au compresseur.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "point",
       "html": "Voici les deux mots que vous entendrez le plus souvent sur un chantier. Et la première chose à comprendre est la plus importante : <b>ce sont des différences, jamais des températures</b>. On ne dit pas « la surchauffe est de 12 degrés » comme on dirait « il fait 12 degrés ». On dit : le fluide est <b>12 kelvins au-dessus</b> de sa température de changement d'état, à la pression où il se trouve.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "point",
       "html": "La <b>surchauffe</b> se prend là où le fluide est devenu vapeur : après le point de rosée, donc en sortie d'évaporateur et sur la ligne d'aspiration. Le <b>sous-refroidissement</b> se prend là où le fluide est devenu liquide : après le point de bulle, donc en sortie de condenseur. Chacun de son côté du circuit.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "point",
       "html": "La mesure est toujours la même, et elle demande <b>deux instruments</b>. Le <b>manomètre</b> donne la pression ; la <b>table de saturation</b> du fluide traduit cette pression en température de changement d'état. Le <b>thermomètre de contact</b> donne la température réelle du tube. La différence entre les deux, c'est la valeur cherchée. Un seul instrument ne suffit jamais.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "point",
       "html": "La surchauffe se prend en deux endroits, et cela porte deux noms. La <b>surchauffe utile</b> est celle que la vapeur gagne <b>à l'intérieur même de l'évaporateur</b> : elle a servi à refroidir le local, d'où son nom. La <b>surchauffe totale</b> ajoute à celle-ci ce que la <b>ligne d'aspiration</b> apporte entre la sortie de l'évaporateur et le compresseur. Une ligne mal isolée, qui traverse un local chaud, augmente la surchauffe totale sans rien apporter au froid.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "point",
       "html": "Pourquoi la règle-t-on ? Pour deux raisons opposées, et il faut passer entre les deux. Une surchauffe <b>trop faible</b>, et du liquide arrive au compresseur : le liquide ne se comprime pas, la casse est immédiate. Une surchauffe <b>trop forte</b>, et le compresseur s'échauffe pendant que l'évaporateur travaille mal : le rendement chute. Repère usuel : <b>5 à 10 K</b>.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "point",
       "html": "Le <b>sous-refroidissement</b>, lui, garantit qu'il arrive du <b>liquide pur</b> au détendeur. S'il n'y en a pas assez, des bulles de vapeur se forment dans la ligne liquide et le détendeur n'alimente plus correctement. Repère usuel : <b>4 à 8 K</b>. Ces deux repères se <b>recalent toujours</b> sur la documentation du constructeur : ils orientent, ils ne remplacent pas la fiche technique de la machine.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "point",
       "html": "Enfin, ces deux valeurs répondent à une question que l'on se pose <b>avant de charger</b> : dans quel état est le fluide à cet endroit du circuit — liquide sous-refroidi, saturé, ou vapeur surchauffée ? C'est ce diagnostic qui commande la méthode de remplissage, et c'est pour cela qu'il figure au référentiel avant même le geste de charge.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce que la valeur vous dit",
       "html": "<b>Surchauffe nulle</b>, ligne d'aspiration givrée → du liquide part vers le compresseur. On agit <b>tout de suite</b>.<br><b>Surchauffe élevée</b> → l'évaporateur est mal alimenté : détendeur trop fermé, ou charge insuffisante.<br><b>Sous-refroidissement effondré</b> → il manque du fluide, ou de la vapeur passe dans la ligne liquide.<br><b>Sous-refroidissement anormalement élevé</b> → du liquide s'accumule dans le condenseur : charge excessive, ou sortie de condenseur gênée.<br>Aucune de ces lectures ne conclut seule : c'est la <b>convergence</b> des indices qui oriente le diagnostic.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Une surchauffe ne se lit pas sur un thermomètre",
       "html": "L'erreur la plus fréquente : relever la température de l'aspiration et l'annoncer comme « la surchauffe ». <b>C'est une température, pas une surchauffe.</b> Sans la pression, et sans la table du fluide qui est réellement dans le circuit, ce nombre ne veut rien dire. Et rappel du piège de base : le manomètre lit en <b>relatif</b>, la table est souvent en <b>absolu</b> — environ 1 bar d'écart, donc plusieurs kelvins d'erreur.",
       "titre": "Surchauffe et sous-refroidissement"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Utile ou totale : ce n'est pas la même valeur",
       "html": "Comparer une surchauffe <b>utile</b> à une consigne donnée en <b>totale</b> — ou l'inverse — conduit à dérégler une machine qui allait bien. Avant de comparer une mesure à une valeur de référence, vérifiez <b>où</b> la référence a été prise : en sortie d'évaporateur, ou à l'entrée du compresseur.",
       "titre": "Surchauffe et sous-refroidissement"
      }
     ],
     "questions": [
      {
       "id": "pk-g1e-1",
       "dc": "G1",
       "code": "1.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Un technicien annonce « la surchauffe est de 7 ». De quoi parle-t-il exactement ?",
       "choix": [
        "De la température relevée au contact du tube d'aspiration, soit les 7 °C lus sur son thermomètre",
        "D'un écart de 7 K entre la température lue à l'aspiration et celle de vaporisation du fluide",
        "De la pression d'aspiration lue au manomètre basse pression, exprimée en bars relatifs",
        "De 7 degrés au-dessus de zéro mesurés dans l'ambiance de la chambre froide en marche"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-02-F6773E86.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La chaleur surchauffe sousrefroidissement",
         "chemin": "illustrations/la-chaleur_surchauffe-sousrefroidissement.svg"
        }
       ],
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
        "D'un thermomètre de contact seul, posé sur la ligne d'aspiration",
        "D'un manomètre, d'un thermomètre de contact, et de la table de saturation du fluide présent",
        "D'un manomètre seul : la pression suffit à déduire la surchauffe",
        "D'un thermomètre infrarouge, d'un détecteur électronique de fuite et de la documentation machine"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-02-819DA516.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La chaleur surchauffe sousrefroidissement",
         "chemin": "illustrations/la-chaleur_surchauffe-sousrefroidissement.svg"
        }
       ],
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
        "À protéger le compresseur contre les coups de liquide à l'aspiration",
        "À accélérer le dégivrage naturel de la batterie évaporateur",
        "À limiter la pression de condensation par forte chaleur extérieure"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/bib-image-205-eceebfe3.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Chaleur interactive",
         "chemin": "chaleur-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2",
        "D"
       ]
      }
     ],
     "notes": "⚠️ À FAIRE VALIDER (27/07) : la distinction surchauffe UTILE / TOTALE telle qu'elle est formulée ici, et les deux repères 5-10 K et 4-8 K — la charte les autorise, mais c'est l'organisme qui les endosse dès qu'ils sont écrits. Geste à faire refaire jusqu'à l'automatisme : manomètre, table, sonde, soustraction. Ne jamais accepter un relevé recopié. Faire mesurer la surchauffe en DEUX points sur la même machine (sortie d'évaporateur, puis entrée compresseur) : l'écart entre les deux se voit, et la distinction utile/totale n'a plus besoin d'être expliquée. Cette fiche prépare directement g4b (méthode indirecte) et g8 (réglage de l'évaporateur) : y renvoyer explicitement."
    },
    {
     "type": "cours",
     "fiche": "g1c",
     "titre": "Les familles de fluides et leurs codes",
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/nomenclature-interactive/index.html",
       "lancer": "🧬 Lancer le cours interactif : décrypter un code de fluide",
       "desc": "18 étapes racontées, une voix qui explique, et un atelier où vous assemblez vous-même la molécule R-22 (glisser-déposer) — environ 10 minutes.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/familles-fluides.svg",
       "alt": "Les cinq familles : CFC, HCFC, HFC, HFO et naturels, avec leur composition atomique.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "point",
       "html": "Derrière chaque code se cache une <b>molécule</b>, et trois atomes y décident de tout : le <b>chlore</b> détruit l'ozone — c'est lui qui a condamné les CFC puis les HCFC ; le <b>fluor</b> rend la molécule stable, donc durable dans l'atmosphère, donc à fort effet de serre ; l'<b>hydrogène</b> raccourcit la durée de vie.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "point",
       "html": "Les <b>HFC</b> ont éliminé le chlore (ozone sauvé), gardé le fluor (climat pénalisé). Les <b>HFO</b> ajoutent une double liaison fragile : la molécule casse en quelques jours, PRP ≈ 1. Les <b>naturels</b> — propane, isobutane, ammoniac, CO₂ — existent sans chimie de synthèse, chacun avec son revers : inflammabilité, toxicité ou pression.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "point",
       "html": "Et le numéro n'est pas un matricule : il <b>décrit la molécule</b>. Centaines + 1 = carbone, dizaines − 1 = hydrogène, unités = fluor — les liaisons restantes sont du chlore. Les mélanges et les fluides inorganiques ont leurs séries : 4xx, 5xx, 6xx, 7xx.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "point",
       "html": "Un fluide de substitution ne se charge pas forcément « comme l'ancien ». On distingue deux cas. Le <b>drop-in</b> : le nouveau fluide est compatible avec l'huile et les composants déjà en place, la machine ne change pas, on vidange, on tire au vide, on recharge. Le <b>retrofit</b> : le nouveau fluide n'est pas compatible tel quel, il impose d'adapter la machine — huile, joints, détendeur — selon la <b>documentation constructeur</b>, avant toute recharge.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "point",
       "html": "Cette distinction n'est pas un détail administratif : un fluide de substitution ne se comporte pas forcément comme l'ancien sur chaque composant du circuit. Le <b>détendeur</b> a été calé pour une courbe de pression donnée ; avec un autre fluide, il peut ne plus détendre au bon point.",
       "titre": "Les familles de fluides et leurs codes"
      },
      {
       "type": "point",
       "html": "Les <b>joints</b> ont été choisis pour une huile donnée ; une huile incompatible les fait gonfler ou durcir. C'est pour cela que seule la documentation constructeur dit si un couple machine/fluide est un simple drop-in ou impose un retrofit — jamais l'habitude ou le « ça a l'air pareil ».",
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
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Drop-in ou retrofit : ne pas deviner",
       "html": "<p>Un fluide vendu comme « remplacement direct » n'est pas automatiquement un <b>drop-in</b> sur toutes les machines. Sans vérifier la documentation constructeur, on peut charger un fluide de substitution dans une machine qui aurait exigé un <b>retrofit</b> — huile non changée, détendeur non réglé. Le fluide tourne, mais la machine ne fonctionne plus comme prévu. Toujours vérifier avant de charger, jamais deviner.</p>",
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
        "Ils ont tous un fort effet de serre, comme les HFC classiques",
        "Ils existent sans chimie de synthèse, contrairement aux HFC et HFO",
        "Ils contiennent tous du fluor, comme les HFO récents",
        "Ils ont été condamnés par le protocole de Montréal, au même titre que les CFC"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-07-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Nomenclature interactive",
         "chemin": "nomenclature-interactive/index.html"
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
       "id": "q-g1-45",
       "dc": "G1",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Le R717 est :",
       "choix": [
        "Du propane commercial",
        "De l'ammoniac",
        "Du dioxyde de carbone",
        "De l'eau distillée"
       ],
       "bonne": 1,
       "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
       "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
       "remediation_vers": "g1c",
       "code": "1.07",
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-07-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Nomenclature interactive",
         "chemin": "nomenclature-interactive/index.html"
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
       "id": "q-g12-v6_181",
       "dc": "G12",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Le R600a (isobutane) est utilisé principalement dans :",
       "choix": [
        "Les grandes centrales frigorifiques industrielles",
        "Les réfrigérateurs et congélateurs domestiques",
        "Les climatiseurs split installés en résidentiel",
        "Les pompes à chaleur air-eau domestiques"
       ],
       "bonne": 1,
       "explication": "Réfrigérateurs domestiques — Le R600a est le fluide standard des réfrigérateurs modernes. Charges très faibles (50-150g) pour limiter le risque d'inflammation.",
       "aide": "Presque tous les frigos neufs fonctionnent au R600a.",
       "remed": {
        "texte": "Le R600a est le fluide standard des réfrigérateurs modernes. Charges très faibles (50-150g) pour limiter le risque d'inflammation."
       },
       "remediation_vers": "g12",
       "code": "1.07",
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-1-07-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Hydrocarbures a1 a2",
         "chemin": "hydrocarbures-a1-a2/index.html"
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
       "id": "pk-g1c-1",
       "dc": "G1",
       "code": "1.06",
       "niveau": 2,
       "type": "qcm",
       "enonce": "Les codes R-32 et R-290 se ressemblent. Pourtant leurs classes de sécurité NF EN 378 sont très différentes. Que faut-il comprendre ?",
       "choix": [
        "Le code du fluide donne déjà sa classe de sécurité, inutile de vérifier autre chose",
        "Deux codes proches signalent toujours deux dangers de même niveau",
        "La classe NF EN 378 remplace le code : on peut oublier le code une fois la classe connue",
        "Le code décrit la molécule, la classe NF EN 378 le risque : il faut lire les deux"
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-06-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Nomenclature interactive",
         "chemin": "nomenclature-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2",
        "D",
        "E"
       ]
      }
     ],
     "notes": "Faire décoder AU TABLEAU deux ou trois codes avant de donner la règle : R-32, R-290, R-744 — le groupe trouve la logique lui-même, elle se retient dix fois mieux. L'astuce du +90 fait mouche à tous les coups. Point d'attention : le R-22 est le meilleur exemple pédagogique (le chlore « caché » dans les liaisons restantes explique son interdiction). Le cours interactif embarqué (29/07) reprend cette même astuce en atelier manipulable : s'en servir en autoformation avant la séance, ou le projeter en salle pour lancer la découverte collective. Reste une piste ouverte : relier aussi la carte d'identité interactive (outil « fiche-fluide »), pour qu'un stagiaire décode un fluide puis vérifie."
    },
    {
     "type": "cours",
     "fiche": "g1d",
     "titre": "Les organes qui trahissent une fuite",
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g1d",
       "lancer": "🎧 Écouter la capsule : Les organes qui trahissent une fuite",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 7 écrans, 8 minutes. Version imprimable et mode projection compris.",
       "titre": "Les organes qui trahissent une fuite"
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
       "html": "<ul><li><b>a) Les valves.</b> Le <b>robinet à boule</b> et le <b>robinet à soupape</b> isolent une portion de circuit ; leur presse-étoupe (la bague qui serre la tige de manœuvre) est un point de fuite classique. Le <b>robinet à diaphragme</b> n'a pas cette tige : une membrane souple assure l'étanchéité, donc moins d'usure. La <b>vanne électromagnétique</b>, dite <b>solénoïde</b>, s'ouvre et se ferme électriquement ; elle isole la réserve de fluide en cas d'arrêt. La <b>vanne 4 voies</b> inverse le sens du cycle (froid ↔ chaud) : beaucoup de raccords brasés et une pièce mobile interne, donc plusieurs points à surveiller.</li></ul>",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "<ul><li><b>b) Les contrôles de température et de pression.</b> Le <b>thermostat</b> pilote le compresseur selon la température. Le <b>pressostat de régulation</b> fait pareil selon la pression : il coupe et relance en fonctionnement normal — à ne pas confondre avec le <b>pressostat de sécurité</b>, qui protège contre une pression anormale (détail ci-dessous). Un pressostat de régulation qui coupe trop tôt peut signaler un manque de charge, donc une fuite.</li></ul>",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "<ul><li><b>c) Le voyant liquide et la pastille d'humidité.</b> Le <b>voyant liquide</b> est un hublot sur la ligne liquide. En <b>régime stable</b> (l'installation tourne depuis un moment), il doit rester net, sans bulle. Des <b>bulles qui persistent</b> montrent un manque de charge — souvent une fuite. La <b>pastille d'humidité</b>, intégrée au voyant, change de couleur selon l'eau présente dans le circuit ; la grille de lecture est propre à chaque fabricant, selon la fiche constructeur.</li></ul>",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "<ul><li><b>d) Les contrôles du dégivrage.</b> Ils déclenchent et arrêtent le dégivrage de l'évaporateur. Un givre anormal — pas symétrique, ou qui ne part jamais complètement — n'est pas toujours un problème de dégivrage : ça peut être un manque de fluide qui prive une partie de la batterie.</li></ul>",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "<ul><li><b>e) Les protecteurs du système.</b> Protection thermique du compresseur, <b>soupape de sécurité</b>, pressostat de sécurité (vu plus haut) : ils empêchent qu'une anomalie ne tourne à la casse. Une soupape de sécurité qui s'ouvre relâche elle-même du fluide dans l'atmosphère : une fuite volontaire, réglée pour l'urgence, à contrôler selon la fiche constructeur.</li></ul>",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "<ul><li><b>f) Les instruments de mesure.</b> Un <b>thermomètre</b> à pince ou à contact mesure la température réelle d'un tube. Comparé à la table de saturation (revoir G1 · code 1.03), l'écart donne la surchauffe ou le sous-refroidissement : c'est la méthode indirecte, sans ouvrir le circuit.</li></ul>",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "<ul><li><b>g) Les systèmes de contrôle de l'huile.</b> Un <b>voyant d'huile</b> sur le compresseur montre le niveau et l'aspect de l'huile. Un niveau qui baisse sans explication doit alerter : l'huile se mélange au fluide et s'échappe avec lui par une fuite — même logique que la trace d'huile sous un raccord (déjà vue en G4).</li></ul>",
       "titre": "Les organes qui trahissent une fuite"
      },
      {
       "type": "point",
       "html": "<ul><li><b>h) Les réservoirs.</b> La <b>bouteille de liquide</b> stocke le fluide condensé avant le détendeur. Plusieurs raccords (entrée, sortie, vanne de service) : autant de points à contrôler. L'isoler avant une intervention limite la quantité de fluide qui pourrait fuir.</li><li><b>i) Les séparateurs de liquide et d'huile.</b> Le <b>séparateur de liquide</b>, sur l'aspiration, retient le liquide résiduel pour éviter un <b>coup de liquide</b> au compresseur (il aspire du liquide au lieu de vapeur : casse immédiate, le liquide ne se comprime pas). Le <b>séparateur d'huile</b>, sur le refoulement, retient l'huile entraînée par le gaz chaud et la renvoie au compresseur.</li></ul>",
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
        "À mesurer la température du liquide juste avant l'entrée du détendeur",
        "À observer l'état du fluide (bulles, couleur) et détecter d'éventuels problèmes",
        "À régler la pression de la ligne liquide à la sortie du condenseur",
        "À couper le compresseur si le débit de liquide devient insuffisant"
       ],
       "bonne": 1,
       "explication": "Le VOYANT LIQUIDE permet de visualiser l'état du fluide frigorigène dans la ligne liquide : présence de bulles (manque de charge), changement de couleur de l'indicateur d'humidité, aspect du fluide.",
       "aide": "C'est un hublot transparent qui permet de voir ce qui se passe dans la ligne liquide.",
       "remed": {
        "texte": "Le VOYANT LIQUIDE permet de visualiser l'état du fluide frigorigène dans la ligne liquide : présence de bulles (manque de charge), changement de couleur de l'indicateur d'humidité, aspect du fluide. C'est un outil de diagnostic visuel."
       },
       "remediation_vers": "g9",
       "code": "1.05",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/sup-voyant-liquide-en-laiton-photo-E59D07B7.webp",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Detendeurs ligne",
         "chemin": "illustrations/detendeurs-ligne.svg"
        }
       ],
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
        "Protéger le condenseur contre les fortes surpressions",
        "Augmenter la charge en fluide de l'installation frigorifique",
        "Mesurer le COP de la machine en fonctionnement réel"
       ],
       "bonne": 0,
       "explication": "Réguler la température par cycling — Le pressostat BP peut couper le compresseur quand la pression BP descend trop (= température atteinte), puis le redémarrer quand elle remonte.",
       "aide": "En BP, la pression est liée à la température d'évaporation.",
       "remed": {
        "texte": "Le pressostat BP peut couper le compresseur quand la pression BP descend trop (= température atteinte), puis le redémarrer quand elle remonte."
       },
       "remediation_vers": "g9",
       "code": "1.05",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/ine-contenu-bibliotheque-symboles-svg-capteurs-froid-pressostat-sans-reperes-svg.svg",
       "ressources": [
        {
         "type": "image",
         "libelle": "Regulateurs pression",
         "chemin": "illustrations/regulateurs-pression.svg"
        }
       ],
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
        "De réguler le débit de fluide au détendeur",
        "D'inverser le sens du cycle (mode chaud/froid)",
        "De purger l'huile du carter du compresseur",
        "De contourner le compresseur pendant l'arrêt"
       ],
       "bonne": 1,
       "explication": "D'inverser le sens du cycle — La vanne 4 voies permute les rôles de l'échangeur intérieur et extérieur : l'évaporateur devient condenseur et inversement (mode PAC).",
       "aide": "C'est le composant clé des pompes à chaleur réversibles.",
       "remed": {
        "texte": "La vanne 4 voies permute les rôles de l'échangeur intérieur et extérieur : l'évaporateur devient condenseur et inversement (mode PAC)."
       },
       "remediation_vers": "g9",
       "code": "1.05",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/bib-robinet-wc-a-potence-da0efce7.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Vanne service interactive",
         "chemin": "vanne-service-interactive/index.html"
        }
       ],
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
        "En sortie de compresseur, sur la ligne de refoulement",
        "En sortie de condenseur, avant le détendeur",
        "En sortie d'évaporateur, sur la ligne d'aspiration",
        "Sur le circuit d'huile, près du séparateur"
       ],
       "bonne": 1,
       "explication": "En sortie de condenseur, avant le détendeur — Il est placé sur la ligne liquide pour vérifier que le fluide arrive bien sous forme liquide au détendeur.",
       "aide": "Le voyant surveille la qualité du liquide avant la détente.",
       "remed": {
        "texte": "Il est placé sur la ligne liquide pour vérifier que le fluide arrive bien sous forme liquide au détendeur."
       },
       "remediation_vers": "g9",
       "code": "1.05",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/sup-voyant-liquide-en-laiton-photo-E59D07B7.webp",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Detendeurs ligne",
         "chemin": "illustrations/detendeurs-ligne.svg"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Neuf organes d'un coup : les répartir en quatre familles pour ne pas noyer le groupe — CE QU'ON VOIT (voyant, pastille), CE QUI PILOTE (thermostat, pressostats, dégivrage), CE QUI PROTÈGE (protecteurs, séparateurs) et CE QUI STOCKE (réservoir). Sur une machine d'atelier, coffret électrique CONSIGNÉ, faire toucher du doigt chaque organe plutôt que projeter une liste. Ce code est déjà interrogé ailleurs dans le pack (voyant liquide, vanne solénoïde, vanne 4 voies, pressostat de régulation) sans qu'aucune fiche ne l'enseigne : insister particulièrement sur ces quatre-là. Pédagogie de la découverte : montrer une photo de voyant avec des bulles et demander « fuite ou pas, et pourquoi » avant de donner la réponse."
    },
    {
     "type": "cours",
     "fiche": "g4a",
     "titre": "Où fuit une installation ?",
     "minutes": 20,
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
       "type": "experience",
       "url": "packs/fluides/res/etancheite-interactive/index.html?dossier=orienter",
       "lancer": "🔎 Lancer le cours interactif : l’étanchéité — de l’indice à la preuve",
       "desc": "Un parcours très visuel commun à g4a, g4b et g4c : registre, points sensibles, méthodes indirecte et directe, détecteur et traçabilité.",
       "titre": "Où fuit une installation ?"
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
       "type": "point",
       "html": "<b>Actualité au 1er août 2026.</b> Le référentiel 2024/2215 cite encore le règlement (CE) n° 1516/2007 pour les compétences 4.03 à 4.07. Ce texte a été <b>abrogé le 23 juillet 2026</b> par le règlement 2026/1444, sans remplacement. Les distinctions directe et indirecte restent évaluées par le référentiel ; sur le terrain, la procédure actuelle du site, la notice et les consignes validées priment.",
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
       "id": "pk-q-4.01",
       "dc": "G4",
       "code": "4.01",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Sur une installation frigorifique, où se situent le plus souvent les points de fuite potentiels ?",
       "choix": [
        "Aux points d'assemblage (raccords, brasures) et aux pièces qui vibrent, comme le compresseur",
        "Uniquement sur le pressostat de sécurité haute pression et sur ses raccords",
        "Uniquement dans l'isolant qui recouvre les tuyauteries froides",
        "Sur un tube plein, loin de tout raccord ou de toute pièce en mouvement"
       ],
       "bonne": 0,
       "aide": "Une fuite ne sort pas d'un tube plein : pense à ce qui assemble deux pièces, ou à ce qui bouge.",
       "remed": {
        "regle": "Les fuites apparaissent aux points d'assemblage (raccords mécaniques, brasures poreuses ou mal pénétrées, presse-étoupes de vannes, joints) et sur les pièces'en mouvement ou en vibration, comme le compresseur ou une tuyauterie mal fixée.",
        "pourquoi": "Un tube plein et correctement fixé ne peut pas fuir ; c'est la jonction entre deux pièces, ou la fatigue due au mouvement, qui crée un passage pour le fluide.",
        "piege": "Chercher au hasard sur toute la tuyauterie au lieu de cibler d'abord les raccords, les brasures et les points qui vibrent."
       },
       "remediation_vers": "g4a",
       "explication": "Les fuites apparaissent aux points d'assemblage (raccords mécaniques, brasures poreuses ou mal pénétrées, presse-étoupes de vannes, joints) et sur les pièces'en mouvement ou en vibration, comme le compresseur ou une tuyauterie mal fixée.",
       "origine": "pack",
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/sup-cours-4-01-FF76C512.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Points de fuite",
         "chemin": "illustrations/points-de-fuite.svg"
        }
       ],
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
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/sup-cours-4-03-FF76C512.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Controle etancheite registre",
         "chemin": "illustrations/controle-etancheite_registre.svg"
        },
        {
         "type": "page",
         "libelle": "Etancheite interactive",
         "chemin": "etancheite-interactive/index.html"
        }
       ],
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
        "Uniquement le type de fluide et le volume",
        "Le type et la quantité de fluide",
        "Type, quantité et pictogrammes de danger",
        "Aucune obligation de marquage"
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
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/sup-cours-4-03-FF76C512.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Etancheite interactive",
         "chemin": "etancheite-interactive/index.html"
        }
       ],
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
     "fiche": "p7",
     "titre": "Préparation de chantier — risques, EPI, zone de travail",
     "minutes": 20,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=p7",
       "lancer": "🎧 Écouter la capsule : Préparation de chantier — risques, EPI, zone de travail",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 6 écrans, 7 minutes. Version imprimable et mode projection compris.",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/prepa-chantier.svg",
       "alt": "Quatre temps avant de toucher : reconnaître le lieu et le fluide, identifier les risques du jour et les supprimer, se protéger avec les EPI qui en découlent, préparer la zone et le matériel.",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
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
       "html": "Sur une machine aux <b>hydrocarbures</b> (par exemple au R-290), le choix de l'outillage se fait <b>avant</b> d'ouvrir la zone, pas une fois dessus. Ces fluides sont inflammables : un outil ordinaire, prévu pour un gaz qui ne l'est pas, peut suffire à déclencher un accident. Une simple étincelle au mauvais endroit, au mauvais moment, enflamme le gaz qui s'est accumulé.",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "point",
       "html": "Certains outils se vérifient en particulier. La <b>station de récupération</b> doit être <b>compatible hydrocarbures</b> : conçue pour aspirer et stocker un gaz inflammable sans créer d'étincelle interne. Une station ordinaire, prévue pour un fluide non inflammable, n'a pas cette protection. Le <b>détecteur de fuite</b> doit lui aussi être adapté au gaz recherché : un détecteur réglé pour un autre fluide peut ne rien signaler alors que du gaz inflammable s'échappe.",
       "titre": "Préparation de chantier — risques, EPI, zone de travail"
      },
      {
       "type": "point",
       "html": "Dans la zone balisée, tout le <b>matériel électrique</b> utilisé doit être <b>antidéflagrant</b> (on dit aussi « <b>ATEX</b> », pour les zones à risque d'explosion) : lampe, outillage électroportatif, appareils de mesure. Un matériel électrique ordinaire peut produire une étincelle interne invisible, suffisante pour enflammer un gaz inflammable présent dans l'air. La <b>ventilation</b> reste en marche pendant toute l'intervention, pour empêcher le gaz de s'accumuler.",
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
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Compatible, pas juste disponible",
       "html": "<b>Compatible</b> ne veut pas dire « qui marche quand même ». Une station, un détecteur ou un outil électrique doit être conçu pour les gaz inflammables, sinon on ne l'emmène pas sur une machine aux hydrocarbures — même s'il fonctionne très bien sur un autre chantier.",
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
        "Juste après avoir ouvert le circuit frigorifique",
        "À la fin, au moment de rédiger le rapport écrit",
        "Seulement si le client en fait lui-même la demande"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-04-FC9D2706.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Intervention hydrocarbures interactive",
         "chemin": "intervention-hydrocarbures-interactive/index.html"
        }
       ],
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
        "Que l'éclairage du local est suffisant pour travailler dans de bonnes conditions",
        "Que la zone est balisée et ventilée, l'issue dégagée et les sources d'inflammation supprimées",
        "Que la température ambiante restera stable pendant toute l'intervention",
        "Que le sol est parfaitement sec et dégagé de tout obstacle"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-05-FF76C512.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Intervention hydrocarbures interactive",
         "chemin": "intervention-hydrocarbures-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Avant d'expliquer quoi que ce soit, étaler les EPI disponibles en atelier et faire trouver au groupe lequel correspond à quel risque — ne pas les nommer à leur place. Mettre en scène un point bloquant crédible (issue encombrée, détecteur déchargé) sans prévenir, et observer : le stagiaire s'arrête-t-il de lui-même, ou faut-il l'arrêter ? C'est ce réflexe qu'on cherche à installer. Ces deux codes sont spécifiques A1/A2 (réfrigérants inflammables) au référentiel — mais le réflexe d'analyse de risques avant intervention vaut pour tous les fluides, à généraliser au-delà de l'épreuve."
    },
    {
     "type": "plateau",
     "fiche": null,
     "titre": "Découverte du plateau : repérer les organes sur machine réelle",
     "minutes": 45,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "Découverte du plateau : repérer les organes sur machine réelle",
       "minutes": 45
      }
     ]
    }
   ]
  },
  {
   "n": 2,
   "libelle": null,
   "titre": "Tout ce qu'il faut savoir avant de toucher à la machine",
   "intention": "La journée la plus lourde au barème, et la plus dense en salle — parce que le TP du lendemain enchaîne d'un trait l'azote, le vide, la charge, les mesures, la récupération et le CERFA. Rien de ce qui s'y fera ne doit être découvert là-bas.",
   "sequences": [
    {
     "type": "cours",
     "fiche": "s5",
     "titre": "Consigner avant de toucher — le risque électrique",
     "minutes": 20,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Consigner avant de toucher — le risque électrique",
       "dc": "Sécurité",
       "competences": []
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=s5",
       "lancer": "🎧 Écouter la capsule : Consigner avant de toucher — le risque électrique",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 7 écrans, 7 minutes. Version imprimable et mode projection compris.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/secu-consignation.svg",
       "alt": "Les cinq étapes dans l'ordre : séparer, condamner, identifier, vérifier l'absence de tension au VAT, mettre à la terre. Le VAT se teste avant et après sur une source connue.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "<b>Ce qui arrive.</b> Ce risque ne figure dans aucun code du référentiel d'examen fluides. Il n'en est pas moins réel : le risque électrique tue des professionnels chaque année, sur les installations de froid et de climatisation comme sur toute autre installation électrique.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "Le passage du courant électrique dans le corps humain porte un nom : l'<b>électrisation</b>. Ses effets vont de la simple secousse à des blessures graves — brûlures internes, troubles du cœur. Quand une électrisation entraîne la mort, on parle d'<b>électrocution</b>. C'est le même phénomène ; seule la gravité change.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "Un autre danger ne demande aucun contact : l'<b>arc électrique</b>. C'est une décharge qui jaillit dans l'air entre deux points sous tension, ou entre un point sous tension et une masse, sans qu'il soit nécessaire de toucher quoi que ce soit. Un arc électrique brûle par la chaleur et la lumière qu'il dégage, et peut projeter des matières en fusion. On peut donc se blesser gravement sans avoir touché aucun fil.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "Un dernier piège : couper l'alimentation ne vide pas forcément tous les composants de leur énergie. Un <b>condensateur</b> est un composant qui stocke de l'énergie électrique ; on en trouve par exemple dans les circuits de démarrage de certains moteurs. Il peut rester chargé après la coupure du courant. Il reste alors dangereux tant qu'il n'a pas été déchargé selon la méthode indiquée par la documentation constructeur de l'équipement.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "<b>Comment ça arrive vraiment.</b> Un technicien pressé ouvre une armoire électrique pour un dépannage rapide. Le disjoncteur qui semble commander cette armoire est coupé, alors il touche directement un bornier — la barrette où arrivent les fils. Mais personne n'a vérifié que ce disjoncteur coupait bien cette armoire précise : un autre circuit, resté sous tension, y arrive aussi.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "Autre situation fréquente : un condensateur de moteur touché juste après la coupure du courant, alors qu'il est encore chargé. Autre situation encore : un outil métallique approché trop près de bornes sous tension dans une armoire électrique, sans contact direct, qui déclenche un arc électrique.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "<b>Ce qui protège.</b> Avant de toucher un circuit ou un équipement électrique, la <b>consignation électrique</b> se déroule dans un ordre précis, en cinq étapes :",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "Le VAT lui-même doit être digne de confiance. On le contrôle sur une source que l'on sait sous tension <b>avant</b> de l'utiliser sur le circuit à vérifier, puis on refait le même contrôle sur cette source connue <b>après</b>. Si l'appareil fonctionnait au premier essai mais plus au second, tout ce qu'il a mesuré entre les deux doit être considéré comme non fiable.",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "<ol><li><b>Séparer</b> : couper l'alimentation électrique de façon visible et certaine.</li><li><b>Condamner</b> : verrouiller l'organe de coupure en position ouverte, pour qu'il ne puisse pas être refermé par quelqu'un d'autre pendant l'intervention.</li><li><b>Identifier</b> : vérifier que l'on se trouve bien sur le circuit ou l'équipement que l'on vient de séparer, et pas sur un autre.</li></ol>",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "point",
       "html": "<ol start=\"4\"><li><b>Vérifier l'absence de tension</b> avec un <b>VAT</b> — un vérificateur d'absence de tension — dont le modèle et les réglages sont adaptés à l'installation, conformément à sa documentation constructeur.</li><li><b>Mettre à la terre et en court-circuit</b> quand cette étape s'impose, notamment lorsqu'une tension pourrait réapparaître par une autre source.</li></ol>",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qu'il faut retenir",
       "html": "<ul><li>Électrisation : le courant traverse le corps. Électrocution : une électrisation qui tue.</li><li>Un arc électrique brûle sans aucun contact.</li><li>Consignation en cinq étapes : séparer, condamner, identifier, vérifier l'absence de tension, mettre à la terre si besoin.</li><li>Un condensateur peut rester chargé après la coupure du courant.</li><li>Le VAT se contrôle avant et après usage, sur une source connue.</li></ul>",
       "titre": "Consigner avant de toucher — le risque électrique"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le geste interdit",
       "html": "<p>On ne travaille <b>jamais</b> sur une installation électrique sans avoir réalisé les cinq étapes de la consignation, même pour « juste vérifier » ou « deux secondes ». On ne fait <b>jamais</b> confiance à un simple arrêt visuel de la machine : seule une vérification d'absence de tension avec un VAT contrôlé fait foi. Conséquence : électrisation, électrocution, brûlure par arc électrique — ce risque tue chaque année.</p>",
       "titre": "Consigner avant de toucher — le risque électrique"
      }
     ],
     "questions": [
      {
       "id": "pk-s5-1",
       "dc": "Sécurité",
       "code": null,
       "hors_ref": "sécurité électrique : indispensable au métier, non listée comme compétence à l'annexe II.B",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Quelle est la dernière étape avant de poser les mains sur un circuit électrique consigné ?",
       "choix": [
        "Prévenir le client de la coupure prévue",
        "Vérifier l'absence de tension avec un VAT",
        "Poser une pancarte de consignation visible",
        "Ouvrir le coffret électrique concerné"
       ],
       "bonne": 1,
       "aide": "Consigner ne suffit pas : il faut le prouver, appareil en main.",
       "remed": {
        "regle": "On vérifie TOUJOURS l'absence de tension au VAT avant de toucher.",
        "pourquoi": "Un disjoncteur peut être mal repéré, une alimentation de secours peut subsister : seule la mesure prouve que le circuit est hors tension.",
        "piege": "« Je l'ai coupé moi-même » ne protège de rien. Un circuit se vérifie, il ne se suppose pas."
       },
       "remediation_vers": "s5",
       "explication": "On vérifie TOUJOURS l'absence de tension au VAT avant de toucher.",
       "origine": "pack",
       "illustration": "illustrations/sup-contexte-sécurité-A03D0FCC.webp",
       "pose_niveau": "contexte"
      },
      {
       "id": "pk-s5-2",
       "dc": "Sécurité",
       "code": null,
       "hors_ref": "sécurité électrique : indispensable au métier, non listée comme compétence à l'annexe II.B",
       "niveau": 2,
       "type": "qcm",
       "enonce": "Pourquoi contrôle-t-on le VAT sur une source connue avant ET après s'en être servi ?",
       "choix": [
        "Parce que le VAT doit être étalonné chaque année en atelier par un organisme agréé",
        "Parce qu'un VAT en panne indiquerait « pas de tension » sur un circuit pourtant sous tension",
        "Parce que la mesure n'est fiable qu'après un temps de chauffe de quelques secondes",
        "Parce que la consignation n'est valable que vérifiée par deux personnes différentes"
       ],
       "bonne": 1,
       "aide": "Demandez-vous ce qui se passe si l'appareil lui-même est défaillant.",
       "remed": {
        "regle": "Le VAT se teste sur une source connue avant l'usage, et de nouveau après.",
        "pourquoi": "Un appareil défaillant affiche l'absence de tension quoi qu'il arrive. Le tester après prouve qu'il fonctionnait encore au moment de la mesure.",
        "piege": "Un VAT qui n'indique rien peut vouloir dire deux choses : pas de tension, ou appareil mort. Seul le double contrôle tranche."
       },
       "remediation_vers": "s5",
       "explication": "Le VAT se teste sur une source connue avant l'usage, et de nouveau après.",
       "origine": "pack",
       "illustration": "illustrations/sup-contexte-sécurité-A03D0FCC.webp",
       "pose_niveau": "contexte"
      },
      {
       "id": "pk-s5-3",
       "dc": "Sécurité",
       "code": null,
       "hors_ref": "sécurité électrique : indispensable au métier, non listée comme compétence à l'annexe II.B",
       "niveau": 2,
       "type": "qcm",
       "enonce": "Une machine vient d'être mise hors tension. Que peut-il rester de dangereux dans le coffret ?",
       "choix": [
        "Plus rien, la coupure suffit",
        "Des condensateurs encore chargés",
        "Seulement de la chaleur",
        "Uniquement du fluide"
       ],
       "bonne": 1,
       "aide": "Certains composants stockent l'énergie électrique et ne se vident pas instantanément.",
       "remed": {
        "regle": "Un condensateur reste chargé après la coupure : on respecte le délai et la méthode de décharge du constructeur.",
        "pourquoi": "Il accumule de l'énergie pour le démarrage du moteur. Coupée, cette énergie reste stockée et peut provoquer un choc.",
        "piege": "Couper puis ouvrir aussitôt le coffret est un réflexe fréquent — et c'est exactement le moment où le condensateur est encore chargé."
       },
       "remediation_vers": "s5",
       "explication": "Un condensateur reste chargé après la coupure : on respecte le délai et la méthode de décharge du constructeur.",
       "origine": "pack",
       "illustration": "illustrations/sup-contexte-sécurité-A03D0FCC.webp",
       "pose_niveau": "contexte"
      }
     ],
     "notes": "Conseil d'animation : faire manipuler un VAT hors tension et mimer le double contrôle sur une source connue, avant et après usage. Faire répéter les cinq étapes à voix haute par le groupe, dans l'ordre, jusqu'à ce qu'elles s'enchaînent sans hésitation. Montrer une photo ou une pièce réelle de condensateur pour que le mot ne reste pas abstrait. Rappeler explicitement que ce risque est absent du référentiel d'examen fluides — le dire aide à comprendre pourquoi le pack ne l'avait jamais traité, et pourquoi cette fiche existe quand même."
    },
    {
     "type": "cours",
     "fiche": "g3",
     "titre": "Contrôles avant mise en service",
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g3",
       "lancer": "🎧 Écouter la capsule : Contrôles avant mise en service",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 7 écrans, 8 minutes. Version imprimable et mode projection compris.",
       "titre": "Contrôles avant mise en service"
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
       "type": "point",
       "html": "Comment conclut-on l'épreuve d'étanchéité ? On relève la pression d'azote au <b>manomètre</b> (l'appareil qui mesure la pression) au début de l'essai, puis on attend la durée prévue — selon la documentation constructeur, à faire valider. Si la pression reste <b>stable</b> (ou « stabilisée ») pendant toute cette durée, le circuit est déclaré étanche. À l'inverse, une <b>chute de pression</b> signale une fuite quelque part dans le circuit, même si elle est minime.",
       "titre": "Contrôles avant mise en service"
      },
      {
       "type": "point",
       "html": "Un piège classique : la température de l'atelier fait elle aussi varier la pression, sans qu'il y ait de fuite. Dans un circuit fermé, la pression de l'azote <b>augmente</b> un peu quand l'air ambiant se réchauffe, et <b>diminue</b> un peu quand il refroidit. On regarde donc la tendance sur toute la durée de l'épreuve, pas un seul chiffre isolé, et on corrige qualitativement une petite variation liée à la température avant de conclure trop vite à une fuite.",
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
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Localiser la fuite : l'eau savonneuse",
       "html": "<p>Si la pression chute, on cherche la fuite <b>raccord par raccord et brasure par brasure</b>, en badigeonnant de l'<b>eau savonneuse</b> au pinceau ou au pulvérisateur. Une <b>bulle</b> qui apparaît et grossit indique l'endroit exact de la fuite. Ce geste simple, sans appareil, vient <b>après</b> le contrôle de stabilité de la pression : il sert à localiser précisément une fuite déjà détectée.</p>",
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
        "De l'oxygène pur",
        "De l'azote sec",
        "De l'air comprimé",
        "Du fluide du circuit"
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
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/sup-cours-3-01-70D0D9E9.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Epreuve azote",
         "chemin": "illustrations/epreuve-azote.svg"
        }
       ],
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
        "Pour connaître à tout moment la quantité d'azote restant dans la bouteille",
        "Pour filtrer l'humidité que pourrait contenir le gaz de la bouteille d'azote",
        "Parce que la pression de la bouteille dépasse ce que le circuit supporte",
        "Pour réchauffer le gaz avant son entrée dans le circuit"
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
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/sup-poste-de-travail-avec-bouteille-d-azote-BA7A4A4D.webp",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Tirage au vide mano vs vacuometre",
         "chemin": "illustrations/tirage-au-vide_mano-vs-vacuometre.svg"
        },
        {
         "type": "image",
         "libelle": "inerweb habilitation contenus illustrations epreuve azote svg.svg",
         "chemin": "illustrations/epreuve-azote.svg"
        }
       ],
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
        "Consigner au registre et rédiger le rapport des essais"
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
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/pilote-fluides-packs-fluides-res-photos-pompe-a-vide-png.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Tirage au vide",
         "chemin": "illustrations/tirage-au-vide.svg"
        }
       ],
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
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/pilote-fluides-packs-fluides-res-photos-pompe-a-vide-png.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Tirage au vide",
         "chemin": "illustrations/tirage-au-vide.svg"
        },
        {
         "type": "image",
         "libelle": "Tirage au vide deux degats eau",
         "chemin": "illustrations/tirage-au-vide_deux-degats-eau.svg"
        }
       ],
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
     "fiche": "g4b",
     "titre": "Méthode indirecte — mesurer et interpréter",
     "minutes": 35,
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
       "type": "experience",
       "url": "packs/fluides/res/etancheite-interactive/index.html?dossier=soupconner",
       "lancer": "📊 Ouvrir directement la méthode indirecte",
       "desc": "Illustrations, instruments à associer et enquête guidée : les mesures soupçonnent une fuite sans prétendre la localiser.",
       "titre": "Méthode indirecte — mesurer et interpréter"
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
        "Utiliser un détecteur électronique de fuites récemment calibré",
        "Suivre les paramètres de fonctionnement (P, T°, surchauffe)",
        "Mettre le circuit sous pression d'azote puis attendre la chute",
        "Utiliser un traceur UV et rechercher à la lampe adaptée au produit"
       ],
       "bonne": 1,
       "explication": "Suivre les paramètres de fonctionnement — La détection indirecte analyse les dérives des paramètres (baisse de HP, augmentation de surchauffe, etc.) qui signalent une perte de charge.",
       "aide": "C'est une méthode qui n'utilise pas d'appareil de détection spécifique.",
       "remed": {
        "texte": "La détection indirecte analyse les dérives des paramètres (baisse de HP, augmentation de surchauffe, etc.) qui signalent une perte de charge."
       },
       "remediation_vers": "g4b",
       "code": "4.04",
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/sup-cours-4-04-FF76C512.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Controle etancheite ou lire",
         "chemin": "illustrations/controle-etancheite_ou-lire.svg"
        },
        {
         "type": "page",
         "libelle": "Etancheite interactive",
         "chemin": "etancheite-interactive/index.html"
        }
       ],
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
        "Manque de fluide frigorigène dans tout le circuit haute pression",
        "Condenseur encrassé, ventilateurs arrêtés, ou excès de charge",
        "Évaporateur entièrement givré côté air de la chambre",
        "Manque d'huile visible au carter du compresseur"
       ],
       "bonne": 1,
       "explication": "Un déclenchement PRESSOSTAT HP indique une pression de condensation trop élevée. Causes : condenseur sale ou encrassé, ventilateurs en panne, excès de charge frigorigène, air incondensable dans le…",
       "aide": "Le pressostat HP protège l'installation contre les pressions trop élevées côté condenseur.",
       "remed": {
        "texte": "Un déclenchement PRESSOSTAT HP indique une pression de condensation trop élevée. Causes : condenseur sale ou encrassé, ventilateurs en panne, excès de charge frigorigène, air incondensable dans le circuit, ou température ambiante trop élevée."
       },
       "remediation_vers": "g7",
       "code": "4.05",
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-s6-act-6-pressostats-1e645f81.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Condenseur interactif",
         "chemin": "condenseur-interactif/index.html"
        }
       ],
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
        "Excès de fluide frigorigène accumulé dans la bouteille",
        "Manque de fluide, évaporateur givré, ou filtre bouché",
        "Condenseur encrassé qui ferait chuter la basse pression",
        "Compresseur trop puissant pour l'installation en place"
       ],
       "bonne": 1,
       "explication": "Un déclenchement PRESSOSTAT BP indique une pression d'évaporation trop basse. Causes : manque de charge frigorigène, évaporateur givré ou encrassé, filtre déshydrateur bouché, détendeur mal réglé ou…",
       "aide": "Le pressostat BP protège l'installation contre les pressions trop basses côté évaporateur.",
       "remed": {
        "texte": "Un déclenchement PRESSOSTAT BP indique une pression d'évaporation trop basse. Causes : manque de charge frigorigène, évaporateur givré ou encrassé, filtre déshydrateur bouché, détendeur mal réglé ou bouché, ou débit d'air insuffisant sur l'évaporateur."
       },
       "remediation_vers": "g8",
       "code": "4.05",
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/bib-s6-act-6-pressostats-1e645f81.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Evaporateur interactif",
         "chemin": "evaporateur-interactif/index.html"
        }
       ],
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
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/etancheite-interactive/index.html?dossier=localiser",
       "lancer": "🧪 Ouvrir directement la méthode directe",
       "desc": "Détecteur illustré, choix de méthode, balayage ciblé, confirmation et passage final au registre.",
       "titre": "Méthode directe et consignation"
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
       "html": "Le code <b>4.06</b> distingue les méthodes directes qui supposent d'<b>intervenir dans le circuit</b>. Le code <b>4.07</b> vise celles qui n'exigent pas cette intervention. Le référentiel 2024/2215 rattache encore ces mots au règlement 1516/2007, mais ce texte a été <b>abrogé le 23 juillet 2026</b> sans remplacement. La méthode réellement autorisée dépend donc de la procédure actuelle, de l'installation et du périmètre de certification.",
       "titre": "Méthode directe et consignation"
      },
      {
       "type": "point",
       "html": "Le <b>détecteur électronique</b> réagit à la présence de molécules de fluide dans l'air : on balaie la sonde <b>lentement</b>, le long des points repérés à l'étape visuelle. L'<b>eau savonneuse</b> localise par les bulles ; le <b>traceur UV</b> révèle les fuites intermittentes ou d'accès difficile. Sensibilité et étalonnage : selon doc constructeur, à faire valider.",
       "titre": "Méthode directe et consignation"
      },
      {
       "type": "point",
       "html": "Le code <b>4.09</b> exige de consigner le contrôle. On note : date, méthode, points contrôlés, résultat, et en cas de fuite la localisation précise et la suite donnée.",
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
       "id": "pk-q-4.09",
       "dc": "G4",
       "code": "4.09",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Un contrôle d'étanchéité vient de se terminer, sans fuite détectée. Que devez-vous faire ensuite ?",
       "choix": [
        "Consigner dans le registre la date, la méthode utilisée, les points contrôlés et le résultat",
        "Attendre le prochain contrôle pour tout noter en une seule fois dans le registre de l'équipement",
        "Informer seulement le client à l'oral, en fin d'intervention",
        "Rien, puisqu'il n'y a aucune fuite à signaler cette fois-ci"
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
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/sup-cours-4-09-0382EBB2.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Controle etancheite registre",
         "chemin": "illustrations/controle-etancheite_registre.svg"
        }
       ],
       "categories": [
        "A1",
        "A2",
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
        "Remettre l'installation en service immédiatement et surveiller la pression",
        "Effectuer un test de pression avec un gaz inerte (azote) et rechercher les fuites",
        "Ajouter du fluide frigorigène et observer la baisse de la pression",
        "Attendre 24 heures sans rien faire et relever les manomètres"
       ],
       "bonne": 1,
       "explication": "Après intervention, on effectue un TEST D'ÉTANCHÉITÉ avec de l'azote sous pression (environ 30 bars pour circuits HP). On recherche les fuites avec un détecteur de fuite ou de l'eau savonneuse.",
       "aide": "Avant de charger en fluide frigorigène, il faut s'assurer que le circuit est étanche.",
       "remed": {
        "texte": "Après intervention, on effectue un TEST D'ÉTANCHÉITÉ avec de l'azote sous pression (environ 30 bars pour circuits HP). On recherche les fuites avec un détecteur de fuite ou de l'eau savonneuse. Si le circuit tient la pression pendant plusieurs heures, il est étanche."
       },
       "remediation_vers": "g4b",
       "code": "4.06",
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/sup-cours-4-06-FF76C512.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Controle etancheite recontrole",
         "chemin": "illustrations/controle-etancheite_recontrole.svg"
        }
       ],
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
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/bib-001-l-outillage-du-frigoriste-unlocked-b-4e4e1981.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Etancheite interactive",
         "chemin": "etancheite-interactive/index.html"
        }
       ],
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
       "chapitre": "04",
       "chapitre_titre": "Contrôles d'étanchéité",
       "chapitre_fichier": "CONTENU-04-G4-etancheite.md",
       "illustration": "illustrations/sup-cours-4-07-A6CE7C28.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Etancheite interactive",
         "chemin": "etancheite-interactive/index.html"
        }
       ],
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
     "minutes": 20,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=x4",
       "lancer": "🎧 Écouter la capsule : Détective — le contrôle qui tourne mal",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 5 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "Détective — le contrôle qui tourne mal"
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
     "fiche": "p1",
     "titre": "Le manifold — lire, brancher, ne pas polluer",
     "minutes": 15,
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
       "type": "experience",
       "url": "packs/fluides/res/chaine-intervention-interactive/index.html?dossier=manifold",
       "lancer": "🧭 Lancer le cours interactif : la chaîne de l’intervention",
       "desc": "Manifold, raccordement, tirage au vide et ordre des vannes dans un seul fil visuel — 25 écrans.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/vanne-service-interactive/index.html?ecran=geste",
       "lancer": "🔩 Lancer le cours interactif : la vanne de service, où brancher le flexible",
       "desc": "L’autre bout du flexible : la vanne de service en coupe animée. La voie de service P, la prise permanente P1 du pressostat, et la position à donner à la vanne pour lire au manomètre sans isoler le compresseur.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/pose-manifold-2-voies-interactive/index.html",
       "lancer": "🧰 S’entraîner : poser et déposer un manifold 2 voies",
       "desc": "Le geste complet sur deux vannes de service Rotolock : reconnaître BP, HP et voie centrale, distinguer les prises P et P1, choisir lunettes et gants, poser, lire, déposer. Guidé puis autonome.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/pose-manifold-interactive/index.html",
       "lancer": "🧰 S’entraîner : poser et déposer un manifold 4 voies",
       "desc": "La même chose avec la voie de vide en plus : contrôle du poste, siège arrière, raccordement BP-HP-vide, tirage au vide des flexibles, position intermédiaire pour lire, puis dépose en traitant le fluide résiduel.",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/photos/manifold-branche.jpg",
       "alt": "Un manifold raccordé sur une installation, flexibles bleu et rouge en place.",
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
       "html": "<ol><li>Consigner électriquement l'installation avant tout branchement.</li><li>Vérifier que les deux vannes du manifold sont fermées.</li><li>Visser le flexible bleu sur le raccord à obus côté basse pression — côté évaporateur, en bas de la croix du frigoriste.</li><li>Visser le flexible rouge sur le raccord à obus côté haute pression — côté condenseur et compresseur, en haut à droite.</li><li>Purger l'air de chaque flexible par un bref coup d'ouverture-fermeture — jamais un rejet prolongé.</li></ol>",
       "titre": "Le manifold — lire, brancher, ne pas polluer"
      },
      {
       "type": "point",
       "html": "<ol start=\"6\"><li>Ouvrir les vannes une par une, jamais les deux ensemble, en surveillant les aiguilles.</li><li>Lire : pression BP, pression HP, température à la pince.</li><li>Refermer les deux vannes du manifold avant toute déconnexion.</li><li>Débrancher en purgeant chaque flexible — minimum d'émission, jamais de rejet volontaire.</li></ol>",
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
        "Sur la ligne de refoulement, entre le compresseur et le condenseur",
        "Sur la ligne d'aspiration (entre évaporateur et compresseur)",
        "Sur la ligne liquide, juste en amont de l'entrée du détendeur",
        "Sur le condenseur, au niveau du piquage de service"
       ],
       "bonne": 1,
       "explication": "Le manomètre BASSE PRESSION se branche sur la ligne d'ASPIRATION (entre évaporateur et compresseur) ou sur le piquage BP du compresseur. Il mesure la pression d'évaporation (BP).",
       "aide": "Le manomètre BP mesure la pression côté basse pression.",
       "remed": {
        "texte": "Le manomètre BASSE PRESSION se branche sur la ligne d'ASPIRATION (entre évaporateur et compresseur) ou sur le piquage BP du compresseur. Il mesure la pression d'évaporation (BP)."
       },
       "remediation_vers": "g5a",
       "code": "5.01",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/photo-manometres-hp-bp.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Circuit complet manifold",
         "chemin": "illustrations/circuit-complet-manifold.svg"
        },
        {
         "type": "image",
         "libelle": "Manifold lecture",
         "chemin": "illustrations/manifold-lecture.svg"
        }
       ],
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
        "Sur la ligne d'aspiration, entre évaporateur et compresseur",
        "Sur la ligne de refoulement (entre compresseur et condenseur)",
        "Sur la ligne liquide, entre la sortie du condenseur et le détendeur",
        "Sur le corps du détendeur, au raccord du bulbe"
       ],
       "bonne": 1,
       "explication": "Le manomètre HAUTE PRESSION se branche sur la ligne de REFOULEMENT (entre compresseur et condenseur) ou sur le piquage HP du compresseur. Il mesure la pression de condensation (HP).",
       "aide": "Le manomètre HP mesure la pression côté haute pression.",
       "remed": {
        "texte": "Le manomètre HAUTE PRESSION se branche sur la ligne de REFOULEMENT (entre compresseur et condenseur) ou sur le piquage HP du compresseur. Il mesure la pression de condensation (HP)."
       },
       "remediation_vers": "g5a",
       "code": "5.01",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/photo-manometres-hp-bp.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Circuit complet manifold",
         "chemin": "illustrations/circuit-complet-manifold.svg"
        },
        {
         "type": "image",
         "libelle": "Manifold lecture",
         "chemin": "illustrations/manifold-lecture.svg"
        }
       ],
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
        "Manque de fluide frigorigène dans tout le circuit haute pression",
        "Condenseur encrassé, ventilateurs arrêtés, ou excès de charge",
        "Évaporateur entièrement givré côté air de la chambre",
        "Manque d'huile visible au carter du compresseur"
       ],
       "bonne": 1,
       "explication": "Un déclenchement PRESSOSTAT HP indique une pression de condensation trop élevée. Causes : condenseur sale ou encrassé, ventilateurs en panne, excès de charge frigorigène, air incondensable dans le…",
       "aide": "Le pressostat HP protège l'installation contre les pressions trop élevées côté condenseur.",
       "remed": {
        "texte": "Un déclenchement PRESSOSTAT HP indique une pression de condensation trop élevée. Causes : condenseur sale ou encrassé, ventilateurs en panne, excès de charge frigorigène, air incondensable dans le circuit, ou température ambiante trop élevée."
       },
       "remediation_vers": "g7",
       "code": "4.05",
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-s6-act-6-pressostats-1e645f81.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Condenseur interactif",
         "chemin": "condenseur-interactif/index.html"
        }
       ],
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
     "fiche": "p3",
     "titre": "Pompe à vide et vacuomètre — monter, tirer, lire",
     "minutes": 20,
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
       "type": "experience",
       "url": "packs/fluides/res/chaine-intervention-interactive/index.html?dossier=vide",
       "lancer": "🧭 Lancer le cours interactif : la chaîne de l’intervention",
       "desc": "Pompe, vacuomètre, courbes de vide et ordre d’isolement — dans la continuité du manifold.",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/tirage-au-vide.svg",
       "alt": "Animation : trois courbes de tirage au vide se tracent — la bonne descend et tient son palier ; l'humidité fait stagner la descente ; la fuite fait remonter le vide dès que la pompe est isolée.",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire"
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
       "html": "<ol><li>Consigner électriquement l'installation avant tout montage.</li><li>Vérifier le niveau d'huile de la pompe avant de la mettre en service.</li><li>Fermer les deux vannes du manifold.</li><li>Visser le vacuomètre sur le raccord prévu, du côté du circuit — jamais collé directement à la pompe : une lecture prise trop près de la pompe ne reflète pas le vide réel du circuit.</li><li>Brancher la pompe sur le flexible central du manifold.</li></ol>",
       "titre": "Pompe à vide et vacuomètre — monter, tirer, lire"
      },
      {
       "type": "point",
       "html": "<ol start=\"6\"><li>Ouvrir les deux vannes du manifold pour tirer sur l'ensemble du circuit.</li><li>Mettre la pompe en marche.</li><li>Observer l'aiguille du vacuomètre descendre.</li><li>Une fois le vide stabilisé — valeur cible selon la fiche constructeur — fermer d'abord la vanne côté circuit, puis seulement ensuite arrêter la pompe.</li><li>Surveiller si le vide remonte, selon la pratique habituelle : une remontée signale une fuite ou de l'humidité résiduelle.</li></ol>",
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
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/pilote-fluides-packs-fluides-res-photos-pompe-a-vide-png.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Tirage au vide",
         "chemin": "illustrations/tirage-au-vide.svg"
        },
        {
         "type": "image",
         "libelle": "Tirage au vide deux degats eau",
         "chemin": "illustrations/tirage-au-vide_deux-degats-eau.svg"
        }
       ],
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
        "Évacuer l'air du circuit avant charge",
        "Évacuer l'humidité résiduelle",
        "Récupérer du fluide frigorigène",
        "Atteindre le vide requis avant charge"
       ],
       "bonne": 2,
       "explication": "Récupérer du fluide — La pompe à vide n'est pas conçue pour pomper du fluide (ça l'endommage). La récupération se fait avec un groupe de récupération spécifique.",
       "aide": "Pompe à vide ≠ groupe de récupération. Deux outils différents.",
       "remed": {
        "texte": "La pompe à vide n'est pas conçue pour pomper du fluide (ça l'endommage). La récupération se fait avec un groupe de récupération spécifique."
       },
       "remediation_vers": "g3",
       "code": "3.03",
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/pilote-fluides-packs-fluides-res-photos-pompe-a-vide-png.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Tirage au vide compresseur pas pompe",
         "chemin": "illustrations/tirage-au-vide_compresseur-pas-pompe.svg"
        }
       ],
       "categories": [
        "A1",
        "A2",
        "D"
       ]
      },
      {
       "id": "q-g3-v6_059",
       "dc": "G3",
       "niveau": 2,
       "type": "qcm",
       "enonce": "Si la pression remonte de plus de 100 µm pendant le test de maintien, cela indique :",
       "choix": [
        "Le circuit est parfaitement étanche",
        "Une fuite ou de l'humidité résiduelle",
        "Le vide atteint est largement suffisant",
        "La pompe à vide est trop puissante"
       ],
       "bonne": 1,
       "explication": "Fuite ou humidité résiduelle — Une remontée > 100 µm après fermeture de la vanne indique soit une fuite, soit de l'humidité qui s'évapore.",
       "aide": "Si le vide est bon, la pression doit rester stable.",
       "remed": {
        "texte": "Une remontée > 100 µm après fermeture de la vanne indique soit une fuite, soit de l'humidité qui s'évapore."
       },
       "remediation_vers": "g3",
       "code": "3.04",
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/pilote-fluides-packs-fluides-res-photos-pompe-a-vide-png.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Tirage au vide courbes remontee",
         "chemin": "illustrations/tirage-au-vide_courbes-remontee.svg"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Faire monter le montage sur un poste d'essai, jamais en première fois sur une installation cliente. Faire vérifier l'huile de la pompe avant de démarrer — un réflexe qu'on saute facilement. Faire dire tout haut « isoler, puis arrêter » avant de le faire réellement : c'est l'ordre qui compte, pas la vitesse. Ne donner aucune valeur de vide cible ni de durée : renvoyer systématiquement à la fiche constructeur du modèle utilisé en atelier."
    },
    {
     "type": "cours",
     "fiche": "s2",
     "titre": "Le froid brûle — projections et gelures",
     "minutes": 20,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Le froid brûle — projections et gelures",
       "dc": "Sécurité · codes 12.02",
       "competences": [
        {
         "code": "12.02",
         "lib": "Connaître le matériel de sécurité obligatoire : détection de gaz, ventilation, EPI.",
         "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=s2",
       "lancer": "🎧 Écouter la capsule : Le froid brûle — projections et gelures",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 5 écrans, 5 minutes. Version imprimable et mode projection compris.",
       "titre": "Le froid brûle — projections et gelures"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/secu-projection.svg",
       "alt": "Le liquide jaillit dans l'axe du raccord : on se place hors de cet axe, on vérifie au manomètre que la pression est nulle, et on porte gants et lunettes.",
       "titre": "Le froid brûle — projections et gelures"
      },
      {
       "type": "point",
       "html": "Un fluide frigorigène liquide est sous pression. Dès qu'il retrouve la pression de l'air ambiant, il s'évapore d'un coup. Cette évaporation absorbe une grande quantité de chaleur autour de lui, y compris sur la peau qu'il touche. Ce contact provoque une <b>brûlure froide</b>, aussi appelée <b>gelure</b> : les tissus gèlent presque instantanément. C'est le même résultat qu'une brûlure classique, mais par le froid plutôt que par la chaleur.",
       "titre": "Le froid brûle — projections et gelures"
      },
      {
       "type": "point",
       "html": "Les yeux sont particulièrement exposés : un jet de liquide est souvent invisible et rapide, et l'œil n'a pas de réflexe de protection efficace contre lui. Un contact avec de l'ammoniac liquide ajoute une <b>brûlure chimique</b> à la brûlure froide : ce fluide n'appartient pas à la même famille que les fluides fluorés, et ne se comporte pas comme eux.",
       "titre": "Le froid brûle — projections et gelures"
      },
      {
       "type": "point",
       "html": "Le cas type : vous déconnectez un flexible de <b>manifold</b> (l'appareil à manomètres) en pensant le tronçon vide. La vanne n'a pas été vérifiée, le manomètre pas relu. Le liquide restant jaillit au desserrage — dans l'axe du raccord, comme sur le schéma.",
       "titre": "Le froid brûle — projections et gelures"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qu'il faut retenir",
       "html": "<ol><li>Mettez vos <b>EPI</b> (équipements de protection individuelle) — ici, gants et lunettes — avant toute manipulation d'un circuit sous pression.</li><li><b>Vérifiez au manomètre</b> que la pression est nulle, et que la vanne est fermée, avant de débrancher un flexible ou de desserrer un raccord.</li><li><b>Desserrez progressivement</b>, jamais d'un coup, et restez hors de la trajectoire d'un éventuel jet.</li><li>En cas de projection sur la peau ou les yeux : rincez sans frotter, et consultez. La conduite à tenir précise figure sur la <b>FDS</b> (fiche de données de sécurité) du fluide utilisé.</li></ol>",
       "titre": "Le froid brûle — projections et gelures"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le geste interdit",
       "html": "<p>Débrancher un flexible ou desserrer un raccord sous pression <b>sans vérifier au manomètre</b> qu'il est vide, ou le faire sans gants ni lunettes.</p><p>Conséquence : projection de liquide qui gèle la peau ou les yeux au contact. Risque de lésion oculaire grave.</p>",
       "titre": "Le froid brûle — projections et gelures"
      }
     ],
     "questions": [
      {
       "id": "pk-cl2-1",
       "dc": "G12",
       "code": "12.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Que désigne la LIE d'un gaz inflammable ?",
       "choix": [
        "La concentration en dessous de laquelle le mélange avec l'air ne s'enflamme pas",
        "La température minimale d'inflammation de ce gaz au contact de l'air du local technique",
        "La pression maximale admissible dans la bouteille de stockage",
        "La quantité de gaz au-delà de laquelle il faut déclarer l'installation en préfecture"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-02-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Hydrocarbures a1 a2",
         "chemin": "hydrocarbures-a1-a2/index.html"
        }
       ],
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
        "Aucune précaution particulière lors de l'intervention",
        "Un outillage adapté et une formation spécifique",
        "Un local ATEX systématique pour toute intervention",
        "Un détecteur d'ammoniac dans le local"
       ],
       "bonne": 1,
       "explication": "Outillage adapté et formation spécifique — Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante.",
       "aide": "'Légèrement inflammable' ne veut pas dire 'sans risque'.",
       "remed": {
        "texte": "Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante."
       },
       "remediation_vers": "g12",
       "code": "12.02",
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-02-B88D83FC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Faites observer un flexible de manifold et ses raccords rapides, et faites lire un manomètre avant de mimer un débranchement. Faites manipuler des gants de protection au froid et des lunettes ; faites justifier l'ordre dans lequel on les enfile avant d'intervenir. Racontez un cas concret de projection lors d'un débranchement trop rapide, pour ancrer le réflexe manomètre-avant-tout. Rappelez que la conduite à tenir en cas de projection se lit sur la FDS du fluide utilisé sur le chantier."
    },
    {
     "type": "cours",
     "fiche": "g5a",
     "titre": "Récupérer sans émettre",
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g5a",
       "lancer": "🎧 Écouter la capsule : Récupérer sans émettre",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 7 écrans, 8 minutes. Version imprimable et mode projection compris.",
       "titre": "Récupérer sans émettre"
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
       "type": "point",
       "html": "Une fois le fluide récupéré, il reste un dernier geste : <b>vidanger l'huile</b> du compresseur. Cette huile garde du <b>fluide dissous</b> dedans. Ce fluide dissous continue à <b>dégazer</b> : il relâche lentement des vapeurs, même une fois l'huile sortie de la machine. On vide l'huile dans un <b>récipient fermé et étiqueté</b>, jamais dans un bidon ouvert. Sinon, ces vapeurs s'échappent : c'est une émission de plus, exactement comme une fuite.",
       "titre": "Récupérer sans émettre"
      },
      {
       "type": "point",
       "html": "On <b>note la quantité</b> d'huile vidangée, comme on pèse le fluide récupéré : sans cette trace, personne ne peut vérifier que rien n'a été perdu en route. L'huile contaminée part ensuite en <b>déchet dangereux</b>, avec son <b>bordereau</b> — le document qui suit le déchet jusqu'à son traitement final.",
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
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Vider l'huile : le bon ordre",
       "html": "<p>On vide l'huile <b>après</b> avoir récupéré le fluide, jamais avant : sinon on relâche dans l'air du fluide encore dissous dedans, sans même le mesurer. Récipient fermé et étiqueté, quantité notée, déchet dangereux avec bordereau — c'est le geste complet de la vidange.</p>",
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
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-04-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La recuperation deux papiers",
         "chemin": "illustrations/la-recuperation_deux-papiers.svg"
        }
       ],
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
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-03-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Mission bouteilles",
         "chemin": "mission-bouteilles/index.html"
        },
        {
         "type": "image",
         "libelle": "inerweb habilitation contenus illustrations recuperation svg.svg",
         "chemin": "illustrations/recuperation.svg"
        }
       ],
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
        "Sur la ligne de refoulement, entre le compresseur et le condenseur",
        "Sur la ligne d'aspiration (entre évaporateur et compresseur)",
        "Sur la ligne liquide, juste en amont de l'entrée du détendeur",
        "Sur le condenseur, au niveau du piquage de service"
       ],
       "bonne": 1,
       "explication": "Le manomètre BASSE PRESSION se branche sur la ligne d'ASPIRATION (entre évaporateur et compresseur) ou sur le piquage BP du compresseur. Il mesure la pression d'évaporation (BP).",
       "aide": "Le manomètre BP mesure la pression côté basse pression.",
       "remed": {
        "texte": "Le manomètre BASSE PRESSION se branche sur la ligne d'ASPIRATION (entre évaporateur et compresseur) ou sur le piquage BP du compresseur. Il mesure la pression d'évaporation (BP)."
       },
       "remediation_vers": "g5a",
       "code": "5.01",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/photo-manometres-hp-bp.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Circuit complet manifold",
         "chemin": "illustrations/circuit-complet-manifold.svg"
        },
        {
         "type": "image",
         "libelle": "Manifold lecture",
         "chemin": "illustrations/manifold-lecture.svg"
        }
       ],
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
        "Sur la ligne d'aspiration, entre évaporateur et compresseur",
        "Sur la ligne de refoulement (entre compresseur et condenseur)",
        "Sur la ligne liquide, entre la sortie du condenseur et le détendeur",
        "Sur le corps du détendeur, au raccord du bulbe"
       ],
       "bonne": 1,
       "explication": "Le manomètre HAUTE PRESSION se branche sur la ligne de REFOULEMENT (entre compresseur et condenseur) ou sur le piquage HP du compresseur. Il mesure la pression de condensation (HP).",
       "aide": "Le manomètre HP mesure la pression côté haute pression.",
       "remed": {
        "texte": "Le manomètre HAUTE PRESSION se branche sur la ligne de REFOULEMENT (entre compresseur et condenseur) ou sur le piquage HP du compresseur. Il mesure la pression de condensation (HP)."
       },
       "remediation_vers": "g5a",
       "code": "5.01",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/photo-manometres-hp-bp.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Circuit complet manifold",
         "chemin": "illustrations/circuit-complet-manifold.svg"
        },
        {
         "type": "image",
         "libelle": "Manifold lecture",
         "chemin": "illustrations/manifold-lecture.svg"
        }
       ],
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g5b",
       "lancer": "🎧 Écouter la capsule : Peser, charger, stocker, tracer",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 8 écrans, 9 minutes. Version imprimable et mode projection compris.",
       "titre": "Peser, charger, stocker, tracer"
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
       "html": "L'<b>huile</b> suit le fluide, et elle en dépend. Les anciens fluides chlorés travaillaient avec de l'huile <b>minérale</b> ; les HFC et les HFO demandent une huile de synthèse, le plus souvent <b>polyolester (POE)</b>. Les deux ne se mélangent pas : sur un changement de fluide, l'huile se change aussi — c'est ce qui distingue un <b>retrofit</b> d'un simple drop-in.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "La POE <b>absorbe l'humidité de l'air</b> très vite : bidon refermé aussitôt, circuit jamais laissé ouvert. Le type exact d'huile se lit sur la <b>plaque ou la doc constructeur</b>, jamais au jugé.",
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
       "type": "point",
       "html": "Avant de charger, on regarde aussi dans quelle <b>condition</b> se trouve le fluide, en plus de savoir s'il est liquide ou gazeux. À une pression donnée, le fluide peut être <b>saturé</b> : le liquide et la vapeur sont présents ensemble, à la température de changement d'état.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "Il peut être <b>sous-refroidi</b> : c'est un liquide plus froid que sa température de saturation, donc sans aucune vapeur mélangée. Il peut être <b>surchauffé</b> : c'est une vapeur plus chaude que sa température de saturation, donc sans aucune goutte de liquide. Cette condition guide la méthode de remplissage : on ne prélève pas de la même façon un liquide sous-refroidi, pris en bas de la bouteille, et une vapeur surchauffée, prise en haut.",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "Un fluide récupéré n'est pas forcément perdu : il a trois devenirs possibles. La <b>réutilisation</b> (ou réemploi) : le fluide récupéré est rechargé tel quel, sans retraitement, dans la machine d'où il vient, chez le même détenteur (celui qui possède ou utilise l'installation).",
       "titre": "Peser, charger, stocker, tracer"
      },
      {
       "type": "point",
       "html": "Le <b>recyclage</b> : le fluide subit un nettoyage de base, comme une filtration et un séchage. La <b>régénération</b> : un retraitement complet, réalisé en filière spécialisée, qui redonne au fluide les caractéristiques du fluide neuf. Un fluide régénéré <b>s'achète</b> : on ne le régénère jamais soi-même à l'atelier.",
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
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Réemploi n'est pas retraitement",
       "html": "On pourrait croire qu'un fluide récupéré doit toujours passer par le recyclage ou la régénération avant de resservir. C'est faux : réutiliser le fluide récupéré sur <b>sa machine d'origine</b>, chez le <b>même détenteur</b> (celui qui possède ou utilise cette machine), est légal et ne demande aucun retraitement.",
       "titre": "Peser, charger, stocker, tracer"
      }
     ],
     "questions": [
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
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-09-D7A129ED.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Secu bouteille",
         "chemin": "illustrations/secu-bouteille.svg"
        }
       ],
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
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/bouteille-recuperation-verte.jpg",
       "ressources": [
        {
         "type": "image",
         "libelle": "Recuperation",
         "chemin": "illustrations/recuperation.svg"
        }
       ],
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
        "Des déchets ménagers ordinaires collectés par la commune du site",
        "DEEE (Déchets d'Équipements Électriques et Électroniques)",
        "Des déchets dangereux uniquement, sans passer par la filière DEEE",
        "Du recyclage ordinaire des métaux et plastiques"
       ],
       "bonne": 1,
       "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
       "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
       "remediation_vers": "g5a",
       "code": "5.08",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-08-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La recuperation la trace",
         "chemin": "illustrations/la-recuperation_la-trace.svg"
        }
       ],
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
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-bouteille-de-fluide-derriere-une-barrier-302EC180.webp",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Plaque bouteille",
         "chemin": "illustrations/plaque-bouteille.svg"
        },
        {
         "type": "image",
         "libelle": "Secu bouteille",
         "chemin": "illustrations/secu-bouteille.svg"
        }
       ],
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
        "Oui, en le brûlant au chalumeau",
        "Oui, en le diluant dans l'azote",
        "Non, uniquement centre agréé",
        "Oui, en le dégazant lentement"
       ],
       "bonne": 2,
       "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
       "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
       "remediation_vers": "g5a",
       "code": "5.08",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-08-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La recuperation la trace",
         "chemin": "illustrations/la-recuperation_la-trace.svg"
        }
       ],
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
     "type": "cours",
     "fiche": "p5",
     "titre": "L'ordre des vannes — la chorégraphie de l'intervention",
     "minutes": 25,
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
       "type": "experience",
       "url": "packs/fluides/res/chaine-intervention-interactive/index.html?dossier=deconnecter",
       "lancer": "🧭 Lancer le cours interactif : la chaîne de l’intervention",
       "desc": "Fermer, stabiliser, récupérer le résidu et desserrer lentement — la chorégraphie complète.",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/vanne-service-interactive/index.html?ecran=positions",
       "lancer": "🔩 Lancer le cours interactif : la vanne de service, ce que chaque position ferme",
       "desc": "Fermée sur l’arrière, intermédiaire, fermée sur l’avant : la coupe animée montre quel passage s’ouvre et quel volume reste isolé — un volume isolé n’est ni vide ni sans pression.",
       "titre": "L'ordre des vannes — la chorégraphie de l'intervention"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/ordre-vannes.svg",
       "alt": "Animation : les étapes de la déconnexion s'allument une à une sur le montage — fermer la vanne, laisser la pression se stabiliser, desserrer lentement, purger le flexible.",
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
        "Sur la ligne de refoulement, entre le compresseur et le condenseur",
        "Sur la ligne d'aspiration (entre évaporateur et compresseur)",
        "Sur la ligne liquide, juste en amont de l'entrée du détendeur",
        "Sur le condenseur, au niveau du piquage de service"
       ],
       "bonne": 1,
       "explication": "Le manomètre BASSE PRESSION se branche sur la ligne d'ASPIRATION (entre évaporateur et compresseur) ou sur le piquage BP du compresseur. Il mesure la pression d'évaporation (BP).",
       "aide": "Le manomètre BP mesure la pression côté basse pression.",
       "remed": {
        "texte": "Le manomètre BASSE PRESSION se branche sur la ligne d'ASPIRATION (entre évaporateur et compresseur) ou sur le piquage BP du compresseur. Il mesure la pression d'évaporation (BP)."
       },
       "remediation_vers": "g5a",
       "code": "5.01",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/photo-manometres-hp-bp.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Circuit complet manifold",
         "chemin": "illustrations/circuit-complet-manifold.svg"
        },
        {
         "type": "image",
         "libelle": "Manifold lecture",
         "chemin": "illustrations/manifold-lecture.svg"
        }
       ],
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
        "Sur la ligne d'aspiration, entre évaporateur et compresseur",
        "Sur la ligne de refoulement (entre compresseur et condenseur)",
        "Sur la ligne liquide, entre la sortie du condenseur et le détendeur",
        "Sur le corps du détendeur, au raccord du bulbe"
       ],
       "bonne": 1,
       "explication": "Le manomètre HAUTE PRESSION se branche sur la ligne de REFOULEMENT (entre compresseur et condenseur) ou sur le piquage HP du compresseur. Il mesure la pression de condensation (HP).",
       "aide": "Le manomètre HP mesure la pression côté haute pression.",
       "remed": {
        "texte": "Le manomètre HAUTE PRESSION se branche sur la ligne de REFOULEMENT (entre compresseur et condenseur) ou sur le piquage HP du compresseur. Il mesure la pression de condensation (HP)."
       },
       "remediation_vers": "g5a",
       "code": "5.01",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/photo-manometres-hp-bp.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Circuit complet manifold",
         "chemin": "illustrations/circuit-complet-manifold.svg"
        },
        {
         "type": "image",
         "libelle": "Manifold lecture",
         "chemin": "illustrations/manifold-lecture.svg"
        }
       ],
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
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-bouteille-de-recuperation-fleche-de-tran-3BBF9BDE.webp",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Secu bouteille",
         "chemin": "illustrations/secu-bouteille.svg"
        },
        {
         "type": "page",
         "libelle": "Mission bouteilles",
         "chemin": "mission-bouteilles/index.html"
        },
        {
         "type": "image",
         "libelle": "inerweb habilitation contenus illustrations bouteille deux robinets svg.svg",
         "chemin": "illustrations/bouteille-deux-robinets.svg"
        }
       ],
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
     "minutes": 20,
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
       "type": "experience",
       "url": "packs/fluides/res/recuperation-fluide-interactive/index.html",
       "lancer": "🧰 Lancer le TP interactif : récupérer le fluide, geste par geste",
       "desc": "La procédure ci-dessus, à faire soi-même sur un poste complet — manifold 4 voies, station Minimax-E, bouteille de transfert sur balance, pompe à vide et vacuomètre. Huit phases, guidé puis autonome : poser le manifold, purger l'air, récupérer en liquide puis en vapeur, auto-purger la station, peser, tirer au vide.",
       "titre": "La station de récupération — ce que c'est, comment on la branche"
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
       "html": "<ol><li>Consigner électriquement l'installation à traiter.</li><li>Vérifier l'étiquette du cylindre de récupération : le fluide indiqué doit être exactement celui de l'installation.</li><li>Poser le cylindre sur la balance et noter la masse de départ, avant tout branchement.</li><li>Vannes du groupe fermées, brancher le flexible d'entrée sur le circuit et le flexible de sortie sur le cylindre.</li><li>Mettre le groupe sous tension et le régler selon la fiche du fabricant.</li></ol>",
       "titre": "La station de récupération — ce que c'est, comment on la branche"
      },
      {
       "type": "point",
       "html": "<ol start=\"6\"><li>Ouvrir les vannes dans l'ordre indiqué par le fabricant ; surveiller la pression et la masse affichée.</li><li>En fin de transfert, purger les flexibles avant de débrancher — minimum d'émission.</li><li>Repeser le cylindre, noter la masse récupérée, consigner au registre.</li></ol>",
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
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-03-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Mission bouteilles",
         "chemin": "mission-bouteilles/index.html"
        },
        {
         "type": "image",
         "libelle": "inerweb habilitation contenus illustrations recuperation svg.svg",
         "chemin": "illustrations/recuperation.svg"
        }
       ],
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
        "Démarrer le compresseur pour vider le circuit",
        "Récupérer le fluide frigorigène dans un récipient adapté",
        "Ouvrir toutes les vannes du circuit lentement",
        "Ajouter de l'huile pour protéger le compresseur"
       ],
       "bonne": 1,
       "explication": "Avant toute ouverture du circuit, il est OBLIGATOIRE de RÉCUPÉRER le fluide frigorigène avec une station de récupération certifiée. C'est une obligation légale (F-Gas) et environnementale.",
       "aide": "Pour des raisons légales et environnementales, le fluide doit être récupéré.",
       "remed": {
        "texte": "Avant toute ouverture du circuit, il est OBLIGATOIRE de RÉCUPÉRER le fluide frigorigène avec une station de récupération certifiée. C'est une obligation légale (F-Gas) et environnementale. Ne jamais purger le fluide dans l'atmosphère !"
       },
       "remediation_vers": "g5a",
       "code": "5.03",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-03-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Recuperation",
         "chemin": "illustrations/recuperation.svg"
        }
       ],
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
     "fiche": "p6",
     "titre": "La balance et la pesée — avant, après, ce qu'on note",
     "minutes": 20,
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
       "type": "experience",
       "url": "packs/fluides/res/mission-bouteilles/index.html",
       "lancer": "🧪 Lancer le cours interactif : Mission Bouteilles — identifier, peser, ne jamais surremplir",
       "desc": "8 étapes racontées : calcul de pesée, phase liquide/vapeur, simulation de surremplissage et risque d'éclatement, bouteilles A2L/A3 — environ 10 minutes.",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/photos/balance.jpg",
       "alt": "Une balance électronique de charge avec une bouteille de fluide posée dessus.",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
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
       "html": "<ol><li>Poser la bouteille sur la balance <b>avant</b> toute opération. Relever le poids. Le noter — pas de mémoire.</li><li>Avant d'ouvrir la moindre vanne, déterminer l'<b>état du fluide</b> attendu : liquide ou gazeux, selon l'opération et la documentation constructeur. Ce choix fixe le sens du remplissage.</li><li>Réaliser l'opération — récupération ou charge — en surveillant la balance pendant que ça se fait, pas seulement à la fin.</li></ol>",
       "titre": "La balance et la pesée — avant, après, ce qu'on note"
      },
      {
       "type": "point",
       "html": "<ol start=\"4\"><li>Fermer les vannes, laisser la pression se stabiliser, déconnecter proprement.</li><li>Peser à nouveau, <b>après</b>. Relever ce second poids.</li><li>Calculer l'écart entre les deux pesées. C'est la quantité réelle, pas une estimation.</li><li>Reporter aussitôt le résultat au registre : date, quantité, intervenant.</li></ol>",
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
        "Un jeu de manomètres",
        "Une balance de précision",
        "Un thermomètre à sonde",
        "Un vacuomètre à vide"
       ],
       "bonne": 1,
       "explication": "Une balance de précision — La charge se fait au poids : on pèse la bouteille avant et après pour connaître la quantité exacte introduite (±5g).",
       "aide": "La quantité de fluide se mesure en kg, donc par pesage.",
       "remed": {
        "texte": "La charge se fait au poids : on pèse la bouteille avant et après pour connaître la quantité exacte introduite (±5g)."
       },
       "remediation_vers": "g5a",
       "code": "5.06",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-06-D7A129ED.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Pesee charge",
         "chemin": "illustrations/pesee-charge.svg"
        }
       ],
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
        "La couleur du fluide dans le voyant liquide",
        "La surchauffe et le sous-refroidissement",
        "Le bruit du compresseur pendant la montée en charge",
        "La vitesse du ventilateur de condenseur"
       ],
       "bonne": 1,
       "explication": "Surchauffe et sous-refroidissement — Ces deux paramètres indiquent si la quantité de fluide est correcte. Surchauffe trop haute = manque. SR trop bas = manque aussi.",
       "aide": "Ce sont les deux indicateurs clés de la bonne charge.",
       "remed": {
        "texte": "Ces deux paramètres indiquent si la quantité de fluide est correcte. Surchauffe trop haute = manque. SR trop bas = manque aussi."
       },
       "remediation_vers": "g5a",
       "code": "5.05",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-05-304B1178.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Pesee charge",
         "chemin": "illustrations/pesee-charge.svg"
        }
       ],
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
        "Parce que le registre de l'équipement exige de le noter",
        "Parce que cela permet de connaître le PRP du fluide chargé",
        "Parce que cela dispense de peser la bouteille de charge"
       ],
       "bonne": 0,
       "aide": "Le référentiel place ce diagnostic AVANT le geste de charge. Que déciderait-on ensuite, s'il était faux ?",
       "remed": {
        "regle": "On détermine d'abord l'état et les conditions du fluide, puis on en déduit la méthode de remplissage — en phase liquide ou en phase vapeur — et le volume adapté.",
        "pourquoi": "Charger en phase vapeur un mélange zéotrope modifie la composition de ce qui reste dans la bouteille ; charger sans savoir où en'est l'installation conduit à sur-charger ou sous-charger.",
        "piege": "Croire que la pesée suffit. La balance dit combien on a mis, elle ne dit pas s'il fallait le mettre en liquide ou en vapeur, ni si la charge était déjà correcte."
       },
       "remediation_vers": "g1e",
       "explication": "On détermine d'abord l'état et les conditions du fluide, puis on en déduit la méthode de remplissage — en phase liquide ou en phase vapeur — et le volume adapté.",
       "origine": "pack",
       "chapitre": "05",
       "chapitre_titre": "Gestion écologique du système et récupération du fluide",
       "chapitre_fichier": "CONTENU-05-G5-recuperation.md",
       "illustration": "illustrations/sup-cours-5-05-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "La recuperation liquide vapeur",
         "chemin": "illustrations/la-recuperation_liquide-vapeur.svg"
        }
       ],
       "categories": [
        "A1",
        "A2",
        "D"
       ]
      }
     ],
     "notes": "Faire peser un objet neutre (bouteille d'eau, poids étalon) deux fois avant d'expliquer la règle, et demander ce qui se passerait si on n'avait que la seconde pesée — laisser le groupe trouver lui-même que le premier chiffre est indispensable. Faire remplir une ligne de registre fictive à partir des deux pesées relevées. Le réflexe à traquer : le stagiaire qui commence à manipuler avant d'avoir pesé — l'arrêter avant le premier geste, pas après."
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=x3",
       "lancer": "🎧 Écouter la capsule : Détective — la bouteille de récupération",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 5 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "Détective — la bouteille de récupération"
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
     "fiche": "g6",
     "titre": "Le compresseur",
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/module-compresseur/index.html",
       "lancer": "🔧 Lancer le cours interactif : le compresseur, du piston au volume balayé",
       "desc": "Le Module Compresseur du portail FRIGOLO, ré-exploité pour la formation : types de compresseurs, fonctionnement du piston, volume balayé, rendement volumétrique et échauffement de compression — curseurs à manipuler et feuille de résultats imprimable.",
       "titre": "Le compresseur"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/compresseur-interactif/index.html",
       "lancer": "🛠️ S'entraîner aux gestes : installer, régler, vérifier le compresseur",
       "desc": "13 écrans dans le moteur des modules condenseur et évaporateur : la plaque signalétique, l'assise et les sécurités, régler en prouvant à l'instrument, la vanne d'aspiration, l'huile et son retour, le séparateur — deux contrôles corrigés.",
       "titre": "Le compresseur"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/circuit-organe-par-organe/index.html",
       "lancer": "🔧 Lancer le cours interactif : le circuit, organe par organe",
       "desc": "La croix du frigoriste, chaque organe en fiche animée (piston, scroll et vis compris), les serpentins du condenseur et de l'évaporateur, la régulation du détendeur, l'exercice « suivez le fluide », la bibliothèque des 10 organes et un défi final de 10 questions.",
       "titre": "Le compresseur"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/tome-3-technologie-organes/index.html?dossier=compresseurs",
       "lancer": "📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe",
       "desc": "les quatre technologies de compression — piston, scroll, vis et rotatif — chacune en vue isolée, avec son symbole normalisé et son fonctionnement interne animé.",
       "titre": "Le compresseur"
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
       "type": "point",
       "html": "On distingue plusieurs <b>types</b> de compresseur, selon la façon dont la vapeur est comprimée. Le compresseur à <b>piston</b> comprime par un mouvement de va-et-vient, comme une pompe à vélo. Le compresseur <b>scroll</b> (deux spirales imbriquées, une fixe et une mobile qui tourne à l'intérieur) comprime en continu, sans à-coups : c'est la technologie la plus répandue en climatisation. Le compresseur à <b>vis</b> comprime la vapeur entre deux rotors qui s'engrènent ; on le trouve sur les grosses puissances.",
       "titre": "Le compresseur"
      },
      {
       "type": "point",
       "html": "Il existe aussi trois <b>architectures</b>, selon la manière dont le moteur électrique entraîne le compresseur. En <b>hermétique</b>, le moteur et le compresseur sont enfermés ensemble dans une coque soudée : aucun arbre ne sort à l'extérieur, donc aucune fuite possible à cet endroit, mais la coque ne s'ouvre pas et le compresseur n'est pas réparable.",
       "titre": "Le compresseur"
      },
      {
       "type": "point",
       "html": "En <b>semi-hermétique</b>, la coque est boulonnée : on peut l'ouvrir pour intervenir à l'intérieur, en refaisant les joints au remontage. En <b>ouvert</b>, le moteur est séparé du compresseur et l'entraîne par un arbre qui traverse la coque de part en part ; cet arbre passe par une <b>garniture</b> (un joint tournant), qui est un point de fuite classique à surveiller sur ce type de machine.",
       "titre": "Le compresseur"
      },
      {
       "type": "point",
       "html": "Pour vérifier que le retour d'huile fonctionne bien, on contrôle le <b>niveau d'huile</b> au <b>voyant d'huile</b> : un petit hublot placé sur le carter du compresseur. On regarde ce voyant <b>machine en marche stabilisée</b> (après quelques minutes de fonctionnement, pas juste au démarrage) : le niveau doit rester visible dans la zone du voyant, sans descendre en dessous.",
       "titre": "Le compresseur"
      },
      {
       "type": "point",
       "html": "La zone exacte à respecter est donnée par la <b>documentation constructeur</b>, à faire valider avant de conclure sur un manque ou un excès d'huile.",
       "titre": "Le compresseur"
      },
      {
       "type": "point",
       "html": "Après toute intervention sur un compresseur, on rédige un <b>rapport</b>. Il rassemble trois choses : ce qu'on a <b>observé</b> (bruits anormaux, niveau d'huile au voyant, valeurs relevées comme les pressions ou la température de refoulement), ce qu'on a <b>fait</b> (pièce changée, réglage effectué, essai réalisé), et tout <b>problème restant</b> qui pourrait, plus tard, entraîner une panne ou une fuite. Ce rapport est <b>daté et signé</b> : c'est ce qui permet au prochain intervenant de savoir où en est la machine, sans tout redécouvrir.",
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
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "À quoi sert le rapport",
       "html": "Un <b>rapport</b> n'est pas une formalité administrative : c'est la mémoire de la machine. Un problème noté mais non résolu (par exemple un bruit anormal ou une trace d'huile suspecte) doit être signalé dans le rapport même s'il n'empêche pas la machine de tourner aujourd'hui.",
       "titre": "Le compresseur"
      }
     ],
     "questions": [
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
       "chapitre": "06",
       "chapitre_titre": "Composant : compresseurs",
       "chapitre_fichier": "CONTENU-06-G6-compresseurs.md",
       "illustration": "illustrations/bib-pose-et-d-pose-docoune-paire-de-manom-tr-315a0433.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Compresseurs",
         "chemin": "illustrations/compresseurs.svg"
        }
       ],
       "categories": [
        "A1",
        "A2"
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
        "Détendre le liquide sous haute pression",
        "Condenser les vapeurs surchauffées"
       ],
       "bonne": 1,
       "explication": "Le compresseur ASPIRE le gaz basse pression en provenance de l'évaporateur et le COMPRIME pour l'envoyer vers le condenseur à haute pression. C'est le moteur du cycle frigorifique.",
       "aide": "Le compresseur est le cœur du système. Il crée la différence de pression nécessaire au cycle.",
       "remed": {
        "texte": "Le compresseur ASPIRE le gaz basse pression en provenance de l'évaporateur et le COMPRIME pour l'envoyer vers le condenseur à haute pression. C'est le moteur du cycle frigorifique."
       },
       "remediation_vers": "g6",
       "code": "6.01",
       "chapitre": "06",
       "chapitre_titre": "Composant : compresseurs",
       "chapitre_fichier": "CONTENU-06-G6-compresseurs.md",
       "illustration": "illustrations/photo-compresseur-hermetique.png",
       "ressources": [
        {
         "type": "image",
         "libelle": "Compresseurs",
         "chemin": "illustrations/compresseurs.svg"
        },
        {
         "type": "page",
         "libelle": "Circuit organe par organe",
         "chemin": "circuit-organe-par-organe/index.html"
        }
       ],
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
        "À vérifier la température de l'huile du carter",
        "À vérifier la pression d'huile du compresseur",
        "À vidanger l'huile usagée en fin d'intervention"
       ],
       "bonne": 0,
       "explication": "Le VOYANT D'HUILE (sur les compresseurs équipés) permet de vérifier visuellement le NIVEAU D'HUILE dans le carter du compresseur.",
       "aide": "C'est un hublot transparent qui permet de voir l'huile.",
       "remed": {
        "texte": "Le VOYANT D'HUILE (sur les compresseurs équipés) permet de vérifier visuellement le NIVEAU D'HUILE dans le carter du compresseur. Un niveau correct garantit la lubrification et le refroidissement du compresseur."
       },
       "remediation_vers": "g6",
       "code": "6.05",
       "chapitre": "06",
       "chapitre_titre": "Composant : compresseurs",
       "chapitre_fichier": "CONTENU-06-G6-compresseurs.md",
       "illustration": "illustrations/bib-pose-et-d-pose-docoune-paire-de-manom-tr-315a0433.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Compresseurs",
         "chemin": "illustrations/compresseurs.svg"
        }
       ],
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
        "Refroidir le fluide avant l'entrée au condenseur",
        "Lubrifier les pièces mobiles et assurer l'étanchéité",
        "Augmenter la pression de refoulement du compresseur",
        "Filtrer les impuretés du circuit frigorifique"
       ],
       "bonne": 1,
       "explication": "L'huile LUBRIFIE les pièces mobiles du compresseur (pistons, roulements, paliers), REFROIDIT les parties chaudes, et assure l'ÉTANCHÉITÉ entre les zones HP et BP.",
       "aide": "L'huile est essentielle au bon fonctionnement du compresseur.",
       "remed": {
        "texte": "L'huile LUBRIFIE les pièces mobiles du compresseur (pistons, roulements, paliers), REFROIDIT les parties chaudes, et assure l'ÉTANCHÉITÉ entre les zones HP et BP. Sans huile ou avec un niveau insuffisant, le compresseur grippe et se détruit rapidement."
       },
       "remediation_vers": "g6",
       "code": "6.01",
       "chapitre": "06",
       "chapitre_titre": "Composant : compresseurs",
       "chapitre_fichier": "CONTENU-06-G6-compresseurs.md",
       "illustration": "illustrations/bib-pose-et-d-pose-docoune-paire-de-manom-tr-315a0433.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Compresseurs",
         "chemin": "illustrations/compresseurs.svg"
        }
       ],
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
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/compresseur-interactif/index.html",
       "lancer": "🛠️ Lancer le cours interactif : installer, régler, vérifier le compresseur",
       "desc": "13 écrans : trois enveloppes de machines, la plaque signalétique, poser sans transmettre, le matériel de sécurité qui fait partie de l'installation, sécurité contre contrôle, la vanne d'aspiration et ses trois positions, l'huile du carter au séparateur — deux contrôles corrigés.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/vanne-service-interactive/index.html?ecran=positions",
       "lancer": "🔩 Lancer le cours interactif : la vanne de service en coupe animée",
       "desc": "Les trois positions décrites ci-dessus, vues de l’intérieur : le carré, la tige et le pointeau se déplacent ensemble, le presse-étoupe reste fixe. Plus la voie de service P, la prise permanente P1 du pressostat, et deux mini-jeux corrigés.",
       "titre": "Compresseur — installer, régler, vérifier"
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
       "type": "point",
       "html": "Le compresseur ne se pose jamais directement sur son châssis ou sur le sol. On le fixe sur des <b>plots antivibratiles</b> (des « silent-blocs ») : des cales en caoutchouc qui absorbent les vibrations pendant qu'il tourne. Sans eux, la vibration se transmet à toute la tuyauterie qui y est raccordée.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Une tuyauterie qui vibre en permanence, ou montée en contrainte (tordue pour rejoindre un piquage), finit tôt ou tard par se fissurer : c'est une cause classique de fuite, qu'on évite dès l'installation.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Le compresseur porte aussi des <b>vannes de service</b>, une côté aspiration et une côté refoulement. Elles ont plusieurs positions : <b>ouverte en arrière</b> pour le fonctionnement normal, une <b>position intermédiaire</b> qui permet de brancher un manomètre sans isoler le compresseur, et <b>fermée</b> pour le couper complètement du reste du circuit, par exemple avant une intervention.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "On manœuvre chaque vanne selon la documentation constructeur : le nombre de tours et le sens de manœuvre ne sont pas les mêmes d'un modèle à l'autre.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Au démarrage, on ne se contente pas de regarder le compresseur tourner : on <b>mesure</b>. On relève l'<b>intensité</b> absorbée par le moteur (le courant électrique qu'il consomme) et on la compare à la valeur inscrite sur la <b>plaque signalétique</b> du compresseur — jamais à un chiffre appris par cœur ou approximatif.",
       "titre": "Compresseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Une intensité trop haute annonce un défaut (moteur qui force, réglage à revoir). On vérifie en même temps que les pressions se stabilisent dans les plages attendues, toujours selon la documentation constructeur.",
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
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "La valeur plaque, jamais un chiffre inventé",
       "html": "<p>Pour juger si un compresseur fonctionne normalement, on compare toujours ce qu'on mesure (intensité, pression) à la <b>valeur plaque</b> : celle inscrite sur la plaque signalétique de l'appareil, ou celle donnée par la documentation constructeur. On ne compare jamais à un chiffre retenu de mémoire ou à vue de nez : chaque compresseur a ses propres valeurs de référence.</p>",
       "titre": "Compresseur — installer, régler, vérifier"
      }
     ],
     "questions": [
      {
       "id": "pk-q-6.08",
       "dc": "G6",
       "code": "6.08",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Pourquoi bien installer, bien régler et bien entretenir un compresseur améliore l'efficacité énergétique ?",
       "choix": [
        "Parce que cela dispense de contrôler l'étanchéité du circuit à l'azote",
        "Parce que cela augmente automatiquement la puissance frigorifique de la machine",
        "Parce qu'un compresseur bien réglé consomme moins et dure plus longtemps",
        "Parce que cela abaisse la classe de sécurité du fluide frigorigène utilisé"
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
       "chapitre": "06",
       "chapitre_titre": "Composant : compresseurs",
       "chapitre_fichier": "CONTENU-06-G6-compresseurs.md",
       "illustration": "illustrations/bib-pose-et-d-pose-docoune-paire-de-manom-tr-315a0433.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Bilan thermique performance interactif",
         "chemin": "bilan-thermique-performance-interactif/index.html"
        }
       ],
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
        "De régler la température d'évaporation depuis le tableau électrique",
        "De raccorder les manomètres et équipements de maintenance",
        "D'inverser le cycle pour passer en mode pompe à chaleur",
        "De purger l'huile usagée du carter en fin d'intervention"
       ],
       "bonne": 1,
       "explication": "Raccorder les manomètres et équipements — Les vannes de service (Schrader ou à tige) sont les points d'accès au circuit pour la mesure et l'intervention.",
       "aide": "Ce sont les 'portes d'entrée' du technicien sur le circuit.",
       "remed": {
        "texte": "Les vannes de service (Schrader ou à tige) sont les points d'accès au circuit pour la mesure et l'intervention."
       },
       "remediation_vers": "g6",
       "code": "6.06",
       "chapitre": "06",
       "chapitre_titre": "Composant : compresseurs",
       "chapitre_fichier": "CONTENU-06-G6-compresseurs.md",
       "illustration": "illustrations/bib-robinet-wc-a-potence-da0efce7.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Compresseurs",
         "chemin": "illustrations/compresseurs.svg"
        }
       ],
       "categories": [
        "A1",
        "A2"
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
        "Le compresseur perd son huile par vibration et le voyant se vide peu à peu",
        "La consommation électrique grimpe fortement, les vibrations freinant le moteur du compresseur",
        "Le bruit augmente, mais l'installation n'en souffre pas mécaniquement"
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
       "chapitre": "06",
       "chapitre_titre": "Composant : compresseurs",
       "chapitre_fichier": "CONTENU-06-G6-compresseurs.md",
       "illustration": "illustrations/bib-pose-et-d-pose-docoune-paire-de-manom-tr-315a0433.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Compresseurs",
         "chemin": "illustrations/compresseurs.svg"
        }
       ],
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
        "Une baisse automatique de la consommation électrique du moteur",
        "Un excès d'huile bien visible au voyant du carter moteur",
        "Une perte de puissance, ou un compresseur qui s'abîme",
        "Aucune conséquence tant que la machine démarre normalement"
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
       "chapitre": "06",
       "chapitre_titre": "Composant : compresseurs",
       "chapitre_fichier": "CONTENU-06-G6-compresseurs.md",
       "illustration": "illustrations/bib-pose-et-d-pose-docoune-paire-de-manom-tr-315a0433.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Compresseurs",
         "chemin": "illustrations/compresseurs.svg"
        }
       ],
       "categories": [
        "A1"
       ]
      }
     ],
     "notes": "Carte complémentaire de g6 : ici, le geste plutôt que la théorie. Faire manipuler une vraie fiche constructeur pour montrer que le réglage des soupapes (6.04) ne s'invente jamais — c'est le réflexe à ancrer, plus utile qu'un chiffre mémorisé. Sur un compresseur d'atelier CONSIGNÉ, faire dérouler la procédure complète : contrôle avant mise en marche, relevés en fonctionnement, arrêt propre. Le réglage des soupapes (6.04) n'est évalué en pratique qu'en catégorie A1 — les stagiaires visant seulement A2 peuvent s'en tenir aux principes. Le code 6.08 est nouveau et seulement théorique : un temps d'échange suffit (propreté des échangeurs, charge correcte, surchauffe bien réglée) plutôt qu'une démonstration. Relier à g7 pour la suite du parcours."
    }
   ]
  },
  {
   "n": 3,
   "libelle": null,
   "titre": "Le TP de bout en bout, puis les échangeurs",
   "intention": "Une après-midi, une machine, la chaîne complète : mise sous azote, contrôle d'étanchéité, tirage au vide, charge pesée, relevés, récupération, remise sous azote, et le CERFA rempli jusqu'au bout. C'est l'épreuve en conditions réelles, en plus long.",
   "sequences": [
    {
     "type": "plateau",
     "fiche": null,
     "titre": "TP 1/2 — sous azote : installation, pose du manifold, mise en pression, recherche de fuite au détecteur et à l'eau savonneuse, tirage au vide et tenue du vide",
     "minutes": 120,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "TP 1/2 — sous azote : installation, pose du manifold, mise en pression, recherche de fuite au détecteur et à l'eau savonneuse, tirage au vide et tenue du vide",
       "minutes": 120
      }
     ]
    },
    {
     "type": "plateau",
     "fiche": null,
     "titre": "TP 2/2 — avec le fluide : charge en phase liquide à la balance, relevés et surchauffe, récupération complète, remise sous azote, CERFA et traçabilité du fluide",
     "minutes": 120,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "TP 2/2 — avec le fluide : charge en phase liquide à la balance, relevés et surchauffe, récupération complète, remise sous azote, CERFA et traçabilité du fluide",
       "minutes": 120
      }
     ]
    },
    {
     "type": "cours",
     "fiche": "g7",
     "titre": "Le condenseur",
     "minutes": 25,
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
       "type": "experience",
       "url": "packs/fluides/res/circuit-organe-par-organe/index.html",
       "lancer": "🔧 Lancer le cours interactif : le circuit, organe par organe",
       "desc": "La croix du frigoriste, chaque organe en fiche animée (piston, scroll et vis compris), les serpentins du condenseur et de l'évaporateur, la régulation du détendeur, l'exercice « suivez le fluide », la bibliothèque des 10 organes et un défi final de 10 questions.",
       "titre": "Le condenseur"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/tome-3-technologie-organes/index.html?dossier=condenseurs",
       "lancer": "📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe",
       "desc": "le condenseur à air et le condenseur à eau, leur place sur la croix du frigoriste, et ce qui entre et sort de chacun.",
       "titre": "Le condenseur"
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
        "Absorber la chaleur du local ou du produit que l'on refroidit",
        "Évacuer la chaleur du fluide frigorigène vers l'extérieur",
        "Comprimer le gaz frigorigène en provenance de l'évaporateur",
        "Détendre le liquide frigorigène avant l'évaporateur"
       ],
       "bonne": 1,
       "explication": "Le CONDENSEUR évacue la chaleur du fluide frigorigène vers l'extérieur (air ou eau). Le gaz chaud se refroidit et se condense en liquide. C'est l'organe qui 'rejette' la chaleur.",
       "aide": "Le condenseur travaille côté haute pression et rejette de la chaleur.",
       "remed": {
        "texte": "Le CONDENSEUR évacue la chaleur du fluide frigorigène vers l'extérieur (air ou eau). Le gaz chaud se refroidit et se condense en liquide. C'est l'organe qui 'rejette' la chaleur."
       },
       "remediation_vers": "g7",
       "code": "7.01",
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-image-205-eceebfe3.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Condenseur interactif",
         "chemin": "condenseur-interactif/index.html"
        }
       ],
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
        "Refroidir le corps du compresseur ainsi que son moteur électrique",
        "Forcer l'air à travers le condenseur pour évacuer la chaleur",
        "Aspirer le fluide frigorigène jusque dans la bouteille liquide",
        "Détendre le gaz avant son entrée dans l'évaporateur"
       ],
       "bonne": 1,
       "explication": "Les ventilateurs FORCENT l'air à travers les ailettes du condenseur pour améliorer l'évacuation de la chaleur.",
       "aide": "Les ventilateurs améliorent l'échange thermique avec l'air.",
       "remed": {
        "texte": "Les ventilateurs FORCENT l'air à travers les ailettes du condenseur pour améliorer l'évacuation de la chaleur. Plus le débit d'air est important, plus le condenseur est efficace (dans certaines limites)."
       },
       "remediation_vers": "g7",
       "code": "7.01",
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-technologie-des-condenseurs-ef0dfbd5.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Condenseur interactif",
         "chemin": "condenseur-interactif/index.html"
        },
        {
         "type": "image",
         "libelle": "inerweb habilitation contenus illustrations echangeur air svg.svg",
         "chemin": "illustrations/echangeur-air.svg"
        }
       ],
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
        "Augmenter la température du liquide juste avant l'entrée du détendeur",
        "S'assurer que le liquide est bien liquide (pas de bulles) et améliorer l'efficacité",
        "Diminuer la pression du liquide dans la ligne qui mène au détendeur",
        "Protéger le compresseur contre les retours de liquide à l'aspiration"
       ],
       "bonne": 1,
       "explication": "Le SOUS-REFROIDISSEMENT consiste à refroidir le liquide en dessous de sa température de condensation. Cela garantit qu'il reste liquide dans toute la ligne liquide (pas de flash-gas), améliore…",
       "aide": "Le sous-refroidissement garantit qu'on a bien du liquide pur dans la ligne liquide.",
       "remed": {
        "texte": "Le SOUS-REFROIDISSEMENT consiste à refroidir le liquide en dessous de sa température de condensation. Cela garantit qu'il reste liquide dans toute la ligne liquide (pas de flash-gas), améliore l'efficacité du détendeur et augmente la puissance frigorifique."
       },
       "remediation_vers": "g7",
       "code": "7.01",
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-image-205-eceebfe3.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "La surchauffe sous refroidissement",
         "chemin": "illustrations/la-surchauffe_sous-refroidissement.svg"
        }
       ],
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
        "Régulation continue de la pression de condensation",
        "Sécurité (protection contre la surpression)",
        "Mesure du débit de fluide dans la ligne liquide",
        "Commande de la vitesse des ventilateurs du condenseur"
       ],
       "bonne": 1,
       "explication": "Sécurité — Le pressostat HP est avant tout un organe de sécurité qui coupe le compresseur si la pression HP dépasse le seuil dangereux.",
       "aide": "HP trop élevée = danger. Il faut couper immédiatement.",
       "remed": {
        "texte": "Le pressostat HP est avant tout un organe de sécurité qui coupe le compresseur si la pression HP dépasse le seuil dangereux."
       },
       "remediation_vers": "g7",
       "code": "7.04",
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/photo-pressostat-danfoss-kp2.jpeg",
       "ressources": [
        {
         "type": "image",
         "libelle": "Regulateurs pression",
         "chemin": "illustrations/regulateurs-pression.svg"
        }
       ],
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
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/condenseur-interactif/index.html?dossier=observer",
       "lancer": "🌬 Lancer le cours interactif : condenseur — installer, régler, vérifier",
       "desc": "Batterie que l’on encrasse, ventilation que l’on coupe, pression de condensation qualitative, installation, régulateur, inspection, rapport et cinq contrôles.",
       "titre": "Condenseur — installer, régler, vérifier"
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
       "type": "point",
       "html": "Un organe mérite qu'on s'y arrête, parce que le référentiel le demande nommément : le <b>régulateur de pression de sortie du condenseur</b>. Sur le terrain, on l'appelle couramment un <b>KVR</b> — c'est une référence commerciale, pas le nom de la fonction.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "À quoi sert-il ? Quand il fait <b>froid dehors</b>, le condenseur évacue la chaleur trop facilement et la haute pression descend. Or le <b>détendeur</b> a besoin d'un écart de pression suffisant entre l'entrée et la sortie pour alimenter correctement l'évaporateur. Si la haute pression tombe trop bas, cet écart disparaît, le détendeur n'alimente plus, et l'installation ne fait plus de froid alors que rien n'est cassé. Le régulateur <b>retient</b> la pression de condensation au-dessus d'une valeur réglée : c'est tout son rôle.",
       "titre": "Condenseur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Il ne faut le confondre avec aucun des deux autres régulateurs du circuit. Celui-ci agit sur la <b>haute</b> pression, en sortie de condenseur. Les deux autres — pression d'évaporation et pression de carter — agissent du côté <b>basse</b> pression, et se voient à la fiche de l'évaporateur.",
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
       "t": "Un régulateur ne coupe rien",
       "html": "Le <b>pressostat HP</b> est une sécurité : il <b>coupe</b> l'alimentation électrique du compresseur quand la pression devient dangereuse. Le <b>régulateur de pression de condensation</b> ne coupe rien du tout : c'est une vanne, elle <b>maintient</b> une pression. Deux organes, deux fonctions, deux réglages — et l'un ne remplace jamais l'autre.",
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
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-lycee-professionnel-prive-38209cca.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Epreuve azote",
         "chemin": "illustrations/epreuve-azote.svg"
        }
       ],
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
        "Le pressostat coupe le compresseur ; le régulateur maintient une pression sans couper",
        "Le pressostat maintient une pression ; le régulateur coupe l'alimentation du compresseur",
        "Ce sont deux noms différents du même organe de sécurité",
        "Le pressostat se règle, le régulateur se remplace à chaque visite"
       ],
       "bonne": 0,
       "aide": "L'un'est un interrupteur électrique, l'autre est une vanne.",
       "remed": {
        "regle": "Un pressostat est un organe de sécurité électrique : il coupe. Un régulateur de pression'est une vanne : il maintient une pression et ne coupe rien.",
        "pourquoi": "Les deux surveillent la pression, mais l'un protège la machine en l'arrêtant, l'autre fait fonctionner l'installation correctement sans jamais l'arrêter.",
        "piege": "Croire qu'un régulateur peut remplacer une sécurité. Une installation a besoin des deux, avec deux réglages distincts pris sur la fiche constructeur."
       },
       "remediation_vers": "g7b",
       "explication": "Un pressostat est un organe de sécurité électrique : il coupe. Un régulateur de pression'est une vanne : il maintient une pression et ne coupe rien.",
       "origine": "pack",
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-s6-act-6-pressostats-1e645f81.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Regulateurs pression",
         "chemin": "illustrations/regulateurs-pression.svg"
        }
       ],
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
        "Le nom du fabricant du compresseur et son numéro de série complet",
        "Le prix de l'intervention et le détail de tout ce qui est facturé au client",
        "Ailettes encrassées, ventilateur bruyant, trace d'huile, pression anormale",
        "Uniquement la date de la dernière charge de fluide effectuée"
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
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-image-205-eceebfe3.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Condenseur interactif",
         "chemin": "condenseur-interactif/index.html"
        }
       ],
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
        "En augmentant volontairement la pression de condensation de toute l'installation",
        "En réduisant le sous-refroidissement à zéro à la sortie de la batterie",
        "En arrêtant le ventilateur pendant la nuit pour économiser du courant"
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
       "chapitre": "07",
       "chapitre_titre": "Composant : condenseurs à air et à eau",
       "chapitre_fichier": "CONTENU-07-G7-condenseurs.md",
       "illustration": "illustrations/bib-image-205-eceebfe3.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Condenseur interactif",
         "chemin": "condenseur-interactif/index.html"
        },
        {
         "type": "page",
         "libelle": "Bilan thermique performance interactif",
         "chemin": "bilan-thermique-performance-interactif/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Insister sur la consignation électrique avant toute inspection de conduites, et sur l'azote seul pour contrôler l'étanchéité (jamais d'oxygène). Si un stagiaire confond condenseur à air et tour de refroidissement, revenir à la croix du frigoriste au tableau. Faire rédiger un vrai rapport d'état à l'écrit, même court. ⚠️ À FAIRE VALIDER (27/07) : la description du régulateur de pression de sortie de condenseur (rôle par temps froid, écart de pression nécessaire au détendeur) et l'emploi de la désignation « KVR ». Arbitrage tenu dans tout le pack : on enseigne la FONCTION sous son nom générique, la référence commerciale vient ensuite, parce que c'est le mot que le stagiaire entendra sur le chantier. Montrer l'organe réel sur le plateau si le parc en possède un ; sinon, le dire franchement."
    },
    {
     "type": "cours",
     "fiche": "g8",
     "titre": "L'évaporateur",
     "minutes": 25,
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
       "type": "experience",
       "url": "packs/fluides/res/circuit-organe-par-organe/index.html",
       "lancer": "🔧 Lancer le cours interactif : le circuit, organe par organe",
       "desc": "La croix du frigoriste, chaque organe en fiche animée (piston, scroll et vis compris), les serpentins du condenseur et de l'évaporateur, la régulation du détendeur, l'exercice « suivez le fluide », la bibliothèque des 10 organes et un défi final de 10 questions.",
       "titre": "L'évaporateur"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/tome-3-technologie-organes/index.html?dossier=evaporateurs",
       "lancer": "📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe",
       "desc": "l'évaporateur à air et à eau, l'état du fluide à l'entrée et à la sortie, et le montage habituel.",
       "titre": "L'évaporateur"
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
       "type": "point",
       "html": "La conduite d'<b>aspiration</b> relie l'évaporateur au compresseur. Elle transporte le fluide en vapeur, mais cette vapeur emporte toujours un peu d'<b>huile</b>, celle qui lubrifie le compresseur. Pour que l'huile revienne avec le gaz, on pose cette conduite en légère <b>pente</b>, inclinée vers le compresseur. Ainsi, l'huile glisse avec le fluide au lieu de stagner dans un creux du tube.",
       "titre": "L'évaporateur"
      },
      {
       "type": "point",
       "html": "Parfois, le tracé oblige la conduite d'aspiration à remonter. Par exemple, le compresseur est placé plus haut que l'évaporateur. Dans ce cas, la pente seule ne suffit plus : au ralenti, le gaz n'a pas toujours assez de vitesse pour porter l'huile vers le haut.",
       "titre": "L'évaporateur"
      },
      {
       "type": "point",
       "html": "On pose alors un <b>siphon</b> en pied de cette colonne montante. C'est un petit coude en U qui retient un peu d'huile le temps qu'elle s'accumule. Puis il la relance d'un coup vers le haut, dès que le gaz reprend de la vitesse.",
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
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Conduite mal posée = huile piégée",
       "html": "<p>Une conduite d'aspiration posée à plat, en contre-pente, ou une colonne montante sans <b>siphon</b> : l'huile ne circule plus, elle reste bloquée dans les points bas. Le compresseur tourne alors avec de moins en moins d'huile, jusqu'au <b>grippage</b> : les pièces internes, plus assez lubrifiées, se bloquent et le compresseur casse. C'est exactement ce que contrôle le code <b>8.05</b> : vérifier que les conduites de liquide et d'aspiration sont dans la bonne position, avec la <b>pente</b> et le <b>siphon</b> là où il faut.</p>",
       "titre": "L'évaporateur"
      }
     ],
     "questions": [
      {
       "id": "pk-q-8.05",
       "dc": "G8",
       "code": "8.05",
       "niveau": 1,
       "type": "qcm",
       "enonce": "La conduite d'aspiration relie l'évaporateur au compresseur. Pourquoi la pose-t-on en légère pente vers le compresseur ?",
       "choix": [
        "Pour que l'huile transportée par la vapeur revienne vers le compresseur au lieu de stagner",
        "Pour réduire la surchauffe du gaz aspiré avant son arrivée au compresseur",
        "Pour empêcher le givre de se former sur toute la longueur de la ligne",
        "Pour diminuer la vitesse du gaz et limiter le bruit dans la conduite"
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
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/bib-tp-02-les-composants-frigorifiques-79eb4616.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Le circuit evaporateur",
         "chemin": "illustrations/le-circuit_evaporateur.svg"
        }
       ],
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
        "Température de refoulement moins température d'aspiration du compresseur",
        "Température gaz aspiration - Température d'évaporation (T°O correspondant à la BP)",
        "Température de condensation moins température d'évaporation",
        "Température ambiante moins température d'évaporation"
       ],
       "bonne": 1,
       "explication": "La SURCHAUFFE = Température du gaz en aspiration - Température d'évaporation (T°O). On mesure la température du gaz avec une sonde, et on convertit la pression BP en température avec le tableau…",
       "aide": "La surchauffe compare la température réelle du gaz à sa température de saturation.",
       "remed": {
        "texte": "La SURCHAUFFE = Température du gaz en aspiration - Température d'évaporation (T°O). On mesure la température du gaz avec une sonde, et on convertit la pression BP en température avec le tableau fluide. Une surchauffe de 5 à 10°C est normale."
       },
       "remediation_vers": "g8",
       "code": "8.08",
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/bib-pose-et-d-pose-docoune-paire-de-manom-tr-315a0433.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "La surchauffe calcul",
         "chemin": "illustrations/la-surchauffe_calcul.svg"
        },
        {
         "type": "image",
         "libelle": "Mesure surchauffe",
         "chemin": "illustrations/mesure-surchauffe.svg"
        }
       ],
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
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/sup-cours-8-08-5E5BFD27.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Mesure surchauffe",
         "chemin": "illustrations/mesure-surchauffe.svg"
        }
       ],
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
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/sup-cours-8-01-B321BDBC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Evaporateur interactif",
         "chemin": "evaporateur-interactif/index.html"
        }
       ],
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
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/evaporateur-interactif/index.html?dossier=observer",
       "lancer": "❄ Lancer le cours interactif : évaporateur — installer, régler, vérifier",
       "desc": "Givre visible, débit d'air, minuterie de dégivrage qualitative, distinction entre régulateur et pressostat, inspection guidée, rapport d'état et contrôle final.",
       "titre": "Évaporateur — installer, régler, vérifier"
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
       "html": "Deux organes se règlent, pour deux raisons différentes. Le <b>régulateur de pression d'évaporation</b> — que le référentiel appelle aussi la <b>soupape de régulation</b> de la pression d'évaporation — est une soupape mécanique. Elle maintient une pression minimale dans l'évaporateur — par exemple pour empêcher un produit de geler, ou pour équilibrer plusieurs évaporateurs sur un seul compresseur. Sa mise en service et son réglage suivent <b>toujours la fiche constructeur</b>.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Cet organe se monte <b>en sortie d'évaporateur</b>, sur le départ de la ligne d'aspiration. Sur le terrain, on l'appelle couramment un <b>KVP</b> — c'est une référence commerciale, pas le nom de la fonction. Son intérêt se comprend mieux sur un cas concret : plusieurs chambres à des températures différentes, un seul compresseur.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Sans lui, toutes les chambres descendraient à la pression de la plus froide. Avec lui, chaque évaporateur garde la pression — donc la température — que son produit demande.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Un troisième régulateur existe, et il ne faut pas le confondre avec celui-ci : le <b>régulateur de pression de carter</b>, couramment appelé <b>KVL</b>. Il se monte sur la ligne d'aspiration, juste <b>avant le compresseur</b>. Il ne protège ni le produit ni l'évaporateur : il protège le <b>moteur du compresseur</b>, en limitant la pression d'aspiration.",
       "titre": "Évaporateur — installer, régler, vérifier"
      },
      {
       "type": "point",
       "html": "Le cas typique est le <b>redémarrage après un arrêt long</b> : la pression est alors remontée dans tout le circuit, et sans lui le compresseur devrait avaler d'un coup beaucoup trop de vapeur. Trois régulateurs, trois endroits, trois raisons — et aucun des trois ne coupe quoi que ce soit.",
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
       "html": "<b>Pressostat</b> (interrupteur de sécurité) → protège la <b>machine</b> : il coupe le compresseur.<br><b>Régulateur de pression d'évaporation</b> (« KVP »), en sortie d'évaporateur → protège le <b>produit</b>, ou l'équilibre entre évaporateurs : il ne coupe rien, il maintient une pression.<br><b>Régulateur de pression de carter</b> (« KVL »), avant le compresseur → protège le <b>moteur du compresseur</b> : il limite la pression d'aspiration.<br>Un seul des trois coupe le courant, et c'est le pressostat. Dans tous les cas, la valeur de réglage vient de la <b>fiche constructeur</b>, jamais de l'estime.",
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
        "Seulement le tube de l'évaporateur, pas les accessoires posés",
        "Seulement les raccords visibles depuis l'extérieur du meuble",
        "Seulement les organes électriques de commande et de sécurité"
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
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/bib-s6-act-6-pressostats-1e645f81.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Evaporateur interactif",
         "chemin": "evaporateur-interactif/index.html"
        }
       ],
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
        "Il déclenche immédiatement un cycle de dégivrage complet",
        "Il augmente la vitesse des ventilateurs de la batterie",
        "Il coupe l'alimentation électrique du compresseur",
        "Il ouvre en grand le régulateur de pression d'évaporation"
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
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/sup-cours-8-04-B321BDBC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Regulateurs pression",
         "chemin": "illustrations/regulateurs-pression.svg"
        }
       ],
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
        "Le niveau d'huile du compresseur de la centrale",
        "L'étanchéité, l'isolation et l'écoulement des condensats",
        "La pression d'aspiration relevée pendant tout le dégivrage",
        "Le débit d'air du ventilateur de l'évaporateur"
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
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/bib-14899-bac-pro-tfca-epreuve-u11-dossier-r-10f91ed0.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Evaporateur interactif",
         "chemin": "evaporateur-interactif/index.html"
        },
        {
         "type": "image",
         "libelle": "inerweb habilitation contenus illustrations givre degivrage svg.svg",
         "chemin": "illustrations/givre-degivrage.svg"
        }
       ],
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
        "En copiant le réglage du pressostat basse pression",
        "Il n'y a rien à régler, l'organe fonctionne seul",
        "En fixant une valeur basse par simple sécurité",
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
       "chapitre": "08",
       "chapitre_titre": "Composant : évaporateurs à air et à liquide",
       "chapitre_fichier": "CONTENU-08-G8-evaporateurs.md",
       "illustration": "illustrations/bib-dscn6650-e8f63388.jpg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Regulateurs pression",
         "chemin": "illustrations/regulateurs-pression.svg"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Fiche dense : sept codes. Ne pas tout dérouler d'une traite — s'appuyer sur les trois blocs pour rythmer la séance. Faire identifier sur une machine réelle (ou des photos) le régulateur de pression d'évaporation ET le pressostat BP, et faire dire à voix haute ce que chacun protège : c'est la confusion la plus fréquente du groupe G8. Rappeler systématiquement azote seul + consignation électrique avant toute manipulation. Pour 8.10, faire rédiger un vrai rapport d'état à partir d'une photo (bac encrassé, conduit abîmé) plutôt que de décrire la méthode dans l'abstrait. Relier 8.11 à la surchauffe déjà vue en G8 : ce n'est pas une nouvelle notion, c'est le même réglage regardé sous l'angle énergie. ⚠️ À FAIRE VALIDER (27/07) : les désignations « KVP » et « KVL », le cas d'usage du KVP (plusieurs chambres à températures différentes sur un compresseur) et celui du KVL (redémarrage après arrêt long). Écrit de mémoire technique, pas relevé sur une documentation constructeur. Le KVL n'a volontairement AUCUN code rattaché : les codes 8.02 et 8.07 portent sur la pression d'évaporation, pas sur la pression de carter — on ne force pas un rattachement pour faire nombre."
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=x2",
       "lancer": "🎧 Écouter la capsule : Exercice — la machine ne fait plus de froid",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 5 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "Exercice — la machine ne fait plus de froid"
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
     "minutes": 25,
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
       "type": "experience",
       "url": "packs/fluides/res/circuit-organe-par-organe/index.html",
       "lancer": "🔧 Lancer le cours interactif : le circuit, organe par organe",
       "desc": "La croix du frigoriste, chaque organe en fiche animée (piston, scroll et vis compris), les serpentins du condenseur et de l'évaporateur, la régulation du détendeur, l'exercice « suivez le fluide », la bibliothèque des 10 organes et un défi final de 10 questions.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/tome-3-technologie-organes/index.html?dossier=detendeur-thermostatique",
       "lancer": "📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe",
       "desc": "le détendeur à égalisation interne et externe, le détendeur électronique et le tube capillaire, chacun en vue isolée avec son symbole.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/detendeur-interactif/index.html",
       "lancer": "🎯 Lancer le cours interactif : le détendeur thermostatique en détail",
       "desc": "14 écrans : la croix du frigoriste, le train thermostatique pièce par pièce, le calcul de la surchauffe, le jeu des trois forces sur la membrane, la pose du bulbe, l'égalisation interne et externe, le choix de la buse — et le réglage, qui ne vient qu'après le diagnostic.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/electrovanne-interactive/index.html",
       "lancer": "⚡ Lancer le cours interactif : l'électrovanne de ligne liquide",
       "desc": "14 écrans : pourquoi on coupe le liquide avant d'arrêter le compresseur, la commande tout ou rien, la coupe animée hors tension puis alimentée, l'action directe et la commande assistée, NF et NO, la dépose de la bobine en sécurité et le diagnostic.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/filtre-deshydrateur-pedagogique/index.html",
       "lancer": "🧱 Lancer le cours interactif : le filtre déshydrateur",
       "desc": "15 écrans : reconnaître le vrai composant, vissé ou brasé, deux fonctions et deux barrières, noyau solide ou billes libres, l'eau fixée au dessiccant, le média qui sature, le porte-cartouche, la double flèche des modèles biflow et le burn-out qui rend l'huile acide.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/voyant-liquide-pedagogique/index.html",
       "lancer": "👁 Lancer le cours interactif : le voyant liquide",
       "desc": "18 écrans : les deux voyants, la fenêtre qui montre un état local, les bulles après le filtre, la pastille d'humidité et sa légende, observer puis mesurer, et les quatre causes de bulles — sous-refroidissement, chute de pression, filtre colmaté, quantité insuffisante.",
       "titre": "Le détendeur et les organes annexes"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/detendeur-regulation.svg",
       "alt": "Animation en boucle : la charge thermique augmente, la surchauffe monte, le bulbe se réchauffe et pousse la membrane, le détendeur ouvre, l'évaporateur reçoit plus de fluide, la surchauffe redescend — la boucle qui se corrige toute seule.",
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
       "id": "pk-q-9.02",
       "dc": "G9",
       "code": "9.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Une vanne doit toujours être montée dans le sens de la flèche gravée sur son corps, comme un filtre déshydrateur. Que risque-t-on si on la monte à l'envers ?",
       "choix": [
        "Une erreur de montage irréversible, qu'on ne peut corriger qu'en découpant l'installation",
        "Une simple baisse de rendement, que l'on rattrape en réglant le détendeur un peu plus ouvert",
        "Un dérèglement du bulbe du détendeur thermostatique, à recalibrer après coup",
        "Rien : il suffit de la déposer et de la remonter dans le bon sens"
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
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/bib-froid-commercial-et-chambres-froides-ab36b003.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Vanne service interactive",
         "chemin": "vanne-service-interactive/index.html"
        }
       ],
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
        "Le voyant de ligne liquide",
        "Le filtre déshydrateur",
        "Le pressostat différentiel",
        "L'accumulateur d'aspiration"
       ],
       "bonne": 1,
       "explication": "Le FILTRE DÉSHYDRATEUR contient des tamis moléculaires qui absorbent l'humidité présente dans le circuit. Il protège le détendeur et le compresseur du givrage et de la corrosion.",
       "aide": "L'humidité est l'ennemi du froid. Cet accessoire la piège.",
       "remed": {
        "texte": "Le FILTRE DÉSHYDRATEUR contient des tamis moléculaires qui absorbent l'humidité présente dans le circuit. Il protège le détendeur et le compresseur du givrage et de la corrosion."
       },
       "remediation_vers": "g9",
       "code": "9.08",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/sup-cours-9-08-21D269D2.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Detendeurs ligne",
         "chemin": "illustrations/detendeurs-ligne.svg"
        }
       ],
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
        "Peu importe le sens de montage : le filtre agit dans les deux directions",
        "Dans le sens de circulation du fluide (indiqué par une flèche)",
        "Toujours à la verticale, cartouche vers le bas pour piéger l'humidité",
        "Toujours à l'horizontale, pour éviter le tassement du tamis"
       ],
       "bonne": 1,
       "explication": "Le filtre déshydrateur doit TOUJOURS être monté dans le SENS DE CIRCULATION du fluide, indiqué par une flèche sur le corps du filtre.",
       "aide": "Les filtres déshydrateurs ont un sens de montage obligatoire.",
       "remed": {
        "texte": "Le filtre déshydrateur doit TOUJOURS être monté dans le SENS DE CIRCULATION du fluide, indiqué par une flèche sur le corps du filtre. Un montage à l'envers peut bloquer le circuit ou endommager le filtre."
       },
       "remediation_vers": "g9",
       "code": "9.08",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/bib-froid-commercial-et-chambres-froides-ab36b003.jpeg",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Detendeurs ligne",
         "chemin": "illustrations/detendeurs-ligne.svg"
        }
       ],
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
        "La pression de condensation de l'installation",
        "La surchauffe à la sortie de l'évaporateur",
        "Le sous-refroidissement en sortie de condenseur",
        "La pression d'huile dans le compresseur"
       ],
       "bonne": 1,
       "explication": "La surchauffe — Le TEV régule la surchauffe en ajustant le débit de fluide entrant dans l'évaporateur via un bulbe capillaire.",
       "aide": "Le bulbe du TEV mesure la température en sortie d'évaporateur.",
       "remed": {
        "texte": "Le TEV régule la surchauffe en ajustant le débit de fluide entrant dans l'évaporateur via un bulbe capillaire."
       },
       "remediation_vers": "g9",
       "code": "9.01",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/enu-bibliotheque-symboles-svg-frigo-schema-detendeur-thermo-ext-sans-reperes-svg.svg",
       "ressources": [
        {
         "type": "page",
         "libelle": "Detendeur interactif",
         "chemin": "detendeur-interactif/index.html"
        },
        {
         "type": "image",
         "libelle": "Detendeur regulation",
         "chemin": "illustrations/detendeur-regulation.svg"
        }
       ],
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
     "minutes": 25,
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
       "type": "experience",
       "url": "packs/fluides/res/regulateurs-kv-pedagogiques/index.html",
       "lancer": "🧊 Lancer le cours interactif : la famille des régulateurs KV — KVP, KVL, KVR",
       "desc": "8 écrans : à quoi sert chaque vanne (KVP tient l'évaporation, KVL protège le compresseur, KVR tient la HP), la reconnaître sur le terrain, la placer au bon endroit du circuit, comprendre le clapet qui traduit la pression en mouvement, régler au manomètre et jamais à l'aveugle, distinguer un symptôme d'un diagnostic — vue 3D du produit et questions d'entraînement, environ 15 minutes.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/pupitre-reglage-interactif/index.html",
       "lancer": "🎚️ S'entraîner au pupitre : consigne, différentiel, preuve",
       "desc": "Deux pupitres manipulables (thermostat de chambre froide, pressostat basse pression) : réglez la consigne et le différentiel, lisez les points d'action en direct, serrez trop le différentiel et voyez l'alerte de courts-cycles — puis un contrôle corrigé. Valeurs d'exercice : la notice fait foi.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/tome-3-technologie-organes/index.html?dossier=regulateurs-securite",
       "lancer": "📘 Lancer le cours interactif : Tome 3 — la technologie de l'organe",
       "desc": "Les organes annexes un par un : réservoir, filtre déshydrateur, voyant, électrovanne, clapet et vannes de service, bouteille anti-coup de liquide, séparateur d'huile, régulateurs de pression et soupape — chacun en vue isolée, avec son symbole normalisé.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/vanne-service-interactive/index.html?ecran=geste",
       "lancer": "🔩 Lancer le cours interactif : la vanne de service et la prise du pressostat",
       "desc": "Pourquoi le pressostat se raccorde sur P1 et non sur la voie de service : cette prise reste reliée au compresseur dans toutes les positions de la vanne — donc sous pression, bouchon jamais défait sur une installation chargée.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/bouteille-liquide-pedagogique/index.html",
       "lancer": "🫙 Lancer le cours interactif : la bouteille liquide",
       "desc": "14 écrans : reconnaître le réservoir, sa place après le condenseur, le tube plongeur, entrée et départ liquide, la vanne de départ qui n'est pas un détendeur, rassembler la charge côté condenseur, verticale ou horizontale, et la protection DESP.",
       "titre": "Régler et contrôler les organes annexes"
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
       "html": "La <b>soupape de régulation de pression</b> ne coupe rien : elle <b>module en continu</b> pour maintenir une pression stable à un point du circuit. Le <b>limiteur de pression</b> est différent : c'est une sécurité. Mécanique, il est réglé par un ressort. Électronique, il utilise un capteur relié à un module.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "point",
       "html": "Dans les deux cas, il <b>coupe le circuit</b> — le plus souvent le compresseur — dès qu'un seuil de pression est franchi, en haute comme en basse pression. Une régulation qui module, une sécurité qui coupe : deux logiques, deux réglages.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "point",
       "html": "Le <b>séparateur d'huile</b> se place juste après le compresseur (à droite), avant le condenseur (en haut). C'est là que passe en premier la vapeur chaude chargée d'huile. Il retient cette huile puis la renvoie au carter du compresseur, automatiquement, dès que le niveau monte.",
       "titre": "Régler et contrôler les organes annexes"
      },
      {
       "type": "point",
       "html": "<b>Vérifier son fonctionnement</b>, c'est contrôler que ce retour se fait bien : une huile qui s'accumule plus loin dans le circuit réduit l'échange de chaleur, et finit par manquer au compresseur.",
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
        "Avec une sonde de température reliée à un régulateur numérique déporté",
        "Avec un capteur de pression relié à un module électronique de commande",
        "Avec une résistance électrique chauffante placée dans l'ambiance",
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
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/contenu-bibliotheque-symboles-svg-capteurs-froid-thermostat-nf-sans-reperes-svg.svg",
       "ressources": [
        {
         "type": "symbole",
         "libelle": "Thermostat froid",
         "chemin": "illustrations/thermostat_froid.svg"
        }
       ],
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
        "Que l'huile reste bien bloquée dans le séparateur pendant toute la marche du groupe",
        "Que l'huile retenue retourne bien, automatiquement, au carter du compresseur",
        "Que le condenseur reçoit bien un mélange homogène d'huile et de fluide",
        "Que la pression d'aspiration reste parfaitement constante en marche"
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
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "illustration": "illustrations/photo-separateur-huile-alco.jpeg",
       "ressources": [
        {
         "type": "symbole",
         "libelle": "Separateur huile",
         "chemin": "illustrations/separateur_huile.svg"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      },
      {
       "id": "pk-g9b-5",
       "dc": "G9",
       "code": "9.05",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Sur quelle pression le KVL agit-il ?",
       "choix": [
        "La pression d'évaporation, en sortie d'évaporateur",
        "La pression d'aspiration, à l'entrée du compresseur",
        "La pression de condensation, en sortie de condenseur",
        "La pression de la ligne liquide, avant le détendeur"
       ],
       "bonne": 1,
       "aide": "KVL : régulateur de pression de carter. Il est monté juste avant le compresseur.",
       "remed": {
        "regle": "Le KVL agit sur la pression d'aspiration, à l'entrée du compresseur. Il la limite pour protéger le moteur.",
        "pourquoi": "Une pression d'aspiration trop élevée fait absorber au compresseur une intensité excessive, surtout au redémarrage après un arrêt long ou un dégivrage.",
        "piege": "Le confondre avec le KVP, qui agit à l'autre bout du circuit, en sortie d'évaporateur."
       },
       "remediation_vers": "g9b",
       "explication": "Le KVL agit sur la pression d'aspiration, à l'entrée du compresseur. Il la limite pour protéger le moteur.",
       "origine": "pack",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "categories": [
        "A1",
        "A2"
       ]
      },
      {
       "id": "pk-g9b-6",
       "dc": "G9",
       "code": "9.05",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Sur quelle pression le KVP agit-il ?",
       "choix": [
        "La pression d'évaporation, en sortie d'évaporateur",
        "La pression d'aspiration, à l'entrée du compresseur",
        "La pression de condensation, en sortie de condenseur",
        "La pression de la ligne liquide, avant le détendeur"
       ],
       "bonne": 0,
       "aide": "KVP : régulateur de pression d'évaporation. Son nom porte la réponse.",
       "remed": {
        "regle": "Le KVP agit sur la pression d'évaporation, en sortie d'évaporateur. Il la maintient au-dessus d'un minimum.",
        "pourquoi": "La pression d'évaporation fixe la température d'évaporation : la tenir évite de trop refroidir le produit et permet à plusieurs chambres de partager un même compresseur.",
        "piege": "Le confondre avec le KVL, qui agit à l'autre bout du circuit, à l'entrée du compresseur."
       },
       "remediation_vers": "g9b",
       "explication": "Le KVP agit sur la pression d'évaporation, en sortie d'évaporateur. Il la maintient au-dessus d'un minimum.",
       "origine": "pack",
       "chapitre": "09",
       "chapitre_titre": "Composant : détendeurs et autres organes",
       "chapitre_fichier": "CONTENU-09-G9-detendeurs.md",
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Faire manipuler un pressostat démonté (ou les simulateurs KP1/KP5) pour que les stagiaires distinguent au toucher le limiteur, qui coupe, de la soupape de régulation, qui module en continu : c'est la confusion la plus fréquente à l'oral. Sur le séparateur d'huile, montrer un appareil réel en fonctionnement si possible — le retour d'huile par flotteur reste abstrait sur le seul schéma. Relier le rapport écrit (9.09) à la finalité du métier : ce n'est pas de la paperasse, c'est ce qui évite la fuite non détectée. Ce module referme le groupe G9 : le relier à G6 (mêmes sécurités électriques côté compresseur) et à G4 (étanchéité)."
    }
   ]
  },
  {
   "n": 4,
   "libelle": null,
   "titre": "Le détendeur, le brasage, et le choix d'un fluide",
   "intention": "Le geste de tuyauterie occupe la journée : un joint brasé étanche, sous balayage d'azote, ne s'obtient pas du premier coup. La fin de journée prend de la hauteur — quel fluide choisir demain, et pourquoi.",
   "sequences": [
    {
     "type": "cours",
     "fiche": "s3",
     "titre": "La flamme interdite — décomposition du fluide",
     "minutes": 20,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "La flamme interdite — décomposition du fluide",
       "dc": "Sécurité · codes 11.03",
       "competences": [
        {
         "code": "11.03",
         "lib": "Connaître les règles de sécurité des fluides inflammables, toxiques ou à pression plus élevée.",
         "officiel": "Connaître les réglementations et les normes de sécurité applicables pour l'utilisation, le stockage et le transport des réfrigérants inflammables ou toxiques ou des réfrigérants nécessitant une pression de fonctionnement plus élevée. Comprendre les conditions spécifiques liées au site dans lesquelles il est permis d'utiliser des équipements ne satisfaisant pas aux exigences énoncées à l'annexe IV du règlement (UE) 2024/573 en raison d'impératifs de sécurité",
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=s3",
       "lancer": "🎧 Écouter la capsule : La flamme interdite — décomposition du fluide",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 6 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "La flamme interdite — décomposition du fluide"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/secu-flamme.svg",
       "alt": "À gauche le geste interdit : chauffer un tronçon non récupéré, les gaz toxiques remontent vers le visage penché. À droite le geste juste : récupérer, balayer à l'azote, ventiler.",
       "titre": "La flamme interdite — décomposition du fluide"
      },
      {
       "type": "point",
       "html": "Un fluide frigorigène fluoré est stable à température normale. Il ne l'est plus face à une flamme. Chauffé au contact d'une flamme ou d'une surface très chaude, il ne brûle pas comme un carburant : il se <b>décompose</b>. Sa molécule se casse et forme d'autres substances, absentes du fluide d'origine — des gaz toxiques et corrosifs.",
       "titre": "La flamme interdite — décomposition du fluide"
      },
      {
       "type": "point",
       "html": "Certains fluides ajoutent un second risque. Selon la norme NF EN 378, les fluides classés <b>A2L</b> (légèrement inflammables, comme le R-32 ou le R-1234yf) ou <b>A3</b> (très inflammables, comme le R-290 ou le R-600a) peuvent eux-mêmes s'enflammer au contact d'une flamme ou d'une étincelle. La classe du fluide utilisé se lit sur sa FDS (fiche de données de sécurité).",
       "titre": "La flamme interdite — décomposition du fluide"
      },
      {
       "type": "point",
       "html": "Le cas type : un tronçon où il reste « une petite quantité, ça ne changera rien ». La flamme touche ce fluide résiduel, il se décompose, et les fumées se dégagent juste sous le visage penché sur le brasage.",
       "titre": "La flamme interdite — décomposition du fluide"
      },
      {
       "type": "point",
       "html": "<b>Et si des fumées de décomposition sont déjà présentes</b> — une fuite qui a rencontré une source chaude avant votre arrivée, par exemple ? La réponse n'est plus la procédure de brasage, c'est l'éloignement. Un masque à cartouche ou un simple masque filtrant ne protège <b>ni</b> des gaz de décomposition <b>ni</b> d'un manque d'oxygène : seul un <b>appareil respiratoire isolant</b> (ARI), avec sa propre réserve d'air, le permet — et son usage est réservé à des personnes formées. Retenez la règle : l'ARI protège l'intervenant formé, il ne remplace jamais l'éloignement de la source ni l'évacuation de la zone.",
       "titre": "La flamme interdite — décomposition du fluide"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qu'il faut retenir",
       "html": "<ol><li><b>Récupérez</b> entièrement le fluide du tronçon à chauffer avant toute opération de brasage : jamais de brasage sur un circuit encore chargé.</li><li>Ne recherchez <b>jamais une fuite avec une flamme</b> : utilisez un détecteur électronique.</li><li>Faites circuler de l'azote à l'intérieur du tube pendant le brasage, avec un mano-détendeur, pour en chasser l'air et les résidus : c'est le <b>balayage</b>.</li><li><b>Ventilez</b> la zone de travail, et ne restez pas penché directement au-dessus de la flamme.</li><li>Des fumées déjà présentes : <b>éloignement d'abord</b>, ARI réservé à une personne formée.</li></ol>",
       "titre": "La flamme interdite — décomposition du fluide"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le geste interdit",
       "html": "<p>Chauffer ou braser un tronçon de circuit sans avoir récupéré et vérifié l'absence de fluide, ou rechercher une fuite avec une flamme.</p><p>Conséquence : dégagement de gaz toxiques et corrosifs, inhalés à bout portant. Risque d'incendie en plus, si le fluide est inflammable (classe A2L ou A3).</p><p>Interdit aussi : entrer dans des fumées déjà présentes sans protection respiratoire isolante, ou croire qu'un masque à cartouche suffit.</p>",
       "titre": "La flamme interdite — décomposition du fluide"
      }
     ],
     "questions": [
      {
       "id": "pk-cl3-1",
       "dc": "G11",
       "code": "11.03",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Une fuite de CO₂ (R-744) s'est produite dans un local technique. Où le gaz s'accumule-t-il ?",
       "choix": [
        "Près du plafond, car les gaz montent toujours vers le haut",
        "Dans les points bas : fosse, cave, sous-sol, bas de local, car il est plus lourd que l'air",
        "Il se répartit uniformément, et sans danger particulier, dans tout le volume du local technique",
        "Il s'échappe seul par les interstices, sans jamais s'accumuler nulle part"
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
       "chapitre": "11",
       "chapitre_titre": "Technologies de substitution et efficacité énergétique",
       "chapitre_fichier": "CONTENU-11-G11-substitution-efficacite.md",
       "illustration": "illustrations/sup-cours-11-03-B88D83FC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
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
       "chapitre": "11",
       "chapitre_titre": "Technologies de substitution et efficacité énergétique",
       "chapitre_fichier": "CONTENU-11-G11-substitution-efficacite.md",
       "illustration": "illustrations/sup-cours-11-03-DAF5A7C7.png",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
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
       "chapitre": "11",
       "chapitre_titre": "Technologies de substitution et efficacité énergétique",
       "chapitre_fichier": "CONTENU-11-G11-substitution-efficacite.md",
       "illustration": "illustrations/sup-cours-11-03-B88D83FC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Montrez, sans l'allumer, un chalumeau et un poste de brasage avec son mano-détendeur d'azote ; faites nommer le balayage et sa fonction. Racontez le cas du brasage sur un tronçon mal purgé, pour ancrer le lien entre flamme et décomposition. Rappelez l'interdiction absolue de rechercher une fuite à la flamme (méthode ancienne, aujourd'hui interdite). Reliez à la classe NF EN 378 du fluide utilisé en atelier, lisible sur sa FDS, pour rappeler que certains fluides s'enflamment eux-mêmes en plus de se décomposer."
    },
    {
     "type": "plateau",
     "fiche": null,
     "titre": "Réglage du détendeur sur machine en marche : agir sur la surchauffe et vérifier l'effet, mise en route et arrêt dans l'ordre du constructeur",
     "minutes": 50,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "Réglage du détendeur sur machine en marche : agir sur la surchauffe et vérifier l'effet, mise en route et arrêt dans l'ordre du constructeur",
       "minutes": 50
      }
     ]
    },
    {
     "type": "cours",
     "fiche": "g10",
     "titre": "Tuyauterie et brasage sous azote",
     "minutes": 30,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g10",
       "lancer": "🎧 Écouter la capsule : Tuyauterie et brasage sous azote",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 5 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "Tuyauterie et brasage sous azote"
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
        "Pour refroidir le tube plus vite",
        "Pour éviter l'oxydation interne",
        "Pour tester l'étanchéité du joint",
        "Pour nettoyer l'intérieur du circuit"
       ],
       "bonne": 1,
       "explication": "Retenez la notion-clé demandée et la formulation exacte. ⚠ se faire piéger par une proposition trop absolue ('toujours', 'jamais').",
       "aide": "Indice : relisez le mot-clé central de la question et éliminez les propositions trop générales ou absolues.",
       "remediation_vers": "g10",
       "code": "10.01",
       "chapitre": "10",
       "chapitre_titre": "Tuyauterie : monter un réseau étanche (soudage / brasage)",
       "chapitre_fichier": "CONTENU-10-G10-tuyauterie-brasage.md",
       "illustration": "illustrations/bib-tp-balance-et-bouteille-2d63103c.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Balayage azote",
         "chemin": "illustrations/balayage-azote.svg"
        }
       ],
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
        "Pour refroidir le tube plus vite après le brasage",
        "Pour éviter l'oxydation intérieure du cuivre (calamine)",
        "Pour tester l'étanchéité du joint pendant le brasage",
        "Pour sécher l'intérieur du circuit avant la mise en charge"
       ],
       "bonne": 1,
       "explication": "Éviter l'oxydation intérieure — Sans azote, l'oxygène de l'air réagit avec le cuivre chauffé et forme de la calamine noire qui bouchera les filtres et endommagera le compresseur.",
       "aide": "La calamine est l'ennemi n°1 du circuit après un brasage.",
       "remed": {
        "texte": "Sans azote, l'oxygène de l'air réagit avec le cuivre chauffé et forme de la calamine noire qui bouchera les filtres et endommagera le compresseur."
       },
       "remediation_vers": "g10",
       "code": "10.01",
       "chapitre": "10",
       "chapitre_titre": "Tuyauterie : monter un réseau étanche (soudage / brasage)",
       "chapitre_fichier": "CONTENU-10-G10-tuyauterie-brasage.md",
       "illustration": "illustrations/bib-tp-balance-et-bouteille-2d63103c.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Balayage azote",
         "chemin": "illustrations/balayage-azote.svg"
        }
       ],
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
       "chapitre": "10",
       "chapitre_titre": "Tuyauterie : monter un réseau étanche (soudage / brasage)",
       "chapitre_fichier": "CONTENU-10-G10-tuyauterie-brasage.md",
       "illustration": "illustrations/bib-cordons-de-soudure-avec-metal-dapport-li-2edd0521.png",
       "pose_niveau": "exact",
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Faire monter le balayage azote — bouteille, détendeur, tuyau, position de sortie — AVANT toute mise en flamme. Le geste doit être automatique avant d'allumer le chalumeau. Pédagogie de la découverte : faire observer un joint mal brasé (calamine, porosité) et laisser les stagiaires identifier les défauts avant de donner la méthode correcte."
    },
    {
     "type": "cours",
     "fiche": "p4",
     "titre": "La bouteille d'azote et son mano-détendeur",
     "minutes": 20,
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=p4",
       "lancer": "🎧 Écouter la capsule : La bouteille d'azote et son mano-détendeur",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 5 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "La bouteille d'azote et son mano-détendeur"
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
       "html": "<ol><li>Vérifier que le raccord est <b>propre</b>, sans trace d'huile ni de graisse : l'azote sous pression au contact d'huile est un risque.</li><li>Monter le mano-détendeur sur le robinet de la bouteille. Vérifier que la <b>vis de réglage est desserrée</b> — aucune pression envoyée en sortie.</li><li>Ouvrir <b>lentement</b> le robinet de la bouteille. Lire la pression bouteille sur le premier cadran.</li><li>Raccorder le flexible de sortie au manifold, puis au circuit à éprouver.</li></ol>",
       "titre": "La bouteille d'azote et son mano-détendeur"
      },
      {
       "type": "point",
       "html": "<ol start=\"5\"><li>Visser <b>progressivement</b> la vis de réglage. La pression de sortie monte, à lire sur le second cadran, jusqu'à la valeur donnée par la documentation du constructeur ou la norme applicable.</li><li>Une fois la pression atteinte, fermer le robinet de la bouteille. Observer : le cadran de sortie ne doit plus bouger.</li></ol>",
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
        "De l'oxygène pur",
        "De l'azote sec",
        "De l'air comprimé",
        "Du fluide du circuit"
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
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/sup-cours-3-01-70D0D9E9.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Epreuve azote",
         "chemin": "illustrations/epreuve-azote.svg"
        }
       ],
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
        "Pour connaître à tout moment la quantité d'azote restant dans la bouteille",
        "Pour filtrer l'humidité que pourrait contenir le gaz de la bouteille d'azote",
        "Parce que la pression de la bouteille dépasse ce que le circuit supporte",
        "Pour réchauffer le gaz avant son entrée dans le circuit"
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
       "chapitre": "03",
       "chapitre_titre": "Contrôles avant mise en service, après réparation ou en fonctionnement",
       "chapitre_fichier": "CONTENU-03-G3-controles-mes.md",
       "illustration": "illustrations/sup-poste-de-travail-avec-bouteille-d-azote-BA7A4A4D.webp",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Tirage au vide mano vs vacuometre",
         "chemin": "illustrations/tirage-au-vide_mano-vs-vacuometre.svg"
        },
        {
         "type": "image",
         "libelle": "inerweb habilitation contenus illustrations epreuve azote svg.svg",
         "chemin": "illustrations/epreuve-azote.svg"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Poser le mano-détendeur démonté sur la table et faire deviner son rôle avant d'expliquer : pourquoi deux cadrans, pourquoi une vis. Faire monter le montage par un stagiaire, azote réel si le plateau le permet, en insistant sur la vis desserrée AVANT ouverture bouteille — intervenir immédiatement si quelqu'un ouvre la bouteille vis serrée, ne pas laisser aller au bout du geste. Rappeler que ces codes ne concernent pas la catégorie D : un stagiaire D observe la démonstration mais n'est pas interrogé dessus."
    },
    {
     "type": "plateau",
     "fiche": null,
     "titre": "Brasage sous balayage d'azote : réaliser un joint étanche, le contrôler",
     "minutes": 190,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "Brasage sous balayage d'azote : réaliser un joint étanche, le contrôler",
       "minutes": 190
      }
     ]
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
       "type": "experience",
       "url": "packs/fluides/res/bilan-thermique-performance-interactif/index.html",
       "lancer": "📐 Lancer le cours interactif : Tome 4 — bilan thermique et performance",
       "desc": "Du besoin thermique à la consommation électrique : parois, produits, air, puis COP, EER, SCOP, SEER et la lecture de la vraie étiquette européenne. Le bilan thermique lui-même dépasse le programme A1 — mais sans lui, « améliorer l efficacité énergétique » reste une formule.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/classes-securite.svg",
       "alt": "Matrice complète des classes NF EN 378 : huit cases, toxicité en lignes, inflammabilité en colonnes.",
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
       "type": "point",
       "html": "Pour réduire la charge de fluide frigorigène, on peut aussi changer la <b>conception</b> du système. Dans un système à <b>boucle secondaire</b>, le fluide frigorigène reste confiné dans la machinerie, avec une charge réduite. Un fluide caloporteur — de l'<b>eau glacée</b> ou de l'<b>eau glycolée</b> — circule ensuite dans les postes (vitrines, centrales de traitement d'air) pour transporter le froid jusqu'à eux. Le fluide frigorigène ne quitte jamais la salle des machines.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "Le système en <b>cascade</b> pousse cette logique plus loin : deux circuits frigorifiques séparés sont montés en série, chacun avec sa propre charge, réduite elle aussi. Le circuit basse température évacue sa chaleur dans le circuit haute température, qui la rejette à l'extérieur. Chaque circuit reste petit, donc plus facile à confiner en cas de fuite.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "Chaque fluide de substitution a ses <b>avantages</b> et ses <b>inconvénients</b>, selon l'application et le <b>climat</b>. Le <b>CO₂</b> est performant en froid commercial, mais son efficacité baisse quand l'air extérieur est très chaud. Les <b>hydrocarbures</b> sont efficaces, mais leur inflammabilité limite la charge autorisée.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "L'<b>ammoniac</b> est réservé aux installations industrielles, à cause de sa toxicité. Il n'y a pas de meilleur fluide dans l'absolu : le choix se fait selon l'application, le climat du site, et la documentation constructeur, à faire valider avant tout choix.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "Une machine aux <b>hydrocarbures</b> n'est pas construite comme les autres. Tous les composants électriques en contact possible avec le gaz — relais, thermostats, ventilateurs — sont <b>antidéflagrants</b> ou <b>non étincelants</b> : ils sont conçus pour ne jamais produire d'étincelle qui pourrait enflammer le gaz.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "point",
       "html": "La charge de fluide est aussi limitée dès la conception. Enfin, l'implantation prévoit une <b>ventilation</b> adaptée : le propane est plus lourd que l'air, il s'accumule donc en bas, près du sol, en cas de fuite.",
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
       "html": "<b>Le R-290 est A3</b>, pas A2L. Tout hydrocarbure est très inflammable. Se tromper de classe, c'est se tromper d'EPI, de matériel électrique et de charge admissible. À l'inverse, le <b>CO₂ est A1</b> : toxicité faible, non inflammable — mais cette classe n'annonce ni sa <b>pression</b>, ni l'<b>atmosphère irrespirable</b> qu'une fuite crée en local fermé.",
       "titre": "Substitution et efficacité énergétique"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Hydrocarbures : une machine pas comme les autres",
       "html": "<b>Antidéflagrant</b> ou <b>non étincelant</b> : sur une machine aux hydrocarbures, tout composant électrique proche du gaz doit respecter cette règle, pour ne jamais produire d'étincelle. Et comme le propane est plus lourd que l'air, il s'accumule en bas en cas de fuite — la <b>ventilation</b> du local en tient compte dès la conception.",
       "titre": "Substitution et efficacité énergétique"
      }
     ],
     "questions": [
      {
       "id": "pk-cl1-1",
       "dc": "G1",
       "code": "1.08",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Dans une classe de sécurité comme A2L, que disent respectivement la lettre et le chiffre ?",
       "choix": [
        "La lettre dit le PRP, le chiffre dit la pression de service",
        "La lettre dit la toxicité, le chiffre dit l'inflammabilité",
        "La lettre dit la famille chimique, le chiffre dit l'année d'homologation",
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
       "chapitre": "01",
       "chapitre_titre": "Législation & thermodynamique élémentaire",
       "chapitre_fichier": "CONTENU-01-G1-legislation-thermo.md",
       "illustration": "illustrations/sup-cours-1-08-47A3A800.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Classes de securite classe methode",
         "chemin": "illustrations/classes-de-securite_classe-methode.svg"
        },
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
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
       "id": "pk-cl3-1",
       "dc": "G11",
       "code": "11.03",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Une fuite de CO₂ (R-744) s'est produite dans un local technique. Où le gaz s'accumule-t-il ?",
       "choix": [
        "Près du plafond, car les gaz montent toujours vers le haut",
        "Dans les points bas : fosse, cave, sous-sol, bas de local, car il est plus lourd que l'air",
        "Il se répartit uniformément, et sans danger particulier, dans tout le volume du local technique",
        "Il s'échappe seul par les interstices, sans jamais s'accumuler nulle part"
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
       "chapitre": "11",
       "chapitre_titre": "Technologies de substitution et efficacité énergétique",
       "chapitre_fichier": "CONTENU-11-G11-substitution-efficacite.md",
       "illustration": "illustrations/sup-cours-11-03-B88D83FC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
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
       "chapitre": "11",
       "chapitre_titre": "Technologies de substitution et efficacité énergétique",
       "chapitre_fichier": "CONTENU-11-G11-substitution-efficacite.md",
       "illustration": "illustrations/sup-cours-11-05-47A3A800.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Intervention hydrocarbures interactive",
         "chemin": "intervention-hydrocarbures-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2",
        "D"
       ]
      },
      {
       "id": "q-g11-185",
       "dc": "G11",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Comment optimiser le COP (Coefficient de Performance) d'une installation frigorifique ?",
       "choix": [
        "Augmenter la haute pression jusqu'au maximum admissible par la machine",
        "Diminuer l'écart entre T°K (condensation) et T°O (évaporation)",
        "Augmenter la surchauffe jusqu'au maximum admissible à l'aspiration",
        "Diminuer le débit d'air soufflé sur la batterie du condenseur"
       ],
       "bonne": 1,
       "explication": "Le COP (efficacité énergétique) est meilleur quand l'écart T°K - T°O est FAIBLE. Pour optimiser : baisser la T°K (condenseur propre, bon refroidissement) et augmenter la T°O si possible (évaporateur…",
       "aide": "Le COP dépend directement de l'écart de température entre condenseur et évaporateur.",
       "remed": {
        "texte": "Le COP (efficacité énergétique) est meilleur quand l'écart T°K - T°O est FAIBLE. Pour optimiser : baisser la T°K (condenseur propre, bon refroidissement) et augmenter la T°O si possible (évaporateur surdimensionné, bon dégivrage). Moins le compresseur force, mieux c'est !"
       },
       "remediation_vers": "g11",
       "code": "11.02",
       "chapitre": "11",
       "chapitre_titre": "Technologies de substitution et efficacité énergétique",
       "chapitre_fichier": "CONTENU-11-G11-substitution-efficacite.md",
       "illustration": "illustrations/sup-cours-11-02-47A3A800.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Bilan thermique performance interactif",
         "chemin": "bilan-thermique-performance-interactif/index.html"
        },
        {
         "type": "image",
         "libelle": "Bilan energie",
         "chemin": "illustrations/bilan-energie.svg"
        }
       ],
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
        },
        {
         "code": "1.09",
         "lib": "Connaître les pressions élevées du CO₂, son diagramme log p/h, ses tables de saturation et le risque de glace carbonique.",
         "officiel": "Connaître la pression du CO2, le cycle transcritique ou subcritique, le diagramme log p/h, les tables de saturation du CO2, l'état d'agrégation du CO2 (formation de glace carbonique)",
         "epreuve": {},
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "13.14",
         "lib": "Vérifier avant d'intervenir que la signalisation, les issues de secours, les capteurs et les alarmes du site sont bien en état.",
         "officiel": "Vérifier que les mesures de santé et de sécurité conformes aux règles applicables sont appliquées à l'emplacement du système (par exemple, panneaux de signalisation, issues de secours, capteurs de gaz, alarmes au gaz, etc.)",
         "epreuve": {},
         "nouveau": true,
         "tirage_au_sort": false
        }
       ]
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=g13",
       "lancer": "🎧 Écouter la capsule : CO₂ et NH₃ — reconnaître, ne pas intervenir",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 6 écrans, 5 minutes. Version imprimable et mode projection compris.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "experience",
       "url": "packs/fluides/res/co2-r744/index.html",
       "lancer": "🧊 Suivre la ligne CO₂ / R744 — douze escales",
       "desc": "Au-delà de la sensibilisation : le point critique, le cycle transcritique, la haute pression optimale, la centrale booster, l'éjecteur et l'intervention en sécurité. Chaque escale dure moins de dix minutes. ⚠️ Ce parcours relève de la catégorie B : il ne donne aucun droit d'intervention de plus.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/co2-nh3-compare.svg",
       "alt": "Deux comportements inverses : le CO₂, A1 et sans odeur, est plus lourd que l'air et descend (catégorie B) ; l'ammoniac, B2L et piquant, est plus léger que l'air et monte (catégorie C).",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "Ce module <b>informe</b>, il ne qualifie pas. Une attestation A1 ou A2 ne donne <b>aucun droit d'intervention</b> sur une installation au CO₂ (catégorie B) ou à l'ammoniac (catégorie C). Ce qu'on attend ici : <b>reconnaître</b> et <b>ne pas toucher</b>.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "<b>CO₂ (R-744)</b> — classé <b>A1</b> : toxicité <b>faible</b>, non inflammable, <b>PRP = 1</b>. Cette classe n'annonce aucun de ses vrais dangers : la <b>pression</b>, très élevée, l'<b>atmosphère irrespirable</b> en local fermé (il est plus lourd que l'air, s'accumule en point bas, et agit sur la respiration — voir « CO₂ : deux dangers mortels »), et le risque de <b>neige carbonique</b> à la détente (brûlure par le froid, obstruction).",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "En transcritique, le condenseur laisse la place à un <b>refroidisseur de gaz</b>. Les cylindres, à double vanne, ne se raccordent pas au matériel courant.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "<b>Ammoniac (R-717)</b> — classé <b>B2L</b> : <b>toxique</b> et faiblement inflammable. Fluide du froid industriel (agroalimentaire, entrepôts), jamais du résidentiel. Son odeur piquante se perçoit très tôt — mais elle <b>ne remplace aucune mesure</b>, et elle s'émousse à forte concentration : on ne se fie jamais à son nez pour décider. En cas de fuite : <b>alerter, évacuer, ne jamais intervenir seul</b>.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "Sur le terrain, le CO₂ ne se manipule pas avec le matériel courant : ses pressions de travail sont bien plus élevées que celles des fluides classiques. Manifold, flexibles, vannes — tout doit être <b>dédié au CO₂</b>. Les valeurs exactes dépendent du point de fonctionnement et se lisent toujours dans la <b>documentation constructeur</b>, à faire valider.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "Le diagramme <b>log p/h</b> (pression selon l'enthalpie) et les <b>tables de saturation</b> du CO₂ se lisent comme ceux de tout autre fluide — mêmes repères de bulle et de rosée — mais dans un domaine de pression qui lui est propre. C'est ce domaine particulier qui explique un comportement que les autres fluides n'ont pas : la formation de glace carbonique.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "point",
       "html": "Avant de commencer une intervention sur un site au CO₂ ou à l'ammoniac, on prend un instant pour vérifier ce qui est déjà en place. La <b>signalisation</b> à l'entrée du local doit être visible et à jour. Les <b>issues de secours</b> doivent rester dégagées, jamais encombrées, pour permettre une évacuation rapide en cas de fuite. On contrôle aussi que les <b>capteurs</b> de gaz et les <b>alarmes</b> qui leur sont associées sont en état de marche, pas seulement présents dans le local.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "« A1 » ne veut pas dire « sans danger »",
       "html": "Le CO₂ est A1 du point de vue toxicité et inflammabilité — cela ne dit rien de ses deux vrais risques : la <b>pression</b>, et l'<b>anoxie</b> en local fermé (voir la fiche « CO₂ : deux dangers mortels »). Et le <b>B</b> de B2L signifie <b>toxique</b> : ne pas relâcher la vigilance sur l'ammoniac sous prétexte que son inflammabilité est faible.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "La règle des catégories",
       "html": "Les catégories ne se remplacent pas les unes les autres. « Je suis A1, donc je peux donner un coup de main sur une fuite d'ammoniac » est <b>faux</b> : il faut la catégorie C, sans exception.",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "La glace carbonique, un double danger",
       "html": "<p>La fiche l'a déjà signalé : le CO₂ peut se solidifier à la détente. Ce solide a un nom : c'est la <b>glace carbonique</b>, aussi appelée <b>neige carbonique</b>. Elle se forme quand le CO₂ passe directement de l'état gazeux à l'état solide, à la détente à l'air libre. C'est le domaine de pression propre au CO₂, visible sur son diagramme log p/h, qui explique ce comportement que les fluides courants n'ont pas. On garde en tête le double danger à chaque détente de CO₂ à l'air libre : la <b>brûlure par le froid</b> au contact de la peau, et le <b>bouchon solide</b> qui peut obstruer une vanne ou une tuyauterie.</p>",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Le réflexe d'arrivée sur site",
       "html": "<p>Sur un site CO₂ ou ammoniac, on ne commence jamais le travail sans ce contrôle rapide : <b>signalisation</b> en place, <b>issues de secours</b> dégagées, <b>capteurs</b> et <b>alarmes</b> fonctionnels. Ce réflexe fait partie du travail, au même titre que le port du matériel de protection.</p>",
       "titre": "CO₂ et NH₃ — reconnaître, ne pas intervenir"
      }
     ],
     "questions": [
      {
       "id": "pk-cl4-1",
       "dc": "G13",
       "code": "13.14",
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
       "chapitre": "13",
       "chapitre_titre": "CO₂ / R-744 : information et sensibilisation aux risques",
       "chapitre_fichier": "CONTENU-13-G13-co2-information-risques.md",
       "illustration": "illustrations/sup-cours-13-14-0382EBB2.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Co2 point bas",
         "chemin": "illustrations/co2-point-bas.svg"
        }
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
        "Aucun danger : la classe A1 veut dire qu'il est parfaitement inoffensif",
        "L'inflammabilité, puisqu'il peut s'enflammer comme un hydrocarbure",
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
       "origine": "pack",
       "chapitre": "13",
       "chapitre_titre": "CO₂ / R-744 : information et sensibilisation aux risques",
       "chapitre_fichier": "CONTENU-13-G13-co2-information-risques.md",
       "illustration": "illustrations/sup-cours-13-01-47A3A800.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Classes de securite co2 risques",
         "chemin": "illustrations/classes-de-securite_co2-risques.svg"
        }
       ]
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
       "origine": "pack",
       "chapitre": "13",
       "chapitre_titre": "CO₂ / R-744 : information et sensibilisation aux risques",
       "chapitre_fichier": "CONTENU-13-G13-co2-information-risques.md",
       "illustration": "illustrations/sup-cours-13-04-47A3A800.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Classes de securite co2 risques",
         "chemin": "illustrations/classes-de-securite_co2-risques.svg"
        }
       ]
      },
      {
       "id": "q-g13-283",
       "dc": "G13",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Pourquoi installe-t-on des détecteurs de CO₂ dans les locaux abritant une installation au R-744 ?",
       "choix": [
        "Pour mesurer en continu les performances de l'installation",
        "Parce que le CO₂ est inodore et incolore : une fuite est indétectable sans appareil",
        "Parce que la réglementation impose un détecteur pour tous les fluides",
        "Pour compter les ouvertures de porte de la chambre froide"
       ],
       "bonne": 1,
       "explication": "Le CO₂ ne se voit pas et ne se sent pas : en cas de fuite dans un local fermé, il remplace l'air sans prévenir. Seul un détecteur alerte avant l'asphyxie.",
       "aide": "CO2 invisible et inodore.",
       "remediation_vers": "g13",
       "code": "13.14",
       "chapitre": "13",
       "chapitre_titre": "CO₂ / R-744 : information et sensibilisation aux risques",
       "chapitre_fichier": "CONTENU-13-G13-co2-information-risques.md",
       "illustration": "illustrations/sup-cours-13-14-0382EBB2.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Co2 protection",
         "chemin": "illustrations/co2-protection.svg"
        }
       ]
      }
     ],
     "notes": "Module volontairement court et NON évaluant : l'objectif est la reconnaissance du danger, pas la compétence d'intervention. Faire circuler un masque à gaz réel (sans manipulation dangereuse) pour que la différence avec les EPI habituels se voie. Rappeler que l'odeur d'ammoniac est perceptible bien avant le seuil dangereux : message rassurant qui évite la panique tout en imposant l'alerte. Faire deviner pourquoi le NH₃ exige une catégorie séparée alors que le R-290, également dangereux, reste dans le champ A1/A2."
    },
    {
     "type": "plateau",
     "fiche": null,
     "titre": "Travail dirigé : choisir un fluide de substitution et le justifier par écrit",
     "minutes": 60,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "Travail dirigé : choisir un fluide de substitution et le justifier par écrit",
       "minutes": 60
      }
     ]
    }
   ]
  },
  {
   "n": 5,
   "libelle": null,
   "titre": "Les hydrocarbures, puis l'épreuve",
   "intention": "La spécificité d'A1, et celle qui change le plus les gestes : un fluide inflammable ne se manipule pas comme un fluorure. La journée se termine par le blanc chronométré et la remédiation, positionnement 0-4 à l'appui.",
   "sequences": [
    {
     "type": "cours",
     "fiche": "cl2",
     "titre": "Explosif avant d'être perceptible — la LIE",
     "minutes": 20,
     "video": null,
     "slides": [
      {
       "type": "titre",
       "titre": "Explosif avant d'être perceptible — la LIE",
       "dc": "Classification · codes 12.02 · 12.04",
       "competences": [
        {
         "code": "12.02",
         "lib": "Connaître le matériel de sécurité obligatoire : détection de gaz, détection des fuites, ventilation, équipements de protection individuelle.",
         "officiel": "Connaître les prescriptions en matière de sécurité pour les outils d'entretien et les équipements, tels que la détection de gaz, la détection des fuites, la ventilation, les équipements de protection individuelle, les pompes à vide, les unités de récupération ; les prescriptions relatives à l'élimination des gaz récupérés",
         "epreuve": {
          "A1": "T",
          "A2": "T"
         },
         "nouveau": true,
         "tirage_au_sort": false
        },
        {
         "code": "12.04",
         "lib": "Réaliser une analyse des risques avant de commencer le travail, et supprimer ou identifier les sources de danger.",
         "officiel": "Réaliser une analyse des risques avant le début du travail et éliminer ou, si l'élimination n'est pas possible, identifier les sources de danger",
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=cl2",
       "lancer": "🎧 Écouter la capsule : Explosif avant d'être perceptible — la LIE",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 7 écrans, 7 minutes. Version imprimable et mode projection compris.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/lie-domaine.svg",
       "alt": "L'axe des concentrations : trop pauvre, puis le domaine d'explosivité entre LIE et LSE, puis trop riche. L'explosimètre affiche un pourcentage de la LIE, c'est-à-dire la marge restante.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "<b>Ce qui arrive.</b> Un gaz inflammable ne s'enflamme pas à n'importe quelle concentration dans l'air. Il lui faut un dosage : assez de gaz pour brûler, et assez d'air pour entretenir la combustion. En dessous d'une certaine concentration, le mélange est trop pauvre en gaz — une étincelle ne déclenche rien.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "Au-dessus d'une autre, il est trop riche : il n'y a plus assez d'oxygène. <b>Entre les deux</b>, le mélange s'enflamme, et il le fait d'un coup, dans tout le volume.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "Ces deux bornes portent un nom. La <b>LIE</b> — limite inférieure d'explosivité — est la concentration en dessous de laquelle le mélange ne s'enflamme pas. La <b>LSE</b> — limite supérieure d'explosivité — est celle au-dessus de laquelle il ne s'enflamme plus non plus.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "L'intervalle entre les deux s'appelle le <b>domaine d'explosivité</b>. Chaque gaz a le sien : les valeurs sont propres au fluide et figurent sur sa <b>fiche de données de sécurité</b>. Elles ne se retiennent pas de tête et ne se déduisent d'aucune règle générale.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "<b>Ce qui rend ce danger particulier</b>, c'est qu'il n'y a pas de signal. Une atmosphère peut atteindre son domaine d'explosivité sans odeur, sans bruit, sans rien de visible. Le gaz domestique que l'on sent dans une cuisine contient un <b>odorisant ajouté volontairement</b> pour être détecté par le nez.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "Le <b>R-290 utilisé en froid est un propane de haute pureté : cet odorisant n'y est pas</b>. Le nez ne vous avertira pas. Et le seuil de perception d'une odeur, quand elle existe, n'a aucun rapport avec la LIE : sentir quelque chose ne dit pas si l'on est loin ou près du danger.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "<b>L'appareil qui répond à cette question</b> s'appelle un <b>explosimètre</b>. Il ne mesure pas une quantité de gaz dans l'absolu : il affiche <b>un pourcentage de la LIE</b> du gaz recherché. Une valeur de 10 % LIE signifie que l'atmosphère contient un dixième de la concentration à partir de laquelle elle deviendrait inflammable.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "C'est une mesure de <b>marge restante</b>, et c'est ce qui la rend utilisable : l'alarme se déclenche bien avant que le mélange ne devienne explosif. Le seuil de réglage se fixe selon la procédure de l'entreprise et la documentation de l'appareil.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "Un explosimètre se règle pour un gaz donné : un appareil réglé pour un gaz et utilisé pour un autre affiche un chiffre faux. Et il ne remplace ni un détecteur de fuite de fluide frigorigène, ni un détecteur d'oxygène : ce sont trois appareils différents, qui répondent à trois questions différentes.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "<b>Comment ça arrive vraiment.</b> Une petite fuite sur une unité au R-290, dans un local technique fermé et peu ventilé. Rien ne se voit, rien ne se sent. Le gaz, plus lourd que l'air, s'accumule lentement près du sol. Un technicien entre, actionne l'interrupteur d'éclairage, branche une lampe baladeuse, ou pose un outil électroportatif sur le sol. L'étincelle du contact suffit. Il n'y avait aucun signe avant-coureur, et l'inflammation ne laisse pas le temps de reculer.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "<b>ATEX</b> — le mot vient de « <b>AT</b>mosphère <b>EX</b>plosive ». Lorsqu'un local peut contenir une atmosphère explosive, il fait l'objet d'un <b>zonage</b> : on délimite les zones où ce risque existe, et on n'y admet que du matériel conçu pour ne pas enflammer l'atmosphère — ni par une <b>étincelle</b>, ni par une <b>surface trop chaude</b>, car une surface chaude suffit à allumer un mélange sans la moindre flamme.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "point",
       "html": "Cela vaut aussi pour ce que le technicien apporte avec lui — outil électroportatif, lampe, téléphone. Le zonage et le choix du matériel relèvent d'une étude propre à l'installation ; le technicien, lui, doit savoir <b>reconnaître</b> qu'il entre dans une telle zone et respecter ce qui y est affiché.",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Ce qu'il faut retenir",
       "html": "<ul><li>Un gaz inflammable ne brûle qu'entre deux bornes : <b>LIE</b> (limite inférieure) et <b>LSE</b> (limite supérieure). Entre les deux, une étincelle suffit.</li><li>Les valeurs sont <b>propres à chaque fluide</b> et se lisent sur sa FDS.</li><li>Un <b>explosimètre</b> affiche un pourcentage de la LIE : une marge restante, pas une quantité.</li><li>Il se règle <b>pour un gaz donné</b>, et ne remplace ni un détecteur de fuite, ni un détecteur d'oxygène.</li><li>Le <b>R-290 du froid n'est pas odorisé</b> : le nez n'avertit de rien.</li><li><b>ATEX</b> : dans une zone à atmosphère explosive, seul le matériel <b>prévu pour ces zones</b> peut entrer — y compris celui qu'on apporte. Il est contraint sur l'étincelle <b>et</b> sur sa température de surface.</li></ul>",
       "titre": "Explosif avant d'être perceptible — la LIE"
      },
      {
       "type": "encadre",
       "genre": "piege",
       "t": "Le geste interdit",
       "html": "<p>Entrer dans un local où une fuite de fluide inflammable est possible et y <b>actionner un interrupteur, brancher une lampe ou utiliser un outil électroportatif</b>, sans avoir contrôlé l'atmosphère à l'explosimètre.</p><p>Se fier à son odorat en est la variante la plus courante : le R-290 utilisé en froid ne contient pas l'odorisant du gaz domestique, et aucune odeur ne renseigne sur la distance à la LIE.</p><p>Conséquence : inflammation de tout le volume, sans aucun signe avant-coureur.</p>",
       "titre": "Explosif avant d'être perceptible — la LIE"
      }
     ],
     "questions": [
      {
       "id": "pk-cl2-1",
       "dc": "G12",
       "code": "12.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Que désigne la LIE d'un gaz inflammable ?",
       "choix": [
        "La concentration en dessous de laquelle le mélange avec l'air ne s'enflamme pas",
        "La température minimale d'inflammation de ce gaz au contact de l'air du local technique",
        "La pression maximale admissible dans la bouteille de stockage",
        "La quantité de gaz au-delà de laquelle il faut déclarer l'installation en préfecture"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-02-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Hydrocarbures a1 a2",
         "chemin": "hydrocarbures-a1-a2/index.html"
        }
       ],
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
        "Juste après avoir ouvert le circuit frigorifique",
        "À la fin, au moment de rédiger le rapport écrit",
        "Seulement si le client en fait lui-même la demande"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-04-FC9D2706.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Intervention hydrocarbures interactive",
         "chemin": "intervention-hydrocarbures-interactive/index.html"
        }
       ],
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
        "Aucune précaution particulière lors de l'intervention",
        "Un outillage adapté et une formation spécifique",
        "Un local ATEX systématique pour toute intervention",
        "Un détecteur d'ammoniac dans le local"
       ],
       "bonne": 1,
       "explication": "Outillage adapté et formation spécifique — Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante.",
       "aide": "'Légèrement inflammable' ne veut pas dire 'sans risque'.",
       "remed": {
        "texte": "Les A2L sont légèrement inflammables : il faut des outils antidéflagrants, une formation adaptée et une ventilation suffisante."
       },
       "remediation_vers": "g12",
       "code": "12.02",
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-02-B88D83FC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Cours classes securite",
         "chemin": "cours-classes-securite/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2"
       ]
      }
     ],
     "notes": "Dessiner l'axe des concentrations au tableau : trop pauvre / domaine d'explosivité / trop riche, et placer LIE et LSE dessus. C'est ce dessin que les stagiaires retiennent, pas la définition. Ne donner AUCUNE valeur chiffrée de LIE, même si on la connaît : faire ouvrir la FDS du R-290 et l'y faire lire — c'est l'objectif de la fiche. Montrer un explosimètre si le plateau en dispose, faire lire l'unité affichée (% LIE) et faire dire à quoi correspond le chiffre. Faire comparer côte à côte les trois appareils (explosimètre, détecteur de fuite, détecteur d'oxygène) : la confusion entre eux est fréquente et dangereuse. Le point sur l'odorisant absent du R-290 mérite d'être posé en question ouverte : « le propane, ça se sent, non ? » — la réponse surprend et se retient."
    },
    {
     "type": "cours",
     "fiche": "g12",
     "titre": "Hydrocarbures — le spécifique A1 et A2",
     "minutes": 35,
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
       "type": "experience",
       "url": "packs/fluides/res/hydrocarbures-a1-a2/index.html?dossier=comprendre",
       "lancer": "🔥 Lancer Mission 290 — autoriser ou suspendre",
       "desc": "Pourquoi le R-290, risques d’inflammation, inspection d’une zone, calcul documenté, outillage hydrocarbures et conduite à tenir.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "schema",
       "src": "packs/fluides/res/svg/classes-securite.svg",
       "alt": "Matrice complète des classes NF EN 378 : huit cases, toxicité en lignes, inflammabilité en colonnes.",
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
       "type": "point",
       "html": "Un hydrocarbure récupéré qu'on ne peut pas réutiliser ne part <b>jamais</b> à l'atmosphère, et jamais à l'égout : il part en <b>élimination</b>. C'est une filière agréée qui détruit le fluide dans des conditions contrôlées, comme pour tout déchet dangereux. La bouteille envoyée en <b>destruction</b> est accompagnée d'un bordereau qui trace le mouvement, du technicien jusqu'au centre de traitement. On garde ce bordereau : c'est la preuve que le fluide a bien été éliminé, pas relâché.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "Calculer la <b>charge maximale</b> admissible d'un fluide inflammable, ce n'est pas la deviner. Ce calcul dépend du <b>volume de la pièce</b> desservie et de la <b>limite pratique</b> du fluide, c'est-à-dire la quantité maximale tolérée dans l'air ambiant sans risque. Plus la pièce est petite, moins on a le droit de charge : un même compresseur au R-290 n'a pas la même charge autorisée dans un grand local et dans une pièce exiguë.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "La méthode et les valeurs à utiliser se trouvent dans la norme <b>NF EN 378</b> et dans la documentation du constructeur — on les <b>lit</b>, on ne les invente jamais, et le résultat du calcul se fait <b>valider</b> avant toute mise en service.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      },
      {
       "type": "point",
       "html": "Sur un équipement à fluide inflammable, l'<b>efficacité énergétique</b> se travaille avec les mêmes gestes que sur toutes les machines. La différence, c'est que la charge exacte compte double : ces circuits sont conçus avec une charge volontairement petite, alors le moindre écart — un peu trop, un peu pas assez — dérègle vite l'échange et fait chuter la performance, bien avant que ça n'arrive sur une machine à grosse charge.",
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
      },
      {
       "type": "encadre",
       "genre": "cle",
       "t": "Charge maximale : jamais estimée",
       "html": "Le <b>calcul</b> de la charge maximale dépend du <b>volume de la pièce</b> et de la limite pratique du fluide. Il se fait avec la <b>NF EN 378</b> et la documentation constructeur, jamais de mémoire. Petite pièce = charge autorisée plus faible.",
       "titre": "Hydrocarbures — le spécifique A1 et A2"
      }
     ],
     "questions": [
      {
       "id": "pk-cl2-1",
       "dc": "G12",
       "code": "12.02",
       "niveau": 1,
       "type": "qcm",
       "enonce": "Que désigne la LIE d'un gaz inflammable ?",
       "choix": [
        "La concentration en dessous de laquelle le mélange avec l'air ne s'enflamme pas",
        "La température minimale d'inflammation de ce gaz au contact de l'air du local technique",
        "La pression maximale admissible dans la bouteille de stockage",
        "La quantité de gaz au-delà de laquelle il faut déclarer l'installation en préfecture"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-02-23DE01BD.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Hydrocarbures a1 a2",
         "chemin": "hydrocarbures-a1-a2/index.html"
        }
       ],
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
        "Juste après avoir ouvert le circuit frigorifique",
        "À la fin, au moment de rédiger le rapport écrit",
        "Seulement si le client en fait lui-même la demande"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-04-FC9D2706.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Intervention hydrocarbures interactive",
         "chemin": "intervention-hydrocarbures-interactive/index.html"
        }
       ],
       "categories": [
        "A1",
        "A2"
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
        "Vous utilisez un adaptateur pour forcer le raccordement sur la bouteille",
        "Vous respectez le raccord spécifique prévu pour les hydrocarbures, sans adaptateur",
        "Vous serrez plus fort à la clé pour engager quand même le filetage",
        "Vous inversez le sens de filetage sur votre propre raccord habituel"
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/bib-fiche-synthese-activites-3-bouteille-sec-ca000acf.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "page",
         "libelle": "Hydrocarbures a1 a2",
         "chemin": "hydrocarbures-a1-a2/index.html"
        }
       ],
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
        "Son pouvoir de réchauffement est élevé",
        "Il est très inflammable (classe A3)",
        "Il est fortement toxique par inhalation",
        "Il corrode le cuivre des tubes du circuit"
       ],
       "bonne": 1,
       "explication": "Très inflammable (A3) — Le R290 est un hydrocarbure hautement inflammable. La norme EN 378 limite strictement les charges dans les locaux occupés.",
       "aide": "Propane = gaz domestique = très inflammable.",
       "remed": {
        "texte": "Le R290 est un hydrocarbure hautement inflammable. La norme EN 378 limite strictement les charges dans les locaux occupés."
       },
       "remediation_vers": "g12",
       "code": "12.03",
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-03-B88D83FC.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Charge limite local",
         "chemin": "illustrations/charge-limite-local.svg"
        }
       ],
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
     "minutes": 35,
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
       "type": "experience",
       "url": "packs/fluides/res/intervention-hydrocarbures-interactive/index.html?dossier=preparer",
       "lancer": "🧭 Lancer le cours interactif : intervenir sur un circuit hydrocarbure",
       "desc": "Suite de Mission 290 : 27 écrans, six embranchements avec conséquence visible, ouverture, épreuve, vide, charge, contrôle direct, rapport et cinq décisions finales.",
       "titre": "Intervenir sur un circuit hydrocarbure"
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
       "html": "<ol><li><b>Ouvrir, remplacer, refermer.</b> On dépose le composant en panne et on brase le nouveau. Toujours sous <b>balayage d'azote</b> : un débit léger et continu qui évite la calamine à l'intérieur du tube. Mano-détendeur sur la bouteille — jamais d'azote en direct.</li></ol>",
       "titre": "Intervenir sur un circuit hydrocarbure"
      },
      {
       "type": "point",
       "html": "<ol start=\"2\"><li><b>Épreuve de pression.</b> Le circuit refermé, on le met sous pression d'<b>azote sec</b>, toujours au travers du mano-détendeur, pour contrôler la brasure neuve. Pression d'épreuve : selon la documentation constructeur et la norme applicable, jamais à l'estime.</li><li><b>Tirage au vide.</b> On relâche l'azote, puis on tire au vide : la pompe extrait l'air et l'<b>humidité</b> restants. Un vide qui remonte signale un problème. Valeur cible et durée : selon la documentation constructeur.</li></ol>",
       "titre": "Intervenir sur un circuit hydrocarbure"
      },
      {
       "type": "point",
       "html": "<ol start=\"4\"><li><b>Charge.</b> On charge le circuit avec le volume de réfrigérant hydrocarbure (R-290, R-600a) indiqué sur la <b>plaque signalétique</b>, par pesée — jamais une quantité estimée. Raccord dédié aux hydrocarbures : jamais celui d'un circuit HFC, ni l'inverse.</li><li><b>Contrôle direct.</b> On confirme l'étanchéité avec un <b>détecteur adapté aux hydrocarbures</b> — un détecteur pour HFC classique ne convient pas.</li><li><b>Rapport.</b> On rédige le rapport d'intervention : composant changé, résultats de l'épreuve et du contrôle, quantité chargée. Sans rapport, l'intervention n'a pas de valeur.</li></ol>",
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
       "enonce": "Vous devez rebraser un composant sur un circuit au R-290. Quelle affirmation'est vraie ?",
       "choix": [
        "Le R-290 est classé A2L, comme le R-32 : une flamme brève est possible sans risque particulier.",
        "Le R-290 est classé A3, très inflammable : aucune flamme sans inertage confirmé",
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-07-2A9E51B1.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Intervention hydrocarbures interactive",
         "chemin": "intervention-hydrocarbures-interactive/index.html"
        }
       ],
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-10-2A9E51B1.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "image",
         "libelle": "Pesee charge",
         "chemin": "illustrations/pesee-charge.svg"
        }
       ],
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/sup-cours-12-11-2A9E51B1.webp",
       "pose_niveau": "cours",
       "ressources": [
        {
         "type": "page",
         "libelle": "Intervention hydrocarbures interactive",
         "chemin": "intervention-hydrocarbures-interactive/index.html"
        }
       ],
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
       "chapitre": "12",
       "chapitre_titre": "Spécifique A1/A2 : hydrocarbures (fluides inflammables)",
       "chapitre_fichier": "CONTENU-12-G12-hydrocarbures.md",
       "illustration": "illustrations/bib-tp-balance-et-bouteille-2d63103c.png",
       "pose_niveau": "exact",
       "ressources": [
        {
         "type": "image",
         "libelle": "Epreuve azote",
         "chemin": "illustrations/epreuve-azote.svg"
        }
       ],
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
       "type": "experience",
       "url": "packs/fluides/res/capsules/index.html?c=x5",
       "lancer": "🎧 Écouter la capsule : Détective — intervention sur monobloc R-290",
       "desc": "Le chapitre expliqué à voix haute, écran par écran, avec ses animations — 5 écrans, 6 minutes. Version imprimable et mode projection compris.",
       "titre": "Détective — intervention sur monobloc R-290"
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
     "type": "plateau",
     "fiche": null,
     "titre": "Analyse de risques hydrocarbures, charge d'un circuit R-290, remplacement d'un composant",
     "minutes": 185,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "Analyse de risques hydrocarbures, charge d'un circuit R-290, remplacement d'un composant",
       "minutes": 185
      }
     ]
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
    },
    {
     "type": "bilan",
     "fiche": "ex-a1",
     "titre": "Examen blanc — catégorie A1",
     "minutes": 40,
     "slides": [
      {
       "type": "titre",
       "titre": "Examen blanc — catégorie A1",
       "dc": "Entraînement · périmètre A1",
       "competences": []
      }
     ],
     "questions": [],
     "notes": "Vingt questions sur tout le périmètre. Utile en fin de parcours pour repérer les groupes à retravailler — le score par groupe est plus intéressant que le score global."
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
    },
    {
     "type": "plateau",
     "fiche": null,
     "titre": "Remédiation individuelle et positionnement 0-4 sur les compétences non acquises",
     "minutes": 25,
     "video": null,
     "questions": [],
     "notes": "",
     "slides": [
      {
       "type": "plateau",
       "titre": "Remédiation individuelle et positionnement 0-4 sur les compétences non acquises",
       "minutes": 25
      }
     ]
    }
   ]
  }
 ]
};

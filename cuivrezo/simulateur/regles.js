/* Le jeu du chalumeau — les DONNÉES : questions, équipement, obligations, buses.
   Chaque règle vient de sources-metier/2-chalumeau.md, DECISIONS-2026-09-30.md (INRS ED 742 d'abord)
   ou sources-metier/2-3-simulateur.md. Une question = { t (le choix), ok, pourquoi, grave?, faute? }. */
window.REGLES = {
  /* 2-3-simulateur.md § B : INRS ED 6030 (permis de feu) et ED 742 ; M6 pour l'atelier */
  OBLIGATIONS: [
    'Hors d’un poste fixe de l’atelier (chez un client, sur un chantier) : un permis de feu, délivré par le responsable du site et signé avant de commencer.',
    'Après le travail chez le client : on surveille les lieux au moins 2 heures, car un feu peut couver.',
    'Jamais seul : quelqu’un surveille pendant que je travaille. Jamais de chalumeau allumé sans surveillance.',
    'Mes protections avant d’allumer : lunettes teintées, gants et tablier en cuir, chaussures montantes, vêtements en coton propres.',
    'De l’air renouvelé : aspiration ou ventilation. Jamais d’oxygène pour aérer.',
    'Un extincteur à portée de main, et rien qui brûle autour : chiffons, cartons, graisse.',
    'Le matériel vérifié avant : les fuites à l’eau savonneuse, jamais à la flamme ; l’allumeur, jamais le briquet ; jamais de graisse sur l’oxygène.',
    'Si ça claque ou si ça va mal : je ferme d’abord l’acétylène, et j’appelle.'
  ],
  Q_OBLIG: {
    question: 'Vous devez braser un tube dans la salle des machines d’un client, hors de l’atelier. Que faut-il avant d’allumer ?',
    choix: [
      { t: 'Rien de plus : j’ai mon attestation d’aptitude pour les fluides', ok: false, faute: 'Permis de feu oublié', pourquoi: 'L’attestation d’aptitude concerne les fluides frigorigènes, pas le feu. Hors de l’atelier, il faut un permis de feu.' },
      { t: 'Un permis de feu, délivré par le responsable du site et signé avant de commencer', ok: true, pourquoi: 'Hors d’un poste fixe prévu pour souder, tout travail par point chaud demande un permis de feu.' },
      { t: 'Un collègue qui regarde, cela suffit', ok: false, faute: 'Permis de feu oublié', pourquoi: 'Un collègue ne remplace pas le permis de feu. Hors de l’atelier, il faut ce document, signé avant de commencer.' }
    ]
  },
  Q_APRES: {
    question: 'Le tube est brasé, le poste est refermé. Que faites-vous avant de partir ?',
    choix: [
      { t: 'Je pars tout de suite : la flamme est éteinte', ok: false, faute: 'Surveillance après travaux oubliée', pourquoi: 'Une étincelle peut couver longtemps. On surveille les lieux au moins 2 heures après le travail.' },
      { t: 'Je surveille les lieux au moins 2 heures', ok: true, pourquoi: 'Un feu peut couver après le travail : on inspecte les lieux, puis on les surveille au moins 2 heures.' },
      { t: 'Je jette un seau d’eau autour, par précaution', ok: false, faute: 'Surveillance après travaux oubliée', pourquoi: 'Ce qui compte, c’est de surveiller : on inspecte les lieux, puis on reste au moins 2 heures.' }
    ]
  },
  EPI: [
    { id: 'lunettes', t: 'Lunettes teintées à protections latérales', bon: true },
    { id: 'soleil', t: 'Lunettes de soleil', pourquoi: 'elles ne protègent pas des rayons de la flamme. Il faut des verres teintés de soudeur, avec protections sur les côtés.' },
    { id: 'gants', t: 'Gants en cuir', bon: true },
    { id: 'gants-gras', t: 'Gants tachés de graisse', grave: true, pourquoi: 'rien de gras près de l’oxygène : la graisse peut s’enflammer toute seule.' },
    { id: 'coton', t: 'Vêtements en coton à manches longues', bon: true },
    { id: 'polaire', t: 'Polaire en fibre synthétique', pourquoi: 'une fibre synthétique fond sous une projection et colle à la peau. On porte du coton.' },
    { id: 'tablier', t: 'Tablier en cuir', bon: true },
    { id: 'briquet', t: 'Briquet dans la poche', grave: true, pourquoi: 'un briquet près de la flamme peut exploser.' },
    { id: 'chaussures', t: 'Chaussures de sécurité montantes', bon: true },
    { id: 'chiffon', t: 'Chiffon gras dans la poche', pourquoi: 'un chiffon gras s’enflamme vite, surtout avec l’oxygène.' }
  ],
  TEINTE: 'Le numéro de teinte des lunettes dépend de la buse (norme NF EN 169) : n° 5 jusqu’à 200 l/h, n° 6 pour les buses de 250 à 400 l/h. Le professeur vous le donne. Les lunettes se portent sur les yeux, jamais sur le front.',
  Q_COUCHEE: [
    { t: 'Je la redresse et je l’utilise tout de suite', ok: false, faute: 'Bouteille d’acétylène couchée utilisée', grave: true, pourquoi: 'Une bouteille d’acétylène qui a été couchée ne se sert pas. Le gaz y est dissous dans un liquide, l’acétone, qui peut partir dans le détendeur et le tuyau.' },
    { t: 'Je l’utilise couchée : elle ne risque pas de tomber', ok: false, faute: 'Bouteille d’acétylène utilisée couchée', grave: true, pourquoi: 'Jamais couchée : l’acétone partirait avec le gaz. Une bouteille d’acétylène se sert debout, arrimée.' },
    { t: 'Je ne l’utilise pas et je préviens le professeur', ok: true, pourquoi: 'Une bouteille d’acétylène qui a été couchée ne se sert pas. Elle se sert toujours debout, arrimée.' }
  ],
  PURGE_A: 'On ne purge jamais le robinet d’une bouteille d’acétylène. Seul celui de l’oxygène se purge, juste avant de monter le détendeur.',
  Q_FORCE: [
    { t: 'Je mets un peu de graisse sur le filetage', ok: false, grave: true, faute: 'Graisse sur un raccord d’oxygène', pourquoi: 'Jamais de graisse ni d’huile sur un raccord d’oxygène : au contact de l’oxygène, elle peut s’enflammer toute seule.' },
    { t: 'Je mets une goutte d’huile', ok: false, grave: true, faute: 'Huile sur un raccord d’oxygène', pourquoi: 'Jamais d’huile ni de graisse sur un raccord d’oxygène : au contact de l’oxygène, elle peut s’enflammer toute seule.' },
    { t: 'Je dévisse et je vérifie que le filetage et le joint sont propres et en bon état', ok: true, pourquoi: 'Un raccord d’oxygène reste propre et sec. S’il est abîmé, on prévient le professeur. Ici, tout est propre : on revisse.' }
  ],
  Q_ORDRE: [
    { t: 'La bouteille d’oxygène', ok: true, pourquoi: 'Oxygène d’abord, acétylène ensuite : le gaz qui brûle s’ouvre en dernier et se ferme en premier.' },
    { t: 'La bouteille d’acétylène', ok: false, faute: 'Acétylène ouvert avant l’oxygène', pourquoi: 'Le gaz qui brûle s’ouvre en dernier et se ferme en premier : l’oxygène d’abord.' }
  ],
  Q_PLACE: [
    { t: 'Face au détendeur, pour bien voir le manomètre', ok: false, faute: 'Bouteille ouverte face au détendeur', pourquoi: 'Jamais devant le détendeur : à l’ouverture, toute la pression de la bouteille arrive sur lui. On se place sur le côté.' },
    { t: 'Sur le côté du détendeur', ok: true, pourquoi: 'Sur le côté, jamais devant le détendeur et ses manomètres.' }
  ],
  Q_OUVRIR_O: [
    { t: 'En grand, d’un coup', ok: false, faute: 'Bouteille ouverte brutalement', pourquoi: 'Jamais brutalement : la pression arriverait d’un coup dans le détendeur.' },
    { t: 'D’un quart de tour, lentement, à la main', ok: true, pourquoi: 'Lentement, la pression arrive doucement. Un quart de tour suffit, et on peut refermer vite en cas d’incendie.' }
  ],
  Q_OUVRIR_A: [
    { t: 'En grand, d’un coup', ok: false, faute: 'Bouteille ouverte brutalement', pourquoi: 'Jamais brutalement : la pression arriverait d’un coup dans le détendeur.' },
    { t: 'D’un quart de tour, lentement, puis je retire la clé et je la range', ok: false, faute: 'Clé retirée du robinet d’acétylène', pourquoi: 'La clé reste sur le robinet : en cas d’incident, on referme tout de suite.' },
    { t: 'D’un quart de tour, lentement, et la clé reste sur le robinet', ok: true, pourquoi: 'Et la clé reste dessus : en cas d’incident, on referme tout de suite.' }
  ],
  /* fin de poste mobile (Franck, 06/10) : détendeurs démontés pour ne pas choquer les manomètres ;
     bouteilles chapeau en place (INRS ED 742 p. 12, 17-19) */
  Q_DEMONTER: [
    { t: 'Je les laisse montés, vis desserrées : tout est prêt pour la prochaine fois', ok: false, faute: 'Détendeurs laissés montés sur un poste mobile', pourquoi: 'Sur un poste mobile, un détendeur laissé monté prend des chocs pendant le transport : ses manomètres se cassent. On le démonte.' },
    { t: 'Je les laisse montés, vis serrée, pour gagner du temps', ok: false, grave: true, faute: 'Détendeurs laissés montés et réglés', pourquoi: 'Jamais un détendeur laissé réglé : à la prochaine ouverture, la pression arriverait d’un coup. Et sur un poste mobile, on le démonte.' },
    { t: 'Je les démonte, je les range à l’abri des chocs et je remets le chapeau des bouteilles', ok: true, pourquoi: 'Démontés et rangés, les détendeurs ne prennent pas de chocs ; les bouteilles voyagent chapeau en place.' }
  ],
  /* Niveau 2 (choix de Franck, 06/10) : la gamme et la règle de la fiche S12 (diapo 29) — 250 l/h jusqu'au Ø 28,
     315 l/h au-delà ; les plages de pression du document ressource 03 du professeur (TP-ACN), en bar.
     Diamètres extérieurs des tubes : catalogue ITE (2-3-simulateur.md § A). */
  BUSES: [
    { debit: 40 }, { debit: 63, O: [1, 1.2], A: [0.2, 0.25] }, { debit: 100, O: [1, 1.2], A: [0.2, 0.25] },
    { debit: 160, O: [1, 1.5], A: [0.3, 0.35] }, { debit: 250, O: [1, 1.5], A: [0.3, 0.35] },
    { debit: 315, O: [1.5, 2.2], A: [0.4, 0.5] }, { debit: 400, O: [1.5, 2.2], A: [0.4, 0.5] }
  ],
  TUBES: [
    { nom: '3/4″ (19,05 mm)', d: 19.05 }, { nom: '7/8″ (22,23 mm)', d: 22.23 }, { nom: '1″ 1/8 (28,58 mm)', d: 28.58 },
    { nom: '1″ 3/8 (34,93 mm)', d: 34.93 }, { nom: '1″ 5/8 (41,28 mm)', d: 41.28 }
  ],
  AIDE_BUSE: 'Plus le tube est gros, plus il faut de chaleur : une buse qui débite plus.',
  REGLE_BUSE: 'La règle de la fiche : une buse de 250 l/h jusqu’au Ø 28, de 315 l/h au-delà.',
  buseBonne: tube => tube.d < 29 ? 250 : 315
};

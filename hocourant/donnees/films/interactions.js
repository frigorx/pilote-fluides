/* ============================================================
   inerWeb HoCourant — COUCHE INTERACTIVE des 13 films (M1…M13)
   Le film s'arrête sur l'image de l'accident de l'acte 1 (repère
   `arret`, en secondes : l'instant où l'éclair — ou l'équivalent —
   apparaît pour la première fois pleinement dans le CSS du film) et
   pose une question à trois choix ; le bon choix lance l'acte 2, un
   mauvais choix affiche `remed` puis « Revoir » rejoue l'acte 1.
   Vouvoiement, jamais de prénom ; un bloc par module, M1 à M13.
   ============================================================ */
window.INTERACTIONS = window.INTERACTIONS || {};

INTERACTIONS.M1 = {
  arret: 4.8,
  question: "Qu'est-ce qui a manqué avant de toucher ce fil ?",
  choix: [
    { t: "S'arrêter à distance et signaler le fil", ok: true },
    { t: "Mettre des gants de chantier épais", remed: "Des gants de chantier ne sont pas des gants isolants : le courant passe." },
    { t: "Faire vite pour limiter le contact", remed: "La vitesse ne change rien : au contact, les muscles se crispent, la main ne lâche plus." }
  ],
  bravo: "C'est la distance qui protège, pas l'adresse."
};

INTERACTIONS.M2 = {
  arret: 5.5,
  question: "Qu'est-ce qui a manqué avant que l'eau n'atteigne le coffret ?",
  choix: [
    { t: "Continuer à travailler sans rien dire", remed: "Rester silencieux laisse l'eau atteindre un coffret sous tension sans réagir à temps." },
    { t: "Arrêter le collègue et demander sa tâche", ok: true },
    { t: "Éponger l'eau une fois renversée par terre", remed: "Éponger après coup n'empêche pas l'eau d'avoir déjà touché un appareil sous tension." }
  ],
  bravo: "Une question posée à temps arrête le risque avant qu'il n'atteigne le coffret."
};

INTERACTIONS.M3 = {
  arret: 4.9,
  question: "Qu'est-ce qui a manqué avant d'enfiler ces gants ?",
  choix: [
    { t: "Vérifier seulement l'aspect extérieur", remed: "Un trou minuscule ne se voit pas à l'œil : seul l'étirement doigt par doigt le révèle." },
    { t: "Faire confiance aux gants d'un collègue", remed: "La confiance ne remplace pas le contrôle : un gant peut s'user entre deux usages." },
    { t: "Étirer chaque doigt pour repérer un trou", ok: true }
  ],
  bravo: "Un équipement isolant ne protège que vérifié : sain, propre et adapté au risque."
};

INTERACTIONS.M4 = {
  arret: 4.8,
  question: "Qu'est-ce qui a manqué avant de poser les doigts sur ces fils ?",
  choix: [
    { t: "S'arrêter avant la prise et alerter", ok: true },
    { t: "Croire le courant domestique sans risque", remed: "Deux cent trente volts suffisent à faire passer un courant dangereux dans le corps." },
    { t: "Tester du bout des doigts avant de couper", remed: "Un contact, même bref du bout des doigts, suffit à faire passer un courant dangereux." }
  ],
  bravo: "La tension limite de sécurité est bien en dessous de deux cent trente volts."
};

INTERACTIONS.M5 = {
  arret: 4.6,
  question: "Qu'est-ce qui a manqué avant de poser la main sur cet appareil ?",
  choix: [
    { t: "Se dire qu'une petite châtaigne ne craint rien", remed: "Une secousse déjà sentie ne garantit rien : la peau mouillée change tout la fois suivante." },
    { t: "Vérifier qu'un différentiel protège l'appareil", ok: true },
    { t: "Sécher rapidement les mains avant de toucher", remed: "Des mains vite essuyées restent humides : seul un différentiel protège réellement." }
  ],
  bravo: "Un différentiel haute sensibilité protège la personne, pas seulement les fils."
};

INTERACTIONS.M6 = {
  arret: 6.0,
  question: "Qu'est-ce qui a manqué avant d'ouvrir la porte de ce coffret ?",
  choix: [
    { t: "Avoir déjà vu un collègue faire ce geste", remed: "Avoir vu faire ne remplace pas un titre écrit remis par l'employeur avant d'agir." },
    { t: "Ouvrir vite pour ne pas déranger le chantier", remed: "Aller vite ne change rien : ouvrir ce coffret reste une opération réservée à une personne habilitée." },
    { t: "Attendre le titre remis par l'employeur", ok: true }
  ],
  bravo: "Une démonstration n'autorise rien ; seul un titre écrit ouvre ce droit."
};

INTERACTIONS.M7 = {
  arret: 4.9,
  question: "Qu'est-ce qui a manqué avant d'appuyer ce tube contre l'armoire ?",
  choix: [
    { t: "Garder le tube loin de l'armoire, à l'horizontale", ok: true },
    { t: "Croire que la limite au sol suffit avec un tube", remed: "La limite protège le corps, mais pas un tube tenu à bout de bras au-delà d'elle." },
    { t: "Appuyer le tube contre l'armoire pour souffler", remed: "Appuyer un objet métallique contre l'armoire suffit à transmettre le courant jusqu'à vous." }
  ],
  bravo: "La limite protège le corps et tout ce qu'il porte, un tube, une règle, une échelle."
};

INTERACTIONS.M8 = {
  arret: 5.3,
  question: "Qu'est-ce qui a manqué avant d'ouvrir ce coffret fermé ?",
  choix: [
    { t: "Ouvrir le coffret rapidement pour vérifier", remed: "Ouvrir un coffret reste une opération électrique réservée à une personne autorisée." },
    { t: "Rester dans sa tâche, à distance du coffret", ok: true },
    { t: "Continuer à peindre en s'appuyant sur le coffret", remed: "S'appuyer sur un coffret fermé peut suffire à l'ouvrir ou à toucher ce qu'il protège." }
  ],
  bravo: "Rester dans sa tâche, respecter la limite, ne pas ouvrir ce qui n'est pas la sienne."
};

INTERACTIONS.M9 = {
  arret: 6.0,
  question: "Qu'est-ce qui a manqué avant de poser la main sur ce fil ?",
  choix: [
    { t: "Croire que le tableau à l'arrêt suffit", remed: "Un tableau à l'arrêt peut être remis sous tension par une autre personne sans le savoir." },
    { t: "Demander à un collègue de surveiller", remed: "Une personne qui surveille peut s'absenter ; seul un cadenas empêche la manœuvre." },
    { t: "Poser un cadenas avant de commencer", ok: true }
  ],
  bravo: "Un cadenas posé avant de travailler empêche une remise sous tension à votre insu."
};

INTERACTIONS.M10 = {
  arret: 5.9,
  question: "Qu'est-ce qui a manqué après ce disjoncteur retombé deux fois ?",
  choix: [
    { t: "S'arrêter net et appeler son responsable", ok: true },
    { t: "Réessayer une troisième fois, plus fort", remed: "Le disjoncteur retombe parce qu'un défaut reste présent derrière lui, pas par caprice." },
    { t: "Ouvrir le tableau pour chercher la panne", remed: "Chercher la panne derrière le capot dépasse la manœuvre : ce n'est plus le même rôle." }
  ],
  bravo: "Deux essais, puis on s'arrête et on rend compte : la règle tient en une phrase."
};

INTERACTIONS.M11 = {
  arret: 4.9,
  question: "Qu'est-ce qui a manqué avant de franchir ce balisage ?",
  choix: [
    { t: "Continuer seul vers une pièce plus accessible", remed: "Une pièce plus proche mais non prévue peut rester sous tension : elle n'a pas été préparée." },
    { t: "Rester dans la zone confiée par le chargé", ok: true },
    { t: "Finir sans déranger le chargé de travaux", remed: "Finir vite ne remplace pas rendre compte : une difficulté se signale avant d'agir seul." }
  ],
  bravo: "La zone confiée, le matériel prescrit, le compte rendu : l'ordre qui protège."
};

INTERACTIONS.M12 = {
  arret: 3.8,
  question: "Qu'est-ce qui a manqué avant de saisir le bras de la victime ?",
  choix: [
    { t: "Tirer la victime rapidement hors de la zone", remed: "Tirer une victime encore en contact transmet le courant à la personne qui la touche." },
    { t: "Asperger la victime d'eau pour l'aider", remed: "L'eau conduit le courant : elle ramènerait l'électricité jusqu'à vous et la victime." },
    { t: "Couper l'alimentation avant de s'approcher", ok: true }
  ],
  bravo: "Couper, ne pas toucher, appeler : l'ordre qui évite une deuxième victime."
};

INTERACTIONS.M13 = {
  arret: 6.1,
  question: "Qu'est-ce qui a manqué après avoir réparé le bon départ ?",
  choix: [
    { t: "S'arrêter à ce seul départ et rendre compte", ok: true },
    { t: "Continuer sur les départs voisins, satisfait", remed: "Toucher des départs sans lien avec la panne dépasse un dépannage de faible étendue." },
    { t: "Profiter de l'armoire ouverte pour tout revoir", remed: "Vérifier toute l'armoire dépasse un dépannage : cela revient à une équipe de travaux." }
  ],
  bravo: "Réparer ce seul départ, refermer, rendre compte : le reste attend une équipe de travaux."
};

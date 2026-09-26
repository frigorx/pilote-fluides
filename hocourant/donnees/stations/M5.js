/* ============================================================
   inerWeb HoCourant — STATION du module M5 « Ce que le courant fait au corps »
   Une étape par écran de COURS.M5, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M5 = { etapes: [
  { court: "Le trajet", scenes: ["trajet-courant"],
    narration: "Ce dessin montre le trajet du courant dans le corps : il entre par la main, descend le long du tronc, et ressort par les pieds. Ce parcours traverse le cœur, ce qui rend certains contacts dangereux. Ce n'est pas la tension seule qui blesse, c'est l'intensité qui circule dans ce trajet : un très faible courant se sent à peine, un peu plus bloque les muscles de la main, qui ne peut plus lâcher, et au-delà, le cœur peut se dérégler. Retenez ce trajet : il explique pourquoi on ne touche jamais pour vérifier." },
  { court: "Durée et trajet", scenes: ["trajet-courant", "differentiel"],
    narration: "Trois facteurs aggravent un même courant. D'abord la durée du contact : quelques dixièmes de seconde de plus changent tout, voilà pourquoi ce boîtier, un disjoncteur différentiel, coupe très vite dès qu'un courant part vers la terre. Ensuite le trajet : main-main ou main-pied, le courant passe par le cœur, c'est le tracé orange du premier dessin. Enfin la fréquence : le cinquante hertz du réseau est très mauvais pour le cœur. Et une peau mouillée réduit encore la résistance du corps : à tension égale, le courant est plus grand, le contact plus grave." },
  { court: "La clé", scenes: ["differentiel"],
    narration: "Ce boîtier porte l'information essentielle de tout ce module : un disjoncteur différentiel à haute sensibilité coupe l'alimentation dès qu'un faible courant part vers la terre, en une fraction de seconde. Il protège la personne, pas seulement le câblage. Sur un chantier, vérifier qu'un différentiel adapté protège le poste de travail fait partie des gestes avant de commencer. Mais ce boîtier ne remplace aucune règle de prévention : la distance, l'arrêt et le signalement restent les premiers réflexes." },
  { court: "Le piège", film: "M5",
    scenario: {
      decor: "Un lave-linge à droite, un tuyau d'évacuation qui goutte sur le sol, un petit boîtier de protection fixé au mur à gauche (disjoncteur ordinaire à l'acte 1, différentiel haute sensibilité à l'acte 2 : même dessin, c'est la voix qui le dit).",
      acte1: "Le bonhomme entre par la gauche, les mains mouillées après avoir manipulé le tuyau ; il pose la main sur la carcasse métallique de l'appareil ; au contact : éclair orange sur la carcasse, cheveux dressés, la main reste collée sans pouvoir lâcher, le corps tremble.",
      acte2: "Même décor. Au moment du contact, un repère orange clignote sur le boîtier différentiel, qui coupe aussitôt ; la main du bonhomme se détache, il recule d'un pas et la secoue, puis lève l'autre main pour signaler ; un panneau apparaît au-dessus de l'appareil." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Un lave-linge dont le tuyau fuit ; notre bonhomme l'a manipulé, les mains mouillées. Il a déjà pris une châtaigne, ça va, pense-t-il. Aujourd'hui la peau est humide, la résistance du corps chute, et un défaut met la carcasse sous tension sans rien montrer. Au contact, le courant passe fort, les muscles se crispent, la main reste collée. Le boîtier au mur ne bronche pas : un disjoncteur ordinaire protège les fils, pas la personne." },
      { titre: "Acte 2 · la leçon", duree: 39,
        narration: "Même appareil, même défaut, mêmes mains mouillées, mais cette fois un différentiel à haute sensibilité protège le circuit. Dès qu'un faible courant part vers la terre par le corps, il coupe en une fraction de seconde : la main se détache, le bonhomme recule et la secoue. Il ne rebranche rien : il signale l'appareil, pour qu'une personne habilitée trouve le défaut. Même s'il se sent bien, il se fait examiner : aucune électrisation n'est anodine. Retenez la limite de ce boîtier : il rattrape un accident, il n'autorise jamais à toucher." } ] },
]};

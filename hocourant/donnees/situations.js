/* ============================================================
   inerWeb HoCourant — les dessins de mise en situation (lot 3 des images, 03/11/2026)
   Un dessin par thème, en tête du module (app.js, situationModuleHtml) : le lieu réel
   et la personne qui intervient. Fichiers : illustrations/situation-<thème>.webp.
   Écrit par outils/poser-lot3.py depuis lot3/legendes.json : ne pas retoucher à la main.
   ============================================================ */
window.SITUATIONS = (function () {
  const S = {
  "danger": {
    "img": "situation-danger.webp",
    "alt": "Dans l'arrière-boutique d'un magasin, une rallonge dont la gaine est entaillée traîne dans une flaque d'eau près d'une prise ; l'élève s'arrête à un pas, la main levée, sans rien toucher, et montre l'entaille ; la responsable a déjà la main sur le levier du coupe-circuit du tableau.",
    "legende": "Une gaine entaillée dans l'eau : on s'arrête, on ne touche pas, on fait couper au tableau.",
    "modules": [
      "M1",
      "M5"
    ]
  },
  "analyse": {
    "img": "situation-analyse.webp",
    "alt": "Dans le local technique de l'atelier, l'élève, lunettes, se tient à deux pas d'une armoire électrique fermée et d'un groupe en marche, les mains dans le dos, et regarde l'eau au sol près du siphon ; sur l'établi, alignés : gants isolants, écran facial, vérificateur d'absence de tension, cadenas avec son étiquette et liste de contrôle ; le responsable montre le sol mouillé.",
    "legende": "Avant d'agir, on regarde : l'armoire, le sol mouillé, et sur l'établi ce qu'il faudra mettre et poser.",
    "modules": [
      "M2",
      "M3"
    ]
  },
  "zones": {
    "img": "situation-zones.webp",
    "alt": "Dans le couloir d'un immeuble de bureaux, une armoire électrique est ouverte pour des travaux, un écran transparent devant ses parties actives et une chaîne sur plots qui marque la zone au sol ; derrière la chaîne, l'élève porte une gaine de ventilation sur l'épaule en restant loin de l'armoire ; la responsable du site montre la limite du bras.",
    "legende": "L'armoire est ouverte, la zone est marquée : avec sa gaine, l'élève reste derrière la chaîne, à distance.",
    "modules": [
      "M4",
      "M6",
      "M7",
      "M8"
    ]
  },
  "intervention": {
    "img": "situation-intervention.webp",
    "alt": "Dans le local technique d'un entrepôt frigorifique, devant l'armoire ouverte d'un groupe dont l'interrupteur principal est cadenassé avec son étiquette, l'élève, écran facial et gants isolants, remplace un contacteur sur le rail, debout sur un tapis isolant ; le chargé de travaux, écran relevé, tient le vérificateur d'absence de tension à côté d'elle.",
    "legende": "Armoire consignée, tapis isolant, écran et gants : on remplace le contacteur sous les yeux du chargé de travaux.",
    "modules": [
      "M10",
      "M11",
      "M13"
    ]
  },
  "consignation": {
    "img": "situation-consignation.webp",
    "alt": "Dans le local technique d'un petit immeuble, l'élève, écran facial et gants isolants, applique les deux pointes du vérificateur d'absence de tension sur les bornes sous l'interrupteur principal de l'armoire, ouvert et cadenassé avec son étiquette ; le chargé de consignation, écran facial lui aussi, tient l'attestation sur une planchette ; par la fenêtre, la pompe à chaleur.",
    "legende": "Séparer, condamner, identifier, vérifier : la consignation se termine au vérificateur, et l'attestation l'écrit.",
    "modules": [
      "M9"
    ]
  },
  "secours": {
    "img": "situation-secours.webp",
    "alt": "Dans l'atelier, un collègue est assis au sol contre l'établi, étourdi, le bras tenu, près d'un groupe dont il touchait le câble ; l'élève vient de couper le courant au levier du tableau ; la responsable, à genoux à distance, appelle les secours au téléphone ; un extincteur est accroché au mur.",
    "legende": "D'abord couper le courant, puis appeler les secours : on ne touche pas la victime avant.",
    "modules": [
      "M12"
    ]
  }
};
  const M = {};
  for (const k in S) for (const m of S[k].modules) M[m] = S[k];
  return { de: (id) => M[id] || null, themes: S };
})();

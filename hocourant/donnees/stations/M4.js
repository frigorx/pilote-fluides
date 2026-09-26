/* ============================================================
   inerWeb HoCourant — STATION du module M4 « Les domaines de tension »
   Une étape par écran de COURS.M4, dans le même ordre et le même
   nombre. Le texte de référence reste dans cours.js ; ici ne vivent
   que ce qu'on montre à droite (scènes de scenes.js ou film) et ce
   que la voix dit (doctrine VOIX-ET-NARRATION : la voix explique la
   scène, elle ne lit pas le texte ; vouvoiement ; jamais de prénom).
   ============================================================ */
window.STATIONS = window.STATIONS || {};
STATIONS.M4 = { etapes: [
  { court: "Les domaines", scenes: ["bt-quotidien"],
    narration: "Cette prise domestique et ce moteur triphasé illustrent le même domaine de tension : la basse tension, celui où travaille presque tout frigoriste. La norme range chaque installation selon sa tension nominale, de la plus faible à la plus élevée, parce que le risque et les précautions changent avec le domaine. Ce classement n'est pas une curiosité théorique : il détermine ensuite le symbole d'habilitabilité qui autorise, ou non, à intervenir dans un périmètre donné. L'écran suivant place ces domaines sur une échelle, avec leurs limites en volts." },
  { court: "L'échelle", scenes: ["bt-quotidien"],
    narration: "Cette échelle place les quatre domaines les uns après les autres, avec leurs limites en volts : cinquante, mille, cinquante mille. Une prise de courant et un moteur triphasé se trouvent tous les deux dans le même segment, la basse tension, alors que leurs usages semblent très différents. Voir ces repères sur une ligne aide à retenir qu'un même domaine peut couvrir des situations d'apparence opposée. Ce repérage sert ensuite à lire un symbole d'habilitabilité ou une plaque signalétique sans hésiter sur le domaine concerné." },
  { court: "La limite", film: "M4",
    scenario: {
      decor: "Une prise murale ouverte avec deux fils qui dépassent, un mur derrière, le sol.",
      acte1: "Le bonhomme entre par la gauche, hausse les épaules et pose deux doigts sur les fils de la prise ; au contact : éclair orange sur les doigts, cheveux dressés, il est projeté en arrière et retombe assis, des étoiles tournent autour de sa tête.",
      acte2: "Même décor. Le bonhomme entre et s'arrête à distance de la prise ; il lève la main, paume en avant ; un repère orange se pose au sol devant la prise ; un panneau de danger apparaît au-dessus du mur." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Une prise ouverte, deux fils qui dépassent : notre bonhomme se dit que du courant domestique, ce n'est rien. Il pose les doigts dessus pour vérifier. Le courant entre par la main, les muscles se crispent, et la secousse le rejette en arrière. Il se retrouve assis, des étoiles plein la tête. Deux cent trente volts suffisent à faire passer un courant dangereux dans le corps : une prise ordinaire n'est jamais sans danger." },
      { titre: "Acte 2 · la leçon", duree: 35,
        narration: "Même prise, même mur, et cette fois le bon geste. Notre bonhomme s'arrête avant d'être à portée de main, sans chercher à vérifier lui-même. Il lève la main pour marquer l'arrêt et tenir les autres à l'écart, puis fait poser un repère devant la prise. La tension limite de sécurité est fixée à cinquante volts en courant alternatif : bien en dessous des deux cent trente volts d'une prise ordinaire. Il signale ensuite le danger à qui de droit, plutôt que de tenter sa chance." } ] },
  { court: "Le symbole", film: "M4b",
    scenario: {
      decor: "Une clôture grillagée avec portillon, un panneau triangle à éclair sur la clôture, une grande cabine avec isolateurs en cloche et un conducteur rouge en hauteur, derrière.",
      acte1: "Le bonhomme entre par la gauche, pousse le portillon et avance vers la cabine ; à deux mètres du conducteur, sans contact, un arc jaillit : cheveux dressés, il est repoussé hors de la clôture et retombe assis, des étoiles tournent.",
      acte2: "Même décor. Le bonhomme s'arrête à la clôture devant le panneau, sans pousser le portillon ; une personne au casque blanc arrive, franchit le portillon et s'approche de la cabine, tandis qu'il reste dehors." },
    actes: [
      { titre: "Acte 1 · la situation", duree: 31,
        narration: "Cette clôture entoure un poste de haute tension : grande cabine, isolateurs en cloche, un conducteur qui passe en hauteur. Pour couper au plus court, notre bonhomme pousse le portillon et avance vers la cabine. Sans rien toucher, en approchant du conducteur, il déclenche un arc : en haute tension, l'arc peut jaillir avant tout contact. Cheveux dressés, il est repoussé hors de la clôture et retombe assis, des étoiles plein la tête. Le contact n'était pas nécessaire pour être touché." },
      { titre: "Acte 2 · la leçon", duree: 35,
        narration: "Même clôture, et cette fois le bon geste. Notre bonhomme s'arrête devant le panneau qui signale le danger, sans pousser le portillon. Il téléphone pour signaler la situation plutôt que d'entrer lui-même. Une personne casquée arrive, habilitée pour ce domaine : elle franchit le portillon et s'approche de la cabine, alors que notre bonhomme reste hors de la clôture. Un titre d'habilitation correspond toujours à un domaine précis ; le sien s'arrête à la basse tension, jamais à la haute tension d'un poste comme celui-ci." } ] },
]};

/* ============================================================
   inerWeb R408 — le cours, module par module
   Écrans courts : un module se lit en moins de 10 minutes.
   Types d'écran : notion · cle · piege · schema · activite
   Chaque écran « notion » porte une image : img: "sc:<id>" (scène de
   scenes.js) ou img: "codex:<slug>" (illustration réservée, décrite
   dans docs/PROMPTS-CODEX.md). Les identifiants "sc:" viennent tous
   du catalogue figé de docs/BRIEF-CONTENU.md § 5.1.
   ============================================================ */

const COURS = {

  /* ---------- P0 · SOCLE ---------- */

  M1: { ecrans: [
    { type: "notion", titre: "Ce qu'on appelle une chute de hauteur", img: "sc:chute-bord-vide", r408: ["DC1.a.03"],
      html: "<p>Sur un chantier, on utilise un <strong>échafaudage</strong> : une structure provisoire montée pour travailler en hauteur, le long d'un mur ou sous un toit.</p><p>Une <strong>chute de hauteur</strong>, c'est perdre l'appui qui vous retenait en hauteur, et rencontrer brutalement le sol ou un objet.</p><p>Dans le bâtiment, les chutes de hauteur sont la deuxième cause d'accidents du travail, et la première cause de décès (source : INRS).</p>" },
    { type: "notion", titre: "Pourquoi la loi s'en mêle", img: "sc:terrasse-toiture", r408: ["DC1.a.01", "DC1.a.02"],
      html: "<p>Le Code du travail protège les salariés contre le risque de chute <strong>dès qu'il en existe un</strong>, quelle que soit la hauteur : il n'y a pas de seuil à partir duquel la protection deviendrait obligatoire.</p><p>Cette réglementation répond à trois enjeux : <strong>humain</strong> (éviter une blessure grave ou un décès), <strong>juridique</strong> (l'employeur qui ne protège pas ses salariés engage sa responsabilité), <strong>économique</strong> (un accident arrête le chantier et coûte cher à l'entreprise).</p>" },
    { type: "cle", titre: "La clé",
      html: "<p>Le risque de chute existe <strong>dès qu'il n'y a pas d'obstacle</strong> au bord d'un vide — un plancher, un toit, une plateforme. Il n'y a pas de hauteur en dessous de laquelle ce risque disparaît.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Penser « c'est peu haut, ça ira » est une erreur. Une chute de faible hauteur, sur une surface dure ou sur un objet, peut blesser gravement. Ce n'est pas une histoire de mètres : c'est la présence ou non d'un obstacle qui compte.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Repérez, dans l'atelier ou sur une photo de chantier, un endroit où une personne pourrait travailler en hauteur : dites ce qui la retiendrait, ou ce qui lui manquerait.</p>" },
  ]},

  M2: { ecrans: [
    { type: "notion", titre: "Qui fait quoi sur le chantier", img: "codex:acteurs-echafaudage", r408: ["DC1.b.01", "DC1.b.02", "DC1.b.03"],
      html: "<p>Plusieurs personnes interviennent autour d'un échafaudage, chacune avec son rôle : le <strong>concepteur</strong> ou <strong>constructeur</strong> fournit un matériel conforme et sa notice ; l'<strong>employeur</strong> organise la formation, l'aptitude médicale et les vérifications ; le <strong>chef de chantier</strong> organise le travail sur place ; le <strong>monteur</strong> monte et démonte la structure ; le <strong>vérificateur</strong> contrôle son état ; l'<strong>utilisateur</strong> travaille dessus, sans la monter ni la modifier.</p>" },
    { type: "cle", titre: "La clé",
      html: "<p>En formation, vous êtes <strong>utilisateur</strong>. Personne ne monte, ne vérifie ou n'utilise un échafaudage sans l'<strong>autorisation de l'employeur</strong>, donnée après une formation qui délivre une <strong>attestation de compétences formation</strong>.</p>" },
    { type: "cle", titre: "Connaître les consignes, les faire connaître", r408: ["DC1.f.01"],
      html: "<p>Avant de commencer, vous connaissez les consignes de sécurité du chantier : port des EPI, zones interdites, personne à prévenir en cas de problème. Si vous accompagnez un collègue moins expérimenté, vous les lui transmettez : une consigne que vous seul connaissez ne protège personne d'autre.</p>" },
    { type: "piege", titre: "Le piège", r408: ["DC1.b.04"],
      html: "<p>Un garde-corps manque ? Vous ne le remontez pas vous-même, même si c'est rapide : ce geste appartient au monteur. Votre rôle est de <strong>refuser d'utiliser</strong> l'échafaudage et de <strong>signaler</strong> l'anomalie.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Pour une intervention que vous connaissez, dites qui a monté l'échafaudage, qui l'a vérifié et qui l'a utilisé : sont-ce les mêmes personnes ?</p>" },
  ]},

  M3: { ecrans: [
    { type: "notion", titre: "L'ordre des protections", img: "sc:collectif-avant-individuel",
      html: "<p>Face au risque de chute, les mesures ne se choisissent pas au hasard : il y a un ordre. D'abord, si c'est possible, on <strong>travaille depuis le sol</strong> pour supprimer le risque. Sinon, on met en place une <strong>protection collective</strong> — elle profite à tout le monde. La protection individuelle vient seulement en <strong>dernier recours</strong>.</p>" },
    { type: "notion", titre: "Le garde-corps, en trois pièces", img: "sc:garde-corps-trois-elements", r408: ["R-10"],
      html: "<p>Le <strong>garde-corps</strong> est la protection collective la plus courante. Il comporte trois éléments : la <strong>lisse</strong> (la barre du haut, celle qu'on tient), la <strong>lisse intermédiaire</strong> (à mi-hauteur), et la <strong>plinthe</strong> (en bas, elle arrête ce qui glisse au sol).</p>" },
    { type: "notion", titre: "Les hauteurs à respecter", img: "codex:garde-corps-cotes", r408: ["R-10"],
      html: "<p>Ces trois éléments ont des dimensions fixées par la loi : la lisse est placée entre <strong>1 mètre et 1,10 m</strong> du plancher ; la plinthe fait <strong>10 à 15 cm</strong> de haut ; la lisse intermédiaire se place <strong>à mi-hauteur</strong> entre les deux.</p>" },
    { type: "cle", titre: "La clé", img: "sc:harnais-ancrage",
      html: "<p>Le <strong>harnais</strong>, relié par une longe à un <strong>point d'ancrage</strong> (un point fixe, prévu pour ça), n'intervient que si la protection collective est impossible. Et avant de poser un équipement, on vérifie toujours que l'accès lui-même est sûr.</p>" },
    { type: "piege", titre: "Le piège", img: "sc:port-charge", r408: ["DC1.e.01"],
      html: "<p>Porter une charge n'importe comment fatigue le dos et déséquilibre. Le bon geste : plier les jambes, garder le dos droit, porter la charge près du corps.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Devant un échafaudage réel ou en photo, nommez les trois éléments du garde-corps, puis dites ce qui manquerait si l'un d'eux était absent.</p>" },
  ]},

  M4: { ecrans: [
    { type: "notion", titre: "Un danger immédiat : s'arrêter", img: "sc:signaler-responsable", r408: ["DC1.c.02", "DC1.c.03"],
      html: "<p>Vous repérez un danger immédiat sur l'échafaudage ? Le réflexe est toujours le même : <strong>arrêtez-vous</strong>, faites <strong>descendre</strong> les personnes présentes, et <strong>prévenez</strong> votre responsable avant que quelqu'un ne monte.</p>" },
    { type: "notion", titre: "Un accident : protéger, alerter, secourir", img: "sc:alerte-secours", r408: ["DC1.c.01", "DC1.c.04"],
      html: "<p>Si un accident se produit, trois actions, dans l'ordre : <strong>protéger</strong> (écarter tout nouveau danger), <strong>alerter</strong> les secours (15, 18 ou 112), <strong>secourir</strong> seulement si vous savez le faire.</p>" },
    { type: "cle", titre: "La clé", r408: ["DC1.d.01", "DC1.d.02"],
      html: "<p>Un accident du travail est rarement dû à une seule cause : c'est souvent l'addition de plusieurs petits problèmes qui déclenche le dommage. Signaler une situation dangereuse à votre responsable — oralement ou par écrit — fait partie de votre travail, même si vous n'êtes pas certain du danger. Mieux vaut signaler pour rien que se taire.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Improviser un secours sans formation, ou réparer soi-même ce qui semble défectueux, aggrave souvent la situation. Ce n'est ni votre rôle, ni votre compétence.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Imaginez que vous trouviez un garde-corps démonté au pied de l'échafaudage : à qui le signalez-vous, et que faites-vous en attendant une réponse ?</p>" },
  ]},

  /* ---------- P1 · UTILISER ---------- */

  M5: { ecrans: [
    { type: "notion", titre: "L'échafaudage de pied", img: "sc:echafaudage-complet", r408: ["2.1.01"],
      html: "<p>L'<strong>échafaudage de pied</strong> repose au sol, sur ses appuis : c'est le plus courant sur un chantier de bâtiment. On en distingue deux types : à <strong>cadres</strong> (des cadres préfabriqués empilés) et <strong>multidirectionnel</strong> (des tubes assemblés par des colliers, plus modulable).</p>" },
    { type: "notion", titre: "Pied ou roulant : ne pas confondre", img: "sc:roulant-vs-pied", r408: ["R-08", "2.1.06", "2.4.13"],
      html: "<p>L'échafaudage <strong>roulant</strong> se déplace sur des roues : il relève d'une autre recommandation (la R457), pas de celle que vous préparez ici. Trois autres noms à connaître, sans plus : la <strong>console</strong> (une plateforme fixée au mur, en porte-à-faux) et l'échafaudage <strong>suspendu</strong> — hors programme. Une console ou un porte-à-faux sort toujours du montage simple appris ici : leur mise en œuvre suit une note de calcul propre, faite par une personne compétente.</p>" },
    { type: "notion", titre: "Le nom des pièces, et une classe affichée", img: "sc:etiquette-montant", r408: ["2.1.03", "2.1.04", "2.1.05"],
      html: "<p>Un échafaudage se décrit avec un vocabulaire précis : <strong>montant</strong> (poteau vertical), <strong>plancher</strong> (la surface où l'on marche), <strong>diagonale</strong> (barre qui rigidifie la structure). Chaque échafaudage porte aussi une <strong>classe</strong>, affichée sur son étiquette : elle dit combien de poids le plancher peut supporter. Vous apprendrez à la lire au module suivant.</p>" },
    { type: "notion", titre: "Protéger aussi pendant le montage", img: "sc:montage-niveau", r408: ["2.1.07"],
      html: "<p>Pendant le montage, le monteur est lui aussi exposé au risque de chute. La méthode <strong>MDS</strong> (Montage et Démontage en Sécurité) pose le garde-corps du niveau supérieur <strong>depuis le niveau du dessous</strong>, déjà protégé, avant que quiconque n'y monte : la protection collective du monteur, pas seulement de l'utilisateur.</p>" },
    { type: "cle", titre: "La clé", r408: ["2.1.02"],
      html: "<p>Reconnaître la famille d'un échafaudage avant d'y toucher : les règles de montage et d'usage ne sont pas les mêmes d'une famille à l'autre.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Une attestation obtenue pour l'échafaudage de pied ne couvre pas l'échafaudage roulant, et inversement. Ce sont deux formations séparées.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Observez un échafaudage de l'atelier ou d'une photo : est-il de pied ou roulant ? À quoi le voyez-vous ?</p>" },
  ]},

  M6: { ecrans: [
    { type: "notion", titre: "La notice du fabricant", img: "sc:notice-fabricant", r408: ["2.2.01", "2.2.02", "2.2.03"],
      html: "<p>Chaque échafaudage est livré avec une <strong>notice</strong> écrite par son fabricant. Elle fixe comment le monter, la charge que chaque <strong>plancher</strong> (la surface où l'on marche et travaille) supporte, et où placer les <strong>amarrages</strong> (les fixations qui relient la structure au mur).</p>" },
    { type: "notion", titre: "L'étiquette, sur le montant", img: "sc:etiquette-montant", r408: ["R-06"],
      html: "<p>Une <strong>étiquette</strong> est accrochée sur un <strong>montant</strong> (un des poteaux verticaux de la structure). Elle affiche la <strong>classe de charge</strong> de l'échafaudage et la charge admissible du plancher, et interdit l'accès aux personnes non autorisées.</p>" },
    { type: "notion", titre: "Les six classes de charge", img: "sc:plancher-surcharge", r408: ["R-06"],
      html: "<p>Une norme range les échafaudages en <strong>six classes de charge</strong>, selon le poids qu'un plancher supporte par mètre carré. Repères pour les trois premières : classe 1 environ <strong>75 kg/m²</strong> (inspection, sans stockage), classe 2 environ <strong>150 kg/m²</strong> (travaux légers), classe 3 environ <strong>200 kg/m²</strong> (travaux de façade, stockage limité). Les classes 4 à 6, plus lourdes, ne sont pas à détailler ici. La classe retenue est indiquée sur l'étiquette et dans la notice.</p>" },
    { type: "cle", titre: "La clé",
      html: "<p>Pas d'étiquette lisible, pas de montage : un échafaudage <strong>sans étiquette ne se monte pas</strong> et ne s'utilise pas.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Une étiquette abîmée, effacée, ou qui ne correspond pas à ce que vous voyez sur place, doit vous arrêter, comme une étiquette absente.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Retrouvez une notice ou une étiquette d'échafaudage, à l'atelier ou en photo : quelles informations y lisez-vous avant de monter ?</p>" },
  ]},

  M7: { ecrans: [
    { type: "notion", titre: "Entrer et sortir : toujours par l'intérieur", img: "sc:acces-interieur-trappe", r408: ["4.2.02"],
      html: "<p>On monte sur l'échafaudage par l'<strong>intérieur</strong> de la structure, par l'<strong>échelle d'accès</strong>, un niveau à la fois. Chaque niveau a sa <strong>trappe</strong> : une ouverture dans le plancher, qu'on referme après être passé.</p>" },
    { type: "notion", titre: "Vos équipements avant de monter", img: "sc:harnais-ancrage", r408: ["4.2.01"],
      html: "<p>Avant de monter sur l'échafaudage, vous portez vos équipements de protection individuelle : <strong>casque</strong>, <strong>chaussures de sécurité</strong>, <strong>gants</strong> adaptés au travail, une tenue qui ne s'accroche pas. Le harnais relié à un point d'ancrage ne s'ajoute que si la protection collective ne suffit pas.</p>" },
    { type: "piege", titre: "Le piège", img: "sc:acces-exterieur-interdit",
      html: "<p>Grimper par l'extérieur, en s'agrippant aux montants ou aux lisses, est interdit — même pour « gagner du temps ». On se retrouve alors au-dessus du vide, sans aucune protection.</p>" },
    { type: "notion", titre: "Le plancher et le garde-corps, complets", img: "sc:garde-corps-trois-elements", r408: ["4.2.04"],
      html: "<p>Avant de travailler sur un plancher, vérifiez qu'il est <strong>complet</strong>, et que le garde-corps l'est aussi, sur tout le tour. On ne <strong>modifie</strong> ni ne <strong>retire</strong> jamais un élément soi-même — et on ne laisse rien traîner au bord.</p>" },
    { type: "notion", titre: "Ne pas surcharger, surveiller le temps", img: "sc:plancher-surcharge", r408: ["4.2.03", "R-09", "R-12"],
      html: "<p>Chaque plancher a une charge maximale, indiquée sur l'étiquette : outils, matériaux, seaux — tout pèse, et on ne la dépasse jamais. Un stockage qui encombre le plancher ou dépasse cette charge se refuse. Par mauvais temps (vent fort, orage), le travail en hauteur s'arrête : on en parle à son responsable.</p>" },
    { type: "cle", titre: "La clé", r408: ["4.2.05"],
      html: "<p>Sur l'échafaudage : je range mes outils pour qu'ils ne tombent pas sur quelqu'un, et je préviens les autres si plusieurs équipes travaillent en même temps — c'est la <strong>coactivité</strong>.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Devant l'échafaudage de l'établissement, vérifiez l'accès, l'état du plancher et du garde-corps, et l'étiquette de charge.</p>" },
  ]},

  /* ---------- P2 · VÉRIFIER ---------- */

  M8: { ecrans: [
    { type: "notion", titre: "Qui vérifie, et quand", img: "sc:verification-checklist", r408: ["3.3.03", "3.3.04"],
      html: "<p>Une <strong>personne compétente</strong>, désignée par l'employeur, vérifie l'échafaudage à quatre moments fixés par la réglementation : à la <strong>mise en service</strong> (avant la première utilisation), à la <strong>remise en service</strong> (après une modification), chaque <strong>trimestre</strong>, et chaque <strong>jour</strong> avant le travail.</p>" },
    { type: "cle", titre: "La clé",
      html: "<p>Ce qui est constaté à chaque vérification, et les mesures prises, sont notés dans un <strong>registre de sécurité</strong>. Un échafaudage non vérifié <strong>ne se monte pas</strong>.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Un échafaudage qui « a l'air stable » n'est pas forcément vérifié. L'apparence ne remplace jamais la vérification.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Pour l'échafaudage de l'atelier, retrouvez qui l'a vérifié en dernier et à quel moment — étiquette ou registre.</p>" },
  ]},

  M9: { ecrans: [
    { type: "notion", titre: "L'examen de la structure", img: "codex:etat-montant-corrosion", r408: ["3.4.01", "3.4.02", "3.4.03", "3.4.04", "3.4.05", "3.4.10", "3.4.11", "3.4.12"],
      html: "<p>On regarde d'abord la structure : les appuis (semelle, cale, vérin) tiennent-ils, sans désordre ? L'échafaudage est-il bien vertical ? Les éléments de calage sont-ils tous en place ? Les montants ne sont ni <strong>déformés</strong> ni rongés par la <strong>corrosion</strong>, et aucune fixation ne joue. Les <strong>amarrages</strong> et les <strong>contreventements</strong> (les barres qui rigidifient) sont présents, en nombre, et bien serrés.</p>" },
    { type: "notion", titre: "Planchers et garde-corps", img: "sc:element-manquant", r408: ["3.4.06", "3.4.07", "3.4.08", "3.4.09"],
      html: "<p>Chaque niveau de plancher doit rester complet, plan, horizontal, et bien verrouillé — rien ne doit pouvoir se soulever, et la <strong>trappe</strong> doit se refermer normalement. Aucun plancher n'est <strong>encombré</strong> : on dégage ce qui traîne. Le garde-corps est vérifié sur toute sa longueur : une seule lisse manquante crée un vide dangereux, à signaler aussitôt.</p>" },
    { type: "notion", titre: "L'accès et les charges affichées", img: "sc:verification-checklist", r408: ["3.4.13", "3.4.14", "3.4.15"],
      html: "<p>On vérifie que l'accès fonctionne : échelle, trappe, et la <strong>troisième lisse</strong> qui sécurise la montée. On contrôle aussi que les indications de charge admissible restent bien visibles sur l'étiquette, et qu'aucune charge sur le plancher ne les dépasse.</p>" },
    { type: "notion", titre: "Pare-gravois et bâchage", img: "sc:vent-bache", r408: ["R-01", "R-02", "3.4.16"],
      html: "<p>Le <strong>pare-gravois</strong> (un écran ou un filet) protège les personnes en dessous contre la chute d'objets : sa présence impose un <strong>amarrage renforcé</strong>, à vérifier. Un <strong>bâchage</strong> ou des filets doivent rester bien fixés et continus sur toute la surface : un échafaudage bâché prend davantage le vent, un point de plus à surveiller chaque jour.</p>" },
    { type: "cle", titre: "La clé",
      html: "<p>Un seul point mauvais suffit : <strong>on ne monte pas</strong>, et on <strong>signale</strong> à son responsable.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Un défaut qui paraît petit — une cale légèrement de travers, une lisse qui bouge un peu — compte autant qu'un gros défaut : c'est la même règle qui s'applique.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Sur l'échafaudage de l'établissement, faites l'examen : appuis, plancher, garde-corps, montants, accès. Notez ce que vous trouvez.</p>" },
  ]},

  /* ---------- P3 · MONTER ---------- */

  M10: { ecrans: [
    { type: "notion", titre: "Le sol et les appuis", img: "sc:semelle-cale-verin", r408: ["2.4.03", "2.4.04", "2.4.05", "2.4.12"],
      html: "<p>Avant de monter un échafaudage, on choisit un sol capable de le porter. On règle une semelle, une cale si besoin, et un vérin sous chaque montant, pour que la structure soit stable et verticale.</p>" },
    { type: "notion", titre: "L'implantation et le balisage", img: "sc:coactivite-balisage", r408: ["2.3.02", "R-04"],
      html: "<p>On choisit aussi l'endroit exact où poser l'échafaudage — son <strong>implantation</strong> — en gardant la bonne distance avec la façade, prévue par la notice : un écart de plus de <strong>20 cm</strong> entre le plancher et la façade, sans protection, est un défaut à corriger. Un <strong>balisage</strong> au sol protège les personnes qui passent à proximité pendant le montage.</p>" },
    { type: "notion", titre: "Les amarrages prévus par la notice", img: "sc:amarrage-facade", r408: ["R-03"],
      html: "<p>La notice indique le nombre et la position des amarrages nécessaires pour stabiliser la structure contre la façade. On les prévoit avant de commencer, on ne les invente pas sur place.</p>" },
    { type: "piege", titre: "Le piège", img: "sc:harnais-ancrage", r408: ["2.3.06", "2.3.07", "2.3.08"],
      html: "<p>Monter sans ses <strong>EPI</strong> (casque, gants, chaussures de sécurité, et harnais si la notice l'exige pendant le montage) expose inutilement le monteur ; le harnais se clipse alors sur un point d'ancrage prévu sur l'échafaudage lui-même, jamais improvisé. Improviser un amarrage à la façade non prévu par la notice expose aussi.</p>" },
    { type: "notion", titre: "Réceptionner et vérifier le matériel", img: "sc:verification-checklist", r408: ["2.3.01", "2.3.03", "2.3.04", "2.3.05"],
      html: "<p>Avant de monter, on organise le chantier : une <strong>zone de travail</strong> et une <strong>zone de stockage</strong> sont délimitées. Le matériel livré est <strong>réceptionné</strong> et rangé à l'abri ; chaque élément est contrôlé, et un élément abîmé part au <strong>rebut</strong> : il ne se monte pas. On choisit enfin l'outillage nécessaire au montage prévu.</p>" },
    { type: "notion", titre: "Ce qui arrête un montage avant de commencer", img: "codex:ligne-electrique-echafaudage", r408: ["R-05", "R-07"],
      html: "<p>D'autres points arrêtent le montage avant qu'il ne commence. Une <strong>ligne électrique aérienne</strong> à proximité impose une distance de sécurité — <strong>3 mètres</strong> jusqu'à 50 000 volts, <strong>5 mètres</strong> au-delà : on signale, sans mesurer soi-même la tension. Et un échafaudage de pied doit toujours être <strong>ancré ou amarré</strong>, ou stabilisé par un moyen équivalent, avant d'être utilisé : sans cela, on ne monte pas dessus.</p>" },
    { type: "cle", titre: "La clé", r408: ["R-11"],
      html: "<p>Sol vérifié, implantation choisie, balisage posé, amarrages prévus, EPI portés : tout se prépare <strong>avant</strong> de monter le premier élément. Une fois l'échafaudage monté, un <strong>panneau</strong> y est fixé : conditions d'utilisation, accès interdit aux personnes non autorisées, charges admissibles — sans lui, personne n'utilise l'échafaudage.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Sur un emplacement de l'atelier, dites ce que vous vérifieriez avant d'y implanter un échafaudage : sol, appuis, distance aux obstacles.</p>" },
  ]},

  M11: { ecrans: [
    { type: "notion", titre: "L'ordre de montage, niveau par niveau", img: "sc:montage-niveau", r408: ["2.4.06", "2.4.07", "2.4.08", "2.4.09", "2.4.10"],
      html: "<p>On monte un échafaudage <strong>niveau par niveau</strong>, jamais en sautant une étape : montants, planchers, <strong>diagonales</strong> (les barres croisées qui rigidifient la structure), puis garde-corps. Le garde-corps d'un niveau est posé <strong>depuis le niveau du dessous</strong>, déjà protégé, avant que quiconque ne monte sur le plancher suivant.</p>" },
    { type: "notion", titre: "Le démontage : dans l'ordre inverse", img: "sc:demontage-ordre",
      html: "<p>On démonte dans l'<strong>ordre inverse</strong> du montage, niveau par niveau, en gardant les protections en place le plus longtemps possible. Chaque élément est passé <strong>de main en main</strong> jusqu'au sol — jamais jeté.</p>" },
    { type: "notion", titre: "Les gestes du monteur", img: "sc:montage-niveau", r408: ["2.4.01", "2.4.02", "2.4.11", "2.4.14"],
      html: "<p>Sur la structure, le monteur utilise ses <strong>EPI</strong> et son outillage à bon escient, sans les improviser. L'accès au niveau en cours de montage reste positionné et protégé comme les autres. Pour faire monter les éléments lourds, on les <strong>élingue</strong> (on les attache avec une sangle ou une chaîne) avant de les lever.</p>" },
    { type: "notion", titre: "Ancrages et panneau, à la fin du montage", img: "sc:amarrage-facade", r408: ["2.4.15", "2.4.16", "2.4.17", "2.4.18", "2.4.19"],
      html: "<p>Chaque <strong>ancrage</strong> (une fixation dans la façade) et chaque <strong>amarrage</strong> est mis en place selon la notice, puis sa résistance est vérifiée — parfois avec un <strong>extractomètre</strong>, un appareil qui mesure la force qu'un ancrage peut supporter. Une fois la structure montée, le <strong>panneau</strong> indiquant les charges admissibles est fixé bien visible.</p>" },
    { type: "cle", titre: "La clé", r408: ["2.4.20"],
      html: "<p>La protection collective reste la priorité, <strong>même pendant le montage</strong> : on ne travaille jamais sur un niveau sans son garde-corps. Une fois la structure montée, un <strong>autocontrôle</strong> compare le résultat à la notice, avant sa mise en service.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Monter au niveau supérieur avant que son garde-corps ne soit posé, ou jeter un élément au sol pour « aller plus vite », transforme un montage en danger.</p>" },
    { type: "activite", titre: "À vous",
      html: "<p>Sur une structure simple de l'atelier, décrivez l'ordre dans lequel vous monteriez les éléments, protections comprises.</p>" },
  ]},

};

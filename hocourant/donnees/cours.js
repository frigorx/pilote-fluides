/* ============================================================
   inerWeb HoCourant — le cours, module par module
   Écrans courts : un module se lit en moins de 10 minutes.
   Types d'écran : notion · cle · piege · schema · activite
   Règle des trois canaux : couleur + style de trait + mot.
   Les SVG sont faits main, texte hors des tracés, jamais à l'échelle.
   ============================================================ */

const COURS = {

  /* ---------- P0 · SOCLE ---------- */

  M1: { ecrans: [
    { type: "notion", titre: "L'électricité est utile, et invisible",
      html: "<p>L'électricité peut produire un choc, des brûlures, un incendie ou une explosion. Le risque apparaît quand une personne, un outil ou un matériau conducteur rencontre une énergie électrique dans de mauvaises conditions.</p><p><strong>Nommer le phénomène</strong> permet de choisir la bonne mesure de prévention.</p>" },
    { type: "notion", titre: "Contact direct ou contact indirect ?",
      html: "<ul><li><strong>Contact direct</strong> : une partie du corps touche une <strong>partie active</strong> normalement sous tension — conducteur dénudé, borne accessible, pièce nue.</li><li><strong>Contact indirect</strong> : une personne touche une <strong>masse</strong> métallique mise accidentellement sous tension par un défaut d'isolement.</li></ul><p>Dans les deux cas : ne pas toucher, faire cesser l'exposition, protéger l'accès, signaler.</p>" },
    { type: "notion", titre: "Les effets, et ce qui les aggrave",
      html: "<ul><li><strong>Électrisation</strong> : le courant traverse le corps et produit un effet, sans décès.</li><li><strong>Électrocution</strong> : l'électrisation entraîne le décès.</li><li><strong>Brûlures</strong> : externes ou internes.</li><li><strong>Arc électrique</strong> : chaleur, lumière, bruit, projections, surpression — il blesse sans contact.</li></ul><p>La gravité dépend de l'intensité, du temps de passage, du trajet dans le corps, de l'état de la peau, de l'humidité et de la nature du courant.</p>" },
    { type: "cle", titre: "La clé",
      html: "<p>L'électricité ne se voit pas, ne s'entend pas, ne se sent pas. Le premier réflexe professionnel n'est jamais de toucher : c'est de <strong>s'arrêter, protéger et signaler</strong>.</p>" },
    { type: "activite", titre: "À toi",
      html: "<p>Classe mentalement chaque situation — contact direct, contact indirect ou arc — puis dis ton premier réflexe sûr :</p><ul><li>un doigt proche d'un conducteur dénudé ;</li><li>une main sur une carcasse de machine en défaut ;</li><li>une projection lors d'un court-circuit ;</li><li>un câble abîmé trouvé au sol.</li></ul>" },
  ]},

  M2: { ecrans: [
    { type: "notion", titre: "L'habitude ne remplace pas l'analyse",
      html: "<p>Une installation peut avoir changé depuis la dernière fois. Avant toute action, on vérifie ce qui est réellement demandé et ce qui peut modifier le risque.</p><p><strong>La règle des cinq questions :</strong></p><ol><li>Quelle tâche m'est réellement confiée ?</li><li>Quelle installation ou quel matériel est concerné ?</li><li>Dans quel état électrique se trouve-t-il ?</li><li>Quelles personnes et quelles autres activités sont présentes ?</li><li>Quelles mesures de prévention sont prévues, et par qui ?</li></ol>" },
    { type: "notion", titre: "Les signaux qui imposent une pause",
      html: "<ul><li>Coffret ouvert, capot absent, pièce nue accessible.</li><li>Câble écrasé, prise cassée, odeur ou bruit anormal.</li><li>Eau, condensation, sol mouillé, espace métallique exigu.</li><li>Plan, repérage ou identité du circuit incertain.</li><li>Balisage déplacé, protection absente, nouvelle activité à côté (coactivité).</li></ul>" },
    { type: "cle", titre: "La clé",
      html: "<p>Dire <strong>« je ne sais pas »</strong> au bon moment est un comportement professionnel. Je m'arrête, je maintiens les autres à distance, je demande une information fiable.</p>" },
    { type: "activite", titre: "À toi",
      html: "<p>Choisis une situation réelle de l'atelier et déroule les cinq questions : tâche demandée, installation et état électrique, risque principal, mesure prioritaire et responsable.</p>" },
  ]},

  M3: { ecrans: [
    { type: "notion", titre: "L'ordre des mesures de prévention",
      html: "<p>La prévention n'est pas une collection d'accessoires. L'ordre est imposé :</p><ol><li><strong>Supprimer le risque</strong> à la source — d'abord travailler hors tension quand c'est possible.</li><li><strong>Protéger collectivement</strong> : obstacle, écran, nappe isolante, balisage, condamnation.</li><li><strong>Compléter par les EPI</strong> adaptés, en dernier.</li></ol><p>La protection collective protège plusieurs personnes et ne dépend pas du comportement de chacun.</p>" },
    { type: "notion", titre: "Les EPI : adaptés et vérifiés",
      html: "<ul><li>Protection de la tête, des yeux et du visage selon le risque.</li><li>Gants isolants de classe adaptée, <strong>vérifiés avant chaque usage</strong>.</li><li>Vêtement de protection défini par l'analyse du risque.</li><li>Équipement propre, sec, stocké et contrôlé.</li></ul><p>Un EPI abîmé, humide, périmé ou inadapté est <strong>écarté et signalé</strong>.</p>" },
    { type: "notion", titre: "La VAT : le bon appareil, la bonne méthode",
      html: "<p>La <strong>vérification d'absence de tension</strong> se fait avec un dispositif prévu pour cette fonction, jamais avec n'importe quel testeur.</p><ol><li>Contrôler le bon fonctionnement du dispositif <strong>avant</strong>.</li><li>Effectuer la VAT sur <strong>tous les conducteurs</strong> prévus.</li><li>Contrôler de nouveau le dispositif <strong>après</strong>.</li></ol>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Un multimètre ordinaire ne remplace pas automatiquement le dispositif prescrit. Et si le dispositif ne fonctionne plus au contrôle d'après, <strong>la vérification n'est pas validée</strong> : on reprend selon la procédure.</p>" },
    { type: "activite", titre: "À toi",
      html: "<p>Devant le matériel réel : nomme ce que tu vérifies avant usage sur des gants isolants, un dispositif de VAT, un écran ou une nappe, un outillage isolé.</p>" },
  ]},

  M4: { ecrans: [
    { type: "notion", titre: "Quatre domaines de tension",
      html: "<p>La norme classe les installations selon la tension nominale. En courant <strong>alternatif</strong> (les valeurs en courant continu diffèrent) :</p><ul><li><strong>TBT</strong> — très basse tension : jusqu'à <strong>50 V</strong> (120 V en continu).</li><li><strong>BT</strong> — basse tension : de 50 à <strong>1 000 V</strong> (120 à 1 500 V en continu).</li><li><strong>HTA</strong> — haute tension A : de 1 000 V à <strong>50 000 V</strong>.</li><li><strong>HTB</strong> — haute tension B : au-delà de 50 000 V.</li></ul>" },
    { type: "schema", titre: "L'échelle des domaines (courant alternatif)",
      html: "<svg viewBox='0 0 640 190' role='img' aria-labelledby='m4svgT m4svgD'><title id='m4svgT'>Échelle des domaines de tension en courant alternatif</title><desc id='m4svgD'>Quatre segments successifs : TBT jusqu'à 50 volts, BT jusqu'à 1000 volts, HTA jusqu'à 50000 volts, HTB au-delà.</desc><rect x='20' y='70' width='90' height='34' rx='6' fill='#e3f5ec' stroke='#1e7e54' stroke-width='2'/><rect x='110' y='70' width='170' height='34' rx='6' fill='#fffdf8' stroke='#1b3a63' stroke-width='2'/><rect x='280' y='70' width='170' height='34' rx='6' fill='#fff4e0' stroke='#b06a00' stroke-width='2' stroke-dasharray='7 4'/><rect x='450' y='70' width='170' height='34' rx='6' fill='#fbe7e4' stroke='#c0392b' stroke-width='2' stroke-dasharray='2 3'/><text x='65' y='92' text-anchor='middle' font-size='15' font-weight='bold' fill='#10233c'>TBT</text><text x='195' y='92' text-anchor='middle' font-size='15' font-weight='bold' fill='#10233c'>BT</text><text x='365' y='92' text-anchor='middle' font-size='15' font-weight='bold' fill='#10233c'>HTA</text><text x='535' y='92' text-anchor='middle' font-size='15' font-weight='bold' fill='#10233c'>HTB</text><text x='110' y='130' text-anchor='middle' font-size='13' fill='#10233c'>50 V</text><text x='280' y='130' text-anchor='middle' font-size='13' fill='#10233c'>1 000 V</text><text x='450' y='130' text-anchor='middle' font-size='13' fill='#10233c'>50 000 V</text><text x='20' y='40' font-size='13' fill='#637285'>Domaines de tension — repères en courant alternatif, schéma non à l'échelle</text><text x='195' y='160' text-anchor='middle' font-size='13' fill='#1b3a63'>230 V et 400 V : le quotidien du métier, en BT</text></svg>" },
    { type: "cle", titre: "La clé",
      html: "<p>Le <strong>230 V</strong> d'une prise et le <strong>400 V</strong> d'un moteur triphasé sont tous les deux en <strong>BT</strong> — le domaine où se passent presque toutes les opérations du frigoriste. « Basse » tension ne veut pas dire « sans danger » : la tension limite de sécurité est à <strong>50 V</strong>.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Le premier caractère d'un symbole d'habilitation suit le domaine : <strong>B</strong> pour la basse et très basse tension, <strong>H</strong> pour la haute tension. Un titulaire B n'a rien à faire dans un périmètre H.</p>" },
  ]},

  M5: { ecrans: [
    { type: "notion", titre: "Ce que le courant fait au corps",
      html: "<p>C'est l'<strong>intensité</strong> qui traverse le corps qui blesse, pas la tension seule. Ordres de grandeur enseignés, en courant alternatif 50 Hz :</p><ul><li><strong>0,5 mA</strong> — seuil de perception : picotement.</li><li><strong>10 mA</strong> — contraction musculaire : on ne peut plus lâcher.</li><li><strong>25 à 30 mA</strong> — la respiration se bloque si le contact se maintient.</li><li><strong>40 mA et plus</strong> — risque de fibrillation du cœur, selon la durée.</li></ul>" },
    { type: "notion", titre: "La durée, le trajet, la fréquence",
      html: "<p>Trois facteurs aggravent un même courant :</p><ul><li><strong>La durée</strong> : quelques dixièmes de seconde de plus changent le pronostic — c'est pourquoi les disjoncteurs différentiels <strong>30 mA</strong> coupent si vite.</li><li><strong>Le trajet</strong> : main-main ou main-pied traverse le cœur.</li><li><strong>La fréquence</strong> : le 50 Hz du réseau est particulièrement dangereux pour le cœur.</li></ul><p>La peau mouillée divise fortement la résistance du corps : même tension, courant plus grand.</p>" },
    { type: "cle", titre: "La clé",
      html: "<p>Un différentiel « haute sensibilité » porte le seuil de <strong>30 mA</strong> : il protège les personnes, pas seulement l'installation. Il ne dispense d'aucune règle de prévention.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>« Le 230 V, j'ai déjà pris une châtaigne, ça va. » Même tension, autre jour, peau humide, trajet par le cœur, impossibilité de lâcher : l'issue peut être mortelle. <strong>Aucune électrisation n'est anodine</strong> — toutes nécessitent une prise en charge médicale.</p>" },
  ]},

  /* ---------- P1 · B0 / H0 / H0V ---------- */

  M6: { ecrans: [
    { type: "notion", titre: "Qui habilite, et que prouve un symbole ?",
      html: "<p>L'<strong>habilitation</strong> est la reconnaissance, par l'<strong>employeur</strong>, de la capacité d'une personne à accomplir en sécurité les tâches confiées vis-à-vis du risque électrique (Code du travail, art. R4544-10).</p><ol><li>Recevoir une formation théorique et pratique.</li><li>Être évalué sur les savoirs et les gestes.</li><li>Recevoir de l'employeur un <strong>titre écrit</strong> avec des limites précises.</li></ol><p>Le formateur donne un <strong>avis</strong>. L'employeur <strong>décide</strong>. Une attestation de formation n'est pas un titre d'habilitation.</p>" },
    { type: "notion", titre: "Lire un symbole sans deviner",
      html: "<ul><li><strong>1er caractère</strong> — le domaine : <strong>B</strong> basse et très basse tension, <strong>H</strong> haute tension.</li><li><strong>2e caractère</strong> — le rôle : <strong>0</strong> ordre non électrique, <strong>1</strong> exécutant, <strong>2</strong> chargé de travaux, <strong>R</strong> intervention générale, <strong>S</strong> intervention élémentaire, <strong>E</strong> opérations spécifiques, <strong>C</strong> consignation.</li><li><strong>Lettre additionnelle</strong> — <strong>V</strong> : voisinage renforcé. Un symbole E reçoit un attribut : Manœuvre, Mesurage, Vérification ou Essai.</li></ul>" },
    { type: "cle", titre: "La clé",
      html: "<p>Le symbole ne dit pas tout : le <strong>titre</strong> précise les installations, les tâches, les tensions et les limites. Un même symbole ne donne pas le droit d'agir partout. Et l'habilitation ne remplace jamais la compétence technique du métier.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Brancher et utiliser normalement un appareil en bon état n'exige pas d'habilitation — une sensibilisation au risque suffit. À l'inverse, <strong>aucune démonstration ne devient une autorisation implicite</strong> : les élèves et les jeunes en formation sont protégés, les mises en situation sont décidées et encadrées par l'établissement.</p>" },
    { type: "activite", titre: "À toi",
      html: "<p>Décode chaque symbole et donne une limite essentielle : B0 · BS · BE Manœuvre · B1V · BR.</p>" },
  ]},

  M7: { ecrans: [
    { type: "notion", titre: "Des zones autour des pièces nues sous tension",
      html: "<p>Autour d'une pièce nue sous tension, la norme définit des zones. Elles dépendent du domaine de tension et du lieu ; elles sont matérialisées par une porte, une enveloppe, un obstacle ou un balisage.</p><p>Repères publics, en champ libre :</p><ul><li><strong>Distance limite de voisinage simple</strong> : <strong>3 m</strong> jusqu'à 50 000 V — <strong>5 m</strong> au-delà.</li><li><strong>Zone de voisinage renforcé BT</strong> : à moins de <strong>0,30 m</strong> d'une pièce nue sous tension BT.</li><li>En haute tension, la zone de voisinage renforcé s'étend à <strong>2 m</strong> (HTA) — les valeurs applicables sont enseignées pour l'installation concernée.</li></ul>" },
    { type: "schema", titre: "Le principe des zones (BT, schéma non à l'échelle)",
      html: "<svg viewBox='0 0 640 240' role='img' aria-labelledby='m7svgT m7svgD'><title id='m7svgT'>Zones autour d'une pièce nue sous tension en basse tension</title><desc id='m7svgD'>Trois zones concentriques : au-delà de 3 mètres hors zone, entre 3 mètres et 30 centimètres zone de voisinage simple, à moins de 30 centimètres zone de voisinage renforcé.</desc><rect x='20' y='30' width='600' height='150' rx='10' fill='#fffdf8' stroke='#1b3a63' stroke-width='2'/><rect x='150' y='55' width='440' height='100' rx='8' fill='#fff4e0' stroke='#b06a00' stroke-width='2' stroke-dasharray='7 4'/><rect x='390' y='78' width='180' height='54' rx='6' fill='#fbe7e4' stroke='#c0392b' stroke-width='2' stroke-dasharray='2 3'/><circle cx='545' cy='105' r='10' fill='#c0392b'/><text x='545' y='150' text-anchor='middle' font-size='12' fill='#c0392b'>pièce nue sous tension</text><text x='85' y='105' text-anchor='middle' font-size='13' fill='#10233c'>hors zone</text><text x='265' y='105' text-anchor='middle' font-size='13' fill='#10233c'>voisinage simple</text><text x='428' y='100' font-size='13' fill='#10233c'>voisinage</text><text x='428' y='116' font-size='13' fill='#10233c'>renforcé</text><text x='150' y='205' text-anchor='middle' font-size='13' fill='#1b3a63'>3 m</text><text x='390' y='205' text-anchor='middle' font-size='13' fill='#1b3a63'>0,30 m</text><line x1='150' y1='180' x2='150' y2='192' stroke='#1b3a63' stroke-width='2'/><line x1='390' y1='180' x2='390' y2='192' stroke='#1b3a63' stroke-width='2'/><text x='20' y='20' font-size='13' fill='#637285'>Principe des zones en BT — schéma non à l'échelle, les dessins ne remplacent pas les documents de l'installation</text><text x='320' y='232' text-anchor='middle' font-size='13' fill='#637285'>Entrer dans une zone exige le symbole, l'instruction et les protections prévues</text></svg>" },
    { type: "notion", titre: "Les acteurs à reconnaître",
      html: "<ul><li><strong>Chargé d'exploitation électrique</strong> : organise l'exploitation, transmet les informations.</li><li><strong>Chargé de consignation</strong> : réalise la consignation dans son périmètre.</li><li><strong>Chargé de travaux</strong> : prépare, dirige, fait respecter les mesures.</li><li><strong>Exécutant</strong> : réalise la tâche confiée, dans ses limites.</li><li><strong>Chargé d'intervention</strong> : organise et réalise l'intervention autorisée.</li></ul>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Tes mains peuvent rester hors d'une zone pendant qu'une <strong>longue pièce métallique</strong> — tube, règle, escabeau — la franchit. L'analyse porte sur le corps ET sur ce qu'il tient. Une limite déplacée, tombée ou illisible n'est plus une protection : <strong>arrêt, distance, compte rendu</strong> — on ne la remet jamais « au jugé ».</p>" },
  ]},

  M8: { ecrans: [
    { type: "notion", titre: "L'indice 0 : aucune opération d'ordre électrique",
      html: "<p>B0, H0 et H0V concernent des opérations d'<strong>ordre non électrique</strong> dans un environnement électrique : nettoyage, peinture, manutention, travail mécanique, pose d'un support — dans une zone préparée, avec la tâche, le chemin d'accès et les limites expliqués avant.</p><p><strong>H0V</strong> : le même rôle, en haute tension, dans le périmètre de voisinage prévu.</p>" },
    { type: "notion", titre: "Les interdictions essentielles",
      html: "<ul><li>Ne pas ouvrir un coffret ni retirer une protection.</li><li>Ne pas remplacer prise, interrupteur, fusible ou conducteur.</li><li>Ne pas réarmer un dispositif, sauf manœuvre explicitement confiée avec le symbole adapté.</li><li>Ne pas franchir une limite ni déplacer un balisage.</li></ul>" },
    { type: "cle", titre: "La clé",
      html: "<p>L'indice 0 n'est pas « un niveau débutant qui permet d'essayer ». Finir une tâche ne passe <strong>jamais</strong> avant respecter une limite. Si l'outil, le matériau ou ton corps risque de dépasser la limite : tu t'arrêtes <strong>avant</strong>.</p>" },
    { type: "activite", titre: "À toi",
      html: "<p>Oui, non, ou j'arrête ? — peindre un mur dans la zone préparée · ouvrir le tableau pour chercher la panne · déplacer le balisage pour passer un escabeau · signaler un câble endommagé.</p>" },
  ]},

  M12: { ecrans: [
    { type: "notion", titre: "Protéger sans s'exposer",
      html: "<p>Face à un accident électrique, la priorité : empêcher un nouveau contact, faire couper l'énergie par un moyen sûr, appeler les secours.</p><ul><li><strong>Ne touche pas la victime</strong> tant que le risque n'est pas supprimé.</li><li>Éloigne les autres, empêche l'accès.</li><li>En haute tension, ou si la coupure est impossible : rester à distance, faire intervenir les personnes compétentes.</li></ul>" },
    { type: "notion", titre: "Alerter précisément — 112, 18 ou 15",
      html: "<ol><li>Le lieu précis et l'accès.</li><li>La nature du risque électrique.</li><li>Le nombre et l'état apparent des victimes.</li><li>Ce qui a déjà été fait.</li><li>Ne raccrocher que quand l'opérateur le demande.</li></ol><p>Une fois la zone sûre : les gestes de premiers secours <strong>appris</strong>, le défibrillateur si l'organisation le prévoit.</p>" },
    { type: "cle", titre: "La clé",
      html: "<p>Le meilleur sauveteur est celui qui <strong>ne devient pas la deuxième victime</strong>. Et toute électrisation, même « légère », nécessite une prise en charge médicale.</p>" },
    { type: "notion", titre: "Incendie d'origine électrique, presque-accident",
      html: "<ul><li>Donner l'alarme, faire couper l'énergie sans s'exposer.</li><li>N'employer qu'un moyen d'extinction <strong>adapté</strong>, si l'on est formé — jamais d'eau sur une installation qui peut être sous tension.</li><li>Pas de remise en service sans autorisation et contrôle.</li></ul><p>Un <strong>presque-accident</strong> — étincelle, protection déclenchée, geste arrêté à temps — se signale et s'analyse : décrire les faits, trouver la cause, décider une action, vérifier qu'elle est faite.</p>" },
  ]},

  /* ---------- P2 · BS / BE Manœuvre ---------- */

  M9: { ecrans: [
    { type: "notion", titre: "Hors tension : à prouver, jamais à supposer",
      html: "<p>Travailler hors tension supprime le risque de choc — à condition que la mise en sécurité soit <strong>complète et maintenue</strong>. Un bouton sur arrêt, un écran éteint, un moteur silencieux ne prouvent rien.</p><p>La <strong>consignation</strong> enchaîne des étapes dans l'ordre :</p>" },
    { type: "schema", titre: "Les étapes de la consignation",
      html: "<svg viewBox='0 0 640 260' role='img' aria-labelledby='m9svgT m9svgD'><title id='m9svgT'>Les étapes ordonnées de la consignation</title><desc id='m9svgD'>Préidentifier, séparer, condamner, identifier sur place, vérifier l'absence de tension, puis mise à la terre et en court-circuit lorsqu'elle est prescrite.</desc><g font-size='14' fill='#10233c'><rect x='20' y='20' width='290' height='36' rx='8' fill='#fffdf8' stroke='#1b3a63' stroke-width='2'/><text x='35' y='43'><tspan font-weight='bold'>1.</tspan> Préidentifier l'installation</text><rect x='20' y='64' width='290' height='36' rx='8' fill='#fffdf8' stroke='#1b3a63' stroke-width='2'/><text x='35' y='87'><tspan font-weight='bold'>2.</tspan> Séparer de toutes les sources</text><rect x='20' y='108' width='290' height='36' rx='8' fill='#fffdf8' stroke='#1b3a63' stroke-width='2'/><text x='35' y='131'><tspan font-weight='bold'>3.</tspan> Condamner en position ouverte</text><rect x='330' y='20' width='290' height='36' rx='8' fill='#fffdf8' stroke='#1b3a63' stroke-width='2'/><text x='345' y='43'><tspan font-weight='bold'>4.</tspan> Identifier sur le lieu de travail</text><rect x='330' y='64' width='290' height='36' rx='8' fill='#e3f5ec' stroke='#1e7e54' stroke-width='3'/><text x='345' y='87'><tspan font-weight='bold'>5.</tspan> Vérifier l'absence de tension</text><rect x='330' y='108' width='290' height='36' rx='8' fill='#fff4e0' stroke='#b06a00' stroke-width='2' stroke-dasharray='7 4'/><text x='345' y='131'><tspan font-weight='bold'>6.</tspan> MALT et court-circuit si prescrite</text></g><text x='20' y='180' font-size='13' fill='#1b3a63' font-weight='bold'>La VAT (étape 5) : dispositif prescrit, contrôlé avant ET après, sur tous les conducteurs.</text><text x='20' y='205' font-size='13' fill='#637285'>L'étape 6 est prescrite selon l'installation (risque de réalimentation, réseaux étendus, haute tension).</text><text x='20' y='230' font-size='13' fill='#637285'>Une erreur de repérage à l'étape 1 rend toute la suite fausse.</text></svg>" },
    { type: "notion", titre: "Condamner, c'est empêcher le retour",
      html: "<p>La <strong>condamnation</strong> maintient l'organe de séparation ouvert et empêche une remise sous tension non voulue : dispositif prévu, identification claire, gestion des clés selon les documents du site.</p><p><strong>On ne retire jamais la condamnation d'une autre personne.</strong></p>" },
    { type: "notion", titre: "Les documents qui tracent la sécurité",
      html: "<ul><li><strong>Attestation de consignation</strong> : le chargé de consignation atteste au chargé de travaux que la zone est consignée.</li><li><strong>Autorisation de travail</strong> : l'ordre écrit qui déclenche l'opération.</li><li><strong>Instructions de sécurité</strong> : les consignes particulières du site.</li><li><strong>Avis de fin de travail</strong> : le travail est terminé, personnes et outils recensés — la déconsignation peut commencer.</li></ul><p>La <strong>déconsignation</strong> et la remise sous tension reviennent aux personnes autorisées, dans l'ordre prévu. Jamais « pour voir si ça marche ».</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Une commande locale d'arrêt ne <strong>sépare</strong> pas forcément de toutes les sources : condensateurs, seconde alimentation, circuits de commande. La séparation suit la procédure, pas l'intuition.</p>" },
  ]},

  M10: { ecrans: [
    { type: "notion", titre: "BS — une intervention élémentaire, définie",
      html: "<p>Le chargé d'intervention <strong>BS</strong> réalise <strong>seul</strong>, hors tension et hors voisinage renforcé, des remplacements ou raccordements élémentaires sur circuits terminaux :</p><ul><li>remplacement à l'identique d'une lampe, d'un interrupteur, d'un socle, d'un fusible ;</li><li>raccordement d'un matériel sur circuit en attente, protégé et identifié ;</li><li>sa propre mise en sécurité, la VAT et la remise en service selon la procédure.</li></ul><p><strong>Repères publics INRS</strong> — circuit terminal : au plus 400 V alternatif ou 600 V continu ; protection au plus 32 A alternatif ou 16 A continu ; conducteurs au plus 6 mm² cuivre ou 10 mm² aluminium. Le titre peut être plus restrictif. Le BS ne dirige personne.</p>" },
    { type: "notion", titre: "BE Manœuvre — commander, pas dépanner",
      html: "<p>Le <strong>BE Manœuvre</strong> actionne un organe de commande ou de protection : marche, arrêt, mise hors ou sous tension, réarmement <strong>prévu par l'instruction</strong>.</p><ul><li>Rester devant l'organe prévu, suivre l'instruction.</li><li>Ne pas enlever un capot pour chercher la panne.</li><li>Ne pas remplacer de composant.</li><li>S'arrêter si le défaut se répète ou si la situation diffère.</li></ul>" },
    { type: "cle", titre: "La clé",
      html: "<p>La question à se poser : est-ce un <strong>remplacement ou raccordement élémentaire</strong> (BS), ou seulement une <strong>commande normale</strong> (BE Manœuvre) ? Une opération qui dépasse <strong>une seule</strong> limite sort du cadre.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Réarmer trois fois n'est pas un diagnostic — c'est une machine qui insiste pour qu'on l'écoute. Un défaut qui réapparaît : <strong>arrêt et compte rendu</strong>. Mesurer une tension pour diagnostiquer n'est pas une manœuvre : c'est hors du rôle BE Manœuvre.</p>" },
  ]},

  /* ---------- P3 · B1 / B1V ---------- */

  M11: { ecrans: [
    { type: "notion", titre: "B1, B1V — exécuter sous direction",
      html: "<p>L'exécutant <strong>B1</strong> réalise des <strong>travaux d'ordre électrique</strong> en basse tension, sous la direction d'un chargé de travaux (B2). <strong>B1V</strong> ajoute l'exécution dans la zone de voisinage renforcé BT prévue.</p><ul><li>Respecter le titre, les limites, la zone de travail.</li><li>Utiliser le matériel et les protections prescrits.</li><li>Rendre compte : avancement, fin, toute anomalie.</li></ul><p>Ces symboles supposent une <strong>compétence technique en électricité</strong> adaptée aux opérations.</p>" },
    { type: "notion", titre: "Deux preuves, jamais une seule",
      html: "<p>La formation à l'habilitation enseigne la <strong>prévention du risque</strong>. Elle n'enseigne pas le métier d'électricien. En froid et climatisation, remplacer un composant électrique, modifier un câblage ou chercher une panne exige <strong>à la fois</strong> :</p><ol><li>savoir techniquement faire ;</li><li>être autorisé à le faire dans ce contexte — symbole, désignation, procédure, environnement.</li></ol>" },
    { type: "cle", titre: "La clé",
      html: "<p>Une instruction ambiguë ne s'interprète pas : on demande au chargé de travaux de <strong>préciser avant d'agir</strong>. Un B1V à qui l'on demande seul un dépannage relevant de BR <strong>refuse</strong> et demande une désignation adaptée.</p>" },
    { type: "activite", titre: "À toi",
      html: "<p>Dans un remplacement de contacteur : qui est chargé d'exploitation, qui est chargé de travaux, qui exécute ? Quels documents circulent, et quelle condition impose l'arrêt ?</p>" },
  ]},

  /* ---------- P4 · BR ---------- */

  M13: { ecrans: [
    { type: "notion", titre: "BR — l'intervention générale BT",
      html: "<p>Le <strong>chargé d'intervention générale BR</strong> organise et réalise des interventions d'entretien et de dépannage sur une installation ou un équipement BT <strong>de faible étendue</strong> :</p><ul><li>recherche de panne, mesures nécessaires ;</li><li>remplacement de matériel défectueux ;</li><li>essais, mise en service partielle dans le périmètre ;</li><li>échange avec le chargé d'exploitation, compte rendu.</li></ul><p>Le BR réalise <strong>sa propre mise en sécurité</strong> (consignation pour son propre compte) et peut être accompagné d'un exécutant.</p>" },
    { type: "notion", titre: "Les repères du périmètre BR",
      html: "<p>Repères souvent enseignés pour les interventions BT générales : installations en <strong>basse tension</strong>, circuits protégés contre les courts-circuits ; un repère de <strong>500 V</strong> est fréquemment cité pour le domaine d'intervention.</p><p>⚠️ Ce repère n'est pas une limite générale de « tout ce que fait un BR » : la limite réelle est celle du <strong>titre</strong>, de l'<strong>installation</strong> et de la <strong>norme applicable</strong> — elles peuvent être plus restrictives.</p>" },
    { type: "cle", titre: "La clé",
      html: "<p><strong>BR n'est jamais une autorisation générale de travailler sous tension.</strong> Les éventuelles opérations en présence de tension restent strictement limitées par la norme, le titre, la procédure et la formation pratique. La préparation, le matériel, la zone et les conditions d'arrêt sont définis <strong>avant</strong> le geste.</p>" },
    { type: "piege", titre: "Le piège",
      html: "<p>Une <strong>modification complète d'armoire</strong> n'est pas une intervention de faible étendue : elle dépasse le cadre BR et relève d'un chantier de travaux (B2 et son équipe). Savoir dire « c'est hors de mon rôle » fait partie du rôle.</p>" },
  ]},
};

(() => {
  "use strict";

  const shell = (id, title, desc, body) => `
    <svg viewBox="0 0 720 420" role="img" aria-labelledby="${id}-title ${id}-desc">
      <title id="${id}-title">${title}</title>
      <desc id="${id}-desc">${desc}</desc>
      <defs>
        <marker id="arrow-${id}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#1b3a63"/></marker>
        <pattern id="warm-${id}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10L10 0" stroke="#c9451a" stroke-width="2"/></pattern>
        <pattern id="cool-${id}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#3d7fca"/></pattern>
      </defs>${body}
    </svg>`;

  const network = (id, active = 1) => shell(id,
    "Fonction de production et réseau d’eau",
    "Un générateur transfère de l’énergie à l’eau du réseau. Le retour entre dans le générateur et le départ en sort vers les émetteurs.",
    `<rect x="40" y="76" width="210" height="260" rx="24" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     <text x="145" y="112" text-anchor="middle" font-size="22" font-weight="700">GÉNÉRATEUR</text>
     <path d="M85 265C95 205 120 190 145 145C170 190 195 205 205 265Z" fill="url(#warm-${id})" stroke="#c9451a" stroke-width="4"/>
     <text x="145" y="305" text-anchor="middle" font-size="17">fonction : échanger</text>
     <path d="M250 145H455" fill="none" stroke="#c9451a" stroke-width="12" marker-end="url(#arrow-${id})"/>
     <path d="M455 292H250" fill="none" stroke="#3d7fca" stroke-width="12" marker-end="url(#arrow-${id})"/>
     <rect x="475" y="112" width="190" height="215" rx="22" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     <path d="M515 160v115m36-115v115m36-115v115m36-115v115" stroke="#1b3a63" stroke-width="11" stroke-linecap="round"/>
     <text x="570" y="305" text-anchor="middle" font-size="18" font-weight="700">USAGES</text>
     <text x="355" y="124" text-anchor="middle" font-size="18" font-weight="700">DÉPART →</text>
     <text x="355" y="329" text-anchor="middle" font-size="18" font-weight="700">← RETOUR</text>
     <g transform="translate(48 34)"><rect width="204" height="30" rx="15" fill="#1b3a63"/><text x="102" y="21" text-anchor="middle" font-size="14" fill="#fff" style="fill:#fff">Bloc actif : ${active}</text></g>`);

  const technologies = shell("prod-tech", "Fonction commune, technologies différentes",
    "Trois équipements différents alimentent la même boucle : une chaudière reconnaissable à sa flamme, une pompe à chaleur à son ventilateur d’unité extérieure, un groupe d’eau glacée à son compresseur et son givre. Leur fonction hydraulique commune ne suffit pas à décrire leur technologie.",
    `<text x="360" y="42" text-anchor="middle" font-size="22" font-weight="700">UNE FONCTION · PLUSIEURS TECHNOLOGIES</text>
     <g fill="#fffdf8" stroke="#1b3a63" stroke-width="3">
       <rect x="42" y="85" width="190" height="135" rx="18"/><rect x="265" y="85" width="190" height="135" rx="18"/><rect x="488" y="85" width="190" height="135" rx="18"/>
     </g>
     <path d="M120 200C104 182 132 174 123 158C152 176 136 184 152 200" fill="none" stroke="#c9451a" stroke-width="6" stroke-linecap="round"/>
     <path d="M96 206H178" stroke="#1b3a63" stroke-width="4"/>
     <text x="137" y="122" text-anchor="middle" font-size="18" font-weight="700">Chaudière</text><text x="137" y="144" text-anchor="middle" font-size="13">brûle un combustible</text>
     <circle cx="330" cy="176" r="26" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     <path d="M330 176L330 154M330 176L349 187M330 176L311 187" stroke="#1b3a63" stroke-width="5" stroke-linecap="round"/>
     <path d="M368 158V194M382 158V194M396 158V194" stroke="#3d7fca" stroke-width="3"/>
     <text x="360" y="122" text-anchor="middle" font-size="18" font-weight="700">Pompe à chaleur</text><text x="360" y="144" text-anchor="middle" font-size="13">prend l’énergie dehors</text>
     <rect x="524" y="160" width="52" height="34" rx="8" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     <path d="M536 177H564M550 163V191" stroke="#1b3a63" stroke-width="3"/>
     <path d="M612 158L612 194M598 165L626 187M626 165L598 187" stroke="#3d7fca" stroke-width="4" stroke-linecap="round"/>
     <text x="583" y="122" text-anchor="middle" font-size="18" font-weight="700">Groupe d’eau glacée</text><text x="583" y="144" text-anchor="middle" font-size="13">produit du froid</text>
     <path d="M137 220L300 290M360 220v70M583 220L420 290" fill="none" stroke="#3d7fca" stroke-width="7" marker-end="url(#arrow-prod-tech)"/>
     <rect x="250" y="290" width="220" height="88" rx="22" fill="url(#warm-prod-tech)" stroke="#c9451a" stroke-width="4"/>
     <text x="360" y="329" text-anchor="middle" font-size="19" font-weight="700">TRANSFÉRER L’ÉNERGIE</text><text x="360" y="355" text-anchor="middle" font-size="16">fonction hydraulique</text>`);

  const measurements = shell("prod-measure", "Points de contrôle d’un générateur",
    "Des points de mesure sont placés sur le départ et le retour. Le débit est contrôlé sur le circuit. Les valeurs doivent être comparées au dossier de l’installation.",
    `<rect x="250" y="120" width="220" height="180" rx="24" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
     <text x="360" y="205" text-anchor="middle" font-size="24" font-weight="700">GÉNÉRATEUR</text>
     <path d="M470 155H640" stroke="#c9451a" stroke-width="12" marker-end="url(#arrow-prod-measure)"/><path d="M640 265H470" stroke="#3d7fca" stroke-width="12" marker-end="url(#arrow-prod-measure)"/>
     <circle cx="535" cy="155" r="25" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="535" y="162" text-anchor="middle" font-size="17" font-weight="700">T₁</text>
     <circle cx="535" cy="265" r="25" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/><text x="535" y="272" text-anchor="middle" font-size="17" font-weight="700">T₂</text>
     <rect x="65" y="174" width="145" height="72" rx="14" fill="url(#cool-prod-measure)" stroke="#3d7fca" stroke-width="4"/><text x="138" y="206" text-anchor="middle" font-size="18" font-weight="700">DOSSIER</text><text x="138" y="230" text-anchor="middle" font-size="15">conditions attendues</text>
     <path d="M210 210H250" stroke="#1b3a63" stroke-width="5" marker-end="url(#arrow-prod-measure)"/>
     <text x="575" y="110" text-anchor="middle" font-size="16" font-weight="700">DÉPART</text><text x="575" y="321" text-anchor="middle" font-size="16" font-weight="700">RETOUR</text>`);

  const loadScene = (value = 50) => {
    const blocks = value < 40 ? 1 : value < 75 ? 2 : 3;
    const widths = [0, 150, 300, 450];
    return shell("prod-load", "Profil de charge simplifié", `Le besoin relatif vaut ${value} pour cent. ${blocks} bloc ou blocs de production sont représentés comme actifs. Cette scène ne calcule ni rendement ni sélection réelle.`,
      `<text x="360" y="44" text-anchor="middle" font-size="22" font-weight="700">BESOIN RELATIF : ${value} %</text>
       <rect x="95" y="88" width="530" height="54" rx="15" fill="#fffdf8" stroke="#1b3a63" stroke-width="4"/>
       <rect x="103" y="96" width="${Math.round(5.14 * value)}" height="38" rx="10" fill="url(#warm-prod-load)" stroke="#c9451a" stroke-width="2"/>
       <g transform="translate(85 205)">${[0,1,2].map((n) => `<rect x="${n*190}" width="160" height="112" rx="18" fill="${n < blocks ? "url(#warm-prod-load)" : "#fffdf8"}" stroke="${n < blocks ? "#c9451a" : "#637285"}" stroke-width="4" stroke-dasharray="${n < blocks ? "0" : "8 6"}"/><text x="${n*190+80}" y="52" text-anchor="middle" font-size="19" font-weight="700">BLOC ${n+1}</text><text x="${n*190+80}" y="82" text-anchor="middle" font-size="15">${n < blocks ? "ACTIF" : "ARRÊT"}</text>`).join("")}</g>
       <text x="360" y="372" text-anchor="middle" font-size="16">Modèle qualitatif : vérifier les données constructeur et le schéma réel.</text>`);
  };

  const diagnosis = shell("prod-diag", "Démarche avant conclusion",
    "Une chaîne relie le dossier, les mesures, la comparaison et l’hypothèse. Aucun remplacement d’équipement n’est proposé avant les vérifications.",
    `<g fill="#fffdf8" stroke="#1b3a63" stroke-width="3">${["Dossier", "Mesures", "Comparer", "Hypothèse"].map((label, index) => `<rect x="${28 + index*174}" y="160" width="142" height="92" rx="16"/><text x="${99 + index*174}" y="214" text-anchor="middle" font-size="18" font-weight="700">${label}</text>`).join("")}</g>
     <path d="M170 206H202M344 206H376M518 206H550" stroke="#c9451a" stroke-width="6" marker-end="url(#arrow-prod-diag)"/>
     <text x="360" y="110" text-anchor="middle" font-size="23" font-weight="700">OBSERVER AVANT DE REMPLACER</text>
     <rect x="180" y="302" width="360" height="55" rx="16" fill="#fff4e0" stroke="#b06a00" stroke-width="4" stroke-dasharray="4 5"/><text x="360" y="336" text-anchor="middle" font-size="17" font-weight="700">CONCLUSION PROVISOIRE ET JUSTIFIÉE</text>`);

  window.STATION_CONFIG = {
    code: "E1",
    id: "production",
    title: "Production",
    next: "poursuivre vers l’échangeur",
    levels: {
      CAP: {
        objective: "Reconnaître le générateur et suivre le départ et le retour.",
        assessment: "nommer départ, retour et le générateur"
      },
      TP: {
        objective: "Identifier les productions raccordées et contrôler le trajet de l’eau.",
        assessment: "nommer, suivre le trajet et proposer un contrôle sûr"
      },
      BTS: {
        objective: "Comparer une fonction et plusieurs solutions technologiques sans les confondre.",
        assessment: "analyser la fonction, les données et justifier une hypothèse"
      }
    },
    steps: [
      {
        short: "Identifier", kicker: "repérer", title: "Que fait ce bloc ?",
        text: "Le nom commercial ne suffit pas. Commence par la fonction rendue au réseau d’eau.",
        cap: "Montre le départ et le retour du générateur.",
        tp: "Repère le départ, le retour et la fonction de l’équipement.",
        bts: "Sépare la fonction hydraulique, la source d’énergie et la technologie.",
        scene: network("prod-ident"),
        equivalent: "Le retour entre dans un bloc générateur. Le départ en sort vers les usages. Le bloc transfère de l’énergie à l’eau ou en retire selon le service.",
        action: {
          type: "choice", prompt: "Choisis la fonction commune.",
          options: [
            { label: "Transférer de l’énergie avec le réseau" },
            { label: "Imposer toujours la même température" },
            { label: "Remplacer le circulateur" },
            { label: "Nommer une marque précise" }
          ],
          correct: 0,
          explain: "Un générateur échange de l’énergie avec l’eau. La température, la puissance et la technologie dépendent du système réel."
        }
      },
      {
        short: "Fonction", kicker: "comprendre", title: "Fonction, technologie, énergie",
        text: "Chaudière, pompe à chaleur et groupe d’eau glacée ne sont pas des synonymes. Ils peuvent pourtant occuper la fonction de production dans une boucle.",
        cap: "Montre la chaudière, la pompe à chaleur ou le groupe d’eau glacée.",
        tp: "Associe le bon mot au bon niveau de description.",
        bts: "Construis une comparaison à partir du service, puis des contraintes techniques.",
        scene: technologies,
        equivalent: "Trois technologies différentes convergent vers une même fonction hydraulique : transférer de l’énergie avec l’eau du réseau.",
        action: {
          type: "match", prompt: "Associe chaque terme à sa catégorie.",
          options: ["Fonction hydraulique", "Technologie", "Source ou vecteur d’énergie"],
          items: [
            { label: "Transférer l’énergie", answer: 0 },
            { label: "Pompe à chaleur", answer: 1 },
            { label: "Électricité ou combustible", answer: 2 }
          ],
          explain: "Cette séparation évite de conclure sur les performances ou le raccordement à partir d’un simple nom."
        }
      },
      {
        short: "Effet", kicker: "observer", title: "Suivre l’eau, pas la couleur seule",
        text: "Les mots départ et retour, les flèches et les points de mesure restent visibles. La couleur n’est qu’un repère supplémentaire.",
        cap: "Repère les deux sondes de température T1 et T2.",
        tp: "Suis le sens de circulation et localise les deux températures.",
        bts: "Relie les relevés au bilan du système et à leurs conditions de mesure.",
        scene: measurements,
        equivalent: "Deux sondes T1 et T2 encadrent le générateur. Le sens est indiqué par des flèches et les mots départ et retour.",
        action: {
          type: "choice", prompt: "Quel relevé permet de commencer à vérifier le service rendu ?",
          options: [
            { label: "Départ, retour et débit dans un état connu" },
            { label: "La température extérieure seule" },
            { label: "La couleur des tubes" },
            { label: "Le nom de la marque" }
          ],
          correct: 0,
          explain: "Les températures et le débit, relevés dans des conditions connues, donnent une base exploitable. Ils restent à comparer au dossier."
        }
      },
      {
        short: "Régler", kicker: "mesurer et régler", title: "Le besoin évolue",
        text: "Déplace le besoin relatif. Le modèle montre seulement une logique de charge ; il ne sélectionne pas un équipement réel.",
        cap: "Compte les blocs allumés après avoir bougé le curseur.",
        tp: "Observe quels blocs seraient appelés dans cette représentation simplifiée.",
        bts: "Explique pourquoi une vraie comparaison exige puissances, régimes d’eau, rendements et contraintes du projet.",
        scene: loadScene,
        equivalent: (value) => `Besoin relatif réglé à ${value} pour cent. Le nombre de blocs actifs augmente par paliers dans ce modèle qualitatif.`,
        action: {
          type: "range", prompt: "Fais varier la charge et verbalise l’effet.", label: "Besoin relatif", min: 20, max: 100, step: 5, value: 50,
          evaluate: (value) => ({
            readout: `${value} %`,
            observation: value < 40 ? "Un seul bloc est représenté actif." : value < 75 ? "Deux blocs sont représentés actifs." : "Trois blocs sont représentés actifs. Le seuil réel dépendrait de la régulation et des données constructeur."
          })
        }
      },
      {
        short: "Vérifier", kicker: "hypothèse", title: "Mesurer avant de conclure",
        text: "Une température inattendue n’autorise pas à remplacer le générateur. Ordonne les contrôles.",
        cap: "Signale une température anormale sans rien démonter.",
        tp: "Prépare un compte rendu factuel avant toute action corrective.",
        bts: "Compare l’état mesuré au point attendu avant de justifier une cause probable.",
        scene: diagnosis,
        equivalent: "La démarche va du dossier aux mesures, puis à la comparaison et enfin à une hypothèse provisoire.",
        action: {
          type: "sequence", prompt: "Place la démarche dans l’ordre.",
          items: ["Lire le dossier", "Relever T départ, T retour et débit", "Comparer au besoin", "Formuler une hypothèse"],
          correctOrder: [0, 1, 2, 3],
          explain: "Une hypothèse vient après des mesures traçables et une comparaison avec les conditions attendues."
        }
      }
    ],
    quiz: [
      {
        context: "Un dossier montre une chaudière, une PAC et un groupe d’eau glacée.",
        question: "Quel classement est juste ?",
        options: ["Trois technologies pouvant assurer une fonction de production", "Trois marques", "Trois circulateurs", "Trois organes de sécurité"],
        correct: 0,
        explain: "Leur technologie diffère. Leur fonction peut être d’échanger de l’énergie avec le réseau d’eau."
      },
      {
        context: "Le départ est tiède alors que le service attendu n’est pas atteint.",
        question: "Quel premier ensemble de preuves demander ?",
        options: ["Départ, retour, débit et état de fonctionnement", "Remplacer le générateur", "Fermer toutes les vannes", "Lire seulement la marque"],
        correct: 0,
        explain: "Ces relevés, pris dans un état connu, permettent de comparer le service réel au besoin."
      },
      {
        context: "La charge du bâtiment diminue.",
        question: "Que permet uniquement le modèle à blocs de cette station ?",
        options: ["Observer qualitativement une modulation", "Calculer un rendement certifié", "Choisir un produit", "Fixer des seuils universels"],
        correct: 0,
        explain: "Les paliers sont pédagogiques. La régulation réelle vient des données du projet et des constructeurs."
      },
      {
        context: "Un écart apparaît entre consigne et température mesurée.",
        question: "Quelle conclusion est défendable ?",
        options: ["Vérifier mesures, débit et conditions avant hypothèse", "Le générateur est forcément en panne", "La pompe doit être changée", "La soupape doit être neutralisée"],
        correct: 0,
        explain: "Un symptôme isolé ne désigne pas une cause unique. La démarche reste mesures, comparaison, hypothèse, vérification."
      }
    ],
    summaryScene: network("prod-summary", 2),
    summaryEquivalent: "Synthèse : un générateur échange de l’énergie avec l’eau. Sa technologie, ses données de fonctionnement et les mesures doivent être distinguées."
  };
})();

/* =====================================================================
   convert.mjs — Banque de questions : Mission F-GAZ  →  format pack Pilote
   ---------------------------------------------------------------------
   Source : FGAZ-COMPLETE-V6.html (bloc <script id="questionsData">),
            application PUBLIQUE de F. Henninot (frigorx/inerweb-fgaz).
            558 questions, dont on ne retient qu'une SÉLECTION CURÉE.

   ⚠️ La banque officielle des 85 questions d'examen et les 10 examens
      blancs du dépôt privé `habilitation-fluide` NE SONT PAS utilisés :
      publier un sujet d'épreuve est irréversible. Cf. § 2.1 du prompt.

   Sortie : packs/fluides/banque.gen.json
   Usage  : node build/convert.mjs [chemin/vers/FGAZ-COMPLETE-V6.html]
   ===================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = resolve(ICI, "..");
const SOURCE_DEFAUT =
  "C:/Users/henni/OneDrive/Bureau/inerWeb/F-GAZ/FGAZ-COMPLETE-V6.html";

/* ---------------------------------------------------------------------
   1. SÉLECTION — quelles questions, et sous quel groupe du référentiel
   ---------------------------------------------------------------------
   Chaque entrée : id Mission F-GAZ → groupe (dc) de l'arrêté du 21/11/2025.
   Sélection curée à la main : on écarte tout ce qui repose sur un seuil
   réglementaire chiffré susceptible d'avoir bougé avec F-Gas III
   (délais de réparation, seuils de contrôle, dates d'interdiction) et
   tout le chapitre ch12 (lot généré, distracteurs non sérieux).
   --------------------------------------------------------------------- */
const SELECTION = {
  // G1 — Législation & thermodynamique élémentaire
  G1: ["151", "160", "62", "v6_042", "v6_041", "v6_048", "v6_145"],
  // G2 — Incidence environnementale & réglementations
  G2: ["v6_001", "5", "v6_003", "v6_004", "v6_113", "v6_011", "v6_017"],
  // G3 — Contrôles avant mise en service / après réparation
  G3: ["v6_058", "v6_059", "v6_062", "v6_159", "66"],
  // G4 — Contrôles d'étanchéité (cœur de la catégorie E)
  G4: ["v6_074", "v6_072", "v6_163", "v6_069", "v6_168", "104", "114", "68",
       "v6_174", "107"],
  // G5 — Gestion écologique & récupération (cœur de la catégorie D)
  G5: ["v6_063", "v6_156", "v6_060", "v6_064", "v6_082", "v6_083", "v6_176",
       "135", "v6_175", "141"],
  // G6 — Compresseurs
  G6: ["152", "231", "233", "247", "240", "186"],
  // G7 — Condenseurs
  G7: ["159", "164", "163", "182", "169", "170"],
  // G8 — Évaporateurs
  G8: ["v6_039", "181", "183", "184", "178", "v6_043"],
  // G9 — Détendeurs & organes annexes
  G9: ["v6_049", "v6_055", "v6_149", "187", "188", "v6_050", "v6_051",
       "v6_052", "v6_155", "172"],
  // G10 — Tuyauterie, brasage
  G10: ["v6_061", "v6_065", "87", "84", "v6_157", "69"],
  // G11 — Substitution & efficacité énergétique
  G11: ["v6_033", "v6_140", "54", "v6_030", "v6_035", "v6_092", "185", "v6_047"],
  // G12 — Hydrocarbures (spécifique A1/A2)
  G12: ["v6_091", "v6_181", "v6_093", "v6_184", "291", "286", "289"],
  // G13 — CO₂ / NH₃ : information et sensibilisation
  G13: ["v6_088", "v6_089", "v6_185", "v6_090", "v6_094", "v6_182"],
};

/* ---------------------------------------------------------------------
   2. CORRECTIONS ÉDITORIALES
   ---------------------------------------------------------------------
   a) plages alignées sur les seules valeurs autorisées par la charte
      FrigorX (surchauffe 5-10 K, sous-refroidissement 4-8 K) ;
   b) réécriture des énoncés « télégraphiques » du lot 271-310, qui
      passent mal en séance devant un groupe.
   --------------------------------------------------------------------- */
const CORRECTIONS = {
  v6_048: { choix: ["0 à 2 K", "5 à 10 K", "15 à 20 K", "30 K"] },
  v6_145: { choix: ["0 à 1 K", "4 à 8 K", "15 à 20 K", "25 à 30 K"] },

  291: {
    enonce:
      "Vous devez braser sur un circuit au R-32 (A2L). Quelles précautions prenez-vous avant d'allumer le chalumeau ?",
    choix: [
      "Aucune, le R-32 est peu inflammable",
      "Récupérer le fluide, inerter à l'azote, ventiler, supprimer toute source d'ignition",
      "Ouvrir une fenêtre et braser rapidement",
      "Braser directement, le circuit est fermé",
    ],
    explication:
      "Un fluide A2L reste inflammable : on récupère, on inerte à l'azote et on supprime toute source d'ignition avant la flamme.",
  },
  286: {
    enonce:
      "Pourquoi ne doit-on jamais approcher une flamme d'un circuit contenant un fluide A2L ou A3 non inerté ?",
    choix: [
      "Parce qu'il est interdit de fumer sur un chantier",
      "Parce que le fluide peut s'enflammer et se décomposer en gaz toxiques",
      "Parce que la fumée salit l'installation",
      "Parce que l'odeur est désagréable",
    ],
    explication:
      "Double risque : inflammation du fluide, et décomposition thermique produisant des gaz toxiques (dont acide fluorhydrique).",
  },
  289: {
    enonce:
      "Quelle est la différence entre un fluide A2L (R-32) et un fluide A3 (R-290) ?",
    choix: [
      "Aucune, les deux classes sont équivalentes",
      "A3 est hautement inflammable (propagation rapide) ; A2L l'est faiblement (propagation lente)",
      "A2L est toxique, A3 ne l'est pas",
      "A3 produit plus de froid",
    ],
    explication:
      "Le R-290 est A3 : très inflammable. Le R-32 est A2L : faiblement inflammable, vitesse de flamme ≤ 10 cm/s. Piège classique.",
  },
};

/* --------------------------------------------------------------------- */

/* Une explication s'affiche sous la question, en séance, sur une seule
   respiration : on vise ≤ 200 caractères. La source mélange de vrais
   sauts de ligne et des « \n » littéraux — on normalise les deux. */
const LIMITE_EXPLICATION = 200;

function couperNet(txt, limite) {
  if (txt.length <= limite) return txt;
  const tronque = txt.slice(0, limite);
  const fin = Math.max(tronque.lastIndexOf(". "), tronque.lastIndexOf(" ; "));
  return (fin > limite * 0.5 ? tronque.slice(0, fin + 1) : tronque.replace(/\s+\S*$/, "") + "…").trim();
}

function condenser(remediation) {
  if (!remediation) return "";
  const lignes = String(remediation)
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const prendre = (prefixe) => {
    const l = lignes.find((x) => x.startsWith(prefixe));
    if (!l) return "";
    // « Exemple : Exemple : … » et « Piège : Piège classique : … » dans la source
    return l.slice(prefixe.length).replace(/^\s*(Exemple|Piège classique)\s*:\s*/, "").trim();
  };
  const reponse = lignes[0].replace(/^✅\s*Réponse\s*:\s*/, "");
  let txt = prendre("Règle :") || prendre("Pourquoi :") || reponse;
  // certaines remédiations n'ont qu'une ligne de réponse sèche (« Le CO₂ ») :
  // on lui adjoint la ligne suivante, sinon l'explication n'explique rien.
  if (txt.length < 45) {
    const suite = lignes.slice(1).find((l) => !/^(Exemple|Piège)\s*:/.test(l) && l !== txt);
    if (suite) txt = (txt.replace(/[.\s]*$/, "") + " — " + suite.replace(/^(Règle|Pourquoi)\s*:\s*/, "")).trim();
  }
  txt = couperNet(txt, LIMITE_EXPLICATION);
  const piege = prendre("Piège :");
  if (piege && txt.length + piege.length < LIMITE_EXPLICATION + 60) txt += " ⚠ " + piege;
  return txt;
}

function main() {
  const source = process.argv[2] || SOURCE_DEFAUT;
  const html = readFileSync(source, "utf8");
  const bloc = html.match(
    /<script id="questionsData" type="application\/json">([\s\S]*?)<\/script>/
  );
  if (!bloc) {
    console.error("✗ bloc questionsData introuvable dans " + source);
    process.exit(1);
  }
  const brut = JSON.parse(bloc[1]);
  const index = new Map(brut.questions.map((q) => [String(q.id), q]));

  const banque = [];
  const manquants = [];
  let corrigees = 0;

  for (const [dc, ids] of Object.entries(SELECTION)) {
    for (const id of ids) {
      const q = index.get(id);
      if (!q) {
        manquants.push(id);
        continue;
      }
      const fix = CORRECTIONS[id] || {};
      if (CORRECTIONS[id]) corrigees++;
      const choix = fix.choix || q.propositions;
      if (!Array.isArray(choix) || choix.length < 2) {
        manquants.push(id + " (propositions absentes)");
        continue;
      }
      banque.push({
        id: "q-" + dc.toLowerCase() + "-" + id,
        dc,
        type: choix.length === 2 ? "vf" : "qcm",
        enonce: fix.enonce || q.question,
        choix,
        bonne: q.reponse,
        explication: fix.explication || condenser(q.remediation),
      });
    }
  }

  /* --- contrôles --- */
  const erreurs = [];
  for (const q of banque) {
    if (!Number.isInteger(q.bonne) || q.bonne < 0 || q.bonne >= q.choix.length)
      erreurs.push(q.id + " : index de bonne réponse hors plage");
    if (!q.enonce || !q.explication) erreurs.push(q.id + " : énoncé ou explication vide");
    if (q.choix.some((c) => !c || !String(c).trim())) erreurs.push(q.id + " : proposition vide");
  }
  if (manquants.length) erreurs.push("ids introuvables : " + manquants.join(", "));
  if (erreurs.length) {
    console.error("✗ " + erreurs.length + " anomalie(s) :");
    erreurs.forEach((e) => console.error("   " + e));
    process.exit(1);
  }

  const sortie = resolve(RACINE, "packs/fluides/banque.gen.json");
  writeFileSync(sortie, JSON.stringify(banque, null, 1) + "\n", "utf8");

  const parGroupe = banque.reduce((a, q) => ((a[q.dc] = (a[q.dc] || 0) + 1), a), {});
  console.log("✓ " + banque.length + " questions écrites → packs/fluides/banque.gen.json");
  console.log("  répartition : " + JSON.stringify(parGroupe));
  console.log("  corrections éditoriales appliquées : " + corrigees);
}

main();

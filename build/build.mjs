/* =====================================================================
   build.mjs — assemble le pack et produit les DEUX sorties
   ---------------------------------------------------------------------
     packs/fluides/cartes.js      (éditorial, AVEC notes_pilote)
   + packs/fluides/banque.gen.json (généré par convert.mjs)
        ↓
     packs/fluides/pack.pilote.js  → chargé par formateur.html
     packs/fluides/pack.eleve.js   → chargé par index.html, PURGÉ

   La purge de `notes_pilote` n'est pas cosmétique : pack.eleve.js est
   publié en clair, tout ce qu'il contient est lisible par l'élève.
   Le build échoue si la moindre note survit dans la sortie élève.

   Usage : node build/build.mjs
   ===================================================================== */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PACK_META, RESSOURCES, CARTES } from "../packs/fluides/cartes.js";
import { resoudre, couverture, verifierSynchro, estEvalue } from "./referentiel.mjs";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BANQUE = JSON.parse(
  readFileSync(resolve(RACINE, "packs/fluides/banque.gen.json"), "utf8")
);

/* ---------------------------------------------------------------------
   1. VALIDATION — le moteur ne valide rien : une faute de frappe dans un
   `vers` casse la page en silence. On vérifie ici, une bonne fois.
   --------------------------------------------------------------------- */
function valider() {
  const err = [];
  const ids = new Set();

  if (!Array.isArray(CARTES) || !CARTES.length) err.push("cartes : tableau vide ou absent");

  for (const c of CARTES) {
    if (!c.id) { err.push("carte sans id : " + (c.titre || "?")); continue; }
    if (ids.has(c.id)) err.push("id en double : " + c.id);
    ids.add(c.id);
    if (!c.titre) err.push(c.id + " : titre absent");

    if (c.question) {
      const q = c.question;
      if (!Array.isArray(q.choix) || q.choix.length < 2)
        err.push(c.id + " : question sans choix (le moteur planterait)");
      else if (!Number.isInteger(q.bonne) || q.bonne < 0 || q.bonne >= q.choix.length)
        err.push(c.id + " : index `bonne` hors plage");
      if (!q.enonce) err.push(c.id + " : question sans énoncé");
    }
    // Un critère porte un code du référentiel. Un code inventé, mal frappé
    // ou disparu d'une révision de l'arrêté fait échouer le build : c'est
    // la garde qui manquait, et par laquelle les oublis se voyaient jamais.
    for (const cr of c.criteres || []) {
      if (!cr.code || !cr.libelle) { err.push(c.id + " : critère incomplet"); continue; }
      if (!resoudre(cr.code))
        err.push(c.id + " : code « " + cr.code + " » inexistant au référentiel (arrêté du 21/11/2025, annexe II.B)");
    }

    // Le bandeau affiché à l'élève ne doit pas promettre plus que ce que la
    // fiche enseigne : « G6 · codes 6.01 → 6.08 » annonçait huit compétences
    // pour quatre réellement traitées.
    if (c.dc && (c.criteres || []).length) {
      const declares = new Set(c.criteres.map((x) => x.code));
      for (const code of c.dc.match(/\d+\.\d{2}/g) || [])
        if (!declares.has(code))
          err.push(c.id + " : le libellé « " + c.dc + " » annonce le code " + code + ", absent de ses critères");
    }
  }

  // le moteur code en dur `data-go='c00'` sur le retour au sommaire d'examen
  if (!ids.has("c00")) err.push("la carte d'accueil DOIT avoir l'id c00 (codé en dur dans moteur.js)");
  if (!ids.has(PACK_META.carte_initiale))
    err.push("carte_initiale « " + PACK_META.carte_initiale + " » introuvable");

  // toutes les destinations de navigation existent
  for (const c of CARTES) {
    for (const l of c.liens || []) {
      // Un lien mène soit à une CARTE du pack (`vers`), soit à une PAGE du
      // site (`url` : la galerie des planches). Les deux à la fois n'a pas de
      // sens et cacherait une erreur d'écriture.
      if (l.url && l.vers) err.push(c.id + " : lien avec `url` ET `vers` — choisir l'un des deux");
      else if (l.url) {
        if (/^https?:|^\/\//i.test(l.url))
          err.push(c.id + " → « " + l.url + " » : lien externe interdit dans une tuile (le pack doit rester autonome)");
        else if (!existsSync(resolve(RACINE, l.url.split("#")[0])))
          err.push(c.id + " → « " + l.url + " » : page inexistante dans le dépôt");
      }
      else if (!l.vers) err.push(c.id + " : lien sans destination");
      else if (!ids.has(l.vers)) err.push(c.id + " → « " + l.vers + " » : carte inexistante");
    }
    if (c.question?.remediation_vers && !ids.has(c.question.remediation_vers))
      err.push(c.id + " : remediation_vers « " + c.question.remediation_vers + " » inexistante");
    for (const r of c.ressources || [])
      if (!RESSOURCES.some((x) => x.id === r)) err.push(c.id + " : ressource « " + r + " » inexistante");
  }

  // examens : le pool doit exister et être assez grand — avec le même
  // filtrage par niveau que le moteur, sinon la validation ment
  const groupes = new Set(BANQUE.map((q) => q.dc));
  for (const c of CARTES.filter((x) => x.examen)) {
    const inconnus = (c.examen.dc || []).filter((d) => !groupes.has(d));
    if (inconnus.length) err.push(c.id + " : groupe(s) absent(s) de la banque : " + inconnus.join(", "));
    const pool = BANQUE.filter(
      (q) =>
        (c.examen.dc || []).includes(q.dc) &&
        !(c.examen.niveau && q.niveau && q.niveau !== c.examen.niveau)
    ).length;
    if (pool < (c.examen.n || 6))
      err.push(c.id + " : " + pool + " questions disponibles pour " + c.examen.n + " demandées" +
        (c.examen.niveau ? " (niveau " + c.examen.niveau + ")" : ""));
  }

  // banque
  for (const q of BANQUE) {
    if (!Array.isArray(q.choix) || q.choix.length < 2) err.push("banque " + q.id + " : choix absents");
    else if (!Number.isInteger(q.bonne) || q.bonne < 0 || q.bonne >= q.choix.length)
      err.push("banque " + q.id + " : index `bonne` hors plage");
    // Une question évalue une compétence, ou est déclarée hors référentiel.
    // Le silence n'est pas une option : c'est ainsi qu'on perd la traçabilité.
    if (q.code && !resoudre(q.code))
      err.push("banque " + q.id + " : code « " + q.code + " » inexistant au référentiel");
    if (!q.code && !q.hors_ref)
      err.push("banque " + q.id + " : ni code de compétence, ni classement hors référentiel");
  }

  return err;
}

/* ---------------------------------------------------------------------
   2. RATTACHEMENT AU RÉFÉRENTIEL
   Le libellé officiel n'est plus recopié à la main : il est résolu depuis
   referentiel-2025.json et injecté ici. Les deux textes cohabitent —
   `libelle` = la reformulation accessible écrite pour l'élève,
   `officiel` = le texte de l'arrêté, opposable et jamais retouché.
   Le référentiel lui-même (74 Ko) ne part pas côté navigateur : seuls
   les codes réellement cités sont embarqués, résolus.
   --------------------------------------------------------------------- */
const CATS = PACK_META.categories || [];

/* ---------------------------------------------------------------------
   Quelles planches sont ANIMÉES ? — signalé par F. Henninot le 27/07 :
   « quand on démarre les animations, elles ne sont pas à zéro ».
   Un SVG inséré en <img> lance son animation dès que l'image est chargée,
   pas quand le lecteur arrive dessus : sur une fiche ouverte après coup,
   on tombe au milieu du récit. Le moteur doit donc pouvoir la relancer —
   il lui faut savoir lesquelles sont animées, d'où cette liste, relevée
   dans les fichiers plutôt que tenue à la main.
   --------------------------------------------------------------------- */
function svgAnimes() {
  const dossier = resolve(RACINE, "packs/fluides/res/svg");
  return readdirSync(dossier)
    .filter((f) => f.endsWith(".svg"))
    .filter((f) => /<animate(Motion|Transform)?[\s>]/.test(readFileSync(resolve(dossier, f), "utf8")))
    .sort();
}

function enrichir(cartes) {
  return cartes.map((c) => {
    if (!c.criteres || !c.criteres.length) return c;
    const cats = new Set();
    for (const cr of c.criteres) {
      const info = resoudre(cr.code);
      for (const cat of CATS) if (estEvalue(info, cat)) cats.add(cat);
    }
    return {
      ...c,
      // les catégories pour lesquelles cette fiche est au programme
      categories: cats.size ? [...cats] : undefined,
      criteres: c.criteres.map((cr) => {
        const info = resoudre(cr.code); // non nul : valider() l'a garanti
        const epreuve = {};
        for (const cat of CATS) if (estEvalue(info, cat)) epreuve[cat] = info.cat[cat];
        const enr = {
          ...cr,
          officiel: info.officiel,
          groupe: info.groupe,
          groupe_titre: info.groupe_titre,
          epreuve,
          nouveau: info.nouveau,
          tirage_au_sort: info.tirage_au_sort,
        };
        // Code évalué dans aucune des catégories du pack : c'est du contenu
        // d'information (le CO₂ et le NH₃, cf. fiche G13). On le dit, plutôt
        // que de laisser l'élève croire qu'il sera interrogé dessus.
        if (!Object.keys(epreuve).length) {
          enr.information = true;
          enr.evalue_en = Object.keys(info.cat).filter((k) => estEvalue(info, k));
        }
        return enr;
      }),
    };
  });
}

/* Les catégories d'aptitude concernées par une question, déduites de son
   code. Sert au moteur à ne pas servir à un candidat D des questions qui
   ne sont pas dans son champ.

   Deux cas gardent volontairement l'absence de champ, qui vaut « pour
   tout le monde » :
   · question hors référentiel (culture métier, socle commun) ;
   · question dont le code n'est évalué dans AUCUNE catégorie du pack —
     typiquement le CO₂ et le NH₃. Les exclure serait une faute : l'annexe
     II.C impose au moins une question sur les spécificités du CO₂ et du
     NH₃ dans les sujets A1 et A2, alors même que les codes 13.xx / 14.xx
     n'y sont pas évalués. */
function enrichirBanque(banque) {
  return banque.map((q) => {
    if (!q.code) return q;
    const info = resoudre(q.code);
    const cats = CATS.filter((cat) => estEvalue(info, cat));
    return cats.length ? { ...q, categories: cats } : q;
  });
}

function codesCites(cartes) {
  const s = new Set();
  for (const c of cartes) for (const cr of c.criteres || []) s.add(cr.code);
  return s;
}

/* Le dictionnaire des compétences réellement utilisées — fiches ET banque.
   Il permet au bilan de fin d'examen de NOMMER la compétence non acquise
   au lieu de renvoyer vers un numéro de fiche. On y met la reformulation
   accessible quand une fiche en propose une, le texte de l'arrêté sinon :
   plusieurs codes sont évalués par la banque sans qu'aucune fiche ne les
   enseigne (1.00, 1.05, 1.08…), et ceux-là n'ont pas de reformulation. */
function dictionnaireCompetences(cartes, banque) {
  const dico = {};
  const ajouter = (code) => {
    if (!code || dico[code]) return;
    const info = resoudre(code);
    if (!info) return;
    const cat = CATS.filter((c) => estEvalue(info, c));
    dico[code] = {
      officiel: info.officiel,
      groupe: info.groupe,
      groupe_titre: info.groupe_titre,
      // les catégories où ce code est exigé — sert à n'afficher au stagiaire
      // que SA carte de progression, pas celle des autres catégories
      cat: cat.length ? cat : undefined,
    };
  };
  for (const c of cartes) for (const cr of c.criteres || []) ajouter(cr.code);
  for (const q of banque) ajouter(q.code);
  for (const c of cartes)
    for (const cr of c.criteres || [])
      if (dico[cr.code] && !dico[cr.code].libelle) dico[cr.code].libelle = cr.libelle;
  return dico;
}

/* Le chiffre qui manquait. Il ne bloque pas le build — un pack incomplet
   reste utilisable — mais il est écrit noir sur blanc à chaque
   construction, et déposé dans COUVERTURE-REFERENTIEL.md. */
function rapportCouverture(cartes) {
  const cites = codesCites(cartes);
  const cv = couverture([...cites], CATS);

  console.log("  référentiel : " + cites.size + " codes cités");
  for (const cat of CATS) {
    const r = cv[cat];
    const marque = r.manquants === 0 ? "✓" : "▪";
    console.log(
      "    " + marque + " " + cat.padEnd(3) + r.couverts + "/" + r.requis +
      " codes couverts (" + r.pourcent + " %)" +
      (r.manquants ? " — " + r.manquants + " manquant(s)" : "")
    );
  }

  const lignes = [];
  lignes.push("# Couverture du référentiel officiel");
  lignes.push("");
  lignes.push("> Généré par `node build/build.mjs` — ne pas éditer à la main.");
  lignes.push("> Source : arrêté du 21 novembre 2025, annexe II.B (136 codes).");
  lignes.push("");
  lignes.push("| Catégorie | Codes exigés | Couverts | Manquants | Couverture |");
  lignes.push("|---|---:|---:|---:|---:|");
  for (const cat of CATS) {
    const r = cv[cat];
    lignes.push("| **" + cat + "** | " + r.requis + " | " + r.couverts + " | " +
      (r.manquants || "—") + " | " + r.pourcent + " % |");
  }

  for (const cat of CATS) {
    const r = cv[cat];
    if (!r.manquants) continue;
    lignes.push("");
    lignes.push("## " + cat + " — " + r.manquants + " code(s) non traité(s)");
    lignes.push("");
    for (const [gid, codes] of Object.entries(r.par_groupe)) {
      const tir = codes[0].tirage_au_sort
        ? " ⚠️ **groupe tiré au sort à l'épreuve — le candidat en aura forcément un**"
        : "";
      lignes.push("**" + gid + " — " + codes[0].titre + "**" + tir);
      lignes.push("");
      for (const c of codes) {
        const info = resoudre(c.code);
        lignes.push("- `" + c.code + "` *(" + (c.epreuve === "P" ? "pratique" : "théorique") + ")*" +
          (info.nouveau ? " ★ nouveau 2025" : "") + " — " + info.officiel);
      }
      lignes.push("");
    }
  }

  /* Deuxième mesure, distincte : ce que la BANQUE évalue. Un code enseigné
     mais jamais interrogé n'est pas entraîné ; un code interrogé sans fiche
     laisse l'élève sans recours quand il se trompe. Les deux se voient ici. */
  const codesBanque = new Set(BANQUE.filter((q) => q.code).map((q) => q.code));
  const horsRef = BANQUE.filter((q) => q.hors_ref);
  const evalueNonEnseigne = [...codesBanque].filter((c) => !cites.has(c)).sort();
  const enseigneNonEvalue = [...cites].filter((c) => !codesBanque.has(c)).sort();

  console.log("  banque : " + codesBanque.size + " compétences évaluées, " +
    horsRef.length + " question(s) hors référentiel");
  if (evalueNonEnseigne.length)
    console.log("    ▪ " + evalueNonEnseigne.length + " code(s) évalué(s) sans fiche qui les enseigne : " +
      evalueNonEnseigne.join(", "));

  lignes.push("");
  lignes.push("## Ce que la banque évalue");
  lignes.push("");
  lignes.push("- **" + codesBanque.size + " compétences** couvertes par au moins une question ;");
  lignes.push("- **" + horsRef.length + " questions hors référentiel** (aucun code de l'annexe II.B ne les couvre — " +
    "elles restent utiles au métier, elles ne sont simplement pas évaluables à l'examen).");
  lignes.push("");
  if (evalueNonEnseigne.length) {
    lignes.push("### ⚠️ Évalué mais pas enseigné — " + evalueNonEnseigne.length + " code(s)");
    lignes.push("");
    lignes.push("Des questions interrogent ces compétences, mais aucune fiche ne les revendique :");
    lignes.push("l'élève qui se trompe n'a nulle part où réviser.");
    lignes.push("");
    for (const c of evalueNonEnseigne) {
      const info = resoudre(c);
      lignes.push("- `" + c + "` — " + info.officiel);
    }
    lignes.push("");
  }
  if (enseigneNonEvalue.length) {
    lignes.push("### Enseigné mais jamais interrogé — " + enseigneNonEvalue.length + " code(s)");
    lignes.push("");
    lignes.push("Une fiche les traite, aucune question ne les vérifie : `" +
      enseigneNonEvalue.join("`, `") + "`");
    lignes.push("");
  }

  const sync = verifierSynchro();
  lignes.push("");
  lignes.push("---");
  lignes.push("");
  if (sync === null) {
    lignes.push("*Dépôt amont absent de cette machine : copie du référentiel non vérifiée.*");
  } else if (sync.synchro) {
    lignes.push("*Référentiel conforme à la source amont (`habilitation-fluide`).*");
  } else {
    lignes.push("⚠️ **Le référentiel du pack a divergé de la source amont** — " +
      "empreintes `" + sync.local + "` / `" + sync.amont + "`. À reprendre sur pièce.");
  }
  lignes.push("");
  writeFileSync(resolve(RACINE, "COUVERTURE-REFERENTIEL.md"), lignes.join("\n"), "utf8");

  if (sync && !sync.synchro)
    console.log("  ⚠ référentiel divergent de la source amont (voir COUVERTURE-REFERENTIEL.md)");
  return cv;
}

/* ---------------------------------------------------------------------
   3. PURGE — retire la couche pilote de la sortie élève
   --------------------------------------------------------------------- */
const CHAMPS_PILOTE = ["notes_pilote"];

function purger(cartes) {
  return cartes.map((c) => {
    const copie = { ...c };
    for (const champ of CHAMPS_PILOTE) delete copie[champ];
    return copie;
  });
}

/* --------------------------------------------------------------------- */
function ecrire(chemin, pack, entete) {
  const js = "/* " + entete + " */\nwindow.PILOTE_PACK = " + JSON.stringify(pack, null, 1) + ";\n";
  writeFileSync(resolve(RACINE, chemin), js, "utf8");
  return js;
}

function main() {
  const err = valider();
  if (err.length) {
    console.error("✗ build refusé — " + err.length + " anomalie(s) :");
    err.forEach((e) => console.error("   " + e));
    process.exit(1);
  }

  const cartes = enrichir(CARTES); // libellés officiels résolus depuis le référentiel
  const banque = enrichirBanque(BANQUE);
  const base = {
    pack: { ...PACK_META, svg_animes: svgAnimes() },
    ressources: RESSOURCES,
    banque,
    competences: dictionnaireCompetences(cartes, BANQUE),
  };

  ecrire(
    "packs/fluides/pack.pilote.js",
    { ...base, cartes },
    "BUILD FORMATEUR — contient la couche pilote. Généré par build/build.mjs."
  );
  const jsEleve = ecrire(
    "packs/fluides/pack.eleve.js",
    { ...base, cartes: purger(cartes) },
    "BUILD ÉLÈVE — couche pilote retirée. Généré par build/build.mjs. NE PAS éditer à la main."
  );

  /* --- contrôle de non-fuite : on relit ce qu'on vient d'écrire --- */
  const fuites = CHAMPS_PILOTE.filter((champ) => jsEleve.includes(champ));
  if (fuites.length) {
    console.error("✗ FUITE : « " + fuites.join(", ") + " » présent dans pack.eleve.js");
    process.exit(1);
  }
  // au cas où un texte de note aurait été recopié ailleurs (corps, bloc…)
  for (const c of CARTES) {
    if (!c.notes_pilote) continue;
    const debut = c.notes_pilote.slice(0, 40);
    if (jsEleve.includes(debut)) {
      console.error("✗ FUITE : le début de la note de « " + c.id + " » se retrouve dans pack.eleve.js");
      process.exit(1);
    }
  }

  const texte = CARTES.reduce(
    (n, c) =>
      n + (c.corps || "").length + (c.blocs || []).reduce((m, b) => m + (b.html || "").length, 0),
    0
  );
  const types = CARTES.reduce((a, c) => ((a[c.type || "?"] = (a[c.type || "?"] || 0) + 1), a), {});

  console.log("✓ pack.pilote.js + pack.eleve.js écrits");
  console.log("  cartes  : " + CARTES.length + " " + JSON.stringify(types));
  console.log("  banque  : " + BANQUE.length + " questions");
  console.log("  notes pilote : " + CARTES.filter((c) => c.notes_pilote).length + " (0 dans la sortie élève)");
  rapportCouverture(CARTES);
  console.log("  texte des cartes : " + texte.toLocaleString("fr-FR") + " caractères");
  console.log("  poids élève : " + Math.round(Buffer.byteLength(jsEleve) / 1024) + " Ko");

  /* --- profondeur : la couverture dit qu'un code est CITÉ, la profondeur
     mesure qu'il est TENU. Lancée ici pour qu'elle ne soit jamais oubliée ;
     elle avertit, elle ne bloque pas (le jour venu : --strict). --- */
  execFileSync(process.execPath, [resolve(RACINE, "build/profondeur.mjs")], {
    stdio: "inherit",
  });

  /* --- matrice de traçabilité : pour chaque compétence, la fiche qui
     l'enseigne et les questions qui la vérifient. Lancée ici pour la même
     raison que la profondeur — un document de traçabilité qu'il faut
     penser à régénérer est un document qui ment un jour ou l'autre. --- */
  execFileSync(process.execPath, [resolve(RACINE, "build/matrice.mjs")], {
    stdio: "inherit",
  });

  /* --- la galerie : toutes les planches sur une page, rejouables. Relevée
     du dossier, donc une planche ajoutée y apparaît sans qu'on y pense. --- */
  execFileSync(process.execPath, [resolve(RACINE, "build/galerie.mjs")], {
    stdio: "inherit",
  });
}

main();

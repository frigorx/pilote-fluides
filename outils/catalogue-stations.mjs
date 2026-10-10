/* =====================================================================
   catalogue-stations.mjs — LE CATALOGUE PÉDAGOGIQUE DES STATIONS
   ---------------------------------------------------------------------
   POURQUOI CE FICHIER EXISTE
   Demande de F. Henninot le 15/09/2026 : « inerweb.fr existe avec toutes
   ses stations, mais tu ne t'y réfères pas assez souvent ». Constat vérifié
   le même jour : le RAG de HAL-v3 (54 827 fragments) contient les cours
   Word de Franck, mais ZÉRO station du site — `aerorezo` et `electrorezo`
   n'y rendent aucun résultat. Chercher dans le RAG, c'est donc chercher
   dans le fonds papier en ignorant tout ce qui est en ligne.

   CE QU'IL FAIT — et ce qu'il ne fait pas
   Il RELÈVE, il ne saisit pas. Il ouvre chaque station des cinq réseaux,
   en tire ce qui sert à DÉCIDER de l'employer en classe (titre, sujet,
   objectif par niveau, codes de compétence, adresse publique), et écrit
   deux fichiers. Il ne mesure pas la qualité technique : c'est le travail
   de docs/audit-site-2026-09/outils/audit-stations.mjs, qui compte écrans,
   mots, MP3 et liens cassés. Les deux sont complémentaires.

   SOURCES, par réseau — chacun range son contenu à sa façon
     · Plan thermo-techno  packs/fluides/res/<module>/couverture.json (titre,
                           codes du référentiel 2025) + index.html
     · Plan — capsules     capsules/donnees/<id>.js
     · Législation         legislation/stations/<slug>/index.html (title,
                           meta description)
     · HydroMétro          hydrometro/stations/<slug>/manifest.json (titre,
                           lignes, compétences et objectif PAR NIVEAU)
     · AéroRézo            aerorezo/stations/<slug>/manifest.js (titre, ligne,
                           objectifs cap/bac/bts, mission professeur)
     · ÉlectroRézo         electrorezo/stations/<slug>/contenu.js (titre,
                           ligne, idée-force)

   SORTIES
     docs/catalogue-2026-09/catalogue-stations.json   — pour la machine :
       HAL, le RAG, un futur moteur de recherche du site
     docs/catalogue-2026-09/CATALOGUE-STATIONS.md     — pour l'humain :
       une table par réseau, lisible en diagonale

   USAGE   node outils/catalogue-stations.mjs
   ===================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = 'C:/git/pilote-fluides';
const SORTIE = path.join(ROOT, 'docs/catalogue-2026-09');
const SITE = 'https://inerweb.fr/';

/* ---------- petites lectures sûres ---------------------------------- */

function lire(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

function dossiers(rel, exclure = []) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('_') && !exclure.includes(e.name))
    .map((e) => e.name)
    .sort();
}

/* Lit `cle: "valeur"` dans un fichier JS, guillemets droits ou simples,
   échappements et sauts de ligne compris. Renvoie null si absent. */
function champJs(texte, cle) {
  const re = new RegExp('(?:^|[\\s{,])' + cle + '\\s*:\\s*(["\'])');
  const m = re.exec(texte);
  if (!m) return null;
  const q = m[1];
  let i = m.index + m[0].length;
  let out = '';
  while (i < texte.length) {
    const c = texte[i];
    if (c === '\\') {
      const suivant = texte[i + 1];
      if (suivant === 'n') out += ' ';
      else if (suivant === 't') out += ' ';
      else out += suivant;
      i += 2;
      continue;
    }
    if (c === q) break;
    out += c;
    i += 1;
  }
  return nettoyer(out);
}

function nettoyer(s) {
  return (s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/&eacute;/g, 'é').replace(/&egrave;/g, 'è')
    .replace(/\s+/g, ' ')
    .trim();
}

function titreHtml(html) {
  const m = /<title>([\s\S]*?)<\/title>/i.exec(html || '');
  if (!m) return null;
  // « Aptitude & capacité — inerWeb Législation » : la seconde moitié est la
  // signature du site, pas le sujet. Mais « TD1 — Les fondamentaux du câble »
  // n'a pas de signature : tout couper au premier tiret perdait le sujet.
  // On ne retire donc que les morceaux qui nomment le site.
  const parts = nettoyer(m[1]).split(/\s+[—–|]\s+/)
    .filter((p) => !/^inerWeb\b/i.test(p.trim()));
  return parts.join(' — ').trim() || nettoyer(m[1]) || null;
}

function descriptionHtml(html) {
  const m = /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i.exec(html || '');
  return m ? nettoyer(m[1]) : null;
}

/* Repli quand la page ne porte pas de meta description : le premier vrai
   paragraphe visible du HTML. Les titres seuls ne disent rien de plus que
   le titre déjà relevé, on les saute. */
function premierParagraphe(html) {
  if (!html) return null;
  const corps = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  for (const m of corps.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = nettoyer(m[1]);
    if (t.length >= 60) return t;
  }
  return null;
}

/* Première phrase utile d'un texte long, pour tenir sur une ligne de table. */
function phrase(t, maxi = 240) {
  if (!t) return null;
  const s = nettoyer(t);
  if (s.length <= maxi) return s;
  const coupe = s.slice(0, maxi);
  const point = Math.max(coupe.lastIndexOf('. '), coupe.lastIndexOf(' ; '));
  return (point > 80 ? coupe.slice(0, point + 1) : coupe.trimEnd() + '…');
}

/* ---------- un réseau après l'autre ---------------------------------- */

const stations = [];

function ajouter(s) {
  stations.push({
    reseau: s.reseau,
    id: s.id,
    titre: s.titre || s.id,
    ligne: s.ligne || null,
    resume: s.resume || null,
    niveaux: s.niveaux || null,
    competences: s.competences || null,
    missionProf: s.missionProf || null,
    url: SITE + s.chemin.replace(/\\/g, '/'),
    chemin: s.chemin.replace(/\\/g, '/'),
  });
}

/* --- Plan thermo-techno : les modules ------------------------------- */
const PLAN_REL = 'packs/fluides/res';
const PLAN_EXCLU = ['audio', 'bibliotheque', 'illustrations', 'img', 'outils',
  'photos', 'svg', 'symboles', 'vignettes', 'voix', 'capsules'];

for (const nom of dossiers(PLAN_REL, PLAN_EXCLU)) {
  const dir = path.join(ROOT, PLAN_REL, nom);
  if (!fs.existsSync(path.join(dir, 'index.html'))) continue;
  const html = lire(path.join(dir, 'index.html')) || '';
  const couv = lire(path.join(dir, 'couverture.json'));
  let titre = null, codes = null;
  if (couv) {
    try {
      const j = JSON.parse(couv);
      titre = j.titre || null;
      const tous = [...Object.keys(j.codes || {}), ...Object.keys(j.appui || {})];
      // Tri par valeur, pas par texte : sinon 11.02 passe avant 5.2.
      codes = tous.length
        ? [...new Set(tous)].sort((a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b))
        : null;
    } catch { /* couverture.json commentée ou en cours d'écriture */ }
  }
  ajouter({
    reseau: 'Plan thermo-techno',
    id: nom,
    titre: titre || titreHtml(html),
    resume: descriptionHtml(html) || phrase(premierParagraphe(html)),
    competences: codes,
    chemin: `${PLAN_REL}/${nom}/`,
  });
}

/* --- Le diagramme en 6 gestes (10/10/2026) : les 6 capsules de la leçon 5 du livre Bac Pro MFER
   Page unique ?g=1 à ?g=6 (QR du livre : inerweb.fr/m/5/g/<n>/). Elle vit dans le dossier du
   diagramme sans être un module : le relevé par dossier de res/ ne la voit pas. */
{
  const html = lire(path.join(ROOT, PLAN_REL, 'diagramme-enthalpique/gestes/index.html'));
  if (html) {
    ajouter({
      reseau: 'Plan thermo-techno',
      id: 'diagramme-6-gestes',
      titre: 'Le diagramme en 6 gestes',
      resume: 'Version 2 : six gestes pour la leçon 5 du livre, chacun parti du diagramme entier, avec trois aides par geste (voix à lancer à la main) : axes · cloche et cinq familles · palier · poser un point · cycle simplifié · carte du fabricant.',
      niveaux: { bac: '1re Bac Pro MFER' },
      competences: ['A1T2', 'C2', 'S4.1.3'],
      chemin: `${PLAN_REL}/diagramme-enthalpique/gestes/`,
    });
  }
}

/* --- Plan thermo-techno : les capsules ------------------------------ */
const CAPS_REL = 'packs/fluides/res/capsules/donnees';
const capsDir = path.join(ROOT, CAPS_REL);
if (fs.existsSync(capsDir)) {
  for (const f of fs.readdirSync(capsDir).filter((x) => x.endsWith('.js')).sort()) {
    const id = f.replace(/\.js$/, '');
    if (id.startsWith('_')) continue;   // _liste est l'index, pas une capsule
    const txt = lire(path.join(capsDir, f)) || '';
    ajouter({
      reseau: 'Plan — capsules',
      id: `capsules/${id}`,
      titre: champJs(txt, 'titre') || champJs(txt, 'title'),
      resume: phrase(champJs(txt, 'intro') || champJs(txt, 'dire')),
      chemin: `packs/fluides/res/capsules/?c=${id}`,
    });
  }
}

/* --- Législation ---------------------------------------------------- */
for (const nom of dossiers('legislation/stations')) {
  const html = lire(path.join(ROOT, 'legislation/stations', nom, 'index.html'));
  if (!html) continue;
  const desc = descriptionHtml(html);
  ajouter({
    reseau: 'Législation',
    id: nom,
    titre: titreHtml(html),
    resume: desc,
    niveaux: desc && /\bBTS\b/.test(desc) ? { bts: desc } : null,
    chemin: `legislation/stations/${nom}/`,
  });
}

/* --- HydroMétro : manifest.json, le mieux renseigné ------------------ */
for (const nom of dossiers('hydrometro/stations')) {
  const dir = path.join(ROOT, 'hydrometro/stations', nom);
  const brut = lire(path.join(dir, 'manifest.json'));
  const html = lire(path.join(dir, 'index.html')) || '';
  let titre = null, lignes = null, niveaux = null, comps = [], objectif = null;
  if (brut) {
    try {
      const j = JSON.parse(brut);
      titre = j.title || null;
      lignes = Array.isArray(j.lines) ? j.lines.join(', ') : null;
      niveaux = {};
      for (const [niv, v] of Object.entries(j.levels || {})) {
        if (v && v.objective) {
          niveaux[niv.toLowerCase()] = nettoyer(v.objective);
          objectif = objectif || nettoyer(v.objective);
        }
        if (Array.isArray(v && v.competencies)) comps.push(...v.competencies);
      }
      if (!Object.keys(niveaux).length) niveaux = null;
    } catch { /* manifest en cours d'écriture */ }
  }
  ajouter({
    reseau: 'HydroMétro',
    id: nom,
    titre: titre || titreHtml(html),
    ligne: lignes,
    // HydroMétro ne porte pas de meta description : l'objectif du manifeste
    // dit mieux ce que la station apprend.
    resume: descriptionHtml(html) || objectif || phrase(premierParagraphe(html)),
    niveaux,
    competences: comps.length ? [...new Set(comps)].sort() : null,
    chemin: `hydrometro/stations/${nom}/`,
  });
}

/* --- AéroRézo : manifest.js ------------------------------------------ */
for (const nom of dossiers('aerorezo/stations')) {
  const dir = path.join(ROOT, 'aerorezo/stations', nom);
  const txt = lire(path.join(dir, 'manifest.js')) || '';
  const html = lire(path.join(dir, 'index.html')) || '';
  const niveaux = {};
  for (const n of ['cap', 'bac', 'bts']) {
    const v = champJs(txt, n);
    if (v) niveaux[n] = v;
  }
  ajouter({
    reseau: 'AéroRézo',
    id: nom,
    titre: champJs(txt, 'title') || titreHtml(html),
    ligne: champJs(txt, 'line'),
    // La meta description d'AéroRézo est générique (« Station autonome,
    // ligne A ») : l'objectif CAP dit ce que la station apprend vraiment.
    resume: niveaux.cap || phrase(champJs(txt, 'decouverte')) || descriptionHtml(html),
    niveaux: Object.keys(niveaux).length ? niveaux : null,
    missionProf: champJs(txt, 'mission'),
    chemin: `aerorezo/stations/${nom}/`,
  });
}

/* --- ÉlectroRézo : contenu.js ---------------------------------------- */
for (const nom of dossiers('electrorezo/stations')) {
  const dir = path.join(ROOT, 'electrorezo/stations', nom);
  const txt = lire(path.join(dir, 'contenu.js')) || '';
  const html = lire(path.join(dir, 'index.html')) || '';
  const ligne = /(?:^|[\s{,])ligne\s*:\s*(\d+)/.exec(txt);
  ajouter({
    reseau: 'ÉlectroRézo',
    id: nom,
    titre: champJs(txt, 'titre') || titreHtml(html),
    ligne: ligne ? `Ligne ${ligne[1]}` : null,
    resume: descriptionHtml(html) || phrase(champJs(txt, 'lIdee')),
    missionProf: phrase(champJs(txt, 'ouOnLaRencontre')),
    chemin: `electrorezo/stations/${nom}/`,
  });
}

/* --- CartoClim : contenu.js, même moule qu'ÉlectroRézo (02/10/2026) ---- */
for (const nom of dossiers('cartoclim/stations')) {
  const dir = path.join(ROOT, 'cartoclim/stations', nom);
  const txt = lire(path.join(dir, 'contenu.js')) || '';
  if (!txt) continue;
  const html = lire(path.join(dir, 'index.html')) || '';
  const ligne = /(?:^|[\s{,])ligne\s*:\s*(\d+)/.exec(txt);
  ajouter({
    reseau: 'CartoClim',
    id: nom,
    titre: champJs(txt, 'titre') || titreHtml(html),
    ligne: ligne ? `Ligne ${ligne[1]}` : null,
    resume: phrase(champJs(txt, 'aQuoiCaSert')) || descriptionHtml(html),
    missionProf: phrase(champJs(txt, 'ouOnLeTrouve')),
    chemin: `cartoclim/stations/${nom}/`,
  });
}

/* --- CuivRézo : une seule table, donnees/stations.js (02/10/2026) ------
   Chaque station y est un objet { id, ligne, titre, duree } suivi de ses
   écrans ; le premier titre qui suit est l'objectif, il sert de résumé. */
{
  const txt = lire(path.join(ROOT, 'cuivrezo/donnees/stations.js')) || '';
  const lignes = {};
  const ml = /lignes\s*=\s*\{([^}]*)\}/.exec(txt);
  if (ml) for (const m of ml[1].matchAll(/(\d+):\s*'([^']+)'/g)) lignes[m[1]] = m[2];
  for (const m of txt.matchAll(/id:\s*'(\d-\d)',\s*ligne:\s*(\d),\s*titre:\s*'([^']+)'/g)) {
    const suite = txt.slice(m.index + m[0].length, m.index + m[0].length + 400);
    const obj = /titre:\s*'([^']+)'/.exec(suite);
    ajouter({
      reseau: 'CuivRézo',
      id: m[1],
      titre: m[3],
      ligne: `Ligne ${m[2]}` + (lignes[m[2]] ? ' — ' + lignes[m[2]] : ''),
      resume: obj ? obj[1] : null,
      chemin: `cuivrezo/stations/${m[1]}/`,
    });
  }
}

/* --- Le tour de main (ex-ManiRézo, renommé le 07/10/2026) : l'accueil et ses jeux de poste
   Les autres stations du plan sont des portes vers d'autres réseaux, déjà
   relevées chez eux ; seules les pages propres au Tour de main entrent ici. */
for (const p of [
  { id: 'tour-de-main', fichier: 'index.html', chemin: 'tour-de-main/' },
  { id: 'pressostat', fichier: 'simulateur/pressostat.html', chemin: 'tour-de-main/simulateur/pressostat.html' },
  /* ligne 0 « Les interventions de base, au poste » (08/10/2026) : la guidance au poste, une gare par geste */
  { id: 'guidance-recuperation', fichier: 'interventions/recuperation/index.html', chemin: 'tour-de-main/interventions/recuperation/' },
  { id: 'guidance-vannes-service', fichier: 'interventions/vannes-service/index.html', chemin: 'tour-de-main/interventions/vannes-service/' },
  { id: 'guidance-pose-manometres', fichier: 'interventions/pose-manometres/index.html', chemin: 'tour-de-main/interventions/pose-manometres/' },
  { id: 'guidance-depose-manometres', fichier: 'interventions/depose-manometres/index.html', chemin: 'tour-de-main/interventions/depose-manometres/' },
  { id: 'guidance-etancheite-azote', fichier: 'interventions/etancheite-azote/index.html', chemin: 'tour-de-main/interventions/etancheite-azote/' },
  { id: 'guidance-tirage-au-vide', fichier: 'interventions/tirage-au-vide/index.html', chemin: 'tour-de-main/interventions/tirage-au-vide/' },
  { id: 'guidance-charge-fluide-neuf', fichier: 'interventions/charge-fluide-neuf/index.html', chemin: 'tour-de-main/interventions/charge-fluide-neuf/' },
  { id: 'guidance-complement-charge', fichier: 'interventions/complement-charge/index.html', chemin: 'tour-de-main/interventions/complement-charge/' },
  { id: 'guidance-chaine-entiere', fichier: 'interventions/chaine-entiere/index.html', chemin: 'tour-de-main/interventions/chaine-entiere/' },
]) {
  const html = lire(path.join(ROOT, 'tour-de-main', p.fichier));
  if (!html) continue;
  ajouter({
    reseau: 'Le tour de main',
    id: p.id,
    titre: titreHtml(html),
    resume: descriptionHtml(html) || phrase(premierParagraphe(html)),
    chemin: p.chemin,
  });
}

/* --- inerWeb QCM (08/10/2026) : réviser seul, rien n'est envoyé ----------
   Pages fabriquées par test-accueil-mfer/en-ligne/livrer.mjs ; les codes sont
   ceux que chaque page affiche (pied de page ou carte de l'accueil). */
for (const p of [
  { id: 'qcm', fichier: 'index.html', chemin: 'qcm/', niveaux: { cap: 'CAP IFCA', bac: '2de TNE, Bac Pro MFER' } },
  { id: 'qcm-positionnement', fichier: 'positionnement.html', chemin: 'qcm/positionnement.html', niveaux: { cap: 'CAP IFCA C1.1 à C4.7', bac: '2de TNE (CC), Bac Pro MFER C1 à C13' } },
  { id: 'qcm-manometres', fichier: 'manometres.html', chemin: 'qcm/manometres.html', competences: ['A1T2', 'A5T2', 'C2', 'S3', 'S4', 'CAP-C4.5'] },
  { id: 'qcm-schema-frigo', fichier: 'schema-frigo.html', chemin: 'qcm/schema-frigo.html', competences: ['C2', 'S3', 'CAP-C2.1'] },
]) {
  const html = lire(path.join(ROOT, 'qcm', p.fichier));
  if (!html) continue;
  ajouter({
    reseau: 'inerWeb QCM',
    id: p.id,
    titre: titreHtml(html),
    resume: descriptionHtml(html),
    niveaux: p.niveaux,
    competences: p.competences,
    chemin: p.chemin,
  });
}

/* --- FormaRézo : une page par station (02/10/2026) ---------------------- */
for (const nom of dossiers('formarezo/stations')) {
  const html = lire(path.join(ROOT, 'formarezo/stations', nom, 'index.html'));
  if (!html) continue;
  ajouter({
    reseau: 'FormaRézo',
    id: nom,
    titre: (titreHtml(html) || '').replace(/&#x27;|&#39;/g, '’'),   /* l'apostrophe est encodée dans le <title> */
    resume: descriptionHtml(html),
    chemin: `formarezo/stations/${nom}/`,
  });
}

/* --- inerWeb HoCourant : un module = une brique de cours -------------
   Structure à part : une seule page, les modules vivent dans donnees/.
   Le nom vient de la table MODULES (programme.js), le sujet du résumé du
   palier auquel le module appartient. */
{
  const prog = lire(path.join(ROOT, 'hocourant/donnees/programme.js')) || '';
  const paliers = {};
  for (const m of prog.matchAll(/id:\s*"(P\d+)"[\s\S]{0,400}?resume:\s*"([\s\S]*?)",/g)) {
    paliers[m[1]] = nettoyer(m[2].replace(/\\n/g, ' '));
  }
  for (const m of prog.matchAll(/\{\s*id:\s*"(M\d+)",\s*palier:\s*"(P\d+)",\s*nom:\s*"([^"]+)"/g)) {
    ajouter({
      reseau: 'HoCourant',
      id: m[1],
      titre: nettoyer(m[3]),
      ligne: `Palier ${m[2]}`,
      resume: paliers[m[2]] || null,
      chemin: `hocourant/?module=${m[1]}`,
    });
  }
}

/* --- Applications hébergées sur le site ------------------------------
   Pas des stations : des outils entiers. Ils comptent quand même, parce
   que la question « qu'est-ce que le site propose ? » les inclut. */
for (const app of [
  { id: 'aquiblue', chemin: 'aquiblue/', titre: 'inerWeb AquiBlue' },
  { id: 'hocourant', chemin: 'hocourant/', titre: 'inerWeb HoCourant' },
]) {
  const html = lire(path.join(ROOT, app.chemin, 'index.html')) || '';
  ajouter({
    reseau: 'Applications',
    id: app.id,
    titre: titreHtml(html) || app.titre,
    resume: descriptionHtml(html) || phrase(premierParagraphe(html)),
    chemin: app.chemin,
  });
}

/* --- inerWeb Studio : les films et leurs versions interactives ----------
   03/10/2026 : les pages de voyage/ (station de chaque film, module de
   formation) et la salle studio/ n'étaient relevées par rien — l'indexeur
   vide puis remplit la couche, une publication effaçait ce qu'une session
   avait indexé à la main. Désormais relevées ici, comme les stations.
   Écartés : les dossiers de vidéos et le PDF (pas des pages). */
for (const f of (fs.existsSync(path.join(ROOT, 'voyage')) ? fs.readdirSync(path.join(ROOT, 'voyage')) : [])
  .filter((x) => x.endsWith('.html')).sort()) {
  const html = lire(path.join(ROOT, 'voyage', f)) || '';
  ajouter({
    reseau: 'inerWeb Studio',
    id: 'voyage/' + f.replace(/\.html$/, ''),
    titre: titreHtml(html),
    resume: descriptionHtml(html) || phrase(premierParagraphe(html)),
    chemin: 'voyage/' + (f === 'index.html' ? '' : f),
  });
}
{
  const html = lire(path.join(ROOT, 'studio/index.html'));
  if (html) ajouter({ reseau: 'inerWeb Studio', id: 'studio', titre: titreHtml(html),
    resume: descriptionHtml(html) || phrase(premierParagraphe(html)), chemin: 'studio/' });
}

/* --- Les autres applications du site (03/10/2026) ----------------------
   JouéRézo, SimuRézo, le quartier et RézoTools : une page d'entrée chacun,
   indexée comme AquiBlue et HoCourant ci-dessus. */
for (const app of [
  { id: 'jouerezo', chemin: 'jouerezo/', titre: 'JouéRézo' },
  { id: 'simurezo', chemin: 'simurezo/', titre: 'SimuRézo' },
  { id: 'quartier', chemin: 'quartier/', titre: 'Le quartier technique' },
  { id: 'rezotools', chemin: 'rezotools/', titre: 'RézoTools' },
]) {
  const html = lire(path.join(ROOT, app.chemin, 'index.html'));
  if (!html) continue;
  ajouter({
    reseau: 'Applications',
    id: app.id,
    titre: titreHtml(html) || app.titre,
    resume: descriptionHtml(html) || phrase(premierParagraphe(html)),
    chemin: app.chemin,
  });
}

/* --- Les pages du site ------------------------------------------------
   « L'intégralité des stations ET du projet », demande du 15/09/2026. Une
   page qui n'a ni description ni paragraphe de 60 caractères est une page
   de navigation : elle n'apprend rien et n'entre pas dans l'index.
   Écartées d'office : 404, hors-ligne, mentions, et les pages de service
   qui ne portent que des formulaires. */
{
  const HORS = new Set(['404.html', 'hors-ligne.html', 'mentions.html',
    'activer.html', 'demander-un-acces.html',
    // l'ancien projet habilitation, sorti du catalogue (Franck, 04/10/2026) ; le portail reste relié depuis formateurs.html
    'portail.html', 'pratique.html', 'planning.html', 'matrice.html', 'dossier.html', 'documents.html', 'relecture.html']);
  const racine = fs.readdirSync(path.join(ROOT))
    .filter((f) => f.endsWith('.html') && !HORS.has(f))
    .sort();
  for (const f of racine) {
    const html = lire(path.join(ROOT, f)) || '';
    const resume = descriptionHtml(html) || phrase(premierParagraphe(html));
    if (!resume) continue;                     // page de navigation seule
    ajouter({
      reseau: 'Pages du site',
      id: f.replace(/\.html$/, ''),
      titre: titreHtml(html),
      resume,
      chemin: f,
    });
  }
}

/* --- Les modules hébergés ailleurs -----------------------------------
   Le plan renvoie vers des parcours qui ne vivent pas dans ce dépôt : ils
   sont publiés sur les pages GitHub, dans leur propre dépôt. Ils sont
   pourtant en ligne, donc utilisables en classe, donc catalogués — sinon
   « qu'est-ce que j'ai sur les câbles ? » ne les trouve jamais.
   Un dépôt absent du disque est simplement sauté : `inerweb-pressostats`
   est publié mais n'a pas de copie locale ici. */
for (const ext of [
  // 02/10/2026 — Sous tension est rapatrié dans ce dépôt (8ef69bc4) : on lit sa copie ici.
  { racine: path.join(ROOT, 'sous-tension'), base: SITE + 'sous-tension/' },
  { racine: 'C:/git/qcm-travail-hauteur', base: 'https://frigorx.github.io/qcm-travail-hauteur/' },
  { racine: 'C:/git/inerweb-fgaz', base: 'https://frigorx.github.io/inerweb-fgaz/' },
]) {
  if (!fs.existsSync(ext.racine)) continue;
  const pages = fs.readdirSync(ext.racine).filter((f) => f.endsWith('.html')).sort();
  for (const f of pages) {
    const html = lire(path.join(ext.racine, f)) || '';
    // Ici on garde la page même sans résumé : ces parcours sont peu nombreux et
    // tous liés depuis le plan, donc tous destinés à la classe. Son titre suffit
    // à la retrouver, et la sauter reviendrait à la rendre introuvable.
    const resume = descriptionHtml(html) || phrase(premierParagraphe(html));
    ajouter({
      reseau: 'Modules externes',
      id: `${path.basename(ext.racine)}/${f.replace(/\.html$/, '')}`,
      titre: titreHtml(html),
      resume,
      chemin: f === 'index.html' ? '' : f,
    });
    // L'adresse ne se compose pas comme les autres : elle ne part pas d'inerweb.fr.
    stations[stations.length - 1].url = ext.base + (f === 'index.html' ? '' : f);
    stations[stations.length - 1].chemin = `${ext.racine}/${f}`;
  }
}

/* --- Les arrêts du plan que les dossiers ne montrent pas (02/10/2026) ---
   Le relevé par dossier de res/ ignorait 37 des 108 arrêts du plan : les
   étapes du CO₂ (un module, treize arrêts ?e=…), « S'évaluer » (cartes de
   formation.html), la boîte à outils et les correspondances. On lit donc
   moteur/plan-donnees.js, la source du plan, et on ajoute chaque arrêt dont
   ni l'identifiant ni l'adresse ne sont déjà relevés (sous-tension/, fgaz… le
   sont plus haut, sous leur propre réseau : pas de doublon). */
{
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(lire(path.join(ROOT, 'moteur/plan-donnees.js')) || '', ctx);
  const plan = ctx.window.PLAN_DONNEES || {};
  const vus = new Set();
  const arrets = [];
  const parcourir = (o, groupe) => {
    if (Array.isArray(o)) return o.forEach((x) => parcourir(x, groupe));
    if (!o || typeof o !== 'object') return;
    if (o.id && o.href && o.nom && !vus.has(o.id)) { vus.add(o.id); arrets.push({ ...o, groupe }); }
    for (const k in o) if (typeof o[k] === 'object') parcourir(o[k], groupe);
  };
  for (const k in plan) if (k !== 'SUPPORTS') parcourir(plan[k], k);
  const absolue = (h) => (/^https?:/.test(h) ? h : SITE + h).replace(/index\.html$/, '');
  const dejaIds = new Set(stations.filter((s) => s.reseau === 'Plan thermo-techno').map((s) => s.id));
  const dejaUrls = new Set(stations.map((s) => s.url.replace(/index\.html$/, '')));
  for (const a of arrets) {
    if (dejaIds.has(a.id) || dejaUrls.has(absolue(a.href))) continue;
    ajouter({
      reseau: 'Plan thermo-techno',
      id: a.id,
      titre: nettoyer(a.nom),
      ligne: a.groupe,
      resume: a.sous ? nettoyer(a.sous) : null,
      chemin: a.href,
    });
    stations[stations.length - 1].url = absolue(a.href);
  }
}

/* ---------- écriture ------------------------------------------------- */

fs.mkdirSync(SORTIE, { recursive: true });

const parReseau = {};
for (const s of stations) (parReseau[s.reseau] ||= []).push(s);

fs.writeFileSync(
  path.join(SORTIE, 'catalogue-stations.json'),
  JSON.stringify({ site: SITE, total: stations.length, stations }, null, 2),
  'utf8'
);

const ligneMd = (s) => {
  const niv = s.niveaux ? Object.keys(s.niveaux).map((k) => k.toUpperCase()).join(' ') : '—';
  const comp = s.competences ? s.competences.join(' ') : '—';
  const res = s.resume ? s.resume.replace(/\|/g, '/') : '—';
  return `| [${s.titre}](${s.url}) | ${s.ligne || '—'} | ${niv} | ${comp} | ${res} |`;
};

let md = '# Catalogue des stations d\'inerweb.fr\n\n';
md += '_Relevé par `outils/catalogue-stations.mjs`, jamais saisi à la main. '
   + 'Ce qu\'on peut ouvrir en classe, et pour quel niveau. '
   + 'Pour l\'état technique (écrans, voix, liens cassés), voir `docs/audit-site-2026-09/`._\n\n';
md += `**${stations.length} stations** réparties en ${Object.keys(parReseau).length} réseaux.\n\n`;
for (const [reseau, liste] of Object.entries(parReseau)) {
  md += `## ${reseau} — ${liste.length} stations\n\n`;
  md += '| Station | Ligne | Niveaux | Codes | Sujet |\n|---|---|---|---|---|\n';
  for (const s of liste) md += ligneMd(s) + '\n';
  md += '\n';
}
fs.writeFileSync(path.join(SORTIE, 'CATALOGUE-STATIONS.md'), md, 'utf8');

/* ---------- ce que la console doit dire ------------------------------ */
const sansTitre = stations.filter((s) => !s.titre || s.titre === s.id).length;
const sansResume = stations.filter((s) => !s.resume).length;
console.log(`${stations.length} stations cataloguées`);
for (const [r, l] of Object.entries(parReseau)) console.log(`  ${r} : ${l.length}`);
console.log(`Sans titre exploitable : ${sansTitre} — sans résumé : ${sansResume}`);
console.log(`Écrit dans ${SORTIE}`);

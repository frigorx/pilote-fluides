/* =====================================================================
   fiche-cle-racine.mjs — la sauvegarde papier de la clé racine
   ---------------------------------------------------------------------
   USAGE :  node build/fiche-cle-racine.mjs

   POURQUOI DU PAPIER. Un disque tombe en panne, un cloud se ferme ou se
   fait pirater, un rançongiciel chiffre tout ce qui est branché. Une
   feuille dans un tiroir ne connaît aucune de ces pannes. La clé fait
   moins de 200 caractères : elle tient sur une page, et se retape en
   deux minutes le jour où il le faut.

   CE QUE FAIT CE SCRIPT
   Il écrit une page A4 prête à imprimer, à côté de la clé — HORS DÉPÔT.
   Le dépôt ne contient que ce générateur, jamais le secret.

   🔴 LA PAGE PRODUITE CONTIENT LA CLÉ PRIVÉE EN CLAIR. Elle ne s'envoie
      pas par courriel, ne se dépose pas sur un cloud, ne se laisse pas
      dans le bac de l'imprimante. Imprimer, ranger, supprimer le fichier.
   ===================================================================== */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const DOSSIER = "C:/git/paquets/acces-inerweb/racine";
const PRIVEE = DOSSIER + "/cle-privee.pem";
const PUBLIQUE_BRUTE = DOSSIER + "/cle-publique-brute.txt";
const SORTIE = DOSSIER + "/FICHE-A-IMPRIMER.html";

if (!existsSync(PRIVEE)) {
  console.error("✗ clé racine absente : " + PRIVEE);
  console.error("  Créez-la d'abord : node build/racine-acces.mjs");
  process.exit(1);
}

const pem = readFileSync(PRIVEE, "utf8").trim();
const publique = existsSync(PUBLIQUE_BRUTE) ? readFileSync(PUBLIQUE_BRUTE, "utf8").trim() : "";
const empreinte = createHash("sha256").update(pem).digest("hex");
const aujourdhui = new Date().toISOString().slice(0, 10);

/* Le PEM se recopie ligne à ligne : on numérote pour ne pas se perdre. */
const lignes = pem.split(/\r?\n/).filter(Boolean);

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<title>Clé racine des accès inerWeb — sauvegarde papier</title>
<style>
  @page { size:A4; margin:16mm; }
  body { font:12pt/1.5 Calibri,'Segoe UI',Arial,sans-serif; color:#000; margin:0; }
  h1 { font-size:17pt; margin:0 0 .2em; }
  .sous { color:#333; margin:0 0 1.4em; font-size:11pt; }
  .alerte { border:2.5pt solid #000; padding:10pt 12pt; margin:0 0 14pt; }
  .alerte strong { font-size:12.5pt; }
  h2 { font-size:13pt; margin:16pt 0 6pt; border-bottom:1.5pt solid #000; padding-bottom:2pt; }
  table.cle { border-collapse:collapse; width:100%; }
  table.cle td { border:.75pt solid #666; padding:4pt 6pt; vertical-align:top; }
  table.cle td.n { width:26pt; text-align:right; color:#444; font-size:9.5pt; }
  table.cle td.t { font:11.5pt/1.45 'Consolas','Courier New',monospace; letter-spacing:.4pt;
                   word-break:break-all; }
  ol { margin:6pt 0 0; padding-left:18pt; }
  li { margin-bottom:5pt; }
  code { font:10.5pt 'Consolas','Courier New',monospace; }
  .pied { margin-top:18pt; border-top:.75pt solid #666; padding-top:6pt;
          font-size:9.5pt; color:#333; }
  .empreinte { font:9.5pt 'Consolas','Courier New',monospace; word-break:break-all; }
  /* Le bandeau d'aide ne sort jamais à l'impression : il est là pour l'écran. */
  .ecran { background:#1b3a63; color:#fff; padding:14pt 16pt; margin:0 0 16pt;
           border-radius:8pt; font-size:11pt; }
  .ecran h3 { margin:0 0 6pt; font-size:12.5pt; }
  .ecran ol { margin:6pt 0 0; padding-left:18pt; }
  .ecran li { margin-bottom:4pt; }
  .ecran button { font:bold 12pt inherit; cursor:pointer; border:0; border-radius:999px;
                  padding:10pt 22pt; background:#ff6b35; color:#fff; margin-top:10pt; }
  .ecran code { background:rgba(255,255,255,.15); padding:1pt 5pt; border-radius:3pt; }
  @media print { .ecran { display:none !important; } }
</style></head><body>

<div class="ecran">
  <h3>Pas d'imprimante ? Enregistrez en PDF.</h3>
  <ol>
    <li>Cliquez sur le bouton ci-dessous.</li>
    <li>Dans « Destination » ou « Imprimante », choisissez
        <strong>« Enregistrer au format PDF »</strong>.</li>
    <li><strong>Rangez-le dans <code>C:\\git\\_secrets\\</code></strong> — surtout pas sur
        le Bureau ni dans un dossier OneDrive ou Google Drive : ce fichier contient votre
        clé en clair, il ne doit pas partir se synchroniser quelque part.</li>
    <li>Dès que vous avez une clé USB, copiez-y ce PDF. C'est ça, la vraie sauvegarde :
        un support qui n'est pas dans la machine.</li>
  </ol>
  <button type="button" onclick="window.print()">Imprimer ou enregistrer en PDF</button>
</div>

<h1>Clé racine des accès enseignant — inerWeb</h1>
<p class="sous">Sauvegarde papier du ${aujourdhui}. Cette clé signe tous les codes d'accès,
de tous les produits. <strong>Elle ne se remplace pas.</strong></p>

<div class="alerte">
  <strong>À ranger hors de vue, comme un document d'identité.</strong><br>
  Qui détient ces lignes peut fabriquer un accès à n'importe lequel de vos produits,
  au nom de n'importe qui. Ne la photographiez pas, ne l'envoyez pas, ne la laissez pas
  dans le bac de l'imprimante.
</div>

<h2>La clé — à recopier ligne par ligne</h2>
<table class="cle">
${lignes.map((l, i) => `<tr><td class="n">${i + 1}</td><td class="t">${l}</td></tr>`).join("\n")}
</table>

<h2>Pour la remettre en service</h2>
<ol>
  <li>Créer le dossier <code>C:\\git\\paquets\\acces-inerweb\\racine\\</code>.</li>
  <li>Y créer un fichier texte nommé <code>cle-privee.pem</code>.</li>
  <li>Y retaper les ${lignes.length} lignes ci-dessus, <strong>exactement</strong> :
      mêmes majuscules, mêmes tirets, une ligne par ligne, aucun espace ajouté.</li>
  <li>Vérifier que rien n'a été mal recopié :<br>
      <code>node build/test-acces.mjs</code> — si la clé est juste, le contrôle
      « elle est bien la clé publique de ce poste » passe au vert.</li>
</ol>

<h2>Pour vérifier que cette feuille est la bonne</h2>
<p>Empreinte SHA-256 du fichier d'origine :</p>
<p class="empreinte">${empreinte}</p>
${publique ? `<p>Clé <em>publique</em> correspondante (celle du site, qui n'a rien de secret) :</p>
<p class="empreinte">${publique}</p>` : ""}

<div class="pied">
  inerWeb — F. Henninot. Fiche produite par <code>build/fiche-cle-racine.mjs</code>.
  Après impression, supprimer le fichier <code>FICHE-A-IMPRIMER.html</code>.
</div>
</body></html>
`;

writeFileSync(SORTIE, html, "utf8");
console.log("✓ fiche écrite : " + SORTIE);
console.log("");
console.log("  1. ouvrez-la : le bouton en haut imprime, ou enregistre en PDF ;");
console.log("  2. rangez la sortie hors des dossiers synchronisés (pas le Bureau,");
console.log("     pas OneDrive, pas Google Drive) — C:/git/_secrets/ convient ;");
console.log("  3. supprimez ensuite ce fichier HTML — il contient la clé en clair.");
console.log("");
console.log("  empreinte de la clé : " + empreinte.slice(0, 32) + "…");

/* Feuille remplissable — Bureau d’études (copie adaptée de tp-tecvc/fabrique/commun/remplissable.js, 01/11/2026).
   Posé sur les feuilles réponse par outils/remplissable.mjs. À l’écran : les cases vides des tableaux,
   les blancs « ____ », les zones (.zone) et les lignes de réponse (.ligne-reponse) deviennent
   des champs ; une barre insère les symboles ; tout s'enregistre sur le poste (localStorage).
   « Enregistrer mon travail » écrit une copie du fichier, réponses comprises, sur la clé ou le dossier de la classe.
   À l'impression : la barre disparaît, la feuille sort à la charte, vide ou remplie. */
(function () {
  "use strict";
  var FICHIER = decodeURIComponent(location.pathname.split("/").pop());
  var CLE = "be:" + location.pathname + ":";   // une clé par station : toutes les feuilles s’appellent feuille-N1.html
  var BASE = FICHIER.replace(/\.html?$/i, "").split("__")[0];
  var SYMBOLES = ["λ", "Δ", "²", "³", "×", "÷", "·", "−", "°C", "→", "≈", "%"];
  var enregistre = true;
  var EMPORTE = null;

  function lire(k) {
    try { return localStorage.getItem(CLE + k); }
    catch (e) { enregistre = false; return EMPORTE ? EMPORTE[k] || null : null; }
  }
  function ecrire(k, v) {
    try { if (v) localStorage.setItem(CLE + k, v); else localStorage.removeItem(CLE + k); }
    catch (e) { enregistre = false; }
  }

  // Réponses emportées dans le fichier : elles passent devant celles du poste si elles sont plus récentes.
  var bloc = document.getElementById("reponses-enregistrees");
  if (bloc) {
    try {
      var r = JSON.parse(bloc.textContent);
      EMPORTE = r.champs;
      if (!(Number(lire("_maj")) >= r.date)) {
        Object.keys(localStorage).forEach(function (k) { if (k.indexOf(CLE) === 0) localStorage.removeItem(k); });
        Object.keys(r.champs).forEach(function (k) { ecrire(k, r.champs[k]); });
        ecrire("_maj", String(r.date));
      }
    } catch (e) { enregistre = false; }
    bloc.parentNode.removeChild(bloc);
  }
  var SOURCE = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;

  var css = document.createElement("style");
  css.textContent =
    ".champ{white-space:pre-wrap;color:#0b3d91;cursor:text}" +
    ".blanc{display:inline-block;border-bottom:1.5px solid #10233c;padding:0 3px;vertical-align:baseline;line-height:1.25}" +
    ".champ:empty::before{content:attr(data-placeholder);color:#8a94a3}" +
    "@media screen{.champ{background:#fffbe6;outline:1px dashed #b08a00;outline-offset:-1px}" +
    ".champ:focus{background:#fff;outline:2px solid #1b3a63}" +
    ".outils-remplir{position:sticky;top:0;z-index:10;display:flex;flex-wrap:wrap;gap:6px;align-items:center;" +
    "background:#1b3a63;color:#fff;padding:8px 10px;margin:0 0 10px;border-radius:0 0 6px 6px;font:14pt Calibri,Segoe UI,Arial,sans-serif}" +
    ".outils-remplir button{font:15pt Calibri,Segoe UI,Arial,sans-serif;min-width:40px;padding:3px 9px;border:1px solid #c7ccd4;border-radius:5px;background:#fff;color:#10233c;cursor:pointer}" +
    ".outils-remplir button.action{background:#c9451a;color:#fff;border-color:#c9451a;font-weight:bold}" +
    ".outils-remplir .etat{margin-left:auto;font-size:13pt;opacity:.9}}" +
    "@media print{.outils-remplir{display:none!important}.champ{outline:none!important;background:transparent!important}}";
  document.head.appendChild(css);

  var champs = [];
  function rendreChamp(el, cle, indice) {
    el.contentEditable = "plaintext-only";
    if (el.contentEditable !== "plaintext-only") el.contentEditable = "true";
    el.classList.add("champ");
    el.dataset.cle = cle;
    if (indice) el.dataset.placeholder = indice;
    var v = lire(cle);
    if (v) el.textContent = v;
    el.addEventListener("input", function () {
      var t = el.textContent;
      ecrire(cle, t);
      ecrire("_maj", String(Date.now()));
      champs.forEach(function (c) { if (c !== el && c.dataset.cle === cle) c.textContent = t; });
      etat();
    });
    champs.push(el);
  }

  // 1. Les blancs « ____ » des textes, et la case « Nom : » de l'en-tête.
  var marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      var p = n.parentNode;
      if (!p || /^(SCRIPT|STYLE)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
      return /_{3,}/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  var noeuds = [];
  while (marcheur.nextNode()) noeuds.push(marcheur.currentNode);
  var nb = 0;
  noeuds.forEach(function (n) {
    var morceaux = n.nodeValue.split(/(_{3,})/);
    var frag = document.createDocumentFragment();
    var avant = "";
    morceaux.forEach(function (m) {
      if (/^_{3,}$/.test(m)) {
        var s = document.createElement("span");
        s.className = "blanc";
        s.style.minWidth = Math.max(3, m.length * 0.5) + "em";
        var cle = /Nom\s*:\s*$/.test(avant) ? "nom" : "b" + (nb++);
        rendreChamp(s, cle);
        s.addEventListener("keydown", function (e) { if (e.key === "Enter") e.preventDefault(); });
        frag.appendChild(s);
      } else {
        frag.appendChild(document.createTextNode(m));
        avant += m;
      }
    });
    n.parentNode.replaceChild(frag, n);
  });
  Array.prototype.forEach.call(document.querySelectorAll("td"), function (td) {
    if (td.textContent.trim() === "Nom :") {
      var s = document.createElement("span");
      s.className = "blanc";
      s.style.minWidth = "12em";
      td.appendChild(document.createTextNode(" "));
      td.appendChild(s);
      rendreChamp(s, "nom");
    }
  });

  // 2. Les cases vides des tableaux de travail, les zones, les lignes de réponse.
  var i = 0;
  Array.prototype.forEach.call(document.querySelectorAll("table td"), function (td) {
    if (!td.textContent.trim() && !td.querySelector("img,svg,.champ")) rendreChamp(td, "t" + (i++));
  });
  Array.prototype.forEach.call(document.querySelectorAll(".zone"), function (z, k) {
    if (z.children.length) return;   // BE : .zone est aussi le cadre d'un exercice (titre, tableau) ; on ne vide que les zones sans enfant
    var indice = z.textContent.trim();
    z.textContent = "";
    rendreChamp(z, "z" + k, indice);
  });
  Array.prototype.forEach.call(document.querySelectorAll(".ligne-reponse"), function (l, k) {
    rendreChamp(l, "l" + k);
  });
  // BE : les lignes d'écriture (.lignes .l), dont l'amorce (« Je suppose que… ») reste visible tant que la ligne est vide.
  Array.prototype.forEach.call(document.querySelectorAll(".lignes .l"), function (l, k) {
    if (l.children.length) return;
    var indice = l.textContent.trim();
    l.textContent = "";
    rendreChamp(l, "e" + k, indice);
  });

  // 3. La barre : symboles, impression, remise à zéro.
  var barre = document.createElement("div");
  barre.className = "outils-remplir";
  barre.innerHTML = "<b>Feuille à remplir à l'écran</b>";
  var dernier = null;
  document.addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("champ")) dernier = e.target; });
  SYMBOLES.forEach(function (s) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = s;
    b.title = "Insérer " + s;
    b.addEventListener("mousedown", function (e) { e.preventDefault(); });
    b.addEventListener("click", function () {
      var cible = document.activeElement && document.activeElement.classList.contains("champ") ? document.activeElement : dernier;
      if (!cible) return;
      if (document.activeElement !== cible) {
        cible.focus();
        var r = document.createRange();
        r.selectNodeContents(cible);
        r.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      }
      document.execCommand("insertText", false, s);
    });
    barre.appendChild(b);
  });
  var sauver = document.createElement("button");
  sauver.type = "button";
  sauver.className = "action";
  sauver.textContent = "Enregistrer mon travail";
  sauver.title = "Écrit un fichier avec vos réponses : choisissez votre clé USB ou le dossier de la classe";
  sauver.addEventListener("click", function () {
    var caseNom = champs.filter(function (c) { return c.dataset.cle === "nom"; })[0];
    var nom = caseNom ? caseNom.textContent.trim() : "";
    if (caseNom && !nom) {
      alert("Écrivez d'abord votre nom en haut de la feuille, case « Nom ».");
      caseNom.focus();
      return;
    }
    var valeurs = {};
    champs.forEach(function (c) { if (c.textContent) valeurs[c.dataset.cle] = c.textContent; });
    var date = Date.now();
    var json = JSON.stringify({ date: date, champs: valeurs }).replace(/</g, "\\u003c");
    var html = SOURCE.replace(/<body[^>]*>/i, function (m) {
      return m + '\n<script type="application/json" id="reponses-enregistrees">' + json + "<\/script>";
    });
    var fichier = BASE + (nom ? "__" + nom.replace(/[^\wÀ-ÿ-]+/g, "-").replace(/^-+|-+$/g, "") : "") + ".html";
    var blob = new Blob([html], { type: "text/html" });
    ecrire("_maj", String(date));
    if (window.showSaveFilePicker) {
      window.showSaveFilePicker({ suggestedName: fichier, types: [{ description: "Page web", accept: { "text/html": [".html"] } }] })
        .then(function (h) { return h.createWritable(); })
        .then(function (w) { return w.write(blob).then(function () { return w.close(); }); })
        .then(function () { info.textContent = "Fichier enregistré : " + fichier; })
        .catch(function (e) { if (!e || e.name !== "AbortError") telecharger(blob, fichier); });
    } else telecharger(blob, fichier);
  });
  function telecharger(blob, fichier) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fichier;
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
    info.textContent = "Fichier dans « Téléchargements » : copiez-le sur votre clé";
  }
  barre.appendChild(sauver);
  var imprimer = document.createElement("button");
  imprimer.type = "button";
  imprimer.className = "action";
  imprimer.textContent = "Imprimer";
  imprimer.title = "Imprimer la feuille remplie, ou l'enregistrer en PDF (imprimante « Microsoft Print to PDF »)";
  imprimer.addEventListener("click", function () { window.print(); });
  barre.appendChild(imprimer);
  var effacer = document.createElement("button");
  effacer.type = "button";
  effacer.textContent = "Tout effacer";
  effacer.addEventListener("click", function () {
    if (!confirm("Effacer toutes vos réponses sur ce poste ?")) return;
    champs.forEach(function (c) { c.textContent = ""; ecrire(c.dataset.cle, ""); });
    ecrire("_maj", String(Date.now()));
    etat();
  });
  barre.appendChild(effacer);
  var info = document.createElement("span");
  info.className = "etat";
  barre.appendChild(info);
  function etat() {
    info.textContent = enregistre
      ? "Gardé sur ce poste. Avant de partir : enregistrez votre travail ou imprimez"
      : "⚠ Rien n'est gardé sur ce poste : enregistrez votre travail ou imprimez avant de fermer";
  }
  etat();
  document.body.insertBefore(barre, document.body.firstChild);
})();

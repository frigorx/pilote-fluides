/* Socle pressostats : moteur du cours. Lit window.PRESSOSTAT_PAGE (page.js) et window.PRESSOSTAT_TEXTES (textes.js).
   Contrat : remplit #etapes, #ecran, la barre de navigation, la voix et les sources ; aucun texte visible n'est écrit ici.
   Dessins : PressostatDessins.creer(type, options) rend { noeud, regler(etat), reperes }. Les seuils des contacts sont
   calculés ici, le dessin affiche l'état reçu. L'adresse porte l'écran (#ecran-<id>, #questions).
   Aucun stockage, aucun réseau. Sans dépendance, sans module. */
(function () {
  "use strict";
  var PAGE = window.PRESSOSTAT_PAGE, T = window.PRESSOSTAT_TEXTES, DES = window.PressostatDessins;
  if (!PAGE || !T) return;
  var ECRANS = PAGE.ecrans || [], QUIZ = PAGE.quiz || [], VAL = PAGE.valeurs || {};
  var BP = VAL.bp || {}, HP = VAL.hp || {};
  var NB = ECRANS.length, TOTAL = NB + 1; /* le dernier écran du parcours : les questions */
  var courant = -1, reponses = [], minuteurs = [], compteur = 0;

  /* ---------- Petits outils ---------- */
  function $(id) { return document.getElementById(id); }

  function h(tag, attrs, enfants) {
    var n = document.createElement(tag), k, v;
    for (k in attrs || {}) {
      v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "texte") n.textContent = v;
      else n.setAttribute(k, v === true ? "" : v);
    }
    (enfants || []).forEach(function (c) {
      if (c != null) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  function vider(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function modele(s, vars) { return String(s || "").replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; }); }
  function arrondi(x, d) { var f = Math.pow(10, d); return Math.round(x * f) / f; }

  /* Nombre à la française : virgule, vrai signe moins. dec fixe le nombre de décimales, sinon 2 au plus. */
  function nb(x, dec) {
    var s = dec == null ? String(arrondi(x, 2)) : arrondi(x, dec).toFixed(dec);
    return s.replace(".", ",").replace("-", "−");
  }

  function lire(s) {
    var t = String(s).replace(/\s/g, "").replace(",", ".").replace("−", "-");
    return t === "" || t === "-" ? NaN : Number(t);
  }

  /* Une formule (« a − b = c ») ne se coupe jamais : elle va dans un span.formule. */
  var OPD = "−?[\\p{L}\\d][\\p{L}\\d,.]*";
  var FORMULE = new RegExp(OPD + "(?:\\s[−+=]\\s" + OPD + ")+(?:\\s(?:bar|°C))?", "gu");

  /* Une chaîne « a = b = c » trop longue ne se coupe qu'avant un « = » : chaque morceau reste entier. */
  function morceaux(f) {
    var parts = f.split(" = "), out = [parts[0]], k;
    if (parts.length < 3) return [f];
    for (k = 1; k < parts.length; k++) {
      if ((out[out.length - 1] + " = " + parts[k]).length <= 40) out[out.length - 1] += " = " + parts[k];
      else out.push("= " + parts[k]);
    }
    return out;
  }

  function riche(parent, texte) {
    var s = String(texte == null ? "" : texte), dernier = 0, m;
    FORMULE.lastIndex = 0;
    while ((m = FORMULE.exec(s))) {
      if (m[0].indexOf("=") < 0) continue;
      if (m.index > dernier) parent.appendChild(document.createTextNode(s.slice(dernier, m.index)));
      morceaux(m[0]).forEach(function (p, k) {
        if (k) parent.appendChild(document.createTextNode(" "));
        parent.appendChild(h("span", { class: "formule", texte: p }));
      });
      dernier = m.index + m[0].length;
    }
    if (dernier < s.length) parent.appendChild(document.createTextNode(s.slice(dernier)));
    return parent;
  }

  /* Formule affichée seule : « légende : formule » ne coupe que la légende. */
  function formuleSeule(parent, texte) {
    var i = String(texte).lastIndexOf(" : ");
    if (i >= 0) parent.appendChild(document.createTextNode(texte.slice(0, i + 3)));
    parent.appendChild(h("span", { class: "formule", texte: i >= 0 ? texte.slice(i + 3) : texte }));
    return parent;
  }

  function appliquer(d, etat) { try { if (d && d.regler) d.regler(etat); } catch (e) { /* un dessin en chantier ne doit pas casser la page */ } }
  function calme() { try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; } }
  function arretVoix() { try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { /* voix absente */ } }
  function effacerMinuteurs() { minuteurs.forEach(clearTimeout); minuteurs = []; }

  /* ---------- Options des dessins ---------- */
  function echelles() {
    var e = { bp: { min: -0.2, max: 3 }, hp: { min: 6, max: 18 } };
    ECRANS.forEach(function (x) {
      var d = x.dessin;
      if (d && d.type === "coupe" && d.curseur && (d.cote === "bp" || d.cote === "hp")) e[d.cote] = { min: d.curseur.min, max: d.curseur.max };
    });
    return e;
  }

  function depart(cote) {
    var v = cote === "hp" ? 9 : 2.2;
    ECRANS.forEach(function (x) {
      var d = x.dessin;
      if (d && d.type === "coupe" && d.cote === cote && d.curseur && d.curseur.depart != null) v = d.curseur.depart;
    });
    return v;
  }

  /* Largeur disponible pour le dessin (px), estimée avant qu'il soit posé dans la page. */
  function largeurDessin() {
    var cours = $("cours"), w = window.innerWidth, dispo;
    if (!cours) return w;
    dispo = cours.clientWidth - (w < 1000 ? 26 : 52);
    if (w >= 1000) dispo = (dispo - 32) * 11 / 20;
    return dispo;
  }

  function optionsDessin(ec) {
    var src = ec.dessin || {}, o = {}, k, t = src.type, prises = { combine: "deux", bp: "bp", hp: "hp" };
    for (k in src) o[k] = src[k];
    o.valeurs = VAL;
    o.echelles = echelles();
    o.label = ec.legende || (ec.legendes && ec.legendes[(src.etats || [])[0]]) || "";
    if ((t === "face" || t === "bornes" || t === "versions") && !o.modele) o.modele = PAGE.modele;
    if (t === "circuit" && !o.prises) o.prises = prises[PAGE.modele] || "deux";
    if (t === "plaque") {
      o.plage = (VAL[o.cote] || {}).plage;
      if (o.cote === "bp") o.diffPlage = BP.diffPlage;
    }
    if ((t === "bornes" || t === "versions" || t === "circuit") && largeurDessin() < 480) o.etroit = true;
    if (t === "coupe" && src.curseur && window.innerWidth < 760) o.compact = true;
    if (t === "versions" && o.surligner == null && ec.tableaux && ec.tableaux[0]) o.surligner = ec.tableaux[0].surligner;
    return o;
  }

  function creerFigure(ec) {
    var d = null, fig = h("figure", { class: "figure" }), cap = h("figcaption", { class: "legende" });
    try { d = DES && DES.creer ? DES.creer((ec.dessin || {}).type, optionsDessin(ec)) : null; } catch (e) { d = null; }
    if (d && d.noeud) fig.appendChild(d.noeud);
    riche(cap, ec.legende || "");
    fig.appendChild(cap);
    if (d && d.forces && T.legendeForces) fig.appendChild(h("p", { class: "legende-forces", texte: T.legendeForces }));
    return { dessin: d, figure: fig, legende: cap };
  }

  /* ---------- Curseur ---------- */
  /* o : libelle, min, max, pas, valeur, dec, boutons (− et +), change(v). Rend { noeud, lire, ecrire }. */
  function curseur(o) {
    var id = "curseur-" + (++compteur);
    var champ = h("input", { type: "range", id: id, class: "curseur-champ", min: o.min, max: o.max, step: o.pas });
    var val = h("span", { class: "curseur-valeur", "aria-hidden": "true" });
    champ.value = o.valeur;
    function valeur() { return arrondi(Number(champ.value), 2); }
    function maj() {
      var txt = nb(valeur(), o.dec) + " " + T.unite;
      val.textContent = txt;
      champ.setAttribute("aria-valuetext", txt);
    }
    function change() { maj(); if (o.change) o.change(valeur()); }
    function pas(sens) {
      return h("button", {
        type: "button", class: "curseur-pas", "aria-label": sens < 0 ? T.moins : T.plus, texte: sens < 0 ? "−" : "+"
      });
    }
    var ligne = h("div", { class: "curseur-ligne" });
    if (o.boutons) {
      var moins = pas(-1), plus = pas(1);
      moins.addEventListener("click", function () { champ.stepDown(); change(); });
      plus.addEventListener("click", function () { champ.stepUp(); change(); });
      ligne.appendChild(moins); ligne.appendChild(champ); ligne.appendChild(plus);
    } else ligne.appendChild(champ);
    champ.addEventListener("input", change);
    maj();
    return {
      noeud: h("div", { class: "curseur" }, [h("div", { class: "curseur-tete" }, [h("label", { class: "curseur-libelle", for: id, texte: o.libelle }), val]), ligne]),
      lire: valeur
    };
  }

  /* ---------- Outil : curseur de pression sur une coupe ---------- */
  function etatCoupe(cote, p, ouvert, appui) {
    var e = {};
    e[cote] = { p: p, ouvert: ouvert };
    if (appui) e.appui = true;
    return e;
  }

  function outilPression(ec, fig, zone) {
    var dess = ec.dessin, cote = dess.cote === "hp" ? "hp" : "bp", c = dess.curseur, v = cote === "hp" ? HP : BP;
    var msgs = ec.messages || {}, dec = cote === "hp" ? 1 : 2, ouvert = false, appui = false, bouton = null;
    var ligne = h("p", { class: "message", role: "status", "aria-live": "polite" });
    var cur = curseur({
      libelle: cote === "hp" ? T.curseurHp : T.curseurBp, min: c.min, max: c.max, pas: c.pas, valeur: c.depart, dec: dec,
      boutons: true, change: function (p) { evaluer(p); }
    });

    function envoyer(p) {
      if (bouton) bouton.setAttribute("aria-disabled", ouvert ? "false" : "true");
      appliquer(fig.dessin, cote === "hp" ? { hp: { p: p, ouvert: ouvert }, appui: appui } : etatCoupe(cote, p, ouvert, false));
    }

    function afficher(p, cle) {
      ligne.textContent = modele(msgs[cle] || "", { p: nb(p, dec) });
      envoyer(p);
    }

    function evaluer(p) {
      var cle;
      if (cote === "hp") {
        if (!ouvert && p >= v.coupure) { ouvert = true; cle = "coupe"; }
        else if (ouvert && v.rearmement === "auto" && p <= v.retour) { ouvert = false; cle = "repart"; }
        else if (ouvert) cle = p > v.retour ? "attente" : "pret";
        else cle = "marche";
      } else if (!ouvert && p <= v.coupure) { ouvert = true; cle = "coupe"; }
      else if (ouvert && v.rearmement === "auto" && p >= v.enclenchement) { ouvert = false; cle = "repart"; }
      else cle = ouvert ? "arret" : "marche";
      afficher(p, cle);
    }

    function appuyer() {
      var p = cur.lire(), cle;
      if (!ouvert) return;
      if (p <= v.retour) { ouvert = false; cle = "rearme"; } else cle = "refus";
      appui = true;
      afficher(p, cle);
      minuteurs.push(setTimeout(function () { appui = false; envoyer(cur.lire()); }, 350));
    }

    zone.appendChild(cur.noeud);
    if (dess.bouton) {
      bouton = h("button", { type: "button", class: "bouton-principal", "aria-disabled": "true", texte: T.rearmer });
      bouton.addEventListener("click", appuyer);
      zone.appendChild(bouton);
    }
    zone.appendChild(ligne);
    evaluer(cur.lire());
  }

  /* Vue sans curseur : état fixe (départ des curseurs de la page). */
  function etatFixe(ec, fig) {
    var cote = (ec.dessin || {}).cote, e = {};
    if (cote !== "hp") e.bp = { p: depart("bp"), ouvert: false };
    if (cote !== "bp") e.hp = { p: depart("hp"), ouvert: false };
    appliquer(fig.dessin, e);
  }

  /* ---------- Outil : états des bornes ---------- */
  function outilBornes(ec, fig, zone) {
    var etats = (ec.dessin && ec.dessin.etats) || Object.keys(ec.boutons || {}), boutons = {};
    var groupe = h("div", { class: "groupe-boutons", role: "group", "aria-labelledby": "ecran-titre" });
    function choisir(e) {
      appliquer(fig.dessin, { etat: e });
      vider(fig.legende);
      riche(fig.legende, (ec.legendes || {})[e] || ec.legende || "");
      etats.forEach(function (x) { boutons[x].setAttribute("aria-pressed", x === e ? "true" : "false"); });
    }
    etats.forEach(function (e) {
      boutons[e] = h("button", { type: "button", class: "bouton-choix", "aria-pressed": "false", texte: (ec.boutons || {})[e] || e });
      boutons[e].addEventListener("click", function () { choisir(e); });
      groupe.appendChild(boutons[e]);
    });
    fig.legende.setAttribute("aria-live", "polite");
    zone.appendChild(groupe);
    if (etats.length) choisir(etats[0]);
  }

  /* ---------- Outil : plaque et carte de calcul ---------- */
  function outilPlaque(ec, fig, zone) {
    var cote = ec.dessin.cote === "hp" ? "hp" : "bp";
    var carte = h("div", { class: "carte-calcul" });
    var formule = h("p", { class: "calcul-formule" });
    var resultat = h("p", { class: "calcul-resultat", role: "status", "aria-live": "polite" });
    carte.appendChild(h("h3", { class: "calcul-titre", texte: T.calculTitre }));
    if (ec.calcul && ec.calcul.formule) { formuleSeule(formule, ec.calcul.formule); carte.appendChild(formule); }
    carte.appendChild(resultat);

    function ecrireResultat(gabarit, a, b, r) {
      vider(resultat);
      resultat.className = "calcul-resultat" + (cote === "bp" && r <= -1 ? " alerte" : "");
      if (cote === "bp" && r <= -1) resultat.textContent = modele(T.alerteVide, { r: nb(r) });
      else riche(resultat, modele(gabarit, { a: nb(a), b: nb(b), r: nb(r) }));
    }

    if (cote === "bp") {
      var pl = BP.plage || [-0.2, 7.5], dp = BP.diffPlage || [0.7, 4], encl, diff;
      var majBp = function () {
        var a = encl.lire(), b = diff.lire(), r = arrondi(a - b, 2);
        appliquer(fig.dessin, { enclenchement: a, differentiel: b });
        ecrireResultat(T.resultatBp, a, b, r);
      };
      encl = curseur({ libelle: T.enclenchementAffiche, min: pl[0], max: pl[1], pas: 0.05, valeur: BP.enclenchement, dec: 2, change: majBp });
      diff = curseur({ libelle: T.differentielAffiche, min: dp[0], max: dp[1], pas: 0.05, valeur: BP.differentiel, dec: 2, change: majBp });
      zone.appendChild(encl.noeud); zone.appendChild(diff.noeud); zone.appendChild(carte);
      majBp();
    } else {
      var ph = HP.plage || [8, 32], coup;
      var diffHp = HP.differentiel;
      var majHp = function () {
        var a = coup.lire();
        appliquer(fig.dessin, { coupure: a });
        ecrireResultat(T.resultatHp, a, diffHp, arrondi(a - diffHp, 2));
      };
      coup = curseur({ libelle: T.coupureAffichee, min: ph[0], max: ph[1], pas: 0.5, valeur: HP.coupure, dec: 1, change: majHp });
      zone.appendChild(coup.noeud);
      zone.appendChild(h("p", { class: "calcul-fixe", texte: modele(T.differentielFixe, { b: nb(diffHp) }) }));
      zone.appendChild(carte);
      majHp();
    }
  }

  function outils(ec, fig, zone) {
    var d = ec.dessin || {};
    if (d.type === "coupe") { if (d.curseur) outilPression(ec, fig, zone); else etatFixe(ec, fig); }
    else if (d.type === "bornes") outilBornes(ec, fig, zone);
    else if (d.type === "plaque") outilPlaque(ec, fig, zone);
  }

  /* ---------- Contenu d'un écran ---------- */
  function liste(items, classe) {
    var ol = h("ol", { class: classe || "liste-etapes" });
    (items || []).forEach(function (t) { ol.appendChild(riche(h("li"), t)); });
    return ol;
  }

  function reperes(ec, fig, parent) {
    /* Les numéros viennent du dessin. Le rôle de chaque pièce vient de la page, retrouvé par le nom (ou par le numéro). */
    var duDessin = (fig.dessin && fig.dessin.reperes) || [], deLaPage = ec.reperes || [], l;
    function role(r) {
      var i, p;
      for (i = 0; i < deLaPage.length; i++) {
        p = deLaPage[i];
        if ((p.nom && r.nom && p.nom.toLowerCase() === r.nom.toLowerCase()) || (p.n != null && p.n === r.n && !p.nom)) return p.role;
      }
      return "";
    }
    if (duDessin.length) l = duDessin.map(function (r) { return { n: r.n, nom: r.nom, role: role(r) }; });
    else l = deLaPage.map(function (p, i) { return { n: p.n != null ? p.n : i + 1, nom: p.nom, role: p.role }; });
    if (!l.length) return;
    var ol = h("ol", { class: "reperes", role: "list", "aria-label": T.legendeReperes });
    l.forEach(function (r) {
      var t = r.nom + (r.role ? ", " + r.role : "");
      ol.appendChild(h("li", { value: r.n }, [h("strong", { class: "repere-n", texte: String(r.n) }), " : ", riche(h("span"), t)]));
    });
    parent.appendChild(h("div", { class: "bloc-reperes" }, [h("p", { class: "bloc-titre", texte: T.legendeReperes }), ol]));
  }

  function tableau(t, parent) {
    var idT = "tab-" + (++compteur), tb = h("tbody"), thead = h("tr"), cols = t.colonnes || [];
    (t.colonnes || []).forEach(function (c) { thead.appendChild(h("th", { scope: "col", texte: c })); });
    (t.lignes || []).forEach(function (ligne, i) {
      var tr = h("tr", { class: t.surligner === i ? "surligne" : null });
      ligne.forEach(function (cell, j) {
        tr.appendChild(riche(h(j === 0 ? "th" : "td", j === 0 ? { scope: "row" } : { "data-label": cols[j] }), cell));
      });
      tb.appendChild(tr);
    });
    parent.appendChild(h("h3", { id: idT, class: "bloc-titre", texte: t.titre || "" }));
    parent.appendChild(h("div", { class: "tableau-defilant", tabindex: "0", role: "region", "aria-labelledby": idT },
      [h("table", null, [h("thead", null, [thead]), tb])]));
  }

  /* Téléphone : un tableau qui ne tient pas dans la largeur devient une suite de fiches (celui de index.html aussi). */
  function tableauxEnFiches() {
    var tel = window.innerWidth < 760;
    Array.prototype.forEach.call(document.querySelectorAll(".tableau-defilant"), function (c) {
      var t = c.querySelector("table"), noms, lignes;
      if (!t || t.classList.contains("table-releves")) return;
      if (!tel) { c.classList.remove("fiches-auto"); return; }
      noms = Array.prototype.map.call(t.querySelectorAll("thead th"), function (x) { return x.textContent; });
      Array.prototype.forEach.call(t.querySelectorAll("tbody tr"), function (tr) {
        Array.prototype.forEach.call(tr.children, function (td, j) { if (td.tagName === "TD" && !td.hasAttribute("data-label")) td.setAttribute("data-label", noms[j] || ""); });
      });
      if (noms.length > 3 || c.scrollWidth > c.clientWidth + 1) c.classList.add("fiches-auto");
    });
  }

  function colonnesReleves() {
    var m = PAGE.modele;
    if (m === "hp") return [{ l: T.relevesCoupure, v: HP.coupure }];
    if (m === "bp") return [{ l: T.relevesCoupure, v: BP.coupure }, { l: T.relevesEnclenchement, v: BP.enclenchement }, { l: T.relevesDifferentiel, v: BP.differentiel, calcul: true }];
    return [{ l: T.relevesCoupureBp, v: BP.coupure }, { l: T.relevesEnclenchementBp, v: BP.enclenchement }, { l: T.relevesDifferentielBp, v: BP.differentiel, calcul: true }, { l: T.relevesCoupureHp, v: HP.coupure }];
  }

  function releves(r, parent) {
    var cols = colonnesReleves(), tb = h("tbody"), tete = h("tr", null, [h("td")]), n, sect;
    cols.forEach(function (c) { tete.appendChild(h("th", { scope: "col", texte: c.l })); });
    for (n = 1; n <= (r.essais || 3); n++) tb.appendChild(ligneReleves(cols, modele(T.relevesEssai, { n: n })));
    var voulu = h("tr", { class: "voulu" }, [h("th", { scope: "row", texte: T.relevesVoulu })]);
    cols.forEach(function (c) { voulu.appendChild(h("td", { "data-label": c.l, texte: nb(c.v) + " " + T.unite })); });
    tb.appendChild(voulu);
    sect = h("section", { class: "releves" }, [
      h("h3", { class: "bloc-titre", texte: r.titre || "" }),
      r.consigne ? h("p", { texte: r.consigne }) : null,
      h("div", { class: "tableau-defilant" }, [h("table", { class: "table-releves" }, [h("thead", null, [tete]), tb])])
    ]);
    parent.appendChild(sect);
  }

  function ligneReleves(cols, nom) {
    var tr = h("tr", null, [h("th", { scope: "row", texte: nom })]), champs = [], sortie = null;
    function calculer() {
      var a = lire(champs[0].value), b = lire(champs[1] ? champs[1].value : ""), ok = !isNaN(a) && !isNaN(b);
      if (sortie) sortie.textContent = ok ? nb(b - a) : "";
    }
    cols.forEach(function (c) {
      var td = h("td", { "data-label": c.l }), champ;
      if (c.calcul) { sortie = h("span", { class: "calcule" }); td.appendChild(sortie); }
      else {
        champ = h("input", { type: "text", inputmode: "decimal", autocomplete: "off", class: "champ-releve", "aria-label": c.l + ", " + nom });
        champ.addEventListener("input", calculer);
        champs.push(champ);
        td.appendChild(champ);
      }
      tr.appendChild(td);
    });
    return tr;
  }

  function encadre(e, parent) {
    var genre = e.genre || "info";
    parent.appendChild(h("aside", { class: "encadre " + genre, role: "note" }, [
      genre === "attention" ? h("span", { class: "encadre-picto", "aria-hidden": "true", texte: "⚠" }) : null,
      riche(h("p"), e.texte || "")
    ]));
  }

  function rendreEcran(i) {
    var ec = ECRANS[i], art = $("ecran"), avecFigure = !!(ec.dessin && ec.dessin.type);
    var fig = avecFigure ? creerFigure(ec) : null, cmd = h("div", { class: "commandes" });
    var colF = h("div", { class: "colonne-figure" }), colT = h("div", { class: "colonne-texte" });
    vider(art);
    art.setAttribute("aria-labelledby", "ecran-titre");
    art.appendChild(h("h2", { id: "ecran-titre", class: "ecran-titre", texte: ec.titre || "" }));
    if (fig) {
      colF.appendChild(fig.figure);
      outils(ec, fig, cmd);
      reperes(ec, fig, colT);
    }
    if (ec.etapes) colT.appendChild(liste(ec.etapes));
    (ec.blocs || []).forEach(function (b) {
      colT.appendChild(h("h3", { class: "bloc-titre", texte: b.titre || "" }));
      colT.appendChild(liste(b.etapes));
    });
    (ec.texte || []).forEach(function (p) { colT.appendChild(riche(h("p"), p)); });
    var pleins = h("div", { class: "tableaux-pleins" });
    (ec.tableaux || []).forEach(function (t) { tableau(t, pleins); });
    if (ec.releves) releves(ec.releves, colT);
    if (ec.encadre) encadre(ec.encadre, colT);
    var avecCmd = !!cmd.firstChild;
    art.appendChild(h("div", { class: "ecran-corps" + (fig ? "" : " sans-figure") + (avecCmd ? "" : " sans-commandes") },
      fig ? (avecCmd && ec.dessin.curseur ? [h("div", { class: "zone-outil" }, [colF, cmd]), colT] : [colF, avecCmd ? cmd : null, colT]) : [colT]));
    if (pleins.firstChild) art.appendChild(pleins);
    tableauxEnFiches();
  }

  /* ---------- Questions ---------- */
  function indexEcran(id) {
    var i;
    for (i = 0; i < NB; i++) if (ECRANS[i].id === id) return i;
    return -1;
  }

  function rendreQuestions() {
    var art = $("ecran"), ol = h("ol", { class: "questions" }), bilan = h("p", { class: "bilan", role: "status", "aria-live": "polite" });
    vider(art);
    art.setAttribute("aria-labelledby", "ecran-titre");
    art.appendChild(h("h2", { id: "ecran-titre", class: "ecran-titre", texte: T.questionsTitre }));
    art.appendChild(h("p", { class: "consigne", texte: modele(T.questionsConsigne, { t: QUIZ.length }) }));

    function majBilan() {
      var faites = 0, justes = 0;
      QUIZ.forEach(function (q, k) { if (reponses[k] != null) { faites++; if (reponses[k] === q.bonne) justes++; } });
      bilan.textContent = faites && faites === QUIZ.length ? modele(justes === QUIZ.length ? T.bilanTout : T.bilanPartiel, { n: justes, t: QUIZ.length }) : "";
    }

    QUIZ.forEach(function (q, k) {
      var idE = "enonce-" + k, retour = h("div", { class: "retour", role: "status", "aria-live": "polite" }), boutons = [];
      var choix = h("div", { class: "choix", role: "group", "aria-labelledby": idE });
      function montrer() {
        var c = reponses[k], bon = c === q.bonne;
        boutons.forEach(function (b, j) {
          b.setAttribute("aria-disabled", "true");
          if (j === q.bonne) { b.classList.add("juste"); b.insertBefore(h("span", { class: "marque-choix", "aria-hidden": "true", texte: "✓" }), b.firstChild); }
          else if (j === c) { b.classList.add("faux"); b.insertBefore(h("span", { class: "marque-choix", "aria-hidden": "true", texte: "✗" }), b.firstChild); }
        });
        vider(retour);
        retour.className = "retour " + (bon ? "juste" : "faux");
        retour.appendChild(h("p", { class: "verdict", texte: bon ? T.bonneReponse : T.mauvaiseReponse }));
        retour.appendChild(riche(h("p", { class: "explication" }), q.explication || ""));
        if (!bon && indexEcran(q.revoir) >= 0) {
          var rev = h("button", { type: "button", class: "bouton-choix revoir", texte: T.revoir });
          rev.addEventListener("click", function () { aller(indexEcran(q.revoir), { adresse: true, interaction: true }); });
          retour.appendChild(rev);
        }
        majBilan();
      }
      (q.choix || []).forEach(function (texte, j) {
        var b = h("button", { type: "button", class: "bouton-choix choix-reponse" }, [h("span", { class: "choix-texte", texte: texte })]);
        b.addEventListener("click", function () { if (reponses[k] != null) return; reponses[k] = j; montrer(); });
        boutons.push(b);
        choix.appendChild(b);
      });
      ol.appendChild(h("li", { class: "question" }, [h("p", { id: idE, class: "enonce", texte: q.question || "" }), choix, retour]));
      if (reponses[k] != null) montrer();
    });
    art.appendChild(ol);
    art.appendChild(bilan);
    majBilan();
  }

  /* ---------- Navigation ---------- */
  function adresseDe(i) { return i < NB ? "#ecran-" + ECRANS[i].id : "#questions"; }

  function indexDepuisAdresse() {
    var hash = location.hash, m = /^#ecran-(.+)$/.exec(hash);
    if (m) return indexEcran(decodeURIComponent(m[1]));
    return hash === "#questions" ? NB : -1;
  }

  function majNavigation() {
    var nav = $("etapes"), btns = nav.querySelectorAll("button"), k, actif = null;
    for (k = 0; k < btns.length; k++) {
      if (k === courant) { btns[k].setAttribute("aria-current", "step"); actif = btns[k]; } else btns[k].removeAttribute("aria-current");
    }
    if (actif && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: Math.max(0, actif.offsetLeft - (nav.clientWidth - actif.offsetWidth) / 2), behavior: calme() ? "auto" : "smooth" });
    }
    if ($("previous-button")) $("previous-button").disabled = courant <= 0;
    if ($("next-button")) $("next-button").disabled = courant >= TOTAL - 1;
    if ($("position")) $("position").textContent = modele(T.position, { n: courant + 1, t: TOTAL });
  }

  function defiler(force) {
    var cours = $("cours");
    if (!cours) return;
    var r = cours.getBoundingClientRect();
    if (force || r.top < 0) window.scrollTo({ top: window.pageYOffset + r.top - 8, behavior: calme() ? "auto" : "smooth" });
  }

  /* o : adresse (écrire l'adresse), interaction (focus, annonce, défilement), force (forcer le défilement). */
  function aller(i, o) {
    o = o || {};
    i = Math.max(0, Math.min(TOTAL - 1, i));
    if (i === courant) return;
    arretVoix();
    effacerMinuteurs();
    courant = i;
    if (i < NB) rendreEcran(i); else rendreQuestions();
    majNavigation();
    if (o.adresse && location.hash !== adresseDe(i)) {
      try { history.pushState(null, "", adresseDe(i)); } catch (e) { location.hash = adresseDe(i); }
    }
    if (o.interaction) {
      var live = $("live-status");
      $("ecran").focus({ preventScroll: true });
      if (live) live.textContent = modele(T.position, { n: i + 1, t: TOTAL }) + " : " + (i < NB ? ECRANS[i].titre : T.questionsTitre);
      defiler(o.force);
    }
  }

  function surAdresse() {
    var i = indexDepuisAdresse();
    if (i < 0 && !location.hash) i = 0;
    if (i >= 0 && i !== courant) aller(i, { interaction: true });
  }

  function construireEtapes() {
    var nav = $("etapes");
    vider(nav);
    ECRANS.forEach(function (ec, i) {
      var b = h("button", { type: "button", class: "etape", texte: ec.court || ec.titre || "" });
      b.addEventListener("click", function () { aller(i, { adresse: true, interaction: true }); });
      nav.appendChild(b);
    });
    var q = h("button", { type: "button", class: "etape", texte: T.questions });
    q.addEventListener("click", function () { aller(NB, { adresse: true, interaction: true }); });
    nav.appendChild(q);
  }

  /* ---------- Voix ---------- */
  function texteVoix() {
    if (courant >= NB) return modele(T.questionsConsigne, { t: QUIZ.length });
    return (ECRANS[courant] || {}).narration || "";
  }

  function lireVoix() {
    var txt = texteVoix();
    if (!txt || !window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(txt);
    u.lang = "fr-FR";
    window.speechSynthesis.speak(u);
  }

  /* ---------- Sources ---------- */
  function brancherSources() {
    var dlg = $("sources-dialog"), corps = $("sources-body"), ouvrir = $("sources-button"), fermer = $("sources-close");
    if (!dlg || !corps || !ouvrir) return;
    var ul = h("ul", { class: "sources-liste" });
    (PAGE.sources || []).forEach(function (s) {
      ul.appendChild(h("li", null, [h("p", { class: "source-titre", texte: s.titre || "" }), h("p", { class: "source-usage", texte: T.sourceUsage + " : " + (s.usage || "") })]));
    });
    corps.appendChild(ul);
    function ferme() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
    ouvrir.addEventListener("click", function () { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); });
    if (fermer) { fermer.setAttribute("aria-label", T.fermer); fermer.addEventListener("click", ferme); }
    dlg.addEventListener("click", function (e) {
      var r = dlg.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) ferme();
    });
    dlg.addEventListener("keydown", function (e) { if (e.key === "Escape" && !dlg.showModal) ferme(); });
  }

  /* ---------- Mise en route ---------- */
  function demarrer() {
    if (!$("etapes") || !$("ecran") || !NB) return;
    var prec = $("previous-button"), suiv = $("next-button"), voix = $("voice-button"), stop = $("stop-voice");
    construireEtapes();
    if (prec) { prec.textContent = T.retour; prec.addEventListener("click", function () { aller(courant - 1, { adresse: true, interaction: true }); }); }
    if (suiv) { suiv.textContent = T.continuer; suiv.addEventListener("click", function () { aller(courant + 1, { adresse: true, interaction: true }); }); }
    if (voix) { voix.textContent = T.ecouter; voix.addEventListener("click", lireVoix); }
    if (stop) { stop.setAttribute("aria-label", T.arreter); stop.addEventListener("click", arretVoix); }
    brancherSources();

    document.addEventListener("keydown", function (e) {
      var t = e.target;
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable || (t.closest && t.closest(".tableau-defilant")))) return;
      if ($("sources-dialog") && $("sources-dialog").open) return;
      aller(courant + (e.key === "ArrowRight" ? 1 : -1), { adresse: true, interaction: true });
    });
    window.addEventListener("resize", tableauxEnFiches);
    window.addEventListener("hashchange", surAdresse);
    window.addEventListener("popstate", surAdresse);

    var i = indexDepuisAdresse();
    aller(i >= 0 ? i : 0, {});
    if (i >= 0) requestAnimationFrame(function () { defiler(true); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer); else demarrer();
})();

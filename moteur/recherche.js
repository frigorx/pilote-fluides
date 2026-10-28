/* =====================================================================
   recherche.js — trouver un cours dans tout le site, même mal écrit
   ---------------------------------------------------------------------
   POURQUOI (28/10/2026) : « inverter » ne trouvait rien, « invertère »
   non plus. Deux défauts mêlés : la recherche ne lisait que le plan
   thermo-techno, et elle exigeait le mot exact.

   L'ORDRE DES RECOURS, du plus sûr au plus large :
   1. le mot tapé, tel quel, dans le titre, le sous-titre, la ligne ;
   2. les autres façons de dire le même mot, tenues à la main dans
      moteur/lexique-recherche.js (invertère, onduleur → inverter) ;
   3. la description du cours, quand les titres ne donnent rien ;
   4. la correction automatique : le mot du site le plus proche, à une ou
      deux lettres près, après un passage « à l'oreille » (invertaire →
      inverter, condanseur → condenseur). Elle est ANNONCÉE au lecteur ;
   5. enfin, si aucun cours ne contient TOUS les mots, ceux qui en
      contiennent le plus.
   Ce qui est trouvé par le mot exact passe toujours devant.

   Écrit en JavaScript ancien (var, function) : les mini-PC du lycée
   tournent sur de vieux navigateurs, comme le reste du moteur.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Plier le texte ------------------------------------- */

  /* Les diacritiques s'écrivent en \u…, jamais avec les caractères eux-
     mêmes (même règle que l'ancienne recherche : l'encodage du fichier
     au moment où il est servi ne doit rien changer). */
  var DIACR = /[\u0300-\u036f]/g;
  var SPECIAUX = {
    "₂": "2", "²": "2", "³": "3", "’": "'",
    "œ": "o", "Œ": "o", "æ": "a", "Æ": "a"
  };

  /* Caractère par caractère : le texte plié a la MÊME longueur que
     l'original. C'est ce qui permet de surligner au bon endroit. */
  function plierCar(c) {
    if (SPECIAUX[c]) return SPECIAUX[c];
    var d = c.normalize("NFD").replace(DIACR, "").toLowerCase();
    if (d.length === 1) return d;
    d = c.toLowerCase();
    return d.length === 1 ? d : c;
  }
  function plierPareil(s) {
    s = String(s || "");
    var o = "";
    for (var i = 0; i < s.length; i++) o += plierCar(s.charAt(i));
    return o;
  }

  /* La clé de comparaison : sans accent, sans casse, sans ponctuation.
     « R-290 », « r 290 » et « R290 » donnent tous « r290 » ; « CO₂ »
     donne « co2 » ; « R-449A » donne « r449a ». */
  function cle(s) {
    return plierPareil(String(s || "").replace(/œ|Œ/g, "oe").replace(/æ|Æ/g, "ae"))
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/(^| )([a-z]) (?=\d)/g, "$1$2")
      .replace(/(\d) ([a-z])(?= |$)/g, "$1$2")
      .replace(/^ +| +$/g, "");
  }

  /* Les petits mots qu'on tape sans y penser : « comment marche une clim
     inverter » doit chercher « marche clim inverter ». On les garde si la
     question n'est faite que d'eux. */
  var VIDES = {};
  ("le la les l un une des de du d et a au aux en pour sur dans par avec qu que quoi " +
   "comment c est ce cette mon ma mes ou y il elle on se s sa son ses")
    .split(" ").forEach(function (m) { VIDES[m] = 1; });

  /* ---------- 2. À l'oreille et à une lettre près -------------------- */

  /* Une simplification « à l'oreille » du français. Elle n'a pas besoin
     d'être juste : elle est appliquée des DEUX côtés (le mot tapé et les
     mots du site), il suffit qu'elle soit la même. */
  function phon(w) {
    return w
      .replace(/ph/g, "f").replace(/qu/g, "k").replace(/ck/g, "k")
      .replace(/c(?=[eiy])/g, "s").replace(/c/g, "k").replace(/y/g, "i")
      .replace(/([^cs])h/g, "$1").replace(/^h/, "")
      .replace(/eau|au/g, "o").replace(/ai|ei/g, "e")
      .replace(/en/g, "an")
      .replace(/(.)\1+/g, "$1")
      .replace(/(aire|ere|eure|eur)$/, "er")
      .replace(/[estx]+$/, "");
  }

  /* Distance d'édition (insertion, suppression, remplacement, et deux
     lettres inversées comptent pour une faute). S'arrête dès qu'on
     dépasse `max` : inutile de finir un calcul perdu d'avance. */
  function distance(a, b, max) {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var avant2 = null, avant = [], i, j;
    for (j = 0; j <= b.length; j++) avant.push(j);
    for (i = 1; i <= a.length; i++) {
      var cour = [i], minLigne = i;
      for (j = 1; j <= b.length; j++) {
        var cout = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        var v = Math.min(avant[j] + 1, cour[j - 1] + 1, avant[j - 1] + cout);
        if (avant2 && i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1))
          v = Math.min(v, avant2[j - 2] + 1);
        cour.push(v);
        if (v < minLigne) minLigne = v;
      }
      if (minLigne > max) return max + 1;
      avant2 = avant; avant = cour;
    }
    return avant[b.length];
  }

  /* ---------- 3. Le lexique ------------------------------------------ */

  function compilerLexique(lex) {
    var L = { groupes: [], forme: {}, phrases: [] };
    (lex || []).forEach(function (g, gi) {
      var formes = [];
      (g || []).forEach(function (m) {
        var k = cle(m);
        if (k && formes.indexOf(k) === -1) formes.push(k);
      });
      L.groupes.push(formes);
      formes.forEach(function (f) {
        if (f.indexOf(" ") !== -1) L.phrases.push({ f: f, g: gi });
        else if (L.forme[f] === undefined) L.forme[f] = gi;
      });
    });
    /* La plus longue d'abord : « diagramme de mollier » avant « mollier ». */
    L.phrases.sort(function (a, b) { return b.f.length - a.f.length; });
    return L;
  }

  /* ---------- 4. Le moteur -------------------------------------------- */

  /* entrees : [{ nom, sous, ligne, href, cible, desc }]
     lexique : window.LEXIQUE_RECHERCHE (facultatif) */
  function creer(entrees, lexique) {
    var L = compilerLexique(lexique);
    var E = (entrees || []).map(function (e, i) {
      var principal = cle([e.nom, e.sous, e.ligne].join(" "));
      return {
        e: e, rang: i,
        k: " " + principal + " ",
        kl: " " + principal + " " + cle(e.desc) + " ",
        kn: " " + cle(e.nom) + " "
      };
    });

    /* Une forme de 4 lettres ou moins venue du lexique (pac, ev, sr) ne
       vaut que comme mot entier ; un mot TAPÉ se cherche n'importe où
       dans le texte, comme avant (« évapo » trouve « évaporateur »),
       sauf s'il est lui-même un sigle court du lexique. */
    function variante(f, direct, canon) {
      return { f: f, direct: direct, canon: !!canon,
               entier: f.length <= 4 && (!direct || L.forme[f] !== undefined) };
    }
    /* Le premier mot du groupe est celui du site : « invertère » doit
       ramener d'abord la station Inverter, puis le variateur. */
    function jeton(tape, g) {
      var alts = [variante(tape, true)];
      if (g !== undefined) L.groupes[g].forEach(function (f, i) {
        if (f !== tape) alts.push(variante(f, false, i === 0));
      });
      return { tape: tape, alts: alts };
    }
    function analyser(q) {
      var t = " " + cle(q) + " ", jetons = [];
      L.phrases.forEach(function (p) {
        var motif = " " + p.f + " ";
        if (t.indexOf(motif) !== -1) {
          t = t.split(motif).join(" ");
          jetons.push(jeton(p.f, p.g));
        }
      });
      var mots = t.split(" ").filter(Boolean);
      var utiles = mots.filter(function (m) { return !VIDES[m] && (m.length > 1 || /\d/.test(m)); });
      if (!utiles.length && !jetons.length) utiles = mots;
      utiles.forEach(function (m) { jetons.push(jeton(m, groupeDe(m))); });
      return jetons;
    }

    /* Le groupe d'un mot du lexique, au singulier comme au pluriel. */
    function groupeDe(m) {
      if (L.forme[m] !== undefined) return L.forme[m];
      var sing = m.replace(/[sx]$/, "");
      return sing !== m && L.forme[sing] !== undefined ? L.forme[sing] : undefined;
    }

    function contient(k, alt) {
      return alt.entier ? k.indexOf(" " + alt.f + " ") !== -1 : k.indexOf(alt.f) !== -1;
    }

    /* Pour une entrée : chaque mot cherché est-il là, et à quel niveau ?
       3 = le mot tapé dans le titre ou la ligne · 2 = une variante du
       lexique · 1 = seulement dans la description. */
    function evaluer(x, jetons) {
      var r = { x: x, principal: true, nom: true, score: 0, n: 0, alts: [] };
      jetons.forEach(function (j) {
        var meilleur = 0, auNom = false;
        j.alts.forEach(function (a) {
          if (contient(x.k, a)) {
            meilleur = Math.max(meilleur, a.direct ? 3 : a.canon ? 2.5 : 2);
            r.alts.push(a);
            if (contient(x.kn, a)) auNom = true;
          } else if (contient(x.kl, a)) {
            meilleur = Math.max(meilleur, 1);
          }
        });
        if (meilleur) r.n++;
        if (meilleur < 2) r.principal = false;
        if (!auNom) r.nom = false;
        r.score += meilleur;
      });
      return r;
    }
    function trier(a, b) {
      return (b.principal - a.principal) || (b.nom - a.nom) ||
             (b.score - a.score) || (a.x.rang - b.x.rang);
    }

    function passe(jetons) {
      var tous = [], principaux = [];
      E.forEach(function (x) {
        var r = evaluer(x, jetons);
        if (r.n === jetons.length) { tous.push(r); if (r.principal) principaux.push(r); }
      });
      /* La description ne sert qu'en second recours (règle du 17/09) :
         les treize escales du CO₂ partagent la même description, chercher
         « éjecteur » ne doit pas les ramener toutes quand un titre répond. */
      if (principaux.length) return { liste: principaux.sort(trier), elargi: false };
      return { liste: tous.sort(trier), elargi: tous.length > 0 };
    }

    /* Le vocabulaire du site, construit à la première faute seulement. */
    var VOC = null;
    function vocabulaire() {
      if (VOC) return VOC;
      VOC = { mots: [], freq: {}, phon: {} };
      function ajouter(m) {
        if (m.length < 4 || !/[a-z]/.test(m) || /^\d/.test(m)) return;
        if (!VOC.freq[m]) { VOC.freq[m] = 0; VOC.mots.push(m); VOC.phon[m] = phon(m); }
        VOC.freq[m]++;
      }
      E.forEach(function (x) { x.kl.split(" ").forEach(ajouter); });
      Object.keys(L.forme).forEach(ajouter);
      return VOC;
    }
    /* Un mot du lexique est un VRAI mot du métier : on ne le « corrige »
       jamais. Sans cette règle, « condensateur », absent des titres, était
       remplacé par « condenseur » — le piège même que le lexique signale. */
    function corriger(mot) {
      var n = mot.length;
      if (n < 4 || /\d/.test(mot) || groupeDe(mot) !== undefined) return null;
      var V = vocabulaire(), seuil = n <= 5 ? 1 : 2, pm = phon(mot), choix = null;
      /* À l'oreille, on ne tolère qu'une différence, et aucune quand le
         mot simplifié est trop court pour qu'elle veuille dire quelque
         chose (« zzzzqq » ne doit pas devenir « zones »). */
      var seuilOreille = pm.length >= 4 ? 1 : 0;
      V.mots.forEach(function (w) {
        if (w === mot || Math.abs(w.length - n) > seuil + 3) return;
        var dr = distance(mot, w, Math.ceil(n * 0.4));
        var dp = distance(pm, V.phon[w], seuilOreille);
        if (dr > seuil && (dp > seuilOreille || dr > Math.ceil(n * 0.4))) return;
        var d = Math.min(dr, dp);
        /* On se trompe rarement de première lettre : si elle diffère
           (à l'oreille aussi), la proposition est moins crédible. */
        if (w.charAt(0) !== mot.charAt(0) && V.phon[w].charAt(0) !== pm.charAt(0)) d++;
        if (d > seuil) return;
        var c = { w: w, d: d, dr: dr, f: V.freq[w] };
        if (!choix || c.d < choix.d || (c.d === choix.d && (c.dr < choix.dr ||
            (c.dr === choix.dr && c.f > choix.f)))) choix = c;
      });
      return choix ? choix.w : null;
    }

    function chercher(q) {
      var jetons = analyser(q);
      var sortie = { resultats: [], corrections: [], elargi: false, partiel: false, jetons: jetons };
      if (!jetons.length) return sortie;

      var p = passe(jetons);
      if (!p.liste.length) {
        /* Ne corriger QUE les mots que rien ne contient : un mot juste qui
           ne trouve rien en compagnie des autres n'est pas une faute. */
        var corriges = jetons.map(function (j) {
          var seul = E.some(function (x) {
            return j.alts.some(function (a) { return contient(x.kl, a); });
          });
          if (seul) return j;
          var w = corriger(j.tape);
          if (!w) return j;
          sortie.corrections.push({ tape: j.tape, propose: w });
          return jeton(w, L.forme[w]);
        });
        if (sortie.corrections.length) { jetons = corriges; p = passe(jetons); }
      }
      if (!p.liste.length && jetons.length > 1) {
        /* Aucun cours n'a tous les mots : ceux qui en ont le plus. */
        var partiels = [];
        E.forEach(function (x) {
          var r = evaluer(x, jetons);
          if (r.n) partiels.push(r);
        });
        partiels.sort(function (a, b) { return (b.n - a.n) || trier(a, b); });
        if (partiels.length) { p = { liste: partiels, elargi: false }; sortie.partiel = true; }
      }
      sortie.jetons = jetons;
      sortie.elargi = p.elargi;
      sortie.resultats = p.liste.map(function (r) { return { entree: r.x.e, alts: r.alts }; });
      /* Ce qu'il faut surligner : tout ce qui a été cherché, au cas où. */
      sortie.toutesAlts = [];
      jetons.forEach(function (j) { sortie.toutesAlts = sortie.toutesAlts.concat(j.alts); });
      return sortie;
    }

    return { chercher: chercher, taille: E.length };
  }

  /* ---------- 5. Surligner ------------------------------------------- */

  function echHtml(v) {
    return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function echRe(c) { return c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  /* Une variante devient un motif qui tolère la ponctuation du titre :
     « r290 » doit surligner « R-290 », « multisplit » « multi-split ». */
  function motif(a) {
    var src = a.f.split(" ").map(function (mot) {
      return mot.split("").map(echRe).join("[^a-z0-9]?");
    }).join("[^a-z0-9]+");
    if (a.entier) src = "\\b" + src + "\\b";
    return new RegExp(src, "g");
  }

  function surligner(texte, alts) {
    texte = String(texte || "");
    var plie = plierPareil(texte), marques = [];
    (alts || []).forEach(function (a) {
      var re = motif(a), m;
      while ((m = re.exec(plie))) {
        if (!m[0].length) { re.lastIndex++; continue; }
        marques.push([m.index, m.index + m[0].length]);
      }
    });
    if (!marques.length) return echHtml(texte);
    marques.sort(function (a, b) { return a[0] - b[0] || b[1] - a[1]; });
    var out = "", pos = 0;
    marques.forEach(function (mk) {
      if (mk[0] < pos) return;
      out += echHtml(texte.slice(pos, mk[0])) + "<mark>" + echHtml(texte.slice(mk[0], mk[1])) + "</mark>";
      pos = mk[1];
    });
    return out + echHtml(texte.slice(pos));
  }

  window.InerRecherche = {
    creer: creer, surligner: surligner, cle: cle,
    /* exposés pour les tests seulement */
    _phon: phon, _distance: distance
  };
})();

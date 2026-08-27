/* =====================================================================
   qr.js — un encodeur QR autonome, pour projeter une séance en classe
   ---------------------------------------------------------------------
   CONTRAT : aucune dépendance, aucun appel réseau, aucune image bitmap.
   La sortie est un SVG : il se projette, il s'imprime, il se colle dans
   une page, et il reste net à toutes les tailles.

     inerwebQR.svg("https://…", { taille: 320, marge: 4 })  → chaîne SVG

   POURQUOI L'ÉCRIRE PLUTÔT QUE PRENDRE UNE BIBLIOTHÈQUE
   Le dépôt n'a pas de `package.json` et le site est statique : charger un
   script depuis un CDN romprait la promesse « rien ne part sur internet »
   qui tient tout le système d'accès. Un encodeur QR est du code fini et
   déterministe — on l'écrit une fois.

   CE QU'IL COUVRE, ET RIEN DE PLUS
   · mode OCTET seulement — c'est ce que sont nos codes (base64url) et nos
     adresses ; les modes numérique et alphanumérique ne serviraient pas ;
   · niveaux de correction L et M, versions 1 à 20 (jusqu'à 858 octets en
     L) — un code de séance en fait 376, une adresse complète environ 410 ;
   · M par défaut : c'est le niveau qui supporte l'impression et le
     vidéoprojecteur. On retombe sur L si la donnée ne tient pas en M.

   Référence : ISO/IEC 18004. Les tables ci-dessous en sont extraites ;
   les mots de contrôle de format et de version sont CALCULÉS (BCH) plutôt
   que recopiés — moins de chiffres à se tromper en les tapant.
   ===================================================================== */
(function () {
  "use strict";

  /* ================================================================
     Tables ISO/IEC 18004 — L et M, versions 1 à 20
     [ correction par bloc, blocs G1, données G1, blocs G2, données G2 ]
     ================================================================ */
  var BLOCS = {
    L: [
      [7,1,19,0,0],   [10,1,34,0,0],  [15,1,55,0,0],  [20,1,80,0,0],   [26,1,108,0,0],
      [18,2,68,0,0],  [20,2,78,0,0],  [24,2,97,0,0],  [30,2,116,0,0],  [18,2,68,2,69],
      [20,4,81,0,0],  [24,2,92,2,93], [26,4,107,0,0], [30,3,115,1,116],[22,5,87,1,88],
      [24,5,98,1,99], [28,1,107,5,108],[30,5,120,1,121],[28,3,113,4,114],[28,3,107,5,108]
    ],
    M: [
      [10,1,16,0,0],  [16,1,28,0,0],  [26,1,44,0,0],  [18,2,32,0,0],   [24,2,43,0,0],
      [16,4,27,0,0],  [18,4,31,0,0],  [22,2,38,2,39], [22,3,36,2,37],  [26,4,43,1,44],
      [30,1,50,4,51], [22,6,36,2,37], [22,8,37,1,38], [24,4,40,5,41],  [24,5,41,5,42],
      [28,7,45,3,46], [28,10,46,1,47],[26,9,43,4,44], [26,3,44,11,45], [26,3,41,13,42]
    ]
  };

  /* Centres des motifs d'alignement, par version (1 = aucun). */
  var ALIGNEMENT = [
    [], [6,18], [6,22], [6,26], [6,30], [6,34], [6,22,38], [6,24,42], [6,26,46], [6,28,50],
    [6,30,54], [6,32,58], [6,34,62], [6,26,46,66], [6,26,48,70], [6,26,50,74], [6,30,54,78],
    [6,30,56,82], [6,30,58,86], [6,34,62,90]
  ];

  var INDICATEUR_NIVEAU = { L: 1, M: 0 }; // 2 bits, tels qu'écrits dans le format

  /* ================================================================
     Corps de Galois GF(256) — l'arithmétique de Reed-Solomon
     ================================================================ */
  var EXP = new Uint8Array(512), LOG = new Uint8Array(256);
  (function () {
    var x = 1;
    for (var i = 0; i < 255; i++) {
      EXP[i] = x; LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d; // polynôme primitif du QR
    }
    for (var j = 255; j < 512; j++) EXP[j] = EXP[j - 255];
  })();

  function mul(a, b) { return (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]]; }

  /** Le polynôme générateur de degré `n`. */
  function generateur(n) {
    var g = [1];
    for (var i = 0; i < n; i++) {
      var suivant = new Array(g.length + 1).fill(0);
      for (var j = 0; j < g.length; j++) {
        suivant[j] ^= mul(g[j], EXP[i]);
        suivant[j + 1] ^= g[j];
      }
      g = suivant;
    }
    return g;
  }

  /** Les `n` mots de correction d'un bloc de données. */
  function correction(donnees, n) {
    var g = generateur(n), reste = new Array(donnees.length + n).fill(0);
    for (var i = 0; i < donnees.length; i++) reste[i] = donnees[i];
    for (var k = 0; k < donnees.length; k++) {
      var facteur = reste[k];
      if (facteur === 0) continue;
      for (var j = 0; j < g.length; j++) reste[k + j] ^= mul(g[j], facteur);
    }
    return reste.slice(donnees.length);
  }

  /* ================================================================
     BCH — les mots de contrôle, calculés plutôt que recopiés
     ================================================================ */
  /** Division polynomiale : on annule les bits de poids fort, le reste
      devient le mot de contrôle accolé à la valeur. */
  function bch(valeur, generateur, bits) {
    var v = valeur << bits;
    var degG = generateur.toString(2).length - 1;
    var t = v;
    for (var d = 31; d >= degG; d--) {
      if (t & (1 << d)) t ^= generateur << (d - degG);
    }
    return v | t;
  }

  /** 15 bits : niveau de correction + masque, protégés puis brouillés. */
  function motFormat(niveau, masque) {
    var brut = (INDICATEUR_NIVEAU[niveau] << 3) | masque;
    return (bch(brut, 0x537, 10) ^ 0x5412) & 0x7fff;
  }

  /** 18 bits, seulement à partir de la version 7. */
  function motVersion(version) {
    return bch(version, 0x1f25, 12) & 0x3ffff;
  }

  /* ================================================================
     Capacité — combien d'octets tiennent, et dans quelle version
     ================================================================ */
  function donneesTotales(version, niveau) {
    var b = BLOCS[niveau][version - 1];
    return b[1] * b[2] + b[3] * b[4];
  }

  function capaciteOctets(version, niveau) {
    /* 4 bits de mode + l'indicateur de longueur (8 bits jusqu'à V9, 16 après) */
    var entete = 4 + (version < 10 ? 8 : 16);
    return Math.floor((donneesTotales(version, niveau) * 8 - entete) / 8);
  }

  /** La plus petite version qui contient `n` octets — null si aucune. */
  function versionPour(n, niveau) {
    for (var v = 1; v <= 20; v++) if (capaciteOctets(v, niveau) >= n) return v;
    return null;
  }

  /* ================================================================
     Encodage des données
     ================================================================ */
  function enOctets(texte) {
    /* TextEncoder donne l'UTF-8 ; nos codes sont en ASCII, mais un libellé
       accentué peut se retrouver dans une adresse. */
    return new TextEncoder().encode(texte);
  }

  function flux(octets, version, niveau) {
    var bits = [];
    function pousser(valeur, n) {
      for (var i = n - 1; i >= 0; i--) bits.push((valeur >> i) & 1);
    }

    pousser(0b0100, 4);                                  // mode octet
    pousser(octets.length, version < 10 ? 8 : 16);       // longueur
    for (var i = 0; i < octets.length; i++) pousser(octets[i], 8);

    var capacite = donneesTotales(version, niveau) * 8;
    pousser(0, Math.min(4, capacite - bits.length));     // terminateur
    while (bits.length % 8) bits.push(0);                // au mot entier

    /* Remplissage réglementaire, en alternance, jusqu'à saturation. */
    var bourrage = [0xec, 0x11], k = 0;
    while (bits.length < capacite) { pousser(bourrage[k++ % 2], 8); }

    var mots = [];
    for (var j = 0; j < bits.length; j += 8) {
      var m = 0;
      for (var b = 0; b < 8; b++) m = (m << 1) | bits[j + b];
      mots.push(m);
    }
    return mots;
  }

  /** Découpe en blocs, calcule la correction, puis entrelace. */
  function entrelacer(mots, version, niveau) {
    var t = BLOCS[niveau][version - 1];
    var ecParBloc = t[0];
    var blocs = [], ecs = [], pos = 0;

    for (var g = 0; g < 2; g++) {
      var nb = g === 0 ? t[1] : t[3], taille = g === 0 ? t[2] : t[4];
      for (var i = 0; i < nb; i++) {
        var bloc = mots.slice(pos, pos + taille); pos += taille;
        blocs.push(bloc);
        ecs.push(correction(bloc, ecParBloc));
      }
    }

    var sortie = [], maxD = Math.max(t[2], t[4]);
    for (var c = 0; c < maxD; c++) {
      for (var b = 0; b < blocs.length; b++) if (c < blocs[b].length) sortie.push(blocs[b][c]);
    }
    for (var e = 0; e < ecParBloc; e++) {
      for (var b2 = 0; b2 < ecs.length; b2++) sortie.push(ecs[b2][e]);
    }
    return sortie;
  }

  /* ================================================================
     La trame — motifs fixes, données en zigzag, masques
     ================================================================ */
  function trameVide(taille) {
    var m = [], reserve = [];
    for (var i = 0; i < taille; i++) {
      m.push(new Uint8Array(taille));
      reserve.push(new Uint8Array(taille));
    }
    return { m: m, reserve: reserve, taille: taille };
  }

  function poserCarre(t, ligne, colonne) {
    for (var i = -1; i <= 7; i++) {
      for (var j = -1; j <= 7; j++) {
        var y = ligne + i, x = colonne + j;
        if (y < 0 || y >= t.taille || x < 0 || x >= t.taille) continue;
        var bord = (i >= 0 && i <= 6 && (j === 0 || j === 6)) || (j >= 0 && j <= 6 && (i === 0 || i === 6));
        var coeur = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        t.m[y][x] = (bord || coeur) ? 1 : 0;
        t.reserve[y][x] = 1;
      }
    }
  }

  function poserMotifs(t, version) {
    poserCarre(t, 0, 0);
    poserCarre(t, 0, t.taille - 7);
    poserCarre(t, t.taille - 7, 0);

    /* Lignes de cadence */
    for (var i = 8; i < t.taille - 8; i++) {
      var v = i % 2 === 0 ? 1 : 0;
      t.m[6][i] = v; t.reserve[6][i] = 1;
      t.m[i][6] = v; t.reserve[i][6] = 1;
    }

    /* Motifs d'alignement — jamais par-dessus les grands carrés */
    var centres = ALIGNEMENT[version - 1];
    for (var a = 0; a < centres.length; a++) {
      for (var b = 0; b < centres.length; b++) {
        var cy = centres[a], cx = centres[b];
        if (t.reserve[cy][cx]) continue;
        for (var dy = -2; dy <= 2; dy++) {
          for (var dx = -2; dx <= 2; dx++) {
            var bord2 = Math.max(Math.abs(dy), Math.abs(dx));
            t.m[cy + dy][cx + dx] = (bord2 === 1) ? 0 : 1;
            t.reserve[cy + dy][cx + dx] = 1;
          }
        }
      }
    }

    /* Le module toujours noir, et les cases réservées au format */
    t.m[t.taille - 8][8] = 1; t.reserve[t.taille - 8][8] = 1;
    for (var k = 0; k <= 8; k++) {
      if (!t.reserve[8][k]) { t.reserve[8][k] = 1; t.m[8][k] = 0; }
      if (!t.reserve[k][8]) { t.reserve[k][8] = 1; t.m[k][8] = 0; }
    }
    for (var k2 = 0; k2 < 8; k2++) {
      t.reserve[8][t.taille - 1 - k2] = 1;
      t.reserve[t.taille - 1 - k2][8] = 1;
    }

    /* Bloc de version, à partir de la 7 */
    if (version >= 7) {
      for (var p = 0; p < 18; p++) {
        var y2 = Math.floor(p / 3), x2 = t.taille - 11 + (p % 3);
        t.reserve[y2][x2] = 1; t.reserve[x2][y2] = 1;
      }
    }
  }

  function ecrireVersion(t, version) {
    if (version < 7) return;
    var mot = motVersion(version);
    for (var p = 0; p < 18; p++) {
      var bit = (mot >> p) & 1;
      var y = Math.floor(p / 3), x = t.taille - 11 + (p % 3);
      t.m[y][x] = bit; t.m[x][y] = bit;
    }
  }

  function ecrireFormat(t, niveau, masque) {
    var mot = motFormat(niveau, masque);
    for (var p = 0; p < 15; p++) {
      var bit = (mot >> p) & 1;
      /* Copie 1 — autour du carré haut-gauche */
      if (p < 6) t.m[8][p] = bit;
      else if (p === 6) t.m[8][7] = bit;
      else if (p === 7) t.m[8][8] = bit;
      else if (p === 8) t.m[7][8] = bit;
      else t.m[14 - p][8] = bit;
      /* Copie 2 — répartie sur les deux autres coins */
      if (p < 8) t.m[t.taille - 1 - p][8] = bit;
      else t.m[8][t.taille - 15 + p] = bit;
    }
  }

  function masquer(masque, y, x) {
    switch (masque) {
      case 0: return (y + x) % 2 === 0;
      case 1: return y % 2 === 0;
      case 2: return x % 3 === 0;
      case 3: return (y + x) % 3 === 0;
      case 4: return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
      case 5: return ((y * x) % 2) + ((y * x) % 3) === 0;
      case 6: return (((y * x) % 2) + ((y * x) % 3)) % 2 === 0;
      default: return (((y + x) % 2) + ((y * x) % 3)) % 2 === 0;
    }
  }

  function ecrireDonnees(t, mots, masque) {
    var bit = 0, total = mots.length * 8, montant = true;
    for (var colonne = t.taille - 1; colonne > 0; colonne -= 2) {
      if (colonne === 6) colonne--;                 // la ligne de cadence ne compte pas
      for (var pas = 0; pas < t.taille; pas++) {
        var y = montant ? t.taille - 1 - pas : pas;
        for (var d = 0; d < 2; d++) {
          var x = colonne - d;
          if (t.reserve[y][x]) continue;
          var v = 0;
          if (bit < total) v = (mots[bit >> 3] >> (7 - (bit & 7))) & 1;
          bit++;
          t.m[y][x] = masquer(masque, y, x) ? v ^ 1 : v;
        }
      }
      montant = !montant;
    }
  }

  /* Les quatre pénalités de la norme — on garde le masque le moins pénalisé. */
  function penalite(t) {
    var n = t.taille, score = 0, i, j, k;

    for (i = 0; i < n; i++) {
      for (var sens = 0; sens < 2; sens++) {
        var compte = 1, precedent = -1;
        for (j = 0; j < n; j++) {
          var v = sens === 0 ? t.m[i][j] : t.m[j][i];
          if (v === precedent) { compte++; if (compte === 5) score += 3; else if (compte > 5) score++; }
          else { compte = 1; precedent = v; }
        }
      }
    }

    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - 1; j++) {
        var s = t.m[i][j] + t.m[i][j + 1] + t.m[i + 1][j] + t.m[i + 1][j + 1];
        if (s === 0 || s === 4) score += 3;
      }
    }

    var motif = [1, 0, 1, 1, 1, 0, 1];
    for (i = 0; i < n; i++) {
      for (j = 0; j <= n - 7; j++) {
        for (var sens2 = 0; sens2 < 2; sens2++) {
          var bon = true;
          for (k = 0; k < 7; k++) {
            var vv = sens2 === 0 ? t.m[i][j + k] : t.m[j + k][i];
            if (vv !== motif[k]) { bon = false; break; }
          }
          if (!bon) continue;
          var avant = true, apres = true;
          for (k = 1; k <= 4; k++) {
            var a = sens2 === 0 ? (j - k >= 0 ? t.m[i][j - k] : 0) : (j - k >= 0 ? t.m[j - k][i] : 0);
            var b = sens2 === 0 ? (j + 6 + k < n ? t.m[i][j + 6 + k] : 0) : (j + 6 + k < n ? t.m[j + 6 + k][i] : 0);
            if (a !== 0) avant = false;
            if (b !== 0) apres = false;
          }
          if (avant || apres) score += 40;
        }
      }
    }

    var noirs = 0;
    for (i = 0; i < n; i++) for (j = 0; j < n; j++) noirs += t.m[i][j];
    var pourcent = (noirs * 100) / (n * n);
    score += Math.floor(Math.abs(pourcent - 50) / 5) * 10;

    return score;
  }

  /* ================================================================
     L'assemblage
     ================================================================ */
  function construire(texte, niveauDemande) {
    var octets = enOctets(String(texte));
    var niveau = niveauDemande || "M";
    var version = versionPour(octets.length, niveau);

    /* La correction M est plus robuste, mais si la donnée déborde on
       préfère un code lisible en L à pas de code du tout. */
    if (!version && niveau === "M") { niveau = "L"; version = versionPour(octets.length, "L"); }
    if (!version) {
      throw new Error("Ce contenu est trop long pour un QR code (" + octets.length
        + " octets, maximum " + capaciteOctets(20, "L") + ").");
    }

    var mots = entrelacer(flux(octets, version, niveau), version, niveau);
    var meilleur = null;

    for (var masque = 0; masque < 8; masque++) {
      var t = trameVide(version * 4 + 17);
      poserMotifs(t, version);
      ecrireVersion(t, version);
      ecrireDonnees(t, mots, masque);
      ecrireFormat(t, niveau, masque);
      var p = penalite(t);
      if (!meilleur || p < meilleur.penalite) meilleur = { trame: t, penalite: p };
    }

    return { trame: meilleur.trame, version: version, niveau: niveau };
  }

  /* ================================================================
     Sortie SVG — un seul tracé, pour un fichier léger
     ================================================================ */
  function svg(texte, options) {
    var o = options || {};
    var resultat = construire(texte, o.niveau);
    var t = resultat.trame, marge = o.marge == null ? 4 : o.marge;
    var cote = t.taille + marge * 2;
    var taille = o.taille || 320;

    var d = "";
    for (var y = 0; y < t.taille; y++) {
      for (var x = 0; x < t.taille; x++) {
        if (t.m[y][x]) d += "M" + (x + marge) + " " + (y + marge) + "h1v1h-1z";
      }
    }

    var titre = o.titre || "QR code";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + cote + " " + cote + '"'
      + ' width="' + taille + '" height="' + taille + '" role="img"'
      + ' aria-label="' + String(titre).replace(/[<>&"]/g, "") + '">'
      + '<rect width="' + cote + '" height="' + cote + '" fill="#fff"/>'
      + '<path d="' + d + '" fill="#000"/>'
      + "</svg>";
  }

  var api = {
    svg: svg,
    /** Pour les bancs d'essai : la trame brute, sans habillage. */
    trame: function (texte, options) { return construire(texte, (options || {}).niveau); },
    capaciteOctets: capaciteOctets
  };

  if (typeof window !== "undefined") window.inerwebQR = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();

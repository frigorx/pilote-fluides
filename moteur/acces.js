/* =====================================================================
   ACCÈS — les codes enseignant d'inerWeb, côté navigateur (AE-4)
   ---------------------------------------------------------------------
   CONTRAT : script autonome, aucune dépendance au moteur, comme
   `marque.js`. Il se charge en absolu depuis inerweb.fr pour qu'il n'y
   ait qu'UNE source, sur tous les produits et tous les satellites :
     <script src="https://inerweb.fr/moteur/acces.js"></script>

   Il expose `window.inerwebAcces`. Rien ne s'exécute tout seul, sauf la
   pose du filigrane quand la page le demande.

   CE QU'IL FAIT
   · lit un CODE MAÎTRE, vérifie sa signature, le range pour ce produit ;
   · lit un CODE DE SÉANCE (étage 2) posé dans le fragment de l'adresse ;
   · déchiffre les documents d'un coffre `docs/coffre-<année>/` ;
   · pose le filigrane au nom du porteur.

   AUCUN APPEL RÉSEAU pour vérifier : la clé publique de la racine est
   embarquée ci-dessous, tout se juge dans le navigateur. Le site reste
   un site statique. La promesse « rien ne part sur internet » tient.

   ⚠️ CE QUE LE RANGEMENT VAUT. Les clés sont gardées en clair dans le
   `localStorage` du navigateur : c'est ce qui évite de recoller le code
   à chaque visite. Quiconque a la main sur la session du navigateur les
   lit. C'est assumé — la protection porte sur le contenu PUBLIÉ, pas sur
   le poste du titulaire, qui a de toute façon le droit de tout voir.

   Miroir exact de `build/lib-acces.mjs`. Le format binaire est décrit
   là-bas ; `build/test-acces.mjs` vérifie que la table des produits et la
   clé racine d'ici ne divergent pas de celles du build.
   ===================================================================== */
(function () {
  "use strict";

  /* La clé PUBLIQUE de la racine — 65 octets, base64url. Elle sert à
     VÉRIFIER, jamais à signer : elle a vocation à être publiée. */
  var CLE_RACINE = "BEjrdyQHfz8HOex0AjdwzctiNVxLipOl0Kht4AdiuakPYvVr0P5OUOo8RY5tyZJYs6wgC6g8V1v4WV9Y0Hxfg5M";

  /* Table des produits — miroir de build/produits.mjs. L'indice est gravé
     dans les codes émis : ne jamais réordonner. */
  var PRODUITS = [
    { indice: 0, id: "habilitation", nom: "Habilitation fluides frigorigènes" },
    { indice: 1, id: "aquiblue", nom: "inerWeb AquiBlue" },
    { indice: 2, id: "legislation", nom: "Réseau Législation" },
    { indice: 3, id: "hydrometro", nom: "HydroMétro" },
    { indice: 4, id: "hocourant", nom: "inerWeb HoCourant" }
  ];

  var VERSION = 1, TYPE_MAITRE = 0x11, TYPE_SEANCE = 0x21;
  var TAILLE_PUBLIQUE = 65, TAILLE_SECRET = 32, TAILLE_SIGNATURE = 64, ENTETE_CERT = 74;
  var EPOQUE = Date.UTC(2026, 0, 1), JOUR = 86400000;
  var PREFIXE = "inerweb.acces.";

  var MOTIFS = {
    ABSENT: "ABSENT", ILLISIBLE: "ILLISIBLE", VERSION_INCONNUE: "VERSION_INCONNUE",
    SIGNATURE_INVALIDE: "SIGNATURE_INVALIDE", EXPIRE: "EXPIRE",
    MAUVAIS_PRODUIT: "MAUVAIS_PRODUIT", PRODUIT_INCONNU: "PRODUIT_INCONNU"
  };

  /* Ce que l'utilisateur lit — jamais les motifs bruts. */
  var LIBELLES = {
    ABSENT: "Aucun code n'a été saisi.",
    ILLISIBLE: "Ce code est incomplet ou abîmé. Recopiez-le en entier, d'un bloc.",
    VERSION_INCONNUE: "Ce code n'est pas un code d'accès inerWeb.",
    SIGNATURE_INVALIDE: "Ce code n'est pas authentique, ou il a été modifié.",
    EXPIRE: "Ce code a expiré. Demandez-en un nouveau.",
    MAUVAIS_PRODUIT: "Ce code ouvre un autre produit inerWeb, pas celui-ci.",
    PRODUIT_INCONNU: "Ce code désigne un produit que ce site ne connaît pas."
  };

  /* ================================================================
     Outils
     ================================================================ */

  function versOctets(b64url) {
    var b64 = String(b64url).replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    var brut = atob(b64), t = new Uint8Array(brut.length);
    for (var i = 0; i < brut.length; i++) t[i] = brut.charCodeAt(i);
    return t;
  }

  function versB64url(octets) {
    var s = "";
    for (var i = 0; i < octets.length; i++) s += String.fromCharCode(octets[i]);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function lireUint16(t, i) { return (t[i] << 8) | t[i + 1]; }

  function versISO(jours) {
    return new Date(EPOQUE + jours * JOUR).toISOString().slice(0, 10);
  }

  function aujourdHui() { return new Date().toISOString().slice(0, 10); }

  function produitParIndice(indice) {
    for (var i = 0; i < PRODUITS.length; i++) if (PRODUITS[i].indice === indice) return PRODUITS[i];
    return null;
  }

  function refus(motif) { return { ok: false, motif: motif, message: LIBELLES[motif] || motif }; }

  /* ================================================================
     Vérification — ECDSA P-256, signatures brutes (IEEE P1363)
     ================================================================ */

  function importerPublique(brute) {
    return crypto.subtle.importKey("raw", brute, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
  }

  function verifier(donnees, signature, publiqueBrute) {
    return importerPublique(publiqueBrute)
      .then(function (cle) {
        return crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, cle, signature, donnees);
      })
      .catch(function () { return false; }); // clé ou signature malformée = refus, pas d'exception
  }

  /* Le certificat : voir build/lib-acces.mjs pour la carte des octets. */
  function lireCertificat(cert, jugerLaDate) {
    if (cert.length < ENTETE_CERT + 1 + TAILLE_SIGNATURE) return Promise.resolve(refus(MOTIFS.ILLISIBLE));
    if (cert[0] !== VERSION) return Promise.resolve(refus(MOTIFS.VERSION_INCONNUE));

    var tailleNom = cert[73], finCorps = ENTETE_CERT + tailleNom;
    if (cert.length !== finCorps + TAILLE_SIGNATURE) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    return verifier(cert.subarray(0, finCorps), cert.subarray(finCorps), versOctets(CLE_RACINE))
      .then(function (bon) {
        if (!bon) return refus(MOTIFS.SIGNATURE_INVALIDE);

        var expireLe = versISO(lireUint16(cert, 6));
        if (jugerLaDate && aujourdHui() > expireLe) {
          var r = refus(MOTIFS.EXPIRE); r.expireLe = expireLe; return r;
        }
        var produit = produitParIndice(cert[1]);
        if (!produit) return refus(MOTIFS.PRODUIT_INCONNU);

        return {
          ok: true,
          certificat: {
            produit: produit, millesime: lireUint16(cert, 2), numero: lireUint16(cert, 4),
            expireLe: expireLe,
            publiqueBrute: cert.slice(8, 8 + TAILLE_PUBLIQUE),
            nom: new TextDecoder().decode(cert.subarray(ENTETE_CERT, finCorps))
          }
        };
      });
  }

  /* ================================================================
     Étage 1 — le code maître
     ================================================================ */

  function lireCodeMaitre(code) {
    if (typeof code !== "string" || !code.trim()) return Promise.resolve(refus(MOTIFS.ABSENT));
    var propre = code.trim().replace(/\s+/g, "");
    if (!/^[A-Za-z0-9_-]+$/.test(propre)) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    var brut;
    try { brut = versOctets(propre); } catch (e) { return Promise.resolve(refus(MOTIFS.ILLISIBLE)); }
    if (brut.length < 3) return Promise.resolve(refus(MOTIFS.ILLISIBLE));
    if (brut[0] !== TYPE_MAITRE) return Promise.resolve(refus(MOTIFS.VERSION_INCONNUE));

    var finCert = 3 + lireUint16(brut, 1);
    if (brut.length !== finCert + 3 * TAILLE_SECRET) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    return lireCertificat(brut.subarray(3, finCert), true).then(function (lu) {
      if (!lu.ok) return lu;
      return {
        ok: true, certificat: lu.certificat,
        certificatBrut: brut.slice(3, finCert),
        secret: brut.slice(finCert, finCert + TAILLE_SECRET),
        kProf: brut.slice(finCert + TAILLE_SECRET, finCert + 2 * TAILLE_SECRET),
        kEleve: brut.slice(finCert + 2 * TAILLE_SECRET)
      };
    });
  }

  /* ================================================================
     Étage 2 — le code de séance, fabriqué par le titulaire
     ================================================================ */

  function lireCodeSeance(code) {
    if (typeof code !== "string" || !code.trim()) return Promise.resolve(refus(MOTIFS.ABSENT));
    var propre = code.trim().replace(/\s+/g, "");
    if (!/^[A-Za-z0-9_-]+$/.test(propre)) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    var brut;
    try { brut = versOctets(propre); } catch (e) { return Promise.resolve(refus(MOTIFS.ILLISIBLE)); }
    if (brut.length < 3) return Promise.resolve(refus(MOTIFS.ILLISIBLE));
    if (brut[0] !== TYPE_SEANCE) return Promise.resolve(refus(MOTIFS.VERSION_INCONNUE));

    var finCert = 3 + lireUint16(brut, 1), finCle = finCert + TAILLE_SECRET;
    if (brut.length < finCle + 3 + TAILLE_SIGNATURE) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    var tailleLibelle = brut[finCle + 2], finCorps = finCle + 3 + tailleLibelle;
    if (brut.length !== finCorps + TAILLE_SIGNATURE) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    /* 1er maillon : le certificat vient-il de la racine ? (sa date n'est pas
       jugée ici : c'est la fin de séance qui commande l'accès élève) */
    return lireCertificat(brut.subarray(3, finCert), false).then(function (lu) {
      if (!lu.ok) return lu;
      /* 2e maillon : la séance vient-elle bien de CE titulaire ? */
      return verifier(brut.subarray(0, finCorps), brut.subarray(finCorps), lu.certificat.publiqueBrute)
        .then(function (bon) {
          if (!bon) return refus(MOTIFS.SIGNATURE_INVALIDE);
          var finLe = versISO(lireUint16(brut, finCle));
          if (aujourdHui() > finLe) { var r = refus(MOTIFS.EXPIRE); r.finLe = finLe; return r; }
          return {
            ok: true, certificat: lu.certificat,
            kEleve: brut.slice(finCert, finCle), finLe: finLe,
            libelle: new TextDecoder().decode(brut.subarray(finCle + 3, finCorps))
          };
        });
    });
  }

  /* ================================================================
     Rangement — un accès par produit
     ================================================================ */

  function ranger(lu) {
    var c = lu.certificat;
    var valeur = {
      nom: c.nom, numero: c.numero, millesime: c.millesime, expireLe: c.expireLe,
      kProf: versB64url(lu.kProf), kEleve: versB64url(lu.kEleve)
    };
    try { localStorage.setItem(PREFIXE + c.produit.id, JSON.stringify(valeur)); } catch (e) {}
    return valeur;
  }

  function accesDe(idProduit) {
    try {
      var brut = localStorage.getItem(PREFIXE + idProduit);
      if (!brut) return null;
      var a = JSON.parse(brut);
      if (aujourdHui() > a.expireLe) return null; // périmé : comme s'il n'était pas là
      return a;
    } catch (e) { return null; }
  }

  function liste() {
    var sortie = [];
    for (var i = 0; i < PRODUITS.length; i++) {
      var a = accesDe(PRODUITS[i].id);
      if (a) sortie.push({ produit: PRODUITS[i], acces: a });
    }
    return sortie;
  }

  function oublier(idProduit) {
    try { localStorage.removeItem(PREFIXE + idProduit); } catch (e) {}
  }

  /* ================================================================
     Déchiffrement d'un document du coffre
     Format d'un .enc : IV (12) + tag (16) + données — WebCrypto attend
     données||tag, on recompose.
     ================================================================ */

  function dechiffrer(cleBrute, paquet) {
    var octets = new Uint8Array(paquet);
    var iv = octets.subarray(0, 12), tag = octets.subarray(12, 28), corps = octets.subarray(28);
    var assemble = new Uint8Array(corps.length + tag.length);
    assemble.set(corps, 0); assemble.set(tag, corps.length);
    return crypto.subtle
      .importKey("raw", cleBrute, { name: "AES-GCM" }, false, ["decrypt"])
      .then(function (cle) {
        return crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, cle, assemble);
      });
  }

  /** Va chercher un document du coffre et le rend en clair. */
  function ouvrirDocument(idProduit, urlDuEnc, niveau) {
    var a = accesDe(idProduit);
    if (!a) return Promise.reject(new Error("aucun accès rangé pour « " + idProduit + " »"));
    var cle = versOctets(niveau === "eleve" ? a.kEleve : a.kProf);
    return fetch(urlDuEnc, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("document introuvable : " + urlDuEnc);
        return r.arrayBuffer();
      })
      .then(function (paquet) { return dechiffrer(cle, paquet); });
  }

  /* ================================================================
     Le filigrane — le nom du porteur, sur ce qu'il consulte
     ================================================================ */

  function filigrane(nomOuProduit) {
    var nom = nomOuProduit;
    var a = accesDe(nomOuProduit);
    if (a) nom = a.nom;
    if (!nom) return;

    var ancien = document.getElementById("inerweb-filigrane");
    if (ancien) ancien.remove();

    var style = document.getElementById("inerweb-filigrane-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "inerweb-filigrane-style";
      style.textContent =
        "#inerweb-filigrane{position:fixed;inset:0;z-index:9999;pointer-events:none;" +
        "overflow:hidden;opacity:.09;display:flex;flex-wrap:wrap;align-content:center;" +
        "justify-content:center;gap:3rem}" +
        "#inerweb-filigrane span{font:600 1.05rem/1.2 system-ui,sans-serif;color:#0f172a;" +
        "transform:rotate(-24deg);white-space:nowrap}" +
        "@media print{#inerweb-filigrane{position:fixed;opacity:.13}}";
      document.head.appendChild(style);
    }

    var boite = document.createElement("div");
    boite.id = "inerweb-filigrane";
    boite.setAttribute("aria-hidden", "true");
    var texte = nom + " · inerWeb";
    for (var i = 0; i < 24; i++) {
      var s = document.createElement("span");
      s.textContent = texte;
      boite.appendChild(s);
    }
    document.body.appendChild(boite);
  }

  /* ================================================================
     Ce que les pages appellent
     ================================================================ */

  window.inerwebAcces = {
    MOTIFS: MOTIFS,
    PRODUITS: PRODUITS,
    CLE_RACINE: CLE_RACINE,

    /** Vérifie un code maître et le range. Ne range QUE s'il est valide. */
    activer: function (code) {
      return lireCodeMaitre(code).then(function (lu) {
        if (!lu.ok) return lu;
        var range = ranger(lu);
        return {
          ok: true, produit: lu.certificat.produit, nom: range.nom,
          numero: range.numero, millesime: range.millesime, expireLe: range.expireLe
        };
      });
    },

    /** Lit un code de séance (étage 2) et range sa clé élève pour le produit. */
    activerSeance: function (code) {
      return lireCodeSeance(code).then(function (lu) {
        if (!lu.ok) return lu;
        var id = lu.certificat.produit.id;
        try {
          localStorage.setItem(PREFIXE + id, JSON.stringify({
            nom: lu.certificat.nom, numero: lu.certificat.numero,
            millesime: lu.certificat.millesime, expireLe: lu.finLe,
            kEleve: versB64url(lu.kEleve), seance: lu.libelle
          }));
        } catch (e) {}
        return {
          ok: true, produit: lu.certificat.produit, nom: lu.certificat.nom,
          libelle: lu.libelle, finLe: lu.finLe
        };
      });
    },

    /** Un code de séance posé dans le fragment : …/page.html#s=<code> */
    seanceDansAdresse: function () {
      var m = /[#&]s=([A-Za-z0-9_\-]+)/.exec(location.hash || "");
      return m ? m[1] : null;
    },

    accesDe: accesDe,
    liste: liste,
    oublier: oublier,
    ouvrirDocument: ouvrirDocument,
    filigrane: filigrane,

    /** Le garde d'une page : y a-t-il un accès valide pour CE produit ? */
    ouvert: function (idProduit) { return accesDe(idProduit) !== null; }
  };
})();

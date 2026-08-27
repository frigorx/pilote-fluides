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
  var TAILLE_IDENT = 8; // identifiant de séance — voir build/lib-acces.mjs
  var EPOQUE = Date.UTC(2026, 0, 1), JOUR = 86400000;
  var PREFIXE = "inerweb.acces.";

  var MOTIFS = {
    ABSENT: "ABSENT", ILLISIBLE: "ILLISIBLE", VERSION_INCONNUE: "VERSION_INCONNUE",
    SIGNATURE_INVALIDE: "SIGNATURE_INVALIDE", EXPIRE: "EXPIRE",
    MAUVAIS_PRODUIT: "MAUVAIS_PRODUIT", PRODUIT_INCONNU: "PRODUIT_INCONNU",
    /* Refus propres à la FABRICATION d'une séance (étage 2) */
    PAS_TITULAIRE: "PAS_TITULAIRE", DATE_INVALIDE: "DATE_INVALIDE",
    DATE_PASSEE: "DATE_PASSEE", AU_DELA_DU_CERTIFICAT: "AU_DELA_DU_CERTIFICAT",
    LIBELLE_INVALIDE: "LIBELLE_INVALIDE",
    /* Refus propres aux élèves et à leurs bilans (étage 3) */
    AUTRE_SEANCE: "AUTRE_SEANCE", PAS_DE_SEANCE: "PAS_DE_SEANCE",
    ELEVE_INCONNU: "ELEVE_INCONNU"
  };

  /* Ce que l'utilisateur lit — jamais les motifs bruts. */
  var LIBELLES = {
    ABSENT: "Aucun code n'a été saisi.",
    ILLISIBLE: "Ce code est incomplet ou abîmé. Recopiez-le en entier, d'un bloc.",
    VERSION_INCONNUE: "Ce code n'est pas un code d'accès inerWeb.",
    SIGNATURE_INVALIDE: "Ce code n'est pas authentique, ou il a été modifié.",
    EXPIRE: "Ce code a expiré. Demandez-en un nouveau.",
    MAUVAIS_PRODUIT: "Ce code ouvre un autre produit inerWeb, pas celui-ci.",
    PRODUIT_INCONNU: "Ce code désigne un produit que ce site ne connaît pas.",
    PAS_TITULAIRE: "Il faut un code d'accès enseignant pour ouvrir une séance à une classe.",
    /* Le format écrit les dates en jours depuis le 1er janvier 2026 : une
       date d'avant n'est pas « illisible », elle est hors de portée. Le
       message couvre les deux cas sans en inventer un troisième. */
    DATE_INVALIDE: "Cette date ne se lit pas, ou elle est antérieure à 2026.",
    DATE_PASSEE: "Cette date est déjà passée. Choisissez une date à venir.",
    AU_DELA_DU_CERTIFICAT: "Cette date dépasse la fin de votre accès enseignant.",
    LIBELLE_INVALIDE: "Donnez un nom à la séance — court, il sera lu par vous seul.",
    AUTRE_SEANCE: "Ce résultat vient d'une autre séance que celle-ci.",
    PAS_DE_SEANCE: "Aucune séance n'est ouverte sur cet appareil.",
    ELEVE_INCONNU: "Ce code d'élève n'est pas reconnu pour cette séance. Vérifiez-le auprès de votre enseignant."
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

  /* Défaut-refus, comme au build : une date qui ne se lit pas ne s'interprète
     pas. Renvoie -1 plutôt que de lever, l'appelant décide du message. */
  function enJours(iso) {
    if (typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return -1;
    var p = iso.split("-");
    var t = Date.UTC(+p[0], +p[1] - 1, +p[2]);
    if (isNaN(t)) return -1;
    var jours = Math.round((t - EPOQUE) / JOUR);
    return (jours < 0 || jours > 0xffff) ? -1 : jours;
  }

  function aujourdHui() { return new Date().toISOString().slice(0, 10); }

  /* L'identifiant tel qu'on le montre : 3F2A-91C7-B04D-5E16 */
  function identLisible(octets) {
    var s = "";
    for (var i = 0; i < octets.length; i++) {
      s += ("0" + octets[i].toString(16).toUpperCase()).slice(-2);
    }
    return (s.match(/.{4}/g) || []).join("-");
  }

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
    var finIdent = finCle + TAILLE_IDENT;
    if (brut.length < finIdent + 3 + TAILLE_SIGNATURE) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    var tailleLibelle = brut[finIdent + 2], finCorps = finIdent + 3 + tailleLibelle;
    if (brut.length !== finCorps + TAILLE_SIGNATURE) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    /* 1er maillon : le certificat vient-il de la racine ? (sa date n'est pas
       jugée ici : c'est la fin de séance qui commande l'accès élève) */
    return lireCertificat(brut.subarray(3, finCert), false).then(function (lu) {
      if (!lu.ok) return lu;
      /* 2e maillon : la séance vient-elle bien de CE titulaire ? */
      return verifier(brut.subarray(0, finCorps), brut.subarray(finCorps), lu.certificat.publiqueBrute)
        .then(function (bon) {
          if (!bon) return refus(MOTIFS.SIGNATURE_INVALIDE);
          var finLe = versISO(lireUint16(brut, finIdent));
          if (aujourdHui() > finLe) { var r = refus(MOTIFS.EXPIRE); r.finLe = finLe; return r; }
          return {
            ok: true, certificat: lu.certificat,
            kEleve: brut.slice(finCert, finCle),
            identifiant: brut.slice(finCle, finIdent), finLe: finLe,
            libelle: new TextDecoder().decode(brut.subarray(finIdent + 3, finCorps))
          };
        });
    });
  }

  /* ================================================================
     Étage 2 — LA FABRIQUE : le titulaire signe ses propres séances
     ----------------------------------------------------------------
     C'est ici que le verrou se referme. Fabriquer exige le `secret` du
     titulaire, qui n'existe que dans un code maître délivré par la
     racine. Sans accès enseignant rangé, cette fonction refuse — et il
     n'y a pas de chemin de contournement : la signature est vérifiée
     par tous les lecteurs contre la clé publique de la racine.

     La clé privée est reconstruite en JWK depuis le scalaire (32 octets)
     et le point public tiré du certificat, comme `priveeDepuisSecret`
     au build. Elle n'est pas exportable et ne quitte pas ce navigateur.
     ================================================================ */

  function importerPrivee(secret, publiqueBrute) {
    return crypto.subtle.importKey("jwk", {
      kty: "EC", crv: "P-256",
      d: versB64url(secret),
      x: versB64url(publiqueBrute.subarray(1, 33)),
      y: versB64url(publiqueBrute.subarray(33, 65)),
      ext: false
    }, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  }

  /**
   * Fabrique un code de séance pour `idProduit`.
   * @param {string} idProduit  « habilitation », « aquiblue »…
   * @param {{libelle:string, finLe:string}} quoi  nom de la séance, date de fin AAAA-MM-JJ
   * @returns {Promise<{ok:boolean, code?:string, identifiant?:string, …}>}
   */
  function fabriquerSeance(idProduit, quoi) {
    var acces = accesDe(idProduit);
    if (!acces || !acces.secret || !acces.cert) return Promise.resolve(refus(MOTIFS.PAS_TITULAIRE));

    var libelle = String((quoi && quoi.libelle) || "").trim();
    var libelleBrut = new TextEncoder().encode(libelle);
    if (!libelleBrut.length || libelleBrut.length > 255) return Promise.resolve(refus(MOTIFS.LIBELLE_INVALIDE));

    var jours = enJours(String((quoi && quoi.finLe) || ""));
    if (jours < 0) return Promise.resolve(refus(MOTIFS.DATE_INVALIDE));
    var finLe = versISO(jours);
    if (finLe < aujourdHui()) return Promise.resolve(refus(MOTIFS.DATE_PASSEE));

    /* La séance ne peut pas survivre à l'accès qui l'a signée : c'est ce
       qui rend l'expiration annuelle réelle jusqu'au bout de la chaîne.
       `lireCodeSeance` ne rejuge pas la date du certificat — il compte
       sur ce garde-ci. */
    if (acces.expireLe && finLe > acces.expireLe) {
      var r = refus(MOTIFS.AU_DELA_DU_CERTIFICAT); r.expireLe = acces.expireLe;
      return Promise.resolve(r);
    }

    var cert = versOctets(acces.cert);
    var kEleve = versOctets(acces.kEleve);
    var secret = versOctets(acces.secret);
    var ident = crypto.getRandomValues(new Uint8Array(TAILLE_IDENT));

    var corps = new Uint8Array(3 + cert.length + TAILLE_SECRET + TAILLE_IDENT + 3 + libelleBrut.length);
    var i = 0;
    corps[i++] = TYPE_SEANCE;
    corps[i++] = (cert.length >> 8) & 0xff;
    corps[i++] = cert.length & 0xff;
    corps.set(cert, i); i += cert.length;
    corps.set(kEleve, i); i += TAILLE_SECRET;
    corps.set(ident, i); i += TAILLE_IDENT;
    corps[i++] = (jours >> 8) & 0xff;
    corps[i++] = jours & 0xff;
    corps[i++] = libelleBrut.length;
    corps.set(libelleBrut, i);

    return importerPrivee(secret, cert.subarray(8, 8 + TAILLE_PUBLIQUE))
      .then(function (cle) {
        return crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, cle, corps);
      })
      .then(function (signature) {
        var tout = new Uint8Array(corps.length + TAILLE_SIGNATURE);
        tout.set(corps, 0);
        tout.set(new Uint8Array(signature), corps.length);
        return {
          ok: true, code: versB64url(tout),
          identifiant: identLisible(ident),
          libelle: libelle, finLe: finLe, par: acces.nom
        };
      })
      .catch(function () { return refus(MOTIFS.ILLISIBLE); });
  }

  /* ================================================================
     ÉTAGE 3 — LES CODES INDIVIDUELS D'ÉLÈVE (AE-6)
     ----------------------------------------------------------------
     Miroir de `build/lib-acces.mjs`, même carte des octets. Le lien de
     séance reste COMMUN à la classe ; chaque élève tape en plus quatre
     caractères qui disent qui il est. Un lien fait ~400 caractères : un
     élève sans téléphone pour scanner ne pourrait pas le taper, on
     l'exclurait.

     ⚠️ CE QUE ÇA NE PROUVE PAS. Tous les élèves d'une séance partagent
     la même clé : le code est un numéro d'appel, pas une identité, et le
     sceau d'un bilan est un anti-erreur, pas un anti-triche. Le
     navigateur corrige, donc l'élève a les réponses. Une note qui compte
     au bulletin demande un serveur.
     ================================================================ */

  var ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ"; // sans O0 IL1 : un code se dicte
  var TAILLE_CODE_ELEVE = 4;
  var ELEVES_MAX = 100;      // garde-fou provisoire (27/08), augmentable
  var TYPE_BILAN = 0x31;
  var TAILLE_SCEAU_BILAN = 8;

  function importerHmac(cle) {
    return crypto.subtle.importKey("raw", cle, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  }

  function sceau(cle, donnees) {
    return importerHmac(cle).then(function (k) {
      return crypto.subtle.sign("HMAC", k, donnees);
    }).then(function (b) { return new Uint8Array(b); });
  }

  /** Le code court de l'élève `numero` dans cette séance. */
  function codeEleve(kEleve, identifiant, numero) {
    var entree = new Uint8Array(TAILLE_IDENT + 2);
    entree.set(identifiant, 0);
    entree[TAILLE_IDENT] = (numero >> 8) & 0xff;
    entree[TAILLE_IDENT + 1] = numero & 0xff;
    return sceau(kEleve, entree).then(function (h) {
      var code = "";
      for (var i = 0; i < TAILLE_CODE_ELEVE; i++) code += ALPHABET[h[i] % ALPHABET.length];
      return code;
    });
  }

  /** La liste à distribuer, et les doublons éventuels. */
  function listeEleves(kEleve, identifiant, combien) {
    var n = Math.min(Math.max(1, combien | 0), ELEVES_MAX);
    var travaux = [];
    for (var i = 1; i <= n; i++) {
      travaux.push(codeEleve(kEleve, identifiant, i).then((function (num) {
        return function (code) { return { numero: num, code: code }; };
      })(i)));
    }
    return Promise.all(travaux).then(function (eleves) {
      var vus = {}, doublons = [];
      eleves.forEach(function (e) {
        vus[e.code] = (vus[e.code] || 0) + 1;
        if (vus[e.code] === 2) doublons.push(e.code);
      });
      return { eleves: eleves, doublons: doublons };
    });
  }

  /**
   * À quel élève ce code correspond-il ? `null` si aucun — ou si plusieurs.
   * On ne s'arrête pas au premier trouvé : quatre caractères font 810 000
   * combinaisons, deux élèves d'une classe peuvent tirer le même code, et
   * s'arrêter au premier ferait travailler un élève sous le numéro d'un
   * autre, en silence. Un code ambigu ne désigne personne.
   */
  function retrouverEleve(kEleve, identifiant, saisi) {
    if (typeof saisi !== "string") return Promise.resolve(null);
    var propre = saisi.trim().toUpperCase().replace(/[\s-]/g, "");
    if (propre.length !== TAILLE_CODE_ELEVE) return Promise.resolve(null);

    return listeEleves(kEleve, identifiant, ELEVES_MAX).then(function (r) {
      var trouve = null;
      for (var i = 0; i < r.eleves.length; i++) {
        if (r.eleves[i].code !== propre) continue;
        if (trouve !== null) return null; // ambigu : personne
        trouve = r.eleves[i].numero;
      }
      return trouve;
    });
  }

  function borne(v, max) {
    var n = Number(v);
    if (!isFinite(n) || n < 0) return 0;
    return Math.min(Math.round(n), max);
  }

  function ecrire16(t, i, v) { t[i] = (v >> 8) & 0xff; t[i + 1] = v & 0xff; }

  /** Le bilan que l'élève recopiera : 19 octets + 8 de sceau → 36 caractères. */
  function fabriquerBilan(kEleve, d) {
    var jours = enJours(d.jour);
    if (jours < 0) return Promise.resolve(refus(MOTIFS.DATE_INVALIDE));

    var corps = new Uint8Array(19);
    corps[0] = TYPE_BILAN;
    corps.set(d.identifiant, 1);
    ecrire16(corps, 9, borne(d.numero, ELEVES_MAX));
    ecrire16(corps, 11, borne(jours, 0xffff));
    ecrire16(corps, 13, borne(d.dureeMin, 0xffff));
    ecrire16(corps, 15, borne(d.vues, 0xffff));
    ecrire16(corps, 17, borne(d.justes, 0xffff));

    return sceau(kEleve, corps).then(function (s) {
      var tout = new Uint8Array(19 + TAILLE_SCEAU_BILAN);
      tout.set(corps, 0);
      tout.set(s.subarray(0, TAILLE_SCEAU_BILAN), 19);
      return { ok: true, code: versB64url(tout) };
    });
  }

  function lireBilan(code, kEleve, identifiantAttendu) {
    if (typeof code !== "string" || !code.trim()) return Promise.resolve(refus(MOTIFS.ABSENT));
    var propre = code.trim().replace(/\s+/g, "");
    if (!/^[A-Za-z0-9_-]+$/.test(propre)) return Promise.resolve(refus(MOTIFS.ILLISIBLE));

    var brut;
    try { brut = versOctets(propre); } catch (e) { return Promise.resolve(refus(MOTIFS.ILLISIBLE)); }
    if (brut.length !== 19 + TAILLE_SCEAU_BILAN) return Promise.resolve(refus(MOTIFS.ILLISIBLE));
    if (brut[0] !== TYPE_BILAN) return Promise.resolve(refus(MOTIFS.VERSION_INCONNUE));

    var corps = brut.subarray(0, 19);
    return sceau(kEleve, corps).then(function (s) {
      for (var i = 0; i < TAILLE_SCEAU_BILAN; i++) {
        if (s[i] !== brut[19 + i]) return refus(MOTIFS.SIGNATURE_INVALIDE);
      }
      var identifiant = brut.slice(1, 9);
      if (identifiantAttendu) {
        for (var j = 0; j < TAILLE_IDENT; j++) {
          if (identifiant[j] !== identifiantAttendu[j]) return refus(MOTIFS.AUTRE_SEANCE);
        }
      }
      var vues = lireUint16(corps, 15), justes = lireUint16(corps, 17);
      return {
        ok: true, identifiant: identifiant,
        numero: lireUint16(corps, 9),
        jour: versISO(lireUint16(corps, 11)),
        dureeMin: lireUint16(corps, 13),
        vues: vues, justes: justes,
        pourcent: vues ? Math.round((justes * 100) / vues) : 0
      };
    });
  }

  /* ================================================================
     Rangement — un accès par produit
     ================================================================ */

  function ranger(lu) {
    var c = lu.certificat;
    var valeur = {
      nom: c.nom, numero: c.numero, millesime: c.millesime, expireLe: c.expireLe,
      kProf: versB64url(lu.kProf), kEleve: versB64url(lu.kEleve),
      /* Gardés pour que le titulaire puisse fabriquer ses séances sans
         recoller son code à chaque fois. `secret` SIGNE en son nom : il ne
         quitte jamais ce navigateur, et `activerSeance` ne l'écrit jamais —
         un élève qui scanne un QR n'obtient pas de quoi en fabriquer un. */
      cert: versB64url(lu.certificatBrut), secret: versB64url(lu.secret)
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

        /* ⚠️ Un accès maître déjà rangé n'est JAMAIS écrasé : la séance vient
           s'y poser. Sans ce garde, l'enseignant qui scanne son propre QR
           pour vérifier perdait son code maître — donc sa capacité à en
           fabriquer d'autres — et devait le recoller. Le cas se produit dès
           la première utilisation, il ne relève pas du cas rare. */
        var dejaLa = accesDe(id) || {};
        var valeur = {
          nom: dejaLa.kProf ? dejaLa.nom : lu.certificat.nom,
          numero: dejaLa.kProf ? dejaLa.numero : lu.certificat.numero,
          millesime: dejaLa.kProf ? dejaLa.millesime : lu.certificat.millesime,
          expireLe: dejaLa.kProf ? dejaLa.expireLe : lu.finLe,
          kEleve: versB64url(lu.kEleve),
          seance: lu.libelle, seanceId: identLisible(lu.identifiant),
          /* Les octets, et pas seulement la forme lisible : c'est avec eux
             que se calculent les codes d'élève et le sceau du bilan. */
          seanceIdBrut: versB64url(lu.identifiant),
          seanceFinLe: lu.finLe, seancePar: lu.certificat.nom
        };
        if (dejaLa.kProf) { valeur.kProf = dejaLa.kProf; valeur.cert = dejaLa.cert; valeur.secret = dejaLa.secret; }

        try { localStorage.setItem(PREFIXE + id, JSON.stringify(valeur)); } catch (e) {}
        return {
          ok: true, produit: lu.certificat.produit, nom: lu.certificat.nom,
          libelle: lu.libelle, finLe: lu.finLe,
          identifiant: identLisible(lu.identifiant)
        };
      });
    },

    /** Un code de séance posé dans le fragment : …/page.html#s=<code> */
    seanceDansAdresse: function () {
      var m = /[#&]s=([A-Za-z0-9_\-]+)/.exec(location.hash || "");
      return m ? m[1] : null;
    },

    /** Fabrique un code de séance — exige un accès enseignant rangé. */
    fabriquerSeance: fabriquerSeance,

    /* ---- Étage 3 : les élèves ---------------------------------- */

    /** La liste des codes d'élève d'une séance, à distribuer.
        Relit le code de séance : une signature fausse ne produit rien. */
    elevesDeSeance: function (codeSeance, combien) {
      return lireCodeSeance(codeSeance).then(function (lu) {
        if (!lu.ok) return lu;
        return listeEleves(lu.kEleve, lu.identifiant, combien).then(function (r) {
          return { ok: true, eleves: r.eleves, doublons: r.doublons,
                   libelle: lu.libelle, identifiant: identLisible(lu.identifiant) };
        });
      });
    },

    /** L'élève tape ses quatre caractères. Range son numéro pour la suite. */
    entrerCommeEleve: function (idProduit, saisi) {
      var a = accesDe(idProduit);
      if (!a || !a.seanceIdBrut) return Promise.resolve(refus(MOTIFS.PAS_DE_SEANCE));

      return retrouverEleve(versOctets(a.kEleve), versOctets(a.seanceIdBrut), saisi)
        .then(function (numero) {
          if (numero === null) return refus(MOTIFS.ELEVE_INCONNU);
          a.eleve = numero;
          try { localStorage.setItem(PREFIXE + idProduit, JSON.stringify(a)); } catch (e) {}
          return { ok: true, numero: numero, seance: a.seance };
        });
    },

    /** Qui suis-je dans cette séance ? `null` si l'élève n'a rien tapé. */
    numeroEleve: function (idProduit) {
      var a = accesDe(idProduit);
      return a && a.eleve ? a.eleve : null;
    },

    /** Le code de restitution que l'élève recopiera pour son enseignant. */
    monBilan: function (idProduit, resultat) {
      var a = accesDe(idProduit);
      if (!a || !a.seanceIdBrut) return Promise.resolve(refus(MOTIFS.PAS_DE_SEANCE));
      if (!a.eleve) return Promise.resolve(refus(MOTIFS.ELEVE_INCONNU));

      return fabriquerBilan(versOctets(a.kEleve), {
        identifiant: versOctets(a.seanceIdBrut), numero: a.eleve,
        jour: aujourdHui(), dureeMin: resultat.dureeMin,
        vues: resultat.vues, justes: resultat.justes
      });
    },

    /** L'enseignant dépouille : un paquet de bilans collés → un tableau. */
    depouiller: function (codeSeance, texte) {
      return lireCodeSeance(codeSeance).then(function (lu) {
        if (!lu.ok) return lu;
        var morceaux = String(texte || "").split(/[\s,;]+/).filter(function (m) { return m.length > 10; });
        var travaux = morceaux.map(function (m) {
          return lireBilan(m, lu.kEleve, lu.identifiant).then(function (b) {
            return { saisi: m, lu: b };
          });
        });
        return Promise.all(travaux).then(function (lignes) {
          return { ok: true, libelle: lu.libelle, lignes: lignes };
        });
      });
    },

    ELEVES_MAX: ELEVES_MAX,

    /** Ce produit a-t-il un accès ENSEIGNANT (et pas seulement une séance) ? */
    estTitulaire: function (idProduit) {
      var a = accesDe(idProduit);
      return !!(a && a.secret && a.cert);
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

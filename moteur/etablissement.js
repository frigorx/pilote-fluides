/* ==========================================================================
   moteur/etablissement.js
   L'espace « établissement partenaire » d'inerWeb : un composant autonome,
   sans dépendance, qui s'affiche de deux façons.

     <section data-etablissement="bandeau"></section>   la carte complète
     <div     data-etablissement="volet"></div>         la version compacte

   Au chargement, chaque élément portant l'attribut data-etablissement est
   rempli tout seul. Une autre page (le tableau de bord, par exemple) peut aussi
   l'appeler à la main :

     window.INERWEB_ETABLISSEMENT_RENDRE(element, "bandeau");   // ou "volet"

   Dans la version compacte, les puces mènent à index.html#etablissement. Une autre
   page peut viser une autre adresse avec l'attribut data-etablissement-lien.

   LE JOUR J, TOUT SE PASSE DANS LE BLOC DE RÉGLAGE CI-DESSOUS :
     1. remplir le nom, la ville, l'adresse, le site, le téléphone, le courriel ;
     2. déposer les logos fournis et écrire leur chemin (logo, logoGroupe) ;
     3. confirmer les deux couleurs de la charte de l'établissement ;
     4. passer actif à true.
   Tant que actif vaut false, la page montre une maquette : des emplacements
   vides au dessin tireté, et des boutons qui ne répondent pas encore.
   ========================================================================== */

window.INERWEB_ETABLISSEMENT = {
  actif: false,            // false : maquette avec les emplacements visibles ; true : les vraies données s'affichent
  type: "Lycée professionnel",
  nom: "", ville: "", adresse: "", codePostal: "", site: "", telephone: "", courriel: "",
  logo: "",                // chemin du logo de l'établissement (fourni le jour J, jamais avant)
  groupe: "", logoGroupe: "",   // réseau d'établissements et son logo (idem)
  // Charte graphique du campus (usine-contenu, CHARTE-GRAPHIQUE-INERWEB.md § 3.1) : bleu, violet, vert d'eau.
  // Les logos (établissement et campus) existent dans usine-contenu/gabarits/logos/ : à copier ici le jour J seulement.
  couleur: "#0C4B88", couleur2: "#706EED", couleur3: "#60CAB3",
  formations: [
    { sigle: "CAP IFCA", nom: "Installateur en froid et conditionnement d’air", duree: "2 ans", voie: "scolaire ou apprentissage" },
    { sigle: "Bac pro MFER", nom: "Métiers du froid et des énergies renouvelables", duree: "3 ans", voie: "scolaire ou apprentissage" },
    { sigle: "2de TNE", nom: "Transition numérique et énergétique", duree: "1 an", voie: "la seconde commune des métiers de l’énergie" },
    { sigle: "Titre pro TECVC", nom: "Technicien d’études en chauffage, ventilation et climatisation", duree: "", voie: "alternance et formation continue" }
  ],
  offres: [
    { id: "stages", emoji: "🧳", titre: "Accueillir un stagiaire", texte: "Les périodes de formation en entreprise (PFMP) : des élèves de CAP et de Bac pro, plusieurs semaines chaque année, suivis par leurs professeurs.", bouton: "Proposer un stage", courriel: "" },
    { id: "apprentis", emoji: "🔧", titre: "Recruter un apprenti", texte: "Des jeunes formés au froid, à la climatisation et à l’électricité, en contrat d’apprentissage ou à l’embauche en fin de formation.", bouton: "Rencontrer les candidats", courriel: "" },
    { id: "taxe", emoji: "💛", titre: "Verser la taxe d’apprentissage", texte: "Le solde de la taxe équipe le plateau technique : matériel, fluides, outillage, instruments de mesure.", bouton: "Soutenir le plateau technique", courriel: "" },
    { id: "visite", emoji: "🏫", titre: "Visiter, s’informer", texte: "Portes ouvertes, mini-stages de découverte pour les collégiens, rencontre avec l’équipe.", bouton: "Prendre contact", courriel: "" }
  ],
  accroche: "Un lycée professionnel forme les frigoristes et les climaticiens de demain.",
  sousAccroche: "Du CAP au Bac pro, en formation initiale et en apprentissage, sur un plateau technique de froid, de climatisation et d’électricité. inerWeb est né dans ses ateliers."
};

(function () {
  "use strict";

  var ID_STYLE = "etab-style";

  /* ---- Petits outils ---- */
  function conf() { return window.INERWEB_ETABLISSEMENT || {}; }
  function txt(v) { return v == null ? "" : String(v).trim(); }
  function esc(v) {
    return txt(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function liste(v) { return Array.isArray(v) ? v : []; }
  function plein(tableau) { return tableau.filter(function (x) { return x; }); }

  /* Une couleur de charte s'écrit #rgb ou #rrggbb ; sinon on garde la couleur prévue. */
  function couleurSure(c, defaut) {
    c = txt(c);
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c) ? c : defaut;
  }
  function luminance(c) {
    var h = c.slice(1);
    if (h.length === 3) h = h.replace(/./g, "$&$&");
    var v = [0, 2, 4].map(function (i) {
      var x = parseInt(h.substr(i, 2), 16) / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  /* Texte blanc sur un fond sombre, texte presque noir sur un fond clair : toujours lisible. */
  function encre(fond) { return luminance(fond) > 0.22 ? "#10233c" : "#ffffff"; }

  function adresseWeb(u) {
    u = txt(u);
    if (!u) return "";
    return /^https?:\/\//i.test(u) ? u : "https://" + u.replace(/^\/+/, "");
  }

  /* L'emplacement vide de la maquette : cadre tireté, texte gris. */
  function vide(libelle, classe) {
    return '<span class="etab-vide' + (classe ? " " + classe : "") + '">' + esc(libelle) + '</span>';
  }

  /* ---- La carte complète ---- */
  function enTete(c, actif) {
    var nom = txt(c.nom), type = txt(c.type), ville = plein([txt(c.codePostal), txt(c.ville)]).join(" ");
    var logo, titre, lieu, groupe;

    if (actif) {
      logo = txt(c.logo)
        ? '<span class="etab-logo etab-logo-plein"><img src="' + esc(c.logo) + '" alt="' + esc(nom || "Logo de l’établissement") + '"></span>'
        : "";
      titre = (type ? '<span class="etab-type">' + esc(type) + '</span>' : "") +
              (nom ? '<span class="etab-nom">' + esc(nom) + '</span>' : "");
      lieu = ville ? '<p class="etab-ville">' + esc(ville) + '</p>' : "";
      groupe = txt(c.logoGroupe)
        ? '<span class="etab-groupe etab-logo-plein"><img src="' + esc(c.logoGroupe) + '" alt="' + esc(c.groupe || "Logo du groupe") + '"></span>'
        : (txt(c.groupe) ? '<span class="etab-groupe etab-groupe-texte">' + esc(c.groupe) + '</span>' : "");
    } else {
      logo = vide("logo de l’établissement", "etab-logo");
      titre = '<span class="etab-type">' + esc(type) + '</span>' +
              '<span class="etab-nom">' + vide("nom de l’établissement") + '</span>';
      lieu = '<p class="etab-ville">' + vide("ville") + '</p>';
      groupe = vide("logo du groupe d’établissements", "etab-groupe");
    }
    return '<header class="etab-entete">' + logo +
           '<div class="etab-ident">' + (titre ? '<h2 class="etab-titre">' + titre + '</h2>' : "") + lieu + '</div>' +
           groupe + '</header>';
  }

  function formations(c) {
    var puces = liste(c.formations).map(function (f) {
      f = f || {};
      var detail = plein([txt(f.duree), txt(f.voie)]).join(", ");
      return '<li class="etab-formation"><strong class="etab-sigle">' + esc(f.sigle) + '</strong>' +
             '<span class="etab-fnom">' + esc(f.nom) + '</span>' +
             (detail ? '<span class="etab-fdetail">' + esc(detail) + '</span>' : '') + '</li>';
    }).join("");
    return puces ? '<h3 class="etab-rubrique">Les formations</h3><ul class="etab-formations">' + puces + '</ul>' : "";
  }

  /* Maquette : un bouton qui ne répond pas encore. Actif : un lien vers le courriel de l'offre,
     sinon vers le courriel général ; sans aucun courriel, pas de bouton du tout. */
  function bouton(o, c, actif) {
    var libelle = txt(o.bouton);
    if (!libelle) return "";
    if (!actif) {
      return '<span class="etab-bouton etab-inerte" aria-disabled="true">' + esc(libelle) +
             ' <span class="etab-badge">bientôt</span></span>';
    }
    var mail = (txt(o.courriel) || txt(c.courriel)).replace(/\s/g, "");
    if (!mail) return "";
    return '<a class="etab-bouton" href="mailto:' + esc(mail) + '?subject=' + encodeURIComponent(txt(o.titre)) + '">' + esc(libelle) + '</a>';
  }

  function offres(c, actif) {
    var cartes = liste(c.offres).map(function (o) {
      o = o || {};
      return '<li class="etab-offre" data-offre="' + esc(o.id) + '">' +
             '<div class="etab-offre-tete"><span class="etab-emoji" aria-hidden="true">' + esc(o.emoji) + '</span>' +
             '<h4 class="etab-offre-titre">' + esc(o.titre) + '</h4></div>' +
             '<p class="etab-offre-texte">' + esc(o.texte) + '</p>' +
             '<div class="etab-offre-action">' + bouton(o, c, actif) + '</div></li>';
    }).join("");
    return cartes ? '<h3 class="etab-rubrique">Ce que vous pouvez faire</h3><ul class="etab-offres">' + cartes + '</ul>' : "";
  }

  function pied(c, actif) {
    if (!actif) {
      return '<footer class="etab-pied">' + vide("adresse et contacts", "etab-adresse") +
             '<p class="etab-note">Espace réservé à l’établissement partenaire d’inerWeb. ' +
             'Nom, logo et coordonnées s’afficheront avec son accord.</p></footer>';
    }
    var adresse = plein([txt(c.adresse), plein([txt(c.codePostal), txt(c.ville)]).join(" ")]).join(", ");
    var site = adresseWeb(c.site), tel = txt(c.telephone), mail = txt(c.courriel).replace(/\s/g, "");
    var morceaux = [
      adresse ? '<address>' + esc(adresse) + '</address>' : "",
      site ? '<span>Site : <a href="' + esc(site) + '" target="_blank" rel="noopener">' + esc(site.replace(/^https?:\/\//i, "").replace(/\/$/, "")) + '</a></span>' : "",
      tel ? '<span>Téléphone : <a href="tel:' + esc(tel.replace(/[^\d+]/g, "")) + '">' + esc(tel) + '</a></span>' : "",
      mail ? '<span>Courriel : <a href="mailto:' + esc(mail) + '">' + esc(mail) + '</a></span>' : ""
    ];
    return '<footer class="etab-pied">' + plein(morceaux).join("") + '</footer>';
  }

  function bandeau(c) {
    var actif = c.actif === true;
    return '<div class="etab ' + (actif ? "etab-actif" : "etab-maquette") + '">' +
           enTete(c, actif) +
           '<div class="etab-corps">' +
           (txt(c.accroche) ? '<p class="etab-accroche">' + esc(c.accroche) + '</p>' : "") +
           (txt(c.sousAccroche) ? '<p class="etab-sous">' + esc(c.sousAccroche) + '</p>' : "") +
           formations(c) + offres(c, actif) +
           '</div>' + pied(c, actif) + '</div>';
  }

  /* ---- La version compacte, pour le volet d'actualités ---- */
  function volet(c, lien) {
    var actif = c.actif === true;
    var ville = txt(c.ville), nom = txt(c.nom);
    var identite = actif && nom
      ? '<div class="etab-v-nom">' + esc(nom) + (ville ? ', ' + esc(ville) : '') + '</div>'
      : "";
    var puces = ["Stages", "Apprentis", "Taxe d’apprentissage", "Visiter"].map(function (m) {
      return '<li><a class="etab-v-puce" href="' + esc(lien) + '">' + esc(m) + '</a></li>';
    }).join("");
    return '<h3 class="etab-v-titre">🏫 L’établissement partenaire' +
           (actif ? '' : ' <span class="etab-badge">maquette</span>') + '</h3>' +
           identite +
           '<div class="etab-v-phrase">' + esc(c.accroche) + '</div>' +
           '<ul class="etab-v-puces">' + puces + '</ul>';
  }

  /* ---- La mise en page, posée une seule fois dans la page ---- */
  var CSS = [
    /* Carte complète */
    '.etab,.etab *{box-sizing:border-box}',
    '.etab{max-width:1080px;margin:0 auto;background:var(--carte,#fffdf8);color:var(--txt,#10233c);',
    'border:1px solid var(--ligne,#d6dee7);border-radius:var(--r,14px);box-shadow:var(--ombre,0 2px 10px rgba(27,58,99,.10));',
    'overflow:hidden;line-height:1.55}',
    '.etab-entete{display:flex;flex-wrap:wrap;align-items:center;gap:16px 24px;padding:20px 28px;',
    'background:var(--etab-c,#0C4B88);color:var(--etab-c-encre,#fff);border-bottom:6px solid var(--etab-c2,#706EED)}',
    '.etab-ident{flex:1 1 16em;min-width:0}',
    '.etab-titre{margin:0;font-family:var(--titre,inherit);font-weight:bold;line-height:1.2}',
    '.etab-type{display:block;font-size:16px;font-weight:normal}',
    '.etab-nom{display:block;font-size:28px}',
    '.etab-ville{margin:2px 0 0;font-size:16px}',
    '.etab-groupe{margin-left:auto}',
    '.etab-groupe-texte{font-size:16px;font-weight:bold}',
    '.etab-logo-plein{display:flex;align-items:center;justify-content:center;background:#fff;border-radius:10px;padding:8px 12px}',
    '.etab-logo-plein img{display:block;max-width:220px;width:auto;height:auto}',
    '.etab-logo img{max-height:76px}',
    '.etab-groupe img{max-height:56px}',
    '.etab-corps{padding:26px 28px 6px}',
    '.etab-accroche{margin:0 0 8px;font-family:var(--titre,inherit);font-size:30px;font-weight:bold;line-height:1.2;text-wrap:pretty}',
    '.etab-sous{margin:0 0 6px;max-width:46em;font-size:17px;color:var(--mut,#5a6b7d);text-wrap:pretty}',
    '.etab-rubrique{margin:24px 0 10px;padding-left:12px;border-left:5px solid var(--etab-c2,#706EED);',
    'font-family:var(--titre,inherit);font-size:19px;line-height:1.3;color:var(--etab-t,#0C4B88)}',
    '.etab-formations{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}',
    '.etab-formation{padding:10px 14px;border:1px solid var(--ligne,#d6dee7);border-left:5px solid var(--etab-c3,#60CAB3);',
    'border-radius:10px;background:#fbfdff}',
    '.etab-sigle{display:block;font-family:var(--titre,inherit);font-size:18px;color:var(--etab-t,#0C4B88)}',
    '.etab-fnom{display:block;font-size:15.5px;line-height:1.4}',
    '.etab-fdetail{display:block;margin-top:2px;font-size:15px;color:var(--mut,#5a6b7d)}',
    '.etab-offres{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}',
    '.etab-offre{display:flex;flex-direction:column;gap:6px;padding:16px 18px;border:1px solid var(--ligne,#d6dee7);',
    'border-top:5px solid var(--etab-c2,#706EED);border-radius:var(--r,14px);background:#fbfdff}',
    '.etab-offre-tete{display:flex;align-items:center;gap:12px}',
    '.etab-emoji{flex:none;display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;',
    'border-radius:50%;background:#e4f6f1;background:color-mix(in srgb,var(--etab-c3,#60CAB3) 24%,white);font-size:26px;line-height:1}',
    '.etab-offre-titre{margin:0;font-family:var(--titre,inherit);font-size:20px;line-height:1.25;color:var(--etab-t,#0C4B88)}',
    '.etab-offre-texte{margin:0;font-size:16px}',
    '.etab-offre-action{margin-top:auto;padding-top:8px}',
    '.etab-bouton{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:9px 20px;border-radius:999px;',
    'background:var(--etab-c2,#706EED);color:var(--etab-c2-encre,#fff);font-size:16px;font-weight:bold;line-height:1.3;text-decoration:none}',
    'a.etab-bouton:hover,a.etab-v-puce:hover{color:var(--etab-c2-encre,#fff);text-decoration:underline}',
    '.etab-inerte{background:#eceff3;color:#4a5663;border:2px dashed #aab4c0;cursor:not-allowed}',
    '.etab-badge{display:inline-block;padding:1px 9px;border-radius:999px;background:var(--etab-c2,#706EED);color:var(--etab-c2-encre,#fff);',
    'font-family:var(--titre,inherit);font-size:15px;font-weight:bold;line-height:1.4}',
    '.etab-pied{display:flex;flex-wrap:wrap;align-items:center;gap:8px 24px;margin-top:24px;padding:16px 28px;',
    'border-top:1px solid var(--ligne,#d6dee7);background:#f3f5fa;font-size:15px;color:var(--mut,#5a6b7d)}',
    '.etab-pied address{font-style:normal;color:var(--txt,#10233c)}',
    '.etab-pied a{color:var(--etab-t,#0C4B88);font-weight:bold}',
    '.etab-note{margin:0;flex:1 1 20em;font-size:15px}',
    /* L'emplacement vide de la maquette */
    '.etab-vide{display:inline-flex;align-items:center;justify-content:center;padding:8px 14px;border:2px dashed currentColor;',
    'border-radius:10px;font-size:15px;font-weight:normal;font-style:normal;line-height:1.35;text-align:center;color:var(--mut,#5a6b7d)}',
    '.etab-entete .etab-vide{color:var(--etab-c-encre,#fff)}',
    '.etab-vide.etab-logo{min-width:150px;min-height:84px}',
    '.etab-vide.etab-groupe{min-width:130px;min-height:56px}',
    '.etab-nom .etab-vide{margin:6px 0;font-size:20px}',
    /* Version compacte */
    '.etab-volet{border:1px solid var(--ligne,#d6dee7);border-left:6px solid var(--etab-c2,#706EED);border-radius:10px;padding:11px 13px;background:#f3f6fb;background:color-mix(in srgb,var(--etab-c,#0C4B88) 7%,white)}',
    '.etab-volet .etab-v-titre{margin:0 0 4px;font-family:var(--titre,inherit);font-size:16px;line-height:1.3;color:var(--etab-t,#0C4B88)}',
    '.etab-volet .etab-v-nom{margin:0 0 3px;font-size:15px;font-weight:bold;color:var(--txt,#10233c)}',
    '.etab-volet .etab-v-phrase{font-size:15px;line-height:1.45;color:var(--txt,#10233c)}',
    '.etab-v-puces{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:6px}',
    '.etab-v-puce{display:inline-flex;align-items:center;min-height:40px;padding:5px 13px;border-radius:999px;',
    'background:var(--etab-c2,#706EED);color:var(--etab-c2-encre,#fff);font-size:15px;font-weight:bold;line-height:1.2;text-decoration:none}',
    '.etab a:focus-visible,.etab-volet a:focus-visible{outline:3px solid var(--orange,#ff6b35);outline-offset:2px}',
    /* Téléphone */
    '@media (max-width:760px){',
    '.etab-entete{padding:16px 18px}',
    '.etab-nom{font-size:24px}',
    '.etab-groupe{margin-left:0}',
    '.etab-corps{padding:20px 18px 4px}',
    '.etab-accroche{font-size:25px}',
    '.etab-offres{grid-template-columns:1fr}',
    '.etab-pied{padding:14px 18px}',
    '}'
  ].join("\n");

  function poserStyle() {
    if (document.getElementById(ID_STYLE)) return;
    var s = document.createElement("style");
    s.id = ID_STYLE;
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* Les deux couleurs de la charte de l'établissement, posées sur l'élément rempli. */
  function poserCouleurs(el, c) {
    var c1 = couleurSure(c.couleur, "#0C4B88"), c2 = couleurSure(c.couleur2, "#706EED"), c3 = couleurSure(c.couleur3, "#60CAB3");
    el.style.setProperty("--etab-c3", c3);
    el.style.setProperty("--etab-c", c1);
    el.style.setProperty("--etab-c-encre", encre(c1));
    el.style.setProperty("--etab-c2", c2);
    el.style.setProperty("--etab-c2-encre", encre(c2));
    /* Couleur des titres posés sur la carte claire : celle de l'établissement si elle est assez sombre. */
    el.style.setProperty("--etab-t", luminance(c1) < 0.2 ? c1 : "#10233c");
  }

  function rendre(el, mode) {
    if (!el) return el;
    var c = conf();
    poserStyle();
    poserCouleurs(el, c);
    if (mode === "volet") {
      el.classList.add("etab-volet");
      el.innerHTML = volet(c, el.getAttribute("data-etablissement-lien") || "index.html#etablissement");
    } else {
      el.classList.remove("etab-volet");
      el.innerHTML = bandeau(c);
    }
    return el;
  }
  window.INERWEB_ETABLISSEMENT_RENDRE = rendre;

  function toutRendre() {
    var l = document.querySelectorAll("[data-etablissement]");
    for (var i = 0; i < l.length; i++) rendre(l[i], l[i].getAttribute("data-etablissement"));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", toutRendre);
  else toutRendre();
})();

# Chantier inerweb.fr — améliorations du site en ligne (reprise 19-20/08/2026)

Dépôt : C:\git\pilote-fluides (main, public, sert https://inerweb.fr via GitHub Pages).
Règle : vérifier LE SITE SERVI après chaque push. `node build/version.mjs` après toute
page HTML nouvelle. Signatures visibles = « inerweb.fr ».

## File priorisée (tri de Franck)

- [x] 1. PWA — FAIT (b8f0754), vérifié sur inerweb.fr : manifest+SW+icônes servis,
      hors-ligne testé dans Chrome (cache socle, repli hors-ligne.html, réseau repris).
- [x] 2. Descriptions des stations — FAIT (7b459df), vérifié servi : registre.mjs
      relève les <meta description> → plan-descriptions.gen.js → vues de ligne.
- [x] 3. Mission F-Gas — FAIT : inerweb-fgaz anonymisé (a32ce48, vérifié servi),
      station ceinture (892de45). Classement local retiré en entier (sans nom,
      sans objet) ; export CSV anonyme déplacé vers Mes stats.
- [x] 4. TD triphasé — FAIT : neutralisé 10→0 traces, poussé dans sous-tension
      (2dd88f9) ; ligne ⚡ ÉLECTROTECH au plan (1e609cb) avec Sous tension + TD.
      + 2 BUGS RÉPARÉS : positions ceinture désormais calculées (9e station était
      en cx=undefined — bug de mon 892de45) ; raccordements tronc→branches
      invisibles depuis l'origine (flux() sans couleur).
      ⚠️ sous-tension : 13 SVG avec métadonnées RDF NON COMMITÉS (pas de moi,
      chantier marquage 18/08 ?) — laissés en l'état, signalés à Franck.
- [x] 5. Logo unique — FAIT : marque.js chargé depuis inerweb.fr dans les 3 satellites
      (tools-beta f3d20f7 via ui_shell.js ×13 pages ; sous-tension 73907cc ×6 ;
      qcm-hauteur 6195ee1). Signatures artisanales retirées, « TD x/3 » préservés.
      + « Auteur: F. Henninot » trouvé dans l'EN-TÊTE des 13 pages outils (manqué
      le 19/08) → remplacé par inerweb.fr.
- [x] 6. Son films — FAIT (72ffaea) : .catch() sur play() (échec expliqué au bouton)
      + aide iOS 9 s « désactive le mode silencieux » à la 1re lecture, sur les DEUX
      films (ozone + effet de serre, même montage). Le silencieux iOS n'est pas
      détectable par code : on explique, on ne contourne pas.
- [x] 7. Galerie ARIA + tactile — FAIT (c88b568) : role=group nommé, aria-pressed
      tenu au clic, aria-label recherche, aria-live compteur ; 42 px sous
      (pointer:coarse) seulement.
- [x] 8. Open Graph — FAIT (5f7fb22) : icones/og-inerweb-1200x630.png à la charte
      (canvas, texte jamais sur tracé, aucun compteur qui périme) + meta og:image
      + twitter:card sur l'accueil.

## Décisions en attente de Franck (rappeler sans harceler)

- Galerie au sitemap ou noindex ?
- Relecture métier des 2 cours du 19/08 (parcours-manomètres, glissement).
- 🔴 A2F GitHub compte frigorx AVANT LE 31/08.

## Pièges payés (ne pas repayer)

- build/version.mjs : liste PAGES en dur — toute page HTML nouvelle à la racine s'y ajoute.
- .gitignore exclut *.pdf — exceptions explicites nécessaires.
- Jamais de lien vers du taché (nom d'établissement, nominatif, envoi réseau non déclaré).

## Mission 2 — durcissement (20/08 après-midi) : PUBLIÉ

- Bon à tirer donné par Franck le 20/08. Commits `7166e98` + `99ef793`, poussés.
- Rapport complet (avec les 4 décisions au § 9) : RAPPORT-DURCISSEMENT-2026-08-20.md.
- Checklist GitHub/OVH/Search Console : CHECKLIST-REGLAGES-EXTERIEURS.md — 🔴 elle,
  elle attend TOUJOURS Franck (A2F avant le 31/08, 4e IP OVH, Search Console).
- Décisions appliquées : 7 pages en noindex (3 via leur générateur) · galerie
  toujours cachée · noms conservés car les pages sont cachées (corollaire dans
  REPRISE.md : rendre une de ces pages visible oblige à retirer les mentions).

## Contrôle après publication (20/08, fin de session)

- Franck signalait une publication partie plus tôt que prévu → contrôle complet mené.
- RÉSULTAT : rien de son travail en cours n'a fuité, rien n'a été écrasé (détail au
  § 12 du rapport). Décision : **on laisse en ligne**, comportement inchangé
  (« publie » = j'envoie).
- ⚠️ Session Claude Code PARALLÈLE active sur le dépôt (brique régulateur
  électronique, non commitée). Elle doit faire `git pull` avant de committer.
- ⚠️ Ses fichiers `_p0.js` … `_p9.js`, `_pdoss.js` sont des fichiers de travail :
  rien ne les charge, à ne pas committer tels quels.
- Deux briques annoncées par Franck : régulateurs (en cours) et pressostat BP (pas
  encore commencée sur le disque).

## 2e audit exterieur (session du 19/08) — file des 6 points

Audit en lecture seule du site servi, commit `7f37d1d`. Tri fait, verifie fait par fait :
plusieurs constats de l'audit etaient deja tranches ou faux. Ordre choisi : d'abord ce qui
ne demande AUCUNE decision de Franck.

- [x] **Lot 1 — liens morts et feuilles d'impression.** Commit `665fdcf`.
      4 destinations 404 (tomes 2, 3, 4) + 2 `impression.css` fantomes. Sitemap : pas de bug,
      liste controlee ; ajoute le garde-fou que l'en-tete du script annoncait sans le faire.
      Verifie sur serveur local (8 cibles en 200, feuille print chargee, console vide) et par
      un verificateur passe sur les 91 pages HTML. NON POUSSE.
- [x] **Lot 2 — accessibilite.** Commit `0c59450`. Skip-link qui pose vraiment le focus · volet Actualites
      `inert` quand ferme (ses liens restent atteignables au clavier) · bouton `Aa` sans
      `aria-expanded` / `aria-controls`, sourd a Echap. Pur code, aucune decision.
- [x] **Lot 3 — les deux films.** Commits `513a533` (unpkg) + `332e61c` (h1/main/transcription). `film-ozone/support.js:1143-1147` et son jumeau
      `film-effet-de-serre` chargent React, ReactDOM et `@babel/standalone` depuis unpkg.com.
      Donc : pas hors ligne, une connexion du visiteur part vers un tiers, la mention
      « aucun script tiers » des mentions legales est fausse, et Babel compile du JSX dans le
      navigateur — ce qui interdit toute CSP stricte. Tranche sans redemander : vendoriser
      React/ReactDOM, precompiler le JSX, supprimer Babel. Puis h1/main/transcription.
      ⚠️ `build/audit-conformite.mjs` ne voit PAS ces dependances distantes.

### Ce qui attend une decision de Franck — ne pas commencer sans

- [ ] **En-tetes de securite** (CSP, HSTS, X-Content-Type-Options, Referrer-Policy,
      Permissions-Policy, frame-ancestors). PAS un chantier de code : GitHub Pages ne sert
      aucun en-tete personnalise. Decider de passer, ou non, par Cloudflare.
- [ ] **Coffre** : l'outil accepte encore une phrase de passe de 4 caracteres, et les fichiers
      chiffres sont publics. Confirmer la phrase reellement employee. Si elle est faible,
      rechiffrer ne suffit pas — l'ancienne version reste dans l'historique git.
- [ ] **Contraste** : #ff6b35 sur beige ~2,52:1, blanc sur orange ~2,84:1, gris #8494a4
      ~2,8-3,1:1 (seuil 4,5:1). Corriger = creer une variante foncee DANS la charte
      (`usine-contenu\00-charte\`), hors de ce depot.
- [ ] **SEO des modules** : les ~60 cours sont indexables mais hors sitemap et sans canonical.
      Les y mettre contredirait « galerie cachee tant que la relecture metier n'est pas
      faite ». Arbitrage, pas correction.
- [ ] **mentions.html** : toujours un brouillon non lie, champs a valider, et son
      « aucun script tiers » devient vrai seulement une fois le lot 3 fait.
- [ ] **contact@inerweb.fr** est affiche par `regulateur-electronique-interactif` : soit la
      boite releve, soit l'adresse se retire. (DMARC : decision du 20/08 inchangee, rien a
      publier tant qu'aucune adresse n'envoie.)

### A remonter

- Les dates du depot sont en avance d'un jour : entrees « 20/08 » dans REPRISE.md alors que
  la session se tient le 19/08. Non corrige — l'ecart vient d'avant cette session.

### Fait le 19/08 (session de l audit)

Cinq commits POUSSES et verifies sur le site servi : 665fdcf, 0c59450, 513a533,
332e61c, add7b71 (+ la correction de trace). Deploiement GitHub Pages 32287375094,
succes en 50 s. Controle en ligne : aucune requete hors du site sur les deux films,
Babel jamais charge, empreintes des vendors SERVIS re-calculees et conformes, focus
du lien d evitement, volet inert, bouton Aa complet, plus aucun 404 sur les tomes.
Le detail vit dans le REPRISE.md du depot (la verite du chantier), bloc en tete.
Deux pieges payes a ne pas reapprendre : le `<main>` intercale rompt la chaine de
hauteurs du runtime Design (film rendu dans 0 px) ; et `build/audit-conformite.mjs`
ne voit pas les dependances distantes.

## Journal

- 20/08 : reprise, plan posé.
- 20/08 : LES 8 POINTS SOLDÉS, tout poussé et vérifié sur les sites servis.
  pilote-fluides : b8f0754 (PWA) → 39f2f46 (REPRISE 20/08).
  Satellites : inerweb-fgaz a32ce48 · sous-tension 2dd88f9+73907cc ·
  tools-beta f3d20f7 · qcm-hauteur 6195ee1.
  REPRISE.md du dépôt porte le bloc 20/08 complet (la vérité du chantier).

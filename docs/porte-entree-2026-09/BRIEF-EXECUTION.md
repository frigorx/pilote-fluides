# Brief d'exécution — nouvelle porte d'entrée de l'accueil (05/09/2026)

Cadrage par Claude (Fable 5.1), exécution par un agent Sonnet, vérification et publication par
Fable. Décision de F. Henninot du 05/09 : « faire toute cette mise à jour, sans tout casser,
et mettre en ligne ». Périmètre : la page d'accueil `index.html` (+ une ligne de navigation dans
`metier.html` et `formateurs.html`). L'éclatement en huit réseaux et la deuxième tête de ligne
sur la carte sont HORS périmètre (chantier suivant).

## Règles absolues

1. **Ne jamais toucher** : le bloc de données `/* DONNEES-PLAN — DEBUT */ … /* DONNEES-PLAN — FIN */`
   (lignes ~1080-1451), la section générée `<!-- LISTE-PLAN DEBUT … FIN -->` (~740-924), le JSON-LD
   (ligne 25), et aucun `<script>` de la page. Aucune retouche « au passage » du code voisin.
2. **Couper-coller, pas retaper** : les deux bandeaux AquiBlue et HoCourant sont déplacés tels quels
   (mêmes textes, mêmes boutons, mêmes liens). Les quatre cartes de réseaux (Législation, HydroMétro,
   AéroRézo, ÉlectroRézo) sont déplacées telles quelles.
3. **Liens relatifs** pour tout ce qui est sur le site (jamais `https://inerweb.fr/...`) ; les liens
   externes (github, frigorx.github.io, mailto) restent tels quels.
4. **Vouvoiement**, français simple, aucun anglicisme, aucun tutoiement.
5. Aucun texte ne passe sur un trait : l'organigramme est en HTML (cartes reliées par des bordures).
6. Les commentaires HTML du fichier expliquent le POURQUOI avec la date et l'auteur de la décision :
   garder ce style pour les nouveaux blocs (les commentaires ci-dessous sont à reprendre).
7. **Pas de commit.** À la fin : `node outils/controle-syntaxe.mjs` (doit passer), puis
   `node build/plan-liste.mjs` (idempotent : ne doit RIEN changer d'autre — vérifier avec
   `git diff --stat`), puis rapport.

## Repères dans `index.html` (numéros de lignes avant modification)

| Ligne | Repère |
|---|---|
| 170-191 | CSS de la grille des réseaux, sélecteurs `.plan .reseaux …` |
| 112 | `/* ---- Blocs blancs ---- */` (insérer la nouvelle CSS juste avant) |
| 456-461 | `<nav class="nav">` de l'en-tête |
| 467-494 | commentaire + `<aside class="bandeau-aquiblue" aria-label="inerWeb AquiBlue">` … `</aside>` |
| 496-521 | commentaire + `<aside class="bandeau-aquiblue bandeau-hocourant" aria-label="inerWeb HoCourant">` … `</aside>` |
| 523-541 | `<div class="accroche">` … (chapô à la ligne 528) |
| 543 | `<details class="mot-auteur">` |
| 576-580 | `<details class="nouveautes" id="nouveautes">`, summary avec la date, `<div class="nv-corps">`, premier `<h3>28 août 2026</h3>` |
| 639-642 | `<div class="bloc plan" id="carte">` + titre-bloc `<h2>Le plan de formation</h2>` |
| 644-702 | commentaire « LES TROIS RÉSEAUX » + `<div class="reseaux">` … `</div>` (grille des cinq réseaux) |
| 703 | `<!-- CHERCHER UNE STATION …` (le plan continue) |
| 732-735 | `<!-- Le réseau EN LISTE …` + `<section class="bloc liste-reseau" id="liste-cours" …>` |

## Changement 1 — CSS

### 1a. Sortir la grille des réseaux du bloc `.plan`

Dans les lignes 170-191, remplacer chaque `.plan .reseaux` par `.reseaux` (12 sélecteurs), et :

- `.plan .reseaux { padding:16px 24px 0; }` devient `.reseaux { padding:0; }`
- `.plan .reseaux .r-grille { display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); }`
  devient `.reseaux .r-grille { display:grid; gap:12px; grid-template-columns:1fr; }`
  (la grille vit désormais dans une colonne de l'organigramme : une carte par rangée).

Le reste de ces règles (couleur de fond `var(--c)`, texte blanc, `.r-nom`, `.r-det`, `.r-etat`,
`.r-fleche`, `.r-ligne`) est inchangé.

### 1b. Insérer, juste avant la ligne `  /* ---- Blocs blancs ---- */`

```css
  /* ---- L'ORGANIGRAMME (05/09/2026) : la porte d'entrée. F. Henninot :
     « attaquer par l'organigramme, et dérouler le reste après ». Les
     cartes des réseaux gardent leur style (.reseaux, ci-dessus, sorti du
     bloc .plan) ; l'arbre n'ajoute que la racine, le rail et les trois
     colonnes. Les traits relient des cartes, aucun texte ne passe dessus.
     Sur téléphone : une colonne, pas de traits. ---- */
  .orga { margin:26px 0 0; }
  .o-racine { width:max-content; max-width:100%; margin:0 auto; padding:10px 26px;
              background:var(--bleu); color:#fff; font-family:var(--titre); font-weight:bold;
              font-size:22px; border-radius:12px; text-align:center; }
  .o-racine small { display:block; font-weight:normal; font-size:14px; opacity:.9; }
  .o-tige { width:3px; height:24px; background:var(--bleu); margin:0 auto; }
  .o-rail { height:3px; background:var(--bleu); margin:0 calc(16.66% - 6px); }
  .o-colonnes { display:grid; grid-template-columns:repeat(3,1fr); gap:0 18px; }
  .o-col { position:relative; padding-top:24px; min-width:0; }
  .o-col::before { content:""; position:absolute; top:0; left:50%; width:3px; height:24px;
                   margin-left:-1.5px; background:var(--bleu); }
  .o-tete { text-align:center; font-family:var(--titre); font-weight:bold; color:var(--bleu);
            font-size:17px; padding:10px 12px; border:2px solid var(--bleu); border-radius:10px;
            background:var(--carte); margin-bottom:12px; }
  .o-tete small { display:block; font-weight:normal; color:var(--mut); font-size:13.5px; }
  .o-sous { list-style:none; margin:-4px 0 0 14px; padding:0 0 0 12px;
            border-left:2px solid var(--ligne); display:grid; gap:4px; }
  .o-sous li { font-size:14px; color:var(--mut); }
  .o-sous li b { color:var(--txt); font-weight:600; }
  /* Les trois portes — même geste qu'ÉlectroRézo (ses trois portes) et
     qu'HydroMétro (« Trouver mon trajet » à côté de la carte). */
  .portes-titre { margin:28px 0 10px; font-family:var(--titre); font-size:22px; color:var(--bleu); }
  .portes { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:14px; }
  .porte { display:grid; grid-template-columns:52px 1fr; gap:4px 12px; align-items:start;
           text-decoration:none; color:var(--txt); background:var(--carte);
           border:2px solid var(--bleu); border-radius:var(--r); padding:14px 16px; box-shadow:var(--ombre); }
  .porte:hover { background:#e7eff7; }
  .porte .p-ico { grid-row:1 / span 2; font-size:36px; line-height:1; }
  .porte .p-titre { font-family:var(--titre); font-weight:bold; font-size:19px; color:var(--bleu); }
  .porte .p-det { color:var(--mut); font-size:14.5px; }
  .porte.forte { border-color:var(--orange); }
  .porte.forte .p-titre { color:var(--orange); }
  /* Les outils : les bandeaux AquiBlue / HoCourant / Fluide dans un bloc blanc, sous le plan. */
  .outils .corps { padding:0 24px 22px; }
  .outils .corps .bandeau-aquiblue { margin-top:14px; }
  .bandeau-fluide { border:2px solid var(--bleu-clair); }
  @media (max-width:760px) {
    .o-colonnes { grid-template-columns:1fr; gap:16px; }
    .o-rail, .o-tige, .o-col::before { display:none; }
    .o-col { padding-top:0; }
  }
```

## Changement 2 — Navigation

Dans `index.html`, ligne 458, après `<a href="galerie.html">Catalogue</a>` ajouter
`<a href="#outils">Outils</a>`.
Dans `metier.html` (ligne ~202) et `formateurs.html` (ligne ~107), après la ligne Catalogue, ajouter
`<a href="index.html#outils">Outils</a>` avec la même indentation. Rien d'autre dans ces deux fichiers.

## Changement 3 — Retirer les deux bandeaux du haut de page

Supprimer les lignes 467 à 521 (les deux commentaires « BANNIÈRE … » et les deux `<aside>`), en
conservant leur texte exact pour le changement 7. La `<div class="accroche">` devient le premier
élément après `<div class="page" role="main" id="contenu" tabindex="-1">`.

## Changement 4 — Le chapô de l'accroche

Remplacer, à la ligne 528 :

```html
      <p class="chapo">Un plan, un fluide qui circule, des cours à chaque arrêt. Vous montez où vous voulez — <strong>gratuit, sans compte</strong>.</p>
```

par :

```html
      <p class="chapo">Un plan de métro par domaine, un fluide qui circule, des cours à chaque arrêt — et des logiciels libres pour l'atelier. Vous montez où vous voulez : <strong>gratuit, sans compte</strong>, projet personnel d'un enseignant frigoriste.</p>
```

Pastille, titre et boutons inchangés.

## Changement 5 — L'organigramme et les trois portes

Insérer entre la fin de `<div class="accroche">…</div>` et le commentaire `<!-- Le mot de l'auteur`.
Les QUATRE cartes Législation / HydroMétro / AéroRézo / ÉlectroRézo sont **coupées** de la grille du
bloc plan (lignes 665-700, chaque `<a href="…" style="--c:…">…</a>`) et **collées** telles quelles
à l'endroit marqué ci-dessous. Seule la carte thermo-techno est réécrite (son état « vous êtes ici »
n'a plus de sens loin du plan).

```html
  <!-- ===================================================================
       L'ORGANIGRAMME — la porte d'entrée (F. Henninot, 05/09/2026) :
       « la page d'accueil n'est pas compréhensible ; attaquer par
       l'organigramme, et dérouler le reste après ». Il REMPLACE la grille
       « Les cinq réseaux » qui vivait dans le bloc du plan (23-24/08) :
       mêmes cartes, mêmes couleurs, remontées au premier écran et
       complétées par deux branches — les outils et la formation.
       Les bandeaux AquiBlue / HoCourant, qui ouvraient la page depuis le
       24-25/08, descendent dans « Les outils inerWeb », après le plan :
       le haut de page porte le permanent, pas la nouveauté
       (docs/porte-entree-2026-09/PROPOSITION.md, § 2).
       =================================================================== -->
  <div class="orga" id="reseaux" aria-label="Tout ce que propose inerWeb.fr">
    <div class="o-racine">❄️ inerWeb.fr <small>tout ce que le site propose, en un coup d’œil</small></div>
    <div class="o-tige" aria-hidden="true"></div>
    <div class="o-rail" aria-hidden="true"></div>
    <div class="o-colonnes">

      <div class="o-col reseaux">
        <div class="o-tete">🚇 Les réseaux de cours <small>un plan de métro par domaine, un cours à chaque station</small></div>
        <div class="r-grille">
          <a href="#carte" style="--c:#0c4a6e">
            <span class="r-texte">
              <span class="r-nom">❄️ Le réseau thermo-techno</span>
              <span class="r-det">Le métier de frigoriste — 108 stations · 15 lignes, du glaçon au diagnostic</span>
              <svg class="r-ligne" viewBox="0 0 120 12" aria-hidden="true"><line x1="4" y1="6" x2="116" y2="6"/><circle cx="18" cy="6" r="4"/><circle cx="60" cy="6" r="4"/><circle cx="102" cy="6" r="4"/></svg>
            </span>
            <span class="r-etat">le cœur du métier</span>
            <span class="r-fleche" aria-hidden="true">▾</span>
          </a>
          <ul class="o-sous" aria-label="Les lignes du réseau thermo-techno">
            <li><b>Le cycle</b> : le tronc · les organes · ce qui se règle · la ligne liquide · les gestes</li>
            <li><b>Les fluides</b> : fluides &amp; environnement · le CO₂ · les centrales CO₂</li>
            <li><b>Le matériel</b> : la régulation · l’huile · le circuit d’huile · électrotech</li>
            <li><b>Se situer</b> : s’évaluer · la boîte à outils</li>
          </ul>
          <!-- ICI : les quatre cartes Législation, HydroMétro, AéroRézo, ÉlectroRézo,
               collées telles quelles depuis la grille du plan. -->
        </div>
      </div>

      <div class="o-col reseaux">
        <div class="o-tete">🧰 Les outils <small>des logiciels libres et gratuits, pour l’atelier et la salle</small></div>
        <div class="r-grille">
          <a href="aquiblue/" style="--c:#2f5689">
            <span class="r-texte">
              <span class="r-nom">📡 inerWeb AquiBlue</span>
              <span class="r-det">Les sondes Bluetooth tracent le cycle en direct sur le diagramme enthalpique</span>
            </span>
            <span class="r-etat">nouveau</span>
            <span class="r-fleche" aria-hidden="true">→</span>
          </a>
          <a href="hocourant/" style="--c:#2f5689">
            <span class="r-texte">
              <span class="r-nom">🔋 inerWeb HoCourant</span>
              <span class="r-det">Se préparer à l’habilitation électrique, de B0 à BR</span>
            </span>
            <span class="r-etat">prototype</span>
            <span class="r-fleche" aria-hidden="true">→</span>
          </a>
          <a href="#outils" style="--c:#2f5689">
            <span class="r-texte">
              <span class="r-nom">🧊 inerWeb Fluide</span>
              <span class="r-det">La traçabilité des fluides frigorigènes — CERFA, registre, bilan</span>
            </span>
            <span class="r-etat">bêta-test</span>
            <span class="r-fleche" aria-hidden="true">▾</span>
          </a>
        </div>
      </div>

      <div class="o-col reseaux">
        <div class="o-tete">📋 La formation habilitation <small>attestation fluides A1 · A2 · D · E</small></div>
        <div class="r-grille">
          <a href="formation.html" style="--c:#1e7e54">
            <span class="r-texte">
              <span class="r-nom">L’application de formation</span>
              <span class="r-det">La semaine complète : <span data-ch="fiches">44</span> fiches, <span data-ch="questions">269</span> questions, examens blancs</span>
            </span>
            <span class="r-fleche" aria-hidden="true">→</span>
          </a>
          <a href="formation.html?carte=ex-pos" style="--c:#1e7e54">
            <span class="r-texte">
              <span class="r-nom">🎯 Le positionnement</span>
              <span class="r-det">Où j’en suis, avant tout</span>
            </span>
            <span class="r-fleche" aria-hidden="true">→</span>
          </a>
          <a href="formateurs.html" style="--c:#1e7e54">
            <span class="r-texte">
              <span class="r-nom">🎓 Formateurs et enseignants</span>
              <span class="r-det">Projeter en cours, ouvrir une séance, demander un accès aux documents</span>
            </span>
            <span class="r-fleche" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

    </div>
  </div>

  <!-- PAR OÙ COMMENCER — trois portes (F. Henninot, 05/09/2026 : « le
       positionnement arrive trop tard, il devrait être une porte d'entrée
       au niveau de Départ »). La deuxième porte ouvre la station
       Positionnement du plan, pas un autre test : plusieurs portes vers
       la même chose. La troisième mène au champ « Chercher un cours »,
       en tête du plan. -->
  <h2 class="portes-titre">Par où commencer ?</h2>
  <div class="portes">
    <a class="porte" href="metier.html">
      <span class="p-ico" aria-hidden="true">🚉</span>
      <span class="p-titre">Je découvre</span>
      <span class="p-det">Départ, aucun prérequis : c’est quoi, frigoriste ? Puis le premier cours, du glaçon au circuit.</span>
    </a>
    <a class="porte forte" href="formation.html?carte=ex-pos">
      <span class="p-ico" aria-hidden="true">🎯</span>
      <span class="p-titre">Je me situe</span>
      <span class="p-det">Le positionnement — où j’en suis, avant tout. Quelques minutes, et le plan vous dit où monter.</span>
    </a>
    <a class="porte" href="#carte">
      <span class="p-ico" aria-hidden="true">🔎</span>
      <span class="p-titre">Je cherche un cours</span>
      <span class="p-det">Un mot — surchauffe, manifold, huile — dans « Chercher un cours », en tête du plan.</span>
    </a>
  </div>

```

## Changement 6 — Le bloc du plan

- Supprimer le commentaire « LES TROIS RÉSEAUX … » (lignes 644-652) et tout le
  `<div class="reseaux"> … </div>` (653-702) : les cartes vivent maintenant dans l'organigramme.
  Le commentaire « CHERCHER UNE STATION » et le champ de recherche deviennent les premiers
  éléments après le `titre-bloc`.
- Ligne 641 : `<h2>Le plan de formation</h2>` devient `<h2>Le plan de formation thermo-techno</h2>`.

## Changement 7 — Le bloc « Les outils inerWeb », entre le plan et la liste

Insérer juste avant `<!-- Le réseau EN LISTE : la même donnée que le plan, …` (ligne 732). Les deux
`<aside>` sont ceux retirés au changement 3, **collés tels quels** (leurs deux commentaires
« BANNIÈRE … » d'origine peuvent être gardés au-dessus de chacun). Le troisième bandeau est nouveau.

```html
  <!-- ===================================================================
       LES OUTILS inerWeb (05/09/2026). Les bandeaux AquiBlue et HoCourant
       ouvraient la page depuis le 24-25/08 (F. Henninot : « je voulais qu'on
       la voie en première ligne ») ; ils descendent ici à sa demande du
       05/09 : l'accueil s'ouvre sur l'organigramme, et chaque logiciel garde
       trois portes — sa carte dans l'organigramme, ce bloc, le journal.
       Le troisième bandeau, inerWeb Fluide, reprend l'appel aux
       bêta-testeurs du volet « Infos » : même gabarit, un logiciel de plus.
       =================================================================== -->
  <section class="bloc outils" id="outils" aria-labelledby="titre-outils">
    <div class="titre-bloc">
      <h2 id="titre-outils">Les outils inerWeb</h2>
      <span>Des logiciels libres et gratuits pour l’atelier et la salle — démonstration en ligne, sans installation.</span>
    </div>
    <div class="corps">

      <!-- ICI : l'aside AquiBlue, tel quel (changement 3). -->

      <!-- ICI : l'aside HoCourant, tel quel (changement 3). -->

      <aside class="bandeau-aquiblue bandeau-fluide" aria-label="inerWeb Fluide">
        <svg class="ba-logo" viewBox="0 0 250 50" role="img" aria-label="inerWeb Fluide">
          <text fill="#1b3a63" font-size="28px" x="4" y="34">❄️</text>
          <text fill="#1b3a63" font-family="Trebuchet MS, Trebuchet, sans-serif" font-size="26px" font-weight="bold" x="44" y="32">iner</text>
          <text fill="#1b3a63" font-family="Segoe Script, Brush Script MT, cursive" font-size="26px" x="94" y="32">Web</text>
          <line stroke="#e8914a" stroke-width="2" x1="44" x2="150" y1="35" y2="35"/>
          <rect fill="#e8914a" x="155" y="10" rx="5" ry="5" width="86" height="24"/>
          <text fill="#ffffff" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="14px" font-weight="bold" x="198" y="27" text-anchor="middle">Fluide</text>
        </svg>
        <p class="ba-texte"><strong>inerWeb Fluide — la traçabilité des fluides frigorigènes.</strong>
          CERFA, registre, bilan : le logiciel cherche des centres de formation et des professionnels
          pour l’essayer avant sa sortie. Démonstration en ligne, présentation en deux pages.</p>
        <div class="ba-boutons">
          <a class="bouton" href="https://frigorx.github.io/-inerweb-fluid-cerfa-fi-bsd-4/v8/" target="_blank" rel="noopener">Essayer la démonstration</a>
          <a class="bouton creux" href="presentation-inerweb-fluide.pdf" target="_blank" rel="noopener">Présentation (PDF)</a>
          <a class="bouton creux" href="mailto:inerweb.fh@gmail.com?subject=B%C3%AAta-test%20inerWeb%20Fluide">Se proposer comme bêta-testeur</a>
        </div>
      </aside>
    </div>
  </section>

```

## Changement 8 — Le journal des nouveautés

- Ligne 577 : dans le `<summary>`, « dernière mise à jour : 28 août 2026 » devient
  « dernière mise à jour : 5 septembre 2026 ».
- Juste après `<div class="nv-corps">` (ligne 578), avant `<h3>28 août 2026</h3>`, insérer :

```html
      <h3>5 septembre 2026</h3>
      <ul>
        <li><span class="nv-etiq nv-neuf">nouvelle porte d’entrée</span><a href="#reseaux">L’accueil s’ouvre sur l’organigramme</a>
          <span class="d">— ce que propose le site, en un coup d’œil : les cinq réseaux de cours, les outils, la formation habilitation. Puis trois portes : « Je découvre », « Je me situe » (le positionnement, désormais au niveau du départ) et « Je cherche un cours ».</span></li>
        <li><span class="nv-etiq">déplacement</span><a href="#outils">Les outils inerWeb</a>
          <span class="d">— AquiBlue, HoCourant et inerWeb Fluide sont regroupés dans un bloc sous le plan ; les deux premiers ouvraient la page jusqu’ici.</span></li>
      </ul>

```

## Contrôles à faire par l'agent, puis rapport

1. `cd C:\git\pilote-fluides && node outils/controle-syntaxe.mjs` → doit passer.
2. `node build/plan-liste.mjs` → puis `git diff --stat` : seuls `index.html`, `metier.html`,
   `formateurs.html` (et les fichiers déjà modifiés `REPRISE.md`, `docs/…`) doivent apparaître ;
   si la liste générée ou le JSON-LD a bougé, le signaler (ce serait un défaut).
3. Liens : `grep -oE 'href="[^"]+"' index.html | sort -u` comparé à la liste d'avant
   `%SCRATCH%\hrefs-avant.txt` (chemin donné dans le message de lancement) : tout lien d'avant
   doit être encore présent. Lister les liens nouveaux.
4. Rapport (≤ 40 lignes) : ce qui a été fait changement par changement avec les numéros de
   lignes finaux, la sortie des deux scripts, le résultat du contrôle des liens, et tout doute.

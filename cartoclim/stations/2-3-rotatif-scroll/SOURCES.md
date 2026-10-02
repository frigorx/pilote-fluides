# Sources — 2.3 Rotatif et scroll : les compresseurs de la clim

## Photographies (`assets/biblio/`)
- `a3fdab605a.jpeg` — compresseur rotatif de split, avec sa bouteille d'aspiration. Trouvé dans
  `03_BAC-MFER/S2-Systemes/sq2 se 1tp 1 CLIM FRIOD SEUL SPLIT corection.docx` (même document que la station 3.2).
  Aucun filigrane, aucun cadre de site ; une plaque constructeur à peine lisible sur la coque (objet réel).
- `166fe7fd3f.jpeg` — compresseur scroll en coupe (coque, moteur, spirales). Trouvé dans
  `03_BAC-MFER/S2-Systemes/Techniques du froid et composants frigorifiques.pdf`. Aucun logo visible.

Trouvées par `node outils/chercher-images.mjs "compresseur scroll rotatif hermétique climatisation" --photo`
puis `"compresseur scroll spirale coupe"`, `"compresseur rotatif à palette coupe rouleau"` et
`"compresseur hermétique rotatif noir tubes cuivre"`. Les images sont petites (223×226 et 300×400) : celles de la base.
Écartées : les photos de produit portant la marque en grand (compresseurs Copeland Scroll, bandeau « Copeland Scroll »
avec logo), un compresseur à piston Maneurop (hors sujet), un schéma de document scanné mêlant piston et rotatif
(page d'un tiers), les cutaways à vis, les plans cotés d'un groupe de condensation.

## Symboles (`assets/`)
- `compresseurrotatif.svg`, `compresseurscroll.svg` — copiés tels quels de `assets/symboles/` (bibliothèque inerWeb,
  collection QElectroTech, CC BY 3.0). Rien n'a été redessiné.

## Les deux dessins du temps 2 et le récapitulatif (`scenes.js`)
Tracés par le programme, aucune image reprise. Le scroll est calculé : deux spirales identiques (développantes
de cercle), la mobile tournée d'un demi-tour et décalée de l'orbite ; les poches fermées sont celles que bornent
les points de contact réels des deux parois. Le rotatif : cylindre, rouleau excentré, palette dont la pointe suit
le rouleau, chambres calculées par la géométrie. Les proportions sont celles d'un schéma, pas d'un compresseur réel.

## Ce que dit le texte, et d'où ça vient
- Rôle (aspirer un gaz froid, refouler un gaz chaud sous haute pression ; ne fabrique pas le froid) : module
  « Compresseur frigorifique » (Thermo-techno, https://inerweb.fr/packs/fluides/res/module-compresseur/) ;
  HabFluide ch. 9 « Le compresseur ».
- Scroll (spirale fixe, spirale mobile qui orbite, poches du pourtour vers le centre, très silencieux, sensible aux
  coups de liquide, très répandu en climatisation et PAC) : module-compresseur ; HabFluide ch. 9 ; animations de
  compresseurs du fonds (`animations-compresseurs-piston-scroll-vis-rotatif.html`).
- Rotatif (rouleau excentré, palette, ressort, compact, usure des palettes, petits climatiseurs et monoblocs) :
  module-compresseur ; planche « Le compresseur — principe et technologies » ; mêmes animations.
- Coque hermétique (moteur et compresseur enfermés, aucun arbre ne sort, coque non ouvrable, non réparable) :
  HabFluide ch. 9.
- Huile (lubrifie, refroidit, étanche en interne, circule avec le fluide et doit revenir ; niveau au voyant, pente
  et siphons de reprise d'huile) : HabFluide ch. 9 et ch. 11 ; cours habilitation G6 « compresseurs » §5.
- Coup de liquide (un compresseur comprime du gaz, jamais du liquide ; surchauffe trop faible = risque ;
  bouteille anti-coup de liquide sur l'aspiration) : planche « On ne comprime pas un liquide — le coup de liquide » ;
  planche « Quatre compresseurs, une même fonction » ; cours habilitation G8 ; HabFluide ch. 12.
- Plots antivibratiles, plaque signalétique, protections réglées selon la fiche du constructeur, jamais à l'estime :
  HabFluide ch. 9 « La valeur plaque, jamais un chiffre inventé ».
- Piston « partout en froid commercial » et vis « grandes puissances » : planche « Le compresseur — principe et
  technologies ».
- Lien vers la planche « Quatre compresseurs, une même fonction » :
  https://inerweb.fr/packs/fluides/res/svg/compresseurs-comparatif.svg (fichier présent dans le dépôt du site).
  Elle n'est pas reprise ici, seulement citée.

## Valeurs omises, faute de source
Aucune pression, température, intensité, puissance, rapport de compression ou nombre de tours n'est donné.
Omis aussi : le sens de rotation imposé à un scroll triphasé et le rôle de la résistance de carter (aucun texte du
fonds ne les établit).

## Réserve
Les documents cités appartiennent à leurs auteurs. Ils sont employés ici à des fins pédagogiques, avec
citation, en prototype. Toute image signalée sera remplacée.

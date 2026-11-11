# Libellés clairs, 11/11/2026

Branche `libelles-clairs` (depuis main 384f6b7c4). Rien publié, `build/version.mjs` non lancé.

## Ce qui a changé
- `mon-parcours/index.html` : « CAP et titre professionnel » (niveau 3 en petit), « Bac pro et brevet professionnel » (niveau 4 en petit). Étape « Ma formation », phrase d'introduction adaptée. Adresses `#niveau=`, `#diplome=` et `donnees-parcours.js` intacts.
- `portes.html` : titre et vignette de « Habilitations et sécurité » mènent à `index.html#habilitation`. Le diaporama `habilitations/` devient un bouton : « Diaporama de présentation, pour une direction ». Le bouton « Le catalogue » de la porte Pour la classe devient « Animations, cours interactifs et planches ». Menu du haut (ligne 158) non touché.
- `galerie.html` et `build/galerie.mjs` (même correction dans la source) : titre et h1 « Animations, cours interactifs et planches du froid », ligne « Froid et climatisation ». La page couvre en réalité des cours interactifs, capsules, films narrés, frises et planches SVG, pas seulement les fluides frigorigènes.

## Contrôles
- Servi sur 8792 : portes, galerie, mon-parcours, `controle-telephone.cjs` : aucun bloquant.
- `controle-style.py` : 0 « à réécrire » sur portes et mon-parcours. galerie.html : 1 « à réécrire » (« AVANT » en capitales, ligne 1731), texte d'une ressource déjà présent sur main, hors périmètre.

## Pour décision de Franck (libellés qui n'annoncent pas leur page)
| Libellé | Mène à | Proposition |
|---|---|---|
| Menu du haut « Catalogue » (decouvrir, formateurs, metier, plan, portes, reseaux) | galerie.html | « Animations et planches ». Menu non touché, à voir avec le chat des hauts de page. |
| « Fluides frigorigènes » (porte Habilitations) et « inerWeb Pilote » (porte Logiciels) | formation.html, titrée « inerWeb Pilote, démonstrateur » | Deux libellés pour une page. Garder « Fluides frigorigènes » et titrer la page « Préparer l'habilitation fluides frigorigènes ». |
| « Électrique, HoCourant » et « Hauteur, R408 » | hocourant/, r408/ | « Habilitation électrique » et « Travail en hauteur » (le nom du logiciel en petit). |
| « Thermo-techno » | plan.html, titrée « Le plan du réseau thermo-techno » | « Le plan du réseau ». |
| « Comment ça marche » (porte Bureau d'études) | bureau-etudes/#mode-emploi | « Mode d'emploi du bureau d'études ». |
| « Découvrir inerWeb » (porte Pour la classe) | decouvrir.html, titrée « le parcours enseignant » | « Parcours enseignant ». |
| « Préparer ma séance » | formateurs.html, titrée « Espace formateurs » | Aligner : « Espace formateurs ». |
| « Le métier » | metier.html, « Le métier de frigoriste » | « Le métier de frigoriste ». |
| « JouéRézo », « SimuRézo », « RézoTools », « CartoClim » | leurs dossiers | Noms de marque : acceptable, la précision après la virgule suffit. |
| portail.html « Habilitation fluides frigorigènes, dossier de présentation » | page jumelle de habilitations/ | À clarifier avec le diaporama, ou la retirer des liens. |

# Findings — refonte « fond et forme » d'inerweb.fr, 17/09/2026

## État de départ (mesuré le 17/09 au matin)
- `main` = `origin/main` (rien à pousser, rien à tirer) ; 3 fichiers modifiés non commités : le reste
  du lot G du 13/09 (`diagramme-enthalpique/index.html` + `src/hub-shell.html` : plan-donnees + suivant.js,
  et le gabarit rattrape `support-appareil`) et la note de session 2 de `amelioration-2026-09/progress.md`.
- `controle-syntaxe` : 521 pages, 1 erreur antérieure (`module-compresseur/document-eleve-compresseur.html:300`).
- En ligne : `https://inerweb.fr/` en 200, 160 703 octets, titre « inerWeb Édu — apprendre le froid,
  station par station » ; `sitemap.xml` = 10 adresses ; `robots.txt` = tout autorisé.
- Catalogue (15/09) : 281 stations en 10 réseaux ; niveaux renseignés sur 87, codes sur 60.
- Hébergement : GitHub Pages + Cloudflare (DNS, cache 4 h sur les scripts) ; OVH = domaine + courriel.
  Publication = `outils/publier-le-site.bat` (push, attente 120 s, curl, puis catalogue + index RAG).

## Ce qui reste de l'audit du 12/09 (§ 8) au 17/09
| Piste | État |
|---|---|
| 1 voix AéroRézo · 2 commande vocale · 3 lecteurs · 4 mise en page · 6 mode prof (sauf ÉlectroRézo) | faits, en ligne le 13/09 |
| 9 station suivante | brique `moteur/suivant.js` + 50 pages, à vérifier et commiter (ce chat) |
| 5 texte des voix | non fait — toute narration modifiée = MP3 edge-tts = feu vert service tiers |
| 7 charte commune aux réseaux | non commencé — le gros de la « forme » |
| 8 stations minces | non fait |
| 10 mentions « brouillon / prototype » | décision de F. Henninot |
| réseaux phase 2 (barre commune) et 3 (pages de réseau) | non faites ; décision ouverte « Ce qui se règle » |
| mode prof ÉlectroRézo · narrations KVR/NRD · ligne Principes HydroMétro | non faits (edge-tts pour les deux derniers) |

## Outillage posé le 17/09
- `outils/sonder-rendu.mjs` : Playwright (canal Chrome du poste, le navigateur téléchargé de
  `hydrometro` manque : 1234 attendu, 1228 présent ; `PLAYWRIGHT_BROWSERS_PATH=C:\Hermes\pw-browsers`),
  SW bloqué, 3 largeurs, mesures + captures → `mesures/`.
- `outils/liste-pages.json` : 27 pages témoins (6 pages du site, 6 têtes de réseau, 15 stations).
- Serveur local : `python -m http.server 8791 --directory C:/git/pilote-fluides`, lancé par un
  `launch.json` **temporaire** posé dans `CLAUDE-ESPACE-TRAVAIL\.claude\` (à retirer en fin de session ;
  le dépôt a le sien, sans `--directory`, utilisable quand la session vit dans le dépôt).

## Pièges connus (repris des REPRISE)
- `sed -i` sous Git Bash convertit CRLF → LF ; le dépôt mélange les deux (autocrlf). Préférer node.
- Ne jamais lancer `build/build.mjs` sans avoir réconcilié `src/hub-shell.html` du diagramme (fait par
  le reste du lot G) ; deux erreurs de console préexistantes : film Ozone (`react-dom`), HydroMétro Débit (`titles`).
- Cloudflare garde 4 h les scripts sous une clé `?v=` : sonder à clé aléatoire d'abord.
- La console en ligne porte 4 erreurs `email-decode.min.js` (option Cloudflare), hors code.

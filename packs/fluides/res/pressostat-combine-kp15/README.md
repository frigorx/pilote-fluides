# Pressostat combiné HP/BP (exemple : Danfoss KP15)

Page refaite le 13/11/2026 sur le socle commun `../_pressostats-commun/` (voir son `README.md`).

| Fichier | Rôle |
|---|---|
| `index.html` | Balises pour Google, réponse en haut de page, exemple chiffré, limites, auteur et date. |
| `page.js` | Données du cours : valeurs de l'exemple, écrans, questions, sources. Les narrations sont dans le champ `narration`. |
| `SOURCES-METIER.md` | D'où vient chaque valeur. |
| `couverture.json` | Codes du référentiel par écran, lus par `moteur/referentiel.js` et le build. À valider par F. Henninot. |
| `manifest.json` | Version et nombre d'écrans. |
| `assets/symboles/` | Symboles de l'ancienne page, gardés. La page ne les charge plus. |

Version suivie d'un bout à l'autre : BP à réarmement automatique, HP à réarmement manuel (code 060-126466).

Voix : les narrations ont été réécrites le 13/11/2026. Tant qu'elles ne sont pas réenregistrées (`build/voix`), elles sont lues par la voix du navigateur.

Contrôles : `node ../_pressostats-commun/tests/parcours.cjs <adresse>`, `node C:/git/usine-contenu/outils/controle-telephone.cjs <adresse>`, `python C:/git/usine-contenu/outils/controle-style.py page.js`.

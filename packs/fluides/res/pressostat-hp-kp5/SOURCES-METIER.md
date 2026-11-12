# Sources métier : pressostat HP (exemple Danfoss KP5)

Refonte du 13/11/2026. Chaque valeur de la page vient d'un des documents ci-dessous. Une valeur qui n'y figure pas ne s'écrit pas dans la page. Aucun logo, aucune image, aucun extrait de notice n'est repris.

## 1. Danfoss (appareil pris en exemple)

| Sigle | Document | Référence | Adresse |
|---|---|---|---|
| FD | Fiche de données « Pressure switch, Type KP » | AI213186439478en-001203, 2022.09 | https://assets.danfoss.com/documents/207508/AI213186439478en-001203.pdf |
| NI-KP1 | Guide d'installation « Pressure switch KP 1, 1W, 1A, 2, 4, 5, 5A, 6, 7 » | AN211886440281en-000704, 2024.10 | https://assets.danfoss.com/documents/464307/AN211886440281en-000704.pdf |

| Valeur de la page | Source |
|---|---|
| Plage 8 à 32 bar | FD, tableau des codes |
| Version à réarmement manuel : différentiel fixe 3 bar (code 060-117366) | FD, tableau des codes |
| Version automatique : différentiel 1,8 à 6 bar réglable | FD, tableau des codes |
| La vis de plage règle la coupure ; réarmement manuel possible à coupure − différentiel | FD p. 4 « Setting » |
| Un tour de la vis de plage : 2,3 bar | FD p. 4 |
| Bornes 1, 2, 4 : 1 arrivée, 1–2 vers le moteur, s'ouvre quand la pression monte, 1–4 signal | NI-KP1 p. 2, FD p. 3 |
| Contact : 16 A sous 400 V (AC1, AC3), 10 A sous 400 V (AC15) | NI-KP1 p. 2 |
| Pression de service maximale 35 bar | NI-KP1 p. 1 |
| Température ambiante −40 à 65 °C ; raccord flare 1/4 de pouce (6 mm) | FD p. 2 et 4 |
| Levier d'essai manœuvré avec les doigts, jamais au tournevis | NI-KP1 p. 2 |

## 2. Fonds de l'auteur

| Valeur ou geste de la page | Document du fonds |
|---|---|
| Essai : arrêter le ventilateur du condenseur ou obturer le passage de l'air, noter la coupure, attendre la baisse, réarmer | « PROCEDURE REGLAGE PRESSOSTAT HP SECURITE.docx » |
| Choix de la coupure : température maximale du lieu + 10 °C + 10 °C ; elle dépend du fluide, du condenseur et du lieu | même document |
| Causes d'une HP trop haute : condenseur encrassé, ventilateur du condenseur en défaut ; emploi en régulation du ventilateur | « Le pressostat HPet BP prof.docx » |

Écart signalé à l'auteur : la procédure donne « 55 °C soit 15 bar effectif au R134a ». Le calcul (CoolProp, 12/11/2026) donne 14,9 bar absolus, soit 13,9 bar au manomètre. La page écrit 13,9 bar et règle 14 bar.

## 3. Autres fabricants

| Ligne du tableau | Document du fabricant |
|---|---|
| Ranco O16, modèles HP : 8 à 32 bar ; différentiel 2 à 6 bar réglable (O16-R6750), 2 bar fixe en manuel (O16-R6751) | Robertshaw, fiche « Pressure Controls O Series », 150-3012, 11/25 |
| Alco (Copeland) PS1 : 6 à 31 bar (code 5), autres plages ; différentiel réglable, fixe en manuel ; bornes 1, 2, 4 | Copeland Europe, « Operating instructions, Pressure Controls Series PS1 / PS2 », P/N 0715180 Rev13, 28.11.2024 |

Le repérage des bornes du Ranco O16 récent n'a été trouvé dans aucune notice : la page renvoie à la notice du modèle. Détail : `PROJET-VISIBILITE\nuit\AUTRES-MARQUES.md`.

Le sens de rotation des vis ne se lit pas avec certitude sur la notice : la page ne le donne pas.

## 4. Ce que la page ne traite pas (à compléter par l'auteur)

- Les pannes du pressostat lui-même (capillaire percé ou bouché, soufflet fatigué, contacts collés) : rien dans le fonds ni dans les notices lues.
- Les codes du référentiel affichés (repris de l'ancienne page, « à valider »).

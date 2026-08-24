# Station « Montréal → Kigali » — FOND

> Réseau Législation · sous-ligne Impact environnemental · niveau BTS.
> Mini-station ≤ 10 min : 8 écrans + 4 questions.
> **Statut : station construite le 24/08/2026 (contenu, HTML, 8 SVG). PROTOTYPE non relu**
> — `data-prototype` posé sur `marque.js`, comme demandé. Aucune validation métier n'a
> encore eu lieu.
>
> Gabarit copié structurellement depuis `aptitude-capacite/index.html`. `styles.css` et
> `app.js` sont une **copie littérale, byte pour byte**, du socle commun de
> `aptitude-capacite` — vérifié par `diff`, aucune différence. La variable `--sous-ligne`
> y reste `#0f766e` : ce sont des fichiers partagés au réseau, pas propres à cette station.
> Les 8 illustrations SVG, elles, utilisent l'accent propre à la sous-ligne **Impact
> environnemental**, `#047857` (cohérent avec `legislation/index.html`, ligne 363).

## Ce qui fait l'intérêt de cette station

Un protocole conçu en 1987 pour sauver la couche d'ozone qui se retrouve, presque
quarante ans plus tard, à traiter du réchauffement climatique — sans changer de nom ni
de charte fondatrice, par simple amendement. C'est un mécanisme, pas une frise à
apprendre par cœur : chaque étape répond au problème laissé ouvert par la précédente.

## Objectif

À la fin de la station, l'élève de BTS sait expliquer pourquoi le protocole de Montréal
a d'abord visé les CFC puis les HCFC, pourquoi les HFC les ont remplacés, quel nouveau
problème ces HFC ont posé malgré un ozone sauvé, ce que change l'amendement de Kigali,
et pourquoi ce cheminement est notable — avec le lien vers F-Gaz 3, le règlement
européen du même réseau qui applique la même logique de réduction des HFC.

## Écran 1 — Trois temps, un seul protocole

Vue d'ensemble : Montréal (1987, ozone) → le relais des HFC (ozone réglé, climat en
question) → l'amendement de Kigali (climat). Aucune date sauf 1987.

*Visuel : `svg/frise-trois-temps.svg` — trois cases reliées par des flèches, couleurs
encre/ambre/vert, bande du bas rappelant que Kigali s'ajoute à Montréal.*

## Écran 2 — Montréal, 1987 : le problème de l'ozone

Traité international signé en 1987. Cible : des molécules contenant du chlore ou du
brome, qui attaquent l'ozone stratosphérique. D'abord les CFC, supprimés
progressivement, puis les HCFC.

*Visuel : `svg/montreal-1987.svg` — schéma de l'atmosphère (soleil, couche d'ozone
amincie, molécules Cl/Br qui montent) + document du protocole listant les deux cibles
dans l'ordre.*

## Écran 3 — Les HFC prennent le relais

Les HFC remplacent les CFC/HCFC parce qu'ils ne contiennent ni chlore ni brome : ODP
nul, le problème de l'ozone est réglé pour eux.

*Visuel : `svg/relais-hfc.svg` — carte CFC/HCFC barrée en rouge → carte HFC encadrée en
vert avec coche, « ODP nul ».*

## Écran 4 — Mais un nouveau problème apparaît

Beaucoup de HFC ont un PRP élevé : ozone réglé, climat pas. Repères chiffrés (valeurs
admises comme sûres) : CO₂ (R-744) = 1, R-32 = 675, R-410A = 2088, R-404A = 3922.

*Visuel : `svg/nouveau-probleme-prp.svg` — badge « HFC, ODP nul » + graphique en barres
horizontales des quatre PRP repères, la barre du CO₂ quasi invisible à l'échelle pour
souligner l'écart de grandeur.*

## Écran 5 — L'amendement de Kigali

Un amendement AU protocole de Montréal (pas un nouveau traité), qui s'attaque à son
tour aux HFC — cette fois pour leur PRP, et non plus pour leur ODP.

*Visuel : `svg/amendement-kigali.svg` — document « Protocole de Montréal » avec une note
agrafée par un trombone, « Amendement de Kigali », pointant vers la nouvelle cible.*

## Écran 6 — Pourquoi c'est notable

Un protocole né pour l'ozone qui se met, avec Kigali, à traiter du climat. F-Gaz 3
(règlement européen, même sous-ligne) applique cette même logique à l'échelle de
l'Union européenne.

*Visuel : `svg/ozone-vers-climat.svg` — le protocole se ramifie en deux objectifs
(ozone / climat), une ligne pointillée relie la branche climat à une case F-Gaz 3.*

## Écran 7 — Le raisonnement : quatre situations de terrain

Angle réutilisé du gabarit (quatre cartes numérotées), avec un contenu propre à cette
station — distinct des 4 questions du quiz :
1. Remplacer un vieux CFC → le repérer au chlore, viser un fluide sans chlore ni brome.
2. Machine à HFC PRP élevé → conforme ozone, sous surveillance climat (Kigali/F-Gaz 3).
3. Choisir un fluide à faible PRP (CO₂, propane, ammoniac) → anticipe la suite.
4. Étiquette HCFC → fluide encore visé par Montréal, en retrait progressif.

*Visuel : `svg/quatre-situations.svg` — quatre cartes, motif en grille 2×2.*

## Écran 8 — Bilan et le mécanisme

Rappel des trois temps + la phrase de synthèse : ODP réglé par Montréal → PRP resté
ouvert → Kigali s'en charge. Lien final vers F-Gaz 3.

*Visuel : `svg/bilan-montreal-kigali.svg` — trois cases reliées par des flèches, coches
vertes/alerte ambre, bande de synthèse.*

## Les 4 questions (quiz)

**Q1.** Que visait le protocole de Montréal (1987) ?
- a) Lutter contre le réchauffement climatique
- b) Protéger la couche d'ozone, en supprimant progressivement les CFC puis les HCFC ✔
- c) Réduire l'inflammabilité des fluides frigorigènes
- d) Améliorer l'efficacité énergétique des appareils
*Explication : Montréal vise l'ozone, pas le climat (c'est Kigali, plus tard) ; ni
l'inflammabilité ni l'efficacité énergétique ne sont l'objet de ce protocole.*

**Q2.** Pourquoi les HFC ont-ils remplacé les CFC et les HCFC ?
- a) Parce qu'une norme européenne l'imposerait
- b) Parce qu'ils seraient moins chers à produire
- c) Parce qu'ils n'auraient aucun PRP
- d) Parce qu'ils ne contiennent ni chlore ni brome : leur ODP est nul, ce qui réglait
  le problème de l'ozone ✔
*Explication : c'est l'absence de chlore/brome qui règle l'ozone, pas une norme
européenne (confusion avec F-Gaz) ni un critère de coût ; les HFC ont bien un PRP,
souvent élevé.*

**Q3.** Quel nouveau problème les HFC ont-ils créé, malgré un ODP nul ?
- a) Ils détruiraient l'ozone plus fortement que les CFC
- b) Beaucoup ont un PRP élevé, donc un fort impact sur le réchauffement climatique
  s'ils fuient ✔
- c) Ils n'auraient strictement aucun impact environnemental
- d) Ils seraient aujourd'hui interdits partout dans le monde sans exception
*Explication : les HFC ne détruisent pas l'ozone (pas de chlore/brome) ; ils ne sont pas
sans impact (PRP) ; l'interdiction totale sans exception ne correspond pas à un
dispositif construit comme une réduction progressive.*

**Q4.** Qu'est-ce que l'amendement de Kigali ?
- a) Un traité entièrement nouveau, sans lien avec Montréal
- b) Un texte qui ne concernerait que les CFC
- c) Un amendement au protocole de Montréal qui s'attaque à son tour aux HFC, cette fois
  pour leur PRP ✔
- d) Le nom du règlement européen F-Gaz 3
*Explication : Kigali s'ajoute à Montréal, il vise les HFC (pas les CFC, déjà traités) ;
F-Gaz 3 est l'outil européen qui applique une logique proche, mais Kigali est l'accord
international — pas le même texte.*

Vignettes de rappel réutilisées : Q1 → écran 2 (montreal-1987.svg), Q2 → écran 3
(relais-hfc.svg), Q3 → écran 4 (nouveau-probleme-prp.svg), Q4 → écran 5
(amendement-kigali.svg).

## Maillage (correspondances de la station)

- **F-Gaz 3** (même sous-ligne) — lien réel vers `../fgaz-3/` : le règlement européen qui
  applique la même logique de réduction progressive des HFC.
- **La RE2020** (sous-ligne Thermique) — en préparation, sans lien.
- **NF EN 378** (même sous-ligne) — en préparation, sans lien.

## À sourcer (ne PAS écrire dans le HTML tant que non vérifié)

- **Année de l'amendement de Kigali** — non sourcée dans ce chantier.
- **Année de fin (ou jalons) du phase-down des HFC** décidé par Kigali — non sourcée.
- **Date d'entrée en vigueur de l'amendement de Kigali** — non sourcée.
- Ces trois points sont volontairement absents du HTML : seule la date 1987 (protocole
  de Montréal) est écrite, conformément à la consigne. Le mécanisme (ODP réglé, PRP visé
  ensuite par Kigali) est enseigné sans dépendre de ces dates.

## Ce qui reste à trancher avant diffusion

1. **Relecture métier** — la station est un prototype (`data-prototype`), aucun feu vert
   de F. Henninot n'a encore été demandé pour ce fond.
2. **Sourcer les trois dates listées ci-dessus** si l'on veut un jour les ajouter à
   l'écran 5 ou 6 — seulement depuis un texte réglementaire vérifié, jamais de mémoire.
3. **Voix** : aucun audio n'est fabriqué ; la station parle avec la voix du navigateur.
   Fabrication Piper (locale) à faire après validation du fond, comme sur les autres
   stations du réseau.
4. **Lien vers une future station « PRP & ODP »** (annoncée dans `legislation/index.html`,
   ligne 363, sous-ligne Impact environnemental elle aussi) : le dossier n'existe pas
   encore, donc aucun lien n'a été posé ici — seulement une mention textuelle à l'écran 4.
   À revoir quand cette station ouvrira.

# Station « Qui intervient sur une installation frigorifique ? » — FOND à valider

> Réseau Législation · sous-ligne Fluidique & thermique (#0f766e) · slug `acteurs-installation`.
> Mini-station ≤ 10 min : 8 écrans + 4 questions. **Public : CAP IFCA et Bac Pro MFER** (le réseau est né au niveau BTS : texte plus simple, phrases courtes).
> **Statut : Prototype, fabriquée le 19/10/2026, EN ATTENTE de la relecture et du feu vert de F. Henninot** (`data-prototype` posé).
> Demande de Franck (19/10/2026) : « Les intervenants, je pense que c'est un gros manque, dans le réseau Législation […] il faut déjà nommer tous les acteurs et préciser leurs responsabilités et leurs devoirs vis-à-vis des installations frigorifiques et de la sécurité, et faire un petit jeu de qui fait quoi [dans JouéRézo]. »
> Ligne maison : les mécanismes s'apprennent ; toute valeur non lue dans un texte officiel est omise et listée sous « À sourcer ».
> Rubrique « ce que vous lui devez » (informer, faire signer, transmettre) : **pratique de chantier proposée**, sauf là où un article est cité. À valider par Franck.

## Objectif

À la fin de la station, l'élève sait nommer les onze acteurs d'une installation frigorifique. Pour chacun, il sait dire ce qu'il fait, de quoi il répond (l'installation, le fluide, la sécurité) et ce qu'il lui doit : l'informer, lui faire signer un papier ou lui transmettre une copie.

## Référentiel (codes affichés sous l'objectif et dans `mission.json`)

Libellés exacts repris de `HAL-v3/donnees/referentiels/peda/` (CAP_IFCA.json, BAC_MFER_2028.json, 2nde_TNE.json).

- **CAP IFCA** : savoir **S1.1** « Les intervenants » · compétence **C1.2** « Communiquer avec les différents acteurs » · tâche **T4** « Communiquer avec les différents intervenants ».
- **Bac Pro MFER (2028)** : savoir **S1.2** « les intervenants ».
- **2nde TNE** : compétence **CC12** « Ordonner les données nécessaires en tenant compte des interactions avec les autres intervenants ».
- **Origine du réseau** : TP TECVC, REAC TP-00133 — hors REAC (culture professionnelle). **Attestation d'aptitude 2025** (`packs/fluides/referentiel-2025.json`) : **1.00** (législation applicable).

## Déroulé des 8 écrans (8 SVG, dont 6 animés en SMIL)

1. **Onze acteurs, quatre familles** — `svg/onze-acteurs.svg`
2. **Celui qui commande, celui qui conçoit** — `svg/commande-conception.svg`
3. **Celui qui contrôle, celui qui protège** — `svg/controle-securite.svg`
4. **Ceux qui font : l’entreprise et le technicien** — `svg/entreprise-technicien.svg`
5. **Celui qui possède la machine, celui qui s’en sert** — `svg/detenteur-fiche.svg`
6. **Du fabricant à la filière : trois acteurs autour du fluide** — `svg/fabricant-distributeur-traitement.svg`
7. **Informer, faire signer, transmettre** — `svg/informer-signer-transmettre.svg`
8. **Bilan : un verbe par acteur** — `svg/bilan-acteurs.svg`

Animés : 1 (onze-acteurs), 2 (commande-conception), 4 (entreprise-technicien), 5 (detenteur-fiche), 6 (fabricant-distributeur-traitement, points qui suivent les flèches), 7 (informer-signer-transmettre). Boucle 12 s avec temps de repos ; l'état au repos est l'image complète.

## Les 4 questions et corrigés

**Q1 (écran 2).** Un restaurateur fait installer une chambre froide. Qui est le maître d'ouvrage ?
- a) L'entreprise de froid qui monte la chambre
- b) Le restaurateur, qui commande et paie les travaux ✔
- c) Le technicien qui fait le montage
- d) Le bureau de contrôle qui vérifie le projet
*Explication : Le maître d'ouvrage est celui pour qui l'ouvrage est réalisé : il commande, il paie et il accepte les travaux à la réception. L'entreprise, elle, réalise.*

**Q2 (écran 3).** Plusieurs entreprises travaillent en même temps sur un chantier de bâtiment. Qui organise la sécurité commune ?
- a) Le coordonnateur SPS ✔
- b) Le bureau de contrôle
- c) Le technicien le plus ancien de l’équipe
- d) Le distributeur qui livre le fluide
*Explication : Le coordonnateur SPS est désigné par le maître d'ouvrage quand plusieurs entreprises interviennent. Il écrit le plan général de coordination. Le bureau de contrôle donne un avis technique : ce n'est pas son rôle.*

**Q3 (écran 5).** Dans le Code de l'environnement, qui est le « détenteur » d'une installation frigorifique ?
- a) L'entreprise attestée qui vient la dépanner chaque année
- b) Le fabricant qui a construit la machine et la garantit
- c) Le distributeur qui a vendu le fluide frigorigène
- d) Celui qui a un pouvoir réel sur son fonctionnement, propriétaire ou non ✔
*Explication : Le détenteur est celui qui exerce un pouvoir réel sur le fonctionnement technique de l'équipement, qu'il en soit propriétaire ou non (art. R. 543-76). L'entreprise qui intervient s'appelle l'opérateur.*

**Q4 (écran 7).** Vous trouvez une fuite sur la chambre froide d'un client. Que faites-vous ?
- a) Vous rechargez la machine : le client n'a pas besoin de le savoir
- b) Vous prévenez le bureau de contrôle du chantier
- c) Vous appelez le fabricant pour qu’il vienne réparer
- d) Vous prévenez le détenteur et vous notez la fuite sur la fiche ✔
*Explication : Le détenteur doit être informé : c'est lui qui répond de la machine et qui doit faire réparer la fuite (art. R. 543-79). Vous la notez sur la fiche d'intervention. Recharger sans rien dire cache le problème.*

Bonnes réponses en positions 2, 1, 4, 4 ; aucune n'est la plus longue de façon systématique.

## Correspondances (liens réels)

`../aptitude-capacite/` · `../tracabilite-fluides/` · `../risques-papiers-chantier/` (station sœur) · `../risques-duerp/` · `../certif-garanties/` · JouéRézo `https://inerweb.fr/jouerezo/` (le jeu « qui fait quoi » y sera fabriqué à part).

## Ce qui vient du fonds de Franck (restructuré, rien recopié)

RAG de HAL (`chercher-rag.js`, 19/10/2026) : `PLAN_SEANCE_Acteurs_Construction.docx` et `_2.docx`, `Seance_MOA_MOE_Analogie_Cinema.docx` (analogie producteur / réalisateur / équipe technique, reprise à l'écran 2), `Synthèse prévention sur le chantier.odt` (PGC / PPSPS / plan de prévention), `TD 03 - PPSPS et Plan de prévention`.
**Deux inexactitudes du fonds, corrigées ici** : (1) les plans de séance disent que le CSPS « établit le plan de prévention » et « rédige le PPSPS » ; d'après l'INRS, le coordonnateur établit le **PGC** et le **PPSPS** est rédigé par **chaque entreprise** ; le plan de prévention relève de l'entreprise utilisatrice et des entreprises extérieures (Code du travail, R. 4512-6 et suivants) ; (2) « architecte obligatoire > 150 m² » : non repris (non sourcé ici).

## Sources (consultées le 19/10/2026)

- **Code de l'environnement, art. R. 543-76** (définitions : détenteur = « pouvoir réel sur le fonctionnement technique », propriétaire ou non ; opérateur = entreprise qui intervient à titre professionnel) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033628884 (version en vigueur depuis le 18/12/2016).
- **R. 543-78** (le détenteur fait appel à un opérateur titulaire de l'attestation de capacité pour la charge, la mise en service et toute opération sur le circuit) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790649
- **R. 543-79, R. 543-80, R. 543-91, R. 543-92** (contrôle d'étanchéité et réparation des fuites par le détenteur ; conservation des documents au moins cinq ans ; reprise des fluides par le distributeur ; remise au distributeur ou traitement sous la responsabilité de l'opérateur) — section https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006074220/LEGISCTA000006176997/
- **R. 543-82** (fiche d'intervention établie par l'opérateur ; signée conjointement au-delà d'un seuil ; le détenteur garde l'original ; copies conservées cinq ans au moins) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031790617
- **R. 543-99** (attestation de capacité des opérateurs) — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006839333
- **Code du travail, L. 4122-1** (obligation du travailleur de prendre soin de sa santé et de sa sécurité et de celles des autres) — https://code.travail.gouv.fr/code-du-travail/l4122-1
- **Code du travail, L. 4532-2, R. 4532-11, L. 4531-2, L. 4532-7** (coordonnateur SPS : désigné par le maître d'ouvrage, sous sa responsabilité) — INRS, « Cadre réglementaire de la coordination de sécurité », https://www.inrs.fr/metiers/btp/coordination-sps/reglementation.html ; OPPBTP, « Article L4532-2… », https://content.preventionbtp.fr/pdf/droit_de_la_prevention/article-l4532-2-du-code-du-travail-obligation-de-coordination-du-maitre-d-ouvrage.pdf
- **Code civil, art. 1792-6** (réception : « acte par lequel le maître de l'ouvrage déclare accepter l'ouvrage avec ou sans réserves ») — repris du FOND de la station `certif-garanties` (lu sur Légifrance le 30/09/2026).
- **Loi n° 85-704 du 12/07/1985 (loi MOP), art. 2** (maître d'ouvrage, responsable principal de l'ouvrage) — lu par réponse ministérielle à la question écrite n° 41109 (Assemblée nationale) ; **non repris dans l'écran** car la loi MOP vise les maîtres d'ouvrage publics.
- **Code de la construction et de l'habitation, contrôleur technique** (mission de prévention des aléas techniques ; avis à la demande du maître d'ouvrage ; solidité et sécurité des personnes ; agrément ; incompatibilité avec la conception et l'exécution) — lu sur Doctrine (chapitre V du livre Ier) et INPI, https://www.inpi.fr/annuaire-activites-et-professions/controleur-technique-de-la-construction ; numéro d'article (L. 111-23) non confirmé sur Légifrance.
- **Directive 2014/68/UE (équipements sous pression), art. 5** (déclaration UE de conformité établie par le fabricant, tenue à disposition des autorités) — lu dans la fiche CLAP (AFNOR / UNM) https://unm.fr/wp-content/uploads/2022/09/clapx195f.pdf, car EUR-Lex n'est pas accessible à la consultation.
- **Code de la commande publique, L. 2431-1** (maîtrise d'œuvre : mission distincte de celle des entreprises) — lu dans un résumé, https://www.code-commande-publique.com/articles-l2431-1-a-l2431-3
- Fonds de Franck : voir plus haut.

## À sourcer (rien de ceci n'est affirmé comme texte officiel dans la station)

1. **Vocabulaire européen** : le règlement (UE) 2024/573 emploie le mot « opérateur » pour qui exerce un pouvoir réel sur le fonctionnement technique de l'équipement (pas pour l'entreprise qui intervient). Franck demande « détenteur / exploitant (responsable de l'équipement au sens du règlement F-Gaz) ». Définition exacte et article non lus (EUR-Lex inaccessible). La station s'appuie sur le seul Code de l'environnement (R. 543-76) et n'écrit pas « au sens du règlement ».
2. **Seuil de la fiche d'intervention** : écrit à l'écran 5 (« 5 tonnes équivalent CO₂ de HFC ou de PFC, ou 3 kg de HCFC », art. R. 543-82, lu sur Légifrance le 19/10/2026 et repris du FOND de la station Traçabilité). L'article renvoie au règlement (UE) n° 517/2014, abrogé par le 2024/573 : vérifier la version en vigueur et le projet de décret de mise en concordance. Les seuils de R. 543-79 et R. 543-80 ne sont pas écrits.
3. **Article du CCH** sur le contrôleur technique (L. 111-23 et suivants) : texte exact non relu sur Légifrance ; la station reste à la paraphrase.
4. **Loi MOP** : applicable aux maîtres d'ouvrage publics ; la station ne cite pas l'article 2 pour un client privé.
5. **Fabricant** : article exact de la directive 2014/68/UE (art. 5, art. 8) et de l'obligation de notice ; la DESP n'impose pas de joindre la déclaration à l'équipement (fiche CLAP) : la station dit « établit et tient à disposition » pour la déclaration ; « livre sa notice » est repris de la station `desp-marquage-papiers` (non relu sur la directive).
6. **Distributeur** : obligation de ne vendre le fluide qu'à des titulaires de l'attestation de capacité : non lue, non affirmée.
7. **Bureau de contrôle** : qui le paie : non affirmé.
8. **« Ce que vous lui devez »** (écran 2 à 6) : informer, faire signer, transmettre = pratique de chantier proposée ; seules les mentions d'articles sont des textes.
9. **Architecte** : seuil de recours obligatoire : non écrit.
10. **Procès-verbal de réception** à « faire signer » par le maître d'ouvrage (écran 2) : l'art. 1792-6 dit que le maître d'ouvrage accepte la réception ; la forme du PV est une pratique.

## Défaut connu

- Pas de MP3 fabriqué : la voix du navigateur sert de filet (lot Piper à lancer après le feu vert).
- Le jeu « qui fait quoi » n'existe pas encore : la station renvoie à JouéRézo (accueil) et ne cite pas de jeu précis.

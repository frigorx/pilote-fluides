# SPEC — l'accès enseignant d'inerweb.fr

> **Ce que c'est.** L'architecture du système de codes enseignant, socle de la future
> partie freemium. Écrit le **26/08/2026**, sur décisions de F. Henninot prises le jour
> même. **Rien n'est codé** : ce document se valide d'abord.
>
> Il remplace le régime actuel (un code unique, partagé, sans expiration) par des
> **accès nominatifs, cloisonnés par produit, à durée de vie d'un an**.

---

## 1. D'abord l'honnêteté : ce que ça protège, ce que ça ne protège pas

Cette section n'est pas une précaution de style. C'est ce qui permet de ne pas payer un
système qui ne tient pas ses promesses.

**Ce que le système fait vraiment :**

- Le contenu enseignant publié n'existe **nulle part en clair**. Ce sont des fichiers
  chiffrés en AES-256-GCM. Sans clé, ils sont du bruit — y compris pour qui aspire le
  site entier.
- Chaque accès est **nominatif** : une fuite désigne son porteur.
- Chaque accès **meurt au bout d'un an**, et pas parce qu'une date le dit : parce que
  la clé qui l'ouvrait ne déchiffre plus rien.
- Chaque accès est **cloisonné à un produit**. Un code Habilitation qui fuite ne donne
  rien sur AquiBlue : ce sont deux coffres, deux clés, sans passerelle.
- Chaque document affiché porte le **nom de son porteur en filigrane**. Une capture qui
  circule dit d'où elle vient.

**Ce que le système ne fera jamais, quoi qu'on y mette :**

- Empêcher un enseignant qui a déchiffré d'enregistrer ce qu'il voit. Le contenu finit
  affiché sur son écran : il est copiable. Aucune technique au monde ne l'empêche —
  ni un site, ni un logiciel installé, ni un PDF.
- Refermer une copie déjà prise. C'est écrit dans `build/coffre.mjs` depuis juillet et
  ça reste vrai : *un fichier chiffré publié est cloné et archivé par des tiers ;
  changer le code plus tard ne referme pas les copies déjà prises*. La rotation
  annuelle protège **ce qui sera publié ensuite**, pas ce qui l'a été.
- Empêcher un enseignant de donner son code à un collègue. Ce qui l'en dissuade, c'est
  que le code **porte son nom** — et qu'il ne vaut que pour **un** produit.

**La conclusion à assumer** : ce dispositif rend le pillage **coûteux, traçable,
cloisonné et juridiquement net**. Il ne le rend pas impossible. C'est le même contrat
que la licence nominative d'inerWeb Fluide du 14/08, et c'est le bon niveau d'ambition
pour un produit qui doit rester utilisable en classe.

---

## 2. Les décisions de F. Henninot — 26/08/2026

1. **Deux étages.** L'enseignant reçoit un code maître ; ce code lui permet de
   **fabriquer lui-même** des codes pour ses classes et ses sessions.
2. **Durée de vie : un an.**
3. **▶ Un code par produit — décision structurante.** « Trois logiciels, trois codes.
   Le jour où j'en mets un quatrième, j'ai un quatrième code. » Obtenir un code **ne
   donne pas** accès à inerWeb : il donne accès à **un** produit. Un collègue peut
   n'avoir qu'Habilitation, un autre n'avoir qu'AquiBlue.
4. **Un code « tout accès » reste possible** — même mécanique, un code qui porte
   plusieurs produits. Prévu par le format, pas construit tant qu'il n'est pas demandé.
5. **Aucun auto-service.** Pas de formulaire de demande ouvert sur le site : un élève
   qui clique partout ne doit pouvoir ni générer de codes, ni déclencher d'envois.
   Les codes maîtres se délivrent à la main, par F. Henninot.
6. **But affiché** : rester propriétaire de son travail, et préparer le modèle freemium.

---

## 3. Les produits — la liste qui commande tout

Un **produit** est l'unité d'accès : un coffre, un jeu de clés, un code. Ajouter un
produit, c'est ajouter une ligne à cette table, rien de plus.

| Identifiant | Produit | Espace enseignant | État |
|---|---|---|---|
| `habilitation` | Le pack habilitation fluides | console formateur, 38 documents, projection, matrice, dossier, examens | **existe** — c'est le coffre actuel |
| `aquiblue` | inerWeb AquiBlue | `aquiblue/espace-prof.html` | **existe** |
| `legislation` | Réseau Législation | à créer | réseau en ligne, pas d'espace prof |
| `hydrometro` | HydroMétro | à créer | réseau en ligne, pas d'espace prof |
| `hocourant` | inerWeb HoCourant | à créer | réseau en ligne, pas d'espace prof |

⚠️ **À confirmer** : cette liste est ma lecture de vos produits actuels. Les trois
derniers n'ont pas encore d'espace enseignant — ils prendront leur code le jour où ils
en auront un. Corrigez la liste si un produit manque ou n'a rien à y faire.

---

## 4. Le principe : une clé par produit et par millésime

Aujourd'hui, le coffre est chiffré par une clé **dérivée du code d'accès**. Le code
étant court (8 chiffres), la clé est faible : les commentaires de `coffre.mjs` le
disent, environ dix minutes face à du matériel dédié.

Demain, on renverse : **chaque coffre est chiffré par une clé aléatoire de 256 bits**,
et c'est le code qui **transporte** cette clé au lieu de la fabriquer.

| | Aujourd'hui | Demain |
|---|---|---|
| La clé du coffre | dérivée du code tapé | **tirée au hasard, 256 bits** |
| Force réelle | celle du code (faible) | **hors d'atteinte de la force brute** |
| Portée | un code, tout le contenu protégé | **un code, un produit** |
| Le code | se tape | **se colle** (ou se scanne) |
| Expiration | aucune | **la clé de l'année suivante n'ouvre plus l'ancienne** |
| Qui l'a | tout le monde, le même | **une personne, nommée** |

Chaque produit porte donc ses clés, année par année :
`habilitation/2026`, `aquiblue/2026`, `habilitation/2027`… Le rituel de rentrée
(section 9) refabrique chaque coffre avec la clé de l'année. Les codes de l'année
précédente deviennent inertes — non pas parce qu'on leur refuse l'entrée, mais parce
qu'il n'y a plus rien qu'ils sachent ouvrir.

> C'est le point qui rend votre « un an » réel. Une date d'expiration inscrite dans un
> fichier se contourne en reculant l'horloge du poste. Une clé qui ne déchiffre plus,
> non.

---

## 5. Les deux étages

Deux niveaux de contenu par produit, donc deux clés par produit et par millésime.

```
              CLÉ PRIVÉE DE SIGNATURE (F. Henninot, hors dépôt) — une seule, pour tout
                                    │
                                    │ signe chaque code
              ┌─────────────────────┼─────────────────────┐
              ▼                     ▼                     ▼
     CODE « habilitation »   CODE « aquiblue »    CODE « legislation »
     millésime 2026          millésime 2026        millésime 2026
     M. X · expire 08/2027   Mme Y                 M. X
              │                     │                     │
              │  chaque code porte : K-prof + K-élève DE CE PRODUIT,
              │  la clé personnelle du titulaire, et son certificat
              │
      ┌───────┴────────┐
      │ ÉTAGE 1        │  ouvre le contenu enseignant du produit
      │ code maître    │  (chiffré par K-prof du produit)
      └───────┬────────┘
              │ fabrique
              ▼
      ┌────────────────┐
      │ ÉTAGE 2        │  ouvre le contenu élève protégé du produit
      │ code de session│  (chiffré par K-élève du produit)
      │ porte le nom   │
      │ de l'émetteur  │
      └────────────────┘
```

**Le cloisonnement est réel** : les clés d'un produit ne dérivent pas de celles d'un
autre. Aucun calcul ne permet de passer de `habilitation/2026` à `aquiblue/2026`.

**Pourquoi l'enseignant peut fabriquer des codes sans jamais détenir votre clé privée.**
C'est le seul point délicat, et il se règle par une **chaîne de certification** — le
mécanisme d'un certificat de site web, en beaucoup plus simple :

1. Vous délivrez à l'enseignant, dans son code maître, **une paire de clés qui lui est
   propre pour ce produit**, accompagnée d'un **certificat** : sa clé publique + son
   nom + le produit + le millésime, le tout signé par **votre** clé privée.
2. Quand il fabrique un code de session, il le **signe avec cette clé personnelle** et
   y joint son certificat.
3. Le site vérifie deux choses, hors ligne, avec votre seule clé publique embarquée :
   que le certificat vient bien de vous, puis que le code de session vient bien de cet
   enseignant — **et qu'il porte le bon produit**.

Résultat : personne ne fabrique de code sans un code maître valide, chaque code de
session **dit qui l'a émis** de façon infalsifiable, et un titulaire d'AquiBlue ne peut
pas signer une session Habilitation.

---

## 6. Le parcours réel — ce que chacun voit

**L'enseignant, une fois par an et par produit :**

1. Il vous écrit. Vous délivrez son code (une chaîne longue, envoyée par courriel).
2. Il ouvre `inerweb.fr/activer` — **une seule page pour tous les produits** — et colle
   son code.
3. La page vérifie la signature et affiche : « **Habilitation fluides** — accès de
   *Nom Prénom*, valable jusqu'au 31 août 2027 ». Elle range les clés dans son
   navigateur, **sous le nom du produit**.
4. Ce produit-là s'ouvre pour lui. **Les autres restent fermés.** S'il a droit à deux
   produits, il colle deux codes sur la même page — et la page liste alors ses deux
   accès, chacun avec sa date.

**L'enseignant, quand il veut ouvrir un contenu à une classe :**

1. Depuis la console du produit, « Fabriquer un code de session ».
2. Il saisit un libellé (« CAP IFCA — groupe A ») et une durée (jusqu'à la fin du
   millésime au plus tard).
3. Il obtient **un lien et son QR code**. En classe, il projette le QR code ; les élèves
   scannent. Aucun code à dicter, aucune faute de frappe.

**L'élève :** il scanne, la page s'ouvre. Il ne tape rien, ne crée aucun compte, ne
donne aucune donnée personnelle. Le contenu affiché porte en filigrane le nom de
l'enseignant qui a ouvert la session.

> ⚠️ **Le point de la section 1 vaut ici** : un lien de session est un lien. S'il est
> publié sur un forum, il fonctionne pour tout le monde jusqu'à sa date de fin. Le
> filigrane est ce qui rend le geste traçable — c'est la dissuasion, pas le verrou.

---

## 7. Le format des codes

| | Code maître | Code de session |
|---|---|---|
| Forme | chaîne d'environ 250 caractères, à coller | lien + QR code |
| Contient | **produit**, millésime, nom, n° d'ordre, expiration, K-prof et K-élève **de ce produit**, clé personnelle, certificat | **produit**, millésime, K-élève, libellé, date de fin, certificat de l'émetteur, signature |
| Se tape ? | non — se colle depuis un courriel | non — se scanne |
| Signé par | votre clé privée | la clé personnelle de l'enseignant |
| Vérifiable | hors ligne, clé publique embarquée dans le site | hors ligne, par la chaîne de certification |
| Tout accès | même format, le champ produit porte **plusieurs** identifiants et le code embarque autant de jeux de clés | — |

**Aucun appel réseau nulle part.** La vérification est intégralement locale, comme pour
inerWeb Fluide. La promesse « rien ne part sur internet » reste tenue, et le site reste
un site statique.

---

## 8. Ce qui est chiffré, ce qui reste libre

Rien de ce qui est aujourd'hui gratuit ne se ferme. Le principe posé le 25/07 tient :
**réviser seul reste libre**.

| Niveau | Contenu | Régime |
|---|---|---|
| **Libre** | fiches de cours, séries « Réviser par thème », « Ma progression », module pratique, les réseaux en consultation | inchangé, aucun code |
| **Étage 2 — code de session** | ce qu'un enseignant ouvre à sa classe pour une durée déterminée | chiffré par K-élève **du produit** |
| **Étage 1 — code maître** | l'espace enseignant du produit | chiffré par K-prof **du produit** |
| **Jamais en ligne, même chiffré** | les 85 questions officielles, les 10 sujets d'examen, le registre nominatif | dépôt privé, hors ligne — règle inchangée de `coffre.mjs` |

---

## 9. Le rituel de rentrée — une fois par an

Par produit, quelques minutes chacun :

1. `node build/millesime.mjs habilitation 2027` — tire les clés du produit pour
   l'année, les range hors dépôt. Refuse d'écraser un millésime existant.
2. `node build/coffre.mjs habilitation --millesime 2027` — rechiffre le coffre du produit.
3. `node build/delivrer-acces.mjs habilitation --millesime 2027 --tous` — refabrique un
   code pour chaque titulaire **de ce produit**, prêt à envoyer.
4. `node build/build.mjs` — propage, et le casse-cache fait le reste.

Au matin de la rentrée, les codes de l'an passé n'ouvrent plus rien et chacun a le sien,
pour les produits auxquels il a droit — et pour ceux-là seulement.

---

## 10. Les outils à écrire

Tous chez vous, aucun dans le site publié. **Tous prennent le produit en premier
argument** : c'est ce qui rend l'ajout d'un quatrième produit gratuit.

| Outil | Ce qu'il fait |
|---|---|
| `build/produits.mjs` | la table de la section 3, source unique — un produit s'ajoute ici |
| `build/millesime.mjs` | tire K-prof et K-élève d'un produit pour une année |
| `build/delivrer-acces.mjs` | délivre un code nominatif pour un produit ; consigne au registre local |
| `build/coffre.mjs` *(à faire évoluer)* | chiffre le coffre d'un produit par sa clé de millésime |
| `build/revoquer.mjs` | retire un titulaire d'un produit pour le millésime suivant |
| `moteur/acces.js` | côté site : vérifie, déchiffre, pose le filigrane — **une source unique**, chargée en absolu par tous les produits, comme `marque.js` |

Le registre des titulaires est **nominatif** : il reste local, jamais publié — même
doctrine que `C:\git\paquets\licences\NOTICE-RGPD-REGISTRE.md`. Une colonne `produit`
s'y ajoute : un enseignant peut y figurer plusieurs fois, une ligne par produit.

---

## 11. Les lots

Un lot = un commit, tout vert avant de passer au suivant.

- **AE-1 — le socle.** `produits.mjs`, `millesime.mjs`, format des codes, vérification,
  chaîne de certification. Avec sa suite de tests et sa contre-épreuve : retirer la
  vérification doit faire rougir le filet.
- **AE-2 — le coffre au régime millésime, EN PARALLÈLE.** `coffre.mjs` sait chiffrer un
  produit par sa clé de millésime et écrit dans `docs/coffre-<année>/`, **à côté** du
  coffre en service. ⚠️ **Correction du 26/08** : la première rédaction de ce lot faisait
  basculer `docs/coffre/` — les collègues qui ont le code actuel se seraient retrouvés
  dehors, puisque aucune page ne sait encore lire un code maître. Les deux régimes
  cohabitent donc, et la bascule n'a lieu qu'en AE-4.
- **AE-3 — la délivrance.** `delivrer-acces.mjs`, registre local par produit, premier
  code délivré et prouvé sur banc.
- **AE-4 — la page unique `activer`, ET la bascule.** Un code collé ouvre **son**
  produit ; plusieurs codes se cumulent sur la même page. Filigrane compris. C'est
  seulement ici que `docs/coffre-<année>/` remplace `docs/coffre/` — et **les nouveaux
  codes doivent être entre les mains des collègues avant**, sinon ils se retrouvent
  dehors du jour au lendemain.
- **AE-5 — l'étage 2.** Fabrication des codes de session, lien + QR code, contenu élève
  protégé.
- **AE-6 — le deuxième produit : `aquiblue`.** C'est le lot qui **prouve le
  cloisonnement** — et qui prouve qu'ajouter un produit est devenu une formalité.
- **AE-7 — les suivants**, au rythme où leurs espaces enseignants existeront.

**Ordre de prudence** : AE-1 et AE-2 ne changent rien de visible et se déploient sans
risque. AE-4 est le premier lot que verront vos collègues actuels — il faudra leur
donner leur nouveau code **avant** de le publier, sinon ils se retrouvent dehors.

---

## 12. Les critères de réussite — à prouver, pas à affirmer

Le chantier n'est pas fini tant que ces six preuves ne sont pas faites sur banc :

1. Un fichier du coffre téléchargé sans code est **illisible** (vérifié à l'octet).
2. Un code **falsifié** (nom modifié d'un caractère) est **refusé**.
3. Un code du millésime 2026 **n'ouvre pas** un coffre du millésime 2027.
4. **Un code `aquiblue` n'ouvre rien dans `habilitation`** — le cloisonnement, mesuré.
5. Un code de session fabriqué par un enseignant est **accepté**, et affiche **son** nom
   en filigrane ; un code bricolé sans certificat est **refusé** ; un code de session
   signé par un titulaire d'un autre produit est **refusé**.
6. Le site **ne fait aucun appel réseau** pendant toute la vérification (juge :
   l'onglet réseau du navigateur, vide).

---

## 13. Ce qui reste à trancher

1. **La liste des produits** de la section 3 — à confirmer ou corriger.
2. **La page `activer` sera visible** : logo inerWeb ou logo du lycée ? La question se
   pose à chaque production, même quand le cas paraît évident.
3. **Le sort des collègues déjà servis** par le code actuel : on leur délivre un code
   nominatif avant bascule, ou on garde l'ancien code en parallèle une saison ?
4. **Le freemium lui-même** : quand ce socle sera posé, il faudra décider, produit par
   produit, ce qui reste gratuit et ce qui se paie. Le socle ne préjuge de rien — il
   rend la décision possible, et il la rend **granulaire**, ce qui est exactement
   l'intérêt d'un code par produit.
5. **Le cumul d'activités** : dès que ça encaisse, la déclaration au rectorat s'impose.
   Signalé le 19/08, redit ici, décision chez vous.

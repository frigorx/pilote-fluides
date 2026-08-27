# Les accès enseignant — mode d'emploi

> Écrit le 26/08/2026. Pas de jargon : ce document dit **ce que vous avez à faire**,
> dans l'ordre. L'architecture est dans `SPEC-ACCES-ENSEIGNANT.md`, à côté.

---

## 1. Ce qui est déjà fait — vous n'avez rien à créer

**La clé racine existe.** Elle a été fabriquée le 26/08/2026. Vous n'avez aucune clé à
inventer, à choisir ou à retenir : c'est un fichier, pas un mot de passe.

Elle est déjà en **trois exemplaires identiques** (même empreinte vérifiée) :

| Où | Ce que ça protège |
|---|---|
| `C:\git\paquets\acces-inerweb\racine\` | l'exemplaire de travail — celui qu'utilisent les outils |
| `C:\git\_secrets\acces-inerweb\racine\` | contre une suppression accidentelle du dossier de travail |
| `G:\Mon Drive\inerweb-secrets\acces-inerweb\racine\` | contre la panne de l'ordinateur — mais c'est un cloud, voir plus bas |

Le millésime `habilitation-2026` est sauvegardé avec.

---

## 2. Ce qu'il vous reste à faire — deux gestes, dix minutes

### a. Imprimer la fiche papier

C'est **la** sauvegarde qui ne tombe jamais en panne.

1. Ouvrez la console (§ 3), section **« Mettre la clé à l'abri »**, et cliquez sur
   **« Préparer la feuille à imprimer »**. Elle s'ouvre toute seule.
   *(Sans la console : le fichier est `C:\git\paquets\acces-inerweb\racine\FICHE-A-IMPRIMER.html`.)*
2. Imprimez-le (Ctrl+P). Une page A4.
3. **Rangez la feuille hors de vue**, comme une pièce d'identité. Qui a ces lignes peut
   fabriquer un accès à n'importe lequel de vos produits, au nom de n'importe qui.
4. **Supprimez ensuite le fichier `FICHE-A-IMPRIMER.html`** : il contient la clé en clair.

Si vous perdez tout le reste, cette feuille suffit à repartir : la procédure de
restauration est imprimée dessus.

### b. Quand vous aurez un disque externe sous la main

Aucun n'était branché le 26/08. Le jour où vous en branchez un, copiez-y le dossier
`C:\git\paquets\acces-inerweb\` en entier — il pèse **13 Ko**, il tient partout.

> ⚠️ **Le point à trancher : le Google Drive.** La copie qui y est posée vous protège si
> l'ordinateur meurt, mais elle met votre clé privée chez un tiers. C'est un compromis,
> pas une évidence. Si vous préférez, dites-le et je la retire — la fiche papier et un
> disque externe suffisent alors, et c'est même plus sûr.

---

## 3. La console — vous n'avez jamais à taper de commande

Sur votre Bureau : **« Console des acces inerWeb »**. Double-cliquez.

Une petite fenêtre s'ouvre et vous dit qu'elle travaille — **vous n'avez rien à y taper**.
Votre navigateur s'ouvre tout seul sur la console. Laissez la petite fenêtre ouverte
tant que vous vous en servez ; pour arrêter, fermez-la.

Tout se fait dans le navigateur, par clics.

### Donner un accès à un collègue

1. Choisissez le produit dans la liste déroulante.
2. Tapez le nom de la personne (son adresse de courriel si vous voulez).
3. Cliquez sur **« Créer l'accès »**.

La console affiche alors le **message tout prêt** à lui envoyer. Un bouton
**« Copier le message »** : vous le collez dans votre courriel, et c'est fini.

Votre collègue va sur **`https://inerweb.fr/activer`**, colle le code, son accès s'ouvre.
Rien à installer, aucun compte à créer, aucun mot de passe.

**Un code par produit.** S'il doit aussi avoir AquiBlue, refaites l'opération en
choisissant AquiBlue : les deux accès se cumulent chez lui.

### Voir qui a un accès

La console affiche la liste : qui, quel produit, jusqu'à quand. Elle ne quitte jamais
votre ordinateur.

---

## 3 bis. Ouvrir une séance à une classe (depuis le 27/08)

Ceci ne se fait **pas** dans la console : ça se fait sur le site, dans votre navigateur,
parce que c'est **vous** qui signez la séance, avec votre clé personnelle.

1. Allez sur **`https://inerweb.fr/seances.html`**.
2. Choisissez le produit, tapez un nom de séance (« CAP IFCA — groupe A »), une date de
   fin.
3. **« Fabriquer le code de séance »**. Vous obtenez un lien et son QR code.
4. En classe : **« Projeter en grand »**. Les élèves scannent, le contenu s'ouvre. Rien
   à dicter, aucune faute de frappe.

Le bouton **« Copier le lien »** sert pour l'ENT ou un courriel ; **« Imprimer »** sort
le QR sur papier. Vos séances restent listées en bas de la page, sur cet appareil.

> ⚠️ **Il faut votre code d'accès enseignant sur cet appareil.** Sans lui, la page ne
> propose rien — et c'est le but : fabriquer une séance revient à signer un accès en
> votre nom.

> ⚠️ **La console formateur et la page de projection ont changé de serrure.** Elles ne
> s'ouvrent plus avec le code court qu'on donnait en salle : elles demandent le même
> accès enseignant. Collez votre code une fois sur `activer.html`, et l'appareil est
> ouvert. L'application élève, elle, reste libre sans aucun code.

> Une séance ne peut jamais durer au-delà de votre propre accès. À la rentrée, tout se
> referme ensemble.

### Savoir qui a fait quoi, et récupérer les résultats

En fabriquant la séance, indiquez **combien d'élèves**. Vous obtenez une planche de
**cartons à découper** : un par élève, avec un code de quatre caractères.

1. Imprimez, découpez, distribuez.
2. **Notez le nom de chaque élève en face de son numéro, sur votre exemplaire.** Cette
   feuille reste chez vous — aucun nom n'entre nulle part dans le système.
3. L'élève ouvre le lien de la séance, tape ses quatre caractères, et travaille.
4. En fin de séance, il obtient un **code de restitution** d'une trentaine de caractères.
   Il vous l'envoie comme il veut : message, ENT, courriel.
5. Retournez sur `seances.html`, section **« Récupérer les résultats »**, collez tous les
   codes reçus d'un coup. Vous obtenez le tableau : score, réussite, durée, par élève,
   et la moyenne de la classe.

Un code qui vient d'une autre séance, ou qui a été abîmé en chemin, est écarté et
signalé — jamais avalé en silence.

> ⚠️ **Ces résultats servent à suivre, pas à noter.** Le sceau garantit qu'un code vient
> bien de cette séance et n'a pas été abîmé. Il ne garantit pas qu'un élève n'a pas pris
> le numéro d'un autre, ni gonflé son score : le navigateur corrige les réponses, donc
> l'élève les connaît. Une évaluation qui compte au bulletin se fait devant vous.

> **Limite provisoire : 100 élèves par séance.** Elle n'est là que pour borner le système
> le temps de découvrir l'usage réel. C'est un nombre à changer, rien d'autre.

**À faire lire aux collègues** : `https://inerweb.fr/comprendre-les-codes.html` explique
les trois codes, le chemin complet d'une séance, et ce que le système ne fait pas.

---

## 4. Chaque rentrée — le rituel d'août

Dans la console, section **« Préparer une nouvelle année »** :

1. choisissez le produit et l'année (2027) ;
2. cliquez **« 1. Préparer les clés de l'année »** ;
3. cliquez **« 2. Fabriquer le coffre »** ;
4. redonnez un accès à chaque collègue (section du dessus) et envoyez les nouveaux codes.

Au matin de la rentrée, **les codes de l'an passé n'ouvrent plus rien** — non pas parce
qu'on les refuse, mais parce que la clé qu'ils portaient ne déchiffre plus le coffre.
C'est ça, votre durée de vie d'un an.

⚠️ **Envoyez les nouveaux codes AVANT de publier le nouveau coffre**, sinon vos collègues
se retrouvent dehors du jour au lendemain.

> Les commandes existent toujours pour qui veut les taper — elles sont listées en
> annexe, § 7. La console fait exactement la même chose, en cliquant.

---

## 5. Les cas qui arrivent

| Situation | Quoi faire |
|---|---|
| Un collègue a perdu son code | Redélivrez-en un. L'ancien reste valide jusqu'à sa date : hors ligne, on ne révoque pas un code déjà émis. C'est le millésime suivant qui le tue. |
| Un collègue part | Ne lui redélivrez rien à la rentrée suivante. Son accès s'éteint tout seul le 31 août. |
| Un code a fuité | Vous pouvez tirer un nouveau millésime en cours d'année et redélivrer à tout le monde — c'est le seul moyen de refermer. Prévoyez une soirée. |
| Vous avez perdu la clé racine | Reprenez la feuille papier (§ 2a). Sans elle, vous ne pouvez plus délivrer un seul code — les accès déjà donnés continuent de fonctionner. |
| Vous avez perdu un millésime | Le coffre chiffré avec devient illisible pour tout le monde, vous compris. Refabriquez-le avec un millésime neuf et redélivrez. |

---

## 6. Ce que ce système ne fait pas

Dit une fois, pour ne pas se raconter d'histoires :

- Il **n'empêche pas** un enseignant qui a ouvert un document de l'enregistrer. Le
  contenu finit sur son écran ; aucune technique n'empêche ça, nulle part.
- Il **ne referme pas** une copie déjà prise. Ce qui a été publié un jour a pu être
  archivé par des tiers.
- Ce qu'il fait, et qui compte : le contenu publié n'existe **nulle part en clair**,
  chaque accès **porte un nom**, chaque document affiche ce nom **en filigrane**, et
  tout **expire au bout d'un an**.

---

## 7. Annexe — les commandes, pour qui veut les taper

La console de la § 3 ne fait rien d'autre que lancer ces outils. Elles sont ici pour
mémoire, et pour le jour où quelqu'un reprendra le chantier.

| Ce que ça fait | Commande |
|---|---|
| Donner un accès | `node build/delivrer-acces.mjs <produit> "Prénom Nom" [courriel]` |
| Préparer les clés d'une année | `node build/millesime.mjs <produit> <année>` |
| Fabriquer le coffre d'une année | `node build/coffre.mjs <produit> --millesime <année>` |
| Préparer la feuille à imprimer | `node build/fiche-cle-racine.mjs` |
| Vérifier que tout tient | `node build/test-acces.mjs` |

Produits : `habilitation` · `aquiblue` · `legislation` · `hydrometro` · `hocourant`.

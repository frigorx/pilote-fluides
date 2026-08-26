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

1. Ouvrez ce fichier : `C:\git\paquets\acces-inerweb\racine\FICHE-A-IMPRIMER.html`
   (double-clic, il s'ouvre dans le navigateur).
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

## 3. Donner un accès à un collègue

Une commande. Elle ne demande aucun code de votre part.

```
node build/delivrer-acces.mjs habilitation "Prénom Nom" adresse@courriel.fr
```

Ce qui se passe :

1. l'outil fabrique un code **personnel**, valable jusqu'au 31 août suivant ;
2. il l'écrit dans un fichier, sous `C:\git\paquets\acces-inerweb\codes\` ;
3. il l'inscrit au registre `registre-acces.csv` — nominatif, **il reste sur votre poste**.

**Le code ne s'affiche pas à l'écran** : ouvrez le fichier, copiez-le, envoyez-le à la
personne. Le fichier contient déjà le texte à lui transmettre.

Votre collègue va sur **`https://inerweb.fr/activer`**, colle le code, et son accès
s'ouvre. Rien à installer, aucun compte à créer, aucun mot de passe.

**Un code par produit.** S'il doit aussi avoir AquiBlue, vous lui délivrez un second
code — `node build/delivrer-acces.mjs aquiblue "Prénom Nom"`. Les deux se cumulent sur
la même page.

---

## 4. Chaque rentrée — le rituel d'août

Trois commandes par produit, une demi-heure en tout :

```
node build/millesime.mjs habilitation 2027
node build/coffre.mjs habilitation --millesime 2027
node build/delivrer-acces.mjs habilitation "Prénom Nom" --millesime 2027
```

Puis `node build/build.mjs`, et vous envoyez les nouveaux codes.

Au matin de la rentrée, **les codes de l'an passé n'ouvrent plus rien** — non pas parce
qu'on les refuse, mais parce que la clé qu'ils portaient ne déchiffre plus le coffre.
C'est ça, votre durée de vie d'un an.

⚠️ **Envoyez les nouveaux codes AVANT de publier le nouveau coffre**, sinon vos collègues
se retrouvent dehors du jour au lendemain.

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

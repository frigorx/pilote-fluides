# AE-6 — les codes individuels et la remontée des résultats

> Ouvert le 27/08/2026, après une discussion qui a tranché le cap.
> La spec de référence reste `SPEC-ACCES-ENSEIGNANT.md` ; ce fichier porte les
> décisions de ce lot-ci et son avancement.

## Ce que F. Henninot a décidé

1. **Un code par élève**, pour savoir qui a fait quoi. Aujourd'hui une séance
   donne un seul code, partagé : personne n'est distingué.
2. **Garde-fou à 100** par séance, **indicatif et provisoire**, augmentable à la
   demande. Annoncé comme tel à l'enseignant, pas caché.
3. **Pas de serveur pour l'instant** — coût évité. Rouvert le jour où l'usage
   décolle ; Cloudflare est le candidat gratuit à instruire à ce moment-là.
   ▶ Fait vérifié le 27/08 : **aucun hébergement web chez OVH** (domaine +
   Zimbra seulement, site servi par GitHub Pages). Un serveur OVH serait les
   3-4 €/mois déjà prévus en phase de monétisation, pas un coût déjà payé.
4. **Tout expliquer dans la partie enseignant.** Mot pour mot : « aujourd'hui on
   a des codes mais on ne sait pas à quoi ils servent ». C'est un lot, pas un
   supplément.

## LA DÉCISION DE CONCEPTION — un code court, pas un lien par élève

Le réflexe aurait été de fabriquer 30 liens, un par élève. **Il ne faut pas**, et
la raison est pratique : un lien de séance fait ~400 caractères. Un élève qui n'a
pas de téléphone pour scanner ne peut pas le taper. On l'exclurait.

Donc :

1. l'enseignant ouvre la séance → **un seul lien et un seul QR, communs** (AE-5,
   déjà livré, inchangé — le format du code de séance ne bouge pas) ;
2. il obtient en plus **une liste de codes courts** : élève 01 → `7K2M`,
   élève 02 → `Q4H9`… à distribuer, projeter ou imprimer ;
3. l'élève ouvre le lien commun, tape **4 caractères**, son navigateur sait
   qu'il est l'élève 07 ;
4. à la fin, son résultat porte ce numéro.

Le code court est un HMAC de (identifiant de séance + numéro) par la clé élève,
tronqué. Il se vérifie **hors ligne** : le navigateur a la clé par le lien, il
essaie les numéros 1 à 100 et voit lequel correspond. Cent calculs, instantané.

▶ **Le garde-fou à 100 devient structurel** : la recherche s'arrête à 100, il n'y
a rien à surveiller. L'augmenter, c'est changer un nombre.

⚠️ **Un alphabet sans caractères ambigus** — ni O/0, ni I/l/1. Un code dicté ou
recopié de travers est le premier défaut d'usage à éviter.

## CE QUE ÇA NE FERA PAS, écrit avant de commencer

**Le sceau du bilan n'est pas une preuve d'identité.** Tous les élèves d'une
séance partagent la même clé : le sceau prouve que le résultat vient de cette
séance et qu'il n'a pas été abîmé en transit. Il n'empêche pas un élève de se
faire passer pour un autre, ni de gonfler son score — le navigateur corrige, donc
il a les réponses.

C'est un **anti-erreur, pas un anti-triche**. Il faut que ce soit écrit dans la
page enseignant, sinon on vend une garantie qui n'existe pas. Une note qui compte
au bulletin demande un serveur ; pour du suivi formatif, l'élève qui triche se
prive lui-même.

## Les lots — tous livrés le 27/08

- [x] **AE-6a — les codes courts.** `codeEleve`, `listeEleves`, `retrouverEleve`,
      `doublonsDe`, des deux côtés.
- [x] **AE-6b — le bilan de restitution.** 36 caractères. Le moteur le propose à
      la place du fichier JSON dès que l'élève est entré dans une séance ; hors
      séance, le fichier reste le comportement d'avant, personne ne perd rien.
- [x] **AE-6c — le dépouillement.** Section « Récupérer les résultats » de
      `seances.html` : on colle en vrac, on obtient le tableau et la moyenne.
- [x] **AE-6d — la page d'explication.** `comprendre-les-codes.html`.

## Critère de réussite — prouvé dans le navigateur le 27/08

- [x] l'enseignant obtient sa liste de codes, imprimable et découpable ;
- [x] un élève entre avec 4 caractères — **tapés en minuscules** — et est reconnu ;
- [x] un code non attribué est refusé, avec un message qui dit quoi faire ;
- [x] son bilan tient en **36 caractères** ;
- [x] l'enseignant colle un paquet et obtient le tableau : élève 03, 14/20, 70 %,
      37 min, plus la moyenne de classe ;
- [x] un bilan abîmé d'un seul caractère est **écarté et signalé**, pas avalé ;
- [x] un bilan d'une autre séance est refusé ;
- [x] les quatre filets sont au vert — **150 contrôles**.

## Les quatre filets

| Fichier | Ce qu'il prouve | Contrôles |
|---|---|---|
| `build/test-acces.mjs` | le socle des codes, et ce qu'il refuse | 49 |
| `build/test-fabrique.mjs` | que navigateur et build **ne divergent pas** — y compris sur les codes d'élève et les bilans | 46 |
| `build/test-qr.mjs` | l'encodeur QR contre la norme | 16 |
| `build/test-eleves.mjs` | les codes individuels et les bilans, surtout leurs refus | 39 |

## Deux choses trouvées en route

**Un test qui ne testait rien.** « Un code inventé est refusé » comparait
`x === null || typeof x === "number"` — toujours vrai. Remplacé par un code
réellement non attribué, cherché dans l'alphabet. Un test qui passe toujours est
pire que pas de test.

**Le cas de la collision, éprouvé pour de bon.** Le filet ne se contente pas de
mesurer que c'est rare : il **provoque** une séance où deux élèves tirent le même
code, puis vérifie les deux gardes — l'enseignant est prévenu, et le code ambigu
ne désigne personne.

## 🔴 Toujours à faire avant de pousser (rappel d'AE-5)

    node build/delivrer-acces.mjs habilitation "Franck Henninot"

Sans ça, `formateur.html` et `projection.html` restent fermées à leur propre
auteur. Et prévenir les collègues qui avaient le code court.

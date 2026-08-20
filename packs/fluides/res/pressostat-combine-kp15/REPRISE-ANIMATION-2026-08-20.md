# Le film tourne dans le module — 20 août 2026

> Ce journal **corrige** `REPRISE-CHARTE-FOND-VOIX-2026-08-19.md` sur un point central.
> Tout ce que ce dernier dit de la charte, de la voix, du fond mécanique et des codes du
> référentiel reste vrai. Sa section 3, « illustrations refaites sur les valeurs du cours »,
> est **caduque** : elle décrit un travail sur des images fixes qui n'avait pas lieu d'être.

## L'erreur

F. Henninot a composé une **animation** de 62 secondes en 7 scènes. Je l'ai réduite à sept
captures fixes, puis j'ai construit un banc de rendu pour produire de meilleures *photos* de
ce film — en m'en félicitant. Son constat : « Si je me fais chier à faire des animations,
c'est fait pour faire des animations. Sinon je ferais avec des images. Pourquoi le pressostat
ne bouge pas ? Pourquoi je reste bloqué sur des images ? »

Le pressostat ne bougeait pas parce que je l'avais figé.

## Ce que le module fait maintenant

Chaque écran concerné affiche **le film**, positionné sur sa scène, en lecture. L'onglet
« ▶ Animation » remplace « Illustration Claude » ; « Schéma / activité » garde les
manipulations. Le film a sa barre de lecture : lecture, pause, retour au début, et une
réglette pour s'arrêter sur un instant précis — ce qu'un formateur fait en salle.

| Module | Écrans animés | Scènes |
|---|---:|---|
| KP1 BP | 7 | Ouverture · Soufflet · Contacts · Seuils · Réglage · Cycle · Récap |
| KP5 HP | 7 | idem, côté haute pression |
| KP15 | 3 | Ouverture · côté BP · côté HP |

Les réglages du film sont ceux du cours, passés en paramètres au composant :
BP `CUT IN 1,4 · DIFF 1,2 · CUT OUT 0,2`, HP `CUT OUT 24 · DIFF 3 · CUT IN 21`.

**Les modules sont plus légers qu'avec les images** : 459, 460 et 443 Ko contre 1,1 Mo,
1,1 Mo et 723 Ko. Le moteur embarqué (React, `animations-v3`, la pièce) pèse moins que les
dix-sept PNG qu'il remplace.

## Comment c'est monté

Le film vit dans un **cadre isolé** créé par le module. Deux raisons, les deux payées :

1. **Les globales.** Posé dans la page du module, `animations-v3` n'arrivait pas à
   s'installer — le moteur et les dessins du module déclarent les mêmes noms au premier
   niveau (`C`, `fmt`, `sample`, `Piece`…). Dans son cadre, il est seul.
2. **La chaîne de hauteurs.** Le rendu du moteur se cale sur `html > body`. Le cadre lui rend
   cette chaîne, et son `Stage` s'échelonne alors tout seul au panneau, par `ResizeObserver`.

Les sources partent en **JSON** et sont posées par `script.textContent`, jamais entre deux
balises. C'est ce qui évite que le `</script>` présent dans les commentaires du moteur ne
coupe le fichier en deux — piège payé trois fois avant d'être compris.

## Trois pièges à ne pas repayer

- **`replaceAll` interprète `$&`, `$'` et `` $` `` dans la chaîne de remplacement.** Le code
  minifié de React en contient : le `$'` réinjectait tout le reste de la coquille, jetons de
  génération compris, et l'assemblage échouait sans dire pourquoi. Les remplacements passent
  désormais par une fonction. Ne pas revenir à la forme courte.
- **Le moteur met TOUJOURS son horloge en pause quand on le déplace.** C'est voulu : il est
  prévu pour un hôte qui lui pousse le temps image par image (le film narré du site asservit
  ainsi son MP3). Il faut donc relancer la lecture après chaque placement.
- **Ne jamais juger « ça bouge » sur l'image affichée.** Deux instants voisins d'une même
  scène peuvent donner le même texte, et on met alors en pause un film qui tournait très
  bien. Le moteur écrit sa position d'horloge (`animstage-v3:t`) : c'est le seul signal
  fiable, et la QA s'en sert aussi.

## Ce que la QA vérifie désormais

180 contrôles statiques et **2 155** contrôles navigateur. Deux sont nouveaux et tiennent
lieu de garde-fou contre exactement cette erreur :

- **« le film avance tout seul »** — l'horloge du moteur doit progresser sans qu'on y touche ;
- **« aucune requête ne sort de la page »** — la page est ouverte en `file://` et rien n'en
  part : ni React, ni police, ni image. La promesse hors ligne est prouvée, plus déclarée.

La vieille garde interdisait le *mot* « react » dans la page. Elle interdit maintenant une
*adresse* distante, ce qui est la règle réelle.

## Ce qui reste

1. **Personne n'a encore regardé les trois films en entier**, ni écouté la voix.
2. **KP15, la scène de réglage** n'est rattachée à aucun écran : le composant y lit l'échelle
   RANGE du côté BP comme un CUT OUT, quand le module enseigne l'inverse. Le film reste
   atteignable à la réglette ; c'est la source qu'il faudrait reprendre.
3. Les **références Danfoss** citées restent à vérifier sur notice.
4. Les dix-sept PNG restent dans le paquet de travail comme trace de ce qui avait été reçu.
   Ils ne sont plus publiés, et plus référencés par aucun écran.

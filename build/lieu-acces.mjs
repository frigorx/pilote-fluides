/* =====================================================================
   lieu-acces.mjs — où vit le paquet des accès enseignant
   ---------------------------------------------------------------------
   Le registre nominatif, la clé racine et les codes délivrés vivent HORS
   DÉPÔT : pilote-fluides est public. Ce fichier dit l'endroit, et il est
   le SEUL à le dire.

   POURQUOI IL EXISTE
   Le chemin était recopié dans sept fichiers. Le jour où le paquet a
   déménagé vers `archives-inerweb`, les sept ont menti en silence : la
   console affichait zéro titulaire et zéro clé sans un mot d'erreur —
   et une délivrance aurait recréé un dossier neuf, redonné le numéro 001
   et tiré une racine nouvelle par-dessus l'ancienne. Un seul endroit,
   donc, et le déménagement suivant ne coûtera qu'une ligne.
   ===================================================================== */
export const BASE = "C:/archives-inerweb/paquets/acces-inerweb";
export const RACINE_ACCES = BASE + "/racine";
export const MILLESIMES = BASE + "/millesimes";

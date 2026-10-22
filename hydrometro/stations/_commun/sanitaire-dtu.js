/* Dimensionnement sanitaire : formules et DONNÉES DE CAS, en un seul endroit.
   Utilisé par les stations « sanitaire-distribution » (E5+a) et « sanitaire-evacuation » (E5+b).
   Aucun résultat n’est tapé : tout nombre calculé qu’affichent ces stations sort des fonctions ci-dessous.

   Ce que ce fichier contient (réécriture du 22/10/2026) :
   - des formules : coefficient de simultanéité, débit = vitesse × section, formule de Bazin (écoulement à surface libre) ;
   - les DONNÉES DE CAS, c’est-à-dire les valeurs qu’un sujet d’exercice donne pour un cas : le débit de base de cinq appareils
     (alimentation) et de cinq appareils (évacuation). Chaque exercice n’affiche que les valeurs de son cas, dans son énoncé.
   Il ne contient ni tableau de norme, ni série complète de diamètres. La méthode est celle du DTU 60.11 « Règles de calcul des
   installations de plomberie sanitaire et des installations d’évacuation des eaux pluviales », cité par son titre seulement : les
   valeurs de la vie réelle se lisent dans le dossier technique et la norme de l’établissement. */
(function (racine) {
  "use strict";

  const fr = (n, d = 2) => Number(n).toFixed(d).replace(".", ",");

  /* Alimentation : débit de base (l/s, eau froide) des appareils qui servent dans les cas de la station. */
  const ALIM = [
    { id: "evier",     nom: "Évier",          qb: 0.20 },
    { id: "lavabo",    nom: "Lavabo",         qb: 0.20 },
    { id: "douche",    nom: "Douche",         qb: 0.20 },
    { id: "baignoire", nom: "Baignoire",      qb: 0.33 },
    { id: "wc",        nom: "WC à réservoir", qb: 0.12 }
  ];

  /* Vitesse maximale de l’eau (m/s) imposée par le sujet de l’exercice d’alimentation. */
  const VMAX = 1.5;

  /* Évacuation : débit de base d’évacuation (l/s) des appareils qui servent dans les cas de la station. */
  const EVAC = [
    { id: "baignoire", nom: "Baignoire", qe: 1.2 },
    { id: "douche",    nom: "Douche",    qe: 0.5 },
    { id: "lavabo",    nom: "Lavabo",    qe: 0.75 },
    { id: "evier",     nom: "Évier",     qe: 0.75 },
    { id: "wc",        nom: "WC",        qe: 1.5 }
  ];

  /* Diamètre intérieur minimal (mm) d’une chute qui reçoit un WC, tel que le sujet de l’exercice le fixe. */
  const CHUTE_AVEC_WC = 90;

  /* Coefficient de simultanéité : y = 0,8 ÷ √(x − 1), pour x > 5 appareils. */
  function coeff(x) { return 0.8 / Math.sqrt(x - 1); }

  /* liste = [{ id, n }] ; table = ALIM ou EVAC ; cle = "qb" ou "qe". */
  function somme(liste, table, cle) {
    return liste.reduce((s, l) => s + l.n * table.find((t) => t.id === l.id)[cle], 0);
  }
  function nombre(liste) { return liste.reduce((s, l) => s + l.n, 0); }

  /* Diamètre intérieur minimal (mm) pour un débit Q (l/s) à la vitesse v (m/s) : Q = v × π d² / 4. */
  function dintMini(Q, v) { return 1000 * Math.sqrt(4 * (Q / 1000) / (Math.PI * v)); }
  /* Vitesse (m/s) de Q (l/s) dans un tube de Ø intérieur d (mm). */
  function vitesse(Q, d) { return (Q / 1000) / (Math.PI * Math.pow(d / 1000, 2) / 4); }
  /* Section de passage (m²) pour un débit Q (l/s) à la vitesse v (m/s) : S = Q ÷ v, avec Q en m³/s. */
  function section(Q, v) { return (Q / 1000) / v; }
  /* Section (m²) d’un tube de Ø intérieur d (mm) : S = π × d² ÷ 4. */
  function sectionTube(d) { return Math.PI * Math.pow(d / 1000, 2) / 4; }
  /* Plus petit diamètre de la liste proposée par le sujet qui couvre le diamètre minimal dmini (null s’il n’y en a pas). */
  function auMoins(dmini, liste) { return liste.find((d) => d >= dmini) ?? null; }
  /* Diamètre qui suit d dans la liste proposée par le sujet (null si d est le dernier). */
  function suivant(d, liste) { return liste.find((x) => x > d) ?? null; }

  /* Formule de Bazin (hydraulique générale, écoulement à surface libre dans un tuyau circulaire) :
     Q = 87 × RH × √i ÷ (γ + √RH) × SM, avec γ = 0,16 pour des eaux usées.
     Dint en mm, pente en cm par mètre, remplissage h/D (0,5 : le tuyau est rempli à mi-hauteur). Retourne le débit en l/s. */
  function bazin(dint, pente, remplissage) {
    const D = dint / 1000, i = pente / 100, h = remplissage === undefined ? 0.5 : remplissage;
    const th = 2 * Math.acos(1 - 2 * h);
    const SM = D * D / 8 * (th - Math.sin(th));
    const RH = SM / (D * th / 2);
    return 1000 * 87 * RH * Math.sqrt(i) / (0.16 + Math.sqrt(RH)) * SM;
  }
  /* Capacité (l/s) d’un diamètre pour la pente du sujet, arrondie au centième : c’est le nombre que le sujet affiche. */
  function capacite(dint, pente) { return Math.round(bazin(dint, pente) * 100) / 100; }
  /* Premier diamètre de la liste du sujet dont la capacité couvre Q (null si aucun). */
  function collecteur(Q, pente, liste) {
    const d = liste.find((x) => capacite(x, pente) >= Q);
    return d === undefined ? null : { dint: d, capacite: capacite(d, pente) };
  }

  racine.SanitaireDTU = {
    fr, ALIM, VMAX, EVAC, CHUTE_AVEC_WC,
    coeff, somme, nombre, dintMini, vitesse, section, sectionTube, auMoins, suivant, bazin, capacite, collecteur
  };
})(typeof window !== "undefined" ? window : globalThis);

"use strict";

// Registre statique nécessaire au fonctionnement par double-clic (file://).
// tests/qa.mjs vérifie chaque entrée contre le manifest.json du module associé.
globalThis.HydroModules = {
  stations: {
    boucle: { href: "stations/boucle/index.html", owner: "P", status: "QA TECHNIQUE" },
    energie: { href: "stations/energie/index.html", owner: "P", status: "QA TECHNIQUE" },
    debit: { href: "stations/debit/index.html", owner: "P", status: "QA TECHNIQUE" },
    "delta-t": { href: "stations/delta-t/index.html", owner: "P", status: "QA TECHNIQUE" },
    puissance: { href: "stations/puissance/index.html", owner: "P", status: "QA TECHNIQUE" },
    mesurer: { href: "stations/mesurer/index.html", owner: "P", status: "QA TECHNIQUE" },
    production: { href: "stations/production/index.html", owner: "E", status: "QA TECHNIQUE" },
    echangeur: { href: "stations/echangeur/index.html", owner: "E", status: "QA TECHNIQUE" },
    circulateur: { href: "stations/circulateur/index.html", owner: "E", status: "QA TECHNIQUE" },
    pertes: { href: "stations/pertes/index.html", owner: "E", status: "QA TECHNIQUE" },
    vase: { href: "stations/vase/index.html", owner: "E", status: "QA TECHNIQUE" },
    securite: { href: "stations/securite/index.html", owner: "E", status: "QA TECHNIQUE" },
    monotube: { href: "stations/monotube/index.html", owner: "D", status: "QA TECHNIQUE" },
    bitube: { href: "stations/bitube/index.html", owner: "D", status: "QA TECHNIQUE" },
    v3v: { href: "stations/v3v/index.html", owner: "D", status: "QA TECHNIQUE" },
    equilibrage: { href: "stations/equilibrage/index.html", owner: "D", status: "QA TECHNIQUE" },
    plancher: { href: "stations/plancher/index.html", owner: "D", status: "QA TECHNIQUE" },
    releves: { href: "stations/releves/index.html", owner: "M", status: "QA TECHNIQUE" },
    tampon: { href: "stations/tampon/index.html", owner: "M", status: "QA TECHNIQUE" },
    decouplage: { href: "stations/decouplage/index.html", owner: "M", status: "QA TECHNIQUE" },
    diagnostic: { href: "stations/diagnostic/index.html", owner: "M", status: "QA TECHNIQUE" },
    mission: { href: "stations/mission/index.html", owner: "M", status: "QA TECHNIQUE" }
  },
  lines: {
    P: { href: "lignes/P/parcours.html", status: "QA TECHNIQUE" },
    E: { href: "lignes/E/parcours.html", status: "QA TECHNIQUE" },
    D: { href: "lignes/D/parcours.html", status: "QA TECHNIQUE" },
    M: { href: "lignes/M/parcours.html", status: "QA TECHNIQUE" }
  }
};

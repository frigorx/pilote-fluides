from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import numpy as np
import soundfile as sf


def arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Vérifie le lot MP3 de Pilote Fluides.")
    parser.add_argument("--corpus", type=Path, default=Path(__file__).with_name("corpus.json"))
    parser.add_argument("--audio", type=Path, required=True)
    parser.add_argument("--index", type=Path, required=True)
    return parser.parse_args()


def lire_index(path: Path) -> dict:
    source = path.read_text(encoding="utf-8")
    match = re.search(r"window\.PILOTE_VOIX_INDEX\s*=\s*(\{[\s\S]*\})\s*;\s*$", source)
    if not match:
        raise ValueError(f"index illisible : {path}")
    return json.loads(match.group(1))


def main() -> None:
    args = arguments()
    corpus = json.loads(args.corpus.read_text(encoding="utf-8"))
    index = lire_index(args.index)
    frequence_attendue = int(index.get("frequenceHz", 24000))
    erreurs: list[str] = []
    duree = 0.0
    octets = 0

    for narration in corpus["narrations"]:
        key = narration["cle"]
        path = args.audio / f"{key}.mp3"
        if not path.exists():
            erreurs.append(f"absent : {path.name}")
            continue
        try:
            samples, sample_rate = sf.read(path, dtype="float32")
        except Exception as exc:  # le détail du décodeur est utile au contrôle
            erreurs.append(f"illisible : {path.name} ({exc})")
            continue
        if sample_rate != frequence_attendue:
            erreurs.append(f"fréquence inattendue : {path.name} ({sample_rate} Hz)")
        if samples.size == 0 or not np.isfinite(samples).all():
            erreurs.append(f"signal vide ou non fini : {path.name}")
            continue
        seconds = samples.size / sample_rate
        rms = float(np.sqrt(np.mean(np.square(samples))))
        if seconds < 0.2 or rms < 0.002:
            erreurs.append(f"signal anormal : {path.name} ({seconds:.2f} s, RMS {rms:.4f})")
        duree += seconds
        octets += path.stat().st_size

    entrees = index.get("entrees", {})
    attendues = {item["cle"] for item in corpus["narrations"]}
    if set(entrees) != attendues:
        erreurs.append(f"index incomplet : {len(entrees)}/{len(attendues)} entrées")
    if index.get("narrationsAttendues") != len(attendues):
        erreurs.append("compteur narrationsAttendues incohérent")

    if erreurs:
        print("ÉCHEC DU LOT AUDIO")
        for erreur in erreurs[:30]:
            print(f"- {erreur}")
        if len(erreurs) > 30:
            print(f"- … {len(erreurs) - 30} autres erreurs")
        raise SystemExit(1)

    print(
        f"Lot audio valide : {len(attendues)} MP3, "
        f"{duree / 3600:.2f} h, {octets / 1024 / 1024:.1f} Mio."
    )


if __name__ == "__main__":
    main()

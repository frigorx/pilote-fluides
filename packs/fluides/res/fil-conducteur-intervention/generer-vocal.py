from __future__ import annotations

import argparse
import json
from pathlib import Path

import lameenc
import numpy as np
from piper import PiperVoice, SynthesisConfig


def encoder_mp3(samples: np.ndarray, sample_rate: int, bitrate: int) -> bytes:
    pcm = np.clip(samples, -1.0, 1.0)
    pcm = (pcm * 32767.0).astype("<i2", copy=False).tobytes()
    encoder = lameenc.Encoder()
    encoder.set_bit_rate(bitrate)
    encoder.set_in_sample_rate(sample_rate)
    encoder.set_channels(1)
    encoder.set_quality(2)
    return encoder.encode(pcm) + encoder.flush()


def synthetiser(voice: PiperVoice, texte: str, config: SynthesisConfig) -> np.ndarray:
    morceaux = [
        np.asarray(chunk.audio_float_array, dtype=np.float32)
        for chunk in voice.synthesize(texte, syn_config=config)
    ]
    if not morceaux:
        raise RuntimeError("Piper n'a produit aucun échantillon audio.")
    return np.concatenate(morceaux)


def main() -> None:
    parser = argparse.ArgumentParser(description="Génère le vocal synchronisé de la slide.")
    parser.add_argument("--model", required=True, type=Path)
    parser.add_argument("--config", required=True, type=Path)
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--length-scale", type=float, default=0.86)
    parser.add_argument("--bitrate", type=int, default=64)
    args = parser.parse_args()

    source = json.loads(args.source.read_text(encoding="utf-8"))
    segments = source["segments"]
    duree_cible = float(source["dureeCibleSecondes"])
    voice = PiperVoice.load(args.model, config_path=args.config)
    config = SynthesisConfig(length_scale=args.length_scale, normalize_audio=True)
    sample_rate = voice.config.sample_rate
    piste = np.zeros(int(round(duree_cible * sample_rate)), dtype=np.float32)
    rapport: list[dict[str, object]] = []

    for index, segment in enumerate(segments):
        debut = float(segment["debut"])
        audio = synthetiser(voice, segment["texte"], config)
        debut_echantillon = int(round(debut * sample_rate))
        fin_echantillon = debut_echantillon + len(audio)
        prochain_debut = (
            float(segments[index + 1]["debut"])
            if index + 1 < len(segments)
            else duree_cible
        )
        limite = int(round((prochain_debut - 0.10) * sample_rate))
        if fin_echantillon > limite:
            duree = len(audio) / sample_rate
            raise RuntimeError(
                f"Le segment {index + 1} ({duree:.2f} s) dépasse son créneau. "
                "Réduire --length-scale ou condenser le texte."
            )

        fondu = min(int(sample_rate * 0.025), len(audio) // 2)
        if fondu:
            audio[:fondu] *= np.linspace(0.0, 1.0, fondu, dtype=np.float32)
            audio[-fondu:] *= np.linspace(1.0, 0.0, fondu, dtype=np.float32)
        piste[debut_echantillon:fin_echantillon] += audio
        rapport.append(
            {
                "etape": segment["etape"],
                "debut": debut,
                "duree": round(len(audio) / sample_rate, 2),
                "fin": round(fin_echantillon / sample_rate, 2),
            }
        )

    sommet = float(np.max(np.abs(piste)))
    if sommet > 0.98:
        piste *= 0.98 / sommet

    args.output.write_bytes(encoder_mp3(piste, sample_rate, args.bitrate))
    print(
        json.dumps(
            {
                "fichier": str(args.output),
                "frequenceHz": sample_rate,
                "dureeSecondes": duree_cible,
                "vitesse": args.length_scale,
                "segments": rapport,
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()

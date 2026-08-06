from __future__ import annotations

import argparse
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self) -> None:  # noqa: N802 — nom imposé par http.server
        print(self.path, flush=True)
        super().do_GET()
        if self.path.split("?", 1)[0].endswith(".mp3"):
            threading.Thread(target=self.server.shutdown, daemon=True).start()


def main() -> None:
    parser = argparse.ArgumentParser(description="Attend la première narration MP3 demandée par le navigateur.")
    parser.add_argument("--port", type=int, default=8771)
    parser.add_argument("--timeout", type=float, default=30)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    handler = lambda *values, **kwargs: Handler(*values, directory=root, **kwargs)  # noqa: E731
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    timer = threading.Timer(args.timeout, server.shutdown)
    timer.start()
    print(f"Test vocal sur http://127.0.0.1:{args.port}", flush=True)
    server.serve_forever()
    timer.cancel()
    print("Serveur de test arrêté.", flush=True)


if __name__ == "__main__":
    main()

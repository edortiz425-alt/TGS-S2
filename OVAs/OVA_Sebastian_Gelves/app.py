"""Servidor local para la OVA de Teoria General de Sistemas.

Ejecuta:
    python app.py

Luego abre:
    http://127.0.0.1:8000
"""

from __future__ import annotations

import argparse
import json
import socket
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


PROJECT_ROOT = Path(__file__).resolve().parent

METADATA = {
    "titulo": "OVA - Propiedades de los sistemas",
    "autor": "Gelves Triana Sebastian",
    "asignatura": "Teoria General de Sistemas",
    "tema": "6. Propiedades de los sistemas",
    "version": "1.0.0",
}


class OVARequestHandler(SimpleHTTPRequestHandler):
    """Sirve la OVA y expone metadatos simples para la interfaz."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def do_GET(self) -> None:
        parsed_path = urlparse(self.path)
        if parsed_path.path in {"/", "/ova", "/index"}:
            self.path = "/index.html"
            return super().do_GET()

        if parsed_path.path == "/api/metadata":
            payload = json.dumps(METADATA, ensure_ascii=False, indent=2).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return

        return super().do_GET()

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def log_message(self, format: str, *args) -> None:
        print(f"[OVA] {self.address_string()} - {format % args}")


def port_is_available(host: str, port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
        probe.settimeout(0.3)
        return probe.connect_ex((host, port)) != 0


def find_port(host: str, preferred_port: int) -> int:
    for port in range(preferred_port, preferred_port + 50):
        if port_is_available(host, port):
            return port
    raise RuntimeError("No hay puertos disponibles en el rango probado.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Servidor local para la OVA.")
    parser.add_argument("--host", default="127.0.0.1", help="Host local del servidor.")
    parser.add_argument("--port", type=int, default=8000, help="Puerto inicial.")
    parser.add_argument("--open", action="store_true", help="Abrir navegador automaticamente.")
    args = parser.parse_args()

    port = find_port(args.host, args.port)
    server = ThreadingHTTPServer((args.host, port), OVARequestHandler)
    url = f"http://{args.host}:{port}"

    print("=" * 62)
    print("OVA lista en localhost")
    print(f"URL: {url}")
    print("Presiona Ctrl+C para detener el servidor.")
    print("=" * 62)

    if args.open:
        webbrowser.open(url)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

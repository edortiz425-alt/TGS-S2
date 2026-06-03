"""Genera la ficha tecnica en PDF sin dependencias externas."""

from __future__ import annotations

import textwrap
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "ficha_tecnica_ova.pdf"

CONTENT = [
    ("Ficha tecnica del proyecto", 18),
    ("Objeto Virtual de Aprendizaje (OVA)", 13),
    ("", 11),
    ("Datos generales", 14),
    ("Proyecto: Objeto Virtual de Aprendizaje", 11),
    ("Tema: 6. Propiedades de los sistemas", 11),
    ("Autor: Gelves Triana Sebastian", 11),
    ("Asignatura: Teoria General de Sistemas", 11),
    ("Formato: pagina web interactiva para localhost y publicacion web", 11),
    ("", 11),
    ("Objetivo general", 14),
    ("Disenar e implementar una OVA funcional, accesible y didactica que explique las propiedades de los sistemas y permita practicar el tema mediante recursos interactivos.", 11),
    ("", 11),
    ("Objetivos especificos", 14),
    ("- Sintetizar el marco conceptual de las propiedades de los sistemas.", 11),
    ("- Relacionar sinergia, totalidad, retroalimentacion, emergencia, entropia, limites, entorno, jerarquia y equifinalidad con casos reales.", 11),
    ("- Incorporar ejercicios con retroalimentacion, juegos y quiz automatico.", 11),
    ("- Preparar el proyecto para ejecucion local y publicacion en una plataforma web.", 11),
    ("", 11),
    ("Herramientas usadas", 14),
    ("- Python 3 para servidor local.", 11),
    ("- HTML5, CSS3 y JavaScript.", 11),
    ("- Canvas para simulaciones visuales.", 11),
    ("- SVG local como mapa conceptual.", 11),
    ("- Apoyo de IA para generacion y organizacion del codigo.", 11),
    ("", 11),
    ("Componentes de la OVA", 14),
    ("Contextualizacion, marco teorico, ejemplos aplicados, simulador, glosario buscable, mision integradora Campus Vivo, modelo iceberg, radar sistemico, ejercicios, tres juegos interactivos, videos reales de YouTube, pasaporte de progreso, credencial imprimible, quiz automatico, creditos y referencias.", 11),
    ("", 11),
    ("Referencias", 14),
    ("von Bertalanffy, L. (1968). General System Theory: Foundations, Development, Applications. George Braziller.", 11),
    ("Meadows, D. H. (2008). Thinking in Systems: A Primer. Chelsea Green Publishing.", 11),
    ("Checkland, P. (1981). Systems Thinking, Systems Practice. John Wiley & Sons.", 11),
    ("Arnold, R. D., & Wade, J. P. (2015). A Definition of Systems Thinking: A Systems Approach. Procedia Computer Science, 44, 669-678. https://doi.org/10.1016/j.procs.2015.03.050", 11),
    ("Donella Meadows Project. Systems Thinking Resources. https://donellameadows.org/systems-thinking-resources/", 11),
    ("Donella Meadows Project. Sustainable Systems Lecture. https://donellameadows.org/sustainable-systems-videos/", 11),
    ("Videos de YouTube verificados: https://www.youtube.com/watch?v=A_BtS008J0k, https://www.youtube.com/watch?v=HMmChiLZZHg y https://www.youtube.com/watch?v=HuIoego-xVc", 11),
]


def escape_pdf_text(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def build_pages() -> list[list[tuple[str, int]]]:
    pages: list[list[tuple[str, int]]] = [[]]
    line_count = 0
    for text, size in CONTENT:
        wrapped = textwrap.wrap(text, width=92) or [""]
        for line in wrapped:
            if line_count >= 43:
                pages.append([])
                line_count = 0
            pages[-1].append((line, size))
            line_count += 2 if size >= 14 else 1
    return pages


def stream_for_page(lines: list[tuple[str, int]]) -> bytes:
    y = 780
    commands = ["BT", "/F1 11 Tf"]
    for text, size in lines:
        leading = int(size * 1.45)
        if size >= 14:
            y -= 8
        commands.append(f"/F1 {size} Tf")
        commands.append(f"50 {y} Td ({escape_pdf_text(text)}) Tj")
        commands.append(f"-50 -{leading} Td")
        y -= leading
    commands.append("ET")
    return "\n".join(commands).encode("cp1252", errors="replace")


def make_pdf() -> bytes:
    pages = build_pages()
    objects: list[bytes] = []
    catalog_id = 1
    pages_id = 2
    font_id = 3

    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    objects.append(b"")
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")

    page_ids = []
    for page_lines in pages:
        stream = stream_for_page(page_lines)
        content_id = len(objects) + 2
        page_id = len(objects) + 1
        page_ids.append(page_id)
        page = (
            f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 612 792] "
            f"/Resources << /Font << /F1 {font_id} 0 R >> >> /Contents {content_id} 0 R >>"
        ).encode("ascii")
        content = b"<< /Length " + str(len(stream)).encode("ascii") + b" >>\nstream\n" + stream + b"\nendstream"
        objects.append(page)
        objects.append(content)

    kids = " ".join(f"{page_id} 0 R" for page_id in page_ids)
    objects[pages_id - 1] = f"<< /Type /Pages /Kids [{kids}] /Count {len(page_ids)} >>".encode("ascii")

    output = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for index, obj in enumerate(objects, start=1):
        offsets.append(len(output))
        output.extend(f"{index} 0 obj\n".encode("ascii"))
        output.extend(obj)
        output.extend(b"\nendobj\n")

    xref_offset = len(output)
    output.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    output.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        output.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    output.extend(
        (
            "trailer\n"
            f"<< /Size {len(objects) + 1} /Root {catalog_id} 0 R >>\n"
            "startxref\n"
            f"{xref_offset}\n"
            "%%EOF\n"
        ).encode("ascii")
    )
    return bytes(output)


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_bytes(make_pdf())
    print(f"PDF generado: {OUTPUT}")


if __name__ == "__main__":
    main()

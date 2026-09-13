#!/usr/bin/env python3
"""Build public/og.png from the strings the site actually renders.

Every share of jarrodtran.com — a recruiter forwarding it in Slack, a LinkedIn
message, an iMessage preview — renders this card, often before anyone opens the
page. So it must never drift from the fold. It cannot: this script reads its copy
out of `out/index.html`, the built page, rather than keeping its own copy.

Prerequisites (developer machine, not CI — the PNG is committed):
    pnpm build                       # produces out/index.html
    pip install pillow
    Geist ships in node_modules; Instrument Serif is fetched once and cached
    under .cache/ (gitignored).

    python3 scripts/build-og.py
"""

from __future__ import annotations

import html
import re
import sys
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BUILT_PAGE = ROOT / "out" / "index.html"
OUT = ROOT / "public" / "og.png"
CACHE = ROOT / ".cache"

GEIST = ROOT / "node_modules" / "geist" / "dist" / "fonts" / "geist-sans"
INSTRUMENT_SERIF_URL = "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf"

# Must match src/app/globals.css and src/content.ts site.ogImage.
W, H = 1200, 630
BG = "#f5f0e6"
INK = "#1c1a17"
MUTED = "#534e46"
HAIRLINE = "#e4d9c8"

PAD_X = 80
RAIL_X = 830


# --------------------------------------------------------------------------
# Copy, read off the built page
# --------------------------------------------------------------------------


def strip_tags(fragment: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", fragment)).strip()


def slot(markup: str, name: str) -> str:
    """Text of the first element carrying data-slot="<name>"."""
    return strip_tags(slot_markup(markup, name))


def slot_markup(markup: str, name: str) -> str:
    match = re.search(
        rf'<(\w+)[^>]*data-slot="{name}"[^>]*>(.*?)</\1>', markup, re.S
    )
    if not match:
        sys.exit(f'build-og: no data-slot="{name}" in {BUILT_PAGE}')
    return match.group(2)


def employers(markup: str) -> str:
    """The employer strip. Its mid-dots are CSS `::after`, so rejoin the items."""
    items = re.findall(
        r"<li.*?>(.*?)</li>", slot_markup(markup, "employers"), re.S
    )
    if not items:
        sys.exit("build-og: employer strip held no items")
    return "  ·  ".join(strip_tags(item) for item in items)


def chips(markup: str) -> list[tuple[str, str]]:
    """(metric, label) for each hero proof chip, in render order."""
    block = re.search(
        r'<ul[^>]*data-slot="proof-chips"[^>]*>(.*?)</ul>', markup, re.S
    )
    if not block:
        sys.exit("build-og: no proof-chips list in the built page")
    out: list[tuple[str, str]] = []
    for cell in re.findall(r"<li.*?</li>", block.group(1), re.S):
        metric = re.search(r'data-slot="metric"[^>]*>(.*?)</span>', cell, re.S)
        label = re.search(r'data-slot="chip-label"[^>]*>(.*?)</span>', cell, re.S)
        if metric and label:
            out.append((strip_tags(metric.group(1)), strip_tags(label.group(1))))
    if not out:
        sys.exit("build-og: proof-chips list held no metric/label pairs")
    return out


def read_copy() -> dict[str, object]:
    if not BUILT_PAGE.exists():
        sys.exit(f"build-og: {BUILT_PAGE} is missing — run `pnpm build` first")
    markup = BUILT_PAGE.read_text(encoding="utf-8")
    heading = re.search(r"<h1[^>]*>(.*?)</h1>", markup, re.S)
    if not heading:
        sys.exit("build-og: no <h1> in the built page")
    return {
        "name": strip_tags(heading.group(1)),
        "title": slot(markup, "title"),
        "company": slot(markup, "current-company"),
        "mapping": slot(markup, "mapping"),
        "location": slot(markup, "location"),
        "employers": employers(markup),
        "chips": chips(markup),
    }


# --------------------------------------------------------------------------
# Fonts
# --------------------------------------------------------------------------


def serif_path() -> Path:
    cached = CACHE / "InstrumentSerif-Regular.ttf"
    if not cached.exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(INSTRUMENT_SERIF_URL, timeout=30) as response:
            cached.write_bytes(response.read())
    return cached


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = serif_path() if name == "serif" else GEIST / f"Geist-{name}.ttf"
    if not Path(path).exists():
        sys.exit(f"build-og: font missing at {path} — run `pnpm install`")
    return ImageFont.truetype(str(path), size)


# --------------------------------------------------------------------------
# Drawing
# --------------------------------------------------------------------------


def wrap(
    draw: ImageDraw.ImageDraw, text: str, typeface: ImageFont.FreeTypeFont, width: int
) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        trial = word if not current else f"{current} {word}"
        if draw.textlength(trial, font=typeface) <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    typeface: ImageFont.FreeTypeFont,
    fill: str,
    tracking: float,
) -> None:
    """The caps labels carry 0.14em tracking on the site; Pillow has none."""
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=typeface, fill=fill)
        x += draw.textlength(char, font=typeface) + tracking


def main() -> None:
    copy = read_copy()
    canvas = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(canvas)

    name_font = font("serif", 112)
    title_font = font("Regular", 30)
    mapping_font = font("Regular", 33)
    meta_font = font("Regular", 25)
    employer_font = font("Regular", 28)
    lead_font = font("Medium", 60)
    metric_font = font("Medium", 42)
    label_font = font("SemiBold", 15)

    measure = RAIL_X - PAD_X - 64

    y = 102
    draw.text((PAD_X, y), str(copy["name"]), font=name_font, fill=INK)
    y += 136

    # "Manager, AI & Factory Strategy · Tesla" — employer in ink, like the fold.
    title = str(copy["title"])
    company = str(copy["company"])
    role = (
        title[: -len(company)].rstrip(" ·").strip()
        if title.endswith(company)
        else title
    )
    draw.text((PAD_X, y), role, font=title_font, fill=MUTED)
    x = PAD_X + draw.textlength(role, font=title_font)
    draw.text((x, y), "  ·  ", font=title_font, fill=MUTED)
    x += draw.textlength("  ·  ", font=title_font)
    draw.text((x, y), company, font=title_font, fill=INK)
    y += 68

    for line in wrap(draw, str(copy["mapping"]), mapping_font, measure):
        draw.text((PAD_X, y), line, font=mapping_font, fill=INK)
        y += 48
    y += 22

    draw.text((PAD_X, y), str(copy["location"]), font=meta_font, fill=MUTED)
    y += 62

    draw.text((PAD_X, y), str(copy["employers"]), font=employer_font, fill=INK)

    # Fact rail: same order and no dividers, matching the ≥1024 hero rail.
    ry = 120
    for index, (metric, label) in enumerate(list(copy["chips"])):
        figure_font = lead_font if index == 0 else metric_font
        draw.text((RAIL_X, ry), metric, font=figure_font, fill=INK)
        ry += figure_font.size + 16
        for line in wrap(draw, label.upper(), label_font, W - RAIL_X - PAD_X):
            tracked(draw, (RAIL_X, ry), line, label_font, MUTED, 2.1)
            ry += 22
        ry += 40

    canvas.save(OUT, optimize=True)
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} kB)")


if __name__ == "__main__":
    main()

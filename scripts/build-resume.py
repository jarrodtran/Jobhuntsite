#!/usr/bin/env python3
"""Build public/resume.pdf as one US Letter page matching the site fold."""

from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "resume.pdf"
FONT_DIR = Path("/usr/share/fonts/truetype/liberation")

pdfmetrics.registerFont(TTFont("Sans", str(FONT_DIR / "LiberationSans-Regular.ttf")))
pdfmetrics.registerFont(TTFont("Sans-Bold", str(FONT_DIR / "LiberationSans-Bold.ttf")))

PAGE_W, PAGE_H = letter
LEFT = 54
RIGHT = PAGE_W - 54
WIDTH = RIGHT - LEFT
TOP = PAGE_H - 40
BOTTOM = 34
INK = (0.04, 0.04, 0.04)
MUTED = (0.32, 0.32, 0.36)

SUMMARY = (
    "Strategy & Operations and Technical Program Manager. Currently running AI "
    "adoption at Tesla Energy manufacturing scale: as-is to to-be, ship, then "
    "hand off to a sustaining team. Lead a forward-deployed applied AI team for "
    "custom buildouts, with factory strategy and NPI cost-down beside that work. "
    "Prior Waymo Strategy & Operations, Apple iPhone India launch, Tesla 4680 "
    "special projects, Amazon fulfillment ops."
)

RESULTS = [
    "Tesla: AI enablement across 10,000 Energy Manufacturing employees; forward-deployed applied AI team (20+ tools, 1,000+ users, ~$1.6M productivity)",
    "Tesla: led 12-month NPI cost-down, $260M annualized; $156M incremental annual profit on a $23M / 50+ initiative book; Megapack 3.2×",
    "Tesla: $550M projected tariff exposure mitigated",
    "Apple: India revenue $2B to $10B; units 4.3M to 16.9M; exports 6 to 40+ countries",
]

ROLES = [
    (
        "Tesla  |  Manager, AI & Factory Strategy  |  Aug 2023 – Present",
        [
            "Lead AI enablement across Tesla Energy Manufacturing (10,000 employees): as-is to to-be to ship to hand-off to a sustaining team.",
            "Stand up a forward-deployed applied AI team for custom buildouts (20+ tools, 1,000+ active users, ~$1.6M productivity). Hiring manager for that team.",
            "Lead a 12-month NPI cost-down across materials, labor, and supplier contracts: $260M annualized cost-down, $156M incremental annual profit, on a $23M / 50+ initiative book. Megapack scale 3.2×.",
            "Mitigated $550M in projected tariff exposure by redesigning build plans and establishing FTZ / bonded-warehouse / product-changeover infrastructure.",
            "Own strategy on what we build, where we build it, and when we launch, plus regulatory and cost mitigation.",
        ],
    ),
    (
        "Waymo  |  Strategy & Operations Manager  |  Oct 2022 – May 2023",
        [
            "Translated Engineering Operations priorities into one decision system across hardware, software, fleet, product, and legal so leadership could move without ad-hoc reporting.",
            "Installed annual planning, OKRs, resource plans, business reviews, and decision milestones that surfaced bottlenecks without ad-hoc reporting.",
        ],
    ),
    (
        "Apple  |  Strategic Operations Program Manager  |  Jun 2021 – Jun 2022",
        [
            "Built the zero-to-one operating system for iPhone manufacturing in India under exacting quality, regulatory, and timing requirements.",
            "Shipped the ramp the operating system ran: revenue $2B to $10B, units 4.3M to 16.9M, exports expanded from 6 to 40+ countries.",
        ],
    ),
    (
        "Tesla  |  Program Manager, Special Projects  |  Jun 2018 – Jun 2021",
        [
            "Advanced Project Roadrunner (4680) from early battery-cell pilot to a production-ready platform.",
            "Installed stage gates, readiness reviews, and supplier coordination, then handed cross-functional launch ownership to engineering, production, and supply chain.",
            "Sustained Model 3 / Model Y rates through demand surges and supply disruptions.",
            "Designed and launched a $3.5M/month Warehouse on Wheels logistics platform protecting battery and drivetrain flow.",
        ],
    ),
    (
        "Amazon  |  Operations Area Manager  |  Mar 2017 – Apr 2018",
        [
            "Led a team of 100+ associates in a high-volume fulfillment center.",
        ],
    ),
]

SKILLS = (
    "Strategy & Operations  |  Technical Program Manager  |  AI enablement and adoption  |  "
    "Factory and operating strategy  |  Launch readiness  |  Capacity and cost economics  |  "
    "Zero-to-one manufacturing launches"
)


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        if pdfmetrics.stringWidth(trial, font, size) <= width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines or [""]


class Pen:
    def __init__(self, pdf: canvas.Canvas):
        self.pdf = pdf
        self.y = TOP

    def gap(self, amount: float) -> None:
        self.y -= amount

    def text(self, value: str, font: str, size: float, leading: float, color=INK) -> None:
        self.pdf.setFillColorRGB(*color)
        self.pdf.setFont(font, size)
        self.pdf.drawString(LEFT, self.y - size, value)
        self.y -= leading

    def heading(self, value: str) -> None:
        self.gap(8)
        self.text(value, "Sans-Bold", 9.5, 16)

    def para(self, value: str, font: str, size: float, leading: float, indent: float = 0) -> None:
        self.pdf.setFillColorRGB(*INK)
        self.pdf.setFont(font, size)
        for line in wrap(value, font, size, WIDTH - indent):
            if self.y - size < BOTTOM:
                raise SystemExit(f"overflow at {self.y:.1f}: {line!r}")
            self.pdf.drawString(LEFT + indent, self.y - size, line)
            self.y -= leading

    def bullets(self, items: list[str], size: float = 10, leading: float = 12.6) -> None:
        bullet_x = LEFT
        text_x = LEFT + 10
        width = WIDTH - 10
        self.pdf.setFillColorRGB(*INK)
        self.pdf.setFont("Sans", size)
        for item in items:
            lines = wrap(item, "Sans", size, width)
            baseline = self.y - size
            if baseline < BOTTOM:
                raise SystemExit(f"overflow at {self.y:.1f}: {item!r}")
            self.pdf.drawString(bullet_x, baseline, "•")
            for i, line in enumerate(lines):
                baseline = self.y - size
                if baseline < BOTTOM:
                    raise SystemExit(f"overflow at {self.y:.1f}: {line!r}")
                self.pdf.drawString(text_x, baseline, line)
                self.y -= leading if i < len(lines) - 1 else leading


def main() -> None:
    pdf = canvas.Canvas(str(OUT), pagesize=letter)
    pdf.setTitle("Jarrod Tran - Strategy & Operations, Technical Program Manager")
    pdf.setAuthor("Jarrod Tran")
    pen = Pen(pdf)

    pen.text("Jarrod Tran", "Sans-Bold", 17.5, 20)
    pen.text("Manager, AI & Factory Strategy", "Sans-Bold", 11, 14)
    pen.text(
        "Houston  |  jarrodtran@outlook.com  |  linkedin.com/in/jarrodtran  |  jarrodtran.com",
        "Sans",
        9.5,
        12,
        MUTED,
    )

    pen.heading("SUMMARY")
    pen.para(SUMMARY, "Sans", 10, 12.6)

    pen.heading("SELECTED RESULTS")
    pen.bullets(RESULTS)

    pen.heading("EXPERIENCE")
    for i, (header, bullets) in enumerate(ROLES):
        if i:
            pen.gap(4)
        pen.text(header, "Sans-Bold", 10.2, 13.8)
        pen.bullets(bullets)

    pen.heading("SKILLS")
    pen.para(SKILLS, "Sans", 10, 12.6)

    pen.heading("EDUCATION")
    pen.text(
        "University at Buffalo. B.S. Business Administration, Finance (Cum Laude)",
        "Sans",
        10,
        12.6,
    )

    pdf.save()
    print(f"wrote {OUT}  y={pen.y:.1f}")


if __name__ == "__main__":
    main()

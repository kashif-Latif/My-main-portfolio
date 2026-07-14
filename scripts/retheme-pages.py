#!/usr/bin/env python3
"""Apply theme token replacements across remaining page files."""
import re
from pathlib import Path

PAGES_DIR = Path("/home/z/my-project/src/components/portfolio/pages")
FILES = ["projects-page.tsx", "journey-page.tsx", "github-page.tsx", "contact-page.tsx"]

REPLACEMENTS = [
    # Gradient text -> solid signal/amber
    (r"text-gradient-blue", "text-signal"),
    (r"text-gradient-cyan", "text-signal-bright"),
    (r"text-gradient-gold", "text-amber-bright"),
    (r"text-gradient-purple", "text-amber-bright"),
    # oklch accents -> hex
    (r"oklch\(0\.62 0\.18 250[^)]*\)", "#3dd68c"),
    (r"oklch\(0\.55 0\.22 295[^)]*\)", "rgba(240,168,48,0.08)"),
    (r"oklch\(0\.72 0\.15 195[^)]*\)", "#3dd68c"),
    (r"oklch\(0\.78 0\.13 90[^)]*\)", "rgba(240,168,48,0.08)"),
    (r"oklch\(0\.7 0\.18 250[^)]*\)", "#3dd68c"),
    (r"oklch\(0\.65 0\.2 295[^)]*\)", "#f0a830"),
    (r"oklch\(0\.78 0\.15 195[^)]*\)", "#3dd68c"),
    (r"oklch\(0\.82 0\.13 90[^)]*\)", "#f0a830"),
    (r"oklch\(0\.75 0\.18 22[^)]*\)", "#e0584a"),
    # Text colors
    (r"text-foreground/85", "text-steel-light"),
    (r"text-foreground/90", "text-offwhite"),
    (r"text-foreground/80", "text-steel-light"),
    (r"text-foreground/60", "text-steel"),
    (r"text-foreground", "text-offwhite"),
    (r"text-muted-foreground/80", "text-steel"),
    (r"text-muted-foreground/70", "text-steel-dark"),
    (r"text-muted-foreground/60", "text-steel-dark"),
    (r"text-muted-foreground", "text-steel"),
    # Card backgrounds
    (r"bg-card/40", "panel"),
    (r"bg-card/30", "panel"),
    (r"bg-card/50", "panel"),
    (r"bg-card/80", "panel"),
    (r"bg-card/95", "bg-graphite/95"),
    # Rings
    (r"ring-ring/50", "ring-signal/50"),
    (r"focus-visible:ring-ring/50", "focus-visible:ring-signal/50"),
]

for fname in FILES:
    path = PAGES_DIR / fname
    content = path.read_text()
    original = content
    for pattern, replacement in REPLACEMENTS:
        content = re.sub(pattern, replacement, content)
    if content != original:
        path.write_text(content)
        print(f"Updated: {fname}")
    else:
        print(f"No changes: {fname}")

print("Done.")

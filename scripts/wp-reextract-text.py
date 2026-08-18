#!/usr/bin/env python3
"""Re-extract text from saved WP HTML snapshots (no network)."""
from __future__ import annotations

import html as htmlmod
import json
import re
from pathlib import Path

HTML_DIR = Path("/workspace/content/wordpress/html")
JSON_DIR = Path("/workspace/content/wordpress/pages")
MANIFEST = Path("/workspace/content/wordpress/manifest.json")

SKIP = re.compile(
    r"^(Anrufen|Route|Menü|Rauch|Telefon:|Zum Inhalt|Jetzt Termin|Mo–Fr|Montag)",
    re.I,
)


def strip_chrome(html: str) -> str:
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.I | re.S)
    html = re.sub(r"<style\b[^>]*>.*?</style>", "", html, flags=re.I | re.S)
    html = re.sub(r"<nav\b[^>]*>.*?</nav>", "", html, flags=re.I | re.S)
    html = re.sub(r"<header\b[^>]*>.*?</header>", "", html, flags=re.I | re.S)
    html = re.sub(r"<footer\b[^>]*>.*?</footer>", "", html, flags=re.I | re.S)
    return html


def inner_text(chunk: str) -> str:
    t = re.sub(r"<br\s*/?>", "\n", chunk, flags=re.I)
    t = re.sub(r"<[^>]+>", " ", t)
    t = htmlmod.unescape(t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def extract(html: str) -> dict:
    clean = strip_chrome(html)
    title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
    title = inner_text(title_m.group(1)) if title_m else ""
    desc_m = re.search(
        r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\']',
        html,
        re.I,
    )
    if not desc_m:
        desc_m = re.search(
            r'<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description["\']',
            html,
            re.I,
        )
    description = htmlmod.unescape(desc_m.group(1)).strip() if desc_m else ""

    headings = []
    parts = []
    for tag, chunk in re.findall(
        r"<(h1|h2|h3|p|li)(?:\s[^>]*)?>(.*?)</\1>", clean, flags=re.I | re.S
    ):
        text = inner_text(chunk)
        if not text or len(text) < 2:
            continue
        if SKIP.match(text) and len(text) < 80:
            continue
        # drop obvious nav piles
        if text.count("Datenschutz") and text.count("Impressum") and len(text) < 280:
            continue
        tag = tag.lower()
        if tag in {"h1", "h2", "h3"}:
            headings.append({"tag": tag, "text": text})
        parts.append({"tag": tag, "text": text})

    h1 = next((h["text"] for h in headings if h["tag"] == "h1"), "")
    body = "\n\n".join(
        f"• {b['text']}" if b["tag"] == "li" else b["text"] for b in parts
    )
    return {
        "title": title,
        "h1": h1,
        "description": description,
        "headings": headings,
        "parts": parts,
        "bodyText": body,
    }


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    by_slug = {p["slug"]: p for p in manifest["pages"]}
    for path in sorted(JSON_DIR.glob("*.json")):
        rec = json.loads(path.read_text(encoding="utf-8"))
        html_path = HTML_DIR / f"{rec['slug']}.html"
        if not html_path.exists():
            print("missing html", rec["slug"])
            continue
        extracted = extract(html_path.read_text(encoding="utf-8", errors="ignore"))
        rec["extracted"] = extracted
        rec["wordCount"] = len([w for w in extracted["bodyText"].split() if w])
        path.write_text(json.dumps(rec, ensure_ascii=False, indent=2), encoding="utf-8")
        if rec["slug"] in by_slug:
            by_slug[rec["slug"]]["wordCount"] = rec["wordCount"]
            by_slug[rec["slug"]]["title"] = extracted["title"]
            by_slug[rec["slug"]]["h1"] = extracted["h1"]
        print(f"{rec['slug']:55} {rec['wordCount']:5}w  {extracted['h1'][:60]}")
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()

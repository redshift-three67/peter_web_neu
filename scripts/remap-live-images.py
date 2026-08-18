#!/usr/bin/env python3
"""Map live WP/YOOtheme images to uploaded originals and rebuild archive catalog."""
from __future__ import annotations

import json
import re
import shutil
import unicodedata
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path("/workspace")
PAGES = ROOT / "content/wordpress/pages"
HTML_DIR = ROOT / "content/wordpress/html"
INCOMING = Path("/tmp/wp-uploads/repo/content/wordpress/uploads-incoming")
ORIGINALS = ROOT / "public/media/originals"
CATALOG = ROOT / "src/content/archive/catalog.json"
REPORT = ROOT / "docs/migration/10-bildzuordnung.md"
MAP_JSON = ROOT / "content/wordpress/image-map.json"

HASH8 = re.compile(r"-[0-9a-f]{8}(?=\.[A-Za-z0-9]+$)", re.I)
THUMB = re.compile(r"-\d{2,4}x\d{2,4}(?=\.|$)")
EDITOR = re.compile(r"-e\d{10,}(?=\.|$)")
SKIP_NAME = re.compile(
    r"(logo|icon|favicon|widget|verband|bni|home-hero-bg|home-about-bg|"
    r"home-contact-bg|home-news-bg|home-services-bg|home-men-bg|home-women-bg|"
    r"pattern\.svg|arrow\.svg|ornament|quotation|section-dark|careers-bg)",
    re.I,
)


def fold(s: str) -> str:
    s = unquote(s)
    repl = {
        "ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss",
        "Ä": "Ae", "Ö": "Oe", "Ü": "Ue",
        "Ф": "oe", "Д": "ae", "Ъ": "ue",
        "à": "a", "á": "a", "â": "a", "é": "e", "è": "e",
    }
    for a, b in repl.items():
        s = s.replace(a, b)
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = THUMB.sub("", s)
    s = HASH8.sub("", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def stem_keys(name: str) -> list[str]:
    base = Path(unquote(name)).name
    keys = []
    variants = [base, HASH8.sub("", base), EDITOR.sub("", HASH8.sub("", base)), THUMB.sub("", base)]
    for v in variants:
        keys.append(fold(v))
        keys.append(fold(Path(v).stem))
    # de-dupe preserve order
    out, seen = [], set()
    for k in keys:
        if k and k not in seen:
            seen.add(k)
            out.append(k)
    return out


def index_originals() -> dict[str, Path]:
    idx: dict[str, Path] = {}
    files = [p for p in INCOMING.iterdir() if p.is_file()]
    # prefer larger, non-thumb
    files.sort(key=lambda p: (0 if THUMB.search(p.name) else 1, p.stat().st_size))
    for p in files:
        if p.suffix.lower() in {".php", ".log", ".json", ".gif", ".bmp"}:
            continue
        for k in stem_keys(p.name):
            idx[k] = p
    return idx


class SlideParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.images: list[dict] = []
        self.slides: list[dict] = []
        self.in_slideshow = 0
        self.cur_slide: dict | None = None
        self.capture = ""
        self.buf: list[str] = []
        self.seen: set[str] = set()

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        cls = a.get("class", "")
        joined = " ".join(a.values())
        if "uk-slideshow" in cls or a.get("uk-slideshow") is not None:
            self.in_slideshow += 1
        if tag == "li" and self.in_slideshow and "el-item" in cls:
            self.cur_slide = {"src": "", "alt": "", "title": "", "meta": ""}
        src = a.get("data-src") or a.get("src") or ""
        if tag == "img" and src and not src.startswith("data:"):
            rec = {"src": src, "alt": a.get("alt", ""), "inSlider": bool(self.in_slideshow)}
            key = src.split("?")[0]
            if key not in self.seen:
                self.seen.add(key)
                self.images.append(rec)
            if self.cur_slide and not self.cur_slide["src"]:
                self.cur_slide["src"] = src
                self.cur_slide["alt"] = a.get("alt", "")
        if tag in {"h2", "h3", "div", "span"}:
            if "el-title" in cls:
                self.capture = "title"
                self.buf = []
            elif "el-meta" in cls:
                self.capture = "meta"
                self.buf = []

    def handle_endtag(self, tag):
        if tag in {"div", "ul"} and self.in_slideshow:
            # conservative: don't decrement blindly; only on slideshow wrapper close is hard
            pass
        if tag == "li" and self.cur_slide:
            if self.cur_slide["src"]:
                self.slides.append(self.cur_slide)
            self.cur_slide = None
        if self.capture and tag in {"h2", "h3", "div", "span"}:
            text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
            if self.cur_slide and text:
                self.cur_slide[self.capture] = text
            self.capture = ""

    def handle_data(self, data):
        if self.capture:
            self.buf.append(data)


def ensure_original(src_path: Path) -> str:
    ORIGINALS.mkdir(parents=True, exist_ok=True)
    # reuse sanitized name already in originals if present
    target_name = src_path.name
    # sanitize umlauts for URL safety
    repl = {"ä": "ae", "ö": "oe", "ü": "ue", "Ä": "Ae", "Ö": "Oe", "Ü": "Ue", "ß": "ss",
            "Ф": "oe", "Д": "ae", "Ъ": "Ue"}
    for a, b in repl.items():
        target_name = target_name.replace(a, b)
    target_name = re.sub(r"[^A-Za-z0-9._-]+", "-", target_name)
    dest = ORIGINALS / target_name
    if not dest.exists():
        shutil.copy2(src_path, dest)
        # webp if raster
        if dest.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
            try:
                from PIL import Image
                Image.MAX_IMAGE_PIXELS = 50_000_000
                im = Image.open(dest)
                if im.mode in {"P", "RGBA", "LA", "CMYK"}:
                    im = im.convert("RGB")
                w, h = im.size
                if max(w, h) > 2000:
                    s = 2000 / max(w, h)
                    im = im.resize((int(w * s), int(h * s)), Image.Resampling.LANCZOS)
                im.save(dest.with_suffix(".webp"), "WEBP", quality=82, method=6)
            except Exception:
                pass
    return f"/media/originals/{dest.name}"


def resolve(url: str, idx: dict[str, Path]) -> tuple[str | None, str, bool]:
    name = Path(unquote(urlparse(url).path)).name
    for k in stem_keys(name):
        p = idx.get(k)
        if p:
            return ensure_original(p), p.name, True
    return None, name, False


def main() -> None:
    idx = index_originals()
    existing_catalog = []
    if CATALOG.exists():
        existing_catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    pages = sorted(PAGES.glob("*.json"))
    catalog = []
    report_rows = []
    unmatched = []
    matched_n = 0
    total_n = 0

    for jf in pages:
        data = json.loads(jf.read_text(encoding="utf-8"))
        slug = data["slug"]
        html_path = HTML_DIR / f"{slug}.html"
        slides = []
        live_imgs = []
        if html_path.exists():
            html_text = html_path.read_text(encoding="utf-8", errors="replace")
            parser = SlideParser()
            parser.feed(html_text)
            live_imgs = parser.images
            slides = parser.slides
            og = re.search(
                r'property=["\']og:image["\']\s+content=["\']([^"\']+)["\']',
                html_text,
                re.I,
            ) or re.search(
                r'content=["\']([^"\']+)["\']\s+property=["\']og:image["\']',
                html_text,
                re.I,
            )
            if og:
                live_imgs.insert(0, {"src": og.group(1), "alt": "", "inSlider": False})
        # fallback to json images
        if not live_imgs:
            live_imgs = [{"src": im.get("url", ""), "alt": im.get("alt", ""), "inSlider": False}
                         for im in data.get("images", [])]

        mapped = []
        mapped_slides = []
        seen_local = set()
        for im in live_imgs:
            src = im.get("src") or ""
            if not src:
                continue
            name = Path(unquote(urlparse(src).path)).name
            if SKIP_NAME.search(name) or name.endswith(".svg") and "therapieverfahren" not in name.lower():
                continue
            total_n += 1
            local, orig_name, ok = resolve(src, idx)
            if ok:
                matched_n += 1
            else:
                unmatched.append({"slug": slug, "live": name})
                # keep previous crawl local if any
                prev = next((x for x in data.get("images", []) if Path(urlparse(x.get("url","")).path).name.split("-")[0] in name), None)
                local = (prev or {}).get("local")
            if local and local in seen_local:
                continue
            if local:
                seen_local.add(local)
            rec = {
                "url": src if src.startswith("http") else f"https://rauch-heilpraktiker.de{src}",
                "alt": im.get("alt") or "",
                "local": local,
                "originalName": orig_name if ok else None,
                "fromCache": "/cache/" in src or "yootheme/cache" in src,
                "matched": ok,
                "inSlider": bool(im.get("inSlider")),
            }
            mapped.append(rec)

        for sl in slides:
            src = sl.get("src") or ""
            if not src:
                continue
            name = Path(unquote(urlparse(src).path)).name
            if SKIP_NAME.search(name):
                continue
            local, orig_name, ok = resolve(src, idx)
            mapped_slides.append({
                "src": local or src,
                "alt": sl.get("alt") or sl.get("title") or "",
                "title": sl.get("title") or "",
                "meta": sl.get("meta") or "",
                "matched": ok,
            })

        route = "/" if slug == "home" else f"/{slug}"
        existing = next((c for c in existing_catalog if c.get("slug") == slug), None)
        parts = (existing or {}).get("parts") or data.get("extracted", {}).get("parts") or [
            {"tag": h["tag"], "text": h["text"]} for h in data.get("extracted", {}).get("headings", [])
        ]
        catalog.append({
            "slug": slug,
            "route": (existing or {}).get("route") or route,
            "sourceUrl": data.get("sourceUrl"),
            "className": data.get("class"),
            "status": data.get("status", "draft"),
            "robots": data.get("robots", "noindex,follow"),
            "title": data.get("extracted", {}).get("title") or slug,
            "h1": data.get("extracted", {}).get("h1") or slug,
            "description": data.get("extracted", {}).get("description") or "",
            "wordCount": data.get("wordCount") or 0,
            "parts": parts,
            "images": mapped,
            "slider": mapped_slides,
        })
        report_rows.append({
            "slug": slug,
            "images": len(mapped),
            "matched": sum(1 for x in mapped if x["matched"]),
            "slider": len(mapped_slides),
        })

    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    MAP_JSON.write_text(json.dumps({
        "matched": matched_n,
        "total": total_n,
        "unmatched": unmatched,
        "pages": report_rows,
    }, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Bildzuordnung Live → Originale",
        "",
        f"Stand: 18.08.2026. Live-Bilder aus 64 HTML-Snapshots, gemappt auf `uploads-incoming`.",
        "",
        f"- Live-Bilder (ohne Logos/Theme-SVG): **{total_n}**",
        f"- Davon Original gefunden: **{matched_n}**",
        f"- Ohne Original: **{len(unmatched)}**",
        "",
        "| Seite | Bilder | Originale | Slider |",
        "|---|---:|---:|---:|",
    ]
    for r in report_rows:
        lines.append(f"| `/{'' if r['slug']=='home' else r['slug']}` | {r['images']} | {r['matched']} | {r['slider']} |")
    if unmatched:
        lines += ["", "## Nicht gemappt", ""]
        for u in unmatched:
            lines.append(f"- `{u['slug']}` ← `{u['live']}`")
    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"pages={len(catalog)} matched={matched_n}/{total_n} unmatched={len(unmatched)}")
    print(f"catalog={CATALOG.stat().st_size} originals_dir={len(list(ORIGINALS.iterdir()))}")


if __name__ == "__main__":
    main()

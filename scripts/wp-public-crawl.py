#!/usr/bin/env python3
"""Public crawl of rauch-heilpraktiker.de — no login."""
from __future__ import annotations

import hashlib
import json
import re
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

ORIGIN = "https://rauch-heilpraktiker.de"
ROOT = Path("/workspace")
OUT_JSON = ROOT / "content/wordpress/pages"
OUT_HTML = ROOT / "content/wordpress/html"
OUT_MEDIA = ROOT / "public/media/wp"
MANIFEST = ROOT / "content/wordpress/manifest.json"
UA = "Mozilla/5.0 (compatible; RauchMigrationBot/1.0; public-archive)"

EXTRA = [
    "https://rauch-heilpraktiker.de/psychotherapie-augsburg/",
    "https://rauch-heilpraktiker.de/kontakt/",
    "https://rauch-heilpraktiker.de/impressum/",
]

SKIP_NAV = re.compile(
    r"^(Rauch|Menü|Anrufen|Terminvereinbarung|Telefon:|Zum Inhalt|Jetzt Termin)",
    re.I,
)

ACTIVE_SAME = {
    "/",
    "/kontakt/",
    "/impressum/",
    "/schmerztherapie-augsburg/",
    "/hypnotherapie-augsburg/",
}
MAPS_HUB = {
    "/datenschutzerklaerung/",
    "/heilpraktiker-rechtshinweise/",
    "/rechtshinweise-therapieverfahren/",
    "/bioresonanz-therapie/",
    "/psychotherapie-augsburg/",
    "/naturheilkunde/",
    "/manuelle-therapieverfahren-uebersicht/",
}
SPECIAL = {
    "/online-anamnesebogen/",
    "/downloadbereich-naturheilpraxis-rauch/",
    "/gesundheitsrelevante-dokumentation/",
    "/datenschutzerklaerung-tools/",
}


def classify(url: str) -> str:
    path = urlparse(url).path
    if path in ACTIVE_SAME:
        return "A-active-same-slug"
    if path in MAPS_HUB:
        return "A-maps-to-new-hub"
    if path in SPECIAL:
        return "C-special"
    return "B-inactive-archive"


def slug_from(url: str) -> str:
    path = urlparse(url).path.rstrip("/") or "/"
    return "home" if path == "/" else path.strip("/").replace("/", "__")


def fetch(url: str) -> tuple[int, str, str]:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,*/*"})
    with urllib.request.urlopen(req, timeout=30) as res:
        raw = res.read()
        charset = res.headers.get_content_charset() or "utf-8"
        html = raw.decode(charset, errors="replace")
        return res.status, res.geturl(), html


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title_parts: list[str] = []
        self.in_title = False
        self.skip_depth = 0
        self.capture = False
        self.current_tag = ""
        self.buf: list[str] = []
        self.blocks: list[dict] = []
        self.headings: list[dict] = []
        self.images: list[dict] = []
        self.meta_desc = ""
        self.in_navish = False
        self.nav_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = {k: (v or "") for k, v in attrs}
        cls = a.get("class", "")
        eid = a.get("id", "")
        if tag in {"script", "style", "noscript", "svg"}:
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if tag == "meta" and a.get("name", "").lower() == "description":
            self.meta_desc = a.get("content", "")
        if tag == "title":
            self.in_title = True
        if tag in {"nav", "header", "footer"} or "uk-navbar" in cls or eid in {
            "tm-header",
            "tm-footer",
        }:
            self.nav_depth += 1
        if tag == "img":
            src = a.get("src") or a.get("data-src") or ""
            if src and not src.startswith("data:"):
                self.images.append(
                    {
                        "src": src,
                        "alt": a.get("alt", ""),
                        "width": a.get("width") or None,
                        "height": a.get("height") or None,
                    }
                )
        if self.nav_depth:
            return
        if tag in {"h1", "h2", "h3", "p", "li"}:
            self.capture = True
            self.current_tag = tag
            self.buf = []

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "noscript", "svg"} and self.skip_depth:
            self.skip_depth -= 1
            return
        if self.skip_depth:
            return
        if tag == "title":
            self.in_title = False
        if tag in {"nav", "header", "footer"} and self.nav_depth:
            self.nav_depth -= 1
        if self.capture and tag == self.current_tag:
            text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
            if text and not (SKIP_NAV.match(text) and len(text) < 48):
                if tag in {"h1", "h2", "h3"}:
                    self.headings.append({"tag": tag, "text": text})
                self.blocks.append({"tag": tag, "text": text})
            self.capture = False
            self.buf = []
            self.current_tag = ""

    def handle_data(self, data: str) -> None:
        if self.skip_depth:
            return
        if self.in_title:
            self.title_parts.append(data)
        if self.capture and not self.nav_depth:
            self.buf.append(data)


def parse_page(html: str, page_url: str) -> tuple[dict, list[dict]]:
    p = PageParser()
    try:
        p.feed(html)
    except Exception:
        pass
    title = re.sub(r"\s+", " ", "".join(p.title_parts)).strip()
    h1 = next((h["text"] for h in p.headings if h["tag"] == "h1"), "")
    images: list[dict] = []
    seen: set[str] = set()
    for img in p.images:
        url = urljoin(page_url, img["src"])
        if "rauch-heilpraktiker.de" not in url:
            continue
        if "/plugins/" in url or "provenexpert" in url:
            continue
        if url in seen:
            continue
        seen.add(url)
        images.append(
            {
                "url": url,
                "alt": img["alt"],
                "width": img["width"],
                "height": img["height"],
                "fromCache": "/yootheme/cache/" in url,
            }
        )
    body = "\n\n".join(
        f"• {b['text']}" if b["tag"] == "li" else b["text"] for b in p.blocks
    )
    extracted = {
        "title": title,
        "h1": h1,
        "description": p.meta_desc.strip(),
        "headings": p.headings,
        "parts": p.blocks,
        "bodyText": body,
    }
    return extracted, images


def save_image(url: str) -> dict | None:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as res:
            data = res.read()
        if len(data) < 80:
            return None
        path = unquote(urlparse(url).path)
        ext = Path(path).suffix.lower().replace("jpeg", "jpg") or ".jpg"
        base = re.sub(r"[^a-zA-Z0-9._-]+", "-", Path(path).stem)[:60].strip("-")
        digest = hashlib.sha1(url.encode()).hexdigest()[:10]
        name = f"{digest}-{base}{ext}"
        dest = OUT_MEDIA / name
        dest.write_bytes(data)
        return {"file": f"/media/wp/{name}", "bytes": len(data), "source": url}
    except Exception:
        return None


def main() -> None:
    OUT_JSON.mkdir(parents=True, exist_ok=True)
    OUT_HTML.mkdir(parents=True, exist_ok=True)
    OUT_MEDIA.mkdir(parents=True, exist_ok=True)

    status, _, sm = fetch(f"{ORIGIN}/page-sitemap.xml")
    urls = re.findall(r"<loc>(.*?)</loc>", sm)
    pages = [u for u in urls if "/wp-content/" not in u]
    for extra in EXTRA:
        if extra not in pages:
            pages.append(extra)
    print(f"[crawl] {len(pages)} page URLs (sitemap status {status})")

    manifest = {
        "crawledAt": datetime.now(timezone.utc).isoformat(),
        "origin": ORIGIN,
        "method": "public-html",
        "pages": [],
        "media": [],
        "errors": [],
    }
    media_seen: set[str] = set()

    for i, url in enumerate(pages, 1):
        slug = slug_from(url)
        print(f"[{i}/{len(pages)}] {url} ", end="", flush=True)
        try:
            http, final, html = fetch(url)
            (OUT_HTML / f"{slug}.html").write_text(html, encoding="utf-8")
            parsed, images = parse_page(html, url)
            local_images = []
            for img in images:
                if img["url"] in media_seen:
                    local_images.append({**img, "skipped": "duplicate-url"})
                    continue
                media_seen.add(img["url"])
                saved = save_image(img["url"])
                if saved:
                    local_images.append({**img, "local": saved["file"], "bytes": saved["bytes"]})
                    manifest["media"].append(saved)
                else:
                    local_images.append({**img, "local": None})
                time.sleep(0.04)

            cls = classify(url)
            words = len([w for w in parsed["bodyText"].split() if w])
            record = {
                "slug": slug,
                "sourceUrl": url,
                "finalUrl": final,
                "httpStatus": http,
                "class": cls,
                "status": "mapped" if cls.startswith("A-active") else "draft",
                "robots": "noindex,follow",
                "extracted": parsed,
                "images": local_images,
                "wordCount": words,
                "crawledAt": datetime.now(timezone.utc).isoformat(),
            }
            (OUT_JSON / f"{slug}.json").write_text(
                json.dumps(record, ensure_ascii=False, indent=2), encoding="utf-8"
            )
            manifest["pages"].append(
                {
                    "slug": slug,
                    "sourceUrl": url,
                    "class": cls,
                    "wordCount": words,
                    "imageCount": len(images),
                    "title": parsed["title"],
                    "h1": parsed["h1"],
                    "status": record["status"],
                }
            )
            print(f"{http} · {words}w · {len(images)} img")
        except Exception as exc:
            print("FAIL", exc)
            manifest["errors"].append({"url": url, "message": str(exc)})
        time.sleep(0.12)

    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"[crawl] done · pages={len(manifest['pages'])} "
        f"media={len(manifest['media'])} errors={len(manifest['errors'])}"
    )


if __name__ == "__main__":
    main()

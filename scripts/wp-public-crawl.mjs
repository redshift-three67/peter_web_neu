#!/usr/bin/env node
/**
 * Public crawl of rauch-heilpraktiker.de
 * No login. Writes snapshots + structured JSON for the parallel rebuild.
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { extname, join } from "node:path";
import { load } from "cheerio";

const ROOT = "/workspace";
const ORIGIN = "https://rauch-heilpraktiker.de";
const OUT_JSON = join(ROOT, "content/wordpress/pages");
const OUT_HTML = join(ROOT, "content/wordpress/html");
const OUT_MEDIA = join(ROOT, "public/media/wp");
const MANIFEST = join(ROOT, "content/wordpress/manifest.json");

const EXTRA_SLUGS = [
  "/psychotherapie-augsburg/",
  "/kontakt/",
  "/impressum/",
];

const UA =
  "Mozilla/5.0 (compatible; RauchMigrationBot/1.0; +https://rauch-heilpraktiker.de)";

function slugFromUrl(url) {
  const u = new URL(url);
  const path = u.pathname.replace(/\/+$/, "") || "/";
  return path === "/" ? "home" : path.replace(/^\//, "").replaceAll("/", "__");
}

function textClean(s) {
  return s.replace(/\s+/g, " ").trim();
}

function abs(href, base = ORIGIN) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function pickImages($, pageUrl) {
  const seen = new Set();
  const images = [];
  $("img").each((_, el) => {
    const src =
      $(el).attr("src") ||
      $(el).attr("data-src") ||
      $(el).attr("data-srcset")?.split(/\s+/)[0];
    if (!src || src.startsWith("data:")) return;
    const url = abs(src, pageUrl);
    if (!url || !url.includes("rauch-heilpraktiker.de")) return;
    if (url.includes("/plugins/") || url.includes("provenexpert.com")) return;
    if (seen.has(url)) return;
    seen.add(url);
    images.push({
      url,
      alt: textClean($(el).attr("alt") || ""),
      width: $(el).attr("width") || null,
      height: $(el).attr("height") || null,
      fromCache: url.includes("/yootheme/cache/"),
    });
  });
  return images;
}

function extractMain($) {
  $(
    "script, style, noscript, iframe, nav, header, footer, .uk-navbar, #tm-header, #tm-footer, .tm-header, .tm-footer, .uk-offcanvas, .cookie, [class*='cookie']",
  ).remove();

  const title = textClean($("title").first().text());
  const h1 = textClean($("h1").first().text());
  const description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";

  const headings = [];
  $("h1, h2, h3").each((_, el) => {
    const t = textClean($(el).text());
    if (t) headings.push({ tag: el.tagName.toLowerCase(), text: t });
  });

  const parts = [];
  const root =
    $("main, #tm-main, .uk-section, article").length > 0
      ? $("main, #tm-main, article").first().length
        ? $("main, #tm-main, article").first()
        : $("body")
      : $("body");

  root.find("h2, h3, p, li").each((_, el) => {
    const t = textClean($(el).text());
    if (!t || t.length < 3) return;
    if (/^(Rauch|Menü|Anrufen|Terminvereinbarung|Telefon:)/i.test(t) && t.length < 40)
      return;
    const tag = el.tagName.toLowerCase();
    parts.push({ tag, text: t });
  });

  const bodyText = parts
    .map((p) => (p.tag === "li" ? `• ${p.text}` : p.text))
    .join("\n\n");

  return { title, h1, description: textClean(description), headings, parts, bodyText };
}

async function fetchOk(url) {
  const res = await fetch(url, {
    headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml" },
    redirect: "follow",
  });
  const html = await res.text();
  return { status: res.status, finalUrl: res.url, html };
}

async function loadSitemap() {
  const { html } = await fetchOk(`${ORIGIN}/page-sitemap.xml`);
  const locs = [...html.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const pages = locs.filter((u) => !u.includes("/wp-content/"));
  for (const extra of EXTRA_SLUGS) {
    const full = `${ORIGIN}${extra}`;
    if (!pages.includes(full)) pages.push(full);
  }
  return pages;
}

function classify(url) {
  const path = new URL(url).pathname;
  const activeExact = new Set([
    "/",
    "/kontakt/",
    "/impressum/",
    "/schmerztherapie-augsburg/",
    "/hypnotherapie-augsburg/",
  ]);
  if (activeExact.has(path)) return "A-active-same-slug";
  if (
    [
      "/datenschutzerklaerung/",
      "/heilpraktiker-rechtshinweise/",
      "/rechtshinweise-therapieverfahren/",
      "/bioresonanz-therapie/",
      "/psychotherapie-augsburg/",
      "/naturheilkunde/",
      "/manuelle-therapieverfahren-uebersicht/",
    ].includes(path)
  )
    return "A-maps-to-new-hub";
  if (
    [
      "/online-anamnesebogen/",
      "/downloadbereich-naturheilpraxis-rauch/",
      "/gesundheitsrelevante-dokumentation/",
      "/datenschutzerklaerung-tools/",
    ].includes(path)
  )
    return "C-special";
  return "B-inactive-archive";
}

async function downloadImage(url) {
  try {
    const res = await fetch(url, { headers: { "user-agent": UA } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 80) return null;
    const ext =
      extname(new URL(url).pathname).toLowerCase().replace("jpeg", "jpg") ||
      ".jpg";
    const hash = createHash("sha1").update(url).digest("hex").slice(0, 10);
    const base = decodeURIComponent(new URL(url).pathname.split("/").pop() || "img")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60);
    const file = `${hash}-${base}${ext.startsWith(".") ? "" : "."}${ext.replace(/^\./, "")}`.replace(
      /\.(jpg|jpeg|png|webp|gif|svg)\.(jpg|jpeg|png|webp|gif|svg)$/i,
      ".$1",
    );
    const dest = join(OUT_MEDIA, file);
    await writeFile(dest, buf);
    return { file: `/media/wp/${file}`, bytes: buf.length, source: url };
  } catch {
    return null;
  }
}

async function main() {
  await mkdir(OUT_JSON, { recursive: true });
  await mkdir(OUT_HTML, { recursive: true });
  await mkdir(OUT_MEDIA, { recursive: true });

  const urls = await loadSitemap();
  console.log(`[crawl] ${urls.length} page URLs`);

  const manifest = {
    crawledAt: new Date().toISOString(),
    origin: ORIGIN,
    method: "public-html",
    pages: [],
    media: [],
    errors: [],
  };

  const mediaSeen = new Set();

  for (const url of urls) {
    const slug = slugFromUrl(url);
    process.stdout.write(`[crawl] ${url} … `);
    try {
      const { status, finalUrl, html } = await fetchOk(url);
      await writeFile(join(OUT_HTML, `${slug}.html`), html);
      const $ = load(html);
      const extracted = extractMain($);
      const images = pickImages($, url);
      const localImages = [];
      for (const img of images) {
        if (mediaSeen.has(img.url)) {
          localImages.push({ ...img, skipped: "duplicate-url" });
          continue;
        }
        mediaSeen.add(img.url);
        const saved = await downloadImage(img.url);
        if (saved) {
          localImages.push({ ...img, local: saved.file, bytes: saved.bytes });
          manifest.media.push(saved);
        } else {
          localImages.push({ ...img, local: null });
        }
      }

      const record = {
        slug,
        sourceUrl: url,
        finalUrl,
        httpStatus: status,
        class: classify(url),
        status: classify(url).startsWith("A-active") ? "mapped" : "draft",
        robots: "noindex,follow",
        extracted,
        images: localImages,
        wordCount: extracted.bodyText.split(/\s+/).filter(Boolean).length,
        crawledAt: new Date().toISOString(),
      };
      await writeFile(
        join(OUT_JSON, `${slug}.json`),
        JSON.stringify(record, null, 2),
      );
      manifest.pages.push({
        slug,
        sourceUrl: url,
        class: record.class,
        wordCount: record.wordCount,
        imageCount: images.length,
        title: extracted.title,
        h1: extracted.h1,
        status: record.status,
      });
      console.log(`${status} · ${record.wordCount}w · ${images.length} img`);
    } catch (err) {
      console.log("FAIL", err.message);
      manifest.errors.push({ url, message: String(err.message || err) });
    }
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(
    `[crawl] done · pages=${manifest.pages.length} media=${manifest.media.length} errors=${manifest.errors.length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

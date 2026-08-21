/**
 * Paritäts-Audit: Live-WordPress-Snapshot vs. gerenderter Neubau (SSR).
 * Vergleich je Seite: Anteil der Live-Inhaltselemente (h1/h2/h3/p/li),
 * die im Neubau fehlen. Ausgabe: Kennzahlen + fehlende Elemente (Wortanfänge).
 *
 * Nutzung: node scripts/parity-audit.mjs [basis-url]
 * Basis-URL default http://127.0.0.1:8080 — Seiten werden mit ?look=neu geholt.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://127.0.0.1:8080";
const SNAP = "content/wordpress/live-snapshot-2026-08-21";

const ENTITIES = { "&auml;": "ä", "&ouml;": "ö", "&uuml;": "ü", "&Auml;": "Ä", "&Ouml;": "Ö", "&Uuml;": "Ü", "&szlig;": "ß", "&ndash;": "–", "&mdash;": "—", "&hellip;": "…", "&eacute;": "é", "&nbsp;": " ", "&amp;": "&", "&quot;": '"', "&rsquo;": "’", "&lsquo;": "‘", "&bdquo;": "„", "&rdquo;": "”", "&ldquo;": "“", "&raquo;": "»", "&laquo;": "«", "&eacute": "é", "&middot;": "·", "&bull;": "•", "&bull": "•", "&egrave;": "è", "&ccedil;": "ç" };
const decodeEntities = (s) =>
  s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
   .replace(/&[a-z]+;?/gi, (e) => ENTITIES[e.toLowerCase()] ?? ENTITIES[e] ?? e);

const norm = (s) =>
  decodeEntities(s)
    .toLowerCase()
    .replace(/\u00ad/g, "")
    .replace(/\s+/g, " ")
    .replace(/[«»„“”"’']/g, "")
    .replace(/[\s:·.·…\-–—]+$/g, "")
    .trim();

/** Bekanntes Seiten-Chrome der Live-Seite (bewusst nicht übernommen):
 *  dieselben Muster, die auch der Neubau-Renderer (hub-blocks SKIP/NAV_CHROME)
 *  ausblendet — plus Umformulierungen mit erhaltenem Inhalt. */
const CHROME = [
  /^naturheilkundlich begleiten/i,
  /^zurück zur startseite/i,
  /^häufige fragen zur praxis/i,
  /^anschrift:/i,
  /^e-?mail:/i,
  /^telefon:/i,
  /^web: http/i,
  /^mittagsruhe/i,
  /^steuernummer/i,
  /^aufsichtsbehörde/i,
  /^erlaubnis zur berufsmäßigen/i,
  /^berufsbezeichnung/i,
  /^umsatzsteuer/i,
  /^verantwortlich für den/i,
  /^eu-streitschlichtung/i,
  /^haftung für/i,
  /^urheberrecht/i,
  /^bildquellen/i,
  /^quellenangaben für die/i,
  /^rechtshinweis:/i,
  /^hinweis: die auf dieser website/i,
  /^diese website verwendet/i,
  /^biografie/i,
  /^seit 2013/i,
  /^bioresonanztherapie nls diagnose eav/i,
  /^peter rauch – heilpraktiker naturheilpraxis/i,
  /^kurze angaben zu ablauf/i,
  /^heilpraktiker rauch – /i,
  /zum inhalt/i,
  /^praxis offen$/i,
  /^gesundheitsrelevante dokumentation$/i,
  /^rechtshinweise therapieverfahren$/i,
  /^diagnostik diagnostik – /i,
  /^diagnose – /i,
  /^zentrum für naturheilkunde/i,
  /^mein facebook/i,
  /^meine google/i,
  /^downloadbereich/i,
  /^online-anamnesebogen$/i,
  /^jetzt termin buchen/i,
  /^patientenaufnahme/i,
  /^kosten$/i,
];

function extractLive(html) {
  // YOOtheme: Inhaltsregion = erster großer <div class="elementor..."/custom>;
  // pragmatisch: ganzer Body, Scripts/Styles/Nav/Header/Footer raus.
  let body = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  body = body.replace(/<nav[\s\S]*?<\/nav>/gi, " ").replace(/<header[\s\S]*?<\/header>/gi, " ");
  body = body.replace(/<footer[\s\S]*?<\/footer>/gi, " ");
  const out = [];
  const re = /<(h1|h2|h3|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(body))) {
    const text = norm(m[2].replace(/<[^>]+>/g, " "));
    if (!text || text.length < 12) continue; // Mikro-Chrome ignorieren
    if (CHROME.some((re2) => re2.test(text))) continue; // bewusst ausgeblendet
    // "Weiterlesen: X · Y" -> nur die Namen zählen (Inhalt, Präfix ist Chrome)
    const cleaned = text.replace(/^weiterlesen:\s*/i, "").replace(/^weitere [^:]+:\s*/i, "");
    out.push({ tag: m[1], text: cleaned });
  }
  return out;
}

function textOfHtml(html) {
  let body = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  return norm(body.replace(/<[^>]+>/g, " "));
}

const files = readdirSync(SNAP).filter((f) => f.endsWith(".html"));
const rows = [];
for (const file of files) {
  const slug = file === "index.html" ? "" : file.replace(/\.html$/, "");
  const liveEls = extractLive(readFileSync(join(SNAP, file), "utf8"));
  let html = "";
  try {
    const res = await fetch(`${BASE}/${slug}?look=neu`);
    html = await res.text();
  } catch {
    rows.push({ file, error: "FETCH" });
    continue;
  }
  const neuText = textOfHtml(html);
  const contains = (el) => {
    if (neuText.includes(el.text.slice(0, 70))) return true;
    // Related-Listen: Live-String "a · b · c" -> einzeln pruefen
    if (el.text.includes("·")) {
      const names = el.text.split("·").map((x) => x.trim()).filter((x) => x.length > 8);
      if (names.length > 1 && names.every((n) => neuText.includes(n.slice(0, 40)))) return true;
    }
    return false;
  };
  const missing = liveEls.filter((el) => !contains(el));
  rows.push({
    file,
    live: liveEls.length,
    fehlt: missing.length,
    quote: liveEls.length ? Math.round((missing.length / liveEls.length) * 100) : 0,
    fehlendeHeadings: missing.filter((e) => e.tag !== "p" && e.tag !== "li").map((e) => `${e.tag}: ${e.text.slice(0, 60)}`),
    fehlendeTags: missing.reduce((acc, e) => { acc[e.tag] = (acc[e.tag] ?? 0) + 1; return acc; }, {}),
    fehlendeAbsatzAnfaenge: missing.filter((e) => e.tag === "p" || e.tag === "li").slice(0, 6).map((e) => `${e.tag}: ${e.text.slice(0, 55)}`),
  });
}

rows.sort((a, b) => (b.quote ?? 999) - (a.quote ?? 999));
for (const r of rows) {
  if (r.error) { console.log(`✖ ${r.file}: ${r.error}`); continue; }
  console.log(`\n=== ${r.file} — fehlt ${r.fehlt}/${r.live} (${r.quote}%) ===`);
  r.fehlendeHeadings.slice(0, 8).forEach((h) => console.log(`  [Kopf] ${h}`));
  r.fehlendeAbsatzAnfaenge.forEach((p) => console.log(`  [Text] ${p}…`));
}
console.log(`\nGesamt: ${rows.length} Seiten geprüft.`);

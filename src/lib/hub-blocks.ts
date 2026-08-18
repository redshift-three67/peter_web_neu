import type { ArchivePage, ArchivePart } from "@/content/archive";
import { NAV_CHROME } from "@/content/hubs";

export type HubBlock =
  | { type: "h2"; text: string }
  | {
      type: "card";
      title: string;
      subtitle?: string;
      paragraphs: string[];
      items: string[];
    }
  | { type: "topics"; items: string[] }
  | { type: "warning"; text: string }
  | { type: "quote"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "related"; items: string[] }
  | { type: "scans"; hint?: string };

const SKIP_START = [
  /^E-Mail:/i,
  /^Anschrift:/,
  /^Bioresonanztherapie NLS/,
  /^Peter Rauch – Heilpraktiker/,
  /^Hinweis: Die auf dieser Website/,
  /^Dieser Corona-Hinweis/,
  /^Ich wünsche Ihnen/,
  /^Viel Freude/,
  /^Zum Online-Anamnesebogen/,
  /^Terminvereinbarung weiter/,
  /^Web: http/,
  /^Häufige Fragen zur Praxis$/,
  /^Kurze Angaben zu Ablauf/,
  /^Vor dem Termin können Sie den Online-Anamnesebogen/,
  /^Zurück zur Startseite/,
];

function skipText(text: string) {
  const t = text.trim();
  if (!t || NAV_CHROME.has(t)) return true;
  if (SKIP_START.some((re) => re.test(t))) return true;
  if (/\|$/.test(t) && t.length < 50) return true;
  if (/^Mittagsruhe/.test(t)) return true;
  if (/^Datenschutzerklärung/.test(t)) return true;
  return false;
}

function isWarning(text: string) {
  return /ersetzen keine|kein Heilversprechen|keine ärztliche|kein Labor|keine Diagnose|ergänzend zur ärztlichen|kein Notfall|wissenschaftlich nicht anerkannt/i.test(
    text,
  );
}

function similar(a: string, b: string) {
  const n = (s: string) => s.toLowerCase().replace(/[^a-z0-9äöüß]+/g, "");
  const x = n(a);
  const y = n(b);
  return x === y || x.includes(y) || y.includes(x);
}

export function editorialParts(page: ArchivePage): ArchivePart[] {
  const start = page.parts.findIndex((p) => p.tag === "h1");
  const slice = start >= 0 ? page.parts.slice(start + 1) : page.parts;
  const out: ArchivePart[] = [];
  for (const part of slice) {
    const text = part.text.trim();
    if (skipText(text)) continue;
    if (part.tag === "h1") continue;
    if (part.tag === "h2" && /Häufige Fragen/.test(text)) break;
    if (part.tag === "h2" && /^mit der /i.test(text)) continue;
    if (part.tag === "li" && text.length < 90 && /Diagnostik|Hinweisdiagnostik|Download|Impressum|Kontakt \|/.test(text)) {
      continue;
    }
    if (part.tag === "h3" && text.length > 90) {
      out.push({ tag: "p", text });
      continue;
    }
    out.push({ ...part, text });
  }
  return out;
}

export function blocksFromParts(parts: ArchivePart[], heading = ""): HubBlock[] {
  const blocks: HubBlock[] = [];
  let i = 0;
  while (i < parts.length) {
    const cur = parts[i];

    if (cur.tag === "h2") {
      blocks.push({ type: "h2", text: cleanHeading(cur.text) });
      i += 1;
      continue;
    }

    if (cur.tag === "h3") {
      const titles: string[] = [];
      while (i < parts.length && parts[i].tag === "h3") {
        const t = cleanHeading(parts[i].text);
        if (!titles.some((x) => similar(x, t)) && !similar(t, heading)) {
          titles.push(t);
        }
        i += 1;
      }
      const paragraphs: string[] = [];
      const items: string[] = [];
      while (i < parts.length && parts[i].tag !== "h2" && parts[i].tag !== "h3") {
        const text = parts[i].text;
        if (parts[i].tag === "li") items.push(text);
        else if (/^Weiterlesen:/i.test(text) || /^Weitere (Diagnostik|Themen)/i.test(text)) {
          const names = text
            .replace(/^Weiterlesen:\s*/i, "")
            .replace(/^Weitere [^:]+:\s*/i, "")
            .split("·")
            .map((s) => s.trim())
            .filter(Boolean);
          if (names.length) blocks.push({ type: "related", items: names });
        } else if (/Ausschnitte von Scan|Scanbildern/i.test(text)) {
          blocks.push({ type: "scans", hint: text });
        } else {
          paragraphs.push(text);
        }
        i += 1;
      }
      if (!titles.length) {
        for (const p of paragraphs) {
          blocks.push(isWarning(p) ? { type: "warning", text: p } : { type: "p", text: p });
        }
        if (items.length) blocks.push({ type: "list", items });
        continue;
      }
      if (!paragraphs.length && !items.length) {
        blocks.push({ type: "topics", items: titles });
        continue;
      }
      if (titles.length >= 4 && paragraphs.length <= 3) {
        blocks.push({ type: "topics", items: titles });
        for (const p of paragraphs) {
          blocks.push(isWarning(p) ? { type: "warning", text: p } : { type: "p", text: p });
        }
        if (items.length) blocks.push({ type: "list", items });
        continue;
      }
      blocks.push({
        type: "card",
        title: titles[0],
        subtitle: titles[1],
        paragraphs,
        items,
      });
      continue;
    }

    if (cur.tag === "li") {
      const items: string[] = [];
      while (i < parts.length && parts[i].tag === "li") {
        items.push(parts[i].text);
        i += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    if (/^Weiterlesen:/i.test(cur.text) || /^Weitere (Diagnostik|Themen)/i.test(cur.text)) {
      const names = cur.text
        .replace(/^Weiterlesen:\s*/i, "")
        .replace(/^Weitere [^:]+:\s*/i, "")
        .split("·")
        .map((s) => s.trim())
        .filter(Boolean);
      if (names.length) blocks.push({ type: "related", items: names });
      i += 1;
      continue;
    }

    if (/Ausschnitte von Scan|Scanbildern/i.test(cur.text)) {
      blocks.push({ type: "scans", hint: cur.text });
      i += 1;
      continue;
    }

    if (isWarning(cur.text)) {
      blocks.push({ type: "warning", text: cur.text });
      i += 1;
      continue;
    }

    if (/[„"]/.test(cur.text) && cur.text.length < 220 && /Hahnemann|Schopenhauer|Hippokrates/i.test(cur.text)) {
      blocks.push({ type: "quote", text: cur.text });
      i += 1;
      continue;
    }

    blocks.push({ type: "p", text: cur.text });
    i += 1;
  }
  return mergeTopics(blocks);
}

function cleanHeading(text: string) {
  return text.replace(/[:…]+$/, "").replace(/\s+/g, " ").trim();
}

function mergeTopics(blocks: HubBlock[]): HubBlock[] {
  const out: HubBlock[] = [];
  for (const b of blocks) {
    const prev = out[out.length - 1];
    if (b.type === "topics" && prev?.type === "topics") {
      prev.items.push(...b.items);
    } else {
      out.push(b);
    }
  }
  return out;
}

export const topicHref: Record<string, string> = {
  "Klassische Homöopathie": "/klassische-homoeopathie",
  "Komplex-Homöopathie": "/die-komplex-homoeopathie",
  Phytotherapie: "/die-phytotherapie",
  "NAET / Allergiebehandlung": "/naet-methode-allergie-behandlung",
  Darmsanierung: "/naturheilkundliche-darmsanierung",
  Osteopathie: "/osteopathie-techniken",
  "Integrative Manual Therapy": "/integrative-manual-therapy-imt",
  "Lowen Systems": "/lowen-systems-biovalent-system",
  Microkinesi: "/microkinesi-therapie",
  Injektionstherapie: "/injektionstherapie",
  "Manuelle Verfahren": "/manuelle-therapieverfahren-uebersicht",
  "Entstehung von Schmerz": "/schmerztherapie-entstehung-von-schmerz",
  Naturheilkunde: "/naturheilkunde",
  "NLS-Diagnostik": "/nls-diagnostik",
  Bioresonanz: "/bioresonanz-therapie",
  "Elektroakupunktur nach Dr. Voll": "/elektroakupunktur-nach-dr-voll-3",
  "Vieva Pro": "/vieva-pro-herzratenvariabilitaet",
  "Hinweisdiagnostik im Überblick": "/diagnostik-informationstherapie",
};

export function classifyImage(src: string, alt = "") {
  const hay = `${src} ${alt}`;
  if (/logo|icon|favicon|verband|bni|widget|Peter-Rauch-Heilpraktiker/i.test(hay)) {
    return "skip";
  }
  if (/gehirn|herz_nls|3d_herz|brustkorb|darm-hunter|darm_hunter|scan/i.test(hay)) {
    return "scan";
  }
  if (/zen|sanft.heilen|emotionale|wasser|waterfall|baum|sand/i.test(hay)) {
    return "atmosphere";
  }
  if (/trikombin|vieva|elektroakupunktur|metatron|quickcheck|hospital_vitages/i.test(hay)) {
    return "device";
  }
  return "photo";
}

export function captionFromPath(src: string, alt: string) {
  if (alt && alt.length < 80 && !/^\S+ \S+ \S+ [a-f0-9]{6}/i.test(alt)) return alt;
  const file = src.split("/").pop() ?? "";
  return file
    .replace(/\.(webp|jpe?g|png)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\d{4,}[a-z0-9]*\b/gi, "")
    .trim();
}

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
  | { type: "related"; items: string[] };

const SKIP_START = [
  /^E-Mail:/i,
  /^Anschrift:/,
  /^Bioresonanztherapie NLS/,
  /^Peter Rauch – Heilpraktiker/,
  /^Hinweis: Die auf dieser Website/,
  /^Dieser Corona-Hinweis/,
  /^Ich wünsche Ihnen/,
  /^Zum Online-Anamnesebogen/,
  /^Terminvereinbarung weiter/,
  /^Web: http/,
  /^Häufige Fragen zur Praxis$/,
  /^Kurze Angaben zu Ablauf/,
  /^Vor dem Termin können Sie den Online-Anamnesebogen/,
];

function skipText(text: string) {
  const t = text.trim();
  if (!t || NAV_CHROME.has(t)) return true;
  if (SKIP_START.some((re) => re.test(t))) return true;
  if (/\|$/.test(t) && t.length < 50) return true;
  if (/^Mittagsruhe/.test(t)) return true;
  if (/^Datenschutzerklärung/.test(t)) return true;
  if (t === "Psyche und Soma") return false;
  return false;
}

function isWarning(text: string) {
  return /ersetzen keine|kein Heilversprechen|keine ärztliche|kein Labor|keine Diagnose|ergänzend zur ärztlichen|kein Notfall/i.test(
    text,
  );
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
    if (part.tag === "li" && text.length < 90 && /Diagnostik|Hinweisdiagnostik|Download|Impressum|Kontakt \|/.test(text)) {
      continue;
    }
    out.push({ ...part, text });
  }
  return out;
}

export function blocksFromParts(parts: ArchivePart[]): HubBlock[] {
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
        titles.push(cleanHeading(parts[i].text));
        i += 1;
      }
      const paragraphs: string[] = [];
      const items: string[] = [];
      while (i < parts.length && parts[i].tag !== "h2" && parts[i].tag !== "h3") {
        if (parts[i].tag === "li") items.push(parts[i].text);
        else if (/^Weiterlesen:/i.test(parts[i].text)) {
          const names = parts[i].text
            .replace(/^Weiterlesen:\s*/i, "")
            .split("·")
            .map((s) => s.trim())
            .filter(Boolean);
          if (names.length) blocks.push({ type: "related", items: names });
        } else if (isWarning(parts[i].text)) {
          paragraphs.push(parts[i].text);
        } else {
          paragraphs.push(parts[i].text);
        }
        i += 1;
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

    if (/^Weiterlesen:/i.test(cur.text)) {
      const names = cur.text
        .replace(/^Weiterlesen:\s*/i, "")
        .split("·")
        .map((s) => s.trim())
        .filter(Boolean);
      if (names.length) blocks.push({ type: "related", items: names });
      i += 1;
      continue;
    }

    if (isWarning(cur.text)) {
      blocks.push({ type: "warning", text: cur.text });
      i += 1;
      continue;
    }

    if (/[„"]/.test(cur.text) && cur.text.length < 280 && /Hahnemann|Schopenhauer|Hippokrates/i.test(cur.text)) {
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
};

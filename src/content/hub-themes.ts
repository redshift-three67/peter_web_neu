export type HubMood = "diagnostic" | "nature" | "manual" | "psyche" | "frequency" | "intake" | "legal";

export function moodFor(slug: string): HubMood {
  if (/nls|diagnostik|vieva|eav|informationstherapie|iris/i.test(slug)) return "diagnostic";
  if (/bioresonanz|frequenz|bit|150-mhz/i.test(slug)) return "frequency";
  if (/hypno|psychotherapie|burnout|qigong|meditation/i.test(slug)) return "psyche";
  if (/manuell|osteo|schmerz|imt|lowen|dorn|kinesio/i.test(slug)) return "manual";
  if (/anamnese|download/i.test(slug)) return "intake";
  if (/impressum|datenschutz|recht/i.test(slug)) return "legal";
  return "nature";
}

export const moodCopy: Record<
  HubMood,
  {
    quote: string;
    cite: string;
    image: string;
    steps: { title: string; text: string }[];
  }
> = {
  diagnostic: {
    quote: "Ein Hinweisbild ist eine Einladung zum Nachdenken – keine Laborzahl und keine Diagnose.",
    cite: "Grundsatz der Praxis",
    image: "/images/ruhe.jpg",
    steps: [
      { title: "1. Gespräch", text: "Zuerst die Anamnese und das, was bereits ärztlich geklärt ist." },
      { title: "2. Hinweis", text: "Gerätebilder ordne ich ein. Sie ersetzen kein Labor." },
      { title: "3. Nächster Schritt", text: "Gemeinsam planen – oder zuerst zur Ärztin, zum Arzt." },
    ],
  },
  frequency: {
    quote: "Frequenzverfahren sind Erfahrungsheilkunde. Ich sage das dazu, bevor wir beginnen.",
    cite: "Grundsatz der Praxis",
    image: "/images/naturheilkunde.jpg",
    steps: [
      { title: "1. Einordnung", text: "Was ist schon untersucht? Was darf ich ergänzend anschauen?" },
      { title: "2. Verfahren", text: "Bioresonanz und verwandte Methoden sind hinweisgebend." },
      { title: "3. Grenzen", text: "Keine Heilzusage, kein Ersatz für schulmedizinische Diagnostik." },
    ],
  },
  nature: {
    quote: "Gesundheit ist nicht alles, aber ohne Gesundheit ist alles nichts.",
    cite: "Arthur Schopenhauer",
    image: "/images/naturheilkunde.jpg",
    steps: [
      { title: "1. Bild des Menschen", text: "Körper, Alltag und Vorgeschichte gehören zusammen." },
      { title: "2. Mittel und Pflanze", text: "Homöopathie und Phytotherapie – ergänzend, nicht statt des Arztes." },
      { title: "3. Beobachtung", text: "Wir prüfen gemeinsam, was trägt und was wir lassen." },
    ],
  },
  manual: {
    quote: "Mit den Händen hören – und aufhören, wo der Befund zum Arzt gehört.",
    cite: "Grundsatz der Praxis",
    image: "/images/manuelle-therapie.jpg",
    steps: [
      { title: "1. Befund", text: "Was ist ausgeschlossen? Wo darf ich manuell arbeiten?" },
      { title: "2. Hände", text: "Osteopathie, IMT und verwandte Griffe – behutsam und ohne Heilzusage." },
      { title: "3. Alltag", text: "Übung, Pause, manchmal zuerst bildgebende Diagnostik." },
    ],
  },
  psyche: {
    quote: "Zuerst zuhören. Dann erst Verfahren – und nie anstelle einer Therapie, die Sie brauchen.",
    cite: "Grundsatz der Praxis",
    image: "/images/ruhe.jpg",
    steps: [
      { title: "1. Raum", text: "Zeit für das, was Sie belastet. Ohne Diagnose per Website." },
      { title: "2. Gespräch", text: "Hypnose oder Beratung nur, wenn es nach der Anamnese passt." },
      { title: "3. Netz", text: "Bei klar ärztlichem oder psychiatrischem Bedarf vermittle ich weiter." },
    ],
  },
  intake: {
    quote: "Der Bogen bereitet das Gespräch vor. Er stellt keine Diagnose.",
    cite: "Patientenaufnahme",
    image: "/images/gespraech.jpg",
    steps: [
      { title: "1. Ausfüllen", text: "Stammdaten und Anliegen, so wie Sie sie schildern." },
      { title: "2. Mitbringen", text: "Befunde und Medikamentenliste, soweit vorhanden." },
      { title: "3. Termin", text: "Offene Punkte klären wir in der Friedrich-Deffner-Straße." },
    ],
  },
  legal: {
    quote: "Transparenz vor Werbung.",
    cite: "Grundsatz der Praxis",
    image: "/images/hero-praxis.jpg",
    steps: [],
  },
};

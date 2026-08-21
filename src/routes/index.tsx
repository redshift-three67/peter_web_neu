import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  Leaf,
  MapPin,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  FaqList,
  ReviewStrip,
} from "@/components/site/Shared";
import { FeatureRow, PhoneChip, QuotePanel } from "@/components/site/Design";
import { HeroSlider } from "@/components/site/HeroSlider";
import { FaqJsonLd } from "@/components/site/JsonLd";
import { HomeAc } from "@/components/site/HomeAc";
import { getArchiveBySlug } from "@/content/archive";
import { guessTopicHref } from "@/lib/hub-blocks";
import { useMusterSkin } from "@/components/site/DesignSkin";
import { practice, practiceFaqs } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch",
      description:
        "Heilpraktiker in Augsburg-Hochzoll. Peter Rauch begleitet mit Naturheilkunde, manuellen Verfahren und Gespräch – für Hochzoll, Friedberg und Lechhausen, ergänzend zur ärztlichen Versorgung, ohne Heilversprechen.",
      path: "/",
    }),
  component: Home,
});

const concerns = [
  {
    to: "/schmerztherapie-augsburg",
    title: "Schmerz & Bewegung",
    text: "Rücken, Gelenke, chronische Schmerzen – manuell, regulativ und im Gespräch.",
    image: "/images/manuelle-therapie.jpg",
  },
  {
    to: "/naet-methode-allergie-behandlung",
    title: "Allergie & Unverträglichkeit",
    text: "Wenn der Körper auf Alltägliches reagiert. Hinweisdiagnostik und begleitende Verfahren.",
    image: "/images/naturheilkunde.jpg",
  },
  {
    to: "/psychotherapie-augsburg",
    title: "Erschöpfung & Psyche",
    text: "Burnout, innere Unruhe, Schlaf – Hypnose, Gespräch und körperliche Regulation.",
    image: "/images/ruhe.jpg",
  },
];

/** Verfahrens-Verzeichnis der Live-Startseite: H3-Kacheln + Kurztext
 *  aus dem Archiv (slug "home"), verlinkt auf die Verfahrensseiten. */
function verfahrensVerzeichnis() {
  const page = getArchiveBySlug("home");
  if (!page) return [] as { title: string; text?: string; href: string }[];
  const skip = /Naturheilpraxis mit Herz|Therapieverfahren von|Weitere mögliche|^Heilpraktiker Augsburg$/i;
  const out: { title: string; text?: string; href: string }[] = [];
  for (const part of page.parts) {
    if (part.tag !== "h3" || part.text.length > 90 || skip.test(part.text)) continue;
    const href = guessTopicHref(part.text);
    if (!href) continue;
    const entry = { title: part.text.replace(/\s+$/, ""), text: undefined as string | undefined, href };
    const next = page.parts[page.parts.indexOf(part) + 1];
    if (next && next.tag === "p" && next.text.length > 30 && next.text.length < 260) {
      entry.text = next.text;
    }
    out.push(entry);
  }
  return out;
}

function Home() {
  // look=neu: Struktur der Original-Startseite (Slider, Sektionen, Icons),
  // Optik über theme-neu-Tokens. HomeAc bleibt als Muster A+C abrufbar.
  const { ac } = useMusterSkin();
  return (
    <>
      <FaqJsonLd items={practiceFaqs} />
      {ac ? <HomeAc /> : <HomeLegacy />}
    </>
  );
}

function HomeLegacy() {
  return (
    <>
      <HeroSlider />
      <PhoneChip className="border-b border-line bg-bg" />

      <section className="border-b border-line bg-paper">
        <Container className="grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Über die Praxis
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700 sm:text-4xl">
              Naturheilkunde mit Herz und Verstand
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
              Als Heilpraktiker und Physiotherapeut verbinde ich handwerkliche
              Erfahrung mit einem ruhigen Gespräch. Mein Ziel ist es, Sie auf
              dem Weg zu mehr Wohlbefinden zu begleiten – ergänzend zur
              ärztlichen Versorgung, ohne Heilversprechen.
            </p>
            <div className="mt-8 space-y-5">
              <FeatureRow
                icon={Heart}
                title="Ganzheitlicher Ansatz"
                text="Ich betrachte den Menschen als Einheit von Körper, Geist und Seele."
              />
              <FeatureRow
                icon={Shield}
                title="Behutsame Verfahren"
                text="Sanfte, individuell gewählte Methoden. Kein Ersatz für den Arzt, keine Garantie."
              />
              <FeatureRow
                icon={Users}
                title="Individuelle Betreuung"
                text="Persönliche Planung nach dem Gespräch – passend zu Befund, Alltag und Grenzen."
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/ueber-mich">Vita & Qualifikation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/so-arbeite-ich">So läuft ein Termin</Link>
              </Button>
            </div>
          </div>
          <QuotePanel
            quote="Gesundheit ist nicht alles, aber ohne Gesundheit ist alles nichts."
            cite="Arthur Schopenhauer"
          />
        </Container>
      </section>

      <section className="border-b border-line bg-sand-50">
        <Container className="grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Person, nicht Gerät
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700 sm:text-4xl">
              Ich bin Heilpraktiker und Physiotherapeut – und sehe den Menschen
              als Ganzes.
            </h2>
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-fg/90">
              <p>
                Mein Name ist Peter Rauch. In meiner Praxis in der
                Friedrich-Deffner-Straße in Augsburg-Hochzoll arbeite ich mit
                Naturheilverfahren, manuellen Techniken und Gespräch. Zuerst
                versuche ich, Zusammenhänge zu verstehen. Danach ordne ich
                passende Verfahren zu.
              </p>
              <p>
                Ich bin kein Arzt. Bei Notfällen und klar ärztlichen Fragen
                gehört die Behandlung in eine Praxis oder Klinik. Schulmedizin
                und Naturheilkunde müssen sich nicht widersprechen.
              </p>
            </div>
          </div>
          <aside className="rounded-2xl border border-line bg-card p-6 shadow-card">
            <dl className="space-y-4 text-sm">
              {[
                ["Behandler", practice.person],
                ["Qualifikation", practice.role],
                ["Erlaubnis HP", `${practice.sinceHp} · ${practice.licenseHp}`],
                ["Physiotherapie", `${practice.sincePt} · ${practice.licensePt}`],
                ["Verband", practice.association],
                ["Aufsicht", practice.authority],
                ["Standort", `${practice.street}, ${practice.zip} ${practice.city}`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sage-deep">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Womit Menschen kommen
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold text-sage-700 sm:text-4xl">
            Drei Anliegen – nicht siebenundzwanzig Geräte.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {concerns.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated"
              >
                <img
                  src={item.image}
                  alt=""
                  className="aspect-[5/3] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-display text-2xl text-sage-deep">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage">
                    Weiterlesen <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <VerfahrenSection />

      <section className="bg-sage-50">
        <Container className="grid gap-8 py-16 md:grid-cols-3">
          {[
            {
              icon: Stethoscope,
              title: "1. Gespräch",
              text: "Oft mit ausgefülltem Anamnesebogen. Ich höre zu und ordne ein, was bereits ärztlich geklärt ist.",
            },
            {
              icon: Sparkles,
              title: "2. Untersuchung",
              text: "Naturheilkundliche und manuelle Verfahren. Das ersetzt keine Laborwerte und keine ärztliche Diagnose.",
            },
            {
              icon: Leaf,
              title: "3. Nächste Schritte",
              text: "Gemeinsame Planung – ohne Heilversprechen. Manchmal heißt das auch: zuerst zum Arzt.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-line bg-paper p-8 shadow-card"
            >
              <span className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-sage-100">
                <step.icon className="size-8 text-sage" aria-hidden />
              </span>
              <h3 className="font-display text-2xl font-semibold text-sage-700">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {step.text}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <ReviewStrip />

      <section>
        <Container className="grid gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Häufige Fragen
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
              Klarheit vor dem ersten Anruf
            </h2>
            <div className="mt-6">
              <FaqList items={practiceFaqs} />
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
            <p className="flex items-center gap-2 text-sm font-medium text-sage">
              <MapPin className="size-4" /> Praxis vor Ort
            </p>
            <h3 className="mt-2 font-display text-2xl text-sage-deep">
              {practice.street}, {practice.city}-{practice.district}
            </h3>
            <p className="mt-3 text-muted">
              Gut erreichbar aus {practice.reach.join(", ")}. Einzugsgebiet
              außerdem {practice.catchment.join(", ")}.
            </p>
            <p className="mt-3 text-sm font-medium text-sage-deep">
              Sprechzeiten: {practice.hours}
            </p>
            <img
              src="/images/anfahrt.jpg"
              alt="Ruhiger Zugang zu einer Praxis in Augsburg-Hochzoll"
              className="mt-5 aspect-[16/10] w-full rounded-2xl object-cover"
            />
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/anfahrt">Anfahrt & Parken</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={practice.mapsQuery} target="_blank" rel="noreferrer">
                    Google Maps
                  </a>
                </Button>
              </div>
              <Button asChild variant="clay" className="w-full sm:w-auto">
                <Link to="/online-anamnesebogen">Online-Anamnesebogen</Link>
              </Button>
            </div>
            <p className="mt-5 flex items-start gap-2 text-sm text-muted">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage" />
              Privatleistung. Keine Notfallversorgung. Keine Online-Diagnose.
            </p>
          </div>
        </Container>
      </section>

      <Container className="pb-6">
        <AuthorByline />
        <Disclaimer className="mt-8" />
        <p className="mt-8 max-w-2xl font-display text-xl italic text-sage-deep">
          Ich freue mich auf Ihren Besuch in der Friedrich-Deffner-Straße –
          ruhig, persönlich und mit Zeit für Ihr Anliegen.
        </p>
      </Container>
      <CtaBand />
    </>
  );
}

/** Verfahrens-Kacheln wie auf der Live-Startseite (interes Linknetz). */
function VerfahrenSection() {
  const items = verfahrensVerzeichnis();
  if (items.length === 0) return null;
  return (
    <section className="border-t border-line bg-paper">
      <Container className="py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
          Verfahrensverzeichnis
        </p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold text-sage-700 sm:text-4xl">
          Therapieverfahren der Naturheilpraxis in Augsburg
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href + item.title}
              to={item.href}
              className="group rounded-2xl border border-line bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <h3 className="font-display text-xl font-semibold text-sage-700">
                {item.title}
              </h3>
              {item.text ? (
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
              ) : null}
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sage">
                Weiterlesen <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

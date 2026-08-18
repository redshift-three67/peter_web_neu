import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
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
import { FaqJsonLd } from "@/components/site/JsonLd";
import { practice, practiceFaqs } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch",
      description:
        "Heilpraktiker in Augsburg-Hochzoll. Peter Rauch begleitet mit Naturheilkunde, manuellen Verfahren und Gespräch – ergänzend zur ärztlichen Versorgung, ohne Heilversprechen.",
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
    to: "/allergie-augsburg",
    title: "Allergie & Unverträglichkeit",
    text: "Wenn der Körper auf Alltägliches reagiert. Hinweisdiagnostik und begleitende Verfahren.",
    image: "/images/naturheilkunde.jpg",
  },
  {
    to: "/erschoepfung-augsburg",
    title: "Erschöpfung & Psyche",
    text: "Burnout, innere Unruhe, Schlaf – Hypnose, Gespräch und körperliche Regulation.",
    image: "/images/ruhe.jpg",
  },
];

function Home() {
  return (
    <>
      <FaqJsonLd items={practiceFaqs} />
      <section className="relative overflow-hidden">
        <img
          src="/images/hero-praxis.jpg"
          alt="Behandlungsraum der Naturheilpraxis Rauch in Augsburg-Hochzoll"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sage-700/90 via-sage-600/80 to-sage-500/70" />
        <Container className="relative grid min-h-[72vh] items-end py-24 md:min-h-[80vh] md:py-32">
          <div className="max-w-2xl text-paper">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-sand-deep">
              Augsburg-Hochzoll · Friedberg · Lechhausen
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Heilpraktiker Augsburg – Naturheilpraxis Peter Rauch
            </h1>
            <p className="mt-5 max-w-xl text-lg text-paper/85">
              {practice.tagline}. Ich begleite Menschen, die mit Schmerz,
              Allergie oder Erschöpfung bei der Schulmedizin nicht weiterkommen
              – ergänzend, ohne Heilversprechen, mit klaren Grenzen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="clay" size="lg" className="shadow-elevated">
                <a href={`tel:${practice.phoneTel}`}>
                  <Phone className="size-4" /> Termin: {practice.phoneDisplay}
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="border-paper/30 bg-paper/15 text-paper hover:bg-paper hover:text-sage-700"
              >
                <Link to="/erstgespraech">
                  Erstgespräch verstehen <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-paper/75">
              <span>Physiotherapeut seit 2001</span>
              <span>Heilpraktiker seit 2006</span>
              <span>{practice.experienceYears} Jahre Praxis</span>
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper">
        <Container className="grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
              Person, nicht Gerät
            </p>
            <h2 className="mt-2 font-display text-3xl text-sage-deep sm:text-4xl">
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
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/ueber-mich">Vita & Qualifikation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/so-arbeite-ich">So läuft ein Termin</Link>
              </Button>
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
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
            Womit Menschen kommen
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl text-sage-deep sm:text-4xl">
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
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage">
                    Weiterlesen <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

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
              <p className="mt-2 text-sm leading-relaxed text-muted">
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
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
              Häufige Fragen
            </p>
            <h2 className="mt-2 font-display text-3xl text-sage-deep">
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
            <img
              src="/images/anfahrt.jpg"
              alt="Ruhiger Zugang zu einer Praxis in Augsburg-Hochzoll"
              className="mt-5 aspect-[16/10] w-full rounded-lg object-cover"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/anfahrt">Anfahrt & Parken</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={practice.mapsQuery} target="_blank" rel="noreferrer">
                  Google Maps
                </a>
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
      </Container>
      <CtaBand />
    </>
  );
}

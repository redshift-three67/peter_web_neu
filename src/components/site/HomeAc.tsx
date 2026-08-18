import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  FaqList,
  ReviewStrip,
} from "@/components/site/Shared";
import { PhoneChip } from "@/components/site/Design";
import { HeroSlider } from "@/components/site/HeroSlider";
import { practice, practiceFaqs } from "@/content/site";

const concerns = [
  {
    to: "/schmerztherapie-augsburg",
    title: "Schmerz & Bewegung",
    text: "Rücken, Gelenke, chronische Schmerzen – manuell und im Gespräch, in Augsburg-Hochzoll.",
    image: "/images/manuelle-therapie.jpg",
    alt: "Manuelle Behandlung an Rücken und Schulter",
  },
  {
    to: "/naet-methode-allergie-behandlung",
    title: "Allergie & Unverträglichkeit",
    text: "Wenn der Alltag reizt. Hinweisdiagnostik und begleitende Verfahren – kein Laborersatz.",
    image: "/images/naturheilkunde.jpg",
    alt: "Pflanzliche Zubereitung als Sinnbild der Naturheilkunde",
  },
  {
    to: "/psychotherapie-augsburg",
    title: "Erschöpfung & Psyche",
    text: "Burnout, Unruhe, Schlaf – zuerst zuhören, dann erst Verfahren.",
    image: "/images/free/raum-licht.jpg",
    alt: "Ruhiger Sitzplatz am Fenster – Atmosphäre, nicht der Behandlungsraum",
  },
];

const steps = [
  {
    n: "01",
    title: "Gespräch",
    text: "Oft mit Anamnesebogen. Ich höre zu und ordne ein, was bereits ärztlich geklärt ist.",
  },
  {
    n: "02",
    title: "Einordnung",
    text: "Naturheilkundlich und manuell. Das ersetzt keine Laborwerte und keine Diagnose.",
  },
  {
    n: "03",
    title: "Nächster Schritt",
    text: "Gemeinsame Planung ohne Heilversprechen. Manchmal heißt das: zuerst zum Arzt.",
  },
];

export function HomeAc() {
  return (
    <>
      <HeroSlider />
      <PhoneChip className="border-b border-line bg-bg" />

      <section className="ac-reveal border-b border-line bg-paper">
        <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-22">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Augsburg-Hochzoll
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium text-fg sm:text-4xl">
              Person zuerst,<br />
              Gerät <em className="italic">danach</em>.
            </h2>
            <p className="mt-5 max-w-md text-[1.125rem] leading-relaxed text-muted">
              Peter Rauch, Heilpraktiker und Physiotherapeut. In der
              Friedrich-Deffner-Straße begleite ich Menschen aus Hochzoll,
              Friedberg und Lechhausen – ergänzend zur ärztlichen Versorgung.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/ueber-mich">Vita & Qualifikation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/so-arbeite-ich">Ablauf</Link>
              </Button>
            </div>
          </div>
          <figure className="overflow-hidden rounded-xl">
            <img
              src="/images/gespraech.jpg"
              alt="Gesprächssituation – Sinnbild, nicht ein konkreter Patient der Praxis"
              className="aspect-[4/3] w-full object-cover"
              width={900}
              height={675}
            />
          </figure>
        </Container>
      </section>

      <section className="ac-reveal border-b border-line">
        <Container className="py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Womit Menschen kommen
          </p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-medium text-fg">
            Drei Anliegen – nicht siebenundzwanzig Geräte.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {concerns.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group block overflow-hidden rounded-xl border border-line bg-paper"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="aspect-[5/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage-deep">
                    Weiterlesen <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="ac-reveal border-b border-line bg-[#16332C] text-[#F7F1E8]">
        <Container className="grid gap-10 py-16 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n}>
              <p className="font-display text-4xl font-medium opacity-50">{step.n}</p>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed opacity-90">{step.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="ac-reveal relative overflow-hidden">
        <img
          src="/images/free/wald-licht.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#1D2C38]/55" />
        <Container className="relative py-20 text-[#F7F1E8] md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
            Hochzoll · Friedberg · Lechhausen
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-medium sm:text-4xl">
            Gut erreichbar, ohne Kliniklärm.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed opacity-90">
            Waldmotiv stellvertretend – die Praxis steht in der
            Friedrich-Deffner-Straße 19a, Augsburg-Hochzoll.
          </p>
        </Container>
      </section>

      <ReviewStrip />

      <section className="ac-reveal">
        <Container className="grid gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Häufige Fragen
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium text-fg">
              Klarheit vor dem ersten Anruf
            </h2>
            <div className="mt-6">
              <FaqList items={practiceFaqs} />
            </div>
          </div>
          <div className="rounded-xl border border-line bg-card p-6">
            <p className="flex items-center gap-2 text-sm font-medium text-sage">
              <MapPin className="size-4" /> Praxis vor Ort
            </p>
            <h3 className="mt-2 text-xl font-semibold text-fg">
              {practice.street}, {practice.city}-{practice.district}
            </h3>
            <p className="mt-3 text-muted">
              Gut erreichbar aus {practice.reach.join(", ")}. Einzugsgebiet
              außerdem {practice.catchment.join(", ")}.
            </p>
            <img
              src="/images/anfahrt.jpg"
              alt="Zugang zur Naturheilpraxis Rauch, Friedrich-Deffner-Straße, Augsburg-Hochzoll"
              className="mt-5 aspect-[16/10] w-full rounded-xl object-cover"
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
      </Container>
      <CtaBand />
    </>
  );
}

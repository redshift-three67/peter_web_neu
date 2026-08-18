import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { practice, reviews } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
  image,
  imageAlt,
}: {
  kicker?: string;
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="border-b border-line bg-sand-50">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-end md:py-20">
        <div>
          {kicker ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              {kicker}
            </p>
          ) : null}
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-sage-700 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{lead}</p>
        </div>
        {image ? (
          <div className="overflow-hidden rounded-3xl shadow-elevated">
            <img
              src={image}
              alt={imageAlt ?? ""}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-gradient-to-r from-sage-700 via-sage-600 to-sage-500 text-paper">
      <Container className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <p className="font-display text-3xl font-semibold">Erstgespräch vereinbaren</p>
          <p className="mt-2 max-w-xl text-paper/75">
            Telefonisch oder über das Formular. Vor dem Termin können Sie den
            Anamnesebogen in Ruhe ausfüllen.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="clay" size="lg">
            <a href={`tel:${practice.phoneTel}`}>
              <Phone className="size-4" /> {practice.phoneDisplay}
            </a>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-paper/30 bg-paper/15 text-paper hover:bg-paper hover:text-sage-700"
          >
            <Link to="/kontakt">
              Nachricht schreiben <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function ReviewStrip() {
  return (
    <section className="border-y border-line bg-paper">
      <Container className="py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
              Stimmen aus der Praxis
            </p>
            <h2 className="mt-2 font-display text-3xl text-sage-deep">
              {reviews.provenExpert.score} von 5 · {reviews.provenExpert.count}{" "}
              Bewertungen
            </h2>
          </div>
          <p className="text-sm text-muted">
            {reviews.provenExpert.label} · {reviews.jameda.label}{" "}
            {reviews.jameda.score} / {reviews.jameda.count}
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.quotes.map((quote) => (
            <figure
              key={quote.text}
              className="rounded-2xl border border-line bg-card p-6 shadow-card"
            >
              <blockquote className="text-[1.05rem] leading-relaxed text-fg">
                „{quote.text}“
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">
                {quote.source}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FaqList({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-paper shadow-soft">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4">
          <summary className="cursor-pointer list-none font-medium text-sage-deep marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span className="text-muted transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("text-base leading-relaxed text-muted", className)}>
      Die auf dieser Website dargestellten Verfahren dienen der allgemeinen
      Aufklärung und ersetzen keine ärztliche Diagnose, Beratung oder
      Behandlung. Es werden keine Heilversprechen abgegeben. Ich bin
      Heilpraktiker, kein Arzt. Rechtliche Hinweise finden Sie unter{" "}
      <Link to="/rechtshinweise" className="text-sage underline-offset-4 hover:underline">
        Rechtshinweise
      </Link>
      .
    </p>
  );
}

export function AuthorByline() {
  return (
    <aside className="mt-12 flex flex-col gap-3 rounded-2xl border border-line bg-sand-100 p-5 shadow-soft sm:flex-row sm:items-center">
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-sage font-display text-lg text-paper">
        PR
      </span>
      <div>
        <p className="font-medium text-sage-deep">
          {practice.person} · {practice.role}
        </p>
        <p className="text-sm text-muted">
          Heilpraktikererlaubnis seit {practice.sinceHp} · Physiotherapeut seit{" "}
          {practice.sincePt} · {practice.experienceYears} Jahre Berufserfahrung
          · Geprüft: {practice.updated}
        </p>
      </div>
    </aside>
  );
}

export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5 text-[1.05rem] leading-relaxed text-fg/90",
        className,
      )}
    >
      {children}
    </div>
  );
}

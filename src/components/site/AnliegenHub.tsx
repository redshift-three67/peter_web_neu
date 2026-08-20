import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Heart,
  MapPin,
  MessageSquareQuote,
  Phone,
  ShieldAlert,
  Stethoscope,
  X,
} from "lucide-react";
import { getArchiveBySlug } from "@/content/archive";
import { blocksFromParts, editorialParts } from "@/lib/hub-blocks";
import { practice } from "@/content/site";
import type { Anliegen } from "@/content/anliegen";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  FaqList,
  PageHero,
  Prose,
  ReviewStrip,
} from "@/components/site/Shared";
import { PhoneChip } from "@/components/site/Design";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/site/JsonLd";

/**
 * Anliegen-Hub nach Breitenberger-Logik:
 * Symptome, Einordnung, was die Praxis tut und nicht tut,
 * nächster Schritt, NAP, FAQ, Quellen. Optik im bestehenden Design-System.
 */
export function AnliegenHub({ anliegen }: { anliegen: Anliegen }) {
  const page = getArchiveBySlug(anliegen.slug);
  const blocks = page ? blocksFromParts(editorialParts(page), anliegen.h1) : [];
  const depth = blocks.filter(
    (b) => b.type === "h2" || b.type === "p" || b.type === "quote",
  );

  return (
    <>
      <FaqJsonLd items={anliegen.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: "/" },
          { name: anliegen.navLabel, href: anliegen.slug },
        ]}
      />
      <PageHero
        kicker="Heilpraktiker Augsburg-Hochzoll"
        title={anliegen.h1}
        lead={anliegen.kurz}
        image={anliegen.image}
        imageAlt={anliegen.imageAlt}
      />
      <PhoneChip className="border-b border-line bg-bg" />

      <section className="border-b border-line bg-paper">
        <Container className="py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {anliegen.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-line bg-card p-5 shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
                  {fact.label}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {fact.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-bg">
        <Container className="grid gap-10 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-start md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              In einem Satz
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700 sm:text-4xl">
              Was Sie hier bekommen – und was nicht
            </h2>
            <Prose className="mt-6">
              {anliegen.einordnung.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </Prose>
          </div>
          <aside className="rounded-2xl border border-line bg-sage-50 p-6 shadow-card">
            <MessageSquareQuote className="size-7 text-sage" aria-hidden />
            <blockquote className="mt-4 text-[1.05rem] leading-relaxed text-sage-deep">
              {anliegen.kurz}
            </blockquote>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">
              {practice.name} · {practice.city}-{practice.district}
            </p>
          </aside>
        </Container>
      </section>

      <section className="border-b border-line bg-paper">
        <Container className="py-14 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Anliegen, mit denen Menschen kommen
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold text-sage-700">
            Wenn Sie sich hier wiederfinden
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Eine Auflistung von Anliegen – keine Diagnose und keine Aussage
            darüber, was für Sie infrage kommt. Das klären wir im Gespräch.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {anliegen.symptome.map((s) => (
              <div
                key={s.titel}
                className="rounded-2xl border border-line bg-card p-5 shadow-soft"
              >
                <p className="font-display text-xl font-semibold text-sage-700">
                  {s.titel}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {depth.length > 3 ? (
        <section className="border-b border-line bg-bg">
          <Container className="max-w-3xl py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Ausführlich
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
              Hintergrund aus der Praxis
            </h2>
            <div className="mt-6 space-y-5">
              {depth.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h3
                      key={i}
                      className="pt-4 font-display text-2xl font-semibold text-sage-700"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="rounded-2xl border border-line bg-paper p-5 font-display text-lg text-sage-deep shadow-soft"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                return (
                  <p key={i} className="text-[1.05rem] leading-relaxed text-fg/90">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-line bg-sage-50">
        <Container className="py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Verfahren, die hier einfließen
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
            Ergänzende Verfahren dieser Begleitung
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {anliegen.spokes.map((spoke) => (
              <Link
                key={spoke.href}
                to={spoke.href}
                className="group rounded-2xl border border-line bg-paper p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <p className="font-display text-xl font-semibold text-sage-700">
                  {spoke.name}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {spoke.text}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sage">
                  Weiterlesen{" "}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-bg">
        <Container className="grid gap-10 py-14 md:grid-cols-2 md:py-16">
          <div className="rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8">
            <p className="flex items-center gap-2 text-sm font-medium text-sage">
              <Heart className="size-4" aria-hidden /> Das biete ich
            </p>
            <ul className="mt-5 space-y-3">
              {anliegen.bietet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-sage"
                    aria-hidden
                  />
                  <span className="leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-6 shadow-card md:p-8">
            <p className="flex items-center gap-2 text-sm font-medium text-danger">
              <ShieldAlert className="size-4" aria-hidden /> Das biete ich bewusst nicht
            </p>
            <ul className="mt-5 space-y-3">
              {anliegen.nichtBietet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X
                    className="mt-0.5 size-5 shrink-0 text-danger"
                    aria-hidden
                  />
                  <span className="leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper">
        <Container className="grid gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Nächster Schritt
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
              So beginnt die Begleitung
            </h2>
            <ol className="mt-8 space-y-6">
              {anliegen.schritte.map((s) => (
                <li key={s.titel} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sage-100 text-sage">
                    <Stethoscope className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold text-sage-700">
                      {s.titel}
                    </p>
                    <p className="mt-1 leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="clay">
                <a href={`tel:${practice.phoneTel}`}>
                  <Phone className="size-4" /> {practice.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/online-anamnesebogen">Online-Anamnesebogen</Link>
              </Button>
            </div>
          </div>
          <aside className="rounded-2xl border border-line bg-card p-6 shadow-card">
            <p className="flex items-center gap-2 text-sm font-medium text-sage">
              <MapPin className="size-4" /> Praxis vor Ort
            </p>
            <h3 className="mt-2 font-display text-2xl text-sage-deep">
              {practice.street}, {practice.city}-{practice.district}
            </h3>
            <p className="mt-3 text-muted">
              Gut erreichbar aus {practice.reach.join(", ")}. Sprechzeiten:{" "}
              {practice.hoursShort}.
            </p>
            <img
              src="/images/anfahrt.jpg"
              alt="Praxiszugang in Augsburg-Hochzoll"
              className="mt-5 aspect-[16/10] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </aside>
        </Container>
      </section>

      <ReviewStrip />

      <section>
        <Container className="grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Häufige Fragen
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
              Klarheit vor dem ersten Anruf
            </h2>
            <div className="mt-6">
              <FaqList items={anliegen.faqs} />
            </div>
          </div>
          <aside className="rounded-2xl border border-line bg-card p-6 shadow-card">
            <p className="flex items-center gap-2 text-sm font-medium text-sage">
              <BookOpen className="size-4" /> Quellen &amp; Redaktion
            </p>
            <p className="mt-3 text-muted">{anliegen.quelle}</p>
            <p className="mt-3 text-muted">
              Einordnung der Verfahren:{" "}
              <Link
                to="/rechtshinweise-therapieverfahren"
                className="text-sage underline-offset-4 hover:underline"
              >
                Rechtshinweise Therapieverfahren
              </Link>
              . Quellen und Haftung:{" "}
              <Link
                to="/quellenhinweis"
                className="text-sage underline-offset-4 hover:underline"
              >
                Quellenhinweis
              </Link>
              .
            </p>
          </aside>
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

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
import {
  blocksFromParts,
  captionFromPath,
  classifyImage,
  editorialParts,
  topicHref,
} from "@/lib/hub-blocks";
import { practice } from "@/content/site";
import type { Anliegen } from "@/content/anliegen";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  FaqList,
  Prose,
  ReviewStrip,
} from "@/components/site/Shared";
import { PhoneChip } from "@/components/site/Design";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/site/JsonLd";
import { PageHeroSlider, type HeroSlide } from "@/components/site/PageHeroSlider";

/** .jpg/.png-Archivpfade auf vorhandene .webp umbiegen (wie HubFromArchive). */
function mediaSrc(local: string) {
  return /\.(jpe?g|png)$/i.test(local) ? local.replace(/\.(jpe?g|png)$/i, ".webp") : local;
}

type Pic = { src: string; alt: string; caption: string };
type DepthBlockType = Exclude<ReturnType<typeof blocksFromParts>[number], { type: "scans" }>;
type FlowItem =
  | { kind: "block"; block: DepthBlockType }
  | { kind: "fig"; pic: Pic };

/** Archivbilder der Seite (ohne Logos), für Hero und Textfluss. */
function archivePics(slug: string, fallbackAlt: string): Pic[] {
  const page = getArchiveBySlug(slug);
  return (page?.images ?? [])
    .filter(
      (img) =>
        img.local &&
        classifyImage(img.local, img.alt) !== "skip" &&
        !/Peter-Rauch-Heilpraktiker/i.test(img.local),
    )
    .map((img) => {
      const src = mediaSrc(img.local as string);
      return {
        src,
        alt: img.alt || fallbackAlt,
        caption: captionFromPath(src, img.alt),
      };
    });
}

/** Hero-Slider wie auf der alten WordPress-Seite: echte Slider-Motive des
 *  Archivs, sonst erstes brauchbares Seitenbild, sonst Themenbild. */
function heroSlidesFor(anliegen: Anliegen): HeroSlide[] {
  const page = getArchiveBySlug(anliegen.slug.replace(/^\//, ""));
  const slides = (page?.slider ?? [])
    .filter((s) => s.src)
    .map((s) => ({
      src: mediaSrc(s.src),
      alt: s.alt || s.title,
      title: s.title,
      meta: s.meta,
    }));
  if (slides.length > 0) return slides;
  const pics = archivePics(anliegen.slug.replace(/^\//, ""), anliegen.imageAlt);
  if (pics.length > 0) {
    return [{ src: pics[0].src, alt: pics[0].alt, title: anliegen.h1, meta: undefined }];
  }
  return [{ src: anliegen.image, alt: anliegen.imageAlt, title: anliegen.h1, meta: undefined }];
}

function guessHref(name: string) {
  const direct = topicHref[name];
  if (direct) return direct;
  return Object.entries(topicHref).find(([key]) =>
    name.toLowerCase().includes(key.toLowerCase()),
  )?.[1];
}

/**
 * Anliegen-Hub nach Breitenberger-Logik:
 * Symptome, Einordnung, was die Praxis tut und nicht tut,
 * nächster Schritt, NAP, FAQ, Quellen. Optik im bestehenden Design-System.
 * Archiv-Tiefe: der wesentliche Live-Text der alten Seite wird vollständig
 * eingebunden (Cards, Listen, Themen) — mit Archivbildern als thematischen
 * Bild-Karten im Textfluss (Bildstruktur-Vorgabe 21.08.2026).
 */
export function AnliegenHub({ anliegen }: { anliegen: Anliegen }) {
  const slug = anliegen.slug.replace(/^\//, "");
  const page = getArchiveBySlug(slug);
  const blocks = page ? blocksFromParts(editorialParts(page), anliegen.h1) : [];
  const depth = blocks.filter((b) => b.type !== "warning" && b.type !== "scans");
  const pics = archivePics(slug, anliegen.imageAlt);

  // Archivbilder als thematische Karten in den Fließtext streuen
  // (etwa alle 3 Blöcke eines, wie auf der alten Seite im Text verteilt).
  const flow: FlowItem[] = [];
  let nextPic = 0;
  depth.forEach((block, i) => {
    flow.push({ kind: "block", block });
    if (nextPic < pics.length && (i + 1) % 3 === 0 && block.type !== "h2") {
      flow.push({ kind: "fig", pic: pics[nextPic++] });
    }
  });
  while (nextPic < pics.length) flow.push({ kind: "fig", pic: pics[nextPic++] });

  return (
    <>
      <FaqJsonLd items={anliegen.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: "/" },
          { name: anliegen.navLabel, href: anliegen.slug },
        ]}
      />
      <PageHeroSlider
        slides={heroSlidesFor(anliegen)}
        heading={anliegen.h1}
        kicker="Heilpraktiker Augsburg-Hochzoll"
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

      {depth.length > 0 ? (
        <section className="border-b border-line bg-bg">
          <Container className="max-w-5xl py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Ausführlich
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
              Hintergrund aus der Praxis
            </h2>
            <div className="mt-6 space-y-5">
              {flow.map((item, i) =>
                item.kind === "fig" ? (
                  <figure
                    key={`fig-${item.pic.src}-${i}`}
                    className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card"
                  >
                    <img
                      src={item.pic.src}
                      alt={item.pic.alt}
                      width={900}
                      height={540}
                      loading="lazy"
                      className="aspect-[5/3] w-full object-cover"
                    />
                    <figcaption className="p-5">
                      <p className="font-display text-xl text-sage-deep">{item.pic.caption}</p>
                    </figcaption>
                  </figure>
                ) : (
                  <DepthBlock key={`b-${i}`} block={item.block} />
                ),
              )}
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

/** Vollständige Archiv-Tiefe: jede Blockart der alten Seite rendern. */
function DepthBlock({ block }: { block: DepthBlockType }) {
  if (block.type === "h2") {
    return (
      <h3 className="pt-4 font-display text-2xl font-semibold text-sage-700">
        {block.text}
      </h3>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="rounded-2xl border border-line bg-paper p-5 font-display text-lg text-sage-deep shadow-soft">
        {block.text}
      </blockquote>
    );
  }
  if (block.type === "card") {
    return (
      <div className="rounded-2xl border border-line bg-paper p-6 shadow-soft">
        <p className="font-display text-xl font-semibold text-sage-700">
          {block.title}
        </p>
        {block.subtitle ? (
          <p className="mt-1 text-sm font-medium text-sage">{block.subtitle}</p>
        ) : null}
        <div className="mt-3 space-y-3">
          {block.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
        {block.items.length ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
  if (block.type === "topics" || block.type === "related") {
    const items = block.type === "topics" ? block.items : block.items;
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((name) => {
          const href = guessHref(name);
          const inner = (
            <>
              <p className="font-display text-lg font-semibold text-sage-700">{name}</p>
              {href ? (
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-sage">
                  Weiterlesen <ArrowRight className="size-4" />
                </span>
              ) : null}
            </>
          );
          return href ? (
            <Link
              key={name}
              to={href}
              className="rounded-2xl border border-line bg-paper p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              {inner}
            </Link>
          ) : (
            <div key={name} className="rounded-2xl border border-line bg-paper p-5 shadow-soft">
              {inner}
            </div>
          );
        })}
      </div>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-1 pl-5 text-muted">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p className="text-[1.05rem] leading-relaxed text-fg/90">{block.text}</p>;
}

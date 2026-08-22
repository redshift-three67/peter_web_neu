import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Leaf,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { getArchiveBySlug } from "@/content/archive";
import { moodCopy, moodFor } from "@/content/hub-themes";
import {
  blocksFromParts,
  captionFromPath,
  classifyImage,
  editorialParts,
  topicHref,
  type HubBlock,
} from "@/lib/hub-blocks";
import { practice, practiceFaqs } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  FaqList,
  ReviewStrip,
} from "@/components/site/Shared";
import {
  FeatureRow,
  IconCard,
  PhoneChip,
  QuotePanel,
  WarningNote,
} from "@/components/site/Design";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";

const ICONS = [Leaf, Heart, Stethoscope, Sparkles, Shield, BookOpen];

function mediaSrc(local: string | null | undefined, fallback = "") {
  if (!local) return fallback;
  if (/\.(jpe?g|png)$/i.test(local)) {
    return local.replace(/\.(jpe?g|png)$/i, ".webp");
  }
  return local;
}

type Pic = { src: string; alt: string; caption: string; kind: string };

export function HubFromArchive({
  slug,
  heading,
  kicker,
  lead,
  showCta = true,
}: {
  slug: string;
  heading: string;
  kicker: string;
  lead?: string;
  showCta?: boolean;
}) {
  const page = getArchiveBySlug(slug);
  const mood = moodCopy[moodFor(slug)];
  const blocks = page ? blocksFromParts(editorialParts(page), heading) : [];

  const pics: Pic[] = (page?.images ?? [])
    .filter((img) => img.local)
    .map((img) => {
      const src = mediaSrc(img.local, img.url);
      return {
        src,
        alt: img.alt || heading,
        caption: captionFromPath(src, img.alt),
        kind: classifyImage(src, img.alt),
      };
    })
    .filter((p) => p.kind !== "skip");

  const devices = pics.filter((p) => p.kind === "device");
  const scans = pics.filter((p) => p.kind === "scan");
  const atmosphere = pics.filter((p) => p.kind === "atmosphere");
  const photos = pics.filter((p) => p.kind === "photo");

  const slides = (page?.slider ?? [])
    .filter((s) => s.src)
    .map((s) => ({
      src: mediaSrc(s.src, s.src),
      alt: s.alt || s.title,
      title: s.title,
      meta: s.meta,
    }));

  const hero =
    slides.length > 0
      ? slides
      : devices[0]
        ? [{ src: devices[0].src, alt: devices[0].alt, title: devices[0].caption, meta: heading }]
        : [
            {
              src: atmosphere[0]?.src ?? mood.image,
              alt: heading,
              title: heading,
              meta: kicker,
            },
          ];

  const intro: HubBlock[] = [];
  const warnings: HubBlock[] = [];
  const rest: HubBlock[] = [];
  let seenBreak = false;
  for (const b of blocks) {
    if (b.type === "warning") {
      warnings.push(b);
      continue;
    }
    if (!seenBreak && b.type === "p") {
      intro.push(b);
    } else {
      seenBreak = true;
      rest.push(b);
    }
  }

  const firstH2 = rest.find((b) => b.type === "h2");
  const body = rest.filter((b) => b.type !== "h2" || b !== firstH2);
  const usedScan = body.some((b) => b.type === "scans");
  // Bildstruktur-Vorgabe 21.08.: Archivbilder als thematische Karten im
  // Fliesstext (etwa alle 3 Bloecke eines) statt loser Galerie am Ende.
  // Scans bleiben im thematischen Scans-Block ("kein Befund"), falls vorhanden.
  const flowPics: Pic[] = usedScan
    ? [...photos, ...atmosphere, ...devices]
    : [...photos, ...atmosphere, ...devices, ...scans];
  const flow: (
    | { kind: "block"; block: HubBlock; index: number }
    | { kind: "fig"; pic: Pic }
  )[] = [];
  let picIdx = 0;
  body.forEach((block, i) => {
    flow.push({ kind: "block", block, index: i });
    if (picIdx < flowPics.length && (i + 1) % 3 === 0 && block.type !== "h2") {
      flow.push({ kind: "fig", pic: flowPics[picIdx++] });
    }
  });
  while (picIdx < flowPics.length) flow.push({ kind: "fig", pic: flowPics[picIdx++] });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: "/" },
          { name: heading, href: page?.route ? "/" + page.route.replace(/^\/+/, "") : "/" },
        ]}
      />
      <PageHeroSlider slides={hero} heading={heading} kicker={kicker} />
      <PhoneChip className="border-b border-line bg-bg" />

      <section className="border-b border-line bg-paper">
        <Container className="grid gap-12 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              {kicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700 sm:text-4xl">
              {firstH2 && firstH2.type === "h2" ? firstH2.text : heading}
            </h2>
            {lead ? (
              <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{lead}</p>
            ) : null}
            <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-fg/90">
              {intro.slice(0, 3).map((b, i) =>
                b.type === "p" ? <p key={i}>{b.text}</p> : null,
              )}
            </div>
            <div className="mt-8 space-y-5">
              {mood.steps.map((step) => (
                <FeatureRow
                  key={step.title}
                  icon={step.title.startsWith("1") ? Heart : step.title.startsWith("2") ? Stethoscope : Leaf}
                  title={step.title}
                  text={step.text}
                />
              ))}
            </div>
          </div>
          <QuotePanel quote={mood.quote} cite={mood.cite} />
        </Container>
      </section>

      {warnings.length ? (
        <section className="border-b border-line bg-bg">
          <Container className="max-w-4xl space-y-4 py-10">
            {warnings.map((w, i) =>
              w.type === "warning" ? (
                <WarningNote key={i} title="Einordnung">
                  <p>{w.text}</p>
                </WarningNote>
              ) : null,
            )}
          </Container>
        </section>
      ) : null}

      {mood.steps.length ? (
        <section className="border-b border-line bg-sage-50">
          <Container className="py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              So arbeite ich hier
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
              Drei ruhige Schritte
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {mood.steps.map((step, i) => {
                const Icon = ICONS[i];
                return (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-line bg-paper p-8 shadow-card"
                  >
                    <span className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-sage-100">
                      <Icon className="size-8 text-sage" aria-hidden />
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-sage-700">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      {flow.length ? (
        <section>
          <Container className="grid gap-6 py-14 md:grid-cols-2">
            {flow.map((item, i) =>
              item.kind === "fig" ? (
                <figure
                  key={"fig-" + item.pic.src + "-" + i}
                  className="self-start overflow-hidden rounded-2xl border border-line bg-paper shadow-card"
                >
                  <img
                    src={item.pic.src}
                    alt={item.pic.alt}
                    width={900}
                    height={540}
                    loading="lazy"
                    className="aspect-[5/3] w-full object-cover"
                  />
                  <figcaption className="p-5 font-display text-xl text-sage-deep">
                    {item.pic.caption}
                  </figcaption>
                </figure>
              ) : (
                <div
                  key={"b-" + i}
                  className={
                    item.block.type === "scans" ||
                    item.block.type === "related" ||
                    item.block.type === "topics" ||
                    item.block.type === "h2"
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <BlockView block={item.block} index={item.index} scans={scans} />
                </div>
              ),
            )}
          </Container>
        </section>
      ) : null}

      <ReviewStrip />  <ReviewStrip />

      <section>
        <Container className="grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Häufige Fragen
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
              Häufige Fragen zur Praxis
            </h2>
            <div className="mt-6">
              <FaqList items={practiceFaqs} />
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
              Gut erreichbar aus {practice.reach.join(", ")}.
            </p>
            <img
              src="/images/anfahrt.jpg"
              alt="Praxiszugang in Augsburg-Hochzoll"
              className="mt-5 aspect-[16/10] w-full rounded-2xl object-cover"
            />
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href={`tel:${practice.phoneTel}`}>
                    <Phone className="size-4" /> {practice.phoneDisplay}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/kontakt">Nachricht</Link>
                </Button>
              </div>
              <Button asChild variant="clay" className="w-full">
                <Link to="/online-anamnesebogen">Online-Anamnesebogen</Link>
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      <Container className="pb-6">
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      {showCta ? <CtaBand /> : null}
    </>
  );
}

function BlockView({
  block,
  index,
  scans,
}: {
  block: HubBlock;
  index: number;
  scans: Pic[];
}) {
  if (block.type === "h2") {
    return (
      <h2 className="font-display text-3xl font-semibold text-sage-700">{block.text}</h2>
    );
  }
  if (block.type === "warning") {
    return (
      <WarningNote title="Einordnung">
        <p>{block.text}</p>
      </WarningNote>
    );
  }
  if (block.type === "quote") {
    return <QuotePanel quote={block.text.replace(/^[„"]|[”"]$/g, "")} cite="Praxistext" />;
  }
  if (block.type === "scans") {
    return (
      <div>
        {block.hint ? (
          <p className="mb-6 text-[1.05rem] leading-relaxed text-muted">{block.hint}</p>
        ) : null}
        <div className="grid gap-5 md:grid-cols-3">
          {scans.map((pic) => (
            <figure
              key={pic.src}
              className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card"
            >
              <img
                src={pic.src}
                alt={pic.alt}
                className="aspect-[5/3] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="p-5 font-display text-xl text-sage-deep">
                {pic.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }
  if (block.type === "topics") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {block.items.map((title, ti) => {
          const Icon = ICONS[ti % ICONS.length];
          const href = guessHref(title);
          const inner = (
            <>
              <span className="grid size-11 place-items-center rounded-2xl bg-sage-50 text-sage">
                <Icon className="size-5" />
              </span>
              <p className="mt-3 font-display text-xl font-semibold text-sage-700">{title}</p>
              {href ? (
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sage">
                  Weiterlesen <ArrowRight className="size-4" />
                </span>
              ) : null}
            </>
          );
          return href ? (
            <a
              key={title}
              href={href}
              className="rounded-2xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              {inner}
            </a>
          ) : (
            <div key={title} className="rounded-2xl border border-line bg-paper p-5 shadow-card">
              {inner}
            </div>
          );
        })}
      </div>
    );
  }
  if (block.type === "card") {
    const Icon = ICONS[index % ICONS.length];
    return (
      <IconCard icon={Icon} title={block.title}>
        {block.subtitle ? <p className="font-medium text-sage">{block.subtitle}</p> : null}
        {block.paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
        {block.items.length ? (
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {block.moreTitles.length ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {block.moreTitles.map((name) => {
              const href = guessHref(name);
              const label = (
                <span className="inline-flex items-center gap-1 text-sm font-medium text-sage">
                  {name} <ArrowRight className="size-3.5" />
                </span>
              );
              return href ? (
                <Link
                  key={name}
                  to={href}
                  className="rounded-xl border border-line bg-paper px-3 py-2 transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  {label}
                </Link>
              ) : (
                <span
                  key={name}
                  className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-muted"
                >
                  {name}
                </span>
              );
            })}
          </div>
        ) : null}
      </IconCard>
    );
  }
  if (block.type === "list") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {block.items.map((item, li) => (
          <div key={item} className="rounded-2xl border border-line bg-paper p-5 shadow-card">
            <span className="grid size-11 place-items-center rounded-2xl bg-sage-50 text-sage">
              {(() => {
                const Icon = ICONS[li % ICONS.length];
                return <Icon className="size-5" />;
              })()}
            </span>
            <p className="mt-3 text-base leading-relaxed text-muted">{item}</p>
          </div>
        ))}
      </div>
    );
  }
  if (block.type === "related") {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {block.items.map((name) => {
          const href = guessHref(name);
          return (
            <a
              key={name}
              href={href ?? "#"}
              className="group rounded-2xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <p className="font-display text-xl font-semibold text-sage-700">{name}</p>
              {href ? (
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sage">
                  Weiterlesen <ArrowRight className="size-4" />
                </span>
              ) : null}
            </a>
          );
        })}
      </div>
    );
  }
  return <p className="text-[1.05rem] leading-relaxed text-fg/90">{block.text}</p>;
}

function guessHref(name: string) {
  const direct = topicHref[name];
  if (direct) return direct;
  return Object.entries(topicHref).find(([key]) =>
    name.toLowerCase().includes(key.toLowerCase()),
  )?.[1];
}

import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Leaf,
  Phone,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { getArchiveBySlug } from "@/content/archive";
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
} from "@/components/site/Shared";
import {
  IconCard,
  PhoneChip,
  QuotePanel,
  WarningNote,
} from "@/components/site/Design";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";

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
  const blocks = page ? blocksFromParts(editorialParts(page), heading) : [];
  const pics: Pic[] = (page?.images ?? [])
    .filter((img) => img.local)
    .map((img) => {
      const src = mediaSrc(img.local, img.url);
      const kind = classifyImage(src, img.alt);
      return {
        src,
        alt: img.alt || heading,
        caption: captionFromPath(src, img.alt),
        kind,
      };
    })
    .filter((p) => p.kind !== "skip");

  const devices = pics.filter((p) => p.kind === "device");
  const scans = pics.filter((p) => p.kind === "scan");
  const atmosphere = pics.filter((p) => p.kind === "atmosphere");
  const photos = pics.filter((p) => p.kind === "photo");

  const slides = (page?.slider ?? [])
    .filter((s) => s.src && classifyImage(s.src, s.alt) === "device")
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
        : atmosphere[0]
          ? [{ src: atmosphere[0].src, alt: atmosphere[0].alt }]
          : [];

  const intro: HubBlock[] = [];
  const rest: HubBlock[] = [];
  let seenBreak = false;
  for (const b of blocks) {
    if (!seenBreak && (b.type === "p" || b.type === "warning")) {
      intro.push(b);
    } else {
      seenBreak = true;
      rest.push(b);
    }
  }

  const usedScan = rest.some((b) => b.type === "scans");

  return (
    <>
      {hero.length ? (
        <PageHeroSlider slides={hero} heading={heading} kicker={kicker} />
      ) : (
        <section className="border-b border-line bg-sage-50">
          <Container className="py-12 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              {kicker}
            </p>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold text-sage-700 md:text-5xl">
              {heading}
            </h1>
          </Container>
        </section>
      )}
      <PhoneChip className="border-b border-line bg-bg" />

      <section className="border-b border-line bg-bg">
        <Container className="max-w-4xl py-12 md:py-16">
          {lead ? (
            <p className="text-lg leading-relaxed text-muted md:text-xl">{lead}</p>
          ) : null}
          <div className={`space-y-5 text-[1.05rem] leading-relaxed text-fg/90 ${lead ? "mt-6" : ""}`}>
            {intro.map((block, i) =>
              block.type === "warning" ? (
                <WarningNote key={i} title="Einordnung">
                  <p>{block.text}</p>
                </WarningNote>
              ) : (
                <p key={i}>{block.type === "p" ? block.text : ""}</p>
              ),
            )}
          </div>
          {atmosphere.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {atmosphere.slice(0, 2).map((pic) => (
                <figure key={pic.src} className="overflow-hidden rounded-2xl">
                  <img
                    src={pic.src}
                    alt={pic.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="mt-2 text-sm text-muted">{pic.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      {rest.length ? (
        <section>
          <Container className="max-w-4xl space-y-6 py-12 md:py-16">
            {rest.map((block, i) => (
              <BlockView
                key={i}
                block={block}
                index={i}
                scans={scans}
              />
            ))}
          </Container>
        </section>
      ) : null}

      {!usedScan && (scans.length > 0 || photos.length > 0) ? (
        <PhotoBand
          title="Einblicke"
          items={[...scans, ...photos].slice(0, 6)}
        />
      ) : null}

      <section className="border-t border-line bg-sage-50">
        <Container className="max-w-4xl py-12 md:py-16">
          <div className="rounded-2xl border border-line bg-card p-6 shadow-card md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
              Praxis vor Ort
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">
              Augsburg-Hochzoll
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              {practice.street}, {practice.zip} {practice.city}. Erreichbar aus{" "}
              {practice.reach.join(", ")}. {practice.hours}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild>
                <a href={`tel:${practice.phoneTel}`}>
                  <Phone className="size-4" /> {practice.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/kontakt">Nachricht schreiben</Link>
              </Button>
              <Button asChild variant="clay">
                <Link to="/online-anamnesebogen">Online-Anamnesebogen</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="max-w-4xl space-y-8 py-12">
        <FaqList items={practiceFaqs} />
        <AuthorByline />
        <Disclaimer />
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
      <h2 className="pt-2 font-display text-3xl font-semibold text-sage-700">
        {block.text}
      </h2>
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
    return (
      <QuotePanel
        quote={block.text.replace(/^[„"]|[”"]$/g, "")}
        cite="Praxistext"
      />
    );
  }
  if (block.type === "scans") {
    return (
      <div className="space-y-5">
        {block.hint ? (
          <p className="text-[1.05rem] leading-relaxed text-muted">{block.hint}</p>
        ) : null}
        <PhotoBand title="Scanbilder – Hinweis, keine Labordiagnose" items={scans} nested />
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
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="mt-3 font-display text-xl font-semibold text-sage-700">
                {title}
              </p>
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
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
        {block.items.length ? (
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </IconCard>
    );
  }
  if (block.type === "list") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {block.items.map((item, li) => {
          const Icon = ICONS[li % ICONS.length];
          return (
            <div key={item} className="rounded-2xl border border-line bg-paper p-5 shadow-card">
              <span className="grid size-11 place-items-center rounded-2xl bg-sage-50 text-sage">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="mt-3 text-base leading-relaxed text-muted">{item}</p>
            </div>
          );
        })}
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
              className={`group overflow-hidden rounded-2xl border border-line bg-paper p-5 shadow-card ${
                href ? "transition hover:-translate-y-1 hover:shadow-elevated" : "pointer-events-none"
              }`}
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

function PhotoBand({
  title,
  items,
  nested = false,
}: {
  title: string;
  items: Pic[];
  nested?: boolean;
}) {
  if (!items.length) return null;
  const grid = (
    <div className={`grid gap-5 ${items.length === 1 ? "" : "sm:grid-cols-2"}`}>
      {items.map((pic) => (
        <figure
          key={pic.src}
          className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card"
        >
          <img
            src={pic.src}
            alt={pic.alt}
            width={900}
            height={640}
            loading="lazy"
            decoding="async"
            className="aspect-[5/3] w-full object-cover"
          />
          <figcaption className="p-5">
            <p className="font-display text-xl font-semibold text-sage-700">
              {pic.caption}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
  if (nested) return grid;
  return (
    <section className="border-t border-line bg-sand-50">
      <Container className="max-w-5xl py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
          Bilder zur Seite
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-sage-700">{title}</h2>
        <div className="mt-8">{grid}</div>
      </Container>
    </section>
  );
}

function guessHref(name: string) {
  const direct = topicHref[name];
  if (direct) return direct;
  const hit = Object.entries(topicHref).find(([key]) =>
    name.toLowerCase().includes(key.toLowerCase()),
  );
  return hit?.[1];
}

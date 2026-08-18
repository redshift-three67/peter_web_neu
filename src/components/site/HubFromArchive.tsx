import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Heart,
  Leaf,
  Phone,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { getArchiveBySlug } from "@/content/archive";
import { blocksFromParts, editorialParts, topicHref } from "@/lib/hub-blocks";
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
  const blocks = page ? blocksFromParts(editorialParts(page)) : [];
  const slides = (page?.slider ?? [])
    .filter((s) => s.src && !/Peter-Rauch-Heilpraktiker/i.test(s.src))
    .map((s) => ({
      src: mediaSrc(s.src, s.src),
      alt: s.alt || s.title,
      title: s.title,
      meta: s.meta,
    }));
  const photos = (page?.images ?? [])
    .map((img) => img.local)
    .filter((src): src is string => Boolean(src))
    .filter((src) => !/logo|icon|Peter-Rauch-Heilpraktiker|verband|\.svg$/i.test(src));
  const hero = slides.length
    ? slides
    : photos[0]
      ? [{ src: mediaSrc(photos[0]), alt: heading }]
      : [];
  const gallery = photos
    .filter((src) => mediaSrc(src) !== hero[0]?.src)
    .slice(0, 6);

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
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold text-sage-700 md:text-4xl">
              {heading}
            </h1>
            {lead ? <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p> : null}
          </Container>
        </section>
      )}
      <PhoneChip className="border-b border-line bg-bg" />

      <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
        <article className="min-w-0 space-y-6">
          {lead && hero.length ? (
            <p className="text-lg leading-relaxed text-muted">{lead}</p>
          ) : null}

          {blocks.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="pt-4 font-display text-3xl font-semibold text-sage-700"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "warning") {
              return (
                <WarningNote key={i} title="Einordnung">
                  <p>{block.text}</p>
                </WarningNote>
              );
            }
            if (block.type === "quote") {
              return (
                <QuotePanel key={i} quote={block.text.replace(/^[„"]|[”"]$/g, "")} cite="Quelle im Praxistext" />
              );
            }
            if (block.type === "topics") {
              return (
                <div key={i} className="grid gap-3 sm:grid-cols-2">
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
                      <div
                        key={title}
                        className="rounded-2xl border border-line bg-paper p-5 shadow-card"
                      >
                        {inner}
                      </div>
                    );
                  })}
                </div>
              );
            }
            if (block.type === "card") {
              const Icon = ICONS[i % ICONS.length];
              return (
                <IconCard key={i} icon={Icon} title={block.title}>
                  {block.subtitle ? (
                    <p className="font-medium text-sage">{block.subtitle}</p>
                  ) : null}
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
                </IconCard>
              );
            }
            if (block.type === "list") {
              return (
                <div key={i} className="grid gap-3 sm:grid-cols-2">
                  {block.items.map((item, li) => {
                    const Icon = ICONS[li % ICONS.length];
                    return (
                      <div
                        key={item}
                        className="rounded-2xl border border-line bg-paper p-5 shadow-card"
                      >
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
                <div key={i} className="flex flex-wrap gap-2">
                  {block.items.map((name) => {
                    const href = guessHref(name);
                    return href ? (
                      <a
                        key={name}
                        href={href}
                        className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-sage-700 hover:border-sage"
                      >
                        {name}
                      </a>
                    ) : (
                      <span
                        key={name}
                        className="rounded-full border border-line bg-sage-50 px-4 py-2 text-sm text-muted"
                      >
                        {name}
                      </span>
                    );
                  })}
                </div>
              );
            }
            return (
              <p key={i} className="text-base leading-relaxed text-fg/90">
                {block.text}
              </p>
            );
          })}
        </article>

        <aside className="space-y-5">
          {gallery.length ? (
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((src) => (
                <img
                  key={src}
                  src={mediaSrc(src)}
                  alt=""
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
                />
              ))}
            </div>
          ) : null}
          <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
              Praxis vor Ort
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-sage-700">
              Augsburg-Hochzoll
            </p>
            <p className="mt-2 text-base leading-relaxed text-muted">
              {practice.street}, {practice.zip} {practice.city}. Erreichbar aus{" "}
              {practice.reach.join(", ")}.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild>
                <a href={`tel:${practice.phoneTel}`}>
                  <Phone className="size-4" /> {practice.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/kontakt">Nachricht schreiben</Link>
              </Button>
              <Button asChild variant="clay" className="w-full">
                <Link to="/online-anamnesebogen">Online-Anamnesebogen</Link>
              </Button>
            </div>
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-2">
          <FaqList items={practiceFaqs} />
          <AuthorByline />
          <Disclaimer />
        </div>
      </Container>
      {showCta ? <CtaBand /> : null}
    </>
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

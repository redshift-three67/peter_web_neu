import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import {
  getArchiveBySlug,
  type ArchivePage,
  type ArchivePart,
} from "@/content/archive";
import { NAV_CHROME } from "@/content/hubs";
import { practice } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
} from "@/components/site/Shared";
import { PhoneChip } from "@/components/site/Design";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";

function mediaSrc(local: string | null | undefined, fallback = "") {
  if (!local) return fallback;
  if (/\.(jpe?g|png)$/i.test(local)) {
    return local.replace(/\.(jpe?g|png)$/i, ".webp");
  }
  return local;
}

export function editorialParts(page: ArchivePage): ArchivePart[] {
  const start = page.parts.findIndex((p) => p.tag === "h1");
  const slice = start >= 0 ? page.parts.slice(start + 1) : page.parts;
  return slice.filter((part) => {
    if (NAV_CHROME.has(part.text.trim())) return false;
    if (part.tag === "li" && part.text.length < 80 && /Diagnostik|Hinweisdiagnostik|Download|Impressum/.test(part.text)) {
      return false;
    }
    if (/^Anschrift: Naturheilpraxis/.test(part.text)) return false;
    if (/^Bioresonanztherapie NLS Diagnose/.test(part.text)) return false;
    if (part.tag === "h1") return false;
    return part.text.trim().length > 0;
  });
}

export function HubFromArchive({
  slug,
  heading,
  kicker,
  lead,
}: {
  slug: string;
  heading: string;
  kicker: string;
  lead?: string;
}) {
  const page = getArchiveBySlug(slug);
  const parts = page ? editorialParts(page) : [];
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
    .filter((src) => !/logo|icon|Peter-Rauch-Heilpraktiker|verband/i.test(src));
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
        <article className="max-w-3xl space-y-4 text-base leading-relaxed text-fg/90">
          {lead && hero.length ? <p className="text-lg text-muted">{lead}</p> : null}
          {parts.map((part, i) => {
            if (part.tag === "h2") {
              return (
                <h2 key={i} className="pt-4 font-display text-3xl font-semibold text-sage-700">
                  {part.text}
                </h2>
              );
            }
            if (part.tag === "h3") {
              return (
                <h3 key={i} className="pt-2 font-display text-2xl font-semibold text-sage-700">
                  {part.text}
                </h3>
              );
            }
            if (part.tag === "li") {
              return (
                <p key={i} className="pl-4">
                  • {part.text}
                </p>
              );
            }
            return <p key={i}>{part.text}</p>;
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
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
                />
              ))}
            </div>
          ) : null}
          <div className="rounded-2xl border border-line bg-card p-5 shadow-card">
            <p className="font-display text-xl font-semibold text-sage-700">
              Praxis in Augsburg-Hochzoll
            </p>
            <p className="mt-2 text-base text-muted">
              {practice.street}, {practice.zip} {practice.city}. Erreichbar aus{" "}
              {practice.reach.join(", ")}.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild>
                <a href={`tel:${practice.phoneTel}`}>
                  <Phone className="size-4" /> {practice.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/kontakt">Nachricht schreiben</Link>
              </Button>
              <a
                href="/online-anamnesebogen"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-clay px-5 text-sm font-medium text-paper hover:bg-terracotta-light"
              >
                Online-Anamnesebogen
              </a>
            </div>
          </div>
        </aside>
        <div className="lg:col-span-2">
          <AuthorByline />
          <Disclaimer className="mt-8" />
        </div>
      </Container>
      <CtaBand />
    </>
  );
}

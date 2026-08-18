import { Link } from "@tanstack/react-router";
import { Archive, Phone } from "lucide-react";
import type { ArchiveImage, ArchivePage, ArchiveSlide } from "@/content/archive";
import { practice } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
} from "@/components/site/Shared";
import { IconCard, PhoneChip, WarningNote } from "@/components/site/Design";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";

function mediaSrc(local: string | null | undefined, fallback = "") {
  if (!local) return fallback;
  if (/\.(jpe?g|png)$/i.test(local)) {
    return local.replace(/\.(jpe?g|png)$/i, ".webp");
  }
  return local;
}

function isChrome(img: { local?: string | null; url?: string; alt?: string; src?: string }) {
  const hay = `${img.local ?? ""} ${img.url ?? ""} ${img.alt ?? ""} ${img.src ?? ""}`;
  return /logo|icon|favicon|widget|verband|\.svg$/i.test(hay);
}

function isPortrait(img: { local?: string | null; url?: string; src?: string }) {
  return /Peter-Rauch-Heilpraktiker-Augsburg/i.test(
    `${img.local ?? ""} ${img.url ?? ""} ${img.src ?? ""}`,
  );
}

export function ArchiveArticle({ page }: { page: ArchivePage }) {
  const slides = (page.slider ?? []).filter((s) => s.src && !isPortrait(s));
  const photos = page.images.filter(
    (img): img is ArchiveImage & { local: string } =>
      Boolean(img.local) && !isChrome(img) && !isPortrait(img),
  );
  const portrait = page.images.find((img) => img.local && isPortrait(img));

  const heroSlides =
    slides.length > 0
      ? slides.map((s: ArchiveSlide) => ({
          src: mediaSrc(s.src, s.src),
          alt: s.alt || s.title,
          title: s.title,
          meta: s.meta,
        }))
      : photos[0]
        ? [
            {
              src: mediaSrc(photos[0].local, photos[0].url),
              alt: photos[0].alt || page.h1,
              title: page.description || undefined,
              meta: undefined,
            },
          ]
        : portrait?.local
          ? [
              {
                src: mediaSrc(portrait.local),
                alt: "Peter Rauch, Heilpraktiker in Augsburg",
                title: undefined,
                meta: undefined,
              },
            ]
          : [];

  const heroSrc = heroSlides[0]?.src ?? "";
  const gallery = photos
    .map((img) => img.local)
    .filter((src, i, arr) => arr.indexOf(src) === i)
    .filter((src) => mediaSrc(src) !== heroSrc)
    .slice(0, 8);

  return (
    <>
      {heroSlides.length > 0 ? (
        <PageHeroSlider
          slides={heroSlides}
          heading={page.h1}
          kicker="Entwurf · übernommen aus WordPress · nicht indexiert"
        />
      ) : (
        <section className="border-b border-line bg-sage-50">
          <Container className="py-12 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Entwurf · nicht indexiert
            </p>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold text-sage-700 md:text-4xl">
              {page.h1}
            </h1>
            {page.description ? (
              <p className="mt-4 max-w-2xl text-lg text-muted">{page.description}</p>
            ) : null}
          </Container>
        </section>
      )}

      <PhoneChip className="border-b border-line bg-bg" />

      <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
        <article className="max-w-3xl space-y-4 text-base leading-relaxed text-fg/90">
          {page.description && heroSlides.length > 0 ? (
            <p className="text-lg text-muted">{page.description}</p>
          ) : null}
          {page.parts.map((part, i) => {
            if (part.tag === "h1") return null;
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
          <WarningNote title="Noch nicht veröffentlicht">
            <p>
              Texte und Bilder stammen von der bisherigen WordPress-Seite und
              sind hier als Entwurf vorbereitet. Diese URL ist auf{" "}
              <strong>noindex</strong> gesetzt und ersetzt die Live-Seite nicht.
            </p>
          </WarningNote>

          {portrait?.local ? (
            <figure className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
              <img
                src={mediaSrc(portrait.local)}
                alt="Peter Rauch, Heilpraktiker in Augsburg"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="px-4 py-3 text-base text-muted">
                Peter Rauch · Heilpraktiker, Augsburg-Hochzoll
              </figcaption>
            </figure>
          ) : null}

          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((src) => (
                <img
                  key={src}
                  src={mediaSrc(src)}
                  alt=""
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
                />
              ))}
            </div>
          ) : null}

          <IconCard icon={Archive} title="Archivstatus">
            <p>
              {page.wordCount} Wörter · {photos.length} Originale
              {slides.length ? ` · ${slides.length} Sliderbilder` : ""}. Quelle:{" "}
              {page.sourceUrl.replace("https://rauch-heilpraktiker.de", "")}
            </p>
            <p>
              <Link to="/archiv" className="text-sage underline-offset-4 hover:underline">
                Zur Archivübersicht
              </Link>
            </p>
          </IconCard>

          <div className="rounded-2xl border border-line bg-card p-5 shadow-card">
            <p className="font-display text-xl font-semibold text-sage-700">
              Nächster Schritt
            </p>
            <p className="mt-2 text-base text-muted">
              Fragen zum Inhalt dieser Seite kläre ich im Gespräch – nicht per
              Online-Diagnose.
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
              <Button asChild variant="clay" className="w-full">
                <Link to="/anamnese">Online-Anamnesebogen</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/erstgespraech">Erstgespräch & Kosten</Link>
              </Button>
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

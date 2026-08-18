import { Link } from "@tanstack/react-router";
import type { ArchiveImage, ArchivePage, ArchiveSlide } from "@/content/archive";
import { AuthorByline, Container, CtaBand, Disclaimer } from "@/components/site/Shared";

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

function ArchiveSlider({ slides }: { slides: ArchiveSlide[] }) {
  const unique = slides.filter((s, i, arr) => arr.findIndex((x) => x.src === s.src) === i);
  if (unique.length < 2) return null;
  return (
    <div className="mt-8">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3">
        {unique.map((slide) => (
          <figure
            key={slide.src}
            className="min-w-[78%] snap-start overflow-hidden rounded-2xl bg-sage-50 shadow-card sm:min-w-[46%]"
          >
            <img
              src={mediaSrc(slide.src, slide.src)}
              alt={slide.alt || slide.title}
              className="aspect-[16/10] w-full object-cover"
            />
            {slide.title || slide.meta ? (
              <figcaption className="border-t border-line bg-paper px-4 py-3">
                {slide.meta ? (
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-clay">
                    {slide.meta}
                  </p>
                ) : null}
                {slide.title ? (
                  <p className="mt-1 font-display text-lg text-sage-deep">{slide.title}</p>
                ) : null}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}

export function ArchiveArticle({ page }: { page: ArchivePage }) {
  const slides = page.slider ?? [];
  const photos = page.images.filter(
    (img): img is ArchiveImage & { local: string } =>
      Boolean(img.local) && !isChrome(img) && !isPortrait(img),
  );
  const portrait = page.images.find((img) => img.local && isPortrait(img));
  const hero: ArchiveImage | ArchiveSlide | undefined =
    slides.find((s) => s.src && !isPortrait(s)) ?? photos[0] ?? portrait;

  const heroSrc =
    hero && "src" in hero
      ? mediaSrc(hero.src, hero.src)
      : hero && "local" in hero
        ? mediaSrc(hero.local, hero.url)
        : "";
  const heroAlt =
    (hero && "alt" in hero && hero.alt) ||
    (hero && "title" in hero && hero.title) ||
    page.h1;

  const gallery = photos
    .map((img) => img.local)
    .filter((src, i, arr) => arr.indexOf(src) === i)
    .filter((src) => mediaSrc(src) !== heroSrc)
    .slice(0, 8);

  return (
    <>
      <section className="border-b border-line bg-sand-50">
        <Container className="grid gap-8 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-end md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
              Entwurf · übernommen aus WordPress · nicht indexiert
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-sage-700 sm:text-5xl">
              {page.h1}
            </h1>
            {page.description ? (
              <p className="mt-4 max-w-2xl text-lg text-muted">{page.description}</p>
            ) : null}
            <p className="mt-4 text-xs text-muted">
              Quelle: {page.sourceUrl} · {page.wordCount} Wörter · {photos.length} Originale
              {slides.length ? ` · ${slides.length} Sliderbilder` : ""}
            </p>
          </div>
          {heroSrc ? (
            <div className="overflow-hidden rounded-3xl shadow-elevated">
              <img src={heroSrc} alt={heroAlt} className="aspect-[4/3] w-full object-cover" />
            </div>
          ) : null}
        </Container>
        {slides.length > 1 ? (
          <Container className="pb-10">
            <ArchiveSlider slides={slides} />
          </Container>
        ) : null}
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-fg/90">
          {page.parts.map((part, i) => {
            if (part.tag === "h1") return null;
            if (part.tag === "h2") {
              return (
                <h2 key={i} className="pt-4 font-display text-3xl text-sage-deep">
                  {part.text}
                </h2>
              );
            }
            if (part.tag === "h3") {
              return (
                <h3 key={i} className="pt-2 font-display text-2xl text-sage-deep">
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
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {gallery.map((src) => (
                <img
                  key={src}
                  src={mediaSrc(src)}
                  alt=""
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                />
              ))}
            </div>
          ) : null}
          {portrait?.local ? (
            <figure className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
              <img
                src={mediaSrc(portrait.local)}
                alt="Peter Rauch, Heilpraktiker in Augsburg"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="px-4 py-3 text-sm text-muted">
                Peter Rauch · Heilpraktiker, Augsburg-Hochzoll
              </figcaption>
            </figure>
          ) : null}
          <div className="rounded-2xl border border-line bg-paper p-5 text-sm text-muted shadow-soft">
            <p className="font-medium text-sage-deep">Archivstatus</p>
            <p className="mt-2">
              Texte und Live-Bilder dieser Seite sind portiert und an das neue
              Design angepasst, aber noch nicht öffentlich freigegeben.
            </p>
            <p className="mt-3">
              <Link to="/archiv" className="text-sage underline-offset-4 hover:underline">
                Zur Archivübersicht
              </Link>
            </p>
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

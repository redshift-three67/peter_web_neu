import { Link } from "@tanstack/react-router";
import type { ArchivePage } from "@/content/archive";
import { AuthorByline, Container, CtaBand, Disclaimer } from "@/components/site/Shared";

function mediaSrc(local: string | null, fallback: string) {
  if (!local) return fallback;
  const webp = local.replace(/\.(jpe?g|png)$/i, ".webp");
  return webp;
}

export function ArchiveArticle({ page }: { page: ArchivePage }) {
  const photos = page.images.filter(
    (img) =>
      img.local &&
      !/\.(svg)$/i.test(img.local) &&
      !/logo|icon|favicon|widget|verband/i.test(`${img.local} ${img.url} ${img.alt}`),
  );
  const hero = photos[0] ?? page.images.find((img) => img.local) ?? page.images[0];
  const gallery = photos.slice(0, 6);

  return (
    <>
      <section className="border-b border-line bg-sand/60">
        <Container className="grid gap-8 py-12 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
              Entwurf · übernommen aus WordPress · nicht indexiert
            </p>
            <h1 className="mt-3 font-display text-4xl text-sage-deep sm:text-5xl">
              {page.h1}
            </h1>
            {page.description ? (
              <p className="mt-4 max-w-2xl text-lg text-muted">{page.description}</p>
            ) : null}
            <p className="mt-4 text-xs text-muted">
              Quelle: {page.sourceUrl} · {page.wordCount} Wörter · Status {page.status}
            </p>
          </div>
          {hero ? (
            <div className="overflow-hidden rounded-xl shadow-card">
              <img
                src={mediaSrc(hero.local, hero.url)}
                alt={hero.alt || page.h1}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          ) : null}
        </Container>
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
          {gallery.length > 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {gallery.map((img) => (
                <img
                  key={img.local ?? img.url}
                  src={mediaSrc(img.local, img.url)}
                  alt={img.alt || ""}
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                />
              ))}
            </div>
          ) : null}
          <div className="rounded-xl border border-line bg-paper p-5 text-sm text-muted">
            <p className="font-medium text-sage-deep">Archivstatus</p>
            <p className="mt-2">
              Diese Seite ist portiert und an das neue Design angepasst, aber
              noch nicht freigegeben. Sie erscheint nicht in der Navigation und
              nicht in der öffentlichen Sitemap.
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

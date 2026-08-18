import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { getArchiveBySlug } from "@/content/archive";
import {
  blocksFromParts,
  captionFromPath,
  classifyImage,
  editorialParts,
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
import { PhoneChip, WarningNote } from "@/components/site/Design";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";

function mediaSrc(local: string | null | undefined) {
  if (!local) return "";
  if (/\.(jpe?g|png)$/i.test(local)) return local.replace(/\.(jpe?g|png)$/i, ".webp");
  return local;
}

const steps = [
  {
    n: "01",
    title: "Gespräch in Hochzoll",
    text: "Zuerst die Anamnese und das, was bereits ärztlich geklärt ist.",
  },
  {
    n: "02",
    title: "Hinweisbild",
    text: "Das Gerät liefert Anhaltspunkte. Es ersetzt kein Labor und keine Diagnose.",
  },
  {
    n: "03",
    title: "Einordnung",
    text: "Gemeinsam lesen wir, was der Hinweis bedeuten kann – und was nicht.",
  },
  {
    n: "04",
    title: "Nächster Schritt",
    text: "Planen – oder zuerst zur Ärztin, zum Arzt. Ohne Heilversprechen.",
  },
];

export function NlsNeko({
  heading,
  kicker,
  lead,
}: {
  heading: string;
  kicker: string;
  lead?: string;
}) {
  const page = getArchiveBySlug("nls-diagnostik");
  const blocks = page ? blocksFromParts(editorialParts(page), heading) : [];
  const pics = (page?.images ?? [])
    .filter((img) => img.local)
    .map((img) => {
      const src = mediaSrc(img.local);
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

  const slides = (page?.slider ?? [])
    .filter((s) => s.src && classifyImage(s.src, s.alt) === "device")
    .map((s) => ({
      src: mediaSrc(s.src),
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
              src: "/images/free/raum-licht.jpg",
              alt: heading,
              title: heading,
              meta: kicker,
            },
          ];

  const warnings = blocks.filter((b) => b.type === "warning");
  const prose = blocks.filter((b) => b.type === "p").slice(0, 4);

  return (
    <>
      <PageHeroSlider slides={hero} heading={heading} kicker={kicker} />
      <PhoneChip className="border-b border-line bg-bg" />

      <section className="ac-reveal border-b border-line bg-[#1D2C38] text-[#F7F1E8]">
        <Container className="grid gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
              Neko-Logik · Hinweis vor der Zahl
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
              Was der Scan zeigen kann — und was er ausdrücklich nicht ersetzt.
            </h2>
            {lead ? <p className="mt-5 text-[1.125rem] leading-relaxed opacity-90">{lead}</p> : null}
          </div>
          <dl className="space-y-6 text-base leading-relaxed">
            <div>
              <dt className="font-semibold">Hinweis</dt>
              <dd className="mt-1 opacity-90">
                Ergänzendes Verfahren in der Naturheilpraxis Rauch,
                Augsburg-Hochzoll. Anhaltspunkte für das Gespräch.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Nicht</dt>
              <dd className="mt-1 opacity-90">
                Kein Labor, keine ärztliche Diagnose, kein Heilversprechen, kein
                Ersatz für Bildgebung oder Facharzt.
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="ac-reveal border-b border-line bg-paper">
        <Container className="grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-display text-3xl font-medium text-fg/35">{s.n}</p>
              <h3 className="mt-2 text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {warnings.length ? (
        <section className="ac-reveal border-b border-line">
          <Container className="max-w-3xl space-y-4 py-10">
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

      {devices.length ? (
        <section className="ac-reveal border-b border-line">
          <Container className="py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Geräte in der Praxis
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium text-fg">
              Fixe Motive – zum Einordnen, nicht zum Staunen.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {devices.slice(0, 6).map((pic) => (
                <figure key={pic.src} className="overflow-hidden rounded-xl border border-line">
                  <img
                    src={pic.src}
                    alt={pic.alt}
                    className="aspect-[5/3] w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="p-4 text-sm text-muted">{pic.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {scans.length ? (
        <section className="ac-reveal border-b border-line bg-card">
          <Container className="py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Ausschnitte
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium text-fg">
              Zum Betrachten – nicht als Befund.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {scans.slice(0, 6).map((pic) => (
                <figure key={pic.src} className="overflow-hidden rounded-xl border border-line bg-paper">
                  <img
                    src={pic.src}
                    alt={`${pic.alt} – Hinweisbild, kein medizinischer Befund`}
                    className="aspect-[5/3] w-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="p-4 text-sm text-muted">{pic.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {prose.length ? (
        <section className="ac-reveal border-b border-line">
          <Container className="max-w-3xl space-y-5 py-14 text-[1.125rem] leading-relaxed text-fg">
            {prose.map((b, i) =>
              b.type === "p" ? <p key={i}>{b.text}</p> : null,
            )}
          </Container>
        </section>
      ) : null}

      <ReviewStrip />

      <section className="ac-reveal">
        <Container className="grid gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Häufige Fragen
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium text-fg">
              Klarheit vor dem ersten Anruf
            </h2>
            <div className="mt-6">
              <FaqList items={practiceFaqs} />
            </div>
          </div>
          <aside className="rounded-xl border border-line bg-card p-6">
            <p className="flex items-center gap-2 text-sm font-medium text-sage">
              <MapPin className="size-4" /> NLS in Augsburg-Hochzoll
            </p>
            <h3 className="mt-2 text-xl font-semibold">
              {practice.street}, {practice.city}-{practice.district}
            </h3>
            <img
              src="/images/anfahrt.jpg"
              alt="Praxiszugang Friedrich-Deffner-Straße, Augsburg-Hochzoll"
              className="mt-5 aspect-[16/10] w-full rounded-xl object-cover"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`tel:${practice.phoneTel}`}>
                  <Phone className="size-4" /> {practice.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="clay">
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
      <CtaBand />
    </>
  );
}

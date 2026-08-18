import { Link } from "@tanstack/react-router";
import { getArchiveBySlug } from "@/content/archive";
import {
  blocksFromParts,
  captionFromPath,
  classifyImage,
  editorialParts,
} from "@/lib/hub-blocks";
import { practice, practiceFaqs } from "@/content/site";
import {
  AuthorByline,
  Container,
  Disclaimer,
  FaqList,
} from "@/components/site/Shared";
import { WarningNote } from "@/components/site/Design";

function mediaSrc(local: string | null | undefined) {
  if (!local) return "";
  if (/\.(jpe?g|png)$/i.test(local)) return local.replace(/\.(jpe?g|png)$/i, ".webp");
  return local;
}

const steps = [
  { n: "01", title: "Gespräch", text: "Anamnese in Hochzoll. Was ist bereits ärztlich geklärt?" },
  { n: "02", title: "Hinweisbild", text: "Das Gerät liefert Anhaltspunkte – kein Labor, keine Diagnose." },
  { n: "03", title: "Einordnung", text: "Gemeinsam lesen, was der Hinweis bedeuten kann." },
  { n: "04", title: "Nächster Schritt", text: "Planen – oder zuerst zur Ärztin, zum Arzt." },
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
  const heroSrc = devices[0]?.src ?? scans[0]?.src ?? "/images/free/raum-licht.jpg";
  const warnings = blocks.filter((b) => b.type === "warning");
  const prose = blocks.filter((b) => b.type === "p").slice(0, 5);

  return (
    <div className="bg-[#3A5258] text-[#F4F1EA]">
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-white/55">{kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.12] sm:text-5xl md:text-6xl">
            Hinweis vor der Zahl.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
            {lead ??
              "NLS in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Ergänzend, nicht statt des Arztes."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/online-anamnesebogen"
              className="inline-flex h-11 items-center rounded-full bg-[#2EA4B8] px-5 text-sm font-medium text-white hover:bg-[#258A9B]"
            >
              Anamnesebogen
            </Link>
            <a
              href={`tel:${practice.phoneTel}`}
              className="inline-flex h-11 items-center rounded-full border border-white/25 px-5 text-sm text-white/90 hover:bg-white/10"
            >
              {practice.phoneDisplay}
            </a>
          </div>
        </div>
        <figure className="overflow-hidden rounded-[1.5rem] bg-[#4A666C] p-2">
          <img
            src={heroSrc}
            alt={devices[0]?.alt || heading}
            className="aspect-[4/5] w-full rounded-[1.15rem] object-cover sm:aspect-[5/4]"
          />
        </figure>
      </section>

      <section className="border-t border-white/10">
        <Container className="grid gap-10 py-14 md:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-white/45">Was es ist</p>
            <p className="mt-3 text-lg leading-relaxed text-white/85">
              Ein Hinweisverfahren. Anhaltspunkte für das Gespräch in
              Augsburg-Hochzoll – nicht mehr.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-white/45">Was es nicht ist</p>
            <p className="mt-3 text-lg leading-relaxed text-white/85">
              Kein Labor, keine ärztliche Diagnose, kein Heilversprechen, kein
              Ersatz für Bildgebung oder Facharzt.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#33484D]">
        <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-display text-3xl text-white/35">{s.n}</p>
              <h2 className="mt-2 text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {warnings.length ? (
        <Container className="space-y-4 py-10">
          {warnings.map((w, i) =>
            w.type === "warning" ? (
              <div key={i} className="rounded-xl bg-[#F4F1EA] text-[#2C2825]">
                <WarningNote title="Einordnung">
                  <p>{w.text}</p>
                </WarningNote>
              </div>
            ) : null,
          )}
        </Container>
      ) : null}

      {devices.length ? (
        <section className="bg-[#F4F1EA] text-[#2C2825]">
          <Container className="py-16">
            <p className="text-xs tracking-[0.18em] text-[#6B6560] uppercase">Geräte in der Praxis</p>
            <h2 className="mt-2 font-display text-3xl font-medium">
              Fixe Motive — zum Einordnen.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {devices.slice(0, 6).map((pic) => (
                <figure key={pic.src}>
                  <img
                    src={pic.src}
                    alt={pic.alt}
                    className="aspect-[5/3] w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <figcaption className="mt-2 text-sm text-[#6B6560]">{pic.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {scans.length ? (
        <section className="bg-[#E8EEF0] text-[#2C2825]">
          <Container className="py-16">
            <p className="text-xs tracking-[0.18em] text-[#6B6560] uppercase">Ausschnitte</p>
            <h2 className="mt-2 font-display text-3xl font-medium">
              Zum Betrachten — nicht als Befund.
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {scans.slice(0, 6).map((pic) => (
                <figure key={pic.src}>
                  <img
                    src={pic.src}
                    alt={`${pic.alt} – Hinweisbild, kein medizinischer Befund`}
                    className="aspect-[5/3] w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <figcaption className="mt-2 text-sm text-[#6B6560]">{pic.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {prose.length ? (
        <section className="bg-[#F4F1EA] text-[#2C2825]">
          <Container className="max-w-3xl space-y-5 py-16 text-[1.125rem] leading-relaxed">
            {prose.map((b, i) =>
              b.type === "p" ? <p key={i}>{b.text}</p> : null,
            )}
          </Container>
        </section>
      ) : null}

      <section className="bg-[#F4F1EA] text-[#2C2825]">
        <Container className="max-w-3xl py-12">
          <h2 className="font-display text-3xl font-medium">Fragen vor dem Anruf</h2>
          <div className="mt-6">
            <FaqList items={practiceFaqs} />
          </div>
          <p className="mt-8 text-sm text-[#6B6560]">
            {practice.street}, {practice.city}-{practice.district} ·{" "}
            <a href={`tel:${practice.phoneTel}`}>{practice.phoneDisplay}</a>
          </p>
          <AuthorByline />
          <Disclaimer className="mt-8" />
        </Container>
      </section>
    </div>
  );
}

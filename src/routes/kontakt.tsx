import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { PhoneChip } from "@/components/site/Design";
import { Container, Disclaimer, PageHero } from "@/components/site/Shared";
import { Button } from "@/components/ui/button";
import { getArchiveBySlug } from "@/content/archive";
import { hubMeta } from "@/content/hubs";
import { practice } from "@/content/site";
import { pageHead } from "@/lib/seo";
import { PageHeroSlider } from "@/components/site/PageHeroSlider";

const path = "/kontakt";
const meta = hubMeta[path];

export const Route = createFileRoute("/kontakt")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  const archived = getArchiveBySlug("kontakt");
  const slides = (archived?.slider ?? [])
    .filter((s) => s.src)
    .map((s) => ({
      src: s.src.replace(/\.(jpe?g|png)$/i, ".webp"),
      alt: s.alt || s.title,
      title: s.title,
      meta: s.meta,
    }));

  return (
    <>
      {slides.length ? (
        <PageHeroSlider
          slides={slides}
          heading="Kontakt – Heilpraktiker Augsburg"
          kicker={meta.kicker}
        />
      ) : (
        <PageHero
          kicker={meta.kicker}
          title="Kontakt – Heilpraktiker Augsburg"
          lead="Termin nach Vereinbarung in Augsburg-Hochzoll. Das Formular ist kein Notfallweg."
        />
      )}
      <PhoneChip className="border-b border-line bg-bg" />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <p className="text-lg text-muted">
            Termin nach Vereinbarung in der Friedrich-Deffner-Straße 19a,
            Augsburg-Hochzoll. Das Formular ist kein Notfallweg.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
        <aside className="space-y-5">
          <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
            <p className="flex items-center gap-2 text-sm font-medium text-sage">
              <MapPin className="size-4" /> Praxis vor Ort
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-sage-700">
              {practice.street}, {practice.city}-{practice.district}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {practice.zip} {practice.city}. Erreichbar aus{" "}
              {practice.reach.join(", ")}.
            </p>
            <p className="mt-4 text-base text-muted">{practice.hours}</p>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild>
                <a href={`tel:${practice.phoneTel}`}>
                  <Phone className="size-4" /> {practice.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={practice.mapsQuery} target="_blank" rel="noreferrer">
                  Google Maps
                </a>
              </Button>
              <Button asChild variant="clay" className="w-full">
                <Link to="/online-anamnesebogen">Online-Anamnesebogen</Link>
              </Button>
            </div>
          </div>
        </aside>
        <Disclaimer className="lg:col-span-2" />
      </Container>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { Container, Disclaimer, PageHero } from "@/components/site/Shared";
import { practice } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/kontakt")({
  head: () =>
    pageHead({
      title: "Kontakt – Naturheilpraxis Rauch Augsburg-Hochzoll",
      description:
        "Terminvereinbarung bei Heilpraktiker Peter Rauch. Telefon 0821 2621462, Friedrich-Deffner-Straße 19a, 86163 Augsburg.",
      path: "/kontakt",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Kontakt"
        title="Schreiben oder anrufen"
        lead="Termine nach Vereinbarung. Das Formular ist kein Notfallweg."
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <aside className="rounded-2xl border border-line bg-card p-6 shadow-card">
          <h2 className="font-display text-2xl text-sage-deep">Praxis</h2>
          <p className="mt-3 leading-relaxed">
            {practice.name}
            <br />
            {practice.street}
            <br />
            {practice.zip} {practice.city} ({practice.district})
          </p>
          <p className="mt-4">
            <a className="text-sage" href={`tel:${practice.phoneTel}`}>
              {practice.phoneDisplay}
            </a>
            <br />
            <a className="text-sage" href={`mailto:${practice.email}`}>
              {practice.email}
            </a>
          </p>
          <p className="mt-4 text-sm text-muted">{practice.hours}</p>
          <p className="mt-4 text-sm text-muted">
            Erreichbar aus {practice.reach.join(", ")}.
          </p>
        </aside>
        <Disclaimer className="lg:col-span-2" />
      </Container>
    </>
  );
}

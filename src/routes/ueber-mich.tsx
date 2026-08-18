import { createFileRoute } from "@tanstack/react-router";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  PageHero,
  Prose,
} from "@/components/site/Shared";
import { practice } from "@/content/site";
import { pageHead } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";

export const Route = createFileRoute("/ueber-mich")({
  head: () =>
    pageHead({
      title: "Über mich – Peter Rauch, Heilpraktiker in Augsburg",
      description:
        "Vita von Peter Rauch: Physiotherapeut seit 2001, Heilpraktiker seit 2006, Hypnotherapeut. Naturheilpraxis in Augsburg-Hochzoll.",
      path: "/ueber-mich",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Start", href: "/" },
          { name: "Über mich", href: "/ueber-mich" },
        ]}
      />
      <PageHero
        kicker="Person & Qualifikation"
        title="Peter Rauch – Heilpraktiker und Physiotherapeut"
        lead="Zwanzig Jahre Arbeit am Menschen. Keine Geräte-Show. Eine Praxis, in der Zeit, Hände und Gespräch zusammengehören."
        image="/images/gespraech.jpg"
        imageAlt="Gesprächsplatz in der Naturheilpraxis"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Ich bin {practice.person}, {practice.role} in Augsburg-Hochzoll. Die
            Erlaubnis zur berufsmäßigen Ausübung der Heilkunde ohne ärztliche
            Bestallung erhielt ich am {practice.sinceHp} durch das{" "}
            {practice.licenseHp}. Die Berufsbezeichnung Physiotherapeut führe
            ich seit {practice.sincePt} (Erlaubnis: {practice.licensePt}).
          </p>
          <p>
            Zusätzlich arbeite ich als Hypnotherapeut. Ich bin Mitglied im{" "}
            {practice.association}. Aufsichtsbehörde ist das{" "}
            {practice.authority}.
          </p>
          <h2 className="pt-4 font-display text-3xl text-sage-deep">
            Werdegang
          </h2>
          <ul className="space-y-3">
            <li>
              <strong>2001</strong> — Erlaubnis Physiotherapeut,
              Regierungspräsidium Gießen.
            </li>
            <li>
              <strong>2006</strong> — Heilpraktikererlaubnis, Landratsamt
              Aichach-Friedberg.
            </li>
            <li>
              <strong>seit 2013</strong> — Arbeit mit biophysikalischer
              Informationstherapie und Bioresonanzsystemen in der eigenen
              Praxis – als ergänzende Hinweisverfahren, nicht als
              Schulmedizin.
            </li>
            <li>
              <strong>heute</strong> — Einzelpraxis in der
              Friedrich-Deffner-Straße 19a, Augsburg-Hochzoll.
            </li>
          </ul>
          <h2 className="pt-4 font-display text-3xl text-sage-deep">
            Haltung
          </h2>
          <p>
            Ich betrachte den Menschen als Ganzes. Körperliche und seelische
            Beschwerden gehören oft zusammen. Mein Ziel ist nicht, ein Gerät
            zu verkaufen, sondern Zusammenhänge verständlich zu machen und
            nächste Schritte zu planen.
          </p>
          <p>
            Zur Dorntherapie sage ich bewusst: Eine gesonderte
            Dorn-Ausbildung habe ich nicht absolviert. Die bestehenden
            manuellen Ausbildungen decken die wesentlichen Anteile ab. Diese
            Ehrlichkeit gehört für mich zur Expertise.
          </p>
        </Prose>
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

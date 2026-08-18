import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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

export const Route = createFileRoute("/anfahrt")({
  head: () =>
    pageHead({
      title: "Anfahrt Heilpraktiker Augsburg-Hochzoll",
      description:
        "Naturheilpraxis Rauch, Friedrich-Deffner-Straße 19a, 86163 Augsburg-Hochzoll. Parken, ÖPNV, Anfahrt aus Friedberg und Lechhausen.",
      path: "/anfahrt",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker={`${practice.city}-${practice.district}`}
        title="Anfahrt zur Praxis"
        lead="An der Naht zwischen Augsburg-Hochzoll und Friedberg. Wenige Minuten von Lechhausen-Ost."
        image="/images/anfahrt.jpg"
        imageAlt="Ruhiger Zugang in einem Wohnquartier"
      />
      <Container className="py-14">
        <Prose>
          <p>
            {practice.street}, {practice.zip} {practice.city}. Die Praxis liegt
            in einem Wohngebiet, nicht in der Innenstadt – das ist Absicht:
            Ruhe vor dem Gespräch.
          </p>
          <h2>Mit dem Auto</h2>
          <p>
            Über die B300 / A8 Richtung Augsburg-Ost, Ausfahrt in Richtung
            Hochzoll / Friedberg. In der Friedrich-Deffner-Straße ist in der
            Regel Straßenparken möglich. Bitte rechnen Sie ein paar Minuten
            extra ein.
          </p>
          <h2>ÖPNV</h2>
          <p>
            S-Bahn-Haltestelle Augsburg-Hochzoll in fußläufiger Nähe. Aus
            Friedberg und Lechhausen-Ost sind es wenige Minuten.
          </p>
          <h2>Einzugsgebiet</h2>
          <p>
            Regelmäßig kommen Menschen aus {practice.reach.join(", ")} sowie{" "}
            {practice.catchment.join(", ")}.
          </p>
        </Prose>
        <div className="mt-8">
          <Button asChild>
            <a href={practice.mapsQuery} target="_blank" rel="noreferrer">
              Route in Google Maps
            </a>
          </Button>
        </div>
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  PageHero,
  Prose,
} from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/hypnotherapie-augsburg")({
  head: () =>
    pageHead({
      title: "Hypnotherapie Augsburg – Heilpraktiker Peter Rauch",
      description:
        "Hypnose als ergänzendes Verfahren in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Kein Ersatz für Psychotherapie nach ärztlichem Standard.",
      path: "/hypnotherapie-augsburg",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Verfahren · Gespräch"
        title="Hypnotherapie in Augsburg"
        lead="Ein ergänzendes Verfahren. Keine Show, keine Garantie, kein Ersatz für psychiatrische Behandlung."
        image="/images/ruhe.jpg"
        imageAlt="Ruhiger Waldpfad"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Hypnose kann Gespräche und körperliche Verfahren ergänzen – etwa
            bei innerer Anspannung, Gewohnheiten oder begleitend zu Schmerz.
            Sie ersetzt keine Richtlinien-Psychotherapie und keine ärztliche
            Behandlung von Depression, Psychose oder Traumafolgestörung.
          </p>
          <p>
            Ob Hypnose sinnvoll ist, klären wir im Erstgespräch. Nicht jeder
            Mensch und nicht jedes Anliegen eignet sich.
          </p>
        </Prose>
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  PageHero,
  Prose,
} from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/erschoepfung-augsburg")({
  head: () =>
    pageHead({
      title: "Erschöpfung & Burnout Augsburg – Heilpraktiker Rauch",
      description:
        "Begleitung bei Erschöpfung, Burnout und innerer Unruhe in Augsburg-Hochzoll. Gespräch, Hypnose, Regulation – ergänzend zur ärztlichen Versorgung.",
      path: "/erschoepfung-augsburg",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Anliegen · Psyche & Kraft"
        title="Erschöpfung, Burnout, innere Unruhe"
        lead="Wenn der Körper nicht mehr mitgeht. Ich arbeite mit Gespräch, Hypnose und körperlicher Regulation – in klaren Grenzen."
        image="/images/ruhe.jpg"
        imageAlt="Waldweg im Morgenlicht"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Erschöpfung kann viele Ursachen haben: Schilddrüse, Eisen, Schlaf,
            Psyche, Dauerstress. Deshalb gehört die ärztliche Abklärung dazu.
            Ich bin Heilpraktiker, kein Facharzt für Psychiatrie.
          </p>
          <p>
            In der Praxis geht es um Verstehen, Stabilisieren und um
            Verfahren, die Körper und Seele zusammen denken: Gespräch,
            Hypnotherapie, manuelle Arbeit, Regulation. Bei akuter Krise,
            Suizidgedanken oder psychiatrischem Notfall ist diese Website der
            falsche Ort – wählen Sie 112 oder 116 117.
          </p>
          <p>
            Mehr:{" "}
            <Link className="text-sage underline-offset-4 hover:underline" to="/hypnotherapie-augsburg">
              Hypnotherapie Augsburg
            </Link>
            .
          </p>
        </Prose>
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

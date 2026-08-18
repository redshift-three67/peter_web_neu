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

export const Route = createFileRoute("/bioresonanz-augsburg")({
  head: () =>
    pageHead({
      title: "Bioresonanz Augsburg – Naturheilpraxis Peter Rauch",
      description:
        "Bioresonanztherapie als ergänzendes, wissenschaftlich nicht anerkanntes Verfahren in Augsburg-Hochzoll. Keine Diagnose, kein Heilversprechen.",
      path: "/bioresonanz-augsburg",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Verfahren · Frequenz"
        title="Bioresonanz in Augsburg"
        lead="Ein erfahrungsmedizinisches Hinweis- und Begleitverfahren. Kein Ersatz für Labor, Bildgebung oder ärztliche Diagnose."
        image="/images/naturheilkunde.jpg"
        imageAlt="Stillleben mit Flaschen und Kräutern"
      />
      <Container className="py-14">
        <Prose>
          <p>
            In der Praxis arbeite ich unter anderem mit einem
            Bioresonanzsystem (Trikombin) sowie verwandten Verfahren der
            biophysikalischen Informationstherapie. Diese Verfahren sind
            schulmedizinisch nicht anerkannt. Es liegen in der Regel keine
            Studien vor, die eine Wirkung im wissenschaftlichen Sinn
            nachweisen.
          </p>
          <p>
            Ich setze sie ergänzend ein – nach Gespräch und im Rahmen einer
            Gesamtplanung. Wer eine gesicherte Diagnose sucht, braucht Ärztin
            oder Arzt und Labor.
          </p>
          <p>
            Überblick:{" "}
            <Link className="text-sage underline-offset-4 hover:underline" to="/verfahren/frequenz">
              Hinweisdiagnostik & Frequenz
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

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

export const Route = createFileRoute("/schmerztherapie-augsburg")({
  head: () =>
    pageHead({
      title: "Schmerztherapie Augsburg – Heilpraktiker Peter Rauch",
      description:
        "Naturheilkundliche und manuelle Schmerztherapie in Augsburg-Hochzoll. Ergänzend zur ärztlichen Abklärung, ohne Heilversprechen.",
      path: "/schmerztherapie-augsburg",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Anliegen · Augsburg-Hochzoll"
        title="Schmerztherapie in Augsburg"
        lead="Wenn der Schmerz bleibt, obwohl schon viel versucht wurde. Ich arbeite manuell, regulativ und im Gespräch – ergänzend, nicht statt des Arztes."
        image="/images/manuelle-therapie.jpg"
        imageAlt="Manuelle Behandlung auf Leinen"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Menschen kommen mit Rücken-, Gelenk- oder chronischen Schmerzen,
            oft nach langer Odyssee. Mein erster Blick gilt der ärztlichen
            Abklärung: Was ist ausgeschlossen, was fehlt, was darf ich
            begleiten?
          </p>
          <h2>Wie ich arbeite</h2>
          <p>
            Manuelle Techniken aus Physiotherapie, osteopathischen Griffen und
            integrativer manueller Arbeit. Ergänzend können
            Injektionsverfahren im heilpraktischen Rahmen, Regulation,
            Homöopathie oder Gespräch sinnvoll sein. Nicht jedes Verfahren
            ist wissenschaftlich anerkannt. Ich sage das dazu.
          </p>
          <p>
            Mehr zum körperlichen Arbeiten:{" "}
            <Link className="text-sage underline-offset-4 hover:underline" to="/verfahren/manuell">
              Manuell & Osteopathie
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

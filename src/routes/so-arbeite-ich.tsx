import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  PageHero,
  Prose,
} from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/so-arbeite-ich")({
  head: () =>
    pageHead({
      title: "So arbeite ich – Ablauf in der Naturheilpraxis Rauch",
      description:
        "Gespräch, Untersuchung, gemeinsame Planung. So läuft ein Termin bei Heilpraktiker Peter Rauch in Augsburg-Hochzoll.",
      path: "/so-arbeite-ich",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Prozess"
        title="Zuerst verstehen, dann zuordnen"
        lead="Ein Termin folgt einem klaren Ablauf. Ohne Heilversprechen. Ohne Ersatz für den Arzt."
        image="/images/hero-praxis.jpg"
        imageAlt="Behandlungsraum mit natürlichem Licht"
      />
      <Container className="py-14">
        <Prose>
          <h2>1. Vorbereitung</h2>
          <p>
            Vor dem Erstgespräch können Sie den{" "}
            <Link to="/anamnese" className="text-sage underline-offset-4 hover:underline">
              Online-Anamnesebogen
            </Link>{" "}
            ausfüllen. Er spart Zeit im Gespräch und ersetzt es nicht.
          </p>
          <h2>2. Gespräch</h2>
          <p>
            Wir ordnen ein, was bereits ärztlich geklärt ist, was fehlt und
            womit ich Sie begleiten darf. Wenn eine ärztliche Abklärung nötig
            ist, sage ich das.
          </p>
          <h2>3. Untersuchung</h2>
          <p>
            Je nach Anliegen: manuelle Befundung, naturheilkundliche
            Hinweisverfahren, Gespräch. NLS, Bioresonanz und Elektroakupunktur
            nach Voll sind keine anerkannten Diagnosen und ersetzen kein Labor.
          </p>
          <h2>4. Planung</h2>
          <p>
            Gemeinsam legen wir die nächsten Schritte fest. Manchmal ist das
            eine manuelle Serie, manchmal Regulation und Mittel, manchmal
            Hypnose – oft eine Kombination. Immer ohne Garantie auf ein
            bestimmtes Ergebnis.
          </p>
        </Prose>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Manuell & Osteopathie", "/verfahren/manuell"],
            ["Hinweisdiagnostik & Frequenz", "/verfahren/frequenz"],
            ["Naturheilkunde & Gespräch", "/verfahren/naturheilkunde"],
          ].map(([label, to]) => (
            <Button key={to} asChild variant="outline" className="h-auto py-4">
              <Link to={to}>{label}</Link>
            </Button>
          ))}
        </div>
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

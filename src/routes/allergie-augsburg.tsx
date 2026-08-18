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

export const Route = createFileRoute("/allergie-augsburg")({
  head: () =>
    pageHead({
      title: "Allergie Heilpraktiker Augsburg – Naturheilpraxis Rauch",
      description:
        "Begleitung bei Allergien und Unverträglichkeiten in Augsburg-Hochzoll. Hinweisverfahren, NAET, Regulation – ohne Heilversprechen.",
      path: "/allergie-augsburg",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Anliegen · Allergie"
        title="Allergie und Unverträglichkeit"
        lead="Wenn der Alltag eng wird – Pollen, Tiere, Nahrung. Ich begleite ergänzend zur Diagnostik durch Ärztin oder Arzt."
        image="/images/naturheilkunde.jpg"
        imageAlt="Kräuter und Flaschen auf einem Holztisch"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Allergien gehören in die ärztliche Diagnostik, wenn der Verdacht
            neu ist oder die Reaktion heftig. In der Praxis arbeite ich mit
            Anamnese, Hinweisverfahren und – wo sinnvoll – NAET sowie
            Regulation. Das ersetzt keinen Prick-Test und keinen Notfallplan.
          </p>
          <p>
            Frequenz- und Hinweisverfahren wie Bioresonanz sind
            erfahrungsmedizinisch und wissenschaftlich nicht anerkannt. Ich
            setze sie als Ergänzung ein, nicht als Beweis.
          </p>
          <p>
            Vertiefung:{" "}
            <Link className="text-sage underline-offset-4 hover:underline" to="/verfahren/frequenz">
              Hinweisdiagnostik & Frequenz
            </Link>{" "}
            und{" "}
            <Link className="text-sage underline-offset-4 hover:underline" to="/bioresonanz-augsburg">
              Bioresonanz Augsburg
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

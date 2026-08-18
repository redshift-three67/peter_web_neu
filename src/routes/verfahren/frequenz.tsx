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

export const Route = createFileRoute("/verfahren/frequenz")({
  head: () =>
    pageHead({
      title: "Hinweisdiagnostik & Frequenzverfahren Augsburg",
      description:
        "NLS, Bioresonanz, Elektroakupunktur nach Voll: ergänzende Hinweisverfahren in der Naturheilpraxis Rauch. Wissenschaftlich nicht anerkannt.",
      path: "/verfahren/frequenz",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Verfahren"
        title="Hinweisdiagnostik & Frequenz"
        lead="Ein Hub statt zwölf Geräte-Seiten. Was ich einsetze – und was es nicht ist."
      />
      <Container className="py-14">
        <Prose>
          <p>
            Unter diesem Dach liegen Bioresonanz, biophysikalische
            Informationstherapie, Elektroakupunktur nach Dr. Voll (EAV) und
            NLS-Systeme. Alle sind komplementärmedizinische Hinweisverfahren.
            Sie ersetzen keine ärztliche Diagnose, kein Labor, keine
            Bildgebung.
          </p>
          <p>
            Ich nenne sie bewusst nicht „Diagnostik“ im schulmedizinischen
            Sinn. Sie können Fragen aufwerfen, die wir dann ärztlich oder
            labortechnisch klären lassen.
          </p>
        </Prose>
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

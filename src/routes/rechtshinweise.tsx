import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHero, Prose } from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/rechtshinweise")({
  head: () =>
    pageHead({
      title: "Rechtshinweise Therapieverfahren – Naturheilpraxis Rauch",
      description:
        "Keine Heilversprechen. Verfahren ersetzen keine ärztliche Diagnose. Hinweise nach HWG und Heilpraktikergesetz.",
      path: "/rechtshinweise",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Recht"
        title="Rechtshinweise zu Verfahren und Erkrankungen"
        lead="Transparenz vor Werbung. Das ist Teil der Vertrauensarbeit."
      />
      <Container className="py-14">
        <Prose>
          <p>
            Aus rechtlichen Gründen gilt: In der Benennung beispielhafter
            Anwendungsgebiete liegt kein Heilversprechen und keine Garantie
            einer Linderung. Für die aufgeführten Therapieverfahren liegen in
            der Regel keine Studien vor, die die Wirkungsweise im
            wissenschaftlichen Sinn nachweisen.
          </p>
          <p>
            Die dargestellten Verfahren dienen der allgemeinen Aufklärung und
            ersetzen keine ärztliche Diagnose, Beratung oder Behandlung. Ich
            bin Heilpraktiker, kein Arzt.
          </p>
          <p>
            Bei lebensbedrohlichen Beschwerden wählen Sie 112. Außerhalb der
            Sprechzeit: kassenärztlicher Bereitschaftsdienst 116 117.
          </p>
          <p>
            Ich empfehle grundsätzlich die zusätzliche Abklärung durch eine
            Ärztin oder einen Arzt Ihres Vertrauens.
          </p>
        </Prose>
      </Container>
    </>
  );
}

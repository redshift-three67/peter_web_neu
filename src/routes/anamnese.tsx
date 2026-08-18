import { createFileRoute } from "@tanstack/react-router";
import { AnamneseWizard } from "@/components/site/AnamneseWizard";
import { Container, Disclaimer, PageHero } from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/anamnese")({
  head: () =>
    pageHead({
      title: "Online-Anamnesebogen – Naturheilpraxis Rauch",
      description:
        "Patientenaufnahme vor dem Termin bei Heilpraktiker Peter Rauch. Der Bogen stellt keine Diagnose und bleibt auf der Praxis-Domain.",
      path: "/anamnese",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Patientenaufnahme"
        title="Online-Anamnesebogen"
        lead="Bitte vor dem Ersttermin ausfüllen. Schritt für Schritt, auf dieser Website – nicht auf einem fremden Prototyp-Host. Keine Diagnose, kein Behandlungsergebnis."
      />
      <Container className="max-w-3xl py-12">
        <AnamneseWizard />
        <Disclaimer className="mt-8" />
      </Container>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AnamneseWizard } from "@/components/site/AnamneseWizard";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { Container, Disclaimer } from "@/components/site/Shared";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/online-anamnesebogen";
const meta = hubMeta[path];

export const Route = createFileRoute("/online-anamnesebogen")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <>
      <HubFromArchive
        slug="online-anamnesebogen"
        heading="Online-Anamnesebogen in Augsburg"
        kicker={meta.kicker}
        lead="Patientenaufnahme vor dem Termin in Augsburg-Hochzoll. Der Bogen ist keine Diagnose, kein Behandlungsergebnis und kein Notfallweg."
        showCta={false}
      />
      <Container className="max-w-3xl pb-16">
        <h2 className="font-display text-3xl font-semibold text-sage-700">
          Bogen auf dieser Website
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Bitte hier ausfüllen. Die Angaben bleiben auf der Praxis-Domain.
          Die bisherige Lovable-App läuft getrennt weiter und ist hier nicht
          angebunden.
        </p>
        <div className="mt-8">
          <AnamneseWizard />
        </div>
        <Disclaimer className="mt-8" />
      </Container>
    </>
  );
}

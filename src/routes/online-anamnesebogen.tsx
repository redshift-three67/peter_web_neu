import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Phone } from "lucide-react";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { Container, Disclaimer } from "@/components/site/Shared";
import { Button } from "@/components/ui/button";
import { externalLinks } from "@/content/external-links";
import { hubMeta } from "@/content/hubs";
import { practice } from "@/content/site";
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
          Eigenständige Patienten-App
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Der Anamnesebogen wird nicht auf dieser Website ausgefüllt oder
          gespeichert. Über den folgenden Link wechseln Sie zur eigenständigen
          App der Naturheilpraxis Rauch.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="clay" size="lg">
            <a
              href={externalLinks.anamneseApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Zur eigenständigen Patienten-App
              <ExternalLink aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`tel:${practice.phoneTel}`}>
              <Phone aria-hidden="true" />
              Telefonisch anfragen
            </a>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted">
          Die externe App öffnet in einem neuen Fenster. Bei Notfällen wählen
          Sie 112; das Formular ist kein Notfallweg.
        </p>
        <Disclaimer className="mt-8" />
      </Container>
    </>
  );
}

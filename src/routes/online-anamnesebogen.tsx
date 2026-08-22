import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Phone } from "lucide-react";
import { HubFromArchive } from "@/components/site/HubFromArchive";
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
    <HubFromArchive
      slug="online-anamnesebogen"
      heading="Online-Anamnesebogen in Augsburg"
      kicker={meta.kicker}
      lead="Der Anamnesebogen wird nicht auf dieser Website ausgefüllt oder gespeichert. Der Zugang führt zur eigenständigen App der Naturheilpraxis Rauch."
      introAction={
        <div>
          <div className="flex flex-col gap-3">
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
        </div>
      }
      showCta={false}
    />
  );
}

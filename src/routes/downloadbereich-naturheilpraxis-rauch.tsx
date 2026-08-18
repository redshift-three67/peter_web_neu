import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { IconCard } from "@/components/site/Design";
import { Container } from "@/components/site/Shared";
import { Button } from "@/components/ui/button";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/downloadbereich-naturheilpraxis-rauch";
const meta = hubMeta[path];

export const Route = createFileRoute("/downloadbereich-naturheilpraxis-rauch")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <>
      <HubFromArchive
        slug="downloadbereich-naturheilpraxis-rauch"
        heading="Downloadbereich – Anamnese Augsburg"
        kicker={meta.kicker}
        lead="Erstinformation vor dem Termin in Augsburg-Hochzoll. Formulare ersetzen keine Diagnose. PDF-Originale werden hier unverändert bereitgestellt, sobald sie vorliegen."
        showCta={false}
      />
      <Container className="max-w-3xl pb-16">
        <IconCard icon={FileText} title="Formulare">
          <p>
            Der aktuelle Aufnahmebogen liegt digital auf dieser Website. Die
            bisherigen PDF-Dateien aus WordPress waren im öffentlichen Crawl
            nicht enthalten – sie werden 1:1 nachgereicht, ohne Inhalt zu
            kürzen.
          </p>
          <div className="mt-4">
            <Button asChild variant="clay">
              <Link to="/online-anamnesebogen">Online-Anamnesebogen</Link>
            </Button>
          </div>
        </IconCard>
      </Container>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/diagnostik-informationstherapie";
const meta = hubMeta[path];

export const Route = createFileRoute("/diagnostik-informationstherapie")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="diagnostik-informationstherapie"
      heading="Hinweisdiagnostik in Augsburg"
      kicker={meta.kicker}
      lead="NLS, EAV und Bioresonanz in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Hinweisgebend – kein Laborersatz, keine ärztliche Diagnose."
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/schmerztherapie-augsburg";
const meta = hubMeta[path];

export const Route = createFileRoute("/schmerztherapie-augsburg")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="schmerztherapie-augsburg"
      heading="Schmerztherapie in Augsburg"
      kicker={meta.kicker}
      lead="Manuell, naturheilkundlich und im Gespräch – in Augsburg-Hochzoll, erreichbar aus Friedberg und Lechhausen. Ergänzend zur ärztlichen Abklärung."
    />
  );
}

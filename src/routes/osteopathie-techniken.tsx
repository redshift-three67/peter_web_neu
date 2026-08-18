import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/osteopathie-techniken";
const meta = hubMeta[path];

export const Route = createFileRoute("/osteopathie-techniken")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="osteopathie-techniken"
      heading="Osteopathie in Augsburg"
      kicker={meta.kicker}
      lead="Manuelle Techniken bei Heilpraktiker und Physiotherapeut Peter Rauch in Augsburg-Hochzoll. Ergänzend zur ärztlichen Abklärung, ohne Heilversprechen."
    />
  );
}

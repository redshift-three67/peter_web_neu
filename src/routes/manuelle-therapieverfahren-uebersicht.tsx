import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/manuelle-therapieverfahren-uebersicht";
const meta = hubMeta[path];

export const Route = createFileRoute("/manuelle-therapieverfahren-uebersicht")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="manuelle-therapieverfahren-uebersicht"
      heading="Manuelle Therapieverfahren in Augsburg"
      kicker={meta.kicker}
      lead="Osteopathie, Integrative Manual Therapy und Lowen Systems bei Heilpraktiker und Physiotherapeut Peter Rauch in Augsburg-Hochzoll."
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/hypnotherapie-augsburg";
const meta = hubMeta[path];

export const Route = createFileRoute("/hypnotherapie-augsburg")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="hypnotherapie-augsburg"
      heading="Hypnotherapie in Augsburg"
      kicker={meta.kicker}
      lead="Gesprächshypnose in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Ergänzend, ohne Heilversprechen."
    />
  );
}

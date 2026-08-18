import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/naturheilkunde";
const meta = hubMeta[path];

export const Route = createFileRoute("/naturheilkunde")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="naturheilkunde"
      heading="Naturheilkunde in Augsburg"
      kicker={meta.kicker}
      lead="Homöopathie, Pflanzenheilkunde, NAET und Injektionen – in Augsburg-Hochzoll, ergänzend zur ärztlichen Versorgung, ohne Heilversprechen."
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/bioresonanz-therapie";
const meta = hubMeta[path];

export const Route = createFileRoute("/bioresonanz-therapie")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="bioresonanz-therapie"
      heading="Bioresonanz-Therapie in Augsburg"
      kicker={meta.kicker}
      lead="Hinweisgebendes Verfahren in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Keine Labordiagnose, kein Heilversprechen."
    />
  );
}

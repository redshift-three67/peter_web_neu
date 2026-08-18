import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/klassische-homoeopathie";
const meta = hubMeta[path];

export const Route = createFileRoute("/klassische-homoeopathie")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="klassische-homoeopathie"
      heading="Klassische Homöopathie in Augsburg"
      kicker={meta.kicker}
      lead="Homöopathie nach Hahnemann in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Ergänzend zur ärztlichen Versorgung, ohne Heilversprechen."
    />
  );
}

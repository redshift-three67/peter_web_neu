import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/psychotherapie-augsburg";
const meta = hubMeta[path];

export const Route = createFileRoute("/psychotherapie-augsburg")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="psychotherapie-augsburg"
      heading="Psychotherapie in Augsburg"
      kicker={meta.kicker}
      lead="Gespräch und naturheilkundliche Begleitung bei Erschöpfung und Belastung – in Augsburg-Hochzoll. Das ersetzt keine ärztliche oder approbierte Psychotherapie und gibt kein Heilversprechen."
    />
  );
}

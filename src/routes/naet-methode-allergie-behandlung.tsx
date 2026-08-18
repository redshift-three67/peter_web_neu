import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/naet-methode-allergie-behandlung";
const meta = hubMeta[path];

export const Route = createFileRoute("/naet-methode-allergie-behandlung")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <HubFromArchive
      slug="naet-methode-allergie-behandlung"
      heading="NAET – Allergiebehandlung in Augsburg"
      kicker={meta.kicker}
      lead="NAET als ergänzender naturheilkundlicher Ansatz bei Unverträglichkeiten in Augsburg-Hochzoll. Keine Allergiediagnose, kein Heilversprechen."
    />
  );
}

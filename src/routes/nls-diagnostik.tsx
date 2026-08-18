import { createFileRoute } from "@tanstack/react-router";
import { HubFromArchive } from "@/components/site/HubFromArchive";
import { NlsNeko } from "@/components/site/NlsNeko";
import { useMusterSkin } from "@/components/site/DesignSkin";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/nls-diagnostik";
const meta = hubMeta[path];

export const Route = createFileRoute("/nls-diagnostik")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  const { neko } = useMusterSkin();
  const shared = {
    heading: "NLS-Diagnostik in Augsburg",
    kicker: meta.kicker,
    lead:
      "Ergänzendes Hinweisverfahren in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Kein Laborersatz, keine ärztliche Diagnose, kein Heilversprechen.",
  };
  if (neko) return <NlsNeko {...shared} />;
  return <HubFromArchive slug="nls-diagnostik" {...shared} />;
}
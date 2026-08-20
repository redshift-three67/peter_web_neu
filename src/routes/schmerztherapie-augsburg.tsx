import { createFileRoute } from "@tanstack/react-router";
import { AnliegenHub } from "@/components/site/AnliegenHub";
import { anliegen } from "@/content/anliegen";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/schmerztherapie-augsburg";
const meta = hubMeta[path];

export const Route = createFileRoute("/schmerztherapie-augsburg")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return <AnliegenHub anliegen={anliegen[path]} />;
}

import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArchiveArticle } from "@/components/site/ArchiveArticle";
import { dedicatedRoutes, getArchiveBySlug } from "@/content/archive";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$slug")({
  head: ({ params }) => {
    const page = getArchiveBySlug(params.slug);
    const base = pageHead({
      title: page?.title || params.slug,
      description:
        page?.description ||
        "Übernommener Entwurf aus der bisherigen Website. Noch nicht freigegeben.",
      path: `/${params.slug}`,
    });
    return {
      ...base,
      meta: [...base.meta, { name: "robots", content: "noindex,follow" }],
    };
  },
  loader: ({ params }) => {
    if (dedicatedRoutes.has(`/${params.slug}`)) {
      throw notFound();
    }
    const page = getArchiveBySlug(params.slug);
    if (!page) throw notFound();
    return page;
  },
  component: ArchiveSlugPage,
});

function ArchiveSlugPage() {
  const page = Route.useLoaderData();
  if (!page) return null;
  return <ArchiveArticle page={page} />;
}

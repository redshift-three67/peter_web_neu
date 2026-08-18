import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/site/Shared";
import { listArchivePages } from "@/content/archive";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/archiv")({
  head: () => {
    const base = pageHead({
      title: "Seitenarchiv (Entwürfe)",
      description: "Interne Übersicht aller aus WordPress übernommenen Seiten.",
      path: "/archiv",
    });
    return {
      ...base,
      meta: [...base.meta, { name: "robots", content: "noindex,follow" }],
    };
  },
  component: Archiv,
});

function Archiv() {
  const pages = listArchivePages();
  return (
    <Container className="py-14">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
        Intern · noindex
      </p>
      <h1 className="mt-2 font-display text-4xl text-sage-deep">
        Seitenarchiv
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {pages.length} Seiten aus dem öffentlichen Crawl. Entwürfe sind im neuen
        Design sichtbar, aber nicht indexiert. Freigabe erfolgt einzeln.
      </p>
      <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-paper">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line bg-sand/70 text-xs uppercase tracking-[0.12em] text-muted">
            <tr>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Titel</th>
              <th className="px-4 py-3">Klasse</th>
              <th className="px-4 py-3">Wörter</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.slug} className="border-b border-line/70 align-top">
                <td className="px-4 py-3">
                  {page.route === "/" ? (
                    <Link to="/" className="text-sage underline-offset-4 hover:underline">
                      /
                    </Link>
                  ) : (
                    <Link
                      to="/$slug"
                      params={{ slug: page.route.replace(/^\//, "") }}
                      className="text-sage underline-offset-4 hover:underline"
                    >
                      {page.route}
                    </Link>
                  )}
                </td>
                <td className="px-4 py-3 text-fg">{page.h1}</td>
                <td className="px-4 py-3 text-muted">{page.className}</td>
                <td className="px-4 py-3 tabular-nums">{page.wordCount}</td>
                <td className="px-4 py-3">{page.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

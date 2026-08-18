export function pageHead({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const full = title.includes("Rauch")
    ? title
    : `${title} | Naturheilpraxis Peter Rauch`;
  const url = `https://rauch-heilpraktiker.de${path}`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { name: "author", content: "Peter Rauch, Heilpraktiker" },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "de_DE" },
      { property: "og:site_name", content: "Naturheilpraxis Peter Rauch" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
      { name: "geo.region", content: "DE-BY" },
      { name: "geo.placename", content: "Augsburg" },
      { name: "geo.position", content: "48.33937;10.94893" },
      { name: "ICBM", content: "48.33937, 10.94893" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

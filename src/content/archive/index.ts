import catalog from "./catalog.json";

export type ArchiveImage = {
  url: string;
  alt: string;
  local: string | null;
  originalName?: string | null;
  fromCache: boolean;
  matched?: boolean;
  inSlider?: boolean;
};

export type ArchiveSlide = {
  src: string;
  alt: string;
  title: string;
  meta: string;
  matched?: boolean;
};

export type ArchivePart = {
  tag: string;
  text: string;
};

export type ArchivePage = {
  slug: string;
  route: string;
  sourceUrl: string;
  className: string;
  status: "draft" | "mapped" | "published";
  robots: string;
  title: string;
  h1: string;
  description: string;
  wordCount: number;
  parts: ArchivePart[];
  images: ArchiveImage[];
  slider?: ArchiveSlide[];
};

export const archivePages = catalog as ArchivePage[];

const byRoute = new Map(archivePages.map((p) => [p.route.replace(/\/$/, "") || "/", p]));
const bySlug = new Map(archivePages.map((p) => [p.slug, p]));

export function getArchiveBySlug(slug: string): ArchivePage | undefined {
  return bySlug.get(slug) ?? byRoute.get(`/${slug}`);
}

export function listArchivePages(): ArchivePage[] {
  return [...archivePages].sort((a, b) => a.route.localeCompare(b.route, "de"));
}

export const dedicatedRoutes = new Set([
  "/",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/rechtshinweise",
  "/quellenhinweis",
  "/schmerztherapie-augsburg",
  "/hypnotherapie-augsburg",
  "/anamnese",
  "/ueber-mich",
  "/so-arbeite-ich",
  "/erstgespraech",
  "/anfahrt",
  "/allergie-augsburg",
  "/erschoepfung-augsburg",
  "/bioresonanz-augsburg",
  "/login",
  "/praxis",
  "/archiv",
  "/verfahren/manuell",
  "/verfahren/frequenz",
  "/naturheilkunde",
  "/manuelle-therapieverfahren-uebersicht",
  "/bioresonanz-therapie",
  "/datenschutzerklaerung",
  "/rechtshinweise-therapieverfahren",
  "/online-anamnesebogen",
  "/psychotherapie-augsburg",
  "/nls-diagnostik",
  "/osteopathie-techniken",
]);

import { createFileRoute } from "@tanstack/react-router";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  PageHero,
  Prose,
} from "@/components/site/Shared";
import { getArchiveBySlug } from "@/content/archive";
import { pageHead } from "@/lib/seo";

const HERO = "/media/originals/Hypnose_Behandlung_Augsburg_Heilpraltiker_Rauch_2.webp";

export const Route = createFileRoute("/hypnotherapie-augsburg")({
  head: () =>
    pageHead({
      title: "Hypnotherapie Augsburg – Heilpraktiker Peter Rauch",
      description:
        "Hypnose als ergänzendes Verfahren in der Naturheilpraxis Rauch, Augsburg-Hochzoll. Kein Ersatz für Psychotherapie nach ärztlichem Standard.",
      path: "/hypnotherapie-augsburg",
    }),
  component: Page,
});

function Page() {
  const archived = getArchiveBySlug("hypnotherapie-augsburg");
  const extras = (archived?.images ?? [])
    .map((img) => img.local)
    .filter((src): src is string => Boolean(src))
    .filter((src) => !/Peter-Rauch|logo/i.test(src))
    .slice(0, 4);

  return (
    <>
      <PageHero
        kicker="Verfahren · Gespräch"
        title="Hypnotherapie in Augsburg"
        lead="Ein ergänzendes Verfahren. Keine Show, keine Garantie, kein Ersatz für psychiatrische Behandlung."
        image={HERO}
        imageAlt="Hypnosebehandlung in der Naturheilpraxis Rauch"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Hypnose kann Gespräche und körperliche Verfahren ergänzen – etwa
            bei innerer Anspannung, Gewohnheiten oder begleitend zu Schmerz.
            Sie ersetzt keine Richtlinien-Psychotherapie und keine ärztliche
            Behandlung von Depression, Psychose oder Traumafolgestörung.
          </p>
          <p>
            Ob Hypnose sinnvoll ist, klären wir im Erstgespräch. Nicht jeder
            Mensch und nicht jedes Anliegen eignet sich.
          </p>
        </Prose>
        {extras.length ? (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {extras.map((src) => (
              <img
                key={src}
                src={src.replace(/\.(jpe?g|png)$/i, ".webp")}
                alt=""
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            ))}
          </div>
        ) : null}
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

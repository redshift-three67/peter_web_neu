import { createFileRoute, Link } from "@tanstack/react-router";
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

const HERO = "/media/originals/Osteopathische-Behandlung-in-Augsburg.webp";

export const Route = createFileRoute("/schmerztherapie-augsburg")({
  head: () =>
    pageHead({
      title: "Schmerztherapie Augsburg – Heilpraktiker Peter Rauch",
      description:
        "Naturheilkundliche und manuelle Schmerztherapie in Augsburg-Hochzoll. Ergänzend zur ärztlichen Abklärung, ohne Heilversprechen.",
      path: "/schmerztherapie-augsburg",
    }),
  component: Page,
});

function Page() {
  const archived = getArchiveBySlug("schmerztherapie-augsburg");
  const extras = (archived?.images ?? [])
    .map((img) => img.local)
    .filter((src): src is string => Boolean(src))
    .filter((src) => !/Peter-Rauch|logo/i.test(src))
    .slice(0, 4);

  return (
    <>
      <PageHero
        kicker="Anliegen · Augsburg-Hochzoll"
        title="Schmerztherapie in Augsburg"
        lead="Wenn der Schmerz bleibt, obwohl schon viel versucht wurde. Ich arbeite manuell, regulativ und im Gespräch – ergänzend, nicht statt des Arztes."
        image={HERO}
        imageAlt="Osteopathische Behandlung in der Naturheilpraxis Rauch, Augsburg"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Menschen kommen mit Rücken-, Gelenk- oder chronischen Schmerzen,
            oft nach langer Odyssee. Mein erster Blick gilt der ärztlichen
            Abklärung: Was ist ausgeschlossen, was fehlt, was darf ich
            begleiten?
          </p>
          <h2>Wie ich arbeite</h2>
          <p>
            Manuelle Techniken aus Physiotherapie, osteopathischen Griffen und
            integrativer manueller Arbeit. Ergänzend können
            Injektionsverfahren im heilpraktischen Rahmen, Regulation,
            Homöopathie oder Gespräch sinnvoll sein. Nicht jedes Verfahren
            ist wissenschaftlich anerkannt. Ich sage das dazu.
          </p>
          <p>
            Mehr zum körperlichen Arbeiten:{" "}
            <Link className="text-sage underline-offset-4 hover:underline" to="/verfahren/manuell">
              Manuell & Osteopathie
            </Link>
            .
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

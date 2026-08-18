import { createFileRoute } from "@tanstack/react-router";
import { Container, Disclaimer, PageHero, Prose } from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/online-anamnesebogen")({
  head: () =>
    pageHead({
      title: "Online-Anamnesebogen – Hinweis",
      description:
        "Der bestehende Anamnesebogen läuft vorerst eigenständig. Diese Seite ist nur die vorbereitete Hülle im neuen Auftritt.",
      path: "/online-anamnesebogen",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Noch nicht integriert"
        title="Online-Anamnesebogen"
        lead="Die bestehende Anwendung bleibt vorerst eigenständig und wird weiterhin nur über die bisherige Website aufgerufen. Ein Umzug folgt erst nach gesonderter Prüfung von Funktion und Datenschutz."
      />
      <Container className="py-14">
        <Prose>
          <p>
            Diese Seite existiert, damit die historische URL
            <code className="mx-1 rounded bg-sand px-1.5 py-0.5 text-sm">
              /online-anamnesebogen/
            </code>
            im neuen System vorbereitet ist. Der produktive Workflow der App
            ist hier nicht angebunden.
          </p>
          <p>
            Für aktuelle Terminvorbereitung nutzen Patientinnen und Patienten
            weiterhin den bekannten Weg über die bisherige Website.
          </p>
        </Prose>
        <Disclaimer className="mt-8" />
      </Container>
    </>
  );
}

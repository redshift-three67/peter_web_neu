import { createFileRoute } from "@tanstack/react-router";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  PageHero,
  Prose,
} from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/verfahren/naturheilkunde")({
  head: () =>
    pageHead({
      title: "Naturheilkunde & Gespräch – Praxis Rauch Augsburg",
      description:
        "Klassische Naturheilkunde, Homöopathie, Phytotherapie und Gespräch in der Naturheilpraxis Peter Rauch, Augsburg-Hochzoll.",
      path: "/verfahren/naturheilkunde",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Verfahren"
        title="Naturheilkunde & Gespräch"
        lead="Homöopathie, Pflanzen, Regulation, Hypnose. Immer im Rahmen der Erfahrungsheilkunde."
        image="/images/naturheilkunde.jpg"
        imageAlt="Kräuter und Glasflaschen"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Hierher gehören klassische und Komplex-Homöopathie, Phytotherapie,
            orthomolekulare Beratung, Darmsanierung im naturheilkundlichen
            Sinn und das therapeutische Gespräch inklusive Hypnose.
          </p>
          <p>
            Auch diese Verfahren ersetzen keine ärztliche Behandlung. Mittel
            und Dosierungen bespreche ich persönlich – nicht als
            Fernrezept über die Website.
          </p>
        </Prose>
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

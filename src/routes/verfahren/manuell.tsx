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

export const Route = createFileRoute("/verfahren/manuell")({
  head: () =>
    pageHead({
      title: "Manuelle Therapie & Osteopathie Augsburg-Hochzoll",
      description:
        "Manuelle Verfahren, osteopathische Techniken und integrative manuelle Therapie bei Heilpraktiker und Physiotherapeut Peter Rauch.",
      path: "/verfahren/manuell",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Verfahren"
        title="Manuell & Osteopathie"
        lead="Hände, die zuhören. Aus Physiotherapie, osteopathischen Techniken und integrativer manueller Arbeit."
        image="/images/manuelle-therapie.jpg"
        imageAlt="Hände bei manueller Arbeit"
      />
      <Container className="py-14">
        <Prose>
          <p>
            Als Physiotherapeut und Heilpraktiker arbeite ich am Bewegungsapparat
            mit osteopathischen Griffen, integrativer manueller Therapie (IMT)
            und verwandten Konzepten (unter anderem Biovalent System nach
            Lowen). Nicht jedes Label braucht eine eigene Seite.
          </p>
          <p>
            Zur oft gestellten Frage nach Dorn: Eine gesonderte
            Dorn-Ausbildung habe ich nicht. Die bestehenden manuellen
            Ausbildungen decken die wesentlichen Anteile ab.
          </p>
        </Prose>
        <AuthorByline />
        <Disclaimer className="mt-8" />
      </Container>
      <CtaBand />
    </>
  );
}

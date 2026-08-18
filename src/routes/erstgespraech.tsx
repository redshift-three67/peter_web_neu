import { createFileRoute, Link } from "@tanstack/react-router";
import { Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AuthorByline,
  Container,
  CtaBand,
  Disclaimer,
  FaqList,
  PageHero,
  Prose,
} from "@/components/site/Shared";
import { IconCard, WarningNote } from "@/components/site/Design";
import { practice, practiceFaqs } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/erstgespraech")({
  head: () =>
    pageHead({
      title: "Erstgespräch & Kosten – Heilpraktiker Augsburg",
      description:
        "Ablauf, Dauer und Kostenrahmen des Erstgesprächs in der Naturheilpraxis Rauch. Privatleistung, transparent, ohne Heilversprechen.",
      path: "/erstgespraech",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Einstieg"
        title="Ihr erstes Gespräch in Augsburg-Hochzoll"
        lead="60–90 Minuten Zeit. Kein Fließband. Ein klarer Kostenrahmen, den ich im Gespräch konkretisiere."
        image="/images/gespraech.jpg"
        imageAlt="Ruhiger Gesprächsplatz"
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <WarningNote>
            <p>
              Die gesetzlichen Krankenkassen in Deutschland übernehmen die
              Kosten der Heilpraktiker-Behandlung in der Regel nicht. Eine
              Erstattung durch private Krankenversicherung, Zusatzversicherung
              oder Beihilfe ist nicht garantiert.
            </p>
          </WarningNote>
          <Prose>
          <p>
            Das Erstgespräch ist eine Privatleistung. Gesetzliche Kassen
            erstatten in der Regel nicht; Beihilfe und private Zusatztarife
            tun es oft anteilig. Bitte prüfen Sie Ihren Vertrag vorab.
          </p>
          <h2>Was Sie mitbringen</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Befunde und Labor, soweit vorhanden</li>
            <li>Medikamentenliste</li>
            <li>Ausgefüllten Anamnesebogen, wenn möglich</li>
            <li>Fragen, die Sie geklärt haben wollen</li>
          </ul>
          <h2>Kostenrahmen</h2>
          <p>
            Orientierung: Erstgespräch meist 60–90 Minuten. Folgeeinheiten
            kürzer. Die genaue Höhe hängt von Aufwand und Verfahren ab und
            wird vor der Behandlung besprochen. Grundlage ist das
            Gebührenverzeichnis für Heilpraktiker (GebüH) in angemessener
            Anpassung.
          </p>
          <p>
            Konkrete Beträge nenne ich persönlich – nicht als Lockangebot auf
            der Website.
          </p>
        </Prose>
          <IconCard icon={Euro} title="GebüH – Gebührenordnung der Heilpraktiker">
            <p>
              Das GebüH ist ein Verzeichnis üblicher Vergütungen und dient als
              Berechnungshilfe. Die Praxis rechnet nach GebüH-Höchstsatz ab,
              soweit das dem Aufwand entspricht. Ob Versicherungen erstatten,
              hängt vom Vertrag ab und wird oft nur anteilig geprüft.
            </p>
          </IconCard>
        </div>
        <aside className="h-fit rounded-2xl border border-line bg-card p-6 shadow-card">
          <h2 className="font-display text-2xl text-sage-deep">Nächster Schritt</h2>
          <ol className="mt-4 space-y-3 text-sm text-muted">
            <li>1. Anrufen oder Nachricht senden</li>
            <li>2. Anamnesebogen ausfüllen</li>
            <li>3. Termin in der Friedrich-Deffner-Straße</li>
          </ol>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild>
              <a href={`tel:${practice.phoneTel}`}>{practice.phoneDisplay}</a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/kontakt">Kontaktformular</Link>
            </Button>
            <Button asChild variant="clay" className="w-full">
              <Link to="/anamnese">Online-Anamnesebogen</Link>
            </Button>
          </div>
        </aside>
        <div className="lg:col-span-2">
          <FaqList items={practiceFaqs} />
          <AuthorByline />
          <Disclaimer className="mt-8" />
        </div>
      </Container>
      <CtaBand />
    </>
  );
}

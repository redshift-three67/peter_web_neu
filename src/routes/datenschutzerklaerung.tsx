import { createFileRoute } from "@tanstack/react-router";
import { PhoneChip } from "@/components/site/Design";
import { Container, PageHero, Prose } from "@/components/site/Shared";
import { hubMeta } from "@/content/hubs";
import { practice } from "@/content/site";
import { pageHead } from "@/lib/seo";

const path = "/datenschutzerklaerung";
const meta = hubMeta[path];

export const Route = createFileRoute("/datenschutzerklaerung")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker={meta.kicker}
        title="Datenschutzerklärung"
        lead="Gesundheitsdaten sind besonders schützenswert. Diese Erklärung gilt für Website, Kontaktformular und Anamnesebogen der Naturheilpraxis Rauch in Augsburg-Hochzoll."
      />
      <PhoneChip />
      <Container className="py-12 md:py-16">
        <Prose>
          <p>
            Verantwortlicher: {practice.person}, {practice.street},{" "}
            {practice.zip} {practice.city}-{practice.district}, {practice.email}.
          </p>
          <h2>Hosting und Protokolle</h2>
          <p>
            Beim Aufruf entstehen technisch notwendige Server-Logs (IP,
            Zeitpunkt, aufgerufene Ressource). Rechtsgrundlage: Art. 6 Abs. 1
            lit. f DSGVO, berechtigte Interessen an Betrieb und Sicherheit.
          </p>
          <h2>Formulare</h2>
          <p>
            Kontakt- und Anamnesedaten werden ausschließlich zur
            Terminvorbereitung und Praxisorganisation verarbeitet (Art. 6
            Abs. 1 lit. a und lit. b DSGVO, Art. 9 Abs. 2 lit. a und h DSGVO).
            Anamnesedaten sind Gesundheitsdaten. Die Übermittlung erfolgt über
            diese Domain, nicht über fremde Prototyp-Hosts.
          </p>
          <h2>Cookies und Einwilligung</h2>
          <p>
            Essenzielle Cookies für Sitzung und Sicherheit. Analyse- oder
            Werbecookies nur nach Einwilligung gemäß TDDDG und DSGVO (Consent
            Mode, sobald Kampagnen geschaltet werden).
          </p>
          <h2>Schriftarten</h2>
          <p>
            Schriften werden lokal ausgeliefert. Es findet kein Aufruf von
            Google Fonts statt.
          </p>
          <h2>Ihre Rechte</h2>
          <p>
            Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit
            und Widerspruch. Beschwerde bei der zuständigen Aufsichtsbehörde
            (BayLDA).
          </p>
        </Prose>
      </Container>
    </>
  );
}

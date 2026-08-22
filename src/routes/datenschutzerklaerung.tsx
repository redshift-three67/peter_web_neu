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
        lead="Diese Erklärung gilt für die Relaunch-Website und ihr Kontaktformular. Der Online-Anamnesebogen gehört zu einer eigenständigen externen App."
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
            Das Kontaktformular dieser Website dient ausschließlich allgemeinen
            organisatorischen Anfragen. Bitte übermitteln Sie dort keine
            Gesundheitsdaten. Der Online-Anamnesebogen wird in einer
            eigenständigen externen App angeboten. Beim Öffnen verlassen Sie
            diese Website; für die Datenverarbeitung in der App gelten die dort
            bereitgestellten Datenschutzhinweise.
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

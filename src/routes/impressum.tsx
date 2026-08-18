import { createFileRoute } from "@tanstack/react-router";
import { Container, PageHero, Prose } from "@/components/site/Shared";
import { practice } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/impressum")({
  head: () =>
    pageHead({
      title: "Impressum – Naturheilpraxis Rauch",
      description: "Impressum gemäß DDG der Naturheilpraxis Peter Rauch, Augsburg.",
      path: "/impressum",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Recht"
        title="Impressum"
        lead="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)."
      />
      <Container className="py-14">
        <Prose>
          <p>
            {practice.person}
            <br />
            {practice.name}
            <br />
            {practice.street}
            <br />
            {practice.zip} {practice.city}
          </p>
          <p>
            Telefon: {practice.phoneDisplay}
            <br />
            E-Mail: {practice.email}
          </p>
          <h2>Berufsbezeichnung</h2>
          <p>
            Heilpraktiker (Deutschland). Erlaubnis zur berufsmäßigen Ausübung
            der Heilkunde ohne Arzt zu sein am {practice.sinceHp} durch das{" "}
            {practice.licenseHp}. Erlaubnis zur Führung der Berufsbezeichnung
            Physiotherapeut durch das {practice.licensePt} am {practice.sincePt}.
          </p>
          <h2>Aufsichtsbehörde</h2>
          <p>
            {practice.authority}, Hoher Weg 8, 86152 Augsburg.
          </p>
          <h2>Berufsrechtliche Regelungen</h2>
          <p>
            Heilpraktikergesetz und Durchführungsverordnung, nachzulesen unter
            gesetze-im-internet.de. Berufsordnung für Heilpraktiker (BOH).
          </p>
          <h2>Verband</h2>
          <p>{practice.association}</p>
          <h2>Umsatzsteuer</h2>
          <p>
            Heilkundliche Tätigkeit ist nach § 4 Nr. 14 UStG von der
            Umsatzsteuer befreit.
          </p>
          <h2>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung bereit:{" "}
            <a
              className="text-sage underline-offset-4 hover:underline"
              href="https://ec.europa.eu/consumers/odr"
            >
              ec.europa.eu/consumers/odr
            </a>
            . Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
          <h2>Haftung</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
            Inhalte nach den allgemeinen Gesetzen verantwortlich. Für
            externe Links gilt: Zum Zeitpunkt der Verlinkung waren keine
            Rechtsverstöße erkennbar.
          </p>
        </Prose>
      </Container>
    </>
  );
}

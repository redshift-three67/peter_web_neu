import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthorByline, Container, CtaBand, Disclaimer } from "@/components/site/Shared";
import {
  CenteredPageHero,
  IconCard,
  NestedInfoGrid,
} from "@/components/site/Design";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/quellenhinweis")({
  head: () =>
    pageHead({
      title: "Quellenhinweis & Haftungsausschluss – Naturheilpraxis Rauch",
      description:
        "Herkunft, Qualität und Grenzen der Gesundheitsinformationen der Naturheilpraxis Rauch in Augsburg. Keine individuelle Beratung per Website.",
      path: "/quellenhinweis",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <CenteredPageHero
        title="Quellenhinweis & Haftungsausschluss"
        lead="Transparenz über Herkunft, Qualität und Grenzen der hier bereitgestellten Gesundheitsinformationen."
        actions={
          <Button asChild variant="outline">
            <Link to="/rechtshinweise">Zu den Rechtshinweisen</Link>
          </Button>
        }
      />
      <Container className="max-w-4xl space-y-6 py-14">
        <IconCard icon={BookOpen} title="Herkunft der Informationen">
          <p>
            Die auf dieser Website bereitgestellten Gesundheitsinformationen
            beruhen auf Ausbildung, Fachliteratur, Praxisalltag und – wo
            gekennzeichnet – geprüfter Recherche. Im Sinne der Transparenz
            lege ich offen, wie diese Inhalte entstehen:
          </p>
          <div className="mt-4">
            <NestedInfoGrid
              items={[
                {
                  icon: GraduationCap,
                  title: "Fachliche Ausbildung",
                  text: "Heilpraktiker gemäß § 1 Heilpraktikergesetz, Physiotherapie, Anatomie, Physiologie und naturheilkundliche Verfahren.",
                },
                {
                  icon: FlaskConical,
                  title: "Fachliteratur & Studien",
                  text: "Veröffentlichte Studien, Fachliteratur und Leitlinien anerkannter Institutionen (z. B. AWMF, RKI), soweit sie zum Thema passen.",
                },
                {
                  icon: Sparkles,
                  title: "Praxiserfahrung & Fortbildung",
                  text: "Beobachtungen aus dem Praxisalltag, kollegialer Austausch, Fortbildungen und Kongresse.",
                },
                {
                  icon: BookOpen,
                  title: "Redaktionelle Prüfung",
                  text: "Texte werden vor Veröffentlichung gelesen und an HWG, E-E-A-T und den tatsächlichen Praxisalltag angepasst.",
                },
              ]}
            />
          </div>
        </IconCard>

        <IconCard icon={Sparkles} title="Einschränkungen & Grenzen">
          <ul className="space-y-3">
            <li>
              <strong className="text-fg">Kein Anspruch auf Vollständigkeit.</strong>{" "}
              Medizinisches Wissen entwickelt sich. Einzelne Darstellungen
              können überholt sein.
            </li>
            <li>
              <strong className="text-fg">Möglichkeit von Fehlern.</strong> Trotz
              sorgfältiger Prüfung können sachliche Fehler oder zu starke
              Vereinfachungen vorkommen.
            </li>
            <li>
              <strong className="text-fg">Keine individuelle Anwendbarkeit.</strong>{" "}
              Allgemeine Informationen ersetzen keine Anamnese, Diagnostik
              oder Therapieplanung.
            </li>
            <li>
              <strong className="text-fg">Keine ärztliche oder heilpraktische Beratung.</strong>{" "}
              Bei Beschwerden wenden Sie sich an eine qualifizierte Fachperson.
              Notfall: 112. Bereitschaftsdienst: 116 117.
            </li>
          </ul>
        </IconCard>
        <AuthorByline />
        <Disclaimer />
      </Container>
      <CtaBand />
    </>
  );
}

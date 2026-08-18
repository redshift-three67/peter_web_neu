import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, FlaskConical, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthorByline, Container, CtaBand, Disclaimer } from "@/components/site/Shared";
import {
  CenteredPageHero,
  IconCard,
  NestedInfoGrid,
} from "@/components/site/Design";
import { hubMeta } from "@/content/hubs";
import { pageHead } from "@/lib/seo";

const path = "/rechtshinweise-therapieverfahren";
const meta = hubMeta[path];

export const Route = createFileRoute("/rechtshinweise-therapieverfahren")({
  head: () => pageHead({ title: meta.title, description: meta.description, path }),
  component: Page,
});

function Page() {
  return (
    <>
      <CenteredPageHero
        title="Rechtshinweise zu Verfahren und Erkrankungen"
        lead="Transparenz vor Werbung. Das ist Teil der Vertrauensarbeit – und Voraussetzung für seriöse Gesundheitsinformationen in Augsburg-Hochzoll."
        actions={
          <>
            <Button asChild>
              <Link to="/quellenhinweis">Quellenhinweis & Haftung</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/erstgespraech">Kosten & GebüH</Link>
            </Button>
          </>
        }
      />
      <Container className="max-w-4xl space-y-6 py-14">
        <IconCard icon={BookOpen} title="Was hier gilt">
          <p>
            Aus rechtlichen Gründen gilt: In der Benennung beispielhafter
            Anwendungsgebiete liegt kein Heilversprechen und keine Garantie
            einer Linderung. Für viele aufgeführte Verfahren liegen keine
            Studien vor, die die Wirkungsweise im wissenschaftlichen Sinn
            nachweisen.
          </p>
          <p>
            Die dargestellten Verfahren dienen der allgemeinen Aufklärung und
            ersetzen keine ärztliche Diagnose, Beratung oder Behandlung. Ich
            bin Heilpraktiker, kein Arzt.
          </p>
        </IconCard>
        <IconCard icon={GraduationCap} title="Herkunft in Kürze">
          <NestedInfoGrid
            items={[
              {
                icon: GraduationCap,
                title: "Fachliche Ausbildung",
                text: "Heilpraktiker gemäß Heilpraktikergesetz, Physiotherapie, Anatomie und naturheilkundliche Verfahren.",
              },
              {
                icon: FlaskConical,
                title: "Fachliteratur",
                text: "Leitlinien und Veröffentlichungen anerkannter Institutionen fließen ein, wo sie zum Thema passen.",
              },
              {
                icon: Sparkles,
                title: "Praxiserfahrung",
                text: "Alltag, Fortbildungen und kollegialer Austausch. Erfahrung ersetzt keine Studie.",
              },
              {
                icon: BookOpen,
                title: "Offene Grenzen",
                text: "Allgemeine Texte sind kein individueller Befund. Im Zweifel zuerst zur Ärztin oder zum Arzt.",
              },
            ]}
          />
        </IconCard>
        <p className="text-base leading-relaxed text-muted">
          Bei lebensbedrohlichen Beschwerden wählen Sie 112. Außerhalb der
          Sprechzeit: kassenärztlicher Bereitschaftsdienst 116 117.
        </p>
        <AuthorByline />
        <Disclaimer />
      </Container>
      <CtaBand />
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () =>
    pageHead({
      title: "Praxiszugang",
      description: "Anmeldung für den geschützten Praxisbereich.",
      path: "/login",
    }),
  component: Login,
});

function Login() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-16">
      <div className="w-full max-w-md rounded-xl border border-line bg-paper p-8 shadow-card">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
          Praxisbereich
        </p>
        <h1 className="mt-2 font-display text-3xl text-sage-deep">Anmelden</h1>
        <p className="mt-3 text-sm text-muted">
          Für Patientinnen und Patienten mit freigeschaltetem Zugang sowie für
          die Praxis.posteingang.
        </p>
        <div className="mt-6 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/praxis" })}
              >
                Weiter mit {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Anmeldung ist deaktiviert.</p>
          )}
        </div>
        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-sage">
            Zurück zur Praxis
          </Link>
        </p>
      </div>
    </Container>
  );
}

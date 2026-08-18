import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listInbox } from "@/lib/actions";
import { Container } from "@/components/site/Shared";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/praxis")({
  head: () =>
    pageHead({
      title: "Praxisposteingang",
      description: "Geschützter Bereich für eingegangene Nachrichten.",
      path: "/praxis",
    }),
  component: Praxis,
});

function Praxis() {
  const { user, isPending } = useCurrentUserState();
  const [data, setData] = useState<Awaited<ReturnType<typeof listInbox>> | null>(
    null,
  );

  useEffect(() => {
    if (!user) return;
    listInbox()
      .then(setData)
      .catch(() => setData({ contacts: [], forms: [] }));
  }, [user]);

  if (isPending) {
    return (
      <Container className="py-20">
        <div className="h-40 animate-pulse rounded-xl bg-sand" />
      </Container>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <Container className="py-14">
      <p className="text-xs uppercase tracking-[0.18em] text-sage">Intern</p>
      <h1 className="mt-2 font-display text-4xl text-sage-deep">
        Posteingang
      </h1>
      <p className="mt-2 text-muted">Angemeldet als {user.displayName}</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl text-sage-deep">Nachrichten</h2>
          <ul className="mt-4 space-y-3">
            {(data?.contacts ?? []).length === 0 ? (
              <li className="text-sm text-muted">Noch keine Nachrichten.</li>
            ) : (
              data?.contacts.map((row) => (
                <li
                  key={row.id}
                  className="rounded-lg border border-line bg-paper p-4 text-sm"
                >
                  <p className="font-medium text-sage-deep">{row.name}</p>
                  <p className="text-muted">
                    {row.email} · {row.phone}
                  </p>
                  <p className="mt-2">{row.message}</p>
                </li>
              ))
            )}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl text-sage-deep">Anamnesen</h2>
          <ul className="mt-4 space-y-3">
            {(data?.forms ?? []).length === 0 ? (
              <li className="text-sm text-muted">Noch keine Bögen.</li>
            ) : (
              data?.forms.map((row) => (
                <li
                  key={row.id}
                  className="rounded-lg border border-line bg-paper p-4 text-sm"
                >
                  <p className="font-medium">{row.status}</p>
                  <p className="text-muted">{String(row.created_at)}</p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </Container>
  );
}

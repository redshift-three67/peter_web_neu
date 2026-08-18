import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/rechtshinweise")({
  beforeLoad: () => {
    throw redirect({ href: "/rechtshinweise-therapieverfahren" });
  },
});

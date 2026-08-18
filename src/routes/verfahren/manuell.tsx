import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/verfahren/manuell")({
  beforeLoad: () => {
    throw redirect({ href: "/manuelle-therapieverfahren-uebersicht" });
  },
});

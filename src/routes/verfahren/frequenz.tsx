import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/verfahren/frequenz")({
  beforeLoad: () => {
    throw redirect({ href: "/diagnostik-informationstherapie" });
  },
});

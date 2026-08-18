import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/verfahren/naturheilkunde")({
  beforeLoad: () => {
    throw redirect({ href: "/naturheilkunde" });
  },
});

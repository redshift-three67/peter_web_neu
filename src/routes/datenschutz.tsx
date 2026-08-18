import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/datenschutz")({
  beforeLoad: () => {
    throw redirect({ href: "/datenschutzerklaerung" });
  },
});

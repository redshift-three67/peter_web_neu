import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bioresonanz-augsburg")({
  beforeLoad: () => {
    throw redirect({ href: "/bioresonanz-therapie" });
  },
});

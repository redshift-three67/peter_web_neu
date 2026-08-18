import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/erschoepfung-augsburg")({
  beforeLoad: () => {
    throw redirect({ href: "/psychotherapie-augsburg" });
  },
});

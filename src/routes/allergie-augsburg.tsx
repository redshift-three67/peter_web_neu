import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/allergie-augsburg")({
  beforeLoad: () => {
    throw redirect({ href: "/naet-methode-allergie-behandlung" });
  },
});

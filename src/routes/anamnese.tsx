import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/anamnese")({
  beforeLoad: () => {
    throw redirect({ href: "/online-anamnesebogen" });
  },
});

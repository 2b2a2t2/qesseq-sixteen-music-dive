import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/site/Landing";
import { landingHead } from "@/lib/landing-head";

export const Route = createFileRoute("/fr")({
  head: () => landingHead("fr"),
  component: FrenchIndex,
});

function FrenchIndex() {
  return <Landing locale="fr" />;
}

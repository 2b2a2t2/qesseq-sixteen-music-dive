import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/site/Landing";
import { landingHead } from "@/lib/landing-head";

export const Route = createFileRoute("/")({
  head: () => landingHead("en"),
  component: Index,
});

function Index() {
  return <Landing locale="en" />;
}

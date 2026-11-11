import { COPY, type Locale } from "@/lib/i18n";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Manifesto } from "./Manifesto";
import { Features } from "./Features";
import { Modes } from "./Modes";
import { Specs } from "./Specs";
import { PreorderForm } from "./PreorderForm";
import { Footer } from "./Footer";

export function Landing({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header copy={copy} locale={locale} />
      <main>
        <Hero copy={copy} />
        <Manifesto copy={copy} />
        <Features copy={copy} />
        <Modes copy={copy} />
        <Specs copy={copy} />
        <PreorderForm copy={copy} locale={locale} />
      </main>
      <Footer copy={copy} />
    </div>
  );
}

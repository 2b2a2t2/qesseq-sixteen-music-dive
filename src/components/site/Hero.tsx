import front from "@/assets/qesseq16-front-cutout.webp";
import type { Copy } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Hero({ copy }: { copy: Copy }) {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40">
      <div className="absolute inset-0 -z-10 bg-abyss-glow" />
      <div className="absolute inset-0 -z-10 grid-lines" />

      <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <p className="eyebrow animate-in fade-in slide-in-from-bottom-2 duration-700">{copy.hero.eyebrow}</p>
        <h1 className="mt-6 text-steel text-[clamp(3.5rem,13vw,10.5rem)] font-bold leading-[0.85] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          QESSEQ 16
        </h1>
        <p className="mt-6 font-display text-xl uppercase tracking-[0.3em] text-led md:text-2xl">
          {copy.hero.tagline}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{copy.hero.intro}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl">
            <a href="#preorder">{copy.hero.cta}</a>
          </Button>
          <Button asChild variant="steel" size="xl">
            <a href="#features">{copy.hero.secondary}</a>
          </Button>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-5 md:mt-20 md:px-8">
        <div className="relative led-reflection animate-float">
          <img
            src={front}
            alt="QESSEQ 16 MIDI sequencer, front view with glowing pads and encoders"
            width={1263}
            height={714}
            className="relative w-full drop-shadow-[0_40px_50px_oklch(0_0_0/0.65)]"
            fetchPriority="high"
          />
        </div>
      </div>

      <dl className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border px-0 md:grid-cols-4">
        {copy.hero.stats.map((s) => (
          <div key={s.label} className="bg-background px-6 py-6 text-center">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block font-display text-4xl font-bold text-foreground md:text-5xl">{s.value}</span>
              <span className="mt-1 block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

import type { Copy } from "@/lib/i18n";

export function Manifesto({ copy }: { copy: Copy }) {
  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <h2 className="text-5xl font-bold leading-[0.95] md:text-7xl">
          <span className="block text-foreground">{copy.manifesto.line1}</span>
          <span className="block text-led">{copy.manifesto.line2}</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">{copy.manifesto.body}</p>
        <div className="mx-auto mt-12 h-px max-w-md bg-led-line opacity-60" />
      </div>
    </section>
  );
}

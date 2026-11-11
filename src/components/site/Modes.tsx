import type { CSSProperties } from "react";
import type { Copy } from "@/lib/i18n";

const COLORS = ["var(--led-blue)", "var(--led-cyan)", "var(--led-green)"];

export function Modes({ copy }: { copy: Copy }) {
  return (
    <section id="modes" className="relative border-y border-border bg-abyss py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow">{copy.modes.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{copy.modes.title}</h2>
          <p className="mt-5 text-lg text-muted-foreground">{copy.modes.body}</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {copy.modes.families.map((f, i) => (
            <div
              key={f.key}
              style={{ "--pad": COLORS[i] } as CSSProperties}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-colors hover:border-[var(--pad)]/50"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--pad)]/15 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--pad)] font-mono text-xs font-bold tracking-widest shadow-[0_0_22px_var(--pad)]">
                  {f.key}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
              <ol className="relative mt-8 space-y-2">
                {f.variants.map((v, vi) => (
                  <li key={v} className="flex items-center gap-4 rounded-xl border border-border bg-background/50 px-4 py-3">
                    <span className="font-mono text-xs text-[var(--pad)]">
                      {f.key} {vi + 1}
                    </span>
                    <span className="text-sm text-foreground/90">{v}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {copy.modes.gesture}
        </p>
      </div>
    </section>
  );
}

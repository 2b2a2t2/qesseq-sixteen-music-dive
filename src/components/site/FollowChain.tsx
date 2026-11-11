import type { CSSProperties } from "react";

const NODES = [
  { label: "BASS", sub: "GNR8", color: "var(--led-blue)" },
  { label: "HARM", sub: "FOLLOW", color: "var(--led-cyan)" },
  { label: "CHORDS", sub: "POLY", color: "var(--led-violet)" },
  { label: "LEAD", sub: "MAP ct", color: "var(--led-green)" },
];

export function FollowChain() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-card md:p-10">
      <div className="flex flex-col items-stretch gap-0">
        {NODES.map((n, i) => (
          <div key={n.label} className="flex flex-col items-center" style={{ "--pad": n.color } as CSSProperties}>
            <div className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-[var(--pad)]/40 bg-background/60 px-5 py-4">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--pad)] shadow-[0_0_18px_var(--pad)]">
                <span className="h-3 w-3 rounded-full bg-[var(--pad)]" />
              </span>
              <div className="flex-1">
                <p className="font-display text-lg font-semibold tracking-wider">{n.label}</p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  CH {i + 1} · {n.sub}
                </p>
              </div>
            </div>
            {i < NODES.length - 1 && (
              <svg width="16" height="40" viewBox="0 0 16 40" className="text-primary" aria-hidden="true">
                <line
                  x1="8"
                  y1="0"
                  x2="8"
                  y2="40"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-dash"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

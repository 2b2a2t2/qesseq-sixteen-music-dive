import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const TRACKS = [
  { name: "KICK", color: "var(--led-red)", pattern: "x...x...x...x..x" },
  { name: "SNARE", color: "var(--led-violet)", pattern: "....x.......x..." },
  { name: "HAT", color: "var(--led-white)", pattern: "..x...x...x...xx" },
  { name: "BASS", color: "var(--led-blue)", pattern: "x..x..x...x.x..." },
  { name: "CHORD", color: "var(--led-green)", pattern: "x.......x...x..." },
  { name: "LEAD", color: "var(--led-cyan)", pattern: "..x.x....x.x..x." },
];

export function StepGrid() {
  const [step, setStep] = useState(0);
  const [grid, setGrid] = useState(() => TRACKS.map((t) => t.pattern.split("").map((c) => c === "x")));

  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % 16), 140);
    return () => window.clearInterval(id);
  }, []);

  const toggle = (r: number, c: number) =>
    setGrid((g) => g.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? !v : v)) : row)));

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-card md:p-7">
      <div className="mb-4 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        <span>SEQUENCER 1</span>
        <span className="text-primary">
          STEP {String(step + 1).padStart(2, "0")} / 16
        </span>
      </div>
      <div className="space-y-2.5">
        {TRACKS.map((t, r) => (
          <div key={t.name} className="flex items-center gap-3" style={{ "--pad": t.color } as CSSProperties}>
            <span className="w-12 shrink-0 font-mono text-[0.6rem] tracking-widest text-muted-foreground">{t.name}</span>
            <div className="grid flex-1 grid-cols-16 gap-1 md:gap-1.5">
              {(grid[r] ?? []).map((on, c) => {
                const hit = on && c === step;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-label={`${t.name} step ${c + 1}`}
                    aria-pressed={on}
                    onClick={() => toggle(r, c)}
                    className={cn(
                      "aspect-square rounded-full border transition-all duration-100",
                      c % 4 === 0 ? "border-foreground/15" : "border-foreground/5",
                      on ? "bg-[var(--pad)]/70" : "bg-foreground/5 hover:bg-foreground/15",
                      hit && "scale-110 bg-[var(--pad)] shadow-[0_0_14px_var(--pad)]",
                      c === step && !on && "bg-foreground/20",
                    )}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground/70">
        ▸ tap the pads
      </p>
    </div>
  );
}

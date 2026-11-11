import angle from "@/assets/qesseq16-angle-cutout.webp";
import type { Copy } from "@/lib/i18n";

export function Specs({ copy }: { copy: Copy }) {
  return (
    <section id="specs" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:grid-cols-[1fr_1.1fr] md:px-8">
        <div className="md:sticky md:top-28">
          <p className="eyebrow">{copy.specs.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">{copy.specs.title}</h2>
          <img
            src={angle}
            alt="QESSEQ 16 three-quarter view in brushed aluminium"
            loading="lazy"
            width={1386}
            height={792}
            className="mt-10 w-full drop-shadow-[0_30px_40px_oklch(0_0_0/0.6)]"
          />
        </div>
        <dl className="divide-y divide-border rounded-3xl border border-border bg-surface">
          {copy.specs.rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-5 md:grid-cols-[10rem_1fr] md:px-8">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{r.label}</dt>
              <dd className="text-foreground">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

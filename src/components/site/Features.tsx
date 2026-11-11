import top from "@/assets/qesseq16-top.jpg.asset.json";
import angle from "@/assets/qesseq16-angle.jpg.asset.json";
import front from "@/assets/qesseq16-front.jpg.asset.json";
import type { Copy } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { StepGrid } from "./StepGrid";
import { FollowChain } from "./FollowChain";
import { CroppedShot } from "./CroppedShot";

function Visual({ id }: { id: string }) {
  switch (id) {
    case "sequence":
      return <StepGrid />;
    case "generate":
      return <CroppedShot src={top.url} alt="QESSEQ 16 seen from above, screen showing generator controls" className="aspect-[4/3]" />;
    case "follow":
      return <FollowChain />;
    case "play":
      return (
        <CroppedShot
          src={angle.url}
          alt="Close-up of the QESSEQ 16 illuminated pads"
          className="aspect-[4/3]"
          imgClassName="scale-[1.7] origin-[65%_70%]"
        />
      );
    case "control":
      return (
        <CroppedShot
          src={front.url}
          alt="Close-up of the eight blue-lit encoders"
          className="aspect-[4/3]"
          imgClassName="scale-[2] origin-[85%_30%]"
        />
      );
    default:
      return null;
  }
}

export function Features({ copy }: { copy: Copy }) {
  return (
    <section id="features" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl space-y-28 px-5 md:space-y-40 md:px-8">
        {copy.features.map((f, i) => (
          <article
            key={f.id}
            className={cn(
              "grid items-center gap-10 md:grid-cols-2 md:gap-16",
              i % 2 === 1 && "md:[&>*:first-child]:order-2",
            )}
          >
            <div>
              <p className="eyebrow">{f.eyebrow}</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.05] md:text-5xl">{f.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{f.body}</p>
              <ul className="mt-8 space-y-3">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-glow" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Visual id={f.id} />
          </article>
        ))}
      </div>
    </section>
  );
}

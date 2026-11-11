import { cn } from "@/lib/utils";

export function CroppedShot({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-border shadow-card", className)}>
      <img src={src} alt={alt} loading="lazy" width={1448} height={1086} className={cn("h-full w-full object-cover", imgClassName)} />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-foreground/5" />
    </div>
  );
}

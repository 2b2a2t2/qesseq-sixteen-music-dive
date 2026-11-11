import { cn } from "@/lib/utils";

/**
 * Shows the cut-out device straight on the page — no frame, no photo background.
 * When zoomed in, the edges fade softly into the page instead of a hard box.
 */
export function CroppedShot({
  src,
  alt,
  className,
  imgClassName,
  fade = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative",
        fade && "overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("h-full w-full object-contain drop-shadow-[0_30px_40px_oklch(0_0_0/0.6)]", imgClassName)}
      />
    </div>
  );
}

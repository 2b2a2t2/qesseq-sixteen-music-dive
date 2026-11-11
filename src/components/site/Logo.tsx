import logo from "@/assets/wipidim-logo-white.png.asset.json";
import { cn } from "@/lib/utils";

export function WipidimLogo({ className, spin = true }: { className?: string; spin?: boolean }) {
  return (
    <img
      src={logo.url}
      alt="WipidiM"
      width={512}
      height={512}
      className={cn("select-none", spin && "animate-spin-slow", className)}
    />
  );
}

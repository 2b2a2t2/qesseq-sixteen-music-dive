import type { Copy } from "@/lib/i18n";
import { WipidimLogo } from "./Logo";

export function Footer({ copy }: { copy: Copy }) {
  return (
    <footer className="border-t border-border bg-abyss">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        <div className="flex items-center gap-3">
          <WipidimLogo className="h-10 w-10" />
          <div>
            <p className="font-display text-lg font-semibold">WipidiM</p>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-primary">High Music Dive</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{copy.footer.made}</p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} WipidiM. {copy.footer.rights}
        </p>
      </div>
    </footer>
  );
}

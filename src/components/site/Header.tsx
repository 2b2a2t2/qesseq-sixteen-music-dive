import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Copy, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WipidimLogo } from "./Logo";

export function Header({ copy, locale }: { copy: Copy; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: copy.nav.features },
    { href: "#modes", label: copy.nav.modes },
    { href: "#specs", label: copy.nav.specs },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/75 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <WipidimLogo className="h-9 w-9" />
          <span className="font-display text-lg font-semibold tracking-wide">WipidiM</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to={locale === "en" ? "/fr" : "/"}
            hrefLang={locale === "en" ? "fr" : "en"}
            className="rounded-full border border-border px-3 py-1.5 font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            aria-label={locale === "en" ? "Version française" : "English version"}
          >
            {copy.nav.switchTo}
          </Link>
          <Button asChild variant="hero" size="sm" className="rounded-full px-4">
            <a href="#preorder">{copy.nav.preorder}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

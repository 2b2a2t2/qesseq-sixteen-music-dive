import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2 } from "lucide-react";
import type { Copy, Locale } from "@/lib/i18n";
import { preorderSchema } from "@/lib/preorder-schema";
import { joinPreorderList } from "@/lib/preorder.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WipidimLogo } from "./Logo";

type Status = "idle" | "sending" | "done" | "already" | "error";

export function PreorderForm({ copy, locale }: { copy: Copy; locale: Locale }) {
  const t = copy.preorder;
  const join = useServerFn(joinPreorderList);
  const [form, setForm] = useState({ email: "", name: "", country: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = preorderSchema.safeParse({ ...form, locale });
    if (!parsed.success) {
      setEmailError(t.errorInvalidEmail);
      return;
    }
    setEmailError(null);
    setStatus("sending");
    try {
      const res = await join({ data: { ...form, locale } });
      setStatus(res.ok ? (res.already ? "already" : "done") : "error");
    } catch {
      setStatus("error");
    }
  }

  const done = status === "done" || status === "already";

  return (
    <section id="preorder" className="relative isolate overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-abyss-glow" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
        <div>
          <WipidimLogo className="h-24 w-24 opacity-90" />
          <p className="eyebrow mt-8">{t.eyebrow}</p>
          <h2 className="mt-4 text-5xl font-bold leading-[0.95] md:text-6xl">{t.title}</h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">{t.body}</p>
        </div>

        <div className="rounded-3xl border border-border bg-surface/80 p-6 shadow-card backdrop-blur md:p-8">
          {done ? (
            <div className="py-10 text-center" role="status">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-led-green text-led-green shadow-[0_0_24px_var(--led-green)]">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{t.successTitle}</h3>
              <p className="mt-3 text-muted-foreground">{status === "already" ? t.already : t.successBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="po-email">{t.email}</Label>
                <Input
                  id="po-email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={set("email")}
                  aria-invalid={!!emailError}
                  className="h-11 bg-background/60"
                />
                {emailError && <p className="text-sm text-destructive">{emailError}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="po-name">
                    {t.name} <span className="text-muted-foreground">({t.optional})</span>
                  </Label>
                  <Input id="po-name" autoComplete="name" maxLength={100} value={form.name} onChange={set("name")} className="h-11 bg-background/60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="po-country">
                    {t.country} <span className="text-muted-foreground">({t.optional})</span>
                  </Label>
                  <Input id="po-country" autoComplete="country-name" maxLength={80} value={form.country} onChange={set("country")} className="h-11 bg-background/60" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="po-message">
                  {t.message} <span className="text-muted-foreground">({t.optional})</span>
                </Label>
                <Textarea
                  id="po-message"
                  rows={3}
                  maxLength={1000}
                  placeholder={t.messagePlaceholder}
                  value={form.message}
                  onChange={set("message")}
                  className="bg-background/60"
                />
              </div>
              {status === "error" && <p className="text-sm text-destructive">{t.errorGeneric}</p>}
              <Button type="submit" variant="hero" size="xl" className="w-full" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="animate-spin" /> {t.sending}
                  </>
                ) : (
                  t.submit
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">{t.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
